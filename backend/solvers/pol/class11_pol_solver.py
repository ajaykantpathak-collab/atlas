"""
CISCE Class 11 Political Science Solver & Question Generator
Syllabus: c11_pol_023 through c11_pol_028
"""

import random
from dataclasses import dataclass, field
from typing import Dict, List, Any, Optional, Tuple
import hashlib
import re


# ──────────────────────────── Data Models ────────────────────────────

@dataclass
class TopicContent:
    """Stores structured content for a political science topic."""
    topic_id: str
    title: str
    facts: Dict[str, str]
    mcq_pool: List[Dict[str, Any]]
    short_answer_bank: List[Dict[str, Any]]
    long_answer_bank: List[Dict[str, Any]]


# ─────────────────────── Topic Knowledge Base ────────────────────────

TOPIC_CONTENTS: Dict[str, TopicContent] = {}

def _build_knowledge_base():
    global TOPIC_CONTENTS

    us_uni = TopicContent(
        topic_id="c11_pol_023",
        title="US Unilateralism",
        facts={
            "unilateralism_definition": "A policy of pursuing national interests without regard for the interests or opinions of other nations or international bodies.",
            "iraq_war_2003": "US-led invasion of Iraq in March 2003, justified by claims of Weapons of Mass Destruction (WMD) which were never found.",
            "afghanistan_war_2001": "US invasion of Afghanistan in October 2001 following the 9/11 attacks, targeting Al-Qaeda and the Taliban regime.",
            "geo_strategic_location": "West Asia (Middle East) holds about two-thirds of the world's known oil reserves, making it geopolitically critical.",
            "weapons_of_mass_destruction": "WMD refers to nuclear, chemical, and biological weapons. Iraq was accused of possessing WMD but none were found after invasion.",
            "united_nations": "The UN was bypassed in the Iraq invasion; the US acted without explicit UN Security Council authorization.",
            "cost_of_wars": "The Iraq and Afghanistan wars cost the US trillions of dollars and caused massive civilian casualties and displacement.",
            "damage_to_un": "Unilateral US actions damaged the credibility and authority of the United Nations as a multilateral institution.",
            "condoleezza_rice": "US Secretary of State Condoleezza Rice was a key architect of the Iraq War policy during the Bush administration.",
            "george_w_bush": "George W. Bush was the US President who authorized the invasions of Afghanistan (2001) and Iraq (2003).",
        },
        mcq_pool=[
            {
                "question": "The US invasion of Iraq was primarily justified by the claim that Iraq possessed:",
                "options": ["Nuclear weapons only", "Weapons of Mass Destruction", "Chemical weapons only", "No justification needed"],
                "answer": "Weapons of Mass Destruction",
                "explanation": "The US claimed Iraq had WMD as the primary justification, but no such weapons were found after the invasion."
            },
            {
                "question": "The US invasion of Afghanistan in 2001 was triggered by:",
                "options": ["Oil reserves", "9/11 terrorist attacks", "Border disputes", "Nuclear proliferation"],
                "answer": "9/11 terrorist attacks",
                "explanation": "The invasion followed the September 11, 2001 attacks by Al-Qaeda, which was sheltered by the Taliban regime in Afghanistan."
            },
            {
                "question": "Which body was bypassed during the US invasion of Iraq in 2003?",
                "options": ["NATO", "European Union", "United Nations", "OPEC"],
                "answer": "United Nations",
                "explanation": "The US invaded Iraq without explicit authorization from the UN Security Council, acting unilaterally."
            },
            {
                "question": "Unilateralism in foreign policy means:",
                "options": [
                    "Acting with international consensus",
                    "Pursuing national interests alone without international bodies",
                    "Forming alliances with multiple nations",
                    "Following UN resolutions strictly"
                ],
                "answer": "Pursuing national interests alone without international bodies",
                "explanation": "Unilateralism is the policy of acting independently without regard for other nations or international organizations."
            },
            {
                "question": "West Asia is strategically important mainly due to its:",
                "options": ["Large population", "Geographic size", "Oil reserves", "Military power"],
                "answer": "Oil reserves",
                "explanation": "West Asia holds about two-thirds of the world's known oil reserves, making it critically important to global powers."
            },
            {
                "question": "Who was the US President during the Iraq and Afghanistan wars (2001-2009)?",
                "options": ["Bill Clinton", "George W. Bush", "Barack Obama", "Donald Trump"],
                "answer": "George W. Bush",
                "explanation": "George W. Bush authorized both the Afghanistan invasion (2001) and Iraq invasion (2003) during his presidency."
            },
        ],
        short_answer_bank=[
            {
                "question": "Define unilateralism in the context of US foreign policy.",
                "answer": "Unilateralism refers to a policy approach where a country pursues its national interests independently, without seeking approval from or coordinating with international bodies like the United Nations, and without regard for the opinions or interests of other nations.",
                "keywords": ["national interests", "independently", "without international bodies", "UN bypassed"]
            },
            {
                "question": "Why is West Asia considered geopolitically significant?",
                "answer": "West Asia is geopolitically significant because it holds about two-thirds of the world's known oil reserves. Control over this region gives major powers strategic advantage over global energy supplies.",
                "keywords": ["oil reserves", "two-thirds", "strategic advantage", "energy"]
            },
            {
                "question": "What was the stated reason for the US invasion of Iraq in 2003?",
                "answer": "The US claimed Iraq possessed Weapons of Mass Destruction (WMD) and posed a threat to international security. However, no WMD were found after the invasion.",
                "keywords": ["WMD", "Weapons of Mass Destruction", "no WMD found", "security threat"]
            },
            {
                "question": "How did US unilateralism damage the United Nations?",
                "answer": "US unilateral actions, particularly the Iraq invasion without UN authorization, damaged the UN's credibility as a multilateral institution and undermined its authority as a global peacekeeping body.",
                "keywords": ["credibility", "multilateral institution", "authority", "peacekeeping"]
            },
        ],
        long_answer_bank=[
            {
                "question": "Explain the concept of US unilateralism and its manifestation in the Iraq War (2003).",
                "answer": "US unilateralism is the policy approach where the United States pursues its national interests independently, without multilateral consensus or UN authorization. This was clearly manifested in the 2003 Iraq War where the US bypassed the UN Security Council, claiming Iraq possessed Weapons of Mass Destruction. Despite lacking conclusive evidence and without UN approval, the US led a 'coalition of the willing' to invade Iraq. The invasion resulted in the collapse of Saddam Hussein's regime but also caused massive civilian casualties, regional instability, and damaged the credibility of the United Nations as an international peacekeeping institution. The absence of WMD post-invasion further discredited the rationale for the war.",
                "keywords": ["national interests", "bypass UN", "WMD", "coalition of willing", "civilian casualties", "UN credibility", "Saddam Hussein"]
            },
            {
                "question": "Discuss the US intervention in Afghanistan (2001) and its consequences.",
                "answer": "The US invasion of Afghanistan in October 2001 was a response to the 9/11 terrorist attacks orchestrated by Al-Qaeda, which was sheltered by the Taliban regime. The invasion aimed to dismantle Al-Qaeda and remove the Taliban from power. While the initial military campaign succeeded in toppling the Taliban, the long-term consequences were significant: a prolonged 20-year occupation, massive loss of life, displacement of millions, and enormous financial costs. The eventual withdrawal of US forces in 2021 and the rapid return of the Taliban highlighted the limitations of unilateral military intervention and raised questions about the effectiveness of foreign military presence in nation-building efforts.",
                "keywords": ["9/11", "Al-Qaeda", "Taliban", "prolonged occupation", "withdrawal 2021", "nation-building"]
            },
        ]
    )

    reg_coop = TopicContent(
        topic_id="c11_pol_024",
        title="Regional Cooperation",
        facts={
            "asean_full_form": "ASEAN stands for Association of Southeast Asian Nations.",
            "asean_founded": "ASEAN was founded on 8 August 1967 with the signing of the ASEAN Declaration (Bangkok Declaration).",
            "asean_members": "ASEAN has 10 member states: Indonesia, Malaysia, Philippines, Singapore, Thailand, Brunei, Vietnam, Laos, Myanmar, and Cambodia.",
            "eu_full_form": "EU stands for European Union.",
            "eu_founded": "The European Union was formally established by the Maastricht Treaty on 1 November 1993.",
            "saarc_full_form": "SAARC stands for South Asian Association for Regional Cooperation.",
            "saarc_founded": "SAARC was founded on 8 December 1985 in Dhaka, Bangladesh.",
            "saarc_members": "SAARC has 8 members: Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, Sri Lanka.",
            "brics_full_form": "BRICS stands for Brazil, Russia, India, China, South Africa.",
            "brics_founded": "BRICS was founded in 2006; the first summit was held in 2009.",
            "quad_full_form": "QUAD stands for Quadrilateral Security Dialogue.",
            "quad_members": "QUAD members are India, USA, Japan, and Australia.",
            "asean_principle": "ASEAN operates on the principle of non-interference in each other's internal affairs.",
            "eu_single_market": "The EU has a single market allowing free movement of goods, services, capital, and people.",
            "saarc_challenges": "SAARC faces challenges due to political tensions, especially between India and Pakistan.",
            "brics_aims": "BRICS aims to promote cooperation among major emerging economies and reform global governance institutions.",
        },
        mcq_pool=[
            {
                "question": "ASEAN was founded on:",
                "options": ["8 August 1967", "15 August 1947", "1 November 1993", "8 December 1985"],
                "answer": "8 August 1967",
                "explanation": "ASEAN was founded on 8 August 1967 with the signing of the Bangkok Declaration by five founding members."
            },
            {
                "question": "How many member states does ASEAN have?",
                "options": ["5", "7", "10", "15"],
                "answer": "10",
                "explanation": "ASEAN has 10 member states: Indonesia, Malaysia, Philippines, Singapore, Thailand, Brunei, Vietnam, Laos, Myanmar, and Cambodia."
            },
            {
                "question": "The European Union was formally established by the:",
                "options": ["Treaty of Versailles", "Maastricht Treaty", "Treaty of Rome", "Lisbon Treaty"],
                "answer": "Maastricht Treaty",
                "explanation": "The Maastricht Treaty, signed in 1992, formally established the European Union on 1 November 1993."
            },
            {
                "question": "SAARC was founded in which city?",
                "options": ["New Delhi", "Kathmandu", "Dhaka", "Colombo"],
                "answer": "Dhaka",
                "explanation": "SAARC was founded on 8 December 1985 in Dhaka, Bangladesh."
            },
            {
                "question": "Which country is NOT a member of SAARC?",
                "options": ["Bangladesh", "Nepal", "Myanmar", "Sri Lanka"],
                "answer": "Myanmar",
                "explanation": "Myanmar is not a SAARC member. SAARC's 8 members are Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan, and Sri Lanka."
            },
            {
                "question": "QUAD consists of:",
                "options": ["USA, UK, France, Germany", "India, USA, Japan, Australia", "Brazil, Russia, India, China", "France, Germany, Italy, Spain"],
                "answer": "India, USA, Japan, Australia",
                "explanation": "The Quadrilateral Security Dialogue (QUAD) includes India, USA, Japan, and Australia as its four member nations."
            },
            {
                "question": "BRICS was founded in:",
                "options": ["2001", "2006", "2010", "2015"],
                "answer": "2006",
                "explanation": "BRICS was founded in 2006, with the first summit held in 2009 in Yekaterinburg, Russia."
            },
            {
                "question": "The key principle of ASEAN cooperation is:",
                "options": ["Collective security", "Non-interference in internal affairs", "Common currency", "Federal governance"],
                "answer": "Non-interference in internal affairs",
                "explanation": "ASEAR operates on the principle of non-interference in each other's internal affairs, known as the 'ASEAN Way'."
            },
            {
                "question": "Which is a challenge faced by SAARC?",
                "options": ["Common currency", "Political tensions between India and Pakistan", "Too many members", "No common language"],
                "answer": "Political tensions between India and Pakistan",
                "explanation": "SAARC's effectiveness is severely hampered by political tensions, especially the long-standing rivalry between India and Pakistan."
            },
        ],
        short_answer_bank=[
            {
                "question": "What does ASEAN stand for and when was it founded?",
                "answer": "ASEAN stands for Association of Southeast Asian Nations. It was founded on 8 August 1967 with the signing of the Bangkok Declaration.",
                "keywords": ["Association of Southeast Asian Nations", "8 August 1967", "Bangkok Declaration"]
            },
            {
                "question": "List the members of the QUAD.",
                "answer": "The QUAD (Quadrilateral Security Dialogue) consists of four member nations: India, the United States of America, Japan, and Australia.",
                "keywords": ["India", "USA", "Japan", "Australia", "four members"]
            },
            {
                "question": "What is the main challenge facing SAARC?",
                "answer": "The main challenge facing SAARC is political tensions between member states, particularly the long-standing rivalry and disputes between India and Pakistan, which hinder cooperation and joint initiatives.",
                "keywords": ["political tensions", "India-Pakistan", "rivalry", "cooperation hindered"]
            },
            {
                "question": "What does BRICS stand for?",
                "answer": "BRICS stands for the grouping of five major emerging economies: Brazil, Russia, India, China, and South Africa.",
                "keywords": ["Brazil", "Russia", "India", "China", "South Africa", "emerging economies"]
            },
            {
                "question": "Name any five members of ASEAN.",
                "answer": "ASEAN has 10 members: Indonesia, Malaysia, Philippines, Singapore, Thailand, Brunei, Vietnam, Laos, Myanmar, and Cambodia. Any five of these are correct.",
                "keywords": ["Indonesia", "Malaysia", "Philippines", "Singapore", "Thailand"]
            },
        ],
        long_answer_bank=[
            {
                "question": "Examine the achievements and challenges of ASEAN as a regional organization.",
                "answer": "ASEAN, founded in 1967, has been one of the most successful regional organizations in the developing world. Its achievements include: (1) Maintaining peace and stability in Southeast Asia through the principle of non-interference; (2) Promoting economic cooperation and establishing ASEAN Free Trade Area (AFTA); (3) Acting as a unified voice in regional forums like ASEAN Regional Forum (ARF); (4) Playing a mediating role in regional disputes. However, challenges persist: (1) Economic disparity between developed (Singapore) and less developed (Laos, Cambodia) members; (2) Non-interference principle limits response to human rights violations (Myanmar crisis); (3) Territorial disputes in the South China Sea; (4) Difficulty in achieving consensus due to the requirement of unanimity.",
                "keywords": ["non-interference", "AFTA", "economic cooperation", "human rights", "South China Sea", "consensus"]
            },
            {
                "question": "Compare SAARC and the European Union as regional organizations.",
                "answer": "SAARC (founded 1985, 8 members) and the EU (established 1993, 27 members) differ significantly. The EU has achieved deep integration including a single market, common currency (Euro), and supranational governance, driven by historical reconciliation post-WWII. SAARC, by contrast, has remained largely at a declaratory level due to political tensions, especially between India and Pakistan. The EU's success stems from shared democratic values and economic interdependence, while SAARC struggles with bilateral disputes that prevent meaningful cooperation. The EU model of pooled sovereignty contrasts sharply with SAARC's strict adherence to national sovereignty.",
                "keywords": ["deep integration", "single market", "political tensions", "sovereignty", "Euro", "declaratory"]
            },
        ]
    )

    indo_pak = TopicContent(
        topic_id="c11_pol_025",
        title="India-Pakistan Relations",
        facts={
            "partition_1947": "The partition of British India in 1947 created two independent dominions: India and Pakistan, leading to one of the largest mass migrations in history.",
            "kashmir_dispute": "The Kashmir dispute began in 1947 when the Maharaja of Jammu and Kashmir signed the Instrument of Accession with India, leading to the first Indo-Pak war.",
            "first_war_1947": "The first Indo-Pak war (1947-48) resulted in the division of Kashmir along the Line of Control.",
            "second_war_1965": "The second Indo-Pak war in 1965 ended with the Tashkent Agreement mediated by the Soviet Union.",
            "third_war_1971": "The 1971 war led to the creation of Bangladesh (formerly East Pakistan) and the Shimla Agreement.",
            "simla_agreement": "The Shimla Agreement (1972) between Indira Gandhi and Zulfikar Ali Bhutto established the Line of Control as the de facto border in Kashmir.",
            "nuclear_tests_1998": "Both India and Pakistan conducted nuclear tests in May 1998, making both declared nuclear weapon states.",
            "kargil_war_1999": "The Kargil conflict in 1999 involved Pakistani troops infiltrating across the Line of Control in the Kargil district of Kashmir.",
            "mumbai_attacks_2008": "The 26/11 Mumbai attacks in 2008, carried out by Pakistan-based terrorists, severely strained bilateral relations.",
            "peace_process": "Several peace initiatives have been attempted including the Lahore Summit (1999) and Composite Dialogue, but progress has been inconsistent.",
        },
        mcq_pool=[
            {
                "question": "The Shimla Agreement between India and Pakistan was signed in:",
                "options": ["1965", "1971", "1972", "1975"],
                "answer": "1972",
                "explanation": "The Shimla Agreement was signed in July 1972 between Indian PM Indira Gandhi and Pakistani President Zulfikar Ali Bhutto."
            },
            {
                "question": "The Kashmir dispute dates back to:",
                "options": ["1947", "1950", "1962", "1971"],
                "answer": "1947",
                "explanation": "The Kashmir dispute began at the time of partition in 1947 when the Maharaja of Jammu and Kashmir signed the Instrument of Accession with India."
            },
            {
                "question": "Bangladesh was created after the Indo-Pak war of:",
                "options": ["1965", "1971", "1999", "2008"],
                "answer": "1971",
                "explanation": "The 1971 Indo-Pak war led to the creation of Bangladesh (formerly East Pakistan) with Indian support."
            },
            {
                "question": "When did India and Pakistan both become declared nuclear weapon states?",
                "options": ["1974", "1990", "1998", "2001"],
                "answer": "1998",
                "explanation": "Both India (May 11-13) and Pakistan (May 28-30) conducted nuclear tests in May 1998."
            },
            {
                "question": "The 26/11 Mumbai attacks occurred in:",
                "options": ["2001", "2005", "2008", "2011"],
                "answer": "2008",
                "explanation": "The 26/11 Mumbai terrorist attacks took place in November 2008, carried out by Lashkar-e-Taiba militants from Pakistan."
            },
        ],
        short_answer_bank=[
            {
                "question": "What was the Shimla Agreement (1972)?",
                "answer": "The Shimla Agreement was signed in July 1972 between Indian PM Indira Gandhi and Pakistani President Zulfikar Ali Bhutto. It established the Line of Control as the de facto border in Kashmir and committed both nations to resolve disputes through peaceful means and dialogue.",
                "keywords": ["1972", "Indira Gandhi", "Bhutto", "Line of Control", "peaceful means"]
            },
            {
                "question": "What led to the creation of Bangladesh in 1971?",
                "answer": "The Bangladesh Liberation War in 1971 was triggered by political and economic marginalization of East Pakistan by West Pakistan. A mass uprising in East Pakistan led to a refugee crisis into India, which then intervened militarily, leading to Pakistan's surrender and the birth of Bangladesh.",
                "keywords": ["East Pakistan", "marginalization", "refugee crisis", "Indian intervention", "surrender"]
            },
            {
                "question": "Why is the Kashmir dispute significant in Indo-Pak relations?",
                "answer": "Kashmir has been the central bone of contention between India and Pakistan since 1947. Both countries claim the entire region but control only parts of it. The dispute has led to three wars and continues to be a major barrier to normalization of relations.",
                "keywords": ["bone of contention", "1947", "three wars", "central issue"]
            },
        ],
        long_answer_bank=[
            {
                "question": "Trace the major milestones in India-Pakistan relations since 1947.",
                "answer": "India-Pakistan relations since 1947 have been marked by conflict and occasional attempts at peace. Key milestones include: (1) 1947-48: First war over Kashmir and the UN-mediated ceasefire; (2) 1965: Second war ending with Tashkent Agreement; (3) 1971: Third war leading to Bangladesh's creation and Shimla Agreement; (4) 1974: India's first nuclear test (Smiling Buddha); (5) 1998: Both countries test nuclear weapons; (6) 1999: Kargil conflict and Lahore Summit; (7) 2001-2008: Period of tensions including Parliament attack and 26/11 Mumbai attacks. Despite numerous rounds of dialogue and peace initiatives, the relationship remains hostage to cross-border terrorism and the Kashmir dispute.",
                "keywords": ["1947", "Kashmir", "1971", "Bangladesh", "nuclear 1998", "Kargil", "26/11"]
            },
        ]
    )

    indo_bang = TopicContent(
        topic_id="c11_pol_026",
        title="India-Bangladesh Relations",
        facts={
            "liberation_1971": "India played a crucial role in the liberation of Bangladesh from Pakistan in 1971, providing military and humanitarian support.",
            "friendship_treaty_1972": "India and Bangladesh signed the Treaty of Friendship, Cooperation and Peace in March 1972.",
            "land_border_agreement_2015": "The Land Boundary Agreement (LBA) was implemented in 2015, resolving the long-standing enclave issue between the two countries.",
            "enclaves": "Enclaves were small pieces of Indian territory inside Bangladesh and vice versa - over 100 such enclaves existed since partition.",
            "farakka_barrage": "The Farakka Barrage on the Ganges River has been a long-standing issue between India and Bangladesh regarding water sharing.",
            "ganges_water_treaty_1996": "The Ganges Water Treaty was signed in 1996 between India and Bangladesh for sharing of Ganges waters.",
            "teesta_water": "The Teesta River water sharing agreement has been a pending issue between the two countries.",
            "trade_relations": "Bangladesh is one of India's largest trading partners in South Asia, with growing bilateral trade.",
            "connectivity": "India has provided significant development assistance and connectivity support to Bangladesh including the Maitri Express train.",
            "rohingya_crisis": "The Rohingya refugee crisis has created tensions between India and Bangladesh, with over 700,000 Rohingya fleeing Myanmar to Bangladesh.",
        },
        mcq_pool=[
            {
                "question": "The Land Boundary Agreement between India and Bangladesh was implemented in:",
                "options": ["1972", "1996", "2015", "2020"],
                "answer": "2015",
                "explanation": "The Land Boundary Agreement (LBA) was finally implemented in 2015, resolving the decades-old enclave problem."
            },
            {
                "question": "India played a key role in the creation of Bangladesh in:",
                "options": ["1947", "1965", "1971", "1980"],
                "answer": "1971",
                "explanation": "India provided military and humanitarian support during Bangladesh's Liberation War in 1971."
            },
            {
                "question": "The Ganges Water Treaty between India and Bangladesh was signed in:",
                "options": ["1972", "1985", "1996", "2001"],
                "answer": "1996",
                "explanation": "The Ganges Water Treaty was signed in December 1996 during Prime Minister Deve Gowda's visit to Bangladesh."
            },
            {
                "question": "The Farakka Barrage dispute is related to:",
                "options": ["Border demarcation", "Water sharing of the Ganges River", "Trade tariffs", "Immigration"],
                "answer": "Water sharing of the Ganges River",
                "explanation": "The Farakka Barrage on the Ganges River has been a contentious water-sharing issue between India and Bangladesh."
            },
        ],
        short_answer_bank=[
            {
                "question": "What is the significance of the Land Boundary Agreement (2015) between India and Bangladesh?",
                "answer": "The LBA of 2015 resolved the long-standing enclave problem by exchanging over 100 enclaves and redrawing the border. It improved bilateral relations and reduced border tensions, benefiting thousands of residents who had lived in limbo for decades.",
                "keywords": ["enclaves", "border", "exchange", "2015", "bilateral relations"]
            },
            {
                "question": "How does the Farakka Barrage affect India-Bangladesh relations?",
                "answer": "The Farakka Barrage on the Ganges River affects Bangladesh's access to water, especially during the dry season. This has been a persistent source of tension requiring ongoing negotiation through treaties and joint committees.",
                "keywords": ["Ganges water", "dry season", "tension", "treaty", "negotiation"]
            },
        ],
        long_answer_bank=[
            {
                "question": "Analyze the major issues and cooperation areas in India-Bangladesh relations.",
                "answer": "India-Bangladesh relations have evolved significantly since 1971. Cooperation areas include: (1) India's role in Bangladesh's liberation in 1971; (2) Economic cooperation with Bangladesh being a major trade partner; (3) The 2015 Land Boundary Agreement resolving enclave issues; (4) Connectivity initiatives including the Maitri Express and coastal shipping. Challenges include: (1) Water sharing disputes (Farakka Barrage, Teesta River); (2) Illegal immigration and border security; (3) The Rohingya refugee crisis from Myanmar; (4) China's growing influence in Bangladesh. Despite challenges, the relationship has strengthened under the 'Neighbourhood First' policy with growing strategic and economic cooperation.",
                "keywords": ["liberation 1971", "LBA 2015", "water sharing", "Farakka", "Rohingya", "trade", "Neighbourhood First"]
            },
        ]
    )

    indo_china = TopicContent(
        topic_id="c11_pol_027",
        title="India-China Relations",
        facts={
            "panchsheel_1954": "The Panchsheel Agreement (1954) was signed between India and China based on five principles of peaceful coexistence.",
            "sino_indian_war_1962": "The Sino-Indian War of 1962 was a brief but significant conflict over the border dispute in Aksai Chin and NEFA (now Arunachal Pradesh).",
            "border_dispute": "The India-China border dispute involves two sectors: Aksai Chin (controlled by China, claimed by India) and Arunachal Pradesh (controlled by India, claimed by China).",
            "lac_full_form": "LAC stands for Line of Actual Control, the de facto border between India and China.",
            "galwan_valley_2020": "The Galwan Valley clash in June 2020 resulted in casualties on both sides and marked a significant deterioration in relations.",
            "doklam_2017": "The Doklam standoff in 2017 occurred at the tri-junction of India, China, and Bhutan, lasting 73 days.",
            "trade_deficit": "India has a massive trade deficit with China, importing far more than it exports.",
            "china_pakistan_axis": "China's close relationship with Pakistan, including the China-Pakistan Economic Corridor (CPEC), is a major concern for India.",
            "cpec": "CPEC (China-Pakistan Economic Corridor) passes through Pakistan-occupied Kashmir, which India opposes.",
            "border_agreements": "Several border agreements have been signed (1993, 1996, 2005, 2013) but the boundary question remains unresolved.",
        },
        mcq_pool=[
            {
                "question": "The Panchsheel Agreement between India and China was signed in:",
                "options": ["1947", "1954", "1962", "1971"],
                "answer": "1954",
                "explanation": "The Panchsheel Agreement, based on five principles of peaceful coexistence, was signed between India and China in 1954."
            },
            {
                "question": "The Sino-Indian War took place in:",
                "options": ["1954", "1962", "1971", "1998"],
                "answer": "1962",
                "explanation": "The Sino-Indian War occurred in 1962 over the disputed border in Aksai Chin and NEFA (Arunachal Pradesh)."
            },
            {
                "question": "The Line of Actual Control (LAC) separates:",
                "options": ["India and Pakistan", "India and China", "India and Nepal", "Pakistan and Afghanistan"],
                "answer": "India and China",
                "explanation": "The LAC is the de facto border between India and China, established after the 1962 war."
            },
            {
                "question": "The Galwan Valley clash between India and China occurred in:",
                "options": ["2017", "2019", "2020", "2021"],
                "answer": "2020",
                "explanation": "The Galwan Valley clash in June 2020 resulted in casualties and significantly deteriorated India-China relations."
            },
            {
                "question": "CPEC passes through which disputed territory?",
                "options": ["Aksai Chin", "Pakistan-occupied Kashmir", "Arunachal Pradesh", "Sikkim"],
                "answer": "Pakistan-occupied Kashmir",
                "explanation": "China-Pakistan Economic Corridor (CPEC) passes through Gilgit-Baltistan in Pakistan-occupied Kashmir, which India considers its own territory."
            },
        ],
        short_answer_bank=[
            {
                "question": "What is the Panchsheel Agreement?",
                "answer": "The Panchsheel Agreement (1954) was based on five principles of peaceful coexistence: mutual respect for sovereignty, non-aggression, non-interference, equality and mutual benefit, and peaceful coexistence. It was signed between India and China to govern their bilateral relations.",
                "keywords": ["five principles", "peaceful coexistence", "1954", "sovereignty", "non-aggression"]
            },
            {
                "question": "What are the two sectors of the India-China border dispute?",
                "answer": "The two sectors are: (1) Aksai Chin - controlled by China, claimed by India as part of Ladakh; (2) Arunachal Pradesh (formerly NEFA) - controlled by India, claimed by China as South Tibet.",
                "keywords": ["Aksai Chin", "Arunachal Pradesh", "NEFA", "South Tibet", "disputed sectors"]
            },
            {
                "question": "Why is CPEC a concern for India?",
                "answer": "CPEC (China-Pakistan Economic Corridor) passes through Pakistan-occupied Kashmir, which India considers its integral territory. India sees it as a violation of its sovereignty and part of China's 'String of Pearls' strategy to encircle India.",
                "keywords": ["Pakistan-occupied Kashmir", "sovereignty", "String of Pearls", "encircle"]
            },
        ],
        long_answer_bank=[
            {
                "question": "Examine the evolution of India-China relations from the Panchsheel Agreement to the Galwan Valley clash.",
                "answer": "India-China relations have gone through significant phases: (1) 1954-1962: 'Hindi-Chini Bhai Bhai' period with Panchsheel Agreement, ending in the 1962 war; (2) 1970s-1980s: Gradual normalization after the war; (3) 1988 onwards: Policy of 'peace and tranquillity' leading to various confidence-building measures; (4) 2000s: Economic engagement grows with China becoming India's largest trading partner; (5) 2017: Doklam standoff; (6) 2020: Galwan Valley clash marks a significant deterioration. Despite high-level summits (Wuhan, Chennai), the border dispute remains unresolved. China's close ties with Pakistan and infrastructure projects in PoK continue to be major irritants.",
                "keywords": ["Panchsheel", "1962 war", "normalization", "Doklam", "Galwan", "CPEC", "border dispute"]
            },
        ]
    )

    TOPIC_CONTENTS = {
        "c11_pol_023": us_uni,
        "c11_pol_024": reg_coop,
        "c11_pol_025": indo_pak,
        "c11_pol_026": indo_bang,
        "c11_pol_027": indo_china,
    }


