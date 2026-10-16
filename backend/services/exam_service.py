"""
ISC Exam Simulator Service
Creates realistic ISC board exam papers, times them, grades them,
and provides detailed performance analysis with exam strategy recommendations.

Supports: ISC 80-mark / 3-hour format (Section A compulsory, Section B choice)
"""

import hashlib
import json
import math
import random
import secrets
import string
from datetime import datetime, timezone
from decimal import Decimal
from typing import Any, Dict, List, Optional, Tuple

from sqlalchemy import Column, DateTime, Enum, Float, ForeignKey, Integer, String, Text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import func

from backend.db_types import GUID
from backend.services.feedback_scrub import scrub_answer_key

from pydantic import BaseModel, ConfigDict, Field


# ─────────────────────────────────────────────
# Configuration
# ─────────────────────────────────────────────
class ISCConfig:
    TOTAL_MARKS: int = 80
    TOTAL_TIME_MINUTES: int = 180
    TIME_WARNING_15_MIN: int = 15
    TIME_WARNING_5_MIN: int = 5

    # Section time allocation (% of total time)
    SECTION_TIME_PCT: Dict[str, float] = {"A": 0.35, "B1": 0.20, "B2": 0.20, "B3": 0.25}

    # Grading tolerances
    NUMERIC_REL_TOL: float = 0.02
    NUMERIC_ABS_TOL: float = 0.05
    MAX_STUDENT_TIME_RATIO: float = 2.0

    # Default subjects if not in DB config
    DEFAULT_SUBJECTS: List[str] = [
        "Mathematics", "Physics", "Chemistry",
        "English", "Computer Science", "Biology"
    ]


# ─────────────────────────────────────────────
# Seeded RNG (deterministic question selection)
# ─────────────────────────────────────────────
class SeededRNG:
    """Deterministic PRNG using SHA-256 — same seed always produces same sequence."""

    def __init__(self, seed: int):
        self._seed = seed
        self._counter = 0

    def _next(self) -> float:
        h = hashlib.sha256(f"{self._seed}:{self._counter}".encode()).hexdigest()
        self._counter += 1
        return int(h[:12], 16) / 0xFFFFFFFFFFFF

    def randint(self, lo: int, hi: int) -> int:
        return lo + int(self._next() * (hi - lo + 1))

    def choice(self, seq: list) -> Any:
        return seq[self.randint(0, len(seq) - 1)]

    def sample(self, seq: list, k: int) -> list:
        pool = list(seq)
        result = []
        for _ in range(min(k, len(pool))):
            idx = self.randint(0, len(pool) - 1)
            result.append(pool.pop(idx))
        return result

    def shuffle(self, seq: list) -> list:
        arr = list(seq)
        for i in range(len(arr) - 1, 0, -1):
            j = self.randint(0, i)
            arr[i], arr[j] = arr[j], arr[i]
        return arr

    def uniform(self, lo: float, hi: float) -> float:
        return lo + self._next() * (hi - lo)


# ─────────────────────────────────────────────
# SQLAlchemy ORM Models
# ─────────────────────────────────────────────
from backend.database import Base


class ExamSessionDB(Base):
    __tablename__ = "exam_sessions"

    id: int = Column(Integer, primary_key=True, autoincrement=True)
    session_code: str = Column(String(64), unique=True, index=True, nullable=False)
    student_id = Column(GUID(), ForeignKey("students.id"), nullable=False, index=True)
    subject: str = Column(String(64), nullable=False, index=True)
    exam_type: str = Column(String(32), default="isc_board")

    # Exam configuration
    total_marks: int = Column(Integer, default=80)
    total_time_minutes: int = Column(Integer, default=180)
    section_config: str = Column(Text)  # JSON list of sections

    # Timing
    started_at: Optional[datetime] = Column(DateTime(timezone=True))
    submitted_at: Optional[datetime] = Column(DateTime(timezone=True))
    time_remaining_seconds: Optional[int] = Column(Integer)

    # State machine
    status: str = Column(String(16), default="created")
    # created | in_progress | submitted | graded | expired

    # Results
    obtained_marks: Optional[float] = Column(Float)
    percentage: Optional[float] = Column(Float)
    grade: Optional[str] = Column(String(4))

    created_at: datetime = Column(DateTime(timezone=True), server_default=func.now())


class ExamPaperDB(Base):
    __tablename__ = "exam_papers"

    id: int = Column(Integer, primary_key=True, autoincrement=True)
    session_id: int = Column(Integer, ForeignKey("exam_sessions.id"), nullable=False, index=True)
    subject: str = Column(String(64), nullable=False)
    seed: int = Column(Integer, nullable=False)
    questions: str = Column(Text, nullable=False)  # JSON
    total_marks: int = Column(Integer, default=80)
    created_at: datetime = Column(DateTime(timezone=True), server_default=func.now())


class ExamResultDB(Base):
    __tablename__ = "exam_results"

    id: int = Column(Integer, primary_key=True, autoincrement=True)
    session_id: int = Column(Integer, ForeignKey("exam_sessions.id"), nullable=False, index=True)
    student_id = Column(GUID(), ForeignKey("students.id"), nullable=False, index=True)
    subject: str = Column(String(64), nullable=False)

    # Scores
    total_marks: int = Column(Integer)
    obtained_marks: float = Column(Float)
    percentage: float = Column(Float)
    grade: str = Column(String(4))

    # Per-section breakdown
    section_marks: str = Column(Text)  # JSON list of SectionMarkSummary

    # Per-topic breakdown
    topic_marks: str = Column(Text)  # JSON list of TopicMarkSummary

    # Detailed question results
    graded_questions: str = Column(Text)  # JSON list of GradedQuestion

    # Time analysis
    time_analysis: str = Column(Text)  # JSON TimeAnalysisDetail

    # Strategy
    strategy: str = Column(Text)  # JSON ExamStrategy

    # Weak topics
    weak_topics: str = Column(Text)  # JSON list[str]

    submitted_at: datetime = Column(DateTime(timezone=True), server_default=func.now())


# ─────────────────────────────────────────────
# Enums
# ─────────────────────────────────────────────
class QuestionType(str):
    MCQ = "mcq"
    VERY_SHORT = "very_short_answer"
    SHORT = "short_answer"
    LONG = "long_answer"


class ExamStatus(str):
    CREATED = "created"
    IN_PROGRESS = "in_progress"
    SUBMITTED = "submitted"
    GRADED = "graded"
    EXPIRED = "expired"


class GradingStatus(str):
    CORRECT = "correct"
    PARTIAL = "partial"
    INCORRECT = "incorrect"
    NOT_ATTEMPTED = "not_attempted"


