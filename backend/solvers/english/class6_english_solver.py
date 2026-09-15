"""
CISCE English Class 6 Solver and Question Generator
Syllabus Nodes: c6_c12_eng_001, c8_eng_101, c6_eng_006
All computation uses SymPy, numpy, scipy, math, random (seeded).
No external API calls. Fully self-contained.
"""

import random
import math
import hashlib
import re
import string
from fractions import Fraction
from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Tuple
from sympy import (
    symbols, Rational, simplify, expand, factor, solve as sym_solve,
    Eq, Symbol, nsimplify, factorial, binomial, lcm, gcd, Float,
    Matrix, pi, sqrt, Sum, oo, log, exp
)
import numpy as np

# ============================================================================
# DATA REGISTRIES
# ============================================================================

NOTICE_TEMPLATES = [
    {
        "topic": "Sports Day",
        "title": "SPORTS DAY",
        "body_template": "The Sports Committee of {school} announces the Annual Sports Day on {date} at {time} in the school ground. All students must assemble in their house groups.",
        "designation": "Sports Secretary",
        "params": {
            "school": ["St. Mary's School", "Delhi Public School", "Kendriya Vidyalaya", "DAV Public School"],
            "date": ["15 November 2024", "22 November 2024", "30 November 2024", "10 December 2024"],
            "time": ["9:00 am", "10:00 am", "8:30 am", "9:30 am"]
        }
    },
    {
        "topic": "Book Fair",
        "title": "BOOK FAIR",
        "body_template": "The Library Committee of {school} is organising a Book Fair on {date} at {time} in the school library. Students from Classes 1 to 12 are invited.",
        "designation": "Librarian",
        "params": {
            "school": ["St. Xavier's School", "Ryan International School", "Amity International School", "Springdales School"],
            "date": ["5 October 2024", "12 October 2024", "20 October 2024", "28 October 2024"],
            "time": ["10:00 am", "11:00 am", "9:00 am", "10:30 am"]
        }
    },
    {
        "topic": "Science Exhibition",
        "title": "SCIENCE FAIR",
        "body_template": "The Science Club of {school} invites entries for the Inter-Class Science Exhibition on {date} at {time} in the science lab. Submit your projects to your science teacher by {deadline}.",
        "designation": "Science Coordinator",
        "params": {
            "school": ["St. Mary's School", "Delhi Public School", "Kendriya Vidyalaya No. 1", "Sanskriti School"],
            "date": ["8 November 2024", "15 November 2024", "22 November 2024", "1 December 2024"],
            "time": ["10:00 am", "11:00 am", "9:00 am", "10:30 am"],
            "deadline": ["1 November 2024", "8 November 2024", "15 November 2024", "22 November 2024"]
        }
    },
    {
        "topic": "Picnic",
        "title": "CLASS PICNIC",
        "body_template": "Class {cls} of {school} is going on a picnic to {venue} on {date}. Details: bus departure at {time} from school gate. Pack lunch and water bottle. Fee: Rs. {fee}.",
        "designation": "Class Teacher",
        "params": {
            "school": ["St. Joseph's Convent", "Holy Child School", "Loreto Convent", "Convent of Jesus and Mary"],
            "cls": ["6-A", "6-B", "6-C", "6-D"],
            "venue": ["Nehru Park", "India Gate Lawns", "Lodhi Garden", "Raj Ghat"],
            "date": ["18 October 2024", "25 October 2024", "1 November 2024", "8 November 2024"],
            "time": ["8:00 am", "8:30 am", "9:00 am", "7:30 am"],
            "fee": ["250", "300", "200", "350"]
        }
    },
    {
        "topic": "Lost Item",
        "title": "LOST ITEM",
        "body_template": "Lost: {item} near {location} on {date}. It is {color} in colour and has {identifier}. If found, please contact {name}, Class {cls}.",
        "designation": "Student",
        "params": {
            "item": ["geometry box", "water bottle", "school bag", "watch", "pencil box"],
            "location": ["the playground", "the bus stop", "the library", "the classroom", "the canteen"],
            "date": ["10 July 2024", "15 July 2024", "20 July 2024", "25 July 2024"],
            "color": ["blue", "red", "green", "black", "navy"],
            "identifier": ["a name sticker on it", "my name written on it", "a small sticker of a star", "a keychain attached"],
            "name": ["Riya Sharma", "Arjun Singh", "Priya Gupta", "Karan Verma", "Ananya Iyer"],
            "cls": ["6-A", "6-B", "6-C", "6-D"]
        }
    },
    {
        "topic": "Yoga Day",
        "title": "YOGA DAY",
        "body_template": "The Wellness Committee of {school} celebrates International Yoga Day on {date} at {time} in the school quadrangle. All students and teachers are requested to participate in their comfortable clothes.",
        "designation": "Wellness Coordinator",
        "params": {
            "school": ["Kendriya Vidyalaya", "Navodaya Vidyalaya", "Jawahar Navodaya Vidyalaya", "DAV Public School"],
            "date": ["21 June 2024", "21 June 2024", "21 June 2024", "21 June 2024"],
            "time": ["7:00 am", "7:30 am", "6:45 am", "7:15 am"]
        }
    },
    {
        "topic": "Quiz Competition",
        "title": "GENERAL QUIZ",
        "body_template": "The Quiz Club of {school} is holding an Inter-Class General Knowledge Quiz on {date} at {time} in the auditorium. Each class may send a team of two. Register with your class representative.",
        "designation": "Quiz Club Coordinator",
        "params": {
            "school": ["St. Mary's School", "Delhi Public School", "Modern School", "Vasant Valley School"],
            "date": ["3 August 2024", "10 August 2024", "17 August 2024", "24 August 2024"],
            "time": ["12:00 noon", "1:00 pm", "11:30 am", "12:30 pm"]
        }
    },
    {
        "topic": "Drawing Competition",
        "title": "ART CONTEST",
        "body_template": "The Art Department of {school} announces the Annual Drawing Competition on {date} at {time} in the art room. Topic: {topic}. Participants must bring their own crayons and chart paper.",
        "designation": "Art Teacher",
        "params": {
            "school": ["The Shri Ram School", "Pathways World School", "Woodstock School", "Scindia Kanya Vidyalaya"],
            "date": ["7 September 2024", "14 September 2024", "21 September 2024", "28 September 2024"],
            "time": ["10:00 am", "11:00 am", "9:30 am", "10:30 am"],
            "topic": ["My Favourite Festival", "Life in a Village", "Our National Bird", "The Monsoon Season"]
        }
    }
]