_build_knowledge_base()


# ────────────────────────── Solver Classes ───────────────────────────

class BaseSolver:
    """Abstract base class for all solvers."""
    PROBLEM_TYPE: str = "base"

    def solve(self, **kwargs) -> Dict[str, Any]:
        result = self._solve(**kwargs)
        result["verification"] = self._verify(result)
        return result

    def _solve(self, **kwargs) -> Dict[str, Any]:
        raise NotImplementedError

    def _verify(self, result: Dict[str, Any]) -> str:
        return "verified"


class MCQSolver(BaseSolver):
    """Solver for multiple-choice questions."""
    PROBLEM_TYPE = "mcq"

    def __init__(self, topic_id: str):
        self.topic_id = topic_id
        if topic_id not in TOPIC_CONTENTS:
            raise ValueError(f"Unknown topic: {topic_id}")

    def _solve(self, seed: Optional[int] = None, **kwargs) -> Dict[str, Any]:
        topic = TOPIC_CONTENTS[self.topic_id]
        if seed is not None:
            rng = random.Random(seed)
        else:
            rng = random.Random()

        pool = topic.mcq_pool[:]
        rng.shuffle(pool)
        q_data = pool[0]

        options = q_data["options"][:]
        rng.shuffle(options)

        correct_text = q_data["answer"]
        correct_idx = options.index(correct_text)

        steps = [
            f"Loaded topic: {topic.title} ({self.topic_id})",
            f"Selected MCQ from pool (total: {len(pool)} questions available)",
            f"Question: {q_data['question']}",
            f"Shuffled {len(options)} options",
            f"Correct answer is option {correct_idx + 1}: '{correct_text}'",
        ]

        return {
            "answer": correct_idx,
            "answer_text": correct_text,
            "options": options,
            "question_text": q_data["question"],
            "explanation": q_data["explanation"],
            "steps": steps,
        }

    def _verify(self, result: Dict[str, Any]) -> str:
        if "answer" not in result or "options" not in result:
            return "FAIL: missing fields"
        if not isinstance(result["answer"], int):
            return "FAIL: answer must be integer index"
        if not (0 <= result["answer"] < len(result["options"])):
            return "FAIL: answer index out of range"
        return "PASS: MCQ answer verified"


