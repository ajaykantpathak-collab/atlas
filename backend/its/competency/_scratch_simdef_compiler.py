#!/usr/bin/env python3
"""
simdef_compiler.py -- diagnostic-to-SimDef COMPILER.

Converts every enhanced teaching node's own authored content (definition,
walkthrough, diagnostics[q/a/misconception]) into playable v2 SimDefs,
closing the depth gap reported by CLASS{6..12}_NODE_DEPTH.json
(MISSING nodes first, then PARTIAL nodes -- PARTIAL nodes only compile
their UNCOVERED diagnostics).

Pipeline (fully deterministic -- seeded by chapter-cluster hash, no
randomness, no timestamps in outputs -> byte-identical re-runs):

  1. CLUSTER   group MISSING/PARTIAL nodes by (class, subject, chapter);
               split large chapters into balanced lesson chunks (5-15 nodes).
  2. CONTENT   definition -> 1 TeachingSlide per node (senior KaTeX span for
               classes 9-12 when the definition carries a clean formula);
               walkthrough -> workedExample steps on the node's hardest
               challenge; diagnostics -> PLAY challenges:
                 numeric answer            -> math_input (tolerance matched)
                 enumerated answer         -> order (drag into sequence)
                 factual / prose key       -> mcq + 2-3 distractors
                                              (sibling-answer / swap /
                                              number-perturb strategies,
                                              mirroring
                                              its/solver/mcq_distractors.py)
                 misconception field       -> the wrong-answer reveal
  3. FRAMING   one discover-hook per cluster (curiosity question authored
               from the chapter's own head terms; hook line = the chapter's
               own first definition sentence, or a real career line for
               mapped class-10 chapters).
  4. PURITY    nodes with <3 usable diagnostics (MISSING) / <2 (PARTIAL),
               junk or ambiguous keys -> REVIEW_NEEDED.json, never
               force-generated. Clusters with <4 compiled challenges ->
               review. A chapter left with only 1-2 qualifying nodes is
               MERGED into the nearest viable chapter cluster of the same
               class+subject (cap-aware) instead of being dropped; only
               nodes with no viable sibling chapter stay in review.

Outputs:
  frontend/components/sims_v2/generated/<class>_<subject>_gen.ts
  frontend/components/sims_v2/generated/index.ts
  frontend/components/sims_v2/generated/REVIEW_NEEDED.json
  backend/its/competency/GENERATED_INDEX.json
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import os
import re
from collections import Counter, defaultdict

# ------------------------------------------------------------------ paths
HERE = os.path.dirname(os.path.abspath(__file__))
PLATFORM = os.path.dirname(os.path.dirname(HERE))             # .../backend
ROOT = os.path.dirname(PLATFORM)                              # .../platform
INDEX_PATH = os.path.join(PLATFORM, "_cache", "enhanced_nodes_index.json")
DEPTH_PATHS = {
    6: os.path.join(ROOT, "frontend", "components", "sims_v2", "CLASS6_NODE_DEPTH.json"),
    **{c: os.path.join(HERE, f"CLASS{c}_NODE_DEPTH.json") for c in range(7, 13)},
}
GEN_DIR = os.path.join(ROOT, "_cisce_build", "simsfix_backup", "generated_scratch")
CAREERS_PATH = os.path.join(ROOT, "frontend", "components", "world", "careers_by_chapter.json")

# ------------------------------------------------------------------ tunables
MIN_USABLE_MISSING = 3       # purity guard: usable diagnostics per MISSING node
MIN_USABLE_PARTIAL = 1       # PARTIAL nodes owe only their uncovered gap(s) --
                             # one targeted challenge closes it; lesson
                             # thickness is guarded at cluster level
MIN_CLUSTER_NODES = 3        # below this the whole cluster goes to review
MIN_CLUSTER_CHALLENGES = 4   # a thinner lesson reads as trivia, not a sim
# merge 1-2-node chapters into the nearest viable sibling chapter of the
# same subject (SIMDEF_SIBLING_MERGE=0 disables -- regression baseline)
SIBLING_MERGE = os.environ.get("SIMDEF_SIBLING_MERGE", "1") != "0"
SOFT_MAX_CHUNK = 12          # n_chunks = ceil(n / SOFT_MAX_CHUNK) when n > 15
MAX_CLUSTER_SLIDE_NODES = 15
MAX_CHALLENGES_PER_CLUSTER = 18
SAMPLE_CHALLENGES = 8
MAX_OPT_CHARS = 180          # MCQ option readability ceiling (mirrors solver)
MAX_Q_CHARS = 320
MAX_CORE_CHARS = 900
MIN_CORE_CHARS = 25

SUBJECT_CODE = {
    "math": "math", "phy": "phy", "physics": "phy", "chem": "chem",
    "chemistry": "chem", "bio": "bio", "biology": "bio", "hist": "hist",
    "history": "hist", "geo": "geo", "geography": "geo", "civ": "civ",
    "civics": "civ", "eco": "eco", "economics": "eco", "engl": "eng",
    "english": "eng", "eng_s": "eng_s", "eng_h": "eng_h", "eng_w": "eng_w",
    "eng_f": "eng_f", "eng_k": "eng_k", "eng_v": "eng_v", "hin_a": "hin_a",
    "hin_al": "hin_al", "hin_ar": "hin_ar", "hin_v": "hin_v", "acc": "acc",
    "cs": "cs", "bs": "bs", "biotech": "biotech", "ca": "ca", "hs": "hs",
    "ip": "ip", "psy": "psy", "stat": "stat", "ps": "ps", "soc": "soc",
}
SUBJECT_LABEL = {
    "math": "Mathematics", "phy": "Physics", "chem": "Chemistry",
    "bio": "Biology", "hist": "History", "geo": "Geography", "civ": "Civics",
    "eco": "Economics", "eng": "English", "eng_s": "English",
    "eng_h": "English", "eng_w": "English", "eng_f": "English",
    "eng_k": "English", "eng_v": "English", "hin_a": "Hindi",
    "hin_al": "Hindi", "hin_ar": "Hindi", "hin_v": "Hindi",
    "acc": "Accountancy", "cs": "Computer Science", "bs": "Business Studies",
    "biotech": "Biotechnology", "ca": "Computer Applications",
    "hs": "Home Science", "ip": "Informatics Practices", "psy": "Psychology",
    "stat": "Statistics", "ps": "Physical Education", "soc": "Sociology",
}
SUBJECT_SIM = {  # SimDef.subject -- drives island zone routing
    "math": "maths", "eng": "english", "eng_s": "english", "eng_h": "english",
    "eng_w": "english", "eng_f": "english", "eng_k": "english",
    "eng_v": "english", "hin_a": "hindi", "hin_al": "hindi",
    "hin_ar": "hindi", "hin_v": "hindi",
}
SUBJECT_EMOJI = {
    "math": "🔢", "phy": "⚡", "chem": "🧪", "bio": "🌿", "hist": "🏛️",
    "geo": "🌍", "civ": "⚖️", "eco": "📈", "eng": "📚", "eng_s": "📚",
    "eng_h": "📚", "eng_w": "✍️", "eng_f": "📕", "eng_k": "📗",
    "eng_v": "📘", "hin_a": "📖", "hin_al": "📖", "hin_ar": "📖",
    "hin_v": "📖", "acc": "🧾", "cs": "💻", "bs": "🏢", "biotech": "🧬",
    "ca": "🖥️", "hs": "🏠", "ip": "🗂️", "psy": "🧠", "stat": "📊",
    "ps": "🏃", "soc": "👥",
}
THEMES = [
    ("from-sky-100 to-cyan-200", "sky", "lesson"),
    ("from-yellow-100 to-amber-200", "amber", "lesson"),
    ("from-emerald-100 to-teal-200", "emerald", "lesson"),
    ("from-violet-100 to-purple-200", "violet", "lesson"),
    ("from-rose-100 to-pink-200", "rose", "lesson"),
    ("from-indigo-100 to-blue-200", "indigo", "lesson"),
    ("from-lime-100 to-green-200", "green", "lesson"),
    ("from-orange-100 to-red-200", "orange", "lesson"),
]
SLIDE_BGS = [
    "from-violet-400 to-purple-500", "from-sky-400 to-cyan-500",
    "from-emerald-400 to-teal-500", "from-rose-400 to-pink-500",
    "from-amber-400 to-orange-500", "from-indigo-400 to-blue-500",
]
BIN_COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"]
SLOT_LABELS = ["1st", "2nd", "3rd", "4th", "5th", "6th"]

DIFFICULTY = {"remember": "foundation", "understand": "standard",
              "apply": "advanced", "analyze": "advanced", "analyse": "advanced",
              "evaluate": "advanced", "create": "advanced"}

DISCOVERY_TEMPLATES = [
    ("Quick guess -- where do you meet {t} outside the classroom?",
     ["Hidden in everyday things around us", "Only inside exam papers",
      "Nowhere -- it is pure theory"]),
    ("What happens if {t} suddenly stops working?",
     ["Things around us change in noticeable ways", "Absolutely nothing changes",
      "Only textbooks would change"]),
    ("Who uses {t} in real working life?",
     ["Scientists, engineers and professionals use it daily",
      "Nobody actually uses it", "Only teachers use it"]),
    ("Can you see {t} directly with your eyes?",
     ["Often only through its effects", "Always directly visible",
      "It is invisible by definition"]),
    ("Is {t} more about facts, or about reasoning?",
     ["Mostly reasoning from a few core ideas", "Pure memorisation of facts",
      "Random guessing"]),
    ("In one line -- what does {t} actually explain?",
     ["Why things around us behave the way they do", "Nothing -- it is just a name",
      "Only how to score marks"]),
]

# ------------------------------------------------------- content classifiers
NUMQ_ANY_RE = re.compile(r"\b(?:calculate|compute)\b", re.I)
NUMQ_IMP_RE = re.compile(
    r"^(?:calculate|compute|solve|find|determine|how much|how many|"
    r"what is the value|what will be)\b", re.I)
COUNT_Q_RE = re.compile(r"\bhow (?:many|much)\b", re.I)
META_OPEN_RE = re.compile(
    r"^(?:bias|strategy|step|stage|approach|method|example|note|hint|point|"
    r"benefit|drawback|reason|feature|type|part|phase|rule|law|formula|"
    r"advantage|disadvantage|cause|effect|result|observation|comparison)\s*"
    r"\d*\s*[:\-–—]", re.I)
ORDER_Q_RE = re.compile(
    r"\b(correct order|arrange|sequence|order of|steps of|step-by-step|"
    r"in the order|reorder|stages of|phases of|in sequence)\b", re.I)
JUNK_ANSWER_RE = re.compile(
    r"applied step by step|gives the required result|leads to the required|"
    r"the required value|as per the above|as explained above|same as above", re.I)
WRONG_SENT_RE = re.compile(
    r"^(?:\**)?\s*(?:a wrong|wrong answer|an incorrect|if a student|"
    r"if the student|if students|a student who|a student (?:answers|says|argues|"
    r"writes|fails|uses|instead|gives|responds|picks|chooses|marks|claims|"
    r"believes|thinks|treats|confuses|misses|omits|computes|adds|attempts|equates|"
    r"interprets|assumes|expects)|students (?:who|often|may|might|sometimes)|"
    r"answering (?:this|with)|any other (?:answer|claim|option)|choosing|picking|"
    r"marking|answering|why (?:wrong|a wrong|this is wrong)|a response|"
    r"answers? (?:like|such)|mistakes? (?:like|such)|the wrong|"
    r"incorrect (?:answer|claim|option)|\**why wrong answer\**|common wrong|"
    r"wrong claim|wrong statement|a wrong answer)", re.I)
CORE_PREFIX_RE = re.compile(
    r"^\s*(?:\**\s*(?:correct\s+answer|answer|solution)\s*:?\**\s*[-–—]?\s*)", re.I)
WHY_TAIL_RE = re.compile(r"\*\*\s*why\b", re.I)
CODE_FENCE_RE = re.compile(r"```[a-z]*|```")
MD_RE = re.compile(r"\*\*|__|`{1,3}")
NUM_TOKEN_RE = re.compile(
    r"-?\d[\d,]*(?:\.\d+)?(?:\s*[×xX]\s*10(?:\s*\^)?[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+)?")
SUPERS = {"⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5",
          "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-"}
WORD_NUMS = {"zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
             "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
             "eleven": 11, "twelve": 12, "thirteen": 13, "fourteen": 14,
             "fifteen": 15, "sixteen": 16, "seventeen": 17, "eighteen": 18,
             "nineteen": 19, "twenty": 20, "thirty": 30, "forty": 40,
             "fifty": 50, "sixty": 60, "seventy": 70, "eighty": 80,
             "ninety": 90, "hundred": 100, "thousand": 1000}
UNIT_RE = re.compile(
    r"^\s*(kJ/mol|kJ|km/h|m/s|cm|mm Hg|mmHg|atm|mol|g/mol|kg|Hz|Ω|ohms?|V|volts?|"
    r"A|amperes?|L|mL|km|ms|°C|°F|J|N|W|s|min|h|hours?|minutes?|years?|%|"
    r"rupees?|₹|degrees?|units?|times|decimal places?|hours|items?)\b\.?", re.I)
ENUM_ITEM_RE = re.compile(r"[\(（](\d{1,2})[\)）]\s*([^\(\)\n;]{2,110})")
ROMAN_ITEM_RE = re.compile(r"[\(（]([ivx]{1,5})[\)）]\s*([^\(\)\n;]{2,110})")
STEP_SPLIT_RE = re.compile(r"\b(?:Step|stage)\s*\d+\s*[:.\-–—]\s*", re.I)
CONNECT_RE = re.compile(
    r"\b(?:First(?:ly)?|Second(?:ly)?|Third(?:ly)?|Fourth(?:ly)?|Fifth(?:ly)?|"
    r"Sixth(?:ly)?|Next|Then|Finally|Last(?:ly)?)\b\s*[,:\-–—]?\s*")
STOP = set("""a an the of in on for to and or is are was were be been with as
by at from this that these those it its their there here which what who whom
how why when where can could should would may might must not no nor but if
than then so such very more most much many any some all each every into onto
about between among over under above below up down out off again further once
only other another also because while during before after both few own same
too just don now""".split())


# ------------------------------------------------------------------ helpers
def h32(s: str) -> int:
    """Stable 32-bit hash (sha256, first 8 hex) -- NEVER Python hash()."""
    return int(hashlib.sha256(s.encode("utf-8")).hexdigest()[:8], 16)


class LCG:
    """Tiny deterministic generator for build-time shuffles (never Math.random)."""
    __slots__ = ("s",)

    def __init__(self, seed: str):
        self.s = h32(seed) or 1

    def next(self) -> int:
        self.s = (self.s * 1103515245 + 12345) & 0x7FFFFFFF
        return self.s

    def below(self, n: int) -> int:
        return self.next() % n if n else 0


def clean(text: str) -> str:
    if not text:
        return ""
    t = CODE_FENCE_RE.sub(" ", text)
    t = MD_RE.sub("", t)
    t = t.replace("**Answer:**", " ").replace("**Correct Answer:**", " ")
    t = re.sub(r"\s*\n+\s*", " ", t)
    t = re.sub(r"[ \t]{2,}", " ", t)
    return t.strip()


def sentences(t: str):
    return re.split(r"(?<=[.!?])\s+(?=[A-Z0-9\u2018\u201c\"“(\u0966-\u096F])", t)


def trim(text: str, limit: int) -> str:
    t = (text or "").strip()
    if len(t) <= limit:
        return t
    cut = t[:limit]
    for m in re.finditer(r"[.!?]", cut):
        if m.end() >= int(limit * 0.55):
            return cut[: m.end()].strip()
    sp = cut.rfind(" ")
    return (cut[:sp] if sp > int(limit * 0.5) else cut).strip()


def trim_option(text: str) -> str:
    """Option/key text: prefer a full sentence, then a clause boundary,
    then a word boundary -- never a mid-word cut."""
    t = (text or "").strip()
    if len(t) <= MAX_OPT_CHARS:
        return t.rstrip(" ;,—").rstrip(".")
    cut = t[:MAX_OPT_CHARS]
    for m in re.finditer(r"[.!?]", cut):
        if m.end() >= int(MAX_OPT_CHARS * 0.55):
            return cut[: m.end()].strip().rstrip(".,;:—")
    for sep in ("; ", " — ", " – ", ", "):
        i = cut.rfind(sep)
        if i >= int(MAX_OPT_CHARS * 0.5):
            return cut[:i].rstrip(" ;,—-").rstrip(".")
    sp = cut.rfind(" ")
    out = cut[:sp] if sp > int(MAX_OPT_CHARS * 0.5) else cut
    return out.rstrip(" ;,—-").rstrip(".")


def tokens(text: str):
    return {w for w in re.findall(r"[a-z\u0900-\u097F]{2,}", text.lower())
            if w not in STOP}


def jaccard(a: str, b: str) -> float:
    ta, tb = tokens(a), tokens(b)
    if not ta or not tb:
        return 1.0
    return len(ta & tb) / len(ta | tb)


def strip_wrong_tail(answer: str):
    """Split an authored diagnostic answer into (core, wrong_reveal)."""
    a = CORE_PREFIX_RE.sub("", clean(answer))
    core, wrong = [], []
    for s in sentences(a):
        st = s.strip()
        if WHY_TAIL_RE.search(st[:24]):
            wrong.append(st)
            continue
        if WRONG_SENT_RE.match(st):
            wrong.append(st)
        elif not wrong:            # core sentences only appear before reveals
            core.append(st)
    return " ".join(core).strip(), " ".join(wrong).strip()


def head_term(definition: str) -> str:
    d = clean(definition)
    if not d:
        return ""
    cut = None
    for cue in (":", " is ", " are ", " refers to ", " means ", " describes "):
        i = d.find(cue)
        if 0 < i <= 140:
            cut = i if cut is None else min(cut, i)
    head = d[:cut].strip() if cut else " ".join(d.split()[:6])
    head = re.sub(r"^(the|a|an)\s+", "", head, flags=re.I)
    head = re.sub(r"[\(\[\{].*?[\)\]\}]", "", head).strip(" ,;:—-.")
    if len(head) < 3 or len(head) > 64:
        head = " ".join(d.split()[:5]).strip(" ,;:.—-")
    return head


def title_case(s: str) -> str:
    out = []
    for w in s.split():
        out.append(w if (w.isupper() or w.isdigit() or len(w) == 1)
                   else w[:1].upper() + w[1:])
    return " ".join(out)[:52].strip()


def node_head(node) -> str:
    return head_term(clean(node.get("definition", ""))) or node.get("subject", "lesson")


# ------------------------------------------------------- challenge builders
def _fmt_number(value: float) -> str:
    if abs(value) >= 1e13:
        return ""
    if value == int(value) and abs(value) < 1e15:
        return str(int(value))
    return f"{value:.6f}".rstrip("0").rstrip(".")


def _parse_token(tok: str):
    m = re.match(r"^(-?[\d,]+(?:\.\d+)?)(?:\s*[×xX]\s*10(?:\s*\^)?([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+))?$",
                 tok.strip())
    if not m:
        return None
    base = float(m.group(1).replace(",", ""))
    es = m.group(2)
    if es:
        neg = "⁻" in es
        digits = "".join(SUPERS.get(c, "") for c in es if c in SUPERS)
        exp = int(digits) if digits else 0
        if neg:
            exp = -exp
        base *= 10.0 ** exp
    return base


def numeric_key(question: str, core: str):
    """Extract a trusted final numeric answer for a computation diagnostic.
    Returns (answer_str, tolerance, unit) or None.  The number must appear
    verbatim in the authored answer -- nothing is invented.  Guards reject
    given-data echoes, coordinate pairs and non-imperative prompts."""
    if len(core) > 600:
        return None
    if not (NUMQ_IMP_RE.match(question) or NUMQ_ANY_RE.search(question)
            or COUNT_Q_RE.search(question)):
        return None
    sents = [s for s in sentences(core) if s.strip()]
    if not sents:
        return None
    last = sents[-1]
    window_off = 0
    eq = last.rfind("=")
    if eq >= 0:
        window_off = eq
    window = last[window_off:]
    m = re.search(NUM_TOKEN_RE, window)
    if not m:
        all_m = list(re.finditer(NUM_TOKEN_RE, last))
        if all_m:
            m = all_m[-1]
            window_off = 0                 # m is already relative to `last`
            window = last
        else:
            if not COUNT_Q_RE.search(question):
                return None
            for w, v in sorted(WORD_NUMS.items(), key=lambda kv: -len(kv[0])):
                if re.search(rf"\b{w}\b", last, re.I):
                    return str(v), 0, ""
            return None
    tok = m.group(0)
    value = _parse_token(tok)
    if value is None or value != value or abs(value) == float("inf"):
        return None
    ans = _fmt_number(value)
    if not ans:
        return None
    # the numeric key must be verbatim in the authored text (comma variant ok)
    if tok not in core and tok.replace(",", "") not in core.replace(",", ""):
        return None
    # given-data guard: the result must not be stated inside the question
    if tok in question or tok.replace(",", "") in question.replace(",", ""):
        return None
    abs_end = window_off + m.end()
    # coordinate-pair guard: '(..., 4' / '4, ...)' style positions
    if abs_end < len(last) and re.match(r"\s*[,，]\s*-?[\d(]", last[abs_end:]):
        return None
    if abs_end > 0 and last[abs_end - 1] in "((":
        return None
    unit = ""
    um = UNIT_RE.match(last[abs_end:])
    if um:
        unit = um.group(1)
    tol = 0 if value == int(value) else round(abs(value) * 0.01, 6)
    return ans, tol, unit


DANGLING_RE = re.compile(
    r"\s+(?:of|the|a|an|in|and|by|to|with|for|from|that|on|at|is|are|or|as|"
    r"than|which|into|their|its|when|while|has|have|had|was|were|be|been|"
    r"being|lower|higher|more|less|most|least|then|so|thus|hence)\s*$", re.I)
JUNK_HEADS = {"the statement", "the claim", "the answer", "statement", "claim",
              "answer", "it", "this", "they", "the question", "the scenario"}


def _cut_head(item: str) -> str:
    h = item.strip()
    best = None
    for sep in (" — ", " – ", " - ", ": ", ", ", "; ", " = ", " ("):
        i = h.find(sep)
        if 0 < i <= 60 and (best is None or i < best):
            best = i
    if best:
        h = h[:best]
    h = re.sub(r"\s+(?:is|are|means|refers|denotes|represents)\b.*$", "", h, flags=re.I)
    if len(h) > 46:                      # keep order-card labels readable
        sp = h.rfind(" ", 20, 46)
        h = h[:sp if sp > 0 else 46]
    h = h.strip(" .,;:—-–")
    for _ in range(4):                   # no dangling articles/prepositions
        h2 = DANGLING_RE.sub("", h)
        if h2 == h:
            break
        h = h2
    return h.strip(" .,;:—-–").rstrip("→= ").rstrip()


def order_items(core: str):
    """Extract 3-6 sequenced terms from an enumerated authored answer."""
    pairs = ENUM_ITEM_RE.findall(core)
    items = []
    if pairs:
        nums = [int(n) for n, _ in pairs]
        if nums == sorted(nums) and nums[0] <= 1:
            items = [_cut_head(t) for _, t in pairs]
    if len(items) < 3:
        pairs = ROMAN_ITEM_RE.findall(core)
        if len(pairs) >= 3:
            vals = []
            ok = True
            for r, _ in pairs:
                v = sum({'i': 1, 'v': 5, 'x': 10}.get(ch, 0) for ch in r)
                if vals and v <= vals[-1]:
                    ok = False
                vals.append(v)
            if ok:
                items = [_cut_head(t) for _, t in pairs]
    if len(items) < 3:
        parts = [p for p in STEP_SPLIT_RE.split(core) if p and p.strip()]
        if len(parts) >= 3:
            items = [_cut_head(p.split(".")[0]) for p in parts]
    if len(items) < 3:
        parts = [p for p in CONNECT_RE.split(core) if p and p.strip()]
        if len(parts) >= 4:
            items = [_cut_head(p.split(".")[0]) for p in parts[1:]]
    items = [i for i in items
             if 2 <= len(i) <= 46 and re.search(r"[A-Za-z\u0900-\u097F]", i)
             and i.casefold() not in JUNK_HEADS]
    seen, uniq = set(), []
    for i in items:
        k = i.casefold()
        if k not in seen:
            seen.add(k)
            uniq.append(i)
    return uniq[:6] if len(uniq) >= 3 else None


def _cap_terms(text: str):
    return re.findall(r"\b[A-Z][A-Za-z'\-]+(?:\s+[A-Z][A-Za-z'\-]+){0,2}\b", text)


def _fmt_token_like(tok: str) -> str:
    m = re.match(r"^(-?[\d,]+(?:\.\d+)?)", tok)
    return m.group(1) if m else tok


def _perturb_number(text: str, seed: str):
    """A misremembering student's number: same claim, perturbed quantity."""
    ms = list(re.finditer(NUM_TOKEN_RE, text))
    if not ms:
        return None
    m = ms[h32(seed) % len(ms)]
    raw = m.group(0)
    val = _parse_token(raw)
    if val is None:
        return None
    is_pct = text[m.end(): m.end() + 1] == "%"
    if 1700 <= val <= 2035:
        cands = [val + d for d in (2, 3, 5, 7, 10, 12, 17, -3, -7)]
    elif is_pct:
        cands = [max(0, val - d) for d in (3, 5, 10, 15, 20)] + [val + d for d in (5, 10)]
    else:
        cands = [val * 0.5, val * 1.5, val * 2, val * 3, val + 1, val + 2, val + 10,
                 max(0, val - 1), max(0, val - 2)]
    mantissa = _fmt_token_like(raw)
    for c in cands:
        c_f = _fmt_number(c)
        if not c_f or c_f == mantissa:
            continue
        new_raw = raw.replace(mantissa, c_f, 1) if mantissa in raw else raw + c_f
        return text[: m.start()] + new_raw + text[m.end():]
    return None


