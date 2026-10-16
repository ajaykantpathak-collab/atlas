"""marking_scheme_grader.py — Wave 9.8 L4: grade prose answers against the
board's own marking data.

Prose subjects (SST / English / Hindi / psychology / economics …) cannot be
*computed* — but they CAN be marked the way a CBSE examiner marks: does the
student's answer cover each marking point?  This module is that examiner.

Deterministic, no LLM anywhere on the path:

    marking points  (board_questions.marking_scheme — "Step N: <point>"
                     lines; else node marking_points items; else the
                     numbered Working: items inside model_answer)
      -> key tokens: normalized, stopword-stripped, lightly stemmed,
         synonym-canonicalised (same normalisation family as
         bank_answer.normalize — letters/digits/combining marks kept,
         Devanagari included)
      -> a point is HIT when the student's answer covers enough of its
         key tokens (coverage floor, small points must match fully)
      -> earned = hits scaled to `marks` (against `min_points` when the
         rubric authors one, else the full point count)
      -> feedback quotes the strongest missed point VERBATIM — the board's
         words, never an invented rewrite

Fail-closed: with no marking data the result is verdict="unknown" and
earned=None — honest, never a fabricated score.

Also exposes ``resolve_marking`` (node marking_points / node competency
steps / exact-norm bank row) and ``has_marking_data`` — the cheap exact-
norm existence probe the refusal path uses to set ``gradable:true``.
"""

from __future__ import annotations

import logging
import os
import re
from typing import Any, Dict, List, Optional, Tuple

log = logging.getLogger(__name__)

# --------------------------------------------------------------------------- #
# Tokenisation / normalisation                                                #
# --------------------------------------------------------------------------- #

# Latin tokens AND Devanagari runs (matras live inside \u0900-\u097F and are
# kept attached — same spirit as bank_answer._keep which preserves
# combining marks).
_TOKEN_RE = re.compile(r"[a-z0-9]+|[ऀ-ॿ]+")

_EN_STOP = frozenset("""
a an the and or but if then else of for to in on at by with from as is are
was were be been being am do does did doing have has had having will would
shall should can could may might must it its this that these those i you he
she we they them his her their our your my me us what which who whom whose
when where why how all any both each few more most other some such no nor
not only own same so than too very just about into over under again further
once here there s t d ll m o re ve y don didn isn wasn aren
explain describe state name list give write discuss define mention briefly
question answer following above below based according hence thus therefore
also however because since due while during after before between through
per via etc ie eg used using use uses make makes made get gets got take
takes took one two three four five first second third many much
""".split())

# Romanised-Hindi function words (Hinglish answers grade against English
# schemes too — these must not count as content).
_HI_ROMAN_STOP = frozenset("""
kya kyu kyun kaise aur ya to toh phir fir bhi hi nahi nahin nhi hai hain
tha thi the ho hoga hogi hota hoti hote hua hui hue karna karo karte kiya
mein se par ke ki ka ko ne is us ek do teen sab kuch ab yeh ye woh wo
iska uska isse usse apna apni apne mera meri mere tumhara inka unka inhe
unhe jaisa waisa aisa kyunki isliye lekin magar bahut thoda zyada bilkul
jab tab kab tak saath saamne andar bahar upar neeche aage peeche
""".split())

# Devanagari function words.
_HI_DEV_STOP = frozenset("""
की के को का में से पर और या तो फिर भी ही नहीं है हैं था थी थे हो होगा होगी
होता होती होते हुआ हुई हुए करना करो करते किया एक दो तीन सब कुछ अब यह वह इस
उस इसका उसका इसे उसे अपना अपनी अपने मेरा मेरी मेरे तुम्हारा जैसा वैसा ऐसा
क्योंकि इसलिए लेकिन मगर बहुत थोड़ा ज्यादा बिल्कुल जब तब कब तक साथ सामने
अंदर बाहर ऊपर नीचे आगे पीछे ये वो इन उन इन्हें उन्हें जो जिस उसकी इसकी
द्वारा लिए बाद पहले बीच दौरान अनुसार अर्थात क्या कैसे क्यों कहाँ कौन
""".split())

