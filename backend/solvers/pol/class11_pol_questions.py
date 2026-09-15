"""
CISCE POL Class 11 Question Generator
Covers: US Unilateralism (Iraq, Afghanistan), Regional Cooperation (ASEAN, EU, SAARC, BRICS, QUAD),
        India-Pakistan Relations, India-Bangladesh & India-China Relations
"""

import random
import math
from fractions import Fraction
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
import sympy as sp


# ---------------------------------------------------------------------------
# Deterministic seed helper
# ---------------------------------------------------------------------------
def _seed(seed: int) -> random.Random:
    r = random.Random(seed)
    r.seed(seed)
    return r


# ---------------------------------------------------------------------------
# Knowledge Base - all facts from the syllabus nodes
# ---------------------------------------------------------------------------

KB_US_IRAQ = {
    "operation_desert_storm": {
        "year": 1991,
        "trigger": "Iraqi invasion of Kuwait (August 1990)",
        "coalition_leader": "USA",
        "result": "Liberation of Kuwait",
        "duration_days": 42,
        "un_solution_number": 660,
        "codename": "Operation Desert Storm",
        "gulf_war": True,
    },
    "operation_iraqi_freedom": {
        "year": 2003,
        "trigger": "Alleged WMD (Weapons of Mass Destruction) possession",
        "coalition_leader": "USA",
        "regime_removed": "Saddam Hussein",
        "codename": "Operation Iraqi Freedom",
        "president_usa": "George W. Bush",
        "unilateral_aspect": "No explicit UN approval for invasion; US led 'coalition of the willing'",
    },
    "unilateralism_concept": (
        "Unilateralism is the policy of a state acting independently without regard for "
        "other nations, particularly in military interventions. In a unipolar world, the "
        "sole superpower (USA) can pursue unilateral actions without fear of great-power "
        "balancing."
    ),
}

KB_US_AFGHANISTAN = {
    "operation_enduring_freedom": {
        "year": 2001,
        "trigger": "September 11, 2001 terrorist attacks (9/11)",
        "target_regime": "Taliban (harbouring Al-Qaeda)",
        "president_usa": "George W. Bush",
        "codename": "Operation Enduring Freedom",
        "duration_months_combat": 12,
        "taliban_removed_from_kabul": "November 2001",
    },
    "india_us_relations": {
        "nuclear_deal_year": 2005,
        "nuclear_deal_signed": "2008",
        "nsg_waiver_year": 2008,
        "key_defence_deals": ["C-17 Globemaster III", "P-8I Poseidon", "AH-64 Apache"],
        "trade_agreement_type": "Generalized System of Preferences (GSP) - USA granted India GSP in 1975, suspended 2019",
        "strategic_partnership_year": 2004,  # Next Steps in Strategic Partnership
    },
}

KB_ASEAN = {
    "full_name": "Association of Southeast Asian Nations",
    "founded": 1967,
    "founding_members": 5,
    "founding_member_names": ["Indonesia", "Malaysia", "Philippines", "Singapore", "Thailand"],
    "current_members": 10,
    "headquarters": "Jakarta, Indonesia",
    "aims": [
        "Accelerate economic growth",
        "Promote social progress",
        "Promote cultural development",
        "Promote regional peace and stability",
    ],
    "economic_achievements": [
        "AFTA (ASEAN Free Trade Area) - established 1992",
        "ASEAN Economic Community (AEC) - launched 2015",
        "Combined GDP approx 3.6 trillion USD",
    ],
    "dialogue_partners": ["USA", "EU", "China", "India", "Japan", "Australia", "Russia", "South Korea"],
}

KB_EU = {
    "full_name": "European Union",
    "founded_treaty": "Treaty of Rome (Treaty establishing the European Economic Community)",
    "founded_year": 1957,
    "current_members": 27,
    "brexit_year": 2020,
    "headquarters": "Brussels, Belgium",
    "currency": "Euro (€)",
    "eurozone_countries": 20,
    "aims": [
        "Promote peace and well-being",
        "Establish an internal market (free movement of goods, services, capital, people)",
        "Promote economic and social progress",
        "Preserve and develop EU cultural heritage",
    ],
    "economic_achievements": [
        "Single market with 450+ million consumers",
        "World's largest trading bloc",
        "Euro - second most traded currency after USD",
        "GDP approx 17 trillion EUR",
    ],
    "founding_members_6": ["Belgium", "France", "Germany", "Italy", "Luxembourg", "Netherlands"],
}

KB_SAARC = {
    "full_name": "South Asian Association for Regional Cooperation",
    "founded": 1985,
    "headquarters": "Kathmandu, Nepal",
    "founding_members": 7,
    "founding_member_names": ["Bangladesh", "Bhutan", "India", "Maldives", "Nepal", "Pakistan", "Sri Lanka"],
    "afghanistan_joined": 2007,
    "aims": [
        "Promote welfare and quality of life",
        "Accelerate growth of social and economic development",
        "Strengthen collective self-reliance",
        "Promote active collaboration in economic, technical, scientific fields",
    ],
    "economic_achievements": [
        "SAFTA (South Asian Free Trade Area) - signed 2004, effective 2006",
        "SAPTA (South Asian Preferential Trading Arrangement) - 1995",
    ],
    "saarc_summit_frequency": "Annual (though disrupted due to India-Pakistan tensions)",
}

KB_BRICS = {
    "full_name": "BRICS (Brazil, Russia, India, China, South Africa)",
    "acronym_origin": "Jim O'Neill coined 'BRIC' in 2001",
    "first_summit_year": 2009,
    "first_summit_location": "Yekaterinburg, Russia",
    "south_africa_joined": 2010,
    "new_members_2024": ["Saudi Arabia", "UAE", "Egypt", "Ethiopia", "Iran", "Argentina (suspended)"],
    "headquarters": "Shanghai, China (New Development Bank - NDB, est. 2014)",
    "aims": [
        "Reform UN and Bretton Woods institutions",
        "Promote cooperation among emerging economies",
        "Create alternative development finance",
    ],
    "economic_achievements": [
        "Combined GDP exceeds G7 (approx 46% of world GDP by PPP)",
        "New Development Bank (NDB) - 100 billion USD initial capital",
        "Contingent Reserve Arrangement (CRA) - 100 billion USD",
    ],
}

KB_QUAD = {
    "full_name": "Quadrilateral Security Dialogue (Quad)",
    "members": ["USA", "Japan", "India", "Australia"],
    "concept_origin_year": 2007,
    "concept_by": "Shinzo Abe (Japanese PM)",
    "revived_year": 2017,
# TRUNCATED:     "first_leader_summit": 2021 (virtual summit hosted by USA)","
    "aims": [
        "Promote a free, open, and inclusive Indo-Pacific region",
        "Uphold international law and freedom of navigation",
        "Counter China's assertiveness in the Indo-Pacific",
    ],
    "working_groups": ["Vaccine partnership", "Climate", "Critical technology", "Infrastructure"],
}

