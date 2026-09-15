"""mine_keys.py -- Stage 6: official-key mining at scale (marking-scheme-first).

Mines the official board answer keys out of marking-scheme (MS) documents and
writes them into the ``official_answers`` table of question_bank.db.

Core rule (escrow): a student-facing answer may be shown as VERIFIED when it
comes from deterministic computation OR from an OFFICIAL board key.  This tool
supplies the second kind.  It is fully deterministic: regex + fingerprints,
NO LLM calls.  Anything ambiguous is SKIPPED and counted -- a skipped scheme
is free, a wrong key is fatal.

Sources (read-only): documents, questions.
Writes: official_answers (INSERT OR IGNORE -- never clobbers), plus three
side tables this tool owns:
  key_mining_progress   -- manifest of processed MS doc ids (resumable runs)
  key_mining_keys       -- provenance/audit for every key we wrote
  key_mining_unmatched  -- high-value keys whose question was never found,
                           stored by fingerprint for later lookup

Design
------
1. Extraction from MS question rows ("Ans." blocks, leading option letters
   (A)-(D), roman (i)-(iv), matching pairs, arrows, numeric+unit endings).
   Scheme text is telegraphic and OCR-noisy -- parse conservatively.
2. Question fingerprint: canonical_hash(text) (lowercase, punctuation and
   whitespace stripped, number tokens masked to '#') plus a numeric
   signature (multiset of values) so "Rs 8000 at 5%" matches its scheme
   even when option letters differ.
3. Alignment, in order of trust:
     a. MCQ ordinal alignment: MS letter-answer rows and the paired
        SQP/QP/PQ doc's MCQ rows are both in printed-question order, so the
        best row-offset is scored using option-text agreement.
     b. exact fingerprint equality (within the same doc first, then across
        docs of the same class/session),
     c. numeric-signature equality + word overlap,
     d. stub-prefix match (MS rows that carry a truncated question stub),
     e. fuzzy Jaccard overlap (same subject only).
   Every written key must pass the suspect check: question text and scheme
   block must share at least one content word, unless the key was validated
   against the question's own option text.
4. Confidence tiers: high (option-text-validated letter keys, matching
   pairs, numeric+unit endings), medium (verbatim text answers).
5. Idempotent + resumable: docs already in key_mining_progress are skipped;
   progress is committed every 50 documents.

Matcher API for the pipeline (quote):
    from backend.tools.mine_keys import find_official_key
    key = find_official_key(conn, doc_id, qno, question_text)
    # -> None or dict(letter, answer_text, marks, tier, source, method)

Usage:
    python backend/tools/mine_keys.py --report              # coverage
    python backend/tools/mine_keys.py --run                 # mine (resumable)
    python backend/tools/mine_keys.py --run --limit 20      # first 20 pending
    python backend/tools/mine_keys.py --sample 20           # audit pairs
    python backend/tools/mine_keys.py --suspects            # suspect keys
"""

from __future__ import annotations

import argparse
import hashlib
import re
import sqlite3
import unicodedata
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Optional, Sequence, Tuple

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_DB = REPO_ROOT / "cbse_data" / "question_bank.db"

CHECKPOINT_EVERY = 50          # docs per commit
MAX_LETTER_ANSWER = 400        # chars kept for option-letter keys
MAX_SOLUTION_ANSWER = 1500     # chars kept for worked solutions
MIN_JACCARD = 0.30             # fuzzy alignment threshold
MIN_PREFIX_TOKENS = 3          # stub must have >= 3 content tokens
MIN_OFFSET_SCORE = 4           # min score to accept an ordinal alignment

# --------------------------------------------------------------------------- #
# Text normalization
# --------------------------------------------------------------------------- #

# Mathematical Alphanumeric Symbols -> ASCII letters (style blocks of
# 26 capitals followed by 26 smalls).  A few codepoints in these ranges are
# holes (reserved glyphs); those simply do not occur in scheme text.
_MATH_STYLE_BASES = (
    0x1D400, 0x1D434, 0x1D468, 0x1D49C, 0x1D4D0, 0x1D504,
    0x1D538, 0x1D56C, 0x1D5A0, 0x1D5D4, 0x1D608, 0x1D63C,
    0x1D670, 0x1D6A8, 0x1D6E2, 0x1D71C, 0x1D756, 0x1D790,
)
_MATH_MAP = {}
for _base in _MATH_STYLE_BASES:
    for _i in range(26):
        _MATH_MAP.setdefault(_base + _i, chr(ord("A") + _i))
        _MATH_MAP.setdefault(_base + 26 + _i, chr(ord("a") + _i))


def normalize_text(text: str) -> str:
    """NFKC + math letters to ASCII + any-script digits to ASCII."""
    if not text:
        return ""
    out = []
    for ch in unicodedata.normalize("NFKC", text):
        o = ord(ch)
        if o in _MATH_MAP:
            out.append(_MATH_MAP[o])
        elif ch.isdigit():
            try:
                out.append(str(unicodedata.digit(ch)))
            except (ValueError, TypeError):
                out.append(ch)
        else:
            out.append(ch)
    return "".join(out)


_NUM_TOKEN = re.compile(r"\d+(?:\.\d+)?")
# keep unicode word chars (Devanagari, Bengali, ...) so language rows do not
# all collapse onto the same empty canonical form
_NON_ALNUM = re.compile(r"[^\w\s#]+")


def canonical(text: str) -> str:
    """Canonical form: lowercase, punctuation stripped, numbers -> '#'.

    Number masking lets a question match its scheme when the option values
    or figure data differ in formatting.  Multi-digit runs are masked whole
    so "3780" and "3780.0" both collapse to '#'.
    """
    t = normalize_text(text).lower()
    t = _NUM_TOKEN.sub("#", t)
    t = t.replace("_", " ")
    t = _NON_ALNUM.sub(" ", t)
    return re.sub(r"\s+", " ", t).strip()


def canonical_hash(text: str) -> str:
    """Stable 16-hex fingerprint of the canonical form."""
    return hashlib.sha1(canonical(text).encode("utf-8")).hexdigest()[:16]


def canonical_tokens(text: str) -> List[str]:
    return [t for t in canonical(text).split() if t != "#"]


def numeric_signature(text: str) -> Tuple[str, ...]:
    """Sorted multiset of numeric values in the text (any script digits)."""
    vals = []
    for raw in _NUM_TOKEN.findall(normalize_text(text)):
        try:
            f = float(raw)
            vals.append(repr(f))
        except ValueError:
            vals.append(raw)
    return tuple(sorted(vals))


_STOPWORDS = {
    "the", "and", "for", "are", "not", "any", "this", "that", "with",
    "from", "which", "into", "will", "has", "have", "was", "were", "but",
    "all", "one", "two", "can", "out", "its", "his", "her", "you", "your",
    "they", "them", "who", "what", "when", "where", "why", "how", "does",
    "did", "ans", "answer", "section", "marks", "question", "questions",
}


def content_words(text: str) -> set:
    """Lowercase ASCII word set, len >= 3, minus a tiny stopword list."""
    words = set()
    for w in re.findall(r"[a-z]{3,}", normalize_text(text).lower()):
        if w not in _STOPWORDS:
            words.add(w)
    return words


def word_overlap(a: str, b: str) -> float:
    """Jaccard overlap of content words (0.0 if either side is empty)."""
    return jaccard_words(content_words(a), content_words(b))


