"""Refusal-gap regression tests (SOLVER-DIG-2, 2026-10-06).

Canonical NCERT questions that the solver core refused (or answered
WRONGLY via a hijacking lane) before the dig-2 fix wave.  Every test
asserts the full answer() contract: a verified label AND the correct
value -- a wrong VERIFIED is a failure, not a pass.

Questions are the board classics a class-10 student actually practices:
  NCERT Ex 4.2/4.3 quadratics (consecutive squares, taps, trains),
  Ex 8.1/8.3 trigonometry (ratio chains, identity proofs),
  Ex 5.2 AP reverse ask, Ex 7 coordinate basics,
  Ex 9/13 heights & distances, surface areas & volumes (cone, frustum),
  Ex 15.1 probability (die, cards), Ex 3.3 linear pairs,
  class-10 heredity why-questions.
"""
import os
import re
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", ".."))
os.environ.setdefault("SOLVER_LLM_MODE", "off")
os.environ.setdefault("SOLVER_OFFLINE", "1")
os.environ.setdefault("GROQ_API_KEY", "")
os.environ.setdefault("GEMINI_API_KEY", "")

from backend.its.solver.answer_pipeline import _answer_impl  # noqa: E402


def _ans(text):
    r = _answer_impl(text)
    return r


# ------------------------------------------------------------------ #
# Quadratic word problems (NCERT class 10, Ex 4.2/4.3)
# ------------------------------------------------------------------ #

