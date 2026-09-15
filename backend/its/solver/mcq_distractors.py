"""mcq_distractors.py -- deterministic verbal MCQ synthesis for the
humanities/commerce catalogs (social, political, economics, business,
history, geography, sociology, psychology, home_science; classes 6-12),
for the drafted history/geography question banks under
questions/generated/, and for the english/hindi GRAMMAR catalogs
(one-word-fill items).

The humanities catalogs carry verbal worked examples
({"question", "solution", "answer"}) whose answers are prose, not
numbers, so the numeric mcq_generator cannot touch them.  This module
turns each of those items into a 3-option MCQ -- the authored answer
plus two plausible-but-wrong distractors -- with NO model calls and NO
randomness that isn't seeded by the question text itself: identical
serve, identical options, identical order.

Distractor strategies, tried in quality order:

    sibling   the key idea / definition / answer of an ADJACENT
              concept from the same chapter (a real, well-formed
              claim about the neighbouring idea -- the classic
              "confusable statement" distractor)
    swap      one key term of the correct claim replaced by a
              same-category term harvested from the same chapter
              ("Parliament" -> "Judiciary", "Factoring" -> "Leasing")
    number    a year / percentage / quantity in the answer perturbed
              the way a misremembering student would (1952 -> 1957,
              51% -> 49%)
    template  last resort, at most ONE per item and never alone:
              a grammatical polarity flip or scope cap of the
              correct claim

GRAMMAR items (english_grammar / hindi_grammar) get their own
strategy: the answers are one-word fills ("is", "lives", "at") or
short Devanagari forms ("लड़के", "इति + आदि"), so the distractors are
SAME-CATEGORY wrong forms drawn from sibling questions' answer pools
in the same class/language -- other forms of the same verb (via the
question's "(be)" hint bucket), other words of the same instruction
type (the "संधि विच्छेद कीजिए" prefix bucket), the whole-file answer
pool as fallback -- and, when the question already lists its own
options ("Choose the antonym of 'ancient': (modern, antique, aged)",
or a labelled "(a) ... (b) ... (c) ..." spelling item), exactly those
authored alternatives.  Devanagari text flows through json writes
only; the store is utf-8 with ensure_ascii=False.

Purity guard: an item is only published when two GENUINELY distinct
distractors exist -- at least one from a content strategy
(sibling/swap/number), all options pairwise distinct with a bounded
overlap against the key, the key at least four words (or a genuine
numeric answer for computation items).  Items that fail stay honest
self_check serves; they are never force-graded.

Scope of eligibility: only VERBAL items -- answers with no digit
anywhere.  Numeric-answer items are graded by grade_numeric in
tutor.py and never consult the store, so synthesizing options for
them would be dead weight.

Store: build_store() writes backend/its/questions/generated/
mcq_humanities.json, keyed by mcq_key(question) so tutor.py can
consult it at pool-load (a dict lookup) instead of re-synthesizing
per boot:

    {"_meta": {...},
     "<hash16>": {"options": [..3 strings..],
                  "correct_index": 0|1|2,
                  "source_catalog": "catalog_class10_social_ch1.json",
                  "concept_id": "c10ss.1.1",
                  "catalog_level": false,
                  "strategies": ["sibling", "swap"]}}

Keys other than "_meta" are MCQ entries.  The hash input is the pool
item's question text exactly as tutor.py loads it (str, stripped,
internal whitespace collapsed), so lookup() matches at serve time.
grade_mcq() maps a student reply (1-based index, a/b/c letter, or
option text) to True/False for the normal correct/wrong BKT path.
"""

from __future__ import annotations

import glob
import hashlib
import json
import os
import random
import re
from typing import Dict, Iterable, Iterator, List, Optional, Sequence, Tuple

# --------------------------------------------------------------------- #
# tunables (documented constants, not magic numbers)
# --------------------------------------------------------------------- #
STORE_FILENAME = "mcq_humanities.json"     # in its/questions/generated/
SCHEMA = "mcq_humanities_v1"
OPTIONS_PER_MCQ = 3                        # key + two distractors

MAX_OPTION_CHARS = 200                     # option readability ceiling
MIN_KEY_WORDS = 4                          # a shorter key reads degenerate
MIN_DISTRACT_WORDS = 3                     # fragments read as wrong-flags

FAR_OVERLAP_MAX = 0.60                     # sibling vs key: different claim
NEAR_OVERLAP_MIN = 0.45                    # swap/number vs key: same claim
PAIR_OVERLAP_MAX = 0.80                    # distractor vs distractor
NUMERIC_WORD_FLOOR = 2                     # numeric keys may be this short

YEAR_MIN, YEAR_MAX = 1700, 2035            # plausible year band
YEAR_DELTAS = (2, 3, 5, 7, 10, 12, 17)     # misremembering distances
PERCENT_DELTAS = (3, 5, 10, 15, 20)
QUANT_FACTORS = (0.5, 1.5, 2.0, 0.25, 3.0)
ZERO_DELTAS = (1, 2, 5, 10)                # additive: nothing * 0.5 = 0

# authored answers that are template artifacts, not real content
# ('Fisheries Production Distribution applied step by step gives the
# required result.') -- an MCQ key can only be as good as its answer
_JUNK_ANSWER_RE = re.compile(
    r"applied step by step|gives the required result|"
    r"leads to the required|the required value|"
    r"the computed result is the required", re.I)

# answers that only make sense against their own question
_YESNO_RE = re.compile(r"^\s*(yes|no)\s*[,.]", re.I)

_SENTENCE_ABBREV_RE = re.compile(r"\b(?:e\.g|i\.e|vs|etc|approx|No)\.\s*$")

TEMPLATE_CAP = 1                           # template distractors per item
CONTENT_STRATEGIES = ("sibling", "swap", "number")
SIBLING_FILE_FALLBACK = 6                  # extra same-subject catalogs

# subjects in scope; filename tokens -> report group (a catalog file
# whose JSON "subject" is a language never yields tutor material).
# GRAMMAR groups get the sibling-answer-pool builder; everything else
# gets the claim/swap/number builder.
SUBJECT_GROUPS: Dict[str, Tuple[str, ...]] = {
    "social": ("social", "social_science"),
    "political": ("political_science", "political_theory"),
    "economics": ("economics",),
    "business": ("business_studies",),
    "history": ("history",),
    "geography": ("geography",),
    "sociology": ("sociology",),
    "psychology": ("psychology",),
    "home_science": ("home_science",),
    "english_grammar": ("english_grammar",),
    "hindi_grammar": ("hindi_grammar",),
}
GRAMMAR_GROUPS = frozenset({"english_grammar", "hindi_grammar"})
_GROUP_OF_TOKEN = {tok: grp
                   for grp, toks in SUBJECT_GROUPS.items()
                   for tok in toks}
_EXCLUDED_SUBJECTS = frozenset({"english", "engl", "hindi", "hin"})

