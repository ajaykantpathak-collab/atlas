"""
CISCE Class 11 Mass Media Studies - Deterministic Question Generator
Syllabus Coverage: Communication, Print Media, Radio, Television, Advertising, Public Relations, Digital Media
Author: CISCE Curriculum Generator
"""

import random
import math
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional, Any
from enum import Enum
import json


# ============================================================
# DATA STRUCTURES
# ============================================================

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


@dataclass
class Question:
    id: str
    type: str
    question: str
    options: Optional[List[str]] = None
    answer: str = ""
    explanation: str = ""
    difficulty: str = "medium"
    topic: str = ""
    competency_based: bool = False
    marks: int = 1


# ============================================================
# QUESTION BANK - FULL SYLLABUS COVERAGE
# ============================================================

# Chapter 1: Communication
# Nodes: 001(Definition), 002(Intrapersonal), 003(Interpersonal), 004(Group), 005(Mass),
#        006(Models), 007(Berlo)

CH1_QBANK = {
    "mcq": [
        {
            "topic": "communication-definition",
            "difficulty": "easy",
            "competency": False,
            "question": "Communication is considered both a science and an art because it:",
            "options": [
                "A) Uses only verbal language",
                "B) Follows systematic processes and allows creative expression",
                "C) Is never measurable",
                "D) Applies only to written texts"
            ],
            "answer": "B",
            "explanation": "Communication is a science because it follows systematic, measurable processes involving encoding, transmission, and decoding. It is an art because it involves creative expression, interpretation, and personal style in conveying meaning."
        },
        {
            "topic": "communication-definition",
            "difficulty": "easy",
            "competency": True,
            "question": "In the Indian context, the 'Prasar Bharati Act' of 1990 primarily deals with communication as:",
            "options": [
                "A) A personal art form",
                "B) A public service science for national integration",
                "C) A commercial trade only",
                "D) A purely entertainment medium"
            ],
            "answer": "B",
            "explanation": "The Prasar Bharati Act (1990) established Prasar Bharati as India's public service broadcaster, reflecting communication as a scientific process for national integration and public service - India's first state-level recognition of mass communication as both a science (systematic broadcasting) and art (cultural programming)."
        },
        {
            "topic": "intrapersonal-communication",
            "difficulty": "easy",
            "competency": False,
            "question": "Intrapersonal communication refers to communication that occurs:",
            "options": [
                "A) Between two people",
                "C) Within a large group",
                "D) Within an individual's own mind"
            ],
            "answer": "D",
            "explanation": "Intrapersonal communication is the process of communicating with oneself. It involves internal thoughts, self-reflection, self-talk, and personal contemplation - the foundation upon which all other forms of communication build."
        },
        {
            "topic": "self-concept",
            "difficulty": "easy",
            "competency": True,
            "question": "According to Indian philosophical traditions, 'Atman' - the innermost self - is best understood in mass media studies as related to:",
            "options": [
                "A) Interpersonal communication",
                "B) Intrapersonal communication and self-concept",
                "C) Mass communication",
                "D) Group communication"
            ],
            "answer": "B",
            "explanation": "Indian philosophical traditions emphasize self-awareness and self-realization (Atman), which parallels the concept of intrapersonal communication and self-concept in mass media theory. Self-reflection and understanding one's own identity are foundational to effective communication."
        },
        {
            "topic": "self-esteem",
            "difficulty": "easy",
            "competency": False,
            "question": "Self-esteem refers to:",
            "options": [
                "A) How others perceive us",
                "B) Our overall subjective emotional evaluation of our own worth",
                "C) The number of friends we have",
                "D) Our academic performance"
            ],
            "answer": "B",
            "explanation": "Self-esteem is an individual's subjective emotional evaluation of their own worth. It encompasses beliefs about oneself (e.g., 'I am worthy') and emotional states such as triumph, pride, and shame. It directly influences how one communicates with others."
        },
        {
            "topic": "interpersonal-communication",
            "difficulty": "easy",
            "competency": False,
            "question": "Interpersonal communication is characterized by:",
            "options": [
                "A) One-way transmission only",
                "B) Direct, face-to-face exchange between two or more people",
                "C) Broadcasting to millions",
                "D) Writing formal letters"
            ],
            "answer": "B",
            "explanation": "Interpersonal communication involves direct, face-to-face (or direct mediated) exchange between two or more people. It is characterized by immediate feedback, nonverbal cues, and relational dynamics - making it the most personal and interactive form of communication."
        },
        {
            "topic": "group-communication",
            "difficulty": "easy",
            "competency": False,
            "question": "Group communication occurs when:",
            "options": [
                "A) One person speaks and others listen silently",
                "B) A small number of people interact and share information toward a common goal",
                "C) A message is broadcast to the entire nation",
                "D) Someone writes in a personal diary"
            ],
            "answer": "B",
            "explanation": "Group communication involves interaction among a small number of people (typically 3-20) working toward a common goal. It includes characteristics like role differentiation, shared norms, and mutual influence - distinct from interpersonal dyadic communication."
        },
        {
            "topic": "mass-communication",
            "difficulty": "easy",
            "competency": False,
            "question": "A defining characteristic of mass communication that distinguishes it from interpersonal communication is:",
            "options": [
                "A) It involves only two people",
                "B) It uses only verbal messages",
                "C) It reaches a large, heterogeneous, and geographically dispersed audience",
                "D) It requires immediate feedback from every receiver"
            ],
            "answer": "C",
            "explanation": "Mass communication is defined by its reach to a large, heterogeneous (diverse), and geographically dispersed audience through mediated channels. Unlike interpersonal communication, feedback is typically delayed, indirect, or absent."
        },
        {
            "topic": "models-of-communication",
            "difficulty": "easy",
            "competency": False,
            "question": "In Shannon and Weaver's Mathematical Model of Communication (1949), 'noise' refers to:",
            "options": [
                "A) The volume of the speaker's voice",
                "B) Any interference that distorts or disrupts the message during transmission",
                "C) The emotional state of the receiver",
                "D) The physical distance between sender and receiver"
            ],
            "answer": "B",
            "explanation": "In Shannon and Weaver's model, 'noise' is any interference - physical (static, poor signal), psychological (prejudices, distractions), or semantic (language barriers) - that disrupts or distorts the message as it travels from source to destination."
        },
        {
            "topic": "communication-models",
            "difficulty": "medium",
            "competency": False,
            "question": "The key difference between Lasswell's Model and Shannon-Weaver's Model of Communication is that Lasswell's model:",
            "options": [
                "A) Introduces the concept of noise",
                "B) Focuses on effect rather than process",
                "C) Organizes communication as a linear 'Who says What in Which channel to Whom with What effect' formula",
                "D) Emphasizes feedback loops"
            ],
            "answer": "C",
            "explanation": "Lasswell's (1948) model is famous for organizing the communication process into five questions: Who (communicator) → Says What (message) → In Which Channel (medium) → To Whom (receiver) → With What Effect (outcome). Shannon-Weaver focus on technical transmission efficiency."
        },
        {
            "topic": "berlo-smcr",
            "difficulty": "medium",
            "competency": False,
            "question": "In Berlo's SMCR Model, the four key elements are:",
            "options": [
                "A) Source, Medium, Channel, Receiver",
                "B) Source, Message, Channel, Receiver",
                "C) Sender, Medium, Content, Result",
                "D) Subject, Meaning, Context, Response"
            ],
            "answer": "B",
            "explanation": "Berlo's SMCR Model (1960) identifies four key elements: Source (communicator's communication skills, attitudes, knowledge, social system), Message (elements, content, treatment, structure), Channel (the five senses), and Receiver."
        },
        {
            "topic": "communication-models",
            "difficulty": "medium",
            "competency": True,
            "question": "The 'Magic Bullet' or 'Hypodermic Needle' theory of communication, which suggests messages are directly received and wholly accepted, was developed based on observations of:",
            "options": [
                "A) Indian election campaigns",
                "B) Nazi Germany's propaganda during World War II",
                "C) Traditional village gatherings in India",
                "D) Classroom teaching methods"
            ],
            "answer": "B",
            "explanation": "The Hypodermic Needle Theory (1920s-30s) emerged from observations of Nazi Germany's propaganda effectiveness during WWII. The theory assumed audiences were passive and uniformly susceptible to media messages - a view later challenged by the Two-Step Flow theory."
        },
    ],
    "fill_blank": [
        {
            "topic": "communication-definition",
            "difficulty": "easy",
            "competency": False,
            "question": "Communication is defined as the process of creating and sharing _____ through symbolic interaction.",
            "answer": "meaning",
            "explanation": "Communication is fundamentally about creating and sharing meaning. It involves encoding thoughts into symbols (words, gestures, images) and decoding them to derive shared understanding between sender and receiver."
        },
        {
            "topic": "communication-definition",
            "difficulty": "easy",
            "competency": True,
            "question": "India's first public service broadcaster 'Doordarshan' began regular transmission in the year _____. (DD: Two-digit year)",
            "answer": "65",
            "explanation": "Doordarshan started regular transmission in 1965, initially as a part of All India Radio. It was later established as a separate department in 1976 and became a statutory autonomous corporation under Prasar Bharati in 1997."
        },
        {
            "topic": "intrapersonal-communication",
            "difficulty": "easy",
            "competency": False,
            "question": "_____ communication refers to the dialogue that takes place within an individual's own mind.",
            "answer": "Intrapersonal",
            "explanation": "Intrapersonal communication is self-communication - the internal monologue, self-reflection, and inner dialogue that occurs within an individual. It is the most fundamental form of communication and the basis for all other forms."
        },
        {
            "topic": "self-concept",
            "difficulty": "easy",
            "competency": True,
            "question": "According to _____ theory of communication, our perception of 'Self' is shaped by how we think others perceive us. (Charles Cooley's concept - first name only)",
            "answer": "Charles Cooley",
            "explanation": "Charles Cooley's 'Looking-Glass Self' theory (1902) proposes that our self-concept develops from our perception of how others view us. We imagine how we appear to others, imagine their judgment, and develop our self-feeling accordingly."
        },
        {
            "topic": "interpersonal-communication",
            "difficulty": "easy",
            "competency": False,
            "question": "_____ is a communication theorist known for his transactional model of interpersonal communication.",
            "answer": "Barnlund",
            "explanation": "Dean Barnlund's Transactional Model of Communication (1970) treats communication as a simultaneous, dynamic process where senders and receivers encode and decode messages concurrently, with feedback occurring continuously."
        },
        {
            "topic": "communication-noise",
            "difficulty": "easy",
            "competency": False,
            "question": "In the Shannon-Weaver model, the term _____ refers to any interference that disrupts the message during transmission.",
            "answer": "noise",
            "explanation": "Noise in the Shannon-Weaver model refers to any unwanted interference - physical (static), semantic (language differences), or psychological (prejudices, distractions) - that disrupts or distorts the transmission of a message from sender to receiver."
        },
    ],
    "short_answer": [
        {
            "topic": "communication-definition",
            "difficulty": "easy",
            "competency": False,
            "question": "Differentiate between communication as a 'science' and as an 'art', citing one example of each.",
            "answer": "As a science: Communication follows systematic, measurable, and repeatable processes (e.g., measuring audience reach through TRP ratings). As an art: Communication involves creativity, interpretation, and personal style (e.g., a news anchor's unique presentation style).",
            "explanation": "Communication as a science involves systematic study of encoding/decoding processes, measurable audience metrics, and repeatable communication patterns. Communication as an art involves creativity in message design, emotional expression, and the interpretive skills of both sender and receiver."
        },
        {
            "topic": "self-esteem",
            "difficulty": "easy",
            "competency": True,
            "question": "Explain how mass media representation affects the self-esteem of young audiences in India. Give one specific example.",
            "answer": "Mass media representation shapes self-esteem by providing social comparison benchmarks. For example, idealized portrayals of beauty in Indian TV commercials and films create unrealistic standards, often lowering self-esteem among adolescents who feel they cannot match these standards.",
            "explanation": "Social Comparison Theory (Festinger) explains that individuals evaluate themselves by comparing with others. In the Indian context, the predominantly fair-skinned, slim, Westernized portrayals in media create a gap between perceived ideals and reality, impacting self-esteem, particularly among young Indians."
        },
        {
            "topic": "intrapersonal-communication",
            "difficulty": "easy",
            "competency": True,
            "question": "In the Indian educational context, how does journal writing help develop intrapersonal communication skills? Explain in 2-3 sentences.",
            "answer": "Journal writing encourages self-reflection, helping students process emotions and thoughts internally. In Indian schools, guided journaling as part of the life skills curriculum develops self-awareness and emotional regulation, key components of intrapersonal communication.",
            "explanation": "Journal writing is a structured form of intrapersonal communication that helps individuals organize thoughts, process emotions, and develop self-awareness. In the Indian educational context, this aligns with the National Curriculum Framework's emphasis on reflective learning."
        },
        {
            "topic": "interpersonal-communication",
            "difficulty": "easy",
            "competency": False,
            "question": "List any three barriers to effective interpersonal communication.",
            "answer": "1) Physical barriers (noise, distance), 2) Psychological barriers (prejudice, anxiety, emotional states), 3) Semantic barriers (language differences, jargon, cultural misunderstandings).",
            "explanation": "Barriers to interpersonal communication can be physical (environmental interference), psychological (attitudes, emotions, perceptions), or semantic (meaning differences due to language, culture, or context). Effective communicators identify and minimize these barriers."
        },
        {
            "topic": "communication-models",
            "difficulty": "medium",
            "competency": False,
            "question": "Explain why Schramm's Model of Communication is considered an improvement over earlier linear models. Mention one key addition.",
            "answer": "Schramm's Model introduces the concept of the 'field of experience' and the feedback loop, making communication a circular process. Unlike linear models (Shannon-Weaver, Lasswell), it acknowledges that encoding and decoding depend on each participant's background, culture, and experiences - meaning the same message can be decoded differently by different receivers.",
            "explanation": "Wilbur Schramm's (1954) circular/oral model improved on linear models by adding: (1) feedback loops - communication is bidirectional, (2) field of experience - both sender and receiver bring their backgrounds to the process, (3) encoding/decoding overlap - both participants act simultaneously."
        },
        {
            "topic": "communication-models",
            "difficulty": "medium",
            "competency": True,
            "question": "How is Osgood and Schramm's circular model of communication particularly relevant to understanding the participatory nature of community radio in India?",
            "answer": "Community radio in India operates on participatory communication where both sender and receiver constantly switch roles - community members produce content and also consume it. This aligns with Osgood-Schramm's circular model where encoding and decoding occur simultaneously, emphasizing the two-way nature of communication in community settings.",
            "explanation": "Community radio stations like Radio Namaskar (Odisha) or Radio Community (Kerala) exemplify participatory communication. The Osgood-Schramm circular model (1954) shows how communication is an ongoing, two-way process where roles of source and destination alternate - essential for understanding community media dynamics."
        },
    ],
    "long_answer": [
        {
            "topic": "communication-definition",
            "difficulty": "medium",
            "competency": True,
            "question": "Discuss the statement: 'Communication is both a science and an art.' Illustrate your answer with examples from Indian mass media practice. (6 marks)",
            "answer": "Communication as a science: It involves systematic, measurable, and verifiable processes. For example, Doordarshan uses scientific audience measurement systems (TAM ratings), BARC's Broadcast Audience Research Council provides data-driven insights. Content analysis of media follows scientific methodology. Communication as an art: It involves creativity, aesthetic judgment, and personal expression. Indian filmmakers like Satyajit Ray demonstrated communication as art through cinematic storytelling. Advertising creative directors blend data with artistic creativity to craft compelling campaigns. The fusion of both: Effective Indian media practice combines scientific audience analysis with artistic message design.",
            "explanation": "This question tests understanding of communication's dual nature. The scientific aspect involves systematic processes, measurement, and repeatability. The artistic aspect involves creativity, interpretation, and personal style. In the Indian context, this is evident in Doordarshan's data-driven programming (science) combined with culturally resonant programming choices (art)."
        },
        {
            "topic": "communication-models",
            "difficulty": "medium",
            "competency": False,
            "question": "Compare and contrast any two models of communication studied by you. Which model do you think is most relevant for understanding mass communication in the digital age? Justify. (6 marks)",
            "answer": "Comparison: (1) Shannon-Weaver (1949): Linear, one-way, focuses on technical transmission efficiency, includes 'noise.' (2) Schramm's Circular Model (1954): Two-way feedback loop, introduces 'field of experience.' (3) Dance's Helical Model (1967): Shows communication as an ever-expanding, evolving spiral. For digital age: Schramm's model (or its evolution into transactional models) is most relevant because digital media is inherently interactive - social media, comments, shares, likes - all embody the feedback loop. The field of experience concept also explains echo chambers and algorithmic personalization.",
            "explanation": "Each model represents evolution in thinking about communication. The Shannon-Weaver model treats it as linear transmission; Schramm adds feedback; Dance visualizes it as evolutionary. In the digital age, interactive models are most relevant because digital platforms are fundamentally participatory and bidirectional."
        },
        {
            "topic": "mass-communication",
            "difficulty": "medium",
            "competency": True,
            "question": "Explain the five key characteristics of mass communication with specific reference to how Doordarshan (DD) operates as India's public service broadcaster. (6 marks)",
            "answer": "Five characteristics: (1) Large and heterogeneous audience: DD reaches diverse Indian audiences across languages, regions, and socio-economic backgrounds. (2) Mediated channel: Uses terrestrial television, satellite, and digital platforms. (3) Public message: Content is designed for public consumption (news, education, entertainment). (4) Delayed/no feedback: Traditional DD follows a one-to-many model, though DD Free Dish and DD apps now enable limited feedback. (5) Organized communication: Operates under Prasar Bharati with structured programming schedules. DD National, DD News, and regional DD channels exemplify these characteristics in India's public broadcasting framework.",
            "explanation": "The five key characteristics of mass communication - large heterogeneous audience, mediated channel, public message, delayed feedback, and organized institutional process - are clearly illustrated by Doordarshan's operation as India's national public service broadcaster under the Prasar Bharati Act."
        },
        {
            "topic": "communication-process",
            "difficulty": "hard",
            "competency": False,
            "question": "Trace the evolution of communication models from linear to transactional, explaining how each model addresses limitations of the previous one. (8 marks)",
            "answer": "Evolution: (1) Aristotle's Model (335 BC): Speaker → Speech → Audience - earliest linear model. Limitation: No feedback loop. (2) Shannon-Weaver (1949): Source → Encoder → Channel → Decoder → Destination; introduced 'noise.' Limitation: Still one-way, mechanical. (3) Lasswell (1948): Who says What in Which channel to Whom with What effect - emphasizes effects. Limitation: No feedback. (4) Schramm Circular (1954): Introduced feedback and field of experience. Limitation: Still somewhat sequential. (5) Barnlund Transactional (1970): Simultaneous encoding/decoding, multi-channel, noise at every point, field of experience shared. Most comprehensive. Each model addresses predecessor limitations by adding feedback (Schramm), context (Barnlund), and simultaneity (Barnlund).",
            "explanation": "The evolution from Aristotle to Barnlund shows growing sophistication: from one-way to two-way, from mechanical to interactive, from ignoring context to centering shared fields of experience. Barnlund's transactional model is most comprehensive, treating communication as a dynamic, simultaneous, context-rich process."
        },
    ],
    "numerical": [
        {
            "topic": "communication-reach",
            "difficulty": "medium",
            "competency": True,
            "question": "A radio station in a rural area of Maharashtra broadcasts to 2.5 lakh listeners. If 60% are regular listeners, 25% are occasional, and the rest never listen, calculate the number of occasional listeners.",
            "answer": "62500",
            "explanation": "Total listeners = 2,50,000. Occasional listeners = 25% of 2,50,000 = 0.25 x 2,50,000 = 62,500. This demonstrates how audience segmentation calculations work in media planning - a key skill for mass media professionals."
        },
        {
            "topic": "communication-percentage",
            "difficulty": "medium",
            "competency": True,
            "question": "A community radio station reaches 15,000 households in a village. If 80% tune in for news, 45% for music, and 30% for both, how many tune in for EITHER news OR music? (Use set theory formula)",
            "answer": "14250",
            "explanation": "Using set theory: n(A ∪ B) = n(A) + n(B) - n(A ∩ B) = 15,000 x 0.80 + 15,000 x 0.45 - 15,000 x 0.30 = 12,000 + 6,750 - 4,500 = 14,250. 14,250 households listen to either news or music. This verifies: 14,250 = 12,000 + 6,750 - 4,500 ✓"
        },
    ],
}

