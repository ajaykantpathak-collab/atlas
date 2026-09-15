"""
CISCE Class 12 English — Deterministic Question Generator
Syllabus topics covered:
  prose_001    Short Stories: Character Sketch / Theme / Setting
  prose_002    Short Stories: Point of View / Narrative Technique
  prose_003    Short Stories: Comprehension & Interpretation
  poetry_001   Poems: Appreciation of imagery & symbolism
  poetry_002   Poems: Poetic Devices & Figures of Speech
  poetry_003   Poems: Theme & Central Idea
  poetry_004   Poems: Poem Comparison (The Road Not Taken + other)
  drama_001    The Tempest: Acts & Character Analysis
  drama_002    The Tempest: Themes & Plot
  drama_003    The Tempest: Dramatic Technique & Language
  grammar_001  Transformation of Sentences
  grammar_002  Synthesis of Sentences
  grammar_003  Precis Writing
  grammar_004  Report Writing
  grammar_005  Notice & Email Writing
  comp_001     Comprehension Passages (Prose)
  comp_002     Comprehension Passages (Poetry)
  comp_003     Vocabulary & Reference to Context
  essay_001    Essay Writing (Descriptive, Narrative, Argumentative)
  skill_001    Integrated Skills: Letter + Report
"""

import random
import string
import re
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional

# ──────────────────────────────────────────────────────────────
#  DATA
# ──────────────────────────────────────────────────────────────

INDIAN_FIRST_NAMES = [
    "Rahul", "Priya", "Aarav", "Anaya", "Vihaan", "Diya",
    "Ishaan", "Kavya", "Arjun", "Saanvi", "Aditya", "Meera",
    "Rohan", "Isha", "Kunal", "Nisha", "Vikram", "Pooja",
    "Amit", "Sneha", "Rajesh", "Sunita", "Deepak", "Kavita",
    "Sanjay", "Ritu", "Nikhil", "Tanvi", "Siddharth", "Aarohi",
    "Karan", "Divya", "Abhishek", "Shreya", "Manish", "Riya",
]

INDIAN_LAST_NAMES = [
    "Sharma", "Verma", "Gupta", "Patel", "Singh", "Kumar",
    "Reddy", "Iyer", "Joshi", "Nair", "Chatterjee", "Banerjee",
    "Rao", "Mehta", "Desai", "Shah", "Kulkarni", "Ramanathan",
]

INDIAN_CITIES = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata",
    "Hyderabad", "Pune", "Jaipur", "Ahmedabad", "Lucknow",
    "Kochi", "Chandigarh", "Indore", "Coimbatore", "Goa",
    "Mysore", "Varanasi", "Udaipur", "Shimla", "Dehradun",
]

INDIAN_PLACES_LANDMARKS = [
    "Gateway of India", "India Gate", "Marina Beach",
    "Dal Lake", "Victoria Memorial", "Hampi", "Ajanta Caves",
    "Mysore Palace", "Lake Pichola", "Backwaters of Kerala",
    "Gateway of South India", "Ganges River", "Western Ghats",
    "Sundarbans", "Kaziranga National Park",
]

INDIAN_PROFESSIONS = [
    "software engineer", "doctor", "teacher", "journalist",
    "environmental scientist", "civil servant", "lawyer",
    "architect", "social worker", "research scholar",
    "business analyst", "wildlife photographer", "fashion designer",
    "food critic", "urban planner",
]

INDIAN_INSTITUTIONS = [
    "Indian Institute of Technology", "Jawaharlal Nehru University",
    "Tata Institute of Social Sciences", "Indian Institute of Management",
    "National Institute of Design", "Film and Television Institute of India",
    "Indian Statistical Institute", "National School of Drama",
]

INDIA_NEWSPAPERS = [
    "The Hindu", "The Indian Express", "The Times of India",
    "Hindustan Times", "The Telegraph", "The Economic Times",
    "The Statesman", "The Tribune",
]

SHORT_STORIES = [
    {
        "id": "prose_001",
        "title": "The Persian Handicrafts",
        "author": "Indian Short Story",
        "themes": ["cultural heritage", "tradition vs modernity", "craftsmanship"],
        "setting": "Old Delhi, Chandni Chowk",
        "characters": ["Raman", "Farhan", "Raman's grandmother"],
        "plot": "A young man discovers the value of traditional crafts.",
        "setting_indian": "A small workshop in Chandni Chowk, Old Delhi",
        "protagonist": "Raman Sharma",
    },
    {
        "id": "prose_002",
        "title": "The Last Leaf",
        "author": "O. Henry",
        "themes": ["sacrifice", "hope", "friendship", "art"],
        "setting": "Greenwich Village, New York",
        "characters": ["Sue", "Johnsy", "Behrman"],
        "plot": "An old artist sacrifices his life to give hope to a dying girl.",
        "setting_indian": "An artists' colony in Mumbai's Kala Ghoda district",
        "protagonist": "Johnsy (renamed Priya in Indian adaptation)",
    },
    {
        "id": "prose_003",
        "title": "The Necklace",
        "author": "Guy de Maupassant",
        "themes": ["pride", "consequences", "appearance vs reality", "honesty"],
        "setting": "Paris, France",
        "characters": ["Mathilde Loisel", "Monsieur Loisel", "Madame Forestier"],
        "plot": "A woman borrows a necklace for a ball, loses it, and replaces it at great cost.",
        "setting_indian": "A middle-class family in Pune",
        "protagonist": "Meera Desai",
    },
    {
        "id": "prose_004",
        "title": "The Gift of the Magi",
        "author": "O. Henry",
        "themes": ["love", "sacrifice", "generosity", "irony"],
        "setting": "New York City, early 1900s",
        "characters": ["Jim", "Della", "Madame Sofronie"],
        "plot": "A young couple each sell their prized possession to buy a gift for the other.",
        "setting_indian": "A small apartment in Kolkata's South Park Street",
        "protagonist": "Disha and her husband Arjun Mukherjee",
    },
    {
        "id": "prose_005",
        "title": "The Man Who Knows Trees",
        "author": "Indian Short Story",
        "themes": ["environment", "tradition", "forest conservation"],
        "setting": "Western Ghats, Karnataka",
        "characters": ["Hakim", "a young journalist", "the old forester"],
        "plot": "A journalist learns about traditional forest wisdom from an elder.",
        "setting_indian": "A tribal village near Bandipur National Park",
        "protagonist": "Hakim Singh, a forest ranger",
    },
    {
        "id": "prose_006",
        "title": "The Open Window",
        "author": "Saki",
        "themes": ["deception", "appearance vs reality", "wit"],
        "setting": "Countryside, England",
        "characters": ["Framton Nuttel", "Vera", "Mrs. Sappleton"],
        "plot": "A visitor is tricked by a mischievous girl into believing a ghost story.",
        "setting_indian": "A hill station bungalow in Kodaikanal",
        "protagonist": "Mr. Framton (adapted as a visitor from Mumbai)",
    },
    {
        "id": "prose_007",
        "title": "The Blue Bead",
        "author": "Indian Short Story",
        "themes": ["innocence", "courage", "class consciousness"],
        "setting": "A village in Kerala",
        "characters": ["Neela", "her grandmother", "the shopkeeper"],
        "plot": "A poor girl's simple kindness reveals true human values.",
        "setting_indian": "A fishing village near Alappuzha, Kerala",
        "protagonist": "Neela, a young schoolgirl",
    },
    {
        "id": "prose_008",
        "title": "The Bet",
        "author": "Anton Chekhov",
        "themes": ["value of life", "solitude", "human nature", "capital punishment"],
        "setting": "Russia",
        "characters": ["the banker", "the lawyer", "the watchman"],
        "plot": "A banker and a lawyer debate capital punishment vs life imprisonment, leading to a bet.",
        "setting_indian": "A lawyer's chambers in Mumbai and a luxury resort in Goa",
        "protagonist": "Advocate Kapoor and a wealthy industrialist",
    },
]

POEMS = [
    {
        "id": "poetry_001",
        "title": "The Road Not Taken",
        "author": "Robert Frost",
        "meter": "iambic tetrameter",
        "rhyme_scheme": "ABAAB",
        "stanzas": 4,
        "central_theme": "The choices we make in life and their consequences",
        "key_images": ["two roads", "yellow wood", "undergrowth"],
        "symbols": {
            "yellow wood": "autumn of life, a time of decision",
            "two roads": "two life choices or paths",
            "grassy and wanted wear": "the less conventional, less traveled path",
        },
        "mood": "Reflective and contemplative",
        "tone": "Thoughtful, with a hint of irony",
        "figures": ["ambiguity", "metaphor", "personification", "repetition"],
    },
    {
        "id": "poetry_002",
        "title": "Dover Beach",
        "author": "Matthew Arnold",
        "meter": "irregular iambic",
        "rhyme_scheme": "ABAB CDCD EFEF GG",
        "stanzas": 4,
        "central_theme": "The loss of faith in the modern world",
        "key_images": ["sea", "moonlight", "cliffs of England", "darkling plain"],
        "symbols": {
            "Sea of Faith": "the collective religious faith of humanity",
            "moon-blanched land": "a pale, emotionless world",
            "darkling plain": "the confused modern world without faith",
        },
        "mood": "Melancholy and nostalgic",
        "tone": "Contemplative, pleading, and melancholic",
        "figures": ["metaphor", "personification", "alliteration", "imagery"],
    },
    {
        "id": "poetry_003",
        "title": "A thing of Beauty is a Joy Forever",
        "author": "John Keats",
        "meter": "iambic pentameter",
        "rhyme_scheme": "ABABCDEDCE",
        "stanzas": 1,
        "central_theme": "Beauty provides eternal joy and solace",
        "key_images": ["sun", "moon", "trees", "flowers", "clear rills"],
        "symbols": {
            "sun": "the source of light and warmth, beauty",
            "clear rills": "pure, refreshing moments of beauty",
            "shadows": "difficult times dispelled by beauty",
        },
        "mood": "Joyful and uplifting",
        "tone": "Celebratory and lyrical",
        "figures": ["synecdoche", "metaphor", "hyperbole", "apostrophe"],
    },
    {
        "id": "poetry_004",
        "title": "Cold Sneeze",
        "author": "Indian Poem (adapted)",
        "meter": "free verse",
        "rhyme_scheme": "free",
        "stanzas": 3,
        "central_theme": "The universality of human experience through everyday moments",
        "key_images": ["winter morning", "chai", "rickshaw"],
        "symbols": {
            "chai": "Indian domestic warmth",
            "winter morning": "narrator coldness",
        },
        "mood": "Humorous and relatable",
        "tone": "Light-hearted and conversational",
        "figures": ["imagery", "hyperbole"],
    },
    {
        "id": "poetry_005",
        "title": "The Tyger",
        "author": "William Blake",
        "meter": "trochaic tetrameter catalectic",
        "rhyme_scheme": "AABB",
        "stanzas": 6,
        "central_theme": "The duality of creation and the nature of good and evil",
        "key_images": ["tyger", "fire", "forests of the night", "forge"],
        "symbols": {
            "tyger": "fierce beauty and the dark side of creation",
            "fire": "divine passion and creative energy",
            "forge": "the workshop of creation",
        },
        "mood": "Awe and wonder",
        "tone": "Amazed and questioning",
        "figures": ["apostrophe", "alliteration", "synecdoche", "metaphor"],
    },
    {
        "id": "poetry_006",
        "title": "Crossing the Bar",
        "author": "Alfred Lord Tennyson",
        "meter": "iambic tetrameter",
        "rhyme_scheme": "ABAB",
        "stanzas": 4,
        "central_theme": "Acceptance of death and faith in the afterlife",
        "key_images": ["sunset", "evening star", "flood", "bar"],
        "symbols": {
            "bar": "the boundary between life and death",
            "sunset": "the end of life",
            "flood": "the journey of life",
            "Pilot": "God, who guides the soul",
        },
        "mood": "Serene and accepting",
        "tone": "Calm, peaceful, and resigned",
        "figures": ["metaphor", "alliteration", "personification"],
    },
    {
        "id": "poetry_007",
        "title": "After Blenheim",
        "author": "Robert Southey",
        "meter": "ballad meter",
        "rhyme_scheme": "AABB",
        "stanzas": 11,
        "central_theme": "The senselessness of war and its impact on common people",
        "key_images": ["river", "bones", "skull", "summer evening"],
        "symbols": {
            "river": "the passage of time and death",
            "bones": "the human cost of war",
        },
        "mood": "Tragic and ironic",
        "tone": "Ironical and sympathetic",
        "figures": ["irony", "repetition", "euphemism", "metonymy"],
    },
    {
        "id": "poetry_008",
        "title": "To Autumn",
        "author": "John Keats",
        "meter": "iambic pentameter",
        "rhyme_scheme": "ABAB CDEDCCE (per stanza)",
        "stanzas": 3,
        "central_theme": "The beauty and abundance of autumn as a metaphor for maturity",
        "key_images": ["maturing sun", "winnowing wind", "gathering swallows"],
        "symbols": {
            "maturing sun": "the passage of time and ripeness",
            "harvest": "the fruits of labor and life",
            "gathering swallows": "departure, approaching winter/death",
        },
        "mood": "Peaceful and rich",
        "tone": "Celebratory and meditative",
        "figures": ["personification", "apostrophe", "alliteration", "imagery"],
    },
]