_FILENAME_RE = re.compile(r"catalog_class(\d{1,2})_(.+)\.json")
_KNOWN_TOKENS = sorted(_GROUP_OF_TOKEN, key=len, reverse=True)


def _parse_filename(name: str) -> Optional[Tuple[int, str]]:
    """(class, subject-token) from 'catalog_class10_social_ch1.json'
    or 'catalog_class12_sociology_lesy204.json' -- the subject is the
    longest known scope token after the class; the trailing code is
    arbitrary (chapter codes, NCERT book codes)."""
    m = _FILENAME_RE.match(name)
    if not m:
        return None
    try:
        cls = int(m.group(1))
    except ValueError:
        return None
    tail = m.group(2)
    for tok in _KNOWN_TOKENS:
        if tail == tok or tail.startswith(tok + "_"):
            return cls, tok
    return None

_NUM_RE = re.compile(r"-?\d[\d,]*(?:\.\d+)?")
_SENT_SPLIT_RE = re.compile(r"(?<=[.!?])\s+")
_CAP_PHRASE_RE = re.compile(
    r"(?<![\w.])((?:[A-Z][a-z]{2,}|[A-Z]{2,})(?:\s+(?:of|the|and|for|"
    r"del|de|al)?\s*[A-Z][a-z]{2,}){0,2})")

_STOPWORDS = frozenset("""
a an the this that these those it its is are was were be been being am
do does did has have had will would can could shall should may might
must not no nor and or but if as at by for from in into of on onto to
with without over under above below between among through during
before after while when where what which who whom whose why how their
there here they them he she his her we our you your i me my us out up
down off than then so such very more most much many few other another
some any each every all both either neither one two three also only
just about against because
""".split())

# capitalized words that open sentences everywhere and are never
# chapter terms (proper-noun harvest hygiene)
# hygiene blacklist, matched lowercase (harvest checks w.lower())
_NON_TERMS = frozenset(w.lower() for w in """
What Why How When Which Who Where The This That These Those It In On
At As For From With Under Over Since Because If But And Or So They
There Their He She We You I A An His Her Its Our Your Not However
Although Though While During Before After Between Among Thus Hence
Also Only Even Just Still Yet First Second Third Finally Meanwhile
Moreover Besides Therefore Instead Despite Without Throughout Answer
Question Example Chapter Class Subject Formula Concept
Different Various Several Some Many Few All Both Each Every Such Most
Other Others Another Certain Same More Less Least Best Fewer Two None
Any Much Little
Calculate Compare Explain Describe State Define Mention Draw Find
Give Write List Identify Distinguish Suggest Discuss Examine Evaluate
Analyse Analyze Justify Name Apply Interpret Note Read Study Learn
Remember Understand Recall Arrange Classify Measure Consider
January February March April May June July August September October
November December Monday Tuesday Wednesday Thursday Friday Saturday
""".split())

# built-in same-category term banks, used when the chapter harvest is
# thin (short-answer items still need same-category swaps).  Small,
# curated, CBSE-social-science oriented; the chapter's own vocabulary
# always takes priority.
CATEGORY_BANKS: Dict[str, Tuple[str, ...]] = {
    "institutions": (
        "Parliament", "the Judiciary", "the Executive", "the Legislature",
        "the Cabinet", "the Election Commission", "the Civil Services",
        "the Police", "the Military", "the Press", "local government",
        "the State", "the federal government"),
    "places": (
        "Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru",
        "the countryside", "urban areas", "rural areas"),
    "finance": (
        "Trade credit", "Leasing", "Factoring", "a bank loan",
        "retained earnings", "equity shares", "preference shares",
        "debentures", "a public deposit", "a commercial paper"),
    "markets": (
        "the money market", "the capital market", "the stock exchange",
        "the primary market", "the secondary market"),
}

# --------------------------------------------------------------------- #
# text helpers
# --------------------------------------------------------------------- #
def normalize(text: str) -> str:
    """Canonical question form: stripped, internal whitespace
    collapsed -- stable across JSON writers."""
    return " ".join(str(text or "").split())


def mcq_key(question: str) -> str:
    """The store key for a question: 16 hex chars of sha256 over the
    normalized text.  tutor.py recomputes this on the pool item's
    question at pool-load."""
    return hashlib.sha256(
        normalize(question).encode("utf-8")).hexdigest()[:16]


def _words(text: str) -> List[str]:
    return re.findall(r"[A-Za-z][A-Za-z'-]*", str(text or ""))


def _tokens(text: str) -> List[str]:
    """Lowercased content tokens (stopwords dropped) plus number
    markers ('#30') -- two claims differing only in a figure must NOT
    read as identical, which is exactly what a numeric MCQ needs."""
    out = [w for w in (t.lower().strip("'-") for t in _words(text))
           if w and w not in _STOPWORDS]
    out += ["#" + n for n in _NUM_RE.findall(str(text or ""))]
    return out


def _jaccard(a: Sequence[str], b: Sequence[str]) -> float:
    sa, sb = set(a), set(b)
    if not sa or not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)


def first_sentence(text: str,
                   max_chars: int = MAX_OPTION_CHARS) -> Optional[str]:
    """The option-length form of a longer authored claim: the first
    sentence, extended to a second only when the first is a fragment.
    Never invents content; returns None when the claim only fits by
    being hard-cut mid-sentence -- a truncated option is a visible
    wrong-flag and never published."""
    text = normalize(text).rstrip()
    if not text:
        return None
    parts = [p.strip() for p in _SENT_SPLIT_RE.split(text) if p.strip()]
    if not parts:
        return None
    out = parts[0]
    if (len(_words(out)) < MIN_KEY_WORDS and len(parts) > 1) \
            or _SENTENCE_ABBREV_RE.search(out):
        out = out + " " + parts[1]
    if len(out) > max_chars:
        return None
    return out.strip()


def _is_numeric_answer(text: str) -> bool:
    """A computation item's bare figure ('6.0', '50'): eligible when
    digits dominate the token stream."""
    words = _words(text)
    nums = _NUM_RE.findall(str(text or ""))
    return bool(nums) and len(nums) >= max(1, len(words) - 1)


def _fmt_number(value: float, template: str) -> str:
    """Render a perturbed number with the original's formatting
    (decimals stay decimal, commas only when the original had them)."""
    if "." in template:
        decimals = len(template.split(".")[-1])
        out = ("%." + str(decimals) + "f") % value
    elif value == int(value):
        out = str(int(value))
    else:
        out = ("%g" % value)
    if "," in template:
        whole, _, frac = out.partition(".")
        sign = "-" if whole.startswith("-") else ""
        whole = whole.lstrip("-")
        groups = []
        while len(whole) > 3:
            groups.insert(0, whole[-3:])
            whole = whole[:-3]
        groups.insert(0, whole)
        out = sign + ",".join(groups) + (("." + frac) if frac else "")
    return out


