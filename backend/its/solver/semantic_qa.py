"""Semantic QA engine — bi-encoder recall + cross-encoder re-rank.

Two-stage retrieval over the entire question bank (and node diagnostics):

  Stage 1 (recall):  all-MiniLM-L6-v2 bi-encoder vectors in Qdrant
                     (collection `qa_semantic`, 384-dim cosine).
                     Any student phrasing recalls top-k candidates in ms.
  Stage 2 (re-rank): cross-encoder/ms-marco-MiniLM-L-6-v2 scores each
                     (question, candidate) PAIR together — far more precise
                     than cosine.  Top-1 above the accept threshold ships as
                     VERIFIED_SEMANTIC with the stored answer + source.

LLM-free by construction.  Fail-closed: below-threshold matches refuse
(the caller falls through to guided practice).
"""

from __future__ import annotations

import logging
import os
import json
import re
import threading
import time
from collections import Counter
from typing import Any, Dict, List, Optional, Tuple

log = logging.getLogger(__name__)

QDRANT_URL = os.environ.get("SEMANTIC_QA_QDRANT", "http://127.0.0.1:6333")
COLLECTION = "qa_semantic"
DIM = 384
RECALL_K = 20
RECALL_MIN_SCORE = 0.35          # bi-encoder cosine gate (loose — re-rank decides)
# CALIBRATED 2026-10-03 (evidence: _calib_results.json / _calib_results2.json,
# harnesses _calib_harness.py / _calib_neg_harness.py, CUDA off, 250k-pt index,
# production query() = top-10 rerank + digit-subset guard):
#   POS  60 hand-authored paraphrases of indexed bank questions: best
#        subset-passing re-rank score spans -1.3 .. 9.6, median ~6.3.
#        51/60 (85%) score >= 3.0.  The misses are honest: stock-
#        template rewordings the CE scores at ~0-2.3, and two items
#        whose paraphrase dropped/spelled-out digits (subset guard).
#   NEG  26 everyday questions ABSENT from the bank: -10.4 .. +5.05,
#        median ~ -1 -- 25/26 (96.2%) refuse at 3.0.  The single 5.05
#        outlier is a digit-free everyday ask matched to a digit-
#        bearing proportion question: documented residual (no digit
#        signal exists to refuse it).
#   NEG  6 bank-template phrasings about out-of-bank content:
#        -2.7 .. +3.1 -- 100% refused at 3.0.
#   NEG  14 numeric twins (bank questions with mutated digits, stored
#        answer now WRONG): 6.1-9.6 -- the cross-encoder CANNOT separate
#        these; the digit-subset guard refuses every twin whose mutated
#        digits are absent from the matched row (13/14; the one miss
#        mutated words, not digits -- a documented CE limitation).
# Chosen gate 3.0 (the measured boundary: paraphrase cluster starts
# 3.15, absent-question cluster ends 3.05) => 96%+ of absent questions,
# 100% of template probes and 13/14 numeric twins are refused; the 15%
# paraphrase misses degrade to the guided fallback, never to a wrong
# answer.  (Gate 2.5 would serve 90% of paraphrases but wrongly serves
# 3 of the 26 absent-question probes.)
RERANK_ACCEPT = 3.0              # cross-encoder gate for VERIFIED_SEMANTIC
# LATENCY (2026-10-03, CPU): of the ~1.77s warm query, the 20-pair
# re-rank is 1.68s (embed 63ms + search 27ms).  Re-ranking only the
# top-10 recall hits keeps the same winner in 12/12 calibration probes
# and drops the warm query to ~0.9s (target < 1.5s).
RERANK_TOP = 10
BATCH = 64


def lane_enabled() -> bool:
    """SEMANTIC_QA_LANE gate — DEFAULT OFF (2026-10-04 hardening).

    The lane must be enabled explicitly ("1") in production config AFTER
    the load gate; every other value, including unset, keeps it dark and
    /solve falls through to the honest guided refusal.  (The gate used to
    default ON — a cross-encoder that cannot separate word-mutated twins
    from paraphrases must never be on by default.)
    """
    return os.environ.get("SEMANTIC_QA_LANE", "0") == "1"

# question_type values that carry a real choice list in `options`


def _st():
    # PERF (2026-10-03 solve cold-start): shared model_hub singleton — was a
    # fourth independent SentenceTransformer("all-MiniLM-L6-v2") load (this
    # lane fires on the first GUIDED-leaning solve).
    from backend.ai import model_hub
    return model_hub.load_sync()


def _ce():
    from sentence_transformers import CrossEncoder
    return CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")


