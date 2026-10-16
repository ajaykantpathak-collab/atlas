"""semantic_matcher.py — Recognize canonical problem STRUCTURES by meaning.

Fixes the brittleness of keyword triggers: "crawls / creeps / inches along",
"far end / tip / other extremity", "rope extends / is stretched" all match
because recognition runs on EMBEDDINGS (all-MiniLM-L6-v2, local CPU,
same model the routing layer uses), not word lists.

Design:
    - Each canonical structure has 10+ EXEMPLAR problems (paraphrases).
    - Exemplar embeddings are precomputed once and cached.
    - match(text) -> {structure_id: confidence} where confidence is the
      max cosine similarity over that structure's exemplars (0..1).
    - If sentence-transformers is unavailable, falls back to a stem-based
      lexical scorer (light suffix stripping + synonym sets) so the system
      degrades gracefully offline instead of failing.

This is a MODEL, not an LLM: deterministic, fast (~1ms per match after
the one-time 80MB model load), fully local.
"""

from __future__ import annotations

import logging
import os
import re
import threading
from typing import Dict, List, Optional, Tuple

# Set thread limits BEFORE torch loads -- prevents segfaults on Windows
# when multiple threads call model.encode() concurrently.
os.environ.setdefault("OMP_NUM_THREADS", "1")
os.environ.setdefault("MKL_NUM_THREADS", "1")
os.environ.setdefault("OPENBLAS_NUM_THREADS", "1")
os.environ.setdefault("NUMEXPR_NUM_THREADS", "1")
os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

logger = logging.getLogger(__name__)

# --------------------------------------------------------------------------- #
# Exemplars: surface stories that belong to each canonical structure
# --------------------------------------------------------------------------- #

STRUCTURE_EXEMPLARS: Dict[str, List[str]] = {
    "TRAVELER_ON_GROWING_DOMAIN": [
        "An ant starts crawling from one end of a rubber band at 1 cm/s. "
        "The rubber band is initially 1 km long and is being stretched "
        "uniformly at 1 km/s. Will the ant ever reach the other end?",
        "A worm crawls along a rope which is stretched uniformly. Will the "
        "worm reach the far end of the rope? Find the time taken.",
        "A snail moves along a hose that is being stretched at constant "
        "speed while the snail crawls at constant speed. When does it get "
        "to the other extremity?",
        "An insect creeps along a string whose length increases uniformly "
        "with time. Does the insect ever arrive at the tip?",
        "A person walks on a bridge that is being extended from the far "
        "side at a steady rate. Can the person reach the opposite end?",
        "A caterpillar inches along a vine that grows longer at a uniform "
        "rate. Will it ever make it to the tip of the vine?",
        "A beetle crawls on a rubber cord being pulled at both ends so its "
        "length grows linearly. Time for the beetle to cover the whole cord?",
        "A dog runs along a plank whose length is increasing at a constant "
        "rate. When will the dog reach the end of the plank?",
        "A turtle moves from one end of a stretching belt at constant "
        "speed; the belt lengthens uniformly. Prove the turtle reaches the "
        "other end and find how long it takes.",
        "An athlete runs along a corridor that is being lengthened at a "
        "steady pace. Does he ever reach the far wall? How long does it "
        "take?",
        "A robot moves along a conveyor whose length expands uniformly. "
        "Find whether the robot can get to the far extremity.",
    ],
    # Extensible: more structures get exemplar lists as they are added.
}


# --------------------------------------------------------------------------- #
# Embedding backend (lazy, thread-safe singleton)
# --------------------------------------------------------------------------- #

class _Embedder:
    """Thin view over the process-wide shared MiniLM (backend.ai.model_hub).

    PERF (2026-10-03 solve cold-start): this used to load its OWN
    SentenceTransformer("all-MiniLM-L6-v2") instance — the first solve paid
    a second (sometimes third) ~8s model load per worker. Every embedder on
    the solve path now funnels through model_hub's one cached singleton.
    """

    _model = None
    _lock = threading.Lock()
    _failed = False

    @classmethod
    def get(cls):
        if cls._model is None and not cls._failed:
            with cls._lock:
                if cls._model is None and not cls._failed:
                    try:
                        from backend.ai import model_hub
                        cls._model = model_hub.load_sync()
                        logger.info("SemanticMatcher: using shared MiniLM "
                                    "singleton (model_hub)")
                    except Exception as exc:
                        logger.warning("SemanticMatcher: embedding model "
                                       "unavailable (%s) - lexical fallback",
                                       exc)
                        cls._failed = True
        return cls._model


