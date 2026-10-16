"""Wave 9.8 L4 — marking-scheme prose grader + tutor language setting.

Covers:
  * marking_scheme_grader: point parsing (Step-N / numbered / model_answer),
    hit/miss detection, mark scaling, fail-closed unknown, synonym +
    Devanagari matching, feedback quotes a real missed point.
  * gradable flag: stamped only on guided + real marking data.
  * POST /api/prose/grade: resolves by bank row / node_id, answer_tier
    "graded", honest unknown.
  * language session setting: StudentState.language persists through the
    snapshot round-trip and the endpoint payload; every tutor template
    renders in all 3 languages; "hi" templates carry no stray ASCII.
  * rate limit: /api/prose covered by the expensive prefix list.
"""

import asyncio
import json
import os
import re
import sys

import pytest

sys.path.insert(0, os.path.join("D:\\", "platform", "deploy"))

from backend.services import marking_scheme_grader as grader
from backend.its.tutoring import utterances as U


# --------------------------------------------------------------------------- #
# fixtures                                                                    #
# --------------------------------------------------------------------------- #

SCHEME_STEPS = """Step 1 (Identify+Recall): The French Revolution began in 1789; the Bastille fell on 14 July.
Step 2 (Setup): The Bastille symbolised royal absolutism and arbitrary imprisonment.
Step 3 (Execute): The crowd's action showed the people asserting sovereignty over the king's fortress.
Step 4 (Verify+Answer): It marks the transfer of sovereignty from king to nation.
Step 5 (Generalize): If future finds shift the ratio, the hypothesis strengthens."""

BULLET_SCHEME = """- Step 1: Identify the westernised traits in the case.
- Step 2: Match to the correct form based on scope and agency.
- Step 3: Apply Srinivas's statement on westernisation.
- Step 4: Recall the discriminatory-attitude pattern.
- Step 5: Synthesise the common pattern of selective westernisation."""

NUMBERED_MODEL = """**Correct answer:** Land is a passive factor of production.

**Working:**
1. Land provides space and raw materials but performs no action on its own.
2. Labour and capital are required to transform land into output.
3. Contrast with the active factors: labour and entrepreneurship.
"""

HINDI_SCHEME = """- चरण 1: नाटकीय विडंबना की परिभाषा लागू करें — पात्र अज्ञान में भविष्यवाणी करता है।
- चरण 2: पाठक ज्ञान में पात्र की गलती देखता है।
- चरण 3: यह तनाव और कौतूहल उत्पन्न करता है।"""


class TestPointParsing:
    def test_step_phase_format(self):
        pts = grader.points_from_marking_scheme(SCHEME_STEPS)
        # the Generalize step is a stretch extension, not marking content
        assert len(pts) == 4
        assert pts[0].startswith("The French Revolution began in 1789")
        assert "Generalize" not in " ".join(pts)

    def test_bullet_format(self):
        pts = grader.points_from_marking_scheme(BULLET_SCHEME)
        assert len(pts) == 5
        assert pts[1].startswith("Match to the correct form")

    def test_devanagari_steps(self):
        pts = grader.points_from_marking_scheme(HINDI_SCHEME)
        assert len(pts) == 3
        assert "नाटकीय विडंबना" in pts[0]

    def test_model_answer_numbered_working(self):
        pts = grader.points_from_model_answer(NUMBERED_MODEL)
        assert len(pts) >= 3
        assert any("passive factor" in p or "space and raw materials" in p
                   for p in pts)

    def test_garbage_returns_empty(self):
        assert grader.points_from_marking_scheme("") == []
        assert grader.points_from_marking_scheme(None) == []
        assert grader.points_from_model_answer("") == []


