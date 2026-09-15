import re, json, os, glob

# Find which c7m concept IDs already have kernels
d = open('backend/its/solver/catalog_executor.py', encoding='utf-8').read()
kernels = set(re.findall(r'"(c7m\d+\.\d+\.\d+)"', d))
print("Concept IDs with kernels in catalog_executor.py:")
for k in sorted(kernels):
    print(" ", k)
print("Total:", len(kernels))
print()

# Now check which of our 13 manual catalogs' concepts have kernels vs don't
manual_files = sorted(glob.glob('backend/its/competency/catalog_class7_maths_ch*_*.json'))
print("Manual catalogs and kernel coverage:")
for f in manual_files:
    d = json.load(open(f, encoding='utf-8'))
    ch = d.get('chapter', '?')
    title = d.get('chapter_title', '?')
    concepts = d.get('concepts', [])
    with_kernel = [c for c in concepts if c['id'] in kernels]
    without_kernel = [c for c in concepts if c['id'] not in kernels]
    print("  Ch%d %s: %d concepts, %d with kernel, %d without" % (ch, title, len(concepts), len(with_kernel), len(without_kernel)))
    if without_kernel:
        for c in without_kernel:
            print("    NO KERNEL: %s %s (solution_type=%s)" % (c['id'], c['title'], c.get('solution_type','')))
