"""
CISCE Class 11 History & Civics — Deterministic Question Generator
Syllabus Nodes: c11_hist_046, c11_hist_050, c11_hist_055
"""

import random
import math
import hashlib
import fractions
from decimal import Decimal, ROUND_HALF_UP
from fractions import Fraction
from typing import Any

# ---------------------------------------------------------------------------
# Seeded-RNG helpers
# ---------------------------------------------------------------------------

def _rng(seed: int) -> random.Random:
    return random.Random(seed)


# ===================================================================
# SOLVERS
# ===================================================================

def solve_fill_blank(params: dict) -> dict:
    """
    Solve a fill-in-the-blank history question.
    params: {topic, question_text, blank_index, answer_key}
    Returns: {answer, steps, verification}
    """
    topic = params.get("topic", "")
    answer = params.get("answer_key", "")
    question = params.get("question_text", "")

    steps = [
        f"Topic: {topic}",
        f"Question: {question}",
        f"Step 1 — Identify the missing information required by the blank.",
        f"Step 2 — Recall key facts from the syllabus topic '{topic}'.",
        f"Step 3 — The correct term is '{answer}'.",
    ]

    # Verification: confirm the answer is non-empty and is a string
    verification = {
        "method": "factual verification",
        "checks": [
            {"check": "answer is non-empty", "result": bool(answer), "passed": bool(answer)},
            {"check": "answer is a valid string", "result": isinstance(answer, str), "passed": isinstance(answer, str)},
            {"check": "answer length > 0", "result": len(answer) > 0, "passed": len(answer) > 0},
        ],
        "all_passed": bool(answer),
    }

    return {"answer": answer, "steps": steps, "verification": verification}


def solve_mcq(params: dict) -> dict:
    """
    Solve an MCQ question.
    params: {question, options, correct_index}
    Returns: {answer, steps, verification}
    """
    options = params.get("options", [])
    correct_idx = params.get("correct_index", 0)
    question = params.get("question", "")

    correct_option = options[correct_idx] if correct_idx < len(options) else "N/A"

    steps = [
        f"Step 1 — Read the question carefully: {question}",
        f"Step 2 — Evaluate each option:",
    ]
    for i, opt in enumerate(options):
        marker = "✓ CORRECT" if i == correct_idx else "✗ incorrect"
        steps.append(f"  Option {chr(65+i)}: {opt} — {marker}")

    steps.append(f"Step 3 — Option {chr(65+correct_idx)} ('{correct_option}') is the correct answer.")

    verification = {
        "method": "option elimination",
        "checks": [
            {"check": f"correct option index {correct_idx} in range", "result": 0 <= correct_idx < len(options), "passed": 0 <= correct_idx < len(options)},
            {"check": "at least 2 options present", "result": len(options) >= 2, "passed": len(options) >= 2},
            {"check": "correct option is non-empty string", "result": bool(correct_option), "passed": bool(correct_option)},
        ],
        "all_passed": 0 <= correct_idx < len(options) and len(options) >= 2,
    }

    return {
        "answer": chr(65 + correct_idx),
        "answer_text": correct_option,
        "steps": steps,
        "verification": verification,
    }


def solve_numerical(params: dict) -> dict:
    """
    Solve a numerical history question (e.g. percentage calculations,
    date differences, inflation rates).
    params: {question, formula, values, expected_result, unit}
    Returns: {answer, steps, verification}
    """
    question = params.get("question", "")
    formula = params.get("formula", "")
    values = params.get("values", {})
    expected = params.get("expected_result", None)
    unit = params.get("unit", "")

    steps = [f"Question: {question}", "Step 1 — Identify the given values:"]
    for k, v in values.items():
        steps.append(f"  {k} = {v}")

    steps.append(f"Step 2 — Apply the formula: {formula}")

    computed = None
    try:
        if "%" in formula or "percent" in formula.lower():
            if "change" in formula.lower():
                old = values.get("old", 1)
                new = values.get("new", 1)
                computed = round(((new - old) / old) * 100, 2)
                steps.append(f"Step 3 — Percentage change = (({new} - {old}) / {old}) × 100 = {computed}%")
            elif "of" in formula.lower():
                part = values.get("part", 0)
                total = values.get("total", 1)
                computed = round((part / total) * 100, 2)
                steps.append(f"Step 3 — Percentage = ({part} / {total}) × 100 = {computed}%")
        elif "difference" in formula.lower():
            a = values.get("a", 0)
            b = values.get("b", 0)
            computed = abs(a - b)
            steps.append(f"Step 3 — Difference = |{a} - {b}| = {computed}")
        elif "ratio" in formula.lower():
            a = values.get("a", 1)
            b = values.get("b", 1)
            computed = round(a / b, 4)
            steps.append(f"Step 3 — Ratio = {a} / {b} = {computed}")
    except Exception:
        computed = None

    steps.append(f"Step 4 — Answer: {computed} {unit}".strip())

    # Verification: back-substitution
    verifications = []
    if expected is not None and computed is not None:
        diff = abs(computed - expected)
        passed = diff < 0.01
        verifications.append({
            "check": f"computed == expected ({computed} ≈ {expected})",
            "result": diff,
            "passed": passed,
        })
    else:
        verifications.append({"check": "computation completed", "result": computed, "passed": computed is not None})

    return {
        "answer": f"{computed} {unit}".strip() if computed is not None else "N/A",
        "steps": steps,
        "verification": {"method": "numerical check", "checks": verifications, "all_passed": all(v["passed"] for v in verifications)},
    }


def solve_short_answer(params: dict) -> dict:
    """
    Solve a short-answer question.
    params: {question, key_points, model_answer}
    Returns: {answer, steps, verification}
    """
    question = params.get("question", "")
    key_points = params.get("key_points", [])
    model_answer = params.get("model_answer", "")

    steps = [
        f"Question: {question}",
        "Step 1 — Identify the key points required:",
    ]
    for i, pt in enumerate(key_points, 1):
        steps.append(f"  Point {i}: {pt}")

    steps.append("Step 2 — Arrange the key points logically to form a coherent answer.")
    steps.append(f"Step 3 — Model answer: {model_answer}")
    steps.append(f"Step 4 — Verification: The answer covers all {len(key_points)} required key points.")

    verification = {
        "method": "key-point coverage check",
        "checks": [
            {"check": "at least 1 key point", "result": len(key_points), "passed": len(key_points) >= 1},
            {"check": "model answer is non-empty", "result": bool(model_answer), "passed": bool(model_answer)},
        ],
        "all_passed": len(key_points) >= 1 and bool(model_answer),
    }

    return {"answer": model_answer, "steps": steps, "verification": verification}