# --------------------------------------------------------------------- #
# candidate builders (each returns a list of (text, strategy))
# --------------------------------------------------------------------- #
def _sibling_candidates(
        key_opt: str,
        siblings: Iterable[dict]) -> List[Tuple[str, str]]:
    """Well-formed claims about ADJACENT concepts -- definition and
    key-idea first sentences, each sibling worked answer as its own
    claim, plus their joined answer text."""
    key_tok = _tokens(key_opt)
    out: List[Tuple[str, str]] = []
    seen = set()

    def consider(text: str) -> None:
        text = first_sentence(str(text or ""))
        if not text:
            return
        if _YESNO_RE.match(text):
            return    # a yes/no answer to a DIFFERENT question
        norm = normalize(text).lower()
        if norm in seen:
            return
        if len(_words(text)) < MIN_DISTRACT_WORDS + 1:
            return
        if _jaccard(_tokens(text), key_tok) > FAR_OVERLAP_MAX:
            return      # too close to the key to be a distractor
        seen.add(norm)
        out.append((text, "sibling"))

    for sib in siblings or []:
        for field in ("answer", "key_idea", "definition"):
            consider(sib.get(field))
        for ans in sib.get("answers") or []:
            consider(ans)
    return out


def _short_term_candidates(
        answer: str,
        siblings: Iterable[dict],
        chapter_terms: Sequence[str]) -> List[Tuple[str, str]]:
    """Same-category SHORT terms for short-answer items ('Factoring',
    'west', 'covered drains'): sibling concept titles' leading
    definition terms, the sibling questions' own short ANSWERS (for a
    'in which direction...' item the neighbouring answers are exactly
    the same-category confusions), and the chapter's harvested term
    vocabulary."""
    ans_norm = normalize(answer).lower()
    out: List[Tuple[str, str]] = []
    seen = {ans_norm}

    def add(term: str) -> None:
        term = normalize(term).rstrip(".")
        if not (1 <= len(_words(term)) <= 4):
            return
        norm = term.lower()
        if norm in seen:
            return
        if _jaccard(_tokens(term), _tokens(answer)) > FAR_OVERLAP_MAX:
            return
        seen.add(norm)
        out.append((term, "sibling"))

    for sib in siblings or []:
        # NOTE: concept TITLES are deliberately not a source -- a
        # title ('Nehru's Approach to Nation-Building') is a label,
        # not a claim, and reads as unresponsive next to a question
        definition = normalize(str(sib.get("definition") or ""))
        m = re.match(r"(.+?)\s+(?:is|are|refers|means|was|were)\b",
                     definition, re.I)
        if m and 1 <= len(_words(m.group(1))) <= 4:
            add(m.group(1))
        for ans in sib.get("answers") or []:
            add(ans)
    # harvested single words are risky truncations ('Retained' out of
    # 'Retained earnings'): only multi-word harvest phrases qualify
    for term in chapter_terms:
        if 2 <= len(_words(term)) <= 3:
            add(term)
    return out


def _chapter_terms(texts: Iterable[str]) -> List[str]:
    """Capitalized term vocabulary harvested from a chapter's own
    texts (definitions, key ideas, titles, questions) -- the swap
    replacement pool.

    Hygiene keeps the swaps grammatical and same-category:
    - phrases containing stopwords / quantifier words are dropped;
    - a SINGLE-word term must occur at least once mid-sentence
      ('Poverty' only ever opens sentences: it is a topic word, not
      an entity, and 'most Poverty workers' reads broken);
    - deterministic order: frequency desc, alphabetical tie-break.
    """
    total: Dict[str, int] = {}
    mid_sentence: Dict[str, int] = {}
    for text in texts:
        text = str(text or "")
        for m in _CAP_PHRASE_RE.finditer(text):
            phrase = m.group(1).strip()
            words = phrase.split()
            if any(w.lower() in _NON_TERMS or w.lower() in _STOPWORDS
                   for w in words):
                continue
            if len(phrase) < 4:
                continue
            total[phrase] = total.get(phrase, 0) + 1
            if m.start() > 0 and text[m.start() - 1] not in ".!?\n":
                mid_sentence[phrase] = mid_sentence.get(phrase, 0) + 1
    ranked = []
    for phrase, count in total.items():
        if len(phrase.split()) == 1 and not mid_sentence.get(phrase):
            continue
        ranked.append((phrase, count))
    ranked.sort(key=lambda kv: (-kv[1], kv[0]))
    return [k for k, _ in ranked]


def _swap_candidates(
        key_opt: str,
        chapter_terms: Sequence[str],
        rng: random.Random,
        question: str = "") -> List[Tuple[str, str]]:
    """Replace ONE key term of the correct claim with a same-chapter
    term; the rest of the claim stays intact, so the wrong option
    reads exactly as plausible as the right one."""
    out: List[Tuple[str, str]] = []
    low = key_opt.lower()
    used: set = set()
    for term in chapter_terms:
        if term.lower() in used or len(term) < 4:
            continue
        if term.lower() in low:
            continue      # already part of the claim: no swap
        replaced = _replace_any_cap_phrase(key_opt, term, rng, question)
        if replaced is None:
            continue
        if normalize(replaced).lower() == normalize(key_opt).lower():
            continue
        used.add(term.lower())
        out.append((replaced, "swap"))
        if len(out) >= 6:
            break
    return out


_CAP_HOLE_RE = re.compile(r"(?<![\w.])[A-Z][A-Za-z]{2,}(?:\s+[A-Z]"
                          r"[A-Za-z]{2,}){0,2}")


def _replace_any_cap_phrase(text: str, replacement: str,
                            rng: random.Random,
                            question: str = "") -> Optional[str]:
    """Swap the rng-chosen capitalized phrase for `replacement`.

    A phrase at sentence position 0 is grammar, not content, UNLESS
    it is a multi-word proper noun or it names the very entity the
    question asks about ('Kshatriyas were rulers...' -> 'Vaishyas
    were rulers...' is exactly the distractor a chapter term pool
    should buy) -- those two cases may swap too."""
    holes = []
    for m in _CAP_HOLE_RE.finditer(text):
        if m.start() > 0:
            holes.append(m)
            continue
        words = m.group(0).split()
        if len(words) >= 2 or m.group(0) in str(question or ""):
            holes.append(m)
    if not holes:
        return None
    rng.shuffle(holes)
    rep_words = set(replacement.lower().split())
    for hole in holes:
        # no redundant swaps: 'Civil disobedience' + 'Civil Disobedience
        # Movement' would read 'Civil Disobedience Movement disobedience'
        following = text[hole.end():].lstrip()
        first_after = re.match(r"[A-Za-z']+", following)
        if first_after and first_after.group(0).lower() in rep_words:
            continue
        rep = replacement
        hole_text = hole.group(0)
        # subject-verb agreement: a single-word plural subject swapped
        # for a singular one (or vice versa) leaves 'India were...' --
        # keep the number consistent for plain noun swaps
        hole_words = hole_text.split()
        # a single-word slot ('Indian workers') takes a single-word
        # replacement: 'most Food Security workers' reads broken
        if len(hole_words) == 1 and len(rep.split()) > 1:
            continue
        if (len(hole_words) == 1 and len(rep.split()) == 1
                and hole_text.endswith("s") != rep.endswith("s")):
            continue
        # article preservation: 'The Fifth Schedule' -> 'The Sardar
        # Patel', never a bare proper noun where the article was
        if hole_text.startswith("The ") and not re.match(
                r"^[TA]n? ", rep):
            rep = "The " + rep
        candidate = text[:hole.start()] + rep + text[hole.end():]
        if normalize(candidate).lower() != normalize(text).lower():
            return candidate
    return None


