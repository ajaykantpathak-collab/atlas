"""
API package — FastAPI routers for the K-12 learning platform.

Each module exposes an `router` (APIRouter) that is mounted by the
main app in D:\\platform\\backend\\app.py via _try_import().

Routers:
    solver       — solver endpoints (identify, solve, generate, grade)
    practice     — practice sessions (start, submit, feedback, next)
    tutor        — Socratic tutor (session, reply)
    diagnostic   — diagnostic flow (start, submit, report)
    exam         — exam simulator (generate, submit, results)
    content      — content browsing (nodes, graph, search)
    mastery      — mastery dashboards (student, parent, teacher)
    auth         — authentication (login, register, refresh)
    graph        — knowledge graph (nodes, edges, prerequisites)
    dashboard    — dashboard data (student, parent, teacher)
    nodes        — node endpoints (list, detail, sub-nodes)
    questions    — question endpoints (generate, list, grade)
    story        — story/game learning (junior world, adventures)
    subskills    — sub-skill diagnosis (identify, remediate)
    sim          — simulations (list, launch, verify)
    teacher      — teacher tools (assignments, class overview)
    homework     — homework flow (view, submit, track)
    junior       — junior world (Class 1-5, voice-first)
    accessibility — accessibility settings (font, motion, color)
    whatsapp     — WhatsApp bot (reminders, photo solve)
"""

__all__ = [
    "solver",
    "practice",
    "tutor",
    "diagnostic",
    "exam",
    "content",
    "mastery",
    "auth",
    "graph",
    "dashboard",
    "nodes",
    "questions",
    "story",
    "subskills",
    "sim",
    "teacher",
    "homework",
    "junior",
    "accessibility",
    "whatsapp",
]
