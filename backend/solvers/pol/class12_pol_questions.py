"""
CISCE Class 12 Political Science - Deterministic Question Generator
===================================================================
Syllabus coverage: c12_pol_001 through c12_pol_010
ISC Class 12 Political Science - Complete deterministic question bank
"""

import random
import hashlib
import textwrap
from typing import Dict, List, Any, Optional, Callable


# ============================================================================
# SYLLABUS TOPIC DEFINITIONS
# ============================================================================

TOPIC_METADATA: Dict[str, Dict[str, Any]] = {
    "c12_pol_001": {
        "code": "c12_pol_001",
        "title": "The End of Bipolarity",
        "chapters": ["Collapse of Soviet Union", "New States in World Politics", "US Hegemony"],
        "weight": 1.0,
    },
    "c12_pol_002": {
        "code": "c12_pol_002",
        "title": "Contemporary Centres of Power",
        "chapters": ["European Union", "ASEAN", "China as Emerging Superpower"],
        "weight": 1.0,
    },
    "c12_pol_003": {
        "code": "c12_pol_003",
        "title": "Contemporary Global Challenges",
        "chapters": ["Environmental Issues", "Global Poverty", "Weapons Proliferation"],
        "weight": 1.0,
    },
    "c12_pol_004": {
        "code": "c12_pol_004",
        "title": "Framing of the Indian Constitution",
        "chapters": ["Constituent Assembly Debates", "Key Features", "Philosophy"],
        "weight": 1.0,
    },
    "c12_pol_005": {
        "code": "c12_pol_005",
        "title": "Fundamental Rights and Duties",
        "chapters": ["Fundamental Rights", "Directive Principles", "Fundamental Duties"],
        "weight": 1.0,
    },
    "c12_pol_006": {
        "code": "c12_pol_006",
        "title": "Executive, Legislature and Judiciary",
        "chapters": ["Parliament", "President", "Supreme Court", "Federalism"],
        "weight": 1.0,
    },
    "c12_pol_007": {
        "code": "c12_pol_007",
        "title": "Local Government",
        "chapters": ["73rd Amendment", "74th Amendment", "Panchayati Raj"],
        "weight": 1.0,
    },
    "c12_pol_008": {
        "code": "c12_pol_008",
        "title": "Political Parties and Pressure Groups",
        "chapters": ["Party Systems", "Election Commission", "Pressure Groups"],
        "weight": 1.0,
    },
    "c12_pol_009": {
        "code": "c12_pol_009",
        "title": "Indian Foreign Policy",
        "chapters": ["Non-Aligned Movement", "Policy Documents", "Major Powers"],
        "weight": 1.0,
    },
    "c12_pol_010": {
        "code": "c12_pol_010",
        "title": "International Organizations",
        "chapters": ["United Nations", "UN Reform", "Regional Orgs", "WTO"],
        "weight": 1.0,
    },
}

TOPIC_ORDER = list(TOPIC_METADATA.keys())


# ============================================================================
# QUESTION DATA - Factually correct per CISCE Class 12 syllabus
# ============================================================================