def _number_candidates(
        key_opt: str, rng: random.Random) -> List[Tuple[str, str]]:
    """Perturb numbers the way a misremembering student would: years
    drift a few years, percents flip to a neighbour, quantities scale,
    zeros/negatives shift additively.  Up to three distinct variants,
    spread across DIFFERENT numbers of the answer when there are
    several (an option set where each wrong option breaks a different
    figure), original formatting kept."""
    out: List[Tuple[str, str]] = []
    seen: set = {normalize(key_opt).lower()}
    matches = list(_NUM_RE.finditer(key_opt))
    if not matches:
        return out

    def variants_for(mi: int) -> List[str]:
        raw = matches[mi].group(0)
        # _NUM_RE allows Indian-style inner commas but can also swallow
        # a TRAILING comma ('50,') -- never eat list punctuation
        trim = len(raw) - len(raw.rstrip(","))
        if trim:
            raw = raw[:len(raw) - trim]
        try:
            value = float(raw.replace(",", ""))
        except ValueError:
            return []
        variants: List[str] = []
        if 1800 <= value <= 2025 and value == int(value):
            for d in rng.sample(YEAR_DELTAS, len(YEAR_DELTAS)):
                nv = value + (d if rng.random() < 0.5 else -d)
                if YEAR_MIN <= nv <= YEAR_MAX and nv != value:
                    variants.append(_fmt_number(nv, raw))
                    if len(variants) >= 2:
                        break
        elif 0 < value <= 100 and re.search(
                r"%\s|percent", key_opt, re.I):
            for d in rng.sample(PERCENT_DELTAS, len(PERCENT_DELTAS)):
                nv = value + (d if rng.random() < 0.5 else -d)
                if 0 <= nv <= 100 and nv != value:
                    variants.append(_fmt_number(nv, raw))
                    if len(variants) >= 2:
                        break
        elif value == 0:
            for d in rng.sample(ZERO_DELTAS, len(ZERO_DELTAS)):
                nv = d if rng.random() < 0.5 else -d
                variants.append(_fmt_number(nv, raw))
                if len(variants) >= 2:
                    break
        elif value < 0:
            mag = max(1.0, abs(value) * 0.25)
            for d in rng.sample(PERCENT_DELTAS, len(PERCENT_DELTAS)):
                nv = value + (d * mag / 5.0 if rng.random() < 0.5
                              else -d * mag / 5.0)
                if nv != value:
                    variants.append(_fmt_number(nv, raw))
                    if len(variants) >= 2:
                        break
        else:
            for f in rng.sample(QUANT_FACTORS, len(QUANT_FACTORS)):
                nv = value * f
                if nv != value and nv >= 0:
                    variants.append(_fmt_number(nv, raw))
                    if len(variants) >= 2:
                        break
        return variants

    # round-robin across matches: first variant of each number, then
    # second variants, so multi-figure answers get spread-out options
    order = rng.sample(range(len(matches)), len(matches))
    per_match = [variants_for(i) for i in order]
    for round_idx in (0, 1):
        for pos, variants in enumerate(per_match):
            if round_idx >= len(variants):
                continue
            var = variants[round_idx]
            m = matches[order[pos]]
            trim = len(m.group(0)) - len(m.group(0).rstrip(","))
            end = m.end() - trim
            candidate = key_opt[:m.start()] + var + key_opt[end:]
            norm = normalize(candidate).lower()
            if norm not in seen:
                seen.add(norm)
                out.append((candidate, "number"))
            if len(out) >= 3:
                return out
    return out


def _template_candidates(key_opt: str) -> List[Tuple[str, str]]:
    """Last-resort confusions built from the claim itself: a
    grammatical polarity flip and a scope cap.  At most one is used
    per item and never without a content distractor beside it."""
    out: List[Tuple[str, str]] = []
    flipped = _flip_polarity(key_opt)
    if flipped:
        out.append((flipped, "template"))
    out.append(("This holds only in a narrow set of cases, not as a "
                "general rule.", "template"))
    return out


_POLARITY_RE = re.compile(
    r"\b(was|were|is|are|has|have|had|can|could|will|would|do|does|"
    r"did)\b", re.I)


def _flip_polarity(claim: str) -> Optional[str]:
    """Insert 'not' after the claim's main auxiliary, grammatically."""
    m = _POLARITY_RE.search(claim)
    if not m:
        return None
    return claim[:m.end()] + " not" + claim[m.end():]


# --------------------------------------------------------------------- #
# grammar items: same-category distractors from sibling answer pools
# --------------------------------------------------------------------- #
_HAS_DIGIT_RE = re.compile(r"\d")

_LABELED_OPT_RE = re.compile(
    r"\(([a-dA-D])\)\s*(.+?)(?=\s*\([a-dA-D]\)|$)", re.S)
_TRAILING_LIST_RE = re.compile(r"\(([^()]*)\)\s*\Z")
_HINT_RE = re.compile(r"\(([^()]*)\)\s*\Z")

_GRAMMAR_SPLIT_RE = re.compile(r"[,\u060C\u0964]")


def is_verbal_answer(answer: str) -> bool:
    """True when the authored answer carries no digit at all -- the
    exact population tutor.py serves as self_check and consults the
    MCQ store for (numeric answers stay on grade_numeric)."""
    return not _HAS_DIGIT_RE.search(str(answer or ""))


def is_eligible_answer(answer: str) -> bool:
    """A claim item is eligible for MCQ synthesis when its answer is
    verbal (no digit), not a template artifact, AND displayable as an
    option: first_sentence() must yield a key within the readability
    ceiling.  A one-paragraph semicolon-chained answer has no honest
    3-option form -- it stays a self_check serve, never force-graded."""
    a = normalize(answer)
    if not a or not is_verbal_answer(a):
        return False
    if _JUNK_ANSWER_RE.search(a):
        return False
    return first_sentence(a) is not None


def _norm_option(text: str) -> str:
    """Case/whitespace-insensitive option identity (locale-safe: no
    casefolding damage possible on Devanagari, which has no case)."""
    return normalize(text).lower()


