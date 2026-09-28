"""competency_engine.py -- cross-chapter competency router + family bridge.

Combines the Class 7 Maths competency catalogs (121 NCERT-anchored
concepts, MiniLM-matched) with the deterministic family registry:

    question --> concept router (embedding over ALL chapters, numbers
                 masked so phrasing variants collapse)
             --> binding table
                   |-- family binding  -> the bound structure computes
                   |      (its own guards still apply: refused = fall through)
                   |-- no binding      -> honest no-match; answer_pipeline
                          attaches the concept's solution steps as GUIDED
                          method (teach the parse, rung 6)

The dispatcher registers into modeling_layer (batch-13) so every lane's
registry sweep reaches it.  Confidence 0.88: specific regex families
(0.95+) always win ties; this route only fires when nothing precise
matched -- exactly the phrasing long-tail it exists for.
"""

from __future__ import annotations

import json
import os
import re
from typing import Dict, List, Optional, Tuple

from backend.its.solver.modeling_layer import ModelResult

_COMPETENCY_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                               "..", "competency")

_ROUTE_THRESHOLD = 0.34   # cross-chapter embedding floor
_CONF = 0.88

# --------------------------------------------------------------------- #
# concept -> family binding table (structure MODEL FUNCTION NAMES as
# registered in modeling_layer._STRUCTURES).  Only high-confidence
# mappings live here; unbound compute concepts stay honest no-match and
# guided method content still attaches via competency_guidance().
# --------------------------------------------------------------------- #

_CONCEPT_FAMILY: Dict[str, str] = {
    # ch9 perimeter and area (real catalog IDs)
    "c7m9.1.1": "model_triangle_parallelogram_area",   # parallelogram
    "c7m9.2.1": "model_triangle_parallelogram_area",   # triangle
    "c7m9.3.1": "model_circle_mensuration",            # circumference
    "c7m9.3.2": "model_circle_mensuration",            # circle area
    # ch11 exponents
    "c7m11.2.1": "model_exponent_eval",
    "c7m11.3.1": "model_exponent_eval",
    "c7m11.3.2": "model_exponent_eval",
    "c7m11.3.3": "model_exponent_eval",
    "c7m11.3.6": "model_exponent_eval",
    # ch10 algebraic expressions
    "c7m10.6.1": "model_eval_expr_with_givens",
    # ch5 lines and angles (angle sum on a line / around a point)
    "c7m5.2.1": "model_angle_sum",
    "c7m5.2.2": "model_angle_sum",
    # ch1 integer operations the kernel owns anyway: no binding needed
}

# chapter-level fallbacks: any concept in the chapter binds here when no
# exact entry matched (checked via chapter prefix "c7mN")
_CHAPTER_FAMILY: Dict[str, str] = {
    "c7m7": "model_interest",
}


def _family_for(concept_id: str) -> Optional[str]:
    if concept_id in _CONCEPT_FAMILY:
        return _CONCEPT_FAMILY[concept_id]
    chapter = concept_id.split(".")[0]
    return _CHAPTER_FAMILY.get(chapter)


# --------------------------------------------------------------------- #
# Catalog loading + cross-chapter embedding index (lazy singletons)
# --------------------------------------------------------------------- #

_INDEX = None

# Language subjects are OUT OF SCOPE for competency solving: literature
# answers are interpretive and cannot be verified deterministically, so
# the platform must not pretend to answer them (zero-wrong policy).
# Catalogs for these stay on disk but are never loaded into the router.
# Set LANGUAGE_CATALOGS=1 to re-include (testing/audit only).
LANGUAGE_SUBJECTS = {"hindi", "english", "sanskrit", "urdu", "french"}
LANGUAGE_BOOK_CODES = {
    # Hindi: Malhar 6-8, Ganga 9-10, class 11/12 (Antra Aroh Vitan Antral)
    "fhml", "ghml", "hhml", "ihga", "jhkr", "jhks",
    "khan", "khar", "khat", "khvt", "lhan", "lhar", "lhat", "lhvt",
    # English: readers 6-8, It so Happened, First Flight, Footprints,
    # Hornbill, Snapshot, Woven Words, Flamingo, Vistas, Kaleidoscope
    "fepr", "gepr", "hepr", "iebe", "jeff", "jefp",
    "kehb", "kesp", "keww", "lefl", "levt", "lekl",
}


def _catalog_is_language(cat: Dict) -> bool:
    if os.environ.get("LANGUAGE_CATALOGS") == "1":
        return False
    subject = str(cat.get("subject", "")).strip().lower()
    if subject in LANGUAGE_SUBJECTS:
        return True
    stem = os.path.basename(str(cat.get("source_file", "")))
    stem = re.sub(r"\.txt$", "", stem)
    return stem[:4] in LANGUAGE_BOOK_CODES


def _catalog_files() -> List[str]:
    d = os.path.normpath(_COMPETENCY_DIR)
    files = []
    for f in os.listdir(d):
        if not (f.startswith("catalog_") and f.endswith(".json")):
            continue
        path = os.path.join(d, f)
        try:
            with open(path, encoding="utf-8") as _fh:
                if _catalog_is_language(json.load(_fh)):
                    continue
        except Exception:
            pass
        files.append(path)
    return sorted(files)