KB_INDOPAK = {
    "war_1965": {
        "year": 1965,
        "trigger": "Kashmir dispute / Operation Gibraltar",
        "duration_weeks": 5,
        "result": "Military stalemate",
        "treaty": "Tashkent Agreement",
        "tashkent_year": 1966,
        "tashkent_signatories": "Lal Bahadur Shastri (India), Ayub Khan (Pakistan)",
        "shastri_died_in_tashkent": True,
    },
    "war_1971": {
        "year": 1971,
        "trigger": "Bangladesh Liberation War / Humanitarian crisis in East Pakistan",
        "duration_days": 13,
        "result": "Decisive Indian victory; creation of Bangladesh",
        "pakistan_surrender_date": "December 16, 1971",
        "treaty": "Shimla Agreement",
        "shimla_year": 1972,
        "shimla_signatories": "Indira Gandhi (India), Zulfikar Ali Bhutto (Pakistan)",
        "simla_key_provision": "Conversion of ceasefire line into Line of Control (LoC)",
    },
    "lahore_declaration": {
        "year": 1999,
        "month": "February",
        "signatories": "Atal Bihari Vajpayee (India), Nawaz Sharif (Pakistan)",
        "context": "Part of peace process after Delhi-Lahore bus diplomacy",
        "kargil_started_after": True,
    },
    "kargil_war": {
        "year": 1999,
        "months": ["May", "June", "July"],
        "trigger": "Pakistani soldiers and Kashmiri militants infiltrated Indian side of LoC",
        "result": "Indian victory; Pakistan withdrew",
        "operation_name": "Operation Vijay",
        "lasted_days": 60,
        "pakistani_retreat": "July 26, 1999",
    },
}

KB_INDOBANGLA = {
    "farakka_barrage": {
        "completed_year": 1975,
        "purpose": "Divert Ganges water to flush Kolkata port silt",
        "bangladesh_complaint": "Reduced water flow to Bangladesh, affecting agriculture and environment",
        "treaty_year": 1996,
        "treaty_name": "Ganges Water Treaty",
        "sharing_formula": "India: 50,000 cusecs, Bangladesh: 40,000 cusecs (lean season)",
    },
    "teen_bhiga": {
        "full_name": "Teen Bhiga",
        "what": "Three enclaves of India inside Bangladesh (approx 111 acres)",
        "lease": "Leased to Bangladesh in 2015 Land Boundary Agreement",
        "status": "Boundary exchanged under 2015 LBA",
    },
    "illegal_migration": {
        "issue": "Cross-border migration from Bangladesh into India (especially West Bengal, Assam)",
        "detection_year": "Ongoing since 1971",
        "controversial_law": "Citizenship Amendment Act (CAA) 2019",
    },
}

KB_INDOCHINA = {
    "panchsheel": {
        "full_name": "Five Principles of Peaceful Coexistence",
        "year": 1954,
        "principles": [
            "Mutual respect for each other's territorial integrity and sovereignty",
            "Mutual non-aggression",
            "Mutual non-interference",
            "Equality and cooperation for mutual benefit",
            "Peaceful co-existence",
        ],
        "signed_between": "India (Nehru) and China (Zhou Enlai)",
    },
    "sino_indian_war_1962": {
        "year": 1962,
        "trigger": "Border dispute (McMahon Line - Aksai Chin / NEFA)",
        "duration_weeks": 4,
        "result": "Chinese victory; India lost territory in Aksai Chin and NEFA",
        "chinese_withdrawal": "Unilateral ceasefire declared November 21, 1962; withdrew 20 km behind actual control line",
        "causes": [
            "Dispute over McMahon Line (India accepted it, China did not)",
            "Chinese annexation of Tibet (1950)",
            "India granting asylum to Dalai Lama (1959)",
            "Forward Policy of India (advancing posts to border)",
        ],
    },
}


# ---------------------------------------------------------------------------
# Question templates
# ---------------------------------------------------------------------------

def _mcq(question_text: str, options: List[str], answer_idx: int,
          topic: str, difficulty: str, explanation: str, competency: bool,
          year_tag: str = "") -> Dict[str, Any]:
    return {
        "id": f"POL11_{year_tag}_{random.randint(100000, 999999)}",
        "type": "mcq",
        "question": question_text,
        "options": options,
        "answer": options[answer_idx],
        "answer_index": answer_idx,
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "competency_based": competency,
    }


def _fill_blank(question_text: str, answer_text: str, topic: str,
                 difficulty: str, explanation: str, competency: bool,
                 year_tag: str = "") -> Dict[str, Any]:
    return {
        "id": f"POL11_{year_tag}_{random.randint(100000, 999999)}",
        "type": "fill_blank",
        "question": question_text,
        "answer": answer_text,
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "competency_based": competency,
    }


def _short_answer(question_text: str, answer_text: str, topic: str,
                  difficulty: str, explanation: str, competency: bool,
                  year_tag: str = "") -> Dict[str, Any]:
    return {
        "id": f"POL11_{year_tag}_{random.randint(100000, 999999)}",
        "type": "short_answer",
        "question": question_text,
        "answer": answer_text,
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "competency_based": competency,
    }


def _long_answer(question_text: str, answer_text: str, topic: str,
                 difficulty: str, explanation: str, competency: bool,
                 year_tag: str = "") -> Dict[str, Any]:
    return {
        "id": f"POL11_{year_tag}_{random.randint(100000, 999999)}",
        "type": "long_answer",
        "question": question_text,
        "answer": answer_text,
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "competency_based": competency,
    }


def _numerical(question_text: str, correct_value: float, unit: str,
               tolerance: float, topic: str, difficulty: str,
               explanation: str, competency: bool,
               year_tag: str = "") -> Dict[str, Any]:
    return {
        "id": f"POL11_{year_tag}_{random.randint(100000, 999999)}",
        "type": "numerical",
        "question": question_text,
        "answer": correct_value,
        "unit": unit,
        "tolerance": tolerance,
        "explanation": explanation,
        "difficulty": difficulty,
        "topic": topic,
        "competency_based": competency,
    }


# ---------------------------------------------------------------------------
# Question generation functions - one per topic
# ---------------------------------------------------------------------------

