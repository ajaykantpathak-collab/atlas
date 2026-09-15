"""annotate_catalog_slots.py — add the computational node facet to a
catalog: declared slot vocabularies, output names, and feed edges.

This is what turns a knowledge catalog into a solvable node: instead
of the binder guessing which English words map to which role, the
concept itself declares every way its inputs can be phrased and every
symbol its formula uses.

    slots:   {role: {"names": [...English phrases...],
                     "symbols": [...formula letters...],
                     "dimension": "money"}}
    outputs: ["perimeter", ...]     # names the ask can use
    feeds:   ["fegp.6.1.8"]         # outputs feed those concepts' inputs

Idempotent: existing fields are merged, never overwritten.

Usage:
    python -B backend/tools/annotate_catalog_slots.py <catalog.json>
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

# ----------------------------------------------------------------- #
# declared vocabularies — the node's own lexicon
# ----------------------------------------------------------------- #

COMMON_LENGTH = ["length", "long side", "longer side", "side length",
                 "how long"]
COMMON_WIDTH = ["breadth", "width", "wide", "shorter side", "broad"]
COMMON_SIDE = ["side", "each side", "one side", "side length",
               "sides of length", "edge"]
COMMON_RATE = ["rate", "per metre", "per meter", "per unit",
               "cost per", "at rs", "costs rs"]

# concept-id suffix -> node facet.  Keyed by the catalog's own ids so
# the same table drives any chapter once filled in.
NODES: dict = {
    # ---- fegp106 Perimeter and Area (Ganita Prakash ch.6) ----------
    # vocabulary is BOOK-SOURCED: every name below appears verbatim in
    # fegp106.txt — 'lace required', 'tape', 'rounds of rope',
    # 'boundary', 'sq m', 'not carpeted', 'flower beds', 'sidelengths'
    "fegp.6.1.1": {
        "book_ref": "fegp106.txt §6.1",
        "slots": {"sides": {"names": ["sides", "side lengths",
                                      "lengths of its sides",
                                      "sidelengths", "the sides",
                                      "lengths 4 cm"],
                            "symbols": ["sides", "sum_of_sides"],
                            "dimension": "length"}},
        "outputs": ["perimeter", "distance around", "boundary",
                    "outer boundary", "border", "length of wire",
                    "length of string", "piece of wire", "rope",
                    "fence needed", "go around"],
    },
    "fegp.6.1.2": {
        "book_ref": "fegp106.txt §6.1",
        "slots": {"length": {"names": COMMON_LENGTH,
                             "symbols": ["l"], "dimension": "length"},
                  "breadth": {"names": COMMON_WIDTH,
                              "symbols": ["b", "w"],
                              "dimension": "length"}},
        "outputs": ["perimeter", "boundary", "border", "fence",
                    "fencing", "wire needed", "length of the lace",
                    "lace required", "length of the tape",
                    "tape required", "distance around"],
        "feeds": ["fegp.6.1.8"],
    },
    "fegp.6.1.3": {
        "book_ref": "fegp106.txt §6.1",
        "slots": {"side": {"names": COMMON_SIDE + ["side of a length"],
                           "symbols": ["s", "a"],
                           "dimension": "length"}},
        "outputs": ["perimeter", "boundary", "border",
                    "tape required", "lace required"],
        "feeds": ["fegp.6.1.8"],
    },
    "fegp.6.1.4": {
        "book_ref": "fegp106.txt §6.1",
        "slots": {"side_a": {"names": ["first side", "one side",
                                      "a side"], "symbols": ["a"],
                             "dimension": "length"},
                  "side_b": {"names": ["second side", "another side"],
                             "symbols": ["b"], "dimension": "length"},
                  "side_c": {"names": ["third side", "other side",
                                      "remaining side",
                                      "third side of a triangle"],
                             "symbols": ["c"], "dimension": "length"}},
        "outputs": ["perimeter", "boundary"],
    },
    "fegp.6.1.5": {
        "book_ref": "fegp106.txt §6.1",
        "slots": {"side": {"names": COMMON_SIDE, "symbols": ["s", "a"],
                           "dimension": "length"}},
        "outputs": ["perimeter", "boundary", "border"],
    },
    "fegp.6.1.6": {
        "book_ref": "fegp106.txt §6.1",
        "slots": {"number_of_sides": {"names": ["number of sides",
                                                "n sides"],
                                      "symbols": ["n"],
                                      "dimension": "dimensionless"},
                  "side_length": {"names": COMMON_SIDE,
                                  "symbols": ["s", "l"],
                                  "dimension": "length"}},
        "outputs": ["perimeter"],
    },
    "fegp.6.1.7": {
        "book_ref": "fegp106.txt §6.1",
        "slots": {"rounds": {"names": ["rounds", "rounds of rope",
                                       "laps", "times",
                                       "number of rounds"],
                             "symbols": ["r", "n"],
                             "dimension": "dimensionless"},
                  "side": {"names": COMMON_SIDE, "symbols": ["s"],
                           "dimension": "length"}},
        "outputs": ["total_distance", "distance covered",
                    "distance", "total distance", "how far",
                    "distance usha", "ran"],
    },
    "fegp.6.1.8": {
        "book_ref": "fegp106.txt §6.1",
        "slots": {"perimeter": {"names": ["perimeter", "boundary",
                                          "border", "fence",
                                          "length of fence"],
                                "symbols": ["p"],
                                "dimension": "length"},
                  "rate": {"names": COMMON_RATE + ["per sq m",
                                                 "per square metre",
                                                 "per hundred sq m",
                                                 "fence costs"],
                           "symbols": ["r"], "dimension": "money"}},
        "outputs": ["total_cost", "cost", "cost of fencing",
                    "cost of tiling", "price", "amount",
                    "cost of the fence"],
    },
    "fegp.6.2.1": {
        "book_ref": "fegp106.txt §6.2",
        "slots": {"length": {"names": COMMON_LENGTH + ["long"],
                             "symbols": ["l"], "dimension": "length"},
                  "width": {"names": COMMON_WIDTH,
                            "symbols": ["w", "b"],
                            "dimension": "length"}},
        "outputs": ["area", "space", "floor area", "surface",
                    "sq m", "area of the floor", "area of the garden",
                    "area of the whole land"],
        "feeds": ["fegp.6.2.3"],
    },
    "fegp.6.2.2": {
        "book_ref": "fegp106.txt §6.2",
        "slots": {"side": {"names": COMMON_SIDE, "symbols": ["s", "a"],
                           "dimension": "length"}},
        "outputs": ["area", "space", "area of the carpet"],
        "feeds": ["fegp.6.2.3"],
    },
    "fegp.6.2.3": {
        "book_ref": "fegp106.txt §6.2",
        "slots": {"total_area": {"names": ["total area", "floor",
                                           "whole area", "garden",
                                           "plot", "land",
                                           "whole land", "room"],
                                 "symbols": ["t", "outer"],
                                 "dimension": "area"},
                  "inner_area": {"names": ["inner area", "carpet",
                                           "carpeted", "covered",
                                           "flower bed", "flower beds",
                                           "bed", "dug"],
                                 "symbols": ["i", "inner"],
                                 "dimension": "area"}},
        "outputs": ["remaining_area", "remaining area", "area left",
                    "not carpeted", "floor not carpeted",
                    "uncovered", "available area", "area available",
                    "free area", "area now available"],
    },
    "fegp.6.3.1": {
        "book_ref": "fegp106.txt §6.3",
        "slots": {"base": {"names": ["base", "base length"],
                           "symbols": ["b"], "dimension": "length"},
                  "height": {"names": ["height", "altitude",
                                       "perpendicular height",
                                       "tall", "high"],
                             "symbols": ["h"], "dimension": "length"}},
        "outputs": ["area"],
    },
    # ---- missing-but-real question types mined from fegp106 -------
    # Q10 'cost of tiling ... at the rate of Rs 8 per hundred sq m'
    "fegp.6.2.4": {
        "book_ref": "fegp106.txt §6.2",
        "concept": {"id": "fegp.6.2.4",
                    "title": "Cost of Tiling or Covering an Area",
                    "section": "6.2",
                    "definition": "Cost of covering an area = area "
                                  "x rate per unit area.",
                    "formula": "total_cost = area * rate_per_area",
                    "solution_type": "compute",
                    "solution_steps": [
                        {"action": "compute area = length * width",
                         "explain": "area to be covered"},
                        {"action": "multiply by rate per unit area",
                         "explain": "total_cost = area * rate"}],
                    "question_patterns": ["cost of tiling",
                                          "cost of covering",
                                          "cost of paving",
                                          "rate per square metre"]},
        "slots": {"area": {"names": ["area", "sq m", "plot", "floor",
                                     "land"],
                           "symbols": ["a"], "dimension": "area"},
                  "rate_per_area": {"names": ["per sq m", "per square",
                                              "per hundred",
                                              "per thousand", "rate",
                                              "costs rs"],
                                    "symbols": ["r"],
                                    "dimension": "money"}},
        "outputs": ["total_cost", "cost", "cost of tiling",
                    "cost of covering", "price"],
        "feeds": ["fegp.6.2.1"],
    },
    # Q11 'each tree requires 25 sq m' -> count = area / each
    "fegp.6.2.5": {
        "book_ref": "fegp106.txt §6.2",
        "concept": {"id": "fegp.6.2.5",
                    "title": "Number of Items Fitting in an Area",
                    "section": "6.2",
                    "definition": "How many units of a fixed area fit "
                                  "into a total area.",
                    "formula": "count = total_area / each_area",
                    "solution_type": "compute",
                    "solution_steps": [
                        {"action": "compute total_area",
                         "explain": "the whole region"},
                        {"action": "divide by area each needs",
                         "explain": "count = total / each"}],
                    "question_patterns": ["each requires",
                                          "per tree", "how many",
                                          "can be planted"]},
        "slots": {"total_area": {"names": ["total area", "grove",
                                           "plot", "land", "garden"],
                                 "symbols": ["t"], "dimension": "area"},
                  "each_area": {"names": ["each", "requires",
                                          "per tree", "per item",
                                          "needs"],
                                "symbols": ["e"], "dimension": "area"}},
        "outputs": ["count", "number", "number of trees",
                    "how many", "maximum number"],
    },
}


def annotate(path: Path) -> int:
    cat = json.loads(path.read_text(encoding="utf-8"))
    concepts = cat.setdefault("concepts", [])
    have = {str(c.get("id")) for c in concepts}
    # insert declared-but-missing concepts first
    for cid, spec in NODES.items():
        body = spec.get("concept")
        if body and cid not in have:
            concepts.append(dict(body))
            have.add(cid)
    n = 0
    for c in cat.get("concepts", []):
        spec = NODES.get(str(c.get("id", "")))
        if not spec:
            continue
        if spec.get("book_ref") and not c.get("book_ref"):
            c["book_ref"] = spec["book_ref"]
        slots = c.setdefault("slots", {})
        for role, decl in spec.get("slots", {}).items():
            cur = slots.setdefault(role, {"names": [], "symbols": [],
                                          "dimension": ""})
            for k in ("names", "symbols"):
                cur[k] = sorted(set(cur.get(k, [])) | set(decl[k]))
            if not cur.get("dimension"):
                cur["dimension"] = decl.get("dimension", "")
        outs = c.setdefault("outputs", [])
        for o in spec.get("outputs", []):
            if o not in outs:
                outs.append(o)
        feeds = c.setdefault("feeds", [])
        for f in spec.get("feeds", []):
            if f not in feeds:
                feeds.append(f)
        n += 1
    path.write_text(json.dumps(cat, indent=1, ensure_ascii=False),
                    encoding="utf-8")
    return n


if __name__ == "__main__":
    p = Path(sys.argv[1])
    print(f"annotated {annotate(p)} concepts in {p.name}")
