"""subject_pedagogy.py — per-subject-family pedagogy profiles.

Owner directive (2026-09-30): "pedagogy must be PER-SUBJECT — all subjects
are different and cannot be treated the same way."  Every corpus subject
code maps to ONE of ~11 families; each family declares:

  learn_order          — node learn-page section order (front-loaded first)
  practice_mix         — the practice diet with weights (sum 100)
  solver_role          — "verified" (deterministic solver dominant) or
                         "guided" (teaching/walkthrough dominant)
  repertoire_emphasis  — which visuals to reach for first
  cbq_weights          — competency/board-question pattern weights
                         (case_study / assertion_reason / data_int /
                         source_based / long_framework) per board
  practice_bias        — when learn and practice tie in priority, does this
                         family practice earlier (0..1) or learn longer?
  learn_anchor         — the /learn page section the path deep-links to
  voice                — reason templates speaking the family's own pedagogy

Deliberately import-light (stdlib only) so tests and the learnpath service
can load it by file path without dragging the backend package graph.
"""

from __future__ import annotations

from typing import Any, Dict, Optional, Tuple

# ---------------------------------------------------------------------------
# The 11 family profiles
# ---------------------------------------------------------------------------

FAMILIES: Dict[str, Dict[str, Any]] = {
    "maths": {
        "name": "Mathematics",
        "subjects": {"math"},
        "learn_order": ["formula", "worked_example", "try_ladder", "check"],
        "practice_mix": {"numeric_drill": 70, "word_problem": 20, "error_find": 10},
        "solver_role": "verified",
        "repertoire_emphasis": ["step_reveal", "graph_plugins"],
        "cbq_weights": {"assertion_reason": 20, "data_int": 15, "case_study": 10,
                        "long_framework": 25},
        "practice_bias": 0.6,
        "learn_anchor": "try",
        "voice": {
            "learn": "Work the formula on a solved example first — then the try ladder.",
            "practice": "Numbers need reps: a short drill ladder at your level beats rereading.",
            "repair": "Step-level slips show up here — redo the ladder one rung at a time.",
        },
    },
    "physics": {
        "name": "Physics",
        "subjects": {"phy", "physics"},
        "learn_order": ["phenomenon", "formula", "derivation", "numericals"],
        "practice_mix": {"substitution_drill": 40, "derivation": 25,
                         "graph_reading": 20, "sign_unit_traps": 15},
        "solver_role": "verified",
        "repertoire_emphasis": ["sims", "vector_field_diagrams"],
        "cbq_weights": {"case_study": 15, "data_int": 20, "assertion_reason": 20,
                        "long_framework": 30},
        "practice_bias": 0.55,
        "learn_anchor": "see",
        "voice": {
            "learn": "See the phenomenon move, then attach the formula to it.",
            "practice": "Substitution drills at friendly numbers — sign and unit slips die by reps.",
            "repair": "Your sign-flip errors — practice substitution drills before new theory.",
        },
    },
    "chemistry": {
        "name": "Chemistry",
        "subjects": {"chem", "chemistry"},
        "learn_order": ["mechanism", "equation", "visual_state", "practice"],
        "practice_mix": {"equation_balancing": 35, "mechanism_explain": 30,
                         "mole_numeric": 25, "exception_spotting": 10},
        "solver_role": "verified",
        "repertoire_emphasis": ["molecule_sims", "reaction_timelines"],
        "cbq_weights": {"assertion_reason": 25, "case_study": 15, "data_int": 15,
                        "long_framework": 25},
        "practice_bias": 0.55,
        "learn_anchor": "see",
        "voice": {
            "learn": "Follow the mechanism — equations stick once the why is visible.",
            "practice": "Balance, then explain: equations and mechanisms in the same set.",
            "repair": "The mechanism broke down somewhere — trace it step by step again.",
        },
    },
    "biology": {
        "name": "Biology",
        "subjects": {"bio", "biotech", "hs"},
        "learn_order": ["diagram_animation", "definition", "mechanism", "labelling"],
        "practice_mix": {"diagram_labelling": 40, "mechanism_explain": 30,
                         "compare_tables": 20, "numeric": 10},
        "solver_role": "guided",
        "repertoire_emphasis": ["labelled_diagrams", "process_animations"],
        "cbq_weights": {"case_study": 25, "source_based": 15, "assertion_reason": 15,
                        "diagram_long": 30},
        "practice_bias": 0.4,
        "learn_anchor": "see",
        "voice": {
            "learn": "Start from the diagram — trace the process before reading the mechanism.",
            "practice": "Label first, explain second: diagrams carry the marks here.",
            "repair": "Your process order is shaky — walk the diagram stage by stage again.",
        },
    },
    "commerce": {
        "name": "Accountancy & Commerce",
        "subjects": {"acc", "bs", "ca"},
        "learn_order": ["ledger_format", "rule", "worked_entry", "try"],
        "practice_mix": {"journal_ledger_drill": 50, "statement_prep": 25,
                         "error_correction": 15, "theory": 10},
        "solver_role": "verified",
        "repertoire_emphasis": ["t_accounts", "statement_skeletons"],
        "cbq_weights": {"case_study": 30, "data_int": 25, "long_framework": 25,
                        "assertion_reason": 10},
        "practice_bias": 0.65,
        "learn_anchor": "try",
        "voice": {
            "learn": "Learn the format first — entries make sense once the ledger shape is fixed.",
            "practice": "Entries are a format skill: drill journal → ledger → statement.",
            "repair": "A posting rule slipped — redo one entry end to end, slowly.",
        },
    },
    "economics": {
        "name": "Economics",
        "subjects": {"eco", "economics", "stat"},
        "learn_order": ["concept", "graph", "data", "application"],
        "practice_mix": {"data_int": 35, "graph_shift_drill": 25, "compare": 20,
                         "numeric": 20},
        "solver_role": "guided",
        "repertoire_emphasis": ["curve_shift_animations", "table_graph_transforms"],
        "cbq_weights": {"data_int": 30, "case_study": 25, "assertion_reason": 20,
                        "long_framework": 15},
        "practice_bias": 0.5,
        "learn_anchor": "see",
        "voice": {
            "learn": "Concept → curve → data: build the graph before the numbers.",
            "practice": "Read data like an economist — tables and curve shifts first.",
            "repair": "The curve direction tripped you — re-derive the shift before moving on.",
        },
    },
    "humanities": {
        "name": "History & Civics",
        "subjects": {"hist", "history", "civ", "civics", "soc", "leg"},
        "learn_order": ["timeline_map", "narrative", "source", "framework_answer"],
        "practice_mix": {"chronology": 25, "source_based": 30, "claim_correction": 20,
                         "framework_answers": 25},
        "solver_role": "guided",
        "repertoire_emphasis": ["timelines", "maps", "portraits"],
        "cbq_weights": {"source_based": 35, "case_study": 20, "long_framework": 30,
                        "chronology_mcq": 15},
        "practice_bias": 0.35,
        "learn_anchor": "see",
        "voice": {
            "learn": "Place it on the timeline first — causes and effects read easier in order.",
            "practice": "Chronology and sources: fix the order of events, then read the source.",
            "repair": "Your chronology is weak — 2 timeline questions missed; retrace the order first.",
        },
    },
    "geography": {
        "name": "Geography",
        "subjects": {"geo", "geography", "app"},
        "learn_order": ["map_first", "process", "data", "application"],
        "practice_mix": {"map_work": 30, "diagram_explain": 25, "data_int": 25,
                         "compare": 20},
        "solver_role": "guided",
        "repertoire_emphasis": ["relief_maps", "climate_graphs", "cross_sections"],
        "cbq_weights": {"map_source": 30, "data_int": 25, "case_study": 20,
                        "long_framework": 25},
        "practice_bias": 0.4,
        "learn_anchor": "see",
        "voice": {
            "learn": "Open the map first — processes make sense on the land they shape.",
            "practice": "Map work and data: locate it, then explain the pattern.",
            "repair": "Re-trace the map — location errors cascade into process errors.",
        },
    },
    "english": {
        "name": "English",
        "subjects": {"eng", "engl", "english", "gram"},
        "learn_order": ["extract_first", "model_structure", "language_note", "writing"],
        "practice_mix": {"extract_comprehension": 35, "structure_models": 25,
                         "grammar_in_context": 25, "creative": 15},
        "solver_role": "guided",
        "repertoire_emphasis": ["annotated_extracts", "model_answer_skeletons"],
        "cbq_weights": {"source_based": 40, "long_framework": 30,
                        "assertion_reason": 15, "short_answer": 15},
        "practice_bias": 0.35,
        "learn_anchor": "define",
        "voice": {
            "learn": "Read the extract with the model answer beside it — structure first.",
            "practice": "Comprehension is a structure skill: practise against model answers.",
            "repair": "The evidence-to-claim link broke — rebuild it from the extract lines.",
        },
    },
    "hindi": {
        "name": "हिंदी",
        "subjects": {"hin"},
        "learn_order": ["pathan_avtaran", "vyakaran_note", "model_sanrachna", "lekhan"],
        "practice_mix": {"avtaran_arthgrahan": 35, "vyakaran": 25,
                         "model_sanrachna": 25, "rachnatmak": 15},
        "solver_role": "guided",
        "repertoire_emphasis": ["annotated_extracts_devanagari", "model_structures"],
        "cbq_weights": {"avtaran": 40, "deergh": 30, "vyakaran": 20, "anuchched": 10},
        "practice_bias": 0.35,
        "learn_anchor": "define",
        "voice": {
            "learn": "पहले अवतरण पढ़ें — मॉडल उत्तर की संरचना साथ में देखें।",
            "practice": "अवतरण-अर्थग्रहण और व्याकरण: संरचना के विरुद्ध अभ्यास करें।",
            "repair": "अवतरण की समझ टूटी है — पंक्तियों से दोबारा जोड़ें।",
        },
    },
    "computing": {
        "name": "Computer Science, AI & emerging subjects",
        "subjects": {"cs", "ip", "psy"},
        "learn_order": ["concept", "trace", "code_or_tables", "practice"],
        "practice_mix": {"code_trace": 35, "output_prediction": 25,
                         "numeric_stats": 25, "theory": 15},
        "solver_role": "verified",
        "repertoire_emphasis": ["code_step_visualizers", "truth_tables"],
        "cbq_weights": {"data_int": 25, "assertion_reason": 20, "case_study": 20,
                        "long_framework": 25},
        "practice_bias": 0.6,
        "learn_anchor": "try",
        "voice": {
            "learn": "Trace it by hand once — the concept holds when you can execute it on paper.",
            "practice": "Trace and predict: outputs before theory notes.",
            "repair": "The trace diverged from the machine — step through it line by line.",
        },
    },
}

