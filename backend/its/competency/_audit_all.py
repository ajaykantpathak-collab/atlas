"""Audit all 203 catalogs to find what's missing.

Reports:
1. Concepts with solution_type=compute but no kernel in catalog_executor
2. Concepts with shallow solution steps (1-2 steps)
3. Concepts with no compute fields in solution steps
4. Concepts with no question patterns
5. Worked examples with no solution_template
6. Catalogs with no exercises
"""
import json
import os
import re
import glob

# Load all kernel IDs
executor_src = open(
    os.path.join(os.path.dirname(__file__), '..',
                 'solver', 'catalog_executor.py'), encoding='utf-8').read()
all_kernels = set(re.findall(r'"(c7m\d+\.\d+\.\d+)"', executor_src))

# Also check family bindings in competency_engine
engine_src = open(
    os.path.join(os.path.dirname(__file__), '..',
                 'solver', 'competency_engine.py'), encoding='utf-8').read()
family_bindings = set(re.findall(r'"(c7m\d+\.\d+\.\d+)"', engine_src))

# Also check slot_extractor canonical sets
extractor_src = open(
    os.path.join(os.path.dirname(__file__), '..',
                 'solver', 'slot_extractor.py'), encoding='utf-8').read()
slot_roles = set(re.findall(r'"(c7m\d+\.\d+\.\d+)"', extractor_src))

files = sorted(glob.glob(os.path.join(os.path.dirname(__file__),
                                       'catalog_*.json')))

# Separate manual (class7_maths with descriptive names) from auto
manual = [f for f in files if 'class7_maths' in os.path.basename(f)
          and any(x in os.path.basename(f) for x in
                  ['ch1_','ch2_','ch3_','ch4_','ch5_','ch6_','ch7_',
                   'ch8_','ch9_','ch10_','ch11_','ch12_','ch13_'])]
auto = [f for f in files if f not in manual]

print("=" * 70)
print("AUDIT: ALL 203 CATALOGS")
print("=" * 70)
print("Manual catalogs: %d" % len(manual))
print("Auto-generated catalogs: %d" % len(auto))
print("Kernels in catalog_executor: %d" % len(all_kernels))
print("Family bindings in competency_engine: %d" % len(family_bindings))
print("Slot role tables in slot_extractor: %d" % len(slot_roles))
print()

# Aggregate stats
total_concepts = 0
total_examples = 0
compute_no_kernel = []       # solution_type=compute but no kernel
shallow_steps = []            # < 3 solution steps
no_compute_fields = []        # no compute in any solution step
no_patterns = []              # no question_patterns
no_examples_template = []     # worked examples with no solution_template
no_exercises = []             # catalogs with no exercises

for f in files:
    d = json.load(open(f, encoding='utf-8'))
    fname = os.path.basename(f)
    ch_title = d.get('chapter_title', '?')
    concepts = d.get('concepts', [])
    examples = d.get('worked_examples', [])
    exercises = d.get('exercises', [])

    total_concepts += len(concepts)
    total_examples += len(examples)

    if not exercises:
        no_exercises.append(fname)

    for c in concepts:
        cid = c.get('id', '')
        stype = c.get('solution_type', '')
        steps = c.get('solution_steps', [])
        patterns = c.get('question_patterns', [])

        if stype == 'compute' and cid not in all_kernels:
            compute_no_kernel.append((fname, cid, c.get('title', '')))

        if len(steps) < 3:
            shallow_steps.append((fname, cid, c.get('title', ''),
                                  len(steps)))

        has_compute = any('compute' in s for s in steps)
        if not has_compute and stype == 'compute':
            no_compute_fields.append((fname, cid, c.get('title', '')))

        if not patterns:
            no_patterns.append((fname, cid, c.get('title', '')))

    for ex in examples:
        if not ex.get('solution_template'):
            no_examples_template.append((fname, ex.get('id', '')))

print("TOTAL CONCEPTS: %d" % total_concepts)
print("TOTAL WORKED EXAMPLES: %d" % total_examples)
print()
print("-" * 70)
print("GAP 1: compute concepts with NO kernel (%d)" % len(compute_no_kernel))
print("-" * 70)
# Group by file
by_file = {}
for fname, cid, title in compute_no_kernel:
    by_file.setdefault(fname, []).append((cid, title))
for fname in sorted(by_file.keys()):
    items = by_file[fname]
    print("  %s (%d):" % (fname, len(items)))
    for cid, title in items[:5]:
        print("    %s: %s" % (cid, title))
    if len(items) > 5:
        print("    ... and %d more" % (len(items) - 5))

print()
print("-" * 70)
print("GAP 2: shallow solution steps < 3 (%d concepts)" % len(shallow_steps))
print("-" * 70)
by_file = {}
for fname, cid, title, n in shallow_steps:
    by_file.setdefault(fname, []).append((cid, title, n))
for fname in sorted(by_file.keys()):
    items = by_file[fname]
    print("  %s (%d):" % (fname, len(items)))
    for cid, title, n in items[:3]:
        print("    %s: %s (%d steps)" % (cid, title, n))
    if len(items) > 3:
        print("    ... and %d more" % (len(items) - 3))

print()
print("-" * 70)
print("GAP 3: compute concepts with NO compute fields (%d)" % len(no_compute_fields))
print("-" * 70)
by_file = {}
for fname, cid, title in no_compute_fields:
    by_file.setdefault(fname, []).append((cid, title))
for fname in sorted(by_file.keys()):
    items = by_file[fname]
    print("  %s (%d):" % (fname, len(items)))
    for cid, title in items[:3]:
        print("    %s: %s" % (cid, title))
    if len(items) > 3:
        print("    ... and %d more" % (len(items) - 3))

print()
print("-" * 70)
print("GAP 4: concepts with NO question_patterns (%d)" % len(no_patterns))
print("-" * 70)
if no_patterns:
    by_file = {}
    for fname, cid, title in no_patterns:
        by_file.setdefault(fname, []).append((cid, title))
    for fname in sorted(by_file.keys())[:10]:
        items = by_file[fname]
        print("  %s (%d)" % (fname, len(items)))
    if len(by_file) > 10:
        print("  ... and %d more files" % (len(by_file) - 10))

print()
print("-" * 70)
print("GAP 5: worked examples with NO solution_template (%d)" % len(no_examples_template))
print("-" * 70)
if no_examples_template:
    by_file = {}
    for fname, exid in no_examples_template:
        by_file.setdefault(fname, []).append(exid)
    for fname in sorted(by_file.keys())[:10]:
        print("  %s: %d examples" % (fname, len(by_file[fname])))
    if len(by_file) > 10:
        print("  ... and %d more files" % (len(by_file) - 10))

print()
print("-" * 70)
print("GAP 6: catalogs with NO exercises (%d)" % len(no_exercises))
print("-" * 70)
for fname in no_exercises[:20]:
    print("  %s" % fname)
if len(no_exercises) > 20:
    print("  ... and %d more" % (len(no_exercises) - 20))
