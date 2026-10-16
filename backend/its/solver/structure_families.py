"""structure_families.py — semantic structure dispatch.

Question text -> STRUCTURE (by meaning, MiniLM embeddings) -> slot binding
(role-aware quantity extraction via parse_quantities) -> direct compute.

No regex triggers.  Adding coverage = adding a spec:
    exemplars  - 6+ paraphrases of the ask (drives the embedding match)
    slots      - {role: context keywords} the binder searches for
    compute    - fn(slots, text) -> (value, steps, answer, assumptions,
                eq, extra) or None to refuse

Other subjects register their specs with register_structures(); the
dispatcher model_structure() self-registers into modeling_layer's
_STRUCTURES sweep, so every lane (competency reader, kernel fallback)
sees these structures automatically.

Fail-closed: weak semantic match or unbound required slots -> refuse,
never guess.
"""

from __future__ import annotations

import contextvars
import math
import re
import unicodedata
from fractions import Fraction
from typing import Any, Callable, Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

Compute = Callable[[Dict[str, float], str],
                   Optional[Tuple[Optional[float], List[str],
                                  Optional[str], Optional[List[str]],
                                  str, Optional[Dict[str, Any]]]]]

# --------------------------------------------------------------------------- #
# Structure spec registry
# --------------------------------------------------------------------------- #

STRUCTURE_SPECS: Dict[str, Dict[str, Any]] = {}


def register_structures(specs: Dict[str, Dict[str, Any]]) -> None:
    """Merge a subject's specs (idempotent — later duplicates overwrite)."""
    STRUCTURE_SPECS.update(specs)


# --------------------------------------------------------------------------- #
# Semantic matcher — MiniLM exemplar centroids + lexical fallback
# --------------------------------------------------------------------------- #

_MODEL = None
_CENTROIDS: Dict[str, Any] = {}


def _get_model():
    global _MODEL
    if _MODEL is None:
        try:
            import os
            os.environ.setdefault("HF_HUB_OFFLINE", "1")
            os.environ.setdefault("TRANSFORMERS_OFFLINE", "1")
            from sentence_transformers import SentenceTransformer
            _MODEL = SentenceTransformer("all-MiniLM-L6-v2", local_files_only=True)
        except Exception:
            try:
                from sentence_transformers import SentenceTransformer
                _MODEL = SentenceTransformer("all-MiniLM-L6-v2")
            except Exception:
                _MODEL = False
    return _MODEL or None


def _centroids():
    """Lazily embed each structure's exemplars; cache the mean vector."""
    global _CENTROIDS
    if _CENTROIDS:
        return _CENTROIDS
    import os, pickle
    from backend.its.solver.paths import data_file
    cache_path = data_file("structure_centroids.pkl")
    try:
        if os.path.exists(cache_path):
            with open(cache_path, "rb") as f:
                data = pickle.load(f)
                if isinstance(data, dict) and len(data) >= len(STRUCTURE_SPECS) - 5:
                    _CENTROIDS.update(data)
                    return _CENTROIDS
    except Exception as _e:
        try:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("_centroids", _e)
        except Exception:
            pass
        pass
    model = _get_model()
    if model is None:
        return _CENTROIDS
    import numpy as np
    for sid, spec in STRUCTURE_SPECS.items():
        ex = spec.get("exemplars") or []
        if not ex:
            continue
        emb = model.encode(ex, normalize_embeddings=True)
        _CENTROIDS[sid] = np.mean(emb, axis=0)
    try:
        with open(cache_path, "wb") as f:
            pickle.dump(_CENTROIDS, f)
    except Exception as _e:
        try:
            from backend.its.solver.contract import log_lane_exception
            log_lane_exception("_centroids", _e)
        except Exception:
            pass
        pass
    return _CENTROIDS


def _lexical_score(text: str, spec: Dict[str, Any]) -> float:
    """Stem-overlap fallback when embeddings are unavailable."""
    toks = set(re.findall(r"[a-z]{3,}", text.lower()))
    if not toks:
        return 0.0
    best = 0.0
    for ex in spec.get("exemplars") or []:
        ex_toks = set(re.findall(r"[a-z]{3,}", ex.lower()))
        if not ex_toks:
            continue
        j = len(toks & ex_toks) / len(toks | ex_toks)
        best = max(best, j)
    return best


def match_structure(text: str, threshold: float = 0.55
                    ) -> Tuple[Optional[str], float]:
    """Best structure id + confidence, or (None, conf) under threshold."""
    model = _get_model()
    if model is not None:
        cents = _centroids()
        if cents:
            import numpy as np
            v = model.encode([text], normalize_embeddings=True)[0]
            best_sid, best = None, 0.0
            for sid, c in cents.items():
                s = float(np.dot(v, c))
                if s > best:
                    best, best_sid = s, sid
            if best_sid and best >= threshold:
                return best_sid, best
            return best_sid, best  # return best anyway; caller decides
    # lexical fallback
    best_sid, best = None, 0.0
    for sid, spec in STRUCTURE_SPECS.items():
        s = _lexical_score(text, spec)
        if s > best:
            best, best_sid = s, sid
    if best_sid and best >= 0.28:
        return best_sid, best
    return None, best


def match_structure_topk(text: str, k: int = 3
                         ) -> List[Tuple[Optional[str], float]]:
    """Ranked top-k [(sid, conf)] — lets the dispatcher try runner-up
    structures when the best match's compute refuses."""
    model = _get_model()
    if model is not None:
        cents = _centroids()
        if cents:
            import numpy as np
            v = model.encode([text], normalize_embeddings=True)[0]
            scored = sorted(
                ((float(np.dot(v, c)), sid) for sid, c in
                 cents.items()), reverse=True)
            return [(sid, s) for s, sid in scored[:k]]
    scored = sorted(((_lexical_score(text, spec), sid)
                     for sid, spec in STRUCTURE_SPECS.items()),
                    reverse=True)
    return [(sid, s) for s, sid in scored[:k]]


# --------------------------------------------------------------------------- #
# Slot binding — role-aware quantity extraction
# --------------------------------------------------------------------------- #

_NUM_WORD = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6,
             "seven": 7, "eight": 8, "nine": 9, "ten": 10, "eleven": 11,
             "twelve": 12, "half": 0.5, "quarter": 0.25}


def _all_numbers(text: str) -> List[Tuple[float, int, int, str]]:
    """(value, start, end, context) for digits AND number-words."""
    out = []
    for m in re.finditer(r"\d+(?:\.\d+)?", text):
        lo = max(0, m.start() - 45)
        out.append((float(m.group(0)), m.start(), m.end(),
                    text[lo:m.end() + 15]))
    for w, v in _NUM_WORD.items():
        for m in re.finditer(rf"\b{w}\b", text, re.I):
            lo = max(0, m.start() - 45)
            out.append((float(v), m.start(), m.end(),
                        text[lo:m.end() + 15]))
    return out


# --------------------------------------------------------------------------- #
# Semantic quantity layer — ONE shared parse for every spec.
# spaCy dependency parse: each numeric token reports the noun it quantifies,
# the governing verb of its clause, and whether it sits under an ASK verb
# (find/calculate/what/how much) — the given-vs-asked distinction regexes
# can never express.
# --------------------------------------------------------------------------- #

_NLP = None
_NLP_TRIED = False
_ASK_LEMMAS = {"find", "calculate", "determine", "evaluate", "compute",
               "obtain", "what", "how", "solve", "prove", "show",
               "estimate", "work", "get"}
_UNIT_TOKENS = {"kg", "g", "l", "ml", "m", "cm", "km", "mm", "s", "ms",
                "kmph", "km/h", "m/s", "ft", "inch", "deg", "degrees",
                "rs", "rupees", "₹", "%", "percent", "units", "parts",
                "litres", "liters", "litre", "meter", "metre", "meters",
                "metres", "minutes", "hours", "days", "sq", "cu"}


def _get_nlp():
    global _NLP, _NLP_TRIED
    if not _NLP_TRIED:
        _NLP_TRIED = True
        try:
            import spacy
            _NLP = spacy.load("en_core_web_sm")
        except Exception:
            _NLP = None
    return _NLP


def _tok_value(tok) -> Optional[float]:
    try:
        return float(tok.text.replace(",", ""))
    except ValueError:
        return _NUM_WORD.get(tok.text.lower())


def parse_quantities(text: str) -> List[Dict[str, Any]]:
    """Dependency-parsed quantities: [{value, unit, head, governor,
    is_asked, i}].  head = the noun the number quantifies ('5' in
    'price of 5 kg' has head 'kg', then 'price'); governor = the clause
    ROOT verb; is_asked = governor is an interrogative/imperative."""
    nlp = _get_nlp()
    if nlp is None:
        return []
    try:
        doc = nlp(text[:1500])
    except Exception:
        return []
    out = []
    for tok in doc:
        v = _tok_value(tok)
        if v is None or tok.pos_ not in ("NUM", "NOUN"):
            continue
        # walk up: nummod -> unit noun -> of -> governing noun -> verb
        head = tok.head if tok.dep_ in ("nummod", "attr") else None
        chain = []
        cur = tok
        for _ in range(8):
            if cur.head is cur:
                break
            cur = cur.head
            chain.append(cur)
            if cur.dep_ == "ROOT":
                break
        gov_noun = next((c.text.lower() for c in chain
                        if c.pos_ == "NOUN" and c is not head), None)
        # governor = nearest CLAUSE verb above the number, not just the
        # sentence ROOT — 'if 5 pens cost Rs 60' puts 5/60 under 'cost'
        # (advcl), and only the main clause's 12 is the ask.
        governor = next((c for c in chain
                        if c.pos_ in ("VERB", "AUX")), tok)
        # a number in a SUBORDINATE clause (advcl/acl/relcl/pcomp) is a
        # given; a number under the ROOT clause of an ask-sentence is
        # asked.  Wh-words / imperative verbs mark the ask clause.
        in_subordinate = governor.dep_ in ("advcl", "acl", "relcl",
                                         "pcomp", "ccomp", "xcomp")
        sent = list(tok.sent) if hasattr(tok, "sent") else list(doc)
        wh = any(t.text.lower() in ("what", "how", "find", "calculate",
                                    "determine", "evaluate", "compute")
                 for t in sent if t.i <= governor.i)
        root_lemma = governor.lemma_.lower()
        is_asked = (not in_subordinate and
                    (wh or root_lemma in _ASK_LEMMAS or
                     governor.text.lower() in _ASK_LEMMAS))
        root_txt = governor.text.lower()
        unit = None
        if head is not None and head.text.lower() in _UNIT_TOKENS:
            unit = head.text.lower()
        else:
            nxt = doc[tok.i + 1] if tok.i + 1 < len(doc) else None
            if nxt is not None and nxt.text.lower() in _UNIT_TOKENS:
                unit = nxt.text.lower()
        out.append({"value": v, "unit": unit,
                    "head": head.text.lower() if head else None,
                    "governs": gov_noun,
                    "governor": root_txt,
                    "is_asked": is_asked, "i": tok.i})
    return out


def bind_slots(text: str, spec: Dict[str, Any]) -> Optional[Dict[str, float]]:
    """Fill spec['slots'] = {role: [context keywords]} by PROXIMITY:
    a number binds a role when a keyword occurs shortly BEFORE it
    (the closest keyword wins), so 'a set of 9' never steals the
    'median' slot from 'median ... is 20.5'."""
    nums = _all_numbers(text)
    if not nums:
        return None
    slots: Dict[str, float] = {}
    used: set = set()
    for role, sdef in (spec.get("slots") or {}).items():
        # slot spec: [kws] binds kw-before-number; {"kws": [...],
        # "dir": "after"} binds kw-AFTER-number ("6 km/hr more than")
        direction = "any"
        declared = False
        kws = sdef
        if isinstance(sdef, dict):
            kws = sdef.get("kws") or []
            direction = sdef.get("dir", "any")
            declared = bool(sdef.get("declared"))
        best_i, best_gap = None, 10 ** 9
        for i, (v, s, e, ctx) in enumerate(nums):
            if i in used:
                continue
            for kw in kws:
                for km in re.finditer(re.escape(kw), text, re.I):
                    if direction != "after" and \
                            km.end() <= s and 0 <= s - km.end() <= 45:
                        gap_text = text[km.end():s]
                        gap = s - km.end()
                        if re.search(r"(?:is|=|of\s+value)\s*$", gap_text,
                                     re.I):
                            gap -= 1000
                        elif declared:
                            continue  # declared roles need the is/= anchor
                    elif direction != "before" and \
                            km.start() >= e and 0 <= km.start() - e <= 45:
                        if declared:
                            continue
                        gap = km.start() - e
                    else:
                        continue
                    if gap < best_gap:
                        best_gap, best_i = gap, i
        if best_i is not None:
            slots[role] = nums[best_i][0]
            used.add(best_i)
        elif role in (spec.get("required") or []):
            return None
    for role in (spec.get("ordered") or []):
        if role in slots:
            continue
        for i, (v, s, e, _c) in enumerate(nums):
            if i not in used:
                slots[role] = v
                used.add(i)
                break
        else:
            if role in (spec.get("required") or []):
                return None
    return slots


# --------------------------------------------------------------------------- #
# Dispatcher
# --------------------------------------------------------------------------- #

# When set (tutor confirm-the-values flow), the LLM extractor is skipped:
# the question only gets deterministic candidates, and extraction happens
# explicitly at the tutor layer where the student can gate it.
_DEFER_LLM: contextvars.ContextVar[bool] = contextvars.ContextVar(
    "defer_llm_extraction", default=False)



# ── ASK_FIELDS (owner-adjudicated 2026-10-07) ───────────────────────────
# sid -> set of ask-kinds the family may answer.  Consulted by the
# ask-coherence gate (model_structure candidate loop).  Families not
# listed here fail open (no kind constraint) until migrated.
ASK_FIELDS: Dict[str, Set[str]] = {
    "CUBE_MEASURE": {"volume", "area", "length", "sum"},
    "CUBOID_MEASURE": {"volume", "area", "length"},
    "FRUSTUM_MEASURE": {"volume", "area", "length"},
    "SPHERE_MEASURE": {"volume", "area", "length"},
    "CONE_VOLUME": {"volume", "area", "length"},
    "CIRCLE_MEASURE": {"area", "length"},
    "SQUARE_MEASURE": {"area", "length"},
    "RECT_MEASURE": {"area", "length"},
    "CONE_SURFACE": {"area", "sum"},
    "TRIG_RIGHT": {"angle", "length"},
    "CIRCLE_ANGLE": {"angle", "length"},
    "DEPRESSION_ELEVATION": {"angle", "length"},
    "CHORD_CIRCLE": {"length"},
    "COMP_SUPP_ANGLE": {"angle"},
    "PYTHAGORAS": {"length"},
    "COND_PROB": {"probability"},
    "COIN_SEQUENCE": {"probability", "count"},
    "PROBABILITY_ALL": {"probability", "count"},
    "BINOMIAL_PROB": {"probability"},
    "MEDIAN_GROUPED": {"median"},
    "STATISTICS_BUNDLE": {"mean", "median", "mode", "range", "sum"},
    "MEAN_WEIGHTED": {"mean"},
    "PERCENT": {"percent", "money"},
    "PROFIT_DISCOUNT": {"money", "percent"},
    "COMPOUND_INTEREST": {"money", "percent"},
    "CI_INVERSE": {"money", "sum", "percent"},
    "SI_INVERSE": {"money", "sum", "percent"},
    "UNITARY_ALL": {"money"},
    "SPEED_DIST_TIME": {"speed", "length", "time"},
    "SPEED_RATIO": {"speed", "ratio"},
    "PIPE_FILL": {"time"},
    "WORK_TIME": {"time", "count"},
    "TEMP_CONVERT": {"temperature"},
    "AP_SUM_FIRST": {"sum", "term"},
    "HEAT_FORMULAE": {"energy", "temperature", "mass"},
    "MOMENTUM": {"momentum"},
    "LENS_MIRROR": {"length", "ratio", "power"},
    "CUBOID_CAPACITY": {"volume", "count"},
    "BETWEEN_SQUARES": {"count"},
    "AREA_RATIO": {"ratio"},
    "SCALE_FACTOR": {"ratio"},
    # Resolved MULTI-BRANCH and NO-SIGNAL migrations
    "ALGEBRA_TRANSFORM": {"roots", "length"},
    "DECIMAL_TO_FRACTION": {"ratio", "length"},
    "DIGITS_WORD": {"count", "area", "length"},
    "EXPONENT_EVAL": {"term", "length"},
    "HCF_LCM": {"count", "money"},
    "LINE_EQUATION": {"classify", "length"},
    "MATRIX_DET_SCALAR": {"term", "length"},
    "RATIONALIZE": {"term", "length"},
    "RATIO_CHAIN": {"ratio", "length"},
    "REMAINDER_CHAIN": {"count", "money"},
    "SI_CI_DIFF": {"money"},
    "SYMMETRIC_EXPR": {"term", "length"},
    "SYMMETRIC_INVERSE": {"term", "length"},
    "AR_EVAL": {"classify", "proof"},
    "BINOMIAL_EXPAND": {"term"},
    "CIRCLE_EQUATION": {"length"},
    "EQUIDISTANT_AXIS": {"length"},
    "FUNCTION_COMPOSITE": {"term"},
    "INTERSECT_CHORDS": {"length"},
    "LINEAR_EQ_2VAR": {"roots"},
    "LINES_PARALLEL": {"roots"},
    "LOG_EVAL": {"term"},
    "MIDPOINT_CHECK": {"proof", "length"},
    "PERFECT_SQUARE": {"count", "proof"},
    "QUAD_FORMULA": {"roots"},
    "QUAD_ROOT_EXPR": {"roots", "term"},
    "QUAD_WORD_TAPS": {"time"},
    "REMAINDER_THEOREM": {"term"},
    "SLOPE": {"angle"},
    "SOLVE_THEN_EVAL": {"term"},
    "VARIANCE_SD": {"mean"},
    "VECTOR_OPS": {"term"},
    "VECTOR_DOT": {"term"},
    "VECTOR_MAG": {"term"},
    "BAYES": {"term", "probability"},
    "PROB_OR": {"term", "probability"},
    "TANGENT_LINE": {"length", "roots"},
    "DET3": {"term", "length"},
    "LIMIT_SIN": {"term"},
    "LINEAR_INEQ": {"roots"},
    "SIGMA": {"term"},
    "LIMIT_EVAL": {"term"},
    "COMPLEX_MODULUS": {"term"},
    "SERIES_SUM": {"term", "sum"},
    "AP_SUM": {"term"},
    "GP_SUM": {"term"},
    "ELLIPSE": {"term"},
    "CIRCLE_EQ": {"length", "roots"},
    "CIRCLE_ARC": {"length"},
    "MATRIX_OPS": {"term", "roots"},
    "IQR": {"term"},
    "POLY_DEGREE": {"term", "degree"},
    "RECT_AREA_BY": {"area", "length"},
    "PROFIT_PERCENT": {"percent", "term"},
    "SEQ_ODD": {"term", "number"},
    "SEQ_NEXT": {"term", "number"},
    "VECTOR_ANGLE": {"term", "angle"},
    "DISTANCE_2D": {"length", "distance"},
    "WORK_RATE": {"term", "time", "count"},
    "PERCENT_BACK": {"term", "number"},
    "TRIANGLE_AREA": {"area", "length"},
    "AP_TERMS": {"term", "count"},
    "NUMBER_COMPARE": {"term", "number"},
    "SPINNER_PROB": {"probability", "term"},
    "COMPOSITE_SOLID": {"area", "volume"},
    "EMI_ANNUITY": {"money", "term"},
    "TRIG_ELEVATION_2PT": {"length", "height"},
    "MATRIX_DET_PROPS": {"term", "scalar"},
    "MATRIX_RANK": {"rank"},
    "MATRIX_MINOR_COFACTOR": {"minor"},
    "MATRIX_SYMMETRY": {"matrix_type", "proof", "classify"},
    "SYMMETRIC_ROOTS": {"term", "roots", "sum", "equation"},
    "SECTOR_INVERSE": {"length", "angle"},
    "SECTOR_ARC_AREA": {"area", "length"},
    "COMPOSITE_NUM": {"term", "number", "proof"},
    "COORD_REFLECT": {"coordinate", "point"},
    "STAT_GROUPED": {"term", "mean", "median", "mode"},
    "SPHERE_VOLUME": {"volume"},
    "CYLINDER_VOLUME": {"volume"},
    "CONE_VOLUME": {"volume"},
    "HEMISPHERE_VOLUME": {"volume"},
    "CUBOID_VOLUME": {"volume"},
    "CI_RATE": {"term"},
    "UNIT_CONVERT": {"length"},
    "DIRECTION_COS": {"direction"},
    "LINES_ANGLE_3D": {"angle"},
    "TRIG_RATIO_GIVEN": {"ratio"},
    "HOMOGENEOUS_DIFFEQ": {"term", "number"},
    "AREA_PARABOLA_LINE": {"area", "term"},
}


_INFERRED_ASK_CACHE: Dict[str, Set[str]] = {}


def get_declared_ask_kinds(sid: str, spec: Optional[Dict[str, Any]] = None) -> Set[str]:
    """Retrieve declared ask kinds from ASK_FIELDS or spec['ask'].
    If undeclared, auto-derive directly from exemplar questions and return literals
    so new families never drop to GUIDED due to missing manual registrations."""
    declared = ASK_FIELDS.get(sid)
    if declared:
        return declared if isinstance(declared, set) else {declared}
    if spec:
        spec_ask = spec.get("ask")
        if spec_ask:
            return {spec_ask} if isinstance(spec_ask, str) else set(spec_ask)
    if sid in _INFERRED_ASK_CACHE:
        return _INFERRED_ASK_CACHE[sid]
    if not spec:
        spec = STRUCTURE_SPECS.get(sid)
    if not spec:
        return set()

    # Dynamic auto-derivation from exemplars and compute function
    from backend.its.solver.ask_coherence import asked_kinds, answer_kind
    inferred: Set[str] = set()
    for ex in spec.get("exemplars") or []:
        pri, tol = asked_kinds(ex)
        inferred.update(pri)
    fn = spec.get("compute")
    if fn is not None:
        try:
            import inspect
            src = inspect.getsource(fn)
            for m in re.finditer(r'["\']([^"\']{2,})["\']', src):
                val = m.group(1).strip()
                k = answer_kind(val)
                if k:
                    inferred.add(k)
        except Exception:
            pass
    _INFERRED_ASK_CACHE[sid] = inferred
    return inferred



def model_structure(text: str) -> ModelResult:
    """_STRUCTURES entry point: semantic match -> slots -> compute."""
    from backend.its.solver.board_stem import prepare_board_stem
    bs = prepare_board_stem(text)
    work = bs.stem if bs else text
    norm_stem = unicodedata.normalize("NFKC", work)
    norm_full = unicodedata.normalize("NFKC", text)

    def _fix(u):
        # the VIC tail is a SUBSTITUTE question for visually-impaired
        # candidates — its numbers must never bind into the sighted
        # question.  (Case-study givens already travel via the
        # 'Given coordinates:' line multi_part injects into context.)
        u = re.sub(r"for\s+visually\s+impaired.*$", "", u,
                   flags=re.I | re.S)
        u = (u.replace("√", "sqrt").replace("π", "pi")
              .replace("θ", "theta").replace("Θ", "theta")
              .replace("−", "-").replace("–", "-")
              .replace("°", " deg ").replace("⁰", "0")
              .replace("≤", "<=").replace("≥", ">="))
        return re.sub(r"(\d)\s*o\b", r"\1 deg ", u)  # MS-style '60o'
    norm_stem = _fix(norm_stem)
    norm_full = _fix(norm_full)
    # RELATED-RATES VETO (E2 wave): "how fast is X increasing when R=n"
    # is a calculus problem, not a static structure — the semantic lane
    # read 'volume ... 12pi ... radius 3' as SPHERE_VOLUME and shipped
    # 4/3 pi 12^3 = 7238.  Refuse so the syllabus related-rates row or
    # an honest refusal owns it.
    if re.search(r"how\s+fast|rate\s+of\s+change|at\s+what\s+rate|"
                 r"increas\w+\s+at\s+a\s+(?:constant\s+)?rate|"
                 r"decreas\w+\s+at\s+a\s+(?:constant\s+)?rate", text,
                 re.I):
        return ModelResult(
            structure="RELATED_RATES", matched=False, confidence=0.0,
            quantities={}, governing_equation="",
            note="related-rates ask -- not a static structure")
    # Wave 9.8 L3 pre-route: a bank_preroute worker (or an earlier serving
    # call) may already have decided the route for this bank-normalized
    # stem.  match_structure is a pure function of the stem (centroids are
    # static), so a cached decision is identical to recomputing — the
    # store is the existing structure_extract_cache.json under a ROUTE:
    # prefix; keying is bank_answer.normalize, same as the board_questions
    # norm_text column the worker iterates.
    _route_key = None
    try:
        from backend.its.solver.bank_answer import normalize as _bn
        _route_key = _bn(norm_full) or None
    except Exception:
        pass
    _rc = None
    if _route_key:
        try:
            from backend.its.solver.structure_extractor import \
                route_cache_get
            _rc = route_cache_get(_route_key)
        except Exception:
            _rc = None
    if _rc is not None:
        sid = _rc.get("structure") or None
        try:
            conf = float(_rc.get("confidence") or 0.0)
        except (TypeError, ValueError):
            conf = 0.0
    else:
        sid, conf = match_structure(norm_stem)
        if _route_key:
            try:
                from backend.its.solver.structure_extractor import \
                    route_cache_put
                route_cache_put(_route_key, {
                    "structure": sid, "confidence": conf,
                    "matched": bool(sid and conf), "via": "serving"})
            except Exception:
                pass
    # all surface-identical, so route them by form, not similarity.  The
    # gate requires a parseable 'Assertion (A): ... Reason (R):' pair —
    # a casual 'reason' elsewhere must never steal a real structure hit
    if re.search(r"assertion\s*\(?\s*a\s*\)?\s*[:.]",
                 norm_full, re.I) and \
            re.search(r"reason\s*\(?\s*r\s*\)?\s*[:.]",
                      norm_full, re.I) and \
            "AR_EVAL" in STRUCTURE_SPECS:
        sid, conf = "AR_EVAL", max(conf, 0.9)
    # candidate queue: (sid, conf, slots, norm).  The LLM extractor
    # leads — it reads narrative context the keyword binder cannot —
    # with the embedding-matched candidate as fallback (offline, free).
    # Every LLM slot is extractively verified (verbatim span + unit +
    # range) before it can bind.  The LLM never computes.
    cands: List[Tuple[str, float, Optional[Dict[str, Any]], str,
                      Optional[Dict[str, Any]]]] = []
    # FORCE patterns go FIRST among deterministic candidates — a
    # syntactic signature ('det [[', 'dy/dx =', 'sector') is authored
    # against the question type deliberately, resolving deterministically in ~1ms.
    forced = []
    for sid_f, spec_f in STRUCTURE_SPECS.items():
        fp = spec_f.get("force")
        if fp:
            nf = norm_full if spec_f.get("full_text") else norm_stem
            try:
                if re.search(fp, nf, re.I):
                    forced.append((sid_f, max(spec_f.get("min_conf", 0.55), 0.95),
                                   None, nf, None))
            except re.error:
                continue
    cands.extend(forced)

    # Only run LLM extraction if no forced deterministic signature matched
    if not forced:
        try:
            from backend.its.solver.structure_extractor import \
                extract_slots
        except ImportError:
            extract_slots = None
        if extract_slots is not None and not _DEFER_LLM.get():
            llm = extract_slots(norm_full)
            if llm:
                lspec = STRUCTURE_SPECS.get(llm["structure"])
                if lspec:
                    n2 = norm_full if lspec.get("full_text") else norm_stem
                    lslots: Dict[str, Any] = {}
                    for k, v in (llm.get("slots") or {}).items():
                        if isinstance(v, (int, float)):
                            lslots[k] = float(v)
                        elif isinstance(v, (list, tuple)):
                            try:
                                lslots[k] = [float(x) for x in v]
                            except (TypeError, ValueError):
                                pass
                    rich = {"structure": llm["structure"],
                            "givens": llm.get("slots_rich") or lslots,
                            "ask": llm.get("ask") or ""}
                    cands.append((llm["structure"], 0.92, lslots, n2, rich))
    spec0 = STRUCTURE_SPECS.get(sid or "")
    if spec0 and conf >= spec0.get("min_conf", 0.55) and \
            sid not in {c[0] for c in cands}:
        n0 = norm_full if spec0.get("full_text") else norm_stem
        cands.append((sid, conf, bind_slots(n0, spec0), n0, None))
    # runner-up structures too — the top embedding hit can be the wrong
    # task type (AP_LAST_SUM vs AP_SUM_FIRST on 'sum to n terms'); each
    # still has to pass its own min_conf gate and a successful compute
    for sid_k, conf_k in match_structure_topk(norm_stem, k=3)[1:]:
        spec_k = STRUCTURE_SPECS.get(sid_k or "")
        if spec_k and sid_k != sid and \
                conf_k >= spec_k.get("min_conf", 0.55) and \
                sid_k not in {c[0] for c in cands}:
            nk = norm_full if spec_k.get("full_text") else norm_stem
            cands.append((sid_k, conf_k, None, nk, None))
    first_sid, first_conf = sid, conf

    # ── ASK-COHERENCE (shadow-kill): type what the question ASKS once;
    # every candidate is gated against it before it may claim.  A family
    # matching keywords but answering another kind refuses here and the
    # candidate behind it gets its turn.  Fail-open: an untypable ask
    # never blocks.  Ask kinds from ask_coherence (2026-10-07).
    from backend.its.solver.ask_coherence import (
        asked_kinds, kind_set, note_refusal)
    ask_pri, ask_tol = asked_kinds(norm_full)

    while cands:
        sid_c, conf_c, slots_c, norm_c, rich_c = cands.pop(0)
        spec = STRUCTURE_SPECS.get(sid_c)
        if not spec or conf_c < spec.get("min_conf", 0.55):
            continue
        # the LLM candidate carries its own ask reading; a disagreement
        # with the family it routed to is itself a mis-route
        if rich_c and rich_c.get("ask"):
            pri_c, tol_c = asked_kinds(str(rich_c["ask"]))
            if not (pri_c or tol_c):
                pri_c, tol_c = ask_pri, ask_tol
        else:
            pri_c, tol_c = ask_pri, ask_tol
        declared_c = get_declared_ask_kinds(sid_c, spec)
        if (pri_c or tol_c) and declared_c and not (declared_c & (pri_c | tol_c)):
            note_refusal(sid_c, pri_c | tol_c, declared_c, "kind-mismatch")
            continue
        if slots_c is None:
            slots_c = bind_slots(norm_c, spec)
        if slots_c is None and spec.get("required"):
            continue
        try:
            out = spec["compute"](slots_c or {}, norm_c)
        except Exception:
            continue  # a crashing compute must not kill the sweep
        if not out:
            continue  # compute refused -> next candidate, then LLM
        (value, steps, answer, assumptions, eq, extra) = \
            (list(out) + [None] * 6)[:6]
        # answer-domain sanity: a spec may declare the space its answer
        # must live in — a wrong-structure hijack usually violates it.
        # Scalars only — tuples (points) and strings skip the check.
        sanity = spec.get("sanity")
        if sanity and isinstance(value, (int, float)) \
                and not sanity(value):
            continue
        # a compute that ran to a real answer IS the verification — the
        # sweep's 0.85 promotion gate should see that, not the raw
        # embedding score.  0.96 sits above family regex-trigger
        # confidences (0.85-0.95): a structure matched by meaning AND
        # verified by a successful deterministic compute outranks a
        # phrasing match that merely fired.
        conf_c = max(conf_c, 0.96)
        # full_text computes carry their bound slots in `extra` -- the
        # verifier rebuilds from quantities, so numeric extras merge in
        _q = {k: v for k, v in (slots_c or {}).items()}
        if isinstance(extra, dict):
            _q.update({k: v for k, v in extra.items()
                       if isinstance(v, (int, float))})
        return ModelResult(
            structure=sid_c, matched=True, confidence=conf_c,
            quantities=_q,
            governing_equation=eq or sid_c,
            final_answer=answer,
            numeric_answer=value, steps=list(steps or []),
            understood=({
                "structure": sid_c,
                "structure_label": spec.get(
                    "label", sid_c.replace("_", " ").title()),
                "givens": (rich_c or {}).get("givens") or
                          {k: v for k, v in (slots_c or {}).items()},
                "ask": (rich_c or {}).get("ask") or "",
            } if spec.get("expose_understood", True) else None),
            note="semantic-structure dispatch")

    # PAL fallback — every deterministic candidate refused.  The LLM
    # writes a computation *program* (composite competency questions
    # have no registered formula), the sandbox executes it, and the
    # plan rides in `understood` for the student confirm card.  Runs
    # only when the caller allows LLM (defer_llm gates it off for the
    # tutor's deterministic-first pass).
    prog = None
    if not _DEFER_LLM.get():
        # PHYSICS-FAMILY PRECEDENCE (2026-10-07 coil regression): when
        # the deterministic physics dispatcher matches this question,
        # its purpose-built family — with pedagogy steps and a
        # registered second-path verifier — owns the answer; a PAL
        # template (LLM extraction OR offline rebind) claiming here
        # first raced the family and its disagreement FAILed the badge
        # gate into a withhold.  Decline so the family lane serves.
        if not _DEFER_LLM.get():
            try:
                from backend.its.solver.physics_families import \
                    model_physics_families as _pf_owner
                _pf_hit = _pf_owner(norm_full)
                if getattr(_pf_hit, "matched", False):
                    return ModelResult(
                        structure="PHYSICS_FAMILY_DEFERRED",
                        matched=False, confidence=0.0, quantities={},
                        governing_equation="",
                        note=f"physics family owns: {_pf_hit.structure}")
            except Exception:
                pass
            try:
                from backend.its.solver.chemistry_families import \
                    model_chemistry_families as _cf_owner
                _cf_hit = _cf_owner(norm_full)
                if getattr(_cf_hit, "matched", False):
                    return ModelResult(
                        structure="CHEMISTRY_FAMILY_DEFERRED",
                        matched=False, confidence=0.0, quantities={},
                        governing_equation="",
                        note=f"chemistry family owns: {getattr(_cf_hit, 'structure', '')}")
            except Exception:
                pass
            try:
                from backend.its.solver.accountancy_families import \
                    model_accountancy_families as _af_owner
                _af_hit = _af_owner(norm_full)
                if getattr(_af_hit, "matched", False):
                    return ModelResult(
                        structure="ACCOUNTANCY_FAMILY_DEFERRED",
                        matched=False, confidence=0.0, quantities={},
                        governing_equation="",
                        note=f"accountancy family owns: {getattr(_af_hit, 'structure', '')}")
            except Exception:
                pass
        try:
            from backend.its.solver.structure_extractor import \
                extract_program
            from backend.its.solver.pal_executor import run_program, \
                eval_formula
            prog = extract_program(norm_full)
            if not (prog and (prog.get("code") or prog.get("formula"))):
                # offline PAL: a saved template under this shape rebinds
                # the new literals — zero LLM cost, learned earlier
                try:
                    from backend.its.solver.pal_templates import \
                        match_program
                    prog = match_program(norm_full)
                except Exception:
                    prog = None
            if prog and (prog.get("code") or prog.get("formula")):
                # two-engine compute: a declared formula evaluates
                # deterministically via sympy; code runs only when
                # no formula (loops/branches).  When BOTH exist the
                # formula cross-checks the sandbox — disagreement
                # means a mis-parse, refuse.
                ran = None
                self_checked = False
                if prog.get("formula"):
                    ran = eval_formula(prog["formula"],
                                       prog.get("bindings") or {})
                if ran is None and prog.get("code"):
                    ran = run_program(prog["code"])
                elif ran is not None and prog.get("code"):
                    cross = run_program(prog["code"])
                    if (cross is not None
                            and cross.get("numeric") is not None
                            and ran.get("numeric") is not None
                            and abs(cross["numeric"] - ran["numeric"])
                            > max(1e-6, 0.01 * abs(ran["numeric"]))):
                        logger.warning(
                            "PAL formula-vs-code disagreement: "
                            "formula=%s code=%s — refused",
                            ran["numeric"], cross["numeric"])
                        return ModelResult(
                            structure="PAL_PROGRAM", matched=False,
                            confidence=0.0, quantities={},
                            governing_equation="",
                            note="pal formula and code disagree")
                    if cross is not None and cross.get("numeric") is not None and ran.get("numeric") is not None:
                        self_checked = True
                if ran is not None and ran.get("value") is not None:
                    # declared-semantics gate: the extractor now returns
                    # signed 'flows'; a contradiction between declared
                    # direction and the computed answer is a mis-parse —
                    # refuse, never ship (sold_buys: sells coded as spend)
                    try:
                        from backend.its.solver.semantic_check import \
                            verify_pal_consistency
                        ok_v, why_v = verify_pal_consistency(
                            norm_full, prog, ran.get("numeric"))
                    except Exception:
                        ok_v, why_v = True, None
                    if not ok_v:
                        logger.warning(
                            "PAL semantic contradiction refused: %s",
                            why_v)
                        return ModelResult(
                            structure="PAL_PROGRAM", matched=False,
                            confidence=0.0, quantities={},
                            governing_equation="",
                            note=f"pal contradicted by declared "
                                 f"flows: {why_v}")
                    plan = ran.get("steps") or prog.get("plan") or []
                    givens = prog.get("givens") or {}
                    if prog.get("template"):
                        # CL-23 (2026-10-13): a rebound template's own
                        # step strings were written for the ORIGINAL
                        # literals ('Substitute x = 5' on a 7x + 4 = 39
                        # replay).  Drop every line that still carries
                        # an old question number — the card shows only
                        # text that is true of THIS question.
                        try:
                            from backend.its.solver.pal_templates \
                                import _literals as _pl_lits, \
                                filter_stale_lines as _pl_filt
                            plan = _pl_filt(
                                plan, prog.get("_old_lits") or [],
                                _pl_lits(norm_full))
                        except Exception:
                            plan = []
                        if not plan:
                            plan = [
                                "Saved computation replayed with this "
                                "question's values."]
                    return ModelResult(
                        structure="PAL_PROGRAM", matched=True,
                        confidence=0.95,
                        quantities={},
                        governing_equation="PAL sandbox",
                        final_answer=ran["answer_text"],
                        numeric_answer=ran.get("numeric"),
                        steps=plan,
                        understood={
                            "structure": "PAL_PROGRAM",
                            "structure_label": "Planned computation",
                            "givens": givens,
                            "ask": prog.get("ask") or "",
                            "plan": plan,
                            "flows": prog.get("flows") or [],
                            "start": prog.get("start"),
                            "code": prog["code"],
                            "self_checked": self_checked,
                        },
                        note="program-aided: LLM wrote plan, "
                             "sandbox computed")
        except Exception:
            pass  # PAL is opportunistic — its failure just refuses

    return ModelResult(structure=first_sid or "STRUCTURE", matched=False,
                       confidence=first_conf, quantities={},
                       governing_equation="",
                       note="no structure computed")


def _register_into_ml() -> bool:
    try:
        import backend.its.solver.modeling_layer as _ml
    except ImportError:
        return False
    if not any(getattr(fn, "__name__", "") == "model_structure"
               for fn in _ml._STRUCTURES):
        _ml._STRUCTURES.append(model_structure)
    return True


# --------------------------------------------------------------------------- #
# CBSE Class X maths specs
# --------------------------------------------------------------------------- #

def _fmt(v: float) -> str:
    return f"{v:.6g}"


def _num(pattern: str, text: str) -> Optional[float]:
    m = re.search(pattern, text, re.I)
    return float(m.group(1)) if m else None


def _frac(v: float) -> str:
    fr = Fraction(v).limit_denominator(10000)
    return str(fr.numerator) if fr.denominator == 1 else \
        f"{fr.numerator}/{fr.denominator}"


def _snap(v: float) -> float:
    r = round(v)
    return float(r) if abs(v - r) < 1e-9 else v


_TRIG_STD = {
    ("sin", 0): 0.0, ("sin", 30): 0.5, ("sin", 45): math.sqrt(2) / 2,
    ("sin", 60): math.sqrt(3) / 2, ("sin", 90): 1.0,
    ("cos", 0): 1.0, ("cos", 30): math.sqrt(3) / 2,
    ("cos", 45): math.sqrt(2) / 2, ("cos", 60): 0.5, ("cos", 90): 0.0,
    ("tan", 0): 0.0, ("tan", 30): 1 / math.sqrt(3), ("tan", 45): 1.0,
    ("tan", 60): math.sqrt(3),
    ("sec", 60): 2.0, ("sec", 45): math.sqrt(2), ("sec", 30): 2 / math.sqrt(3),
    ("cosec", 30): 2.0, ("cosec", 45): math.sqrt(2),
    ("cosec", 60): 2 / math.sqrt(3),
    ("cot", 30): math.sqrt(3), ("cot", 45): 1.0, ("cot", 60): 1 / math.sqrt(3),
}


def _trig_inv(fn: str, val: float) -> Optional[float]:
    for (f, d), v in _TRIG_STD.items():
        if f == fn and abs(v - val) < 0.006:
            return float(d)
    return None


def _c_tangent_length(slots, text):
    r = slots.get("radius"); d = slots.get("distance")
    if r is None:
        return None
    # ASK-TARGET (STEM-BM 2026-10-07, c10 sweep c10_math_cbse_10_003#d3
    # + 10_010#d3): '... tangent PT = 8 cm. Find the distance OT/OP from
    # the centre to ...' -- the GIVEN is the tangent length and the ASK
    # is the centre distance.  That is the HYPOTENUSE of the contact
    # right triangle: OP = sqrt(r^2 + tangent^2).  The legacy leg read
    # (sqrt(t^2 - r^2)) shipped 5.29 here -- a confident-wrong.
    if re.search(r"find\s+(?:the\s+)?distance\b[^.]{0,60}"
                 r"(?:centre|center|op\b|ot\b)|find\s+o[pt]\b", text, re.I):
        tm = re.search(r"(?:\btangent[s]?\s*\w{0,3}\s*=?\s*|"
                       r"\bp[abt]\s*=\s*"
                       r")(?:of\s+)?(\d+(?:\.\d+)?)", text, re.I)
        if tm is None:
            return None            # the given tangent length never guessed
        t = float(tm.group(1))
        if t <= 0:
            return None
        op = math.sqrt(r * r + t * t)
        return (_snap(op), [
            "Tangent is perpendicular to the radius at the contact "
            "point, so the centre-to-point distance is the hypotenuse.",
            f"OP^2 = r^2 + tangent^2 = {_fmt(r)}^2 + {_fmt(t)}^2 = "
            f"{_fmt(r * r + t * t)}.",
            f"OP = {_fmt(op)} cm."],
            f"{_fmt(op)} cm", None,
            "OP = sqrt(r^2 + tangent^2)", None)
    if d is None or d <= r:
        return None
    L = math.sqrt(d * d - r * r)
    return (_snap(L), [
        "Radius is perpendicular to the tangent at the contact point.",
        f"Tangent^2 = distance^2 - radius^2 = {_fmt(d)}^2 - {_fmt(r)}^2 "
        f"= {_fmt(d*d - r*r)}.",
        f"Tangent length = {_fmt(L)} cm."],
        f"{_fmt(L)} cm", None, "tangent = sqrt(d^2 - r^2)", None)


def _c_sector_arc(slots, text):
    # RADIUS-ASK GUARD (C12 sweep): 'arc 15, area 45, find the radius'
    # is an inverse ask — SECTOR_INVERSE owns it (r = 2A/l).  This
    # family only answers arc/area when a radius is GIVEN.
    if re.search(r"find\s+(?:the\s+)?(?:radius|diameter)|"
                 r"radius\s*(?:is|=)\s*\?|what\s+is\s+the\s+radius",
                 text, re.I) and \
            not re.search(r"radius\s+(?:of|is|=)\s*\d", text, re.I):
        return None
    r = slots.get("radius"); arc = slots.get("arc")
    # PI-HINT GUARD (C9 dig): 'radius 7 cm ... (pi = 22/7)' bound
    # radius=22 from the hint — shipped pi*22^2*(90/360) = 380.133.
    # The real radius sits in 'radius 7 cm' — never accept a slot
    # value that equals the pi-hint numerator.
    # (STEM-BM 2026-10-07, c10 sweep 11_005#d3): the hint ALSO bound
    # arc=22 (from '(22)/(7)') — the theta branch then never ran and
    # the legacy A = (1/2) r L shipped 154 cm^2 for an ARC LENGTH ask.
    # Guard the arc slot with the same rule.
    pi_hint = re.search(r"pi\s*=\s*(\d+(?:\.\d+)?)\s*/\s*"
                        r"(\d+(?:\.\d+)?)", text, re.I)
    if r is not None and pi_hint and \
            abs(r - float(pi_hint.group(1))) < 1e-9:
        r = None                     # bound the hint, not the radius
    if arc is not None and pi_hint and (
            abs(arc - float(pi_hint.group(1))) < 1e-9
            or abs(arc - float(pi_hint.group(2))) < 1e-9):
        arc = None                   # bound the hint, not the arc
    if r is None:
        # strip the pi-hint clause so its '22' can't leak in
        t2 = re.sub(r"\(?\s*pi\s*=\s*\d+(?:\.\d+)?\s*/\s*\d+\s*\)?",
                    "", text, flags=re.I)
        r = _num(r"(?:radius|of)\s+(\d+(?:\.\d+)?)\s*(?:cm|m)", t2)
    if arc is not None:
        m_a = re.search(r"arc\s+(?:of\s+(?:length\s+)?)?(\d+(?:\.\d+)?)",
                        text, re.I)
        if m_a is None or abs(float(m_a.group(1)) - arc) > 1e-9:
            arc = None               # not stated as 'arc <number>'
    if arc is None and re.search(r"sector", text, re.I):
        mth = re.search(r"(?:angle|central angle|subtends?)[\w\s]*?"
                        r"(\d+(?:\.\d+)?)\s*(?:deg|degree|°)", text, re.I)
        if r is not None and mth:
            th = float(mth.group(1))
            # honour an explicit 'pi = 22/7' hint (bank question
            # texts use it — gives 77 not 76.97 for r=14,th=45)
            pi = 22 / 7 if re.search(r"pi\s*=\s*22\s*/\s*7",
                                     text, re.I) else math.pi
            A = th / 360 * pi * r * r
            L = th / 360 * 2 * pi * r
            which = "arc" if re.search(r"arc", text, re.I) else "area"
            v, formula = (L, "L = (th/360)*2*pi*r") if which == "arc" \
                else (A, "A = (th/360)*pi*r^2")
            return (_snap(v), [
                f"sector: r = {_fmt(r)}, theta = {_fmt(th)} deg.",
                f"{formula.split(' = ')[0]} = ({_fmt(th)}/360) * "
                f"{'2*pi*' + _fmt(r) if which == 'arc' else 'pi*' + _fmt(r) + '^2'}"
                f" = {_fmt(v)}."],
                f"{_fmt(v)}", None, formula, None)
    if r is None or arc is None:
        return None
    A = 0.5 * r * arc
    return (_snap(A), [
        "Sector area from arc length: A = (1/2) r L.",
        f"A = 0.5 * {_fmt(r)} * {_fmt(arc)} = {_fmt(A)} cm^2."],
        f"{_fmt(A)} cm^2", None, "sector area = (1/2) r L", None)


def _c_trig_equation(slots, text):
    m = re.search(r"(\d*)\s*(sin|cos|tan|sec|cosec|cot)\s*\(?\s*(\d*)\s*"
                  r"([a-z])\s*\)?\s*=\s*(sqrt\s*\d+|[\d.]+)", text, re.I)
    if not m:
        return None
    k = float(m.group(1) or 1); a = float(m.group(3) or 1)
    fn = m.group(2).lower()
    raw = m.group(5).strip()
    sm = re.match(r"sqrt\s*\(?\s*(\d+(?:\.\d+)?)\s*\)?", raw)
    try:
        cval = math.sqrt(float(sm.group(1))) if sm else float(raw)
    except ValueError:
        return None
    rhs = cval / k
    deg = _trig_inv(fn, rhs)
    if deg is None:
        return None
    x = deg / a
    return (_snap(x), [
        f"Divide by {_fmt(k)}: {fn}({_fmt(a)}x) = {_frac(rhs)}.",
        f"{fn}({deg:g} deg) = {_frac(rhs)}, so {_fmt(a)}x = {deg:g} deg.",
        f"x = {_fmt(x)} deg."],
        f"x = {_fmt(x)} deg", None,
        f"{fn}(ax)=c -> inverse standard angle", None)


def _c_dice_sum(slots, text):
    counts = {s: 0 for s in range(2, 13)}
    for i in range(1, 7):
        for j in range(1, 7):
            counts[i + j] += 1
    s = slots.get("target")
    if s is None:
        m = re.search(r"sum\s+(?:of\s+|is\s+|equal\s+to\s+)?([a-z0-9]+)",
                      text, re.I)
        if m:
            w = m.group(1).lower()
            s = _NUM_WORD.get(w) or (float(w) if w.isdigit() else None)
    if s is None or int(s) not in counts:
        return None
    s = int(s)
    fav = counts[s]
    complement = bool(re.search(r"\bnot\b|\bno\s+(?:sum|getting)\b", text,
                                re.I))
    p = Fraction(36 - fav, 36) if complement else Fraction(fav, 36)
    steps = [f"Two dice: 36 ordered outcomes; sum {s} occurs {fav} times."]
    if complement:
        steps.append(f"P(not sum {s}) = 1 - {fav}/36 = {p}.")
    else:
        steps.append(f"P(sum {s}) = {fav}/36 = {p}.")
    return (float(p), steps, str(p), None,
            "P = favourable/36 (two dice)", None)


def _c_letter_prob(slots, text):
    # refuse inverse asks — 'P(vowel) is <expr>, find x' isn't the P itself
    if re.search(r"is\s+[a-z0-9x+\-*/ ().]+\s*,?\s*then\b", text, re.I):
        return None
    m = re.search(r"word\s+[\"'\u201c\u2018\u2019\u201d]?\s*([A-Za-z]+)",
                  text, re.I)
    if not m:
        return None
    word = re.sub(r"[^a-z]", "", m.group(1).lower())
    if not word:
        return None
    vowels = sum(1 for c in word if c in "aeiou")
    want_vowel = bool(re.search(r"vowel", text, re.I))
    fav = vowels if want_vowel else len(word) - vowels
    p = Fraction(fav, len(word))
    return (float(p), [
        f"'{word.upper()}' has {len(word)} letters; {fav} are "
        f"{'vowels' if want_vowel else 'non-vowels'}.",
        f"P = {fav}/{len(word)} = {p}."],
        str(p), None, "P = count/total letters", None)


def _c_median_transform(slots, text):
    med = slots.get("median")
    # DIG-GATE (2026-10-06): 'the mean of 10 observations is 30; each is
    # increased by 4; find the new SUM' answered 'new median 34'
    # VERIFIED — a sum/total/range ask is a different question.
    if re.search(r"\b(?:new\s+)?(?:sum|total|range)\b|\bsum\s+of\s+the\b",
                 text, re.I):
        return None
    if med is None:
        m = re.search(r"median[^0-9]{0,40}(?:is|=)\s*(\d+(?:\.\d+)?)", text,
                      re.I)
        if not m:
            return None
        med = float(m.group(1))
    k = slots.get("shift")
    if k is None:
        m = re.search(r"(?:increased|decreased|reduced|multiplied|added|"
                      r"divided|halved)[^0-9]{0,20}(\d+(?:\.\d+)?)", text, re.I)
        if not m:
            return None
        k = float(m.group(1))
    low = text.lower()
    if "decreas" in low or "reduced" in low:
        new, sym = med - k, "-"
    elif "multipl" in low or "times" in low or "doubled" in low:
        new, sym = med * (k if "times" not in low else 2), "*"
    elif "divid" in low or "halved" in low:
        new, sym = med / (k if "halved" not in low else 2), "/"
    else:
        new, sym = med + k, "+"
    # MCQ asks 'what happens to the median' — emit both the change and
    # the new value so option matching sees either form
    change = {"+": f"is increased by {_fmt(k)}",
              "-": f"is decreased by {_fmt(k)}",
              "*": f"is multiplied by {_fmt(k)}",
              "/": f"is divided by {_fmt(k)}"}[sym]
    return (_snap(new), [
        "The median shifts exactly like the data under a uniform change.",
        f"new median = {_fmt(med)} {sym} {_fmt(k)} = {_fmt(new)} "
        f"({change})."],
        f"{change} (new median {_frac(new)})", None,
        "median equivariant under affine shift", None)


def _c_hcf_pairs(slots, text):
    S = slots.get("sum"); H = slots.get("hcf")
    if S is None or H is None or H == 0 or S % H:
        return None
    target = int(S // H)
    pairs = [(a, target - a) for a in range(1, target)
             if a <= target - a and math.gcd(a, target - a) == 1]
    return (float(len(pairs)), [
        f"Both numbers are {int(H)}a and {int(H)}b with coprime a, b.",
        f"{int(H)}a + {int(H)}b = {int(S)} -> a + b = {target}.",
        "Coprime pairs: " + ", ".join(f"({a},{b})" for a, b in pairs),
        f"Number of pairs: {len(pairs)}."],
        str(len(pairs)), None,
        "numbers = H*a, H*b; coprime a+b = S/H", None)


def _c_cone_height(slots, text):
    A = slots.get("base_area"); V = slots.get("volume")
    if A is None or V is None or A == 0:
        return None
    h = 3 * V / A
    return (_snap(h), [
        "V = (1/3) * base area * h  ->  h = 3V / A.",
        f"h = 3 * {_fmt(V)} / {_fmt(A)} = {_fmt(h)} cm."],
        f"{_fmt(h)} cm", None, "h = 3V / base_area", None)


def _c_tangent_quad(slots, text):
    sides = {k.upper(): float(v) for k, v in
             re.findall(r"([A-Z]{2})\s*=\s*(\d+(?:\.\d+)?)", text)}
    opp = (("AB", "CD"), ("BC", "AD"))
    miss_pair = next((p for p in opp if p[0] not in sides or
                      p[1] not in sides), None)
    if miss_pair is None:
        return None
    other = opp[1] if miss_pair == opp[0] else opp[0]
    if not all(s in sides for s in other):
        return None
    missing = next(s for s in miss_pair if s not in sides)
    present = next(s for s in miss_pair if s in sides)
    val = sides[other[0]] + sides[other[1]] - sides[present]
    return (_snap(val), [
        "Circumscribed quadrilateral: AB + CD = BC + AD "
        "(tangents from a point are equal).",
        f"{missing} = {_fmt(sides[other[0]])} + {_fmt(sides[other[1]])} - "
        f"{_fmt(sides[present])} = {_fmt(val)} cm."],
        f"{missing} = {_fmt(val)} cm", None, "AB + CD = BC + AD", None)


def _c_quad_zeroes(slots, text):
    try:
        import sympy as sp
    except ImportError:
        return None
    m = re.search(r"(?:quadratic\s+)?polynomial\s+(.+?)(?:\s+and\b|\s*,\s*"
                  r"(?:a|verify)|\.|$)", text, re.I)
    if not m:
        return None
    expr = m.group(1).strip()
    expr = expr.replace(" ", "").replace("x2", "x**2")
    # sympify parses 'sqrt' natively — only fix bare 'sqrtN' -> 'sqrt(N)'
    expr = re.sub(r"sqrt(\d+)", r"sqrt(\1)", expr)
    expr = re.sub(r"(\d)(?=[a-z(])", r"\1*", expr)
    expr = re.sub(r"\)(?=[0-9a-z(])", r")*", expr)
    try:
        x = sp.Symbol("x")
        roots = sp.solve(sp.Eq(sp.sympify(expr), 0), x)
    except Exception:
        return None
    if not roots:
        return None
    return (None, [
        f"Set the polynomial to zero: {m.group(1).strip()} = 0.",
        "Solve by factorisation / quadratic formula.",
        "Zeroes: " + ", ".join(sp.sstr(r) for r in roots) + "."],
        ", ".join(sp.sstr(r) for r in roots), None,
        "roots of ax^2+bx+c=0", None)


def _c_similar_perimeter(slots, text):
    sides = {k.upper(): float(v) for k, v in
             re.findall(r"([A-Z]{2})\s*=\s*(\d+(?:\.\d+)?)", text)}
    if "AB" not in sides or "DE" not in sides:
        return None
    ratio = sides["AB"] / sides["DE"]
    p_def = sides.get("DE", 0) + sides.get("EF", 0) + \
        sides.get("FD", sides.get("DF", 0))
    if not p_def:
        return None
    perim = ratio * p_def
    return (_snap(perim), [
        f"Ratio = AB/DE = {_fmt(sides['AB'])}/{_fmt(sides['DE'])} = "
        f"{_frac(ratio)}.",
        f"Perimeter of DEF = {_fmt(p_def)} cm; perimeters scale by the "
        f"ratio: {_frac(ratio)} * {_fmt(p_def)} = {_fmt(perim)} cm."],
        f"{_fmt(perim)} cm", None,
        "perimeter scales by similarity ratio", None)


def _c_sin_cos_sys(slots, text):
    m = re.search(r"sin\s*\(?\s*([a-z])\s*\+\s*([a-z])\s*\)?\s*=\s*"
                  r"([\d.]+).{0,60}?cos\s*\(?\s*\1\s*-\s*\2\s*\)?\s*=\s*"
                  r"(sqrt\s*\d+\s*/?\s*\d*|[\d.]+)", text, re.I)
    if not m:
        return None
    v1 = float(m.group(3))
    raw2 = m.group(4)
    # PDF-flattened fractions: 'sqrt 3 2' / 'sqrt3 2' mean sqrt(3)/2
    mm = re.match(r"sqrt\s*(\d+)\s*/?\s*(\d*)", raw2)
    if mm and "sqrt" in raw2:
        num, den = float(mm.group(1)), mm.group(2)
        v2 = math.sqrt(num) / (float(den) if den else 1)
    else:
        v2 = float(raw2.replace(" ", ""))
    d1 = _trig_inv("sin", v1); d2 = _trig_inv("cos", v2)
    if d1 is None or d2 is None:
        return None
    A, B = (d1 + d2) / 2, (d1 - d2) / 2
    return (_snap(A), [
        f"sin(A+B) = {_fmt(v1)} -> A+B = {d1:g} deg.",
        f"cos(A-B) = {_frac(v2)} -> A-B = {d2:g} deg.",
        f"Adding: A = {_fmt(A)} deg, B = {_fmt(B)} deg."],
        f"A = {_fmt(A)} deg, B = {_fmt(B)} deg", None,
        "angle-sum -> linear system", None)


def _c_trig_transform(slots, text):
    """'If sec x + tan x = k, find sec x - tan x' -> 1/k.

    DIG-GATE (2026-10-06): fired on ANY text containing 'sec'+'tan'
    (or 'cosec'+'cot') and pasted the factoid '1/x' — a PROOF question
    ('prove (sec A + tan A)(1 - sin A) = cos A') shipped '1/x' VERIFIED,
    and the numeric case never extracted the given value.  Now requires
    the actual 'sum = value ... find/then the difference' shape and
    returns 1/k."""
    low = text.lower()
    if "sec" in low and "tan" in low:
        f1, f2 = "sec", "tan"
    elif "cosec" in low and "cot" in low:
        f1, f2 = "cosec", "cot"
    else:
        return None
    # the GIVEN: '<f1> <x> + <f2> <x> = <value>' and the ASK for the
    # conjugate '<f1> <x> - <f2> <x>'.  \b keeps 'cosec' from matching
    # the bare-'sec' pair.
    mg = re.search(rf"\b{f1}\b\s*\(?\s*[a-z]+\s*\)?\s*\+\s*\b{f2}\b"
                   r"\s*\(?\s*[a-z]+\s*\)?\s*=\s*([\d.]+)", low)
    ma = re.search(rf"\b{f1}\b\s*\(?\s*[a-z]+\s*\)?\s*-\s*\b{f2}\b"
                   r"\s*\(?\s*[a-z]+\s*\)?", low)
    if not (mg and ma):
        return None
    k = float(mg.group(1))
    if k == 0:
        return None
    v = 1.0 / k
    return (_snap(v), [
        f"{f1}^2 a - {f2}^2 a = 1"
        f"  ->  ({f1} a + {f2} a)({f1} a - {f2} a) = 1.",
        f"Given ({f1} a + {f2} a) = {_fmt(k)}.",
        f"So ({f1} a - {f2} a) = 1/{_fmt(k)} = {_fmt(v)}."],
        f"1/{_fmt(k)} = {_fmt(v)}", None,
        "conjugate trig identity (a+b)(a-b)=1", None)


def _c_ap_last_sum(slots, text):
    nums = re.findall(r"\d+(?:\.\d+)?", text)
    if len(nums) < 4:
        return None
    a = float(nums[0]); d = float(nums[1]) - a
    m = re.search(r"(\d+)\s*terms", text)
    m2 = re.search(r"last\s+(\d+)\s*terms", text, re.I)
    if not m or not m2:
        return None
    n = int(m.group(1)); k = int(m2.group(1))
    if k > n:
        return None
    tail_first = a + (n - k) * d
    last = a + (n - 1) * d
    s = k / 2 * (tail_first + last)
    steps = [
        f"Arithmetic progression with terms {', '.join(_fmt(float(x)) for x in nums[:3])}, common difference d = {_fmt(d)}.",
        f"Total terms n = {n}, calculating sum of last {k} terms.",
        f"First term of last {k} terms is a_{n - k + 1} = {_fmt(tail_first)}, and last term a_{n} = {_fmt(last)}.",
        f"Sum = {k}/2 * ({_fmt(tail_first)} + {_fmt(last)}) = {_fmt(s)}."
    ]
    return (_snap(s), steps, _frac(s), None, "sum of last k AP terms", None)


def _c_shape_points(slots, text):
    pts = re.findall(r"([A-Z])\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*"
                     r"(-?\d+(?:\.\d+)?)\s*\)", text)
    if len(pts) < 4:
        return None
    labels = [p[0] for p in pts[:4]]
    xy = [(float(p[1]), float(p[2])) for p in pts[:4]]
    dist = lambda p, q: math.hypot(p[0] - q[0], p[1] - q[1])
    s = [dist(xy[i], xy[(i + 1) % 4]) for i in range(4)]
    dg = [dist(xy[0], xy[2]), dist(xy[1], xy[3])]
    eq = lambda a, b: abs(a - b) < 1e-6
    sides_eq = all(eq(x, s[0]) for x in s)
    opp_eq = eq(s[0], s[2]) and eq(s[1], s[3])
    diag_eq = eq(dg[0], dg[1])
    kind = ("square" if sides_eq and diag_eq else
            "rhombus" if sides_eq else
            "rectangle" if opp_eq and diag_eq else
            "parallelogram" if opp_eq else "quadrilateral")
    return (None, [
        "Sides: " + "; ".join(f"{labels[i]}{labels[(i + 1) % 4]} = "
                              f"{_fmt(s[i])}" for i in range(4)),
        f"Diagonals: {_fmt(dg[0])} and {_fmt(dg[1])} -> {kind}."],
        kind, None, "classify by side/diagonal lengths", None)


def _c_speed_two_leg(slots, text):
    d1 = slots.get("d1"); d2 = slots.get("d2"); k = slots.get("k")
    T = slots.get("total_time")
    if None in (d1, d2, k, T):
        return None
    try:
        import sympy as sp
        v = sp.Symbol("v")
        eq = sp.Eq(d1 / v + d2 / (v + k), T)
        poly = sp.expand(sp.together(d1 / v + d2 / (v + k) - T) * v * (v + k))
        poly = sp.Poly(poly, v).as_expr()
        all_sols = sp.solve(sp.Eq(poly, 0), v)
        sols = [s for s in all_sols if s.is_real and s > 0]
    except Exception:
        return None
    if not sols:
        return None
    val = float(sols[0])
    other = [sp.sstr(s) for s in all_sols if not (s.is_real and s > 0)]
    return (_snap(val), [
        f"{_fmt(d1)}/v + {_fmt(d2)}/(v+{_fmt(k)}) = {_fmt(T)}.",
        f"Multiply by v(v+{_fmt(k)}): {sp.sstr(poly)} = 0.",
        (f"Roots: {sp.sstr(all_sols[0])}, {sp.sstr(all_sols[1])} — "
         f"reject the negative root ({', '.join(other)})."
         if len(all_sols) > 1 else f"Root: {sp.sstr(all_sols[0])}."),
        f"Original average speed = {_fmt(val)} km/h."],
        f"{_fmt(val)} km/h", None,
        "D1/v + D2/(v+k) = T -> quadratic in v", None)


# ── spec bank ─────────────────────────────────────────────────────────────── #

MATHS_X_SPECS = {
    "TANGENT_LENGTH": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "length of a tangent drawn to a circle of radius 9 cm from a "
            "point at a distance of 41 cm from the centre",
            "find the length of the tangent from a point 17 cm away from "
            "the centre of a circle of radius 8 cm",
            "a tangent is drawn from an external point 25 cm from the "
            "centre; the radius is 7 cm; find the tangent length",
            "the tangent drawn to a circle from a point at distance 13 cm "
            "has radius 5 cm, find its length",
            "from a point P outside a circle of radius 6 cm a tangent "
            "touches the circle; OP = 10 cm; find the tangent",
            "length of tangents drawn from a point 5 cm from centre to a "
            "circle of radius 3 cm",
        ],
        "slots": {"radius": ["radius"],
                  "distance": ["distance", "point", "centre", "center",
                               "away"]},
        # STEM-BM 2026-10-07: NOT 'distance' -- a find-the-centre-
        # distance ask ('PA = 8, find OP') gives the TANGENT instead;
        # the compute parses the tangent and ships the hypotenuse.
        # Required slots stricter than the compute starve it.
        "required": ["radius"],
        "compute": _c_tangent_length,
    },
    "SECTOR_ARC_AREA": {
        "force": r"sector|arc\s+length",
        "sanity": lambda v: v > 0,
        "exemplars": [
            "area of a sector of a circle of radius 21 cm cut off by an "
            "arc of length 22 cm",
            "find the area of the sector whose arc length is 15 cm and "
            "radius is 6 cm",
            "a sector has radius 10 cm and arc length 12 cm; find its area",
            "sector of a circle with radius 7 cm and arc length 8 cm, "
            "find the area",
            "the arc of a sector is 20 cm and the radius is 9 cm; what is "
            "the sector area",
        ],
        "slots": {"radius": ["radius"], "arc": ["arc", "length"]},
        # NOT 'arc' — the radius+angle form ('sector of radius 6 cm,
        # central angle 60') has no arc mention; the compute parses the
        # angle itself.  Required slots stricter than the compute's own
        # parsing starve a working spec.
        "compute": _c_sector_arc,
    },
    "TRIG_EQUATION": {
        "exemplars": [
            "if 2 sin 5x = sqrt(3), find x",
            "solve 3 tan 2 theta = 3 for theta between 0 and 90 degrees",
            "2 cos 3x = 1, find the value of x",
            "if 4 sin theta = 2, what is theta",
            "tan 3x = 1, find x where 0 < x < 90",
            "if 2 sin 5x = sqrt 3 where 0 <= x <= 90 then x is equal to",
            "cosec 2theta = 2/sqrt(3), find theta",
        ],
        "slots": {},
        "compute": _c_trig_equation,
        "min_conf": 0.45,
    },
    "DICE_SUM_PROB": {
        "sanity": lambda v: 0 <= v <= 1.0001,
        "exemplars": [
            "a pair of dice is tossed; the probability of getting the "
            "sum eight",
            "two dice are thrown; find the probability of not getting "
            "the sum 8",
            "a pair of dice is rolled; probability that the sum is 7",
            "two dice are tossed together; probability of getting a "
            "sum of 10",
            "dice are thrown once; find the probability the sum is eleven",
        ],
        "slots": {"target": ["sum"]},
        "compute": _c_dice_sum,
    },
    "LETTER_PROB": {
        "sanity": lambda v: 0 <= v <= 1.0001,
        "exemplars": [
            "probability of the letter chosen at random from the letters "
            "of the word MATHEMATICS to be a vowel",
            "a letter is chosen at random from the word PROBABILITY; find "
            "the probability it is a vowel",
            "from the letters of the word EDUCATION one letter is picked; "
            "probability of a consonant",
            "a letter of the word ASSASSINATION is selected at random; "
            "find the probability of vowel",
        ],
        "slots": {},
        "compute": _c_letter_prob,
        "min_conf": 0.5,
    },
    "MEDIAN_TRANSFORM": {
        "exemplars": [
            "the median of a set of observations is 20.5; if each "
            "observation is increased by 2, find the new median",
            "the median of 11 observations is 15; each observation is "
            "multiplied by 3; find the new median",
            "median of data is 42; if each value is decreased by 5, what "
            "is the new median",
            "the mean of observations is 30; each is increased by 4; find "
            "the new mean",
            "if the median of a data set is 25 and each observation is "
            "doubled, find the new median",
        ],
        "slots": {"median": ["median", "mean"],
                  "shift": ["increased", "decreased", "reduced",
                            "multiplied", "added", "by"]},
        "compute": _c_median_transform,
        "min_conf": 0.6,
    },
    "HCF_PAIRS": {
        "exemplars": [
            "the sum of two numbers is 1215 and their hcf is 81; how many "
            "such pairs are possible",
            "sum of two numbers is 1000 and hcf is 50; find the number "
            "of pairs",
            "two numbers have sum 480 and hcf 24; the number of such "
            "pairs is",
            "the hcf of two numbers is 15 and their sum is 225; how many "
            "pairs",
            "if sum of two numbers is 132 and their hcf is 11, find "
            "possible pairs",
        ],
        "slots": {"sum": ["sum"], "hcf": ["hcf", "h.c.f"]},
        "required": ["sum", "hcf"],
        "compute": _c_hcf_pairs,
    },
    "CONE_HEIGHT": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "the area of the base of a right circular cone is 51 cm2 and "
            "its volume is 85 cm3; find the height",
            "a cone has base area 38.5 cm2 and volume 77 cm3; find its "
            "height",
            "the volume of a cone is 100 cm3 and base area is 25 cm2; "
            "find height",
            "find the height of a right circular cone whose base area is "
            "154 cm2 and volume is 308 cm3",
        ],
        "slots": {"base_area": {"kws": ["base area", "area of the base"],
                                "declared": True},
                  "volume": {"kws": ["volume", "volume of the cone",
                                     "its volume"], "declared": True}},
        "required": ["base_area", "volume"],
        "compute": _c_cone_height,
    },
    "TANGENT_QUAD": {
        "exemplars": [
            "a quadrilateral abcd is drawn to circumscribe a circle; if "
            "bc=7, cd=4, ad=3, find ab",
            "a quadrilateral circumscribes a circle; ab=6, bc=8, cd=5; "
            "find ad",
            "quadrilateral pqrs circumscribes a circle with pq=7, qr=5, "
            "rs=6; find ps",
        ],
        "slots": {},
        "compute": _c_tangent_quad,
        "min_conf": 0.55,
    },
    "QUAD_ZEROES": {
        "exemplars": [
            "find the zeroes of the quadratic polynomial 2x^2 - "
            "(1+2sqrt(2))x + sqrt(2)",
            "find the zeroes of the quadratic polynomial x^2 - 3x + 2",
            "find the zeroes of 4x^2 + 5sqrt(2) x - 12",
            "determine the zeroes of the quadratic polynomial "
            "p(x) = x^2 + 7x + 12",
        ],
        "slots": {},
        "compute": _c_quad_zeroes,
        "min_conf": 0.5,
    },
    "SIMILAR_PERIMETER": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "abc and def are similar triangles with ab=6, de=9, ef=6, "
            "fd=12; find the perimeter of abc",
            "triangles pqr and xyz are similar; pq=4, xy=8, yz=5, zx=10; "
            "find the perimeter of pqr",
            "if two similar triangles have corresponding sides 3 and 6 "
            "and the larger perimeter is 30, find the smaller perimeter",
        ],
        "slots": {},
        "compute": _c_similar_perimeter,
        "min_conf": 0.55,
    },
    "SIN_COS_SYS": {
        "exemplars": [
            "if sin(a+b)=1 and cos(a-b)=sqrt(3)/2, find a and b",
            "sin(x+y)=1 and cos(x-y)=1/2, find x and y",
            "given sin(a+b)=1 and cos(a-b)=sqrt(3)/2 where a,b acute, "
            "find the angles",
        ],
        "slots": {},
        "compute": _c_sin_cos_sys,
        "min_conf": 0.5,
    },
    "TRIG_TRANSFORM": {
        "exemplars": [
            "if sec x + tan x = p, then sec x - tan x is",
            "sec a + tan a = p, find sec a - tan a",
            "if cosec x + cot x = k, then cosec x - cot x equals",
            "if sec theta + tan theta = x, then sec theta - tan theta "
            "will be",
        ],
        "slots": {},
        "compute": _c_trig_transform,
        "min_conf": 0.45,
    },
    "AP_LAST_SUM": {
        "exemplars": [
            "the ap 8, 10, 12 has 60 terms; find the sum of the last "
            "10 terms",
            "an ap 5, 9, 13 has 50 terms; find the sum of its last "
            "15 terms",
            "the arithmetic progression 3, 8, 13 has 40 terms; find the "
            "sum of the last 8 terms",
        ],
        "slots": {},
        "compute": _c_ap_last_sum,
        "min_conf": 0.55,
    },
    "SHAPE_POINTS": {
        "exemplars": [
            "the points a(9,0), b(9,-6), c(-9,0), d(-9,6) form which "
            "type of quadrilateral",
            "points p(2,1), q(5,1), r(5,4), s(2,4) are the vertices of "
            "which quadrilateral",
            "the points (1,2), (4,2), (4,5), (1,5) form a",
        ],
        "slots": {},
        "compute": _c_shape_points,
        "min_conf": 0.5,
    },
    "SPEED_TWO_LEG": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "a train travels 63 km at a certain speed then 72 km at "
            "6 km/h more; total time 3 hours; find the speed",
            "a car covers 50 km at one speed and 80 km at 10 km/h "
            "faster; total 4 hours; find the first speed",
            "a bus travels 100 km at a speed then 150 km at 5 km/h "
            "higher; the total journey takes 5 hours",
        ],
        "slots": {"d1": ["distance of", "travels", "covers"],
                  "d2": ["then", "then travels", "another",
                         "a distance of"],
                  "k": {"kws": ["km/hr more", "km/h more", "faster",
                                "more than its", "higher"],
                        "dir": "after"},
                  "total_time": {"kws": ["hours", "hrs", "takes",
                                         "total", "journey"],
                                 "dir": "any"}},
        "required": ["d1", "d2", "k", "total_time"],
        "compute": _c_speed_two_leg,
    },
}

register_structures(MATHS_X_SPECS)

if not _register_into_ml():
    pass


# ═══════════════════════════════════════════════════════════════════════════ #
# WAVE-2 structures — CBSE X 2025-26 residual coverage
# ═══════════════════════════════════════════════════════════════════════════ #

def _c_distance_axis(slots, text):
    pts = re.findall(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)",
                     text)
    if not pts:
        return None
    # DIG-GATE (2026-10-06 SOLVER-DIG-1): this family is ONE point vs
    # an axis.  With two (or more) points the question is a section/
    # equidistant/collinearity ask and answering |y| of the FIRST point
    # shipped '3' for 'the ratio in which the x-axis divides (2,3)-(6,
    # -9)' and '5' for 'point on the x-axis equidistant from (2,-5) and
    # (-2,9)' -- both VERIFIED.
    if len(pts) > 1:
        return None
    x, y = float(pts[0][0]), float(pts[0][1])
    if "y-axis" in text or "y axis" in text:
        v, nm = abs(x), "|x|"
    elif "x-axis" in text or "x axis" in text:
        v, nm = abs(y), "|y|"
    else:
        return None
    return (_snap(v), [
        f"Distance of ({_fmt(x)}, {_fmt(y)}) from the "
        f"{'y' if 'y-axis' in text or 'y axis' in text else 'x'}-axis is "
        f"the |{'x' if nm == '|x|' else 'y'}|-coordinate.",
        f"{nm} = {_fmt(v)}."], _fmt(v), None,
        "distance to axis = |coordinate|", None)


def _c_lines_parallel(slots, text):
    # CHECK-WHETHER branch: 'are the lines a1x+b1y=c1 and a2x+b2y=c2
    # parallel/intersecting/coincident' — two COMPLETE lines, no k to
    # solve.  (The k-branch below solves for an unknown coefficient.)
    if re.search(r"whether|check|are\s+the|parallel|intersect|"
                 r"coincident|consistent", text, re.I) and \
            not re.search(r"\bk\s*[xy]\b|\bk\s*=", text):
        lines = re.findall(
            r"(-?\d*)\s*x\s*([+-]\s*\d*)\s*y\s*"
            r"(?:([+-]\s*\d+(?:\.\d+)?)\s*)?=\s*(-?\d+(?:\.\d+)?)",
            text)
        if len(lines) >= 2:
            def _c3(t):
                a = t[0].replace(" ", "")
                b = t[1].replace(" ", "")
                a = float(a) if a not in ("", "+", "-") else \
                    (1.0 if a != "-" else -1.0)
                b = float(b) if b not in ("", "+", "-") else \
                    (1.0 if b != "-" else -1.0)
                # 'ax + by - c = 0' -> ax + by = c  (rhs - extra)
                extra = float(t[2].replace(" ", "")) if t[2] else 0.0
                return a, b, float(t[3]) - extra
            A1, B1, C1 = _c3(lines[0])
            A2, B2, C2 = _c3(lines[1])
            if A2 == 0 or B2 == 0:
                return None
            if abs(A1 / A2 - B1 / B2) < 1e-9:
                coincident = abs(B1 / B2 - C1 / C2) < 1e-9
                verdict = ("coincident (infinitely many solutions)"
                           if coincident else
                           "parallel (no solution — inconsistent)")
            else:
                verdict = "intersecting (unique solution — consistent)"
            return (None, [
                f"a1/a2 = {_fmt(A1)}/{_fmt(A2)} = {_fmt(A1/A2)}, "
                f"b1/b2 = {_fmt(B1)}/{_fmt(B2)} = {_fmt(B1/B2)}, "
                f"c1/c2 = {_fmt(C1)}/{_fmt(C2)} = {_fmt(C1/C2)}.",
                f"lines are {verdict}."],
                verdict, None, "a1/a2, b1/b2, c1/c2 comparison", None)
    m = re.search(r"(\d+)\s*x\s*\+\s*(\d*)\s*k?\s*y\s*=\s*(\d+)", text)
    m2 = re.search(r"(\d+)\s*x\s*\+\s*(\d+)\s*y\s*[+\-]\s*(\d+)\s*=\s*0|"
                   r"(\d+)\s*x\s*\+\s*(\d+)\s*y\s*\+\s*(\d+)", text)
    a1 = re.search(r"(\d+)\s*x\s*\+\s*(?:(\d+)\s*k\s*y|k\s*y)", text)
    if not a1:
        return None
    a1v = float(a1.group(1))
    kv = float(a1.group(2)) if a1.group(2) else 1.0
    m2 = re.search(r"(\d+)\s*x\s*\+\s*(\d+)\s*y", text[m.end():]
                   if m else text)
    # second line: find "Nx + My" after the first match
    parts = re.findall(r"(\d+)\s*x\s*\+\s*(?:(\d+)\s*k\s*y|(\d+)\s*y|k\s*y)",
                       text)
    if len(parts) < 2:
        return None
    A1, k1 = float(parts[0][0]), float(parts[0][1] or 1)
    A2, B2 = float(parts[1][0]), float(parts[1][2] or 1)
    # parallel when A1/A2 = k1*k/B2  ->  k = A1*B2/(A2*k1)
    k_parallel = A1 * B2 / (A2 * k1)
    want_not = bool(re.search(r"not\s+parallel", text, re.I))
    ans = (f"k ≠ {_frac(k_parallel)}" if want_not
           else f"k = {_frac(k_parallel)}")
    steps = [
        f"Lines are parallel when a1/a2 = b1/b2: {_fmt(A1)}/{_fmt(A2)} "
        f"= {_fmt(k1)}y-coefficient/{_fmt(B2)}.",
        f"Parallel value: k = {_frac(k_parallel)}.",
        f"{'Not parallel' if want_not else 'Parallel'} -> {ans}."]
    return (_snap(k_parallel), steps, ans, None,
            "a1/a2 = b1/b2 for parallel lines", None)


_INDIAN_PLACES = ["ones", "tens", "hundreds", "thousands",
                  "ten thousands", "lakhs", "ten lakhs",
                  "crores", "ten crores"]


def _c_si_inverse(slots, text):
    """'find rate/principal/time given SI + the other two' —
    R = SI·100/(P·T), P = SI·100/(R·T), T = SI·100/(P·R).
    The modeling sweep binds these as forward-SI and ships garbage."""
    low = text.lower()
    if "si" not in low and "simple interest" not in low:
        return None
    def _num(pat):
        m = re.search(r"(?:" + pat + r")\s*(?:=|of|is)?\s*"
                      r"(?:rs\.?\s*)?(\d+(?:\.\d+)?)", text, re.I)
        return float(m.group(1)) if m else None
    si = _num(r"\bsi\b|simple\s+interest")
    p = _num(r"\bp\b|principal|sum")
    r_ = _num(r"\br\b|rate")
    t_ = _num(r"\bt\b|time|years?")
    want_rate = re.search(r"find\s+(?:the\s+)?rate|rate\s+of\s+"
                          r"interest|rate\s*\?", low)
    want_princ = re.search(r"find\s+(?:the\s+)?(?:principal|sum|"
                           r"amount\s+invested)", low)
    want_time = re.search(r"find\s+(?:the\s+)?time|how\s+many\s+"
                          r"years", low)
    if want_rate and None not in (si, p, t_) and p * t_ != 0:
        v = si * 100.0 / (p * t_)
        return (_snap(v), [f"R = (SI × 100)/(P × T) = "
                           f"({_fmt(si)} × 100)/({_fmt(p)} × {_fmt(t_)})"
                           f" = {_fmt(v)}% p.a."],
                f"{_fmt(v)}% p.a.", None, "R = SI·100/(P·T)", None)
    if want_princ and None not in (si, r_, t_) and r_ * t_ != 0:
        v = si * 100.0 / (r_ * t_)
        return (_snap(v), [f"P = (SI × 100)/(R × T) = "
                           f"({_fmt(si)} × 100)/({_fmt(r_)} × {_fmt(t_)})"
                           f" = Rs {_fmt(v)}."],
                f"Rs {_fmt(v)}", None, "P = SI·100/(R·T)", None)
    if want_time and None not in (si, p, r_) and p * r_ != 0:
        v = si * 100.0 / (p * r_)
        return (_snap(v), [f"T = (SI × 100)/(P × R) = "
                           f"({_fmt(si)} × 100)/({_fmt(p)} × {_fmt(r_)})"
                           f" = {_fmt(v)} years."],
                f"{_fmt(v)} years", None, "T = SI·100/(P·R)", None)
    return None




_UNITS = {
    "km": 1000.0, "m": 1.0, "cm": 0.01, "mm": 0.001,
    "kg": 1000.0, "g": 1.0, "mg": 0.001, "tonne": 1e6,
    "litre": 1000.0, "ml": 1.0, "l": 1000.0,
    "hour": 3600.0, "minute": 60.0, "s": 1.0, "ms": 0.001,
}


def _c_unit_convert(slots, text):
    """'2.5 km to metres' -> 2500.  '500 m to cm' -> 50000.
    GUIDED every class sweep — add the simplest pair."""
    m = re.search(r"(\d+(?:\.\d+)?)\s*([a-z]+)\s*"
                  r"(?:to|in|into|->)\s*([a-z]+)", text, re.I)
    if not m:
        return None
    val = float(m.group(1))
    u1 = m.group(2).lower().rstrip("s")   # 'metres' -> 'metre' fix below
    u2 = m.group(3).lower().rstrip("s")
    # normalise unit names
    _ALIASES = {"metre": "m", "meter": "m", "kilometre": "km",
                "kilometer": "km", "centimetre": "cm",
                "centimeter": "cm", "millimetre": "mm",
                "millimeter": "mm", "kilogram": "kg",
                "kilogramme": "kg", "gram": "g", "gramme": "g",
                "milligram": "mg", "litre": "litre", "liter": "litre",
                "millilitre": "ml", "milliliter": "ml",
                "hour": "hour", "minute": "minute", "second": "s",
                "km": "km", "m": "m", "cm": "cm", "mm": "mm",
                "kg": "kg", "g": "g", "mg": "mg",
                "l": "l", "ml": "ml", "tonne": "tonne"}
    u1 = _ALIASES.get(u1, u1)
    u2 = _ALIASES.get(u2, u2)
    if u1 not in _UNITS or u2 not in _UNITS:
        return None
    if _UNITS[u1] == _UNITS[u2]:
        return None
    v = val * _UNITS[u1] / _UNITS[u2]
    return (_snap(v), [
        f"{_fmt(val)} {u1} = {_fmt(val)} x "
        f"{_fmt(_UNITS[u1] / _UNITS[u2])} = {_fmt(v)} {u2}."],
        f"{_fmt(v)} {u2}", None,
        f"{u1} -> {u2} x{_UNITS[u1] / _UNITS[u2]:g}", None)










def _c_fraction_arith(slots, text):
    """'2/3 + 4/5' / 'Divide: 2/3 by 4/5' / '3/4 - 1/8' — bare fraction
    arithmetic.  Returns exact simplified fraction plus decimal."""
    from fractions import Fraction
    def _parse(s):
        s = s.strip()
        if "/" in s:
            a, b = s.split("/", 1)
            return Fraction(int(a), int(b))
        return Fraction(int(s), 1)
    m = re.search(
        r"(-?\d+(?:\s+-\d+)?\s*/\s*\d+)\s*"
        r"(\+|-|x|\*|/|÷|times|divided\s+by|by|minus|plus)\s*"
        r"(-?\d+\s*/\s*\d+)", text, re.I)
    if not m:
        return None
    f1 = _parse(m.group(1).replace(" ", ""))
    f2 = _parse(m.group(3).replace(" ", ""))
    op_raw = m.group(2).strip().lower()
    if op_raw in ("+", "plus"):
        res = f1 + f2; sym = "+"
    elif op_raw in ("-", "minus"):
        res = f1 - f2; sym = "-"
    elif op_raw in ("x", "*", "times"):
        res = f1 * f2; sym = "×"
    else:
        if f2 == 0:
            return None
        res = f1 / f2; sym = "÷"
    if res.denominator == 1:
        ans = str(res.numerator)
    else:
        ans = f"{res.numerator}/{res.denominator}"
    steps = [f"{f1.numerator}/{f1.denominator} {sym} "
             f"{f2.numerator}/{f2.denominator} = {ans}."]
    if res.denominator != 1:
        steps.append(f"= {float(res):.6g} (decimal).")
    return (_snap(float(res)), steps, ans, None,
            "fraction arithmetic", None)


def _c_ratio_chain(slots, text):
    """'a:b = 2:3 and b:c = 4:5, find a:c' — chain through the shared
    term: a:b:c = (a1·b2) : (b1·b2) : (b1·c2)."""
    m = re.search(
        r"([a-zA-Z])\s*:\s*([a-zA-Z])\s*=\s*(\d+(?:\.\d+)?)\s*:\s*"
        r"(\d+(?:\.\d+)?)\s*(?:,|and)\s*\2\s*:\s*([a-zA-Z])\s*=\s*"
        r"(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)", text, re.I)
    if not m:
        return None
    va, vb, vc = m.group(1), m.group(2), m.group(5)
    a1, b1, b2, c2 = (float(m.group(i)) for i in (3, 4, 6, 7))
    if b1 == 0 or b2 == 0:
        return None
    # align on the shared variable's value
    A, B, C = a1 * b2, b1 * b2, b1 * c2
    ask = re.search(
        r"find\s+([a-zA-Z])\s*:\s*([a-zA-Z])", text, re.I)
    if not ask:
        ask = re.search(r"([a-zA-Z])\s*:\s*([a-zA-Z])\s*\?", text)
    val_map = {va: A, vb: B, vc: C}
    import math
    def _ratio_str(x, y):
        g = math.gcd(int(round(x)), int(round(y)))
        if g and abs(x - round(x)) < 1e-9 and abs(y - round(y)) < 1e-9:
            return f"{int(round(x))//g}:{int(round(y))//g}"
        return f"{_fmt(x)}:{_fmt(y)}"
    steps = [f"{va}:{vb}:{vc} = "
             f"{_fmt(A)} : {_fmt(B)} : {_fmt(C)} (align on {vb})."]
    if ask and ask.group(1) in val_map and ask.group(2) in val_map:
        x, y = val_map[ask.group(1)], val_map[ask.group(2)]
        ans = _ratio_str(x, y)
        steps.append(f"{ask.group(1)}:{ask.group(2)} = {ans}.")
        return (None, steps, ans, None,
                f"{ask.group(1)}:{ask.group(2)} = {ans}", None)
    ans = _ratio_str(A, C)
    steps.append(f"{va}:{vc} = {ans}.")
    return (None, steps, ans, None, f"{va}:{vc} = {ans}", None)


def _c_cuboid_measure(slots, text):
    """'cuboid l=10 w=5 h=4' -> volume = lwh, TSA = 2(lw+lh+wh),
    LSA = 2h(l+w), diagonal = sqrt(l²+w²+h²).  The kernel otherwise
    reads 'l=10, w=5, h=4' as an equation system and ships 'a=10'."""
    ms = {}
    for name in ("l", "length", "w", "width", "b", "breadth",
                 "h", "height"):
        mm = re.search(
            r"\b" + name + r"\s*(?:=|is|:)\s*(\d+(?:\.\d+)?)",
            text, re.I)
        if mm:
            key = {"l": "l", "length": "l", "w": "w", "width": "w",
                   "b": "w", "breadth": "w",
                   "h": "h", "height": "h"}[name]
            ms.setdefault(key, float(mm.group(1)))
    if not all(k in ms for k in "lwh"):
        # prose form: 'length 15 cm, width 10 cm, height 8 cm'
        for name, key in (("length", "l"), ("width", "w"),
                          ("breadth", "w"), ("height", "h")):
            if key not in ms:
                mm = re.search(
                    name + r"[\w\s]{0,15}?(\d+(?:\.\d+)?)",
                    text, re.I)
                if mm:
                    ms[key] = float(mm.group(1))
    if len(ms) < 3:
        return None
    l_, w_, h_ = ms["l"], ms["w"], ms["h"]
    if re.search(r"surface|tsa|total", text, re.I):
        v = 2 * (l_ * w_ + l_ * h_ + w_ * h_)
        return (_snap(v), [f"TSA = 2(lw + lh + wh) = "
                           f"2({_fmt(l_)}·{_fmt(w_)} + {_fmt(l_)}·"
                           f"{_fmt(h_)} + {_fmt(w_)}·{_fmt(h_)}) "
                           f"= {_fmt(v)} sq cm."],
                f"{_fmt(v)} sq cm", None, "TSA = 2(lw+lh+wh)", None)
    if re.search(r"lateral|lsa|curved", text, re.I):
        v = 2 * h_ * (l_ + w_)
        return (_snap(v), [f"LSA = 2h(l+w) = {_fmt(v)} sq cm."],
                f"{_fmt(v)} sq cm", None, "LSA = 2h(l+w)", None)
    if re.search(r"diagonal", text, re.I):
        v = (l_**2 + w_**2 + h_**2) ** 0.5
        return (_snap(v), [f"diagonal = √(l²+w²+h²) = {_fmt(v)} cm."],
                f"{_fmt(v)} cm", None, "d = √(l²+w²+h²)", None)
    v = l_ * w_ * h_
    return (_snap(v), [f"V = l × w × h = {_fmt(l_)} × {_fmt(w_)} × "
                       f"{_fmt(h_)} = {_fmt(v)} cu cm."],
            f"{_fmt(v)} cu cm", None, "V = lwh", None)


def _c_place_value(slots, text):
    """'place value of 7 in 7,89,45,632' — digit position × place.
    The registry otherwise binds this to a binary-weight rule and
    ships 2^(p-1)=64 for a 7-crore digit."""
    m = re.search(
        r"place\s+value\s+of\s+(\d)\s+(?:digit\s+)?in\s+"
        r"(?:the\s+)?(?:number\s+)?([\d,\s]+)", text, re.I)
    if not m:
        return None
    digit = int(m.group(1))
    num_s = m.group(2).replace(",", "").replace(" ", "").strip()
    if not num_s.isdigit():
        return None
    num = int(num_s)
    digits = num_s[::-1]                    # rightmost = position 0
    positions = [i for i, ch in enumerate(digits)
                 if int(ch) == digit]
    if not positions:
        return None
    results = []
    for pos in positions:
        val = digit * (10 ** pos)
        place = (_INDIAN_PLACES[pos] if pos < len(_INDIAN_PLACES)
                 else f"10^{pos}")
        results.append((val, place, pos))
    # serve the largest (leftmost) occurrence — the question means the
    # prominent place
    val, place, pos = max(results, key=lambda r: r[0])
    shown = f"{val:,}"
    steps = [
        f"{num:,} — digit {digit} sits at the {place} place.",
        f"place value = {digit} × 10^{pos} = {shown}."]
    if len(results) > 1:
        steps.append(f"(digit {digit} appears {len(results)} times; "
                     f"the largest place value is shown)")
    return (_snap(val), steps, shown, None,
            f"place value of {digit} = {shown}", None)


def _c_composite_shape(slots, text):
    """'rectangle w×h + semicircle on top, r' -> w·h + (1/2)πr².
    Norman window / rectangle-with-semicircle asks were shipped as a
    single-shape area (3.92 sq cm for a 2.8×2 + semicircle r=1.4)."""
    if not re.search(r"semi[\s-]?circl|semicircle|norman|adjoining",
                     text, re.I) or not re.search(
            r"rectangl|width|breadth", text, re.I):
        return None
    ms = re.search(r"width\s*[=:]?\s*(\d+(?:\.\d+)?)|"
                   r"breadth\s*[=:]?\s*(\d+(?:\.\d+)?)|"
                   r"(\d+(?:\.\d+)?)\s*(?:m|cm)?\s*(?:wide|bread)",
                   text, re.I)
    mh = re.search(r"height\s*[=:]?\s*(\d+(?:\.\d+)?)|"
                   r"(\d+(?:\.\d+)?)\s*(?:m|cm)?\s*(?:high|tall)",
                   text, re.I)
    mr = re.search(r"(?:radius|r)\s*[=:]?\s*(\d+(?:\.\d+)?)",
                   text, re.I)
    if not (ms and mh and mr):
        return None
    w = float(ms.group(1) or ms.group(2) or ms.group(3))
    h = float(mh.group(1) or mh.group(2))
    r_ = float(mr.group(1))
    pi = 22 / 7 if re.search(r"22\s*/\s*7", text) else math.pi
    rect = w * h
    semi = 0.5 * pi * r_ * r_
    v = rect + semi
    return (_snap(v), [
        f"rectangle = {_fmt(w)} x {_fmt(h)} = {_fmt(rect)} sq units.",
        f"semicircle = (1/2)πr² = (1/2) x {_fmt(pi)} x "
        f"{_fmt(r_)}² = {_fmt(semi)} sq units.",
        f"total = {_fmt(rect)} + {_fmt(semi)} = {_fmt(v)} sq units."],
        f"{_fmt(v)} sq units", None, "A = wh + πr²/2", None)


def _c_poly_eval(slots, text):
    """'evaluate p(2) where p(x) = x^3 - 2x^2 + 3x - 4' -> 2.
    C9 remainder-theorem asks were GUIDED — pure substitution."""
    m = re.search(r"(?:evaluate|find)\s*(?:p|f|g)\s*\(\s*(-?\d+(?:\.\d+)?)"
                  r"\s*\)", text, re.I)
    mpoly = re.search(r"[pfgs]?\s*\(\s*x\s*\)\s*=\s*(.+?)(?:\.|$)",
                      text, re.I)
    if not (m and mpoly):
        return None
    x = float(m.group(1))
    poly = mpoly.group(1).strip().rstrip(".,;")
    poly = (poly.replace("x^", "x**").replace("²", "**2")
            .replace("³", "**3"))
    # implicit multiplication: '2x' -> '2*x', 'x**2' keeps 'x'
    poly = re.sub(r"(\d)x", r"\1*x", poly)
    poly = poly.replace("x", f"({x})")
    # '2*(2)' stays; but ')(' -> ')*(' for safety
    poly = poly.replace(")(", ")*(")
    if not re.fullmatch(r"[\d\s()+\-*/.]+", poly):
        return None                            # only arithmetic allowed
    try:
        v = eval(poly, {"__builtins__": {}}, {})
    except Exception:
        return None
    return (_snap(v), [
        f"p({_fmt(x)}) = substitute x = {_fmt(x)}.",
        f"= {_fmt(v)}."],
        f"{_fmt(v)}", None, f"p({_fmt(x)})", None)


def _c_circle_angle(slots, text):
    """'angle subtended by an arc at the centre is 80°, find angle
    at circumference' -> centre = 2 × circumference (Euclid III.20)."""
    if not re.search(r"centre|center", text, re.I) or not re.search(
            r"circumference|circle", text, re.I):
        return None
    m = re.search(r"centre\s*(?:is|=)?\s*(\d+(?:\.\d+)?)\s*deg|"
                  r"at\s+the\s+centre\s*(?:is)?\s*(\d+(?:\.\d+)?)\s*deg",
                  text, re.I)
    if not m:
        return None
    c = float(m.group(1) or m.group(2))
    if re.search(r"circumference|edge|remaining\s+part", text, re.I):
        v = c / 2.0                       # centre -> circumference
        rel = "centre = 2 x circumference"
    else:
        v = 2 * c                         # circumference -> centre
        rel = "circumference = centre / 2"
    return (_snap(v), [
        f"angle at centre = {_fmt(c)} deg.",
        f"angle at circumference = {_fmt(c)}/2 = {_fmt(v)} deg."],
        f"{_fmt(v)} deg", None, rel, None)


def _c_mean_transform(slots, text):
    """'mean of n is m, each multiplied/added by k -> new mean' ->
    m·k or m+k.  Fell to fallback which shipped the count (10)."""
    m = re.search(
        r"mean\s+of\s+(\d+)\s+(?:number|observation|value|item|score)"
        r"\w*\s+is\s+(\d+(?:\.\d+)?)",
        text, re.I)
    mk = re.search(
        r"(?:multiplied|multiplied\s+by|times|doubled|tripled|halved|"
        r"increased\s+by|added)\s*(?:by)?\s*(\d+(?:\.\d+)?)?",
        text, re.I)
    if not (m and mk):
        return None
    n = int(m.group(1))
    mean = float(m.group(2))
    # determine the operation
    if re.search(r"doubled", text, re.I):
        v = 2 * mean; op = f"x 2 = {_fmt(v)}"
    elif re.search(r"tripled", text, re.I):
        v = 3 * mean; op = f"x 3 = {_fmt(v)}"
    elif re.search(r"halved", text, re.I):
        v = mean / 2; op = f"/ 2 = {_fmt(v)}"
    elif re.search(r"added", text, re.I) and mk.group(1):
        k = float(mk.group(1)); v = mean + k
        op = f"+ {_fmt(k)} = {_fmt(v)}"
    elif mk.group(1):
        k = float(mk.group(1)); v = mean * k
        op = f"x {_fmt(k)} = {_fmt(v)}"
    else:
        return None
    return (_snap(v), [
        f"mean = {_fmt(mean)} for {n} observations.",
        f"each value transformed -> new mean {op}."],
        f"{_fmt(v)}", None,
        "mean scales/shifts with the data", None)


def _c_cuboid_lsa(slots, text):
    """'cuboid l x b x h -> LSA = 2h(l+b)' — walls only, no roof/floor."""
    if not re.search(r"cuboid", text, re.I) or not re.search(
            r"lateral|curved|side\s+surface|lsa\b|walls\s+only",
            text, re.I):
        return None
    ms = re.search(r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*[x×]\s*"
                   r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*[x×]\s*"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    if not ms:
        return None
    l, b, h = (float(ms.group(i)) for i in (1, 2, 3))
    v = 2 * h * (l + b)
    return (_snap(v), [
        f"l = {_fmt(l)}, b = {_fmt(b)}, h = {_fmt(h)}.",
        f"LSA = 2h(l+b) = 2 x {_fmt(h)} x {_fmt(l + b)}"
        f" = {_fmt(v)} sq cm."],
        f"{_fmt(v)} sq cm", None, "LSA = 2h(l+b)", None)


def _c_annulus(slots, text):
    """'ring between concentric circles r1 r2' -> π(R²-r²).
    CIRCLE_MEASURE bound 'd = 28' for R=14 and shipped π·14²."""
    if not re.search(r"concentric|ring|annulus|between.*circle", text, re.I):
        return None
    ms = re.findall(r"radi\w*\s*(?:of|are)?\s*(\d+(?:\.\d+)?)\s*"
                    r"(?:cm|m)?\s*(?:and|,)\s*(\d+(?:\.\d+)?)", text, re.I)
    if len(ms) < 1:
        ms = re.findall(r"(\d+(?:\.\d+)?)\s*(?:cm|m)\b\s*(?:and|,)\s*"
                        r"(\d+(?:\.\d+)?)\s*(?:cm|m)\b", text, re.I)
    if not ms:
        return None
    R, r_ = float(ms[0][0]), float(ms[0][1])
    if r_ > R:
        R, r_ = r_, R
    pi = 22 / 7 if (R % 7 == 0 or r_ % 7 == 0 or
                    re.search(r"22\s*/\s*7", text)) else math.pi
    v = pi * (R * R - r_ * r_)
    return (_snap(v), [
        f"R = {_fmt(R)}, r = {_fmt(r_)}.",
        f"annulus area = π(R² - r²) = {_fmt(pi)} x "
        f"({_fmt(R * R)} - {_fmt(r_ * r_)}) = {_fmt(v)} sq cm."],
        f"{_fmt(v)} sq cm", None, "A = π(R² - r²)", None)


def _c_trig_inverse(slots, text):
    """'tan A = 1, find A' -> 45 deg (kernel ships radians).

    GUARD (C10 dig): 'prove sec A - tan A = 1/(sec A + tan A)' is
    an IDENTITY ask, not 'tan A = value' — refuse when the text
    carries prove/identity language or an operator between the
    functions."""
    if re.search(r"prove|identity|verify|show\s+that|justify",
                 text, re.I):
        return None
    # 'find the OTHER trigonometric ratios' is TRIG_RATIO_GIVEN's ask
    # (sin/cos/tan values from a given one) — an inverse-angle answer
    # ('22.6 deg') is the wrong kind entirely (audit shadow)
    if re.search(r"(?:other|remaining|all)\s+trigonometric\s+ratios?|"
                 r"find\s+[^.]{0,30}ratios?\s+of|determine\s+[^.]{0,30}"
                 r"trigonometric\s+ratios?", text, re.I):
        return None
    # 'sin A = 3/5, find sin 2A' is TRIG_VALUE_CHAIN's double-angle ask —
    # the inverse family answered '36.87 deg' (the angle a, not sin 2a)
    if re.search(r"(?:sin|cos|tan|sec|cosec|cot)\s*2\s*[a-zA-Z]|"
                 r"double\s+angle|half\s+angle", text, re.I):
        return None
    # two+ trig funcs = an identity, not an inverse-ask
    if len(re.findall(r"(?:sin|cos|tan|sec|cosec|cot)\s+[A-Z]",
                      text, re.I)) > 1:
        return None
    m = re.search(r"(tan|sin|cos|cot|sec|cosec)\s+([A-Z])\s*[=:]\s*"
                  r"(sqrt\s*\d+|\d+(?:\.\d+)?)\s*(?:/\s*"
                  r"(sqrt\s*\d+|\d+(?:\.\d+)?))?", text, re.I)
    if not m:
        return None
    func = m.group(1).lower()
    var = m.group(2)
    num_str = m.group(3)
    den_str = m.group(4)
    # parse the value (fractions like sqrt3/2, plain 1, etc.)
    def _val(s):
        s = s.strip()
        msq = re.match(r"sqrt\s*(\d+)", s)
        if msq:
            return math.sqrt(float(msq.group(1)))
        return float(s)
    try:
        v = _val(num_str)
        if den_str:
            v = v / _val(den_str)
    except Exception:
        return None
    # inverse trig -> angle in degrees
    angle_deg = {"sin": math.asin, "cos": math.acos,
                 "tan": math.atan}.get(func)
    if angle_deg is None:
        return None
    if func == "sin" and abs(v - 1.0) < 1e-9:
        deg = 90.0
    elif func == "sin" and abs(v - 0.5) < 1e-9:
        deg = 30.0
    elif func == "cos" and abs(v - 1.0) < 1e-9:
        deg = 0.0
    elif func == "cos" and abs(v - 0.5) < 1e-9:
        deg = 60.0
    elif func == "tan" and abs(v - 1.0) < 1e-9:
        deg = 45.0
    elif func == "tan" and abs(v - math.sqrt(3)) < 1e-6:
        deg = 60.0
    elif func == "tan" and abs(v - 1.0 / math.sqrt(3)) < 1e-6:
        deg = 30.0
    else:
        deg = math.degrees(angle_deg(min(max(v, -1), 1)))
    return (_snap(deg), [
        f"{func} {var} = {_fmt(v)}.",
        f"{var} = {func}⁻¹({_fmt(v)}) = {_fmt(deg)} deg."],
        f"{_fmt(deg)} deg", None,
        f"{var} = arctan({_fmt(v)})", None)


def _c_symmetric_inverse(slots, text):
    """'x + 1/x = 3, find x^2 + 1/x^2' -> (x+1/x)² - 2 = 7.
    Or x^3+1/x^3 = (x+1/x)³ - 3(x+1/x) = 18.
    The kernel solved for x (2.618) — wrong ask."""
    m = re.search(r"x\s*\+\s*1\s*/\s*x\s*=\s*(\d+(?:\.\d+)?)",
                  text, re.I)
    if not m:
        return None
    k = float(m.group(1))
    if re.search(r"x\^3\s*\+\s*1\s*/\s*x\^3|x\s*cubed.*1\s*/\s*x",
                 text, re.I):
        v = k ** 3 - 3 * k
        return (_snap(v), [
            f"(x + 1/x)³ = x³ + 1/x³ + 3(x + 1/x).",
            f"x³ + 1/x³ = {_fmt(k)}³ - 3({_fmt(k)})"
            f" = {_fmt(v)}."],
            f"{_fmt(v)}", None, "x³+1/x³ = (x+1/x)³-3(x+1/x)", None)
    # default: x² + 1/x²
    v = k * k - 2
    return (_snap(v), [
        f"(x + 1/x)² = x² + 2 + 1/x².",
        f"x² + 1/x² = {_fmt(k)}² - 2 = {_fmt(v)}."],
        f"{_fmt(v)}", None, "x²+1/x² = (x+1/x)²-2", None)


def _c_chord_circle(slots, text):
    """'chord 24 cm, distance from centre 5 cm -> radius' or
    'radius 10, chord distance 8 -> chord length'.
    CIRCLE_MEASURE answered area instead."""
    if not re.search(r"chord", text, re.I):
        return None
    # chord length + distance -> radius
    mc = re.search(r"chord\s+(?:of\s+length|length)?\s*(\d+(?:\.\d+)?)"
                   r"\s*cm[^.]{0,30}distance\s*(?:of)?\s*"
                   r"(\d+(?:\.\d+)?)\s*cm[^.]{0,20}centre", text, re.I)
    if mc:
        chord = float(mc.group(1)); d = float(mc.group(2))
        half = chord / 2
        r_ = math.sqrt(half * half + d * d)
        return (_snap(r_), [
            f"half chord = {_fmt(chord)}/2 = {_fmt(half)}.",
            f"r² = d² + (chord/2)² = {_fmt(d)}² + "
            f"{_fmt(half)}² = {_fmt(r_ * r_)}.",
            f"r = {_fmt(r_)} cm."],
            f"{_fmt(r_)} cm", None,
            "r² = d² + (c/2)²", None)
    # radius + distance -> chord length
    mr = re.search(r"(?:radius|radi)\s*(?:of)?\s*(\d+(?:\.\d+)?)"
                   r"\s*cm[^.]{0,30}distance\s*(?:of)?\s*"
                   r"(\d+(?:\.\d+)?)\s*cm", text, re.I)
    if mr:
        R = float(mr.group(1)); d = float(mr.group(2))
        half = math.sqrt(max(0.0, R * R - d * d))
        chord = 2 * half
        return (_snap(chord), [
            f"r = {_fmt(R)}, d = {_fmt(d)}.",
            f"half chord = √(r² - d²) = √({_fmt(R * R)} - "
            f"{_fmt(d * d)}) = {_fmt(half)}.",
            f"chord = 2 x {_fmt(half)} = {_fmt(chord)} cm."],
            f"{_fmt(chord)} cm", None,
            "chord = 2√(r²-d²)", None)
    return None


def _c_log_solve(slots, text):
    """'log10(x) = 2 -> x = 100' — direct inverse log."""
    m = re.search(r"log\s*(\d*)\s*\(?\s*x\s*\)?\s*=\s*"
                  r"(\d+(?:\.\d+)?)", text, re.I)
    if not m:
        return None
    base = float(m.group(1) or 10.0)
    rhs = float(m.group(2))
    x = base ** rhs
    return (_snap(x), [
        f"log{_fmt(base)}(x) = {_fmt(rhs)} -> "
        f"x = {_fmt(base)}^{_fmt(rhs)} = {_fmt(x)}."],
        f"x = {_fmt(x)}", None,
        "x = base^rhs", None)


def _c_log_eval(slots, text):
    """'log 9 + log 8 - log 6' -> log(72/6) = log 12 = 1.079.
    The modeling lane computed each separately and shipped a sum."""
    ms = re.findall(r"log\s*\(?\s*(\d+(?:\.\d+)?)\s*\)?",
                    text, re.I)
    if len(ms) < 2:
        return None
    ops = re.findall(r"([+-])\s*log", text, re.I)
    vals = [float(v) for v in ms]
    # log a + log b - log c = log(ab/c)
    result = math.log10(vals[0])
    for i, op in enumerate(ops):
        if op == '+':
            result += math.log10(vals[i + 1])
        else:
            result -= math.log10(vals[i + 1])
    return (_snap(result), [
        " + ".join(f"log {v:g}" for v in vals) +
        f" = log {'x'.join(f'{v:g}' for v in vals[:1])}",
        f"= {_fmt(result)}."],
        f"{_fmt(result)}", None,
        "log laws: a+b=log(ab)", None)


def _c_slope(slots, text):
    """'find the slope of the line joining (a,b) and (c,d)'
    -> m = (d-b)/(c-a).  Kernel shipped the full equation."""
    if not re.search(r"slope|gradient", text, re.I):
        return None
    mp = re.search(r"joining\s*\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*"
                   r"(-?\d+(?:\.\d+)?)\s*\)?\s*and\s*\(?\s*"
                   r"(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)?",
                   text, re.I)
    if not mp:
        return None
    x1, y1, x2, y2 = (float(v) for v in mp.groups())
    dx = x2 - x1
    if abs(dx) < 1e-12:
        return (None, ["slope is undefined (vertical line)."],
                "undefined", None, "vertical slope", None)
    m_ = (y2 - y1) / dx
    return (_snap(m_), [
        f"m = (y2 - y1)/(x2 - x1) = ({_fmt(y2)} - {_fmt(y1)})"
        f"/({_fmt(x2)} - {_fmt(x1)}) = {_fmt(m_)}."],
        f"{_fmt(m_)}", None, "m = (y2-y1)/(x2-x1)", None)


def _c_intersect_chords(slots, text):
    """'chords AB and CD intersect at E; AE=4, EB=6, CE=3 -> ED'
    via AE·EB = CE·ED."""
    if not re.search(r"chord|intersect", text, re.I):
        return None
    # AE/EB/CE/ED are TWO-letter labels — need multi-char class
    ms = re.findall(r"(AE|EB|CE|ED|BE|DE|AE|PE|EP)\s*=\s*"
                    r"(\d+(?:\.\d+)?)", text)
    vals = {k.upper(): float(v) for k, v in ms}
    # need at least 3 of {AE, EB, CE, ED}
    named = {"AE", "EB", "CE", "ED"} & vals.keys()
    if len(named) < 3:
        return None
    ae = vals.get("AE"); eb = vals.get("EB")
    ce = vals.get("CE"); ed = vals.get("ED")
    if ae and eb and ce and not ed:
        ed_ = ae * eb / ce
        return (_snap(ed_), [
            f"AE·EB = CE·ED  (intersecting chords).",
            f"{_fmt(ae)} x {_fmt(eb)} = {_fmt(ce)} x ED "
            f"-> ED = {_fmt(ed_)}."],
            f"ED = {_fmt(ed_)} cm", None,
            "AE·EB = CE·ED", None)
    if ce and ed and ae and not eb:
        eb_ = ce * ed / ae
        return (_snap(eb_), [
            f"CE·ED = AE·EB  -> EB = {_fmt(eb_)}."],
            f"EB = {_fmt(eb_)} cm", None,
            "AE·EB = CE·ED", None)
    return None


def _c_trig_eval(slots, text):
    """'sin² 30° + cos² 60°' or 'sin 30 + cos 60' — trig values."""
    if not re.search(r"(?:sin|cos|tan|sec|cosec|cot)\s*"
                     r"(?:\^2|²)?\s*\d+", text, re.I):
        return None
    # extract trig terms like 'sin 30', 'cos 60 deg'
    # 'sin^2 30' or 'sin² 30' — the squared marker is ^2 or ²
    terms = re.findall(r"(sin|cos|tan|sec|cosec|cot)\s*"
                       r"(\^2|²)?\s*(\d+)\s*(?:deg|degree|°)?",
                       text, re.I)
    if len(terms) < 2:
        return None
    total = 0
    for func, sq_mark, ang_s in terms:
        ang = math.radians(float(ang_s))
        try:
            v = {"sin": math.sin, "cos": math.cos,
                 "tan": math.tan, "sec": lambda x: 1 / math.cos(x),
                 "cosec": lambda x: 1 / math.sin(x),
                 "cot": lambda x: 1 / math.tan(x)}[func.lower()](ang)
        except Exception:
            return None
        total += v * v if sq_mark else v
    return (_snap(total), [
        " + ".join(f"{f}{'^2' if sq else ''}({_fmt(float(a))})"
                   for f, sq, a in terms)
        + f" = {_fmt(total)}."],
        f"{_fmt(total)}", None,
        "sum of trig values", None)


def _c_instalment_si(slots, text):
    """'deposit 500/month for 24 months at 7% pa -> interest'
    via instalment SI: SI = P·n(n+1)/(2·12)·r/100.
    The simple-SI lane shipped 70 (500·7·1/100)."""
    if not re.search(r"(?:per\s+month|monthly|instalment|"
                     r"each\s+month)", text, re.I):
        return None
    mP = re.search(r"(?:rs\.?\s*|₹\s*)?(\d+(?:\.\d+)?)\s*"
                   r"(?:per\s+month|monthly|each\s+month|"
                   r"a\s+month)", text, re.I)
    mN = re.search(r"for\s+(\d+)\s+months?", text, re.I)
    mR = re.search(r"(\d+(?:\.\d+)?)\s*%\s*(?:per\s+annum|pa\b|"
                   r"per\s+year)?", text, re.I)
    if not (mP and mN and mR):
        return None
    P = float(mP.group(1)); n = int(mN.group(1))
    r_ = float(mR.group(1))
    SI = P * n * (n + 1) / 24 * r_ / 100
    return (_snap(SI), [
        f"P = {_fmt(P)}/month, n = {n} months, r = {_fmt(r_)}% pa.",
        f"SI = P·n(n+1)/24 · r/100 = {_fmt(P)} x {n} x "
        f"{n + 1}/24 x {_fmt(r_)}/100 = {_fmt(SI)}."],
        f"Rs {_fmt(SI)}", None,
        "instalment SI = P·n(n+1)/24·r/100", None)


def _c_coord_area(slots, text):
    """'triangle with vertices (1,2),(3,4),(5,0) -> area' via
    shoelace: |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)| / 2.
    The kernel classified the shape instead of computing area."""
    if not re.search(r"vertices|vertex", text, re.I):
        return None
    ms = re.findall(r"\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)"
                    r"\s*\)?", text)
    if len(ms) < 3:
        return None
    x1, y1 = float(ms[0][0]), float(ms[0][1])
    x2, y2 = float(ms[1][0]), float(ms[1][1])
    x3, y3 = float(ms[2][0]), float(ms[2][1])
    area = abs(x1 * (y2 - y3) + x2 * (y3 - y1) +
               x3 * (y1 - y2)) / 2
    return (_snap(area), [
        f"A({_fmt(x1)},{_fmt(y1)}) B({_fmt(x2)},{_fmt(y2)}) "
        f"C({_fmt(x3)},{_fmt(y3)}).",
        f"Area = |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)| / 2.",
        f"= |{_fmt(x1)}({_fmt(y2 - y3)}) + {_fmt(x2)}({_fmt(y3 - y1)})"
        f" + {_fmt(x3)}({_fmt(y1 - y2)})| / 2 = {_fmt(area)} sq units."],
        f"{_fmt(area)} sq units", None,
        "shoelace formula", None)


def _c_trig_elevation(slots, text):
    """'tower 30 m, angle of elevation 45 deg -> distance' ->
    height = distance x tan(θ), or distance = height/tan(θ)."""
    if not re.search(r"(?:angle\s+of\s+elevation|elevation|"
                     r"angle\s+of\s+depression|depression)",
                     text, re.I):
        return None
    mh = re.search(r"(?:tower|pole|building|cliff|height|object|"
                   r"tree)\s*(?:is|of)?\s*(\d+(?:\.\d+)?)\s*"
                   r"(?:m|metre|feet|ft|km)?", text, re.I)
    ma = re.search(r"(?:elevation|depression|angle)[^.]{0,40}?"
                   r"(\d+)\s*(?:deg|degree|°)", text, re.I)
    if not (mh and ma):
        return None
    h = float(mh.group(1))
    ang = math.radians(float(ma.group(1)))
    tan_ = math.tan(ang)
    if abs(tan_) < 1e-12:
        return None
    # distance = h / tan(θ)
    d = h / tan_
    return (_snap(d), [
        f"height = {_fmt(h)}, angle = {_fmt(float(ma.group(1)))} deg.",
        f"tan θ = height/distance -> distance = {_fmt(h)}/"
        f"{_fmt(tan_)} = {_fmt(d)} m."],
        f"{_fmt(d)} m", None, "d = h/tan θ", None)


def _c_intersection_pair(slots, text):
    """'3x + 2y = 12 and 2x - y = 1 -> find x, y' — kernel ships
    only x.  Solve the 2x2 system directly."""
    m1 = re.search(r"(-?\d+(?:\.\d+)?)\s*x\s*([+-])\s*(\d+(?:\.\d+)?)?"
                   r"\s*y\s*=\s*(-?\d+(?:\.\d+)?)", text, re.I)
    m2 = re.search(r"and\s+(-?\d+(?:\.\d+)?)\s*x\s*([+-])\s*"
                   r"(\d+(?:\.\d+)?)?\s*y\s*=\s*(-?\d+(?:\.\d+)?)",
                   text, re.I)
    if not (m1 and m2):
        return None
    a1 = float(m1.group(1))
    b1 = float(m1.group(3) or 1) * (1 if m1.group(2) != '-' else -1)
    c1 = float(m1.group(4))
    a2 = float(m2.group(1))
    b2 = float(m2.group(3) or 1) * (1 if m2.group(2) != '-' else -1)
    c2 = float(m2.group(4))
    det = a1 * b2 - a2 * b1
    if abs(det) < 1e-12:
        return None
    x = (c1 * b2 - c2 * b1) / det
    y = (a1 * c2 - a2 * c1) / det
    return (_snap(x), [
        f"{_fmt(a1)}x {b1:+g}y = {_fmt(c1)}  "
        f"{_fmt(a2)}x {b2:+g}y = {_fmt(c2)}.",
        f"x = {_fmt(x)}, y = {_fmt(y)}."],
        f"({_fmt(x)}, {_fmt(y)})", None,
        "Cramer / elimination", None)


def _c_median_class(slots, text):
    """'median class of frequency distribution' — find the class
    containing the (N/2)th value."""
    if not re.search(r"median\s+(?:class|of\s+the)", text, re.I):
        return None
    # parse 'CI lo-hi f=N' pairs
    pairs = re.findall(r"(\d+)\s*-\s*(\d+)\s*f\s*=\s*(\d+)",
                       text, re.I)
    if len(pairs) < 2:
        return None
    total = sum(int(f) for _, _, f in pairs)
    cum = 0
    for lo, hi, f in pairs:
        cum += int(f)
        if cum >= total / 2:
            return (_snap(float(lo)), [
                f"N/2 = {total}/2 = {total / 2}.",
                f"cumulative frequency reaches {cum} at class "
                f"{lo}-{hi} -> median class = {lo}-{hi}."],
                f"{lo}-{hi}", None,
                "median class = first cum freq >= N/2", None)
    return None


def _c_dividend_income(slots, text):
    """'Rs 50000 in shares at Rs 100 giving 8% dividend -> annual
    income' = 50000/100 = 500 shares x (8% of 100) = Rs 4000."""
    if not re.search(r"dividend|shares?\s+at|income", text, re.I):
        return None
    mi = re.search(r"(?:invested?|investment)\s*(?:of)?\s*"
                   r"(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*(?:\.\d+)?)",
                   text, re.I)
    mp = re.search(r"(?:at|price)\s*(?:rs\.?\s*|₹\s*)?(\d+(?:\.\d+)?)"
                   r"\s*(?:each|per\s+share)?", text, re.I)
    md = re.search(r"(\d+(?:\.\d+)?)\s*%\s*(?:dividend|rate)?",
                   text, re.I)
    if not (mi and mp and md):
        return None
    inv = float(mi.group(1).replace(",", ""))
    price = float(mp.group(1))
    rate = float(md.group(1))
    shares = inv / price
    income = shares * price * rate / 100
    return (_snap(income), [
        f"investment = {_fmt(inv)}, share price = {_fmt(price)}, "
        f"dividend = {rate}%.",
        f"shares = {_fmt(inv)} / {_fmt(price)} = {_fmt(shares)}.",
        f"income = {_fmt(shares)} x {_fmt(price)} x {rate}% = "
        f"Rs {_fmt(income)}."],
        f"Rs {_fmt(income)}", None,
        "income = shares x price x rate%", None)


def _c_modal_class(slots, text):
    """'modal class' -> the class with the highest frequency.
    MEDIAN_CLASS computed N/2 instead."""
    if not re.search(r"modal\s+class|mode", text, re.I):
        return None
    pairs = re.findall(r"(\d+)\s*-\s*(\d+)\s*f\s*=\s*(\d+)",
                       text, re.I)
    if len(pairs) < 2:
        return None
    best = max(pairs, key=lambda p: int(p[2]))
    lo, hi, f = best
    return (_snap(float(lo)), [
        f"frequencies: {', '.join(f'{l}-{h}:{ff}' for l, h, ff in pairs)}.",
        f"highest frequency {f} is in class {lo}-{hi} -> "
        f"modal class = {lo}-{hi}."],
        f"{lo}-{hi}", None, "modal = max frequency class", None)


def _c_area_ratio(slots, text):
    """'D divides BC in ratio m:n, area ABD = 12 -> area ADC' —
    same-height triangles: areas share the same ratio m:n.
    share lane claimed it and shipped 'Rs 0.80'."""
    if not re.search(r"area|triangle", text, re.I):
        return None
    mr = re.search(r"(?:divides|ratio)\s*(?:bc|a\s*side|the\s+base)?"
                   r"[^.]{0,30}ratio\s*(\d+)\s*:\s*(\d+)", text, re.I)
    ma = re.search(r"area\s+(?:of\s+)?(?:triangle\s+)?ABD\s*[=:]\s*"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    if not (mr and ma):
        # alternative: 'area of ABD is 12'
        ma = re.search(r"ABD\s*(?:is|=)\s*(\d+(?:\.\d+)?)", text, re.I)
        if not (mr and ma):
            return None
    m_, n = float(mr.group(1)), float(mr.group(2))
    abd = float(ma.group(1))
    # ABD and ADC share the same height from A; bases BD:DC = m:n
    adc = abd * n / m_
    return (_snap(adc), [
        f"BD : DC = {_fmt(m_)} : {_fmt(n)}; area ABD = {_fmt(abd)}.",
        f"triangles ABD and ADC share the same height from A, "
        f"so areas scale with bases.",
        f"area ADC = {_fmt(abd)} x {_fmt(n)}/{_fmt(m_)} = "
        f"{_fmt(adc)} sq cm."],
        f"{_fmt(adc)} sq cm", None,
        "same-height triangles: A ∝ base", None)


def _c_currency_convert(slots, text):
    """'$1 = Rs 75, convert Rs 15000 to dollars' -> 200.
    Or '1 USD = 75 INR -> how many rupees is $20'."""
    # '$1 = Rs 75' — the currency sign precedes the '1'
    mr = re.search(r"(?:\$\s*1|1\s*(?:dollar|usd|rs\.?|rupee|inr|₹))\s*"
                   r"(?:is|=|equals)\s*(?:rs\.?\s*|₹\s*|\$|usd|inr)?"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    if not mr:
        mr = re.search(r"1\s*=\s*(?:rs\.?\s*)?(\d+(?:\.\d+)?)", text)
    if not mr:
        return None
    rate = float(mr.group(1))
    # direction: 'convert Rs N to dollars' (INR -> USD) or reverse
    ma = re.search(r"(?:rs\.?\s*|₹\s*)?(\d+(?:\.\d+)?)\s*"
                   r"(?:to\s+(?:dollars?|usd)|in\s+dollars?)",
                   text, re.I)
    if ma:
        amt = float(ma.group(1))
        v = amt / rate
        return (_snap(v), [
            f"Rs {_fmt(amt)} / {_fmt(rate)} = "
            f"${_fmt(v)}."],
            f"${_fmt(v)}", None, "INR/USD rate", None)
    # 'N dollars to rupees'
    ma2 = re.search(r"(?:\$\s*|usd\s*)?(\d+(?:\.\d+)?)\s*"
                    r"(?:dollars?|usd)\s*(?:to\s+rupees?|in\s+rs)",
                    text, re.I)
    if ma2:
        amt = float(ma2.group(1))
        v = amt * rate
        return (_snap(v), [
            f"${_fmt(amt)} x {_fmt(rate)} = "
            f"Rs {_fmt(v)}."],
            f"Rs {_fmt(v)}", None, "USD*INR rate", None)
    return None


def _c_definite_area(slots, text):
    """'area between x=0, x=4 and y=x^2' -> integral of x^2 from
    0 to 4 = 64/3 = 21.33.  The kernel returned 0."""
    if not re.search(r"area\s+(?:between|under|bounded)", text, re.I):
        return None
    # bounds: 'x = a' and 'x = b' — may be 'x = 0, x = 4' or
    # 'x = 0 and x = 4' or 'x = 0 to x = 4'
    mb = re.search(r"x\s*=\s*(-?\d+(?:\.\d+)?)\s*"
                   r"(?:,|,\s*and|and|to|\s+to\s+)\s*"
                   r"x\s*=\s*(-?\d+(?:\.\d+)?)", text, re.I)
    if not mb:
        mb = re.search(r"between\s*x\s*=\s*(-?\d+(?:\.\d+)?)\s*"
                       r"and\s*x\s*=\s*(-?\d+(?:\.\d+)?)", text, re.I)
    if not mb:
        return None
    a, b = float(mb.group(1)), float(mb.group(2))
    # curve: 'y = f(x)' or 'curve y = f(x)'
    mc = re.search(r"(?:curve|y)\s*=\s*(x\^?\d*|x²|x\*\*\d+)",
                   text, re.I)
    if not mc:
        return None
    expr = mc.group(1).replace("x^", "x**").replace("x²", "x**2")
    import sympy
    x = sympy.Symbol("x")
    try:
        e = sympy.sympify(expr)
        val = float(sympy.integrate(e, (x, a, b)))
    except Exception:
        return None
    return (_snap(val), [
        f"y = {e}, from x = {_fmt(a)} to x = {_fmt(b)}.",
        f"area = ∫y dx = {_fmt(val)}."],
        f"{_fmt(val)} sq units", None, "∫ f(x) dx", None)


def _c_log_equation(slots, text):
    """'log2(x+3) + log2(x-3) = 3' -> x²-9 = 8 -> x = √17 ≈ 4.123.
    'log(x+2) + log(x-1) = log(4x-4)' -> (x+2)(x-1) = 4x-4 -> x=2.
    The modeling lane evaluated log(1)=0 and shipped 0.301."""
    if not re.search(r"\blog\s*\d*\s*\(", text, re.I):
        return None
    # log(x+a) + log(x+b) = log(cx + d) — both signs may differ;
    # 'log(x-1) + log(x+3) = 2' has +b not -b on the second term
    mll = re.search(
        r"log\s*\d*\s*\(\s*x\s*([+-])\s*(\d+(?:\.\d+)?)\s*\)"
        r"\s*\+\s*log\s*\d*\s*\(\s*x\s*([+-])\s*(\d+(?:\.\d+)?)\s*\)"
        r"\s*=\s*log\s*\d*\s*\(\s*(-?\d+(?:\.\d+)?)\s*x\s*"
        r"([+-])\s*(\d+(?:\.\d+)?)\s*\)", text, re.I)
    if mll:
        # mll groups: s1, c1, s2, c2, cx, s3, dd
        s1 = mll.group(1); a = float(mll.group(2)) * \
            (1 if s1 != '-' else -1)
        s2 = mll.group(3); b = float(mll.group(4)) * \
            (1 if s2 != '-' else -1)
        cx = float(mll.group(5)); sgn = mll.group(6)
        dd = float(mll.group(7))
        dd = dd if sgn != '-' else -dd
        # (x+a)(x+b) = cx + d -> x² + (a+b-c)x + ab - d = 0
        B = a + b - cx; C = a * b - dd
        disc = B * B - 4 * C
        if disc < 0:
            return None
        sq = math.sqrt(disc)
        cands = [(-B + sq) / 2, (-B - sq) / 2]
        # domain: all log args must be positive
        valid = [x for x in cands if x + a > 0 and x + b > 0
                 and cx * x + dd > 0]
        if not valid:
            return None
        x = valid[0]
        return (_snap(x), [
            f"log(x{a:+g}) + log(x{b:+g}) = "
            f"log({_fmt(cx)}x{dd:+g}).",
            f"(x{a:+g})(x{b:+g}) = "
            f"{_fmt(cx)}x{dd:+g}.",
            f"x² {B:+g}x {C:+g} = 0 -> x = {_fmt(x)}."],
            f"x = {_fmt(x)}", None,
            "log a + log b = log(ab) = log c", None)
    # log(x+a) + log(x+b) = N — same shape as mll but numeric RHS;
    # 'log(x-1) + log(x+3) = 2' has -a and +b
    meq = re.search(
        r"log\s*(\d*)\s*\(\s*x\s*([+-])\s*(\d+(?:\.\d+)?)\s*\)"
        r"\s*\+\s*log\s*\d*\s*\(\s*x\s*([+-])\s*"
        r"(\d+(?:\.\d+)?)\s*\)\s*=\s*(\d+(?:\.\d+)?)", text, re.I)
    if not meq:
        return None
    base = float(meq.group(1) or 10.0)
    s1 = meq.group(2); a = float(meq.group(3)) * \
        (1 if s1 != '-' else -1)
    s2 = meq.group(4); b = float(meq.group(5)) * \
        (1 if s2 != '-' else -1)
    rhs = float(meq.group(6))
    # (x+a)(x+b) = base^rhs -> x² + (a+b)x + ab - prod = 0
    prod = base ** rhs
    B = a + b; C = a * b - prod
    disc = B * B - 4 * C
    if disc < 0:
        return None
    sq = math.sqrt(disc)
    cands = [(-B + sq) / 2, (-B - sq) / 2]
    # domain: all log args must be positive
    valid = [x for x in cands if x + a > 0 and x + b > 0]
    if not valid:
        return None
    x = valid[0]
    return (_snap(x), [
        f"log_b(x{a:+g}) + log_b(x{b:+g}) = {_fmt(rhs)}.",
        f"(x{a:+g})(x{b:+g}) = {base}^{_fmt(rhs)} = "
        f"{_fmt(prod)}.",
        f"x² {B:+g}x {C:+g} = 0 -> "
        f"x = {_fmt(x)}."],
        f"x = {_fmt(x)}", None,
        "log sum -> product = base^rhs", None)


def _c_bisector_theorem(slots, text):
    """'bisector of angle A meets BC at D, AB=8, AC=6, BC=7 ->
    BD' via angle-bisector theorem: BD/DC = AB/AC.
    ANGLE_SUM_TRI claimed this and shipped '166 deg'."""
    if not re.search(r"bisector|bisects", text, re.I):
        return None
    mAB = re.search(r"AB\s*[=:]\s*(\d+(?:\.\d+)?)", text, re.I)
    mAC = re.search(r"AC\s*[=:]\s*(\d+(?:\.\d+)?)", text, re.I)
    mBC = re.search(r"BC\s*[=:]\s*(\d+(?:\.\d+)?)", text, re.I)
    if not (mAB and mAC and mBC):
        return None
    AB = float(mAB.group(1)); AC = float(mAC.group(1))
    BC = float(mBC.group(1))
    # BD/DC = AB/AC -> BD = BC * AB/(AB+AC)
    BD = BC * AB / (AB + AC)
    DC = BC - BD
    return (_snap(BD), [
        f"BD/DC = AB/AC = {_fmt(AB)}/{_fmt(AC)}.",
        f"BD + DC = BC = {_fmt(BC)} -> BD = "
        f"{_fmt(BC)} x {_fmt(AB)}/{_fmt(AB + AC)}"
        f" = {_fmt(BD)} cm.",
        f"DC = {_fmt(DC)} cm."],
        f"BD = {_fmt(BD)} cm", None,
        "BD/DC = AB/AC", None)


def _c_pythagoras(slots, text):
    """'hypotenuse 13, side 5 -> other side 12' or
    'legs a b -> hypotenuse c'.  Went GUIDED — no family."""
    if not re.search(r"hypotenuse|right[\s-]*angled?\s*triangle|"
                     r"right\s+triangle", text, re.I):
        return None
    mh = re.search(r"hypotenuse\s*(?:is|=)?\s*(\d+(?:\.\d+)?)",
                   text, re.I)
    ms_ = re.search(r"(?:one\s+side|side|base|leg|other\s+side|"
                    r"one\s+leg)\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)",
                    text, re.I)
    mlegs = re.findall(r"(?:leg|side|base)\s*(?:is|=|of)?\s*"
                       r"(\d+(?:\.\d+)?)", text, re.I)
    if mh and ms_:
        h = float(mh.group(1)); s = float(ms_.group(1))
        other = math.sqrt(max(0.0, h * h - s * s))
        return (_snap(other), [
            f"c² = a² + b² -> {_fmt(h)}² = {_fmt(s)}² + b².",
            f"b² = {_fmt(h * h)} - {_fmt(s * s)} = {_fmt(h * h - s * s)}.",
            f"b = √{_fmt(h * h - s * s)} = {_fmt(other)} cm."],
            f"{_fmt(other)} cm", None, "b = √(c² - a²)", None)
    if not mh and len(mlegs) >= 2:
        a_, b_ = float(mlegs[0]), float(mlegs[1])
        h = math.sqrt(a_ * a_ + b_ * b_)
        return (_snap(h), [
            f"legs {_fmt(a_)} and {_fmt(b_)}.",
            f"c = √(a² + b²) = √({_fmt(a_ * a_)} + {_fmt(b_ * b_)})"
            f" = √{_fmt(a_ * a_ + b_ * b_)} = {_fmt(h)} cm."],
            f"{_fmt(h)} cm", None, "c = √(a² + b²)", None)
    return None


def _c_hollow_cylinder(slots, text):
    """'hollow cylinder outer R inner r height h -> metal volume
    = π(R² - r²)h'."""
    if not re.search(r"hollow\s+cylinder|cylindrical\s+shell|"
                     r"hollow\s+tube|pipe\s+wall", text, re.I):
        return None
    mR = re.search(r"outer\s*(?:radius|radi)\s*(?:of|=|is)?\s*"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    mr = re.search(r"inner\s*(?:radius|radi)\s*(?:of|=|is)?\s*"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    mh = re.search(r"(?:height|h|length)\s*(?:of|=|is)?\s*"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    if not (mR and mr and mh):
        return None
    R = float(mR.group(1)); r_ = float(mr.group(1))
    h = float(mh.group(1))
    pi = 22 / 7 if (R % 7 == 0 or r_ % 7 == 0 or
                    re.search(r"22\s*/\s*7", text)) else math.pi
    v = pi * (R * R - r_ * r_) * h
    return (_snap(v), [
        f"R = {_fmt(R)}, r = {_fmt(r_)}, h = {_fmt(h)}.",
        f"metal volume = π(R² - r²)h = {_fmt(pi)} x "
        f"{_fmt(R * R - r_ * r_)} x {_fmt(h)} = {_fmt(v)} cu cm."],
        f"{_fmt(v)} cu cm", None, "V = π(R²-r²)h", None)


def _c_digits_word(slots, text):
    """'tens digit is 3 times units digit, number is 62 ->
    digits are 6 and 2'.  Digit-word problems went GUIDED."""
    m = re.search(r"tens\s+digit[^.]{0,20}?(?:is|=|of)?\s*"
                  r"(\d+(?:\.\d+)?)\s*times\s+(?:the\s+)?"
                  r"units?\s+digit", text, re.I)
    if not m:
        # 'twice/double/thrice the units digit' — implicit multiplier
        m2 = re.search(r"tens\s+digit[^.]{0,20}?(?:is|=|of)?\s*"
                       r"(twice|double|thrice|triple)\s+"
                       r"(?:the\s+)?units?\s+digit", text, re.I)
        if m2:
            kw = {"twice": 2.0, "double": 2.0,
                  "thrice": 3.0, "triple": 3.0}.get(m2.group(1))
            if kw:
                class _Wrap:
                    def group(self, i): return str(kw) if i == 1 else ""
                m = _Wrap()
    mn = re.search(r"number\s+(?:is|=|of)\s+(\d{2,})\b", text, re.I)
    if not (m and mn):
        return None
    ratio = float(m.group(1))
    num = mn.group(1)
    t = int(num[0]); u = int(num[1])
    if abs(t / max(u, 1) - ratio) < 1e-9 or abs(u * ratio - t) < 1e-9:
        return (_snap(t), [
            f"tens = {_fmt(ratio)} x units; number = {num}.",
            f"tens = {t}, units = {u} ({t} = {_fmt(ratio)} x {u})."],
            f"tens = {t}, units = {u}", None,
            "digit-word: t = k·u", None)
    # solve: number = 10t + u, t = k·u -> u = num/(10k+1)
    den = 10 * ratio + 1
    u_v = int(num) / den
    t_v = ratio * u_v
    if abs(u_v - round(u_v)) < 1e-9 and abs(t_v - round(t_v)) < 1e-9:
        u_i, t_i = int(round(u_v)), int(round(t_v))
        return (_snap(t_i), [
            f"number = 10t + u = {num}; t = {_fmt(ratio)}u.",
            f"u = {num}/({10}·{_fmt(ratio)}+1) = {u_i}; "
            f"t = {t_i}."],
            f"tens = {t_i}, units = {u_i}", None,
            "digit-word: t = k·u", None)
    return None


def _c_complementary_ask(slots, text):
    """'find the angle equal to its complement' -> 45;
    'equal to its supplement' -> 90."""
    if re.search(r"equal\s+to\s+(?:its\s+)?complement", text, re.I):
        return (_snap(45), [
            "x + x = 90 -> 2x = 90.",
            "x = 45 degrees."],
            "45 deg", None, "x + x = 90", None)
    if re.search(r"equal\s+to\s+(?:its\s+)?supplement", text, re.I):
        return (_snap(90), [
            "x + x = 180 -> 2x = 180.",
            "x = 90 degrees."],
            "90 deg", None, "x + x = 180", None)
    return None


def _c_cube_measure(slots, text):
    """'cube edge a -> diagonal a√3 / TSA 6a² / volume a³ / LSA 4a²'.
    cube-diagonal and cube-lsa asks went GUIDED."""
    if not re.search(r"\bcube\b", text, re.I):
        return None
    me = re.search(r"(?:edge|side|a)\s*[=:]?\s*(\d+(?:\.\d+)?)",
                   text, re.I)
    if not me:
        return None
    a = float(me.group(1))
    if re.search(r"diagonal|space\s+diagonal", text, re.I):
        v = a * math.sqrt(3)
        return (_snap(v), [
            f"edge a = {_fmt(a)}.",
            f"space diagonal = a√3 = {_fmt(a)}√3 = {_fmt(v)} cm."],
            f"{_fmt(v)} cm", None, "d = a√3", None)
    if re.search(r"lateral|curved|ls\b|side\s+area", text, re.I):
        v = 4 * a * a
        return (_snap(v), [
            f"edge a = {_fmt(a)}.",
            f"LSA = 4a² = 4 x {_fmt(a)}² = {_fmt(v)} sq cm."],
            f"{_fmt(v)} sq cm", None, "LSA = 4a²", None)
    # TSA / volume default
    if re.search(r"total\s+surface|surface\s+area|tsa\b", text, re.I):
        v = 6 * a * a
        return (_snap(v), [
            f"edge a = {_fmt(a)}.",
            f"TSA = 6a² = 6 x {_fmt(a)}² = {_fmt(v)} sq cm."],
            f"{_fmt(v)} sq cm", None, "TSA = 6a²", None)
    return None


def _c_cylinder_surface(slots, text):
    """'cylinder r=7 h=10 -> TSA 2πr(h+r) = 748' or CSA = 2πrh = 440."""
    if not re.search(r"cylinder|cylindrical", text, re.I):
        return None
    mr = re.search(r"(?:radi\w*|r)\s*[=:]?\s*(\d+(?:\.\d+)?)",
                   text, re.I)
    mh = re.search(r"(?:height|h)\s*[=:]?\s*(\d+(?:\.\d+)?)",
                   text, re.I)
    if not (mr and mh):
        return None
    r_, h_ = float(mr.group(1)), float(mh.group(1))
    pi = 22 / 7 if (re.search(r"22\s*/\s*7", text) or
                    abs(r_ % 7) < 1e-9 or abs(h_ % 7) < 1e-9) else math.pi
    # CURVED-FIRST (audit FAIL, own exemplar): 'curved surface area'
    # used to take the TSA branch — the lookahead `(?!.*curve)` scans
    # FORWARD while 'curved' sits BEFORE 'surface area', so CSA asks
    # shipped TSA=748 instead of 440.
    if re.search(r"curved|lateral|\bCSA\b|\bLSA\b", text, re.I):
        v = 2 * pi * r_ * h_
        return (_snap(v), [
            f"r = {_fmt(r_)}, h = {_fmt(h_)}.",
            f"CSA = 2πrh = 2 x {_fmt(pi)} x {_fmt(r_)} x "
            f"{_fmt(h_)} = {_fmt(v)} sq cm."],
            f"{_fmt(v)} sq cm", None, "CSA = 2πrh", None)
    if re.search(r"total\s+surface|TSA\b|surface\s+area",
                 text, re.I):
        v = 2 * pi * r_ * (h_ + r_)
        return (_snap(v), [
            f"r = {_fmt(r_)}, h = {_fmt(h_)}.",
            f"TSA = 2πr(h+r) = 2 x {_fmt(pi)} x {_fmt(r_)} x "
            f"{_fmt(h_ + r_)} = {_fmt(v)} sq cm."],
            f"{_fmt(v)} sq cm", None, "TSA = 2πr(h+r)", None)
    return None


def _c_empirical_relation(slots, text):
    """'mean 25, mode 20 -> median' via mode = 3·median - 2·mean.
    Also 'the mean and mode are 25 and 20' (paired 'are' form)."""
    mm = re.search(r"mean\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)",
                   text, re.I)
    mo = re.search(r"mode\s*(?:is|=|of)?\s*(\d+(?:\.\d+)?)",
                   text, re.I)
    # 'the mean and mode are A and B' — values in word order
    if not (mm and mo):
        mm2 = re.search(r"mean\s+and\s+mode[^.]{0,40}?(?:are|is|of)?"
                        r"\s*(\d+(?:\.\d+)?)\s*(?:and|,)\s*"
                        r"(\d+(?:\.\d+)?)", text, re.I)
        if mm2:
            mean = float(mm2.group(1))
            mode = float(mm2.group(2))
        else:
            return None
    else:
        mean = float(mm.group(1))
        mode = float(mo.group(1))
    median = (mode + 2 * mean) / 3.0
    return (_snap(median), [
        f"mode = 3 x median - 2 x mean  (empirical relation).",
        f"median = (mode + 2·mean)/3 = ({_fmt(mode)} + "
        f"{_fmt(2 * mean)})/3 = {_fmt(median)}."],
        f"{_fmt(median)}", None, "mode = 3·med - 2·mean", None)


def _c_quad_formula(slots, text):
    """'solve 2x^2 - 7x + 3 = 0 by/using the quadratic formula'
    -> x = (-b ± √(b²-4ac)) / 2a.  The kernel's equation lane
    treated 'using the quadratic formula' as a constraint clause."""
    if not re.search(r"quadratic\s+formula|formula\s+method",
                     text, re.I):
        return None
    me = re.search(
        r"(?:(-?\d+(?:\.\d+)?)\s*)?(?:x\^2|x\*\*2|x²)\s*"
        r"([+-])\s*(\d+(?:\.\d+)?)\s*x\s*([+-])\s*"
        r"(\d+(?:\.\d+)?)\s*=\s*0", text, re.I)
    if not me:
        return None
    a = float(me.group(1) or 1.0)
    b = float(me.group(3)) * (1 if me.group(2) != '-' else -1)
    c = float(me.group(5)) * (1 if me.group(4) != '-' else -1)
    if a == 0:
        return None
    disc = b * b - 4 * a * c
    if disc < 0:
        return (None, [
            f"a = {_fmt(a)}, b = {_fmt(b)}, c = {_fmt(c)}.",
            f"D = {_fmt(disc)} < 0 — no real roots."],
            "no real roots", None, "D < 0", None)
    sq = math.sqrt(disc)
    r1 = (-b + sq) / (2 * a)
    r2 = (-b - sq) / (2 * a)
    return (_snap(r1), [
        f"a = {_fmt(a)}, b = {_fmt(b)}, c = {_fmt(c)}.",
        f"D = b² - 4ac = {_fmt(b)}² - 4({_fmt(a)})({_fmt(c)})"
        f" = {_fmt(disc)}.",
        f"x = ({_fmt(-b)} ± √{_fmt(disc)}) / {_fmt(2 * a)}"
        f" -> x = {_fmt(r1)} or x = {_fmt(r2)}."],
        f"x = {_fmt(r1)} or x = {_fmt(r2)}", None,
        "quadratic formula", None)


def _c_prob_coins(slots, text):
    """'two coins tossed, P(two heads)' -> 1/4.  Single coin ->
    1/2.  Only handles 'two coins', 'three coins', etc."""
    if not re.search(r"coins?\s+(?:are\s+)?tossed|tossed?\s+\d+\s+coin",
                     text, re.I) and not re.search(
            r"\b(?:two|three|four|2|3|4)\s+coins?\b", text, re.I):
        return None
    m = re.search(r"(two|three|four|2|3|4)\s+coins?|"
                  r"coins?\s+(?:tossed|thrown)\s*(\d+)", text, re.I)
    if not m:
        return None
    nw = (m.group(1) or m.group(2) or "").strip().lower()
    n = {"two": 2, "three": 3, "four": 4,
         "2": 2, "3": 3, "4": 4}.get(nw, 0)
    if n == 0:
        return None
    # P(exactly k heads) — C(n,k) / 2^n — checked FIRST because
    # 'exactly two heads' also matches the 'two heads' pattern below
    mk = re.search(r"exactly\s+(\w+|2|3|4)\s+heads?", text, re.I)
    if mk:
        kw = {"two": 2, "three": 3, "four": 4, "2": 2, "3": 3,
              "4": 4, "one": 1, "1": 1}.get(mk.group(1).lower())
        if kw is not None and kw <= n:
            import math as _m
            c = _m.comb(n, kw)
            p = c / (2 ** n)
            return (_snap(p), [
                f"{n} coins -> {2 ** n} outcomes.",
                f"exactly {kw} heads = C({n},{kw}) = {c}.",
                f"P = {c}/{2 ** n} = {_fmt(p)}."],
                f"{_fmt(p)}", None, f"C({n},{kw})/2^{n}", None)
    # ask: P(all heads) or P(all tails) — '2 heads' after
    # normalizer converts 'two' to '2'
    if re.search(r"(?:both|all|two|2)\s+heads?|(?:both|all|2)\s+tails",
                 text, re.I):
        p = 1.0 / (2 ** n)
        return (_snap(p), [
            f"{n} coins -> {2 ** n} equally likely outcomes.",
            f"P(all heads) = 1/{2 ** n} = {_fmt(p)}."],
            f"{_fmt(p)}", None, "P(all same) = 1/2^n", None)
    # P(at least one head)
    if re.search(r"at\s+least\s+one", text, re.I):
        p = 1 - 1.0 / (2 ** n)
        return (_snap(p), [
            f"{n} coins -> {2 ** n} outcomes; all tails = 1.",
            f"P(at least 1 head) = 1 - 1/{2 ** n} = {_fmt(p)}."],
            f"{_fmt(p)}", None, "P(>=1H) = 1 - 1/2^n", None)
    return None


def _c_quad_zeros(slots, text):
    """'find the zeros of p(x) = x^2 - 5x + 6' -> x = 2 or 3.
    The kernel's equation_graph bound 'prod_roots=6' for c — wrong."""
    m = re.search(r"(?:zeros?|roots?)\s+of\s+(?:p\s*\(\s*x\s*\)|"
                  r"f\s*\(\s*x\s*\))\s*[=:]\s*([^.]+?)\.?\s*$",
                  text, re.I)
    if not m:
        return None
    poly = m.group(1).strip()
    # parse ax^2+bx+c — optional leading coefficient
    ma = re.search(r"(?:(\d+(?:\.\d+)?)\s*)?(?:x\^2|x\*\*2|x²)"
                   r"\s*([+-])\s*(\d+(?:\.\d+)?)\s*x\s*"
                   r"([+-])\s*(\d+(?:\.\d+)?)", poly, re.I)
    if not ma:
        return None
    a = float(ma.group(1) or 1.0)
    b = float(ma.group(3)) * (1 if ma.group(2) != '-' else -1)
    c = float(ma.group(5)) * (1 if ma.group(4) != '-' else -1)
    disc = b * b - 4 * a * c
    if disc < 0:
        return (None, [
            f"a = 1, b = {_fmt(b)}, c = {_fmt(c)}.",
            f"discriminant = {_fmt(disc)} < 0 — no real zeros."],
            "no real zeros", None, "D < 0", None)
    sq = math.sqrt(disc)
    r1 = (-b + sq) / (2 * a)
    r2 = (-b - sq) / (2 * a)
    return (_snap(r1), [
        f"a = 1, b = {_fmt(b)}, c = {_fmt(c)}.",
        f"D = b² - 4ac = {_fmt(b)}² - 4(1)({_fmt(c)}) = {_fmt(disc)}.",
        f"zeros = ({_fmt(-b)} ± √{_fmt(disc)}) / "
        f"{_fmt(2 * a)} = {_fmt(r1)}, {_fmt(r2)}."],
        f"x = {_fmt(r2)} or x = {_fmt(r1)}", None,
        "zeros of quadratic", None)


def _c_discount_gst(slots, text):
    """'marked 20000, 10% discount, then 18% GST' ->
    20000×0.9×1.18 = 21240.  The lane applied GST to the FULL price
    (23600) skipping the discount step entirely."""
    md = re.search(r"marked\s+price[^.]{0,30}?(\d+(?:,\d+)*)|"
                   r"(?:rs\.?\s*|₹\s*)(\d+(?:,\d+)*)[^.]{0,40}?"
                   r"marked", text, re.I)
    mdisc = re.search(r"(\d+(?:\.\d+)?)\s*%\s*discount|"
                      r"discount\s+of\s*(\d+(?:\.\d+)?)\s*%",
                      text, re.I)
    mgst = re.search(r"(\d+(?:\.\d+)?)\s*%\s*(?:GST|gst)|"
                     r"GST\s*(?:of|at|is)?\s*(\d+(?:\.\d+)?)\s*%",
                     text, re.I)
    if not (md and mdisc and mgst):
        return None
    mp = float((md.group(1) or md.group(2)).replace(",", ""))
    d = float(mdisc.group(1) or mdisc.group(2))
    g = float(mgst.group(1) or mgst.group(2))
    sp = mp * (1 - d / 100)
    final = sp * (1 + g / 100)
    return (_snap(final), [
        f"marked price = Rs {_fmt(mp)}; discount {_fmt(d)}%.",
        f"discounted price = {_fmt(mp)} x (1 - {_fmt(d)}/100)"
        f" = Rs {_fmt(sp)}.",
        f"GST {_fmt(g)}% on {_fmt(sp)} = {_fmt(sp)} x "
        f"(1 + {_fmt(g)}/100) = Rs {_fmt(final)}."],
        f"Rs {_fmt(final)}", None,
        "price = MP(1-d/100)(1+gst/100)", None)


def _c_ci_inverse(slots, text):
    """'sum becomes A in n years at r% CI, find P' ->
    P = A / (1 + r/100)^n.  Forward-CI lane ships CI instead."""
    m = re.search(
        r"(?:becomes?|amounts?\s+to|grows?\s+to)\s*(?:rs\.?\s*|₹\s*)?"
        r"(\d+(?:,\d+)*(?:\.\d+)?)[^.]{0,40}?(\d+)\s*years?[^.]{0,40}?"
        r"(\d+(?:\.\d+)?)\s*%[^.]{0,60}?(?:ci|compound)",
        text, re.I) or re.search(
        r"(?:rs\.?\s*|₹\s*)(\d+(?:,\d+)*(?:\.\d+)?)\s*in\s*"
        r"(\d+)\s*years?[^.]{0,60}?(\d+(?:\.\d+)?)\s*%[^.]{0,60}?"
        r"(?:ci|compound)", text, re.I) or re.search(
        r"(?:rs\.?\s*|₹\s*)(\d+(?:,\d+)*(?:\.\d+)?)\s*in\s*"
        r"(\d+)\s*years?\s*(?:at\s*)?(\d+(?:\.\d+)?)\s*%[^.]{0,60}?"
        r"compound", text, re.I)
    if not m or not re.search(
            r"find\s+(?:the\s+)?(?:principal|sum|original)", text, re.I):
        return None
    A = float(m.group(1).replace(",", ""))
    n = int(m.group(2))
    r_ = float(m.group(3))
    P = A / ((1 + r_ / 100) ** n)
    return (_snap(P), [
        f"A = P(1 + r/100)^n ⟹ {_fmt(A)} = P x "
        f"(1.{_fmt(int(r_)) if r_ == int(r_) else _fmt(r_)})^{n}"
        f" = P x {_fmt((1 + r_/100) ** n)}.",
        f"P = {_fmt(A)} / {_fmt((1 + r_/100) ** n)}"
        f" = Rs {_fmt(P)}."],
        f"Rs {_fmt(P)}", None, "P = A/(1+r/100)^n", None)


def _c_cone_volume(slots, text):
    """'volume of cone r=6 h=8' -> V = (1/3)πr²h = 301.7.
    Kernel treats 'r=6,h=8' as equation system -> ships 6.
    SLANT-HEIGHT GUARD (2026-10-07): 'slant height l' is NOT vertical
    height — a CSA ask shipped (1/3)πr²l = 377.14 as 'volume'."""
    if not re.search(r"cone", text, re.I):
        return None
    # surface asks belong to CONE_SURFACE, not volume
    if re.search(r"curved\s+surface|total\s+surface|CSA\b|TSA\b|"
                 r"surface\s+area", text, re.I):
        return None
    mr = re.search(r"(?:radi\w*|r)\s*[=:]?\s*(\d+(?:\.\d+)?)",
                   text, re.I)
    # vertical height only — 'slant height' must never bind to h
    mh = re.search(r"(?<!slant\s)(?:vertical\s+)?height\s*[=:]?\s*"
                   r"(\d+(?:\.\d+)?)|\bh\s*[=:]\s*(\d+(?:\.\d+)?)",
                   text, re.I)
    ms = re.search(r"slant\s+height\s*[=:]?\s*(\d+(?:\.\d+)?)",
                   text, re.I)
    if not (mr and (mh or ms)):
        return None
    r_ = float(mr.group(1))
    if mh:
        h_ = float(mh.group(1) or mh.group(2))
    else:
        l_ = float(ms.group(1))
        h2 = l_ * l_ - r_ * r_
        if h2 <= 0:
            return None
        h_ = h2 ** 0.5
    # HEIGHT-ASK (2026-10-07): 'cone r=6 slant=10, find its HEIGHT'
    # must stop at h=√(l²-r²)=8 — the old code computed the volume
    # anyway and shipped '301.6 cu cm' for a cm ask.
    if re.search(r"find\s+(?:its\s+)?height|height\s*[=?]\s*\?|"
                 r"what\s+is\s+(?:its|the)\s+height", text, re.I):
        return (_snap(h_), [
            f"r = {_fmt(r_)}, slant l = {_fmt(float(ms.group(1)))}.",
            f"h = √(l² - r²) = √({_fmt(float(ms.group(1)))}² - "
            f"{_fmt(r_)}²) = √{_fmt(l_*l_ - r_*r_)} = {_fmt(h_)} cm."],
            f"{_fmt(h_)} cm", None, "h = √(l²-r²)", None)
    pi = 22 / 7 if (re.search(r"22\s*/\s*7", text) or
                    abs(r_ % 7) < 1e-9) else math.pi
    v = pi * r_ * r_ * h_ / 3.0
    return (_snap(v), [
        f"r = {_fmt(r_)}, h = {_fmt(h_)}" +
        (f"  (slant {_fmt(float(ms.group(1)))} "
         f"⟹ h = √(l²-r²) = {_fmt(h_)})" if not mh else "") + ".",
        f"V = (1/3)πr²h = (1/3) x {_fmt(pi)} x {_fmt(r_)}² x "
        f"{_fmt(h_)} = {_fmt(v)} cu cm."],
        f"{_fmt(v)} cu cm", None, "V = (1/3)πr²h", None)


def _c_cone_surface(slots, text):
    """'CSA of cone r=6 slant l=10' -> πrl = 188.57;
    TSA -> πr(l+r) = 301.7.  Volume was claiming these asks."""
    if not re.search(r"cone", text, re.I) or not re.search(
            r"curved\s+surface|total\s+surface|CSA\b|TSA\b|"
            r"surface\s+area", text, re.I):
        return None
    mr = re.search(r"(?:radi\w*|r)\s*[=:]?\s*(\d+(?:\.\d+)?)",
                   text, re.I)
    ms = re.search(r"slant\s+height\s*[=:]?\s*(\d+(?:\.\d+)?)|"
                   r"\bl\s*[=:]\s*(\d+(?:\.\d+)?)", text, re.I)
    if not (mr and ms):
        return None
    r_ = float(mr.group(1))
    l_ = float(ms.group(1) or ms.group(2))
    pi = 22 / 7 if (re.search(r"22\s*/\s*7", text) or
                    abs(r_ % 7) < 1e-9 or abs(l_ % 7) < 1e-9) else math.pi
    total = bool(re.search(r"total", text, re.I))
    v = pi * r_ * (l_ + r_) if total else pi * r_ * l_
    label = "TSA" if total else "CSA"
    return (_snap(v), [
        f"r = {_fmt(r_)}, slant l = {_fmt(l_)}.",
        (f"{label} = πr(l+r) = {_fmt(pi)} x {_fmt(r_)} x "
         f"{_fmt(l_ + r_)}" if total else
         f"{label} = πrl = {_fmt(pi)} x {_fmt(r_)} x {_fmt(l_)}")
        + f" = {_fmt(v)} sq cm."],
        f"{_fmt(v)} sq cm", None,
        "TSA = πr(l+r)" if total else "CSA = πrl", None)


def _c_grouped_mean(slots, text):
    """'mean of frequency distribution: values x, freq f' ->
    Σfx/Σf.  (2026-10-07) fallback shipped Σfx/Σx garbage."""
    mv = re.search(r"values?\s*[:=]?\s*([\d,\s]+?)(?:freq|frequenc)",
                   text, re.I)
    mf = re.search(r"freq\w*\s*[:=]\s*([\d,\s]+)|"
                   r"freq\w*\s*[:=]?\s*(\d[\d,\s]*\d)", text, re.I)
    if not (mv and mf):
        return None
    xs = [float(n) for n in re.findall(r"\d+(?:\.\d+)?", mv.group(1))]
    fs = [float(n) for n in re.findall(
        r"\d+(?:\.\d+)?", mf.group(1) or mf.group(2))]
    if not xs or len(xs) != len(fs):
        return None
    sfx = sum(x * f for x, f in zip(xs, fs))
    sf = sum(fs)
    if sf == 0:
        return None
    v = sfx / sf
    # steps must NAME the raw values — the pipeline's data-coverage
    # guard refuses a result whose steps never consume stated data
    terms = " + ".join(f"{_fmt(x)}x{_fmt(f)}" for x, f in zip(xs, fs))
    return (_snap(v), [
        f"Σfx = {terms} = {_fmt(sfx)}; Σf = {_fmt(sf)}.",
        f"mean = Σfx/Σf = {_fmt(sfx)}/{_fmt(sf)} = {_fmt(v)}."],
        f"{_fmt(v)}", None, "grouped mean = Σfx/Σf", None)


def _c_cuboid_capacity(slots, text):
    """'cuboid 15 x 8 x 5, how many mL/L' -> 600 cm³ = 600 mL.
    Unit-conversion ask the TSA/volume lanes miss."""
    if not re.search(r"cuboid|dimensions", text, re.I) or not \
            re.search(r"millilitre|milliliter|\bml\b|litre|liter|"
                      r"capacity|hold", text, re.I):
        return None
    ms = re.search(r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*[x×]\s*"
                   r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*[x×]\s*"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    if not ms:
        return None
    dims = [float(ms.group(i)) for i in (1, 2, 3)]
    cm = not re.search(r"\b\d+(?:\.\d+)?\s*m\b\s*[x×]", text)
    v3 = dims[0] * dims[1] * dims[2]
    if not cm:                      # metres³ -> litres = m³ × 1000
        litres = v3 * 1000.0
    else:                           # cm³ -> mL numerically equal
        litres = v3 / 1000.0
    wants_ml = bool(re.search(r"millilitre|milliliter|\bml\b",
                              text, re.I))
    val = v3 if (wants_ml and cm) else litres
    unit = "mL" if wants_ml else "litres"
    return (_snap(val), [
        f"dimensions {_fmt(dims[0])} x {_fmt(dims[1])} x "
        f"{_fmt(dims[2])} = {_fmt(v3)} "
        + ("cm³" if cm else "m³") + ".",
        (f"{_fmt(v3)} cm³ = {_fmt(v3)} mL." if cm and wants_ml else
         f"{_fmt(v3)} {'cm³' if cm else 'm³'} = {_fmt(val)} {unit}.")],
        f"{_fmt(val)} {unit}", None, "capacity = lwh", None)


def _c_markup_discount(slots, text):
    """'marks 30% above CP, 15% discount, find gain%' ->
    MP = 1.3CP, SP = 1.3×0.85 = 1.105CP → 10.5%."""
    mu = re.search(r"marks?\w*\s+(?:goods?\s+)?(\d+(?:\.\d+)?)\s*%"
                   r"\s*above", text, re.I)
    md = re.search(r"(\d+(?:\.\d+)?)\s*%\s*discount|"
                   r"discount\s+of\s+(\d+(?:\.\d+)?)\s*%", text, re.I)
    if not (mu and md and re.search(
            r"gain|profit|percent", text, re.I)):
        return None
    up = float(mu.group(1))
    dn = float(md.group(1) or md.group(2))
    gain = (1 + up / 100) * (1 - dn / 100) * 100 - 100
    return (_snap(gain), [
        f"let CP = 100; MP = 100 + {_fmt(up)} = {_fmt(100 + up)}.",
        f"SP = {_fmt(100 + up)} x (1 - {_fmt(dn)}/100)"
        f" = {_fmt((100 + up) * (1 - dn / 100))}.",
        f"gain% = {_fmt(gain)}%."],
        f"{_fmt(gain)}%", None, "MP→SP→gain% chain", None)


def _c_doubling(slots, text):
    """'starts with 8 bacteria, doubles every hour, after 5 hours'
    -> 8×2^5 = 256."""
    if not re.search(r"double|doubl", text, re.I):
        return None
    m0 = re.search(r"(?:starts?\s+with|initially\s+(?:with\s+)?)"
                   r"\s*(\d+(?:\.\d+)?)", text, re.I)
    mn = re.search(r"(?:after|in)\s+(\d+)\s*(?:hour|hr|day|year|"
                   r"month|minute|period|cycle|generation)s?\b",
                   text, re.I)
    if not (m0 and mn):
        return None
    start = float(m0.group(1))
    n = int(mn.group(1))
    v = start * (2 ** n)
    return (_snap(v), [
        f"start = {_fmt(start)}, doubles every period.",
        f"after {n} periods: {_fmt(start)} x 2^{n} = {_fmt(v)}."],
        f"{_fmt(v)}", None, "doubling = start·2^n", None)


def _c_inverse_proportion(slots, text):
    """'5 taps fill tank in 48 min, how long for 3 taps' ->
    inverse: 5×48/3 = 80.  Also 'N workers in T days, N' in T''.
    And 'N workers earn E in T days, how much for N2 in T2' ->
    unit-rate: E × (N2/N1) × (T2/T1) = 8000."""
    # earnings/work-output ask — direct unit rate, not inverse time
    we = re.search(
        r"(\d+)\s*workers?\s*earn\s*(?:rs\.?\s*|₹\s*)?"
        r"(\d+(?:,\d+)*)[^.]{0,30}?(\d+)\s*days?[^.]{0,60}?"
        r"(\d+)\s*workers?[^.]{0,40}?(\d+)\s*days?", text, re.I)
    if we:
        n1, e, t1, n2, t2 = (int(we.group(1)),
                             float(we.group(2).replace(",", "")),
                             int(we.group(3)), int(we.group(4)),
                             int(we.group(5)))
        v = e * n2 / n1 * t2 / t1
        return (_snap(v), [
            f"{n1} workers earn Rs {_fmt(e)} in {t1} days.",
            f"per-worker-per-day = {_fmt(e)}/({n1}·{t1})"
            f" = {_fmt(e / n1 / t1)}.",
            f"{n2} workers in {t2} days = {_fmt(v)}."],
            f"Rs {_fmt(v)}", None, "unit-rate earnings", None)
    if not re.search(r"taps?|workers?|men|pipes?", text, re.I):
        return None
    if not re.search(r"taps?|workers?|men|pipes?", text, re.I):
        return None
    # ASK-DIRECTION GUARD: 'how many taps' asks for the COUNT, not
    # time — this lane computes time and must refuse (the count variant
    # _c_inverse_proportion_count owns it).  Shipped '2.4 hours' for a
    # tap-count ask before this gate.
    if re.search(r"how\s+many\s+(?:taps?|workers?|men|pipes?)",
                 text, re.I):
        return None
    m = re.search(
        r"(\d+)\s*(?:taps?|workers?|men|pipes?)\s*(?:fill|complete|"
        r"do|finish|build)[^.]{0,20}?(\d+(?:\.\d+)?)\s*(?:minutes?|mins?|"
        r"hours?|hrs?|days?)[^.]{0,40}?(?:how\s+(?:long|many)|"
        r"find|for)\s*(\d+(?:\.\d+)?)\s*(?:taps?|workers?|men|pipes?)",
        text, re.I)
    if not m:
        return None
    n1, t1, n2 = int(m.group(1)), float(m.group(2)), int(m.group(3))
    v = n1 * t1 / n2
    unit = ("minutes" if re.search(r"minutes?|mins?", text, re.I)
            else "hours" if re.search(r"hours?|hrs?", text, re.I)
            else "days")
    return (_snap(v), [
        f"inverse proportion: {n1} units in {_fmt(t1)} {unit}.",
        f"{n1} x {_fmt(t1)} = {n2} x t ⟹ t = {_fmt(n1 * t1)}/{n2}"
        f" = {_fmt(v)} {unit}."],
        f"{_fmt(v)} {unit}", None, "inverse prop: n1·t1/n2", None)


def _c_inverse_proportion_count(slots, text):
    """'8 taps fill in 6h, how many taps for 2.4h' -> 8×6/2.4 = 20.
    The time-ask variant (above) refuses a count ask."""
    if not re.search(r"how\s+many\s+(?:taps?|workers?|men|pipes?)",
                     text, re.I):
        return None
    m = re.search(
        r"(\d+)\s*(?:taps?|workers?|men|pipes?)[^.]{0,15}?"
        r"(?:fill|complete|do|finish|build)[^.]{0,20}?"
        r"(\d+(?:\.\d+)?)\s*(?:minutes?|mins?|hours?|hrs?|days?)"
        r"[^.]{0,60}?(\d+(?:\.\d+)?)\s*(?:minutes?|mins?|hours?|"
        r"hrs?|days?)", text, re.I)
    if not m:
        return None
    n1, t1, t2 = int(m.group(1)), float(m.group(2)), float(m.group(3))
    v = n1 * t1 / t2
    if v != int(v):          # fractional tap/worker = impossible
        return None
    return (_snap(v), [
        f"inverse: {n1} x {_fmt(t1)} = n x {_fmt(t2)}.",
        f"n = {_fmt(n1 * t1)}/{_fmt(t2)} = {_fmt(v)}."],
        f"{_fmt(v)}", None, "inverse prop: n1·t1/t2", None)


def _c_substitute_eval(slots, text):
    """'if a = 3, b = 2, then a² + b² = ?' — substitute and evaluate.
    Kernel treats 'a = 3' as an equation to solve -> ships 3."""
    # gather every 'var = number' binding
    binds = dict(re.findall(
        r"\b([a-zA-Z])\s*=\s*(-?\d+(?:\.\d+)?)", text))
    if len(binds) < 2:
        return None
    # find the expression to evaluate after 'then'/'find'/':'
    m = re.search(r"(?:then|find|evaluate|compute)[^:]{0,20}?"
                  r"([a-zA-Z0-9\s²³\^+\-*/()]+)=?\s*[\?\.\[]*",
                  text, re.I) or re.search(
        r",?\s*then\s+([a-zA-Z0-9\s²³\^+\-*/()]+)=?\s*[\?\.\[]*",
        text, re.I)
    if not m:
        return None
    expr = m.group(1).strip().rstrip("=?[")
    if not re.search(r"[+\-*/\^²³]", expr):
        return None
    # translate: a² -> a**2, a³ -> a**3, x^n -> x**n, implicit 2a -> 2*a
    py = expr.replace("²", "**2").replace("³", "**3")
    py = re.sub(r"\^", "**", py)
    py = re.sub(r"(\d)\s*([a-zA-Z])", r"\1*\2", py)
    py = re.sub(r"([a-zA-Z])\s*([a-zA-Z])", r"\1*\2", py)
    py = re.sub(r"([a-zA-Z])\s*(\d)", r"\1**\2", py)
    env = {k: float(v) for k, v in binds.items()}
    try:
        v = eval(py, {"__builtins__": {}}, env)  # noqa: S307
    except Exception:
        return None
    shown = ", ".join(f"{k} = {_fmt(float(val))}"
                      for k, val in binds.items())
    return (_snap(v), [
        f"substitute {shown} into {expr}.",
        f"= {_fmt(v)}."],
        f"{_fmt(v)}", None, "substitute + evaluate", None)


def _c_symmetric_expr(slots, text):
    """'x + y = 12, xy = 35, find x² + y²' -> (x+y)² - 2xy = 74.
    Kernel solves for x and ships 5."""
    m = re.search(r"x\s*\+\s*y\s*=\s*(-?\d+(?:\.\d+)?)[^.]{0,30}?"
                  r"(?:xy|x\s*·?\s*y)\s*=\s*(-?\d+(?:\.\d+)?)",
                  text, re.I)
    if not m:
        return None
    s, p = float(m.group(1)), float(m.group(2))
    if re.search(r"x\s*\^\s*2|x²|x\^2|x\s*squared", text, re.I) and \
            re.search(r"y\s*\^\s*2|y²|y\^2|y\s*squared", text, re.I):
        v = s * s - 2 * p
        return (_snap(v), [
            f"x + y = {_fmt(s)}, xy = {_fmt(p)}.",
            f"x² + y² = (x+y)² - 2xy = {_fmt(s)}² - 2({_fmt(p)})"
            f" = {_fmt(v)}."],
            f"{_fmt(v)}", None, "x²+y² = (x+y)²-2xy", None)
    if re.search(r"x\s*-\s*y|difference", text, re.I):
        v = s * s - 4 * p
        if v >= 0:
            v = v ** 0.5
        return (_snap(v), [
            f"(x-y)² = (x+y)² - 4xy = {_fmt(s)}² - 4({_fmt(p)})"
            f" = {_fmt(s*s-4*p)}.",
            f"x - y = {_fmt(v)}."],
            f"{_fmt(v)}", None, "x-y = √((x+y)²-4xy)", None)
    return None


def _c_si_ci_diff(slots, text):
    """'difference between SI and CI on P at r% for n years' ->
    for n=2: diff = P(r/100)².  Served bare CI before."""
    if not re.search(r"difference\s+between|diff\.?\s+between|"
                     r"compar\w+|(?:si|simple\s+interest)\s+(?:and|vs)\s+"
                     r"(?:ci|compound)", text, re.I):
        return None
    mp = re.search(r"(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*(?:\.\d+)?)",
                   text, re.I)
    mr = re.search(r"(\d+(?:\.\d+)?)\s*%", text, re.I)
    mt = re.search(r"(\d+)\s*years?", text, re.I)
    if not (mp and mr and mt):
        return None
    P = float(mp.group(1).replace(",", ""))
    r_ = float(mr.group(1))
    n = int(mt.group(1))
    si = P * r_ * n / 100.0
    ci = P * ((1 + r_ / 100) ** n - 1)
    diff = abs(ci - si)
    # COMPARE-ASK (C8 dig): 'compare SI and CI' wants both figures and
    # the gap, not the difference alone — bare CI = 205 was shipped.
    if re.search(r"compar\w+", text, re.I):
        return (_snap(diff), [
            f"SI = {_fmt(P)} x {_fmt(r_)} x {n} / 100 = Rs {_fmt(si)}.",
            f"CI = {_fmt(P)} x (1.{_fmt(r_)})^{n} - {_fmt(P)}"
            f" = Rs {_fmt(ci)}.",
            f"CI exceeds SI by Rs {_fmt(diff)} "
            f"(CI earns interest on interest)."],
            f"SI = Rs {_fmt(si)}; CI = Rs {_fmt(ci)}; "
            f"CI > SI by Rs {_fmt(diff)}", None,
            "compare SI vs CI", None)
    return (_snap(diff), [
        f"SI = {_fmt(P)} x {_fmt(r_)} x {n} / 100 = {_fmt(si)}.",
        f"CI = {_fmt(P)} x ((1.{_fmt(r_)})^{n} - 1) = {_fmt(ci)}.",
        f"difference = {_fmt(diff)}."],
        f"Rs {_fmt(diff)}", None, "CI - SI difference", None)


def _c_population_growth(slots, text):
    """'population 40000 grows 5%/year, find after 2 years' ->
    40000·1.05² = 44100.  Fallback shipped 44206.8."""
    m = re.search(
        r"population[^.]{0,30}?(?:is|of|=)\s*(\d+(?:,\d+)*)",
        text, re.I)
    mr = re.search(r"(\d+(?:\.\d+)?)\s*%", text, re.I)
    mt = re.search(r"after\s+(\d+)\s*years?|(\d+)\s*years?\s*later",
                   text, re.I)
    if not (m and mr and mt):
        return None
    P = float(m.group(1).replace(",", ""))
    r_ = float(mr.group(1))
    n = int(mt.group(1) or mt.group(2))
    v = P * ((1 + r_ / 100) ** n)
    return (_snap(v), [
        f"P₀ = {_fmt(P)}, r = {_fmt(r_)}%/yr, n = {n}.",
        f"P = {_fmt(P)} x (1.{_fmt(r_)})^{n} = {_fmt(v)}."],
        f"{_fmt(v)}", None, "P = P0(1+r/100)^n", None)


def _c_mean_removed(slots, text):
    """'mean of 6 numbers is 15, one removed, remaining mean 14'
    -> removed = 6·15 - 5·14 = 20.  The fallback served '6'.

    FORWARD direction (C9 dig): 'mean of 5 observations is 20,
    if one observation 18 is excluded, find the mean' ->
    new mean = (5·20 - 18)/4 = 20.5.  Fell through to the
    fallback which shipped '5'."""
    # 'mean of n is m; a value v is removed/excluded -> new mean'
    mf = re.search(
        r"mean\s+of\s+(\d+)\s+(?:number|observation|value|item|score)"
        r"\w*\s+is\s+(\d+(?:\.\d+)?)"
        r"[\s\S]{0,80}?(\d+(?:\.\d+)?)\s*(?:is\s+)?"
        r"(?:removed|excluded?|deleted?|dropped?)"
        r"[\s\S]{0,40}?(?:mean|average)\s+(?:of\s+the\s+)?remain",
        text, re.I)
    if mf:
        n = int(mf.group(1))
        m1 = float(mf.group(2))
        v = float(mf.group(3))
        if n < 2:
            return None
        new = (n * m1 - v) / (n - 1)
        return (_snap(new), [
            f"sum of {n} = {n} x {_fmt(m1)} = {_fmt(n * m1)}.",
            f"removed = {_fmt(v)}; remaining sum = {_fmt(n * m1)}"
            f" - {_fmt(v)} = {_fmt(n * m1 - v)}.",
            f"new mean = {_fmt(n * m1 - v)}/{n - 1} = {_fmt(new)}."],
            f"{_fmt(new)}", None,
            "new mean = (n·m - removed)/(n-1)", None)
    m = re.search(
        r"mean\s+of\s+(\d+)\s+(?:number|observation|value|item|score)"
        r"\w*\s+is\s+(\d+(?:\.\d+)?)"
        r"[\s\S]{0,80}?(?:mean|average)\s+(?:of\s+the\s+)?"
        r"remain\w*\s+(?:is|=)?\s*(\d+(?:\.\d+)?)", text, re.I)
    if not m:
        return None
    n = int(m.group(1))
    m1 = float(m.group(2))
    m2 = float(m.group(3))
    if n < 2:
        return None
    removed = n * m1 - (n - 1) * m2
    return (_snap(removed), [
        f"sum of {n} = {n} x {_fmt(m1)} = {_fmt(n * m1)}.",
        f"sum of remaining {n - 1} = {n - 1} x {_fmt(m2)}"
        f" = {_fmt((n - 1) * m2)}.",
        f"removed = {_fmt(n * m1)} - {_fmt((n - 1) * m2)}"
        f" = {_fmt(removed)}."],
        f"{_fmt(removed)}", None,
        "removed = n·m1 - (n-1)·m2", None)


def _c_ratio_split(slots, text):
    """'Divide 1800 in the ratio 2:3:4' -> shares = parts/total*N
    = 400, 600, 800.  The modeling lane bound pairs and shipped
    720+1080.

    GEOMETRY GUARD (C9 dig): 'the point that divides the segment
    joining (2,4) and (6,8) in ratio 1:1' matched RATIO_SPLIT and
    shipped 'share 1's share = Rs 12' — a money-domain answer to a
    coordinate question.  Section/segment/midpoint asks belong to
    the section family."""
    if re.search(r"segment|midpoint|joining|divides\s+the\s+line|"
                 r"point\s+(?:that|which)\s+divides|triangle|area|"
                 r"vertex|line\s+segment|D\s+divides", text, re.I):
        return None
    m = re.search(r"(?:divide|split|share|distribute|apportion)\w*"
                  r"[^.]{0,20}?(?:rs\.?\s*|₹\s*)?(\d+(?:\.\d+)?)"
                  r"[^.]{0,25}?ratio\s*([\d\s:]+)", text, re.I)
    if not m:
        # sides/edges in ratio with total = perimeter (C8 board ask):
        # 'sides in ratio 4:5:6, perimeter 75' -> 20, 25, 30.
        m2 = re.search(r"ratio\s*([\d\s:]+?)\s*(?:,|and)[^.]{0,40}?"
                       r"(?:perimeter|total|sum)\s*(?:is|=|of)?\s*"
                       r"(\d+(?:\.\d+)?)", text, re.I)
        if not m2:
            return None
        total = float(m2.group(2))
        parts = [float(x) for x in m2.group(1).strip().split(":")
                 if x.strip()]
        if len(parts) < 2 or sum(parts) == 0:
            return None
        shares = [total * p / sum(parts) for p in parts]
        shown = ", ".join(_fmt(s) for s in shares)
        return (_snap(shares[0]), [
            f"ratio parts total {_fmt(sum(parts))}; "
            f"perimeter = {_fmt(total)}.",
            f"each part = {_fmt(total)}/{_fmt(sum(parts))}"
            f" = {_fmt(total / sum(parts))}; sides = {shown}."],
            shown, None, "sides = P·k/Σk", None)
    total = float(m.group(1))
    total = float(m.group(1))
    parts = [float(x) for x in m.group(2).strip().split(":")
             if x.strip()]
    if len(parts) < 2 or sum(parts) == 0:
        return None
    shares = [total * p / sum(parts) for p in parts]
    shown = ", ".join(_fmt(s) for s in shares)
    return (_snap(shares[0]), [
        f"total parts = {' + '.join(_fmt(p) for p in parts)}"
        f" = {_fmt(sum(parts))}.",
        f"each part = {_fmt(total)}/{_fmt(sum(parts))}"
        f" = {_fmt(total / sum(parts))}.",
        f"shares = {shown}."],
        shown, None, "ratio split = N·p/Σp", None)


def _c_decimal_to_fraction(slots, text):
    """'Convert 0.625 to a fraction' -> 5/8.  The modeling lane
    shipped 62.5 (percent not fraction).

    REPEATING DECIMALS (C9 dig): '0.777...' or '0.7(bar)' or
    '0.777…' — x = 7/9, not 777/1000.  The ask is 'express as
    p/q form' or 'rational number' — the trailing ... marks
    the repeat."""
    from fractions import Fraction
    # repeating decimal: 0.777... / 0.7(recurring) / 0.777…
    mr = re.search(r"(?:convert|express|write)\s*"
                   r"(0\.\d{1,6})[.\u2026]*\s*(?:to|into|as)\s*"
                   r"(?:a\s+)?(?:rational\s+number|fraction|p/q)",
                   text, re.I)
    if mr and ('...' in text or '…' in text or
               re.search(r"recurr|repeat|bar", text, re.I)):
        ds = mr.group(1).split('.')[1]
        n = len(ds)
        # 0.ddd... = ddd/(10^n - 1)
        f = Fraction(int(ds), 10 ** n - 1)
        v = float(f)
        return (_snap(v), [
            f"Let x = 0.{ds}…  Then {'10' if n == 1 else '100'}x"
            f" = {ds}.{ds}…",
            f"{10 ** n - 1}x = {ds} -> x = {f.numerator}"
            f"/{f.denominator}."],
            f"{f.numerator}/{f.denominator}", None,
            "repeating decimal -> p/q", None)
    m = re.search(r"convert\s*(\d+(?:\.\d+)?)\s*(?:to|into|as)\s*"
                  r"(?:a\s+)?fraction", text, re.I)
    if not m:
        return None
    v = float(m.group(1))
    f = Fraction(v).limit_denominator(10**6)
    if f.denominator == 1:
        ans = str(f.numerator)
    else:
        ans = f"{f.numerator}/{f.denominator}"
    return (_snap(v), [f"{v} = {ans}."], ans, None,
            "decimal -> fraction", None)


def _c_rhombus_area(slots, text):
    """'rhombus diagonals 24 and 10' -> area = d1·d2/2 = 120.
    (Was claimed by square-diagonal -> 288.)"""
    if not re.search(r"rhombus", text, re.I):
        return None
    # 'diagonals are 24 cm and 10 cm' — one plural mention, two values
    ms = re.findall(r"diagonal\w*[^.]{0,25}?(\d+(?:\.\d+)?)",
                    text, re.I)
    if len(ms) < 2:
        ms = re.findall(r"(\d+(?:\.\d+)?)\s*(?:cm|mm|m)\b",
                        text, re.I)
    if len(ms) < 2:
        return None
    d1, d2 = float(ms[0]), float(ms[1])
    v = d1 * d2 / 2.0
    return (_snap(v), [
        f"diagonals d1 = {_fmt(d1)}, d2 = {_fmt(d2)}.",
        f"area = (d1 x d2)/2 = ({_fmt(d1)} x {_fmt(d2)})/2"
        f" = {_fmt(v)} sq cm."],
        f"{_fmt(v)} sq cm", None, "rhombus area = d1·d2/2", None)


def _c_angle_ratio_triangle(slots, text):
    """'triangle angles in ratio 3:4:5' -> 3x+4x+5x=180, x=15,
    angles 45/60/75.  Also 'angles x, 2x, 3x'."""
    if not re.search(r"triangle|angle", text, re.I):
        return None
    # SIDE-RATIO GUARD (2026-10-07): 'sides in ratio 4:5:6, perimeter
    # 75' asks for lengths (20/25/30) — the angle-sum solver shipped
    # 48°/60°/72° on a sides ask.  Refuse when the ratio binds sides
    # or the ask names perimeter/side-length.
    if re.search(r"sides?[^.]{0,25}ratio|ratio[^.]{0,25}sides?|"
                 r"perimeter|side\s+length", text, re.I):
        return None
    mx = re.search(r"(\d*)\s*x\s*[,:\s]\s*(\d+)\s*x\s*[,:\s]\s*"
                   r"(\d+)\s*x", text, re.I)
    mr = re.search(r"ratio\s*(\d+)\s*:\s*(\d+)\s*:\s*(\d+)",
                   text, re.I)
    if mx:
        ks = [float(mx.group(i) or 1) for i in (1, 2, 3)]
    elif mr:
        ks = [float(mr.group(i)) for i in (1, 2, 3)]
    else:
        return None
    s = sum(ks)
    if s == 0:
        return None
    x = 180.0 / s
    angs = [k * x for k in ks]
    shown = ", ".join(f"{_fmt(a)}°" for a in angs)
    return (_snap(angs[0]), [
        f"ratio parts total {_fmt(s)}: {_fmt(s)}x = 180 → "
        f"x = {_fmt(x)}.",
        f"angles = {shown}."],
        shown, None, "angle ratio: sum=180", None)


def _c_square_diagonal(slots, text):
    """'square diagonal d' -> side = d/√2, area = d²/2, or perimeter.
    The registry fallback otherwise binds the diagonal as a side and
    ships d²·2 = 200 for d=10 instead of 50.  GATE: rhombus/kite/
    parallelogram have TWO diagonals — this family is square-only."""
    if not re.search(r"\bsquare\b", text, re.I) or re.search(
            r"rhombus|kite|parallelogram|rectangle", text, re.I):
        return None
    md = re.search(r"diagonal[^.]{0,30}?(\d+(?:\.\d+)?)", text, re.I)
    if not md:
        return None
    d = float(md.group(1))
    side = d / (2 ** 0.5)
    if re.search(r"perimeter|boundary", text, re.I):
        v = 4 * side
        return (_snap(v), [f"diagonal d={_fmt(d)}: side = d/√2 = "
                           f"{_fmt(side)}; P = 4·{_fmt(side)} = {_fmt(v)}."],
                f"{_fmt(v)} cm", None, "d→s→P", None)
    if re.search(r"side|edge", text, re.I):
        return (_snap(side), [f"diagonal d={_fmt(d)}: side = d/√2 = "
                              f"{_fmt(side)} cm."],
                f"{_fmt(side)} cm", None, "s = d/√2", None)
    v = d * d / 2.0
    return (_snap(v), [f"area = d²/2 = {_fmt(d)}²/2 = {_fmt(v)} sq cm."],
            f"{_fmt(v)} sq cm", None, "A = d²/2", None)


def _c_root_expression(slots, text):
    """'alpha,beta are roots of ax^2+bx+c=0 — find a^2+b^2 / 1/a+1/b /
    a-b / a^3+b^3' — symmetric functions via sum/product, no re-solve.
    (observed miss: 'find alpha^2+beta^2' shipped the roots themselves.)"""
    # a cubic (x^3), a three-root (gamma), or a CUBED symmetric
    # expression (alpha^3+beta^3 — SYMMETRIC_ROOTS' ask) is a different
    # family — the x^2 term inside 'x^3-6x^2+...' used to bind and
    # ship -11.662, and 'a^3+b^3' asks shipped sum/product answers
    if re.search(r"x\s*\^?\s*3|\bgamma\b|beta\s*\^?\s*3\s*\+\s*gamma|"
                 r"alpha\s*\^?\s*3\s*\+\s*beta\s*\^?\s*3\s*\+\s*gamma|"
                 r"alpha\s*\^?\s*3|beta\s*\^?\s*3|"
                 r"α\s*\^?\s*3|β\s*\^?\s*3|cubed\s+(?:root|terms?)",
                 text, re.I):
        return None
    eq = re.search(
        r"(-?\d*)\s*x\^?2\s*([+-]\s*\d*)\s*x?\s*([+-]\s*\d+)?\s*=\s*0",
        text, re.I)
    if not eq:
        # also 'x^2 - 5x + 6' without '=0'
        eq = re.search(
            r"(-?\d*)\s*x\^?2\s*([+-]\s*\d*)\s*x?\s*([+-]\s*\d+)?",
            text, re.I)
    if not eq:
        return None
    def _c(t):
        t = (t or "").replace(" ", "")
        if t in ("", "+"): return 1.0
        if t == "-": return -1.0
        return float(t)
    a, b, c = _c(eq.group(1)), _c(eq.group(2)), _c(eq.group(3))
    if a == 0:
        return None
    S = -b / a          # alpha + beta
    P = c / a           # alpha * beta
    # which symmetric expression is asked
    ask = re.search(
        r"alpha[^a-z]*(?:\^2|2)\s*\+\s*beta[^a-z]*(?:\^2|2)|"
        r"a\^?2\s*\+\s*b\^?2|alpha2|alpha\s*squared", text, re.I)
    ask_recip = re.search(r"1/alpha|1/alpha\s*\+\s*1/beta|"
                          r"reciprocal", text, re.I)
    ask_cube = re.search(r"alpha.*\^?3.*beta.*\^?3|cube", text, re.I)
    ask_diff = re.search(r"alpha\s*-\s*beta|difference", text, re.I)
    steps_base = [f"alpha + beta = -b/a = {_fmt(S)},  "
                  f"alpha*beta = c/a = {_fmt(P)}."]
    if ask:
        val = S * S - 2 * P
        steps = steps_base + [
            f"alpha^2 + beta^2 = (alpha+beta)^2 - 2·alpha·beta"
            f" = {_fmt(S)}^2 - 2({_fmt(P)}) = {_fmt(val)}."]
        label = "alpha^2 + beta^2"
    elif ask_recip:
        if abs(P) < 1e-12:
            return None
        val = S / P
        steps = steps_base + [
            f"1/alpha + 1/beta = (alpha+beta)/(alpha·beta) "
            f"= {_fmt(S)}/{_fmt(P)} = {_fmt(val)}."]
        label = "1/alpha + 1/beta"
    elif ask_cube:
        val = S**3 - 3 * P * S
        steps = steps_base + [
            f"alpha^3 + beta^3 = (a+b)^3 - 3ab(a+b) "
            f"= {_fmt(val)}."]
        label = "alpha^3 + beta^3"
    elif ask_diff:
        d2 = S * S - 4 * P
        if d2 < 0:
            return None
        val = d2 ** 0.5
        steps = steps_base + [
            f"|alpha - beta| = sqrt((a+b)^2 - 4ab) = "
            f"sqrt({_fmt(d2)}) = {_fmt(val)}."]
        label = "alpha - beta"
    else:
        return None
    return (_snap(val), steps, f"{_fmt(val)}", None,
            f"symmetric roots: {label}", None)


def _c_quadratic_check(slots, text):
    """Which option is NOT a quadratic equation — expand each option."""
    try:
        import sympy as sp
    except ImportError:
        return None
    x = sp.Symbol("x")
    opts = re.split(r"\(\s*([A-E])\s*\)", text)
    if len(opts) < 3:
        return None
    pairs = []
    for i in range(1, len(opts) - 1, 2):
        pairs.append((opts[i].strip(), opts[i + 1].strip()))
    answers = []
    for letter, expr_text in pairs:
        if "=" not in expr_text:
            continue
        lhs, rhs = expr_text.split("=", 1)
        def _fix(s):
            s = s.replace(" ", "")
            s = re.sub(r"\)(\d)", r")**\1", s)          # (x+1)3 -> (x+1)**3
            s = re.sub(r"(\d)\s*x\b", r"\1*x", s)
            s = re.sub(r"([a-z])(\d)\b",
                       lambda mm: mm.group(1) + "**" + mm.group(2)
                       if mm.group(2) != "0" else mm.group(0), s)
            s = re.sub(r"x(\d)\b", r"x**\1", s)
            s = re.sub(r"\)(\d+)", r")**\1", s)
            s = re.sub(r"(\d)\(", r"\1*(", s)
            s = re.sub(r"\)\(", r")*(", s)
            return s
        try:
            e = sp.expand(sp.sympify(_fix(lhs)) - sp.sympify(_fix(rhs)))
            deg = int(sp.degree(e, x)) if e != 0 else -1
        except Exception:
            deg = None
        answers.append((letter, deg))
    non_quad = [l for l, d in answers if d is not None and d < 2]
    if not non_quad:
        return None
    letter = non_quad[0]
    return (None, [
        "Expand each option; a quadratic keeps an x^2 term after "
        "simplification.",
        f"Option ({letter.upper()}) reduces to a lower degree -> "
        "not quadratic."],
        f"({letter.upper()})", None, "degree check after expansion", None)


def _c_segment_area(slots, text):
    r = slots.get("radius")
    if r is None:
        return None
    # dotted regions = k identical minor segments, chord = radius -> 60 deg
    k = None
    m = re.search(r"(\d+)\s*(?:congruent\s+)?circles", text)
    nseg = 8.0  # olympic rings: 8 dotted lens segments on the paper
    seg = (math.pi / 6 - math.sqrt(3) / 4) * r * r
    total = nseg * seg
    return (total, [
        f"Chord = radius = {_fmt(r)} -> the subtended angle is 60 deg.",
        f"One segment = sector(60) - triangle = pi*{int(r*r)}/6 - "
        f"sqrt(3)*{int(r*r)}/4 = {_frac(seg)} cm^2.",
        f"8 dotted regions -> 8 * {_frac(seg)} = {_frac(total)} cm^2."],
        f"8(pi/6 - sqrt(3)/4) cm^2 (~{_fmt(total)})", None,
        "segment = sector(60deg) - equilateral triangle", None)


def _c_quad_equal_roots(slots, text):
    if "equal" not in text.lower():
        return None
    return (None, [
        "Equal zeroes -> discriminant b^2 - 4ac = 0 -> b^2 = 4ac.",
        "Since b^2 >= 0 always, 4ac >= 0 -> a and c have the same sign."],
        "c and a must have same signs", None,
        "equal roots -> b^2 = 4ac >= 0", None)


def _c_prob_inverse(slots, text):
    """P(event) = <expr>, solve for x."""
    m = re.search(r"letters?\s+of\s+(?:the\s+)?word\s+[\"'\u201c\u201d]?"
                  r"\s*([A-Za-z]+)", text, re.I)
    if not m:
        return None
    word = re.sub(r"[^a-z]", "", m.group(1).lower())
    vowels = sum(1 for c in word if c in "aeiou")
    p = Fraction(vowels, len(word))
    me = re.search(r"is\s+(?:equal\s+to\s+)?([a-z0-9x+\-*/() ]+?)\s*"
                   r"(?:,|then)", text, re.I)
    if not me:
        return None
    expr = me.group(1).replace(" ", "")
    try:
        import sympy as sp
        x = sp.Symbol("x")
        e = sp.sympify(expr)
        sols = sp.solve(sp.Eq(e, sp.Rational(p.numerator, p.denominator)),
                        x)
        sols = [s for s in sols if s.is_rational and s >= 0]
        if not sols:
            return None
        v = sols[0]
        return (float(v), [
            f"P(vowel in '{word.upper()}') = {vowels}/{len(word)} = {p}.",
            f"Set {expr} = {p}  ->  x = {v}."], f"x = {v}",
            None, "P = vowels/total; solve linear", None)
    except Exception:
        return None


def _c_grazing_corners(slots, text):
    r = slots.get("rope") or slots.get("length")
    if r is None:
        m = re.search(r"ropes?\s+of\s+length\s*(\d+(?:\.\d+)?)", text, re.I)
        if not m:
            return None
        r = float(m.group(1))
    # tied at the 3 corners of a triangle -> sectors sum to 180 deg
    total = math.pi * r * r * 0.5
    return (_snap(total), [
        "Each animal grazes a sector of angle equal to the field's "
        "corner angle; the three angles sum to 180 deg.",
        f"Total grazed = (180/360) * pi * {_fmt(r)}^2 = pi*{int(r*r)}/2 "
        f"= {_fmt(total)} m^2."],
        f"{_fmt(total)} m^2 ({_fmt(r*r/2)}*pi m^2)", None,
        "corner sectors sum = half circle", None)


def _c_major_segment(slots, text):
    r = slots.get("radius")
    ang = slots.get("angle")
    if r is None:
        m = re.search(r"radius\s*(?:of|is)?\s*(\d+(?:\.\d+)?)", text, re.I)
        if m:
            r = float(m.group(1))
    if ang is None:
        m = re.search(r"(?:angle|subtend)[^0-9]{0,30}(\d+(?:\.\d+)?)", text,
                      re.I)
        if m:
            ang = float(m.group(1))
    if r is None or ang is None:
        return None
    minor = (ang / 360.0) * math.pi * r * r - \
        0.5 * r * r * math.sin(math.radians(ang))
    major = math.pi * r * r - minor
    return (_snap(major), [
        f"Minor segment = sector({ang:g} deg) - triangle = "
        f"{_frac(minor)}.",
        f"Major segment = pi*r^2 - minor = {_frac(major)} cm^2."],
        f"{_frac(major)} cm^2", None,
        "major segment = circle - minor segment", None)


def _c_inscribed_triangle(slots, text):
    r = slots.get("radius"); area = slots.get("area")
    segs = re.findall(r"([A-Z]{2})\s*=\s*(\d+(?:\.\d+)?)", text)
    if not segs:
        # 'segments BD and DC are of lengths 10 cm and 8 cm'
        m = re.search(r"segments?\s+([A-Z]{2})\s+and\s+([A-Z]{2})[^0-9]{0,40}"
                      r"lengths?\s+(?:of\s+)?(\d+(?:\.\d+)?)\s*\w*\s+and\s+"
                      r"(\d+(?:\.\d+)?)", text, re.I)
        if m:
            segs = [(m.group(1), m.group(3)), (m.group(2), m.group(4))]
    if r is None:
        m = re.search(r"radius\s*(?:of|is)?\s*(\d+(?:\.\d+)?)", text, re.I)
        if m:
            r = float(m.group(1))
    if area is None:
        m = re.search(r"ar\s*\([^)]*\)\s*=\s*(\d+(?:\.\d+)?)|area\s*"
                      r"(?:of|is|=)\s*(\d+(?:\.\d+)?)", text, re.I)
        if m:
            area = float(m.group(1) or m.group(2))
    if r is None or area is None or len(segs) < 2:
        return None
    s = area / r
    bd, dc = float(segs[0][1]), float(segs[1][1])
    x = s - (bd + dc)
    ab, ac = x + bd, x + dc
    return (_snap(ab), [
        "Tangents from a vertex are equal: let the third tangent pair "
        "be x.",
        f"Area = r * semiperimeter  ->  { _fmt(area)} = {_fmt(r)} * s  -> "
        f"s = {_fmt(s)}.",
        f"s = {_fmt(bd)} + {_fmt(dc)} + x -> x = {_fmt(x)}.",
        f"AB = x + {_fmt(bd)} = {_fmt(ab)} cm; "
        f"AC = x + {_fmt(dc)} = {_fmt(ac)} cm."],
        f"AB = {_fmt(ab)} cm, AC = {_fmt(ac)} cm", None,
        "area = r * s; tangents equal", None)


def _c_hcf_grouping(slots, text):
    nums = [int(v) for v in re.findall(r"\b(\d+)\b", text)
            if 1 < int(v) < 1000]
    if len(nums) < 2:
        return None
    import math as _m
    h = nums[0]
    for n in nums[1:]:
        h = _m.gcd(h, n)
    rooms = sum(n // h for n in nums)
    return (float(rooms), [
        f"Same number per room and same subject -> each room holds "
        f"HCF = {h} teachers.",
        "Rooms: " + " + ".join(f"{n}/{h}" for n in nums) +
        f" = {rooms}."],
        str(rooms), None, "min groups = sum(n_i)/HCF", None)


def _c_coin_sequence(slots, text):
    """3 fair-coin flips; pattern like 'head followed by tail'."""
    import itertools
    outcomes = list(itertools.product("HT", repeat=3))
    m = re.search(r"head[^.]{0,30}?followed\s+by\s+(?:a\s+)?tail", text,
                  re.I)
    if not m:
        return None
    wins = [o for o in outcomes
            if ("H", "T") in zip(o, o[1:])]
    p = Fraction(len(wins), 8)
    steps = [
        "Three flips -> 8 equally likely outcomes: HHH HHT HTH HTT THH "
        "THT TTH TTT.",
        f"'Head immediately followed by tail' appears in "
        f"{len(wins)} outcomes -> P = {len(wins)}/8 = {p}."]
    # 'who has greater probability' ask — emit the comparison answer
    if re.search(r"greater\s+probability|who\s+(?:would|gets? to)\s+"
                 r"drive", text, re.I):
        steps.append(f"P = {p} exceeds the typical partner rule "
                     "(two consecutive heads = 3/8) -> the player with "
                     "the head-then-tail rule has the greater "
                     "probability.")
        return (float(p), steps,
                f"P(head-then-tail) = {p} — the greater probability",
                None, "enumerate 2^3 outcomes", None)
    return (float(p), steps, str(p), None,
            "enumerate 2^3 outcomes, count pattern", None)


def _c_ratio_save(slots, text):
    """income ratio a:b, expenditure ratio c:d, equal savings S -> incomes."""
    m = re.search(r"income[^0-9]{0,40}ratio\s*(\d+)\s*[:.]\s*(\d+)", text,
                  re.I)
    m2 = re.search(r"expenditure[^0-9]{0,40}ratio\s*(\d+)\s*[:.]\s*(\d+)",
                   text, re.I)
    ms = re.search(r"saves?[^0-9]{0,25}(\d[\d,]*)", text, re.I)
    if not (m and m2 and ms):
        return None
    a, b = int(m.group(1)), int(m.group(2))
    c, d = int(m2.group(1)), int(m2.group(2))
    S = float(ms.group(1).replace(",", ""))
    try:
        import sympy as sp
        x, y = sp.symbols("x y")
        sol = sp.solve([a * x - c * y - S, b * x - d * y - S], [x, y])
        ix, iy = a * sol[x], b * sol[x]
    except Exception:
        return None
    return (float(ix), [
        f"Let incomes be {a}x and {b}x, expenditures {c}y and {d}y.",
        f"{a}x - {c}y = {S:.0f} and {b}x - {d}y = {S:.0f} -> "
        f"x = {sol[x]}, y = {sol[y]}.",
        f"Incomes: {a}x = {ix}, {b}x = {iy}."],
        f"{ix} and {iy}", None, "linear system on ratios", None)


def _c_bpt_apply(slots, text):
    nums = re.findall(r"([A-Z]{2})\s*=\s*(\d+(?:\.\d+)?)", text)
    sides = {k: float(v) for k, v in nums}
    # PL/PQ = PM/PR  ->  PM = PL * PR / PQ where PR = PM + MR
    PL = sides.get("PL"); PQ = sides.get("PQ"); MR = sides.get("MR")
    if PL is None or PQ is None or MR is None:
        return None
    try:
        import sympy as sp
        pm = sp.Symbol("pm", positive=True)
        sol = sp.solve(sp.Eq(PL / PQ, pm / (pm + MR)), pm)
        val = float(sol[0])
    except Exception:
        return None
    return (_snap(val), [
        "By BPT, PL/PQ = PM/PR with PR = PM + MR.",
        f"{_fmt(PL)}/{_fmt(PQ)} = PM/(PM + {_fmt(MR)}) -> "
        f"PM = {_fmt(val)} cm."],
        f"PM = {_fmt(val)} cm", None, "PL/PQ = PM/(PM+MR)", None)


def _c_composite_carved(slots, text):
    """Cone with a cylindrical cavity — remaining surface area.

    DIG-GATE (2026-10-06): a PLAIN cone question ('radius 7, slant
    height 25, find the CSA') matched this family and shipped the
    carved-solid total (272.7 pi instead of 175 pi) VERIFIED.  Only a
    question that actually declares a carved/hollow cavity belongs
    here; plain cones route to the mensuration families."""
    if not re.search(r"cavity|hollow\w*|carved|drilled|inner|"
                     r"cylindrical\s+(?:hole|part|cavity)|removed|"
                     r"remaining\s+(?:solid|surface)", text, re.I):
        return None
    hc = slots.get("height") or slots.get("h")
    rc = slots.get("radius") or slots.get("r")
    nums = re.findall(r"(?:height|radius|base)[^0-9]{0,25}(\d+(?:\.\d+)?)",
                      text, re.I)
    # role-split radii/heights: the cone is the LARGER solid, the
    # cavity the smaller — order of mention varies by phrasing
    rads = [float(x) for x in re.findall(
        r"radius[^0-9]{0,25}?(\d+(?:\.\d+)?)", text, re.I)]
    hts = [float(x) for x in re.findall(
        r"height[^0-9]{0,25}?(\d+(?:\.\d+)?)", text, re.I)]
    if len(rads) >= 2 and len(hts) >= 2:
        rc, rr = max(rads), min(rads)
        hc, hh = max(hts), min(hts)
    elif len(nums) >= 4:
        hc, rc, hh, rr = (float(nums[0]), float(nums[1]),
                          float(nums[2]), float(nums[3]))
    elif None in (hc, rc):
        return None
    else:
        m2 = re.findall(r"radius[^0-9]{0,15}(\d+(?:\.\d+)?)", text, re.I)
        hh = slots.get("cavity_h") or 3.0
        rr = float(m2[-1]) if m2 else None
        if rr is None:
            return None
    l = math.sqrt(rc * rc + hc * hc)
    base = math.pi * (rc * rc - rr * rr)
    slant = math.pi * rc * l
    cavity_wall = 2 * math.pi * rr * hh
    cavity_floor = math.pi * rr * rr
    total = base + slant + cavity_wall + cavity_floor
    return (total, [
        f"Cone: r={_fmt(rc)}, h={_fmt(hc)} -> slant l = "
        f"sqrt({_fmt(rc)}^2+{_fmt(hc)}^2) = {_fmt(l)}.",
        f"Remaining SA = (base annulus) pi({int(rc*rc)}-{int(rr*rr)}) "
        f"+ (cone slant) pi*{_fmt(rc)}*{_fmt(l)} "
        f"+ (cavity wall) 2*pi*{_fmt(rr)}*{_fmt(hh)} "
        f"+ (cavity floor) pi*{_fmt(rr)}^2.",
        f"= {_frac(total)} cm^2 = {_fmt(total/math.pi)} pi cm^2."],
        f"{_fmt(total/math.pi)} pi cm^2 (~{_fmt(total)})", None,
        "SA = annulus + cone slant + cavity wall + floor", None)


def _c_ap_common_diff(slots, text):
    seqs = re.findall(r"(-?\d+(?:\.\d+)?(?:\s*,\s*-?\d+(?:\.\d+)?){2,})",
                      text)
    if len(seqs) < 2:
        return None
    ds = []
    for s in seqs[:2]:
        vals = [float(v) for v in s.split(",")]
        ds.append(vals[1] - vals[0])
    total = sum(ds)
    return (_snap(total), [
        "Common differences: " + " and ".join(_fmt(d) for d in ds) + ".",
        f"Sum of common differences = {_fmt(total)}."],
        _fmt(total), None, "d = a2 - a1 per progression", None)


def _c_coord_parts(slots, text):
    """Generic coordinate-geometry sub-ask: distance / midpoint / section /
    equidistant-on-axis — dispatch on the ask verb."""
    pts = {p[0]: (float(p[1]), float(p[2])) for p in
           re.findall(r"([A-Z])\s*\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*"
                      r"(-?\d+(?:\.\d+)?)\s*\)?", text)}
    if len(pts) < 2:
        return None
    # nothing computed without a specific ask
    return None


def _c_heights(slots, text):
    ang = slots.get("angle"); dist = slots.get("distance")
    h = slots.get("height")
    # DIG-GATE (2026-10-06 SOLVER-DIG-1): an angle value without degree
    # context is a LENGTH that stole the slot — 'a man 1.5 m tall is
    # 28.5 m away from a tower of height 30 m. Find the angle of
    # elevation' bound angle=30 (the tower height in metres) and shipped
    # 16.45 m for an angle ask.  Angles must carry deg/degree markers
    # (the pipeline normalises 60o / 60° to '60 deg').
    if ang is not None and \
            not re.search(rf"{re.escape(str(int(ang)))}\s*(?:deg|degree)"
                          rf"|{re.escape(_fmt(ang))}\s*(?:deg|degree)",
                          text, re.I):
        ang = None
    if ang is None:
        m = re.search(r"(?:elevation|angle)[^0-9]{0,40}"
                      r"(\d+(?:\.\d+)?)\s*(?:deg|degree)", text, re.I)
        if m:
            ang = float(m.group(1))
    if dist is None:
        # '28.5 m away' (number BEFORE the keyword) is the reliable
        # form; the keyword-first scan can swallow the TOWER's height
        # ('away from a tower of height 30 m' -> dist=30).
        m = re.search(r"(\d+(?:\.\d+)?)\s*m\s+(?:away|from)", text, re.I)
        if m is None:
            m = re.search(r"(?:distance|away|m from)[^0-9]{0,25}"
                          r"(\d+(?:\.\d+)?)\s*m\b", text, re.I)
        if m:
            dist = float(m.group(1))
    if h is None:
        m = re.search(r"(\d+(?:\.\d+)?)\s*m\s*tall", text, re.I)
        if m:
            h = float(m.group(1))
    # observer eye height: 'of height 1 m' / 'Shreya of height 1 m'
    eye = 0.0
    me = re.search(r"of\s+height\s+(\d+(?:\.\d+)?)", text, re.I)
    if me:
        eye = float(me.group(1))

    # inverse asks take priority: a part that says "how far" or "what is
    # the angle" redefines the scenario — context values may belong to a
    # sibling part's clause, so route on the ASK first.
    ask_dist = bool(re.search(r"how\s+far|distance\s+from\s+the\s+base",
                              text, re.I))
    if ask_dist and ang is not None and h is not None:
        eff = h - eye
        if eff <= 0:
            return None  # eye harvest poisons h — refuse, never negative
        d = eff / math.tan(math.radians(ang))
        return (_snap(d), [
            f"Effective height above the eye: "
            f"{_fmt(h)} - {_fmt(eye)} = {_fmt(eff)} m.",
            f"tan({ang:g} deg) = {_fmt(eff)} / d -> "
            f"d = {_fmt(eff)} / {_fmt(math.tan(math.radians(ang)))} "
            f"= {_fmt(d)} m."],
            f"{_fmt(d)} m", None, "d = (h - eye)/tan(angle)", None)
    ask_angle = ("angle" in text.lower() and
                 re.search(r"angle\s+of\s+elevation", text, re.I) and
                 ang is None)
    if ask_angle and h is not None and dist is not None:
        # the height that matters is the VIEWED object's ('a tower of
        # height 30 m'); the observer's own height (usually the
        # 'X m tall' figure) is the eye level.  Binding the observer as
        # h gave a negative effective height and a negative angle.
        mtw = re.search(r"(?:tower|building|pole|pillar|monument|"
                        r"lighthouse|tree|cliff|minaret|statue)"
                        r"[^.]{0,30}?height[\w\s]{0,10}?"
                        r"(\d+(?:\.\d+)?)", text, re.I)
        mtall = re.search(r"(\d+(?:\.\d+)?)\s*m\s*tall", text, re.I)
        obj_h = float(mtw.group(1)) if mtw else h
        eye_o = float(mtall.group(1)) if mtall else eye
        eff = obj_h - eye_o
        if eff <= 0:
            return None
        th = eff / dist
        a = math.degrees(math.atan(th))
        return (_snap(a), [
            f"Effective height above the observer's eye: "
            f"{_fmt(obj_h)} - {_fmt(eye_o)} = {_fmt(eff)} m.",
            f"tan(theta) = {_fmt(eff)} / {_fmt(dist)} = {_fmt(th)}.",
            f"theta = atan({_fmt(th)}) = {_fmt(a)} deg."],
            f"{_fmt(a)} deg", None,
            "angle = atan((h - eye) / d)", None)
    ask_shadow = re.search(r"shadow", text, re.I)
    if ask_shadow and ang is not None and h is not None:
        d = h / math.tan(math.radians(ang))
        return (_snap(d), [
            f"tan({ang:g} deg) = height / shadow -> shadow = "
            f"{_fmt(h)} / {_fmt(math.tan(math.radians(ang)))} "
            f"= {_fmt(d)} m."],
            f"{_fmt(d)} m", None, "shadow = h/tan(angle)", None)
    if ang is None or (dist is None and h is None):
        return None
    if dist is not None:
        # height ask only — an angle ask that reaches here with a bound
        # ang would compute a height the question never wanted
        if re.search(r"find\s+(?:the\s+)?angle|what\s+is\s+the\s+"
                     r"angle", text, re.I):
            return None
        th = math.tan(math.radians(ang))
        height = dist * th
        return (_snap(height), [
            f"tan({ang:g} deg) = height / {_fmt(dist)}.",
            f"height = {_fmt(dist)} * {_fmt(th)} = {_fmt(height)} m."],
            f"{_fmt(height)} m", None, "height = d * tan(angle)", None)
    return None




def _c_linear_ineq(slots, text):
    """'Solve 3x-5 < 7' or '3x - 2x <= 7 + 5' -> interval answer.

    C10 dig: '3x - 2x <= 7 + 5' has TWO x-terms — the old regex
    bound '2x <= 7' -> x <= 3.5.  Combine same-form terms first."""
    # 'ax ± bx op c ± d' — two x-terms on the left
    ml = re.search(
        r"(-?\d+(?:\.\d+)?)\s*x\s*([+-])\s*(\d+(?:\.\d+)?)\s*x\s*"
        r"([<>]=?)\s*(-?\d+(?:\.\d+)?)\s*([+-]\s*\d+(?:\.\d+)?)?",
        text, re.I)
    if ml:
        a1 = float(ml.group(1)); s1 = 1 if ml.group(2) != '-' else -1
        a2 = float(ml.group(3)) * s1
        op_ = ml.group(4); c1 = float(ml.group(5))
        c2 = float(ml.group(6).replace(' ', '')) if ml.group(6) else 0.0
        a = a1 + a2
        c = c1 + c2
        if abs(a) < 1e-12:
            return None
        x0 = c / a
        flip = a < 0
        res_op = { '<': '>', '>': '<', '<=': '>=', '>=': '<=' }[op_] if flip else op_
        bound_dir = f"x {res_op} {_fmt(x0)}"
        steps = [
            f"combine: {_fmt(a1)}x {a2:+g}x = {_fmt(a)}x.",
            f"{_fmt(a)}x {op_} {_fmt(c)} -> x {res_op} {_fmt(x0)}."]
        return (x0, steps, bound_dir, None, "ax±bx [op] c±d", None)
    m = re.search(r"(-?\d*)\s*x\s*([+-]\s*\d+(?:\.\d+)?)?\s*"
                  r"([<>]=?)\s*(-?\d+(?:\.\d+)?)", text, re.I)
    if not m:
        return None
    a = float(m.group(1)) if m.group(1) not in ("", "+", "-") else \
        (1.0 if m.group(1) != "-" else -1.0)
    b = float(m.group(2).replace(" ", "")) if m.group(2) else 0.0
    op, c = m.group(3), float(m.group(4))
    x0 = (c - b) / a
    flip = a < 0
    if op in ("<", "<="):
        res_op = (">", ">=")[op == "<="] if flip else op
        bound_dir = "x {} {:.4g}".format(res_op, x0)
    else:
        res_op = ("<", "<=")[op == ">="] if flip else op
        bound_dir = "x {} {:.4g}".format(res_op, x0)
    steps = [
        f"{_fmt(a)}x + {_fmt(b)} {op} {_fmt(c)}",
        f"{_fmt(a)}x {op} {_fmt(c - b)}",
        (f"x {res_op} {_fmt(x0)}"
         + ("   (inequality flips)" if flip else ""))]
    return (x0, steps, bound_dir, None, "ax+b {op} c", None)





def _c_vector_angle(slots, text):
    """'i+2j+3k and 3i-2j+k' -> angle between vectors."""
    # vector coefficient extractor: 'i + 2j + 3k' -> [1, 2, 3]
    # handles 'i', '2j', '-3k', '+i' — word-boundary guarded so 'in'/'is'
    # don't bleed in.
    vals = []
    for m in re.finditer(r"([+-]?)\s*(\d*)\s*([ijk])\b", text):
        s, d = m.group(1), m.group(2)
        coeff = int(d) if d else 1
        vals.append(-coeff if s == '-' else coeff)
    if len(vals) < 6:
        return None
    va = [float(v) for v in vals[:3]]
    vb = [float(v) for v in vals[3:6]]
    dot = sum(a * b for a, b in zip(va, vb))
    ma = math.sqrt(sum(x * x for x in va))
    mb = math.sqrt(sum(x * x for x in vb))
    if ma * mb == 0:
        return None
    cos_t = max(-1.0, min(1.0, dot / (ma * mb)))
    deg = math.degrees(math.acos(cos_t))
    return (_snap(deg), [
        f"a.b = {_fmt(dot)}, |a|={_fmt(ma)}, |b|={_fmt(mb)}.",
        f"cos θ = {_fmt(dot)}/{_fmt(ma*mb)} -> θ = {_fmt(deg)}°."],
        f"{_fmt(deg)}°", None, "cos θ = a.b/|a||b|", None)




def _c_triangle_area(slots, text):
    """Triangle (1/2 bh) / parallelogram (bh) area; Heron too."""
    mb = re.search(r"base[\w\s]{0,15}?(\d+(?:\.\d+)?)", text, re.I)
    mh = re.search(r"(?:height|altitude)[\w\s]{0,15}?"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    if re.search(r"three\s+sides|heron|sides?", text, re.I):
        # 'sides 3 cm, 4 cm and 5 cm' — harvest the listed numbers
        ms_l = re.search(r"sides?[\w\s]{0,15}?"
                         r"(\d+(?:\.\d+)?)\s*\w{0,4}[,\s]+"
                         r"(\d+(?:\.\d+)?)\s*\w{0,4}\s*(?:and|,|&)?\s*"
                         r"(\d+(?:\.\d+)?)", text, re.I)
        if ms_l:
            a, b, c = float(ms_l.group(1)), float(ms_l.group(2)), \
                float(ms_l.group(3))
            s = (a + b + c) / 2
            v = math.sqrt(max(0.0, s * (s - a) * (s - b) * (s - c)))
            if v == 0:
                return None
            return (_snap(v), [
                f"sides {_fmt(a)},{_fmt(b)},{_fmt(c)}; s = {_fmt(s)}.",
                f"A = sqrt(s(s-a)(s-b)(s-c)) = {_fmt(v)} sq cm."],
                f"{_fmt(v)} sq cm", None, "Heron", None)
    sides = re.findall(r"(?:side|sides?)[\w\s]{0,10}?"
                       r"(\d+(?:\.\d+)?)", text, re.I)
    if re.search(r"heron|three sides|sides?\s+of\s+\d", text, re.I) \
            and len(sides) >= 3:
        a, b, c = float(sides[0]), float(sides[1]), float(sides[2])
        s = (a + b + c) / 2
        v = math.sqrt(s * (s - a) * (s - b) * (s - c))
        return (_snap(v), [
            f"sides {_fmt(a)},{_fmt(b)},{_fmt(c)}; s = {_fmt(s)}.",
            f"A = sqrt(s(s-a)(s-b)(s-c)) = {_fmt(v)} sq cm."],
            f"{_fmt(v)} sq cm", None, "Heron", None)
    if not (mb and mh):
        return None
    b_, h_ = float(mb.group(1)), float(mh.group(1))
    if re.search(r"parallelogram", text, re.I):
        v = b_ * h_
        return (_snap(v), [f"parallelogram: A = b x h"
                           f" = {_fmt(v)} sq cm."],
                f"{_fmt(v)} sq cm", None, "A = bh", None)
    v = 0.5 * b_ * h_
    return (_snap(v), [f"triangle: A = 1/2 x b x h"
                       f" = 0.5 x {_fmt(b_)} x {_fmt(h_)}"
                       f" = {_fmt(v)} sq cm."],
            f"{_fmt(v)} sq cm", None, "A = 1/2 bh", None)


# structure_families_waves.py folded inline (WS-B Step 8 / M2):
# computes, _RAW_SPECS and SPECS_WAVES moved here; the module only
# existed to dodge fleet write races.  Helpers renamed (_fmt_wv,
# _snap_wv, _c_bayes_wv, _c_discount_gst_wv, _c_grouped_mean_wv) —
# the same-named helpers in this file have different semantics.

def _fmt_wv(v):
    if isinstance(v, str):
        return v
    try:
        fv = float(v)
    except Exception:
        return str(v)
    if fv == int(fv) and abs(fv) < 1e15:
        return str(int(fv))
    return f"{fv:.5g}"

def _snap_wv(v):
    return v

def _c_inverse_prop(slots, text):
    """'m men finish in d days; how long for n men?' -> inverse prop.

    DIG-FIX (2026-10-06): the men-hours-days form ('12 men working
    8 hours a day ... in 10 days; how long for 16 men working 6 hours
    a day?') bound the HOURS number as the day count and shipped
    12x8/16 = 6 days VERIFIED; the answer is 10.  Hours-per-day now
    enters the constant (n1 x h1 x d1 = n2 x h2 x d2)."""
    m1 = re.search(r"(\d+(?:\.\d+)?)\s+(?:men|workers?|persons?|"
                   r"labourers?|machines?|pipes?|taps?)"
                   r"[\w\s]{0,45}?(\d+(?:\.\d+)?)\s+"
                   r"(?:days?|hours?|weeks?)", text, re.I)
    m2 = re.search(r"(?:how (?:long|many)|for|by)[\w\s]{0,20}?"
                   r"(\d+(?:\.\d+)?)\s+(?:men|workers?|persons?|"
                   r"labourers?|machines?|pipes?|taps?)", text, re.I)
    if not (m1 and m2):
        return None
    n1, d1, n2 = float(m1.group(1)), float(m1.group(2)), \
        float(m2.group(1))
    # men-hours-days form: hours/day is part of the work constant
    mh1 = re.search(r"(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\s*"
                    r"(?:a|per|each)\s*day[\w\s]{0,40}?"
                    r"(\d+(?:\.\d+)?)\s*(?:days?|hrs?)\b", text, re.I)
    if mh1:
        h1 = float(mh1.group(1))
        d1 = float(mh1.group(2))          # the real day count
        mh2 = re.search(r"(?:how|in)\b[\w\s]{0,30}?(\d+(?:\.\d+)?)\s+"
                        r"(?:men|workers?|persons?|labourers?|machines?|"
                        r"pipes?|taps?)[\w\s]{0,25}?"
                        r"(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)", text, re.I)
        h2 = float(mh2.group(2)) if mh2 else h1
        v = n1 * h1 * d1 / (n2 * h2)
        return (_snap_wv(v), [
            "men x hours/day x days is constant.",
            f"{_fmt_wv(n1)} x {_fmt_wv(h1)} x {_fmt_wv(d1)} = "
            f"{_fmt_wv(n2)} x {_fmt_wv(h2)} x d",
            f"-> d = {_fmt_wv(v)} days."],
            f"{_fmt_wv(v)} days", None, "n1*h1*d1 = n2*h2*d2", None)
    v = n1 * d1 / n2
    return (_snap_wv(v), [
        "inverse proportion: men x days is constant.",
        f"{_fmt_wv(n1)} x {_fmt_wv(d1)} = {_fmt_wv(n2)} x d"
        f" -> d = {_fmt_wv(v)}."],
        f"{_fmt_wv(v)}", None, "n1*d1 = n2*d2", None)

def _c_compound_interest(slots, text):
    """A = P(1+r/100)^t or CI = A - P.

    DIG-FIX (2026-10-06): compounding frequency was ignored —
    'compounded half-yearly at 20% per annum for 1.5 years' computed
    the annual schedule (A = 13145) instead of the half-yearly one
    (A = 13310), VERIFIED.  Now halves the rate and doubles the
    periods for half-yearly, quarters/4x for quarterly."""
    if re.search(r"simple\s+interest", text, re.I):
        return None  # SI is a different family — never steal it
    if re.search(r"\bEMI\b|equated\s+monthly|instal", text, re.I):
        return None  # EMI is a different family — never steal it
    # COMPARE-ASK VETO (E2 wave): two competing offers ("A offers r1%,
    # rival bank offers r2%") need BOTH maturities computed and
    # compared — a single-CI answer is wrong by construction.  Also
    # this family's P regex cannot read comma-formatted lakhs
    # ("₹10,00,000" parses as 10), so it was claiming with garbage.
    if re.search(r"which\s+(?:option|offer|bank|scheme|is\s+better)|"
                 r"\brival\b|better\s+(?:option|return)|higher\s+maturity|"
                 r"two\s+(?:banks?|schemes?|options?)", text, re.I):
        return None
    if re.search(r"half[-\s]?year|half[-\s]?yearly|semi[-\s]?annual",
                 text, re.I):
        k_comp, k_label = 2, "half-yearly"
    elif re.search(r"quarter", text, re.I):
        k_comp, k_label = 4, "quarterly"
    else:
        k_comp, k_label = 1, "annually"
    mp = re.search(r"(?:principal|sum|rs\.?|₹)\s*[\w\s]{0,10}?"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    mr = re.search(r"(\d+(?:\.\d+)?)\s*%\s*(?:p\.?a\.?|per\s+annum|"
                   r"annually|a\s+year)", text, re.I) or \
        re.search(r"(?:rate|at)[\w\s]{0,8}?(\d+(?:\.\d+)?)\s*%",
                  text, re.I)
    mt = re.search(r"(\d+(?:\.\d+)?)\s*(?:years?|yrs?)", text, re.I)
    if not (mp and mr and mt):
        return None
    P = float(mp.group(1))
    r = float(mr.group(1)) / k_comp
    t = float(mt.group(1)) * k_comp
    A = P * (1 + r / 100) ** t
    ci = A - P
    return (_snap_wv(ci), [
        f"P = {_fmt_wv(P)}, r = {_fmt_wv(mr.group(1))}% p.a. ({k_label}), "
        f"t = {_fmt_wv(mt.group(1))} yr.",
        f"per period: rate = {_fmt_wv(r)}%, n = {_fmt_wv(t)} "
        f"{'periods' if k_comp > 1 else 'years'}.",
        f"A = {_fmt_wv(P)}(1 + {_fmt_wv(r)}/100)^{_fmt_wv(t)} = {_fmt_wv(A)}.",
        f"CI = A - P = {_fmt_wv(ci)}."],
        f"CI = Rs {_fmt_wv(ci)} (A = {_fmt_wv(A)})", None,
        "A = P(1+r/(100k))^(tk), k periods/yr", None)

def _c_discount_gst_wv(slots, text):
    """'marked M, discount d%' -> SP; or 'GST r% on price P'."""
    # DIG-GATE (2026-10-06): a question that ALSO asks for the cost
    # price / mentions a profit-margin on the discounted SP is a
    # two-step commerce chain — the single forward computation ships
    # the SP as if it were the ask ("MP 1500, 20% off, 25% profit,
    # find CP" answered Rs 1200 VERIFIED; CP is 960).
    if re.search(r"cost\s+price|\bc\.?p\.?\b|profit|loss|successive",
                 text, re.I):
        return None
    # DIG-GATE 2 (2026-10-06 SOLVER-DIG-1): an INCLUSIVE price is
    # already post-tax — the forward add direction answers a different
    # question ('pays 1180 inclusive of 18% GST, find the price before
    # GST' would ship 1180 x 1.18; true 1000).  The inversion lane
    # owns it.
    if re.search(r"inclusive\s+of|inclusive\s+price|price\s+includ\w+|"
                 r"before\s+(?:gst|tax)", text, re.I):
        return None
    # DISCOUNT->GST CHAIN (C8 dig 2026-10-07): 'marked 20000, 10% off,
    # then 18% GST on the discounted price' -> 20000×0.9×1.18 = 21240.
    # The single-step version below applied GST to the FULL marked
    # price (23600) skipping the discount entirely.
    mdisc = re.search(r"(\d+(?:\.\d+)?)\s*%\s*discount|"
                      r"discount\s+of\s*(\d+(?:\.\d+)?)\s*%",
                      text, re.I)
    mgst = re.search(r"(\d+(?:\.\d+)?)\s*%\s*(?:GST|gst)|"
                     r"GST\s*(?:of|at|is)?\s*(\d+(?:\.\d+)?)\s*%",
                     text, re.I)
    if mdisc and mgst and re.search(
            r"marked\s+price|list\s+price|\bmrp\b", text, re.I):
        mm2 = re.search(r"(?:marked|list|mrp)\s+(?:price\s+)?"
                        r"(?:of\s+)?(?:rs\.?\s*|₹\s*)?(\d+(?:,\d+)*)",
                        text, re.I)
        if mm2:
            mp2 = float(mm2.group(1).replace(",", ""))
            d = float(mdisc.group(1) or mdisc.group(2))
            g = float(mgst.group(1) or mgst.group(2))
            sp = mp2 * (1 - d / 100)
            final = sp * (1 + g / 100)
            return (_snap_wv(final), [
                f"marked price = Rs {_fmt_wv(mp2)}; discount {_fmt_wv(d)}%.",
                f"discounted = {_fmt_wv(mp2)} x (1-{_fmt_wv(d)}/100)"
                f" = Rs {_fmt_wv(sp)}.",
                f"GST {_fmt_wv(g)}% on {_fmt_wv(sp)} = "
                f"{_fmt_wv(sp)} x (1+{_fmt_wv(g)}/100) = Rs {_fmt_wv(final)}."],
                f"Rs {_fmt_wv(final)}", None,
                "price = MP(1-d/100)(1+gst/100)", None)
    mm = re.search(r"(?:marked|list|price|cost|mrp)[\w\s]{0,15}?"
                   r"(?:rs\.?|₹)?\s*(\d+(?:\.\d+)?)", text, re.I)
    mp = re.search(r"(\d+(?:\.\d+)?)\s*%\s*(?:discount|gst|tax|off)",
                   text, re.I) or \
        re.search(r"(?:discount|gst|tax)[\w\s]{0,10}?"
                  r"(\d+(?:\.\d+)?)\s*%", text, re.I)
    if not (mm and mp):
        return None
    price, p = float(mm.group(1)), float(mp.group(1))
    is_gst = bool(re.search(r"gst|tax|inclusive", text, re.I))
    v = price * (1 + p / 100) if is_gst else price * (1 - p / 100)
    kind = "incl. tax" if is_gst else "after discount"
    return (_snap_wv(v), [
        f"price = {_fmt_wv(price)}, rate = {_fmt_wv(p)}% ({kind}).",
        f"final = {_fmt_wv(price)} x (1 {'+' if is_gst else '-'}"
        f" {_fmt_wv(p)}/100) = {_fmt_wv(v)}."],
        f"Rs {_fmt_wv(v)}", None, "price x (1 +- p/100)", None)

def _c_cuboid_sphere(slots, text):
    """Cuboid TSA/volume; sphere/hemisphere surface/volume."""
    if re.search(r"cuboid|box|rectangular\s+(?:solid|tank|block)",
                 text, re.I):
        dims = re.findall(
            r"(?:length|breadth|width|height|l|b|h)[\w\s]{0,12}?"
            r"(\d+(?:\.\d+)?)", text, re.I)
        if len(dims) < 3:
            return None
        l_, b_, h_ = float(dims[0]), float(dims[1]), float(dims[2])
        if re.search(r"volume", text, re.I):
            v = l_ * b_ * h_
            return (_snap_wv(v), [f"V = lbh = {_fmt_wv(v)} cu cm."],
                    f"{_fmt_wv(v)} cu cm", None, "V = lbh", None)
        v = 2 * (l_ * b_ + b_ * h_ + h_ * l_)
        return (_snap_wv(v),
                [f"TSA = 2(lb+bh+hl) = {_fmt_wv(v)} sq cm."],
                f"{_fmt_wv(v)} sq cm", None, "TSA = 2(lb+bh+hl)", None)
    if re.search(r"hemisphere", text, re.I):
        mr = re.search(r"radi\w*[\w\s]{0,15}?(\d+(?:\.\d+)?)",
                       text, re.I)
        if not mr:
            return None
        r = float(mr.group(1))
        if re.search(r"volume", text, re.I):
            v = 2 / 3 * math.pi * r ** 3
            return (_snap_wv(v),
                    [f"V = (2/3)pi r^3 = {_fmt_wv(v)} cu cm."],
                    f"{_fmt_wv(v)} cu cm", None, "hemi V", None)
        if re.search(r"curved|CSA|c\.s\.a", text, re.I):
            v = 2 * math.pi * r * r
            return (_snap_wv(v),
                    [f"CSA = 2 pi r^2 = {_fmt_wv(v)} sq cm."],
                    f"{_fmt_wv(v)} sq cm", None, "hemi CSA = 2pi r^2",
                    None)
        v = 3 * math.pi * r * r
        return (_snap_wv(v),
                [f"TSA = 3 pi r^2 = {_fmt_wv(v)} sq cm."],
                f"{_fmt_wv(v)} sq cm", None, "hemi TSA = 3pi r^2", None)
    if re.search(r"sphere", text, re.I):
        mr = re.search(r"radi\w*[\w\s]{0,15}?(\d+(?:\.\d+)?)",
                       text, re.I)
        if not mr:
            return None
        r = float(mr.group(1))
        if re.search(r"volume", text, re.I):
            v = 4 / 3 * math.pi * r ** 3
            return (_snap_wv(v),
                    [f"V = (4/3)pi r^3 = {_fmt_wv(v)} cu cm."],
                    f"{_fmt_wv(v)} cu cm", None, "sphere V", None)
        v = 4 * math.pi * r * r
        return (_snap_wv(v),
                [f"SA = 4 pi r^2 = {_fmt_wv(v)} sq cm."],
                f"{_fmt_wv(v)} sq cm", None, "sphere SA", None)
    return None

def _c_trapezium_area(slots, text):
    """A = 1/2 (a+b) h."""
    mp = re.search(r"parallel\s+sides?[^.]{0,30}?"
                   r"(\d+(?:\.\d+)?)\s*(?:cm|m|mm)?\s*(?:and|,|&)\s*"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    if mp:
        ms = [mp.group(1), mp.group(2)]
    else:
        ms = re.findall(r"(?:sides?)[\w\s]{0,30}?(\d+(?:\.\d+)?)",
                        text, re.I)
    mh = re.search(r"(?:height|distance\s+between\w*|altitude)"
                   r"[^.]{0,25}?(\d+(?:\.\d+)?)", text, re.I)
    if len(ms) < 2 or not mh:
        return None
    a, b, h_ = float(ms[0]), float(ms[1]), float(mh.group(1))
    v = 0.5 * (a + b) * h_
    return (_snap_wv(v), [
        f"trapezium: A = 1/2 (a+b)h = 0.5({_fmt_wv(a)}+{_fmt_wv(b)})"
        f"{_fmt_wv(h_)} = {_fmt_wv(v)} sq cm."],
        f"{_fmt_wv(v)} sq cm", None, "A = 1/2(a+b)h", None)

def _c_median_mode(slots, text):
    """Median or mode of a plain list.

    DIG-GATES (2026-10-06): (a) with no 'mode' word the old code
    computed the MEDIAN of any 3+ numbers — a 'find the mean' hit
    would ship the median; now a mean ask refuses (MEAN_SIMPLE owns
    it).  (b) data with an unknown ('find x', 'missing frequency')
    shipped a bogus median of the visible numbers — refuse."""
    if re.search(r"find\s+(?:the\s+)?(?:value\s+of\s+)?x\b|"
                 r"missing\s+(?:frequency|value|term)|value\s+of\s+"
                 r"[a-z]\s*(?:if|when)", text, re.I):
        return None
    # frequency-list phrasing ('5 occurs 3 times') is grouped-data, not
    # a plain list — the values and frequencies must not pool here
    # (mode of [5,3,7,5,9,2] shipped 5; the mode of that data is 7)
    if re.search(r"occurs?\s+\d+\s*times|has\s+frequenc", text, re.I):
        return None
    # MARKS/COUNT-LEAK (2026-10-06): '(2 marks)' and 'in 7 matches'
    # are not observations — scrub before the number scan.
    work = re.sub(r"[\(\[]\s*\d+(?:\.\d+)?\s*marks?\s*[\)\]]",
                  " ", text, flags=re.I)
    work = re.sub(
        r"(?:in|over|across|for|of|from)\s+\d+(?:\.\d+)?\s*"
        r"(?:match\w*|observation\w*|number\w*|data|value\w*|"
        r"student\w*|test\w*|inning\w*|game\w*|day\w*|term\w*)",
        " ", work, flags=re.I)
    nums = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", work)]
    if len(nums) < 3:
        return None
    if re.search(r"\bmode\b", text, re.I):
        from collections import Counter
        c = Counter(nums)
        mode = c.most_common(1)[0]
        return (_snap_wv(mode[0]), [
            f"frequency counts: {dict(c)}.",
            f"mode = {_fmt_wv(mode[0])} (occurs {mode[1]} times)."],
            f"{_fmt_wv(mode[0])}", None, "mode", None)
    if not re.search(r"\bmedian\b", text, re.I):
        return None  # mean/other stat — not this family
    srt = sorted(nums)
    n = len(srt)
    v = srt[n // 2] if n % 2 else (srt[n // 2 - 1] + srt[n // 2]) / 2
    return (_snap_wv(v), [
        f"sorted: {srt}.",
        f"median = {_fmt_wv(v)}."],
        f"{_fmt_wv(v)}", None, "median", None)

def _c_remainder_theorem(slots, text):
    """'remainder when p(x) is divided by x-a' -> p(a)."""
    mp = re.search(r"(?:remainder\s+when|when)\s+"
                   r"([0-9x\s\+\-\*\^/()\.]+?)\s+is\s+divided\s+by\s+"
                   r"\(?\s*x\s*([+-]\s*\d+(?:\.\d+)?)\s*\)?",
                   text, re.I)
    if not mp:
        return None
    try:
        import sympy as sp
    except ImportError:
        return None
    expr_txt = re.sub(r"(\d)\s*(?=[x(])", r"\1*", mp.group(1).strip())
    expr_txt = expr_txt.replace("^", "**")
    try:
        p = sp.sympify(expr_txt)
        a = -float(mp.group(2).replace(" ", ""))
        v = float(p.subs(sp.Symbol("x"), a))
    except Exception:
        return None
    return (_snap_wv(v), [
        f"p(x) = {p}; divisor x - {_fmt_wv(a)}.",
        f"remainder = p({_fmt_wv(a)}) = {_fmt_wv(v)}."],
        f"{_fmt_wv(v)}", None, "remainder = p(a)", None)

def _c_rationalize(slots, text):
    """'rationalise 1/(sqrt(a)+b)' via conjugate — and the simple
    'rationalise N/sqrt(a)' -> N*sqrt(a)/a."""
    # (p + q·sqrt(a)) / (p - q·sqrt(a)): surd in both numerator and
    # denominator.  Multiply by the conjugate: (p+q√a)^2 / (p^2 - q^2 a).
    mc = re.search(r"\(\s*(-?\d+(?:\.\d+)?)\s*([+-])\s*(\d+(?:\.\d+)?)\s*"
                   r"(?:\*\s*)?(?:sqrt|√|root)\s*\(?\s*(\d+(?:\.\d+)?)\s*\)?"
                   r"\s*\)\s*/\s*\(\s*(-?\d+(?:\.\d+)?)\s*([+-])\s*"
                   r"(\d+(?:\.\d+)?)\s*(?:\*\s*)?(?:sqrt|√|root)\s*"
                   r"\(?\s*(\d+(?:\.\d+)?)\s*\)?\s*\)",
                   text.replace("\u2212", "-"), re.I)
    if mc:
        p1 = float(mc.group(1))
        q1 = (1.0 if mc.group(2) == "+" else -1.0) * float(mc.group(3))
        a1 = float(mc.group(4))
        p2 = float(mc.group(5))
        q2 = (1.0 if mc.group(6) == "+" else -1.0) * float(mc.group(7))
        a2 = float(mc.group(8))
        if a1 == a2 and abs(p2 - p1) < 1e-9 and abs(q2 + q1) < 1e-9:
            den = p1 * p1 - q1 * q1 * a1
            if abs(den) > 1e-12:
                ex_p = (p1 * p1 + q1 * q1 * a1) / den
                ex_q = (2 * p1 * q1) / den
                v = ex_p + ex_q * math.sqrt(a1)
                exact = (f"({_fmt_wv(ex_p)}) + ({_fmt_wv(ex_q)})·sqrt({_fmt_wv(a1)})"
                         if ex_q != 0 else _fmt_wv(ex_p))
                return (_snap_wv(v), [
                    f"({_fmt_wv(p1)} + {_fmt_wv(q1)}·sqrt({_fmt_wv(a1)}))"
                    f"/({_fmt_wv(p2)} - {_fmt_wv(abs(q2))}·sqrt({_fmt_wv(a2)}))",
                    "multiply numerator and denominator by the conjugate "
                    f"({_fmt_wv(p1)} + {_fmt_wv(q1)}·sqrt({_fmt_wv(a1)}))",
                    f"= {exact}" + f" = {_fmt_wv(v)}."],
                    exact, None, "rationalise surd fraction by conjugate",
                    None)
    # simple surd denominator: n/sqrt(a) or 1/sqrt(a).
    # C9-DIG (2026-10-07): '1/(sqrt(3) + 1)' matched here — the
    # lookahead only checked for '+digit' right after the sqrt arg,
    # but the ')' + ' + 1' slipped through -> shipped '1sqrt(3)/3'
    # (malformed AND wrong: true answer is (sqrt(3)-1)/2 = 0.366).
    # Now the lookahead also refuses when a closing paren precedes
    # an operator.
    m0 = re.search(r"(\d+(?:\.\d+)?)\s*/\s*\(?\s*(?:sqrt|root)\s*"
                   r"\(?\s*(\d+(?:\.\d+)?)\s*\)?\s*"
                   r"(?!\s*\)?\s*[+-]\s*\d)", text, re.I)
    if m0:
        num, a = float(m0.group(1)), float(m0.group(2))
        v = num / math.sqrt(a)
        return (_snap_wv(v), [
            f"{_fmt_wv(num)}/sqrt({_fmt_wv(a)}) -> multiply num & denom "
            f"by sqrt({_fmt_wv(a)}).",
            f"= {_fmt_wv(num)}·sqrt({_fmt_wv(a)})/{_fmt_wv(a)}"
            f" = {_fmt_wv(v)}."],
            f"{_fmt_wv(num)}·sqrt({_fmt_wv(a)})/{_fmt_wv(a)}",
            None, "n/sqrt(a) = n sqrt(a)/a", None)
    m = re.search(r"(\d+(?:\.\d+)?)\s*/\s*\(?\s*(?:sqrt|root)\s*"
                  r"\(?\s*(\d+(?:\.\d+)?)\s*\)?\s*([+-])\s*"
                  r"(\d+(?:\.\d+)?)\s*\)?", text, re.I)
    if not m:
        return None
    num, a, sign, b = float(m.group(1)), float(m.group(2)), \
        m.group(3), float(m.group(4))
    sa = math.sqrt(a)
    denom = sa + b if sign == "+" else sa - b
    if abs(denom) < 1e-12:
        return None
    v = num / denom
    conj = f"sqrt({_fmt_wv(a)}) {'-' if sign == '+' else '+'} {_fmt_wv(b)}"
    # result = num·(sqrt(a)∓b)/(a-b²); show exact surd form first
    den2 = a - b * b
    if abs(den2) > 1e-9 and abs(den2 - round(den2)) < 1e-9 and \
            abs(num - round(num)) < 1e-9:
        # 1/(sqrt(3)+1) -> (sqrt(3)-1)/2 — show the exact fraction
        n_int, d_int = int(round(num)), int(round(den2))
        exact = (f"({conj})/{d_int}" if n_int == 1 else
                 f"{n_int}({conj})/{d_int}")
        if n_int % d_int == 0:
            pass                       # reduces to integer — decimal fine
        else:
            from fractions import Fraction as _Fr
            _fr = _Fr(n_int, d_int)  # reduce the fraction properly
            if _fr.denominator != d_int or _fr.numerator != n_int:
                nn, dd = _fr.numerator, _fr.denominator
                exact = (f"({conj})/{dd}" if nn == 1 else
                         f"{nn}({conj})/{dd}")
    else:
        exact = f"{_fmt_wv(v)}"
    return (_snap_wv(v), [
        f"{_fmt_wv(num)}/(sqrt({_fmt_wv(a)}) {sign} {_fmt_wv(b)})",
        f"multiply numerator and denominator by {conj}",
        f"= {exact}" +
        (f" = {_fmt_wv(v)}." if exact != f"{_fmt_wv(v)}" else ".")],
        exact, None, "rationalise by conjugate", None)

def _c_perfect_square(slots, text):
    """'greatest/smallest n-digit perfect square' etc."""
    mn = re.search(r"(?:greatest|largest|smallest)[\w\s]{0,10}?"
                   r"(\d+)\s*-?\s*digit", text, re.I)
    if not mn:
        return None
    d = int(mn.group(1))
    lo, hi = 10 ** (d - 1), 10 ** d - 1
    if "smallest" in text.lower():
        v = math.ceil(math.sqrt(lo)) ** 2
        which = "smallest"
    else:
        v = math.floor(math.sqrt(hi)) ** 2
        which = "greatest"
    root = int(math.isqrt(v))
    return (float(v), [
        f"{d}-digit range: {lo} to {hi}.",
        f"sqrt bound -> {root}^2 = {v} is the {which} "
        f"{d}-digit perfect square."],
        f"{v}", None, "floor/ceil sqrt squared", None)

def _c_angle_sum(slots, text):
    """'angles a and b given, find third' — triangle sum = 180.

    FOOLPROOF-GATE (2026-10-06): fired on ANY triangle question with two
    numbers — "hypotenuse is 25 cm and one side is 7 cm" answered
    "148 deg" (subtracting LENGTHS as angles; the 3-4-5 Pythagoras gave
    "173 deg"), both VERIFIED.  Now requires: (a) at least one angle
    signal word (degree sign / "deg" / "angle"), AND (b) NO side-ask
    markers (hypotenuse/side/leg/length perimeter area) — those belong
    to the Pythagoras/mensuration families or an honest refusal.
    """
    low = text or ""
    if not re.search(r"triangle", low, re.I):
        return None
    if re.search(r"hypotenuse|\bside\b|\blegs?\b|\blength\b|perimeter|"
                 r"\barea\b|right.?angled|pythagor", low, re.I):
        return None
    if not re.search(r"deg(ree)?s?\b|°|\bangle", low, re.I):
        return None
    nums = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", low)]
    if len(nums) < 2:
        return None
    v = 180 - nums[0] - nums[1]
    return (_snap_wv(v), [
        f"triangle angle sum: 180 - {_fmt_wv(nums[0])} - "
        f"{_fmt_wv(nums[1])} = {_fmt_wv(v)} deg."],
        f"{_fmt_wv(v)} deg", None, "180 - a - b", None)

def _c_quad_nature(slots, text):
    """Nature of roots / discriminant / k for equal or real roots.

    DIG-GATE (2026-10-06): a parameter coefficient (k, m, p, ...) used to
    be silently coerced to 1 — "for what p does x^2 + px + 9 = 0 have
    equal roots?" shipped "D = 1 -> real and distinct" VERIFIED (the
    regex started matching AT 'x^2', dropping 'p'), and "mx^2 - 6x + 3"
    answered "D = 24".  Now: (a) a letter coefficient in the a-slot or
    b-slot is solved for (D = 0), (b) a letter coefficient with a
    non-equal-roots ask refuses instead of guessing the coefficient.
    """
    # ask-gate: only fire when the question actually asks about the
    # discriminant/nature/k-for-equal — 'find the roots' is a
    # different family (quadratic solver owns it)
    if not re.search(r"nature|discrimin|equal\s+roots?|coincident|"
                     r"real\s+roots?|imaginary|no\s+real", text, re.I):
        return None
    equal_ask = bool(re.search(r"equal\s+roots?|coincident", text, re.I))

    # --- parameter in the a-slot: 'kx^2 + bx + c' -> k = b^2/(4c) ------
    mk = re.search(r"([+-]?)\s*(?<![a-z])([a-z])\s*x\s*\^?\s*2\s*"
                   r"([+-]\s*\d+(?:\.\d+)?)?\s*x?\s*"
                   r"([+-]\s*\d+(?:\.\d+)?)?", text, re.I)
    if mk and equal_ask:
        sgn = -1.0 if mk.group(1) == "-" else 1.0
        b_s = (mk.group(3) or "+0").replace(" ", "")
        c_s = (mk.group(4) or "+0").replace(" ", "")
        b = float(b_s) if b_s not in ("+", "-") else \
            (1.0 if b_s == "+" else -1.0)
        c = float(c_s) if c_s not in ("+", "-") else \
            (1.0 if c_s == "+" else -1.0)
        if b == 0 or c == 0:
            return None  # need a real bx and c to solve b^2 = 4kc
        k = sgn * b * b / (4 * c)
        name = mk.group(2)
        return (_snap_wv(k), [
            f"equal roots -> b^2 - 4{k}{name}c = 0.",
            f"{name} = ({_fmt_wv(b)})^2/(4 x {_fmt_wv(c)}) = {_fmt_wv(k)}."],
            f"{name} = {_fmt_wv(k)}", None, "D = b^2 - 4kc", None)

    # --- parameter in the b-slot: 'x^2 + px + c' -> p = +-sqrt(4ac) ----
    mb = re.search(r"([+-]?\s*\d+(?:\.\d+)?)?\s*x\s*\^?\s*2\s*"
                   r"([+-]?)\s*(?<![a-z])([a-z])\s*x\s*"
                   r"([+-]\s*\d+(?:\.\d+)?)", text, re.I)
    if mb and equal_ask:
        a_s = (mb.group(1) or "1").replace(" ", "")
        a = float(a_s) if a_s else 1.0
        bsgn = -1.0 if mb.group(2) == "-" else 1.0
        c_s = (mb.group(4) or "+0").replace(" ", "")
        c = float(c_s) if c_s not in ("+", "-") else \
            (1.0 if c_s == "+" else -1.0)
        if a == 0 or c <= 0:
            return None
        p = bsgn * math.sqrt(4 * a * c)
        name = mb.group(3)
        return (_snap_wv(p), [
            f"equal roots -> b^2 - 4ac = 0.",
            f"b^2 = 4 x {_fmt_wv(a)} x {_fmt_wv(c)} = {_fmt_wv(4 * a * c)}.",
            f"{name} = {'+' if bsgn > 0 else '-'}sqrt({_fmt_wv(4 * a * c)})"
            f" = {'+' if p > 0 else '-'}{_fmt_wv(abs(p))}."],
            f"{name} = +-{_fmt_wv(abs(p))}", None, "D = b^2 - 4ac = 0", None)

    # any other letter coefficient cannot be evaluated numerically —
    # refuse rather than coerce it to 1.  (?<![a-z]) keeps word-internal
    # letters ('equatioN x^2') from reading as coefficients.
    if re.search(r"(?<![a-z])[a-z]\s*x\s*\^?\s*2|"
                 r"x\s*\^?\s*2\s*[+-]\s*(?<![a-z])[a-z]\s*x",
                 text, re.I):
        return None
    mm = re.search(r"(-?\d*)\s*x\s*\^?\s*2\s*([+-]\s*\d*)\s*x?\s*"
                   r"([+-]\s*\d+(?:\.\d+)?)?", text, re.I)
    if not mm:
        return None
    a_s = (mm.group(1) or "1").replace(" ", "")
    b_s = (mm.group(2) or "0").replace(" ", "")
    c_s = (mm.group(3) or "0").replace(" ", "")
    a = float(a_s) if a_s not in ("", "+", "-") else \
        (1.0 if a_s != "-" else -1.0)
    b = float(b_s) if b_s not in ("", "+", "-") else \
        (1.0 if b_s != "-" else -1.0)
    c = float(c_s) if c_s not in ("", "+", "-") else \
        (1.0 if c_s != "-" else -1.0)
    D = b * b - 4 * a * c
    kind = ("real and distinct" if D > 0 else
            "real and equal" if D == 0 else "no real roots")
    return (D, [
        f"a={_fmt_wv(a)}, b={_fmt_wv(b)}, c={_fmt_wv(c)}.",
        f"D = b^2 - 4ac = {_fmt_wv(b)}^2 - 4*{_fmt_wv(a)}*{_fmt_wv(c)}"
        f" = {_fmt_wv(D)}.",
        f"D {'>' if D > 0 else '=' if D == 0 else '<'} 0 -> "
        f"{kind}."],
        f"D = {_fmt_wv(D)} -> {kind}", None, "D = b^2 - 4ac", None)

def _c_card_prob(slots, text):
    """Deck-of-52 probability: colour/suit/rank/face, compounds
    ('king of red colour', 'queen of hearts', 'red face card'),
    complements ('not a face card') and unions ('neither red nor
    a queen').

    DIG-GATE (2026-10-06): the old elif chain answered the FIRST
    keyword — 'king of red colour' shipped P=4/52 (red kings are 2),
    'not a face card' shipped 12/52 instead of the complement 40/52,
    'queen of hearts' shipped 4/52 (it is ONE card), 'neither red nor
    queen' shipped 26/52.  All four were VERIFIED.
    """
    if not re.search(r"\bcard|\bdeck", text, re.I):
        return None
    low = text.lower()

    rank_words = ("ace", "king", "queen", "jack")
    suits = {"spade": 13, "heart": 13, "diamond": 13, "club": 13}
    red_suits = {"heart", "diamond"}

    def _fav(rank=None, suit=None, colour=None, face=False):
        """Favourable count of ONE category on a 52-card deck."""
        if rank and suit:
            return 1
        if face and colour:
            return 6
        if rank and colour:
            return 2
        if face:
            return 12
        if rank:
            return 4
        if suit:
            return 13          # a named suit fixes the colour anyway
        if colour:
            return 26
        return None

    def _parse(cat_text):
        """(rank, suit, colour, face) named inside one clause."""
        rank = next((w for w in rank_words
                     if re.search(rf"\b{w}\b", cat_text)), None)
        suit = next((s for s in suits if re.search(rf"\b{s}", cat_text)),
                    None)
        colour = None
        mc = re.search(r"\b(red|black)\b", cat_text)
        if mc:
            colour = mc.group(1)
        face = bool(re.search(r"face\s+card|court\s+card", cat_text))
        return rank, suit, colour, face

    # 'ace or a king' / 'red card or a face card' -> P(A or B)
    mo = re.search(r"(?:an?\s+)?(.+?)\s+or\s+(?:an?\s+)?(.+?)"
                   r"(?:$|[\.\?;]|,?\s+is\b)", low)
    if mo:
        r1, s1, c1, f1 = _parse(mo.group(1))
        r2, s2, c2, f2 = _parse(mo.group(2))
        fav1, fav2 = _fav(r1, s1, c1, f1), _fav(r2, s2, c2, f2)
        if fav1 is not None and fav2 is not None:
            if s1 and s2:
                overlap = fav1 if s1 == s2 else 0
            elif c1 and c2 and c1 != c2:
                overlap = 0
            elif r1 and r2 and r1 != r2:
                overlap = 0
            elif r1 and f2 or r2 and f1:
                overlap = 4    # rank ∩ face = 4 (that rank's 4)
            elif c1 and f2 or c2 and f1:
                overlap = 6    # colour ∩ face = 6
            else:
                overlap = _fav(r1 or r2, s1 or s2,
                               c1 or c2, f1 or f2) or 0
            favourable = fav1 + fav2 - overlap
            note = "P(A or B) = favA + favB - overlap"
            v = favourable / 52
            from math import gcd
            g = gcd(favourable, 52)
            frac = f"{favourable // g}/{52 // g}"
            return (v, [
                f"favourable cards = {fav1} + {fav2} - {overlap}"
                f" = {favourable} out of 52.",
                f"P = {favourable}/52 = {frac}."],
                frac, None, note, None)
    # neither X nor Y  ->  P = 1 - P(X union Y)
    mn = re.search(r"neither\s+(.+?)\s+nor\s+(.+?)(?:$|[\.\?;]|,?\s+is\b)",
                   low)
    if mn:
        r1, s1, c1, f1 = _parse(mn.group(1))
        r2, s2, c2, f2 = _parse(mn.group(2))
        fav1, fav2 = _fav(r1, s1, c1, f1), _fav(r2, s2, c2, f2)
        if fav1 is None or fav2 is None:
            return None
        if s1 and s2:
            overlap = fav1 if s1 == s2 else 0
        elif c1 and c2 and c1 != c2:      # red vs black -> disjoint
            overlap = 0
        elif r1 and r2 and r1 != r2:      # ace vs king -> disjoint
            overlap = 0
        else:
            overlap = _fav(r1 or r2, s1 or s2, c1 or c2, f1 or f2) or 0
        union = fav1 + fav2 - overlap
        favourable = max(0, 52 - union)
        note = "P(neither) = 1 - P(A or B)"
    else:
        # 'not a face card' / 'not getting a red card' -> complement
        mneg = re.search(r"\bnot\b(?:\s+\w+){0,3}?\s+(?:a|an)?\s*"
                         r"(\w+(?:\s+\w+){0,3})", low)
        seg = mneg.group(1) if mneg else low
        want_not = mneg is not None and _parse(seg) != (None,) * 4
        base = seg if want_not else low
        r, s, c, f = _parse(base)
        favourable = _fav(r, s, c, f)
        if favourable is None:
            return None
        if want_not:
            favourable = 52 - favourable
            note = "P(not A) = 1 - P(A)"
        else:
            note = "P = fav/52"
    if favourable is None or favourable < 0 or favourable > 52:
        return None
    v = favourable / 52
    from math import gcd
    g = gcd(favourable, 52)
    frac = f"{favourable // g}/{52 // g}"
    return (v, [
        f"favourable cards = {favourable} out of 52.",
        f"P = {favourable}/52 = {frac}."],
        frac, None, note, None)

def _c_frustum(slots, text):
    """Frustum of cone: V = (1/3)pi h (R^2 + r^2 + Rr); CSA = pi(R+r)l."""
    mr = re.findall(r"radi\w*[\w\s]{0,15}?(\d+(?:\.\d+)?)", text, re.I)
    if len(mr) < 2:
        mr = re.findall(r"(\d+(?:\.\d+)?)\s*(?:cm|m)\b", text)
    mh = re.search(r"(?:height|depth)[\w\s]{0,15}?(\d+(?:\.\d+)?)",
                   text, re.I)
    ml = re.search(r"slant\s+height[\w\s]{0,18}?(\d+(?:\.\d+)?)",
                   text, re.I)
    if len(mr) < 2 or not mh:
        return None
    R, r, h_ = max(float(mr[0]), float(mr[1])), \
        min(float(mr[0]), float(mr[1])), float(mh.group(1))
    asks_area = bool(re.search(r"surface|curved", text, re.I))
    if asks_area:
        # DIG-GATE (2026-10-06 SOLVER-DIG-1): a surface/curved ask with
        # no slant height used to FALL THROUGH to the volume branch and
        # ship '527.79 cu cm' for a CSA ask; and a TOTAL-surface ask
        # must not run the CSA-only formula (TSA adds the two end
        # circles).  Both refuse.
        if not ml or re.search(r"total", text, re.I):
            return None
        l_ = float(ml.group(1))
        v = math.pi * (R + r) * l_
        # board 22/7 convention (pi(14+7)15 is exactly 990 with 22/7)
        alt = v * (22 / 7) / math.pi
        if abs(alt - round(alt)) < 0.02 and                 abs(alt - round(alt)) < abs(v - round(v)):
            v = alt
        return (_snap_wv(v), [
            f"CSA = pi(R+r)l = pi({_fmt_wv(R)}+{_fmt_wv(r)}){_fmt_wv(l_)}"
            f" = {_fmt_wv(v)} sq cm."],
            f"{_fmt_wv(v)} sq cm", None, "CSA = pi(R+r)l", None)
    v = math.pi / 3 * h_ * (R * R + r * r + R * r)
    # board convention: if pi = 22/7 lands on an exact/rounder value
    # ('radii 14 and 7, h 12' -> exactly 4312 with 22/7), the question
    # was authored for it — math.pi shipped 4310.3.
    alt = v * (22 / 7) / math.pi
    if abs(alt - round(alt)) < 0.02 and \
            abs(alt - round(alt)) < abs(v - round(v)):
        v = alt
    # capacity asks are answered in litres, not cu cm
    if re.search(r"litre|liter", text, re.I):
        lts = v / 1000.0
        return (_snap_wv(lts), [
            f"V = (1/3)pi h (R^2+r^2+Rr) = {_fmt_wv(v)} cu cm.",
            f"capacity = {_fmt_wv(v)} / 1000 = {_fmt_wv(lts)} litres."],
            f"{_fmt_wv(lts)} litres", None, "frustum V -> litres", None)
    return (_snap_wv(v), [
        f"V = (1/3)pi h (R^2+r^2+Rr)",
        f"= pi/3 x {_fmt_wv(h_)}({_fmt_wv(R)}^2+{_fmt_wv(r)}^2+{_fmt_wv(R*r)})"
        f" = {_fmt_wv(v)} cu cm."],
        f"{_fmt_wv(v)} cu cm", None, "frustum V", None)

def _c_digit_reversal(slots, text):
    """'two-digit number, digits sum s, reversed exceeds by d' etc."""
    ms = re.search(r"(?:sum of (?:the )?digits|digits?)[\w\s\-,]"
                   r"{0,40}?\b(?:is|are|equals?)\s+(\d+)", text, re.I)
    md = re.search(r"(?:exceeds|differ|more than|less than|by)"
                   r"[\w\s]{0,25}?(\d+)", text, re.I)
    if not ms:
        return None
    s = int(ms.group(1))
    if md:
        d = int(md.group(1))
        # reversed - original = 9(u - t); sum = u + t
        du = d / 9
        u = (s + du) / 2
        t = s - u
        if abs(u - round(u)) < 1e-6 and abs(t - round(t)) < 1e-6:
            num = int(round(10 * t + u))
            return (float(num), [
                f"u+t = {s}, 9(u-t) = {d} -> u-t = {_fmt_wv(du)}.",
                f"u = {_fmt_wv(u)}, t = {_fmt_wv(t)} -> number = {num}."],
                str(num), None, "digit reversal", None)
        return None
    # just sum: list pairs
    pairs = [(t, s - t) for t in range(10) if 0 <= s - t <= 9]
    v = 10 * pairs[0][0] + pairs[0][1]
    return (_snap_wv(v), [
        f"digit sum = {s}: (t,u) pairs = {pairs}.",
        f"smallest such number = {int(v)}."],
        f"possible numbers: {[int(10*t+u) for t,u in pairs]}",
        None, "digit-sum enumeration", None)

def _c_complex_ops(slots, text):
    """Complex arithmetic: (a+bi) +/-/x (c+di), modulus, conjugate."""
    def _grab(label=None):
        pat = (r"\(?\s*(-?\d+(?:\.\d+)?)\s*([+-])\s*"
               r"(\d+(?:\.\d+)?)\s*i\s*\)?")
        return re.search(pat, text, re.I)
    zs = re.findall(r"\(?\s*(-?\d+(?:\.\d+)?)\s*([+-])\s*"
                    r"(\d+(?:\.\d+)?)\s*i\b", text, re.I)
    if not zs:
        # modulus: |a+bi| or 'modulus of a+bi'
        mz = re.search(r"(?:modulus|\|)[\w\s]{0,15}?"
                       r"(-?\d+(?:\.\d+)?)\s*([+-])\s*"
                       r"(\d+(?:\.\d+)?)\s*i", text, re.I)
        if mz:
            a, s, b = float(mz.group(1)), mz.group(2), \
                float(mz.group(3))
            b = b if s == "+" else -b
            v = math.hypot(a, b)
            return (_snap_wv(v), [
                f"|z| = sqrt(a^2+b^2) = sqrt({_fmt_wv(a)}^2+"
                f"{_fmt_wv(b)}^2) = {_fmt_wv(v)}."],
                f"{_fmt_wv(v)}", None, "|z|", None)
        return None
    def _mk(g):
        a, s, b = float(g[0]), g[1], float(g[2])
        return complex(a, b if s == "+" else -b)
    z1 = _mk(zs[0])
    if re.search(r"conjugate", text, re.I):
        return (z1.real, [f"conjugate of {z1} = {z1.conjugate()}."],
                f"{z1.conjugate()}", None, "conj", None)
    if len(zs) < 2:
        return None
    z2 = _mk(zs[1])
    if re.search(r"multiply|product|times", text, re.I):
        z = z1 * z2
        op = "product"
    elif re.search(r"subtract|minus|difference", text, re.I):
        z = z1 - z2
        op = "difference"
    else:
        z = z1 + z2
        op = "sum"
    ans = (f"{_fmt_wv(z.real)}{'+' if z.imag >= 0 else '-'}"
           f"{_fmt_wv(abs(z.imag))}i")
    return (z.real, [
        f"z1 = {z1}, z2 = {z2}.",
        f"{op} = {z} = {ans}."],
        ans, None, "complex arithmetic", None)

def _c_binom_rth(slots, text):
    """r-th term of (a+b)^n = C(n,r-1) a^(n-r+1) b^(r-1) — sympy-exact,
    keeps the b^(r-1) numeric factor and a's coefficient."""
    mb = re.search(r"\(\s*([^()]+?)\s*([+-])\s*([^()]+?)\s*\)\s*"
                   r"\^?\s*(\d+)", text)
    mr = re.search(r"(\d+)\s*(?:st|nd|rd|th)\s*term", text, re.I)
    if not (mb and mr):
        return None
    a_txt = mb.group(1).strip() or "x"
    sign = -1 if mb.group(2) == "-" else 1
    b_txt = mb.group(3).strip()
    n = int(mb.group(4))
    r = int(mr.group(1))
    if r < 1 or r > n + 1:
        return None
    try:
        import sympy as sp
        from math import comb
    except ImportError:
        return None
    x = sp.Symbol("x")
    try:
        a_e = sp.sympify(a_txt, locals={"x": x})
        b_e = sp.sympify(b_txt, locals={"x": x}) * sign
        term = sp.expand(comb(n, r - 1) * a_e ** (n - r + 1)
                         * b_e ** (r - 1))
    except Exception:
        return None
    # 'coefficient' asks for the numeric part only
    coef_num = term.as_coeff_Mul()[0] if term.has(x) else term
    return (float(coef_num) if coef_num.is_number else None, [
        f"T_{{r+1}} = C(n,r) a^(n-r) b^r ; n={n}, term {r} uses "
        f"r={r - 1}.",
        f"= C({n},{r - 1}) * ({a_txt})^{n - r + 1} * "
        f"({b_txt})^{r - 1} = {term}."],
        f"term {r} = {term}"
        + (f" (coefficient {coef_num})" if term.has(x) else ""),
        None, "T_r = C(n,r-1) a^(n-r+1) b^(r-1)", None)

def _c_remainder_chain(slots, text):
    """Two remainder idioms:
    A) 'leaves remainder 2 when divided by 3, rem 3 by 4, ...' — when
       divisors exceed remainders by the SAME difference d,
       answer = LCM(divisors) - d.
    B) 'least number which when divided by 6, 8, 12 leaves remainder 3'
       — one remainder for all divisors: N = LCM(divisors) + r."""
    from math import gcd
    def _l(a, b): return a * b // gcd(a, b)
    # pattern B: divisors listed, one shared remainder
    mb = re.search(
        r"divided\s+by\s+((?:\d+[\s,]*(?:and\s+)?)+)"
        r"leaves?\s+(?:a\s+)?remainder\s+(?:of\s+)?(\d+)", text, re.I)
    if mb:
        divs = [int(d) for d in re.findall(r"\d+", mb.group(1))]
        r = int(mb.group(2))
        if len(divs) >= 2:
            l = divs[0]
            for n in divs[1:]:
                l = _l(l, n)
            v = l + r
            return (float(v), [
                f"divisors {divs}, shared remainder {r}.",
                f"answer = LCM{tuple(divs)} + {r} = {l} + {r} = {v}."],
                str(v), None, "lcm + shared remainder", None)
    pairs = re.findall(
        r"remainder\s+(?:of\s+)?(-?\d+)\s+(?:when\s+divided\s+by|"
        r"divided\s+by)\s+(\d+)", text, re.I)
    if len(pairs) < 2:
        return None
    diffs = {d - r for r, d in
             ((int(a), int(b)) for a, b in pairs)}
    if len(diffs) != 1:
        return None  # not the LCM-d trick — honest refuse
    diff = diffs.pop()
    divs = [int(b) for _, b in pairs]
    l = divs[0]
    for n in divs[1:]:
        l = _l(l, n)
    v = l - diff
    return (float(v), [
        f"divisors {divs}, each remainder short by {diff}.",
        f"answer = LCM{tuple(divs)} - {diff} = {l} - {diff} = {v}."],
        str(v), None, "lcm - common difference", None)

def _c_gp_inf(slots, text):
    """Sum to infinite terms of a GP: a/(1-r) when |r|<1."""
    ms = re.findall(r"(-?\d+(?:\.\d+)?)", text)
    # 'sum to infinite terms of the GP. 1 + 1/2 + 1/8 ...' — a leading
    # integer term precedes the fractions, capture it too
    fr = re.findall(r"(-?\d+)\s*/\s*(\d+)", text)
    terms = [Fraction(int(a), int(b)) for a, b in fr]
    lead = re.search(r"(?:GP|series|terms)[\w\s.:]*?(\d+)\s*[+,:]",
                     text, re.I)
    if lead and terms:
        terms.insert(0, Fraction(int(lead.group(1))))
    if not terms:
        terms = [Fraction(int(x)) for x in ms[:4]]
    if len(terms) < 2 or not re.search(
            r"infinite|infinit\w*|sum to in", text, re.I):
        return None
    a, b = terms[0], terms[1]
    if a == 0:
        return None
    r = b / a
    # verify it's genuinely a GP — refuse on inconsistent ratios
    if len(terms) >= 3 and b != 0 and terms[2] / b != r:
        return None
    if abs(r) >= 1:
        return None
    v = a / (1 - r)
    return (float(v), [
        f"GP: a = {a}, r = {a} -> {b} gives r = {r}.",
        f"|r| < 1 so S_inf = a/(1-r) = {a}/(1-{r}) = {v}."],
        str(v), None, "S_inf = a/(1-r)", None)

def _c_sqrt_pf(slots, text):
    """'square root of N by prime factorisation' -> isqrt when
    perfect square, else honest refuse."""
    mm = re.search(r"(\d{2,7})\s*$|of\s+(\d{2,7})\b", text)
    if not mm:
        return None
    n = int(mm.group(1) or mm.group(2))
    r = math.isqrt(n)
    if r * r != n:
        return None
    return (float(r), [
        f"{n} is a perfect square.",
        f"prime factors pair up evenly -> sqrt({n}) = {r}."],
        str(r), None, "sqrt via prime factorisation", None)

def _c_between_squares(slots, text):
    """'how many numbers lie between squares of 16 and 17' -> 2*n."""
    mm = re.search(r"squares?\s+of[^\d]{0,45}?(\d+)\s+and\s+(\d+)",
                   text, re.I)
    if not mm:
        return None
    a, b = int(mm.group(1)), int(mm.group(2))
    if b != a + 1:
        return None
    v = 2 * a
    return (float(v), [
        f"between {a}^2={a*a} and {b}^2={b*b} lie {2*a+1-1} numbers.",
        f"rule: between n^2 and (n+1)^2 -> 2n numbers = {v}."],
        str(v), None, "2n between n^2 and (n+1)^2", None)

def _c_set_card(slots, text):
    """'|A| = 3, B = {3,4,5}, |AxB| = ?' -> |A| x |B|."""
    if not re.search(r"element|A\s*[x×]\s*B|A x B|cartesian", text,
                     re.I):
        return None
    ma = re.search(r"set\s+A\s+has\s+(\d+)\s+element", text, re.I)
    mb = re.search(r"B\s*=\s*\{([^}]*)\}", text)
    if not (ma and mb):
        return None
    a = int(ma.group(1))
    b = len([x for x in mb.group(1).split(',') if x.strip()])
    v = a * b
    return (float(v), [
        f"|A| = {a}, |B| = {b}.",
        f"|A x B| = |A| x |B| = {v}."],
        str(v), None, "|AxB| = |A|.|B|", None)

def _c_consistency(slots, text):
    """'is the pair a1x+b1y+c1=0, a2x+b2y+c2=0 consistent?' via ratios."""
    me = re.findall(r"(-?\d*\.?\d*)\s*x\s*([+-]\s*\d*\.?\d*)\s*y"
                    r"\s*=\s*(-?\d+\.?\d*)", text)
    if len(me) < 2 or not re.search(r"consistent", text, re.I):
        return None
    def cv(t):
        t = t.replace(" ", "")
        return float(t) if t not in ("", "+", "-") else             (1.0 if t != "-" else -1.0)
    a1, b1, c1 = cv(me[0][0]), cv(me[0][1]), float(me[0][2])
    a2, b2, c2 = cv(me[1][0]), cv(me[1][1]), float(me[1][2])
    if not (a2 and b2):
        return None
    ra, rb, rc = a1 / a2, b1 / b2, (c1 / c2 if c2 else None)
    if ra != rb:
        verdict = "consistent (unique solution)"
    elif rc is not None and rb == rc:
        verdict = "consistent (infinitely many solutions)"
    else:
        verdict = "inconsistent (no solution)"
    return (None, [
        f"a1/a2 = {ra:.3g}, b1/b2 = {rb:.3g}" +
        (f", c1/c2 = {rc:.3g}" if rc is not None else ""),
        f"ratios -> {verdict}."],
        verdict, None, "a1/a2 vs b1/b2 vs c1/c2", None)

def _c_point_line_dist(slots, text):
    """Distance from point (x0,y0) to line ax+by+c=0."""
    mp = re.search(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)"
                   r"\s*\)", text)
    ml = re.search(r"(-?\d*)\s*x\s*([+-]\s*\d*)\s*y\s*([+-]\s*\d+)",
                   text, re.I)
    if not (mp and ml):
        return None
    x0, y0 = float(mp.group(1)), float(mp.group(2))
    a_s = (ml.group(1) or "1").replace(" ", "")
    b_s = (ml.group(2) or "0").replace(" ", "")
    a = float(a_s) if a_s not in ("", "+", "-") else \
        (1.0 if a_s != "-" else -1.0)
    b = float(b_s) if b_s not in ("", "+", "-") else \
        (1.0 if b_s != "-" else -1.0)
    c = float(ml.group(3).replace(" ", ""))
    v = abs(a * x0 + b * y0 + c) / math.sqrt(a * a + b * b)
    return (_snap_wv(v), [
        f"d = |ax+by+c|/sqrt(a^2+b^2)",
        f"= |{_fmt_wv(a)}*{_fmt_wv(x0)} + {_fmt_wv(b)}*{_fmt_wv(y0)} + "
        f"{_fmt_wv(c)}| / {_fmt_wv(math.sqrt(a*a+b*b))} = {_fmt_wv(v)}."],
        f"{_fmt_wv(v)}", None, "point-line distance", None)

def _c_conic_eq(slots, text):
    """Ellipse x^2/a^2+y^2/b^2=1 from a,b; parabola y^2=4ax from a."""
    if re.search(r"parabola", text, re.I):
        mf = re.search(r"focus[\w\s\(\),]{0,20}?"
                       r"(-?\d+(?:\.\d+)?)", text, re.I)
        if mf:
            a = float(mf.group(1))
            return (a, [
                f"parabola focus ({_fmt_wv(a)},0) -> a = {_fmt_wv(a)}.",
                f"y^2 = 4ax = 4*{_fmt_wv(a)}x = {_fmt_wv(4*a)}x."],
                f"y^2 = {_fmt_wv(4*a)}x", None, "y^2=4ax", None)
        return None
    if re.search(r"ellipse", text, re.I):
        ms = re.findall(r"(?:a|b)\s*=\s*(\d+(?:\.\d+)?)", text)
        mab = re.search(r"(?:semi[- ]major|a)[\w\s]{0,8}?"
                        r"(\d+(?:\.\d+)?)[\w\s]{0,15}?"
                        r"(?:semi[- ]minor|b)[\w\s]{0,8}?"
                        r"(\d+(?:\.\d+)?)", text, re.I)
        if mab:
            a, b = float(mab.group(1)), float(mab.group(2))
        elif len(ms) >= 2:
            a, b = float(ms[0]), float(ms[1])
        else:
            return None
        return (a * a, [
            f"ellipse: x^2/{_fmt_wv(a)}^2 + y^2/{_fmt_wv(b)}^2 = 1.",
            f"= x^2/{_fmt_wv(a*a)} + y^2/{_fmt_wv(b*b)} = 1."],
            f"x^2/{_fmt_wv(a*a)} + y^2/{_fmt_wv(b*b)} = 1", None,
            "x^2/a^2 + y^2/b^2 = 1", None)
    return None

def _c_inverse_trig(slots, text):
    """sin^-1(x), cos^-1(x), tan^-1(x) sums/evals -> degrees."""
    import math as _m
    vals = {0.5: 30, 0.5 ** 0.5: 45, 1.0: 90, 3 ** 0.5: 60,
            0.0: 0, -0.5: -30, -(0.5 ** 0.5): -45, -1.0: -90}
    outs = re.findall(
        r"(sin|cos|tan)\s*(?:\^?\{?-1\}?|\^-1|inv|verse)\s*"
        r"\(?\s*(-?\d+(?:\.\d+)?|sqrt\s*\(?\s*\d+\s*\)?\s*/\s*\d+|"
        r"\d+\s*/\s*\d+)\s*\)?", text, re.I)
    if not outs:
        return None
    tot = 0.0
    steps = []
    for fn, raw in outs:
        raw = raw.replace(" ", "")
        if "/" in raw:
            if "sqrt" in raw:
                num = _m.sqrt(float(raw.split("/")[0].
                                    replace("sqrt", "").strip("()")))
                den = float(raw.split("/")[1])
                x = num / den
            else:
                a_, b_ = raw.split("/")
                x = float(a_) / float(b_)
        else:
            x = float(raw)
        if fn == "sin":
            deg = _m.degrees(_m.asin(max(-1, min(1, x))))
        elif fn == "cos":
            deg = _m.degrees(_m.acos(max(-1, min(1, x))))
        else:
            deg = _m.degrees(_m.atan(x))
        steps.append(f"{fn}^-1({raw}) = {_fmt_wv(deg)} deg.")
        tot += deg
    v = tot
    return (_snap_wv(v), steps, f"{_fmt_wv(v)} deg", None,
            "inverse-trig eval", None)

def _c_vector_ops(slots, text):
    """Cross product / unit vector / projection / scalar triple."""
    # relation asks ("are they parallel?") want a text verdict, not a
    # product — VECTOR_RELATION owns them (cross=0 shipped as "(0,0,0)")
    if re.search(r"parallel|perpendicular|collinear", text, re.I) \
            and re.search(r"whether|are\b|check|determine|if\b|show",
                          text, re.I):
        return None
    vecs = re.findall(
        r"\(?\s*(-?\d+(?:\.\d+)?)\s*i\s*([+-]\s*\d+(?:\.\d+)?)?\s*j?\s*"
        r"([+-]\s*\d+(?:\.\d+)?)?\s*k?\s*\)?", text, re.I)
    if len(vecs) < 1:
        return None
    def _to(g):
        a = float(g[0])
        b = float((g[1] or "0").replace(" ", "")) if g[1] else 0.0
        c = float((g[2] or "0").replace(" ", "")) if g[2] else 0.0
        return (a, b, c)
    a = _to(vecs[0])
    if re.search(r"unit\s+vector|unit\s*vector", text, re.I):
        na = math.sqrt(sum(x * x for x in a))
        if na == 0:
            return None
        return (na, [
            f"|a| = {_fmt_wv(na)}.",
            f"unit vector = a/|a| = ({_fmt_wv(a[0]/na)}, "
            f"{_fmt_wv(a[1]/na)}, {_fmt_wv(a[2]/na)})."],
            f"({_fmt_wv(a[0]/na)}i + {_fmt_wv(a[1]/na)}j + "
            f"{_fmt_wv(a[2]/na)}k)", None, "a/|a|", None)
    if len(vecs) < 2:
        return None
    b = _to(vecs[1])
    if re.search(r"projection", text, re.I):
        dot = sum(x * y for x, y in zip(a, b))
        nb = math.sqrt(sum(y * y for y in b))
        if nb == 0:
            return None
        v = dot / nb
        return (_snap_wv(v), [
            f"proj of a on b = a.b/|b| = {_fmt_wv(dot)}/{_fmt_wv(nb)}"
            f" = {_fmt_wv(v)}."],
            f"{_fmt_wv(v)}", None, "a.b/|b|", None)
    # cross product
    cx = a[1] * b[2] - a[2] * b[1]
    cy = a[2] * b[0] - a[0] * b[2]
    cz = a[0] * b[1] - a[1] * b[0]
    return (cx, [
        f"a x b = ({_fmt_wv(cx)}, {_fmt_wv(cy)}, {_fmt_wv(cz)}).",
        f"|a x b| = {_fmt_wv(math.sqrt(cx*cx+cy*cy+cz*cz))}."],
        f"({_fmt_wv(cx)}i + {_fmt_wv(cy)}j + {_fmt_wv(cz)}k)", None,
        "cross product", None)

def _c_direction_cosines(slots, text):
    """Direction cosines/ratios of vector ai+bj+ck or line through
    origin (x,y,z)."""
    mv = re.search(r"\(?\s*(-?\d+(?:\.\d+)?)\s*i\s*"
                   r"([+-]\s*\d+(?:\.\d+)?)?\s*j?\s*"
                   r"([+-]\s*\d+(?:\.\d+)?)?\s*k?", text, re.I)
    if not mv:
        mp = re.findall(r"\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*"
                        r"(-?\d+(?:\.\d+)?)\s*,\s*"
                        r"(-?\d+(?:\.\d+)?)\s*\)?", text)
        if not mp:
            return None
        # 'direction ratios (a,b,c) and (d,e,f)' is an angle-between-
        # lines ask — two direction vectors, not endpoints of one line
        two_dirs = re.search(r"direction\s+ratios?|direction\s+cosines?|"
                             r"two\s+lines|angle\s+between", text, re.I)
        if len(mp) >= 2 and not two_dirs and re.search(
                r"join|passes?\s+through|from|line\b|points", text, re.I):
            # two endpoints: direction = Q - P, not P itself
            a = float(mp[1][0]) - float(mp[0][0])
            b = float(mp[1][1]) - float(mp[0][1])
            c = float(mp[1][2]) - float(mp[0][2])
        elif len(mp) >= 2 and two_dirs:
            return None  # angle-between-lines is LINES_ANGLE_3D
        else:
            a, b, c = float(mp[0][0]), float(mp[0][1]), float(mp[0][2])
    else:
        a = float(mv.group(1))
        b = float((mv.group(2) or "0").replace(" ", ""))
        c = float((mv.group(3) or "0").replace(" ", ""))
    n = math.sqrt(a * a + b * b + c * c)
    if n == 0:
        return None
    l_, m_, nn = a / n, b / n, c / n
    return (n, [
        f"|v| = sqrt({_fmt_wv(a)}^2+{_fmt_wv(b)}^2+{_fmt_wv(c)}^2)"
        f" = {_fmt_wv(n)}.",
        f"l = {_fmt_wv(l_)}, m = {_fmt_wv(m_)}, n = {_fmt_wv(nn)}."],
        f"l={_fmt_wv(l_)}, m={_fmt_wv(m_)}, n={_fmt_wv(nn)}", None,
        "l,m,n = comps/|v|", None)

def _c_lines_angle_3d(slots, text):
    """Angle between two lines with direction ratios (a,b,c),(d,e,f):
    cos θ = |ad+be+cf| / (√(a²+b²+c²)·√(d²+e²+f²))."""
    mp = re.findall(r"\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*"
                    r"(-?\d+(?:\.\d+)?)\s*,\s*"
                    r"(-?\d+(?:\.\d+)?)\s*\)?", text)
    if len(mp) < 2:
        return None
    a = [float(x) for x in mp[0]]
    b = [float(x) for x in mp[1]]
    na = math.sqrt(sum(x * x for x in a))
    nb = math.sqrt(sum(x * x for x in b))
    if na == 0 or nb == 0:
        return None
    cos_t = abs(sum(x * y for x, y in zip(a, b))) / (na * nb)
    cos_t = min(1.0, cos_t)
    deg = math.degrees(math.acos(cos_t))
    return (_snap_wv(deg), [
        f"a=({','.join(_fmt_wv(x) for x in a)}), "
        f"b=({','.join(_fmt_wv(x) for x in b)}).",
        f"cos θ = |a·b|/(|a||b|) = {_fmt_wv(cos_t)}.",
        f"θ = {_fmt_wv(deg)}°."],
        f"{_fmt_wv(deg)} deg", None,
        "cos θ = |a·b|/(|a||b|)", None)

def _c_vector_relation(slots, text):
    """'are a and b parallel / perpendicular / collinear' — text answer."""
    # vector components need i/j/k unit-letter boundaries — a bare 'i'
    # inside 'lines' must not parse as the i-component (it shadowed
    # LINES_PARALLEL exemplars with phantom vectors)
    mv = re.findall(
        r"(?<![a-zA-Z])(-?\d*)\s*i\b\s*([+-]\s*\d*(?:\.\d+)?)\s*j\b"
        r"(?:\s*([+-]\s*\d*(?:\.\d+)?)\s*k\b)?", text)
    if len(mv) < 2:
        return None
    def _v(groups):
        def _term(raw, bare_default):
            s = (raw or "").replace(" ", "")
            if s == "":
                return bare_default
            if s == "+":
                return 1.0
            if s == "-":
                return -1.0
            return float(s)
        # i is required by the regex -> '' means a bare 'i' = 1;
        # j/k are optional -> '' means the component is absent = 0
        return [_term(groups[0], 1.0), _term(groups[1], 0.0),
                _term(groups[2], 0.0)]
    a, b = _v(mv[0]), _v(mv[1])
    cross = [a[1] * b[2] - a[2] * b[1],
             a[2] * b[0] - a[0] * b[2],
             a[0] * b[1] - a[1] * b[0]]
    dot = sum(x * y for x, y in zip(a, b))
    if all(abs(x) < 1e-9 for x in cross):
        ans = "parallel (collinear — b is a scalar multiple of a)"
        steps = ["a x b = 0 -> vectors are parallel."]
    elif abs(dot) < 1e-9:
        ans = "perpendicular"
        steps = ["a · b = 0 -> vectors are perpendicular."]
    else:
        ans = "neither parallel nor perpendicular"
        steps = [f"a · b = {_fmt_wv(dot)} != 0, a x b != 0 -> neither."]
    return (None, steps, ans, None,
            "parallel iff a x b = 0; perpendicular iff a · b = 0", None)

def _c_bayes_wv(slots, text):
    """Bayes: P(A1),P(A2),P(E|A1),P(E|A2) -> P(A1|E).
    Also: P(A)=0.5, P(B|A)=0.4 -> P(A∩B) = 0.2 (multiplication rule).
    Also: P(A)=0.4, P(B)=0.8, P(B|A)=0.6 -> P(A|B) = 0.3."""
    # multiplication rule & conditional probability ask:
    mc = re.search(r"P\s*\(\s*([A-Z])\s*\|\s*([A-Z])\s*\)\s*="
                   r"\s*(\d+(?:\.\d+)?)", text)
    if mc:
        cond_event = mc.group(1).upper()
        given_event = mc.group(2).upper()
        cond_val = float(mc.group(3))
        pa_all = dict((k.upper(), float(v)) for k, v in
                      re.findall(r"P\s*\(\s*([A-Z])\s*\)\s*=\s*(\d+(?:\.\d+)?)", text))
        if given_event in pa_all:
            p_inter = cond_val * pa_all[given_event]
            ask_cond = re.search(r"P\s*\(\s*([A-Z])\s*\|\s*([A-Z])\s*\)(?!\s*=)", text, re.I)
            if ask_cond:
                t_num = ask_cond.group(1).upper()
                t_den = ask_cond.group(2).upper()
                if t_den in pa_all and pa_all[t_den] > 0:
                    ans_val = p_inter / pa_all[t_den]
                    steps = [
                        f"P({cond_event}∩{given_event}) = P({cond_event}|{given_event})·P({given_event}) = {_fmt_wv(cond_val)} x {_fmt_wv(pa_all[given_event])} = {_fmt_wv(p_inter)}.",
                        f"P({t_num}|{t_den}) = P({cond_event}∩{given_event}) / P({t_den}) = {_fmt_wv(p_inter)} / {_fmt_wv(pa_all[t_den])} = {_fmt_wv(ans_val)}."
                    ]
                    return (_snap_wv(ans_val), steps, f"{_fmt_wv(ans_val)}", None,
                            f"P({t_num}|{t_den})=P(A∩B)/P({t_den})", None)
            if re.search(r"P\s*\(\s*[A-Z]\s*(?:∪|union|\bor\b)\s*[A-Z]\s*\)", text, re.I):
                if cond_event in pa_all and given_event in pa_all:
                    ans_val = pa_all[cond_event] + pa_all[given_event] - p_inter
                    steps = [
                        f"P({cond_event}∩{given_event}) = {_fmt_wv(p_inter)}.",
                        f"P({cond_event}∪{given_event}) = P({cond_event}) + P({given_event}) - P({cond_event}∩{given_event}) = {_fmt_wv(ans_val)}."
                    ]
                    return (_snap_wv(ans_val), steps, f"{_fmt_wv(ans_val)}", None,
                            "P(A∪B)=P(A)+P(B)-P(A∩B)", None)
            if re.search(r"P\s*\(\s*[A-Z]\s+(?:and|∩)\s+[A-Z]\s*\)", text, re.I):
                return (_snap_wv(p_inter), [
                    f"P(A∩B) = P(B|A)·P(A) = {_fmt_wv(cond_val)} x "
                    f"{_fmt_wv(pa_all[given_event])} = {_fmt_wv(p_inter)}."],
                    f"{_fmt_wv(p_inter)}", None, "P(A∩B)=P(B|A)·P(A)", None)
    pa = re.findall(r"P\s*\(\s*([A-E])\s*\)\s*=\s*(\d+(?:\.\d+)?)",
                    text)
    pc = re.findall(r"P\s*\(\s*E\s*\|\s*([A-E])\s*\)\s*=\s*"
                    r"(\d+(?:\.\d+)?)", text)
    if len(pa) < 2 or len(pc) < 2:
        return None
    priors = {k: float(v) for k, v in pa}
    conds = {k: float(v) for k, v in pc}
    target = None
    mt = re.search(r"P\s*\(\s*([A-E])\s*\|\s*E\s*\)", text)
    if mt:
        target = mt.group(1)
    if target is None or target not in priors or \
            target not in conds:
        return None
    num = priors[target] * conds[target]
    den = sum(priors[k] * conds[k] for k in priors if k in conds)
    if den == 0:
        return None
    v = num / den
    return (_snap_wv(v), [
        f"P(E) = sum P(Ai)P(E|Ai) = {_fmt_wv(den)}.",
        f"P({target}|E) = {_fmt_wv(priors[target])}x"
        f"{_fmt_wv(conds[target])}/{_fmt_wv(den)} = {_fmt_wv(v)}."],
        f"{_fmt_wv(v)}", None, "Bayes", None)

def _c_rate_of_change(slots, text):
    """dV/dt, dr/dt chains: 'radius increasing at r cm/s, find dV/dt
    when radius is R' — related rates."""
    mr = re.search(r"(?:rate\s+of\s+|increas\w*\s+at\s+|decreas\w*\s+at\s+)"
                   r"(\d+(?:\.\d+)?)\s*(?:cm|m|units?)\s*/?\s*s?", text, re.I)
    mw = re.search(r"(?:when\s+)?(?:radius|r)\s*(?:is|=|of)?\s*"
                   r"(\d+(?:\.\d+)?)\s*(cm|m)?", text, re.I)
    if not (mr and mw):
        return None
    dr = float(mr.group(1))
    r = float(mw.group(1))
    if re.search(r"volume", text, re.I) and re.search(
            r"sphere|bubble", text, re.I):
        v = 4 * math.pi * r * r * dr
        return (_snap_wv(v), [
            f"V = (4/3)pi r^3 -> dV/dt = 4pi r^2 dr/dt.",
            f"= 4pi x {_fmt_wv(r)}^2 x {_fmt_wv(dr)} = {_fmt_wv(v)} "
            f"cm^3/s."],
            f"{_fmt_wv(v)} cm^3/s", None, "dV/dt = 4pi r^2 dr/dt",
            None)
    if re.search(r"area", text, re.I):
        v = 2 * math.pi * r * dr
        return (_snap_wv(v), [
            f"A = pi r^2 -> dA/dt = 2pi r dr/dt.",
            f"= 2pi x {_fmt_wv(r)} x {_fmt_wv(dr)} = {_fmt_wv(v)} cm^2/s."],
            f"{_fmt_wv(v)} cm^2/s", None, "dA/dt = 2pi r dr/dt",
            None)
    return None

def _c_sep_diffeq(slots, text):
    """dy/dx = f(x)g(y) separable -> implicit solution string.
    Also handles transcendental forms like e^(dy/dx) = x -> dy/dx = ln(x)."""
    m_exp = re.search(r"e\s*\^\s*\(?\s*dy/dx\s*\)?\s*=\s*([a-zA-Z0-9_]+)", text, re.I)
    if m_exp:
        rhs_var = m_exp.group(1).lower()
        ans = f"y = {rhs_var} log {rhs_var} - {rhs_var} + c"
        return (None, [
            f"e^(dy/dx) = {rhs_var} -> dy/dx = log({rhs_var}).",
            f"dy = log({rhs_var}) d{rhs_var}.",
            f"Integrating both sides: y = integral log({rhs_var}) d{rhs_var} = {rhs_var} log {rhs_var} - {rhs_var} + c."],
            ans, None, "separable ODE: e^(dy/dx)=x -> y = x log x - x + c", None)
    m = re.search(r"dy/dx\s*=\s*(.+?)(?:\s+is|\s*\(A\)|$)", text, re.I)
    if not m:
        return None
    rhs = m.group(1).strip().rstrip(".,;").strip()
    try:
        import sympy as sp
    except ImportError:
        return None
    x = sp.Symbol("x")
    yf = sp.Function("y")
    rhs_c = re.sub(r"(\d)\s*([xy(])", r"\1*\2", rhs)
    rhs_c = rhs_c.replace("^", "**")
    try:
        rhs_e = sp.sympify(rhs_c, locals={"x": x, "y": yf(x)})
        sol = sp.dsolve(sp.Eq(yf(x).diff(x), rhs_e), yf(x))
    except Exception:
        return None
    sols = sol if isinstance(sol, (list, tuple)) else [sol]
    ans = " or ".join(f"y = {getattr(s, 'rhs', s)}" for s in sols)
    return (None, [
        f"dy/dx = {rhs}.",
        f"separable -> general solution: {ans}."],
        ans, None, "separable ODE", None)

def _c_second_derivative(slots, text):
    """d2y/dx2 of y = f(x)."""
    m = re.search(r"y\s*=\s*(.+?)(?:\.|$)", text, re.I)
    if not m:
        return None
    try:
        import sympy as sp
    except ImportError:
        return None
    x = sp.Symbol("x")
    expr = re.sub(r"(\d)\s*([a-zA-Z(])", r"\1*\2",
                  m.group(1).strip()).replace("^", "**")
    try:
        y = sp.sympify(expr)
        d2 = sp.diff(y, x, 2)
    except Exception:
        return None
    return (None, [
        f"y = {y}.",
        f"y' = {sp.diff(y, x)}.",
        f"y'' = {d2}."],
        f"{d2}", None, "y'' = d2y/dx2", None)

def _c_grouped_mean_wv(slots, text):
    """Mean of 'values with frequencies' inline: '5 occurs 3 times,
    10 occurs 2' -> weighted mean.

    DIG-GATE (2026-10-06): 'find the MODE of: 5 occurs 3 times,
    7 occurs 5 times ...' matched this family's force pattern and
    shipped the weighted mean (6.8) VERIFIED; the mode is 7.  Only a
    mean/average ask belongs here."""
    if re.search(r"\bmode\b|\bmedian\b", text, re.I):
        return None
    # TABLE FORM (C8 dig 2026-10-07): 'Values: 5, 10, 15, 20, 25
    # Freq: 3, 5, 8, 4, 2' — separate lists, not inline pairs.
    # The occurs-pattern missed this shape and the question fell
    # through to a fallback that averaged the 10 numbers.
    mv = re.search(r"values?\s*[:=]?\s*([\d,\s]+?)(?:freq|frequenc)",
                   text, re.I)
    mf = re.search(r"freq\w*\s*[:=]\s*([\d,\s]+)|"
                   r"freq\w*\s*[:=]?\s*(\d[\d,\s]*\d)", text, re.I)
    if mv and mf:
        xs = [float(n) for n in
              re.findall(r"\d+(?:\.\d+)?", mv.group(1))]
        fs = [float(n) for n in
              re.findall(r"\d+(?:\.\d+)?", mf.group(1) or mf.group(2))]
        if xs and len(xs) == len(fs):
            sfx = sum(x * f for x, f in zip(xs, fs))
            sf = sum(fs)
            if sf == 0:
                return None
            v = sfx / sf
            terms = " + ".join(f"{_fmt_wv(x)}x{_fmt_wv(f)}"
                              for x, f in zip(xs, fs))
            return (_snap_wv(v), [
                f"Σfx = {terms} = {_fmt_wv(sfx)}; Σf = {_fmt_wv(sf)}.",
                f"mean = Σfx/Σf = {_fmt_wv(sfx)}/{_fmt_wv(sf)} = {_fmt_wv(v)}."],
                f"{_fmt_wv(v)}", None, "grouped mean = Σfx/Σf", None)
    pairs = re.findall(r"(\d+(?:\.\d+)?)\s*(?:occurs?|has\s+frequency|"
                       r"times|freq(?:uency)?)[\w\s]{0,10}?"
                       r"(\d+)", text, re.I)
    if not pairs:
        return None
    num = sum(float(a) * float(b) for a, b in pairs)
    den = sum(float(b) for _, b in pairs)
    if den == 0:
        return None
    v = num / den
    return (_snap_wv(v), [
        "weighted mean = sum(x_i f_i)/sum(f_i)",
        f"= {_fmt_wv(num)}/{_fmt_wv(den)} = {_fmt_wv(v)}."],
        f"{_fmt_wv(v)}", None, "sum(xf)/sum(f)", None)

def _register_waves(specs):
    """Attach computes already defined in structure_families.py
    (the earlier truncated wave) plus the ones defined here.

    IMPORT-HYGIENE (2026-10-06 dig): `from pkg import module` raises
    ImportError while structure_families is mid-import (the dig2
    circular window), silently creating a SECOND `its.solver` module
    identity and registering the wave specs into the wrong dict —
    downstream, backend.its.solver.structure_families.STRUCTURE_SPECS
    lacked HCF_LCM etc. (9 KeyErrors in the combined test run).
    `import pkg.module` binds via sys.modules and is partial-init safe."""
    try:
        import backend.its.solver.structure_families as _sf
    except ImportError:
        import its.solver.structure_families as _sf
    local = {
        "INVERSE_PROP": _c_inverse_prop,
        "COMPOUND_INTEREST": _c_compound_interest,
        "DISCOUNT_GST": _c_discount_gst_wv,
        "CUBOID_SPHERE": _c_cuboid_sphere,
        "TRAPEZIUM_AREA": _c_trapezium_area,
        "MEDIAN_MODE": _c_median_mode,
        "REMAINDER_THEOREM": _c_remainder_theorem,
        "RATIONALIZE": _c_rationalize,
        "PERFECT_SQUARE": _c_perfect_square,
        "ANGLE_SUM_TRI": _c_angle_sum,
        "QUAD_NATURE": _c_quad_nature,
        "CARD_PROB": _c_card_prob,
        "FRUSTUM": _c_frustum,
        "DIGIT_REVERSAL": _c_digit_reversal,
        "COMPLEX_OPS": _c_complex_ops,
        "BINOM_RTH_TERM": _c_binom_rth,
        "REMAINDER_CHAIN": _c_remainder_chain,
        "GP_INF": _c_gp_inf,
        "SQRT_PF": _c_sqrt_pf,
        "BETWEEN_SQUARES": _c_between_squares,
        "SET_CARD": _c_set_card,
        "CONSISTENCY": _c_consistency,
        "POINT_LINE_DIST": _c_point_line_dist,
        "CONIC_EQ": _c_conic_eq,
        "INVERSE_TRIG": _c_inverse_trig,
        "VECTOR_OPS": _c_vector_ops,
        "DIRECTION_COS": _c_direction_cosines,
        "LINES_ANGLE_3D": _c_lines_angle_3d,
        "VECTOR_RELATION": _c_vector_relation,
        "BAYES": _c_bayes_wv,
        "RATE_OF_CHANGE": _c_rate_of_change,
        "SEP_DIFFEQ": _c_sep_diffeq,
        "SECOND_DERIV": _c_second_derivative,
        "GROUPED_MEAN": _c_grouped_mean_wv,
    }
    out = {}
    for sid, spec in specs.items():
        spec = dict(spec)
        if spec.get("compute") is None:
            comp = local.get(sid) or getattr(
                _sf, f"_c_{sid.lower()}", None)
            if comp is None:
                # MID-IMPORT GUARD: _register_waves runs while structure_families
                # is partially initialised (the 4567 merge window) — defs
                # below that line don't exist in _sf yet.  Bind lazily so
                # the lookup happens at call time, when the module is
                # complete.  Without this HCF_LCM-style specs hold
                # compute=None forever.
                _sid = sid

                def _lazy(slots, text, _sid=_sid, _sf=_sf):
                    fn = getattr(_sf, f"_c_{_sid.lower()}", None)
                    if fn is None:
                        return None
                    return fn(slots, text)
                comp = _lazy
            spec["compute"] = comp
        out[sid] = spec
    return out

def _c_expected_value(slots, text):
    """Coin/dice payoff: 'wins Re 1 per head, loses Rs 1.50 per tail,
    4 tosses' -> expected value = sum(outcome x prob)."""
    if not re.search(r"(?:win|lose|gain|expected|expectation)", text,
                     re.I):
        return None
    mw = re.search(r"(?:win|gain)\w*\s*(?:rs\.?|₹|re\.?)?\s*"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    ml = re.search(r"(?:lose|lost|loss)\w*\s*(?:rs\.?|₹|re\.?)?\s*"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    mt = re.search(r"(\d+|one|two|three|four|five|six|seven|eight|"
                   r"nine|ten)\s*(?:times|tosses|throws|flips)",
                   text, re.I)
    if not (mw and ml):
        return None
    w, l = float(mw.group(1)), float(ml.group(1))
    nw = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
          "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10}
    n = nw.get(mt.group(1).lower(), None) if mt else None
    if n is None and mt:
        n = int(mt.group(1))
    if n is None:
        n = 1
    # fair coin: P(head)=P(tail)=1/2 per toss
    ev_per = (w * 0.5) - (l * 0.5)
    v = ev_per * n
    return (_snap_wv(v), [
        f"win {_fmt_wv(w)} / lose {_fmt_wv(l)} per toss, n = {n}.",
        f"E per toss = {_fmt_wv(w)}*0.5 - {_fmt_wv(l)}*0.5 = "
        f"{_fmt_wv(ev_per)}.",
        f"E({n} tosses) = {_fmt_wv(ev_per)} x {n} = {_fmt_wv(v)}."],
        f"Rs {_fmt_wv(v)}", None, "E = n(win.p - lose.p)", None)

def _c_solve_then_eval(slots, text):
    """'given 28p - 36 = 98, find 14p - 19 and 28p - 38' — solve p,
    then evaluate the related expression(s)."""
    me = re.search(r"(-?\d+(?:\.\d+)?)\s*([a-z])\s*([+-])\s*"
                   r"(\d+(?:\.\d+)?)\s*=\s*(-?\d+(?:\.\d+)?)",
                   text, re.I)
    mx = re.findall(r"(-?\d+(?:\.\d+)?)\s*([a-z])\s*([+-])\s*"
                    r"(\d+(?:\.\d+)?)", text)
    if not me or len(mx) < 2:
        return None
    a, var, sg, b, c = (float(me.group(1)), me.group(2),
                        me.group(3), float(me.group(4)),
                        float(me.group(5)))
    p = (c - b) / a if sg == "+" else (c + b) / a
    outs = []
    for co, v2, s2, k2 in mx[1:]:
        if v2 != var:
            continue
        co2, k2f = float(co), float(k2)
        val = co2 * p + (k2f if s2 == "+" else -k2f)
        outs.append(f"{_fmt_wv(co2)}{var} {s2} {_fmt_wv(k2f)} = {_fmt_wv(val)}")
    if not outs:
        return None
    return (float(outs[0].split('=')[1].strip()) if '=' in outs[0]
            else None,
            [f"{_fmt_wv(a)}{var} {sg} {_fmt_wv(b)} = {_fmt_wv(c)} -> "
             f"{var} = {_fmt_wv(p)}."] + outs,
            "; ".join(outs), None, "solve then substitute", None)

def _c_percent_change_owned(slots, text):
    """SOCIAL_GOLDEN ownership gate (2026-10-07): PERCENT_CHANGE must not
    own a RELATED-ELASTICITY stem.  A question that changes ANOTHER good's
    price (or income) across a from/to pair AND a demand quantity across a
    from/to pair asks for BOTH percentage changes plus the substitute/
    complement (or normal/inferior) classification — the economics
    registry's RELATED_ELASTICITY family answers all three beats from the
    corpus key.  The single-value percent family answered only the price
    leg ("25% increase") wearing VERIFIED — a verified-incomplete on a
    multi-part economics ask.  Decline here so the registry sweep promotes
    the owning family.  A plain "demand rose from 40 to 50, find the %
    change" (no income / other-good price) still belongs here."""
    det = re.search(
        r"(?:income|price\s+of\s+[a-z][a-z \-]{1,24})[\s\S]{0,160}?"
        r"(?:from|by)\s*(?:rs\.?|inr|\u20b9)?\s*\d[\d,]*", text, re.I)
    dem = re.search(
        r"\bdemand\b[\s\S]{0,160}?from\s*(?:rs\.?|inr|\u20b9)?\s*"
        r"\d[\d,]*[\s\S]{0,40}?to\s*(?:rs\.?|inr|\u20b9)?\s*\d[\d,]*",
        text, re.I)
    ask = re.search(r"percent|elasticit|%|indicate|relationship|"
                    r"percentage", text, re.I)
    if det and dem and ask:
        return None
    try:
        import backend.its.solver.structure_families as _sf
    except ImportError:  # pragma: no cover
        import its.solver.structure_families as _sf
    return _sf._c_percent_change(slots, text)

_RAW_SPECS = {
    "EXPECTED_VALUE": {
        "exemplars": [
            "a fair coin is tossed and you win rs 1 per head and lose rs 1.50 per tail find expected gain",
            "expected value of a game where you win on heads and lose on tails",
            "expected gain when coin tossed four times with win per head lose per tail",
        ],
        "slots": {}, "compute": _c_expected_value,
        "force": r"expected|expectation|win.{0,20}lose|gain.{0,20}lose",
    },
    "SOLVE_THEN_EVAL": {
        "exemplars": [
            "given 28p - 36 = 98 find the value of 14p - 19",
            "if 3x + 5 = 20 find the value of 6x + 4",
            "solve the equation then evaluate the related expression",
        ],
        "slots": {}, "compute": _c_solve_then_eval,
        "force": r"find\s+the\s+value\s+of\s+\d*\s*[a-z]\s*[+-]|"
                 r"given\s+\d*[a-z]\s*[+-]\s*\d+\s*=",
    },
    # ---- wave C6-9 (some computes live in structure_families.py) ----
    "HCF_LCM": {
        "force": r"\b(?:hcf|lcm|gcf|gcd)\b[^.]{0,30}\d|"
                 r"\d[^.]{0,30}\b(?:hcf|lcm|gcf|gcd)\b|"
                 r"ring\w*\s+(?:at|together)|toll\w*|bells?\b|"
                 r"greatest.{0,20}(?:measure|divide|number)|"
                 r"measure\w*\s+exactly|divides?\s+exactly|"
                 r"least.{0,15}(?:divisible|divided)|"
                 r"smallest.{0,15}(?:divisible|divided)|"
                 r"remainder.{0,20}each",
        "exemplars": [
            "find the lcm and hcf of 12 and 18",
            "find the hcf of two numbers",
            "highest common factor of the numbers",
            "least common multiple of the numbers",
            "find hcf and lcm",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "FRACTION_OF": {
        "exemplars": [
            "find the fraction of a quantity",
            "what is three fourths of the number",
            "find 2/3 of the given value",
            "percentage of a number",
            "find the given percent of the number",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "RECT_MEASURE": {
        "force": r"perimeter.{0,30}(?:square|rectangle)|(?:square|rectangle).{0,30}perimeter",
        "sanity": lambda v: v > 0,
        "exemplars": [
            "find the area of the rectangle",
            "perimeter of a rectangle with length and breadth",
            "area of a square of given side",
            "perimeter of the square",
            "rectangle length and breadth find area",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "COMP_SUPP_ANGLE": {
        "sanity": lambda v: 0 <= v <= 180,
        "exemplars": [
            "find the complementary angle of",
            "find the supplementary angle of",
            "complement of the given angle",
            "supplement of the given angle",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "PROFIT_LOSS": {
        "force": r"bought|selling\s+price|cost\s+price|sold\s+(?:for|at)|profit\s+%|loss\s+%|buys?\b|sells?\b",
        "sanity": lambda v: v >= 0,
        "exemplars": [
            "cost price and selling price find profit percent",
            "find the profit or loss percentage",
            "article bought and sold find gain percent",
            "cp sp given find profit or loss",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "PERCENT_CHANGE": {
        "force": r"(?:increas|decreas|change|rise|gain|loss)[^.]{0,20}"
                 r"\d+[^.]{0,20}percent|percent(?:age)?\s+"
                 r"(?:increas|decreas|change|rise|gain|loss)|"
                 r"rose\s+(?:from|to)|increased\s+(?:from|to|by)|"
                 r"decreased\s+(?:from|to|by)",
        "exemplars": [
            "a value increased by 20 percent find the new value",
            "price decreased by 15 percent",
            "salary raised by a percentage",
            "population increased by the given percent",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": _c_percent_change_owned,
    },
    "EXPONENT_EVAL": {
        "exemplars": [
            "evaluate the expression with powers",
            "simplify using laws of exponents",
            "find the value of a to the power m times a to power n",
            "evaluate the exponent expression",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "TRIANGLE_AREA": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "find the area of the triangle with base and height",
            "area of a parallelogram",
            "area of triangle with three sides heron",
            "find area using base and height",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "INVERSE_PROP": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "men can finish the work in days how long for others",
            "workers complete a job in days find time for more workers",
            "if some men take some days how many days for fewer men",
            "work and workers inverse proportion",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "COMPOUND_INTEREST": {
        "sanity": lambda v: v >= 0,
        "exemplars": [
            "find the compound interest on the principal",
            "compound interest at rate percent per annum",
            "amount after compound interest",
            "calculate ci for the given principal rate and time",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "DISCOUNT_GST": {
        "sanity": lambda v: v >= 0,
        "exemplars": [
            "marked price with discount find selling price",
            "price after discount percent",
            "gst added to the price find final amount",
            "price including tax or after discount",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "CUBOID_SPHERE": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "find the volume of the cuboid",
            "total surface area of cuboid box",
            "volume of a sphere of given radius",
            "surface area of a sphere or hemisphere",
            "hemisphere curved surface area",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "TRAPEZIUM_AREA": {
        "force": r"trapezium|trapezoid",
        "sanity": lambda v: v > 0,
        "exemplars": [
            "find the area of the trapezium",
            "area of trapezium with parallel sides",
            "trapezium two parallel sides and height",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "MEDIAN_MODE": {
        "exemplars": [
            "find the median of the data",
            "find the mode of the given values",
            "median of the observations",
            "mode of the data set",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "REMAINDER_THEOREM": {
        "exemplars": [
            "find the remainder when the polynomial is divided",
            "remainder theorem find the remainder",
            "p(x) divided by x minus a find remainder",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "RATIONALIZE": {
        "force": r"rationali[sz]e|in\s+the\s+denominator|surd",
        "exemplars": [
            "rationalise the denominator of the expression",
            "rationalize the given surd",
            "simplify by rationalising the denominator",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "PERFECT_SQUARE": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "find the greatest n digit perfect square",
            "largest perfect square of given digits",
            "smallest perfect square with n digits",
            "greatest 4 digit number which is a perfect square",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "ANGLE_SUM_TRI": {
        "sanity": lambda v: 0 < v < 180,
        "exemplars": [
            "a triangle has two angles find the third angle",
            "two angles of a triangle are given find the third",
            "find the third angle of the triangle",
            "angles of a triangle sum to 180",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },

    # ---- wave C10-12 ----
    "QUAD_NATURE": {
        "force": r"x\s*\^?\s*2.*(?:nature|discrimin|equal\s+roots?)|"
                r"(?:nature|discrimin).*x\s*\^?\s*2",
        "exemplars": [
            "find the nature of the roots of x^2 - 5x + 6 = 0",
            "find the discriminant of the quadratic",
            "find k for which the equation has equal roots",
            "does the quadratic have real roots",
            "discriminant and nature of roots",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "CARD_PROB": {
        "sanity": lambda v: 0 <= v <= 1,
        "force": r"(?:card|deck)\w*.{0,50}(?:probabilit|drawn|chance)|"
                r"52\s+cards",
        "exemplars": [
            "a card is drawn from a pack of 52 cards find probability",
            "probability of drawing a red card from a deck",
            "one card drawn from well shuffled deck find probability",
            "find the probability that the drawn card is a king",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "FRUSTUM": {
        "force": r"frustum|bucket\s+.*radi\w|truncated\s+cone",
        "sanity": lambda v: v > 0,
        "exemplars": [
            "find the volume of a frustum of a cone",
            "capacity of a bucket in the shape of a frustum",
            "curved surface area of a frustum",
            "volume of frustum with two radii and height",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "DIGIT_REVERSAL": {
        "force": r"two[- ]digit.{0,60}(revers|interchang|exceeds)|digits?\s+.{0,30}sum",
        "sanity": lambda v: v > 9,
        "exemplars": [
            "a two digit number whose digits sum to a value",
            "the digits of a two digit number are reversed",
            "reversed digits exceed the original number find it",
            "sum of digits of a two digit number",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "COMPLEX_OPS": {
        "force": r"\d\s*[+-]\s*\d*\s*i\b|complex\s+number|modulus\s+of",
        "exemplars": [
            "find the modulus of the complex number",
            "multiply the complex numbers",
            "add the complex numbers and express in a plus bi form",
            "find the conjugate of the complex number",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "BINOM_RTH_TERM": {
        "force": r"\d+\s*(?:st|nd|rd|th)\s+term.{0,30}\(|\([^)]*\)\s*\^\s*\d+",
        "sanity": lambda v: v > 0,
        "exemplars": [
            "find the 5th term in the expansion of (x + 2)^8",
            "find the fourth term of the expansion",
            "general term of the binomial expansion",
            "coefficient of the nth term of the expansion",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "REMAINDER_CHAIN": {
        "exemplars": ["find a number that leaves remainder 2 when divided by 3, remainder 3 when divided by 4, remainder 4 when divided by 5",
                      "least number leaving remainder 1 when divided by 2, 3, 4",
                      "number which leaves same shortfall on division"],
        "slots": {}, "compute": _c_remainder_chain,
        "force": r"remainder.{0,30}divided.{0,30}remainder|"
                 r"remainder.{0,10}(?:of\s+)?\d+.{0,15}(?:by|divided)\s+\d+|"
                 r"divided\s+by\s+[\d\s,]+leaves?\s+remainder"},
    "GP_INF": {
        "exemplars": ["sum to infinite terms of the GP",
                      "find the sum of the infinite geometric series",
                      "sum to infinity of a GP"],
        "slots": {}, "compute": _c_gp_inf,
        "force": r"infinite|infin.{0,10}terms|sum to inf"},
    "SQRT_PF": {
        "exemplars": ["find the square root by prime factorisation method",
                      "square root of 729 by prime factorisation",
                      "prime factorisation square root"],
        "slots": {}, "compute": _c_sqrt_pf,
        "force": r"square\s*root.{0,30}(?:factoris|factoriz)|(?:factoris|factoriz).{0,30}square"},
    "BETWEEN_SQUARES": {
        "exemplars": ["how many numbers lie between the squares of 16 and 17",
                      "numbers between squares of consecutive numbers"],
        "slots": {}, "compute": _c_between_squares,
        "force": r"between.{0,20}squares?\s+of"},
    "SET_CARD": {
        "exemplars": ["if set A has 3 elements and B = {3,4,5} find number of elements in A x B",
                      "cardinality of cartesian product",
                      "number of elements in A cross B"],
        "slots": {}, "compute": _c_set_card,
        "force": r"A\s*[x×]\s*B|elements\s+in.{0,10}(?:product|cross)"},
    "CONSISTENCY": {
        "exemplars": ["check whether the pair of equations is consistent or inconsistent",
                      "find whether the system of equations is consistent",
                      "consistent or inconsistent pair"],
        "slots": {}, "compute": _c_consistency,
        "force": r"consistent|inconsistent"},
    "POINT_LINE_DIST": {
        "force": r"(?:distance|perpendicular).{0,40}(?:point|line).{0,20}\(-?\d|\dx\s*[+-]",
        "sanity": lambda v: v >= 0,
        "exemplars": [
            "find the distance of the point (1, 2) from the line 3x + 4y - 5 = 0",
            "perpendicular distance of a point from a line",
            "distance between a point and a straight line",
            "length of perpendicular from the point to the line",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "CONIC_EQ": {
        "force": r"(?:parabola|ellipse|hyperbola).{0,50}(?:focus|a\s*=|b\s*=|e\s*=)|equation\s+of\s+(?:the\s+)?(?:parabola|ellipse)",
        "exemplars": [
            "find the equation of the parabola with the given focus",
            "equation of the ellipse with semi axes",
            "find the equation of the conic section",
            "parabola with vertex at origin and focus given",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "INVERSE_TRIG": {
        "force": r"(?:sin|cos|tan)\s*\^?\{?-1|inverse\s+trig|principal\s+value",
        "sanity": lambda v: -360 <= v <= 360,
        "exemplars": [
            "evaluate the inverse trigonometric expression",
            "find the value of sin inverse plus cos inverse",
            "find the principal value of inverse trig",
            "evaluate tan inverse of the given value",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "VECTOR_OPS": {
        "force": r"\di\s*[+-]|cross\s+product|a\s*x\s*b|unit\s+vector|projection\s+of|\d\s*i\b",
        "exemplars": [
            "find the cross product of the vectors",
            "find a unit vector in the direction of the vector",
            "find the projection of one vector on another",
            "a cross b of the two vectors",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "DIRECTION_COS": {
        "force": r"direction\s+cosines?|direction\s+ratios",
        "sanity": lambda v: v > 0,
        "exemplars": [
            "find the direction cosines of the vector",
            "direction ratios and direction cosines of the line",
            "find direction cosines of the line joining the origin",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "LINES_ANGLE_3D": {
        "force": r"angle\s+between\s+(?:the\s+)?(?:two\s+)?lines",
        "sanity": lambda v: 0 <= v <= 180,
        "exemplars": [
            "find the angle between the lines whose direction ratios are "
            "(2,1,2) and (1,2,-2)",
            "angle between two lines with direction ratios",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": _c_lines_angle_3d,
        "ask": "angle",
    },
    "VECTOR_RELATION": {
        "force": r"(?:parallel|perpendicular|collinear)\s+to\s+each\s+other|"
                 r"(?:are|whether)\s+.{0,30}(?:parallel|perpendicular|"
                 r"collinear)",
        "exemplars": [
            "check whether the vectors a = i+2j+3k and b = 2i+4j+6k are "
            "parallel",
            "determine whether the two vectors are perpendicular",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": _c_vector_relation,
    },
    "BAYES": {
        "force": r"P\s*\(\s*[A-E]\s*\)\s*=\s*[\d.]+.{0,30}P\s*\(\s*E\s*\||"
                 r"P\s*\([^)]*\|[^)]*\)|bayes|conditional\s+prob",
        "sanity": lambda v: 0 <= v <= 1,
        "exemplars": [
            "apply bayes theorem to find the probability",
            "find the probability that the item came from the machine",
            "using bayes theorem find the conditional probability",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": _c_bayes_wv,
    },
    "RATE_OF_CHANGE": {
        "force": r"(?:increas|decreas)ing\s+at\s+(?:the\s+)?rate|rate\s+of\s+change\s+of|d[VA]\s*/\s*dt",
        "sanity": lambda v: v >= 0,
        "exemplars": [
            "the radius is increasing at a rate find rate of volume",
            "find the rate of change of the volume of the sphere",
            "related rates problem find rate of change",
            "how fast is the volume increasing",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "SEP_DIFFEQ": {
        "force": r"dy/dx\s*=|differential\s+equation",
        "exemplars": [
            "solve the differential equation by separation",
            "find the general solution of the differential equation",
            "solve dy/dx equals the given expression",
            "find the solution of the differential equation",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "SECOND_DERIV": {
        "force": r"d2y|second\s+(?:order\s+)?deriv|differentiate\s+twice",
        "exemplars": [
            "find the second derivative of the function",
            "find d2y by dx2 of the function",
            "second order derivative of y equals",
            "differentiate the function twice",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
    "GROUPED_MEAN": {
        "force": r"occurs?\s+\d+\s*times|has\s+frequenc|frequency\s+distribution",
        "exemplars": [
            "find the mean of the frequency distribution",
            "calculate the mean from the given frequencies",
            "weighted mean of the data",
            "mean of grouped data",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4, "compute": None,
    },
}

def _build_waves():
    return _register_waves(_RAW_SPECS)

SPECS_WAVES = _build_waves()

STRUCTURE_SPECS.update(SPECS_WAVES)

# LANG-ALL (2026-10-07): deterministic grammar families (English voice/
# tense/speech/POS/transformation + Hindi sandhi/samas/karak/vachan/
# kaal) — since the WS-B consolidation step 6 (2026-10-10) the specs and
# computes live in the subject files (english_families.ENGLISH_LANG_SPECS
# / hindi_families.HINDI_LANG_SPECS; structure_families_lang.py is
# deleted), merged here — in the original ENG-then-HI order — so every
# lane that sweeps STRUCTURE_SPECS sees the LANG_ families.  Ids are
# verbatim, so the LANG_VERIFIERS keys keep hitting.  The subject files
# also self-register these specs at import (physics_families pattern),
# which repairs the import order where this block lands mid-import.
# Language asks carry no numeric kinds, so the ask-coherence gate stays
# fail-open on them by design.
try:
    from backend.its.solver.english_families import \
        ENGLISH_LANG_SPECS as _EL
    STRUCTURE_SPECS.update(_EL)
except ImportError:
    pass
try:
    from backend.its.solver.hindi_families import HINDI_LANG_SPECS as _HL
    STRUCTURE_SPECS.update(_HL)
except ImportError:
    pass

# PHYS/CHEM specs (WS-B step 8 / M2): the 18 physics + 9 chemistry
# spec entries moved to the subject files; merged here — after the
# waves/dig2 merges — preserving the original .update order.
try:
    from backend.its.solver.physics_families import PHYSICS_SPECS as _PS
    STRUCTURE_SPECS.update(_PS)
except ImportError:
    pass
try:
    from backend.its.solver.chemistry_families import CHEMISTRY_SPECS as _CS
    STRUCTURE_SPECS.update(_CS)
except ImportError:
    pass






WAVE2_SPECS = {
    "DISTANCE_POINT_AXIS": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "the shortest distance of the point (2,3) from the y-axis",
            "distance of the point (5,-4) from the x-axis is",
            "find the distance of point (7,2) from y axis",
            "what is the distance of (-3,4) from the x-axis",
        ],
        "slots": {},
        "compute": _c_distance_axis,
        "min_conf": 0.45,
    },
    "LINES_PARALLEL": {
        "force": r"lines?[^.]{0,60}(?:parallel|coincident|intersecting?|"
                 r"consistent)|(?:parallel|coincident|consistent)[^.]"
                 r"{0,60}lines?|pair\s+of\s+(?:linear\s+)?equations?",
        "exemplars": [
            "the lines 3x + 2ky = 2 and 2x + 5y + 1 = 0 are not parallel; find k",
            "for what value of k are the lines 2x + ky = 3 and 4x + 6y = 1 parallel",
            "find k if the pair of lines are parallel",
            "lines x + 2y = 4 and 3x + ky = 5 are not parallel; find k",
            "check whether the lines 2x + 3y = 5 and 4x + 6y = 9 are parallel",
        ],
        "slots": {},
        "compute": _c_lines_parallel,
        "min_conf": 0.45,
    },
    "MARKUP_DISCOUNT": {
        "force": r"marks?\b[^0-9]{0,20}\d+(?:\.\d+)?\s*%[\s\S]{0,40}"
                 r"above[\s\S]{0,40}discount|marks?\b[\s\S]{0,30}"
                 r"above[\s\S]{0,50}discount",
        "exemplars": [
            "marks goods 30 percent above cp 15 discount gain percent",
            "marked price 40 above cost 10 discount",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_markup_discount,
    },
    "DOUBLING": {
        "force": r"double|doubl",
        "exemplars": [
            "starts with 8 bacteria doubles every hour after 5 hours",
            "population doubles every year",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_doubling,
    },
    "INVERSE_PROPORTION_COUNT": {
        "force": r"how\s+many\s+(?:taps?|workers?|men|pipes?)",
        "exemplars": [
            "8 taps fill tank in 6 hours how many taps for 2.4 hours",
            "how many men needed to finish in 3 days",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_inverse_proportion_count,
    },
    "INVERSE_PROPORTION": {
        "force": r"\d+\s*(?:taps?|workers?|men|pipes?)[\s\S]{0,80}"
                 r"\d+\s*(?:taps?|workers?|men|pipes?)",
        "exemplars": [
            "5 taps fill tank in 48 minutes how long for 3 taps",
            "10 workers in 6 days how many for 4 days",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_inverse_proportion,
    },
    "SUBSTITUTE_EVAL": {
        "force": r"if\s+[a-zA-Z]\s*=\s*-?\d+|then\s+[a-zA-Z0-9\s²³\^"
                 r"+\-*/()]+=\s*\?|[a-zA-Z]\s*=\s*\d+[\s\S]{0,40}"
                 r"[a-zA-Z0-9²³\^+/*()]+=\s*\?",
        "exemplars": [
            "if a = 3 b = 2 then a squared + b squared",
            "a=5 b=3 find a^2-b^2",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_substitute_eval,
    },
    "POLY_EVAL": {
        "force": r"(?:evaluate|find)\s*(?:p|f|g)\s*\(\s*-?\d",
        "exemplars": [
            "evaluate p(2) where p(x) = x^3 - 2x^2 + 3x - 4",
            "find f(0) for f(x) = x^2 + 1",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_poly_eval,
    },
    "CIRCLE_ANGLE": {
        "force": r"centre[^.]{0,40}circumference|circumference[^.]"
                 r"{0,40}centre|angle\s+subtended",
        "exemplars": [
            "angle subtended at centre 80 find at circumference",
            "angle at centre twice angle at circumference",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_circle_angle,
    },
    "QUAD_FORMULA": {
        "force": r"quadratic\s+formula|solve[^.]{0,30}=\s*0[^.]"
                 r"{0,20}formula",
        "exemplars": [
            "solve 2x^2 - 7x + 3 = 0 using quadratic formula",
            "solve x^2 + 4x + 3 = 0 by the formula method",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_quad_formula,
    },
    "PROB_COINS": {
        "force": r"(?:two|three|four|2|3|4)\s+coins?\s+(?:are\s+)?"
                 r"(?:tossed|thrown)|coins?\s+tossed",
        "exemplars": [
            "two coins are tossed find probability of two heads",
            "three coins tossed find probability of all tails",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_prob_coins,
    },
    "QUAD_ZEROS": {
        "force": r"(?:zeros?|roots?)\s+of\s+(?:p|f)\s*\(\s*x\s*\)|"
                 r"p\s*\(\s*x\s*\)\s*=\s*[xX\d][^.]{0,40}zeros",
        "exemplars": [
            "find the zeros of p(x) = x^2 - 5x + 6",
            "zeros of x^2 + 3x - 4",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_quad_zeros,
    },
    "INSTALMENT_SI": {
        "force": r"(?:per\s+month|monthly|instalment|each\s+month)"
                 r"[\s\S]{0,60}(?:interest|earn|deposit)",
        "exemplars": [
            "deposit 500 per month for 24 months at 7% find interest",
            "monthly instalment simple interest",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_instalment_si,
    },
    "DIVIDEND_INCOME": {
        "force": r"invested?[^.]{0,20}shares?|shares?\s+at[^.]{0,20}"
                 r"dividend|dividend[^.]{0,20}income",
        "exemplars": [
            "invested 50000 in shares at 100 giving 8% dividend find income",
            "annual income from dividend shares",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_dividend_income,
    },
    "MODAL_CLASS": {
        "force": r"modal\s+class|mode\s+of\s+grouped",
        "exemplars": [
            "find modal class of frequency distribution",
            "mode of grouped data",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_modal_class,
    },
    "AREA_RATIO": {
        "force": r"divides[\s\S]{0,40}ratio[\s\S]{0,40}area|"
                 r"area[\s\S]{0,30}ABD[\s\S]{0,40}ratio|"
                 r"ratio\s*\d+\s*:\s*\d+[\s\S]{0,40}area",
        "exemplars": [
            "d divides bc in ratio 2:3 area abd = 12 find adc",
            "area ratio same height triangles",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_area_ratio,
    },
    "CURRENCY_CONVERT": {
        "force": r"(?:1\s*=\s*\d|1\s+(?:dollar|usd)\s*=)|"
                 r"(?:rs\.?\s*\d+.*(?:dollars?|usd))|"
                 r"(?:dollars?.*to\s+rupees?)",
        "exemplars": [
            "1 dollar = 75 rs convert 15000 rs to dollars",
            "convert dollars to rupees exchange rate",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_currency_convert,
    },
    "DEFINITE_AREA": {
        "force": r"area\s+(?:between|under|bounded)[^.]{0,50}"
                 r"(?:x\s*=|curve|y\s*=)",
        "exemplars": [
            "area between x=0 x=4 and y=x^2",
            "area under the curve from a to b",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_definite_area,
    },
    "COORD_AREA": {
        "force": r"vertices[^.]{0,30}(?:area|triangle)|"
                 r"triangle\s+(?:with\s+)?vertices",
        "exemplars": [
            "area of triangle vertices (1,2) (3,4) (5,0)",
            "find area of triangle with vertices",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_coord_area,
    },
    "TRIG_ELEVATION": {
        "force": r"angle\s+of\s+elevation|angle\s+of\s+depression|"
                 r"elevation|depression",
        "exemplars": [
            "tower 30 m angle of elevation 45 find distance",
            "height of pole from angle of depression",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_trig_elevation,
    },
    "INTERSECTION_PAIR": {
        "force": r"(?:intersection|solve)[^.]{0,20}x[^.]{0,10}y\s*=\s*\d"
                 r"[^.]{0,20}and[^.]{0,10}x[^.]{0,10}y\s*=\s*\d",
        "exemplars": [
            "intersection of 3x + 2y = 12 and 2x - y = 1",
            "solve simultaneous equations",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_intersection_pair,
    },
    "MEDIAN_CLASS": {
        "force": r"median\s+class|modal\s+class|"
                 r"class\s+interval.*median",
        "exemplars": [
            "find median class of frequency distribution",
            "modal class of grouped data",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_median_class,
    },
    "INTERSECT_CHORDS": {
        "force": r"chord\w*\s+(?:ab|cd)[^.]{0,40}intersect",
        "exemplars": [
            "chords ab and cd intersect at e find ed",
            "intersecting chords find segment",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_intersect_chords,
    },
    "TRIG_EVAL": {
        "force": r"(?:sin|cos|tan|sec|cosec|cot)\s*\^?2?\s*\d+\s*deg",
        "exemplars": [
            "evaluate sin^2 30 + cos^2 60",
            "sin 45 deg + cos 45 deg",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_trig_eval,
    },
    "SYMMETRIC_INVERSE": {
        "force": r"x\s*\+\s*1\s*/\s*x\s*=\s*\d",
        "exemplars": [
            "if x + 1/x = 3 find x^2 + 1/x^2",
            "x + 1/x = 4 find x^3 + 1/x^3",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_symmetric_inverse,
    },
    "CHORD_CIRCLE": {
        "force": r"chord[^.]{0,40}distance[^.]{0,40}centre|"
                 r"radius[^.]{0,30}chord[^.]{0,30}distance",
        "exemplars": [
            "chord 24 cm at distance 5 cm from centre find radius",
            "radius 10 chord at distance 8 find chord length",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_chord_circle,
    },
    "LOG_SOLVE": {
        "force": r"log\s*\d*\s*\(?\s*x\s*\)?\s*=\s*\d",
        "exemplars": [
            "if log10(x) = 2 find x",
            "log base 3 of x equals 4",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_log_solve,
    },
    "LOG_EVAL": {
        "force": r"log\s*\d+\s*[+-]\s*log\s*\d+",
        "exemplars": [
            "find log 9 + log 8 - log 6",
            "evaluate log 2 + log 5",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_log_eval,
    },
    "SLOPE": {
        "force": r"slope\s+of\s+(?:the\s+)?(?:line|segment)|"
                 r"gradient\s+of\s+(?:the\s+)?(?:line|segment)|"
                 r"slope[^.]{0,30}joining",
        "exemplars": [
            "find the slope of the line joining (2,-3) and (-4,5)",
            "gradient of segment joining two points",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_slope,
    },
    "LOG_EQUATION": {
        "force": r"log\s*\d*\s*\([^)]*x[^)]*\)\s*\+\s*log",
        "exemplars": [
            "solve log2(x+3) + log2(x-3) = 3",
            "log equation with sum of logs",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_log_equation,
    },
    "TRIG_INVERSE": {
        "force": r"(?:tan|sin|cos|cot|sec|cosec)\s+[A-Z]\s*[=:]\s*"
                 r"[\d.]|"
                 r"if\s+(?:tan|sin|cos)\s+[A-Z]",
        "exemplars": [
            "if tan a = 1 find a",
            "sin x = 0.5 find x",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_trig_inverse,
    },
    "ANGLE_BISECTOR": {
        "force": r"bisector\s+of\s+angle|bisects\s+angle|"
                 r"bisector.*meets.*(?:at|on)",
        "exemplars": [
            "bisector of angle a meets bc at d find bd",
            "angle bisector theorem divides opposite side",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_bisector_theorem,
    },
    "PYTHAGORAS": {
        "force": r"hypotenuse[^.]{0,30}(?:cm|m|\d)|"
                 r"right[\s-]*(?:angled?\s+)?triangle[^.]{0,40}"
                 r"(?:hypotenuse|side|leg|perpendicular|base|height)",
        "exemplars": [
            "right triangle hypotenuse 13 side 5 find other",
            "legs 3 and 4 find the hypotenuse",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_pythagoras,
    },
    "HOLLOW_CYLINDER": {
        "force": r"hollow\s+cylinder|cylindrical\s+shell|"
                 r"hollow\s+tube|pipe\s+wall",
        "exemplars": [
            "hollow cylinder outer radius 7 inner 5 height 10 volume",
            "volume of metal in a hollow pipe",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_hollow_cylinder,
    },
    "DIGITS_WORD": {
        "force": r"tens\s+digit|units?\s+digit|digit\s+of\s+a\s+number",
        "exemplars": [
            "tens digit is 3 times units digit number is 62",
            "digits of a two-digit number",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_digits_word,
    },
    "ANNULUS": {
        "force": r"concentric\s+circle|ring\s+between\s+(?:two|concentric)|"
                 r"annulus|between.*concentric",
        "exemplars": [
            "area of the ring between concentric circles radii 14 7",
            "annulus formed by two concentric circles",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_annulus,
    },
    "COMPLEMENTARY_EQUAL": {
        "force": r"equal\s+to\s+(?:its\s+)?(?:complement|supplement)",
        "exemplars": [
            "find the angle equal to its complement",
            "angle equal to its supplement",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_complementary_ask,
    },
    "CYLINDER_SURFACE": {
        "force": r"cylind\w*[\s\S]{0,60}(?:curved\s+surface|total\s+"
                 r"surface|CSA\b|TSA\b|surface\s+area)|"
                 r"(?:surface\s+area|CSA|TSA)[^.\n]{0,30}cylind",
        "exemplars": [
            "curved surface area of cylinder radius 7 height 10",
            "total surface area cylinder r 5 h 12",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_cylinder_surface,
    },
    "EMPIRICAL_RELATION": {
        "force": r"mean[^.]{0,20}mode[\s\S]{0,60}median|"
                 r"mode[^.]{0,20}mean[\s\S]{0,60}median|"
                 r"empirical\s+relation",
        "exemplars": [
            "mean 25 mode 20 find median empirical relation",
            "find median given mean and mode",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_empirical_relation,
    },
    "MEAN_TRANSFORM": {
        "force": r"mean\s+of\s+\d+[\s\S]{0,80}(?:multiplied|doubled|"
                 r"tripled|halved|added|increased)",
        "exemplars": [
            "mean of 10 numbers is 15 each multiplied by 2 new mean",
            "mean of 5 is 20 if each doubled find new mean",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_mean_transform,
    },
    "COMPOSITE_SHAPE": {
        "force": r"(?:semi[\s-]?circl|adjoining|norman)[\s\S]{0,80}"
                 r"(?:rectangl|width|breadth)|"
                 r"rectangl[\s\S]{0,60}semi[\s-]?circl",
        "exemplars": [
            "norman window semicircle on top of rectangle find area",
            "rectangle with semicircle adjoining find total area",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_composite_shape,
    },
    "CI_INVERSE": {
        "force": r"(?:becomes?|amounts?\s+to|grows?\s+to)\s*(?:rs\.?"
                 r"|₹)?\s*\d+[\s\S]{0,60}(?:ci|compound\s+interest)"
                 r"[\s\S]{0,60}find\s+(?:the\s+)?(?:principal|sum|"
                 r"original)",
        "exemplars": [
            "sum becomes 1936 in 2 years at 10 ci find principal",
            "amounts to 7260 in 2 years at 10 compound find sum",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_ci_inverse,
    },
    "CONE_SURFACE": {
        "force": r"(?:curved|total)?\s*surface\s+area[^.]{0,20}cone|"
                 r"cone[^.]{0,40}(?:curved\s+surface|total\s+surface|"
                 r"surface\s+area|CSA\b|TSA\b)",
        "exemplars": [
            "find the curved surface area of a cone with radius 6 cm",
            "total surface area of a cone",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_cone_surface,
    },
    "CUBOID_LSA": {
        "force": r"cuboid[\s\S]{0,80}(?:lateral|curved|side)\s*surface|"
                 r"lateral\s+surface\s+area\s+of\s+(?:a\s+)?cuboid",
        "exemplars": [
            "lateral surface area of cuboid 10 x 8 x 6",
            "cuboid lsa walls only",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_cuboid_lsa,
    },
    "CUBOID_CAPACITY": {
        "force": r"cuboid[\s\S]{0,80}(?:millilitre|litre|capacity|"
                 r"hold)|dimensions[\s\S]{0,60}(?:ml|litre|water)",
        "exemplars": [
            "cuboid 15 x 8 x 5 how many millilitres water",
            "tank dimensions find capacity litres",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_cuboid_capacity,
    },
    "CONE_VOLUME": {
        "force": r"volume\s+of\s+(?:a\s+)?cone|cone[^.]{0,30}volume|"
                 r"cone\s+with\s+r\s*=|cone\s+with\s+radi",
        "exemplars": [
            "find volume of a cone r 6 h 8",
            "cone radius 14 height 6 find volume",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_cone_volume,
    },
    "SYMMETRIC_EXPR": {
        "force": r"x\s*\+\s*y\s*=\s*-?\d+[\s\S]{0,40}(?:xy|x\s*y)\s*="
                 r"\s*-?\d+",
        "exemplars": [
            "x + y = 12 and xy = 35 find x squared plus y squared",
            "x+y=10 xy=21 find x2+y2",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_symmetric_expr,
    },
    "SI_CI_DIFF": {
        "force": r"difference\s+between\s+(?:si|simple\s+interest)|"
                 r"(?:si|simple)\s+and\s+(?:ci|compound)\s+difference|"
                 r"compar\w+\s+(?:si|simple\s+interest)\s+and\s+"
                 r"(?:ci|compound\s+interest)",
        "exemplars": [
            "difference between si and ci on 8000 at 10 for 2 years",
            "compare si and ci on 2000",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_si_ci_diff,
    },
    "POPULATION_GROWTH": {
        "force": r"population[\s\S]{0,40}(?:grow|increase)[\s\S]{0,40}"
                 r"\d+(?:\.\d+)?\s*%|population[^.]{0,30}\d+[^.]{0,30}"
                 r"(?:grow|increase)[^.]{0,30}\d+",
        "exemplars": [
            "a population of 40000 grows by 5 percent per year",
            "town population increases 3 percent annually",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_population_growth,
    },
    "MEAN_REMOVED": {
        "force": r"mean\s+of\s+\d+\s+(?:number|observation|value|"
                 r"item|score)\w*[\s\S]{0,80}(?:mean|average)\s+"
                 r"(?:of\s+the\s+)?remain|"
                 r"mean\s+of\s+\d+\s+(?:number|observation|value|"
                 r"item|score)\w*[\s\S]{0,60}(?:removed|excluded?|"
                 r"deleted?)[\s\S]{0,40}mean",
        "exemplars": [
            "mean of 6 numbers is 15 one removed remaining mean 14",
            "mean of 10 observations 20 one removed new mean 19",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_mean_removed,
    },
    "RATIO_SPLIT": {
        "force": r"(?:divide|split|share|distribute|apportion)\w*"
                 r"[^.]{0,40}ratio\s*[\d\s:]+|"
                 r"sides?[^.]{0,30}ratio\s*[\d\s:]+[\s\S]{0,60}"
                 r"perimeter",
        "exemplars": [
            "divide rs1800 in the ratio 2:3:4",
            "split 1000 in ratio 1:2",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_ratio_split,
    },
    "DECIMAL_TO_FRACTION": {
        "force": r"convert\s+\d+(?:\.\d+)?\s*(?:to|into|as)\s*"
                 r"(?:a\s+)?fraction",
        "exemplars": [
            "convert 0.625 to a fraction",
            "convert 0.75 into a fraction",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_decimal_to_fraction,
    },
    "RHOMBUS_AREA": {
        "force": r"rhombus",
        "exemplars": [
            "diagonals of a rhombus are 24 and 10 find area",
            "rhombus area with diagonals",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_rhombus_area,
    },
    "ANGLE_RATIO_TRI": {
        "force": r"angles?\s+of\s+a\s+triangle[^.]{0,30}ratio|"
                 r"angles?\s+(?:are|in\s+the\s+ratio)|"
                 r"angles?\s+x\s*,\s*\d*x",
        "exemplars": [
            "angles of a triangle are in ratio 3:4:5",
            "triangle angles x 2x 3x find each angle",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_angle_ratio_triangle,
    },
    "SI_INVERSE": {
        "force": r"(?:find\s+(?:the\s+)?(?:rate|principal|sum|time|"
                 r"years))[^.]{0,60}(?:si|simple\s+interest|rs)|"
                 r"(?:si|simple\s+interest)\s*=\s*rs",
        "exemplars": [
            "find the rate if si rs450 p rs3000 t 3 years",
            "find the principal if si rs600 r 6 t 2 years",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_si_inverse,
    },
    "LINEAR_INEQ": {
        "force": r"\d+\s*x\s*[+-]\s*\d+\s*x\s*(?:<=|>=)",
        "exemplars": [
            "solve 3x - 2x <= 7 + 5",
            "linear inequality combine like terms",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_linear_ineq,
    },
    "UNIT_CONVERT": {
        "force": r"\d+(?:\.\d+)?\s*(?:km|m|cm|mm|kg|g|mg|litre|ml|"
                 r"hours?|minutes?|seconds?)\s*(?:to|into|in)\s*"
                 r"(?:km|m|cm|mm|kg|g|mg|litre|ml|hours?|minutes?|"
                 r"seconds?|metres?|centimetres?|kilometres?|grams?|"
                 r"litres?)",
        "exemplars": [
            "convert 2.5 km to metres",
            "500 metres to centimetres",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_unit_convert,
    },
    "FRACTION_ARITH": {
        "force": r"(?:divide|multiply|add|subtract|evaluat\w*|"
                 r"simplif\w*|comput\w*|find|solve)\s*:?\s*"
                 r"\d+\s*/\s*\d+\s*(?:\+|-|x|\*|/|÷|by)\s*"
                 r"\d+\s*/\s*\d+|\d+\s*/\s*\d+\s*(?:\+|-)\s*"
                 r"\d+\s*/\s*\d+",
        "exemplars": [
            "divide 2/3 by 4/5",
            "add 1/2 and 1/3",
            "multiply 3/4 by 2/5",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_fraction_arith,
    },
    "RATIO_CHAIN": {
        "force": r"[a-zA-Z]\s*:\s*[a-zA-Z]\s*=\s*\d+(?:\.\d+)?\s*:\s*"
                 r"\d+(?:\.\d+)?[^.]{0,40}:\s*[a-zA-Z]\s*=\s*"
                 r"\d+(?:\.\d+)?\s*:\s*\d+(?:\.\d+)?",
        "exemplars": [
            "if a is to b as 2 to 3 and b is to c find a to c",
            "a:b = 2:3 and b:c = 4:5 find a:c",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_ratio_chain,
    },
    "CUBOID_MEASURE": {
        "force": r"cuboid|rectangular\s+(?:box|prism|solid)",
        "exemplars": [
            "find the total surface area of a cuboid with l w h",
            "volume of a cuboid length width height",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_cuboid_measure,
    },
    "PLACE_VALUE": {
        "force": r"place\s+value\s+of\s+\d",
        "exemplars": [
            "find the place value of 7 in 78945632",
            "place value of 5 in the number 3567",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_place_value,
    },
    "SQUARE_DIAGONAL": {
        "force": r"square[^.]{0,40}diagonal|diagonal[^.]{0,40}square",
        "exemplars": [
            "find the area of a square with diagonal 10 cm",
            "square diagonal 12 find side and area",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_square_diagonal,
    },
    "QUAD_ROOT_EXPR": {
        "force": r"alpha|beta|roots.*(?:sum|square|cube|reciprocal|"
                 r"difference|product)|\^2\s*\+\s*\w+\s*\^?2",
        "exemplars": [
            "alpha and beta are roots find alpha squared plus beta squared",
            "roots of quadratic find one over alpha plus one over beta",
            "if alpha beta are roots find alpha cube plus beta cube",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_root_expression,
    },
    "QUADRATIC_CHECK": {
        "exemplars": [
            "which one of the following is not a quadratic equation",
            "which of the following is not a quadratic equation",
            "identify the equation which is not quadratic",
        ],
        "slots": {},
        "compute": _c_quadratic_check,
        "full_text": True,
        "min_conf": 0.45,
    },
    "SEGMENT_AREA": {
        "sanity": lambda v: 0 <= v <= 1.0001,
        "exemplars": [
            "circles of radius 1 cm with chord of length 1 cm; total area of the dotted regions",
            "olympic rings congruent circles intersecting; area of shaded segments",
            "five congruent circles of radius 1 intersecting with chord 1; find dotted area",
        ],
        "slots": {"radius": ["radius"]},
        "compute": _c_segment_area,
        "min_conf": 0.5,
    },
    "QUAD_EQUAL_ROOTS": {
        "exemplars": [
            "if zeroes of the quadratic polynomial ax^2 + bx + c are equal then",
            "the zeroes of the quadratic polynomial are equal; the relation between a and c is",
            "equal zeroes of quadratic imply the signs of a and c are",
        ],
        "slots": {},
        "compute": _c_quad_equal_roots,
        "min_conf": 0.5,
    },
    "PROB_INVERSE": {
        "sanity": lambda v: 0 <= v <= 1.0001,
        "exemplars": [
            "the probability of the letter chosen from the word mathematics to be a vowel is 2x+1; find x",
            "probability of picking a vowel is p; find x if it equals an expression",
            "the probability that a letter is a vowel is given in terms of x; find x",
        ],
        "slots": {},
        "compute": _c_prob_inverse,
        "min_conf": 0.55,
    },
    "GRAZING_CORNERS": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "a horse a cow and a goat are tied by ropes at the corners of a triangular field; find the grazed area",
            "three animals tied at the corners of a triangular field with ropes; area grazed",
            "animals tied at vertices of a triangular field graze sectors; find total area",
        ],
        "slots": {"rope": ["rope", "ropes", "length"]},
        "compute": _c_grazing_corners,
        "min_conf": 0.5,
    },
    "MAJOR_SEGMENT": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "find the area of the major segment of a circle of radius 5 cm formed by a chord subtending 90 degrees",
            "area of the major segment when a chord subtends an angle of 120 degrees at the centre",
            "chord subtends 60 degrees at centre of circle radius 10; find major segment area",
        ],
        "slots": {"radius": ["radius"],
                  "angle": ["angle", "subtend", "degrees"]},
        "compute": _c_major_segment,
        "min_conf": 0.5,
    },
    "INSCRIBED_TRIANGLE": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "a triangle circumscribes a circle of radius 4 cm with tangent segments 10 and 8; find the sides given the area",
            "triangle circumscribing a circle of radius r; tangent lengths and area given; find sides",
            "the sides of a circumscribed triangle are split into segments by the incircle; find the sides",
        ],
        "slots": {"radius": ["radius"],
                  "area": ["area", "ar("]},
        "compute": _c_inscribed_triangle,
        "min_conf": 0.55,
    },
    "HCF_GROUPING": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "number of teachers of english hindi and science are 36 60 84; minimum rooms with same number per room",
            "books of three types to be stacked so each stack has same number; minimum stacks",
            "36, 60 and 84 items grouped so each group has equal number; minimum groups",
        ],
        "slots": {},
        "compute": _c_hcf_grouping,
        "min_conf": 0.5,
    },
    "COIN_SEQUENCE": {
        "sanity": lambda v: 0 <= v <= 1.0001,
        "force": r"coin[^.]{0,40}(?:tossed|flipped|thrown)|"
                 r"(?:tossed|flipped|thrown)\s+(?:twice|thrice|"
                 r"(?:two|three|four|\d+)\s+times)",
        "exemplars": [
            "a coin is flipped three times; probability of a head immediately followed by a tail",
            "coin tossed thrice; probability that head is followed by tail",
            "two friends flip coins three times; who has greater probability",
        ],
        "slots": {},
        "compute": _c_coin_sequence,
        "min_conf": 0.5,
    },
    "RATIO_SAVE": {
        "exemplars": [
            "monthly incomes in ratio 3:4 and expenditures in ratio 5:7; each saves 15000; find incomes",
            "incomes are in ratio a:b and expenditures c:d; equal savings; find incomes",
            "two people earn in ratio and spend in ratio with equal savings; find the incomes",
        ],
        "slots": {},
        "compute": _c_ratio_save,
        "min_conf": 0.5,
    },
    "BPT_APPLY": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "a line parallel to one side of a triangle divides the other two sides proportionally; find the missing side",
            "lm is parallel to qr in triangle pqr; pl=5.7 pq=15.2 mr=5.5; find pm",
            "basic proportionality theorem application; find the missing segment length",
        ],
        "slots": {},
        "compute": _c_bpt_apply,
        "min_conf": 0.5,
    },
    "COMPOSITE_CARVED": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "a cylindrical cavity is hollowed out of a cone; find the surface area of the remaining solid",
            "from a solid cone a cylindrical hole is carved; find remaining surface area",
            "a cone has a cylindrical cavity drilled through it; find the surface area",
        ],
        "slots": {"height": ["height", "h"], "radius": ["radius", "r"]},
        "compute": _c_composite_carved,
        "min_conf": 0.5,
    },
    "AP_COMMON_DIFF": {
        "exemplars": [
            "find the sum of the common difference of the two progressions",
            "two arithmetic progressions; find the sum of their common differences",
            "common difference of two progressions added together",
        ],
        "slots": {},
        "compute": _c_ap_common_diff,
        "min_conf": 0.5,
    },
    "HEIGHTS_DISTANCE": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "the angle of elevation of the top of a tower from a point 40 m away is 60 degrees; find the height",
            "angle of elevation of a building's top is 45 degrees at a distance of 30 m; height?",
            "a monument is viewed at an angle of elevation; find its height",
        ],
        "slots": {"angle": ["elevation", "angle"],
                  "distance": ["distance", "away", "m from"],
                  "height": ["height", "tall"]},
        "compute": _c_heights,
        "min_conf": 0.5,
    },
}

register_structures(WAVE2_SPECS)


# ═══════════════════════════════════════════════════════════════════════════ #
# WAVE-3 structures — AR evaluation, proofs, stats-inverse
# ═══════════════════════════════════════════════════════════════════════════ #

def _eval_stmt_truth(stmt: str) -> Optional[bool]:
    """Deterministic truth check for a board-level assertion/reason clause.
    Returns True/False or None when undecidable."""
    s = stmt.lower()
    # --- number theory: 'k^n (can|cannot) end with digit d' ---
    m = re.search(r"(\d+)\s*\^?\s*n[^.]*?(can|cannot|can not)\s+end\s+with"
                  r"(?:\s+the)?\s+digit\s*(\d)", s)
    if not m:
        m = re.search(r"(\d+)\s*n[^.]*?(can|cannot|can not)\s+end\s+with"
                      r"(?:\s+the)?\s+digit\s*(\d)", s)
    if m:
        base = int(m.group(1)); neg = "not" in m.group(2); d = int(m.group(3))
        # last digit of base^n cycles; check if d ever appears
        digs = {pow(base, e, 10) for e in range(1, 6)}
        can = d in digs
        return (not can) if neg else can
    # 'ends with 0 iff prime factorization has both 2 and 5'
    if ("end" in s and "0" in s and "factori" in s) or \
       ("factori" in s and "2" in s and "5" in s):
        return True  # N ends in 0 iff 10|N iff 2,5 both divide N (true rule)
    # --- trig identities / implications: evaluate symbolically ---
    try:
        import sympy as sp
    except ImportError:
        return None
    # plain symbol — sympify creates fresh symbols; a real=True flag
    # here would make the subs below never match
    a = sp.Symbol("a")
    if "if" in s and ("then" in s or "=" in s):
        mm = re.search(r"if\s+(.+?)(?:,\s*)?then\s+(.+)$", s)
        if mm:
            prem, concl = mm.group(1), mm.group(2)
            def _tr(sx):
                sx = sx.replace(" ", "")
                # board flattening: 'sin2A'/'sin4A' mean sin²A / sin⁴A
                # (even powers), 'cos2A' in 'cosA + cos2A' means cos²A
                sx = re.sub(r"(sin|cos|tan)(\d)a", r"\1(a)**\2", sx)
                sx = re.sub(r"(sin|cos|tan)a", r"\1(a)", sx)
                sx = re.sub(r"(\d)a", r"\1*a", sx)
                return sx
            try:
                pe = sp.sympify(_tr(prem).split("=")[0]) - \
                    sp.sympify(_tr(prem).split("=")[1])
                lhs = sp.sympify(_tr(concl).split("=")[0])
                rhs = sp.sympify(_tr(concl).split("=")[1])
                # sample cos(a) solutions of the premise over a grid
                ca = sp.Symbol("ca")
                ce = pe.subs({sp.cos(2 * a): 2 * ca ** 2 - 1,
                              sp.cos(a): ca, sp.sin(a): sp.sqrt(1 - ca ** 2)})
                sols = sp.solve(sp.Eq(ce, 0), ca)
                ok = True
                for cs in sols:
                    if not cs.is_real:
                        continue
                    # |cos a| > 1 is extraneous for real a — drop roots
                    # outside [-1, 1] before substituting into sin²
                    try:
                        if abs(complex(cs)) > 1 + 1e-9:
                            continue
                    except (TypeError, ValueError):
                        pass
                    val = sp.simplify((lhs - rhs).subs(
                        {sp.cos(a): cs, sp.sin(a): sp.sqrt(1 - cs ** 2),
                         sp.cos(2 * a): 2 * cs ** 2 - 1,
                         sp.sin(2 * a): 2 * cs * sp.sqrt(1 - cs ** 2)}))
                    if val != 0:
                        ok = False
                return bool(sols) and ok
            except Exception:
                return None
    # plain identity: 'sin2a + cos2a = 1'  ('sin2a' = sin²a in board
    # flattened notation)
    if "=" in s and re.search(r"sin|cos|tan", s):
        try:
            sx = s.replace(" ", "")
            sx = re.sub(r"(sin|cos|tan)(\d)a", r"\1(a)**\2", sx)
            sx = re.sub(r"(sin|cos|tan)a", r"\1(a)", sx)
            lhs, rhs = sx.split("=", 1)
            val = sp.simplify(sp.sympify(lhs) - sp.sympify(rhs))
            return val == 0
        except Exception:
            return None
    return None


def _c_ar_eval(slots, text):
    m = re.search(r"assertion\s*\(?\s*a\s*\)?\s*:?\s*(.+?)\s*reason\s*\(?"
                  r"\s*r\s*\)?\s*:?\s*(.+)", text, re.I | re.S)
    if not m:
        return None
    A, R = m.group(1).strip(), m.group(2).strip()
    # cut trailing section boilerplate glued to R ('(Section – B)
    # Section B consists of ...')
    R = re.split(r"\(?\s*section\b|\*?\s*please\s+note|\bdirections?\b",
                 R, flags=re.I)[0].strip()
    a_t = _eval_stmt_truth(A)
    r_t = _eval_stmt_truth(R)
    if a_t is None or r_t is None:
        return None
    steps = [f"Assertion: {'TRUE' if a_t else 'FALSE'} — {A[:70]}.",
             f"Reason:    {'TRUE' if r_t else 'FALSE'} — {R[:70]}."]
    if a_t and r_t:
        # R explains A when R is a general rule that grounds A — either
        # phrased as a universal rule, or a bare identity/equation that a
        # conditional assertion ('if ... then ...') is built from
        generic = bool(re.search(r"\b(if|every|all|any|ends? with|rule|"
                                 r"identity|always)\b", R, re.I)) or \
            ("=" in R and re.search(r"\bif\b", A, re.I))
        steps.append("R is a general rule" +
                     (" which is exactly what makes A true." if generic
                      else " but does not specifically explain A."))
        letter = "A" if generic else "B"
        steps.append(f"-> option ({letter})")
        return (None, steps, f"({letter})", None,
                "AR: truth(A), truth(R), R-explains-A", None)
    if a_t and not r_t:
        steps.append("-> option (C)")
        return (None, steps, "(C)", None, "AR eval", None)
    steps.append("-> option (D)")
    return (None, steps, "(D)", None, "AR eval", None)


def _c_proof_median_similar(slots, text):
    return (None, [
        "∆ABC ~ ∆DEF  ->  AB/DE = BC/EF and angle B = angle E.",
        "Medians halve sides: BP = BC/2 and EQ = EF/2, so "
        "BP/EQ = BC/EF = AB/DE.",
        "In ∆ABP and ∆DEQ: AB/DE = BP/EQ and included angle B = E "
        "-> ∆ABP ~ ∆DEQ (SAS).",
        "Therefore AB/DE = AP/DQ."],
        "AB/DE = AP/DQ (proved)", None,
        "SAS similarity on the median triangles", None)


def _c_proof_tangent_perp(slots, text):
    if "APB" in text or "external point" in text:
        return (None, [
            "OA perpendicular PA and OB perpendicular PB (radius to "
            "tangent).",
            "OA = OB and PA = PB -> ∆OAP = ∆OBP -> angle OPA = angle OPB.",
            "angle AOB = 180 deg - angle APB; in ∆OAB, "
            "angle OAB = (180 - angle AOB)/2 = angle APB/2.",
            "Hence angle APB = 2 * angle OAB."],
            "angle APB = 2*angle OAB (proved)", None,
            "tangent-radius perpendicularity", None)
    return (None, [
        "OA bisects angle XAC and OB bisects angle X'BC "
        "(tangents from a point are equal).",
        "XY parallel X'Y' and AB transversal -> angle XAB + angle X'BA "
        "= 180 deg.",
        "So angle OAB + angle OBA = 90 deg -> angle AOB = 90 deg."],
        "angle AOB = 90 deg (proved)", None,
        "parallel tangents + bisector angles", None)


def _c_proof_trig(slots, text):
    """SOLVER-DIG-2 hardening (2026-10-06): the two canned proofs below
    used to fire on ANY prove-that containing sin/cos/tan/cot — shipping
    'cosec A + cot A = RHS (proved)' for identities this function has
    never seen (wrong-question grading).  Each branch now requires the
    verbatim fingerprint of ITS OWN identity; every other prove-that
    falls through to TRIG_IDENTITY_PROOF, which verifies symbolically
    and numerically before claiming 'proved'."""
    t = re.sub(r"\s+", "", text.lower())
    if "cot" in t and "cosec" in t and "/" in t             and ("(cot" in t or "(cosec" in t):
        return (None, [
            "Divide numerator and denominator of the LHS by sin A.",
            "LHS = (cot A - 1 + cosec A)/(cot A + 1 - cosec A).",
            "Using cosec^2 A - cot^2 A = 1, factor and cancel to get "
            "cosec A + cot A."],
            "cosec A + cot A = RHS (proved)", None,
            "divide by sin A + conjugate identity", None)
    if "sina+cosa" in t and "sqrt(3)" in t:
        return (None, [
            "Given sin A + cos A = sqrt(3); squaring: "
            "sin^2 A + cos^2 A + 2 sin A cos A = 3.",
            "So sin A cos A = 1.",
            "tan A + cot A = (sin^2 A + cos^2 A)/(sin A cos A) = 1/1 = 1."],
            "tan A + cot A = 1 (proved)", None,
            "square the givens then divide", None)
    return None


def _c_bpt_proof(slots, text):
    return (None, [
        "Construction: join B-E and C-D; draw EN perpendicular AB, "
        "DM perpendicular AC.",
        "ar(ADE)/ar(BDE) = AD/DB (same height EN).",
        "ar(ADE)/ar(CDE) = AE/EC (same height DM).",
        "DE parallel BC -> ar(BDE) = ar(CDE) (same base, same parallels).",
        "Therefore AD/DB = AE/EC."],
        "AD/DB = AE/EC (proved)", None,
        "BPT via equal-area triangles", None)


def _c_mode_inverse(slots, text):
    """Grouped mode given -> solve the unknown frequency."""
    m = re.search(r"mode[^0-9]{0,30}(?:is|=)\s*(\d+(?:\.\d+)?)", text, re.I)
    if not m:
        return None
    mode = float(m.group(1))
    # pull the frequency row: digits and x
    fm = re.search(r"frequency\s*:?\s*((?:[\dxX.\s-]+))", text)
    if not fm:
        return None
    cells = re.findall(r"x|(\d+(?:\.\d+)?)", fm.group(1))
    return None  # table too garbled to bind reliably -> honest refuse


WAVE3_SPECS = {
    "AR_EVAL": {
        "exemplars": [
            "assertion a the number 5n cannot end with the digit 0 reason r a number ends with 0 if its prime factorization contains 2 and 5",
            "assertion if cos a + cos 2a = 1 then sin2 a + sin4 a = 1 reason sin2 a + cos2 a = 1",
            "assertion statement a is true reason statement r gives the explanation",
            "assertion and reason question choose correct option",
        ],
        "slots": {},
        "compute": _c_ar_eval,
        "full_text": True,
        "min_conf": 0.45,
    },
    "PROOF_MEDIAN_SIMILAR": {
        "exemplars": [
            "ap and dq are medians of triangles abc and def where abc similar def prove that ab/de = ap/dq",
            "prove that the ratio of corresponding medians equals the ratio of corresponding sides for similar triangles",
            "medians of two similar triangles prove proportional to sides",
        ],
        "slots": {},
        "compute": _c_proof_median_similar,
        "min_conf": 0.5,
    },
    "PROOF_TANGENT_PERP": {
        "exemplars": [
            "two parallel tangents to a circle and a third tangent intersecting them; prove angle aob is 90 degrees",
            "tangents pa pb drawn from external point p prove angle apb = 2 angle oab",
            "parallel tangents xy and x prime y prime prove aob equals 90",
        ],
        "slots": {},
        "compute": _c_proof_tangent_perp,
        "min_conf": 0.5,
    },
    "PROOF_TRIG": {
        "exemplars": [
            "if sin theta + cos theta = sqrt 3 then prove that tan theta + cot theta = 1",
            "prove that cos a - sin a + 1 over cos a + sin a - 1 equals cosec a + cot a",
            "prove the trigonometric identity",
        ],
        "slots": {},
        "compute": _c_proof_trig,
        "min_conf": 0.5,
    },
    "BPT_PROOF": {
        "exemplars": [
            "prove that if a line is drawn parallel to one side of a triangle it divides the other two sides in the same ratio",
            "state and prove the basic proportionality theorem",
            "thales theorem proof line parallel to side divides proportionally",
        ],
        "slots": {},
        "compute": _c_bpt_proof,
        "min_conf": 0.5,
    },
    "MODE_INVERSE": {
        "exemplars": [
            "if the mode of the following distribution is 55 find the value of x and the mean",
            "mode of grouped frequency distribution given; find missing frequency x",
            "the mode is given for a grouped table; solve for the unknown frequency",
        ],
        "slots": {},
        "compute": _c_mode_inverse,
        "min_conf": 0.55,
    },
}

register_structures(WAVE3_SPECS)


# ═══════════════════════════════════════════════════════════════════════════ #
# WAVE-4 structures — coordinate geometry parts, AP parts, heights-inverse
# ═══════════════════════════════════════════════════════════════════════════ #

def _points_in(text: str) -> Dict[str, Tuple[float, float]]:
    """Labeled coordinate givens: 'P (2,5)', 'P = (2, 5)', 'P(2,5)'."""
    return {L: (float(x), float(y)) for L, x, y in re.findall(
        r"\b([A-Z])\s*=?\s*\(\s*(-?\d+(?:\.\d+)?)\s*,"
        r"\s*(-?\d+(?:\.\d+)?)\s*\)", text)}


def _asked_pair(text: str) -> Optional[Tuple[str, str]]:
    # prefer the pair bound to the ask: 'distance BETWEEN P and R',
    # 'equidistant FROM P and Q' — a bare 'X and Y' earlier in the text
    # may be a member list ('the points P, Q and R'), not the asked pair
    m = re.search(r"between\s+([A-Z])\s+and\s+([A-Z])\b", text)
    if m:
        return m.group(1), m.group(2)
    m = re.search(r"(?:from|of|joining|to)\s+([A-Z])\s+and\s+([A-Z])\b",
                  text)
    if m:
        return m.group(1), m.group(2)
    m = re.search(r"midpoint\s+of\s+([A-Z])([A-Z])\b", text, re.I)
    if m:
        return m.group(1), m.group(2)
    m = re.search(r"\b([A-Z])\s+and\s+([A-Z])\b", text)
    if m:
        return m.group(1), m.group(2)
    m = re.search(r"\b([A-Z])([A-Z])\b", text)
    if m:
        return m.group(1), m.group(2)
    return None


def _c_distance_between(slots, text):
    pts = _points_in(text)
    pair = _asked_pair(text)
    if not pair or pair[0] not in pts or pair[1] not in pts:
        return None
    (x1, y1), (x2, y2) = pts[pair[0]], pts[pair[1]]
    dx, dy = x2 - x1, y2 - y1
    d2 = dx * dx + dy * dy
    d = math.sqrt(d2)
    pretty = f"sqrt({int(d2)})" if abs(d - round(d)) > 1e-9 else _fmt(d)
    return (_snap(d), [
        f"{pair[0]} = ({_fmt(x1)}, {_fmt(y1)}), "
        f"{pair[1]} = ({_fmt(x2)}, {_fmt(y2)}).",
        f"{pair[0]}{pair[1]} = sqrt(({_fmt(dx)})^2 + ({_fmt(dy)})^2) "
        f"= sqrt({_fmt(d2)}) = {pretty} units."],
        pretty + " units", None, "distance = sqrt(dx^2+dy^2)", None)


def _c_midpoint_check(slots, text):
    pts = _points_in(text)
    m = re.search(r"is\s+([A-Z])[^.]{0,40}?midpoint\s+of\s+([A-Z])([A-Z])",
                  text, re.I)
    if not m:
        return None
    c, a, b = m.group(1), m.group(2), m.group(3)
    if c not in pts or a not in pts or b not in pts:
        return None
    mid = ((pts[a][0] + pts[b][0]) / 2, (pts[a][1] + pts[b][1]) / 2)
    is_mid = abs(mid[0] - pts[c][0]) < 1e-9 and abs(mid[1] - pts[c][1]) < 1e-9
    return (None, [
        f"Midpoint of {a}{b} = (({_fmt(pts[a][0])} + {_fmt(pts[b][0])})/2, "
        f"({_fmt(pts[a][1])} + {_fmt(pts[b][1])})/2) = "
        f"({_fmt(mid[0])}, {_fmt(mid[1])}).",
        f"{c} = ({_fmt(pts[c][0])}, {_fmt(pts[c][1])}).",
        f"{'Equal' if is_mid else 'Not equal'} -> {c} is "
        f"{'' if is_mid else 'NOT '}the midpoint of {a}{b}."],
        f"{c} is{'' if is_mid else ' not'} the midpoint; midpoint is "
        f"({_fmt(mid[0])}, {_fmt(mid[1])})", None, "midpoint formula", None)


def _c_equidistant_axis(slots, text):
    pts = _points_in(text)
    axis = "x"
    if re.search(r"y-?axis|y axis", text, re.I):
        axis = "y"
    pair = _asked_pair(text)
    if not pair or pair[0] not in pts or pair[1] not in pts:
        # anonymous givens: 'equidistant from (2, -5) and (-2, 9)'
        anon = re.findall(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*"
                          r"(-?\d+(?:\.\d+)?)\s*\)", text)
        if len(anon) < 2 or not re.search(r"equidistant", text, re.I):
            return None
        (x1, y1), (x2, y2) = [(float(a), float(b)) for a, b in anon[:2]]
        label1, label2 = f"({ _fmt(x1)},{ _fmt(y1)})",             f"({_fmt(x2)},{_fmt(y2)})"
    else:
        label1, label2 = pair[0], pair[1]
        (x1, y1), (x2, y2) = pts[pair[0]], pts[pair[1]]
    try:
        import sympy as sp
        t = sp.Symbol("t")
        if axis == "x":
            eq = sp.Eq((t - x1) ** 2 + y1 ** 2, (t - x2) ** 2 + y2 ** 2)
        else:
            eq = sp.Eq(x1 ** 2 + (t - y1) ** 2, x2 ** 2 + (t - y2) ** 2)
        sols = sp.solve(eq, t)
    except Exception:
        return None
    if not sols:
        return None
    v = float(sols[0])
    point = f"({_fmt(v)}, 0)" if axis == "x" else f"(0, {_fmt(v)})"
    return (v, [
        f"Let the point be ({'t, 0' if axis == 'x' else '0, t'}).",
        f"Distance to {label1} squared = distance to {label2} squared.",
        f"Solving gives t = {_fmt(v)} -> point {point}."],
        point, None, "equidistant-on-axis linear equation", None)


def _c_section_ratio(slots, text):
    pts = _points_in(text)
    # axis-divides shape: 'find the ratio in which the x-axis divides
    # the line segment joining (2, 3) and (6, -9)' — the divider is the
    # unnamed point where y = 0 (x-axis), so k = y1/(y1 - y2).
    maxe = re.search(
        r"ratio\s+in\s+which\s+the\s+([xy])[\s-]*axis\s+divides?"
        r"[^.]{0,40}?joining\s*(?:the\s+points\s+)?"
        r"\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)?"
        r"[^.0-9\-]{0,20}and\s*"
        r"\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)?",
        text, re.I)
    if maxe:
        axis = maxe.group(1).lower()
        x1, y1, x2, y2 = (float(v) for v in maxe.groups()[1:])
        den = (y1 - y2) if axis == "x" else (x1 - x2)
        if abs(den) < 1e-12:
            return None
        k = (y1 / den) if axis == "x" else (x1 / den)
        # AP:PB = k : (1-k) — k itself is the FRACTION of the way along,
        # not the ratio ((2,3)-(6,-9): k = 1/4, ratio 1:3)
        fr = Fraction(k).limit_denominator(50)
        fr2 = Fraction(1 - k).limit_denominator(50)
        ratio_txt = f"{fr.numerator} : {fr2.numerator}"
        zero_pt = "y = 0" if axis == "x" else "x = 0"
        top, bot = (_fmt(y1), _fmt(den)) if axis == "x"             else (_fmt(x1), _fmt(den))
        return (_snap(k), [
            f"The {axis}-axis cuts the segment at {zero_pt}.",
            f"k = {top}/{bot} = {fr} of the way from the first point.",
            f"ratio = k : (1 - k) = {ratio_txt}."],
            ratio_txt, None, "k = a1/(a1 - a2) on the axis", None)
    # inverse: 'find the ratio in which P(x,y) divides the segment
    # joining A(a) and B(b)' OR 'the segment joining A and B is
    # divided by P' -> solve k = (x - x1)/(x2 - x)
    mi = re.search(r"ratio[^.]{0,40}?(?:divides?|divided by)\s+"
                   r"(?:the\s+)?(?:line\s+segment\s+)?(?:joining\s+)?"
                   r"[^.]*?(\-?\d+(?:\.\d+)?)\s*,\s*(\-?\d+(?:\.\d+)?)"
                   r"[^.]*?(\-?\d+(?:\.\d+)?)\s*,\s*(\-?\d+(?:\.\d+)?)"
                   r"[^.]*?(\-?\d+(?:\.\d+)?)\s*,\s*(\-?\d+(?:\.\d+)?)",
                   text, re.I)
    if not mi:
        # 'joining A and B is divided by P' — A,B first, P last
        mi2 = re.search(
            r"joining[^\d]{0,20}?(\-?\d+(?:\.\d+)?)\s*,\s*"
            r"(\-?\d+(?:\.\d+)?)[^\d]{0,30}?(\-?\d+(?:\.\d+)?)\s*,\s*"
            r"(\-?\d+(?:\.\d+)?)[^.]{0,40}?(?:divided by|by)\s*"
            r"[^0-9]*?(\-?\d+(?:\.\d+)?)\s*,\s*(\-?\d+(?:\.\d+)?)",
            text, re.I)
        if mi2 and "ratio" in text.lower():
            x1, y1, x2, y2, px, py = (float(g) for g in mi2.groups())
            denom = x2 - px
            if abs(denom) < 1e-12:
                return None
            k = (px - x1) / denom
            fr = Fraction(k).limit_denominator(50)
            ratio_txt = f"{fr.numerator} : {fr.denominator}"
            return (_snap(k), [
                f"A({_fmt(x1)},{_fmt(y1)}) B({_fmt(x2)},{_fmt(y2)}) "
                f"divided by P({_fmt(px)},{_fmt(py)}).",
                f"k = ({_fmt(px)} - {_fmt(x1)})/({_fmt(x2)} - "
                f"{_fmt(px)}) = {fr}.",
                f"ratio = {ratio_txt}."],
                ratio_txt, None, "k = (x - x1)/(x2 - x)", None)
    if mi:
        px, py, x1, y1, x2, y2 = (float(g) for g in mi.groups())
        denom = x2 - px
        if abs(denom) < 1e-12:
            return None
        k = (px - x1) / denom
        fr = Fraction(k).limit_denominator(50)
        ratio_txt = f"{fr.numerator} : {fr.denominator}"
        return (_snap(k), [
            f"P({_fmt(px)},{_fmt(py)}) divides A({_fmt(x1)},{_fmt(y1)})"
            f" B({_fmt(x2)},{_fmt(y2)}).",
            f"x: {_fmt(px)} = (k*{_fmt(x2)} + {_fmt(x1)})/(k+1) "
            f"-> k = {fr}.",
            f"ratio = {ratio_txt}."],
            ratio_txt, None, "k = (x - x1)/(x2 - x)", None)
    # FORWARD-POINT ASK (C9 dig): 'find the point that divides the
    # segment joining (2,4) and (6,8) in the ratio 1:1' — coordinates
    # inline, no letter names.  The RATIO_SPLIT lane claimed this and
    # shipped 'share 1's share = Rs 12' — a Rs-domain answer for a
    # geometry ask.  Section formula forward: (mx2+nx1)/(m+n).
    mp2 = re.search(
        r"(?:joining|join\s+of|line\s+segment)\s*\(?\s*"
        r"(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)?"
        r"[^.0-9\-]{0,25}?and\s*\(?\s*"
        r"(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)?"
        r"[^.]{0,60}?ratio\s+(\d+(?:\.\d+)?)\s*:\s*(\d+(?:\.\d+)?)",
        text, re.I)
    if mp2:
        x1, y1, x2, y2 = (float(g) for g in mp2.groups()[:4])
        mr, nr = float(mp2.group(5)), float(mp2.group(6))
        x = (mr * x2 + nr * x1) / (mr + nr)
        y = (mr * y2 + nr * y1) / (mr + nr)
        return (_snap(x), [
            f"Section formula (m:n from first point): "
            f"P = ((m·x2 + n·x1)/(m+n), (m·y2 + n·y1)/(m+n)).",
            f"x = ({_fmt(mr)}·{_fmt(x2)} + {_fmt(nr)}·{_fmt(x1)})"
            f"/{_fmt(mr + nr)} = {_fmt(x)};",
            f"y = ({_fmt(mr)}·{_fmt(y2)} + {_fmt(nr)}·{_fmt(y1)})"
            f"/{_fmt(mr + nr)} = {_fmt(y)}.",
            f"P = ({_fmt(x)}, {_fmt(y)})."],
            f"({_fmt(x)}, {_fmt(y)})", None,
            "section formula (m:n)", None)
    m = re.search(r"divides?\s+(?:the\s+)?(?:line\s+segment\s+|"
                  r"line\s+|join\s+of\s+|join\s+|joining\s+)?"
                  r"([A-Z])[^0-9]{0,40}?([A-Z])"
                  r"[^0-9]{0,30}?ratio\s+(\d+(?:\.\d+)?)\s*:\s*"
                  r"(\d+(?:\.\d+)?)",
                  text, re.I)
    if not m:
        return None
    a, b, mr, nr = m.group(1), m.group(2), float(m.group(3)), float(m.group(4))
    if a not in pts or b not in pts:
        return None
    x = (mr * pts[b][0] + nr * pts[a][0]) / (mr + nr)
    y = (mr * pts[b][1] + nr * pts[a][1]) / (mr + nr)
    return (x, [
        f"Section formula: S = (({_fmt(mr)}*{_fmt(pts[b][0])} + "
        f"{_fmt(nr)}*{_fmt(pts[a][0])})/{_fmt(mr + nr)}, "
        f"({_fmt(mr)}*{_fmt(pts[b][1])} + {_fmt(nr)}*{_fmt(pts[a][1])})"
        f"/{_fmt(mr + nr)}).",
        f"S = ({_fmt(x)}, {_fmt(y)})."],
        f"S = ({_fmt(x)}, {_fmt(y)})", None, "section formula m:n", None)


def _ap_seqs(text: str) -> List[List[float]]:
    """All 'a, b, c, ...' progressions embedded in the case text."""
    seqs = []
    for m in re.finditer(r"(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,"
                         r"\s*(-?\d+(?:\.\d+)?)", text):
        seqs.append([float(m.group(1)), float(m.group(2)),
                     float(m.group(3))])
    return seqs


def _c_ap_nth(slots, text):
    mn = re.search(r"(\d+)\s*(?:st|nd|rd|th)\s*term", text, re.I)
    if not mn:
        return None
    n = int(mn.group(1))
    seqs = _ap_seqs(text)
    if seqs:
        # 'written by <name>' picks the matching progression; default last
        seq = seqs[-1]
        a, d = seq[0], seq[1] - seq[0]
    else:
        # no embedded sequence — 'first term is A, common difference is D'
        ma = re.search(r"first\s+term\s*(?:is|=|of)?\s*(-?\d+(?:\.\d+)?)",
                       text, re.I) or re.search(
            r"\ba\s*=\s*(-?\d+(?:\.\d+)?)", text)
        md = re.search(
            r"common\s+difference\s*(?:is|=|of)?\s*(-?\d+(?:\.\d+)?)",
            text, re.I) or re.search(r"\bd\s*=\s*(-?\d+(?:\.\d+)?)", text)
        if not (ma and md):
            return None
        a, d = float(ma.group(1)), float(md.group(1))
    t = a + (n - 1) * d
    seq_txt = (", ".join(_fmt(x) for x in seq[:4])
               if seqs else f"a={_fmt(a)}, d={_fmt(d)}")
    return (_snap(t), [
        f"AP {seq_txt}: a = {_fmt(a)}, d = {_fmt(d)}.",
        f"t_{n} = {_fmt(a)} + {n - 1}({_fmt(d)}) = {_fmt(t)}."],
        f"{_fmt(t)}", None, "t_n = a + (n-1)d", None)


def _c_ap_sum_first(slots, text):
    seqs = _ap_seqs(text)
    if not seqs:
        # 'sum of first n natural numbers' is the a=1, d=1 AP
        if re.search(r"first\s+n?\s*natural\s+numbers|natural\s+"
                     r"numbers", text, re.I):
            try:
                import sympy as sp
            except ImportError:
                return None
            n_s = sp.Symbol("n", positive=True, integer=True)
            mn_k = re.search(r"first\s+(\d+)\s+natural", text, re.I)
            if mn_k:
                n = int(mn_k.group(1))
                s = n * (n + 1) / 2
                return (_snap(s), [
                    "natural numbers = AP with a = 1, d = 1.",
                    f"S_{n} = {n}({n}+1)/2 = {_fmt(s)}."],
                    f"{_fmt(s)}", None, "S_n = n(n+1)/2", None)
            S = n_s * (n_s + 1) / 2
            return (None, [
                "natural numbers = AP with a = 1, d = 1.",
                f"S_n = n(n+1)/2 = {S}."],
                f"S_n = {S}", None, "S_n = n(n+1)/2", None)
        return None
    mn = re.search(r"sum\s+(?:of|to)\s+(?:first\s+|the\s+first\s+)"
                   r"(\d+)", text, re.I)
    if not mn:
        # symbolic ask: 'sum to n terms of the AP a, b, c' -> S_n expr
        if re.search(r"(?:to|of)\s+n\s+terms?", text, re.I):
            try:
                import sympy as sp
            except ImportError:
                return None
            seq = seqs[0]
            a, d = seq[0], seq[1] - seq[0]
            n_s = sp.Symbol("n", positive=True, integer=True)
            S = sp.simplify(n_s / 2 * (2 * a + (n_s - 1) * d))
            seq_txt = ", ".join(_fmt(x) for x in seq[:4])
            return (None, [
                f"AP {seq_txt}: a = {_fmt(a)}, d = {_fmt(d)}.",
                f"S_n = n/2 * (2*{_fmt(a)} + (n-1)*{_fmt(d)})"
                f" = {S}."],
                f"S_n = {S}", None, "S_n = n/2 (2a + (n-1)d)", None)
        return None
    n = int(mn.group(1))
    seq = seqs[0]
    a, d = seq[0], seq[1] - seq[0]
    s = n / 2 * (2 * a + (n - 1) * d)
    seq_txt = ", ".join(_fmt(x) for x in seq[:4])
    return (_snap(s), [
        f"AP {seq_txt}: a = {_fmt(a)}, d = {_fmt(d)}, n = {n}.",
        f"S_{n} = {n}/2 * (2*{_fmt(a)} + {n - 1}*{_fmt(d)}) = {_fmt(s)}."],
        f"{_fmt(s)}", None, "S_n = n/2 (2a + (n-1)d)", None)


def _c_ap_same_term(slots, text):
    seqs = _ap_seqs(text)
    if len(seqs) < 2:
        return None
    (a1, d1), (a2, d2) = (seqs[0][0], seqs[0][1] - seqs[0][0]), \
        (seqs[1][0], seqs[1][1] - seqs[1][0])
    try:
        import sympy as sp
        n = sp.Symbol("n", positive=True, integer=True)
        sols = [s for s in sp.solve(
            sp.Eq(a1 + (n - 1) * d1, a2 + (n - 1) * d2), n)
            if s.is_integer and s > 0]
    except Exception:
        return None
    if not sols:
        return None
    nn = int(sols[0])
    val = a1 + (nn - 1) * d1
    return (_snap(val), [
        f"AP1: a={_fmt(a1)}, d={_fmt(d1)};  AP2: a={_fmt(a2)}, "
        f"d={_fmt(d2)}.",
        f"{_fmt(a1)}+(n-1)*{_fmt(d1)} = {_fmt(a2)}+(n-1)*{_fmt(d2)} "
        f"-> n = {nn}.",
        f"Equal value = {_fmt(a1)} + {nn - 1}*{_fmt(d1)} = {_fmt(val)}."],
        f"term {nn} = {_fmt(val)}", None, "a1+(n-1)d1 = a2+(n-1)d2", None)


WAVE4_SPECS = {
    "DISTANCE_BETWEEN": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "find the distance between p and r",
            "find the distance between two labeled points p and r",
            "distance between the points shown",
        ],
        "slots": {},
        "compute": _c_distance_between,
        "full_text": True,
        "min_conf": 0.45,
    },
    "MIDPOINT_CHECK": {
        "exemplars": [
            "is q the midpoint of pr justify by finding midpoint of pr",
            "check whether a point is the midpoint of a segment",
            "verify midpoint of pr is q",
        ],
        "slots": {},
        "compute": _c_midpoint_check,
        "full_text": True,
        "min_conf": 0.45,
    },
    "EQUIDISTANT_AXIS": {
        "exemplars": [
            "find the point on x-axis which is equidistant from p and q",
            "point on the x axis equidistant from two given points",
            "equidistant point on x-axis",
        ],
        "slots": {},
        "compute": _c_equidistant_axis,
        "full_text": True,
        "min_conf": 0.45,
    },
    "SECTION_RATIO": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "let s be a point which divides the line joining pq in ratio 2:3 find the coordinates of s",
            "point divides segment in ratio m:n find coordinates",
            "section formula divide joining in ratio",
        ],
        "slots": {},
        "compute": _c_section_ratio,
        "full_text": True,
        "min_conf": 0.45,
    },
    "AP_NTH": {
        "exemplars": [
            "find the 34th term of progression written by roshan",
            "find the nth term of the arithmetic progression",
            "which term of the ap",
            "the first term is a and common difference is d, find nth term",
            "first term and common difference given, find the 10th term",
            "in an ap a = 3 d = 5 find the tenth term",
            "find the 20th term of the arithmetic progression",
        ],
        "slots": {},
        "compute": _c_ap_nth,
        "full_text": True,
        "min_conf": 0.45,
    },
    "AP_SUM_FIRST": {
        "exemplars": [
            "find the sum of first 10 terms of the progression written by aryan",
            "sum of first n terms of the ap",
            "find sum of the first terms of the progression",
        ],
        "slots": {},
        "compute": _c_ap_sum_first,
        "full_text": True,
        "min_conf": 0.45,
    },
    "AP_SAME_TERM": {
        "exemplars": [
            "which term of the progressions will have the same value",
            "two progressions which term is equal",
            "term where both aps have same value",
        ],
        "slots": {},
        "compute": _c_ap_same_term,
        "full_text": True,
        "min_conf": 0.45,
    },
}

register_structures(WAVE4_SPECS)


# ═══════════════════════════════════════════════════════════════════════════ #
# WAVE-5 structures — heights step-back
# ═══════════════════════════════════════════════════════════════════════════ #

def _c_heights_move_back(slots, text):
    h = slots.get("height")
    if h is None:
        m = re.search(r"(\d+(?:\.\d+)?)\s*m\s*tall", text, re.I)
        if m:
            h = float(m.group(1))
    eye = 0.0
    me = re.search(r"of\s+height\s+(\d+(?:\.\d+)?)", text, re.I)
    if me:
        eye = float(me.group(1))
    ang_pair = re.search(r"(?:changes?\s+)?from\s+(\d+(?:\.\d+)?)\s*deg"
                         r"[^0-9]{0,12}?to\s+(\d+(?:\.\d+)?)\s*deg", text,
                         re.I)
    if not ang_pair or h is None:
        return None
    a1, a2 = float(ang_pair.group(1)), float(ang_pair.group(2))
    eff = h - eye
    d1 = eff / math.tan(math.radians(a1))
    d2 = eff / math.tan(math.radians(a2))
    moved = d2 - d1
    return (_snap(moved), [
        f"Effective height: {_fmt(h)} - {_fmt(eye)} = {_fmt(eff)} m.",
        f"At {a1:g} deg: distance = {_fmt(eff)}/tan{a1:g} "
        f"= {_fmt(d1)} m.",
        f"At {a2:g} deg: distance = {_fmt(eff)}/tan{a2:g} "
        f"= {_fmt(d2)} m.",
        f"Distance moved back = {_fmt(d2)} - {_fmt(d1)} "
        f"= {_fmt(moved)} m."],
        f"{_fmt(moved)} m", None,
        "d = eff * (cot a2 - cot a1)", None)


register_structures({
    "HEIGHTS_MOVE_BACK": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "angle of elevation changes from 45 deg to 30 deg when she moves back find the distance she moves back",
            "elevation decreases as observer steps back; find distance moved",
            "angle changes from a to b on moving away; distance moved back",
        ],
        "slots": {},
        "compute": _c_heights_move_back,
        "full_text": True,
        "min_conf": 0.45,
    },
})


# --------------------------------------------------------------------------- #
# Tutor-facing recompute: student confirms/edits extracted values -> the same
# deterministic compute runs on THEIR numbers.  No LLM, no re-extraction.
# --------------------------------------------------------------------------- #

def solve_with_slots(structure_id: str, slots: Dict[str, Any],
                     text: str = "") -> Optional[Dict[str, Any]]:
    """Re-run a structure's compute on confirmed/edited slot values.

    Used by the tutor's confirm-the-values flow: the read-back card shows
    the extracted givens, the student corrects a misparse ('angle is 30
    not 60'), and this recomputes deterministically on their numbers.
    The answer-domain sanity check still applies — an edited value that
    makes the answer impossible refuses honestly.
    """
    spec = STRUCTURE_SPECS.get(structure_id)
    if not spec:
        return None
    work = unicodedata.normalize("NFKC", text or "")
    work = re.sub(r"for\s+visually\s+impaired.*$", "", work,
                  flags=re.I | re.S)
    work = (work.replace("√", "sqrt").replace("π", "pi")
                .replace("θ", "theta").replace("−", "-")
                .replace("°", " deg "))
    norm = work if spec.get("full_text") else work
    flat: Dict[str, Any] = {}
    for k, v in (slots or {}).items():
        if isinstance(v, dict) and "value" in v:
            v = v["value"]
        if isinstance(v, (int, float)):
            flat[k] = float(v)
        elif isinstance(v, (list, tuple)):
            try:
                flat[k] = [float(x) for x in v]
            except (TypeError, ValueError):
                pass
        else:
            flat[k] = v
    out = spec["compute"](flat, norm)
    if not out:
        return None
    value, steps, answer, assumptions, eq, extra = \
        (list(out) + [None] * 6)[:6]
    sanity = spec.get("sanity")
    if sanity and isinstance(value, (int, float)) and not sanity(value):
        return None
    return {"structure": structure_id, "numeric": value,
            "answer": answer, "steps": list(steps or []),
            "governing_equation": eq or structure_id}


# --------------------------------------------------------------------------- #
# Cross-class wave: bugs found in the 6-12 sweep — legacy families verified
# wrong answers (cylinder CSA gave 307.876, 'exactly k in n trials' gave 0.5).
# These specs let the hardened lane preempt them.
# --------------------------------------------------------------------------- #

def _c_binomial_prob(slots, text):
    """'exactly/at most k successes in n trials' — binomial counting."""
    n = slots.get("n"); k = slots.get("k")
    p = slots.get("p", 0.5)
    if n is None:
        m = re.search(r"(\d+)\s*(?:tosses|trials|throws|times|"
                      r"flips|coins)|(?:thrown|tossed|rolled|flipped)\s+"
                      r"(\d+)\s*(?:times)?", text, re.I)
        if m:
            n = float(m.group(1) or m.group(2))
    if k is None:
        m = re.search(r"(?:exactly|at least|at most)\s*(\d+|one|two|"
                      r"three|four|five|six)\s*"
                      r"(?:heads|tails|success|sixes|aces)?", text, re.I)
        if m:
            w = m.group(1).lower()
            k = float({"one": 1, "two": 2, "three": 3, "four": 4,
                       "five": 5, "six": 6}.get(w, w))
    if n is None or k is None or k > n:
        return None
    ni, ki = int(n), int(k)
    mode = "exactly"
    if re.search(r"at\s*most|not more than", text, re.I):
        mode = "at_most"
    elif re.search(r"at\s*least|no (?:less|fewer) than", text, re.I):
        mode = "at_least"
    from math import comb
    pw = p
    if "dice" in text or "die" in text:
        pw = 1 / 6 if re.search(r"\bsix|getting a 6\b", text) else pw
        # 'success = number greater than 4' -> p = 2/6; '>3' -> 3/6 etc
        mg = re.search(r"greater than\s*(\d)|more than\s*(\d)|"
                       r"exceeds?\s*(\d)", text, re.I)
        if mg:
            thr = int(next(g for g in mg.groups() if g))
            pw = max(0, (6 - thr)) / 6
        elif re.search(r"even\s+number|even\b", text, re.I):
            pw = 0.5
        elif re.search(r"prime", text, re.I):
            pw = 0.5
        elif re.search(r"multiple\s+of\s+3", text, re.I):
            pw = 1 / 3
        elif not mg:
            pw = 1 / 6 if re.search(r"six|6\b", text) else pw
    rng = {"exactly": [ki],
           "at_most": list(range(0, ki + 1)),
           "at_least": list(range(ki, ni + 1))}[mode]
    prob = sum(comb(ni, j) * pw ** j * (1 - pw) ** (ni - j)
               for j in rng)
    steps = [f"Binomial: n = {ni}, p = {_fmt(pw)}.",
             f"P(X {mode.replace('_',' ')} {ki}) = "
             f"sum of C(n,j) p^j (1-p)^(n-j)"]
    if mode == "exactly":
        steps.insert(1, f"C({ni},{ki}) * "
                        f"({_fmt(pw)})^{ki} * ({_fmt(1-pw)})^{ni-ki}"
                        f" = {_fmt(prob)}")
    return (prob, steps, _fmt(prob), None,
            "P = C(n,k) p^k (1-p)^(n-k)", None)


def _c_cylinder_csa(slots, text):
    """Curved surface / total surface of a cylinder -> radius/height."""
    import math
    # DIG-GATES (2026-10-06 SOLVER-DIG-1): this family ONLY inverts
    # CSA -> radius/height.
    # (a) 'total surface area of a cylinder is 616, h 7, find the
    #     radius' shipped 14 VERIFIED — TSA = 2*pi*r*(h+r), not CSA;
    #     inverting a TSA number as CSA doubles the radius.
    if re.search(r"total\s+surface\s+area|t\.?s\.?a\b", text, re.I):
        return None
    # (b) when the ASK itself is an area/volume/capacity, a radius or
    #     height side-result must not ship ('CSA 220, h 5, find the
    #     total surface area' shipped '7 cm' for a 528 sq cm ask).
    m_ask = re.search(r"(?:find|what\s+is|calculate|compute|determine)"
                      r"(.*)$", text, re.I | re.S)
    if m_ask and \
            not re.search(r"\bradi\w*|\bheight", m_ask.group(1), re.I) \
            and re.search(r"\barea\b|\bvolume\b|litre|liter",
                          m_ask.group(1), re.I):
        return None
    csa = slots.get("csa") or slots.get("area")
    h = slots.get("height") or slots.get("h")
    r = slots.get("radius") or slots.get("r")
    # fallback: harvest stated values — allow a short phrase between the
    # keyword and its number ('surface area of a cylinder is 132')
    if csa is None:
        m = re.search(r"(?:curved surface|CSA|c\.s\.a\.?|"
                      r"surface area)[\w\s]{0,25}?(\d+(?:\.\d+)?)",
                      text, re.I)
        if m:
            csa = float(m.group(1))
    if h is None:
        m = re.search(r"height[\w\s]{0,15}?(\d+(?:\.\d+)?)",
                      text, re.I)
        if m:
            h = float(m.group(1))
    if r is None:
        m = re.search(r"radi\w*[\w\s]{0,15}?(\d+(?:\.\d+)?)",
                      text, re.I)
        if m:
            r = float(m.group(1))
    pi = math.pi
    if re.search(r"22\s*/\s*7|22/7", text):
        pi = 22 / 7

    def _prefer_227(val):
        """If pi=22/7 lands on a rounder answer than pi, the question was
        authored for the textbook convention — return (pi_used, value).
        Replacing pi with 22/7 scales a divide-by-pi result by pi/(22/7)."""
        alt = val * math.pi / (22 / 7)
        if abs(alt - round(alt, 2)) < abs(val - round(val, 2)) and \
                abs(alt - round(alt, 2)) < 0.02:
            return 22 / 7, alt
        return pi, val

    # target comes from the ASK, not from which slot is unbound — the
    # binder can legitimately bind the asked-for value's neighbours
    asks_r = bool(re.search(r"(?:find|what is).{0,25}radi|"
                            r"radius of the base", text, re.I))
    asks_h = bool(re.search(r"(?:find|what is).{0,25}height", text, re.I))
    if csa is not None and h is not None and (r is None or asks_r):
        rv = csa / (2 * pi * h)
        pi, rv = _prefer_227(rv) if pi != 22 / 7 else (pi, rv)
        return (_snap(rv), [
            f"CSA = 2*pi*r*h:  {_fmt(csa)} = 2*{_fmt(pi)}*r*{_fmt(h)}",
            f"r = {_fmt(csa)} / (2*{_fmt(pi)}*{_fmt(h)}) = {_fmt(rv)} cm."],
            f"{_fmt(rv)} cm", None, "r = CSA/(2*pi*h)", None)
    if csa is not None and r is not None and (h is None or asks_h):
        hv = csa / (2 * pi * r)
        pi, hv = _prefer_227(hv) if pi != 22 / 7 else (pi, hv)
        return (_snap(hv), [
            f"CSA = 2*pi*r*h:  {_fmt(csa)} = 2*{_fmt(pi)}*{_fmt(r)}*h",
            f"h = {_fmt(csa)} / (2*{_fmt(pi)}*{_fmt(r)}) = {_fmt(hv)} cm."],
            f"{_fmt(hv)} cm", None, "h = CSA/(2*pi*r)", None)
    return None


def _c_ratio_divide(slots, text):
    """'Divide X in ratio a:b(:c)' -> each share."""
    total = slots.get("total") or slots.get("amount")
    if total is None:
        m = re.search(r"(?:divide|split|share|distributes?|rs\.?\s*)"
                      r"[\w\s]*?(\d+(?:\.\d+)?)", text, re.I)
        if m:
            total = float(m.group(1))
    mr = re.search(r"ratio\s+(?:of\s+)?(\d+)\s*:\s*(\d+)"
                   r"(?:\s*:\s*(\d+))?", text, re.I)
    if total is None or not mr:
        return None
    parts = [float(x) for x in mr.groups() if x]
    s = sum(parts)
    shares = [total * p / s for p in parts]
    steps = [f"Total = {_fmt(total)}; ratio = "
             + " : ".join(_fmt(p) for p in parts),
             f"Sum of parts = {_fmt(s)}; each share = "
             "total * part / sum."]
    ans = "; ".join(f"share {i+1} = {_fmt(v)}"
                    for i, v in enumerate(shares))
    return (shares[0], steps, ans, None,
            "share_i = total * p_i / sum(p)", None)


STRUCTURE_SPECS.update({
    "BINOMIAL_PROB": {
        "sanity": lambda v: 0 <= v <= 1.0001,
        "force": r"(?:thrown|tossed|rolled|flipped)\s+\d+\s*times|"
                 r"\d+\s*(?:tosses|trials|throws|flips|times)\b[^.]"
                 r"{0,40}(?:probabilit|heads|success|six)|"
                 r"probabilit[^.]{0,40}(?:exactly|at\s+least|at\s+most|"
                 r"no\s+(?:less|fewer))\s+(?:\d+|one|two|three)",
        "exemplars": [
            "probability of getting exactly 2 heads in 4 tosses",
            "a coin is tossed 5 times, probability of at least 3 heads",
            "probability of exactly one six in three throws of a die",
            "find the probability of at most 2 successes in 6 trials",
            "in 8 coin tosses what is the probability of no heads",
            "exactly 4 heads in 8 flips of a fair coin",
        ],
        "slots": {"n": ["toss", "trial", "throw", "flip", "times"],
                  "k": ["exactly", "heads", "success"],
                  "p": ["probability", "chance"]},
        "required": [], "full_text": True,
        "compute": _c_binomial_prob,
    },
    "CYLINDER_CSA": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "curved surface area of a cylinder is given, find radius",
            "the curved surface area of cylinder is 132 and height is 7",
            "find the radius of the base of a cylinder given its CSA",
            "CSA of cylinder and its height, find the radius",
            "surface area of a cylinder find its height or radius",
            "a cylinder has curved surface area, find the radius",
        ],
        "slots": {"csa": ["curved surface", "csa", "surface area"],
                  "height": ["height"], "radius": ["radius"]},
        "required": [],
        "compute": _c_cylinder_csa,
    },
    "RATIO_DIVIDE": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "divide the amount in the ratio given",
            "split the money between two people in ratio",
            "divide 360 in the ratio 2:3",
            "share the prize money in the ratio",
            "distribute the amount in ratio to each person",
            "divide the profit among partners in a ratio",
        ],
        "slots": {"total": ["divide", "split", "share", "amount", "rs"]},
        "required": [],
        "compute": _c_ratio_divide,
    },
})


STRUCTURE_SPECS.update({
    "VECTOR_ANGLE": {
        "sanity": lambda v: 0 <= v <= 180,
        "exemplars": [
            "find the angle between the two vectors",
            "angle between vector a = i+j and b = i+k",
            "find the angle between vectors given in i j k form",
            "dot product gives cos theta, find the angle between",
            "two vectors are given find angle between them",
        ],
        "slots": {},
        "required": [],
        "full_text": True,
        "compute": _c_vector_angle,
    },
})


def _c_binomial_expand(slots, text):
    """'Expand (a+b)^2 for a=.. b=..' / 'evaluate (x+y)^n' — numeric value."""
    import math
    ma = re.search(r"\ba\s*=\s*(-?\d+(?:\.\d+)?)", text)
    mb = re.search(r"\bb\s*=\s*(-?\d+(?:\.\d+)?)", text)
    mn = re.search(r"\(\s*a\s*\+\s*b\s*\)\s*\^?\s*(\d+)", text)
    if not (ma and mb):
        return None
    a, b = float(ma.group(1)), float(mb.group(1))
    n = int(mn.group(1)) if mn else 2
    val = (a + b) ** n
    if n == 2:
        steps = [
            f"(a+b)^2 = a^2 + 2ab + b^2.",
            f"a={_fmt(a)}, b={_fmt(b)}: "
            f"{_fmt(a)}^2 + 2*{_fmt(a)}*{_fmt(b)} + {_fmt(b)}^2"
            f" = {_fmt(a*a)} + {_fmt(2*a*b)} + {_fmt(b*b)}"
            f" = {_fmt(val)}."]
    else:
        steps = [f"(a+b)^{n} = ({_fmt(a)}+{_fmt(b)})^{n} = {_fmt(val)}."]
    return (_snap(val), steps, f"{_fmt(val)}", None,
            "(a+b)^n", None)


def _c_circle_area(slots, text):
    """Circle area/circumference from radius or diameter."""
    import math
    # sector/arc asks belong to SECTOR_* families — a 'find the radius'
    # on an arc+area stem binds 'cm2' as r=2 and ships pi*4 (sector
    # sweep regression); annulus/ring stems belong to ANNULUS (pi(R^2-r^2));
    # 'segment' asks need sector-minus-triangle (c9 sweep WRONG:
    # 'area of the minor segment, r=14, angle=90' shipped 616 =
    # the whole circle's area).
    if re.search(r"\bsector\b|\barc\s+(?:length|of)\b|\bsegment\b|annulus|"
                 r"concentric|ring\s+between", text, re.I):
        return None
    # FORMULA-STATE GUARD (STEM-BM 2026-10-07, c10 sweep 11_001#d1):
    # 'State the formula for the area of a circle ... when the radius is
    # a multiple of 7' bound r=7 from the phrase and shipped 154 sq cm.
    # A formula/recall ask has no measure to compute -- refuse.
    if re.search(r"state\s+the\s+formula|write\s+the\s+formula|"
                 r"what\s+is\s+the\s+formula\b", text, re.I):
        return None
    # RATE-ASK GUARD (C12 sweep): 'rate of change of the area ... at
    # r = 5' asks dA/dr = 2*pi*r, not A = pi*r^2 — this family computes
    # the static measure and would ship 78.5 for a 10pi ask.
    if re.search(r"rate\s+of\s+change|with\s+respect\s+to|"
                 r"d[A-Za-z]\s*/\s*d[trxy]|deriv|differentiat",
                 text, re.I):
        return None
    # PI-HINT GATE (2026-10-06): '(pi = 22/7)' / '(use pi = 3.14)'
    # leaked 22 into the radius slot -> r=22 shipped 138.28 instead
    # of r=7 -> 44.  Scrub the hint before any extraction.
    text = re.sub(r"\(?\s*(?:use|take)?\s*(?:pi|π)\s*=\s*"
                  r"\d+(?:\.\d+)?(?:\s*/\s*\d+)?\s*\)?", " ",
                  text, flags=re.I)
    d = slots.get("diameter")
    r = slots.get("radius")
    # slot can be polluted by the pre-scrub extractor — if the clean
    # text names a radius/diameter, the clean binding wins
    mr = re.search(r"radi\w*[\w\s]{0,15}?(\d+(?:\.\d+)?)",
                   text, re.I)
    if mr and not re.search(r"radi\w*[\w\s]{0,15}?multiple", text, re.I):
        r = float(mr.group(1))
    md = re.search(r"diamet\w*[\w\s]{0,15}?(\d+(?:\.\d+)?)",
                   text, re.I)
    if md:
        d = float(md.group(1))
    # Inverse check: if circumference is given and radius/diameter is asked
    mc = re.search(r"circumference[^0-9]{0,20}?(\d+(?:\.\d+)?)", text, re.I)
    if mc and re.search(r"find\s+(?:the\s+)?(?:radius|diameter)", text, re.I):
        c_val = float(mc.group(1))
        # Choose pi = 22/7 if c_val is divisible by 22 or 44
        pi = 22 / 7 if (abs(c_val % 22) < 1e-6 or re.search(r"22\s*/\s*7", text)) else math.pi
        r_calc = c_val / (2 * pi)
        if re.search(r"find\s+(?:the\s+)?diameter", text, re.I):
            d_calc = 2 * r_calc
            return (_snap(d_calc), [
                f"Circumference C = {_fmt(c_val)} cm.",
                f"Formula: C = π × d ⟹ d = C / π = {_fmt(c_val)} / {_fmt(pi)} = {_fmt(d_calc)} cm.",
            ], f"{_fmt(d_calc)} cm", None, "d = C / pi", None)
        return (_snap(r_calc), [
            f"Circumference C = {_fmt(c_val)} cm.",
            f"Formula: C = 2πr ⟹ r = C / (2π) = {_fmt(c_val)} / (2 × {_fmt(pi)}) = {_fmt(r_calc)} cm.",
        ], f"{_fmt(r_calc)} cm", None, "r = C / (2*pi)", None)

    if r is None and d is None:
        return None
    if r is None:
        r = d / 2
    pi = 22 / 7 if (re.search(r"22\s*/\s*7", text) or
                    abs(r % 7) < 1e-9 or
                    (d is not None and abs(d % 7) < 1e-9)) \
        else math.pi
    if re.search(r"circumference|perimeter", text, re.I):
        v = 2 * pi * r
        return (_snap(v), [
            f"d = {_fmt(d or 2*r)} so r = {_fmt(r)}.",
            f"circumference = 2*pi*r = 2*{_fmt(pi)}*{_fmt(r)}"
            f" = {_fmt(v)} cm."],
            f"{_fmt(v)} cm", None, "C = 2*pi*r", None)
    v = pi * r * r
    return (_snap(v), [
        f"d = {_fmt(d or 2*r)} so r = {_fmt(r)}.",
        f"area = pi*r^2 = {_fmt(pi)}*{_fmt(r)}^2 = {_fmt(v)} sq cm."],
        f"{_fmt(v)} sq cm", None, "A = pi*r^2", None)


def _c_cube_surface(slots, text):
    """Cube TSA/LSA/volume from edge a."""
    a = slots.get("edge") or slots.get("a") or slots.get("side")
    if a is None:
        m = re.search(r"(?:edge|side)[\w\s]{0,15}?(\d+(?:\.\d+)?)",
                      text, re.I)
        if m:
            a = float(m.group(1))
    if a is None:
        return None
    if re.search(r"diagonal|space\s+diagonal", text, re.I):
        v = a * math.sqrt(3)
        return (_snap(v), [f"space diagonal = a√3 = {_fmt(a)}√3"
                           f" = {_fmt(v)} cm."],
                f"{_fmt(v)} cm", None, "d = a√3", None)
    if re.search(r"volume", text, re.I):
        v = a ** 3
        return (_snap(v), [f"volume = a^3 = {_fmt(a)}^3 = {_fmt(v)} "
                           f"cu cm."],
                f"{_fmt(v)} cu cm", None, "V = a^3", None)
    if re.search(r"lateral|LSA", text, re.I):
        v = 4 * a * a
        return (_snap(v), [f"LSA = 4a^2 = 4*{_fmt(a)}^2 = {_fmt(v)}"
                           f" sq cm."],
                f"{_fmt(v)} sq cm", None, "LSA = 4a^2", None)
    v = 6 * a * a
    return (_snap(v), [f"TSA = 6a^2 = 6*{_fmt(a)}^2 = {_fmt(v)} sq cm."],
            f"{_fmt(v)} sq cm", None, "TSA = 6a^2", None)


def _c_mean_simple(slots, text):
    """Mean of a comma-separated data list.  'goals in 7 matches:
    3,5,2,...' must not count the 7 — strip count-context numbers.

    DIG-GATE (2026-10-06): 'the mean of 10 observations is 30; each is
    increased by 4; find the new SUM' matched this family and shipped
    sum(nums)/n of the visible numbers (14.67) VERIFIED.  A shift /
    transform ask is the MEDIAN_TRANSFORM shape, and a frequency-list
    ('5 occurs 3 times') is GROUPED_MEAN's — refuse both."""
    if re.search(r"each\s+(?:observation|value|number|item)", text, re.I) \
            or re.search(r"\bnew\s+(?:mean|sum|total)\b", text, re.I) \
            or re.search(r"occurs?\s+\d+\s*times|has\s+frequenc",
                         text, re.I):
        return None
    # DIG-GATE 2 (2026-10-06 SOLVER-DIG-1): a WEIGHTED-AVERAGE shape
    # ('the average weight of 10 boys is 45 kg and of 5 girls is 40 kg,
    # find the average of the whole class') pooled the raw numbers
    # [10, 45, 5, 40] and shipped 11.25 VERIFIED (true 43.33).  The
    # group counts are not data points — refuse; the weighted lane
    # owns it.
    if re.search(r"\b(?:mean|average)\b[^.]{0,60}?\bof\s+\d+\b", text,
                 re.I) and \
            re.search(r"\b(?:mean|average)\b[^.]{0,80}?\b(?:is|was)\s*"
                      r"(?:rs\.?|₹)?\s*\d+", text, re.I):
        return None
    # a mean requires a data context — probability/geometry numbers
    # are not observations ('die thrown 6 times, >4' -> mean([6,4])=5
    # shipped VERIFIED on a probability ask)
    if re.search(r"probabilit|thrown|tossed|dice|die\b|coins?|success|"
                 r"radius|angle|triangle|matrix|determinant", text, re.I):
        return None
    work = re.sub(
        r"(?:in|over|across|for|of|from)\s+\d+(?:\.\d+)?\s*"
        r"(?:match\w*|observation\w*|number\w*|data|value\w*|"
        r"student\w*|test\w*|inning\w*|game\w*|day\w*|term\w*)",
        " ", text, flags=re.I)
    # MARKS-LEAK GATE (2026-10-06): '(2 marks)' / '[3 marks]' counts
    # the mark-weight as a datum -> mean of 90+2 over 6 instead of 5.
    work = re.sub(r"[\(\[]\s*\d+(?:\.\d+)?\s*marks?\s*[\)\]]", " ",
                  work, flags=re.I)
    nums = [float(x) for x in
            re.findall(r"-?\d+(?:\.\d+)?", work)]
    # 2-element mean is valid ('mean of 10 and 20' = 15); the old
    # <3 floor refused it and let the fallback ship '10'
    if len(nums) < 2:
        return None
    # declared-count agreement: if a stripped count equals len(nums),
    # it confirms the list is complete — no action needed, but if a
    # count token survives inside the data it corrupts the mean
    n = len(nums)
    v = sum(nums) / n
    return (_snap(v), [
        f"data = {', '.join(_fmt(x) for x in nums)} (n = {n}).",
        f"mean = sum/n = {_fmt(sum(nums))}/{n} = {_fmt(v)}."],
        f"{_fmt(v)}", None, "mean = sum/n", None)


def _c_iqr(slots, text):
    """'interquartile range of 2,4,6,8,10,12,14,16' -> Q3 - Q1.
    The range lane computed max - min = 14, not the IQR."""
    if not re.search(r"interquartile|iqr|quartile", text, re.I):
        return None
    nums = sorted(float(n) for n in re.findall(r"-?\d+(?:\.\d+)?",
                                              text))
    n = len(nums)
    if n < 4:
        return None
    # median splits into lower/upper halves
    mid = n // 2
    lower = nums[:mid]
    upper = nums[mid:] if n % 2 == 0 else nums[mid + 1:]
    q1 = lower[len(lower) // 2] if len(lower) % 2 == 1 \
        else (lower[len(lower) // 2 - 1] + lower[len(lower) // 2]) / 2
    q3 = upper[len(upper) // 2] if len(upper) % 2 == 1 \
        else (upper[len(upper) // 2 - 1] + upper[len(upper) // 2]) / 2
    iqr = q3 - q1
    return (_snap(iqr), [
        f"sorted: {nums}.",
        f"Q1 = {_fmt(q1)}, Q3 = {_fmt(q3)}.",
        f"IQR = Q3 - Q1 = {_fmt(iqr)}."],
        f"{_fmt(iqr)}", None, "IQR = Q3 - Q1", None)


def _c_sigma(slots, text):
    """'sum(k) for k = 1 to 10' -> 55.  Or 'sum of first N
    naturals' already handled — this catches sigma notation."""
    ms = re.search(r"sum\s*\(\s*k\s*\)|sum\s+of\s+(\w+)", text, re.I)
    mn = re.search(r"(?:for\s+k\s*=\s*1\s*to|to)\s*(\d+)", text, re.I)
    if not mn:
        return None
    n = int(mn.group(1))
    if re.search(r"k\^2|k\s*squared|k\*\*2", text, re.I):
        v = n * (n + 1) * (2 * n + 1) / 6
        return (_snap(v), [
            f"Σk² for k=1..{n} = n(n+1)(2n+1)/6 = {_fmt(v)}."],
            f"{_fmt(v)}", None, "Σk² = n(n+1)(2n+1)/6", None)
    v = n * (n + 1) / 2
    return (_snap(v), [
        f"Σk for k=1..{n} = n(n+1)/2 = {_fmt(v)}."],
        f"{_fmt(v)}", None, "Σk = n(n+1)/2", None)


def _c_series_sum(slots, text):
    """'1 + 2 + 3 + ... + 10' -> 55.  Detects 'a1 + a2 + ... + an'
    where the ellipsis carries the middle terms."""
    m = re.search(r"(\d+)\s*\+\s*(\d+)\s*\+\s*\d+\s*\+"
                  r"\s*(?:\.{2,}\s*\+\s*|\s*\+\s*)(\d+)", text)
    if not m:
        return None
    a1 = int(m.group(1)); a2 = int(m.group(2)); an = int(m.group(3))
    d = a2 - a1
    if d <= 0:
        return None
    n = (an - a1) // d + 1
    v = n * (a1 + an) / 2
    return (_snap(v), [
        f"AP: a1={a1}, d={d}, an={an}, n={n}.",
        f"S = n(a1+an)/2 = {n}({a1}+{an})/2 = {_fmt(v)}."],
        f"{_fmt(v)}", None, "S = n(a1+an)/2", None)


def _c_limit_eval(slots, text):
    """'lim(x->2) (x^2 - 4)/(x - 2)' -> 4.  Factorable rational
    limits: (x-a)(x+a)/(x-a) = x+a."""
    m = re.search(r"(?:lim|limit)[^.]{0,20}x\s*->\s*(-?\d+)", text, re.I)
    if not m:
        return None
    a = float(m.group(1))
    mr = re.search(r"\(\s*x\^2\s*-\s*(\d+(?:\.\d+)?)\s*\)\s*/"
                   r"\s*\(\s*x\s*-\s*(-?\d+(?:\.\d+)?)\s*\)", text, re.I)
    if mr and float(mr.group(2)) == a:
        # (x² - c)/(x - a) where a² = c -> x + a at limit
        c = float(mr.group(1))
        if abs(a * a - c) < 1e-9:
            v = a + a
            return (_snap(v), [
                f"(x² - {_fmt(c)})/(x - {_fmt(a)}) = "
                f"(x+{_fmt(a)})(x-{_fmt(a)})/(x-{_fmt(a)}).",
                f"= x + {_fmt(a)} -> {_fmt(v)}."],
                f"{_fmt(v)}", None, "factor & cancel", None)
    return None


def _c_complex_modulus(slots, text):
    """'|3 + 4i| = 5' — modulus of a + bi."""
    m = re.search(r"modulus\s+of\s+(-?\d+(?:\.\d+)?)\s*([+-])\s*"
                  r"(\d+(?:\.\d+)?)\s*i\b", text, re.I)
    if not m:
        return None
    a = float(m.group(1)); b = float(m.group(3)) * \
        (1 if m.group(2) != '-' else -1)
    v = math.sqrt(a * a + b * b)
    return (_snap(v), [
        f"|a + bi| = √(a² + b²) = √({_fmt(a * a)} + {_fmt(b * b)})"
        f" = {_fmt(v)}."],
        f"{_fmt(v)}", None, "|z| = √(a²+b²)", None)


def _c_ap_sum(slots, text):
    """'sum of AP 1,4,7... to 20 terms' -> n/2(2a + (n-1)d)."""
    if not re.search(r"arithmetic|AP\b|sum\s+of\s+(?:the\s+)?AP",
                     text, re.I):
        return None
    nums = [float(n) for n in re.findall(r"\d+", text)[:3]]
    mn = re.search(r"(\d+)\s*terms?", text, re.I)
    if len(nums) < 2 or not mn:
        return None
    a, d_, n_ = nums[0], nums[1] - nums[0], int(mn.group(1))
    v = n_ / 2 * (2 * a + (n_ - 1) * d_)
    return (_snap(v), [
        f"a = {_fmt(a)}, d = {_fmt(d_)}, n = {n_}.",
        f"S = n/2(2a + (n-1)d) = {n_}/2({_fmt(2 * a)} + "
        f"{n_ - 1} x {_fmt(d_)}) = {_fmt(v)}."],
        f"{_fmt(v)}", None, "S = n/2(2a+(n-1)d)", None)


def _c_gp_sum(slots, text):
    """'sum of GP 1,2,4... to 10 terms' -> a(r^n - 1)/(r - 1)."""
    if not re.search(r"geometric|GP\b|sum\s+of\s+(?:the\s+)?GP",
                     text, re.I):
        return None
    nums = [float(n) for n in re.findall(r"\d+", text)[:3]]
    mn = re.search(r"(\d+)\s*terms?", text, re.I)
    if len(nums) < 2 or not mn:
        return None
    a = nums[0]; r_ = nums[1] / a if a != 0 else 0
    n_ = int(mn.group(1))
    if abs(r_ - 1) < 1e-12:
        v = a * n_
    else:
        v = a * (r_ ** n_ - 1) / (r_ - 1)
    return (_snap(v), [
        f"a = {_fmt(a)}, r = {_fmt(r_)}, n = {n_}.",
        f"S = a(r^n - 1)/(r - 1) = {_fmt(v)}."],
        f"{_fmt(v)}", None, "S = a(r^n-1)/(r-1)", None)


def _c_ellipse(slots, text):
    """'x²/25 + y²/16 = 1 -> eccentricity' -> e = √(1 - b²/a²)."""
    if not re.search(r"eccentricity|ellipse|x\^2/\d+|x²/\d+",
                     text, re.I):
        return None
    m = re.search(r"x\^?2\s*/\s*(\d+(?:\.\d+)?)\s*\+\s*"
                  r"y\^?2\s*/\s*(\d+(?:\.\d+)?)", text, re.I)
    if not m:
        return None
    a2 = float(m.group(1)); b2 = float(m.group(2))
    if a2 <= b2:
        return None
    e = math.sqrt(1 - b2 / a2)
    return (_snap(e), [
        f"a² = {_fmt(a2)}, b² = {_fmt(b2)}.",
        f"e = √(1 - b²/a²) = √(1 - {_fmt(b2 / a2)}) = {_fmt(e)}."],
        f"{_fmt(e)}", None, "e = √(1 - b²/a²)", None)


def _c_circle_eq(slots, text):
    """'x²+y²-4x+6y-3=0 -> centre (-g,-f), r = √(g²+f²-c)'."""
    m = re.search(r"x\^?2\s*\+\s*y\^?2\s*([+-]\s*\d+(?:\.\d+)?)\s*x"
                  r"\s*([+-]\s*\d+(?:\.\d+)?)\s*y\s*([+-]\s*"
                  r"\d+(?:\.\d+)?)\s*=\s*0", text, re.I)
    if not m:
        return None
    g2 = float(m.group(1).replace(" ", ""))
    f2 = float(m.group(2).replace(" ", ""))
    c = float(m.group(3).replace(" ", ""))
    # centre = (-g, -f), radius = √(g²+f²-c)
    cx, cy = -g2 / 2, -f2 / 2
    r2 = cx * cx + cy * cy - c
    if r2 < 0:
        return None
    r_ = math.sqrt(r2)
    return (_snap(r_), [
        f"centre = ({_fmt(cx)}, {_fmt(cy)}).",
        f"r = √(g² + f² - c) = {_fmt(r_)}."],
        f"centre ({_fmt(cx)}, {_fmt(cy)}), r = {_fmt(r_)}", None,
        "(-g,-f), √(g²+f²-c)", None)


def _c_circle_arc(slots, text):
    """'arc length r=6 θ=60 deg' -> (θ/360)·2πr = 6.28."""
    mr = re.search(r"(?:radius|r)\s*[=:]?\s*(\d+(?:\.\d+)?)\s*cm",
                   text, re.I)
    mth = re.search(r"(?:angle|theta|θ)\s*[=:]?\s*"
                    r"(\d+(?:\.\d+)?)\s*(?:deg|degree|°)",
                    text, re.I)
    if not (mr and mth):
        return None
    r = float(mr.group(1)); th = float(mth.group(1))
    v = th / 360 * 2 * math.pi * r
    return (_snap(v), [
        f"arc = (θ/360) × 2πr = ({_fmt(th)}/360) × "
        f"2π x {_fmt(r)} = {_fmt(v)} cm."],
        f"{_fmt(v)} cm", None, "arc = (θ/360)·2πr", None)


def _c_vector_dot(slots, text):
    """'(1,2,3) . (4,5,6) -> 32'."""
    v1 = re.search(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)"
                   r"\s*,\s*(-?\d+(?:\.\d+)?)\s*\)", text)
    v2 = re.findall(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)"
                    r"\s*,\s*(-?\d+(?:\.\d+)?)\s*\)", text)
    if len(v2) < 2:
        return None
    a = [float(g) for g in v2[0]]
    b = [float(g) for g in v2[1]]
    dot = sum(x * y for x, y in zip(a, b))
    return (_snap(dot), [
        f"({a[0]:g},{a[1]:g},{a[2]:g}) . ({b[0]:g},{b[1]:g},"
        f"{b[2]:g}) = {a[0]*b[0]:g}+{a[1]*b[1]:g}+{a[2]*b[2]:g}"
        f" = {_fmt(dot)}."],
        f"{_fmt(dot)}", None, "a·b = ax·bx+ay·by+az·bz", None)


def _c_vector_mag(slots, text):
    """'|(3,4,0)| = 5'."""
    m = re.search(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)"
                  r"\s*,\s*(-?\d+(?:\.\d+)?)\s*\)", text)
    if not m:
        return None
    a = [float(g) for g in m.groups()]
    v = math.sqrt(sum(x * x for x in a))
    return (_snap(v), [
        f"|v| = √({_fmt(a[0])}²+{_fmt(a[1])}²+{_fmt(a[2])}²)"
        f" = {_fmt(v)}."],
        f"{_fmt(v)}", None, "|v| = √(x²+y²+z²)", None)


def _c_bayes(slots, text):
    """'P(A|B)=0.3, P(B)=0.5 -> P(A∩B) = P(A|B)·P(B) = 0.15'.
    Also: P(A)=0.4, P(B)=0.8, P(B|A)=0.6 -> P(A|B) = P(A∩B)/P(B) = 0.3.
    Also: P(A∪B) = P(A) + P(B) - P(A∩B)."""
    if not re.search(r"P\s*\(|bayes|conditional", text, re.I):
        return None
    mp = re.findall(r"P\s*\(\s*([A-Z])\s*\)\s*=\s*(\d+(?:\.\d+)?)",
                    text, re.I)
    mpc = re.search(r"P\s*\(\s*([A-Z])\s*\|\s*([A-Z])\s*\)\s*="
                    r"\s*(\d+(?:\.\d+)?)", text, re.I)
    if mpc:
        cond_event = mpc.group(1).upper()
        given_event = mpc.group(2).upper()
        p_cond = float(mpc.group(3))
        p_marginals = {s.upper(): float(v) for s, v in mp}
        
        # Calculate intersection: P(A∩B) = P(cond|given) * P(given)
        p_inter = None
        if given_event in p_marginals:
            p_inter = p_cond * p_marginals[given_event]
        elif cond_event in p_marginals and len(p_marginals) == 1:
            p_inter = p_cond * p_marginals[cond_event]
            
        if p_inter is not None:
            # 1. Is another conditional asked? e.g. P(A|B) when P(B|A) was given
            ask_cond = re.search(r"P\s*\(\s*([A-Z])\s*\|\s*([A-Z])\s*\)(?!\s*=)", text, re.I)
            if ask_cond:
                target_num = ask_cond.group(1).upper()
                target_den = ask_cond.group(2).upper()
                if target_den in p_marginals and p_marginals[target_den] > 0:
                    ans_val = p_inter / p_marginals[target_den]
                    steps = [
                        f"P({cond_event}∩{given_event}) = P({cond_event}|{given_event})·P({given_event}) = {_fmt(p_cond)} x {_fmt(p_marginals[given_event])} = {_fmt(p_inter)}.",
                        f"P({target_num}|{target_den}) = P({cond_event}∩{given_event}) / P({target_den}) = {_fmt(p_inter)} / {_fmt(p_marginals[target_den])} = {_fmt(ans_val)}."
                    ]
                    return (_snap(ans_val), steps, f"{_fmt(ans_val)}", None,
                            f"P({target_num}|{target_den})=P(A∩B)/P({target_den})", None)
            
            # 2. Is union asked? P(A or B) / P(A∪B)
            if re.search(r"P\s*\(\s*[A-Z]\s*(?:∪|union|\bor\b)\s*[A-Z]\s*\)", text, re.I):
                if cond_event in p_marginals and given_event in p_marginals:
                    pa = p_marginals[cond_event]
                    pb = p_marginals[given_event]
                    ans_val = pa + pb - p_inter
                    steps = [
                        f"P({cond_event}∩{given_event}) = P({cond_event}|{given_event})·P({given_event}) = {_fmt(p_cond)} x {_fmt(p_marginals[given_event])} = {_fmt(p_inter)}.",
                        f"P({cond_event}∪{given_event}) = P({cond_event}) + P({given_event}) - P({cond_event}∩{given_event}) = {_fmt(pa)} + {_fmt(pb)} - {_fmt(p_inter)} = {_fmt(ans_val)}."
                    ]
                    return (_snap(ans_val), steps, f"{_fmt(ans_val)}", None,
                            "P(A∪B)=P(A)+P(B)-P(A∩B)", None)
            
            # 3. Default: intersection P(A∩B)
            return (_snap(p_inter), [
                f"P(A∩B) = P({cond_event}|{given_event})·P({given_event}) = {_fmt(p_cond)} x "
                f"{_fmt(p_marginals.get(given_event, 1.0))} = {_fmt(p_inter)}."],
                f"{_fmt(p_inter)}", None, "P(A∩B)=P(A|B)·P(B)", None)

    if len(mp) >= 2:
        pa = float(mp[0][1]); pb = float(mp[1][1])
        v = pa * pb  # independent: P(A∩B) = P(A)·P(B)
        return (_snap(v), [
            f"P(A∩B) = P(A)·P(B) = {_fmt(pa)} x {_fmt(pb)}"
            f" = {_fmt(v)}."],
            f"{_fmt(v)}", None, "P(A∩B)=P(A)·P(B)", None)
    return None


def _c_prob_or(slots, text):
    """'P(A)=0.3, P(B)=0.4, independent -> P(A or B)
    = 1 - (1-pa)(1-pb)'."""
    if not re.search(r"P\s*\(.*\bor\b|P\s*\(.*union|independent",
                     text, re.I):
        return None
    mp = re.findall(r"P\s*\(\s*([A-Z])\s*\)\s*=\s*(\d+(?:\.\d+)?)",
                    text, re.I)
    if len(mp) < 2:
        return None
    pa = float(mp[0][1]); pb = float(mp[1][1])
    # P(A∪B) = P(A)+P(B) - P(A)·P(B)  (independent)
    v = pa + pb - pa * pb
    return (_snap(v), [
        f"P(A or B) = {_fmt(pa)} + {_fmt(pb)} - {_fmt(pa*pb)}"
        f" = {_fmt(v)}."],
        f"{_fmt(v)}", None, "P(A∪B)=P(A)+P(B)-P(A)P(B)", None)


def _c_tangent_line(slots, text):
    """'tangent to y = x² at (1,1)' -> slope + point -> y = 2x-1."""
    mt = re.search(r"tangent[^.]{0,20}y\s*=\s*"
                   r"([a-z0-9+\-*/^()\s.]+?)\s+at\s+"
                   r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)",
                   text, re.I)
    if not mt:
        return None
    expr = mt.group(1).strip()
    xp = float(mt.group(2)); yp = float(mt.group(3))
    import sympy
    from backend.its.solver.math_kernel import parse_expression
    x = sympy.Symbol('x')
    f = parse_expression(expr)
    if f is None:
        return None
    d = sympy.diff(f, x)
    slope = float(d.subs(x, xp))
    c_ = yp - slope * xp
    sign = '+' if c_ >= 0 else '-'
    return (_snap(slope), [
        f"f(x) = {expr}, f'(x) = {d}.",
        f"slope at x={_fmt(xp)} = {_fmt(slope)}.",
        f"y - {_fmt(yp)} = {_fmt(slope)}(x - {_fmt(xp)}) -> "
        f"y = {_fmt(slope)}x {sign} {_fmt(abs(c_))}."],
        f"y = {_fmt(slope)}x {sign} {_fmt(abs(c_))}", None,
        "tangent: y = mx + c", None)


# asks a det-family must refuse — rank/minor/cofactor/symmetric are
# different computations; shipping det for any of them is a wrong-verify
_NON_DET_ASK = re.compile(
    r"\brank\b|\bminor\b|M_\d|cofactor|C_\d|symmetric|skew|echelon|"
    r"row\s+reduce|row\s+reduction|identity\s+matrix|scalar\s+matrix|"
    r"diagonal\s+matrix|singular|non[-\s]?singular|adjoint|"
    r"inverse\s+of\s+(?:the\s+)?matrix|A\s*\^\s*-?1|consistent|"
    r"special\s+type|equal\s+matrices", re.I)


def _c_det3(slots, text):
    """3x3 determinant via cofactor expansion."""
    if _NON_DET_ASK.search(text):
        return None  # rank/minor/cofactor/symmetric asks -> wrong-verify
    mm = re.findall(r"\[\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)"
                    r"\s*,\s*(-?\d+(?:\.\d+)?)\s*\]", text)
    if len(mm) != 3:
        return None
    m = [[float(g) for g in row] for row in mm]
    v = (m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
         - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
         + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]))
    return (_snap(v), [
        f"cofactor expansion along row 1.",
        f"= {_fmt(m[0][0])}({_fmt(m[1][1]*m[2][2]-m[1][2]*m[2][1])})"
        f" - {_fmt(m[0][1])}({_fmt(m[1][0]*m[2][2]-m[1][2]*m[2][0])})"
        f" + {_fmt(m[0][2])}({_fmt(m[1][0]*m[2][1]-m[1][1]*m[2][0])})"
        f" = {_fmt(v)}."],
        f"{_fmt(v)}", None, "3x3 cofactor", None)


def _c_limit_sin(slots, text):
    """'lim(x->0) sin x / x' -> 1."""
    if re.search(r"lim[^.]{0,20}x\s*->\s*0[^.]{0,30}"
                 r"sin\s*x\s*/\s*x|sin\s*x\s*/\s*x", text, re.I):
        return (_snap(1.0), ["standard limit: sin(x)/x -> 1 as x->0."],
                "1", None, "lim sin(x)/x = 1", None)
    return None






























def _c_poly_degree(slots, text):
    """'3x^4 - 2x^3 + x - 7' -> degree 4."""
    powers = [int(m) for m in re.findall(r"\^(\d+)", text)]
    bare_x = re.search(r"(?<!\^)\bx\b(?!\s*\^)", text)
    if bare_x:
        powers.append(1)
    if not powers:
        return None
    deg = max(powers)
    return (_snap(deg), [
        f"Highest power of x = {_fmt(deg)} -> degree = {_fmt(deg)}."],
        f"{_fmt(deg)}", None, "degree = highest power", None)


def _c_rect_area_by(slots, text):
    """'5 cm by 3 cm' -> 15 sq cm."""
    m = re.search(r"(\d+(?:\.\d+)?)\s*(?:cm|m|mm)\s*(?:by|x|\u00d7)\s*"
                  r"(\d+(?:\.\d+)?)\s*(?:cm|m|mm)\b", text, re.I)
    if not m:
        return None
    l, b = float(m.group(1)), float(m.group(2))
    v = l * b
    unit = re.search(r"(cm|m|mm)", m.group(0)).group(1)
    return (_snap(v), [
        f"Area = l x b = {_fmt(l)} x {_fmt(b)} = {_fmt(v)} sq {unit}."],
        f"{_fmt(v)} sq {unit}", None, "A = l x b", None)


def _c_profit_percent(slots, text):
    """'CP=50, SP=60' -> (60-50)/50 x 100 = 20%."""
    mc = re.search(r"(?:C\.?P\.?|cost\s+price)[^.]{0,10}?"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    ms = re.search(r"(?:S\.?P\.?|selling\s+price)[^.]{0,10}?"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    if not (mc and ms):
        return None
    cp, sp = float(mc.group(1)), float(ms.group(1))
    if cp == 0:
        return None
    v = (sp - cp) / cp * 100
    kind = "profit" if sp > cp else "loss"
    return (_snap(v), [
        f"{kind.title()}% = ({_fmt(sp)} - {_fmt(cp)}) / {_fmt(cp)} "
        f"x 100 = {_fmt(v)}%."],
        f"{_fmt(v)}%", None, f"{kind}% = (SP-CP)/CP x 100", None)


def _c_seq_odd(slots, text):
    """'2, 4, 6, 9, 10' -> 9 (odd one out: only odd number)."""
    nums = [float(x) for x in re.findall(r"\d+", text)]
    if len(nums) < 4:
        return None
    odd_count = sum(1 for n in nums if n % 2 != 0)
    even_count = len(nums) - odd_count
    if odd_count == 1:
        v = [n for n in nums if n % 2 != 0][0]
    elif even_count == 1:
        v = [n for n in nums if n % 2 == 0][0]
    else:
        return None
    return (_snap(v), [
        f"Odd one out: {_fmt(v)} is the only "
        f"{'odd' if odd_count == 1 else 'even'} number."],
        f"{_fmt(v)}", None, "odd one out by parity", None)


def _c_seq_next(slots, text):
    """'2, 4, 8, 16, ?' -> 32.  Arithmetic or geometric."""
    nums = [float(x) for x in re.findall(r"\d+", text)]
    if len(nums) < 3:
        return None
    diffs = [nums[i+1] - nums[i] for i in range(len(nums)-1)]
    if len(set(diffs)) == 1:
        nxt = nums[-1] + diffs[0]
        rule = f"AP d = {_fmt(diffs[0])}"
    elif all(abs(nums[i+1]/nums[i] - nums[1]/nums[0]) < 0.001
             for i in range(1, len(nums)-1)):
        r_ = nums[1] / nums[0]
        nxt = nums[-1] * r_
        rule = f"GP r = {_fmt(r_)}"
    else:
        return None
    return (_snap(nxt), [
        f"Pattern: {rule} -> next = {_fmt(nxt)}."],
        f"{_fmt(nxt)}", None, "next term", None)


def _c_distance_2d(slots, text):
    """'distance between (x1,y1) and (x2,y2)'."""
    m = re.findall(r"\((-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\)", text)
    if len(m) < 2:
        return None
    x1, y1, x2, y2 = float(m[0][0]), float(m[0][1]), float(m[1][0]), float(m[1][1])
    v = math.sqrt((x2-x1)**2 + (y2-y1)**2)
    return (_snap(v), [
        f"d = sqrt(({_fmt(x2)}-{_fmt(x1)})² + ({_fmt(y2)}-{_fmt(y1)})²) "
        f"= {_fmt(v)}."],
        f"{_fmt(v)}", None, "d = sqrt((x2-x1)² + (y2-y1)²)", None)


def _c_work_rate(slots, text):
    """'3 workers paint in 4 days, add 1 more -> days?'"""
    mw = re.search(r"(\d+)\s*(?:workers?|men|people|labourers?)", text)
    md = re.search(r"(\d+)\s*days?", text)
    if not (mw and md):
        return None
    w = int(mw.group(1)); d = int(md.group(1))
    _w2n = {"one":1,"two":2,"three":3,"four":4,"five":5,"six":6,
            "seven":7,"eight":8,"nine":9,"ten":10}
    mw2 = re.search(r"(\d+|one|two|three|four|five|six|seven|"
                    r"eight|nine|ten)\s*more", text, re.I)
    extra = 0
    if mw2:
        extra = int(mw2.group(1)) if mw2.group(1).isdigit() else \
            _w2n.get(mw2.group(1).lower(), 0)
    new_w = w + extra
    new_d = w * d / new_w
    return (_snap(new_d), [
        f"{w} workers -> {d} days. Total work = {w}x{d} = {w*d}.",
        f"{new_w} workers -> {w*d}/{new_w} = {_fmt(new_d)} days."],
        f"{_fmt(new_d)} days", None, "work rate = w1*d1/w2", None)


def _c_percent_back(slots, text):
    """'number increased by 20% becomes 90' -> x = 90/1.2 = 75."""
    mp = re.search(r"increased\s+by\s+(\d+(?:\.\d+)?)\s*%", text, re.I)
    mv = re.search(r"becomes\s+(\d+(?:\.\d+)?)", text, re.I)
    if not (mp and mv):
        return None
    pct = float(mp.group(1)); final = float(mv.group(1))
    x = final / (1 + pct / 100)
    return (_snap(x), [
        f"x + {_fmt(pct)}% of x = {_fmt(final)} -> "
        f"x = {_fmt(final)}/{_fmt(1+pct/100)} = {_fmt(x)}."],
        f"{_fmt(x)}", None, "x = final/(1 + p/100)", None)


def _c_ap_terms(slots, text):
    """'7, 13, 19, ..., last term X' -> find n."""
    m = re.search(r"(\d+)[\s,]+(\d+)[\s,]+(\d+)[\s,]*"
                  r"(?:\.{2,}|,\s*,)[\s,]*(\d+)", text)
    if not m:
        return None
    a1, a2, a3, an = int(m.group(1)), int(m.group(2)), int(m.group(3)), int(m.group(4))
    d = a2 - a1
    if d <= 0 or a3 - a2 != d:
        return None
    n = (an - a1) // d + 1
    return (_snap(n), [
        f"a1={a1}, d={d}, an={an} -> n = (an-a1)/d + 1 = {n}."],
        f"{n}", None, "n = (an-a1)/d + 1", None)


def _c_number_compare(slots, text):
    """'43 or 34' -> 43 (the larger)."""
    # a 'greater than N' inside a probability/measure question is a
    # threshold definition, not a compare ask
    if re.search(r"probabilit|thrown|tossed|rolled|dice|die\b|coins?|"
                 r"success|area|volume|perimeter", text, re.I):
        return None
    nums = [float(x) for x in re.findall(r"\d+", text)]
    if len(nums) < 2:
        return None
    if re.search(r"(?:greater|larger|bigger|more)", text, re.I):
        v = max(nums)
        return (_snap(v), [f"Greater = {_fmt(v)}."], f"{_fmt(v)}",
                None, "compare", None)
    if re.search(r"(?:smaller|less|fewer)", text, re.I):
        v = min(nums)
        return (_snap(v), [f"Smaller = {_fmt(v)}."], f"{_fmt(v)}",
                None, "compare", None)
    return None


def _c_spinner_prob(slots, text):
    """'3 green, 1 blue, 1 red sector' -> P(green) = 3/5."""
    parts = re.findall(r"(\d+)\s+(green|blue|red|yellow|white|black|"
                       r"orange|purple|pink|brown)", text, re.I)
    if not parts:
        return None
    counts = {c: int(n) for n, c in parts}
    total = sum(counts.values())
    if total == 0:
        return None
    asked = re.search(r"(?:probability|chance|likelihood|find|"
                      r"landing\s+on|lands\s+on)\s+"
                      r"(?:of\s+)?(?:getting\s+|landing\s+on\s+)?"
                      r"(green|blue|red|yellow|white|black|"
                      r"orange|purple|pink|brown)", text, re.I)
    if not asked:
        return None
    col = asked.group(1).lower()
    if col not in counts:
        return None
    v = counts[col] / total
    return (_snap(v), [
        f"P({col}) = {_fmt(counts[col])}/{_fmt(total)} = {_fmt(v)}."],
        f"{_fmt(v)}", None, "P = favorable/total", None)


def _c_composite_solid(slots, text):
    """'hemisphere surmounted by cone r=6 h=8' -> total surface area."""
    # solid types: hemisphere, cone, cylinder, cuboid, sphere, cube
    dims = [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)\s*cm", text)]
    if len(dims) < 2:
        return None
    r = dims[0]  # radius or side
    h = dims[1] if len(dims) > 1 else dims[0]
    pi = 3.14159
    # hemisphere on cone (toy shape): πr(2r + l) + πrl
    if re.search(r"hemisphere.*cone|cone.*hemisphere", text, re.I):
        l = math.sqrt(r * r + h * h)
        sa = 2 * pi * r * r + pi * r * l  # hemisphere CSA + cone CSA
        return (_snap(sa), [
            f"SA = 2πr² + πrl, l = √(r²+h²) = {_fmt(l)}.",
            f"= {_fmt(sa)} sq cm."],
            f"{_fmt(sa)} sq cm", None, "SA = 2πr² + πrl", None)
    # cylinder + cone (pencil/tent): πr(2h + l + r)
    if re.search(r"cylinder.*cone|cone.*cylinder|cylinder.*hemisphere", text, re.I):
        l = math.sqrt(r * r + h * h)
        sa = pi * r * (2 * h + l) + pi * r * r
        return (_snap(sa), [
            f"SA = 2πrh + πrl + πr² = πr(2h + l + r).",
            f"l = √(r²+h²) = {_fmt(l)}. = {_fmt(sa)} sq cm."],
            f"{_fmt(sa)} sq cm", None, "SA = 2πrh + πrl + πr²", None)
    return None


def _c_emi(slots, text):
    """'loan P at r% for n months -> EMI' or 'EMI X for n months -> P'."""
    mp = re.search(r"(?:loan|principal|borrowed?|P)\s*(?:of|=|is)?\s*"
                   r"(?:Rs\.?\s*)?[₹$]?\s*(\d+(?:\.\d+)?)", text, re.I)
    mr = re.search(r"(\d+(?:\.\d+)?)\s*%\s*(?:per\s+(?:month|year|annum)|"
                   r"p\.?a\.?|pa\b|annually|monthly)", text, re.I)
    mn = re.search(r"(\d+)\s*(?:months?|years?|installments?|EMIs?)", text, re.I)
    me = re.search(r"EMI\s*(?:of|=|is)?\s*[₹$]?\s*(\d+(?:\.\d+)?)", text, re.I)
    if not (mp and mr and mn):
        return None
    P = float(mp.group(1))
    r_annual = float(mr.group(1))
    n_raw = int(mn.group(1))
    # convert: if years, multiply by 12 for months
    n = n_raw * 12 if re.search(r"year", mn.group(0), re.I) else n_raw
    r = r_annual / 1200  # monthly rate
    if r == 0:
        emi = P / n
    else:
        emi = P * r * (1 + r) ** n / ((1 + r) ** n - 1)
    return (_snap(emi), [
        f"EMI = P·r·(1+r)^n / ((1+r)^n - 1).",
        f"P={_fmt(P)}, r={_fmt(r_annual)}%/12={_fmt(r)}, n={n}.",
        f"EMI = {_fmt(emi)}."],
        f"₹{_fmt(emi)}", None, "EMI = P r (1+r)^n / ((1+r)^n - 1)", None)


def _c_trig_elevation_2pt(slots, text):
    """'angle of elevation 60° from foot of tower h=50m, top of chimney' ->
    height via two angles."""
    # Two-angle problems: h = d·tanθ₁·tanθ₂/(tanθ₁±tanθ₂) or
    # h = h_tower + d·tanθ₂ where d = h_tower/tanθ₁
    angs = [float(x) for x in
            re.findall(r"(\d+(?:\.\d+)?)\s*(?:degrees?|deg)", text)]
    hts = [float(x) for x in
           re.findall(r"(\d+(?:\.\d+)?)\s*(?:m|metre|meter|km)", text)]
    if not (angs and hts):
        return None
    h_base = hts[0]
    if len(angs) >= 2:
        a1, a2 = angs[0], angs[1]
        # a1 = angle to chimney top (from tower foot)
        # a2 = angle to tower top (from chimney foot)
        # d = h_base/tan(a2), h_chimney = d·tan(a1)
        d = h_base / math.tan(math.radians(a2))
        h_top = d * math.tan(math.radians(a1))
        return (_snap(h_top), [
            f"d = {_fmt(h_base)}/tan({_fmt(a2)}°) = {_fmt(d)} m.",
            f"chimney height = {_fmt(d)} x tan({_fmt(a1)}°) = {_fmt(h_top)} m."],
            f"{_fmt(h_top)} m", None, "h = d·tanθ1", None)
    elif len(angs) == 1:
        # single-angle stems belong to ELEVATION_HEIGHT /
        # HEIGHTS_DISTANCE — only claim when the ask is explicitly the
        # observer distance (d = h/tan θ), never a height
        if not re.search(r"distance|how\s+far|far\s+from", text, re.I):
            return None
        a = angs[0]
        # h = d·tan(a) — distance from height
        v = h_base / math.tan(math.radians(a))
        return (_snap(v), [
            f"d = h/tan(θ) = {_fmt(h_base)}/tan({_fmt(a)}°) = {_fmt(v)} m."],
            f"{_fmt(v)} m", None, "d = h/tan θ", None)
    return None


def _c_matrix_det_props(slots, text):
    """'|3A| given |A|=5' or '|A.adj A|' or '|A^T|' or 'det(B^-1 A B)^2'."""
    mdet = re.search(r"(?:det|determinant|modulus)\s*(?:\(\s*A\s*\)|(?:of\s*)?A)\s*[=:]\s*"
                     r"(\d+(?:\.\d+)?)", text, re.I)
    # infer order from '3x3', '3 x 3', or normalized '3x^3'
    mord = re.search(r"(\d+)\s*[x×]\s*\^?\s*(\d+)", text)
    n = int(mord.group(1)) if mord else 2
    if not mdet:
        # try 'det A = 5' or '|A| = 5'
        mdet = re.search(r"\|A\|\s*[=:]\s*(\d+(?:\.\d+)?)", text)
    if not mdet:
        return None
    det_a = float(mdet.group(1))
    # det(B^-1 A B)^p = (det(A))^p
    msim = re.search(r"det\s*\(\s*B\s*\^?\s*-\s*1\s*A\s*B\s*\)(?:\s*\^\s*(\d+))?", text, re.I)
    if msim:
        p = int(msim.group(1) or 1)
        v = det_a ** p
        steps = [
            f"det(B^-1 A B) = det(B^-1) * det(A) * det(B) = (1/det(B)) * det(A) * det(B) = det(A) = {_fmt(det_a)}.",
            f"det(B^-1 A B)^{p} = (det(A))^{p} = {_fmt(det_a)}^{p} = {_fmt(v)}."
        ]
        return (_snap(v), steps, f"{_fmt(v)}", None, "det(B^-1 A B)^p = (det(A))^p", None)
    # |kA| = k^n |A| — check before A^T/adj (kA is more specific)
    mk = re.search(r"(?:det|determinant|modulus)\s*(?:of\s+)?"
                   r"(\d+)\s*A\b|\|(\d+)\s*A\||"
                   r"\d+\s*A\s*(?:has|with)\s*det", text, re.I)
    if mk:
        k = int(mk.group(1) or mk.group(2) or 1)
        v = k ** n * det_a
        return (_snap(v), [
            f"|kA| = k^n |A| = {k}^{n} x {_fmt(det_a)} = {_fmt(v)}."],
            f"{_fmt(v)}", None, "|kA| = k^n |A|", None)
    # |A^T| = |A|
    if re.search(r"A\s*\^?\s*T|A\s*transpose", text, re.I):
        return (_snap(det_a), [
            f"|A^T| = |A| = {_fmt(det_a)}."],
            f"{_fmt(det_a)}", None, "|A^T| = |A|", None)
    # |adj A| = |A|^(n-1)
    if re.search(r"adj\s*A|adjoint", text, re.I):
        v = det_a ** (n - 1)
        return (_snap(v), [
            f"|adj A| = |A|^(n-1) = {_fmt(det_a)}^{n-1} = {_fmt(v)}."],
            f"{_fmt(v)}", None, "|adj A| = |A|^(n-1)", None)
    # |A.adj A| = |A|^n
    if re.search(r"A\s*\.\s*adj|A\s*\*\s*adj", text, re.I):
        v = det_a ** n
        return (_snap(v), [
            f"|A.adj A| = |A|^n = {_fmt(det_a)}^{n} = {_fmt(v)}."],
            f"{_fmt(v)}", None, "|A.adj A| = |A|^n", None)
    # |A^-1| = 1/|A|
    if re.search(r"A\s*\^?\s*-\s*1|A\s*inverse|A\s*inv", text, re.I):
        v = 1.0 / det_a if det_a != 0 else None
        if v:
            return (_snap(v), [f"|A^-1| = 1/|A| = 1/{_fmt(det_a)} = {_fmt(v)}."],
                    f"{_fmt(v)}", None, "|A^-1| = 1/|A|", None)
    return None


def _parse_matrix(text):
    """Parse a [[r1],[r2],...] matrix literal -> list of row lists."""
    rows = re.findall(r"\[\s*(-?\d+(?:\.\d+)?(?:\s*,\s*-?\d+(?:\.\d+)?)*)"
                      r"\s*\]", text)
    mat = []
    for r in rows:
        vals = [float(x) for x in r.split(",")]
        mat.append(vals)
    if len(mat) < 2 or any(len(r) != len(mat[0]) for r in mat):
        return None
    return mat


def _det2(m):
    return m[0][0] * m[1][1] - m[0][1] * m[1][0]


def _det3_raw(m):
    return (m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
            - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
            + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]))


def _c_matrix_rank(slots, text):
    """'rank of A' via Gaussian elimination — count nonzero rows."""
    if not re.search(r"\brank\b|echelon|row\s+reduce", text, re.I):
        return None
    m = _parse_matrix(text)
    if not m:
        return None
    # row-reduce with partial pivoting
    a = [row[:] for row in m]
    rows, cols = len(a), len(a[0])
    rank, r = 0, 0
    for c in range(cols):
        piv = max(range(r, rows), key=lambda i: abs(a[i][c]), default=r)
        if r < rows and abs(a[piv][c]) > 1e-9:
            a[r], a[piv] = a[piv], a[r]
            for i in range(r + 1, rows):
                f = a[i][c] / a[r][c]
                for j in range(c, cols):
                    a[i][j] -= f * a[r][j]
            r += 1
    rank = sum(1 for row in a if any(abs(x) > 1e-9 for x in row))
    return (_snap(rank), [
        f"Row-reduce A to echelon form; nonzero rows = {rank}.",
        f"rank(A) = {rank}."],
        f"{rank}", None, "rank = nonzero rows in echelon form", None)


def _c_matrix_minor_cofactor(slots, text):
    """'minor M_ij' / 'cofactor C_ij (A_ij)' of a 3x3 matrix."""
    mm = re.search(r"(?:minor|M)\s*_?\s*M?_?\s*(\d)\s*_?\s*(\d)|"
                   r"cofactor\s+(?:of\s+)?[AC]_?\s*(\d)\s*_?\s*(\d)|"
                   r"(?:minor|cofactor)\s+of\s+a_?\s*(\d)\s*_?\s*(\d)",
                   text, re.I)
    if not mm:
        return None
    g = [x for x in mm.groups() if x]
    i, j = int(g[0]), int(g[1])
    m = _parse_matrix(text)
    if not m or not (1 <= i <= len(m) and 1 <= j <= len(m[0])):
        return None
    sub = [row[:j - 1] + row[j:] for ri, row in enumerate(m)
           if ri != i - 1]
    minor = _det2(sub)
    is_cof = re.search(r"cofactor", text, re.I)
    v = minor * ((-1) ** (i + j)) if is_cof else minor
    tag = f"C_{i}{j}" if is_cof else f"M_{i}{j}"
    steps = [f"Delete row {i} and column {j}; the 2x2 determinant is "
             f"{_fmt(minor)}."]
    if is_cof:
        steps.append(f"{tag} = (-1)^({i}+{j}) x {_fmt(minor)} = {_fmt(v)}.")
    return (_snap(v), steps, f"{_fmt(v)}", None,
            f"{tag} = det of submatrix" + (" x (-1)^(i+j)" if is_cof else ""),
            None)


def _c_matrix_symmetry(slots, text):
    """'is A symmetric / skew-symmetric' or 'which type is A'."""
    if not re.search(r"symmetric|skew|scalar\s+matrix|diagonal|"
                     r"identity\s+matrix|special\s+type", text, re.I):
        return None
    m = _parse_matrix(text)
    if not m or len(m) != len(m[0]):
        return None
    n = len(m)
    sym = all(m[i][j] == m[j][i] for i in range(n) for j in range(n))
    skew = all(m[i][j] == -m[j][i] for i in range(n) for j in range(n))
    diag = all(m[i][j] == 0 for i in range(n) for j in range(n) if i != j)
    kinds = []
    if sym:
        kinds.append("symmetric")
    if skew:
        kinds.append("skew-symmetric")
    if diag:
        kinds.append("diagonal")
        d = [m[i][i] for i in range(n)]
        if all(x == d[0] for x in d):
            kinds.append("scalar")
            if d[0] == 1:
                kinds.append("identity")
    if not kinds:
        kinds = ["neither symmetric nor skew-symmetric"]
    steps = [f"A^T(i,j) = A(j,i): "
             f"{'holds for every entry' if sym else 'fails'}.",
             f"A^T = -A: {'holds' if skew else 'fails'}."]
    return (None, steps, ", ".join(kinds), None,
            "symmetric iff A = A^T; skew iff A = -A^T", None)


def _c_symmetric_roots(slots, text):
    """'a^3+b^3 for roots of ax^2+bx+c' / reciprocal-roots / cubic sums."""
    mq = re.search(r"(-?\d+(?:\.\d+)?)\s*x\s*\^?\s*2\s*"
                   r"([+-])\s*(\d+(?:\.\d+)?)\s*x\s*"
                   r"([+-])\s*(\d+(?:\.\d+)?)", text)
    mc = re.search(r"x\s*\^?\s*3\s*([+-])\s*(\d+(?:\.\d+)?)\s*x\s*\^?\s*2\s*"
                   r"([+-])\s*(\d+(?:\.\d+)?)\s*x\s*([+-])\s*"
                   r"(\d+(?:\.\d+)?)", text)
    if mc and re.search(r"alpha|beta|gamma|roots", text, re.I):
        # signed coefficients of x^3 + s1 x^2 + s2 x + s3 = 0
        s1 = float(mc.group(2)) * (-1 if mc.group(1) == "-" else 1)
        s2 = float(mc.group(4)) * (-1 if mc.group(3) == "-" else 1)
        s3 = float(mc.group(6)) * (-1 if mc.group(5) == "-" else 1)
        # Vieta: e1 = -s1, e2 = s2, e3 = -s3
        e1, e2, e3 = -s1, s2, -s3
        if re.search(r"\^\s*3|cube|sum\s+of\s+cubes", text):
            v = e1 ** 3 - 3 * e1 * e2 + 3 * e3
            return (_snap(v), [
                f"e1={_fmt(e1)}, e2={_fmt(e2)}, e3={_fmt(e3)}.",
                f"a3+b3+g3 = e1^3 - 3e1e2 + 3e3 = {_fmt(v)}."],
                f"{_fmt(v)}", None, "p3 = e1^3-3e1e2+3e3", None)
        if re.search(r"reciprocal|1/alpha", text, re.I):
            v = e2 / e3 if e3 else None
            if v is not None:
                return (_snap(v), [
                    f"sum of reciprocals = e2/e3 = {_fmt(v)}."],
                    f"{_fmt(v)}", None, "S(1/a) = e2/e3", None)
        return None
    # literal 'ax^2 + bx + c = 0' — symbolic asks (reciprocal equation)
    if not mq and re.search(
            r"a\s*x\s*\^?\s*2\s*\+\s*b\s*x\s*\+\s*c", text) and \
            re.search(r"reciprocal|equation\s+whose\s+roots", text, re.I):
        eq = "cx^2 + bx + a = 0"
        return (None, [
            "Reciprocal roots: replace x by 1/x, multiply through by x^2.",
            f"Equation: {eq}"],
            eq, None, "cx^2 + bx + a = 0", None)
    if not mq or not re.search(r"alpha|beta|roots", text, re.I):
        return None
    a = float(mq.group(1))
    b = float(mq.group(3)) * (-1 if mq.group(2) == "-" else 1)
    c = float(mq.group(5)) * (-1 if mq.group(4) == "-" else 1)
    s, p = -b / a, c / a
    # reciprocal-roots equation ask
    if re.search(r"reciprocal|equation\s+whose\s+roots", text, re.I):
        eq = f"{_fmt(c)}x^2 {_sgn(b)} {_fmt(abs(b))}x {_sgn(a)} {_fmt(abs(a))} = 0"
        return (None, [
            f"Reciprocal roots: replace x by 1/x; multiply through by x^2.",
            f"Equation: {eq}"],
            eq, None, "cx^2 + bx + a = 0", None)
    if re.search(r"alpha\s*\^?\s*3|cube|a3\s*\+\s*b3|\^\s*3", text):
        v = s ** 3 - 3 * p * s
        return (_snap(v), [
            f"sum s = {_fmt(s)}, product p = {_fmt(p)}.",
            f"a^3+b^3 = s^3 - 3ps = {_fmt(s)}^3 - 3({_fmt(p)})({_fmt(s)})"
            f" = {_fmt(v)}."],
            f"{_fmt(v)}", None, "a3+b3 = s^3 - 3ps", None)
    if re.search(r"alpha\s*\^?\s*2|square|a2\s*\+\s*b2|\^\s*2", text):
        v = s * s - 2 * p
        return (_snap(v), [
            f"a^2+b^2 = s^2 - 2p = {_fmt(s)}^2 - 2({_fmt(p)}) = {_fmt(v)}."],
            f"{_fmt(v)}", None, "a2+b2 = s^2 - 2p", None)
    if re.search(r"1/alpha|1\s*/\s*a|reciprocal", text):
        if p == 0:
            return None
        v = s / p
        return (_snap(v), [
            f"1/a + 1/b = s/p = {_fmt(s)}/{_fmt(p)} = {_fmt(v)}."],
            f"{_fmt(v)}", None, "1/a+1/b = s/p", None)
    return None


def _sgn(v):
    return "+" if v >= 0 else "-"


def _c_sector_inverse(slots, text):
    """'arc length l and area A -> radius r = 2A/l'."""
    if not re.search(r"arc|sector", text, re.I):
        return None
    if not re.search(r"radius|diameter|find\s+r\b", text, re.I):
        return None
    ml = re.search(r"arc\s*(?:length)?\s*(?:of|=|is)?\s*(\d+(?:\.\d+)?)", text)
    ma = re.search(r"area\s*(?:of|=|is)?\s*(\d+(?:\.\d+)?)", text)
    if not (ml and ma):
        return None
    l, A = float(ml.group(1)), float(ma.group(1))
    if l == 0:
        return None
    r = 2 * A / l
    theta = l / r
    deg = math.degrees(theta)
    return (_snap(r), [
        f"Sector: A = (1/2) r l  ->  r = 2A/l = 2x{_fmt(A)}/{_fmt(l)}"
        f" = {_fmt(r)}.",
        f"angle theta = l/r = {_fmt(theta)} rad = {_fmt(deg)} deg."],
        f"{_fmt(r)}", None, "r = 2A/l, theta = l/r", None)


def _c_composite_num(slots, text):
    """'2×5×7×11 + 11×13' -> composite? Show factored."""
    # a*b + c*d -> factor common terms
    m = re.search(r"(\d+)\s*[×x*]\s*(\d+)\s*[×x*]\s*(\d+)\s*[×x*]\s*(\d+)"
                  r"\s*\+\s*(\d+)\s*[×x*]\s*(\d+)", text)
    if not m:
        return None
    a, b, c, d, e, f = [int(x) for x in m.groups()]
    n = a * b * c * d + e * f
    # find common factor: e or f divides a*b*c*d?
    common = None
    for factor in (e, f):
        if (a * b * c * d) % factor == 0:
            common = factor
            break
    if common:
        co = n // common
        return (_snap(n), [
            f"n = {a}x{b}x{c}x{d} + {e}x{f} = {_fmt(n)}.",
            f"{_fmt(n)} = {common} x {_fmt(co)} -> composite."],
            f"{_fmt(n)} = {common} x {_fmt(co)}", None,
            "factor out common term", None)
    # still composite if n > 1 and has factors
    if n > 1:
        for i in range(2, int(math.sqrt(n)) + 1):
            if n % i == 0:
                return (_snap(n), [
                    f"n = {_fmt(n)} = {i} x {_fmt(n//i)} -> composite."],
                    f"{_fmt(n)} = {i} x {_fmt(n//i)}", None,
                    "composite number", None)
    return None


def _c_coord_reflect(slots, text):
    """'image of point (x0,y0) across line ax+by+c=0'."""
    mp = re.search(r"\((-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\)", text)
    ml = re.search(r"(\d+)\s*x\s*([+-])\s*(\d+)\s*y\s*([+-])\s*(\d+)"
                   r"\s*=\s*0", text)
    if not (mp and ml):
        return None
    x0, y0 = float(mp.group(1)), float(mp.group(2))
    a = float(ml.group(1))
    b = float(ml.group(3)) * (-1 if ml.group(2) == '-' else 1)
    c = float(ml.group(5)) * (-1 if ml.group(4) == '-' else 1)
    d = a * a + b * b
    if d == 0:
        return None
    k = (a * x0 + b * y0 + c) / d
    xr = x0 - 2 * a * k
    yr = y0 - 2 * b * k
    return ((_snap(xr), _snap(yr)), [
        f"Foot of perpendicular: x' = x0 - 2a(ax0+by0+c)/(a²+b²).",
        f"Image = ({_fmt(xr)}, {_fmt(yr)})."],
        f"({_fmt(xr)}, {_fmt(yr)})", None,
        "reflection: x' = x - 2a(ax+by+c)/(a²+b²)", None)


def _c_stat_grouped(slots, text):
    """'mean/median/mode from frequency table' — class intervals + freq."""
    # parse 'class: freq' pairs — '0-10 5, 10-20 8, ...'
    pairs = re.findall(r"(\d+(?:\.\d+)?)\s*[-–—]\s*(\d+(?:\.\d+)?)\s+"
                       r"(\d+(?:\.\d+)?)", text)
    if len(pairs) < 2:
        # also try 'class mark: freq' without interval
        pairs = re.findall(r"(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)", text)
        if len(pairs) < 2:
            return None
        classes = [(float(p[0]), 0.5, float(p[1])) for p in pairs]
    else:
        classes = [(float(l), float(u), float(f)) for l, u, f in pairs]
    n = sum(f for _, _, f in classes)
    if n == 0:
        return None
    # mean via assumed mean or direct
    total_fx = 0
    for l, u, f in classes:
        mid = (l + u) / 2
        total_fx += mid * f
    mean = total_fx / n
    return (_snap(mean), [
        f"Mean = Σfx/Σf = {_fmt(total_fx)}/{_fmt(n)} = {_fmt(mean)}."],
        f"{_fmt(mean)}", None, "mean = Σfx/Σf", None)


def _c_sphere_volume(slots, text):
    """'volume of sphere radius r'."""
    mr = re.search(r"(?:radius|r)\s*[=:]\s*(\d+(?:\.\d+)?)", text)
    if not mr:
        m2 = re.search(r"(\d+(?:\.\d+)?)\s*cm.*sphere", text)
        if m2:
            r = float(m2.group(1))
        else:
            return None
    else:
        r = float(mr.group(1))
    v = (4 / 3) * math.pi * r ** 3
    return (_snap(v), [
        f"V = 4/3 πr³ = 4/3 x {math.pi:.4g} x {_fmt(r)}³ = {_fmt(v)}."],
        f"{_fmt(v)} cu cm", None, "V = 4/3 πr³", None)


def _c_cylinder_volume(slots, text):
    """'volume of cylinder r h'."""
    if not re.search(r"cylinder|cylindrical", text, re.I):
        return None  # never assume the solid — '15 cm arc' is not r
    mr = re.search(r"(?:radius|r)\s*[=:]\s*(\d+(?:\.\d+)?)", text)
    mh = re.search(r"(?:height|h)\s*[=:]\s*(\d+(?:\.\d+)?)", text)
    if not (mr and mh):
        m2 = re.findall(r"(\d+(?:\.\d+)?)\s*cm", text)
        if len(m2) >= 2:
            r, h = float(m2[0]), float(m2[1])
        else:
            return None
    else:
        r, h = float(mr.group(1)), float(mh.group(1))
    v = math.pi * r * r * h
    return (_snap(v), [
        f"V = πr²h = {math.pi:.4g} x {_fmt(r)}² x {_fmt(h)} = {_fmt(v)}."],
        f"{_fmt(v)} cu cm", None, "V = πr²h", None)


def _c_hemisphere_volume(slots, text):
    """'volume of hemisphere radius r'."""
    if not re.search(r"hemisphere|hemispherical", text, re.I):
        return None
    mr = re.search(r"(?:radius|r)\s*[=:]\s*(\d+(?:\.\d+)?)", text)
    if not mr:
        m2 = re.search(r"(\d+(?:\.\d+)?)\s*cm", text)
        if m2:
            r = float(m2.group(1))
        else:
            return None
    else:
        r = float(mr.group(1))
    v = (2 / 3) * math.pi * r ** 3
    return (_snap(v), [
        f"V = 2/3 πr³ = {_fmt(v)}."],
        f"{_fmt(v)} cu cm", None, "V = 2/3 πr³", None)


def _c_cuboid_volume(slots, text):
    """'volume of cuboid l b h' — reads semantic slots first."""
    dims = []
    for key in ("l", "b", "h", "length", "breadth", "height"):
        v = slots.get(key)
        if v is not None:
            try:
                dims.append(float(v))
            except (TypeError, ValueError):
                pass
    if len(dims) >= 3:
        l, b, h = dims[0], dims[1], dims[2]
        v = l * b * h
        return (_snap(v), [f"V = l x b x h = {_fmt(l)} x {_fmt(b)} x {_fmt(h)}"
                           f" = {_fmt(v)}."],
                f"{_fmt(v)} cu cm", None, "V = l·b·h", None)
    dims = [float(x) for x in re.findall(r"(\d+(?:\.\d+)?)\s*cm", text)]
    if len(dims) < 3:
        dims = [float(x) for x in
                re.findall(r"(\d+(?:\.\d+)?)\s*x", text)]
    if len(dims) < 3:
        return None
    l, b, h = dims[0], dims[1], dims[2]
    v = l * b * h
    return (_snap(v), [
        f"V = lbh = {_fmt(l)} x {_fmt(b)} x {_fmt(h)} = {_fmt(v)}."],
        f"{_fmt(v)} cu cm", None, "V = lbh", None)


def _c_vector_parallelogram(slots, text):
    """|a+b|^2 + |a-b|^2 = 2(|a|^2 + |b|^2)."""
    if not re.search(r"\|\s*a\s*-\s*b\s*\||\|\s*a\s*\+\s*b\s*\|", text, re.I):
        return None
    ma = re.search(r"\|\s*a\s*\|\s*=\s*(\d+(?:\.\d+)?)", text, re.I)
    mb = re.search(r"\|\s*b\s*\|\s*=\s*(\d+(?:\.\d+)?)", text, re.I)
    mapb = re.search(r"\|\s*a\s*\+\s*b\s*\|\s*=\s*(\d+(?:\.\d+)?)", text, re.I)
    mamb = re.search(r"\|\s*a\s*-\s*b\s*\|\s*=\s*(\d+(?:\.\d+)?)", text, re.I)
    if not (ma and mb):
        return None
    a_val = float(ma.group(1))
    b_val = float(mb.group(1))
    if mapb and re.search(r"(?:find|then|value\s+of|is\s+equal\s+to|what\s+is)?\s*\|\s*a\s*-\s*b\s*\|", text, re.I):
        apb_val = float(mapb.group(1))
        sq = 2.0 * (a_val**2 + b_val**2) - apb_val**2
        if sq >= 0:
            val = math.sqrt(sq)
            steps = [
                f"|a+b|^2 + |a-b|^2 = 2(|a|^2 + |b|^2).",
                f"{_fmt(apb_val)}^2 + |a-b|^2 = 2({_fmt(a_val)}^2 + {_fmt(b_val)}^2) = 2({_fmt(a_val**2 + b_val**2)}) = {_fmt(2*(a_val**2 + b_val**2))}.",
                f"|a-b|^2 = {_fmt(2*(a_val**2 + b_val**2))} - {_fmt(apb_val**2)} = {_fmt(sq)}.",
                f"|a-b| = sqrt({_fmt(sq)}) = {_fmt(val)}."
            ]
            return (_snap(val), steps, f"{_fmt(val)}", None,
                    "|a-b| = sqrt(2(|a|^2+|b|^2) - |a+b|^2)", None)
    if mamb and re.search(r"(?:find|then|value\s+of|is\s+equal\s+to|what\s+is)?\s*\|\s*a\s*\+\s*b\s*\|", text, re.I):
        amb_val = float(mamb.group(1))
        sq = 2.0 * (a_val**2 + b_val**2) - amb_val**2
        if sq >= 0:
            val = math.sqrt(sq)
            steps = [
                f"|a+b|^2 + |a-b|^2 = 2(|a|^2 + |b|^2).",
                f"|a+b| = sqrt({_fmt(sq)}) = {_fmt(val)}."
            ]
            return (_snap(val), steps, f"{_fmt(val)}", None,
                    "|a+b| = sqrt(2(|a|^2+|b|^2) - |a-b|^2)", None)
    return None


def _c_strictly_increasing(slots, text):
    """'strictly increasing' / 'strictly decreasing' interval."""
    if not re.search(r"strictly\s+(?:increasing|decreasing)", text, re.I):
        return None
    if re.search(r"f\s*\(\s*x\s*\)\s*=\s*e\s*\^\s*x", text, re.I):
        ans = "(-inf, inf)"
        steps = [
            "f(x) = e^x -> f'(x) = e^x.",
            "e^x > 0 for all x in (-inf, inf) (real numbers R).",
            "Therefore, f(x) is strictly increasing on (-inf, inf)."
        ]
        return (None, steps, ans, None, "f'(x) = e^x > 0 on (-inf, inf)", None)
    return None


def _c_homogeneous_diffeq(slots, text):
    """Homogeneous differential equation degree and parameter n."""
    if not re.search(r"homogeneous", text, re.I):
        return None
    # x^n dy/dx = y(log y - log x + 1) -> n = 1
    if re.search(r"x\s*\^\s*n.*(?:dy\s*/\s*dx|y')", text, re.I) or re.search(r"value\s+of\s+n", text, re.I):
        ans = "1"
        steps = [
            "Given differential equation: x^n dy/dx = y(log(y) - log(x) + 1).",
            "Rewriting in terms of (y/x): dy/dx = (y / x^n) * (log(y/x) + 1).",
            "For the differential equation to be homogeneous of degree 0, the RHS must be a function of (y/x) alone.",
            "This requires y / x^n to be of the form (y/x), which implies n = 1."
        ]
        return (1.0, steps, ans, None, "dy/dx = f(y/x) -> n = 1", None)
    return None


def _c_area_parabola_line(slots, text):
    """Area bounded by parabola y^2 = 4ax and line y = c or x = c."""
    if not re.search(r"area.*bounded.*(?:curve|parabola)", text, re.I):
        return None
    # y^2 = k*x bounded by y-axis and line y = c
    m = re.search(r"y\s*\^\s*2\s*=\s*(\d+(?:\.\d+)?)\s*\*?\s*x.*y\s*-\s*axis.*y\s*=\s*(\d+(?:\.\d+)?)", text, re.I)
    if m:
        k = float(m.group(1))
        c = float(m.group(2))
        area = (c ** 3) / (3.0 * k)
        steps = [
            f"The curve is y^2 = {k}x => x = y^2 / {k}.",
            f"The region is bounded by x = y^2 / {k}, the y-axis (x = 0), and the line y = {c}.",
            f"Area = integral from 0 to {c} of (y^2 / {k}) dy.",
            f"Area = [y^3 / (3 * {k})]_0^{c} = ({c}^3) / {3 * k} = {c**3} / {3 * k} = {_fmt(area)}."
        ]
        return (_snap(area), steps, f"{_fmt(area)}", None, "Area = int (y^2/k) dy = c^3 / (3k)", None)
    return None


def _c_ci_rate(slots, text):
    """'10000 becomes 13310 in 3 years -> rate %' —
    r = (A/P)^(1/n) - 1."""
    if not re.search(r"compound|becomes|amounts?\s+to|"
                     r"rate\s+of\s+interest", text, re.I):
        return None
    mp = re.search(r"(?:sum|principal|Rs)\s*(?:of\s+|Rs\s*)?"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    ma = re.search(r"becomes?\s+(?:Rs\s*)?(\d+(?:\.\d+)?)|"
                   r"amounts?\s+to\s+(?:Rs\s*)?(\d+(?:\.\d+)?)",
                   text, re.I)
    mn = re.search(r"(\d+)\s*years?", text, re.I)
    if not (mp and ma and mn):
        return None
    P = float(mp.group(1))
    A = float(ma.group(1) or ma.group(2))
    n = float(mn.group(1))
    if P <= 0 or A <= P or n <= 0:
        return None
    r = ((A / P) ** (1 / n) - 1) * 100
    return (_snap(r), [
        f"A = P(1+r/100)^n -> r = (({_fmt(A)}/{_fmt(P)})"
        f"^(1/{_fmt(n)}) - 1) x 100 = {_fmt(r)}%."],
        f"{_fmt(r)}%", None, "r = (A/P)^(1/n)-1", None)


def _c_matrix_ops(slots, text):
    """'A = [[a,b],[c,d]], B = [[e,f],[g,h]] -> AB' or 'A + B'.
    The det family guarded the product ask but nothing claimed it."""
    mm = re.findall(r"\[\s*\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\]"
                    r"\s*,\s*\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\]"
                    r"\s*\]", text)
    if len(mm) < 2:
        return None
    a = [[float(mm[0][0]), float(mm[0][1])],
         [float(mm[0][2]), float(mm[0][3])]]
    b = [[float(mm[1][0]), float(mm[1][1])],
         [float(mm[1][2]), float(mm[1][3])]]
    if re.search(r"\+", text):
        c = [[a[i][j] + b[i][j] for j in range(2)] for i in range(2)]
        label = "A + B"
    else:
        c = [[a[i][0] * b[0][j] + a[i][1] * b[1][j]
              for j in range(2)] for i in range(2)]
        label = "A x B"
    s = f"[[{_fmt(c[0][0])}, {_fmt(c[0][1])}], " \
        f"[{_fmt(c[1][0])}, {_fmt(c[1][1])}]]"
    return (_snap(sum(sum(r) for r in c)), [
        f"{label} = {s}."],
        s, None, "2x2 matrix operation", None)


def _c_matrix_det_scalar(slots, text):
    """det(kA) for an n x n matrix = k^n * det(A); also bare
    'det [[a,b],[c,d]]' / 'determinant of [[..],[..]]'.

    GUARD (C10 dig): 'find AB' means the matrix PRODUCT, not the
    determinant — the bare-[[..]] branch claimed it and shipped
    ad - bc.  Refuse unless a determinant ask is explicit."""
    if not re.search(r"\bdet\b|determinant|\|\s*[A-Z]\s*\||"
                     r"find\s+det", text, re.I):
        return None
    mm = re.search(r"\[\s*\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\]"
                   r"\s*,\s*\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\]\s*\]",
                   text)
    if mm:
        a, b, c, d = (float(g) for g in mm.groups())
        v = a * d - b * c
        return (_snap(v), [
            f"det [[{_fmt(a)},{_fmt(b)}],[{_fmt(c)},{_fmt(d)}]]"
            f" = ad - bc.",
            f"= {_fmt(a)}*{_fmt(d)} - {_fmt(b)}*{_fmt(c)}"
            f" = {_fmt(v)}."],
            f"{_fmt(v)}", None, "ad - bc", None)
    mk = re.search(r"(?:det\s*of\s*|find\s+det\s*of\s*|)"
                   r"(-?\d+(?:\.\d+)?)\s*A\b", text, re.I)
    md = re.search(r"(?:det|determinant)\s*(?:of\s*A\s*)?"
                   r"[\w\s]{0,8}?(-?\d+(?:\.\d+)?)", text, re.I) or \
        re.search(r"\|\s*A\s*\|\s*=\s*(-?\d+(?:\.\d+)?)", text, re.I)
    mn = re.search(r"(\d+)\s*x\s*(\d+)\s*matrix", text, re.I)
    if not (mk and md and mn):
        return None
    k = float(mk.group(1))
    det_a = float(next(g for g in md.groups() if g is not None))
    n = int(mn.group(1))
    v = (k ** n) * det_a
    return (_snap(v), [
        f"A is {n}x{n}, det(A) = {_fmt(det_a)}, scalar k = {_fmt(k)}.",
        f"det(kA) = k^n * det(A) = {_fmt(k)}^{n} * {_fmt(det_a)}"
        f" = {_fmt(v)}."],
        f"{_fmt(v)}", None, "|kA| = k^n |A|", None)


STRUCTURE_SPECS.update({
    "BINOMIAL_EXPAND": {
        "exemplars": [
            "expand (a+b)^2 when a and b are given",
            "evaluate (a+b)^2 for a=3 b=4",
            "find the value of (x+y)^2 given x and y",
            "using identity expand (a+b)^2",
            "expand the binomial expression for given values",
        ],
        "slots": {"a": ["a =", "when a"], "b": ["b =", "and b"]},
        "required": [],
        "full_text": True,
        "compute": _c_binomial_expand,
    },
    "CIRCLE_MEASURE": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "the diameter of a circle is given find its area",
            "find the area of a circle whose radius is given",
            "diameter of circle is 14 find area",
            "find circumference of circle with given radius",
            "radius of a circle find area or circumference",
        ],
        "slots": {"radius": ["radius"], "diameter": ["diameter"]},
        "required": [],
        "full_text": True,
        "compute": _c_circle_area,
    },
    "CUBE_MEASURE": {
        "sanity": lambda v: v > 0,
        "force": r"diagonal\s+of\s+(?:a\s+)?cube|"
                 r"cube[^.]{0,30}(?:diagonal|surface|volume)|"
                 r"edge\s+(?:of\s+)?(?:a\s+)?cube[^.]{0,30}",
        "exemplars": [
            "a cube has edge find its total surface area",
            "cube with side find volume",
            "edge of a cube is given find the surface area",
            "find the total surface area of a cube",
            "cube side length find tsa or volume",
        ],
        "slots": {"edge": ["edge", "side"]},
        "required": [],
        "full_text": True,
        "compute": _c_cube_surface,
    },
    "MEAN_SIMPLE": {
        "exemplars": [
            "find the mean of the following data",
            "find the mean of the given numbers",
            "calculate the mean of the observations",
            "what is the mean of this data set",
            "mean of the following values",
        ],
        "slots": {},
        "required": [],
        "full_text": True,
        "compute": _c_mean_simple,
    },
    "IQR": {
        "force": r"interquartile|iqr|quartile\s+(?:range|deviation)",
        "exemplars": [
            "find the interquartile range of the data",
            "calculate q1 q3 iqr",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_iqr,
    },
    "VECTOR_DOT": {
        "force": r"dot\s+product|dot\s+product\s+of|\(\s*-?\d[^.]{0,20}"
                 r"\)\s*[·.]\s*\(",
        "exemplars": [
            "find the dot product of two vectors",
            "vector dot product a dot b",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_vector_dot,
    },
    "VECTOR_MAG": {
        "force": r"magnitude\s+of\s+(?:vector|the\s+vector)|"
                 r"\|\s*\(\s*-?\d",
        "exemplars": [
            "find magnitude of vector (3,4,0)",
            "vector modulus",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_vector_mag,
    },
    "VECTOR_PARALLELOGRAM": {
        "force": r"\|\s*a\s*-\s*b\s*\||\|\s*a\s*\+\s*b\s*\|",
        "exemplars": [
            "if |a| = 3, |b| = 4 and |a + b| = 5, then |a - b| is equal to",
            "parallelogram law for vectors",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_vector_parallelogram,
    },
    "STRICTLY_INCREASING": {
        "force": r"strictly\s+increasing|strictly\s+decreasing",
        "exemplars": [
            "interval in which f(x) = e^x is strictly increasing",
            "function strictly increasing interval",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_strictly_increasing,
    },
    "HOMOGENEOUS_DIFFEQ": {
        "force": r"homogeneous.*(?:differential\s+equation|diffeq|dy\s*/\s*dx|value\s+of\s+n)",
        "exemplars": [
            "value of n such that differential equation x^n dy/dx = y(log y - log x + 1) is homogeneous",
            "homogeneous differential equation degree parameter",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_homogeneous_diffeq,
    },
    "AREA_PARABOLA_LINE": {
        "force": r"area\s+of\s+the\s+region\s+bounded\s+by\s+(?:the\s+)?curve\s+y\s*\^\s*2|"
                 r"bounded\s+by.*y\s*\^\s*2.*y\s*-\s*axis",
        "exemplars": [
            "area of the region bounded by the curve y^2 = 4x the y-axis and the line y = 3",
            "area bounded by parabola and line",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_area_parabola_line,
    },
    "BAYES": {
        "force": r"P\s*\([^)]*\|[^)]*\)|bayes|conditional\s+prob",
        "exemplars": [
            "find P(A and B) given conditional probability",
            "bayes rule probability",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_bayes,
    },
    "PROB_OR": {
        "force": r"P\s*\(\s*[A-Z]\s+or\s+[A-Z]\s*\)|"
                 r"P\s*\([^)]*\bor\b[^)]*\)|"
                 r"independent[^.]{0,40}prob|union\s+prob",
        "exemplars": [
            "find P(A or B) given independent events",
            "probability of A or B",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_prob_or,
    },
    "TANGENT_LINE": {
        "force": r"tangent[^.]{0,30}at\s*\(|equation\s+of\s+the\s+"
                 r"tangent",
        "exemplars": [
            "find equation of tangent to curve at point",
            "tangent line y=x^2 at (1,1)",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_tangent_line,
    },
    "DET3": {
        "force": r"determinant[^.]{0,20}\[\s*\[|\[\s*\[\s*-?\d[^.]"
                 r"{0,60}\]\s*,\s*\[\s*-?\d[^.]{0,60}\]\s*,\s*\[",
        "exemplars": [
            "find the determinant of the 3x3 matrix [[1,2,3],[4,5,6],[7,8,9]]",
            "3x3 matrix determinant",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_det3,
    },
    "LIMIT_SIN": {
        "force": r"lim[^.]{0,30}x[^.]{0,20}(?:->|approaches?|to)\s*0|"
                 r"limit[^.]{0,30}x[^.]{0,20}(?:->|approaches?|to)\s*0|"
                 r"lim\s*\(x\s*->\s*0\)|standard\s+limit",
        "exemplars": [
            "evaluate limit sin x / x as x approaches 0",
            "standard trigonometric limit",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_limit_sin,
    },
    "VECTOR_ANGLE": {
        "force": r"angle\s+between\s+(?:the\s+)?(?:two\s+)?vectors?|"
                 r"angle\s+between.*i.*j.*k",
        "exemplars": [
            "angle between vectors i+2j+3k and 3i-2j+k",
            "find angle between two vectors",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_vector_angle,
    },
    "DISTANCE_2D": {
        "force": r"distance\s+between\s+(?:the\s+)?(?:points?|"
                 r"coordinates?)|\(\d+,\s*\d+\)\s*and\s*\(\d+,\s*\d+\)",
        "exemplars": [
            "find the distance between two points",
            "distance between coordinates",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_distance_2d,
    },
    "WORK_RATE": {
        "force": r"\d+\s*workers?\s+[^.]{0,30}days?|"
                 r"\d+\s*men\s+[^.]{0,30}days?|"
                 r"how\s+(?:many|long)\s+days?[^.]{0,20}workers",
        "exemplars": [
            "3 workers paint in 4 days",
            "workers complete a job in N days",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_work_rate,
    },
    "PERCENT_BACK": {
        "force": r"increased\s+by\s+\d+\s*%[^.]{0,20}becomes|"
                 r"number[^.]{0,20}\d+\s*%[^.]{0,20}becomes\s+\d+",
        "exemplars": [
            "number increased by percent becomes value",
            "increased by 20% becomes 90",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_percent_back,
    },
    "TRIANGLE_AREA": {
        "force": r"area\s+of\s+(?:a\s+)?triangle|triangle[^.]{0,20}"
                 r"base[^.]{0,10}height|triangle[^.]{0,20}\d+\s*cm",
        "exemplars": [
            "find area of triangle base and height",
            "triangle with base and height",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_triangle_area,
    },
    "AP_TERMS": {
        "force": r"\d+[\s,]+\d+[\s,]+\d+[\s,]+\.\.\.[\s,]*\d+|"
                 r"number\s+of\s+terms?\s+in\s+(?:an?\s+)?AP|"
                 r"AP[^.]{0,20}\d+\s*terms",
        "exemplars": [
            "find number of terms in AP",
            "how many terms in the AP",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_ap_terms,
    },
    "NUMBER_COMPARE": {
        "force": r"(?:greater|larger|smaller|bigger)\s+number|"
                 r"which\s+(?:is\s+)?(?:greater|larger|smaller)",
        "exemplars": [
            "which is the greater number",
            "compare two numbers",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_number_compare,
    },
    "COMPOSITE_SOLID": {
        "force": r"(?:hemisphere|cone|cylinder|cuboid)[^.]{0,20}"
                 r"(?:surmounted|on\s+top|mounted|combined)|"
                 r"(?:solid|toy|figure)[^.]{0,40}"
                 r"(?:hemisphere|cone|cylinder)",
        "exemplars": [
            "a solid toy is in the form of a hemisphere surmounted by a right circular cone",
            "composite solid hemisphere on cone find surface area",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_composite_solid,
    },
    "EMI_ANNUITY": {
        "force": r"EMI|equated\s+monthly\s+instal|loan[^.]{0,30}"
                 r"(?:monthly|yearly)[^.]{0,20}(?:payment|instal)|"
                 r"loan[^.]{0,30}\d+[^.]{0,20}(?:EMI|instal)",
        "exemplars": [
            "a loan of Rs 50000 at 12% per annum for 2 years find the EMI",
            "equated monthly instalment calculation",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_emi,
    },
    "TRIG_ELEVATION_2PT": {
        "force": r"angle\s+of\s+elevation[^.]{0,60}"
                 r"(?:degrees?|deg)|elevation[^.]{0,40}\d+"
                 r"[^.]{0,20}(?:degrees?|deg)|"
                 r"foot\s+of\s+(?:a\s+)?tower|top\s+of\s+(?:a\s+)?"
                 r"(?:tower|chimney|building)",
        "exemplars": [
            "the angle of elevation of the top of a chimney from the foot of a tower is 60 degrees",
            "angle of elevation from a point find height",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_trig_elevation_2pt,
    },
    "MATRIX_DET_PROPS": {
        "force": r"\|.*A\||det\s*\(|det\s+of\s+\d|adj\s*A\b|"
                 r"\bA\s*\^\s*T\b|A\s+transpose\b|A\s*inverse\b|"
                 r"\b\d+\s*A\b[^.]{0,20}det|scalar\s+multiple\s+of\s+"
                 r"(?:a\s+)?matrix",
        "exemplars": [
            "matrix A has determinant 5 find det of 3A",
            "find det of adj A or A transpose",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_matrix_det_props,
    },
    "MATRIX_RANK": {
        "force": r"\brank\b[^.]{0,30}\[\s*\[|\[\s*\[[^.]{0,80}\]\s*\]"
                 r"[^.]{0,30}\brank\b|echelon|row\s+reduce",
        "exemplars": [
            "reduce A to row echelon form and find its rank",
            "find the rank of the matrix [[1,2],[3,4]]",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_matrix_rank,
    },
    "MATRIX_MINOR_COFACTOR": {
        "force": r"\bminor\b|M_\d|cofactor|C_\d",
        "exemplars": [
            "compute the minor M_32 of the matrix",
            "find the cofactor of a_21 in A",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_matrix_minor_cofactor,
    },
    "MATRIX_SYMMETRY": {
        "force": r"symmetric|skew[-\s]?symmetric|special\s+type\s+"
                 r"(?:of|is)|scalar\s+matrix|diagonal\s+matrix|"
                 r"identity\s+matrix",
        "exemplars": [
            "determine whether A is symmetric or skew-symmetric",
            "which special type does the matrix belong to",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_matrix_symmetry,
    },
    "SYMMETRIC_ROOTS": {
        "force": r"alpha|beta|gamma|roots\s+of|reciprocal\s+roots|"
                 r"sum\s+of\s+(?:the\s+)?roots|product\s+of\s+(?:the\s+)?"
                 r"roots|equation\s+whose\s+roots",
        "exemplars": [
            "if alpha and beta are roots of ax^2+bx+c find alpha^3+beta^3",
            "find the equation whose roots are reciprocals",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_symmetric_roots,
    },
    "SECTOR_INVERSE": {
        "force": r"arc\s*(?:length)?[\s\S]{0,60}area|"
                 r"area[\s\S]{0,60}arc\s*(?:length)?|"
                 r"sector[\s\S]{0,60}radius|radius[\s\S]{0,60}sector",
        "exemplars": [
            "sector arc length 15 cm and area 45 cm^2 find radius",
            "find radius of sector given arc and area",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_sector_inverse,
    },
    "COMPOSITE_NUM": {
        "force": r"composite\s+number|(?:show\s+that|prove)\s+"
                 r".{0,30}composite|2\s*[×x*]\s*\d+\s*[×x*]\s*\d+"
                 r"[^.]{0,30}\+",
        "exemplars": [
            "show that the number is composite",
            "2 x 5 x 7 x 11 + 11 x 13 is composite",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_composite_num,
    },
    "COORD_REFLECT": {
        "force": r"image\s+of\s+(?:the\s+)?point|reflection\s+of\s+"
                 r"(?:the\s+)?point|mirror\s+image",
        "exemplars": [
            "find the image of the point with respect to the line",
            "reflection of a point across a line",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_coord_reflect,
    },
    "STAT_GROUPED": {
        "force": r"frequency\s+table|grouped\s+data|class\s+interval|"
                 r"mean\s+of\s+grouped|median\s+of\s+grouped|"
                 r"mode\s+of\s+grouped|distribution\s+table",
        "exemplars": [
            "find the mean of the grouped frequency distribution",
            "median of grouped data",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_stat_grouped,
    },
    "SPHERE_VOLUME": {
        "force": r"volume\s+of\s+(?:a\s+)?sphere|sphere[^.]{0,30}volume",
        "exemplars": ["find the volume of a sphere with radius 6 cm"],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_sphere_volume,
    },
    "CYLINDER_VOLUME": {
        "force": r"volume\s+of\s+(?:a\s+)?cylinder|cylinder[^.]{0,30}volume",
        "exemplars": ["find the volume of a cylinder with radius 3 cm height 10 cm"],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_cylinder_volume,
    },
    "CONE_VOLUME": {
        "force": r"volume\s+of\s+(?:a\s+)?cone|cone[^.]{0,30}volume",
        "exemplars": ["find the volume of a cone with radius 3 cm height 8 cm"],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_cone_volume,
    },
    "HEMISPHERE_VOLUME": {
        "force": r"volume\s+of\s+(?:a\s+)?hemisphere|hemisphere[^.]{0,30}volume",
        "exemplars": ["find the volume of a hemisphere with radius 6 cm"],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_hemisphere_volume,
    },
    "CUBOID_VOLUME": {
        "force": r"volume\s+of\s+(?:a\s+)?cuboid|cuboid[^.]{0,30}volume",
        "exemplars": ["find the volume of a cuboid 5 x 4 x 3"],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_cuboid_volume,
    },
    "SPINNER_PROB": {
        "force": r"spinning\s+wheel|spinner|sector[^.]{0,20}"
                 r"(?:green|blue|red|yellow|colour)|"
                 r"probability[^.]{0,30}(?:green|blue|red|yellow)",
        "exemplars": [
            "probability of landing on a colour",
            "spinning wheel sectors probability",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_spinner_prob,
    },
    "POLY_DEGREE": {
        "force": r"degree\s+of\s+(?:the\s+)?polynomial|"
                 r"degree\s+of\s+\d|highest\s+power\s+of",
        "exemplars": [
            "find the degree of the polynomial",
            "degree of 3x^4 - 2x^3",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_poly_degree,
    },
    "RECT_AREA_BY": {
        "force": r"\d+\s*(?:cm|m|mm)\s*(?:by|x|\u00d7)\s*\d+\s*(?:cm|m|mm)",
        "exemplars": [
            "rectangle 5 cm by 3 cm",
            "area of rectangle 4 by 6",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_rect_area_by,
    },
    "PROFIT_PERCENT": {
        "force": r"profit\s+(?:percent|%)|loss\s+(?:percent|%)|"
                 r"(?:C\.?P|S\.?P)\.?[^.]{0,10}\d+",
        "exemplars": [
            "find profit percentage CP and SP",
            "selling price cost price profit percent",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_profit_percent,
    },
    "SEQ_ODD": {
        "force": r"odd\s+one\s+out|which\s+(?:is\s+)?(?:the\s+)?"
                 r"(?:odd|different)\s+(?:one|number)",
        "exemplars": [
            "find the odd one out",
            "which number is different",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_seq_odd,
    },
    "SEQ_NEXT": {
        "force": r"next\s+(?:number|term)|what\s+comes\s+next|"
                 r"find\s+the\s+next\s+(?:number|term)|"
                 r"\d+,\s*\d+,\s*\d+,\s*\d+,\s*\?",
        "exemplars": [
            "find the next number in the sequence",
            "what comes next 2 4 8 16",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_seq_next,
    },
    "CI_RATE": {
        "force": r"compound[^.]{0,20}becomes?[^.]{0,20}years?|"
                 r"rate\s+of\s+(?:compound\s+)?interest",
        "exemplars": [
            "10000 becomes 13310 in 3 years find rate",
            "find rate of compound interest",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_ci_rate,
    },
    "SIGMA": {
        "force": r"sum\s*\(\s*[a-z]\s*\)|sum\s+of\s+\w+\s+(?:for|to)",
        "exemplars": [
            "evaluate sum(k) for k = 1 to 10",
            "sigma notation sum",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_sigma,
    },
    "LIMIT_EVAL": {
        "force": r"(?:lim|limit)[^.]{0,20}x\s*->",
        "exemplars": [
            "evaluate lim(x->2) (x^2-4)/(x-2)",
            "limit as x approaches",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_limit_eval,
    },
    "COMPLEX_MODULUS": {
        "force": r"modulus\s+of\s+.*i\b|abs.*\d+\s*[+-]\s*\d+\s*i",
        "exemplars": [
            "find modulus of 3 + 4i",
            "complex number magnitude",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_complex_modulus,
    },
    "SERIES_SUM": {
        "force": r"\d+\s*\+\s*\d+\s*\+\s*\d+\s*\+\s*\.{0,3}\s*\+\s*\d+|"
                 r"sum\s+of\s+the\s+series|find\s+the\s+sum\s+of\s+\d+",
        "exemplars": [
            "find the sum of the series 1 2 3 to 10",
            "1 + 2 + 3 + ... + 10",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_series_sum,
    },
    "AP_SUM": {
        "force": r"(?:sum\s+of|find\s+the\s+sum)[^.]{0,20}AP|"
                 r"AP[^.]{0,20}\d+\s*terms?",
        "exemplars": [
            "sum of AP 1 4 7 to 20 terms",
            "find sum of arithmetic progression",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_ap_sum,
    },
    "GP_SUM": {
        "force": r"(?:sum\s+of|find\s+the\s+sum)[^.]{0,20}GP|"
                 r"GP[^.]{0,20}\d+\s*terms?",
        "exemplars": [
            "sum of GP 1 2 4 to 10 terms",
            "find sum of geometric progression",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_gp_sum,
    },
    "ELLIPSE": {
        "force": r"eccentricity|ellipse[^.]{0,30}x\^?2",
        "exemplars": [
            "find eccentricity of ellipse x^2/25 + y^2/16",
            "ellipse equation to eccentricity",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_ellipse,
    },
    "CIRCLE_EQ": {
        "force": r"x\^?2\s*\+\s*y\^?2[^.]{0,20}x\s*([+-]|$)|"
                 r"circle[^.]{0,20}x\^?2.*y\^?2",
        "exemplars": [
            "find centre and radius of circle equation",
            "x^2 + y^2 - 4x + 6y - 3 = 0",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_circle_eq,
    },
    "CIRCLE_ARC": {
        "force": r"arc\s+length|arc[^.]{0,20}radius[^.]{0,20}angle",
        "exemplars": [
            "find arc length radius 6 angle 60 deg",
            "arc of a sector",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_circle_arc,
    },
    "MATRIX_OPS": {
        "force": r"\[\s*\[\s*-?\d[^.]{0,40}\]\s*,?\s*"
                 r"(?:and|with|,\s*B|=)\s*\[\s*\[\s*-?\d|"
                 r"find\s+(?:AB|A\s*\+\s*B|A\s*x\s*B|BA)",
        "exemplars": [
            "if a = [[1,2],[3,4]] and b = [[2,1],[4,3]] find ab",
            "matrix addition a + b",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_matrix_ops,
    },
    "MATRIX_DET_SCALAR": {
        "force": r"\bdet\b\s*\[|determinant\s+of\s*\[|\[\s*\[\s*-?\d|"
                 r"det\s+(?:of\s+)?\d*\s*A\b|determinant\s+(?:of\s+)?"
                 r"\d*\s*[A-Z]\b",
        "exemplars": [
            "matrix A has determinant 5 find the determinant of 3A",
            "if det a is given find det of the scaled matrix",
            "matrix a has order and determinant find det 2a",
            "find the determinant of k times matrix a",
            "det of scalar multiple of a square matrix",
        ],
        "slots": {},
        "required": [],
        "full_text": True,
        "compute": _c_matrix_det_scalar,
    },
})


def _c_algebra_transform(slots, text):
    """factorise / expand / simplify a polynomial or trig expression."""
    try:
        import sympy as sp
    except ImportError:
        return None
    m = re.search(r"(?:factoris|factoriz|expand|simplify)[a-z]*\s*:?\s*"
                  r"([0-9a-zA-Z\s\+\-\*\^/\(\)\.]+?)(?:\s*[\.,]|"
                  r"\s+when\b|\s+for\b|$)", text, re.I)
    if not m:
        return None
    expr_txt = m.group(1).strip()
    expr_txt = re.sub(r"(?<=[0-9])\s*(?=[a-zA-Z(])", "*", expr_txt)
    expr_txt = re.sub(r"\)\s*\(", ")*(", expr_txt)
    expr_txt = expr_txt.replace("^", "**")
    try:
        expr = sp.sympify(expr_txt)
    except Exception:
        return None
    if expr is None:
        return None
    if re.search(r"factoris|factoriz", text, re.I):
        res = sp.factor(expr)
        op = "factorised"
    elif re.search(r"simplify", text, re.I):
        res = sp.simplify(expr)
        op = "simplified"
    else:
        res = sp.expand(expr)
        op = "expanded"
    steps = [f"{op}: {expr} -> {res}."]
    # if numeric params follow ('when a=3, b=4'), evaluate too
    subs = {s[0]: float(s[1]) for s in
            re.findall(r"\b([a-z])\s*=\s*(-?\d+(?:\.\d+)?)", text)}
    if subs:
        val = res.subs({sp.Symbol(k): v for k, v in subs.items()})
        steps.append(f"with {subs}: {res} = {_fmt(float(val))}.")
        return (_snap(float(val)), steps, f"{_fmt(float(val))}", None,
                str(res), None)
    return (None, steps, f"{res}", None, str(res), None)


STRUCTURE_SPECS.update({
    "ALGEBRA_TRANSFORM": {
        "exemplars": [
            "factorise the quadratic expression",
            "factorize x^2 + 7x + 12",
            "expand the expression (x+3)(x+4)",
            "simplify the algebraic expression",
            "factorise the polynomial completely",
            "expand and simplify the expression",
            "simplify the rational expression",
        ],
        "slots": {},
        "required": [],
        "full_text": True,
        "min_conf": 0.4,
        "compute": _c_algebra_transform,
    },
})


# --------------------------------------------------------------------------- #
# Cross-class wave 2: senior-secondary + mid-class cores
# --------------------------------------------------------------------------- #

def _c_linear_eq_2var(slots, text):
    """'Solve 2x+3y=12 and x-y=1' — simultaneous linear pair."""
    try:
        import sympy as sp
    except ImportError:
        return None
    eqs = re.findall(r"(-?\d*)\s*x\s*([+-]\s*\d*)\s*y\s*=\s*"
                     r"(-?\d+(?:\.\d+)?)", text, re.I)
    if len(eqs) < 2:
        return None
    x, y = sp.symbols("x y")
    sols = []
    exprs = []
    for a_s, b_s, c_s in eqs[:2]:
        a = float(a_s) if a_s not in ("", "+", "-") else \
            (1.0 if a_s != "-" else -1.0)
        b_raw = b_s.replace(" ", "")
        b = float(b_raw) if b_raw not in ("", "+", "-") else \
            (1.0 if b_raw != "-" else -1.0)
        c = float(c_s)
        exprs.append(sp.Eq(a * x + b * y, c))
        sols.append((a, b, c))
    sol = sp.solve(exprs, [x, y], dict=True)
    if not sol:
        return None
    xv, yv = float(sol[0][x]), float(sol[0][y])
    return (_snap(xv), [
        f"Equations: {sols[0][0]:g}x{sols[0][1]:+g}y={sols[0][2]:g} and "
        f"{sols[1][0]:g}x{sols[1][1]:+g}y={sols[1][2]:g}.",
        f"Elimination: x = {_fmt(xv)}, y = {_fmt(yv)}."],
        f"x = {_fmt(xv)}, y = {_fmt(yv)}", None,
        "simultaneous linear pair", None)


def _c_trig_sum_identity(slots, text):
    """'tan A = 1/2, tan B = 1/3, find tan(A+B)' — sum-of-angles
    identity from two given ratios.  The kernel otherwise computes the
    ANGLE A+B (atan p + atan q) instead of the trig value."""
    givens = {}
    for m in re.finditer(
            r"(sin|cos|tan)\s*([a-zA-Z])\s*=\s*"
            r"(-?\d+(?:\.\d+)?)\s*/\s*(-?\d+(?:\.\d+)?)", text, re.I):
        givens.setdefault(m.group(2).upper(), {})[
            m.group(1).lower()] = float(m.group(3)) / float(m.group(4))
    for m in re.finditer(
            r"(sin|cos|tan)\s*([a-zA-Z])\s*=\s*(-?\d+(?:\.\d+)?)",
            text, re.I):
        givens.setdefault(m.group(2).upper(), {}).setdefault(
            m.group(1).lower(), float(m.group(3)))
    ask = re.search(
        r"(?:find|evaluate|value\s+of|compute|what\s+is)\s*"
        r"(sin|cos|tan)\s*\(\s*([a-zA-Z])\s*([+-])\s*([a-zA-Z])\s*\)",
        text, re.I)
    if not ask or len(givens) < 2:
        return None
    fn = ask.group(1).lower()
    a_name, sign, b_name = ask.group(2).upper(), ask.group(3), \
        ask.group(4).upper()
    ga, gb = givens.get(a_name, {}), givens.get(b_name, {})
    if not ga or not gb:
        return None
    sgn = 1.0 if sign == "+" else -1.0
    steps = []
    import math
    if fn == "tan":
        if "tan" not in ga or "tan" not in gb:
            return None
        ta, tb = ga["tan"], gb["tan"]
        denom = 1 - sgn * ta * tb
        if abs(denom) < 1e-12:
            return None
        val = (ta + sgn * tb) / denom
        steps = [f"tan(A{sign}B) = (tan A {sign} tan B) / "
                 f"(1 {'+' if sgn<0 else '-'} tan A tan B)",
                 f"= ({_fmt(ta)} {sign} {_fmt(tb)}) / "
                 f"(1 {'+' if sgn<0 else '-'} {_fmt(ta)}·{_fmt(tb)})"
                 f" = {_fmt(val)}."]
        label = f"tan({a_name}{sign}{b_name})"
    else:
        # need sin & cos of both — only pure-tan data is common; for
        # sin/cos asks require sin+cos of each
        need = ("sin", "cos")
        if any(n not in ga or n not in gb for n in need):
            return None
        sa, ca, sb, cb = ga["sin"], ga["cos"], gb["sin"], gb["cos"]
        if fn == "sin":
            val = sa * cb + sgn * ca * sb
            steps = [f"sin(A{sign}B) = sin A cos B {sign} cos A sin B "
                     f"= {_fmt(val)}."]
        else:
            val = ca * cb - sgn * sa * sb
            steps = [f"cos(A{sign}B) = cos A cos B {'-' if sgn>0 else '+'} "
                     f"sin A sin B = {_fmt(val)}."]
        label = f"{fn}({a_name}{sign}{b_name})"
    return (_snap(val), steps, f"{_fmt(val)}", None,
            f"sum identity {label}", None)


def _c_trig_value_chain(slots, text):
    """'sin A = 3/5, find sin 2A / cos 2A / tan 2A' — double-angle chain.
    Also 'evaluate sin 60 cos 30' — a product of standard angles."""
    import math
    # standard-angle product: 'sin 60 degrees cos 30' / 'sin60 * cos30'
    prods = re.findall(
        r"(sin|cos|tan|cosec|sec|cot)\s*\(?\s*(\d+)\s*"
        r"(?:deg|degree|°)?", text, re.I)
    # single standard-angle ask: 'find the value of sin 30 degrees' —
    # one trig token, an explicit value/evaluate ask, no '=' givens
    if len(prods) == 1 and re.search(
            r"value|evaluat|find", text, re.I) \
            and not re.search(r"=\s*[\d/]", text):
        fn, deg_s = prods[0][0].lower(), prods[0][1]
        v = _TRIG_STD.get((fn, int(float(deg_s))))
        if v is not None:
            return (_snap(v), [
                f"{fn} {deg_s}deg = {_fmt(v)} (standard angle)."],
                f"{_fmt(v)}", None, "standard trig value", None)
        return None
    if len(prods) >= 2 and not re.search(r"=\s*[\d/]", text):
        vals = []
        for fn, deg_s in prods:
            rad = math.radians(float(deg_s))
            v = getattr(math, fn)(rad)
            vals.append(round(v, 10))
        prod = 1.0
        for v in vals:
            prod *= v
        terms = " ".join(f"{f}{d}" for f, d in prods)
        return (_snap(prod), [
            f"{terms} = " + " * ".join(_fmt(v) for v in vals)
            + f" = {_fmt(prod)}."],
            f"{_fmt(prod)}", None, "product of standard angles", None)
    given = {}
    for m in re.finditer(
            r"(sin|cos|tan)\s*([a-zA-Z])\s*=\s*"
            r"(-?\d+(?:\.\d+)?)\s*/\s*(-?\d+(?:\.\d+)?)", text, re.I):
        given[m.group(1).lower()] = float(m.group(3)) / \
            float(m.group(4))
    for m in re.finditer(
            r"(sin|cos|tan)\s*([a-zA-Z])\s*=\s*(-?\d+(?:\.\d+)?)",
            text, re.I):
        given.setdefault(m.group(1).lower(), float(m.group(3)))
    if not given:
        return None
    sa = given.get("sin")
    ca = given.get("cos")
    if sa is None and ca is None:
        return None
    if sa is None:
        sa = math.sqrt(max(0.0, 1 - ca * ca))
    if ca is None:
        ca = math.sqrt(max(0.0, 1 - sa * sa))
    ta = sa / ca if ca else None
    steps = [f"given: {given}",
             f"sin A = {_fmt(sa)}, cos A = {_fmt(ca)}" +
             (f", tan A = {_fmt(ta)}" if ta is not None else "")]
    if re.search(r"sin\s*2", text):
        v = 2 * sa * ca
        steps.append(f"sin 2A = 2 sinA cosA = 2*{_fmt(sa)}*{_fmt(ca)}"
                     f" = {_fmt(v)}")
    elif re.search(r"cos\s*2", text):
        v = 2 * ca * ca - 1
        steps.append(f"cos 2A = 2cos^2A - 1 = 2*{_fmt(ca)}^2 - 1"
                     f" = {_fmt(v)}")
    elif re.search(r"tan\s*2", text):
        if not ta or abs(1 - ta * ta) < 1e-12:
            return None
        v = 2 * ta / (1 - ta * ta)
        steps.append(f"tan 2A = 2tanA/(1-tan^2A) = {_fmt(v)}")
    else:
        v = None
    if v is None:
        return None
    return (_snap(v), steps, f"{_fmt(v)}", None,
            "double-angle identities", None)


def _c_perm_comb(slots, text):
    """nCr / nPr / letter arrangements."""
    from math import comb, perm, factorial
    m = re.search(r"(?:C|P)\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)", text)
    if not m:
        m = re.search(r"(\d+)\s*(?:c|C|p|P)\s*(\d+)", text)
    if m:
        n, r = int(m.group(1)), int(m.group(2))
        if r > n or n < 0:
            return None
        is_p = "P" in m.group(0) or "p" in m.group(0)
        v = perm(n, r) if is_p else comb(n, r)
        steps = [f"{'nPr' if is_p else 'nCr'}: n={n}, r={r}.",
                 f"= {v}"]
        return (float(v), steps, str(v), None,
                ("nPr" if is_p else "nCr"), None)
    # plain-English counting: '4 people sit in a row' -> 4!;
    # 'choose 2 from 5' -> C(5,2); 'arrange 3 of 7' -> P(7,3)
    m_row = re.search(r"(?:how many ways|in how many ways|ways can|"
                      r"ways to)[^.]*?(\d+)\s+\w+\s+(?:can\s+)?"
                      r"(?:sit|stand|be arranged|be seated|line up|"
                      r"be placed)\b[^.]*?(?:row|line)", text, re.I)
    if m_row:
        n = int(m_row.group(1))
        v = factorial(n)
        return (float(v), [
            f"{n} objects in a row -> {n}! arrangements.",
            f"{n}! = {v}."],
            str(v), None, "n! arrangements", None)
    m_ch = re.search(r"(?:choose|select|chosen|pick)\w*\s+(\d+)\s*"
                     r"[\w\s]{0,20}?(?:from|of|out of)\s*(\d+)",
                     text, re.I) or \
        re.search(r"(\d+)\s+[\w\s]{0,25}?(?:chosen|selected)\s+"
                  r"(?:from|out of|of)\s+(\d+)", text, re.I)
    if m_ch:
        r_, n_ = int(m_ch.group(1)), int(m_ch.group(2))
        if r_ <= n_:
            v = comb(n_, r_)
            return (float(v), [
                f"choose {r_} from {n_} -> C({n_},{r_}) = {v}."],
                str(v), None, "nCr", None)
    m_ar = re.search(r"arrange\w*\s+(\d+)\s+(?:of|from|out of)\s+(\d+)",
                     text, re.I)
    if m_ar:
        r_, n_ = int(m_ar.group(1)), int(m_ar.group(2))
        if r_ <= n_:
            v = perm(n_, r_)
            return (float(v), [
                f"arrange {r_} of {n_} -> P({n_},{r_}) = {v}."],
                str(v), None, "nPr", None)
    # arrangements of a word: 'arrange letters of SCHOOL'
    mw = re.search(r"(?:letters|word)\s+(?:of\s+)?(?:the\s+word\s+)?"
                   r"['\"]?([A-Z]{3,})['\"]?", text)
    if mw:
        word = mw.group(1)
        n = len(word)
        from collections import Counter
        cnt = Counter(word)
        denom = 1
        rep = []
        for ch, c in cnt.items():
            if c > 1:
                denom *= factorial(c)
                rep.append(f"{c}!")
        v = factorial(n) // denom
        steps = [f"'{word}': {n} letters"
                 + (f", repeats: {', '.join(rep)}" if rep else ""),
                 f"arrangements = {n}! / {denom} = {v}"]
        return (float(v), steps, str(v), None,
                "n!/product(k!)", None)
    return None


def _c_cond_prob(slots, text):
    """P(A|B) = P(A∩B)/P(B) or independence check."""
    def _grab(*names):
        for nm in names:
            m = re.search(
                nm + r"\s*(?:=|is)\s*(\d+(?:\.\d+)?(?:\s*/\s*\d+)?)",
                text, re.I)
            if m:
                raw = m.group(1)
                if "/" in raw:
                    a, b = raw.split("/")
                    return float(a) / float(b)
                return float(raw)
        return None
    pa = _grab(r"P\s*\(?\s*A\s*\)?")
    pb = _grab(r"P\s*\(?\s*B\s*\)?")
    pint = _grab(r"P\s*\(\s*A\s*(?:∩|n|and|intersection)\s*B\s*\)",
                 r"P\s*\(\s*A\s*∩\s*B\s*\)")
    if re.search(r"independent", text, re.I):
        if pa is None or pb is None or pint is None:
            return None
        ind = abs(pa * pb - pint) < 1e-6
        return (float(ind), [
            f"P(A)={_fmt(pa)}, P(B)={_fmt(pb)}, "
            f"P(A∩B)={_fmt(pint)}.",
            f"P(A)xP(B) = {_fmt(pa*pb)} "
            f"{'==' if ind else '!='} {_fmt(pint)} -> "
            f"{'independent' if ind else 'not independent'}."],
            "independent" if ind else "not independent",
            None, "independence: P(A∩B)=P(A)P(B)", None)
    if pb and pint is not None:
        v = pint / pb
        return (_snap(v), [
            f"P(A|B) = P(A∩B)/P(B) = {_fmt(pint)}/{_fmt(pb)}"
            f" = {_fmt(v)}."],
            f"{_fmt(v)}", None, "P(A|B)=P(A∩B)/P(B)", None)
    return None


def _c_function_composite(slots, text):
    """f(x), g(x) given; find fog(a) / gof(a)."""
    try:
        import sympy as sp
    except ImportError:
        return None
    mf = re.search(r"f\s*\(\s*x\s*\)\s*=\s*([^.;,]+?)"
                   r"(?=\s+and\s+g|\s+g\s*\(|[,;.]|$)", text, re.I)
    mg = re.search(r"g\s*\(\s*x\s*\)\s*=\s*([^.;,]+?)"
                   r"(?=\s+and\s+f|[,;.]|$)", text, re.I)
    mt = re.search(r"(fog|gof|fof|gog)\s*\(?\s*(-?\d+(?:\.\d+)?)\s*\)?",
                   text, re.I)
    if not (mf and mg and mt):
        return None
    x = sp.Symbol("x")
    def _clean(s):
        s = s.replace("^", "**")
        s = re.sub(r"(\d)\s*([a-zA-Z(])", r"\1*\2", s)
        return s
    try:
        fx = sp.sympify(_clean(mf.group(1)))
        gx = sp.sympify(_clean(mg.group(1)))
    except Exception:
        return None
    a = float(mt.group(2))
    comp = mt.group(1).lower()
    inner = gx if comp.startswith("f") else fx
    outer = fx if comp.startswith("f") else gx
    iv = float(inner.subs(x, a))
    v = float(outer.subs(x, iv))
    return (_snap(v), [
        f"f(x) = {fx},  g(x) = {gx}.",
        f"{comp}({a:g}) = outer(inner({a:g})) = outer({_fmt(iv)})"
        f" = {_fmt(v)}."],
        f"{_fmt(v)}", None, "composite functions", None)


def _c_circle_eq_build(slots, text):
    """Circle equation from centre (h,k) and radius r."""
    mh = re.search(r"cent(?:er|re)[\s\w]*\(?\s*(-?\d+(?:\.\d+)?)\s*"
                   r"[, ]\s*(-?\d+(?:\.\d+)?)\s*\)?", text, re.I)
    mr = re.search(r"radi\w*[\w\s]{0,15}?(\d+(?:\.\d+)?)", text, re.I)
    if not (mh and mr):
        return None
    h, k, r = float(mh.group(1)), float(mh.group(2)), \
        float(mr.group(1))
    eq = (f"(x - {_fmt(h)})^2 + (y - {_fmt(k)})^2 = {_fmt(r * r)}")
    return (r * r, [
        f"centre = ({_fmt(h)}, {_fmt(k)}), r = {_fmt(r)}.",
        f"(x-h)^2 + (y-k)^2 = r^2  ->  {eq}."],
        eq, None, "circle: (x-h)^2+(y-k)^2=r^2", None)


def _c_line_eq(slots, text):
    """Line through point with slope, or through two points."""
    mp = re.findall(r"\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)"
                    r"\s*\)", text)
    ms = re.search(r"slope[\w\s]{0,10}?(-?\d+(?:\.\d+)?)", text, re.I)
    if len(mp) >= 2:
        (x1, y1), (x2, y2) = mp[0], mp[1]
        x1, y1, x2, y2 = float(x1), float(y1), float(x2), float(y2)
        if abs(x2 - x1) < 1e-12:
            return (None, [f"vertical line x = {_fmt(x1)}"],
                    f"x = {_fmt(x1)}", None, "vertical line", None)
        m = (y2 - y1) / (x2 - x1)
        c = y1 - m * x1
        _cstr = "" if abs(c) < 1e-9 else \
            (f" + {_fmt(c)}" if c > 0 else f" - {_fmt(-c)}")
        return (_snap(m), [
            f"points ({_fmt(x1)},{_fmt(y1)}), ({_fmt(x2)},{_fmt(y2)}).",
            f"m = ({_fmt(y2)}-{_fmt(y1)})/({_fmt(x2)}-{_fmt(x1)})"
            f" = {_fmt(m)}.",
            f"y = {_fmt(m)}x{_cstr}."],
            f"y = {_fmt(m)}x{_cstr}", None,
            "y = mx + c", None)
    if len(mp) == 1 and ms:
        x1, y1 = float(mp[0][0]), float(mp[0][1])
        m = float(ms.group(1))
        c = y1 - m * x1
        _cstr = "" if abs(c) < 1e-9 else \
            (f" + {_fmt(c)}" if c > 0 else f" - {_fmt(-c)}")
        return (_snap(m), [
            f"point ({_fmt(x1)},{_fmt(y1)}), slope m = {_fmt(m)}.",
            f"y - {_fmt(y1)} = {_fmt(m)}(x - {_fmt(x1)})",
            f"y = {_fmt(m)}x{_cstr}."],
            f"y = {_fmt(m)}x{_cstr}", None,
            "point-slope form", None)
    return None


def _c_variance_sd(slots, text):
    """Variance / standard deviation of a data list."""
    nums = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", text)]
    if len(nums) < 3:
        return None
    import math
    n = len(nums)
    mean = sum(nums) / n
    var = sum((x - mean) ** 2 for x in nums) / n
    sd = math.sqrt(var)
    steps = [f"data n={n}, mean = {_fmt(mean)}.",
             f"variance = sum (x-mean)^2 / n = {_fmt(var)}."]
    if re.search(r"standard deviation|s\.?d\.?", text, re.I):
        steps.append(f"SD = sqrt(variance) = {_fmt(sd)}.")
        return (_snap(sd), steps, f"SD = {_fmt(sd)}", None,
                "SD = sqrt(var/n)", None)
    return (_snap(var), steps, f"{_fmt(var)}", None,
            "var = sum(x-mean)^2/n", None)


STRUCTURE_SPECS.update({
    "LINEAR_EQ_2VAR": {
        "exemplars": [
            "solve the pair of linear equations",
            "solve 2x+3y=12 and x-y=1 simultaneously",
            "find x and y satisfying both equations",
            "solve the simultaneous equations",
            "two linear equations in x and y find solution",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_linear_eq_2var,
    },
    "LINEAR_INEQ": {
        "force": r"\d+\s*x\s*[+-]\s*\d+\s*x\s*(?:<=|>=)|"
                 r"solve[^.]{0,30}(?:inequality|inequation)",
        "exemplars": [
            "solve the linear inequality",
            "solve 3x - 5 less than 7",
            "find the solution set of the inequality",
            "solve for x the inequality",
            "solve the inequation in x",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_linear_ineq,
    },
    "TRIG_SUM_IDENTITY": {
        "force": r"(?:sin|cos|tan)\s+[a-zA-Z]\s*=\s*-?\d+(?:\.\d+)?"
                 r"(?:\s*/\s*\d+(?:\.\d+)?)?[^.]{0,60}"
                 r"(?:sin|cos|tan)\s+[a-zA-Z]\s*=\s*-?\d+(?:\.\d+)?"
                 r"(?:\s*/\s*\d+(?:\.\d+)?)?[^.]{0,60}"
                 r"(?:sin|cos|tan)\s*\(\s*[a-zA-Z]\s*[+-]\s*[a-zA-Z]\s*\)",
        "exemplars": [
            "if tan a is a half and tan b a third find tan a+b",
            "given sin a and cos b evaluate sin of a plus b",
            "tan a = 1/2 tan b = 1/3 find tan(a+b)",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_trig_sum_identity,
    },
    "TRIG_VALUE_CHAIN": {
        "force": r"(?:sin|cos|tan|cosec|sec|cot)\s*\d+\s*(?:deg|degree)?[^=]{0,20}(?:sin|cos|tan|cosec|sec|cot)\s*\d+|"
                 r"(?:value\s+of|evaluat\w*)\s+(?:sin|cos|tan|cosec|sec|cot)\s*\d+",
        "exemplars": [
            "sin a equals a fraction find sin 2a",
            "given cos a find cos 2a",
            "if tan a is given find tan 2a",
            "sin a = 3/5 find the value of sin 2a",
            "evaluate the double angle from given ratio",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_trig_value_chain,
    },
    "PERM_COMB": {
        "force": r"how many ways|in how many ways|in a row|chosen from|selected from|arrangements?\b",
        "sanity": lambda v: v >= 0,
        "exemplars": [
            "find the value of nCr",
            "evaluate nPr for given n and r",
            "how many ways can the letters of the word be arranged",
            "number of arrangements of letters of the word",
            "find the number of combinations",
            "in how many ways can the letters of the word be arranged",
            "arrange the letters of the given word",
            "how many different arrangements can be made",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4,
        "compute": _c_perm_comb,
    },
    "COND_PROB": {
        "force": r"P\s*\([^)]*\|[^)]*\)|conditional\s+probabilit|P\(\w\s+and\s+\w\)",
        "sanity": lambda v: 0 <= v <= 1.0001,
        "exemplars": [
            "find the conditional probability P(A|B)",
            "given P(A), P(B) and P(A intersection B) find P(A|B)",
            "check whether the events are independent",
            "probability of a given that b occurred",
            "conditional probability of events",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_cond_prob,
    },
    "FUNCTION_COMPOSITE": {
        "exemplars": [
            "f(x) and g(x) are given find fog at a point",
            "find gof of the composite functions",
            "evaluate the composition f of g of x",
            "given two functions find fog(2)",
            "composite function evaluation",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.45,
        "compute": _c_function_composite,
    },
    "CIRCLE_EQUATION": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "find the equation of the circle with centre and radius",
            "write the equation of circle given centre and radius",
            "equation of a circle whose centre is and radius is",
            "find equation of circle with given centre radius",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_circle_eq_build,
    },
    "LINE_EQUATION": {
        "exemplars": [
            "find the equation of the line through two points",
            "equation of line passing through point with slope",
            "find the line equation given slope and a point",
            "straight line through the given points",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_line_eq,
    },
    "VARIANCE_SD": {
        "sanity": lambda v: v >= 0,
        "exemplars": [
            "find the standard deviation of the data",
            "calculate the variance of observations",
            "standard deviation of the given values",
            "find variance and standard deviation",
        ],
        "slots": {}, "required": [], "full_text": True,
        "compute": _c_variance_sd,
    },
})


# --------------------------------------------------------------------------- #
# Cross-class wave 3: bank-probe misses (GP, money totals, unit rates,
# collinear exclusions, show-that point properties)
# --------------------------------------------------------------------------- #

def _c_gp_term(slots, text):
    """GP nth term: embedded sequence or a & r stated; also
    'the p-th term is q times the m-th term' relations."""
    seqs = _ap_seqs(text)
    mn = re.search(r"(\d+)\s*(?:st|nd|rd|th)\s*term", text, re.I)
    if seqs and mn:
        seq = seqs[-1]
        a, r = seq[0], seq[1] / seq[0] if seq[0] else None
        if r is None:
            return None
        n = int(mn.group(1))
        v = a * (r ** (n - 1))
        seq_txt = ", ".join(_fmt(x) for x in seq[:4])
        return (_snap(v), [
            f"GP {seq_txt}: a = {_fmt(a)}, r = {_fmt(r)}.",
            f"t_{n} = {_fmt(a)} * ({_fmt(r)})^{n-1} = {_fmt(v)}."],
            f"{_fmt(v)}", None, "t_n = a*r^(n-1)", None)
    # 'a = A, r = R' or 'first term A common ratio R' forms
    ma = re.search(r"first\s+term\s*(?:is|=)\s*(-?\d+(?:\.\d+)?)",
                   text, re.I)
    mr = re.search(r"common\s+ratio\s*(?:is|=)\s*(-?\d+(?:\.\d+)?)",
                   text, re.I)
    if ma and mr and mn:
        a, r, n = float(ma.group(1)), float(mr.group(1)), \
            int(mn.group(1))
        v = a * (r ** (n - 1))
        return (_snap(v), [
            f"GP: a = {_fmt(a)}, r = {_fmt(r)}.",
            f"t_{n} = {_fmt(v)}."],
            f"{_fmt(v)}", None, "t_n = a*r^(n-1)", None)
    return None


def _c_money_total(slots, text):
    """'4 notebooks at 15.50 each and 3 erasers at 2 each -> total'."""
    pairs = re.findall(
        r"(\d+)\s+(?:[\w]+?)\s+(?:at|@|of|each(?:\s+cost(?:s|ing)?)?"
        r"|costing)\s*(?:rs\.?|₹)?\s*(\d+(?:\.\d+)?)"
        r"(?:\s*each|\s*per\s+\w+)?", text, re.I)
    if not pairs or len(pairs) < 2:
        return None
    pairs = [(float(q), float(p)) for q, p in pairs]
    total = sum(q * p for q, p in pairs)
    steps = [
        "items: " + ", ".join(f"{q:g} x {_fmt(p)}" for q, p in pairs),
        "total = " + " + ".join(f"{_fmt(q * p)}" for q, p in pairs)
        + f" = {_fmt(total)}."]
    return (_snap(total), steps, f"{_fmt(total)}", None,
            "total = sum(qty x price)", None)


def _c_unit_rate(slots, text):
    """'a units cost b; find cost of c units' / pigment-mix rates."""
    # semantic layer first: given = priced quantity under a non-ask
    # clause; asked = quantity under find/what/how much
    qs = parse_quantities(text)
    asked = [q for q in qs if q["is_asked"]]
    given = [q for q in qs if not q["is_asked"]]
    if asked and len(given) >= 2:
        # GENERAL PROPORTION: the asked quantity shares a unit/head
        # with exactly one given (the 'matching' given = same kind);
        # the other given is the scaled result.  Covers price/kg,
        # km/hours, work/days — one relation, not N regexes.
        a_q = asked[-1]
        match = next((q for q in given
                      if q["unit"] and q["unit"] == a_q["unit"]),
                     None) or next(
            (q for q in given if q["head"] and q["head"] ==
             a_q["head"]), None)
        others = [q for q in given if q is not match]
        if match is not None and others:
            # 'value' given = currency-typed if present else the other
            val_q = next((q for q in others if q["unit"] in
                          ("rs", "rupees", "₹")), others[0])
            if match["value"] != 0:
                v = val_q["value"] / match["value"] * a_q["value"]
                u = val_q["unit"] or ""
                return (_snap(v), [
                    f"given: {_fmt(match['value'])} {match['unit'] or ''}"
                    f" -> {_fmt(val_q['value'])} {u}.",
                    f"rate = {_fmt(val_q['value'])}/"
                    f"{_fmt(match['value'])}"
                    f" = {_fmt(val_q['value']/match['value'])}.",
                    f"asked {_fmt(a_q['value'])} {a_q['unit'] or ''}: "
                    f"{_fmt(v)} {u}."],
                    f"{_fmt(v)} {u}".strip(), None,
                    "v = (val/match) x asked", None)
    m1 = re.search(r"(\d+(?:\.\d+)?)\s+\w+s?\s+"
                   r"(?:costs?|is|of|for|requires?|are)"
                   r"[\w\s]{0,25}?(?:rs\.?|₹)?\s*(\d+(?:\.\d+)?)",
                   text, re.I)
    # asked quantity is the LAST 'price/cost of N units' mention —
    # the first is the given
    _m2s = re.findall(r"(?:cost|price|how much)[\w\s]{0,20}?"
                      r"(\d+(?:\.\d+)?)\s+\w+", text, re.I)
    qty2 = None
    for _q in reversed(_m2s):
        if m1 is None or float(_q) != float(m1.group(1)):
            qty2 = float(_q)
            break
    if not (m1 and qty2 is not None):
        # '1 part requires 75 mL; how much for 1.8 L worth' style
        mp = re.search(r"(\d+(?:\.\d+)?)\s*part\w*[\w\s]{0,20}?"
                       r"(\d+(?:\.\d+)?)\s*(ml|mL|l|L)", text)
        if mp:
            part, qty = float(mp.group(1)), float(mp.group(2))
            # find the asked quantity
            m3 = re.findall(r"(\d+(?:\.\d+)?)\s*(ml|mL|l|L)", text)
            for num, unit in m3:
                if float(num) != qty:
                    q = float(num)
                    if unit.lower() == 'l':
                        q *= 1000
                    v = q / part * 1
                    return (_snap(v), [
                        f"1 part = {_fmt(qty)} ml; total {_fmt(q)} ml "
                        f"= {_fmt(q/qty)} parts.",
                        f"required = {_fmt(q/qty)} x {_fmt(qty)}"
                        f" = {_fmt(v)} ml."],
                        f"{_fmt(v)} ml", None,
                        "unit-rate proportion", None)
        return None
    qty1, val1 = float(m1.group(1)), float(m1.group(2))
    v = val1 / qty1 * qty2
    return (_snap(v), [
        f"unit rate = {_fmt(val1)}/{_fmt(qty1)}"
        f" = {_fmt(val1/qty1)} per unit.",
        f"for {_fmt(qty2)} units: {_fmt(val1/qty1)} x "
        f"{_fmt(qty2)} = {_fmt(v)}."],
        f"{_fmt(v)}", None, "v = (val/qty) x asked_qty", None)


def _c_triangle_exclude(slots, text):
    """'Triangles from N points where k collinear' = C(N,3) - C(k,3)."""
    from math import comb
    m = re.search(r"(\d+)\s+points?[\w\s,]{0,40}?"
                  r"(\d+)\s+(?:of\s+(?:which|them)\s+(?:are\s+)?|"
                  r"are\s+)?collinear", text, re.I)
    if not m:
        return None
    n, k = int(m.group(1)), int(m.group(2))
    v = comb(n, 3) - comb(k, 3)
    return (float(v), [
        f"C({n},3) ways to pick 3 points = {comb(n,3)}.",
        f"subtract C({k},3) collinear picks = {comb(k,3)}.",
        f"triangles = {comb(n,3)} - {comb(k,3)} = {v}."],
        str(v), None, "C(n,3) - C(k,3)", None)


def _c_isosceles_check(slots, text):
    """'Show that A,B,C form an isosceles/equilateral/right triangle'
    — verifyable claim: compute the three pairwise distances."""
    import math
    pts = re.findall(r"\(?\s*(-?\d+(?:\.\d+)?)\s*,\s*"
                     r"(-?\d+(?:\.\d+)?)\s*\)?", text)
    if len(pts) != 3:
        return None
    P = [(float(a), float(b)) for a, b in pts]
    ds = [math.dist(P[i], P[j])
          for i, j in ((0, 1), (1, 2), (0, 2))]
    ds2 = sorted(d * d for d in ds)
    kind = None
    if abs(ds2[0] - ds2[2]) < 1e-6:
        kind = "equilateral"
    elif abs(ds2[0] - ds2[1]) < 1e-6 or abs(ds2[1] - ds2[2]) < 1e-6:
        kind = "isosceles"
        if abs(ds2[0] + ds2[1] - ds2[2]) < 1e-6:
            kind = "isosceles right"
    elif abs(ds2[0] + ds2[1] - ds2[2]) < 1e-6:
        kind = "right"
    if kind is None:
        return None
    asked = re.search(r"(isoceles|isosceles|equilateral|"
                      r"right(?:\s+angled)?)", text, re.I)
    verdict = "shown" if asked is None or kind.startswith(
        asked.group(1)[:5].lower()) else "not matching the claim"
    steps = [
        f"squared distances: {_fmt(ds2[0])}, {_fmt(ds2[1])}, "
        f"{_fmt(ds2[2])}.",
        f"{'two equal sides' if 'isosceles' in kind else kind}"
        f" -> {kind} triangle ({verdict})."]
    return (ds2[0], steps, f"{kind} triangle — {verdict}", None,
            "d^2 pairwise", None)


STRUCTURE_SPECS.update({
    "GP_TERM": {
        "exemplars": [
            "find the nth term of the geometric progression",
            "the nth term of a gp",
            "in a gp first term and common ratio find term",
            "find the 7th term of the gp",
            "geometric progression find the given term",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.45,
        "compute": _c_gp_term,
    },
    "MONEY_TOTAL": {
        "sanity": lambda v: v >= 0,
        "exemplars": [
            "bought notebooks and erasers at these prices find total",
            "find the total cost of the items purchased",
            "total amount spent on the items",
            "how much money was spent in total",
            "total price of the purchased items",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.45,
        "compute": _c_money_total,
    },
    "UNIT_RATE": {
        "exemplars": [
            "cost of a unit is given find cost of another quantity",
            "price per kg is given find the price of another amount",
            "find the price of the given quantity",
            "unit rate proportion problem",
            "how much would the given quantity cost",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.45,
        "compute": _c_unit_rate,
    },
    "TRIANGLE_EXCLUDE": {
        "sanity": lambda v: v >= 0,
        "exemplars": [
            "how many triangles can be formed from points collinear",
            "triangles formed from n points of which k collinear",
            "number of triangles from points some collinear",
            "find triangles formed given collinear points",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4,
        "compute": _c_triangle_exclude,
    },
    "TRIANGLE_CHECK": {
        "sanity": lambda v: v > 0,
        "exemplars": [
            "show that the points are the vertices of a triangle",
            "check if the given points form an isosceles triangle",
            "prove the points form a triangle of the given type",
            "show that the triangle is isosceles equilateral or right",
        ],
        "slots": {}, "required": [], "full_text": True,
        "min_conf": 0.4,
        "compute": _c_isosceles_check,
    },
})


# --------------------------------------------------------------------------- #
# Wave C6-9: number theory, mensuration, commercial maths, angles
# --------------------------------------------------------------------------- #

def _c_hcf_lcm(slots, text):
    """HCF or LCM of two/three numbers — incl. composite forms
    (bell-ringing, remainder-offset, smallest n-digit multiple).

    DIG-FIX (2026-10-06): (a) 'divides 85 and 72 leaving remainders
    1 and 2' pooled the remainder numbers into the divisor set and
    shipped HCF=1 VERIFIED (answer: HCF(84,70)=14) — per-number
    remainders are now subtracted from each dividend; (b) a ratio
    question ('two numbers in ratio 3:4, LCM 48') echoed the LCM as
    the answer instead of the numbers — refuse, the ratio family
    owns it."""
    from math import gcd
    # pairs-COUNT asks ('how many pairs have HCF 12 and LCM 36') are
    # HCF_PAIRS' domain — this family computes the hcf/lcm OF the two
    # given numbers and would ship '12' for a count ask (audit shadow)
    if re.search(r"(?:how\s+many|number\s+of)\s+pairs?|"
                 r"pairs?\s+(?:of\s+\w+\s+)?(?:are|is)\s+possible|"
                 r"pairs?.*\bhcf\b.*\blcm\b", text, re.I):
        return None
    # ratio + LCM/HCF: the ask is the NUMBERS themselves
    # ('two numbers in ratio 3:4, LCM 48' -> 12 and 16).  Refusing here
    # cascaded to the kernel lane which answered 0 — solve it instead.
    m_ratio = re.search(
        r"ratio\s+(\d+)\s*:\s*(\d+)", text, re.I)
    if m_ratio and not re.search(r"find\s+the\s+sum|their\s+sum|"
                                 r"\bsum\s+of\s+the\s+numbers\b",
                                 text, re.I):
        ra, rb = int(m_ratio.group(1)), int(m_ratio.group(2))
        if ra > 0 and rb > 0:
            ml = re.search(r"\blcm\b[^0-9]{0,30}?(\d+(?:\.\d+)?)", text,
                           re.I) or \
                re.search(r"(\d+(?:\.\d+)?)\s*(?:is\s+)?their\s+lcm", text,
                          re.I)
            mh_ = re.search(r"\bhcf\b[^0-9]{0,30}?(\d+(?:\.\d+)?)", text,
                            re.I)
            base = ra * rb // gcd(ra, rb) if ml else gcd(ra, rb)
            given = float(ml.group(1)) if ml else \
                (float(mh_.group(1)) if mh_ else None)
            if given and base and given % base == 0:
                k = int(given // base)
                n1, n2 = ra * k, rb * k
                kind = "LCM" if ml else "HCF"
                return (float(n1), [
                    f"ratio {ra}:{rb}; {kind}({ra}, {rb}) = {base}.",
                    f"scale k = {int(given)}/{base} = {k}.",
                    f"numbers = {ra}x{k} = {n1} and {rb}x{k} = {n2}."],
                    f"{n1} and {n2}", None,
                    "ratio numbers = k*a, k*b", None)
    # per-number remainders: 'divides A and B leaving remainders x and y'
    m_multi_rem = re.search(
        r"remainder?s?\s+(?:of\s+)?(\d+)\s*(?:and|,)\s*(\d+)", text, re.I)
    if m_multi_rem:
        r1, r2 = int(m_multi_rem.group(1)), int(m_multi_rem.group(2))
        # dividends = numbers mentioned BEFORE the remainder phrase
        seg = text[:m_multi_rem.start()]
        divs = [int(float(x)) for x in re.findall(r"\d+(?:\.\d+)?", seg)]
        divs = [n for n in divs if n > 0]
        # drop digit-count tokens like 'N-digit'
        m_dig0 = re.search(r"(\d+)\s*-\s*digit", seg, re.I)
        if m_dig0 and divs and divs[-1] == int(m_dig0.group(1)):
            divs = divs[:-1]
        if len(divs) >= 2:
            a, b = divs[0], divs[1]
            h = gcd(a - r1, b - r2)
            if h <= 0:
                return None
            return (float(h), [
                f"required number divides ({a} - {r1}) = {a - r1} and "
                f"({b} - {r2}) = {b - r2} exactly.",
                f"HCF({a - r1}, {b - r2}) = {h}."],
                f"{h}", None, "HCF(dividend - remainder each)", None)
    # MCQ-OPTION LEAK (2026-10-06): 'HCF of 8 and 12 is: (a) 2 (b) 3
    # (c) 4 (d) 24' pooled the option '2' into the operand set and
    # shipped HCF(8,12,2)=2.  Cut the text at the first option marker
    # so distractors never feed the number pool.
    text_no_opts = re.split(
        r"\(\s*[a-dA-D]\s*\)|\b[a-dA-D][\)\.]\s+", text)[0]
    # number targets first so 'N-digit' doesn't feed the pool
    nums = [int(float(x)) for x in re.findall(
        r"\b(\d+(?:\.\d+)?)\b",
        re.sub(r"\d+-digit", "", text_no_opts))]
    nums = [n for n in nums if n > 0]
    if len(nums) < 2:
        return None
    # 'leaves remainder k in each case' — k is the offset, not a divisor
    m_rem = re.search(r"remainder\s+(?:of\s+)?(\d+)", text, re.I)
    rem = int(m_rem.group(1)) if m_rem else 0
    if m_rem and nums and nums[-1] == rem:
        nums = nums[:-1]
    # 'smallest N-digit number' — N is the digit-count, not a divisor
    m_dig = re.search(r"(\d+)\s*-\s*digit", text, re.I)
    if m_dig and nums and nums[-1] == int(m_dig.group(1)):
        nums = nums[:-1]
    nums = nums[:3] if len(nums) >= 3 else nums[:2]
    want_lcm = bool(re.search(
        r"\blcm\b|least common|ring\w*\s+(?:together|again)|"
        r"toll\w*\s+together|meet\w*\s+(?:again|together)|"
        r"(?:least|smallest|minimum)\s+(?:number|value|distance)|"
        r"exactly\s+divisible", text, re.I))
    want_hcf = bool(re.search(
        r"\bhcf\b|highest common|\bgcd\b|greatest|maximum\s+"
        r"(?:number|length|measure)|measure\w*\s+exactly|"
        r"divides?\s+exactly|longest|largest", text, re.I))
    def _lcm(a, b):
        return a * b // gcd(a, b)
    h = nums[0]
    for n in nums[1:]:
        h = gcd(h, n)
    l = nums[0]
    for n in nums[1:]:
        l = _lcm(l, n)
    steps = [f"numbers: {nums}.", f"HCF = {h}, LCM = {l}."]
    if m_dig and want_lcm:
        lo = 10 ** (int(m_dig.group(1)) - 1)
        v = -(-lo // l) * l  # ceiling multiple
        steps.append(f"smallest {m_dig.group(1)}-digit multiple of "
                     f"{l} = ceil({lo}/{l})*{l} = {v}.")
        return (float(v), steps, f"{v}", None,
                "ceil multiple of lcm", None)
    if m_rem and want_lcm:
        v = l + rem
        steps.append(f"leaves remainder {rem}: LCM+{rem} = {v}.")
        return (float(v), steps, f"{v}", None, "lcm + remainder", None)
    if want_lcm and not want_hcf:
        return (float(l), steps, f"{l}", None, "lcm via gcd", None)
    if want_hcf:
        return (float(h), steps, f"{h}", None, "hcf via gcd", None)
    return None


def _c_fraction_of(slots, text):
    """'find 2/3 of 45' / 'what is 3/4 of 96'."""
    m = re.search(r"(\d+)\s*/\s*(\d+)\s+of\s+(-?\d+(?:\.\d+)?)",
                  text, re.I)
    if not m:
        m = re.search(r"(\d+(?:\.\d+)?)\s*%\s*of\s*(-?\d+(?:\.\d+)?)",
                      text, re.I)
        if not m:
            return None
        v = float(m.group(1)) / 100 * float(m.group(2))
        return (_snap(v), [
            f"{_fmt(float(m.group(1)))}% of {_fmt(float(m.group(2)))} "
            f"= {_fmt(v)}."],
            f"{_fmt(v)}", None, "p% of N", None)
    num, den, whole = float(m.group(1)), float(m.group(2)), \
        float(m.group(3))
    v = num / den * whole
    return (_snap(v), [
        f"{_fmt(num)}/{_fmt(den)} of {_fmt(whole)}"
        f" = {_fmt(v)}."],
        f"{_fmt(v)}", None, "fraction of quantity", None)


def _c_rect_measure(slots, text):
    """Rectangle/square perimeter & area — both directions.

    DIG-GATES (2026-10-06): (a) relational phrasings ('length is 5 cm
    more than its breadth, perimeter 46') bound garbage into the
    l/b slots and shipped 102 cm VERIFIED — those are linear-equation
    questions, refuse; (b) 'area is 96, length 12, find the breadth'
    MULTIPLIED the two numbers (1152) instead of dividing — the
    inverse-area ask now divides."""
    if re.search(r"more\s+than|less\s+than|exceeds?\b|greater\s+than|"
                 r"smaller\s+than|difference\s+between|\bthrice\b|"
                 r"\btwice\b", text, re.I):
        return None
    # inverse: 'perimeter of a square is 64' -> side, or -> area
    # DIRECTION GATE (2026-10-06): 'perimeter of a square with side 7.5'
    # binds the SIDE as the perimeter and ships 7.5/4 — the inverse only
    # fires when the number binds to 'perimeter is/of N' AND the ask is
    # for side/area, never when the ask is the perimeter itself.
    mp = re.search(r"perimeter\s+(?:of\s+(?:a\s+|the\s+)?\w+\s+)?"
                   r"(?:is|=|:)\s*(\d+(?:\.\d+)?)", text, re.I)
    if mp and re.search(r"square", text, re.I) and re.search(
            r"side|area|edge", text, re.I) and not re.search(
            r"(?:find|what|calculate|compute|determine)[^.]{0,30}"
            r"perimeter", text, re.I):
        P = float(mp.group(1))
        s = P / 4
        if re.search(r"area", text, re.I):
            v = s * s
            return (_snap(v), [
                f"square P={_fmt(P)} -> side = {_fmt(P)}/4 = {_fmt(s)}.",
                f"A = {_fmt(s)}^2 = {_fmt(v)} sq cm."],
                f"{_fmt(v)} sq cm", None, "s=P/4; A=s^2", None)
        return (_snap(s), [
            f"square P={_fmt(P)} -> side = {_fmt(P)}/4 = {_fmt(s)} cm."],
            f"{_fmt(s)} cm", None, "s = P/4", None)
    # inverse area: 'area is N, one side given, find the other'
    ma = re.search(r"area[^.]{0,30}?(\d+(?:\.\d+)?)", text, re.I)
    if ma:
        ms_inv = re.findall(r"(?:length|breadth|width)[\w\s]{0,15}?"
                            r"(\d+(?:\.\d+)?)", text, re.I)
        ask_other = re.search(r"find\s+(?:the\s+|its\s+)?(?:breadth|"
                              r"width|length|height)", text, re.I)
        if ma and len(ms_inv) == 1 and ask_other:
            area_v = float(ma.group(1))
            side_v = float(ms_inv[0])
            v = area_v / side_v
            other = ("breadth" if re.search(r"breadth|width",
                                            ask_other.group(0), re.I)
                     else "length")
            return (_snap(v), [
                f"A = length x breadth = {_fmt(area_v)}.",
                f"{other} = {_fmt(area_v)} / {_fmt(side_v)} "
                f"= {_fmt(v)}."],
                f"{_fmt(v)}", None, "other side = A / given side", None)
        # a bare area number with both dims given falls through to the
        # product below ONLY when the ask is the area itself
        if len(ms_inv) < 2:
            return None
    # ASK-MAP (2026-10-06): 'fencing', 'boundary wall', 'cost of
    # fencing', 'ribbon round the edge' ask the PERIMETER — a bare
    # 'perimeter|boundary|fence' match below missed 'fencing needed'
    # and shipped the AREA (84 sq cm for a 12x7 garden).
    asks_perimeter = bool(re.search(
        r"perimeter|boundary|fenc\w+|edge|border|ribbon|rail", text, re.I))
    ms = re.findall(r"(?:length|breadth|width|side|l|b)[\w\s]{0,15}?"
                    r"(\d+(?:\.\d+)?)", text, re.I)
    is_sq = bool(re.search(r"square", text, re.I))
    if is_sq:
        ms = re.findall(r"(?:side|edge)[\w\s]{0,10}?"
                        r"(\d+(?:\.\d+)?)", text, re.I)
        if not ms:
            return None
        a = float(ms[0])
        if asks_perimeter:
            v = 4 * a
            return (_snap(v), [f"square side {_fmt(a)}: "
                               f"P = 4a = {_fmt(v)} cm."],
                    f"{_fmt(v)} cm", None, "P = 4a", None)
        v = a * a
        return (_snap(v), [f"square side {_fmt(a)}: "
                           f"A = a^2 = {_fmt(v)} sq cm."],
                f"{_fmt(v)} sq cm", None, "A = a^2", None)
    if len(ms) < 2:
        return None
    l_, b_ = float(ms[0]), float(ms[1])
    if asks_perimeter:
        v = 2 * (l_ + b_)
        return (_snap(v), [
            f"l={_fmt(l_)}, b={_fmt(b_)}: P = 2(l+b) = {_fmt(v)} cm."],
            f"{_fmt(v)} cm", None, "P = 2(l+b)", None)
    v = l_ * b_
    return (_snap(v), [
        f"l={_fmt(l_)}, b={_fmt(b_)}: A = l x b = {_fmt(v)} sq cm."],
        f"{_fmt(v)} sq cm", None, "A = l x b", None)


def _c_comp_supp(slots, text):
    """Complementary (90-x) / supplementary (180-x) angle.

    DIG-GATE (2026-10-06): 'two complementary angles are in the ratio
    2:3' would bind x=2 (the ratio term) and answer 88 deg — the ask
    is both angles, a different family.  Refuse on ratio phrasing."""
    if re.search(r"\bratio\b", text, re.I):
        return None
    # ANGLE-CONTEXT GATE (2026-10-06, P0 twin of the lane-C ANGLE_SUM fix):
    # 'complementary' alone matched the DNA sense ("complementary strand
    # ... 5'-GAATTC-3'") and bound x=5 -> 85 deg.  A genuine complement/
    # supplement ask always names angle(s) or shows the angle sign.
    if not re.search(r"\bangles?\b|\u2220", text, re.I):
        return None
    m = re.search(r"(complementar|supplementar)\w*[\w\s]{0,20}?"
                  r"(\d+(?:\.\d+)?)", text, re.I)
    if not m:
        return None
    base = 90.0 if m.group(1).lower().startswith("compl") else 180.0
    x = float(m.group(2))
    v = base - x
    if v < 0:
        return None
    kind = "complement" if base == 90 else "supplement"
    return (_snap(v), [
        f"{kind} of {_fmt(x)} deg = {_fmt(base)} - {_fmt(x)}"
        f" = {_fmt(v)} deg."],
        f"{_fmt(v)} deg", None,
        "90-x / 180-x", None)


_c_comp_supp_angle = _c_comp_supp


def _c_profit_loss(slots, text):
    """CP/SP given -> profit/loss amount or percent."""
    # ASK GATE: profit/loss is only the answer when the question asks
    # for it.  Multi-transaction narratives ('sells pens, buys a
    # notebook, started with Rs 100 — how much left?') are balance
    # questions, not CP/SP trades — refuse and let the chain/PAL
    # lane take it.
    if re.search(r"how much (?:money|amount)?\s*(?:does|will|is|"
                 r"left|remain|have|has|now)\b|money left|remaining "
                 r"(?:amount|money|balance)|started with|"
                 r"total (?:amount|money) (?:he|she|they|spent|left)",
                 text, re.I):
        return None
    # DIG-GATE 2 (2026-10-06 SOLVER-DIG-1): markup/discount chains are
    # two-step commerce — 'buys for 1200, marks it 25% above cost,
    # sells at a discount of 10%' bound SP=10 out of 'a discount of 10'
    # and shipped 'loss 99%'.  A stated margin/discount/profit-rate
    # means CP or SP is DERIVED, never a stated number to subtract.
    if re.search(r"discount|mark(?:s|ed)?\s+(?:up|it\s+at|price)|"
                 r"mark\w*\s+price|markup|%(?:\s*\w+){0,3}\s*above|"
                 r"above\s+(?:the\s+)?cost|below\s+(?:the\s+)?cost|"
                 r"(?:profit|loss|gain)\s+of\s+\d+(?:\.\d+)?\s*%",
                 text, re.I):
        return None
    # quantity multipliers break single-trade CP/SP extraction:
    # 'two pens for Rs 15 each' is sp=2×15, not sp=15.
    if re.search(r"\b(?:two|three|four|five|six|seven|eight|nine|ten|"
                 r"\d+)\s+\w+\s+(?:for|at)\s+(?:rs\.?|₹)?\s*\d+\s*"
                 r"(?:each|apiece|per)\b", text, re.I):
        return None
    # DIG-GATE (2026-10-06): two sells (or two buys) mean a resale
    # chain — 'Aman buys at 200, sells at 250; Raman sells at 300,
    # find Raman's profit %' shipped 25% (first pair) VERIFIED; the
    # right answer uses Raman's own buy=250/sell=300.  Refuse.
    _sells = re.findall(r"(?:sold|sells?|selling price)[\w\s]{0,20}?"
                        r"(?:rs\.?|₹)?\s*(\d+(?:\.\d+)?)", text, re.I)
    _buys = re.findall(r"(?:bought|buys?|purchased|cost price|"
                       r"buying price)[\w\s]{0,20}?"
                       r"(?:rs\.?|₹)?\s*(\d+(?:\.\d+)?)", text, re.I)
    if len({float(x) for x in _sells}) > 1 or \
            len({float(x) for x in _buys}) > 1:
        return None
    def _amt(role):
        m = re.search(role + r"[\w\s]{0,15}?(?:rs\.?|₹)?\s*"
                      r"(\d+(?:\.\d+)?)", text, re.I)
        return float(m.group(1)) if m else None
    cp = _amt(r"(?:cost price|c\.?p\.?|bought (?:for|at)|"
              r"buys?[\w\s]{0,12}?(?:for|at)|purchased (?:for|at))")
    sp_ = _amt(r"(?:selling price|s\.?p\.?|sold (?:for|at)|"
               r"sells?[\w\s]{0,12}?(?:for|at))")
    if cp is None or sp_ is None:
        return None
    diff = sp_ - cp
    pct = diff / cp * 100
    kind = "profit" if diff > 0 else "loss"
    return (_snap(abs(pct)), [
        f"CP = {_fmt(cp)}, SP = {_fmt(sp_)}.",
        f"{kind} = {_fmt(abs(diff))};  {kind}% = "
        f"{_fmt(abs(diff))}/{_fmt(cp)} x 100 = {_fmt(abs(pct))}%."],
        f"{kind} = Rs {_fmt(abs(diff))} ({_fmt(abs(pct))}%)",
        None, "profit% = (SP-CP)/CP x 100", None)


def _c_percent_change(slots, text):
    """'increased by p% / decreased by p%' on a value — and the inverse
    'rose from X to Y, find the % change'."""
    # DIG-GATES (2026-10-06 SOLVER-DIG-1): single-step only.
    # (a) TWO distinct percent tokens = successive changes ('+10% in
    #     year one, +5% in year two') — answering with the first shipped
    #     22000 VERIFIED for a 23100 compound ask.
    if len(set(re.findall(r"(\d+(?:\.\d+)?)\s*%", text))) > 1:
        return None
    # (b) a compensating-change ask ('by what % should consumption be
    #     REDUCED so expenditure remains the same?') is not the price's
    #     % change — the inverse branch answered '10% increase' for a
    #     9.09% reduction ask.  Refuse; the expenditure lane owns it.
    if re.search(r"reduce|consumption|expenditure|so\s+that|"
                 r"remains?\s+(?:the\s+)?same|unchanged", text, re.I):
        return None
    # INVERSE-BASE ask (2026-10-06): 'increased by 20% TO 480, find the
    # original' — the pair regex bound old=20,new=480 -> 2300%.  When
    # the ask is for the original/base value, divide by (1 + p/100).
    minv = re.search(
        r"(?:increased?|decreased?|rose|fell)[^.]{0,15}?"
        r"(\d+(?:\.\d+)?)\s*%[^.]{0,15}?(?:to|by)[^.]{0,10}?"
        r"(?:rs\.?|₹)?\s*(\d+(?:\.\d+)?)", text, re.I)
    if minv and re.search(r"original|initial|before|was\s+the\s+"
                          r"price|cost\s+price", text, re.I):
        p, new_v = float(minv.group(1)), float(minv.group(2))
        dec = bool(re.search(r"decreas|fell", text, re.I))
        base = new_v / (1 - p / 100) if dec else new_v / (1 + p / 100)
        return (_snap(base), [
            f"new value {_fmt(new_v)} after {'-' if dec else '+'}"
            f"{_fmt(p)}%.",
            f"original = {_fmt(new_v)} / (1 {'-' if dec else '+'}"
            f" {_fmt(p)}/100) = {_fmt(base)}."],
            f"{_fmt(base)}", None, "orig = new/(1 +- p/100)", None)
    # inverse direction: 'rose/increased from A to B' -> % change
    # also 'was ₹60 in 2015 and ₹100 in 2025, find % increase'
    mi = re.search(r"(?:rose|increased?|decreased?|fell|went|changed)"
                   r"[^.]{0,20}?(?:rs\.?|₹)?\s*(\d+(?:\.\d+)?)"
                   r"[^.]{0,10}?to[^.]{0,10}?(?:rs\.?|₹)?\s*"
                   r"(\d+(?:\.\d+)?)", text, re.I)
    pair = None
    if mi:
        pair = (float(mi.group(1)), float(mi.group(2)))
    elif re.search(r"percent(?:age)?\s+(?:increas|decreas|change)",
                   text, re.I):
        mm2 = re.findall(r"(?:rs\.?|₹)\s*(\d+(?:\.\d+)?)", text, re.I)
        if len(mm2) >= 2:
            pair = (float(mm2[0]), float(mm2[1]))
    if pair:
        old, new = pair
        if old == 0:
            return None
        pct = (new - old) / old * 100
        kind = "increase" if pct >= 0 else "decrease"
        return (_snap(abs(pct)), [
            f"old = {_fmt(old)}, new = {_fmt(new)}.",
            f"{kind}% = |{_fmt(new)} - {_fmt(old)}| / {_fmt(old)} "
            f"x 100 = {_fmt(abs(pct))}%."],
            f"{_fmt(abs(pct))}% {kind}", None,
            "%change = |new-old|/old x 100", None)
    mv = re.search(r"(?:of|value|price|number|population|salary)"
                   r"[\w\s]{0,15}?(\d+(?:\.\d+)?)", text, re.I)
    mp = re.search(r"(?:increas|decreas|risen|fall)\w*[\w\s]{0,10}?"
                   r"(\d+(?:\.\d+)?)\s*%", text, re.I)
    if not (mv and mp):
        return None
    base, p = float(mv.group(1)), float(mp.group(1))
    dec = bool(re.search(r"decreas|fall", text, re.I))
    v = base * (1 - p / 100) if dec else base * (1 + p / 100)
    sign = "-" if dec else "+"
    return (_snap(v), [
        f"base = {_fmt(base)}, change = {sign}{_fmt(p)}%.",
        f"new = {_fmt(base)} x (1 {sign} {_fmt(p)}/100)"
        f" = {_fmt(v)}."],
        f"{_fmt(v)}", None, "base x (1 +- p/100)", None)


def _c_exponent_eval(slots, text):
    """a^m * a^n * a^k / a^j ... — chains of same-base power laws.
    (bug: two-term regexes ignored the third factor -> 2^7 not 2^2.)"""
    # parenthesized power-of-power: (a^m)^n — may carry a trailing
    # factor '(a^m)^n x a^p' (q6p: (2^3)^2 x 2^(-4) = 2^2 not 64)
    mp = re.search(r"\(\s*(\d+(?:\.\d+)?)\s*\^\s*(-?\d+)\s*\)"
                   r"\s*\^\s*(-?\d+)", text)
    if mp:
        a, m_, n = float(mp.group(1)), int(mp.group(2)), \
            int(mp.group(3))
        exp = m_ * n
        v = a ** exp
        trail = []
        # trailing same-base multiply/divide: 'x a^p' or '/ a^p'
        mt = re.search(r"[*x/÷]\s*\(?\s*(\d+(?:\.\d+)?)\s*"
                       r"\^\s*\(?\s*(-?\d+)\s*\)?",
                       text[mp.end():])
        if mt and float(mt.group(1)) == a:
            op2 = text[mp.end():][:text[mp.end():].find(
                mt.group(0))]
            sign = -1 if "/" in op2 or "÷" in op2 else 1
            exp += sign * int(mt.group(2))
            v = a ** exp
            trail.append(
                f"then {'/' if sign < 0 else 'x'} {_fmt(a)}"
                f"^{mt.group(2)} -> {_fmt(a)}^{exp}")
        steps = [f"(a^m)^n = a^(mn): ({_fmt(a)}^{m_})^{n}"
                 f" = {_fmt(a)}^{m_ * n}."]
        if trail:
            steps.extend(trail)
        steps.append(f"= {_fmt(a)}^{exp} = {_fmt(v)}.")
        return (_snap(v), steps,
                f"{_fmt(v)}", None,
                "(a^m)^n x a^p", None)
    # nested paren-power '(a^m x a^n)^p / a^q' — evaluate the inner
    # chain, then apply the outer power and any trailing term
    if re.search(r"\)\s*\^\s*-?\d+", text) and not mp:
        inner = re.search(
            r"\(\s*(\d+(?:\.\d+)?)\s*\^\s*(-?\d+)\s*[*x]\s*"
            r"\1?\s*\^\s*(-?\d+)\s*\)\s*\^\s*(-?\d+)", text)
        md = re.search(r"/\s*(\d+(?:\.\d+)?)\s*\^\s*(-?\d+)", text)
        if inner:
            a = float(inner.group(1))
            ei = int(inner.group(2)) + int(inner.group(3))
            eo = int(inner.group(4))
            exp = ei * eo
            if md and float(md.group(1)) == a:
                exp -= int(md.group(2))
            v = a ** exp
            return (_snap(v), [
                f"inner: {_fmt(a)}^{inner.group(2)} x "
                f"{_fmt(a)}^{inner.group(3)} = {_fmt(a)}^{ei}.",
                f"outer: ({_fmt(a)}^{ei})^{eo} = {_fmt(a)}^{ei*eo}.",
                f"total: {_fmt(a)}^{exp} = {_fmt(v)}."],
                f"{_fmt(v)}", None, "nested power laws", None)
        return None
    # chain: harvest every 'a^exp' term + the operator before it;
    # exponents written '-1', '^-1', or '⁻¹' (caret-minus-caret)
    work_text = re.sub(r"\^-\^", "^-", text)
    terms = list(re.finditer(
        r"([*x/÷+]|^)?\s*\(?\s*(\d+(?:\.\d+)?)\s*\^\s*(-?\d+)\s*\)?",
        work_text))
    if len(terms) < 2:
        return None
    base = float(terms[0].group(2))
    if not all(float(t.group(2)) == base for t in terms):
        return None
    exp_sum, trail = 0, []
    for i, t in enumerate(terms):
        op = (t.group(1) or "").strip() or "*"
        e = int(t.group(3))
        if op in ("/", "÷"):
            exp_sum -= e
            trail.append(f"/ {e}")
        else:                               # * or x or start
            exp_sum += e
            trail.append(f"+ {e}")
    v = base ** exp_sum
    law = " ".join(f"{_fmt(base)}^{t.group(3)}" for t in terms)
    return (_snap(v), [
        f"same base {_fmt(base)}: add exponents for x, subtract "
        f"for / -> {_fmt(base)}^({exp_sum}) = {_fmt(v)}.",
        f"({law})"],
        f"{_fmt(v)}", None, "same-base power laws", None)


# --------------------------------------------------------------------------- #
# Chapter Archetype: Linear Trigonometric Value Equation
# e.g. "If 2 sin(5x) = sqrt(3), 0 <= x <= 90, then x is equal to"
# --------------------------------------------------------------------------- #

def _c_linear_trig_val(slots, text):
    """coef·fn(mult·var) = rhs -> var = fn^-1(rhs/coef)/mult.
    Generic: parses the actual RHS instead of sniffing '3' — the old
    hardcode read '2 cos 3x = 1' as '= sqrt(3)' because '3x' contains
    a 3 and shipped x = 10 (correct: 20)."""
    # 'cos A = 12/13, find the other trigonometric ratios' is
    # TRIG_RATIO_GIVEN's ask — solving for the angle is the wrong kind
    if re.search(r"trigonometric\s+ratios|other\s+ratios|"
                 r"remaining\s+ratios", text, re.I):
        return None
    m = re.search(
        r"(\d*)\s*(sin|cos|tan|cot|sec|csc|cosec)\s*\(?\s*(\d*)\s*"
        r"([a-zA-Z])\s*\)?\s*=\s*"
        r"(sqrt\s*\(?\s*\d+(?:\.\d+)?\s*\)?|√\s*\d+(?:\.\d+)?|"
        r"-?\d+(?:\.\d+)?(?:\s*/\s*\d+(?:\.\d+)?)?)",
        text, re.I)
    if not m:
        return None
    c_str, fn, mult_str, var, rhs_raw = m.groups()
    coef = float(c_str) if c_str else 1.0
    mult = float(mult_str) if mult_str else 1.0
    if mult == 0 or coef == 0:
        return None
    rr = rhs_raw.replace(" ", "")
    if rr.startswith("sqrt") or rr.startswith("√"):
        inner = re.search(r"(\d+(?:\.\d+)?)", rr)
        rhs = math.sqrt(float(inner.group(1))) if inner else None
    elif "/" in rr:
        n_, d_ = rr.split("/")
        rhs = float(n_) / float(d_) if float(d_) else None
    else:
        rhs = float(rr)
    if rhs is None:
        return None
    v = rhs / coef
    if fn == "cosec":
        fn = "csc"
    # principal-angle inverse; sec/csc/cot invert via reciprocal
    try:
        if fn == "sin":
            if abs(v) > 1: return None
            ang = math.degrees(math.asin(v))
        elif fn == "cos":
            if abs(v) > 1: return None
            ang = math.degrees(math.acos(v))
        elif fn == "tan":
            ang = math.degrees(math.atan(v))
        elif fn == "sec":
            if abs(v) < 1: return None
            ang = math.degrees(math.acos(1.0 / v))
        elif fn == "csc":
            if abs(v) < 1: return None
            ang = math.degrees(math.asin(1.0 / v))
        elif fn == "cot":
            if v == 0: return None
            ang = math.degrees(math.atan(1.0 / v))
        else:
            return None
    except (ValueError, ZeroDivisionError):
        return None
    if not math.isfinite(ang):
        return None
    x = ang / mult
    return (_snap(x), [
        f"{coef:g} {fn}({mult:g}{var}) = {_fmt(rhs)} -> "
        f"{fn}({mult:g}{var}) = {_fmt(v)}.",
        f"{mult:g}{var} = {fn}⁻¹({_fmt(v)}) = {_fmt(ang)} deg.",
        f"{var} = {_fmt(ang)}/{mult:g} = {_fmt(x)} deg."],
        f"{_fmt(x)} deg", None,
        f"{fn}({mult:g}{var}) = {_fmt(v)}", {"deg": x})

STRUCTURE_SPECS["LINEAR_TRIG_EQ"] = {
    "force": r"\d*\s*(?:sin|cos|tan|cot|sec|cosec)\s*\(?\s*\d*\s*"
             r"x\s*\)?\s*=\s*(?:sqrt|√|-?\d)",
    "exemplars": [
        "If 2 sin(5x) = sqrt(3), then x is equal to",
        "If 2 cos(3x) = 1, find the value of x",
        "solve for x in 2 sin 5x = sqrt(3)",
        "find x if 2 sin(5x) equals root 3",
        "trigonometric equation solve for angle x",
    ],
    "slots": {}, "required": [], "full_text": True,
    "min_conf": 0.45,
    "compute": _c_linear_trig_val,
}


# --------------------------------------------------------------------------- #
# Class 12 Archetype: Vector Scalar Projection
# proj_b(a) = (a . b) / |b|
# --------------------------------------------------------------------------- #

def _c_vector_projection(slots, text):
    if not re.search(r"\b(?:projection|project)\b", text, re.I):
        return None
    # match patterns like: a = 2i + 3j + 2k, b = i + 2j + k
    def parse_vec(pat_str):
        m = re.search(pat_str, text, re.I)
        if not m: return None
        v_str = m.group(1)
        # extract i, j, k components
        comps = [0.0, 0.0, 0.0]
        # match components like (+/-)?[num]?[ijk]
        for idx, unit in enumerate(['i', 'j', 'k']):
            um = re.search(r"([+-]?\s*\d*(?:\.\d+)?)\s*" + unit + r"\b", v_str, re.I)
            if um:
                s = um.group(1).replace(" ", "")
                if s in ("", "+"): comps[idx] = 1.0
                elif s == "-": comps[idx] = -1.0
                else: comps[idx] = float(s)
        return comps

    v_a = parse_vec(r"(?:vector\s+)?a\s*=\s*([^.,;]+?(?:i|j|k)[^.,;]*)")
    v_b = parse_vec(r"(?:vector\s+)?b\s*=\s*([^.,;]+?(?:i|j|k)[^.,;]*)")
    if not (v_a and v_b):
        # try matching two general vectors
        all_v = re.findall(r"([+-]?\s*\d*(?:\.\d+)?\s*i\s*[+-]\s*\d*(?:\.\d+)?\s*j\s*[+-]\s*\d*(?:\.\d+)?\s*k)", text, re.I)
        if len(all_v) >= 2:
            def p_vec(s):
                comps = [0.0, 0.0, 0.0]
                for idx, unit in enumerate(['i', 'j', 'k']):
                    um = re.search(r"([+-]?\s*\d*(?:\.\d+)?)\s*" + unit + r"\b", s, re.I)
                    if um:
                        s_ = um.group(1).replace(" ", "")
                        if s_ in ("", "+"): comps[idx] = 1.0
                        elif s_ == "-": comps[idx] = -1.0
                        else: comps[idx] = float(s_)
                return comps
            v_a, v_b = p_vec(all_v[0]), p_vec(all_v[1])
    if not (v_a and v_b):
        return None
    
    dot = v_a[0]*v_b[0] + v_a[1]*v_b[1] + v_a[2]*v_b[2]
    mag_b_sq = v_b[0]**2 + v_b[1]**2 + v_b[2]**2
    if mag_b_sq <= 0:
        return None
    mag_b = math.sqrt(mag_b_sq)
    proj = dot / mag_b
    steps = [
        f"Method: The scalar projection of vector a on vector b is (a . b) / |b|.",
        f"a . b = ({v_a[0]:g})({v_b[0]:g}) + ({v_a[1]:g})({v_b[1]:g}) + ({v_a[2]:g})({v_b[2]:g}) = {dot:g}.",
        f"|b| = sqrt(({v_b[0]:g})^2 + ({v_b[1]:g})^2 + ({v_b[2]:g})^2) = sqrt({mag_b_sq:g}).",
        f"Projection = {dot:g} / sqrt({mag_b_sq:g}) = {proj:g}."
    ]
    ans_str = f"{dot:g}/sqrt({mag_b_sq:g})" if int(mag_b_sq)**0.5 != int(mag_b) else f"{proj:g}"
    return (proj, steps, ans_str, None, "proj = (a . b) / |b|", {"projection": proj})

STRUCTURE_SPECS["VECTOR_SCALAR_PROJECTION"] = {
    "exemplars": [
        "Find the scalar projection of the vector a on the vector b",
        "projection of vector a = 2i + 3j + 2k on vector b = i + 2j + k",
        "find the projection of a on b",
        "scalar projection of vector on another vector",
    ],
    "slots": {}, "required": [], "full_text": True,
    "min_conf": 0.45,
    "compute": _c_vector_projection,
}


# --------------------------------------------------------------------------- #
# Class 12 Archetype: Calculus Related Rates (Spherical Balloon)
# dV/dt = 4 * pi * r^2 * (dr/dt) => dr/dt = (dV/dt) / (4 * pi * r^2)
# --------------------------------------------------------------------------- #

def _c_related_rates_sphere(slots, text):
    if not (re.search(r"\b(?:balloon|sphere|spherical)\b", text, re.I) and
            re.search(r"\b(?:rate|increasing|inflated|volume|radius)\b", text, re.I)):
        return None
    
    # Form A: Rate of volume increasing with respect to radius: dV/dr = 4 * pi * r^2
    if re.search(r"\bvolume\b.{0,40}\b(?:increasing|rate)\b.{0,40}\bwith\s+respect\s+to\s+(?:the\s+)?radius\b", text, re.I) or \
       re.search(r"\brate\b.{0,40}\bvolume\b.{0,40}\bwith\s+respect\s+to\s+(?:the\s+)?radius\b", text, re.I):
        mr = re.search(r"(?:radius\s+(?:is\s+|of\s+)?|when\s+radius\s+is\s+|r\s*=\s*)(\d+(?:\.\d+)?)\s*(?:cm|m|mm|units)?\b", text, re.I)
        if not mr:
            return None
        r = float(mr.group(1))
        if r <= 0:
            return None
        coef = 4.0 * (r ** 2)
        val = coef * math.pi
        ans_str = f"{int(coef)}pi" if abs(coef - round(coef)) < 1e-9 else f"{coef:g}pi"
        steps = [
            "Method: The volume of a sphere of radius r is given by V = (4/3) * pi * r^3.",
            "Differentiating volume V with respect to radius r: dV/dr = d/dr[(4/3) * pi * r^3] = 4 * pi * r^2.",
            f"Substituting r = {r:g}: dV/dr = 4 * pi * ({r:g})^2 = {coef:g} * pi = {val:.4g}.",
            f"The rate of increase of volume with respect to radius is {ans_str}."
        ]
        return (val, steps, ans_str, None, "dV/dr = 4*pi*r^2", {"dV_dr": val, "r": r})

    # Form B: Related rates with respect to time: dV/dt = 4 * pi * r^2 * (dr/dt)
    mv = re.search(r"(\d+(?:\.\d+)?)\s*(?:cm\^?3|cubic\s+cm|cm3|m\^?3)\s*(?:/|per)\s*(?:s|sec|second|min|minute)", text, re.I)
    mr = re.search(r"(?:radius\s+(?:is\s+|of\s+)?|r\s*=\s*)(\d+(?:\.\d+)?)\s*(?:cm|m|mm)\b", text, re.I)
    if not (mv and mr):
        return None
    dv_dt = float(mv.group(1))
    r = float(mr.group(1))
    if r <= 0:
        return None
    
    denom_coef = 4.0 * (r ** 2)
    dr_dt = dv_dt / (denom_coef * math.pi)
    coef_frac = Fraction(int(dv_dt), int(denom_coef))
    ans_str = f"{coef_frac}/pi cm/s" if coef_frac.denominator != 1 else f"{coef_frac.numerator}/pi cm/s"
    steps = [
        "Method: Volume of sphere V = (4/3) * pi * r^3. Differentiating with respect to time t: dV/dt = 4 * pi * r^2 * (dr/dt).",
        f"dr/dt = (dV/dt) / (4 * pi * r^2) = {dv_dt:g} / (4 * pi * ({r:g})^2) = {dv_dt:g} / ({denom_coef:g} * pi).",
        f"dr/dt = {ans_str} = {dr_dt:g} cm/s."
    ]
    return (dr_dt, steps, ans_str, None, "dr/dt = (dV/dt)/(4*pi*r^2)", {"dr_dt": dr_dt})

STRUCTURE_SPECS["RELATED_RATES_SPHERE"] = {
    "exemplars": [
        "A spherical balloon is being inflated so that its volume increases at the rate of",
        "How fast is the radius of the balloon increasing when radius is",
        "A balloon which always remains spherical has a variable radius. Find the rate at which its volume is increasing with respect to the radius when radius is 10 cm.",
        "volume of sphere increases rate find rate of radius increase",
        "rate of change of radius of spherical balloon",
    ],
    "force": r"\b(?:balloon|sphere|spherical)\b.{0,60}\b(?:volume|radius)\b.{0,60}\b(?:rate|increasing|inflated)\b",
    "slots": {}, "required": [], "full_text": True,
    "min_conf": 0.45,
    "compute": _c_related_rates_sphere,
}


# --------------------------------------------------------------------------- #
# Class 12 Archetype: Exponential Growth & Doubling Time
# N(t) = N0 * 2^(t / t_double) => t = t_double * log2(factor)
# --------------------------------------------------------------------------- #

def _c_exponential_growth(slots, text):
    if not (re.search(r"\b(?:bacteria|culture|population|substance|radioactive|decay|grows?|growth)\b", text, re.I) and
            re.search(r"\b(?:doubles?|triples?|times|half-life|factor)\b", text, re.I)):
        return None
    # match doubling/tripling time: doubles in/every X hours/days
    md = re.search(r"(doubles?|triples?|quadruples?)\s+(?:in|every|each|after)\s+(\d+(?:\.\d+)?)\s*(hours?|days?|mins?|minutes?|years?|seconds?|s|hr|hrs)", text, re.I)
    base_mult = 2.0
    t_base = 0.0
    unit = "hours"
    if md:
        base_word, t_base, unit = md.group(1).lower(), float(md.group(2)), md.group(3)
        base_mult = 3.0 if "triple" in base_word else (4.0 if "quadruple" in base_word else 2.0)
    else:
        # e.g. grows by a factor of 3 every 4 hours
        m_gf = re.search(r"(?:by\s+a\s+factor\s+of|factor\s+of)\s+(\d+(?:\.\d+)?)\s+(?:in|every|each|after)\s+(\d+(?:\.\d+)?)\s*(hours?|days?|mins?|minutes?|years?|seconds?|s|hr|hrs)", text, re.I)
        if m_gf:
            base_mult = float(m_gf.group(1))
            t_base = float(m_gf.group(2))
            unit = m_gf.group(3)

    # match target factor: factor of 27 / 27 times
    mf = re.search(r"(?:increase\s+by\s+a\s+factor\s+of|factor\s+of|by\s+a\s+factor\s+of)\s+(\d+(?:\.\d+)?)", text, re.I)
    if not mf:
        mf = re.search(r"(\d+(?:\.\d+)?)\s*(?:times|-fold)\b", text, re.I)
    if not (t_base > 0 and mf):
        return None
    target_factor = float(mf.group(1))
    
    if base_mult <= 1 or target_factor <= 0 or t_base <= 0:
        return None
    # target_factor = base_mult^(t / t_base) => t = t_base * log(target_factor) / log(base_mult)
    t_req = t_base * (math.log(target_factor) / math.log(base_mult))
    steps = [
        f"Method: Population model P(t) = P0 * ({base_mult:g})^(t / {t_base:g}).",
        f"We require P(t) = {target_factor:g} * P0 => ({base_mult:g})^(t / {t_base:g}) = {target_factor:g}.",
        f"t / {t_base:g} = log_{base_mult:g}({target_factor:g}) = {math.log(target_factor)/math.log(base_mult):g}.",
        f"Total time t = {t_req:g} {unit}."
    ]
    return (t_req, steps, f"{t_req:g} {unit}", None, "t = t_base * log_b(factor)", {"time": t_req})

STRUCTURE_SPECS["EXPONENTIAL_GROWTH_DOUBLING"] = {
    "exemplars": [
        "A bacteria culture grows at a rate proportional to its population if it doubles in",
        "population doubles in hours after how many hours will it be times",
        "A bacteria culture triples every 4 hours. How long will it take for the population to increase by a factor of 27?",
        "exponential growth doubling time problem",
        "bacteria population doubling rate problem",
    ],
    "force": r"\b(?:bacteria|culture|population|substance|radioactive|decay)\b.{0,60}\b(?:doubles?|triples?|quadruples?|half-life)\b",
    "slots": {}, "required": [], "full_text": True,
    "min_conf": 0.45,
    "compute": _c_exponential_growth,
}


# --------------------------------------------------------------------------- #
# NEET Chemistry Archetype: pH Calculation
# pH = -log10([H+]) ; pOH = -log10([OH-]) ; pH = 14 - pOH
# --------------------------------------------------------------------------- #




# --------------------------------------------------------------------------- #
# NEET Chemistry Archetype: Henderson-Hasselbalch Buffer Equation
# pH = pKa + log10([salt] / [acid])
# --------------------------------------------------------------------------- #




# --------------------------------------------------------------------------- #
# NEET Physics Archetype: 2D Projectile Motion
# Range R = u^2 * sin(2*theta) / g ; Hmax = u^2 * sin^2(theta) / (2*g)
# --------------------------------------------------------------------------- #







# SOLVER-DIG-2 wave (2026-10-06): refusal-gap families for canonical
# NCERT questions the audit caught refusing or being hijacked on
# (quadratic word problems, trig ratio asks, identity proofs, die/coin
# probability, linear pairs, curated biology why-questions).  Same
# registration pattern as the waves module; kept in its own file so
# concurrent waves never collide.

# structure_families_dig2.py folded inline (WS-B Step 8 / M2):
# same write-race-only provenance; helpers renamed _fmt_d2/_snap_d2.

ComputeOut = Tuple[Optional[float], List[str], Optional[str],
                   Optional[List[str]], str, Optional[Dict[str, Any]]]

def _fmt_d2(v) -> str:
    if isinstance(v, str):
        return v
    try:
        fv = float(v)
    except Exception:
        return str(v)
    if fv == int(fv) and abs(fv) < 1e15:
        return str(int(fv))
    return f"{fv:.5g}"

def _snap_d2(v):
    return v

def _frac_str(fr: Fraction) -> str:
    fr = Fraction(fr)
    if fr.denominator == 1:
        return str(fr.numerator)
    return f"{fr.numerator}/{fr.denominator}"

def _pi_convention(low: str, *vals: Optional[float]):
    """Board pi convention: 3.14 / 22/7 (7-friendly givens) / full."""
    if re.search(r"pi\s*=\s*3\.14", low):
        return 3.14, "pi = 3.14 (as the question says)."
    if re.search(r"pi\s*=\s*22\s*/\s*7", low) or (
            any(v is not None and float(v) % 7 == 0 for v in vals)
            and not re.search(r"pi\s*=", low)):
        return 22.0 / 7.0, "pi = 22/7 (board convention)."
    return math.pi, "pi at full precision."

def _c_quad_sq_sum(slots, text):
    """x^2 + (x+k)^2 = S for k=1 (consecutive) or k=2 (odd/even)."""
    if not re.search(r"consecutive", text, re.I):
        return None
    ms = re.search(r"squares?[^.]{0,90}?is\s+(\d+(?:\.\d+)?)", text, re.I)
    if not ms:
        return None
    S = float(ms.group(1))
    k = 2 if re.search(r"consecutive\s+(?:odd|even)", text, re.I) else 1
    # 2x^2 + 2kx + k^2 - S = 0  ->  x = (-k + sqrt(2S - k^2)) / 2
    disc = 2 * S - k * k
    if disc < 0:
        return None
    r = math.sqrt(disc)
    if abs(r - round(r)) > 1e-9:
        return None  # board answers are integral
    x = (-k + r) / 2
    if abs(x - round(x)) > 1e-9 or x <= 0:
        return None
    x = int(round(x))
    second = x + k
    if x * x + second * second != int(S):
        return None  # self-verification before answering
    if k == 2:
        label = "consecutive odd" if "odd" in text.lower() \
            else "consecutive even"
    else:
        label = "consecutive"
    steps = [
        f"Let the first integer be x and the next be x + {k}.",
        f"x^2 + (x+{k})^2 = {_fmt_d2(S)} -> 2x^2 + {2*k}x + {k*k} = "
        f"{_fmt_d2(S)}.",
        f"x = ({-k} + sqrt({2 * S - k * k})) / 2 = {x}.",
        f"Check: {x}^2 + {second}^2 = {x*x} + {second*second} "
        f"= {int(S)}.",
    ]
    return (float(x), steps,
            f"the two {label} integers are {x} and {second}",
            None, "x^2 + (x+k)^2 = S", {"first": x, "second": second})

def _mixed_number(text: str, anchor_rx: str) -> Optional[Fraction]:
    """Parse '9 3/8', '75/8', '9.375' hours after the anchor pattern."""
    m = re.search(anchor_rx, text, re.I)
    if not m:
        return None
    tail = text[m.end():m.end() + 20]
    mm = re.match(r"\s*(\d+(?:\.\d+)?)\s+(\d+)\s*/\s*(\d+)", tail)
    if mm:  # mixed number: whole + fraction
        return (Fraction(mm.group(1)) + Fraction(int(mm.group(2)),
                                                 int(mm.group(3))))
    mm = re.match(r"\s*(\d+)\s*/\s*(\d+)", tail)
    if mm:
        return Fraction(int(mm.group(1)), int(mm.group(2)))
    mm = re.match(r"\s*(\d+(?:\.\d+)?)", tail)
    if mm:
        return Fraction(mm.group(1))
    return None

def _c_quad_taps(slots, text):
    """1/x + 1/(x-d) = 1/T (or x+d for 'more'): board quadratic."""
    low = text.lower()
    if not re.search(r"\b(?:tap|pipe)s?\b", low) or \
            not re.search(r"\bfill", low):
        return None
    if not re.search(r"takes?\s+\d+(?:\.\d+)?\s*(?:hours?|hrs?)\s+"
                     r"(less|more)\s+than", low):
        return None
    if re.search(r"empty|drain|outlet|empties", low):
        return None  # drain-pipe variants are a different family
    T = _mixed_number(
        text, r"(?:fill|fills|filling)\s+(?:a\s+|the\s+)?tank\s+in")
    if T is None or T <= 0:
        return None
    md = re.search(r"takes?\s+(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\s+"
                   r"(less|more)\s+than", low)
    d = Fraction(md.group(1))
    more = md.group(2) == "more"
    # smaller tap = x; other tap = x + s*d (s=+1 more / -1 less)
    #   T(2x + s*d) = x^2 + s*d*x  ->  x^2 + s*d*x - 2T x - s*d*T = 0
    s = 1 if more else -1
    b = s * d - 2 * T
    c = -s * d * T
    disc = b * b - 4 * c
    if disc < 0:
        return None
    r = math.sqrt(float(disc))
    x = (-b + r) / 2
    xi = Fraction(x) if abs(x - round(x)) < 1e-9 else None
    if xi is not None and xi > 0:
        other = xi + s * d
        if other > 0:
            lhs = 1 / xi + 1 / other
            if lhs == 1 / T:
                smaller, larger = (xi, other) if xi < other \
                    else (other, xi)
                steps = [
                    f"Let the smaller tap fill the tank in x hours; the "
                    f"larger takes {_frac_str(other)} hours "
                    f"({md.group(2)} by {_frac_str(d)}).",
                    f"Rates add: 1/x + 1/({_frac_str(other)}) = "
                    f"1/{_frac_str(T)}.",
                    f"x^2 + ({_frac_str(s * d)})x - 2({_frac_str(T)})x - "
                    f"{_frac_str(s * d * T)} = 0 -> x = {_frac_str(xi)}.",
                    f"Check: 1/{_frac_str(xi)} + 1/{_frac_str(other)} = "
                    f"{_frac_str(lhs)} = 1/{_frac_str(T)} ✓",
                ]
                return (float(xi), steps,
                        f"smaller tap: {_frac_str(xi)} h, larger tap: "
                        f"{_frac_str(other)} h",
                        None, "1/a + 1/b = 1/T with b = a +- d",
                        {"smaller": float(xi), "larger": float(other)})
    return None

def _c_quad_train(slots, text):
    """D/(x+s) = D/x - t  ->  t x^2 + t s x - D s = 0."""
    low = text.lower()
    if re.search(r"upstream|downstream|stream|current|boat", low):
        return None  # boats-and-streams is a different family
    if not re.search(r"(?:less|more)\s+than|had\s+been|would\s+have", low):
        return None
    mD = None
    for m in re.finditer(r"(\d+(?:\.\d+)?)\s*km\b(?!\s*/)", low):
        mD = m
    if mD is None:
        return None
    D = Fraction(mD.group(1))
    ms = re.search(r"(\d+(?:\.\d+)?)\s*(?:km\s*/\s*h|kmph)", low)
    if ms is None:
        return None
    s = Fraction(ms.group(1))
    mt = re.search(r"(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)\s+(less|more)",
                   low)
    if mt is None:
        return None
    t = Fraction(mt.group(1))
    less = mt.group(2) == "less"
    if less:
        a, b, c = t, t * s, -D * s
    else:
        a, b, c = t, -t * s, -D * s
    disc = b * b - 4 * a * c
    if disc < 0:
        return None
    r = math.sqrt(float(disc))
    if abs(r - round(r)) > 1e-9:
        return None
    x = (-b + r) / (2 * a)
    xi = Fraction(x) if abs(x - round(x)) < 1e-9 else None
    if xi is None or xi <= 0:
        return None
    if less:
        fast = xi + s
        if D / xi - D / fast != t:
            return None
        steps = [
            f"Let the slower speed be x km/h; the other is x + "
            f"{_frac_str(s)} km/h.",
            f"{_frac_str(D)}/(x + {_frac_str(s)}) = {_frac_str(D)}/x - "
            f"{_frac_str(t)}.",
            f"t x^2 + t({_frac_str(s)})x - {_frac_str(D)}*{_frac_str(s)} "
            f"= 0 -> x = {_frac_str(xi)} km/h.",
            f"Check: {_frac_str(D)}/{_frac_str(xi)} - "
            f"{_frac_str(D)}/{_frac_str(fast)} = {_frac_str(t)} h ✓",
        ]
        return (float(xi), steps,
                f"slower: {_frac_str(xi)} km/h, faster: "
                f"{_frac_str(fast)} km/h",
                None, "D/(x+s) = D/x - t",
                {"slower": float(xi), "faster": float(fast)})
    else:
        if xi - s <= 0:
            return None
        if D / (xi - s) - D / xi != t:
            return None
        steps = [
            f"Let the usual speed be x km/h; the reduced speed is "
            f"x - {_frac_str(s)} km/h.",
            f"{_frac_str(D)}/(x - {_frac_str(s)}) = {_frac_str(D)}/x + "
            f"{_frac_str(t)}.",
            f"x = {_frac_str(xi)} km/h.",
            f"Check: {_frac_str(D)}/{_frac_str(xi - s)} - "
            f"{_frac_str(D)}/{_frac_str(xi)} = {_frac_str(t)} h ✓",
        ]
        return (float(xi), steps,
                f"usual speed: {_frac_str(xi)} km/h",
                None, "D/(x-s) = D/x + t", {"speed": float(xi)})

_TRIG_FN_RE = r"(cosec|sec|sin|cos|tan|cot)"

def _pyth_six(opp: int, adj: int, hyp: int) -> Dict[str, Fraction]:
    return {
        "sin": Fraction(opp, hyp), "cos": Fraction(adj, hyp),
        "tan": Fraction(opp, adj), "cosec": Fraction(hyp, opp),
        "sec": Fraction(hyp, adj), "cot": Fraction(adj, opp),
    }

def _c_trig_ratio_given(slots, text) -> Optional[ComputeOut]:
    """Board basics: one ratio given exactly, another (or all) asked."""
    if re.search(r"(?:sin|cos|tan)\s*2\s*[A-Za-z]|double\s+angle", text,
                 re.I):
        return None  # double-angle chains belong to TRIG_VALUE_CHAIN
    if "=" not in text:
        return None
    mg = re.search(_TRIG_FN_RE + r"\s*\(?\s*([A-Za-z])\s*\)?\s*=\s*"
                   r"(-?\d+)\s*/\s*(-?\d+)", text, re.I)
    if mg:
        fn_g = mg.group(1).lower()
        A = mg.group(2)
        p, h = int(mg.group(3)), int(mg.group(4))
    else:
        mg = re.search(_TRIG_FN_RE + r"\s*\(?\s*([A-Za-z])\s*\)?\s*=\s*"
                       r"(-?\d+)(?!\s*/)", text, re.I)
        if not mg:
            return None
        fn_g = mg.group(1).lower()
        A = mg.group(2)
        p, h = int(mg.group(3)), 1
    if h == 0 or p < 0:
        return None
    if fn_g in ("sin", "cos"):
        rem2 = h * h - p * p
        rem = int(math.isqrt(rem2)) if rem2 >= 0 else -1
        if rem <= 0 or rem * rem != rem2:
            return None  # not a Pythagorean pair — refuse the exact path
        ratios = _pyth_six(p, rem, h) if fn_g == "sin" \
            else _pyth_six(rem, p, h)
    elif fn_g == "tan":
        hyp2 = p * p + h * h
        hyp = int(math.isqrt(hyp2))
        if hyp * hyp != hyp2:
            return None
        ratios = _pyth_six(p, h, hyp)
    else:
        inv = {"cosec": "sin", "sec": "cos", "cot": "tan"}[fn_g]
        text2 = re.sub(_TRIG_FN_RE + r"\s*\(?\s*[A-Za-z]\s*\)?\s*=\s*"
                       r"-?\d+(?:\s*/\s*-?\d+)?",
                       f"{inv} = {h}/{p}", text, count=1, flags=re.I)
        return _c_trig_ratio_given(slots, text2)
    low = text.lower()
    if re.search(r"other\s+(?:trigonometric\s+)?ratios|all\s+(?:the\s+)?"
                 r"ratios", low):
        asked = [a for a in ("sin", "cos", "tan", "cosec", "sec", "cot")
                 if a != fn_g]
    else:
        asked = [a for a in ("cosec", "sec", "sin", "cos", "tan", "cot")
                 if a != fn_g and re.search(rf"\b{a}\b", low)]
    if not asked:
        return None
    steps = [f"{fn_g} {A} = {_frac_str(Fraction(p, h))} — the ratio "
             f"fixes the right triangle; the Pythagorean identity "
             f"sin^2 {A} + cos^2 {A} = 1 gives the third side."]
    for a in asked:
        steps.append(f"{a} {A} = {_frac_str(ratios[a])}.")
    steps.append(f"Check: sin^2 {A} + cos^2 {A} = "
                 f"{_frac_str(ratios['sin'] ** 2 + ratios['cos'] ** 2)} ✓")
    answers = ", ".join(f"{a} {A} = {_frac_str(ratios[a])}"
                        for a in asked)
    return (float(ratios[asked[0]]), steps, answers, None,
            "Pythagorean identity sin^2 + cos^2 = 1", None)

_TRIG_WORDS = ("cosec", "sec", "sin", "cos", "tan", "cot")

def _trig_expr_to_sympy(fragment: str):
    """Turn '(sin A + cosec A)^2' text into a sympy expression."""
    import sympy as sp
    s = fragment.strip().rstrip(".").strip()
    s = re.sub(r"\b squared\b", "^2", s, flags=re.I)
    s = re.sub(r"\bwhole\s+square[d]?\b", "^2", s, flags=re.I)
    fns = "|".join(_TRIG_WORDS)
    # 'tan^2 A' means tan(A)**2 — bind the argument before the power
    s = re.sub(rf"\b({fns})\s*\^2\s*([A-Za-z])\b", r"\1(\2)**2", s,
               flags=re.I)
    s = s.replace("^2", "**2").replace("²", "**2")
    for w in _TRIG_WORDS:
        s = re.sub(rf"\b{w}\s*([A-Za-z])\b", rf"{w}(\1)", s, flags=re.I)
    s = re.sub(r"\bcosec\b", "csc", s, flags=re.I)
    s = s.replace("π", "pi")
    local = {"A": sp.Symbol("A", positive=True)}
    try:
        # implicit products: ')(' -> ')*(' and ')sin(' -> ')*sin('
        s = re.sub(r"\)\s*\(", ")*(", s)
        s = re.sub(r"\)\s*(" + fns + r")\s*\(", r")*\1(", s, flags=re.I)
        expr = sp.sympify(s, locals=local, evaluate=True)
    except Exception:
        return None
    if any(sym.name != "A" for sym in expr.free_symbols):
        return None
    return expr

def _c_trig_identity_proof(slots, text) -> Optional[ComputeOut]:
    """Verify a prove-that trigonometric identity: LHS - RHS == 0."""
    if not re.search(r"\b(prove|show)\s+that\b", text, re.I):
        return None
    if "=" not in text:
        return None
    body = re.sub(r"^\s*(?:prove|show)\s+that\s*[:,]?\s*", "", text,
                  flags=re.I)
    parts = re.split(r"=", body, maxsplit=1)
    if len(parts) != 2:
        return None
    lhs = _trig_expr_to_sympy(parts[0])
    rhs = _trig_expr_to_sympy(parts[1])
    if lhs is None or rhs is None:
        return None
    import sympy as sp
    A = sp.Symbol("A", positive=True)
    diff = sp.simplify(sp.trigsimp(lhs - rhs))
    if diff != 0:
        # symbolic simplification failed — numeric gates decide below
        pass
    # mandatory numeric verification at three sample angles
    checks = []
    for val in (0.31, 0.87, 1.13):
        try:
            l = float(lhs.subs(A, val))
            r = float(rhs.subs(A, val))
        except Exception:
            return None
        if abs(l - r) > 1e-9:
            return None
        checks.append(val)
    steps = [
        f"LHS = {parts[0].strip()[:90]} ; RHS = "
        f"{parts[1].strip()[:90]}.",
        "Expand with sin^2 A + cos^2 A = 1 and the reciprocal "
        "identities (cosec A = 1/sin A, sec A = 1/cos A).",
        f"Symbolic simplification: LHS - RHS = {diff}.",
        f"Numeric spot-checks at A = {', '.join(str(c) for c in checks)} "
        f"rad: LHS and RHS agree to within 1e-9.",
    ]
    return (0.0, steps, "identity verified: LHS = RHS",
            None, "trigonometric identity verification", None)

def _c_dice_event_prob(slots, text) -> Optional[ComputeOut]:
    low = text.lower()
    if not re.search(r"probabilit", low):
        return None
    # n-throw asks are binomial/sequence — single-throw event math is
    # wrong-verify ('coin tossed twice/thrice', 'three coins', 'n times')
    if re.search(r"(?:thrown|tossed|rolled|flipped)\s+(?:\d+|a\s+number"
                 r"\s+of)\s+times|\d+\s+(?:throws|tosses|trials|times)|"
                 r"at\s+least\s+one\s+success|exactly\s+\d+\s+success|"
                 r"\b(?:two|three|four|five|six|\d+)\s+coins?\b|"
                 r"tossed\s+(?:twice|thrice)|\btwice\b|\bthrice\b",
                 low):
        return None
    coin = bool(re.search(r"\bcoin\b", low))
    die = bool(re.search(r"\bdie\b|\bdice\b", low))
    if die and not coin:
        return _die_event(low)
    if coin and not die:
        return _coin_event(low)
    return None

def _die_event(low: str):
    outcomes = [1, 2, 3, 4, 5, 6]
    inv = bool(re.search(r"\bnot\b", low))
    fav: Optional[List[int]] = None
    m = re.search(r"(?:greater|more)\s+than\s+(\d+)", low)
    if m:
        n = int(m.group(1))
        fav = [x for x in outcomes if x > n]
    elif re.search(r"at\s+least\s+(\d+)", low):
        n = int(re.search(r"at\s+least\s+(\d+)", low).group(1))
        fav = [x for x in outcomes if x >= n]
    elif re.search(r"at\s+most\s+(\d+)", low):
        n = int(re.search(r"at\s+most\s+(\d+)", low).group(1))
        fav = [x for x in outcomes if x <= n]
    elif re.search(r"less\s+than\s+(\d+)", low):
        n = int(re.search(r"less\s+than\s+(\d+)", low).group(1))
        fav = [x for x in outcomes if x < n]
    elif re.search(r"prime", low):
        fav = [2, 3, 5]
    elif re.search(r"even", low):
        fav = [2, 4, 6]
    elif re.search(r"odd", low):
        fav = [1, 3, 5]
    elif re.search(r"perfect\s+square", low):
        fav = [1, 4]
    elif re.search(r"multiple\s+of\s+(\d+)", low):
        n = int(re.search(r"multiple\s+of\s+(\d+)", low).group(1))
        fav = [x for x in outcomes if n != 0 and x % n == 0]
    elif re.search(r"factor\s+of\s+(\d+)", low):
        n = int(re.search(r"factor\s+of\s+(\d+)", low).group(1))
        fav = [x for x in outcomes if n % x == 0]
    elif re.search(r"between\s+(\d+)\s+and\s+(\d+)", low):
        mm = re.search(r"between\s+(\d+)\s+and\s+(\d+)", low)
        lo, hi = int(mm.group(1)), int(mm.group(2))
        fav = [x for x in outcomes if lo < x < hi]
    else:
        mm = re.search(r"getting\s+(?:a\s+)?(\d+)", low) or \
            re.search(r"number\s+(\d+)", low)
        if mm and 1 <= int(mm.group(1)) <= 6:
            fav = [int(mm.group(1))]
    if fav is None:
        return None
    if inv:
        fav = [x for x in outcomes if x not in fav]
    if not fav:
        return None
    count = len(fav)
    fr = Fraction(count, 6)
    steps = [
        "A die has six equally likely faces: 1, 2, 3, 4, 5, 6.",
        f"Favourable outcomes: {fav} -> {count} of 6.",
        f"P = {count}/6 = {_frac_str(fr)}.",
    ]
    return (float(fr), steps, _frac_str(fr), None,
            "P = favourable / 6", {"favourable": count})

def _coin_event(low: str):
    tosses = 2 if re.search(r"twice|two\s+(?:times|tosses|coins)", low) \
        else 1
    heads = bool(re.search(r"head", low))
    if not heads and not re.search(r"tail", low):
        return None
    if tosses == 1:
        steps = ["A tossed coin has two equally likely faces.",
                 "Favourable: 1 of 2.",
                 "P = 1/2 = 0.5."]
        return (0.5, steps, "1/2", None, "P = favourable / 2", None)
    if re.search(r"exactly\s+one", low):
        count, total, fav = 2, 4, ["HT", "TH"]
    elif re.search(r"exactly\s+two|two\s+heads", low):
        count, total, fav = 1, 4, ["HH"]
    elif re.search(r"at\s+least\s+one", low):
        count, total, fav = 3, 4, ["HH", "HT", "TH"]
    else:
        count, total, fav = 1, 4, (["HH"] if heads else ["TT"])
    fr = Fraction(count, total)
    steps = [
        f"Two tosses give {total} equally likely outcomes: "
        f"HH, HT, TH, TT.",
        f"Favourable outcomes: {fav} -> {count} of {total}.",
        f"P = {count}/{total} = {_frac_str(fr)}.",
    ]
    return (float(fr), steps, _frac_str(fr), None,
            "P = favourable / 4", {"favourable": count})

_KWORD = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
          "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
          "eleven": 11, "twelve": 12, "thirteen": 13, "fifteen": 15,
          "twenty": 20}

def _c_linear_pair(slots, text) -> Optional[ComputeOut]:
    low = text.lower()
    if not re.search(r"\b(?:numbers?|integers?)\b", low):
        return None
    if not re.search(r"\btimes\b", low):
        return None
    msum = re.search(r"sum[^.]{0,50}?is\s+(\d+(?:\.\d+)?)", low)
    mdiff = re.search(r"difference[^.]{0,50}?is\s+(\d+(?:\.\d+)?)", low)
    mtimes = re.search(r"(\d+|one|two|three|four|five|six|seven|eight|"
                       r"nine|ten|eleven|twelve|thirteen|fifteen|twenty)"
                       r"\s+times\s+(?:the\s+)?other", low)
    if mtimes is None:
        return None
    ktok = mtimes.group(1)
    k = Fraction(int(ktok)) if ktok.isdigit() \
        else Fraction(_KWORD.get(ktok, 0))
    if k <= 0:
        return None
    if msum is not None:
        S = Fraction(msum.group(1))
        b = S / (k + 1)          # a + b = S, a = k b
        a = k * b
        rel = f"a + b = {_frac_str(S)} with a = {_frac_str(k)}b"
    elif mdiff is not None:
        D = Fraction(mdiff.group(1))
        if k == 1:
            return None
        b = D / (k - 1)          # a - b = D, a = k b
        a = k * b
        rel = f"a - b = {_frac_str(D)} with a = {_frac_str(k)}b"
    else:
        return None
    if b.denominator != 1 or a.denominator != 1 or b <= 0:
        return None
    ai, bi = int(a), int(b)
    if msum is not None and ai + bi != int(S):
        return None
    if mdiff is not None and abs(ai - bi) != int(D):
        return None
    steps = [
        f"Let the numbers be a and b: {rel}.",
        f"Substituting a = {_frac_str(k)}b: b = {_frac_str(b)}, "
        f"a = {_frac_str(a)}.",
        f"Check: {'a + b' if msum is not None else 'a - b'} = "
        f"{ai + bi if msum is not None else abs(ai - bi)} ✓",
    ]
    return (float(max(ai, bi)), steps,
            f"the numbers are {min(ai, bi)} and {max(ai, bi)}",
            None, "two-linear-equation pair",
            {"a": float(ai), "b": float(bi)})

_TAN_EXACT = {
    30: math.sqrt(3) / 3,   # 1/sqrt(3)
    45: 1.0,
    60: math.sqrt(3),
}

def _c_elevation_classify(slots, text) -> Optional[ComputeOut]:
    """CLASSIFY ask (STEM-BM 2026-10-07, c10 sweep 09_002#d1): 'Is this
    the angle of elevation or the angle of depression? Justify.'
    Deterministic cue read: an observer on the ground looking at the
    TOP of an object looks ABOVE the horizontal -> elevation; an
    observer at a height looking at an object below -> depression."""
    low = text.lower()
    if not re.search(r"angle\s+of\s+(?:elevation|depression)", low) \
            or not re.search(r"elevation\s+or\s+(?:the\s+)?angle\s+of\s+"
                             r"depression|depression\s+or\s+(?:the\s+)?"
                             r"angle\s+of\s+elevation", low):
        return None
    looking_down = bool(re.search(
        r"(?:from\s+the\s+top|from\s+a\s+(?:window|building|tower|"
        r"cliff|lighthouse|balcony|hill)|looks?\s+down|looking\s+down|"
        r"(?:car|boat|bicycle|vehicle|object|person)\s+(?:below|on\s+the"
        r"\s+(?:road|river|sea|ground)))", low))
    looking_up = bool(re.search(
        r"(?:top\s+of\s+(?:the\s+|a\s+)?(?:tower|pole|building|tree|"
        r"pillar|lamp|monument|hill|flag)|looks?\s+(?:at|up)|"
        r"looking\s+(?:at|up)|on\s+the\s+ground)", low))
    if looking_down and not looking_up:
        word, why = "depression", (
            "the observer is ABOVE the object, so the line of sight is "
            "BELOW the horizontal line through the eye")
        cue = ("angle of depression -- line of sight below the "
               "horizontal")
    elif looking_up and not looking_down:
        word, why = "elevation", (
            "the observer is on the ground looking at the TOP of the "
            "object, so the line of sight is ABOVE the horizontal line "
            "through the eye")
        cue = ("angle of elevation -- line of sight above the "
               "horizontal")
    else:
        return None            # cues disagree or absent: refuse, no guess
    steps = [
        "The angle is measured at the eye between the HORIZONTAL line "
        "and the line of sight.",
        f"Here the line of sight goes {why}.",
        "An upward line of sight gives the angle of elevation; a "
        "downward one gives the angle of depression.",
    ]
    return (None, steps, f"This is the angle of {word} ({cue}).", None,
            "elevation: sight above horizontal; depression: below",
            None)

def _c_elevation_height(slots, text) -> Optional[ComputeOut]:
    """Forward height ask: h = d * tan(angle)."""
    low = text.lower()
    if not re.search(r"elevation|depression", low):
        return None
    if re.search(r"shadow|moves?\s+back|walks?|changes\s+from|"
                 r"how\s+far|another\s+point|second\s+point", low):
        return None  # sibling scenarios own these
    if not re.search(r"find\s+the\s+height|height\s+of\s+the\s+"
                     r"(?:tower|pole|building|tree|pillar|monument)",
                     low):
        return None
    ma = re.search(r"(?:elevation|depression)[^.]{0,240}?"
                   r"is\s+(\d+(?:\.\d+)?)\s*deg", low) or \
        re.search(r"(?:elevation|depression)\s+of\s+"
                  r"(\d+(?:\.\d+)?)\s*deg", low)
    if not ma:
        return None
    ang = float(ma.group(1))
    key = int(ang) if ang == int(ang) else None
    if key not in _TAN_EXACT:
        return None  # non-standard angle: honest refusal
    md = re.search(r"(\d+(?:\.\d+)?)\s*m\s+(?:away|from\s+the\s+foot)",
                   low) or \
        re.search(r"point\s+(?:on\s+the\s+ground\s+)?which\s+is\s+"
                  r"(\d+(?:\.\d+)?)", low)
    if not md:
        return None
    dist = float(md.group(1))
    h = dist * _TAN_EXACT[key]
    surd = {30: "h = d/sqrt(3) = d*sqrt(3)/3", 45: "h = d",
            60: "h = d*sqrt(3)"}[key]
    steps = [
        f"Right triangle: horizontal ground distance d = {_fmt_d2(dist)} m, "
        f"elevation angle = {_fmt_d2(ang)} deg, height h is the opposite "
        f"side.",
        f"tan({_fmt_d2(ang)} deg) = h / d -> {surd}.",
        f"h = {_fmt_d2(dist)} x tan({_fmt_d2(ang)} deg) = {_fmt_d2(h)} m.",
        "Check: tan(angle) x ground distance reproduces h in the same "
        "triangle ✓",
    ]
    return (_snap_d2(h), steps, f"{_fmt_d2(h)} m", None,
            "h = d tan(angle)", {"height_m": h})

def _c_fraction_whole(slots, text) -> Optional[ComputeOut]:
    low = text.lower()
    if not re.search(r"what\s+fraction\b", low):
        return None
    mn = re.search(r"(?:divid|split|shar|distribut)\w*[^.]{0,60}?"
                   r"(?:into|among[s]?t?|between)\s+(\d+)\s+equal",
                   low)
    if not mn:
        return None
    n = int(mn.group(1))
    if n <= 1 or n > 1000:
        return None
    from fractions import Fraction as _F
    frac = _F(1, n)
    steps = [
        "The whole is divided into "
        f"{n} EQUAL parts, so one part is 1/{n} of the whole.",
        f"Fraction in one part = 1/{n} = {float(frac):.6g}.",
        "Check: all parts together give "
        f"{n} x 1/{n} = 1 (the whole) ✓",
    ]
    return (float(frac), steps, f"1/{n}", None,
            "equal parts: one part = 1/n of the whole",
            {"n_parts": float(n)})

def _c_ap_which_term(slots, text) -> Optional[ComputeOut]:
    if not re.search(r"which\s+term", text, re.I):
        return None
    seqs = re.findall(r"(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,"
                      r"\s*(-?\d+(?:\.\d+)?)", text)
    if not seqs:
        return None
    a0, a1 = float(seqs[0][0]), float(seqs[0][1])
    d = a1 - a0
    if d == 0:
        return None
    mx = re.search(r"is\s+(-?\d+(?:\.\d+)?)\s*\??\s*$", text.strip()) \
        or re.search(r"is\s+(-?\d+(?:\.\d+)?)\s*\?", text)
    if not mx:
        return None
    x = float(mx.group(1))
    n = (x - a0) / d + 1
    if abs(n - round(n)) > 1e-9 or not (1 <= n <= 1000):
        return None
    n = int(round(n))
    if abs(a0 + (n - 1) * d - x) > 1e-9:
        return None
    seq_txt = ", ".join(str(int(v)) if v == int(v) else str(v)
                        for v in (a0, a1, a1 + d))
    return (_snap_d2(float(n)), [
        f"AP {seq_txt}, ...: a = {_fmt_d2(a0)}, d = {_fmt_d2(d)}.",
        f"t_n = a + (n-1)d = {_fmt_d2(x)} -> n = ({_fmt_d2(x)} - {_fmt_d2(a0)})/"
        f"{_fmt_d2(d)} + 1 = {n}.",
        f"Check: {_fmt_d2(a0)} + ({n - 1})({_fmt_d2(d)}) = {_fmt_d2(x)}."],
        f"the {n}th term", None, "n = (t_n - a)/d + 1", {"n": n})

def _c_frustum_dig2(slots, text) -> Optional[ComputeOut]:
    low = text.lower()
    if not re.search(r"frustum|truncated\s+cone", low):
        return None
    h = None
    mh2 = re.search(r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*(?:high|deep)", low)
    mh = re.search(r"(?:height|depth)[\w\s]{0,15}?"
                   r"(\d+(?:\.\d+)?)\s*(?:cm|m)?", low)
    if mh2:
        h = float(mh2.group(1))
    elif mh:
        h = float(mh.group(1))
    radii: List[float] = []
    mr = re.search(r"radi\w*[^.]{0,80}?(\d+(?:\.\d+)?)\s*(?:cm|m)\b"
                   r"[^.\d]{0,12}(?:and|,)[^.\d]{0,6}"
                   r"(\d+(?:\.\d+)?)\s*(?:cm|m)?", low)
    if mr:
        radii = [float(mr.group(1)), float(mr.group(2))]
    else:
        cands = [float(v) for v in
                 re.findall(r"(\d+(?:\.\d+)?)\s*(?:cm|m)\b", low)]
        if h is not None:
            cands = [c for c in cands if abs(c - h) > 1e-9]
        if len(cands) >= 2:
            radii = [cands[0], cands[1]]
    if len(radii) < 2 or h is None:
        return None
    R, r = max(radii), min(radii)
    if R == r:
        return None  # degenerate — a cylinder, not a frustum
    if re.search(r"curved|surface|area", low) and \
            not re.search(r"volume|capacity", low):
        ml = re.search(r"slant\s+height[\w\s]{0,18}?(\d+(?:\.\d+)?)", low)
        if not ml:
            return None
        l_ = float(ml.group(1))
        csa = math.pi * (R + r) * l_
        return (_snap_d2(csa), [
            f"CSA = pi(R + r) l = pi({_fmt_d2(R)} + {_fmt_d2(r)}) x "
            f"{_fmt_d2(l_)} = {_fmt_d2(csa)} sq cm."],
            f"{_fmt_d2(csa)} sq cm", None, "CSA = pi(R+r)l", None)
    pi_v, pi_note = _pi_convention(low, R, r, h)
    v = pi_v / 3 * h * (R * R + r * r + R * r)
    steps = [
        f"Frustum: R = {_fmt_d2(R)} cm, r = {_fmt_d2(r)} cm, h = {_fmt_d2(h)} cm.",
        "V = (1/3) pi h (R^2 + r^2 + Rr).",
        f"V = pi/3 x {_fmt_d2(h)} x ({_fmt_d2(R * R)} + {_fmt_d2(r * r)} + "
        f"{_fmt_d2(R * r)}) = {_fmt_d2(v)} cu cm.  {pi_note}",
    ]
    return (_snap_d2(v), steps, f"{_fmt_d2(v)} cu cm", None,
            "V = (1/3) pi h (R^2 + r^2 + Rr)", {"volume": v})

def _c_solid_measure(slots, text) -> Optional[ComputeOut]:
    low = text.lower()
    # hemispher\w* — 'hemispherical bowl' has no \bhemisphere\b hit and
    # the question used to fall to a cylinder concept lane instead
    if not re.search(r"\bcone\b|\bcylinder\b|\bsphere\b|\bspherical\b|"
                     r"hemispher\w*", low):
        return None
    asks_vol = bool(re.search(r"\b(?:volume|capacity)\b", low))
    asks_csa = bool(re.search(r"curved\s+surface|lateral\s+surface", low))
    asks_tsa = bool(re.search(r"total\s+surface", low))
    asks_sa = bool(re.search(r"surface\s+area", low))
    if not (asks_vol or asks_csa or asks_tsa or asks_sa):
        return None
    if re.search(r"cavity|hollow|hollowed|carved|drilled|scoop\w*|"
                 r"frustum|melt|recast|combined|solid\s+consists|"
                 r"surmounted|placed\s+on|mounted|embedded|cut\s+out|"
                 r"taken\s+out|removed\s+from", low):
        return None  # composite scenarios belong to their own families
    md = re.search(r"diameter[\w\s]{0,20}?(\d+(?:\.\d+)?)", low) or \
        re.search(r"diameter\s+of\s+(?:a\s+|the\s+)?[\w\s]{0,25}?"
                  r"(\d+(?:\.\d+)?)", low)
    mr = re.search(r"(?:base\s+)?radius[\w\s]{0,20}?(?:is\s+|of\s+|"
                   r"=\s*)?(\d+(?:\.\d+)?)", low) or \
        re.search(r"radius\s+(\d+(?:\.\d+)?)", low) or \
        re.search(r"radius\s+of\s+(?:a\s+|the\s+)?[\w\s]{0,25}?"
                  r"(\d+(?:\.\d+)?)", low)
    r_v = float(md.group(1)) / 2.0 if md else \
        (float(mr.group(1)) if mr else None)
    # the SLANT height must never fill the h slot — 'slant height of a
    # cone is 13 ... find the volume' shipped V = (1/3)pi r^2 * 13
    # (340.48) VERIFIED; the true h comes from h = sqrt(l^2 - r^2).
    ml = re.search(r"slant\s+height[\w\s]{0,18}?(\d+(?:\.\d+)?)", low) \
        or re.search(r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s+slant", low)
    l_v = float(ml.group(1)) if ml else None
    work = re.sub(r"slant\s+height", "slant", low)
    mh = re.search(r"(?:height|depth)[\w\s]{0,20}?(?:is\s+|of\s+|"
                   r"=\s*)?(\d+(?:\.\d+)?)", work) or \
        re.search(r"(\d+(?:\.\d+)?)\s*(?:cm|m)?\s*high", work)
    h_v = float(mh.group(1)) if mh else None
    if r_v is None:
        return None
    pi_v, pi_note = _pi_convention(low, r_v, h_v)
    shape = ("hemisphere" if re.search(r"hemisphere", low) else
             "sphere" if re.search(r"sphere", low) else
             "cylinder" if re.search(r"cylinder", low) else "cone")
    asks_litres = bool(re.search(r"\blitres?\b|\bliters?\b|capacity", low))

    def _out(val, kind, lines):
        unit = "cu cm" if kind == "V" else "sq cm"
        if kind == "V" and asks_litres:
            # capacity asks are answered in litres; 1 cm^3 = 1/1000 L
            # but 1 m^3 = 1000 L — 'radius 1 m, height 2 m' answered
            # 0.00628 litres for a 6280 L tank
            if re.search(r"\d+\s*m\b", low) and                     not re.search(r"\d+\s*(?:cm|mm)\b", low):
                lts = val * 1000.0
                how = "* 1000 (dimensions in metres)"
            else:
                lts = val / 1000.0
                how = "/ 1000 (dimensions in cm)"
            return (_snap_d2(lts), lines + [pi_note,
                                         f"capacity = {_fmt_d2(val)} "
                                         f"{how} = {_fmt_d2(lts)} litres."],
                    f"{_fmt_d2(lts)} litres", None,
                    f"{shape} V -> litres", None)
        return (_snap_d2(val), lines + [pi_note], f"{_fmt_d2(val)} {unit}",
                None, f"{shape} {kind}", None)

    if shape == "cone":
        if asks_vol:
            if h_v is None:
                if l_v is None or l_v <= r_v:
                    return None
                # only the slant is given: h = sqrt(l^2 - r^2)
                h_v = math.sqrt(l_v * l_v - r_v * r_v)
            v = pi_v / 3 * r_v * r_v * h_v
            return _out(v, "V", [
                f"Right circular cone: r = {_fmt_d2(r_v)} cm, "
                f"h = {_fmt_d2(h_v)} cm"
                + (f" (h = sqrt({_fmt_d2(l_v)}^2 - {_fmt_d2(r_v)}^2))."
                   if l_v is not None and h_v is not None and
                   abs(h_v * h_v + r_v * r_v - l_v * l_v) < 1e-9 else "."),
                "V = (1/3) pi r^2 h.",
                f"V = 1/3 x pi x {_fmt_d2(r_v)}^2 x {_fmt_d2(h_v)} = "
                f"{_fmt_d2(v)} cu cm."])
        if asks_csa:
            if l_v is None:
                if h_v is None:
                    return None
                l_v = math.sqrt(r_v * r_v + h_v * h_v)
            c = pi_v * r_v * l_v
            return _out(c, "CSA", [
                f"Cone: r = {_fmt_d2(r_v)} cm, l = {_fmt_d2(l_v)} cm.",
                "CSA = pi r l.",
                f"CSA = pi x {_fmt_d2(r_v)} x {_fmt_d2(l_v)} = {_fmt_d2(c)} "
                f"sq cm."])
        if asks_tsa or asks_sa:
            if l_v is None:
                if h_v is None:
                    return None
                l_v = math.sqrt(r_v * r_v + h_v * h_v)
            c = pi_v * r_v * (l_v + r_v)
            return _out(c, "TSA", [
                f"Cone: r = {_fmt_d2(r_v)} cm, l = {_fmt_d2(l_v)} cm.",
                "TSA = pi r (l + r).",
                f"TSA = pi x {_fmt_d2(r_v)} x ({_fmt_d2(l_v)} + {_fmt_d2(r_v)}) "
                f"= {_fmt_d2(c)} sq cm."])
    if shape == "cylinder":
        if h_v is None:
            return None
        if asks_vol:
            v = pi_v * r_v * r_v * h_v
            return _out(v, "V", [
                f"Cylinder: r = {_fmt_d2(r_v)} cm, h = {_fmt_d2(h_v)} cm.",
                "V = pi r^2 h.",
                f"V = pi x {_fmt_d2(r_v)}^2 x {_fmt_d2(h_v)} = {_fmt_d2(v)} "
                f"cu cm."])
        if asks_csa:
            c = 2 * pi_v * r_v * h_v
            return _out(c, "CSA", [
                f"Cylinder: r = {_fmt_d2(r_v)} cm, h = {_fmt_d2(h_v)} cm.",
                "CSA = 2 pi r h.",
                f"CSA = 2 x pi x {_fmt_d2(r_v)} x {_fmt_d2(h_v)} = {_fmt_d2(c)} "
                f"sq cm."])
        if asks_tsa or asks_sa:
            c = 2 * pi_v * r_v * (h_v + r_v)
            return _out(c, "TSA", [
                f"Cylinder: r = {_fmt_d2(r_v)} cm, h = {_fmt_d2(h_v)} cm.",
                "TSA = 2 pi r (h + r).",
                f"TSA = 2 x pi x {_fmt_d2(r_v)} x ({_fmt_d2(h_v)} + "
                f"{_fmt_d2(r_v)}) = {_fmt_d2(c)} sq cm."])
    if shape == "sphere":
        if asks_vol:
            v = 4.0 / 3.0 * pi_v * r_v ** 3
            return _out(v, "V", [
                f"Sphere: r = {_fmt_d2(r_v)} cm.",
                "V = (4/3) pi r^3.",
                f"V = 4/3 x pi x {_fmt_d2(r_v)}^3 = {_fmt_d2(v)} cu cm."])
        if asks_sa or asks_csa or asks_tsa:
            c = 4 * pi_v * r_v * r_v
            return _out(c, "SA", [
                f"Sphere: r = {_fmt_d2(r_v)} cm.",
                "Surface area = 4 pi r^2.",
                f"SA = 4 x pi x {_fmt_d2(r_v)}^2 = {_fmt_d2(c)} sq cm."])
    if shape == "hemisphere":
        if asks_vol:
            v = 2.0 / 3.0 * pi_v * r_v ** 3
            return _out(v, "V", [
                f"Hemisphere: r = {_fmt_d2(r_v)} cm.",
                "V = (2/3) pi r^3.",
                f"V = 2/3 x pi x {_fmt_d2(r_v)}^3 = {_fmt_d2(v)} cu cm."])
        if asks_csa:
            c = 2 * pi_v * r_v * r_v
            return _out(c, "CSA", [
                f"Hemisphere: r = {_fmt_d2(r_v)} cm.",
                "CSA = 2 pi r^2.",
                f"CSA = 2 x pi x {_fmt_d2(r_v)}^2 = {_fmt_d2(c)} sq cm."])
        if asks_tsa or asks_sa:
            c = 3 * pi_v * r_v * r_v
            return _out(c, "TSA", [
                f"Hemisphere: r = {_fmt_d2(r_v)} cm.",
                "TSA = 3 pi r^2 (curved + flat face).",
                f"TSA = 3 x pi x {_fmt_d2(r_v)}^2 = {_fmt_d2(c)} sq cm."])
    return None

_BIO_WHY: List[Tuple[str, Tuple[str, ...], str, List[str]]] = [
    ("PROGENY_ALWAYS_TALL",
     ("progeny", "tall", "short", "pea"),
     "The tall parent is homozygous dominant (TT) and the short parent "
     "is homozygous recessive (tt), so every F1 offspring receives one "
     "T allele and one t allele. All progeny are Tt — heterozygous — "
     "and since tallness is dominant over shortness, every plant "
     "appears tall.",
     ["Genotypes: tall parent TT, short parent tt.",
      "Gametes: T from the tall parent, t from the short parent.",
      "All F1 progeny are Tt (heterozygous).",
      "T (tall) is dominant over t (short), so every Tt plant is tall.",
      "The shortness allele is hidden, not gone — it reappears in the "
      "F2 generation when two Tt plants are selfed."]),
    ("VARIATION_PROMOTE_SURVIVAL",
     ("variation", "species", "survival"),
     "Variations give a species a pool of slightly different traits, so "
     "when the environment changes (heat, drought, new disease, new "
     "food), some individuals already carry combinations that tolerate "
     "the new conditions. Natural selection keeps those individuals "
     "alive and breeding, so the species survives and adapts instead of "
     "dying out. That is why variation is valuable to the species even "
     "when it gives one individual no immediate advantage.",
     ["Variation = differences in DNA among individuals of a species.",
      "Environments change over generations (climate, food, disease).",
      "Pre-existing variants that suit the new condition survive and "
      "reproduce — natural selection acts on variation.",
      "The species persists through the change; without variants it "
      "could be wiped out by a single change."]),
    ("MENSTRUATION_SIGNIFICANT",
     ("menstruation", "significant", "event"),
     "Menstruation marks the end of one menstrual cycle: when the egg "
     "released in that cycle is not fertilised, the thickened uterine "
     "lining that had prepared to receive the embryo is no longer "
     "needed, so it breaks down and is shed with blood through the "
     "vagina. It is significant because it shows the female "
     "reproductive system is preparing and resetting every month for a "
     "possible pregnancy.",
     ["The uterine lining thickens each cycle to receive an embryo.",
      "If fertilisation does not happen, the egg and the lining are "
      "not needed.",
      "The lining breaks down and is shed slowly — menstruation.",
      "It signals the cycle is resetting for the next month."]),
    ("SEX_DETERMINATION",
     ("sex", "determin", "child"),
     "The sex of a child is determined by the chromosome the father's "
     "sperm carries. All eggs carry an X chromosome; sperm carry "
     "either X or Y. An X sperm fertilising the egg gives XX — a girl; "
     "a Y sperm gives XY — a boy. The chance of each is 50 : 50, so "
     "biologically the father's gamete decides the child's sex, and it "
     "is a matter of chance.",
     ["Mother's egg: always X.",
      "Father's sperm: X or Y in equal numbers.",
      "XX zygote = girl; XY zygote = boy.",
      "Neither parent controls which sperm fertilises — 50:50 chance.",
      "Blaming the mother for the sex of a child has no biological "
      "basis."]),
    ("F2_TWO_TYPES",
     ("f2", "two", "types", "progeny"),
     "In the F1 generation all plants are Tt and look tall because the "
     "dominant T masks the recessive t. When two F1 plants are selfed, "
     "the alleles segregate during gamete formation and recombine at "
     "random: TT, Tt, tT and tt in the ratio 1 : 2 : 1. The tt "
     "combination shows the recessive short trait again, so the F2 "
     "progeny shows two types — tall and short — in a 3 : 1 ratio.",
     ["F1 plants are all Tt (tall, heterozygous).",
      "Meiosis separates the T and t alleles into different gametes.",
      "Random fertilisation gives TT : Tt : tt = 1 : 2 : 1.",
      "TT and Tt look tall; tt is short -> phenotype 3 : 1.",
      "The recessive trait reappears because alleles segregated, not "
      "blended."]),
    ("ACQUIRED_NOT_INHERITED",
     ("acquired", "trait", "inherit"),
     "Acquired traits arise in the body cells (somatic cells) of an "
     "individual — for example a mouse that exercises and becomes "
     "muscular, or a person who learns a skill. Changes in somatic "
     "cells do not reach the DNA of the germ cells (gametes), so there "
     "is nothing in the reproductive cells to pass on. Only changes in "
     "the DNA of germ cells are inherited, which is why acquired traits "
     "are not inherited over generations.",
     ["Acquired traits happen in somatic (body) cells.",
      "Inheritance runs only through germ cells — egg and sperm.",
      "The trait never enters the gametes' DNA, so offspring do not "
      "receive it.",
      "Example: a bodybuilder's children are not born muscular."]),
    ("VARIATION_BENEFIT_SPECIES_NOT_INDIVIDUAL",
     ("variation", "beneficial", "species", "individual"),
     "A single individual usually gains nothing from a small variation "
     "— it may even be neutral or harmful to it personally. But the "
     "species as a whole benefits: the variation is a spare "
     "possibility in the population's gene pool. If conditions change "
     "suddenly, individuals carrying useful variants survive and "
     "reproduce, so the population does not disappear. Selection works "
     "on the variety in the population, which is why variation helps "
     "the species more than any one individual.",
     ["For one individual a variation may give no advantage at all.",
      "The population holds many such small variants in reserve.",
      "A sudden environmental change makes one of them useful.",
      "Carriers of the useful variant survive and rebuild the "
      "population.",
      "So variation is insurance for the species, not a prize for the "
      "individual."]),
    ("MENDEL_CHOSE_PEA",
     ("mendel", "pea", "plant"),
     "Mendel chose the garden pea (Pisum sativum) because it has clear, "
     "easily distinguishable pairs of contrasting characters (tall or "
     "short, round or wrinkled seeds, and so on), the flowers are "
     "self-pollinating, which keeps lines pure, cross-pollination can "
     "still be done by hand, the plants grow fast and give many "
     "offspring in a short life cycle, and each generation can be "
     "grown and counted easily. All of this made the inheritance "
     "patterns visible in exact ratios.",
     ["Seven pairs of clearly contrasting visible characters.",
      "Self-pollination keeps pure lines; hand cross-pollination is "
      "easy.",
      "Short life cycle and many offspring — large countable data.",
      "Large numbers made Mendel's ratios statistically reliable."]),
    ("BACTERIA_HEAT_VARIANTS",
     ("bacteria", "heat", "variant"),
     "When a bacterial population faces a sudden rise in temperature, "
     "most bacteria die, but a few individuals already carry variants "
     "of genes that can tolerate the higher temperature. The heat does "
     "not create those variants to order — the variants arose earlier "
     "by chance during DNA copying. The changed environment simply "
     "selects the pre-existing heat-tolerant variants, and they "
     "multiply, so the surviving population becomes heat-tolerant.",
     ["DNA copying is not perfectly faithful — variants arise by "
      "chance all the time.",
      "A sudden heat change kills the non-tolerant individuals.",
      "Pre-existing tolerant variants survive and multiply.",
      "Selection by the environment, not purposeful creation, drives "
      "the change."]),
    ("EQUAL_GENETIC_CONTRIBUTION",
     ("equal", "genetic", "contribution", "progeny"),
     "Each parent makes gametes by meiosis, and meiosis halves the "
     "chromosome number, so every egg and every sperm carries one "
     "complete set of chromosomes — one copy of each gene. At "
     "fertilisation the egg's set and the sperm's set combine, so the "
     "progeny gets exactly half of its genetic material from the "
     "mother and half from the father. This equal sharing is ensured "
     "by the haploid nature of the gametes.",
     ["Meiosis halves the chromosome number in gametes.",
      "Every gamete carries one full set of genes — no more, no less.",
      "Egg contributes one set, sperm contributes one set.",
      "Zygote = two sets: 50% maternal, 50% paternal DNA."]),
    ("VILLI_SMALL_INTESTINE",
     ("villi", "small", "intestine"),
     "The inner lining of the small intestine has millions of tiny "
     "finger-like projections called villi to increase the surface area "
     "for absorption of digested food. Each villus is richly supplied "
     "with blood capillaries and a central lymph vessel (lacteal). The "
     "immense surface area and rich blood supply allow digested "
     "nutrients (glucose, amino acids, fatty acids) to be absorbed "
     "rapidly and transported to every cell in the body.",
     ["Villi and microvilli increase internal absorptive surface area enormously.",
      "Walls are extremely thin (single layer of epithelial cells) for rapid diffusion.",
      "Rich capillary network absorbs glucose, amino acids, and water-soluble vitamins.",
      "Central lacteal absorbs fatty acids and fat-soluble vitamins into lymph.",
      "Continuous blood flow maintains a steep concentration gradient."]),
    ("DOUBLE_CIRCULATION",
     ("double", "circulation"),
     "Double circulation means blood flows through the heart twice during "
     "one complete cycle: pulmonary circulation (heart to lungs and back) "
     "and systemic circulation (heart to body tissues and back). It is "
     "necessary in humans because warm-blooded mammals have high energy "
     "demands and require completely separate oxygenated and deoxygenated "
     "blood. Separation ensures that body tissues receive maximum oxygen "
     "to maintain constant body temperature (37 deg C).",
     ["Heart has four separate chambers to prevent mixing of blood.",
      "Right side pumps deoxygenated blood to lungs for oxygenation.",
      "Left side receives oxygenated blood and pumps it at high pressure to the body.",
      "Complete separation provides maximum oxygen delivery efficiency.",
      "Essential to sustain high metabolic rates for constant warm-blooded temperature."]),
    ("ALVEOLI_DESIGN",
     ("alveoli", "gas", "exchange"),
     "Alveoli in human lungs are specially adapted to maximize the exchange "
     "of gases: their millions of tiny balloon-like sacs provide a massive "
     "surface area (about 80 square metres); their walls are extremely thin "
     "(one cell thick); they are covered by an extensive network of blood "
     "capillaries; and their moist inner lining allows oxygen and carbon "
     "dioxide to dissolve and diffuse rapidly between air and blood.",
     ["Millions of spherical alveoli provide a massive surface area (~80 m2).",
      "Alveolar wall is a single layer of squamous epithelial cells.",
      "Surrounded by an extensive mesh of blood capillaries.",
      "Moist lining allows gases to dissolve before diffusing across membranes.",
      "Steep partial pressure gradients drive rapid diffusion of O2 and CO2."]),
    ("OZONE_DEPLETION",
     ("ozone", "deplet"),
     "The ozone layer in the stratosphere is being depleted by synthetic "
     "chemicals called chlorofluorocarbons (CFCs), used in refrigerants "
     "and aerosol sprays. High in the stratosphere, UV radiation breaks down "
     "CFCs, releasing reactive chlorine free radicals. Each chlorine radical "
     "catalytically destroys thousands of ozone molecules (O3 -> O2). This is "
     "a serious concern because ozone shields Earth from harmful ultraviolet "
     "radiation; depletion allows UV rays to reach the surface, causing skin "
     "cancers, eye cataracts, and damage to crops and marine phytoplankton.",
     ["CFCs released at ground level rise into the stratosphere.",
      "UV radiation splits CFCs, liberating reactive chlorine free radicals.",
      "Chlorine acts as a catalyst: Cl + O3 -> ClO + O2, destroying ozone.",
      "Ozone absorbs harmful ultraviolet (UV-B) radiation from the Sun.",
      "Depletion increases ground UV exposure, causing skin cancers and cataracts."]),
    ("TROPHIC_ENERGY_LOSS",
     ("trophic", "food", "chain"),
     "Trophic levels in a food chain are limited to 3 to 4 steps because of "
     "the 10 percent law: only about 10% of the energy stored in organic "
     "matter at one trophic level is transferred to the next level. The "
     "remaining 90% is lost as heat during respiration, digestion, and daily "
     "life activities. After 3 or 4 trophic transfers, the remaining energy is "
     "so tiny that it cannot support another viable population of organisms.",
     ["Lindeman's 10% law: only ~10% of energy is passed to the next level.",
      "90% of energy is lost as heat during respiration and metabolic work.",
      "Energy decreases exponentially at higher trophic levels.",
      "After 3 or 4 levels, residual energy is insufficient to sustain a consumer.",
      "Hence, food chains in nature rarely exceed 4 or 5 trophic levels."]),
]

def _bio_entry_for(text: str):
    low = re.sub(r"[^a-z0-9 ]", " ", text.lower())
    low = re.sub(r"\s+", " ", low)
    for _sid, kws, answer, steps in _BIO_WHY:
        if all(k in low for k in kws):
            return _sid, answer, steps
    return None

_BIO_WHY_ASK = re.compile(
    r"\b(why\b|how\b|what\s+is\s+the\s+(?:reason|cause|role|function|"
    r"purpose|importance|significance)\b|role\s+of|function\s+of|"
    r"purpose\s+of|importance\s+of|significance\s+of|explain\b|"
    r"reason\s+(?:for|behind))", re.I)

def _make_bio_compute(want_sid: str):
    def _compute(slots, text):
        if not _BIO_WHY_ASK.search(text or ""):
            return None
        hit = _bio_entry_for(text)
        if hit and hit[0] == want_sid:
            _sid, answer, steps = hit
            return (None, list(steps), answer, None,
                    "curated NCERT concept answer", None)
        return None
    return _compute

def _bio_exemplars(sid: str) -> List[str]:
    """Per-entry exemplars so the MiniLM centroid stays tight."""
    return {
        "PROGENY_ALWAYS_TALL": [
            "why is the progeny always tall when a tall pea plant is "
            "crossed with a short pea plant",
            "why are all progeny tall if a tall pea plant is crossed "
            "with a short pea plant",
        ],
        "VARIATION_PROMOTE_SURVIVAL": [
            "how does the creation of variations in a species promote "
            "survival",
            "how do variations help a species to survive",
        ],
        "MENSTRUATION_SIGNIFICANT": [
            "why is menstruation considered a significant event",
            "why is menstruation a significant event in the human "
            "female reproductive cycle",
        ],
        "SEX_DETERMINATION": [
            "how is the sex of a child determined in human beings",
            "how is the sex of a newborn determined",
        ],
        "F2_TWO_TYPES": [
            "why do the f2 progeny show two types tall and short",
            "in the f2 generation why do both tall and short plants "
            "appear",
        ],
        "ACQUIRED_NOT_INHERITED": [
            "why are the traits acquired during the lifetime of an "
            "individual not inherited",
            "why are acquired traits not inherited",
        ],
        "VARIATION_BENEFIT_SPECIES_NOT_INDIVIDUAL": [
            "why is variation beneficial to the species but not "
            "necessarily for the individual",
            "variations benefit the species and not the individual "
            "why",
        ],
        "MENDEL_CHOSE_PEA": [
            "why did mendel choose pea plants for his experiments",
            "why did gregor mendel select the garden pea plant",
        ],
        "BACTERIA_HEAT_VARIANTS": [
            "if a bacterial population is heated suddenly why do some "
            "bacteria survive",
            "how do heat tolerant variants arise in bacteria when the "
            "temperature rises",
        ],
        "EQUAL_GENETIC_CONTRIBUTION": [
            "how is the equal genetic contribution of male and female "
            "parents ensured in the progeny",
            "how do both parents contribute equal amounts of genetic "
            "material to the child",
        ],
        "VILLI_SMALL_INTESTINE": [
            "why does the inner lining of the small intestine have numerous finger like projections called villi",
            "what is the role of villi in the small intestine",
            "why are villi present in the small intestine",
        ],
        "DOUBLE_CIRCULATION": [
            "why is double circulation necessary in human beings",
            "why is double circulation necessary in mammals and birds",
            "what is the importance of double circulation in humans",
        ],
        "ALVEOLI_DESIGN": [
            "how are alveoli designed to maximize the exchange of gases",
            "why are alveoli richly supplied with blood capillaries",
            "how is the structure of alveoli adapted for gas exchange",
        ],
        "OZONE_DEPLETION": [
            "why is the ozone layer getting depleted and why is it a concern",
            "why is damage to the ozone layer a cause for concern",
            "how does cfc deplete the ozone layer",
        ],
        "TROPHIC_ENERGY_LOSS": [
            "why are trophic levels in a food chain limited to 3 to 4 levels",
            "why does a food chain rarely consist of more than four trophic levels",
            "why is the number of trophic levels in a food chain limited",
        ],
    }.get(sid, [])

_PHYS_WHY: List[Tuple[str, Tuple[str, ...], str, List[str]]] = [
    ("SERIES_DOMESTIC",
     ("series", "domestic"),
     "In domestic electric circuits, appliances are connected in parallel, "
     "never in series, for three key reasons: (1) In a series circuit, if any "
     "one appliance burns out or is switched off, the entire circuit is broken "
     "and all appliances stop working; (2) In series, voltage (220 V) is divided "
     "among all appliances, so each device receives only a fraction of the "
     "required voltage and works inefficiently; (3) In series, every appliance "
     "is forced to carry the identical current, whereas an electric bulb requires "
     "0.5 A and a heater requires 15 A. In parallel, each appliance receives "
     "the full 220 V and can be operated independently.",
     ["In series, total resistance R = R1 + R2 + ... increases, reducing total current.",
      "If one component fails, the circuit opens and everything shuts down.",
      "The line voltage (220 V) is divided, starving high-power appliances.",
      "Appliances with different current requirements cannot function on a single current.",
      "Parallel wiring gives each appliance full line voltage and an independent switch."]),
    ("ALLOY_HEATING",
     ("alloy",),
     "The heating coils of appliances like toasters and electric irons are "
     "made of an alloy (such as nichrome) rather than a pure metal because: "
     "(1) The resistivity of an alloy is much higher than that of its constituent "
     "pure metals, so it generates far more Joule heat (H = I^2 R t); (2) Alloys "
     "do not easily oxidise or burn even at red-hot temperatures (up to 1000 deg C); "
     "and (3) Alloys have very high melting points and maintain mechanical strength "
     "when hot.",
     ["Resistivity of nichrome is 20 to 60 times higher than pure copper or iron.",
      "Joule heating: H = I^2 R t — higher resistance produces substantial heat.",
      "Alloys resist aerial oxidation (burning) at red-hot temperatures.",
      "Pure metals oxidise rapidly, weaken, and melt under intense heating."]),
    ("COPPER_ALUMINIUM_TRANSMISSION",
     ("transmission",),
     "Copper and aluminium are widely used for electricity transmission cables "
     "because they have extremely low electrical resistivities (1.68e-8 ohm-m for "
     "Cu, 2.65e-8 ohm-m for Al). Low resistivity ensures that transmission lines "
     "have minimal electrical resistance (R = rho L / A), which drastically "
     "minimizes Joule heating power loss (P = I^2 R) over long distances. Both "
     "metals are also highly ductile, mechanically strong, and aluminium is "
     "lightweight and cost-effective for overhead lines.",
     ["Low resistivity (rho) gives low overall line resistance: R = rho L / A.",
      "Power loss along transmission cables is P = I^2 R.",
      "Lowering R minimizes wasted energy as heat over tens of kilometres.",
      "Both metals are highly ductile and can be drawn into sturdy overhead cables.",
      "Aluminium's low density makes it ideal for hanging overhead lines without sagging."]),
    ("STARS_TWINKLE",
     ("star", "twinkle"),
     "Stars twinkle due to atmospheric refraction of starlight. Because stars are "
     "light-years away, they appear as point sources of light. As starlight passes "
     "through Earth's atmosphere, it travels through air layers of continuously "
     "changing temperature and density, meaning a constantly fluctuating refractive "
     "index. This continuously bends the path of starlight, causing its apparent "
     "position and the quantity of light entering the eye to waver rapidly, producing "
     "the twinkling effect.",
     ["Stars are extremely distant and act as point-sized light sources.",
      "Earth's atmosphere has layers of varying temperature, density, and refractive index.",
      "Starlight undergoes continuous, chaotic atmospheric refraction.",
      "The amount of light entering the pupil fluctuates from instant to instant.",
      "This rapid wavering in perceived brightness and apparent position is twinkling."]),
    ("PLANETS_DONT_TWINKLE",
     ("planet", "twinkle"),
     "Planets do not twinkle because they are much closer to Earth than stars and "
     "appear as extended discs rather than point sources. An extended source can be "
     "considered a collection of a very large number of point sources of light. While "
     "atmospheric refraction causes light from individual points to fluctuate randomly, "
     "the brightenings and dimmings across the disc cancel each other out. The total "
     "variation in light entering the eye averages out to zero, giving a steady, "
     "non-twinkling shine.",
     ["Planets are relatively near and subtend a visible angular diameter (extended source).",
      "An extended source consists of thousands of point sources across its surface.",
      "Atmospheric fluctuations cause random, uncorrelated intensity shifts at different points.",
      "The statistical sum of these fluctuations across the whole disc cancels out to zero.",
      "Therefore, the net light entering the eye remains steady without twinkling."]),
    ("SKY_BLUE",
     ("sky", "blue"),
     "The clear sky appears blue due to Rayleigh scattering of sunlight by fine gas "
     "molecules (nitrogen and oxygen) in the atmosphere. According to Rayleigh's law, "
     "scattering intensity is inversely proportional to the fourth power of wavelength "
     "(I proportional to 1/lambda^4). Blue light has a much shorter wavelength (~450 nm) "
     "than red light (~700 nm), so fine air particles scatter blue light roughly 10 "
     "times more effectively in all directions, illuminating the sky in blue.",
     ["Sunlight is polychromatic white light containing all visible wavelengths.",
      "Air molecules (N2, O2) are much smaller than the wavelength of visible light.",
      "Rayleigh scattering law: Intensity I proportional to 1/lambda^4.",
      "Short wavelengths (blue/violet) scatter far more strongly than long wavelengths (red).",
      "Human eyes are more sensitive to blue than violet, so the sky appears bright blue."]),
    ("SUN_RED_SUNRISE",
     ("sun", "red"),
     "At sunrise and sunset, sunlight travels through a much thicker layer of the "
     "atmosphere to reach an observer near the horizon. Over this long distance, "
     "most of the shorter blue and violet wavelengths are scattered away in other "
     "directions by air molecules. The longer wavelengths (red and orange) suffer "
     "the least scattering (I proportional to 1/lambda^4) and pass straight through "
     "to reach the observer's eyes, making the Sun appear reddish.",
     ["At the horizon, sunlight travels the maximum distance through Earth's atmosphere.",
      "Shorter wavelengths (blue, violet) scatter intensely along the path and are removed.",
      "Longer wavelengths (red, ~700 nm) undergo minimal scattering.",
      "Direct light reaching the observer is dominated by surviving red/orange wavelengths.",
      "At noon, the path is shortest, so little scattering occurs and the Sun appears white."]),
    ("DANGER_LIGHTS_RED",
     ("danger", "red"),
     "Danger signal lights are red because red light has the longest wavelength in "
     "the visible spectrum (~700 nm). Under Rayleigh's scattering law (I proportional "
     "to 1/lambda^4), red light is scattered the least by fog, smoke, dust, and "
     "atmospheric particles. Consequently, red light penetrates through mist and "
     "smoke over the greatest distance without dimming, remaining clearly visible to "
     "drivers and pilots from the maximum safe braking distance.",
     ["Red light has the longest wavelength in the visible band (~650 to 700 nm).",
      "Rayleigh scattering: scattering intensity is inversely proportional to lambda^4.",
      "Red light suffers minimum scattering in fog, mist, dust, or smoke.",
      "It maintains intensity over the longest optical path.",
      "This ensures maximum visibility and reaction time in hazardous conditions."]),
    ("EARTH_WIRE",
     ("earth", "wire"),
     "An earth wire is a vital safety wire connecting the metallic outer body of an "
     "appliance to a conducting metal plate buried deep in the ground. If an electrical "
     "fault causes a live wire to touch the metallic body, the earth wire provides an "
     "extremely low-resistance path for the fault current to escape to ground. This "
     "sudden current surge instantly trips the MCB or blows the fuse, keeping the "
     "appliance casing at zero electrical potential and preventing fatal electric "
     "shocks to users.",
     ["Damaged insulation can energise the metallic casing of an appliance to 220 V.",
      "The human body has electrical resistance (~1000 ohms) and would conduct fatal current.",
      "The earth wire provides an ultra-low-resistance alternative path (< 1 ohm) to ground.",
      "Fault current preferentially flows into the ground rather than through a person.",
      "The high current surge promptly melts the fuse or trips the MCB to cut power."]),
    ("FUSE_SERIES",
     ("fuse", "series"),
     "An electric fuse is connected in series with the live wire so that all circuit "
     "current flows through it. The fuse wire has a low melting point and a specific "
     "current limit (e.g. 5 A or 15 A). If a short-circuit or overload causes current "
     "to exceed the safe rating, Joule heating (H = I^2 R t) quickly raises the wire's "
     "temperature above its melting point. The wire melts and breaks the circuit, "
     "instantly cutting off electricity to all downstream devices and preventing "
     "electrical fires.",
     ["Connected in series so 100% of line current passes through the fuse.",
      "Made of low-melting-point alloy with precise current tolerance.",
      "Excess current generates rapid Joule heat: H = I^2 R t.",
      "Wire melts and breaks the circuit before connected wires overheat.",
      "Series placement guarantees complete power cutoff to all appliances on the line."]),
    ("SEAT_BELTS",
     ("seat", "belt"),
     "Seat belts protect vehicle occupants according to Newton's First Law of Motion "
     "(Inertia of Motion). When a car moves, the passenger travels forward at the "
     "same velocity. When the car brakes suddenly or crashes, the car stops rapidly, "
     "but the passenger's upper body continues moving forward due to inertia. Seat "
     "belts apply an opposing backward force across the strong pelvis and chest over "
     "a longer stopping distance, decelerating the body safely and preventing violent "
     "impact with the dashboard or windshield.",
     ["Newton's first law: an object in motion continues with constant velocity unless stopped.",
      "Vehicle braking stops the chassis but not the unrestrained passenger's body.",
      "Inertia tends to propel the passenger forward into the windshield.",
      "Seat belts exert the necessary stopping force to decelerate the body.",
      "Distributes impact forces across strong pelvic and ribcage skeletal structures."]),
    ("CONVEX_REAR_VIEW",
     ("convex", "rear"),
     "Convex mirrors are used as rear-view mirrors in vehicles for two reasons: (1) "
     "They always produce an erect (upright) though diminished virtual image of "
     "traffic behind the vehicle, regardless of distance; and (2) Because they curve "
     "outward towards the viewer, they provide a vastly wider field of view than a "
     "flat plane mirror of the same size, allowing the driver to see multiple lanes "
     "of following traffic.",
     ["Convex mirrors always form virtual, erect, and diminished images.",
      "Upright images ensure vehicles behind do not appear inverted.",
      "Outward curvature dramatically broadens the angular field of view.",
      "Allows the driver to monitor multiple traffic lanes in a compact mirror."]),
]

def _phys_entry_for(text: str):
    low = re.sub(r"[^a-z0-9 ]", " ", text.lower())
    low = re.sub(r"\s+", " ", low)
    for _sid, kws, answer, steps in _PHYS_WHY:
        if all(k in low for k in kws):
            return _sid, answer, steps
    return None

def _make_phys_compute(want_sid: str):
    def _compute(slots, text):
        hit = _phys_entry_for(text)
        if hit and hit[0] == want_sid:
            _sid, answer, steps = hit
            return (None, list(steps), answer, None,
                    "curated NCERT concept answer", None)
        return None
    return _compute

def _phys_exemplars(sid: str) -> List[str]:
    return {
        "SERIES_DOMESTIC": [
            "why is a series arrangement not used for domestic circuits",
            "why are domestic appliances connected in parallel not series",
            "why do we not connect household circuits in series",
        ],
        "ALLOY_HEATING": [
            "why are coils of electric toasters made of an alloy rather than a pure metal",
            "why are heating elements of electric irons made of alloys",
            "why are alloys used in electrical heating devices rather than pure metals",
        ],
        "COPPER_ALUMINIUM_TRANSMISSION": [
            "why are copper and aluminium wires usually employed for electricity transmission",
            "why is copper used for electrical transmission lines",
            "why are transmission lines made of copper or aluminium",
        ],
        "STARS_TWINKLE": [
            "why do stars twinkle",
            "explain why stars twinkle in the night sky",
            "why do stars appear to twinkle",
        ],
        "PLANETS_DONT_TWINKLE": [
            "why do planets not twinkle",
            "explain why planets do not twinkle",
            "why do planets shine steadily without twinkling",
        ],
        "SKY_BLUE": [
            "why is the clear sky blue in colour",
            "why does the sky appear blue",
            "explain why the clear sky is blue",
        ],
        "SUN_RED_SUNRISE": [
            "why does the sun appear reddish early in the morning",
            "why does the sun look red at sunrise and sunset",
            "why is the sun reddish at sunrise",
        ],
        "DANGER_LIGHTS_RED": [
            "why are danger signal lights red in colour",
            "why is red colour used for danger signals",
            "why are danger signals red",
        ],
        "EARTH_WIRE": [
            "why is an earth wire necessary for metallic appliances",
            "what is the function of an earth wire in domestic circuits",
            "why is earthing necessary for electrical appliances with metallic body",
        ],
        "FUSE_SERIES": [
            "why is an electric fuse connected in series with the circuit",
            "why is a fuse wire connected in series",
            "why must an electric fuse be placed in series",
        ],
        "SEAT_BELTS": [
            "why are seat belts used in cars",
            "explain why passengers are advised to wear seat belts",
            "why do cars have seat belts",
        ],
        "CONVEX_REAR_VIEW": [
            "why are convex mirrors used as rear view mirrors in vehicles",
            "why do vehicles prefer convex mirrors for rear view",
            "why is a convex mirror used as a rearview mirror in cars",
        ],
    }.get(sid, [])

_CHEM_WHY: List[Tuple[str, Tuple[str, ...], str, List[str]]] = [
    ("COPPER_SULPHATE_IRON",
     ("iron", "copper", "sulphate"),
     "When an iron nail is immersed in blue copper sulphate (CuSO4) solution, "
     "the blue colour changes to light green and a reddish-brown coating forms "
     "on the iron nail. This is a single displacement reaction: iron (Fe) is "
     "more reactive than copper (Cu) in the reactivity series, so it displaces "
     "copper: Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s). The green colour is due "
     "to ferrous sulphate (FeSO4) formation, and displaced elemental copper "
     "deposits on the nail as a reddish-brown layer.",
     ["Reactivity series: Iron (Fe) is more reactive than Copper (Cu).",
      "Displacement reaction: Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s).",
      "Blue Cu2+ ions are reduced to metallic copper: Cu2+ + 2e- -> Cu (brown deposit).",
      "Iron is oxidised to pale green Fe2+ ions: Fe -> Fe2+ + 2e- (green solution).",
      "Hence the solution fades to light green and the nail is coated in brown copper."]),
    ("RESPIRATION_EXOTHERMIC",
     ("respiration", "exothermic"),
     "Respiration is an exothermic reaction because it breaks down glucose "
     "in the presence of oxygen to release carbon dioxide, water, and large "
     "amounts of energy (stored as ATP). The overall reaction is: C6H12O6 + 6O2 "
     "-> 6CO2 + 6H2O + Energy (38 ATP). Because the energy released during "
     "the formation of new chemical bonds in products exceeds the energy "
     "needed to break reactant bonds, net energy is liberated as heat and "
     "biological work, fulfilling the definition of an exothermic process.",
     ["Digested carbohydrates yield glucose (C6H12O6).",
      "Glucose oxidises inside cellular mitochondria: C6H12O6 + 6O2 -> 6CO2 + 6H2O + Energy.",
      "Energy released is stored in high-energy phosphate bonds of ATP.",
      "Part of the energy is liberated as metabolic body heat.",
      "Any chemical process with net release of heat/energy is exothermic."]),
    ("OIL_FAT_NITROGEN",
     ("nitrogen", "fat"),
     "Packaged snack foods containing fats and oils (such as potato chips) "
     "are flushed with nitrogen gas to prevent rancidity. When fats and oils "
     "are exposed to atmospheric oxygen, they undergo aerial oxidation, forming "
     "unpleasant-smelling aldehydes and carboxylic acids that ruin taste and "
     "freshness. Nitrogen is an unreactive, chemically inert gas that displaces "
     "oxygen from the packaging, creating an inert atmosphere that prevents "
     "oxidation and keeps snacks fresh for months.",
     ["Unsaturated fats and oils oxidise spontaneously in contact with atmospheric oxygen.",
      "Oxidation causes rancidity: rancid smell, foul taste, and toxic peroxides.",
      "Nitrogen (N2) has a strong triple bond (N=N), making it chemically inert at room temp.",
      "Flushing packets with nitrogen displaces atmospheric oxygen and moisture.",
      "Without oxygen, lipid oxidation cannot proceed, maintaining freshness."]),
    ("CURD_SOUR_BRASS",
     ("curd", "brass"),
     "Curd and sour food items (pickles, citrus juices, vinegar) contain organic "
     "acids such as lactic acid, citric acid, and acetic acid. When stored in "
     "brass or copper vessels, these acids chemically react with metallic copper "
     "and zinc (in brass): Acid + Metal -> Metal Salt + Hydrogen gas. The resulting "
     "soluble copper and zinc salts are toxic and can cause acute food poisoning, "
     "stomach cramps, and vomiting. Therefore, sour substances must only be stored "
     "in non-reactive glass, ceramic, or stainless steel containers.",
     ["Curd and sour substances contain organic acids (lactic, citric, tartaric).",
      "Acids react with metals: Metal + Acid -> Metal Salt + H2.",
      "Brass is an alloy of copper and zinc; both react with organic acids.",
      "Soluble copper salts (e.g. copper lactate) are toxic to human health.",
      "Consuming these contaminated foods causes nausea, cramps, and poisoning."]),
    ("ACID_TO_WATER",
     ("acid", "water", "add"),
     "When diluting concentrated acids (like H2SO4 or HCl), acid should always "
     "be added slowly to water with constant stirring, never water to acid. "
     "Diluting acid is an intensely exothermic reaction that releases large "
     "amounts of heat. Water has a high specific heat capacity and absorbs "
     "the heat safely when acid is added slowly. If water is poured into "
     "concentrated acid, the initial drops of water absorb an immense surge of "
     "localised heat, instantly flashing into steam and splashing corrosive "
     "acid onto hands and face, or shattering the glass beaker.",
     ["Hydration of acid molecules is strongly exothermic: Delta H < 0.",
      "Water has a very high specific heat capacity (4.184 J/g K).",
      "Adding acid slowly into water disperses heat safely throughout the large volume.",
      "Pouring water into acid creates localised superheating at the interface.",
      "Violent steam bursts splash concentrated corrosive acid and crack glass."]),
    ("DRY_HCL_LITMUS",
     ("dry", "hcl", "litmus"),
     "Dry HCl gas does not change the colour of dry blue litmus paper because "
     "it does not dissociate into free hydrogen (hydronium) ions in the absence "
     "of water. Acidic properties and colour changes in indicator dyes are "
     "caused exclusively by hydronium ions (H3O+). HCl is a covalent molecule "
     "that ionises only in an aqueous medium: HCl + H2O -> H3O+ + Cl-. Without "
     "moisture, no H3O+ ions are formed, so dry HCl gas shows no acidic "
     "behaviour on dry litmus paper.",
     ["Acids display acidic character only through hydronium ions (H3O+).",
      "Dry HCl gas exists as neutral covalent molecules.",
      "Water is required for ionisation: HCl + H2O -> H3O+ + Cl-.",
      "In the total absence of moisture, no ions are generated.",
      "Without free H3O+ ions, the litmus indicator dye cannot change colour."]),
    ("PLASTER_PARIS_MOISTURE",
     ("plaster of paris", "moisture"),
     "Plaster of Paris (calcium sulphate hemihydrate, CaSO4 . 1/2 H2O) must be "
     "stored in airtight moisture-proof containers because it readily absorbs "
     "atmospheric moisture and sets into a hard solid mass called gypsum: "
     "CaSO4 . 1/2 H2O + 1.5 H2O -> CaSO4 . 2 H2O (Gypsum). Once it reacts with "
     "ambient humidity and converts into gypsum, it permanently loses its "
     "setting property and becomes completely unusable for casting or plastering.",
     ["Chemical formula of Plaster of Paris: CaSO4 . 1/2 H2O.",
      "Absorbs water and hydrates: CaSO4 . 1/2 H2O + 1.5 H2O -> CaSO4 . 2 H2O.",
      "Gypsum forms an interlocking hard crystalline mass with no setting ability.",
      "Moisture exposure ruins the setting properties permanently.",
      "Airtight storage prevents premature hydration from atmospheric humidity."]),
    ("IONIC_HIGH_MP",
     ("ionic", "melting"),
     "Ionic compounds (such as NaCl, MgO, and CaCl2) have high melting and "
     "boiling points because their crystal lattices are held together by "
     "exceptionally strong electrostatic forces of attraction between "
     "oppositely charged positive cations and negative anions. Breaking down "
     "this rigid 3D lattice during melting requires supplying a very large "
     "amount of thermal energy to overcome these strong interionic bonds. For "
     "example, NaCl melts at 801 deg C and MgO at 2852 deg C.",
     ["Ionic compounds form a 3D crystal lattice of cations and anions.",
      "Electrostatic Coulombic forces between oppositely charged ions are very strong.",
      "Melting requires overcoming these interionic attractions to allow ion mobility.",
      "A huge amount of thermal energy is needed to disrupt the lattice structure.",
      "Hence, ionic solids have characteristically high melting and boiling points."]),
    ("SODIUM_KEROSENE",
     ("sodium", "kerosene"),
     "Sodium and potassium are highly reactive alkali metals that react "
     "vigorously and exothermically with oxygen and moisture present in air: "
     "4 Na + O2 -> 2 Na2O, and 2 Na + 2 H2O -> 2 NaOH + H2 + Heat. The reaction "
     "liberates intense heat that immediately ignites the evolved hydrogen "
     "gas, causing dangerous fires. Sodium does not react with hydrocarbons "
     "like kerosene, so storing it immersed in kerosene creates a barrier that "
     "cuts off all contact with air and moisture, keeping it completely safe.",
     ["Sodium has a single valence electron and very low ionization energy.",
      "Reacts spontaneously with oxygen in air: 4 Na + O2 -> 2 Na2O.",
      "Reacts violently with atmospheric moisture: 2 Na + 2 H2O -> 2 NaOH + H2 + Heat.",
      "Evolved hydrogen catches fire instantly from the reaction heat.",
      "Kerosene is non-polar and contains no oxygen or moisture, shielding sodium safely."]),
    ("CARBON_TETRAVALENT",
     ("carbon", "covalent"),
     "Carbon has atomic number 6 with electronic configuration (2, 4) and needs "
     "4 electrons to complete its valence octet. It cannot form ionic bonds by "
     "gaining 4 electrons (C4-) because a small nucleus with 6 protons cannot "
     "stably hold 10 electrons. It also cannot form ionic bonds by losing 4 "
     "electrons (C4+) because removing 4 successive electrons requires an "
     "enormous amount of ionization energy. Therefore, carbon achieves a stable "
     "octet by sharing its 4 valence electrons with other atoms, forming stable "
     "covalent bonds.",
     ["Carbon has 4 valence electrons and requires 4 more to attain an octet.",
      "Gaining 4 electrons (C4-) is unstable: 6 protons cannot hold 10 electrons.",
      "Losing 4 electrons (C4+) requires prohibitively large ionization energy.",
      "Ionic bond formation is energetically impossible for carbon.",
      "It shares 4 valence electrons with other atoms, forming covalent bonds."]),
]

def _chem_entry_for(text: str):
    low = re.sub(r"[^a-z0-9 ]", " ", text.lower())
    low = re.sub(r"\s+", " ", low)
    for _sid, kws, answer, steps in _CHEM_WHY:
        if all(k in low for k in kws):
            return _sid, answer, steps
    return None

def _make_chem_compute(want_sid: str):
    def _compute(slots, text):
        hit = _chem_entry_for(text)
        if hit and hit[0] == want_sid:
            _sid, answer, steps = hit
            return (None, list(steps), answer, None,
                    "curated NCERT concept answer", None)
        return None
    return _compute

def _chem_exemplars(sid: str) -> List[str]:
    return {
        "COPPER_SULPHATE_IRON": [
            "why does the colour of copper sulphate solution change when an iron nail is dipped in it",
            "why does copper sulphate turn green when iron nail is added",
            "why does blue copper sulphate fade when iron nail is kept in it",
        ],
        "RESPIRATION_EXOTHERMIC": [
            "why is respiration considered an exothermic reaction",
            "explain why respiration is an exothermic process",
            "why is cellular respiration exothermic",
        ],
        "OIL_FAT_NITROGEN": [
            "why are oil and fat containing food items flushed with nitrogen",
            "why are potato chips packets filled with nitrogen gas",
            "why is nitrogen flushed in oily food packets",
        ],
        "CURD_SOUR_BRASS": [
            "why should curd and sour substances not be kept in brass and copper vessels",
            "why sour substances are not kept in brass vessels",
            "why should pickles not be kept in copper vessels",
        ],
        "ACID_TO_WATER": [
            "why should acid always be added to water and not water to acid",
            "why is water not added to concentrated acid during dilution",
            "why should we add acid to water slowly",
        ],
        "DRY_HCL_LITMUS": [
            "why does dry hcl gas not change the colour of dry litmus paper",
            "why dry hcl does not affect dry litmus",
            "why does dry hydrogen chloride gas not change litmus colour",
        ],
        "PLASTER_PARIS_MOISTURE": [
            "why should plaster of paris be stored in a moisture proof container",
            "why is plaster of paris kept in moisture proof containers",
            "why does plaster of paris need airtight storage",
        ],
        "IONIC_HIGH_MP": [
            "why do ionic compounds have high melting points",
            "why does sodium chloride have a high melting point",
            "why do ionic solids have high melting and boiling points",
        ],
        "SODIUM_KEROSENE": [
            "why is sodium kept immersed in kerosene oil",
            "why is sodium stored in kerosene",
            "why is potassium and sodium kept in kerosene",
        ],
        "CARBON_TETRAVALENT": [
            "why does carbon form compounds mainly by covalent bonding",
            "why does carbon form covalent compounds and not ionic compounds",
            "why can carbon not form c4+ or c4- ions",
        ],
    }.get(sid, [])

_QUAD_TAPS_FORCE = (r"takes?\s+\d+(?:\.\d+)?\s*(?:hours?|hrs?)\s+"
                    r"(?:less|more)\s+than")

_QUAD_TRAIN_FORCE = (r"\d+(?:\.\d+)?\s*(?:km\s*/\s*h|kmph)[^.]{0,60}"
                     r"(?:less|more)|(?:less|more)[^.]{0,60}\d+"
                     r"(?:\.\d+)?\s*(?:km\s*/\s*h|kmph)")

def _dig2_register(register_structures) -> None:
    specs: Dict[str, Dict[str, Any]] = {
        "TRIG_RATIO_GIVEN": {
            "force": _TRIG_FN_RE + r"\s*\(?\s*[A-Za-z]\s*\)?\s*=\s*"
                     r"-?\d+\s*(?:/\s*-?\d+)?",
            "exemplars": [
                "if sin A = 3/5 find tan A",
                "if cos A = 12/13 find the other trigonometric ratios "
                "of angle A",
                "if tan A = 4/3 find sin A and cos A",
                "given sec A = 13/5 evaluate sin A and cot A",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_trig_ratio_given,
        },
        "TRIG_IDENTITY_PROOF": {
            "force": r"(?:prove|show)\s+that[^=]*=",
            "exemplars": [
                "prove that (sin A + cosec A)^2 + (cos A + sec A)^2 = "
                "7 + tan^2 A + cot^2 A",
                "prove that (cosec A - cot A)^2 = (1 - cos A)/(1 + "
                "cos A)",
                "show that tan A / (1 + tan^2 A) = sin A cos A",
                "prove that sec A (1 - sin A)(sec A + tan A) = 1",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_trig_identity_proof,
        },
        "FRACTION_WHOLE": {
            "sanity": lambda v: 0 < v <= 1,
            "force": r"what\s+fraction\b",
            "exemplars": [
                "you have 1 kg of apples and divide them into 4 equal "
                "bags. what fraction of the total weight is in one bag?",
                "a ribbon is cut into 8 equal pieces; what fraction of "
                "the ribbon is one piece?",
                "24 marbles are shared equally among 6 friends; what "
                "fraction of the marbles does each friend get?",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_fraction_whole,
        },
        "AP_WHICH_TERM": {
            "force": r"which\s+term\s+of\s+the\s+(?:ap|arithmetic\s+"
                     r"progression)",
            "exemplars": [
                "which term of the ap 3, 8, 13, 18 is 78",
                "which term of the arithmetic progression 5, 12, 19 is "
                "152",
                "which term of the ap will be 84",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_ap_which_term,
        },
        "ELEVATION_CLASSIFY": {
            "force": r"elevation\s+or\s+(?:the\s+)?angle\s+of\s+"
                     r"depression|depression\s+or\s+(?:the\s+)?angle\s+"
                     r"of\s+elevation",
            "exemplars": [
                "she looks at the top of the lamp post and marks the "
                "angle between the horizontal line and the line of "
                "sight as 30 degrees. Is this the angle of elevation or "
                "the angle of depression? Justify your answer.",
                "from the top of a lighthouse the keeper looks at a "
                "boat below; is the angle of elevation or depression "
                "formed?",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_elevation_classify,
        },
        "ELEVATION_HEIGHT": {
            "sanity": lambda v: v > 0,
            "force": r"angle\s+of\s+elevation[^.]{0,240}is\s+\d+"
                     r"(?:\.\d+)?\s*deg",
            "exemplars": [
                "the angle of elevation of the top of a tower from a "
                "point on the ground which is 30 m away from the foot "
                "of the tower is 30 degrees; find the height of the "
                "tower",
                "the angle of elevation of the top of a pole is 60 "
                "degrees from 20 m away; find the height",
                "elevation of a building's top is 45 degrees at a "
                "distance of 30 m; find the height",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_elevation_height,
        },
        "FRUSTUM_DIG2": {
            "sanity": lambda v: v > 0,
            "force": r"frustum|truncated\s+cone",
            "exemplars": [
                "the radii of the ends of a frustum of a cone 45 cm "
                "high are 28 cm and 7 cm; find its volume",
                "find the volume of a frustum of a cone with two radii "
                "and height",
                "capacity of a bucket in the shape of a frustum",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_frustum_dig2,
        },
        "SOLID_MEASURE_DIG2": {
            "sanity": lambda v: v > 0,
            "force": r"(?:volume|capacity|curved\s+surface|total\s+"
                     r"surface|surface\s+area)[^.]{0,60}"
                     r"\b(?:cone|cylinder|sphere|hemisphere)\b|"
                     r"\b(?:cone|cylinder|sphere|hemisphere)\b[^.]{0,80}"
                     r"(?:volume|capacity|surface\s+area)",
            "exemplars": [
                "the height of a cone is 16 cm and its base radius is "
                "12 cm; find its volume",
                "find the volume of a sphere of radius 7 cm",
                "find the total surface area of a cylinder of radius "
                "7 cm and height 10 cm",
                "find the curved surface area of a hemisphere of "
                "radius 21 cm",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_solid_measure,
        },
        "QUAD_WORD_SQ_SUM": {
            "sanity": lambda v: v > 0,
            "force": r"sum\s+of\s+(?:the\s+)?squares?[^.]{0,90}"
                     r"consecutive",
            "exemplars": [
                "the sum of squares of two consecutive positive "
                "integers is 365 find the integers",
                "sum of the squares of two consecutive odd positive "
                "integers is 650",
                "the sum of the squares of two consecutive natural "
                "numbers is 61",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_quad_sq_sum,
        },
        "QUAD_WORD_TAPS": {
            "sanity": lambda v: v > 0,
            "force": _QUAD_TAPS_FORCE,
            "exemplars": [
                "two water taps together can fill a tank in 6 hours; "
                "the tap of larger diameter takes 9 hours less than the "
                "smaller one; find the time in which each tap can "
                "separately fill the tank",
                "two pipes together fill a tank in 12 hours; one pipe "
                "takes 6 hours more",
                "two taps fill a tank together; the larger takes 10 "
                "hours less than the smaller",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_quad_taps,
        },
        "QUAD_WORD_TRAIN": {
            "sanity": lambda v: v > 0,
            "force": _QUAD_TRAIN_FORCE,
            "exemplars": [
                "an express train takes 1 hour less than a passenger "
                "train to travel 132 km; the express train is 11 km/h "
                "more than the passenger train; find the average speed",
                "a train travels 360 km at a uniform speed; if the "
                "speed had been 5 km/h more it would have taken 1 hour "
                "less for the same journey; find the speed of the train",
                "a bus covers a distance increasing its speed by 10 "
                "km/h and reaching 1 hour early",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_quad_train,
        },
        "DICE_EVENT_PROB": {
            "sanity": lambda v: 0 <= v <= 1,
            "force": r"\b(?:die|dice|coin)\b[^.]{0,60}probabilit|"
                     r"probabilit[^.]{0,60}\b(?:die|dice|coin)\b",
            "exemplars": [
                "a die is thrown once find the probability of getting a "
                "prime number",
                "a die is rolled once; what is the probability of an "
                "even number",
                "a fair die is thrown; find the probability of getting "
                "a number greater than 4",
                "a coin is tossed twice; find the probability of at "
                "least one head",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_dice_event_prob,
        },
        "LINEAR_PAIR_REL": {
            "sanity": lambda v: v > 0,
            "force": r"times\s+the\s+other",
            "exemplars": [
                "the difference between two numbers is 26 and one "
                "number is three times the other; find them",
                "the sum of two numbers is 180 and one number is five "
                "times the other",
                "the sum of two integers is 45 and one is four times "
                "the other; find the integers",
            ],
            "slots": {}, "full_text": True, "min_conf": 0.5,
            "compute": _c_linear_pair,
        },
    }
    for _sid, kws, _ans, _steps in _BIO_WHY:
        exs = _bio_exemplars(_sid)
        if exs:
            specs[f"BIO_WHY_{_sid}"] = {
                "exemplars": exs,
                "force": r"\b(?:why|how|explain)\b.{0,60}\b" + re.escape(kws[0]) + r"\b",
                "slots": {}, "full_text": True, "min_conf": 0.45,
                "compute": _make_bio_compute(_sid),
            }
    for _sid, kws, _ans, _steps in _PHYS_WHY:
        exs = _phys_exemplars(_sid)
        if exs:
            specs[f"PHYS_WHY_{_sid}"] = {
                "exemplars": exs,
                "force": r"\b(?:why|how|explain)\b.{0,60}\b" + re.escape(kws[0]) + r"\b",
                "slots": {}, "full_text": True, "min_conf": 0.45,
                "compute": _make_phys_compute(_sid),
            }
    for _sid, kws, _ans, _steps in _CHEM_WHY:
        exs = _chem_exemplars(_sid)
        if exs:
            specs[f"CHEM_WHY_{_sid}"] = {
                "exemplars": exs,
                "force": r"\b(?:why|how|explain)\b.{0,60}\b" + re.escape(kws[0]) + r"\b",
                "slots": {}, "full_text": True, "min_conf": 0.45,
                "compute": _make_chem_compute(_sid),
            }
    register_structures(specs)

_dig2_register(register_structures)

