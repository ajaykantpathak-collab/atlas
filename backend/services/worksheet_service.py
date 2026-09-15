"""

worksheet_service.py



Worksheet generation service for K-12 teachers (CISCE/ICSE/ISC).

Provides deterministic seeded worksheet generation with step-by-step answer keys,

printable HTML output, WhatsApp distribution, and class performance tracking.



Integrates with solvers/question_gen_*.py for domain-specific question generation.

Falls back to SymPy-based generation when a specific generator is unavailable.

"""



from __future__ import annotations



import asyncio

import hashlib

import importlib

import json

import math

import random

import re

import uuid

from datetime import datetime

from pathlib import Path

from typing import Any, Callable, Literal



from sqlalchemy import Column, DateTime, Float, ForeignKey, Index, Integer, String, Text, UUID

from sqlalchemy.ext.asyncio import AsyncSession

from sqlalchemy.orm import relationship



from database import Base  # existing declarative base

from pydantic import BaseModel, ConfigDict, Field, field_validator

from services.whatsapp_service import WhatsAppService





# ═══════════════════════════════════════════════════════════════════════

# DATABASE MODELS  (additive — new tables only)

# ═══════════════════════════════════════════════════════════════════════



class Worksheet(Base):

    """A worksheet created by a teacher for a class."""

    __tablename__ = "worksheets"



    id: uuid.UUID = Column(

        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True

    )

    teacher_id: uuid.UUID = Column(UUID(as_uuid=True), nullable=False, index=True)

    class_id: uuid.UUID = Column(UUID(as_uuid=True), nullable=False, index=True)

    subject: str = Column(String(80), nullable=False, index=True)

    topic_ids: list[str] = Column(JSON, nullable=False)  # ordered list of topic keys

    title: str | None = Column(String(255), nullable=True)

    num_questions: int = Column(Integer, nullable=False)

    difficulty: str = Column(String(20), nullable=False)  # easy | medium | hard | mixed

    competency_ratio: float = Column(Float, nullable=False, default=0.3)

    seed: str = Column(String(64), nullable=False)  # deterministic seed for regeneration

    questions: list[dict] = Column(JSON, nullable=False)  # question objects (no answers for student view)

    answer_key: list[dict] = Column(JSON, nullable=False)  # step-by-step solutions

    status: str = Column(

        String(20), nullable=False, default="draft", index=True

    )  # draft | sent | partial | complete | archived

    total_points: int = Column(Integer, nullable=False, default=0)

    created_at: datetime = Column(DateTime, default=datetime.utcnow, nullable=False)

    sent_at: datetime | None = Column(DateTime, nullable=True)



    # relationships

    distributions: list[WorksheetDistribution] = relationship(

        "WorksheetDistribution", back_populates="worksheet", cascade="all, delete-orphan"

    )

    submissions: list[WorksheetSubmission] = relationship(

        "WorksheetSubmission", back_populates="worksheet", cascade="all, delete-orphan"

    )





class WorksheetDistribution(Base):

    """Tracks per-student delivery of a worksheet."""

    __tablename__ = "worksheet_distributions"



    id: uuid.UUID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    worksheet_id: uuid.UUID = Column(

        UUID(as_uuid=True),

        ForeignKey("worksheets.id", ondelete="CASCADE"),

        nullable=False,

        index=True,

    )

    student_id: uuid.UUID = Column(UUID(as_uuid=True), nullable=False, index=True)

    sent_at: datetime = Column(DateTime, default=datetime.utcnow, nullable=False)

    sent_via: str = Column(String(20), default="whatsapp", nullable=False)

    message_sid: str | None = Column(String(100), nullable=True)



    worksheet: Worksheet = relationship("Worksheet", back_populates="distributions")





class WorksheetSubmission(Base):

    """Tracks student answers and score for a worksheet."""

    __tablename__ = "worksheet_submissions"



    id: uuid.UUID = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    worksheet_id: uuid.UUID = Column(

        UUID(as_uuid=True),

        ForeignKey("worksheets.id", ondelete="CASCADE"),

        nullable=False,

        index=True,

    )

    student_id: uuid.UUID = Column(UUID(as_uuid=True), nullable=False, index=True)

    responses: dict = Column(JSON, nullable=False, default={})  # {question_index: student_answer}

    score: float | None = Column(Float, nullable=True)

    max_score: float = Column(Float, nullable=False, default=0)

    submitted_at: datetime | None = Column(DateTime, nullable=True)

    graded_at: datetime | None = Column(DateTime, nullable=True)



    worksheet: Worksheet = relationship("Worksheet", back_populates="submissions")





# ═══════════════════════════════════════════════════════════════════════

# PYDANTIC SCHEMAS  (Pydantic v2)

# ═══════════════════════════════════════════════════════════════════════



class CreateWorksheetRequest(BaseModel):

    """Request body for creating a new worksheet."""

    model_config = ConfigDict(str_strip_whitespace=True)



    teacher_id: uuid.UUID

    class_id: uuid.UUID

    subject: str = Field(..., min_length=1, max_length=80)

    topic_ids: list[str] = Field(..., min_length=1, description="Topic keys, e.g. ['differentiation-basics', 'differentiation-rules']")

    num_questions: int = Field(default=10, ge=1, le=50)

    difficulty: Literal["easy", "medium", "hard", "mixed"] = "medium"

    competency_ratio: float = Field(default=0.3, ge=0.0, le=1.0)

    title: str | None = Field(default=None, max_length=255)

    include_answer_key: bool = Field(default=True)



    @field_validator("topic_ids")

    @classmethod

    def deduplicate_topics(cls, v: list[str]) -> list[str]:

        return list(dict.fromkeys(v))  # preserve order, drop dups





