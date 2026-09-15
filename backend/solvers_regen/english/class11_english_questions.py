"""
CISCE Class 11 English — Deterministic Question Generator
Syllabus Coverage:
  Grammar: Tenses, Active/Passive Voice, Direct/Indirect Speech,
           Clauses, Prepositions, Determiners, Subject-Verb Agreement,
           Transformation, Figures of Speech
  Writing Skills: Notice, Email, Article, Report, Diary Entry,
                  Letter Writing (Formal/Informal), Story Writing
  Reading Comprehension: Unseen Passages, Inference, Vocabulary
  Literature: Prose Analysis, Poetry Analysis, Drama Elements
"""

import random
import re
from typing import List, Dict, Any, Optional

# ═══════════════════════════════════════════════════════════════
#  DATA POOLS
# ═══════════════════════════════════════════════════════════════

INDIAN_NAMES = [
    "Rahul Sharma", "Priya Patel", "Aarav Singh", "Anaya Reddy",
    "Vihaan Joshi", "Diya Kapoor", "Ishaan Nair", "Kavya Iyer",
    "Arjun Mehta", "Saanvi Gupta", "Aditya Rao", "Meera Das",
    "Rohan Kumar", "Nisha Bhatt", "Kabir Malhotra", "Isha Verma",
    "Dev Chatterjee", "Riya Pillai", "Karan Saxena", "Simran Kaur",
]

INDIAN_FIRST = [
    "Rahul", "Priya", "Aarav", "Anaya", "Vihaan", "Diya",
    "Ishaan", "Kavya", "Arjun", "Saanvi", "Aditya", "Meera",
    "Rohan", "Nisha", "Kabir", "Isha", "Dev", "Riya",
    "Karan", "Simran", "Yash", "Pooja", "Rishi", "Tanya",
]

INDIAN_CITIES = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
    "Hyderabad", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
    "Kochi", "Chandigarh", "Indore", "Nagpur", "Surat",
    "Varanasi", "Goa", "Shimla", "Udaipur", "Bhopal",
]

INDIAN_STATES = [
    "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "West Bengal",
    "Telangana", "Gujarat", "Rajasthan", "Uttar Pradesh", "Kerala",
    "Punjab", "Haryana", "Madhya Pradesh", "Himachal Pradesh",
]

INDIAN_SCHOOLS = [
    "Delhi Public School", "St. Xavier's High School",
    "Kendriya Vidyalaya", "DAV Public School",
    "Ryan International School", "Modern School",
    "Saraswati Vidyalaya", "Carmel Convent School",
]

INDIAN_EVENTS = [
    "Independence Day celebration", "Diwali festival",
    "Holi celebration", "Republic Day parade",
    "Annual Sports Day", "Science Exhibition",
    "Inter-house debate competition", "Annual Cultural Fest",
    "Cleanliness Drive", "Tree Plantation Drive",
    "Book Fair", "Youth Festival",
    "Yoga Day", "Literary Week",
]

INDIAN_ISSUES = [
    "water conservation", "air pollution", "plastic waste management",
    "road safety", "digital literacy for the elderly",
    "women's safety in public transport", "swachh bharat abhiyan",
    "organic farming", "renewable energy awareness",
    "mental health awareness among students",
]

INDIAN_FESTIVALS = [
    "Diwali", "Holi", "Dussehra", "Eid", "Christmas",
    "Ganesh Chaturthi", "Durga Puja", "Onam", "Pongal",
    "Baisakhi", "Navratri", "Janmashtami",
]

INDIAN_FOODS = [
    "biryani", "dosa", "chole bhature", "pav bhaji",
    "idli sambar", "rogan josh", "dhokla", "poha",
    "dal makhani", "masala dosa",
]

# ─── Grammar Data ───

TENSE_VERBS = [
    ("walk", "walks", "walked", "walked", "walk"),
    ("play", "plays", "played", "played", "play"),
    ("study", "studies", "studied", "studied", "study"),
    ("eat", "eats", "ate", "eaten", "eat"),
    ("write", "writes", "wrote", "written", "write"),
    ("read", "reads", "read", "read", "read"),
    ("speak", "speaks", "spoke", "spoken", "speak"),
    ("go", "goes", "went", "gone", "go"),
    ("see", "sees", "saw", "seen", "see"),
    ("take", "takes", "took", "taken", "take"),
    ("give", "gives", "gave", "given", "give"),
    ("come", "comes", "came", "come", "come"),
]

TENSE_TEMPLATES = {
    "Present_Simple": [
        "She {verb}s to school every day.",
        "The sun {verb}s in the east.",
        "They {verb} cricket on Sundays.",
    ],
    "Present_Continuous": [
        "She {verb}s English right now.",
        "They {verb} for the exam at the moment.",
    ],
    "Present_Perfect": [
        "She has {verb}ed the letter already.",
        "They have {verb}ed the project.",
    ],
    "Present_Perfect_Continuous": [
        "She has been {verb}ing since morning.",
        "They have been {verb}ing for two hours.",
    ],
    "Past_Simple": [
        "She {p2} the letter yesterday.",
        "They {p2} the match last week.",
    ],
    "Past_Continuous": [
        "She was {verb}ing when the phone rang.",
        "They were {verb}ing at 8 PM.",
    ],
    "Past_Perfect": [
        "She had {p3} the letter before he called.",
        "They had {p3} the work before the deadline.",
    ],
    "Past_Perfect_Continuous": [
        "She had been {verb}ing for hours before she rested.",
        "They had been {verb}ing since dawn.",
    ],
    "Future_Simple": [
        "She will {verb} the song tomorrow.",
        "They will {verb} the project next week.",
    ],
    "Future_Continuous": [
        "She will be {verb}ing at 10 AM.",
        "They will be {verb}ing this time tomorrow.",
    ],
    "Future_Perfect": [
        "She will have {p3} the work by then.",
        "They will have {p3} the exam by next month.",
    ],
    "Future_Perfect_Continuous": [
        "She will have been {verb}ing for two hours.",
        "They will have been {verb}ing since morning.",
    ],
}

ACTIVE_SENTENCES = [
    ("The teacher teaches the students.", "The students are taught by the teacher."),
    ("The chef cooks delicious meals.", "Delicious meals are cooked by the chef."),
    ("The gardener waters the plants daily.", "The plants are watered daily by the gardener."),
    ("Rahul wrote the letter.", "The letter was written by Rahul."),
    ("The committee will announce the results.", "The results will be announced by the committee."),
    ("She is painting a beautiful picture.", "A beautiful picture is being painted by her."),
    ("The sculptor created a masterpiece.", "A masterpiece was created by the sculptor."),
    ("The team won the championship.", "The championship was won by the team."),
    ("The journalist wrote an article.", "An article was written by the journalist."),
    ("The scientist discovered a new element.", "A new element was discovered by the scientist."),
]

REPORTED_TEMPLATES = [
    ("He said, 'I am coming tomorrow.'", "He said that he was coming the next day.", "Present to Past, 'tomorrow' to 'the next day'"),
    ("She said, 'I have finished my homework.'", "She said that she had finished her homework.", "Present Perfect to Past Perfect"),
    ("The teacher said, 'The earth revolves around the sun.'", "The teacher said that the earth revolves around the sun.", "Universal truth - no change"),
    ("He said to me, 'Where do you live?'", "He asked me where I lived.", "Question -> asked, Present to Past"),
    ("She said, 'What a beautiful flower!'", "She exclaimed that it was a very beautiful flower.", "Exclamatory -> exclaimed that"),
    ("Rahul said, 'I will call you tonight.'", "Rahul said that he would call me that night.", "Future will -> would, tonight -> that night"),
    ("The captain said, 'Bravo! Well done, team.'", "The captain applauded them, saying well done.", "Appreciation -> applauded"),
    ("She said, 'Let us go for a walk.'", "She suggested that they should go for a walk.", "Let us -> suggested that they should"),
    ("The old man said, 'May you live long!'", "The old man blessed me that I might live long.", "Wish/Blessing -> blessed"),
    ("He said, 'Alas! I have lost my keys.'", "He exclaimed sorrowfully that he had lost his keys.", "Sorrow -> exclaimed sorrowfully"),
]

CLAUSE_SENTENCES = [
    ("I know that she is honest.", "Noun clause"),
    ("She is the girl who won the prize.", "Adjective/Relative clause"),
    ("He ran fast so that he could catch the bus.", "Adverb clause of purpose"),
    ("Though it rained, they played.", "Adverb clause of concession"),
    ("You may leave when you like.", "Adverb clause of time"),
    ("I will wait here until you return.", "Adverb clause of time"),
    ("The fact that he came late annoyed me.", "Noun clause (subject)"),
    ("What he said was true.", "Noun clause"),
    ("This is the place where we first met.", "Adjective clause"),
    ("If you study hard, you will pass.", "Adverb clause of condition"),
]

PREPOSITION_PAIRS = [
    ("depend", "on"), ("belong", "to"), ("agree", "with"),
    ("apologize", "for"), ("apply", "for"), ("consist", "of"),
    ("look", "after"), ("listen", "to"), ("believe", "in"),
    ("think", "about"), ("dream", "of"), ("wait", "for"),
    ("care", "for"), ("call", "at"), ("laugh", "at"),
    ("differ", "from"), ("suffer", "from"), ("prevent", "from"),
]

PREPOSITION_NOUN = [
    ("arrival", "at the station"), ("confidence", "in himself"),
    ("interest", "in music"), ("solution", "to the problem"),
    ("remedy", "for the disease"), ("reason", "for his absence"),
    ("gift", "for Priya"), ("respect", "for elders"),
    ("sympathy", "with the poor"), ("pride", "in his son"),
]

DETERMINER_SENTENCES = [
    ("___ apple a day keeps the doctor away.", "An"),
    ("I have ___ idea.", "an"),
    ("___ Ganges is a sacred river.", "The"),
    ("He is ___ honest man.", "an"),
    ("She is ___ best student in class.", "the"),
    ("I need ___ information about the event.", "some"),
    ("___ few people attended the meeting.", "A"),
    ("He is taller than ___ other boy.", "any"),
    ("I visited ___ Taj Mahal last year.", "the"),
    ("She is ___ university student.", "a"),
]

SV_AGREEMENT_SENTENCES = [
    ("The list of items ___ on the table.", "is"),
    ("The students along with their teacher ___ going.", "are"),
    ("Each of the boys ___ received a prize.", "has"),
    ("Neither the teacher nor the students ___ present.", "were"),
    ("Bread and butter ___ my breakfast.", "is"),
    ("The police ___ investigating the case.", "are"),
    ("Either Ramesh or his brothers ___ responsible.", "are"),
    ("Five kilometres ___ a long distance.", "is"),
    ("The jury ___ divided in its opinion.", "is"),
    ("Ten dollars ___ too much for this book.", "is"),
]

FIGURES_OF_SPEECH = [
    ("The wind whispered through the trees.", "Personification", "Giving human qualities to non-human things"),
    ("He is as brave as a lion.", "Simile", "Comparison using 'as' or 'like'"),
    ("She is a rose among thorns.", "Metaphor", "Direct comparison without 'as' or 'like'"),
    ("Oh! What a beautiful sight!", "Apostrophe/Exclamation", "Addressing an absent person or expressing strong emotion"),
    ("The waves danced on the shore.", "Personification", "The waves are given the human quality of dancing"),
    ("He has a heart of stone.", "Metaphor", "Comparing heart to stone directly"),
    ("She sells sea-shells on the sea-shore.", "Alliteration", "Repetition of the same consonant sound"),
    ("The thunder grumbled in the distance.", "Personification", "Thunder given the human action of grumbling"),
    ("Life is a journey with many twists.", "Metaphor", "Comparing life to a journey"),
    ("Murmuring of innumerable bees.", "Onomatopoeia", "Words that imitate natural sounds"),
    ("Slow and steady wins the race.", "Proverb", "A short traditional saying expressing a truth"),
    ("The camel is the ship of the desert.", "Metaphor", "Comparing camel to ship"),
    ("Flattery is like cologne. Enjoy it, but do not swallow it.", "Simile", "Comparison using 'like'"),
]