def _concept_text(c: Dict) -> str:
    # defensive: tolerate non-string fields in hand-edited catalogs
    raw = [c.get("title", ""), c.get("key_idea", ""), c.get("formula", "")]
    raw.extend(c.get("question_patterns", []) or [])
    parts = []
    for p in raw:
        if isinstance(p, str):
            parts.append(p)
        elif isinstance(p, (list, tuple)):
            parts.extend(str(i) for i in p)
        elif p is not None:
            parts.append(str(p))
    return " . ".join(p for p in parts if p)


def _normalize_question(q: str) -> str:
    t = str(q or "")
    t = re.sub(r"\d+(?:\.\d+)?", "#", t)               # values -> #
    t = (t.replace("+", " plus ").replace("-", " minus ")
          .replace("*", " times ").replace("/", " divided by ")
          .replace("=", " equals ").replace("^", " to the power "))
    # keep a-z plus the Devanagari block: Hindi catalogs must not normalize
    # to empty strings (identical embeddings made them route blind)
    t = re.sub(r"[^a-z\u0900-\u097F# /\t]", " ", t.lower())
    return re.sub(r"\s+", " ", t).strip()


class _Router:
    def __init__(self) -> None:
        from sentence_transformers import SentenceTransformer
        self.concepts: List[Dict] = []
        for path in _catalog_files():
            with open(path, encoding="utf-8") as f:
                cat = json.load(f)
            for c in cat.get("concepts", []):
                c = dict(c)
                c["chapter_title"] = cat.get("chapter_title", "")
                self.concepts.append(c)
        # COMPETENCY_EMBEDDER overrides the default (bge-m3 is stronger
        # and multilingual); MiniLM stays the offline fallback
        self.model = SentenceTransformer(
            os.environ.get("COMPETENCY_EMBEDDER", "all-MiniLM-L6-v2"))
        texts = [_normalize_question(_concept_text(c))
                 for c in self.concepts]
        self.embeddings = self._embed_cached(texts)

    def _embed_cached(self, texts):
        """Concept embeddings only change when catalogs or the model
        change — cache to disk so restarts skip the CPU-heavy encode
        (minutes with bge-m3 -> milliseconds)."""
        import hashlib
        import numpy as np
        mname = os.environ.get("COMPETENCY_EMBEDDER",
                               "all-MiniLM-L6-v2")
        key = hashlib.sha256(
            (mname + "||" + "\x00".join(texts)).encode()).hexdigest()[:24]
        cache = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                             "..", "..", "..", "cbse_data",
                             f"concept_embed_{key}.npy")
        cache = os.path.normpath(cache)
        if os.path.exists(cache):
            try:
                return np.load(cache)
            except Exception:
                pass
        emb = self.model.encode(texts, normalize_embeddings=True)
        try:
            np.save(cache, emb)
        except Exception:
            pass
        return emb

    def route(self, text: str) -> Optional[Tuple[Dict, float]]:
        if not self.concepts:
            return None
        by_id = {c["id"]: c for c in self.concepts}

        # Stage A: deterministic structural keyword overrides (ported from
        # the competency folder's matcher -- these catch the phrasings
        # where embedding similarity between sibling concepts is too
        # close).  Order matters: most specific first.
        override = _keyword_override(text.lower(), by_id)
        if override is not None:
            return override, 0.99

        # Stage B: embedding match across all chapters
        q = self.model.encode([_normalize_question(text)],
                              normalize_embeddings=True)[0]
        scores = self.embeddings @ q
        best = max(range(len(scores)), key=lambda i: scores[i])
        if scores[best] < _ROUTE_THRESHOLD:
            return None
        return self.concepts[best], float(scores[best])