def _gen_us_unilateralism_iraq(rng: random.Random, count: int) -> List[Dict[str, Any]]:
    questions = []
    kb = KB_US_IRAQ
    d = kb["operation_desert_storm"]
    f = kb["operation_iraqi_freedom"]

    # --- MCQs ---
    questions.append(_mcq(
        f"Operation Desert Storm was launched by the USA primarily to liberate which country from Iraqi invasion in 1991?",
        ["Iraq", "Kuwait", "Iran", "Saudi Arabia"], 1,
        "US Unilateralism - Iraq", "Easy",
        f"Operation Desert Storm (1991) was the combat phase of the Gulf War, launched to liberate Kuwait after Iraq's invasion on August 2, 1990. The UN passed Resolution 660 condemning the invasion, and a US-led coalition liberated Kuwait in 42 days.",
        True, "iraq_ds1"
    ))

    questions.append(_mcq(
        f"The primary justification given by the USA for launching Operation Iraqi Freedom in 2003 was:",
        ["To establish democracy in Iraq",
         "Iraq's alleged possession of Weapons of Mass Destruction (WMD)",
         "To avenge 9/11 attacks directly",
         "To secure oil resources"], 1,
        "US Unilateralism - Iraq", "Medium",
        "The Bush administration's primary public justification for the 2003 invasion was Iraq's alleged possession of WMD. No stockpiles were ever found. 9/11 was mentioned but the operational targets were different (Afghanistan). Democracy promotion came later as a stated goal.",
        True, "iraq_oif1"
    ))

    questions.append(_mcq(
        "Which Iraqi leader was removed from power as a result of Operation Iraqi Freedom (2003)?",
        ["Osama bin Laden", "Saddam Hussein", "Muammar Gaddafi", "Bashar al-Assad"], 1,
        "US Unilateralism - Iraq", "Easy",
        "Saddam Hussein was the President of Iraq and was removed from power in April 2003 during Operation Iraqi Freedom. He was captured in December 2003 and executed in 2006.",
        True, "iraq_saddam"
    ))

    questions.append(_mcq(
        "Operation Desert Storm was the code name for:",
        ["The initial invasion of Iraq in 2003",
         "The ground assault phase of the Gulf War in 1991",
         "The air campaign in Afghanistan in 2001",
         "The UN peacekeeping mission in Bosnia"], 1,
        "US Unilateralism - Iraq", "Easy",
        "Operation Desert Storm was the code name for the US-led air and ground offensive against Iraq in January-February 1991, part of the Gulf War (Operation Desert Shield was the defensive buildup phase).",
        False, "iraq_ds2"
    ))

    questions.append(_mcq(
        "The concept of US unilateralism refers to:",
        ["The USA acting in cooperation with the UN Security Council",
         "The USA acting independently without regard for other nations' opinions",
         "The USA withdrawing from all international commitments",
         "The USA leading NATO exclusively"], 1,
        "US Unilateralism - Iraq", "Medium",
        "Unilateralism is a policy of a state pursuing its interests without multilateral authorization. In a unipolar world, the sole superpower can exercise unilateral military power without fear of great-power balancing, as seen in Iraq 2003.",
        False, "iraq_unil1"
    ))

    questions.append(_mcq(
        "How many days did the active combat phase of Operation Desert Storm last?",
        ["14 days", "42 days", "100 days", "6 months"], 1,
        "US Unilateralism - Iraq", "Medium",
        "Operation Desert Storm's combat phase lasted 42 days (January 17 to February 28, 1991). Kuwait was liberated on February 27, 1991.",
        False, "iraq_duration"
    ))

    # --- Fill in the blanks ---
    questions.append(_fill_blank(
        "Operation Desert Storm was launched in the year ____ to liberate Kuwait.",
        "1991",
        "US Unilateralism - Iraq", "Easy",
        "Operation Desert Storm began on January 17, 1991, as the combat phase of the Gulf War, concluding on February 28, 1991 with the liberation of Kuwait.",
        True, "iraq_yr"
    ))

    questions.append(_fill_blank(
        "Operation Iraqi Freedom was launched in ____ by the USA.",
        "2003",
        "US Unilateralism - Iraq", "Easy",
        "The US-led invasion of Iraq (Operation Iraqi Freedom) began on March 20, 2003, with the stated goal of eliminating alleged Weapons of Mass Destruction.",
        False, "iraq_oifyr"
    ))

    questions.append(_fill_blank(
        "The President of the USA who launched Operation Iraqi Freedom in 2003 was ____.",
        "George W. Bush",
        "US Unilateralism - Iraq", "Easy",
        "George W. Bush (President 2001-2009) ordered the invasion of Iraq on March 20, 2003. His administration argued that Saddam Hussein possessed WMDs, which were never found.",
        True, "iraq_gwb"
    ))

    # --- Short answers ---
    questions.append(_short_answer(
        "State two aims of US unilateralism as demonstrated in the Iraq interventions.",
        "1) Removal of Saddam Hussein's regime; 2) Elimination of alleged WMDs; 3) Promotion of democracy in the Middle East",
        "US Unilateralism - Iraq", "Medium",
        "The stated aims included WMD elimination, regime change, and democratisation. The actual demonstration of unilateralism was acting without full UN authorisation, using a 'coalition of the willing' instead.",
        True, "iraq_short1"
    ))

    questions.append(_short_answer(
        "What does the term 'coalition of the willing' refer to in the context of the 2003 Iraq War?",
        "A term used by the George W. Bush administration to describe the multinational alliance that supported the 2003 Iraq invasion, bypassing formal UN Security Council authorisation.",
        "US Unilateralism - Iraq", "Medium",
        "The 'coalition of the willing' was a group of nations that supported the US-led 2003 invasion of Iraq. The US used this phrase because it did not have explicit UN Security Council authorisation, making the action unilateral in character.",
        False, "iraq_cow"
    ))

    # --- Long answers ---
    questions.append(_long_answer(
        "Explain the concept of US unilateralism in a unipolar world with reference to the USA's military intervention in Iraq (1991 and 2003).",
        "US unilateralism refers to the USA acting independently of multilateral institutions (especially the UN) in pursuit of its foreign policy objectives. After the Cold War, the collapse of the Soviet Union left the USA as the sole superpower in a unipolar world. This structural condition enabled unilateral actions.\n\nIn 1991 (Operation Desert Storm), the USA acted under UN Resolution 660, making it largely multilateral. However, in 2003 (Operation Iraqi Freedom), the USA invaded Iraq without explicit UN approval - a clear act of unilateralism. The Bush administration formed a 'coalition of the willing,' bypassing the UN Security Council where France and Russia opposed the war.\n\nFactors enabling unilateralism: (1) No great-power rival to constrain the USA; (2) Dominant military capability; (3) Economic supremacy; (4) Soft-power influence.\n\nConsequences: undermined UN legitimacy, regional instability, rise of ISIS post-2011.",
        "US Unilateralism - Iraq", "Hard",
        "A comprehensive answer should explain the structural context (unipolar world), contrast the multilateral 1991 vs unilateral 2003 interventions, cite UN Resolution 660, the concept of 'coalition of the willing,' WMD justification, and the geopolitical consequences including destabilisation of the Middle East and the rise of ISIS.",
        False, "iraq_long1"
    ))

    questions.append(_long_answer(
        "Differentiate between Operation Desert Storm and Operation Iraqi Freedom.",
        "Operation Desert Storm (1991): Gulf War, response to Iraqi invasion of Kuwait, UN authorised (Resolution 660), 42 days combat, liberated Kuwait, did not remove Saddam.\n\nOperation Iraqi Freedom (2003): Invasion to remove Saddam Hussein, claimed WMDs as justification, no explicit UN authorisation, unilateral, regime change, occupation followed.",
        "US Unilateralism - Iraq", "Medium",
        "Desert Storm was a multilateral liberation of Kuwait under UN mandate. Iraqi Freedom was a unilateral regime-change operation without UN backing. The former was a defensive response to invasion; the latter was a preemptive/preventive war.",
        False, "iraq_compare"
    ))

    # --- Numerical ---
    questions.append(_numerical(
        f"How many days did the active combat phase of Operation Desert Storm last?",
        42, "days", 1.0,
        "US Unilateralism - Iraq", "Easy",
        "Operation Desert Storm's combat phase lasted 42 days from January 17, 1991 to February 28, 1991.",
        False, "iraq_num1"
    ))

    questions.append(_numerical(
        f"How many years after the Gulf War (Desert Storm) was Operation Iraqi Freedom launched?",
        12, "years", 0.0,
        "US Unilateralism - Iraq", "Medium",
        "Desert Storm was in 1991; Iraqi Freedom was in 2003. The difference is 2003 - 1991 = 12 years.",
        False, "iraq_num2"
    ))

    return questions[:count]