class ShortAnswerSolver(BaseSolver):
    """Solver for short answer questions."""
    PROBLEM_TYPE = "short_answer"

    def __init__(self, topic_id: str):
        self.topic_id = topic_id

    def _solve(self, seed: Optional[int] = None, **kwargs) -> Dict[str, Any]:
        topic = TOPIC_CONTENTS[self.topic_id]
        if seed is not None:
            rng = random.Random(seed)
        else:
            rng = random.Random()

        pool = topic.short_answer_bank[:]
        rng.shuffle(pool)
        q_data = pool[0]

        steps = [
            f"Loaded topic: {topic.title} ({self.topic_id})",
            f"Selected short-answer question from pool ({len(pool)} available)",
            f"Question: {q_data['question']}",
            f"Generated model answer with {len(q_data['keywords'])} key concepts",
        ]

        return {
            "answer": q_data["answer"],
            "question_text": q_data["question"],
            "keywords": q_data["keywords"],
            "steps": steps,
        }

    def _verify(self, result: Dict[str, Any]) -> str:
        if not result.get("answer"):
            return "FAIL: missing answer"
        if not result.get("question_text"):
            return "FAIL: missing question"
        if len(result["answer"].split()) < 10:
            return "WARN: answer seems too short"
        return "PASS: short answer verified"