def _embedded_option_candidates(
        question: str, answer: str) -> List[str]:
    """Options the question already lists: labelled "(a) x (b) y ..."
    spelling items, or a trailing "(w1, w2, w3)" word list whose
    members include the answer ("Choose the antonym of 'ancient':
    (modern, antique, aged)").  Returns the candidates (answer among
    them) or [].  A fill-in hint like "(be)" or a rubric like
    "(short phrase, two words)" never carries the answer, so the
    answer-membership guard skips it."""
    q = normalize(question)
    ans = _norm_option(answer)
    labeled: Dict[str, str] = {}
    for m in _LABELED_OPT_RE.finditer(q):
        labeled.setdefault(m.group(1).lower(), m.group(2).strip())
    if labeled:
        opts = [labeled[k] for k in sorted(labeled)]
        norms = {_norm_option(o) for o in opts}
        if len(norms) >= 3 and ans in norms:
            return opts
        return []
    m = _TRAILING_LIST_RE.search(q)
    if m:
        parts = [p.strip() for p in _GRAMMAR_SPLIT_RE.split(m.group(1))
                 if p.strip()]
        norms = {_norm_option(p) for p in parts}
        if len(norms) >= 3 and ans in norms:
            return parts
    return []


def _grammar_hint(question: str) -> str:
    """The trailing "(...)" hint of a grammar question ('be', 'live')
    or '' -- answers sharing a hint are forms of the SAME verb, the
    tightest same-category distractor pool there is."""
    m = _HINT_RE.search(normalize(question))
    return normalize(m.group(1)) if m else ""


def _grammar_prefix(question: str) -> str:
    """The instruction prefix before the first ':' ('Choose the
    correctly spelled word', 'संधि विच्छेद कीजिए') -- questions
    sharing it want the same KIND of answer."""
    q = normalize(question)
    head = q.split(":", 1)[0] if ":" in q else q
    return normalize(head)


def build_grammar_buckets(
        worked: Iterable[dict]) -> Dict[str, Dict[str, List[str]]]:
    """Answer pools for one grammar catalog file, keyed by category:
    hint ('be' -> is/am/are/was/were...), prefix ('वचन बदलिए' ->
    other plurals), and 'all'.  File order kept; duplicates dropped."""
    by_hint: Dict[str, List[str]] = {}
    by_prefix: Dict[str, List[str]] = {}
    all_seen: set = set()
    all_answers: List[str] = []
    for w in worked or []:
        if not isinstance(w, dict) or w.get("question_pattern"):
            continue
        q, a = _item_text(w)
        if not q or not a or not is_verbal_answer(a):
            continue
        for bucket, key in ((by_hint, _grammar_hint(q)),
                            (by_prefix, _grammar_prefix(q))):
            lst = bucket.setdefault(key, [])
            if _norm_option(a) not in {_norm_option(x) for x in lst}:
                lst.append(a)
        if _norm_option(a) not in all_seen:
            all_seen.add(_norm_option(a))
            all_answers.append(a)
    return {"hint": by_hint, "prefix": by_prefix, "all": all_answers}


def build_grammar_mcq(question: str, answer: str,
                      buckets: Optional[Dict[str, dict]],
                      seed_text: Optional[str] = None) -> Optional[dict]:
    """A 3-option MCQ for a one-word-fill grammar item.

    Distractor supply, most specific first: the question's own
    embedded option list; answers of sibling questions carrying the
    same "(...)" hint (other forms of the same verb); answers of
    sibling questions with the same instruction prefix (same exercise
    type); the whole file's answer pool.  Deterministic via the
    question-seeded rng; purity = two genuinely distinct same-category
    wrongs, else None (honest self_check serve)."""
    q_norm = normalize(question)
    answer = normalize(answer)
    if not q_norm or not answer or not is_verbal_answer(answer):
        return None
    if len(answer) > MAX_OPTION_CHARS:
        return None
    buckets = buckets or {}
    rng = random.Random(int.from_bytes(
        hashlib.sha256(normalize(seed_text or q_norm).encode(
            "utf-8")).digest()[:8], "big"))
    ans_norm = _norm_option(answer)

    chosen: List[str] = []
    embedded = _embedded_option_candidates(q_norm, answer)
    pools: List[List[str]] = []
    if embedded:
        pools.append(embedded)
    hint = _grammar_hint(q_norm)
    if hint:
        # only questions WITH a hint may draw from the hint bucket:
        # the shared no-hint bucket is every answer in the file, not
        # a same-category pool
        pools.append(buckets.get("hint", {}).get(hint, []))
    pools.append(buckets.get("prefix", {}).get(
        _grammar_prefix(q_norm), []))
    pools.append(list(buckets.get("all", [])))
    for pool in pools:
        cands = [p for p in pool
                 if _norm_option(p) != ans_norm
                 and len(normalize(p)) <= MAX_OPTION_CHARS
                 and _norm_option(p) not in {_norm_option(c)
                                             for c in chosen}]
        rng.shuffle(cands)
        for cand in cands:
            if len(chosen) >= OPTIONS_PER_MCQ - 1:
                break
            chosen.append(cand)
        if len(chosen) >= OPTIONS_PER_MCQ - 1:
            break
    if len(chosen) < OPTIONS_PER_MCQ - 1:
        return None          # purity: never force-grade a starved item

    options = [answer] + chosen
    order = list(range(OPTIONS_PER_MCQ))
    rng.shuffle(order)
    options = [options[i] for i in order]
    strategies = (["embedded"] if embedded else []) + ["grammar_pool"]
    return {"options": options, "correct_index": order.index(0),
            "strategies": strategies}