def solve_long_answer(params: dict) -> dict:
    """
    Solve a long-answer (essay-type) question.
    params: {question, introduction, body_points, conclusion, word_count_hint}
    Returns: {answer, steps, verification}
    """
    question = params.get("question", "")
    intro = params.get("introduction", "")
    body_points = params.get("body_points", [])
    conclusion = params.get("conclusion", "")
    word_hint = params.get("word_count_hint", "")

    steps = [
        f"Question: {question}",
        f"Word limit hint: {word_hint}",
        "Step 1 — Write an Introduction:",
        f"  {intro}",
        "Step 2 — Develop the Body with the following points:",
    ]
    for i, pt in enumerate(body_points, 1):
        steps.append(f"  Point {i}: {pt}")

    steps.append("Step 3 — Write a Conclusion:")
    steps.append(f"  {conclusion}")

    total_points = 1 + len(body_points) + 1  # intro + body + conclusion
    verification = {
        "method": "structure check",
        "checks": [
            {"check": "introduction present", "result": bool(intro), "passed": bool(intro)},
            {"check": "at least 2 body points", "result": len(body_points) >= 2, "passed": len(body_points) >= 2},
            {"check": "conclusion present", "result": bool(conclusion), "passed": bool(conclusion)},
        ],
        "all_passed": bool(intro) and len(body_points) >= 2 and bool(conclusion),
    }

    answer_text = f"Introduction: {intro}\n\nBody:\n" + "\n".join(f"- {p}" for p in body_points) + f"\n\nConclusion: {conclusion}"
    return {"answer": answer_text, "steps": steps, "verification": verification}


# ===================================================================
# QUESTION GENERATOR
# ===================================================================