class LongAnswerSolver(BaseSolver):
    """Solver for long answer/essay questions."""
    PROBLEM_TYPE = "long_answer"

    def __init__(self, topic_id: str):
        self.topic_id = topic_id

    def _solve(self, seed: Optional[int] = None, **kwargs) -> Dict[str, Any]:
        topic = TOPIC_CONTENTS[self.topic_id]
        if seed is not None:
            rng = random.Random(seed)
        else:
            rng = random.Random()

        pool = topic.long_answer_bank[:]
        rng.shuffle(pool)
        q_data = pool[0]

        word_count = len(q_data["answer"].split())

        steps = [
            f"Loaded topic: {topic.title} ({self.topic_id})",
            f"Selected long-answer question from pool ({len(pool)} available)",
            f"Question: {q_data['question']}",
            f"Generated comprehensive answer (~{word_count} words)",
            f"Answer covers {len(q_data['keywords'])} key concepts",
        ]

        return {
            "answer": q_data["answer"],
            "question_text": q_data["question"],
            "keywords": q_data["keywords"],
            "word_count": word_count,
            "steps": steps,
        }

    def _verify(self, result: Dict[str, Any]) -> str:
        if not result.get("answer"):
            return "FAIL: missing answer"
        wc = result.get("word_count", 0)
        if wc < 50:
            return "WARN: long answer seems too short"
        if not result.get("keywords"):
            return "WARN: no keywords identified"
        return "PASS: long answer verified"


