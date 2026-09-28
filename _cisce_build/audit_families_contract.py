"""Independent solver-family contract auditor.

Does NOT trust test suites or agent reports: re-imports every subject family
module from the ROOT tree, re-fires the probe questions itself, and re-measures
the STEP CONTRACT (SOLVER_STEP_CONTRACT.md):
  hard  : <2 steps, or <80 chars total        -> FAIL (blocks acceptance)
  warn  : <3 steps / <150 chars, missing method
          beat in step 1, missing verification beat
Also checks root<->deploy tree drift for every module.

Usage:  python audit_families_contract.py            # audit + summary
        python audit_families_contract.py --json out # also dump JSON
"""
import importlib
import hashlib
import json
import os
import re
import sys
import traceback

sys.path.insert(0, "D:/platform")

ROOT = "D:/platform/backend/its/solver"
DEPLOY = "D:/platform/deploy/backend/its/solver"
BUILD = "D:/platform/_cisce_build"

SUBJECTS = [
    ("maths", "test_families.py"),
    ("physics", "test_physics_families.py"),
    ("chemistry", "test_chemistry_families.py"),
    ("biology", "test_biology_families.py"),
    ("accountancy", "test_accountancy_families.py"),
    ("economics", "test_economics_families.py"),
    ("english", "test_english_families.py"),
    ("hindi", "test_hindi_families.py"),
    ("compapp", "test_compapp_families.py"),
    ("socsci", "test_socsci_families.py"),
]

METHOD_RE = re.compile(
    r"\b(law|formula|rule|method|identity|relation|principle|theorem|"
    r"golden|equation|using|ratio)\b", re.I)
VERIFY_RE = re.compile(
    r"\b(substitut\w*|check\w*|verif\w*|sanity|recomput\w*|tally\w*|"
    r"cross-?check|balance[sd]?|back\b)\b", re.I)
PROBE_RE = re.compile(r'"([^"]{15,})"|\'([^\']{15,})\'')
PROBE_SHAPE = re.compile(
    r"\d|\?|^(find|solve|calculate|compute|evaluate|what|how|a |an |the |"
    r"given|if |in a|balance|draw|construct)\b", re.I)


def extract_probes(text):
    out = []
    for a, b in PROBE_RE.findall(text):
        s = a or b
        if PROBE_SHAPE.search(s):
            out.append(s)
    return list(dict.fromkeys(out))

HARD = "HARD"
WARN = "WARN"


def audit_steps(steps, final_answer):
    steps = [s for s in (steps or []) if isinstance(s, str) and s.strip()]
    joined = " ".join(steps)
    hard, warn = [], []
    if final_answer and not steps:
        hard.append("zero steps — answer-only output")
    elif len(steps) < 2:
        hard.append(f"only {len(steps)} step(s)")
    if steps and len(joined) < 80:
        hard.append(f"only {len(joined)} chars total")
    else:
        if len(steps) < 3 or len(joined) < 150:
            warn.append(f"{len(steps)} steps / {len(joined)} chars — below contract")
    if steps and not METHOD_RE.search(steps[0]):
        warn.append("no method beat in step 1")
    if steps and not VERIFY_RE.search(joined):
        warn.append("no verification beat")
    return hard, warn


def tree_drift(module):
    a, b = f"{ROOT}/{module}.py", f"{DEPLOY}/{module}.py"
    try:
        ha = hashlib.md5(open(a, "rb").read()).hexdigest()
        hb = hashlib.md5(open(b, "rb").read()).hexdigest()
    except OSError as e:
        return f"unreadable: {e}"
    return None if ha == hb else "root != deploy"


def main():
    dump = None
    if len(sys.argv) > 2 and sys.argv[1] == "--json":
        dump = sys.argv[2]

    report, hard_total = {}, 0
    for subject, test_file in SUBJECTS:
        entry = {"modules": [], "probes_fired": 0, "matched": 0,
                 "hard": [], "warn": [], "import_errors": [], "drift": []}
        test_path = f"{BUILD}/{test_file}"
        if not os.path.exists(test_path):
            entry["import_errors"].append(f"{test_file}: missing (subject not built yet)")
            report[subject] = entry
            print(f"== {subject}: PENDING (no harness yet)")
            continue
        text = open(test_path, encoding="utf-8", errors="replace").read()
        entry["errors"] = []
        mod_funcs: dict[str, set] = {}
        for module, func in re.findall(
                r"from\s+backend\.its\.solver\.(\w+)\s+import\s+(\w+)", text):
            mod_funcs.setdefault(module, set()).add(func)
        for module in set(re.findall(
                r"import\s+backend\.its\.solver\.(\w+)(?:\s+as\s+\w+)?", text)):
            mod_funcs.setdefault(module, set())
        probes = extract_probes(text)
        for module, funcs in mod_funcs.items():
            drift = tree_drift(module)
            if drift:
                entry["drift"].append(f"{module}: {drift}")
            try:
                mod = importlib.import_module(f"backend.its.solver.{module}")
            except Exception as e:
                entry["import_errors"].append(f"{module}: {e}")
                continue
            if not funcs:
                funcs = {n for n in dir(mod) if n.startswith("model_")}
            for func in sorted(funcs):
                fn = getattr(mod, func, None)
                if not callable(fn):
                    entry["import_errors"].append(f"{module}.{func}: not callable")
                    continue
                entry["modules"].append(f"{module}.{func}")
                for probe in probes:
                    try:
                        res = fn(probe)
                    except Exception as e:
                        entry["errors"].append(
                            f"{module}.{func} crashed on {probe[:60]!r}: "
                            f"{type(e).__name__}: {e}")
                        continue
                    entry["probes_fired"] += 1
                    if not getattr(res, "matched", False):
                        continue
                    entry["matched"] += 1
                    hard, warn = audit_steps(getattr(res, "steps", None),
                                             getattr(res, "final_answer", None))
                    for h in hard:
                        entry["hard"].append(f"[{subject}] {probe[:70]!r} -> {h}")
                    for w in warn:
                        entry["warn"].append(f"[{subject}] {probe[:70]!r} -> {w}")
        hard_total += len(entry["hard"])
        report[subject] = entry
        n_h, n_w, n_e = len(entry["hard"]), len(entry["warn"]), len(entry["errors"])
        print(f"== {subject}: modules={entry['modules'] or 'NONE'} "
              f"probes={entry['probes_fired']} matched={entry['matched']} "
              f"HARD={n_h} warn={n_w} crashes={n_e}")
        for line in entry["hard"][:8]:
            print(f"   FAIL {line}")
        for line in entry["errors"][:4]:
            print(f"   crash {line}")
        for line in entry["warn"][:4]:
            print(f"   warn {line}")
        for d in entry["drift"] + entry["import_errors"]:
            print(f"   !! {d}")

    verdict = "PASS" if hard_total == 0 else f"FAIL ({hard_total} hard)"
    print(f"\nAUDIT VERDICT: {verdict}")
    if dump:
        json.dump(report, open(dump, "w", encoding="utf-8"),
                  indent=1, ensure_ascii=False)
    sys.exit(0 if hard_total == 0 else 1)


if __name__ == "__main__":
    try:
        main()
    except Exception:
        traceback.print_exc()
        sys.exit(2)
