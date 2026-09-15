from typing import Optional

from pydantic import AliasChoices, BaseModel, ConfigDict, Field
from pydantic.alias_generators import to_camel


class DiagnosticState(BaseModel):
    """Diagnostic flow state returned with tutor replies."""
    phase: str = Field("teach", description="Current phase: teach / socratic / diagnostic / remediate / drill / mastered")
    current_question: int = Field(0, description="1-indexed current diagnostic question number")
    total_questions: int = Field(0, description="Total questions in the diagnostic")
    answered: int = Field(0, description="Number of questions answered so far")
    failed: list[int] = Field(default_factory=list, description="List of failed question numbers")
    results: dict = Field(default_factory=dict, description="Per-question results {q_num: {correct, score, feedback, cognitive_type}}")
    bloom_scorecard: Optional[dict] = Field(None, description="Bloom-level scorecard after diagnostic completion")
    remediation_active: bool = Field(False, description="Whether remediation is currently active")
    remediation_node: Optional[str] = Field(None, description="Node ID of prerequisite being studied during remediation")
    drill_tier: Optional[str] = Field(None, description="Current drill tier: BASIC / EXAM / CHALLENGE")
    drill_current: int = Field(0, description="Current drill question number")
    drill_total: int = Field(0, description="Total drill questions in current tier")
    # Socratic teaching state
    socratic_current: int = Field(-1, description="Current Socratic teaching chunk index (-1 = not started)")
    socratic_total: int = Field(0, description="Total Socratic teaching chunks")


class TutorSessionRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    node_id: str = Field(..., validation_alias=AliasChoices("node_id", "nodeId"))
    topic: Optional[str] = None


class TutorMessage(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        alias_generator=to_camel,
    )

    role: str = Field(..., description="Role of the message sender: tutor or student")
    content: str
    type: Optional[str] = None
    misconception_detected: Optional[str] = None
    prerequisite_gap: Optional[str] = None
    diagnostic_state: Optional[DiagnosticState] = None


class TutorReplyRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    session_id: str = Field(..., validation_alias=AliasChoices("session_id", "sessionId"))
    message: str


class TutorReplyResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True, alias_generator=to_camel)

    session_id: str
    reply: TutorMessage
    updated_mastery: Optional[float] = None