def jaccard_words(wa: set, wb: set) -> float:
    """Jaccard of two precomputed word sets (0.0 if either is empty)."""
    if not wa or not wb:
        return 0.0
    return len(wa & wb) / len(wa | wb)


def is_suspect(question_text: str, scheme_text: str) -> bool:
    """True when aligned question and scheme block share no content words."""
    return not (content_words(question_text) & content_words(scheme_text))


# --------------------------------------------------------------------------- #
# Session / doc helpers
# --------------------------------------------------------------------------- #

_YEAR = re.compile(r"(\d{4})")


def session_year(session: Optional[str]) -> Optional[int]:
    if not session:
        return None
    m = _YEAR.search(session)
    return int(m.group(1)) if m else None


def session_ok(a: Optional[str], b: Optional[str]) -> bool:
    """True when two session labels refer to adjacent board years.

    Missing or unparsable labels on BOTH sides are compatible (wildcard);
    a missing label on one side only is rejected (too weak for fuzzy use).
    """
    ya, yb = session_year(a), session_year(b)
    if ya is None and yb is None:
        return True
    if ya is None or yb is None:
        return False
    return abs(ya - yb) <= 1


_BOILERPLATE_PREFIXES = (
    "this question", "this paper", "in section", "general instructions",
    "click here", "please note", "max. marks", "maximum marks",
    "time allowed", "general instr", "instructions:", "note:",
    "sample question paper", "marking scheme", "class-", "subject:",
    "question no", "value points", "distribution of marks",
    "answer any", "attempt any", "do any",
)
# instruction-speak that never occurs inside a real answer
_INSTRUCTION_PAT = re.compile(
    r"\b(out of the given|marks? each|value points|distribution of marks|"
    r"internal choice|mark for the correct answer|marks? for (the )?correct"
    r"ly?|marks? for each correct)\b", re.I)
_MARK_DENSE = re.compile(r"\bmarks?\b")


def is_boilerplate(text: str) -> bool:
    t = normalize_text(text).strip().lower()
    if len(t) < 8:
        return True
    return any(t.startswith(p) for p in _BOILERPLATE_PREFIXES)


def usable_target(text: str) -> bool:
    """A question row fit as an alignment target (filters short junk,
    mark-allocation instruction rows, and mark-dense scheme notes)."""
    t = normalize_text(text or "").strip()
    if len(t) < 20:
        return False
    if _INSTRUCTION_PAT.search(t[:150]):
        return False
    if len(_MARK_DENSE.findall(t)) >= 3:
        return False
    return not is_boilerplate(t)


# --------------------------------------------------------------------------- #
# Option parsing (question side)
# --------------------------------------------------------------------------- #

_OPT_TOKEN = re.compile(r"[\(\[]?([A-Da-d])[\)\].:]\s+")
_OPT_TOKEN_ROMAN = re.compile(r"[\(\[](iv|iii|ii|i)[\)\]]\s*", re.I)
_ROMAN_TO_LETTER = {"i": "A", "ii": "B", "iii": "C", "iv": "D"}
_OPT_ORDER = "ABCD"


def _run_tokens(text: str, token_re, order: List[str]):
    """Find the longest in-order run of option tokens starting anywhere."""
    tokens = list(token_re.finditer(text))
    n = len(tokens)
    best_start, best_len = -1, 0
    for i in range(n):
        want = 0
        j = i
        seq = []
        while j < n:
            letter = tokens[j].group(1).upper()
            if letter == order[want]:
                seq.append(j)
                want += 1
                j += 1
                if want == len(order):
                    break
            elif seq and letter == order[want - 1]:
                j += 1  # repeated letter artifact, skip
            else:
                break
        if len(seq) > best_len:
            best_len, best_start = len(seq), i
    return tokens, best_start, best_len


def parse_options(text: str) -> Tuple[str, Dict[str, str]]:
    """Split a question row into (stem, options).

    Option runs are detected in-order: lettered "(A) 1 (B) 2 ..." (inline or
    per line) or roman "(i) ... (iv)".  Returns the stem with the option
    block cut off plus a dict of uppercase letter -> option text (romans
    mapped i->A ... iv->D).
    """
    t = normalize_text(text or "")
    for token_re, order, to_letter in (
            (_OPT_TOKEN, list(_OPT_ORDER), None),
            (_OPT_TOKEN_ROMAN, ["I", "II", "III", "IV"], _ROMAN_TO_LETTER)):
        tokens, best_start, best_len = _run_tokens(t, token_re, order)
        if best_len < 3:
            continue
        first = tokens[best_start]
        last_idx = min(best_start + best_len, len(tokens)) - 1
        end = tokens[last_idx + 1].start() if last_idx + 1 < len(tokens) else len(t)
        stem = t[: first.start()].strip()
        options = {}
        for k in range(best_len):
            tok = tokens[best_start + k]
            nxt = (tokens[best_start + k + 1].start()
                   if k + 1 < best_len else end)
            opt_text = t[tok.end(): nxt].strip(" \t-")
            letter = tok.group(1).upper() if to_letter is None else \
                to_letter.get(tok.group(1).lower(), tok.group(1).upper())
            options[letter] = opt_text
        return stem, options
    return t.strip(), {}


# --------------------------------------------------------------------------- #
# Scheme-side extraction
# --------------------------------------------------------------------------- #

_LEAD_PAREN = re.compile(r"^[\(\[]([A-Da-d])[\)\]]\s*")
_LEAD_CLOSE = re.compile(r"^([A-Da-d])\)\s*")
_LEAD_DOT = re.compile(r"^([A-Da-d])\.\s+(?=[A-Z])")
_ANS_MARKER = re.compile(
    r"\bans(?:wer)?(?=\s*[.:(\d])\s*\.?\s*(?:\d+\s*[.:]?)?\s*", re.I)
_ANS_OPT = re.compile(r"^[\(\[]?([A-Da-d]|[ivxIVX]{1,5}|\d{1,2})[\)\].:]\s*")
_ROMAN = {"i": "A", "ii": "B", "iii": "C", "iv": "D", "v": "E", "vi": "F"}
_MATCH_PAIR = re.compile(
    r"[\(\[]?\b([A-Da-d])\b[\)\]]?\s*[-\u2013\u2014=~]\s*"
    r"[\(\[]?(iv|iii|ii|i|vi|v|IV|III|II|I|VI|V|\d{1,2})[\)\]]?")
_ARROW = "\u279c"          # right arrow used by language schemes
_TAIL_SECTION = re.compile(r"\s*\(?section\s*[-\u2013\u2014]?\s*[a-e]\)?\s*\.?\s*$", re.I)
_SECTION_HEAD = re.compile(r"^[\W\s]*section\b|^section\s*[-:a-e]?\s*$", re.I)
# rows BEGINNING with an answer label ("ANS- D. Assam ...") carry the answer
# of the PREVIOUS row's question -- self-alignment would misattribute it
_ANS_LABEL_ROW = re.compile(
    r"^\s*ans(?:wer)?\b\s*[-\u2013\u2014:.]{1,2}\s*[A-Za-z0-9(]", re.I)
_TAIL_MARKS = re.compile(r"(?:\s*[\u00bd\u00bc\u00be\u2153\u00bc\u00b9\u00b2\u00b3\u00bd])+\s*$")
_VI_SPLIT = re.compile(r"for\s+visually\s+impaired", re.I)
_NUMERIC_UNIT_TAIL = re.compile(r"[-+]?\d+(?:\.\d+)?\s*(?:[a-zA-Z\u00b0]{1,6}(?:\^?2|\^?3|2|3)?|%)\.?\s*$")


