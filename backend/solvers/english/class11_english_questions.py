"""
class11_english_questions.py
CISCE ISC Elective English (Class 11) - Deterministic Question Generator
Paper I: Theory (80 marks, 3 hrs) - Three prescribed texts:
  Prose: Animal Farm (Orwell)
  Drama: Twelve Angry Men (Reginald Rose) / The Importance of Being Earnest (Wilde)
  Poetry: Fireflies anthology (Milton, Shelley, Hardy, Yeats, Owen, Dylan Thomas, C.A. Duffy)

Question types: MCQ | Fill-Blank | Short-Answer | Long-Answer | Numerical
Covers: exam technique, PEE/PEEE method, 5 question types (character, incident,
  general, theme, critical evaluation), CFQ skills, marking schemes.
"""

import random
import math
import re
import string
import unicodedata
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
from enum import Enum, auto
from collections import Counter
import hashlib

# ---------- numpy/scientific for scoring computations ----------
try:
    import numpy as _np
    _HAS_NP = True
except ImportError:
    _HAS_NP = False

try:
    from scipy.spatial.distance import cosine as _scipy_cosine
    _HAS_SCIPY = True
except ImportError:
    _HAS_SCIPY = False


# =====================================================================
# ENUMS & DATA CLASSES
# =====================================================================

class QType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"


class TextSource(Enum):
    ANIMAL_FARM = "Animal Farm"
    TWELVE_ANGRY_MEN = "Twelve Angry Men"
    IMPORTANCE_EARNEST = "The Importance of Being Earnest"
    FIREFLIES_POETRY = "Fireflies (Poetry Anthology)"
    EXAM_TECHNIQUE = "Exam Technique"


class TopicArea(Enum):
    CHARACTER_BASED = "character_based"
    INCIDENT_BASED = "incident_based"
    GENERAL_BROAD = "general_broad"
    THEME_BASED = "theme_based"
    CRITICAL_EVALUATION = "critical_evaluation"
    PEE_ESSAY = "pee_essay"
    CFQ_QUOTATION = "cfq_quotation"
    EXAM_STRUCTURE = "exam_structure"
    MARKING_SCHEME = "marking_scheme"
    POETRY_ANALYSIS = "poetry_analysis"
    DRAMATIC_TECHNIQUE = "dramatic_technique"


class Difficulty(Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"


@dataclass
class SolverResult:
    answer: Any
    steps: List[str]
    verification: str
    score: float = 0.0
    max_score: float = 20.0
    feedback: List[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "answer": self.answer,
            "steps": self.steps,
            "verification": self.verification,
            "score": self.score,
            "max_score": self.max_score,
            "feedback": self.feedback,
        }


@dataclass
class Question:
    id: str
    type: str
    question: str
    options: Optional[List[str]]
    answer: Any
    explanation: str
    difficulty: str
    topic: str
    text_source: str
    marks: int
    keywords: List[str] = field(default_factory=list)
    model_answer: Optional[str] = None
    pee_template: Optional[Dict] = None

    def to_dict(self) -> dict:
        d = {
            "id": self.id,
            "type": self.type,
            "question": self.question,
            "options": self.options,
            "answer": self.answer,
            "explanation": self.explanation,
            "difficulty": self.difficulty,
            "topic": self.topic,
            "text_source": self.text_source,
            "marks": self.marks,
        }
        if self.keywords:
            d["keywords"] = self.keywords
        if self.model_answer:
            d["model_answer"] = self.model_answer
        if self.pee_template:
            d["pee_template"] = self.pee_template
        return d


# =====================================================================
# SEEDED RNG HELPER
# =====================================================================

class SRng:
    """Seeded pseudo-random generator wrapping Python's random."""
    def __init__(self, seed: int = 42):
        self._seed = seed
        self._rng = random.Random(seed)

    def reseed(self, seed: int):
        self._seed = seed
        self._rng = random.Random(seed)

    def choice(self, seq):
        return self._rng.choice(seq)

    def choices(self, population, weights=None, k=1):
        return self._rng.choices(population, weights=weights, k=k)

    def shuffle(self, lst):
        self._rng.shuffle(lst)
        return lst

    def randint(self, lo, hi):
        return self._rng.randint(lo, hi)

    def uniform(self, lo, hi):
        return self._rng.uniform(lo, hi)

    def sample(self, pop, k):
        return self._rng.sample(pop, k)


# =====================================================================
# TEXT ANALYSIS HELPERS
# =====================================================================

def _tokenize(text: str) -> List[str]:
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s']", " ", text)
    return text.split()


def _term_freq(tokens: List[str]) -> Dict[str, float]:
    n = len(tokens)
    if n == 0:
        return {}
    c = Counter(tokens)
    return {w: cnt / n for w, cnt in c.items()}


def _cosine_similarity(tf1: Dict[str, float], tf2: Dict[str, float]) -> float:
    all_words = set(tf1) | set(tf2)
    if not all_words:
        return 0.0
    dot = sum(tf1.get(w, 0.0) * tf2.get(w, 0.0) for w in all_words)
    mag1 = math.sqrt(sum(v * v for v in tf1.values()))
    mag2 = math.sqrt(sum(v * v for v in tf2.values()))
    if mag1 == 0 or mag2 == 0:
        return 0.0
    return dot / (mag1 * mag2)


def _jaccard(a: List[str], b: List[str]) -> float:
    sa, sb = set(w.lower() for w in a), set(w.lower() for w in b)
    if not sa and not sb:
        return 0.0
    return len(sa & sb) / len(sa | sb)


def _word_count(text: str) -> int:
    return len(_tokenize(text))


def _levenshtein_ratio(a: str, b: str) -> float:
    """Simple normalized Levenshtein similarity."""
    m, n = len(a), len(b)
    if m == 0 and n == 0:
        return 1.0
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            cost = 0 if a[i - 1] == b[j - 1] else 1
            dp[i][j] = min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost)
    dist = dp[m][n]
    return 1.0 - dist / max(m, n)