def _gen_us_afghanistan_india(rng: random.Random, count: int) -> List[Dict[str, Any]]:
    questions = []
    kb = KB_US_AFGHANISTAN

    e = kb["operation_enduring_freedom"]
    iu = kb["india_us_relations"]

    questions.append(_mcq(
        "Operation Enduring Freedom was launched by the USA in response to:",
        ["The 1993 World Trade Center bombing",
         "The September 11, 2001 terrorist attacks",
         "The 2000 USS Cole bombing",
         "The 1998 US embassy bombings"], 1,
        "US Unilateralism - Afghanistan & India-US Relations", "Easy",
        "Operation Enduring Freedom began on October 7, 2001, in direct response to the 9/11 terrorist attacks. The USA demanded that the Taliban hand over Osama bin Laden; when they refused, the invasion began.",
        True, "afg_oef1"
    ))

    questions.append(_mcq(
        "Which regime was the primary target of Operation Enduring Freedom in Afghanistan?",
        ["Al-Qaeda", "The Taliban regime", "The Soviet-backed government",
         "The Northern Alliance"], 1,
        "US Unilateralism - Afghanistan & India-US Relations", "Easy",
        "Operation Enduring Freedom targeted the Taliban regime that was harbouring Al-Qaeda. The Taliban refused to hand over Osama bin Laden after the 9/11 attacks.",
        False, "afg_taliban"
    ))

    questions.append(_mcq(
        "The India-US Civil Nuclear Agreement (nuclear deal) was signed in:",
        ["2001", "2005 (agreed), 2008 (signed)", "1998", "2010"], 1,
        "US Unilateralism - Afghanistan & India-US Relations", "Medium",
        "The US-India nuclear deal was announced in July 2005, signed in October 2008, and the US Congress passed the Hyde Act. India received an NSG waiver in September 2008.",
        True, "india_nuclear"
    ))

    questions.append(_mcq(
        "Which year was the India-US 'Next Steps in Strategic Partnership' (NSSP) launched?",
        ["2001", "2004", "2008", "2014"], 1,
        "US Unilateralism - Afghanistan & India-US Relations", "Medium",
        "The Next Steps in Strategic Partnership (NSSP) was launched in January 2004, marking a significant deepening of India-US relations in the post-Cold War era.",
        True, "india_nssp"
    ))

    questions.append(_mcq(
        "India supported Operation Enduring Freedom by providing which of the following?",
        ["Combat troops in Afghanistan",
         "Overflight and logistics facilities",
         "Naval blockade in the Arabian Sea",
         "Nuclear technology"], 1,
        "US Unilateralism - Afghanistan & India-US Relations", "Medium",
        "India provided overflight, refuelling, and logistics facilities to US forces after 9/11. India also shared intelligence and opened its air bases. India did not send combat troops.",
        True, "india_oef_support"
    ))

    questions.append(_fill_blank(
        "Operation Enduring Freedom was launched in the year ____ in Afghanistan.",
        "2001",
        "US Unilateralism - Afghanistan & India-US Relations", "Easy",
        "The US launched Operation Enduring Freedom on October 7, 2001, against the Taliban regime in Afghanistan.",
        False, "afg_oefyr"
    ))

    questions.append(_short_answer(
        "How did India's relations with the USA change after 1991 in the context of a unipolar world?",
        "India moved from non-alignment to strategic partnership. Defence cooperation increased (C-17, P-8I deals). The 2005 nuclear deal was a watershed. Trade and investment grew. India became a key US partner in the Indo-Pacific.",
        "US Unilateralism - Afghanistan & India-US Relations", "Medium",
        "Post-1991, the collapse of the USSR removed the Soviet factor from Indo-US relations. India pursued economic liberalisation, which aligned with US interests. The nuclear deal (2005/2008) and defence cooperation marked the shift to a strategic partnership.",
        True, "india_post91"
    ))

    questions.append(_long_answer(
        "Examine India's relations with the USA after 1991, focusing on defence cooperation and trade agreements.",
        "After the collapse of the Soviet Union in 1991, India recalibrated its foreign policy away from non-alignment towards multi-alignment. Economic liberalisation (1991) created opportunities for US-India trade.\n\nKey developments:\n1) 1998: India's nuclear tests led to US sanctions (but reversed by 2001).\n2) 2001: Post-9/11, India provided overflight/logistics support to the US.\n3) 2004: Next Steps in Strategic Partnership (NSSP).\n4) 2005: Civil Nuclear Agreement announced.\n5) 2008: Nuclear deal signed; NSG waiver granted.\n6) Defence: C-17 Globemaster, P-8I Poseidon maritime aircraft, AH-64 Apache helicopters.\n7) Trade: Bilateral trade grew from ~$5 billion (1991) to over $150 billion (2020s).\n\nIndia-US relations evolved into a 'comprehensive global strategic partnership'.",
        "US Unilateralism - Afghanistan & India-US Relations", "Hard",
        "A thorough answer traces the post-1991 trajectory: from post-Cold War recalibration to the nuclear deal and defence purchases. Mention NSSP (2004), the nuclear deal (2005/2008), key defence platforms, and trade growth.",
        False, "india_long"
    ))

    questions.append(_numerical(
        "How many years after the collapse of the Soviet Union (1991) was the India-US Next Steps in Strategic Partnership launched?",
        13, "years", 0.0,
        "US Unilateralism - Afghanistan & India-US Relations", "Easy",
        "1991 (Soviet collapse) → 2004 (NSSP) = 13 years.",
        False, "india_num1"
    ))

    return questions[:count]


def _gen_asean_eu(rng: random.Random, count: int) -> List[Dict[str, Any]]:
    questions = []
    kb_asean = KB_ASEAN
    kb_eu = KB_EU

    questions.append(_mcq(
        "ASEAN was founded in the year:",
        ["1960", "1967", "1971", "1975"], 1,
        "Regional Cooperation - ASEAN & EU", "Easy",
        "ASEAN was founded on August 8, 1967, in Bangkok, Thailand, with five founding members: Indonesia, Malaysia, Philippines, Singapore, and Thailand.",
        False, "asean_yr"
    ))

    questions.append(_mcq(
        "How many countries are currently members of ASEAN?",
        ["5", "7", "10", "15"], 2,
        "Regional Cooperation - ASEAN & EU", "Easy",
        "ASEAN currently has 10 member states: Brunei (1984), Cambodia (1999), Indonesia, Laos (1997), Malaysia, Myanmar (1997), Philippines, Singapore, Thailand, Vietnam (1995).",
        True, "asean_members"
    ))

    questions.append(_mcq(
        "The headquarters of ASEAN is located in:",
        ["Bangkok, Thailand", "Kuala Lumpur, Malaysia", "Jakarta, Indonesia",
         "Singapore"], 2,
        "Regional Cooperation - ASEAN & EU", "Easy",
        "ASEAN's secretariat is headquartered in Jakarta, Indonesia.",
        False, "asean_hq"
    ))

    questions.append(_mcq(
        "The European Union was formally established by the Treaty of Rome in:",
        ["1945", "1957", "1992", "2000"], 1,
        "Regional Cooperation - ASEAN & EU", "Easy",
        "The Treaty of Rome was signed on March 25, 1957, by six founding members, establishing the European Economic Community (EEC), which later evolved into the European Union.",
        False, "eu_yr"
    ))

    questions.append(_mcq(
        "How many member states does the European Union currently have?",
        ["27", "28", "25", "30"], 0,
        "Regional Cooperation - ASEAN & EU", "Easy",
        "The EU currently has 27 member states. The UK left the EU on January 31, 2020 (Brexit), reducing from 28 to 27 members.",
        True, "eu_members"
    ))

    questions.append(_mcq(
        "AFTA stands for:",
        ["ASEAN Free Trade Agreement", "Asian Free Trade Agreement",
         "ASEAN Foreign Treaty Arrangement", "Asian Free Trade Alliance"], 0,
        "Regional Cooperation - ASEAN & EU", "Medium",
        "AFTA (ASEAN Free Trade Area) was established in 1992 to promote free trade among ASEAN member states by reducing intra-ASEAN tariffs.",
        False, "asean_afta"
    ))

    questions.append(_mcq(
        "The single currency of the European Union is:",
        ["Pound Sterling", "US Dollar", "Euro", "Swiss Franc"], 2,
        "Regional Cooperation - ASEAN & EU", "Easy",
        "The Euro (€) is the official currency of the Eurozone, currently adopted by 20 of the 27 EU member states.",
        False, "eu_currency"
    ))

    questions.append(_mcq(
        "The Treaty of Rome that established the EEC (precursor to the EU) was signed by how many founding members?",
        ["4", "5", "6", "8"], 2,
        "Regional Cooperation - ASEAN & EU", "Medium",
        "Six founding members signed the Treaty of Rome in 1957: Belgium, France, Germany, Italy, Luxembourg, and Netherlands.",
        False, "eu_founders"
    ))

    questions.append(_fill_blank(
        "ASEAN was founded in the year ____ with five founding members.",
        "1967",
        "Regional Cooperation - ASEAN & EU", "Easy",
        "ASEAN was founded on August 8, 1967, by Indonesia, Malaysia, Philippines, Singapore, and Thailand.",
        True, "asean_founded"
    ))

    questions.append(_fill_blank(
        "The European Union currently has ____ member states.",
        "27",
        "Regional Cooperation - ASEAN & EU", "Easy",
        "The EU has 27 members as of 2026. The UK left on January 31, 2020.",
        True, "eu_count"
    ))

    questions.append(_short_answer(
        "State any two aims of ASEAN.",
        "1) Accelerate economic growth; 2) Promote social progress and cultural development; 3) Promote regional peace and stability.",
        "Regional Cooperation - ASEAN & EU", "Easy",
        "ASEAN's aims are enshrined in the ASEAN Declaration (Bangkok Declaration) of 1967.",
        True, "asean_aims"
    ))

    questions.append(_short_answer(
        "State any two economic achievements of the European Union.",
        "1) Single market with 450+ million consumers; 2) The Euro as the second most traded global currency; 3) World's largest trading bloc.",
        "Regional Cooperation - ASEAN & EU", "Easy",
        "The EU's economic achievements include the single market, the euro, and being the world's largest trading bloc with a combined GDP of ~17 trillion EUR.",
        False, "eu_achieve"
    ))

    questions.append(_long_answer(
        "Explain the aims and economic achievements of ASEAN as a regional cooperation organisation.",
        "Aims: ASEAN was founded in 1967 to (1) accelerate economic growth, (2) promote social progress, (3) promote cultural development, and (4) promote regional peace and stability.\n\nEconomic Achievements: (1) AFTA (ASEAN Free Trade Area, 1992) reduced intra-ASEAN tariffs to 0-5%; (2) ASEAN Economic Community (AEC, 2015) created a single market; (3) Combined GDP of ~$3.6 trillion; (4) Became one of the world's fastest-growing regions.\n\nASEAN also serves as a regional forum for dialogue with major powers (US, China, India, Japan, EU).",
        "Regional Cooperation - ASEAN & EU", "Medium",
        "Mention founding year (1967), the five original aims, AFTA (1992), AEC (2015), and the economic impact.",
        False, "asean_long"
    ))

    questions.append(_numerical(
        "How many years did it take for ASEAN to expand from 5 founding members to 10 members?",
        32, "years", 0.0,
        "Regional Cooperation - ASEAN & EU", "Medium",
        "ASEAN founded with 5 members in 1967. It reached 10 members when Laos and Myanmar joined in 1997 (Brunei joined in 1984). So 5→6 by 1984, and 6→10 by 1997. 1997-1967 = 30 years to 10 members.",
        False, "asean_num1"
    ))

    return questions[:count]


