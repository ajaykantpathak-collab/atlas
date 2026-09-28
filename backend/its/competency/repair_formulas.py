"""repair_formulas — give bare/literal-step math concepts a symbolic
formula + variable compute steps, verified against the concept's own
authored questions.

For each catalog concept with no usable symbolic path, we ask Nemotron
to emit:
    formula: "lcm = a * b / hcf"          (ascii, variable names)
    solution_steps: [{action, explain, compute}]   (symbolic only)

A repair is accepted ONLY when the executor reproduces at least one of
the concept's authored answers from its own questions — self-verifying,
no hallucinated math can land.
"""

import glob
import json
import os
import re
import sys
import time

sys.path.insert(0, r"D:\platform")
from backend.its.solver.catalog_executor import execute_concept
from backend.its.solver.input_normalizer import normalize_input

sys.path.insert(0, r"D:\platform\deploy\backend")
from backend.tools.gemini_client import generate as _gemini

MODEL = "gemini-3.7-flash"   # client rotates 3.7 -> 3.6 -> 3.5 -> lite

PROMPT = """You are converting a CBSE maths concept card into an executable
form. Emit ONLY:

FORMULA: <lhs> = <rhs>; [<lhs2> = <rhs2>; ...]   — one formula per
         DISTINCT quantity the sample questions ask for (nth term AND
         sum are different formulas). ascii, lowercase variable names.
PARAMS: "<phrase in question>" -> <variable>; ...   — map each input
        variable to the EXACT phrase the questions use for it
        ("first term" -> a, "common difference" -> d, "radius" -> r)
ASKS: "<phrase that asks for it>" -> <lhs variable>; ...
        ("8th term" -> an, "sum of terms" -> sn, "circumference" -> c)
GLOSS: <var> = "<plain meaning of this variable>"; ...
        (a = "first term of the sequence", d = "gap between terms")
STEPS:
<var> = <symbolic expression>   (one per line, variables only — NEVER
literal numbers from the example)

Concept: {title}
Key idea: {key_idea}
Sample questions:
{questions}

Rules: variables like speed, distance, time, hcf, lcm, a, b, n, d, l,
principal, rate. Cover EVERY distinct asked quantity across the
samples. If the concept is purely descriptive (no computation), emit
"FORMULA: none".
"""


def _call(prompt: str, key: str = "", model: str = MODEL) -> str:
    txt = _gemini(prompt, max_tokens=16000, temperature=0.2,
                  timeout=180)
    return txt or ""


def _parse(text: str):
    m = re.search(r"FORMULA:\s*(.+)", text)
    formula = m.group(1).strip() if m else None
    if formula and formula.lower() == "none":
        formula = None
    pm = re.search(r"PARAMS:\s*(.+)", text)
    param_map = {}
    if pm:
        for mm in re.finditer(r'["\']([^"\']+)["\']\s*->\s*'
                              r'([a-z_][a-z0-9_]*)', pm.group(1)):
            param_map[mm.group(1).strip().lower()] = mm.group(2)
    am = re.search(r"ASKS:\s*(.+)", text)
    ask_map = {}
    if am:
        for mm in re.finditer(r'["\']([^"\']+)["\']\s*->\s*'
                              r'([a-z_][a-z0-9_]*)', am.group(1)):
            ask_map[mm.group(1).strip().lower()] = mm.group(2)
    gm = re.search(r"GLOSS:\s*(.+)", text)
    var_gloss = {}
    if gm:
        for mm in re.finditer(r"([a-z_][a-z0-9_]*)\s*=\s*"
                              r'["\']([^"\']+)["\']', gm.group(1)):
            var_gloss[mm.group(1)] = mm.group(2).strip()
    steps = []
    for line in text.splitlines():
        lm = re.match(r"^\s*([a-z_][a-z0-9_]*)\s*=\s*(.+)$", line.strip())
        if lm and "FORMULA" not in line and "STEPS" not in line \
                and "PARAMS" not in line:
            lhs, rhs = lm.group(1), lm.group(2).strip()
            if re.search(r"[a-z_]", rhs, re.I):  # symbolic only
                steps.append({"action": f"compute {lhs}",
                              "explain": "", "compute": f"{lhs} = {rhs}"})
    return formula, steps, param_map, ask_map, var_gloss


def _needs_repair(c: dict) -> bool:
    if c.get("formula"):
        return False
    steps = [s for s in (c.get("solution_steps") or [])
             if s.get("compute")]
    if not steps:
        return True
    # literal-only compute steps count as unrepaired
    rhs = str(steps[-1].get("compute", "")).split("=")[-1]
    return not re.search(r"[a-z_]", rhs, re.I)