_STOPWORDS = _EN_STOP | _HI_ROMAN_STOP | _HI_DEV_STOP

# Synonym groups — common school-prose paraphrases.  Every member maps to
# the group's first element (canonical); a point token matches a student
# token when canonical forms agree.  Applied AFTER light stemming.
_SYNONYM_GROUPS: List[frozenset] = [
    frozenset(g.split()) for g in (
        "increase rise raise grow growth higher gain",
        "decrease decline fall reduce drop lower shrink less",
        "cause lead led result produce trigger create bring",
        "show demonstrate indicate reveal reflect express prove",
        "important significant major key crucial vital main",
        "people citizens public population crowd folk",
        "rule ruler king monarch emperor authority government regime",
        "law legal legislation code",
        "right rights liberty freedom independence",
        "trade commerce exchange market",
        "war conflict battle revolt revolution rebellion uprising fight",
        "religion religious faith sacred holy spiritual",
        "culture cultural tradition custom practice",
        "economy economic financial wealth money",
        "develop development progress modern",
        "power control dominance dominance authority",
        "begin began start commenced origin originate",
        "end ended collapse fell finished destroy destroyed",
        "new modern recent",
        "old ancient traditional early",
        "help support aid contribute contribute assist",
        "use utilise utilize adopt employ apply",
        "need require want necessary essential",
        "give gave provide supply",
        "land territory region area",
        "work labour labor job",
        "society social community",
        "political politics government",   # overlaps 'rule' group — first wins
        "idea concept thought principle belief",
        "change transform reform shift",
        "many several various numerous",
        "women woman female",
        "men man male",
        "write wrote written compose",
        "say said tell told describe describe",
        "life live living lifestyle",
        "large big great vast",
        "small little minor",
        "good better best advantage benefit",
        "bad worse harm damage problem",
        "equal equality same uniform",
        "different difference distinct separate",
        "part portion share section",
        "form kind type sort manner",
        "powerful strong strong dominant",
        "example instance case",
        "remember recall memory commemorate",
        "spread diffuse diffusion expand",
        "against oppose resist protest",
        "together united unity join",
        "class group category",
    )
]

_CANON: Dict[str, str] = {}
for _g in _SYNONYM_GROUPS:
    _c = sorted(_g)[0]
    for _w in _g:
        _CANON.setdefault(_w, _c)


def _stem(t: str) -> str:
    """Very light English stemming — applied to BOTH sides so point and
    attempt variants meet in the middle.  Devanagari/short tokens pass
    through unchanged."""
    if not t or not t.isascii() or len(t) <= 4:
        return t
    if t.endswith("ies") and len(t) > 5:
        return t[:-3] + "y"
    for suf in ("ing", "edly", "ed"):
        if t.endswith(suf) and len(t) - len(suf) >= 4:
            return t[: -len(suf)]
    if t.endswith("es") and len(t) > 5 and not t.endswith(("ses", "ses")):
        return t[:-2]
    if t.endswith("s") and len(t) > 4 and not t.endswith(("ss", "us", "is")):
        return t[:-1]
    return t


def _canon(t: str) -> str:
    return _CANON.get(t, t)


def _content_tokens(text: str) -> List[str]:
    """Stemmed, canonicalised content tokens (stopwords removed)."""
    out = []
    for raw in _TOKEN_RE.findall((text or "").lower()):
        st = _stem(raw)
        if raw in _STOPWORDS or st in _STOPWORDS:
            continue
        if len(raw) < 2:
            continue
        out.append(_canon(st))
    return out


def _content_set(text: str) -> set:
    return set(_content_tokens(text))


# --------------------------------------------------------------------------- #
# Marking-point extraction                                                    #
# --------------------------------------------------------------------------- #

# "Step 2 (Setup):", "- Step 3:", "चरण 1:", "Step 1." prefixes.
_STEP_PREFIX = re.compile(
    r"^\s*[-*•]?\s*(?:step|चरण|चरणं)\s*\d+\s*"
    r"(?:\(([^)]*)\))?\s*[:.\-–—]?\s*", re.I)