def _normalize(s: str) -> str:
    return " ".join(_tokenize(s))


# =====================================================================
# PEE/PEEE STRUCTURE DETECTOR
# =====================================================================

PEE_SIGNALS = {
    "point": ["argue", "contend", "suggest", "demonstrate", "show", "reveal",
               "illustrate", "emphasize", "the character", "the passage", "the incident",
               "it is evident", "clearly", "significantly", "importantly",
               "this shows", "this reveals", "this demonstrates"],
    "evidence": ["quote", "quotes", "stated", "writes", "writes:", "says:",
                 "the text", "the line", "the passage", " Orwell ", " Wilde ",
                 " Rose ", " Duffy ", " Owen ", " Thomas ", " Yeats ", " Shelley ",
                 " Hardy ", " Milton ", "he says", "she says", "it says",
                 "evident in", "seen when", "shown in", "illustrated by"],
    "explanation": ["significance", "meaning", "signifies", "represents",
                    "symbolizes", "embodies", "reflects", "underscores",
                    "conveys", "suggests that", "implies", "indicates that",
                    "therefore", "thus", "hence", "this reveals", "this shows",
                    "demonstrating", "highlighting", "emphasising", "underscoring",
                    "this is significant", "this is important"],
    "evaluation": ["ultimately", "overall", "effectively", "successfully",
                   "powerfully", "significantly", "Wilde's use", "Orwell's",
                   "Rose's technique", "poignant", "masterful", "striking",
                   "impact", "achievement", "distinction", "judgement"],
}


def _detect_pee_structure(text: str) -> Dict[str, int]:
    text_lower = text.lower()
    scores = {}
    for component, signals in PEE_SIGNALS.items():
        scores[component] = sum(1 for s in signals if s.lower() in text_lower)
    return scores


def _pee_score(text: str) -> float:
    struct = _detect_pee_structure(text)
    wc = _word_count(text)
    point_score = min(struct["point"] / 2.0, 1.0)
    evidence_score = min(struct["evidence"] / 3.0, 1.0)
    explanation_score = min(struct["explanation"] / 3.0, 1.0)
    evaluation_score = min(struct["evaluation"] / 2.0, 1.0)
    length_score = min(wc / 300.0, 1.0) * 0.5 + 0.5 * (1.0 if wc >= 200 else wc / 200.0)
    raw = 0.2 * point_score + 0.25 * evidence_score + 0.25 * explanation_score + 0.2 * evaluation_score + 0.1 * length_score
    return min(raw * 20.0, 20.0)


def _check_summary_vs_analysis(text: str) -> tuple:
    """Returns (is_summary_score, has_analysis_signals)."""
    text_lower = text.lower()
    summary_words = ["then", "after that", "next", "later", "eventually",
                     "and then", "first", "secondly", "in the end",
                     "finally", "summary", "to conclude this part"]
    analysis_words = ["because", "therefore", "thus", "implies", "suggests",
                      "reveals", "demonstrates", "significance", "represents",
                      "symbolizes", "underscores", "conveys", "effectively",
                      "this shows that", "it is significant"]
    s_score = sum(1 for w in summary_words if w in text_lower)
    a_score = sum(1 for w in analysis_words if w in text_lower)
    return s_score, a_score


# =====================================================================
# QUESTION BANKS
# =====================================================================

