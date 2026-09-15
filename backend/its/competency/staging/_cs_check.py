"""Reusable self-validator for CS chapter catalogs (staging only).

Usage: python -B _cs_check.py <catalog.json> <chapter.txt>
Runs the mandatory gate plus a full DSL evaluation of every compute
chain (concepts and worked examples) under a mock environment.
"""
import json
import re
import sys

sys.path.insert(0, r"D:\platform")
from backend.tools.bulk_catalog_generator import validate_catalog
from backend.its.solver.catalog_executor import safe_eval


def mock_eval(expr):
    names = set(re.findall(r"[a-z_][a-z0-9_]*", str(expr).lower()))
    env = {n: 3.0 for n in names}
    env.update({"pi": 3.14159, "sqrt": __import__("math").sqrt,
                "abs": abs, "max": max, "min": min, "sum": sum})
    stripped = re.sub(r"^\s*[a-z_][a-z0-9_]*\s*=\s*", "", str(expr).strip())
    return safe_eval(stripped, env)


def main():
    cat_path, txt_path = sys.argv[1], sys.argv[2]
    cat = json.load(open(cat_path, encoding="utf-8"))
    text = open(txt_path, encoding="utf-8").read()
    ok, probs = validate_catalog(cat, text)
    problems = list(probs)
    n_chains = 0
    for c in cat.get("concepts", []):
        steps = c.get("solution_steps") or []
        if c.get("solution_type") == "compute":
            computes = [s.get("compute") for s in steps if s.get("compute")]
            if len(computes) < 2:
                problems.append("%s: compute chain shorter than 2 steps"
                                % c.get("id"))
            if computes:
                last = re.sub(r"^\s*[a-z_][a-z0-9_]*\s*=\s*", "",
                              computes[-1]).strip()
                inputs = set()
                for e in computes[:-1]:
                    bound = re.match(r"^\s*([a-z_][a-z0-9_]*)\s*=\s*(.+)$",
                                     e, re.DOTALL)
                    rhs = bound.group(2) if bound else e
                    inputs |= set(re.findall(r"[a-z_][a-z0-9_]*", rhs))
                    if bound:
                        inputs.add(bound.group(1))
                if not (inputs & set(re.findall(r"[a-z_][a-z0-9_]*", last))):
                    problems.append("%s: final answer does not use any "
                                    "earlier binding or input"
                                    % c.get("id"))
            for s in steps:
                if s.get("compute"):
                    n_chains += 1
                    try:
                        mock_eval(s["compute"])
                    except Exception as exc:
                        problems.append("%s: DSL eval failed: %s (%s)"
                                        % (c.get("id"), s["compute"], exc))
    for w in cat.get("worked_examples", []):
        for s in w.get("solution_template") or []:
            if s.get("compute"):
                try:
                    mock_eval(s["compute"])
                except Exception as exc:
                    problems.append("%s: worked example DSL failed: %s (%s)"
                                    % (w.get("id"), s["compute"], exc))
    print("gate_ok=%s chains=%d concepts=%d"
          % (ok and not problems, n_chains, len(cat.get("concepts", []))))
    for p in problems[:8]:
        print("  -", p)


if __name__ == "__main__":
    main()