MCQ_BANK: Dict[str, List[Dict[str, Any]]] = {
    "c12_pol_001": [
        {
            "id": "c12_pol_001_mcq_01",
            "text": "The Soviet Union formally dissolved in which year?",
            "type": "mcq",
            "options": ["1989", "1990", "1991", "1992"],
            "answer": "1991",
            "difficulty": 0.2,
        },
        {
            "id": "c12_pol_001_mcq_02",
            "text": "Which Soviet leader introduced the policies of Glasnost and Perestroika?",
            "type": "mcq",
            "options": ["Brezhnev", "Gorbachev", "Yeltsin", "Khrushchev"],
            "answer": "Gorbachev",
            "difficulty": 0.3,
        },
        {
            "id": "c12_pol_001_mcq_03",
            "text": "The first shock of the Soviet Union's disintegration was the independence demand from which republic?",
            "type": "mcq",
            "options": ["Ukraine", "Baltic Republics", "Georgia", "Armenia"],
            "answer": "Baltic Republics",
            "difficulty": 0.5,
        },
        {
            "id": "c12_pol_001_mcq_04",
            "text": "Which country is described as the 'sole superpower' after the Cold War?",
            "type": "mcq",
            "options": ["Russia", "China", "USA", "UK"],
            "answer": "USA",
            "difficulty": 0.2,
        },
    ],
    "c12_pol_002": [
        {
            "id": "c12_pol_002_mcq_01",
            "text": "The European Union was established by the Maastricht Treaty in which year?",
            "type": "mcq",
            "options": ["1989", "1991", "1992", "1995"],
            "answer": "1992",
            "difficulty": 0.4,
        },
        {
            "id": "c12_pol_002_mcq_02",
            "text": "ASEAN stands for:",
            "type": "mcq",
            "options": [
                "Asian Social and Economic Nations",
                "Association of Southeast Asian Nations",
                "Allied States of East Asian Nations",
                "Asian States Economic Association",
            ],
            "answer": "Association of Southeast Asian Nations",
            "difficulty": 0.3,
        },
        {
            "id": "c12_pol_002_mcq_03",
            "text": "Which Chinese leader initiated economic reforms through the 'Four Modernisations'?",
            "type": "mcq",
            "options": ["Mao Zedong", "Deng Xiaoping", "Zhou Enlai", "Jiang Zemin"],
            "answer": "Deng Xiaoping",
            "difficulty": 0.3,
        },
    ],
    "c12_pol_003": [
        {
            "id": "c12_pol_003_mcq_01",
            "text": "The Kyoto Protocol, aimed at reducing greenhouse gas emissions, was adopted in which year?",
            "type": "mcq",
            "options": ["1992", "1997", "2005", "2015"],
            "answer": "1997",
            "difficulty": 0.5,
        },
        {
            "id": "c12_pol_003_mcq_02",
            "text": "Which international body has the 'Global Environment Facility' as its financial mechanism?",
            "type": "mcq",
            "options": ["UNFCCC", "UNESCO", "WHO", "IMF"],
            "answer": "UNFCCC",
            "difficulty": 0.6,
        },
    ],
    "c12_pol_004": [
        {
            "id": "c12_pol_004_mcq_01",
            "text": "The Constituent Assembly of India first met on:",
            "type": "mcq",
            "options": ["9th December 1946", "15th August 1947", "26th November 1949", "26th January 1950"],
            "answer": "9th December 1946",
            "difficulty": 0.3,
        },
        {
            "id": "c12_pol_004_mcq_02",
            "text": "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
            "type": "mcq",
            "options": ["Jawaharlal Nehru", "B.R. Ambedkar", "Rajendra Prasad", "Vallabhbhai Patel"],
            "answer": "B.R. Ambedkar",
            "difficulty": 0.2,
        },
        {
            "id": "c12_pol_004_mcq_03",
            "text": "The 'Objective Resolution' was moved by:",
            "type": "mcq",
            "options": ["B.R. Ambedkar", "Jawaharlal Nehru", "Rajendra Prasad", "Vallabhbhai Patel"],
            "answer": "Jawaharlal Nehru",
            "difficulty": 0.4,
        },
    ],
    "c12_pol_005": [
        {
            "id": "c12_pol_005_mcq_01",
            "text": "How many Fundamental Rights are guaranteed by the Indian Constitution originally?",
            "type": "mcq",
            "options": ["Five", "Six", "Seven", "Eight"],
            "answer": "Seven",
            "difficulty": 0.3,
        },
        {
            "id": "c12_pol_005_mcq_02",
            "text": "The Right to Education was added to the Constitution through which Amendment?",
            "type": "mcq",
            "options": ["42nd Amendment", "44th Amendment", "86th Amendment", "91st Amendment"],
            "answer": "86th Amendment",
            "difficulty": 0.5,
        },
    ],
    "c12_pol_006": [
        {
            "id": "c12_pol_006_mcq_01",
            "text": "The President of India is elected by:",
            "type": "mcq",
            "options": [
                "Direct election by citizens",
                "Proportional representation by elected MLAs only",
                "Proportional representation by elected members of Parliament and State Legislative Assemblies",
                "Elected by Lok Sabha only",
            ],
            "answer": "Proportional representation by elected members of Parliament and State Legislative Assemblies",
            "difficulty": 0.4,
        },
        {
            "id": "c12_pol_006_mcq_02",
            "text": "Who appoints the Chief Justice of India?",
            "type": "mcq",
            "options": ["Prime Minister", "President", "Law Minister", "Parliament"],
            "answer": "President",
            "difficulty": 0.2,
        },
        {
            "id": "c12_pol_006_mcq_03",
            "text": "The Council of Ministers is collectively responsible to:",
            "type": "mcq",
            "options": ["President", "Lok Sabha", "Rajya Sabha", "Supreme Court"],
            "answer": "Lok Sabha",
            "difficulty": 0.3,
        },
    ],
    "c12_pol_007": [
        {
            "id": "c12_pol_007_mcq_01",
            "text": "The 73rd Constitutional Amendment added which new Part to the Constitution?",
            "type": "mcq",
            "options": ["Part VIII", "Part IX", "Part X", "Part VII"],
            "answer": "Part IX",
            "difficulty": 0.4,
        },
        {
            "id": "c12_pol_007_mcq_02",
            "text": "How many tiers does the Panchayati Raj system have as per the 73rd Amendment?",
            "type": "mcq",
            "options": ["Two", "Three", "Four", "One"],
            "answer": "Three",
            "difficulty": 0.3,
        },
    ],
    "c12_pol_008": [
        {
            "id": "c12_pol_008_mcq_01",
            "text": "India has a __________ type of party system.",
            "type": "mcq",
            "options": ["One-party", "Two-party", "Multi-party", "Dominant-party"],
            "answer": "Multi-party",
            "difficulty": 0.2,
        },
        {
            "id": "c12_pol_008_mcq_02",
            "text": "The Election Commission of India was established in the year:",
            "type": "mcq",
            "options": ["1947", "1950", "1952", "1960"],
            "answer": "1950",
            "difficulty": 0.3,
        },
    ],
    "c12_pol_009": [
        {
            "id": "c12_pol_009_mcq_01",
            "text": "The Non-Aligned Movement (NAM) was founded in 1961 at the Belgrade Conference. Who was India's Prime Minister at that time?",
            "type": "mcq",
            "options": ["Lal Bahadur Shastri", "Jawaharlal Nehru", "Indira Gandhi", "Morarji Desai"],
            "answer": "Jawaharlal Nehru",
            "difficulty": 0.3,
        },
        {
            "id": "c12_pol_009_mcq_02",
            "text": "The Panchsheel Agreement was signed between India and:",
            "type": "mcq",
            "options": ["Nepal", "China", "Pakistan", "Sri Lanka"],
            "answer": "China",
            "difficulty": 0.2,
        },
    ],
    "c12_pol_010": [
        {
            "id": "c12_pol_010_mcq_01",
            "text": "How many original members were there in the United Nations (1945)?",
            "type": "mcq",
            "options": ["45", "51", "55", "60"],
            "answer": "51",
            "difficulty": 0.4,
        },
        {
            "id": "c12_pol_010_mcq_02",
            "text": "The headquarters of the United Nations is located in:",
            "type": "mcq",
            "options": ["Geneva", "New York", "Paris", "London"],
            "answer": "New York",
            "difficulty": 0.2,
        },
        {
            "id": "c12_pol_010_mcq_03",
            "text": "Which organ of the UN has 15 members, of which 5 are permanent with veto power?",
            "type": "mcq",
            "options": ["General Assembly", "Security Council", "ECOSOC", "International Court of Justice"],
            "answer": "Security Council",
            "difficulty": 0.3,
        },
    ],
}

