import sys; sys.path.insert(0, '.')
from services.simulation_discovery import SimulationDiscovery
d = SimulationDiscovery()
sims = d.discover(force_refresh=True)
print(f"Total discovered: {len(sims)}")
for s in sims:
    sid = s["sim_id"]
    path = s["component_path"]
    if "c9_12" in path and "AtomicStructure" in sid:
        print(f"  FOUND: {sid} -> {path}")
    if "class2" in path and "AnimalsGame" in sid:
        print(f"  FOUND: {sid} -> {path}")
    if "class3" in path and "PlantsGame" in sid:
        print(f"  FOUND: {sid} -> {path}")
    if "class4" in path and "NumbersGame" in sid:
        print(f"  FOUND: {sid} -> {path}")
