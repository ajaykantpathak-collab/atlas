r"""test_grader_voice_scrub.py -- the bank-prose feedback scrub.

Run:
      cd D:\platform\deploy
      python -m pytest backend/tests/test_grader_voice_scrub.py -q

Contract under test (grader-voice wave):
  - correct_display holding GRADER prose ("You's diagram is
    incorrect...") or >80 chars of commentary serves "" -- the FE
    renders its own examiner-note path when empty;
  - a wrong verdict + explanation opening with a verdict clause
    ("Your answer is correct.") has ONLY that clause stripped --
    the teaching content after it is kept;
  - a correct verdict leaves the explanation untouched;
  - short answer values ("x = 42") are never touched.
"""

import sys

sys.path.insert(0, r"D:\platform\deploy")
sys.path.insert(0, r"D:\platform\deploy\backend")

from backend.api.practice import _clean_feedback  # noqa: E402


def test_grader_prose_correct_answer_blanked():
    cd, ex = _clean_feedback(
        "You's diagram is incorrect. The correct diagram shows a "
        "right angle at B.",
        "You's answer is correct. The sum is 42.",
        is_correct=False,
    )
    assert cd == ""
    # verdict clause stripped, teaching content kept
    assert "correct" not in ex.split(".")[0].lower() or "correct diagram" not in ex
    assert "The sum is 42." in ex


def test_wrong_verdict_strips_contradicting_clause():
    cd, ex = _clean_feedback(
        "42",
        "Your answer is correct. The sum is 42 because 40 + 2 = 42.",
        is_correct=False,
    )
    assert cd == "42"
    assert ex.startswith("The sum is 42"), ex
    assert "your answer is correct" not in ex.lower()


def test_wrong_verdict_strips_agreeing_clause_too():
    # "Your answer is incorrect." is still grader meta-commentary.
    _, ex = _clean_feedback(
        "42", "Your answer was incorrect. The right method is to carry the tens.",
        is_correct=False)
    assert ex.startswith("The right method"), ex


def test_bare_correct_opener_stripped_when_wrong():
    _, ex = _clean_feedback("42", "Correct. Well done spotting the pattern.",
                            is_correct=False)
    assert ex.startswith("Well done"), ex


def test_correct_verdict_leaves_explanation_untouched():
    text = "Your answer is correct. The sum is 42."
    _, ex = _clean_feedback("42", text, is_correct=True)
    assert ex == text


def test_short_answer_values_preserved():
    cd, _ = _clean_feedback("x = 42", "", is_correct=False)
    assert cd == "x = 42"


def test_long_prose_correct_answer_blanked():
    cd, _ = _clean_feedback(
        "The mitochondria is the powerhouse of the cell because it "
        "produces ATP through cellular respiration in the cristae.",
        "", is_correct=True)
    assert cd == ""


def test_empty_inputs_safe():
    assert _clean_feedback(None, None, False) == ("", "")
    assert _clean_feedback("", "", True) == ("", "")




# ═════════════════════════════════════════════════════════════════════
# Shared module API — services/feedback_scrub.py
# The per-endpoint scrubs; _clean_feedback above is the practice
# surface's display wrapper over the same two functions.
# ═════════════════════════════════════════════════════════════════════

import asyncio  # noqa: E402
from types import SimpleNamespace  # noqa: E402

from backend.services.feedback_scrub import (  # noqa: E402
    has_grader_voice, scrub_answer_key, scrub_explanation)


def test_scrub_answer_key_grader_voice_blanked():
    assert scrub_answer_key(
        "You's diagram is incorrect. The correct diagram shows a "
        "right angle at B.") == ""
    assert scrub_answer_key("Your answer is wrong.") == ""
    assert scrub_answer_key("The student forgot the units.") == ""
    assert scrub_answer_key("Correct. Well done.") == ""


def test_scrub_answer_key_legit_long_answer_unchanged():
    # the no-length-rule contract: a long authored answer is a real key,
    # not commentary — only the VOICE is detected.
    long_key = ("x = 42 because the sum of the interior angles of the "
                "triangle is 180 degrees and the two base angles are "
                "equal, so the apex angle measures 180 - 2 * 69.")
    assert scrub_answer_key(long_key) == long_key


def test_scrub_answer_key_empty_safe():
    assert scrub_answer_key("") == ""
    assert scrub_answer_key(None) == ""
    assert scrub_answer_key(42) == "42"


def test_scrub_explanation_wrong_verdict_strips_clause_keeps_teaching():
    ex = scrub_explanation(
        "Your answer is correct. The sum is 42 because 40 + 2 = 42.",
        is_correct=False)
    assert ex == "The sum is 42 because 40 + 2 = 42.", ex


