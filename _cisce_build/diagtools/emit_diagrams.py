#!/usr/bin/env python3
"""emit_diagrams.py — publish eyeballed candidates into the v2 asset layout.

Reads staging/manifest.json + picks.json ({node_id: candidate_index|null});
null/missing-with-rejects entry = rejected (honest absence). Copies accepted
files to deploy/frontend/public/diagrams/class{N}/{node_id}{ext} (and the
root mirror), then regenerates diagrams_index.json +
diagram_attributions.json in both trees.

Also maps the era-1 provenance-clean SVGs from public/assets/diagrams/
(--legacy map below) with attribution fetched from the Commons API.

picks.json: {node_id: index} to choose a non-default candidate,
            {node_id: -1} to REJECT all candidates for that node.
"""
from __future__ import annotations

import json
import re
import shutil
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

HERE = Path(__file__).parent
STAGING = HERE / "staging"
DEPLOY_PUB = Path(r"D:/platform/deploy/frontend/public/diagrams")
ROOT_PUB = Path(r"D:/platform/frontend/public/diagrams")
ASSETS = Path(r"D:/platform/deploy/frontend/public/assets/diagrams")

API = "https://commons.wikimedia.org/w/api.php"
UA = "AtlasCBSEDiagramPilot/1.0 (educational platform; local build)"

# era-1 SVGs with exact Commons titles -> pilot node(s)
LEGACY_MAP = {
    "Diagram_of_the_human_heart_(cropped).svg": ["c10_bio_cbse_01_009"],
    "Complete_neuron_cell_diagram_en.svg": ["c10_bio_cbse_02_002"],
    "Digestive_system_diagram_en.svg": ["c10_bio_cbse_01_004"],
    "Mature_flower_diagram.svg": ["c10_bio_cbse_03_005", "c9_bio_ch3_5"],
    # re-fetched clean 2026-09-29 (was a 429 error page on disk);
    # Commons title renamed from 'Animal_cell_structure-en.svg' to
    # 'Animal cell structure en.svg' (LadyofHats, PD) — maps to the
    # Cytoplasm node whose criteria cite the labeled animal-cell diagram.
    "Animal_cell_structure-en.svg": ["c9_bio_ch1_6"],
    # The_human_brain_diagram-en.svg EXCLUDED: no matching Commons title
    # exists any more -> no verifiable license -> honest absence
    # (c10_bio_cbse_02_004 re-sources a brain diagram in the follow-up).
    # Plant_cell_structure-en.svg + Schematic_diagram_of_the_human_eye_en.svg:
    # re-fetched clean 2026-09-29, validated, but NOT mapped — the c9/c10
    # bio pool has no whole-plant-cell or human-eye node (honest absence;
    # files stay in public/assets/diagrams for any future wave).
}


