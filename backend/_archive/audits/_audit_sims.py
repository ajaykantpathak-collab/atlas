"""Audit discovered simulations for quality — detect backups, duplicates, tiny files, non-sims."""
import os, sys, re
from collections import Counter, defaultdict
sys.path.insert(0, '.')
from services.simulation_discovery import SimulationDiscovery, _SIM_PATTERN, _GENERIC_SIM_PATTERN

sim_dir = r'D:\platform\frontend\components\simulations'
discovery = SimulationDiscovery()
sims = discovery.discover(force_refresh=True)

print(f"=== TOTAL DISCOVERED: {len(sims)} ===\n")

# 1. Check for backup/old files
backup_sims = [s for s in sims if '_old_' in s['sim_id'] or '_old' in s['sim_id'].lower()]
print(f"1. BACKUP/OLD files in results: {len(backup_sims)}")
for s in backup_sims[:5]:
    print(f"   {s['sim_id']}")

# 2. Check for timestamped duplicates
timestamped = [s for s in sims if re.search(r'_\d{10,}$', s['sim_id'])]
print(f"\n2. TIMESTAMPED duplicates: {len(timestamped)}")
for s in timestamped[:5]:
    print(f"   {s['sim_id']}")

# 3. Check file sizes — tiny files are likely incomplete
tiny_files = []
empty_files = []
for s in sims:
    # Reconstruct path
    full_path = os.path.join(r'D:\platform\frontend', s['component_path'])
    if os.path.exists(full_path):
        size = os.path.getsize(full_path)
        if size < 500:
            tiny_files.append((s['sim_id'], size))
        if size < 100:
            empty_files.append((s['sim_id'], size))

print(f"\n3. FILE SIZE audit:")
print(f"   Empty (<100 bytes): {len(empty_files)}")
print(f"   Tiny (<500 bytes): {len(tiny_files)}")
for sid, sz in tiny_files[:10]:
    print(f"   {sid}: {sz} bytes")

# 4. Check for duplicate sim_ids (same base sim, different timestamps)
id_counts = Counter(s['sim_id'] for s in sims)
dupes = {k: v for k, v in id_counts.items() if v > 1}
print(f"\n4. DUPLICATE sim_ids: {len(dupes)}")
for k, v in list(dupes.items())[:5]:
    print(f"   {k}: {v} occurrences")

# 5. Check "general" subject sims — these are the generic pattern matches
general_sims = [s for s in sims if s['subject'] == 'general']
print(f"\n5. GENERAL (non-class-prefixed) sims: {len(general_sims)}")
for s in general_sims[:15]:
    full_path = os.path.join(r'D:\platform\frontend', s['component_path'])
    size = os.path.getsize(full_path) if os.path.exists(full_path) else 0
    print(f"   {s['sim_id']}: {size} bytes  [{s['component_path']}]")

# 6. Check actual file size distribution
sizes = []
for s in sims:
    full_path = os.path.join(r'D:\platform\frontend', s['component_path'])
    if os.path.exists(full_path):
        sizes.append(os.path.getsize(full_path))

if sizes:
    sizes.sort()
    print(f"\n6. FILE SIZE distribution:")
    print(f"   Min: {sizes[0]:,} bytes")
    print(f"   25th percentile: {sizes[len(sizes)//4]:,} bytes")
    print(f"   Median: {sizes[len(sizes)//2]:,} bytes")
    print(f"   75th percentile: {sizes[3*len(sizes)//4]:,} bytes")
    print(f"   Max: {sizes[-1]:,} bytes")
    print(f"   Mean: {sum(sizes)//len(sizes):,} bytes")

# 7. Count actual class-prefixed vs generic
class_prefixed = [s for s in sims if s['class_level'] != 'general']
generic = [s for s in sims if s['class_level'] == 'general']
print(f"\n7. BREAKDOWN:")
print(f"   Class-prefixed (C{{n}}_Subject...): {len(class_prefixed)}")
print(f"   Generic (no class prefix): {len(generic)}")

# 8. Check how many generic files are actually in sim-framework/sims/ (the original 13)
framework_sims = [s for s in sims if 'sim-framework' in s.get('component_path', '')]
print(f"\n8. sim-framework/sims/ (original plugins): {len(framework_sims)}")
for s in framework_sims:
    print(f"   {s['sim_id']}")

# 9. Check for non-component files (utility/helper files misclassified)
suspect_names = []
for s in generic:
    name = s['sim_id'].lower()
    if any(kw in name for kw in ['renderer', 'primitive', 'draggable', 'droptarget', 'mascot', 'diagram', 'challenge', 'numberline', 'game', 'framework', 'engine', 'registry', 'index', 'types']):
        suspect_names.append(s['sim_id'])
print(f"\n9. SUSPECT non-sim components (utilities/primitives): {len(suspect_names)}")
for name in suspect_names[:20]:
    print(f"   {name}")