FILL_BLANK_BANK: Dict[str, List[Dict[str, Any]]] = {
    "c12_pol_001": [
        {
            "id": "c12_pol_001_fb_01",
            "text": "The disintegration of the Soviet Union led to the emergence of _____ independent republics in the CIS.",
            "type": "fill_blank",
            "answer": "15",
            "difficulty": 0.5,
        },
        {
            "id": "c12_pol_001_fb_02",
            "text": "The policy of Glasnost was introduced by _____.",
            "type": "fill_blank",
            "answer": "Gorbachev",
            "difficulty": 0.4,
        },
        {
            "id": "c12_pol_001_fb_03",
            "text": "The first US-led military action after the Cold War was against _____ in 1991.",
            "type": "fill_blank",
            "answer": "Iraq",
            "difficulty": 0.6,
        },
    ],
    "c12_pol_002": [
        {
            "id": "c12_pol_002_fb_01",
            "text": "The ASEAN was founded in _____ with five member countries.",
            "type": "fill_blank",
            "answer": "1967",
            "difficulty": 0.5,
        },
        {
            "id": "c12_pol_002_fb_02",
            "text": "The European Union's common currency is called the _____.",
            "type": "fill_blank",
            "answer": "Euro",
            "difficulty": 0.3,
        },
        {
            "id": "c12_pol_002_fb_03",
            "text": "The Shanghai Five was renamed to the _____ Cooperation Organisation in 2001.",
            "type": "fill_blank",
            "answer": "Shanghai",
            "difficulty": 0.6,
        },
    ],
    "c12_pol_003": [
        {
            "id": "c12_pol_003_fb_01",
            "text": "The Brundtland Report (1987) defined the concept of _____ development.",
            "type": "fill_blank",
            "answer": "sustainable",
            "difficulty": 0.5,
        },
        {
            "id": "c12_pol_003_fb_02",
            "text": "The term 'global commons' includes the atmosphere, the oceans and _____.",
            "type": "fill_blank",
            "answer": "Antarctica",
            "difficulty": 0.7,
        },
    ],
    "c12_pol_004": [
        {
            "id": "c12_pol_004_fb_01",
            "text": "The Constituent Assembly adopted the Constitution on _____.",
            "type": "fill_blank",
            "answer": "26 November 1949",
            "difficulty": 0.4,
        },
        {
            "id": "c12_pol_004_fb_02",
            "text": "The Indian Constitution came into effect on _____.",
            "type": "fill_blank",
            "answer": "26 January 1950",
            "difficulty": 0.3,
        },
        {
            "id": "c12_pol_004_fb_03",
            "text": "The Preamble declares India to be a _____ Sovereign Socialist Secular Democratic Republic.",
            "type": "fill_blank",
            "answer": "Socialist",
            "difficulty": 0.5,
        },
    ],
    "c12_pol_005": [
        {
            "id": "c12_pol_005_fb_01",
            "text": "Article _____ of the Constitution abolishes untouchability.",
            "type": "fill_blank",
            "answer": "17",
            "difficulty": 0.5,
        },
        {
            "id": "c12_pol_005_fb_02",
            "text": "The Right to Property was removed from Fundamental Rights by the _____ Amendment.",
            "type": "fill_blank",
            "answer": "44th",
            "difficulty": 0.5,
        },
    ],
    "c12_pol_006": [
        {
            "id": "c12_pol_006_fb_01",
            "text": "The tenure of the President of India is _____ years.",
            "type": "fill_blank",
            "answer": "5",
            "difficulty": 0.2,
        },
        {
            "id": "c12_pol_006_fb_02",
            "text": "The impeachment of the President can be initiated in either House for violation of the _____.",
            "type": "fill_blank",
            "answer": "Constitution",
            "difficulty": 0.5,
        },
        {
            "id": "c12_pol_006_fb_03",
            "text": "The Supreme Court has _____ judges (as per current strength).",
            "type": "fill_blank",
            "answer": "34",
            "difficulty": 0.5,
        },
    ],
    "c12_pol_007": [
        {
            "id": "c12_pol_007_fb_01",
            "text": "One-third of seats in Panchayats are reserved for _____.",
            "type": "fill_blank",
            "answer": "women",
            "difficulty": 0.3,
        },
        {
            "id": "c12_pol_007_fb_02",
            "text": "The 74th Amendment deals with _____ in urban areas.",
            "type": "fill_blank",
            "answer": "Municipalities",
            "difficulty": 0.4,
        },
    ],
    "c12_pol_008": [
        {
            "id": "c12_pol_008_fb_01",
            "text": "The 'Anti-Defection Law' was added to the Constitution by the _____ Amendment.",
            "type": "fill_blank",
            "answer": "52nd",
            "difficulty": 0.5,
        },
        {
            "id": "c12_pol_008_fb_02",
            "text": "Pressure groups are also known as _____ groups.",
            "type": "fill_blank",
            "answer": "interest",
            "difficulty": 0.3,
        },
    ],
    "c12_pol_009": [
        {
            "id": "c12_pol_009_fb_01",
            "text": "India's foreign policy is based on the doctrine of _____.",
            "type": "fill_blank",
            "answer": "Non-Alignment",
            "difficulty": 0.3,
        },
        {
            "id": "c12_pol_009_fb_02",
            "text": "The first NAM Summit was held at _____ in 1961.",
            "type": "fill_blank",
            "answer": "Belgrade",
            "difficulty": 0.4,
        },
        {
            "id": "c12_pol_009_fb_03",
            "text": "India conducted its first nuclear test named _____ in 1974.",
            "type": "fill_blank",
            "answer": "Smiling Buddha",
            "difficulty": 0.5,
        },
    ],
    "c12_pol_010": [
        {
            "id": "c12_pol_010_fb_01",
            "text": "The five permanent members of the UN Security Council are USA, UK, France, Russia and _____.",
            "type": "fill_blank",
            "answer": "China",
            "difficulty": 0.3,
        },
        {
            "id": "c12_pol_010_fb_02",
            "text": "The International Court of Justice is seated at _____.",
            "type": "fill_blank",
            "answer": "The Hague",
            "difficulty": 0.4,
        },
        {
            "id": "c12_pol_010_fb_03",
            "text": "India became a member of the UN in _____.",
            "type": "fill_blank",
            "answer": "1945",
            "difficulty": 0.4,
        },
    ],
}

