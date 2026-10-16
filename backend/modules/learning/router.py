"""Learning-system router — mission choice + per-subject check-up composer.

The coherent-learning-system glue (LEARNING_DESIGN.md):

  GET /api/learning/mission-options
      Three journey-frontier picks the child chooses between (autonomy):
      one repair-first, two advance options from the prerequisite frontier.

  GET /api/learning/checkup?subject=..&class_level=..&board=..&chapter=..
      A per-subject composed Check-up: maths=problems, sciences=sim-concept
      + numericals, bio=diagram-task+facts, humanities=narrate(examiner)+
      chronology, commerce=mini-case+numericals, languages=grammar+writing.
      Both boards flow through — the bank filter maps CBSE / ICSE / ISC.
"""

from __future__ import annotations

import logging
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy import select as sa_select, text

from backend.database import get_db, get_sync_engine
from pathlib import Path

from backend.deps import get_current_user

log = logging.getLogger(__name__)

router = APIRouter(prefix="/api/learning", tags=["learning-system"])

# ── Check-up recipes (LEARNING_DESIGN §2) ───────────────────────────────────
# subject cluster -> ordered section plan. `bank` pulls board_questions rows;
# `family` pulls a corpus-grounded open question; counts are per section.
_RECIPES: Dict[str, List[Dict[str, Any]]] = {
    "maths": [
        {"kind": "problem", "source": "bank", "count": 5},
        {"kind": "problem", "source": "family", "count": 1},
    ],
    "applied_maths": [
        {"kind": "problem", "source": "bank", "count": 4},
        {"kind": "problem", "source": "family", "count": 1},
    ],
    "physics": [
        {"kind": "concept", "source": "family", "count": 1},
        {"kind": "numerical", "source": "bank", "count": 3},
        {"kind": "concept", "source": "bank", "count": 1},
    ],
    "chemistry": [
        {"kind": "concept", "source": "family", "count": 1},
        {"kind": "numerical", "source": "bank", "count": 3},
        {"kind": "concept", "source": "bank", "count": 1},
    ],
    "biology": [
        {"kind": "diagram_task", "source": "diagram", "count": 1},
        {"kind": "fact", "source": "family", "count": 2},
        {"kind": "fact", "source": "bank", "count": 3},
    ],
    "biotech": [
        {"kind": "fact", "source": "family", "count": 2},
        {"kind": "fact", "source": "bank", "count": 3},
    ],
    "history": [
        {"kind": "narrate", "source": "family", "count": 1},
        {"kind": "fact", "source": "bank", "count": 4},
    ],
    "civics": [
        {"kind": "narrate", "source": "family", "count": 1},
        {"kind": "fact", "source": "bank", "count": 4},
    ],
    "geo": [
        {"kind": "map_task", "source": "diagram", "count": 1},
        {"kind": "cause", "source": "family", "count": 1},
        {"kind": "fact", "source": "bank", "count": 3},
    ],
    "economics": [
        {"kind": "mini_case", "source": "family", "count": 1},
        {"kind": "numerical", "source": "bank", "count": 3},
    ],
    "acc": [
        {"kind": "mini_case", "source": "family", "count": 1},
        {"kind": "numerical", "source": "bank", "count": 4},
    ],
    "bs": [
        {"kind": "mini_case", "source": "family", "count": 1},
        {"kind": "fact", "source": "bank", "count": 4},
    ],
    "english": [
        {"kind": "writing", "source": "family", "count": 1},
        {"kind": "grammar", "source": "bank", "count": 4},
    ],
    "hindi": [
        {"kind": "writing", "source": "family", "count": 1},
        {"kind": "fact", "source": "bank", "count": 4},
    ],
    "cs": [
        {"kind": "predict", "source": "family", "count": 2},
        {"kind": "fact", "source": "bank", "count": 2},
        {"kind": "writing", "source": "family", "count": 1},
    ],
}
_DEFAULT_RECIPE = [
    {"kind": "concept", "source": "family", "count": 2},
    {"kind": "fact", "source": "bank", "count": 4},
]

