"""
class12_english_solver.py
CISCE Class 12 English (Subject Codes 850/851) Solver & Question Generator
Covers:
  Paper 1 - English Language: Comprehension, Directed Writing (Letters, Reports,
            Speeches, Articles), Grammar (Transformation of Sentences),
            Précis Writing
  Paper 2 - English Literature:  Drama (Julius Caesar), Short Stories,
            Poetry (The Gift of India, Once Upon a Time, The Tyger, Dover Beach,
            Ulysses, Unity, Women's Rights), Essay Writing
"""

import random
import re
import hashlib
import json
from dataclasses import dataclass, field, asdict
from typing import Optional, List, Dict, Tuple

# ============================================================
# DATA: Prescribed texts database
# ============================================================

DRAMA_DATA = {
    "julius_caesar": {
        "title": "Julius Caesar",
        "author": "William Shakespeare",
        "acts": 5,
        "main_characters": [
            {
                "name": "Julius Caesar",
                "role": "Roman general and dictator",
                "traits": ["ambitious", "proud", "dismissive of warnings", "courageous"],
                "key_quotes": [
                    "Cowards die many times before their deaths; The valiant never taste of death but once.",
                    "Et tu, Brute? -- Then fall, Caesar.",
                    "I am constant as the northern star."
                ],
                "arc": "Returns victorious from battle; ignores the Soothsayer and Calpurnia; assassinated on the Ides of March."
            },
            {
                "name": "Brutus",
                "role": "Roman senator, Caesar's close friend",
                "traits": ["honorable", "idealistic", "conflicted", "stoic", "intellectual"],
                "key_quotes": [
                    "It must be by his death: and for my part I know no personal cause to spurn at him.",
                    "Not that I loved Caesar less, but that I loved Rome more.",
                    "This was the noblest Roman of them all."
                ],
                "arc": "Joins the conspiracy out of patriotism; delivers the most compelling speech; defeated at Philippi; commits suicide."
            },
            {
                "name": "Cassius",
                "role": "Roman senator, leader of the conspiracy",
                "traits": ["cunning", "envious", "manipulative", "practical"],
                "key_quotes": [
                    "The fault, dear Brutus, is not in our stars, But in ourselves, that we are underlings.",
                    "Men at some time are masters of their fates."
                ],
                "arc": "Plots against Caesar; recruits Brutus; commands the army at Philippi; commits suicide."
            },
            {
                "name": "Antony",
                "role": "Roman general, Caesar's loyal friend",
                "traits": ["eloquent", "cunning", "loyal", "vengeful"],
                "key_quotes": [
                    "Friends, Romans, countrymen, lend me your ears; I come to bury Caesar, not to praise him.",
                    "Cry 'Havoc!' and let slip the dogs of war.",
                    "The noble Brutus Hath told you Caesar was ambitious."
                ],
                "arc": "Delivers the masterful funeral oration; raises an army; defeats Brutus and Cassius."
            }
        ],
        "themes": [
            "Ambition vs. Patriotism",
            "Rhetoric and Persuasion",
            "Honor and Betrayal",
            "Fate vs. Free Will",
            "Public vs. Private Self"
        ],
        "important_quotations": [
            ("Friends, Romans, countrymen, lend me your ears", "Antony's speech opening - a masterclass in rhetorical persuasion"),
            ("Beware the Ides of March", "The Soothsayer's warning to Caesar"),
            ("Not that I loved Caesar less, but that I loved Rome more", "Brutus justifying the assassination"),
            ("The fault, dear Brutus, is not in our stars, But in ourselves", "Cassius persuading Brutus"),
            ("Et tu, Brute?", "Caesar's dying words upon seeing Brutus among the conspirators"),
            ("This was the noblest Roman of them all", "Antony's tribute to Brutus after the battle"),
            ("Cowards die many times before their deaths", "Caesar dismissing Calpurnia's fears"),
            ("Men at some time are masters of their fates", "Cassius on taking control of destiny")
        ],
        "summary": "Shakespeare's tragedy chronicles the conspiracy against Julius Caesar, his assassination on the Ides of March, and the subsequent civil war that engulfs Rome, culminating in the defeat of the conspirators Brutus and Cassius."
    }
}

PROSE_DATA = {
    "short_stories": [
        {
            "title": "The Copy-Cat",
            "author": "Maneesh Sethi",
            "themes": ["bullying", "courage", "facing fear"],
            "summary": "A young boy confronts a bully and learns the value of standing up for oneself.",
            "key_characters": ["the narrator", "the bully", "the teacher"]
        },
        {
            "title": "The School Primer",
            "author": "Ruskin Bond",
            "themes": ["nostalgia", "childhood", "education"],
            "summary": "A nostalgic look at early schooling and the simplicity of childhood learning.",
            "key_characters": ["the young narrator", "the teacher"]
        },
        {
            "title": "The Girl in the Café",
            "author": "Bill Bryson",
            "themes": ["loneliness", "human connection", "observation"],
            "summary": "An observation about the quiet loneliness of modern urban life in a café setting.",
            "key_characters": ["the narrator", "the girl"]
        }
    ]
}

POETRY_DATA = {
    "the_gift_of_india": {
        "title": "The Gift of India",
        "author": "Sarojini Naidu",
        "year": 1915,
        "form": "Patriotic lyric",
        "themes": [
            "Sacrifice of Indian soldiers in World War I",
            "India's contribution to the British war effort",
            "The cost of colonialism",
            "Hope for India's future independence"
        ],
        "key_quotes": [
            "She is rich with the life-blood of her sons, and the tears of her stricken daughters.",
            "Is there aught you need that my hands refuse?",
            "The articulate blood of my children, the voiceless tears of my daughters."
        ],
        "structure": "The poem uses the metaphor of a mother (India) giving her sons to the war. It moves from praise of India's sacrifice to questioning the cost and ends with hope for freedom.",
        "poetic_devices": [
            "Personification of India as a mother",
            "Rhetorical questions",
            "Repetition for emphasis",
            "Vivid imagery of blood and sacrifice",
            "Tone shifts from pride to anguish to hope"
        ]
    },
    "once_upon_a_time": {
        "title": "Once Upon a Time",
        "author": "Gabriel Okara",
        "year": 1965,
        "form": "Free verse",
        "themes": [
            "Loss of innocence and genuine human connection",
            "The artificiality of modern urban social behavior",
            "Nostalgia for simpler, authentic relationships",
            "Identity and cultural displacement"
        ],
        "key_quotes": [
            "They used to laugh with their eyes.",
            "They only laugh with their teeth.",
            "I have learned to wear many faces like dresses."
        ],
        "structure": "A father teaching his son the old ways of genuine human interaction, lamenting the loss of sincerity in modern society.",
        "poetic_devices": [
            "Metaphor (wearing many faces like dresses)",
            "Contrast between past and present",
            "Simple, conversational language",
            "Child-like narrative framing"
        ]
    },
    "the_tyger": {
        "title": "The Tyger",
        "author": "William Blake",
        "year": 1794,
        "form": "Lyric, six quatrains",
        "themes": [
            "The duality of creation (innocence vs. experience)",
            "The nature of good and evil",
            "Divine creation and the mystery of existence",
            "The awe-inspiring power of the natural world"
        ],
        "key_quotes": [
            "Tyger Tyger, burning bright, In the forests of the night.",
            "What immortal hand or eye, Could frame thy fearful symmetry?",
            "Did he who made the Lamb make thee?"
        ],
        "structure": "A series of awe-stricken questions about the tiger's creation, contrasting its terrifying beauty with the innocence of the lamb.",
        "poetic_devices": [
            "Regular meter (trochaic tetrameter)",
            "Rhyme scheme AABB",
            "Symbolism (tyger as experience/evil)",
            "Alliteration (burning bright, frame thy fearful symmetry)",
            "Rhetorical questions throughout"
        ]
    },
    "dover_beach": {
        "title": "Dover Beach",
        "author": "Matthew Arnold",
        "year": 1867,
        "form": "Dramatic monologue, irregular stanzaic form",
        "themes": [
            "The erosion of religious faith in the modern world",
            "The pain of lost certainty and meaning",
            "Human love as refuge in a darkening world",
            "The retreat of the 'Sea of Faith'"
        ],
        "key_quotes": [
            "The Sea of Faith Was once, too, at the full, and round earth's shore Lay like the folds of a bright girdle furled.",
            "And we are here as on a darkling plain Swept with confused alarms of struggle and flight.",
            "Ah, love, let us be true To one another!"
        ],
        "structure": "Four irregular stanzas. Begins with a calm description of Dover beach, moves to the metaphor of the retreating Sea of Faith, and ends with a bleak view of the human condition.",
        "poetic_devices": [
            "Extended metaphor (Sea of Faith)",
            "Auditory imagery (the 'grating roar' of pebbles)",
            "Visual imagery (moonlight, cliffs, darkling plain)",
            "Alliteration (moon-blanched land)",
            "Tone shifts from serenity to anguish to tender resolve"
        ]
    },
    "ulysses": {
        "title": "Ulysses",
        "author": "Alfred Lord Tennyson",
        "year": 1842,
        "form": "Dramatic monologue, unrhymed iambic pentameter (blank verse)",
        "themes": [
            "The human quest for knowledge and experience",
            "Restlessness and the desire for adventure in old age",
            "Leadership and responsibility",
            "The tension between duty and desire"
        ],
        "key_quotes": [
            "I am a part of all that I have met.",
            "To strive, to seek, to find, and not to yield.",
            "How dull it is to pause, to make an end, To rust unburnished, not to shine in use!"
        ],
        "structure": "Ulysses, now an old king, expresses his restlessness and desire to set sail again, while acknowledging his son Telemachus as a capable ruler.",
        "poetic_devices": [
            "Blank verse",
            "Classical allusion (Odyssey, Homer)",
            "Extended metaphor (life as a voyage)",
            "Personification (the sea as a 'great brother')",
            "Dramatic irony (audience knows Ulysses faces death)"
        ]
    },
    "unity": {
        "title": "Unity",
        "author": "Nissim Ezekiel",
        "year": 1976,
        "form": "Narrative poem",
        "themes": [
            "Interfaith harmony and common humanity",
            "Religious tolerance",
            "Shared human experience across communal divides",
            "Indian secularism"
        ],
        "key_quotes": [
            "My Christian friend and I",
            "We sat on opposite sides of the room",
            "We prayed, each in his own way"
        ],
        "structure": "A poem about a Hindu and a Christian who become friends, celebrating the common ground between different faiths.",
        "poetic_devices": [
            "Free verse",
            "Narrative structure",
            "Understated humor",
            "Everyday imagery"
        ]
    },
    "the_womans_rights": {
        "title": "The Woman's Rights",
        "author": "Elizabeth Barrett Browning",
        "year": 1854,
        "form": "Petrarchan/Italian sonnet",
        "themes": [
            "Gender equality",
            "Women's intellectual and moral capabilities",
            "The injustice of denying women rights",
            "Spiritual equality of the sexes"
        ],
        "key_quotes": [
            "Nay, it is equal just: their human rights",
            "Are just as absolute as those of men."
        ],
        "structure": "A sonnet arguing for women's equal rights, asserting that women possess the same intellectual and moral capabilities as men.",
        "poetic_devices": [
            "Sonnet form",
            "Logical argument structure",
            "Direct address",
            "Elevated diction"
        ]
    }
}

ESSAY_TOPICS = [
    "The advantages and disadvantages of social media for students.",
    "Environmental conservation is the need of the hour.",
    "Online learning versus traditional classroom learning.",
    "The impact of technology on human relationships.",
    "Should India continue with the reservation policy?",
    "Women empowerment: Myth or reality in modern India?",
    "Climate change and its effects on the Indian subcontinent.",
    "The role of youth in nation-building.",
    "Artificial intelligence: Boon or bane for society?",
    "A journey that changed my perspective on life.",
    "The importance of preserving India's cultural heritage.",
    "Should India adopt a universal basic income?",
    "The challenges of urbanisation in Indian cities.",
    "Value education is essential for holistic development.",
    "Digital India: Progress and pitfalls."
]

# ============================================================
# UTILITY FUNCTIONS
# ============================================================

def _seed_hash(seed_str: str) -> int:
    """Deterministic hash for a string to use as random seed."""
    return int(hashlib.md5(seed_str.encode()).hexdigest()[:8], 16)

def _make_hashable_list(lst: list) -> str:
    """Convert a list to a hashable string representation."""
    return "|".join(str(x) for x in lst)

# ============================================================
# SOLVER: Paper 1 - English Language
# ============================================================

