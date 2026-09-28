from backend.routers.auth import router as auth_router
from backend.routers.content import router as content_router
from backend.routers.assessment import router as assessment_router
from backend.routers.tutor import router as tutor_router
from backend.routers.progress import router as progress_router
from backend.routers.achievements import router as achievements_router
from backend.routers.graph import router as graph_router
from backend.routers.solver import router as solver_router
from backend.routers.sandbox import router as sandbox_router
from backend.routers.learning_upgrades import router as learning_upgrades_router
from backend.routers.paper_generator import router as paper_generator_router
from backend.api.verified_practice import router as verified_practice_router
from backend.api.competency_tutor import router as competency_tutor_router
from backend.api.practice import router as practice_router
from backend.api.enhanced_nodes import router as enhanced_nodes_router
from backend.api.intelligence import router as intelligence_router
from backend.api.tutor import router as its_tutor_router
from backend.api.teacher_analytics import router as teacher_analytics_router
from backend.api.homework import router as homework_router
from backend.api.dashboard import router as dashboard_router
from backend.api.analytics import router as analytics_router
from backend.api.accessibility import router as accessibility_router
from backend.api.student_sync import router as student_sync_router
from backend.api.diagnostics import router as diagnostics_router
from backend.api.junior import router as junior_router
from backend.api.exams_adapter import router as exams_adapter_router
from backend.api.teacher import router as teacher_router
from backend.api.engagement import router as engagement_router
from backend.services.id_remapping import router as id_remapping_router
from backend.api.chapter_tests import router as chapter_tests_router
from backend.api.preboard import router as preboard_router

__all__ = [
    "auth_router",
    "content_router",
    "assessment_router",
    "tutor_router",
    "progress_router",
    "achievements_router",
    "graph_router",
    "solver_router",
    "verified_practice_router",
    "competency_tutor_router",
    "practice_router",
    "enhanced_nodes_router",
    "intelligence_router",
    "its_tutor_router",
    "teacher_analytics_router",
    "analytics_router",
    "accessibility_router",
    "student_sync_router",
    "diagnostics_router",
    "junior_router",
    "exams_adapter_router",
    "teacher_router",
    "engagement_router",
    "id_remapping_router",
    "homework_router",
    "dashboard_router",
    "chapter_tests_router",
    "preboard_router",
]