def _qdrant():
    from qdrant_client import QdrantClient
    return QdrantClient(url=QDRANT_URL, timeout=120)


def _digit_skeleton(text: str) -> str:
    """Bank_answer's digit-skeleton contract: the ask's numbers, comma-
    joined.  Imported (not reimplemented) so the two lanes can never
    drift apart; the local fallback only covers import failure."""
    try:
        from backend.its.solver.bank_answer import digit_skeleton
        return digit_skeleton(text)
    except Exception:
        import re as _re
        return ",".join(_re.findall(r"[0-9]+(?:\.[0-9]+)?", text or ""))


def _digit_tokens(text: str) -> Dict[str, int]:
    """Multiset of the numbers a text mentions (digit-skeleton tokens)."""
    from collections import Counter
    return Counter(t for t in _digit_skeleton(text).split(",") if t)


def _digits_subset(ask: Dict[str, int], matched: Dict[str, int]) -> bool:
    """True when every number the ask mentions also appears (with at
    least that multiplicity) in the matched question."""
    return all(matched.get(tok, 0) >= cnt for tok, cnt in ask.items())


# --------------------------------------------------------------------------- #
# ROLE GUARD (2026-10-04 hardening, defect: role-permuted digits)
# "Find 15% of 200" and "Find 200% of 15" share the digit set {15, 200},
# so the digit-subset guard accepts both and the cross-encoder scores
# both sky-high -- yet their answers differ by orders of magnitude.  The
# fix: tag every number with the UNIT/ROLE its text attaches to it
# (%/percent -> pct, kg/cm/Rs/hours -> unit class) and require the ask's
# (number, role) pairs to appear in the matched question.  A permutation
# makes the pairs disagree, which refuses the serve.
# --------------------------------------------------------------------------- #

_ROLE_NUM_RX = re.compile(
    r"(?P<num>\d[\d,]*(?:\.\d+)?)"
    r"(?:(?P<pct>\s*(?:%|percent|per\s+cent))"
    r"|(?P<unit>\s+[A-Za-z][A-Za-z.]{0,11}))?",
    re.I)
_CURRENCY_RX = re.compile(
    r"(?:₹|\$|£|€|\binr\b|\brs\.?)\s*(?=[\d,])", re.I)

_UNIT_CLASS = {
    "%": "pct", "percent": "pct", "cent": "pct",
    "rs": "cur", "inr": "cur", "rupee": "cur", "₹": "cur", "$": "cur",
    "kg": "kg", "kilogram": "kg", "quintal": "quintal", "tonne": "tonne",
    "ton": "tonne", "gram": "g", "mg": "mg",
    "km": "km", "meter": "m", "metre": "m", "cm": "cm",
    "mm": "mm", "mile": "mile",
    "litre": "l", "liter": "l", "ml": "ml",
    "hour": "hour", "hr": "hour", "minute": "min", "min": "min",
    "second": "sec", "sec": "sec", "day": "day", "week": "week",
    "month": "month", "year": "year",
    "degree": "deg", "dozen": "dozen", "score": "score",
    "kmph": "kmph", "kmh": "kmph", "kph": "kmph", "mph": "mph",
    "mps": "mps", "kmps": "kmps",
}
# NOTE: single-letter unit classes (m, g, l, V, h) are deliberately NOT
# tagged.  In plain text they sit next to exponent digits ("10^-3 m^2"
# spuriously pairs (3, m), (2, m)) and in the bank's LaTeX form the same
# quantity renders as "\text{m}^2", so the two sides disagree for reasons
# that have nothing to do with a role permutation.  Single-letter unit
# swaps ("5 g" vs "5 m") stay covered by the word-overlap twin ceiling.

_LATEX_TEXT_RX = re.compile(r"\\(?:text|mathrm|mathbf|mathit)\s*\{([^}]*)\}")
_LATEX_SPACE_RX = re.compile(r"\\[,;:!]")