# Chapter 2: Print Media
# Nodes: 008(Journalism Definition), 009(News Definition), 010(Components), 011(Newspaper Structure),
#        012(Editorial), 013(Photojournalism), 014(Photojournalism meaning)

CH2_QBANK = {
    "mcq": [
        {
            "topic": "journalism-definition",
            "difficulty": "easy",
            "competency": False,
            "question": "Journalism is best defined as:",
            "options": [
                "A) The act of writing fiction for newspapers",
                "B) The practice of gathering, verifying, and presenting news and information",
                "C) The art of advertising products in magazines",
                "D) The process of printing books"
            ],
            "answer": "B",
            "explanation": "Journalism is the practice of collecting, verifying, presenting, and distributing news and information. It involves gathering facts, checking sources for accuracy, and presenting information in a fair and balanced way for public consumption."
        },
        {
            "topic": "journalism-definition",
            "difficulty": "easy",
            "competency": True,
            "question": "India's Press Council, established under the Press Council Act of 1978, primarily works to:",
            "options": [
                "A) Control what newspapers publish",
                "B) Preserve the freedom of the press and maintain journalistic standards",
                "C) Print government advertisements",
                "D) Censor news content"
            ],
            "answer": "B",
            "explanation": "The Press Council of India (established 1978) is a statutory, quasi-judicial body that works to preserve the freedom of the press and maintain and improve the standards of newspapers and news agencies in India."
        },
        {
            "topic": "news-definition",
            "difficulty": "easy",
            "competency": False,
            "question": "Which of the following is an example of HARD news?",
            "options": [
                "A) A feature story on a famous chef's life",
                "B) A report on a major earthquake in Gujarat",
                "C) A review of a new Bollywood film",
                "D) A profile of a social worker"
            ],
            "answer": "B",
            "explanation": "Hard news deals with factual, time-sensitive, and urgent events of public importance - like natural disasters, political developments, or accidents. Soft news covers human-interest stories, entertainment, and features that are less time-sensitive."
        },
        {
            "topic": "news-definition",
            "difficulty": "easy",
            "competency": True,
            "question": "In Indian newspaper publishing, the distinction between 'Hard News' and 'Soft News' is most clearly seen in the division between:",
            "options": [
                "A) English and Hindi editions",
                "B) Page 1 (front page) news and the Sunday magazine supplement",
                "C) National and international news",
                "D) Sports and business sections"
            ],
            "answer": "B",
            "explanation": "In Indian newspapers, the front page (Page 1) carries hard news - breaking political, economic, and social events. Sunday magazine supplements carry soft news - feature articles, profiles, entertainment, and human-interest stories, reflecting the distinction between urgent factual reporting and feature-oriented content."
        },
        {
            "topic": "news-components",
            "difficulty": "easy",
            "competency": False,
            "question": "Which component of news requires that a reporter always names their source of information?",
            "options": [
                "A) Accuracy",
                "B) Attribution",
                "C) Brevity",
                "D) Fairness"
            ],
            "answer": "B",
            "explanation": "Attribution is the practice of identifying the source of information in a news story (e.g., 'According to the police commissioner...'). It adds credibility, allows readers to evaluate the source, and protects journalists from claims of fabrication."
        },
        {
            "topic": "news-components",
            "difficulty": "medium",
            "competency": False,
            "question": "The 'inverted pyramid' structure in news writing places the most important information:",
            "options": [
                "A) At the end of the story",
                "B) At the beginning (the lead/lede)",
                "C) In the middle of the story",
                "D) In a separate summary box"
            ],
            "answer": "B",
            "explanation": "The inverted pyramid structure places the most important information (who, what, when, where, why) in the lead paragraph. Less critical details follow in descending order of importance. This allows readers to get the key facts even if they stop reading midway, and enables editors to trim from the bottom."
        },
        {
            "topic": "newspaper-structure",
            "difficulty": "medium",
            "competency": False,
            "question": "The 'masthead' of a newspaper refers to:",
            "options": [
                "A) The name of the newspaper displayed prominently on the front page",
                "B) The editorial page",
                "C) The classified advertisements section",
                "D) The headline of the lead story"
            ],
            "answer": "A",
            "explanation": "The masthead is the name of the newspaper (and often its logo) displayed prominently on the front page or the publisher's information box on the editorial page. It serves as the newspaper's identity and brand recognition element."
        },
        {
            "topic": "editorial",
            "difficulty": "medium",
            "competency": False,
            "question": "An editorial differs from a news report in that it:",
            "options": [
                "A) Reports only factual events",
                "B) Expresses the newspaper's opinion on an issue",
                "C) Never contains the writer's personal views",
                "D) Is always unsigned"
            ],
            "answer": "B",
            "explanation": "An editorial is a signed article expressing the newspaper's official opinion on a current issue. Unlike news reports, which strive for objectivity, editorials represent the publication's stance and aim to influence public opinion."
        },
        {
            "topic": "photojournalism",
            "difficulty": "medium",
            "competency": False,
            "question": "In photojournalism, the term 'caption' refers to:",
            "options": [
                "A) The technical details of the camera used",
                "B) The text that accompanies and explains a photograph",
                "C) The photographer's credit line",
                "D) The border around a photograph"
            ],
            "answer": "B",
            "explanation": "A caption in photojournalism is the descriptive text that accompanies a photograph. It provides context, identifies people, places, and events, and explains the significance of the image. Good captions answer who, what, where, when, and why."
        },
    ],
    "fill_blank": [
        {
            "topic": "news-definition",
            "difficulty": "easy",
            "competency": False,
            "question": "The _____ refers to the opening paragraph of a news story that summarizes the most important facts.",
            "answer": "lead (or lede)",
            "explanation": "The 'lead' (pronounced 'lede' in journalism to distinguish from printing metal) is the opening paragraph of a news story that contains the most important information - who, what, when, where, why. It must grab the reader's attention and summarize the story."
        },
        {
            "topic": "news-components",
            "difficulty": "easy",
            "competency": False,
            "question": "The five Ws and one H (Who, What, When, Where, Why, and How) are also called the _____ of news.",
            "answer": "newshole elements (or lead elements / newshole formula)",
            "explanation": "The five Ws and one H are the fundamental questions that a complete news story should answer. They form the core of the inverted pyramid structure: Who did What, When, Where, Why, and How."
        },
        {
            "topic": "journalism-definition",
            "difficulty": "easy",
            "competency": True,
            "question": "India's first newspaper 'Hicky's Bengal Gazette' was published in the year _____ from Calcutta. (Year only)",
            "answer": "1780",
            "explanation": "Hicky's Bengal Gazette, published by James Augustus Hicky in 1780 from Calcutta (now Kolkata), was India's first newspaper. It was a weekly publication that was later banned in 1782 for its critical reporting of the East India Company."
        },
        {
            "topic": "journalism",
            "difficulty": "medium",
            "competency": True,
            "question": "The Indian newspaper 'The Hindu', founded in 1878, was originally started as a _____ before becoming a daily newspaper. (Two words)",
            "answer": "weekly newspaper",
            "explanation": "The Hindu was founded on September 20, 1878, as a weekly newspaper by the Triplicane Six - a group of law students. It became a daily newspaper in 1889. It is now one of India's most respected English-language newspapers."
        },
        {
            "topic": "photojournalism",
            "difficulty": "easy",
            "competency": False,
            "question": "In photojournalism, _____ refers to the practice of not altering the content of a photograph, ensuring it represents reality truthfully.",
            "answer": "truthfulness",
            "explanation": "Truthfulness is a core ethical principle of photojournalism. Photographs must represent reality as it is, without manipulation that changes the meaning or misleads the viewer. This aligns with the broader journalistic principle of accuracy."
        },
        {
            "topic": "editorial",
            "difficulty": "easy",
            "competency": False,
            "question": "The editorial page of a newspaper typically appears on page _____ in most Indian newspapers.",
            "answer": "8 or 10 (or second-to-last page / inner page)",
            "explanation": "In most Indian newspapers (The Hindu, The Indian Express, The Times of India), the editorial page appears as the second-to-last or last inner page. It contains editorials, reader letters, opinion columns, and book reviews."
        },
    ],
    "short_answer": [
        {
            "topic": "news-definition",
            "difficulty": "easy",
            "competency": False,
            "question": "Differentiate between Hard News and Soft News with examples relevant to Indian media.",
            "answer": "Hard News: Factual, time-sensitive, urgent reporting on events of public importance. Example: 'Earthquake strikes Bhuj, Gujarat - 200+ feared dead.' Soft News: Feature-oriented, human-interest, less time-sensitive. Example: 'A day in the life of a Mumbai dabbawala.' Hard news follows the inverted pyramid; soft news follows a narrative or feature structure.",
            "explanation": "The distinction is fundamental in journalism: hard news deals with events that demand immediate reporting due to their urgency and public significance, while soft news focuses on human-interest stories, trends, and features that can be reported at any time."
        },
        {
            "topic": "news-components",
            "difficulty": "easy",
            "competency": False,
            "question": "Explain the concept of 'Attribution' in news writing and why it is essential for journalistic credibility.",
            "answer": "Attribution is the practice of identifying the source of information in a news report (e.g., 'Police Commissioner R.K. Sharma said...'). It is essential because: (1) It adds credibility by showing the information comes from a verifiable source, (2) It protects journalists from claims of fabrication, (3) It allows readers to evaluate the reliability of the source, (4) It maintains transparency in reporting.",
            "explanation": "Attribution is a cornerstone of journalistic ethics. It separates verified facts from opinion, identifies the origin of information, and enables accountability. Without attribution, news becomes unverified assertion rather than reported fact."
        },
        {
            "topic": "newspaper-structure",
            "difficulty": "medium",
            "competency": True,
            "question": "Describe the typical structure of an Indian newspaper, naming at least five key sections.",
            "answer": "A typical Indian newspaper structure: (1) Front Page: Top stories with the most important news. (2) City/Local News: Regional and local events. (3) Editorial Page: Opinions, editorials, and letters to the editor. (4) National News: Important events from across India. (5) International News: Global events. (6) Business/Finance Section: Market news, economy, stock updates. (7) Sports Section: Sports news and results. (8) Entertainment/Cinema: Films, TV, celebrity news. (9) Classifieds: Jobs, real estate, matrimonial. (10) Supplements: Sunday magazines, education supplements.",
            "explanation": "Indian newspapers follow a structured layout designed to serve diverse reader interests. Each section has a specific function, from the front page (news prioritization) to editorial pages (opinion), business sections (economic information), and classifieds (practical services)."
        },
        {
            "topic": "editorial",
            "difficulty": "medium",
            "competency": True,
            "question": "What is a 'lead article' or editorial? How does it differ from a news report? Give an example of an Indian editorial topic.",
            "answer": "A lead article (editorial) is a signed article expressing the newspaper's official opinion on a current issue. It differs from a news report in that: (1) News reports are objective and unsigned; editorials express opinion and are signed. (2) News reports inform; editorials persuade. (3) News reports use the inverted pyramid; editorials use argumentative structure. Example: An editorial in 'The Hindu' on 'The Need for Electoral Reforms in India' would argue for specific changes to the electoral system.",
            "explanation": "The editorial represents the 'conscience' of a newspaper. While news reporters aim for objectivity, the editorial board takes a position. This distinction is fundamental to understanding the dual role of newspapers as both informers and opinion-shapers."
        },
        {
            "topic": "photojournalism",
            "difficulty": "medium",
            "competency": True,
            "question": "Explain the ethical responsibilities of a photojournalist covering a natural disaster in India, citing relevant journalistic principles.",
            "answer": "A photojournalist covering an Indian natural disaster must balance: (1) Truthfulness: Photographs must accurately represent events without staging or excessive manipulation. (2) Dignity: Victims' privacy must be respected; graphic images of suffering should be used judiciously. (3) Context: Captions must provide accurate context. (4) Do No Harm: Avoid photographing vulnerable individuals (children, bereaved families) in ways that could cause further distress. (5) Attribution and Credit: Sources and photo credits must be acknowledged. The Press Council of India's guidelines provide the ethical framework.",
            "explanation": "Photojournalism ethics in India are governed by the Press Council of India guidelines and the National Press Photographers Association (NPPA) code of ethics. The core tension is between the public's right to know and the individual's right to dignity and privacy."
        },
    ],
    "long_answer": [
        {
            "topic": "journalism",
            "difficulty": "medium",
            "competency": True,
            "question": "Discuss the role and responsibilities of a journalist in a democracy, with specific reference to the Indian press. (6 marks)",
            "answer": "Role of a journalist in Indian democracy: (1) Watchdog Function: Investigate and expose corruption, abuse of power - e.g., the 2G spectrum scandal exposed by The Hindu and The Indian Express. (2) Informative Role: Provide accurate, timely, and comprehensive information to citizens - essential for informed voting. (3) Opinion Formation: Editorials and columns shape public discourse on national issues. (4) Voice of the Marginalized: Report on issues affecting Dalits, Adivasis, women, and minorities who lack media access. (5) Developmental Journalism: India's unique concept of using media for social change, rural development, and education. Challenges: Corporate ownership pressures, political interference, and economic sustainability in the digital age.",
            "explanation": "In India, journalism has played a pivotal role in the freedom struggle (through newspapers like 'Kesari') and continues as a democratic institution. The Press Council of India's Code of Ethics outlines these responsibilities, including accuracy, impartiality, and serving public interest."
        },
        {
            "topic": "photojournalism",
            "difficulty": "hard",
            "competency": False,
            "question": "Analyze the role of photojournalism in shaping public opinion during the India-Partition of 1947. How does photojournalism differ from other forms of journalism in its impact? (8 marks)",
            "answer": "Photojournalism and Partition (1947): Photographs of refugees, trains full of bodies, and displaced families created visceral awareness of the Partition tragedy - Margaret Bourke-White's photographs for LIFE magazine documented human suffering in ways words alone could not. Differences from text journalism: (1) Immediate emotional impact - photographs bypass intellectual processing and engage viewers emotionally. (2) Accessibility - images transcend language barriers. (3) Perceived objectivity - photographs are seen as 'proof' of reality (though subject to framing and selection bias). (4) Memory creation - iconic photographs become collective cultural memories. (5) Limitations: Photographs capture a moment but cannot convey context, chronology, or multiple perspectives that text can.",
            "explanation": "Photojournalism's power lies in its ability to create immediate emotional responses and lasting cultural memories. During Partition, photographs documented a human tragedy that text alone could not fully convey. However, photojournalism's limitations include its single-frame nature, selection bias, and vulnerability to digital manipulation."
        },
    ],
    "numerical": [
        {
            "topic": "newspaper-circulation",
            "difficulty": "medium",
            "competency": True,
            "question": "A newspaper in Mumbai has a circulation of 450,000 copies daily. If each copy is read by an average of 3.2 people, calculate the total readership. If readership increases by 15% next quarter, what will be the new readership?",
            "answer": "Old readership: 1,440,000; New readership: 1,656,000",
            "explanation": "Total readership = Circulation x Average readers per copy = 450,000 x 3.2 = 1,440,000. With 15% increase: 1,440,000 x 1.15 = 1,656,000. Verification: 1,656,000 / 450,000 = 3.68 readers per copy. This shows how circulation and readership differ - a key concept in media business studies."
        },
        {
            "topic": "news-timing",
            "difficulty": "easy",
            "competency": False,
            "question": "A breaking news event occurs at 2:30 PM IST. A newspaper with a 6-hour deadline must reach newsstands by 6:00 PM. How many minutes does the reporter have to write, edit, and layout the story?",
            "answer": "210 minutes (3.5 hours)",
            "explanation": "Time available = 6:00 PM - 2:30 PM = 3 hours 30 minutes = 210 minutes. This time pressure is why newsrooms follow the inverted pyramid structure - the most important information goes first so that if the story must be truncated, the essential facts are preserved."
        },
    ],
}