class FactSolver(BaseSolver):
    """Solver for factual/definitional queries."""
    PROBLEM_TYPE = "fact"

    def __init__(self, topic_id: str):
        self.topic_id = topic_id

    def _solve(self, query: str = "", seed: Optional[int] = None, **kwargs) -> Dict[str, Any]:
        topic = TOPIC_CONTENTS[self.topic_id]

        if seed is not None:
            rng = random.Random(seed)
        else:
            rng = random.Random()

        # Try to match query to facts
        query_lower = query.lower().strip()
        matched_fact = None
        matched_key = None

        for key, value in topic.facts.items():
            key_words = key.replace("_", " ").split()
            if any(word in query_lower for word in key_words if len(word) > 3):
                matched_fact = value
                matched_key = key
                break

        if matched_fact is None:
            all_facts = list(topic.facts.items())
            chosen_key, chosen_value = rng.choice(all_facts)
            matched_fact = chosen_value
            matched_key = chosen_key

        steps = [
            f"Loaded topic: {topic.title} ({self.topic_id})",
            f"Processed query: '{query}'" if query else "No specific query provided",
            f"Matched fact key: '{matched_key}'",
            f"Retrieved factual answer from knowledge base",
        ]

        return {
            "answer": matched_fact,
            "query": query,
            "matched_key": matched_key,
            "topic": topic.title,
            "steps": steps,
        }

    def _verify(self, result: Dict[str, Any]) -> str:
        if not result.get("answer"):
            return "FAIL: no answer found"
        return "PASS: fact verified against knowledge base"


