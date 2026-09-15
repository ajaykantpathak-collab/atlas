"""Test how many auto-generated compute concepts can now extract slots
and compute answers with the formula-based role inference."""
import json
import os
import glob

os.chdir(r'D:\platform')
from backend.its.solver.slot_extractor import extract_slots, _infer_roles_from_concept
from backend.its.solver.catalog_executor import execute_concept, _KERNELS

files = sorted(glob.glob('backend/its/competency/catalog_*.json'))
manual = [f for f in files if 'class7_maths' in os.path.basename(f)
          and any(x in os.path.basename(f) for x in
                  ['ch1_','ch2_','ch3_','ch4_','ch5_','ch6_','ch7_',
                   'ch8_','ch9_','ch10_','ch11_','ch12_','ch13_'])]
auto = [f for f in files if f not in manual]

total_compute = 0
has_kernel = 0
roles_inferred = 0
slots_extracted = 0
computed = 0
no_roles = 0
no_slots = 0
no_compute = 0

# Use a generic test question for each concept
for f in auto:
    d = json.load(open(f, encoding='utf-8'))
    for c in d.get('concepts', []):
        if c.get('solution_type') != 'compute':
            continue
        cid = c.get('id', '')
        total_compute += 1
        if cid in _KERNELS:
            has_kernel += 1
            continue
        # Try to infer roles
        roles = _infer_roles_from_concept(c)
        if not roles:
            no_roles += 1
            continue
        roles_inferred += 1
        # Try to extract slots with a generic question
        # Build a question from the roles: "Given role1 = 5, role2 = 3, find the result"
        test_q = "Given " + ", ".join("%s = %d" % (r, i+2) for i, r in enumerate(roles[:4]))
        test_q += ", find the result."
        try:
            slots = extract_slots(test_q, c)
        except Exception:
            slots = None
        if slots is None:
            no_slots += 1
            continue
        slots_extracted += 1
        # Try to execute
        try:
            res = execute_concept(c, slots, test_q)
        except Exception:
            res = None
        if res is not None and res.ok:
            computed += 1
        else:
            no_compute += 1

print("Auto-generated compute concepts: %d" % total_compute)
print("  Has kernel (already worked): %d" % has_kernel)
print("  No kernel, roles inferred: %d" % roles_inferred)
print("  No kernel, no roles found: %d" % no_roles)
print("  Roles found but no slots: %d" % no_slots)
print("  Slots extracted but no compute path: %d" % no_compute)
print("  FULLY COMPUTED via STEPS ladder: %d" % computed)
print()
print("Before fix: %d concepts could compute" % has_kernel)
print("After fix:  %d concepts can compute (%.0f%% improvement)" % (
    has_kernel + computed,
    100 * (has_kernel + computed) / max(total_compute, 1)))
