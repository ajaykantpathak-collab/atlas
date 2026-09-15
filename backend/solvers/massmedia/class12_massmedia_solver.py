"""
CISCE Class 12 Mass Media Solver and Question Generator
Covers all syllabus nodes: Communication, Journalism, Television, Advertising
Self-contained, seeded deterministic, step-by-step explanations
"""

import random
import math
import hashlib
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
from fractions import Fraction
import string

# ============================================================
# SECTION 1: SYLLABUS KNOWLEDGE BASE
# ============================================================

SYLLABUS_TOPICS = {
    "culture_communication": {
        "title": "Culture and Communication",
        "nodes": ["c12_massmedia_001"],
        "weightage": 0.15
    },
    "cultural_transmission": {
        "title": "Media as Cultural Vehicle",
        "nodes": ["c12_massmedia_002"],
        "weightage": 0.10
    },
    "communication_social_change": {
        "title": "Communication and Social Change",
        "nodes": ["c12_massmedia_003"],
        "weightage": 0.10
    },
    "journalist_qualities": {
        "title": "Qualities of a Good Journalist",
        "nodes": ["c12_massmedia_004"],
        "weightage": 0.12
    },
    "ethical_journalism": {
        "title": "Ethical Issues in Journalism",
        "nodes": ["c12_massmedia_005"],
        "weightage": 0.13
    },
    "television_intro": {
        "title": "Introduction to Television",
        "nodes": ["c12_massmedia_006"],
        "weightage": 0.08
    },
    "tv_advertising_process": {
        "title": "TV Advertising - Process",
        "nodes": ["c12_massmedia_007"],
        "weightage": 0.12
    },
    "tv_advertising_types": {
        "title": "TV Advertising - Functions and Types",
        "nodes": ["c12_massmedia_008"],
        "weightage": 0.10
    },
    "tv_fiction": {
        "title": "Television Programmes - Fiction",
        "nodes": ["c12_massmedia_009"],
        "weightage": 0.05
    },
    "tv_nonfiction": {
        "title": "Television Programmes - Non-Fiction",
        "nodes": ["c12_massmedia_010"],
        "weightage": 0.05
    }
}

# Knowledge bank for question generation
KNOWLEDGE_BANK = {
    "culture": {
        "definitions": [
            "Culture refers to the shared values, beliefs, traditions, customs, arts, and way of life of a particular group or society.",
            "Culture encompasses the learned behaviour, norms, and symbolic systems that are transmitted across generations within a community.",
            "Edward B. Tylor defined culture as 'that complex whole which includes knowledge, belief, art, morals, law, custom, and any other capabilities and habits acquired by man as a member of society.'"
        ],
        "characteristics": [
            "Culture is learned, not inherited biologically.",
            "Culture is shared among members of a group.",
            "Culture is dynamic and changes over time.",
            "Culture is transmitted through communication.",
            "Culture is adaptive to environmental changes."
        ],
        "elements": [
            "Language", "Religion", "Food habits", "Clothing", "Festivals",
            "Art and music", "Social norms", "Values and beliefs", "Architecture", "Literature"
        ]
    },
    "media_culture_relationship": {
        "points": [
            "Media reflects and shapes cultural values simultaneously.",
            "Mass media acts as a mirror of society, depicting cultural practices and norms.",
            "Media can influence cultural change by introducing new ideas and perspectives.",
            "Cultural context determines how media messages are interpreted by audiences.",
            "The bidirectional relationship means media both influences culture and is influenced by it."
        ]
    },
    "representation": {
        "definition": "Representation refers to the way media portrays people, groups, places, and events, constructing a version of reality for audiences.",
        "examples_indian": [
            "Regional cinema portraying specific cultural stereotypes of North-East India.",
            "News media representation of rural vs urban India.",
            "Depiction of women in Indian television soap operas.",
            "Representation of caste groups in mainstream Hindi cinema."
        ],
        "stereotypes": [
            "Gender stereotypes: Women as caregivers, men as breadwinners.",
            "Racial stereotypes: Fair skin associated with beauty in Indian advertisements.",
            "Regional stereotypes: South Indians portrayed as 'techies', Biharis as 'uneducated'.",
            "Religious stereotypes: Certain communities typecast in specific roles in films."
        ]
    },
    "journalist_qualities": {
        "nose_for_news": "The ability to identify newsworthy stories, sense what the public needs to know, and recognize the significance of events before others do.",
        "inquisitiveness": "The desire to ask questions, dig deeper, investigate facts, and seek truth beyond surface-level information.",
        "language_skills": "Proficiency in written and spoken language, clarity of expression, vocabulary, and the ability to communicate effectively with diverse audiences.",
        "trustworthiness": "Upholding honesty and integrity, maintaining confidentiality of sources, verifying facts, and being accountable for published content.",
        "empathy": "Understanding and sharing the feelings of people being reported on, particularly in sensitive situations like disasters or human rights issues."
    },
    "ethical_issues": {
        "sensationalism": {
            "definition": "The use of shocking, exaggerated, or provocative content to attract viewership, often at the expense of accuracy and dignity.",
            "examples": [
                "Crime reporting with graphic details to increase TRPs.",
                "Exaggerated headlines about celebrity controversies.",
                "Sensational coverage of communal incidents by certain news channels."
            ]
        },
        "fake_news": {
            "definition": "Deliberately fabricated or misleading information presented as legitimate news, often spread through social media.",
            "examples": [
                "False rumors about political leaders on WhatsApp during elections.",
                "Fabricated stories about communal violence shared on social media.",
                "Misleading health advice presented as medical news during COVID-19."
            ]
        },
        "paid_news": {
            "definition": "News content published in exchange for financial or other benefits, compromising journalistic independence.",
            "examples": [
                "Election coverage favouring certain candidates in exchange for advertising revenue.",
                "Corporate-funded 'news' segments that are actually advertisements.",
                "Positive product reviews given in return for monetary compensation."
            ]
        },
        "plagiarism": {
            "definition": "Using someone else's work, ideas, or expressions without proper attribution and presenting them as one's own.",
            "examples": [
                "Copy-pasting articles from other publications without credit.",
                "Using another journalist's photographs without permission.",
                "Reproducing social media content as original reporting."
            ]
        }
    },
    "tv_advertising_process": {
        "stages": [
            {
                "stage": 1,
                "name": "Planning Phase",
                "description": "Market research, target audience identification, budget allocation, and creative brief development."
            },
            {
                "stage": 2,
                "name": "Scripting",
                "description": "Writing the script including dialogue, action description, and visual/audio cues."
            },
            {
                "stage": 3,
                "name": "Casting",
                "description": "Selecting actors/models who best represent the brand and resonate with the target audience."
            },
            {
                "stage": 4,
                "name": "Pre-Production",
                "description": "Location scouting, set design, costume planning, equipment arrangement, and scheduling."
            },
            {
                "stage": 5,
                "name": "Shooting",
                "description": "Actual filming of the advertisement with director, camera crew, and lighting team."
            },
            {
                "stage": 6,
                "name": "Post-Production",
                "description": "Editing footage, adding music, sound effects, voice-overs, graphics, and special effects."
            },
            {
                "stage": 7,
                "name": "Approval",
                "description": "Review by the client/advertiser and regulatory bodies (like ASCI in India) for compliance."
            },
            {
                "stage": 8,
                "name": "Delivery",
                "description": "Final delivery of the advertisement in required formats to TV channels for broadcast."
            }
        ]
    },
    "tv_advertising_functions": [
        "Reach large audiences across diverse demographics simultaneously.",
        "Inform and educate consumers about new products, services, and features.",
        "Entertain and retain viewer attention through creative storytelling.",
        "Create loyal following for a product through consistent brand messaging.",
        "Provide affordable information distribution compared to other media."
    ],
    "tv_advertising_types": {
        "cross_promotion": "Advertising that promotes two or more related products or services together, e.g., movie promos on TV channels owned by the same network.",
        "merchandise": "Advertising that directly sells physical products associated with a TV show, film, or character.",
        "covert_advertising": "Embedding product promotion within editorial content without explicit disclosure, e.g., product placement in serials.",
        "infomercials": "Extended-length commercials (usually 30 minutes) that combine information and entertainment to sell products directly.",
        "bumper_ads": "Short 5-10 second advertisements that appear between programme segments or before/after commercial breaks.",
        "sponsorship": "A brand or company funding a programme or segment in exchange for on-air acknowledgment.",
        "call_to_action": "Advertisements that explicitly urge viewers to take immediate action such as calling a number, visiting a website, or downloading an app."
    },
    "tv_programmes_fiction": {
        "types": [
            "Serials/Soap Operas: Ongoing dramatic series with continuing storylines (e.g., Kyunki Saas Bhi Kabhi Bahu Thi).",
            "Sitcoms: Situation comedies with humorous storylines and recurring characters (e.g., Sarabhai vs Sarabhai).",
            "Dramas: Serious narrative programmes exploring social issues and human relationships (e.g., Buniyaad).",
            "Mythological Serials: Based on Indian mythology and religious texts (e.g., Ramayan, Mahabharat).",
            "Crime/Thriller: Detective and suspense-based fictional series."
        ],
        "characteristics": [
            "Scripted dialogue and action",
            "Written storylines and plots",
            "Use of professional actors",
            "Designed for entertainment",
            "Often reflects cultural values"
        ]
    },
    "tv_programmes_nonfiction": {
        "types": [
            "News bulletins and current affairs programmes",
            "Documentaries on social issues, history, nature",
            "Talk shows and panel discussions",
            "Reality shows and game shows",
            "Educational programmes",
            "Interviews and profiles",
            "Sports coverage",
            "Infotainment programmes"
        ],
        "characteristics": [
            "Based on real events and facts",
            "Often unscripted or minimally scripted",
            "Informative and educational purpose",
            "Uses real people or experts",
            "Addresses current issues and topics"
        ]
    },
    "social_change_communication": {
        "models": [
            "Diffusion of Innovations: How new ideas and technologies spread through society via communication channels.",
            "Magic Bullet/Hypodermic: Direct effect of media on audiences (largely discredited).",
            "Two-Step Flow: Media influences opinion leaders who then influence others.",
            "Multi-Step Flow: Complex networks of influence among media, opinion leaders, and audiences."
        ],
        "indian_examples": [
            "Community radio empowering rural communities in Rajasthan and Jharkhand.",
            "Doordarshan's 'Hum Log' serial promoting family planning in the 1980s.",
            "Satellite television bringing new farming techniques to Indian villages.",
            "Social media campaigns driving awareness during the Nirbhaya case."
        ]
    }
}

