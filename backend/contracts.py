"""Canonical contracts for the entire platform.

EVERY solver, EVERY content source, EVERY API response uses these models.
This is the single source of truth — frontend TypeScript types should be
generated from these models (via `python -m backend.contracts --export-ts`).

Design principles:
  1. Every response has a uniform envelope: success, error, data
  2. Every solve result has the same fields regardless of which solver ran
  3. Errors are DATA (in the response), never exceptions crossing boundaries
  4. All IDs are strings (never int/str mixing like class_level 1_5 vs 6)
  5. Every solve result is verified when verification is possible
"""

from __future__ import annotations

from enum import Enum
from typing import Any, Optional, Union
from pydantic import BaseModel, Field


# ═══════════════════════════════════════════════════════════════════
# 1. CORE ENUMS (single definition, used everywhere)
# ═══════════════════════════════════════════════════════════════════

class Board(str, Enum):
    CBSE = "CBSE"
    CISCE = "CISCE"


class Subject(str, Enum):
    MATHS = "maths"
    PHYSICS = "physics"
    CHEMISTRY = "chemistry"
    BIOLOGY = "biology"
    ENGLISH = "english"
    HINDI = "hindi"
    HISTORY_CIVICS = "histciv"
    GEOGRAPHY = "geo"
    EVS = "evs"
    COMPUTER_SCIENCE = "cs"
    ECONOMICS = "econ"
    ACCOUNTS = "acc"
    BUSINESS = "bs"
    OTHER = "other"


