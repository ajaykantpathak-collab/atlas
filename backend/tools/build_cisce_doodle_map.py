"""Build the CISCE->CBSE doodle-card concept map (dedupe by concept).

Owner decision (2026-09-30): ~80% of CISCE concepts duplicate CBSE concepts.
Instead of mass-producing 9,430 near-duplicate PNGs, each CISCE node is
semantically matched against the existing CBSE doodle-card corpus
(doodle_content_class{6..12}.json). Same concept -> REUSE the CBSE card;
no CBSE match -> CISCE node gets its own card.

Method (deterministic, no ML, no network):
- document = CBSE: title (x2 weight) + definition;  CISCE: definition
  (both already scrubbed card texts)
- tokens: lowercase alpha runs, len>=3, stopwords dropped, plural-stripped
- tf-idf cosine similarity, sublinear tf, l2 norms; idf from the combined
  corpus; inverted index over CBSE docs so only shared terms are scored
- top-1 CBSE card per CISCE node; score >= THRESHOLD -> mapped (REUSE),
  else "own" (fresh CISCE card). Ties break on (score, cbse node_id).

Outputs (deploy/frontend/public/doodle_cards/ + mirrors):
- cisce_doodle_map.json          { cisce_node_id: "class{N}/{cbse_id}.png" | "own" }
                                 (served file; DoodleCardImage reads it)
- cisce_doodle_reverse.json      { cbse_node_id: [cisce_node_id, ...] }
                                 (bidirectional view + boards tagging input)
- cisce_doodle_map_audit.json    full top-3 + scores + text samples, written
                                 to _cisce_build/ for threshold calibration
"""
import json
import os
import re
import sys
from collections import defaultdict

_HERE = os.path.dirname(os.path.abspath(__file__))
_BACKEND_DIR = os.path.dirname(_HERE)
_DEPLOY_ROOT = os.path.dirname(_BACKEND_DIR)
_PLATFORM_ROOT = os.path.dirname(_DEPLOY_ROOT) if os.path.basename(_DEPLOY_ROOT) == "deploy" else _DEPLOY_ROOT
PUBLIC_DIR = os.path.join(_DEPLOY_ROOT, "frontend", "public", "doodle_cards")
AUDIT_DIR = os.path.join(_PLATFORM_ROOT, "_cisce_build", "cisce_doodle_backup")

THRESHOLD = 0.62          # cosine; calibrated on the score histogram + samples
TITLE_WEIGHT = 2          # title tokens count this many times extra

STOPWORDS = set("""a about above after again against all am an and any are aren as at be
because been before being below between both but by can cannot could couldn did didn do does
doesn doing don down during each few for from further had hadn has hasn have haven having he
her here hers herself him himself his how i if in into is isn it its itself just ll me more
most mustn my myself no nor not now of off on once only or other our ours ourselves out over
own re s same shan she should shouldn so some such t than that the their theirs them
themselves then there these they this those through to too under until up ve very was wasn we
were weren what when where which while who whom why will with won would wouldn y you your
yours yourself yourselves also may many use used using often across within upon among along
since thus hence however although though whereas while like unlike between via per etc
chapter chapters section sections concept concepts overview introduction introduce introduces
introduced student students learn learning lesson lessons topic topics unit units part parts
including include includes basic basics various different several""".split())

_PLURAL_RE = re.compile(r"(ies|es|s)$")

def tokenize(text, df=None):
    """Deterministic token multiset -> dict token->tf. If df given, increments
    document frequency for the combined-corpus idf."""
    toks = re.findall(r"[a-z]+", (text or "").lower())
    counts = defaultdict(int)
    for t in toks:
        if len(t) < 3 or t in STOPWORDS:
            continue
        if len(t) > 4 and t.endswith("ies"):
            t = t[:-3] + "y"
        elif len(t) > 3 and t.endswith("es") and not t.endswith("ses"):
            t = t[:-2]
        elif len(t) > 3 and t.endswith("s") and not t.endswith("ss"):
            t = t[:-1]
        counts[t] += 1
    if df is not None:
        for t in counts:
            df[t] += 1
    return dict(counts)


def tfidf_weights(counts, idf):
    w = {}
    for t, c in counts.items():
        w[t] = (1.0 + _math_log(c)) * idf.get(t, 1.0)
    norm = _math_sqrt(sum(v * v for v in w.values())) or 1.0
    return {t: v / norm for t, v in w.items()}


import math as _math
_math_log = _math.log
_math_sqrt = _math.sqrt


def board_of(node_id):
    if "_icse_" in node_id:
        return "ICSE"
    if "_isc_" in node_id:
        return "ISC"
    return "CBSE"


def load_cards(pattern, classes=range(6, 13)):
    cards = []
    for c in classes:
        p = os.path.join(PUBLIC_DIR, pattern.format(c=c))
        if not os.path.isfile(p):
            continue
        doc = json.load(open(p, encoding="utf-8"))
        cards.extend(doc["cards"])
    return cards