# ──────────────────────────── Registries ─────────────────────────────

SOLVER_REGISTRY: Dict[str, type] = {
    "mcq": MCQSolver,
    "short_answer": ShortAnswerSolver,
    "long_answer": LongAnswerSolver,
    "fact": FactSolver,
}

QUESTION_REGISTRY: Dict[str, Any] = {}

_topic_question_counter = {tid: 0 for tid in TOPIC_CONTENTS}


# ─────────────────────── Solver Factory Functions ────────────────────

def solve_mcq(topic_id: str, seed: Optional[int] = None) -> Dict[str, Any]:
    """Solve an MCQ for the given topic."""
    solver = MCQSolver(topic_id)
    return solver.solve(seed=seed)


def solve_short_answer(topic_id: str, seed: Optional[int] = None) -> Dict[str, Any]:
    """Solve a short answer question for the given topic."""
    solver = ShortAnswerSolver(topic_id)
    return solver.solve(seed=seed)


def solve_long_answer(topic_id: str, seed: Optional[int] = None) -> Dict[str, Any]:
    """Solve a long answer question for the given topic."""
    solver = LongAnswerSolver(topic_id)
    return solver.solve(seed=seed)


def solve_fact(topic_id: str, query: str = "", seed: Optional[int] = None) -> Dict[str, Any]:
    """Solve a factual query for the given topic."""
    solver = FactSolver(topic_id)
    return solver.solve(query=query, seed=seed)


def get_solver(problem_type: str, topic_id: str) -> BaseSolver:
    """Get a solver instance for the given problem type and topic."""
    if problem_type not in SOLVER_REGISTRY:
        raise ValueError(f"Unknown problem type: {problem_type}")
    if topic_id not in TOPIC_CONTENTS:
        raise ValueError(f"Unknown topic: {topic_id}")
    return SOLVER_REGISTRY[problem_type](topic_id)


# ──────────────────────── Question Generator ─────────────────────────

DIFFICULTY_MAP = {
    "mcq": "easy",
    "short_answer": "medium",
    "long_answer": "hard",
    "fact": "easy",
}