class TestGrade:
    SCHEME_CTX = {"marking_scheme": BULLET_SCHEME}

    def test_full_answer_earns_full_marks(self):
        answer = (
            "The case shows westernised traits like language and material "
            "consumption. It matches the correct form based on scope and "
            "agency. Srinivas's statement on westernisation applies here, "
            "and the discriminatory-attitude pattern is recalled. Overall "
            "it is selective westernisation — the common pattern.")
        out = grader.grade("q", answer, marks=5, context=self.SCHEME_CTX)
        assert out["verdict"] == "graded"
        assert out["earned"] == 5 and out["of"] == 5
        assert len(out["hit_points"]) == 5 and out["missed_points"] == []

    def test_partial_answer_scales(self):
        answer = ("The case shows westernised traits in language and "
                  "culture, and it matches the form by scope and agency.")
        out = grader.grade("q", answer, marks=5, context=self.SCHEME_CTX)
        assert out["earned"] == 2, out
        assert len(out["hit_points"]) == 2
        assert len(out["missed_points"]) == 3

    def test_wrong_answer_scores_zero(self):
        out = grader.grade("q", "The mitochondria is the powerhouse of "
                                "the cell and produces ATP molecules.",
                           marks=5, context=self.SCHEME_CTX)
        assert out["earned"] == 0
        assert out["missed_points"]

    def test_scaling_to_marks(self):
        # 4 points, 4 marks: 2 hits -> 2 marks
        ctx = {"points": ["The revolution began in 1789.",
                          "The Bastille symbolised royal absolutism.",
                          "The crowd asserted popular sovereignty.",
                          "Sovereignty transferred from king to nation."]}
        out = grader.grade("q", "The revolution began in 1789 and the "
                                "Bastille symbolised royal absolutism.",
                           marks=4, context=ctx)
        assert out["earned"] == 2 and out["of"] == 4

    def test_no_marking_data_is_unknown(self):
        out = grader.grade("q", "some answer", marks=5, context=None)
        assert out["verdict"] == "unknown"
        assert out["earned"] is None
        assert out["of"] == 5
        out2 = grader.grade("q", "some answer", marks=5,
                            context={"marking_scheme": "", "model_answer": ""})
        assert out2["verdict"] == "unknown"

    def test_synonym_hit(self):
        ctx = {"points": ["BOD load increases the dissolved oxygen demand "
                          "of the river."]}
        out = grader.grade(
            "q", "The pollution load raises the river's oxygen demand.",
            marks=2, context=ctx)
        assert out["earned"] >= 1

    def test_devanagari_points_match_devanagari_answer(self):
        ctx = {"marking_scheme": HINDI_SCHEME}
        out = grader.grade(
            "q",
            "नाटकीय विडंबना में पात्र अज्ञान में भविष्यवाणी करता है और "
            "पाठक उसकी गलती देखता है। इससे तनाव और कौतूहल उत्पन्न होता है।",
            marks=3, context=ctx)
        assert out["verdict"] == "graded"
        assert out["earned"] == 3, out

    def test_feedback_quotes_missed_point(self):
        answer = "The case shows westernised traits clearly."
        out = grader.grade("q", answer, marks=5, context=self.SCHEME_CTX)
        assert out["missed_points"]
        # feedback must quote one of the actual missed points verbatim
        assert any(mp.split(":")[-1].strip()[:40] in out["feedback"] or
                   mp[:40] in out["feedback"] for mp in out["missed_points"])

    def test_empty_student_answer_zero(self):
        out = grader.grade("q", "", marks=5, context=self.SCHEME_CTX)
        assert out["earned"] == 0 or out["verdict"] == "unknown"


class TestModelAtMarks:
    def test_levels_and_no_fabrication(self):
        model = ("Land is a passive factor of production. "
                 "It provides space and raw materials. "
                 "Labour and capital transform it into output. "
                 "Unlike labour, land performs no action itself. "
                 "Hence economists call it passive.")
        pts = ["Land is a passive factor.", "Land provides space.",
               "Labour transforms land.", "Land performs no action."]
        out = grader.model_at_marks(model, pts, marks=5)
        levels = {e["marks"]: e["text"] for e in out}
        assert set(levels) == {1, 3, 5}
        # every emitted variant is made of real model-answer sentences
        for e in out:
            for frag in re.split(r"(?<=[.!?])\s+", e["text"]):
                frag = frag.strip()
                if frag:
                    assert frag in model
        assert len(levels[1]) < len(levels[5])
        assert "passive" in levels[1].lower()

    def test_short_model_single_level(self):
        out = grader.model_at_marks("One sentence answer.", ["p1"],
                                    marks=1)
        assert [e["marks"] for e in out] == [1]