def test_scrub_explanation_correct_verdict_untouched():
    text = "Your answer is correct. The sum is 42."
    assert scrub_explanation(text, is_correct=True) == text


def test_scrub_explanation_no_clause_wrong_verdict_untouched():
    text = "Resolve the force into horizontal and vertical components."
    assert scrub_explanation(text, is_correct=False) == text


def test_scrub_explanation_empty_safe():
    assert scrub_explanation("", False) == ""
    assert scrub_explanation(None, False) == ""


def test_has_grader_voice():
    assert has_grader_voice("You's answer is correct.")
    assert has_grader_voice("The student confused sine and cosine.")
    assert not has_grader_voice("The correct method is to carry the tens.")
    assert not has_grader_voice(None)


# ═════════════════════════════════════════════════════════════════════
# Serving-boundary tests — the same direct-call pattern as
# test_paper_mode.py: stub rows/dicts, no DB, no client.
# ═════════════════════════════════════════════════════════════════════

def test_diagnostics_feedback_payload_scrubs_bank_prose():
    from backend.api import diagnostics as diag
    q = {"question_id": "q1", "options": ["7", "42"],
         "correct_answer": "You's answer is incorrect. It is 42.",
         "explanation": "Your answer is correct. The sum is 42."}
    out = diag._feedback_payload(q, is_correct=False)
    assert out["correctAnswer"] == ""
    assert out["explanation"] == "The sum is 42.", out["explanation"]


def test_diagnostics_feedback_payload_legit_key_served():
    from backend.api import diagnostics as diag
    q = {"question_id": "q1", "options": ["7", "42"],
         "correct_answer": "42",
         "explanation": "The sum is 42 because 40 + 2 = 42."}
    out = diag._feedback_payload(q, is_correct=True)
    assert out["correctAnswer"] == "42"
    assert out["explanation"] == "The sum is 42 because 40 + 2 = 42."


class _DeadDB:
    """No DB in the unit tier — execute() always fails so the mapper
    exercises its degrade path (chapter_tests._node_titles catches)."""
    async def execute(self, *a, **k):
        raise RuntimeError("unit test: no db")


def _chapter_session():
    return {
        "session_id": "s1", "subject_label": "Mathematics",
        "class_level": 10, "chapter_title": "Triangles",
        "timed_minutes": None, "short_test": False, "short_note": None,
        "questions": [{"question_id": "q1", "text": "What is 40 + 2?"}],
        "keys": {"q1": {
            "correct_answer": "You's answer is incorrect. It is 42.",
            "marks": 1, "node_id": "",
            "explanation": "Your answer is correct. The sum is 42.",
            "question_text": "What is 40 + 2?"}},
        "answers": {"q1": {"answer": "7", "time": 1.0,
                           "at": "2026-01-01T00:00:00+00:00"}},
    }


def test_chapter_test_review_scrubs_bank_prose():
    from backend.api import chapter_tests as ct
    report = asyncio.run(ct._build_report(_DeadDB(), _chapter_session()))
    item = report["review"][0]
    assert item["isCorrect"] is False
    assert item["expectedAnswer"] == ""
    assert item["explanation"] == "The sum is 42.", item["explanation"]


def test_chapter_test_review_legit_key_served():
    from backend.api import chapter_tests as ct
    sess = _chapter_session()
    sess["keys"]["q1"]["correct_answer"] = "42"
    sess["keys"]["q1"]["explanation"] = "The sum is 42."
    report = asyncio.run(ct._build_report(_DeadDB(), sess))
    item = report["review"][0]
    assert item["expectedAnswer"] == "42"
    assert item["explanation"] == "The sum is 42."


def _preboard_session():
    return {
        "session_id": "s1", "paperTitle": "Maths Pre-board",
        "label": "Mathematics", "classLevel": 10,
        "sections": [{
            "sectionId": "A", "title": "Section A",
            "questions": [{
                "questionId": "q1", "number": 1,
                "text": "What is 40 + 2?", "choiceGroup": None}]}],
        "keys": {"q1": {
            "correct_answer": "Your answer is wrong. It is 42.",
            "marks": 1, "section": "A", "chapter": "Arithmetic",
            "model_answer": "40 + 2 = 42.",
            "explanation": "Your answer is correct. The sum is 42.",
            "question_text": "What is 40 + 2?",
            "choice_partner": None}},
        "answers": {"q1": "7"},
        "_submit_answers": [{"questionId": "q1", "answer": "7",
                             "timeTakenSeconds": 1.0}],
        "shortfalls": [],
    }


