"""Enrichment content models for the DREAM_APP educational platform.

These models store the deep teaching content parsed from CISCE enrichment
.marker files. Each enrichment node has structured columns for every
pedagogical field (DEFINITION, TEXT_WALKTHROUGH, ELI5, etc.) so that the
API can serve individual fields without parsing a JSON blob.

The enrichment content IS the tutor -- it is pre-written, verified, and
pedagogically structured. The LLM is only used for routing and as a
last-resort fallback, never for generating the core teaching content.
"""

from sqlalchemy import (
    Boolean,
    Column,
    String,
    Integer,
    Text,
    JSON,
    DateTime,
    ForeignKey,
    Index,
)
import uuid

from backend.db_types import GUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from backend.database import Base


class EnrichmentContent(Base):
    """Structured enrichment content for a single knowledge node.

    Each row corresponds to one node from the enrichment .marker files.
    Every pedagogical field is stored in its own column so it can be
    queried and served independently (e.g. GET /content/nodes/{id}/eli5).
    """

    __tablename__ = "enrichment_content"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    node_id = Column(String, unique=True, index=True, nullable=False)
    title = Column(String, nullable=False)
    subject = Column(String, nullable=False, index=True)
    class_level = Column(Integer, nullable=False, index=True)
    chapter = Column(String, nullable=True)

    # Core teaching fields (each served independently by the API)
    definition = Column(Text, nullable=True)
    text_walkthrough = Column(Text, nullable=True)
    eli5 = Column(Text, nullable=True)
    common_misconception = Column(Text, nullable=True)
    diagnostic_questions = Column(JSON, nullable=True)  # list of {number, cognitive_type, question, answer}
    on_failure = Column(JSON, nullable=True)  # list of {question_number, remediation_text, review_node_ids}
    examples = Column(Text, nullable=True)

    # Metadata fields
    cognitive_level = Column(String, nullable=True)
    mastery_criteria = Column(Text, nullable=True)
    scope_boundary = Column(Text, nullable=True)

    # Prerequisite metadata (mirrors Neo4j but stored here for fast SQL access)
    prereq_ids = Column(JSON, nullable=True)  # list of node_id strings
    depth_prereq_ids = Column(JSON, nullable=True)  # list of node_id strings
    forward_node_ids = Column(JSON, nullable=True)  # list of node_id strings

    # Provenance
    source_file = Column(String, nullable=True)
    board = Column(String, default="CISCE", nullable=False)

    # Difficulty derived from cognitive_level
    difficulty = Column(String, default="medium", nullable=False)

    # Diagnostic starting level — the cognitive level at which the
    # diagnostic should START for this topic.  Defaults to "reasoning"
    # (the middle of the Bloom's progression).  Used by the tutor to
    # adapt the diagnostic's starting difficulty to the topic's level.
    diagnostic_level = Column(String, default="reasoning", nullable=True)

    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    def __repr__(self) -> str:
        return f"<EnrichmentContent(node_id={self.node_id}, title={self.title})>"


class BoardQuestion(Base):
    """A real ICSE/ISC board-style question.

    Supports all question types: mcq, essay, numerical, diagram,
    multi_part, short_answer. Questions are loaded from question banks,
    mock papers, past papers, and diagnostic files -- organized by
    class + subject + content_type (parsed from filename, no per-question
    tagging needed).
    """

    __tablename__ = "board_questions"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    question_number = Column(Integer, nullable=True)  # Q1, Q2, etc. within the source file
    node_tags = Column(JSON, nullable=True)  # list of node_id strings (from Target node: tags, if available)
    subject = Column(String, nullable=False, index=True)
    class_level = Column(Integer, nullable=False, index=True)
    chapter = Column(String, nullable=True)
    section = Column(String, nullable=True)  # section within the source file

    question_type = Column(String, nullable=False, default="short_answer")
    # Types: mcq, essay, numerical, diagram, multi_part, short_answer, long_answer, true_false

    question_text = Column(Text, nullable=False)
    options = Column(JSON, nullable=True)  # for MCQs
    correct_answer = Column(Text, nullable=True)
    model_answer = Column(Text, nullable=True)  # full worked answer
    explanation = Column(Text, nullable=True)  # why the answer is correct

    marks = Column(Integer, nullable=False, default=1)
    marking_scheme = Column(Text, nullable=True)  # how marks are distributed
    difficulty = Column(String, default="medium", nullable=False)

    source_type = Column(String, nullable=False, default="question_bank")
    # source_type: question_bank, mock_paper, past_paper, diagnostic, board_style, drill_bank

    source_file = Column(String, nullable=True)
    board = Column(String, default="CISCE", nullable=False)
    year = Column(String, nullable=True)  # for past papers

    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    def __repr__(self) -> str:
        return f"<BoardQuestion(id={self.id}, subject={self.subject}, class={self.class_level}, type={self.question_type})>"
    is_choice_row = Column(Boolean, nullable=False, default=False)