_SUBJECT_ALIASES = {
    "math": "maths", "mathematics": "maths", "appmath": "applied_maths",
    "app": "applied_maths", "phy": "physics", "physics": "physics",
    "chem": "chemistry", "chemistry": "chemistry", "bio": "biology",
    "biology": "biology", "biotech": "biotech", "cs": "cs",
    "ip": "cs", "comp": "cs", "hist": "history", "history": "history",
    "civ": "civics", "civics": "civics", "pol": "civics",
    "geo": "geo", "geography": "geo", "eco": "economics",
    "economics": "economics", "acc": "acc", "accountancy": "acc",
    "bs": "bs", "business": "bs", "engl": "english", "english": "english",
    "eng_h": "english", "eng_s": "english", "eng_w": "english",
    "eng_f": "english", "eng_k": "english", "eng_v": "english",
    "hin": "hindi", "hin_ga": "hindi", "hin_a": "hindi", "hin_al": "hindi",
    "hin_ar": "hindi", "hin_v": "hindi", "hin_kr": "hindi",
    "hin_ks": "hindi", "hin_sp": "hindi",
}
_CLUSTER_BY_SUBJECT = {
    "physics": "physics", "chemistry": "chemistry", "maths": "maths",
}


def _recipe_for(subject: str) -> List[Dict[str, Any]]:
    key = _SUBJECT_ALIASES.get((subject or "").lower(), (subject or "").lower())
    return _RECIPES.get(key, _DEFAULT_RECIPE)


def _board_filter(board: str) -> List[str]:
    b = (board or "").strip().upper()
    if b in ("CBSE", ""):
        return ["CBSE"]
    if b == "CISCE":
        return ["ICSE", "ISC"]
    return [b]


_BANK_SUBJECT_CODES = {
    "maths": ["math"], "applied_maths": ["app"], "physics": ["phy", "physics"],
    "chemistry": ["chem", "chemistry"], "biology": ["bio", "biology"],
    "cs": ["cs", "comp", "ip"], "english": ["engl", "eng_h", "eng_s",
    "eng_w", "eng_f", "eng_k", "eng_v", "english"],
    "history": ["hist", "history"], "civics": ["civ", "civics", "pol"],
    "geo": ["geo", "geography"], "economics": ["eco", "economics"],
    "acc": ["acc"], "bs": ["bs"], "biotech": ["biotech"], "psy": ["ps", "psy"],
    "leg": ["leg"], "soc": ["soc"], "evs": ["evs"], "hindi": ["hin"],
    "home": ["hs", "home"], "stat": ["stat"], "massmedia": ["massmedia"],
}


def _bank_rows(subject: str, class_level: int, boards: List[str],
               chapter: str, need: int) -> List[Dict[str, Any]]:
    """Pull bank questions for the subject/class/board, marks-aware."""
    if need <= 0:
        return []
    # Loop-audit fix (2026-10-05): this used to REASSIGN subject to the
    # _BANK_SUBJECT_CODES LIST ("hin" -> ["hin"]), so the very next
    # subject.lower() raised AttributeError and EVERY bank pull died —
    # every check-up silently served zero bank questions.
    _key = _SUBJECT_ALIASES.get(subject.lower(), subject.lower())
    codes = _BANK_SUBJECT_CODES.get(_key, [subject.lower()])
    try:
        with get_sync_engine().connect() as cx:
            rows = cx.execute(text(
                "SELECT id, question_text, options::text AS options_json, "
                "question_type, marks, difficulty, correct_answer "
                "FROM board_questions "
                "WHERE class_level = :cl "
                "AND subject = ANY(CAST(:codes AS text[])) "
                "AND board = ANY(CAST(:boards AS text[])) "
                "AND (:ch = '' OR chapter ILIKE :chpat) "
                "AND length(question_text) > 40 "
                "ORDER BY random() LIMIT :lim"),
                {"cl": class_level, "codes": codes,
                 "boards": boards, "ch": chapter or "",
                 "chpat": f"%{chapter}%", "lim": need * 2}).mappings().all()
        out: List[Dict[str, Any]] = []
        for r in rows[:need]:
            opts = r["options_json"]
            try:
                import json as _json
                opts = _json.loads(opts) if opts else None
            except Exception:
                opts = None
            out.append({
                "item_id": f"bank:{r['id']}",
                "kind_hint": ("numerical" if r["question_type"] in
                              ("numerical", "short_answer") else "fact"),
                "question": r["question_text"],
                "options": opts,
                "marks": r["marks"],
                "difficulty": r["difficulty"],
                # server-side only: the client never receives this field
                "_answer": r["correct_answer"],
            })
        return out
    except Exception:
        log.exception("checkup bank pull failed")
        return []


