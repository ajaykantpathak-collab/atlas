"""c8_generator_gate.py -- C8 gate fixtures from the GENERATOR factory.

The LOMO harness proved the bank has no same-template clusters (one
question per node), which starved SCIENTIST's recompute measurement.
But the platform has 137 question generators emitting 513 question
types -- each generator IS a template family: same skeleton, different
seed, ground-truth answer by construction.

Method (per generator qtype):
  1. generate N seeds -> (question_text, known_answer)
  2. run the BLIND production solve path on question_text
     (answer_pipeline.answer -- the registry has never seen the
     generator's own answer for this seed)
  3. VERIFIED + numeric-equal answer (2% tolerance)  -> recompute match
     VERIFIED but wrong                              -> precision hit
     anything else (GUIDED/refusal/no family)        -> coverage loss

Per-family verdict against the C8 bar (precision >= 98% with >= 30
shipped trials) -- the enable/no-enable evidence the lane needs.

  Resumable   checkpoint per qtype -> tests/_c8_gen_ckpt.json
  Findings    tests/_c8_gen_findings.jsonl (one line per trial)
  Report      tests/c8_generator_gate.{json,md} via --report

Usage:
  python tests/c8_generator_gate.py                # full run
  python tests/c8_generator_gate.py --report       # regenerate reports
  python tests/c8_generator_gate.py --per-qtype 12 # seeds per qtype
"""
import argparse
import json
import os
import re
import sys
import time
import traceback
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from concurrent.futures import TimeoutError as FuturesTimeoutError

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))

HERE = os.path.dirname(os.path.abspath(__file__))
FINDINGS = os.path.join(HERE, "_c8_gen_findings.jsonl")
CKPT = os.path.join(HERE, "_c8_gen_ckpt.json")
OUT_JSON = os.path.join(HERE, "c8_generator_gate.json")
OUT_MD = os.path.join(HERE, "c8_generator_gate.md")
NUM_RX = re.compile(r"-?\d[\d,]*(?:\.\d+)?")
NUMONLY_RX = re.compile(r"[\d,]")


def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument("--per-qtype", type=int, default=30)
    p.add_argument("--timeout", type=float, default=12.0)
    p.add_argument("--report", action="store_true")
    p.add_argument("--resume", action="store_true")
    return p.parse_args()


ARGS = parse_args()


# --------------------------------------------------------------------------- #
# comparison (sweep-compatible numeric match)
# --------------------------------------------------------------------------- #
def _nums(s):
    return [float(x.replace(",", "")) for x in NUM_RX.findall(s or "")]


def answers_match(served, known):
    a, k = str(served or "").strip(), str(known or "").strip()
    if not a or not k:
        return False
    ka_norm = k.lower().strip().rstrip(".")
    if a.lower().strip().rstrip(".") == ka_norm:
        return True
    na, nk = _nums(a), _nums(k)
    if not nk:
        return ka_norm in a.lower()
    if not na:
        return False
    # the known answer's FIRST number must appear (within 2%) among the
    # served numbers -- generators emit single-value keys
    target = nk[0]
    tol = max(0.01, 0.02 * abs(target))
    return any(abs(v - target) <= tol for v in na)


# --------------------------------------------------------------------------- #
# blind solve with timeout (throwaway thread, sweep pattern)
# --------------------------------------------------------------------------- #
def _bind_answer():
    from backend.its.solver.answer_pipeline import answer
    return answer


def run_blind(qt, timeout_s):
    t0 = time.perf_counter()
    ex = ThreadPoolExecutor(max_workers=1, thread_name_prefix="c8gen")
    try:
        fut = ex.submit(_ANSWER, qt)
        try:
            res = fut.result(timeout=timeout_s)
            return res, (time.perf_counter() - t0) * 1000.0, None
        except FuturesTimeoutError:
            return None, (time.perf_counter() - t0) * 1000.0, "TIMEOUT"
    except Exception as exc:
        return None, (time.perf_counter() - t0) * 1000.0, \
            f"{type(exc).__name__}: {exc}"[:200]
    finally:
        ex.shutdown(wait=False)


# --------------------------------------------------------------------------- #
# generator enumeration
# --------------------------------------------------------------------------- #
def iter_generator_qtypes():
    """(family_module, qtype, gen_fn) for every registered generator.

    Registry shape (verified): reg._question_gens maps generator-module
    name -> RegisteredQuestionGen(name, module, manifest, registry={
    qtype: fn, ...}); _question_gen_flat is the 513-qtype flattened view.
    """
    import solvers.registry as R
    reg = R.get_registry()
    items = []
    for mod_name, entry in sorted(getattr(reg, "_question_gens", {}).items()):
        for qtype, gen in sorted(getattr(entry, "registry", {}).items()):
            items.append((str(mod_name), qtype, gen))
    return items