# symmetric preprocessing for role extraction: the ask and the matched
# question go through the SAME pipeline, so plain-text ("2.0 x 10^-3
# m^2") and LaTeX ("2.0 \times 10^{-3} \, \text{m}^2") forms reduce to
# the same (number, unit) pairs instead of inventing exponent-unit pairs.
# The \times alternative (2026-10-04) strips the LaTeX sci-notation
# cluster exactly like the plain "x 10^-3" one — the old pattern saw no
# literal "x" in "\times", so the base "10" survived on the LaTeX side
# only and the two renderings disagreed.  The pattern only ever REMOVES
# cluster text, so it can suppress spurious pairs, never invent them.
_SCI_CLUSTER_RX = re.compile(
    r"(?:x|×|\\times)\s*10\s*(?:\^|[-–])\s*\{?\s*[-+]?\s*\d[\d.]*\s*\}?"
    r"(?:\s*\\[,;:!])?|"
    r"\^\s*\{?\s*[-+]?\s*\d[\d.]*\s*\}?(?:\s*\\[,;:!])?|"
    r"\b10\s*[-–]\s*\d+(?![\d.]*\s*(?:%|per|km|cm|mm|kg|m[lg]\b))",
    re.I)


def _role_text(text: str) -> str:
    t = _LATEX_TEXT_RX.sub(r" \1 ", text or "")
    t = t.replace("\\$", " $ ")
    t = _LATEX_SPACE_RX.sub(" ", t)
    t = _SCI_CLUSTER_RX.sub(" ", t)
    t = re.sub(r"\\[A-Za-z]+", " ", t)
    t = re.sub(r"[{}\\^]", " ", t)   # keep "$" -- the currency marker
    return t


def _norm_num(s: str) -> str:
    """Canonical number token: commas stripped, integral floats collapsed
    ("80.0" == "80") so both sides of the comparison key the same way."""
    s = (s or "").replace(",", "")
    try:
        f = float(s)
    except (TypeError, ValueError):
        return s
    if f == int(f) and abs(f) < 1e15:
        return str(int(f))
    return s


def _unit_class(tok: Optional[str]) -> str:
    t = (tok or "").strip().lower().rstrip(".")
    if not t:
        return ""
    if t in _UNIT_CLASS:
        return _UNIT_CLASS[t]
    if t.endswith("s") and t[:-1] in _UNIT_CLASS:
        return _UNIT_CLASS[t[:-1]]
    return ""


def _role_pairs(text: str) -> Dict[Tuple[str, str], int]:
    """Multiset of (number, role) pairs a text states.  Numbers with no
    recognizable unit/role are omitted -- their presence is the digit-
    subset guard's job; this guard only arbitrates ROLE disagreements.
    Both sides of the comparison run through the same LaTeX/sci-notation
    preprocessing (_role_text), so plain-text and LaTeX renderings of
    the same quantity yield the same pairs."""
    from collections import Counter
    src = _role_text(text)
    pairs: Dict[Tuple[str, str], int] = Counter()
    for m in _ROLE_NUM_RX.finditer(src):
        cls = "pct" if m.group("pct") else _unit_class(m.group("unit"))
        if cls:
            pairs[(_norm_num(m.group("num")), cls)] += 1
    for m in _CURRENCY_RX.finditer(src):
        nm = _ROLE_NUM_RX.match(src, m.end())
        if nm:
            pairs[(_norm_num(nm.group("num")), "cur")] += 1
    return pairs


def _roles_conflict(ask: Dict[Tuple[str, str], int],
                    matched: Dict[Tuple[str, str], int]) -> bool:
    """True when the ask attaches a role/unit to a number the matched
    question does not carry with the SAME role (role-permutation twin).
    Fail-closed: any pair the match cannot account for refuses."""
    return any(matched.get(k, 0) < c for k, c in ask.items())


# --------------------------------------------------------------------------- #
# SKELETON NORMALIZATION (2026-10-04 hardening, the SCIENTIST council's
# permanent fix for the role-permuted-digit hole).  Every number in a
# question is replaced by a TYPED placeholder — <PCT> percents, <CUR>
# currency amounts, <UNIT:kg>-style class-tagged quantities, <INT>/<DEC>
# bare numbers — yielding a skeleton string plus the ordered (type,
# value) slots.  At serve time every typed slot the ask states must be
# CONTAINED in the matched question's slot multiset (order-insensitive:
# "2 hours ... 120 km" is the same question as "120 km in 2 hours", and
# the CORE of a long multi-part bank row may quote — the digit-subset
# guard's calibrated contract), but a role permutation — the twin
# "2 km in 120 hours" — cannot contain the pair (unit:km, 120) and
# refuses.  That is the hole the digit-subset guard is blind to and the
# pair-based role guard only partially covers.
# Index time stores skeleton + slots in the point payload (new keys
# only); old points fall back to computing slots from the stored
# question text — same code path, zero new dependency.
#
# DOCUMENTED RESIDUAL: swapping two numbers of the SAME type (two <CUR>s
# between "first"/"additional" clauses) is invisible to an order-
# insensitive multiset — and must stay invisible, because the same
# order-insensitivity lets reworded clauses accept.  Same-type
# positional twins keep the layered defences: identical wording trips
# the word-overlap ceiling only when content words differ, so genuinely
# restructured same-type swaps remain a known CE-lane limitation, same
# as before this gate (they are rarer than cross-type permutations and
# were never separable here).
# --------------------------------------------------------------------------- #