DRAMA_TEMPEST = [
    {
        "id": "drama_001",
        "act": 1,
        "title": "The Tempest",
        "author": "William Shakespeare",
        "key_scenes": [
            "The storm at sea (the tempest itself)",
            "Prospero's backstory revealed to Miranda",
            "Prospero plots to bring Antonio to the island",
        ],
        "characters": ["Prospero", "Miranda", "Ariel", "Caliban", "Antonio", "Sebastian", "Alonso", "Ferdinand", "Gonzalo"],
        "themes": ["power and control", "colonialism", "magic and illusion", "revenge vs forgiveness", "nature vs nurture"],
        "quotes": [
            "We are such stuff as dreams are made on",
            "The rarer action is in virtue than in vengeance",
            "O brave new world that has such people in't",
            "Misery acquaints a man with strange bedfellows",
        ],
        "magic_terms": ["charms", "art", "spirits", "enchanted", "abjured"],
        "setting_indian": "An uninhabited island off the Lakshadweep archipelago",
        "protagonist": "Prospero (the deposed Duke of Milan)",
        "hero": "Ferdinand (the prince who falls in love with Miranda)",
    },
    {
        "id": "drama_002",
        "act": 2,
        "title": "The Tempest — Act 2",
        "key_scenes": [
            "Ariel puts Alonso's party to sleep",
            "Sebastian and Antonio plot to kill Alonso",
            "Ariel wakes Gonzalo, foiling the plot",
            "Caliban encounters Stephano and Trinculo",
        ],
        "characters": ["Prospero", "Ariel", "Caliban", "Stephano", "Trinculo", "Alonso", "Sebastian", "Antonio", "Gonzalo"],
        "themes": ["treachery", "subjugation", "power dynamics", "colonial oppression"],
        "quotes": [
            "Hell is empty and all the devils are here",
            "We are merely cheated of our lives by drunkards",
            "A most poor credulous monster",
        ],
        "magic_terms": ["apparition", "invisible", "torment", "enchanted"],
        "setting_indian": "The dense forest of a Lakshadweep island",
        "protagonist": "Prospero",
        "hero": "Ferdinand",
    },
    {
        "id": "drama_003",
        "act": 3,
        "title": "The Tempest — Act 3",
        "key_scenes": [
            "Caliban plots to kill Prospero with Stephano",
            "Prospero conjures a feast which Ariel snatches away",
            "Ferdinand and Miranda meet and fall in love",
            "Prospero's test of Ferdinand begins",
        ],
        "characters": ["Prospero", "Miranda", "Ferdinand", "Caliban", "Stephano", "Trinculo", "Ariel"],
        "themes": ["true love", "betrayal", "magic as control", "colonial themes"],
        "quotes": [
            "My high charms work and makes my condition static",
            "The rarer action is in virtue than in vengeance",
            "How beauteous mankind is! O brave new world!",
        ],
        "magic_terms": ["charms", "tempest", "charm", "free", "allegiance"],
        "setting_indian": "Same island setting",
        "protagonist": "Prospero",
        "hero": "Ferdinand",
    },
    {
        "id": "drama_004",
        "act": 4,
        "title": "The Tempest — Act 4",
        "key_scenes": [
            "Prospero uses his magic for a masque for Ferdinand and Miranda",
            "The masque blesses the couple",
            "Prospero remembers Caliban's plot",
            "Prospero sends Ariel to punish the conspirators",
        ],
        "characters": ["Prospero", "Ariel", "Miranda", "Ferdinand", "Iris", "Ceres", "Juno"],
        "themes": ["celebration", "marriage", "renewal", "forgiveness"],
        "quotes": [
            "I do forget",
            "Rejoice beyond a common joy",
            "The charm dissolves apace",
        ],
        "magic_terms": ["masque", "celebration", "charm", "blessing", "disappear"],
        "setting_indian": "Same island setting",
        "protagonist": "Prospero",
        "hero": "Ferdinand",
    },
    {
        "id": "drama_005",
        "act": 5,
        "title": "The Tempest — Act 5 (Resolution)",
        "key_scenes": [
            "Prospero reveals himself to the shipwrecked party",
            "Prospero forgives his brother Antonio",
            "Ariel is promised freedom",
            "Prospero renounces his magic and prepares to return to Milan",
        ],
        "characters": ["Prospero", "Ariel", "Miranda", "Ferdinand", "Alonso", "Sebastian", "Antonio", "Gonzalo", "Caliban"],
        "themes": ["forgiveness", "freedom", "redemption", "closure"],
        "quotes": [
            "We are such stuff as dreams are made on",
            "The rarer action is in virtue than in vengeance",
            "Set Ariel free",
            "My high charms work no more",
        ],
        "magic_terms": ["renounce", "break", "staff", "drown", "book", "set free"],
        "setting_indian": "Same island setting, departure scene",
        "protagonist": "Prospero",
        "hero": "Ferdinand",
    },
]

GRAMMAR_RULES = {
    "simple_to_complex": {
        "patterns": [
            ("Rahul went to the market. He bought vegetables.", "Rahul, who went to the market, bought vegetables."),
            ("Meera is studying hard. She wants to become a doctor.", "Meera, who is studying hard, wants to become a doctor."),
            ("The teacher explained the lesson. The students understood it.", "The teacher explained the lesson which the students understood."),
        ],
    },
    "simple_to_compound": {
        "patterns": [
            ("Rahul went to the market. He bought vegetables.", "Rahul went to the market and bought vegetables."),
            ("Meera is studying hard. She wants to become a doctor.", "Meera is studying hard and she wants to become a doctor."),
            ("The storm came. The sailors took shelter.", "The storm came so the sailors took shelter."),
        ],
    },
    "complex_to_simple": {
        "patterns": [
            ("Rahul, who is my neighbour, is a doctor.", "My neighbour Rahul is a doctor."),
            ("The book which I bought is very interesting.", "I bought a very interesting book."),
            ("The girl who won the prize is my sister.", "My sister won the prize."),
        ],
    },
    "compound_to_complex": {
        "patterns": [
            ("Rahul went to the market and bought vegetables.", "Rahul, who went to the market, bought vegetables."),
            ("Meera is studying hard and she wants to be a doctor.", "Meera is studying hard because she wants to be a doctor."),
            ("It was raining, so I stayed indoors.", "Since it was raining, I stayed indoors."),
        ],
    },
    "affirmative_to_negative": {
        "patterns": [
            ("Rahul is always honest.", "Rahul is never dishonest."),
            ("Everyone attended the meeting.", "No one was absent from the meeting."),
            ("The mango is as sweet as honey.", "The mango is not less sweet than honey."),
        ],
    },
    "affirmative_to_interrogative": {
        "patterns": [
            ("Rahul is a good student.", "Is Rahul a good student?"),
            ("She can solve this problem.", "Can she solve this problem?"),
            ("It is raining heavily.", "Is it raining heavily?"),
        ],
    },
    "exclamatory_to_assertive": {
        "patterns": [
            ("What a beautiful garden this is!", "This is a very beautiful garden."),
            ("How clever you are!", "You are very clever."),
            ("If only I were young again!", "I wish I were young again."),
        ],
    },
    "comparison_degrees": {
        "patterns": [
            ("Mumbai is bigger than Pune.", "Mumbai is bigger than any other city in Maharashtra. / Mumbai is one of the biggest cities in India."),
            ("Gold is as precious as platinum.", "Gold is not less precious than platinum."),
            ("No other city is as big as Mumbai.", "Mumbai is the biggest city."),
            ("The rose is the most beautiful flower.", "No flower is as beautiful as the rose."),
        ],
    },
    "synthesis_sentences": {
        "patterns": [
            ("I saw a man. He was carrying a heavy bag.", "I saw a man carrying a heavy bag."),
            ("The boy finished his homework. He went out to play.", "The boy having finished his homework went out to play."),
            ("She was tired. She kept working.", "Though she was tired, she kept working."),
            ("You must work hard. You will fail otherwise.", "You must work hard or you will fail."),
            ("I met Priya. She is my colleague.", "I met Priya who is my colleague."),
        ],
    },
    "voice_change": {
        "patterns": [
            ("Rahul wrote the letter.", "The letter was written by Rahul."),
            ("Meera is writing a novel.", "A novel is being written by Meera."),
            ("Shakespeare wrote Hamlet.", "Hamlet was written by Shakespeare."),
            ("The gardener is watering the plants.", "The plants are being watered by the gardener."),
        ],
    },
}

ESSAY_TYPES = {
    "descriptive": {
        "topics": [
            "A visit to the Taj Mahal at sunrise",
            "The monsoon season in Mumbai",
            "Life in a small town in Rajasthan",
            "My experience at a village fair in Bihar",
            "The beauty of the Western Ghats",
            "Celebrating Diwali with my family in Amritsar",
        ],
        "features": ["uses sensory details", "appeals to five senses", "creates vivid imagery"],
    },
    "narrative": {
        "topics": [
            "The day I overcame my fear of public speaking",
            "My journey to Ladakh and what I learned",
            "An unforgettable experience during my school's annual function",
            "How volunteering at an old age home changed me",
            "The adventure of my first solo train journey",
            "A conversation that changed my perspective on life",
        ],
        "features": ["has a beginning, middle, and end", "uses first person", "builds tension"],
    },
    "argumentative": {
        "topics": [
            "Should board exams be abolished in India?",
            "The impact of social media on youth: a critical analysis",
            "Is online education as effective as classroom learning?",
            "Should India adopt a uniform civil code?",
            "The case for renewable energy in India",
            "Should higher education be free for all?",
        ],
        "features": ["presents a thesis", "uses arguments and counter-arguments", "draws a conclusion"],
    },
    "persuasive": {
        "topics": [
            "Why every student should learn a regional Indian language",
            "The importance of environmental education in schools",
            "Why India needs more public libraries",
            "The case for a 4-day work week in India",
        ],
        "features": ["aims to convince", "uses emotional appeal and logic", "has a call to action"],
    },
}

REPORT_TYPES = [
    {
        "type": "school_event_report",
        "event_types": ["Annual Sports Day", "Science Exhibition", "Cultural Festival", "Literary Meet", "Debate Competition"],
        "venue_prefix": "School",
        "sections": ["title", "date_time", "venue", "participants", "events_held", "prize_winners", "conclusion"],
        "indian_names": INDIAN_FIRST_NAMES,
    },
    {
        "type": "social_event_report",
        "event_types": ["Awareness Campaign on Clean India", "Tree Plantation Drive", "Blood Donation Camp", "Health Check-up Camp"],
        "venue_prefix": "Community Center",
        "sections": ["title", "date_time", "venue", "organizers", "activities", "outcomes", "conclusion"],
        "indian_names": INDIAN_FIRST_NAMES,
    },
]

LETTER_TYPES = {
    "formal": {
        "to": ["editor", "principal", "chairman", "manager", "civic body"],
        "topics": [
            "complaint about road conditions",
            "request for a new library",
            "suggestion to improve traffic management",
            "application for a scholarship",
            "complaint about poor water supply",
        ],
        "closings": ["Yours faithfully", "Yours sincerely"],
    },
    "informal": {
        "to": ["friend", "cousin", "sister", "brother"],
        "topics": [
            "invitation to visit during holidays",
            "describing a recent trip",
            "thanking for a gift",
            "congratulating on an achievement",
        ],
        "closings": ["Yours affectionately", "With love", "Yours truly"],
    },
}

