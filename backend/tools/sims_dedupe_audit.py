"""sims_dedupe_audit.py -- post-wave dedupe + health audit for new sims.

Run after a sim creation wave lands.  For every sim created after the
baseline snapshot (SIMS_BASELINE.json):
  1. transpile check (zero diagnostics required)
  2. concept-level dedupe: which corpus concepts the sim plausibly
     covers, and whether those concepts were ALREADY covered by
     pre-baseline sims -> flags probable duplicates
  3. writes SIMS_WAVE_REPORT.json with per-file verdicts

Usage: python backend/tools/sims_dedupe_audit.py
"""
import json
import os
import re
import sys
from datetime import datetime

FRONT = r"D:\platform\frontend"
SIMS = os.path.join(FRONT, "components", "simulations")
LIVE = r"D:\platform\backend\its\competency"
BASELINE = r"D:\platform\SIMS_BASELINE.json"
OUT = r"D:\platform\SIMS_WAVE_REPORT.json"

STOP = set("the a an of and or in on for to with from its their that "
           "this is are was were be by as at it use uses let try what "
           "how when your you can change click drag set see shows".split())


def words(s):
    return {w for w in re.findall(r"[a-z]{3,}", s.lower()) if w not in STOP}


def main():
    baseline = json.load(open(BASELINE, encoding="utf-8"))
    # baseline was written with relative paths; normalize to absolute
    baseline = {os.path.abspath(os.path.join(FRONT, "..", k)): v
                for k, v in baseline.items()}
    baseline.update({os.path.abspath(k): v for k, v in
                     json.load(open(BASELINE, encoding="utf-8")).items()})
    # --- corpus concepts ---
    chapters = []
    for f in sorted(os.listdir(LIVE)):
        if not (f.startswith("catalog_") and f.endswith(".json")):
            continue
        cat = json.load(open(os.path.join(LIVE, f), encoding="utf-8"))
        subj = str(cat.get("subject", ""))
        if subj in ("hindi", "english", "sanskrit", "urdu", "french"):
            continue
        cons = []
        for c in cat.get("concepts", []):
            tw = words(str(c.get("title", "")))
            if tw:
                cons.append(tw)
        if cons:
            chapters.append({
                "class": str(cat.get("class")), "subject": subj,
                "title": str(cat.get("chapter_title", ""))[:70],
                "concepts": cons,
            })

    # --- sim token extraction ---
    def sim_tokens(path):
        src = open(path, encoding="utf-8", errors="ignore").read()
        toks = words(os.path.basename(path).replace(".tsx", "").replace("_", " "))
        for m in re.findall(r"[\"\x27]([^\"\x27]{6,80})[\"\x27]", src[:8000]):
            toks |= words(m)
        return toks, src

    # --- pre-baseline coverage of each concept ---
    print("indexing pre-baseline sims...")
    old_paths = [p for p in baseline if os.path.exists(p)]
    old_toks = [sim_tokens(p)[0] for p in old_paths]

    def concepts_already_covered(ch):
        covered = 0
        for ct in ch["concepts"]:
            for st in old_toks:
                if len(ct & st) / max(1, len(ct)) >= 0.5:
                    covered += 1
                    break
        return covered

    for ch in chapters:
        ch["pre_covered"] = concepts_already_covered(ch)

    # --- audit new sims ---
    print("auditing new sims...")
    report = []
    new_files = []
    for root, dirs, files in os.walk(SIMS):
        for f in files:
            if not f.endswith(".tsx"):
                continue
            p = os.path.join(root, f)
            if p not in baseline:
                new_files.append(p)

    import subprocess
    for p in new_files:
        toks, src = sim_tokens(p)
        # transpile
        try:
            ts = json.loads("{}")  # placeholder; real check below
        except Exception:
            pass
        node = (
            "const ts=require('./frontend/node_modules/typescript');"
            "const fs=require('fs');const src=fs.readFileSync(process.argv[1],'utf8');"
            "const r=ts.transpileModule(src,{compilerOptions:{jsx:ts.JsxEmit.React,"
            "target:99,module:99},reportDiagnostics:true});"
            "const ds=(r.diagnostics||[]).map(d=>ts.flattenDiagnosticMessageText(d.messageText,' '));"
            "if(ds.length){console.error(ds.join('|'));process.exit(1)}else{console.log('OK')}"
        )
        ok = subprocess.run(
            ["node", "-e", node, p], capture_output=True, text=True)
        transpile_ok = ok.returncode == 0
        # concepts covered by THIS sim
        covers = []
        for ch in chapters:
            n = 0
            for ct in ch["concepts"]:
                if len(ct & toks) / max(1, len(ct)) >= 0.5:
                    n += 1
            if n:
                covers.append({"class": ch["class"], "subject": ch["subject"],
                               "title": ch["title"], "concepts_hit": n,
                               "of": len(ch["concepts"]),
                               "pre_covered": ch["pre_covered"]})
        # duplicate heuristic: every chapter it touches was already
        # >= half covered BEFORE this sim existed
        dup = bool(covers) and all(
            c["pre_covered"] >= c["of"] / 2 for c in covers)
        report.append({
            "file": p, "transpile_ok": transpile_ok,
            "covers": covers, "probable_duplicate": dup,
        })

    out = {
        "generated": datetime.utcnow().isoformat(),
        "baseline_count": len(baseline),
        "new_count": len(new_files),
        "transpile_failures": [r["file"] for r in report
                               if not r["transpile_ok"]],
        "probable_duplicates": [r["file"] for r in report
                                if r["probable_duplicate"]],
        "files": report,
    }
    json.dump(out, open(OUT, "w", encoding="utf-8"), indent=1)
    print(f"new sims: {len(new_files)} | transpile failures: "
          f"{len(out['transpile_failures'])} | probable duplicates: "
          f"{len(out['probable_duplicates'])}")
    print(f"report -> {OUT}")


if __name__ == "__main__":
    main()
