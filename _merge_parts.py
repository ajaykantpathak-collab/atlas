"""_merge_parts.py — merge every completed wave's part-file rows into the
live masters (sim maps + diagram index), skipping ids already present.

Backs up each master before first write.  Idempotent: re-running is a no-op
for already-merged rows.  Reports per-source counts.
"""
import glob
import json
import os
import shutil
import time

ROOT = r"D:\platform"
BACKUP_DIR = os.path.join(ROOT, "_cisce_build", "_merge_backups",
                          time.strftime("%Y%m%d_%H%M%S"))
os.makedirs(BACKUP_DIR, exist_ok=True)


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)


def backup(path):
    if os.path.exists(path):
        dst = os.path.join(BACKUP_DIR, os.path.basename(path))
        if not os.path.exists(dst):
            shutil.copy2(path, dst)


def node_id_of(row):
    if isinstance(row, dict):
        return (row.get("node_id") or row.get("nodeId") or
                row.get("nid") or "")
    return str(row)


# ------------------------------------------------------------------ #
# 1. sim masters
# ------------------------------------------------------------------ #
SIM_MASTER = os.path.join(ROOT, "frontend", "components", "sims_v2",
                          "CISCE_SIM_MAP.json")
SIM_INDEX = os.path.join(ROOT, "frontend", "components", "sims_v2",
                         "SIM_INDEX.json")
SIM_FILEMAP = os.path.join(ROOT, "frontend", "components", "sims_v2",
                           "SIM_FILE_MAP.json")

masters = {p: load(p) for p in (SIM_MASTER, SIM_INDEX, SIM_FILEMAP)
           if os.path.exists(p)}
sim_master = masters.get(SIM_MASTER)
have = set(sim_master.keys()) if isinstance(sim_master, dict) else set()

part_files = sorted(glob.glob(os.path.join(
    ROOT, "_cisce_build", "simw*", "cisce_sim_map_*_part.json")) +
    glob.glob(os.path.join(ROOT, "_cisce_build", "simw*",
                           "cisce_sim_map*.json")))

added_by_source = {}
idx_master = masters.get(SIM_INDEX)
fm_master = masters.get(SIM_FILEMAP)
idx_have = set(idx_master.keys()) if isinstance(idx_master, dict) else set()
fm_have = set(fm_master.keys()) if isinstance(fm_master, dict) else set()

for pf in part_files:
    if "index" in pf or "file_map" in pf:
        continue
    try:
        rows = load(pf)
    except Exception as e:
        print(f"SKIP (unreadable): {pf}: {e}")
        continue
    added = 0
    if isinstance(rows, dict):
        # part files key their rows BY node id (row dicts carry simId /
        # source_node_id, not a node_id field)
        for nid, row in rows.items():
            if not nid or nid in have:
                continue
            if isinstance(sim_master, dict):
                sim_master[nid] = row
                have.add(nid)
                added += 1
        # companion rows in index / filemap
        base = os.path.basename(pf)
        idx_p = pf.replace(os.path.basename(pf),
                           base.replace("cisce_sim_map", "sim_index"))
        fm_p = pf.replace(os.path.basename(pf),
                          base.replace("cisce_sim_map", "sim_file_map"))
        for companion, target, target_have in (
                (idx_p, idx_master, idx_have),
                (fm_p, fm_master, fm_have)):
            if target is None or not os.path.exists(companion):
                continue
            try:
                crows = load(companion)
            except Exception:
                continue
            if isinstance(crows, dict):
                crow = crows.get(nid)
                for r2 in ([crow] if crow else crows.values()):
                    n2 = node_id_of(r2)
                    if n2 == nid and n2 not in target_have:
                        target[n2] = r2
                        target_have.add(n2)
                        break
    if added:
        rel = os.path.relpath(pf, ROOT)
        added_by_source[rel] = added

for p, data in masters.items():
    backup(p)
    save(p, data)

print("SIM masters merged. Added rows by source:")
total = 0
for k, v in sorted(added_by_source.items()):
    print(f"  {v:>5}  {k}")
    total += v
print(f"TOTAL sim rows added: {total}")
print(f"master now: {len(sim_master) if isinstance(sim_master, dict) else '?'}")

# ------------------------------------------------------------------ #
# 2. diagram index + attributions
# ------------------------------------------------------------------ #
DIAG_IDX = os.path.join(ROOT, "frontend", "public", "diagrams",
                        "diagrams_index.json")
DIAG_ATTR = os.path.join(ROOT, "frontend", "public", "diagrams",
                         "diagram_attributions.json")

for master_path, pattern in (
        (DIAG_IDX, os.path.join(ROOT, "_cisce_build", "*", "diagrams_index_*_part.json")),
        (DIAG_ATTR, os.path.join(ROOT, "_cisce_build", "*", "diagram_attributions_*_part.json"))):
    if not os.path.exists(master_path):
        print(f"no master at {master_path}; skip")
        continue
    master = load(master_path)
    have = set(master.keys())
    added = 0
    for pf in sorted(glob.glob(pattern)):
        try:
            rows = load(pf)
        except Exception:
            continue
        if isinstance(rows, dict):
            for nid, row in rows.items():
                if nid not in have:
                    master[nid] = row
                    have.add(nid)
                    added += 1
        elif isinstance(rows, list):
            for row in rows:
                nid = node_id_of(row)
                if nid and nid not in have:
                    master[nid] = row
                    have.add(nid)
                    added += 1
    backup(master_path)
    save(master_path, master)
    print(f"{os.path.basename(master_path)}: +{added} -> {len(master)}")

print("DONE")