def gen_one(gen_fn, seed):
    """Call a generator robustly; return (text, answer) or None."""
    for kwargs in ({"seed": seed}, {"seed": seed, "count": 1}, {}):
        try:
            out = gen_fn(**kwargs)
        except TypeError:
            continue
        except Exception:
            return None
        return _extract_pair(out)
    # positional seed as last resort
    try:
        return _extract_pair(gen_fn(seed))
    except Exception:
        return None


def _extract_pair(out):
    if out is None:
        return None
    if isinstance(out, dict):
        text = (out.get("question_text") or out.get("question")
                or out.get("text") or "")
        ans = (out.get("correct_answer") or out.get("answer")
               or out.get("result") or out.get("solution"))
        if isinstance(ans, (list, dict)):
            ans = json.dumps(ans, ensure_ascii=False)
        if text and ans is not None:
            return str(text), str(ans)
        return None
    if isinstance(out, (list, tuple)) and out:
        first = out[0]
        if isinstance(first, dict):
            return _extract_pair(first)
    return None


# --------------------------------------------------------------------------- #
# checkpoint IO
# --------------------------------------------------------------------------- #
def load_ckpt():
    if ARGS.resume and os.path.exists(CKPT):
        try:
            with open(CKPT, encoding="utf-8") as fh:
                return json.load(fh).get("done_qtypes", [])
        except Exception:
            return []
    return []


def save_ckpt(done):
    tmp = CKPT + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump({"done_qtypes": done, "ts": time.strftime("%F %T")}, fh)
    os.replace(tmp, CKPT)


# --------------------------------------------------------------------------- #
# main
# --------------------------------------------------------------------------- #
_ANSWER = None


def main():
    global _ANSWER
    if ARGS.report:
        write_report()
        return 0

    # zero-LLM posture for the gate run
    os.environ.setdefault("FREELLM_API_KEY", "POISONED-SENTINEL")
    os.environ.setdefault("GEMINI_API_KEY", "POISONED-Sentinel".upper())
    _ANSWER = _bind_answer()

    qtypes = iter_generator_qtypes()
    done = set(load_ckpt())

    # PRE-FILTER: registry dicts include module junk (classes, batch fns,
    # verify helpers). A qtype is a real generator only if seed=1 pairs.
    real = []
    skipped = 0
    for fam, q, g in qtypes:
        if q in done or gen_one(g, 1):
            real.append((fam, q, g))
        else:
            skipped += 1
    todo = [(f, q, g) for f, q, g in real if q not in done]
    print(f"[c8gen] {len(qtypes)} registry entries, {skipped} junk "
          f"(no seed-1 pair), {len(todo)} real qtypes x "
          f"{ARGS.per_qtype} seeds", flush=True)

    fout = open(FINDINGS, "a", encoding="utf-8")
    n_trials = n_match = n_wrong = 0
    try:
        for fam, qtype, gen in todo:
            for seed in range(1, ARGS.per_qtype + 1):
                pair = gen_one(gen, seed)
                if not pair:
                    fout.write(json.dumps({
                        "family": fam, "qtype": qtype, "seed": seed,
                        "cls": "GEN_FAILED"}) + "\n")
                    continue
                text, known = pair
                if len(str(text).strip()) < 12:
                    fout.write(json.dumps({
                        "family": fam, "qtype": qtype, "seed": seed,
                        "cls": "GEN_SHORT_TEXT"}) + "\n")
                    continue
                res, ms, err = run_blind(text, ARGS.timeout)
                rec = {"family": fam, "qtype": qtype, "seed": seed,
                       "known": known[:200], "ms": round(ms, 1)}
                if err == "TIMEOUT":
                    rec["cls"] = "TIMEOUT"
                elif err:
                    rec["cls"] = "ERROR"
                    rec["err"] = err
                else:
                    label = str(res.get("label") or "")
                    served = res.get("answer")
                    rec["label"] = label
                    if str(label).upper().startswith("VERIFIED"):
                        if answers_match(served, known):
                            rec["cls"] = "MATCH"
                            n_match += 1
                        else:
                            rec["cls"] = "WRONG_ANSWER"
                            rec["served"] = str(served)[:200]
                            n_wrong += 1
                    elif "GUIDED" in label.upper() or "REFUS" in label.upper():
                        rec["cls"] = "REFUSED"
                    else:
                        rec["cls"] = "OTHER_LABEL"
                    n_trials += 1
                fout.write(json.dumps(rec, ensure_ascii=False) + "\n")
                if n_trials and n_trials % 50 == 0:
                    fout.flush()
                    print(f"  trials={n_trials} match={n_match} "
                          f"wrong={n_wrong} ({time.strftime('%H:%M:%S')})",
                          flush=True)
            fout.flush()
            done.add(qtype)
            save_ckpt(sorted(done))
    except KeyboardInterrupt:
        print("\n[c8gen] interrupted — checkpoint current", flush=True)
    finally:
        fout.flush()
        fout.close()
    write_report()
    return 0