# --- MCQ BANK ---
MCQ_BANK = [
    # Animal Farm
    {
        "question": "In Animal Farm, who originally delivers the speech that inspires the animals to rebel?",
        "options": ["Snowball", "Napoleon", "Old Major", "Squealer"],
        "answer": "Old Major",
        "explanation": "Old Major, the prize-winning boar, delivers the revolutionary speech about 'Animalism' before his death, inspiring the animals to overthrow Mr. Jones.",
        "difficulty": "easy", "topic": "character_based",
        "text_source": "Animal Farm", "marks": 1,
        "keywords": ["Old Major", "boar", "speech", "Animalism", "rebel"],
        "model_answer": "Old Major delivers the inspiring speech about Animalism.",
    },
    {
        "question": "What ultimately becomes of Snowball in Animal Farm?",
        "options": ["He becomes the leader", "He is driven off the farm by Napoleon's dogs", "He peacefully retires", "He becomes a propaganda tool"],
        "answer": "He is driven off the farm by Napoleon's dogs",
        "explanation": "Napoleon raises a litter of puppies in secret and uses them to chase Snowball away during the debate over the windmill, consolidating his own power.",
        "difficulty": "easy", "topic": "incident_based",
        "text_source": "Animal Farm", "marks": 1,
        "keywords": ["Snowball", "driven off", "dogs", "Napoleon", "power"],
    },
    {
        "question": "In Animal Farm, the Seven Commandments are ultimately reduced to a single maxim. What is it?",
        "options": [
            "'All animals are equal, but some animals are more equal than others.'",
            "'All animals are equal.'",
            "'No animal shall drink alcohol.'",
            "'Four legs good, two legs better.'"
        ],
        "answer": "'All animals are equal, but some animals are more equal than others.'",
        "explanation": "The final corruption of the original commandment 'All animals are equal' into this oxymoronic statement reveals the complete betrayal of the revolution by the pigs.",
        "difficulty": "medium", "topic": "theme_based",
        "text_source": "Animal Farm", "marks": 1,
        "keywords": ["more equal", "Seven Commandments", "betrayal", "pigs", "corruption"],
    },
    {
        "question": "Boxer's two maxims in Animal Farm are:",
        "options": [
            "'I will work harder' and 'Napoleon is always right'",
            "'Four legs good' and 'Two legs bad'",
            "'Rebellion now' and 'Freedom forever'",
            "'All animals equal' and 'Unity is strength'"
        ],
        "answer": "'I will work harder' and 'Napoleon is always right'",
        "explanation": "Boxer's maxims show his tragic devotion to the cause and his blind trust in Napoleon, making his eventual betrayal by the pigs all the more devastating.",
        "difficulty": "easy", "topic": "character_based",
        "text_source": "Animal Farm", "marks": 1,
        "keywords": ["Boxer", "I will work harder", "Napoleon is always right", "devotion"],
    },
    {
        "question": "In Animal Farm, what do the Seven Commandments represent in the allegory?",
        "options": [
            "The original ideals of the Russian Revolution / Communist Party principles",
            "Animal habits",
            "Mr. Jones's rules",
            "Religious commandments"
        ],
        "answer": "The original ideals of the Russian Revolution / Communist Party principles",
        "explanation": "The Seven Commandments represent the original ideals of the Russian Revolution (equality, no luxury, no alcohol), which are systematically corrupted as the pigs gain power.",
        "difficulty": "medium", "topic": "theme_based",
        "text_source": "Animal Farm", "marks": 1,
        "keywords": ["ideals", "Russian Revolution", "corrupted", "principles", "communism"],
    },
    {
        "question": "Who is the only animal in Animal Farm who can read and write well from the start?",
        "options": ["Snowball", "Benjamin", "Napoleon", "Mollie"],
        "answer": "Benjamin",
        "explanation": "Benjamin the donkey can read and write well but is cynical and refuses to apply his knowledge politically, saying 'Donkeys live a long time. None of you has ever seen a dead donkey.'",
        "difficulty": "medium", "topic": "character_based",
        "text_source": "Animal Farm", "marks": 1,
        "keywords": ["Benjamin", "donkey", "cynical", "read", "write"],
    },
    # Twelve Angry Men
    {
        "question": "In Twelve Angry Men, which juror is the first to vote 'Not Guilty'?",
        "options": ["Juror #3", "Juror #8", "Juror #9", "Juror #11"],
        "answer": "Juror #8",
        "explanation": "Juror #8 is the lone dissenter in the initial vote (11-1), casting the sole 'Not Guilty' vote and insisting on deliberation before sending a boy to the electric chair.",
        "difficulty": "easy", "topic": "character_based",
        "text_source": "Twelve Angry Men", "marks": 1,
        "keywords": ["Juror #8", "first", "Not Guilty", "dissenter", "deliberation"],
    },
    {
        "question": "In Twelve Angry Men, what is the defendant accused of?",
        "options": [
            "Murdering his father with a switchblade knife",
            "Stealing money",
            "Kidnapping",
            "Arson"
        ],
        "answer": "Murdering his father with a switchblade knife",
        "explanation": "An 18-year-old boy from a slum is accused of stabbing his father with a switchblade knife. If found guilty, the mandatory sentence is death in the electric chair.",
        "difficulty": "easy", "topic": "incident_based",
        "text_source": "Twelve Angry Men", "marks": 1,
        "keywords": ["murder", "father", "switchblade", "knife", "guilty", "death"],
    },
    {
        "question": "In Twelve Angry Men, the phrase 'reasonable doubt' means:",
        "options": [
            "A doubt based on reason and common sense that prevents jurors from being sure of guilt",
            "A juror is unsure of their own mind",
            "The evidence is insufficient",
            "The defendant is obviously innocent"
        ],
        "answer": "A doubt based on reason and common sense that prevents jurors from being sure of guilt",
        "explanation": "'Reasonable doubt' is the legal standard requiring jurors to acquit if they harbour any genuine, logically-grounded doubt about the prosecution's case - it does not require certainty of innocence.",
        "difficulty": "medium", "topic": "theme_based",
        "text_source": "Twelve Angry Men", "marks": 1,
        "keywords": ["reasonable doubt", "legal standard", "acquit", "doubt", "common sense"],
    },
    {
        "question": "Juror #3 in Twelve Angry Men opposes acquittal primarily because:",
        "options": [
            "He has a strained relationship with his own son and projects this onto the defendant",
            "He hates poor people",
            "He always votes guilty",
            "He does not understand the evidence"
        ],
        "answer": "He has a strained relationship with his own son and projects this onto the defendant",
        "explanation": "Juror #3 reveals at the climax that he has a bitter estrangement from his own son, which colours his judgment and makes him project his anger onto the defendant.",
        "difficulty": "medium", "topic": "character_based",
        "text_source": "Twelve Angry Men", "marks": 1,
        "keywords": ["Juror #3", "son", "project", "personal bias", "anger"],
    },
    {
        "question": "The switchblade knife is central to Twelve Angry Men because:",
        "options": [
            "It demonstrates reasonable doubt - the prosecution claims it is unique but jurors find similar knives",
            "It is the murder weapon",
            "It proves the defendant's guilt",
            "It is not relevant to the case"
        ],
        "answer": "It demonstrates reasonable doubt - the prosecution claims it is unique but jurors find similar knives",
        "explanation": "Juror #8 produces an identical switchblade knife in court, demonstrating that the prosecution's claim of a 'unique weapon' is false and creating reasonable doubt.",
        "difficulty": "medium", "topic": "incident_based",
        "text_source": "Twelve Angry Men", "marks": 1,
        "keywords": ["switchblade", "knife", "reasonable doubt", "identical", "weapon", "Juror #8"],
    },
    {
        "question": "In Twelve Angry Men, the setting - a hot, stuffy jury room - symbolically represents:",
        "options": [
            "The pressure and confinement of the deliberative process and social tensions",
            "The comfort of justice",
            "The innocence of the jurors",
            "Nothing significant"
        ],
        "answer": "The pressure and confinement of the deliberative process and social tensions",
        "explanation": "The stifling summer heat mirrors the heated arguments and social tensions among the jurors, creating a claustrophobic atmosphere that mirrors the weight of their responsibility.",
        "difficulty": "hard", "topic": "critical_evaluation",
        "text_source": "Twelve Angry Men", "marks": 1,
        "keywords": ["setting", "hot", "pressure", "symbolic", "tension", "atmosphere"],
    },
    # The Importance of Being Earnest
    {
        "question": "In The Importance of Being Earnest, what is the play's primary genre?",
        "options": [
            "Comedy of Manners",
            "Tragedy",
            "Historical Drama",
            "Melodrama"
        ],
        "answer": "Comedy of Manners",
        "explanation": "The Importance of Being Earnest is a quintessential Comedy of Manners, satirizing Victorian social conventions, marriage, and hypocrisy through wit and absurd situations.",
        "difficulty": "easy", "topic": "critical_evaluation",
        "text_source": "The Importance of Being Earnest", "marks": 1,
        "keywords": ["comedy of manners", "Victorian", "satire", "social conventions", "wit"],
    },
    {
        "question": "In The Importance of Being Earnest, what does 'Bunburying' refer to?",
        "options": [
            "Algernon's invented excuse (a fictional invalid friend) to avoid social obligations",
            "A type of sandwich",
            "A dance",
            "A pseudonym"
        ],
        "answer": "Algernon's invented excuse (a fictional invalid friend) to avoid social obligations",
        "explanation": "Algernon invents a fictitious invalid friend named 'Bunbury' whom he must visit whenever he wishes to escape tedious social engagements, highlighting Victorian hypocrisy.",
        "difficulty": "medium", "topic": "character_based",
        "text_source": "The Importance of Being Earnest", "marks": 1,
        "keywords": ["Bunbury", "Algernon", "excuse", "invalid friend", "escape", "obligations"],
    },
    {
        "question": "Lady Bracknell's interrogations in The Importance of Being Earnest primarily serve to:",
        "options": [
            "Satirize the Victorian obsession with social status and wealth",
            "Provide comic relief only",
            "Advance the romantic plot",
            "Criticize the younger generation"
        ],
        "answer": "Satirize the Victorian obsession with social status and wealth",
        "explanation": "Lady Bracknell's merciless questioning about Jack's income, parentage, and social standing mercilessly exposes the shallow materialism of the Victorian upper class.",
        "difficulty": "medium", "topic": "character_based",
        "text_source": "The Importance of Being Earnest", "marks": 1,
        "keywords": ["Lady Bracknell", "satirize", "social status", "wealth", "Victorian", "interrogation"],
    },
    {
        "question": "The handbag found at Victoria Station in The Importance of Being Earnest is significant because:",
        "options": [
            "It is the key to Jack's true identity as the lost baby",
            "It contains money",
            "It belongs to Gwendolen",
            "It is a red herring"
        ],
        "answer": "It is the key to Jack's true identity as the lost baby",
        "explanation": "The handbag in which baby Jack was placed by Miss Prism at Victoria Station is the crucial clue that reveals Jack Worthing's true identity as the lost nephew of Lady Bracknell.",
        "difficulty": "medium", "topic": "incident_based",
        "text_source": "The Importance of Being Earnest", "marks": 1,
        "keywords": ["handbag", "Victoria Station", "identity", "Jack", "Miss Prism", "baby"],
    },
    # Fireflies Poetry
    {
        "question": "Shelley's 'Ozymandias' is best described as a:",
        "options": ["Sonnet", "Ballad", "Elegy", "Blank verse"],
        "answer": "Sonnet",
        "explanation": "'Ozymandias' is a 14-line sonnet (though not a Petrarchan or Shakespearean in strict form) that explores the transience of political power through the ruined statue of a once-great king.",
        "difficulty": "easy", "topic": "poetry_analysis",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 1,
        "keywords": ["Ozymandias", "Shelley", "sonnet", "power", "transience"],
    },
    {
        "question": "Yeats' 'The Second Coming' was written in response to:",
        "options": [
            "The political and cultural upheaval following World War I and the Irish Revolution",
            "A personal dream",
            "A love affair",
            "The death of a friend"
        ],
        "answer": "The political and cultural upheaval following World War I and the Irish Revolution",
        "explanation": "Written in 1919, 'The Second Coming' reflects Yeats's apocalyptic response to post-WWI political chaos, the Russian Revolution, and Ireland's revolutionary turmoil.",
        "difficulty": "medium", "topic": "poetry_analysis",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 1,
        "keywords": ["Yeats", "Second Coming", "World War I", "apocalyptic", "1919", "Irish Revolution"],
    },
    {
        "question": "Dylan Thomas's 'Do not go gentle into that good night' is structured as a:",
        "options": ["Villanelle", "Sonnet", "Ballad", "Blank verse"],
        "answer": "Villanelle",
        "explanation": "'Do not go gentle into that good night' is a villanelle - a 19-line poem with two refrains and an ABA ABA ABA ABA ABA ABAA rhyme scheme - that urges defiance of death.",
        "difficulty": "easy", "topic": "poetry_analysis",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 1,
        "keywords": ["Dylan Thomas", "villanelle", "refrain", "rage against", "dying of the light"],
    },
    {
        "question": "Wilfred Owen's 'Anthem for Doomed Youth' contrasts:",
        "options": [
            "The dignity of funeral rites at home versus the brutal, meaningless deaths of soldiers in war",
            "Peace and war",
            "Youth and old age",
            "England and France"
        ],
        "answer": "The dignity of funeral rites at home versus the brutal, meaningless deaths of soldiers in war",
        "explanation": "Owen contrasts the honour and ritual of traditional funerals ('passing-bells', 'choirs', 'candles') with the mechanized, impersonal slaughter of young soldiers in WWI ('monstrous anger of the guns').",
        "difficulty": "medium", "topic": "theme_based",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 1,
        "keywords": ["Owen", "Anthem", "funeral", "war", "soldiers", "death", "monstrous anger"],
    },
    {
        "question": "Milton's 'On His Blindness' expresses his anxiety about:",
        "options": [
            "Being unable to serve God through his poetry after losing his sight",
            "His failing memory",
            "Financial hardship",
            "His family's disapproval"
        ],
        "answer": "Being unable to serve God through his poetry after losing his sight",
        "explanation": "Milton writes the sonnet as a Petrarchan meditation on his blindness and its threat to his divine calling as a poet. 'They also serve who only stand and wait' resolves his spiritual crisis.",
        "difficulty": "medium", "topic": "poetry_analysis",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 1,
        "keywords": ["Milton", "blindness", "serve God", "sonnet", "patience", "poet"],
    },
    {
        "question": "Hardy's 'The Darkling Thrush' juxtaposes:",
        "options": [
            "The bleak winter landscape with the thrush's unexpected, hopeful song",
            "Summer and winter",
            "Rural and urban life",
            "Joy and sorrow in equal measure"
        ],
        "answer": "The bleak winter landscape with the thrush's unexpected, hopeful song",
        "explanation": "The poem contrasts the corpse-grey winter landscape, symbol of a world exhausted by the 19th century, with the thrush's 'full-hearted evensong' that offers a glimmer of spiritual hope the speaker cannot share.",
        "difficulty": "medium", "topic": "theme_based",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 1,
        "keywords": ["Hardy", "Darkling Thrush", "bleak", "hopeful", "song", "winter", "twentieth century"],
    },
    {
        "question": "In 'Ozymandias', the 'sneer of cold command' on the statue's face represents:",
        "options": [
            "The arrogant, authoritarian nature of Ozymandias's rule",
            "The cold weather",
            "An expression of sadness",
            "A sculptor's error"
        ],
        "answer": "The arrogant, authoritarian nature of Ozymandias's rule",
        "explanation": "The 'sneer of cold command' on the ruined statue captures the king's arrogance and tyranny, which the poem contrasts with the total erasure of his empire by time - a powerful irony.",
        "difficulty": "medium", "topic": "poetry_analysis",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 1,
        "keywords": ["sneer", "cold command", "Ozymandias", "arrogance", "tyranny", "irony"],
    },
    {
        "question": "The 'blood-dimmed tide' in Yeats' 'The Second Coming' refers to:",
        "options": [
            "The violence and bloodshed unleashed by World War I and revolutionary chaos",
            "A flood",
            "A religious ritual",
            "A physical tide"
        ],
        "answer": "The violence and bloodshed unleashed by World War I and revolutionary chaos",
        "explanation": "The 'blood-dimmed tide is loosed' metaphorically describes WWI's unprecedented carnage and the release of violent forces that have drowned the ceremonies of innocence.",
        "difficulty": "hard", "topic": "poetry_analysis",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 1,
        "keywords": ["blood-dimmed tide", "violence", "World War I", "chaos", "ceremonies of innocence"],
    },
    {
        "question": "In The Importance of Being Earnest, Gwendolen and Cecily's shared fixation is:",
        "options": [
            "The name 'Ernest'",
            "Marrying a wealthy man",
            "Living in the country",
            "Playing the piano"
        ],
        "answer": "The name 'Ernest'",
        "explanation": "Both Gwendolen and Cecily declare that they could only love a man named Ernest/Ernest, satirizing the Victorian tendency to value surface form and trivialities over genuine substance.",
        "difficulty": "easy", "topic": "theme_based",
        "text_source": "The Importance of Being Earnest", "marks": 1,
        "keywords": ["Ernest", "Gwendolen", "Cecily", "name", "fixation", "satire"],
    },
    # Exam Technique
    {
        "question": "The PEE structure in essay writing stands for:",
        "options": [
            "Point, Evidence, Explanation",
            "Plan, Execute, Edit",
            "Purpose, Evidence, Evaluation",
            "Point, Example, Elaboration"
        ],
        "answer": "Point, Evidence, Explanation",
        "explanation": "PEE is the fundamental structure for ISC Elective English essays: make a Point, support it with Evidence (a quotation or reference), and provide an Explanation of its significance.",
        "difficulty": "easy", "topic": "exam_structure",
        "text_source": "Exam Technique", "marks": 1,
        "keywords": ["PEE", "Point", "Evidence", "Explanation", "essay structure"],
    },
    {
        "question": "The ISC Elective English Paper I is worth how many marks?",
        "options": ["80 marks", "100 marks", "60 marks", "40 marks"],
        "answer": "80 marks",
        "explanation": "Paper I is 80 marks, 3 hours. Candidates answer questions on any THREE of the prescribed textbooks. Paper II (Project Work) carries 20 marks internally.",
        "difficulty": "easy", "topic": "exam_structure",
        "text_source": "Exam Technique", "marks": 1,
        "keywords": ["80 marks", "Paper I", "3 hours", "ISC", "elective English"],
    },
    {
        "question": "How many textbooks must a candidate answer questions on in ISC Elective English Paper I?",
        "options": ["Any THREE", "All prescribed texts", "Two only", "One only"],
        "answer": "Any THREE",
        "explanation": "Candidates answer questions on any THREE of the prescribed textbooks from the categories: Prose (Novel), Drama, and Poetry.",
        "difficulty": "easy", "topic": "exam_structure",
        "text_source": "Exam Technique", "marks": 1,
        "keywords": ["three", "textbooks", "answer", "Paper I", "prescribed"],
    },
    {
        "question": "The PEEE method extends PEE by adding:",
        "options": ["Evaluation", "Elaboration", "Extension", "Emphasis"],
        "answer": "Evaluation",
        "explanation": "PEEE adds an Evaluation layer where the student makes a personal or critical judgment - the bridge from Class 11 (PEE) to Class 12 (PEEE) analytical writing.",
        "difficulty": "medium", "topic": "exam_structure",
        "text_source": "Exam Technique", "marks": 1,
        "keywords": ["PEEE", "evaluation", "judgment", "critical", "Class 12"],
    },
]