def test_quad_consecutive_squares_365():
    r = _ans("The sum of squares of two consecutive positive integers "
             "is 365. Find the integers.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    nums = re.findall(r"\d+", str(r.answer))
    assert sorted(int(n) for n in nums) == [13, 14]


def test_quad_consecutive_odd_squares_650():
    r = _ans("The sum of the squares of two consecutive odd positive "
             "integers is 650. Find the integers.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL")
    nums = re.findall(r"\d+", str(r.answer))
    assert sorted(int(n) for n in nums) == [17, 19]


def test_quad_taps_6_hours():
    # smaller x, larger x-9: 1/x + 1/(x-9) = 1/6 -> x=18, larger=9
    r = _ans("Two water taps together can fill a tank in 6 hours. The "
             "tap of larger diameter takes 9 hours less than the smaller "
             "one to fill the tank separately. Find the time in which "
             "each tap can separately fill the tank.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    nums = sorted(int(n) for n in re.findall(r"\d+", str(r.answer)))
    assert nums in ([9, 18], [6, 9, 18])  # times 9 and 18 (6 = given)


def test_quad_taps_ncert_9_3_8():
    r = _ans("Two water taps together can fill a tank in 9 3/8 hours. "
             "The tap of larger diameter takes 10 hours less than the "
             "smaller one to fill the tank separately. Find the time in "
             "which each tap can separately fill the tank.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL")
    hay = str(r.answer) + " ".join(str(s) for s in r.steps)
    assert "25" in hay and "15" in hay


def test_quad_train_mysore_bengaluru():
    # passenger 33, express 44: 132/33 - 132/44 = 1 h, speeds differ by 11
    r = _ans("An express train takes 1 hour less than a passenger train "
             "to travel 132 km between Mysore and Bengaluru. If the "
             "average speed of the express train is 11 km/h more than "
             "that of the passenger train, find the average speed of the "
             "two trains.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    hay = str(r.answer) + " ".join(str(s) for s in r.steps)
    assert "44" in hay and "33" in hay
    # the historical false answer must never ship again
    assert not re.search(r"\b132\s*km/h\b", str(r.answer))


def test_quad_train_360km():
    # 360/x - 360/(x+5) = 1 -> x = 40
    r = _ans("A train travels 360 km at a uniform speed. If the speed "
             "had been 5 km/h more, it would have taken 1 hour less for "
             "the same journey. Find the speed of the train.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    assert "40" in str(r.answer)
    assert "360" not in str(r.answer)  # the old wrong answer was "360"


# ------------------------------------------------------------------ #
# Trigonometry (NCERT Ex 8.1/8.2/8.3)
# ------------------------------------------------------------------ #

def test_trig_sin_3_5_find_tan():
    r = _ans("If sin A = 3/5, find tan A.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    assert "3/4" in str(r.answer)


def test_trig_cos_12_13_other_ratios():
    r = _ans("If cos A = 12/13, find the other trigonometric ratios of "
             "angle A.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL")
    hay = str(r.answer) + " ".join(str(s) for s in r.steps)
    for frac in ("5/13", "5/12", "13/5", "13/12", "12/5"):
        assert frac in hay, f"missing {frac} in {hay[:200]}"


def test_trig_identity_proof_ncert():
    r = _ans("Prove that (sin A + cosec A)^2 + (cos A + sec A)^2 = "
             "7 + tan^2 A + cot^2 A.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    hay = str(r.answer) + " " + " ".join(str(s) for s in r.steps)
    assert "verified" in hay.lower() or "proved" in hay.lower() \
        or "identity" in hay.lower()


# ------------------------------------------------------------------ #
# Heights and distances (NCERT Some Applications of Trigonometry)
# ------------------------------------------------------------------ #

def test_heights_tower_30deg_30m():
    # h = 30 * tan 30 deg = 10*sqrt(3) ~ 17.32 m
    r = _ans("The angle of elevation of the top of a tower from a point "
             "on the ground, which is 30 m away from the foot of the "
             "tower, is 30 degrees. Find the height of the tower.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    m = re.search(r"(\d+(?:\.\d+)?)", str(r.answer))
    assert m and abs(float(m.group(1)) - 17.32) < 0.1


# ------------------------------------------------------------------ #
# AP reverse ask (NCERT Ex 5.2 Q8-style)
# ------------------------------------------------------------------ #

def test_ap_which_term_is_78():
    # a=3, d=5: t_n = 78 -> n = 16
    r = _ans("Which term of the AP 3, 8, 13, 18, ... is 78?")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    assert "16" in str(r.answer)


def test_ap_forward_ask_regression():
    # the forward ask must keep working after the reverse branch lands
    r = _ans("Find the 10th term of the AP 2, 7, 12, ...")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL")
    assert "47" in str(r.answer)


# ------------------------------------------------------------------ #
# Mensuration (NCERT Surface Areas and Volumes)
# ------------------------------------------------------------------ #

def test_mens_cone_volume():
    # V = (1/3) * 3.14 * 144 * 16 = 2411.52 cm^3
    r = _ans("The height of a cone is 16 cm and its base radius is "
             "12 cm. Find its volume. Use pi = 3.14.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    m = re.search(r"(\d+(?:\.\d+)?)", str(r.answer))
    assert m and abs(float(m.group(1)) - 2411.52) < 2.0, str(r.answer)


def test_mens_frustum_volume_ncert():
    # V = (pi/3)*45*(28^2 + 7^2 + 28*7) = 15435*pi ~ 48510 (pi = 22/7)
    r = _ans("The radii of the ends of a frustum of a cone 45 cm high "
             "are 28 cm and 7 cm. Find its volume.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    m = re.search(r"(\d+(?:\.\d+)?)", str(r.answer))
    assert m and 48400 < float(m.group(1)) < 48600, str(r.answer)


def test_mens_sphere_area_regression():
    r = _ans("Find the surface area of a sphere of radius 7 cm.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL")
    m = re.search(r"(\d+(?:\.\d+)?)", str(r.answer))
    assert m and abs(float(m.group(1)) - 616) < 2.0  # 4*pi*49 ~ 615.75


# ------------------------------------------------------------------ #
# Probability (NCERT Ex 15.1)
# ------------------------------------------------------------------ #

def test_prob_die_prime():
    r = _ans("A die is thrown once. Find the probability of getting a "
             "prime number.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    assert "1/2" in str(r.answer)


def test_prob_die_even_regression_style():
    r = _ans("A die is thrown once. Find the probability of getting an "
             "even number.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL")
    assert "1/2" in str(r.answer)


def test_prob_card_red_king():
    # 2 red kings out of 52 -> 1/26 (the old code answered 1/13)
    r = _ans("One card is drawn from a well-shuffled deck of 52 cards. "
             "Find the probability of getting a king of red colour.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    assert "1/26" in str(r.answer)


def test_prob_card_plain_king_regression():
    r = _ans("One card is drawn from a well-shuffled deck of 52 cards. "
             "Find the probability of getting a king.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL")
    assert "1/13" in str(r.answer)


# ------------------------------------------------------------------ #
# Linear pair word problems (NCERT Ex 3.3/3.4)
# ------------------------------------------------------------------ #

def test_linear_difference_times():
    # x - y = 26, x = 3y -> 39 and 13
    r = _ans("The difference between two numbers is 26 and one number "
             "is three times the other. Find them.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    nums = sorted(int(n) for n in re.findall(r"\d+", str(r.answer)))
    assert nums == [13, 39]


def test_linear_sum_times():
    # x + y = 180, x = 5y -> 150 and 30
    r = _ans("The sum of two numbers is 180 and one number is five "
             "times the other. Find the numbers.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL")
    nums = sorted(int(n) for n in re.findall(r"\d+", str(r.answer)))
    assert nums == [30, 150]


# ------------------------------------------------------------------ #
# Biology why-questions (NCERT Heredity / Reproduction) -- curated,
# deterministic concept answers instead of the generic guided script
# ------------------------------------------------------------------ #

def test_bio_tall_progeny():
    r = _ans("Why is the progeny always tall when a tall pea plant is "
             "crossed with a short pea plant?")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL"), \
        f"refused: {r.label} {r.refusal_reason}"
    hay = str(r.answer) + " ".join(str(s) for s in r.steps)
    assert "Tt" in hay and ("tall" in hay.lower())


def test_bio_variation_survival():
    r = _ans("How does the creation of variations in a species promote "
             "survival?")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL")
    hay = str(r.answer) + " ".join(str(s) for s in r.steps).lower()
    assert "variation" in hay and ("surviv" in hay or "adapt" in hay)


# ------------------------------------------------------------------ #
# Guards: the fix wave must not break the lanes it narrows
# ------------------------------------------------------------------ #

def test_signature_lane_still_solves_simple_speed():
    r = _ans("A car covers 90 km in 2 hours. Find its average speed.")
    assert r.label in ("VERIFIED", "VERIFIED_OFFICIAL")
    assert "45" in str(r.answer)


def test_signature_lane_refuses_delta_clauses():
    from backend.its.solver import signature_resolver as sr
    assert sr.resolve("An express train takes 1 hour less than a "
                      "passenger train to travel 132 km. If the average "
                      "speed of the express train is 11 km/h more than "
                      "that of the passenger train, find the average "
                      "speed of the two trains.") is None


def test_composite_carved_never_answers_volume():
    from backend.its.solver import structure_families as sf
    spec = sf.STRUCTURE_SPECS.get("COMPOSITE_CARVED")
    out = spec["compute"]({}, "The height of a cone is 16 cm and its "
                          "base radius is 12 cm. Find its volume.")
    assert out is None


# ------------------------------------------------------------------ #
# Stage-0 normalizer guards: the MCQ option-tail stripper must never
# eat a math expression -- 'cosec A)^2', 'sec A)^2', 'cot^2 A.' are
# angle references, not option markers (this truncation WAS the
# identity-proof refusal root cause)
# ------------------------------------------------------------------ #

def test_normalizer_keeps_trig_identity_intact():
    from backend.its.solver.input_normalizer import normalize_input
    q = ("Prove that (sin A + cosec A)^2 + (cos A + sec A)^2 = "
         "7 + tan^2 A + cot^2 A.")
    n = normalize_input(q)
    assert "cot^2 A" in n, f"normalizer truncated the question to: {n!r}"
    assert "=" in n and "7" in n


def test_normalizer_still_strips_real_option_block():
    from backend.its.solver.input_normalizer import normalize_input
    q = ("The roots of the equation x^2 - 27x + 182 = 0 are: "
         "A) 12, 13  B) 13, 14  C) 14, 15  D) 15, 16")
    n = normalize_input(q)
    assert "A)" not in n and "B)" not in n, f"option block survived: {n!r}"
    assert "182" in n  # the actual equation stays


# ------------------------------------------------------------------ #
# LLM-mode contract: with SOLVER_LLM_MODE=off the PAL lane must make
# ZERO http calls.  (Root-cause finding: structure_extractor._chat
# called Groq regardless of the documented solver contract.)
# ------------------------------------------------------------------

def test_pal_lane_makes_no_llm_call_when_mode_off(monkeypatch):
    import os
    import backend.its.solver.structure_extractor as se
    import httpx

    calls = []

    class _FakeResp:
        status_code = 503

        def json(self):
            return {}

    def _spy(*a, **k):  # records ANY remote attempt
        calls.append(a[0] if a else k.get("url"))
        return _FakeResp()

    # a key IS present (live deployments dotenv-load one) — the mode
    # gate, not key absence, must be what blocks the call
    monkeypatch.setattr(os, "environ", {**os.environ,
                                        "GROQ_API_KEY": "test-key",
                                        "GEMINI_API_KEY": "test-key"})
    monkeypatch.setattr(httpx, "post", _spy)
    se._CACHE.clear()
    monkeypatch.setattr(se, "_cache_path", lambda: None)  # no disk cache
    out = se.extract_program("Two water taps together can fill a tank "
                             "in 6 hours. The tap of larger diameter "
                             "takes 9 hours less than the smaller one.")
    assert calls == [], f"LLM http calls attempted while mode=off: {calls}"
    assert out is None or not (out.get("code") or out.get("formula"))


# ------------------------------------------------------------------ #
# Input-normalizer truncation guard (SOLVER-DIG-2): the MCQ-option
# stripper must keep the question body intact — a question whose own
# text ends in 'A.' before the options lost its ask object.
# ------------------------------------------------------------------ #

def test_normalizer_keeps_question_body_before_options():
    from backend.its.solver.input_normalizer import normalize_input
    out = normalize_input("If cos A = 12/13, find sin A. "
                          "A) 5/13 B) 12/5 C) 13/12 D) 5/12")
    assert "find sin A" in out


def test_normalizer_still_strips_option_lists():
    from backend.its.solver.input_normalizer import normalize_input
    out = normalize_input("The roots of x^2 - 7x + 12 = 0 are: "
                          "A) 3,4 B) 5,6 C) 7,8 D) 2,6")
    assert "A)" not in out and "3,4" not in out


def test_normalizer_never_truncates_identity_proof():
    from backend.its.solver.input_normalizer import normalize_input
    q = ("Prove that (sin A + cosec A)^2 + (cos A + sec A)^2 = "
         "7 + tan^2 A + cot^2 A.")
    n = normalize_input(q)
    # the canonicalizer strips the trailing sentence period (long-standing
    # rule) — the no-truncation contract is that every CONTENT token of
    # the question survives Stage 0
    assert n.rstrip(".") == q.rstrip("."), f"truncated to: {n!r}"


# ------------------------------------------------------------------ #
# Generator-factory: normalize_question must preserve a legitimate
# 0-indexed MCQ answer key.  'str(answer) if answer else '' treated
# the FIRST-option key (int 0) as missing — served MCQs lost their
# grading key (live repro: 'Father of Sociology', answer 0 → '').
# ------------------------------------------------------------------ #

def test_normalize_question_preserves_zero_answer_key():
    from services.question_adapter import normalize_question
    q = {"question_text": "Who is considered the 'Father of Sociology'?",
         "options": ["Auguste Comte", "Karl Marx",
                     "Emile Durkheim", "Max Weber"],
         "answer": 0}
    n = normalize_question(q, "generator:test", 0, 0.5, seed=11)
    assert n["correct_answer"] == "0", \
        f"zero answer key destroyed: {n['correct_answer']!r}"


def test_c3_evs_living_mcqs_have_exactly_one_correct_option():
    """Generator-factory: class-3 EVS living/non-living MCQs used to
    sample ALL FOUR options from the combined living+nonliving pool,
    so a question could carry 2-3 living options (or none matching the
    key) — seed 55 shipped 'chair' as THE living thing."""
    from solvers.registry import SolverRegistry
    from services.question_adapter import AdapterRegistry
    from solvers.evs.class3_evs_questions import INDIAN_LIVING
    reg = SolverRegistry()
    reg.initialize()
    ad = AdapterRegistry()
    ad.set_solver_registry(reg)
    adapter = ad.get_adapter("class3_evs_questions:generate_c3_evs_001")
    assert adapter is not None, "c3_evs_001 generator lost from registry"
    L = {x.lower() for x in INDIAN_LIVING}
    checked = 0
    for seed in (11, 22, 33, 44, 55):
        for q in adapter.generate(seed, 6, 0.5):
            stem = (q.get("question_text") or "").lower()
            opts = [str(o).strip().lower() for o in (q.get("options") or [])]
            key = str(q.get("correct_answer") or "").strip().lower()
            if not opts or not key:
                continue
            # NB: 'non-living thing?' CONTAINS the substring
            # 'living thing?' — classify the non-living asks FIRST
            is_nonliving_ask = "non-living thing?" in stem or \
                "not need food" in stem
            is_living_ask = "living thing?" in stem and \
                not is_nonliving_ask
            if not (is_living_ask or is_nonliving_ask):
                continue
            n_living = sum(1 for o in opts if o in L)
            if is_living_ask:
                assert n_living == 1, \
                    f"seed {seed}: {n_living} living options in {opts}"
                assert key in L, f"seed {seed}: key {key!r} is not living"
            else:
                assert n_living == len(opts) - 1, \
                    f"seed {seed}: expected one non-living in {opts}"
                assert key not in L, \
                    f"seed {seed}: key {key!r} is not non-living"
            assert key in opts, f"seed {seed}: key {key!r} not in {opts}"
            checked += 1
    assert checked >= 5, f"too few classification MCQs checked: {checked}"