# single-letter unit classes (m, g, l) stay untagged — see the NOTE
# above _UNIT_CLASS: they sit next to exponent digits and render as
# \text{m}^2 in the bank, so tagging them manufactures disagreements
# that have nothing to do with a permutation.
_SINGLE_LETTER_UNIT_CLASSES = frozenset(
    c for c in set(_UNIT_CLASS.values()) if len(c) == 1)

_SKELETON_GAP_RX = re.compile(r"[^a-z]+")


def normalize_skeleton(text: str) -> Tuple[str, List[Tuple[str, str]]]:
    """Replace every numeric token with a typed placeholder.

    Returns (skeleton, slots).  The skeleton is the lowercased word
    sequence with the placeholders inline (word tokens preserved); slots
    is the ordered list of (type, value) pairs — type one of "pct",
    "cur", "unit:<class>", "int", "dec", value the canonical number
    string (_norm_num: commas stripped, integral floats collapsed, so
    "80.0 kmph" and "80 kmph" key identically).  Both sides of the
    serve-time comparison run through the SAME LaTeX/sci-notation
    preprocessing (_role_text), so plain-text and LaTeX renderings of
    one quantity produce one slot.
    """
    src = _role_text(text)
    taken: List[Tuple[int, int, str, Tuple[str, str]]] = []
    # Currency-prefixed amounts first (Rs 50, Rs. 1,200, ₹ 500, $ 5):
    # prefix + number consumed together so the bare scan below cannot
    # double-count the number.
    for cm in _CURRENCY_RX.finditer(src):
        nm = _ROLE_NUM_RX.match(src, cm.end())
        if nm and nm.group("num"):
            taken.append((cm.start(), nm.end(), "<CUR>",
                          ("cur", _norm_num(nm.group("num")))))
    for m in _ROLE_NUM_RX.finditer(src):
        if any(s <= m.start() < e for s, e, _ph, _sl in taken):
            continue    # already consumed as a currency amount
        val = _norm_num(m.group("num"))
        if m.group("pct"):
            taken.append((m.start(), m.end(), "<PCT>", ("pct", val)))
            continue
        cls = _unit_class(m.group("unit")) if m.group("unit") else ""
        if cls == "cur":                       # "50 rupees", "20 Rs"
            taken.append((m.start(), m.end(), "<CUR>", ("cur", val)))
        elif cls and cls not in _SINGLE_LETTER_UNIT_CLASSES:
            taken.append((m.start(), m.end(), f"<UNIT:{cls}>",
                          (f"unit:{cls}", val)))
        else:
            # bare number (incl. deliberately untagged single-letter
            # units): only the number span is replaced — the word that
            # followed it ("5 g" -> "<INT> g") stays a word.
            typ = "dec" if "." in val else "int"
            taken.append((m.start("num"), m.end("num"),
                          "<INT>" if typ == "int" else "<DEC>",
                          (typ, val)))
    taken.sort(key=lambda t: t[0])
    parts: List[str] = []
    slots: List[Tuple[str, str]] = []
    pos = 0
    for s, e, ph, slot in taken:
        if s < pos:
            continue    # overlapping match (defensive): first wins
        gap = _SKELETON_GAP_RX.sub(" ", src[pos:s].lower()).strip()
        if gap:
            parts.append(gap)
        parts.append(ph)
        slots.append(slot)
        pos = e
    tail = _SKELETON_GAP_RX.sub(" ", src[pos:].lower()).strip()
    if tail:
        parts.append(tail)
    return " ".join(parts), slots


def _slots_conflict(ask_slots: List[Tuple[str, str]],
                    matched_slots: List[Tuple[str, str]]) -> bool:
    """True when the ask attaches a typed value the matched question
    does not carry: every (type, value) the ask states must appear in
    the matched question with at least that multiplicity (multiset
    containment, order-insensitive).  CONTAINMENT, not equality, is the
    lane's documented contract (same as the digit-subset guard): a
    student may quote the CORE of a long multi-part bank row (its extra
    part-(b)/(c) numbers must not refuse the serve).  A role permutation
    still refuses — "2 km in 120 hours" simply does not CONTAIN the pair
    (unit:km, 120) — and so does any value mutation.  An ask with no
    numbers imposes no constraint (the digit guard's convention)."""
    if not ask_slots:
        return False
    matched_c = Counter(matched_slots)
    return any(matched_c.get(k, 0) < c for k, c in Counter(ask_slots).items())


