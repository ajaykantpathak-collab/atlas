from backend.schemas.auth import LoginRequest, SignupRequest, TokenResponse, UserInfo
from backend.schemas.content import (
    SubjectSchema,
    SubjectListResponse,
    KnowledgeNodeSchema,
    KnowledgeNodeListResponse,
    KnowledgeGraphLink,
    KnowledgeGraphResponse,
    ContentBundleSchema,
    RecommendedLessonSchema,
)
from backend.schemas.assessment import (
    QuizQuestionSchema,
    QuizAnswerRequest,
    QuizAnswerResponse,
    ExamSchema,
    ExamListResponse,
    ExamQuestionSchema,
    ExamSectionSchema,
    ExamDetailSchema,
    ExamAnswerItem,
    ExamSubmissionRequest,
    ExamResultSchema,
)
from backend.schemas.tutor import (
    TutorSessionRequest,
    TutorMessage,
    TutorReplyRequest,
    TutorReplyResponse,
)
from backend.schemas.progress import (
    MasteryRecordSchema,
    SubjectMasterySchema,
    ProgressOverviewSchema,
    ActivitySchema,
    ReviewItemSchema,
    ReviewQueueResponse,
    ReviewAnswerRequest,
    ReviewAnswerResponse,
    DashboardSchema,
    WeeklyActivitySchema,
)
from backend.schemas.achievement import (
    AchievementSchema,
    AchievementListResponse,
)

__all__ = [
    # auth
    "LoginRequest",
    "SignupRequest",
    "TokenResponse",
    "UserInfo",
    # content
    "SubjectSchema",
    "SubjectListResponse",
    "KnowledgeNodeSchema",
    "KnowledgeNodeListResponse",
    "KnowledgeGraphLink",
    "KnowledgeGraphResponse",
    "ContentBundleSchema",
    "RecommendedLessonSchema",
    # assessment
    "QuizQuestionSchema",
    "QuizAnswerRequest",
    "QuizAnswerResponse",
    "ExamSchema",
    "ExamListResponse",
    "ExamQuestionSchema",
    "ExamSectionSchema",
    "ExamDetailSchema",
    "ExamAnswerItem",
    "ExamSubmissionRequest",
    "ExamResultSchema",
    # tutor
    "TutorSessionRequest",
    "TutorMessage",
    "TutorReplyRequest",
    "TutorReplyResponse",
    # progress
    "MasteryRecordSchema",
    "SubjectMasterySchema",
    "ProgressOverviewSchema",
    "ActivitySchema",
    "ReviewItemSchema",
    "ReviewQueueResponse",
    "ReviewAnswerRequest",
    "ReviewAnswerResponse",
    "DashboardSchema",
    "WeeklyActivitySchema",
    # achievement
    "AchievementSchema",
    "AchievementListResponse",
]
