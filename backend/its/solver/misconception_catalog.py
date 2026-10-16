"""misconception_catalog.py -- Catalog of common K-12 misconceptions.

Maps frequent student errors to subjects, class bands and curriculum graph
nodes, and provides remediation text plus deterministic isolating-question
specs for follow-up practice. Pre-populated with 23 well-documented
misconceptions across maths, physics, chemistry, biology, geography,
history/social science, economics, english and hindi.

Everything here is deterministic -- no LLM calls. Detector patterns are raw
regex strings matched against student error text.

Usage::

    from backend.its.solver.misconception_catalog import MisconceptionCatalog

    cat = MisconceptionCatalog()
    entry = cat.get_by_error_type("sign_flip")
    followups = cat.suggest_followup("sign_flip", count=3)
"""

from __future__ import annotations

import copy
import json
import logging
import os
import re
from typing import Any, Dict, List, Optional

logger = logging.getLogger(__name__)

CATALOG_FORMAT = "misconception_catalog_v1"

# --------------------------------------------------------------------------- #
# Built-in catalog: 23 common K-12 misconceptions
# --------------------------------------------------------------------------- #

DEFAULT_MISCONCEPTIONS: List[Dict[str, Any]] = [
    {
        "id": "sign_flip",
        "description": "Student flips a sign during algebraic manipulation",
        "subjects": ["maths", "physics"],
        "classes": [8, 9, 10, 11, 12],
        "detector_pattern": r"negative.*positive|sign.*error|flipped the sign",
        "remediation": "Practice with sign-focused drills",
        "isolating_questions": 3,
    },
    {
        "id": "percent_base_error",
        "description": "Student applies percentage to the wrong base (SP instead of CP)",
        "subjects": ["maths", "accountancy"],
        "classes": [7, 8, 9, 10],
        "detector_pattern": r"percent.*sp|percentage.*wrong base|profit.*loss.*confus",
        "remediation": (
            "Drills that first ask the student to name the base explicitly "
            "before computing any percentage"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "unit_confusion",
        "description": "Student confuses units (km/h vs m/s, cm vs m)",
        "subjects": ["physics", "maths"],
        "classes": [6, 7, 8, 9, 10, 11],
        "detector_pattern": r"km/h.*m/s|cm.*m\b|unit.*mix|wrong unit",
        "remediation": (
            "Dimensional analysis practice converting between unit systems "
            "before solving"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "formula_selection",
        "description": "Student selects the wrong formula for the problem type",
        "subjects": ["maths", "physics", "chemistry", "economics", "accountancy"],
        "classes": [9, 10, 11, 12],
        "detector_pattern": r"wrong formula|used .* formula|incorrect formula",
        "remediation": (
            "Sorting exercises that classify problems by type before any "
            "formula is chosen"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "order_of_operations",
        "description": "Student ignores BODMAS/PEMDAS order",
        "subjects": ["maths"],
        "classes": [5, 6, 7, 8],
        "detector_pattern": r"bodmas|pemdas|order of operations|added before multiply",
        "remediation": (
            "Step-sequencing drills that rewrite the expression one "
            "operation at a time"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "fraction_inversion",
        "description": "Student inverts the wrong fraction when dividing",
        "subjects": ["maths"],
        "classes": [6, 7, 8],
        "detector_pattern": r"invert.*fraction|flip.*divis|reciprocal.*wrong",
        "remediation": (
            "Keep-change-flip drills that mark which fraction is the divisor "
            "before inverting"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "factorisation_incomplete",
        "description": "Student stops factoring before fully reduced",
        "subjects": ["maths"],
        "classes": [9, 10],
        "detector_pattern": r"factor.*further|not fully factor|incomplete factor",
        "remediation": (
            "Checks that re-test every factor for further factorisation "
            "until fully reduced"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "index_law_confusion",
        "description": "Student confuses index laws (a^m x a^n = a^(m+n) vs a^(mn))",
        "subjects": ["maths"],
        "classes": [9, 10, 11],
        "detector_pattern": r"index law|laws of indices|a\^m.*a\^n|power.*multipl.*add",
        "remediation": (
            "Side-by-side drills contrasting a^m * a^n with (a^m)^n using "
            "numerical checks"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "trig_ratio_swap",
        "description": "Student swaps sine and cosine",
        "subjects": ["maths"],
        "classes": [9, 10, 11],
        "detector_pattern": r"sine.*cosine|sin.*cos.*swap|opposite.*adjacent.*wrong",
        "remediation": (
            "Labelled-triangle drills that write SOH-CAH-TOA next to each "
            "ratio before substituting"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "geometry_theorem_misapply",
        "description": "Student applies a theorem in the wrong configuration",
        "subjects": ["geometry"],
        "classes": [9, 10, 11],
        "detector_pattern": r"theorem.*wrong|misappl.*theorem|wrong configuration",
        "remediation": (
            "Configuration-sorting drills that match each diagram to the "
            "theorem that actually applies"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "direction_bias",
        "description": "Student assumes current flows from positive to negative in circuits",
        "subjects": ["physics"],
        "classes": [10, 11, 12],
        "detector_pattern": r"current.*positive.*negative|conventional current|electron flow",
        "remediation": (
            "Circuit drills that define conventional current versus electron "
            "flow before any analysis"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "energy_conservation_gap",
        "description": "Student ignores energy conservation in systems",
        "subjects": ["physics"],
        "classes": [11, 12],
        "detector_pattern": r"energy.*not conserved|ignor.*energy|energy.*disappear",
        "remediation": (
            "Energy-bookkeeping practice that accounts for every energy store "
            "between start and end states"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "mole_concept_error",
        "description": "Student confuses moles with mass or volume",
        "subjects": ["chemistry"],
        "classes": [11, 12],
        "detector_pattern": r"mole.*mass|moles.*volume|mole.*confus",
        "remediation": (
            "Conversion-ladder drills separating mole, mass and volume with "
            "explicit formulas at each rung"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "equilibrium_direction",
        "description": "Student misidentifies which direction equilibrium shifts",
        "subjects": ["chemistry"],
        "classes": [11, 12],
        "detector_pattern": r"equilibrium.*shift|le chatelier|favo?urs the .* reaction",
        "remediation": (
            "Prediction-verification drills applying Le Chatelier's principle "
            "to one stress at a time"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "genetics_dominance",
        "description": "Student assumes dominant trait is always most common in population",
        "subjects": ["biology"],
        "classes": [10, 11, 12],
        "detector_pattern": r"dominant.*common|dominant.*frequency|most.*dominant",
        "remediation": (
            "Population-frequency practice contrasting dominance with allele "
            "frequency using worked Punnett squares"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "evolution_ladder",
        "description": "Student thinks evolution is a ladder with humans at the top",
        "subjects": ["biology"],
        "classes": [10, 11, 12],
        "detector_pattern": r"ladder|humans.*top|evolution.*progress|higher.*evolved",
        "remediation": (
            "Tree-thinking exercises that replace ladder diagrams with "
            "branching cladograms"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "cause_effect_swap",
        "description": "Student swaps cause and effect in historical/scientific explanations",
        "subjects": ["social_science", "history"],
        "classes": [6, 7, 8, 9, 10, 11, 12],
        "detector_pattern": r"cause.*effect|effect.*cause|because of the result",
        "remediation": (
            "Cause-effect mapping drills that draw the arrows before writing "
            "the explanation"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "map_scale_error",
        "description": "Student misreads map scale (thinks larger scale means larger area)",
        "subjects": ["geography"],
        "classes": [6, 7, 8, 9, 10],
        "detector_pattern": r"map scale|larger scale|representative fraction|scale.*bigger.*area",
        "remediation": (
            "Scale-conversion practice computing actual distances from "
            "representative fractions"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "climate_weather_confusion",
        "description": "Student confuses climate and weather",
        "subjects": ["geography", "social_science"],
        "classes": [6, 7, 8, 9],
        "detector_pattern": r"climate.*weather|weather.*climate|today.*climate",
        "remediation": (
            "Sorting drills classifying statements as long-term averages or "
            "daily conditions"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "supply_demand_curve",
        "description": "Student draws supply curve with wrong slope direction",
        "subjects": ["economics"],
        "classes": [11, 12],
        "detector_pattern": r"supply curve.*slope|upward.*demand|downward.*supply|slope.*wrong.*direction",
        "remediation": (
            "Curve-sketching drills that tabulate price-quantity pairs before "
            "plotting the curve"
        ),
        "isolating_questions": 3,
    },
    # LOOP-FIXER wave (2026-10-08): language grammar families — the
    # socratic catalog had ZERO english/hindi entries at any class while
    # the deterministic grammar lanes (english_families.ENGLISH_LANG_SPECS
    # / hindi_families.HINDI_LANG_SPECS: LANG_ENG_TENSE, LANG_HI_SANDHI,
    # LANG_HI_KARAK -- structure_families_lang.py dissolved 2026-10-10) already serve those
    # subjects. One misconception family per high-traffic grammar lane.
    {
        "id": "english_tense_shift",
        "description": "Student shifts the verb to the wrong tense — the time marker and the verb form disagree",
        "subjects": ["english"],
        "classes": [6, 7, 8, 9, 10, 11, 12],
        "detector_pattern": r"wrong tense|tense.*(shift|error|confus)|helping verb.*wrong|past.*present.*confus",
        "remediation": (
            "Time-line drills: mark the time adverb first, then choose the "
            "verb form that matches it"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "hindi_sandhi_blend",
        "description": "Student joins a sandhi word letter-by-letter instead of fusing the vowel sounds",
        "subjects": ["hindi"],
        "classes": [6, 7, 8, 9, 10, 11, 12],
        "detector_pattern": r"\u0938\u0902\u0927\u093f.*(\u0917\u0932\u0924|wrong)|sandhi.*(wrong|error)|\u0905\u0915\u094d\u0937\u0930.*\u091c\u094b\u0921\u093c",
        "remediation": (
            "Junction-sound drills: say the two word-ends aloud, then write "
            "the fused sound the ear actually hears"
        ),
        "isolating_questions": 3,
    },
    {
        "id": "hindi_karak_mislabel",
        "description": "Student labels the wrong kaarak — the postposition and the verb relation are misread",
        "subjects": ["hindi"],
        "classes": [6, 7, 8, 9, 10, 11, 12],
        "detector_pattern": r"\u0915\u093e\u0930\u0915.*(\u0917\u0932\u0924|wrong)|karak.*(wrong|error)|\u092a\u0930\u0938\u0930\u094d\u0917.*confus",
        "remediation": (
            "Postposition drills: underline the parsarg before the noun, then "
            "name the kaarak the verb relation demands"
        ),
        "isolating_questions": 3,
    },
]

_SUBJECT_ALIASES = {
    "math": "maths",
    "mathematics": "maths",
    "maths": "maths",
}


def _normalize_subject(subject: str) -> str:
    s = re.sub(r"[\s\-]+", "_", str(subject).strip().lower())
    s = re.sub(r"_+", "_", s).strip("_")
    return _SUBJECT_ALIASES.get(s, s)


def _normalize_error_type(error_type: str) -> str:
    return re.sub(r"[\s\-]+", "_", str(error_type).strip().lower())


def _to_int(value: Any) -> Optional[int]:
    if isinstance(value, bool):
        return None
    if isinstance(value, int):
        return value
    m = re.search(r"\d+", str(value))
    return int(m.group()) if m else None


# --------------------------------------------------------------------------- #
# MisconceptionCatalog
# --------------------------------------------------------------------------- #

class MisconceptionCatalog:
    """Catalog of misconceptions with remediation and isolating questions."""

    def __init__(self, entries: Optional[List[Dict[str, Any]]] = None) -> None:
        self._entries: Dict[str, Dict[str, Any]] = {}
        source = DEFAULT_MISCONCEPTIONS if entries is None else entries
        for entry in source:
            self._add(entry)

    # -- construction helpers ------------------------------------------------ #

    def _add(self, entry: Dict[str, Any]) -> None:
        mid = _normalize_error_type(entry["id"])
        if not mid:
            raise ValueError("misconception entry requires a non-empty 'id'")
        record = {
            "id": mid,
            "description": str(entry.get("description", "")),
            "subjects": [_normalize_subject(s) for s in (entry.get("subjects") or [])],
            "classes": sorted(
                {_to_int(c) for c in (entry.get("classes") or []) if _to_int(c) is not None}
            ),
            "detector_pattern": str(entry.get("detector_pattern", "")),
            "remediation": str(entry.get("remediation", "")),
            "isolating_questions": int(entry.get("isolating_questions", 3)),
            "linked_nodes": [str(n) for n in (entry.get("linked_nodes") or [])],
        }
        self._entries[mid] = record

    # -- persistence ---------------------------------------------------------- #

    def load(self, path: Optional[str] = None) -> "MisconceptionCatalog":
        """Reload the catalog. With ``path`` read entries from JSON; without,
        reset to the built-in 23-entry catalog. Returns self."""
        if path is None:
            self._entries = {}
            for entry in DEFAULT_MISCONCEPTIONS:
                self._add(entry)
            return self
        with open(path, "r", encoding="utf-8") as fh:
            payload = json.load(fh)
        if payload.get("format") != CATALOG_FORMAT:
            raise ValueError(
                "not a %s payload: %r" % (CATALOG_FORMAT, payload.get("format"))
            )
        self._entries = {}
        for entry in payload.get("entries", []):
            self._add(entry)
        return self

    def save(self, path: str) -> None:
        """Persist the catalog to JSON."""
        payload = {
            "format": CATALOG_FORMAT,
            "entry_count": len(self._entries),
            "entries": [copy.deepcopy(self._entries[k]) for k in sorted(self._entries)],
        }
        directory = os.path.dirname(os.path.abspath(path))
        if directory:
            os.makedirs(directory, exist_ok=True)
        with open(path, "w", encoding="utf-8") as fh:
            json.dump(payload, fh, ensure_ascii=True, indent=2)

    # -- queries --------------------------------------------------------------- #

    def entries(self) -> List[Dict[str, Any]]:
        """All entries as copies, sorted by id."""
        return [copy.deepcopy(self._entries[k]) for k in sorted(self._entries)]

    def get_by_error_type(self, error_type: str) -> Optional[Dict[str, Any]]:
        """Find one misconception by error type (or None)."""
        key = _normalize_error_type(error_type)
        entry = self._entries.get(key)
        if entry:
            return copy.deepcopy(entry)
        # Tolerate spaces in place of underscores in the query.
        for candidate in self._entries.values():
            if candidate["id"].replace("_", " ") == str(error_type).strip().lower():
                return copy.deepcopy(candidate)
        return None

    def get_by_subject(self, subject: str) -> List[Dict[str, Any]]:
        """All misconceptions that apply to a subject."""
        target = _normalize_subject(subject)
        return [
            copy.deepcopy(e)
            for e in (self._entries[k] for k in sorted(self._entries))
            if target in e["subjects"]
        ]

    def get_by_class(self, class_level: int) -> List[Dict[str, Any]]:
        """All misconceptions that apply to a class level."""
        level = _to_int(class_level)
        return [
            copy.deepcopy(e)
            for e in (self._entries[k] for k in sorted(self._entries))
            if level is not None and level in e["classes"]
        ]

    # -- graph linkage and remediation ------------------------------------------ #

    def link_to_node(self, misconception_id: str, node_id: str) -> None:
        """Connect a misconception to a curriculum graph node (idempotent)."""
        key = _normalize_error_type(misconception_id)
        if key not in self._entries:
            raise KeyError("unknown misconception id: %s" % misconception_id)
        node_id = str(node_id)
        linked = self._entries[key]["linked_nodes"]
        if node_id not in linked:
            linked.append(node_id)

    def get_remediation(self, misconception_id: str) -> str:
        """Return the remediation text for a misconception."""
        key = _normalize_error_type(misconception_id)
        if key not in self._entries:
            raise KeyError("unknown misconception id: %s" % misconception_id)
        return self._entries[key]["remediation"]

    def suggest_followup(
        self, misconception_id: str, count: int = 3
    ) -> List[Dict[str, Any]]:
        """Return N deterministic isolating-question specs for a misconception."""
        key = _normalize_error_type(misconception_id)
        if key not in self._entries:
            raise KeyError("unknown misconception id: %s" % misconception_id)
        entry = self._entries[key]
        n = max(0, min(int(count), entry["isolating_questions"]))
        return [
            {
                "question_no": i + 1,
                "misconception_id": key,
                "focus": "isolating question %d" % (i + 1),
                "detector_pattern": entry["detector_pattern"],
                "difficulty": i + 1,
            }
            for i in range(n)
        ]

    # -- reporting ---------------------------------------------------------------- #

    def stats(self) -> Dict[str, Any]:
        """Counts per subject and per class."""
        per_subject: Dict[str, int] = {}
        per_class: Dict[int, int] = {}
        for entry in self._entries.values():
            for subject in entry["subjects"]:
                per_subject[subject] = per_subject.get(subject, 0) + 1
            for level in entry["classes"]:
                per_class[level] = per_class.get(level, 0) + 1
        return {
            "total": len(self._entries),
            "per_subject": {s: per_subject[s] for s in sorted(per_subject)},
            "per_class": {c: per_class[c] for c in sorted(per_class)},
        }

    # -- conveniences ----------------------------------------------------------- #

    def ids(self) -> List[str]:
        return sorted(self._entries)

    def __len__(self) -> int:
        return len(self._entries)

    def __contains__(self, misconception_id: object) -> bool:
        return isinstance(misconception_id, str) and (
            _normalize_error_type(misconception_id) in self._entries
        )