TRANSFORMATION_TEMPLATES = [
    ("She said, 'Please help me.'", "She politely requested to be helped."),
    ("He exclaimed, 'What a beautiful house!'", "He exclaimed that it was a very beautiful house."),
    ("She said, 'Do not tease the animals.'", "She advised not to tease the animals."),
    ("He said, 'Let us wait here.'", "He suggested that they should wait there."),
    ("She said, 'May you succeed!'", "She wished that I might succeed."),
    ("The teacher said, 'Work hard and you will pass.'", "The teacher said that if one worked hard, one would pass."),
    ("She said, 'What a terrible mistake!'", "She regretted that it was a terrible mistake."),
    ("He said, 'Bring me a glass of water.'", "He ordered me to bring him a glass of water."),
]

# ─── Writing Data ───

NOTICE_FORMAT = "NOTICE\nDate: {date}\nHeading: {heading}\nBody: {body}\nSignature: {name}\nDesignation: {designation}"

EMAIL_TEMPLATES = {
    "leave": "Subject: Leave Application\n\nRespected {recipient},\n\nI am writing to inform you that I will be unable to attend school from {start_date} to {end_date} due to {reason}. I have asked {friend} to share notes with me. I request you to kindly grant me leave.\n\nThanking you,\nYours sincerely,\n{name}\nClass: {class_num}",
    "event": "Subject: Invitation to {event}\n\nRespected Sir/Madam,\n\nWe are pleased to inform you about {event} organized by our school on {date}. We request you to grace the occasion as our chief guest.\n\nWe look forward to your presence.\n\nYours faithfully,\n{name}\nHead Student Council",
}

ARTICLE_TOPICS = [
    "The Importance of Reading Books in the Digital Age",
    "Why Every Student Should Learn a Second Language",
    "The Impact of Social Media on Teenagers",
    "Benefits of Yoga and Meditation for Students",
    "The Role of Youth in Nation Building",
    "Why We Should Protect Our Environment",
    "The Value of Discipline in Student Life",
    "How Sports Shape Character and Build Teamwork",
]

REPORT_TEMPLATES = [
    "Annual Sports Day of {school} was held on {date} at the school ground. Chief Guest {guest} addressed the students. {winner} won the championship. The event was a grand success.",
    "A cleanliness drive was organized by {school} on {date} in {area}. Students from classes XI and XII participated enthusiastically. The drive covered a radius of 2 km.",
    "The Inter-School Debate Competition was held at {school}. {winner} of {school2} was declared the winner. The topic was '{topic}'.",
]

LETTER_FORMATS = {
    "formal": "{address}\n{date}\n\nThe {recipient_title}\n{recipient_org}\n{recipient_city}\n\nSubject: {subject}\n\nRespected Sir/Madam,\n\n{body}\n\nI hope you will consider my request favorably.\n\nYours faithfully,\n{name}\n{class_info}",
    "informal": "{address}\n{date}\n\nDear {recipient_name},\n\n{body}\n\nTake care and write back soon.\n\nYours affectionately,\n{name}",
}

DIARY_PROMPTS = [
    "Describe your experience of visiting the {place} with your family.",
    "Write about the most memorable day of your life so far.",
    "Reflect on what you learned from a recent school event.",
    "Describe your feelings before and after your board exams.",
    "Write about a festival celebration that was special to you.",
]

STORY_PROMPTS = [
    "Write a story that begins: 'It was a dark and stormy night when...'",
    "Write a story about a student who discovers an old diary in the school library.",
    "Write a story about a journey from {city1} to {city2} that changes a person's outlook.",
    "Write a story about two friends who learn an important lesson about trust.",
    "Write a story about an unexpected encounter that leads to a new friendship.",
]

# ─── Comprehension Data ───

PASSAGE_TEMPLATES = [
    """The small town of {place} was known for its rich cultural heritage. Every year, during the festival of {festival}, the streets came alive with music, dance, and laughter. {name}, a young student from {school}, had always looked forward to this event. This year, however, things were different. A new initiative by the local municipality aimed at making the festival more eco-friendly had stirred mixed reactions among the residents. While some appreciated the move, others felt it took away from the traditional charm. {name} decided to write an article for the school magazine, expressing both sides of the debate and suggesting a middle path that respected tradition while embracing change.""",
    """In the heart of {city}, nestled between modern skyscrapers, lies an old library that has served the community for over fifty years. {name}, an avid reader and student of {school}, spends every weekend there. The library, with its creaking wooden shelves and the comforting smell of old books, is a sanctuary for those who seek knowledge beyond textbooks. However, with the rise of digital media, fewer students visit the library. The librarian, Mr. {surname}, has started a new reading club to attract young readers. He believes that while technology is useful, nothing can replace the experience of holding a physical book.""",
    """The {issue} campaign launched by the government has sparked a nationwide movement. Students from {school} in {city} have taken the lead in their locality. Under the guidance of their teacher Ms. {surname}, they conduct weekly awareness sessions. {name}, the team leader, explains, 'Change starts with awareness. We visit every house in our colony and explain why {issue} matters.' The students have also started a small garden in the school premises as a practical demonstration of their commitment.""",
]

COMPREHENSION_QUESTIONS = [
    "What is the main theme of the passage?",
    "Why did {name} decide to write an article?",
    "What challenge is described in the passage?",
    "What solution does the passage suggest?",
    "How does the author feel about the situation?",
    "What can we learn from the passage?",
    "Why is the old library important to the community?",
    "What steps are being taken to address the issue?",
]

# ─── Literature Data ───

PROSE_THEMES = [
    "The conflict between tradition and modernity",
    "The importance of human relationships",
    "The impact of social inequality",
    "The journey of self-discovery",
    "The clash between individual dreams and societal expectations",
    "The role of nature in human life",
    "The consequences of greed and ambition",
    "The value of simplicity and contentment",
]

POETIC_DEVICES = [
    ("The world is too much with us; late and soon, Getting and spending, we lay waste our powers.", "Alliteration", "Repetition of 'w' in 'world', 'with', 'waste'"),
    ("I wandered lonely as a cloud That floats on high o'er vales and hills.", "Simile", "The poet compares himself to a cloud"),
    ("The fog comes on little cat feet.", "Metaphor", "Fog is compared to a cat without 'like' or 'as'"),
    ("Once upon a midnight dreary, while I pondered, weak and weary, Over many a quaint and curious volume of forgotten lore.", "Alliteration", "Repetition of 'w' sound"),
    ("The woods are lovely, dark and deep, But I have promises to keep, And miles to go before I sleep.", "Metaphor", "'Miles to go' represents life's journey"),
    ("She walks in beauty, like the night Of cloudless climes and starry skies.", "Simile", "Comparing her beauty to the starry night"),
    ("O my Luve is like a red, red rose That is newly sprung in June.", "Simile", "Comparing love to a rose"),
    ("Tyger Tyger, burning bright, In the forests of the night.", "Alliteration", "Repetition of 't' and 'b' sounds"),
    ("He clasps the crag with crooked hands; Close to the sun in lonely lands.", "Personification", "The eagle has 'hands' - human feature"),
    ("Because I could not stop for Death, He kindly stopped for me.", "Personification", "Death is given human qualities of kindness"),
]

DRAMA_ELEMENTS = [
    "Dialogue reveals character motivation",
    "Stage directions provide context",
    "Conflict drives the plot forward",
    "Soliloquy reveals inner thoughts",
    "Dramatic irony creates tension",
    "The protagonist faces a moral dilemma",
    "The setting reflects the theme",
    "Rising action builds toward climax",
]

PROSE_AUTHORS_CL11 = [
    "Rabindranath Tagore", "R.K. Narayan", "Khushwant Singh",
    "Arup Kumar Dutta", "Vikram Seth", "Premchand",
    "Mulk Raj Anand", "Katherine Mansfield", "O. Henry",
]

# ═══════════════════════════════════════════════════════════════
#  HELPER FUNCTIONS
# ═══════════════════════════════════════════════════════════════

def _uid(topic: str, index: int) -> str:
    return f"cls11_eng_{topic[:8]}_{index:03d}"


def _rbool(rng: random.Random) -> bool:
    return rng.choice([True, False])


def _rchoice(rng: random.Random, items: list):
    return rng.choice(items)


def _rchoices(rng: random.Random, items: list, k: int) -> list:
    return rng.sample(items, min(k, len(items)))


def _bloom_for_difficulty(difficulty: str) -> str:
    mapping = {
        "easy": "Remember",
        "medium": "Understand",
        "hard": "Apply",
    }
    return mapping.get(difficulty, "Understand")


def _make_mcq(
    uid: str, topic: str, question: str, correct: str,
    distractors: list, difficulty: str, explanation: str,
    competency_type: str, marks: int, steps: list = None
) -> Dict[str, Any]:
    if steps is None:
        steps = ["Identify the rule or concept being tested.", "Apply the rule to the given context.", "Select the option that matches the correct answer."]
    options = [correct] + distractors
    rng_local = random.Random(hash(uid) % (2**31))
    rng_local.shuffle(options)
    correct_letter = "ABCD"[options.index(correct)]
    return {
        "id": uid,
        "type": "mcq",
        "topic": topic,
        "question_text": question,
        "options": [f"{letter}) {opt}" for letter, opt in zip("ABCD", options)],
        "answer": f"{correct_letter}) {correct}",
        "steps": steps,
        "explanation": explanation,
        "difficulty": difficulty,
        "bloom_level": _bloom_for_difficulty(difficulty),
        "competency_type": competency_type,
        "marks": marks,
    }


def _make_fill(
    uid: str, topic: str, question: str, answer: str,
    difficulty: str, explanation: str, competency_type: str,
    marks: int, steps: list = None
) -> Dict[str, Any]:
    if steps is None:
        steps = ["Analyze the context of the sentence.", "Identify the grammatical requirement.", "Provide the correct word or form."]
    return {
        "id": uid,
        "type": "fill_blank",
        "topic": topic,
        "question_text": question,
        "options": None,
        "answer": answer,
        "steps": steps,
        "explanation": explanation,
        "difficulty": difficulty,
        "bloom_level": _bloom_for_difficulty(difficulty),
        "competency_type": competency_type,
        "marks": marks,
    }


def _make_sa(
    uid: str, topic: str, question: str, answer: str,
    difficulty: str, explanation: str, competency_type: str,
    marks: int, steps: list = None
) -> Dict[str, Any]:
    if steps is None:
        steps = ["Understand what the question asks.", "Recall relevant rules or concepts.", "Formulate a clear and concise answer."]
    return {
        "id": uid,
        "type": "short_answer",
        "topic": topic,
        "question_text": question,
        "options": None,
        "answer": answer,
        "steps": steps,
        "explanation": explanation,
        "difficulty": difficulty,
        "bloom_level": _bloom_for_difficulty(difficulty),
        "competency_type": competency_type,
        "marks": marks,
    }


