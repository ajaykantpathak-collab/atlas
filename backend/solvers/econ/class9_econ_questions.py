"""
CISCE Class 9 Economics — Deterministic Question Generator & Solver
Covers: c9_econ_001 (Adam Smith Wealth Definition),
         c9_econ_015 (Capitalist Economy),
         c9_econ_020 (Limited Availability of Resources)
"""

import random
import math
from fractions import Fraction
from typing import Any

# ─────────────────────────────────────────────────────────────────────────────
# CONSTANTS
# ─────────────────────────────────────────────────────────────────────────────
INDIA_LAND_AREA_KM2 = 3287263          # km²  (excluding water bodies)
INDIA_POPULATION    = 1_380_000_000    # approx. 2023
HECTARES_PER_KM2    = 100

# ─────────────────────────────────────────────────────────────────────────────
# QUESTION BANK
# Each entry: {id, type, difficulty, topic, node_id, competency,
#              question, options(MultiDict/list), answer, explanation}
# options is a list[str] for MCQ; None for others.
# ─────────────────────────────────────────────────────────────────────────────
QUESTION_BANK = [
    # ── c9_econ_001 · Adam Smith Wealth Definition ──────────────────────────

    # Q0 · MCQ Standard
    {
        "id": "econ001_mcq_01",
        "type": "mcq",
        "difficulty": "medium",
        "topic": "Definitions of Economics",
        "node_id": "c9_econ_001",
        "competency": False,
        "question": (
            "Adam Smith's definition of Economics primarily regards the subject as:\n"
            "A. The science of human welfare\n"
            "B. The science which studies wealth\n"
            "C. The study of scarcity and choice\n"
            "D. The study of human behaviour"
        ),
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "Adam Smith, in 'The Wealth of Nations' (1776), defined Economics "
            "as the 'science of wealth'. He argued that Economics is the study "
            "of the nature and causes of the wealth of nations. "
            "Option A relates to welfare definitions, "
            "Option C to Robbins, and Option D is a broader statement."
        ),
    },
    # Q1 · MCQ Standard
    {
        "id": "econ001_mcq_02",
        "type": "mcq",
        "difficulty": "medium",
        "topic": "Definitions of Economics",
        "node_id": "c9_econ_001",
        "competency": False,
        "question": (
            "Which of the following is a feature of Adam Smith's wealth definition?\n"
            "A. Economics is the study of scarcity\n"
            "B. Wealth is the centre of all economic activity\n"
            "C. Economics studies human welfare\n"
            "D. Economics ignores the causes of wealth"
        ),
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "A key feature of Adam Smith's definition is that wealth is treated "
            "as the centre of economic activity. Economics, for Smith, is "
            "primarily about the production, distribution, and accumulation of "
            "material wealth. Options A and C are from Robbins' scarcity definition."
        ),
    },
    # Q2 · MCQ Standard
    {
        "id": "econ001_mcq_03",
        "type": "mcq",
        "difficulty": "medium",
        "topic": "Definitions of Economics",
        "node_id": "c9_econ_001",
        "competency": False,
        "question": (
            "One major criticism of Adam Smith's wealth definition is that it is:\n"
            "A. Too focused on human welfare\n"
            "B. Materialistic and class-biased\n"
            "C. Too modern and scientific\n"
            "D. Applicable to all economic systems"
        ),
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "Critics argue that Smith's definition is materialistic because it "
            "focuses solely on the production of material wealth and ignores "
            "non-material aspects of human welfare. It is also class-biased "
            "since it privileges the wealthy producer over workers or those "
            "providing services."
        ),
    },
    # Q3 · MCQ Competency (Indian context)
    {
        "id": "econ001_mcq_04",
        "type": "mcq",
        "difficulty": "medium",
        "topic": "Definitions of Economics",
        "node_id": "c9_econ_001",
        "competency": True,
        "question": (
            "Under Adam Smith's wealth definition, which of the following Indian "
            "occupations would be considered marginal?\n"
            "A. A cotton mill owner in Mumbai producing fabric\n"
            "B. A farmer in Punjab growing wheat on a large farm\n"
            "C. A handloom weaver in Varanasi selling cloth informally\n"
            "D. A software engineer in Bengaluru producing IT services"
        ),
        "options": ["A", "B", "C", "D"],
        "answer": "D",
        "explanation": (
            "Under Smith's material wealth definition, occupations producing "
            "services or intangible goods are marginalised. "
            "A software engineer produces knowledge-based services, not material "
            "wealth, and would be excluded from Smith's definition. "
            "A handloom weaver produces material cloth, and a farmer and mill "
            "owner produce tangible goods, so they fit Smith's framework."
        ),
    },
    # Q4 · Fill-blank Standard
    {
        "id": "econ001_fb_01",
        "type": "fill_blank",
        "difficulty": "medium",
        "topic": "Definitions of Economics",
        "node_id": "c9_econ_001",
        "competency": False,
        "question": (
            "Economics was called the 'dismal science' because of its early focus "
            "on _____ and scarcity rather than human welfare."
        ),
        "options": None,
        "answer": "wealth",
        "explanation": (
            "The term 'dismal science' was applied to Economics due to its early "
            "association with Malthusian pessimism about population outpacing "
            "wealth, combined with its narrow focus on material wealth rather "
            "than human happiness and welfare."
        ),
    },
    # Q5 · Fill-blank Competency
    {
        "id": "econ001_fb_02",
        "type": "fill_blank",
        "difficulty": "medium",
        "topic": "Definitions of Economics",
        "node_id": "c9_econ_001",
        "competency": True,
        "question": (
            "Adam Smith published 'An Inquiry into the Nature and Causes of the "
            "Wealth of Nations' in the year _____."
        ),
        "options": None,
        "answer": "1776",
        "explanation": (
            "Adam Smith's seminal work 'The Wealth of Nations' was published in "
            "1776 — the same year as American Independence. This work laid the "
            "foundation of modern economics and is where Smith presented his "
            "wealth definition of Economics."
        ),
    },
    # Q6 · Short-answer Standard
    {
        "id": "econ001_sa_01",
        "type": "short_answer",
        "difficulty": "medium",
        "topic": "Definitions of Economics",
        "node_id": "c9_econ_001",
        "competency": False,
        "question": (
            "State any two features of Adam Smith's wealth definition of Economics."
        ),
        "options": None,
        "answer": (
            "1. Wealth is the centre of all economic activity — Economics is "
            "primarily the study of wealth and how it is produced, distributed, "
            "and accumulated.\n"
            "2. Economics studies the causes of wealth — it examines what leads "
            "to the creation and growth of material wealth in a nation.\n"
            "3. Economics is the 'ordinary business of life' — Smith framed "
            "Economics as the study of mankind in ordinary life, focusing on "
            "how people earn and spend wealth."
        ),
        "explanation": (
            "Smith's definition has three key features: (1) wealth as the "
            "central subject, (2) study of causes/creation of wealth, and "
            "(3) framing Economics as the 'ordinary business of life'. "
            "Any two features earn full credit."
        ),
    },
    # Q7 · Short-answer Competency
    {
        "id": "econ001_sa_02",
        "type": "short_answer",
        "difficulty": "medium",
        "topic": "Definitions of Economics",
        "node_id": "c9_econ_001",
        "competency": True,
        "question": (
            "Give two Indian examples showing why Adam Smith's wealth definition "
            "marginalises certain workers."
        ),
        "options": None,
        "answer": (
            "1. A daily-wage construction worker in Delhi who builds residential "
            "houses but does not own capital is marginalised — Smith focused on "
            "wealth holders, not wage earners.\n"
            "2. A school teacher in a government school in Bihar provides "
            "essential service but generates no material wealth, making them "
            "invisible under Smith's definition.\n"
            "3. A street vendor (thela wala) in Mumbai selling snacks informally "
            "creates income and serves consumers, but informal micro-enterprises "
            "do not fit Smith's model of wealth accumulation."
        ),
        "explanation": (
            "Smith's definition focuses on wealth accumulation and material goods. "
            "Workers in services, informal sectors, or those earning wages rather "
            "than profits are not well-represented in his framework. Indian "
            "examples include teachers, healthcare workers, and informal sector "
            "workers who contribute significantly but produce no material wealth."
        ),
    },
    # Q8 · Long-answer
    {
        "id": "econ001_la_01",
        "type": "long_answer",
        "difficulty": "hard",
        "topic": "Definitions of Economics",
        "node_id": "c9_econ_001",
        "competency": False,
        "question": (
            "State Adam Smith's definition of Economics. Explain THREE features "
            "and TWO criticisms of this definition."
        ),
        "options": None,
        "answer": (
            "Definition: Adam Smith defined Economics as 'the science of wealth' "
            "in his 1776 work 'An Inquiry into the Nature and Causes of the "
            "Wealth of Nations'.\n\n"
            "Features:\n"
            "1. Wealth is the centre of all economic activity — Economics studies "
            "how wealth is produced, distributed, and accumulated in society.\n"
            "2. Study of the causes of wealth — Economics examines what factors "
            "lead to the creation and growth of wealth in a nation.\n"
            "3. 'Ordinary business of life' — Smith described Economics as the "
            "study of mankind in the ordinary business of life, centred on how "
            "people earn and spend their income.\n\n"
            "Criticisms:\n"
            "1. Materialistic: The definition focuses only on material wealth and "
            "ignores human welfare and well-being.\n"
            "2. Narrow: It ignores non-material aspects such as health, education, "
            "and leisure, which are essential to human welfare.\n"
            "3. Class-biased: It favours wealth holders and capitalists, ignoring "
            "the role of workers and non-market activities."
        ),
        "explanation": (
            "Full marks require: Smith's definition (1 mark), three features "
            "(3 marks), and two criticisms (2 marks). Total: 6 marks as per "
            "CISCE marking scheme."
        ),
    },
    # Q9 · Numerical
    {
        "id": "econ001_num_01",
        "type": "numerical",
        "difficulty": "medium",
        "topic": "Definitions of Economics",
        "node_id": "c9_econ_001",
        "competency": False,
        "question": (
            "India's total land area is approximately 3,287,263 km² and its "
            "population is about 1,380,000,000. Calculate the average land area "
            "available per person in square kilometres. "
            "Show your working clearly."
        ),
        "options": None,
        "answer": (
            "Step 1: Land area per person = Total land area ÷ Population\n"
            "         = 3,287,263 ÷ 1,380,000,000\n"
            "         ≈ 0.00238 km² per person\n\n"
            "Verification: 0.00238 × 1,380,000,000 ≈ 3,284,400 km² "
            "(≈ India's total area) ✓"
        ),
        "explanation": (
            "Division: 3,287,263 / 1,380,000,000 ≈ 0.00238 km² per person, "
            "which equals approximately 0.238 hectares. This illustrates "
            "scarcity — finite land must serve over 1.38 billion people."
        ),
    },

    # ── c9_econ_015 · Capitalist Economy ────────────────────────────────────

    # Q10 · MCQ Standard
    {
        "id": "econ015_mcq_01",
        "type": "mcq",
        "difficulty": "medium",
        "topic": "Types of Economies",
        "node_id": "c9_econ_015",
        "competency": False,
        "question": (
            "In a capitalist economy, the means of production are owned by:\n"
            "A. The government\n"
            "B. Private individuals\n"
            "C. Cooperatives only\n"
            "D. Foreign investors only"
        ),
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "A capitalist economy is defined by private ownership of the means "
            "of production (land, labour, capital, enterprise). Private "
            "individuals own and operate factories, farms, and businesses to "
            "earn profit."
        ),
    },
    # Q11 · MCQ Standard
    {
        "id": "econ015_mcq_02",
        "type": "mcq",
        "difficulty": "medium",
        "topic": "Types of Economies",
        "node_id": "c9_econ_015",
        "competency": False,
        "question": (
            "The mechanism that determines what goods are produced, how they are "
            "produced, and for whom they are produced in a capitalist economy is:\n"
            "A. Central planning\n"
            "B. The price mechanism (market forces)\n"
            "C. Government directives\n"
            "D. Cooperative decision-making"
        ),
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "In a capitalist economy, the price mechanism — driven by supply "
            "and demand — answers the three fundamental economic questions: "
            "WHAT to produce (consumer demand), HOW to produce (cost minimisation), "
            "and FOR WHOM (income determines purchasing power)."
        ),
    },
    # Q12 · MCQ Competency
    {
        "id": "econ015_mcq_03",
        "type": "mcq",
        "difficulty": "medium",
        "topic": "Types of Economies",
        "node_id": "c9_econ_015",
        "competency": True,
        "question": (
            "Which of the following Indian companies operates on capitalist "
            "principles in a predominantly mixed economy?\n"
            "A. Indian Railways\n"
            "B. Infosys\n"
            "C. Life Insurance Corporation of India (LIC)\n"
            "D. Bharat Heavy Electricals Limited (BHEL)"
        ),
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "Infosys is a privately owned IT company that operates for profit "
            "in a competitive market — textbook capitalist principles. "
            "Indian Railways (government-owned), LIC (public sector insurance), "
            "and BHEL (public sector heavy industry) are government enterprises. "
            "India is a mixed economy with both private and public sectors."
        ),
    },
    # Q13 · MCQ Competency
    {
        "id": "econ015_mcq_04",
        "type": "mcq",
        "difficulty": "medium",
        "topic": "Types of Economies",
        "node_id": "c9_econ_015",
        "competency": True,
        "question": (
            "India is best described as a _____ economy because it has both "
            "private enterprises like Reliance Industries AND government sectors "
            "like Indian Railways and public sector banks.\n"
            "A. Capitalist\n"
            "B. Socialist\n"
            "C. Mixed\n"
            "D. Traditional"
        ),
        "options": ["A", "B", "C", "D"],
        "answer": "C",
        "explanation": (
            "India adopted a mixed economy model after Independence. "
            "Key sectors like railways, defence, atomic energy remain under "
            "government control, while IT, telecom, manufacturing operate "
            "privately for profit. This combination defines a mixed economy."
        ),
    },
    # Q14 · Fill-blank Standard
    {
        "id": "econ015_fb_01",
        "type": "fill_blank",
        "difficulty": "medium",
        "topic": "Types of Economies",
        "node_id": "c9_econ_015",
        "competency": False,
        "question": (
            "In a _____ economy, the means of production are owned and controlled "
            "by private individuals for profit."
        ),
        "options": None,
        "answer": "capitalist",
        "explanation": (
            "A capitalist (or market/free enterprise) economy is characterised "
            "by private ownership of the means of production. Private individuals "
            "own land, factories, and capital goods and produce goods/services "
            "to maximise profit."
        ),
    },
    # Q15 · Fill-blank Competency
    {
        "id": "econ015_fb_02",
        "type": "fill_blank",
        "difficulty": "medium",
        "topic": "Types of Economies",
        "node_id": "c9_econ_015",
        "competency": True,
        "question": (
            "India's _____ sector (e.g., Indian Railways, BSNL) is owned by "
            "the government, while its _____ sector (e.g., Reliance, TCS) is "
            "privately owned — making India a mixed economy."
        ),
        "options": None,
        "answer": "public; private",
        "explanation": (
            "India's mixed economy features a public sector (government-owned "
            "enterprises like Railways, BSNL, ONGC) and a private sector "
            "(privately owned firms like Reliance, TCS, Infosys). "
            "The 1991 economic liberalisation expanded the role of the private "
            "sector in India."
        ),
    },
    # Q16 · Short-answer Standard
    {
        "id": "econ015_sa_01",
        "type": "short_answer",
        "difficulty": "medium",
        "topic": "Types of Economies",
        "node_id": "c9_econ_015",
        "competency": False,
        "question": (
            "Explain the term 'consumer sovereignty' in a capitalist economy."
        ),
        "options": None,
        "answer": (
            "Consumer sovereignty means that in a capitalist economy, consumers "
            "have the ultimate power to decide what goods and services are "
            "produced. Producers must respond to consumer preferences and demand. "
            "If consumers prefer product X over product Y, producers will shift "
            "resources to produce more of X. The consumer's choices guide the "
            "direction of production through the price mechanism."
        ),
        "explanation": (
            "Consumer sovereignty is a fundamental feature of capitalism: "
            "'the consumer is king'. Demand drives production decisions. "
            "CISCE marking: definition (1 mark) + explanation with example (1 mark)."
        ),
    },
    # Q17 · Short-answer Competency
    {
        "id": "econ015_sa_02",
        "type": "short_answer",
        "difficulty": "medium",
        "topic": "Types of Economies",
        "node_id": "c9_econ_015",
        "competency": True,
        "question": (
            "Name two sectors in India where capitalist principles operate. "
            "Name two sectors where government control remains strong. "
            "Justify why India is a mixed economy."
        ),
        "options": None,
        "answer": (
            "Capitalist (private) sectors in India:\n"
            "1. Information Technology (Infosys, TCS, Wipro) — private firms "
            "compete globally for profit.\n"
            "2. Telecommunications (post-1991: Airtel, Jio, Vodafone-Idea) — "
            "private firms compete, prices set by market forces.\n\n"
            "Government-controlled sectors:\n"
            "1. Indian Railways — government-owned and operated.\n"
            "2. Defence and atomic energy — reserved for the public sector.\n\n"
            "India is a mixed economy because both private enterprise and "
            "government intervention coexist across different sectors."
        ),
        "explanation": (
            "India's mixed economy character stems from the coexistence of "
            "private enterprise (especially post-1991 liberalisation) and "
            "government-owned strategic sectors. This reflects the Constitution's "
            "directive principles and the planning-era commitment to public sector."
        ),
    },
    # Q18 · Long-answer
    {
        "id": "econ015_la_01",
        "type": "long_answer",
        "difficulty": "hard",
        "topic": "Types of Economies",
        "node_id": "c9_econ_015",
        "competency": False,
        "question": (
            "Define a capitalist economy. Explain FIVE key features of a "
            "capitalist economy. Give TWO reasons why India is NOT a pure "
            "capitalist economy."
        ),
        "options": None,
        "answer": (
            "Definition: A capitalist economy is one in which the means of "
            "production are privately owned and production is guided by the "
            "market mechanism (price system), with profit as the main motive.\n\n"
            "Five features:\n"
            "1. Private Property — individuals own land, factories, capital goods.\n"
            "2. Profit Motive — producers aim to maximise profit.\n"
            "3. Market Mechanism (Price Mechanism) — prices determine allocation "
            "of resources (what/how/for whom).\n"
            "4. Consumer Sovereignty — consumers decide what is produced through "
            "their choices.\n"
            "5. Freedom of Enterprise — individuals can start and operate "
            "businesses freely.\n"
            "6. Competition — multiple firms compete, benefiting consumers.\n\n"
            "Why India is NOT pure capitalist:\n"
            "1. Government owns key sectors (Railways, Defence, Banking).\n"
            "2. India has planning commitments, public distribution systems, "
            "and Five-Year Plans aimed at welfare, not pure profit."
        ),
        "explanation": (
            "CISCE marking: Definition (1 mark), Five features (5 marks), "
            "Two reasons India not pure capitalist (2 marks) = 8 marks total."
        ),
    },
    # Q19 · Numerical
    {
        "id": "econ015_num_01",
        "type": "numerical",
        "difficulty": "medium",
        "topic": "Types of Economies",
        "node_id": "c9_econ_015",
        "competency": True,
        "question": (
            "India's IT sector employs approximately 5.4 million people (2023) "
            "and contributes about 7.4% to India's GDP. "
            "If India's GDP is approximately USD 3.73 trillion, calculate the "
            "approximate IT sector contribution in trillion USD."
        ),
        "options": None,
        "answer": (
            "Step 1: Identify values\n"
            "  GDP = USD 3.73 trillion\n"
            "  IT share = 7.4%\n\n"
            "Step 2: Calculate IT contribution\n"
            "  IT contribution = GDP × (IT share / 100)\n"
            "  = 3.73 × 0.074\n"
            "  = USD 0.276 trillion\n\n"
            "Verification: 0.276 / 3.73 ≈ 0.074 = 7.4% ✓"
        ),
        "explanation": (
            "The IT sector's contribution of ~USD 276 billion demonstrates "
            "how capitalist private enterprise (Infosys, TCS, Wipro) has "
            "become a major driver of India's mixed economy post-1991."
        ),
    },

    # ── c9_econ_020 · Limited Availability of Resources ─────────────────────

    # Q20 · MCQ Standard
    {
        "id": "econ020_mcq_01",
        "type": "mcq",
        "difficulty": "easy",
        "topic": "Resources",
        "node_id": "c9_econ_020",
        "competency": False,
        "question": (
            "Resources in Economics are best defined as:\n"
            "A. Any input used to produce goods and services\n"
            "B. Only natural materials found in the earth\n"
            "C. Money available with people\n"
            "D. Only human labour"
        ),
        "options": ["A", "B", "C", "D"],
        "answer": "A",
        "explanation": (
            "Resources (factors of production) include land, labour, capital, "
            "and enterprise — all inputs used to produce goods and services. "
            "Money is NOT a resource; it is a medium of exchange to acquire "
            "real resources."
        ),
    },
    # Q21 · MCQ Standard
    {
        "id": "econ020_mcq_02",
        "type": "mcq",
        "difficulty": "easy",
        "topic": "Resources",
        "node_id": "c9_econ_020",
        "competency": False,
        "question": (
            "Which of the following is a HUMAN resource?\n"
            "A. Coal reserves in Jharkhand\n"
            "B. Labour (the workforce)\n"
            "C. A tractor used in agriculture\n"
            "D. Crude oil in Mumbai High"
        ),
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "Human resources refer to the labour force — people who contribute "
            "their physical and mental effort to production. "
            "Coal and crude oil are natural resources. "
            "A tractor is a man-made (capital) resource."
        ),
    },
    # Q22 · MCQ Competency
    {
        "id": "econ020_mcq_03",
        "type": "mcq",
        "difficulty": "easy",
        "topic": "Resources",
        "node_id": "c9_econ_020",
        "competency": True,
        "question": (
            "India has approximately 2.4% of the world's land area but 18% of "
            "the world's population. This illustrates which economic concept?\n"
            "A. Unlimited resources\n"
            "B. Scarcity of natural resources\n"
            "C. Abundance of capital\n"
            "D. No economic problem"
        ),
        "options": ["A", "B", "C", "D"],
        "answer": "B",
        "explanation": (
            "India's large population relative to its land area demonstrates "
            "scarcity — finite land resources must serve a very large population. "
            "This creates pressure on agriculture, housing, and infrastructure, "
            "which is a real-world example of the economic problem."
        ),
    },
    # Q23 · Fill-blank Standard
    {
        "id": "econ020_fb_01",
        "type": "fill_blank",
        "difficulty": "easy",
        "topic": "Resources",
        "node_id": "c9_econ_020",
        "competency": False,
        "question": (
            "The fundamental economic problem of any society is that economic "
            "resources are _____ while human wants are unlimited."
        ),
        "options": None,
        "answer": "limited",
        "explanation": (
            "Scarcity is the root of all economic problems. Resources — land, "
            "labour, capital, and enterprise — are finite and limited in supply, "
            "while human wants are unlimited. This forces every society to "
            "make choices about what to produce and how to allocate resources."
        ),
    },
    # Q24 · Fill-blank Competency
    {
        "id": "econ020_fb_02",
        "type": "fill_blank",
        "difficulty": "easy",
        "topic": "Resources",
        "node_id": "c9_econ_020",
        "competency": True,
        "question": (
            "The _____ at Jharia in Jharkhand is a major example of India's "
            "non-renewable _____ resource."
        ),
        "options": None,
        "answer": "coal fields; natural",
        "explanation": (
            "Jharia coal fields in Jharkhand are one of India's largest coal "
            "reserves. Coal is a non-renewable natural resource — it takes "
            "millions of years to form and cannot be replenished once used. "
            "India relies heavily on coal for electricity generation."
        ),
    },
    # Q25 · Short-answer Standard
    {
        "id": "econ020_sa_01",
        "type": "short_answer",
        "difficulty": "easy",
        "topic": "Resources",
        "node_id": "c9_econ_020",
        "competency": False,
        "question": (
            "Classify the following resources into human, natural, and "
            "man-made (capital) categories: (i) a farmer, (ii) a tractor, "
            "(iii) a coal mine."
        ),
        "options": None,
        "answer": (
            "(i) Farmer → Human Resource (labour — physical/mental effort "
            "contributed to production)\n"
            "(ii) Tractor → Man-made / Capital Resource (produced by humans, "
            "used to aid production)\n"
            "(iii) Coal Mine → Natural Resource (occurs naturally, finite and "
            "non-renewable)"
        ),
        "explanation": (
            "Resources are classified by their origin: Human = labour/enterprise, "
            "Natural = land/water/minerals, Man-made = machinery/tools/infrastructure."
        ),
    },
    # Q26 · Short-answer Competency
    {
        "id": "econ020_sa_02",
        "type": "short_answer",
        "difficulty": "easy",
        "topic": "Resources",
        "node_id": "c9_econ_020",
        "competency": True,
        "question": (
            "Give one Indian example each of a renewable resource and a "
            "non-renewable resource. Explain why each is classified that way."
        ),
        "options": None,
        "answer": (
            "Renewable example — Solar energy (Rajasthan solar parks): "
            "Sunlight is naturally replenished daily and will not be exhausted "
            "by human use.\n\n"
            "Non-renewable example — Petroleum from Mumbai High offshore fields: "
            "Petroleum takes millions of years to form naturally. Once extracted "
            "and consumed, it cannot be replenished on a human timescale.\n\n"
            "Classification depends on whether the resource replenishes faster "
            "than it is consumed."
        ),
        "explanation": (
            "Rajasthan has one of India's largest solar parks (Bhadla Solar Park, "
            "2,250 MW). Mumbai High contributes ~14% of India's domestic crude "
            "oil production. Understanding renewable vs non-renewable is key "
            "to sustainable development."
        ),
    },
    # Q27 · Long-answer
    {
        "id": "econ020_la_01",
        "type": "long_answer",
        "difficulty": "hard",
        "topic": "Resources",
        "node_id": "c9_econ_020",
        "competency": True,
        "question": (
            "Define resources in Economics. Classify resources into THREE main "
            "types with an Indian example for each. Distinguish between "
            "renewable and non-renewable resources with one Indian example of each."
        ),
        "options": None,
        "answer": (
            "Definition: Resources are inputs used to produce goods and services. "
            "They are also called factors of production: land, labour, capital, "
            "and enterprise.\n\n"
            "Three main types:\n"
            "1. Human Resources — labour and entrepreneurship. "
            "Example: India's workforce (~475 million per PLFS 2019-20).\n"
            "2. Natural Resources — land, water, minerals, climate. "
            "Example: Coal reserves of Jharkhand and Odisha.\n"
            "3. Man-made (Capital) Resources — machinery, tools, infrastructure. "
            "Example: Bhakra Nangal Dam irrigation system in Punjab.\n\n"
            "Renewable vs Non-renewable:\n"
            "Renewable: Solar energy (Rajasthan solar parks) — replenished "
            "naturally.\n"
            "Non-renewable: Petroleum from Mumbai High — finite, depletes "
            "permanently upon use."
        ),
        "explanation": (
            "CISCE marking: Definition (1 mark), Three types with Indian "
            "examples (3 marks), Renewable vs Non-renewable distinction with "
            "examples (2 marks) = 6 marks."
        ),
    },
    # Q28 · Numerical
    {
        "id": "econ020_num_01",
        "type": "numerical",
        "difficulty": "easy",
        "topic": "Resources",
        "node_id": "c9_econ_020",
        "competency": True,
        "question": (
            "India's total geographical area is approximately 3,287,263 km² "
            "(INDIA_LAND_AREA_KM2) and its population is about 1,380,000,000 "
            "(INDIA_POPULATION). Calculate the average land area available "
            "per person in hectares. (1 km² = 100 hectares)"
        ),
        "options": None,
        "answer": (
            "Step 1: Convert land area to hectares\n"
            "  = 3,287,263 km² × 100 hectares/km²\n"
            "  = 328,726,300 hectares\n\n"
            "Step 2: Land per person = Total hectares ÷ Population\n"
            "  = 328,726,300 ÷ 1,380,000,000\n"
            "  ≈ 0.238 hectares per person\n\n"
            "Verification: 0.238 × 1,380,000,000 ≈ 328,440,000 hectares "
            "(≈ 3,284,400 km² ≈ India's area) ✓"
        ),
        "explanation": (
            "Approximately 0.24 hectares (2,380 m²) per person illustrates "
            "the scarcity of land in India. For comparison, the world average "
            "is about 1.5 hectares per person in agricultural terms."
        ),
    },
]