def api(params: dict, tries: int = 4) -> dict:
    qs = urllib.parse.urlencode(params)
    last = None
    for i in range(tries):
        req = urllib.request.Request("%s?%s" % (API, qs), headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=30) as fh:
                return json.loads(fh.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            last = exc
            if exc.code == 429 and i < tries - 1:
                time.sleep(10 * (i + 1))
                continue
            raise
    raise last


def html_clean(s: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", s or "")).strip()


def commons_meta(titles: list) -> dict:
    data = api({
        "action": "query", "format": "json", "titles": "|".join(titles),
        "prop": "imageinfo", "iiprop": "url|mime|extmetadata",
    })
    out = {}
    for page in (data.get("query") or {}).get("pages", {}).values():
        ii = (page.get("imageinfo") or [{}])[0]
        em = ii.get("extmetadata") or {}
        title = (page.get("title") or "").replace("File:", "")
        out[title] = {
            "title": page.get("title", ""),
            "source_url": ii.get("descriptionurl", ""),
            "artist": html_clean((em.get("Artist") or {}).get("value", ""))[:160],
            "license": html_clean((em.get("LicenseShortName") or {}).get("value", "")),
        }
    return out


# local era-1 filename -> Commons title when the file was RENAMED upstream
REMOTE_TITLE = {
    "Animal_cell_structure-en.svg": "File:Animal cell structure en.svg",
}


def credit_line(meta: dict) -> str:
    artist = meta.get("artist") or "Unknown author"
    lic = meta.get("license") or "see source"
    return "%s — %s · via Wikimedia Commons" % (artist, lic)


def node_class(node_id: str) -> int:
    return int(re.match(r"c(\d+)_", node_id).group(1))


def main() -> int:
    manifest = json.loads((STAGING / "manifest.json").read_text(encoding="utf-8"))
    picks_path = HERE / "picks.json"
    picks = json.loads(picks_path.read_text(encoding="utf-8")) \
        if picks_path.exists() else {}

    # query -> node ids (a shared query may serve several nodes)
    by_query: dict = {}
    for q, cands in manifest.items():
        by_query[q] = cands
    terms = json.loads((HERE / "search_terms.json").read_text(encoding="utf-8"))
    node_query = {nid: "q:" + q for nid, q in terms.items()}

    index: dict = {}
    attribs: dict = {}

    def publish(node_id: str, src: Path, meta: dict) -> None:
        cls = node_class(node_id)
        sub = "class%d" % cls
        (DEPLOY_PUB / sub).mkdir(parents=True, exist_ok=True)
        (ROOT_PUB / sub).mkdir(parents=True, exist_ok=True)
        dest_name = node_id + src.suffix.lower().replace(".jpeg", ".jpg")
        for root in (DEPLOY_PUB, ROOT_PUB):
            shutil.copyfile(src, root / sub / dest_name)
        index[node_id] = {"file": "%s/%s" % (sub, dest_name),
                          "class": cls}
        attribs[node_id] = {
            "title": meta.get("title", ""),
            "source_url": meta.get("source_url", ""),
            "artist": meta.get("artist", ""),
            "license": meta.get("license", ""),
            "credit": credit_line(meta),
        }

        # 1) legacy era-1 SVGs (provenance-clean, quality-proven)
    titles = sorted({REMOTE_TITLE.get(t, "File:" + t) for t in LEGACY_MAP})
    legacy_meta = commons_meta(titles)
    for fname, node_ids in LEGACY_MAP.items():
        src = ASSETS / fname
        if not src.exists():
            print("legacy missing:", fname)
            continue
        want = REMOTE_TITLE.get(fname, "File:" + fname)
        # commons_meta() keys results with the "File:" prefix stripped and
        # MediaWiki-normalized (underscores -> spaces)
        key = want.replace("File:", "", 1)
        meta = (legacy_meta.get(key)
                or legacy_meta.get(key.replace("_", " "))
                or legacy_meta.get(fname.replace("_", " ")) or {})
        meta = dict(meta, title=want)
        for node_id in node_ids:
            publish(node_id, src, meta)

    # 2) freshly staged candidates
    # NOTE: manifest entries lack staging_file (persisted pre-copy in v1 of
    # the tool), but the on-disk name encodes node_id + candidate index:
    # "<node_id>__<i><ext>". Reconstruct from disk.
    staged_by_node: dict = {}
    for f in sorted(STAGING.iterdir()):
        m = re.match(r"^(c\d+_[A-Za-z0-9_]+?)__(\d+)\.(png|jpg|jpeg|svg)$", f.name)
        if m:
            staged_by_node.setdefault(m.group(1), []).append(
                (int(m.group(2)), f))
    for v in staged_by_node.values():
        v.sort()

    accepted = rejected = 0
    for node_id in sorted(terms):
        entries = staged_by_node.get(node_id) or []
        if not entries:
            continue
        pick = int(picks.get(node_id, 0))
        if pick == -1:
            rejected += 1
            continue
        pick = min(max(pick, 0), len(entries) - 1)
        cand_idx, src = entries[pick]
        # attribution = the candidate at the same enumerate index the
        # downloader used for its filename
        cands = manifest.get(node_query.get(node_id, "")) or []
        cand = cands[cand_idx] if cand_idx < len(cands) else {}
        if cand.get("descriptionurl") and not cand.get("source_url"):
            cand = dict(cand, source_url=cand["descriptionurl"])
        if not (cand.get("title") and cand.get("source_url")):
            rejected += 1
            continue
        publish(node_id, src, cand)
        accepted += 1

    for root in (DEPLOY_PUB, ROOT_PUB):
        (root / "diagrams_index.json").write_text(
            json.dumps(index, indent=1, sort_keys=True), encoding="utf-8")
        (root / "diagram_attributions.json").write_text(
            json.dumps(attribs, indent=1, sort_keys=True), encoding="utf-8")

    lic_counts: dict = {}
    for a in attribs.values():
        lic_counts[a["license"]] = lic_counts.get(a["license"], 0) + 1
    print("published %d nodes (%d staged-node accepts, %d staged-node rejects, "
          "%d legacy SVG maps)" % (len(index), accepted, rejected, 6))
    print("licenses:", json.dumps(lic_counts, indent=1))
    return 0


if __name__ == "__main__":
    sys.exit(main())