# numbered model-answer items: "1." / "1)" / "- 1." / "2 –"
_NUM_PREFIX = re.compile(r"^\s*[-*•]?\s*\d{1,2}\s*[.)\-–—]\s+")

# markdown bold / emphasis noise
_MD_RE = re.compile(r"[*_`]+")

#: phases that extend the answer ("what if…") rather than mark required
#: content — excluded from the denominator (a full answer need not
#: include a hypothetical generalisation).
_STRETCH_PHASES = ("generalize", "generalise", "extend", "stretch",
                   "transfer")


def _phase_of(prefix_match) -> str:
    try:
        return (prefix_match.group(1) or "").strip().lower()
    except Exception:
        return ""


def _clean_point(text: str) -> str:
    t = _MD_RE.sub("", text or "")
    return re.sub(r"\s+", " ", t).strip(" \t-–—:;.")


def points_from_marking_scheme(scheme: str) -> List[str]:
    """'Step N (Phase): content' / '- चरण N: content' lines -> points.

    The phase suffix decides grading weight: Generalize/Extend steps are
    stretch content and are dropped (they describe hypotheticals the
    marking scheme explores, not what the examiner requires).  Empty or
    non-step text returns [] — the caller falls back to model_answer."""
    if not scheme or not str(scheme).strip():
        return []
    pts: List[str] = []
    for line in re.split(r"\n+", str(scheme)):
        line = line.strip()
        if not line:
            continue
        m = _STEP_PREFIX.match(line)
        if not m:
            continue
        if _phase_of(m) in _STRETCH_PHASES:
            continue
        body = _clean_point(line[m.end():])
        # skip empty/meta steps (a bare "Verify" phase line with no claim)
        if len(body) >= 8:
            pts.append(body)
    # collapse near-duplicate points (degenerate schemes repeat the final
    # value line, e.g. "30 t CO₂e/yr" twice) — they are one marking point
    seen_keys = set()
    deduped = []
    for p in pts:
        ks = frozenset(_content_tokens(p))
        if ks and ks in seen_keys:
            continue
        seen_keys.add(ks)
        deduped.append(p)
    return deduped


_MODEL_LEAD_RE = re.compile(
    r"(?:^|\n)\s*\*{0,2}(?:correct\s+answer|answer|working|solution|"
    r"marking\s+scheme|model\s+answer|उत्तर|मॉडल\s+उत्तर)\s*\*{0,2}\s*[:：]?\s*",
    re.I)


def points_from_model_answer(model: str) -> List[str]:
    """model_answer -> marking points.

    Numbered '**Working:** 1. … 2. …' items are the richest decomposition;
    otherwise the body is split into sentences (a prose model answer's
    sentences ARE the marking points).  The '**Correct answer:**' header
    line itself counts as a point — the claim is markable."""
    if not model or not str(model).strip():
        return []
    text = _MD_RE.sub("", str(model))
    pts: List[str] = []
    # split on the known section headers, keeping order
    for block in _MODEL_LEAD_RE.split(text):
        block = block.strip()
        if not block:
            continue
        numbered = [l for l in re.split(r"\n+", block)
                    if _NUM_PREFIX.match(l)]
        if len(numbered) >= 2:
            for l in numbered:
                p = _clean_point(_NUM_PREFIX.sub("", l))
                if len(p) >= 8:
                    pts.append(p)
            # any unnumbered lead-in line is itself a claim point
            lead = [l for l in re.split(r"\n+", block)
                    if not _NUM_PREFIX.match(l) and len(l.strip()) >= 20]
            for l in lead[:1]:
                p = _clean_point(l)
                if len(p) >= 8:
                    pts.insert(0, p)
        else:
            for s in re.split(r"(?<=[.!?।])\s+|\n+", block):
                p = _clean_point(s)
                if len(p) >= 8:
                    pts.append(p)
    return pts