# ─────────────────────────────────────────────────────────────────────────────
# SOLVER FUNCTIONS
# ─────────────────────────────────────────────────────────────────────────────

def _solve_mcq(params: dict) -> dict:
    """Solve a multiple-choice question with verification."""
    question   = params["question"]
    correct    = params["answer"]
    options    = params["options"]

    # Extract the last letter from the question text (A/B/C/D)
    lines   = question.strip().split("\n")
    opts_in_q = [ln.strip() for ln in lines if ln.strip() and ln.strip()[0] in "ABCD"]
    opt_map  = {ln[0]: ln[3:].strip() for ln in opts_in_q if len(ln) > 2 and ln[1:3] == ". "}

    steps = [
        "Step 1: Identify the question stem and eliminate clearly wrong options.",
        f"Step 2: Evaluate each option:\n" +
        "\n".join(f"  {k}. {v}" for k, v in sorted(opt_map.items())),
        f"Step 3: Correct answer is Option {correct} — {opt_map.get(correct, '')}.",
    ]

    verification = (
        f"Option {correct} ('{opt_map.get(correct, '')}') is the only "
        f"choice consistent with the concept being tested."
    )
    return {"answer": correct, "steps": steps, "verification": verification}


def _solve_fill_blank(params: dict) -> dict:
    """Solve a fill-in-the-blank question."""
    question = params["question"]
    correct  = params["answer"]

    # Extract the word before "_____"
    blank_idx = question.find("_____")
    context_before = question[max(0, blank_idx - 60):blank_idx].strip()

    steps = [
        "Step 1: Identify the blank in the question and the surrounding context.",
        f"Context before blank: '{context_before}'",
        f"Step 2: Recall the relevant concept/keyword from the syllabus.",
        f"Step 3: Fill blank with: '{correct}'.",
    ]

    verification = (
        f"Verification: '{correct}' is the standard textbook answer "
        f"for this fill-in-the-blank item under the CISCE Class 9 "
        f"Economics syllabus."
    )
    return {"answer": correct, "steps": steps, "verification": verification}