# --- FILL-BLANK BANK ---
FILL_BLANK_BANK = [
    {
        "question": "In Animal Farm, the song that inspires the animals to rebel is called '______ of England'.",
        "answer": "Beasts of England",
        "explanation": "Old Major teaches the animals 'Beasts of England,' which becomes the revolutionary anthem until Snowball is exiled and Napoleon replaces it with 'Comrade Napoleon.'",
        "difficulty": "easy", "topic": "incident_based",
        "text_source": "Animal Farm", "marks": 1,
        "keywords": ["Beasts of England", "anthem", "song", "Old Major", "revolutionary"],
    },
    {
        "question": "Boxer the horse's maxim is: 'I will work ______ and Napoleon is always right.'",
        "answer": "harder",
        "explanation": "Boxer's personal motto - 'I will work harder' and 'Napoleon is always right' - epitomises the proletariat's blind faith in revolutionary leadership, which is ultimately betrayed.",
        "difficulty": "easy", "topic": "character_based",
        "text_source": "Animal Farm", "marks": 1,
        "keywords": ["Boxer", "harder", "maxim", "devotion", "Napoleon"],
    },
    {
        "question": "In Twelve Angry Men, Juror #10 makes offensive generalisations about people from ______ backgrounds.",
        "answer": "slum / underprivileged",
        "explanation": "Juror #10's bigoted outburst against 'those people' from slums reveals how prejudice can override reason in jury deliberations, prompting the other jurors to turn away from him.",
        "difficulty": "easy", "topic": "character_based",
        "text_source": "Twelve Angry Men", "marks": 1,
        "keywords": ["Juror #10", "slum", "prejudice", "bigotry", "background"],
    },
    {
        "question": "Dylan Thomas's poem to his dying father begins: 'Do not go gentle into that good ______'.",
        "answer": "night",
        "explanation": "'Do not go gentle into that good night' is a villanelle written for Thomas's dying father, urging resistance against death through the repeated refrains about raging against the dying of the light.",
        "difficulty": "easy", "topic": "poetry_analysis",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 1,
        "keywords": ["Dylan Thomas", "night", "villanelle", "father", "death", "refrain"],
    },
    {
        "question": "In The Importance of Being Earnest, Algernon's fictional friend who is perpetually ill is named ______.",
        "answer": "Bunbury",
        "explanation": "Bunbury is Algernon's fictitious invalid friend whose supposed illnesses provide a convenient excuse for Algernon to escape tedious social obligations - a satire on Victorian hypocrisy.",
        "difficulty": "easy", "topic": "character_based",
        "text_source": "The Importance of Being Earnest", "marks": 1,
        "keywords": ["Bunbury", "Algernon", "fictitious", "ill", "excuse", "escape"],
    },
    {
        "question": "The rhetorical device used in 'Ozymandias' when the poet says 'Look on my Works, ye Mighty, and despair!' is ______.",
        "answer": "dramatic irony",
        "explanation": "The inscription 'Look on my Works, ye Mighty, and despair!' is deeply ironic: the 'Works' have crumbled to nothing, and the reader - not the Mighty - should despair at the folly of pride.",
        "difficulty": "medium", "topic": "poetry_analysis",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 1,
        "keywords": ["dramatic irony", "Ozymandias", "pride", "ruins", "inscription"],
    },
    {
        "question": "In Animal Farm, the farm's original name is ______ Farm, renamed by the animals after the rebellion.",
        "answer": "Manor",
        "explanation": "Manor Farm is the original name, changed to Animal Farm after the rebellion and later changed back to Manor Farm when the pigs begin trading with human farmers - completing the circle of betrayal.",
        "difficulty": "easy", "topic": "incident_based",
        "text_source": "Animal Farm", "marks": 1,
        "keywords": ["Manor Farm", "original name", "renamed", "Animal Farm", "betrayal"],
    },
    {
        "question": "The literary device most prominently used in Dylan Thomas's 'Do not go gentle into that good night' is the ______.",
        "answer": "refrain / villanelle",
        "explanation": "The villanelle form uses two refrains ('Do not go gentle into that good night' and 'Rage, rage against the dying of the light') that alternate throughout the poem's 19 lines.",
        "difficulty": "medium", "topic": "poetry_analysis",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 1,
        "keywords": ["villanelle", "refrain", "repeated", "structure", "Thomas"],
    },
]

