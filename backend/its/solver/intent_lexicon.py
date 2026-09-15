"""intent_lexicon.py -- the synonym-to-canonical dictionary.

Canonicalizes natural phrasings into INTENT WORDS before the relation
binder reads the text.  The binder's signal matchers then need only
canonical tokens; every new phrasing is a dictionary entry here (data),
never a code change.

    canonicalize("He took out 30,000 for personal use")
        -> "... He withdrew 30,000 for personal use ..."

Rules:
    - longest synonym phrase wins (apply by descending length)
    - case-insensitive match, canonical replacement keeps position
    - the canonical word is itself in the map (identity entry) so the
      binder can validate coverage
    - keys starting with "_" are metadata markers, never intents
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Dict, List, Tuple

# canonical intent word -> recognized synonyms (checked case-
# insensitively; longest first).  The canonical word itself must appear
# among the synonyms.
INTENT_LEXICON: Dict[str, List[str]] = {
    "withdrew": ["withdrew", "took out", "drawn for personal use",
                 "personal drawings", "drew from the business",
                 "withdrew for personal use"],
    "profit": ["made a profit", "earned a profit", "profit earned",
               "earned a profit", "made profits", "earned income",
               "profit"],
    "closing capital": ["closing capital", "capital at the end",
                        "capital at year end", "capital at the year end",
                        "year-end capital"],
    "opening capital": ["opening capital", "started a business with",
                        "commenced business with", "began business with",
                        "opened the business with"],
    "introduced capital": ["introduced further capital",
                           "introduced capital", "added capital",
                           "additional capital", "brought in capital",
                           "invested further"],
    "EBIT": ["earnings before interest and taxes",
             "earnings before interest and tax", "ebit"],
    "capital employed": ["capital employed"],
    "return on investment": ["return on investment", "roi"],
    "drawings": ["drawings", "drawn during the year"],
}

# --------------------------------------------------------------------------- #
# Provisional tier: machine-adopted intents (adoption.py validated them
# against NCERT/CBSE ground truth) extend the substitution rules at
# import.  Marked provisional so the audit trail knows their tier;
# educator promotion moves them into INTENT_LEXICON proper.
# --------------------------------------------------------------------------- #

_PROVISIONAL_PATH = Path(r"D:\platform\cbse_data\provisional_lexicon.json")

# intent -> True for every provisionally-adopted intent; the canonical
# entries above are hand-authored, these came out of the miner.
_PROVISIONAL_INTENTS: Dict[str, bool] = {}


def _load_provisional() -> Dict[str, List[str]]:
    try:
        data = json.loads(_PROVISIONAL_PATH.read_text())
    except Exception:
        return {}
    out: Dict[str, List[str]] = {}
    for intent, entry in data.get("provisional", {}).items():
        # multi-word phrases only: a mined single word ("charged",
        # "operations") would canonically rewrite unrelated text
        out[intent] = [p for p in entry.get("phrases", [])
                       if len(p) > 5 and " " in p]
    return out


# extend the lexicon BEFORE compiling the substitution rules, so
# canonicalize() recognizes the new phrasings with no code change
for _intent, _phrases in _load_provisional().items():
    if _phrases:
        INTENT_LEXICON.setdefault(_intent, []).extend(_phrases)
        _PROVISIONAL_INTENTS[_intent] = True

# marker key: every intent whose phrases came from the provisional
# lexicon (adoption-validated, not hand-authored).  _build() skips
# underscore keys so this never becomes a substitution rule.
INTENT_LEXICON["_provisional"] = sorted(_PROVISIONAL_INTENTS)


def _build() -> List[Tuple[re.Pattern, str]]:
    """Compile (pattern, canonical) pairs, longest synonyms first.

    Keys starting with "_" are metadata markers (e.g. "_provisional"),
    not intents -- skipped."""
    pairs: List[Tuple[str, str]] = []
    for canonical, synonyms in INTENT_LEXICON.items():
        if canonical.startswith("_"):
            continue
        for syn in synonyms:
            pairs.append((syn, canonical))
    pairs.sort(key=lambda p: -len(p[0]))
    out = []
    for syn, canonical in pairs:
        pat = re.compile(re.escape(syn), re.I)
        out.append((pat, canonical))
    return out


_RULES = _build()


def canonicalize(text: str) -> Tuple[str, List[Tuple[str, str]]]:
    """Return (canonical_text, substitutions[(from, to)])."""
    substitutions: List[Tuple[str, str]] = []
    out = text
    for pat, canonical in _RULES:
        m = pat.search(out)
        if m:
            substitutions.append((m.group(0), canonical))
            out = pat.sub(canonical, out)
    return out, substitutions
