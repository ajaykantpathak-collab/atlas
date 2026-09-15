"""LLM grader — Tier 3 rubric-based grading for borderline/complex answers.

Uses a local LLM (Qwen2.5-7B primary, DeepSeek fallback) to grade student
answers against rubric criteria when Tier 1 (deterministic) and Tier 2
(cross-encoder) are inconclusive.

The LLM judges each rubric criterion as met/not-met (boolean) and provides
brief feedback. The final score is the weighted fraction of met criteria.

Only used for:
  - Borderline cases (Tier 2 STS score 0.4-0.7)
  - Multi-criterion answers (long answer, essay, multi-part)
  - Hindi answers where cross-encoder is uncertain

Langfuse tracing:
  All Tier 3 LLM grading calls are traced via Langfuse (if configured).
  Set environment variables:
    LANGFUSE_PUBLIC_KEY=...
    LANGFUSE_SECRET_KEY=...
    LANGFUSE_HOST=https://cloud.langfuse.com
  Traces include: prompt, response, model, latency, rubric, and result.

Usage:
    from backend.services.llm_grader import LLMGrader
    from backend.services.rubric_generator import Rubric

    grader = LLMGrader()
    result = await grader.grade(
        student_answer="...",
        model_answer="...",
        rubric=rubric,
        max_marks=5,
    )
    # result = {
    #     "marks_awarded": 4,
    #     "max_marks": 5,
    #     "criteria_met": ["c1", "c2", "c3", "c4"],
    #     "criteria_missed": ["c5"],
    #     "feedback": "Good answer, missing conclusion.",
    #     "model": "qwen2.5-7b",
    # }
"""

import asyncio
import json
import os
from dataclasses import dataclass, field
from typing import Optional


# ---------------------------------------------------------------------------
# Langfuse tracing (optional — only active if configured)
# ---------------------------------------------------------------------------

def _get_langfuse():
    """Get Langfuse client if configured, else None."""
    if not os.environ.get("LANGFUSE_PUBLIC_KEY"):
        return None
    if not os.environ.get("LANGFUSE_SECRET_KEY"):
        return None
    try:
        from langfuse import Langfuse
        return Langfuse(
            public_key=os.environ["LANGFUSE_PUBLIC_KEY"],
            secret_key=os.environ["LANGFUSE_SECRET_KEY"],
            host=os.environ.get("LANGFUSE_HOST", "https://cloud.langfuse.com"),
        )
    except ImportError:
        return None
    except Exception:
        return None


@dataclass
class LLMGradeResult:
    """Result of LLM-based grading."""
    marks_awarded: int
    max_marks: int
    criteria_met: list = field(default_factory=list)
    criteria_missed: list = field(default_factory=list)
    feedback: str = ""
    model: str = ""
    error: Optional[str] = None
    latency_ms: float = 0.0