# --------------------------------------------------------------------- #
# the synthesis + purity guard
# --------------------------------------------------------------------- #
def build_mcq(question: str,
              answer: str,
              siblings: Optional[Sequence[dict]] = None,
              chapter_texts: Optional[Sequence[str]] = None,
              seed_text: Optional[str] = None) -> Optional[dict]:
    """Synthesize one 3-option MCQ, or None when the purity guard
    rejects the item (no two genuinely distinct distractors).

    Deterministic: the rng is seeded by the question text (or
    `seed_text`), so identical inputs always yield identical options
    in identical order."""
    q_norm = normalize(question)
    answer = normalize(answer)
    if not q_norm or not answer:
        return None
    if _JUNK_ANSWER_RE.search(answer):
        return None          # template artifact, not a real answer
    seed = normalize(seed_text or q_norm)
    rng = random.Random(int.from_bytes(
        hashlib.sha256(seed.encode("utf-8")).digest()[:8], "big"))

    numeric = _is_numeric_answer(answer)
    key_opt = answer if numeric else first_sentence(answer)
    if not key_opt or len(key_opt) > MAX_OPTION_CHARS:
        return None
    # short-answer mode ('Factoring', '1952'): the key is legitimate,
    # but distractors must be same-category short terms, not sentences
    short_mode = (not numeric
                  and len(_words(key_opt)) <= MIN_KEY_WORDS - 1)

    texts = list(chapter_texts or [])
    chapter_terms = _chapter_terms(texts)
    near: List[Tuple[str, str]] = []
    far: List[Tuple[str, str]] = []
    if numeric:
        near = _number_candidates(key_opt, rng)
    elif short_mode:
        far = _short_term_candidates(key_opt, siblings, chapter_terms)
        near = _swap_candidates(key_opt, chapter_terms, rng, question)
    else:
        far = _sibling_candidates(key_opt, siblings)
        near = _swap_candidates(key_opt, chapter_terms, rng, question) \
            + _number_candidates(key_opt, rng)

    key_tok = _tokens(key_opt)
    picked: List[Tuple[str, str]] = []
    used_norms = {normalize(key_opt).lower()}

    def usable(text: str, strategy: str) -> bool:
        if not text or len(text) > MAX_OPTION_CHARS:
            return False
        norm = normalize(text).lower()
        if norm in used_norms:
            return False
        words = _words(text)
        if numeric:
            if not _NUM_RE.search(text):
                return False
        elif len(words) < (1 if short_mode else MIN_DISTRACT_WORDS):
            return False
        if short_mode and len(words) > 4:
            return False          # a sentence next to a one-word key
                                  # is a length cue, not a distractor
        overlap = _jaccard(_tokens(text), key_tok)
        if strategy in ("swap", "number"):
            # numeric keys carry no letter tokens (overlap is 0 by
            # construction); the exact-equality check below is the
            # guard that matters there
            if not numeric and (norm == normalize(key_opt).lower()
                                or overlap < 0.2):
                return False
            if norm == normalize(key_opt).lower():
                return False
        else:
            if overlap > FAR_OVERLAP_MAX and strategy == "sibling":
                return False
            # a numeric table ('Primary = 30, Secondary = 20, ...') is
            # not a prose claim: it answers some OTHER question
            n_nums = sum(1 for t in _tokens(text) if t.startswith("#"))
            key_nums = sum(1 for t in key_tok if t.startswith("#"))
            if strategy == "sibling" and n_nums >= 3 and key_nums < 2:
                return False
        for have, _ in picked:
            pair = _jaccard(_tokens(text), _tokens(have))
            if pair > PAIR_OVERLAP_MAX:
                return False
            if normalize(have).lower() == norm:
                return False
        return True

    templates: List[Tuple[str, str]] = []
    # one FAR pick (a different claim) then one NEAR pick (a close
    # miss) when both pools offer one -- the classic exam pairing;
    # remaining slots fill from whatever is left.  The rng shuffles
    # each pool first, deterministically.
    rng.shuffle(far)
    rng.shuffle(near)

    def take(cand: Tuple[str, str]) -> bool:
        if len(picked) >= OPTIONS_PER_MCQ - 1:
            return False
        if usable(cand[0], cand[1]):
            picked.append(cand)
            used_norms.add(normalize(cand[0]).lower())
            return True
        return False

    for first, second in ((far, near), (near, far)):
        if first and take(first[0]):
            if second:
                for cand in second:
                    if take(cand):
                        break
            break
    for pool in (far, near):
        for cand in pool:
            take(cand)
        if len(picked) >= OPTIONS_PER_MCQ - 1:
            break
    if len(picked) < OPTIONS_PER_MCQ - 1:
        templates = [
            c for c in _template_candidates(key_opt)
            if usable(c[0], c[1])][:TEMPLATE_CAP]
        for cand in templates:
            if len(picked) >= OPTIONS_PER_MCQ - 1:
                break
            picked.append(cand)
            used_norms.add(normalize(cand[0]).lower())

    # PURITY GUARD: two distractors, at least one from a content
    # strategy; a template-only pair is never published
    if len(picked) < OPTIONS_PER_MCQ - 1:
        return None
    if all(p[1] == "template" for p in picked):
        return None

    options = [key_opt] + [p[0] for p in picked]
    order = list(range(OPTIONS_PER_MCQ))
    rng.shuffle(order)
    options = [options[i] for i in order]
    correct_index = order.index(0)
    strategies = [p[1] for p in picked]
    return {"options": options, "correct_index": correct_index,
            "strategies": strategies}


def grade_mcq(entry: dict, student_answer: str) -> bool:
    """Map a student reply to True/False against a stored MCQ entry.

    Accepted forms: the 1-based option number ('1', '2.', 'option 3'),
    the letter a/b/c, or (case/whitespace-insensitively) any option's
    exact text.  Anything that is not the correct option is False --
    an MCQ answer is always one of the three options, so the normal
    correct/wrong path never needs an 'ungraded' branch here."""
    options = [str(o) for o in (entry or {}).get("options") or []]
    idx = (entry or {}).get("correct_index")
    if not options or not isinstance(idx, int) or not (
            0 <= idx < len(options)):
        return False
    text = normalize(str(student_answer or "")).strip().lower()
    if not text:
        return False
    m = re.match(r"^(?:option\s+)?([0-9]+)[).:]?$", text)
    if m:
        n = int(m.group(1))
        return n - 1 == idx if 1 <= n <= len(options) else False
    m = re.match(r"^(?:option\s+)?([a-c])[).:]?$", text)
    if m:
        return (ord(m.group(1)) - ord("a")) == idx
    # option text, tolerating stray surrounding punctuation
    plain = text.strip(" .!;:,\"'()")
    for i, opt in enumerate(options):
        if normalize(opt).lower().strip(" .!;:,\"'()") == plain:
            return i == idx
    return False


# --------------------------------------------------------------------- #
# catalog reading (mirrors tutor.py's pool extraction precedence)
# --------------------------------------------------------------------- #
_JSON_CACHE: Dict[str, Optional[dict]] = {}


def _load_json(path: str) -> Optional[dict]:
    """Cached json load (build_store re-reads the same catalogs many
    times for sibling contexts); None on any failure."""
    p = os.path.normpath(path)
    if p not in _JSON_CACHE:
        try:
            with open(p, encoding="utf-8") as fh:
                _JSON_CACHE[p] = json.load(fh)
        except Exception:
            _JSON_CACHE[p] = None
    return _JSON_CACHE[p]


def generated_dir_for(catalog_dir: str) -> str:
    """The drafted question-bank dir beside a competency catalog dir,
    mirroring tutor.py's live layout (<its>/competency catalogs sit
    beside <its>/questions/generated banks)."""
    return os.path.normpath(os.path.join(
        os.path.dirname(os.path.abspath(catalog_dir)),
        "questions", "generated"))


def _catalog_files(catalog_dir: str) -> List[Tuple[str, str, int, str]]:
    """(path, group, class, filename) for every in-scope humanities
    catalog, in deterministic sorted order."""
    out: List[Tuple[str, str, int, str]] = []
    for path in sorted(glob.glob(os.path.join(
            catalog_dir, "catalog_class*_*.json"))):
        name = os.path.basename(path)
        parsed = _parse_filename(name)
        if parsed is None:
            continue
        cls, token = parsed
        group = _GROUP_OF_TOKEN[token]
        cat = _load_json(path)
        if cat is None:
            continue
        if str(cat.get("subject", "")).lower() in _EXCLUDED_SUBJECTS:
            continue
        out.append((path, group, cls, name))
    return out