def _keyword_override(q_lower: str,
                      by_id: Dict[str, Dict]) -> Optional[Dict]:
    """Structural keyword overrides, ported from concept_matcher."""

    def pick(cid: str) -> Optional[Dict]:
        return by_id.get(cid)

    # --- exponents / powers (chapter 11) ---
    if any(w in q_lower for w in
           ("power 0", "to the 0", "zero exponent", "raised to 0")):
        c = pick("c7m11.3.6")
        if c:
            return c
    # strict power-times forms only: the loose "times" + "power" rule
    # hijacked non-exponent questions once routing went cross-chapter
    if "squared times" in q_lower or "cubed times" in q_lower or \
            "power times power" in q_lower:
        c = pick("c7m11.3.1")
        if c:
            return c
    m = re.search(r"(?:raised to the power|to the power)\s+"
                  r"(?:of\s+)?(\d+)", q_lower)
    if m and int(m.group(1)) != 0:
        c = pick("c7m11.2.1")
        if c:
            return c
    if ("cubed" in q_lower or "squared" in q_lower) and \
            "times" not in q_lower and "terms" not in q_lower:
        c = pick("c7m11.2.1")
        if c:
            return c

    # --- fractions (chapter 2) ---
    if "reciprocal" in q_lower:
        c = pick("c7m2.2.1")
        if c:
            return c
    has_per = " per " in q_lower or " using " in q_lower or \
        " for each " in q_lower
    has_how_much = "how much" in q_lower or "find the total" in q_lower \
        or "what is the total" in q_lower
    has_quantity = any(w in q_lower for w in
                       ("distance", "total", "cost", "amount", "price",
                        "weight", "length"))
    has_of_phrase = " of " in q_lower and any(w in q_lower for w in
                                              ("litre", "hour", "day",
                                               "unit", "metre", "meter"))
    # cross-chapter guard: interest questions carry their own chapter's
    # signals -- never let the rate x quantity rule hijack them
    if not any(w in q_lower for w in ("interest", "per annum", "%")):
        if (has_per or has_of_phrase) and has_how_much and has_quantity:
            c = pick("c7m2.1.1")
            if c:
                return c

    # --- probability (chapter 3) ---
    if any(w in q_lower for w in
           ("probability", "chance of", "die is rolled", "coin is tossed",
            "dice is rolled", "rolled once", "tossed once",
            "favorable outcome", "favourable outcome", "equally likely")):
        c = pick("c7m3.6.1")
        if c:
            return c

    # --- simple equations applications (chapter 4) ---
    has_sum = "sum of" in q_lower or "sum is" in q_lower
    has_exceeds = "exceeds" in q_lower or "exceeded by" in q_lower \
        or "more than" in q_lower
    has_two_unknowns = any(w in q_lower for w in
                           ("two numbers", "two digits", "both numbers"))
    has_setup = "set up" in q_lower or "find both" in q_lower \
        or "find the numbers" in q_lower
    if (has_sum and has_exceeds) or (has_two_unknowns and has_setup):
        c = pick("c7m4.6.1")
        if c:
            return c

    # --- triangle inequality (chapter 6) ---
    if "can a triangle have" in q_lower or \
            "is it possible to have a triangle" in q_lower or \
            "sum of two sides" in q_lower or \
            "triangle inequality" in q_lower or \
            (re.search(r"sides?\s+\d", q_lower) and
             any(w in q_lower for w in ("can", "possible", "valid"))):
        c = pick("c7m6.7.1")
        if c:
            return c

    # --- expression classification (chapter 10) ---
    # requires an explicit classification verb: bare "monomial" in a
    # power-question once hijacked the exponents override path
    has_classify_verb = any(w in q_lower for w in
                            ("classify", "identify", "which type",
                             "state whether", "is it a"))
    if has_classify_verb and any(w in q_lower for w in
                                 ("monomial", "binomial", "trinomial",
                                  "how many terms")):
        c = pick("c7m10.5.1")
        if c:
            return c

    # --- kinematics: equations of motion ---
    # "accelerates from rest at a for t -> find final velocity" is
    # v = u + at (keph.2.4.1).  Guard: must ask for velocity/speed, not
    # distance (that is v^2=u^2+2as / s=ut+at^2/2, handled separately).
    has_accel = any(w in q_lower for w in
                    ("accelerat", "decelerat", "retard"))
    asks_velocity = any(w in q_lower for w in
                        ("final velocity", "velocity after",
                         "final speed", "speed after",
                         "find the velocity", "attain"))
    if has_accel and asks_velocity and \
            re.search(r"\d", q_lower) and "distance" not in q_lower:
        c = pick("keph.2.4.1")
        if c:
            return c
    # deceleration asks: "moving at u m/s comes to a stop in t s ->
    # find the acceleration" is a = (v - u)/t (keph102.2.3.1), NOT the
    # speed-conversion concept the semantic router prefers.
    asks_accel = any(w in q_lower for w in
                     ("find the acceleration", "find acceleration",
                      "calculate the acceleration", "retardation",
                      "acceleration produced", "find the retardation"))
    if asks_accel and re.search(r"\d", q_lower):
        c = pick("keph102.2.3.1")
        if c:
            return c
    # free fall is still v = u + at -- 'dropped'/'under gravity' carry
    # the same first-equation shape with a = g.  Guard: velocity ask
    # only (a distance ask under gravity is s = ut + at^2/2).
    has_fall = any(w in q_lower for w in
                   ("dropped", "free fall", "falls freely",
                    "under gravity", "under g"))
    if has_fall and asks_velocity and re.search(r"\d", q_lower) \
            and "distance" not in q_lower and "height" not in q_lower:
        c = pick("keph.2.4.1")
        if c:
            return c
    # distance/displacement under constant accel -> s = ut + at^2/2
    asks_dist = any(w in q_lower for w in
                    ("distance", "displacement", "how far",
                     "distance travelled", "distance covered"))
    if (has_accel or has_fall) and asks_dist and \
            re.search(r"\d", q_lower) and "velocity" not in q_lower:
        c = pick("keph.2.4.2")
        if c:
            return c
    return None


