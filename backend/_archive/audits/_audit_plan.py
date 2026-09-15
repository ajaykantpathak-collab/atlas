"""Audit ENGLISH_HINDI_PLAN.md against actual state - READ ONLY."""
import os
from pathlib import Path

plan_items = {
    # English/Hindi 12 components
    "1. Quote Bank": "D:/platform/organized/english",
    "2. Passage Library": "D:/platform/organized/english",
    "3. Writing Rubrics": "D:/platform/organized/english",
    "4. Model Answer Library": "D:/platform/organized/english",
    "5. Examiner Report Digest": "D:/platform/organized/english",
    "6. Character Maps": "D:/platform/organized/english",
    "7. Theme Trackers": "D:/platform/organized/english",
    "8. Literary Device Library": "D:/platform/organized/english",
    "9. Progressive Writing Curriculum": "D:/platform/organized/english",
    "10. Grammar in Context (deterministic)": "D:/platform/backend/solvers/english",
    "11. Reading Fluency Passages": "D:/platform/organized/english",
    "12. Oral/Listening Skills": "D:/platform/organized/english",
}

print("=" * 70)
print("ENGLISH/HINDI PLAN — 12 COMPONENTS STATUS")
print("=" * 70)

# Check English content nodes
eng_dir = Path("D:/platform/organized/english")
if eng_dir.exists():
    for cls_dir in sorted(eng_dir.iterdir()):
        if cls_dir.is_dir() and cls_dir.name.startswith("class"):
            cn = cls_dir / "content_nodes"
            qf = cls_dir / "questions.py"
            sf = cls_dir / "solver.py"
            en = cls_dir / "enrichment"
            md_count = len(list(cn.glob("*.md"))) if cn.exists() else 0
            has_q = "Y" if qf.exists() else "N"
            has_s = "Y" if sf.exists() else "N"
            enr_count = len(list(en.glob("*"))) if en.exists() else 0
            print(f"  English {cls_dir.name}: {md_count} content nodes, Q={has_q} S={has_s} enrichment={enr_count}")

# Check Hindi
print()
hin_dir = Path("D:/platform/organized/hindi")
if hin_dir.exists():
    for cls_dir in sorted(hin_dir.iterdir()):
        if cls_dir.is_dir() and cls_dir.name.startswith("class"):
            cn = cls_dir / "content_nodes"
            qf = cls_dir / "questions.py"
            sf = cls_dir / "solver.py"
            md_count = len(list(cn.glob("*.md"))) if cn.exists() else 0
            has_q = "Y" if qf.exists() else "N"
            has_s = "Y" if sf.exists() else "N"
            print(f"  Hindi {cls_dir.name}: {md_count} content nodes, Q={has_q} S={has_s}")

# Check for specific content types
print()
print("=" * 70)
print("SPECIFIC CONTENT TYPE CHECK")
print("=" * 70)
search_dirs = [
    "D:/platform/organized/english",
    "D:/platform/organized/hindi",
    "D:/platform/cbse_data/content",
    "D:/platform/cbse_data/questions",
    "D:/platform/cbse_data/tutoring",
]
for label, keyword in [
    ("Quote banks", "quote"),
    ("Passage libraries", "passage"),
    ("Writing rubrics", "rubric"),
    ("Model answers", "model_answer"),
    ("Examiner reports", "examiner"),
    ("Character maps", "character"),
    ("Theme trackers", "theme"),
    ("Literary devices", "literary"),
    ("Grammar drills", "grammar"),
    ("Reading fluency", "fluency"),
    ("Listening skills", "listening"),
]:
    found = []
    for d in search_dirs:
        if not os.path.exists(d):
            continue
        for root, dirs, files in os.walk(d):
            for f in files:
                if keyword in f.lower():
                    found.append(os.path.join(root, f))
    status = f"{len(found)} files" if found else "MISSING"
    print(f"  {label:<25} {status}")
    if found:
        for fp in found[:3]:
            print(f"    e.g. {fp}")

# Check solver infrastructure
print()
print("=" * 70)
print("SOLVER INFRASTRUCTURE (Phases 1-6)")
print("=" * 70)
infra = {
    "Phase 1: core_calculus_engine.py": "D:/platform/backend/solvers/core_calculus_engine/core_calculus_engine.py",
    "Phase 1: derivative_tables.py": "D:/platform/backend/solvers/core_calculus_engine/derivative_tables.py",
    "Phase 1: integral_tables.py": "D:/platform/backend/solvers/core_calculus_engine/integral_tables.py",
    "Phase 2: solver_registry.py": "D:/platform/backend/solvers/registry.py",
    "Phase 2: solver_v2_bridge.py": "D:/platform/backend/solvers/solver_v2_bridge.py",
    "Phase 3: question_selector.py": "D:/platform/backend/services/question_selector.py",
    "Phase 3: knowledge_tracing.py": "D:/platform/backend/services/knowledge_tracing.py",
    "Phase 4: solver router": "D:/platform/backend/api/solver.py",
    "Phase 4: practice router": "D:/platform/backend/api/practice.py",
    "Phase 4: tutor router": "D:/platform/backend/api/tutor.py",
    "Phase 4: content router": "D:/platform/backend/api/content.py",
    "Phase 4: diagnostic router": "D:/platform/backend/api/diagnostic.py",
    "Phase 5: MathInput.tsx": "D:/platform/frontend/components/solver/MathInput.tsx",
    "Phase 5: PhotoCapture.tsx": "D:/platform/frontend/components/solver/PhotoCapture.tsx",
    "Phase 5: StepDisplay.tsx": "D:/platform/frontend/components/solver/StepDisplay.tsx",
    "Phase 5: ThinkingQuestion.tsx": "D:/platform/frontend/components/solver/ThinkingQuestion.tsx",
    "Phase 6: AtlasSolver.tsx (dream_app)": "D:/dream_app/frontend/components/prism/AtlasSolver.tsx",
}
for label, path in infra.items():
    exists = os.path.exists(path)
    size = os.path.getsize(path) if exists else 0
    status = f"EXISTS ({size:,} bytes)" if exists else "MISSING"
    print(f"  {label:<45} {status}")

# Check frontend-backend mapping
print()
print("=" * 70)
print("FRONTEND-BACKEND MAPPING")
print("=" * 70)
frontend_services = {
    "assessment": "/api/assessment",
    "progress": "/api/progress",
    "achievements": "/api/achievements",
    "socratic": "/api/socratic",
    "homework": "/api/homework",
    "teacher": "/api/teacher",
    "junior": "/api/junior",
}
backend_routers = {
    "solver": "/api/solver",
    "practice": "/api/practice",
    "tutor": "/api/tutor",
    "mastery": "/api/mastery",
    "content": "/api/content",
    "auth": "/api/auth",
    "diagnostic": "/api/diagnostic",
    "exam": "/api/exam",
    "graph": "/api/graph",
    "dashboard": "/api/dashboard",
    "nodes": "/api/nodes",
    "questions": "/api/questions",
    "story": "/api/story",
    "subskills": "/api/subskills",
    "sim": "/api/sim",
    "analytics": "/api/analytics",
}
print("  Frontend services with NO backend router:")
for name, path in frontend_services.items():
    if path not in backend_routers.values():
        # Check if there's a similar one
        similar = [b for b in backend_routers.values() if name in b]
        note = f" (similar: {similar[0]})" if similar else ""
        print(f"    {name:<15} {path} MISSING{note}")

print("  Backend routers with NO frontend service:")
for name, path in backend_routers.items():
    if path not in frontend_services.values():
        print(f"    {name:<15} {path}")
