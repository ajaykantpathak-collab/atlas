"""electives_probe.py -- corpus-sourced probe battery for classes 11-12
electives (ELECTIVES-ALL audit).

Extracts every `## DIAGNOSTIC_QUESTION_n` from the elective subject node
files (CBSE + CISCE corpora), filters authored junk questions
deterministically, and runs the live pipeline (LLM off, in-process).
Output: tests/_electives_probe_<lane>.jsonl with one row per question:
label, answer, refusal reason, last route hops -- enough to classify
CORRECT / WRONG / HONEST-REFUSE / COVERAGE-GAP examiner-side.

Run:  SOLVER_LLM_MODE=off python tests/electives_probe.py [lane ...]
Lanes: acc bs cs biotech app psy leg soc ip ca stat + cisce variants.
"""
import io
import json
import os
import re
import sys

_HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, _HERE)
sys.path.insert(0, os.path.dirname(os.path.dirname(_HERE)))
os.environ.setdefault("SOLVER_LLM_MODE", "off")

_DEPLOY = os.path.dirname(os.path.dirname(_HERE))  # D:\platform\deploy
CBSE = os.path.join(_DEPLOY, "content", "enhanced_nodes_md")
CISCE = os.path.join(_DEPLOY, "content", "cisce_nodes_v2")

# lane -> (glob prefixes, corpus root, cap of questions per lane)
LANES = {
    "acc":    (["c11_acc_cbse_", "c12_acc_cbse_"], CBSE, 60),
    "bs":     (["c11_bs_cbse_", "c12_bs_cbse_"], CBSE, 60),
    "cs":     (["c11_cs_cbse_", "c12_cs_cbse_"], CBSE, 80),
    "biotech": (["c11_biotech_cbse_", "c12_biotech_cbse_"], CBSE, 50),
    "app":    (["c11_app_cbse_", "c12_app_cbse_"], CBSE, 50),
    "psy":    (["c11_psy_cbse_", "c12_psy_cbse_"], CBSE, 40),
    "leg":    (["c11_leg_cbse_", "c12_leg_cbse_"], CBSE, 40),
    "soc":    (["c11_soc_cbse_", "c12_soc_cbse_"], CBSE, 40),
    "ip":     (["c11_ip_cbse_", "c12_ip_cbse_"], CBSE, 50),
    "ca":     (["c12_ca_cbse_"], CBSE, 30),
    "stat":   (["c11_stat_cbse_"], CBSE, 30),
    # CISCE electives
    "cs_ic":  (["c11_cs_ic", "c12_cs_ic"], CISCE, 50),
    "acc_ic": (["c11_acc_ic", "c12_acc_ic"], CISCE, 40),
    "bst_ic": (["c11_bst_ic", "c12_bst_ic"], CISCE, 40),
    "appmath_ic": (["c11_appmath_ic", "c12_appmath_ic"], CISCE, 40),
    "legal_ic": (["c12_legal_ic"], CISCE, 30),
    "psy_ic": (["c12_psy_ic"], CISCE, 30),
    "comm_ic": (["c11_comm_ic", "c12_comm_ic"], CISCE, 30),
}

_Q_RE = re.compile(r"^## DIAGNOSTIC_QUESTION_(\d+)\s*\n(.*?)(?=^## |\Z)",
                   re.M | re.S)

# authored junk: meta-questions and trivial scaffolds, not exam asks
_JUNK_RE = re.compile(
    r"what must you be able to do|master this topic|mastery criteria|"
    r"imagine you are\s*_{2,}|fill in the blank:\s*imagine|"
    r"reflection|journal entry:\s*write about your own|"
    r"what questions do you (?:still )?have|"
    r"write one (?:sentence|line) about yourself", re.I)


def extract_questions(prefixes, root):
    """Deterministic: sorted files x sorted question numbers."""
    names = []
    for fn in os.listdir(root):
        if any(fn.startswith(p) for p in prefixes) and fn.endswith(".md"):
            names.append(fn)
    out = []
    for fn in sorted(names):
        try:
            with io.open(os.path.join(root, fn), encoding="utf-8") as fh:
                text = fh.read()
        except OSError:
            continue
        for m in _Q_RE.finditer(text):
            q = re.sub(r"\s+", " ", m.group(2)).strip()
            if not q or _JUNK_RE.search(q) or len(q) < 15:
                continue
            out.append({"node": fn[: -len(".md")], "n": int(m.group(1)),
                        "q": q})
    return out


def spread(qs, cap):
    """Round-robin across files so the sample covers ALL chapters, not
    just chapter 1 (first-cap sampling sat on intro prose)."""
    by_file = {}
    for r in qs:
        by_file.setdefault(r["node"], []).append(r)
    order = sorted(by_file)
    out, i = [], 0
    while len(out) < cap and by_file:
        progressed = False
        for f in order:
            bucket = by_file.get(f)
            if bucket and i < len(bucket):
                out.append(bucket[i])
                progressed = True
                if len(out) >= cap:
                    break
        if not progressed:
            break
        i += 1
    return out


def main():
    lanes = sys.argv[1:] or sorted(LANES)
    from backend.its.solver.answer_pipeline import answer
    for lane in lanes:
        if lane not in LANES:
            print(f"unknown lane {lane}", flush=True)
            continue
        prefixes, root, cap = LANES[lane]
        qs = spread(extract_questions(prefixes, root), cap)
        out_path = os.path.join(_HERE, f"_electives_probe_{lane}.jsonl")
        rows = []
        with io.open(out_path, "w", encoding="utf-8") as fh:
            for rec in qs:
                try:
                    r = answer(rec["q"])
                    label = str(r.label)
                    ans = r.answer
                    ref = r.refusal_reason
                    route = (r.audit.route[-4:] if r.audit else [])
                except Exception as e:  # noqa: BLE001 -- probe must finish
                    label, ans, ref, route = (
                        "CRASH", None, f"{type(e).__name__}: {e}"[:160], [])
                row = dict(rec)
                row.update({"label": label,
                            "answer": (ans or "")[:220] if ans else None,
                            "numeric": getattr(r, "numeric", None)
                            if label != "CRASH" else None,
                            "refusal": (ref or "")[:160] if ref else None,
                            "route": [str(x)[:60] for x in route]})
                rows.append(row)
                fh.write(json.dumps(row, ensure_ascii=False) + "\n")
        from collections import Counter
        c = Counter("CRASH" if r["label"] == "CRASH" else
                    ("VERIFIED" if r["label"].startswith("VERIFIED")
                     else ("GUIDED" if r["label"].startswith("GUIDED")
                           else r["label"])) for r in rows)
        print(f"{lane}: n={len(rows)} {dict(c)} -> {out_path}", flush=True)


if __name__ == "__main__":
    main()