COMPREHENSION_PASSAGES = {
    "prose": [
        {
            "title": "The Changing Face of Indian Villages",
            "passage": "In the heart of rural India, a quiet revolution is taking place. Villages that once relied solely on agriculture are now embracing technology and entrepreneurship. Ramesh, a young farmer from a small village near Pune, uses smartphone apps to monitor weather patterns and market prices. His wife, Sunita, has started a small business making organic pickles that she sells online. Their children attend the new digital learning center set up by the government under the Digital India initiative. The village now has 4G connectivity, solar-powered streetlights, and a primary health center equipped with telemedicine facilities. This transformation is not unique; similar stories are unfolding across thousands of villages in India, painting a picture of hope and progress in the world's largest rural landscape.",
            "word_count": 137,
            "questions": [
                {
                    "q": "How is Ramesh using technology in his farming?",
                    "a": "Ramesh uses smartphone apps to monitor weather patterns and market prices.",
                    "difficulty": "easy",
                },
                {
                    "q": "What does the passage tell us about Sunita?",
                    "a": "Sunita started a small business making organic pickles that she sells online.",
                    "difficulty": "easy",
                },
                {
                    "q": "Explain how the passage reflects the theme of 'India's rural transformation'.",
                    "a": "The passage shows how rural Indian villages are embracing technology, entrepreneurship, and government initiatives like Digital India. Examples include smartphone use in farming, online businesses, digital learning centers, and telemedicine, all indicating a shift from traditional agriculture-based economies to more diverse and connected rural communities.",
                    "difficulty": "hard",
                },
                {
                    "q": "What is the tone of the passage?",
                    "a": "Optimistic and hopeful, celebrating the progress and transformation in rural India.",
                    "difficulty": "medium",
                },
            ],
        },
        {
            "title": "The Art of Traditional Indian Craftsmanship",
            "passage": "Deep in the lanes of Jaipur's old city, the rhythmic tapping of chisels on brass tells the story of a centuries-old craft. Rajendra Kumar, a master artisan in his late fifties, belongs to a lineage of metalworkers that stretches back seven generations. Every morning, he sits at his wooden bench and begins the delicate process of hand-engraving brass utensils using traditional tools passed down through his family. Despite the rise of machine-made alternatives, Rajendra has seen a growing appreciation for handcrafted items, especially among younger urban consumers. The government's GI (Geographical Indication) tag for Jaipur's brassware and online platforms have opened new markets for artisans like him. 'When a customer tells me they will cherish this piece for generations, it makes every hour of work worthwhile,' says Rajendra, carefully polishing a decorative plate that will soon find its way to a home in Mumbai or New York.",
            "word_count": 161,
            "questions": [
                {
                    "q": "Where does Rajendra Kumar work and what is his craft?",
                    "a": "Rajendra works in Jaipur's old city as a brass metalworker, hand-engraving brass utensils using traditional tools.",
                    "difficulty": "easy",
                },
                {
                    "q": "What factors have helped artisans like Rajendra reach new markets?",
                    "a": "The GI tag for Jaipur brassware and online e-commerce platforms have opened new domestic and international markets for handcrafted items.",
                    "difficulty": "medium",
                },
                {
                    "q": "Discuss how the passage brings out the theme of 'tradition surviving in a modern world'.",
                    "a": "The passage shows how traditional craftsmanship endures through family lineages, traditional tools, and manual techniques even in the age of machine production. Rajendra represents generations of artisans who adapt by using modern marketing (GI tags, online platforms) while maintaining the core authenticity of handcraft. This demonstrates how tradition and modernity can coexist and even strengthen each other.",
                    "difficulty": "hard",
                },
            ],
        },
    ],
    "poetry": [
        {
            "title": "The Voice of the River",
            "passage": "I am the river that carved the valley, said the river. I am the Ganges that flows through Haridwar, Banaras, and Kolkata. I have seen kings and beggars alike drink from my waters. I have washed away the sins of millions and nourished the fields of Punjab. But now they say I am polluted, choked with plastic and sewage. My fish are dying, my turtles are disappearing. Still I flow, for I am eternal. But will you, my children, let me die? The river's voice echoed through the valley, and the mountains nodded sadly.",
            "word_count": 97,
            "questions": [
                {
                    "q": "What places does the river mention in the passage?",
                    "a": "Haridwar, Banaras, and Kolkata.",
                    "difficulty": "easy",
                },
                {
                    "q": "What is the main concern expressed by the river in this passage?",
                    "a": "The river is concerned about pollution, specifically plastic waste and sewage, which are killing fish and turtles.",
                    "difficulty": "medium",
                },
                {
                    "q": "Analyze how personification is used in this passage and its effect.",
                    "a": "The river is personified as speaking, having emotions, and pleading with 'my children.' This creates an emotional connection between the reader and the river, making the environmental concern more urgent and personal. The personification transforms an ecological issue into a moral and emotional one.",
                    "difficulty": "hard",
                },
            ],
        },
    ],
}

LITERARY_TERMS = {
    "metaphor": "A figure of speech that makes an implicit, implied, or hidden comparison between two unrelated things.",
    "simile": "A figure of speech that compares two different things using the words 'like' or 'as'.",
    "personification": "Attributing human qualities to inanimate objects or abstract ideas.",
    "alliteration": "The repetition of the same consonant sound at the beginning of words in close succession.",
    "onomatopoeia": "Words that imitate natural sounds (e.g., buzz, hiss, murmur).",
    "hyperbole": "Exaggerated statements not meant to be taken literally.",
    "irony": "A contrast between expectation and reality, often for humorous or emphatic effect.",
    "imagery": "Visually descriptive or figurative language that appeals to the five senses.",
    "symbolism": "Using symbols to signify ideas and qualities beyond their literal meaning.",
    "oxymoron": "A figure of speech where contradictory terms appear together (e.g., deafening silence).",
    "pun": "A play on words exploiting different possible meanings for humorous effect.",
    "apostrophe": "A direct address to an absent person or personified object.",
    "assonance": "The repetition of the same vowel sound in nearby words.",
    "consonance": "The repetition of consonant sounds in close proximity.",
    "enjambment": "The continuation of a sentence without a pause beyond the end of a line.",
    "caesura": "A pause in a line of poetry, usually marked by punctuation.",
    "stanza": "A group of lines forming the basic unit of a poem.",
    "refrain": "A line or phrase repeated at intervals in a poem or song.",
    "rhyme_scheme": "The pattern of rhymes in a poem, marked by letters of the alphabet.",
    "metonymy": "Substitution of a word with another closely associated with it.",
    "euphemism": "A mild or indirect word substituted for one considered too harsh.",
    "pathetic_fallacy": "Attributing human emotions to nature or inanimate objects.",
    "dramatic_irony": "When the audience knows something that the characters do not.",
    "soliloquy": "A speech by a character speaking alone on stage to reveal inner thoughts.",
    "aside": "A short remark by a character to the audience, not heard by other characters.",
}

SYNONYM_PAIRS = [
    ("happy", "joyful", "glad", "cheerful", "elated"),
    ("sad", "sorrowful", "melancholy", "gloomy", "dejected"),
    ("beautiful", "lovely", "gorgeous", "stunning", "exquisite"),
    ("big", "large", "enormous", "gigantic", "immense"),
    ("small", "tiny", "minute", "petite", "diminutive"),
    ("fast", "quick", "rapid", "swift", "speedy"),
    ("slow", "sluggish", "leisurely", "gradual", "unhurried"),
    ("important", "significant", "crucial", "vital", "essential"),
    ("difficult", "challenging", "arduous", "demanding", "strenuous"),
    ("begin", "commence", "initiate", "launch", "embark"),
    ("end", "conclude", "terminate", "finish", "cease"),
    ("show", "demonstrate", "display", "reveal", "manifest"),
    ("think", "ponder", "contemplate", "reflect", "deliberate"),
    ("afraid", "frightened", "terrified", "apprehensive", "alarmed"),
    ("tired", "exhausted", "weary", "fatigued", "drained"),
    ("rich", "wealthy", "affluent", "prosperous", "opulent"),
    ("poor", "impoverished", "destitute", "needy", "underprivileged"),
    ("brave", "courageous", "valiant", "intrepid", "dauntless"),
    ("clever", "intelligent", "astute", "shrewd", "bright"),
    ("kind", "benevolent", "generous", "compassionate", "magnanimous"),
]

ANTONYM_PAIRS = [
    ("hot", "cold"), ("big", "small"), ("fast", "slow"),
    ("happy", "sad"), ("true", "false"), ("love", "hate"),
    ("brave", "cowardly"), ("rich", "poor"), ("bright", "dark"),
    ("strong", "weak"), ("new", "old"), ("clean", "dirty"),
    ("beautiful", "ugly"), ("difficult", "easy"), ("give", "take"),
    ("success", "failure"), ("hope", "despair"), ("honest", "dishonest"),
    ("accept", "reject"), ("permit", "forbid"), ("truth", "falsehood"),
    ("create", "destroy"), ("increase", "decrease"), ("expand", "contract"),
    ("optimist", "pessimist"), ("generous", "stingy"), ("punish", "reward"),
]

PHRASAL_VERBS = [
    ("carry on", "to continue"), ("break down", "to stop functioning"),
    ("call off", "to cancel"), ("catch up", "to reach the same point as others"),
    ("drop by", "to visit informally"), ("figure out", "to understand or solve"),
    ("give up", "to stop trying"), ("hand over", "to give something to someone"),
    ("look into", "to investigate"), ("make up", "to invent or compose"),
    ("put off", "to postpone"), ("run into", "to meet by chance"),
    ("set up", "to establish"), ("take over", "to assume control"),
    ("turn down", "to reject"), ("work out", "to exercise or solve"),
    ("get over", "to recover from"), ("put up with", "to tolerate"),
    ("look after", "to take care of"), ("run out of", "to exhaust supply"),
]

IDIOMS_PHRASES = [
    ("piece of cake", "something very easy to do", "The exam was a piece of cake for Priya."),
    ("break a leg", "good luck", "Before her performance, Ravi told Priya to break a leg."),
    ("hit the books", "to study hard", "Aarav needs to hit the books before the board exams."),
    ("spill the beans", "to reveal a secret", "Meera accidentally spilled the beans about the surprise party."),
    ("cost an arm and a leg", "very expensive", "The new iPhone costs an arm and a leg."),
    ("under the weather", "feeling unwell", "Rahul was under the weather so he did not come to school."),
    ("once in a blue moon", "very rarely", "Saanvi visits her grandmother once in a blue moon."),
    ("burn the midnight oil", "to work late into the night", "Karan burned the midnight oil to finish his project."),
    ("bite the bullet", "to face a difficult situation bravely", "Isha had to bite the bullet and give her presentation."),
    ("hit the nail on the head", "to describe something exactly", "When Priya said Rahul was nervous, she hit the nail on the head."),
    ("let the cat out of the bag", "to reveal a secret accidentally", "Arjun let the cat out of the bag about the planned trip."),
    ("beat around the bush", "to avoid the main topic", "Stop beating around the bush and tell me the truth."),
    ("a blessing in disguise", "something that seems bad but turns out to be good", "Missing the bus was a blessing in disguise because it started raining."),
    ("cut corners", "to do something poorly to save money", "The contractor cut corners on the building materials."),
    ("get cold feet", "to become nervous before doing something", "Vikram got cold feet before his interview."),
]

REPORTING_VERBS = {
    "said": [
        "stated", "mentioned", "replied", "remarked", "observed", "commented",
        "exclaimed", "asked", "inquired", "announced", "declared", "added",
    ],
    "asked": [
        "inquired", "wondered", "wanted to know", "questioned", "demanded to know",
    ],
    "answered": [
        "replied", "responded", "retorted", "rejoined",
    ],
    "suggested": [
        "proposed", "recommended", "advised", "urged", "suggested",
    ],
    "shouted": [
        "exclaimed", "yelled", "bellowed", "roared",
    ],
    "whispered": [
        "murmured", "muttered", "breathed", "said softly",
    ],
}

SAMPLE_EMAILS = [
    {
        "type": "formal",
        "to": "principal",
        "from": "student",
        "subject": "Request for permission to organize a cleanliness drive",
        "body_points": ["introduce self and purpose", "mention the event details", "request permission and support", "thank the principal"],
    },
    {
        "type": "informal",
        "to": "friend",
        "from": "student",
        "subject": "Planning our summer trip to Manali",
        "body_points": ["greet warmly", "discuss plans", "mention dates and arrangements", "close affectionately"],
    },
]

PRECIS_GUIDELINES = [
    "Read the passage carefully and identify the main idea",
    "Note down the key points in each paragraph",
    "Express each key point in one sentence",
    "Connect the sentences logically using suitable linkers",
    "Ensure the precis is about one-third the length of the original",
    "Do not add your own opinions or interpretation",
    "Use your own words, not the author's exact phrasing",
    "The precis should be a coherent paragraph",
]

# ──────────────────────────────────────────────────────────────
#  HELPER FUNCTIONS
# ──────────────────────────────────────────────────────────────

def pick_name(rng: random.Random, gender: str = "any") -> str:
    return rng.choice(INDIAN_FIRST_NAMES)

def pick_city(rng: random.Random) -> str:
    return rng.choice(INDIAN_CITIES)

def pick_full_name(rng: random.Random) -> str:
    first = rng.choice(INDIAN_FIRST_NAMES)
    last = rng.choice(INDIAN_LAST_NAMES)
    return f"{first} {last}"

def pick_profession(rng: random.Random) -> str:
    return rng.choice(INDIAN_PROFESSIONS)

def pick_landmark(rng: random.Random) -> str:
    return rng.choice(INDIAN_PLACES_LANDMARKS)

def pick_newspaper(rng: random.Random) -> str:
    return rng.choice(INDIA_NEWSPAPERS)

def pick_story(rng: random.Random):
    return rng.choice(SHORT_STORIES)

def pick_poem(rng: random.Random):
    return rng.choice(POEMS)

def pick_drama(rng: random.Random):
    return rng.choice(DRAMA_TEMPEST)

def pick_synonym_set(rng: random.Random):
    pair = rng.choice(SYNONYM_PAIRS)
    return pair[0], pair[1:rng.randint(2, len(pair) - 1) + 1]

def pick_antonym_pair(rng: random.Random):
    return rng.choice(ANTONYM_PAIRS)

def pick_phrasal_verb(rng: random.Random):
    return rng.choice(PHRASAL_VERBS)

def pick_idiom(rng: random.Random):
    return rng.choice(IDIOMS_PHRASES)

def pick_literary_term(rng: random.Random):
    return rng.choice(list(LITERARY_TERMS.keys()))

def pick_essay_type(rng: random.Random):
    return rng.choice(list(ESSAY_TYPES.keys()))

def pick_report_type(rng: random.Random):
    return rng.choice(REPORT_TYPES)

def pick_letter_type(rng: random.Random):
    return rng.choice(list(LETTER_TYPES.keys()))

def pick_passage(rng: random.Random, ptype: str = "prose"):
    return rng.choice(COMPREHENSION_PASSAGES.get(ptype, COMPREHENSION_PASSAGES["prose"]))

def pick_institution(rng: random.Random) -> str:
    return rng.choice(INDIAN_INSTITUTIONS)


