"""test_mine_ncert_formats.py -- regression tests for the NCERT exercise
miner's three supported book formats:

1. classic "EXERCISE" / "EXERCISE 1.2" headers with "1." numbered items
2. senior books: "EXERCISES" header with "1.1"-style sub-numbered items
3. 2024+ activity headers ("Figure it Out", "Let Us Try") with "1." items
   AND headerless chapters recovered by the tail-scan fallback
   (answer-key region excluded, modal chapter prefix, longest run)

Each format previously returned 0 questions -- one broken format = the
whole NCERT supply silently vanishing, hence these batteries.

Run:
    cd /d/platform && python -m pytest backend/its/tests/test_mine_ncert_formats.py -q
"""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "tools"))

from mine_ncert import _extract_questions  # noqa: E402


def _mine(text: str) -> list:
    return _extract_questions(text, "maths", 10, "jemh")


# ---- format 1: classic EXERCISE header, plain numbering ----

def test_classic_exercise_format():
    text = (
        "CHAPTER 1\n"
        "Real Numbers\n"
        "1.1 Introduction\n"
        "Some text about Euclid.\n"
        "EXERCISE 1.1\n"
        "1. Express each number as a product of its prime factors:\n"
        "(i) 140 (ii) 156 (iii) 3825\n"
        "2. Find the LCM and HCF of the following pairs of integers.\n"
        "3. Verify that LCM x HCF = product of the two numbers.\n"
        "Summary\n"
        "In this chapter you have studied.\n"
    )
    qs = _mine(text)
    assert len(qs) == 3, qs
    assert "prime factors" in qs[0]["text"]
    assert qs[1]["text"].startswith("Find the LCM")


# ---- format 2: senior EXERCISES header, N.N sub-numbering ----

def test_senior_exercises_format():
    text = (
        "Physics\n"
        "EXERCISES\n"
        "1.1 What is the force between two small charged spheres having\n"
        "charges of 2 x 10-7 C placed 30 cm apart in air?\n"
        "1.2 The electrostatic force on a small sphere of charge 0.4 uC\n"
        "is 0.2 N. What is the distance between the two spheres?\n"
        "1.3 Check that the ratio ke2/G is dimensionless.\n"
    )
    qs = _mine(text)
    assert len(qs) == 3, qs
    assert qs[0]["text"].startswith("What is the force")
    # sub-numbers must not leak into the question text
    assert not qs[1]["text"].startswith("2 ")


# ---- format 3a: 2024+ activity headers ----

def test_figure_it_out_format():
    text = (
        "PATTERNS IN MATHEMATICS\n"
        "1.1 What is Mathematics?\n"
        "Mathematics is the search for patterns.\n"
        " Figure it Out\n"
        "1. Can you think of other examples where mathematics helps us\n"
        "in our everyday lives?\n"
        "2. Can you recognise the pattern in each of the sequences in\n"
        "Table 1? Describe the pattern in your own words.\n"
        "1.2 Patterns in Numbers\n"
        "Number sequences are fascinating.\n"
    )
    qs = _mine(text)
    assert len(qs) == 2, qs
    assert "everyday lives" in qs[0]["text"]
    # the section header "1.2 Patterns in Numbers" must not become a question
    assert all("Patterns in Numbers" not in q["text"][:3] for q in qs)


def test_let_us_try_format():
    text = (
        "Science Chapter\n"
        "Let Us Try\n"
        "1. Measure the length of your desk in handspans. Record it.\n"
        "2. Which unit would you use to measure the distance to Delhi?\n"
    )
    qs = _mine(text)
    assert len(qs) == 2, qs


# ---- format 3b: headerless chapters (tail-scan fallback) ----

def test_headerless_tail_fallback():
    # exercises at the end with NO header at all, followed by an answer key
    body = "Theory text about solutions. " * 10 + "\n"
    exercises = (
        "1.20 A 5% solution of cane sugar has freezing point of 271K.\n"
        "Calculate the freezing point of water.\n"
        "1.21 Two elements A and B form compounds clearly and well.\n"
        "1.22 Calculate the mole fraction of benzene in the vapour phase.\n"
    )
    answers = (
        "Answers to Some Intext Questions\n"
        "1.1 C = 15.28%, Cl = 84.72%\n"
        "1.2 The answer is 2 mol.\n"
    )
    qs = _mine(body + exercises + answers)
    assert len(qs) == 3, qs
    assert "cane sugar" in qs[0]["text"]
    # answer-key items must not leak in
    assert all("84.72" not in q["text"] for q in qs)