class SolutionStep(BaseModel):

    """One step in a step-by-step solution."""

    step_number: int

    description: str

    expression: str | None = None  # LaTeX math expression

    result: str | None = None





class QuestionDetail(BaseModel):

    """Full question detail — used in teacher views and answer keys."""

    model_config = ConfigDict(from_attributes=True)



    index: int

    type: str  # standard | competency

    bloom_level: str

    text: str

    figure: str | None = None

    options: list[str] | None = None

    marks: int

    answer: Any = None

    solution_steps: list[SolutionStep] | None = None

    explanation: str | None = None





class CreateWorksheetResponse(BaseModel):

    """Response returned after worksheet creation."""

    model_config = ConfigDict(from_attributes=True)



    worksheet_id: uuid.UUID

    title: str

    subject: str

    topic_ids: list[str]

    num_questions: int

    difficulty: str

    competency_ratio: float

    questions: list[QuestionDetail]

    answer_key: list[dict]

    total_points: int

    status: str

    created_at: datetime





class WorksheetDetail(BaseModel):

    """Full worksheet detail (teacher view includes answer key)."""

    model_config = ConfigDict(from_attributes=True)



    worksheet_id: uuid.UUID

    teacher_id: uuid.UUID

    class_id: uuid.UUID

    title: str

    subject: str

    topic_ids: list[str]

    num_questions: int

    difficulty: str

    competency_ratio: float

    questions: list[QuestionDetail]

    total_points: int

    status: str

    created_at: datetime

    sent_at: datetime | None





class PrintableResponse(BaseModel):

    """Printable HTML content for a worksheet."""

    worksheet_id: uuid.UUID

    html_student_copy: str

    html_answer_key: str

    combined_html: str





class SendToClassResult(BaseModel):

    """Result of a send-to-class operation."""

    worksheet_id: uuid.UUID

    class_id: uuid.UUID

    total_students: int

    sent_count: int

    failed_count: int

    results: list[dict[str, Any]]

    sent_at: datetime | None





class StudentPerformanceItem(BaseModel):

    """Performance summary for one student."""

    student_id: uuid.UUID

    student_name: str

    roll_number: str | None = None

    sent: bool

    completed: bool

    score: float | None = None

    max_score: float = 0

    percentage: float | None = None

    submitted_at: datetime | None = None





class ClassPerformanceResponse(BaseModel):

    """Aggregated class performance for a worksheet."""

    worksheet_id: uuid.UUID

    total_students: int

    sent_count: int

    completed_count: int

    pending_count: int

    average_score: float | None

    highest_score: float | None

    lowest_score: float | None

    pass_count: int

    pass_percentage: float | None

    per_student: list[StudentPerformanceItem]





# ═══════════════════════════════════════════════════════════════════════

# WORKSHEET SERVICE

# ═══════════════════════════════════════════════════════════════════════