def _get_router() -> Optional[_Router]:
    global _INDEX
    if _INDEX is None:
        try:
            _INDEX = _Router()
        except Exception:
            return None
    return _INDEX


# --------------------------------------------------------------------- #
# Dispatcher
# --------------------------------------------------------------------- #

def _no(note: str) -> ModelResult:
    return ModelResult(structure="COMPETENCY", matched=False, confidence=0.0,
                       quantities={}, governing_equation="", note=note)


def route_concept(text: str) -> Optional[Tuple[Dict, float]]:
    """Public: best (concept, score) across all chapters, None below
    threshold.  Used by the solver path AND guidance attachment."""
    router = _get_router()
    if router is None:
        return None
    return router.route(text)


def _route_topk(text: str, k: int = 4) -> List[Tuple[Dict, float]]:
    """Top-k routed concepts above threshold (best first).  Used to retry
    sibling concepts when prose phrasing lands on a near-match whose
    slots can't all be bound."""
    router = _get_router()
    if router is None or not router.concepts or router.model is None:
        return []
    try:
        q = router.model.encode([_normalize_question(text)],
                                normalize_embeddings=True)[0]
        scores = router.embeddings @ q
        order = sorted(range(len(scores)),
                       key=lambda i: -scores[i])[:k]
        return [(router.concepts[i], float(scores[i]))
                for i in order if scores[i] >= _ROUTE_THRESHOLD]
    except Exception:
        return []


def concept_guidance(text: str) -> Optional[Dict]:
    """Guided-method payload for an unmatched question: the routed
    concept's curriculum-aligned solution steps (teach the parse)."""
    hit = route_concept(text)
    if hit is None:
        return None
    concept, score = hit
    steps = [{"step": s.get("step"), "action": s.get("action"),
              "explain": s.get("explain")}
             for s in (concept.get("solution_steps") or [])]
    return {
        "concept_id": concept.get("id"),
        "concept": concept.get("title"),
        "chapter": concept.get("chapter_title"),
        "formula": concept.get("formula"),
        # fact-recall guidance: the concept's authored explanation IS the
        # useful answer for 'what/why/how many' questions that have no
        # compute path
        "definition": concept.get("definition"),
        "key_idea": concept.get("key_idea"),
        "textbook_ref": concept.get("textbook_ref"),
        "worked_examples": concept.get("worked_examples"),
        "route_score": round(score, 3),
        "solution_steps": steps,
    }


_THEN_SPLIT_RE = re.compile(
    r"(?:;|\.\s+|\,\s+)\s*then\s+(?=(?:find|calc|compute|determine|show|"
    r"what|how))|(?<=[a-z0-9])\s+and\s+then\s+(?=(?:find|calc|compute|"
    r"determine))|(?:,|\.|;)\s*hence\s+(?=(?:find|calc|compute|determine|"
    r"show))|(?:,|\.|;)\s*(?:using|use)\s+(?:this|that|the result|it)\s*,?"
    r"\s*(?:to\s+)?(?=(?:find|calc|compute|determine|show))",
    re.I)

# canonical quantity classes for forward-feeding part outputs into the
# next part's inputs ('the velocity found above -> v in the second leg').
# Exact-name binds win first; an alias only fires when it resolves
# unambiguously (one prior output claims the class).
_QUANTITY_ALIASES = {
    "velocity": {"v", "u", "vel", "velocity", "speed", "v_final", "v_0",
                 "v0", "final_velocity"},
    "acceleration": {"a", "accel", "acceleration", "deceleration"},
    "distance": {"s", "d", "distance", "displacement", "x", "h",
                 "height", "depth"},
    "time": {"t", "time", "duration", "period", "T"},
    "mass": {"m", "mass"},
    "force": {"f", "force", "thrust", "weight", "w"},
    "energy": {"e", "energy", "work", "ke", "pe", "q", "heat"},
    "density": {"density", "rho"},
    "volume": {"volume", "vol", "capacity"},
    "radius": {"r", "radius", "r_0", "r0"},
    "angle": {"theta", "angle", "phi"},
    "moles": {"n", "moles", "mole"},
    "charge": {"q", "charge", "current", "i"},
    "voltage": {"voltage", "potential", "emf", "v_emf"},
    "resistance": {"resistance", "resistivity"},
    "power": {"p", "power"},
    "temperature": {"temperature", "temp", "delta_t"},
    "pressure": {"pressure", "press"},
    "area": {"area", "surface_area"},
    "frequency": {"frequency", "freq", "nu"},
    "wavelength": {"wavelength", "lam", "lambda_"},
    "concentration": {"concentration", "molarity", "molality"},
    "cost": {"cost", "price", "revenue", "expenses", "profit", "loss"},
    "rate": {"rate", "rate_percent", "interest_rate"},
}

_ALIAS_CLASS: Dict[str, set] = {}
for _canon_name, _names in _QUANTITY_ALIASES.items():
    for _n in _names:
        _ALIAS_CLASS.setdefault(_n.lower(), set()).add(_canon_name)