# ─────────────────────────────────────────────
# Pydantic v2 Schemas
# ─────────────────────────────────────────────
class SectionConfig(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    section_id: str = Field(..., description="e.g. 'A', 'B1', 'B2', 'B3'")
    name: str = Field(..., description="Human-readable section name")
    is_compulsory: bool = True
    num_questions: int = Field(..., gt=0)
    marks_per_question: int = Field(..., gt=0)
    question_type: str = Field(...)
    choice: bool = False
    choices_available: int = 1
    time_suggested_minutes: int


class QuestionData(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    question_id: str
    question_number: int
    section_id: str
    question_type: str
    marks: int
    topic: str
    subtopic: str
    text: str
    options: Optional[List[str]] = None
    correct_answer: Any
    internal_id: str


class PaperResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    session_id: int
    session_code: str
    subject: str
    exam_type: str
    total_marks: int
    total_time_minutes: int
    sections: List[SectionConfig]
    questions: List[QuestionData]
    started_at: Optional[str] = None


class AnswerInput(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    question_id: str
    answer: str
    time_taken_seconds: Optional[int] = 0
    marked_for_review: bool = False


class SubmitExamRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    session_id: int
    answers: List[AnswerInput]


class GradedStep(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    step_number: int
    description: str
    max_marks: float
    awarded_marks: float
    is_correct: bool


class GradedQuestion(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    question_id: str
    question_number: int
    section_id: str
    topic: str
    marks: int
    student_answer: str
    correct_answer: Any
    status: str
    awarded_marks: float
    max_marks: int
    feedback: str
    rubric: List[GradedStep]


class SectionMarkSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    section_id: str
    name: str
    total_marks: int
    obtained_marks: float
    percentage: float
    attempted: int
    total_questions: int


class TopicMarkSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    topic: str
    total_marks: int
    obtained_marks: float
    percentage: float
    questions_attempted: int
    total_questions: int


class ExamSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    total_marks: int
    obtained_marks: float
    percentage: float
    grade: str
    rank_in_class: Optional[int] = None
    passed: bool
    attempted_questions: int
    total_questions: int
    correct_questions: int
    partial_questions: int
    incorrect_questions: int
    not_attempted_questions: int
    time_efficiency_ratio: float
    avg_time_per_mark: float


class QuestionTimeDetail(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    question_id: str
    question_number: int
    section_id: str
    topic: str
    marks: int
    time_taken_seconds: int
    time_suggested_seconds: int
    time_overrun_seconds: int = 0
    time_overrun_pct: float = 0.0
    warning: Optional[str] = None


class SectionTimeDetail(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    section_id: str
    name: str
    time_suggested_minutes: int
    actual_time_minutes: float
    overrun_minutes: float
    efficiency_rating: str


class TimeAnalysisDetail(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    total_time_minutes: float
    ideal_time_minutes: int
    overall_efficiency: float
    sections: List[SectionTimeDetail]
    question_times: List[QuestionTimeDetail]
    warnings: List[str]
    time_management_score: float


class ExamStrategyResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    student_id: Any  # int or UUID — student ids migrated to GUID
    subject: str
    generated_at: str
    overall_grade: str
    overall_percentage: float
    section_priorities: Dict[str, str]
    topic_recommendations: List[Dict[str, Any]]
    time_management_tips: List[str]
    question_selection_strategy: List[str]
    exam_day_tips: List[str]
    weak_topics: List[str]
    strong_topics: List[str]


class ExamResultResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    session_id: int
    session_code: str
    student_id: Any  # int or UUID — student ids migrated to GUID
    subject: str
    exam_type: str
    submitted_at: str
    summary: ExamSummary
    section_marks: List[SectionMarkSummary]
    topic_marks: List[TopicMarkSummary]
    graded_questions: List[GradedQuestion]
    time_analysis: TimeAnalysisDetail
    strategy: ExamStrategyResponse


# ─────────────────────────────────────────────
# Topic Configurations
# ─────────────────────────────────────────────
TOPIC_CONFIG: Dict[str, Dict[str, list]] = {
    "Mathematics": {
        "Calculus": ["Derivatives", "Integrals", "Differential Equations", "Application of Derivatives"],
        "Algebra": ["Matrices", "Determinants", "Probability", "LPP"],
        "Coordinate Geometry": ["Straight Lines", "Circles", "Parabola", "Ellipse"],
        "Trigonometry": ["Identities", "Inverse Trig", "Solutions of Triangles"],
        "Vectors": ["Scalar Triple Product", "Vector Triple Product", "Lines and Planes"],
    },
    "Physics": {
        "Electrostatics": ["Coulomb's Law", "Electric Field", "Potential", "Capacitors"],
        "Current Electricity": ["Kirchhoff's Laws", "Meter Bridge", "Potentiometer"],
        "Magnetic Effects": ["Biot-Savart", "Ampere's Law", "Force on Conductor"],
        "Electromagnetic Induction": ["Faraday's Law", "Lenz's Law", "Eddy Currents"],
        "Optics": ["Refraction", "Lenses", "Interference", "Diffraction"],
        "Modern Physics": ["Photoelectric", "Bohr Model", "Nucleus"],
    },
    "Chemistry": {
        "Electrochemistry": ["Nernst Equation", "Electrochemical Cells", "Conductance"],
        "Chemical Kinetics": ["Rate Law", "Order of Reaction", "Activation Energy"],
        "Solutions": ["Osmotic Pressure", "Raoult's Law", "Colligative Properties"],
        "Thermodynamics": ["First Law", "Enthalpy", "Entropy"],
        "Coordination": ["IUPAC Naming", "Isomerism", "CFSE"],
    },
    "Computer Science": {
        "Programming": ["Functions", "Recursion", "Arrays", "2D Arrays"],
        "Data Structures": ["Stacks", "Queues", "Linked Lists", "Trees"],
        "Algorithms": ["Sorting", "Searching", "Recursion"],
        "OOP": ["Classes", "Inheritance", "Polymorphism", "Abstraction"],
        "Boolean Algebra": ["Truth Tables", "K-Maps", "Logic Gates"],
    },
}


# ─────────────────────────────────────────────
# Question Banks  (Math, Physics, Chemistry)
# ─────────────────────────────────────────────
_QB: Dict[str, Dict[str, Dict[str, Dict]]] = {
    "Mathematics": {
        "Calculus": {
            "Derivatives": {
                "mcq": [
                    {"text": "If y = x³ + 2x² - 5x, find dy/dx at x = 2.", "opts": ["10", "12", "14", "8"], "ans": "12", "steps": [("Differentiate: dy/dx = 3x² + 4x - 5", 0.5), ("Substitute x=2: 3(4) + 8 - 5 = 12", 0.5)]},
                    {"text": "The derivative of sin(x²) w.r.t. x is:", "opts": ["cos(x²)", "2x·cos(x²)", "-2x·sin(x²)", "cos(2x)"], "ans": "2x·cos(x²)", "steps": [("Apply chain rule: d/dx[sin(x²)] = cos(x²)·d/dx(x²)", 0.5), ("= 2x·cos(x²)", 0.5)]},
                    {"text": "If y = e^(3x+2), dy/dx equals:", "opts": ["e^(3x+2)", "3e^(3x+2)", "(3x+2)e^(3x+2)", "e^(3x)"], "ans": "3e^(3x+2)", "steps": [("Apply chain rule: d/dx[e^(3x+2)] = e^(3x+2)·d/dx(3x+2)", 0.5), ("= 3e^(3x+2)", 0.5)]},
                    {"text": "Second derivative of x⁴ - 3x³ + 2x is:", "opts": ["12x² - 18x", "12x - 18", "4x³ - 9x² + 2", "12x² - 9x"], "ans": "12x² - 18x", "steps": [("d/dx = 4x³ - 9x² + 2", 0.5), ("d²/dx² = 12x² - 18x", 0.5)]},
                    {"text": "Derivative of log(x) w.r.t. x is:", "opts": ["1/x", "x", "log(e)/x", "1/(x·log(e))"] , "ans": "1/x", "steps": [("d/dx[log(x)] = 1/x", 1.0)]},
                ],
                "vsa": [
                    {"text": "Find d/dx[tan⁻¹(x)²] at x = 1.", "ans": "1", "steps": [("Let u = tan⁻¹(x), then y = u². dy/dx = 2u·(1/(1+x²))", 0.5), ("At x=1: u=π/4. dy/dx = 2(π/4)(1/2) = π/4 ≈ 0.785", 0.5)]},
                    {"text": "If y = sec(x), find dy/dx.", "ans": "sec(x)·tan(x)", "steps": [("Standard derivative: d/dx[sec(x)] = sec(x)·tan(x)", 1.0)]},
                ],
                "sa": [
                    {"text": "Differentiate y = (x²+1)(x-3) w.r.t. x using product rule.", "ans": "3x² - 6x + 1", "steps": [("Apply product rule: d/dx[uv] = u·dv/dx + v·du/dx", 0.5), ("u=x²+1, v=x-3 → du/dx=2x, dv/dx=1", 0.5), ("=(x²+1)·1 + (x-3)·2x = x²+1+2x²-6x = 3x²-6x+1", 0.5)]},
                ],
                "la": [
                    {
                        "text": "A curve is given by xy = c². Prove that the tangent at any point (x₁,y₁) is x/x₁ + y/y₁ = 2. Also find the tangent at (4c, c/4).",
                        "ans": "y = -x/16 + c/2",
                        "steps": [
                            ("Differentiate implicitly: y + x·dy/dx = 0 → dy/dx = -y/x", 0.5),
                            ("At (x₁,y₁): slope = -y₁/x₁. Equation: y-y₁ = (-y₁/x₁)(x-x₁)", 0.5),
                            ("Simplify: xy₁ + yx₁ = 2x₁y₁ → x/x₁ + y/y₁ = 2", 1.0),
                            ("At (4c, c/4): x/(4c) + y/(c/4) = 2 → x/(4c) + 4y/c = 2", 0.5),
                            ("Multiply by 4c: x + 16y = 8c → y = -x/16 + c/2", 0.5),
                        ],
                    },
                ],
            },
            "Integrals": {
                "mcq": [
                    {"text": "∫x² dx equals:", "opts": ["x³", "x³/3", "3x²", "x³+C"], "ans": "x³/3+C", "steps": [("Power rule: ∫x^n dx = x^(n+1)/(n+1)", 0.5), ("∫x² dx = x³/3 + C", 0.5)]},
                    {"text": "∫sin(2x) dx equals:", "opts": ["-cos(2x)/2", "-cos(2x)", "cos(2x)/2", "-2cos(2x)"], "ans": "-cos(2x)/2", "steps": [("Substitute u=2x, du=2dx: ∫sin(u)du/2", 0.5), ("= -cos(u)/2 = -cos(2x)/2", 0.5)]},
                    {"text": "∫e^(3x) dx equals:", "opts": ["e^(3x)", "e^(3x)/3", "3e^(3x)", "ln(3)e^(3x)"], "ans": "e^(3x)/3", "steps": [("Standard: ∫e^(ax)dx = e^(ax)/a", 1.0)]},
                    {"text": "∫dx/(x²+1) equals:", "opts": ["tan⁻¹(x)", "-tan⁻¹(x)", "sin⁻¹(x)", "sec⁻¹(x)"], "ans": "tan⁻¹(x)", "steps": [("Standard: ∫dx/(1+x²) = tan⁻¹(x)", 1.0)]},
                    {"text": "∫(1/x) dx equals:", "opts": ["1/x²", "log|x| + C", "x + C", "e^x"], "ans": "log|x| + C", "steps": [("Standard: ∫dx/x = log|x| + C", 1.0)]},
                ],
                "vsa": [
                    {"text": "Evaluate: ∫₀^π cos(x) dx", "ans": "0", "steps": [("[sin(x)]₀^π = sin(π) - sin(0) = 0 - 0 = 0", 1.0)]},
                ],
                "sa": [
                    {"text": "Evaluate: ∫(x+1)(x-2) dx", "ans": "x³/3 - x²/2 - 2x + C", "steps": [("Expand: (x+1)(x-2) = x² - x - 2", 0.5), ("Integrate term by term: x³/3 - x²/2 - 2x + C", 0.5)]},
                ],
                "la": [
                    {
                        "text": "Evaluate ∫₀^1 x·e^x dx using integration by parts. Also evaluate ∫₀^π sin(x)·cos(x) dx.",
                        "ans": "1; 0",
                        "steps": [
                            ("IBP: u=x, dv=e^xdx → du=dx, v=e^x", 0.5),
                            ("∫xe^x = [xe^x]₀¹ - ∫₀¹e^xdx = e - [e^x]₀¹ = e - (e-1) = 1", 1.0),
                            ("sin(x)cos(x) = sin(2x)/2. ∫₀^π sin(2x)/2 dx = [-cos(2x)/4]₀^π = 0", 0.5),
                        ],
                    },
                ],
            },
            "Differential Equations": {
                "mcq": [
                    {"text": "Order of DE: (d²y/dx²)³ + (dy/dx)⁴ + y = 0 is:", "opts": ["1", "2", "3", "4"], "ans": "2", "steps": [("Order = highest derivative order = 2", 1.0)]},
                    {"text": "General solution of dy/dx = 3y is:", "opts": ["y = 3x + C", "y = Ce^(3x)", "y = Ce^(x/3)", "y = 3e^x"], "ans": "y = Ce^(3x)", "steps": [("Separate: dy/y = 3dx. Integrate: ln|y| = 3x + C", 0.5), ("y = Ce^(3x)", 0.5)]},
                ],
                "vsa": [
                    {"text": "Solve: dy/dx = x²y² (separable form)", "ans": "y = -1/(x³/3 + C)", "steps": [("Separate: dy/y² = x²dx", 0.5), ("Integrate: -1/y = x³/3 + C → y = -1/(x³/3 + C)", 0.5)]},
                ],
                "sa": [
                    {"text": "Solve: dy/dx + 2y = e^(-x)", "ans": "y = (x+C)e^(-2x)", "steps": [("IF = e^(∫2dx) = e^(2x)", 0.5), ("Multiply: d/dx(ye^(2x)) = e^x. Integrate: ye^(2x) = e^x + C", 0.5), ("y = e^(-x) + Ce^(-2x)", 0.5)]},
                ],
                "la": [],
            },
            "LPP": {
                "mcq": [
                    {"text": "In LPP, the feasible region is always:", "opts": ["Unbounded", "Convex polygon", "Concave", "Circular"], "ans": "Convex polygon", "steps": [("Feasible region defined by linear constraints is a convex polygon", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Matrices": {
                "mcq": [
                    {"text": "If A = [[1,2],[3,4]], det(A) =:", "opts": ["-2", "-1", "2", "10"], "ans": "-2", "steps": [("det(A) = ad-bc = 1(4) - 2(3) = 4-6 = -2", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
        "Algebra": {
            "Matrices": {
                "mcq": [
                    {"text": "If A = [[1,2],[3,4]], det(A) =:", "opts": ["-2", "-1", "2", "10"], "ans": "-2", "steps": [("det(A) = 1(4) - 2(3) = -2", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Probability": {
                "mcq": [
                    {"text": "Probability of getting sum 7 with two dice:", "opts": ["1/6", "1/12", "5/36", "1/4"], "ans": "1/6", "steps": [("Favorable: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. Total = 36. P = 6/36 = 1/6", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Determinants": {
                "mcq": [
                    {"text": "If |A| = 5, then |2A| for 2×2 matrix is:", "opts": ["5", "10", "20", "25"], "ans": "20", "steps": [("|kA| = k^n|A| = 2²(5) = 20 for 2×2", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
        "Coordinate Geometry": {
            "Straight Lines": {
                "mcq": [
                    {"text": "Distance of point (3,4) from line 3x+4y=20 is:", "opts": ["0", "1", "2", "3"], "ans": "1", "steps": [("d = |3(3)+4(4)-20|/√(3²+4²) = |9+16-20|/5 = 5/5 = 1", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Circles": {
                "mcq": [
                    {"text": "Radius of circle x²+y²+6x-4y+9=0 is:", "opts": ["2", "3", "4", "5"], "ans": "2", "steps": [("(x+3)²+(y-2)² = 4+4-9+9 = 4 → r²=4 → r=2", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
        "Trigonometry": {
            "Identities": {
                "mcq": [
                    {"text": "Value of sin(75°) is:", "opts": ["(√6+√2)/4", "(√6-√2)/4", "√3/2", "1/√2"], "ans": "(√6+√2)/4", "steps": [("sin(75°) = sin(45°+30°) = sin45cos30+cos45sin30 = (√2/2)(√3/2)+(√2/2)(1/2) = (√6+√2)/4", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Inverse Trig": {
                "mcq": [
                    {"text": "tan⁻¹(1) + tan⁻¹(2) + tan⁻¹(3) =:", "opts": ["π", "π/2", "π/4", "0"], "ans": "π", "steps": [("Using identity: tan⁻¹(1)+tan⁻¹(2)+tan⁻¹(3) = π", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
        "Vectors": {
            "Scalar Triple Product": {
                "mcq": [
                    {"text": "Scalar triple product a·(b×c) equals:", "opts": ["a×b·c", "Volume of parallelepiped", "Zero always", "|a||b||c|"], "ans": "Volume of parallelepiped", "steps": [("a·(b×c) = volume of parallelepiped formed by a,b,c", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Lines and Planes": {
                "mcq": [
                    {"text": "Angle between lines with direction ratios (1,2,3) and (2,3,4):", "opts": ["0°", "30°", "45°", "cos⁻¹(20/√294)"], "ans": "cos⁻¹(20/√294)", "steps": [("cosθ = |l1l2+m1m2+n1n2|/(√(l1²+m1²+n1²)·√(l2²+m2²+n2²))", 0.5), ("= |2+6+12|/(√14·√29) = 20/√406", 0.5)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
    },
    "Physics": {
        "Electrostatics": {
            "Coulomb's Law": {
                "mcq": [
                    {"text": "Force between charges 1μC and 2μC at 0.1m in vacuum:", "opts": ["0.9 N", "1.8 N", "0.45 N", "2.7 N"], "ans": "1.8 N", "steps": [("F = kq₁q₂/r² = (9×10⁹)(1×10⁻⁶)(2×10⁻⁶)/(0.1)² = 18×10⁻⁷/0.01 = 1.8 N", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Electric Field": {
                "mcq": [
                    {"text": "Electric field at distance r from charge q is:", "opts": ["kq/r", "kq/r²", "kq²/r", "kq²/r²"], "ans": "kq/r²", "steps": [("E = kq/r² (Coulomb's law per unit charge)", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Capacitors": {
                "mcq": [
                    {"text": "Equivalent capacitance of 2C, 2C in parallel is:", "opts": ["C", "2C", "4C", "C/2"], "ans": "4C", "steps": [("Parallel: C_eq = C₁+C₂ = 2C+2C = 4C", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
        "Current Electricity": {
            "Kirchhoff's Laws": {
                "mcq": [
                    {"text": "Kirchhoff's current law is based on:", "opts": ["Conservation of charge", "Conservation of energy", "Ohm's law", "Coulomb's law"], "ans": "Conservation of charge", "steps": [("KCL: ΣI = 0 at a junction, derived from charge conservation", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
        "Magnetic Effects": {
            "Biot-Savart": {
                "mcq": [
                    {"text": "B at center of circular coil radius R, n turns, current I:", "opts": ["μ₀nI/R", "μ₀nI/(2R)", "μ₀nI/(4πR)", "μ₀I/(2R)"], "ans": "μ₀nI/(2R)", "steps": [("B = μ₀nI/(2R) for circular loop at center", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Force on Conductor": {
                "mcq": [
                    {"text": "Force on wire length L, current I, in field B, parallel to B:", "opts": ["ILB", "ILBsin(90°)", "0", "ILBcos(0°)"], "ans": "ILB", "steps": [("F = ILBsin(θ). θ=0° means F=0... wait, let me recalculate", 0.5), ("If parallel, θ=0°→F=0. If perpendicular, θ=90°→F=ILB", 0.5)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
        "Electromagnetic Induction": {
            "Faraday's Law": {
                "mcq": [
                    {"text": "Induced emf in coil of N turns, flux change ΔΦ in time Δt:", "opts": ["N·ΔΦ/Δt", "ΔΦ/(N·Δt)", "N·Δt/ΔΦ", "ΔΦ/N"], "ans": "N·ΔΦ/Δt", "steps": [("ε = -N·dΦ/dt = -N·ΔΦ/Δt (Faraday's law)", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Lenz's Law": {
                "mcq": [
                    {"text": "Lenz's law is based on:", "opts": ["Conservation of charge", "Conservation of energy", "Conservation of momentum", "Conservation of mass"], "ans": "Conservation of energy", "steps": [("Lenz's law ensures induced current opposes the cause — conservation of energy", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
        "Optics": {
            "Refraction": {
                "mcq": [
                    {"text": "Lateral shift when light passes through glass slab:", "opts": ["Zero", "Non-zero", "Equal to thickness", "Infinite"], "ans": "Non-zero", "steps": [("Lateral shift d = t·sin(i-r)/cos(r) ≠ 0 when i ≠ r", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Lenses": {
                "mcq": [
                    {"text": "Lens formula: 1/f = 1/v - 1/u uses sign convention:", "opts": ["Cartesian", "Real is positive", "Real is negative", "Both positive"], "ans": "Real is positive", "steps": [("New Cartesian: object distance = -ve, image = +ve if real", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Interference": {
                "mcq": [
                    {"text": "Fringe width β in YDSE is:", "opts": ["λD/d", "λd/D", "D/λd", "λDd"], "ans": "λD/d", "steps": [("β = λD/d where D=screen distance, d=slit separation", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
        "Modern Physics": {
            "Photoelectric": {
                "mcq": [
                    {"text": "Photoelectric effect proves light has:", "opts": ["Wave nature", "Particle nature", "Both", "Neither"], "ans": "Particle nature", "steps": [("Ejection of electrons by photon packets demonstrates particle nature", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Bohr Model": {
                "mcq": [
                    {"text": "Energy of electron in nth orbit of hydrogen:", "opts": ["-13.6/n² eV", "-13.6/n eV", "13.6/n² eV", "-13.6 eV"], "ans": "-13.6/n² eV", "steps": [("E_n = -13.6/n² eV for hydrogen atom (Bohr model)", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
    },
    "Chemistry": {
        "Electrochemistry": {
            "Nernst Equation": {
                "mcq": [
                    {"text": "Nernst equation for Cu²⁺/Cu at 25°C, [Cu²⁺]=0.01M:", "opts": ["0.34 V", "0.28 V", "0.40 V", "0.22 V"], "ans": "0.28 V", "steps": [("E = E° - (0.059/2)log(1/[Cu²⁺]) = 0.34 - 0.0295·log(100) = 0.34 - 0.059 = 0.281V", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
            "Electrochemical Cells": {
                "mcq": [
                    {"text": "In Daniel cell, Zn is the:", "opts": ["Cathode", "Anode", "Salt bridge", "Electrolyte"], "ans": "Anode", "steps": [("Zn oxidizes (Zn → Zn²⁺ + 2e⁻) → anode", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
        "Chemical Kinetics": {
            "Rate Law": {
                "mcq": [
                    {"text": "For 1st order reaction, t½ is:", "opts": ["Independent of [A]", "Proportional to [A]", "Inversely proportional to k", "Both a and c"], "ans": "Independent of [A]", "steps": [("t½ = 0.693/k (independent of initial concentration for 1st order)", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
        "Solutions": {
            "Osmotic Pressure": {
                "mcq": [
                    {"text": "Osmotic pressure π = iCRT. For 0.1M glucose (i=1) at 300K:", "opts": ["2.47 atm", "4.92 atm", "0.247 atm", "24.7 atm"], "ans": "2.47 atm", "steps": [("π = 1 × 0.1 × 0.082 × 300 = 2.46 atm", 1.0)]},
                ],
                "vsa": [], "sa": [], "la": [],
            },
        },
    },
}


# ─────────────────────────────────────────────
# Service
# ─────────────────────────────────────────────
class ExamService:
    """ISC Exam Simulator — create, submit, grade, analyze."""

    def __init__(self, db: AsyncSession, question_bank: Optional[Dict] = None):
        self.db = db
        self._qb = question_bank or _QB

    # ── Core public API ──────────────────────────

    async def create_exam(
        self,
        student_id: int,
        subject: str,
        exam_type: str = "isc_board",
        class_level: int = 12,
    ) -> PaperResponse:
        """Generate a fresh ISC exam paper and return it.

        Subjects outside the hardcoded _QB (electives: acc/bs/psy/bio/etc)
        generate from the BoardQuestion bank instead of placeholder
        fallback questions.
        """
        session_code = self._make_session_code()
        seed = secrets.randbits(31)
        sections = self._get_section_config(subject)

        # Persist session
        session = ExamSessionDB(
            session_code=session_code,
            student_id=student_id,
            subject=subject,
            exam_type=exam_type,
            total_marks=ISCConfig.TOTAL_MARKS,
            total_time_minutes=ISCConfig.TOTAL_TIME_MINUTES,
            section_config=json.dumps([s.model_dump() for s in sections]),
            time_remaining_seconds=ISCConfig.TOTAL_TIME_MINUTES * 60,
            status=ExamStatus.CREATED,
        )
        self.db.add(session)
        await self.db.flush()

        questions = await self._generate_questions(seed, subject, class_level)
        if not questions:
            raise ValueError(f"Subject '{subject}' not supported.")
        questions_json = json.dumps([q.model_dump() for q in questions])

        paper = ExamPaperDB(
            session_id=session.id,
            subject=subject,
            seed=seed,
            questions=questions_json,
            total_marks=ISCConfig.TOTAL_MARKS,
        )
        self.db.add(paper)
        await self.db.commit()
        await self.db.refresh(session)

        return PaperResponse(
            session_id=session.id,
            session_code=session.session_code,
            subject=session.subject,
            exam_type=session.exam_type,
            total_marks=session.total_marks,
            total_time_minutes=session.total_time_minutes,
            sections=sections,
            questions=questions,
        )

    async def submit_exam(
        self,
        session_id: int,
        answers: List[AnswerInput],
    ) -> ExamResultResponse:
        """Grade the exam, compute analysis, persist result, return full report."""
        session = await self._get_session(session_id)
        if session.status == ExamStatus.GRADED:
            return await self.get_exam_result(session_id)
        if session.status == ExamStatus.EXPIRED:
            raise ValueError("Exam session has expired.")

        # Load paper
        stmt = __import__("sqlalchemy").select(ExamPaperDB).where(
            ExamPaperDB.session_id == session_id
        )
        res = await self.db.execute(stmt)
        paper = res.scalar_one_or_none()
        if not paper:
            raise ValueError("Exam paper not found.")

        paper_questions: List[QuestionData] = [
            QuestionData(**q) for q in json.loads(paper.questions)
        ]

        # Build lookup by question_id
        qmap: Dict[str, QuestionData] = {q.question_id: q for q in paper_questions}

        # Grade each answer
        graded: List[GradedQuestion] = []
        for ans in answers:
            q = qmap.get(ans.question_id)
            if q is None:
                continue
            gq = self._grade_question(q, ans.answer, ans.time_taken_seconds)
            graded.append(gq)

        # Sort by question_number for presentation
        graded.sort(key=lambda x: x.question_number)

        # ── Analytics ──
        section_marks = self._compute_section_marks(graded)
        topic_marks = self._compute_topic_marks(graded)
        weak_topics = [t.topic for t in topic_marks if t.percentage < 50]
        time_analysis = self._compute_time_analysis(answers, paper_questions)
        strategy = self._build_strategy(session.student_id, session.subject,
                                        section_marks, topic_marks, time_analysis)

        obtained = sum(g.awarded_marks for g in graded)
        total = sum(g.max_marks for g in graded)
        pct = round((obtained / total) * 100, 2) if total else 0.0
        grade = self._isc_grade(pct)

        attempted = sum(1 for g in graded if g.status != GradingStatus.NOT_ATTEMPTED)
        correct = sum(1 for g in graded if g.status == GradingStatus.CORRECT)
        partial = sum(1 for g in graded if g.status == GradingStatus.PARTIAL)
        incorrect = sum(1 for g in graded if g.status == GradingStatus.INCORRECT)
        not_attempted = sum(1 for g in graded if g.status == GradingStatus.NOT_ATTEMPTED)

        total_time_s = sum(a.time_taken_seconds or 0 for a in answers)
        ideal_time_s = ISCConfig.TOTAL_TIME_MINUTES * 60
        time_efficiency = round(total_time_s / ideal_time_s, 2) if ideal_time_s else 0.0
        avg_time_per_mark = round(total_time_s / obtained, 1) if obtained > 0 else float(total_time_s)

        summary = ExamSummary(
            total_marks=total,
            obtained_marks=round(obtained, 2),
            percentage=pct,
            grade=grade,
            passed=obtained >= total * 0.33,
            attempted_questions=attempted,
            total_questions=len(graded),
            correct_questions=correct,
            partial_questions=partial,
            incorrect_questions=incorrect,
            not_attempted_questions=not_attempted,
            time_efficiency_ratio=time_efficiency,
            avg_time_per_mark=avg_time_per_mark,
        )

        # Persist result
        result = ExamResultDB(
            session_id=session.id,
            student_id=session.student_id,
            subject=session.subject,
            total_marks=total,
            obtained_marks=obtained,
            percentage=pct,
            grade=grade,
            section_marks=json.dumps([s.model_dump() for s in section_marks]),
            topic_marks=json.dumps([t.model_dump() for t in topic_marks]),
            graded_questions=json.dumps([g.model_dump() for g in graded]),
            time_analysis=time_analysis.model_dump_json(),
            strategy=strategy.model_dump_json(),
            weak_topics=json.dumps(weak_topics),
        )
        self.db.add(result)
        session.obtained_marks = obtained
        session.percentage = pct
        session.grade = grade
        session.status = ExamStatus.SUBMITTED
        session.submitted_at = datetime.now(timezone.utc)
        await self.db.commit()

        return ExamResultResponse(
            session_id=session.id,
            session_code=session.session_code,
            student_id=session.student_id,
            subject=session.subject,
            exam_type=session.exam_type,
            submitted_at=session.submitted_at.isoformat(),
            summary=summary,
            section_marks=section_marks,
            topic_marks=topic_marks,
            graded_questions=graded,
            time_analysis=time_analysis,
            strategy=strategy,
        )

    async def get_exam_result(self, session_id: int) -> ExamResultResponse:
        """Retrieve cached result for a previously-graded exam."""
        stmt = __import__("sqlalchemy").select(ExamResultDB).where(
            ExamResultDB.session_id == session_id
        )
        res = await self.db.execute(stmt)
        result = res.scalar_one_or_none()
        if not result:
            raise ValueError("Result not found — exam may not have been submitted yet.")

        graded = [GradedQuestion(**g) for g in json.loads(result.graded_questions)]
        section_marks = [SectionMarkSummary(**s) for s in json.loads(result.section_marks)]
        topic_marks = [TopicMarkSummary(**t) for t in json.loads(result.topic_marks)]
        ta = TimeAnalysisDetail(**json.loads(result.time_analysis))
        strategy = ExamStrategyResponse(**json.loads(result.strategy))

        total = result.total_marks
        obtained = result.obtained_marks
        correct = sum(1 for g in graded if g.status == GradingStatus.CORRECT)
        partial = sum(1 for g in graded if g.status == GradingStatus.PARTIAL)
        incorrect = sum(1 for g in graded if g.status == GradingStatus.INCORRECT)
        not_attempted = sum(1 for g in graded if g.status == GradingStatus.NOT_ATTEMPTED)
        ideal_time_s = ISCConfig.TOTAL_TIME_MINUTES * 60
        time_efficiency = round(ta.total_time_minutes * 60 / ideal_time_s, 2) if ideal_time_s else 0.0
        avg_tpm = round((ta.total_time_minutes * 60) / obtained, 1) if obtained > 0 else 0.0

        summary = ExamSummary(
            total_marks=total,
            obtained_marks=obtained,
            percentage=result.percentage,
            grade=result.grade,
            passed=obtained >= total * 0.33,
            attempted_questions=len(graded) - not_attempted,
            total_questions=len(graded),
            correct_questions=correct,
            partial_questions=partial,
            incorrect_questions=incorrect,
            not_attempted_questions=not_attempted,
            time_efficiency_ratio=time_efficiency,
            avg_time_per_mark=avg_tpm,
        )

        stmt2 = __import__("sqlalchemy").select(ExamSessionDB).where(
            ExamSessionDB.id == session_id
        )
        res2 = await self.db.execute(stmt2)
        session = res2.scalar_one_or_none()

        return ExamResultResponse(
            session_id=session_id,
            session_code=session.session_code if session else "",
            student_id=result.student_id,
            subject=result.subject,
            exam_type=session.exam_type if session else "isc_board",
            submitted_at=result.submitted_at.isoformat(),
            summary=summary,
            section_marks=section_marks,
            topic_marks=topic_marks,
            graded_questions=graded,
            time_analysis=ta,
            strategy=strategy,
        )

    async def get_exam_strategy(
        self, student_id: int, subject: str
    ) -> ExamStrategyResponse:
        """Personalized exam strategy from the most recent exam result."""
        stmt = __import__("sqlalchemy").select(ExamResultDB).where(
            ExamResultDB.student_id == student_id,
            ExamResultDB.subject == subject,
        ).order_by(ExamResultDB.submitted_at.desc()).limit(1)
        res = await self.db.execute(stmt)
        result = res.scalar_one_or_none()
        if not result:
            return self._default_strategy(student_id, subject)

        sm = [SectionMarkSummary(**s) for s in json.loads(result.section_marks)]
        tm = [TopicMarkSummary(**t) for t in json.loads(result.topic_marks)]
        ta = TimeAnalysisDetail(**json.loads(result.time_analysis))
        return self._build_strategy(student_id, subject, sm, tm, ta)

    async def get_time_analysis(self, session_id: int) -> TimeAnalysisDetail:
        """Time management breakdown for a specific exam session."""
        stmt = __import__("sqlalchemy").select(ExamResultDB).where(
            ExamResultDB.session_id == session_id
        )
        res = await self.db.execute(stmt)
        result = res.scalar_one_or_none()
        if not result:
            raise ValueError("Result not found for this session.")
        return TimeAnalysisDetail(**json.loads(result.time_analysis))

    # ── Grading Engine ──────────────────────────

    def _grade_question(
        self, q: QuestionData, student_answer: str, time_s: int
    ) -> GradedQuestion:
        sa = (student_answer or "").strip()
        if not sa:
            return self._mk_graded(
                q, "", GradingStatus.NOT_ATTEMPTED, 0,
                feedback="Not attempted",
            )

        steps = q.model_dump().get("steps", [])
        correct_steps = 0
        total_steps = len(steps)

        if steps:
            for i, (desc, weight) in enumerate(steps):
                if self._step_matched(sa, desc):
                    correct_steps += 1
            pct_correct = correct_steps / total_steps if total_steps else 0

            if pct_correct >= 0.9:
                status = GradingStatus.CORRECT
                awarded = round(q.marks * pct_correct, 2)
                feedback = "Fully correct — all key steps identified."
            elif pct_correct >= 0.35:
                status = GradingStatus.PARTIAL
                awarded = round(q.marks * pct_correct, 2)
                feedback = (f"Partially correct ({correct_steps}/{total_steps} steps). "
                            f"Review steps {[i+1 for i,(d,w) in enumerate(steps) if not self._step_matched(sa, d)]}.")
            else:
                status = GradingStatus.INCORRECT
                awarded = round(q.marks * 0.05, 2)
                # a grader-prose key can't be quoted back to the student
                expected = scrub_answer_key(q.correct_answer)
                feedback = (f"Incorrect. Expected: {expected}"
                            if expected else "Incorrect.")
        else:
            # No step rubric — direct answer match
            if self._answer_matches(sa, str(q.correct_answer)):
                status = GradingStatus.CORRECT
                awarded = q.marks
                feedback = "Correct answer."
            else:
                status = GradingStatus.INCORRECT
                awarded = 0.0
                # a grader-prose key can't be quoted back to the student
                expected = scrub_answer_key(q.correct_answer)
                feedback = (f"Incorrect. Expected: {expected}"
                            if expected else "Incorrect.")

        rubric = self._build_rubric(steps, sa)
        return self._mk_graded(q, sa, status, awarded, feedback, rubric)

    def _mk_graded(
        self, q: QuestionData, sa: str, status: str,
        awarded: float, feedback: str, rubric: Optional[List[GradedStep]] = None,
    ) -> GradedQuestion:
        return GradedQuestion(
            question_id=q.question_id,
            question_number=q.question_number,
            section_id=q.section_id,
            topic=q.topic,
            marks=q.marks,
            student_answer=sa,
            correct_answer=q.correct_answer,
            status=status,
            awarded_marks=awarded,
            max_marks=q.marks,
            feedback=feedback,
            rubric=rubric or [],
        )

    def _build_rubric(
        self, steps: list, student_answer: str
    ) -> List[GradedStep]:
        rubric = []
        if not steps:
            return rubric
        per_step = sum(w for _, w in steps) / len(steps)
        for i, (desc, _) in enumerate(steps):
            matched = self._step_matched(student_answer, desc)
            rubric.append(GradedStep(
                step_number=i + 1,
                description=desc,
                max_marks=round(per_step, 2),
                awarded_marks=round(per_step, 2) if matched else 0.0,
                is_correct=matched,
            ))
        return rubric

    # ── Answer Matching ─────────────────────────

    def _answer_matches(self, student: str, correct: str) -> bool:
        s = student.strip().lower()
        c = correct.strip().lower()
        if s == c:
            return True
        try:
            sv = float(s.replace(" ", "").replace("v", ""))
            cv = float(c.replace(" ", "").replace("v", ""))
            tol = max(ISCConfig.NUMERIC_ABS_TOL,
                       abs(cv) * ISCConfig.NUMERIC_REL_TOL)
            return abs(sv - cv) <= tol
        except (ValueError, TypeError):
            pass
        return c in s or s in c

    def _step_matched(self, student_answer: str, step_desc: str) -> bool:
        sa = student_answer.lower()
        sd = step_desc.lower()
        # Extract formula/keywords from step description
        math_syms = ["=", "+", "-", "×", "÷", "^", "√",
                      "∫", "∂", "sin", "cos", "tan", "log",
                      "dx", "dy", "d/dx", "lim", "∑", "π",
                      "/", "*", "**"]
        tokens = []
        current = []
        for ch in sd:
            if ch.isalnum():
                current.append(ch)
            else:
                if current:
                    tokens.append("".join(current))
                    current = []
                if ch.strip():
                    tokens.append(ch)
        if current:
            tokens.append("".join(current))

        # Require at least 60% of meaningful tokens to be present
        alpha_tokens = [t for t in tokens if any(c.isalpha() for c in t) and len(t) > 1]
        if not alpha_tokens:
            return True
        matched = sum(1 for t in alpha_tokens if t in sa)
        return matched / len(alpha_tokens) >= 0.5

    # ── Section & Topic Analysis ─────────────────

    def _compute_section_marks(
        self, graded: List[GradedQuestion]
    ) -> List[SectionMarkSummary]:
        sec_map: Dict[str, Dict] = {}
        for g in graded:
            sid = g.section_id
            if sid not in sec_map:
                sec_map[sid] = {"total": 0, "obtained": 0,
                                "attempted": 0, "count": 0}
            d = sec_map[sid]
            d["total"] += g.max_marks
            d["obtained"] += g.awarded_marks
            d["count"] += 1
            if g.status != GradingStatus.NOT_ATTEMPTED:
                d["attempted"] += 1

        names = {"A": "Section A (Compulsory)",
                 "B1": "Section B1", "B2": "Section B2", "B3": "Section B3"}
        return [
            SectionMarkSummary(
                section_id=sid,
                name=names.get(sid, sid),
                total_marks=d["total"],
                obtained_marks=round(d["obtained"], 2),
                percentage=round((d["obtained"] / d["total"]) * 100, 2) if d["total"] else 0.0,
                attempted=d["attempted"],
                total_questions=d["count"],
            )
            for sid, d in sorted(sec_map.items())
        ]

    def _compute_topic_marks(
        self, graded: List[GradedQuestion]
    ) -> List[TopicMarkSummary]:
        top_map: Dict[str, Dict] = {}
        for g in graded:
            if g.topic not in top_map:
                top_map[g.topic] = {"total": 0, "obtained": 0,
                                     "attempted": 0, "count": 0}
            d = top_map[g.topic]
            d["total"] += g.max_marks
            d["obtained"] += g.awarded_marks
            d["count"] += 1
            if g.status != GradingStatus.NOT_ATTEMPTED:
                d["attempted"] += 1

        return [
            TopicMarkSummary(
                topic=topic,
                total_marks=d["total"],
                obtained_marks=round(d["obtained"], 2),
                percentage=round((d["obtained"] / d["total"]) * 100, 2) if d["total"] else 0.0,
                questions_attempted=d["attempted"],
                total_questions=d["count"],
            )
            for topic, d in sorted(top_map.items(),
                                   key=lambda x: x[1]["obtained"] / max(x[1]["total"], 1))
        ]

    def _compute_time_analysis(
        self, answers: List[AnswerInput], questions: List[QuestionData]
    ) -> TimeAnalysisDetail:
        qmap = {q.question_id: q for q in questions}
        qtd: List[QuestionTimeDetail] = []
        sec_times: Dict[str, List[int]] = {}
        total_time_s = 0

        for ans in answers:
            q = qmap.get(ans.question_id)
            if not q:
                continue
            ts = ans.time_taken_seconds or 0
            total_time_s += ts
            suggested = self._suggested_seconds(q.marks, q.section_id)
            overrun = max(0, ts - suggested)
            pct_over = round((overrun / suggested) * 100, 1) if suggested else 0.0

            warning = None
            if ts > suggested * ISCConfig.MAX_STUDENT_TIME_RATIO:
                warning = (f"Spent {ts//60}m{ts%60}s on a {q.marks}-mark question. "
                           f"Suggested: {suggested//60}m. Review approach speed.")

            qtd.append(QuestionTimeDetail(
                question_id=ans.question_id,
                question_number=q.question_number,
                section_id=q.section_id,
                topic=q.topic,
                marks=q.marks,
                time_taken_seconds=ts,
                time_suggested_seconds=suggested,
                time_overrun_seconds=overrun,
                time_overrun_pct=pct_over,
                warning=warning,
            ))

            sec_times.setdefault(q.section_id, []).append(ts)

        section_details: List[SectionTimeDetail] = []
        warnings: List[str] = []
        for sid, times in sec_times.items():
            actual_min = sum(times) / 60
            ideal_min = ISCConfig.TOTAL_TIME_MINUTES * ISCConfig.SECTION_TIME_PCT.get(sid, 0.2)
            overrun_min = max(0, actual_min - ideal_min)
            ratio = actual_min / ideal_min if ideal_min else 1
            if ratio > 1.2:
                warnings.append(
                    f"Section {sid}: spent {actual_min:.0f}m vs suggested {ideal_min:.0f}m. "
                    f"Reduce time here by ~{overrun_min:.0f}m."
                )
            if ratio < 0.5:
                warnings.append(
                    f"Section {sid}: only {actual_min:.0f}m spent (suggested {ideal_min:.0f}m). "
                    f"Revisit your answers in this section."
                )
            section_details.append(SectionTimeDetail(
                section_id=sid,
                name={"A": "Section A", "B1": "Section B1",
                      "B2": "Section B2", "B3": "Section B3"}.get(sid, sid),
                time_suggested_minutes=int(ideal_min),
                actual_time_minutes=round(actual_min, 1),
                overrun_minutes=round(overrun_min, 1),
                efficiency_rating=("Good" if ratio < 1.15 else
                                   "Slightly over" if ratio < 1.4 else
                                   "Significantly over"),
            ))

        total_time_min = total_time_s / 60
        efficiency = round(180 / total_time_min, 2) if total_time_min > 0 else 0.0
        time_score = max(0.0, min(100.0,
            100 - (total_time_min - 180) * 0.3 - sum(1 for q in qtd if q.warning) * 5))

        return TimeAnalysisDetail(
            total_time_minutes=round(total_time_min, 1),
            ideal_time_minutes=180,
            overall_efficiency=round(efficiency, 2),
            sections=section_details,
            question_times=qtd,
            warnings=warnings,
            time_management_score=round(time_score, 1),
        )

    # ── Strategy Builder ────────────────────────

    def _build_strategy(
        self,
        student_id: int,
        subject: str,
        section_marks: List[SectionMarkSummary],
        topic_marks: List[TopicMarkSummary],
        time_analysis: TimeAnalysisDetail,
    ) -> ExamStrategyResponse:

        # Section priorities
        sec_pri: Dict[str, str] = {}
        for s in section_marks:
            if s.percentage >= 75:
                sec_pri[s.section_id] = "Maintain — strong performance, don't be complacent."
            elif s.percentage >= 40:
                sec_pri[s.section_id] = "Improve — revise key concepts and practice more questions."
            else:
                sec_pri[s.section_id] = "Critical — needs urgent attention. Re-learn fundamentals."

        # Topic recommendations
        weak = [t for t in topic_marks if t.percentage < 50]
        strong = [t for t in topic_marks if t.percentage >= 75]
        topic_recs = [
            {
                "topic": t.topic,
                "score_pct": t.percentage,
                "action": (
                    "Focus here — solve 20+ problems daily" if t.percentage < 30 else
                    "Revise concepts and practice 10+ problems daily" if t.percentage < 60 else
                    "Good! Solve 5 advanced problems to stay sharp"
                ),
                "priority": "high" if t.percentage < 40 else
                             "medium" if t.percentage < 70 else "low",
            }
            for t in topic_marks
        ]

        # Time management tips
        time_tips = []
        slow_qs = [q for q in time_analysis.question_times
                    if q.time_overrun_pct > 50]
        if slow_qs:
            topics_slow = {}
            for q in slow_qs:
                topics_slow[q.topic] = topics_slow.get(q.topic, 0) + 1
            for tp, cnt in topics_slow.items():
                time_tips.append(
                    f"Slow on '{tp}' questions — {cnt} question(s) exceeded suggested time. "
                    f"Practice timed problem-solving for this topic."
                )

        if time_analysis.total_time_minutes > 170:
            time_tips.append(
                "Overall exam took too long. Practice full-length papers under strict "
                "3-hour conditions to build speed."
            )
        elif time_analysis.total_time_minutes < 120:
            time_tips.append(
                "You finished too quickly — recheck answers! In board exams, "
                "spend remaining time verifying calculations."
            )

        for sec in time_analysis.sections:
            if sec.efficiency_rating == "Significantly over":
                time_tips.append(
                    f"Section {sec.section_id} took {sec.actual_time_minutes:.0f}m vs "
                    f"suggested {sec.time_suggested_minutes}m. "
                    f"Set a personal timer — move on after {sec.time_suggested_minutes}m."
                )

        if not time_tips:
            time_tips.append(
                "Good time management! Maintain this pace in future exams."
            )

        # Question selection strategy
        q_strat: List[str] = []
        if weak:
            weak_names = ", ".join(t.topic for t in weak[:3])
            q_strat.append(
                f"Weak topics: {weak_names}. Start with questions on these — "
                f"they carry high marks and early momentum builds confidence."
            )
        if strong:
            str_names = ", ".join(t.topic for t in strong[:3])
            q_strat.append(
                f"Strong topics ({str_names}): use these to build marks quickly "
                f"in the first 45 minutes."
            )
        q_strat.append(
            "In Section B, choose the option where you know at least 3 out of 5 questions well. "
            "Don't pick a section just because one question looks easy."
        )
        q_strat.append(
            "Attempt all compulsory Section A questions first — don't leave any blank. "
            "Even partial steps earn ISC step marks."
        )
        q_strat.append(
            "In Section B, solve only the required number of questions. "
            "Extra solved questions are NOT evaluated — save time by skipping them."
        )

        # Exam day tips
        day_tips = [
            "Carry your admit card, pen (black/blue), geometry box, and calculator (if allowed).",
            "Read the entire paper for 15 minutes before writing — plan your time allocation.",
            "Attempt questions in order, but flag difficult ones and return later.",
            "Always write the formula before substituting values — ISC awards step marks.",
            "Draw neat, labelled diagrams in Physics/Chemistry/Biology — diagrams carry marks!",
            "Manage your rough work space — keep it separate from answer sheet margins.",
            "If stuck on a question for >5 minutes, move on. Come back if time permits.",
        ]

        overall_percentage = round(
            sum(s.obtained_marks for s in section_marks) /
            max(sum(s.total_marks for s in section_marks), 1) * 100, 2
        ) if section_marks else 0.0
        return ExamStrategyResponse(
            student_id=student_id,
            subject=subject,
            generated_at=datetime.now(timezone.utc).isoformat(),
            overall_grade=self._isc_grade(overall_percentage),
            overall_percentage=overall_percentage,
            section_priorities=sec_pri,
            topic_recommendations=topic_recs,
            time_management_tips=time_tips,
            question_selection_strategy=q_strat,
            exam_day_tips=day_tips,
            weak_topics=[t.topic for t in topic_marks if t.percentage < 50],
            strong_topics=[t.topic for t in topic_marks if t.percentage >= 75],
        )

    def _default_strategy(
        self, student_id: int, subject: str
    ) -> ExamStrategyResponse:
        """Return a generic strategy when no prior result exists."""
        tc = TOPIC_CONFIG.get(subject, {})
        all_topics = [t for topics in tc.values() for t in topics]
        recs = [
            {
                "topic": t,
                "score_pct": None,
                "action": "Take a diagnostic test to assess current level. Then practice 15 questions daily.",
                "priority": "medium",
            }
            for t in all_topics[:8]
        ]
        return ExamStrategyResponse(
            student_id=student_id,
            subject=subject,
            generated_at=datetime.now(timezone.utc).isoformat(),
            overall_grade="N/A",
            overall_percentage=0.0,
            section_priorities={
                k: "Take a diagnostic test to identify strengths and weaknesses."
                for k in ["A", "B1", "B2", "B3"]
            },
            topic_recommendations=recs,
            time_management_tips=[
                "Practice full-length papers under timed conditions.",
                "Set internal time targets: Section A in 63 min, each B-section in 36 min.",
                "Always write formulas even if you can't solve fully — ISC awards steps.",
            ],
            question_selection_strategy=[
                "In Section B, choose options where you know at least 3 of 5 questions.",
                "Start with Section A to build confidence and secure easy marks.",
                "Mark difficult questions and return to them in the final 30 minutes.",
            ],
            exam_day_tips=[
                "Arrive at the exam center 30 minutes early.",
                "Read the question paper carefully before starting.",
                "Write neatly and label all diagrams.",
                "Keep 5 minutes at the end to review all answers.",
            ],
            weak_topics=[],
            strong_topics=[],
        )

    # ── Question Generation ─────────────────────

    def _get_section_config(self, subject: str) -> List[SectionConfig]:
        if subject == "Mathematics":
            return [
                SectionConfig(
                    section_id="A", name="Section A — Compulsory",
                    is_compulsory=True, num_questions=11, marks_per_question=2,
                    question_type=QuestionType.VERY_SHORT,
                    time_suggested_minutes=20,
                ),
                SectionConfig(
                    section_id="A", name="Section A — Compulsory",
                    is_compulsory=True, num_questions=7, marks_per_question=4,
                    question_type=QuestionType.SHORT,
                    time_suggested_minutes=42,
                ),
                SectionConfig(
                    section_id="A", name="Section A — Compulsory",
                    is_compulsory=True, num_questions=3, marks_per_question=6,
                    question_type=QuestionType.LONG,
                    time_suggested_minutes=54,
                ),
                SectionConfig(
                    section_id="B1", name="Section B1 — Option 1",
                    is_compulsory=False, num_questions=1, marks_per_question=10,
                    question_type=QuestionType.LONG,
                    choice=True, choices_available=3,
                    time_suggested_minutes=36,
                ),
                SectionConfig(
                    section_id="B2", name="Section B2 — Option 2",
                    is_compulsory=False, num_questions=1, marks_per_question=10,
                    question_type=QuestionType.LONG,
                    choice=True, choices_available=3,
                    time_suggested_minutes=36,
                ),
            ]
        else:
            return [
                SectionConfig(
                    section_id="A", name="Section A — Compulsory",
                    is_compulsory=True, num_questions=10, marks_per_question=2,
                    question_type=QuestionType.VERY_SHORT,
                    time_suggested_minutes=20,
                ),
                SectionConfig(
                    section_id="A", name="Section A — Compulsory",
                    is_compulsory=True, num_questions=5, marks_per_question=3,
                    question_type=QuestionType.SHORT,
                    time_suggested_minutes=30,
                ),
                SectionConfig(
                    section_id="A", name="Section A — Compulsory",
                    is_compulsory=True, num_questions=4, marks_per_question=5,
                    question_type=QuestionType.LONG,
                    time_suggested_minutes=60,
                ),
                SectionConfig(
                    section_id="B1", name="Section B — Option 1",
                    is_compulsory=False, num_questions=2, marks_per_question=8,
                    question_type=QuestionType.LONG,
                    choice=True, choices_available=3,
                    time_suggested_minutes=48,
                ),
                SectionConfig(
                    section_id="B2", name="Section B — Option 2",
                    is_compulsory=False, num_questions=2, marks_per_question=8,
                    question_type=QuestionType.LONG,
                    choice=True, choices_available=3,
                    time_suggested_minutes=48,
                ),
            ]

    async def _generate_questions(
        self, seed: int, subject: str, class_level: int = 12,
    ) -> List[QuestionData]:
        # Corpus-backed generation for electives and any subject the
        # hardcoded _QB doesn't cover — real board questions, real options
        # and answers, so submit grading is non-vacuous.
        if subject not in TOPIC_CONFIG:
            return await self._generate_questions_corpus(
                seed, subject, class_level)
        rng = SeededRNG(seed)
        tc = TOPIC_CONFIG.get(subject, {})
        qbank = self._qb.get(subject, {})
        qn = 1
        result: List[QuestionData] = []

        sections = self._get_section_config(subject)
        for sec in sections:
            for qi in range(sec.num_questions):
                q = self._pick_question(
                    rng, subject, qbank, tc,
                    sec.question_type, sec.marks_per_question,
                    sec.section_id, qn,
                )
                if q:
                    result.append(q)
                    qn += 1
        return result

    async def _generate_questions_corpus(
        self, seed: int, subject: str, class_level: int,
    ) -> List[QuestionData]:
        """Build the same QuestionData shape from board_questions rows."""
        try:
            from sqlalchemy import select as _select, func as _func
            from backend.models.enrichment import BoardQuestion
            subs = _EXAM_SUBJECT_ALIASES.get(
                subject.lower().replace(" ", "_"), [subject.lower()])
            # widen class_level by ±0 only — boards are class 10/12
            rows = (await self.db.execute(
                _select(BoardQuestion)
                .where(BoardQuestion.subject.in_(subs))
                .where(BoardQuestion.class_level == class_level)
                .where(BoardQuestion.correct_answer.isnot(None))
                .order_by(_func.random())
                .limit(80)
            )).scalars().all()
        except Exception:
            rows = []
        if not rows:
            return []

        rng = SeededRNG(seed)
        sections = self._get_section_config(subject)
        # bucket by marks so each section gets mark-appropriate questions
        def _fits(q, qtype):
            m = q.marks or 1
            if qtype in (QuestionType.VERY_SHORT,):
                return m <= 2
            if qtype in (QuestionType.SHORT,):
                return 2 < m <= 5
            return m > 3 or True  # LONG accepts anything remaining

        used: set = set()
        out: List[QuestionData] = []
        qn = 1
        for sec in sections:
            pool = [q for q in rows if q.id not in used and _fits(q, sec.question_type)]
            rng.shuffle(pool)
            for q in pool[: sec.num_questions + (sec.choices_available - 1 if getattr(sec, "choices_available", 0) else 0)]:
                used.add(q.id)
                opts = list(q.options or [])
                correct = str(q.correct_answer or "")
                correct_idx = opts.index(correct) if correct in opts else (0 if opts else None)
                out.append(QuestionData(
                    question_id=str(q.id),
                    question_number=qn,
                    section_id=sec.section_id,
                    question_type=sec.question_type,
                    marks=q.marks or sec.marks_per_question,
                    topic=str(q.chapter or subject),
                    subtopic=str(getattr(q, "section", "") or ""),
                    text=q.question_text,
                    options=opts or None,
                    correct_answer=correct,
                    correct_option_index=correct_idx,
                    internal_id=f"{subject[:3].upper()}_{qn}",
                ))
                qn += 1
        return out

    def _pick_question(
        self,
        rng: SeededRNG,
        subject: str,
        qbank: Dict,
        tc: Dict,
        qtype: str,
        marks: int,
        section_id: str,
        qn: int,
    ) -> Optional[QuestionData]:
        subj_bank = qbank.get(subject, {})
        eligible_topics = [t for t, subts in tc.items()
                          if self._topic_has(qtype, subj_bank.get(t, {}))]
        if not eligible_topics:
            eligible_topics = list(tc.keys())

        topic = rng.choice(eligible_topics)
        subts = tc.get(topic, ["General"])
        subtopic = rng.choice(subts)
        bank_topic = subj_bank.get(topic, {})
        bank_subtopic = bank_topic.get(subtopic, {})
        qlist = bank_subtopic.get(qtype, [])

        if not qlist:
            for t2, st2 in bank_topic.items():
                qlist = st2.get(qtype, [])
                if qlist:
                    break
        if not qlist:
            return self._fallback_question(rng, topic, subtopic, qtype, marks, section_id, qn)

        chosen = rng.choice(qlist)
        opts = rng.shuffle(chosen.get("opts", [])) if chosen.get("opts") else None
        correct = chosen["ans"]
        if opts:
            correct_idx = opts.index(correct) if correct in opts else 0
        else:
            correct_idx = 0

        return QuestionData(
            question_id=f"q_{section_id.lower()}_{qn}_{rng.randint(1000,9999)}",
            question_number=qn,
            section_id=section_id,
            question_type=qtype,
            marks=marks,
            topic=topic,
            subtopic=subtopic,
            text=chosen["text"],
            options=opts,
            correct_answer=correct,
            correct_option_index=correct_idx if opts else None,
            internal_id=f"{subject[:3].upper()}_{topic[:4]}_{qn}",
        )

    def _topic_has(self, qtype: str, topic_bank: Dict) -> bool:
        return any(
            bool(topic_bank.get(st, {}).get(qtype))
            for st in topic_bank
        )

    def _fallback_question(
        self, rng: SeededRNG, topic: str, subtopic: str,
        qtype: str, marks: int, section_id: str, qn: int
    ) -> QuestionData:
        fallback_texts = {
            QuestionType.MCQ: f"[MCQ] What is the primary concept of {subtopic} in {topic}?",
            QuestionType.VERY_SHORT: f"Define {subtopic} in the context of {topic}.",
            QuestionType.SHORT: f"Explain {subtopic} with an example from {topic}.",
            QuestionType.LONG: f"Discuss the principles of {subtopic} under {topic} with suitable examples and diagrams.",
        }
        return QuestionData(
            question_id=f"q_{section_id.lower()}_{qn}_{rng.randint(1000,9999)}",
            question_number=qn,
            section_id=section_id,
            question_type=qtype,
            marks=marks,
            topic=topic,
            subtopic=subtopic,
            text=fallback_texts.get(qtype, f"Question on {subtopic}."),
            options=None,
            correct_answer="Refer to textbook solution",
            internal_id=f"FALLBACK_{topic[:4]}_{qn}",
        )

    # ── Helpers ─────────────────────────────────

    def _suggested_seconds(self, marks: int, section_id: str) -> int:
        base = {"A": 20, "B1": 36, "B2": 36, "B3": 36}
        per_mark = base.get(section_id, 36) / max(mark for cfg in self._get_section_config("Mathematics") for mark in [cfg.marks_per_question] if cfg.section_id == section_id)
        return max(30, marks * 6)

    @staticmethod
    def _isc_grade(pct: float) -> str:
        if pct >= 90: return "A1"
        if pct >= 80: return "A2"
        if pct >= 70: return "B1"
        if pct >= 60: return "B2"
        if pct >= 50: return "C1"
        if pct >= 40: return "C2"
        if pct >= 33: return "D"
        return "E"

    async def _get_session(self, session_id: int) -> ExamSessionDB:
        stmt = __import__("sqlalchemy").select(ExamSessionDB).where(
            ExamSessionDB.id == session_id
        )
        res = await self.db.execute(stmt)
        session = res.scalar_one_or_none()
        if not session:
            raise ValueError(f"Session {session_id} not found.")
        return session

    @staticmethod
    def _make_session_code() -> str:
        chars = string.ascii_uppercase + string.digits
        return "ISC-" + "".join(secrets.choice(chars) for _ in range(10))

    @staticmethod
    def _delta_minutes(start: datetime, end: datetime) -> float:
        return round((end - start).total_seconds() / 60, 1)


# ─────────────────────────────────────────────
# Module-level convenience factory
# ─────────────────────────────────────────────
def get_exam_service(db: AsyncSession) -> ExamService:
    return ExamService(db)


# ─────────────────────────────────────────────
# Timed exam simulation (session flow)
#
# routers/assessment.py exposes /api/assessment/exam-sim/* endpoints that
# expect a lightweight in-memory session flow (ExamService.start_exam /
# submit_answer / _finish_exam plus a module-level _EXAM_SESSIONS dict).
# Those names did not exist, so every exam-sim endpoint raised
# AttributeError/ImportError (500).  This block restores the flow using
# the BoardQuestion bank — deterministic, no LLM.
# ─────────────────────────────────────────────
from types import SimpleNamespace as _NS

_EXAM_SESSIONS: Dict[str, Any] = {}

# Sessions must survive nginx round-robin between backend-1/backend-2 —
# persist every mutation to Redis (local dict stays a hot cache).
_EXAM_REDIS_TTL = 4 * 3600
_exam_redis = None


async def _exam_redis_client():
    global _exam_redis
    if _exam_redis is not None:
        return _exam_redis
    try:
        import redis.asyncio as aioredis
        from backend.config import settings
        _exam_redis = aioredis.from_url(
            settings.redis_url, decode_responses=True)
        return _exam_redis
    except Exception:
        return None


async def _exam_save(session: Any) -> None:
    try:
        r = await _exam_redis_client()
        if r is None:
            return
        import json as _json
        payload = _json.dumps({
            "session_id": session.session_id,
            "user_id": session.user_id,
            "paper": {"title": session.paper.title,
                      "questions": session.paper.questions},
            "duration_minutes": session.duration_minutes,
            "started_at": session.started_at.isoformat(),
            "current_question": session.current_question,
            "answers": session.answers,
            "completed": session.completed,
        })
        await r.set(f"examsim:{session.session_id}", payload,
                  ex=_EXAM_REDIS_TTL)
    except Exception:
        pass  # cache fallback: local dict still holds it


async def _exam_load(session_id: str) -> Any:
    session = _EXAM_SESSIONS.get(session_id)
    if session is not None:
        return session
    try:
        r = await _exam_redis_client()
        if r is None:
            return None
        import json as _json
        raw = await r.get(f"examsim:{session_id}")
        if not raw:
            return None
        p = _json.loads(raw)
        _started = datetime.fromisoformat(p["started_at"])
        if _started.tzinfo is None:
            _started = _started.replace(tzinfo=timezone.utc)  # legacy naive stamp
        session = _NS(
            session_id=p["session_id"],
            user_id=p["user_id"],
            paper=_NS(title=p["paper"]["title"],
                      questions=p["paper"]["questions"]),
            duration_minutes=p["duration_minutes"],
            started_at=_started,
            current_question=p["current_question"],
            answers=p["answers"],
            completed=p["completed"],
        )
        _EXAM_SESSIONS[session_id] = session
        return session
    except Exception:
        return None


# Subject slugs the UI/API accept → corpus subject codes
_EXAM_SUBJECT_ALIASES = {
    "math": ["math"], "maths": ["math"], "mathematics": ["math"],
    "physics": ["phy", "physics"], "phy": ["phy", "physics"],
    "chemistry": ["chem", "chemistry"], "chem": ["chem", "chemistry"],
    "biology": ["bio", "biology"], "bio": ["bio", "biology"],
    "science": ["sci", "science", "phy", "chem", "bio", "physics",
                "chemistry", "biology"],
    "english": ["eng", "english", "eng_f", "eng_h", "eng_k", "eng_s",
                "eng_v", "eng_w", "engl"],
    "hindi": ["hin", "hin_a", "hin_al", "hin_ar", "hin_v"],
    "economics": ["eco", "economics"], "eco": ["eco", "economics"],
    "history": ["hist", "history"], "hist": ["hist", "history"],
    "geography": ["geo", "geography"], "geo": ["geo", "geography"],
    "civics": ["civ", "civics"], "civ": ["civ", "civics"],
    "social_science": ["soc", "sst", "hist", "geo", "civ", "eco",
                       "history", "geography", "civics", "economics"],
    "computer_science": ["comp", "cs", "ip"], "cs": ["comp", "cs", "ip"],
    "accounts": ["acc"], "accountancy": ["acc"], "acc": ["acc"],
    "business_studies": ["bs"], "bs": ["bs"], "psychology": ["psy"],
    "psy": ["psy"], "sociology": ["soc"], "soc": ["soc"],
    "applied_math": ["stat"], "statistics": ["stat"], "stat": ["stat"],
    "biotech": ["biotech"], "physical_education": ["ps"], "ps": ["ps"],
    "home_science": ["hs"], "hs": ["hs"], "grammar": ["gram"],
    "gram": ["gram"], "ca": ["ca"],
}

_EXAM_GRADE_BANDS = ((90, "A+"), (80, "A"), (70, "B"), (60, "C"), (50, "D"), (40, "E"))


def _exam_sim_grade(percentage: float) -> str:
    for threshold, grade in _EXAM_GRADE_BANDS:
        if percentage >= threshold:
            return grade
    return "F"


def _exam_sim_normalize(text: Any) -> str:
    return str(text or "").strip().lower()


async def _exam_sim_start(
    db: AsyncSession,
    user_id: str = "",
    subject: str = "",
    class_level: int = 10,
    paper_type: str = "mock_paper",
    num_questions: int = 10,
    duration_minutes: int = 120,
) -> Dict[str, Any]:
    from sqlalchemy import select as _select, func as _func

    try:
        from backend.models.enrichment import BoardQuestion
        subs = _EXAM_SUBJECT_ALIASES.get(
            subject.lower().replace(" ", "_"), [subject.lower()])
        rows = (await db.execute(
            _select(BoardQuestion)
            .where(BoardQuestion.subject.in_(subs))
            .where(BoardQuestion.class_level == class_level)
            .order_by(_func.random())
            .limit(max(1, min(int(num_questions), 40)))
        )).scalars().all()
    except Exception:
        rows = []

    if not rows:
        return {
            "started": False,
            "generated": False,
            "message": f"No board questions available for {subject} class {class_level}.",
        }

    questions = [
        {
            "index": i + 1,
            "question": q.question_text,
            "options": q.options or [],
            "marks": q.marks or 1,
            "question_type": q.question_type or "short_answer",
            "correct_answer": q.correct_answer or "",
        }
        for i, q in enumerate(rows)
    ]
    paper = _NS(
        title=f"{subject.title()} Class {class_level} {paper_type.replace('_', ' ').title()}",
        questions=questions,
    )
    session_id = secrets.token_urlsafe(12)
    session = _NS(
        session_id=session_id,
        user_id=user_id,
        paper=paper,
        duration_minutes=int(duration_minutes),
        started_at=datetime.now(timezone.utc),
        current_question=0,
        answers=[],
        completed=False,
    )
    _EXAM_SESSIONS[session_id] = session
    await _exam_save(session)

    safe_questions = [
        {k: v for k, v in q.items() if k != "correct_answer"}
        for q in questions
    ]
    return {
        "started": True,
        "session_id": session_id,
        "paper_title": paper.title,
        "duration_minutes": int(duration_minutes),
        "total_questions": len(questions),
        "question": safe_questions[0],
        # full set for clients that render the whole paper up front
        "questions": safe_questions,
    }


def _exam_sim_scorecard(session: Any) -> Dict[str, Any]:
    questions = session.paper.questions
    total_marks = sum(q.get("marks", 1) for q in questions)
    score = sum(a.get("marks_awarded", 0.0) for a in session.answers)
    percentage = (score / total_marks * 100) if total_marks else 0.0
    session.completed = True
    return {
        "session_id": session.session_id,
        "paper_title": session.paper.title,
        "completed": True,
        "total_score": round(score, 1),
        "max_score": total_marks,
        "percentage": round(percentage, 1),
        "grade": _exam_sim_grade(percentage),
        "questions_answered": len(session.answers),
        "total_questions": len(questions),
        "answers": [
            {k: v for k, v in a.items() if k != "correct_answer"} for a in session.answers
        ],
    }


async def _exam_sim_submit_answer(
    db: AsyncSession,
    session_id: str = "",
    student_answer: str = "",
    skip: bool = False,
    **_kw,
) -> Dict[str, Any]:
    session = await _exam_load(session_id)
    if not session:
        return {"error": "Exam session not found"}
    if session.completed:
        return {"error": "Exam already finished"}

    questions = session.paper.questions
    if session.current_question >= len(questions):
        return _exam_sim_scorecard(session)

    q = questions[session.current_question]
    correct = _exam_sim_normalize(q.get("correct_answer")) == _exam_sim_normalize(student_answer)
    marks_awarded = float(q.get("marks", 1)) if (correct and not skip) else 0.0
    session.answers.append(
        {
            "index": q.get("index"),
            "question": q.get("question"),
            "student_answer": "" if skip else student_answer,
            "skipped": bool(skip),
            "is_correct": correct and not skip,
            "marks_awarded": marks_awarded,
            "correct_answer": q.get("correct_answer"),
        }
    )
    session.current_question += 1
    await _exam_save(session)

    if session.current_question >= len(questions):
        return _exam_sim_scorecard(session)

    nxt = questions[session.current_question]
    return {
        "session_id": session_id,
        "feedback": {
            "is_correct": correct and not skip,
            "skipped": bool(skip),
            "marks_awarded": marks_awarded,
            # bank keys can hold grader prose — scrub the served copy.
            "correct_answer": scrub_answer_key(q.get("correct_answer")),
        },
        "question_number": session.current_question + 1,
        "total_questions": len(questions),
        "question": {k: v for k, v in nxt.items() if k != "correct_answer"},
    }


# Attach the session-flow API the router expects (staticmethods so the
# router can call ExamService.start_exam(...) without an instance).
ExamService.start_exam = staticmethod(_exam_sim_start)
ExamService.submit_answer = staticmethod(_exam_sim_submit_answer)
ExamService._finish_exam = staticmethod(lambda session_id, session: _exam_sim_scorecard(session))