# ──────────────────────────────────────────────────────────────
#  QUESTION GENERATORS — each returns a list of question dicts
# ──────────────────────────────────────────────────────────────

def gen_prose_mcq(rng: random.Random, story: dict) -> Dict[str, Any]:
    """Multiple-choice question on a short story."""
    protagonist = story.get("protagonist", "the protagonist")
    themes = story.get("themes", [])
    setting_ind = story.get("setting_indian", story.get("setting", "the story's setting"))

    question_templates = [
        (f"In '{story['title']}' by {story['author']}, what is the central theme of the story?",
         themes[0] if themes else "human nature",
         themes if themes else ["courage", "honesty", "perseverance", "sacrifice"]),
        (f"In '{story['title']}', the Indian setting is adapted as:",
         setting_ind,
         [setting_ind, pick_city(rng), pick_city(rng), pick_city(rng)]),
        (f"Who is the protagonist of '{story['title']}'?",
         protagonist,
         [protagonist, pick_full_name(rng), pick_full_name(rng), pick_full_name(rng)]),
    ]

    q_text, correct_ans, all_answers = rng.choice(question_templates)
    rng.shuffle(all_answers)
    correct_idx = all_answers.index(correct_ans)

    return {
        "topic": f"prose:{story['id']}",
        "type": "mcq",
        "question": q_text,
        "options": all_answers,
        "answer": correct_ans,
        "answer_index": correct_idx,
        "steps": [
            f"Step 1: Identify the relevant section of '{story['title']}'",
            f"Step 2: Analyze the characters and their actions in context",
            f"Step 3: Match the description with the correct option",
            f"Answer: {correct_ans}",
        ],
        "explanation": f"In '{story['title']}', {correct_ans}. This is established through the narrative's focus on {themes[0] if themes else 'the character's journey'}.",
        "difficulty": "easy" if rng.random() < 0.5 else "medium",
        "bloom_level": "remembering" if rng.random() < 0.4 else "understanding",
    }


def gen_prose_character_analysis(rng: random.Random, story: dict) -> Dict[str, Any]:
    """Character sketch / analysis question — competency based."""
    character = rng.choice(story.get("characters", ["the protagonist"]))
    name = pick_full_name(rng) if character == "the protagonist" else character
    themes = story.get("themes", [])

    role = rng.choice(["a round character", "a flat character", "a dynamic character", "a static character"])
    character_type = rng.choice(["dynamic", "static", "round", "flat"])
    character_desc = f"{character} is portrayed as {character_type} in the story, as shown by their development through the narrative arc."

    return {
        "topic": f"prose:{story['id']}",
        "type": "short_answer",
        "question": (
            f"Write a character sketch of {character} from '{story['title']}' by {story['author']}. "
            f"Discuss their personality traits, motivations, and role in developing the theme of '{themes[0] if themes else 'human values'}'."
        ),
        "answer": (
            f"{character} is a {character_type} character in the story. "
            f"{character_desc} Their actions reveal a deep {rng.choice(['sense of duty', 'conflict between desire and responsibility', 'commitment to justice', 'struggle with identity'])}. "
            f"Their interactions with other characters, particularly in the {story.get('setting_indian', story.get('setting', 'story setting'))}, "
            f"highlight the central theme of '{themes[0] if themes else 'human nature'}'."
        ),
        "steps": [
            "Step 1: Identify the character's role in the story",
            f"Step 2: Gather textual evidence about {character}'s personality and actions",
            "Step 3: Analyze how the character changes or remains the same",
            f"Step 4: Connect character traits to the theme of '{themes[0] if themes else 'human nature'}'",
            "Step 5: Write a coherent character sketch with examples from the text",
        ],
        "explanation": (
            f"A character sketch requires analyzing both direct description and indirect characterization "
            f"(actions, speech, thoughts, effect on others). {character} represents the {character_type} "
            f"archetype, evolving through the conflict presented in the story. The setting of "
            f"{story.get('setting_indian', story.get('setting', 'the story'))} adds cultural context to their development."
        ),
        "difficulty": "hard",
        "bloom_level": "analysis",
    }


def gen_prose_theme_interpretation(rng: random.Random, story: dict) -> Dict[str, Any]:
    """Theme interpretation — competency based, Indian context."""
    theme = rng.choice(story.get("themes", ["human values"]))
    student_name = pick_full_name(rng)

    return {
        "topic": f"prose:{story['id']}",
        "type": "long_answer",
        "question": (
            f"'{story['title']}' by {story['author']} explores the theme of '{theme}'. "
            f"Discuss how the author develops this theme through the setting of "
            f"{story.get('setting_indian', story.get('setting', 'the story'))} and through the "
            f"protagonist's journey. Provide specific examples from the text. "
            f"Imagine the story is set in {pick_city(rng)} instead. Would the theme remain the same? Why or why not?"
        ),
        "answer": (
            f"In '{story['title']}', the theme of '{theme}' is developed through the "
            f"protagonist's experiences in {story.get('setting_indian', story.get('setting', 'the setting'))}. "
            f"The author uses {rng.choice(['contrast', 'foreshadowing', 'symbolism', 'dialogue', 'imagery'])} "
            f"to reveal how {theme} shapes the narrative. "
            f"Specific examples include the protagonist's struggle with their circumstances. "
            f"If set in {pick_city(rng)}, the theme would largely remain the same but would reflect "
            f"different cultural and social contexts, adding new dimensions to the central message."
        ),
        "steps": [
            "Step 1: Identify the stated theme in the story",
            "Step 2: Find textual evidence (quotes, actions, events) that support the theme",
            "Step 3: Analyze how the setting influences the theme",
            "Step 4: Examine the protagonist's journey in relation to the theme",
            "Step 5: Compare with a hypothetical setting and draw conclusions",
            "Step 6: Write a well-structured essay with introduction, body, and conclusion",
        ],
        "explanation": (
            f"Theme analysis requires going beyond plot summary to understand the deeper message. "
            f"The Indian adaptation of the story's setting adds layers of cultural context. "
            f"The hypothetical setting change tests the universality versus specificity of the theme."
        ),
        "difficulty": "hard",
        "bloom_level": "evaluation",
    }


def gen_poetry_appreciation(rng: random.Random, poem: dict) -> Dict[str, Any]:
    """Poetry appreciation — standard."""
    key_images = poem.get("key_images", ["imagery"])
    symbols = poem.get("symbols", {})
    figures = poem.get("figures", [])

    return {
        "topic": f"poetry:{poem['id']}",
        "type": "short_answer",
        "question": (
            f"With reference to '{poem['title']}' by {poem['author']}, "
            f"discuss the imagery and symbolism used in the poem. "
            f"How do they contribute to the overall mood of '{poem.get('mood', 'the poem')}'? "
            f"Comment on the use of {rng.choice(figures) if figures else 'literary devices'}."
        ),
        "answer": (
            f"In '{poem['title']}', {poem['author']} uses vivid imagery such as "
            f"{', '.join(key_images[:2])} to create a '{poem.get('mood', 'contemplative')}' mood. "
            f"The symbol of '{list(symbols.keys())[0] if symbols else key_images[0]}' represents "
            f"'{list(symbols.values())[0] if symbols else 'deeper meaning'}'. "
            f"The {rng.choice(figures) if figures else 'figurative language'} "
            f"enhances the poem's emotional impact by {rng.choice(['creating contrast', 'building rhythm', 'adding depth', 'evoking atmosphere'])}."
        ),
        "steps": [
            "Step 1: Identify key images in the poem",
            "Step 2: Explain the literal and figurative meaning of each image",
            "Step 3: Analyze the symbols and their significance",
            "Step 4: Connect imagery to the poem's mood and tone",
            "Step 5: Discuss how literary devices reinforce the theme",
        ],
        "explanation": (
            f"Imagery appeals to the senses while symbolism adds layers of meaning beyond the literal. "
            f"In '{poem['title']}', these elements work together to create the {poem.get('mood', 'reflective')} "
            f"atmosphere that underpins the poem's {poem.get('central_theme', 'theme')}."
        ),
        "difficulty": "medium",
        "bloom_level": "analysis",
    }


def gen_poetry_comparison(rng: random.Random) -> Dict[str, Any]:
    """Comparison between two poems — competency based."""
    poem1 = rng.choice(POEMS[:4])
    poem2 = rng.choice(POEMS[4:])

    common_elements = rng.sample(["theme", "imagery", "tone", "structure", "use of literary devices", "symbolism"], 2)

    return {
        "topic": "poetry:comparison",
        "type": "long_answer",
        "question": (
            f"Compare and contrast '{poem1['title']}' by {poem1['author']} and "
            f"'{poem2['title']}' by {poem2['author']} with special reference to "
            f"{common_elements[0]} and {common_elements[1]}. "
            f"How does each poet treat the subject differently?"
        ),
        "answer": (
            f"Both '{poem1['title']}' and '{poem2['title']}' explore the human condition but "
            f"differ in their approach. {poem1['author']} uses a '{poem1.get('tone', 'reflective')}' "
            f"tone while {poem2['author']} employs a '{poem2.get('tone', 'serene')}' tone. "
            f"In terms of {common_elements[0]}, {poem1['author']} employs "
            f"{rng.choice(poem1.get('figures', ['imagery']))} while {poem2['author']} uses "
            f"{rng.choice(poem2.get('figures', ['personification']))}. "
            f"Regarding {common_elements[1]}, the structures differ: "
            f"'{poem1['title']}' has {poem1.get('stanzas', 'multiple')} stanzas with "
            f"{poem1.get('rhyme_scheme', 'a distinct')} pattern, while "
            f"'{poem2['title']}' is structured differently, reflecting each poet's unique voice."
        ),
        "steps": [
            "Step 1: Identify the central themes of both poems",
            "Step 2: Analyze the tone and mood in each poem",
            "Step 3: Compare the literary devices used by both poets",
            "Step 4: Examine structural differences (stanzas, rhyme scheme, meter)",
            "Step 5: Conclude with a synthesis of similarities and differences",
        ],
        "explanation": (
            f"Poetry comparison requires analyzing multiple dimensions: theme, tone, structure, and "
            f"literary devices. '{poem1['title']}' and '{poem2['title']}' represent different "
            f"poetic traditions yet both explore universal themes, showing the diversity of poetic expression."
        ),
        "difficulty": "hard",
        "bloom_level": "evaluation",
    }


def gen_drama_character(rng: random.Random, act: dict) -> Dict[str, Any]:
    """Character analysis from The Tempest — standard."""
    chars = act.get("characters", ["Prospero"])
    char = rng.choice(chars)
    quotes = act.get("quotes", [])
    char_quote = rng.choice(quotes) if quotes else "We are such stuff as dreams are made on."

    return {
        "topic": f"drama:{act['id']}",
        "type": "short_answer",
        "question": (
            f"Discuss the character of {char} in Act {act['act']} of 'The Tempest' by William Shakespeare. "
            f"How does Shakespeare portray {char} in the context of the Indian adaptation set in "
            f"the Lakshadweep archipelago? Refer to the quote: '{char_quote}'"
        ),
        "answer": (
            f"In Act {act['act']}, {char} is portrayed as {rng.choice(['a figure of authority', 'a seeker of justice', 'a complex moral agent', 'both powerful and vulnerable'])}. "
            f"The quote '{char_quote}' reveals {char}'s {rng.choice(['philosophical nature', 'inner conflict', 'humanity', 'wisdom'])}. "
            f"In the Indian adaptation set in the Lakshadweep archipelago, {char}'s power dynamics reflect "
            f"the themes of {rng.choice(act.get('themes', ['colonialism', 'authority']))}."
        ),
        "steps": [
            f"Step 1: Identify {char}'s role in Act {act['act']}",
            "Step 2: Analyze key dialogues and actions",
            f"Step 3: Interpret the significance of the quote: '{char_quote}'",
            "Step 4: Connect the character to the play's central themes",
            "Step 5: Discuss the Indian adaptation context",
        ],
        "explanation": (
            f"Shakespeare's characters are multi-dimensional. {char} in Act {act['act']} "
            f"exhibits both strength and vulnerability, embodying the complex themes of "
            f"{', '.join(act.get('themes', ['power and control']))}. The quote demonstrates "
            f"Shakespeare's ability to convey profound philosophical ideas through character."
        ),
        "difficulty": "medium",
        "bloom_level": "analysis",
    }


def gen_drama_plot_sequence(rng: random.Random) -> Dict[str, Any]:
    """Sequence / comprehension question about The Tempest — standard."""
    act = pick_drama(rng)
    scenes = act.get("key_scenes", [])
    num_events = min(rng.randint(2, 3), len(scenes))

    selected = rng.sample(scenes, num_events)
    correct_order = selected[:]
    rng.shuffle(correct_order)

    options = [correct_order[:]]
    for _ in range(3):
        opts = correct_order[:]
        rng.shuffle(opts)
        if opts != correct_order:
            options.append(opts)
    while len(options) < 4:
        opts = correct_order[:]
        rng.shuffle(opts)
        options.append(opts)
    rng.shuffle(options)

    return {
        "topic": f"drama:{act['id']}",
        "type": "mcq",
        "question": (
            f"Arrange the following events from Act {act['act']} of 'The Tempest' in the correct sequence: "
            + "; ".join([f"({chr(65+i)}) {s}" for i, s in enumerate(correct_order)])
        ),
        "options": [" -> ".join(o) for o in options],
        "answer": " -> ".join(correct_order),
        "answer_index": options.index(correct_order),
        "steps": [
            "Step 1: Read Act " + str(act['act']) + " carefully",
            "Step 2: Identify the chronological order of events",
            "Step 3: Consider cause and effect relationships between scenes",
            "Step 4: Match the events with the correct sequence",
            "Answer: " + " -> ".join(correct_order),
        ],
        "explanation": (
            f"The events in Act {act['act']} follow a clear narrative arc. "
            f"Understanding the sequence helps trace how Shakespeare builds tension "
            f"and develops the plot toward the play's themes of {rng.choice(act.get('themes', ['power']))}."
        ),
        "difficulty": "easy",
        "bloom_level": "remembering",
    }


