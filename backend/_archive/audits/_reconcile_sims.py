"""Reconcile the 915 total vs 806 discovered."""
import os, sys
sys.path.insert(0, '.')
from services.simulation_discovery import SimulationDiscovery

sim_dir = r'D:\platform\frontend\components\simulations'

# Count ALL .tsx files
all_files = []
for root, dirs, files in os.walk(sim_dir):
    for f in files:
        if f.endswith('.tsx'):
            all_files.append(os.path.relpath(os.path.join(root, f), sim_dir))

print(f"Total .tsx files: {len(all_files)}")

# Count by directory
from collections import Counter
dir_counts = Counter()
for f in all_files:
    parts = f.split(os.sep)
    dir_counts[parts[0] if len(parts) > 1 else "(root)"] += 1

print("\nBy directory:")
for d, c in sorted(dir_counts.items()):
    print(f"  {d}: {c}")

# Count excluded files
SKIP_DIRS = {"c6_12_backups"}
SKIP_FILES = {"GameRenderer.tsx", "SimulationRenderer.tsx", "InteractiveNumberLine.tsx",
              "SVGBodyDiagram.tsx", "VisualChallenge.tsx"}

excluded_backups = [f for f in all_files if "c6_12_backups" in f]
excluded_utils = [f for f in all_files if os.path.basename(f) in SKIP_FILES]
excluded_total = len(excluded_backups) + len(excluded_utils)

print(f"\nExcluded backups (c6_12_backups/): {len(excluded_backups)}")
print(f"Excluded utility files: {len(excluded_utils)}")
for f in excluded_utils:
    print(f"  {f}")
print(f"Total excluded: {excluded_total}")
print(f"Remaining: {len(all_files) - excluded_total}")

# Get discovered count
d = SimulationDiscovery()
sims = d.discover(force_refresh=True)
print(f"\nDiscovered by service: {len(sims)}")
print(f"Difference (not matched by patterns): {len(all_files) - excluded_total - len(sims)}")

# Find the difference
discovered_paths = set(s['component_path'].replace('components/simulations/', '') for s in sims)
remaining_files = [f for f in all_files if "c6_12_backups" not in f and os.path.basename(f) not in SKIP_FILES]
not_discovered = [f for f in remaining_files if f.replace('\\', '/') not in discovered_paths]
print(f"\nFiles not discovered: {len(not_discovered)}")
for f in not_discovered:
    full = os.path.join(sim_dir, f)
    size = os.path.getsize(full)
    print(f"  {f} ({size:,} bytes)")