# ============================================================
# SECTION 2: QUESTION GENERATOR
# ============================================================

@dataclass
class Question:
    id: str
    type: str  # mcq, fill_blank, short_answer, long_answer, numerical
    topic: str
    difficulty: str  # Easy, Medium, Hard
    question: str
    options: Optional[List[str]] = None
    answer: Any = None
    explanation: str = ""
    competency_type: str = "standard"  # standard or indian_context

class MassMediaQuestionGenerator:
    def __init__(self, seed: int):
        self.seed = seed
        self.rng = random.Random(seed)
        self.used_questions = set()

    def _hash_question(self, q_text: str) -> str:
        return hashlib.md5(q_text.encode()).hexdigest()[:8]

    def _get_topic_weights(self) -> Dict[str, float]:
        weights = {}
        for topic, data in SYLLABUS_TOPICS.items():
            weights[topic] = data["weightage"]
        return weights

    def _select_topics(self, count: int) -> List[str]:
        weights = self._get_topic_weights()
        topics = []
        total_weight = sum(weights.values())
        for _ in range(count):
            r = self.rng.uniform(0, total_weight)
            cumulative = 0
            for topic, weight in weights.items():
                cumulative += weight
                if r <= cumulative:
                    topics.append(topic)
                    break
        return topics

    def generate_mcq(self, topic: str, difficulty: str, competency: str) -> Question:
        q_bank = self._get_mcq_bank(topic, difficulty, competency)
        if not q_bank:
            return self._fallback_mcq(topic, difficulty, competency)
        idx = self.rng.randint(0, len(q_bank) - 1)
        return q_bank[idx]

    def generate_fill_blank(self, topic: str, difficulty: str, competency: str) -> Question:
        q_bank = self._get_fill_blank_bank(topic, difficulty, competency)
        if not q_bank:
            return self._fallback_fill_blank(topic, difficulty, competency)
        idx = self.rng.randint(0, len(q_bank) - 1)
        return q_bank[idx]

    def generate_short_answer(self, topic: str, difficulty: str, competency: str) -> Question:
        q_bank = self._get_short_answer_bank(topic, difficulty, competency)
        if not q_bank:
            return self._fallback_short_answer(topic, difficulty, competency)
        idx = self.rng.randint(0, len(q_bank) - 1)
        return q_bank[idx]

    def generate_long_answer(self, topic: str, difficulty: str, competency: str) -> Question:
        q_bank = self._get_long_answer_bank(topic, difficulty, competency)
        if not q_bank:
            return self._fallback_long_answer(topic, difficulty, competency)
        idx = self.rng.randint(0, len(q_bank) - 1)
        return q_bank[idx]

    def generate_numerical(self, topic: str, difficulty: str, competency: str) -> Question:
        q_bank = self._get_numerical_bank(topic, difficulty, competency)
        if not q_bank:
            return self._fallback_numerical(topic, difficulty, competency)
        idx = self.rng.randint(0, len(q_bank) - 1)
        return q_bank[idx]

    def _get_mcq_bank(self, topic: str, difficulty: str, competency: str) -> List[Question]:
        mcqs = []

        if topic == "culture_communication":
            mcqs.extend([
                Question(
                    id="", type="mcq", topic=topic, difficulty="Medium", competency_type=competency,
                    question="Which of the following best defines 'culture' as understood in media studies?",
                    options=[
                        "A) Biological traits inherited from parents",
                        "B) Shared values, beliefs, and practices of a group transmitted through communication",
                        "C) Individual personal preferences and hobbies",
                        "D) Economic systems of a society"
                    ],
                    answer="B",
                    explanation="Culture encompasses the shared values, beliefs, traditions, and practices of a group that are transmitted through communication across generations."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="In the Indian context, which of the following is an example of how mass media influences cultural practices?",
                    options=[
                        "A) The promotion of traditional Indian clothing brands through fashion television shows",
                        "B) Government tax policies on imported goods",
                        "C) Agricultural yield improvements through irrigation",
                        "D) Railway ticket booking systems"
                    ],
                    answer="A",
                    explanation="Fashion television shows and advertising influence the adoption and perception of traditional Indian clothing (sarees, kurtas) as cultural symbols, demonstrating the bidirectional culture-media relationship."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Medium", competency_type="standard",
                    question="The relationship between culture and mass media is best described as:",
                    options=[
                        "A) One-way: media only influences culture",
                        "B) One-way: culture only influences media",
                        "C) Bidirectional: media both shapes and reflects culture",
                        "D) Unrelated: culture and media operate independently"
                    ],
                    answer="C",
                    explanation="The relationship between culture and mass media is bidirectional - media reflects existing cultural values while simultaneously shaping and transforming them."
                )
            ])

        if topic == "cultural_transmission":
            mcqs.extend([
                Question(
                    id="", type="mcq", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="A television serial depicting joint family values in urban India is an example of:",
                    options=[
                        "A) Media transmitting cultural values across generations",
                        "B) Paid news",
                        "C) Sensationalism",
                        "D) Plagiarism"
                    ],
                    answer="A",
                    explanation="Television serials that portray family structures, values, and social norms serve as vehicles for cultural transmission, teaching younger generations about cultural expectations."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Hard", competency_type="standard",
                    question="'Representation' in media studies refers to:",
                    options=[
                        "A) Legal representation of clients in court",
                        "B) The way media constructs and portrays people, groups, and events",
                        "C) Mathematical representation of data",
                        "D) Employee representation in unions"
                    ],
                    answer="B",
                    explanation="In media studies, representation refers to how media constructs meaning about the world through the portrayal of people, groups, places, and events, creating versions of reality for audiences."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="Which of the following is an example of stereotyping in Indian mass media?",
                    options=[
                        "A) A news report covering the Kumbh Mela",
                        "B) Fair-skinned models exclusively advertising fairness creams",
                        "C) A documentary on tiger conservation",
                        "D) A live cricket match broadcast"
                    ],
                    answer="B",
                    explanation="The consistent use of only fair-skinned models in fairness cream advertisements reinforces the stereotype that fair skin is superior, which is a common and criticized practice in Indian media."
                )
            ])

        if topic == "communication_social_change":
            mcqs.extend([
                Question(
                    id="", type="mcq", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="Doordarshan's 'Hum Log' serial in the 1980s promoted which social message through entertainment?",
                    options=[
                        "A) Environmental conservation",
                        "B) Family planning and smaller families",
                        "C) Digital literacy",
                        "D) Traffic safety"
                    ],
                    answer="B",
                    explanation="'Hum Log' (1984-85), India's first TV soap opera, was designed to promote family planning and the idea of smaller families, demonstrating how entertainment media can drive social change."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Medium", competency_type="standard",
                    question="The 'Two-Step Flow' theory of communication suggests that:",
                    options=[
                        "A) Media messages directly influence all audience members equally",
                        "B) Media first influences opinion leaders who then influence others",
                        "C) Communication happens in exactly two steps: encoding and decoding",
                        "D) Only two types of media exist: print and electronic"
                    ],
                    answer="B",
                    explanation="The Two-Step Flow theory (Katz & Lazarsfeld, 1955) proposes that media messages flow from media to opinion leaders, who then influence the broader public."
                )
            ])

        if topic == "journalist_qualities":
            mcqs.extend([
                Question(
                    id="", type="mcq", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="Which quality of a journalist refers to the ability to identify what is newsworthy before others?",
                    options=[
                        "A) Empathy",
                        "B) Nose for news",
                        "C) Language skills",
                        "D) Trustworthiness"
                    ],
                    answer="B",
                    explanation="'Nose for news' is the journalistic quality of instinctively identifying newsworthy stories, understanding what the public needs to know, and recognizing the significance of events."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Medium", competency_type="standard",
                    question="Which quality of a journalist involves verifying facts, maintaining source confidentiality, and being accountable?",
                    options=[
                        "A) Inquisitiveness",
                        "B) Language skills",
                        "C) Trustworthiness",
                        "D) Nose for news"
                    ],
                    answer="C",
                    explanation="Trustworthiness encompasses honesty, integrity, verification of facts, maintaining source confidentiality, and being accountable for published content."
                )
            ])

        if topic == "ethical_journalism":
            mcqs.extend([
                Question(
                    id="", type="mcq", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="During election coverage, a news channel publishes positive stories about a candidate in exchange for advertising revenue from their political party. This is an example of:",
                    options=[
                        "A) Sensationalism",
                        "B) Fake news",
                        "C) Paid news",
                        "D) Plagiarism"
                    ],
                    answer="C",
                    explanation="Paid news occurs when news content is published in exchange for financial or other benefits, compromising journalistic independence. This was a significant issue in Indian elections."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Hard", competency_type="standard",
                    question="Using someone else's article and presenting it as original work without attribution is:",
                    options=[
                        "A) Sensationalism",
                        "B) Fake news",
                        "C) Paid news",
                        "D) Plagiarism"
                    ],
                    answer="D",
                    explanation="Plagiarism is the act of using someone else's work, ideas, or expressions without proper attribution and presenting them as one's own original work."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="Reporting a minor local incident with exaggerated headlines and graphic details to increase TV ratings is an example of:",
                    options=[
                        "A) Paid news",
                        "B) Plagiarism",
                        "C) Sensationalism",
                        "D) Covert advertising"
                    ],
                    answer="C",
                    explanation="Sensationalism involves using shocking, exaggerated, or provocative content to attract viewership, often at the expense of accuracy, proportion, and dignity."
                )
            ])

        if topic == "tv_advertising_process":
            mcqs.extend([
                Question(
                    id="", type="mcq", topic=topic, difficulty="Medium", competency_type="standard",
                    question="In the TV advertising production process, which stage comes immediately after scripting?",
                    options=[
                        "A) Pre-production",
                        "B) Shooting",
                        "C) Casting",
                        "D) Post-production"
                    ],
                    answer="C",
                    explanation="The TV advertising production process follows: Planning → Scripting → Casting → Pre-Production → Shooting → Post-Production → Approval → Delivery."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="The final stage of TV advertising where the ad is checked for compliance with ASCI guidelines is called:",
                    options=[
                        "A) Pre-production",
                        "B) Shooting",
                        "C) Approval",
                        "D) Delivery"
                    ],
                    answer="C",
                    explanation="The Approval stage involves review by the client and regulatory bodies like the Advertising Standards Council of India (ASCI) to ensure compliance with advertising standards."
                )
            ])

        if topic == "tv_advertising_types":
            mcqs.extend([
                Question(
                    id="", type="mcq", topic=topic, difficulty="Medium", competency_type="standard",
                    question="A 30-second advertisement shown before the start of a TV programme is an example of:",
                    options=[
                        "A) Infomercial",
                        "B) Bumper ad",
                        "C) Sponsorship",
                        "D) Cross promotion"
                    ],
                    answer="B",
                    explanation="Bumper ads are short 5-10 second advertisements that appear between programme segments or before/after commercial breaks, distinct from longer commercial slots."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="A 30-minute extended commercial that combines product demonstration with entertainment to sell a kitchen appliance directly to viewers is called:",
                    options=[
                        "A) Bumper ad",
                        "B) Sponsorship",
                        "C) Infomercial",
                        "D) Covert advertising"
                    ],
                    answer="C",
                    explanation="Infomercials are extended-length commercials (typically 30 minutes) that blend information and entertainment to directly sell products to consumers."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="When a TV channel airs a programme segment funded by a brand and acknowledges it on-air, this is called:",
                    options=[
                        "A) Covert advertising",
                        "B) Sponsorship",
                        "C) Paid news",
                        "D) Cross promotion"
                    ],
                    answer="B",
                    explanation="Sponsorship occurs when a brand funds a programme or segment in exchange for on-air acknowledgment. In India, this is regulated to distinguish it from editorial content."
                )
            ])

        if topic == "tv_fiction":
            mcqs.extend([
                Question(
                    id="", type="mcq", topic=topic, difficulty="Easy", competency_type="indian_context",
                    question="'Ramayan' and 'Mahabharat' (1987-88) broadcast on Doordarshan fall under which category of TV fiction?",
                    options=[
                        "A) Sitcoms",
                        "B) Crime thrillers",
                        "C) Mythological serials",
                        "D) Reality shows"
                    ],
                    answer="C",
                    explanation="Mythological serials are a genre of TV fiction based on Indian mythology and religious texts. Ramanand Sagar's 'Ramayan' became one of the most-watched TV programmes globally."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Easy", competency_type="standard",
                    question="Which of the following is a characteristic of fictional TV programmes?",
                    options=[
                        "A) Based on real events and facts",
                        "B) Scripted dialogue and written storylines",
                        "C) Use of real people without actors",
                        "D) Primarily educational purpose"
                    ],
                    answer="B",
                    explanation="Fictional TV programmes are characterized by scripted dialogue, written storylines and plots, use of professional actors, and are primarily designed for entertainment."
                )
            ])

        if topic == "tv_nonfiction":
            mcqs.extend([
                Question(
                    id="", type="mcq", topic=topic, difficulty="Easy", competency_type="indian_context",
                    question="DD National's 'Bharat Ek Khoj' directed by Shyam Benegal is an example of which type of non-fiction TV programme?",
                    options=[
                        "A) Sitcom",
                        "B) Documentary",
                        "C) Soap opera",
                        "D) Infomercial"
                    ],
                    answer="B",
                    explanation="'Bharat Ek Khoj' (1988) is a documentary series based on Jawaharlal Nehru's 'The Discovery of India,' exploring India's history and culture through dramatized documentary format."
                ),
                Question(
                    id="", type="mcq", topic=topic, difficulty="Easy", competency_type="standard",
                    question="Which of the following is a key characteristic of non-fiction TV programmes?",
                    options=[
                        "A) Scripted fictional storylines",
                        "B) Based on real events and facts",
                        "C) Professional actors playing fictional roles",
                        "D) Designed purely for entertainment"
                    ],
                    answer="B",
                    explanation="Non-fiction TV programmes are characterized by being based on real events and facts, often minimally scripted, with informative and educational purposes, using real people or experts."
                )
            ])

        for q in mcqs:
            q.id = self._hash_question(q.question + q.type)
        return mcqs

    def _get_fill_blank_bank(self, topic: str, difficulty: str, competency: str) -> List[Question]:
        blanks = []

        if topic == "culture_communication":
            blanks.extend([
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Medium", competency_type=competency,
                    question="The relationship between culture and mass media is __________, meaning both influence each other.",
                    answer="bidirectional",
                    explanation="The culture-media relationship is bidirectional - media reflects cultural values while simultaneously shaping and transforming them."
                ),
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="Edward B. Tylor defined culture as 'that complex whole which includes knowledge, belief, art, morals, law, custom, and other capabilities acquired by man as a member of __________.'",
                    answer="society",
                    explanation="Edward B. Tylor's famous definition emphasizes that culture is acquired through membership in society, highlighting its socially transmitted nature."
                ),
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Medium", competency_type="standard",
                    question="Communication in the cultural context refers to the process through which __________ is transmitted from one generation to another.",
                    answer="culture",
                    explanation="Communication serves as the mechanism through which culture - including values, beliefs, traditions, and knowledge - is transmitted across generations."
                )
            ])

        if topic == "cultural_transmission":
            blanks.extend([
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="The practice of casting fair-skinned models exclusively in advertisements for beauty products is an example of __________ stereotyping in media.",
                    answer="racial",
                    explanation="This is an example of racial/colour-based stereotyping, where fair skin is associated with beauty and superiority, a widespread and criticized practice in Indian advertising."
                ),
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Hard", competency_type="standard",
                    question="__________ refers to the way media constructs and portrays people, groups, and events, creating a version of reality for audiences.",
                    answer="representation",
                    explanation="Representation in media studies is the process through which media gives meaning to the world through the portrayal of people, groups, places, and events."
                )
            ])

        if topic == "journalist_qualities":
            blanks.extend([
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Medium", competency_type="standard",
                    question="The ability of a journalist to instinctively identify what is newsworthy is called a __________ for news.",
                    answer="nose",
                    explanation="'Nose for news' is the journalistic quality of instinctively identifying newsworthy stories, understanding what the public needs to know."
                ),
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="A journalist who listens carefully to a victim's account of a natural disaster and reports their pain with sensitivity demonstrates the quality of __________.",
                    answer="empathy",
                    explanation="Empathy in journalism involves understanding and sharing the feelings of people being reported on, particularly important in sensitive situations like disasters."
                )
            ])

        if topic == "ethical_journalism":
            blanks.extend([
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Hard", competency_type="standard",
                    question="The use of exaggerated and provocative content to attract viewers at the expense of accuracy is called __________.",
                    answer="sensationalism",
                    explanation="Sensationalism involves using shocking, exaggerated, or provocative content to attract viewership, often compromising accuracy and dignity."
                ),
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="In Indian election coverage, publishing favourable stories about a candidate in exchange for money is called __________ news.",
                    answer="paid",
                    explanation="Paid news refers to news content published in exchange for financial or other benefits, seriously compromising journalistic ethics and democratic processes."
                )
            ])

        if topic == "tv_advertising_process":
            blanks.extend([
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Medium", competency_type="standard",
                    question="The __________ stage of TV advertising involves reviewing the final ad for compliance with regulatory guidelines before broadcast.",
                    answer="approval",
                    explanation="The Approval stage ensures the advertisement meets regulatory standards set by bodies like ASCI in India before it goes to air."
                ),
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="The eight stages of TV advertising production are: Planning, Scripting, Casting, Pre-production, Shooting, Post-production, Approval, and __________.",
                    answer="delivery",
                    explanation="Delivery is the final stage where the completed advertisement is provided to TV channels in the required formats for broadcast."
                )
            ])

        if topic == "tv_advertising_types":
            blanks.extend([
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Medium", competency_type="standard",
                    question="__________ ads are short 5-10 second advertisements that appear between programme segments.",
                    answer="bumper",
                    explanation="Bumper ads are brief advertising spots typically shown between programme segments or around commercial breaks."
                ),
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="When a soap opera character uses a specific brand of mobile phone during a scene without disclosure, it is an example of __________ advertising.",
                    answer="covert",
                    explanation="Covert advertising (or product placement) involves embedding product promotion within programme content without explicit disclosure to viewers."
                ),
                Question(
                    id="", type="fill_blank", topic=topic, difficulty="Medium", competency_type="standard",
                    question="A 30-minute extended commercial that combines product demonstration with entertainment is called an __________.",
                    answer="infomercial",
                    explanation="Infomercials are long-form commercials that blend informational content with entertainment to persuade viewers to purchase products."
                )
            ])

        for q in blanks:
            q.id = self._hash_question(q.question + q.type)
        return blanks

    def _get_short_answer_bank(self, topic: str, difficulty: str, competency: str) -> List[Question]:
        answers = []

        if topic == "culture_communication":
            answers.extend([
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Medium", competency_type="standard",
                    question="Explain the bidirectional relationship between culture and mass media.",
                    answer="The relationship is bidirectional: (1) Media reflects culture by portraying existing values, beliefs, and practices; (2) Media shapes culture by influencing attitudes, introducing new ideas, and changing norms; (3) Cultural context determines how audiences interpret media messages.",
                    explanation="This bidirectional relationship means culture and media constantly interact - neither simply causes the other, but they evolve together through ongoing exchange."
                ),
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="How does Indian mass media contribute to cultural transmission? Give two examples.",
                    answer="(1) Television serials like 'Ramayan' and 'Mahabharat' transmitted Hindu mythological values to millions of viewers; (2) Regional language films preserve and spread local cultural practices, festivals, and traditions across India and the diaspora.",
                    explanation="Indian mass media serves as a vehicle for cultural transmission by preserving traditional values through entertainment while also facilitating cultural exchange between regions."
                ),
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="What is culture? Name three elements of Indian culture.",
                    answer="Culture is the shared values, beliefs, traditions, and way of life of a group transmitted through communication. Three elements of Indian culture: (1) Language diversity (22 scheduled languages), (2) Festival traditions (Diwali, Eid, Christmas), (3) Food habits (regional cuisines).",
                    explanation="Culture encompasses learned behaviours, norms, and symbolic systems shared within a community. India's rich cultural tapestry reflects incredible diversity across language, religion, and customs."
                )
            ])

        if topic == "cultural_transmission":
            answers.extend([
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="Define representation in media. How does stereotyping occur in Indian media?",
                    answer="Representation is how media portrays people and groups, constructing versions of reality. In Indian media, stereotyping occurs through: (1) Fair-skin bias in advertisements, (2) Gender stereotypes in soap operas, (3) Regional stereotypes (e.g., North-East Indians portrayed as 'exotic'), (4) Caste-based typecasting in films.",
                    explanation="Stereotyping in Indian media often reflects and reinforces existing social biases, affecting how different communities are perceived by mainstream audiences."
                ),
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Hard", competency_type="standard",
                    question="Differentiate between representation and stereotyping in mass media.",
                    answer="Representation: The process of portraying people/groups/events in media, which can be accurate or inaccurate. Stereotyping: A specific type of representation that oversimplifies and generalizes about a group, applying fixed characteristics to all members regardless of individual differences.",
                    explanation="While all stereotyping is a form of representation, not all representation is stereotyping. Stereotyping specifically involves oversimplification and unfair generalization."
                )
            ])

        if topic == "communication_social_change":
            answers.extend([
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="How did Doordarshan's 'Hum Log' contribute to social change in India?",
                    answer="'Hum Log' (1984) was India's first TV soap opera designed to promote social messages. It depicted a middle-class family and subtly promoted family planning, women's education, and smaller family norms. It demonstrated how entertainment-education (edutainment) could drive social change by embedding messages within popular storytelling.",
                    explanation="This is an early and successful example of entertainment-education in India, showing how serialized fiction can influence social attitudes and behaviours."
                ),
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Medium", competency_type="standard",
                    question="Explain the Two-Step Flow theory of communication.",
                    answer="The Two-Step Flow theory (Katz & Lazarsfeld, 1955) proposes that media messages flow in two steps: (1) Media → Opinion Leaders, who are more exposed to media and actively interpret messages; (2) Opinion Leaders → wider audience through interpersonal communication. This theory challenges the 'hypodermic needle' model and emphasizes the role of social relationships in media effects.",
                    explanation="The Two-Step Flow theory is significant because it recognized that media effects are mediated through social networks and personal influence, not direct."
                )
            ])

        if topic == "journalist_qualities":
            answers.extend([
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="Describe any three qualities of a good journalist.",
                    answer="(1) Nose for News: Ability to identify newsworthy stories and understand what the public needs to know; (2) Inquisitiveness: The drive to ask questions, investigate deeper, and seek truth beyond surface information; (3) Empathy: Understanding and sharing the feelings of people being reported on, especially in sensitive situations like disasters or conflicts.",
                    explanation="These qualities work together to produce responsible, impactful journalism that serves the public interest."
                ),
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="Why is trustworthiness considered the most important quality for a journalist?",
                    answer="Trustworthiness is fundamental because: (1) Public trust is the foundation of journalism's role in democracy; (2) Journalists handle sensitive information and source confidentiality; (3) Accuracy and factual reporting depend on honest verification; (4) Without trust, media loses its credibility and societal function. Indian journalists like B.G. Verghese exemplified this through fearless, honest reporting.",
                    explanation="Trustworthiness encompasses honesty, integrity, verification, confidentiality, and accountability - all essential for democratic journalism."
                )
            ])

        if topic == "ethical_journalism":
            answers.extend([
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="What is sensationalism in journalism? Give an Indian example.",
                    answer="Sensationalism is the use of shocking, exaggerated, or provocative content to attract viewership/readership at the expense of accuracy and dignity. Indian example: Some news channels broadcasting graphic details of crime scenes or communal incidents with dramatic music and anchors' shrill commentary to increase TRPs, disregarding the victims' dignity and potential for inflaming tensions.",
                    explanation="Sensationalism is criticized for compromising journalistic standards, potentially inciting harm, and reducing serious issues to entertainment."
                ),
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="Explain the problem of 'paid news' in Indian elections.",
                    answer="Paid news refers to news content published in exchange for financial benefits, compromising journalistic independence. In Indian elections: (1) Candidates pay news channels for favourable coverage disguised as news; (2) This misleads voters and undermines democratic processes; (3) The Press Council of India and Election Commission have tried to regulate it; (4) It blurs the line between editorial content and advertising.",
                    explanation="Paid news is particularly damaging in elections because it manipulates public opinion while appearing as independent journalism."
                )
            ])

        if topic == "tv_advertising_process":
            answers.extend([
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="List and explain the eight stages of TV advertising production.",
                    answer="(1) Planning: Market research and creative brief; (2) Scripting: Writing the script; (3) Casting: Selecting actors; (4) Pre-production: Location, set, costume planning; (5) Shooting: Actual filming; (6) Post-production: Editing, music, effects; (7) Approval: Regulatory/client review; (8) Delivery: Final delivery to channels.",
                    explanation="Each stage requires specialized skills and coordination. In India, the ASCI (Advertising Standards Council of India) monitors compliance at the approval stage."
                )
            ])

        if topic == "tv_advertising_types":
            answers.extend([
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="Explain any three types of TV advertising with examples.",
                    answer="(1) Sponsorship: Brand funds a programme for on-air credit (e.g., 'Kapil Sharma Show presented by X brand'); (2) Infomercial: Extended commercial demonstrating products (e.g., kitchen gadget demonstrations); (3) Bumper ads: Short 5-10 second ads between segments (e.g., channel idents with brand messages).",
                    explanation="Different ad types serve different marketing objectives - from brand awareness (bumpers) to direct response (infomercials)."
                )
            ])

        if topic == "tv_fiction":
            answers.extend([
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Easy", competency_type="indian_context",
                    question="Differentiate between a sitcom and a soap opera in Indian television.",
                    answer="Sitcom: Situation comedy with humorous storylines, self-contained episodes, recurring characters (e.g., Sarabhai vs Sarabhai). Soap Opera: Ongoing dramatic series with continuing storylines, emotional conflicts, typically daily (e.g., Kyunki Saas Bhi Kabhi Bahu Thi). Key differences: tone (comedy vs drama), episode structure, and narrative continuity.",
                    explanation="Both are fictional formats but serve different audience needs - sitcoms for light entertainment, soap operas for ongoing emotional engagement."
                )
            ])

        if topic == "tv_nonfiction":
            answers.extend([
                Question(
                    id="", type="short_answer", topic=topic, difficulty="Easy", competency_type="indian_context",
                    question="How do non-fiction programmes differ from fiction programmes? Give an Indian example of each.",
                    answer="Differences: Non-fiction uses real events/people, minimally scripted, educational purpose. Fiction uses scripted stories, professional actors, entertainment purpose. Indian example of non-fiction: DD's 'Bharat Ek Khoj' (documentary on Indian history). Indian example of fiction: 'Ramayan' (mythological serial).",
                    explanation="The distinction lies in the basis of content - real vs imagined - and the primary purpose (inform/educate vs entertain)."
                )
            ])

        for q in answers:
            q.id = self._hash_question(q.question + q.type)
        return answers

    def _get_long_answer_bank(self, topic: str, difficulty: str, competency: str) -> List[Question]:
        answers = []

        if topic == "culture_communication":
            answers.extend([
                Question(
                    id="", type="long_answer", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="Discuss the relationship between culture and mass media in the Indian context. How do media messages get shaped by cultural contexts?",
                    answer="The relationship between culture and mass media in India is deeply intertwined: (1) Cultural Reflection: Indian media reflects India's diversity - regional languages, festivals, traditions; (2) Cultural Shaping: Media influences social norms - TV serials shaped perceptions of family structures; (3) Cultural Context shapes interpretation - rural audiences interpret media differently from urban; (4) Media as Cultural Arena: Different media platforms represent competing cultural values; (5) Example: The portrayal of women in Indian television evolved from idealized 'Sita-Savitri' characters to more complex portrayals reflecting changing social realities.",
                    explanation="India's media-culture relationship exemplifies the bidirectional model - media both preserves and transforms cultural values, shaped by and shaping India's complex social fabric."
                ),
                Question(
                    id="", type="long_answer", topic=topic, difficulty="Hard", competency_type="standard",
                    question="'Culture is not just reflected by media - it is also shaped by media.' Explain this statement with examples.",
                    answer="This statement captures the bidirectional nature of the culture-media relationship. First, media REFLECTS culture by portraying existing values, norms, and practices (e.g., news coverage of festivals). Second, media SHAPES culture by: (1) Introducing new ideas and lifestyles (e.g., Western influence through Hollywood); (2) Creating new cultural norms (e.g., social media influencing language and behaviour); (3) Challenging existing traditions (e.g.) women's representation evolving in media); (4) Creating shared cultural experiences (e.g., live sports broadcasts creating national moments).",
                    explanation="This bidirectional relationship means culture and media are in constant dialogue - media is both a product of culture and a producer of culture."
                )
            ])

        if topic == "cultural_transmission":
            answers.extend([
                Question(
                    id="", type="long_answer", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="Explain how mass media acts as a vehicle of cultural transmission. Discuss representation and stereotyping in Indian media.",
                    answer="Mass media as cultural vehicle: (1) Transmits traditions, values, and knowledge across generations; (2) Preserves cultural heritage through documentaries and specials; (3) Spreads cultural practices across geographies (Bollywood spreading Indian culture globally). Representation and Stereotyping: Representation is how media portrays groups - can be accurate or distorted. Stereotyping is oversimplified, fixed portrayal. In Indian media: (1) Gender stereotyping in serials (ideal woman as self-sacrificing); (2) Regional stereotyping (South Indians as 'brains'); (3) Colour stereotyping (fair = beautiful); (4) Caste stereotyping in films. These stereotypes shape public perception and can reinforce social inequalities.",
                    explanation="While media transmits culture, it can also distort it through stereotyping, making critical media literacy essential."
                )
            ])

        if topic == "ethical_journalism":
            answers.extend([
                Question(
                    id="", type="long_answer", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="Analyze the ethical issues in contemporary Indian journalism with reference to sensationalism, fake news, and paid news.",
                    answer="(1) Sensationalism: Indian news channels often prioritize viewership (TRPs) over accuracy - graphic crime coverage, shrill debates, breaking news culture. This degrades journalistic quality and can incite social tensions. (2) Fake News: Social media has amplified fake news in India - WhatsApp rumors during elections, false communal stories, COVID-19 misinformation. This threatens social harmony and democratic processes. (3) Paid News: Documented cases of candidates paying for favourable election coverage. The Press Council of India and Election Commission have tried to address this through guidelines and monitoring. Solutions: Strengthening self-regulation, media literacy education, stricter enforcement of press council guidelines, and promoting independent journalism.",
                    explanation="These ethical issues undermine journalism's democratic function. India has seen several committees and regulatory attempts to address them."
                ),
                Question(
                    id="", type="long_answer", topic=topic, difficulty="Hard", competency_type="standard",
                    question="Why is plagiarism considered a serious ethical violation in journalism? Discuss with examples.",
                    answer="Plagiarism is serious because: (1) It violates intellectual property rights; (2) It deceives audiences by presenting others' work as original; (3) It undermines the journalist's credibility; (4) It harms the original creator's career and recognition. Examples: (1) A journalist copying an investigative report from another publication; (2) Using another photographer's images without credit; (3) Reproducing social media content as original reporting. Consequences include: loss of job, damage to publication's reputation, legal action, and loss of public trust. News organizations maintain strict anti-plagiarism policies.",
                    explanation="Plagiarism attacks the core of journalistic integrity - originality, honesty, and respect for intellectual labour."
                )
            ])

        if topic == "tv_advertising_process":
            answers.extend([
                Question(
                    id="", type="long_answer", topic=topic, difficulty="Hard", competency_type="indian_context",
                    question="Describe the complete production process of a television advertisement. Why is the approval stage particularly important in India?",
                    answer="TV ad production involves 8 stages: (1) Planning: Market research, target audience, budget; (2) Scripting: Written script with dialogue and visuals; (3) Casting: Selecting appropriate actors; (4) Pre-production: Location, sets, costumes; (5) Shooting: Actual filming with crew; (6) Post-production: Editing, music, effects; (7) Approval: Review by client and ASCI (Advertising Standards Council of India); (8) Delivery: Final format to channels. The Approval stage is crucial in India because: (1) ASCI ensures ads don't mislead consumers; (2) Prevents surrogate advertising (tobacco/alcohol brands advertising indirectly); (3) Ensures cultural sensitivity given India's diversity; (4) Protects vulnerable audiences (children); (5) Maintains advertising standards.",
                    explanation="The approval stage protects consumers and maintains standards, especially important given India's regulatory framework for advertising."
                )
            ])

        if topic == "tv_fiction":
            answers.extend([
                Question(
                    id="", type="long_answer", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="Discuss the different types of fictional TV programmes in India with examples.",
                    answer="Indian TV fiction includes: (1) Soap Operas: Daily dramas with continuing storylines - 'Kyunki Saas Bhi Kabhi Bahu Thi' (2000-08) defined the genre; (2) Sitcoms: Comedy series - 'Sarabhai vs Sarabhai', 'Khichdi'; (3) Mythological Serials: Based on epics - 'Ramayan' (1987), 'Mahabharat' (1988), 'Shri Krishna'; (4) Crime Thrillers: Detective/suspense - 'CID', 'Karawaan'; (5) Historical Dramas: 'Bharat Ek Khoj', 'The Sword of Tipu Sultan'. Each type serves different audience needs and reflects different aspects of Indian culture.",
                    explanation="Indian TV fiction has been a powerful cultural force, shaping social discourse, popular language, and even social attitudes."
                )
            ])

        if topic == "tv_nonfiction":
            answers.extend([
                Question(
                    id="", type="long_answer", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="Analyze the role of non-fiction TV programmes in Indian society. Give examples of different types.",
                    answer="Non-fiction TV programmes play vital roles: (1) News: Informs citizens - NDTV, Republic TV, DD News; (2) Documentaries: Educates on issues - 'India's Daughter', 'Gangubai Kathiawadi' (inspired by real events); (3) Reality Shows: Entertains while reflecting social dynamics - 'Kaun Banega Crorepati', 'Indian Idol'; (4) Educational: Doordarshan's educational slots for schools; (5) Talk Shows: Platforms for public discourse - 'Rendezvous with Simi Garewal'; (6) Infotainment: Combines information and entertainment - 'Satyamev Jayate'. These programmes inform, educate, entertain, and provide platforms for public discussion.",
                    explanation="Non-fiction TV serves as a crucial public sphere in India, given the country's diversity and the importance of accessible information."
                )
            ])

        for q in answers:
            q.id = self._hash_question(q.question + q.type)
        return answers

    def _get_numerical_bank(self, topic: str, difficulty: str, competency: str) -> List[Question]:
        nums = []

        if topic == "tv_advertising_process":
            nums.extend([
                Question(
                    id="", type="numerical", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="A TV advertising campaign has a total budget of Rs. 50,00,000. The Planning stage consumes 15%, Scripting 10%, and Casting 8% of the budget. If the remaining budget is equally divided among Pre-production, Shooting, Post-production, Approval, and Delivery, how much is allocated to each of these five stages?",
                    answer=760000,
                    explanation="Step 1: Calculate spent so far: 15% + 10% + 8% = 33% of Rs. 50,00,000 = Rs. 16,50,000. Step 2: Remaining = Rs. 50,00,000 - Rs. 16,50,000 = Rs. 33,50,000. Step 3: Divide by 5: Rs. 33,50,000 / 5 = Rs. 6,70,000 per stage. Verification: 15%+10%+8%+5x13.4% = 33%+67% = 100% ✓",
                    options=["A) Rs. 6,50,000", "B) Rs. 6,70,000", "C) Rs. 7,00,000", "D) Rs. 7,50,000"]
                ),
                Question(
                    id="", type="numerical", topic=topic, difficulty="Medium", competency_type="standard",
                    question="A TV ad production team has 8 stages. If stage durations in days are: Planning=5, Scripting=3, Casting=2, Pre-production=7, Shooting=4, Post-production=6, Approval=2, Delivery=1, what is the total production time and average stage duration?",
                    answer=5,
                    explanation="Step 1: Total = 5+3+2+7+4+6+2+1 = 30 days. Step 2: Average = 30/8 = 3.75 days. Verification: 8 x 3.75 = 30 ✓",
                    options=["A) 30 days, 3.75 days", "B) 28 days, 3.5 days", "C) 32 days, 4 days", "D) 25 days, 3.125 days"]
                )
            ])

        if topic == "tv_advertising_types":
            nums.extend([
                Question(
                    id="", type="numerical", topic=topic, difficulty="Medium", competency_type="indian_context",
                    question="A company runs a TV campaign with: 4 bumper ads per day for 30 days, 2 infomercials per week for 4 weeks, and 1 sponsorship deal. If bumper ads cost Rs. 15,000 each, infomercials cost Rs. 2,00,000 each, and sponsorship costs Rs. 10,00,000, what is the total campaign cost?",
                    answer=1220000,
                    explanation="Step 1: Bumper ads: 4 x 30 x 15,000 = Rs. 18,00,000. Step 2: Infomercials: 2 x 4 x 2,00,000 = Rs. 16,00,000. Step 3: Sponsorship: Rs. 10,00,000. Step 4: Total = 18,00,000 + 16,00,000 + 10,00,000 = Rs. 44,00,000. Verification: Sum check ✓",
                    options=["A) Rs. 44,00,000", "B) Rs. 40,00,000", "C) Rs. 48,00,000", "D) Rs. 36,00,000"]
                )
            ])

        for q in nums:
            q.id = self._hash_question(q.question + q.type)
        return nums

    def _fallback_mcq(self, topic: str, difficulty: str, competency: str) -> Question:
        q = Question(
            id="", type="mcq", topic=topic, difficulty=difficulty, competency_type=competency,
            question="Mass media plays a significant role in:",
            options=["A) Individual decision making only", "B) Shaping and reflecting cultural values", "C) Biological inheritance", "D) Physical infrastructure development"],
            answer="B",
            explanation="Mass media both shapes and reflects cultural values, making it central to cultural communication and transmission."
        )
        q.id = self._hash_question(q.question + q.type)
        return q

    def _fallback_fill_blank(self, topic: str, difficulty: str, competency: str) -> Question:
        q = Question(id="", type="fill_blank", topic=topic, difficulty=difficulty, competency_type=competency,
            question="Media that transmits cultural values across generations acts as a vehicle of __________.",
            answer="cultural transmission", explanation="Media serves as a vehicle for cultural transmission, passing values and traditions between generations.")
        q.id = self._hash_question(q.question + q.type)
        return q

    def _fallback_short_answer(self, topic: str, difficulty: str, competency: str) -> Question:
        q = Question(id="", type="short_answer", topic=topic, difficulty=difficulty, competency_type=competency,
            question="What is the role of mass media in cultural communication?",
            answer="Mass media serves as both a reflector and shaper of culture. It transmits cultural values, preserves traditions, introduces new ideas, and creates shared cultural experiences across diverse audiences.",
            explanation="The role of media in cultural communication encompasses transmission, reflection, and transformation of cultural values.")
        q.id = self._hash_question(q.question + q.type)
        return q

    def _fallback_long_answer(self, topic: str, difficulty: str, competency: str) -> Question:
        q = Question(id="", type="long_answer", topic=topic, difficulty=difficulty, competency_type=competency,
            question="Discuss the importance of ethical journalism in a democratic society.",
            answer="Ethical journalism is fundamental to democracy: (1) Informs citizens accurately for decision-making; (2) Holds power accountable through investigative reporting; (3) Provides a platform for diverse voices; (4) Builds public trust in institutions; (5) Protects against misinformation. Without ethics, journalism becomes propaganda or entertainment, undermining democracy.",
            explanation="Ethical journalism serves as the fourth pillar of democracy, ensuring informed citizenry and accountable governance.")
        q.id = self._hash_question(q.question + q.type)
        return q

    def _fallback_numerical(self, topic: str, difficulty: str, competency: str) -> Question:
        q = Question(id="", type="numerical", topic=topic, difficulty=difficulty, competency_type=competency,
            question="If a TV advertising campaign has 8 production stages and the total time is 40 days, with each stage taking equal time, how many days does each stage take?",
            answer=5, explanation="40 days / 8 stages = 5 days per stage. Verification: 8 x 5 = 40 ✓",
            options=["A) 4 days", "B) 5 days", "C) 6 days", "D) 8 days"])
        q.id = self._hash_question(q.question + q.type)
        return q

    def generate_questions(self, seed: int, count: int = 10) -> List[Dict]:
        self.rng = random.Random(seed)
        questions = []

        topic_list = list(SYLLABUS_TOPICS.keys())
        question_types = ["mcq", "fill_blank", "short_answer", "long_answer", "numerical"]
        difficulties = ["Easy", "Medium", "Hard"]
        competency_types = ["standard", "indian_context"]

        type_distribution = {
            "mcq": int(count * 0.35),
            "fill_blank": int(count * 0.15),
            "short_answer": int(count * 0.20),
            "long_answer": int(count * 0.15),
            "numerical": int(count * 0.15)
        }

        remaining = count - sum(type_distribution.values())
        type_distribution["mcq"] += remaining

        topic_counts = {t: 0 for t in topic_list}
        per_topic = max(1, count // len(topic_list))
        for i, t in enumerate(topic_list):
            topic_counts[t] = per_topic + (1 if i < count % len(topic_list) else 0)

        for qtype, qcount in type_distribution.items():
            for _ in range(qcount):
                topic = self.rng.choice(topic_list)
                difficulty = self.rng.choice(difficulties)
                competency = self.rng.choice(competency_types)

                if qtype == "mcq":
                    q = self.generate_mcq(topic, difficulty, competency)
                elif qtype == "fill_blank":
                    q = self.generate_fill_blank(topic, difficulty, competency)
                elif qtype == "short_answer":
                    q = self.generate_short_answer(topic, difficulty, competency)
                elif qtype == "long_answer":
                    q = self.generate_long_answer(topic, difficulty, competency)
                else:
                    q = self.generate_numerical(topic, difficulty, competency)

                q.topic = topic
                questions.append(self._question_to_dict(q))

        return questions

    def _question_to_dict(self, q: Question) -> Dict:
        d = {
            "id": q.id,
            "type": q.type,
            "topic": q.topic,
            "difficulty": q.difficulty,
            "question": q.question,
            "answer": q.answer,
            "explanation": q.explanation,
            "competency_type": q.competency_type
        }
        if q.options:
            d["options"] = q.options
        return d


# ============================================================
# SECTION 3: SOLVERS
# ============================================================

class MassMediaSolver:
    def __init__(self):
        self.steps = []
        self.verification = {}

    def _reset(self):
        self.steps = []
        self.verification = {}

    # ----- MCQ Solver -----

    def solve_mcq(self, params: Dict) -> Dict:
        self._reset()
        question = params.get("question", "")
        options = params.get("options", [])
        correct_answer = params.get("answer", "")
        selected_answer = params.get("selected_answer", "")

        self.steps.append("=== MCQ Solver ===")
        self.steps.append(f"Question: {question}")
        self.steps.append(f"Options: {options}")
        self.steps.append(f"Correct Answer: {correct_answer}")
        self.steps.append(f"Selected Answer: {selected_answer}")

        is_correct = (selected_answer.strip().upper() == correct_answer.strip().upper())
        self.steps.append(f"Result: {'CORRECT ✓' if is_correct else 'INCORRECT ✗'}")

        self.verification = {
            "is_correct": is_correct,
            "correct_answer": correct_answer,
            "selected_answer": selected_answer,
            "match": is_correct
        }

        return {
            "answer": correct_answer,
            "is_correct": is_correct,
            "steps": self.steps,
            "verification": self.verification
        }

    # ----- Fill in the Blanks Solver -----

    def solve_fill_blank(self, params: Dict) -> Dict:
        self._reset()
        question = params.get("question", "")
        correct_answer = params.get("answer", "")
        user_answer = params.get("user_answer", "").strip()

        self.steps.append("=== Fill in the Blanks Solver ===")
        self.steps.append(f"Question: {question}")
        self.steps.append(f"Correct Answer: '{correct_answer}'")
        self.steps.append(f"User Answer: '{user_answer}'")

        normalized_correct = correct_answer.strip().lower()
        normalized_user = user_answer.strip().lower()
        is_correct = (normalized_user == normalized_correct)
        tolerance = 0.0

        if not is_correct:
            similarity = self._string_similarity(normalized_user, normalized_correct)
            is_correct = similarity >= 0.85
            tolerance = 1.0 - similarity

        self.steps.append(f"Normalized comparison: '{normalized_user}' vs '{normalized_correct}'")
        self.steps.append(f"Result: {'CORRECT ✓' if is_correct else 'INCORRECT ✗'}")

        self.verification = {
            "is_correct": is_correct,
            "tolerance": tolerance,
            "correct_answer": correct_answer,
            "user_answer": user_answer
        }

        return {
            "answer": correct_answer,
            "is_correct": is_correct,
            "steps": self.steps,
            "verification": self.verification
        }

    # ----- Short Answer Solver -----

    def solve_short_answer(self, params: Dict) -> Dict:
        self._reset()
        question = params.get("question", "")
        correct_answer = params.get("answer", "")
        user_answer = params.get("user_answer", "").strip()

        self.steps.append("=== Short Answer Solver ===")
        self.steps.append(f"Question: {question}")
        self.steps.append(f"Model Answer: {correct_answer}")
        self.steps.append(f"User Answer: {user_answer}")

        correct_words = set(correct_answer.lower().split())
        user_words = set(user_answer.lower().split())
        keyword_overlap = len(correct_words & user_words) / max(len(correct_words), 1)
        coverage_score = keyword_overlap * 100

        is_correct = coverage_score >= 50

        self.steps.append(f"Keyword overlap: {keyword_overlap:.2%}")
        self.steps.append(f"Coverage score: {coverage_score:.1f}%")
        self.steps.append(f"Result: {'ADEQUATE ✓' if is_correct else 'NEEDS IMPROVEMENT ✗'}")

        self.verification = {
            "keyword_coverage": coverage_score,
            "is_adequate": is_correct,
            "keywords_found": list(correct_words & user_words),
            "keywords_missing": list(correct_words - user_words)
        }

        return {
            "answer": correct_answer,
            "is_adequate": is_correct,
            "coverage_score": coverage_score,
            "steps": self.steps,
            "verification": self.verification
        }

    # ----- Long Answer Solver -----

    def solve_long_answer(self, params: Dict) -> Dict:
        self._reset()
        question = params.get("question", "")
        correct_answer = params.get("answer", "")
        user_answer = params.get("user_answer", "").strip()

        self.steps.append("=== Long Answer Solver ===")
        self.steps.append(f"Question: {question}")
        self.steps.append(f"Model Answer: {correct_answer}")
        self.steps.append(f"User Answer: {user_answer}")

        correct_words = set(correct_answer.lower().split())
        user_words = set(user_answer.lower().split())
        keyword_overlap = len(correct_words & user_words) / max(len(correct_words), 1)

        user_sentences = user_answer.split('.')
        model_points = [p.strip() for p in correct_answer.split(';') if p.strip()]
        points_covered = 0
        for point in model_points:
            if point.lower() in user_answer.lower():
                points_covered += 1

        return {
            "keyword_overlap": round(keyword_overlap, 2),
            "points_covered": points_covered,
            "total_points": len(model_points),
        }

# return {"status": "ok", "note": "truncated"}