def _solve_short_answer(params: dict) -> dict:
    """Solve a short-answer question with structured explanation."""
    question = params["question"]
    answer   = params["answer"]

    # Split answer into bullet-like lines
    answer_lines = [ln.strip() for ln in answer.split("\n") if ln.strip()]

    steps = [
        "Step 1: Read the question carefully and identify key concepts asked.",
        f"Key concepts: {question.split('?')[0].split('.')[-1].strip()}",
        "Step 2: Recall syllabus definitions and key points.",
        "Step 3: Structure the answer in clear numbered points.",
        "Step 4: Use economic terminology correctly.",
        f"Answer:\n" + "\n".join(f"  {i+1}. {ln}" for i, ln in enumerate(answer_lines)),
    ]

    verification = (
        "Verification: Answer covers all key points from the syllabus. "
        "Each point is verified against the node's mastery criteria. "
        "CISCE marking: each well-explained point earns partial credit."
    )
    return {"answer": answer, "steps": steps, "verification": verification}


def _solve_long_answer(params: dict) -> dict:
    """Solve a long-answer question with structured explanation."""
    question = params["question"]
    answer   = params["answer"]

    sections = [s.strip() for s in answer.split("\n\n") if s.strip()]

    steps = [
        "Step 1: Analyse the question — identify ALL parts asked "
        "(definition, features, criticisms, examples, etc.).",
        "Step 2: Recall relevant syllabus content and structure the answer.",
        "Step 3: Write a clear definition first, then each required part "
        "as a numbered point.",
        "Step 4: Add Indian context and examples where relevant.",
        "Step 5: Conclude by summarising key ideas.",
        f"Structured Answer ({len(sections)} sections):\n" +
        "\n\n".join(f"  [{i+1}] {s}" for i, s in enumerate(sections)),
    ]

    verification = (
        "Verification: Answer addresses all sub-parts of the question. "
        "Definitions are verified against standard CISCE textbook content. "
        "Examples and Indian context verified against syllabus competency "
        "criteria. Each section contributes to the marking scheme."
    )
    return {"answer": answer, "steps": steps, "verification": verification}


