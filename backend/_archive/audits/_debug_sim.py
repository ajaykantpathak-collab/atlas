import os, re, sys
sys.path.insert(0, '.')
from services.simulation_discovery import SimulationDiscovery, _parse_sim_filename

# Test filename parsing
test_files = [
    "C10_PhysicsEfficiencyMachinesetaSim.tsx",
    "C10_MathematicsQuadraticEquationsIntroductionSim.tsx",
    "C10_BiologyCirculatorySystemdetailedSim.tsx",
    "C11_AccountancyAccountingStandardsMeaningSim.tsx",
    "GameRenderer.tsx",
    "InteractiveNumberLine.tsx",
]

for f in test_files:
    result = _parse_sim_filename(f)
    if result:
        print(f"  {f} -> subject={result['subject']}, class={result['class_level']}, topic={result['topic_name']}")
    else:
        print(f"  {f} -> NO MATCH")

# Count total files vs matched
sim_dir = os.path.join(os.path.dirname(os.path.abspath('.')), "platform", "frontend", "components", "simulations")
if not os.path.exists(sim_dir):
    sim_dir = "D:\\platform\\frontend\\components\\simulations"

print(f"\nSim dir: {sim_dir}")
print(f"Exists: {os.path.exists(sim_dir)}")

total_files = 0
matched = 0
unmatched = []
for root, dirs, files in os.walk(sim_dir):
    for f in files:
        if f.endswith('.tsx'):
            total_files += 1
            result = _parse_sim_filename(f)
            if result:
                matched += 1
            else:
                unmatched.append(f)

print(f"Total .tsx files: {total_files}")
print(f"Matched: {matched}")
print(f"Unmatched: {len(unmatched)}")
if unmatched:
    print(f"First 10 unmatched: {unmatched[:10]}")

# Check physics count
discovery = SimulationDiscovery()
all_sims = discovery.discover(force_refresh=True)
physics = [s for s in all_sims if s['subject'] == 'physics']
print(f"\nDiscovered total: {len(all_sims)}")
print(f"Physics sims: {len(physics)}")
if physics:
    print(f"  First: {physics[0]['sim_id']} -> subject={physics[0]['subject']}")