TOPIC_LIST = list(TOPIC_CONTENTS.keys())


def _generate_question_id() -> str:
    global _topic_question_counter
    all_counts = sum(_topic_question_counter.values())
    return f"CISCE_C11_POL_Q{all_counts + 1:04d}"


def generate_question(seed: int, topic_id: Optional[str] = None,
                      question_type: Optional[str] = None) -> Dict[str, Any]:
    """Generate a single question with full solution."""
    rng = random.Random(seed)

    if topic_id is None:
        topic_id = rng.choice(TOPIC_LIST)

    if topic_id not in TOPIC_CONTENTS:
        raise ValueError(f"Unknown topic: {topic_id}")

    if question_type is None:
        qtypes = ["mcq", "short_answer", "long_answer"]
        weights = [0.5, 0.3, 0.2]
        question_type = rng.choices(qtypes, weights=weights, k=1)[0]

    topic = TOPIC_CONTENTS[topic_id]
    qid = _generate_question_id()
    _topic_question_counter[topic_id] += 1

    solver = get_solver(question_type, topic_id)
    result = solver.solve(seed=seed)

    difficulty = DIFFICULTY_MAP.get(question_type, "medium")

    question_record: Dict[str, Any] = {
        "id": qid,
        "topic_id": topic_id,
        "topic_title": topic.title,
        "question_type": question_type,
        "difficulty": difficulty,
        "seed": seed,
        "verification": result.get("verification", "unknown"),
    }

    if question_type == "mcq":
        question_record["question_text"] = result["question_text"]
        question_record["options"] = result["options"]
        question_record["answer"] = result["answer_text"]
        question_record["answer_index"] = result["answer"]
        question_record["solution"] = {
            "explanation": result["explanation"],
            "steps": result["steps"],
        }
    elif question_type == "short_answer":
        question_record["question_text"] = result["question_text"]
        question_record["answer"] = result["answer"]
        question_record["keywords"] = result["keywords"]
        question_record["solution"] = {
            "steps": result["steps"],
        }
    elif question_type == "long_answer":
        question_record["question_text"] = result["question_text"]
        question_record["answer"] = result["answer"]
        question_record["keywords"] = result["keywords"]
        question_record["word_count"] = result.get("word_count", 0)
        question_record["solution"] = {
            "steps": result["steps"],
        }

    return question_record


def generate_questions(seed: int, count: int = 5) -> List[Dict[str, Any]]:
    """Generate a list of questions with deterministic randomness."""
    rng = random.Random(seed)
    questions: List[Dict[str, Any]] = []

    for i in range(count):
        q_seed = rng.randint(0, 2**31 - 1)
        topic = rng.choice(TOPIC_LIST)
        qtypes = ["mcq", "short_answer", "long_answer"]
        weights = [0.5, 0.3, 0.2]
        qtype = rng.choices(qtypes, weights=weights, k=1)[0]

        q = generate_question(seed=q_seed, topic_id=topic, question_type=qtype)
        q["id"] = f"CISCE_C11_POL_Q{i + 1:04d}"
        questions.append(q)

    return questions