@dataclass
class Segment:
    """One candidate answer segment mined from an MS question row."""

    text: str                    # raw segment text (normalized lightly)
    stub: str = ""               # question-stub text found before "Ans."
    vi: bool = False             # from a "For Visually Impaired" variant
    letter: Optional[str] = None
    roman: Optional[str] = None
    index: Optional[int] = None  # numeric option index, e.g. "Ans. (2)"
    matching: List[Tuple[str, str]] = field(default_factory=list)
    answer_text: str = ""
    kind: str = "skip"           # letter | roman | matching | arrow | text | skip
    tier: str = "medium"         # high | medium
    skip_reason: str = ""
    src_qno: Optional[int] = None  # MS row qno this segment came from

    @property
    def align_text(self) -> str:
        """Text used for alignment (stub when present, else the answer)."""
        return self.stub if self.stub.strip() else self.answer_text or self.text


def _strip_tails(text: str) -> str:
    t = text.strip()
    prev = None
    while prev != t and t:
        prev = t
        t = _TAIL_SECTION.sub("", t)
        t = _TAIL_MARKS.sub("", t)
    return t.strip()


def _split_ans_blocks(text: str) -> List[Tuple[str, str]]:
    """Split a row on 'Ans.' markers -> [(stub, block), ...]."""
    parts = _ANS_MARKER.split(text)
    if len(parts) == 1:
        return [("", text)]
    out = [(parts[0], parts[1])]
    for extra in parts[2:]:
        out.append(("", extra))
    return out


def extract_answer(seg_text: str, stub: str = "", vi: bool = False) -> Segment:
    """Extract the answer from one scheme segment.  Conservative: anything
    ambiguous stays kind='skip' with a reason."""
    raw = normalize_text(seg_text)
    if not raw.strip():
        return Segment(text=raw, stub=stub, vi=vi, kind="skip",
                       skip_reason="empty")
    if _SECTION_HEAD.match(raw.strip()):
        return Segment(text=raw, stub=stub, vi=vi, kind="skip",
                       skip_reason="section_header")
    if _INSTRUCTION_PAT.search(raw[:100]):
        return Segment(text=raw, stub=stub, vi=vi, kind="skip",
                       skip_reason="instruction_fragment")
    if not stub and _ANS_LABEL_ROW.match(raw):
        # the answer belongs to the previous row's question (PQMS layout);
        # nothing in this row ties it to a question we can see
        return Segment(text=raw, stub=stub, vi=vi, kind="skip",
                       skip_reason="ans_label_row")
    if is_boilerplate(raw):
        return Segment(text=raw, stub=stub, vi=vi, kind="skip",
                       skip_reason="boilerplate")

    seg = Segment(text=raw, stub=stub, vi=vi)

    # -- matching-type pairings, e.g. "a-ii, b-iii, c-i, d-iv"
    pairs = _MATCH_PAIR.findall(raw)
    if len(pairs) >= 2:
        seg.kind = "matching"
        seg.matching = [(a.upper(), b) for a, b in pairs]
        seg.answer_text = "; ".join(f"{a}-{b}" for a, b in seg.matching)
        seg.tier = "high"
        return seg

    # -- leading option letter
    letter = None
    rest = None
    for pat in (_LEAD_PAREN, _LEAD_CLOSE, _LEAD_DOT):
        m = pat.match(raw)
        if m:
            letter = m.group(1).upper()
            rest = raw[m.end():]
            break

    # -- "Ans. 4. (ii)" style option token right after an Ans marker is
    #    handled by block splitting; the roman/index forms are parsed here.
    if letter is None:
        m = re.match(r"^[\(\[](iv|iii|ii|i|vi|v)[\)\]]\s*", raw, re.I)
        if m:
            seg.roman = m.group(1).lower()
            rest = raw[m.end():]
        else:
            m = re.match(r"^[\(\[](\d{1,2})[\)\]]\s+", raw)
            if m:
                seg.index = int(m.group(1))
                rest = raw[m.end():]

    # -- arrow answers from language schemes: text after the last arrow
    if letter is None and seg.roman is None and seg.index is None:
        if _ARROW in raw:
            tail = raw.rsplit(_ARROW, 1)[1].strip()
            if 1 <= len(tail) <= 120:
                seg.kind = "arrow"
                seg.answer_text = _strip_tails(tail)
                seg.tier = "high" if _NUMERIC_UNIT_TAIL.search(seg.answer_text) else "medium"
                return seg
        seg.kind = "text"
        seg.answer_text = _strip_tails(raw)
        seg.tier = "high" if _NUMERIC_UNIT_TAIL.search(seg.answer_text) else "medium"
        if len(seg.answer_text) < 2:
            seg.kind = "skip"
            seg.skip_reason = "too_short"
        return seg

    # letter / roman / index form
    body = _strip_tails(rest or "")
    if seg.roman is not None:
        seg.kind = "roman"
        seg.answer_text = body
        # roman -> letter only when confidently mappable (iv <= D)
        seg.letter = _ROMAN.get(seg.roman)
        seg.tier = "medium"  # confirmed later against parsed options
        return seg
    if seg.index is not None:
        seg.kind = "index"
        seg.answer_text = body
        if 1 <= seg.index <= 4:
            seg.letter = _OPT_ORDER[seg.index - 1]
            seg.tier = "medium"
            return seg
        seg.kind = "skip"
        seg.skip_reason = "index_out_of_range"
        return seg
    seg.kind = "letter"
    seg.letter = letter
    seg.answer_text = body
    seg.tier = "high"
    if len(seg.answer_text) > MAX_LETTER_ANSWER:
        seg.answer_text = seg.answer_text[: MAX_LETTER_ANSWER - 3].rstrip() + "..."
    if not seg.answer_text:
        seg.answer_text = letter or ""
    return seg


def extract_segments(row_text: str) -> List[Segment]:
    """All candidate answer segments from one MS question row."""
    t = normalize_text(row_text or "")
    segs = []
    for stub, block in _split_ans_blocks(t):
        pieces = _VI_SPLIT.split(block)
        for i, piece in enumerate(pieces):
            if i > 0:
                piece = re.sub(r"^\s*candidates?\s*[:.\-]?\s*", "", piece,
                               flags=re.I)
            seg = extract_answer(piece, stub=stub if i == 0 else "", vi=i > 0)
            segs.append(seg)
    return segs


# --------------------------------------------------------------------------- #
# Alignment helpers
# --------------------------------------------------------------------------- #

