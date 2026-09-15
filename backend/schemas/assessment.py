from typing import Any, Dict, List, Optional

from pydantic import AliasChoices, BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class QuizQuestionSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    id: str
    node_id: str
    question: str
    question_type: str = "mcq"
    options: Optional[List[str]] = None
    correct_answer: str
    explanation: Optional[str] = None
    marks: int = 1
    marking_scheme: Optional[str] = None
    difficulty: str = "medium"


class QuizAnswerRequest(BaseModel):

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )
    question_id: str
    answer: str
    time_taken_seconds: Optional[int] = None


class QuizAnswerResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )
    is_correct: bool
    correct_answer: str
    explanation: Optional[str] = None
    marks_awarded: float = 0.0
    updated_mastery: float = 0.0


class ExamSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    exam_id: str
    title: str
    board: str
    class_level: int
    subject: str
    duration: int
    total_marks: int
    sections: int = 1
    difficulty: str = "medium"
    topics: List[str] = Field(default_factory=list)
    attempts: int = 0
    best_score: Optional[int] = None


class ExamListResponse(BaseModel):
    exams: List[ExamSchema]


class ExamQuestionSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    id: str
    question: str
    options: Optional[List[str]] = None
    marks: int = 1
    type: str = "mcq"


class ExamSectionSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    section_id: str
    title: str
    marks: int
    question_count: int
    question_type: str = "mcq"
    instructions: str = ""
    questions: List[ExamQuestionSchema] = Field(default_factory=list)


class ExamDetailSchema(ExamSchema):
    sections: List[ExamSectionSchema] = Field(default_factory=list)


class ExamAnswerItem(BaseModel):
    question_id: str
    answer: str
    time_taken_seconds: Optional[int] = None


class ExamSubmissionRequest(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )
    exam_id: str = Field(..., validation_alias=AliasChoices("exam_id", "examId"))
    answers: List[Dict[str, Any]] = Field(default_factory=list)


class ExamResultSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    total_score: int
    max_score: int
    percentage: float
    time_taken: int
    section_scores: List[Dict[str, Any]] = Field(default_factory=list)
    topic_scores: List[Dict[str, Any]] = Field(default_factory=list)
    weakness_areas: List[Dict[str, Any]] = Field(default_factory=list)