# Chapter 3: Radio
# Nodes: 015(News, Talk, Interviews, Announcements), 016(Documentaries, Dramas, Features, Commentary)

CH3_QBANK = {
    "mcq": [
        {
            "topic": "radio-news",
            "difficulty": "easy",
            "competency": False,
            "question": "A radio news bulletin differs from a newspaper news story in that it:",
            "options": [
                "A) Uses the inverted pyramid structure",
                "B) Is delivered through spoken words and sound, with immediate time constraints",
                "C) Can be read at the reader's own pace",
                "D) Includes only international news"
            ],
            "answer": "B",
            "explanation": "Radio news bulletins are audio-based and time-bound - they must be delivered within a specific broadcast slot (usually 5-15 minutes). The script must be conversational, use sound bites, and convey information efficiently through the spoken word and audio elements."
        },
        {
            "topic": "radio-programmes",
            "difficulty": "easy",
            "competency": True,
            "question": "Akashvani's 'Suvichar' programme, which features inspiring thoughts and stories, is best categorized as a:",
            "options": [
                "A) Radio drama",
                "B) Radio feature",
                "C) News bulletin",
                "D) Interview programme"
            ],
            "answer": "B",
            "explanation": "'Suvichar' (meaning 'good thoughts') is an All India Radio feature programme that presents inspirational content through narration, music, and sound effects. Radio features are a blend of factual reporting and creative storytelling, longer than news bulletins but shorter than dramas."
        },
        {
            "topic": "radio-interview",
            "difficulty": "medium",
            "competency": False,
            "question": "In a radio interview, the 'presenter' or 'anchor' plays the role of:",
            "options": [
                "A) Providing all the information themselves",
                "B) Facilitating the conversation by asking questions and guiding the interviewee",
                "C) Only introducing the guest and then remaining silent",
                "D) Writing the script for the interviewee"
            ],
            "answer": "B",
            "explanation": "In a radio interview, the presenter/asker facilitates the conversation by: (1) Researching the topic and interviewee, (2) Asking open-ended questions, (3) Listening actively and following up, (4) Guiding the conversation toward relevant topics, (5) Keeping within time limits."
        },
        {
            "topic": "radio-announcements",
            "difficulty": "medium",
            "competency": True,
            "question": "The difference between a 'commercial announcement' and a 'public service announcement' (PSA) on radio in India is primarily:",
            "options": [
                "A) The length of the message",
                "B) Commercial announcements promote products/services for profit; PSAs promote social welfare messages free of cost",
                "C) The time of broadcast",
                "D) The language used"
            ],
            "answer": "B",
            "explanation": "Commercial announcements (advertisements) are paid messages promoting products, services, or brands for commercial gain. Public Service Announcements (PSAs) are messages in the public interest - like health campaigns, voter awareness, or road safety - broadcast free by radio stations as a public service obligation."
        },
        {
            "topic": "radio-documentary",
            "difficulty": "medium",
            "competency": False,
            "question": "A radio documentary is best described as:",
            "options": [
                "A) A scripted drama with actors",
                "B) A non-fictional audio program using actuality sound, interviews, and narration to explore a topic in depth",
                "C) A collection of songs played back-to-back",
                "D) A live news report from the scene"
            ],
            "answer": "B",
            "explanation": "A radio documentary is a non-fictional audio program that uses actuality sound (real recordings from the scene), interviews, narration, music, and sound effects to explore a topic in depth. It combines journalistic accuracy with audio storytelling techniques."
        },
        {
            "topic": "radio-drama",
            "difficulty": "medium",
            "competency": True,
            "question": "All India Radio's 'Hawa Mahal' programme, which broadcast radio plays from the 1950s-80s, demonstrated radio's unique strength as a medium of:",
            "options": [
                "A) Pure information delivery",
                "B) Audio imagination - the 'theatre of the mind'",
                "C) Music broadcasting only",
                "D) Political propaganda"
            ],
            "answer": "B",
            "explanation": "Radio drama harnesses the unique power of 'audio imagination' - the 'theatre of the mind' where listeners create mental images from sound, dialogue, and music. Hawa Mahal made All India Radio a pioneer of radio drama in India, proving radio's artistic potential beyond news and information."
        },
    ],
    "fill_blank": [
        {
            "topic": "radio-news",
            "difficulty": "easy",
            "competency": False,
            "question": "A radio news script must be written in a _____ style, as it will be read aloud to the audience. (Adjective)",
            "answer": "conversational",
            "explanation": "Radio news scripts are written in a conversational style because they will be spoken aloud by an announcer. This means shorter sentences, simpler words, and a natural flow - unlike newspaper text, which is designed for reading."
        },
        {
            "topic": "radio-feature",
            "difficulty": "easy",
            "competency": False,
            "question": "A radio _____ is a longer, more creative programme than a news bulletin, often using music, sound effects, and narration to tell a story. (Word)",
            "answer": "feature",
            "explanation": "A radio feature is a longer, more creative programme than a news bulletin. It uses music, sound effects, narration, and interviews to explore a topic in depth, blending journalistic accuracy with audio storytelling art."
        },
        {
            "topic": "radio-interview",
            "difficulty": "easy",
            "competency": True,
            "question": "In India, _____ was India's first Prime Minister to be interviewed on radio by All India Radio. (Full name)",
            "answer": "Jawaharlal Nehru",
            "explanation": "Jawaharlal Nehru gave the first-ever radio interview by an Indian Prime Minister to All India Radio. His 'Letters from a Father to His Daughter' were also broadcast on radio, demonstrating the medium's use for educational and inspirational content."
        },
        {
            "topic": "radio-commentary",
            "difficulty": "medium",
            "competency": False,
            "question": "Radio _____ involves a presenter describing and analyzing an event as it happens, typically used for sports or live events. (Word)",
            "answer": "commentary",
            "explanation": "Radio commentary is a live or recorded spoken description of an event (most commonly sports) by a commentator. It combines factual reporting with analysis and opinion, requiring the commentator to describe visual events through audio description for listeners who cannot see the action."
        },
    ],
    "short_answer": [
        {
            "topic": "radio-news",
            "difficulty": "easy",
            "competency": False,
            "question": "What are the key features of a radio news bulletin script? List any four.",
            "answer": "(1) Conversational language suitable for listening, not reading. (2) Short sentences and simple words. (3) Time-constrained content (typically 5-15 minutes). (4) Use of actuality sound (on-location recordings). (5) Attention-grabbing opening. (6) Clear, measured pace for delivery. (7) Identification of the source of information. (8) Brief, focused stories within the bulletin.",
            "explanation": "A radio news bulletin script is specifically designed for the audio medium. Unlike print, it must account for listening time, spoken delivery pace, audio elements, and the listener's inability to re-read or skip ahead."
        },
        {
            "topic": "radio-programmes",
            "difficulty": "medium",
            "competency": True,
            "question": "How does a radio talk show differ from a radio interview? Illustrate with an example of an Indian radio programme.",
            "answer": "A radio talk show differs from an interview in: (1) Format: Talk shows often have a host and multiple guests discussing a topic; interviews are typically one-on-one. (2) Duration: Talk shows are longer (30-60 mins); interviews are shorter. (3) Interaction: Talk shows encourage debate and audience call-ins; interviews are more structured Q&A. (4) Topics: Talk shows explore broader themes; interviews focus on a specific person's views. Example: AIR's 'Morning Show' is a talk show with multiple callers, while 'Perspective' features one-on-one expert interviews.",
            "explanation": "Understanding the format differences between talk shows and interviews is essential for radio programming. Talk shows create a public forum for discussion, while interviews provide in-depth exploration of individual perspectives."
        },
        {
            "topic": "radio-announcements",
            "difficulty": "easy",
            "competency": True,
            "question": "Differentiate between a commercial announcement and a public service announcement (PSA) on Indian radio, citing one example of each.",
            "answer": "Commercial Announcement (Ad): Paid message promoting products/services for profit. Example: A 30-second spot for a new mobile phone brand on Radio Mirchi. PSA: Free public interest message promoting social welfare. Example: A monsoon health advisory on AIR about preventing water-borne diseases. Key differences: (1) Purpose - profit vs. public good, (2) Cost - paid vs. free airtime, (3) Sponsor - brand vs. government/NGO, (4) Regulation - governed by ASCI code for ads; PSAs follow AIR's public service guidelines.",
            "explanation": "In the Indian radio context, commercial announcements are regulated by the Advertising Standards Council of India (ASCI) code, while PSAs serve the station's public service obligations. Both require effective audio scripting but serve fundamentally different purposes."
        },
        {
            "topic": "radio-drama",
            "difficulty": "medium",
            "competency": False,
            "question": "Explain the concept of 'theatre of the mind' in radio drama. How does radio create vivid imagery without visuals?",
            "answer": "'Theatre of the mind' refers to radio's unique ability to create vivid mental images through sound alone. Radio drama creates imagery through: (1) Dialogue and character voices - different accents, tones, and speech patterns establish characters. (2) Sound effects - footsteps, doors closing, weather sounds establish setting. (3) Music - background score sets mood and emotional tone. (4) Narration - guides listeners through spatial and temporal transitions. (5) Silence - strategic pauses create tension. (6) The listener's own imagination fills in visual details.",
            "explanation": "Radio drama is one of the most artistic radio formats precisely because it demands active listener participation. Unlike television, which shows everything, radio invites the listener to co-create the visual experience using their imagination guided by audio cues."
        },
        {
            "topic": "radio-scripting",
            "difficulty": "medium",
            "competency": False,
            "question": "Describe the structure of a typical radio talk show script, including the roles of the anchor and callers.",
            "answer": "A radio talk show script structure: (1) Opening (30 sec): Theme music, anchor introduction of topic and guest(s). (2) Introduction (2 min): Anchor introduces the day's topic and its significance. (3) Guest Presentation (5 min): Brief intro of guest and their credentials. (4) Discussion (20-30 min): Anchor asks open-ended questions, guests respond, debate ensues. (5) Caller Segment (10-15 min): Anchor takes calls from listeners, moderates discussion. (6) Wrap-up (2 min): Anchor summarizes key points, thanks guests and callers. (7) Closing (30 sec): Music and sign-off.",
            "explanation": "A well-structured talk show script balances prepared content with spontaneity. The anchor must have a clear question flow prepared while remaining flexible to follow interesting tangents from guests and callers."
        },
    ],
    "long_answer": [
        {
            "topic": "radio-programmes",
            "difficulty": "medium",
            "competency": True,
            "question": "Explain how different types of radio programmes serve different audience needs in India. Use examples from All India Radio and private FM. (6 marks)",
            "answer": "Different radio programmes serve diverse audience needs: (1) News Bulletins: Provide timely information - AIR's 'News at 9' serves the information need. (2) Talk Shows: Enable discussion and debate - 'Big FM's 'Suhaana Safar' engages listeners on travel and culture. (3) Interviews: Provide expert perspectives - AIR's 'Vividh Bharati' interviews with artists. (4) Announcements (PSA): Serve community needs - monsoon health advisories, COVID-19 awareness. (5) Radio Dramas: Provide entertainment and cultural education - 'Hawa Mahal' on AIR. (6) Radio Features: Provide in-depth exploration - 'Spotlight' on social issues. (7) Music Programmes: Entertainment and emotional well-being - private FM's playlist-based shows. Each format targets different demographics, contexts, and needs - from morning commuters to rural women farmers.",
            "explanation": "Radio's versatility as a medium allows it to serve multiple audience needs simultaneously. In India, with high mobile penetration and low literacy in rural areas, radio remains a crucial medium for information, education, and entertainment across diverse socio-economic groups."
        },
        {
            "topic": "radio-scripting",
            "difficulty": "hard",
            "competency": False,
            "question": "Write detailed notes on the scripting approaches for (a) a radio documentary, and (b) a radio drama. Compare their approaches to storytelling. (8 marks)",
            "answer": "(a) Radio Documentary Scripting: Uses non-fiction storytelling - actuality recordings, real interviews, factual narration. Script structure: Opening hook (sound + narration) → Context setting → Interviews with subjects → Supporting actuality → Analysis and perspective → Conclusion. Style: Journalistic, objective, with clear sourcing. Example: A documentary on water conservation in Rajasthan. (b) Radio Drama Scripting: Uses fictional storytelling with actors, scripted dialogue, sound effects, and music. Script structure: Scene headings → Character dialogue → Sound effects notation → Music cues. Style: Creative, emotive, uses dramatic arcs. Example: A radio adaptation of Premchand's story. Comparison: Documentary uses fact and real voices; drama uses fiction and acted voices. Both use sound creatively but documentary prioritizes truth while drama prioritizes emotional impact.",
            "explanation": "The scripting approaches for radio documentary and radio drama reflect their fundamentally different purposes - one seeks to document reality, the other to create fictional worlds. Both, however, rely entirely on audio elements to engage the listener's imagination."
        },
    ],
    "numerical": [
        {
            "topic": "radio-reach",
            "difficulty": "medium",
            "competency": True,
            "question": "A community radio station broadcasts to a rural district with 80 villages. If each village has an average of 1,200 households and 65% of households regularly listen, calculate: (i) Total reachable households, (ii) Regular listening households, (iii) If the station adds 12 more villages with 900 households each (60% listening rate), what is the new total regular listenership?",
            "answer": "(i) 96,000 households, (ii) 62,400 households, (iii) 67,840 households",
            "explanation": "(i) Total = 80 x 1,200 = 96,000. (ii) Regular = 96,000 x 0.65 = 62,400. (iii) New villages: 12 x 900 = 10,800 households, 60% = 6,480. Total regular = 62,400 + 6,480 = 68,880. This exercise demonstrates audience reach calculations critical for media planning."
        },
    ],
}

# Chapter 4: Television
# Nodes: 017(TV Basics), 018(Programme Genres), 019(News & Current Affairs), 020(Soaps & Reality TV),
#        021(Films), 022(Documentaries), 023(Children's Programmes), 024(Educational TV)


# return {"status": "ok", "note": "truncated"}