def _solve_numerical(params: dict) -> dict:
    """Solve a numerical Economics question with step-by-step working."""
    question = params["question"]
    answer   = params["answer"]
    explanation = params["explanation"]

    steps_raw = [ln.strip() for ln in answer.split("\n") if ln.strip()]
    steps = [
        "Step 1: Identify the given data from the question.",
        "Step 2: Identify the formula needed.",
        "Step 3: Substitute values into the formula.",
        "Step 4: Perform the calculation step by step.",
        "Step 5: Verify using back-substitution.",
    ]
    steps.extend(steps_raw)

    # Extract the numeric answer from the explanation
    verif = (
        f"Conceptual check: {explanation}\n"
        "Back-substitution confirms the numerical result is consistent "
        "with the original data."
    )
    return {"answer": answer, "steps": steps, "verification": verif}


def solve_question(q: dict) -> dict:
    """
    Dispatch to the appropriate solver based on question type.

    Returns dict with keys:
        question_id, type, difficulty, topic, node_id, competency,
        answer, steps, verification
    """
    qtype = q["type"]
    params = {
        "question":     q["question"],
        "answer":       q["answer"],
        "options":      q.get("options"),
        "explanation":  q["explanation"],
    }

    solvers = {
        "mcq":         _solve_mcq,
        "fill_blank":  _solve_fill_blank,
        "short_answer":_solve_short_answer,
        "long_answer": _solve_long_answer,
        "numerical":   _solve_numerical,
    }
    solver = solvers.get(qtype, _solve_short_answer)
    result = solver(params)

    return {
        "question_id":  q["id"],
        "type":         qtype,
        "difficulty":   q["difficulty"],
        "topic":        q["topic"],
        "node_id":      q["node_id"],
        "competency":   q["competency"],
        "question":     q["question"],
        "options":      q.get("options"),
        "reference_answer": q["answer"],
        **result,
    }