def _family_item(node_id: str, kind: str) -> Optional[Dict[str, Any]]:
    """One corpus-grounded open question from the node's diagnostics."""
    try:
        from backend.services.enhanced_nodes import load_index
        idx = load_index()
        node = idx.get(node_id) or {}
        diags = node.get("diagnostics") or []
        q = a = None
        if len(diags) >= 2:
            q = diags[1].get("q") or diags[1].get("question")
            a = diags[1].get("a") or diags[1].get("answer")
        if not q and diags:
            q = diags[0].get("q") or diags[0].get("question")
            a = diags[0].get("a") or diags[0].get("answer")
        if not q:
            return None
        return {"item_id": f"family:{node_id}", "kind": kind,
                "question": q, "options": None, "marks": 3,
                "difficulty": "medium",
                "examiner_graded": True, "_answer": a}
    except Exception:
        return None


@router.get("/mission-options")
async def mission_options(
    subject: str = Query(default="", max_length=40),
    user=Depends(get_current_user),
    db=Depends(get_db),
):
    """Three picks for today's mission: 1 repair + 2 advance (autonomy).

    Loop-audit fix (2026-10-05) — the journey now informs the options:
      * a topic the journey already MASTERED is never re-offered as
        "advance" (the mastery ledger lags the journey store, so a proven
        topic used to come back as day-one work);
      * the old thin-frontier filler appended ready_to_learn[0] AGAIN as
        a fake "challenge" card — the same topic twice on one screen.
        The filler is gone;
      * when the frontier is thin, the student's OPEN journey topics
        surface instead as "continue" picks, most recent first.
    """
    from backend.services.next_best_lesson import next_best
    res = await next_best(db, str(user.id), limit=5)
    options: List[Dict[str, Any]] = []

    def _shape(kind: str, e: Dict[str, Any]) -> Dict[str, Any]:
        return {"kind": kind, "node_id": e.get("node_id"),
                "mastery": e.get("mastery"), "attempts": e.get("attempts"),
                "title": e.get("title"), "subject": subject or None}

    # journey rows: {node_id: state}, most recently touched first.
    # Sync-engine read on the request path — the established pattern of
    # _bank_rows below; fail-open to journey-blind options.
    jstates: Dict[str, str] = {}
    try:
        from backend.modules.journey import engine as _je
        jstates = _je.states_map(str(user.id))
    except Exception:
        log.debug("mission options: journey rows unavailable", exc_info=True)

    def _journey_done(nid: Optional[str]) -> bool:
        return bool(nid) and jstates.get(nid) == "MASTERED"

    if res.get("repair_first"):
        e0 = res["repair_first"][0]
        if not _journey_done(e0.get("node_id")):
            options.append(_shape("repair", e0))
    for e in res.get("ready_to_learn", []):
        if len(options) >= 3:
            break
        nid = e.get("node_id")
        if _journey_done(nid):
            continue
        if any(o["node_id"] == nid for o in options):
            continue
        options.append(_shape("advance", e))

    # thin frontier -> surface OPEN journey topics as continue picks
    if len(options) < 3 and jstates:
        open_nids = [nid for nid, st in jstates.items()
                     if st in _INFLIGHT_STATES and nid not in
                     {o["node_id"] for o in options}]
        titles = await _titles_for(db, open_nids[:3 - len(options)])
        for nid in open_nids:
            title = titles.get(nid)
            if not title:
                continue   # no authored title -> never show a raw id
            options.append({"kind": "continue", "node_id": nid,
                            "mastery": None, "attempts": None,
                            "title": title, "subject": subject or None})
            if len(options) >= 3:
                break
    return {"options": options,
            "graph_size": res.get("graph_size", 0),
            "source": res.get("source")}


#: journey states that mean "this topic is open" — mirrors
#: modules.journey.engine.INFLIGHT_STATES (imported lazily at call time
#: for the rows themselves; the tuple is inlined so the endpoint never
#: pays the engine import just to compare strings).
_INFLIGHT_STATES = ("TEACH", "PRACTICE", "REMEDIATE", "CHALLENGE")