def _points_from_context(context: Optional[Dict[str, Any]]
                         ) -> Tuple[List[str], Optional[int], str]:
    """Resolve (points, min_points, source) from a grading context."""
    ctx = context if isinstance(context, dict) else {}
    src_override = ctx.get("source")  # resolver may name the true origin
    pts = ctx.get("marking_points") or ctx.get("points")
    if isinstance(pts, (list, tuple)):
        pts = [_clean_point(str(p)) for p in pts if str(p).strip()]
        pts = [p for p in pts if len(p) >= 8]
        if pts:
            return pts, ctx.get("min_points"), \
                src_override or "marking_points"
    for key, fn, src in (
            ("marking_scheme", points_from_marking_scheme, "marking_scheme"),
            ("model_answer", points_from_model_answer, "model_answer")):
        raw = ctx.get(key)
        if isinstance(raw, str) and raw.strip():
            pts = fn(raw)
            if pts:
                return pts, ctx.get("min_points"), src_override or src
    return [], ctx.get("min_points"), "none"


# --------------------------------------------------------------------------- #
# Coverage matching                                                           #
# --------------------------------------------------------------------------- #

#: a point is hit when >= this fraction of its key tokens are covered
_POINT_COVER = 0.5
#: …but a long point (>=6 keys) is also hit on >= this coverage when the
#: attempt matched >=3 of its keys (verbose steps over-count keys)
_POINT_COVER_LONG = 0.4


def _point_hit(point_keys: List[str], attempt: set,
               df: Optional[Dict[str, int]] = None,
               n_points: int = 1) -> Tuple[bool, float]:
    """(hit, coverage) for one marking point against the attempt's
    content-token set.

    `df` is the key's document frequency ACROSS this scheme's points:
    a token present in >= half the points is scheme glue ("the case",
    the chapter's keyword) — matching it says nothing about THIS point,
    so it is weighted to zero.  A point whose whole key set is glue
    falls back to unweighted keys (better a noisy point than none)."""
    keys = [k for k in point_keys if k]
    if not keys:
        return False, 0.0
    weights = []
    for k in keys:
        w = 1.0
        if df is not None and n_points > 2 \
                and df.get(k, 0) / n_points >= 0.5:
            w = 0.0
        weights.append(w)
    if not any(weights):
        weights = [1.0] * len(keys)
    matched = sum(w for k, w in zip(keys, weights) if k in attempt)
    total = sum(weights)
    cov = matched / total
    n_eff = sum(1 for w in weights if w > 0)
    if n_eff <= 2:
        return matched >= total - 1e-9, cov
    if n_eff <= 5:
        return cov >= _POINT_COVER and matched >= 2, cov
    return (cov >= _POINT_COVER) or (cov >= _POINT_COVER_LONG
                                   and matched >= 3), cov


# --------------------------------------------------------------------------- #
# The grader                                                                  #
# --------------------------------------------------------------------------- #

