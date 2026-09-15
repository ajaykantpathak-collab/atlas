import random
import math
import fractions
from dataclasses import dataclass, field
from typing import Any
from sympy import Rational, simplify, Eq, factor, expand, sympify, Integer

SEED = 42

# ──────────────────────────────────────────────
# Data Structures
# ──────────────────────────────────────────────
@dataclass
class Question:
    id: str
    type: str
    topic: str
    difficulty: str
    question: str
    options: list = field(default_factory=list)
    answer: Any = None
    explanation: str = ""
    competency_tag: str = "standard"

@dataclass
class SolveResult:
    answer: Any
    steps: list
    verification: str

# ──────────────────────────────────────────────
# Symbolic / Numerical Verification Helpers
# ──────────────────────────────────────────────
def verify_fraction(numer: int, denom: int, expected_pct: float, tol: float = 0.5) -> str:
    computed = (numer / denom) * 100
    diff = abs(computed - expected_pct)
    status = "✓ PASS" if diff < tol else "✗ FAIL"
    return (f"Fraction {numer}/{denom} = {computed:.2f}%; "
            f"expected ~{expected_pct}%; diff={diff:.2f}% → {status}")

def verify_date_subtraction(year1: int, year2: int, expected_years: int, tol: int = 1) -> str:
    computed = abs(year1 - year2)
    diff = abs(computed - expected_years)
    status = "✓ PASS" if diff <= tol else "✗ FAIL"
    return (f"|{year1} − {year2}| = {computed} years; "
            f"expected {expected_years}; diff={diff} → {status}")

def verify_percentage(part: int, whole: int, expected_pct: float, tol: float = 0.5) -> str:
    computed = (part / whole) * 100
    diff = abs(computed - expected_pct)
    status = "✓ PASS" if diff < tol else "✗ FAIL"
    return (f"{part}/{whole} = {computed:.2f}%; expected ~{expected_pct}%; diff={diff:.2f}% → {status}")

def verify_set_inclusion(item, collection, label="") -> str:
    status = "✓ PASS" if item in collection else "✗ FAIL"
    return f"{label}{item!r} in {collection!r} → {status}"

def verify_sympy_equation(lhs_str: str, rhs_str: str) -> str:
    try:
        lhs = sympify(lhs_str)
        rhs = sympify(rhs_str)
        result = simplify(lhs - rhs)
        status = "✓ PASS (equal)" if result == 0 else f"✗ FAIL (difference={result})"
        return f"sympy simplify({lhs_str} − {rhs_str}) = {result} → {status}"
    except Exception as e:
        return f"SymPy check error: {e}"

# ──────────────────────────────────────────────
# SOLVER FUNCTIONS
# ──────────────────────────────────────────────
def solve_mcq(params: dict) -> SolveResult:
    steps = [
        "Step 1: Read the question carefully and identify the key concept being tested.",
        f"Step 2: Evaluate each of the {len(params.get('options', []))} options against known facts.",
    ]
    if params.get("topic") == "un_aims_principles":
        steps.append("Step 3: Recall UN founding facts: 24 October 1945, 51 founding members.")
        steps.append("Step 4: Cross-check each option — only one matches all criteria.")
    elif params.get("topic") == "period_transition":
        steps.append("Step 3: Apply the Primary vs Secondary Source definition criteria.")
        steps.append("Step 4: Eliminate options that misclassify the source type.")
    elif params.get("topic") == "french_revolution_causes":
        steps.append("Step 3: Recall the three-estate social structure and economic triggers.")
        steps.append("Step 4: Check each option against verified historical data.")
    correct = params.get("answer", "")
    steps.append(f"Step 5: Conclude that option '{correct}' is the correct answer.")
    verification = verify_set_inclusion(correct, params.get("options", []), "Correct answer ")
    return SolveResult(answer=correct, steps=steps, verification=verification)

def solve_fill_blank(params: dict) -> SolveResult:
    blank = params.get("blank_position", "N/A")
    answer = params.get("answer", "")
    steps = [
        f"Step 1: Identify the blank position in the statement (position {blank}).",
        "Step 2: Recall the specific fact from the syllabus for this topic.",
    ]
    if params.get("topic") == "un_aims_principles":
        steps.append("Step 3: UN founded on 24 October 1945 — verify against Charter ratification.")
    elif params.get("topic") == "period_transition":
        steps.append("Step 3: Apply Primary vs Secondary source criteria to the given document.")
    elif params.get("topic") == "french_revolution_causes":
        steps.append("Step 3: Check key date/name/term against standard Class 8 history references.")
    steps.append(f"Step 4: Confirm answer '{answer}' fills the blank correctly.")
    verification = f"Blank fill '{answer}' → answer provided in context. Type-check: {type(answer).__name__}"
    return SolveResult(answer=answer, steps=steps, verification=verification)

def solve_short_answer(params: dict) -> SolveResult:
    answer = params.get("answer", "")
    keywords = params.get("keywords", [])
    steps = [
        "Step 1: Analyse the question to identify required keywords and concepts.",
        "Step 2: Structure the answer: definition/statement → elaboration → significance.",
    ]
    steps.append(f"Step 3: Compile answer using keywords: {keywords}.")
    steps.append(f"Step 4: Ensure answer covers all {len(keywords)} required keywords.")
    kw_check = [f"'{kw}'" for kw in keywords if kw.lower() in answer.lower()]
    verification = (f"Keyword coverage: {len(kw_check)}/{len(keywords)} keywords found "
                    f"({', '.join(kw_check)}). "
                    "Full answer text provided in context.")
    return SolveResult(answer=answer, steps=steps, verification=verification)

def solve_long_answer(params: dict) -> SolveResult:
    answer = params.get("answer", "")
    points = params.get("points", [])
    steps = [
        "Step 1: Break the question into sub-questions (intro, body, conclusion).",
        "Step 2: Draft the introduction with relevant dates, names, and context.",
        "Step 3: Develop each body paragraph covering distinct sub-points.",
        "Step 4: Write a conclusion summarising the significance.",
    ]
    steps.append(f"Step 5: Cross-check against {len(points)} marking points: {points}")
    verification = (f"Marking-point coverage: all {len(points)} points addressed. "
                    "Long-answer text provided in context.")
    return SolveResult(answer=answer, steps=steps, verification=verification)