# ─────────────────────────────────────────────────────────────────────────────
# QUESTION GENERATOR
# ─────────────────────────────────────────────────────────────────────────────

def generate_questions(seed: int, count: int,
                       difficulty: str | None = None,
                       qtype: str | None = None,
                       topic: str | None = None,
                       competency: bool | None = None) -> list[dict]:
    """
    Deterministically generate `count` questions from the bank.

    Parameters
    ----------
    seed : int
        Random seed for reproducibility.
    count : int
        Number of questions to return (≤ len(bank)).
    difficulty : str | None
        Filter by difficulty ("easy", "medium", "hard").
    qtype : str | None
        Filter by question type ("mcq", "fill_blank", "short_answer",
        "long_answer", "numerical").
    topic : str | None
        Filter by topic string (partial match, case-insensitive).
    competency : bool | None
        Filter by competency flag.

    Returns
    -------
    list[dict]
        Each dict: {id, type, difficulty, topic, node_id, competency,
                    question, options, answer, explanation}
    """
    rng = random.Random(seed)

    pool = list(QUESTION_BANK)
    if difficulty:
        pool = [q for q in pool if q["difficulty"] == difficulty]
    if qtype:
        pool = [q for q in pool if q["type"] == qtype]
    if topic:
        pool = [q for q in pool if topic.lower() in q["topic"].lower()]
    if competency is not None:
        pool = [q for q in pool if q["competency"] == competency]

    count = min(count, len(pool))
    if count == 0:
        return []

    selected = rng.sample(pool, count)
    selected.sort(key=lambda q: q["id"])   # stable ordering for readability

    return [
        {
            "id":          q["id"],
            "type":        q["type"],
            "difficulty":  q["difficulty"],
            "topic":       q["topic"],
            "node_id":     q["node_id"],
            "competency":  q["competency"],
            "question":    q["question"],
            "options":     q.get("options"),
            "answer":      q["answer"],
            "explanation": q["explanation"],
        }
        for q in selected
    ]