class BoardQuestionFlag(Base):
    """Bank-lane exclusion flag (bank repair 2026-10-03).

    Rows excluded from question matching/serving because the DATA cannot
    support them:
      template_row  — question_text itself is a generic extraction template
                      stamped across many node files, each keyed to a
                      different answer (the ambiguity-refusal storm).
      no_answer_key — correct_answer is empty; practice verify reads
                      correct_answer directly, so the row can never VERIFY.

    Consulted by:
      - services/question_selector.py::_corpus_candidates  (NOT EXISTS)
      - its/solver/bank_answer.py _SQL / _TRGM_SQL         (NOT EXISTS)

    Populated by backend.tests.bank_norm_repair (single-transaction apply,
    JSONL backup written first).
    """

    __tablename__ = "board_question_flags"

    question_id = Column(
        GUID(), ForeignKey("board_questions.id", ondelete="CASCADE"),
        primary_key=True,
    )
    reason = Column(String(32), nullable=False)
    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


def board_question_not_flagged(*reasons: str):
    """SQLAlchemy condition: board_questions row is NOT flag-excluded.

    bank repair 2026-10-03.  No reasons = exclude any flagged row;
    reasons narrow it (e.g. node-scoped diagnostic lanes only drop
    'no_answer_key' and keep template diagnostics, which the node gate
    disambiguates).
    """
    from sqlalchemy import exists, select

    subq = select(BoardQuestionFlag.question_id).where(
        BoardQuestionFlag.question_id == BoardQuestion.id)
    if reasons:
        subq = subq.where(BoardQuestionFlag.reason.in_(reasons))
    return ~exists(subq)


class ClassLevelContent(Base):
    """Class-level content that is not tied to a specific node.

    Includes glossaries, formula banks, chapter summaries, formula
    derivations, high-yield guides, etc. Organized by class + subject +
    content_type (parsed from filename).
    """

    __tablename__ = "class_level_content"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    target_class = Column(JSON, nullable=False)  # e.g. [10] or [9, 10] or [1,2,3,4,5]
    target_subject = Column(String, nullable=False, index=True)  # physics, chemistry, bio, maths, or "all"
    content_type = Column(String, nullable=False, index=True)
    # content_type: glossary, formula_bank, summary, formula_derivations, high_yield_guide, etc.

    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)  # full .marker content
    source_file = Column(String, nullable=True)
    board = Column(String, default="CISCE", nullable=False)

    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    def __repr__(self) -> str:
        return f"<ClassLevelContent(title={self.title}, subject={self.target_subject}, type={self.content_type})>"


class ContentVersion(Base):
    """Versioning / audit trail for enrichment content changes.

    Tracks when content was loaded/updated, what changed, and the source.
    This ensures we can always trace back to the verified source files.
    """

    __tablename__ = "content_versions"

    id = Column(GUID(), primary_key=True, default=uuid.uuid4)
    node_id = Column(String, nullable=False, index=True)
    version = Column(Integer, nullable=False, default=1)
    action = Column(String, nullable=False)  # created, updated, verified
    source_file = Column(String, nullable=True)
    changes_summary = Column(Text, nullable=True)
    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    def __repr__(self) -> str:
        return f"<ContentVersion(node_id={self.node_id}, version={self.version}, action={self.action})>"