# ---------------------------------------------------------------------------
# Code → family resolution
# ---------------------------------------------------------------------------

_CODE_TO_FAMILY: Dict[str, str] = {}
for _fam, _prof in FAMILIES.items():
    for _code in _prof["subjects"]:
        _CODE_TO_FAMILY[_code.lower()] = _fam

# friendly / display-name aliases (frontend subjectName(), world_content.json)
_NAME_ALIASES: Dict[str, str] = {
    "math": "maths", "mathematics": "maths", "maths": "maths",
    "physics": "physics",
    "chemistry": "chemistry",
    "biology": "biology", "biotechnology": "biology", "home science": "biology",
    "accountancy": "commerce", "commerce": "commerce",
    "business studies": "commerce", "computerised accounting": "commerce",
    "economics": "economics", "statistics": "economics",
    "history": "humanities", "civics": "humanities", "social science": "humanities",
    "legal studies": "humanities",
    "geography": "geography", "applied physics": "geography",
    "english": "english", "grammar": "english",
    "hindi": "hindi",
    "computer science": "computing", "informatics practices": "computing",
    "psychology": "computing",
}


def family_for(subject: Optional[str]) -> Tuple[str, Dict[str, Any]]:
    """Resolve a subject code OR display name → (family_key, profile).

    Unknown subjects fall back to a sensible guided-teaching default so the
    journey never stalls on an unmapped code."""
    if not subject:
        return "humanities", FAMILIES["humanities"]
    key = str(subject).strip().lower()
    fam = _CODE_TO_FAMILY.get(key) or _NAME_ALIASES.get(key)
    if fam is None:
        # last chance: a display name that contains a known alias word
        for alias, f in _NAME_ALIASES.items():
            if alias in key:
                fam = f
                break
    if fam is None:
        fam = "humanities"
    return fam, FAMILIES[fam]