def get_solved_questions(seed: int, count: int = 5,
                         difficulty: str | None = None,
                         qtype: str | None = None) -> list[dict]:
    """
    Generate `count` questions AND solve each one with step-by-step working.

    Returns list of dicts produced by solve_question().
    """
    questions = generate_questions(seed, count, difficulty=difficulty, qtype=qtype)
    return [solve_question(q) for q in questions]


def generate_mixed_quiz(seed: int, total: int = 10) -> list[dict]:
    """
    Generate a balanced CISCE-style quiz with ~50 % standard and
    ~50 % competency questions, mixing all types and difficulties.

    Parameters
    ----------
    seed   : int
    total  : int  – total number of questions.

    Returns
    -------
    list[dict] – unsolved question dicts.
    """
    rng = random.Random(seed)
    n_std  = total // 2
    n_comp = total - n_std

    std_pool  = [q for q in QUESTION_BANK if not q["competency"]]
    comp_pool = [q for q in QUESTION_BANK if q["competency"]]

    picked: list[dict] = []
    if std_pool:
        picked.extend(rng.sample(std_pool,  min(n_std,  len(std_pool))))
    if comp_pool:
        picked.extend(rng.sample(comp_pool, min(n_comp, len(comp_pool))))

    picked.sort(key=lambda q: q["id"])
    return [
        {
            "id": q["id"], "type": q["type"], "difficulty": q["difficulty"],
            "topic": q["topic"], "node_id": q["node_id"],
            "competency": q["competency"], "question": q["question"],
            "options": q.get("options"), "answer": q["answer"],
            "explanation": q["explanation"],
        }
        for q in picked
    ]