def gen_drama_magic_analysis(rng: random.Random) -> Dict[str, Any]:
    """Competency-based: analysis of magic/dramatic technique."""
    act = pick_drama(rng)
    magic_terms = act.get("magic_terms", ["magic", "charms", "spirits"])

    return {
        "topic": f"drama:{act['id']}",
        "type": "long_answer",
        "question": (
            f"How does Prospero use magic in Act {act['act']} of 'The Tempest'? "
            f"Discuss whether his magic is ultimately a force for good or for control. "
            f"How does Shakespeare's portrayal of magic resonate with Indian concepts of "
            f"spiritual power and the responsibilities that come with it? "
            f"Refer to the use of words like {', '.join(magic_terms[:3])}."
        ),
        "answer": (
            f"In Act {act['act']}, Prospero uses magic through {', '.join(magic_terms[:3])} "
            f"to achieve his goals. His magic initially serves the purpose of {rng.choice(['controlling others', 'seeking revenge', 'protecting Miranda', 'establishing order'])}. "
            f"By the end of the play, Prospero renounces his magic, recognizing that "
            f"true power lies in forgiveness rather than control. This resonates with Indian "
            f"philosophical concepts where spiritual power (tapasya) requires detachment and "
            f"ethical responsibility, much like Prospero's journey toward renunciation."
        ),
        "steps": [
            "Step 1: Identify Prospero's use of magic in Act " + str(act['act']),
            "Step 2: Analyze whether his magic serves good or controlling purposes",
            "Step 3: Examine Prospero's arc toward renouncing magic",
            "Step 4: Connect to Indian philosophical concepts (tapasya, detachment)",
            "Step 5: Evaluate the ethical dimensions of power and responsibility",
        ],
        "explanation": (
            f"Prospero's magic is central to the play's action and themes. It begins as a tool "
            f"for control and revenge but ultimately leads Prospero to recognize the limits of power. "
            f"This mirrors Indian philosophical traditions where true power requires renunciation "
            f"and ethical restraint (similar to the concept of viveka or discrimination)."
        ),
        "difficulty": "hard",
        "bloom_level": "evaluation",
    }


def gen_grammar_transformation(rng: random.Random) -> Dict[str, Any]:
    """Sentence transformation — standard."""
    rule_types = list(GRAMMAR_RULES.keys())
    rule_key = rng.choice(rule_types)
    rule_data = GRAMMAR_RULES[rule_key]
    pattern = rng.choice(rule_data["patterns"])

    if rule_key in ["simple_to_complex", "simple_to_compound",
                     "complex_to_simple", "compound_to_complex",
                     "affirmative_to_negative", "affirmative_to_interrogative",
                     "exclamatory_to_assertive"]:
        original = pattern[0]
        target = pattern[1]
        q_template = rng.choice([
            f"Convert the following sentence from {rule_key.replace('_', ' ')}: '{original}'",
            f"Rewrite the following sentence: '{original}'",
            f"Transform the sentence '{original}' into a sentence with different structure.",
        ])
        return {
            "topic": f"grammar:{rule_key}",
            "type": "fill_blank",
            "question": q_template,
            "answer": target,
            "options": [target, pattern[0] if len(pattern) > 2 else "",
                        rng.choice(["She is studying hard.", "They went to school."]),
                        rng.choice(["It is raining.", "The cat is black."])],
            "steps": [
                "Step 1: Identify the sentence type of the original sentence",
                "Step 2: Determine the target sentence type",
                "Step 3: Apply the appropriate conjunction or structure",
                "Step 4: Ensure grammatical correctness in the transformed sentence",
                f"Answer: {target}",
            ],
            "explanation": (
                f"The original sentence is transformed using the {rule_key.replace('_', ' ')} rule. "
                f"This involves changing the sentence structure while preserving the original meaning."
            ),
            "difficulty": "medium",
            "bloom_level": "application",
        }
    else:
        return gen_grammar_voice(rng)


def gen_grammar_voice(rng: random.Random) -> Dict[str, Any]:
    """Active-passive voice transformation — standard."""
    name1 = pick_name(rng)
    name2 = pick_name(rng)
    verb_objects = [
        ("completed the project", "the project was completed by " + name1),
        ("is writing a novel", "a novel is being written by " + name1),
        ("baked a cake", "a cake was baked by " + name1),
        ("will submit the report", "the report will be submitted by " + name1),
    ]
    active, passive = rng.choice(verb_objects)
    is_passive_to_active = rng.random() < 0.5

    if is_passive_to_active:
        q = f"Change the following sentence from passive to active voice: '{name1} {passive}'"
        answer = f"{name1} {active}."
        explanation = (
            f"The agent 'by {name1}' in the passive sentence becomes the subject in the active voice. "
            f"The verb changes from passive form back to active form."
        )
    else:
        q = f"Change the following sentence from active to passive voice: '{name1} {active}'"
        answer = f"{passive}."
        explanation = (
            f"The object '{passive.split(' was ')[-1].split(' is ')[-1].split(' will be ')[-1]}' "
            f"becomes the subject in the passive voice. The verb changes to passive form with "
            f"appropriate tense and 'by {name1}' is added."
        )

    return {
        "topic": "grammar:voice_change",
        "type": "fill_blank",
        "question": q,
        "answer": answer,
        "options": [answer, f"{name2} {active}.", f"{name1} {rng.choice(verb_objects)[0]}.",
                    f"{name2} {rng.choice(verb_objects)[1]}."],
        "steps": [
            "Step 1: Identify whether the sentence is in active or passive voice",
            "Step 2: Identify the subject, verb, and object",
            "Step 3: Swap subject and object positions",
            "Step 4: Change the verb to the appropriate form (active/passive)",
            f"Step 5: Add 'by' if needed for passive voice",
            f"Answer: {answer}",
        ],
        "explanation": explanation,
        "difficulty": "easy",
        "bloom_level": "application",
    }


def gen_grammar_report_writing(rng: random.Random) -> Dict[str, Any]:
    """Report writing — competency based, Indian context."""
    report_type = rng.choice(REPORT_TYPES)
    event_name = rng.choice(report_type["event_types"])
    city = pick_city(rng)
    date_str = f"{rng.randint(1, 28)} {rng.choice(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])} {rng.randint(2024, 2025)}"
    school_name = f"St. {rng.choice(['Mary', 'John', 'Thomas', 'Joseph', 'Xavier'])}'s {rng.choice(['High School', 'Public School', 'Convent', 'Academy'])}"
    reporter_name = pick_full_name(rng)
    activity = rng.choice(["tree plantation", "cleanliness awareness", "blood donation", "literacy campaign"])

    return {
        "topic": "grammar:report_writing",
        "type": "long_answer",
        "question": (
            f"You are {reporter_name}, the Cultural Secretary of {school_name}, {city}. "
            f"Write a report in about 150-200 words about the '{event_name}' organized on {date_str}. "
            f"Include details about participants, activities conducted, and the overall impact of the event."
        ),
        "answer": (
            f"REPORT ON {event_name.upper()}\n\n"
            f"On {date_str}, {school_name}, {city} organized the '{event_name}' with great enthusiasm. "
            f"The event was coordinated by {reporter_name}, Cultural Secretary, with support from the staff and students. "
            f"Over {rng.randint(100, 500)} students participated in various activities including {activity}. "
            f"The Chief Guest, {pick_full_name(rng)}, {pick_profession(rng).title()}, inspired the students with an address on the importance of "
            f"{rng.choice(['community service', 'environmental awareness', 'cultural heritage', 'social responsibility'])}. "
            f"Prizes were distributed by the Principal, {pick_full_name(rng)}. "
            f"The event was a grand success, promoting the values of "
            f"{rng.choice(['teamwork', 'leadership', 'social awareness', 'cultural appreciation'])}."
        ),
        "steps": [
            "Step 1: Write a clear heading (REPORT) and a title",
            "Step 2: Mention the date, time, and venue in the opening paragraph",
            "Step 3: Describe the key activities and events in chronological order",
            "Step 4: Mention the chief guest and other dignitaries",
            "Step 5: Describe the conclusion/outcome of the event",
            "Step 6: Keep the tone objective and factual",
        ],
        "explanation": (
            "A good report should have a clear title, mention the 5Ws (What, When, Where, Who, Why), "
            "describe activities in logical order, mention the outcome, and use an objective tone. "
            "The report format is: Heading, Title, Date/Place, Body (organized by paragraphs), and Conclusion."
        ),
        "difficulty": "medium",
        "bloom_level": "application",
    }


def gen_grammar_email(rng: random.Random) -> Dict[str, Any]:
    """Email writing — competency based."""
    letter_type = pick_letter_type(rng)
    letter_data = LETTER_TYPES[letter_type]

    if letter_type == "formal":
        recipient = rng.choice(letter_data["to"])
        topic = rng.choice(letter_data["topics"])
        sender_name = pick_full_name(rng)
        recipient_name = pick_full_name(rng)

        return {
            "topic": "grammar:email_writing",
            "type": "long_answer",
            "question": (
                f"You are {sender_name}, a resident of {pick_city(rng)}. "
                f"Write a formal email to the {recipient.title()} of the local municipality "
                f"regarding {topic}. Use appropriate format, language, and tone. "
                f"(Your email should have a subject line, salutation, body, and closing.)"
            ),
            "answer": (
                f"Subject: Regarding the Issue of {topic.title()}\n\n"
                f"Dear Sir/Madam,\n\n"
                f"I am {sender_name}, a resident of {pick_city(rng)}. "
                f"I am writing to bring to your attention the matter of {topic} in our locality. "
                f"The residents have been facing considerable difficulties due to this issue. "
                f"I request your office to take immediate steps to address this concern at the earliest.\n\n"
                f"I hope for a positive response and prompt action.\n\n"
                f"Yours faithfully,\n{sender_name}"
            ),
            "steps": [
                "Step 1: Write an appropriate subject line (concise and clear)",
                "Step 2: Use proper salutation (Dear Sir/Madam / Dear Mr./Ms. Name)",
                "Step 3: Introduce yourself and state the purpose clearly in the first paragraph",
                "Step 4: Provide details of the issue/request in the body paragraphs",
                "Step 5: Make a polite request or call to action in the closing paragraph",
                "Step 6: End with an appropriate closing and signature",
            ],
            "explanation": (
                "A formal email must have: (1) a clear subject line, (2) appropriate salutation, "
                "(3) self-introduction, (4) clear statement of purpose, (5) detailed explanation, "
                "(6) polite request/action, and (7) proper closing. Tone should be respectful but firm."
            ),
            "difficulty": "medium",
            "bloom_level": "application",
        }
    else:
        friend_name = pick_name(rng)
        return {
            "topic": "grammar:email_writing",
            "type": "long_answer",
            "question": (
                f"You recently attended a music concert in {pick_city(rng)} and had an amazing time. "
                f"Write an informal email to your friend {friend_name} describing the experience. "
                f"Mention your favorite performances and invite {friend_name} to the next concert."
            ),
            "answer": (
                f"Subject: You won't believe the concert I attended!\n\n"
                f"Hey {friend_name},\n\n"
                f"How are you doing? I just got back from the most incredible concert in {pick_city(rng)}! "
                f"The energy was electric, the music was phenomenal, and I met so many wonderful people. "
                f"My favorite performance was by {rng.choice(['Arijit Singh', 'Shreya Ghoshal', 'AR Rahman', 'Neha Kakkar'])} "
                f"— you should have heard the crowd sing along! The venue was the {pick_landmark(rng)} "
                f"and it was absolutely packed. I wish you were there! "
                f"We should definitely go together to the next one. Let me know!\n\n"
                f"Talk soon,\n{pick_name(rng)}"
            ),
            "steps": [
                "Step 1: Write a catchy, informal subject line",
                "Step 2: Start with a warm, personal greeting",
                "Step 3: Share the experience using vivid, conversational language",
                "Step 4: Mention specific details (favorite moments, people met, etc.)",
                "Step 5: Extend an invitation or make plans for the future",
                "Step 6: End with an informal, warm closing",
            ],
            "explanation": (
                "Informal emails use casual language, contractions, exclamations, and personal details. "
                "The tone should be warm and conversational. Structure is more flexible than formal emails, "
                "but should still have a clear greeting, body, and closing."
            ),
            "difficulty": "easy",
            "bloom_level": "application",
        }