def test_preboard_review_scrubs_bank_prose():
    from backend.api import preboard as pb
    report = asyncio.run(pb._grade(None, _preboard_session()))
    item = report["review"][0]
    assert item["isCorrect"] is False
    assert item["expectedAnswer"] == ""
    assert item["explanation"] == "The sum is 42.", item["explanation"]
    # authored prose is never scrubbed
    assert item["modelAnswer"] == "40 + 2 = 42."


def test_preboard_review_legit_key_served():
    from backend.api import preboard as pb
    sess = _preboard_session()
    sess["keys"]["q1"]["correct_answer"] = "42"
    report = asyncio.run(pb._grade(None, sess))
    assert report["review"][0]["expectedAnswer"] == "42"


def test_exams_adapter_review_scrubs_grader_key():
    from backend.api import exams_adapter as ea
    g = SimpleNamespace(
        question_id="q1", question_number=1, section_id="A", topic="T",
        marks=1, student_answer="x",
        correct_answer="You's diagram is incorrect.",
        status="incorrect", awarded_marks=0.0, max_marks=1,
        feedback="Incorrect.", rubric=[])
    out = ea._map_graded_question(g, "exam1")
    # grader prose must not render as the synthesized "correct" option
    assert out["options"] is None
    assert out["correctAnswer"] == ""


def test_exams_adapter_review_serves_legit_key():
    from backend.api import exams_adapter as ea
    g = SimpleNamespace(
        question_id="q1", question_number=1, section_id="A", topic="T",
        marks=1, student_answer="x", correct_answer="42",
        status="incorrect", awarded_marks=0.0, max_marks=1,
        feedback="Incorrect. Expected: 42", rubric=[])
    out = ea._map_graded_question(g, "exam1")
    assert out["options"] == [
        {"id": "q1-o0", "label": "A", "text": "42", "isCorrect": True}]
    assert out["correctAnswer"] is None


def test_exam_service_feedback_never_quotes_grader_prose():
    from backend.services.exam_service import ExamService, QuestionData
    svc = ExamService.__new__(ExamService)
    q = QuestionData(
        question_id="q1", question_number=1, section_id="A",
        question_type="short_answer", marks=1, topic="T", subtopic="S",
        text="What is 40 + 2?",
        correct_answer="You's answer is incorrect. It is 42.",
        internal_id="X1")
    g = svc._grade_question(q, "999", 0)
    assert g.feedback == "Incorrect.", g.feedback


def test_exam_service_feedback_quotes_legit_key():
    from backend.services.exam_service import ExamService, QuestionData
    svc = ExamService.__new__(ExamService)
    q = QuestionData(
        question_id="q1", question_number=1, section_id="A",
        question_type="short_answer", marks=1, topic="T", subtopic="S",
        text="What is 40 + 2?", correct_answer="42",
        internal_id="X1")
    g = svc._grade_question(q, "999", 0)
    assert g.feedback == "Incorrect. Expected: 42", g.feedback


def test_exam_sim_answer_feedback_scrubs_key(monkeypatch):
    from backend.services import exam_service as xs
    sess = SimpleNamespace(
        session_id="s1", completed=False, current_question=0,
        paper=SimpleNamespace(questions=[
            {"index": 1, "question": "What is 40 + 2?", "marks": 1,
             "options": [], "question_type": "short_answer",
             "correct_answer": "Your answer is wrong. It is 42."},
            {"index": 2, "question": "Next?", "marks": 1,
             "options": [], "question_type": "short_answer",
             "correct_answer": "7"}]),
        answers=[], duration_minutes=10, started_at=None)

    async def _load(_sid):
        return sess

    async def _save(_s):
        return None

    monkeypatch.setattr(xs, "_exam_load", _load)
    monkeypatch.setattr(xs, "_exam_save", _save)
    out = asyncio.run(xs._exam_sim_submit_answer(
        None, session_id="s1", student_answer="7"))
    assert out["feedback"]["correct_answer"] == ""