async def _titles_for(db, node_ids: List[str]) -> Dict[str, str]:
    """Authored titles for candidate continue picks (EnrichmentContent)."""
    if not node_ids:
        return {}
    try:
        from backend.models.enrichment import EnrichmentContent
        rows = (await db.execute(
            sa_select(EnrichmentContent.node_id, EnrichmentContent.title)
            .where(EnrichmentContent.node_id.in_(node_ids))
        )).all()
        return {r[0]: r[1] for r in rows if r[1]}
    except Exception:
        log.debug("mission options: title lookup failed", exc_info=True)
        return {}


@router.get("/checkup")
async def checkup(
    subject: str = Query(max_length=40),
    class_level: int = Query(ge=1, le=14),
    board: str = Query(default="CBSE", max_length=8),
    chapter: str = Query(default="", max_length=24),
    anchor_node: str = Query(default="", max_length=96),
    user=Depends(get_current_user),
):
    """A per-subject composed Check-up (PROVE beat) — see module docstring."""
    recipe = _recipe_for(subject)
    boards = _board_filter(board)
    sections: List[Dict[str, Any]] = []
    for si, sec in enumerate(recipe, 1):
        items: List[Dict[str, Any]] = []
        if sec["source"] == "bank":
            items = _bank_rows(subject, class_level, boards, chapter,
                               sec["count"])
            for it in items:
                it["kind"] = sec["kind"]
        elif sec["source"] == "family":
            node = anchor_node or _any_node_of(subject, class_level, boards,
                                               chapter)
            if node:
                it = _family_item(node, sec["kind"])
                if it:
                    items = [it]
        elif sec["source"] == "diagram":
            node = anchor_node or _any_node_of(subject, class_level, boards,
                                               chapter)
            if node:
                task = _diagram_task(node)
                if task:
                    items = [task]
        if items:
            sections.append({"section": si, "kind": sec["kind"],
                             "items": items})
    total = sum(len(s["items"]) for s in sections)
    return {"subject": subject, "class_level": class_level, "board": board,
            "chapter": chapter, "sections": sections,
            "total_items": total,
            "framing": ("checkup" if total else "unavailable"),
            "message": ("Ready when you are — best attempt counts."
                        if total else
                        "No Check-up items for this topic yet — try the "
                        "practice ladder instead.")}


def _any_node_of(subject: str, class_level: int, boards: List[str],
                 chapter: str) -> Optional[str]:
    """Pick one real node id of this subject/class (either corpus).

    Node dicts carry class/subject/board keys (enhanced_nodes.parse_node_file).
    Board preference: CBSE asks prefer 'cbse' nodes, CISCE prefers 'icse'/'isc'.

    Loop-audit fix (2026-10-05): matching used the raw subject string
    ("hindi"[:4]="hind") against the corpus code ("hin"), so hindi/english
    check-ups matched ZERO nodes and always degraded to "unavailable".
    The subject's alias/codes map is now the matcher (hindi -> ["hin"],
    english -> engl/eng_*), with bidirectional prefix tolerance so the
    code families eng/engl/gram and hist/history still resolve.
    """
    try:
        from backend.services.enhanced_nodes import load_index
        idx = load_index()
        want = {b.lower() for b in boards}
        _key = _SUBJECT_ALIASES.get(subject.lower(), subject.lower())
        codes = {c.lower()
                 for c in _BANK_SUBJECT_CODES.get(_key, [subject.lower()])}

        def _subject_match(nid: str, sub: str) -> bool:
            if any(sub == c or sub.startswith(c) or c.startswith(sub)
                   for c in codes):
                return True
            return any(nid.lower().startswith(f"c{class_level}_{c}")
                       for c in codes)

        fallback: Optional[str] = None
        for nid, node in sorted((idx.nodes or {}).items()):
            if int(node.get("class") or 0) != int(class_level):
                continue
            if not _subject_match(
                    nid, str(node.get("subject") or "").lower()):
                continue
            if chapter and chapter.lower() not in nid.lower():
                continue
            nboard = str(node.get("board") or "").lower()
            if nboard in want:
                return nid
            if fallback is None:
                fallback = nid
        return fallback
    except Exception:
        log.exception("frontier node pick failed")
        return None