def _target_name(concept: Dict) -> Optional[str]:
    """The quantity a concept produces: last bound lhs of its compute
    steps, else its formula's lhs."""
    steps = concept.get("compute_steps") or \
        concept.get("solution_steps") or []
    for s in reversed(steps):
        comp = str(s.get("compute") or "").strip()
        if "=" in comp:
            lhs = comp.split("=", 1)[0].strip()
            if re.match(r"^[A-Za-z_][A-Za-z0-9_]*$", lhs):
                return lhs
    f = str(concept.get("formula") or "").split(";", 1)[0]
    if "=" in f:
        lhs = f.split("=", 1)[0].strip()
        if re.match(r"^[A-Za-z_][A-Za-z0-9_]*$", lhs):
            return lhs
    return None


def _bridge_prior(missing: List[str], slots: Dict[str, float],
                  prior: List[Tuple[str, float]]) -> bool:
    """Feed earlier part outputs into unbound inputs.

    Order: exact name > single unambiguous alias-class match > one
    missing var + one prior output (positional).  Returns True when all
    missing vars got bound."""
    for v in list(missing):
        # 1. exact-name match
        exact = [val for (name, val) in prior if name == v]
        if exact:
            slots[v] = exact[-1]
            missing.remove(v)
            continue
        # 2. alias class: v's class(es) vs each prior name's class(es)
        v_classes = _ALIAS_CLASS.get(v.lower(), set())
        if v_classes:
            cand = [val for (name, val) in prior
                    if _ALIAS_CLASS.get(name.lower(), set()) & v_classes]
            if len(cand) == 1:
                slots[v] = cand[0]
                missing.remove(v)
    if len(missing) == 1 and len(prior) == 1:
        slots[missing[0]] = prior[0][1]
        missing.clear()
    return not missing


def _required_vars(concept: Dict) -> List[str]:
    try:
        from backend.its.solver.slot_extractor import (
            _infer_roles_from_concept, _canonical_set_vars)
    except ImportError:
        return []
    canon = _canonical_set_vars(str(concept.get("id", "")), "")
    if canon:
        return canon
    return _infer_roles_from_concept(concept) or []


def _multipart_execute_multi(text: str) -> Optional[ModelResult]:
    """Cross-concept sequential execution: split the question, route EACH
    clause to its own concept, feed prior outputs forward into unbound
    inputs ('then find the force' binds the velocity just computed),
    aggregate only when every clause computes."""
    try:
        from backend.its.solver.multi_part import split_multi_part
        from backend.its.solver.slot_extractor import (
            extract_slots, extract_slots_detailed)
        from backend.its.solver.catalog_executor import execute_concept
    except ImportError:
        return None
    context = ""
    try:
        reading = split_multi_part(text)
    except Exception:
        reading = None
    if reading is not None and len(reading.parts) >= 2:
        clauses = [(p.label, p.text) for p in reading.parts]
        context = str(getattr(reading, "context", "") or "")
    else:
        pieces = _THEN_SPLIT_RE.split(str(text or ""))
        clauses = [(str(i + 1), p.strip()) for i, p in enumerate(pieces)
                   if p and p.strip()]
        if len(clauses) < 2:
            return None
    lines, nums, cids = [], [], []
    prior: List[Tuple[str, float]] = []
    for label, clause in clauses:
        # shared preamble numbers count as givens for every part
        probe = (context + " " + clause).strip() if context else clause
        try:
            hit = route_concept(probe)
        except Exception:
            return None
        if hit is None:
            hit = route_concept(clause)  # context may dilute the match
        if hit is None:
            return None
        concept, _score = hit
        try:
            det = extract_slots_detailed(probe, concept)
            slots = dict(det.values) if det and det.values else None
        except Exception:
            slots = None
        if slots is None:
            try:
                s2 = extract_slots(clause, concept)
                slots = dict(s2) if s2 else None
            except Exception:
                slots = None
        required = _required_vars(concept)
        slots = slots or {}
        # partial-labeled rescue: extract_slots* refuse outright when a
        # role stays unbound, discarding the labels that DID bind --
        # re-run the labeled matcher so 'mass = 1000' survives before
        # the prior-output bridge fills the rest
        try:
            from backend.its.solver.slot_extractor import (
                _labeled_bindings, _excluded_spans)
            lab, _c = _labeled_bindings(
                probe, list(required) + list(slots),
                _excluded_spans(probe))
            for k, tup in lab.items():
                slots.setdefault(k, tup[0])
        except Exception:
            pass
        missing = [v for v in required if v not in slots]
        if missing and not prior:
            # first clause, free-form prose -- LLM may map its numbers
            # onto the roles (canonicalizer runs per-clause too)
            llm_slots = _llm_canonicalize(clause, concept)
            if llm_slots:
                for k, v in llm_slots.items():
                    slots.setdefault(k, v)
            missing = [v for v in required if v not in slots]
        if missing and prior:
            _bridge_prior(missing, slots, prior)
            missing = [v for v in required if v not in slots]
        if missing and not required:
            # no role model -- cannot know what is missing; try anyway
            pass
        elif missing:
            return None
        try:
            res = execute_concept(concept, slots, probe)
        except Exception:
            return None
        if res is None or not getattr(res, "ok", False):
            return None
        cids.append(concept.get("id", "?"))
        lines.append(f"({label}) {res.value:.6g}")
        nums.append(float(res.value))
        tname = _target_name(concept) or "result"
        prior.append((tname, float(res.value)))
    steps = ["sequential chain: " + " -> ".join(cids),
             "ANSWER: " + "; ".join(lines)]
    return ModelResult(
        structure="COMPETENCY:chain", matched=True, confidence=0.85,
        quantities={"result": nums[0] if len(nums) == 1 else None},
        governing_equation="",
        final_answer="; ".join(lines),
        numeric_answer=nums[-1] if nums else None,
        steps=steps,
        note="sequential chain: " + " -> ".join(cids))