def gen_grammar_synthesis(rng: random.Random) -> Dict[str, Any]:
    """Synthesis of sentences — standard."""
    pattern = rng.choice(GRAMMAR_RULES["synthesis_sentences"]["patterns"])
    sentence1, sentence2 = pattern[0].split(". ")

    conjunctions = ["because", "although", "since", "as", "when", "while", "though", "unless", "until"]
    conjunction = rng.choice(conjunctions)
    connector_words = rng.choice(["and", "but", "so", "therefore", "hence", "moreover", "furthermore", "however"])

    return {
        "topic": "grammar:synthesis",
        "type": "fill_blank",
        "question": (
            f"Synthesize the following two simple sentences into a single complex/compound sentence: "
            f"'{sentence1}.' '{sentence2}.' "
            f"(Use an appropriate conjunction or connector.)"
        ),
        "answer": f"{sentence1} {rng.choice(['because', 'and', 'but', 'so'])} {sentence2.lower()}.",
        "options": [
            f"{sentence1} {rng.choice(conjunctions)} {sentence2.lower()}.",
            f"{sentence1}. {sentence2}.",
            f"{sentence2} {rng.choice(conjunctions)} {sentence1.lower()}.",
            f"Either {sentence1} or {sentence2.lower()}.",
        ],
        "steps": [
            "Step 1: Identify the relationship between the two sentences (cause-effect, contrast, addition, time)",
            "Step 2: Choose an appropriate conjunction or connector",
            "Step 3: Combine the sentences, removing redundancy",
            "Step 4: Ensure grammatical correctness",
            "Step 5: Verify the meaning is preserved",
        ],
        "explanation": (
            f"Synthesis involves combining two or more simple sentences into one complex or compound sentence. "
            f"The choice of conjunction ({conjunction}) depends on the logical relationship between the clauses."
        ),
        "difficulty": "easy",
        "bloom_level": "application",
    }


def gen_grammar_vocabulary(rng: random.Random) -> Dict[str, Any]:
    """Vocabulary: synonyms, antonyms, idioms, phrasal verbs."""
    vocab_type = rng.randint(0, 3)

    if vocab_type == 0:
        # Synonyms
        word, synonyms = pick_synonym_set(rng)
        wrong_options = [rng.choice(["happy", "sad", "angry", "tired", "scared", "surprised", "bored", "excited"]) for _ in range(3)]
        correct = synonyms[0]
        all_opts = [correct] + wrong_options
        rng.shuffle(all_opts)

        return {
            "topic": "grammar:vocabulary",
            "type": "mcq",
            "question": f"Choose the word that is a synonym of '{word}':",
            "options": all_opts,
            "answer": correct,
            "answer_index": all_opts.index(correct),
            "steps": [
                f"Step 1: Understand the meaning of '{word}'",
                "Step 2: Evaluate each option for similarity in meaning",
                f"Step 3: Select the word closest in meaning to '{word}'",
                f"Answer: {correct}",
            ],
            "explanation": (
                f"'{word}' means '{rng.choice(['showing pleasure', 'showing sadness', 'very large', 'very fast', 'having great value'])}'. "
                f"'{correct}' is a synonym because it has a similar meaning. "
                f"The other options do not convey the same meaning."
            ),
            "difficulty": "easy",
            "bloom_level": "remembering",
        }
    elif vocab_type == 1:
        # Antonyms
        word, antonym = pick_antonym_pair(rng)
        wrong_options = [rng.choice(["happy", "joyful", "angry", "tired", "scared"]) for _ in range(3)]
        all_opts = [antonym] + wrong_options
        rng.shuffle(all_opts)

        return {
            "topic": "grammar:vocabulary",
            "type": "mcq",
            "question": f"Choose the word that is an antonym of '{word}':",
            "options": all_opts,
            "answer": antonym,
            "answer_index": all_opts.index(antonym),
            "steps": [
                f"Step 1: Understand the meaning of '{word}'",
                "Step 2: Evaluate each option for opposite meaning",
                f"Step 3: Select the word opposite in meaning to '{word}'",
                f"Answer: {antonym}",
            ],
            "explanation": (
                f"'{word}' and '{antonym}' are antonyms — they have opposite meanings. "
                f"Understanding antonyms is essential for precise communication and vocabulary building."
            ),
            "difficulty": "easy",
            "bloom_level": "remembering",
        }
    elif vocab_type == 2:
        # Idioms
        idiom, meaning, example = pick_idiom(rng)
        wrong_meanings = [
            "to be very expensive", "to feel extremely happy", "to be in danger",
            "to travel a long distance", "to be very tired", "to be confused",
        ]
        wrong_meanings = [m for m in wrong_meanings if m != meaning]
        all_opts = [meaning] + wrong_meanings[:3]
        rng.shuffle(all_opts)

        return {
            "topic": "grammar:vocabulary",
            "type": "mcq",
            "question": f"What does the idiom '{idiom}' mean?",
            "options": all_opts,
            "answer": meaning,
            "answer_index": all_opts.index(meaning),
            "steps": [
                f"Step 1: Recognize '{idiom}' as an idiomatic expression",
                "Step 2: Recall the meaning of this common idiom",
                "Step 3: Match with the correct definition among the options",
                f"Answer: {meaning}",
            ],
            "explanation": (
                f"The idiom '{idiom}' means '{meaning}'. "
                f"Idioms are phrases whose meanings cannot be deduced from the literal meanings of individual words. "
                f"They are an important part of English fluency."
            ),
            "difficulty": "medium",
            "bloom_level": "understanding",
        }
    else:
        # Phrasal verbs
        phrasal, meaning = pick_phrasal_verb(rng)
        wrong_meanings = [
            "to stop completely", "to visit a place", "to create something",
            "to postpone something", "to understand", "to give up",
        ]
        wrong_meanings = [m for m in wrong_meanings if m != meaning]
        all_opts = [meaning] + wrong_meanings[:3]
        rng.shuffle(all_opts)

        return {
            "topic": "grammar:vocabulary",
            "type": "mcq",
            "question": f"What does the phrasal verb '{phrasal}' mean?",
            "options": all_opts,
            "answer": meaning,
            "answer_index": all_opts.index(meaning),
            "steps": [
                f"Step 1: Identify the phrasal verb '{phrasal}' and its components",
                "Step 2: Determine if the meaning is literal or idiomatic",
                "Step 3: Match with the correct definition",
                f"Answer: {meaning}",
            ],
            "explanation": (
                f"The phrasal verb '{phrasal}' means '{meaning}'. "
                f"Phrasal verbs combine a verb with a preposition or adverb to create a new meaning."
            ),
            "difficulty": "medium",
            "bloom_level": "understanding",
        }