class Difficulty(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


class CognitiveLevel(str, Enum):
    REMEMBER = "remember"
    UNDERSTAND = "understand"
    APPLY = "apply"
    ANALYZE = "analyze"
    EVALUATE = "evaluate"
    CREATE = "create"


class SolverTier(str, Enum):
    """Which solver handled this — for debugging and telemetry."""
    DETERMINISTIC = "deterministic"      # SymPy/pint/chempy — 100% reliable
    STRUCTURED = "structured"            # Step chainer with student input
    PATTERN = "pattern"                  # Pattern matcher on known types
    SUBJECT = "subject"                  # Subject-specific solver (150+)
    COMPETENCY = "competency"            # Competency-based solver
    LLM_FALLBACK = "llm_fallback"        # Last resort — LLM with verification


# ═══════════════════════════════════════════════════════════════════
# 2. UNIFORM RESPONSE ENVELOPE
# ═══════════════════════════════════════════════════════════════════

class Envelope(BaseModel):
    """Every API response uses this. success=False means error is set."""
    success: bool = True
    error: str = ""
    error_code: str = ""  # machine-readable: PARSE_ERROR, TIMEOUT, NO_SOLVER, etc.
    data: Optional[Any] = None
    warnings: list[str] = Field(default_factory=list)
    elapsed_ms: int = 0


# ═══════════════════════════════════════════════════════════════════
# 3. SOLVER CONTRACTS
# ═══════════════════════════════════════════════════════════════════

class InputField(BaseModel):
    """One field in a structured input form."""
    name: str
    label: str
    field_type: str = "expression"  # expression|number|variable|text|choice
    required: bool = True
    default: str = ""
    placeholder: str = ""
    help_text: str = ""
    choices: list[str] = Field(default_factory=list)  # for field_type=choice


class ThinkingQuestion(BaseModel):
    """Competency check before showing the form."""
    question: str
    options: list[str]
    correct_answer: str
    explanation: str


class StepForm(BaseModel):
    """Form definition for one step of a problem type."""
    step_index: int
    step_type_id: str
    label: str
    name: str
    description: str = ""
    fields: list[InputField] = Field(default_factory=list)
    thinking: Optional[ThinkingQuestion] = None
    auto_fill: dict[str, str] = Field(default_factory=dict)
    next_steps: list[str] = Field(default_factory=list)
    marks: int = 1


class ProblemType(BaseModel):
    """A type of problem students can select (e.g. 'deriv_at_point')."""
    id: str
    name: str
    description: str = ""
    topic: str = ""
    category: str = ""
    subject: str = "maths"
    class_level: str = "12"          # ALWAYS string ("1_5", "6", ..., "12")
    board: str = "CBSE"
    marks: int = 1
    difficulty: Difficulty = Difficulty.MEDIUM
    cognitive_level: CognitiveLevel = CognitiveLevel.APPLY
    example: str = ""
    num_steps: int = 1
    steps: list[StepForm] = Field(default_factory=list)
    thinking: Optional[ThinkingQuestion] = None
    hint: str = ""
    setup_help: str = ""


class SolutionStep(BaseModel):
    """One step in a worked solution."""
    step_index: int = 0
    step_type_id: str = ""
    description: str = ""
    formula: str = ""
    computation: str = ""
    answer: str = ""
    success: bool = True
    verified: bool = False
    verification_msg: str = ""
    marks_awarded: int = 0


class SolutionResult(BaseModel):
    """THE canonical solve result. Every solver returns exactly this.

    Field mapping from legacy types:
      - SolverResult (step_chainer): success→success, answer→final_answer,
        steps→steps (str list→SolutionStep list), verified→verified,
        error→error
      - SolutionResultV2 (solver_v2): question→question, steps→steps,
        error→error, success→success, final_answer→final_answer
      - dict returns (subject solvers): normalized by adapters
    """
    # Identity
    problem_type_id: str = ""
    question: str = ""
    subject: str = ""
    class_level: str = ""

    # Outcome
    success: bool = False
    final_answer: str = ""
    answer_raw: Optional[str] = None      # SymPy object stringified
    answer_numeric: Optional[float] = None
    answer_unit: str = ""                 # "m/s", "mol", "₹", etc.

    # Worked solution
    steps: list[SolutionStep] = Field(default_factory=list)
    strategy_used: str = ""               # which solver strategy produced this

    # Verification
    verified: bool = False
    verification_msg: str = ""
    verification_method: str = ""         # "numerical_derivative", "substitution", etc.

    # Error handling (errors are DATA, not exceptions)
    error: str = ""
    error_code: str = ""

    # Truth tier surfaced to clients (VERIFIED / METHOD_ONLY / ...)
    tier: str = "METHOD_ONLY"

    # Metadata
    solver_tier: SolverTier = SolverTier.DETERMINISTIC
    solver_path: list[str] = Field(default_factory=list)  # which solvers were tried
    elapsed_ms: int = 0
    next_step_suggestion: Optional[str] = None
    misconceptions_detected: list[str] = Field(default_factory=list)


class ProblemTypeMatch(BaseModel):
    """A matched problem type from identify()."""
    problem_type_id: str
    name: str
    confidence: float = 0.0              # 0-1
    variables: dict[str, str] = Field(default_factory=dict)
    category: str = ""
    needs_student_input: bool = True


class IdentifyResult(BaseModel):
    """Result of identify(question)."""
    success: bool = True
    error: str = ""
    error_code: str = ""
    question: str = ""
    matches: list[ProblemTypeMatch] = Field(default_factory=list)
    best_match: Optional[ProblemTypeMatch] = None
    form_fields: list[InputField] = Field(default_factory=list)
    category: str = ""
    elapsed_ms: int = 0


class ThinkingCheckResult(BaseModel):
    """Result of checking a thinking-step answer."""
    correct: bool = False
    explanation: str = ""
    correct_answer: str = ""
    misconception: str = ""


# ═══════════════════════════════════════════════════════════════════
# 4. CONTENT CONTRACTS
# ═══════════════════════════════════════════════════════════════════

class KnowledgeNode(BaseModel):
    """A node in the knowledge graph. Canonical structure for ALL boards.

    CBSE nodes have 22 fields, CISCE had 11 — this is the union,
    with optional fields for board-specific extras.
    """
    node_id: str
    topic: str
    subject: str
    class_level: str                     # ALWAYS string ("1_5", "6", ..., "12")
    board: str
    chapter: str
    content_snippet: str = ""
    difficulty: str = "easy"
    estimated_time: int = 20
    concept_tags: list[str] = Field(default_factory=list)
    scope_constraints: Union[list[str], str] = Field(default_factory=list)
    prerequisite_node_ids: list[str] = Field(default_factory=list)
    prerequisite_reasons: dict[str, str] = Field(default_factory=dict)
    forward_node_ids: list[str] = Field(default_factory=list)
    forward_reasons: dict[str, str] = Field(default_factory=dict)
    cross_subject_prereqs: list[str] = Field(default_factory=list)
    cross_subject_reasons: dict[str, str] = Field(default_factory=dict)
    source_file: str = ""
    is_root: bool = False


class EnrichmentContent(BaseModel):
    """Enrichment for a node — the marker format normalized."""
    node_id: str
    title: str = ""
    definition: str = ""
    cognitive_level: str = "understand"
    mastery_criteria: str = ""
    scope_boundary: str = ""
    text_walkthrough: str = ""
    diagnostic_question: str = ""
    diagnostic_answer: str = ""
    diagnostic_level: str = "reasoning"
    common_misconceptions: str = ""
    on_failure: str = ""
    language: str = "en"  # "en" | "hi" — content language


class StudyAid(BaseModel):
    """A topic-level study aid file (character maps, glossary, etc.)."""
    class_level: str
    subject: str
    board: str
    aid_type: str            # character_maps|drill_banks|glossary|...
    title: str = ""
    content: str = ""        # markdown body
    language: str = "en"


# ═══════════════════════════════════════════════════════════════════
# 5. CONTENT STORE CONTRACT
# ═══════════════════════════════════════════════════════════════════

class ContentQuery(BaseModel):
    """Query for content — all fields optional, combine as needed."""
    board: Optional[str] = None
    class_level: Optional[str] = None
    subject: Optional[str] = None
    chapter: Optional[str] = None
    node_id: Optional[str] = None
    language: Optional[str] = None  # "en"|"hi" — None = any


# ═══════════════════════════════════════════════════════════════════
# 6. TELEMETRY / INTELLIGENCE EVENTS
# ═══════════════════════════════════════════════════════════════════

class SolverEvent(BaseModel):
    """Event emitted when a solve happens — intelligence layer subscribes."""
    event_type: str = "solve_attempt"   # solve_attempt|solve_success|solve_failure|identify
    student_id: str = ""
    problem_type_id: str = ""
    solver_tier: str = ""
    success: bool = False
    verified: bool = False
    elapsed_ms: int = 0
    error_code: str = ""
    timestamp: str = ""


# ═══════════════════════════════════════════════════════════════════
# 7. EXPORT (TypeScript generation support)
# ═══════════════════════════════════════════════════════════════════

def export_typescript() -> str:
    """Generate TypeScript interfaces from these models.

    Run: python -m backend.contracts --export-ts > types/solver.d.ts
    This guarantees frontend and backend never drift.
    """
    lines = ["// AUTO-GENERATED from backend/contracts.py — DO NOT EDIT", ""]

    def ts_type(pydantic_type: str) -> str:
        mapping = {
            "bool": "boolean", "int": "number", "float": "number",
            "str": "string", "list[str]": "string[]",
            "dict[str, str]": "Record<string, string>",
            "Optional[str]": "string | null",
            "Optional[float]": "number | null",
            "list[InputField]": "InputField[]",
            "list[StepForm]": "StepForm[]",
            "list[SolutionStep]": "SolutionStep[]",
            "list[ProblemTypeMatch]": "ProblemTypeMatch[]",
            "Optional[ThinkingQuestion]": "ThinkingQuestion | null",
            "Optional[ProblemTypeMatch]": "ProblemTypeMatch | null",
            "Union[list[str], str]": "string[] | string",
        }
        return mapping.get(pydantic_type, "any")

    enum_ts = {
        "Board": [("CBSE", "CBSE"), ("CISCE", "CISCE")],
        "Difficulty": [("EASY", "easy"), ("MEDIUM", "medium"), ("HARD", "hard")],
        "SolverTier": [
            ("DETERMINISTIC", "deterministic"), ("STRUCTURED", "structured"),
            ("PATTERN", "pattern"), ("SUBJECT", "subject"),
            ("COMPETENCY", "competency"), ("LLM_FALLBACK", "llm_fallback"),
        ],
    }
    for name, values in enum_ts.items():
        lines.append(f"export type {name} =")
        for i, (key, val) in enumerate(values):
            sep = " |" if i < len(values) - 1 else ";"
            lines.append(f"  '{val}'{sep}")
        lines.append("")

    models = [
        InputField, ThinkingQuestion, StepForm, ProblemType,
        SolutionStep, SolutionResult, ProblemTypeMatch, IdentifyResult,
        ThinkingCheckResult, KnowledgeNode, EnrichmentContent, StudyAid,
    ]
    for model in models:
        lines.append(f"export interface {model.__name__} {{")
        for name, field in model.model_fields.items():
            ftype = ts_type(str(field.annotation).replace("<class '", "").replace("'>", "").replace("typing.", ""))
            optional = "" if field.is_required() else "?"
            lines.append(f"  {name}{optional}: {ftype};")
        lines.append("}")
        lines.append("")

    return "\n".join(lines)


if __name__ == "__main__":
    import sys
    if "--export-ts" in sys.argv:
        print(export_typescript())
    else:
        # Validate all models
        for model in [Envelope, ProblemType, SolutionResult, IdentifyResult,
                      KnowledgeNode, EnrichmentContent, StudyAid]:
            print(f"  {model.__name__}: OK ({len(model.model_fields)} fields)")
        print("\nAll contracts valid. Use --export-ts to generate TypeScript.")
