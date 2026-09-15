import sys; sys.path.insert(0, '.')
from services.simulation_discovery import SimulationDiscovery
d = SimulationDiscovery()
sims = d.discover(force_refresh=True)
for cls in ['1','2','3','4','5']:
    cls_sims = [s for s in sims if s['class_level'] == cls]
    print(f"Class {cls}: {len(cls_sims)} sims")
    for s in cls_sims[:3]:
        print(f"  {s['sim_id']} -> {s['subject']} | {s['component_path']}")