# --- SHORT-ANSWER BANK (5-10 marks) ---
SHORT_ANSWER_BANK = [
    {
        "question": "With close reference to Animal Farm, explain how Squealer functions as a propagandist for Napoleon's regime. (5 marks)",
        "model_answer": (
            "Squealer, the pig, serves as Napoleon's chief propagandist throughout Animal Farm. "
            "He uses manipulative language - e.g., explaining the pigs' consumption of milk and apples "
            "as 'brainwork' necessary for the farm's management - to justify privilege. "
            "He constantly alters the Seven Commandments and rewrites history (claiming Snowball was "
            "always a traitor) to maintain the animals' loyalty. "
            "His persuasive speeches and statistics ('food had increased by 20%') manipulate the animals "
            "into accepting worsening conditions. Orwell uses Squealer to show how language can be "
            "corrupted to serve authoritarian power - a technique relevant to all totalitarian regimes."
        ),
        "explanation": "A strong answer identifies Squealer's role, gives 2-3 specific examples, explains the technique (language manipulation, historical revisionism), and links to Orwell's theme of propaganda.",
        "keywords": ["Squealer", "propaganda", "Napoleon", "Seven Commandments", "language", "manipulation",
                     "Snowball", "history", "animals", "Orwell"],
        "pee_components": {"point": 0.9, "evidence": 0.95, "explanation": 0.85},
        "difficulty": "medium", "topic": "character_based",
        "text_source": "Animal Farm", "marks": 5,
    },
    {
        "question": (
            "In Twelve Angry Men, how does Reginald Rose use the character of Juror #8 "
            "to explore the theme of moral courage? (5 marks)"
        ),
        "model_answer": (
            "Juror #8 is the moral centre of Twelve Angry Men. When all other jurors vote 'Guilty,' "
            "he alone votes 'Not Guilty' - not because he is certain of innocence, but because "
            "he believes a human life deserves deliberation. His calm persistence in questioning "
            "the evidence (the knife, the woman witness, the old man's testimony) demonstrates "
            "intellectual courage against peer pressure. "
            "Rose shows that moral courage means standing alone when the crowd is wrong - "
            "Juror #8 says: 'It's just one vote. We can talk about it.' "
            "His example gradually converts other jurors, illustrating that integrity is contagious."
        ),
        "explanation": "Key elements: identify Juror #8 as moral centre, cite specific actions (initial vote, knife scene, witness questioning), explain what moral courage means in context.",
        "keywords": ["Juror #8", "moral courage", "Not Guilty", "deliberation", "integrity", "peer pressure",
                     "evidence", "conscience", "stand alone"],
        "pee_components": {"point": 0.9, "evidence": 0.9, "explanation": 0.85},
        "difficulty": "medium", "topic": "character_based",
        "text_source": "Twelve Angry Men", "marks": 5,
    },
    {
        "question": (
            "Analyse how the Seven Commandments in Animal Farm are progressively corrupted "
            "to reflect the pigs' consolidation of power. (5 marks)"
        ),
        "model_answer": (
            "The Seven Commandments begin as pure revolutionary principles ('No animal shall kill "
            "any other animal,' 'All animals are equal') but are systematically altered to suit "
            "the pigs' privileges. After the hens' rebellion, 'No animal shall kill any other "
            "animal' becomes 'No animal shall kill any other animal without cause.' "
            "Later, 'No animal shall drink alcohol' becomes 'No animal shall drink alcohol to excess.' "
            "Finally, the commandments are erased entirely and replaced with the single maxim: "
            "'All animals are equal, but some animals are more equal than others.' "
            "This progression reveals how revolutionary ideals are corrupted by those in power, "
            "mirroring the history of the Soviet Union."
        ),
        "explanation": "Trace the specific changes to each commandment, link each to a specific incident, and explain the thematic significance of the final corruption.",
        "keywords": ["Seven Commandments", "corruption", "pigs", "power", "alcohol", "killing",
                     "more equal", "revolutionary ideals", "Soviet Union", "Orwell"],
        "pee_components": {"point": 0.9, "evidence": 0.9, "explanation": 0.9},
        "difficulty": "medium", "topic": "theme_based",
        "text_source": "Animal Farm", "marks": 5,
    },
    {
        "question": (
            "With reference to 'Ozymandias' from the Fireflies anthology, "
            "analyse how Shelley uses irony to explore the theme of the transience of power. (5 marks)"
        ),
        "model_answer": (
            "Shelley's 'Ozymandias' uses dramatic irony to expose the hubris of political power. "
            "The inscription 'My name is Ozymandias, King of Kings: / Look on my Works, ye Mighty, "
            "and despair!' is deeply ironic - the 'Works' have vanished, leaving only 'two vast "
            "and trunkless legs of stone' in an empty desert. "
            "The traveller-narrator structure creates distance, allowing Shelley to show that "
            "all empires - however mighty - are ultimately consumed by time. "
            "The shattered visage's 'sneer of cold command' suggests the arrogance of rulers "
            "who believe their power is permanent. Shelley, writing in 1818, reflects on "
            "Napoleon's rise and fall, suggesting that tyranny is always temporary."
        ),
        "explanation": "Identify the inscription, explain the irony, link to the theme of power/impermanence, connect to Shelley's historical context (Napoleon).",
        "keywords": ["Ozymandias", "irony", "transience", "power", "Shelley", "king", "ruins",
                     "empire", "despair", "sneer", "command"],
        "pee_components": {"point": 0.85, "evidence": 0.95, "explanation": 0.9},
        "difficulty": "medium", "topic": "poetry_analysis",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 5,
    },
    {
        "question": (
            "In The Importance of Being Earnest, how does Wilde use the character of "
            "Lady Bracknell to satirize Victorian social values? (5 marks)"
        ),
        "model_answer": (
            "Lady Bracknell is Wilde's primary vehicle for satirizing Victorian obsession with "
            "social status, wealth, and propriety. Her interrogation of Jack - 'To be born, or "
            "at any rate bred, in a hand-bag?' - reduces human worth to pedigree and income. "
            "Her criteria for Gwendolen's suitor (income of at least £10,000, respectable parents) "
            "expose the mercenary nature of upper-class marriage. "
            "Wilde uses her exaggerated formal language and imperious manner to ridicule "
            "a society that values appearance over character. Her comic authority makes her "
            "one of the greatest satirical creations in English drama."
        ),
        "explanation": "Focus on Lady Bracknell's language, specific satirical moments, the targets of satire (social class, marriage as transaction), Wilde's technique.",
        "keywords": ["Lady Bracknell", "Wilde", "Victorian", "satire", "social class", "wealth",
                     "pedigree", "marriage", "appearance", "character"],
        "pee_components": {"point": 0.9, "evidence": 0.9, "explanation": 0.85},
        "difficulty": "medium", "topic": "character_based",
        "text_source": "The Importance of Being Earnest", "marks": 5,
    },
    {
        "question": (
            "Explain how Wilfred Owen uses the contrast between funeral rituals and battlefield "
            "death in 'Anthem for Doomed Youth' to critique the war. (5 marks)"
        ),
        "model_answer": (
            "Owen contrasts the dignity of conventional funeral rites with the brutal anonymity "
            "of soldiers' deaths in WWI. The title itself is ironic - an 'anthem' suggests "
            "celebration, but these are 'doomed youth.' "
            "The octave replaces church bells with 'the monstrous anger of the guns' and choirs "
            "with 'wailing shells,' showing how war replaces sacred ritual with mechanized slaughter. "
            "The sestet asks 'what candles may be held' and answers with 'the glimmer of good-byes' "
            "in soldiers' eyes - a poignant, human substitute for religious ceremony. "
            "Owen's sonnet form - traditionally used for love - is subverted to mourn "
            "those denied proper mourning."
        ),
        "explanation": "Structure: (1) irony in title, (2) contrasts in octave, (3) sestet's pall substitutes, (4) form-subversion, (5) anti-war message.",
        "keywords": ["Owen", "Anthem", "funeral", "war", "contrast", "guns", "shells", "candles",
                     "monstrous anger", "rite", "sonnet", "anti-war"],
        "pee_components": {"point": 0.85, "evidence": 0.95, "explanation": 0.9},
        "difficulty": "medium", "topic": "poetry_analysis",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 5,
    },
    {
        "question": (
            "What is the significance of the old man's testimony in Twelve Angry Men? "
            "How does Juror #8 dismantle it? (5 marks)"
        ),
        "model_answer": (
            "The old man's testimony is the prosecution's key piece of evidence - he claims "
            "to have heard the defendant say 'I'm going to kill you' and run down the stairs "
            "in 15 seconds. Juror #8 dismantles it in two ways: "
            "First, he demonstrates physically that a man with a lame leg could not reach the "
            "stairs in 15 seconds. Second, he shows the loud noise of the passing L train would "
            "have made it impossible to hear a quiet voice clearly. "
            "This dismantling of a 'witness' illustrates Rose's theme that circumstantial evidence "
            "and human frailty can lead to miscarriages of justice."
        ),
        "explanation": "State the old man's claim, describe Juror #8's two refutations (physical + acoustic), link to the play's theme of reasonable doubt.",
        "keywords": ["old man", "witness", "Juror #8", "15 seconds", "lame leg", "L train",
                     "testimony", "evidence", "reasonable doubt", "miscarriage of justice"],
        "pee_components": {"point": 0.85, "evidence": 0.9, "explanation": 0.85},
        "difficulty": "medium", "topic": "incident_based",
        "text_source": "Twelve Angry Men", "marks": 5,
    },
    {
        "question": (
            "Trace the development of Benjamin the donkey in Animal Farm and explain "
            "what his character represents in Orwell's allegory. (5 marks)"
        ),
        "model_answer": (
            "Benjamin is the oldest, wisest animal on the farm - he can read and write but "
            "is deeply cynical, remarking 'Donkeys live a long time. None of you has ever seen "
            "a dead donkey.' He represents the sceptical, disillusioned intellectual who sees "
            "the revolution's betrayal but does nothing to stop it. His inaction - he could "
            "have warned Boxer - makes him complicit. After Boxer's death, he reads the "
            "altered commandments but is too weary to act. Orwell uses Benjamin to critique "
            "those who see injustice but choose passivity - and to show that cynicism alone "
            "is not enough to prevent tyranny."
        ),
        "explanation": "Trace Benjamin's arc (wisdom → cynicism → inaction), explain his symbolic role (disillusioned intellectual), link to Orwell's warning about passivity.",
        "keywords": ["Benjamin", "donkey", "cynical", "Boxer", "injustice", "tyranny",
                     "passivity", "read", "write", "allegory", "Orwell"],
        "pee_components": {"point": 0.85, "evidence": 0.85, "explanation": 0.85},
        "difficulty": "medium", "topic": "character_based",
        "text_source": "Animal Farm", "marks": 5,
    },
    {
        "question": (
            "How does Hardy convey a note of unexpected hope at the end of 'The Darkling Thrush'? "
            "Why is this hope qualified? (5 marks)"
        ),
        "model_answer": (
            "After 30 lines describing the bleak midwinter landscape - 'The frost has wrought "
            "a spirit in my eyes / The same that in the gloomy yet hopeful thrush's song. "
            "The thrush, an 'aged, frail, gaunt, and small' bird, sings 'a full-hearted "
            "evensong / Of joy illimited' - an extraordinary burst of hope in a desolate scene. "
            "Hardy qualifies this hope: the speaker cannot identify 'the blessed Hope' "
            "that inspires the bird, suggesting that hope exists but is inaccessible to "
            "the modern, disillusioned speaker. Written at the turn of the 20th century, "
            "the poem captures Victorian uncertainty - hope is present but its source remains mysterious."
        ),
        "explanation": "Describe the bleak landscape, introduce the thrush's song, explain its hopeful quality, discuss the speaker's inability to share that hope, contextualise historically.",
        "keywords": ["Hardy", "Darkling Thrush", "hope", "song", "winter", "twentieth century",
                     "evensong", "blessed hope", "desolate", "illimited"],
        "pee_components": {"point": 0.8, "evidence": 0.85, "explanation": 0.85},
        "difficulty": "medium", "topic": "poetry_analysis",
        "text_source": "Fireflies (Poetry Anthology)", "marks": 5,
    },
]


# return {"status": "ok", "note": "truncated"}
