import os, re, sys
sys.path.insert(0, '.')
from services.simulation_discovery import _SIM_PATTERN

sim_dir = r'D:\platform\frontend\components\simulations'
unmatched = []
matched = 0
for root, dirs, files in os.walk(sim_dir):
    for f in files:
        if f.endswith('.tsx'):
            if _SIM_PATTERN.match(f):
                matched += 1
            else:
                unmatched.append(f)

print(f"Matched: {matched}")
print(f"Unmatched: {len(unmatched)}")
# Show unmatched that start with C (potential sims)
c_unmatched = [f for f in unmatched if f.startswith('C')]
print(f"Unmatched starting with C: {len(c_unmatched)}")
for f in c_unmatched[:20]:
    print(f"  {f}")