def _multipart_execute(text: str, concept: Dict) -> Optional[ModelResult]:
    """Per-part execution for multi-part questions routed to one concept.

    'Find the values of: (a) 32 x (-18) (b) ...' fails whole-text slot
    extraction (each part has its own slot set) -- split, extract and
    execute per part, aggregate only when EVERY part computes (honest
    aggregation, same policy as multi_part).
    """
    try:
        from backend.its.solver.multi_part import split_multi_part
    except ImportError:
        return None
    try:
        reading = split_multi_part(text)
    except Exception:
        return None
    if reading is None:
        return None
    try:
        from backend.its.solver.slot_extractor import extract_slots
        from backend.its.solver.catalog_executor import execute_concept
    except ImportError:
        return None
    lines = []
    nums = []
    for part in reading.parts:
        slots = None
        try:
            slots = extract_slots(part.text, concept)
        except Exception:
            slots = None
        if not slots:
            return None  # one uncomputable part -> whole item refuses
        try:
            res = execute_concept(concept, slots, part.text)
        except Exception:
            return None
        if res is None or not getattr(res, "ok", False):
            return None
        lines.append(f"({part.label}) {res.value:.6g}")
        nums.append(float(res.value))
    cid = concept.get("id", "")
    steps = [f"multi-part ({reading.kind}) concept {cid}: "
             + "; ".join(lines),
             f"ANSWER: " + "; ".join(lines)]
    return ModelResult(
        structure=f"COMPETENCY:{cid}", matched=True, confidence=0.90,
        quantities={"result": nums[0] if len(nums) == 1 else None} if nums
        else {},
        governing_equation=concept.get("formula", ""),
        final_answer="; ".join(lines),
        numeric_answer=nums[0] if len(nums) == 1 else None,
        steps=steps,
        note=f"competency:{cid} ({concept.get('title')}) multi-part")


# ---- RED-TEAM GUARD (2026-09-12 wave) ------------------------------------- #
# A SUM/S_n ask ("determine S7", "how many terms ... give the sum 120")
# routed to a non-summation concept fabricated slot arithmetic: the
# general-term G.P. concept bound r = 64 (the 7th TERM value!) and
# shipped a * r ** power = 5.0e13 for an answer of 2059.
_SUM_ASK_RE = re.compile(
    r"\bs\s*\d+\s*(?:=|\b|$)|sum\s+of\s+(?:the\s+)?(?:first\s+)?[\w\s]{0,20}"
    r"terms?\b|needed\s+to\s+give\s+the\s+sum|how\s+many\s+terms\b|"
    r"sum\s+to\s+n\s+terms", re.I)
_SUMMATION_CONCEPT_RE = re.compile(
    r"\bsum\b|\bs\s*=?\s*n\b|sigma|series", re.I)


def _sum_ask_coherent(text: str, concept: Dict) -> bool:
    if not _SUM_ASK_RE.search(text or ""):
        return True
    blob = " ".join(str(concept.get(k, "") or "") for k in
                    ("title", "formula", "definition", "key_idea"))
    return bool(_SUMMATION_CONCEPT_RE.search(blob))


# Per-question canonicalizer budget.  Each question used to spend an
# LLM call on the primary concept, every multipart clause, AND each of
# 4 sibling alternates -- ~10 calls/question.  Under upstream congestion
# that turned every abstain into a 60-90s hang.  3 calls is enough to
# cover primary + one alternate + one clause-level retry.  contextvars
# keep concurrent questions on separate budgets.
import contextvars as _cv
_LLM_BUDGET_MAX = 3
# default = full budget so direct model_competency callers (tests,
# tutor paths) still get canonicalizer access; answer() re-arms it
# once per question so all lanes share the same 3-call budget.
_LLM_BUDGET: "_cv.ContextVar[int]" = _cv.ContextVar(
    "llm_budget", default=_LLM_BUDGET_MAX)