@dataclass
class Index:
    """In-memory alignment index over question rows (pure, testable)."""
    rows: List[QuestionRow] = field(default_factory=list)
    by_hash: Dict[str, List[QuestionRow]] = field(default_factory=dict)
    by_rawhash: Dict[str, List[QuestionRow]] = field(default_factory=dict)
    by_numsig: Dict[Tuple[str, ...], List[QuestionRow]] = field(default_factory=dict)
    inverted: Dict[str, set] = field(default_factory=dict)

    def add(self, row: QuestionRow) -> None:
        self.rows.append(row)
        self.qid_map[row.qid] = row
        self.by_hash.setdefault(row.hash_, []).append(row)
        raw = hashlib.sha1(
            canonical(row.text).encode("utf-8")).hexdigest()[:16]
        self.by_rawhash.setdefault(raw, []).append(row)
        self.by_numsig.setdefault(row.numsig, []).append(row)
        for w in content_words(row.stem or row.text):
            self.inverted.setdefault(w, set()).add(row.qid)

    def candidates(self, text: str, min_shared: int = 2) -> List[QuestionRow]:
        """Rows sharing at least min_shared content words with text."""
        words = content_words(text)
        counts = {}
        for w in words:
            for qid in self.inverted.get(w, ()):  # noqa: E501
                counts[qid] = counts.get(qid, 0) + 1
        out = []
        for qid, n in counts.items():
            if n >= min_shared:
                r = self.qid_map.get(qid)
                if r is not None:
                    out.append(r)
        return out

    qid_map: Dict[int, QuestionRow] = field(default_factory=dict)

    def __post_init__(self) -> None:
        self.qid_map = {r.qid: r for r in self.rows}


@dataclass
class QuestionRow:
    qid: int
    doc_id: int
    qno: int
    doc_type: str
    subject: str
    class_label: str
    session: str
    text: str
    marks: Optional[int]
    stem: str = ""
    options: Dict[str, str] = field(default_factory=dict)
    canon: str = ""
    hash_: str = ""
    numsig: Tuple[str, ...] = ()
    cw: set = field(default_factory=set)          # cached content words
    opt_norm: Dict[str, str] = field(default_factory=dict)  # cached option keys
    usable: bool = False                          # cached target-usability

    def postprocess(self) -> None:
        self.stem, self.options = parse_options(self.text)
        base = self.stem if self.options else self.text
        self.canon = canonical(base)
        self.hash_ = hashlib.sha1(self.canon.encode("utf-8")).hexdigest()[:16]
        self.numsig = numeric_signature(base)
        self.cw = content_words(self.stem or self.text)
        self.usable = usable_target(self.text)
        self.opt_norm = {
            L: re.sub(r"[^a-z0-9]+", "",
                      normalize_text(T).lower())
            for L, T in self.options.items()
        }


def option_text_match(answer_lead_text: str, option_text: str) -> bool:
    """True when the scheme's leading value agrees with the option text.

    Numeric heads must match exactly ('4since...' vs '4' ok, vs '5' not);
    otherwise a prefix of at least 2 alnum chars is required.
    """
    a = re.sub(r"[^a-z0-9]+", "", normalize_text(answer_lead_text).lower())
    b = re.sub(r"[^a-z0-9]+", "", normalize_text(option_text).lower())
    return _opt_match_norm(a, b)


def _opt_match_norm(a: str, b: str) -> bool:
    if not a or not b:
        return False
    am, bm = re.match(r"\d+", a), re.match(r"\d+", b)
    if am and bm:
        if am.group(0) == bm.group(0):
            return True
    n = min(len(a), len(b), 12)
    if n < 2 or a[:n] != b[:n]:
        return False
    return a[:1].isdigit() or n >= 3


def answer_lead(answer_text: str, limit: int = 16) -> str:
    return (answer_text or "").strip()[:limit]


def norm_lead(answer_text: str) -> str:
    """Normalized option-match key: alnum-only lowercase of the lead."""
    return re.sub(r"[^a-z0-9]+", "",
                  normalize_text(answer_lead(answer_text)).lower())


# --------------------------------------------------------------------------- #
# Ordinal (offset) alignment for MCQ letter rows
# --------------------------------------------------------------------------- #

def score_offset(ms_rows: Sequence[Tuple[int, str, str]],
                 tgt_by_qno: Dict[int, QuestionRow],
                 offset: int) -> int:
    """Score an MS qno -> target qno offset hypothesis.

    ms_rows: [(ms_qno, letter, lead_norm)] letter-bearing rows, where
    lead_norm is the pre-normalized answer lead (alnum-only lowercase).
    """
    score = 0
    for qno, letter, lead_norm in ms_rows:
        row = tgt_by_qno.get(qno + offset)
        if row is None or not row.usable:
            continue
        if row.options:
            if letter not in row.options:
                score -= 1
                continue
            if _opt_match_norm(lead_norm, row.opt_norm.get(letter, "")):
                score += 2
            else:
                wa = len(_lead_words(lead_norm) & row.cw)
                if wa or _NUMERIC_UNIT_TAIL.search(lead_norm):
                    score += 1
        else:
            if _lead_words(lead_norm) & row.cw:
                score += 1
    return score


_lead_word_cache = {}


def _lead_words(lead_norm: str) -> set:
    """Cheap word-ish set from a normalized lead (split on digit/alpha)."""
    hit = _lead_word_cache.get(lead_norm)
    if hit is None:
        hit = set(re.findall(r"[a-z]{3,}", lead_norm))
        _lead_word_cache[lead_norm] = hit
    return hit


def best_offset(ms_rows: Sequence[Tuple[int, str, str]],
                tgt_by_qno: Dict[int, QuestionRow],
                max_range: int = 15) -> Optional[int]:
    """Best qno offset between MS letter rows and a candidate doc's rows.

    The pair is only accepted when the offset explains MOST of the letter
    rows (score >= half the rows, scaled by the per-row weights).  Different
    papers of the same cycle collide on single-digit option values a few
    times; a true same-paper alignment matches nearly every row.
    """
    if not ms_rows:
        return None
    need = max(MIN_OFFSET_SCORE, len(ms_rows))
    best, best_score = None, need
    for offset in range(-max_range, max_range + 1):
        s = score_offset(ms_rows, tgt_by_qno, offset)
        if s > best_score:
            best, best_score = offset, s
    return best


# --------------------------------------------------------------------------- #
# Fingerprint alignment
# --------------------------------------------------------------------------- #