# --------------------------------------------------------------------------- #
# report
# --------------------------------------------------------------------------- #
def write_report():
    fams = defaultdict(lambda: {"trials": 0, "match": 0, "wrong": 0,
                                "refused": 0, "other": 0, "timeout": 0,
                                "error": 0, "gen_failed": 0, "ms": []})
    n_lines = 0
    if os.path.exists(FINDINGS):
        with open(FINDINGS, encoding="utf-8") as fh:
            for line in fh:
                if not line.strip():
                    continue
                n_lines += 1
                try:
                    r = json.loads(line)
                except ValueError:
                    continue
                f = fams[r["family"]]
                c = r.get("cls", "?")
                if c == "MATCH":
                    f["trials"] += 1; f["match"] += 1
                    f["ms"].append(r.get("ms", 0))
                elif c == "WRONG_ANSWER":
                    f["trials"] += 1; f["wrong"] += 1
                    f["ms"].append(r.get("ms", 0))
                elif c == "REFUSED":
                    f["refused"] += 1
                elif c == "TIMEOUT":
                    f["timeout"] += 1
                elif c == "ERROR":
                    f["error"] += 1
                elif c in ("GEN_FAILED", "GEN_SHORT_TEXT"):
                    f["gen_failed"] += 1
                else:
                    f["other"] += 1

    rows = []
    for fam, f in fams.items():
        shipped = f["trials"]
        prec = (100.0 * f["match"] / shipped) if shipped else None
        total_attempts = shipped + f["refused"] + f["timeout"] + f["error"] \
            + f["other"]
        cov = (100.0 * shipped / total_attempts) if total_attempts else 0.0
        ms = sorted(f["ms"])
        rows.append({
            "family": fam, "shipped": shipped, "match": f["match"],
            "wrong": f["wrong"], "precision": round(prec, 1) if prec is not None else None,
            "coverage": round(cov, 1), "refused": f["refused"],
            "timeout": f["timeout"], "error": f["error"],
            "gen_failed": f["gen_failed"],
            "median_ms": ms[len(ms) // 2] if ms else None,
        })
    rows.sort(key=lambda r: (-(r["precision"] or 0) * min(r["shipped"], 30),
                             -r["shipped"]))

    verdictable = [r for r in rows if r["shipped"] >= 30]
    above = [r for r in verdictable if (r["precision"] or 0) >= 98.0]
    below = [r for r in verdictable if (r["precision"] or 0) < 98.0]
    tot_shipped = sum(r["shipped"] for r in rows)
    tot_match = sum(r["match"] for r in rows)

    with open(OUT_JSON, "w", encoding="utf-8") as fh:
        json.dump({"lines": n_lines, "families": rows,
                   "verdict": {"bar": "precision>=98% with >=30 shipped",
                               "above": [r["family"] for r in above],
                               "below": [r["family"] for r in below],
                               "insufficient": [r["family"] for r in rows
                                                if r["shipped"] < 30],
                               "weighted_precision":
                                   round(100.0 * tot_match / tot_shipped, 1)
                                   if tot_shipped else None,
                                   "total_shipped": tot_shipped}},
                  fh, indent=1)

    w = lambda s: None
    lines = []
    lines.append("# C8 Generator-Fixture Gate — Recompute Precision")
    lines.append("")
    lines.append(f"- Findings lines: {n_lines:,}")
    lines.append(f"- Families seen: {len(rows)} | verdictable (>=30 "
                 f"shipped): {len(verdictable)}")
    lines.append(f"- Weighted shipped precision: "
                 f"{100.0 * tot_match / tot_shipped:.1f}% over {tot_shipped:,}"
                 f" shipped trials" if tot_shipped else "- no trials yet")
    lines.append(f"- C8 bar: precision >= 98% with >= 30 shipped trials")
    lines.append("")
    lines.append("## AT/ABOVE the bar (C8 may enable)")
    for r in above:
        lines.append(f"- {r['family']}: {r['precision']}% "
                     f"({r['match']}/{r['shipped']})")
    if not above:
        lines.append("- none yet")
    lines.append("")
    lines.append("## BELOW the bar (must NOT enable)")
    for r in below[:25]:
        lines.append(f"- {r['family']}: {r['precision']}% "
                     f"({r['match']}/{r['shipped']}, refused="
                     f"{r['refused']}, timeout={r['timeout']})")
    if not below:
        lines.append("- none yet")
    lines.append("")
    lines.append("## All families (sorted by precision x min(shipped,30))")
    lines.append("")
    lines.append("| family | shipped | match | wrong | precision | coverage% "
                 "| refused | timeout | err | median ms |")
    lines.append("|---|---|---|---|---|---|---|---|---|---|")
    for r in rows:
        lines.append(
            f"| {r['family']} | {r['shipped']} | {r['match']} | "
            f"{r['wrong']} | {r['precision'] if r['precision'] is not None else '-'} "
            f"| {r['coverage']} | {r['refused']} | {r['timeout']} | "
            f"{r['error']} | {r['median_ms']} |")
    with open(OUT_MD, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")
    print(f"[c8gen] report written: {OUT_MD}", flush=True)


if __name__ == "__main__":
    sys.exit(main())
