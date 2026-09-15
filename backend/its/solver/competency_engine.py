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
        "route_score": round(score, 3),
        "solution_steps": steps,
    }


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


def model_competency(text: str) -> ModelResult:
    hit = route_concept(text)
    if hit is None:
        return _no("no competency concept above threshold")
    concept, score = hit
    cid = concept.get("id", "")
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
                    note=f"competency:{cid} "
                         f"({concept.get('title')}) via catalog steps")
    unbound = "" if bound else "no family binding; "
    # multi-part fallback: whole-text slot extraction often fails for
    # "(a)... (b)..." items because each part has its own slot set --
    # split and execute per part before refusing
    mp = _multipart_execute(text, concept)
    if mp is not None:
        return mp
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