def _llm_canonicalize(text: str, concept: Dict) -> Optional[Dict[str, float]]:
    """Free-form phrasing -> slot map via the configured LLM.

    The prompt sees ONLY the concept's required varnames -- the model's
    job is mapping the question's numbers onto roles, not solving.  Keys
    are accepted only if they are required vars or share an alias class
    with exactly one required var.  Returns None on any failure so the
    caller falls back honestly."""
    if _LLM_BUDGET.get() <= 0:
        return None
    try:
        if not (os.environ.get("FREELLM_API_KEY")
                or os.environ.get("GEMINI_API_KEY")):
            return None
        _LLM_BUDGET.set(_LLM_BUDGET.get() - 1)
        required = _required_vars(concept)
        # include the formula's own output vars too: 'find angle given
        # arc, radius' binds the LHS (arc) and leaves the RHS target
        # unbound for the inverse-solve layer
        lhs_vars: List[str] = []
        try:
            for eq in re.split(r"[;\n]", str(concept.get("formula") or "")):
                if "=" in eq:
                    lhs = eq.split("=", 1)[0].strip()
                    if re.fullmatch(r"[A-Za-z_][A-Za-z_0-9]*", lhs):
                        lhs_vars.append(lhs)
        except Exception:
            pass
        all_vars = list(dict.fromkeys(required + lhs_vars))
        if not all_vars:
            return None
        prompt = (
            "You are a precise slot extractor for a STEM solver.\n"
            f"Variables the solver needs: {', '.join(all_vars)}\n"
            "Reply with ONLY a JSON object like {\"u\": 0, \"a\": 2} using "
            "EXACTLY these variable names as keys. Include a variable only "
            "when the question gives it a numeric value. Keep the number "
            "exactly as written — do NOT convert units. 'rest', "
            "'dropped', 'stationary' mean the initial speed is 0. "
            "Never invent values.\n"
            f"Question: {str(text)[:1200]}")
        import concurrent.futures
        import asyncio as _aio

        def _run():
            async def _go():
                from backend.services.llm_client import get_llm_client
                return await get_llm_client().chat(
                    [{"role": "user", "content": prompt}],
                    temperature=0.0, max_tokens=1500)
            return _aio.run(_go())

        with concurrent.futures.ThreadPoolExecutor(max_workers=1) as ex:
            out = ex.submit(_run).result(timeout=15)
        if not out or out.startswith("[LLM"):
            return None
        m = re.search(r"\{.*\}", out, re.S)
        if not m:
            return None
        data = json.loads(m.group(0))
        if not isinstance(data, dict):
            return None
        slots: Dict[str, float] = {}
        req_lower = {v.lower(): v for v in all_vars}
        for k, v in data.items():
            key = str(k).strip()
            target = None
            if key in all_vars:
                target = key
            elif key.lower() in req_lower:
                target = req_lower[key.lower()]
            else:
                # alias-class match: 'velocity' -> 'v' when unambiguous
                kc = _ALIAS_CLASS.get(key.lower(), set())
                cands = [v2 for v2 in all_vars
                         if _ALIAS_CLASS.get(v2.lower(), set()) & kc]
                if len(cands) == 1:
                    target = cands[0]
            if target is None:
                continue
            try:
                slots[target] = float(v)
            except (TypeError, ValueError):
                continue
        return slots or None
    except Exception:
        return None