def grade(question_text: str, student_answer: str, *,
          marks: Optional[float], context: Optional[Dict[str, Any]] = None
          ) -> Dict[str, Any]:
    """Grade a prose answer against resolved marking data.

    Returns {earned, of, hit_points, missed_points, feedback, verdict}.
    verdict == "unknown" (fail-closed) when no marking data is available;
    "graded" otherwise.  Never raises.
    """
    of = marks
    try:
        points, min_points, source = _points_from_context(context)
        if of is None and isinstance(context, dict):
            m = context.get("marks")
            if isinstance(m, (int, float)) and m > 0:
                of = m
        if of is None:
            of = max(1, len(points)) if points else 0
        if not points:
            return {"earned": None, "of": of, "hit_points": [],
                    "missed_points": [],
                    "feedback": ("No marking data is available for this "
                                 "question, so it can't be graded against "
                                 "the board's scheme."),
                    "verdict": "unknown", "source": "none"}

        attempt = set(_content_tokens(student_answer or ""))
        # document frequency of each key across THIS scheme's points —
        # scheme glue tokens (in >= half the points) can't witness a hit
        point_keys = [_content_tokens(p) for p in points]
        df: Dict[str, int] = {}
        for pk in point_keys:
            for k in set(pk):
                df[k] = df.get(k, 0) + 1
        hits, misses, miss_cov = [], [], []
        for p, pk in zip(points, point_keys):
            hit, cov = _point_hit(pk, attempt, df, len(points))
            if hit:
                hits.append(p)
            else:
                misses.append(p)
                miss_cov.append((cov, p))

        # earned = hit points scaled to marks.  When the rubric authors a
        # min_points bar (the "full credit" point count), scale to THAT —
        # a student who hits min_points of a longer scheme earns full marks.
        denom = len(points)
        if isinstance(min_points, int) and 0 < min_points <= len(points):
            denom = min_points
        earned = int(round(len(hits) * float(of) / max(1, denom)))
        earned = max(0, min(int(round(float(of))), earned))

        if not misses:
            feedback = ("Full marks — every marking point is covered.")
        else:
            # strongest miss = the most substantive unhit point (most key
            # tokens), earliest in scheme order on ties — quoted verbatim.
            def _rank(item):
                cov, p = item
                return (-len(_content_tokens(p)),
                        points.index(p))
            strongest = min(miss_cov, key=_rank)[1]
            quoted = strongest if len(strongest) <= 140 else \
                strongest[:140].rsplit(" ", 1)[0] + "…"
            feedback = (f"You'd gain a mark by mentioning '{quoted}'.")
        return {"earned": earned, "of": of, "hit_points": hits,
                "missed_points": misses, "feedback": feedback,
                "verdict": "graded", "source": source}
    except Exception as exc:  # noqa: BLE001 -- fail closed, never 500
        log.debug("prose grade degraded: %s", type(exc).__name__)
        return {"earned": None, "of": of, "hit_points": [],
                "missed_points": [],
                "feedback": "We couldn't grade this one right now.",
                "verdict": "unknown", "source": "error"}


# --------------------------------------------------------------------------- #
# model_at_marks — 1/3/5-mark compressions of a bank model_answer             #
# --------------------------------------------------------------------------- #

_SENT_SPLIT = re.compile(r"(?<=[.!?।])\s+|\n+")


def _model_sentences(model_answer: str) -> List[str]:
    """Sentences of a model answer, headers and list markers stripped —
    the raw material for the marks compressions.  Never fabricates: every
    returned string is a substring of the source."""
    text = _MD_RE.sub("", str(model_answer or ""))
    sents = []
    for chunk in _MODEL_LEAD_RE.split(text):
        for s in _SENT_SPLIT.split(chunk):
            p = _clean_point(s)
            if len(p) >= 8:
                sents.append(p)
    return sents


def model_at_marks(model_answer: str,
                   points: Optional[List[str]] = None,
                   marks: Optional[float] = None) -> List[Dict[str, Any]]:
    """[{marks, text}] at 1/3/5-mark lengths, compressed by marking-point
    coverage: the k-mark variant is the smallest set of model sentences
    covering the first k marking points (the single highest-weight point
    sentence for 1-mark; the full answer for >= points).  Emitted only for
    levels <= `marks` (or all three when marks is unknown)."""
    sents = _model_sentences(model_answer)
    if not sents:
        return []
    pts = list(points or [])
    cap = int(marks) if isinstance(marks, (int, float)) and marks else 5
    levels = [l for l in (1, 3, 5) if l <= max(cap, 1)]
    if not levels:
        levels = [1]

    # sentence -> covered point indices (a sentence wins a point when it
    # covers >= half the point's keys)
    pt_keys = [_content_set(p) for p in pts]
    sent_pts: List[set] = []
    for s in sents:
        st = _content_set(s)
        sent_pts.append({i for i, k in enumerate(pt_keys)
                         if k and len(st & k) / len(k) >= 0.5})
    out = []
    for level in levels:
        if not pts:
            take = sents[:level]
        else:
            want = set(range(min(level, len(pts))))
            chosen = set()
            covered = set()
            # greedy by scheme order: for each wanted point pick the FIRST
            # sentence covering it (stable, auditable)
            for pi in sorted(want):
                for si, sp in enumerate(sent_pts):
                    if pi in sp and si not in chosen:
                        chosen.add(si)
                        covered.add(pi)
                        break
            if not covered:
                # no sentence maps to the points — fall back to the
                # longest sentence (highest-weight content)
                chosen = {max(range(len(sents)),
                              key=lambda i: len(sents[i]))}
            take = [s for i, s in enumerate(sents) if i in chosen]
        # dedupe while preserving order
        seen, seq = set(), []
        for s in take:
            if s not in seen:
                seen.add(s)
                seq.append(s)
        text = ". ".join(seq)
        if seq and not text.endswith((".", "!", "?", "।")):
            text += "."
        out.append({"marks": level, "text": text})
    return out