SHORT_ANSWER_BANK: Dict[str, List[Dict[str, Any]]] = {
    "c12_pol_001": [
        {
            "id": "c12_pol_001_sa_01",
            "text": "State any two reasons for the disintegration of the Soviet Union.",
            "type": "short_answer",
            "answer": "1. Economic stagnation due to the burdensome arms race with the USA. 2. Nationalist movements in Soviet republics demanding independence. 3. Gorbachev's reforms (Glasnost and Perestroika) weakened the party's control.",
            "difficulty": 0.4,
        },
        {
            "id": "c12_pol_001_sa_02",
            "text": "What is meant by 'US Hegemony'?",
            "type": "short_answer",
            "answer": "US Hegemony refers to the overwhelming military, economic and cultural dominance of the United States as the sole superpower in the post-Cold War world, shaping global politics and institutions.",
            "difficulty": 0.5,
        },
        {
            "id": "c12_pol_001_sa_03",
            "text": "Explain the term 'Shock Therapy' as applied to post-Soviet states.",
            "type": "short_answer",
            "answer": "Shock Therapy refers to the rapid transition from a communist command economy to a free-market economy, involving sudden privatisation, removal of price controls, and opening to foreign trade and investment.",
            "difficulty": 0.6,
        },
    ],
    "c12_pol_002": [
        {
            "id": "c12_pol_002_sa_01",
            "text": "State any two objectives of ASEAN.",
            "type": "short_answer",
            "answer": "1. Accelerate economic growth and development. 2. Promote peace and stability through respect for justice and rule of law. 3. Promote active collaboration on common interests.",
            "difficulty": 0.4,
        },
        {
            "id": "c12_pol_002_sa_02",
            "text": "Mention two points of conflict between China and India.",
            "type": "short_answer",
            "answer": "1. Border dispute over Aksai Chin and Arunachal Pradesh. 2. China's support to Pakistan on the Kashmir issue. 3. Competition for regional influence in South Asia.",
            "difficulty": 0.5,
        },
    ],
    "c12_pol_003": [
        {
            "id": "c12_pol_003_sa_01",
            "text": "What are 'Global Commons'? Give two examples.",
            "type": "short_answer",
            "answer": "Global Commons are resources that belong to all humanity and are not owned by any single nation. Examples: (1) The atmosphere, (2) The oceans, (3) Antarctica, (4) Outer space.",
            "difficulty": 0.5,
        },
        {
            "id": "c12_pol_003_sa_02",
            "text": "What is 'Global Poverty' as a global challenge?",
            "type": "short_answer",
            "answer": "Global poverty refers to the condition where a large section of the world's population lacks basic needs like food, shelter, education and healthcare. The gap between rich and poor nations continues to widen despite global economic growth.",
            "difficulty": 0.5,
        },
    ],
    "c12_pol_004": [
        {
            "id": "c12_pol_004_sa_01",
            "text": "What is the 'Objective Resolution'? Who moved it?",
            "type": "short_answer",
            "answer": "The Objective Resolution was a resolution moved by Jawaharlal Nehru on 13 December 1946 in the Constituent Assembly. It outlined the philosophical foundation of the Indian Constitution and later became the Preamble.",
            "difficulty": 0.3,
        },
        {
            "id": "c12_pol_004_sa_02",
            "text": "State any two features of the Parliamentary System adopted by India.",
            "type": "short_answer",
            "answer": "1. The executive is responsible to the legislature. 2. The Council of Ministers is headed by the Prime Minister. 3. The President is a constitutional head of state, not the real executive.",
            "difficulty": 0.4,
        },
    ],
    "c12_pol_005": [
        {
            "id": "c12_pol_005_sa_01",
            "text": "State any two Fundamental Rights guaranteed by the Indian Constitution.",
            "type": "short_answer",
            "answer": "1. Right to Equality (Articles 14-18). 2. Right to Freedom (Articles 19-22). 3. Right against Exploitation (Articles 23-24). 4. Right to Freedom of Religion (Articles 25-28).",
            "difficulty": 0.3,
        },
        {
            "id": "c12_pol_005_sa_02",
            "text": "What is the significance of the 86th Constitutional Amendment?",
            "type": "short_answer",
            "answer": "The 86th Amendment (2002) made elementary education a Fundamental Right under Article 21-A, making education free and compulsory for children aged 6 to 14 years.",
            "difficulty": 0.5,
        },
    ],
    "c12_pol_006": [
        {
            "id": "c12_pol_006_sa_01",
            "text": "What is a Money Bill? Who decides whether a Bill is a Money Bill?",
            "type": "short_answer",
            "answer": "A Money Bill deals with taxation, borrowing of money, or expenditure from the Consolidated Fund of India. The Speaker of the Lok Sabha decides whether a Bill is a Money Bill.",
            "difficulty": 0.5,
        },
        {
            "id": "c12_pol_006_sa_02",
            "text": "Define 'Judicial Review'.",
            "type": "short_answer",
            "answer": "Judicial Review is the power of the Supreme Court to examine the constitutionality of legislative acts and executive orders. If found unconstitutional, the Court can declare them null and void.",
            "difficulty": 0.4,
        },
    ],
    "c12_pol_007": [
        {
            "id": "c12_pol_007_sa_01",
            "text": "What is the significance of the 73rd Constitutional Amendment?",
            "type": "short_answer",
            "answer": "The 73rd Amendment (1992) constitutionalised Panchayati Raj institutions by adding Part IX and the 11th Schedule. It provided for a three-tier system of rural local self-government, reservation for SCs, STs and women.",
            "difficulty": 0.5,
        },
    ],
    "c12_pol_008": [
        {
            "id": "c12_pol_008_sa_01",
            "text": "Distinguish between a Political Party and a Pressure Group.",
            "type": "short_answer",
            "answer": "Political parties contest elections and aim to form the government, while pressure groups do not contest elections but seek to influence government policies. Political parties have a broad ideology; pressure groups focus on specific issues.",
            "difficulty": 0.5,
        },
    ],
    "c12_pol_009": [
        {
            "id": "c12_pol_009_sa_01",
            "text": "What were the five principles of Panchsheel?",
            "type": "short_answer",
            "answer": "The five principles of Panchsheel (1954) are: (1) Mutual respect for each other's territorial integrity and sovereignty, (2) Mutual non-aggression, (3) Mutual non-interference, (4) Equality and mutual benefit, (5) Peaceful coexistence.",
            "difficulty": 0.5,
        },
    ],
    "c12_pol_010": [
        {
            "id": "c12_pol_010_sa_01",
            "text": "What is the main function of the International Court of Justice?",
            "type": "short_answer",
            "answer": "The International Court of Justice (ICJ) is the principal judicial organ of the UN. Its main functions are to settle legal disputes between states and to give advisory opinions on legal questions referred by UN organs and agencies.",
            "difficulty": 0.4,
        },
    ],
}