def _polarity_flip(text: str) -> str:
    for a, b in ((" is not ", " is "), (" are not ", " are "), (" cannot ", " can "),
                 (" is ", " is not "), (" are ", " are not "), (" can ", " cannot ")):
        i = text.find(a)
        if i > 0:
            return text[:i] + b + text[i + len(a):]
    stripped = text[0].lower() + text[1:] if text[:1].isupper() else text
    return "It is false that " + stripped


STEM_FACTUAL_RE = re.compile(
    r"^(?:what|define|state|name|list|which|who|whom|when|where|identify|give)\b", re.I)
STEM_COMPARE_RE = re.compile(
    r"^(?:compare|differentiate|distinguish|contrast)\b|\bdifferences? between\b", re.I)
STEM_EXPLAIN_RE = re.compile(
    r"^(?:explain|why|how|justify|discuss|analyse|analyze|evaluate|describe)\b", re.I)


def stem_bucket(q: str) -> str:
    """Question-stem family -- distractors are drawn from the same family
    first (a definition distracts a definition, a scenario a scenario)."""
    if STEM_COMPARE_RE.search(q):
        return "compare"
    if STEM_FACTUAL_RE.match(q):
        return "factual"
    if STEM_EXPLAIN_RE.match(q):
        return "explain"
    return "scenario"


