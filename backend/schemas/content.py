from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class SubjectSchema(BaseModel):
    model_config = {"from_attributes": True}

    id: str
    name: str
    board: str
    class_level: int
    icon_name: str
    color: str
    topics_count: Optional[int] = None
    mastery_percentage: Optional[int] = None


class SubjectListResponse(BaseModel):
    subjects: List[SubjectSchema]


class KnowledgeNodeSchema(BaseModel):
    model_config = {"from_attributes": True}

    id: str
    node_id: str
    label: str
    description: str
    subject: str
    class_level: int
    chapter: str
    node_type: str
    simplified_content: Optional[str] = None
    prerequisites: List[str] = Field(default_factory=list)
    forward_nodes: List[str] = Field(default_factory=list)
    mastery_probability: float = 0.0
    difficulty: str = "medium"
    estimated_time: int = 30


class KnowledgeNodeListResponse(BaseModel):
    nodes: List[KnowledgeNodeSchema]
    total: int


class KnowledgeGraphLink(BaseModel):
    source: str
    target: str
    type: str = "prerequisite"


class KnowledgeGraphResponse(BaseModel):
    nodes: List[KnowledgeNodeSchema]
    links: List[Dict[str, Any]] = Field(default_factory=list)


class ContentBundleSchema(BaseModel):
    model_config = {"from_attributes": True}

    id: str
    node_id: str
    content_type: str
    content_data: Dict[str, Any] = Field(default_factory=dict)
    is_offline_available: bool = False
    file_size_mb: Optional[float] = None


class RecommendedLessonSchema(BaseModel):
    model_config = {"from_attributes": True}

    node_id: str
    subject: str
    topic: str
    chapter: str
    progress: int = 0
    difficulty: str = "medium"
    estimated_time: int = 30
    icon: str = "book"


# --------------------------------------------------------------------------- #
# Enrichment content schemas
# --------------------------------------------------------------------------- #

class DiagnosticQuestionSchema(BaseModel):
    number: int
    cognitive_type: str = ""
    question: str
    answer: str = ""


class OnFailureEntrySchema(BaseModel):
    question_number: int
    remediation_text: str
    review_node_ids: List[str] = Field(default_factory=list)


class EnrichmentContentSchema(BaseModel):
    """Full enrichment content for a node."""
    model_config = {"from_attributes": True}

    node_id: str
    title: str
    subject: str
    class_level: int
    chapter: Optional[str] = None

    definition: Optional[str] = None
    text_walkthrough: Optional[str] = None
    eli5: Optional[str] = None
    common_misconception: Optional[str] = None
    diagnostic_questions: List[DiagnosticQuestionSchema] = Field(default_factory=list)
    on_failure: List[OnFailureEntrySchema] = Field(default_factory=list)
    examples: Optional[str] = None

    cognitive_level: Optional[str] = None
    mastery_criteria: Optional[str] = None
    scope_boundary: Optional[str] = None

    prereq_ids: List[str] = Field(default_factory=list)
    depth_prereq_ids: List[str] = Field(default_factory=list)
    forward_node_ids: List[str] = Field(default_factory=list)

    difficulty: str = "medium"
    board: str = "CISCE"
    source_file: Optional[str] = None


class EnrichmentFieldSchema(BaseModel):
    """A single enrichment field response."""
    node_id: str
    field: str
    content: str
    title: Optional[str] = None


class EnrichmentSummarySchema(BaseModel):
    """Brief summary of a node's enrichment (for lists/cards)."""
    node_id: str
    title: str
    subject: str
    class_level: int
    chapter: Optional[str] = None
    chapter_title: Optional[str] = None
    cognitive_level: Optional[str] = None
    difficulty: str = "medium"
    has_definition: bool = False
    has_walkthrough: bool = False
    has_eli5: bool = False
    has_misconception: bool = False
    has_diagnostic: bool = False
    has_on_failure: bool = False
    prereq_count: int = 0


class EnrichmentListResponse(BaseModel):
    nodes: List[EnrichmentSummarySchema]
    total: int


# --------------------------------------------------------------------------- #
# Board question schemas
# --------------------------------------------------------------------------- #

class BoardQuestionSchema(BaseModel):
    model_config = {"from_attributes": True}

    id: str
    question_number: Optional[int] = None
    node_tags: List[str] = Field(default_factory=list)
    subject: str
    class_level: int
    chapter: Optional[str] = None
    section: Optional[str] = None
    question_type: str
    question_text: str
    options: Optional[List[str]] = None
    correct_answer: Optional[str] = None
    model_answer: Optional[str] = None
    explanation: Optional[str] = None
    marks: int = 1
    marking_scheme: Optional[str] = None
    difficulty: str = "medium"
    source_type: str = "question_bank"
    source_file: Optional[str] = None
    board: str = "CISCE"
    year: Optional[str] = None


class BoardQuestionListResponse(BaseModel):
    questions: List[BoardQuestionSchema]
    total: int


# --------------------------------------------------------------------------- #
# Class-level content schemas
# --------------------------------------------------------------------------- #

class ClassLevelContentSchema(BaseModel):
    model_config = {"from_attributes": True}

    id: str
    target_class: List[int]
    target_subject: str
    content_type: str
    title: str
    content: str
    source_file: Optional[str] = None
    board: str = "CISCE"


class ClassLevelContentListResponse(BaseModel):
    items: List[ClassLevelContentSchema]
    total: int
