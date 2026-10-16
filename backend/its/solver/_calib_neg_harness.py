"""Calibration v2 — the REAL rejection populations (absent from index).

NEG-OOD  : 26 hand-written everyday questions, no bank content.  The
           correct lane verdict is REJECT (no bank answer exists).
NEG-TWIN : numeric mutations of sampled bank questions (digits changed
           so the stored answer would be WRONG).  Correct verdict:
           REJECT — this is the wrong-serve hazard.
NEG-TPL  : bank-template phrasing about out-of-bank content (the
           "similar-looking but different question" hazard).

Each probe runs the production recall+rerank; we record best score,
best hit text and whether a digit-skeleton guard would have separated
the top hit.
"""
import json
import os
import re
import sys
import time

os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

BASE = os.path.dirname(os.path.abspath(__file__))

OOD = [
    "How do I stop my bicycle chain from rusting during the monsoon?",
    "What time does the nearest metro station close on Sundays?",
    "My cricket coach wants me to open the batting; is that wise for a beginner?",
    "How much paneer should I buy for a dinner party of eight people?",
    "Can I carry a power bank in checked luggage on a domestic flight?",
    "Why does my phone battery drain so much faster in winter?",
    "What is the best way to remove henna stains from my hands?",
    "How do I apply for a duplicate Class 10 marksheet from the board?",
    "Which laptop under 40000 rupees is good enough for online classes?",
    "How many cups of rice should I cook for six people?",
    "Is it safe to charge my scooter battery overnight in the garage?",
    "What should I pack for a school trip to Mussoorie in December?",
    "My grandmother's mango pickle recipe turns bitter; what went wrong?",
    "How early should I reach the railway station for a 6 am train?",
    "What plants keep mosquitoes away from a small balcony garden?",
    "Should I water tulsi plants every day during summer afternoons?",
    "How do I unregister a second-hand scooter bought without papers?",
    "What is the polite way to decline a wedding invitation in writing?",
    "The WiFi at home keeps disconnecting every evening; why?",
    "How many hours of sleep does a fifteen-year-old actually need?",
    "Where can I donate old textbooks near Mayur Vihar?",
    "Is drinking cold water after exercise actually bad for you?",
    "What is the procedure to link my mobile number with my bank account?",
    "How do I teach my dog to stop barking at the doorbell?",
    "Which sunblock SPF should I use for a Goa beach holiday?",
    "Why does my pressure cooker whistle more when I cook rajma?",
]

# numeric twins: (index into _calib_sample.json, mutated text)
TWINS = [
    (0, "A parallel plate capacitor has plate area 4.5 x 10^-3 m^2 and separation 2.0 mm. It is charged to 250 V and then disconnected from the supply. A dielectric slab of constant K = 7 is inserted completely. Calculate the new capacitance, charge, voltage, and energy stored."),
    (5, "Researchers at the Wellcome Trust compiled a corpus of 5,200 personal diaries from British civilians (Jan 1918-June 1919). Quantitative analysis showed: 41% of diary entries mentioned an unusual visual phenomenon during periods of high flu mortality, and entries that described such phenomena were 1.8x more likely to contain reflective statements."),
    (10, "A courier company charges 40 rupees for the first kg and 25 rupees for each additional kg. Write a function courier_charge(weight_kg) that returns the charge. If weight is 0 or less, return None to indicate invalid input."),
    (11, "Fill in the blank: When you visit an optician for spectacles, the prescription reads numbers like -______ D or +3.5 D - these are lens powers, not focal lengths."),
    (21, "Fill in the blank: Imagine you're comparing two countries: Country A has HDI ______ and Country B has HDI 0.91."),
    (25, "A 32-year-old woman has a regular 32-day menstrual cycle. On day 12, an ultrasound shows a dominant follicle of 18 mm in the right ovary. Predict the histological appearance of the endometrium on that day and justify your prediction based on the dominant ovarian hormone."),
    (28, "A student recorded the following entry for 'Paid 15,000 salary to manager by cheque': Salary A/c Dr. 15,000 / To Cash A/c 15,000. Identify the error, explain why it's wrong using the accounting equation, and provide the correct entry."),
    (38, "Fill in the blank: A new chef wants to join and get ______/8th share of profits."),
    (42, "Fill in the blank: Imagine you are ______ money in a piggy bank: you put 20 rupees on day 1, 25 rupees on day 2, 30 rupees on day 3, and so on, increasing by 5 rupees each day."),
    (43, "SunVolt Ltd. manufactures photovoltaic panels. Annual fixed costs are 8,00,00,000 rupees. Each panel incurs a variable cost of 14,000 rupees and sells for 24,000 rupees. The government offers a production-linked subsidy of 3,000 rupees per panel sold. The company expects to sell 60,000 panels in the first year."),
    (45, "A patient with blood group O positive requires an urgent red blood cell transfusion. The blood bank has only the following units: A positive, B positive, O negative, AB negative. Which unit(s) are compatible? Justify each selection or rejection."),
    (50, "A delivery scooter in Pune travels 12 km east in 24 minutes, then 9 km north in 18 minutes, then 14 km west in 28 minutes. Find its average speed and average velocity for the entire trip."),
    (51, "State the divisibility rule for 6 and give an example of a 5-digit number that is divisible by 6."),
    (55, "The Kerala floods of 2018 were monitored using both optical (Sentinel-2, 10 m resolution, 5-day revisit) and radar (Sentinel-1 C-band SAR, 10 m resolution, 6-day revisit, all-weather). During the peak flood week the region was cloud-covered. Calculate the maximum possible time gap between two consecutive cloud-free optical observations."),
]