LONG_ANSWER_BANK: Dict[str, List[Dict[str, Any]]] = {
    "c12_pol_001": [
        {
            "id": "c12_pol_001_la_01",
            "text": "Discuss the main factors responsible for the collapse of the Soviet Union and the end of bipolarity in world politics.",
            "type": "long_answer",
            "answer": "Main factors: (1) Economic stagnation due to the arms race with USA. (2) Nationalist movements in republics demanding independence. (3) Gorbachev's reforms (Glasnost/openness and Perestroika/restructuring) weakened Communist Party control. (4) Failed coup in 1991. (5) Boris Yeltsin's rise in Russia. (6) Belavezha Accords creating CIS in Dec 1991. Impact: Emergence of 15 new republics, unipolar world dominated by USA, transition from planned to market economies.",
            "difficulty": 0.7,
        },
        {
            "id": "c12_pol_001_la_02",
            "text": "Examine the nature of US hegemony after the Cold War with reference to its military, economic and ideological dimensions.",
            "type": "long_answer",
            "answer": "Military: US has the world's largest military budget and global military bases. Examples: Gulf War 1991, Afghanistan 2001, Iraq 2003. Economic: US has the largest economy, controls Bretton Woods institutions (IMF, World Bank). Ideological: Promotes liberal democracy and market economics as universal values. Structural power: Dominates internet (ICANN), cultural influence through Hollywood and media.",
            "difficulty": 0.8,
        },
    ],
    "c12_pol_002": [
        {
            "id": "c12_pol_002_la_01",
            "text": "Evaluate the European Union as a supranational organisation. How has it transformed European politics?",
            "type": "long_answer",
            "answer": "EU is a unique supranational organisation with its own Parliament, Court and currency. Founded by Treaty of Maastricht 1992. Key features: Single market, Euro currency (1999), free movement of people, common foreign policy. Transformed Europe by: Eliminating war between member states, creating economic integration, enabling Schengen free movement, making EU a major global economic bloc with collective GDP larger than USA.",
            "difficulty": 0.7,
        },
        {
            "id": "c12_pol_002_la_02",
            "text": "Analyse China's emergence as a potential superpower in the 21st century.",
            "type": "long_answer",
            "answer": "China's rise is based on: (1) Rapid economic growth since 1978 reforms, becoming world's second-largest economy. (2) Massive manufacturing base and exports. (3) Large population and domestic market. (4) Military modernisation with nuclear weapons. (5) Permanent UN Security Council seat. Challenges: Environmental degradation, income inequality, political system constraints, US containment, demographic decline. Role in global governance through BRI, AIIB, and SCO.",
            "difficulty": 0.8,
        },
    ],
    "c12_pol_003": [
        {
            "id": "c12_pol_003_la_01",
            "text": "Discuss environmental issues as global challenges. How do they require international cooperation?",
            "type": "long_answer",
            "answer": "Environmental challenges include: (1) Climate change causing extreme weather, rising sea levels. (2) Ozone depletion. (3) Biodiversity loss. (4) Resource depletion. These require international cooperation because: Pollution crosses borders (acid rain, air pollution), global commons need collective management, climate change affects all nations, developing nations need financial/technical support. Key agreements: Montreal Protocol (1987), Rio Earth Summit (1992), Kyoto Protocol (1997), Paris Agreement (2015).",
            "difficulty": 0.7,
        },
    ],
    "c12_pol_004": [
        {
            "id": "c12_pol_004_la_01",
            "text": "Trace the process of the framing of the Indian Constitution. How does it reflect a balance between different ideologies?",
            "type": "long_answer",
            "answer": "Process: (1) Interim Government formed 1946. (2) Constituent Assembly first met on 9 Dec 1946. (3) Objective Resolution moved by Nehru on 13 Dec 1946. (4) Drafting Committee under B.R. Ambedkar formed on 29 Aug 1947. (5) Constitution adopted on 26 Nov 1949. (6) Came into effect on 26 Jan 1950 (Republic Day). Balance: Reflects Gandhian ideals (village republics), liberal democracy (fundamental rights), socialist planning, and secularism. Accommodated diverse views of different communities and provinces.",
            "difficulty": 0.7,
        },
        {
            "id": "c12_pol_004_la_02",
            "text": "Explain the salient features of the Indian Constitution.",
            "type": "long_answer",
            "answer": "Salient features: (1) Written and detailed constitution. (2) Parliamentary system of government. (3) Federal system with strong unitary bias. (4) Fundamental Rights and Directive Principles. (5) Independent Judiciary. (6) Universal Adult Franchise. (7) Secular state. (8) Democratic republic. (9) Single citizenship. (10) Emergency provisions. (11) Amendment procedure. (12) Special provisions for minorities and SC/STs.",
            "difficulty": 0.6,
        },
    ],
    "c12_pol_005": [
        {
            "id": "c12_pol_005_la_01",
            "text": "Discuss the Fundamental Rights guaranteed by the Indian Constitution. How have they been amended over time?",
            "type": "long_answer",
            "answer": "Original 7 Fundamental Rights: (1) Right to Equality (14-18), (2) Right to Freedom (19-22), (3) Right against Exploitation (23-24), (4) Right to Freedom of Religion (25-28), (5) Cultural and Educational Rights (29-30), (6) Right to Property (31, removed by 44th Amendment), (7) Right to Constitutional Remedies (32). Amendments: 42nd added words 'Socialist, Secular', 44th removed Right to Property, 86th added Right to Education (Article 21-A).",
            "difficulty": 0.7,
        },
    ],
    "c12_pol_006": [
        {
            "id": "c12_pol_006_la_01",
            "text": "Describe the powers and functions of the President of India.",
            "type": "long_answer",
            "answer": "Executive powers: Appoints PM, Council of Ministers, Governors, CAG, CEC, etc. Legislative powers: Summons/prorogues Parliament, addresses sessions, can promulgate ordinances, gives assent to bills. Financial powers: Union Budget presented with President's recommendation, Money Bills need prior recommendation. Judicial powers: Pardoning powers under Article 72. Discretionary powers: Appoints PM when no party has clear majority, can return bills for reconsideration, dismisses state govt under Article 356. Emergency powers: National, State and Financial emergencies.",
            "difficulty": 0.7,
        },
        {
            "id": "c12_pol_006_la_02",
            "text": "Explain the composition, powers and functions of the Supreme Court of India.",
            "type": "long_answer",
            "answer": "Composition: Currently 34 judges including CJI. Appointed by President after consultation with CJI and collegium. Powers: (1) Original jurisdiction in disputes between Centre and States, Fundamental Rights cases. (2) Appellate jurisdiction in constitutional, civil and criminal cases. (3) Advisory jurisdiction to answer questions referred by President. (4) Judicial review power. (5) Power of judicial review under Article 13. Functions: Guardian of the Constitution, protector of Fundamental Rights, interpreter of the Constitution, highest court of appeal.",
            "difficulty": 0.7,
        },
    ],
    "c12_pol_007": [
        {
            "id": "c12_pol_007_la_01",
            "text": "Explain the provisions of the 73rd Constitutional Amendment Act, 1992, with reference to the three-tier system of Panchayati Raj.",
            "type": "long_answer",
            "answer": "73rd Amendment added Part IX and 11th Schedule. Three-tier system: (1) Gram Panchayat at village level. (2) Panchayat Samiti at block/intermediate level. (3) Zila Parishad at district level. Key provisions: (1) Direct elections every 5 years. (2) Reservation for SCs, STs and women (one-third seats). (3) State Finance Commission to recommend financial resources. (4) District Planning Committee. (5) Devolution of powers and responsibilities for local planning and development.",
            "difficulty": 0.6,
        },
    ],
    "c12_pol_008": [
        {
            "id": "c12_pol_008_la_01",
            "text": "Discuss the party system in India. Why has the Congress party dominated Indian politics for most of its history?",
            "type": "long_answer",
            "answer": "India has a multi-party system with both national and regional parties. Dominant party system from 1947-1977 with Congress winning most elections. Reasons for Congress dominance: (1) Legacy of freedom struggle and leadership of Nehru/Gandhi family. (2) Ability to accommodate diverse social groups. (3) Effective organisation across India. (4) Positioning as a centrist party. (5) Patronage resources as ruling party. After 1977, emergence of BJP as alternative, rise of regional parties in coalition era (1990s onwards), Mandal Commission effects.",
            "difficulty": 0.7,
        },
    ],
    "c12_pol_009": [
        {
            "id": "c12_pol_009_la_01",
            "text": "Trace the evolution of India's foreign policy since Independence, highlighting the Non-Aligned Movement.",
            "type": "long_answer",
            "answer": "Phase 1 (1947-1962): Nehru's leadership, Panchsheel (1954), Bandung Conference (1955), founding of NAM (1961 Belgrade). Phase 2 (1962-1991): Wars with China and Pakistan, treaty with USSR (1971), Indira Gandhi era, economic liberalisation. Phase 3 (1991-present): Look East Policy, strategic partnership with USA, nuclear tests (1998), Act East Policy. NAM principles: Anti-colonialism, anti-racism, nuclear disarmament, economic cooperation among developing nations. India hosted 7th NAM Summit 1983.",
            "difficulty": 0.7,
        },
    ],
    "c12_pol_010": [
        {
            "id": "c12_pol_010_la_01",
            "text": "Examine the structure, functions and reforms needed in the United Nations Organisation.",
            "type": "long_answer",
            "answer": "Structure: 6 principal organs - General Assembly, Security Council, ECOSOC, Trusteeship Council, ICJ, Secretariat. Functions: Maintenance of international peace and security, development cooperation, human rights promotion, humanitarian aid. Reforms needed: (1) Security Council expansion (G4 nations: India, Germany, Brazil, Japan). (2) Veto power reform. (3) ECOSOC revitalisation. (4) Strengthening General Assembly. (5) More representation for developing nations. India's case: Population, economy, military contribution, democratic credentials, peacekeeping contributions.",
            "difficulty": 0.8,
        },
    ],
}