def _payload_slots(pl: Dict[str, Any],
                   matched_text: str) -> List[Tuple[str, str]]:
    """Candidate slots: the index-time payload copy when present, else
    computed from the stored question text (points indexed before the
    payload carried skeleton/slots — same code path, zero new
    dependency).  Malformed payload shapes raise; the caller fails
    closed."""
    raw = pl.get("slots")
    if isinstance(raw, str) and raw.strip():
        return [(str(s[0]), str(s[1])) for s in json.loads(raw)]
    if isinstance(raw, list):
        return [(str(s[0]), str(s[1])) for s in raw]
    return normalize_skeleton(matched_text)[1]


def _slot_gate_allows(text: str, matched_text: str,
                      payload_slots: Any) -> bool:
    """Fail-closed wrapper around the slot comparison: ANY trouble —
    malformed payload JSON, unexpected shapes, a normalize error —
    refuses the serve.  The gate must never be the reason a wrong
    VERIFIED ships; a refusal just falls through to guided practice."""
    try:
        ask_slots = normalize_skeleton(text)[1]
        return not _slots_conflict(
            ask_slots,
            _payload_slots({"slots": payload_slots}, matched_text))
    except Exception:
        return False


# --------------------------------------------------------------------------- #
# WORD-OVERLAP TWIN CEILING (2026-10-04 hardening, defect: word-mutated
# twins).  "How do you find the area of a circle?" vs "...circumference..."
# share the frame, so the cross-encoder scores both high -- but one
# swapped content word makes the stored answer wrong.  When the matched
# question shares >= WORD_TWIN_OVERLAP of its non-number tokens with the
# ask, it is only servable if it is the SAME question: identical digit
# skeletons AND no content word differs (stopword-only differences are
# honest paraphrase).  Threshold note: the calibrated 90% figure misses
# the confirmed area/circumference twin (shared = 8/9 = 0.889 of the
# smaller side), so the ceiling sits at 0.85 -- still far above the
# sampled legitimate rewordings (<= 0.78: a synonym or restructure drops
# several function words at once).
# --------------------------------------------------------------------------- #

_WORD_TWIN_OVERLAP = 0.85
_WORD_RX = re.compile(r"[a-z]+")
_STOPWORDS = frozenset("""a an the is are was were be been being am do does
did done has have had having of in on at to for with by from as and or but
nor so yet if then than that this these those it its he she they them his
her their our your my me us you we i who whom whose which what when where
why how not no yes very too also just only about above below between into
onto over under again further once here there all any both each few more
most other some such own same can will would shall should may might
must""".split())


def _word_tokens(text: str) -> Dict[str, int]:
    """Multiset of the text's non-number (alpha) tokens, lowercased."""
    from collections import Counter
    return Counter(_WORD_RX.findall((text or "").lower()))


def _twin_refusal(ask_words: Dict[str, int], matched_words: Dict[str, int],
                  ask_digits: Dict[str, int],
                  matched_digits: Dict[str, int]) -> bool:
    """True when a near-identical match is a twin rather than a
    paraphrase: word-overlap over the ceiling AND (digits differ OR a
    content word differs)."""
    if not ask_words or not matched_words:
        return False
    shared = sum((Counter(ask_words) & Counter(matched_words)).values())
    denom = min(sum(ask_words.values()), sum(matched_words.values()))
    if denom <= 0 or shared / denom < _WORD_TWIN_OVERLAP:
        return False
    # Near-identical wording: only the SAME question may serve.
    if ask_digits != matched_digits:
        return True
    diff_ask = Counter(ask_words) - Counter(matched_words)
    diff_matched = Counter(matched_words) - Counter(ask_words)
    if any(t not in _STOPWORDS for t in diff_ask) \
            or any(t not in _STOPWORDS for t in diff_matched):
        return True
    return False


# --------------------------------------------------------------------------- #
# CONTEXT GUARD (2026-10-04 hardening, defect: no board/subject/class
# filter at serve time).  A stored row from another board (or a
# QUARANTINED row) must never serve an ask whose context names a board;
# likewise subject and class.  Pure function so the gate is unit-testable
# without models or a DB.
# --------------------------------------------------------------------------- #

