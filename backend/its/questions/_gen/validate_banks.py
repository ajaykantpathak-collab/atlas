"""validate_banks.py -- independent validation of the generated banks.

Every answer in every bank must be reproducible by executing the stored
chain through backend.its.solver.catalog_executor.safe_eval, one
sequential step at a time.  This script re-implements the step runner
independently of the builder, re-executes every chain, checks the bank
schema, and reports a pass rate that must reach 100%.

Usage:  python validate_banks.py
"""
from __future__ import annotations

import glob
import io
import json
import math
import os
import sys

sys.path.insert(0, "D:/platform")
sys.path.insert(0, "D:/platform/backend/tools")

from backend.its.solver.catalog_executor import safe_eval  # noqa: E402

GEN_DIR = "D:/platform/backend/its/questions/generated"
AUDIT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "audit")
COMP_DIR = "D:/platform/backend/its/competency"


def parse_answer(s):
    s = str(s).strip()
    if "/" in s:
        p, q = s.split("/", 1)
        return float(p) / float(q)
    return float(s)


def exec_chain(lines):
    """Sequential safe_eval execution of 'name = expr' / bare exprs."""
    env = {"pi": math.pi}
    value = None
    for line in lines:
        line = str(line).strip()
        name = None
        expr = line
        if "=" in line and "==" not in line and "<=" not in line \
                and ">=" not in line and "!=" not in line:
            head, tail = line.split("=", 1)
            head = head.strip()
            if head.replace("_", "").isalnum() and head[0].isalpha():
                name, expr = head, tail.strip()
        value = safe_eval(expr, env)
        if name:
            env[name] = value
    return value


def main():
    banks = sorted(set(
        glob.glob(os.path.join(GEN_DIR, "catalog_class*_maths_*.json"))
        + glob.glob(os.path.join(GEN_DIR,
                                 "catalog_class*_applied_maths_*.json"))))
    total_q = ok_q = 0
    total_conv = ok_conv = 0
    total_concepts = 0
    errors = []

    for bank_path in banks:
        fname = os.path.basename(bank_path)
        audit_path = os.path.join(AUDIT_DIR, fname)
        cat_path = os.path.join(COMP_DIR, fname)
        bank = json.load(io.open(bank_path, encoding="utf-8"))
        audit = json.load(io.open(audit_path, encoding="utf-8"))
        cat = json.load(io.open(cat_path, encoding="utf-8"))

        def err(msg):
            errors.append("%s: %s" % (fname, msg))

        # -- bank-level schema
        if bank.get("catalog") != fname:
            err("catalog field is %r, expected %r"
                % (bank.get("catalog"), fname))
        cat_by_id = {c["id"]: c for c in cat.get("concepts", [])}
        audit_by_id = {c["id"]: c for c in audit.get("concepts", [])}
        if set(audit_by_id) != {c["id"] for c in bank["concepts"]}:
            err("audit/bank concept id mismatch")
        total_concepts += len(bank["concepts"])

        for entry in bank["concepts"]:
            cid = entry["id"]
            expected_keys = {"id", "title", "converted_to_compute",
                             "solution_steps", "questions"}
            extra = set(entry.keys()) - expected_keys
            if extra:
                err("concept %s has unexpected keys %s" % (cid, extra))
            if entry.get("converted_to_compute") is False and \
                    "solution_steps" in entry:
                err("concept %s carries solution_steps without conversion" % cid)
            concept = cat_by_id.get(cid)
            if concept is None:
                err("concept %s not in catalog" % cid)
                continue
            qs = entry.get("questions", [])
            if len(qs) != 6:
                err("concept %s has %d questions" % (cid, len(qs)))
            texts = set()
            a_rec = audit_by_id.get(cid)
            for i, q in enumerate(qs):
                if set(q.keys()) != {"q", "a", "self_check"}:
                    err("concept %s q%d keys %s" % (cid, i, sorted(q.keys())))
                    continue
                if q["self_check"] is not False:
                    err("concept %s q%d self_check not False" % (cid, i))
                if not isinstance(q["q"], str) or not q["q"].strip():
                    err("concept %s q%d empty text" % (cid, i))
                if not isinstance(q["a"], str) or not q["a"].strip():
                    err("concept %s q%d empty answer" % (cid, i))
                if q["q"] in texts:
                    err("concept %s duplicate question text" % cid)
                texts.add(q["q"])
                total_q += 1
                # execute the stored chain via safe_eval
                try:
                    chain = a_rec["questions"][i]["chain"]
                    val = exec_chain(chain)
                    want = parse_answer(q["a"])
                    if math.isfinite(val) and abs(val - want) <= 0.006 + 0.004 * abs(want):
                        ok_q += 1
                    else:
                        err("concept %s q%d answer %r != safe_eval %r"
                            % (cid, i, q["a"], val))
                except Exception as exc:
                    err("concept %s q%d chain failed: %r" % (cid, i, exc))
            # -- conversion checks
            converted = entry.get("converted_to_compute")
            steps = entry.get("solution_steps")
            if "converted_to_compute" not in entry:
                err("concept %s missing converted_to_compute flag" % cid)
            if converted:
                total_conv += 1
                if concept.get("solution_type") != "verify_property":
                    err("concept %s converted but catalog type is %s"
                        % (cid, concept.get("solution_type")))
                if not steps or not isinstance(steps, list):
                    err("concept %s converted without solution_steps" % cid)
                    continue
                chain = [s["compute"] for s in steps]
                try:
                    val = exec_chain(chain)
                    if val is None or not math.isfinite(val):
                        err("concept %s steps final value not finite" % cid)
                    else:
                        ok_conv += 1
                except Exception as exc:
                    err("concept %s steps chain failed: %r" % (cid, exc))
                for j, s in enumerate(steps):
                    if s.get("step") != j + 1 or not s.get("action") \
                            or not s.get("explain") or not s.get("compute"):
                        err("concept %s step %d malformed" % (cid, j))
            else:
                if steps is not None:
                    err("concept %s not converted but has solution_steps" % cid)
                if concept.get("solution_type") == "verify_property" and \
                        a_rec.get("family") not in ("principal_values", "authored"):
                    err("concept %s verify_property left unconverted "
                        "(family %s)" % (cid, a_rec.get("family")))

    print("banks checked:        %d" % len(banks))
    print("concepts checked:     %d" % total_concepts)
    print("questions checked:    %d, reproduced via safe_eval: %d (%.2f%%)"
          % (total_q, ok_q, 100.0 * ok_q / max(total_q, 1)))
    print("conversions checked:  %d, chain executes: %d (%.2f%%)"
          % (total_conv, ok_conv, 100.0 * ok_conv / max(total_conv, 1)))
    print("schema/consistency errors: %d" % (len(errors) - (total_q - ok_q)
                                             - (total_conv - ok_conv)))
    if errors:
        print("--- ERRORS (first 40) ---")
        for e in errors[:40]:
            print(" ", e)
        sys.exit(1)
    print("PASS RATE: 100%")


if __name__ == "__main__":
    main()
