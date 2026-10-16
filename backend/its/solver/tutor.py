"""tutor.py -- the deterministic tutor loop on the competency graph.

The platform's differentiator: every question and concept is machine-
readable, so the tutor can attribute every attempt to an exact
competency and adapt on it.  This module is the v1 loop:

    serve -> student answers -> deterministic grade -> mastery update
          -> hint ladder on demand -> mistake book -> next concept

Design rules:
  - Deterministic everywhere: same student history => same next step.
    No LLM calls; questions come from gate-verified catalog content
    (worked examples carry their own verified answers, which is what
    makes grading an anchor and not a guess).
  - Zero-wrong aligned: the tutor never marks a student wrong on a
    technicality -- grading is numeric with unit-insensitive parsing
    and a small relative tolerance; anything ambiguous routes to
    "ungraded" and shows the worked solution instead.
  - Mastery is textbook-correct BKT (Bayesian Knowledge Tracing),
    delegated to backend/its/diagnosis/knowledge_tracing.py so the live
    tutor path and the practice path share ONE mastery model
    (per-student, per-concept p_known with an AFM-adapted learning
    rate).  A bounded EMA is kept as a documented fallback used only
    when the tracer module cannot be imported.

Concept selection policy (in order):
    1. prerequisite retreat: two straight wrongs on a concept arm a
       retreat -- the next serve is the concept's prerequisite (from
       the SQLite knowledge-graph edges, falling back to the
       same-subject earlier-chapter concept), with "retreated_from"
       and the "pehle wahi concept - 2 minute" voice line on the payload
    2. mistake-book review: a wrongly-answered concept becomes due
       again after two other serves (spaced repetition)
    3. weakest mastered-in-progress concept (mastery < 0.6)
    4. next new concept in curriculum order (class, subject, chapter)
    5. revision of the lowest-mastery concept overall

Struggling-student overlays on top of that policy:
    - difficulty ladder: every pool item is tagged easy/grade/hard
      (one-step + small numbers = easy); after a wrong answer the
      concept's next serve comes from an easier tier, and after two
      corrects it climbs back to grade level ("tier" on payloads)
    - micro-win mode: at mastery < 0.35 a self_check serve item is
      converted into a tiny graded one-step check built from its own
      worked answer's final number ("What does this step equal?");
      correct gives a small mastery bump, a miss never costs mastery.
"""

from __future__ import annotations

import hashlib
import json
import os
import random
import re
import time
from typing import Callable, Dict, Iterable, List, Optional, Set, Tuple

# --------------------------------------------------------------------- #
# unified mastery model: delegate to the diagnosis BKT tracer
# --------------------------------------------------------------------- #
# The diagnosis module imports only stdlib at module level (its DB
# imports are lazy), so this import is cheap and side-effect free.
try:
    from backend.its.diagnosis.knowledge_tracing import (
        AFMModel as _AFMModel,
        BKTModel as _BKTModel,
        KnowledgeTracingEngine as _Tracer,
    )
except Exception:                          # pragma: no cover - degraded env
    _Tracer = None
    _AFMModel = None
    _BKTModel = None

# the one canonical enh:/node-id aliasing module (stdlib-only); the
# prerequisite retreat resolves graph ids through it instead of
# hand-rolling the prefix dance
from backend.its.solver.id_resolution import (
    resolve_concept_id as _resolve_concept_id,
    resolve_node_id as _resolve_node_id,
)

# --------------------------------------------------------------------- #
# tunables (documented constants, not magic numbers)
# --------------------------------------------------------------------- #
MASTERY_START = 0.30          # BKT prior before the first attempt
MASTERY_CORRECT_GAIN = 0.25   # EMA fallback: push toward 1 on a correct
MASTERY_WRONG_DROP = 0.35     # EMA fallback: fall toward 0 on a wrong
MASTERY_PASS = 0.80           # "mastered" threshold
MASTERY_WEAK = 0.60           # below this the picker prioritises you
REVIEW_GAP = 2                # serves before a mistake is due again
GRADE_REL_TOL = 0.005         # 0.5% relative tolerance on numerics
POOL_CAP = 12                 # max questions kept per concept pool

# struggling-student features (retreat / difficulty ladder / micro-win)
RETREAT_WRONGS = 2            # consecutive wrongs before the retreat
RETREAT_VOICE = "pehle wahi concept - 2 minute"
TIER_RECOVER_CORRECTS = 2     # corrects before climbing back to grade
TIER_EASY_MAX_NUM = 100       # "small numbers" ceiling for the easy tier
TIER_HARD_NUM = 10000         # big-number floor for the hard tier
TIER_HARD_STEPS = 3           # step-count floor for the hard tier
MICRO_WIN_MASTERY = 0.35      # below this, self_check serves -> micro-wins
MICRO_WIN_GAIN = 0.10         # small mastery bump on a correct micro-win

# verbal-science MCQ synthesis: a number-free worked answer cannot be
# graded numerically (it currently earns a flat participation mastery),
# so it is converted into ONE deterministic 3-option multiple choice --
# correct option = the authored answer, distractors = sibling concepts'
# authored material plus guaranteed-wrong negations.  Choice and option
# order are seeded by a sha256 of the item, never random at serve time.
MCQ_SUBJECTS = frozenset({"science"})   # catalogs that get MCQ synthesis
MCQ_OPTION_COUNT = 3          # correct answer + two distractors
MCQ_MIN_CORRECT_CHARS = 8     # shorter answers are too thin to test
MCQ_MIN_OPTION_CHARS = 15     # a distractor must carry some content
MCQ_MAX_OPTION_CHARS = 220    # options are trimmed to the key clause
MCQ_DISTRACT_CAP_CHARS = 240  # hard ceiling on distractor length
MCQ_SIMILARITY_REJECT = 0.60  # token-Jaccard at which a sibling candidate
                              # could read as a second right answer

_NUM_RE = re.compile(r"-?\d[\d,]*(?:\.\d+)?")
_STEP_SPLIT_RE = re.compile(r"[\n;]+|(?<=[.!?])\s+")

_DONT_KNOW_RE = re.compile(
    r"\b(?:dont\s?know|don't\s?know|dont\s?no|no\s+idea|idk|dunno|"
    r"cant\s??(?:do|solve|say)|can't\s??(?:do|solve)|no\s+clue|"
    r"pata\s+nahi|give\s+up|skip)\b", re.I)


def _extract_number(text: str) -> Optional[float]:
    """First number in an answer string ('Rs 1,20,000', '600 m',
    '45%').  Indian-style commas are stripped."""
    m = _NUM_RE.search(str(text or ""))
    if not m:
        return None
    try:
        return float(m.group(0).replace(",", ""))
    except ValueError:
        return None


def _extract_numbers(text: str) -> List[float]:
    """Every number in the text, in order (a student may show working
    and then the final answer; any of them matching counts)."""
    out = []
    for m in _NUM_RE.finditer(str(text or "")):
        try:
            out.append(float(m.group(0).replace(",", "")))
        except ValueError:
            continue
    return out


def count_steps(solution: str) -> int:
    """Number of authored steps in a worked answer: newline/semicolon
    separated lines, or sentences within one line."""
    return len([s for s in _STEP_SPLIT_RE.split(str(solution or ""))
                if s and s.strip()])


def classify_tier(q: str, a: str) -> str:
    """Difficulty-ladder tag for a pool item: 'easy' / 'grade' / 'hard'.

    Heuristic on machine-readable structure only: three or more worked
    steps, or any big number, reads hard; a one-step solution over
    small numbers (< 100) reads easy; everything else is grade-level.
    Deterministic and corpus-independent."""
    nums = _extract_numbers(q) + _extract_numbers(a)
    biggest = max((abs(n) for n in nums), default=0.0)
    steps = count_steps(a)
    if steps >= TIER_HARD_STEPS or biggest >= TIER_HARD_NUM:
        return "hard"
    if steps <= 1 and biggest < TIER_EASY_MAX_NUM:
        return "easy"
    return "grade"


def mask_numbers(text: str) -> str:
    """Blank out every number ('273 K' -> '____ K').  Used by the
    micro-win check so the served step never leaks its own answer."""
    return _NUM_RE.sub("____", str(text or ""))


def _final_number_text(answer: str) -> Optional[str]:
    """The worked answer's final number, exactly as written."""
    matches = list(_NUM_RE.finditer(str(answer or "")))
    return matches[-1].group(0) if matches else None