NUMERICAL_BANK: Dict[str, List[Dict[str, Any]]] = {
    "c12_pol_001": [
        {
            "id": "c12_pol_001_num_01",
            "text": "How many successor states emerged from the disintegration of the Soviet Union?",
            "type": "numerical",
            "answer": 15,
            "difficulty": 0.4,
        },
        {
            "id": "c12_pol_001_num_02",
            "text": "How many permanent members are there in the UN Security Council with veto power?",
            "type": "numerical",
            "answer": 5,
            "difficulty": 0.3,
        },
    ],
    "c12_pol_002": [
        {
            "id": "c12_pol_002_num_01",
            "text": "How many member countries are there in the ASEAN as of current knowledge?",
            "type": "numerical",
            "answer": 10,
            "difficulty": 0.4,
        },
    ],
    "c12_pol_004": [
        {
            "id": "c12_pol_004_num_01",
            "text": "How many days did the Constituent Assembly take to complete the Constitution?",
            "type": "numerical",
            "answer": 166,
            "difficulty": 0.7,
        },
    ],
    "c12_pol_005": [
        {
            "id": "c12_pol_005_num_01",
            "text": "How many Fundamental Duties are listed in the Indian Constitution?",
            "type": "numerical",
            "answer": 11,
            "difficulty": 0.5,
        },
    ],
    "c12_pol_006": [
        {
            "id": "c12_pol_006_num_01",
            "text": "The President of India can be impeached for violation of the Constitution. What is the minimum strength of the House required to investigate the charge?",
            "type": "numerical",
            "answer": "two-thirds",
            "difficulty": 0.6,
        },
        {
            "id": "c12_pol_006_num_02",
            "text": "The tenure of the Lok Sabha is _____ years (normal).",
            "type": "numerical",
            "answer": 5,
            "difficulty": 0.2,
        },
    ],
    "c12_pol_007": [
        {
            "id": "c12_pol_007_num_01",
            "text": "What percentage of seats in Panchayats is reserved for women?",
            "type": "numerical",
            "answer": "33.33",
            "difficulty": 0.4,
        },
    ],
    "c12_pol_010": [
        {
            "id": "c12_pol_010_num_01",
            "text": "How many members (total) were there in the UN General Assembly in 1945?",
            "type": "numerical",
            "answer": 51,
            "difficulty": 0.5,
        },
        {
            "id": "c12_pol_010_num_02",
            "text": "As per the UN Charter, a two-thirds majority of members present and voting is required in the General Assembly for important decisions.",
            "type": "numerical",
            "answer": 67,
            "difficulty": 0.6,
        },
    ],
}


# ============================================================================
# SOLVER FUNCTIONS
# ============================================================================

def solve_mcq(question: Dict[str, Any], selected_answer: str) -> Dict[str, Any]:
    """Solve/evaluate an MCQ question."""
    correct = selected_answer.strip() == question["answer"].strip()
    return {
        "correct": correct,
        "selected": selected_answer,
        "expected": question["answer"],
        "explanation": f"The correct answer is '{question['answer']}'.",
    }


def solve_fill_blank(question: Dict[str, Any], student_answer: str) -> Dict[str, Any]:
    """Solve/evaluate a fill-in-the-blank question."""
    correct = student_answer.strip().lower() == question["answer"].strip().lower()
    return {
        "correct": correct,
        "selected": student_answer,
        "expected": question["answer"],
        "explanation": f"The correct answer is '{question['answer']}'.",
    }


def solve_short_answer(
    question: Dict[str, Any],
    student_answer: str,
    min_words: int = 30,
) -> Dict[str, Any]:
    """Evaluate a short-answer question using keyword matching."""
    answer_keywords = set(question["answer"].lower().split())
    student_words = set(student_answer.lower().split())
    overlap = len(answer_keywords & student_words)
    coverage = overlap / max(len(answer_keywords), 1)
    word_count = len(student_answer.split())
    passed = coverage >= 0.35 and word_count >= min_words
    return {
        "correct": passed,
        "coverage": round(coverage, 3),
        "word_count": word_count,
        "explanation": f"Model answer: {question['answer']}",
    }