def _context_conflict(subject: str, class_level: int, board: str,
                      row: Dict[str, Any]) -> bool:
    ctx_subject = (subject or "").strip().lower()
    ctx_class = int(class_level or 0)
    ctx_board = (board or "").strip().upper()
    row_subject = str(row.get("subject") or "").strip().lower()
    row_class = int(row.get("class") or 0)
    row_board = str(row.get("board") or "").strip().upper()
    # QUARANTINED rows are out of the serving pool no matter the ask.
    if row_board == "QUARANTINED":
        return True
    # When the ask carries context, the row must carry the SAME context
    # ("equal, or both empty"); a row with no subject/class cannot be
    # shown to match a known context, so it refuses (fail-closed).
    if ctx_subject and row_subject != ctx_subject:
        return True
    if ctx_class and row_class != ctx_class:
        return True
    if ctx_board and row_board and row_board != ctx_board:
        return True
    return False


def _full_row(qid: str) -> Optional[Dict[str, Any]]:
    """Authoritative bank row for the guards (pk lookup, ~1ms via
    bank_answer's shared sync engine): the UNTRUNCATED question_text plus
    subject/class_level/board.  Guards run against this even for points
    indexed before the payload carried board.  None on any trouble ->
    guards fall back to the recall payload (truncation can only cause
    MORE refusals, never fewer)."""
    try:
        from backend.its.solver.bank_answer import _engine
        from sqlalchemy import text as _text
        with _engine().connect() as cx:
            row = cx.execute(
                _text("SELECT question_text, subject, class_level, board "
                      "FROM board_questions WHERE id=:q"),
                {"q": qid}).fetchone()
        if not row:
            return None
        return {"q": str(row[0] or ""), "subject": str(row[1] or ""),
                "class": int(row[2] or 0), "board": str(row[3] or "")}
    except Exception:
        return None


def ensure_collection() -> None:
    from qdrant_client.models import Distance, VectorParams
    qc = _qdrant()
    if not qc.collection_exists(COLLECTION):
        qc.create_collection(
            COLLECTION,
            vectors_config=VectorParams(size=DIM, distance=Distance.COSINE))


def _bank_rows(limit: Optional[int] = None, min_id: int = 0):  # min_id = row OFFSET
    import psycopg2
    pw = [l.strip().split("=", 1)[1]
          for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
          if l.startswith("POSTGRES_PASSWORD=")][0]
    conn = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                            user="dream_user", password=pw)
    cur = conn.cursor()
    # board rides in the payload so a rebuilt index can serve-time-filter
    # by board (CBSE vs ICSE; QUARANTINED rows are refused at query time
    # by _context_conflict regardless).  Row set and ORDER are unchanged
    # (SELECT column addition only), so resume checkpoints stay valid.
    q = ("SELECT id, question_text, correct_answer, subject, class_level, "
         "question_type, board FROM board_questions "
         "WHERE question_text IS NOT NULL AND length(question_text) > 10 "
         "AND correct_answer IS NOT NULL AND correct_answer <> '' "
         "ORDER BY created_at, id")
    if min_id and not limit:
        q += " OFFSET %s"
        cur.execute(q, (min_id,))
    elif limit:
        q += " LIMIT %s"
        cur.execute(q, (limit,))
    else:
        cur.execute(q)
    rows = cur.fetchall()
    conn.close()
    return rows