def align_by_fingerprint(seg: Segment,
                         index: Index,
                         source: QuestionRow) -> Tuple[Optional[QuestionRow], str]:
    """Find the question a scheme segment answers, by fingerprint.

    Order: exact hash (stem-cut, then raw row text) -> numeric-signature
    equality + word overlap -> stub prefix -> fuzzy Jaccard (same subject
    only, seeded by shared content words).  Returns (row|None, method).
    """
    align_text = seg.align_text
    same_doc = lambda r: r.doc_id == source.doc_id  # noqa: E731

    # 1. exact hash of the alignment text (stem-normalized)
    h = hashlib.sha1(canonical(align_text).encode("utf-8")).hexdigest()[:16]
    cands = index.by_hash.get(h)
    if cands:
        row = _pick_candidate(cands, source)
        if row is not None:
            return row, "hash"

    # 1b. exact hash of the whole raw row text (self-contained rows that
    #     carry question + answer in one block, e.g. language schemes)
    hr = hashlib.sha1(canonical(seg.text).encode("utf-8")).hexdigest()[:16]
    cands = index.by_rawhash.get(hr)
    if cands:
        row = _pick_candidate(cands, source)
        if row is not None:
            return row, "rawhash"

    # 2. numeric-signature match: the question's given values must all
    #    reappear in the scheme block (answer = givens + result), with
    #    content-word agreement.  Exact equality is scored first.
    sig = numeric_signature(align_text)
    if len(sig) >= 2:
        wa = content_words(align_text)
        a_set = set(sig)

        def numsig_fit(r: QuestionRow) -> bool:
            q_set = set(r.numsig)
            if len(q_set) < 2 or not q_set <= a_set:
                return False
            return True

        best, best_j = None, 0.20
        for r in index.by_numsig.get(sig, ()):
            if not r.usable or not session_ok(source.session, r.session):
                continue
            j = jaccard_words(wa, r.cw)
            if j > best_j:
                best, best_j = r, j
        if best is None:
            for r in index.candidates(align_text, min_shared=2):
                if not r.usable or not session_ok(source.session, r.session):
                    continue
                if not numsig_fit(r):
                    continue
                j = jaccard_words(wa, r.cw)
                if j > best_j:
                    best, best_j = r, j
        if best is not None:
            return best, "numeric"

    # 3. stub prefix (MS rows carrying a truncated question stub).
    #    Two-token prefixes are allowed when the subject agrees, and among
    #    several prefix candidates the one whose text best overlaps the
    #    scheme body wins (ties need a unique candidate).
    stub_tokens = [t for t in canonical(seg.stub).split() if t != "#"]
    if len(stub_tokens) >= 2:
        prefix = " ".join(stub_tokens)
        seeds = set()
        for t in stub_tokens:
            if t != "#":
                seeds |= index.inverted.get(t, set())
        hits = []
        for qid in seeds:
            r = index.qid_map.get(qid)
            if r is None or not r.usable:
                continue
            if not session_ok(source.session, r.session):
                continue
            if len(stub_tokens) < MIN_PREFIX_TOKENS and \
                    r.subject != source.subject:
                continue
            if r.canon.startswith(prefix):
                hits.append(r)
        if hits:
            body = content_words(seg.answer_text)
            scored = [(jaccard_words(body, r.cw), -r.qid, r) for r in hits]
            scored.sort(key=lambda x: (-x[0], x[1]))
            if len(scored) == 1 or scored[0][0] > scored[1][0]:
                return scored[0][2], "prefix"

    # 4. fuzzy Jaccard, same subject only, seeded by shared words.
    #    Gates are deliberately strict: min_shared 3, jaccard >= 0.40, and
    #    the scheme block must carry enough words to make the overlap
    #    meaningful (blocks like "SECTION - B" must never align).
    if len(content_words(align_text)) >= 6:
        wa = content_words(align_text)
        best, best_j = None, 0.40
        for r in index.candidates(align_text, min_shared=3):
            if not r.usable or r.subject != source.subject:
                continue
            if not session_ok(source.session, r.session):
                continue
            j = jaccard_words(wa, r.cw)
            if j > best_j:
                best, best_j = r, j
        if best is not None:
            return best, "fuzzy"
    return None, ""


def _pick_candidate(cands: List[QuestionRow],
                    source: QuestionRow) -> Optional[QuestionRow]:
    """Choose among hash-equal candidates: same doc first, then non-MS
    rows scoped by class/session, else None."""
    for r in cands:
        if r.doc_id == source.doc_id:
            return r
    scoped = [r for r in cands
              if r.doc_type != "MS" and r.usable
              and session_ok(source.session, r.session)]
    if scoped:
        scoped.sort(key=lambda r: (r.class_label != source.class_label,
                                   r.subject != source.subject))
        return scoped[0]
    return None


# --------------------------------------------------------------------------- #
# Key validation / writing
# --------------------------------------------------------------------------- #

def validate_key(seg: Segment, target: QuestionRow,
                 method: str = "") -> Optional[dict]:
    """Final gate for writing a key.  Returns dict or None (reject)."""
    letter = seg.letter
    option_ok = None
    if target.options and letter:
        if letter not in target.options:
            return None
        option_ok = option_text_match(answer_lead(seg.answer_text),
                                      target.options[letter])
    # ordinal alignment leans entirely on the option structure: without
    # parsed options there is nothing cross-checking the position
    if method == "ordinal" and not target.options:
        return None
    # an MCQ slot may only receive a letter key: a letterless solution on a
    # slot the pipeline letter-grades poisons the grading contract.  The
    # option-label scan is deliberately looser than parse_options (it must
    # also catch \xa0-riddled rows whose options parse downstream).
    if letter is None and len(target.options) >= 2:
        return None
    if letter is None and len(re.findall(
            r"[\(\[]?[A-Da-d][\)\].:]\s", normalize_text(target.text))) >= 2:
        return None
    if seg.kind in ("roman", "index"):
        # roman/index keys only written when the question itself is
        # option-parsed; the roman IS the identity, so once mapped the
        # option text becomes the answer.
        if not target.options or letter is None or letter not in target.options:
            return None
        option_ok = True
        seg.tier = "high"
    if option_ok is False:
        # letter contradicts the question's own options -> only keep when
        # the question text itself still agrees (content overlap), else skip
        if word_overlap(target.stem, seg.align_text) < 0.25:
            return None
        seg.tier = "medium"

    # suspect gate: question text and scheme block must share content words
    # unless the key was validated against the option text itself
    if not option_ok and is_suspect(target.text, seg.align_text):
        return None

    answer_text = (seg.answer_text or "").strip()
    if seg.kind in ("letter", "roman", "index") and target.options \
            and letter in target.options:
        opt = target.options[letter]
        if option_ok or seg.kind in ("roman", "index") or \
                (opt and word_overlap(opt, answer_text) >= 0.5):
            answer_text = opt
    cap = MAX_LETTER_ANSWER if seg.letter else MAX_SOLUTION_ANSWER
    if len(answer_text) > cap:
        answer_text = answer_text[: cap - 3].rstrip() + "..."
    if not answer_text:
        answer_text = letter or ""
    if seg.vi:
        answer_text = "[VI] " + answer_text
    # a "key" that just repeats the question text is not an answer -- in
    # either direction: answer == stem, or the answer block begins with the
    # question stem (the row IS a question row, not a scheme answer)
    stem_canon = canonical(target.stem)
    stem_canon = re.sub(r"^(ans(wer)?\b[\s.:\-]*)", "", stem_canon)
    ans_canon = canonical(answer_text)
    if ans_canon and ans_canon == stem_canon:
        return None
    if not letter and len(ans_canon) >= 20 and len(stem_canon) >= 20 and \
            (stem_canon.startswith(ans_canon) or
             ans_canon.startswith(stem_canon)):
        return None
    # no meaningful content and no letter -> nothing usable
    if not letter and len(re.sub(r"[^0-9A-Za-z\u0900-\u097F]", "",
                                 answer_text)) < 2:
        return None
    tier = seg.tier
    if seg.kind == "text" and _NUMERIC_UNIT_TAIL.search(answer_text):
        tier = "high"
    marks = target.marks if target.marks is not None else (1 if letter else None)
    return {
        "doc_id": target.doc_id,
        "qno": target.qno,
        "letter": letter,
        "answer_text": answer_text,
        "marks": marks,
        "tier": tier,
    }


# --------------------------------------------------------------------------- #
# Pure planning helpers (idempotence)
# --------------------------------------------------------------------------- #

def plan_docs(all_ids: Sequence[int], done_ids: Sequence[int]) -> List[int]:
    """Pending doc ids = all minus done, order-stable.  Running the planner
    twice (with the updated done set) yields the empty list."""
    done = set(done_ids)
    return [d for d in all_ids if d not in done]


def progress_after(done_ids: Sequence[int], batch: Sequence[int]) -> List[int]:
    """New done set after committing a batch (stable, idempotent)."""
    return list(dict.fromkeys(list(done_ids) + list(batch)))


# --------------------------------------------------------------------------- #
# Matcher API (for the pipeline)
# --------------------------------------------------------------------------- #

