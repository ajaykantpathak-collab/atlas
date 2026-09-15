"""Find the .tsx files that don't match any sim/game pattern."""
import os, re, sys
sys.path.insert(0, '.')
from services.simulation_discovery import _SIM_PATTERN, _GENERIC_SIM_PATTERN, SimulationDiscovery

sim_dir = r'D:\platform\frontend\components\simulations'

# Get all .tsx files excluding backups and known utilities
SKIP_DIRS = {"c6_12_backups"}
SKIP_FILES = {"GameRenderer.tsx", "SimulationRenderer.tsx", "InteractiveNumberLine.tsx",
              "SVGBodyDiagram.tsx", "VisualChallenge.tsx"}

unmatched = []
for root, dirs, files in os.walk(sim_dir):
    if any(skip in root for skip in SKIP_DIRS):
        continue
    for f in files:
        if not f.endswith('.tsx'):
            continue
        if f in SKIP_FILES:
            continue
        if _SIM_PATTERN.match(f) or _GENERIC_SIM_PATTERN.match(f):
            continue
        full_path = os.path.join(root, f)
        size = os.path.getsize(full_path)
        rel_path = os.path.relpath(full_path, sim_dir)
        unmatched.append((rel_path, size))

print(f"Unmatched .tsx files: {len(unmatched)}")
print()
for path, size in sorted(unmatched):
    print(f"  {path}  ({size:,} bytes)")