class LLMGrader:
    """Tier 3 LLM-based rubric grader.

    Uses local LLMs via Ollama or LM Studio for grading. Falls back to
    a simple keyword-matching approach if no LLM is available.

    LLM priority:
      1. Qwen2.5-7B (local, via Ollama)
      2. DeepSeek (local, via Ollama)
      3. Keyword matching fallback (no LLM)
    """

    # Ollama API endpoint (default)
    OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434")

    # Model priority
    MODELS = ["qwen2.5:7b", "deepseek-r1:7b", "llama3.1:8b"]

    # Grading prompt template
    GRADE_PROMPT = """You are an expert examiner grading a student's answer for an Indian school exam (CISCE/ICSE/ISC).

Grade the student's answer against the rubric criteria below. For each criterion, judge whether the student's answer demonstrates that criterion (true/false).

Model Answer (for reference):
{model_answer}

Rubric Criteria:
{rubric_json}

Student Answer:
{student_answer}

Instructions:
1. For each criterion, output whether it is met (true) or not met (false)
2. Provide brief feedback (1-2 sentences)
3. Be strict but fair — only mark a criterion as met if the student clearly demonstrates it
4. Output ONLY valid JSON in this format:
{{"criteria": [{{"id": "c1", "met": true}}, {{"id": "c2", "met": false}}], "feedback": "Brief feedback here"}}

JSON Output:"""

    @classmethod
    async def grade(
        cls,
        student_answer: str,
        model_answer: str,
        rubric: Optional[object] = None,
        max_marks: int = 3,
        trace_id: Optional[str] = None,
    ) -> LLMGradeResult:
        """Grade a student answer using an LLM with rubric criteria.

        Args:
            student_answer: The student's free-text answer.
            model_answer: The correct/model answer.
            rubric: Rubric object with criteria (from RubricGenerator).
            max_marks: Maximum marks for the question.
            trace_id: Optional trace ID for Langfuse correlation.

        Returns:
            LLMGradeResult with marks, criteria met/missed, and feedback.
        """
        import time
        start = time.time()

        # Langfuse tracing (optional)
        langfuse = _get_langfuse()
        trace = None
        if langfuse:
            try:
                trace = langfuse.trace(
                    name="llm_grading",
                    id=trace_id,
                    metadata={
                        "max_marks": max_marks,
                        "student_answer_length": len(student_answer),
                        "model_answer_length": len(model_answer),
                    },
                )
            except Exception:
                trace = None

        # Build rubric JSON for the prompt
        if rubric and hasattr(rubric, "criteria"):
            rubric_data = [
                {"id": c.id, "description": c.description, "marks": c.marks}
                for c in rubric.criteria
            ]
        else:
            rubric_data = [{"id": "c1", "description": "Complete correct answer", "marks": max_marks}]

        rubric_json = json.dumps(rubric_data, indent=2)

        prompt = cls.GRADE_PROMPT.format(
            model_answer=model_answer[:500],
            rubric_json=rubric_json,
            student_answer=student_answer[:500],
        )

        # Log prompt to Langfuse
        if trace:
            try:
                trace.generation(
                    name="llm_grade_prompt",
                    input=prompt,
                    metadata={"rubric": rubric_data},
                )
            except Exception:
                pass

        # Try each model in priority order
        for model in cls.MODELS:
            result = await cls._try_ollama(model, prompt, rubric_data, max_marks)
            if result is not None:
                result.latency_ms = (time.time() - start) * 1000
                # Log result to Langfuse
                if trace:
                    try:
                        trace.generation(
                            name="llm_grade_result",
                            model=model,
                            output=result.feedback,
                            metadata={
                                "marks_awarded": result.marks_awarded,
                                "criteria_met": result.criteria_met,
                                "criteria_missed": result.criteria_missed,
                                "latency_ms": result.latency_ms,
                            },
                        )
                    except Exception:
                        pass
                return result

        # Fallback: keyword matching
        fallback_result = cls._keyword_fallback(
            student_answer, model_answer, rubric_data, max_marks,
            latency_ms=(time.time() - start) * 1000,
        )

        # Log fallback to Langfuse
        if trace:
            try:
                trace.generation(
                    name="llm_grade_fallback",
                    model="keyword_fallback",
                    output=fallback_result.feedback,
                    metadata={
                        "marks_awarded": fallback_result.marks_awarded,
                        "reason": "no_llm_available",
                    },
                )
            except Exception:
                pass

        return fallback_result

    @classmethod
    async def _try_ollama(
        cls,
        model: str,
        prompt: str,
        rubric_data: list,
        max_marks: int,
    ) -> Optional[LLMGradeResult]:
        """Try grading with a specific Ollama model.

        Returns None if the model is not available.
        """
        try:
            import aiohttp
        except ImportError:
            return None

        try:
            async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=30)) as session:
                # Check if model is available
                async with session.post(
                    f"{cls.OLLAMA_URL}/api/generate",
                    json={
                        "model": model,
                        "prompt": prompt,
                        "stream": False,
                        "options": {"temperature": 0.1, "num_predict": 500},
                    },
                ) as resp:
                    if resp.status != 200:
                        return None

                    data = await resp.json()
                    response_text = data.get("response", "")

                    # Parse JSON from response
                    parsed = cls._parse_llm_response(response_text)
                    if parsed is None:
                        return None

                    return cls._build_result(parsed, rubric_data, max_marks, model)

        except Exception:
            return None

    @staticmethod
    def _parse_llm_response(text: str) -> Optional[dict]:
        """Extract JSON from LLM response text."""
        # Try to find JSON in the response
        try:
            # Direct JSON parse
            return json.loads(text.strip())
        except json.JSONDecodeError:
            pass

        # Try to find JSON block
        import re
        json_match = re.search(r'\{[^{}]*"criteria"[^{}]*\}', text, re.DOTALL)
        if json_match:
            try:
                return json.loads(json_match.group())
            except json.JSONDecodeError:
                pass

        # Try line by line
        for line in text.split("\n"):
            line = line.strip()
            if line.startswith("{") and "criteria" in line:
                try:
                    return json.loads(line)
                except json.JSONDecodeError:
                    continue

        return None

    @staticmethod
    def _build_result(parsed: dict, rubric_data: list, max_marks: int, model: str) -> LLMGradeResult:
        """Build LLMGradeResult from parsed LLM response."""
        criteria_results = parsed.get("criteria", [])
        feedback = parsed.get("feedback", "")

        met_ids = []
        missed_ids = []
        marks_awarded = 0

        # Build a lookup for criterion marks
        marks_lookup = {c["id"]: c["marks"] for c in rubric_data}

        for cr in criteria_results:
            cid = cr.get("id", "")
            met = cr.get("met", False)
            if met:
                met_ids.append(cid)
                marks_awarded += marks_lookup.get(cid, 1)
            else:
                missed_ids.append(cid)

        # Clamp to max_marks
        marks_awarded = min(marks_awarded, max_marks)

        return LLMGradeResult(
            marks_awarded=marks_awarded,
            max_marks=max_marks,
            criteria_met=met_ids,
            criteria_missed=missed_ids,
            feedback=feedback,
            model=model,
        )

    @staticmethod
    def _keyword_fallback(
        student_answer: str,
        model_answer: str,
        rubric_data: list,
        max_marks: int,
        latency_ms: float = 0.0,
    ) -> LLMGradeResult:
        """Fallback grading using keyword matching when no LLM is available."""
        student_lower = student_answer.lower()
        met = []
        missed = []
        marks = 0

        for criterion in rubric_data:
            cid = criterion["id"]
            desc = criterion.get("description", "").lower()
            marks_val = criterion.get("marks", 1)

            # Check if key words from the description appear in student answer
            desc_words = [w for w in desc.split() if len(w) > 3 and w not in {
                "that", "this", "with", "from", "have", "they", "will",
                "been", "their", "which", "would", "there", "could",
            }]

            matches = sum(1 for w in desc_words if w in student_lower)
            match_ratio = matches / max(len(desc_words), 1)

            if match_ratio >= 0.3:  # 30% keyword overlap
                met.append(cid)
                marks += marks_val
            else:
                missed.append(cid)

        marks = min(marks, max_marks)

        return LLMGradeResult(
            marks_awarded=marks,
            max_marks=max_marks,
            criteria_met=met,
            criteria_missed=missed,
            feedback="Graded using keyword matching (no LLM available).",
            model="keyword_fallback",
            latency_ms=latency_ms,
        )