def _gen_saarc_brics_quad(rng: random.Random, count: int) -> List[Dict[str, Any]]:
    questions = []
    kb_saarc = KB_SAARC
    kb_brics = KB_BRICS
    kb_quad = KB_QUAD

    questions.append(_mcq(
        "SAARC was founded in the year:",
        ["1975", "1985", "1990", "1995"], 1,
        "Regional Cooperation - SAARC, BRICS, QUAD", "Easy",
        "SAARC was founded on December 8, 1985, in Dhaka, Bangladesh, with seven founding members.",
        True, "saarc_yr"
    ))

    questions.append(_mcq(
        "The headquarters of SAARC is located in:",
        ["Dhaka, Bangladesh", "New Delhi, India", "Kathmandu, Nepal",
         "Colombo, Sri Lanka"], 2,
        "Regional Cooperation - SAARC, BRICS, QUAD", "Easy",
        "SAARC's headquarters is in Kathmandu, Nepal.",
        False, "saarc_hq"
    ))

    questions.append(_mcq(
        "How many founding members did SAARC have?",
        ["5", "6", "7", "8"], 2,
        "Regional Cooperation - SAARC, BRICS, QUAD", "Easy",
        "SAARC was founded by seven countries: Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, and Sri Lanka. Afghanistan joined later in 2007.",
        True, "saarc_founders"
    ))

    questions.append(_mcq(
        "BRICS stands for which five countries?",
        ["Brazil, Russia, India, China, South Africa", "Britain, Russia, India, China, Singapore",
         "Belgium, Romania, Italy, Chile, Spain", "Brazil, Romania, Indonesia, Canada, Sudan"], 0,
        "Regional Cooperation - SAARC, BRICS, QUAD", "Easy",
        "BRICS stands for Brazil, Russia, India, China, and South Africa. South Africa was added in 2010 to the original 'BRIC' (Jim O'Neill, 2001).",
        True, "brics_full"
    ))

    questions.append(_mcq(
        "The first BRICS summit was held in:",
        ["2005 in New York", "2009 in Yekaterinburg, Russia",
         "2010 in Brasília, Brazil", "2012 in New Delhi, India"], 1,
        "Regional Cooperation - SAARC, BRICS, QUAD", "Medium",
        "The first BRICS summit was held in Yekaterinburg, Russia, in June 2009.",
        False, "brics_first"
    ))

    questions.append(_mcq(
        "The New Development Bank (NDB) associated with BRICS is headquartered in:",
        ["New York, USA", "London, UK", "Shanghai, China", "São Paulo, Brazil"], 2,
        "Regional Cooperation - SAARC, BRICS, QUAD", "Medium",
        "The New Development Bank (formerly BRICS Bank) is headquartered in Shanghai, China.",
        False, "brics_ndb"
    ))

    questions.append(_mcq(
        "The Quad (Quadrilateral Security Dialogue) comprises which four countries?",
        ["USA, UK, India, Japan", "USA, Japan, India, Australia",
         "USA, China, India, Japan", "USA, Japan, South Korea, Australia"], 1,
        "Regional Cooperation - SAARC, BRICS, QUAD", "Easy",
        "The Quad comprises the USA, Japan, India, and Australia. It was revived in 2017 after being first conceived by Japanese PM Shinzo Abe in 2007.",
        True, "quad_members"
    ))

    questions.append(_mcq(
        "SAFTA stands for:",
        ["South Asian Free Trade Agreement",
         "South Asian Federation for Trade Arrangement",
         "SAARC Free Trade Agreement",
         "South Asian Foreign Trade Association"], 2,
        "Regional Cooperation - SAARC, BRICS, QUAD", "Medium",
        "SAFTA stands for SAARC Free Trade Agreement, signed in 2004 and effective from 2006, to promote free trade among SAARC member states.",
        True, "saarc_safta"
    ))

    questions.append(_fill_blank(
        "SAARC was founded in the year ____.",
        "1985",
        "Regional Cooperation - SAARC, BRICS, QUAD", "Easy",
        "SAARC was founded on December 8, 1985, with seven founding members.",
        True, "saarc_yr_fb"
    ))

    questions.append(_fill_blank(
        "BRICS stands for ____, Russia, India, China, and South Africa.",
        "Brazil",
        "Regional Cooperation - SAARC, BRICS, QUAD", "Easy",
        "BRICS = Brazil, Russia, India, China, South Africa. The acronym was coined by Jim O'Neill in 2001.",
        False, "brics_brazil"
    ))

    questions.append(_fill_blank(
        "The Quad comprises USA, Japan, India, and ____.",
        "Australia",
        "Regional Cooperation - SAARC, BRICS, QUAD", "Easy",
        "The Quad (Quadrilateral Security Dialogue) was first proposed by Japanese PM Shinzo Abe in 2007 and revived in 2017. Members: USA, Japan, India, Australia.",
        True, "quad_aus"
    ))

    questions.append(_short_answer(
        "State any two aims of BRICS.",
        "1) Reform UN and Bretton Woods institutions; 2) Promote cooperation among emerging economies; 3) Create alternative development finance through NDB.",
        "Regional Cooperation - SAARC, BRICS, QUAD", "Medium",
        "BRICS aims to challenge Western-dominated global governance and promote the interests of emerging economies. Key institutions: NDB (New Development Bank) and CRA (Contingent Reserve Arrangement).",
        True, "brics_aims"
    ))

    questions.append(_short_answer(
        "What is the strategic significance of the Quad in contemporary international relations?",
        "The Quad is a strategic forum of four democracies in the Indo-Pacific aimed at countering China's assertiveness, ensuring freedom of navigation, and promoting a rules-based order. It represents the US 'pivot/rebalance to Asia' policy.",
        "Regional Cooperation - SAARC, BRICS, QUAD", "Hard",
        "The Quad represents the convergence of democratic Indo-Pacific powers. Its strategic significance includes countering China, protecting sea lanes, promoting infrastructure alternatives (Blue Dot Network), and technology cooperation.",
        True, "quad_sig"
    ))

    questions.append(_long_answer(
        "Compare and contrast SAARC and BRICS as regional cooperation organisations.",
        "SAARC (1985, 7 founding members, Kathmandu HQ) focuses on South Asian regional integration but is constrained by India-Pakistan tensions. BRICS (2009, 5 members, Shanghai NDB HQ) brings together emerging economies from different regions.\n\nSimilarities: Both aim at economic cooperation among member states.\n\nDifferences: SAARC is a regional South Asian body; BRICS is a cross-regional emerging-economy bloc. SAARC has a free trade agreement (SAFTA) but limited implementation. BRICS created the NDB and CRA with significant financial resources. SAARC's progress is hindered by India-Pakistan rivalry; BRICS faces challenges due to China-India tensions.",
        "Regional Cooperation - SAARC, BRICS, QUAD", "Hard",
        "Highlight founding contexts, economic achievements, institutional structures, and key constraints for each bloc.",
        False, "saarc_brics"
    ))

    questions.append(_numerical(
        "How many years after the founding of SAARC (1985) was the first BRICS summit held?",
        24, "years", 0.0,
        "Regional Cooperation - SAARC, BRICS, QUAD", "Medium",
        "SAARC founded 1985 → First BRICS summit 2009: 2009 - 1985 = 24 years.",
        False, "saarc_brics_num"
    ))

    return questions[:count]