MESSAGE_TEMPLATES = [
    {
        "scenario": "teacher_absent",
        "senders": ["Mrs. Kapoor", "Mr. Sharma", "Ms. Iyer", "Mr. Reddy"],
        "purposes": [
            ("The teacher is absent today. Complete the exercises on pages {page} and {page2} of your English textbook at home.", ["page", "page2"]),
            ("There is no English class today. Please read the poem 'The Road Not Taken' and write its summary in your notebook.", []),
            ("The teacher is on leave. Learn the spellings of Lesson {lesson} words by heart. Dictation on Friday.", ["lesson"]),
            ("No class today due to staff meeting. Write a paragraph of 80 words on 'My Pet' in your rough notebook.", []),
        ]
    },
    {
        "scenario": "homework_reminder",
        "senders": ["Mrs. Kapoor", "Mr. Sharma", "Ms. Iyer", "Mr. Reddy"],
        "purposes": [
            ("Submit the composition on 'A Visit to the Zoo' tomorrow. Minimum 100 words. Write on ruled paper.", []),
            ("Learn the poem 'Daffodils' by heart. Recitation test on Monday. Also write the meanings of five difficult words.", []),
            ("Bring the book 'The Jungle Book' by Rudyard Kipling to class tomorrow. We will discuss Chapter 3.", []),
            ("Complete the grammar worksheet on 'Articles' and 'Prepositions'. Submit on Monday in class.", []),
        ]
    },
    {
        "scenario": "event_info",
        "senders": ["Priya (Class Monitor)", "Rahul (Class 6-A)", "Simran (Vice Captain)", "Arjun (Sports Captain)"],
        "purposes": [
            ("Sports Day practice is today after school in the playground. Wear your house T-shirt and track pants.", []),
            ("Bring two apples and a water bottle for the class picnic tomorrow. Wear your school uniform.", []),
            ("There will be a special assembly on 'Gandhi Jayanti' tomorrow. Wear your full uniform and bring a small flower.", []),
            ("Class test on English Grammar is postponed to next week. Prepare from Chapters 3 to 5.", []),
        ]
    },
    {
        "scenario": "parent_call",
        "senders": ["Mrs. Gupta (Riya's mother)", "Mr. Singh (Arjun's father)", "Mrs. Patel (Priya's mother)", "Mr. Kumar (Karan's father)"],
        "purposes": [
            ("Your parent called to say you forgot your tiffin box at home. They will drop it at the school gate during lunch break.", []),
            ("Your parent called to inform that your grandmother is unwell and you will be absent tomorrow.", []),
            ("Your parent called to ask you to bring your Maths notebook and textbook home today.", []),
            ("Your parent called to say they will pick you up at 3:00 pm today due to a family function.", []),
        ]
    }
]