def solve_long_answer(
    question: Dict[str, Any],
    student_answer: str,
    min_words: int = 80,
) -> Dict[str, Any]:
    """Evaluate a long-answer question using keyword coverage."""
    answer_keywords = set(question["answer"].lower().split())
    student_words = set(student_answer.lower().split())
    overlap = len(answer_keywords & student_words)
    coverage = overlap / max(len(answer_keywords), 1)
    word_count = len(student_answer.split())
    passed = coverage >= 0.30 and word_count >= min_words
    return {
        "correct": passed,
        "coverage": round(coverage, 3),
        "word_count": word_count,
        "explanation": f"Model answer (summary): {question['answer'][:300]}...",
    }


def solve_numerical(
    question: Dict[str, Any],
    student_answer: str,
) -> Dict[str, Any]:
    """Evaluate a numerical question."""
    expected = str(question["answer"]).strip()
    submitted = student_answer.strip()
    try:
        correct = float(submitted) == float(expected)
    except ValueError:
        correct = submitted.lower() == expected.lower()
    return {
        "correct": correct,
        "selected": student_answer,
        "expected": expected,
        "explanation": f"The correct answer is '{expected}'.",
    }


SOLVER_REGISTRY: Dict[str, Callable] = {
    "mcq": solve_mcq,
    "fill_blank": solve_fill_blank,
    "short_answer": solve_short_answer,
    "long_answer": solve_long_answer,
    "numerical": solve_numerical,
}


# ============================================================================
# QUESTION GENERATOR REGISTRY
# ============================================================================

def generate_topic_questions(topic_code: str, count: int, rng: random.Random) -> List[Dict[str, Any]]:
    """Generate a deterministic list of questions for a given topic."""
    questions: List[Dict[str, Any]] = []

    mcq_pool = MCQ_BANK.get(topic_code, [])
    fb_pool = FILL_BLANK_BANK.get(topic_code, [])
    sa_pool = SHORT_ANSWER_BANK.get(topic_code, [])
    la_pool = LONG_ANSWER_BANK.get(topic_code, [])
    num_pool = NUMERICAL_BANK.get(topic_code, [])

    all_pools = [
        ("mcq", mcq_pool),
        ("fill_blank", fb_pool),
        ("short_answer", sa_pool),
        ("long_answer", la_pool),
        ("numerical", num_pool),
    ]

    non_empty = [(qt, p) for qt, p in all_pools if p]
    if not non_empty:
        return questions

    topic_meta = TOPIC_METADATA.get(topic_code, {})
    topic_title = topic_meta.get("title", topic_code)

    for i in range(count):
        qt, pool = rng.choice(non_empty)
        template = rng.choice(pool)

        difficulty = template["difficulty"]
        q_type = template["type"]

        q: Dict[str, Any] = {
            "id": f"{topic_code}_{i:03d}",
            "question_text": template["text"],
            "question_type": q_type,
            "options": template.get("options", []),
            "answer": template["answer"],
            "difficulty": round(difficulty, 2),
            "topic": topic_code,
            "topic_title": topic_title,
            "solution": template["answer"],
            "verification": _make_verification(template),
        }
        questions.append(q)

    return questions


def _make_verification(template: Dict[str, Any]) -> str:
    """Create a verification string for reproducibility."""
    raw = f"{template['id']}:{template['answer']}"
    return hashlib.sha256(raw.encode()).hexdigest()[:16]


QUESTION_REGISTRY: Dict[str, Callable] = {}

for topic_code in TOPIC_ORDER:
    def make_gen(tc: str) -> Callable:
        def gen(count: int = 5, seed_offset: int = 0) -> List[Dict[str, Any]]:
            rng = random.Random(f"{tc}:{seed_offset}")
            return generate_topic_questions(tc, count, rng)
        gen.__name__ = f"gen_{tc}"
        return gen
    QUESTION_REGISTRY[topic_code] = make_gen(topic_code)


# ============================================================================
# MAIN GENERATION FUNCTION
# ============================================================================

def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """
    Deterministically generate `count` questions across all 10 syllabus topics.

    Parameters
    ----------
    seed : int
        Random seed for reproducibility.
    count : int
        Total number of questions to generate.

    Returns
    -------
    List[Dict[str, Any]]
        List of question dictionaries.
    """
    rng = random.Random(seed)

    if count <= 0:
        return []

    base_q_per_topic = count // len(TOPIC_ORDER)
    remainder = count % len(TOPIC_ORDER)

    all_questions: List[Dict[str, Any]] = []

    for idx, topic_code in enumerate(TOPIC_ORDER):
        n_q = base_q_per_topic + (1 if idx < remainder else 0)
        if n_q <= 0:
            continue
        questions = generate_topic_questions(topic_code, n_q, rng)
        all_questions.extend(questions)

    # Shuffle deterministically
    final_rng = random.Random(seed + 9999)
    final_rng.shuffle(all_questions)

    # Re-number IDs
    for i, q in enumerate(all_questions):
        q["id"] = f"q_{i + 1:03d}_{q['topic']}"

    return all_questions


# ============================================================================
# VERIFICATION
# ============================================================================

