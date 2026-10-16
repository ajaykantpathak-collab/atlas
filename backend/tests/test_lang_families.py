"""test_lang_families.py — LANG-ALL grammar-family regressions.

The language families are deterministic rule engines: trigger -> slot
extraction -> morphological tables -> transformed sentence.  Since the
WS-B consolidation step 6 (2026-10-10) they live in the subject files —
english_families.ENGLISH_LANG_SPECS / hindi_families.HINDI_LANG_SPECS
(structure_families_lang.py was deleted in the same batch — the specs
moved verbatim, no alias survives) — and this
suite reads them through STRUCTURE_SPECS, exactly like production.
Every canonical case here is a school-textbook question; the control
beside each adversarial case proves the honest refusals (a half-parsed
transformation must never ship a wrong sentence).  Verifier checks run
the answer() choke point labels.

Companion: test_structure_family_gates.py (the maths/physics pattern
this file follows).
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))
# ONLY the deploy root on sys.path (see test_structure_family_gates.py
# for the two-module-identity trap).

import pytest

# structure_families FIRST: importing the spec registry before the subject
# files keeps the LANG_* insertion order canonical (ENG then HI) no matter
# which test module pytest collects first (the subject files self-register
# their specs, so every order is complete — this only pins the order).
from backend.its.solver.structure_families import STRUCTURE_SPECS
from backend.its.solver.english_families import ENGLISH_LANG_SPECS
from backend.its.solver.hindi_families import HINDI_LANG_SPECS


# ------------------------------------------------------------ registry
def test_lang_specs_registered():
    langs = {k for k in STRUCTURE_SPECS if k.startswith("LANG_")}
    assert {"LANG_ENG_PASSIVE", "LANG_ENG_ACTIVE", "LANG_ENG_TENSE",
            "LANG_ENG_SPEECH", "LANG_ENG_POS", "LANG_ENG_TRANS",
            "LANG_HI_SANDHI", "LANG_HI_SAMAS", "LANG_HI_KARAK",
            "LANG_HI_VACHAN", "LANG_HI_KAAL"} <= langs


def _compute(sid, q):
    return STRUCTURE_SPECS[sid]["compute"]({}, q)


# ------------------------------------------------------------- passive
@pytest.mark.parametrize("q,expected", [
    ("Change into passive voice: The dog bites the man.",
     "The man is bitten by the dog."),
    ("Change into passive voice: The boys are flying kites.",
     "Kites are being flown by the boys."),
    ("Change into passive voice: She has written a poem.",
     "A poem has been written by her."),
    ("Change into passive voice: My mother cooked dinner yesterday.",
     "Dinner was cooked by my mother yesterday."),
    ("Change into passive voice: They will announce the results "
     "tomorrow.",
     "The results will be announced by them tomorrow."),
    ("Change into passive voice: The teacher is teaching the lesson.",
     "The lesson is being taught by the teacher."),
    ("Change into passive voice: The gardener waters the plants every "
     "day.",
     "The plants are watered by the gardener every day."),
])
def test_passive_active_sources(q, expected):
    r = _compute("LANG_ENG_PASSIVE", q)
    assert r is not None, q
    assert r[2] == expected, (q, r[2])


def test_passive_already_passive_is_named():
    r = _compute("LANG_ENG_PASSIVE",
                 "Change into passive voice: The ball was thrown by the "
                 "boy.")
    assert r is not None
    assert "already in the passive" in r[2].lower()


@pytest.mark.parametrize("q", [
    "Change into passive voice: The sky is blue.",   # copula, no object
    "Change into passive voice.",                    # no sentence
])
def test_passive_honest_refusals(q):
    r = _compute("LANG_ENG_PASSIVE", q)
    assert r is None, (q, r)


# -------------------------------------------------------------- active
@pytest.mark.parametrize("q,expected", [
    ("Change into active voice: The man is bitten by the dog.",
     "The dog bites the man."),
    ("Change into active voice: A poem has been written by her.",
     "She has written a poem."),
    ("Change into active voice: The letter was written by Mohan.",
     "Mohan wrote the letter."),
])
def test_active_conversions(q, expected):
    r = _compute("LANG_ENG_ACTIVE", q)
    assert r is not None, q
    assert r[2] == expected, (q, r[2])


def test_active_agentless_refuses():
    # agentless passive has no by-phrase to promote — honest refusal
    r = _compute("LANG_ENG_ACTIVE",
                 "Change into active voice: The thief was caught "
                 "yesterday.")
    assert r is None or "by" not in r[2]


# --------------------------------------------------------------- tense
@pytest.mark.parametrize("q,expected", [
    ("Change into simple past tense: He writes a letter.",
     "He wrote a letter."),
    ("Change into present continuous tense: She sings a song.",
     "She is singing a song."),
    ("Change into future tense: They played cricket.",
     "They will play cricket."),
    ("Change into present perfect tense: I am reading a book.",
     "I have read a book."),
    ("Change into simple present tense: The sun rose in the east.",
     "The sun rises in the east."),
])
def test_tense_conversion(q, expected):
    r = _compute("LANG_ENG_TENSE", q)
    assert r is not None, q
    assert r[2] == expected, (q, r[2])


def test_tense_unknown_tense_refuses():
    r = _compute("LANG_ENG_TENSE",
                 "Change into future perfect continuous tense: He eats "
                 "mangoes.")
    assert r is None


# -------------------------------------------------------------- speech
@pytest.mark.parametrize("q,expected", [
    ('Change into indirect speech: He said, "I am ill."',
     "He said that he was ill."),
    ('Change into indirect speech: She said to me, "I will help you '
     'tomorrow."',
     "She told me that she would help me the next day."),
    ('Change into indirect speech: The teacher said to the boy, '
     '"Where do you live?"',
     "The teacher asked the boy where he lived."),
    ('Change into indirect speech: The mother said to the son, '
     '"Please bring some milk."',
     "The mother requested the son to bring some milk."),
    ('Change into indirect speech: Ramesh said, "I bought a book '
     'yesterday."',
     "Ramesh said that he had bought a book the previous day."),
    ('Change into indirect speech: Mohan said, "I do not know the '
     'answer."',
     "Mohan said that he did not know the answer."),
    ('Change into indirect speech: He said to me, "Are you going '
     'home?"',
     "He asked me if I was going home."),
])
def test_speech_conversions(q, expected):
    r = _compute("LANG_ENG_SPEECH", q)
    assert r is not None, q
    assert r[2] == expected, (q, r[2])


def test_speech_no_backshift_when_present_reporting():
    r = _compute("LANG_ENG_SPEECH",
                 'Change into indirect speech: He says, "I am busy."')
    assert r is not None
    assert "is" in r[2] and "was" not in r[2].replace("busy", "")


# ----------------------------------------------------------------- POS
def test_pos_sentence_tagging():
    r = _compute("LANG_ENG_POS",
                 "Identify the parts of speech: The quick brown fox "
                 "jumps over the lazy dog.")
    assert r is not None
    tags = dict(re.findall(r"(\w+) \((\w+)\)", r[2])
                ) if (re := __import__("re")) else {}
    assert tags["quick"] == "adjective"
    assert tags["fox"] == "noun"
    assert tags["jumps"] == "verb"
    assert tags["over"] == "preposition"
    assert tags["the"] == "determiner"


def test_pos_honest_refusal_non_sentence():
    r = _compute("LANG_ENG_POS", "Identify the parts of speech.")
    assert r is None


# -------------------------------------------------------- transformation
@pytest.mark.parametrize("q,expected", [
    ("Rewrite using so that: The boy is too weak to walk.",
     "The boy is so weak that he cannot walk."),
    ("Combine using no sooner than: As soon as he arrived, the train "
     "left.",
     "No sooner had he arrived than the train left."),
    ("Combine using no sooner than: As soon as he reached the station, "
     "the train left.",
     "No sooner had he reached the station than the train left."),
    ("Change the degree: Mumbai is bigger than Pune.",
     "Pune is not as big as Mumbai."),
    ("Change the degree: Pune is not as big as Mumbai.",
     "Mumbai is bigger than Pune."),
])
def test_transformations(q, expected):
    r = _compute("LANG_ENG_TRANS", q)
    assert r is not None, q
    assert r[2] == expected, (q, r[2])


# --------------------------------------------------------------- sandhi
@pytest.mark.parametrize("q,expected", [
    ("संधि-विच्छेद कीजिए: विद्यालय",
     "विद्यालय = विद्या + आलय (दीर्घ संधि)।"),
    ("संधि-विच्छेद करके भेद बताइए: स्वागत",
     "स्वागत = सु + आगत (यण संधि)।"),
    ("संधि-विच्छेद कीजिए: हिमालय",
     "हिमालय = हिम + आलय (दीर्घ संधि)।"),
    ("संधि-विच्छेद कीजिए: निर्मल",
     "निर्मल = निः + मल (विसर्ग संधि)।"),
])
def test_sandhi_vichchhed(q, expected):
    r = _compute("LANG_HI_SANDHI", q)
    assert r is not None, q
    assert r[2] == expected, (q, r[2])


def test_sandhi_unknown_word_honest():
    # an out-of-lexicon word must NOT get a fabricated split
    r = _compute("LANG_HI_SANDHI", "संधि-विच्छेद कीजिए: ज़ुज़ुबेप्स")
    assert r is not None
    assert "उपलब्ध नहीं" in r[2]


def test_sandhi_bhed_only():
    r = _compute("LANG_HI_SANDHI", "संधि का भेद बताइए: रजनीश")
    assert r is not None and "दीर्घ संधि" in r[2]


# ---------------------------------------------------------------- samas
@pytest.mark.parametrize("q,frag", [
    ("समास-विग्रह कीजिए: त्रिलोक", "तीनों लोक"),
    ("समास-विग्रह कीजिए: दशानन", "बहुव्रीहि"),
    ("समास-विग्रह कीजिए: माता-पिता", "द्वंद्व"),
    ("समास-विग्रह कीजिए: राजकुमार", "तत्पुरुष"),
    ("समास-विग्रह कीजिए: नीलकमल", "कर्मधारय"),
])
def test_samas_vigraha(q, frag):
    r = _compute("LANG_HI_SAMAS", q)
    assert r is not None, q
    assert frag in r[2], (q, r[2])


def test_samas_bhed_ask():
    r = _compute("LANG_HI_SAMAS", "समास का भेद बताइए: चरणकमल")
    assert r is not None and "तत्पुरुष" in r[2]


def test_samas_unknown_honest():
    r = _compute("LANG_HI_SAMAS", "समास-विग्रह कीजिए: बर्फ़गोला")
    assert r is not None and "उपलब्ध नहीं" in r[2]


# ---------------------------------------------------------------- karak
def test_karak_karma():
    r = _compute("LANG_HI_KARAK", "वाक्य में कारक बताइए: राम को")
    assert r is not None and "कर्म कारक" in r[2]


def test_karak_sambandh():
    r = _compute("LANG_HI_KARAK", "कारक बताइए: राम की किताब")
    assert r is not None and "संबंध कारक" in r[2]


def test_karak_chihna_table():
    r = _compute("LANG_HI_KARAK", "कारक और उनके चिह्न बताइए")
    assert r is not None and "कर्ता" in r[2] and "अधिकरण" in r[2]


# --------------------------------------------------------------- vachan
@pytest.mark.parametrize("q,expected", [
    ("वचन बदलिए: लड़का", "लड़के"),
    ("वचन बदलिए: किताब", "किताबें"),
    ("वचन बदलिए: नदी", "नदियाँ"),
    ("वचन बदलिए: माला", "मालाएँ"),
    ("वचन बदलिए: आदमी", "आदमी"),
])
def test_vachan_plural(q, expected):
    r = _compute("LANG_HI_VACHAN", q)
    assert r is not None, q
    assert expected in r[2], (q, r[2])


# ----------------------------------------------------------------- kaal
@pytest.mark.parametrize("q,frag", [
    ("काल बदलिए: लड़का रोटी खाता है (भूतकाल में)", "खाया"),
    ("वाक्य को भविष्यत्काल में बदलिए: लड़की गीत गाती है", "गाएगी"),
    ("काल बदलिए: लड़के खेल खेलते हैं (भूतकाल में)", "खेले"),
    ("वाक्य को वर्तमानकाल में बदलिए: लड़का पत्र लिखेगा", "लिखता है"),
])
def test_kaal_conversion(q, frag):
    r = _compute("LANG_HI_KAAL", q)
    assert r is not None, q
    assert frag in r[2], (q, r[2])


def test_kaal_unknown_verb_refuses():
    r = _compute("LANG_HI_KAAL", "काल बदलिए: ज़ुज़ुबेप्स राम के पास है "
                 "(भूतकाल में)")
    assert r is None


# ------------------------------------------------- verifier second path
def test_verifiers_registered():
    from backend.its.solver.independent_verifier import VERIFIERS
    for sid in ("LANG_ENG_PASSIVE", "LANG_ENG_ACTIVE", "LANG_ENG_TENSE",
                "LANG_ENG_SPEECH", "LANG_ENG_POS", "LANG_ENG_TRANS",
                "LANG_HI_SANDHI", "LANG_HI_SAMAS", "LANG_HI_KARAK",
                "LANG_HI_VACHAN", "LANG_HI_KAAL"):
        assert sid in VERIFIERS, sid


def test_verifier_passive_catches_active_ship():
    """the second path must FAIL an answer that stayed active"""
    from backend.its.solver.independent_verifier import check_route

    class R:
        quantities = {}
        numeric_answer = None
        final_answer = "The boys fly the kites."

    verdict, _ = check_route("LANG_ENG_PASSIVE",
                             "Change into passive voice: The boys are "
                             "flying kites.", R())
    assert verdict == "fail"


def test_verifier_sandhi_catches_wrong_word():
    from backend.its.solver.independent_verifier import check_route

    class R:
        quantities = {}
        numeric_answer = None
        final_answer = "गुलाब = गुल + आब (दीर्घ संधि)।"

    verdict, _ = check_route("LANG_HI_SANDHI",
                             "संधि-विच्छेद कीजिए: हिमालय", R())
    assert verdict == "fail"


# ------------------------------------- answer() choke point (pipeline)
@pytest.mark.parametrize("q", [
    "Change into passive voice: The dog bites the man.",
    "Change into indirect speech: He said, \"I am ill.\"",
    "संधि-विच्छेद कीजिए: हिमालय",
    "वचन बदलिए: लड़का",
])
def test_answer_pipeline_lang_routes(q):
    from backend.its.solver.answer_pipeline import answer
    r = answer(q, defer_llm=True)
    assert r.answer, q
    assert "VERIFIED" in r.label, (q, r.label)