def main():
    threshold = THRESHOLD
    if "--threshold" in sys.argv:
        threshold = float(sys.argv[sys.argv.index("--threshold") + 1])

    cbse_cards = load_cards("doodle_content_class{c}.json")
    cisce_cards = load_cards("doodle_content_cisce_class{c}.json")
    print(f"cbse cards: {len(cbse_cards)} | cisce cards: {len(cisce_cards)}")

    # ---- tokenize + idf over the combined corpus ----
    # FULL card text on both sides: the steps/remember fields carry the
    # teaching vocabulary, which survives paraphrase far better than the
    # one-sentence definition alone (ICSE re-words definitions heavily).
    df = defaultdict(int)

    def card_text(card):
        parts = [card.get("title") or "", card.get("definition") or ""]
        parts += card.get("steps") or []
        parts += card.get("remember") or []
        if card.get("misconception"):
            parts.append(card["misconception"])
        return " ".join(parts)

    cbse_counts = []
    for card in cbse_cards:
        cbse_counts.append(tokenize(card_text(card) + " " + " ".join([card.get("title") or ""] * TITLE_WEIGHT), df))
    cisce_counts = []
    for card in cisce_cards:
        cisce_counts.append(tokenize(card_text(card), df))

    n_docs = len(cbse_cards) + len(cisce_cards)
    idf = {t: _math_log(n_docs / (1 + c)) + 1.0 for t, c in df.items()}

    cbse_vecs = [tfidf_weights(c, idf) for c in cbse_counts]
    cisce_vecs = [tfidf_weights(c, idf) for c in cisce_counts]

    # ---- inverted index over CBSE vectors ----
    inv = defaultdict(list)
    for i, vec in enumerate(cbse_vecs):
        for t in vec:
            inv[t].append(i)

    # ---- score: top-3 CBSE matches per CISCE node ----
    results = []
    for j, qvec in enumerate(cisce_vecs):
        scores = defaultdict(float)
        for t, qw in qvec.items():
            for i in inv.get(t, ()):
                scores[i] += qw * cbse_vecs[i][t]
        top = sorted(scores.items(), key=lambda kv: (-kv[1], cbse_cards[kv[0]]["node_id"]))[:3]
        results.append((
            cisce_cards[j]["node_id"],
            [(cbse_cards[i]["node_id"], s) for i, s in top],
        ))

    # ---- score histogram ----
    hist = defaultdict(int)
    for _, top in results:
        s = top[0][1] if top else 0.0
        band = round(min(s, 0.95) * 20) / 20
        hist[band] += 1

    # ---- map + reverse ----
    forward = {}
    reverse = defaultdict(list)
    matched = 0
    for cid, top in results:
        best_id, best_s = (top[0] if top else ("", 0.0))
        if top and best_s >= threshold:
            cbse_card = next(c for c in cbse_cards if c["node_id"] == best_id)
            forward[cid] = f"class{cbse_card['classLevel']}/{best_id}.png"
            reverse[best_id].append(cid)
            matched += 1
        else:
            forward[cid] = "own"

    os.makedirs(PUBLIC_DIR, exist_ok=True)
    os.makedirs(AUDIT_DIR, exist_ok=True)
    map_doc = {
        "generated_at_iso": __import__("datetime").datetime.now().isoformat(),
        "method": "tf-idf cosine, definition vs title+definition, deterministic",
        "threshold": threshold,
        "matched": matched,
        "own": len(cisce_cards) - matched,
        "map": dict(sorted(forward.items())),
    }
    map_path = os.path.join(PUBLIC_DIR, "cisce_doodle_map.json")
    json.dump(map_doc, open(map_path, "w", encoding="utf-8"),
              ensure_ascii=False, indent=0, sort_keys=False)
    rev_path = os.path.join(PUBLIC_DIR, "cisce_doodle_reverse.json")
    json.dump({"generated_at_iso": map_doc["generated_at_iso"],
               "threshold": threshold,
               "shared_cards": len(reverse),
               "reverse": dict(sorted(reverse.items()))},
              open(rev_path, "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)

    # ---- audit: top-3 + score histogram + band samples ----
    by_id = {c["node_id"]: c for c in cbse_cards}
    cisce_by_id = {c["node_id"]: c for c in cisce_cards}
    top_by_id = dict(results)
    bands = defaultdict(list)
    for cid, top in results:
        s = top[0][1] if top else 0.0
        bands[round(min(s, 0.95) * 20) / 20].append(cid)
    samples = {}
    for band in sorted(bands):
        picks = bands[band][: 12]
        samples[f"{band:.2f}"] = [
            {
                "cisce": cid,
                "cisce_title": (cisce_by_id[cid]["title"] or "")[:90],
                "matches": [
                    {"cbse": mid, "score": round(s, 4),
                     "cbse_title": (by_id[mid]["title"] or "")[:90]}
                    for mid, s in top_by_id[cid]
                ],
            }
            for cid in picks
        ]
    audit = {
        "threshold": threshold,
        "histogram": {f"{k:.2f}": v for k, v in sorted(hist.items())},
        "matched": matched,
        "own": len(cisce_cards) - matched,
        "samples": samples,
    }
    audit_path = os.path.join(AUDIT_DIR, "cisce_doodle_map_audit.json")
    json.dump(audit, open(audit_path, "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)

    print(f"threshold={threshold} matched={matched} own={len(cisce_cards) - matched}")
    print("histogram:", {f"{k:.2f}": v for k, v in sorted(hist.items())})
    print(f"map -> {map_path}")
    print(f"reverse -> {rev_path}")
    print(f"audit -> {audit_path}")


if __name__ == "__main__":
    main()