# --------------------------------------------------------------------------- #
# Marking-data resolution (router + gradable flag)                            #
# --------------------------------------------------------------------------- #

_RESOLVE_BUDGET_S = float(os.environ.get("PROSE_RESOLVE_BUDGET_S", "0.8"))

_EXACT_MARKING_SQL = """
SELECT id, subject, class_level, question_type, board, year,
       correct_answer, model_answer, marking_scheme, marks,
       question_text
FROM board_questions
WHERE norm_text = :nk
  AND board <> 'QUARANTINED'
  AND (:b IS NULL OR board = :b)
  AND (:c IS NULL OR class_level = :c)
  AND (:s IS NULL OR subject = :s)
  AND (marking_scheme IS NOT NULL OR model_answer IS NOT NULL)
  AND NOT EXISTS (SELECT 1 FROM board_question_flags fq
                  WHERE fq.question_id = board_questions.id)
ORDER BY (marking_scheme IS NOT NULL) DESC, id
LIMIT 4
"""

_EXISTS_MARKING_SQL = """
SELECT 1 FROM board_questions
WHERE norm_text = :nk
  AND board <> 'QUARANTINED'
  AND (:b IS NULL OR board = :b)
  AND (:c IS NULL OR class_level = :c)
  AND (:s IS NULL OR subject = :s)
  AND (marking_scheme IS NOT NULL OR model_answer IS NOT NULL)
  AND NOT EXISTS (SELECT 1 FROM board_question_flags fq
                  WHERE fq.question_id = board_questions.id)
LIMIT 1
"""

# Trigram variants — a rephrased stem still "resolves to a bank row" when
# the trgm hit clears the bank's own serving floor (BANK_MIN_SIMILARITY
# default 0.93 — strict on purpose: the flag/grade is only as honest as
# the match).
_TRGM_MARKING_SQL = """
SELECT id, subject, class_level, question_type, board, year,
       correct_answer, model_answer, marking_scheme, marks,
       question_text, similarity(norm_text, :nk) AS sim
FROM board_questions
WHERE norm_text % :nk
  AND board <> 'QUARANTINED'
  AND (:b IS NULL OR board = :b)
  AND (:c IS NULL OR class_level = :c)
  AND (:s IS NULL OR subject = :s)
  AND (marking_scheme IS NOT NULL OR model_answer IS NOT NULL)
  AND similarity(norm_text, :nk) >= :minsim
  AND NOT EXISTS (SELECT 1 FROM board_question_flags fq
                  WHERE fq.question_id = board_questions.id)
ORDER BY sim DESC
LIMIT 4
"""

_TRGM_EXISTS_SQL = """
SELECT 1 FROM board_questions
WHERE norm_text % :nk
  AND board <> 'QUARANTINED'
  AND (:b IS NULL OR board = :b)
  AND (:c IS NULL OR class_level = :c)
  AND (:s IS NULL OR subject = :s)
  AND (marking_scheme IS NOT NULL OR model_answer IS NOT NULL)
  AND similarity(norm_text, :nk) >= :minsim
  AND NOT EXISTS (SELECT 1 FROM board_question_flags fq
                  WHERE fq.question_id = board_questions.id)
LIMIT 1
"""