def build_index(limit: Optional[int] = None, resume: bool = True) -> Dict[str, Any]:
    """Embed bank questions into Qdrant.  Resumable via checkpoint file."""
    import numpy as _np
    from qdrant_client.models import PointStruct

    ensure_collection()
    ckpt_path = os.path.join(os.path.dirname(__file__), "_qa_idx_ckpt.json")
    min_row = 0
    if resume and os.path.exists(ckpt_path):
        try:
            min_row = int(json.load(open(ckpt_path)).get("offset", 0))
        except Exception:
            min_row = 0
    rows = _bank_rows(limit, min_id=min_row)
    model = _st()
    qc = _qdrant()
    t0 = time.time()
    done = 0
    done_rows = 0
    for i in range(0, len(rows), BATCH):
        chunk = rows[i:i + BATCH]
        texts = [r[1] for r in chunk]
        vecs = model.encode(texts, batch_size=128,
                            normalize_embeddings=True, show_progress_bar=False)
        points = []
        for r, v in zip(chunk, vecs):
            # skeleton + slots ride in the payload (ADDED keys only —
            # qid/q/answer/subject/class/qtype/source/board untouched) so
            # serve time compares typed slot multisets without a second
            # normalize pass; points indexed before these keys existed
            # fall back to computing slots from the stored q text.
            # Computed from the UNTRUNCATED question text (payload "q"
            # is clipped at 600 chars).
            skel, slots = normalize_skeleton(r[1])
            points.append(PointStruct(
                id=str(r[0]),   # bank ids are UUIDs — Qdrant accepts them
                vector=v.tolist() if hasattr(v, "tolist") else list(v),
                payload={"qid": str(r[0]), "q": r[1][:600],
                         "answer": (r[2] or "")[:1500],
                         "subject": r[3] or "", "class": int(r[4] or 0),
                         "qtype": r[5] or "", "source": "bank",
                         "board": (r[6] or "") if len(r) > 6 else "",
                         "skeleton": skel,
                         "slots": json.dumps(slots, ensure_ascii=False)}))
        for attempt in range(4):
            try:
                qc.upsert(COLLECTION, points=points, wait=True)
                break
            except Exception as ue:
                if attempt == 3:
                    raise
                time.sleep(2 * (attempt + 1))
        done += len(chunk)
        done_rows += len(chunk)
        rate = done / max(1e-9, time.time() - t0)
        print(f"  indexed {done:,}/{len(rows):,} | {rate:.0f}/s | "
              f"offset={done_rows}", flush=True)
        if done % (BATCH * 20) == 0:
            json.dump({"offset": min_row + done_rows}, open(ckpt_path, "w"))
    json.dump({"offset": min_row + done_rows}, open(ckpt_path, "w"))
    return {"indexed": done, "offset": min_row + done_rows,
            "minutes": round((time.time() - t0) / 60, 1)}