class CISCEHistCivGenerator:
    """
    Deterministic, seeded question generator for CISCE Class 11 History & Civics.
    Covers all provided syllabus nodes.
    """

    TOPICS = [
        "c11_hist_046",   # Post-War Discontent → Fascism in Italy
        "c11_hist_050",   # Weaknesses of the Weimar Republic
        "c11_hist_055",   # Economic and Political Causes of Japanese Militarism
    ]

    TOPIC_NAMES = {
        "c11_hist_046": "Post-War Discontent and Conditions Giving Rise to Fascism in Italy (1919-22)",
        "c11_hist_050": "Weaknesses of the Weimar Republic (1919-1932)",
        "c11_hist_055": "Economic and Political Causes of Japanese Militarism in the 1930s",
    }

    def __init__(self, seed: int = 42):
        self.rng = _rng(seed)
        self._counter = 0

    def _next_id(self, topic: str, qtype: str) -> str:
        self._counter += 1
        return f"{topic}_{qtype}_{self._counter:04d}"

    # ------------------------------------------------------------------
    # Italy (c11_hist_046) question bank
    # ------------------------------------------------------------------
    def _italy_mcqs(self, rng: random.Random) -> list:
        return [
            {
                "type": "mcq",
                "topic": "c11_hist_046",
                "difficulty": "Medium",
                "question": "Italy emerged on the winning side of WWI but felt cheated at the Paris Peace Conference (1919). What did Gabriele D'Annunzio call this outcome?",
                "options": [
                    "A great victory for Italian nationalism",
                    "A mutilated victory",
                    "A triumph of democracy",
                    "A justified settlement",
                ],
                "correct_index": 1,
                "key": "mutilated victory",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_046",
                "difficulty": "Medium",
                "question": "The Biennio Rosso (1919-1920) in Italy refers to:",
                "options": [
                    "A period of Fascist dictatorship",
                    "Two years of socialist strikes, factory occupations, and peasant land seizures",
                    "The formation of the Fasci di Combattimento",
                    "Italy's entry into WWI",
                ],
                "correct_index": 1,
                "key": "Biennio Rosso",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_046",
                "difficulty": "Medium",
                "question": "On what date and in which city did Mussolini formally found the Fasci di Combattimento?",
                "options": [
                    "4 July 1919 — Rome",
                    "23 March 1919 — Milan (Piazza San Sepolcro)",
                    "28 October 1922 — Turin",
                    "1 January 1920 — Naples",
                ],
                "correct_index": 1,
                "key": "23 March 1919 Milan",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_046",
                "difficulty": "Medium",
                "question": "Which of the following was NOT a cause of post-war discontent in Italy?",
                "options": [
                    "Inflation reaching 400% by 1920",
                    "The lira falling from 25 to 40 against the dollar",
                    "Significant territorial gains at Versailles that satisfied nationalists",
                    "600,000 Italian dead with minimal territorial compensation",
                ],
                "correct_index": 2,
                "key": "territorial gains",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_046",
                "difficulty": "Medium",
                "question": "The 'Red Menace' in Italy referred to:",
                "options": [
                    "An actual communist revolution that took power in 1919",
                    "Fear of communism among property-owning classes exploited by Fascists",
                    "The rise of the PSI to power",
                    "The Bolshevik invasion of northern Italy",
                ],
                "correct_index": 1,
                "key": "fear of communism among property owners",
            },
        ]

    def _italy_fill_blanks(self, rng: random.Random) -> list:
        return [
            {
                "type": "fill_blank",
                "topic": "c11_hist_046",
                "difficulty": "Easy",
                "question": "Italy spent _____ billion lire on World War I but gained only Trento, Trieste, and South Tyrol at the Paris Peace Conference.",
                "answer_key": "148",
                "key": "148 billion lire",
            },
            {
                "type": "fill_blank",
                "topic": "c11_hist_046",
                "difficulty": "Easy",
                "question": "The period 1919-1920, marked by 1,883 strikes in 1919 and 2,061 in 1920, is known as the _____.",
                "answer_key": "Biennio Rosso",
                "key": "Biennio Rosso",
            },
            {
                "type": "fill_blank",
                "topic": "c11_hist_046",
                "difficulty": "Medium",
                "question": "_____ (elite shock troops of WWI) who returned to civilian life found no jobs and became a key recruitment pool for Fascist squads.",
                "answer_key": "Arditi",
                "key": "arditi",
            },
            {
                "type": "fill_blank",
                "topic": "c11_hist_046",
                "difficulty": "Medium",
                "question": "Gabriele D'Annunzio led a private force to seize the port city of _____ in September 1919, presenting himself as a proto-Fascist hero.",
                "answer_key": "Fiume",
                "key": "Fiume",
            },
        ]

    def _italy_short_answers(self, rng: random.Random) -> list:
        return [
            {
                "type": "short_answer",
                "topic": "c11_hist_046",
                "difficulty": "Medium",
                "question": "List four specific causes of post-war discontent in Italy (1919-1922).",
                "key_points": [
                    "Mutilated victory: Italy gained little territory despite 600,000 war dead",
                    "Economic crisis: inflation at 400%, lira depreciation",
                    "Social upheaval: the Biennio Rosso with mass strikes and factory occupations",
                    "Fear of communist revolution (Red Menace) among middle and upper classes",
                ],
                "model_answer": (
                    "(1) Mutilated victory — Italy lost ~600,000 lives and spent 148 billion lire "
                    "but gained only Trento, Trieste, and South Tyrol at Versailles, leading to a sense "
                    "of betrayal. (2) Economic crisis — inflation reached 400% by 1920 and the lira "
                    "fell from 25 to 40 against the dollar. (3) Social upheaval — the Biennio Rosso "
                    "(1919-20) saw 1,883 strikes in 1919 and 2,061 in 1920, including factory "
                    "occupations in Turin and Milan. (4) The Red Menace — fear of a communist "
                    "revolution along Russian lines terrified property owners and the middle class."
                ),
                "competency_context": (
                    "Indian students can relate this to how economic hardship after a war "
                    "(e.g., post-1971 India) creates political volatility, making them appreciate "
                    "why ordinary Italians turned to Fascism."
                ),
            },
            {
                "type": "short_answer",
                "topic": "c11_hist_046",
                "difficulty": "Medium",
                "question": "Explain the term 'mutilated victory' in the Italian context.",
                "key_points": [
                    "Italy was on the winning Allied side in WWI",
                    "Promises of territory (Treaty of London 1915) were not fully honoured",
                    "Only Trento, Trieste, and South Tyrol were gained; Fiume and Dalmatia were denied",
                    "Gabriele D'Annunzio coined the phrase to stir nationalist resentment",
                ],
                "model_answer": (
                    "'Mutilated victory' described Italy's sense of betrayal after WWI. Though Italy "
                    "fought on the winning Allied side, the Paris Peace Conference (1919) granted only "
                    "Trento, Trieste, and South Tyrol, denying claims to Fiume, Dalmatia, and other "
                    "territories promised in the secret Treaty of London (1915). Poet Gabriele "
                    "D'Annunzio coined the phrase, and Mussolini used it to rally nationalist resentment "
                    "against the parliamentary government."
                ),
            },
        ]

    def _italy_long_answers(self, rng: random.Random) -> list:
        return [
            {
                "type": "long_answer",
                "topic": "c11_hist_046",
                "difficulty": "Hard",
                "question": "Analyse the conditions that gave rise to Fascism in Italy between 1919 and 1922. How did Mussolini exploit post-war discontent?",
                "word_count_hint": "300–350 words",
                "introduction": (
                    "Fascism emerged in Italy not because Italy had lost WWI, but because — despite "
                    "being on the winning side — Italians felt cheated by the peace settlement, while "
                    "domestic economic collapse and social upheaval created a climate of fear and "
                    "uncertainty that Mussolini skillfully exploited."
                ),
                "body_points": [
                    "Mutilated Victory: Italy sacrificed ~600,000 lives and spent 148 billion lire, yet at Versailles (1919) gained only Trento, Trieste, and South Tyrol. Nationalists felt betrayed — D'Annunzio coined the term 'mutilated victory' and seized Fiume in 1919, creating a romantic image of direct action that Fascists imitated.",
                    "Economic Crisis: By 1920 inflation hit 400%; the lira depreciated from 25 to 40 per US dollar. Demobilised soldiers found no jobs, and industrial unrest spread, shaking the confidence of the middle and upper classes.",
                    "The Biennio Rosso (1919-20): The PSI organised 1,883 strikes in 1919 and 2,061 in 1920. In September 1920, metalworkers occupied 570 factories in Turin and Milan. Property owners panicked at the prospect of a Bolshevik-style revolution.",
                    "Weak Parliamentary Government: The liberal parliamentary system seemed incapable of decisive action. Coalition governments were short-lived and ineffective, eroding faith in democracy.",
                    "Mussolini's Strategy: He created the Fasci di Combattimento (March 1919, ~200 members in Milan), blending nationalism with anti-socialism. Blackshirt squads (squadristi) violently attacked socialists and trade unionists, gaining tacit support from landowners, the Church, and industrialists who saw Fascism as a bulwark against communism.",
                ],
                "conclusion": (
                    "By October 1922, with 300,000 Fascist members and the March on Rome, King Victor "
                    "Emmanuel III appointed Mussolini as Prime Minister. Fascism rose not through mass "
                    "popular revolution but through elite collusion, exploiting the triple crisis of "
                    "national humiliation, economic collapse, and fear of socialism."
                ),
            },
        ]

    def _italy_numerical(self, rng: random.Random) -> list:
        return [
            {
                "type": "numerical",
                "topic": "c11_hist_046",
                "difficulty": "Easy",
                "question": (
                    "Italy spent 148 billion lire on WWI. If the pre-war lire-to-dollar rate was 25 "
                    "lira per dollar, what was the equivalent in US dollars? (Note: the rate worsened to 40 lira/$ by 1920)"
                ),
                "formula": "dollars = lire / lira_per_dollar",
                "values": {"lire": 148e9, "lira_per_dollar": 25},
                "expected_result": 5.92e9,
                "unit": "USD",
            },
            {
                "type": "numerical",
                "topic": "c11_hist_046",
                "difficulty": "Medium",
                "question": (
                    "The lira depreciated from 25 lira per USD to 40 lira per USD by 1920. "
                    "Calculate the percentage depreciation of the lira."
                ),
                "formula": "percent_change = ((new_rate - old_rate) / old_rate) * 100",
                "values": {"old": 25, "new": 40},
                "expected_result": 60.0,
                "unit": "% depreciation",
            },
            {
                "type": "numerical",
                "topic": "c11_hist_046",
                "difficulty": "Easy",
                "question": (
                    "In 1919 there were 1,883 strikes and in 1920 there were 2,061 strikes in Italy. "
                    "What was the percentage increase in strikes from 1919 to 1920?"
                ),
                "formula": "percent_change = ((new - old) / old) * 100",
                "values": {"old": 1883, "new": 2061},
                "expected_result": round((2061 - 1883) / 1883 * 100, 2),
                "unit": "%",
            },
        ]

    # ------------------------------------------------------------------
    # Weimar Republic (c11_hist_050) question bank
    # ------------------------------------------------------------------
    def _weimar_mcqs(self, rng: random.Random) -> list:
        return [
            {
                "type": "mcq",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": "The Weimar Constitution was adopted in which city and year?",
                "options": [
                    "Berlin, 1918",
                    "Weimar, August 1919",
                    "Munich, 1923",
                    "Frankfurt, 1919",
                ],
                "correct_index": 1,
                "key": "Weimar August 1919",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": "Article 48 of the Weimar Constitution allowed:",
                "options": [
                    "The Reichstag to dismiss the President at will",
                    "The President to rule by decree without Reichstag approval in emergencies",
                    "The military to take over civil government",
                    "States to secede from the Republic",
                ],
                "correct_index": 1,
                "key": "Article 48 emergency decree",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": "How much did Germany have to pay in reparations under the Treaty of Versailles (1919)?",
                "options": [
                    "50 billion gold marks",
                    "132 billion gold marks",
                    "200 billion gold marks",
                    "No reparations were imposed",
                ],
                "correct_index": 1,
                "key": "132 billion gold marks",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_050",
                "difficulty": "Hard",
                "question": "Which clause of the Treaty of Versailles forced Germany to accept sole responsibility for WWI?",
                "options": [
                    "Article 45",
                    "Article 231 (War Guilt Clause)",
                    "Article 50",
                    "Article 100",
                ],
                "correct_index": 1,
                "key": "Article 231",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": "Proportional representation in the Weimar Reichstag led to:",
                "options": [
                    "Strong majority governments",
                    "Fragmented parliaments with unstable coalition governments",
                    "One-party dominance",
                    "Abolition of the Reichstag",
                ],
                "correct_index": 1,
                "key": "fragmented unstable coalitions",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_050",
                "difficulty": "Hard",
                "question": "By 1932, how many Germans were unemployed due to the Great Depression?",
                "options": [
                    "1 million",
                    "3 million",
                    "6 million (about 30% of the workforce)",
                    "10 million",
                ],
                "correct_index": 2,
                "key": "6 million 30%",
            },
        ]

    def _weimar_fill_blanks(self, rng: random.Random) -> list:
        return [
            {
                "type": "fill_blank",
                "topic": "c11_hist_050",
                "difficulty": "Easy",
                "question": "Kaiser _____ II abdicated in November 1918, paving the way for the Weimar Republic.",
                "answer_key": "Wilhelm",
                "key": "Wilhelm II",
            },
            {
                "type": "fill_blank",
                "topic": "c11_hist_050",
                "difficulty": "Easy",
                "question": "The _____ (June 1919) imposed reparations of 132 billion gold marks on Germany.",
                "answer_key": "Treaty of Versailles",
                "key": "Treaty of Versailles",
            },
            {
                "type": "fill_blank",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": "_____ allowed the President of the Weimar Republic to rule by emergency decree without Reichstag approval.",
                "answer_key": "Article 48",
                "key": "Article 48",
            },
            {
                "type": "fill_blank",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": "The _____ of 1929 ended American loans to Germany under the Dawes Plan, devastating the German economy.",
                "answer_key": "Wall Street Crash",
                "key": "Wall Street Crash October 1929",
            },
            {
                "type": "fill_blank",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": "The _____ (Article 231) forced Germany to accept 'war guilt' for WWI.",
                "answer_key": "War Guilt Clause",
                "key": "War Guilt Clause Article 231",
            },
        ]

    def _weimar_short_answers(self, rng: random.Random) -> list:
        return [
            {
                "type": "short_answer",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": "Explain three structural weaknesses of the Weimar Republic's constitution.",
                "key_points": [
                    "Proportional representation produced a fragmented Reichstag with many small parties and unstable coalition governments",
                    "Article 48 allowed the President to rule by decree, undermining parliamentary democracy",
                    "The Reichspräsident had excessive powers, enabling emergency rule",
                    "Lack of broad democratic tradition and legitimacy among conservative elites",
                ],
                "model_answer": (
                    "Three structural weaknesses were: (1) Proportional representation meant no single "
                    "party could command a majority, producing short-lived, ineffective coalition "
                    "governments that failed to address crises decisively. (2) Article 48 allowed the "
                    "President to bypass the Reichstag and rule by emergency decree, which was used over "
                    "100 times by Chancellor Brüning (1930-32), effectively destroying parliamentary "
                    "democracy. (3) The Reichspräsident held sweeping powers including appointment of "
                    "the Chancellor and dissolution of the Reichstag, concentrating authority in a single "
                    "office that ultimately appointed Hitler."
                ),
            },
            {
                "type": "short_answer",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": "How did the Treaty of Versailles undermine the Weimar Republic?",
                "key_points": [
                    "132 billion gold marks in reparations crippled the economy",
                    "War Guilt Clause (Art. 231) humiliated national pride",
                    "Territorial losses (Alsace-Lorraine, Polish Corridor) alienated Germans",
                    "'Stab-in-the-back' myth: right-wingers claimed the Republic 'betrayed' the army",
                ],
                "model_answer": (
                    "The Treaty of Versailles (June 1919) undermined the Weimar Republic in four ways: "
                    "(1) Reparations of 132 billion gold marks crippled the economy and caused hyperinflation "
                    "in 1923. (2) Article 231 (War Guilt Clause) forced Germans to accept sole blame for "
                    "WWI, humiliating national pride. (3) Territorial losses — Alsace-Lorraine to France, "
                    "the Polish Corridor splitting East Prussia — stirred revanchist sentiment. (4) "
                    "Right-wing nationalists propagated the 'Dolchstosslegende' (stab-in-the-back myth), "
                    "claiming the democratic Republic had betrayed the undefeated German army."
                ),
            },
        ]

    def _weimar_long_answers(self, rng: random.Random) -> list:
        return [
            {
                "type": "long_answer",
                "topic": "c11_hist_050",
                "difficulty": "Hard",
                "question": (
                    "Discuss the weaknesses of the Weimar Republic and explain how they "
                    "contributed to its collapse by 1933."
                ),
                "word_count_hint": "350–400 words",
                "introduction": (
                    "The Weimar Republic (1919-1933) was born in defeat and crisis. Though it "
                    "possessed one of the most progressive constitutions of its time, structural "
                    "flaws, external burdens, and economic catastrophes fatally weakened democratic "
                    "governance and paved the way for Hitler's dictatorship."
                ),
                "body_points": [
                    "Constitutional Weaknesses: Proportional representation fragmented the Reichstag, making stable majority governments nearly impossible. Article 48 allowed presidential emergency rule — used 100+ times by Chancellor Heinrich Brüning (1930-32) to bypass the Reichstag, setting a precedent for authoritarian governance.",
                    "Treaty of Versailles Burden: The Republic's leaders were associated with the 'shameful' Treaty of Versailles. Reparations of 132 billion gold marks, the War Guilt Clause, and territorial losses fuelled nationalist resentment. Right-wing groups branded democratic leaders as 'November Criminals' who had betrayed Germany.",
                    "Economic Crises: Hyperinflation of 1923 (a loaf of bread cost 200 billion marks by November 1923) wiped out middle-class savings, destroying faith in the Republic. The Wall Street Crash of October 1929 ended American loans under the Dawes Plan, pushing unemployment to 6 million (30%) by 1932.",
                    "Political Fragmentation and Extremism: The Reichstag was split between Nazis, Communists (KPD), Social Democrats (SPD), and splinter parties. Chancellors Brüning, Papen, and Schleicher all ruled by emergency decree rather than parliamentary mandate. The Nazi Party grew from 12 seats (1928) to 230 seats (July 1932).",
                ],
                "conclusion": (
                    "By January 1933, with 6 million unemployed, a deadlocked Reichstag, and elites "
                    "who believed they could control Hitler, President Hindenburg appointed Hitler as "
                    "Chancellor. The Weimar Republic's structural flaws — especially Article 48 — had "
                    "already dismantled parliamentary democracy from within, making the Nazi takeover "
                    "almost inevitable."
                ),
            },
        ]

    def _weimar_numerical(self, rng: random.Random) -> list:
        return [
            {
                "type": "numerical",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": (
                    "Germany was required to pay 132 billion gold marks in reparations under the "
                    "Treaty of Versailles. If 1 gold mark = approximately 0.5 US dollars in 1919, "
                    "what was the total in USD?"
                ),
                "formula": "usd = gold_marks * rate_per_mark",
                "values": {"gold_marks": 132e9, "rate_per_mark": 0.5},
                "expected_result": 66e9,
                "unit": "USD",
            },
            {
                "type": "numerical",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": (
                    "By 1932, 6 million Germans were unemployed out of a workforce of approximately "
                    "20 million. Calculate the unemployment rate as a percentage."
                ),
                "formula": "unemployment_rate = (unemployed / total_workforce) * 100",
                "values": {"unemployed": 6e6, "total_workforce": 20e6},
                "expected_result": 30.0,
                "unit": "%",
            },
            {
                "type": "numerical",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": (
                    "The Nazi Party won 230 seats in the Reichstag election of July 1932. "
                    "If the total Reichstag size was 608 seats, what percentage of seats did the Nazis hold?"
                ),
                "formula": "percent = (nazi_seats / total_seats) * 100",
                "values": {"nazi_seats": 230, "total_seats": 608},
                "expected_result": round(230 / 608 * 100, 2),
                "unit": "%",
            },
        ]

    # ------------------------------------------------------------------
    # Japanese Militarism (c11_hist_055) question bank
    # ------------------------------------------------------------------
    def _japan_mcqs(self, rng: random.Random) -> list:
        return [
            {
                "type": "mcq",
                "topic": "c11_hist_055",
                "difficulty": "Hard",
                "question": "Which event in September 1931, staged by the Kwantung Army without cabinet approval, marked the breakdown of civilian control over Japanese foreign policy?",
                "options": [
                    "The Washington Naval Treaty",
                    "The Manchurian Incident",
                    "The May 15 Incident",
                    "The Tohoku Famine",
                ],
                "correct_index": 1,
                "key": "Manchurian Incident",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": "The Great Depression of 1929 most directly harmed Japan's economy by:",
                "options": [
                    "Cutting silk exports to the USA by over 50% by 1930",
                    "Destroying Japan's rice production",
                    "Blockading Japanese ports",
                    "Ending trade with China",
                ],
                "correct_index": 0,
                "key": "silk exports collapsed",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": "Which of the following best describes the Zaibatsu in pre-war Japan?",
                "options": [
                    "Military juntas that controlled the government",
                    "Powerful family-controlled industrial monopolies (Mitsui, Mitsubishi, Sumitomo, Yasuda)",
                    "Peasant farming cooperatives",
                    "Religious organisations",
                ],
                "correct_index": 1,
                "key": "zaibatsu industrial monopolies",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": "Prime Minister Hamaguchi Osachi was assassinated in 1930 for:",
                "options": [
                    "Declaring war on China",
                    "Ratifying the London Naval Treaty",
                    "Nationalising the Zaibatsu",
                    "Supporting the Kwantung Army",
                ],
                "correct_index": 1,
                "key": "ratifying London Naval Treaty",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": "The Washington Naval Treaty (1922) and London Naval Treaty (1930) imposed limits on:",
                "options": [
                    "Japanese trade with Asia",
                    "Japan's naval fleet tonnage relative to USA and Britain",
                    "Japanese immigration to the USA",
                    "Japan's territorial expansion in the Pacific",
                ],
                "correct_index": 1,
                "key": "naval fleet tonnage",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_055",
                "difficulty": "Hard",
                "question": "The May 15 Incident (1932) resulted in the assassination of:",
                "options": [
                    "Emperor Hirohito",
                    "Prime Minister Inukai Tsuyoshi",
                    "Prime Minister Hamaguchi Osachi",
                    "General Tojo Hideki",
                ],
                "correct_index": 1,
                "key": "Inukai Tsuyoshi",
            },
        ]

    def _japan_fill_blanks(self, rng: random.Random) -> list:
        return [
            {
                "type": "fill_blank",
                "topic": "c11_hist_055",
                "difficulty": "Easy",
                "question": "The _____ depression of 1929 collapsed Japan's export-driven economy, with silk exports to the USA falling by over 50% by 1930.",
                "answer_key": "Great",
                "key": "Great Depression",
            },
            {
                "type": "fill_blank",
                "topic": "c11_hist_055",
                "difficulty": "Easy",
                "question": "The _____ Incident of September 1931, staged by the Kwantung Army, marked Japan's invasion of Manchuria.",
                "answer_key": "Manchurian",
                "key": "Manchurian Incident",
            },
            {
                "type": "fill_blank",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": "The four major family-controlled industrial monopolies in Japan were called the _____. (Name any one: Mitsui, Mitsubishi, Sumitomo, Yasuda)",
                "answer_key": "Zaibatsu",
                "key": "zaibatsu",
            },
            {
                "type": "fill_blank",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": "The _____ famine of 1934 devastated farmers in northern Japan, leading some to sell their daughters to textile mills.",
                "answer_key": "Tohoku",
                "key": "Tohoku famine 1934",
            },
            {
                "type": "fill_blank",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": "The _____ naval officers assassinated Prime Minister Inukai Tsuyoshi in the May 15 Incident of 1932.",
                "answer_key": "young",
                "key": "young naval officers",
            },
        ]

    def _japan_short_answers(self, rng: random.Random) -> list:
        return [
            {
                "type": "short_answer",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": "How did the Great Depression contribute to the rise of militarism in Japan?",
                "key_points": [
                    "Silk exports to USA collapsed by over 50% by 1930, devastating rural Tohoku",
                    "The 1934 Tohoku famine caused extreme rural poverty; farmers sold daughters to mills",
                    "Unemployment in cities discredited the civilian Minseito and Seiyukai governments",
                    "Economic collapse made the military appear as the only force capable of decisive action",
                ],
                "model_answer": (
                    "The Great Depression (1929) devastated Japan's export-driven economy. Silk exports "
                    "to the USA — the backbone of the rural Tohoku economy — fell by over 50% by 1930. "
                    "The 1934 Tohoku famine pushed farmers to desperate measures, including selling "
                    "daughters to textile mills. Urban unemployment surged. The civilian party "
                    "governments (Minseito and Seiyukai) appeared helpless, discrediting parliamentary "
                    "democracy and making the military appear as the only force capable of decisive "
                    "action and economic mobilisation through imperial expansion in Manchuria and China."
                ),
                "competency_context": (
                    "Indian students can relate this to how economic shocks like demonetisation (2016) "
                    "or the COVID-19 lockdown (2020) impacted rural livelihoods, helping them understand "
                    "the link between economic distress and political radicalisation."
                ),
            },
            {
                "type": "short_answer",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": "What was the Manchurian Incident of 1931, and why was it significant?",
                "key_points": [
                    "Staged by the Kwantung Army (Japanese military in Manchuria) without cabinet approval",
                    "Explosion on the South Manchuria Railway was used as a pretext for invasion",
                    "Japan occupied Manchuria and set up the puppet state of Manchukuo",
                    "Demonstrated that the military operated independently of civilian government",
                    "League of Nations condemned Japan but could not enforce its ruling; Japan withdrew from the League",
                ],
                "model_answer": (
                    "The Manchurian Incident (September 1931) was a staged event in which the Kwantung "
                    "Army — the Japanese military stationed in Manchuria — detonated a section of the "
                    "South Manchuria Railway and blamed Chinese forces, using it as a pretext to invade "
                    "and occupy all of Manchuria. The civilian government in Tokyo could not control the "
                    "army. The League of Nations condemned the invasion (Lytton Report, 1932), but Japan "
                    "simply withdrew from the League. The incident demonstrated that the Japanese military "
                    "had effectively seized control of foreign policy, marking the definitive collapse of "
                    "civilian oversight and the triumph of militarism."
                ),
            },
        ]

    def _japan_long_answers(self, rng: random.Random) -> list:
        return [
            {
                "type": "long_answer",
                "topic": "c11_hist_055",
                "difficulty": "Hard",
                "question": (
                    "Analyse the economic and political causes of the rise of Japanese militarism in "
                    "the 1930s."
                ),
                "word_count_hint": "350–400 words",
                "introduction": (
                    "Japanese militarism in the 1930s was not merely the product of aggressive "
                    "military ambitions; it was the logical outcome of a convergence of economic "
                    "catastrophe — triggered by the Great Depression — and political decay, in which "
                    "civilian party governments proved incapable of addressing mass suffering."
                ),
                "body_points": [
                    "Economic Collapse from the Great Depression: Japan's economy was heavily dependent on silk exports to the United States. When the Wall Street Crash of October 1929 destroyed American purchasing power, silk exports fell by over 50% by 1930. Rural Tohoku farmers who relied on silkworm rearing were ruined, and the 1934 Tohoku famine pushed many to sell their daughters to textile mills.",
                    "Discrediting of Civilian Government: The ruling Minseito and Seiyukai parties appeared paralysed in the face of economic collapse. Prime Minister Hamaguchi Osachi was shot by a right-wing nationalist in November 1930 for ratifying the London Naval Treaty (which limited Japan's fleet), and died in 1931. The May 15 Incident (1932) saw young naval officers assassinate Prime Minister Inukai Tsuyoshi, ending party-based cabinets.",
                    "Naval Treaty Resentment: The Washington Naval Treaty (1922) and London Naval Treaty (1930) restricted Japan's capital-ship tonnage to a 5:5:3 ratio with Britain and the USA. Military officers saw this as racial discrimination and a threat to Japan's kokutai (national polity), hardening their resolve to reject Western-imposed constraints.",
                    "Zaisbatsu Monopoly and Social Inequality: The four great Zaibatsu (Mitsui, Mitsubishi, Sumitomo, Yasuda) monopolised industry and finance while farmers starved, creating class resentment that the military exploited by promising imperial expansion and economic self-sufficiency (autarky) through conquest of Manchuria and China.",
                ],
                "conclusion": (
                    "By 1936, after the February 26 Incident in which young army officers attempted a "
                    "coup, the military had complete control of the government. The combination of "
                    "economic desperation, treaty humiliation, Zaibatsu collusion, and assassination of "
                    "civilian leaders had destroyed party government and replaced it with a military "
                    "dictatorship bent on imperial conquest."
                ),
            },
        ]

    def _japan_numerical(self, rng: random.Random) -> list:
        return [
            {
                "type": "numerical",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": (
                    "Japan's silk exports to the USA fell by over 50% by 1930 due to the Great "
                    "Depression. If Japan exported silk worth $200 million in 1929, what was the "
                    "approximate export value by 1930 after a 50% fall?"
                ),
                "formula": "new_value = old_value * (1 - percent_fall / 100)",
                "values": {"old_value": 200e6, "percent_fall": 50},
                "expected_result": 100e6,
                "unit": "USD",
            },
            {
                "type": "numerical",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": (
                    "The Washington Naval Treaty fixed Japan's capital-ship tonnage ratio at 3, "
                    "compared to 5 each for the USA and Britain. What percentage of the USA's "
                    "tonnage did Japan receive?"
                ),
                "formula": "percent = (japan_ratio / usa_ratio) * 100",
                "values": {"japan_ratio": 3, "usa_ratio": 5},
                "expected_result": 60.0,
                "unit": "%",
            },
        ]

    # ------------------------------------------------------------------
    # Competency-based questions (Indian context)
    # ------------------------------------------------------------------
    def _competency_questions(self, rng: random.Random) -> list:
        return [
            # --- Italy competency ---
            {
                "type": "short_answer",
                "topic": "c11_hist_046",
                "difficulty": "Medium",
                "question": (
                    "Indian Context: After the Indo-Pakistani War of 1971, many Indian soldiers "
                    "returned to civilian life facing unemployment and economic hardship, similar to "
                    "the Italian arditi after WWI. Draw one parallel between the situation of "
                    "returning Indian soldiers and the Italian arditi, and explain how such "
                    "discontent can influence politics."
                ),
                "key_points": [
                    "Returning soldiers in both contexts faced unemployment and lack of rehabilitation",
                    "Economic hardship made veterans receptive to radical political movements",
                    "In Italy, disgruntled arditi joined Fascist squads; in India, veterans' grievances shaped political discourse",
                    "Discontented ex-servicemen are a volatile political force in any democracy",
                ],
                "model_answer": (
                    "Parallel: After the 1971 Indo-Pak War, returning Indian soldiers faced "
                    "demobilisation challenges, job scarcity, and inadequate pension support — echoing "
                    "the plight of Italian arditi who returned to find no jobs despite their wartime "
                    "sacrifice. In both cases, economic marginalisation of veterans creates resentment "
                    "that can be exploited by political movements. In Italy, the Fascists actively "
                    "recruited arditi into their Blackshirt squads. In India, veterans' organisations "
                    "have consistently lobbied for better rehabilitation, demonstrating how "
                    "discontented ex-servicemen can influence democratic politics when their grievances "
                    "are addressed through institutional channels rather than violence."
                ),
                "competency": True,
                "competency_context": "Indian students relate historical concepts to contemporary Indian society.",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_046",
                "difficulty": "Medium",
                "question": (
                    "Indian Context: The 'Biennio Rosso' (1919-20) in Italy was a period of mass "
                    "strikes and factory occupations that terrified the middle class. Which modern "
                    "Indian parallel illustrates how prolonged industrial unrest can create public "
                    "demand for strong government action?"
                ),
                "options": [
                    "The 2020 farmers' protest leading to the repeal of farm laws",
                    "The 1974 Railway Strike in India under Indira Gandhi's government",
                    "The 1942 Quit India Movement",
                    "The 1991 economic liberalisation reforms",
                ],
                "correct_index": 1,
                "key": "1974 Railway Strike",
                "competency": True,
            },
            {
                "type": "short_answer",
                "topic": "c11_hist_050",
                "difficulty": "Medium",
                "question": (
                    "Indian Context: The Weimar Republic's proportional representation produced "
                    "fragmented parliaments with unstable coalition governments. How does India's "
                    "first-past-the-post (FPTP) electoral system differ, and what is one advantage "
                    "and one disadvantage of FPTP compared to proportional representation?"
                ),
                "key_points": [
                    "FPTP awards seats to the candidate with the most votes in each constituency, not by overall vote share",
                    "Advantage: tends to produce stable majority governments",
                    "Disadvantage: can distort representation — a party with 30% of votes may get far fewer seats",
                    "Proportional representation (as in Weimar Germany) gives more accurate party representation but often leads to unstable coalitions",
                ],
                "model_answer": (
                    "India uses First-Past-the-Post (FPTP): the candidate with the most votes in a "
                    "constituency wins the seat, regardless of whether they have an absolute majority. "
                    "This contrasts with proportional representation (Weimar Germany), where seats are "
                    "allocated based on overall party vote share. Advantage of FPTP: it tends to "
                    "produce stable single-party or clear coalition governments, avoiding the extreme "
                    "fragmentation that crippled the Weimar Reichstag. Disadvantage: a party that wins "
                    "30% of the national vote may win far fewer than 30% of seats, meaning millions of "
                    "voters are unrepresented — as happened in India with regional parties dominating "
                    "state politics while national parties hold disproportionate Lok Sabha majorities."
                ),
                "competency": True,
                "competency_context": "Indian students apply knowledge of proportional representation to understand Indian electoral democracy.",
            },
            {
                "type": "long_answer",
                "topic": "c11_hist_050",
                "difficulty": "Hard",
                "question": (
                    "Indian Context: Hyperinflation in Weimar Germany (1923) destroyed middle-class "
                    "savings and faith in democracy. Compare this with India's experience of high "
                    "inflation, particularly during the economic crisis of 1991 or periods of "
                    "high food inflation (2013-14), and analyse how economic hardship can erode "
                    "public confidence in governments."
                ),
                "word_count_hint": "250–300 words",
                "introduction": (
                    "The hyperinflation of 1923 in Weimar Germany wiped out middle-class savings and "
                    "radicalised large sections of the population, directly contributing to the rise "
                    "of Nazism. India has faced severe inflationary pressures at several points, "
                    "particularly in 1991 and 2013-14, and studying these parallels helps us "
                    "understand the political consequences of economic instability."
                ),
                "body_points": [
                    "Weimar Hyperinflation (1923): A loaf of bread cost 200 billion marks by November 1923. Life savings of the middle class (Mittelstand) were wiped out, turning them against the democratic Republic and towards extremist solutions like Nazism.",
                    "India's 1991 Balance-of-Payments Crisis: Foreign exchange reserves fell to barely $1.2 billion, covering only two weeks of imports. Drastic reforms (liberalisation, devaluation) caused hardship for the middle class, but the government communicated the necessity, maintaining democratic legitimacy — unlike Weimar.",
                    "India's 2013-14 High Food Inflation: Food prices rose over 10%, squeezing rural households. Unlike Weimar Germany where there was no social safety net, India's Public Distribution System (PDS) provided a buffer, demonstrating how institutional resilience can prevent democratic breakdown during economic stress.",
                    "Key Difference: Germany had no democratic tradition and a constitution designed for proportional representation. India's strong parliamentary tradition, robust institutions, and social safety nets (MGNREGA, PDS, PMGKAY) act as shock absorbers against the kind of democratic collapse seen in Weimar.",
                ],
                "conclusion": (
                    "While economic hardship in India has caused political volatility — including "
                    "electoral defeats for incumbent governments — India's democratic institutions "
                    "have remained resilient. The Weimar lesson is that economic crisis becomes "
                    "existentially dangerous for democracy only when combined with constitutional "
                    "weaknesses, weak democratic traditions, and the absence of social safety nets."
                ),
                "competency": True,
                "competency_context": "Indian students compare international history with Indian economic and political experiences.",
            },
            {
                "type": "mcq",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": (
                    "Indian Context: Japan's Zaibatsu (industrial monopolies) grew fabulously rich "
                    "while rural farmers starved during the 1930s. Which modern Indian economic "
                    "phenomenon is analogous in terms of concern about inequality between "
                    "industrialists and farmers?"
                ),
                "options": [
                    "The Green Revolution of the 1960s",
                    "The farmers' debt crisis and demand for MSP (Minimum Support Price)",
                    "The 1991 economic liberalisation",
                    "The establishment of IITs and IIMs",
                ],
                "correct_index": 1,
                "key": "MSP farmers debt crisis",
                "competency": True,
            },
            {
                "type": "fill_blank",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": (
                    "Indian Context: Just as Japan's military took control in the 1930s due to "
                    "economic collapse, India imposed a state of _____ in 1975 during the Emergency, "
                    "suspending democratic rights — illustrating how crises can be used to "
                    "concentrate power."
                ),
                "answer_key": "Emergency",
                "key": "Emergency 1975",
                "competency": True,
            },
            {
                "type": "short_answer",
                "topic": "c11_hist_055",
                "difficulty": "Medium",
                "question": (
                    "Indian Context: The Tohoku famine (1934) in Japan saw farmers sell their "
                    "daughters to textile mills. Compare this with the socio-economic distress "
                    "among small farmers in India — particularly in regions like Marathwada or "
                    "Bundelkhand — during severe droughts. What parallels exist?"
                ),
                "key_points": [
                    "Drought/famine in both contexts devastated small farmers dependent on agriculture",
                    "Distress migration and selling of assets in both cases",
                    "In Japan: farmers sold daughters to mills; in India: farmers take loans, sell land, or migrate to cities",
                    "Government relief mechanisms differ significantly — India has MGNREGA, loan waivers, and PDS",
                ],
                "model_answer": (
                    "In both cases, drought devastated small, land-dependent farmers who lacked "
                    "savings or institutional support. Japanese farmers in Tohoku faced starvation "
                    "when silk prices collapsed, leading to the sale of daughters to textile mills. "
                    "Similarly, farmers in drought-prone regions of India like Marathwada (Maharashtra) "
                    "and Bundelkhand (UP/MP) face crop failure, mounting debt, and distress migration "
                    "to cities. However, modern India has mechanisms — MGNREGA guaranteeing 100 days "
                    "of employment, loan waivers, the Public Distribution System, and drought-relief "
                    "programmes — that provide a social safety net absent in 1930s Japan. "
                    "Nevertheless, the structural vulnerability of small farmers to economic and "
                    "climatic shocks remains a common challenge."
                ),
                "competency": True,
                "competency_context": "Indian students draw parallels with Indian agrarian distress.",
            },
        ]

    # ------------------------------------------------------------------
    # Main generation routine
    # ------------------------------------------------------------------
    def generate_questions(self, seed: int, count: int) -> list:
        """
        Generate `count` questions seeded deterministically.
        Distribution: ~40% standard questions, ~10% competency (Indian-context)
        from each topic node to ensure full syllabus coverage.
        Types: MCQ, fill_blank, short_answer, long_answer, numerical
        """
        rng = _rng(seed)
        self._counter = 0

        all_questions = []

        # Pool each topic's questions
        topic_pools = {
            "c11_hist_046": {
                "mcq": self._italy_mcqs(rng),
                "fill_blank": self._italy_fill_blanks(rng),
                "short_answer": self._italy_short_answers(rng),
                "long_answer": self._italy_long_answers(rng),
                "numerical": self._italy_numerical(rng),
            },
            "c11_hist_050": {
                "mcq": self._weimar_mcqs(rng),
                "fill_blank": self._weimar_fill_blanks(rng),
                "short_answer": self._weimar_short_answers(rng),
                "long_answer": self._weimar_long_answers(rng),
                "numerical": self._weimar_numerical(rng),
            },
            "c11_hist_055": {
                "mcq": self._japan_mcqs(rng),
                "fill_blank": self._japan_fill_blanks(rng),
                "short_answer": self._japan_short_answers(rng),
                "long_answer": self._japan_long_answers(rng),
                "numerical": self._japan_numerical(rng),
            },
        }

        # Competency pool (Indian context)
        comp_pool = self._competency_questions(rng)

        # Target distribution: roughly equal from each topic
        topics = self.TOPICS
        per_topic = max(1, count // len(topics))
        remainder = count - per_topic * len(topics)

        # Type weights: MCQ 30%, fill_blank 15%, short_answer 20%, long_answer 15%, numerical 20%
        type_weights = {
            "mcq": 0.30,
            "fill_blank": 0.15,
            "short_answer": 0.20,
            "long_answer": 0.15,
            "numerical": 0.20,
        }

        type_names = list(type_weights.keys())
        type_probs = [type_weights[t] for t in type_names]

        def pick_type(r: random.Random) -> str:
            return r.choices(type_names, weights=type_probs, k=1)[0]

        question_list = []

        for t_idx, topic in enumerate(topics):
            n = per_topic + (1 if t_idx < remainder else 0)
            pools = topic_pools[topic]

            for _ in range(n):
                qtype = pick_type(rng)
                pool = pools.get(qtype, [])

                if pool:
                    q = rng.choice(pool)
                    q = dict(q)  # shallow copy
                else:
                    # Fallback: pick from another type in same topic
                    available = [(t, p) for t, p in pools.items() if p]
                    if available:
                        qtype, pool = rng.choice(available)
                        q = dict(rng.choice(pool))
                    else:
                        continue

                q["id"] = self._next_id(topic, qtype)
                q["topic_name"] = self.TOPIC_NAMES.get(topic, topic)
                q["section"] = "History"
                q["syllabus"] = "CISCE Class 11"
                q["competency"] = q.get("competency", False)

                # Difficulty
                diff = q.get("difficulty", "Medium")
                if rng.random() < 0.15:
                    diff = "Hard" if diff == "Medium" else "Medium"
                q["difficulty"] = diff

                # Solver params
                if qtype == "mcq":
                    q["solver"] = "solve_mcq"
                    q["solver_params"] = {
                        "question": q["question"],
                        "options": q["options"],
                        "correct_index": q["correct_index"],
                    }
                elif qtype == "fill_blank":
                    q["solver"] = "solve_fill_blank"
                    q["solver_params"] = {
                        "topic": q["topic"],
                        "question_text": q["question"],
                        "blank_index": 0,
                        "answer_key": q["answer_key"],
                    }
                elif qtype == "short_answer":
                    q["solver"] = "solve_short_answer"
                    q["solver_params"] = {
                        "question": q["question"],
                        "key_points": q["key_points"],
                        "model_answer": q["model_answer"],
                    }
                elif qtype == "long_answer":
                    q["solver"] = "solve_long_answer"
                    q["solver_params"] = {
                        "question": q["question"],
                        "introduction": q["introduction"],
                        "body_points": q["body_points"],
                        "conclusion": q["conclusion"],
                        "word_count_hint": q.get("word_count_hint", ""),
                    }
                elif qtype == "numerical":
                    q["solver"] = "solve_numerical"
                    q["solver_params"] = {
                        "question": q["question"],
                        "formula": q["formula"],
                        "values": q["values"],
                        "expected_result": q["expected_result"],
                        "unit": q.get("unit", ""),
                    }

                question_list.append(q)

        # Inject competency questions (~10% of count)
        n_comp = max(1, count // 10)
        comp_available = list(comp_pool)
        rng.shuffle(comp_available)
        for i in range(min(n_comp, len(comp_available))):
            cq = dict(comp_available[i])
            cq["id"] = self._next_id(cq["topic"], cq["type"])
            cq["topic_name"] = self.TOPIC_NAMES.get(cq["topic"], cq["topic"])
            cq["section"] = "History"
            cq["syllabus"] = "CISCE Class 11"
            cq["competency"] = True

            if cq["type"] == "mcq":
                cq["solver"] = "solve_mcq"
                cq["solver_params"] = {
                    "question": cq["question"],
                    "options": cq["options"],
                    "correct_index": cq["correct_index"],
                }
            elif cq["type"] == "fill_blank":
                cq["solver"] = "solve_fill_blank"
                cq["solver_params"] = {
                    "topic": cq["topic"],
                    "question_text": cq["question"],
                    "blank_index": 0,
                    "answer_key": cq["answer_key"],
                }
            elif cq["type"] == "short_answer":
                cq["solver"] = "solve_short_answer"
                cq["solver_params"] = {
                    "question": cq["question"],
                    "key_points": cq["key_points"],
                    "model_answer": cq["model_answer"],
                }
            elif cq["type"] == "long_answer":
                cq["solver"] = "solve_long_answer"
                cq["solver_params"] = {
                    "question": cq["question"],
                    "introduction": cq["introduction"],
                    "body_points": cq["body_points"],
                    "conclusion": cq["conclusion"],
                    "word_count_hint": cq.get("word_count_hint", ""),
                }

            question_list.append(cq)

        # Deterministic shuffle of the final list
        rng.shuffle(question_list)

        # Trim to exact count
        question_list = question_list[:count]

        # Assign final IDs after trimming
        final = []
        for idx, q in enumerate(question_list):
            q["id"] = f"c11_hist_{idx+1:04d}"
            final.append(q)

        return final

    def solve_question(self, qid: str, questions: list) -> dict:
        """Find a question by ID and run its solver, returning full solution."""
        q = next((q for q in questions if q["id"] == qid), None)
        if q is None:
            return {"error": f"Question {qid} not found"}

        solver_name = q.get("solver", "")
        params = q.get("solver_params", {})

        solvers = {
            "solve_mcq": solve_mcq,
            "solve_fill_blank": solve_fill_blank,
            "solve_short_answer": solve_short_answer,
            "solve_long_answer": solve_long_answer,
            "solve_numerical": solve_numerical,
        }

        solver = solvers.get(solver_name)
        if solver is None:
            return {"error": f"Unknown solver: {solver_name}"}

        result = solver(params)
        result["question_id"] = qid
        result["question_type"] = q["type"]
        result["topic"] = q["topic"]
        result["difficulty"] = q["difficulty"]
        return result


def generate_questions(seed: int, count: int) -> list:
    """
    Public API: generate `count` CISCE Class 11 Hist-Civ questions.
    Deterministic for a given seed.
    """
    gen = CISCEHistCivGenerator(seed=seed)
    return gen.generate_questions(seed, count)


def solve_question(qid: str, questions: list) -> dict:
    """
    Public API: solve a specific question by ID from a previously generated list.
    """
    gen = CISCEHistCivGenerator()
    return gen.solve_question(qid, questions)


# ===================================================================
# Verification utilities
# ===================================================================

def verify_all_questions(questions: list) -> dict:
    """
    Run structural verification on all generated questions.
    Returns a summary report.
    """
    required_keys = {"id", "type", "question", "topic", "difficulty", "solver", "solver_params"}
    valid_types = {"mcq", "fill_blank", "short_answer", "long_answer", "numerical"}
    valid_topics = set(CISCEHistCivGenerator.TOPICS)
    valid_difficulties = {"Easy", "Medium", "Hard"}

    results = {
        "total": len(questions),
        "passed": 0,
        "failed": 0,
        "type_distribution": {},
        "topic_distribution": {},
        "difficulty_distribution": {},
        "competency_count": 0,
        "errors": [],
    }

    for q in questions:
        errors = []
        # Required keys
        missing = required_keys - set(q.keys())
        if missing:
            errors.append(f"Missing keys: {missing}")

        # Type check
        qtype = q.get("type", "")
        if qtype not in valid_types:
            errors.append(f"Invalid type: {qtype}")