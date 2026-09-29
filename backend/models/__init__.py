"""SQLAlchemy models for the DREAM_APP educational platform."""

from backend.models.user import User
from backend.models.content import Subject, Chapter, KnowledgeNodeModel, ContentBundle
from backend.models.enrichment import (
    EnrichmentContent,
    BoardQuestion,
    ClassLevelContent,
    ContentVersion,
)
from backend.models.assessment import (
    QuizQuestion,
    Exam,
    ExamSection,
    ExamAttempt,
    AnswerSubmission,
)
from backend.models.progress import (
    MasteryRecord,
    ReviewItem,
    ActivityLog,
    StudySession,
)
from backend.models.achievement import Achievement, UserAchievement, StreakRecord
from backend.models.solver_template import SolverTemplate
from backend.models.telemetry import AttemptLog
from backend.models.accessibility import AccessibilityPreferencesModel

# Intelligence tables — wired to the real Base so init_db creates them
from backend.services.intelligence_schema import (
    EnrichmentNode,
    InteractionOutcome,
    Misconception,
    ConceptDependency,
    TeachingStrategyOutcome,
    ContentGapFlag,
    LearningStyleProfile,
    SocraticSession,
    OrchestratorRule,
    ClaudeReasoningCache,
    AgentParameter,
)

__all__ = [
    "User",
    "Subject",
    "Chapter",
    "KnowledgeNodeModel",
    "ContentBundle",
    "EnrichmentContent",
    "BoardQuestion",
    "ClassLevelContent",
    "ContentVersion",
    "QuizQuestion",
    "Exam",
    "ExamSection",
    "ExamAttempt",
    "AnswerSubmission",
    "MasteryRecord",
    "ReviewItem",
    "ActivityLog",
    "StudySession",
    "Achievement",
    "UserAchievement",
    "StreakRecord",
    "SolverTemplate",
    "AttemptLog",
    "AccessibilityPreferencesModel",
    # Intelligence tables
    "EnrichmentNode",
    "InteractionOutcome",
    "Misconception",
    "ConceptDependency",
    "TeachingStrategyOutcome",
    "ContentGapFlag",
    "LearningStyleProfile",
    "SocraticSession",
    "OrchestratorRule",
    "ClaudeReasoningCache",
    "AgentParameter",
]