def profile_for(subject: Optional[str]) -> Dict[str, Any]:
    """Just the profile dict (never None)."""
    return family_for(subject)[1]


def family_key_for(subject: Optional[str]) -> str:
    return family_for(subject)[0]


def display_subject(subject: Optional[str]) -> str:
    """Human subject name for reasons (profile name > raw code)."""
    _, prof = family_for(subject)
    return str(prof.get("name") or subject or "this subject")


def reason(kind: str, subject: Optional[str], fallback: str) -> str:
    """Family-voiced reason for a journey action.

    kind ∈ {learn, practice, repair}. Falls back to the caller's honest
    generic line when the family has no voice for that kind."""
    _, prof = family_for(subject)
    voices = prof.get("voice") or {}
    return str(voices.get(kind) or fallback)


def learn_anchor_for(subject: Optional[str]) -> str:
    """The /learn page section this family should open on."""
    _, prof = family_for(subject)
    return str(prof.get("learn_anchor") or "define")


def practice_mix_line(subject: Optional[str]) -> str:
    """'Numeric drill ladder 70% · word problems 20% · error-find 10%' style line."""
    _, prof = family_for(subject)
    mix = prof.get("practice_mix") or {}
    if not mix:
        return ""
    label = {
        "numeric_drill": "numeric drills", "word_problem": "word problems",
        "error_find": "error-find", "substitution_drill": "substitution drills",
        "derivation": "derivations", "graph_reading": "graph reading",
        "sign_unit_traps": "sign/unit traps", "equation_balancing": "equation balancing",
        "mechanism_explain": "mechanism explain", "mole_numeric": "mole numerics",
        "exception_spotting": "exception spotting", "diagram_labelling": "diagram labelling",
        "compare_tables": "compare tables", "numeric": "numerics",
        "journal_ledger_drill": "ledger drills", "statement_prep": "statement prep",
        "error_correction": "error correction", "theory": "theory",
        "data_int": "data interpretation", "graph_shift_drill": "curve shifts",
        "compare": "comparisons", "chronology": "chronology",
        "source_based": "source work", "claim_correction": "claim correction",
        "framework_answers": "framework answers", "map_work": "map work",
        "diagram_explain": "diagram explain",
        "extract_comprehension": "extract comprehension",
        "structure_models": "model structures", "grammar_in_context": "grammar in context",
        "creative": "creative writing",
        "avtaran_arthgrahan": "अवतरण-अर्थग्रहण", "vyakaran": "व्याकरण",
        "model_sanrachna": "मॉडल-संरचना", "rachnatmak": "रचनात्मक लेखन",
        "code_trace": "code tracing", "output_prediction": "output prediction",
        "numeric_stats": "numerics/stats",
    }
    parts = [f"{label.get(k, k)} {v}%" for k, v in mix.items() if v]
    return " · ".join(parts)


def solver_role_for(subject: Optional[str]) -> str:
    _, prof = family_for(subject)
    return str(prof.get("solver_role") or "guided")
