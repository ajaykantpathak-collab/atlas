"""
Homework Service — teacher assigns, student completes, parent notified via WhatsApp.
Integrates with practice engine, streak service, mastery sync, and LLM client.
Supports offline queueing and auto-sync.
"""
from __future__ import annotations

import json
from collections import defaultdict
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from uuid import uuid4

from sqlalchemy import and_, func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from database import (
    Homework,
    HomeworkQuestion,
    HomeworkSubmission,
    HomeworkSubmissionAnswer,
    HomeworkStatus,
    OfflineQueue,
    Student,
    SubmissionStatus,
    Teacher,
    async_session_maker,
)
from services.llm_client import LLMClient, Message
from services.mastery_sync import MasterySyncService
from services.notification_service import NotificationService
from services.practice_service import PracticeService
from services.streak_service import StreakService


class HomeworkService:
    """
    Service for homework lifecycle:
      • Teacher creates homework with auto-generated questions
      • Student views, attempts, submits (offline-capable)
      • Auto-grading with partial credit (LLM-backed for descriptive)
      • Parent WhatsApp notifications on assign / complete / overdue
    """

    # ------------------------------------------------------------------ #
    # INIT
    # ------------------------------------------------------------------ #

    def __init__(
        self,
        llm_client: Optional[LLMClient] = None,
    ) -> None:
        self.llm_client = llm_client or LLMClient()
        self.practice_service = PracticeService()
        self.streak_service = StreakService()
        self.mastery_sync = MasterySyncService()
        self.notification_service = NotificationService()

    # ------------------------------------------------------------------ #
    # INTERNAL HELPERS
    # ------------------------------------------------------------------ #

    async def _session(self) -> AsyncSession:
        return async_session_maker()

    @staticmethod
    def _utcnow() -> datetime:
        return datetime.now(timezone.utc)

    # ------------------------------------------------------------------ #
    # TEACHER: CREATE HOMEWORK
    # ------------------------------------------------------------------ #

    async def create_homework(
        self,
        teacher_id: str,
        subject: str,
        topic_ids: List[str],
        problem_types: List[str],
        num_questions: int,
        due_date: datetime,
        class_id: str,
        instructions: Optional[str] = None,
        time_limit_minutes: Optional[int] = None,
    ) -> Dict[str, Any]:
        """
        Create a homework assignment with auto-generated questions.
        Generates questions via practice engine → falls back to LLM.
        Notifies all students + parents via WhatsApp.
        """
        async with await self._session() as session:
            # Validate teacher
            teacher = (
                await session.execute(
                    select(Teacher).where(Teacher.id == teacher_id)
                )
            ).scalar_one_or_none()
            if not teacher:
                raise ValueError(f"Teacher {teacher_id} not found")

            homework_id = f"hw_{uuid4().hex[:12]}"

            homework = Homework(
                id=homework_id,
                teacher_id=teacher_id,
                class_id=class_id,
                subject=subject,
                topic_ids=topic_ids,
                problem_types=problem_types,
                num_questions=num_questions,
                due_date=due_date,
                instructions=instructions,
                time_limit_minutes=time_limit_minutes,
                status=HomeworkStatus.ASSIGNED,
                created_at=self._utcnow(),
            )
            session.add(homework)
            await session.flush()

            # Generate questions
            questions = await self._generate_questions(
                subject=subject,
                topic_ids=topic_ids,
                problem_types=problem_types,
                num_questions=num_questions,
            )

            for idx, q in enumerate(questions):
                session.add(
                    HomeworkQuestion(
                        id=f"hwq_{uuid4().hex[:10]}",
                        homework_id=homework_id,
                        question_text=q["text"],
                        question_type=q["type"],
                        options=q.get("options"),
                        correct_answer=json.dumps(q["correct_answer"])
                        if not isinstance(q["correct_answer"], str)
                        else q["correct_answer"],
                        solution_steps=q.get("solution_steps", []),
                        points=q.get("points", 1),
                        difficulty=q.get("difficulty", "medium"),
                        order=idx,
                        metadata_json=json.dumps(q.get("metadata", {})),
                    )
                )

            await session.commit()

        # Fire-and-forget notifications (outside transaction)
        await self._notify_class_assignment(class_id, homework_id, subject, due_date, num_questions)

        return {
            "homework_id": homework_id,
            "subject": subject,
            "num_questions": num_questions,
            "due_date": due_date.isoformat(),
            "status": "assigned",
            "questions_preview": [
                {"id": q["id"], "type": q["type"], "points": q.get("points", 1)}
                for q in questions[:3]
            ],
        }

    async def _generate_questions(
        self,
        subject: str,
        topic_ids: List[str],
        problem_types: List[str],
        num_questions: int,
    ) -> List[Dict[str, Any]]:
        """Try practice engine first; fall back to LLM."""
        questions: List[Dict[str, Any]] = []

        # 1) Practice engine
        try:
            pq = await self.practice_service.generate_questions(
                subject=subject,
                topic_ids=topic_ids,
                problem_types=problem_types,
                count=num_questions,
                difficulty="medium",
            )
            if pq:
                questions.extend(pq)
        except Exception:
            pass

        # 2) LLM fallback
        if len(questions) < num_questions:
            try:
                llm_q = await self._llm_generate(
                    subject=subject,
                    topic_ids=topic_ids,
                    problem_types=problem_types,
                    count=num_questions - len(questions),
                )
                questions.extend(llm_q)
            except Exception:
                pass

        return questions[:num_questions]

    async def _llm_generate(
        self,
        subject: str,
        topic_ids: List[str],
        problem_types: List[str],
        count: int,
    ) -> List[Dict[str, Any]]:
        """Use LLM to generate ISC-aligned questions."""
        prompt = (
            f"You are an ISC (Class 11-12) Maths teacher. Generate {count} questions for '{subject}'.\n"
            f"Topics: {', '.join(topic_ids)}. Types: {', '.join(problem_types)}.\n"
            "Return ONLY a JSON array (no markdown fences). Each element:\n"
            '{ "text": string, "type": string, "options": string[] | null,'
            ' "correct_answer": string | number, "solution_steps": string[],'
            ' "points": number (1-5), "difficulty": "easy"|"medium"|"hard",'
            ' "metadata": { "topic": string, "blooms": string } }\n'
            "Include step-by-step solutions for numerical and proof questions."
        )
        resp = await self.llm_client.chat([Message(role="user", content=prompt)], temperature=0.7)
        content = resp.content.strip()
        if "```" in content:
            parts = content.split("```")
            for p in parts:
                p = p.strip()
                if p.startswith("json"):
                    p = p[4:].strip()
                try:
                    return json.loads(p)
                except Exception:
                    continue
        return json.loads(content)

    async def _notify_class_assignment(
        self,
        class_id: str,
        homework_id: str,
        subject: str,
        due_date: datetime,
        num_questions: int,
    ) -> None:
        """Notify every student (and parent) in the class."""
        async with await self._session() as session:
            students = (
                await session.execute(
                    select(Student).where(Student.class_id == class_id)
                )
            ).scalars().all()

        for s in students:
            try:
                await self.notification_service.notify_student_homework_assigned(
                    student_id=s.id,
                    homework_id=homework_id,
                    subject=subject,
                    due_date=due_date,
                )
            except Exception:
                pass
            try:
                await self.notify_parent(
                    student_id=s.id,
                    event_type="homework_assigned",
                    data={
                        "subject": subject,
                        "due_date": due_date.isoformat(),
                        "num_questions": num_questions,
                        "homework_id": homework_id,
                    },
                )
            except Exception:
                pass

    # ------------------------------------------------------------------ #
    # STUDENT: VIEW HOMEWORK
    # ------------------------------------------------------------------ #

    async def get_homework(self, student_id: str) -> List[Dict[str, Any]]:
        """List all homework for the student's class with status."""
        async with await self._session() as session:
            student = (
                await session.execute(select(Student).where(Student.id == student_id))
            ).scalar_one_or_none()
            if not student:
                return []

            hws = (
                await session.execute(
                    select(Homework)
                    .where(Homework.class_id == student.class_id)
                    .order_by(Homework.due_date.asc())
                )
            ).scalars().all()

            subs = {
                s.homework_id: s
                for s in (
                    await session.execute(
                        select(HomeworkSubmission).where(
                            and_(
                                HomeworkSubmission.student_id == student_id,
                                HomeworkSubmission.homework_id.in_([h.id for h in hws]),
                            )
                        )
                    )
                ).scalars().all()
            }

            pending_offline = {
                q.entity_id: q
                for q in (
                    await session.execute(
                        select(OfflineQueue).where(
                            and_(
                                OfflineQueue.student_id == student_id,
                                OfflineQueue.action_type == "submit_homework",
                                OfflineQueue.synced.is_(False),
                            )
                        )
                    )
                ).scalars().all()
            }

            now = self._utcnow()
            out: List[Dict[str, Any]] = []
            for hw in hws:
                sub = subs.get(hw.id)
                status = "pending"
                is_late = False
                if sub:
                    if sub.status == SubmissionStatus.GRADED:
                        status = "graded"
                        is_late = sub.submitted_at > hw.due_date
                    elif sub.status == SubmissionStatus.LATE:
                        status = "late"
                        is_late = True
                    elif sub.status == SubmissionStatus.SUBMITTED:
                        status = "submitted"
                elif hw.due_date < now:
                    status = "overdue"
                    is_late = True
                if hw.id in pending_offline:
                    status = "submitting"

                out.append(
                    {
                        "homework_id": hw.id,
                        "subject": hw.subject,
                        "topic_ids": hw.topic_ids,
                        "problem_types": hw.problem_types,
                        "num_questions": hw.num_questions,
                        "due_date": hw.due_date.isoformat(),
                        "created_at": hw.created_at.isoformat(),
                        "instructions": hw.instructions,
                        "status": status,
                        "is_late": is_late,
                        "score": sub.score if sub else None,
                        "max_score": sub.max_score if sub else None,
                        "percentage": sub.percentage if sub else None,
                        "submitted_at": sub.submitted_at.isoformat() if sub else None,
                    }
                )
            return out

    async def get_homework_detail(
        self, homework_id: str, student_id: str
    ) -> Dict[str, Any]:
        """Get homework with questions (answers hidden unless already submitted)."""
        async with await self._session() as session:
            hw = (
                await session.execute(
                    select(Homework)
                    .where(Homework.id == homework_id)
                    .options(selectinload(Homework.questions))
                )
            ).scalar_one_or_none()
            if not hw:
                raise ValueError(f"Homework {homework_id} not found")

            student = (
                await session.execute(select(Student).where(Student.id == student_id))
            ).scalar_one_or_none()
            if not student or student.class_id != hw.class_id:
                raise ValueError("Not authorized for this homework")

            sub = (
                await session.execute(
                    select(HomeworkSubmission).where(
                        and_(
                            HomeworkSubmission.homework_id == homework_id,
                            HomeworkSubmission.student_id == student_id,
                        )
                    )
                )
            ).scalar_one_or_none()

            q_map = {q.id: q for q in hw.questions}
            answer_map: Dict[str, Any] = {}
            if sub:
                ans_rows = (
                    await session.execute(
                        select(HomeworkSubmissionAnswer).where(
                            HomeworkSubmissionAnswer.submission_id == sub.id
                        )
                    )
                ).scalars().all()
                answer_map = {a.question_id: a for a in ans_rows}
            questions_out = []
            for q in sorted(hw.questions, key=lambda x: x.order):
                entry: Dict[str, Any] = {
                    "question_id": q.id,
                    "text": q.question_text,
                    "type": q.question_type,
                    "options": q.options,
                    "points": q.points,
                    "difficulty": q.difficulty,
                    "order": q.order,
                }
                a = answer_map.get(q.id)
                if a:
                    entry["student_answer"] = (
                        json.loads(a.student_answer)
                        if a.student_answer
                        else None
                    )
                    entry["is_correct"] = a.is_correct
                    entry["partial_score"] = a.partial_score
                    entry["feedback"] = a.feedback
                else:
                    entry["student_answer"] = None
                    entry["is_correct"] = None
                    entry["partial_score"] = None
                    entry["feedback"] = None
                questions_out.append(entry)

            return {
                "homework_id": hw.id,
                "subject": hw.subject,
                "topic_ids": hw.topic_ids,
                "problem_types": hw.problem_types,
                "instructions": hw.instructions,
                "due_date": hw.due_date.isoformat(),
                "time_limit_minutes": hw.time_limit_minutes,
                "status": sub.status.value if sub else "pending",
                "questions": questions_out,
                "total_questions": len(questions_out),
            }

    # ------------------------------------------------------------------ #
    # STUDENT: SUBMIT HOMEWORK
    # ------------------------------------------------------------------ #

    async def submit_homework(
        self,
        student_id: str,
        homework_id: str,
        answers: Dict[str, Any],
        device_info: Optional[Dict[str, Any]] = None,
    ) -> Dict[str, Any]:
        """
        Submit and auto-grade homework.
        • Awards partial credit (step-by-step via LLM for descriptive).
        • Updates streak + mastery.
        • Notifies parent on WhatsApp.
        """
        async with await self._session() as session:
            hw = (
                await session.execute(
                    select(Homework)
                    .where(Homework.id == homework_id)
                    .options(selectinload(Homework.questions))
                )
            ).scalar_one_or_none()
            if not hw:
                raise ValueError(f"Homework {homework_id} not found")

            existing = (
                await session.execute(
                    select(HomeworkSubmission).where(
                        and_(
                            HomeworkSubmission.homework_id == homework_id,
                            HomeworkSubmission.student_id == student_id,
                        )
                    )
                )
            ).scalar_one_or_none()
            if existing:
                raise ValueError("Homework already submitted")

            submitted_at = self._utcnow()
            is_late = submitted_at > hw.due_date

            submission = HomeworkSubmission(
                id=f"hws_{uuid4().hex[:12]}",
                homework_id=homework_id,
                student_id=student_id,
                submitted_at=submitted_at,
                is_late=is_late,
                status=SubmissionStatus.SUBMITTED,
                device_info=json.dumps(device_info) if device_info else None,
            )
            session.add(submission)
            await session.flush()

            q_map = {q.id: q for q in hw.questions}
            total_score = 0.0
            max_score = 0.0
            graded_answers: List[Dict[str, Any]] = []

            for qid, raw_ans in answers.items():
                q = q_map.get(qid)
                if not q:
                    continue
                max_score += q.points

                grade = await self._grade_answer(q, raw_ans)
                total_score += grade["score"]

                sa_raw = raw_ans
                if isinstance(sa_raw, (dict, list)):
                    sa_raw = json.dumps(sa_raw)
                else:
                    sa_raw = str(sa_raw)

                session.add(
                    HomeworkSubmissionAnswer(
                        id=f"hwa_{uuid4().hex[:10]}",
                        submission_id=submission.id,
                        question_id=qid,
                        student_answer=sa_raw,
                        is_correct=grade["is_correct"],
                        partial_score=grade["score"],
                        feedback=grade["feedback"],
                        graded_at=self._utcnow(),
                        metadata_json=json.dumps(grade.get("metadata", {})),
                    )
                )
                graded_answers.append(
                    {
                        "question_id": qid,
                        "score": grade["score"],
                        "max_score": q.points,
                        "is_correct": grade["is_correct"],
                        "feedback": grade["feedback"],
                    }
                )

            submission.score = total_score
            submission.max_score = max_score
            submission.percentage = (
                round(total_score / max_score * 100, 1) if max_score else 0.0
            )
            submission.status = (
                SubmissionStatus.LATE if is_late else SubmissionStatus.GRADED
            )
            await session.commit()

        pct = submission.percentage or 0

        # Post-commit side effects
        try:
            await self.streak_service.record_practice(
                student_id=student_id, subject=hw.subject, score=pct
            )
        except Exception:
            pass

        try:
            for tid in hw.topic_ids:
                await self.mastery_sync.update_on_attempt(
                    student_id=student_id,
                    topic_id=tid,
                    is_correct=pct >= 60,
                    score=pct,
                    metadata={"homework_id": homework_id},
                )
        except Exception:
            pass

        try:
            await self.notify_parent(
                student_id=student_id,
                event_type="homework_completed",
                data={
                    "homework_id": homework_id,
                    "subject": hw.subject,
                    "score": total_score,
                    "max_score": max_score,
                    "percentage": pct,
                    "is_late": is_late,
                    "num_questions": len(q_map),
                },
            )
        except Exception:
            pass

        return {
            "submission_id": submission.id,
            "homework_id": homework_id,
            "score": total_score,
            "max_score": max_score,
            "percentage": pct,
            "is_late": is_late,
            "status": submission.status.value,
            "answers": graded_answers,
            "message": self._result_message(pct, is_late),
        }

    # ------------------------------------------------------------------ #
    # GRADING ENGINE
    # ------------------------------------------------------------------ #

    async def _grade_answer(
        self, question: HomeworkQuestion, student_answer: Any
    ) -> Dict[str, Any]:
        """Grade a single answer; supports exact-match + LLM step-by-step."""
        qtype = question.question_type

        # --- Numerical / fill-blank -------------------------------------
        if qtype in ("numerical", "fill_blank"):
            correct = str(question.correct_answer).strip().lower()
            given = str(student_answer).strip().lower()
            match = False
            try:
                match = abs(float(correct.replace(",", "")) - float(given.replace(",", ""))) < 1e-6
            except (ValueError, TypeError):
                match = correct == given
            score = question.points if match else 0
            return {
                "score": score,
                "is_correct": match,
                "feedback": "\u2713 Sahi jawab!"
                if match
                else f"\u2717 Galat. Sahi jawab: {question.correct_answer}",
                "metadata": {"method": "exact_numerical"},
            }

        # --- MCQ --------------------------------------------------------
        if qtype == "mcq":
            correct = str(question.correct_answer).strip().lower()
            given = str(student_answer).strip().lower()
            ok = correct == given
            return {
                "score": question.points if ok else 0,
                "is_correct": ok,
                "feedback": "\u2713 Bahut badhiya!"
                if ok
                else f"\u2717 Galat. Sahi option: {question.correct_answer}",
                "metadata": {"method": "exact_mcq"},
            }

        # --- Step-by-step / descriptive / proof / derivation ------------
        if qtype in (
            "descriptive",
            "proof",
            "derivation",
            "numerical_steps",
        ):
            return await self._grade_step_by_step(question, student_answer)

        # --- Fallback ---------------------------------------------------
        correct = str(question.correct_answer).strip().lower()
        given = str(student_answer).strip().lower()
        ok = correct == given
        return {
            "score": question.points if ok else 0,
            "is_correct": ok,
            "feedback": self._encourage(question.points if ok else 0, question.points),
            "metadata": {"method": "fallback_exact"},
        }

    async def _grade_step_by_step(
        self, question: HomeworkQuestion, student_answer: Any
    ) -> Dict[str, Any]:
        """LLM-backed step-by-step grading with partial credit."""
        sol_steps = question.solution_steps or []
        stu_steps = (
            student_answer if isinstance(student_answer, list) else [student_answer]
        )

        prompt = (
            f"Grade this ISC Maths answer step by step. Award partial credit (0 to {question.points} total).\n\n"
            f"Q: {question.question_text}\n\n"
            f"Correct Steps:\n"
            + "\n".join(f"{i+1}. {s}" for i, s in enumerate(sol_steps))
            + "\n\nStudent's Steps:\n"
            + "\n".join(f"Step {i+1}: {s}" for i, s in enumerate(stu_steps))
            + "\n\nReturn ONLY JSON:\n"
            '{ "score": number, "is_correct": boolean,'
            ' "step_feedback": [{"step": n, "correct": bool, "feedback": str}],'
            ' "overall_feedback": str, "suggestions": str }\n'
            "Be lenient: credit for correct methodology even with arithmetic errors."
        )

        try:
            resp = await self.llm_client.chat(
                [Message(role="user", content=prompt)], temperature=0.2
            )
            content = resp.content.strip()
            if "```" in content:
                for block in content.split("```"):
                    block = block.strip()
                    if block.startswith("json"):
                        block = block[4:]
                    try:
                        data = json.loads(block)
                        break
                    except Exception:
                        continue
            else:
                data = json.loads(content)

            score = max(0.0, min(float(question.points), float(data.get("score", 0))))
            return {
                "score": score,
                "is_correct": score >= question.points * 0.8,
                "feedback": data.get(
                    "overall_feedback", self._encourage(score, question.points)
                ),
                "metadata": {
                    "method": "llm_step_by_step",
                    "step_feedback": data.get("step_feedback", []),
                    "suggestions": data.get("suggestions", ""),
                },
            }
        except Exception:
            # Graceful fallback → exact match
            correct = str(question.correct_answer).strip().lower()
            given = " ".join(str(s) for s in stu_steps).strip().lower()
            ok = correct in given or given in correct
            return {
                "score": question.points if ok else 0,
                "is_correct": ok,
                "feedback": self._encourage(
                    question.points if ok else 0, question.points
                ),
                "metadata": {"method": "fallback_substring"},
            }

    @staticmethod
    def _encourage(score: float, max_score: int) -> str:
        pct = score / max_score if max_score else 0
        if pct >= 0.8:
            return "\u2713 Bahut badhiya! Excellent work!"
        if pct >= 0.5:
            return "\U0001F44C Achha hai! Thoda aur practice karo."
        if pct > 0:
            return "\U0001F4DA Theek hai. Concept samajh ke phir try karo."
        return "\U0001F4AA Chalo, phir se try karo! Explanation padh lo."

    @staticmethod
    def _result_message(pct: float, is_late: bool) -> str:
        if is_late:
            return "Late submission! Score: {pct}%. Keep practicing!".format(pct=pct)
        if pct >= 90:
            return "Outstanding performance! \U0001F3C6"
        if pct >= 75:
            return "Great job! Keep it up! \U0001F31F"
        if pct >= 60:
            return "Good work! Room for improvement. \U0001F4C8"
        return "Keep practicing! You'll get better. \U0001F4AA"

    # ------------------------------------------------------------------ #
    # OVERDUE & REMINDERS
    # ------------------------------------------------------------------ #

    async def get_overdue(self, student_id: str) -> List[Dict[str, Any]]:
        """Return homework past due date with no submission."""
        async with await self._session() as session:
            student = (
                await session.execute(select(Student).where(Student.id == student_id))
            ).scalar_one_or_none()
            if not student:
                return []

            hws = (
                await session.execute(
                    select(Homework).where(Homework.class_id == student.class_id)
                )
            ).scalars().all()

            submitted = {
                s.homework_id
                for s in (
                    await session.execute(
                        select(HomeworkSubmission).where(
                            and_(
                                HomeworkSubmission.student_id == student_id,
                                HomeworkSubmission.homework_id.in_([h.id for h in hws]),
                            )
                        )
                    )
                ).scalars().all()
            }

            now = self._utcnow()
            return [
                {
                    "homework_id": h.id,
                    "subject": h.subject,
                    "due_date": h.due_date.isoformat(),
                    "days_overdue": (now - h.due_date).days,
                    "instructions": h.instructions,
                }
                for h in hws
                if h.due_date < now and h.id not in submitted
            ]

    async def check_and_notify_overdue(self) -> int:
        """Background job — notify parents about overdue homework. Returns count sent."""
        async with await self._session() as session:
            students = (await session.execute(select(Student))).scalars().all()

        count = 0
        for s in students:
            items = await self.get_overdue(s.id)
            for item in items:
                try:
                    await self.notify_parent(
                        student_id=s.id,
                        event_type="homework_overdue",
                        data=item,
                    )
                    count += 1
                except Exception:
                    continue
        return count

    # ------------------------------------------------------------------ #
    # PARENT WHATSAPP NOTIFICATIONS
    # ------------------------------------------------------------------ #

    async def notify_parent(
        self,
        student_id: str,
        event_type: str,
        data: Dict[str, Any],
    ) -> Dict[str, Any]:
        """Send WhatsApp message to student's parent."""
        async with await self._session() as session:
            student = (
                await session.execute(select(Student).where(Student.id == student_id))
            ).scalar_one_or_none()
            if not student or not getattr(student, "parent_phone", None):
                return {"status": "skipped", "reason": "no_parent_phone"}

            templates = {
                "homework_assigned": self._msg_assigned,
                "homework_completed": self._msg_completed,
                "homework_overdue": self._msg_overdue,
            }
            formatter = templates.get(event_type)
            msg = (
                formatter(student, data) if formatter else "Homework update."
            )

        result = await self.notification_service.send_whatsapp(
            phone=student.parent_phone, message=msg
        )
        return {
            "status": "sent",
            "student_id": student_id,
            "event_type": event_type,
            "phone": student.parent_phone,
            "message_id": result.get("message_id"),
        }

    @staticmethod
    def _msg_assigned(student: Student, d: Dict) -> str:
        name = student.name or "your child"
        due = datetime.fromisoformat(d["due_date"]) if isinstance(d["due_date"], str) else d["due_date"]
        due_str = due.strftime("%d %b, %I:%M %p") if due.hour or due.minute else due.strftime("%d %b")
        return (
            "\U0001F4DA *Homework Assigned*\n\n"
            f"Namaste! {name} ko {d.get('subject','subject')} ka naya homework assigned hua hai.\n\n"
            f"\U0001F4DD Questions: {d.get('num_questions','?')}\n"
            f"\U0001F4C5 Due Date: {due_str}\n\n"
            "Homework complete karne ke liye app mein jayein. All the best! \U0001F4AA"
        )

    @staticmethod
    def _msg_completed(student: Student, d: Dict) -> str:
        name = student.name or "your child"
        pct = d.get("percentage", 0)
        late = d.get("is_late", False)

        if pct >= 90:
            icon, comment = "\U0001F3C6", "Outstanding performance!"
        elif pct >= 75:
            icon, comment = "\U0001F31F", "Great progress!"
        elif pct >= 60:
            icon, comment = "\U0001F44F", "Good job!"
        else:
            icon, comment = "\U0001F4DA", "Needs more practice"

        late_note = " (Late submission)" if late else ""
        return (
            f"\u2705 *Homework Completed* {icon}\n\n"
            f"{name} ne {d.get('subject','subject')} ka homework complete kar liya hai.{late_note}\n\n"
            f"\U0001F4CA Score: {d.get('score','?')}/{d.get('max_score','?')} ({pct}%)\n"
            f"\U0001F4AC {comment}\n\n"
            "Detailed feedback app mein dekh sakte hain."
        )

    @staticmethod
    def _msg_overdue(student: Student, d: Dict) -> str:
        name = student.name or "your child"
        days = d.get("days_overdue", 0)
        return (
            "\u26A0\uFE0F *Homework Overdue*\n\n"
            f"Namaste! {name} ka {d.get('subject','subject')} ka homework abhi tak submit nahi hua hai.\n\n"
            f"\U0001F4C5 Due Date: {d.get('due_date','?')}\n"
            f"\u23F0 {days} din ho gaya\n\n"
            "Kripya jaldi complete karayein. Help ke liye app ke solver ka use karein!"
        )

    # ------------------------------------------------------------------ #
    # OFFLINE QUEUE & SYNC
    # ------------------------------------------------------------------ #

    async def queue_for_sync(
        self,
        student_id: str,
        action_type: str,
        entity_id: str,
        payload: Dict[str, Any],
    ) -> Dict[str, Any]:
        """Persist an action to the offline queue."""
        async with await self._session() as session:
            item = OfflineQueue(
                id=f"oq_{uuid4().hex[:12]}",
                student_id=student_id,
                action_type=action_type,
                entity_id=entity_id,
                payload_json=json.dumps(payload),
                synced=False,
                created_at=self._utcnow(),
                retries=0,
            )
            session.add(item)
            await session.commit()
        return {"queue_id": item.id, "status": "queued", "action": action_type}

    async def sync_pending(self, student_id: str) -> Dict[str, Any]:
        """Replay all unsynced offline actions for a student."""
        async with await self._session() as session:
            pending = (
                await session.execute(
                    select(OfflineQueue).where(
                        and_(
                            OfflineQueue.student_id == student_id,
                            OfflineQueue.synced.is_(False),
                        )
                    ).order_by(OfflineQueue.created_at.asc())
                )
            ).scalars().all()

        synced = 0
        failed = 0
        for item in pending:
            try:
                payload = json.loads(item.payload_json)
                if item.action_type == "submit_homework":
                    await self.submit_homework(
                        student_id=student_id,
                        homework_id=payload.get("homework_id", ""),
                        answers=payload.get("answers", {}),
                        device_info=payload.get("device_info"),
                    )
                item.synced = True
                item.synced_at = self._utcnow()
                synced += 1
            except Exception:
                item.retries += 1
                if item.retries >= 3:
                    item.synced = True
                    item.error = "max_retries_exceeded"
                failed += 1

        async with await self._session() as session:
            for item in pending:
                session.add(item)
            await session.commit()

        return {"total": len(pending), "synced": synced, "failed": failed}

    async def get_pending_count(self, student_id: str) -> int:
        """Number of unsynced offline actions for the student."""
        async with await self._session() as session:
            return (
                await session.execute(
                    select(func.count(OfflineQueue.id)).where(
                        and_(
                            OfflineQueue.student_id == student_id,
                            OfflineQueue.synced.is_(False),
                        )
                    )
                )
            ).scalar_one_or_none() or 0

    # ------------------------------------------------------------------ #
    # ANALYTICS
    # ------------------------------------------------------------------ #

    async def get_student_progress(
        self, student_id: str, subject: Optional[str] = None
    ) -> Dict[str, Any]:
        """Homework analytics — averages, streaks, per-subject breakdown."""
        async with await self._session() as session:
            student = (
                await session.execute(select(Student).where(Student.id == student_id))
            ).scalar_one_or_none()
            if not student:
                return {}

            q = select(HomeworkSubmission).where(
                HomeworkSubmission.student_id == student_id
            )
            if subject:
                q = q.join(Homework).where(Homework.subject == subject)

            subs = (await session.execute(q)).scalars().all()
            graded = [s for s in subs if s.status == SubmissionStatus.GRADED]
            late = [s for s in subs if s.is_late]
            scores = [s.percentage for s in graded if s.percentage is not None]
            avg = round(sum(scores) / len(scores), 1) if scores else 0.0

            by_subject: Dict[str, List[float]] = defaultdict(list)
            for s in graded:
                hw = (
                    await session.execute(
                        select(Homework).where(Homework.id == s.homework_id)
                    )
                ).scalar_one_or_none()
                if hw:
                    by_subject[hw.subject].append(s.percentage or 0)

            subject_avg = {
                sub: round(sum(v) / len(v), 1) for sub, v in by_subject.items()
            }

            try:
                streak = await self.streak_service.get_streak(student_id)
            except Exception:
                streak = {"current": 0, "best": 0}

            return {
                "total_submissions": len(subs),
                "graded": len(graded),
                "late_submissions": len(late),
                "average_score": avg,
                "by_subject": subject_avg,
                "streak": streak,
            }