def lookup_official(conn: sqlite3.Connection, doc_id: int, qno: int) -> Optional[dict]:
    row = conn.execute(
        "SELECT letter, answer_text, marks FROM official_answers "
        "WHERE doc_id=? AND qno=?", (doc_id, qno)).fetchone()
    if not row:
        return None
    return {"letter": row[0], "answer_text": row[1], "marks": row[2],
            "source": "direct"}


def lookup_by_fingerprint(conn: sqlite3.Connection, text: str) -> List[dict]:
    h = canonical_hash(text)
    out = []
    for row in conn.execute(
            "SELECT letter, answer_text, tier, source_doc_id, source_qno "
            "FROM key_mining_unmatched WHERE fingerprint=?", (h,)):
        out.append({"letter": row[0], "answer_text": row[1], "tier": row[2],
                    "source_doc_id": row[3], "source_qno": row[4],
                    "source": "fingerprint"})
    return out


def find_official_key(conn: sqlite3.Connection, doc_id: int, qno: int,
                      question_text: str = "",
                      allow_fingerprint: bool = True) -> Optional[dict]:
    """Single lookup entry point for the answer pipeline.

    1. direct row in official_answers for (doc_id, qno);
    2. else fingerprint lookup in key_mining_unmatched (needs question_text).
    Returns None when no official key exists -- the caller must then fall
    back to deterministic computation or leave the answer UNVERIFIED.
    """
    key = lookup_official(conn, doc_id, qno)
    if key:
        key["method"] = "direct"
        return key
    if allow_fingerprint and question_text:
        hits = lookup_by_fingerprint(conn, question_text)
        if hits:
            best = sorted(hits, key=lambda x: 0 if x["tier"] == "high" else 1)[0]
            best["method"] = "fingerprint"
            return best
    return None


# --------------------------------------------------------------------------- #
# Mining run (DB)
# --------------------------------------------------------------------------- #

def ambiguous_qno_slots(rows_by_key) -> set:
    """(doc_id, qno) slots holding distinct, non-prefix question rows.

    One question split across two rows (stem row + options row) is fine --
    the rows are prefix-related.  Two DIFFERENT questions sharing a slot
    make the official_answers slot ambiguous, so no key is written there.
    """
    out = set()
    for key, rows in rows_by_key.items():
        if len(rows) < 2:
            continue
        if len({r.hash_ for r in rows}) < 2:
            continue
        split_ok = True
        for a in rows:
            for b in rows:
                if a is b or (a.canon and b.canon and
                              (a.canon.startswith(b.canon) or
                               b.canon.startswith(a.canon))):
                    continue
                split_ok = False
        if not split_ok:
            out.add(key)
    return out


def load_question_rows(conn: sqlite3.Connection) -> List[QuestionRow]:
    rows = []
    sql = ("SELECT q.id, q.doc_id, q.qno, d.doc_type, d.subject, "
           "d.class_label, d.session, q.text, q.marks "
           "FROM questions q JOIN documents d ON d.id=q.doc_id")
    for r in conn.execute(sql):
        row = QuestionRow(*r)
        if row.text and not is_boilerplate(row.text):
            row.postprocess()
            rows.append(row)
    return rows


def _ensure_tables(conn: sqlite3.Connection) -> None:
    conn.execute(
        "CREATE TABLE IF NOT EXISTS key_mining_progress ("
        " doc_id INTEGER PRIMARY KEY, processed_at TEXT NOT NULL,"
        " n_rows INTEGER, n_extracted INTEGER, n_aligned INTEGER,"
        " n_skipped INTEGER, notes TEXT)")
    conn.execute(
        "CREATE TABLE IF NOT EXISTS key_mining_keys ("
        " doc_id INTEGER NOT NULL, qno INTEGER NOT NULL,"
        " target_qid INTEGER,"
        " source_doc_id INTEGER NOT NULL, source_qno INTEGER,"
        " method TEXT NOT NULL, tier TEXT NOT NULL, fingerprint TEXT,"
        " n_propagated INTEGER DEFAULT 0,"
        " PRIMARY KEY (doc_id, qno))")
    conn.execute(
        "CREATE TABLE IF NOT EXISTS key_mining_unmatched ("
        " fingerprint TEXT PRIMARY KEY, numeric_sig TEXT,"
        " subject TEXT, class_label TEXT, session TEXT,"
        " source_doc_id INTEGER, source_qno INTEGER,"
        " letter TEXT, answer_text TEXT, tier TEXT, created_at TEXT)")


class Stats(object):
    def __init__(self) -> None:
        self.rows = 0
        self.extracted = 0
        self.aligned = 0
        self.skipped = 0
        self.written = 0
        self.already = 0
        self.propagated = 0
        self.unmatched = 0
        self.suspect_rejected = 0
        self.ordinal_pairs = 0
        self.ambiguous_skipped = 0