class SemanticQA:
    """Query-time matcher: recall → cross-encoder re-rank → verified."""

    def __init__(self):
        self._st_model = None
        self._ce_model = None
        self._qc = None

    def _models(self):
        if self._st_model is None:
            self._st_model = _st()
        if self._ce_model is None:
            self._ce_model = _ce()
        if self._qc is None:
            self._qc = _qdrant()
        return self._st_model, self._ce_model, self._qc

    def query(self, text: str, subject: str = "",
              class_level: int = 0,
              board: str = "") -> Optional[Dict[str, Any]]:
        """Return {question, answer, score, rerank, subject, source} or None.

        GUARD CHAIN (2026-10-04): rerank threshold -> digit-subset ->
        role check -> skeleton slot multiset -> subject/class ->
        word-overlap twin ceiling -> board.  ANY failure returns None --
        the caller falls through to guided practice; this lane must
        never ship a wrong answer.
        """
        if not text or len(text.strip()) < 10:
            return None
        st, ce, qc = self._models()
        try:
            v = st.encode([text], normalize_embeddings=True)[0]
        except Exception as exc:
            log.warning("semantic_qa embed failed: %s", exc)
            return None
        flt = None
        if class_level or (subject or "").strip():
            from qdrant_client.models import FieldCondition, Filter, \
                MatchValue
            conds = []
            if class_level:
                conds.append(FieldCondition(
                    key="class", match=MatchValue(value=int(class_level))))
            ctx = (subject or "").strip()
            if ctx:
                conds.append(FieldCondition(
                    key="subject", match=MatchValue(value=ctx)))
            flt = Filter(must=conds)
        try:
            resp = qc.query_points(
                COLLECTION, query=list(v), query_filter=flt,
                limit=RECALL_K, score_threshold=RECALL_MIN_SCORE)
            hits = resp.points
        except Exception as exc:
            log.warning("semantic_qa search failed: %s", exc)
            return None
        if not hits:
            return None
        hits = hits[:RERANK_TOP]   # latency: the CE re-rank is the cost
        pairs = [(text, h.payload.get("q", "")) for h in hits]
        try:
            scores = ce.predict(pairs, batch_size=8)
        except Exception as exc:
            log.warning("semantic_qa rerank failed: %s", exc)
            return None
        best_i = max(range(len(hits)), key=lambda i: scores[i])
        best_score = float(scores[best_i])
        if best_score < RERANK_ACCEPT:
            return None
        h = hits[best_i]
        pl = h.payload or {}
        # Guards run against the AUTHORITATIVE row (untruncated text +
        # subject/class/board straight from the bank) so they hold for
        # points indexed before the payload carried those fields.
        row = _full_row(pl.get("qid", "")) or {}
        matched_text = row.get("q") or pl.get("q", "") or ""
        # DIGIT-SUBSET GUARD (twin defence, extends bank_answer.py's
        # skeleton contract): EVERY number the ask mentions must also
        # appear in the matched question.  A digits-mutated twin scores
        # 6-9.6 on the cross-encoder (see calibration note) but its
        # mutated values can never be a subset of the original's, so it
        # is refused; an ask that only QUOTES PART of a long bank
        # question (its digits all present) survives into the role and
        # twin-ceiling guards below.  (The full-row fetch replaces the
        # old confirm-on-refusal pattern: payload text is truncated at
        # 600 chars, and the old code already confirmed every refusal
        # against the full text, so decisions are identical.)
        sk_q = _digit_tokens(text)
        sk_m = _digit_tokens(matched_text)
        if sk_q and not _digits_subset(sk_q, sk_m):
            log.debug("semantic_qa twin refused: digit subset mismatch")
            return None
        # ROLE GUARD (defect: "Find 15% of 200" vs "Find 200% of 15" —
        # same digit set, different math).  The ask's (number, unit/role)
        # pairs must appear in the matched question; a permutation of
        # roles (percent vs base, or any unit swap) refuses the serve.
        if _roles_conflict(_role_pairs(text), _role_pairs(matched_text)):
            log.debug("semantic_qa twin refused: role/unit mismatch")
            return None
        # SKELETON SLOT GATE (the role-permuted-digit hole the digit-
        # subset guard cannot see): every TYPED placeholder value the ask
        # states (<PCT>/<CUR>/<UNIT:kg>/<INT>/<DEC>) must be contained in
        # the matched question's typed slots — order-insensitive, so a
        # rewording that moves "2 hours" still accepts and the core of a
        # long multi-part row still quotes, while a twin that swaps the
        # roles of 120 and 2 ("120 km in 2 hours" vs "2 km in 120 hours")
        # carries a pair the match cannot contain and refuses.  Slots
        # come from the payload when the point carries them, else they
        # are computed from the stored question text.  Fail-closed: any
        # trouble in the gate refuses, never verifies.
        if not _slot_gate_allows(text, matched_text, pl.get("slots")):
            log.debug("semantic_qa twin refused: skeleton slot mismatch")
            return None
        # SUBJECT/CLASS GUARD: a stored row must belong to the ask's
        # context (equal, or both empty).  Enforced even though recall
        # filters on context -- the filter needs exact vocabulary, the
        # guard is case-insensitive defence in depth.
        if _context_conflict(subject, class_level, board, row):
            log.debug("semantic_qa refused: subject/class/board context")
            return None
        # WORD-OVERLAP TWIN CEILING (defect: "area of a circle" vs
        # "circumference of a circle" — identical frame, one swapped
        # content word, cross-encoder blind).  Near-identical matches
        # must be the SAME question: identical digits AND no content
        # word differs.
        if _twin_refusal(_word_tokens(text), _word_tokens(matched_text),
                         sk_q, sk_m):
            log.debug("semantic_qa twin refused: word-overlap ceiling")
            return None
        return {"question": pl.get("q", ""), "answer": pl.get("answer", ""),
                "rerank": round(best_score, 3),
                "recall": round(float(h.score), 3),
                "subject": pl.get("subject", ""),
                "class": pl.get("class", 0),
                "source": f"semantic:{pl.get('source', 'bank')}:{pl.get('qid')}",
                "matched_question": pl.get("q", "")}


_matcher: Optional[SemanticQA] = None
_matcher_lock = threading.Lock()


def get_matcher() -> SemanticQA:
    """Process-wide matcher.  Double-checked locking: gunicorn worker
    threads hit this concurrently on the first question -- model loads
    must happen exactly once."""
    global _matcher
    if _matcher is None:
        with _matcher_lock:
            if _matcher is None:
                _matcher = SemanticQA()
    return _matcher


def warm() -> bool:
    """Boot-time warm (main.py lifespan): cross-encoder + qdrant client
    + one full query, so no student's first GUIDED-leaning question pays
    the model load (a cold CE load is seconds; the solve endpoint runs
    under a 60s budget).  Best-effort: False just means the lane will
    warm lazily on its first caller."""
    try:
        m = get_matcher()
        m._models()
        m.query("warmup sentence for the semantic question bank lane")
        return True
    except Exception:
        return False


if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        lim = int(sys.argv[2]) if len(sys.argv) > 2 else None
        print(json.dumps(build_index(limit=lim), indent=1))
    elif len(sys.argv) > 2 and sys.argv[1] == "query":
        r = get_matcher().query(" ".join(sys.argv[2:]),
                                subject="", class_level=0)
        print(json.dumps(r, indent=1, ensure_ascii=False) if r
              else "NO MATCH above threshold")