def _final_step_sentence(answer: str) -> str:
    """The sentence of the worked answer that carries the final
    number -- the step the micro-win check asks about."""
    text = str(answer or "").strip()
    parts = [s for s in _STEP_SPLIT_RE.split(text) if s and s.strip()]
    if not parts:
        return ""
    last = _final_number_text(text)
    for part in reversed(parts):
        if last is not None and last in part:
            return part.strip()
    return parts[-1].strip()


def micro_check(answer: str) -> Optional[Tuple[str, str]]:
    """Convert a self_check item into a tiny graded one-step check.

    Uses the item's own worked answer's final number as the graded
    sub-question's answer ("What does this step equal?").  Returns
    (question, expected), or None when the answer carries no number
    (conversion not possible -- serve the self_check as-is).  The
    shown step has its numbers masked so the serve never leaks."""
    expected = _final_number_text(answer)
    if expected is None:
        return None
    step = _final_step_sentence(answer)
    question = 'Tiny check, one step: "{0}" -- what does this step ' \
               "equal?".format(mask_numbers(step))
    return question, expected


def _record_attempt(st: dict, is_correct: bool) -> None:
    """Struggle-telemetry: append {is_correct, response_ms} to the
    student's recent-attempt ring (newest first, capped) for the
    API layer's StruggleMonitor.  response_ms is measured against the
    last serve's monotonic timestamp; when no serve timestamp exists
    (e.g. a submit on a stale question after reload) a large sentinel
    marks the attempt "not rapid" instead of faking a guess."""
    ts = st.pop("last_serve_ts", None)
    try:
        ms = int((time.monotonic() - ts) * 1000) if ts is not None else None
    except Exception:
        ms = None
    recent = st.setdefault("recent", [])
    recent.insert(0, {"is_correct": bool(is_correct),
                      "response_ms": ms if ms is not None else 10 ** 9})
    del recent[8:]


# --------------------------------------------------------------------- #
# deterministic MCQ synthesis for verbal science items
# --------------------------------------------------------------------- #
# A verbal worked answer ("Science is a way of understanding the world
# ...") has no number, so grade_numeric returns None and the item can
# only be graded by flat participation.  For those items we synthesize
# ONE multiple-choice question whose correct option IS the authored
# answer: grading then compares the submitted option (index or exact
# text) -- deterministic and zero-wrong, and a wrong pick is a real
# wrong that moves BKT mastery.

_MCQ_VERB_RE = re.compile(
    r"\b(is|are|was|were|can|could|will|would|shall|should|may|might|"
    r"must)\b", re.I)

# a sentence that already carries a negation is never negated again (a
# second 'not' could flip the statement back toward true)
_MCQ_NEGATION_RE = re.compile(
    r"\b(not|never|no|none|nor|nothing|cannot|can't|won't|don't|doesn't|"
    r"didn't|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't)\b", re.I)

_MCQ_STOPWORDS = frozenset("""
a an the and or but if then else of in on at to for by with from as is are
was were be been being am do does did doing done have has had having it its
it's this that these those there here what which who whom whose when where
why how not no nor so than too very can will just should now also into
about between during before after above below up down out off over under
again further once all any both each few more most other some such only
own same their them they he she we you i his her our your my me us because
while until against through does
""".split())


def _mcq_norm(text: str) -> str:
    """Comparison form of an option: lower-cased, whitespace-collapsed,
    trailing period dropped."""
    return re.sub(r"\s+", " ", str(text or "").strip().rstrip(".")).lower()


def _mcq_content_words(text: str) -> Set[str]:
    """Lower-cased content words of a text (stopwords dropped) -- the
    token set behind the distractor similarity guard."""
    return {w for w in re.findall(r"[a-z][a-z'\-]+", _mcq_norm(text))
            if w not in _MCQ_STOPWORDS}


def _mcq_jaccard(a: Set[str], b: Set[str]) -> float:
    if not a or not b:
        return 0.0
    inter = len(a & b)
    return inter / len(a | b) if inter else 0.0


def _mcq_first_clause(text: str) -> str:
    """The answer's key clause: everything up to the first sentence
    end (list answers without a period come back whole)."""
    t = re.sub(r"\s+", " ", str(text or "")).strip()
    parts = re.split(r"(?<=[.!?])\s+", t)
    return parts[0].strip() if parts else t


def _mcq_trim(text: str, limit: int = MCQ_MAX_OPTION_CHARS) -> str:
    """Option text for display: the key clause, hard-trimmed at a word
    boundary when still over the cap."""
    t = _mcq_first_clause(text)
    if len(t) <= limit:
        return t
    cut = t[:limit]
    sp = cut.rfind(" ")
    return (cut[:sp] if sp > limit // 2 else cut).rstrip(" ,;:-")


def _mcq_negation(sentence: str) -> Optional[str]:
    """A guaranteed-wrong variant of the authored answer: 'not' inserted
    after the first finite verb.  None when the sentence has no
    negatable verb or already carries a negation (a second 'not' could
    flip it back toward true -- never risk that)."""
    if not sentence or _MCQ_NEGATION_RE.search(sentence):
        return None
    m = _MCQ_VERB_RE.search(sentence)
    if not m:
        return None
    if m.group(0).lower() == "can":
        negated = sentence[:m.start()] + "cannot" + sentence[m.end():]
    else:
        negated = sentence[:m.end()] + " not" + sentence[m.end():]
    return re.sub(r"\s+", " ", negated).strip()


def _mcq_sibling_candidates(
        concept_id: str, question: str,
        siblings: Optional[Iterable[dict]]) -> List[str]:
    """Distractor raw material from the catalog's OTHER concepts: their
    worked answers, definitions and key ideas.  Same chapter, so each
    candidate is topically adjacent (plausible) yet wrong for this
    question.  A sibling answer whose own question overlaps this one is
    skipped -- it could read as a second right answer."""
    q_words = _mcq_content_words(question)
    out: List[str] = []
    for other in siblings or []:
        if not isinstance(other, dict):
            continue
        if str(other.get("id") or "") == str(concept_id):
            continue
        for w in (other.get("worked_examples") or []):
            if not isinstance(w, dict):
                continue
            sq = str(w.get("q") or w.get("question") or "").strip()
            sa = str(w.get("a") or w.get("answer") or w.get("solution")
                     or "").strip()
            if not sa:
                continue
            if sq and _mcq_jaccard(q_words,
                                   _mcq_content_words(sq)) >= 0.5:
                continue
            out.append(sa)
        for field in ("definition", "key_idea"):
            v = str(other.get(field) or "").strip()
            if v:
                out.append(v)
    return out


def build_mcq(concept_id: str, question: str, answer: str,
              siblings: Optional[Iterable[dict]] = None) -> Optional[dict]:
    """ONE deterministic 3-option MCQ for a verbal (number-free) item.

    Correct option: the authored answer trimmed to its key clause.
    Distractors, in priority order: sibling concepts' authored material
    (guard-rejected when too close to the answer or to each other),
    then guaranteed-wrong transforms of the answer itself (its
    negation, then templated confusions) so even single-concept
    catalogs can be served honestly.

    Returns {"options": [3 strings], "correct_index": int}, or None
    when two clearly-wrong distractors cannot be built -- the item then
    stays a self_check (honest, no fake grading).  The sha256 seed over
    (concept_id, question, answer) fixes distractor choice AND option
    order forever: identical at every serve, on every restart."""
    answer = str(answer or "").strip()
    correct = _mcq_trim(answer)
    if len(_mcq_norm(correct)) < MCQ_MIN_CORRECT_CHARS:
        return None            # too thin to test as a choice question
    seed = hashlib.sha256("\x1f".join(
        (str(concept_id), str(question), answer)).encode("utf-8")).digest()
    rng = random.Random(seed)
    correct_norm = _mcq_norm(correct)
    correct_words = _mcq_content_words(correct)
    chosen: List[str] = []

    def add(cand: str, guaranteed_wrong: bool) -> bool:
        t = str(cand or "").strip()
        if not t:
            return False
        n = _mcq_norm(t)
        if not (MCQ_MIN_OPTION_CHARS <= len(n) <= MCQ_DISTRACT_CAP_CHARS):
            return False
        if n == correct_norm or any(n == _mcq_norm(c) for c in chosen):
            return False
        if not guaranteed_wrong and (n in correct_norm
                                     or correct_norm in n):
            return False
        if (not guaranteed_wrong
                and _mcq_jaccard(_mcq_content_words(t),
                                 correct_words) >= MCQ_SIMILARITY_REJECT):
            return False
        chosen.append(t.strip())
        return True

    sibs = [s for s in (_mcq_trim(x) for x in _mcq_sibling_candidates(
        concept_id, question, siblings)) if s]
    rng.shuffle(sibs)
    for cand in sibs:
        if len(chosen) >= MCQ_OPTION_COUNT - 1:
            break
        add(cand, guaranteed_wrong=False)
    if len(chosen) < MCQ_OPTION_COUNT - 1:
        # thin-corpus fallback: guaranteed-false transforms of the
        # authored answer (a negated true statement is always false)
        clause = _mcq_first_clause(answer)
        fallbacks = [_mcq_negation(clause),
                     "It is not true that {0}".format(clause),
                     "The opposite is the case - {0}".format(clause)]
        for cand in fallbacks:
            if len(chosen) >= MCQ_OPTION_COUNT - 1:
                break
            if cand:
                add(cand, guaranteed_wrong=True)
    if len(chosen) != MCQ_OPTION_COUNT - 1:
        return None
    options = chosen + [correct]
    rng.shuffle(options)
    return {"options": options, "correct_index": options.index(correct)}


def grade_mcq(student_answer: str, mcq: dict,
              authored: str = "") -> bool:
    """Deterministic MCQ grading.  The submission counts when it is the
    correct option's exact text, the full authored answer (a student
    may restate what the worked solution showed), or the option's index
    in a common form ("2", "B", "option 2", "(b)").  Everything else is
    wrong -- the three options were on screen; none of them was
    picked."""
    options = [str(o) for o in (mcq or {}).get("options") or []]
    idx = (mcq or {}).get("correct_index")
    if not options or not isinstance(idx, int) or not (
            0 <= idx < len(options)):
        return False
    given = _mcq_norm(student_answer)
    if not given:
        return False
    if given == _mcq_norm(options[idx]):
        return True
    if authored and given == _mcq_norm(authored):
        return True
    n = len(options)
    letters = "abcdefghij"[:n]
    m = re.fullmatch(
        r"(?:option|ans(?:wer)?)?\s*[\(\[]?\s*([1-{0}{1}])\s*[\)\].]?".format(
            min(n, 9), letters if n <= 10 else ""),
        given)
    if m:
        tok = m.group(1)
        picked = (int(tok) - 1) if tok.isdigit() else letters.index(tok)
        return 0 <= picked < n and picked == idx
    return False


def _parse_id_list(raw) -> List[str]:
    """Tolerant parse of a prerequisites/forward_nodes JSON list."""
    if isinstance(raw, list):
        vals = raw
    else:
        txt = str(raw or "").strip()
        if not txt or txt.lower() in ("null", "none"):
            return []
        try:
            vals = json.loads(txt)
        except (ValueError, TypeError):
            return []
        if not isinstance(vals, list):
            return []
    return [str(v) for v in vals if v]


def _candidate_graph_dbs() -> List[str]:
    """Where the SQLite knowledge graph may live (same env precedence
    as backend/services/graph_sqlite_fallback.py)."""
    paths: List[str] = []
    for var in ("PLATFORM_DATABASE_URL", "DATABASE_URL"):
        m = re.match(r"sqlite(?:\+aiosqlite)?:///(?P<p>.+)",
                     os.environ.get(var, "") or "")
        if m:
            paths.append(m.group("p"))
    root = os.path.normpath(os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "..", ".."))
    paths.append(os.path.join(root, "backend_local.db"))
    paths.append(os.path.join(os.getcwd(), "backend_local.db"))
    out, seen = [], set()
    for p in paths:
        norm = os.path.normpath(p)
        if norm not in seen:
            seen.add(norm)
            out.append(norm)
    return out


