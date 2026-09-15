from backend.routers.auth import router as auth_router
from backend.routers.content import router as content_router
from backend.routers.assessment import router as assessment_router
from backend.routers.tutor import router as tutor_router
from backend.routers.progress import router as progress_router
from backend.routers.achievements import router as achievements_router
from backend.routers.graph import router as graph_router
from backend.routers.solver import router as solver_router
from backend.api.verified_practice import router as verified_practice_router
from backend.api.competency_tutor import router as competency_tutor_router
from backend.api.practice import router as practice_router
from backend.api.enhanced_nodes import router as enhanced_nodes_router
from backend.api.intelligence import router as intelligence_router
from backend.api.tutor import router as its_tutor_router
from backend.api.teacher_analytics import router as teacher_analytics_router
# NOTE: api/homework.py is NOT mounted — it imports `from database import
# Homework` (pre-refactor package layout + models that no longer exist).
# The frontend homework page is mock-data anyway; mount it only after
# porting to backend.models + backend.database.
from backend.api.analytics import router as analytics_router
from backend.api.accessibility import router as accessibility_router
from backend.api.student_shim import router as student_router

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
    "student_router",
]