def _gen_indopak_relations(rng: random.Random, count: int) -> List[Dict[str, Any]]:
    questions = []
    kb = KB_INDOPAK

    w65 = kb["war_1965"]
    w71 = kb["war_1971"]
    k99 = kb["kargil_war"]

    questions.append(_mcq(
        "The Tashkent Agreement (1966) was signed between India and ____ to end the 1965 war.",
        ["China", "Pakistan", "Bangladesh", "Sri Lanka"], 1,
        "India-Pakistan Relations", "Easy",
        "The Tashkent Agreement was signed on January 10, 1966, in Tashkent, Uzbekistan (then USSR), by Indian PM Lal Bahadur Shastri and Pakistani President Ayub Khan.",
        True, "ip_tashkent"
    ))

    questions.append(_mcq(
        "The Shimla Agreement was signed in:",
        ["1965", "1971", "1972", "1975"], 2,
        "India-Pakistan Relations", "Easy",
        "The Shimla Agreement was signed on July 2, 1972, in Shimla, Himachal Pradesh, by PM Indira Gandhi and Pakistani President Zulfikar Ali Bhutto.",
        True, "ip_shimla"
    ))

    questions.append(_mcq(
        "The Kargil War took place in which year?",
        ["1971", "1984", "1999", "2002"], 2,
        "India-Pakistan Relations", "Easy",
        "The Kargil War occurred in May-July 1999 when Pakistani soldiers infiltrated across the Line of Control (LoC) in Kargil district, Kashmir.",
        True, "ip_kargil_yr"
    ))

    questions.append(_mcq(
        "The Lahore Declaration was signed in February 1999 between:",
        ["Nawaz Sharif and Atal Bihari Vajpayee",
         "Benazir Bhutto and Rajiv Gandhi",
         "Pervez Musharraf and Manmohan Singh",
         "Imran Khan and Narendra Modi"], 0,
        "India-Pakistan Relations", "Medium",
        "The Lahore Declaration was signed on February 21, 1999, by Pakistani PM Nawaz Sharif and Indian PM Atal Bihari Vajpayee, as part of a peace process. The Kargil War started shortly after.",
        True, "ip_lahore"
    ))

    questions.append(_mcq(
        "The 1971 war between India and Pakistan led to the creation of which new nation?",
        ["Nepal", "Sri Lanka", "Bangladesh", "Myanmar"], 2,
        "India-Pakistan Relations", "Easy",
        "The 1971 war resulted in the independence of East Pakistan, which became Bangladesh on December 16, 1971. Indian forces accepted the Pakistani surrender in Dhaka.",
        True, "ip_1971_bd"
    ))

    questions.append(_mcq(
        "Operation Vijay was the code name for India's military operation in:",
        ["The 1971 Bangladesh Liberation War",
         "The Kargil War (1999)",
         "The 1965 war",
         "The 1999 Lahore bus diplomacy"], 1,
        "India-Pakistan Relations", "Medium",
        "Operation Vijay was the code name for India's military operation to evict Pakistani infiltrators from the Kargil sector in 1999.",
        True, "ip_vijay"
    ))

    questions.append(_mcq(
        "When did the Pakistani forces surrender in Dhaka during the 1971 war?",
        ["January 15, 1971", "December 16, 1971",
         "March 26, 1971", "November 21, 1971"], 1,
        "India-Pakistan Relations", "Medium",
        "Pakistani forces surrendered on December 16, 1971, in Dhaka. This day is observed as Vijay Diwas in India.",
        True, "ip_surrender"
    ))

    questions.append(_fill_blank(
        "The Tashkent Agreement between India and Pakistan was signed in ____.",
        "1966",
        "India-Pakistan Relations", "Easy",
        "The Tashkent Agreement was signed on January 10, 1966, in Tashkent (then USSR) by PM Shastri and President Ayub Khan.",
        True, "ip_tashkent_yr"
    ))

    questions.append(_fill_blank(
        "The Kargil War took place in ____.",
        "1999",
        "India-Pakistan Relations", "Easy",
        "The Kargil War occurred in May-July 1999 between India and Pakistan along the Line of Control.",
        True, "ip_kargil_yr2"
    ))

    questions.append(_fill_blank(
        "The Shimla Agreement was signed in ____.",
        "1972",
        "India-Pakistan Relations", "Easy",
        "The Shimla Agreement was signed on July 2, 1972, in Shimla, by PM Indira Gandhi and President Z.A. Bhutto.",
        False, "ip_shimla_yr"
    ))

    questions.append(_fill_blank(
        "The Lahore Declaration was signed in the year ____.",
        "1999",
        "India-Pakistan Relations", "Easy",
        "The Lahore Declaration was signed in February 1999 by Nawaz Sharif and Atal Bihari Vajpayee.",
        True, "ip_lahore_yr"
    ))

    questions.append(_short_answer(
        "State any two reasons for the 1965 war between India and Pakistan.",
        "1) Kashmir dispute; 2) Pakistan's Operation Gibraltar (sending infiltrators into Kashmir); 3) Religious tensions; 4) Water dispute.",
        "India-Pakistan Relations", "Medium",
        "The 1965 war was triggered by Pakistan's Operation Gibraltar - an attempt to infiltrate forces into Jammu & Kashmir to incite rebellion. India responded militarily, leading to a full-scale war.",
        True, "ip_1965_causes"
    ))

    questions.append(_short_answer(
        "What was the significance of the Shimla Agreement (1972)?",
        "It converted the ceasefire line into the Line of Control (LoC), established principles for peaceful relations, committed both sides to bilateral negotiations, and returned captured territory.",
        "India-Pakistan Relations", "Medium",
        "The Shimla Agreement was significant because: (1) It converted the ceasefire line into the LoC; (2) Committed both countries to resolve disputes bilaterally; (3) India returned Pakistani territory captured in 1971 (~13,000 sq km); (4) It was the foundation for future India-Pakistan relations.",
        True, "ip_shimla_sig"
    ))

    questions.append(_long_answer(
        "Analyse the India-Pakistan wars of 1965 and 1971 and the subsequent peace agreements (Tashkent and Shimla).",
        "1965 War: Triggered by Pakistan's Operation Gibraltar in Kashmir. Lasted 5 weeks. Ended with Tashkent Agreement (1966) - a return to pre-war positions. Indian PM Shastri died in Tashkent.\n\n1971 War: Triggered by the humanitarian crisis in East Pakistan (1970 elections denied, Bengali uprising, refugee exodus into India). India supported Mukti Bahini. Lasted 13 days. Pakistan surrendered in Dhaka (Dec 16). Resulted in creation of Bangladesh.\n\nShimla Agreement (1972): Signed by Indira Gandhi and Z.A. Bhutto. Converted ceasefire line to LoC. Committed to bilateral resolution. India returned captured Pakistani territory.\n\nImpact: Both agreements failed to create lasting peace. Shimla was undermined by subsequent developments (nuclear tests, Kargil, terrorism).",
        "India-Pakistan Relations", "Hard",
        "Evaluate each war's causes, course, outcome, and the subsequent peace agreements. Note that Shimla's LoC provision remains significant.",
        False, "ip_wars_long"
    ))

    questions.append(_long_answer(
        "Discuss the causes and consequences of the Kargil War (1999).",
        "Causes: Pakistan wanted to internationalise the Kashmir issue by infiltrating across the LoC. The Kargil War was timed to coincide with Lahore peace process.\n\nCourse: Pakistani infiltrators occupied strategic heights in Kargil (May 1999). India launched Operation Vijay (ground) and Operation Safed Sagar (air). After two months of fighting, Pakistan withdrew.\n\nConsequences: (1) Lahore Declaration process collapsed; (2) Pakistan diplomatically isolated; (3) India strengthened its military intelligence; (4) Kargil Review Committee recommended intelligence reforms; (5) Sharif government weakened in Pakistan; (6) Demonstrated that infiltration across LoC would not be tolerated.",
        "India-Pakistan Relations", "Hard",
        "Link Kargil to the Lahore Declaration context, describe Operation Vijay, Pakistan's withdrawal, and the political/military consequences.",
        True, "ip_kargil_long"
    ))

    questions.append(_numerical(
        "How many days after the Shimla Agreement (July 2, 1972) would 50 years of bilateral engagement be counted? (Treat as leap-year arithmetic, approximate).",
        18250, "days", 50.0,
        "India-Pakistan Relations", "Medium",
        "50 years ≈ 50 x 365 + 12 leap days = 18,250 days approximately.",
        False, "ip_num1"
    ))

    questions.append(_numerical(
        "How many years passed between the Tashkent Agreement (1966) and the Kargil War (1999)?",
        33, "years", 0.0,
        "India-Pakistan Relations", "Medium",
        "1999 - 1966 = 33 years between the Tashkent Agreement and the Kargil War.",
        False, "ip_num2"
    ))

    return questions[:count]