# bank-template phrasing, out-of-bank content
TPL = [
    "Fill in the blank: Imagine you are waiting for your favourite singer at the airport and notice fans holding ______ banners with her name.",
    "Fill in the blank: Think of a cricket stadium during a night match — the floodlights come on one by one, and the ______ of the crowd rises with every boundary.",
    "What must you be able to do to repair a leaking kitchen tap at home?",
    "Fill in the blank: Imagine your family is planning a road trip to Leh — you must carry ______ extra fuel cans because petrol pumps are rare on that route.",
    "Fill in the blank: A street food vendor in Delhi raises the price of chole bhature from 50 to 60 rupees; his weekly sales drop — this is the basic play of ______ and demand.",
    "What common mix-up do beginner guitar players make when learning barre chords?",
]


def digit_skeleton(text):
    return ",".join(re.findall(r"[0-9]+(?:\.[0-9]+)?", text or ""))


from backend.its.solver.semantic_qa import (_st, _ce, _qdrant, COLLECTION,
                                            RECALL_K, RECALL_MIN_SCORE)
st, ce, qc = _st(), _ce(), _qdrant()

# --- production guard chain (2026-10-04) ------------------------------- #
# Same rationale as _calib_harness: precision is a FULL-CHAIN property.
# The slot gate is picked up dynamically so this file measures the lane
# before AND after the skeleton fix.  Results go to
# _calib_results2_guards.json; the pinned _calib_results2.json stays.
import backend.its.solver.semantic_qa as _sq
_SLOT_GATE = getattr(_sq, "_slot_gate_allows", None)   # None BEFORE the fix
print(f"slot gate present: {_SLOT_GATE is not None}", flush=True)


def guard_verdict(text, hit):
    """(ok, reason) for the production guard chain on the best hit."""
    pl = hit.payload or {}
    row = _sq._full_row(pl.get("qid", "")) or {}
    matched = row.get("q") or pl.get("q", "") or ""
    if _sq._context_conflict("", 0, "", row):
        return False, "ctx"
    sk_q, sk_m = _sq._digit_tokens(text), _sq._digit_tokens(matched)
    if sk_q and not _sq._digits_subset(sk_q, sk_m):
        return False, "digits"
    if _sq._roles_conflict(_sq._role_pairs(text), _sq._role_pairs(matched)):
        return False, "role"
    if _sq._twin_refusal(_sq._word_tokens(text), _sq._word_tokens(matched),
                         sk_q, sk_m):
        return False, "words"
    if _SLOT_GATE is not None and not _SLOT_GATE(text, matched,
                                                 pl.get("slots")):
        return False, "slots"
    return True, ""


sample = {s["i"]: s for s in json.load(
    open(os.path.join(BASE, "_calib_sample.json"), encoding="utf-8"))}


