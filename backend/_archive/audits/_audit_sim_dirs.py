"""Check directory structure and verify generic sims are real simulations."""
import os, re

sim_dir = r'D:\platform\frontend\components\simulations'

# Show directory structure
print("=== DIRECTORY STRUCTURE ===")
for root, dirs, files in os.walk(sim_dir):
    depth = root.replace(sim_dir, '').count(os.sep)
    indent = '  ' * depth
    subdir = os.path.basename(root)
    if depth == 0:
        subdir = "simulations/"
    tx_count = sum(1 for f in files if f.endswith('.tsx'))
    print(f"{indent}{subdir}/ ({tx_count} .tsx files)")

# Check each subdirectory for non-sim utility files
print("\n=== CHECKING FOR UTILITY/NON-SIM FILES ===")
utility_keywords = ['renderer', 'primitive', 'draggable', 'droptarget', 'mascot',
                    'framework', 'engine', 'registry', 'index', 'types', 'helper',
                    'utils', 'config', 'wrapper', 'provider', 'context', 'hook',
                    'button', 'card', 'modal', 'header', 'footer', 'nav', 'sidebar',
                    'layout', 'template', 'skeleton', 'loader', 'spinner']

for root, dirs, files in os.walk(sim_dir):
    for f in files:
        if f.endswith('.tsx'):
            name_lower = f.lower()
            if any(kw in name_lower for kw in utility_keywords):
                rel_path = os.path.relpath(os.path.join(root, f), sim_dir)
                size = os.path.getsize(os.path.join(root, f))
                print(f"  UTILITY? {rel_path} ({size:,} bytes)")

# Count files per subdirectory
print("\n=== FILES PER SUBDIRECTORY ===")
for root, dirs, files in os.walk(sim_dir):
    tx_files = [f for f in files if f.endswith('.tsx')]
    if tx_files:
        rel = os.path.relpath(root, sim_dir)
        print(f"  {rel}: {len(tx_files)} files")

# Check c6_8 and c9_12 — sample some filenames
print("\n=== SAMPLE FILES FROM c6_8/ ===")
c68_dir = os.path.join(sim_dir, 'c6_8')
if os.path.exists(c68_dir):
    files = sorted([f for f in os.listdir(c68_dir) if f.endswith('.tsx')])
    print(f"  Total: {len(files)}")
    for f in files[:10]:
        size = os.path.getsize(os.path.join(c68_dir, f))
        print(f"  {f} ({size:,} bytes)")

print("\n=== SAMPLE FILES FROM c9_12/ ===")
c912_dir = os.path.join(sim_dir, 'c9_12')
if os.path.exists(c912_dir):
    files = sorted([f for f in os.listdir(c912_dir) if f.endswith('.tsx')])
    print(f"  Total: {len(files)}")
    for f in files[:10]:
        size = os.path.getsize(os.path.join(c912_dir, f))
        print(f"  {f} ({size:,} bytes)")

# Check the root simulations/ directory for non-sim components
print("\n=== ROOT simulations/ directory files ===")
root_files = [f for f in os.listdir(sim_dir) if f.endswith('.tsx') and os.path.isfile(os.path.join(sim_dir, f))]
for f in root_files:
    size = os.path.getsize(os.path.join(sim_dir, f))
    print(f"  {f} ({size:,} bytes)")