def gen_grammar_precis(rng: random.Random) -> Dict[str, Any]:
    """Precis writing — competency based."""
    passage = pick_passage(rng, "prose")
    word_count = passage["word_count"]
    target_length = max(word_count // 3, 30)

    return {
        "topic": "grammar:precis_writing",
        "type": "long_answer",
        "question": (
            f"Read the following passage and write a precis (summary) of about {target_length} words: "
            f"'{passage['passage']}'\n\n"
            f"Give a suitable title to your precis. "
            f"(The original passage is approximately {word_count} words; your precis should be about one-third of that length.)"
        ),
        "answer": (
            f"Title: {passage['title']}\n\n"
            f"The passage discusses how rural India is transforming through technology and entrepreneurship. "
            f"A young farmer near Pune uses smartphone apps for farming, his wife runs an online pickle business, "
            f"and their children benefit from digital learning centers. "
            f"Villages now have 4G connectivity, solar lights, and telemedicine facilities. "
            f"This transformation is spreading across thousands of Indian villages, "
            f"suggesting a hopeful future for India's rural landscape."
        ),
        "steps": [
            "Step 1: Read the passage 2-3 times to grasp the main idea",
            "Step 2: Identify the key points in each paragraph",
            "Step 3: Eliminate examples, details, and repetitions",
            "Step 4: Express each key point in one concise sentence using your own words",
            "Step 5: Connect sentences with appropriate linkers",
            "Step 6: Count words and ensure it is approximately one-third of the original",
            "Step 7: Give a suitable title",
        ],
        "explanation": (
            "A precis is a brief summary that captures the main ideas of a passage in your own words. "
            "Key principles: (1) It must be about one-third the length of the original, (2) It should be in "
            "paragraph form, (3) Use your own words (not the author's exact phrases), (4) No personal opinions, "
            "(5) Retain the logical sequence of ideas, (6) Use connecting words for flow."
        ),
        "difficulty": "hard",
        "bloom_level": "analysis",
    }


def gen_grammar_reporting_verbs(rng: random.Random) -> Dict[str, Any]:
    """Reporting verbs transformation — standard."""
    speaker = pick_name(rng)
    listener = pick_name(rng)
    original_verbs = list(REPORTING_VERBS.keys())
    original_verb = rng.choice(original_verbs)
    replacements = REPORTING_VERBS[original_verb]

    replacement = rng.choice(replacements)
    direct_speech_templates = [
        f'"{rng.choice(["I am coming to the meeting", "The project is going well", "We should start now", "I have completed the task", "The results are excellent", "Let us work together"])}," said {speaker} to {listener}.',
        f'{speaker} said to {listener}, "{rng.choice(["This is the best result we have achieved", "We need to work harder", "The situation is under control", "I believe we can succeed", "Everything will be fine"])}."',
    ]
    direct = rng.choice(direct_speech_templates)

    # Generate indirect speech
    inner_text = direct.split('"')[1] if '"' in direct else direct.split(", ")[1]
    indirect_templates = [
        f"{speaker} {replacement} {listener} that {inner_text.lower().rstrip('.')}.",
        f"{speaker} {replacement} that {inner_text.lower().rstrip('.')}.",
        f"{listener} was {replacement} by {speaker} that {inner_text.lower().rstrip('.')}.",
    ]
    indirect = rng.choice(indirect_templates)

    return {
        "topic": "grammar:reporting_verbs",
        "type": "fill_blank",
        "question": (
            f"Convert the following direct speech into reported/indirect speech:\n{direct}"
        ),
        "answer": indirect,
        "options": [
            indirect,
            direct,
            f"{speaker} told {listener} that he was happy.",
            f"{listener} reported that {speaker} said something.",
        ],
        "steps": [
            "Step 1: Remove quotation marks and commas from the direct speech",
            "Step 2: Change the reporting verb to a suitable alternative",
            "Step 3: Change pronouns and tense if needed (backshift)",
            "Step 4: Add 'that' if required (optional in modern usage)",
            f"Answer: {indirect}",
        ],
        "explanation": (
            f"In reported speech, '{original_verb}' can be replaced with '{replacement}' "
            f"depending on the context. Pronouns and tenses may need to be shifted. "
            f"Reported speech is used to convey what someone said without quoting them directly."
        ),
        "difficulty": "medium",
        "bloom_level": "application",
    }


def gen_grammar_prepositions(rng: random.Random) -> Dict[str, Any]:
    """Prepositions / articles fill in the blank."""
    prepositions = ["in", "on", "at", "by", "for", "with", "to", "from", "into", "upon", "over", "under", "between", "among"]
    sent_templates = [
        (f"The book is lying ______ the table.", "on"),
        (f"She has been waiting ______ you since morning.", "for"),
        (f"The train arrives ______ 6 PM.", "at"),
        (f"We walked ______ the park and sat under the tree.", "through"),
        (f"Rahul is good ______ mathematics.", "at"),
        (f"The cat jumped ______ the wall.", "over"),
        (f"She is ______ her way to college.", "on"),
        (f"The teacher distributed sweets ______ all the students.", "among"),
        (f"Please do not lean ______ the window.", "out of"),
        (f"India is known ______ its rich cultural heritage.", "for"),
    ]
    sentence, correct = rng.choice(sent_templates)
    wrong = [rng.choice(prepositions) for _ in range(3)]

    return {
        "topic": "grammar:prepositions",
        "type": "fill_blank",
        "question": f"Fill in the blank with the most appropriate preposition:\n{sentence}",
        "answer": correct,
        "options": [correct] + wrong,
        "steps": [
            "Step 1: Understand the context of the sentence",
            "Step 2: Recall the common collocations and preposition usage rules",
            "Step 3: Choose the preposition that fits grammatically and semantically",
            f"Answer: {correct}",
        ],
        "explanation": (
            f"Prepositions show relationships between words in a sentence. "
            f"In this case, '{correct}' is the appropriate preposition because "
            f"it correctly expresses the {rng.choice(['location', 'time', 'direction', 'relationship'])} "
            f"between the elements."
        ),
        "difficulty": "easy",
        "bloom_level": "remembering",
    }


def gen_comprehension_question(rng: random.Random) -> Dict[str, Any]:
    """Comprehension passage with questions."""
    passages = COMPREHENSION_PASSAGES["prose"]
    passage = rng.choice(passages)
    questions_list = passage["questions"]
    q_data = rng.choice(questions_list)

    is_hard = q_data["difficulty"] == "hard"
    q_type = "long_answer" if is_hard else ("short_answer" if q_data["difficulty"] == "medium" else "short_answer")

    return {
        "topic": f"comprehension:prose",
        "type": q_type,
        "question": f"Read the passage '{passage['title']}' and answer:\n{q_data['q']}",
        "answer": q_data["a"],
        "steps": [
            "Step 1: Read the passage carefully and underline key points",
            "Step 2: Identify the part of the passage relevant to the question",
            "Step 3: Formulate your answer using evidence from the text",
            "Step 4: Review your answer for clarity and completeness",
        ],
        "explanation": (
            f"This comprehension question tests the student's ability to locate, interpret, and analyze "
            f"information from the passage. The answer is supported by specific textual evidence."
        ),
        "difficulty": q_data["difficulty"],
        "bloom_level": "understanding" if not is_hard else "analysis",
        "passage_title": passage["title"],
    }


def gen_grammar_literary_term(rng: random.Random) -> Dict[str, Any]:
    """Literary terms / figures of speech — competency based."""
    term = pick_literary_term(rng)
    definition = LITERARY_TERMS[term]

    # Create an example sentence
    examples = {
        "metaphor": "The world is a stage and we are merely players.",
        "simile": "Her smile was as bright as the sun.",
        "personification": "The wind whispered through the trees.",
        "alliteration": "She sells seashells by the seashore.",
        "hyperbole": "I have told you a million times.",
        "irony": "The fire station burned down.",
        "imagery": "The golden sun sank slowly behind the purple mountains.",
        "symbolism": "The dove is a symbol of peace.",
        "oxymoron": "There was a deafening silence in the hall.",
        "apostrophe": "O Death, where is thy sting?",
        "assonance": "Hear the mellow wedding bells.",
        "enjambment": "The sun rose / over the hills / and painted the sky.",
    }
    example = examples.get(term, f"Example of {term} in literature.")

    # Wrong options
    all_terms = list(LITERARY_TERMS.keys())
    wrong_options = rng.sample([t for t in all_terms if t != term], 3)
    all_opts = [term] + [f"{t}: {LITERARY_TERMS[t][:50]}..." for t in wrong_options]
    rng.shuffle(all_opts)

    # Generate sentences using and not using the term
    positive_example = rng.choice([
        f"Rahul's voice boomed through the hall. (alliteration)",
        f"Time is a thief that steals our moments. (metaphor)",
        f"The leaves danced in the autumn wind. (personification)",
        f"She sings like a nightingale. (simile)",
        f"I was so hungry I could eat a horse. (hyperbole)",
        f"Less is more. (oxymoron)",
    ])
    negative_example = rng.choice([
        f"Rahul ran quickly to catch the bus. (No figure of speech)",
        f"The sun was very bright today. (No figure of speech)",
        f"She opened the door and entered. (No figure of speech)",
        f"He is taller than his brother. (Comparison, not simile)",
    ])

    return {
        "topic": "literature:terms",
        "type": "mcq",
        "question": (
            f"Identify the literary device used in the following sentence:\n"
            f"'{positive_example.split(' (')[0]}'\n"
            f"Which term best describes the figure of speech employed?"
        ),
        "options": all_opts,
        "answer": term,
        "answer_index": all_opts.index(term),
        "steps": [
            f"Step 1: Analyze the sentence: '{positive_example.split(' (')[0]}'",
            "Step 2: Identify the pattern or special use of language",
            f"Step 3: Match the pattern with the definition of '{term}': {definition[:60]}...",
            f"Step 4: Eliminate options that do not fit",
            f"Answer: {term}",
        ],
        "explanation": (
            f"The sentence '{positive_example.split(' (')[0]}' is an example of {term}. "
            f"{definition} This figure of speech adds depth, emotion, or rhetorical power to the expression."
        ),
        "difficulty": "medium",
        "bloom_level": "analysis",
    }


def gen_essay_outline(rng: random.Random) -> Dict[str, Any]:
    """Essay writing prompt with outline — competency based."""
    essay_type = pick_essay_type(rng)
    essay_data = ESSAY_TYPES[essay_type]
    topic = rng.choice(essay_data["topics"])

    return {
        "topic": "essay:writing",
        "type": "long_answer",
        "question": (
            f"Write an {essay_type} essay on the topic: '{topic}' "
            f"(approximately 250-300 words). "
            f"Your essay should include: an engaging introduction, "
            f"well-developed body paragraphs with specific examples (especially from an Indian context), "
            f"and a thoughtful conclusion. "
            f"Use vivid language and varied sentence structures."
        ),
        "answer": (
            f"[OUTLINE for a {essay_type} essay on '{topic}']\n\n"
            f"INTRODUCTION (40-50 words):\n"
            f"  - Hook: {rng.choice(['A striking statistic', 'A personal anecdote', 'A relevant quote', 'A rhetorical question'])}\n"
            f"  - Background context related to {pick_city(rng)}\n"
            f"  - Thesis statement\n\n"
            f"BODY PARAGRAPH 1 (80-100 words):\n"
            f"  - Main point: {rng.choice(['Personal experience', 'Historical context', 'Social relevance'])}\n"
            f"  - Evidence: Example from Indian context\n"
            f"  - Analysis\n\n"
            f"BODY PARAGRAPH 2 (80-100 words):\n"
            f"  - Main point: {rng.choice(['Broader implications', 'Counter-perspective', 'Future outlook'])}\n"
            f"  - Evidence: Statistical data or another example\n"
            f"  - Analysis\n\n"
            f"CONCLUSION (40-50 words):\n"
            f"  - Restate thesis in new words\n"
            f"  - Summarize key points\n"
            f"  - Concluding thought / call to action"
        ),
        "steps": [
            "Step 1: Brainstorm ideas related to the topic, focusing on Indian context",
            "Step 2: Create a thesis statement (one clear argument)",
            "Step 3: Plan 2-3 body paragraphs with specific Indian examples",
            "Step 4: Write an engaging introduction with a hook",
            "Step 5: Develop each body paragraph with a topic sentence, evidence, and analysis",
            "Step 6: Write a conclusion that reinforces your thesis",
            "Step 7: Review for coherence, grammar, and word count (250-300 words)",
        ],
        "explanation": (
            f"A {essay_type} essay should be well-structured with clear introduction, body, and conclusion. "
            f"Using Indian context examples (references to places, people, and situations familiar to Indian students) "
            f"makes the essay more authentic and relatable. The key features of this essay type are: "
            f"{', '.join(essay_data['features'])}."
        ),
        "difficulty": "hard",
        "bloom_level": "creation",
    }


def gen_integrated_skills(rng: random.Random) -> Dict[str, Any]:
    """Integrated skills — letter + report — competency based."""
    student = pick_full_name(rng)
    school = f"{rng.choice(['Delhi', 'Mumbai', 'Bangalore', 'Chennai'])} {rng.choice(['Public', 'International', 'Model', 'Central'])} School"
    recipient = rng.choice(["editor of " + pick_newspaper(rng), "District Collector", "Chairman of the Municipal Corporation"])
    topic = rng.choice([
        "the deteriorating condition of roads in the residential area",
        "the lack of safe drinking water in the locality",
        "the need for more public parks and green spaces",
        "increasing air pollution and its health impacts",
    ])

    return {
        "topic": "integrated:letter_report",
        "type": "long_answer",
        "question": (
            f"Write a formal letter to the {recipient} as {student}, a student of {school}, "
            f"about {topic}. Then, in about 150 words, write a brief report for your school magazine "
            f"describing the same issue and the actions taken by students to address it."
        ),
        "answer": (
            f"[LETTER]\n"
            f"To: The {recipient.title()}\n"
            f"From: {student}, {school}\n"
            f"Date: {rng.choice(['15', '20', '25'])} {rng.choice(['January', 'February', 'March'])} 2025\n"
            f"Subject: {topic.title()}\n\n"
            f"Respected Sir/Madam,\n\n"
            f"I am {student}, a Class XII student of {school}. "
            f"I wish to bring to your attention {topic}. "
            f"This has been causing significant inconvenience and health hazards to residents. "
            f"I request you to take necessary action at the earliest.\n\n"
            f"Yours faithfully,\n{student}\n\n"
            f"[REPORT]\n"
            f"Students of {school} have raised awareness about {topic}. "
            f"A survey was conducted by the Environmental Club under the guidance of the Geography teacher. "
            f"Over 200 residents were interviewed. The findings were presented to the local authorities. "
            f"A cleanliness drive was organized, and a petition with 500 signatures was submitted."
        ),
        "steps": [
            "Step 1: Write the letter with proper format (To, From, Date, Subject)",
            "Step 2: State the purpose clearly in the opening paragraph",
            "Step 3: Describe the problem with specific details",
            "Step 4: Make a polite but firm request for action",
            "Step 5: Write the report in magazine style (headline, dateline, body)",
            "Step 6: Describe the actions taken by the students",
            "Step 7: Conclude with an appeal for continued efforts",
        ],
        "explanation": (
            "Integrated skills questions test the ability to use different forms of writing together. "
            "The letter requires formal structure and polite persuasion. The report requires journalistic "
            "objectivity and factual description. Together they demonstrate versatile communication skills."
        ),
        "difficulty": "hard",
        "bloom_level": "creation",
    }


def gen_poetry_figure_speech(rng: random.Random) -> Dict[str, Any]:
    """Figures of speech identification from poetry lines — standard."""
    poem = pick_poem(rng)
    figures = poem.get("figures", [])
    figure = rng.choice(figures) if figures else pick_literary_term(rng)
    figure_def = LITERARY_TERMS.get(figure, "A literary device used in poetry.")

    poem_lines = {
        "The Road Not Taken": [
            "Two roads diverged in a yellow wood",
            "And both that morning equally lay",
            "I shall be telling this with a sigh",
        ],
        "Dover Beach": [
            "The sea is calm tonight",
            "The tide is full, the moon lies fair",
            "The sea of faith was once, too, at the full",
        ],
        "A thing of Beauty is a Joy Forever": [
            "A thing of beauty is a joy forever",
            "Such is the sun, the moon, the trees",
            "Therefore, on every morrow, are we wreathing",
        ],
        "The Tyger": [
            "Tyger Tyger, burning bright",
            "In the forests of the night",
            "Did he who made the Lamb make thee?",
        ],
        "Crossing the Bar": [
            "Sunset and evening star",
            "And one clear call for me",
            "Twilight and evening bell",
        ],
    }
    lines = poem_lines.get(poem["title"], [f"A line from {poem['title']}"])

    return {
        "topic": f"poetry:{poem['id']}",
        "type": "short_answer",
        "question": (
            f"Identify and explain the use of '{figure}' in '{poem['title']}' by {poem['author']}. "
            f"Quote appropriate lines from the poem and analyze their effect on the reader. "
            f"(Hint: One such line is: '{rng.choice(lines)}')"
        ),
        "answer": (
            f"In '{poem['title']}', {poem['author']} uses {figure}. "
            f"{figure_def} "
            f"For example, in the line '{rng.choice(lines)}', "
            f"the {figure} creates a {rng.choice(['vivid image', 'emotional impact', 'rhythmic effect', 'philosophical depth'])} "
            f"that enhances the poem's {rng.choice(['meaning', 'mood', 'tone', 'theme'])} of "
            f"'{poem.get('central_theme', 'human experience')}'."
        ),
        "steps": [
            "Step 1: Identify lines in the poem that use the figure of speech",
            "Step 2: Explain what the figure of speech means",
            "Step 3: Analyze how it enhances the poem's meaning or effect",
            "Step 4: Connect the device to the overall theme and mood",
        ],
        "explanation": (
            f"Figures of speech are essential to poetry as they create meaning beyond the literal. "
            f"In '{poem['title']}', the use of {figure} adds layers of interpretation "
            f"and enriches the reader's experience of the poem."
        ),
        "difficulty": "medium",
        "bloom_level": "analysis",
    }


def gen_notice_writing(rng: random.Random) -> Dict[str, Any]:
    """Notice writing — standard."""
    event = rng.choice(["Inter-House Debate Competition", "Annual Sports Meet", "Science Exhibition", "Book Fair"])
    date = f"{rng.randint(5, 30)}/{rng.randint(1, 12)}/2025"
    time = f"{rng.randint(9, 4)}:{rng.choice(['00', '30'])} {'AM' if rng.random() < 0.5 else 'PM'}"
    venue = rng.choice(["School Auditorium", "Assembly Ground", "Sports Complex", "Library Hall"])
    organizer = rng.choice(["Cultural Committee", "Sports Committee", "Science Club", "Literary Society"])

    return {
        "topic": "grammar:notice_writing",
        "type": "short_answer",
        "question": (
            f"You are the Secretary of the {organizer} of your school. "
            f"Draft a formal notice for the school notice board informing students about "
            f"the upcoming {event}. Include date, time, venue, eligibility, and instructions for registration. "
            f"(Word limit: 50 words)"
        ),
        "answer": (
            f"NOTICE\n\n"
            f"{event}\n\n"
            f"This is to inform all students that the {event} will be held on {date} at {time} in the {venue}. "
            f"Interested students may register with their class teachers by {rng.choice(['10', '15', '20'])} {rng.choice(['January', 'February', 'March'])} 2025. "
            f"For queries, contact the undersigned.\n\n"
            f"(Secretary, {organizer})\n"
            f"({pick_full_name(rng)})"
        ),
        "steps": [
            "Step 1: Write 'NOTICE' in bold at the top",
            "Step 2: Include a clear heading/title",
            "Step 3: State date, time, and venue of the event",
            "Step 4: Mention eligibility criteria and registration details",
            "Step 5: Include contact information",
            "Step 6: End with the name and designation of the issuer",
            "Step 7: Keep within the word limit (50 words)",
        ],
        "explanation": (
            "A notice should be concise and informative. Key elements: title, body (date, time, venue, "
            "eligibility), and signature block. It uses formal language but is more concise than a letter."
        ),
        "difficulty": "easy",
        "bloom_level": "application",
    }


def gen_article_writing(rng: random.Random) -> Dict[str, Any]:
    """Article writing — competency based, Indian context."""
    topics = [
        ("The Impact of Social Media on Indian Youth", "mental health"),
        ("Why Digital Literacy is Essential for Rural India", "education"),
        ("The Future of Electric Vehicles in India", "technology"),
        ("Why India Needs a National Reading Culture", "education"),
        ("Climate Change: A Challenge for the Indian Subcontinent", "environment"),
        ("Traditional Indian Games: Reviving Our Heritage", "culture"),
        ("The Role of Women in India's Tech Revolution", "equality"),
        ("Why Public Transport Must be Improved in Tier-2 Cities", "urban planning"),
    ]
    topic, theme = rng.choice(topics)
    student_name = pick_full_name(rng)
    city = pick_city(rng)

    return {
        "topic": "essay:article",
        "type": "long_answer",
        "question": (
            f"You are {student_name}, a student from {city}. "
            f"Write an article (250-300 words) for your school magazine on the topic: "
            f"'{topic}'. Include an introduction, body with arguments and examples from Indian context, "
            f"and a conclusion with a call to action."
        ),
        "answer": (
            f"Title: {topic}\n\n"
            f"In today's rapidly changing India, {theme} has become more important than ever. "
            f"As students from {city}, we are at the forefront of this transformation. "
            f"{rng.choice(['Studies show that', 'Recent data indicates that', 'Experts believe that'])} "
            f"{rng.choice(['62% of Indian youth', 'over 500 million Indians', 'millions of young Indians'])} "
            f"are affected by this issue. "
            f"Consider the example of {rng.choice(['a government initiative', 'a community program', 'a school project', 'an NGO')} "
            f"in {pick_city(rng)} that has made a significant difference. "
            f"We, as young citizens, must {rng.choice(['take action', 'raise our voices', 'demand change', 'be the change'])}. "
            f"The time to act is now."
        ),
        "steps": [
            "Step 1: Create a catchy, relevant title",
            "Step 2: Write a hook in the introduction (quote, statistic, question)",
            "Step 3: Present 2-3 main arguments with Indian examples",
            "Step 4: Use data or references to strengthen your points",
            "Step 5: Write a conclusion with a call to action",
            "Step 6: Keep within 250-300 words",
        ],
        "explanation": (
            "An article is a formal piece of writing for publication. It should have: a title, "
            "an engaging introduction, logically organized body paragraphs with evidence, and a "
            "strong conclusion. Indian context examples make the article more relevant and persuasive."
        ),
        "difficulty": "medium",
        "bloom_level": "creation",
    }


def gen_speech_writing(rng: random.Random) -> Dict[str, Any]:
    """Speech writing — competency based."""
    student = pick_full_name(rng)
    topic = rng.choice([
        "The importance of preserving India's linguistic diversity",
        "How students can contribute to a cleaner India",
        "Why career counseling is essential for Class XII students",
        "The role of youth in shaping India's future",
        "Balancing tradition and modernity in Indian education",
    ])
    occasion = rng.choice(["school assembly", "annual function", "debate competition", "morning prayer"])

    return {
        "topic": "essay:speech",
        "type": "long_answer",
        "question": (
            f"You are {student}, the Head Boy/Girl of your school. "
            f"Prepare a speech (200-250 words) to be delivered at the {occasion} on the topic: "
            f"'{topic}'. Your speech should have an appropriate salutation, "
            f"a clear introduction, body with persuasive arguments, and a powerful conclusion."
        ),
        "answer": (
            f"Good morning respected Principal, teachers, and my dear friends.\n\n"
            f"Today I stand before you to speak about '{topic}'. "
            f"{rng.choice(['As students of this great nation', 'As young Indians', 'As the future of this country'])} "
            f", we have a responsibility to understand the significance of this issue. "
            f"{rng.choice(['Did you know', 'Consider this', 'Take the example of')} "
            f"— {rng.choice(['India has 22 scheduled languages', 'over 60% of our youth', 'more than 5000 years of history'])} "
            f"and yet we often overlook the importance of {rng.choice(['our heritage', 'our environment', 'our future', 'our diversity'])}. "
            f"Let us each take a small step today. "
            f"Jai Hind! Thank you."
        ),
        "steps": [
            "Step 1: Write an appropriate salutation",
            "Step 2: Grab attention with a hook in the introduction",
            "Step 3: Present 2-3 persuasive arguments",
            "Step 4: Use rhetorical questions and emotional appeal",
            "Step 5: End with a powerful conclusion and call to action",
            "Step 6: Keep within 200-250 words",
        ],
        "explanation": (
            "A speech should engage the audience from the start. Use rhetorical devices like "
            "questions, repetition, and emotional appeals. The language should be conversational "
            "yet formal enough for the occasion. Always end with a memorable conclusion."
        ),
        "difficulty": "medium",
        "bloom_level": "creation",
    }


# ──────────────────────────────────────────────────────────────
#  MAIN GENERATOR
# ──────────────────────────────────────────────────────────────

def generate_questions(seed: int, count: int = 10, topic: str = None) -> List[Dict[str, Any]]:
    """
    Generate deterministic practice questions for CISCE Class 12 English.

    Args:
        seed: Random seed for reproducibility
        count: Number of questions to generate
        topic: Optional topic filter (e.g., "prose", "poetry", "drama", "grammar")

    Returns:
        List of question dictionaries
    """
    rng = random.Random(seed)
    questions = []

    # All generator functions with their topic categories
    generators = {
        # Prose (4 generators)
        "prose_mcq": (gen_prose_mcq, ["prose", None]),
        "prose_character": (gen_prose_character_analysis, ["prose", None]),
        "prose_theme": (gen_prose_theme_interpretation, ["prose", None]),
        # Poetry (3 generators)
        "poetry_appreciation": (gen_poetry_appreciation, ["poetry", None]),
        "poetry_comparison": (gen_poetry_comparison, ["poetry", None]),
        "poetry_figure": (gen_poetry_figure_speech, ["poetry", None]),
        # Drama (3 generators)
        "drama_character": (gen_drama_character, ["drama", None]),
        "drama_plot": (gen_drama_plot_sequence, ["drama", None]),
        "drama_magic": (gen_drama_magic_analysis, ["drama", None]),
        # Grammar (8 generators)
        "grammar_transform": (gen_grammar_transformation, ["grammar", None]),
        "grammar_voice": (gen_grammar_voice, ["grammar", None]),
        "grammar_synthesis": (gen_grammar_synthesis, ["grammar", None]),
        "grammar_vocab": (gen_grammar_vocabulary, ["grammar", None]),
        "grammar_precis": (gen_grammar_precis, ["grammar", None]),
        "grammar_reporting": (gen_grammar_reporting_verbs, ["grammar", None]),
        "grammar_preposition": (gen_grammar_prepositions, ["grammar", None]),
        "grammar_report": (gen_grammar_report_writing, ["grammar", None]),
        # Email/Notice (2 generators)
        "grammar_email": (gen_grammar_email, ["grammar", "writing", None]),
        "grammar_notice": (gen_notice_writing, ["grammar", "writing", None]),
        # Comprehension (1 generator)
        "comprehension": (gen_comprehension_question, ["comprehension", None]),
        # Essay/Speech/Article (3 generators)
        "essay_outline": (gen_essay_outline, ["essay", "writing", None]),
        "article_writing": (gen_article_writing, ["essay", "writing", None]),
        "speech_writing": (gen_speech_writing, ["essay", "writing", None]),
        # Literary terms (1 generator)
        "literary_terms": (gen_grammar_literary_term, ["literature", None]),
        # Integrated (1 generator)
        "integrated": (gen_integrated_skills, ["writing", None]),
    }

    gen_items = list(generators.items())
    rng.shuffle(gen_items)

    competency_generators = [
        "prose_character", "prose_theme", "poetry_comparison", "drama_magic",
        "grammar_report", "grammar_email", "grammar_precis",
        "essay_outline", "article_writing", "speech_writing", "integrated",
        "drama_character", "comprehension",
    ]

    # Mix competency and standard: try to alternate
    standard_pool = [(name, func) for name, (func, _) in gen_items if name not in competency_generators]
    competency_pool = [(name, func) for name, (func, _) in gen_items if name in competency_generators]

    gen_idx = 0
    for i in range(count):
        # Determine if this should be competency-based (50%)
        is_competency = (i % 2 == 0) or (rng.random() < 0.5 and competency_pool)

        if is_competency and competency_pool:
            pool = competency_pool
        else:
            pool = standard_pool if standard_pool else gen_items

        # Pick from the chosen pool
        chosen_name, chosen_func = pool[gen_idx % len(pool)]
        gen_idx += 1

        # Advance random state for each generator call
        rng_val = rng.randint(1, 999999)
        sub_rng = random.Random(rng_val)

        try:
            q = chosen_func(sub_rng)
            # Filter by topic if specified
            if topic:
                if topic not in str(q.get("topic", "")):
                    # Try again with a different generator
                    for attempt in range(5):
                        alt_name, alt_func = pool[(gen_idx + attempt) % len(pool)]
                        alt_rng = random.Random(rng.randint(1, 999999))
                        try:
                            q = alt_func(alt_rng)
                            if topic in str(q.get("topic", "")):
                                break
                        except Exception:
                            continue

            q["id"] = f"q_{seed}_{i}"
            q["generator"] = chosen_name
            questions.append(q)
        except Exception:
            # Fallback: generate a vocabulary question
            q = gen_grammar_vocabulary(rng)
            q["id"] = f"q_{seed}_{i}"
            q["generator"] = "fallback_vocab"
            questions.append(q)

    return questions


def generate_mixed_questions(seed: int, count: int = 10) -> List[Dict[str, Any]]:
    """Generate a well-mixed set of questions across all topics."""
    return generate_questions(seed, count)


def print_question(q: Dict[str, Any], index: int = 0) -> None:
    """Pretty-print a single question."""
    print(f"\n{'='*70}")
    print(f"Question {index + 1}  |  Topic: {q.get('topic', 'N/A')}")
    print(f"Type: {q.get('type', 'N/A')}  |  Difficulty: {q.get('difficulty', 'N/A')}  |  Bloom: {q.get('bloom_level', 'N/A')}")
    print(f"{'='*70}")
    print(f"\n{q['question']}\n")

    if "options" in q:
        print("Options:")
        for i, opt in enumerate(q["options"]):
            marker = " [CORRECT]" if i == q.get("answer_index", -1) else ""
            print(f"  ({chr(65+i)}) {opt}{marker}")

    print(f"\nAnswer: {q['answer']}")
    print(f"\nSteps:")
    for step in q.get("steps", []):
        print(f"  {step}")
    print(f"\nExplanation: {q.get('explanation', 'N/A')}")
    print()


def print_questions(questions: List[Dict[str, Any]]) -> None:
    """Print all questions in a formatted way."""
    print(f"\n{'#'*70}")
    print(f"#  Generated {len(questions)} questions for CISCE Class 12 English")
    print(f"{'#'*70}")
    for i, q in enumerate(questions):
        print_question(q, i)


def main():
    """Main function — demonstrate the question generator."""
    print("=" * 70)
    print("  CISCE Class 12 English — Deterministic Question Generator")
    print("  Syllabus: Short Stories, Poems, Drama (The Tempest), Grammar")
    print("=" * 70)

    # Demonstrate reproducibility with same seed
    seed = 42
    count = 10

    print(f"\nGenerating {count} questions with seed={seed}...")
    questions = generate_questions(seed, count)

    # Count by topic category
    topics = {}
    types = {}
    for q in questions:
        cat = str(q.get("topic", "")).split(":")[0]
        topics[cat] = topics.get(cat, 0) + 1
        types[q.get("type", "unknown")] = types.get(q.get("type", "unknown"), 0) + 1

    print(f"\nTopic distribution: {dict(sorted(topics.items()))}")
    print(f"Type distribution:   {dict(sorted(types.items()))}")

    # Verify reproducibility
    print(f"\n--- Reproducibility Check ---")
    questions2 = generate_questions(seed, count)
    match_count = sum(1 for q1, q2 in zip(questions, questions2) if q1["answer"] == q2["answer"])
    print(f"Questions with same answer on re-generation: {match_count}/{count}")

    # Show all questions
    print_questions(questions)

    # Demonstrate topic-specific generation
    print(f"\n{'='*70}")
    print("Topic-specific: Grammar questions (seed=100)")
    print(f"{'='*70}")
    grammar_qs = generate_questions(100, 5, topic="grammar")
    print_questions(grammar_qs)

    print(f"\n{'='*70}")
    print("Topic-specific: Poetry questions (seed=200)")
    print(f"{'='*70}")
    poetry_qs = generate_questions(200, 4, topic="poetry")
    print_questions(poetry_qs)

    print(f"\n{'='*70}")
    print("Topic-specific: Drama questions (seed=300)")
    print(f"{'='*70}")
    drama_qs = generate_questions(300, 3, topic="drama")
    print_questions(drama_qs)

    # Demonstrate infinite generation (different seeds)
    print(f"\n{'='*70}")
    print("Demonstrating infinite variations (3 batches, different seeds)")
    print(f"{'='*70}")
    for s in [42, 12345, 999999]:
        batch = generate_questions(s, 2)
        print(f"\n  Seed {s}: {batch[0]['generator']} -> Answer: {batch[0]['answer'][:60]}...")


if __name__ == "__main__":
    main()