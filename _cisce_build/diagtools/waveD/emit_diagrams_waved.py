#!/usr/bin/env python3
"""waveD emit — publish eyeballed candidates into waveD PART-FILES only.

Reads staging/manifest.json + picks.json. Writes:
  deploy/frontend/public/diagrams/class{N}/{node_id}.{ext} (+ root mirror)
  diagrams_index_waveD.json  (PART file; wave A owns diagrams_index.json)
  diagram_attributions_waveD.json
Merges with any existing waveD part-files (idempotent re-runs).
picks.json: {node_id: index} to choose a candidate, {node_id: -1} = reject.
"""
from __future__ import annotations
import json, re, shutil, sys
from pathlib import Path

HERE = Path(__file__).parent
STAGING = HERE / "staging"
DEPLOY_PUB = Path(r"D:/platform/deploy/frontend/public/diagrams")
ROOT_PUB = Path(r"D:/platform/frontend/public/diagrams")
# authoritative syllabus class per node (from the 10,979-node index;
# id prefixes are unreliable — grade-map re-maps content, e.g.
# c6_biology_ch10_* is graded class 7)
NODE_CLASSES = json.loads(
    (HERE / "node_classes.json").read_text(encoding="utf-8"))


def main() -> int:
    manifest = json.loads((STAGING / "manifest.json").read_text(encoding="utf-8"))
    picks_path = HERE / "picks.json"
    picks = json.loads(picks_path.read_text(encoding="utf-8")) \
        if picks_path.exists() else {}
    terms = json.loads((HERE / "search_terms.json").read_text(encoding="utf-8"))
    node_query = {nid: "q:" + q for nid, q in terms.items()}

    # merge with existing waveD part-files
    index: dict = {}
    attribs: dict = {}
    for root in (DEPLOY_PUB, ROOT_PUB):
        ip = root / "diagrams_index_waveD.json"
        if ip.exists():
            index.update(json.loads(ip.read_text(encoding="utf-8")))
    ap_ = DEPLOY_PUB / "diagram_attributions_waveD.json"
    if ap_.exists():
        attribs.update(json.loads(ap_.read_text(encoding="utf-8")))

    staged_by_node: dict = {}
    for f in sorted(STAGING.iterdir()):
        m = re.match(r"^(c\d+_[A-Za-z0-9_]+?)__(\d+)\.(png|jpg|jpeg|svg)$", f.name)
        if m:
            staged_by_node.setdefault(m.group(1), []).append((int(m.group(2)), f))
    for v in staged_by_node.values():
        v.sort()

    accepted = rejected = 0
    for node_id in sorted(terms):
        entries = staged_by_node.get(node_id) or []
        if not entries:
            continue
        pick = int(picks.get(node_id, 0))
        if pick == -1:
            # explicit reject removes any previous publish
            index.pop(node_id, None)
            attribs.pop(node_id, None)
            rejected += 1
            continue
        pick = min(max(pick, 0), len(entries) - 1)
        cand_idx, src = entries[pick]
        cands = manifest.get(node_query.get(node_id, "")) or []
        cand = cands[cand_idx] if cand_idx < len(cands) else {}
        if cand.get("descriptionurl") and not cand.get("source_url"):
            cand = dict(cand, source_url=cand["descriptionurl"])
        if not (cand.get("title") and cand.get("source_url")):
            rejected += 1
            continue
        cls = NODE_CLASSES.get(node_id)
        if cls is None:
            cls = int(re.match(r"c(\d+)_", node_id).group(1))
        sub = "class%d" % cls
        (DEPLOY_PUB / sub).mkdir(parents=True, exist_ok=True)
        (ROOT_PUB / sub).mkdir(parents=True, exist_ok=True)
        dest_name = node_id + src.suffix.lower().replace(".jpeg", ".jpg")
        for root in (DEPLOY_PUB, ROOT_PUB):
            shutil.copyfile(src, root / sub / dest_name)
        index[node_id] = {"file": "%s/%s" % (sub, dest_name), "class": cls}
        artist = cand.get("artist") or "Unknown author"
        lic = cand.get("license") or "see source"
        attribs[node_id] = {
            "title": cand.get("title", ""),
            "source_url": cand.get("source_url", ""),
            "artist": artist,
            "license": lic,
            "credit": "%s — %s · via Wikimedia Commons" % (artist, lic),
        }
        accepted += 1

    for root in (DEPLOY_PUB, ROOT_PUB):
        (root / "diagrams_index_waveD.json").write_text(
            json.dumps(index, indent=1, sort_keys=True), encoding="utf-8")
        (root / "diagram_attributions_waveD.json").write_text(
            json.dumps(attribs, indent=1, sort_keys=True), encoding="utf-8")
    # backup of part-files
    import shutil as _sh
    bk = Path(r"D:/platform/_cisce_build/diagwaveD_backup")
    bk.mkdir(parents=True, exist_ok=True)
    for root in (DEPLOY_PUB, ROOT_PUB):
        for nm in ("diagrams_index_waveD.json", "diagram_attributions_waveD.json"):
            srcf = root / nm
            if srcf.exists():
                tag = "deploy" if "deploy" in str(root) else "rootmirror"
                _sh.copyfile(srcf, bk / ("%s__%s" % (tag, nm)))

    lic_counts: dict = {}
    for a in attribs.values():
        lic_counts[a["license"]] = lic_counts.get(a["license"], 0) + 1
    print("waveD emit: +%d accepts, %d rejects this run; part-file total %d nodes"
          % (accepted, rejected, len(index)))
    print("licenses:", json.dumps(lic_counts, indent=1))
    return 0


if __name__ == "__main__":
    sys.exit(main())
