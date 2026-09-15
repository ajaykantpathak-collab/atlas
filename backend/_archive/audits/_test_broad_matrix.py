"""Test diagnostic generation across a broad matrix of classes and subjects."""
import sys, asyncio
sys.path.insert(0, '.')
from services.question_selector import QuestionSelector

class MockDb:
    async def execute(self, *a, **kw):
        class R:
            def scalars(self):
                class S:
                    def all(self): return []
                    def first(self): return None
                return S()
            def scalar_one_or_none(self): return None
            def scalar(self): return 0
        return R()

async def test():
    selector = QuestionSelector(MockDb())

    # Broad matrix: classes 1-12, multiple subjects
    matrix = [
        (1, "physics", "motion"),
        (1, "mathematics", "numbers"),
        (2, "evs", "plants"),
        (3, "evs", "animals"),
        (3, "mathematics", "addition"),
        (4, "chemistry", "matter"),
        (4, "biology", "plants"),
        (5, "mathematics", "arithmetic"),
        (5, "english", "grammar"),
        (6, "physics", "motion"),
        (6, "chemistry", "matter"),
        (7, "biology", "tissues"),
        (7, "mathematics", "algebra"),
        (8, "geography", "resources"),
        (8, "physics", "light"),
        (9, "mathematics", "algebra"),
        (9, "science", "matter"),
        (10, "mathematics", "trigonometry"),
        (10, "biology", "genetics"),
        (11, "physics", "mechanics"),
        (11, "chemistry", "atomic_structure"),
        (12, "mathematics", "calculus"),
        (12, "physics", "electromagnetism"),
    ]

    real_count = 0
    placeholder_count = 0
    results = []

    for grade, subject, topic in matrix:
        questions = await selector.select_for_diagnostic(
            subject=subject, topic=topic, grade=grade, count=3
        )
        for i, q in enumerate(questions):
            # Handle both dict and object returns
            if isinstance(q, dict):
                qtext = q.get("text", q.get("question_text", ""))
            else:
                qtext = getattr(q, 'question_text', getattr(q, 'text', getattr(q, 'stem', str(q))))
            is_placeholder = "Diagnostic question" in str(qtext)
            status = "PLACEHOLDER" if is_placeholder else "REAL"
            if is_placeholder:
                placeholder_count += 1
            else:
                real_count += 1
            results.append((grade, subject, topic, i, status, str(qtext)[:80]))

    # Print results
    print(f"{'Class':>5} {'Subject':<15} {'Topic':<20} {'#':>2} {'Status':<12} Question")
    print("-" * 110)
    for grade, subject, topic, i, status, qtext in results:
        print(f"{grade:>5} {subject:<15} {topic:<20} {i+1:>2} {status:<12} {qtext}")

    print(f"\n=== SUMMARY: {real_count} REAL, {placeholder_count} PLACEHOLDER out of {real_count + placeholder_count} ===")

asyncio.run(test())