def build_mcq(key: str, pool, seed: str, qbucket: str = "scenario",
              question: str = ""):
    """3-4 option MCQ.  Distractors: sibling answers (same chapter cluster,
    same question-stem family first, ranked by topical overlap with the
    question), then term-swap / number-perturb; at most ONE template flip
    and never as the only strategy.  Mirrors mcq_distractors.py purity:
    >=2 genuine distractors, pairwise distinct, bounded overlap with the key.
    Returns options list (key LAST) or None.
    pool entries: (nid, k, core, bucket)."""
    klow = key.casefold()

    def okshape(t: str) -> bool:
        return (3 <= len(t) <= MAX_OPT_CHARS and t.casefold() != klow
                and jaccard(t, key) < 0.72)

    def topical(cands):
        """Most question-topical, non-meta first; seeded window rotation
        keeps per-question variety without losing topicality."""
        ranked = sorted(cands, key=lambda c: (bool(META_OPEN_RE.match(c)),
                                              -jaccard(c, question)))
        wsize = max(6, len(ranked) // 3)
        window = ranked[:wsize] or ranked
        start = h32(seed + "top") % len(window) if window else 0
        return window[start:] + window[:start] + ranked[len(window):]

    distractors, genuine = [], 0
    # strategy 1: sibling answers from the same cluster, same question-stem
    # family first, two tiers -- prefer clearly-different claims (<0.60
    # token overlap), fall back to same-chapter confusables (<0.72)
    same, other = [], []
    for (nid, k, other_core, bucket) in pool:
        if not other_core or len(other_core) < MIN_CORE_CHARS:
            continue
        cand = trim_option(other_core)
        if not okshape(cand):
            continue
        (same if bucket == qbucket else other).append(cand)
    ordered = topical(same) + topical(other)
    for tier in (0.60, 0.72):
        for cand in ordered:
            if len(distractors) >= 2:
                break
            if jaccard(cand, key) >= tier:
                continue
            if any(jaccard(cand, d) >= 0.80 for d in distractors):
                continue
            if cand.casefold() in {d.casefold() for d in distractors}:
                continue
            distractors.append(cand)
        if len(distractors) >= 2:
            break
    genuine = len(distractors)
    # strategy 2: same-category term swap inside the key
    if len(distractors) < 3:
        terms = _cap_terms(key)
        vocab = []
        for (_, _, oc, _b) in pool[:80]:
            for t in _cap_terms(oc):
                if t not in terms and t.casefold() not in klow and t not in vocab:
                    vocab.append(t)
        if terms and vocab:
            tgt = terms[h32(seed + "sw") % len(terms)]
            same_len = sorted({v for v in vocab
                               if abs(len(v) - len(tgt)) <= max(6, len(tgt))})
            if same_len:
                rep = same_len[h32(seed + "sw2") % len(same_len)]
                swapped = key.replace(tgt, rep, 1)
                if (swapped != key and okshape(swapped) and all(
                        jaccard(swapped, d) < 0.80 for d in distractors)
                        and swapped.casefold() not in {d.casefold() for d in distractors}):
                    distractors.append(swapped)
    # strategy 3: number perturbation
    if len(distractors) < 3:
        pert = _perturb_number(key, seed + "num")
        if (pert and okshape(pert) and all(jaccard(pert, d) < 0.80 for d in distractors)
                and pert.casefold() not in {d.casefold() for d in distractors}):
            distractors.append(pert)
    # strategy 4 (LAST resort, max one, never alone): polarity flip
    if len(distractors) < 2 and genuine >= 1:
        flip = _polarity_flip(key)
        if (okshape(flip) and all(jaccard(flip, d) < 0.85 for d in distractors)
                and flip.casefold() not in {d.casefold() for d in distractors}):
            distractors.append(flip)
    if len(distractors) < 2:
        return None
    return distractors[:3] + [key]


# ------------------------------------------------------------- node scoping
_DIAG_PREFIX_RE = re.compile(r"^diagnostic\s+(\d+)\s*\(coverage[^)]*\):\s*")


def norm_text(s: str) -> str:
    return re.sub(r"[^a-z0-9\u0900-\u097F]+", " ", s.lower()).strip()


def scope_diagnostics(node, verdict, uncovered):
    """In-scope diagnostics for a node per its depth verdict.
    MISSING -> all; PARTIAL -> only the depth audit's uncovered ones."""
    diags = node.get("diagnostics") or []
    if verdict == "MISSING":
        return list(diags), "missing-all"
    if not uncovered:
        return list(diags), "partial-all-fallback"
    scope, matched = [], set()
    for u in uncovered:
        m = _DIAG_PREFIX_RE.match(u)
        if m:
            k = int(m.group(1)) - 1
            if 0 <= k < len(diags):
                scope.append(diags[k])
                matched.add(k)
                continue
        nu = norm_text(_DIAG_PREFIX_RE.sub("", u))
        if not nu:
            continue
        for k, d in enumerate(diags):
            if k in matched:
                continue
            nq = norm_text(d.get("q", ""))
            if nq and (nq.startswith(nu) or nu.startswith(nq) or nu in nq):
                scope.append(d)
                matched.add(k)
                break
    if not scope:
        return list(diags), "partial-unmatched-fallback"
    return scope, "partial-uncovered"


def challenge_ok(ch) -> bool:
    """Self-check before a challenge may enter a SimDef (purity gate)."""
    if not ch.get("question") or not ch.get("misconception"):
        return False
    t = ch.get("type")
    if t == "mcq":
        opts = ch.get("options") or []
        return len(opts) >= 3 and ch.get("answer") in opts
    if t == "math_input":
        try:
            return math.isfinite(float(ch.get("answer", "")))
        except (TypeError, ValueError):
            return False
    if t == "order":
        si, bins = ch.get("sortItems") or [], ch.get("bins") or []
        return (len(si) >= 3 and len(bins) == len(si)
                and sorted(i["correctBin"] for i in si)
                == sorted(b["id"] for b in bins))
    return False


def katex_span(definition: str):
    """A clean, verbatim formula span from the definition (senior KaTeX).
    Conservative: needs '=', a digit, <= 42 chars, no prose stopwords."""
    for m in re.finditer(r"[A-Za-z0-9_\)\]⁰¹²³⁴⁵⁶⁷⁸⁹]{1,14}\s*=\s*"
                         r"[^.;:!?\n]{1,26}(?=[.;:!?\n]|$)", definition):
        span = re.sub(r"\s{2,}", " ", m.group(0)).strip()
        if not 4 <= len(span) <= 42:
            continue
        if not re.search(r"\d", span):
            continue
        if re.search(r"\b(the|and|for|with|from|that|this|where|which|when|between|"
                     r"each|per|into)\b", span, re.I):
            continue
        if re.search(r"[<>&$#\"~|]", span):
            continue
        return span
    return None


def attach_worked_example(challenge, node):
    """walkthrough -> workedExample[] steps (verbatim sentences, trimmed)."""
    wt = clean(node.get("walkthrough", ""))
    if len(wt) < 60:
        return
    steps = [trim(s, 150) for s in sentences(wt) if len(s.strip()) > 15]
    if steps:
        challenge["workedExample"] = steps[:4]


# ------------------------------------------------------------- compilation
class Compiler:
    def __init__(self, classes):
        self.classes = classes
        raw = json.load(open(INDEX_PATH, encoding="utf-8"))
        self.nodes = {}
        for n in raw["nodes"]:                    # teaching nodes only
            self.nodes[n["node_id"]] = n
        self.companions = raw.get("companions")   # EXCLUDED by design
        self.careers = {}
        if os.path.exists(CAREERS_PATH):
            self.careers = json.load(open(CAREERS_PATH, encoding="utf-8"))
        self.depth = {}
        for c in classes:
            d = json.load(open(DEPTH_PATHS[c], encoding="utf-8"))
            for e in d["nodes"]:
                self.depth[e["node_id"]] = e
        self.review = {}                          # node_id -> reason
        self.index_doc = {}
        self.review_doc = {}

    # -- per-diagnostic challenge candidates ------------------------------
    def diag_candidates(self, node, diag, pool, seed):
        """Challenge candidates for one diagnostic: [(priority, challenge)].
        Priorities: order-cue 0 / math_input 0 / other-enum order 1 / mcq 2.
        The first pass serves each node its lowest-priority candidate, so
        every cluster gets natural type variety."""
        q = trim(clean(diag.get("q", "")), MAX_Q_CHARS)
        if len(q) < 12 or JUNK_ANSWER_RE.search(diag.get("a", "")):
            return []
        core, wrong = strip_wrong_tail(diag.get("a", ""))
        if len(core) < MIN_CORE_CHARS or len(core) > MAX_CORE_CHARS:
            return []
        misconception = clean(diag.get("misconception", "")) or wrong
        if not misconception:
            misconception = "Recheck the lesson slide -- the key claim is: " + trim(core, 120)
        misconception = trim(misconception, 320)
        base_hint = trim(
            f"Straight from the '{trim(node_head(node), 34)}' slide -- match the key terms.", 110)
        cands = []
        items = order_items(core)
        numeric = numeric_key(q, core)

        # order challenge (from the diagnostic's own enumerated terms)
        if items:
            n_items = len(items)
            rng = LCG(seed + "ord")
            perm, rest = [], list(range(n_items))
            while rest:
                perm.append(rest.pop(rng.below(len(rest))))
            sort_items = [{"id": f"s{i}", "label": trim(items[perm[i]], 44),
                           "emoji": "📌", "correctBin": f"o{perm[i]}"}
                          for i in range(n_items)]
            bins = [{"id": f"o{i}", "label": SLOT_LABELS[i],
                     "color": BIN_COLORS[i % len(BIN_COLORS)]}
                    for i in range(n_items)]
            pr = 0 if ORDER_Q_RE.search(q) else 1
            cands.append((pr, {
                "type": "order", "question": q,
                "sortItems": sort_items, "bins": bins,
                "hint": "Drag the items into the sequence the lesson gives.",
                "misconception": misconception,
            }))
        # math_input challenge (numeric answer, tolerance matched)
        if numeric:
            ans, tol, unit = numeric
            mi = {"tolerance": tol}
            if unit:
                mi["placeholder"] = unit
            cands.append((0, {
                "type": "math_input", "question": q, "answer": ans,
                "mathInput": mi,
                "hint": trim("Work it step by step, then enter the final value" +
                             (f" in {unit}." if unit else "."), 110),
                "misconception": misconception,
            }))
        # mcq challenge (factual / option-shaped key + synthesised distractors)
        key = trim_option(core)
        mcq = build_mcq(key, pool, seed + q[:40], stem_bucket(q), q)
        if mcq:
            options = mcq
            cands.append((2, {
                "type": "mcq", "question": q,
                "answer": options[-1],          # authored core; key is LAST
                "options": options,
                "hint": base_hint,
                "misconception": misconception,
            }))
        return [(pr, ch) for pr, ch in cands if challenge_ok(ch)]

    # -- per-cluster preparation -------------------------------------------
    def prepare_cluster(self, members, sim_seed, partial_scope_all=False):
        """Scope + usability screen + challenge candidates for one chapter
        cluster.  Returns (usable, member) where usable is the list of
        qualifying (nid, node, entry, verdict, diags, definition, cands)
        tuples and member maps nid -> scope/cores used by the sibling pool.
        ``partial_scope_all`` widens PARTIAL nodes to ALL their diagnostics
        (subject-isolated micro-lessons only -- there is no curated-sim
        sibling chapter to merge with, so the node's own six diagnostics
        must fill a >= MIN_CLUSTER_CHALLENGES lesson).
        """
        member = {}
        for nid, node, entry, verdict in members:
            if partial_scope_all and verdict != "MISSING":
                diags, kind = list(node.get("diagnostics") or []), "partial-isolated-all"
            else:
                diags, kind = scope_diagnostics(
                    node, verdict, entry.get("uncovered_diagnostics") or [])
            cores = []
            for k, d in enumerate(diags):
                core, _w = strip_wrong_tail(d.get("a", ""))
                if MIN_CORE_CHARS <= len(core) <= MAX_CORE_CHARS:
                    cores.append((k, core))
            member[nid] = (node, entry, verdict, diags, kind, cores)

        def sibling_pool(nid):
            """MCQ distractor pool: other nodes first, then this node's
            own other diagnostics (closest -- hence most confusable --
            last).  Entries: (nid2, k, core, stem bucket)."""
            own = [(nid, k, core,
                    stem_bucket(clean(member[nid][3][k].get("q", ""))))
                   for (k, core) in member[nid][5]]
            others = [(nid2, k, core,
                       stem_bucket(clean(member[nid2][3][k].get("q", ""))))
                      for nid2 in member if nid2 != nid
                      for (k, core) in member[nid2][5]]
            return others + own

        usable = []
        for nid in [m[0] for m in members]:
            node, entry, verdict, diags, kind, cores = member[nid]
            definition = clean(node.get("definition", ""))
            if len(definition) < 40:
                self.review.setdefault(nid, "definition too short for a teaching slide")
                continue
            cands_per_diag = []
            for k, d in enumerate(diags):
                got = self.diag_candidates(node, d, sibling_pool(nid),
                                           f"{sim_seed}:{nid}:{k}")
                if got:
                    cands_per_diag.append((k, got))
            min_needed = MIN_USABLE_MISSING if verdict == "MISSING" else MIN_USABLE_PARTIAL
            if len(cands_per_diag) < min_needed:
                self.review.setdefault(
                    nid, f"only {len(cands_per_diag)} usable diagnostics "
                         f"(need {min_needed} for {verdict})")
                continue
            usable.append((nid, node, entry, verdict, diags, definition, cands_per_diag))
        return usable, member

    # -- main ---------------------------------------------------------------
    def run(self):
        groups = defaultdict(list)
        for nid, entry in self.depth.items():
            node = self.nodes.get(nid)
            if node is None:
                self.review[nid] = "node missing from enhanced_nodes_index"
                continue
            verdict = (entry.get("verdict") or "").upper()
            if verdict == "GOLD":
                continue                          # already playable via curated sims
            if node["class"] not in self.classes:
                continue
            key = (node["class"], SUBJECT_CODE.get(node["subject"], node["subject"]),
                   node["chapter"])
            groups[key].append((nid, node, entry, verdict))

        compiled_by_file = defaultdict(list)
        index_clusters = []
        prepared = {}                             # key -> (usable, sim_seed)
        orphan_groups = {}                        # key -> usable (1-2 nodes)
        for (cls, sub, chap) in sorted(groups.keys()):
            members = sorted(groups[(cls, sub, chap)],
                             key=lambda x: (x[1]["node_num"], x[0]))
            sim_seed = f"gen_c{cls}_{sub}_ch{chap:02d}"
            usable, _member = self.prepare_cluster(members, sim_seed)
            prepared[(cls, sub, chap)] = (usable, sim_seed)

        # sibling merge: a chapter with only 1-2 qualifying nodes joins the
        # nearest viable chapter of the same class+subject (prefer a target
        # that stays within one lesson's slide cap; else nearest viable).
        merged_keys = {}
        isolated_keys = set()
        for (cls, sub, chap) in sorted(prepared.keys()):
            usable, _seed = prepared[(cls, sub, chap)]
            if len(usable) >= MIN_CLUSTER_NODES:
                continue
            if not SIBLING_MERGE:
                for u in usable:
                    self.review.setdefault(
                        u[0], f"chapter cluster too small "
                              f"({len(usable)} qualifying nodes < "
                              f"{MIN_CLUSTER_NODES})")
                continue
            if not usable:
                continue                          # members already reviewed
            orphan_groups[(cls, sub, chap)] = usable
            caps_ok, any_viable = [], []
            for (c2, s2, c) in sorted(prepared.keys()):
                if c2 != cls or s2 != sub or (c2, s2, c) not in prepared:
                    continue
                if len(prepared[(c2, s2, c)][0]) < MIN_CLUSTER_NODES:
                    continue
                total = len(prepared[(c2, s2, c)][0]) + len(usable)
                any_viable.append((abs(c - chap), c))
                if total <= MAX_CLUSTER_SLIDE_NODES:
                    caps_ok.append((abs(c - chap), c))
            tgt_list = caps_ok or any_viable
            if not tgt_list:
                # Subject-isolated chapter (every sibling chapter of this
                # class+subject is GOLD-covered).  Second chance: re-prepare
                # the group as a STANDALONE micro-lesson with PARTIAL nodes
                # scoped to all their own diagnostics; the chunk-level
                # >= MIN_CLUSTER_CHALLENGES bar still guards thickness.
                iso_usable, _ = self.prepare_cluster(
                    groups[(cls, sub, chap)], sim_seed, partial_scope_all=True)
                if iso_usable:
                    prepared[(cls, sub, chap)] = (iso_usable, sim_seed)
                    isolated_keys.add((cls, sub, chap))
                    continue
                for u in usable:
                    self.review.setdefault(
                        u[0], f"no viable sibling chapter to merge into "
                              f"({len(usable)} usable node(s), "
                              f"{MIN_CLUSTER_NODES} needed for a lesson)")
                continue
            tgt = (cls, sub, min(tgt_list)[1])
            prepared[tgt] = (prepared[tgt][0] + usable, prepared[tgt][1])
            merged_keys.setdefault(tgt, []).append(chap)

        for (cls, sub, chap) in sorted(prepared.keys()):
            usable, sim_seed = prepared[(cls, sub, chap)]
            if len(usable) < MIN_CLUSTER_NODES and (cls, sub, chap) not in isolated_keys:
                continue                          # orphan group already reviewed
            merged = sorted(usable, key=lambda x: (x[1]["node_num"], x[0]))
            if (cls, sub, chap) in merged_keys:
                # re-prepare so every member (including merged orphans)
                # builds candidates against the full merged sibling pool
                members = [(nid, node, entry, verdict)
                           for (nid, node, entry, verdict, _d, _df, _c) in merged]
                usable, _m = self.prepare_cluster(members, sim_seed)
                if len(usable) < MIN_CLUSTER_NODES:
                    for u in usable:
                        self.review.setdefault(
                            u[0], "merged cluster fell below the "
                                  "qualifying-node minimum after re-pooling")
                    continue
                merged = sorted(usable,
                                key=lambda x: (x[1]["node_num"], x[0]))
            merged_chaps = sorted({chap} | set(merged_keys.get((cls, sub, chap), [])))

            # chunk into lesson-sized clusters (5-15 nodes)
            n = len(merged)
            n_chunks = 1 if n <= MAX_CLUSTER_SLIDE_NODES else math.ceil(n / SOFT_MAX_CHUNK)
            base, extra = divmod(n, n_chunks)
            chunks, i = [], 0
            for ci in range(n_chunks):
                size = base + (1 if ci < extra else 0)
                chunks.append(merged[i: i + size])
                i += size

            for part, chunk in enumerate(chunks, 1):
                built = self.build_simdef(cls, sub, chap, part, n_chunks,
                                          chunk, sim_seed,
                                          merged_chaps if len(merged_chaps) > 1 else None)
                if built is None:
                    continue
                simdef, meta = built
                compiled_by_file[(cls, sub)].append(simdef)
                index_clusters.append(meta)
                for c in chunk:                   # compiled -> not in review
                    self.review.pop(c[0], None)

        self.emit(compiled_by_file, index_clusters)

    # -- SimDef assembly ---------------------------------------------------
    def build_simdef(self, cls, sub, chap, part, parts, chunk, sim_seed,
                     merged_chaps=None):
        heads = {}
        head_order = []
        for c in chunk:
            ht = head_term(c[5])
            cf = ht.casefold()
            if cf not in heads:
                heads[cf] = [0, ht]
                head_order.append(cf)
            heads[cf][0] += 1
        if not head_order:
            return None
        topic_cf = min(head_order,
                       key=lambda cf: (-heads[cf][0], head_order.index(cf)))
        topic = title_case(heads[topic_cf][1])
        label = SUBJECT_LABEL.get(sub, sub.upper())
        sim_subject = SUBJECT_SIM.get(sub, label.lower())
        sim_id = f"gen_c{cls}_{sub}_ch{chap:02d}" + (f"_p{part}" if parts > 1 else "")
        emoji = SUBJECT_EMOJI.get(sub, "🎓")
        bg, accent, scene = THEMES[h32(sim_seed + "theme") % len(THEMES)]

        # discovery: curiosity question on the cluster's own topic; hook line =
        # the chapter's own first definition sentence (or a real career line
        # where the careers map has this chapter)
        first_def = chunk[0][5]
        first_sents = sentences(first_def)
        hook_sent = trim(first_sents[0] if first_sents else first_def, 150)
        career_key = f"c{cls}_{sub}_ch{chap:02d}"
        if self.careers.get(career_key):
            car = self.careers[career_key][0]
            hook_line = trim(f"{clean(car.get('role', 'Professional'))}: "
                             f"{clean(car.get('line', ''))}.", 160)
        else:
            hook_line = hook_sent
        tq, opts = DISCOVERY_TEMPLATES[h32(sim_seed + "disc") % len(DISCOVERY_TEMPLATES)]
        t_sub = topic if len(topic) <= 34 else trim(topic, 34)
        discovery = {"question": tq.format(t=t_sub), "options": list(opts),
                     "answer": opts[0], "hook": hook_line}

        # teaching slides: 1 per node, definition verbatim (trimmed)
        teaching = []
        for i, (nid, node, entry, verdict, diags, definition, cands) in enumerate(chunk):
            slide = {
                "title": trim(title_case(head_term(definition)) or f"Node {i + 1}", 44),
                "text": trim(definition, 260),
                "emoji": emoji,
                "bgColor": SLIDE_BGS[h32(nid + "bg") % len(SLIDE_BGS)],
            }
            if cls >= 9:
                kx = katex_span(definition)
                if kx:
                    slide["katex"] = kx
            teaching.append(slide)

        # challenges: pass 1 = best candidate per node (its own hardest,
        # carrying that node's walkthrough as workedExample);
        # pass 2 = every remaining candidate (other diagnostics AND the
        # unused order/math/mcq variants of the best diagnostic) up to the
        # cluster cap
        challenges = []
        covered = 0
        scope_total = sum(len(c[4]) for c in chunk)
        overflow = []
        for nid, node, entry, verdict, diags, definition, cands_per_diag in chunk:
            ranked = sorted(cands_per_diag, key=lambda kv: min(p for p, _ in kv[1]))
            k_best, best = ranked[0]
            b_idx = min(range(len(best)), key=lambda i: best[i][0])
            pr, ch = best[b_idx]
            ch = dict(ch)
            ch["id"] = f"{sim_id}_q{len(challenges) + 1}"
            ch["nodeId"] = nid
            ch["difficulty"] = DIFFICULTY.get(node.get("cognitive_level", ""), "standard")
            attach_worked_example(ch, node)
            challenges.append(ch)
            covered += 1
            for k2, lst in ranked:
                start = b_idx + 1 if k2 == k_best else 0
                for pr2, ch2 in lst[start:]:
                    overflow.append((pr2, nid, node, ch2))
        overflow.sort(key=lambda x: (x[0], x[1], x[3]["question"][:24]))
        for pr, nid, node, ch in overflow:
            if len(challenges) >= MAX_CHALLENGES_PER_CLUSTER:
                break
            ch = dict(ch)
            ch["id"] = f"{sim_id}_q{len(challenges) + 1}"
            ch["nodeId"] = nid
            ch["difficulty"] = DIFFICULTY.get(node.get("cognitive_level", ""), "standard")
            challenges.append(ch)
            covered += 1

        if len(challenges) < MIN_CLUSTER_CHALLENGES:
            for c in chunk:
                self.review.setdefault(c[0], f"cluster too thin ({len(challenges)} challenges)")
            return None

        types = Counter(c["type"] for c in challenges)
        chap_list = merged_chaps or [chap]
        defn = {
            "id": sim_id,
            "title": trim(topic, 48),
            "subtitle": trim(f"{label} · Chapter {chap}" +
                             (f" · Part {part}" if parts > 1 else ""), 60),
            "classLevel": cls,
            "mode": "senior",
            "subject": sim_subject,
            "topic": topic,
            "chapters": [f"{label} Ch{c}: {topic}" for c in chap_list],
            "nodeIds": [c[0] for c in chunk],
            "emoji": emoji,
            "theme": {"bg": bg, "accent": accent, "scene": scene},
            "discovery": discovery,
            "teaching": teaching,
            "challenges": challenges,
            "reflect": {"prompts": [f"What surprised you about {topic.lower()}?",
                                    "Which challenge was hardest -- and why?"]},
            "successLine": trim(topic, 30) + " mastered! 🎯",
            "tryAgainLine": "Re-read the slides -- every answer hides in them.",
        }
        if len(challenges) > SAMPLE_CHALLENGES:
            defn["sampleChallenges"] = SAMPLE_CHALLENGES
        meta = {
            "sim_id": sim_id,
            "class": cls,
            "subject": sub,
            "chapter": chap,
            "merged_chapters": [c for c in chap_list if c != chap],
            "part": part,
            "node_ids": [c[0] for c in chunk],
            "verdicts": {c[0]: c[3] for c in chunk},
            "diagnostics_in_scope": scope_total,
            "diagnostics_compiled": covered,
            "challenge_types": dict(types),
        }
        return defn, meta

    # -- output ------------------------------------------------------------
    def emit(self, compiled_by_file, index_clusters):
        os.makedirs(GEN_DIR, exist_ok=True)
        var_by_file = {}
        for (cls, sub), defs in sorted(compiled_by_file.items()):
            fname = f"{cls}_{sub}_gen.ts"
            var = "C" + str(cls) + "_" + sub.upper() + "_GEN"
            var_by_file[fname] = var
            with open(os.path.join(GEN_DIR, fname), "w", encoding="utf-8",
                      newline="\n") as f:
                f.write("/**\n")
                f.write(f" * GENERATED by backend/its/competency/simdef_compiler.py"
                        f" -- class {cls} {sub}.\n")
                f.write(" * Every challenge is compiled from a teaching node's own\n")
                f.write(" * diagnostics (question / answer / misconception verbatim).\n")
                f.write(" * Deterministic output -- do not hand-edit; re-run the compiler.\n")
                f.write(" */\n")
                f.write("import type { SimDef } from '../engine/types';\n\n")
                f.write(f"export const {var}: SimDef[] = ")
                f.write(json.dumps(defs, ensure_ascii=False, indent=1))
                f.write(";\n")

        with open(os.path.join(GEN_DIR, "index.ts"), "w", encoding="utf-8",
                  newline="\n") as f:
            f.write("/**\n * GENERATED registry -- aggregated compiled SimDefs\n")
            f.write(" * (backend/its/competency/simdef_compiler.py).\n")
            f.write(" * Existing curated sims keep routing priority; generated sims\n")
            f.write(" * fill the MISSING/PARTIAL node gaps.\n */\n")
            f.write("import type { SimDef } from '../engine/types';\n")
            for fname, var in sorted(var_by_file.items()):
                f.write(f"import {{ {var} }} from './{fname[:-3]}';\n")
            f.write("\nexport const GENERATED_SIMS: SimDef[] = [\n")
            for fname, var in sorted(var_by_file.items()):
                f.write(f"  ...{var},\n")
            f.write("];\n\n")
            f.write("/** node id -> generated sim id (first compiled cluster wins) */\n")
            f.write("export const GENERATED_NODE_SIM: Record<string, string> = (() => {\n")
            f.write("  const m: Record<string, string> = {};\n")
            f.write("  for (const s of GENERATED_SIMS) "
                    "for (const n of s.nodeIds ?? []) if (!m[n]) m[n] = s.id;\n")
            f.write("  return m;\n})();\n")

        # per-file lazy loaders (one webpack chunk per class_subject file --
        # mirrors the classN/v3_loaders pattern so lite.ts can route to a
        # single generated sim without pulling the whole registry)
        id_to_file = {}
        for (cls, sub), defs in sorted(compiled_by_file.items()):
            fname = f"{cls}_{sub}_gen.ts"
            for d in defs:
                id_to_file[d["id"]] = fname
        with open(os.path.join(GEN_DIR, "loaders.ts"), "w", encoding="utf-8",
                  newline="\n") as f:
            f.write("/**\n * GENERATED per-file loaders (simdef_compiler.py).\n")
            f.write(" * sim id -> dynamic import of its class_subject chunk, so\n")
            f.write(" * /sims-v2/gen_x renders one file, not the whole registry.\n */\n")
            f.write("export const GENERATED_LOADERS: "
                    "Record<string, () => Promise<Record<string, unknown>>> = {\n")
            for sid in sorted(id_to_file):
                fname = id_to_file[sid][:-3]
                f.write(f"  '{sid}': () => import('./{fname}'),\n")
            f.write("};\n")

        by_class = defaultdict(lambda: {"clusters": 0, "nodes": 0,
                                        "diagnostics_compiled": 0,
                                        "diagnostics_in_scope": 0, "challenges": 0})
        for m in index_clusters:
            b = by_class[str(m["class"])]
            b["clusters"] += 1
            b["nodes"] += len(m["node_ids"])
            b["diagnostics_compiled"] += m["diagnostics_compiled"]
            b["diagnostics_in_scope"] += m["diagnostics_in_scope"]
            b["challenges"] += sum(m["challenge_types"].values())
        # playability: GOLD = playable before; + compiled = playable after
        playability = {}
        for c in sorted(self.classes):
            entries = [e for e in self.depth.values()
                       if (self.nodes.get(e["node_id"]) or {}).get("class") == c
                       and e["node_id"] in self.nodes]
            gold = sum(1 for e in entries if (e.get("verdict") or "").upper() == "GOLD")
            comp = by_class.get(str(c), {}).get("nodes", 0)
            rev = sum(1 for r in self.review
                      if (self.nodes.get(r) or {}).get("class") == c)
            playability[str(c)] = {
                "playable_before": gold,
                "nodes_compiled": comp,
                "playable_after": gold + comp,
                "nodes_in_review": rev,
                "depth_nodes": len(entries),
            }
        self.index_doc = {
            "_meta": {
                "generator": "backend/its/competency/simdef_compiler.py",
                "deterministic": True,
                "source": os.path.relpath(INDEX_PATH, ROOT).replace("\\", "/"),
                "depth_files": {str(c): os.path.relpath(DEPTH_PATHS[c], ROOT).replace("\\", "/")
                                for c in sorted(self.classes)},
                "purity_guard": {
                    "min_usable_diagnostics_missing": MIN_USABLE_MISSING,
                    "min_usable_diagnostics_partial": MIN_USABLE_PARTIAL,
                    "min_cluster_nodes": MIN_CLUSTER_NODES,
                    "min_cluster_challenges": MIN_CLUSTER_CHALLENGES,
                },
            },
            "totals": {
                "clusters": len(index_clusters),
                "nodes_compiled": sum(len(m["node_ids"]) for m in index_clusters),
                "diagnostics_compiled": sum(m["diagnostics_compiled"] for m in index_clusters),
                "diagnostics_in_scope": sum(m["diagnostics_in_scope"] for m in index_clusters),
                "challenges": sum(sum(m["challenge_types"].values()) for m in index_clusters),
                "nodes_reviewed": len(self.review),
            },
            "by_class": {k: by_class[k] for k in sorted(by_class)},
            "playability": playability,
            "clusters": sorted(index_clusters,
                               key=lambda m: (m["class"], m["subject"], m["chapter"], m["part"])),
        }
        with open(os.path.join(GEN_DIR, "GENERATED_INDEX.json"), "w", encoding="utf-8",
                  newline="\n") as f:
            json.dump(self.index_doc, f, ensure_ascii=False, indent=1)

        rows = []
        for nid in sorted(self.review):
            node = self.nodes.get(nid) or {}
            rows.append({"node_id": nid, "class": node.get("class"),
                         "subject": node.get("subject"), "chapter": node.get("chapter"),
                         "verdict": (self.depth.get(nid) or {}).get("verdict"),
                         "reason": self.review[nid]})
        reason_counts = Counter(re.sub(r"\(.*", "", r["reason"]).strip() for r in rows)
        self.review_doc = {
            "_meta": {
                "generator": "backend/its/competency/simdef_compiler.py",
                "note": "Nodes deliberately NOT force-generated (purity guard).",
            },
            "total": len(rows),
            "by_reason": dict(reason_counts.most_common()),
            "nodes": rows,
        }
        with open(os.path.join(GEN_DIR, "REVIEW_NEEDED.json"), "w", encoding="utf-8",
                  newline="\n") as f:
            json.dump(self.review_doc, f, ensure_ascii=False, indent=1)


# ------------------------------------------------------------------ CLI
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--classes", default="6,7,8,9,10,11,12")
    args = ap.parse_args()
    classes = [int(c) for c in args.classes.split(",") if c.strip()]
    comp = Compiler(classes)
    comp.run()

    t = comp.index_doc.get("totals", {})
    print("=== simdef_compiler run ===")
    print("classes:", classes)
    print("clusters:", t.get("clusters"), " nodes compiled:", t.get("nodes_compiled"),
          " challenges:", t.get("challenges"))
    print("diagnostics compiled / in scope:",
          t.get("diagnostics_compiled"), "/", t.get("diagnostics_in_scope"))
    print("review-needed nodes:", t.get("nodes_reviewed"))
    for k, v in sorted(comp.index_doc.get("by_class", {}).items()):
        print(f"  class {k}: {v}")
    print("top review reasons:", dict(list(comp.review_doc.get("by_reason", {}).items())[:6]))


if __name__ == "__main__":
    main()
