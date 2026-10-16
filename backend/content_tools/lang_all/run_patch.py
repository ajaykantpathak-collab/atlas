"""run_patch.py <authored.json> — backup + patch + verify in ONE process."""
import json, os, re, shutil, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lang_diag_tools as T

CB = r'D:\platform\deploy\content\enhanced_nodes_md'
authored = sys.argv[1]
raw = open(authored, encoding='utf-8').read()
# normalize entry closers: ' ],\n "key"' -> ' ]},\n "key"'; tail ' ]\n}' -> ' ]}\n}'
fixed = raw.replace('\n ],\n "', '\n ]},\n "').replace('\n ]\n}', '\n ]}\n}')
if fixed != raw:
    open(authored, 'w', encoding='utf-8').write(fixed)
    print('normalized entry closers in', authored)
data = json.load(open(authored, encoding='utf-8'))
for fname in data:
    src, dst = os.path.join(CB, fname), os.path.join('backups', fname)
    if not os.path.exists(dst):
        shutil.copy2(src, dst)
print('backed up', len(data), 'files')
T.patch(CB, authored)
bad = []
for fname in data:
    t = open(os.path.join(CB, fname), encoding='utf-8').read()
    qs = re.findall(r'## DIAGNOSTIC_QUESTION_\d\n(.*?)(?=\n## )', t, re.S)
    nq = len(re.findall(r'## DIAGNOSTIC_QUESTION_\d', t))
    na = len(re.findall(r'## DIAGNOSTIC_ANSWER_\d', t))
    ok_soup = not any(T.SOUP_MARK.search(q) for q in qs)
    ok_fmt = (nq, na) == (3, 3) and '[स्तर:' in qs[0]
    ok_enc = '\ufffd' not in t
    # rubric sections intact
    secs = set(re.findall(r'^##\s+([A-Z_0-9]+)', t, re.M))
    ok_sec = {"ELI5", "DEFINITION", "WALKTHROUGH", "COMMON_MISCONCEPTION",
              "ON_FAILURE", "SCOPE_BOUNDARY", "MASTERY_CRITERIA"} <= secs
    if not (ok_soup and ok_fmt and ok_enc and ok_sec):
        bad.append((fname, ok_soup, ok_fmt, ok_enc, ok_sec))
print(f'patched+verified {len(data)}; bad:', bad if bad else 'NONE')