def _minsim() -> float:
    try:
        return float(os.environ.get("BANK_MIN_SIMILARITY", "0.93"))
    except ValueError:
        return 0.93


def _engine():
    """Share the bank lane's engine (same pool/timeout discipline)."""
    from backend.its.solver import bank_answer
    return bank_answer._engine()


def _ctx(board=None, class_level=None, subject=None, context=None):
    """Merge explicit args with a caller context dict -> (b, c, s)."""
    ctx = {}
    if isinstance(context, dict):
        ctx = context
    b = board or ctx.get("board")
    s = subject or ctx.get("subject")
    c = class_level if class_level is not None else (
        ctx.get("class_level", ctx.get("class")))
    try:
        c = int(c) if c is not None else None
    except (TypeError, ValueError):
        c = None
    return (str(b).strip().upper() if b else None, c,
            str(s).strip().lower() if s else None)


def _bank_marking_row(question_text: str, board=None, class_level=None,
                      subject=None, context=None):
    """Exact norm_text bank row carrying marking data, else None."""
    from backend.its.solver.bank_answer import normalize, _POOL
    from concurrent.futures import TimeoutError as _FT
    nk = normalize(question_text or "")
    if len(nk) < 8:
        return None
    b, c, s = _ctx(board, class_level, subject, context)

    def _run():
        from sqlalchemy import text as _text
        with _engine().connect() as cx, cx.begin():
            cx.execute(_text(
                "SELECT set_config('statement_timeout','1500',true)"))
            cx.execute(_text(
                "SELECT set_config('pg_trgm.similarity_threshold','0.30',"
                "true)"))
            rows = cx.execute(_text(_EXACT_MARKING_SQL),
                              {"nk": nk, "b": b, "c": c, "s": s}).fetchall()
            if rows:
                return rows
            return cx.execute(
                _text(_TRGM_MARKING_SQL),
                {"nk": nk, "b": b, "c": c, "s": s,
                 "minsim": _minsim()}).fetchall()
    try:
        rows = _POOL.submit(_run).result(timeout=_RESOLVE_BUDGET_S)
    except _FT:
        return None
    except Exception as exc:  # noqa: BLE001
        log.debug("marking row lookup degraded: %s", type(exc).__name__)
        return None
    return rows[0] if rows else None


def has_marking_data(question_text: str, context=None) -> bool:
    """Does this stem resolve to marking data?  Used by the refusal path
    to set gradable:true — and ONLY gates an offer ("paste your answer,
    I'll mark it"), so precision matters: node-marking items must beat
    the item-match floor, bank rows must clear exact-norm or the bank's
    own trgm serving floor.  Budgeted via the bank pool; False on error.
    """
    ctx = context if isinstance(context, dict) else {}
    nid = ctx.get("node_id") or ctx.get("node")
    if nid:
        try:
            items = _node_marking_items(str(nid)) or \
                _node_competency_items(str(nid))
            if _best_item(items, question_text):
                return True
        except Exception as exc:  # noqa: BLE001
            log.debug("node marking probe degraded: %s",
                      type(exc).__name__)
    from backend.its.solver.bank_answer import normalize, _POOL
    nk = normalize(question_text or "")
    if len(nk) < 8:
        return False
    b, c, s = _ctx(context=context)

    def _run():
        from sqlalchemy import text as _text
        with _engine().connect() as cx, cx.begin():
            cx.execute(_text(
                "SELECT set_config('statement_timeout','1500',true)"))
            cx.execute(_text(
                "SELECT set_config('pg_trgm.similarity_threshold','0.30',"
                "true)"))
            if cx.execute(_text(_EXISTS_MARKING_SQL),
                          {"nk": nk, "b": b, "c": c, "s": s}).first():
                return True
            return bool(cx.execute(
                _text(_TRGM_EXISTS_SQL),
                {"nk": nk, "b": b, "c": c, "s": s,
                 "minsim": _minsim()}).first())
    try:
        return bool(_POOL.submit(_run).result(timeout=_RESOLVE_BUDGET_S))
    except Exception as exc:  # noqa: BLE001
        log.debug("has_marking_data degraded: %s", type(exc).__name__)
        return False