def load_graph_prerequisites() -> Dict[str, str]:
    """node_id -> first prerequisite node_id, read from the SQLite
    knowledge_nodes table (the graph store behind
    backend/services/graph_sqlite_fallback.py, seeded by
    backend/tools/seed_graph_sqlite.py; each row's prerequisites JSON
    list is the REQUIRES edge set).  Read-only and best-effort: a
    missing or unreadable db yields {} and the tutor falls back to the
    same-subject earlier-chapter prerequisite."""
    import sqlite3
    for path in _candidate_graph_dbs():
        if not os.path.isfile(path):
            continue
        try:
            con = sqlite3.connect(
                "file:{0}?mode=ro".format(path.replace("\\", "/")),
                uri=True)
            try:
                rows = con.execute(
                    "SELECT node_id, prerequisites "
                    "FROM knowledge_nodes").fetchall()
            finally:
                con.close()
        except Exception:
            continue
        out: Dict[str, str] = {}
        for node_id, raw in rows:
            ids = _parse_id_list(raw)
            if node_id and ids:
                out[str(node_id)] = ids[0]
        if out:
            return out
    return {}


def grade_numeric(student_answer: str, expected: str) -> Optional[bool]:
    """Deterministic NL-tolerant grading.  The student may show
    working: if ANY number in the answer matches the expected value,
    the attempt is correct.  Integer answers grade exact (599 is not
    600); non-integers get a 0.5% relative band.  None = ambiguous
    (show the worked solution rather than guess)."""
    want = _extract_number(expected)
    if want is None:
        return None
    gots = _extract_numbers(student_answer)
    if not gots:
        return None

    def hit(g: float) -> bool:
        if g.is_integer() and want.is_integer():
            return g == want
        tol = max(abs(want) * GRADE_REL_TOL, 1e-9)
        return abs(g - want) <= tol

    return any(hit(g) for g in gots)


class _Concept:
    __slots__ = ("concept_id", "title", "formula", "pool", "order_key")

    def __init__(self, concept_id, title, formula, pool, order_key):
        self.concept_id = concept_id
        self.title = title
        self.formula = formula
        self.pool = pool              # list of {"q", "a"} worked items
        self.order_key = order_key    # (class, subject, chapter, index)