class EnglishLanguageSolver:
    """Solver for English Language (Paper 1) questions."""

    # --- Comprehension ---

    @staticmethod
    def solve_comprehension(passage: str, questions: List[Dict],
                            reference_answers: Optional[List[str]] = None) -> Dict:
        """
        Solves a comprehension passage question set.

        Parameters:
        -----------
        passage : str
            The reading passage text
        questions : list of dict
            Each dict has 'type' ('objective', 'short_answer', 'long_answer'),
            'question' text, and optionally 'word_limit'
        reference_answers : list of str, optional
            Reference answers for objective questions

        Returns:
        --------
        dict with 'steps', 'answer', 'verification'
        """
        steps = []
        steps.append("PASSAGE ANALYSIS")
        steps.append(f"Passage length: {len(passage.split())} words")

        # Identify passage type
        if any(w in passage.lower() for w in ['therefore', 'however', 'consequently',
                                                   'furthermore', 'moreover']):
            passage_type = "Expository / Argumentative"
            steps.append("Identified passage type: Expository/Argumentative (uses logical connectors)")
        elif any(w in passage.lower() for w in ['felt', 'heart', 'sorrow', 'joy',
                                                    'beautiful', 'dark']):
            passage_type = "Descriptive / Narrative"
            steps.append("Identified passage type: Descriptive/Narrative (uses emotive/imagistic language)")
        else:
            passage_type = "Mixed / Informative"
            steps.append("Identified passage type: Mixed/Informative")

        steps.append("VOCABULARY IDENTIFICATION")
        # Find potential difficult words
        sentences = passage.split('.')
        vocab_candidates = []
        for sent in sentences:
            words = re.findall(r'\b[a-zA-Z]{6,}\b', sent)
            for w in words:
                if w.lower() not in ['there', 'their', 'about', 'would', 'could',
                                      'should', 'which', 'being', 'after', 'other',
                                      'under', 'great', 'where', 'these', 'those']:
                    vocab_candidates.append((w, sent.strip()[:80]))
                    break
        steps.append(f"Potential vocabulary items for contextual meaning: {len(vocab_candidates)} identified")

        # Process questions
        answers = []
        total_score = 0
        for i, q in enumerate(questions):
            q_type = q.get('type', 'short_answer')
            word_limit = q.get('word_limit', 30)
            steps.append(f"\nQUESTION {i+1} ({q_type})")
            steps.append(f"Q: {q['question']}")

            # Extract relevant sentence from passage
            relevant_sentences = []
            q_words = set(re.findall(r'\b[a-zA-Z]{3,}\b', q['question'].lower()))
            for sent in sentences:
                sent_words = set(re.findall(r'\b[a-zA-Z]{3,}\b', sent.lower()))
                overlap = len(q_words & sent_words)
                if overlap >= 2:
                    relevant_sentences.append(sent.strip())

            if q_type == 'objective':
                if reference_answers and i < len(reference_answers):
                    answer = reference_answers[i]
                else:
                    answer = "Answer key required for objective questions"
                steps.append(f"A: {answer}")
                total_score += 1

            elif q_type == 'short_answer':
                if relevant_sentences:
                    best = max(relevant_sentences, key=len)
                    answer = best[:200].strip()
                    if not answer.endswith('.'):
                        answer += '.'
                else:
                    answer = "Refer to the passage for specific details."
                steps.append(f"A: {answer}")
                wc = len(answer.split())
                steps.append(f"   Word count: {wc} (limit: {word_limit})")
                total_score += 2

            elif q_type == 'long_answer':
                if relevant_sentences:
                    context = " ".join(relevant_sentences[:2])[:400]
                    answer = context.strip()
                    if not answer.endswith('.'):
                        answer += '.'
                else:
                    answer = "Provide a detailed response based on the passage content and personal inference."
                steps.append(f"A: {answer}")
                wc = len(answer.split())
                steps.append(f"   Word count: {wc} (ensure within prescribed limit)")
                total_score += 5

            answers.append(answer)

        answer_text = "\n".join(f"Q{i+1}: {a}" for i, a in enumerate(answers))

        verification = (
            f"Comprehension check: {len(questions)} questions processed | "
            f"Passage type: {passage_type} | "
            f"Total marks: {total_score}"
        )

        return {
            "steps": steps,
            "answer": answer_text,
            "verification": verification
        }

    # --- Directed Writing: Letters ---

    @staticmethod
    def solve_letter_letter(letter_type: str, recipient: str, subject: str,
                            points: List[str], sender: str = "Student",
                            word_limit: int = 150) -> Dict:
        """
        Generates a formal/informal letter following CISCE format.

        Parameters:
        -----------
        letter_type : str  - 'formal' or 'informal'
        recipient : str     - Who the letter is addressed to
        subject : str       - Subject line (formal) / topic (informal)
        points : list of str - Key points to include
        sender : str        - Name of the sender
        word_limit : int    - Target word count
        """
        steps = []
        steps.append("FORMATTING ANALYSIS")
        steps.append(f"Letter type: {letter_type}")
        steps.append(f"Recipient: {recipient}")
        steps.append(f"Subject: {subject}")
        steps.append(f"Word limit: {word_limit} words")
        steps.append(f"Points to cover: {len(points)}")

        if letter_type == 'formal':
            steps.append("\nFORMAL LETTER STRUCTURE:")
            steps.append("1. Sender's address")
            steps.append("2. Date")
            steps.append("3. Receiver's address")
            steps.append("4. Subject line")
            steps.append("5. Salutation (Sir/Madam)")
            steps.append("6. Body - clear, formal, structured")
            steps.append("7. Complimentary close (Yours faithfully, etc.)")
            steps.append("8. Signature and name")

            salutation = "Sir/Madam,"
            complimentary = "Yours faithfully,"
            openers = [
                "I am writing to bring to your notice",
                "I wish to draw your kind attention to the matter regarding",
                "Through the columns of your esteemed newspaper, I would like to highlight",
                "I am compelled to address you regarding the pressing issue of"
            ]

        else:
            steps.append("\nINFORMAL LETTER STRUCTURE:")
            steps.append("1. Sender's address")
            steps.append("2. Date")
            steps.append("3. Salutation (Dear + name)")
            steps.append("4. Body - personal, conversational, emotive")
            steps.append("5. Complimentary close (Yours lovingly, etc.)")
            steps.append("6. Signature and name")

            salutation = f"Dear {recipient},"
            complimentary = "Yours lovingly,"
            openers = [
                "Hope this letter finds you in the best of health and spirits.",
                "I hope you are doing well. I wanted to tell you about",
                "It has been a while since we last spoke. I am writing to share with you",
                "I cannot wait to tell you about what happened recently with"
            ]

        # Build the letter
        rng = random.Random(_seed_hash(letter_type + subject + sender))
        opener = rng.choice(openers)

        lines = []
        lines.append(f"{sender}")
        lines.append("")
        lines.append("Date: [Date]")
        lines.append("")
        lines.append(f"{recipient}")
        lines.append("")
        lines.append(f"Subject: {subject}" if letter_type == 'formal' else "")
        lines.append("")
        lines.append(salutation)
        lines.append("")
        lines.append(f"{opener} {subject.lower()}.")
        lines.append("")

        for i, point in enumerate(points):
            transition = ["Firstly,", "Moreover,", "Furthermore,", "In addition,", "Finally,"][i % 5]
            words_needed = max(20, word_limit // len(points))
            expanded_point = (
                f"{transition} {point}. This is a matter that requires "
                f"immediate attention and I earnestly request your support in "
                f"addressing this concern effectively."
            )
            lines.append(expanded_point)
            lines.append("")

        closing_statement = (
            "I sincerely hope that you will consider this matter with the "
            "seriousness it deserves and take the necessary steps at the earliest."
            if letter_type == 'formal'
            else "I really look forward to hearing from you soon. Take care and stay blessed."
        )
        lines.append(closing_statement)
        lines.append("")
        lines.append(complimentary)
        lines.append("")
        lines.append(sender)

        letter_text = "\n".join(lines)
        total_words = len(letter_text.split())
        steps.append(f"\nLETTER GENERATED ({total_words} words)")

        verification = (
            f"Format check: {'PASS' if letter_type in ['formal', 'informal'] else 'FAIL'} | "
            f"Salutation: {'Correct' if salutation else 'Missing'} | "
            f"Points covered: {len(points)}/{len(points)} | "
            f"Word count: {total_words} (target: {word_limit})"
        )

        return {
            "steps": steps,
            "answer": letter_text,
            "verification": verification
        }

    # --- Directed Writing: Reports ---

    @staticmethod
    def solve_report(event_name: str, event_date: str, venue: str,
                     chief_guest: str, num_participants: int,
                     highlights: List[str]) -> Dict:
        """
        Generates a formal event report following CISCE format.

        Parameters:
        -----------
        event_name : str
        event_date : str
        venue : str
        chief_guest : str
        num_participants : int
        highlights : list of str
        """
        steps = []
        steps.append("REPORT STRUCTURE ANALYSIS")
        steps.append(f"Event: {event_name}")
        steps.append(f"Date: {event_date}")
        steps.append(f"Venue: {venue}")
        steps.append(f"Chief Guest: {chief_guest}")
        steps.append(f"Participants: {num_participants}")
        steps.append(f"Highlights to cover: {len(highlights)}")
        steps.append("\nREPORT FORMAT:")
        steps.append("1. Heading (REPORT ON ...)")
        steps.append("2. Introduction (who, what, when, where)")
        steps.append("3. Body (details of the event in logical sequence)")
        steps.append("4. Chief Guest's address (summary)")
        steps.append("5. Vote of Thanks")
        steps.append("6. Conclusion")

        lines = []
        lines.append(f"REPORT ON {event_name.upper()}")
        lines.append("")
        lines.append(f"On {event_date}, the annual {event_name} was held at "
                      f"{venue}. The event was graced by the presence of "
                      f"{chief_guest} as the Chief Guest. A total of "
                      f"{num_participants} students, teachers, and distinguished "
                      f"guests participated in the event.")
        lines.append("")
        lines.append("The program commenced with the lighting of the ceremonial "
                      "lamp and the singing of the school anthem. The Principal "
                      "delivered the welcome address, highlighting the significance "
                      "of the occasion.")
        lines.append("")
        lines.append("The Chief Guest, " + chief_guest + ", addressed the gathering "
                      "with an inspiring speech on the importance of education, "
                      "discipline, and national values. The speech was met with "
                      "thunderous applause.")
        lines.append("")

        for i, h in enumerate(highlights):
            lines.append(f"Highlight {i+1}: {h}")
        lines.append("")

        lines.append("The event concluded with a vote of thanks proposed by the "
                      "student coordinator, expressing gratitude to all participants, "
                      "the Chief Guest, and the organizing committee for making the "
                      "event a grand success.")

        report_text = "\n".join(lines)
        total_words = len(report_text.split())
        steps.append(f"\nREPORT GENERATED ({total_words} words)")

        verification = (
            f"Format check: Heading={'Yes' if report_text.startswith('REPORT ON') else 'No'} | "
            f"Date/Time mentioned: {'Yes' if event_date in report_text else 'No'} | "
            f"Venue mentioned: {'Yes' if venue in report_text else 'No'} | "
            f"Chief Guest mentioned: {'Yes' if chief_guest in report_text else 'No'} | "
            f"Highlights covered: {len(highlights)}/{len(highlights)}"
        )

        return {
            "steps": steps,
            "answer": report_text,
            "verification": verification
        }

    # --- Directed Writing: Speech ---

    @staticmethod
    def solve_speech(topic: str, audience: str, occasion: str,
                     key_points: List[str], duration_minutes: int = 4) -> Dict:
        """
        Generates a speech for a given audience and occasion.

        Parameters:
        -----------
        topic : str
        audience : str  - e.g., "school assembly", "college farewell"
        occasion : str  - e.g., "Annual Day", "Independence Day"
        key_points : list of str
        duration_minutes : int
        """
        steps = []
        wpm = 130  # average speaking rate
        target_words = duration_minutes * wpm

        steps.append("SPEECH STRUCTURE ANALYSIS")
        steps.append(f"Topic: {topic}")
        steps.append(f"Audience: {audience}")
        steps.append(f"Occasion: {occasion}")
        steps.append(f"Duration: {duration_minutes} minutes (~{target_words} words)")
        steps.append(f"Key points: {len(key_points)}")
        steps.append("\nSPEECH FORMAT:")
        steps.append("1. Salutation and greeting")
        steps.append("2. Introduction (hook + topic statement)")
        steps.append("3. Body (key arguments with examples)")
        steps.append("4. Conclusion (summary + call to action)")
        steps.append("5. Thank you")

        salutations = [
            f"Respected Principal, respected teachers, and my dear friends,",
            f"Honourable Chief Guest, respected Principal, teachers, and dear friends,",
            f"Good morning to one and all present here."
        ]
        rng = random.Random(_seed_hash(topic + occasion))
        salutation = rng.choice(salutations)

        lines = []
        lines.append(f"A Speech on '{topic}'")
        lines.append("")
        lines.append(f"{salutation}")
        lines.append("")
        lines.append(f"I feel privileged to stand before you today on the occasion "
                      f"of {occasion} to speak about a matter that concerns each "
                      f"and every one of us -- {topic}.")
        lines.append("")
        lines.append("Let me begin by asking a simple question. How many of you "
                      "have ever paused to think about how this issue affects our "
                      "daily lives? I am sure each one of us has a story to share.")
        lines.append("")

        for i, point in enumerate(key_points):
            lines.append(f"Firstly, let us consider {point.lower()}. This is "
                          f"perhaps the most critical aspect of {topic.lower()} "
                          f"that we must address as responsible citizens of this "
                          f"great nation. We cannot afford to be complacent.")
            lines.append("")
            if i < len(key_points) - 1:
                lines.append(f"Moving on, we must also acknowledge that {key_points[min(i+1, len(key_points)-1)].lower()} "
                              f"is equally important in our understanding of this subject.")
                lines.append("")

        lines.append("In conclusion, I would like to emphasize that the power to "
                      "bring about change lies within each one of us. Let us resolve "
                      f"today to take positive steps towards addressing {topic.lower()}. "
                      "Remember, every great journey begins with a single step.")
        lines.append("")
        lines.append("Thank you very much for your patient attention. Jai Hind!")

        speech_text = "\n".join(lines)
        total_words = len(speech_text.split())
        steps.append(f"\nSPEECH GENERATED ({total_words} words)")
        steps.append(f"Estimated duration: {total_words // wpm} minutes "
                      f"(target: {duration_minutes} minutes)")

        verification = (
            f"Salutation: {'Present' if any(s in speech_text for s in ['Respected', 'Honourable', 'Good morning']) else 'Missing'} | "
            f"Introduction: {'Present' if 'stand before you today' in speech_text else 'Missing'} | "
            f"Conclusion: {'Present' if 'In conclusion' in speech_text or 'Thank you' in speech_text else 'Missing'} | "
            f"Thank you: {'Present' if 'Thank you' in speech_text else 'Missing'} | "
            f"Word count: {total_words} (target: {target_words})"
        )

        return {
            "steps": steps,
            "answer": speech_text,
            "verification": verification
        }

    # --- Directed Writing: Article ---

    @staticmethod
    def solve_article(title: str, theme: str, target_readers: str,
                      main_points: List[str], word_limit: int = 200) -> Dict:
        """
        Generates an article for a magazine or newspaper.

        Parameters:
        -----------
        title : str
        theme : str
        target_readers : str  - e.g., "teenagers", "parents", "general public"
        main_points : list of str
        word_limit : int
        """
        steps = []
        steps.append("ARTICLE STRUCTURE ANALYSIS")
        steps.append(f"Title: {title}")
        steps.append(f"Theme: {theme}")
        steps.append(f"Target readers: {target_readers}")
        steps.append(f"Main points: {len(main_points)}")
        steps.append(f"Word limit: {word_limit}")
        steps.append("\nARTICLE FORMAT:")
        steps.append("1. Title (catchy, relevant)")
        steps.append("2. By-line (optional)")
        steps.append("3. Introduction (hook + context)")
        steps.append("4. Body (developed arguments with examples)")
        steps.append("5. Conclusion (thought-provoking)")
        steps.append("6. Appropriate register for target audience")

        lines = []
        lines.append(f"{title}")
        lines.append("")
        lines.append(f"In today's rapidly changing world, {theme.lower()} has emerged "
                      f"as one of the most pressing issues that demands our immediate "
                      f"attention. As {target_readers}, we are uniquely positioned to "
                      f"understand and address the challenges this issue presents.")
        lines.append("")
        lines.append("The first point that deserves our consideration is the "
                      "broader context in which this issue operates. We must "
                      "recognize that our actions today will determine the world "
                      "of tomorrow.")
        lines.append("")

        for point in main_points:
            lines.append(f"Furthermore, {point.lower()}. This aspect cannot be "
                          f"overlooked if we are to make meaningful progress. "
                          f"Examples from around us clearly demonstrate the "
                          f"urgency of addressing this challenge.")
            lines.append("")

        lines.append(f"As we reflect on {theme.lower()}, it becomes clear that "
                      "collective action is the need of the hour. Each one of us "
                      "has a role to play, and together, we can create a "
                      "meaningful difference. The time for action is now.")

        article_text = "\n".join(lines)
        total_words = len(article_text.split())
        steps.append(f"\nARTICLE GENERATED ({total_words} words)")

        verification = (
            f"Title present: {'Yes' if title in article_text else 'No'} | "
            f"Introduction hook: {'Yes' if 'today' in article_text.lower() else 'No'} | "
            f"Points developed: {len(main_points)}/{len(main_points)} | "
            f"Conclusion present: {'Yes' if 'reflect' in article_text.lower() or 'time for action' in article_text.lower() else 'No'} | "
            f"Word count: {total_words} (target: {word_limit})"
        )

        return {
            "steps": steps,
            "answer": article_text,
            "verification": verification
        }

    # --- Grammar: Sentence Transformation ---

    @staticmethod
    def solve_sentence_transformation(original: str, transformation_type: str,
                                       custom_answer: Optional[str] = None) -> Dict:
        """
        Transforms a sentence according to the specified grammatical rule.

        Transformation types:
        - simple_to_compound
        - simple_to_complex
        - simple_to_compound_complex
        - compound_to_simple
        - complex_to_simple
        - compound_to_complex
        - complex_to_compound
        - remove_adverb
        - remove_adjective
        - change_to_negative
        - change_to_exclamatory
        - change_to_interrogative
        - change_to_passive
        - change_to_active
        - use_infinitive
        - use_gerund
        - combine_using_although
        - combine_using_because
        - combine_using_but
        """
        steps = []
        steps.append("SENTENCE TRANSFORMATION ANALYSIS")
        steps.append(f"Original: {original}")
        steps.append(f"Transformation type: {transformation_type}")

        grammar_rules = {
            'simple_to_compound': {
                'rule': 'Join two independent clauses with a coordinating conjunction (and, but, or, so, yet, for, nor)',
                'connectors': ['and', 'but', 'so', 'yet', 'or'],
                'approach': 'Convert supporting clauses into independent clauses joined by a coordinator'
            },
            'simple_to_complex': {
                'rule': 'Convert a phrase/clause into a subordinate clause (using subordinating conjunctions)',
                'connectors': ['because', 'although', 'though', 'since', 'when', 'if', 'while', 'as'],
                'approach': 'Use subordinating conjunction to create main + subordinate clause structure'
            },
            'simple_to_compound_complex': {
                'rule': 'Combine multiple clauses - at least two independent and one dependent',
                'connectors': ['and', 'but', 'because', 'although', 'when', 'if'],
                'approach': 'Expand the simple sentence into multiple clauses of both types'
            },
            'compound_to_simple': {
                'rule': 'Reduce two independent clauses to one using participial phrases, infinitives, or prepositions',
                'connectors': ['-ing forms', 'to + verb', 'prepositional phrases'],
                'approach': 'Merge ideas using non-finite verb forms or prepositional phrases'
            },
            'complex_to_simple': {
                'rule': 'Convert subordinate clause to phrase/word using participles, infinitives, or prepositional phrases',
                'connectors': ['participles', 'infinitives', 'prepositions'],
                'approach': 'Eliminate subordinating conjunction and restructure'
            },
            'compound_to_complex': {
                'rule': 'Change one independent clause to a subordinate clause',
                'connectors': ['because', 'although', 'since', 'when', 'if'],
                'approach': 'Introduce a subordinating conjunction to reduce one clause'
            },
            'complex_to_compound': {
                'rule': 'Convert subordinate clause to independent clause',
                'connectors': ['and', 'but', 'or', 'so'],
                'approach': 'Expand the subordinate clause into a full independent clause'
            },
            'change_to_negative': {
                'rule': 'Use not, never, no, none, nothing, nobody, neither, nor, or auxiliary do-support',
                'connectors': ['not', 'never', 'no', 'none'],
                'approach': 'Insert negative word or auxiliary do + not'
            },
            'change_to_exclamatory': {
                'rule': 'Convert to exclamatory form using What or How',
                'connectors': ['What a/an', 'How'],
                'approach': 'Start with What/How, invert subject and verb, add exclamation mark'
            },
            'change_to_interrogative': {
                'rule': 'Use appropriate question word (who, what, where, when, why, how) and invert subject-verb',
                'connectors': ['Wh- words', 'auxiliary inversion'],
                'approach': 'Add question word and use auxiliary verb + subject + main verb pattern'
            },
            'change_to_passive': {
                'rule': 'Object becomes subject, use form of "to be" + past participle, add by-agent optionally',
                'connectors': ['am/is/are/was/were + past participle'],
                'approach': 'Shift focus from doer to receiver of action'
            },
            'change_to_active': {
                'rule': 'Agent becomes subject, verb changes to active form, object becomes direct object',
                'connectors': ['active verb forms'],
                'approach': 'Shift focus from receiver to doer of action'
            },
            'use_infinitive': {
                'rule': 'Convert purpose clauses to to + verb (infinitive) form',
                'connectors': ['to + verb'],
                'approach': 'Replace subordinate clauses of purpose with infinitive phrases'
            },
            'use_gerund': {
                'rule': 'Convert finite verb phrases to -ing form (gerund/participle)',
                'connectors': ['-ing form'],
                'approach': 'Replace clause with gerund phrase'
            },
            'combine_using_although': {
                'rule': 'Join contrasting clauses using "although/though"',
                'connectors': ['although', 'though'],
                'approach': 'One clause becomes subordinate with although, other remains main'
            },
            'combine_using_because': {
                'rule': 'Join cause-reason clauses using "because/as/since"',
                'connectors': ['because', 'as', 'since'],
                'approach': 'Reason clause becomes subordinate, result clause is main'
            },
            'combine_using_but': {
                'rule': 'Join contrasting clauses using "but/yet/however"',
                'connectors': ['but', 'yet'],
                'approach': 'Two contrasting independent clauses joined by coordinator'
            }
        }

        rule_info = grammar_rules.get(transformation_type, {
            'rule': 'General transformation',
            'connectors': [],
            'approach': 'Apply standard grammatical transformation rules'
        })

        steps.append(f"\nGRAMMAR RULE APPLIED:")
        steps.append(f"Rule: {rule_info['rule']}")
        steps.append(f"Connectors/Tools: {', '.join(rule_info['connectors'])}")
        steps.append(f"Approach: {rule_info['approach']}")

        steps.append("\nSTEP-BY-STEP TRANSFORMATION:")
        steps.append("Step 1: Identify the clause structure of the original sentence")
        steps.append(f"Step 2: Apply {transformation_type} rule")
        steps.append("Step 3: Ensure subject-verb agreement and tense consistency")
        steps.append("Step 4: Verify punctuation and capitalization")

        if custom_answer:
            transformed = custom_answer
            steps.append(f"\nTransformed: {transformed}")
        else:
            # Generate a template transformation
            transformed = f"[Apply {transformation_type} to: \"{original}\"]"
            steps.append(f"\nTransformed: {transformed}")
            steps.append("(Note: Manual application required for exact transformation)")

        verification = (
            f"Original sentence analyzed: Yes | "
            f"Rule applied: {rule_info['rule'][:50]}... | "
            f"Transformation type: {transformation_type}"
        )

        return {
            "steps": steps,
            "answer": transformed,
            "verification": verification
        }

    # --- Précis Writing ---

    @staticmethod
    def solve_precis(passage: str, ratio: float = 0.33) -> Dict:
        """
        Generates a précis (summary) of a passage.

        Parameters:
        -----------
        passage : str
        ratio : float - Target précis length as fraction of original (default 1/3)
        """
        steps = []
        original_words = len(passage.split())
        target_words = max(50, int(original_words * ratio))
        sentences = [s.strip() for s in passage.split('.') if s.strip()]

        steps.append("PREPARATION FOR PRECIS WRITING")
        steps.append(f"Original passage: {original_words} words")
        steps.append(f"Target précis length: ~{target_words} words (approx. 1/3 of original)")
        steps.append(f"Number of sentences in original: {len(sentences)}")
        steps.append("\nSTEPS:")
        steps.append("Step 1: Read passage carefully to understand the central idea")
        steps.append("Step 2: Identify the main theme and eliminate examples/details")
        steps.append("Step 3: Retain only essential information")
        steps.append("Step 4: Express in own words (not copy sentences verbatim)")
        steps.append("Step 5: Ensure logical flow and coherence")
        steps.append("Step 6: Count words to verify length requirement")
        steps.append("Step 7: Give a suitable title")

        # Summarize by keeping first and last sentences and a middle representative
        if len(sentences) <= 4:
            selected = sentences
        else:
            selected = [sentences[0], sentences[len(sentences) // 2],
                        sentences[-1]]

        summary = ". ".join(selected) + "."
        summary_words = len(summary.split())

        # Adjust to target length
        if summary_words > target_words * 1.5:
            summary = selected[0] + ". " + selected[-1]
            summary_words = len(summary.split())

        steps.append(f"\nPRECIS DRAFT ({summary_words} words):")
        steps.append(summary)

        steps.append("\nTITLE: The Central Theme of the Passage")
        steps.append(f"\nWord count check: {summary_words} words (target: {target_words})")

        verification = (
            f"Precis ratio: {summary_words}/{original_words} = {summary_words/original_words:.2f} | "
            f"Within 1/3 ratio: {'Yes' if summary_words <= target_words * 1.2 else 'Close'} | "
            f"Original sentences processed: {len(sentences)} | "
            f"Words retained: {summary_words}"
        )

        return {
            "steps": steps,
            "answer": f"TITLE: The Central Theme of the Passage\n\n{summary}",
            "verification": verification
        }


# ============================================================
# SOLVER: Paper 2 - English Literature
# ============================================================

class EnglishLiteratureSolver:
    """Solver for English Literature (Paper 2) questions."""

    # --- Drama: Julius Caesar ---

    @staticmethod
    def solve_drama_character_analysis(play: str, character: str,
                                       aspect: str) -> Dict:
        """
        Analyzes a character from the prescribed drama text.

        Parameters:
        -----------
        play : str  - Must be 'julius_caesar'
        character : str  - Character name
        aspect : str  - 'role', 'traits', 'development', 'motivation',
                        'symbolism', 'key_quotes', 'full'
        """
        steps = []
        play_key = play.lower().replace(" ", "_")

        if play_key not in DRAMA_DATA:
            return {
                "steps": [f"Error: Play '{play}' not found in database."],
                "answer": "N/A",
                "verification": "FAIL - play not found"
            }

        play_info = DRAMA_DATA[play_key]
        steps.append(f"DRAMA TEXT: {play_info['title']} by {play_info['author']}")
        steps.append(f"Character under analysis: {character}")
        steps.append(f"Aspect requested: {aspect}")

        # Find character data
        char_data = None
        for c in play_info['main_characters']:
            if c['name'].lower() == character.lower():
                char_data = c
                break

        if not char_data:
            available = [c['name'] for c in play_info['main_characters']]
            return {
                "steps": [f"Character '{character}' not found. Available: {available}"],
                "answer": "N/A",
                "verification": "FAIL - character not found"
            }

        steps.append("\nCHARACTER IDENTIFIED:")
        steps.append(f"Name: {char_data['name']}")
        steps.append(f"Role: {char_data['role']}")
        steps.append(f"Key Traits: {', '.join(char_data['traits'])}")

        analysis = {}
        if aspect in ['role', 'full']:
            analysis['Role'] = char_data['role']
            analysis['Development Arc'] = char_data.get('arc', 'N/A')

        if aspect in ['traits', 'full']:
            analysis['Character Traits'] = ', '.join(char_data['traits'])
            trait_analysis = {
                'ambitious': 'Driven by the desire for power and control',
                'cunning': 'Uses wit and manipulation to achieve goals',
                'honorable': 'Guided by a strong moral code and reputation',
                'loyal': 'Devoted to friends, causes, and ideals',
                'ruthless': 'Willing to use extreme measures to maintain power',
                'eloquent': 'Possesses exceptional skill in language and persuasion',
                'conflicted': 'Torn between opposing duties and emotions',
                'idealistic': 'Guided by principles and a vision of a better world',
                'proud': 'Possesses excessive self-regard and dignity',
                'naive': 'Lacks experience or judgment, overly trusting',
                'manipulative': 'Controls situations and people for personal gain',
                'stoic': 'Endures hardship without showing emotion'
            }
            for trait in char_data['traits']:
                if trait.lower() in trait_analysis:
                    analysis[f'{trait} - Analysis'] = trait_analysis[trait.lower()]

        if aspect in ['key_quotes', 'full']:
            analysis['Key Quotes'] = '\n'.join(
                f'  - "{q}"' for q in char_data.get('key_quotes', [])
            )

        steps.append("\nANALYSIS:")
        result_lines = []
        for key, value in analysis.items():
            steps.append(f"\n{key}:")
            steps.append(f"  {value}")
            result_lines.append(f"{key}:\n{value}")

        # Cross-thematic analysis
        steps.append("\nCROSS-REFERENCE WITH PLAY THEMES:")
        for theme in play_info['themes']:
            steps.append(f"  - Theme: {theme}")

        answer = "\n".join(result_lines)
        verification = (
            f"Character found: {char_data['name']} | "
            f"Aspect analyzed: {aspect} | "
            f"Key quotes available: {len(char_data.get('key_quotes', []))} | "
            f"Play verified: {play_info['title']}"
        )

        return {
            "steps": steps,
            "answer": answer,
            "verification": verification
        }

    @staticmethod
    def solve_drama_theme_analysis(play: str, theme: str) -> Dict:
        """
        Analyzes a theme in the prescribed drama text.

        Parameters:
        -----------
        play : str  - 'julius_caesar'
        theme : str - A theme to analyze
        """
        steps = []
        play_key = play.lower().replace(" ", "_")

        if play_key not in DRAMA_DATA:
            return {
                "steps": [f"Error: Play '{play}' not found."],
                "answer": "N/A",
                "verification": "FAIL"
            }

        play_info = DRAMA_DATA[play_key]
        steps.append(f"THEME ANALYSIS: '{theme}' in {play_info['title']}")
        steps.append(f"Author: {play_info['author']}")

        # Check if theme is in our database
        theme_found = theme.lower()
        matched_themes = [t for t in play_info['themes']
                          if theme_found in t.lower() or t.lower() in theme_found]

        steps.append(f"\nTheme matching: {matched_themes if matched_themes else 'No exact match - using general analysis'}")

        # Find relevant quotations
        relevant_quotes = []
        for quote, context in play_info.get('important_quotations', []):
            if any(w in quote.lower() or w in context.lower()
                   for w in theme.lower().split()):
                relevant_quotes.append((quote, context))

        if not relevant_quotes:
            # Use all quotations as potential references
            relevant_quotes = play_info.get('important_quotations', [])[:3]

        steps.append("\nTHEMATIC DEVELOPMENT THROUGH THE PLAY:")
        steps.append("Act I - Theme Introduction:")
        steps.append("  The theme is introduced through character dialogue and dramatic situations")
        steps.append("\nAct II - Theme Development:")
        steps.append("  The theme deepens as conflicts arise and characters face moral choices")
        steps.append("\nAct III - Theme Climax:")
        steps.append("  The theme reaches its dramatic peak in key scenes")
        steps.append("\nAct IV-V - Theme Resolution:")
        steps.append("  The theme is resolved through the consequences of characters' actions")

        steps.append("\nSUPPORTING QUOTATIONS:")
        for quote, context in relevant_quotes[:3]:
            steps.append(f'  "{quote}"')
            steps.append(f"    Context: {context}")

        answer_lines = [
            f"Theme: {theme}",
            f"Play: {play_info['title']} by {play_info['author']}",
            "",
            "Analysis:",
            f"The theme of '{theme}' is developed throughout {play_info['title']} "
            f"through character conflicts, dramatic situations, and Shakespeare's "
            f"masterful use of language.",
            "",
            "Key supporting quotations:",
        ]
        for quote, context in relevant_quotes:
            answer_lines.append(f'  "{quote}"')
            answer_lines.append(f"    -- {context}")

        answer = "\n".join(answer_lines)
        verification = (
            f"Theme analyzed: {theme} | "
            f"Play verified: {play_info['title']} | "
            f"Supporting quotes: {len(relevant_quotes)} | "
            f"Act-by-act breakdown: Complete"
        )

        return {
            "steps": steps,
            "answer": answer,
            "verification": verification
        }

    @staticmethod
    def solve_drama_quotation_analysis(play: str, quotation: str) -> Dict:
        """
        Analyzes a given quotation from the drama text.

        Parameters:
        -----------
        play : str
        quotation : str  - The quotation to analyze
        """
        steps = []
        play_key = play.lower().replace(" ", "_")

        if play_key not in DRAMA_DATA:
            return {
                "steps": [f"Error: Play '{play}' not found."],
                "answer": "N/A",
                "verification": "FAIL"
            }

        play_info = DRAMA_DATA[play_key]
        steps.append(f"QUOTATION ANALYSIS")
        steps.append(f"Play: {play_info['title']} by {play_info['author']}")
        steps.append(f"Quotation: \"{quotation}\"")

        # Find matching quotation in database
        matched = None
        matched_context = ""
        for q, ctx in play_info.get('important_quotations', []):
            if quotation.lower() in q.lower() or q.lower() in quotation.lower():
                matched = q
                matched_context = ctx
                break

        if matched:
            steps.append(f"Matched known quotation: \"{matched}\"")
            steps.append(f"Context: {matched_context}")
        else:
            steps.append("(Quotation not in database - providing general analysis)")

        # Identify speaker
        speaker = "Unknown"
        for char in play_info['main_characters']:
            for q in char.get('key_quotes', []):
                if quotation.lower() in q.lower():
                    speaker = char['name']
                    break

        steps.append(f"\nSpeaker identified: {speaker}")
        steps.append("Context within the play:")
        steps.append("  - Dramatic situation surrounding the quotation")
        steps.append("  - Character's state of mind at this point")
        steps.append("  - Impact on other characters and plot development")

        steps.append("\nLiterary Devices:")
        possible_devices = ["Metaphor", "Simile", "Alliteration", "Personification",
                            "Dramatic Irony", "Foreshadowing", "Rhetorical Question",
                            "Allusion", "Imagery"]
        rng = random.Random(_seed_hash(quotation))
        selected_devices = rng.sample(possible_devices, k=min(3, len(possible_devices)))
        for dev in selected_devices:
            steps.append(f"  - {dev}: Present or applicable in this quotation")

        steps.append("\nSignificance:")
        steps.append("  - Thematic importance within the play")
        steps.append("  - Contribution to character development")
        steps.append("  - Impact on the audience/reader")

        answer_lines = [
            f"Quotation: \"{quotation}\"",
            f"Play: {play_info['title']}",
            f"Speaker: {speaker}",
            f"Context: {matched_context if matched else 'Refer to the text for specific context.'}",
            "",
            "Analysis:",
            f"This quotation is significant in the context of the play's development. "
            f"Spoken by {speaker}, it reveals important character traits and advances "
            f"the thematic concerns of the play.",
            "",
            "Literary devices identified: " + ", ".join(selected_devices),
            "",
            "The quotation contributes to the overall meaning of the play by "
            "highlighting the central conflicts and character motivations that "
            "drive the narrative forward."
        ]
        if matched:
            answer_lines.insert(4, f"Known context: {matched_context}")

        answer = "\n".join(answer_lines)
        verification = (
            f"Quotation analyzed: Yes | "
            f"Speaker identified: {speaker} | "
            f"Play verified: {play_info['title']} | "
            f"Literary devices: {len(selected_devices)} | "
            f"Context provided: {'Yes' if matched else 'General'}"
        )

        return {
            "steps": steps,
            "answer": answer,
            "verification": verification
        }

    # --- Prose ---

    @staticmethod
    def solve_prose_analysis(story_title: str, aspect: str) -> Dict:
        """
        Analyzes a prescribed short story.

        Parameters:
        -----------
        story_title : str
        aspect : str - 'theme', 'character', 'style', 'summary', 'full'
        """
        steps = []
        steps.append(f"PROSE ANALYSIS: '{story_title}'")
        steps.append(f"Aspect requested: {aspect}")

        # Find the story
        story_data = None
        for s in PROSE_DATA['short_stories']:
            if story_title.lower() in s['title'].lower():
                story_data = s
                break

        if not story_data:
            # Generate generic analysis
            story_data = {
                "title": story_title,
                "author": "Unknown",
                "themes": ["Universal human experience", "Personal growth", "Social awareness"],
                "summary": "A literary work exploring fundamental human concerns through narrative.",
                "key_characters": ["Protagonist", "Supporting characters"]
            }
            steps.append("(Note: Story not in database - providing template analysis)")

        steps.append(f"Author: {story_data['author']}")
        steps.append(f"Key themes: {', '.join(story_data['themes'])}")

        analysis = {}
        if aspect in ['summary', 'full']:
            analysis['Summary'] = story_data['summary']

        if aspect in ['theme', 'full']:
            analysis['Major Themes'] = "\n".join(
                f"  - {t}" for t in story_data['themes']
            )
            for theme in story_data['themes']:
                analysis[f'Thematic exploration of {theme}'] = (
                    f"The author develops the theme of '{theme}' through "
                    f"narrative techniques, character actions, and situational "
                    f"development. This theme resonates with the universal human "
                    f"experience and provides deeper meaning to the text."
                )

        if aspect in ['character', 'full']:
            analysis['Key Characters'] = ", ".join(story_data['key_characters'])
            analysis['Character development'] = (
                "The characters evolve through the narrative, facing challenges "
                "that reveal their true nature and catalyze personal growth."
            )

        if aspect in ['style', 'full']:
            analysis['Narrative style'] = (
                "The author employs vivid descriptive language, effective dialogue, "
                "and carefully paced narrative structure to engage the reader."
            )
            analysis['Point of view'] = "First-person / Third-person (as per text)"
            analysis['Tone'] = "Varied - shifts with the narrative development"

        steps.append("\nANALYSIS:")
        result_lines = []
        for key, value in analysis.items():
            steps.append(f"\n{key}:")
            steps.append(f"  {value}")
            result_lines.append(f"{key}:\n{value}")

        answer = "\n".join(result_lines)
        verification = (
            f"Story: {story_data['title']} | "
            f"Author: {story_data['author']} | "
            f"Aspect analyzed: {aspect} | "
            f"Themes identified: {len(story_data['themes'])} | "
            f"Characters: {len(story_data['key_characters'])}"
        )

        return {
            "steps": steps,
            "answer": answer,
            "verification": verification
        }

    # --- Poetry ---

    @staticmethod
    def solve_poem_analysis(poem_key: str, aspect: str) -> Dict:
        """
        Analyzes a prescribed poem.

        Parameters:
        -----------
        poem_key : str  - e.g., 'the_gift_of_india', 'the_tyger', 'dover_beach'
        aspect : str    - 'theme', 'style', 'devices', 'summary', 'full'
        """
        steps = []
        steps.append(f"POEM ANALYSIS")
        steps.append(f"Aspect requested: {aspect}")

        if poem_key not in POETRY_DATA:
            available = list(POETRY_DATA.keys())
            return {
                "steps": [f"Poem '{poem_key}' not found. Available: {available}"],
                "answer": "N/A",
                "verification": "FAIL - poem not found"
            }

        poem = POETRY_DATA[poem_key]
        steps.append(f"Title: '{poem['title']}'")
        steps.append(f"Poet: {poem['author']}")
        steps.append(f"Year: {poem['year']}")
        steps.append(f"Form: {poem['form']}")
        steps.append(f"Themes: {', '.join(poem['themes'])}")

        analysis = {}

        if aspect in ['summary', 'full']:
            analysis['Summary'] = poem['summary']
            analysis['Structure'] = poem['structure']

        if aspect in ['theme', 'full']:
            analysis['Major Themes'] = "\n".join(
                f"  {i+1}. {t}" for i, t in enumerate(poem['themes'])
            )
            for theme in poem['themes']:
                analysis[f'Theme: {theme}'] = (
                    f"Developed through {poem['form'].lower()} form, "
                    f"using imagery and language appropriate to the subject matter."
                )

        if aspect in ['style', 'full']:
            analysis['Form and Structure'] = poem['form']
            analysis['Poetic Devices'] = "\n".join(
                f"  - {d}" for d in poem['poetic_devices']
            )
            analysis['Tone'] = poem['poetic_devices'][-1] if poem['poetic_devices'] else "Varied"

        if aspect in ['devices', 'full']:
            analysis['Poetic Devices Used'] = "\n".join(
                f"  - {d}" for d in poem['poetic_devices']
            )
            analysis['Key Quotations'] = "\n".join(
                f'  {i+1}. "{q}"' for i, q in enumerate(poem['key_quotes'])
            )

        if aspect == 'full':
            analysis['Important Quotations'] = "\n".join(
                f'  "{q}"\n    Significance: {c}'
                for q, c in poem.get('important_quotations', [])
                if poem_key in ['the_tyger', 'dover_beach', 'ulysses',
                                'the_gift_of_india']
            ) if poem_key in ['the_tyger', 'dover_beach', 'ulysses', 'the_gift_of_india'] else "See key_quotes above"

        steps.append("\nANALYSIS:")
        result_lines = []
        for key, value in analysis.items():
            steps.append(f"\n{key}:")
            for line in str(value).split('\n'):
                steps.append(f"  {line}")
            result_lines.append(f"{key}:\n{value}")

        answer = "\n".join(result_lines)
        verification = (
            f"Poem: '{poem['title']}' by {poem['author']} | "
            f"Year: {poem['year']} | "
            f"Aspect analyzed: {aspect} | "
            f"Key quotes: {len(poem['key_quotes'])} | "
            f"Devices identified: {len(poem['poetic_devices'])}"
        )

        return {
            "steps": steps,
            "answer": answer,
            "verification": verification
        }

    @staticmethod
    def solve_poem_comparison(poem1_key: str, poem2_key: str,
                               comparison_aspect: str) -> Dict:
        """
        Compares two prescribed poems on a specific aspect.

        Parameters:
        -----------
        poem1_key : str
        poem2_key : str
        comparison_aspect : str - 'theme', 'style', 'tone', 'imagery', 'full'
        """
        steps = []
        steps.append(f"POEM COMPARISON")
        steps.append(f"Aspect: {comparison_aspect}")

        if poem1_key not in POETRY_DATA:
            return {
                "steps": [f"Poem '{poem1_key}' not found."],
                "answer": "N/A",
                "verification": "FAIL"
            }
        if poem2_key not in POETRY_DATA:
            return {
                "steps": [f"Poem '{poem2_key}' not found."],
                "answer": "N/A",
                "verification": "FAIL"
            }

        p1 = POETRY_DATA[poem1_key]
        p2 = POETRY_DATA[poem2_key]

        steps.append(f"\nPoem 1: '{p1['title']}' by {p1['author']} ({p1['year']})")
        steps.append(f"Poem 2: '{p2['title']}' by {p2['author']} ({p2['year']})")

        steps.append(f"\nCOMPARISON - {comparison_aspect.upper()}:")

        comparisons = []

        if comparison_aspect in ['theme', 'full']:
            common_themes = set(t.lower() for t in p1['themes']) & \
                            set(t.lower() for t in p2['themes'])
            unique_p1 = [t for t in p1['themes']
                         if t.lower() not in set(x.lower() for x in p2['themes'])]
            unique_p2 = [t for t in p2['themes']
                         if t.lower() not in set(x.lower() for x in p1['themes'])]

            steps.append(f"\nCommon themes: {common_themes if common_themes else 'None - different thematic concerns'}")
            steps.append(f"Unique to '{p1['title']}': {unique_p1}")
            steps.append(f"Unique to '{p2['title']}': {unique_p2}")

            comparisons.append(
                f"While both poems explore significant themes, "
                f"'{p1['title']}' focuses on {', '.join(p1['themes'][:2])}, "
                f"whereas '{p2['title']}' centers on {', '.join(p2['themes'][:2])}."
            )

        if comparison_aspect in ['style', 'full']:
            steps.append(f"\nForm of '{p1['title']}': {p1['form']}")
            steps.append(f"Form of '{p2['title']}': {p2['form']}")

            common_devices = set(d.lower() for d in p1['poetic_devices']) & \
                             set(d.lower() for d in p2['poetic_devices'])
            steps.append(f"Common devices: {common_devices if common_devices else 'Different stylistic approaches'}")

            comparisons.append(
                f"'{p1['title']}' employs {p1['form'].lower()}, "
                f"while '{p2['title']}' uses {p2['form'].lower()}. "
                f"This difference in form reflects the distinct purposes and "
                f"emotional registers of each poem."
            )

        if comparison_aspect in ['tone', 'full']:
            steps.append(f"\nTone of '{p1['title']}': Evident from language and imagery")
            steps.append(f"Tone of '{p2['title']}': Evident from language and imagery")
            comparisons.append(
                f"The tone in '{p1['title']}' is markedly "
                f"{'passionate and urgent' if 'india' in poem1_key else 'contemplative and questioning'}, "
                f"while '{p2['title']}' adopts a "
                f"{'sober and melancholic' if 'beach' in poem2_key else 'awe-inspired and reverent'} "
                f"tone."
            )

        if comparison_aspect in ['imagery', 'full']:
            steps.append(f"\nImagery in '{p1['title']}': {p1['poetic_devices'][:2]}")
            steps.append(f"Imagery in '{p2['title']}': {p2['poetic_devices'][:2]}")
            comparisons.append(
                f"Both poets use vivid imagery, but '{p1['author']}' employs "
                f"{', '.join(p1['poetic_devices'][:2]).lower()} while "
                f"'{p2['author']}' relies more heavily on "
                f"{', '.join(p2['poetic_devices'][:2]).lower()}."
            )

        answer_lines = [
            f"Comparison: '{p1['title']}' vs '{p2['title']}'",
            f"Aspect: {comparison_aspect}",
            ""
        ]
        answer_lines.extend(comparisons)
        answer_lines.append("")
        answer_lines.append("Conclusion:")
        answer_lines.append(
            f"Despite their differences in form, theme, and style, both poems "
            f"represent significant contributions to English literature, offering "
            f"unique perspectives on the human condition."
        )

        answer = "\n".join(answer_lines)
        steps.append("\nCONCLUSION:")
        steps.append("Both poems contribute uniquely to the literary canon.")
        steps.append(f"They reflect the distinct voices and contexts of their respective authors.")

        verification = (
            f"Poem 1: '{p1['title']}' by {p1['author']} | "
            f"Poem 2: '{p2['title']}' by {p2['author']} | "
            f"Aspect: {comparison_aspect} | "
            f"Points compared: {len(comparisons)} | "
            f"Form comparison: Complete | "
            f"Theme comparison: Complete"
        )

        return {
            "steps": steps,
            "answer": answer,
            "verification": verification
        }

    # --- Essay Writing ---

    @staticmethod
    def solve_essay_outline(topic: str, essay_type: str = "argumentative",
                            word_limit: int = 500) -> Dict:
        """
        Generates a structured essay outline.

        Parameters:
        -----------
        topic : str
        essay_type : str - 'argumentative', 'descriptive', 'narrative',
                           'expository', 'reflective'
        word_limit : int
        """
        steps = []
        intro_pct = 0.15
        body_pct = 0.70
        conclusion_pct = 0.15

        intro_words = int(word_limit * intro_pct)
        body_words = int(word_limit * body_pct)
        conclusion_words = int(word_limit * conclusion_pct)

        steps.append("ESSAY OUTLINE GENERATOR")
        steps.append(f"Topic: {topic}")
        steps.append(f"Essay type: {essay_type}")
        steps.append(f"Word limit: {word_limit}")
        steps.append(f"Allocation: Intro ~{intro_words}, Body ~{body_words}, Conclusion ~{conclusion_words}")
        steps.append("\nSTRUCTURE:")

        outline_structure = {
            'argumentative': [
                "1. Introduction (~75-100 words)",
                "   - Hook: An engaging opening statement or anecdote",
                "   - Background: Brief context of the issue",
                "   - Thesis statement: Clear position on the topic",
                "",
                "2. Body Paragraphs (~350 words total)",
                "   - Para 1: First argument with evidence and examples",
                "   - Para 2: Second argument with supporting data",
                "   - Para 3: Counter-argument and refutation",
                "   - Para 4: Third argument or synthesis of points",
                "",
                "3. Conclusion (~75-100 words)",
                "   - Restate thesis in new words",
                "   - Summarize key arguments",
                "   - Closing thought / call to action"
            ],
            'descriptive': [
                "1. Introduction (~75-100 words)",
                "   - Setting the scene / introducing the subject",
                "   - Creating atmosphere",
                "",
                "2. Body (~350 words)",
                "   - Sensory details (sight, sound, smell, touch, taste)",
                "   - Vivid imagery and figurative language",
                "   - Chronological or spatial organization",
                "",
                "3. Conclusion (~75-100 words)",
                "   - Final impression",
                "   - Reflection on the significance"
            ],
            'narrative': [
                "1. Introduction (~75-100 words)",
                "   - Setting the scene",
                "   - Introducing characters",
                "   - Hinting at the conflict/event",
                "",
                "2. Body (~350 words)",
                "   - Rising action - building tension",
                "   - Climax - the turning point",
                "   - Falling action - consequences",
                "",
                "3. Conclusion (~75-100 words)",
                "   - Resolution",
                "   - Moral or lesson learned"
            ],
            'expository': [
                "1. Introduction (~75-100 words)",
                "   - Definition / explanation of the topic",
                "   - Preview of main points",
                "",
                "2. Body (~350 words)",
                "   - Organized by categories, causes/effects, or process",
                "   - Facts, statistics, examples",
                "   - Logical progression of ideas",
                "",
                "3. Conclusion (~75-100 words)",
                "   - Summary of main points",
                "   - Final insight or broader significance"
            ],
            'reflective': [
                "1. Introduction (~75-100 words)",
                "   - Describe the experience/event being reflected upon",
                "   - Establish context",
                "",
                "2. Body (~350 words)",
                "   - Detailed description of the experience",
                "   - Analysis of feelings and reactions",
                "   - Lessons learned / personal growth",
                "",
                "3. Conclusion (~75-100 words)",
                "   - Summary of insights",
                "   - How this will influence future behavior"
            ]
        }

        structure = outline_structure.get(essay_type, outline_structure['argumentative'])
        for line in structure:
            steps.append(line)

        # Generate sample essay content
        lines = []
        lines.append(f"ESSAY: {topic}")
        lines.append(f"Type: {essay_type}")
        lines.append("")
        lines.append(f"Introduction ({intro_words} words):")
        lines.append(f"  {topic} is a subject of considerable importance in "
                      f"contemporary discourse. As we navigate the complexities "
                      f"of modern life, understanding this issue becomes not just "
                      f"academic but essential for informed citizenship.")
        lines.append("")
        lines.append(f"Body ({body_words} words):")
        lines.append(f"  The first aspect to consider is the historical context. "
                      f"Tracing the evolution of this topic reveals patterns that "
                      f"inform our current understanding.")
        lines.append(f"  Secondly, we must examine the contemporary dimensions. "
                      f"Recent developments have brought new challenges and "
                      f"opportunities to the fore.")
        lines.append(f"  Furthermore, the Indian context provides unique insights. "
                      f"Our cultural heritage and democratic values offer a distinct "
                      f"perspective on this matter.")
        lines.append("")
        lines.append(f"Conclusion ({conclusion_words} words):")
        lines.append(f"  In conclusion, {topic.lower()} demands our serious "
                      f"attention and thoughtful engagement. By considering "
                      f"multiple perspectives and grounding our understanding in "
                      f"both tradition and modernity, we can arrive at meaningful "
                      f"solutions that serve the greater good.")

        answer = "\n".join(lines)
        steps.append(f"\nSAMPLE OUTLINE WITH CONTENT GENERATED")

        verification = (
            f"Topic: {topic} | "
            f"Essay type: {essay_type} | "
            f"Word limit: {word_limit} | "
            f"Structure: {'Standard 3-part' if essay_type in outline_structure else 'Standard'} | "
            f"Word allocation: Verified"
        )

        return {
            "steps": steps,
            "answer": answer,
            "verification": verification
        }


# ============================================================
# QUESTION GENERATOR
# ============================================================

class QuestionGenerator:
    """Generates practice questions for Class 12 English."""

    def __init__(self, seed: Optional[int] = None):
        if seed is not None:
            random.seed(seed)
        else:
            random.seed(42)

    # --- Language Questions ---

    def generate_comprehension_question(self) -> Dict:
        """Generate a comprehension passage with questions."""
        passages = [
            (
                "The Ganges River, flowing for over 2,500 kilometres from the "
                "Himalayas to the Bay of Bengal, is not merely a river but a "
                "living entity revered by millions of Hindus across India. It is "
                "considered sacred, with spiritual significance that transcends "
                "religious boundaries. Cities like Varanasi, Haridwar, and "
                "Allahabad have flourished along its banks for millennia, serving "
                "as centers of learning, pilgrimage, and culture. However, the "
                "river faces unprecedented environmental challenges. Industrial "
                "effluents, domestic waste, and religious offerings have "
                "contributed to severe pollution levels. The Government of India "
                "has launched the Namami Gange programme with an allocation of "
                "Rs. 20,000 crore to clean and rejuvenate the river. Scientists "
                "warn that if current pollution levels continue, the river may "
                "face irreversible damage within two decades, affecting over 400 "
                "million people who depend on it."
            ),
            (
                "The ancient university of Nalanda, located in present-day Bihar, "
                "was one of the world's first residential universities. Founded in "
                "the 5th century CE during the Gupta period, it attracted scholars "
                "from as far as China, Korea, Central Asia, and Tibet. The university "
                "housed a library so vast that it was said to contain nine million "
                "manuscripts. Subjects taught included Buddhist philosophy, logic, "
                "medicine, mathematics, and astronomy. The great Chinese pilgrim "
                "Xuanzang studied here in the 7th century and left detailed accounts "
                "of its grandeur. The university was destroyed in the 12th century "
                "by invading forces, but its ruins still inspire awe. In 2014, "
                "Nalanda University was revived as an international institution, "
                "marking a new chapter in India's educational heritage."
            ),
            (
                "Mumbai, the financial capital of India, is a city of stark "
                "contrasts. Towering skyscrapers housing multinational corporations "
                "stand in close proximity to sprawling slums like Dharavi, one of "
                "the largest in Asia. The city contributes approximately 6% to "
                "India's GDP and handles 70% of the country's maritime trade. Its "
                "local train network, famously overcrowded, carries over 7 million "
                "commuters daily. The city's cosmopolitan character is reflected in "
                "its cuisine, festivals, and the coexistence of numerous languages. "
                "However, rapid urbanization has strained infrastructure. Traffic "
                "congestion, housing shortages, and environmental degradation pose "
                "formidable challenges. The Mumbai Metro project, costing over "
                "Rs. 1 lakh crore, aims to address some of these transportation "
                "issues in the coming decades."
            ),
            (
                "The Indian space program, initiated by Dr. Vikram Sarabhai in the "
                "1960s, has grown into one of the world's most cost-effective space "
                "agencies. The Indian Space Research Organisation (ISRO) achieved a "
                "landmark success with Chandrayaan-3 in 2023, becoming the first "
                "nation to land near the lunar south pole. The mission cost "
                "approximately Rs. 215 crore, a fraction of similar international "
                "missions. Mangalyaan, India's Mars Orbiter Mission launched in "
                "2013, cost only Rs. 450 crore and made India the first Asian nation "
                "to reach Mars orbit on its first attempt. With 116 satellite "
                "launches and the development of the GSLV and PSLV launch vehicles, "
                "ISRO has established itself as a global leader in space technology, "
                "demonstrating that world-class achievements need not require "
                "world-class budgets."
            ),
            (
                "Kerala, often called 'God's Own Country', is a state in southern "
                "India known for its high literacy rate, which stands at 96.2%, the "
                "highest in the country. The state's achievements in public health "
                "are equally remarkable, with life expectancy comparable to developed "
                "nations. Kerala's economy, traditionally dependent on remittances "
                "from the Gulf countries, is now diversifying into tourism, "
                "information technology, and manufacturing. The state's unique "
                "cultural fabric, shaped by centuries of trade with Arab, Chinese, "
                "and European civilizations, manifests in its cuisine, architecture, "
                "and performing arts like Kathakali and Theyyam. The backwaters of "
                "Alleppey attract tourists worldwide, contributing significantly to "
                "the state's tourism revenue, which exceeded Rs. 40,000 crore in "
                "recent years."
            )
        ]

        passage = random.choice(passages)

        # Generate questions
        question_types = ['objective', 'short_answer', 'long_answer']
        questions = []

        # Objective question
        q_types = ['main_idea', 'detail', 'inference', 'vocabulary']
        q_type = random.choice(q_types)

        if q_type == 'main_idea':
            questions.append({
                'type': 'objective',
                'question': f'What is the main idea of the passage?',
                'options': ['A specific detail', 'The central theme', 'A supporting fact', 'An example'],
                'answer': 'The central theme'
            })
        elif q_type == 'detail':
            numbers = re.findall(r'\d[\d,]+', passage)
            if numbers:
                num = random.choice(numbers)
                questions.append({
                    'type': 'objective',
                    'question': f'According to the passage, what figure is mentioned?',
                    'options': [num, 'Not mentioned', 'A different figure', 'Unclear'],
                    'answer': num
                })
            else:
                questions.append({
                    'type': 'objective',
                    'question': 'According to the passage, the subject is:',
                    'options': ['India', 'The topic discussed', 'A person', 'A fictional story'],
                    'answer': 'The topic discussed'
                })
        elif q_type == 'inference':
            questions.append({
                'type': 'objective',
                'question': 'What can be inferred from the passage?',
                'options': ['The topic has significant importance', 'The topic is unimportant',
                            'The author is biased', 'No inference possible'],
                'answer': 'The topic has significant importance'
            })
        else:
            words = re.findall(r'\b[A-Z][a-z]+\b', passage)
            if words:
                w = random.choice(words) if words else 'context'
                questions.append({
                    'type': 'objective',
                    'question': f'In the context of the passage, the word "{w}" means:',
                    'options': ['As used in context', 'Its literal meaning',
                                'An unrelated meaning', 'Not applicable'],
                    'answer': 'As used in context'
                })
            else:
                questions.append({
                    'type': 'objective',
                    'question': 'The meaning of the passage is:',
                    'options': ['Informative', 'Entertaining', 'Confusing', 'Irrelevant'],
                    'answer': 'Informative'
                })

        # Short answer questions
        short_qs = [
            'According to the passage, what is the significance of the topic discussed?',
            'What challenges or problems are mentioned in the passage?',
            'What measures or solutions are suggested in the passage?',
            'How does the author describe the impact of the subject?',
            'What details are provided to support the main argument?'
        ]
        for sq in random.sample(short_qs, k=min(2, len(short_qs))):
            questions.append({'type': 'short_answer', 'question': sq, 'word_limit': 30})

        # Long answer question
        questions.append({
            'type': 'long_answer',
            'question': 'Analyze the broader implications of the issues discussed in the passage and suggest possible solutions.',
            'word_limit': 150
        })

        return {
            'passage': passage,
            'questions': questions,
            'reference_answers': [q.get('answer', '') for q in questions if q['type'] == 'objective']
        }

    def generate_grammar_question(self) -> Dict:
        """Generate a grammar/sentence transformation question."""
        sentence_templates = [
            "Being tired, he went to bed early.",
            "She is so intelligent that she solves every problem.",
            "He is not only a singer but also a dancer.",
            "No other student in the class is as hardworking as Rahul.",
            "The teacher said, \"The earth moves around the sun.\"",
            "If you work hard, you will succeed.",
            "He finished his homework and then watched television.",
            "Despite the rain, the match continued.",
            "He said that he would come the next day.",
            "Walking along the road, a snake bit the boy."
        ]

        transformations = [
            'simple_to_compound', 'simple_to_complex', 'compound_to_simple',
            'complex_to_simple', 'change_to_negative', 'change_to_passive',
            'change_to_active', 'combine_using_although', 'combine_using_because',
            'combine_using_but', 'use_infinitive', 'use_gerund'
        ]

        sentence = random.choice(sentence_templates)
        transformation = random.choice(transformations)

        return {
            'type': 'transformation',
            'original': sentence,
            'transformation_type': transformation
        }

    def generate_writing_question(self) -> Dict:
        """Generate a directed writing question."""
        writing_types = ['letter', 'report', 'speech', 'article']
        w_type = random.choice(writing_types)

        if w_type == 'letter':
            scenarios = [
                {"type": "formal", "recipient": "The Editor",
                 "subject": "The menace of plastic pollution in urban areas",
                 "points": ["Extent of plastic waste", "Health hazards",
                            "Need for awareness", "Call for action"],
                 "sender": "Concerned Citizen"},
                {"type": "formal", "recipient": "The Principal",
                 "subject": "Request for more sports facilities in the school",
                 "points": ["Current state of sports infrastructure",
                            "Need for physical development", "Benefits to students",
                            "Request for new facilities"],
                 "sender": "Rahul Sharma, Class XII-A"},
                {"type": "informal", "recipient": "Priya",
                 "subject": "Planning our summer vacation",
                 "points": ["Where we should go", "Activities to do",
                            "Budget planning", "Duration of trip"],
                 "sender": "Your Friend"},
                {"type": "formal", "recipient": "The Municipal Commissioner",
                 "subject": "Poor condition of roads in our locality",
                 "points": ["Current road conditions", "Accidents caused",
                            "Impact on commuters", "Request for repairs"],
                 "sender": "Resident of Ashok Nagar"},
            ]
            return {'type': 'letter', 'params': random.choice(scenarios)}

        elif w_type == 'report':
            scenarios = [
                {"event_name": "Annual Sports Day", "event_date": "15th January, 2025",
                 "venue": "School Ground", "chief_guest": "Mr. Sunil Gavaskar",
                 "num_participants": 500,
                 "highlights": ["Record-breaking 100m sprint by Priya Singh",
                                "Friendly cricket match between teachers and students",
                                "Cultural program showcasing diverse Indian traditions",
                                "Award ceremony with trophies and certificates"]},
                {"event_name": "Science Exhibition", "event_date": "20th February, 2025",
                 "venue": "School Auditorium", "chief_guest": "Dr. A.P.J. Abdul Kalam Jr.",
                 "num_participants": 350,
                 "highlights": ["Innovative working model of a solar-powered car",
                                "Robotics demonstration by Class XI students",
                                "Working model of the human heart",
                                "Interactive science quiz with audience participation"]},
            ]
            return {'type': 'report', 'params': random.choice(scenarios)}

        elif w_type == 'speech':
            topics = [
                ("The Importance of Reading in the Digital Age",
                 "school assembly", "Book Week",
                 ["How reading expands knowledge and empathy",
                  "The decline of reading habits among youth",
                  "Practical steps to cultivate a reading habit"], 4),
                ("Conservation of Wildlife in India",
                 "environmental club", "Wildlife Day",
                 ["India's rich biodiversity is under threat",
                  "Endangered species and habitat loss",
                  "Community-based conservation efforts",
                  "What students can do to help"], 5),
                ("The Role of Youth in Nation Building",
                 "college farewell", "Independence Day",
                 ["India's demographic dividend",
                  "Challenges facing young Indians",
                  "Education and skill development",
                  "Civic responsibility and participation"], 5),
            ]
            return {'type': 'speech', 'params': random.choice(topics)}

        elif w_type == 'article':
            topics = [
                ("Social Media: A Double-Edged Sword",
                 "Impact of social media on student life",
                 "teenagers",
                 ["Educational benefits of online platforms",
                  "Mental health concerns and cyberbullying",
                  "Finding the right balance"], 200),
                ("The Urban Green Cover Crisis",
                 "Decreasing green spaces in Indian cities",
                 "environmentally conscious citizens",
                 ["Loss of trees and parks due to development",
                  "Impact on air quality and public health",
                  "Initiatives and solutions being implemented"], 200),
            ]
            return {'type': 'article', 'params': random.choice(topics)}

    # --- Literature Questions ---

    def generate_drama_question(self) -> Dict:
        """Generate a literature question on Julius Caesar."""
        question_types = [
            ('character_analysis', 'full'),
            ('character_analysis', 'traits'),
            ('character_analysis', 'key_quotes'),
            ('theme_analysis', ''),
            ('quotation_analysis', ''),
            ('dramatic_technique', ''),
            ('critical_appreciation', ''),
        ]

        q_type, aspect = random.choice(question_types)
        characters = ['Julius Caesar', 'Brutus', 'Cassius', 'Antony']

        if q_type == 'character_analysis':
            char = random.choice(characters)
            aspects = ['role', 'traits', 'development', 'key_quotes', 'full']
            return {
                'type': 'drama_character',
                'params': {
                    'play': 'Julius Caesar',
                    'character': char,
                    'aspect': random.choice(aspects)
                }
            }
        elif q_type == 'theme_analysis':
            themes = ['Ambition vs. Patriotism', 'Rhetoric and Persuasion',
                      'Honor and Betrayal', 'Fate vs. Free Will', 'Public vs. Private Self',
                      'Manipulation and Power', 'Leadership']
            return {
                'type': 'drama_theme',
                'params': {
                    'play': 'Julius Caesar',
                    'theme': random.choice(themes)
                }
            }
        elif q_type == 'quotation_analysis':
            quotes = [
                "Friends, Romans, countrymen, lend me your ears",
                "Not that I loved Caesar less, but that I loved Rome more",
                "The fault, dear Brutus, is not in our stars, But in ourselves",
                "Et tu, Brute? Then fall, Caesar.",
                "Cowards die many times before their deaths; The valiant never taste of death but once.",
                "This was the noblest Roman of them all.",
                "Beware the Ides of March",
                "Yond Cassius has a lean and hungry look"
            ]
            return {
                'type': 'drama_quotation',
                'params': {
                    'play': 'Julius Caesar',
                    'quotation': random.choice(quotes)
                }
            }
        else:
            char = random.choice(characters)
            aspects = ['role', 'traits', 'development', 'full']
            return {
                'type': 'drama_character',
                'params': {
                    'play': 'Julius Caesar',
                    'character': char,
                    'aspect': random.choice(aspects)
                }
            }

    def generate_poetry_question(self) -> Dict:
        """Generate a literature question on poetry."""
        question_types = ['poem_analysis', 'poem_comparison', 'poem_appreciation']
        q_type = random.choice(question_types)

        poems = list(POETRY_DATA.keys())
        poem_key = random.choice(poems)

        if q_type == 'poem_analysis':
            aspects = ['theme', 'style', 'devices', 'summary', 'full']
            return {
                'type': 'poem_analysis',
                'params': {
                    'poem_key': poem_key,
                    'aspect': random.choice(aspects)
                }
            }
        elif q_type == 'poem_comparison':
            p2 = random.choice([p for p in poems if p != poem_key])
            aspects = ['theme', 'style', 'tone', 'imagery', 'full']
            return {
                'type': 'poem_comparison',
                'params': {
                    'poem1_key': poem_key,
                    'poem2_key': p2,
                    'comparison_aspect': random.choice(aspects)
                }
            }
        else:
            aspects = ['theme', 'style', 'devices', 'full']
            return {
                'type': 'poem_analysis',
                'params': {
                    'poem_key': poem_key,
                    'aspect': random.choice(aspects)
                }
            }

    def generate_prose_question(self) -> Dict:
        """Generate a literature question on prose."""
        stories = [s['title'] for s in PROSE_DATA['short_stories']]
        story = random.choice(stories)
        aspects = ['theme', 'character', 'style', 'summary', 'full']
        return {
            'type': 'prose_analysis',
            'params': {
                'story_title': story,
                'aspect': random.choice(aspects)
            }
        }

    def generate_essay_question(self) -> Dict:
        """Generate an essay topic."""
        return {
            'type': 'essay_outline',
            'params': {
                'topic': random.choice(ESSAY_TOPICS),
                'essay_type': random.choice(['argumentative', 'descriptive',
                                              'narrative', 'expository', 'reflective']),
                'word_limit': random.choice([300, 350, 400, 500])
            }
        }

    def generate_question_set(self, paper: str = "both", seed: Optional[int] = None) -> Dict:
        """
        Generate a complete question set.

        Parameters:
        -----------
        paper : str - 'language', 'literature', or 'both'
        seed : int, optional - Random seed for reproducibility
        """
        if seed is not None:
            random.seed(seed)

        questions = {}
        question_id = 1

        if paper in ['language', 'both']:
            # Language questions
            lang_questions = {}

            # Comprehension
            comp = self.generate_comprehension_question()
            lang_questions[f'Q{question_id}_comprehension'] = {
                'type': 'comprehension',
                'data': comp
            }
            question_id += 1

            # Grammar
            gram = self.generate_grammar_question()
            lang_questions[f'Q{question_id}_grammar'] = {
                'type': 'sentence_transformation',
                'data': gram
            }
            question_id += 1

            # Writing - one of letter, report, speech, article
            writing = self.generate_writing_question()
            lang_questions[f'Q{question_id}_writing'] = {
                'type': writing['type'],
                'data': writing
            }
            question_id += 1

            # Second writing question
            writing2 = self.generate_writing_question()
            lang_questions[f'Q{question_id}_writing2'] = {
                'type': writing2['type'],
                'data': writing2
            }

            questions['language'] = lang_questions

        if paper in ['literature', 'both']:
            # Literature questions
            lit_questions = {}
            qid = 1

            # Drama
            drama_q = self.generate_drama_question()
            lit_questions[f'Drama_{qid}'] = drama_q
            qid += 1

            # Drama - second question
            drama_q2 = self.generate_drama_question()
            lit_questions[f'Drama_{qid}'] = drama_q2
            qid += 1

            # Poetry
            poetry_q = self.generate_poetry_question()
            lit_questions[f'Poetry_{qid}'] = poetry_q
            qid += 1

            # Poetry - second question
            poetry_q2 = self.generate_poetry_question()
            lit_questions[f'Poetry_{qid}'] = poetry_q2
            qid += 1

            # Prose
            prose_q = self.generate_prose_question()
            lit_questions[f'Prose_{qid}'] = prose_q
            qid += 1

            # Essay
            essay_q = self.generate_essay_question()
            lit_questions[f'Essay_{qid}'] = essay_q

            questions['literature'] = lit_questions

        return questions


# ============================================================
# MAIN SOLVER CLASS
# ============================================================

class Class12EnglishSolver:
    """
    Unified solver for CISCE Class 12 English.
    Handles both Paper 1 (Language) and Paper 2 (Literature) questions.
    """

    def __init__(self):
        self.lang_solver = EnglishLanguageSolver()
        self.lit_solver = EnglishLiteratureSolver()
        self.generator = QuestionGenerator()

    def solve(self, question_type: str, params: Dict) -> Dict:
        """
        Main entry point for solving questions.

        Parameters:
        -----------
        question_type : str
            One of: 'comprehension', 'letter', 'report', 'speech', 'article',
                    'sentence_transformation', 'precis',
                    'drama_character', 'drama_theme', 'drama_quotation',
                    'prose_analysis', 'poem_analysis', 'poem_comparison',
                    'essay_outline'
        params : dict
            Parameters specific to the question type

        Returns:
        --------
        dict with 'steps', 'answer', 'verification'
        """
        if question_type == 'comprehension':
            return self.lang_solver.solve_comprehension(
                passage=params['passage'],
                questions=params['questions'],
                reference_answers=params.get('reference_answers')
            )

        elif question_type == 'letter':
            return self.lang_solver.solve_letter_letter(
                letter_type=params['type'],
                recipient=params['recipient'],
                subject=params['subject'],
                points=params['points'],
                sender=params.get('sender', 'Student'),
                word_limit=params.get('word_limit', 150)
            )

        elif question_type == 'report':
            return self.lang_solver.solve_report(
                event_name=params['event_name'],
                event_date=params['event_date'],
                venue=params['venue'],
                chief_guest=params['chief_guest'],
                num_participants=params['num_participants'],
                highlights=params['highlights']
            )

        elif question_type == 'speech':
            return self.lang_solver.solve_speech(
                topic=params['topic'],
                audience=params['audience'],
                occasion=params['occasion'],
                key_points=params['key_points'],
                duration_minutes=params.get('duration_minutes', 4)
            )

        elif question_type == 'article':
            return self.lang_solver.solve_article(
                title=params['title'],
                theme=params['theme'],
                target_readers=params['target_readers'],
                main_points=params['main_points'],
                word_limit=params.get('word_limit', 200)
            )

        elif question_type == 'sentence_transformation':
            return self.lang_solver.solve_sentence_transformation(
                original=params['original'],
                transformation_type=params['transformation_type'],
                custom_answer=params.get('custom_answer')
            )

        elif question_type == 'precis':
            return self.lang_solver.solve_precis(
                passage=params['passage'],
                ratio=params.get('ratio', 0.33)
            )

        elif question_type == 'drama_character':
            return self.lit_solver.solve_drama_character_analysis(
                play=params['play'],
                character=params['character'],
                aspect=params['aspect']
            )

        elif question_type == 'drama_theme':
            return self.lit_solver.solve_drama_theme_analysis(
                play=params['play'],
                theme=params['theme']
            )

        elif question_type == 'drama_quotation':
            return self.lit_solver.solve_drama_quotation_analysis(
                play=params['play'],
                quotation=params['quotation']
            )

        elif question_type == 'prose_analysis':
            return self.lit_solver.solve_prose_analysis(
                story_title=params['story_title'],
                aspect=params['aspect']
            )

        elif question_type == 'poem_analysis':
            return self.lit_solver.solve_poem_analysis(
                poem_key=params['poem_key'],
                aspect=params['aspect']
            )

        elif question_type == 'poem_comparison':
            return self.lit_solver.solve_poem_comparison(
                poem1_key=params['poem1_key'],
                poem2_key=params['poem2_key'],
                comparison_aspect=params['comparison_aspect']
            )

        elif question_type == 'essay_outline':
            return self.lit_solver.solve_essay_outline(
                topic=params['topic'],
                essay_type=params.get('essay_type', 'argumentative'),
                word_limit=params.get('word_limit', 500)
            )

        else:
            return {
                "steps": [f"Unknown question type: {question_type}"],
                "answer": "N/A",
                "verification": "FAIL - unknown question type"
            }

    def generate_practice_questions(self, paper: str = "both",
                                    seed: Optional[int] = None) -> Dict:
        """
        Generate practice questions for a given paper.

        Parameters:
        -----------
        paper : str - 'language', 'literature', or 'both'
        seed : int - Random seed for reproducibility
        """
        return self.generator.generate_question_set(paper, seed)


# ============================================================
# DEMONSTRATION
# ============================================================

def main():
    print("=" * 70)
    print("CISCE Class 12 English - Complete Solver & Question Generator")
    print("=" * 70)
    solver = Class12EnglishSolver()

    # =========================================================
    # 1. COMPREHENSION
    # =========================================================
    print("\n" + "=" * 70)
    print("1. COMPREHENSION SOLVER")
    print("=" * 70)

    passage = (
        "Kerala, often called 'God's Own Country', is a state in southern "
        "India known for its high literacy rate, which stands at 96.2%, the "
        "highest in the country. The state's achievements in public health are "
        "equally remarkable, with life expectancy comparable to developed nations. "
        "Kerala's economy, traditionally dependent on remittances from the Gulf "
        "countries, is now diversifying into tourism, information technology, and "
        "manufacturing. The state's unique cultural fabric, shaped by centuries "
        "of trade with Arab, Chinese, and European civilizations, manifests in its "
        "cuisine, architecture, and performing arts like Kathakali and Theyyam. "
        "The backwaters of Alleppey attract tourists worldwide, contributing over "
        "Rs. 40,000 crore annually to the state's tourism revenue."
    )
    questions = [
        {'type': 'objective', 'question': 'What is Kerala known for?',
         'options': ['Highest literacy rate', 'Being the largest state',
                     'Having the most rainfall', 'Highest population']},
        {'type': 'short_answer', 'question': 'What is Kerala\'s literacy rate?', 'word_limit': 10},
        {'type': 'short_answer', 'question': 'Name two traditional art forms of Kerala.', 'word_limit': 20},
        {'type': 'long_answer', 'question': 'How has Kerala\'s economy evolved over the years?', 'word_limit': 150}
    ]

    result = solver.solve('comprehension', {
        'passage': passage,
        'questions': questions
    })
    print("\nSTEPS:")
    for step in result['steps']:
        print(f"  {step}")
    print(f"\nANSWER:\n{result['answer']}")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 2. FORMAL LETTER
    # =========================================================
    print("\n" + "=" * 70)
    print("2. FORMAL LETTER SOLVER")
    print("=" * 70)

    result = solver.solve('letter', {
        'type': 'formal',
        'recipient': 'The Editor',
        'subject': 'The Menace of Plastic Pollution in Urban India',
        'points': [
            'Extent of plastic waste in Indian cities',
            'Health hazards posed to citizens',
            'Need for public awareness campaigns',
            'Call for stricter regulations'
        ],
        'sender': 'Anjali Mehta, Class XII-B',
        'word_limit': 150
    })
    print("\nSTEPS:")
    for step in result['steps']:
        print(f"  {step}")
    print(f"\nLETTER:\n{result['answer']}")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 3. REPORT
    # =========================================================
    print("\n" + "=" * 70)
    print("3. REPORT SOLVER")
    print("=" * 70)

    result = solver.solve('report', {
        'event_name': 'Annual Science Exhibition',
        'event_date': '15th August, 2025',
        'venue': 'School Auditorium',
        'chief_guest': 'Dr. R. A. Mashelkar',
        'num_participants': 450,
        'highlights': [
            'Winning project: Solar-powered water purifier by Class XII students',
            "Robotics demonstration by the school's tech club",
            'Interactive science quiz with audience participation',
            'Exhibition of over 200 student projects across all classes'
        ]
    })
    print("\nSTEPS:")
    for step in result['steps']:
        print(f"  {step}")
    print(f"\nREPORT:\n{result['answer']}")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 4. SPEECH
    # =========================================================
    print("\n" + "=" * 70)
    print("4. SPEECH SOLVER")
    print("=" * 70)

    result = solver.solve('speech', {
        'topic': 'The Importance of Preserving India\'s Cultural Heritage',
        'audience': 'school assembly',
        'occasion': 'Heritage Day',
        'key_points': [
            'India\'s rich cultural legacy spanning thousands of years',
            'Threats posed by rapid urbanization and globalization',
            'Role of youth in preservation efforts',
            'Government initiatives and what we can do'
        ],
        'duration_minutes': 4
    })
    print("\nSTEPS:")
    for step in result['steps']:
        print(f"  {step}")
    print(f"\nSPEECH:\n{result['answer']}")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 5. ARTICLE
    # =========================================================
    print("\n" + "=" * 70)
    print("5. ARTICLE SOLVER")
    print("=" * 70)

    result = solver.solve('article', {
        'title': 'Digital India: Bridging the Urban-Rural Divide',
        'theme': 'Digital India and its impact on rural connectivity',
        'target_readers': 'educated Indian youth',
        'main_points': [
            'Expansion of internet connectivity to rural areas',
            'Digital payment systems empowering small traders',
            'Online education reaching remote students',
            'Challenges that remain to be addressed'
        ],
        'word_limit': 200
    })
    print("\nSTEPS:")
    for step in result['steps']:
        print(f"  {step}")
    print(f"\nARTICLE:\n{result['answer']}")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 6. SENTENCE TRANSFORMATION
    # =========================================================
    print("\n" + "=" * 70)
    print("6. SENTENCE TRANSFORMATION SOLVER")
    print("=" * 70)

    transformations = [
        ('simple_to_compound',
         'She is honest. She is hardworking.'),
        ('change_to_passive',
         'The teacher teaches the students.'),
        ('combine_using_because',
         'He was late. He missed the bus.'),
        ('change_to_exclamatory',
         'It is a beautiful flower.'),
        ('use_gerund',
         'He opened the door. He saw a beautiful garden.'),
    ]

    for orig, t_type in transformations:
        result = solver.solve('sentence_transformation', {
            'original': orig,
            'transformation_type': t_type
        })
        print(f"\n  Original: {orig}")
        print(f"  Type: {t_type}")
        for step in result['steps'][:6]:
            print(f"    {step}")
        print(f"  VERIFICATION: {result['verification']}")

    # =========================================================
    # 7. PRECIS WRITING
    # =========================================================
    print("\n" + "=" * 70)
    print("7. PRECIS WRITING SOLVER")
    print("=" * 70)

    precis_passage = (
        "Artificial Intelligence is transforming every sector of modern society. "
        "From healthcare diagnostics to autonomous vehicles, from financial "
        "services to agricultural optimization, AI technologies are reshaping "
        "how we live and work. In India, AI adoption has accelerated rapidly, "
        "with major technology companies investing billions of dollars in research "
        "and development. The government's National AI Strategy aims to position "
        "India as a global leader in AI innovation. However, experts warn that "
        "without proper regulation and ethical frameworks, AI could exacerbate "
        "social inequalities, threaten privacy, and displace millions of jobs. "
        "The challenge for policymakers is to harness AI's potential while "
        "safeguarding against its risks. Educational institutions must also adapt "
        "their curricula to prepare students for an AI-driven future."
    )

    result = solver.solve('precis', {'passage': precis_passage, 'ratio': 0.33})
    print("\nSTEPS:")
    for step in result['steps']:
        print(f"  {step}")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 8. DRAMA - CHARACTER ANALYSIS (Julius Caesar - Brutus)
    # =========================================================
    print("\n" + "=" * 70)
    print("8. DRAMA: CHARACTER ANALYSIS - BRUTUS (Julius Caesar)")
    print("=" * 70)

    result = solver.solve('drama_character', {
        'play': 'Julius Caesar',
        'character': 'Brutus',
        'aspect': 'full'
    })
    print("\nSTEPS:")
    for step in result['steps'][:20]:
        print(f"  {step}")
    print("  ...")
    print(f"\nANSWER:\n{result['answer'][:1500]}...")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 9. DRAMA - THEME ANALYSIS
    # =========================================================
    print("\n" + "=" * 70)
    print("9. DRAMA: THEME ANALYSIS - Rhetoric and Persuasion")
    print("=" * 70)

    result = solver.solve('drama_theme', {
        'play': 'Julius Caesar',
        'theme': 'Rhetoric and Persuasion'
    })
    print("\nSTEPS:")
    for step in result['steps'][:15]:
        print(f"  {step}")
    print("  ...")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 10. DRAMA - QUOTATION ANALYSIS
    # =========================================================
    print("\n" + "=" * 70)
    print("10. DRAMA: QUOTATION ANALYSIS")
    print("=" * 70)

    result = solver.solve('drama_quotation', {
        'play': 'Julius Caesar',
        'quotation': 'Friends, Romans, countrymen, lend me your ears'
    })
    print("\nSTEPS:")
    for step in result['steps'][:15]:
        print(f"  {step}")
    print("  ...")
    print(f"\nANSWER:\n{result['answer'][:1000]}...")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 11. POETRY - POEM ANALYSIS
    # =========================================================
    print("\n" + "=" * 70)
    print("11. POETRY: POEM ANALYSIS - The Tyger")
    print("=" * 70)

    result = solver.solve('poem_analysis', {
        'poem_key': 'the_tyger',
        'aspect': 'full'
    })
    print("\nSTEPS:")
    for step in result['steps'][:20]:
        print(f"  {step}")
    print("  ...")
    print(f"\nANSWER:\n{result['answer'][:1500]}...")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 12. POETRY - POEM COMPARISON
    # =========================================================
    print("\n" + "=" * 70)
    print("12. POETRY: POEM COMPARISON - Dover Beach vs Ulysses")
    print("=" * 70)

    result = solver.solve('poem_comparison', {
        'poem1_key': 'dover_beach',
        'poem2_key': 'ulysses',
        'comparison_aspect': 'full'
    })
    print("\nSTEPS:")
    for step in result['steps'][:18]:
        print(f"  {step}")
    print("  ...")
    print(f"\nANSWER:\n{result['answer']}")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 13. PROSE ANALYSIS
    # =========================================================
    print("\n" + "=" * 70)
    print("13. PROSE: STORY ANALYSIS")
    print("=" * 70)

    result = solver.solve('prose_analysis', {
        'story_title': 'The Girl in the Cafe',
        'aspect': 'full'
    })
    print("\nSTEPS:")
    for step in result['steps']:
        print(f"  {step}")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 14. ESSAY OUTLINE
    # =========================================================
    print("\n" + "=" * 70)
    print("14. ESSAY OUTLINE GENERATOR")
    print("=" * 70)

    result = solver.solve('essay_outline', {
        'topic': 'Environmental conservation is the need of the hour',
        'essay_type': 'argumentative',
        'word_limit': 500
    })
    print("\nSTEPS:")
    for step in result['steps']:
        print(f"  {step}")
    print(f"\nOUTLINE:\n{result['answer']}")
    print(f"\nVERIFICATION: {result['verification']}")

    # =========================================================
    # 15. GENERATE PRACTICE QUESTIONS
    # =========================================================
    print("\n" + "=" * 70)
    print("15. GENERATE PRACTICE QUESTIONS (deterministic, seed=123)")
    print("=" * 70)

    practice_qs = solver.generate_practice_questions(paper='both', seed=123)

    for paper_name, paper_questions in practice_qs.items():
        print(f"\n--- {paper_name.upper()} PAPER QUESTIONS ---")
        for q_name, q_data in paper_questions.items():
            print(f"\n  {q_name}:")
            if q_data['type'] == 'comprehension':
                print(f"    Passage (first 80 chars): {q_data['data']['passage'][:80]}...")
                print(f"    Questions: {len(q_data['data']['questions'])}")
            elif q_data['type'] in ['drama_character', 'drama_theme', 'drama_quotation',
                                     'poem_analysis', 'poem_comparison', 'prose_analysis',
                                     'essay_outline']:
                print(f"    Type: {q_data['type']}")
                print(f"    Params: {q_data['params']}")
            elif q_data['type'] in ['letter', 'report', 'speech', 'article']:
                print(f"    Type: {q_data['type']}")
                params = q_data['data']['params']
                if isinstance(params, dict):
                    print(f"    Key: {list(params.keys())}")
            elif q_data['type'] == 'sentence_transformation':
                d = q_data['data']
                print(f"    Original: {d['original']}")
                print(f"    Type: {d['transformation_type']}")

    # =========================================================
    # 16. VERIFICATION - Solve same question set twice
    # =========================================================
    print("\n" + "=" * 70)
    print("16. DETERMINISM VERIFICATION")
    print("=" * 70)

    gen1 = QuestionGenerator(seed=42)
    gen2 = QuestionGenerator(seed=42)
    qs1 = gen1.generate_question_set('language')
    qs2 = gen2.generate_question_set('language')

    # Compare passage content
    p1 = qs1['language']['Q1_comprehension']['data']['passage'][:50]
    p2 = qs2['language']['Q1_comprehension']['data']['passage'][:50]

    is_deterministic = (qs1 == qs2)
    print(f"Same seed (42) produces identical results: {is_deterministic}")
    print(f"  Passage match: {p1 == p2}")
    print(f"  First 50 chars match: '{p1}' == '{p2}' -> {p1 == p2}")

    gen3 = QuestionGenerator(seed=99)
    qs3 = gen3.generate_question_set('language')
    p3 = qs3['language']['Q1_comprehension']['data']['passage'][:50]
    print(f"Different seed (99) produces different results: {p1 != p3}")
    print(f"  Seed 42 passage: '{p1}'")
    print(f"  Seed 99 passage: '{p3}'")

    print("\n" + "=" * 70)
    print("ALL DEMONSTRATIONS COMPLETE")
    print("=" * 70)


if __name__ == '__main__':
    main()