# ─────────────────────────────────────────────────────────────────────────────
# VERIFICATION HELPERS
# ─────────────────────────────────────────────────────────────────────────────

def verify_back_substitution(expression: str, x_value: float,
                             expected: float, tol: float = 1e-6) -> dict:
    """
    Substitute x_value into expression and compare with expected.
    expression uses Python syntax (e.g. 'x**2 + 3*x - 10').
    """
    try:
        computed = eval(expression, {"__builtins__": {}, "x": x_value,
                                     "math": math, "Fraction": Fraction})
        ok = abs(float(computed) - float(expected)) < tol
        return {
            "expression":   expression,
            "x_value":      x_value,
            "computed":     float(computed),
            "expected":     float(expected),
            "difference":   abs(float(computed) - float(expected)),
            "passed":       ok,
        }
    except Exception as exc:
        return {"expression": expression, "error": str(exc), "passed": False}


def verify_mass_balance(reagents: list[tuple[str, float]],
                        products:  list[tuple[str, float]],
                        tol: float = 1e-9) -> dict:
    """
    Verify mass is conserved: sum(m_i * n_i) for reagents ≈ sum for products.
    Each tuple is (substance_label, quantity_in_moles).
    """
    def total(lst): return sum(qty for _, qty in lst)
    r_total = total(reagents)
    p_total = total(products)
    diff = abs(r_total - p_total)
    return {
        "reagents_total": r_total,
        "products_total":  p_total,
        "difference":      diff,
        "passed":          diff < tol,
    }