def model_competency(text: str) -> ModelResult:
    hit = route_concept(text)
    if hit is None:
        # whole-text routing failed -- the item may still be a compound
        # of separately-routable parts
        mp = _multipart_execute_multi(text)
        if mp is not None:
            return mp
        return _no("no competency concept above threshold")
    concept, score = hit
    cid = concept.get("id", "")
    # explicit multi-part markers ((a)...(b)...) must aggregate ALL parts
    # -- the whole-text path would silently answer only the part whose
    # labels happen to bind
    try:
        from backend.its.solver.multi_part import split_multi_part
        _rd = split_multi_part(text)
    except Exception:
        _rd = None
    if _rd is not None and len(_rd.parts) >= 2:
        mp = _multipart_execute(text, concept) or \
            _multipart_execute_multi(text)
        if mp is not None:
            return mp
        # fall through to the single-answer path as before
    elif _THEN_SPLIT_RE.search(text or ""):
        # 'find X, then find Y' -- a sequential chain hiding in a
        # single sentence; the chain feeds clause outputs forward
        mp = _multipart_execute_multi(text)
        if mp is not None:
            return mp
    if not _sum_ask_coherent(text, concept):
        return _no(f"concept {cid}: sum ask routed to a non-summation "
                   f"concept ('{concept.get('title')}') -- fabricated "
                   f"slot arithmetic refused")
    bound = _family_for(cid)

    # optional S2/S4 modules (wired when present): slot extraction from
    # the matched concept's templates, then the catalog's own
    # solution_steps interpreter -- this is what lets chapters 2-13
    # compute even without a registered family
    slots = None
    try:
        from backend.its.solver.slot_extractor import extract_slots
    except ImportError:
        extract_slots = None
    if extract_slots is not None:
        try:
            slots = extract_slots(text, concept)
        except Exception:
            slots = None
    canonicalized = False
    if not slots:
        # deterministic binding failed -- the LLM maps the question's
        # numbers onto the concept's required vars (extraction only,
        # never solving); any failure leaves slots None and the item
        # falls through to an honest refusal
        slots = _llm_canonicalize(text, concept)
        canonicalized = slots is not None

    if bound is not None:
        import backend.its.solver.modeling_layer as _ml
        fn = next((f for f in _ml._STRUCTURES
                   if getattr(f, "__name__", "") == bound), None)
        if fn is not None:
            try:
                result = fn(text)
            except Exception:
                result = None
            if result is not None and result.matched:
                result.note = (f"competency:{cid} "
                               f"({concept.get('title')}); {result.note}"
                               if result.note else
                               f"competency:{cid} "
                               f"({concept.get('title')})")
                return result
            # bound family refused the reading: fall through to the
            # catalog executor with the same concept before giving up

    if slots is not None:
        try:
            from backend.its.solver.catalog_executor import (
                execute_concept)
        except ImportError:
            execute_concept = None
        if execute_concept is not None:
            try:
                exec_res = execute_concept(concept, slots, text)
            except Exception:
                exec_res = None
            if exec_res is not None and getattr(exec_res, "ok", False):
                value = exec_res.value
                steps = list(getattr(exec_res, "steps", []) or [])
                steps.append(f"ANSWER: {value:.6g}")
                return ModelResult(
                    structure=f"COMPETENCY:{cid}", matched=True,
                    confidence=0.90,
                    quantities={**(slots or {}),
                                "result": float(value)},
                    governing_equation=concept.get("formula", ""),
                    final_answer=f"{value:.6g}",
                    numeric_answer=float(value),
                    steps=steps,
                    note=(f"competency:{cid} "
                          f"({concept.get('title')}) via catalog steps"
                          + (" [slots llm-canonicalized]"
                             if canonicalized else "")))
    unbound = "" if bound else "no family binding; "
    # multi-part fallback: whole-text slot extraction often fails for
    # "(a)... (b)..." items because each part has its own slot set --
    # split and execute per part before refusing
    mp = _multipart_execute(text, concept)
    if mp is not None:
        return mp
    mp = _multipart_execute_multi(text)
    if mp is not None:
        return mp
    # sibling-concept retry: prose phrasing can route to a near-match
    # whose slots can't all bind -- canonicalize against the next-best
    # concepts and take the first that executes verified
    for alt, _sc in _route_topk(text, k=4):
        if alt.get("id") == cid:
            continue
        alt_slots = _llm_canonicalize(text, alt)
        if not alt_slots:
            continue
        try:
            from backend.its.solver.catalog_executor import (
                execute_concept as _exec2)
            exec_res = _exec2(alt, alt_slots, text)
        except Exception:
            exec_res = None
        if exec_res is not None and getattr(exec_res, "ok", False):
            value = exec_res.value
            steps = list(getattr(exec_res, "steps", []) or [])
            steps.append(f"ANSWER: {value:.6g}")
            return ModelResult(
                structure=f"COMPETENCY:{alt.get('id')}",
                matched=True, confidence=0.85,
                quantities={**alt_slots, "result": float(value)},
                governing_equation=alt.get("formula", ""),
                final_answer=f"{value:.6g}",
                numeric_answer=float(value),
                steps=steps,
                note=(f"competency:{alt.get('id')} "
                      f"({alt.get('title')}) via catalog steps "
                      f"[slots llm-canonicalized, alt-route]"))
            if alt.get("id") == cid:
                continue
            alt_slots = _llm_canonicalize(text, alt)
            if not alt_slots:
                continue
            try:
                from backend.its.solver.catalog_executor import (
                    execute_concept as _exec2)
                exec_res = _exec2(alt, alt_slots, text)
            except Exception:
                exec_res = None
            if exec_res is not None and getattr(exec_res, "ok", False):
                value = exec_res.value
                steps = list(getattr(exec_res, "steps", []) or [])
                steps.append(f"ANSWER: {value:.6g}")
                return ModelResult(
                    structure=f"COMPETENCY:{alt.get('id')}",
                    matched=True, confidence=0.85,
                    quantities={**alt_slots, "result": float(value)},
                    governing_equation=alt.get("formula", ""),
                    final_answer=f"{value:.6g}",
                    numeric_answer=float(value),
                    steps=steps,
                    note=(f"competency:{alt.get('id')} "
                          f"({alt.get('title')}) via catalog steps "
                          f"[slots llm-canonicalized, alt-route]"))
    return _no(f"{unbound}concept {cid}: slots "
               f"{'extracted' if slots else 'not extracted'} but no "
               f"verified execution path")


def _register_into_ml() -> bool:
    """Import-order-safe registration (same pattern as the other batches)."""
    try:
        import backend.its.solver.modeling_layer as _ml
    except ImportError:
        return False
    if not any(getattr(fn, "__name__", "") == "model_competency"
               for fn in _ml._STRUCTURES):
        _ml._STRUCTURES.append(model_competency)
    return True


if not _register_into_ml():
    pass  # modeling_layer not importable yet; its batch-13 registers us