def probe(text):
    v = st.encode([text], normalize_embeddings=True)[0]
    # The board backfill can starve searches into server-side 60s
    # timeouts (500).  Retry — calibration must ride out saturation.
    resp = None
    for attempt in range(5):
        try:
            resp = qc.query_points(COLLECTION, query=list(v), limit=RECALL_K,
                                   score_threshold=RECALL_MIN_SCORE)
            break
        except Exception as exc:
            if attempt == 4:
                raise
            print(f"  qdrant retry {attempt + 1}: {str(exc)[:120]}",
                  flush=True)
            time.sleep(20)
    hits = resp.points
    if not hits:
        return {"recall_miss": True}
    pairs = [(text, h.payload.get("q", "")) for h in hits]
    scores = [float(s) for s in ce.predict(pairs, batch_size=16)]
    order = sorted(range(len(hits)), key=lambda i: -scores[i])
    best = order[0]
    h = hits[best]
    g_ok, g_reason = guard_verdict(text, h)
    return {"best": round(scores[best], 4),
            "best_q": h.payload.get("q", "")[:120],
            "runner_up": round(scores[order[1]], 4) if len(order) > 1 else None,
            "sk_guard": (digit_skeleton(text) != ""
                         and digit_skeleton(pairs[best][1])
                         != digit_skeleton(text)),
            "guards_ok": g_ok,
            "guard_reason": g_reason}


results = {"neg_ood": [], "neg_twin": [], "neg_tpl": []}
for ood in OOD:
    r = probe(ood); r["probe"] = ood[:80]
    results["neg_ood"].append(r)
for i, mut in TWINS:
    r = probe(mut); r["probe_i"] = i; r["probe"] = mut[:80]
    results["neg_twin"].append(r)
for tpl in TPL:
    r = probe(tpl); r["probe"] = tpl[:80]
    results["neg_tpl"].append(r)

json.dump(results, open(os.path.join(BASE, "_calib_results2_guards.json"),
                        "w"), indent=1)

for pop, label in (("neg_ood", "NEG-OOD everyday"),
                   ("neg_twin", "NEG-TWIN numeric"),
                   ("neg_tpl", "NEG-TPL template")):
    rs = [r for r in results[pop] if not r.get("recall_miss")]
    vals = sorted(r["best"] for r in rs)
    print(f"{label}: n={len(rs)} scores={[round(v,2) for v in vals]}")
print("\n=== REFUSAL (precision) at 3.0: raw threshold vs full guard chain ===")
for pop, label in (("neg_ood", "NEG-OOD everyday"),
                   ("neg_twin", "NEG-TWIN numeric"),
                   ("neg_tpl", "NEG-TPL template")):
    rs = [r for r in results[pop] if not r.get("recall_miss")]
    n = max(1, len(rs))
    raw_rej = sum(1 for r in rs if r["best"] < 3.0)
    chain_rej = sum(1 for r in rs if r["best"] < 3.0 or not r.get("guards_ok"))
    print(f"{label}: raw_refused={raw_rej}/{n} ({raw_rej/n*100:.1f}%)  "
          f"full_chain_refused={chain_rej}/{n} ({chain_rej/n*100:.1f}%)")
from collections import Counter as _Counter
for pop in results:
    reasons = _Counter(r.get("guard_reason") for r in results[pop]
                       if not r.get("recall_miss") and r["best"] >= 3.0
                       and not r.get("guards_ok"))
    if reasons:
        print(f"  {pop} guard refusals: {dict(reasons)}")
for t in (2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 6.0):
    rej = {p: sum(1 for r in results[p] if not r.get("recall_miss")
                  and r["best"] < t)
           / max(1, len([r for r in results[p] if not r.get("recall_miss")]))
           for p in results}
    print(f"threshold {t}: reject " +
          "  ".join(f"{p}={rej[p]*100:.0f}%" for p in rej))
print("\nTWIN top hits (is it the original?):")
for r in results["neg_twin"]:
    print(f"  i={r['probe_i']:2d} best={r['best']:7.3f} "
          f"sk_guard={r['sk_guard']} guards_ok={r.get('guards_ok')} "
          f"reason={r.get('guard_reason')} :: {r['best_q'][:70]!r}")
