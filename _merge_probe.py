import glob
import json
import os

ROOT = r"D:\platform"
p1 = glob.glob(os.path.join(ROOT, "_cisce_build", "simw*",
                            "cisce_sim_map_*_part.json"))
p2 = glob.glob(os.path.join(ROOT, "_cisce_build", "simw*",
                            "cisce_sim_map*.json"))
print("pattern1 files:", len(p1))
print("pattern2 files:", len(p2))
for f in (p1 + p2)[:6]:
    print("  ", os.path.relpath(f, ROOT))

master = json.load(open(os.path.join(
    ROOT, "frontend", "components", "sims_v2", "CISCE_SIM_MAP.json"),
    encoding="utf-8"))
have = set(master.keys())
print("master keys:", len(have))

pf = os.path.join(ROOT, "_cisce_build", "simw12",
                  "cisce_sim_map_w12_part.json")
rows = json.load(open(pf, encoding="utf-8"))
new = [k for k in rows.keys() if k not in have]
print("w12 part rows:", len(rows), "| not in master:", len(new))
print("sample new:", new[:3])
