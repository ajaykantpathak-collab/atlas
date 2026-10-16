import sys
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent
REPO_DIR = BASE_DIR.parent
sys.path.insert(0, str(REPO_DIR))
sys.path.insert(0, str(BASE_DIR))

from its.bkt_engine import BKTEngine

def test_bkt():
    bkt = BKTEngine()
    student = "student_42"
    skill = "QUADRATIC_ROOTS"

    p0 = bkt.get_or_create_state(student, skill).p_mastery
    assert abs(p0 - 0.20) < 1e-4

    # 3 consecutive correct answers
    p1, info1 = bkt.update(student, skill, True)
    assert p1 > p0
    p2, info2 = bkt.update(student, skill, True)
    assert p2 > p1
    p3, info3 = bkt.update(student, skill, True)
    assert p3 > p2
    assert p3 > 0.90
    assert info3["is_mastered"] or info3["zpd_tier"] == "desirable_challenge"

    # A slip reduces mastery slightly
    p4, info4 = bkt.update(student, skill, False)
    assert p4 < p3
    print("BKT Engine unit test passed successfully!")

if __name__ == "__main__":
    test_bkt()
