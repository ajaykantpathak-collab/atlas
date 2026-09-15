"""build_provisional_lexicon.py -- adopt mined dictionary intents into
a PROVISIONAL lexicon tier, validated against external ground truth.

Pipeline:
    intent_dictionary.json (MiniLM-mined, frequency-ranked)
      -> adoption engine (NCERT grounding on claim terms)
      -> PROVISIONAL tier: intents whose phrases ground in official
         CBSE/NCERT sources
      -> cbse_data/provisional_lexicon.json

intent_lexicon.py loads this at import: provisional synonyms extend
the canonical rules, marked so the audit trail knows their tier.
"""

from __future__ import annotations

import json
import re
import time
from pathlib import Path
from typing import Dict, List

from backend.its.solver.adoption import adopt

DICT_PATH = Path(r"D:\platform\cbse_data\intent_dictionary.json")
OUT = Path(r"D:\platform\cbse_data\provisional_lexicon.json")

# grounding sources per subject family (NCERT/CBSE official text)
_TEXT_CACHE = Path(r"D:\node_generator\ncert-mcp\data\processed\text_cache")
_GROUNDING_SOURCES = [
    str(_TEXT_CACHE / "CBSE_Accountancy_Class12_2026-27.txt"),
    str(_TEXT_CACHE / "CBSE_Economics_Class12_2026-27.txt"),
    str(_TEXT_CACHE / "CBSE_Business Studies_Class12_2026-27.txt"),
    str(_TEXT_CACHE / "CBSE_Chemistry_Class12_2026-27.txt"),
    str(_TEXT_CACHE / "CBSE_Biology_Class12_2026-27.txt"),
    str(_TEXT_CACHE / "CBSE_Applied Mathematics_Class12_2026-27.txt"),
]

_STOP = set("""a an the of and or to in for at by with from on is are was
were it its as during year years per each all any find what which how
much many""". split())


def claim_terms(phrase: str) -> List[str]:
    return [w for w in re.findall(r"[a-z]{3,}", phrase.lower())
            if w not in _STOP]


def main() -> None:
    import logging
    import warnings
    logging.disable(logging.CRITICAL)
    warnings.filterwarnings("ignore")

    d = json.loads(DICT_PATH.read_text())
    seeded = d.get("seeded", {})
    discovered = d.get("discovered", [])
    provisional: Dict[str, Dict] = {}
    canonical: Dict[str, Dict] = {}
    rejected: List[Dict] = []

    def _adopt(intent: str, data: Dict, source: str) -> None:
        if data["n_sentences"] < 2:
            rejected.append({"intent": intent,
                             "why": "thin corpus (<2 sentences)"})
            return
        top_phrases = [p["phrase"] for p in data["top_phrases"][:5]]
        terms = claim_terms(" ".join(top_phrases)) or [intent]
        verdict = adopt({"kind": "intent_entry",
                         "question_text": None,
                         "claim_terms": terms,
                         "proposed_answer": None},
                        ncert_sources=_GROUNDING_SOURCES)
        entry = {
            "intent": intent,
            "phrases": top_phrases,
            "tier": verdict["tier"],
            "score": round(verdict["score"], 3),
            "evidence": verdict["evidence"],
            "n_sentences": data["n_sentences"],
            "source": source,
            "adopted_at": time.strftime("%Y-%m-%d"),
        }
        if verdict["tier"] == "CANONICAL":
            canonical[intent] = entry
        elif verdict["tier"] == "PROVISIONAL":
            provisional[intent] = entry
        else:
            rejected.append({"intent": intent,
                             "why": f"score {verdict['score']:.2f} < 0.25: "
                                    f"{verdict['evidence']}"})

    for intent, data in sorted(seeded.items(),
                               key=lambda kv: -kv[1]["n_sentences"]):
        _adopt(intent, data, "seeded")

    # discovered clusters: MiniLM proposals become candidate intents with
    # the same external validation; only sizable clusters (same 15+
    # threshold the miner uses) are considered.  Deterministic quality
    # gates: an intent name must be a multi-token operative phrase, and
    # exam-paper furniture never becomes an intent.
    _FURNITURE = re.compile(
        r"question\s+numbe|sample\s+paper|practice\s+questions"
        r"|section\s+[a-e]\b|subject\s+code|academic\s+session"
        r"|class\s+xii|general\s+instructions", re.I)
    for cl in discovered:
        if cl.get("n_sentences", 0) < 15:
            continue
        raw = cl.get("proposed_intent", "")
        toks = [t for t in re.findall(r"[a-z]{3,}", raw.lower())
                if t not in _STOP]
        why = None
        if len(toks) < 2:
            why = "single/generic token, not an operative phrase"
        elif re.search(r"\b[a-z]\b|\b[a-z]{2}\b", raw.lower()):
            why = "contains single/two-letter token (marking-part furniture)"
        elif _FURNITURE.search(raw):
            why = "exam-paper furniture"
        if why:
            rejected.append({"intent": raw, "why": why})
            continue
        name = re.sub(r"[^a-z0-9]+", "_", raw.lower()).strip("_")
        if not name or name in seeded or name in provisional \
                or name in canonical:
            continue
        _adopt(name, cl, "discovered")

    adopted_all = {**provisional, **canonical}
    payload = {
        "generated": time.strftime("%Y-%m-%d"),
        "provisional": provisional,
        "canonical": canonical,
        "rejected": rejected,
        "counts": {
            "provisional": len(provisional),
            "canonical": len(canonical),
            "rejected": len(rejected),
            "adopted_total": len(adopted_all),
            "adopted_seeded": sum(1 for e in adopted_all.values()
                                  if e.get("source") == "seeded"),
            "adopted_discovered": sum(1 for e in adopted_all.values()
                                      if e.get("source") == "discovered"),
        },
    }
    OUT.write_text(json.dumps(payload, indent=1))
    print(json.dumps(payload["counts"], indent=1))
    print(f"saved: {OUT}")


if __name__ == "__main__":
    main()