def mine_doc(conn: sqlite3.Connection, doc: QuestionRow,
             qrows_by_doc: Dict[int, List[QuestionRow]],
             index: Index,
             stats: Stats,
             tgt_docs: Optional[Dict[int, List[QuestionRow]]] = None,
             ambiguous_slots: Optional[set] = None) -> None:
    """Mine one MS doc (doc is a pseudo QuestionRow holding doc metadata)."""
    ms_rows = qrows_by_doc.get(doc.doc_id, [])
    if not ms_rows:
        # rowless MS doc: answers live in marking_steps — rebuild a
        # per-qno scheme block so extract_segments sees the same shape
        # as a parsed questions row
        steps = conn.execute(
            "SELECT qno, text FROM marking_steps WHERE doc_id=? "
            "ORDER BY qno, step_no", (doc.doc_id,)).fetchall()
        by_qno: Dict[int, List[str]] = {}
        for qno, stext in steps:
            by_qno.setdefault(qno, []).append(stext or "")
        ms_rows = [
            QuestionRow(qid=0, doc_id=doc.doc_id, qno=qno,
                        doc_type="MS", subject=doc.subject,
                        class_label=doc.class_label, session=doc.session,
                        text="\n".join(lines), marks=None)
            for qno, lines in by_qno.items()]
    if not ms_rows:
        return
    if ambiguous_slots is None:
        ambiguous_slots = set()
    if tgt_docs is None:
        tgt_docs = {}
        for row in index.rows:
            if row.doc_type != "MS" and row.doc_id != doc.doc_id:
                tgt_docs.setdefault(row.doc_id, []).append(row)
    segments_by_row = []
    letter_rows = []          # (qno, letter, answer_lead) for ordinal pass
    for q in ms_rows:
        stats.rows += 1
        segs = extract_segments(q.text)
        for s in segs:
            s.src_qno = q.qno
        usable = [s for s in segs if s.kind != "skip"]
        stats.extracted += len(usable)
        stats.skipped += len(segs) - len(usable)
        segments_by_row.append((q, usable))
        for s in usable:
            if s.letter and s.kind in ("letter", "roman", "index") and not s.vi:
                letter_rows.append((q.qno, s.letter,
                                    norm_lead(s.answer_text)))

    written_keys = {}         # (doc_id, qno) -> (payload, seg, target, method)

    # ---- pass 1: ordinal alignment per candidate doc pair -----------------
    for tgt_doc_id, rows in tgt_docs.items():
        tgt_by_qno = {row.qno: row for row in rows}
        off = best_offset(letter_rows, tgt_by_qno)
        if off is None:
            continue
        stats.ordinal_pairs += 1
        used = set()
        for q, segs in segments_by_row:
            for s in segs:
                if not s.letter or s.kind not in ("letter", "roman", "index"):
                    continue
                t = tgt_by_qno.get(q.qno + off)
                if t is None or t.qid in used:
                    continue
                payload = validate_key(s, t, "ordinal")
                if payload is None:
                    stats.suspect_rejected += 1
                    continue
                used.add(t.qid)
                written_keys.setdefault((t.doc_id, t.qno),
                                        (payload, s, t, "ordinal"))

    # ---- pass 2: fingerprint alignment ------------------------------------
    for q, segs in segments_by_row:
        for s in segs:
            if s.kind == "skip":
                continue
            if s.letter and s.kind in ("letter", "roman", "index"):
                # letter keys are ordinal material only -- their text alone
                # carries no question words, fingerprint would be noise
                continue
            target, method = align_by_fingerprint(s, index, doc)
            if target is None:
                _record_unmatched(conn, doc, q, s, stats)
                continue
            payload = validate_key(s, target, method)
            if payload is None:
                stats.suspect_rejected += 1
                continue
            written_keys.setdefault(
                (target.doc_id, target.qno), (payload, s, target, method))

    # ---- pass 3: propagate hash-validated keys to duplicate questions -----
    final = {}
    for (did, qno), (payload, seg, target, method) in written_keys.items():
        n_prop = 0
        if method in ("hash", "rawhash"):
            for r in index.by_hash.get(target.hash_, []):
                if (r.doc_id, r.qno) == (target.doc_id, target.qno):
                    continue
                if not r.usable:
                    continue
                p2 = validate_key(seg, r, "hash_prop")
                if p2 is None:
                    continue
                final.setdefault((r.doc_id, r.qno), (p2, seg, r, "hash_prop"))
                n_prop += 1
        stats.propagated += n_prop
        final.setdefault((did, qno), (payload, seg, target, method))

    # ---- drop keys landing on ambiguous (doc_id, qno) slots ---------------
    # when several DISTINCT question rows share one (doc_id, qno), the
    # single official_answers slot cannot say which of them the key answers
    for (did, qno) in list(final.keys()):
        if (did, qno) in ambiguous_slots:
            del final[(did, qno)]
            stats.ambiguous_skipped += 1

    # ---- write -------------------------------------------------------------
    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    for (did, qno), (payload, seg, target, method) in sorted(final.items()):
        exists = conn.execute(
            "SELECT 1 FROM official_answers WHERE doc_id=? AND qno=?",
            (did, qno)).fetchone()
        if exists:
            stats.already += 1
            continue
        conn.execute(
            "INSERT OR IGNORE INTO official_answers "
            "(doc_id, qno, letter, answer_text, marks) VALUES (?,?,?,?,?)",
            (did, qno, payload["letter"], payload["answer_text"],
             payload["marks"]))
        conn.execute(
            "INSERT OR REPLACE INTO key_mining_keys "
            "(doc_id, qno, target_qid, source_doc_id, source_qno, method,"
            " tier, fingerprint, n_propagated) VALUES (?,?,?,?,?,?,?,?,?)",
            (did, qno, target.qid, doc.doc_id,
             seg.src_qno if seg.src_qno is not None else target.qno,
             method, payload["tier"], target.hash_, 0))
        stats.written += 1
        stats.aligned += 1
    conn.execute(
        "INSERT OR REPLACE INTO key_mining_progress "
        "(doc_id, processed_at, n_rows, n_extracted, n_aligned, n_skipped,"
        " notes) VALUES (?,?,?,?,?,?,?)",
        (doc.doc_id, now, stats.rows, stats.extracted, stats.aligned,
         stats.skipped,
         f"ordinal_pairs={stats.ordinal_pairs} "
         f"propagated={stats.propagated}"))


def _record_unmatched(conn: sqlite3.Connection, doc: QuestionRow, q: QuestionRow,
                      seg: Segment, stats: Stats) -> None:
    if seg.kind == "skip" or not seg.align_text.strip():
        return
    align = seg.align_text
    # guard: only record segments with real content worth re-looking-up
    if len(align) < 25 or len(content_words(align)) < 3:
        return
    h = canonical_hash(align)
    if not h:
        return
    cur = conn.execute(
        "SELECT 1 FROM key_mining_unmatched WHERE fingerprint=?", (h,))
    if cur.fetchone():
        return
    conn.execute(
        "INSERT OR IGNORE INTO key_mining_unmatched "
        "(fingerprint, numeric_sig, subject, class_label, session,"
        " source_doc_id, source_qno, letter, answer_text, tier, created_at)"
        " VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        (h, ",".join(numeric_signature(seg.align_text)), doc.subject,
         doc.class_label, doc.session, doc.doc_id, q.qno, seg.letter,
         (seg.answer_text or "")[:400], seg.tier,
         datetime.now(timezone.utc).isoformat(timespec="seconds")))
    stats.unmatched += 1


def run_mining(db_path: Path, limit: Optional[int] = None,
               subject: Optional[str] = None) -> Stats:
    conn = sqlite3.connect(str(db_path))
    _ensure_tables(conn)
    stats = Stats()

    done = {r[0] for r in conn.execute("SELECT doc_id FROM key_mining_progress")}
    # MS docs whose scheme text never split into questions rows still
    # carry their answers in marking_steps (parse_marking_answers) --
    # include them; mine_doc rebuilds pseudo-rows from that table.
    ms_docs = list(conn.execute(
        "SELECT d.id, d.subject, d.class_label, d.session, COUNT(q.id) "
        "FROM documents d LEFT JOIN questions q ON q.doc_id=d.id "
        "WHERE d.doc_type='MS' AND ("
        "  EXISTS (SELECT 1 FROM questions WHERE doc_id=d.id) OR"
        "  EXISTS (SELECT 1 FROM marking_steps WHERE doc_id=d.id)) "
        "GROUP BY d.id ORDER BY d.id"))
    if subject:
        ms_docs = [d for d in ms_docs if d[1] == subject]
    pending = plan_docs([d[0] for d in ms_docs], list(done))
    pending_rows = [d for d in ms_docs if d[0] in set(pending)]
    if limit:
        pending_rows = pending_rows[:limit]
    print(f"MS docs with rows: {len(ms_docs)}  done: {len(done)}"
          f"  pending: {len(pending_rows)}")

    qrows_by_doc: Dict[int, List[QuestionRow]] = {}
    index = Index()
    all_rows = load_question_rows(conn)
    for row in all_rows:
        qrows_by_doc.setdefault(row.doc_id, []).append(row)
        index.add(row)

    batch = []
    tgt_docs = {}
    for row in index.rows:
        if row.doc_type != "MS":
            tgt_docs.setdefault(row.doc_id, []).append(row)
    slot_rows = {}
    for row in all_rows:
        slot_rows.setdefault((row.doc_id, row.qno), []).append(row)
    ambiguous = ambiguous_qno_slots(slot_rows)
    for (doc_id, subj, cls, sess, nq) in pending_rows:
        meta = QuestionRow(qid=0, doc_id=doc_id, qno=0, doc_type="MS",
                           subject=subj, class_label=cls, session=sess,
                           text="", marks=None)
        doc_stats = Stats()
        mine_doc(conn, meta, qrows_by_doc, index, doc_stats,
                 tgt_docs=tgt_docs, ambiguous_slots=ambiguous)
        for attr in ("rows", "extracted", "aligned", "skipped", "written",
                     "already", "propagated", "unmatched",
                     "suspect_rejected", "ordinal_pairs",
                     "ambiguous_skipped"):
            setattr(stats, attr, getattr(stats, attr) + getattr(doc_stats, attr))
        batch.append(doc_id)
        if len(batch) % CHECKPOINT_EVERY == 0:
            conn.commit()
            print(f"  checkpoint: {len(batch)} docs committed "
                  f"(+{stats.written} keys)")
    conn.commit()
    conn.close()
    return stats