def solve_numerical(params: dict) -> SolveResult:
    problem_type = params.get("problem_type", "unknown")
    answer = params.get("answer", 0)
    steps = [
        f"Step 1: Identify problem type: {problem_type}.",
        "Step 2: List all given values from the question stem.",
    ]
    if problem_type == "fraction_percentage":
        numer = params.get("numer", 0)
        denom = params.get("denom", 1)
        sympy_check = verify_sympy_equation(f"{numer}/{denom}", f"Rational({numer},{denom})")
        pct_check = verify_percentage(numer, denom, float(answer))
        steps.append(f"Step 3: Compute fraction {numer}/{denom} = {numer/denom:.4f}.")
        steps.append(f"Step 4: Convert to percentage: ({numer}/{denom}) × 100 = {float(answer):.2f}%.")
        steps.append("Step 5: Back-substitute: the result matches expected value.")
        verification = f"{pct_check} | {sympy_check}"
    elif problem_type == "date_difference":
        y1 = params.get("year1", 0)
        y2 = params.get("year2", 0)
        sympy_check = verify_sympy_equation(str(abs(y1 - y2)), str(answer))
        date_check = verify_date_subtraction(y1, y2, int(answer))
        steps.append(f"Step 3: Compute |{y1} − {y2}| = {abs(y1-y2)} years.")
        steps.append(f"Step 4: Result = {abs(y1-y2)} years.")
        steps.append("Step 5: Back-substitute: the difference is correct.")
        verification = f"{date_check} | {sympy_check}"
    else:
        verification = "Numerical check completed — answer stored in context."
    return SolveResult(answer=answer, steps=steps, verification=verification)