class TutorEngine:
    """The loop.  Catalogs supply questions + verified answers; the
    student model supplies adaptation; grading is numeric and strict."""

    def __init__(self, catalog_dir: str,
                 generated_dir: Optional[str] = None,
                 persist_path: Optional[str] = None,
                 store: Optional[object] = None):
        self.concepts: Dict[str, _Concept] = {}
        self._load_catalogs(catalog_dir)
        self.generated_questions = 0      # generated items merged into pools
        self.generated_files_skipped = 0  # malformed bank files skipped
        if generated_dir is None:
            # live layout: <its>/competency catalogs sit beside
            # <its>/questions/generated banks
            generated_dir = os.path.join(
                os.path.dirname(os.path.abspath(catalog_dir)),
                "questions", "generated")
        self._merge_generated(generated_dir)
        self.students: Dict[str, dict] = {}
        # prerequisite retreat: explicit edges (tests / ops overrides)
        # win over the SQLite knowledge graph, which wins over the
        # same-subject earlier-chapter fallback
        self.prereq_overrides: Dict[str, str] = {}
        self._graph_prereqs: Optional[Dict[str, str]] = None
        # persistence: a store (services.tutor_store) is loaded at startup
        # and upserted after every serve/submit so /api/tutor-graph/progress
        # survives restarts.  DbTutorStore writes one row per student;
        # FileTutorStore keeps the legacy whole-dict JSON behaviour for
        # tests.  persist_path alone → FileTutorStore (hermetic default).
        self.persist_path = persist_path
        self.store = None
        if store is not None:
            self.store = store
            self.students = store.load_all()
        elif persist_path:
            from backend.services.tutor_store import FileTutorStore
            self.store = FileTutorStore(persist_path)
            self.students = self.store.load_all()
        # spiral-review hook: called with (student_id, concept_id,
        # question, expected) whenever a graded wrong answer is booked
        # into the mistake book, so the tutoring SM-2 queue schedules a
        # spaced review for it.  Injected by the API layer (the engine
        # itself stays import-light and DB-free); a hook failure never
        # blocks grading.
        self.review_hook: Optional[Callable[[str, str, str, str],
                                            None]] = None

    # ---------------- catalog loading ---------------- #
    def _load_catalogs(self, catalog_dir: str) -> None:
        rows = []
        for f in sorted(os.listdir(catalog_dir)):
            if not (f.startswith("catalog_") and f.endswith(".json")):
                continue
            path = os.path.join(catalog_dir, f)
            try:
                cat = json.load(open(path, encoding="utf-8"))
            except Exception:
                continue
            cls = cat.get("class")
            subj = str(cat.get("subject", ""))
            ch = cat.get("chapter")
            try:
                cls_i = int(str(cls))       # '10' and 10 both coerce
            except (TypeError, ValueError):
                cls_i = 99
            for i, c in enumerate(cat.get("concepts", [])):
                cid = c.get("id")
                pool = self._concept_pool(cat, c)
                if not cid or not pool:
                    continue
                rows.append((_Concept(
                    cid, str(c.get("title", "")),
                    str(c.get("formula", "")), pool,
                    (cls_i,
                     subj, int(ch) if isinstance(ch, (int, float))
                     else 99, i))))
        rows.sort(key=lambda c: c.order_key)
        for order, con in enumerate(rows):
            con.order_key = (con.order_key[0], con.order_key[1],
                             con.order_key[2], order)
            self.concepts[con.concept_id] = con
        self._load_enhanced_nodes(catalog_dir)

    # node-id subject codes that never serve as tutor concepts: the
    # english/hindi banks are language content, not graph-tutor material
    _ENH_EXCLUDED_SUBJECTS = frozenset({
        "eng", "engl", "english", "hin", "hindi"})

    @staticmethod
    def _enhanced_class_subject(node_id: str) -> Tuple[Optional[int], str]:
        """(class, subject-code) parsed from an enhanced node id
        ('enh:c10_bio_cbse_01_001' -> (10, 'bio')).  (None, '') when the
        id carries no parseable class tag."""
        m = re.match(r"enh:c?(\d{1,2})[_-]([a-z]+)", str(node_id or ""),
                     re.I)
        if not m:
            return None, ""
        try:
            return int(m.group(1)), m.group(2).lower()
        except ValueError:
            return None, m.group(2).lower()

    def _load_enhanced_nodes(self, catalog_dir: str) -> None:
        """Synthetic teach-concepts from enhanced-node diagnostic banks
        (generated/enhanced_*.json, written by
        backend/tools/seed_enhanced_question_bank.py).  Keyed
        enh:<node_id>; serve items are self_check diagnostics.

        CLASS GATE: the concept's class comes from the node id itself
        ('enh:c10_...' -> class 10) so the serve-time class_level filter
        can include/exclude it like any catalog concept; english/hindi
        banks never load at all."""
        gen_dir = os.path.join(
            os.path.dirname(os.path.abspath(catalog_dir)),
            "questions", "generated")
        if not os.path.isdir(gen_dir):
            return
        next_order = (max((c.order_key[3] for c in self.concepts.values()),
                          default=0)) + 1
        for f in sorted(os.listdir(gen_dir)):
            if not f.startswith("enhanced_") or not f.endswith(".json"):
                continue
            try:
                bank = json.load(open(os.path.join(gen_dir, f),
                                      encoding="utf-8"))
                con = bank["concepts"][0]
                node_id = con["id"]
                cls_i, subj_code = self._enhanced_class_subject(node_id)
                if subj_code in self._ENH_EXCLUDED_SUBJECTS:
                    continue        # english/hindi: not tutor material
                qs = [{"q": q["q"], "a": q["a"], "self_check": True,
                       "tier": classify_tier(str(q.get("q") or ""),
                                             str(q.get("a") or ""))}
                      for q in con.get("questions", []) if q.get("q")]
                if not qs:
                    continue
            except Exception:
                continue
            # title fallback: never expose a raw node_id as the concept
            # name — derive from the bank's chapter or first question
            title = str(con.get("title") or "").strip()
            if not title or title == node_id or title.startswith("enh:"):
                title = str(bank.get("chapter_title") or "").strip()
            if not title:
                first_q = str(qs[0].get("q") or "")
                m2 = re.match(
                    r"^(?:find|solve|state|name|identify|classify|"
                    r"determine|evaluate)\s+(.{4,60})", first_q, re.I)
                title = (m2.group(1).strip().rstrip(".,;: ")
                         if m2 else "Concept")
            next_order += 1
            self.concepts[node_id] = _Concept(
                node_id, title, "-", qs,
                (cls_i if cls_i is not None else 99,
                 "enhanced", 999, next_order))

    @staticmethod
    def _concept_pool(cat: dict, c: dict) -> List[dict]:
        """Question pool for a concept, from two catalog shapes:

        - worked examples {"q", "a"}: graded items (verified answers)
        - template entries {"question_pattern", "solution_template",
          "extracted_variables"}: self-check items (serve the question,
          reveal the authored steps; not machine-graded)

        VERBAL SCIENCE ITEMS: a worked answer with no number cannot be
        graded numerically (it would earn flat participation mastery).
        When the catalog's subject is in MCQ_SUBJECTS, each such item
        gets ONE deterministic 3-option MCQ built from the authored
        answer plus sibling concepts' material (build_mcq); grading
        then compares the picked option -- real correct/wrong.  Items
        whose distractors come out too thin stay self_check honestly.
        """
        pool: List[dict] = []
        siblings = ([x for x in (cat.get("concepts") or [])
                     if isinstance(x, dict)]
                    if str(cat.get("subject", "")).strip().lower()
                    in MCQ_SUBJECTS else None)
        concept_id = str(c.get("id") or "")

        concept_steps_l = [str(s.get("explain") or s.get("action") or s).strip()
                           for s in (c.get("solution_steps") or [])
                           if isinstance(s, dict) and (s.get("explain") or s.get("action"))]

        def _worked_item(raw_q: str, raw_a: str, steps_l=None) -> dict:
            item = {"q": raw_q, "a": raw_a,
                    "steps": steps_l or [],
                    "self_check": not re.search(r"\d", raw_a),
                    "tier": classify_tier(raw_q, raw_a)}
            if item["self_check"] and siblings is not None:
                mcq = build_mcq(concept_id, raw_q, raw_a, siblings)
                if mcq is not None:
                    item["mcq"] = mcq
                    item["self_check"] = False   # machine-gradable now
            elif item["self_check"] and str(
                    cat.get("subject", "")).strip().lower() \
                    in _MCQ_STORE_SUBJECTS:
                # humanities/commerce: consult the pre-generated verbal
                # MCQ store (mcq_distractors) -- a hash lookup keyed by
                # the question text, no per-boot synthesis; purity-
                # rejected items stay self_check honestly
                entry = _mcq_store_lookup(raw_q)
                if entry is not None:
                    item["mcq"] = entry
                    item["self_check"] = False   # machine-gradable now
            return item

        # catalog-level worked_examples carry a "concept" owner field —
        # only merge the ones owned by THIS concept (the earlier code
        # appended the whole chapter's examples into every concept's
        # pool, cross-binding questions to wrong concepts)
        def _owned(w: dict) -> bool:
            owner = str(w.get("concept") or "").strip()
            return not owner or owner == str(c.get("id") or "")

        for w in cat.get("worked_examples", []):
            if not isinstance(w, dict) or not _owned(w):
                continue
            q = str(w.get("q") or w.get("question") or "").strip()
            a = str(w.get("a") or w.get("answer") or w.get("solution")
                    or "").strip()
            if q and a:
                pool.append(_worked_item(q, a, concept_steps_l))
        # concepts may also carry their own examples; shapes seen:
        # {"q","a"} (graded) and {"question","solution","answer"}
        # (Curiosity/science — gradeable when the answer carries a
        # number, honest self_check otherwise)
        for w in (c.get("worked_examples") or []):
            if not isinstance(w, dict):
                continue
            q = str(w.get("q") or w.get("question") or "").strip()
            a = str(w.get("a") or w.get("answer") or w.get("solution")
                    or "").strip()
            if q and a:
                pool.append(_worked_item(q, a, concept_steps_l))
        for w in cat.get("worked_examples", []):
            if not isinstance(w, dict) or not _owned(w):
                continue
            pattern = w.get("question_pattern")
            if not pattern:
                continue
            q = str(pattern)
            variables = w.get("extracted_variables") or {}
            if isinstance(variables, dict) and variables:
                try:
                    q = q.format_map({k: v for k, v in variables.items()
                                      if v is not None})
                except (KeyError, IndexError, ValueError):
                    pass
            steps = w.get("solution_template") or []
            step_txts = [str(s.get("explain") or s.get("action") or "")
                         .strip()
                         for s in steps if isinstance(s, dict)]
            step_txts = [s for s in step_txts if s]
            solution = " ".join(step_txts).strip()
            if not solution:
                solution = "Work through the method shown in the " \
                           "concept steps."
            pool.append({"q": q, "a": solution,
                         "steps": step_txts or concept_steps_l,
                         "self_check": True,
                         "tier": classify_tier(q, solution)})
        return pool

    # ---------------- generated bank merge ---------------- #
    def _merge_generated(self, generated_dir: str) -> None:
        """Merge generated question banks into the concept pools.

        Banks live at backend/its/questions/generated/<catalog_stem>.json
        and are written incrementally by parallel agents, so anything
        may be missing or half-written: every file, concept and question
        is guarded, and malformed content is skipped silently (counted
        in generated_files_skipped).  Worked examples stay first in each
        pool; generated questions are appended after them, and the pool
        is capped at POOL_CAP items (the serve loop round-robins it).
        """
        if not os.path.isdir(generated_dir):
            return
        for f in sorted(os.listdir(generated_dir)):
            if not f.endswith(".json"):
                continue
            path = os.path.join(generated_dir, f)
            try:
                with open(path, encoding="utf-8") as fh:
                    bank = json.load(fh)
                if not isinstance(bank, dict):
                    raise ValueError("bank is not an object")
                entries = bank.get("concepts")
                if not isinstance(entries, list):
                    raise ValueError("concepts is not a list")
                for entry in entries:
                    if not isinstance(entry, dict):
                        continue
                    con = self.concepts.get(str(entry.get("id") or ""))
                    if con is None:
                        continue        # not a catalog concept: ignore
                    questions = entry.get("questions")
                    if not isinstance(questions, list):
                        continue
                    steps = entry.get("solution_steps")
                    # steps may be strings or {action/explain} dicts
                    step_txts = []
                    if isinstance(steps, list):
                        for s in steps:
                            if isinstance(s, dict):
                                step_txts.append(str(
                                    s.get("explain") or
                                    s.get("action") or "").strip())
                            else:
                                step_txts.append(str(s).strip())
                    step_txts = [s for s in step_txts if s]
                    fallback = " ".join(step_txts).strip()
                    for qi in questions:
                        if len(con.pool) >= POOL_CAP:
                            break
                        if not isinstance(qi, dict) or not str(
                                qi.get("q") or "").strip():
                            continue
                        ans = str(qi.get("a") or "").strip() or fallback
                        if not ans:
                            continue
                        q_steps = qi.get("steps")
                        if not (isinstance(q_steps, list) and q_steps):
                            q_steps = step_txts
                        item = {
                            "q": str(qi["q"]), "a": ans,
                            "steps": [str(s) for s in q_steps],
                            "self_check": bool(qi.get("self_check", False)),
                            "tier": classify_tier(str(qi["q"]), ans)}
                        # VERBAL BANK ITEMS (digit-free answer, store
                        # subject): a number-free answer cannot be graded
                        # numerically, so consult the pre-generated MCQ
                        # store -- the same contract as _concept_pool.
                        # A store entry makes the item a real
                        # machine-graded MCQ; a store miss (purity-
                        # rejected) stays an honest self_check and is
                        # never force-graded through grade_numeric.
                        if (not re.search(r"\d", ans)
                                and con.order_key[1]
                                in _MCQ_STORE_SUBJECTS):
                            entry = _mcq_store_lookup(str(qi["q"]))
                            if entry is not None:
                                item["mcq"] = entry
                                item["self_check"] = False
                            else:
                                item["self_check"] = True
                        con.pool.append(item)
                        self.generated_questions += 1
            except Exception:
                self.generated_files_skipped += 1

    # ---------------- student model ---------------- #
    def _student(self, student_id: str) -> dict:
        st = self.students.get(student_id)
        if st is None:
            st = {
                "mastery": {},      # concept_id -> float
                "attempts": {},     # concept_id -> count
                "served": {},       # concept_id -> count
                "last_serve": None,
                "mistakes": [],     # [{"concept_id", "q", "expected",
                                    #   "got", "gap_serves"}]
            }
            self.students[student_id] = st
        # struggling-student state; setdefault keeps older save files
        # loadable without migration
        st.setdefault("wrong_streak", {})    # cid -> consecutive wrongs
        st.setdefault("correct_streak", {})  # cid -> consecutive corrects
        st.setdefault("tier_pref", {})       # cid -> easy | grade
        st.setdefault("micro_pending", {})   # qid -> {"answer", ...}
        st.setdefault("retreat_to", None)    # armed prerequisite cid
        st.setdefault("retreat_from", None)  # the concept we retreated
        st.setdefault("revealed", {})        # qid -> saw the L3 worked
                                             # solution (earns no credit)
        # per-(student, concept) BKT parameters, kept loadable for older
        # save files: p_transit is the AFM-adapted learning rate and the
        # success/failure counts feed its update
        st.setdefault("bkt", {})             # cid -> {p_transit, successes,
                                             #   failures}
        # infinite numerical drills (physics/chemistry): gen_served is
        # the served-variant counter per concept, gen_pending maps drill
        # question ids to their generated item so submit/hint resolve
        # them without touching the static pool
        st.setdefault("gen_served", {})      # cid -> generated-variant count
        st.setdefault("gen_pending", {})     # drill qid -> item dict
        # maths drill generator state (auto-persisted with the model):
        # the per-concept served-variant record {variant: True} so a
        # maths variant never repeats until the family's tier space is
        # exhausted (then selection cycles); drill_pending is owned by
        # the phy/chem consult and stores maths items too
        st.setdefault("drill_seen", {})      # cid -> {variant: True}
        return st

    def _mastery(self, st: dict, cid: str) -> float:
        return st["mastery"].get(cid, MASTERY_START)

    def _apply(self, st: dict, cid: str, correct: bool) -> float:
        """The mastery update.  Delegates to the diagnosis module's BKT
        update (Bayes-rule posterior + AFM-adapted learning transition),
        the SAME textbook-correct model the practice path uses --
        per-student, per-concept: each (student, concept) pair carries
        its own p_transit/success/failure state in st["bkt"].

        The historical bounded EMA is kept as a documented fallback and
        runs only when the tracer module is unavailable (or a future
        tracer revision raises): correct answers push toward 1, wrong
        answers fall faster than correct ones rise."""
        m = self._mastery(st, cid)
        if _Tracer is not None:
            params = st.setdefault("bkt", {}).setdefault(cid, {
                "p_transit": _AFMModel.initial_p_transit(),
                "successes": 0, "failures": 0})
            successes = int(params.get("successes", 0)) + (1 if correct
                                                           else 0)
            failures = int(params.get("failures", 0)) + (0 if correct
                                                         else 1)
            try:
                m, p_transit = _Tracer.bkt_update_offline(
                    p_known=m,
                    p_transit=float(params.get("p_transit")
                                    or _AFMModel.initial_p_transit()),
                    is_correct=correct,
                    success_count=successes,
                    failure_count=failures,
                    p_slip=_BKTModel.DEFAULT_P_SLIP,
                    p_guess=_BKTModel.DEFAULT_P_GUESS)
                params["p_transit"] = p_transit
                params["successes"] = successes
                params["failures"] = failures
                st["mastery"][cid] = m
                return m
            except Exception:
                pass                  # fall through to the EMA fallback
        if correct:
            m = m + MASTERY_CORRECT_GAIN * (1.0 - m)
        else:
            m = m - MASTERY_WRONG_DROP * m
        m = max(0.0, min(1.0, m))
        st["mastery"][cid] = m
        return m

    # ---------------- prerequisite retreat ---------------- #
    def _graph_prereq_map(self) -> Dict[str, str]:
        """The SQLite knowledge-graph edges, loaded once (lazily)."""
        if self._graph_prereqs is None:
            self._graph_prereqs = load_graph_prerequisites()
        return self._graph_prereqs

    def _prerequisite_for(self, cid: str) -> Optional[str]:
        """The concept to retreat to when `cid` keeps failing.

        Order: explicit overrides (tests/ops) -> SQLite knowledge-graph
        REQUIRES edge (enh:* concepts are keyed by their node id) ->
        same-subject earlier-chapter concept (curriculum order)."""
        target = self.prereq_overrides.get(cid)
        if target is not None:
            return target if target in self.concepts else None
        graph = self._graph_prereq_map()
        node = _resolve_node_id(cid)
        pre = graph.get(node) or graph.get(cid)
        if pre:
            pre_cid = _resolve_concept_id(pre, self)
            if pre_cid is not None and pre_cid != cid:
                return pre_cid
        cur = self.concepts[cid]
        best: Optional[_Concept] = None
        for other in self.concepts.values():
            if (other.concept_id == cid
                    or other.order_key[1] != cur.order_key[1]):
                continue
            if other.order_key < cur.order_key and (
                    best is None or other.order_key > best.order_key):
                best = other
        return best.concept_id if best is not None else None

    def _on_wrong(self, st: dict, cid: str) -> None:
        """Bookkeeping for a graded wrong answer: the difficulty ladder
        drops to the concept's easier tier, and RETREAT_WRONGS wrongs
        in a row arm the prerequisite retreat (served next)."""
        streak = st["wrong_streak"].get(cid, 0) + 1
        st["wrong_streak"][cid] = streak
        st["correct_streak"][cid] = 0
        st["tier_pref"][cid] = "easy"
        if streak >= RETREAT_WRONGS and not st.get("retreat_to"):
            pre = self._prerequisite_for(cid)
            if pre and pre != cid:
                st["retreat_to"] = pre
                st["retreat_from"] = cid

    def _on_correct(self, st: dict, cid: str) -> None:
        """Bookkeeping for a graded correct answer: TIER_RECOVER_CORRECTS
        straight corrects climb the ladder back to grade level, and a
        correct on the retreated-from concept disarms the retreat."""
        st["wrong_streak"][cid] = 0
        streak = st["correct_streak"].get(cid, 0) + 1
        st["correct_streak"][cid] = streak
        if streak >= TIER_RECOVER_CORRECTS:
            st["tier_pref"][cid] = "grade"
        if st.get("retreat_from") == cid:
            st["retreat_to"] = None
            st["retreat_from"] = None

    # ---------------- selection policy ---------------- #
    def _pick_concept(self, st: dict,
                      subject: Optional[str],
                      class_level: Optional[int] = None) -> Optional[_Concept]:
        def in_scope(c: _Concept) -> bool:
            """Subject AND class gate: a class-10 student is never
            served another class's concepts (order_key[0])."""
            if subject is not None and c.order_key[1] != subject:
                return False
            if class_level is not None and c.order_key[0] != class_level:
                return False
            return True

        # 1. mistake-book review (spaced: due after REVIEW_GAP serves)
        for entry in st["mistakes"]:
            if entry["gap_serves"] >= REVIEW_GAP:
                c = self.concepts.get(entry["concept_id"])
                if c and in_scope(c):
                    return c
        # 2. weakest in-progress concept
        weak: List[Tuple[float, _Concept]] = []
        for cid, m in st["mastery"].items():
            c = self.concepts.get(cid)
            if c and in_scope(c) and m < MASTERY_WEAK:
                weak.append((m, c))
        if weak:
            weak.sort(key=lambda t: (t[0], t[1].order_key))
            return weak[0][1]
        # 3. next new concept in curriculum order
        for c in self.concepts.values():
            if in_scope(c) and c.concept_id not in st["attempts"]:
                return c
        # 4. revision of the lowest-mastery concept
        rev = [(self._mastery(st, cid), self.concepts[cid])
               for cid in st["mastery"] if cid in self.concepts
               and in_scope(self.concepts[cid])]
        if rev:
            rev.sort(key=lambda t: (t[0], t[1].order_key))
            return rev[0][1]
        return None

    def _pick_item(self, st: dict, c: _Concept,
                   tier: Optional[str] = None,
                   request_self_check: bool = False) -> Tuple[dict, int]:
        """Pick a pool item (and its index).  Without a tier preference
        this is the plain round-robin; with one (easy after a wrong,
        grade after two corrects) it round-robins inside that tier's
        slice, falling back to the plain rotation when the tier has no
        items in this pool.

        GRADED-FIRST: while a concept has produced NO attempt at all
        (mastery still at the untouched start prior), a rotation that
        lands on a self_check item is diverted to the verified-answer
        (self_check=False) slice -- a brand-new concept is probed with
        graded worked examples, never self_check diagnostics.
        self_check serves once the concept is in play (where the
        micro-win overlay takes over for struggling students), once
        the graded slice is exhausted (no graded items in the pool),
        or when the student explicitly asks for one."""
        n = len(c.pool)
        served = st["served"].get(c.concept_id, 0)
        idx = served % n
        # never serve the same pool item twice in a row for a concept
        # (the audit's RETREAT_BROKEN family: round-robin re-landing on
        # the identical item after repeated failure)
        last_qid = (st.get("last_qid") or {}).get(c.concept_id)
        if (n > 1 and last_qid
                and str(c.pool[idx].get("q")) == str(last_qid)):
            idx = (idx + 1) % n
        if tier:
            subset = [i for i, it in enumerate(c.pool)
                      if it.get("tier") == tier]
            if subset:
                idx = subset[served % len(subset)]
                if (n > 1 and last_qid
                        and str(c.pool[idx].get("q")) == str(last_qid)):
                    idx = subset[(served + 1) % len(subset)]
        item = c.pool[idx]
        mastery = self._mastery(st, c.concept_id)
        if request_self_check:
            checks = [i for i, it in enumerate(c.pool)
                      if it.get("self_check")]
            if checks:
                idx = checks[served % len(checks)]
                if (len(checks) > 1 and last_qid
                        and str(c.pool[idx].get("q")) == str(last_qid)):
                    idx = checks[(served + 1) % len(checks)]
                item = c.pool[idx]
        elif (item.get("self_check")
                and c.concept_id not in st["attempts"]
                and mastery <= MASTERY_START):
            graded = [i for i, it in enumerate(c.pool)
                      if not it.get("self_check")]
            if graded:
                idx = graded[served % len(graded)]
                item = c.pool[idx]
        return item, idx

    # ---------------- infinite numerical drills ---------------- #
    def _consult_drill(self, st: dict, c: _Concept, student_id: str,
                       serve_count: int) -> Optional[dict]:
        """One fresh drill item when the pool rotation would repeat.

        MATHS concepts consult the maths drill generator
        (backend/its/solver/maths_drill_gen.py): template families
        (equations, percentages, quadratics, AP, ...) whose answers are
        computed exactly, with per-(student, concept) served-variant
        tracking in st["drill_seen"] so a variant never repeats until
        the family's tier space is exhausted.  Physics/chemistry
        numericals consult backend/its/solver/numericals_drill_gen.py.

        Deterministic: the variant is a pure function of (student_id,
        concept_id, serve_count) -- no runtime randomness.  Fail-open by
        contract: a missing module, a concept that matches no family,
        or any generation error returns None and the plain pool rotation
        serves instead.  The generated item mirrors the pool-item shape
        ({"q", "a", "tier", ...}) so the grade path needs no changes."""
        if c.order_key[1] == "maths":
            try:
                from backend.its.solver import maths_drill_gen as _mg
                seen = st.setdefault("drill_seen", {}).setdefault(
                    c.concept_id, {})
                variant = _mg.consult(
                    c.concept_id, c.title, student_id, serve_count,
                    c.order_key[0],
                    tier_pref=st["tier_pref"].get(c.concept_id),
                    seen=seen,
                    last_q=(st.get("last_qid") or {}).get(c.concept_id))
            except Exception:
                variant = None
            if isinstance(variant, dict) and str(
                    variant.get("q") or "").strip() and str(
                    variant.get("a") or "").strip():
                return variant
            return None
        try:
            from backend.its.solver import \
                numericals_drill_gen as _drill_gen
            variant = _drill_gen.consult(
                c.concept_id, c.title, c.formula, student_id, serve_count,
                tier_pref=st["tier_pref"].get(c.concept_id))
        except Exception:
            return None
        if not isinstance(variant, dict):
            return None
        if not str(variant.get("q") or "").strip():
            return None
        if not str(variant.get("a") or "").strip():
            return None
        return variant

    # ---------------- the loop ---------------- #
    def serve(self, student_id: str,
              subject: Optional[str] = None,
              class_level: Optional[int] = None,
              request_self_check: bool = False) -> Optional[dict]:
        """Serve the next question.  The expected answer is withheld;
        hint(level) reveals structure on demand.

        class_level gates every pick to that class's concepts (a class-10
        student is never served class-6 content); request_self_check
        explicitly opts into a self_check item, bypassing graded-first.

        Struggling-student overlays, highest priority first:
          - prerequisite retreat: a serve armed by two straight wrongs
            serves the prerequisite concept instead, carrying
            "retreated_from" and the "pehle wahi concept - 2 minute"
            voice line;
          - difficulty ladder: the tier preference set by the last
            graded answer (easy after a wrong, grade after two
            corrects); every payload carries the item's "tier";
          - micro-win: at mastery < MICRO_WIN_MASTERY a self_check
            serve item becomes a tiny graded one-step check
            ("micro_win": true)."""
        st = self._student(student_id)
        retreated_from: Optional[str] = None
        c: Optional[_Concept] = None
        target = st.get("retreat_to")
        if target:
            from_cid = st.get("retreat_from")
            st["retreat_to"] = None
            st["retreat_from"] = None
            tc = self.concepts.get(str(target))
            if tc is not None and (subject is None
                                   or tc.order_key[1] == subject) \
                    and (class_level is None
                         or tc.order_key[0] == class_level):
                c = tc
                retreated_from = from_cid
        if c is None:
            c = self._pick_concept(st, subject, class_level)
        if c is None:
            return None
        # age the mistake book: every serve counts toward review
        for entry in st["mistakes"]:
            entry["gap_serves"] += 1
        served_count = st["served"].get(c.concept_id, 0)
        # infinite numerical drills: once the static pool is exhausted
        # (serve count >= POOL_CAP, the rotation starts repeating), a
        # matching physics/chemistry concept gets a fresh deterministic
        # numerical instead of a repeat.  Fail-open: no match or any
        # generation problem falls through to the pool rotation.
        drill: Optional[dict] = None
        if served_count >= POOL_CAP and not request_self_check:
            drill = self._consult_drill(st, c, student_id, served_count)
        if drill is not None:
            item = drill
            st["served"][c.concept_id] = served_count + 1
            gcount = st.setdefault("gen_served", {}).get(
                c.concept_id, 0) + 1
            st["gen_served"][c.concept_id] = gcount
            qid = f"{c.concept_id}::drill{gcount}"
            pending = st.setdefault("gen_pending", {})
            pending[qid] = item
            while len(pending) > 64:     # a serve that is never graded
                pending.pop(next(iter(pending)))   # must not leak memory
        else:
            item, idx = self._pick_item(
                st, c, st["tier_pref"].get(c.concept_id),
                request_self_check=request_self_check)
            st["served"][c.concept_id] = served_count + 1
            # question ids carry the pool index (+1), matching submit/hint
            qid = f"{c.concept_id}::{idx + 1}"
        st.setdefault("last_qid", {})[c.concept_id] = str(item["q"])
        st["last_serve"] = c.concept_id
        out = {
            "question_id": qid,
            "concept_id": c.concept_id,
            "concept_title": c.title,
            "question": item["q"],
            "hints_available": 3,
            "tier": item.get("tier", "grade"),
            "micro_win": False,
        }
        if drill is not None:
            out["drill"] = True
            if item.get("family"):
                out["family"] = item["family"]
        if retreated_from:
            out["retreated_from"] = retreated_from
            out["retreat_voice"] = RETREAT_VOICE
        if (item.get("self_check")
                and self._mastery(st, c.concept_id) < MICRO_WIN_MASTERY):
            mc = micro_check(item["a"])
            if mc is not None:
                st["micro_pending"][qid] = {
                    "answer": mc[1], "concept_id": c.concept_id}
                out["question"] = mc[0]
                out["micro_win"] = True
        mcq = item.get("mcq")
        if mcq:
            # verbal science item served as a multiple choice: the
            # options go out, the correct index never does
            out["options"] = [str(o) for o in mcq.get("options") or []]
            out["answer_mode"] = "mcq"
        st["last_serve_ts"] = time.monotonic()
        self._persist(student_id)
        return out

    def submit(self, student_id: str, question_id: str,
               student_answer: str) -> dict:
        """Grade a served question, update mastery, maintain the
        mistake book, and return the outcome with the worked steps."""
        st = self._student(student_id)
        cid = re.split(r"::|#", str(question_id))[0]
        c = self.concepts.get(cid)
        if c is None:
            return {"error": "unknown question_id"}
        # generated drill items resolve through gen_pending (their ids
        # carry a drill counter, not a pool index); "a" stays the PURE
        # answer string (it feeds grade_numeric, the mistake book and
        # the review hook), while the worked solution shows the steps
        drill_item = st.setdefault("gen_pending", {}).get(str(question_id))
        if drill_item is not None:
            item = drill_item
            _steps = [str(s).strip() for s in (item.get("steps") or [])
                      if str(s).strip()]
            worked_text = (" ".join(_steps) + " Answer: " + str(item["a"])
                           if _steps else str(item["a"]))
        else:
            n = len(c.pool)
            try:
                idx = (int(re.split(r"::|#", str(question_id))[1]) - 1) \
                    % max(n, 1)
            except (ValueError, IndexError):
                idx = 0
            item = c.pool[idx]
            worked_text = item["a"]
        micro = st["micro_pending"].pop(str(question_id), None)
        if _DONT_KNOW_RE.search(str(student_answer or "")):
            st["attempts"][cid] = st["attempts"].get(cid, 0)
            st["mastery"].setdefault(cid, MASTERY_START)
            _record_attempt(st, False)
            return {
                "outcome": "lets_learn",
                "mastery": round(self._mastery(st, cid), 3),
                "attempts": st["attempts"].get(cid, 0),
                "worked_solution": worked_text,
                "note": "no worries - study the steps, then try the "
                        "next one",
                "next_hint_level": 0,
            }
        if micro is not None:
            # micro-win check: the tiny graded one-step question this
            # serve was converted into.  Graded, but never punitive --
            # a miss costs no mastery, it just shows the steps.
            st["attempts"][cid] = st["attempts"].get(cid, 0) + 1
            verdict = grade_numeric(student_answer, micro["answer"])
            if verdict is True:
                m = self._mastery(st, cid)
                m = max(0.0, min(1.0, m + MICRO_WIN_GAIN * (1.0 - m)))
                st["mastery"][cid] = m
                outcome = "micro_win"
                note = "small win - that is the method warming up"
            else:
                m = self._mastery(st, cid)
                outcome = "micro_win_miss"
                note = "no marks lost - the full steps are below"
            _record_attempt(st, verdict is True)
            return {
                "outcome": outcome,
                "mastery": round(m, 3),
                "attempts": st["attempts"][cid],
                "worked_solution": item["a"],
                "expected": micro["answer"],
                "micro_win": True,
                "note": note,
                "next_hint_level": 0,
            }
        if item.get("self_check"):
            # template-backed item: reveal the authored steps, never
            # machine-grade (no verified answer to compare against).
            # An ungradeable miss still counts toward the struggle
            # streak (soft wrong) so help escalates instead of the
            # same diagnostic re-serving forever (audit finding c) --
            # but it never costs mastery.
            st["attempts"][cid] = st["attempts"].get(cid, 0) + 1
            st["mastery"].setdefault(cid, MASTERY_START)
            self._on_wrong(st, cid)
            _record_attempt(st, False)
            return {
                "outcome": "self_check",
                "mastery": round(self._mastery(st, cid), 3),
                "attempts": st["attempts"][cid],
                "worked_solution": item["a"],
                "note": "compare your work with the steps above",
                "next_hint_level": 0,
            }
        mcq = item.get("mcq")
        if mcq:
            # multiple-choice item: grade by picked option (index or
            # exact text) through the normal correct/wrong path -- the
            # authored answer IS the correct option, so a wrong pick is
            # a real wrong (BKT mastery, streaks, mistake book all
            # apply); never the self_check branch
            verdict = grade_mcq(student_answer, mcq, item["a"])
        else:
            verdict = grade_numeric(student_answer, item["a"])
        st["attempts"][cid] = st["attempts"].get(cid, 0) + 1
        revealed = st.get("revealed", {}).pop(str(question_id), False)
        if verdict is None:
            outcome = "ungraded"
            # seed the mastery entry so the selection policy keeps this
            # concept in scope (attempts was incremented above; without
            # a mastery key the concept would vanish from the picker)
            st["mastery"].setdefault(cid, MASTERY_START)
            m = self._mastery(st, cid)
        elif revealed:
            # the student saw the worked solution (hint level 3): a
            # correct-by-copy earns no mastery, no streak, and the
            # mistake book stays honest
            outcome = "correct_revealed"
            st["mastery"].setdefault(cid, MASTERY_START)
            m = self._mastery(st, cid)
        else:
            outcome = "correct" if verdict else "wrong"
            m = self._apply(st, cid, verdict)
        if verdict is False and not revealed:
            entry = {
                "concept_id": cid, "q": item["q"], "expected": item["a"],
                "got": student_answer, "gap_serves": 0}
            st["mistakes"].append(entry)
            # spiral-review feed: the SM-2 queue schedules a spaced
            # review for this mistake (REVIEW_GAP logic lives there);
            # best-effort, grading never blocks on the scheduler
            if self.review_hook is not None:
                try:
                    self.review_hook(student_id, cid, item["q"],
                                     item["a"])
                except Exception:
                    pass
        elif verdict is True and not revealed:
            st["mistakes"] = [e for e in st["mistakes"]
                              if e["concept_id"] != cid]
        if verdict is True and not revealed:
            self._on_correct(st, cid)
        elif verdict is False and not revealed:
            self._on_wrong(st, cid)
        out = {
            "outcome": outcome,
            "mastery": round(m, 3),
            "attempts": st["attempts"][cid],
            "worked_solution": worked_text,
            "expected": item["a"],
            "next_hint_level": 0,
        }
        if revealed:
            out["revealed"] = True
            out["note"] = ("you saw the worked solution, so this one "
                           "doesn't count - try a fresh question")
        if st.get("retreat_to"):
            # armed by this wrong answer: the next serve retreats here
            out["retreat_to"] = st["retreat_to"]
        _record_attempt(st, verdict is True)
        self._persist(student_id)
        return out

    def hint(self, student_id: str, question_id: str,
             level: int) -> Optional[dict]:
        """The hint ladder: 1 concept + formula, 2 method outline,
        3 full worked solution."""
        st = self._student(student_id)
        cid = re.split(r"::|#", str(question_id))[0]
        c = self.concepts.get(cid)
        if c is None:
            return None
        gen_item = st.setdefault("gen_pending", {}).get(str(question_id))
        if gen_item is not None:
            return self._hint_drill(gen_item, c, level, str(question_id),
                                    st)
        if level <= 1:
            text = f"Concept: {c.title}."
            if c.formula and c.formula != "-":
                text += f" Relation: {c.formula}"
            return {"level": 1, "hint": text}
        n = len(c.pool)
        try:
            idx = (int(re.split(r"::|#", str(question_id))[1]) - 1) % max(n, 1)
        except (ValueError, IndexError):
            idx = 0
        item = c.pool[idx]
        if level == 2:
            # method outline WITHOUT the answer value: a sentence that is
            # just a number/fraction IS the answer and is never hint
            # material (the L2 leak found by the synthetic-student audit)
            kept = []
            for s in re.split(r"(?<=[.!?])\s+", str(item["a"]).strip()):
                core = re.sub(r"[^0-9a-zA-Z\s./-]", " ", s).strip()
                if core and re.fullmatch(r"-?\d[\d\s.,/=-]*\s*[a-zA-Z%°]*", core):
                    continue
                kept.append(s.strip())
            parts = [s for s in kept if s][:2]
            if not parts:
                parts = [f"Use the relation for {c.title}" +
                         (f" ({c.formula})" if c.formula and c.formula != "-" else "") +
                         " - set it up from the question's values, then "
                         "solve it step by step."]
            return {"level": 2, "hint": " ".join(parts)}
        # level 3: the full worked solution - legitimate teaching, but
        # flagged honestly: a question revealed this way no longer earns
        # mastery credit (copy-paste must pay nothing).  Prefer the
        # item's authored steps; bare 'a' alone is just answer-leak.
        st.setdefault("revealed", {})[str(question_id)] = True
        steps = [str(s).strip() for s in (item.get("steps") or [])
                 if str(s).strip()]
        worked = (" ".join(steps) + " Answer: " + str(item["a"])
                  if steps else str(item["a"]))
        return {"level": 3, "hint": worked, "revealed": True,
                "note": "worked solution shown - this question won't "
                        "count toward mastery now"}

    def _hint_drill(self, gen_item: dict, c: _Concept, level: int,
                    question_id: str, st: dict) -> dict:
        """Hint ladder for a generated numerical.  L2 shows the formula
        identity and method ONLY (the worked steps carry intermediate
        numbers, so they stay behind until L3, keeping the ladder
        leak-free); L3 reveals the steps and flags it like the pool
        ladder does."""
        formula = str(gen_item.get("formula") or "").strip()
        if not formula or formula == "-":
            formula = c.formula if c.formula and c.formula != "-" else ""
        if level <= 1:
            text = f"Concept: {c.title}."
            if formula:
                text += f" Relation: {formula}"
            return {"level": 1, "hint": text}
        if level == 2:
            hint = (f"Use the relation {formula}" if formula
                    else f"Use the relation for {c.title}")
            hint += (" - identify the given quantities, substitute them "
                     "and solve step by step.")
            return {"level": 2, "hint": hint}
        # level 3 reveal, same honesty flag as the pool ladder
        steps = [str(s).strip() for s in (gen_item.get("steps") or [])
                 if str(s).strip()]
        worked = (" ".join(steps) + " Answer: " + str(gen_item["a"])
                  if steps else str(gen_item["a"]))
        st.setdefault("revealed", {})[str(question_id)] = True
        return {"level": 3, "hint": worked, "revealed": True,
                "note": "worked solution shown - this question won't "
                        "count toward mastery now"}

    def progress(self, student_id: str,
                 subject: Optional[str] = None) -> dict:
        st = self._student(student_id)
        per_subject: Dict[str, dict] = {}
        for cid, m in st["mastery"].items():
            c = self.concepts.get(cid)
            if c is None:
                continue
            if subject and c.order_key[1] != subject:
                continue
            s = per_subject.setdefault(c.order_key[1], {
                "concepts": 0, "mastery_sum": 0.0, "mastered": 0})
            s["concepts"] += 1
            s["mastery_sum"] += m
            if m >= MASTERY_PASS:
                s["mastered"] += 1
        for s in per_subject.values():
            s["avg_mastery"] = round(s.pop("mastery_sum")
                                     / max(1, s["concepts"]), 3)
        return {
            "per_subject": per_subject,
            "open_mistakes": len(st["mistakes"]),
            "total_attempts": sum(st["attempts"].values()),
        }

    # ---------------- persistence ---------------- #
    def _persist(self, student_id: Optional[str] = None) -> None:
        """Upsert the changed student's state through the configured store.

        DbTutorStore: one row per student — concurrent workers can't
        clobber each other.  FileTutorStore: whole-dict atomic rewrite
        (legacy/test path).  Best-effort: a failed write never blocks
        the teaching loop."""
        if self.store is None:
            return
        try:
            if student_id is not None and hasattr(self.store, "upsert"):
                self.store.upsert(student_id, self.students[student_id])
            elif hasattr(self.store, "upsert_all"):
                self.store.upsert_all(self.students)
        except Exception:
            pass

    def save(self, path: str) -> None:
        d = os.path.dirname(path)
        if d and not os.path.isdir(d):
            os.makedirs(d, exist_ok=True)
        with open(path, "w", encoding="utf-8") as fh:
            json.dump(self.students, fh)

    def load(self, path: str) -> None:
        if os.path.exists(path):
            try:
                with open(path, encoding="utf-8") as fh:
                    data = json.load(fh)
                if isinstance(data, dict):
                    self.students = data
            except (OSError, ValueError):
                pass          # a corrupt store must never block startup


