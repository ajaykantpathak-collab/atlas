"""Rubric generator — offline rubric extraction from marking schemes.

Extracts grading rubrics from question metadata (marking schemes, model
answers, enrichment data) and stores them as structured JSON criteria.

Rubric sources, in priority order:
  0. Marking steps (authored examiner data — used VERBATIM, outranks everything)
  1. Board questions: parse `marking_scheme` field into criteria with mark weights
  2. Diagnostic questions: derive criteria from model answer + cognitive_type
  3. Enrichment: use `mastery_criteria` + `scope_boundary` fields

Each rubric criterion has:
  - id: unique identifier
  - description: what the student must demonstrate
  - marks: mark weight for this criterion
  - keywords: key terms that should be present
  - optional: whether this criterion is mandatory or bonus

Usage:
    from backend.services.rubric_generator import RubricGenerator

    generator = RubricGenerator()
    rubric = generator.generate_from_marking_scheme(
        marking_scheme="1 mark for stating Ohm's law. 1 mark for formula V=IR. 1 mark for calculation.",
        max_marks=3,
    )
    # rubric = [
    #     {"id": "c1", "description": "State Ohm's law", "marks": 1, "keywords": ["ohm", "law"]},
    #     {"id": "c2", "description": "Write formula V=IR", "marks": 1, "keywords": ["V=IR", "formula"]},
    #     {"id": "c3", "description": "Perform calculation", "marks": 1, "keywords": ["calculate", "calculation"]},
    # ]
"""

import re
import sqlite3
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

# Question bank holding the authored marking_steps rows (same corpus the
# ms_compiler chain pipeline reads — 54k+ examiner-authored steps).
DEFAULT_QUESTION_BANK_PATH = Path(r"D:\platform\cbse_data\question_bank.db")


@dataclass
class RubricCriterion:
    """A single rubric criterion for grading."""
    id: str
    description: str
    marks: int
    keywords: list = field(default_factory=list)
    optional: bool = False
    bloom_level: Optional[str] = None  # remember, understand, apply, analyze, evaluate, create


@dataclass
class Rubric:
    """A complete grading rubric."""
    criteria: list  # List of RubricCriterion
    max_marks: int
    source: str  # "marking_scheme", "model_answer", "enrichment"
    question_id: Optional[str] = None

    def to_dict(self) -> dict:
        return {
            "criteria": [
                {
                    "id": c.id,
                    "description": c.description,
                    "marks": c.marks,
                    "keywords": c.keywords,
                    "optional": c.optional,
                    "bloom_level": c.bloom_level,
                }
                for c in self.criteria
            ],
            "max_marks": self.max_marks,
            "source": self.source,
            "question_id": self.question_id,
        }