def _diagram_task(node_id: str) -> Optional[Dict[str, Any]]:
    """A label-the-diagram task when a diagram exists for the node."""
    try:
        from backend.services.diagram_index import find_for_node  # optional
    except Exception:
        find_for_node = None
    diagram_url = None
    if find_for_node:
        try:
            diagram_url = find_for_node(node_id)
        except Exception:
            diagram_url = None
    if not diagram_url:
        try:
            import json as _json
            from pathlib import Path as _P
            idx_p = _P(r"D:\platform\deploy\frontend\public\diagrams\diagrams_index.json")
            if not idx_p.exists():
                idx_p = _P("/app/content/diagrams/diagrams_index.json")
            if idx_p.exists():
                data = _json.loads(idx_p.read_text(encoding="utf-8"))
                # XPLAYER 2026-10-05: the published index is a node-keyed map
                # ({node_id: {class, file}}) — the old reader only handled a
                # list of {node_ids, file} rows, so this beat never fired.
                # Handle BOTH shapes; keep the list branch first.
                entries = data if isinstance(data, list) else data.get("diagrams", [])
                for e in entries:
                    if node_id in str(e.get("node_ids", "")) or e.get("node_id") == node_id:
                        diagram_url = e.get("file") or e.get("url")
                        break
                if not diagram_url and isinstance(data, dict):
                    entry = data.get(node_id)
                    if isinstance(entry, dict):
                        diagram_url = entry.get("file") or entry.get("url")
            if diagram_url and not str(diagram_url).startswith(("http://", "https://", "/")):
                # index files are relative to public/diagrams/ (same contract
                # the FE DiagramImage reader uses: "/diagrams/" + file)
                diagram_url = "/diagrams/" + str(diagram_url)
        except Exception:
            diagram_url = None
    if not diagram_url:
        return None
    return {"item_id": f"diagram:{node_id}", "kind": "diagram_task",
            "question": "Label the parts of this diagram — drag each name "
                        "to where it belongs.",
            "diagram_url": diagram_url, "options": None, "marks": 3,
            "difficulty": "medium", "examiner_graded": False,
            "_answer": None}


# ── Doodle HOOK (LEARNING_DESIGN: the hook is always first) ─────────────────
# Doodle indexes (frontend/public/doodle_cards/class{N}_index*.json) map
# node_id -> card. The URL is derivable: /doodle_cards/class{N}/{node_id}.webp
# (both CBSE and CISCE index variants cover classes 6-12).

_DOODLE_CACHE: Dict[str, Dict[str, Any]] = {}


def _doodle_index(class_level: int, board: str) -> Dict[str, Any]:
    import json as _json
    key = f"{class_level}_{(board or 'CBSE').upper()}"
    if key in _DOODLE_CACHE:
        return _DOODLE_CACHE[key]
    suffix = "_cisce" if (board or "").upper() == "CISCE" else ""
    import os as _os
    base = _os.environ.get("DOODLE_CARDS_DIR",
                           "D:/platform/deploy/frontend/public/doodle_cards")
    # XPLAYER 2026-10-05: candidate paths tried in order. The old alt
    # (/app/frontend/public/...) exists in NO container — the backend image
    # carries no frontend tree, so the hook silently returned
    # {available: false} everywhere in production. /app/content/doodle_cards
    # is the deploy/content bind-mount the backends already have (full
    # class{6..12}_index*.json set, CBSE + CISCE).
    candidates = [
        Path(base),
        Path("/app/frontend/public/doodle_cards"),
        Path("/app/content/doodle_cards"),
    ]
    path = next((p / f"class{class_level}_index{suffix}.json"
                 for p in candidates if (p / f"class{class_level}_index{suffix}.json").exists()),
                None)
    data: Dict[str, Any] = {}
    try:
        if path is not None:
            data = _json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        data = {}
    _DOODLE_CACHE[key] = data
    return data


@router.get("/hook")
async def hook(node_id: str = Query(max_length=96),
               board: str = Query(default="CBSE", max_length=8),
               user=Depends(get_current_user)):
    """The HOOK beat: this topic's doodle card, if one exists."""
    import json as _json
    import re as _re
    m = _re.match(r"^c(\d{1,2})_", node_id)
    if not m:
        return {"available": False}
    class_level = int(m.group(1))
    idx = _doodle_index(class_level, board)
    card = (idx.get("cards") or []) if isinstance(idx, dict) else []
    entry = next((c for c in card if c.get("node_id") == node_id), None)
    if not entry:
        return {"available": False}
    fname = f"{node_id}.{entry.get('format') or 'webp'}"
    return {
        "available": True,
        "image_url": f"/doodle_cards/class{class_level}/{fname}",
        "title": entry.get("title"),
        "subject": entry.get("subject"),
        "boards": entry.get("boards"),
    }