def _make_la(
    uid: str, topic: str, question: str, answer: str,
    difficulty: str, explanation: str, competency_type: str,
    marks: int, steps: list = None
) -> Dict[str, Any]:
    if steps is None:
        steps = [
            "Analyze the question and identify the key requirements.",
            "Plan the structure of your response.",
            "Develop ideas with examples and evidence.",
            "Conclude with a clear summary.",
        ]
    return {
        "id": uid,
        "type": "long_answer",
        "topic": topic,
        "question_text": question,
        "options": None,
        "answer": answer,
        "steps": steps,
        "explanation": explanation,
        "difficulty": difficulty,
        "bloom_level": "Analyze",
        "competency_type": competency_type,
        "marks": marks,
    }


# ═══════════════════════════════════════════════════════════════
#  GRAMMAR GENERATORS
# ═══════════════════════════════════════════════════════════════

def _gen_tenses(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    tense_name, s1, s2, s3, s4 = rng.choice(TENSE_VERBS)
    template_key = rng.choice(list(TENSE_TEMPLATES.keys()))
    template = rng.choice(TENSE_TEMPLATES[template_key])
    filled = template.replace("{verb}", s1).replace("{p2}", s2).replace("{p3}", s3)
    q_num = idx % 12
    tense_display = template_key.replace("_", " ")
    if competency == "standard":
        question = f"Identify the tense used in the following sentence:\n\"{filled}\""
        answer = f"The tense used is {tense_display}."
        explanation = (
            f"In the sentence '{filled}', the verb form '{s1 if 'ing' not in filled else 'being/been'}' "
            f"indicates that the action is taking place in the {tense_display.split()[0]} "
            f"with the aspect of {tense_display.split()[1] if len(tense_display.split()) > 1 else 'simple'}."
        )
        difficulty = "easy"
        marks = 1
        q_type = "mcq"
        options_vals = [tense_display]
        all_tenses = [
            "Past Simple", "Past Continuous", "Past Perfect",
            "Present Simple", "Present Continuous", "Present Perfect",
            "Future Simple", "Future Continuous", "Future Perfect",
        ]
        for t in all_tenses:
            if t != tense_display:
                options_vals.append(t)
        options_vals = options_vals[:4]
        distractors = [v for v in options_vals if v != tense_display]
        return _make_mcq(
            _uid("tenses", idx), "tenses", question, tense_display,
            distractors, difficulty, explanation, competency, marks,
            steps=[
                f"Step 1: Identify the main verb in the sentence: '{s1}'.",
                "Step 2: Look at the helping verb (if any) and the time reference.",
                f"Step 3: Match the verb form with the tense pattern for {tense_display}.",
                f"Step 4: Confirm that the tense is {tense_display}.",
            ]
        )
    else:
        name = rng.choice(INDIAN_FIRST)
        school = rng.choice(INDIAN_SCHOOLS)
        question = (
            f"{name}, a student of {school}, is maintaining a daily journal. "
            f"Below are four entries from the journal. Identify the tense used "
            f"in each entry and explain why that tense is appropriate for the context:\n\n"
            f"(a) 'Every morning, I {s1} to school by bus.'\n"
            f"(b) 'At this moment, I {s1} my Mathematics homework.'\n"
            f"(c) 'I {s3} my project before the submission date.'\n"
            f"(d) 'Next month, I will {s1} for the entrance exam.'\n\n"
            f"Analyze each sentence and state the tense with a brief reason."
        )
        answer = (
            f"(a) Present Simple — used for habitual actions.\n"
            f"(b) Present Continuous — used for actions happening now.\n"
            f"(c) Past Perfect — used for actions completed before another past action.\n"
            f"(d) Future Simple — used for actions that will happen in the future."
        )
        explanation = (
            "This competency-based question requires multi-step analysis. "
            "Each sentence requires identifying the tense based on the verb form "
            "and the time context. The student must also explain the usage reason "
            "for each tense, demonstrating deeper understanding of tense application."
        )
        return _make_la(
            _uid("tenses", idx), "tenses", question, answer,
            "hard", explanation, competency, 6,
            steps=[
                "Step 1: Read each sentence carefully and identify the main verb.",
                "Step 2: Determine the time frame (past, present, future) for each action.",
                "Step 3: Check for helping verbs (has, had, will, is, was, etc.).",
                "Step 4: Match the verb pattern to the correct tense.",
                "Step 5: Explain why that tense is appropriate for the given context.",
                "Step 6: Verify the analysis for all four sentences.",
            ]
        )


def _gen_voice(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    pair = rng.choice(ACTIVE_SENTENCES)
    active, passive = pair
    if competency == "standard":
        if _rbool(rng):
            question = f"Change the following sentence from Active Voice to Passive Voice:\n\"{active}\""
            answer = passive
            explanation = (
                f"To change from Active to Passive Voice: "
                f"(1) The object of the active sentence ('{active.split(' ', 1)[1].split(' ', 1)[0]}') "
                f"becomes the subject of the passive sentence. "
                f"(2) Use the appropriate form of 'to be' + past participle. "
                f"(3) Add 'by' before the original subject."
            )
        else:
            question = f"Change the following sentence from Passive Voice to Active Voice:\n\"{passive}\""
            answer = active
            explanation = (
                "To change from Passive to Active Voice: "
                "(1) Identify the agent (the doer) introduced by 'by'. "
                "(2) Make the agent the subject. "
                "(3) Change the verb from passive form to active form."
            )
        return _make_sa(
            _uid("voice", idx), "voice", question, answer,
            "medium", explanation, competency, 2,
            steps=[
                "Step 1: Identify whether the given sentence is in Active or Passive Voice.",
                "Step 2: Identify the subject, verb, and object in the sentence.",
                "Step 3: Apply the conversion rules (Active -> Passive or Passive -> Active).",
                "Step 4: Ensure the verb tense remains the same after conversion.",
                "Step 5: Write the final converted sentence.",
            ]
        )
    else:
        name = rng.choice(INDIAN_FIRST)
        city = rng.choice(INDIAN_CITIES)
        org = rng.choice(INDIAN_ORGANIZATIONS if rng.random() > 0.5 else INDIAN_SCHOOLS)
        active2 = f"The organization has launched a new awareness campaign about {rng.choice(INDIAN_ISSUES)} in {city}."
        passive2 = f"A new awareness campaign about {rng.choice(INDIAN_ISSUES)} in {city} has been launched by the organization."
        question = (
            f"{name} is working as a volunteer for an NGO in {city}. "
            f"She needs to prepare a report for her school's magazine, {org}. "
            f"Below are two versions of a statement from her report:\n\n"
            f"Version A (Active Voice): \"{active2}\"\n"
            f"Version B (Passive Voice): \"{passive2}\"\n\n"
            f"(a) Rewrite Version A in Passive Voice.\n"
            f"(b) Rewrite Version B in Active Voice.\n"
            f"(c) Explain when it is more appropriate to use Active Voice and when Passive Voice is better in report writing, with examples."
        )
        answer = (
            f"(a) {passive2}\n"
            f"(b) {active2}\n"
            f"(c) Use Active Voice when the doer of the action is important (e.g., 'The NGO launched the campaign'). "
            f"Use Passive Voice when the action itself is more important than the doer "
            f"(e.g., 'A new campaign was launched') or when the doer is unknown."
        )
        return _make_la(
            _uid("voice", idx), "voice", question, answer,
            "hard", explanation, competency, 6,
            steps=[
                "Step 1: Analyze both versions of the sentence.",
                "Step 2: Apply active-to-passive conversion rules.",
                "Step 3: Apply passive-to-active conversion rules.",
                "Step 4: Consider the context of report writing.",
                "Step 5: Explain the appropriate use of each voice with examples.",
            ]
        )


def _gen_reported_speech(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    pair = rng.choice(REPORTED_TEMPLATES)
    direct, indirect, rule_note = pair
    if competency == "standard":
        question = f"Convert the following sentence into Reported Speech:\n{direct}"
        answer = indirect
        explanation = (
            f"Rules applied: {rule_note}. "
            f"In Reported Speech, the tense usually shifts back (backshift). "
            f"Pronouns and time/place expressions may also change."
        )
        return _make_sa(
            _uid("reported_speech", idx), "reported_speech", question, answer,
            "medium", explanation, competency, 2,
            steps=[
                "Step 1: Remove the quotation marks and use 'that' (or 'asked/wished' for questions/exclamations).",
                "Step 2: Change the pronouns (first person to third person, etc.).",
                "Step 3: Change the tense according to backshift rules.",
                "Step 4: Change time and place expressions as needed.",
                "Step 5: Verify the sentence is grammatically correct.",
            ]
        )
    else:
        name1 = rng.choice(INDIAN_FIRST)
        name2 = rng.choice(INDIAN_FIRST)
        event = rng.choice(INDIAN_EVENTS)
        question = (
            f"{name1} and {name2} were classmates at {rng.choice(INDIAN_SCHOOLS)}. "
            f"Below are some things they said during the {event}. "
            f"Convert each into Reported Speech:\n\n"
            f"(1) {name1} said, 'I am organizing the {event}.'\n"
            f"(2) {name2} said, 'Have you sent the invitations?'\n"
            f"(3) {name1} said, 'What a wonderful turnout we have!'\n"
            f"(4) {name2} said, 'Let us start the program on time.'\n\n"
            f"Also explain the rules applied for each conversion."
        )
        answer = (
            f"(1) {name1} said that he/she was organizing the {event}.\n"
            f"(2) {name2} asked if I had sent the invitations.\n"
            f"(3) {name1} exclaimed that it was a wonderful turnout they had.\n"
            f"(4) {name2} suggested that they should start the program on time."
        )
        explanation = (
            "This competency-based question requires applying Reported Speech rules "
            "across different sentence types (statement, question, exclamation, suggestion). "
            "Students must apply backshift of tenses, change of pronouns, and use "
            "appropriate reporting verbs for each type."
        )
        return _make_la(
            _uid("reported_speech", idx), "reported_speech", question, answer,
            "hard", explanation, competency, 6,
            steps=[
                "Step 1: Identify the type of each sentence (statement, question, exclamation, suggestion).",
                "Step 2: Choose the appropriate reporting verb for each type.",
                "Step 3: Change pronouns according to the context (e.g., I -> he/she).",
                "Step 4: Apply backshift for tenses.",
                "Step 5: Verify the sentence structure for each type.",
            ]
        )


def _gen_clauses(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    pair = rng.choice(CLAUSE_SENTENCES)
    sentence, clause_type = pair
    if competency == "standard":
        question = f"Identify the type of clause underlined in the following sentence:\n\"{sentence}\"\n(Note: The clause is the part that functions as a noun, adjective, or adverb in the sentence.)"
        answer = f"The underlined clause is a {clause_type}."
        explanation = (
            f"A {clause_type} functions as a {clause_type.split('/')[0].strip()} in the sentence. "
            f"Clauses are groups of words with a subject and a verb. "
            f"Noun clauses act as subjects or objects, adjective clauses modify nouns, "
            f"and adverb clauses modify verbs, adjectives, or other adverbs."
        )
        return _make_fill(
            _uid("clauses", idx), "clauses", question, clause_type,
            "medium", explanation, competency, 2,
            steps=[
                "Step 1: Identify the dependent clause in the sentence.",
                "Step 2: Determine the function of the clause (subject, object, or modifier).",
                "Step 3: Classify it as Noun, Adjective, or Adverb clause.",
                "Step 4: Verify by checking what part of speech the clause replaces.",
            ]
        )
    else:
        conjunctions = ["because", "although", "since", "while", "if", "when", "until", "unless", "whereas", "wherever"]
        conj1 = rng.choice(conjunctions)
        conj2 = rng.choice([c for c in conjunctions if c != conj1])
        name = rng.choice(INDIAN_FIRST)
        question = (
            f"Join the following pairs of sentences using appropriate conjunctions. "
            f"Identify the type of clause formed in each case:\n\n"
            f"(a) {name} studied hard. {name} wanted to top the class. "
            f"(Use a conjunction to show purpose)\n"
            f"(b) It was raining heavily. The match continued. "
            f"(Use a conjunction to show contrast)\n"
            f"(c) You may leave the room. You have completed your work. "
            f"(Use a conjunction to show condition)\n"
            f"(d) I do not know the time. I missed the train. "
            f"(Use a conjunction to show reason)"
        )
        answer = (
            f"(a) {name} studied hard so that he/she could top the class. (Adverb clause of purpose)\n"
            f"(b) Although it was raining heavily, the match continued. (Adverb clause of concession)\n"
            f"(c) You may leave the room if you have completed your work. (Adverb clause of condition)\n"
            f"(d) I missed the train because I did not know the time. (Adverb clause of reason)"
        )
        explanation = (
            "Different conjunctions create different types of adverb clauses. "
            "'So that' indicates purpose, 'although' indicates concession, "
            "'if' indicates condition, and 'because' indicates reason."
        )
        return _make_la(
            _uid("clauses", idx), "clauses", question, answer,
            "hard", explanation, competency, 5,
            steps=[
                "Step 1: Analyze the relationship between the two sentences.",
                "Step 2: Choose an appropriate conjunction for each relationship.",
                "Step 3: Join the sentences using the conjunction.",
                "Step 4: Identify the type of clause formed.",
                "Step 5: Verify the joined sentence is grammatically correct.",
            ]
        )


def _gen_prepositions(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    if competency == "standard":
        pair = rng.choice(PREPOSITION_PAIRS)
        verb, prep = pair
        question = f"Fill in the blank with the correct preposition:\n\nThe verb '{verb}' always takes the preposition '{prep}'. Complete the sentence:\n\"I can always {prep} on my best friend.\""
        answer = verb + " " + prep
        explanation = (
            f"The verb '{verb}' is a phrasal verb that requires the preposition '{prep}'. "
            f"Phrasal verbs have fixed preposition partners that must be used correctly."
        )
        return _make_fill(
            _uid("prepositions", idx), "prepositions", question, answer,
            "easy", explanation, competency, 1,
            steps=[
                f"Step 1: Identify the verb in the sentence: '{verb}'.",
                f"Step 2: Recall that '{verb}' forms a phrasal verb with '{prep}'.",
                f"Step 3: Complete the phrase: '{verb} {prep}'.",
            ]
        )
    else:
        name = rng.choice(INDIAN_FIRST)
        school = rng.choice(INDIAN_SCHOOLS)
        question = (
            f"{name} of {school} is writing a letter of application for an internship. "
            f"Help {name} complete the letter by filling in the correct prepositions:\n\n"
            f"'I am writing to apply ___ the internship program advertised in the newspaper. "
            f"I am keen ___ developing my skills and contributing ___ your organization. "
            f"I believe I am capable ___ handling the responsibilities assigned. "
            f"I look forward ___ hearing from you.'"
        )
        answer = (
            "(a) for, (b) on / to, (c) to, (d) of, (e) to"
        )
        explanation = (
            "'apply for' is the correct collocation. 'keen on/to' are both acceptable. "
            "'contribute to' is the fixed phrase. 'capable of' is the correct preposition. "
            "'look forward to' requires 'to' followed by a gerund or noun."
        )
        return _make_la(
            _uid("prepositions", idx), "prepositions", question, answer,
            "medium", explanation, competency, 4,
            steps=[
                "Step 1: Read the context and identify each blank.",
                "Step 2: Recall the correct preposition for each verb phrase.",
                "Step 3: Apply knowledge of preposition collocations.",
                "Step 4: Verify each choice makes the sentence grammatically correct.",
            ]
        )


def _gen_determiners(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    if competency == "standard":
        item = rng.choice(DETERMINER_SENTENCES)
        question_text, correct = item
        question = f"Fill in the blank with the most appropriate determiner:\n{question_text}"
        explanation = (
            f"The correct determiner is '{correct}'. "
            f"Determiners (articles, demonstratives, possessives, quantifiers) "
            f"specify the noun they modify. 'A/An' are indefinite articles, "
            f"'the' is the definite article. 'An' is used before vowel sounds."
        )
        all_dets = ["A", "An", "The", "Some", "Any", "Each", "Every", "Few", "Little", "Many"]
        distractors = [d for d in all_dets if d != correct][:3]
        return _make_mcq(
            _uid("determiners", idx), "determiners",
            question, correct, distractors,
            "easy", explanation, competency, 1,
            steps=[
                f"Step 1: Identify the noun following the blank: '{question_text.split('___')[1].split(' ')[0]}'.",
                f"Step 2: Check if the noun starts with a vowel sound (for a/an choice).",
                f"Step 3: Determine if a definite or indefinite article is needed.",
                "Step 4: Select the appropriate determiner.",
            ]
        )
    else:
        name = rng.choice(INDIAN_FIRST)
        question = (
            f"{name} is describing his/her visit to the {rng.choice(INDIAN_FESTIVALS)} "
            f"celebration in {rng.choice(INDIAN_CITIES)}. Fill in the blanks with "
            f"suitable determiners (articles, quantifiers, possessives):\n\n"
            f"'Yesterday, I went to attend {rng.choice(INDIAN_FESTIVALS)} celebration "
            f"with ___ family. It was ___ amazing experience. "
            f"___ streets were decorated with ___ colorful lights. "
            f"___ people from all over the city gathered there. "
            f"I bought ___ sweets for ___ relatives and ___ friends.'"
        )
        answer = (
            "my, an, The, colorful / bright, Many / All, some, my, my"
        )
        explanation = (
            "This question tests the ability to choose appropriate determiners in context. "
            "'My' is a possessive determiner, 'an' is used before 'amazing' (vowel sound), "
            "'The' is definite article for specific nouns (streets), "
            "quantifiers like 'many/all' are used before plural nouns."
        )
        return _make_la(
            _uid("determiners", idx), "determiners", question, answer,
            "medium", explanation, competency, 3,
            steps=[
                "Step 1: Analyze each blank and the noun that follows.",
                "Step 2: Determine if the noun is specific or general.",
                "Step 3: Choose the right determiner (article, possessive, quantifier).",
                "Step 4: Check if the determiner agrees with the noun in number and specificity.",
            ]
        )


def _gen_sv_agreement(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    if competency == "standard":
        item = rng.choice(SV_AGREEMENT_SENTENCES)
        sentence, correct_verb = item
        question = f"Choose the correct verb to complete the sentence:\n\"{sentence}\""
        wrong_verb = "was" if correct_verb == "were" else ("were" if correct_verb == "was" else "is")
        if correct_verb == wrong_verb:
            wrong_verb = "has" if correct_verb == "have" else "have"
        distractors = [wrong_verb, "am", "be"]
        explanation = (
            f"The correct verb is '{correct_verb}'. "
            f"Subject-Verb Agreement requires the verb to agree with the subject in number "
            f"(singular/plural) and person. Collective nouns, phrases with 'along with', "
            f"'each of', and 'either...or' follow specific agreement rules."
        )
        return _make_mcq(
            _uid("sv_agreement", idx), "sv_agreement",
            question, correct_verb, distractors[:3],
            "medium", explanation, competency, 1,
            steps=[
                f"Step 1: Identify the subject of the sentence: '{sentence.split(' ')[0]}...'.",
                "Step 2: Determine if the subject is singular or plural.",
                "Step 3: Apply Subject-Verb Agreement rules.",
                f"Step 4: Select the correct verb form: '{correct_verb}'.",
            ]
        )
    else:
        name = rng.choice(INDIAN_FIRST)
        question = (
            f"{name} is writing a paragraph about {rng.choice(INDIAN_EVENTS)} at school. "
            f"Below is a draft with errors in Subject-Verb Agreement. "
            f"Identify and correct the errors:\n\n"
            f"'Every one of the students ___ (was/were) excited about the event. "
            f"The group of singers ___ (are/is) practicing daily. "
            f"Either the teachers or the principal ___ (is/are) going to attend. "
            f"Three miles ___ (was/were) too far for some students to walk.'"
        )
        answer = (
            "(1) was — 'Every one' is singular.\n"
            "(2) is — 'group' is a collective noun treated as singular.\n"
            "(3) is — 'either...or' follows the nearer subject 'principal' (singular).\n"
            "(4) were — 'three miles' is plural."
        )
        explanation = (
            "Subject-Verb Agreement rules: (1) 'Every one of' takes a singular verb. "
            "(2) Collective nouns like 'group' take singular verbs when the group acts as one unit. "
            "(3) With 'either...or', the verb agrees with the nearer subject. "
            "(4) Quantities and measurements take plural verbs."
        )
        return _make_la(
            _uid("sv_agreement", idx), "sv_agreement", question, answer,
            "medium", explanation, competency, 4,
            steps=[
                "Step 1: Identify the subject in each sentence.",
                "Step 2: Determine if the subject is singular or plural.",
                "Step 3: Apply SV Agreement rules for special cases.",
                "Step 4: Select the correct verb form.",
                "Step 5: Verify the correction for each sentence.",
            ]
        )


def _gen_transformation(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    if competency == "standard":
        pair = rng.choice(TRANSFORMATION_TEMPLATES)
        direct_sent, indirect_sent, _ = pair
        question = f"Rewrite the following sentence as indicated:\n{direct_sent}"
        answer = indirect_sent
        explanation = (
            "Sentence Transformation involves changing the form of a sentence "
            "while keeping the same meaning. This includes changing from Direct to "
            "Indirect Speech, changing sentence types (affirmative to negative, "
            "interrogative to assertive), and using different structures to express the same idea."
        )
        return _make_sa(
            _uid("transformation", idx), "transformation", question, answer,
            "medium", explanation, competency, 2,
            steps=[
                "Step 1: Analyze the original sentence and identify its type.",
                "Step 2: Determine the required transformation.",
                "Step 3: Apply the transformation rules.",
                "Step 4: Ensure the meaning remains the same.",
                "Step 5: Check grammar and punctuation in the new sentence.",
            ]
        )
    else:
        name = rng.choice(INDIAN_FIRST)
        question = (
            f"{name} is a student reporter for the school magazine. "
            f"He/She interviewed the Principal about the school's new initiative "
            f"on environmental sustainability. Below are four direct quotes from the Principal. "
            f"Rewrite each in Indirect Speech using appropriate reporting verbs:\n\n"
            f"(1) 'Every student must plant at least one tree this year.'\n"
            f"(2) 'How many students have already joined the Green Club?'\n"
            f"(3) 'What an inspiring effort by our students!' \n"
            f"(4) 'Let us work together to make our campus greener.'\n\n"
            f"Also explain why you chose the specific reporting verb for each."
        )
        answer = (
            "(1) The Principal instructed that every student must plant at least one tree that year.\n"
            "(2) The Principal enquired how many students had already joined the Green Club.\n"
            "(3) The Principal exclaimed that it was very inspiring effort by their students.\n"
            "(4) The Principal suggested/proposed that they should work together to make their campus greener."
        )
        explanation = (
            "Different sentence types require different reporting verbs: "
            "commands -> instructed/ordered/requested, questions -> asked/enquired, "
            "exclamations -> exclaimed, suggestions -> suggested/proposed."
        )
        return _make_la(
            _uid("transformation", idx), "transformation", question, answer,
            "hard", explanation, competency, 6,
            steps=[
                "Step 1: Identify the type of each sentence (command, question, exclamation, suggestion).",
                "Step 2: Choose the appropriate reporting verb for each type.",
                "Step 3: Apply backshift rules for tenses.",
                "Step 4: Change pronouns and time expressions as needed.",
                "Step 5: Verify the correctness of each transformation.",
            ]
        )


def _gen_figures_of_speech(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    item = rng.choice(FIGURES_OF_SPEECH)
    sentence, device, definition = item
    if competency == "standard":
        question = f"Identify the figure of speech used in the following line:\n\"{sentence}\""
        options_vals = [device]
        all_devices = [
            "Simile", "Metaphor", "Personification", "Alliteration",
            "Onomatopoeia", "Hyperbole", "Oxymoron", "Irony",
        ]
        for d in all_devices:
            if d != device:
                options_vals.append(d)
        distractors = options_vals[1:4]
        explanation = f"This is an example of {device}. {definition}."
        return _make_mcq(
            _uid("figures_speech", idx), "figures_of_speech",
            question, device, distractors,
            "easy", explanation, competency, 1,
            steps=[
                "Step 1: Read the sentence carefully and identify the comparison or special feature.",
                f"Step 2: Recall the definition of {device}: {definition}",
                "Step 3: Match the sentence with the correct figure of speech.",
            ]
        )
    else:
        name = rng.choice(INDIAN_FIRST)
        question = (
            f"{name} is analyzing a poem for the school's literary magazine. "
            f"Help {name} identify the figures of speech in the following lines "
            f"and explain their effect:\n\n"
            f"(a) \"The moon danced on the rippling lake.\"\n"
            f"(b) \"He fought like a lion on the battlefield.\"\n"
            f"(c) \"Silence speaks louder than words.\"\n"
            f"(d) \"The flowers nodded their heads in the gentle breeze.\"\n"
            f"(e) \"The silence was deafening.\""
        )
        answer = (
            "(a) Personification — the moon is given the human action of dancing.\n"
            "(b) Simile — comparison using 'like'.\n"
            "(c) Oxymoron — contrasting ideas 'silence' and 'speaks'.\n"
            "(d) Personification — flowers are given the human action of nodding.\n"
            "(e) Oxymoron/Personification — silence cannot be 'deafening'."
        )
        explanation = (
            "Figures of speech enrich language by creating vivid imagery. "
            "Personification gives human qualities to non-human things. "
            "Simile makes comparisons using 'like' or 'as'. "
            "Oxymoron combines contradictory terms for effect."
        )
        return _make_la(
            _uid("figures_speech", idx), "figures_of_speech", question, answer,
            "medium", explanation, competency, 5,
            steps=[
                "Step 1: Read each line carefully.",
                "Step 2: Identify the literary device used.",
                "Step 3: Explain what is being compared or personified.",
                "Step 4: Analyze the effect of the figure of speech on the reader.",
                "Step 5: Summarize the findings.",
            ]
        )


# ═══════════════════════════════════════════════════════════════
#  WRITING SKILLS GENERATORS
# ═══════════════════════════════════════════════════════════════

def _gen_notice(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    event = rng.choice(INDIAN_EVENTS)
    school = rng.choice(INDIAN_SCHOOLS)
    name = rng.choice(INDIAN_FIRST)
    date = f"{rng.randint(1,28)}/{rng.randint(1,12)}/2025"
    if competency == "standard":
        question = (
            f"Write a notice for the school notice board informing students about the upcoming "
            f"{event}. Include: date, time, venue, eligibility, and instructions for registration. "
            f"(Word limit: 50 words)"
        )
        answer = (
            f"NOTICE\nDate: {date}\n\n"
            f"{event.upper()}\n\n"
            f"All students are informed that our school is organizing a {event} "
            f"on {date} in the school auditorium. Interested students may register "
            f"with their class teachers by {rng.randint(10,25)}/{rng.randint(1,12)}/2025.\n\n"
            f"({name})\nStudent Council"
        )
        explanation = (
            "A notice is a formal announcement. It must have: "
            "a clear heading, date, body with all relevant details, and signature with designation. "
            "Keep it concise and factual."
        )
        return _make_sa(
            _uid("notice", idx), "notice_writing", question, answer,
            "easy", explanation, competency, 3,
            steps=[
                "Step 1: Write the word 'NOTICE' in bold at the top.",
                "Step 2: Mention the date below 'NOTICE'.",
                "Step 3: Give a clear heading (e.g., 'Annual Sports Day').",
                "Step 4: Write the body with essential details (when, where, who).",
                "Step 5: Add the signature and designation at the end.",
            ]
        )
    else:
        city = rng.choice(INDIAN_CITIES)
        question = (
            f"{rng.choice(INDIAN_SCHOOLS)}, {city} is launching a {rng.choice(INDIAN_ISSUES)} "
            f"campaign. As the Head of the Student Council, {name} needs to draft a notice "
            f"that:\n"
            f"(a) Clearly states the purpose of the campaign\n"
            f"(b) Lists the activities planned (street play, poster-making, rally)\n"
            f"(c) Mentions the dates and the point person for each activity\n"
            f"(d) Encourages maximum participation\n\n"
            f"Also, draft a brief follow-up notice after the event thanking participants."
        )
        answer = (
            "Notice 1:\n"
            f"Date: {date}\n{rng.choice(INDIAN_ISSUES).upper()} CAMPAIGN\n\n"
            f"Dear Students,\n"
            f"Our school is launching a campaign on {rng.choice(INDIAN_ISSUES)} "
            f"from {rng.randint(10,25)}/{rng.randint(1,12)} to {rng.randint(10,25)}/{rng.randint(1,12)}. "
            f"Activities: Street Play (Class XI), Poster-Making (Class XII), Rally (All classes). "
            f"Register with your class captain. Let us make a difference!\n\n"
            f"({name})\nHead, Student Council\n\n"
            "Notice 2 (Follow-up):\n"
            f"Date: {rng.randint(1,28)}/{rng.randint(1,12)}/2025\n"
            f"THANK YOU!\n\n"
            f"We thank all students for their enthusiastic participation in the "
            f"{rng.choice(INDIAN_ISSUES)} campaign. Over 300 students participated. "
            f"Certificates will be distributed in the assembly.\n\n"
            f"({name})\nHead, Student Council"
        )
        explanation = (
            "This competency-based question requires creating two notices — one announcing "
            "a campaign with multiple activities, and a follow-up notice. The student must "
            "plan the content strategically and use persuasive language."
        )
        return _make_la(
            _uid("notice", idx), "notice_writing", question, answer,
            "medium", explanation, competency, 6,
            steps=[
                "Step 1: Plan the content for both notices.",
                "Step 2: Draft Notice 1 with all required details.",
                "Step 3: Ensure the language is clear and encouraging.",
                "Step 4: Draft Notice 2 as a follow-up.",
                "Step 5: Review both notices for format and completeness.",
            ]
        )


def _gen_email(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    name = rng.choice(INDIAN_FIRST)
    school = rng.choice(INDIAN_SCHOOLS)
    if competency == "standard":
        question = (
            f"Write an email from {name}, a student of class XI at {school}, "
            f"to the school Principal requesting permission to start a Reading Club. "
            f"Use proper email format. (Word limit: 80-100 words)"
        )
        answer = (
            "Subject: Request to Start a Reading Club\n\n"
            "Respected Principal,\n\n"
            "I am writing to request permission to start a Reading Club in our school. "
            "Many students are interested in reading beyond the syllabus, and a club would "
            "provide a platform for book discussions and literary activities.\n\n"
            "I propose weekly meetings during lunch break with teacher supervision. "
            "I kindly request your approval for this initiative.\n\n"
            "Thank you.\n\n"
            "Yours sincerely,\n"
            f"{name}\nClass XI, {school}"
        )
        explanation = (
            "Email format requires: Subject line, salutation, body paragraphs, "
            "closing, and signature. The subject should be clear and specific. "
            "The body should state the purpose, justification, and request clearly."
        )
        return _make_sa(
            _uid("email", idx), "email_writing", question, answer,
            "easy", explanation, competency, 3,
            steps=[
                "Step 1: Write a clear and specific subject line.",
                "Step 2: Use appropriate salutation (Respected Sir/Madam).",
                "Step 3: State the purpose in the first paragraph.",
                "Step 4: Provide supporting details in the body.",
                "Step 5: End with a polite closing and full signature.",
            ]
        )
    else:
        issue = rng.choice(INDIAN_ISSUES)
        city = rng.choice(INDIAN_CITIES)
        question = (
            f"{name} noticed that the nearby park in {city} has been facing issues with "
            f"{issue}. As an active member of the school's Eco Club, {name} decides to "
            f"write an email to the Municipal Commissioner of {city}:\n\n"
            f"(a) Describe the problem observed at the park.\n"
            f"(b) Suggest at least three practical solutions.\n"
            f"(c) Request the Commissioner's support and propose collaboration with the school.\n"
            f"(d) Use a formal tone appropriate for writing to a government official."
        )
        answer = (
            "Subject: Concern Regarding Park Condition and Proposed Collaboration\n\n"
            "Respected Sir/Madam,\n\n"
            f"I am {name}, a student of class XI at {school}, {city}. "
            f"I wish to bring to your attention the deteriorating condition of "
            f"{rng.choice(INDIAN_CITIES)} Central Park, which has become a hub for "
            f"{issue}. The park, which was once a green space for families, now has "
            f"accumulated waste and broken benches.\n\n"
            "I would like to suggest: (1) Installation of waste bins, "
            "(2) Regular maintenance by the municipal corporation, "
            "(3) Organizing monthly community clean-up drives with our school's Eco Club.\n\n"
            "I request your support for this initiative and would be grateful if you "
            "could collaborate with our school to restore the park.\n\n"
            "Yours faithfully,\n"
            f"{name}\nClass XI, {school}"
        )
        explanation = (
            "Writing to a government official requires formal language, clear problem description, "
            "practical solutions, and a collaborative tone. The email should be structured with "
            "a clear subject, introduction, problem statement, proposed solutions, and a call to action."
        )
        return _make_la(
            _uid("email", idx), "email_writing", question, answer,
            "hard", explanation, competency, 6,
            steps=[
                "Step 1: Research the issue and understand the context.",
                "Step 2: Draft the subject line to be specific and professional.",
                "Step 3: Write a formal introduction.",
                "Step 4: Describe the problem with specific observations.",
                "Step 5: Propose practical, actionable solutions.",
                "Step 6: End with a polite request for collaboration.",
                "Step 7: Use appropriate formal sign-off.",
            ]
        )


def _gen_article(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    topic = rng.choice(ARTICLE_TOPICS)
    name = rng.choice(INDIAN_FIRST)
    if competency == "standard":
        question = (
            f"Write an article on the topic: '{topic}'. "
            f"Your article should have a title, an introduction, two body paragraphs, "
            f"and a conclusion. (Word limit: 150-180 words)"
        )
        answer = (
            f"Title: Why Reading Books Still Matters\n\n"
            f"In today's digital age, where screens dominate our attention, "
            f"the habit of reading books is gradually declining. However, "
            f"books remain an irreplaceable source of knowledge and imagination.\n\n"
            f"Reading improves concentration, vocabulary, and empathy. "
            f"When we read, we step into the lives of characters from different "
            f"cultures and eras. This broadens our perspective and deepens our "
            f"understanding of human nature.\n\n"
            f"While digital media has its advantages, nothing compares to the "
            f"tactile experience of holding a book. Schools should encourage "
            f"reading by maintaining well-stocked libraries.\n\n"
            f"Let us revive the reading culture and discover the joy of books."
        )
        explanation = (
            "An article should have: a catchy title, an engaging introduction, "
            "body paragraphs with arguments/examples, and a strong conclusion. "
            "Use a semi-formal to formal tone. Keep sentences varied and paragraphs focused."
        )
        return _make_la(
            _uid("article", idx), "article_writing", question, answer,
            "medium", explanation, competency, 6,
            steps=[
                "Step 1: Brainstorm ideas related to the topic.",
                "Step 2: Create an attractive and relevant title.",
                "Step 3: Write an introduction that hooks the reader.",
                "Step 4: Develop 2-3 body paragraphs with supporting points.",
                "Step 5: Write a conclusion that summarizes and inspires action.",
                "Step 6: Check word count and flow.",
            ]
        )
    else:
        festival = rng.choice(INDIAN_FESTIVALS)
        question = (
            f"An online magazine for young readers in India is conducting a competition. "
            f"{name} decides to write an article on the topic: "
            f"'{rng.choice(INDIAN_FESTIVALS)} in the Modern World: Balancing Tradition and Modernity.'\n\n"
            f"The article should:\n"
            f"(a) Begin with a personal anecdote related to {festival}\n"
            f"(b) Discuss how the festival is celebrated today vs. in the past\n"
            f"(c) Include an interview with an elder about their childhood celebrations\n"
            f"(d) Suggest ways to keep the festival's essence alive\n"
            f"(e) Have a title that captures the theme"
        )
        answer = (
            "Title: When Diwali Lights Up Two Worlds\n\n"
            "Grandmother's hands trembled slightly as she arranged the tiny clay diyas "
            "on the windowsill. 'In my village,' she said, 'we made these ourselves — "
            "hundreds of them. Now you buy them from shops.'\n\n"
            "Diwali has indeed transformed. What was once a community celebration "
            "in every courtyard has shifted to apartment complexes and malls. "
            "The rangoli designs are now printed on stickers, and the sweets are "
            "often store-bought. Yet, the underlying spirit — the triumph of light "
            "over darkness — remains unchanged.\n\n"
            "The key is balance. We can use eco-friendly decorations while keeping "
            "the traditions alive. Let us light diyas AND share the joy with those "
            "who have less. That is the true Diwali."
        )
        explanation = (
            "A competency-based article integrates personal narrative, social observation, "
            "and recommendations. It requires the writer to bridge emotional appeal "
            "(anecdote) with analytical depth (comparison) and practical solutions."
        )
        return _make_la(
            _uid("article", idx), "article_writing", question, answer,
            "hard", explanation, competency, 8,
            steps=[
                "Step 1: Plan the article structure with all required elements.",
                "Step 2: Write the introduction with a personal anecdote.",
                "Step 3: Compare past and present celebrations with evidence.",
                "Step 4: Incorporate an interview perspective.",
                "Step 5: Provide actionable recommendations.",
                "Step 6: Craft a title that captures the essence.",
                "Step 7: Review for coherence, flow, and word count.",
            ]
        )


def _gen_report(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    if competency == "standard":
        template = rng.choice(REPORT_TEMPLATES)
        question = (
            f"Based on the following data, write a newspaper report:\n{template}"
        )
        explanation = (
            "A report is a factual account of an event. It should include: "
            "headline, byline, dateline, introduction (lead paragraph answering 5Ws and 1H), "
            "body paragraphs with details and quotes, and a concluding paragraph."
        )
        return _make_sa(
            _uid("report", idx), "report_writing", question,
            "A well-structured report with headline, lead, body, and conclusion.",
            "medium", explanation, competency, 4,
            steps=[
                "Step 1: Create an appropriate headline.",
                "Step 2: Write a byline (reporter's name) and dateline.",
                "Step 3: Write the lead paragraph with the 5Ws and 1H.",
                "Step 4: Add body paragraphs with details and quotes.",
                "Step 5: Conclude with the outcome or future plans.",
            ]
        )
    else:
        issue = rng.choice(INDIAN_ISSUES)
        city = rng.choice(INDIAN_CITIES)
        name = rng.choice(INDIAN_FIRST)
        question = (
            f"{name} witnessed a community initiative in {city} to address {issue}. "
            f"Write a detailed report for the school magazine covering:\n\n"
            f"(a) The background of the issue in the locality\n"
            f"(b) The people involved in the initiative (NGO, students, local residents)\n"
            f"(c) The activities conducted and their immediate impact\n"
            f"(d) Challenges faced during the initiative\n"
            f"(e) Future plans and recommendations"
        )
        answer = (
            "REPORT: Students Lead Anti-Plastic Campaign in Pune\n\n"
            "PUNE — A group of 50 students from St. Xavier's High School, Pune, "
            "has launched a community campaign to reduce plastic waste in their locality. "
            "Inspired by the Swachh Bharat Abhiyan, the students conducted door-to-door "
            "awareness sessions and distributed cloth bags.\n\n"
            "The campaign was supported by the local NGO 'Green Earth' and the Pune "
            "Municipal Corporation. Activities included street plays, poster competitions, "
            "and a weekly market visit to promote cloth bags over plastic ones.\n\n"
            "Challenges included initial resistance from shopkeepers. However, after "
            "a week of persuasion, 30 out of 50 shops agreed to stop giving free "
            "plastic bags. The students plan to expand the campaign to neighboring areas."
        )
        explanation = (
            "A comprehensive report requires factual presentation, inclusion of "
            "stakeholder perspectives, description of activities, acknowledgment of "
            "challenges, and forward-looking recommendations. This develops research "
            "and analytical skills."
        )
        return _make_la(
            _uid("report", idx), "report_writing", question, answer,
            "hard", explanation, competency, 8,
            steps=[
                "Step 1: Understand the context and gather all relevant facts.",
                "Step 2: Write a headline and lead paragraph.",
                "Step 3: Describe the background and key stakeholders.",
                "Step 4: Detail the activities conducted and their impact.",
                "Step 5: Acknowledge challenges faced.",
                "Step 6: Include future plans and recommendations.",
                "Step 7: Conclude with a forward-looking statement.",
            ]
        )


def _gen_diary(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    name = rng.choice(INDIAN_FIRST)
    if competency == "standard":
        prompt = rng.choice(DIARY_PROMPTS).replace("{place}", rng.choice(INDIAN_CITIES))
        question = f"Write a diary entry based on the following prompt:\n{prompt}\n(Word limit: 100-120 words)"
        explanation = (
            "A diary entry is a personal, informal piece of writing. "
            "It should have: date and day, salutation (Dear Diary), body with "
            "personal thoughts and feelings, and a closing. Use first person and "
            "a conversational tone."
        )
        return _make_sa(
            _uid("diary", idx), "diary_entry", question,
            "A personal diary entry reflecting thoughts and feelings.",
            "easy", explanation, competency, 3,
            steps=[
                "Step 1: Write the date and day at the top.",
                "Step 2: Begin with 'Dear Diary'.",
                "Step 3: Describe the events and your feelings.",
                "Step 4: Reflect on what you learned or felt.",
                "Step 5: End with a closing remark.",
            ]
        )
    else:
        event = rng.choice(INDIAN_EVENTS)
        question = (
            f"{name} participated in {event} at {rng.choice(INDIAN_SCHOOLS)}. "
            f"Write a series of three diary entries:\n\n"
            f"(a) The day before the event — expressing nervousness and preparation\n"
            f"(b) The day of the event — describing the experience\n"
            f"(c) The day after — reflecting on lessons learned\n\n"
            f"Each entry should be 50-70 words and should show the evolution of "
            f"{name}'s emotions throughout the experience."
        )
        answer = (
            "(a) Dear Diary, Tomorrow is the Inter-House Debate Competition. "
            "I have been practicing for a week but I am still nervous. "
            "What if I forget my points? I hope my team does well.\n\n"
            "(b) Dear Diary, What a day! I spoke confidently and my team won the "
            "second prize. The audience clapped and my teacher was proud of me. "
            "I am glad I did not give up.\n\n"
            "(c) Dear Diary, The debate taught me that preparation and confidence "
            "are key. I learned to express my views clearly and respect others' "
            "opinions. I look forward to participating again next year."
        )
        explanation = (
            "This competency-based question requires creating a narrative arc across "
            "three diary entries. The student must show emotional progression, "
            "use appropriate diary format, and maintain consistency in character voice."
        )
        return _make_la(
            _uid("diary", idx), "diary_entry", question, answer,
            "medium", explanation, competency, 5,
            steps=[
                "Step 1: Plan the three entries to show emotional progression.",
                "Step 2: Write Entry 1 with anticipation and nervousness.",
                "Step 3: Write Entry 2 describing the experience.",
                "Step 4: Write Entry 3 with reflection and lessons learned.",
                "Step 5: Ensure consistent voice and proper diary format.",
            ]
        )


def _gen_letter(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    if competency == "standard":
        name = rng.choice(INDIAN_FIRST)
        question = (
            f"Write a letter to the editor of 'The Hindu' about the importance of "
            f"organic farming in India. Follow the formal letter format. (150 words)"
        )
        answer = (
            "123, MG Road\nPune - 411001\n20th October, 2025\n\n"
            "The Editor\nThe Hindu\nPune\n\n"
            "Subject: Promoting Organic Farming for a Sustainable Future\n\n"
            "Sir,\n\n"
            "Through the columns of your esteemed newspaper, I wish to draw attention "
            "to the urgent need for promoting organic farming in India. Conventional "
            "farming with heavy chemical use has degraded soil quality and affected "
            "public health.\n\n"
            "Organic farming not only produces healthier food but also preserves "
            "biodiversity. The government should provide subsidies and training to "
            "farmers who adopt organic methods.\n\n"
            "I hope this issue receives the attention it deserves.\n\n"
            "Yours faithfully,\n"
            f"{name}"
        )
        explanation = (
            "A formal letter has: sender's address, date, receiver's address, "
            "subject, salutation, body, closing, and signature. "
            "Use 'Yours faithfully' when you do not know the name of the recipient."
        )
        return _make_la(
            _uid("letter", idx), "letter_writing", question, answer,
            "medium", explanation, competency, 5,
            steps=[
                "Step 1: Write the sender's full address.",
                "Step 2: Mention the date below the address.",
                "Step 3: Write the receiver's address.",
                "Step 4: Write a clear subject line.",
                "Step 5: Use a formal salutation.",
                "Step 6: Write the body in 3-4 paragraphs.",
                "Step 7: End with 'Yours faithfully' and signature.",
            ]
        )
    else:
        name1 = rng.choice(INDIAN_FIRST)
        name2 = rng.choice(INDIAN_FIRST)
        question = (
            f"{name1} is studying in a boarding school in {rng.choice(INDIAN_CITIES)} "
            f"and misses his/her grandmother who lives in a village in {rng.choice(INDIAN_STATES)}. "
            f"Write an informal letter to the grandmother describing:\n\n"
            f"(a) Life at the boarding school and new friends made\n"
            f"(b) How the grandmother's stories and cooking are missed\n"
            f"(c) Plans for the upcoming holidays in the village\n"
            f"(d) Questions about the village and old friends there\n\n"
            f"The letter should be warm, personal, and use conversational language."
        )
        answer = (
            "78, Palm Grove Apartments\nBangalore - 560001\n15th October, 2025\n\n"
            "Dearest Grandma,\n\n"
            "I hope this letter finds you in the best of health. Life at the boarding "
            "school is quite busy but fun. I have made three new friends — Riya, Karan, "
            "and Simran — and we study together in the library every evening.\n\n"
            "I miss your stories about the village so much! And the way you used to make "
            "poha on Sunday mornings. Nothing here tastes as good as your cooking.\n\n"
            "I cannot wait for the holidays next month! I want to help you in the garden "
            "and visit the old banyan tree where we used to sit. How is Uncle Raju? "
            "Has the new school in the village started yet?\n\n"
            "Give my love to Grandpa. Write back soon!\n\n"
            "Your loving grandchild,\n"
            f"{name1}"
        )
        explanation = (
            "An informal letter uses a conversational tone, personal references, "
            "and emotional language. It should feel like a natural conversation "
            "with a loved one, using nicknames, shared memories, and expressions of affection."
        )
        return _make_la(
            _uid("letter", idx), "letter_writing", question, answer,
            "medium", explanation, competency, 6,
            steps=[
                "Step 1: Set the informal tone with a warm salutation.",
                "Step 2: Share personal experiences from boarding school.",
                "Step 3: Express feelings and memories about the grandmother.",
                "Step 4: Mention holiday plans.",
                "Step 5: Ask questions about village life.",
                "Step 6: Close with affection and a personal sign-off.",
            ]
        )


# ═══════════════════════════════════════════════════════════════
#  COMPREHENSION GENERATORS
# ═══════════════════════════════════════════════════════════════

def _gen_comprehension(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    passage = rng.choice(PASSAGE_TEMPLATES)
    # Fill in passage variables
    passage = passage.replace("{place}", rng.choice(INDIAN_CITIES))
    passage = passage.replace("{festival}", rng.choice(INDIAN_FESTIVALS))
    passage = passage.replace("{name}", rng.choice(INDIAN_FIRST))
    passage = passage.replace("{school}", rng.choice(INDIAN_SCHOOLS))
    passage = passage.replace("{issue}", rng.choice(INDIAN_ISSUES))
    passage = passage.replace("{city}", rng.choice(INDIAN_CITIES))
    passage = passage.replace("{surname}", rng.choice(["Sharma", "Patel", "Singh", "Reddy", "Iyer", "Joshi"]))

    if competency == "standard":
        question = (
            f"Read the following passage carefully and answer the question below:\n\n"
            f'"{passage}"\n\n'
            f"What is the main theme or central idea of this passage? "
            f"Support your answer with a reference from the text."
        )
        theme_options = [
            "The importance of balancing tradition with modernity",
            "The role of youth in social change",
            "The value of reading and libraries",
            "Environmental awareness and community action",
        ]
        answer = (
            "The main theme is the importance of balancing tradition with modernity "
            "and the role of youth in driving positive social change. The passage "
            "describes how a student navigates between preserving cultural heritage "
            "and embracing new, eco-friendly practices."
        )
        explanation = (
            "The central idea is the overarching message of the passage. "
            "Look for repeated themes, the author's tone, and the resolution of "
            "the conflict described. Supporting evidence should be a direct reference."
        )
        return _make_mcq(
            _uid("comprehension", idx), "unseen_passage",
            question, theme_options[0], theme_options[1:],
            "medium", explanation, competency, 3,
            steps=[
                "Step 1: Read the passage thoroughly.",
                "Step 2: Identify the key conflict or issue discussed.",
                "Step 3: Determine what the author is trying to convey.",
                "Step 4: Match with the most appropriate theme.",
                "Step 5: Support with a textual reference.",
            ]
        )
    else:
        name = rng.choice(INDIAN_FIRST)
        question = (
            f"Read the following passage carefully and answer ALL the questions:\n\n"
            f'"{passage}"\n\n'
            f"Questions:\n"
            f"(a) What challenges or conflicts are described in the passage?\n"
            f"(b) How does the central character respond to these challenges?\n"
            f"(c) What message do you think the author wants to convey?\n"
            f"(d) How is the setting (place and context) important to the story?\n"
            f"(e) If you were the main character, what would you have done differently?"
        )
        answer = (
            "(a) The challenges include the conflict between tradition and modernity, "
            "resistance from some community members to change, and the difficulty of "
            "balancing cultural values with new practices.\n\n"
            f"(b) The character responds by writing an article that presents both sides, "
            f"showing critical thinking and a desire for balance rather than taking sides.\n\n"
            "(c) The author conveys that progress and tradition can coexist, and that "
            "young people have an important role in bridging the gap between old and new.\n\n"
            "(d) The Indian setting (specific cities, festivals, cultural practices) "
            "provides authenticity and makes the conflict relatable to Indian readers.\n\n"
            "(e) I would have organized a community meeting to discuss the changes "
            "and involve elders in the decision-making process."
        )
        explanation = (
            "This competency-based comprehension test requires multi-layered analysis: "
            "identifying conflict, analyzing character response, inferring the author's "
            "message, understanding the role of setting, and applying the text to a "
            "personal scenario. This develops critical thinking and interpretation skills."
        )
        return _make_la(
            _uid("comprehension", idx), "unseen_passage", question, answer,
            "hard", explanation, competency, 8,
            steps=[
                "Step 1: Read the passage carefully, noting key details.",
                "Step 2: Identify conflicts and challenges described.",
                "Step 3: Analyze the character's response and motivations.",
                "Step 4: Infer the author's message and purpose.",
                "Step 5: Consider the role of the setting.",
                "Step 6: Apply the text to a personal hypothetical scenario.",
            ]
        )


def _gen_vocabulary(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    word_pairs = [
        ("ephemeral", "lasting for a very short time"),
        ("resilient", "able to recover quickly from difficult conditions"),
        ("ubiquitous", "present, appearing, or found everywhere"),
        ("pragmatic", "dealing with things sensibly and realistically"),
        ("ambiguous", "open to more than one interpretation"),
        ("tenacious", "tending to keep a firm hold of something"),
        ("meticulous", "showing great attention to detail"),
        ("benevolent", "well-meaning and kindly"),
        ("vicissitudes", "changes in circumstances or fortune"),
        ("juxtapose", "place close together for contrasting effect"),
    ]
    word, meaning = rng.choice(word_pairs)
    if competency == "standard":
        question = f"What is the meaning of the word '{word}' as used in the context of a passage on social issues?"
        options_vals = [meaning]
        for _, m in rng.sample(word_pairs, 4):
            if m != meaning:
                options_vals.append(m)
        options_vals = options_vals[:4]
        distractors = options_vals[1:]
        explanation = (
            f"'{word}' means '{meaning}'. "
            f"Vocabulary in context requires understanding the meaning of words "
            f"based on how they are used in the passage."
        )
        return _make_mcq(
            _uid("vocabulary", idx), "vocabulary_in_context",
            question, meaning, distractors,
            "medium", explanation, competency, 1,
            steps=[
                f"Step 1: Look at the word '{word}' in the passage context.",
                "Step 2: Analyze the surrounding sentences for clues.",
                f"Step 3: Match the context with the meaning: '{meaning}'.",
                "Step 4: Select the correct option.",
            ]
        )
    else:
        question = (
            f"Given below are five words that a student might encounter while reading "
            f"an article on social reform in India. For each word:\n\n"
            f"(a) Write the meaning in your own words.\n"
            f"(b) Use the word in a sentence relevant to an Indian social context.\n\n"
            f"Words: {', '.join([w for w, _ in rng.sample(word_pairs, 5)])}"
        )
        answer = (
            f"(a) {word}: {meaning}. "
            f"Example: Despite the {word} challenges, the villagers continued their fight "
            f"for clean water.\n"
            f"(b) [Students should provide their own meaningful sentences for each word]"
        )
        explanation = (
            "Vocabulary development in context helps students understand nuanced "
            "meanings and use words appropriately in their own writing."
        )
        return _make_la(
            _uid("vocabulary", idx), "vocabulary_in_context", question, answer,
            "medium", explanation, competency, 4,
            steps=[
                "Step 1: Understand the meaning of each word.",
                "Step 2: Think of an Indian social context where the word applies.",
                "Step 3: Construct a meaningful sentence for each word.",
                "Step 4: Verify the sentence uses the word correctly.",
            ]
        )


# ═══════════════════════════════════════════════════════════════
#  LITERATURE GENERATORS
# ═══════════════════════════════════════════════════════════════

def _gen_prose(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    theme = rng.choice(PROSE_THEMES)
    author = rng.choice(PROSE_AUTHORS_CL11)
    if competency == "standard":
        question = f"What is the central theme of the prose piece '{theme}' by {author}?"
        answer = (
            f"The central theme of '{theme}' is the exploration of how human beings "
            f"navigate the tension between personal aspirations and societal expectations. "
            f"The author uses the protagonist's journey to show that true fulfillment "
            f"comes from staying true to one's values while adapting to changing circumstances."
        )
        explanation = (
            "Prose themes are the underlying messages or ideas explored in a literary work. "
            "To identify a theme, look for recurring ideas, the protagonist's challenges, "
            "and the resolution of conflicts."
        )
        return _make_sa(
            _uid("prose", idx), "prose_analysis", question, answer,
            "medium", explanation, competency, 3,
            steps=[
                "Step 1: Read the prose passage carefully.",
                "Step 2: Identify the central conflict or issue.",
                "Step 3: Note how the author develops the theme through characters and events.",
                "Step 4: Summarize the theme in a clear statement.",
            ]
        )
    else:
        name = rng.choice(INDIAN_FIRST)
        question = (
            f"{name} is writing a literary analysis of a prose piece by {author} for class. "
            f"The prose deals with the theme of '{theme}'. Help {name} analyze:\n\n"
            f"(a) How does the author develop the theme through characterization?\n"
            f"(b) Identify and explain two significant symbols or images used.\n"
            f"(c) How does the setting contribute to the theme?\n"
            f"(d) What is your personal response to the theme? Do you agree with the author's perspective?\n"
            f"(e) How is this theme relevant to contemporary Indian society?"
        )
        answer = (
            f"(a) The author develops the theme through the protagonist's internal conflict "
            f"and choices. The character's struggles mirror the universal tension between "
            f"individual desire and social duty.\n\n"
            f"(b) Symbol 1: The journey represents life's path. Symbol 2: The closed door "
            f"symbolizes obstacles and opportunities.\n\n"
            f"(c) The rural Indian setting highlights traditional values, while the urban "
            f"elements represent modern aspirations, creating the thematic tension.\n\n"
            f"(d) The theme resonates deeply as many young Indians today face similar "
            f"conflicts between family expectations and personal dreams.\n\n"
            f"(e) This theme is highly relevant in contemporary India, where rapid "
            f"globalization creates new conflicts between tradition and modernity."
        )
        explanation = (
            "Literary analysis requires examining how authors use literary elements "
            "(characterization, symbolism, setting) to develop themes, and connecting "
            "those themes to personal and social contexts."
        )
        return _make_la(
            _uid("prose", idx), "prose_analysis", question, answer,
            "hard", explanation, competency, 8,
            steps=[
                "Step 1: Identify the key characters and their roles.",
                "Step 2: Analyze how characterization develops the theme.",
                "Step 3: Identify significant symbols and their meanings.",
                "Step 4: Analyze the contribution of setting.",
                "Step 5: Connect the theme to personal and social contexts.",
                "Step 6: Structure the analysis into a coherent essay.",
            ]
        )


def _gen_poetry(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    item = rng.choice(POETIC_DEVICES)
    line, device, desc = item
    if competency == "standard":
        question = f"Identify the poetic device used in the following line and explain it:\n\"{line}\""
        options_vals = [device]
        all_devices = ["Simile", "Metaphor", "Personification", "Alliteration", "Onomatopoeia", "Hyperbole", "Oxymoron", "Imagery"]
        for d in all_devices:
            if d != device:
                options_vals.append(d)
        distractors = options_vals[1:4]
        explanation = f"The poetic device used is {device}. {desc}. This enhances the imagery and emotional impact of the poem."
        return _make_mcq(
            _uid("poetry", idx), "poetry_analysis",
            question, device, distractors,
            "easy", explanation, competency, 2,
            steps=[
                "Step 1: Read the line carefully and notice any special features.",
                f"Step 2: Recall the definition of {device}: {desc}",
                "Step 3: Verify that the line matches the definition.",
                "Step 4: Select the correct poetic device.",
            ]
        )
    else:
        name = rng.choice(INDIAN_FIRST)
        question = (
            f"{name} is analyzing a poem that explores the relationship between "
            f"nature and humanity. The poem contains the following lines:\n\n"
            f"(a) \"{line}\"\n"
            f"(b) \"The river flows like a silver ribbon through the valley.\"\n"
            f"(c) \"The mountains stood guard over the sleeping village.\"\n\n"
            f"Analyze these lines:\n"
            f"(1) Identify the poetic device used in each line.\n"
            f"(2) Explain the imagery created by each line.\n"
            f"(3) Discuss how these devices contribute to the overall theme of nature's beauty "
            f"and its connection to human life.\n"
            f"(4) Relate the imagery to Indian natural landscapes you have experienced."
        )
        answer = (
            "(1) (a) Alliteration, (b) Simile, (c) Personification\n"
            "(2) (a) Creates a musical, flowing effect. (b) Creates a vivid visual image. "
            "(c) Gives nature a protective, nurturing role.\n"
            "(3) These devices make nature feel alive and close to human experience, "
            "emphasizing the deep connection between the natural world and human emotions.\n"
            "(4) [Personal response — e.g., the Western Ghats remind me of the "
            "mountains in the poem, lush and protective.]"
        )
        explanation = (
            "Poetry analysis requires identifying literary devices, understanding their "
            "effect on imagery and emotion, and connecting the poem's themes to personal "
            "and cultural experiences."
        )
        return _make_la(
            _uid("poetry", idx), "poetry_analysis", question, answer,
            "hard", explanation, competency, 6,
            steps=[
                "Step 1: Read each line carefully and identify the poetic device.",
                "Step 2: Analyze the imagery created by each device.",
                "Step 3: Explain how devices contribute to the overall theme.",
                "Step 4: Connect the imagery to personal experience of nature.",
                "Step 5: Synthesize the analysis into a coherent response.",
            ]
        )


def _gen_drama(rng: random.Random, competency: str) -> Dict[str, Any]:
    idx = rng.randint(0, 100)
    if competency == "standard":
        element = rng.choice(DRAMA_ELEMENTS)
        question = f"What is the significance of '{element}' in a drama?"
        answer = (
            f"'{element}' is a fundamental element of drama. "
            f"It helps build tension, develop characters, and engage the audience. "
            f"In a well-constructed drama, this element creates interest and drives "
            f"the narrative toward its climax and resolution."
        )
        explanation = (
            "Drama elements work together to create a compelling theatrical experience. "
            "Each element serves a specific purpose in developing the plot and engaging the audience."
        )
        return _make_sa(
            _uid("drama", idx), "drama_elements", question, answer,
            "medium", explanation, competency, 2,
            steps=[
                "Step 1: Define the dramatic element.",
                "Step 2: Explain its function in a drama.",
                "Step 3: Give an example from a known play.",
                "Step 4: Summarize its significance.",
            ]
        )
    else:
        name = rng.choice(INDIAN_FIRST)
        school = rng.choice(INDIAN_SCHOOLS)
        question = (
            f"{name} is directing a short play for the annual function of {school}. "
            f"The play is about a student who stands up against bullying in school. "
            f"As the director, {name} needs to:\n\n"
            f"(a) Write a script for the opening scene (dialogue between the protagonist "
            f"and a friend) that establishes the problem\n"
            f"(b) Explain how stage directions would enhance the scene\n"
            f"(c) Describe how dramatic irony could be used in a later scene\n"
            f"(d) Explain how the climax and resolution would be structured"
        )
        answer = (
            "(a) [Script opening] Protagonist: 'I saw Raj being bullied again today.' "
            "Friend: 'Did you tell the teacher?' Protagonist: 'What if they target me next?'\n\n"
            "(b) Stage directions: [The classroom is dimly lit. RAJ sits alone at his desk, "
            "head down. The BULLIES enter from stage right, whispering and smirking.]\n\n"
            "(c) Dramatic irony: The audience knows the principal is watching from the staff room, "
            "but the characters do not — creating tension.\n\n"
            "(d) Climax: Protagonist decides to speak up in assembly. "
            "Resolution: The school implements an anti-bullying policy."
        )
        explanation = (
            "This competency-based question applies dramatic elements to a practical "
            "theatrical scenario. It requires understanding how scripts, stage directions, "
            "dramatic irony, and plot structure work together in a real performance context."
        )
        return _make_la(
            _uid("drama", idx), "drama_elements", question, answer,
            "hard", explanation, competency, 7,
            steps=[
                "Step 1: Conceptualize the scene and characters.",
                "Step 2: Write dialogue that establishes conflict.",
                "Step 3: Plan stage directions for visual storytelling.",
                "Step 4: Incorporate dramatic irony for audience engagement.",
                "Step 5: Structure the climax and resolution.",
            ]
        )


# ═══════════════════════════════════════════════════════════════
#  TOPIC REGISTRY
# ═══════════════════════════════════════════════════════════════

GRAMMAR_GENERATORS = {
    "tenses": _gen_tenses,
    "voice": _gen_voice,
    "reported_speech": _gen_reported_speech,
    "clauses": _gen_clauses,
    "prepositions": _gen_prepositions,
    "determiners": _gen_determiners,
    "subject_verb_agreement": _gen_sv_agreement,
    "transformation": _gen_transformation,
    "figures_of_speech": _gen_figures_of_speech,
}

WRITING_GENERATORS = {
    "notice_writing": _gen_notice,
    "email_writing": _gen_email,
    "article_writing": _gen_article,
    "report_writing": _gen_report,
    "diary_entry": _gen_diary,
    "letter_writing": _gen_letter,
}

COMPREHENSION_GENERATORS = {
    "unseen_passage": _gen_comprehension,
    "vocabulary_in_context": _gen_vocabulary,
}

LITERATURE_GENERATORS = {
    "prose_analysis": _gen_prose,
    "poetry_analysis": _gen_poetry,
    "drama_elements": _gen_drama,
}

ALL_GENERATORS = {}
ALL_GENERATORS.update(GRAMMAR_GENERATORS)
ALL_GENERATORS.update(WRITING_GENERATORS)
ALL_GENERATORS.update(COMPREHENSION_GENERATORS)
ALL_GENERATORS.update(LITERATURE_GENERATORS)

ALL_TOPICS = list(ALL_GENERATORS.keys())


# ═══════════════════════════════════════════════════════════════
#  MAIN INTERFACE
# ═══════════════════════════════════════════════════════════════

def generate_questions(seed: int, count: int, topic: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Generate a list of CISCE Class 11 English practice questions.

    Args:
        seed: Random seed for reproducibility.
        count: Number of questions to generate.
        topic: Optional topic filter. If None, questions are generated
               from all available topics.

    Returns:
        List of question dictionaries, each containing:
        - id, type, topic, question_text, options, answer,
        - steps, explanation, difficulty, bloom_level,
        - competency_type (standard / competency_based),
        - marks
    """
    rng = random.Random(seed)
    questions = []

    available_topics = [topic] if topic and topic in ALL_GENERATORS else ALL_TOPICS

    for i in range(count):
        # 50/50 split for competency-based vs standard
        competency = "standard" if rng.random() < 0.5 else "competency_based"

        # Pick a topic
        chosen_topic = rng.choice(available_topics)
        generator_func = ALL_GENERATORS[chosen_topic]

        # Generate the question
        q = generator_func(rng, competency)
        questions.append(q)

    return questions


def print_questions(questions: List[Dict[str, Any]], show_answer: bool = False) -> None:
    """Pretty-print a list of questions."""
    for q in questions:
        print("=" * 70)
        print(f"ID:       {q['id']}")
        print(f"Type:     {q['type'].upper()}")
        print(f"Topic:    {q['topic']}")
        print(f"Difficulty: {q['difficulty']}")
        print(f"Bloom:    {q['bloom_level']}")
        print(f"Competency: {q['competency_type']}")
        print(f"Marks:    {q['marks']}")
        print("-" * 70)
        print(q['question_text'])
        if q['options']:
            print()
            for opt in q['options']:
                print(f"  {opt}")
        if show_answer:
            print("-" * 70)
            print(f"ANSWER: {q['answer']}")
            print()
            print("STEPS:")
            for step in q['steps']:
                print(f"  - {step}")
            print()
            print(f"EXPLANATION: {q['explanation']}")
        print()


def print_summary(questions: List[Dict[str, Any]]) -> None:
    """Print a summary of generated questions."""
    topics = {}
    types = {}
    competencies = {}
    difficulties = {}
    total_marks = 0

    for q in questions:
        topics[q['topic']] = topics.get(q['topic'], 0) + 1
        types[q['type']] = types.get(q['type'], 0) + 1
        competencies[q['competency_type']] = competencies.get(q['competency_type'], 0) + 1
        difficulties[q['difficulty']] = difficulties.get(q['difficulty'], 0) + 1
        total_marks += q['marks']

    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Total questions: {len(questions)}")
    print(f"Total marks:     {total_marks}")
    print()
    print("By Topic:")
    for t, c in sorted(topics.items()):
        print(f"  {t}: {c}")
    print()
    print("By Type:")
    for t, c in sorted(types.items()):
        print(f"  {t}: {c}")
    print()
    print("By Competency Type:")
    for c, count in sorted(competencies.items()):
        print(f"  {c}: {count}")
    print()
    print("By Difficulty:")
    for d, c in sorted(difficulties.items()):
        print(f"  {d}: {c}")


def main() -> None:
    """Demonstrate the question generator with sample output."""
    print("CISCE Class 11 English — Deterministic Question Generator")
    print("=" * 70)

    # Generate 6 sample questions (3 standard, 3 competency-based)
    sample_seed = 42
    questions = generate_questions(seed=sample_seed, count=6)

    print(f"\nGenerated {len(questions)} questions with seed={sample_seed}")
    print()

    # Print questions with answers
    print_questions(questions, show_answer=True)

    # Print summary
    print_summary(questions)

    # Demonstrate reproducibility
    print("\n" + "=" * 70)
    print("REPRODUCIBILITY CHECK")
    print("=" * 70)
    questions2 = generate_questions(seed=sample_seed, count=6)
    same = all(q1['id'] == q2['id'] for q1, q2 in zip(questions, questions2))
    print(f"Same seed={sample_seed} produces identical results: {same}")

    # Demonstrate different seed
    questions3 = generate_questions(seed=99, count=3)
    different = any(q1['id'] != q2['id'] for q1, q2 in zip(questions[:3], questions3))
    print(f"Different seed=99 produces different results: {different}")

    # Demonstrate topic filtering
    print("\n" + "=" * 70)
    print("TOPIC FILTERING: Grammar only")
    print("=" * 70)
    grammar_qs = generate_questions(seed=100, count=3, topic="tenses")
    print_questions(grammar_qs, show_answer=False)

    # Demonstrate all topics
    print("\n" + "=" * 70)
    print("GENERATING 12 QUESTIONS ACROSS ALL TOPICS")
    print("=" * 70)
    all_qs = generate_questions(seed=200, count=12)
    print_questions(all_qs, show_answer=False)
    print_summary(all_qs)


if __name__ == '__main__':
    main()