class RubricGenerator:
    """Generates grading rubrics from question metadata.

    Uses rule-based parsing (no LLM needed) to extract criteria from
    marking scheme text, model answers, and enrichment data.
    """

    # Patterns for marking scheme parsing
    MARK_PATTERNS = [
        # "1 mark for ...", "2 marks for ..."
        re.compile(r"(\d+)\s*mark(?:s)?\s*(?:for|:)\s*([^.]*(?:\.[^.]*)*?)\.?", re.IGNORECASE),
        # "(1) ...", "(2) ..." with implied marks
        re.compile(r"\((\d+)\)\s*([^.]*(?:\.[^.]*)*?)\.?", re.IGNORECASE),
        # "Step 1: ...", "Step 2: ..."
        re.compile(r"step\s*(\d+)\s*:\s*([^.]*(?:\.[^.]*)*?)\.?", re.IGNORECASE),
    ]

    # Bloom level keywords
    BLOOM_KEYWORDS = {
        "remember": ["define", "list", "state", "name", "identify", "recall", "label"],
        "understand": ["explain", "describe", "summarize", "interpret", "classify", "compare"],
        "apply": ["calculate", "solve", "compute", "find", "determine", "apply", "use"],
        "analyze": ["analyze", "differentiate", "distinguish", "examine", "investigate"],
        "evaluate": ["evaluate", "justify", "assess", "critique", "argue", "defend"],
        "create": ["design", "construct", "formulate", "propose", "create", "develop"],
    }

    # Key terms that indicate important concepts
    CONCEPT_INDICATORS = [
        "law", "theorem", "principle", "formula", "equation", "definition",
        "process", "mechanism", "reaction", "structure", "function",
        "property", "characteristic", "feature", "method", "technique",
    ]

    @classmethod
    def generate_from_marking_steps(
        cls,
        step_texts: list,
        max_marks: int = 3,
        question_id: Optional[str] = None,
    ) -> Rubric:
        """Build a rubric VERBATIM from authored marking-step rows.

        Marking steps are examiner-authored data and outrank every derived
        source: each step text becomes a criterion description unchanged
        (minus an explicit mark prefix, which becomes the criterion weight).
        No rephrasing, no splitting, no new content — derive only.

        Args:
            step_texts: Ordered marking-step texts for one question
                (doc_id, qno) — the ms_compiler chain grouping.
            max_marks: Maximum marks for the question.
            question_id: Optional question ID.

        Returns:
            Rubric with source="marking_steps". Falls back to the empty
            model-answer rubric when no usable steps exist (caller then
            applies the normal source priority).
        """
        steps = [str(s).strip() for s in (step_texts or []) if s and str(s).strip()]
        if not steps:
            return cls.generate_from_model_answer("", max_marks, question_id)

        criteria = []
        criterion_id = 1
        explicit_total = 0
        explicit_counts = []

        # Honor authored per-step weights when every step declares one
        # ("(1) State Ohm's law", "1 mark for V=IR", "2 marks: ...").
        for step in steps:
            m = (re.match(r"^\((\d+)\)\s*", step)
                 or re.match(r"^(\d+)\s*marks?\b[^:]*[:\s]\s*", step, re.IGNORECASE))
            if m:
                explicit_counts.append(int(m.group(1)))
            else:
                explicit_counts.append(None)

        if explicit_counts and all(c is not None for c in explicit_counts):
            explicit_total = sum(explicit_counts)
            if explicit_total > max_marks:
                scale = max_marks / explicit_total
                explicit_counts = [max(1, round(c * scale)) for c in explicit_counts]
                # Trim the excess from the largest weights (rounding may
                # leave the sum over max_marks).
                while sum(explicit_counts) > max_marks:
                    largest = max(explicit_counts)
                    if largest <= 1:
                        break
                    i = len(explicit_counts) - 1 - explicit_counts[::-1].index(largest)
                    explicit_counts[i] = largest - 1
        else:
            # Even distribution across authored steps (same convention as
            # the sentence splitter below).
            marks_per = max(1, max_marks // len(steps))
            remainder = max_marks - marks_per * len(steps)
            explicit_counts = [marks_per + (1 if i < remainder else 0)
                               for i in range(len(steps))]

        for step, marks in zip(steps, explicit_counts):
            description = re.sub(r"^\((\d+)\)\s*", "", step)
            description = re.sub(r"^(\d+)\s*marks?\b[^:]*[:\s]\s*", "", description,
                                 count=1, flags=re.IGNORECASE).strip() or step
            criteria.append(RubricCriterion(
                id=f"c{criterion_id}",
                description=description,
                marks=max(1, int(marks)),
                keywords=cls._extract_keywords(description),
                bloom_level=cls._detect_bloom_level(description),
            ))
            criterion_id += 1

        return Rubric(
            criteria=criteria,
            max_marks=max_marks,
            source="marking_steps",
            question_id=question_id,
        )

    @classmethod
    def generate_from_marking_scheme(
        cls,
        marking_scheme: str,
        max_marks: int = 3,
        question_id: Optional[str] = None,
    ) -> Rubric:
        """Generate rubric from a marking scheme text.

        Args:
            marking_scheme: The marking scheme text from a board question.
            max_marks: Maximum marks for the question.
            question_id: Optional question ID.

        Returns:
            Rubric with extracted criteria.
        """
        if not marking_scheme or not marking_scheme.strip():
            # Fallback: create a single criterion for the full marks
            return Rubric(
                criteria=[RubricCriterion(
                    id="c1",
                    description="Provide a complete answer",
                    marks=max_marks,
                    keywords=[],
                )],
                max_marks=max_marks,
                source="marking_scheme",
                question_id=question_id,
            )

        criteria = []
        criterion_id = 1

        # Try each pattern
        for pattern in cls.MARK_PATTERNS:
            matches = pattern.findall(marking_scheme)
            if matches:
                for match in matches:
                    mark_str, description = match
                    try:
                        marks = int(mark_str)
                    except ValueError:
                        continue

                    if marks > 0 and description.strip():
                        # Extract keywords from description
                        keywords = cls._extract_keywords(description)
                        bloom = cls._detect_bloom_level(description)

                        criteria.append(RubricCriterion(
                            id=f"c{criterion_id}",
                            description=description.strip(),
                            marks=marks,
                            keywords=keywords,
                            bloom_level=bloom,
                        ))
                        criterion_id += 1
                break  # Use the first pattern that matches

        # If no criteria extracted, create default criteria
        if not criteria:
            # Split by sentences and assign proportional marks
            sentences = [s.strip() for s in marking_scheme.split(".") if s.strip()]
            if sentences:
                marks_per = max(1, max_marks // len(sentences))
                remainder = max_marks - marks_per * len(sentences)
                for i, sent in enumerate(sentences):
                    extra = 1 if i < remainder else 0
                    criteria.append(RubricCriterion(
                        id=f"c{criterion_id}",
                        description=sent,
                        marks=marks_per + extra,
                        keywords=cls._extract_keywords(sent),
                        bloom_level=cls._detect_bloom_level(sent),
                    ))
                    criterion_id += 1
            else:
                criteria.append(RubricCriterion(
                    id="c1",
                    description="Provide a complete answer",
                    marks=max_marks,
                    keywords=[],
                ))

        # Normalize marks to not exceed max_marks
        total = sum(c.marks for c in criteria)
        if total > max_marks:
            # Scale down proportionally
            scale = max_marks / total
            for c in criteria:
                c.marks = max(1, round(c.marks * scale))

        return Rubric(
            criteria=criteria,
            max_marks=max_marks,
            source="marking_scheme",
            question_id=question_id,
        )

    @classmethod
    def generate_from_model_answer(
        cls,
        model_answer: str,
        max_marks: int = 3,
        question_id: Optional[str] = None,
        cognitive_type: Optional[str] = None,
    ) -> Rubric:
        """Generate rubric from a model answer.

        Derives criteria by splitting the model answer into key points
        and assigning proportional marks.

        Args:
            model_answer: The model/correct answer text.
            max_marks: Maximum marks for the question.
            question_id: Optional question ID.
            cognitive_type: Optional cognitive type (Bloom level).

        Returns:
            Rubric with derived criteria.
        """
        if not model_answer or not model_answer.strip():
            return Rubric(
                criteria=[RubricCriterion(
                    id="c1",
                    description="Provide a complete answer",
                    marks=max_marks,
                    keywords=[],
                )],
                max_marks=max_marks,
                source="model_answer",
                question_id=question_id,
            )

        # Split into sentences
        sentences = [s.strip() for s in re.split(r"[.!?]+", model_answer) if s.strip()]

        if not sentences:
            return Rubric(
                criteria=[RubricCriterion(
                    id="c1",
                    description="Provide a complete answer",
                    marks=max_marks,
                    keywords=[],
                )],
                max_marks=max_marks,
                source="model_answer",
                question_id=question_id,
            )

        # Group sentences into criteria (1-3 sentences per criterion)
        criteria = []
        criterion_id = 1

        # Simple approach: one criterion per sentence, proportional marks
        if len(sentences) <= max_marks:
            marks_per = max(1, max_marks // len(sentences))
            remainder = max_marks - marks_per * len(sentences)
            for i, sent in enumerate(sentences):
                extra = 1 if i < remainder else 0
                keywords = cls._extract_keywords(sent)
                bloom = cognitive_type or cls._detect_bloom_level(sent)
                criteria.append(RubricCriterion(
                    id=f"c{criterion_id}",
                    description=sent,
                    marks=marks_per + extra,
                    keywords=keywords,
                    bloom_level=bloom,
                ))
                criterion_id += 1
        else:
            # More sentences than marks — group sentences
            sentences_per = len(sentences) // max_marks
            for i in range(max_marks):
                start = i * sentences_per
                end = start + sentences_per if i < max_marks - 1 else len(sentences)
                grouped = ". ".join(sentences[start:end])
                keywords = cls._extract_keywords(grouped)
                bloom = cognitive_type or cls._detect_bloom_level(grouped)
                criteria.append(RubricCriterion(
                    id=f"c{criterion_id}",
                    description=grouped,
                    marks=1,
                    keywords=keywords,
                    bloom_level=bloom,
                ))
                criterion_id += 1

        return Rubric(
            criteria=criteria,
            max_marks=max_marks,
            source="model_answer",
            question_id=question_id,
        )

    @classmethod
    def generate_from_enrichment(
        cls,
        mastery_criteria: str,
        scope_boundary: str,
        max_marks: int = 3,
        node_id: Optional[str] = None,
    ) -> Rubric:
        """Generate rubric from enrichment node data.

        Uses mastery_criteria and scope_boundary fields from enrichment
        content to derive grading criteria.

        Args:
            mastery_criteria: What the student must demonstrate to master the node.
            scope_boundary: What's in/out of scope.
            max_marks: Maximum marks.
            node_id: Optional node ID.

        Returns:
            Rubric with derived criteria.
        """
        criteria = []
        criterion_id = 1

        # Parse mastery criteria
        if mastery_criteria:
            sentences = [s.strip() for s in re.split(r"[.!?]+", mastery_criteria) if s.strip()]
            marks_per = max(1, (max_marks * 2) // 3 // max(len(sentences), 1))  # 2/3 of marks for mastery
            for sent in sentences[:3]:  # Max 3 criteria from mastery
                keywords = cls._extract_keywords(sent)
                criteria.append(RubricCriterion(
                    id=f"c{criterion_id}",
                    description=f"Demonstrate: {sent}",
                    marks=marks_per,
                    keywords=keywords,
                    bloom_level=cls._detect_bloom_level(sent),
                ))
                criterion_id += 1

        # Parse scope boundary (1/3 of marks)
        if scope_boundary and criterion_id <= max_marks:
            marks_scope = max(1, max_marks // 3)
            keywords = cls._extract_keywords(scope_boundary)
            criteria.append(RubricCriterion(
                id=f"c{criterion_id}",
                description=f"Stay within scope: {scope_boundary[:100]}",
                marks=marks_scope,
                keywords=keywords,
                optional=True,
            ))
            criterion_id += 1

        # Fill remaining marks if needed
        total = sum(c.marks for c in criteria)
        if total < max_marks and criteria:
            criteria[-1].marks += max_marks - total
        elif total > max_marks:
            scale = max_marks / total
            for c in criteria:
                c.marks = max(1, round(c.marks * scale))

        if not criteria:
            criteria.append(RubricCriterion(
                id="c1",
                description="Provide a complete answer",
                marks=max_marks,
                keywords=[],
            ))

        return Rubric(
            criteria=criteria,
            max_marks=max_marks,
            source="enrichment",
            question_id=node_id,
        )

    # ── Helper methods ────────────────────────────────────────────── #

    @classmethod
    def _extract_keywords(cls, text: str) -> list:
        """Extract key terms from text."""
        keywords = []
        lower = text.lower()

        # Check for concept indicators
        for indicator in cls.CONCEPT_INDICATORS:
            if indicator in lower:
                keywords.append(indicator)

        # Extract capitalized terms (likely proper nouns/important terms)
        proper_nouns = re.findall(r"\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b", text)
        keywords.extend(proper_nouns[:3])  # Max 3 proper nouns

        # Extract formula-like patterns
        formulas = re.findall(r"\b([a-zA-Z]\s*=\s*[^.\s]+)", text)
        keywords.extend(formulas)

        # Remove duplicates and limit
        seen = set()
        unique = []
        for kw in keywords:
            if kw.lower() not in seen:
                seen.add(kw.lower())
                unique.append(kw)
        return unique[:5]  # Max 5 keywords

    @classmethod
    def _detect_bloom_level(cls, text: str) -> str:
        """Detect the Bloom level of a text based on action verbs."""
        lower = text.lower()
        for level, verbs in cls.BLOOM_KEYWORDS.items():
            if any(verb in lower for verb in verbs):
                return level
        return "understand"  # Default


def fetch_marking_steps(doc_id, qno, db_path=None) -> list:
    """Ordered marking-step texts for one question, or [] on any failure.

    Uses the ms_compiler access pattern (marking_steps joined by
    doc_id/qno, ordered by step_no). Purely defensive: a missing bank or
    an absent question yields [] so callers fall through to the next
    rubric source — evaluation never breaks on this lookup.
    """
    path = Path(db_path) if db_path else DEFAULT_QUESTION_BANK_PATH
    if doc_id is None or qno is None:
        return []
    try:
        conn = sqlite3.connect(str(path))
        rows = conn.execute(
            "SELECT text FROM marking_steps "
            "WHERE doc_id = ? AND CAST(qno AS TEXT) = CAST(? AS TEXT) "
            "ORDER BY step_no",
            (doc_id, qno),
        ).fetchall()
        conn.close()
    except Exception:
        return []
    return [str(r[0]).strip() for r in rows if r and r[0] and str(r[0]).strip()]