def test_headerless_wrapped_continuation_ignored():
    # a wrapped formula line that fake-matches N.N must not break the run
    body = "Filler text. " * 5 + "\n"
    exercises = (
        "1.9 Vapour pressure of pure water at 298 K is 23.8 mm Hg.\n"
        "1.26 g x 0.083 L bar K-1 mol-1 x 300 K\n"
        "1.10 Boiling point of water at 750 mm Hg is 99.63 C.\n"
        "1.11 How much sucrose is to be added to 500 g of water?\n"
    )
    qs = _mine(body + exercises)
    texts = [q["text"] for q in qs]
    assert any("Vapour pressure" in t for t in texts), texts
    # the fake 1.26 item must not swallow 1.9/1.10
    assert not any(t.startswith("g x 0.083") for t in texts), texts


def test_short_titles_dropped():
    text = (
        "EXERCISES\n"
        "1.1 Fibonaccis Numbers\n"
        "1.2 What is the force between two charges of 2 C placed apart?\n"
    )
    qs = _mine(text)
    assert len(qs) == 1, qs
    assert "force between two charges" in qs[0]["text"]


def test_garbage_produces_nothing():
    assert _mine("random prose without any exercise structure at all") == []


# ====================================================================
# RECOVERY PASS (senior classes 9-12).  The primary pass above runs
# untouched; everything below exercises the second pass that only runs
# when the primary pass returns ZERO questions.  Texts are derived from
# real empty files in text_cache (leec102/205, kehp101, kebo111,
# kecs107, keac202, jesc101, kepy104, jeff103, iess403, jewe202).
# ====================================================================

from mine_ncert import _repair_text  # noqa: E402


# ---- repair rule: doubled/reversed side-tab artifacts ----

def test_repair_pass_preserves_clean_text_and_fixes_artifacts():
    # legit runs of 2 and 3 must survive (lamb, cross, roman "(iii)")
    assert _repair_text("a bell, a cross and (iii) an item") == \
        "a bell, a cross and (iii) an item"
    # real numbers pass through untouched
    assert _repair_text("Rs 1000 and 111") == "Rs 1000 and 111"
    # 2x-doubled furniture letters (CChhaapptteerr) are not touched
    assert "CChhaapptteerr" in _repair_text("CChhaapptteerr 11")
    # 5x letter runs collapse to one (kepy104 side tab)
    assert _repair_text("RRRRReeeeevvvvviiiiieeeeewwwww") == "Review"
    # digits only collapse when every run has the same length >= 3
    assert _repair_text("FFFFFiiiiiggggguuuuurrrrreeeee 11111.....22222") \
        == "Figure 1.2"
    assert _repair_text("11111.....1111100000") == "1.10"
    # whole-line reversed keywords un-reverse (leec205 side tabs)
    assert _repair_text("ssssseeeeesssssiiiiicccccrrrrreeeeexxxxxEEEEE") \
        == "Exercises"
    assert _repair_text("yyyyyrrrrraaaaammmmmmmmmmuuuuuSSSSS") == "Summary"
    # split "E / XERCISES" header joins (kebo111)
    assert _repair_text("E\nXERCISES\n1. Question one?") == \
        "EXERCISES\n1. Question one?"
    # a standalone fill-in blank line re-joins its question (jewe202)
    assert _repair_text("Q.1. The occasion here is\n________________.\n") \
        == "Q.1. The occasion here is ________________.\n"


def test_doubled_reversed_review_questions_header():
    # kepy104: "RRRRReeeeevvvvviiiiieeeeewwwww
    # QQQQQuuuuueeeeessssstttttiiiiiooooonnnnnsssss" hides a real header
    text = (
        "Some psychology prose about attention and perception. " * 5 + "\n"
        "RRRRReeeeevvvvviiiiieeeeewwwww "
        "QQQQQuuuuueeeeessssstttttiiiiiooooonnnnnsssss\n"
        "1. Explain the functional limitations of sense organs.\n"
        "2. Define attention. Explain its properties.\n"
        "3. Why do illusions occur?\n"
    )
    qs = _mine(text)
    assert len(qs) == 3, qs
    assert qs[0]["text"].startswith("Explain the functional")
    assert "Review Questions" not in qs[0]["text"]


def test_side_tab_exercise_after_questions_bullets_excluded():
    # leec205: the artifacted Summary lands before the questions, the
    # reversed "Exercises" side tab lands AFTER them, and summary
    # bullets follow.  Zero-space numbering ("1.Explain").
    text = (
        "yyyyyrrrrraaaaammmmmmmmmmuuuuuSSSSS\n"
        "yeK stpecnoC\n"
        "1.Explain market equilibrium.\n"
        "2.When do we say there is excess demand for a commodity in the "
        "market?\n"
        "3.When do we say there is excess supply for a commodity in the "
        "market?\n"
        "4.What will happen if the price prevailing in the market is\n"
        "above the equilibrium price?\n"
        "ssssseeeeesssssiiiiicccccrrrrreeeeexxxxxEEEEE\n"
        "With demand curve remaining unchanged when supply curve shifts\n"
        "rightward, the equilibrium quantity increases.\n"
    )
    qs = _mine(text)
    assert len(qs) == 4, qs
    assert qs[0]["text"].startswith("Explain market equilibrium.")
    assert all("equilibrium quantity increases" not in q["text"]
               for q in qs)