def _bank_files(catalog_dir: str) -> List[Tuple[str, str, int, str]]:
    """(path, group, class, filename) for every in-scope drafted
    question bank under questions/generated/ (the parallel agents'
    catalog-shaped files whose worked questions merge into tutor
    pools).  Grammar groups never come from banks."""
    out: List[Tuple[str, str, int, str]] = []
    bdir = generated_dir_for(catalog_dir)
    for path in sorted(glob.glob(os.path.join(
            bdir, "catalog_class*_*.json"))):
        name = os.path.basename(path)
        parsed = _parse_filename(name)
        if parsed is None:
            continue
        cls, token = parsed
        group = _GROUP_OF_TOKEN[token]
        if group in GRAMMAR_GROUPS:
            continue
        cat = _load_json(path)
        if cat is None:
            continue
        if str(cat.get("subject", "")).lower() in _EXCLUDED_SUBJECTS:
            continue
        out.append((path, group, cls, name))
    return out


def _item_text(w: dict) -> Tuple[str, str]:
    """(question, answer) with tutor.py's exact key precedence so the
    store hash matches what the pool will load."""
    q = str(w.get("q") or w.get("question") or "").strip()
    a = str(w.get("a") or w.get("answer") or w.get("solution") or "").strip()
    return q, a


def iter_catalog_items(
        catalog_dir: str) -> Iterator[dict]:
    """Yield every eligible VERBAL pool item in scope with its chapter
    context, mirroring tutor.py's pool extraction:

        competency catalogs -- catalog-level worked_examples land in
        EVERY concept's pool, concept-level ones in their own
        concept's pool; template entries (question_pattern) are never
        verbal items; english/hindi GRAMMAR catalogs yield with their
        same-class/language answer buckets;
        questions/generated banks -- the drafted history/geography and
        elective questions that _merge_generated appends to live
        pools.

    Numeric-answer items are skipped: tutor.py grades those with
    grade_numeric and never consults the store for them.  So are
    answers that can never BE an option -- template-artifact junk and
    one-paragraph keys beyond the readability ceiling -- which stay
    honest self_check serves; the purity guard then handles the rest.
    """
    files = _catalog_files(catalog_dir)
    by_class_group: Dict[Tuple[int, str], List[Tuple[str, str]]] = {}
    for path, group, cls, name in files:
        by_class_group.setdefault((cls, group), []).append((path, name))

    for path, group, cls, name in files:
        cat = _load_json(path)
        if cat is None:
            continue
        if group in GRAMMAR_GROUPS:
            # grammar: per-file answer buckets keyed by hint/prefix,
            # harvested over BOTH the catalog-level and the
            # concept-level worked examples (all one class+language)
            all_worked = list(cat.get("worked_examples") or [])
            for c in cat.get("concepts") or []:
                if isinstance(c, dict):
                    all_worked += [
                        w for w in (c.get("worked_examples") or [])
                        if isinstance(w, dict)]
            buckets = build_grammar_buckets(all_worked)
            for c in cat.get("concepts") or []:
                if not isinstance(c, dict) or not c.get("id"):
                    continue
                for w in (c.get("worked_examples") or []):
                    if not isinstance(w, dict) or w.get("question_pattern"):
                        continue
                    q, a = _item_text(w)
                    if not q or not a or not is_verbal_answer(a):
                        continue
                    yield {"kind": "grammar", "group": group, "class": cls,
                           "source_catalog": name,
                           "concept_id": str(c["id"]),
                           "catalog_level": False,
                           "question": q, "answer": a,
                           "buckets": buckets}
            for w in cat.get("worked_examples") or []:
                if not isinstance(w, dict) or w.get("question_pattern"):
                    continue
                q, a = _item_text(w)
                if not q or not a or not is_verbal_answer(a):
                    continue
                yield {"kind": "grammar", "group": group, "class": cls,
                       "source_catalog": name,
                       "concept_id": str(
                           ((cat.get("concepts") or [{}])[0].get("id"))
                           or ""),
                       "catalog_level": True,
                       "question": q, "answer": a,
                       "buckets": buckets}
            continue

        concepts = [c for c in (cat.get("concepts") or [])
                    if isinstance(c, dict) and c.get("id")]
        if not concepts:
            continue
        catalog_level = []
        for w in cat.get("worked_examples") or []:
            if isinstance(w, dict) and not w.get("question_pattern"):
                catalog_level.append(w)
        # sibling contexts: the other concepts of this chapter (their
        # title/definition/key_idea/answers), falling back to the same
        # class+subject catalogs when the chapter is thin
        def sib_ctx(exclude_id: Optional[str]) -> Tuple[List[dict],
                                                        List[str]]:
            sibs: List[dict] = []
            for c in concepts:
                if exclude_id is not None and c.get("id") == exclude_id:
                    continue
                answers = [(_item_text(w)[1])
                           for w in (c.get("worked_examples") or [])
                           if isinstance(w, dict)]
                sibs.append({"title": c.get("title"),
                             "definition": c.get("definition"),
                             "key_idea": c.get("key_idea"),
                             "answer": " ".join(a for a in answers if a),
                             "answers": answers})
            texts: List[str] = []
            for c in concepts:
                texts += [str(c.get(field) or "")
                          for field in ("title", "definition", "key_idea")]
                for w in (c.get("worked_examples") or []):
                    if isinstance(w, dict):
                        texts.append(str(w.get("question") or ""))
                        texts.append(str(_item_text(w)[1]))
            for w in catalog_level:
                texts.append(str(w.get("question") or ""))
            return sibs, texts

        def class_fallback_ctx() -> Tuple[List[dict], List[str]]:
            sibs: List[dict] = []
            texts: List[str] = []
            extra = [p for p, n in
                     by_class_group.get((cls, group), [])
                     if n != name][:SIBLING_FILE_FALLBACK]
            for p2 in extra:
                cat2 = _load_json(p2)
                if cat2 is None:
                    continue
                for c in (cat2.get("concepts") or []):
                    if not isinstance(c, dict):
                        continue
                    answers = [(_item_text(w)[1])
                               for w in (c.get("worked_examples") or [])
                               if isinstance(w, dict)]
                    sibs.append({"title": c.get("title"),
                                 "definition": c.get("definition"),
                                 "key_idea": c.get("key_idea"),
                                 "answer": " ".join(
                                     a for a in answers if a),
                                 "answers": answers})
                    texts += [str(c.get(f) or "") for f in
                              ("title", "definition", "key_idea")]
            return sibs, texts

        for c in concepts:
            sibs, texts = sib_ctx(str(c.get("id")))
            if len([s for s in sibs
                    if normalize(str(s.get("definition") or ""))
                    or normalize(str(s.get("key_idea") or ""))
                    or normalize(str(s.get("answer") or ""))]) < 2:
                fs, ft = class_fallback_ctx()
                sibs += fs
                texts += ft
            for w in (c.get("worked_examples") or []):
                if not isinstance(w, dict) or w.get("question_pattern"):
                    continue
                q, a = _item_text(w)
                if not q or not a or not is_eligible_answer(a):
                    continue
                yield {"kind": "claim", "group": group, "class": cls,
                       "source_catalog": name, "concept_id": str(c["id"]),
                       "catalog_level": False,
                       "question": q, "answer": a,
                       "siblings": sibs, "chapter_texts": texts}
        if catalog_level:
            sibs, texts = sib_ctx(None)
            if len(sibs) < 2:
                fs, ft = class_fallback_ctx()
                sibs += fs
                texts += ft
            for w in catalog_level:
                q, a = _item_text(w)
                if not q or not a or not is_eligible_answer(a):
                    continue
                yield {"kind": "claim", "group": group, "class": cls,
                       "source_catalog": name,
                       "concept_id": str(concepts[0].get("id")),
                       "catalog_level": True,
                       "question": q, "answer": a,
                       "siblings": sibs, "chapter_texts": texts}

    # drafted question banks (questions/generated): the concepts match
    # live catalog concepts, so these questions merge into real tutor
    # pools via _merge_generated; sibling context = the bank file's
    # own neighbouring questions (same book, same chapter granularity)
    for path, group, cls, name in _bank_files(catalog_dir):
        bank = _load_json(path)
        if bank is None:
            continue
        entries = [c for c in (bank.get("concepts") or [])
                   if isinstance(c, dict) and c.get("id")]
        if not entries:
            continue
        sibs: List[dict] = []
        texts: List[str] = []
        for c in entries:
            answers = [str(qi.get("a") or "").strip()
                       for qi in (c.get("questions") or [])
                       if isinstance(qi, dict)]
            answers = [a for a in answers if a]
            sibs.append({"title": c.get("title"),
                         "definition": "", "key_idea": "",
                         "answer": " ".join(answers), "answers": answers})
            texts.append(str(c.get("title") or ""))
            for qi in (c.get("questions") or []):
                if isinstance(qi, dict):
                    texts.append(str(qi.get("q") or ""))
                    texts.append(str(qi.get("a") or ""))
        for ci, c in enumerate(entries):
            my_sibs = ([s for j, s in enumerate(sibs) if j != ci]
                       or sibs)
            for qi in (c.get("questions") or []):
                if not isinstance(qi, dict):
                    continue
                q, a = _item_text(qi)
                if not q or not a or not is_eligible_answer(a):
                    continue
                yield {"kind": "claim", "group": group, "class": cls,
                       "source_catalog": name,
                       "concept_id": str(c["id"]),
                       "catalog_level": False,
                       "question": q, "answer": a,
                       "siblings": my_sibs, "chapter_texts": texts}