def _gen_indobangladesh_china(rng: random.Random, count: int) -> List[Dict[str, Any]]:
    questions = []
    kb_ib = KB_INDOBANGLA
    kb_ic = KB_INDOCHINA

    p = kb_ic["panchsheel"]
    w62 = kb_ic["sino_indian_war_1962"]
    fb = kb_ib["farakka_barrage"]

    questions.append(_mcq(
        "The Panchsheel Agreement was signed between India and ____ in 1954.",
        ["Pakistan", "China", "Nepal", "Sri Lanka"], 1,
        "India-Bangladesh & India-China Relations", "Easy",
        "The Panchsheel Agreement (Five Principles of Peaceful Coexistence) was signed between India (PM Nehru) and China (PM Zhou Enlai) on April 29, 1954.",
        True, "ic_panchsheel"
    ))

    questions.append(_mcq(
        "The Five Principles of Peaceful Coexistence (Panchsheel) were signed in:",
        ["1947", "1954", "1962", "1971"], 1,
        "India-Bangladesh & India-China Relations", "Easy",
        "Panchsheel was signed in 1954 as an agreement on trade and intercourse between India and China (Tibet region).",
        True, "ic_panchsheel_yr"
    ))

    questions.append(_mcq(
        "The Sino-Indian War of 1962 was primarily over a dispute concerning:",
        ["Sikkim", "The McMahon Line and Aksai Chin", "Arunachal Pradesh water resources",
         "Trade routes"], 1,
        "India-Bangladesh & India-China Relations", "Medium",
        "The 1962 war was caused by a border dispute over the McMahon Line (accepted by India but not China) in the NEFA (Arunachal Pradesh) region and Aksai Chin in the west.",
        True, "ic_1962_border"
    ))

    questions.append(_mcq(
        "China declared a unilateral ceasefire during the 1962 war on:",
        ["October 20, 1962", "November 21, 1962", "December 1, 1962",
         "November 11, 1962"], 1,
        "India-Bangladesh & India-China Relations", "Medium",
        "China declared a unilateral ceasefire on November 21, 1962, and withdrew 20 km behind the actual line of control by December 1.",
        True, "ic_1962_ceasefire"
    ))

    questions.append(_mcq(
        "The Farakka Barrage was completed in the year:",
        ["1971", "1975", "1980", "1990"], 1,
        "India-Bangladesh & India-China Relations", "Medium",
        "The Farakka Barrage on the Ganges was completed in 1975 to divert water to the Hooghly river to flush silt from Kolkata port. Bangladesh complained about reduced water flow.",
        True, "ib_farakka"
    ))

    questions.append(_mcq(
        "The India-Bangladesh Land Boundary Agreement (Teen Bhiga enclaves) was resolved in:",
        ["2000", "2005", "2015", "2020"], 2,
        "India-Bangladesh & India-China Relations", "Medium",
        "The Land Boundary Agreement was signed in 2015, resolving the issue of 111 Indian enclaves inside Bangladesh (and vice versa), including the Teen Bhiga enclaves.",
        True, "ib_lba"
    ))

    questions.append(_mcq(
        "Which principle among Panchsheel refers to non-interference in each other's internal affairs?",
        ["Mutual respect for sovereignty",
         "Mutual non-aggression",
         "Mutual non-interference",
         "Equality and cooperation"], 2,
        "India-Bangladesh & India-China Relations", "Easy",
        "The third principle of Panchsheel is 'Mutual non-interference in each other's internal affairs.'",
        False, "ic_panch3"
    ))

    questions.append(_mcq(
        "The McMahon Line was related to the border dispute between:",
        "India and China",
        ["India and Pakistan", "India and Nepal", "India and Myanmar"], 0,
        "India-Bangladesh & India-China Relations", "Medium",
        "The McMahon Line was the boundary agreed upon in the 1914 Simla Convention between British India and Tibet. China never accepted it, leading to the 1962 war.",
        True, "ic_mcmahon"
    ))

    questions.append(_fill_blank(
        "The Panchsheel Agreement was signed between India and ____ in 1954.",
        "China",
        "India-Bangladesh & India-China Relations", "Easy",
        "The Panchsheel Agreement was signed between India (Nehru) and China (Zhou Enlai) on April 29, 1954.",
        False, "ic_panchsheel_fb"
    ))

    questions.append(_fill_blank(
        "The Sino-Indian War of ____ was fought over the McMahon Line dispute.",
        "1962",
        "India-Bangladesh & India-China Relations", "Easy",
        "The Sino-Indian War took place in October-November 1962. China declared a unilateral ceasefire on November 21, 1962.",
        False, "ic_1962_fb"
    ))

    questions.append(_fill_blank(
        "The Farakka Barrage on the Ganges was completed in ____.",
        "1975",
        "India-Bangladesh & India-China Relations", "Medium",
        "The Farakka Barrage was completed in 1975 to divert Ganges water to maintain the navigability of Kolkata port.",
        True, "ib_farakka_yr"
    ))

    questions.append(_short_answer(
        "State any two causes of the 1962 Sino-Indian War.",
        "1) Border dispute over the McMahon Line (China did not accept it); 2) China's annexation of Tibet (1950); 3) India granting asylum to the Dalai Lama (1959); 4) India's Forward Policy.",
        "India-Bangladesh & India-China Relations", "Medium",
        "The 1962 war had multiple causes: the unresolved border dispute (McMahon Line), China's control of Tibet (1950), India's asylum to the Dalai Lama (1959), and India's 'Forward Policy' of establishing military posts along the disputed border.",
        True, "ic_1962_causes"
    ))

    questions.append(_short_answer(
        "What was the main issue between India and Bangladesh regarding the Farakka Barrage?",
        "Bangladesh complained that the Farakka Barrage diverted too much Ganges water, reducing water flow to Bangladesh, affecting agriculture and causing environmental degradation. A 1996 treaty provided a sharing formula.",
        "India-Bangladesh & India-China Relations", "Medium",
        "The Farakka Barrage issue: India diverts Ganges water to flush Kolkata port silt; Bangladesh gets less water → reduced irrigation, salinity intrusion, environmental damage. The 1996 Ganges Water Treaty provided a 30-year sharing arrangement.",
        True, "ib_farakka_issue"
    ))

    questions.append(_long_answer(
        "Examine the causes and consequences of the 1962 Sino-Indian War.",
        "Causes: (1) Border dispute over McMahon Line - India accepted it as the boundary; China rejected it. (2) China's annexation of Tibet (1950) brought Chinese forces to India's northern border. (3) India granted asylum to the Dalai Lama (1959), angering China. (4) India's 'Forward Policy' (1961) established military posts along the disputed border.\n\nCourse: China launched a two-front offensive in October 1962. Indian forces were poorly equipped and outnumbered. China advanced deep into NEFA (Arunachal Pradesh) and captured Aksai Chin.\n\nConsequences: (1) India suffered a humiliating defeat; (2) China declared unilateral ceasefire on November 21, 1962; (3) India's defence policy was completely reoriented; (4) India sought US military aid; (5) Nehru's prestige declined; (6) The border dispute remains unresolved.",
        "India-Bangladesh & India-China Relations", "Hard",
        "Discuss the geopolitical context, border dispute origins, the war's military course, and its lasting impact on India's defence and foreign policy.",
        False, "ic_1962_long"
    ))

    questions.append(_long_answer(
        "Discuss the Panchsheel Agreement and its relevance for India-China relations today.",
        "Panchsheel (1954) comprised five principles: (1) Mutual respect for sovereignty and territorial integrity, (2) Mutual non-aggression, (3) Mutual non-interference, (4) Equality and cooperation for mutual benefit, (5) Peaceful coexistence.\n\nSigned by Nehru and Zhou Enlai, it represented the initial optimism in India-China relations ('Hindi-Chini bhai-bhai').\n\nRelevance today: The principles remain the stated framework for India-China relations, but China has violated them through border incursions (Galwan 2020), infrastructure in Aksai Chin, and support to Pakistan. India continues to cite Panchsheel while demanding Chinese adherence.",
        "India-Bangladesh & India-China Relations", "Hard",
        "Cover all five principles, their 1954 context, the 'Hindi-Chini bhai-bhai' phase, and the tension between idealistic principles and realpolitik border conflicts.",
        True, "ic_panch_long"
    ))

    questions.append(_numerical(
        "How many years passed between the signing of the Panchsheel Agreement (1954) and the Sino-Indian War (1962)?",
        8, "years", 0.0,
        "India-Bangladesh & India-China Relations", "Easy",
        "1962 - 1954 = 8 years. The Panchsheel was signed in 1954; the war occurred in 1962.",
        False, "ic_num1"
    ))

    questions.append(_numerical(
        "How many years after the Farakka Barrage (1975) was the India-Bangladesh Ganges Water Treaty signed?",
        21, "years", 0.0,
        "India-Bangladesh & India-China Relations", "Medium",
        "1975 (Farakka completion) → 1996 (Ganges Water Treaty) = 21 years.",
        False, "ib_num1"
    ))

    return questions[:count]