# ---- repair rule: header split across lines ----

def test_split_e_xercises_header_recovers_bio_questions():
    # kebo111: "E" and "XERCISES" on separate lines
    text = (
        "Photosynthesis prose about the light reaction. " * 6 + "\n"
        "E\nXERCISES\n"
        "1. By looking at a plant externally, can you tell whether a "
        "plant is C3 or C4? Why and how?\n"
        "2. By looking at which internal structure of a plant you can "
        "tell whether a plant is C3 or C4? Explain.\n"
        "3. Even though a very few cells in a C4 plant carry out the "
        "biosynthetic pathway, yet they are highly productive. Can you "
        "discuss why?\n"
    )
    qs = _mine(text)
    assert len(qs) == 3, qs
    assert "plant externally" in qs[0]["text"]


# ---- headerless exercise blocks (plain "N." numbered runs) ----

def test_headerless_plain_number_run_with_readings_cut():
    # jesc101/leec102: exercises have NO header; a "Suggested Readings"
    # numbered reference list must not sweep in behind them
    body = "Theory about chemical reactions. " * 8 + "\n"
    exercises = (
        "1. Why should a magnesium ribbon be cleaned before burning in "
        "air?\n"
        "2. Write the balanced equation for the following chemical "
        "reaction. NaCl + AgNO3 gives AgCl + NaNO3.\n"
        "3. Why is respiration considered an exothermic reaction? "
        "Explain.\n"
    )
    readings = (
        "Suggested Readings\n"
        "1. A reference book on chemistry, 1990.\n"
        "2. Another chemical reference, Macmillan India Limited.\n"
    )
    qs = _mine(body + exercises + readings)
    assert len(qs) == 3, qs
    assert "magnesium ribbon" in qs[0]["text"]
    assert all("reference book" not in q["text"] for q in qs)
    assert all("Macmillan" not in q["text"] for q in qs)


# ---- extended exercise headers ----

def test_assessment_answer_type_sections():
    # kehp101: "I. Long Answer Questions" / "II. Short Answer
    # Questions" / "IV. State whether True or False"; numbering restarts
    text = (
        "ssessMent\n"
        "I. Long Answer Questions\n"
        "1. Define physical education and discuss the importance of\n"
        "physical education in daily life.\n"
        "2. What are the main objectives of physical education? Explain\n"
        "any four in detail.\n"
        "3. What are the misconceptions about physical education and\n"
        "sports?\n"
        "II. Short Answer Questions\n"
        "1. Define recreation.\n"
        "2. What do you understand by the term 'Drill'?\n"
        "3. Write the names of apparatus used in Gymnastics.\n"
        "IV. State whether True or False\n"
        "1. The concept of physical education is new.\n"
        "2. In modern times Physical Education is one of the most "
        "exciting and dynamic subjects in its history.\n"
    )
    qs = _mine(text)
    # the true/false statements (prose, no task markers) stay out
    assert len(qs) == 6, qs
    assert qs[3]["text"].startswith("Define recreation.")
    assert all("physical education is new" not in q["text"] for q in qs)


def test_notes_activity_and_lab_exercise_headers():
    # kecs107: "notes exercIse", "actIVIty-based QuestIons notes",
    # "SuggeSted Lab. exerciSeS"
    text = (
        "notes exercIse\n"
        "1. Observe the following programs carefully, and identify the\n"
        "error: def create (text, freq): for i in range (1, freq).\n"
        "2. How is math.ceil(89.7) different from math.floor (89.7)?\n"
        "3. Out of random() and randint(), which function should we use\n"
        "to generate random numbers between 1 and 5. Justify.\n"
        "actIVIty-based QuestIons notes\n"
        "1. To secure your account, use your programming expertise to\n"
        "create a program using user defined function named login.\n"
        "2. XYZ store plans to give festival discount to its customers.\n"
        "Create a program using user defined function that accepts the\n"
        "shopping amount as a parameter and calculates discount.\n"
        "SuggeSted Lab. exerciSeS\n"
        "1. Write a program to check the divisibility of a number by 7\n"
        "that is passed as a parameter.\n"
        "2. Write a program that uses a user defined function that\n"
        "accepts name and gender and prefixes Mr/Ms on that basis.\n"
    )
    qs = _mine(text)
    assert len(qs) == 7, qs
    assert qs[3]["text"].startswith("To secure your account")
    assert qs[5]["text"].startswith("Write a program")


