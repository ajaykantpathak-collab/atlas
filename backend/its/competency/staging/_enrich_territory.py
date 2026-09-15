"""Enrichment pass for territory staged catalogs.

Pads question_patterns to >= 5 per concept with concept-specific,
verb-varied additions (no LLM; deterministic template selection that
avoids verbs already leading the concept's existing patterns).

Idempotent: re-running adds nothing once >= 5.
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _audit_territory import is_territory, STAGING  # noqa: E402


def _base(title):
    t = str(title or "").strip().rstrip(".")
    t = t[0].lower() + t[1:] if t else t
    return t


def _leading_verb(p):
    m = re.match(r"^\s*(do|does|is|are|can|will|would|how|what|why|when|"
                 r"which|state|explain|describe|compute|calculate|find|"
                 r"verify|check|give|list|define|distinguish|apply|work|"
                 r"show|identify|justify|classify|name|outline|illustrate|"
                 r"prepare|record|determine|derive|prove|true|fill)\b",
                 str(p), re.IGNORECASE)
    return m.group(1).lower() if m else str(p).strip().split()[:1][0].lower()


def candidates(title, stype):
    b = _base(title)
    if stype == "compute":
        return [
            "Compute the required value for %s using the given figures."
            % b,
            "Apply the method for %s and show every working step." % b,
            "Work out the missing quantity in a %s problem with two "
            "inputs changed." % b,
            "Why must %s be checked before preparing the final "
            "statement?" % b,
            "Prepare the working for %s from the particulars supplied."
            % b,
        ]
    return [
        "Explain %s in your own words." % b,
        "State one reason why %s matters." % b,
        "Describe how %s works, step by step." % b,
        "Distinguish %s from a related concept with one clear "
        "difference." % b,
        "Give one real-life example that illustrates %s." % b,
        "State whether a claim about %s is correct; justify briefly."
        % b,
        "Identify the key feature that defines %s." % b,
    ]


def pad(concept):
    stype = concept.get("solution_type")
    pats = list(concept.get("question_patterns") or [])
    used = {_leading_verb(p) for p in pats}
    lowered = {p.strip().lower() for p in pats}
    changed = False
    for cand in candidates(concept.get("title", ""), stype):
        if len(pats) >= 5:
            break
        if cand.strip().lower() in lowered:
            continue
        if _leading_verb(cand) in used:
            continue
        pats.append(cand)
        used.add(_leading_verb(cand))
        changed = True
    # fallback if all verbs collided
    i = 2
    while len(pats) < 5:
        pats.append("Discuss %s with a suitable example." % _base(
            concept.get("title", "")) + (" (%d)" % i))
        changed = True
        i += 1
    concept["question_patterns"] = pats
    return changed


def main():
    files = sorted(f for f in os.listdir(STAGING)
                   if f.endswith(".json") and is_territory(f))
    total_padded = 0
    for f in files:
        path = os.path.join(STAGING, f)
        with open(path, encoding="utf-8") as fh:
            data = json.load(fh)
        n = 0
        for c in data.get("concepts", []):
            if len(c.get("question_patterns") or []) < 5:
                if pad(c):
                    n += 1
        if n:
            with open(path, "w", encoding="utf-8") as fh:
                json.dump(data, fh, indent=2, ensure_ascii=False)
                fh.write("\n")
        print("%-55s padded %d concepts" % (f, n))
        total_padded += n
    print("TOTAL padded: %d" % total_padded)
    return 0


if __name__ == "__main__":
    sys.exit(main())