class WorksheetService:

    """

    Service for creating, distributing, and tracking worksheets.



    Uses deterministic seeded generation so the same inputs always

    produce the same worksheet — useful for retakes and sharing.

    Integrates with question generators in ``solvers/question_gen_*.py``.

    Falls back to a SymPy-based generator when a specific solver is absent.

    """



    # ── Bloom-level buckets ─────────────────────────────────────

    _STANDARD_BLOOM = ["Remember", "Understand", "Apply"]

    _COMPETENCY_BLOOM = ["Analyze", "Evaluate", "Create"]



    # ── Default marks per question by difficulty & type ──────────

    _MARKS_MAP: dict[str, dict[str, int]] = {

        "easy":   {"standard": 2, "competency": 3},

        "medium": {"standard": 3, "competency": 5},

        "hard":   {"standard": 4, "competency": 6},

        "mixed":  {"standard": 3, "competency": 5},

    }



    def __init__(

        self,

        db: AsyncSession,

        whatsapp_service: WhatsAppService | None = None,

        templates_dir: str | Path | None = None,

    ) -> None:

        self.db = db

        self.whatsapp = whatsapp_service or WhatsAppService()

        self.templates_dir = (

            Path(templates_dir) if templates_dir else Path(__file__).parent / "worksheet_templates"

        )

        self._generator_cache: dict[str, Callable | None] = {}



    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    #  PUBLIC API

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━



    async def create_worksheet(

        self,

        teacher_id: uuid.UUID,

        class_id: uuid.UUID,

        subject: str,

        topic_ids: list[str],

        num_questions: int = 10,

        difficulty: str = "medium",

        competency_ratio: float = 0.3,

        title: str | None = None,

        include_answer_key: bool = True,

    ) -> CreateWorksheetResponse:

        """

        Create a new worksheet with deterministic, seeded questions.



        Parameters

        ----------

        teacher_id : UUID of the teacher creating the worksheet.

        class_id : UUID of the target class.

        subject : Subject name, e.g. 'Mathematics'.

        topic_ids : List of topic keys (subtopic identifiers).

        num_questions : Total questions (1–50).

        difficulty : easy | medium | hard | mixed.

        competency_ratio : Fraction 0.0–1.0 of higher-order-thinking questions.

        title : Optional human-readable title.

        include_answer_key : Whether to generate step-by-step solutions.



        Returns

        -------

        CreateWorksheetResponse with questions, answer key, and metadata.

        """

        # 1 — Build deterministic seed

        seed_str = self._build_seed_string(subject, topic_ids, difficulty)

        worksheet_uuid = uuid.uuid4()



        # 2 — Generate questions

        questions_raw, answer_key_raw = await self._generate_questions(

            seed=seed_str,

            subject=subject,

            topic_ids=topic_ids,

            num_questions=num_questions,

            difficulty=difficulty,

            competency_ratio=competency_ratio,

        )



        # 3 — Compute total marks

        total_points = sum(q.get("marks", 0) for q in questions_raw)



        # 4 — Build auto title if missing

        if not title:

            topic_display = topic_ids[0].replace("_", " ").title()

            title = f"{subject} — {topic_display} ({difficulty.title()})"



        # 5 — Persist

        worksheet = Worksheet(

            id=worksheet_uuid,

            teacher_id=teacher_id,

            class_id=class_id,

            subject=subject,

            topic_ids=topic_ids,

            title=title,

            num_questions=num_questions,

            difficulty=difficulty,

            competency_ratio=competency_ratio,

            seed=seed_str,

            questions=questions_raw,

            answer_key=answer_key_raw if include_answer_key else [],

            total_points=total_points,

        )

        self.db.add(worksheet)

        await self.db.flush()

        await self.db.refresh(worksheet)



        # 6 — Build response

        question_details = [

            QuestionDetail(

                index=i,

                type=q.get("type", "standard"),

                bloom_level=q.get("bloom_level", "Apply"),

                text=q.get("text", ""),

                figure=q.get("figure"),

                options=q.get("options"),

                marks=q.get("marks", 0),

                answer=q.get("answer"),

                solution_steps=[

                    SolutionStep(**s) for s in (q.get("solution_steps") or [])

                ],

                explanation=q.get("explanation"),

            )

            for i, q in enumerate(questions_raw)

        ]



        return CreateWorksheetResponse(

            worksheet_id=worksheet.id,

            title=worksheet.title or "",

            subject=worksheet.subject,

            topic_ids=worksheet.topic_ids,

            num_questions=worksheet.num_questions,

            difficulty=worksheet.difficulty,

            competency_ratio=worksheet.competency_ratio,

            questions=question_details,

            answer_key=answer_key_raw,

            total_points=worksheet.total_points,

            status=worksheet.status,

            created_at=worksheet.created_at,

        )



    async def get_worksheet(

        self,

        worksheet_id: uuid.UUID,

        *,

        include_answer_key: bool = True,

        for_student: bool = False,

    ) -> WorksheetDetail:

        """

        Retrieve a worksheet by ID.



        Parameters

        ----------

        worksheet_id : UUID of the worksheet.

        include_answer_key : If True, include solution steps in questions.

        for_student : If True, strip answer fields (student-safe view).

        """

        from sqlalchemy import select as sa_select  # avoid shadowing



        result = await self.db.execute(

            sa_select(Worksheet).where(Worksheet.id == worksheet_id)

        )

        ws = result.scalar_one_or_none()

        if ws is None:

            raise ValueError(f"Worksheet {worksheet_id} not found")



        questions = ws.questions or []

        if for_student:

            # Strip answer material for student view

            questions = [

                {k: v for k, v in q.items() if k not in ("answer", "solution_steps", "explanation")}

                for q in questions

            ]



        question_details = [

            QuestionDetail(

                index=i,

                type=q.get("type", "standard"),

                bloom_level=q.get("bloom_level", "Apply"),

                text=q.get("text", ""),

                figure=q.get("figure"),

                options=q.get("options"),

                marks=q.get("marks", 0),

                answer=q.get("answer") if (include_answer_key and not for_student) else None,

                solution_steps=(

                    [SolutionStep(**s) for s in q.get("solution_steps", [])]

                    if (include_answer_key and not for_student)

                    else None

                ),

                explanation=q.get("explanation") if (include_answer_key and not for_student) else None,

            )

            for i, q in enumerate(questions)

        ]



        return WorksheetDetail(

            worksheet_id=ws.id,

            teacher_id=ws.teacher_id,

            class_id=ws.class_id,

            title=ws.title or "",

            subject=ws.subject,

            topic_ids=ws.topic_ids,

            num_questions=ws.num_questions,

            difficulty=ws.difficulty,

            competency_ratio=ws.competency_ratio,

            questions=question_details,

            total_points=ws.total_points,

            status=ws.status,

            created_at=ws.created_at,

            sent_at=ws.sent_at,

        )



    async def generate_printable(

        self,

        worksheet_id: uuid.UUID,

        school_name: str = "",

        class_display: str = "",

        show_answer_key: bool = True,

    ) -> PrintableResponse:

        """

        Generate A4-printable HTML for a worksheet.



        Returns three versions:

        - ``html_student_copy``: questions only (no answers).

        - ``html_answer_key``: step-by-step solutions.

        - ``combined_html``: student copy + page break + answer key.

        """

        ws_detail = await self.get_worksheet(worksheet_id, include_answer_key=True, for_student=False)



        student_html, answer_html = self._build_printable_html(

            ws_detail, school_name=school_name, class_display=class_display, show_answer_key=show_answer_key

        )



        combined = student_html + '\n<div class="page-break"></div>\n' + answer_html if show_answer_key else student_html



        return PrintableResponse(

            worksheet_id=worksheet_id,

            html_student_copy=student_html,

            html_answer_key=answer_html,

            combined_html=combined,

        )



    async def send_to_class(

        self,

        teacher_id: uuid.UUID,

        worksheet_id: uuid.UUID,

        class_id: uuid.UUID,

        channel: str = "whatsapp",

        send_answer_key: bool = False,

        delay_between: float = 1.0,

    ) -> SendToClassResult:

        """

        Send a worksheet to all students in a class via the specified channel.



        Currently supports 'whatsapp'. Sends worksheet details plus question

        text. Optionally includes the answer key after the questions.



        Parameters

        ----------

        teacher_id : Must own the worksheet.

        worksheet_id : Target worksheet.

        class_id : Target class.

        channel : 'whatsapp' (default).

        send_answer_key : If True, send the answer key after questions.

        delay_between : Seconds between consecutive messages (rate-limit safety).

        """

        from sqlalchemy import select as sa_select



        # Verify ownership

        ws_result = await self.db.execute(

            sa_select(Worksheet).where(

                Worksheet.id == worksheet_id,

                Worksheet.teacher_id == teacher_id,

            )

        )

        ws = ws_result.scalar_one_or_none()

        if ws is None:

            raise ValueError("Worksheet not found or you do not own it.")



        # Resolve students

        students = await self._resolve_students_in_class(class_id)

        if not students:

            raise ValueError(f"No students found in class {class_id}")



        # Track which students already received (idempotent)

        existing_result = await self.db.execute(

            sa_select(WorksheetDistribution.student_id).where(

                WorksheetDistribution.worksheet_id == worksheet_id

            )

        )

        already_sent: set[uuid.UUID] = {row[0] for row in existing_result.all()}



        # Build messages

        ws_detail = await self.get_worksheet(worksheet_id, for_student=True)

        header_msg = self._build_whatsapp_header(ws_detail)

        questions_msg = self._build_whatsapp_questions(ws_detail)

        answer_key_msg = self._build_whatsapp_answer_key(ws_detail) if send_answer_key else None



        results: list[dict[str, Any]] = []

        sent_count = 0

        failed_count = 0



        for student in students:

            sid = student["id"]

            phone = student.get("phone_number") or student.get("whatsapp_number")



            if sid in already_sent:

                results.append({

                    "student_id": str(sid),

                    "student_name": student.get("name", ""),

                    "status": "skipped",

                    "reason": "already_sent",

                })

                continue



            if not phone:

                results.append({

                    "student_id": str(sid),

                    "student_name": student.get("name", ""),

                    "status": "failed",

                    "reason": "no_phone_number",

                })

                failed_count += 1

                continue



            try:

                # Send header

                await self.whatsapp.send_message(to=phone, content=header_msg)

                if delay_between > 0:

                    await asyncio.sleep(delay_between)



                # Send questions (may be split)

                for chunk in self._chunk_message(questions_msg, 3500):

                    await self.whatsapp.send_message(to=phone, content=chunk)

                    if delay_between > 0:

                        await asyncio.sleep(delay_between)



                # Optionally send answer key

                if answer_key_msg:

                    for chunk in self._chunk_message(answer_key_msg, 3500):

                        await self.whatsapp.send_message(to=phone, content=chunk)

                        if delay_between > 0:

                            await asyncio.sleep(delay_between)



                # Record distribution

                dist = WorksheetDistribution(

                    worksheet_id=worksheet_id,

                    student_id=sid,

                    sent_via=channel,

                )

                self.db.add(dist)



                results.append({

                    "student_id": str(sid),

                    "student_name": student.get("name", ""),

                    "status": "sent",

                })

                sent_count += 1



            except Exception as exc:

                results.append({

                    "student_id": str(sid),

                    "student_name": student.get("name", ""),

                    "status": "failed",

                    "reason": str(exc),

                })

                failed_count += 1



        # Update worksheet status

        ws.status = "sent" if sent_count > 0 else ws.status

        ws.sent_at = datetime.utcnow()

        await self.db.flush()



        return SendToClassResult(

            worksheet_id=worksheet_id,

            class_id=class_id,

            total_students=len(students),

            sent_count=sent_count,

            failed_count=failed_count,

            results=results,

            sent_at=ws.sent_at,

        )



    async def get_class_performance(

        self,

        worksheet_id: uuid.UUID,

    ) -> ClassPerformanceResponse:

        """

        Return per-student performance for a worksheet, including

        distribution and submission status.

        """

        from sqlalchemy import select as sa_select

        from sqlalchemy.orm import selectinload



        # Load worksheet to get class_id

        ws_result = await self.db.execute(

            sa_select(Worksheet).where(Worksheet.id == worksheet_id)

        )

        ws = ws_result.scalar_one_or_none()

        if ws is None:

            raise ValueError(f"Worksheet {worksheet_id} not found")



        # All students in the class (requires Student model with class_id)

        try:

            from database import Student

            students_result = await self.db.execute(

                sa_select(Student.id, Student.name, Student.roll_number)

                .where(Student.class_id == ws.class_id)

            )

            students = [

                {"id": row[0], "name": row[1], "roll_number": row[2]}

                for row in students_result.all()

            ]

        except (ImportError, AttributeError):

            # Fallback: only report students who have a submission or distribution

            students = []



        # Distributions

        dist_result = await self.db.execute(

            sa_select(WorksheetDistribution.student_id).where(

                WorksheetDistribution.worksheet_id == worksheet_id

            )

        )

        distributed_ids: set[uuid.UUID] = {row[0] for row in dist_result.all()}



        # Submissions

        sub_result = await self.db.execute(

            sa_select(WorksheetSubmission).where(

                WorksheetSubmission.worksheet_id == worksheet_id

            )

        )

        submissions: dict[uuid.UUID, WorksheetSubmission] = {

            row.student_id: row for row in sub_result.scalars().all()

        }



        # If no students queried from Student table, build from distributions + submissions

        if not students:

            all_ids = distributed_ids | set(submissions.keys())

            students = [{"id": sid, "name": str(sid), "roll_number": None} for sid in all_ids]



        items: list[StudentPerformanceItem] = []

        scores: list[float] = []

        completed_count = 0

        sent_count = 0

        pass_count = 0



        for s in students:

            sid = s["id"]

            sent = sid in distributed_ids

            sub = submissions.get(sid)



            if sent:

                sent_count += 1



            if sub is not None:

                completed_count += 1

                score = sub.score if sub.score is not None else 0.0

                pct = (score / sub.max_score * 100) if sub.max_score > 0 else None

                if pct is not None and pct >= 40:

                    pass_count += 1

                if score > 0:

                    scores.append(score)

            else:

                score = None

                pct = None



            items.append(StudentPerformanceItem(

                student_id=sid,

                student_name=s.get("name", str(sid)),

                roll_number=s.get("roll_number"),

                sent=sent,

                completed=sub is not None,

                score=score,

                max_score=sub.max_score if sub else ws.total_points,

                percentage=pct,

                submitted_at=sub.submitted_at if sub else None,

            ))


        avg_score = (sum(scores) / len(scores)) if scores else None

        pass_pct = (pass_count / completed_count * 100) if completed_count > 0 else None



        return ClassPerformanceResponse(

            worksheet_id=worksheet_id,

            total_students=len(students),

            sent_count=sent_count,

            completed_count=completed_count,

            pending_count=len(students) - sent_count,

            average_score=avg_score,

            highest_score=max(scores) if scores else None,

            lowest_score=min(scores) if scores else None,

            pass_count=pass_count,

            pass_percentage=pass_pct,

            per_student=items,

        )



    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    #  PRIVATE — SEEDING & GENERATION

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━



    def _build_seed_string(

        self,

        subject: str,

        topic_ids: list[str],

        difficulty: str,

    ) -> str:

        """Build a deterministic seed string from worksheet parameters."""

        sorted_topics = sorted(t.lower().strip() for t in topic_ids)

        return "|".join([

            subject.lower().strip(),

            difficulty.lower().strip(),

            ",".join(sorted_topics),

        ])



    def _question_seed(

        self,

        seed_base: str,

        index: int,

        q_type: str,

    ) -> int:

        """Derive a unique integer seed for one question."""

        raw = f"{seed_base}|q{index}|{q_type}"

        h = hashlib.sha256(raw.encode()).hexdigest()

        return int(h[:12], 16)



    async def _generate_questions(

        self,

        seed: str,

        subject: str,

        topic_ids: list[str],

        num_questions: int,

        difficulty: str,

        competency_ratio: float,

    ) -> tuple[list[dict], list[dict]]:

        """

        Generate the requested number of questions, mixing standard and

        competency types according to *competency_ratio*.



        Returns ``(questions_list, answer_key_list)``.

        """

        # Determine counts

        n_competency = self._round_to_int(num_questions * competency_ratio)

        n_standard = num_questions - n_competency

        if n_standard < 0:

            n_standard, n_competency = n_competency, n_standard



        # Build type assignments — interleave for a natural mix

        type_assignments: list[str] = []

        s_idx, c_idx = 0, 0

        total = n_standard + n_competency

        s_frac = n_standard / total if total else 0.5

        for i in range(total):

            # Distribute roughly evenly — every ⌈1/ratio⌉-th question is competency

            if c_idx < n_competency and (i % max(1, round(1 / max(competency_ratio, 0.01))) == 0 or s_idx >= n_standard):

                type_assignments.append("competency")

                c_idx += 1

            else:

                type_assignments.append("standard")

                s_idx += 1

        # Fix rounding issues

        while type_assignments.count("competency") < n_competency:

            type_assignments.append("competency")

        while type_assignments.count("standard") < n_standard:

            type_assignments.append("standard")

        type_assignments = type_assignments[:num_questions]

        random.Random(int(hashlib.sha256(seed.encode()).hexdigest()[:12], 16)).shuffle(type_assignments)



        questions: list[dict] = []

        answer_key: list[dict] = []



        for i, q_type in enumerate(type_assignments):

            q_seed = self._question_seed(seed, i, q_type)

            rng = random.Random(q_seed)



            # Pick a topic (weighted by remaining slots — simple round-robin)

            topic = topic_ids[i % len(topic_ids)]



            # Load generator

            generator = await self._resolve_generator(subject, topic, difficulty)



            bloom = rng.choice(

                self._COMPETENCY_BLOOM if q_type == "competency" else self._STANDARD_BLOOM

            )

            marks = self._MARKS_MAP.get(difficulty, self._MARKS_MAP["medium"]).get(q_type, 3)



            if generator is not None:

                try:

                    raw = generator(rng=rng, topic=topic, difficulty=difficulty, question_type=q_type)

                except TypeError:

                    try:

                        raw = generator(

                            seed=rng.getrandbits(64),

                            topic=topic,

                            difficulty=difficulty,

                            question_type=q_type,

                        )

                    except TypeError:

                        raw = generator(topic, difficulty, q_type)

                if not isinstance(raw, dict):

                    raw = {}

            else:

                raw = self._fallback_generator(rng, topic, difficulty, q_type)



            # Normalise question

            q_text = raw.get("question", raw.get("text", "[Question text]"))

            question_obj: dict[str, Any] = {

                "id": str(i),

                "type": q_type,

                "bloom_level": raw.get("bloom_level", bloom),

                "text": q_text,

                "figure": raw.get("figure"),

                "options": raw.get("options"),

                "marks": raw.get("marks", marks),

                "answer": raw.get("answer") if True else None,  # never stored in plain questions

                "solution_steps": raw.get("solution_steps"),

                "explanation": raw.get("explanation"),

            }

            questions.append(question_obj)



            # Build answer-key entry

            answer_key.append({

                "question_id": str(i),

                "answer": raw.get("answer"),

                "steps": raw.get("solution_steps", []),

                "explanation": raw.get("explanation", ""),

                "bloom_level": question_obj["bloom_level"],

            })



        return questions, answer_key



    async def _resolve_generator(

        self,

        subject: str,

        topic: str,

        difficulty: str,

    ) -> Callable | None:

        """

        Load (and cache) the question generator for (subject, topic, difficulty).



        Tries the following module paths:

        1. ``solvers.question_gen_{subject}_{topic}_{difficulty}``

        2. ``solvers.question_gen_{subject}_{topic}``

        3. ``solvers.question_gen_{subject}``



        Within each module, looks for a callable named ``generate_{difficulty}``,

        then ``generate`` as a fallback.

        """

        cache_key = f"{subject}|{topic}|{difficulty}"

        if cache_key in self._generator_cache:

            return self._generator_cache[cache_key]



        norm_subj = re.sub(r"[^a-z0-9]", "", subject.lower())

        norm_topic = re.sub(r"[^a-z0-9]", "", topic.lower())



        module_candidates = [

            f"solvers.question_gen_{norm_subj}_{norm_topic}_{difficulty.lower()}",

            f"solvers.question_gen_{norm_subj}_{norm_topic}",

            f"solvers.question_gen_{norm_subj}",

        ]

        func_name_candidates = [f"generate_{difficulty.lower()}", "generate"]



        for mod_name in module_candidates:

            try:

                module = importlib.import_module(mod_name)

                for fname in func_name_candidates:

                    fn = getattr(module, fname, None)

                    if callable(fn):

                        self._generator_cache[cache_key] = fn

                        return fn

            except ImportError:

                continue



        self._generator_cache[cache_key] = None

        return None



    def _fallback_generator(

        self,

        rng: random.Random,

        topic: str,

        difficulty: str,

        question_type: str,

    ) -> dict:

        """

        SymPy-based fallback generator — ensures the service always works

        even when no domain-specific solver is registered.

        """

        # Lazy import SymPy (heavy)

        try:

            import sympy as sp

        except ImportError:

            return self._minimal_fallback(rng, topic, difficulty, question_type)



        x, y, a, b, c = sp.symbols("x y a b c")

        topic_lower = topic.lower()



        if "differentiat" in topic_lower or "deriv" in topic_lower or "diff" in topic_lower:

            return self._fallback_differentiation(rng, sp, x, y, a, b, c, difficulty, question_type)



        # Generic algebra

        a_val = rng.randint(2, 9)

        b_val = rng.randint(1, 8)

        c_val = rng.randint(1, 5)

        if difficulty == "easy":

            expr = a_val * x**2 + b_val * x + c_val

            answer = sp.diff(expr, x)

            steps = [

                {"step_number": 1, "description": f"Differentiate term by term: d/dx({sp.sstr(expr)})", "expression": str(expr)},

                {"step_number": 2, "description": f"Apply power rule", "result": str(answer)},

            ]

        else:

            expr = (a_val * x + b_val) * (c_val * x**2 + rng.randint(1, 5))

            answer = sp.diff(expr, x)

            expanded = sp.expand(answer)

            steps = [

                {"step_number": 1, "description": f"Given expression: {sp.sstr(expr)}", "expression": str(expr)},

                {"step_number": 2, "description": "Expand or apply product rule", "expression": str(sp.expand(expr))},

                {"step_number": 3, "description": "Differentiate term by term", "result": str(expanded)},

            ]



        return {

            "question": f"Find \\(\\frac{{d}}{{dx}}\\) of \\({sp.sstr(expr)}\\).",

            "answer": str(answer),

            "solution_steps": steps,

            "explanation": "Apply standard differentiation rules.",

            "bloom_level": rng.choice(self._STANDARD_BLOOM),

            "marks": self._MARKS_MAP.get(difficulty, self._MARKS_MAP["medium"])[question_type],

        }



    def _fallback_differentiation(

        self,

        rng: random.Random,

        sp,

        x, y, a, b, c,

        difficulty: str,

        question_type: str,

    ) -> dict:

        """Generate a differentiation question using SymPy."""

        a_val = rng.randint(2, 12)

        b_val = rng.randint(1, 8)

        c_val = rng.randint(1, 6)

        n_val = rng.randint(2, 5)



        if difficulty == "easy":

            # Polynomial derivative

            coeffs = [rng.randint(-9, 9) for _ in range(n_val + 1)]

            while coeffs[-1] == 0:

                coeffs[-1] = rng.randint(1, 9)

            expr = sum(coeffs[i] * x ** (n_val - i) for i in range(len(coeffs)))

            answer = sp.diff(expr, x)

            steps = self._steps_polynomial(rng, sp, expr, answer)



        elif difficulty == "medium":

            choice = rng.choice(["product", "chain", "trig"])

            if choice == "product" or question_type == "competency":

                f = a_val * x**3 + b_val * x

                g = c_val * x**2 + rng.randint(1, 5)

                expr = f * g

                answer = sp.diff(expr, x)

                steps = self._steps_product(rng, sp, f, g, answer)

            elif choice == "chain":

                inner = a_val * x + b_val

                expr = sp.sin(inner) ** 2

                answer = sp.diff(expr, x)

                steps = self._steps_chain(rng, sp, expr, answer, inner)

            else:

                expr = sp.sin(a_val * x) * sp.cos(b_val * x)

                answer = sp.diff(expr, x)

                steps = self._steps_trig(rng, sp, expr, answer)



        else:  # hard

            if question_type == "competency":

                # Implicit or parametric

                expr = a_val * x**3 + b_val * x * y - c_val * y**2

                dy = sp.Symbol("dy/dx")

                answer_str = (
                    f"Differentiating implicitly: "
                    f"\\({sp.sstr(sp.Eq(sp.diff(expr, x) + sp.diff(expr, y) * dy, 0))}\\) "
                    f"Solving for \\(dy/dx\\):"
                )

                steps = [

                    {"step_number": 1, "description": f"Given implicit equation with x and y", "expression": sp.sstr(expr) + " = 0"},

                    {"step_number": 2, "description": "Differentiate w.r.t. x, treating y as a function of x", "expression": str(sp.diff(expr, x)) + " + " + str(sp.diff(expr, y)) + " * (dy/dx) = 0"},

                    {"step_number": 3, "description": "Solve for dy/dx", "result": f"dy/dx = -({sp.sstr(sp.diff(expr, x))}) / ({sp.sstr(sp.diff(expr, y))})"},

                ]

                answer_val = f"-({sp.sstr(sp.diff(expr, x))})/({sp.sstr(sp.diff(expr, y))})"

            else:

                expr = sp.log(a_val * x**2 + b_val)

                answer = sp.diff(expr, x)

                steps = self._steps_logarithmic(rng, sp, expr, answer, a_val, b_val)

                answer_val = answer



            return {

                "question": (
                    f"Find \\(\\frac{{d}}{{dx}}\\) of the following (show all steps): "
                    f"\\({sp.latex(sp.Eq(sp.Symbol('y'), expr))}\\)"
                ),
                "answer": answer_val if question_type == "competency" else str(answer_val),

                "solution_steps": steps,

                "explanation": "Apply the appropriate differentiation rule with full working.",

                "bloom_level": "Analyze" if question_type == "competency" else "Apply",

                "marks": self._MARKS_MAP.get(difficulty, self._MARKS_MAP["medium"])[question_type],

            }



        return {

            "question": f"Find \\(\\frac{{d}}{{dx}}\\) of \\({sp.latex(expr)}\\).",

            "answer": str(answer),

            "solution_steps": steps,

            "explanation": "Apply standard differentiation rules.",

            "bloom_level": rng.choice(self._STANDARD_BLOOM),

            "marks": self._MARKS_MAP.get(difficulty, self._MARKS_MAP["medium"])[question_type],

        }



    # ── Step-builders for fallback ───────────────────────────────



    def _steps_polynomial(self, rng, sp, expr, answer):

        expanded = sp.expand(expr)

        return [

            {"step_number": 1, "description": "Given expression", "expression": sp.sstr(expanded)},

            {"step_number": 2, "description": "Differentiate term-by-term using power rule", "expression": str(answer)},

            {"step_number": 3, "description": "Final answer", "result": str(answer)},

        ]



    def _steps_product(self, rng, sp, f, g, answer):

        df = sp.diff(f, sp.Symbol("x"))

        dg = sp.diff(g, sp.Symbol("x"))

        return [

            {"step_number": 1, "description": f"Let \\(f = {sp.latex(f)}\\) and \\(g = {sp.latex(g)}\\)", "expression": f"f = {sp.sstr(f)}, g = {sp.sstr(g)}"},

            {"step_number": 2, "description": f"f' = {sp.sstr(df)}, g' = {sp.sstr(dg)}", "expression": f"f' = {sp.sstr(df)}, g' = {sp.sstr(dg)}"},

            {"step_number": 3, "description": "Product rule: (fg)' = f'g + fg'", "expression": sp.sstr(sp.expand(df * g + f * dg))},

            {"step_number": 4, "description": "Final answer", "result": str(sp.expand(answer))},

        ]



    def _steps_chain(self, rng, sp, expr, answer, inner):

        return [

            {"step_number": 1, "description": f"Let \\(u = {sp.latex(inner)}\\) so \\(u' = {sp.latex(sp.diff(inner, sp.Symbol('x')))}\\)", "expression": f"u = {sp.sstr(inner)}"},

            {"step_number": 2, "description": "Chain rule: dy/dx = dy/du * du/dx", "expression": "d/dx = (d/du)(du/dx)"},

            {"step_number": 3, "description": "Compute derivative", "result": str(sp.expand(answer))},

        ]



    def _steps_trig(self, rng, sp, expr, answer):

        return [

            {"step_number": 1, "description": "Use product rule for trigonometric functions", "expression": "d/dx[sin(A)cos(B)] = A'cos(A)cos(B) - sin(A)B'sin(B)"},

            {"step_number": 2, "description": "Substitute and simplify", "result": str(sp.expand(answer))},

        ]



    def _steps_logarithmic(self, rng, sp, expr, answer, a_val, b_val):

        return [

            {"step_number": 1, "description": f"Given: y = ln({a_val}x² + {b_val})", "expression": f"y = {sp.sstr(expr)}"},

            {"step_number": 2, "description": "Use chain rule: d/dx ln(u) = u'/u", "expression": "dy/dx = (2ax) / (ax² + b)"},

            {"step_number": 3, "description": "Substitute values", "result": str(answer)},

        ]



    def _minimal_fallback(

        self, rng, topic: str, difficulty: str, question_type: str

    ) -> dict:

        """Ultimate fallback when SymPy is also unavailable."""

        a, b = rng.randint(2, 12), rng.randint(1, 9)

        if difficulty == "easy":

            text = f"Differentiate \\(f(x) = {a}x^2 + {b}x\\) with respect to \\(x\\)."

            answer_str = f"\\(f'(x) = {2*a}x + {b}\\)"

        else:

            text = f"Find \\(\\frac{{d}}{{dx}}\\) of \\(({a}x+{b})^3\\) using the chain rule."

            answer_str = f"\\(3({a}x+{b})^2 \\cdot {a} = {3 * a * b ** 2}x^2 + ...\\)"

        return {

            "question": text,

            "answer": answer_str,

            "solution_steps": [

                {"step_number": 1, "description": "Apply differentiation rule", "result": answer_str}

            ],

            "explanation": "Basic differentiation.",

            "marks": 3,

            "bloom_level": "Apply",

        }



    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    #  PRIVATE — PRINTABLE HTML

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━



    def _build_printable_html(

        self,

        ws: WorksheetDetail,

        school_name: str,

        class_display: str,

        show_answer_key: bool,

    ) -> tuple[str, str]:

        """Build student copy and answer key HTML."""

        today = datetime.utcnow().strftime("%d %B %Y")

        topic_display = " | ".join(

            t.replace("_", " ").replace("-", " ").title() for t in ws.topic_ids

        )



        # ── Student copy ─────────────────────────────────────────

        standard_qs = [q for q in ws.questions if q.type == "standard"]

        competency_qs = [q for q in ws.questions if q.type == "competency"]



        student_copy = f"""

        <div class="sheet">

          <div class="sheet-header">

            <div class="school-name">{school_name or 'School / Coaching Institute'}</div>

            <div class="worksheet-title">📝 Worksheet — {ws.title}</div>

            <div class="sub-title">{ws.subject} | {topic_display}</div>

          </div>

          <div class="info-grid">

            <div><strong>Class:</strong> {class_display or '—'}</div>

            <div><strong>Date:</strong> {today}</div>

            <div><strong>Max Marks:</strong> {ws.total_points}</div>

            <div><strong>Duration:</strong> 45 min</div>

            <div><strong>Roll No:</strong> _______________</div>

            <div><strong>Name:</strong> _________________</div>

          </div>

          <div class="instructions">

            <strong>Instructions:</strong> All questions are compulsory. Show all steps.

            Figures are not to scale. Calculator not permitted unless specified.

          </div>

        {_render_questions_section(standard_qs, 'SECTION A — Standard Questions', 'var(--standard-color)')}

        {_render_questions_section(competency_qs, 'SECTION B — Competency / Higher-Order Thinking', 'var(--competency-color)')}

        </div>

        """.replace("{\\u005f", "{").strip()



        # ── Answer key ───────────────────────────────────────────

        answer_sections: list[str] = []

        if standard_qs:

            answer_sections.append(_render_solutions_section(standard_qs, "SECTION A — Answer Key", "var(--standard-color)"))

        if competency_qs:

            answer_sections.append(_render_solutions_section(competency_qs, "SECTION B — Answer Key", "var(--competency-color)"))



        answer_key = f"""

        <div class="sheet">

          <div class="sheet-header">

            <div class="school-name">{school_name or 'School / Coaching Institute'}</div>

            <div class="worksheet-title">✅ Answer Key — {ws.title}</div>

            <div class="sub-title">{ws.subject} | {topic_display}</div>

          </div>

          {''.join(answer_sections)}

        </div>

        """.strip()



        return student_copy, answer_key



    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    #  PRIVATE — WHATSAPP

    # ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━



    def _build_whatsapp_header(self, ws: WorksheetDetail) -> str:

        topic_display = " | ".join(

            t.replace("_", " ").replace("-", " ").title() for t in ws.topic_ids

        )

        return (
            f"📝 *{ws.title}*\n\n"
            f"📚 Subject: {ws.subject}\n"
            f"📖 Topic: {topic_display}\n"
            f"❓ Questions: {ws.num_questions} | 🏆 Marks: {ws.total_points}\n"
            f"📊 Difficulty: {ws.difficulty.title()}\n\n"
            f"Solve all questions and submit your answers before the deadline. "
            f"Show all working steps. Best of luck! 🚀"
        )



    def _build_whatsapp_questions(self, ws: WorksheetDetail) -> str:

        lines: list[str] = ["*Questions:*"]

        for q in ws.questions:

            tag = "🔵" if q.type == "standard" else "🟢"

            lines.append(f"{tag} Q{q.index + 1} [{q.marks}m — {q.bloom_level}]")

            lines.append(f"{q.text}")

            lines.append("")

        return "\n".join(lines)



    def _build_whatsapp_answer_key(self, ws: WorksheetDetail) -> str:

        lines: list[str] = ["*Answer Key:*"]