# --------------------------------------------------------------------------- #
# gradable flag on the refusal path                                           #
# --------------------------------------------------------------------------- #

class TestGradableFlag:
    def _result(self):
        from backend.its.solver.answer_pipeline import (
            AuditTrail, PipelineResult)
        return PipelineResult(label="GUIDED", answer=None, numeric=None,
                              steps=["x"], audit=AuditTrail(lane="T"))

    def test_guided_with_marking_data_sets_gradable(self, monkeypatch):
        from backend.its.solver import tiered_response as tr
        monkeypatch.setattr(
            "backend.services.marking_scheme_grader.has_marking_data",
            lambda q, context=None: True)
        r = self._result()
        tr.stamp_tier(r, question="Explain westernisation.")
        assert r.answer_tier == "guided"
        assert r.gradable is True

    def test_guided_without_marking_data_not_gradable(self, monkeypatch):
        from backend.its.solver import tiered_response as tr
        monkeypatch.setattr(
            "backend.services.marking_scheme_grader.has_marking_data",
            lambda q, context=None: False)
        r = self._result()
        tr.stamp_tier(r, question="Explain westernisation.")
        assert r.answer_tier == "guided"
        assert not getattr(r, "gradable", False)

    def test_verified_never_gradable(self, monkeypatch):
        from backend.its.solver import tiered_response as tr
        monkeypatch.setattr(
            "backend.services.marking_scheme_grader.has_marking_data",
            lambda q, context=None: True)
        from backend.its.solver.answer_pipeline import (
            AuditTrail, PipelineResult)
        r = PipelineResult(label="VERIFIED", answer="7", numeric=7.0,
                           steps=["x"], audit=AuditTrail(lane="T"))
        tr.stamp_tier(r, question="q")
        assert r.answer_tier == "verified"
        assert not getattr(r, "gradable", False)

    def test_gradable_lookup_never_breaks_stamp(self, monkeypatch):
        from backend.its.solver import tiered_response as tr
        def _boom(q, context=None):
            raise RuntimeError("db down")
        monkeypatch.setattr(
            "backend.services.marking_scheme_grader.has_marking_data",
            _boom)
        r = self._result()
        tr.stamp_tier(r, question="q")
        assert r.answer_tier == "guided"
        assert not getattr(r, "gradable", False)


# --------------------------------------------------------------------------- #
# POST /api/prose/grade                                                       #
# --------------------------------------------------------------------------- #

class TestProseGradeEndpoint:
    def _call(self, monkeypatch, resolved, **kw):
        from backend.routers import grade_prose
        monkeypatch.setattr(
            "backend.services.marking_scheme_grader.resolve_marking",
            lambda *a, **k: resolved)
        req = grade_prose.ProseGradeRequest(
            question=kw.pop("question", "Explain westernisation."),
            answer=kw.pop("answer", "westernised traits appear"),
            **kw)
        return asyncio.run(grade_prose.grade_prose(req))

    def test_graded_response_shape(self, monkeypatch):
        resolved = {"points": ["westernised traits appear in the case",
                               "correct form by scope and agency"],
                    "min_points": 2, "marks": 3, "model_answer": "x",
                    "source": "marking_scheme", "matched_question": "q"}
        out = self._call(monkeypatch, resolved)
        assert out["answer_tier"] == "graded"
        assert out["verdict"] == "graded"
        assert out["of"] == 3
        assert out["earned"] >= 1
        assert "model_at_marks" in out
        assert out["source"] == "marking_scheme"

    def test_no_marking_data_honest_unknown(self, monkeypatch):
        out = self._call(monkeypatch, None)
        assert out["verdict"] == "unknown"
        assert out["earned"] is None
        assert out["answer_tier"] == "guided"   # never claims graded
        assert "no marking" in out["feedback"].lower()

    def test_prose_prefix_rate_limited(self):
        from backend.middleware.rate_limiter import _EXPENSIVE_PATTERNS
        assert any("/api/prose/grade".startswith(p)
                   for p in _EXPENSIVE_PATTERNS)


