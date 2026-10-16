"""build_repertoire_index.py -- Compile the solved-doubt repertoire index.

The solve endpoints (api/verified_practice.py) attach a "repertoire" to
every solved doubt: the node's doodle card, labelled diagram and
interactive sim.  The canonical asset indexes live in the FRONTEND tree
(docker builds copy deploy/frontend into a separate image, so the
backend container can never read them at runtime) -- this tool freezes
the resolved lookups into one backend-side JSON:

    its/solver/repertoire_index.json
      {
        "doodle":   {node_id: class_folder},        # /doodle_cards/class{N}/{id}.webp
        "diagrams": {node_id: file},                # /diagrams/{file}
        "sims":     {node_id: {"id": sim_id, "title": title}}
      }

Sources (canonical, read-only):
  deploy/frontend/public/diagrams/diagrams_index.json    (CBSE diagrams)
  deploy/frontend/public/diagrams/cisce_diagram_map.json (CISCE reuse map)
  deploy/frontend/public/doodle_cards/doodle_home_map.json (node -> shelf)
  deploy/frontend/public/doodle_cards/class{N}/{node}.webp (existence check)
  deploy/frontend/components/sims_v2/SIM_INDEX.json      (sim -> node n-arrays)
  deploy/frontend/components/sims_v2/CISCE_SIM_MAP.json  (CISCE def-matched sims)

Zero-guess rule: a node enters an asset map only when the CANONICAL
index lists it (and, for doodle cards, the .webp file actually exists
on the shelf).  The sim resolution is a faithful port of
frontend/components/sims_v2/lite.ts findSimForNode -- exact node-id
match first, curated CISCE map second, same-class+subject+chapter
fallback last -- so a cross-subject sim can never be attached.

Re-run this tool whenever the frontend asset corpus changes; the
runtime module never guesses, it only reads this snapshot.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

_REPO_ROOT = Path(__file__).resolve().parents[3]        # tools/ -> backend -> deploy -> repo
_FRONTEND = _REPO_ROOT / "deploy" / "frontend"
_OUT = Path(__file__).resolve().parents[1] / "its" / "solver" / "repertoire_index.json"

# ── findSimForNode port (lite.ts) ────────────────────────────────────────────

_SUBJECT_SYNONYMS = {
    "physics": "phy", "chemistry": "chem", "biology": "bio",
    "maths": "math", "mathematics": "math",
    "english": "eng", "hindi": "hin", "civics": "civ", "economics": "eco",
    "geography": "geo", "history": "hist", "social": "soc", "science": "sci",
}


def _norm_subject(s: str) -> str:
    return _SUBJECT_SYNONYMS.get(s, s)


_CHAPTER_CODE_RE = re.compile(
    r"^c(\d{1,2})_([a-z0-9]+(?:_[a-z0-9]+)*?)_ch0*(\d{1,3})$")


def _parse_chapter_code(ch: str):
    m = _CHAPTER_CODE_RE.match(ch or "")
    if not m:
        return None
    return (m.group(1), _norm_subject(m.group(2)), str(int(m.group(3))))


def _parse_node_address(node_id: str):
    head = re.match(r"^c(\d{1,2})_", node_id or "")
    if not head:
        return None
    toks = node_id.split("_")
    chap = None
    mark = -1
    for i in range(1, len(toks)):
        tk = toks[i]
        if re.match(r"^ch\d{1,3}$", tk, re.I):
            chap = str(int(tk[2:]))
            mark = i
            break
        if re.match(r"^\d{1,3}$", tk):
            chap = str(int(tk))
            mark = i
            break
    if chap is None or mark < 2:
        return None
    subj = toks[1:mark]
    if len(subj) > 1 and subj[-1].lower() in ("cbse", "ncert", "ch"):
        subj = subj[:-1]
    if not subj:
        return None
    return (head.group(1), _norm_subject("_".join(subj)), chap)


def find_sim_for_node(node_id: str, sim_index: dict, cisce_map: dict):
    """lite.ts findSimForNode, verbatim semantics. Returns (sim_id, title)."""
    if not node_id:
        return None
    cisce = cisce_map.get(node_id)
    if cisce:
        meta = sim_index.get(cisce.get("simId"))
        if meta:
            return cisce["simId"], meta.get("t")
    node = _parse_node_address(node_id)
    chapter_pick = None
    for sim_id, meta in sim_index.items():
        if node_id in (meta.get("n") or []):
            return sim_id, meta.get("t")
        if node is None:
            continue
        addr = _parse_chapter_code(meta.get("ch") or "")
        if addr and addr == node:
            if chapter_pick is None or sim_id < chapter_pick[0]:
                chapter_pick = (sim_id, meta.get("t"))
    return chapter_pick


def main() -> int:
    diagrams = {}
    idx_path = _FRONTEND / "public" / "diagrams" / "diagrams_index.json"
    doc = json.loads(idx_path.read_text(encoding="utf-8"))
    for node_id, entry in doc.items():
        if node_id.startswith("_"):
            continue
        if isinstance(entry, dict) and entry.get("file"):
            diagrams[node_id] = entry["file"]
    n_cbse_diagrams = len(diagrams)

    cisce_path = _FRONTEND / "public" / "diagrams" / "cisce_diagram_map.json"
    cisce_doc = json.loads(cisce_path.read_text(encoding="utf-8"))
    for node_id, entry in cisce_doc.items():
        if node_id.startswith("_"):
            continue
        if isinstance(entry, dict) and entry.get("diagram_file"):
            # CISCE ids are disjoint from CBSE ids -- purely additive
            diagrams.setdefault(node_id, entry["diagram_file"])

    # Doodle cards: the generated home map lists every exported card's
    # node and its shelf; keep only entries whose .webp file exists so
    # the served URL can never 404 from a stale map row.
    home_path = _FRONTEND / "public" / "doodle_cards" / "doodle_home_map.json"
    home_doc = json.loads(home_path.read_text(encoding="utf-8"))
    doodle = {}
    missing = 0
    for node_id, folder in home_doc.items():
        if not folder:
            continue
        if (_FRONTEND / "public" / "doodle_cards" / f"class{folder}"
                / f"{node_id}.webp").exists():
            doodle[node_id] = str(folder)
        else:
            missing += 1

    # Sims: exact n-array match, CISCE map, then the chapter fallback --
    # the exact lite.ts order.
    sim_index = json.loads(
        (_FRONTEND / "components" / "sims_v2" / "SIM_INDEX.json")
        .read_text(encoding="utf-8"))
    cisce_sims = json.loads(
        (_FRONTEND / "components" / "sims_v2" / "CISCE_SIM_MAP.json")
        .read_text(encoding="utf-8"))
    sims = {}
    for node_id in sorted(set(diagrams) | set(doodle) |
                          {n for m in sim_index.values()
                           for n in (m.get("n") or [])} |
                          set(cisce_sims)):
        hit = find_sim_for_node(node_id, sim_index, cisce_sims)
        if hit and hit[0]:
            sims[node_id] = {"id": hit[0], "title": hit[1] or ""}

    payload = {
        "_generator": "backend/tools/build_repertoire_index.py",
        "_sources": {
            "diagrams_index": n_cbse_diagrams,
            "cisce_diagram_map": len(cisce_doc) if isinstance(cisce_doc, dict) else 0,
            "doodle_home_map": len(home_doc),
            "doodle_missing_files": missing,
            "sim_index_entries": len(sim_index),
            "cisce_sim_map": len(cisce_sims) if isinstance(cisce_sims, dict) else 0,
        },
        "doodle": dict(sorted(doodle.items())),
        "diagrams": dict(sorted(diagrams.items())),
        "sims": dict(sorted(sims.items())),
    }
    _OUT.write_text(json.dumps(payload, ensure_ascii=False,
                               sort_keys=True), encoding="utf-8")
    print(f"wrote {_OUT}")
    print(f"  doodle cards : {len(doodle)} ({missing} home-map rows had no file)")
    print(f"  diagrams     : {len(diagrams)}")
    print(f"  sim bindings : {len(sims)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
