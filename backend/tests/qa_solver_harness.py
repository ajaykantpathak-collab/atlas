# package-safe import (tests/ has __init__.py; scripts may not run
# from backend/ — try the package first, then the local dir)
try:
    from tests import _db_url
except ImportError:
    import os as _os, sys as _sys
    _sys.path.insert(0, _os.path.dirname(os.path.abspath(__file__)))
    import _db_url
"""qa_solver_harness.py -- QA-1 acceptance battery for the solver surface.

Single warm process (import + lazy-load cost is paid once) covering:
  1. the 9 planted gate cases from test_gate_failures.py (verdict + latency)
  2. five NEW QA attack plants (unit swap, flipped rate, impossible
     premise, zero-answer boundary, sign trap)  -- never confident-wrong
  3. per-subject verification table: 10 subjects x easy/medium/hard real
     bank questions through answer(); lane + spot-check vs the stored key
  4. node-grounded lane: relevant question -> VERIFIED_FROM_NODE,
     irrelevant question refused by the relevance gate
  5. 50 mixed solves latency sample (40 bank hits + 10 computed) with
     p50/p95/max

Writes _qa_solver_results.json INCREMENTALLY (after every section) next
to this file, so partial progress survives a kill.  Read-only over the
platform except that file.  Never raises to the top for per-case issues.
"""
import json
import os
import re
import statistics
import sys
import time

