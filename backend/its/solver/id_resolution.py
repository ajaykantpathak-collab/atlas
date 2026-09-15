"""id_resolution.py — the ONE canonical bridge between the platform's
two node-id spaces.

The tutoring stack carries two overlapping identifier spaces:

1. CATALOG CONCEPT IDS (the tutor's concept space, the keys of
   ``TutorEngine.concepts``): NCERT-derived ids like ``jemh.103.3``,
   plus synthetic enhanced-node concepts keyed ``enh:<node_id>``
   (e.g. ``enh:c10_bio_cbse_01_001``), written by
   ``backend/tools/seed_enhanced_question_bank.py`` and loaded by
   ``TutorEngine._load_enhanced_nodes``.

2. NODE IDS (the knowledge-graph space, the keys of
   ``load_graph_prerequisites()`` / the SQLite ``knowledge_nodes``
   table): bare ids like ``c10_bio_cbse_01_001`` with NO ``enh:``
   prefix.

Because both spaces are live, call sites historically aliased them
ad-hoc (inline ``startswith("enh:")`` stripping, ``"enh:" + id``
concatenation, suffix heuristics).  This module is now the only place
that does that.  Rules:

- Do NOT rename ids anywhere.  Resolution is a read-time concern.
- Every piece of code that translates between the spaces, or that
  compares an id that might live in either space, calls one of the
  three functions below instead of hand-rolling the prefix dance.

Stdlib-only by design: tutor.py imports this at module level and must
stay import-light (no backend.services, no DB, no numpy).
"""

from __future__ import annotations

from typing import Optional

# The synthetic enhanced-node concept prefix.  ``enh:X`` in concept
# space is the SAME node as bare ``X`` in node space.
ENH_PREFIX = "enh:"


def strip_enh_prefix(raw: object) -> str:
    """The id with ONE leading ``enh:`` prefix removed (whitespace
    trimmed).  Ids without the prefix pass through unchanged."""
    s = str(raw or "").strip()
    if s.startswith(ENH_PREFIX):
        return s[len(ENH_PREFIX):].strip()
    return s


def resolve_node_id(raw: object, engine: object = None) -> Optional[str]:
    """Canonical NODE-space id (bare, no ``enh:`` prefix) for `raw`.

    Accepts an id from either space: ``enh:c10_bio_cbse_01_001`` and
    ``c10_bio_cbse_01_001`` both resolve to ``c10_bio_cbse_01_001``.
    Catalog concept ids that have no node-space twin (``jemh.103.3``)
    pass through as themselves -- mastery maps key such concepts by
    their own id, so they are their own canonical key.

    When `engine` (anything with a ``.concepts`` dict, e.g. the live
    TutorEngine) is given, the result is checked against the loaded
    concept space under both spellings first; an id the engine knows
    is returned in its node-space form, unknown ids still canonicalize
    (best effort) so callers can probe the prerequisite graph with
    them.  Returns None only for empty input.
    """
    base = strip_enh_prefix(raw)
    if not base:
        return None
    if engine is not None:
        concepts = getattr(engine, "concepts", None)
        if isinstance(concepts, dict) and concepts:
            # Known in either spelling -> the node-space form is real.
            if base in concepts or (ENH_PREFIX + base) in concepts:
                return base
    return base


def resolve_concept_id(raw: object, engine: object) -> Optional[str]:
    """Canonical CONCEPT-space id: the exact key under which `raw`
    lives in ``engine.concepts`` (the inverse of `resolve_node_id`).

    Resolution order (first hit wins):
    1. ``raw`` itself is a concept key              -> raw
    2. bare node id with an ``enh:`` concept twin   -> ``enh:<raw>``
    3. ``enh:``-prefixed id whose bare form is a
       concept key                                  -> bare form
    Returns None when no spelling exists in the loaded engine -- the
    caller decides whether that is a 404 or a fuzzy-match fallback.
    """
    s = str(raw or "").strip()
    if not s:
        return None
    concepts = getattr(engine, "concepts", None)
    if not isinstance(concepts, dict) or not concepts:
        return None
    if s in concepts:
        return s
    base = strip_enh_prefix(s)
    if base != s and base in concepts:
        return base
    if ENH_PREFIX + base in concepts:
        return ENH_PREFIX + base
    return None


def same_node(a: object, b: object) -> bool:
    """Space-insensitive node equality: ``enh:X`` and ``X`` are the
    same node.  Case- and whitespace-preserving apart from the prefix
    (ids are lowercase by convention; distinct ids that differ only in
    case must stay distinct)."""
    if a is None or b is None:
        return False
    return strip_enh_prefix(a) == strip_enh_prefix(b)