def _verify(c: dict, formula, steps, param_map=None, ask_map=None, var_gloss=None) -> bool:
    test = dict(c)
    test["formula"] = formula
    test["solution_steps"] = steps or c.get("solution_steps")
    test["param_map"] = param_map or {}
    test["ask_map"] = ask_map or {}
    test["var_gloss"] = var_gloss or {}
    test["solution_type"] = "compute"
    checked = passed = 0
    for qq in (c.get("questions") or [])[:4]:
        q, exp = str(qq.get("q", "")), str(qq.get("a", ""))
        nums = re.findall(r"-?[\d.]+", exp)
        if not nums:
            continue
        checked += 1
        try:
            r = execute_concept(test, {}, normalize_input(q))
        except Exception:
            continue
        if r.ok and abs(r.value - float(nums[0])) < 0.01:
            passed += 1
    # every numeric authored question must verify — a repair that
    # reproduces only one phrasing isn't proven
    return checked > 0 and passed == checked


def _already_solves(c: dict) -> bool:
    """Concept already verifiably answers one of its own questions —
    no LLM call needed."""
    for qq in (c.get("questions") or [])[:3]:
        q, exp = str(qq.get("q", "")), str(qq.get("a", ""))
        nums = re.findall(r"-?[\d.]+", exp)
        if not nums:
            continue
        try:
            r = execute_concept(c, {}, normalize_input(q))
        except Exception:
            continue
        if r.ok and abs(r.value - float(nums[0])) < 0.01:
            return True
    return False


def _repair_one(c: dict):
    """One LLM call + verification. Returns the enriched concept or
    None when the repair can't reproduce the concept's own answers."""
    qs = "\n".join(str(q.get("q", ""))[:140]
                   for q in (c.get("questions") or [])[:3])
    if not qs.strip():
        return None
    try:
        txt = _call(PROMPT.format(
            title=c.get("title", ""),
            key_idea=c.get("key_idea", ""),
            questions=qs))
    except Exception:
        return None
    formula, steps, param_map, ask_map, var_gloss = _parse(txt)
    if not formula and not steps:
        return None
    if not _verify(c, formula, steps, param_map, ask_map, var_gloss):
        return None
    c["formula"] = formula or c.get("formula")
    if steps:
        c["solution_steps"] = steps
    if param_map:
        c["param_map"] = param_map
    if ask_map:
        c["ask_map"] = ask_map
    if var_gloss:
        c["var_gloss"] = var_gloss
    c["converted_to_compute"] = True
    return c


def main(limit: int = 10000, dry: bool = False, workers: int = 10,
         shard: int = 0, shards: int = 1):
    from concurrent.futures import ThreadPoolExecutor
    files = sorted(
        glob.glob(r"D:/platform/backend/its/questions/generated/"
                  "catalog_class*_maths*.json"))
    files = files[shard::shards]  # this process's slice
    repaired = skipped = already = failed = 0
    for f in files:
        d = json.load(open(f, encoding="utf8"))
        fname = f.split("\\")[-1]
        todo = []
        for c in d.get("concepts", []):
            if not _needs_repair(c):
                skipped += 1
                continue
            if _already_solves(c):
                already += 1
                continue
            todo.append(c)
        if not todo:
            continue
        done = [0]

        def work(c):
            out = _repair_one(c)
            done[0] += 1
            if done[0] % 20 == 0:
                print(f"  ..{fname} {done[0]}/{len(todo)}",
                      flush=True)
            return c, out

        with ThreadPoolExecutor(max_workers=workers) as ex:
            for c, out in ex.map(work, todo):
                if out is not None:
                    repaired += 1
                    print("  OK", c.get("id"), "|",
                          str(c.get("formula"))[:50], flush=True)
                else:
                    failed += 1
        if not dry:
            json.dump(d, open(f, "w", encoding="utf8"),
                      ensure_ascii=False, indent=1)
            print("saved", fname, flush=True)
        if repaired >= limit:
            break
    print(f"\nrepaired={repaired} skipped={skipped} "
          f"already={already} failed={failed}")


if __name__ == "__main__":
    # usage: repair_formulas [limit] [shard] [shards]
    a = [int(x) for x in sys.argv[1:] if x.lstrip("-").isdigit()]
    main(limit=a[0] if a else 10000,
         shard=a[1] if len(a) > 1 else 0,
         shards=a[2] if len(a) > 2 else 1)