# --------------------------------------------------------------------------- #
# language session setting                                                    #
# --------------------------------------------------------------------------- #

class TestLanguageSetting:
    def test_state_default_and_roundtrip(self):
        from backend.its.tutoring.unified_socratic_engine import (
            StudentState, state_from_dict, state_to_dict)
        s = StudentState(student_id="t")
        assert s.language == "en"
        d = state_to_dict(s)
        d["language"] = "hi"
        s2 = state_from_dict(d)
        assert s2.language == "hi"
        # invalid language is coerced back to en
        d["language"] = "klingon"
        assert state_from_dict(d).language == "en"
        # legacy snapshots without the field still load
        d.pop("language")
        assert state_from_dict(d).language == "en"

    def test_all_keys_render_all_languages(self):
        for key in U.TEMPLATE_KEYS:
            for lang in ("en", "hi", "hinglish"):
                text = U.say(lang, key)
                assert isinstance(text, str) and text.strip(), (key, lang)

    def test_hi_templates_no_ascii_leakage(self):
        allowed = U.ASCII_ALLOWLIST
        for key in U.TEMPLATE_KEYS:
            text = U.say("hi", key, node="n1", follow_up="क")
            leaked = [t for t in re.findall(r"[A-Za-z]+", text)
                      if t.lower() not in allowed]
            assert not leaked, (key, leaked, text)

    def test_hinglish_is_romanised(self):
        text = U.say("hinglish", "prompt_introduce")
        assert re.search(r"[a-zA-Z]", text)          # romanised
        assert not re.search(r"[ऀ-ॿ]", text)   # not Devanagari

    def test_hi_voice_templates_exist_for_used_ids(self):
        for tid in U.VOICE_TEMPLATE_IDS:
            for lang in ("hi", "hinglish"):
                text = U.say_voice(lang, tid, {"first_step": "x = 1",
                                               "hint": "look again",
                                               "slip": "sign slip"})
                assert text.strip(), (tid, lang)

    def test_start_request_accepts_language(self):
        from backend.api.tutor import ItsInputRequest, ItsStartRequest
        r = ItsStartRequest(node_id="n1", language="hi")
        assert r.language == "hi"
        r2 = ItsInputRequest(state={}, input="ready", language="hinglish")
        assert r2.language == "hinglish"

    def test_engine_uses_language(self):
        """Engine must render the introduce prompt in Devanagari when the
        session language is hi (bloom corpus permitting)."""
        bloom_dir = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(
                os.path.dirname(os.path.dirname(
                    os.path.abspath(__file__)))))),
            "cbse_data", "bloom_enrichment")
        if not os.path.isdir(bloom_dir) or not os.listdir(bloom_dir):
            pytest.skip("bloom_enrichment corpus absent")
        from backend.its.tutoring.unified_socratic_engine import (
            UnifiedSocraticEngine)
        engine = UnifiedSocraticEngine(bloom_dir=bloom_dir)
        node_id = sorted(engine.content_store)[0]
        resp = engine.start_session("l4-student", node_id, language="hi")
        prompt = resp.content.get("prompt", "")
        assert re.search(r"[ऀ-ॿ]", prompt), prompt
        # and the English render is untouched
        resp_en = engine.start_session("l4-student", node_id)
        assert re.search(r"[a-zA-Z]", resp_en.content["prompt"])
        assert not re.search(r"[ऀ-ॿ]", resp_en.content["prompt"])