def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Verify a list of questions and return a summary report."""
    total = len(questions)
    passed = 0
    failed = 0
    warnings = 0
    results: List[Dict[str, Any]] = []

    for q in questions:
        status = q.get("verification", "unknown")
        entry = {
            "id": q["id"],
            "topic_id": q.get("topic_id", "unknown"),
            "question_type": q.get("question_type", "unknown"),
            "status": status,
        }

        if "PASS" in status:
            passed += 1
        elif "FAIL" in status:
            failed += 1
        elif "WARN" in status:
            warnings += 1
        else:
            warnings += 1

        results.append(entry)

    summary = {
        "total_questions": total,
        "passed": passed,
        "failed": failed,
        "warnings": warnings,
        "pass_rate": round(passed / total * 100, 1) if total > 0 else 0.0,
        "details": results,
    }

    return summary


# ──────────────────────── Utility Functions ──────────────────────────

def list_topics() -> List[Dict[str, str]]:
    """Return all available topics with metadata."""
    return [
        {
            "topic_id": tid,
            "title": t.title,
            "mcq_count": len(t.mcq_pool),
            "short_answer_count": len(t.short_answer_bank),
            "long_answer_count": len(t.long_answer_bank),
            "facts_count": len(t.facts),
        }
        for tid, t in TOPIC_CONTENTS.items()
    ]


def get_topic_summary(topic_id: str) -> Dict[str, Any]:
    """Get detailed summary of a topic."""
    if topic_id not in TOPIC_CONTENTS:
        raise ValueError(f"Unknown topic: {topic_id}")
    topic = TOPIC_CONTENTS[topic_id]
    return {
        "topic_id": topic.topic_id,
        "title": topic.title,
        "total_facts": len(topic.facts),
        "total_mcqs": len(topic.mcq_pool),
        "total_short_answers": len(topic.short_answer_bank),
        "total_long_answers": len(topic.long_answer_bank),
        "available_solvers": [pt for pt in SOLVER_REGISTRY],
    }


def list_solvers() -> List[str]:
    """Return list of available solver types."""
    return list(SOLVER_REGISTRY.keys())


# ──────────────────────────── Self-Test ──────────────────────────────

def _run_self_tests():
    """Comprehensive self-test suite."""
    print("=" * 60)
    print("CISCE Class 11 Political Science - Self Test Suite")
    print("=" * 60)

    all_passed = True
    test_count = 0
    pass_count = 0

    # Test 1: Topic listing
    print("\n[TEST 1] Listing all available topics...")
    test_count += 1
    try:
        topics = list_topics()
        assert len(topics) == 5, f"Expected 5 topics, got {len(topics)}"
        print(f"  PASS: Found {len(topics)} topics")
        for t in topics:
            print(f"    - {t['topic_id']}: {t['title']} ({t['mcq_count']} MCQs, {t['short_answer_count']} SA, {t['long_answer_count']} LA)")
        pass_count += 1
    except Exception as e:
        print(f"  FAIL: {e}")
        all_passed = False

    # Test 2: Solver registry
    print("\n[TEST 2] Checking solver registry...")
    test_count += 1
    try:
        solvers = list_solvers()
        assert "mcq" in solvers, "mcq solver missing"
        assert "short_answer" in solvers, "short_answer solver missing"
        assert "long_answer" in solvers, "long_answer solver missing"
        assert "fact" in solvers, "fact solver missing"
        print(f"  PASS: {len(solvers)} solvers available: {solvers}")
        pass_count += 1
    except Exception as e:
        print(f"  FAIL: {e}")
        all_passed = False

    # Test 3: MCQ Solver
    print("\n[TEST 3] Testing MCQ Solver (US Unilateralism)...")
    test_count += 1
    try:
        result = solve_mcq("c11_pol_023", seed=42)
        assert "answer" in result, "Missing 'answer' field"
        assert "options" in result, "Missing 'options' field"
        assert "question_text" in result, "Missing 'question_text' field"
        assert isinstance(result["answer"], int), "Answer should be integer index"
        assert 0 <= result["answer"] < len(result["options"]), "Answer index out of range"
        assert result["verification"] == "PASS: MCQ answer verified"
        print(f"  Question: {result['question_text'][:80]}...")
        print(f"  Answer (idx={result['answer']}): {result['answer_text']}")
        print(f"  Verification: {result['verification']}")
        print(f"  PASS")
        pass_count += 1
    except Exception as e:
        print(f"  FAIL: {e}")
        all_passed = False

    # Test 4: Short Answer Solver
    print("\n[TEST 4] Testing Short Answer Solver (Regional Cooperation)...")
    test_count += 1
    try:
        result = solve_short_answer("c11_pol_024", seed=42)
        assert "answer" in result
        assert len(result["answer"].split()) >= 10, "Answer too short"
        assert result["verification"] in ("PASS: short answer verified", "WARN: answer seems too short")
        print(f"  Question: {result['question_text'][:80]}...")
        print(f"  Answer length: {len(result['answer'].split())} words")
        print(f"  Verification: {result['verification']}")
        print(f"  PASS")
        pass_count += 1
    except Exception as e:
        print(f"  FAIL: {e}")
        all_passed = False

    # Test 5: Long Answer Solver
    print("\n[TEST 5] Testing Long Answer Solver (India-China Relations)...")
    test_count += 1
    try:
        result = solve_long_answer("c11_pol_027", seed=42)
        assert "answer" in result
        wc = result.get("word_count", 0)
        assert wc >= 50, f"Long answer too short ({wc} words)"
        assert "keywords" in result
        print(f"  Question: {result['question_text'][:80]}...")
        print(f"  Word count: {wc}")
        print(f"  Keywords: {result['keywords'][:4]}")
        print(f"  Verification: {result['verification']}")
        print(f"  PASS")
        pass_count += 1
    except Exception as e:
        print(f"  FAIL: {e}")
        all_passed = False

    # Test 6: Fact Solver
    print("\n[TEST 6] Testing Fact Solver (India-Pakistan Relations)...")
    test_count += 1
    try:
        result = solve_fact("c11_pol_025", query="Shimla Agreement", seed=42)
        assert "answer" in result
        assert "Shimla" in result["answer"] or "1972" in result["answer"]
        print(f"  Query: Shimla Agreement")
        print(f"  Answer: {result['answer'][:100]}...")
        print(f"  Verification: {result['verification']}")
        print(f"  PASS")
        pass_count += 1
    except Exception as e:
        print(f"  FAIL: {e}")
        all_passed = False

    # Test 7: Question Generation
    print("\n[TEST 7] Testing question generation (10 questions)...")
    test_count += 1
    try:
        questions = generate_questions(seed=100, count=10)
        assert len(questions) == 10, f"Expected 10 questions, got {len(questions)}"
        type_counts: Dict[str, int] = {}
        for q in questions:
            qt = q["question_type"]
            type_counts[qt] = type_counts.get(qt, 0) + 1
            assert "id" in q, "Missing question ID"
            assert "question_text" in q, "Missing question text"
            assert "answer" in q, "Missing answer"
            assert "topic_id" in q
            assert "verification" in q
            if qt == "mcq":
                assert "options" in q, "MCQ should have options"
        print(f"  Generated {len(questions)} questions:")
        for qt, cnt in sorted(type_counts.items()):
            print(f"    {qt}: {cnt}")
        topics_seen = set(q["topic_id"] for q in questions)
        print(f"  Topics covered: {topics_seen}")
        print(f"  PASS")
        pass_count += 1
    except Exception as e:
        print(f"  FAIL: {e}")
        all_passed = False

    # Test 8: Verify All Questions
    print("\n[TEST 8] Testing verify_all_questions...")
    test_count += 1
    try:
        questions = generate_questions(seed=200, count=8)
        report = verify_all_questions(questions)
        assert report["total_questions"] == 8
        assert report["passed"] + report["failed"] + report["warnings"] == 8
        print(f"  Total: {report['total_questions']}, Passed: {report['passed']}, "
              f"Failed: {report['failed']}, Warnings: {report['warnings']}")
        print(f"  Pass rate: {report['pass_rate']}%")
        print(f"  PASS")
        pass_count += 1
    except Exception as e:
        print(f"  FAIL: {e}")
        all_passed = False

    # Test 9: Deterministic seeding
    print("\n[TEST 9] Testing deterministic seeding...")
    test_count += 1
    try:
        q1 = solve_mcq("c11_pol_024", seed=12345)
        q2 = solve_mcq("c11_pol_024", seed=12345)
        assert q1["answer"] == q2["answer"], "Same seed should produce same answer"
        assert q1["question_text"] == q2["question_text"], "Same seed should produce same question"
        print(f"  Same seed (12345) produces identical results: True")
        q3 = solve_mcq("c11_pol_024", seed=54321)
        assert q3["answer"] != q1["answer"] or q3["question_text"] != q1["question_text"], \
            "Different seeds should potentially differ"
        print(f"  Different seed produces different result: True")
        print(f"  PASS")
        pass_count += 1
    except Exception as e:
        print(f"  FAIL: {e}")
        all_passed = False

    # Test 10: Topic Summary
    print("\n[TEST 10] Testing topic summary...")
    test_count += 1
    try:
        for tid in TOPIC_LIST:
            summary = get_topic_summary(tid)
            assert "title" in summary
            assert "total_mcqs" in summary
            assert summary["total_mcqs"] > 0
        summary = get_topic_summary("c11_pol_023")
        print(f"  Topic: {summary['title']}")
        print(f"  Facts: {summary['total_facts']}, MCQs: {summary['total_mcqs']}")
        print(f"  Available solvers: {summary['available_solvers']}")
        print(f"  PASS")
        pass_count += 1
    except Exception as e:
        print(f"  FAIL: {e}")
        all_passed = False

    # Final Results
    print("\n" + "=" * 60)
    print(f"RESULTS: {pass_count}/{test_count} tests passed")
    if all_passed:
        print("ALL TESTS PASSED!")
    else:
        print("SOME TESTS FAILED!")
    print("=" * 60)

    return all_passed


if __name__ == "__main__":
    random.seed(42)
    _run_self_tests()