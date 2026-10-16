# -*- coding: utf-8 -*-
"""Deepen the 78 c6_hin weak-ELI5 nodes + c12_geo straggler.
Replaces ONLY the '## ELI5' body, grounded in each node's own DEFINITION text.
Backs up every file to backups/eli5/<name> first. Verifies all other sections byte-identical.
"""
import os, re, shutil, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from authored_eli5_c6_a import ELI5S_A
from authored_eli5_c6_b import ELI5S_B

ROOT = r"D:\platform\deploy\content\enhanced_nodes_md"
BAK = r"D:\platform\deploy\backend\content_tools\lang_all\backups\eli5"
ELI5S = {}
ELI5S.update(ELI5S_A)
ELI5S.update(ELI5S_B)

def main():
    os.makedirs(BAK, exist_ok=True)
    ok, fails = [], []
    for name, new in ELI5S.items():
        p = os.path.join(ROOT, name)
        try:
            with open(p, encoding="utf-8") as f:
                old = f.read()
            m = re.search(r"(## ELI5\n)(.*?)(?=\n## )", old, re.S)
            assert m, "no ELI5 section"
            if len(new) < 150:
                raise AssertionError("new ELI5 still <150 chars")
            bp = os.path.join(BAK, name)
            if not os.path.exists(bp):
                shutil.copyfile(p, bp)
            newtext = old[:m.start(2)] + new + old[m.end(2):]
            assert "\ufffd" not in newtext, "U+FFFD introduced"
            o_sec = re.split(r"\n## ", old)
            n_sec = re.split(r"\n## ", newtext)
            assert len(o_sec) == len(n_sec), "section count changed"
            diff = [i for i, (a, b) in enumerate(zip(o_sec, n_sec)) if a != b]
            eli5_idx = [i for i, s in enumerate(o_sec)
                        if s.startswith("ELI5\n") or s.startswith("## ELI5\n")]
            assert diff == eli5_idx, f"changed non-ELI5 sections: {diff} vs {eli5_idx}"
            with open(p, "w", encoding="utf-8", newline="") as f:
                f.write(newtext)
            ok.append(name)
        except Exception as e:
            fails.append((name, repr(e)))
    print(f"patched OK: {len(ok)} / {len(ELI5S)}")
    for n, e in fails:
        print(f"  FAIL {n}: {e}")
    short = []
    for name in ELI5S:
        with open(os.path.join(ROOT, name), encoding="utf-8") as f:
            t = f.read()
        m = re.search(r"## ELI5\n(.*?)(?=\n## )", t, re.S)
        if not m or len(m.group(1).strip()) < 150:
            short.append(name)
    print(f"re-verified short-from-disk: {len(short)} {short[:5]}")
    return 0 if not fails and not short else 1

if __name__ == "__main__":
    sys.exit(main())