POETRY_ANALYSIS_DATA = [
    {
        "stanza": [
            "The sun came up so golden bright,",
            "And painted all the sky with light.",
            "The birds began their morning song,",
            "And danced the happy trees among."
        ],
        "rhyme_scheme": "AABB",
        "rhyme_pairs": [("bright", "light"), ("song", "among")],
        "meter_type": "regular (iambic tetrameter)",
        "strong_beats": 4,
        "tone": "joyful, cheerful",
        "tone_evidence": ["golden bright", "happy", "song", "danced"],
        "mood": "cheerful and peaceful",
        "mood_evidence": ["golden bright", "morning song", "happy", "danced"],
        "metre_note": "Each line has approximately 4 strong beats: da-DUM da-DUM da-DUM da-DUM",
        "syllable_count": [7, 7, 7, 8]
    },
    {
        "stanza": [
            "The clouds grew dark across the sky,",
            "The wind began a mournful cry.",
            "The rain fell hard upon the ground,",
            "And all the world was wrapped in sound."
        ],
        "rhyme_scheme": "AABB",
        "rhyme_pairs": [("sky", "cry"), ("ground", "sound")],
        "meter_type": "regular",
        "strong_beats": 4,
        "tone": "sombre, gloomy",
        "tone_evidence": ["dark", "mournful cry", "rain fell hard", "wrapped"],
        "mood": "gloomy and tense",
        "mood_evidence": ["dark", "mournful", "rain fell hard", "sound"],
        "metre_note": "Each line has approximately 4 strong beats with a slow, heavy rhythm",
        "syllable_count": [7, 7, 8, 7]
    },
    {
        "stanza": [
            "The cat sat on the windowsill,",
            "And watched the world go by so still.",
            "She blinked her eyes so slow and green,",
            "The prettiest cat that ever was seen."
        ],
        "rhyme_scheme": "AABB",
        "rhyme_pairs": [("windowsill", "still"), ("green", "seen")],
        "meter_type": "regular",
        "strong_beats": 4,
        "tone": "gentle, admiring",
        "tone_evidence": ["sat", "watched", "prettiest", "green"],
        "mood": "calm and contented",
        "mood_evidence": ["sat", "still", "slow", "prettiest"],
        "metre_note": "Each line has approximately 4 strong beats with a gentle, swaying rhythm",
        "syllable_count": [7, 8, 8, 8]
    },
    {
        "stanza": [
            "I walked alone through forest deep,",
            "Where shadows danced and secrets sleep.",
            "The owl called out from ancient trees,",
            "And stirred the midnight mystery."
        ],
        "rhyme_scheme": "AABB",
        "rhyme_pairs": [("deep", "sleep"), ("trees", "mystery")],
        "meter_type": "regular",
        "strong_beats": 4,
        "tone": "mysterious, wondering",
        "tone_evidence": ["alone", "shadows", "ancient", "mystery"],
        "mood": "mysterious and slightly eerie",
        "mood_evidence": ["alone", "shadows", "midnight", "mystery"],
        "metre_note": "Each line has approximately 4 strong beats with a slow, mysterious rhythm",
        "syllable_count": [7, 7, 7, 7]
    },
    {
        "stanza": [
            "The river flows so cool and clear,",
            "Past fields of corn and rocks so near.",
            "It carries dreams from hill to sea,",
            "A wandering friend for you and me."
        ],
        "rhyme_scheme": "AABB",
        "rhyme_pairs": [("clear", "near"), ("sea", "me")],
        "meter_type": "regular",
        "strong_beats": 4,
        "tone": "peaceful, reflective",
        "tone_evidence": ["flows", "cool", "clear", "wandering friend"],
        "mood": "peaceful and serene",
        "mood_evidence": ["cool", "clear", "dreams", "wandering friend"],
        "metre_note": "Each line has approximately 4 strong beats with a flowing, relaxed rhythm",
        "syllable_count": [7, 7, 7, 8]
    },
    {
        "stanza": [
            "The kite flew high up in the blue,",
            "As children laughed the whole day through.",
            "Their voices rose with every gust,",
            "Their happiness was plain as dust."
        ],
        "rhyme_scheme": "AABB",
        "rhyme_pairs": [("blue", "through"), ("gust", "dust")],
        "meter_type": "regular",
        "strong_beats": 4,
        "tone": "playful, joyful",
        "tone_evidence": ["flew high", "laughed", "whole day", "happiness"],
        "mood": "joyful and carefree",
        "mood_evidence": ["flew high", "laughed", "happiness"],
        "metre_note": "Each line has approximately 4 strong beats with a bouncy, playful rhythm",
        "syllable_count": [7, 7, 7, 8]
    }
]