def _cosine(a, b) -> float:
    import numpy as np

    denom = (np.linalg.norm(a) * np.linalg.norm(b))
    return float(np.dot(a, b) / denom) if denom else 0.0


# --------------------------------------------------------------------------- #
# Lexical fallback: stem matching + synonym sets (no exact-word brittleness)
# --------------------------------------------------------------------------- #

_SYNONYMS = {
    "travel_noun": ["ant", "snail", "worm", "beetle", "insect", "bug",
                    "caterpillar", "person", "man", "walker", "boy", "girl",
                    "child", "dog", "cat", "mouse", "turtle", "frog",
                    "runner", "athlete", "robot", "traveler", "traveller"],
    "travel_verb": ["crawl", "creep", "walk", "move", "run", "go", "travel",
                    "march", "climb", "inch", "slide", "proceed", "advance",
                    "head", "progress"],
    "growth": ["stretch", "expand", "grow", "elongate", "lengthen",
               "increase", "extend", "widen", "longer"],
    "domain": ["band", "rope", "hose", "string", "cord", "bridge", "vine",
               "plank", "belt", "corridor", "wire", "cable", "chain",
               "ribbon", "towel", "rubber"],
    "end": ["end", "tip", "extremity", "edge", "far", "other", "opposite",
            "destination", "terminus"],
}


def _stem(word: str) -> str:
    """Light stemming: crawls/crawling/crawled -> crawl."""
    for suf in ("ing", "ed", "es", "s"):
        if word.endswith(suf) and len(word) > len(suf) + 2:
            return word[: -len(suf)]
    return word


def _lexical_score(text: str) -> Dict[str, float]:
    """Score 0..1 per concept using stems + synonyms (not exact words)."""
    words = set(_stem(w) for w in re.findall(r"[a-z]+", text.lower()))
    syn_stems = {k: set(_stem(s) for s in v)
                 for k, v in _SYNONYMS.items()}
    return {k: (len(words & stems) > 0)
            for k, stems in syn_stems.items()}


# --------------------------------------------------------------------------- #
# Public API
# --------------------------------------------------------------------------- #

class SemanticMatcher:
    """Match raw problem text to canonical structures by MEANING."""

    def __init__(self) -> None:
        self._exemplar_vecs: Dict[str, List] = {}
        self._built = False
        self._model_ready = False

    def _build(self) -> None:
        if self._built:
            return
        self._built = True
        model = _Embedder.get()
        self._model_ready = model is not None
        if not self._model_ready:
            return
        try:
            for sid, exemplars in STRUCTURE_EXEMPLARS.items():
                self._exemplar_vecs[sid] = model.encode(
                    exemplars, normalize_embeddings=True)
        except Exception as exc:
            logger.warning("SemanticMatcher: encode failed during build "
                           "(%s) - lexical fallback", exc)
            self._model_ready = False
            self._exemplar_vecs = {}

    def match(self, text: str) -> Dict[str, float]:
        """{structure_id: confidence} - cosine similarity, 0..1."""
        self._build()
        scores: Dict[str, float] = {}
        if self._model_ready:
            model = _Embedder.get()
            try:
                v = model.encode([text], normalize_embeddings=True)[0]
                for sid, vecs in self._exemplar_vecs.items():
                    scores[sid] = max(_cosine(v, ev) for ev in vecs)
                return scores
            except Exception as exc:
                logger.warning("SemanticMatcher: encode failed during match "
                               "(%s) - lexical fallback", exc)
                self._model_ready = False
        # Lexical fallback: fraction of concept groups present,
        # weighted toward the discriminating ones.
        lex = _lexical_score(text)
        weights = {"travel_noun": 0.25, "travel_verb": 0.15,
                   "growth": 0.30, "domain": 0.15, "end": 0.15}
        scores["TRAVELER_ON_GROWING_DOMAIN"] = sum(
            weights[k] * hit for k, hit in lex.items())
        return scores


# --------------------------------------------------------------------------- #
# Singleton
# --------------------------------------------------------------------------- #

_matcher: Optional[SemanticMatcher] = None


def get_matcher() -> SemanticMatcher:
    global _matcher
    if _matcher is None:
        _matcher = SemanticMatcher()
    return _matcher