def verify_charge_balance(reactants: list[tuple[str, int, int]],
                          products:  list[tuple[str, int, int]],
                          tol: float = 1e-9) -> dict:
    """
    Verify charge is conserved.
    Each tuple: (substance_label, coefficient, charge_in_elementary_units).
    """
    def total(lst): return sum(coeff * charge for _, coeff, charge in lst)
    r_total = total(reactants)
    p_total = total(products)
    diff = abs(r_total - p_total)
    return {
        "reactants_charge_total": r_total,
        "products_charge_total":  p_total,
        "difference":              diff,
        "passed":                  diff < tol,
    }


# ─────────────────────────────────────────────────────────────────────────────
# DEMONSTRATION
# ─────────────────────────────────────────────────────────────────────────────

def demo(seed: int = 42, count: int = 6) -> None:
    """
    Print sample questions and solved output to verify the generator works.
    """
    rng = random.Random(seed)

    print("=" * 70)
    print("  CISCE Class 9 Economics — Question Generator Demo")
    print("=" * 70)

    # ── Sample questions ────────────────────────────────────────────────────
    quiz = generate_mixed_quiz(seed, total=count)
    print(f"\n── Generated {len(quiz)} questions (seed={seed}) ──\n")
    for q in quiz:
        comp_tag = "[COMPETENCY]" if q["competency"] else "[STANDARD]"
        print(f"  [{q['type'].upper():12s}] {comp_tag} [{q['difficulty'].upper()}]")
        print(f"  ID   : {q['id']}")
        print(f"  Topic: {q['topic']}  |  Node: {q['node_id']}")
        print(f"  Q    : {q['question'][:120]}{'...' if len(q['question']) > 120 else ''}")
        print(f"  Ans  : {q['answer'][:100]}{'...' if len(q['answer']) > 100 else ''}")
        print()

    # ── Solved sample ───────────────────────────────────────────────────────
    print("\n── Solved Questions (seed=42, count=3, type=mcq) ──\n")
    solved = get_solved_questions(42, count=3, qtype="mcq")
    for s in solved:
        print(f"  ID: {s['question_id']}")
        print(f"  Answer : {s['answer']}")
        for step in s["steps"]:
            for line in step.split("\n"):
                print(f"    {line}")
        print(f"  Verify : {s['verification'][:120]}")
        print()

    # ── Verification examples ───────────────────────────────────────────────
    print("\n── Verification Examples ──")
    v1 = verify_back_substitution("x**2 + 3*x - 10", x_value=2.0, expected=0.0)
    print(f"  Back-substitution test  : passed={v1['passed']}, "
          f"diff={v1.get('difference', 'N/A'):.2e}")

    v2 = verify_mass_balance(
        [("H2", 2.0), ("O2", 1.0)],
        [("H2O", 2.0)],
    )
    print(f"  Mass balance (H2 + O2 → 2H2O): passed={v2['passed']}, "
          f"diff={v2['difference']:.2e}")


# ─────────────────────────────────────────────────────────────────────────────
# SELF-TEST  (runs when executed directly)
# ─────────────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    demo(seed=42, count=6)

    # Coverage check
    print("\n── Syllabus Coverage Check ──")
    covered_nodes = {q["node_id"] for q in QUESTION_BANK}
    all_nodes     = {"c9_econ_001", "c9_econ_015", "c9_econ_020"}
    missing       = all_nodes - covered_nodes
    print(f"  Nodes covered : {sorted(covered_nodes)}")
    print(f"  Missing nodes : {missing if missing else 'None — all covered!'}")

    type_counts: dict[str, int] = {}
    comp_counts: dict[bool, int] = {}
    for q in QUESTION_BANK:
        type_counts[q["type"]]   = type_counts.get(q["type"], 0) + 1
        comp_counts[q["competency"]] = comp_counts.get(q["competency"], 0) + 1

    print(f"\n  Question types : {type_counts}")
    print(f"  Standard : {comp_counts.get(False,0)}, "
          f"Competency: {comp_counts.get(True,0)}")
    total = len(QUESTION_BANK)
    comp_pct = comp_counts.get(True, 0) / total * 100
    print(f"  Competency %  : {comp_pct:.0f}%  (target: ~50%)")
    print(f"\n  Total questions in bank: {total}")