# --------------------------------------------------------------------- #
# store: load / lookup / build
# --------------------------------------------------------------------- #
_DEFAULT_STORE_PATH = os.path.normpath(os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "..", "questions", "generated", STORE_FILENAME))
_STORE_CACHE: Dict[str, dict] = {}


def store_path() -> str:
    return _DEFAULT_STORE_PATH


def load_store(path: Optional[str] = None,
               use_cache: bool = True) -> dict:
    """The generated MCQ store (hash -> entry), cached per path; keys
    starting with '_' are metadata and are stripped.  A missing store
    yields {} -- callers degrade to the honest self_check path."""
    p = os.path.normpath(path or _DEFAULT_STORE_PATH)
    if use_cache and p in _STORE_CACHE:
        return _STORE_CACHE[p]
    store: dict = {}
    try:
        with open(p, encoding="utf-8") as fh:
            raw = json.load(fh)
        if isinstance(raw, dict):
            store = {k: v for k, v in raw.items()
                     if not k.startswith("_") and isinstance(v, dict)}
    except Exception:
        store = {}
    _STORE_CACHE[p] = store
    return store


def lookup(question: str, store: Optional[dict] = None) -> Optional[dict]:
    """The MCQ entry for a pool question, or None (serve as before)."""
    st = store if store is not None else load_store()
    entry = st.get(mcq_key(question))
    if entry and isinstance(entry.get("options"), list) \
            and isinstance(entry.get("correct_index"), int):
        return entry
    return None


def build_store(catalog_dir: str,
                out_path: Optional[str] = None,
                store: Optional[dict] = None) -> dict:
    """Generate MCQs for every eligible in-scope item and write the
    store.  Deterministic: same catalogs -> byte-identical store.
    Returns the stats dict (also written under '_meta')."""
    out_path = os.path.normpath(out_path or _DEFAULT_STORE_PATH)
    entries = dict(store) if store else {}
    stats: Dict[str, dict] = {}
    first_source: Dict[str, dict] = {}
    eligible = generated = rejected = 0
    for item in iter_catalog_items(catalog_dir):
        eligible += 1
        key = mcq_key(item["question"])
        if key in entries:
            generated += 1          # same question, already stored
            continue
        if item.get("kind") == "grammar":
            mcq = build_grammar_mcq(item["question"], item["answer"],
                                    item.get("buckets"))
        else:
            mcq = build_mcq(item["question"], item["answer"],
                            siblings=item["siblings"],
                            chapter_texts=item["chapter_texts"])
        g = stats.setdefault(item["group"],
                             {"eligible": 0, "generated": 0, "rejected": 0})
        g["eligible"] += 1
        if mcq is None:
            rejected += 1
            g["rejected"] += 1
            continue
        entries[key] = {
            "options": mcq["options"],
            "correct_index": mcq["correct_index"],
            "source_catalog": item["source_catalog"],
            "concept_id": item["concept_id"],
            "catalog_level": item["catalog_level"],
            "strategies": mcq["strategies"],
        }
        first_source.setdefault(key, item)
        generated += 1
        g["generated"] += 1
    meta = {
        "schema": SCHEMA,
        "generated_by": "backend/its/solver/mcq_distractors.build_store",
        "counts_by_subject": {k: stats[k] for k in sorted(stats)},
        "totals": {"eligible": eligible, "generated": generated,
                   "rejected": rejected},
        "key": "sha256(normalized question)[:16]",
        "note": ("entries are keyed by the pool question text; keys "
                 "starting with '_' are metadata; a template-only "
                 "distractor pair is never published (purity guard)"),
    }
    payload = {"_meta": meta}
    payload.update(entries)
    d = os.path.dirname(out_path)
    if d and not os.path.isdir(d):
        os.makedirs(d, exist_ok=True)
    tmp = out_path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(payload, fh, ensure_ascii=False, sort_keys=True,
                  indent=1)
    os.replace(tmp, out_path)
    return meta


if __name__ == "__main__":                    # pragma: no cover - CLI
    import sys
    root = os.path.normpath(os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "..", ".."))
    cdir = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
        root, "its", "competency")
    meta = build_store(cdir)
    print(json.dumps(meta, indent=2))