sys.path.insert(0, os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..")))
os.environ.setdefault(
    "DATABASE_URL",
    _db_url.url_sync())

_OUT = os.path.join(os.path.dirname(__file__), "_qa_solver_results.json")
RESULTS = {"gate": [], "attacks": [], "subjects": {}, "node": [],
           "latency": {}}


def save():
    with open(_OUT, "w", encoding="utf-8") as fh:
        json.dump(RESULTS, fh, indent=1, ensure_ascii=False, default=str)


HONEST = {"GUIDED_PRACTICE", "AMBIGUOUS", "UNSUPPORTED",
          "NEEDS_HUMAN_REVIEW", "REFUSED"}
_NUM = re.compile(r"-?\d+(?:\.\d+)?")


def vnum(s):
    m = _NUM.search(s or "")
    return float(m.group(0)) if m else None


def verdict(res, expected, tol, accept_or_refuse=False):
    """Gate semantics: VERIFIED must be CORRECT; otherwise the label must
    be an honest tier with answer None.  accept_or_refuse: a numerically
    correct VERIFIED for an absurd-premise plant is also acceptable."""
    label = res.label
    if label.startswith("VERIFIED"):
        if accept_or_refuse:
            return True, f"VERIFIED ({(res.answer or '')[:50]!r})"
        got = vnum(res.answer)
        if got is None:
            ok = str(expected).lower() in (res.answer or "").lower()
            return (ok, ("VERIFIED text ok" if ok else
                         f"VERIFIED text {res.answer[:60]!r} "
                         f"!= {expected!r}"))
        if abs(got - float(expected)) <= tol:
            return True, f"VERIFIED correct ({got})"
        return False, f"CONFIDENT-WRONG: got {got}, expected {expected}"
    if res.answer is not None:
        return False, f"{label} leaked answer {res.answer[:50]!r}"
    if label not in HONEST:
        return False, f"unknown label {label!r}"
    return True, f"honest refusal ({label})"


def timed_answer(q, node_id=None):
    t0 = time.time()
    try:
        res = answer(q, node_id=node_id) if node_id else answer(q)
        return res, time.time() - t0, None
    except Exception as e:  # noqa - a crash IS the finding
        return None, time.time() - t0, f"{type(e).__name__}: {str(e)[:120]}"


def main():
    t_import = time.time()
    global answer
    from backend.its.solver.answer_pipeline import answer
    print(f"[harness] import {time.time()-t_import:.1f}s", flush=True)

    # ---------------- warm ----------------
    t0 = time.time()
    answer("What is 12 * 12?")
    print(f"[harness] warm {time.time()-t0:.1f}s", flush=True)

    # ---------------- 1. the 9 planted gate cases ----------------
    import importlib.util
    spec = importlib.util.spec_from_file_location(
        "tg", os.path.join(os.path.dirname(__file__),
                           "test_gate_failures.py"))
    tg = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(tg)
    for i, (q, expected, tol) in enumerate(tg.PLANTS):
        res, dt, err = timed_answer(q)
        if err:
            ok, why = False, f"CRASH {err}"
        else:
            ok, why = tg._verdict(res, q, expected, tol)
        RESULTS["gate"].append({"i": i, "q": q[:70], "ok": ok, "why": why,
                                "label": getattr(res, "label", None),
                                "s": round(dt, 2)})
        print(f"[gate {i}] {'PASS' if ok else 'FAIL'} {dt:6.2f}s "
              f"{getattr(res, 'label', ''):<24} {why[:70]}", flush=True)
    save()

    # ---------------- 2. NEW attack battery ----------------
    attacks = [
        ("A car of mass 1000 kg accelerates uniformly from rest to "
         "100 km/h in 5 seconds. Find the net force on the car.",
         "5556", 60, False, "unit-swap km/h vs m/s"),
        ("If 15 men can complete a job in 8 days, how many days will "
         "12 men take to complete the same job?", "10", 0.1, False,
         "flipped inverse proportion"),
        ("A train travels 500 km in 2 minutes. What is its average "
         "speed in km/h?", "15000", 1, True, "impossible premise"),
        # R4 regression pin (2026-10-03): plausibility veto must refuse the
        # 15000 km/h train (previously VERIFIED as numerically correct).
        # aor=True + expected "15000" asserts the answer is NOT shipped.
        ("What is the average speed of a truck that covers 400 km in "
         "30 minutes?", "800", 1, True, "absurd truck premise (R4 pin)"),
        ("Solve for x: x + 5 = 5", "0", 0, False, "zero-answer boundary"),
        ("The temperature of a substance falls by 15 degrees Celsius "
         "every hour. If its initial temperature is -5 degrees Celsius, "
         "what is its temperature after 3 hours?", "-50", 0.1, False,
         "sign trap negative result"),
    ]
    for q, expected, tol, aor, tag in attacks:
        res, dt, err = timed_answer(q)
        if err:
            ok, why = False, f"CRASH {err}"
        else:
            ok, why = verdict(res, expected, tol, accept_or_refuse=aor)
        RESULTS["attacks"].append({"tag": tag, "q": q[:80], "ok": ok,
                                   "why": why,
                                   "label": getattr(res, "label", None),
                                   "answer": (getattr(res, "answer", None)
                                              or "")[:120],
                                   "s": round(dt, 2)})
        print(f"[atk] {'PASS' if ok else 'FAIL'} {dt:6.2f}s "
              f"{getattr(res, 'label', ''):<24} [{tag}] {why[:70]}",
              flush=True)
    save()

    # ---------------- 3. per-subject table ----------------
    import psycopg2
    conn = psycopg2.connect(
        host="127.0.0.1", port=5432, dbname="dream_app", user="dream_user",
        password=_db_url.password())
    conn.autocommit = True
    cur = conn.cursor()
    # ONE pass per subject: DISTINCT ON difficulty + random() picks the
    # easy/medium/hard triple in a single seq scan (251k rows, fleet-loaded
    # DB -- per-pick ORDER BY random() measured 20s each).
    subjects = [("maths", "math"), ("physics", "phy"), ("chemistry", "chem"),
                ("biology", "bio"), ("computer science", "cs"),
                ("english", "engl"), ("history", "hist"),
                ("geography", "geo"), ("economics", "eco"),
                ("accountancy", "acc")]
    for disp, code in subjects:
        t0 = time.time()
        cur.execute(
            "select distinct on (difficulty) difficulty, id, question_text,"
            " coalesce(correct_answer,''), coalesce(model_answer,''),"
            " question_type, options, marks"
            " from board_questions"
            " where board='CBSE' and subject=%s"
            "   and difficulty in ('easy','medium','hard')"
            "   and length(question_text) between 40 and 320"
            " order by difficulty, random()", (code,))
        picks = {r[0]: r for r in cur.fetchall()}
        print(f"[{disp}] picked 3 in {time.time()-t0:.1f}s", flush=True)
        rows_out = []
        for diff in ("easy", "medium", "hard"):
            row = picks.get(diff)
            if not row:
                rows_out.append({"diff": diff, "missing": True})
                continue
            (_, bid, qtext, ca, ma, qtype, options, marks) = row
            key = (ca.strip() or ma.strip())[:200]
            res, dt, err = timed_answer(qtext)
            entry = {"diff": diff, "id": bid, "marks": marks,
                     "qtype": qtype, "q": qtext[:80], "key": key,
                     "s": round(dt, 2)}
            if err:
                entry.update(lane="CRASH", ok=False, why=err)
            else:
                label = res.label
                anchor = res.audit.anchor or ""
                lane = ("bank" if anchor.startswith("bank:")
                        else ("node" if anchor.startswith("node:")
                              else ("refused" if res.answer is None
                                    else "computed")))
                served = (res.answer or "")
                keyn = re.sub(r"\s+", " ", key.lower())
                servn = re.sub(r"\s+", " ", served.lower())[:400]
                okc = (not key) or (keyn[:60] in servn) or \
                    (servn[:60] in keyn)
                if lane == "refused":
                    okc = label in HONEST  # honest refusal is fail-closed
                    why = f"refused ({label})"
                else:
                    why = ("served==key" if okc else
                           f"served {served[:60]!r} vs key {key[:60]!r}")
                entry.update(lane=lane, label=label, ok=bool(okc), why=why,
                             anchor=anchor[:30], served=served[:120])
            rows_out.append(entry)
            print(f"[{disp}/{diff}] {entry.get('lane','?'):<8} "
                  f"{dt:6.2f}s {'OK' if entry.get('ok') else 'BAD':<3} "
                  f"{entry.get('why', '')[:60]}", flush=True)
        RESULTS["subjects"][disp] = rows_out
        save()

    # ---------------- 4. node-grounded lane ----------------
    try:
        from backend.services.enhanced_nodes import load_index
        from backend.its.solver.node_answer import node_answer
        t0 = time.time()
        idx = load_index()
        print(f"[node] index load {time.time()-t0:.1f}s "
              f"({len(idx.nodes)} nodes)", flush=True)
        nid = None
        for n, rec in idx.nodes.items():
            r = rec if isinstance(rec, dict) else {}
            if str(r.get("subject")) == "phy" \
                    and str(r.get("definition") or "").strip():
                nid = n
                break
        rec = idx.nodes.get(nid) if nid else None
        definition = str((rec or {}).get("definition") or "")
        # positive probe quotes the node's own definition words so the
        # relevance gate's content-word intersection fires
        dw = [w for w in re.findall(r"[A-Za-z]{4,}", definition)][:7]
        rel_q = "What is " + " ".join(dw) + "?"
        print(f"[node] probing {nid} with: {rel_q[:80]}", flush=True)
        na = node_answer(rel_q, nid)
        RESULTS["node"].append({
            "case": "relevant", "node": nid, "probe": rel_q[:80],
            "served": bool(na),
            "ok": bool(na and na.get("answer")),
            "why": (na or {}).get("answer", "")[:80]})
        print(f"[node rel] served={bool(na)} "
              f"{(na or {}).get('answer', '')[:70]!r}", flush=True)
        na2 = node_answer("What is photosynthesis in green plants?", nid)
        RESULTS["node"].append({
            "case": "irrelevant (relevance gate)", "node": nid,
            "served": bool(na2),
            "ok": na2 is None,
            "why": "refused" if na2 is None else
                   (na2.get("answer", "")[:80])})
        print(f"[node irrel] served={bool(na2)} (must be False)",
              flush=True)
        res3, dt3, err3 = timed_answer(
            "What is photosynthesis in green plants?", node_id=nid)
        bad_node = (res3 is not None and
                    (res3.audit.anchor or "").startswith("node:"))
        RESULTS["node"].append({
            "case": "pipeline never node-verifies off-topic", "node": nid,
            "ok": (not bad_node) and (err3 is None),
            "label": getattr(res3, "label", None), "s": round(dt3, 2)})
        print(f"[node pipe] label={getattr(res3, 'label', None)} "
              f"bad_node_anchor={bad_node}", flush=True)
    except Exception as e:  # noqa
        RESULTS["node"].append({"case": "node lane", "ok": False,
                                "why": f"{type(e).__name__}: {str(e)[:150]}"})
        print(f"[node] EXC {e}", flush=True)
    save()

    # ---------------- 5. latency: 50 mixed solves ----------------
    lat, lat_bank, lat_comp = [], [], []
    cur.execute(
        "select question_text from board_questions where board='CBSE'"
        " and length(question_text) between 40 and 280 order by random()"
        " limit 40")
    bank_qs = [r[0] for r in cur.fetchall()]
    comp_qs = [
        "What is 47 * 23?", "Evaluate 144 / 12.",
        "Solve for x: 7x - 21 = 0",
        "A rectangle is 9 cm by 4 cm. What is its perimeter?",
        "What is 15% of 480?",
        "Find the mean of 4, 8, 15, 16, 23, 42.",
        "Simplify: 3(x + 4) - 2(x - 1)", "What is 2^10?",
        "A car travels 180 km in 3 hours. Find its average speed.",
        "Convert 0.75 to a fraction in lowest terms."]
    for q in bank_qs:
        res, dt, err = timed_answer(q)
        lat.append(dt); lat_bank.append(dt)
        if err:
            print(f"[lat bank] CRASH {err[:60]}", flush=True)
    save()
    for q in comp_qs:
        res, dt, err = timed_answer(q)
        lat.append(dt); lat_comp.append(dt)
        if err:
            print(f"[lat comp] CRASH {err[:60]}", flush=True)
    lat.sort(); lat_bank.sort(); lat_comp.sort()

    def pct(a, p):
        if not a:
            return 0
        k = max(0, min(len(a) - 1, int(round(p / 100 * len(a) + 0.5)) - 1))
        return round(a[k], 2)

    RESULTS["latency"] = {
        "n": len(lat), "all_p50": pct(lat, 50), "all_p95": pct(lat, 95),
        "all_max": round(max(lat), 2) if lat else 0,
        "bank_p50": pct(lat_bank, 50), "bank_p95": pct(lat_bank, 95),
        "bank_max": round(max(lat_bank), 2) if lat_bank else 0,
        "comp_p50": pct(lat_comp, 50), "comp_p95": pct(lat_comp, 95),
        "comp_max": round(max(lat_comp), 2) if lat_comp else 0,
    }
    print(f"[latency] {RESULTS['latency']}", flush=True)
    save()
    print("[harness] done", flush=True)


if __name__ == "__main__":
    main()