def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Validate all generated questions and return a verification report.

    Returns a dict with keys: total, valid, errors, type_distribution, difficulty_distribution.
    """
    report: Dict[str, Any] = {
        "total": len(questions),
        "valid": 0,
        "errors": [],
        "type_distribution": {},
        "difficulty_distribution": {"easy": 0, "medium": 0, "hard": 0},
        "topic_distribution": {},
    }

    required_fields = {
        "id": str,
        "question_text": str,
        "question_type": str,
        "answer": (str, int, float),
        "difficulty": (int, float),
        "topic": str,
        "solution": str,
        "verification": str,
    }

    type_dist: Dict[str, int] = {}
    topic_dist: Dict[str, int] = {}

    for q in questions:
        errors_in_q = []

        for field, expected_type in required_fields.items():
            if field not in q:
                errors_in_q.append(f"Missing field: {field}")
            elif not isinstance(q[field], expected_type):
                errors_in_q.append(
                    f"Field '{field}' has wrong type: {type(q[field]).__name__}, expected {expected_type.__name__}"
                )

        q_type = q.get("question_type", "unknown")
        if q_type == "mcq":
            if "options" not in q or not isinstance(q["options"], list) or len(q["options"]) < 2:
                errors_in_q.append("MCQ must have 'options' list with at least 2 entries")

        if q_type not in ("mcq", "fill_blank", "short_answer", "long_answer", "numerical"):
            errors_in_q.append(f"Invalid question_type: {q_type}")

        diff = q.get("difficulty", -1)
        if not isinstance(diff, (int, float)) or diff < 0.0 or diff > 1.0:
            errors_in_q.append(f"Difficulty out of range: {diff}")

        if errors_in_q:
            report["errors"].append({"id": q.get("id", "unknown"), "errors": errors_in_q})
        else:
            report["valid"] += 1

        type_dist[q_type] = type_dist.get(q_type, 0) + 1
        topic_dist[q.get("topic", "unknown")] = topic_dist.get(q.get("topic", "unknown"), 0) + 1

        if diff < 0.33:
            report["difficulty_distribution"]["easy"] += 1
        elif diff < 0.66:
            report["difficulty_distribution"]["medium"] += 1
        else:
            report["difficulty_distribution"]["hard"] += 1

    report["type_distribution"] = type_dist
    report["topic_distribution"] = topic_dist

    return report


def evaluate_question(question: Dict[str, Any], student_answer: str) -> Dict[str, Any]:
    """
    Evaluate a single question against a student answer using the appropriate solver.
    """
    q_type = question.get("question_type", "")
    solver = SOLVER_REGISTRY.get(q_type)

    if solver is None:
        return {"error": f"No solver for question type: {q_type}", "correct": False}

    return solver(question, student_answer)


# ============================================================================
# SUMMARY / STATS
# ============================================================================

def get_topic_summary() -> Dict[str, Dict[str, int]]:
    """Return the count of available questions per topic."""
    summary: Dict[str, Dict[str, int]] = {}
    for tc in TOPIC_ORDER:
        mcq_n = len(MCQ_BANK.get(tc, []))
        fb_n = len(FILL_BLANK_BANK.get(tc, []))
        sa_n = len(SHORT_ANSWER_BANK.get(tc, []))
        la_n = len(LONG_ANSWER_BANK.get(tc, []))
        num_n = len(NUMERICAL_BANK.get(tc, []))
        summary[tc] = {
            "mcq": mcq_n,
            "fill_blank": fb_n,
            "short_answer": sa_n,
            "long_answer": la_n,
            "numerical": num_n,
            "total": mcq_n + fb_n + sa_n + la_n + num_n,
        }
    return summary


# ============================================================================
# SELF-TEST
# ============================================================================

def _self_test() -> bool:
    """Run internal validation tests."""
    passed = True

    # Test 1: Basic generation
    print("=" * 70)
    print("SELF-TEST: CISCE Class 12 Political Science Question Generator")
    print("=" * 70)

    print("\n[Test 1] Generating 20 questions with seed=42...")
    questions = generate_questions(seed=42, count=20)
    assert len(questions) == 20, f"Expected 20 questions, got {len(questions)}"
    print(f"  PASS: Generated {len(questions)} questions")

    # Test 2: Reproducibility
    print("\n[Test 2] Checking reproducibility with seed=42...")
    questions2 = generate_questions(seed=42, count=20)
    texts1 = [q["question_text"] for q in questions]
    texts2 = [q["question_text"] for q in questions2]
    assert texts1 == texts2, "Questions are not reproducible with the same seed"
    print("  PASS: Identical questions reproduced with same seed")

    # Test 3: Different seeds give different results
    print("\n[Test 3] Checking different seeds produce different questions...")
    questions3 = generate_questions(seed=999, count=20)
    texts3 = [q["question_text"] for q in questions3]
    assert texts1 != texts3, "Different seeds should produce different questions"
    print("  PASS: Different seed produces different questions")

    # Test 4: Verify all questions
    print("\n[Test 4] Running verify_all_questions...")
    report = verify_all_questions(questions)
    print(f"  Total: {report['total']}")
    print(f"  Valid: {report['valid']}")
    print(f"  Errors: {len(report['errors'])}")
    print(f"  Type distribution: {report['type_distribution']}")
    print(f"  Difficulty distribution: {report['difficulty_distribution']}")
    print(f"  Topic distribution: {report['topic_distribution']}")
    assert report["valid"] == report["total"], f"Expected all valid, got {report['valid']}/{report['total']}"
    print("  PASS: All questions are valid")

    # Test 5: Test solvers
    print("\n[Test 5] Testing solvers...")

    # MCQ solver
    mcq_q = questions[0]
    assert mcq_q["question_type"] == "mcq"
    result = solve_mcq(mcq_q, mcq_q["answer"])
    assert result["correct"] is True
    result2 = solve_mcq(mcq_q, "WrongAnswer")
    assert result2["correct"] is False
    print("  PASS: solve_mcq works correctly")

    # Fill blank solver
    fb_qs = [q for q in questions if q["question_type"] == "fill_blank"]
    if fb_qs:
        fb_q = fb_qs[0]
        result = solve_fill_blank(fb_q, fb_q["answer"])
        assert result["correct"] is True
        print("  PASS: solve_fill_blank works correctly")

    # Short answer solver
    sa_qs = [q for q in questions if q["question_type"] == "short_answer"]
    if sa_qs:
        sa_q = sa_qs[0]
        result = solve_short_answer(sa_q, sa_q["answer"])
        assert result["correct"] is True
        print("  PASS: solve_short_answer works correctly")

    # Long answer solver
    la_qs = [q for q in questions if q["question_type"] == "long_answer"]
    if la_qs:
        la_q = la_qs[0]
        result = solve_long_answer(la_q, la_q["answer"])
        assert result["correct"] is True
        print("  PASS: solve_long_answer works correctly")

    # Numerical solver
    num_qs = [q for q in questions if q["question_type"] == "numerical"]
    if num_qs:
        num_q = num_qs[0]
        result = solve_numerical(num_q, str(num_q["answer"]))
        assert result["correct"] is True
        print("  PASS: solve_numerical works correctly")

    # Test 6: Topic coverage
    print("\n[Test 6] Checking all 10 topics are covered...")
    generated_topics = set(q["topic"] for q in questions)
    expected_topics = set(TOPIC_ORDER)
    missing = expected_topics - generated_topics
    if missing:
        print(f"  WARNING: Missing topics: {missing}")
    else:
        print("  PASS: All 10 topics covered")

    # Test 7: Topic summary
    print("\n[Test 7] Topic summary...")
    summary = get_topic_summary()
    for topic, counts in summary.items():
        print(f"  {topic}: {counts['total']} questions available")

    # Test 8: Sample questions
    print("\n[Test 8] Sample questions:")
    for q in questions[:5]:
        print(f"  [{q['question_type']}] (diff={q['difficulty']}) {q['question_text'][:80]}...")
        print(f"    Answer: {q['answer']}")

    print("\n" + "=" * 70)
    print("ALL TESTS PASSED")
    print("=" * 70)
    return True


if __name__ == "__main__":
    _self_test()