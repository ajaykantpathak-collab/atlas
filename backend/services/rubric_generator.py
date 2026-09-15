"""Rubric generator — offline rubric extraction from marking schemes.

Extracts grading rubrics from question metadata (marking schemes, model
answers, enrichment data) and stores them as structured JSON criteria.

Rubric sources:
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
from dataclasses import dataclass, field
from typing import Optional


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