def test_paper_mode_review_scrubs_grader_prose(monkeypatch):
    from backend.routers import paper_mode as pmr
    from backend.services import paper_mode_service as pms
    row = SimpleNamespace(
        id="11111111-2222-3333-4444-555555555555",
        subject="phy", class_level=10,
        question_text="Resolve the 10 N force into components.",
        correct_answer="You's diagram is incorrect.",
        model_answer="Fx = 10 cos θ, Fy = 10 sin θ.",
        explanation="Your answer is correct. Resolve per axis.",
        marking_scheme="1m: components")

    class _Res:
        def scalar_one_or_none(self):
            return row

    class _DB:
        async def execute(self, *a, **k):
            return _Res()

    class _Store:
        async def load(self, _sid):
            return {}

        async def save(self, _payload):
            return None

    async def _sol(_text):
        return {"steps": []}

    async def _mis(_row):
        return None

    monkeypatch.setattr(
        pms, "grade_attempt",
        lambda r, a: {"verdict": "incorrect", "correct": False,
                      "marks": 1, "marks_awarded": 0, "lane": "x"})
    monkeypatch.setattr(pms, "solve_solution", _sol)
    monkeypatch.setattr(pms, "misconception_link", _mis)
    monkeypatch.setattr(pms, "new_store", lambda: _Store())

    out = asyncio.run(pmr.paper_attempt(
        pmr.AttemptRequest(
            question_id="11111111-2222-3333-4444-555555555555",
            student_answer="Fx = 10"),
        SimpleNamespace(id="student-1"), _DB()))
    rev = out["review"]
    assert rev["correct_answer"] == ""
    assert rev["explanation"] == "Resolve per axis.", rev["explanation"]
    # authored prose is never scrubbed
    assert rev["model_answer"] == "Fx = 10 cos θ, Fy = 10 sin θ."


def test_quiz_question_schema_scrubs_grader_fields():
    from backend.routers import assessment as ra
    q = SimpleNamespace(
        id="q1", node_id="n1", question="What is 40 + 2?",
        question_type="mcq", options=["7", "42"],
        correct_answer="You's answer is correct.",
        explanation="Your answer is correct. The sum is 42.",
        marks=1, marking_scheme=None, difficulty="easy")
    s = ra._quiz_question_to_schema(q)
    assert s.correct_answer == ""
    assert s.explanation is None


def test_quiz_question_schema_withholds_key_pre_answer():
    """The question-serving GET must NEVER ship key material — the student
    could read the answer out of the payload. The graded key arrives
    post-submit via QuizAnswerResponse instead."""
    from backend.routers import assessment as ra
    q = SimpleNamespace(
        id="q1", node_id="n1", question="What is 40 + 2?",
        question_type="mcq", options=["7", "42"],
        correct_answer="42",
        explanation="The correct method is to add the tens first.",
        marks=1, marking_scheme="award 1 for addition",
        difficulty="easy")
    s = ra._quiz_question_to_schema(q)
    assert s.correct_answer == ""
    assert s.explanation is None
    assert s.marking_scheme is None
    # non-key fields still serve
    assert s.question == "What is 40 + 2?" and s.options == ["7", "42"]


# ═════════════════════════════════════════════════════════════════════
# weakness_areas — exam-result surfaces (GET /attempts, /attempts/{id},
# POST /exams/{id}/submit) carry exam-authored {topic, question_id,
# correct_answer} dicts; the key must survive, grader prose must not.
# ═════════════════════════════════════════════════════════════════════

def test_weakness_areas_grader_prose_key_blanked():
    from backend.routers import assessment as ra
    out = ra._scrub_weakness_areas([{
        "topic": "Geometry", "question_id": "q1",
        "correct_answer": "You's diagram is incorrect. It is 42.",
        "explanation": "Your answer is wrong. Carry the tens."}])
    assert out[0]["correct_answer"] == ""
    # no verdict context on this surface — grader-voice opener withholds
    assert out[0]["explanation"] == ""


def test_weakness_areas_legit_key_served():
    from backend.routers import assessment as ra
    out = ra._scrub_weakness_areas([{
        "topic": "Arithmetic", "question_id": "q2",
        "correct_answer": "42",
        "explanation": "The sum is 42 because 40 + 2 = 42."}])
    assert out[0]["correct_answer"] == "42"
    assert out[0]["explanation"] == "The sum is 42 because 40 + 2 = 42."


def test_weakness_areas_shape_preserved():
    from backend.routers import assessment as ra
    src = [{"topic": "T1", "question_id": "q1", "correct_answer": "42"},
           {"topic": "T2", "question_id": "q2",
            "correct_answer": "The student forgot the units."},
           "opaque-item"]
    out = ra._scrub_weakness_areas(src)
    assert len(out) == 3
    assert out[0]["topic"] == "T1" and out[0]["question_id"] == "q1"
    assert out[0]["correct_answer"] == "42"
    assert out[1]["correct_answer"] == ""
    # non-dict items pass through; the caller's list is not mutated
    assert out[2] == "opaque-item"
    assert src[1]["correct_answer"] == "The student forgot the units."
    assert ra._scrub_weakness_areas(None) == []