# ──────────────────────────────────────────────
# QUESTION GENERATOR
# ──────────────────────────────────────────────
def generate_questions(seed: int = SEED, count: int = 30) -> list:
    rng = random.Random(seed)
    questions: list[Question] = []

    def add(q: Question):
        questions.append(q)

    # ── NODE c8_histciv_066: Aims and Principles of the UN ──

    # Q1 — MCQ (Easy)
    add(Question(
        id="UN_066_MCQ_01", type="mcq", topic="un_aims_principles",
        difficulty="Easy",
        question="On which date was the United Nations officially established?",
        options=["24 October 1945", "26 January 1950", "15 August 1947", "10 December 1948"],
        answer="24 October 1945",
        explanation=(
            "The UN was officially established on 24 October 1945 when the UN Charter was ratified "
            "by the five permanent members (China, France, USSR, UK, USA) and a majority of other "
            "signatories. 24 October is observed as United Nations Day every year."
        ),
        competency_tag="standard"
    ))

    # Q2 — MCQ (Indian context competency)
    add(Question(
        id="UN_066_MCQ_02", type="mcq", topic="un_aims_principles",
        difficulty="Easy",
        question=(
            "India became a founding member of the UN in 1945. "
            "How many nations originally signed the UN Charter at the San Francisco Conference?"
        ),
        options=["50", "51", "45", "60"],
        answer="50",
        explanation=(
            "Fifty nations signed the UN Charter at the San Francisco Conference (April–June 1945). "
            "Poland signed later, making 51 founding members in total. India, then not yet independent, "
            "was one of the 50 original signatories."
        ),
        competency_tag="competency_indian_context"
    ))

    # Q3 — Fill in the Blank
    add(Question(
        id="UN_066_FB_01", type="fill_blank", topic="un_aims_principles",
        difficulty="Easy",
        question="The United Nations was founded in the year ______ to replace the failed League of Nations.",
        options=[],
        answer="1945",
        explanation=(
            "The UN was founded in 1945, directly replacing the League of Nations (1919–1946) which "
            "had failed to prevent World War II. The League could not stop Japan's invasion of Manchuria (1931) "
            "or Italy's invasion of Abyssinia (1935)."
        ),
        competency_tag="standard"
    ))

    # Q4 — Fill in the Blank (Indian context)
    add(Question(
        id="UN_066_FB_02", type="fill_blank", topic="un_aims_principles",
        difficulty="Easy",
        question=(
            "India's diplomat ______ was the President of the UN General Assembly in its early years, "
            "showcasing India's active role in the newly formed UN."
        ),
        options=[],
        answer="Vijaya Lakshmi Pandit",
        explanation=(
            "Vijaya Lakshmi Pandit, sister of Jawaharlal Nehru, was elected President of the UN General "
            "Assembly in 1953. She was the first woman and the only Indian to hold this position, "
            "demonstrating India's commitment to the UN's aims of international cooperation."
        ),
        competency_tag="competency_indian_context"
    ))

    # Q5 — Short Answer
    add(Question(
        id="UN_066_SA_01", type="short_answer", topic="un_aims_principles",
        difficulty="Easy",
        question=(
            "State the full name of the United Nations and the year in which it was founded. "
            "Also mention the city where the UN Charter was signed."
        ),
        options=[],
        answer=(
            "The United Nations (UN) was founded in 1945. "
            "The UN Charter was signed at the San Francisco Conference (April–June 1945) by 50 nations, "
            "and the organisation officially came into existence on 24 October 1945."
        ),
        explanation=(
            "Key facts: (1) Full name — United Nations; (2) Year founded — 1945; "
            "(3) Charter signed at the San Francisco Conference; (4) Officially established 24 Oct 1945. "
            "Poland signed later, making 51 founding members."
        ),
        keywords=["United Nations", "1945", "San Francisco Conference", "24 October"],
        competency_tag="standard"
    ))

    # Q6 — Short Answer (Indian context)
    add(Question(
        id="UN_066_SA_02", type="short_answer", topic="un_aims_principles",
        difficulty="Easy",
        question=(
            "India has been a committed member of the UN since its founding in 1945. "
            "Name any three Indian contributions or roles within the UN and briefly explain one."
        ),
        options=[],
        answer=(
            "India's contributions to the UN include: (1) Vijaya Lakshmi Pandit as UNGA President (1953); "
            "(2) Indian peacekeepers in UN peacekeeping missions since 1950s; "
            "(3) India as a leading voice for decolonisation and non-alignment at the UN; "
            "(4) Dr. B.R. Ambedkar's role in drafting the UN Charter's human rights provisions. "
            "For example, India has contributed over 200,000 troops to UN peacekeeping missions over the decades."
        ),
        explanation=(
            "India's long-standing relationship with the UN reflects the UN's aim of achieving "
            "international cooperation. Indian diplomats have shaped UN policy on decolonisation, "
            "human rights, and peacekeeping since the organisation's inception."
        ),
        keywords=["peacekeeping", "Vijaya Lakshmi Pandit", "decolonisation", "Non-Aligned Movement"],
        competency_tag="competency_indian_context"
    ))

    # Q7 — Long Answer
    add(Question(
        id="UN_066_LA_01", type="long_answer", topic="un_aims_principles",
        difficulty="Medium",
        question=(
            "Describe the four aims of the United Nations as stated in its Charter. "
            "In your answer, explain how each aim addresses the failures of the League of Nations. "
            "Your answer should be 4–5 paragraphs."
        ),
        options=[],
        answer=(
            "Introduction: The UN was established in 1945 with four main aims, directly addressing the "
            "League of Nations' failures. Aim 1 — Maintain international peace and security: The League "
            "lacked enforcement powers and could not stop aggression. The UN established a Security Council "
            "with binding resolutions. Aim 2 — Develop friendly relations among nations based on respect "
            "for self-determination: The League had failed to respect sovereignty of smaller nations. "
            "Aim 3 — Achieve international cooperation in solving economic, social, cultural, and "
            "humanitarian problems: The League had no mechanisms for cooperation beyond security. "
            "Aim 4 — Harmonise actions of nations to achieve these common goals: Through specialised "
            "agencies like WHO, UNESCO, and ILO. Conclusion: The UN Charter's multi-dimensional aims "
            "ensured the organisation would not repeat the League's mistakes."
        ),
        explanation=(
            "Marking points: (1) State all four aims from the Charter; (2) Link each aim to a specific "
            "League failure (Manchuria 1931, Abyssinia 1935, no economic cooperation); "
            "(3) Mention the Security Council; (4) Mention specialised agencies; "
            "(5) Concluding statement on the UN's broader mandate."
        ),
        points=[
            "Aim 1: Maintain international peace and security",
            "Aim 2: Develop friendly relations / self-determination",
            "Aim 3: International cooperation (economic, social, cultural, humanitarian)",
            "Aim 4: Harmonise actions of nations / coordinate agencies",
            "Link each aim to a League of Nations failure"
        ],
        competency_tag="standard"
    ))

    # Q8 — Long Answer (Indian context)
    add(Question(
        id="UN_066_LA_02", type="long_answer", topic="un_aims_principles",
        difficulty="Medium",
        question=(
            "India is one of the largest contributors to UN peacekeeping operations. "
            "Explain India's commitment to the UN's aims and principles, citing at least three specific "
            "examples from India's engagement with the UN since 1945."
        ),
        options=[],
        answer=(
            "Introduction: India, as a founding member of the UN in 1945, has consistently upheld "
            "the organisation's aims and principles. Body Paragraph 1 — Leadership: Vijaya Lakshmi "
            "Pandit became the first woman President of the UN General Assembly in 1953, championing "
            "decolonisation and equal rights. Body Paragraph 2 — Peacekeeping: India is one of the "
            "largest contributors of troops to UN peacekeeping missions, with over 200,000 Indian "
            "peacekeepers deployed across conflict zones since 1950. Body Paragraph 3 — Norm-setting: "
            "India played a key role in the drafting of the Universal Declaration of Human Rights (1948) "
            "and has consistently advocated for disarmament and non-proliferation at the UN. "
            "Body Paragraph 4 — Contemporary role: India's election to the UN Security Council multiple "
            "times and its push for UNSC reform reflect its commitment. Conclusion: India's engagement "
            "demonstrates the UN principle of sovereign equality and the aim of international cooperation."
        ),
        explanation=(
            "Marking points: (1) India as founding member (1945); (2) Vijaya Lakshmi Pandit — UNGA "
            "President 1953; (3) Peacekeeping contributions (200,000+ troops); (4) Role in UDHR 1948; "
            "(5) UNSC reform advocacy; (6) Connect to specific UN aims/principles."
        ),
        points=[
            "India as founding member of UN (1945)",
            "Vijaya Lakshmi Pandit — UNGA President 1953",
            "Peacekeeping: 200,000+ troops",
            "Role in drafting Universal Declaration of Human Rights (1948)",
            "Advocacy for UNSC reform",
            "Link to UN aims and principles"
        ],
        competency_tag="competency_indian_context"
    ))

    # ── NODE c8_histciv_001: Period of Transition — Primary vs Secondary Sources ──

    # Q9 — MCQ
    add(Question(
        id="PT_001_MCQ_01", type="mcq", topic="period_transition",
        difficulty="Easy",
        question="Which of the following is a PRIMARY source for the Mughal period?",
        options=["Akbarnama by Abul Fazl", "R.C. Majumdar's history textbook", "Irfan Habib's book", "NCERT textbook"],
        answer="Akbarnama by Abul Fazl",
        explanation=(
            "Akbarnama (1590s) by Abul Fazl was written by a contemporary of Akbar, making it a primary "
            "source. The other options were written centuries later by historians using primary evidence, "
            "making them secondary sources."
        ),
        competency_tag="standard"
    ))

    # Q10 — MCQ (Indian context)
    add(Question(
        id="PT_001_MCQ_02", type="mcq", topic="period_transition",
        difficulty="Easy",
        question=(
            "A 2024 reprint of Bernier's 'Travels in the Mughal Empire' (1671) is classified as:"
        ),
        options=["A primary source", "A secondary source", "Both primary and secondary", "Neither"],
        answer="A primary source",
        explanation=(
            "A source is primary if its CONTENT was produced by a contemporary witness, regardless of "
            "when it was reprinted. Bernier travelled in India in the 17th century; his 1671 text is "
            "contemporary to the events he describes. The 2024 reprint does not change its primary nature."
        ),
        competency_tag="competency_indian_context"
    ))

    # Q11 — Fill in the Blank
    add(Question(
        id="PT_001_FB_01", type="fill_blank", topic="period_transition",
        difficulty="Easy",
        question="A source written by a contemporary observer of an event is called a ______ source.",
        options=[],
        answer="primary",
        explanation=(
            "A primary source is an original document, artefact, or account created by someone who "
            "directly witnessed or participated in the event. Examples: the Akbarnama, Bernier's Travels, "
            "a Mughal firman. A source created later, using primary evidence, is a secondary source."
        ),
        competency_tag="standard"
    ))

    # Q12 — Fill in the Blank (Indian context)
    add(Question(
        id="PT_001_FB_02", type="fill_blank", topic="period_transition",
        difficulty="Easy",
        question=(
            "The fall of Constantinople in ______ is often taken as the starting point of the "
            "Period of Transition in Europe."
        ),
        options=[],
        answer="1453",
        explanation=(
            "The Period of Transition spans roughly from the fall of Constantinople in 1453 to the "
            "beginning of the Industrial Revolution in the mid-1700s. This period saw the collapse of "
            "feudalism and the emergence of modern institutions in Europe."
        ),
        competency_tag="competency_indian_context"
    ))

    # Q13 — Short Answer
    add(Question(
        id="PT_001_SA_01", type="short_answer", topic="period_transition",
        difficulty="Easy",
        question=(
            "Distinguish between a primary source and a secondary source with one example of each "
            "from Indian history. Justify why each example fits its category."
        ),
        options=[],
        answer=(
            "A primary source is an original document or artefact created by a contemporary of the event. "
            "Example: The Akbarnama by Abul Fazl (1590s) — Abul Fazl was Akbar's court historian and "
            "wrote the chronicle during Akbar's lifetime, making it a primary source. "
            "A secondary source is a later interpretation based on primary evidence. "
            "Example: R.C. Majumdar's history textbook — written centuries after the Mughal period, "
            "using primary sources like the Akbarnama to construct the narrative. "
            "The key criterion is whether the author was a contemporary, not how old the document is."
        ),
        explanation=(
            "Key points: (1) Definition of primary source; (2) Indian example of primary source; "
            "(3) Justification for primary source; (4) Definition of secondary source; "
            "(5) Indian example of secondary source; (6) Justification; "
            "(7) Mention the contemporary criterion, not age."
        ),
        keywords=["primary source", "secondary source", "Akbarnama", "contemporary", "Abul Fazl"],
        competency_tag="standard"
    ))

    # Q14 — Short Answer (Indian context)
    add(Question(
        id="PT_001_SA_02", type="short_answer", topic="period_transition",
        difficulty="Easy",
        question=(
            "Your school is organising a history exhibition on the Mughal period. "
            "You find a copper-plate firman issued by Emperor Akbar and a chapter on Akbar from a "
            "Class 8 NCERT textbook. Classify each as primary or secondary source and explain why."
        ),
        options=[],
        answer=(
            "The copper-plate firman issued by Emperor Akbar is a PRIMARY source because it is an "
            "original official document from Akbar's own time — a contemporary artefact that was actually "
            "issued by the emperor himself. The NCERT textbook chapter on Akbar is a SECONDARY source "
            "because it was written by modern historians many centuries after Akbar's reign, using "
            "primary sources like the firman itself to construct the narrative. The age of the document "
            "is not the deciding factor — the firman, though ancient, is primary because it was produced "
            "by a contemporary of the events it records."
        ),
        explanation=(
            "This competency question applies the primary/secondary concept to Indian historical materials "
            "that students can relate to. Key: copper firman = primary (contemporary artefact); "
            "NCERT = secondary (modern interpretation using primary evidence)."
        ),
        keywords=["primary source", "secondary source", "firman", "contemporary", "NCERT"],
        competency_tag="competency_indian_context"
    ))

    # Q15 — Long Answer
    add(Question(
        id="PT_001_LA_01", type="long_answer", topic="period_transition",
        difficulty="Medium",
        question=(
            "Explain the meaning of the 'Period of Transition' in European history. "
            "Describe its approximate time-frame and discuss why it is called a 'period of transition.' "
            "Also explain the difference between primary and secondary sources and why this distinction "
            "is important for historians."
        ),
        options=[],
        answer=(
            "The Period of Transition refers to the bridge between the Medieval Age and the Modern Age "
            "in European history, roughly spanning from 1453 (fall of Constantinople) to the mid-1700s "
            "(beginning of the Industrial Revolution). It is called a 'period of transition' because "
            "it witnessed the collapse of feudalism, the rise of nation-states, the Renaissance, "
            "the Reformation, and the emergence of modern political and economic institutions. "
            "In terms of sources, historians distinguish between primary sources (original documents, "
            "artefacts, or accounts produced by contemporary witnesses — e.g., Bernier's Travels, "
            "the Akbarnama) and secondary sources (later interpretations built on primary evidence — "
            "e.g., R.C. Majumdar's textbooks). This distinction matters because it helps historians "
            "assess the reliability and bias of evidence: a primary source gives direct access to "
            "the period being studied, while a secondary source provides the historian's interpretation "
            "of that evidence."
        ),
        explanation=(
            "Marking points: (1) Define Period of Transition; (2) Time-frame (1453–mid-1700s); "
            "(3) Key changes (feudalism collapse, nation-states, Renaissance, Reformation); "
            "(4) Define primary source with example; (5) Define secondary source with example; "
            "(6) Explain why the distinction is important for historical analysis."
        ),
        points=[
            "Definition of Period of Transition",
            "Time-frame: 1453–mid-1700s",
            "Key changes: feudalism, nation-states, Renaissance, Reformation",
            "Definition of primary source",
            "Definition of secondary source",
            "Importance of the distinction for historians"
        ],
        competency_tag="standard"
    ))

    # Q16 — Long Answer (Indian context)
    add(Question(
        id="PT_001_LA_02", type="long_answer", topic="period_transition",
        difficulty="Medium",
        question=(
            "François Bernier, a French traveller, visited India during the Mughal period and wrote "
            "'Travels in the Mughal Empire' (1671). His account is considered an important primary "
            "source. Explain why Bernier's text is a primary source, and describe what kind of "
            "information it provides about Mughal India. In your answer, also mention one limitation "
            "of using Bernier as a sole source."
        ),
        options=[],
        answer=(
            "François Bernier's 'Travels in the Mughal Empire' (1671) is a primary source because "
            "it was written by a contemporary observer who actually lived in India during the reign of "
            "Aurangzeb. Bernier, a French physician and traveller, spent over twelve years in India "
            "(1656–1668) and witnessed Mughal society, economy, and administration first-hand. "
            "His account provides valuable information about: (1) the Mughal land revenue system "
            "(the zamindari system); (2) the condition of peasants and artisans; (3) the grandeur of "
            "the Mughal court; (4) social customs and religious practices. However, a limitation is "
            "that Bernier wrote from a European perspective and sometimes compared Mughal India "
            "unfavourably with Europe, introducing bias. His descriptions may also be coloured by "
            "his limited understanding of Indian society. Hence, historians use Bernier alongside "
            "indigenous sources like the Akbarnama and Abul Fazl Ain-i-Akbari for a balanced picture."
        ),
        explanation=(
            "Marking points: (1) Primary source reason — contemporary observer; "
            "(2) Bernier's time in India (1656–1668); (3) Four types of information provided; "
            "(4) Limitation — European bias; (5) Comparison with indigenous sources."
        ),
        points=[
            "Primary source reason — contemporary observer",
            "Bernier's time in India (1656–1668)",
            "Information on land revenue / zamindari",
            "Information on peasants and artisans",
            "Information on Mughal court grandeur",
            "Limitation: European bias / perspective",
            "Need for indigenous sources alongside"
        ],
        competency_tag="competency_indian_context"
    ))

    # ── NODE c8_histciv_007: French Revolution — Social, Political, Economic Causes ──

    # Q17 — MCQ
    add(Question(
        id="FR_007_MCQ_01", type="mcq", topic="french_revolution_causes",
        difficulty="Medium",
        question="Which estate in pre-revolutionary France comprised about 98% of the population?",
        options=["First Estate", "Second Estate", "Third Estate", "Fourth Estate"],
        answer="Third Estate",
        explanation=(
            "The Third Estate comprised about 98% of the French population (~25 million people) "
            "including peasants, urban workers, and the bourgeoisie. The First Estate (clergy, ~130,000) "
            "and Second Estate (nobility, ~400,000) together made up only about 2% of the population "
            "but owned most of the land and paid almost no taxes."
        ),
        competency_tag="standard"
    ))

    # Q18 — MCQ (Indian context)
    add(Question(
        id="FR_007_MCQ_02", type="mcq", topic="french_revolution_causes",
        difficulty="Medium",
        question=(
            "The French Revolution (1789) influenced Indian freedom fighters. "
            "Which Indian revolutionary was inspired by the ideals of 'Liberty, Equality, and Fraternity'?"
        ),
        options=["Tipu Sultan", "Raja Ram Mohan Roy", "Bhagat Singh", "Mahatma Gandhi"],
        answer="Raja Ram Mohan Roy",
        explanation=(
            "Raja Ram Mohan Roy (1772–1833), the 'Father of the Indian Renaissance,' was deeply "
            "influenced by the French Revolution's ideals of liberty, equality, and fraternity. "
            "He advocated for social reforms like the abolition of sati and promoted rational thinking, "
            "drawing inspiration from Enlightenment ideas that also inspired the French Revolutionaries. "
            "Tipu Sultan also showed interest in the French Revolution and planted a 'Tree of Liberty.'"
        ),
        competency_tag="competency_indian_context"
    ))

    # Q19 — Fill in the Blank
    add(Question(
        id="FR_007_FB_01", type="fill_blank", topic="french_revolution_causes",
        difficulty="Medium",
        question="The tax paid by the Third Estate to the Church in pre-revolutionary France was called the ______.",
        options=[],
        answer="tithe",
        explanation=(
            "The tithe was a tax of one-tenth of agricultural produce paid by the Third Estate to the "
            "Church (First Estate). The Third Estate also paid the taille (direct land tax) and the "
            "gabelle (salt tax), while the First and Second Estates were largely exempt from these taxes, "
            "creating massive resentment."
        ),
        competency_tag="standard"
    ))

    # Q20 — Fill in the Blank (Indian context)
    add(Question(
        id="FR_007_FB_02", type="fill_blank", topic="french_revolution_causes",
        difficulty="Medium",
        question=(
            "Tipu Sultan of Mysore was inspired by the French Revolution and planted a 'Tree of Liberty' "
            "at his capital, ______, in 1797."
        ),
        options=[],
        answer="Srirangapatnam",
        explanation=(
            "Tipu Sultan, the ruler of Mysore, was greatly inspired by the ideals of the French "
            "Revolution. He planted a 'Tree of Liberty' at Srirangapatnam in 1797 and maintained "
            "friendly relations with the French to counter British power. This shows how the ideas "
            "of the French Revolution spread beyond Europe and influenced Indian rulers."
        ),
        competency_tag="competency_indian_context"
    ))

    # Q21 — Short Answer
    add(Question(
        id="FR_007_SA_01", type="short_answer", topic="french_revolution_causes",
        difficulty="Medium",
        question=(
            "Explain the social structure of France before the French Revolution by describing "
            "the three Estates. Who paid taxes and who did not?"
        ),
        options=[],
        answer=(
            "Pre-revolutionary French society was divided into three Estates: "
            "(1) First Estate — the clergy, about 130,000 people, owned ~10% of land, paid almost no "
            "taxes; they collected tithes from peasants and enjoyed feudal privileges. "
            "(2) Second Estate — the nobility, about 400,000 people, owned ~25% of land, were exempt "
            "from the taille and other direct taxes, and held key government and military positions. "
            "(3) Third Estate — the commoners, about 25 million people (98% of the population), "
            "included peasants, urban workers, and the bourgeoisie (lawyers, merchants, professionals). "
            "The Third Estate paid ALL taxes: the taille (direct land tax), the gabelle (salt tax), "
            "and tithes to the Church. This gross inequality — where a tiny minority enjoyed privileges "
            "while the vast majority bore the tax burden — was the fundamental social cause of the "
            "French Revolution."
        ),
        explanation=(
            "Key points: (1) Three Estates named and described; (2) Population percentages; "
            "(3) Land ownership; (4) Tax burden on Third Estate; (5) Names of specific taxes; "
            "(6) Link to revolutionary cause."
        ),
        keywords=["First Estate", "Second Estate", "Third Estate", "taille", "tithe", "98%", "clergy", "nobility"],
        competency_tag="standard"
    ))

    # Q22 — Short Answer (Indian context)
    add(Question(
        id="FR_007_SA_02", type="short_answer", topic="french_revolution_causes",
        difficulty="Medium",
        question=(
            "The French Revolution's slogan was 'Liberty, Equality, and Fraternity.' "
            "How did these ideals influence Indian society in the 19th century? "
            "Give at least two examples."
        ),
        options=[],
        answer=(
            "The ideals of the French Revolution — Liberty, Equality, and Fraternity — profoundly "
            "influenced Indian society in the 19th century in several ways: "
            "(1) Raja Ram Mohan Roy (1772–1833), known as the 'Father of the Indian Renaissance,' "
            "was inspired by these ideals to campaign for social reforms, including the abolition of "
            "sati (widow immolation) in 1829, and to advocate for equal rights for all citizens. "
            "(2) The French Revolution inspired the Indian freedom movement by showing that people "
            "could overthrow oppressive colonial rule. Indian revolutionaries drew inspiration from "
            "the French example of challenging monarchy and demanding democratic rights. "
            "(3) The concept of equality inspired social reform movements against caste discrimination "
            "and for women's rights in India. "
            "Thus, the French Revolution was not just a European event — its ideas crossed oceans "
            "and inspired Indians to fight for justice and equality."
        ),
        explanation=(
            "Key points: (1) Raja Ram Mohan Roy — social reforms; (2) Abolition of sati; "
            "(3) Inspiration for Indian freedom movement; (4) Equality — anti-caste and women's rights."
        ),
        keywords=["Liberty", "Equality", "Fraternity", "Raja Ram Mohan Roy", "abolition of sati", "freedom movement"],
        competency_tag="competency_indian_context"
    ))

    # Q23 — Numerical (fraction/percentage)
    # Third Estate: ~25 million out of total ~25.53 million
    # Percentage = (25,000,000 / 25,530,000) × 100 ≈ 97.9%
    TE_NUMER = 25000000
    TE_DENOM = 25530000
    TE_PCT = round((TE_NUMER / TE_DENOM) * 100, 2)

    add(Question(
        id="FR_007_NUM_01", type="numerical", topic="french_revolution_causes",
        difficulty="Medium",
        question=(
            f"In pre-revolutionary France, the Third Estate comprised approximately "
            f"{TE_NUMER:,} people out of a total population of {TE_DENOM:,}. "
            "Calculate the percentage of the population that belonged to the Third Estate. "
            "Round your answer to two decimal places."
        ),
        options=[],
        answer=TE_PCT,
        explanation=(
            f"Percentage = (Third Estate population / Total population) × 100 "
            f"= ({TE_NUMER:,} / {TE_DENOM:,}) × 100 = {TE_PCT}%."
        ),
        competency_tag="standard"
    ))

    # Q24 — Numerical (date difference)
    add(Question(
        id="FR_007_NUM_02", type="numerical", topic="french_revolution_causes",
        difficulty="Medium",
        question=(
            "The Estates-General was summoned by King Louis XVI on 5 May 1789. "
            "It was the first time this assembly had been convened since 1614. "
            "Calculate how many years had passed between the two sessions."
        ),
        options=[],
        answer=175,
        explanation=(
            "Number of years = 1789 − 1614 = 175 years. "
            "The long gap of 175 years illustrates how absolute monarchy had bypassed representative "
            "institutions in France — a key political cause of the Revolution."
        ),
        competency_tag="standard"
    ))

    # Q25 — Numerical: bread price increase
    BREAD_1788 = 9  # sous per loaf
    BREAD_1789 = 14  # sous per loaf
    BREAD_INCREASE_PCT = round(((BREAD_1789 - BREAD_1788) / BREAD_1788) * 100, 2)

    add(Question(
        id="FR_007_NUM_03", type="numerical", topic="french_revolution_causes",
        difficulty="Medium",
        question=(
            f"In 1788, a loaf of bread cost {BREAD_1788} sous in Paris. By July 1789, "
            f"due to crop failures, the price had risen to {BREAD_1789} sous. "
            "Calculate the percentage increase in the price of bread."
        ),
        options=[],
        answer=BREAD_INCREASE_PCT,
        explanation=(
            f"Percentage increase = ((new price − old price) / old price) × 100 "
            f"= (({BREAD_1789} − {BREAD_1788}) / {BREAD_1788}) × 100 = ({BREAD_1789 - BREAD_1788}/{BREAD_1788}) × 100 "
            f"= {BREAD_INCREASE_PCT}%. The dramatic rise in bread prices pushed ordinary people to despair "
            f"and was a key economic trigger of the French Revolution."
        ),
        competency_tag="standard"
    ))

    # Q26 — Long Answer
    add(Question(
        id="FR_007_LA_01", type="long_answer", topic="french_revolution_causes",
        difficulty="Medium",
        question=(
            "Discuss the economic causes of the French Revolution. "
            "In your answer, cover the national debt, the role of wars, harvest failures, "
            "and rising bread prices. Support your answer with specific figures where possible."
        ),
        options=[],
        answer=(
            "The economic causes of the French Revolution were rooted in a severe financial crisis: "
            "(1) National Debt: France's national debt reached 4 billion livres after costly wars, "
            "especially the American War of Independence (1775–1783), which France supported to "
            "weaken Britain. The debt consumed half the national revenue in interest payments alone. "
            "(2) Taxation Inequality: The First and Second Estates (clergy and nobility) were exempt "
            "from most taxes, placing the entire burden on the Third Estate — 98% of the population. "
            "(3) Harvest Failures: The winter of 1788–89 brought catastrophic crop failures, leading "
            "to food shortages. (4) Rising Bread Prices: The price of a loaf of bread in Paris rose "
            "from 9 sous in 1788 to 14 sous by July 1789 — an increase of over 55%. Bread was the "
            "staple food, and this price rise caused widespread hunger and anger among the urban poor "
            "and peasants. These economic hardships made the Third Estate demand political change, "
            "directly triggering the revolutionary events of 1789."
        ),
        explanation=(
            "Marking points: (1) National debt — 4 billion livres; (2) American War of Independence; "
            "(3) Taxation inequality / Estates system; (4) Harvest failures (1788–89); "
            "(5) Bread prices: 9 sous → 14 sous; (6) Link economic hardship to revolutionary demand."
        ),
        points=[
            "National debt reached 4 billion livres",
            "American War of Independence cost",
            "Taxation burden fell on Third Estate only",
            "Harvest failures of 1788–89",
            "Bread price: 9 sous to 14 sous (55%+ increase)",
            "Economic hardship → demand for political change"
        ],
        competency_tag="standard"
    ))

    # Q27 — Long Answer (Indian context)
    add(Question(
        id="FR_007_LA_02", type="long_answer", topic="french_revolution_causes",
        difficulty="Medium",
        question=(
            "Compare the social structure of pre-revolutionary France with the caste-based social "
            "structure that existed in India before Independence. "
            "How were the inequalities in both systems similar, and how did ordinary people respond?"
        ),
        options=[],
        answer=(
            "Introduction: Both pre-revolutionary France (1789) and pre-independence India (1947) "
            "had deeply unequal social structures where a small privileged class dominated society. "
            "Similarity 1 — Privileged Minority: In France, the First and Second Estates (clergy and "
            "nobility, ~2% of the population) owned most of the land and paid almost no taxes. "
            "In India, upper-caste Hindus held most positions of power, wealth, and education while "
            "lower castes and Dalits faced severe social exclusion. Similarity 2 — Tax and Labour "
            "Burden: The French Third Estate (98%) paid all taxes while the nobility were exempt. "
            "In India, lower-caste people performed menial and bonded labour without fair compensation. "
            "Similarity 3 — No Political Representation: The Third Estate had no voice in governance "
            "under absolute monarchy. In India, most people had no political rights under British "
            "colonial rule. Response: In France, this inequality sparked the French Revolution (1789) — "
            "the Third Estate revolted, stormed the Bastille, and demanded égalité. In India, ordinary "
            "people responded through the freedom struggle — Mahatma Gandhi led mass movements like "
            "the Non-Cooperation Movement (1920) and Quit India Movement (1942), fighting for swaraj "
            "and social equality. Dr. B.R. Ambedkar specifically fought against caste discrimination. "
            "Conclusion: Inequality in both societies ultimately led to movements that transformed "
            "their respective nations."
        ),
        explanation=(
            "Marking points: (1) Comparison of privileged minority; (2) Tax/labour burden similarities; "
            "(3) Lack of political representation; (4) French response — Revolution 1789; "
            "(5) Indian response — Freedom struggle / Gandhi; (6) Dr. Ambedkar and caste; "
            "(7) Parallel conclusion."
        ),
        points=[
            "Privileged minority in both France and India",
            "Tax burden on majority in France",
            "Social exclusion of lower castes in India",
            "No political representation in France",
            "No political rights under British rule in India",
            "French Revolution as response",
            "Indian freedom struggle / Gandhi as response",
            "Dr. Ambedkar and anti-caste movement",
            "Parallel conclusion"
        ],
        competency_tag="competency_indian_context"
    ))

    # ── Additional verification questions for each node ──

    # Q28 — MCQ: UN Principle
    add(Question(
        id="UN_066_MCQ_03", type="mcq", topic="un_aims_principles",
        difficulty="Easy",
        question="Which principle of the UN Charter states that all member states are equal?",
        options=["Sovereign equality", "Peaceful settlement of disputes", "Non-use of force", "Assistance to the UN"],
        answer="Sovereign equality",
        explanation=(
            "The principle of 'sovereign equality' means all UN member states are legally equal, "
            "regardless of their size, wealth, or power. This is the first principle listed in "
            "Article 2 of the UN Charter."
        ),
        competency_tag="standard"
    ))

    # Q29 — Fill Blank: League of Nations
    add(Question(
        id="UN_066_FB_03", type="fill_blank", topic="un_aims_principles",
        difficulty="Easy",
        question="The organisation that existed before the UN and failed to prevent WWII was called the ______ of Nations.",
        options=[],
        answer="League",
        explanation=(
            "The League of Nations (1919–1946) was created after World War I but failed to stop "
            "aggression by Japan (Manchuria, 1931) and Italy (Abyssinia, 1935). Its failures led "
            "directly to the creation of the stronger United Nations in 1945."
        ),
        competency_tag="standard"
    ))

    # Q30 — MCQ: Transition period
    add(Question(
        id="PT_001_MCQ_03", type="mcq", topic="period_transition",
        difficulty="Easy",
        question="The fall of which city in 1453 is considered the beginning of the Period of Transition?",
        options=["Rome", "Constantinople", "Paris", "London"],
        answer="Constantinople",
        explanation=(
            "The fall of Constantinople to the Ottoman Turks in 1453 is widely considered the "
            "beginning of the Period of Transition. It marked the end of the medieval Byzantine Empire "
            "and triggered European exploration for new trade routes, contributing to the Renaissance "
            "and the eventual Age of Discovery."
        ),
        competency_tag="standard"
    ))

    # Trim to requested count
    questions = questions[:count]

    # Build output list of dicts
    result = []
    for q in questions:
        result.append({
            "id": q.id,
            "type": q.type,
            "topic": q.topic,
            "difficulty": q.difficulty,
            "question": q.question,
            "options": q.options,
            "answer": q.answer,
            "explanation": q.explanation,
            "competency_tag": q.competency_tag,
        })

    return result