# --------------------------------------------------------------------------- #
# Reporting / audit
# --------------------------------------------------------------------------- #

def coverage_report(db_path: Path) -> str:
    conn = sqlite3.connect(str(db_path))
    out = []
    total = conn.execute("SELECT COUNT(*) FROM questions").fetchone()[0]
    keyed = conn.execute(
        "SELECT COUNT(DISTINCT q.id) FROM questions q JOIN official_answers oa"
        " ON oa.doc_id=q.doc_id AND oa.qno=q.qno").fetchone()[0]
    mcq_total = conn.execute(
        "SELECT COUNT(*) FROM questions WHERE q_type='MCQ'").fetchone()[0]
    mcq_keyed = conn.execute(
        "SELECT COUNT(DISTINCT q.id) FROM questions q JOIN official_answers oa"
        " ON oa.doc_id=q.doc_id AND oa.qno=q.qno WHERE q.q_type='MCQ'"
    ).fetchone()[0]
    out.append(f"questions: {keyed}/{total} keyed ({keyed / total * 100:.1f}%)")
    out.append(f"MCQ:      {mcq_keyed}/{mcq_total} keyed "
               f"({(mcq_keyed / mcq_total * 100) if mcq_total else 0:.1f}%)")
    out.append("-- by doc_type --")
    for dt, n, k in conn.execute(
            "SELECT d.doc_type, COUNT(*), SUM(CASE WHEN oa.doc_id IS NOT NULL"
            " THEN 1 ELSE 0 END) FROM questions q JOIN documents d ON"
            " d.id=q.doc_id LEFT JOIN official_answers oa ON"
            " oa.doc_id=q.doc_id AND oa.qno=q.qno GROUP BY d.doc_type"
            " ORDER BY COUNT(*) DESC"):
        out.append(f"  {dt:<10} {k:>6}/{n:<6} ({k / n * 100:.1f}%)")
    out.append("-- by subject (top 15) --")
    for s, n, k in conn.execute(
            "SELECT d.subject, COUNT(*), SUM(CASE WHEN oa.doc_id IS NOT NULL"
            " THEN 1 ELSE 0 END) FROM questions q JOIN documents d ON"
            " d.id=q.doc_id LEFT JOIN official_answers oa ON"
            " oa.doc_id=q.doc_id AND oa.qno=q.qno GROUP BY d.subject"
            " ORDER BY COUNT(*) DESC LIMIT 15"):
        out.append(f"  {s:<20} {k:>6}/{n:<6} ({k / n * 100:.1f}%)")
    conn.close()
    return "\n".join(out)


def sample_pairs(db_path: Path, n: int = 20) -> List[dict]:
    """Random mined keys joined back to their scheme text, for hand audit.
    The question is the EXACT row the key was validated against."""
    conn = sqlite3.connect(str(db_path))
    rows = list(conn.execute(
        "SELECT k.doc_id, k.qno, k.method, k.tier, k.source_doc_id,"
        " k.source_qno, oa.letter, oa.answer_text, q.text,"
        " qt.text, d.filename "
        "FROM key_mining_keys k "
        "JOIN official_answers oa ON oa.doc_id=k.doc_id AND oa.qno=k.qno "
        "LEFT JOIN questions q ON q.id=k.target_qid "
        "JOIN questions qt ON qt.doc_id=k.source_doc_id AND qt.qno=k.source_qno "
        "JOIN documents d ON d.id=k.source_doc_id "
        "ORDER BY RANDOM() LIMIT ?", (n,)))
    conn.close()
    out = []
    for r in rows:
        out.append({
            "target": f"doc={r[0]} qno={r[1]}", "method": r[2], "tier": r[3],
            "letter": r[6], "answer": r[7],
            "question": (r[8] or "")[:220],
            "scheme": (r[9] or "")[:220], "scheme_file": r[10],
        })
    return out


def suspect_keys(db_path: Path, limit: int = 100) -> List[dict]:
    """Verification helper: aligned keys whose question text shares NO
    content words with their scheme block (exclude these)."""
    conn = sqlite3.connect(str(db_path))
    rows = list(conn.execute(
        "SELECT k.doc_id, k.qno, k.method, oa.letter, oa.answer_text,"
        " q.text, qt.text FROM key_mining_keys k "
        "JOIN official_answers oa ON oa.doc_id=k.doc_id AND oa.qno=k.qno "
        "LEFT JOIN questions q ON q.id=k.target_qid "
        "JOIN questions qt ON qt.doc_id=k.source_doc_id AND qt.qno=k.source_qno"))
    conn.close()
    out = []
    for r in rows:
        if is_suspect(r[5] or "", r[6] or ""):
            out.append({"doc_id": r[0], "qno": r[1], "method": r[2],
                        "letter": r[3], "answer_text": r[4],
                        "question": (r[5] or "")[:160],
                        "scheme": (r[6] or "")[:160]})
            if len(out) >= limit:
                break
    return out


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #

def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--db", default=str(DEFAULT_DB))
    ap.add_argument("--run", action="store_true")
    ap.add_argument("--limit", type=int, default=None)
    ap.add_argument("--subject", default=None)
    ap.add_argument("--report", action="store_true")
    ap.add_argument("--sample", type=int, default=0)
    ap.add_argument("--suspects", action="store_true")
    args = ap.parse_args()
    db = Path(args.db or DEFAULT_DB)

    if args.run:
        stats = run_mining(db, limit=args.limit, subject=args.subject)
        print(f"rows={stats.rows} extracted={stats.extracted} "
              f"aligned={stats.aligned} skipped={stats.skipped}")
        print(f"written={stats.written} already_had_key={stats.already} "
              f"propagated={stats.propagated} unmatched={stats.unmatched} "
              f"suspect_rejected={stats.suspect_rejected} "
              f"ordinal_pairs={stats.ordinal_pairs} "
              f"ambiguous_skipped={stats.ambiguous_skipped}")
    if args.report or not (args.run or args.sample or args.suspects):
        print(coverage_report(db))
    if args.sample:
        for i, p in enumerate(sample_pairs(db, args.sample), 1):
            print(f"--- pair {i} [{p['method']}/{p['tier']}] "
                  f"{p['target']} letter={p['letter']} file={p['scheme_file']}")
            print(f"  Q: {p['question']}")
            print(f"  A: {p['answer'][:180]}")
            print(f"  S: {p['scheme']}")
    if args.suspects:
        sus = suspect_keys(db)
        print(f"{len(sus)} suspect keys (excluded from trust):")
        for s in sus:
            print(f"  doc={s['doc_id']} qno={s['qno']} method={s['method']} "
                  f"letter={s['letter']}")
            print(f"    Q: {s['question']}")
            print(f"    S: {s['scheme']}")


if __name__ == "__main__":
    main()
