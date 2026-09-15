import json
from pathlib import Path
data = json.loads(Path(r"D:\platform\cbse_data\simulations\mapping\sim_mapping.json").read_text(encoding="utf-8"))
general = [s for s in data["all_simulations"] if s["subject"] == "general"]
print(f"General (unguessed): {len(general)}")
for s in general[:30]:
    print(f"  {s['directory']}/{s['filename']} (class={s['class']})")