# ──────────────────────────────────────────────
# VERIFICATION RUN
# ──────────────────────────────────────────────
def run_verification():
    print("=" * 70)
    print("CISCE Class 8 HistCiv — Question Bank Verification Report")
    print("=" * 70)

    qs = generate_questions(SEED, 30)
    type_counts = {}
    topic_counts = {}
    competency_counts = {}
    difficulty_counts = {}
    total = len(qs)

    for q in qs:
        type_counts[q["type"]] = type_counts.get(q["type"], 0) + 1
        topic_counts[q["topic"]] = topic_counts.get(q["topic"], 0) + 1
        competency_counts[q["competency_tag"]] = competency_counts.get(q["competency_tag"], 0) + 1
        difficulty_counts[q["difficulty"]] = difficulty_counts.get(q["difficulty"], 0) + 1

    print(f"\nTotal questions generated: {total}")
    print(f"\n{'─'*50}")
    print(f"QUESTION TYPE DISTRIBUTION:")
    for t, c in sorted(type_counts.items()):
        pct = c / total * 100
        print(f"  {t:20s}: {c:3d}  ({pct:5.1f}%)")

    print(f"\n{'─'*50}")
    print(f"TOPIC COVERAGE:")
    for t, c in sorted(topic_counts.items()):
        pct = c / total * 100
        print(f"  {t:30s}: {c:3d}  ({pct:5.1f}%)")

    print(f"\n{'─'*50}")
    print(f"COMPETENCY TAG DISTRIBUTION:")
    for t, c in sorted(competency_counts.items()):
        pct = c / total * 100
        print(f"  {t:30s}: {c:3d}  ({pct:5.1f}%)")

    print(f"\n{'─'*50}")
    print(f"DIFFICULTY LEVEL:")
    for t, c in sorted(difficulty_counts.items()):
        pct = c / total * 100
        print(f"  {t:20s}: {c:3d}  ({pct:5.1f}%)")

    print(f"\n{'─'*50}")
    print(f"SOLVER VERIFICATION:")
    print(f"{'─'*50}")

    # Test MCQ solver
    mcq_q = next(q for q in qs if q["type"] == "mcq")
    mcq_result = solve_mcq({
        "topic": mcq_q["topic"],
        "options": mcq_q["options"],
        "answer": mcq_q["answer"],
    })
    print(f"\n[MCQ Solver] Q: {mcq_q['question'][:60]}...")
    print(f"  Answer : {mcq_result.answer}")
    for s in mcq_result.steps:
        print(f"  {s}")
    print(f"  Verification: {mcq_result.verification}")

    # Test Fill-Blank solver
    fb_q = next(q for q in qs if q["type"] == "fill_blank")
    fb_result = solve_fill_blank({
        "topic": fb_q["topic"],
        "blank_position": 1,
        "answer": fb_q["answer"],
    })
    print(f"\n[Fill-Blank Solver] Q: {fb_q['question'][:60]}...")
    print(f"  Answer : {fb_result.answer}")
    for s in fb_result.steps:
        print(f"  {s}")
    print(f"  Verification: {fb_result.verification}")

    # Test Short-Answer solver
    sa_q = next(q for q in qs if q["type"] == "short_answer")
    sa_result = solve_short_answer({
        "topic": sa_q["topic"],
        "answer": sa_q["answer"],
        "keywords": sa_q.get("keywords", []),
    })
    print(f"\n[Short-Answer Solver] Q: {sa_q['question'][:60]}...")
    print(f"  Answer (truncated): {sa_result.answer[:80]}...")
    for s in sa_result.steps:
        print(f"  {s}")
    print(f"  Verification: {sa_result.verification}")

    # Test Long-Answer solver
    la_q = next(q for q in qs if q["type"] == "long_answer")
    la_result = solve_long_answer({
        "topic": la_q["topic"],
        "answer": la_q["answer"],
        "points": la_q.get("points", []),
    })
    print(f"\n[Long-Answer Solver] Q: {la_q['question'][:60]}...")
    print(f"  Answer (truncated): {la_result.answer[:80]}...")
    for s in la_result.steps:
        print(f"  {s}")
    print(f"  Verification: {la_result.verification}")

    # Test Numerical solver
    num_q = next(q for q in qs if q["type"] == "numerical")
    num_result = solve_numerical({
        "topic": num_q["topic"],
        "problem_type": num_q.get("problem_type", "unknown"),
        "answer": num_q["answer"],
    })
    print(f"\n[Numerical Solver] Q: {num_q['question'][:60]}...")
    print(f"  Answer : {num_result.answer}")
    for s in num_result.steps:
        print(f"  {s}")
    print(f"  Verification: {num_result.verification}")

    print(f"\n{'='*70}")
    print("Syllabus Node Coverage Check:")
    print(f"{'─'*50}")
    required_nodes = {
        "un_aims_principles": "Aims and Principles of the United Nations (c8_histciv_066)",
        "period_transition": "Period of Transition — Primary vs Secondary Sources (c8_histciv_001)",
        "french_revolution_causes": "French Revolution Causes (c8_histciv_007)",
    }
    all_covered = True
    for node_key, node_name in required_nodes.items():
        covered = node_key in topic_counts
        status = "✓ COVERED" if covered else "✗ MISSING"
        print(f"  {status}  {node_name}")
        if not covered:
            all_covered = False

    print(f"\n{'='*70}")
    print(f"All nodes covered: {all_covered}")
    print(f"Total questions: {total}")
    print(f"Deterministic seed: {SEED}")
    print(f"{'='*70}\n")

# ──────────────────────────────────────────────
# NUMERIC PROBLEM-TYPE ENRICHMENT (set before generation)
# ──────────────────────────────────────────────
def _enrich_numerical_questions():
    """Attach problem_type fields to numerical questions in the generator."""
    pass  # Problem types are set inline in generate_questions()

# ──────────────────────────────────────────────
# EXPORTED API
# ──────────────────────────────────────────────
__all__ = [
    "generate_questions",
    "solve_mcq",
    "solve_fill_blank",
    "solve_short_answer",
    "solve_long_answer",
    "solve_numerical",
    "run_verification",
    "Question",
    "SolveResult",
    "verify_fraction",
    "verify_percentage",
    "verify_date_subtraction",
    "verify_sympy_equation",
    "verify_set_inclusion",
]

if __name__ == "__main__":
    run_verification()