# --- node-level sources (marking_points files / competency steps) ------- #


def _node_marking_items(node_id: str) -> List[Dict[str, Any]]:
    """Authored marking-point items for a node from
    content/marking_points/<subject>.json (via the enhanced_nodes lazy
    loaders).  [] when nothing exists."""
    try:
        from backend.services import enhanced_nodes as _en
        subj_file = _en._mp_index().get(node_id)
        if not subj_file:
            return []
        entry = _en._mp_file(subj_file).get(node_id) or {}
        return [it for it in entry.get("items", [])
                if it.get("points")]
    except Exception as exc:  # noqa: BLE001
        log.debug("node marking items degraded: %s", type(exc).__name__)
        return []


def _node_competency_items(node_id: str) -> List[Dict[str, Any]]:
    """Competency-question STEPS blocks from the loaded node index —
    the md-file marking points as the last node-level source."""
    try:
        from backend.services import enhanced_nodes as _en
        node = (_en.load_index().nodes or {}).get(node_id) or {}
        items = []
        for cq in node.get("competency_questions") or []:
            if cq.get("steps"):
                items.append({"q": cq.get("question") or "",
                              "points": list(cq["steps"]),
                              "answer": cq.get("answer") or ""})
        return items
    except Exception as exc:  # noqa: BLE001
        log.debug("node competency items degraded: %s",
                  type(exc).__name__)
        return []


def _best_item(items: List[Dict[str, Any]], question: str):
    """Pick the item whose authored question best matches the asked stem.
    Floor ~0.45 (the model_answer() convention — below that the match is
    noise and abstention is more honest)."""
    if not items:
        return None
    if not question:
        return max(items, key=lambda it: len(it.get("points") or []))
    qt = _content_set(question)
    if not qt:
        return items[0]
    best, best_score = None, 0.0
    for it in items:
        it_terms = _content_set(it.get("q") or "")
        if not it_terms:
            continue
        recall = len(qt & it_terms) / len(qt)
        jacc = len(qt & it_terms) / len(qt | it_terms)
        score = 0.6 * recall + 0.4 * jacc
        if score > best_score:
            best, best_score = it, score
    return best if best_score >= 0.45 else None


def resolve_marking(question: str, *, node_id: Optional[str] = None,
                    board: Optional[str] = None,
                    class_level: Optional[int] = None,
                    subject: Optional[str] = None) -> Optional[Dict[str, Any]]:
    """Resolve the grading reference for a stem.

    Order:
      1. node marking_points items (content/marking_points/*.json)
      2. node competency STEPS (enhanced_nodes index)
      3. exact-norm bank row -> marking_scheme -> model_answer

    Returns {points, min_points, marks, model_answer, source,
    matched_question} or None (fail-closed).
    """
    q = str(question or "").strip()
    try:
        if node_id:
            for items, src in ((_node_marking_items(node_id),
                                "node_marking_points"),
                               (_node_competency_items(node_id),
                                "node_competency_steps")):
                it = _best_item(items, q)
                if it:
                    return {"points": list(it.get("points") or []),
                            "min_points": it.get("min_points"),
                            "marks": None,
                            "model_answer": it.get("answer"),
                            "source": src,
                            "matched_question": it.get("q")}
        row = _bank_marking_row(q, board=board, class_level=class_level,
                                subject=subject)
        if row is None:
            return None
        scheme = (row.marking_scheme or "").strip()
        model = (row.model_answer or "").strip()
        pts = points_from_marking_scheme(scheme) if scheme else []
        source = "marking_scheme"
        if not pts and model:
            pts = points_from_model_answer(model)
            source = "model_answer"
        if not pts:
            return None
        return {"points": pts, "min_points": None,
                "marks": row.marks, "model_answer": model or None,
                "source": source,
                "matched_question": (row.question_text or "")[:600]}
    except Exception as exc:  # noqa: BLE001
        log.debug("resolve_marking degraded: %s", type(exc).__name__)
        return None
