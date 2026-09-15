"""Show the 13 previously-missing files with their full details."""
import os, sys
sys.path.insert(0, '.')
from services.simulation_discovery import SimulationDiscovery

d = SimulationDiscovery()
sims = d.discover(force_refresh=True)

# The 13 files that were duplicates (now have class-prefixed sim_ids)
target_names = [
    "AtomicStructureSim", "ChemicalReactionsSim",
    "AnimalsGame", "ComputerBasicsGame", "PatternsGame", "PlantsGame", "WaterGame",
    "AddSubGame", "MulDivGame", "NumbersGame",
    "MeasurementGame",
]

print("=== THE 13 DUPLICATE-NAME FILES ===\n")
for name in target_names:
    matches = [s for s in sims if name in s["sim_id"]]
    for s in matches:
        path = os.path.join(r"D:\platform\frontend", s["component_path"])
        size = os.path.getsize(path) if os.path.exists(path) else 0
        print(f"  sim_id: {s['sim_id']}")
        print(f"  title:  {s['title']}")
        print(f"  class:  {s['class_level']}")
        print(f"  subject: {s['subject']}")
        print(f"  path:   {s['component_path']}")
        print(f"  size:   {size:,} bytes")
        print()