def test_test_your_understanding_header_mcq_block():
    # keac202: "Test Your Understanding" followed by "Tick the correct
    # answer :" instruction and MCQs with (a)-(d) options
    text = (
        "Test Your Understanding\n"
        "Tick the correct answer :\n"
        "1. Rahul's trial balance provide you the following information\n"
        ": Debtors ` 80,000 Bad debts ` 2,000 Provision for doubtful\n"
        "debts ` 4,000. State the amount to be debited in the profit\n"
        "and loss account.\n"
        "(a) ` 5,000 (Debit) (b) ` 3,000 (Debit)\n"
        "(c) ` 1,000 (Credit) (d) none of these.\n"
        "2. If the rent of one month is still to be paid the adjustment\n"
        "entry will be : (a) Debit outstanding rent account and Credit\n"
        "rent account (b) Debit profit and loss account.\n"
        "3. If the rent received in advance ` 2,000. The adjustment\n"
        "entry will be : (a) Debit profit and loss account (b) Debit\n"
        "rent account.\n"
    )
    qs = _mine(text)
    assert len(qs) == 3, qs
    assert qs[0]["text"].startswith("Rahul's trial balance")
    # the bare instruction line is junk-guarded away
    assert all(q["text"] != "Tick the correct answer :" for q in qs)


# ---- precision guards ----

def test_task_filter_blocks_prose_fragments():
    # iess403-style option mashups and iemh104-style identity fragments
    # must not become questions
    text = (
        "2.1 Some Institutions in Action\n"
        "It is necessary to keep the voters list up to date because\n"
        "Some constituencies are reserved so that everyone has a vote.\n"
        "(x - y)(x2 + xy + y2)\n"
        "Let us take another example. The salaries for the month of\n"
        "March were paid in cash to the workers of the mill.\n"
    )
    assert _mine(text) == []


def test_glossary_does_not_hijack_exercise_run():
    # leec102: a numbered key-concepts glossary precedes the real
    # exercise; the later-preferred LIS chain must pick the exercise
    glossary = (
        "1. Gross Domestic Product is the market value of all the final\n"
        "goods and services produced within the domestic territory.\n"
        "2. Net Domestic Product is the net market value of all the\n"
        "final goods and services produced inside the territory.\n"
        "3. Gross National Product is the market value of all the final\n"
        "goods and services produced by the residents of a country.\n"
        "4. Net National Product is the net market value of all the\n"
        "final goods and services produced by the normal residents.\n"
        "5. Personal Disposable Income is the income left with the\n"
        "households after taxes and retained earnings of firms.\n"
    )
    filler = "Concepts of national income accounting. \n" * 35
    exercises = (
        "1. What are the four factors of production and what are the\n"
        "remunerations to each of these called?\n"
        "2. Why should the aggregate final expenditure of an economy be\n"
        "equal to the aggregate factor payments? Explain.\n"
        "3. Distinguish between stock and flow. Between net investment\n"
        "and capital which is a stock and which is a flow?\n"
        "4. What is the difference between planned and unplanned\n"
        "inventory accumulation? Write down the relation between\n"
        "change in inventories and value added of a firm.\n"
        "5. Write down the three identities of calculating the GDP of\n"
        "a country by the three methods.\n"
        "6. Define budget deficit and trade deficit. What was the\n"
        "volume of trade deficit of that country?\n"
        "Suggested Readings\n"
    )
    qs = _mine(glossary + filler + exercises)
    assert len(qs) == 6, qs
    assert all("market value" not in q["text"] for q in qs)
    assert qs[0]["text"].startswith("What are the four factors")


def test_q_prefix_numbering():
    # jewe202: "Q.1." numbering with blank lines and options
    text = (
        "Complete the sentences given below by choosing the\n"
        "most appropriate word or phrase.\n"
        "Q.1. The occasion of the speech of Sardar Patel here is\n"
        "____________________________________________________.\n"
        "(a) an address to a public gathering\n"
        "(b) a convocation address at a university\n"
        "Q.2. Patel feels that future generations will heap curses\n"
        "on us if ____________________________________________.\n"
        "(a) we fail to protect our freedom\n"
        "Q.3. The first and foremost thing Patel stressed to be\n"
        "done is _____________________________________________.\n"
        "(a) to make the country strong and united\n"
    )
    qs = _mine(text)
    assert len(qs) == 3, qs
    assert "The occasion of the speech" in qs[0]["text"]
    assert "heap curses" in qs[1]["text"]
    assert all("convocation" not in q["text"].split("(a)")[0]
               for q in qs)