# ---------------------------------------------------------------------------
# Main generator
# ---------------------------------------------------------------------------

def generate_questions(seed: int, count: int = 30) -> List[Dict[str, Any]]:
    """
    Generate a deterministic, mixed set of CISCE POL Class 11 questions.

    Parameters
    ----------
    seed : int
        Random seed for deterministic generation.
    count : int
        Total number of questions to generate (default 30).

    Returns
    -------
    List[Dict[str, Any]]
        Each dict has keys: id, type, question, answer, explanation,
        difficulty, topic, competency_based (and optionally options,
        unit, tolerance, answer_index).
    """
    rng = _seed(seed)
    all_questions: List[Dict[str, Any]] = []

    topics = [
        ("iraq",       _gen_us_unilateralism_iraq),
        ("afghanistan",_gen_us_afghanistan_india),
        ("asean_eu",   _gen_asean_eu),
        ("saarc",      _gen_saarc_brics_quad),
        ("indopak",    _gen_indopak_relations),
        ("indobd_china", _gen_indobangladesh_china),
    ]

    # Distribute count evenly, with remainder going to earlier topics
    base = count // len(topics)
    remainder = count % len(topics)

    for idx, (tag, gen_fn) in enumerate(topics):
        topic_count = base + (1 if idx < remainder else 0)
        if topic_count > 0:
            qs = gen_fn(rng, topic_count)
            all_questions.extend(qs)

    # Shuffle deterministically
    rng.shuffle(all_questions)

    # Ensure exactly `count` questions (trim if over)
    all_questions = all_questions[:count]

    # Re-assign sequential IDs for cleanliness
    for i, q in enumerate(all_questions):
        q["id"] = f"CISCE_POL11_{seed}_{i+1:03d}_{q['type'][:3].upper()}"

    return all_questions


# ---------------------------------------------------------------------------
# Solver functions
# ---------------------------------------------------------------------------

def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve an MCQ question: verify the selected option."""
    question = params.get("question", "")
    options = params.get("options", [])
    selected_idx = params.get("selected_index", None)
    correct_idx = params.get("answer_index", None)
    correct_answer = params.get("answer", "")

    steps = [
        "Step 1: Read and understand the question.",
        f"Step 2: Evaluate each option: {options}",
        f"Step 3: Identify the correct answer index: {correct_idx}",
        f"Step 4: The correct answer is '{correct_answer}'.",
    ]

    is_correct = selected_idx == correct_idx if selected_idx is not None else False

    verification = {
        "correct_answer": correct_answer,
        "correct_index": correct_idx,
        "user_selected_index": selected_idx,
        "is_correct": is_correct,
        "method": "direct knowledge lookup",
    }

    return {
        "answer": correct_answer,
        "steps": steps,
        "verification": verification,
        "is_correct": is_correct,
    }


def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """Solve a fill-in-the-blank question."""
    question = params.get("question", "")
    correct_answer = params.get("answer", "")
    user_answer = params.get("user_answer", "")


    return {"status": "ok", "note": "truncated"}