# --------------------------------------------------------------------- #
# humanities/commerce/language verbal MCQs: the pre-generated store
# --------------------------------------------------------------------- #
# Verbal items outside MCQ_SUBJECTS take their MCQs from
# backend/its/solver/mcq_distractors.py's generated store
# (backend/its/questions/generated/mcq_humanities.json) instead of
# per-boot synthesis: pool-load does a hash lookup keyed by the question
# text (mcq_distractors.mcq_key).  Entries carry the same
# {"options", "correct_index"} shape build_mcq produces, so the serve
# options branch and grade_mcq need no further changes.  A number-free
# item with no store entry (purity-rejected) stays an honest self_check.
# home_science is humanities-elective; english_grammar/hindi_grammar
# one-word fills get embedded-option / same-category sibling-pool MCQs.
_MCQ_STORE_SUBJECTS = frozenset({
    "social", "social_science", "political_science", "political_theory",
    "economics", "business_studies", "history", "geography",
    "sociology", "psychology", "home_science",
    "english_grammar", "hindi_grammar"})
_MCQ_STORE_CACHE: Optional[tuple] = None


def _mcq_store_lookup(question: str) -> Optional[dict]:
    """The generated humanities MCQ entry for this pool question, or
    None.  Best-effort: a missing or corrupt store degrades to
    self_check serves and never blocks startup."""
    global _MCQ_STORE_CACHE
    if _MCQ_STORE_CACHE is None:
        try:
            from backend.its.solver import \
                mcq_distractors as _mcq_distractors
            _MCQ_STORE_CACHE = (
                _mcq_distractors, _mcq_distractors.load_store())
        except Exception:
            _MCQ_STORE_CACHE = (None, {})
    mod, store = _MCQ_STORE_CACHE
    if mod is None:
        return None
    try:
        entry = mod.lookup(question, store)
    except Exception:
        return None
    if entry is None:
        return None
    # serve/submit consume options + correct_index only
    return {"options": [str(o) for o in entry.get("options") or []],
            "correct_index": entry.get("correct_index"),
            "source": "mcq_humanities"}