GRAMMAR_TOPICS = {
    "nouns": {
        "common": ["city", "girl", "book", "teacher", "mountain", "river", "garden", "village", "school", "market", "doctor", "driver", "soldier", "friend", "table", "chair", "window", "door", "flower", "tree"],
        "proper": ["Delhi", "Mumbai", "Ganga", "Taj Mahal", "Ramesh", "Kavita", "Himalaya", "Rahul", "Priya", "Amit", "India", "Diwali", "Holi", "Kerala", "Rajasthan"],
        "collective": ["flock", "herd", "bunch", "pack", "team", "crowd", "class", "family", "army", "society", "audience", "committee"],
        "abstract": ["happiness", "freedom", "honesty", "courage", "beauty", "kindness", "wisdom", "truth", "love", "sorrow", "knowledge", "patience"],
        "material": ["gold", "silver", "milk", "water", "iron", "cotton", "wood", "oil", "honey", "sugar", "salt", "rice"]
    },
    "pronouns": {
        "personal": ["I", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them"],
        "possessive": ["my", "your", "his", "her", "its", "our", "their", "mine", "yours", "hers", "ours", "theirs"],
        "reflexive": ["myself", "yourself", "himself", "herself", "itself", "ourselves", "themselves"],
        "demonstrative": ["this", "that", "these", "those"],
        "interrogative": ["who", "whom", "whose", "which", "what"],
        "relative": ["who", "whom", "whose", "which", "that", "where", "when", "why"]
    },
    "verbs": {
        "action": ["run", "jump", "sing", "dance", "read", "write", "swim", "climb", "cook", "paint"],
        "linking": ["is", "are", "was", "were", "am", "be", "become", "seem", "look", "feel"],
        "helping": ["is", "are", "was", "were", "am", "has", "have", "had", "will", "can", "could", "should", "would", "may", "might"],
        "irregular_present_past": [
            ("go", "went"), ("come", "came"), ("eat", "ate"), ("drink", "drank"),
            ("see", "saw"), ("give", "gave"), ("take", "took"), ("write", "wrote"),
            ("read", "read"), ("sing", "sang"), ("swim", "swam"), ("run", "ran"),
            ("fly", "flew"), ("choose", "chose"), ("speak", "spoke"), ("break", "broke"),
            ("begin", "began"), ("drink", "drank"), ("fall", "fell"), ("grow", "grew"),
            ("know", "knew"), ("ride", "rode"), ("say", "said"), ("sell", "sold"),
            ("send", "sent"), ("shoot", "shot"), ("sing", "sang"), ("sit", "sat"),
            ("sleep", "slept"), ("stand", "stood"), ("understand", "understood"), ("wear", "wore"),
            ("win", "won"), ("write", "wrote"), ("catch", "caught"), ("teach", "taught"),
            ("buy", "bought"), ("bring", "brought"), ("fight", "fought"), ("seek", "sought")
        ]
    },
    "adjectives": {
        "describing_people": ["kind", "brave", "clever", "honest", "gentle", "polite", "hardworking", "lazy", "generous", "shy"],
        "describing_things": ["bright", "dark", "smooth", "rough", "soft", "hard", "heavy", "light", "sweet", "sour"],
        "describing_places": ["beautiful", "peaceful", "noisy", "crowded", "spacious", "quiet", "clean", "dirty"],
        "comparisons": {
            "positive": ["tall", "short", "big", "small", "fast", "slow", "hot", "cold", "heavy", "light", "happy", "sad", "good", "bad", "easy", "difficult", "strong", "weak", "bright", "dark"],
            "comparative": ["taller", "shorter", "bigger", "smaller", "faster", "slower", "hotter", "colder", "heavier", "lighter", "happier", "sadder", "better", "worse", "easier", "more difficult", "stronger", "weaker", "brighter", "darker"],
            "superlative": ["tallest", "shortest", "biggest", "smallest", "fastest", "slowest", "hottest", "coldest", "heaviest", "lightest", "happiest", "saddest", "best", "worst", "easiest", "most difficult", "strongest", "weakest", "brightest", "darkest"]
        }
    },
    "adverbs": {
        "manner": ["quickly", "slowly", "carefully", "happily", "sadly", "quietly", "loudly", "bravely", "gently", "badly"],
        "time": ["now", "then", "today", "yesterday", "tomorrow", "soon", "already", "still", "often", "never"],
        "place": ["here", "there", "everywhere", "nowhere", "inside", "outside", "above", "below", "near", "far"],
        "frequency": ["always", "usually", "often", "sometimes", "rarely", "never", "daily", "weekly", "monthly", "yearly"]
    },
    "prepositions": {
        "time": ["at", "on", "in", "before", "after", "during", "since", "until", "by", "for"],
        "place": ["in", "on", "at", "above", "below", "between", "among", "beside", "behind", "in front of", "near", "under", "over", "into", "onto"],
        "direction": ["to", "towards", "from", "into", "onto", "through", "across", "along", "up", "down"]
    },
    "tenses": {
        "simple_present": {
            "positive": ["She plays cricket.", "I eat mangoes.", "They go to school.", "The sun rises in the east.", "Birds fly in the sky."],
            "negative": ["She does not play cricket.", "I do not eat mangoes.", "They do not go to school.", "The sun does not set in the east.", "Birds do not swim."],
            "question": ["Does she play cricket?", "Do I eat mangoes?", "Do they go to school?", "Does the sun rise in the east?", "Do birds fly in the sky?"]
        },
        "present_continuous": {
            "positive": ["She is playing cricket.", "I am eating mangoes.", "They are going to school.", "The sun is shining brightly.", "Birds are flying in the sky."],
            "negative": ["She is not playing cricket.", "I am not eating mangoes.", "They are not going to school.", "The sun is not shining.", "Birds are not flying."],
            "question": ["Is she playing cricket?", "Am I eating mangoes?", "Are they going to school?", "Is the sun shining?", "Are birds flying?"]
        },
        "simple_past": {
            "positive": ["She played cricket.", "I ate mangoes.", "They went to school.", "The sun rose early.", "Birds flew away."],
            "negative": ["She did not play cricket.", "I did not eat mangoes.", "They did not go to school.", "The sun did not set late.", "Birds did not fly."],
            "question": ["Did she play cricket?", "Did I eat mangoes?", "Did they go to school?", "Did the sun rise early?", "Did birds fly away?"]
        },
        "future_simple": {
            "positive": ["She will play cricket.", "I will eat mangoes.", "They will go to school.", "The sun will rise tomorrow.", "Birds will fly again."],
            "negative": ["She will not play cricket.", "I will not eat mangoes.", "They will not go to school.", "The sun will not set early.", "Birds will not fly."],
            "question": ["Will she play cricket?", "Will I eat mangoes?", "Will they go to school?", "Will the sun rise tomorrow?", "Will birds fly again?"]
        }
    },
    "articles": {
        "a_an": ["apple", "elephant", "igloo", "orange", "umbrella", "hour", "honest boy", "M.A. degree", "FBI agent", "university"],
        "the": ["the sun", "the moon", "the Ganga", "the Taj Mahal", "the President", "the Himalayas", "the earth", "the Red Fort", "the Sahara", "the Amazon"]
    },
    "degrees_of_comparison": {
        "positive_comparative_superlative": [
            ("tall", "taller", "tallest"),
            ("short", "shorter", "shortest"),
            ("bright", "brighter", "brightest"),
            ("happy", "happier", "happiest"),
            ("careful", "more careful", "most careful"),
            ("beautiful", "more beautiful", "most beautiful"),
            ("difficult", "more difficult", "most difficult"),
            ("good", "better", "best"),
            ("bad", "worse", "worst"),
            ("far", "farther", "farthest"),
            ("little", "less", "least"),
            ("many", "more", "most"),
            ("old", "older", "oldest"),
            ("young", "younger", "youngest")
        ]
    },
    "subject_verb_agreement": {
        "singular_subjects": ["He", "She", "It", "The cat", "The boy", "My friend", "Rahul", "A dog", "The teacher", "The sun"],
        "plural_subjects": ["They", "We", "The boys", "The girls", "My friends", "The students", "The birds", "The teachers", "The children", "The dogs"],
        "singular_verbs": ["plays", "goes", "runs", "eats", "watches", "studies", "flies", "sings", "jumps", "writes"],
        "plural_verbs": ["play", "go", "run", "eat", "watch", "study", "fly", "sing", "jump", "write"]
    }
}

READING_COMPREHENSION_PASSAGES = [
    {
        "title": "The Banyan Tree",
        "passage": "At the end of our village stood a huge banyan tree. It was so large that fifty people could sit under its shade. Every afternoon, old men gathered beneath it to share stories. Children played games around its thick trunk. Birds nested in its branches. The tree was a gift from my great-grandfather, who had planted it as a small sapling sixty years ago. Today, it is the heart of our village. During summer, it provides cool shade. During the monsoon, its leaves shelter us from the rain. It is more than a tree - it is a friend, a teacher, and a home.",
        "word_count": 118,
        "questions": [
            {"q": "What was special about the banyan tree?", "answer": "It was very large - so large that fifty people could sit under its shade.", "type": "short"},
            {"q": "Who planted the banyan tree?", "answer": "The narrator's great-grandfather planted it as a small sapling sixty years ago.", "type": "short"},
            {"q": "What did old men do under the tree?", "answer": "They gathered to share stories every afternoon.", "type": "short"},
            {"q": "Why is the tree described as 'more than a tree'?", "answer": "Because it is a friend, a teacher, and a home to the villagers - it provides shade, shelter, and brings people together.", "type": "long"},
            {"q": "The banyan tree provides shade in summer. (True/False)", "answer": "True", "type": "mcq"},
            {"q": "The tree was planted thirty years ago. (True/False)", "answer": "False - it was planted sixty years ago.", "type": "mcq"},
            {"q": "The word 'sapling' means a _____ tree.", "answer": "young", "type": "fill"},
        ]
    },
    {
        "title": "Rani's New Home",
        "passage": "Rani was excited. Her family was moving from a small town in Bihar to a big city in Maharashtra. She had never seen the sea or a tall building. The night before they left, she could not sleep. Her mother packed her favourite books and her doll, Munni. Her father loaded the car with boxes. The journey took two days. When Rani first saw the tall buildings of Mumbai, she gasped. 'Are those the clouds?' she asked. Her father laughed. 'No, those are buildings.' Rani's new school was huge. The playground was twice as big as her old one. She made three new friends in her first week. Life in the city was different, but soon it felt like home.",
        "word_count": 148,
        "questions": [
            {"q": "From where did Rani's family move?", "answer": "From a small town in Bihar to a big city in Maharashtra (Mumbai).", "type": "short"},
            {"q": "What did Rani's mother pack?", "answer": "Her favourite books and her doll named Munni.", "type": "short"},
            {"q": "How long did the journey take?", "answer": "Two days.", "type": "short"},
            {"q": "What does Rani compare the tall buildings to?", "answer": "She compares them to clouds.", "type": "short"},
            {"q": "Describe how Rani felt about her new city in the end.", "answer": "Rani felt that life in the city was different from her small town, but she gradually adjusted and it soon felt like home. She made new friends and found her school's playground was twice as big.", "type": "long"},
            {"q": "Rani was moving to Mumbai. (True/False)", "answer": "True", "type": "mcq"},
            {"q": "Rani's family was moving from Maharashtra to Bihar. (True/False)", "answer": "False - they were moving from Bihar to Maharashtra.", "type": "mcq"},
            {"q": "Rani's doll was named _____.", "answer": "Munni", "type": "fill"},
        ]
    },
    {
        "title": "The Giving Tree",
        "passage": "Every Sunday, little Meera visited her grandmother's house. Her grandmother was a kind woman who lived in a small cottage with a beautiful garden. In the garden grew a mango tree that Meera loved. One day, Meera noticed that the tree looked sad. Its leaves were drooping. 'Grandma, why is the tree sad?' she asked. 'It needs water, beta,' said her grandmother. Meera watered the tree every day. A week later, the tree was green and happy again. Meera learned that taking care of things and people brings the greatest joy. She also learned that trees, like people, need love and care.",
        "word_count": 123,
        "questions": [
            {"q": "What did Meera notice about the mango tree one day?", "answer": "It looked sad - its leaves were drooping.", "type": "short"},
            {"q": "Why did the tree need help?", "answer": "It needed water.", "type": "short"},
            {"q": "What did Meera do for the tree?", "answer": "She watered it every day.", "type": "short"},
            {"q": "What lesson did Meera learn?", "answer": "She learned that taking care of things and people brings the greatest joy, and that trees, like people, need love and care.", "type": "long"},
            {"q": "Meera visited her grandmother every Saturday. (True/False)", "answer": "False - she visited every Sunday.", "type": "mcq"},
            {"q": "The tree was a banyan tree. (True/False)", "answer": "False - it was a mango tree.", "type": "mcq"},
            {"q": "Meera's grandmother lived in a small _____.", "answer": "cottage", "type": "fill"},
        ]
    },
    {
        "title": "The Wise Crow",
        "passage": "One hot summer day, a thirsty crow flew over a village. He saw a pot of water on a windowsill. He landed beside it and looked inside. There was water, but it was very low. The crow could not reach it with his beak. He tried to tip the pot over, but it was too heavy. Then he had an idea. He picked up small pebbles from the ground and dropped them into the pot one by one. Slowly, the water rose. When the water reached the top, the crow drank it happily. 'Where there is a will, there is a way,' he thought, and flew away refreshed.",
        "word_count": 114,
        "questions": [
            {"q": "Why did the crow feel thirsty?", "answer": "It was a hot summer day and the crow had been flying.", "type": "short"},
            {"q": "Why could the crow not drink the water directly?", "answer": "The water was very low in the pot, beyond the reach of his beak.", "type": "short"},
            {"q": "What was the crow's clever idea?", "answer": "He dropped small pebbles into the pot to make the water rise.", "type": "short"},
            {"q": "What moral does this story teach?", "answer": "Where there is a will, there is a way. The story teaches that intelligence and patience can solve difficult problems.", "type": "long"},
            {"q": "The crow was hungry. (True/False)", "answer": "False - the crow was thirsty.", "type": "mcq"},
            {"q": "The crow tried to tip the pot over. (True/False)", "answer": "True", "type": "mcq"},
            {"q": "The crow dropped _____ into the pot to raise the water level.", "answer": "pebbles", "type": "fill"},
        ]
    }
]

# return {"status": "ok", "note": "truncated"}
