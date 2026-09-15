"""
CISCE Class 10 History & Civics - Deterministic Solver and Question Generator
Covers: First War of Independence 1857, Rise of Nationalism in India,
        Mahatma Gandhi and Nationalist Movement, Partition of India,
        Union Parliament, President and Vice-President, Prime Minister,
        Supreme Court, Fundamental Rights and Directive Principles,
        Local Self-Government (Panchayati Raj and Urban Local Bodies)
"""

import random
import math
import fractions
import hashlib
import json
import re
import datetime
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Any, Optional, Tuple


# ======================================================================
# UTILITIES
# ======================================================================

def make_seed(*args) -> int:
    """Deterministic integer seed from any number of arguments."""
    raw = json.dumps(args, sort_keys=True, default=str)
    h = hashlib.md5(raw.encode()).hexdigest()
    return int(h, 16) % (2**31)


def normalize(s: str) -> str:
    """Normalise whitespace for comparison."""
    return " ".join(s.lower().split())


def verify_answer(computed: Any, expected: Any) -> bool:
    """Compare two values loosely."""
    return normalize(str(computed)) == normalize(str(expected))


# ======================================================================
# DATA CLASSES
# ======================================================================

@dataclass
class Question:
    id: str
    type: str
    difficulty: str
    topic: str
    node: str
    question: str
    options: List[str] = field(default_factory=list)
    answer: str = ""
    explanation: str = ""
    competency: bool = False
    tags: List[str] = field(default_factory=list)


@dataclass
class SolveResult:
    success: bool
    question_id: str
    topic: str
    steps: List[str]
    answer: str
    explanation: str
    verification: str
    confidence: str


# ======================================================================
# MASTER QUESTION BANK
# ======================================================================

_QUESTION_BANK: List[Dict[str, Any]] = [
    # ── NODE HIST001: First War of Independence, 1857 ───────────────────
    {
        "id": "C10H001_MCQ_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "The First War of Independence, 1857",
        "node": "HIST001",
        "question": "Which of the following was an immediate cause of the First War of Independence, 1857?",
        "options": [
            "A - Introduction of the Ryotwari System",
            "B - The issue of the new Enfield rifle cartridges greased with animal fat",
            "C - The Doctrine of Lapse policy applied to Awadh",
            "D - The establishment of British paramountcy over Indian states",
        ],
        "answer": "B",
        "explanation": "The immediate trigger was the introduction of the new Enfield rifle. The cartridges were rumoured to be greased with the fat of cows (sacred to Hindus) and pigs (taboo to Muslims). Sepoys had to bite the cartridges before loading, offending both religious communities.",
        "competency": False,
    },
    {
        "id": "C10H001_MCQ_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "The First War of Independence, 1857",
        "node": "HIST001",
        "question": "Who was declared the leader of the First War of Independence at a meeting of sepoys in Delhi on May 12, 1857?",
        "options": [
            "A - Rani Lakshmibai of Jhansi",
            "B - Nana Saheb",
            "C - Bahadur Shah Zafar",
            "D - Tantia Tope",
        ],
        "answer": "C",
        "explanation": "Bahadur Shah Zafar, the last Mughal emperor, was declared the leader (Shahenshah-e-Hindustan) of the revolt. Although he was a reluctant figurehead at 82 years of age, his name lent legitimacy to the uprising across northern India.",
        "competency": False,
    },
    {
        "id": "C10H001_MCQ_03",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "The First War of Independence, 1857",
        "node": "HIST001",
        "question": "Where did Rani Lakshmibai die fighting the British in June 1858?",
        "options": [
            "A - Delhi",
            "B - Lucknow",
            "C - Gwalior",
            "D - Jhansi",
        ],
        "answer": "C",
        "explanation": "Rani Lakshmibai died on the battlefield near Gwalior in June 1858. After Jhansi was besieged and captured by British forces under Sir Hugh Rose in April 1858, she escaped and joined Tantia Tope. They captured Gwalior, but the Rani was killed in a skirmish near the Phool Bagh area of Gwalior.",
        "competency": False,
    },
    {
        "id": "C10H001_MCQ_04",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "The First War of Independence, 1857",
        "node": "HIST001",
        "question": "Who was the British Governor-General of India at the time of the First War of Independence in 1857?",
        "options": [
            "A - Lord Dalhousie",
            "B - Lord Canning",
            "C - Lord Wellesley",
            "D - Lord Auckland",
        ],
        "answer": "B",
        "explanation": "Lord Canning was the Governor-General of India during the Revolt of 1857. He was the last Governor-General of the East India Company era and the first Viceroy of India under the British Crown after the Government of India Act 1858.",
        "competency": False,
    },
    {
        "id": "C10H001_MCQ_05",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "The First War of Independence, 1857",
        "node": "HIST001",
        "question": "Which of the following was NOT a political cause of the First War of Independence, 1857?",
        "options": [
            "A - The Doctrine of Lapse",
            "B - Annexation of Awadh",
            "C - Introduction of the Enfield rifle",
            "D - Denial of the right of adoption to Indian princes",
        ],
        "answer": "C",
        "explanation": "The introduction of the Enfield rifle was a MILITARY cause, not a political cause. Political causes included the Doctrine of Lapse (annexing states without a natural heir), annexation of Awadh on grounds of misgovernance, and denial of adoption rights to Indian princes.",
        "competency": False,
    },
    {
        "id": "C10H001_MCQ_06",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "The First War of Independence, 1857",
        "node": "HIST001",
        "question": "The Government of India Act of 1858 resulted in which of the following major changes?",
        "options": [
            "A - Transfer of power from the East India Company to the British Crown",
            "B - Introduction of the Indian Civil Services examination in India",
            "C - Abolition of the zamindari system",
            "D - Introduction of dyarchy in provinces",
        ],
        "answer": "A",
        "explanation": "The Government of India Act 1858 transferred the administration of India from the East India Company to the British Crown. The title of Governor-General of India was changed to Viceroy of India. A new office of Secretary of State for India was created in the British Cabinet.",
        "competency": False,
    },
    {
        "id": "C10H001_SAQ_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "The First War of Independence, 1857",
        "node": "HIST001",
        "question": "Give any two economic causes of the First War of Independence, 1857.",
        "options": [],
        "answer": "(1) Heavy land revenue demands ruined peasants and landlords. (2) Destruction of Indian handicraft industries due to British manufactured imports, leaving artisans unemployed.",
        "explanation": "Economic causes included: (1) High land revenue demands under the Permanent Settlement and other systems impoverished peasants and dispossessed zamindars. (2) British policy of dumping cheap manufactured goods destroyed India's traditional handicraft industries (textiles, silk, etc.), rendering lakhs of artisans jobless.",
        "competency": False,
        "tags": ["causes", "economic"],
    },
    {
        "id": "C10H001_SAQ_02",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "The First War of Independence, 1857",
        "node": "HIST001",
        "question": "Name any three leaders of the First War of Independence, 1857, and the places with which they were associated.",
        "options": [],
        "answer": "(1) Rani Lakshmibai - Jhansi (2) Nana Saheb - Kanpur (3) Tantia Tope - Gwalior (4) Begum Hazrat Mahal - Lucknow (5) Kunwar Singh - Bihar (any three)",
        "explanation": "Key leaders and their regions: Rani Lakshmibai (Jhansi), Nana Saheb (Kanpur), Tantia Tope (Gwalior), Begum Hazrat Mahal (Lucknow), Kunwar Singh (Bihar), Maulvi Ahmadullah (Faizabad), Khan Bahadur Khan (Bareilly). Each led the revolt in their respective regions.",
        "competency": False,
        "tags": ["leaders", "regions"],
    },
    {
        "id": "C10H001_COMP_01",
        "type": "case_study",
        "difficulty": "Hard",
        "topic": "The First War of Independence, 1857",
        "node": "HIST001",
        "question": "Read the following passage and answer the question: 'The mutiny of 1857 was a war of Indian independence.' Critically examine this statement with reference to the nature and extent of the revolt.",
        "options": [],
        "answer": "The 1857 revolt had features of both a war of independence and a limited revolt. Arguments for 'war of independence': widespread participation across classes and regions, unified leadership under Bahadur Shah Zafar, common enemy (British), and Hindu-Muslim unity. Arguments against: not all Indian states joined (e.g., Sikhs and Marathas largely remained loyal), the revolt was primarily a military mutiny with limited civilian leadership, and it lacked a coherent vision for a free India.",
        "explanation": "This is a case study requiring multi-step reasoning. First, identify evidence supporting the 'war of independence' view: national scope, Hindu-Muslim unity, leadership of Bahadur Shah Zafar. Second, identify counter-evidence: limited geographic spread, many princely states sided with the British, no unified political programme. Third, form a balanced conclusion: the 1857 revolt was a significant nationalist uprising but not a fully organized war of independence.",
        "competency": True,
        "tags": ["case_study", "critical_thinking", "nature_of_revolt"],
    },

    # ── NODE HIST002: Rise of Nationalism in India ──────────────────────
    {
        "id": "C10H002_MCQ_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Rise of Nationalism in India",
        "node": "HIST002",
        "question": "The Indian National Congress was founded in which year?",
        "options": ["A - 1885", "B - 1905", "C - 1919", "D - 1920"],
        "answer": "A",
        "explanation": "The Indian National Congress (INC) was founded in December 1885 at Gokuldas Tejpal Sanskrit College in Bombay. Womesh Chandra Bonnerjee was its first President. A.O. Hume, a retired British civil servant, played a key role in its formation along with Indian leaders like Dadabhai Naoroji.",
        "competency": False,
    },
    {
        "id": "C10H002_MCQ_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Rise of Nationalism in India",
        "node": "HIST002",
        "question": "Who among the following was a prominent leader of the 'Extremist' wing of the Indian National Congress?",
        "options": [
            "A - Gopal Krishna Gokhale",
            "B - Dadabhai Naoroji",
            "C - Bal Gangadhar Tilak",
            "D - Surendranath Banerjee",
        ],
        "answer": "C",
        "explanation": "Bal Gangadhar Tilak was a prominent leader of the Extremist (Garam Dal) faction of the INC. He propagated the slogan 'Swaraj is my birthright and I shall have it'. Other extremists included Bipin Chandra Pal and Lala Lajpat Rai (the Lal-Bal-Pal trio). The moderates included Gokhale, Naoroji, and Banerjee.",
        "competency": False,
    },
    {
        "id": "C10H002_MCQ_03",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Rise of Nationalism in India",
        "node": "HIST002",
        "question": "The Partition of Bengal was announced in which year?",
        "options": ["A - 1903", "B - 1905", "C - 1911", "D - 1919"],
        "answer": "B",
        "explanation": "The Partition of Bengal was announced in July 1905 by Lord Curzon and implemented on October 16, 1905. The stated reason was administrative convenience, but the real motive was to divide the Bengali-speaking population on communal lines and weaken the nationalist movement. It was annulled in 1911.",
        "competency": False,
    },
    {
        "id": "C10H002_MCQ_04",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Rise of Nationalism in India",
        "node": "HIST002",
        "question": "The Swadeshi Movement was started as a direct response to which event?",
        "options": [
            "A - The Rowlatt Act",
            "B - The Partition of Bengal",
            "C - The Simon Commission",
            "D - The Jallianwala Bagh massacre",
        ],
        "answer": "B",
        "explanation": "The Swadeshi Movement was launched in 1905 as a direct response to the Partition of Bengal. It aimed at boycotting British goods and promoting indigenous Indian products. The movement popularised the spinning of khadi (handspun cloth), national education, and Indian languages. It was a mass movement that spread from Bengal to other parts of India.",
        "competency": False,
    },
    {
        "id": "C10H002_MCQ_05",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "Rise of Nationalism in India",
        "node": "HIST002",
        "question": "Who among the following founded the Indian Home Rule League in 1916?",
        "options": [
            "A - Annie Besant",
            "B - Bal Gangadhar Tilak",
            "C - Mahatma Gandhi",
            "D - Jawaharlal Nehru",
        ],
        "answer": "B",
        "explanation": "Bal Gangadhar Tilak founded the Indian Home Rule League in 1916 at Belgaum (Karnataka). Annie Besant founded another Home Rule League at Madras the same year. Both leagues demanded self-government (Home Rule) within the British Empire, similar to the demands of Dominions like Australia and Canada.",
        "competency": False,
    },
    {
        "id": "C10H002_SAQ_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Rise of Nationalism in India",
        "node": "HIST002",
        "question": "Differentiate between the 'Moderates' and the 'Extremists' in the Indian National Congress (two points of difference).",
        "options": [],
        "answer": "(1) Methods: Moderates favoured constitutional methods (petitions, prayers, protests), while Extremists favoured more aggressive methods (boycott, swadeshi, passive resistance). (2) Demands: Moderates wanted reforms within the British Empire, while Extremists demanded complete self-rule (Swaraj).",
        "explanation": "The Moderates (1885-1905) believed in British justice and used peaceful, constitutional methods. The Extremists (1905 onwards) lost faith in British intentions and adopted more radical means. The split became formal at the Surat session of 1907.",
        "competency": False,
        "tags": ["moderates", "extremists"],
    },
    {
        "id": "C10H002_COMP_01",
        "type": "case_study",
        "difficulty": "Hard",
        "topic": "Rise of Nationalism in India",
        "node": "HIST002",
        "question": "Analyse the role of the press in the growth of Indian nationalism during the late 19th and early 20th centuries. Give examples of at least three newspapers and their editors.",
        "options": [],
        "answer": "The press played a crucial role in spreading nationalist ideas. Key newspapers: (1) Kesari (Marathi) edited by Bal Gangadhar Tilak - propagated nationalist ideas. (2) The Hindu (English) edited by G. Subramaniya Iyer - criticised British policies. (3) Amrita Bazar Patrika (English) edited by Sisir Kumar Ghosh - exposed British misrule. (4) Bengali newspapers like Sandhya and Yugantar spread revolutionary ideas.",
        "explanation": "This competency question requires connecting historical facts: the press educated Indians about their rights, created public opinion against British policies, connected people across regions, and provided a platform for nationalist leaders. The Vernacular Press Act of 1878 (repealed in 1882) shows how threatened the British were by the Indian press.",
        "competency": True,
        "tags": ["case_study", "press", "nationalism"],
    },

    # ── NODE HIST003: Mahatma Gandhi and the Nationalist Movement ────────
    {
        "id": "C10H003_MCQ_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Mahatma Gandhi and the Nationalist Movement",
        "node": "HIST003",
        "question": "In which year did Mahatma Gandhi launch the Non-Cooperation Movement?",
        "options": ["A - 1919", "B - 1920", "C - 1930", "D - 1942"],
        "answer": "B",
        "explanation": "Mahatma Gandhi launched the Non-Cooperation Movement in August 1920, after the Indian National Congress session at Nagpur. It was suspended in February 1922 following the Chauri Chaura incident where a mob killed 22 policemen. Gandhi believed the people were not yet ready for non-violent mass action.",
        "competency": False,
    },
    {
        "id": "C10H003_MCQ_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Mahatma Gandhi and the Nationalist Movement",
        "node": "HIST003",
        "question": "The Civil Disobedience Movement was launched with which famous event?",
        "options": [
            "A - The Dandi March (Salt Satyagraha)",
            "B - The Quit India Resolution",
            "C - The Simon Commission boycott",
            "D - The Champaran Satyagraha",
        ],
        "answer": "A",
        "explanation": "The Civil Disobedience Movement was launched on March 12, 1930, when Mahatma Gandhi started the Dandi March from Sabarmati Ashram with 78 followers. He marched 240 miles to Dandi on the Arabian Sea coast, where he broke the salt law by picking up a handful of salt on April 6, 1930.",
        "competency": False,
    },
    {
        "id": "C10H003_MCQ_03",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Mahatma Gandhi and the Nationalist Movement",
        "node": "HIST003",
        "question": "Which event led to the suspension of the Non-Cooperation Movement by Mahatma Gandhi in 1922?",
        "options": [
            "A - The Jallianwala Bagh massacre",
            "B - The Chauri Chaura incident",
            "C - The arrest of Mahatma Gandhi",
            "D - The failure of the Khilafat Movement",
        ],
        "answer": "B",
        "explanation": "Gandhi suspended the Non-Cooperation Movement after the Chauri Chaura incident of February 4, 1922, in Uttar Pradesh. A protesting mob clashed with police, set a police station on fire, and 22 policemen were killed. Gandhi felt the movement was turning violent and withdrew it, saying 'I must withdraw the movement because I have made a mistake. The evil one is not dead.'",
        "competency": False,
    },
    {
        "id": "C10H003_MCQ_04",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Mahatma Gandhi and the Nationalist Movement",
        "node": "HIST003",
        "question": "The Quit India Resolution was passed at which session of the Indian National Congress?",
        "options": [
            "A - Lahore, 1929",
            "B - Ramgarh, 1940",
            "C - Bombay, 1942",
            "D - Madras, 1927",
        ],
        "answer": "C",
        "explanation": "The Quit India Resolution was passed at the Bombay session of the INC on August 8, 1942. Mahatma Gandhi gave the call 'Do or Die'. The entire Congress leadership was arrested within hours, and the movement became a mass struggle led by students, peasants, and workers across the country.",
        "competency": False,
    },
    {
        "id": "C10H003_MCQ_05",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "Mahatma Gandhi and the Nationalist Movement",
        "node": "HIST003",
        "question": "What was the main objective of the Gandhi-Irwin Pact signed in 1931?",
        "options": [
            "A - To grant complete independence to India",
            "B - To suspend the Civil Disobedience Movement and secure the release of political prisoners",
            "C - To form a coalition government between the Congress and the British",
            "D - To announce the Simon Commission recommendations",
        ],
        "answer": "B",
        "explanation": "The Gandhi-Irwin Pact (March 5, 1931) was signed between Mahatma Gandhi and Viceroy Lord Irwin. It agreed to: (1) suspend the Civil Disobedience Movement, (2) release all political prisoners not convicted of violence, (3) permit the peaceful production of salt by Indians near the sea coast, and (4) withdraw all ordinances and end prosecutions.",
        "competency": False,
    },
    {
        "id": "C10H003_MCQ_06",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Mahatma Gandhi and the Nationalist Movement",
        "node": "HIST003",
        "question": "Which movement did Mahatma Gandhi first organise at Champaran in Bihar?",
        "options": [
            "A - Non-Cooperation Movement",
            "B - Civil Disobedience Movement",
            "C - Champaran Satyagraha",
            "D - Quit India Movement",
        ],
        "answer": "C",
        "explanation": "The Champaran Satyagraha (1917) was Mahatma Gandhi's first Satyagraha movement in India. It was launched to protest against the oppressive Tinkathia system under which peasants in Champaran, Bihar, were forced by British planters to grow indigo on a portion of their land at unfairly low prices.",
        "competency": False,
    },
    {
        "id": "C10H003_SAQ_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Mahatma Gandhi and the Nationalist Movement",
        "node": "HIST003",
        "question": "What was the Rowlatt Act of 1919, and why was it opposed by Indians?",
        "options": [],
        "answer": "The Rowlatt Act (1919) allowed the British government to imprison any person without trial, suppress the press, and try cases without jury. It was opposed because it violated civil liberties, denied the right to a fair trial, and was seen as a betrayal of British promises of self-governance made during WWI.",
        "explanation": "The Act was based on the recommendations of the Rowlatt Commission. Indians called it the 'Black Act'. Mahatma Gandhi launched a nationwide Satyagraha against it. The Jallianwala Bagh massacre (April 13, 1919) occurred in the context of protests against the Rowlatt Act.",
        "competency": False,
        "tags": ["rowlatt_act", "civil_liberties"],
    },
    {
        "id": "C10H003_SAQ_02",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Mahatma Gandhi and the Nationalist Movement",
        "node": "HIST003",
        "question": "What is meant by 'Satyagraha'? Explain its main principles.",
        "options": [],
        "answer": "Satyagraha means 'truth-force' or 'soul-force' - the power of truth and non-violence. Main principles: (1) Truth (Satya) - adherence to truth in thought, word, and deed. (2) Non-violence (Ahimsa) - refusing to harm others, even enemies. (3) Self-suffering - willingly accepting punishment without retaliation. (4) Fearlessness - standing up to injustice without fear.",
        "explanation": "Gandhi developed Satyagraha during his time in South Africa. He believed it was the strongest weapon for the weak against oppression. It was not passive resistance but active resistance through non-violent means. Gandhi applied it in Champaran, Kheda, Ahmedabad, and later in the national movements.",
        "competency": False,
        "tags": ["satyagraha", "principles"],
    },
    {
        "id": "C10H003_COMP_01",
        "type": "case_study",
        "difficulty": "Hard",
        "topic": "Mahatma Gandhi and the Nationalist Movement",
        "node": "HIST003",
        "question": "Assess the significance of the Non-Cooperation Movement (1920-22) in the Indian freedom struggle. In your answer, consider: (a) the nature of mass participation, (b) the impact on British rule, and (c) its limitations.",
        "options": [],
        "answer": "Significance: (a) Mass participation - For the first time, the freedom movement reached peasants, workers, students, and women across India. (b) Impact - It shook British confidence, showed the power of non-violent mass action, and the Khilafat Movement united Hindus and Muslims. (c) Limitations - It was withdrawn after Chauri Chaura, showing Gandhi's emphasis on non-violence over political gains; many revolutionaries were disappointed; it did not achieve any concrete political goal.",
        "explanation": "This requires a multi-dimensional analysis: social (who participated), political (impact on British), and strategic (why it was withdrawn). The movement's real achievement was transforming the INC from an elite organisation into a mass party, and demonstrating that Indians could organise nationwide non-violent resistance.",
        "competency": True,
        "tags": ["case_study", "non_cooperation", "analysis"],
    },
    {
        "id": "C10H003_COMP_02",
        "type": "assertion_reasoning",
        "difficulty": "Hard",
        "topic": "Mahatma Gandhi and the Nationalist Movement",
        "node": "HIST003",
        "question": "Assertion (A): Mahatma Gandhi suspended the Non-Cooperation Movement after the Chauri Chaura incident. Reason (R): Gandhi believed that satyagraha could succeed only if it was strictly non-violent.",
        "options": [
            "A - Both A and R are true and R is the correct explanation of A",
            "B - Both A and R are true but R is NOT the correct explanation of A",
            "C - A is true but R is false",
            "D - A is false but R is true",
        ],
        "answer": "A",
        "explanation": "Both the assertion and reason are true, and the reason correctly explains the assertion. Gandhi suspended the Non-Cooperation Movement because violence had erupted at Chauri Chaura, which violated the fundamental principle of non-violence (ahimsa) on which satyagraha was based. He famously said, 'I must withdraw the movement because I have made a mistake.'",
        "competency": True,
        "tags": ["assertion_reasoning", "chauri_chaura", "non_violence"],
    },

    # ── NODE HIST004: Partition of India ────────────────────────────────
    {
        "id": "C10H004_MCQ_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Partition of India",
        "node": "HIST004",
        "question": "When did India achieve independence from British rule?",
        "options": [
            "A - August 15, 1946",
            "B - August 15, 1947",
            "C - January 26, 1950",
            "D - August 20, 1947",
        ],
        "answer": "B",
        "explanation": "India achieved independence on August 15, 1947. Pakistan was also created as a separate nation on the same day. The Indian Independence Act 1947, passed by the British Parliament on July 18, 1947, provided for the partition of India into two dominions. Lord Mountbatten served as the first Governor-General of independent India.",
        "competency": False,
    },
    {
        "id": "C10H004_MCQ_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Partition of India",
        "node": "HIST004",
        "question": "Who was the last Viceroy of India?",
        "options": [
            "A - Lord Wavell",
            "B - Lord Mountbatten",
            "C - Lord Linlithgow",
            "D - Lord Chelmsford",
        ],
        "answer": "B",
        "explanation": "Lord Louis Mountbatten was the last Viceroy of India, serving from March 1947 to August 1947. He was appointed by the British Labour government with a mandate to transfer power by June 1948. He advanced the date to August 15, 1947. After independence, he served briefly as the first Governor-General of the Dominion of India until June 1948.",
        "competency": False,
    },
    {
        "id": "C10H004_MCQ_03",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Partition of India",
        "node": "HIST004",
        "question": "Which of the following plans proposed the partition of India into Hindu and Muslim zones?",
        "options": [
            "A - The Cabinet Mission Plan (1946)",
            "B - The Mountbatten Plan (June 3 Plan)",
            "C - The Cripps Mission Proposal",
            "D - The Wavell Plan",
        ],
        "answer": "B",
        "explanation": "The Mountbatten Plan (also called the June 3 Plan) of June 3, 1947, accepted the idea of partition. It proposed that British India be divided into two dominions: India and Pakistan. Bengal and Punjab would be divided based on religious majority. The plan was accepted by the Indian National Congress, the Muslim League, and the Sikh community.",
        "competency": False,
    },
    {
        "id": "C10H004_MCQ_04",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "Partition of India",
        "node": "HIST004",
        "question": "Who was the first Prime Minister of Pakistan?",
        "options": [
            "A - Muhammad Ali Jinnah",
            "B - Liaquat Ali Khan",
            "C - Khawaja Nazimuddin",
            "D - Huseyn Shaheed Suhrawardy",
        ],
        "answer": "B",
        "explanation": "Liaquat Ali Khan was the first Prime Minister of Pakistan (1947-1951). Muhammad Ali Jinnah served as the Governor-General of Pakistan (like the British monarch - a ceremonial head of state). In contrast, in India, Jawaharlal Nehru was Prime Minister and Lord Mountbatten was Governor-General. Liaquat Ali Khan was assassinated in 1951.",
        "competency": False,
    },
    {
        "id": "C10H004_SAQ_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Partition of India",
        "node": "HIST004",
        "question": "What was the Mountbatten Plan? Mention any two of its main provisions.",
        "options": [],
        "answer": "The Mountbatten Plan (June 3, 1947) was the plan for the partition of India and transfer of power. Main provisions: (1) British India would be divided into two dominions - India and Pakistan. (2) Punjab and Bengal would be divided into separate provinces. (3) Both dominions would be given dominion status. (4) Princely states could accede to either dominion.",
        "explanation": "The plan was formulated after the failure of the Cabinet Mission Plan. The Indian Independence Act 1947 gave legal effect to the plan. It was accepted by the Congress (as a means to avoid further civil war) and by the Muslim League.",
        "competency": False,
        "tags": ["mountbatten_plan", "partition"],
    },
    {
        "id": "C10H004_COMP_01",
        "type": "case_study",
        "difficulty": "Hard",
        "topic": "Partition of India",
        "node": "HIST004",
        "question": "Analyse the consequences of the Partition of India. Discuss at least four major consequences including human suffering, demographic changes, and the creation of new administrative challenges.",
        "options": [],
        "answer": "Four major consequences: (1) Human suffering - an estimated 10-15 million people were displaced in the largest mass migration in history; communal violence killed 1-2 million people. (2) Demographic changes - Pakistan became a Muslim-majority state; India remained secular but with a large Muslim minority. (3) Administrative challenges - division of armed forces, civil services, treasury, railways, and assets. (4) The Kashmir problem - the accession of Jammu and Kashmir led to the first Indo-Pak war (1947-48) and the Kashmir issue persists.",
        "explanation": "This competency question requires synthesizing multiple dimensions of partition: the human tragedy (refugee crisis, communal riots), the administrative complexity (radcliffe line, division of assets), the geopolitical consequences (Kashmir, future wars), and the long-term impact on Indo-Pak relations.",
        "competency": True,
        "tags": ["case_study", "partition_effects", "analysis"],
    },

    # ── NODE CIV001: The Union Parliament ───────────────────────────────
    {
        "id": "C10C001_MCQ_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "The Union Parliament",
        "node": "CIV001",
        "question": "What is the maximum strength of the Lok Sabha (excluding the 2 Anglo-Indian members nominated by the President)?",
        "options": ["A - 525", "B - 545", "C - 552", " "D - 543"],
        "answer": "C",
        "explanation": "The maximum strength of the Lok Sabha is 552, as per Article 81 of the Constitution. This includes: (1) 530 members from the states, (2) 20 members from Union Territories, and (3) 2 members of the Anglo-Indian community nominated by the President. However, after the 104th Constitutional Amendment Act 2020, the provision for Anglo-Indian nomination was abolished. Currently, the Lok Sabha has 543 elected members.",
        "competency": False,
    },
    {
        "id": "C10C001_MCQ_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "The Union Parliament",
        "node": "CIV001",
        "question": "What is the minimum age required to become a member of the Lok Sabha?",
        "options": ["A - 21 years", "B - 25 years", "C - 30 years", "D - 35 years"],
        "answer": "B",
        "explanation": "The minimum age for membership of the Lok Sabha is 25 years (Article 84). For the Rajya Sabha, it is 30 years. For the office of President, it is 35 years. For the office of Vice-President, it is 35 years. A person must also be a citizen of India and be registered as a voter in some parliamentary constituency.",
        "competency": False,
    },
    {
        "id": "C10C001_MCQ_03",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "The Union Parliament",
        "node": "CIV001",
        "question": "Who is the ex-officio Chairman of the Rajya Sabha?",
        "options": [
            "A - The Prime Minister",
            "B - The President",
            "C - The Vice-President of India",
            "D - The Speaker of the Lok Sabha",
        ],
        "answer": "C",
        "explanation": "The Vice-President of India is the ex-officio Chairman of the Rajya Sabha (Article 64). When the Vice-President acts as President, the Deputy Chairman of the Rajya Sabha performs the duties of the Chairman. The Deputy Chairman is elected from among the members of the Rajya Sabha.",
        "competency": False,
    },
    {
        "id": "C10C001_MCQ_04",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "The Union Parliament",
        "node": "CIV001",
        "question": "The Speaker of the Lok Sabha is elected by:",
        "options": [
            "A - The President of India",
            "B - The Prime Minister",
            "C - The members of the Lok Sabha",
            "D - The members of both Houses of Parliament",
        ],
        "answer": "C",
        "explanation": "The Speaker of the Lok Sabha is elected by the members of the Lok Sabha from among themselves (Article 93). The Speaker presides over the meetings of the Lok Sabha, maintains discipline and decorum, decides on points of order, and does not vote (except in case of a tie, when the Speaker casts a 'casting vote'). The current Speaker is an important constitutional position.",
        "competency": False,
    },
    {
        "id": "C10C001_MCQ_05",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "The Union Parliament",
        "node": "CIV001",
        "question": "Which of the following is a Money Bill?",
        "options": [
            "A - The Constitution (Amendment) Bill",
            "B - The Appropriation Bill",
            "C - The Ordinary Bill",
            "D - The Bill to amend the IPC",
        ],
        "answer": "B",
        "explanation": "The Appropriation Bill is a Money Bill as it deals with the appropriation of money out of the Consolidated Fund of India. According to Article 110, a Money Bill can only be introduced in the Lok Sabha with the prior recommendation of the President. The Rajya Sabha can only make recommendations and must return it within 14 days. The Speaker's decision on whether a Bill is a Money Bill is final.",
        "competency": False,
    },
    {
        "id": "C10C001_SAQ_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "The Union Parliament",
        "node": "CIV001",
        "question": "List any three powers of the Lok Sabha that are not enjoyed by the Rajya Sabha.",
        "options": [],
        "answer": "(1) The Lok Sabha alone can introduce and pass Money Bills. (2) The Lok Sabha alone can pass a No-Confidence Motion against the Council of Ministers. (3) The Lok Sabha alone can vote on the demands for grants (budget). (4) The Rajya Sabha cannot reject or amend a Money Bill. (Any three)",
        "explanation": "The Lok Sabha is the more powerful House. Key exclusive powers: (1) Money Bills can only originate in and be passed by the Lok Sabha. (2) The Council of Ministers is collectively responsible to the Lok Sabha only. (3) The Speaker and Deputy Speaker are elected from the Lok Sabha. In case of disagreement between the two Houses on an ordinary Bill, a joint sitting is called, where the Lok Sabha's numerical superiority (545 vs 245) usually prevails.",
        "competency": False,
        "tags": ["lok_sabha", "powers"],
    },
    {
        "id": "C10C001_COMP_01",
        "type": "case_study",
        "difficulty": "Hard",
        "topic": "The Union Parliament",
        "node": "CIV001",
        "question": "Parliamentary democracy rests on the principle of collective responsibility of the executive to the legislature. Explain this principle and discuss how it operates in the Indian Parliament.",
        "options": [],
        "answer": "The principle of collective responsibility means the Council of Ministers is collectively responsible to the Lok Sabha. It operates as: (1) All ministers must agree on government policy publicly. (2) If a No-Confidence Motion is passed, the entire Council of Ministers must resign. (3) A minister who disagrees with Cabinet decisions must resign. (4) The Prime Minister leads the Council and is the chief spokesperson. (5) Individual ministers are also responsible for the work of their departments.",
        "explanation": "This competency question requires understanding the link between the executive and legislature. The principle ensures: government accountability (can be removed by Lok Sabha), policy coherence (Cabinet must speak with one voice), and parliamentary democracy (executive drawn from and answerable to the legislature). Article 75(3) states the Council of Ministers shall be collectively responsible to the Lok Sabha.",
        "competency": True,
        "tags": ["case_study", "parliamentary_democracy", "collective_responsibility"],
    },

    # ── NODE CIV002: The President and Vice-President ────────────────────
    {
        "id": "C10C002_MCQ_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "The President and Vice-President",
        "node": "CIV002",
        "question": "Who is the head of the Indian Republic?",
        "options": [
            "A - The Prime Minister",
            "B - The President",
            "C - The Chief Justice of India",
            "D - The Vice-President",
        ],
        "answer": "B",
        "explanation": "The President of India is the head of the Indian Republic (Article 52). India is a republic because the head of state is elected and not hereditary. The President is the first citizen of India and the Supreme Commander of the Indian Armed Forces. All executive powers of the Union are formally vested in the President.",
        "competency": False,
    },
    {
        "id": "C10C002_MCQ_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "The President and Vice-President",
        "node": "CIV002",
        "question": "The President of India is elected by which method?",
        "options": [
            "A - Direct election by the people",
            "B - Election by the members of Parliament only",
            "C - Election by an Electoral College consisting of elected members of both Houses of Parliament and elected members of Legislative Assemblies of States",
            "D - Election by the members of the Rajya Sabha",
        ],
        "answer": "C",
        "explanation": "The President is elected by an Electoral College (Article 54) consisting of: (1) All elected members of both Houses of Parliament (Lok Sabha and Rajya Sabha), and (2) Elected members of the Legislative Assemblies of all States and Union Territories (Delhi and Puducherry). Nominated members do not vote. The election is held by the system of proportional representation by means of a single transferable vote.",
        "competency": False,
    },
    {
        "id": "C10C002_MCQ_03",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "The President and Vice-President",
        "node": "CIV002",
        "question": "The Vice-President of India is elected by:",
        "options": [
            "A - Direct election by the people",
            "B - Members of both Houses of Parliament only",
            "C - An Electoral College similar to the President but consisting only of MPs",
            "D - The Lok Sabha only",
        ],
        "answer": "B",
        "explanation": "The Vice-President is elected by an Electoral College consisting of members of both Houses of Parliament (Lok Sabha and Rajya Sabha) - both elected and nominated members vote (Article 66). This differs from the Presidential election where only elected members of State Assemblies participate. The system is proportional representation by single transferable vote.",
        "competency": False,
    },
    {
        "id": "C10C002_MCQ_04",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "The President and Vice-President",
        "node": "CIV002",
        "question": "Under which article can the President of India be impeached?",
        "options": [
            "A - Article 61",
            "B - Article 356",
            "C - Article 352",
            "D - Article 368",
        ],
        "answer": "A",
        "explanation": "The President can be impeached for violation of the Constitution under Article 61. The process: (1) A notice of impeachment signed by at least one-fourth of Lok Sabha members. (2) The notice must be given 14 days in advance. (3) Both Houses must pass the resolution by a majority of total membership and by two-thirds of members present and voting. The Supreme Court inquires into the charges under Article 71.",
        "competency": False,
    },
    {
        "id": "C10C002_SAQ_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "The President and Vice-President",
        "node": "CIV002",
        "question": "List any five legislative powers of the President of India.",
        "options": [],
        "answer": "(1) Summon and prorogue sessions of Parliament. (2) Address the first session of Parliament after general elections. (3) Send messages to either House regarding Bills. (4) Nominate 12 members to Rajya Sabha (persons with special knowledge). (5) Can promulgate Ordinances when Parliament is not in session. (6) Dissolve the Lok Sabha. (Any five)",
        "explanation": "The President's legislative powers include: summoning/proroguing Parliament, addressing Parliament (including the special address after elections), nominating Anglo-Indians to Lok Sabha (before 104th Amendment) and experts to Rajya Sabha, promulgating Ordinances (valid for 6 weeks), and giving assent to Bills. The President can return a Bill (except Money Bills) for reconsideration, but must give assent if passed again.",
        "competency": False,
        "tags": ["president", "legislative_powers"],
    },

    # ── NODE CIV003: Prime Minister and Council of Ministers ────────────
    {
        "id": "C10C003_MCQ_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Prime Minister and Council of Ministers",
        "node": "CIV003",
        "question": "Who is the real executive head of the Union Government?",
        "options": [
            "A - The President",
            "B - The Prime Minister",
            "C - The Speaker of the Lok Sabha",
            "D - The Vice-President",
        ],
        "answer": "B",
        "explanation": "The Prime Minister is the real executive head of the Union Government. While the President is the nominal or constitutional head, all executive powers are exercised by the Council of Ministers headed by the Prime Minister (Article 74). The President acts on the aid and advice of the Council of Ministers.",
        "competency": False,
    },
    {
        "id": "C10C003_MCQ_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Prime Minister and Council of Ministers",
        "node": "CIV003",
        "question": "Who appoints the Prime Minister of India?",
        "options": [
            "A - The Lok Sabha",
            "B - The Electoral College",
            "C - The President of India",
            "D - The Chief Justice of India",
        ],
        "answer": "C",
        "explanation": "The President appoints the Prime Minister (Article 75). Convention: the leader of the majority party/coalition in the Lok Sabha is appointed as Prime Minister. If no party has a clear majority, the President has discretion to appoint the person most likely to command majority support. Other ministers are appointed by the President on the advice of the Prime Minister.",
        "competency": False,
    },
    {
        "id": "C10C003_MCQ_03",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Prime Minister and Council of Ministers",
        "node": "CIV003",
        "question": "What is the term of the Council of Ministers?",
        "options": [
            "A - 6 years",
            "B - 5 years",
            "C - During the pleasure of the President",
            "D - Co-terminus with the Lok Sabha (5 years or until dissolved)",
        ],
        "answer": "D",
        "explanation": "The Council of Ministers is collectively responsible to the Lok Sabha (Article 75). Its term is co-terminus with that of the Lok Sabha, i.e., 5 years from the date of its first meeting. However, the Council can be removed earlier by a No-Confidence Motion, or can resign and advise the President to dissolve the Lok Sabha.",
        "competency": False,
    },
    {
        "id": "C10C003_SAQ_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Prime Minister and Council of Ministers",
        "node": "CIV003",
        "question": "Mention any four functions of the Prime Minister.",
        "options": [],
        "answer": "(1) Leader of the Council of Ministers - forms the ministry, allocates portfolios, can ask a minister to resign. (2) Leader of the Lok Sabha - represents the government in Parliament. (3) Chief spokesperson of the government - formulates and communicates government policy. (4) Link between President and Council - conveys Council's advice to the President. (5) Chairman of NITI Aayog, ISRO, etc.",
        "explanation": "The Prime Minister is the most powerful political figure in India. Key functions include: forming the Council of Ministers (recommended to the President), allocating portfolios, presiding over Cabinet meetings, coordinating different ministries, representing India internationally, and being the principal policy-maker of the government.",
        "competency": False,
        "tags": ["prime_minister", "functions"],
    },

    # ── NODE CIV004: The Supreme Court ──────────────────────────────────
    {
        "id": "C10C004_MCQ_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "The Supreme Court",
        "node": "CIV004",
        "question": "When was the Supreme Court of India established?",
        "options": [
            "A - January 26, 1950",
            "B - August 15, 1947",
            "C - January 28, 1950",
            "D - November 26, 1949",
        ],
        "answer": "C",
        "explanation": "The Supreme Court of India was established on January 28, 1950, two days after the Constitution came into force on January 26, 1950. It replaced the Federal Court of India (established 1937) and the Judicial Committee of the Privy Council. The first Chief Justice of India was H.J. Kania.",
        "competency": False,
    },
    {
        "id": "C10C004_MCQ_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "The Supreme Court",
        "node": "CIV004",
        "question": "Who is the current Chief Justice of India (as per the constitutional scheme)?",
        "options": [
            "A - Appointed by the Prime Minister",
            "B - Appointed by the President after consultation with the Chief Justice and other judges",
            "C - Elected by the judges of the Supreme Court",
            "D - Appointed by the Lok Sabha",
        ],
        "answer": "B",
        "explanation": "The Chief Justice of India is appointed by the President of India (Article 124). As per the collegium system (established by Supreme Court judgments), the CJI is appointed after consultation with a collegium of senior Supreme Court judges. The process was modified by the 99th Amendment ( NJAC ) which was struck down by the Supreme Court in 2015.",
        "competency": False,
    },
    {
        "id": "C10C004_MCQ_03",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "The Supreme Court",
        "node": "CIV004",
        "question": "What is the maximum sanctioned strength of judges of the Supreme Court of India?",
        "options": ["A - 25", "B - 30", "C - 34", "D - 31"],
        "answer": "C",
        "explanation": "The maximum sanctioned strength of Supreme Court judges is 34, including the Chief Justice of India (as per the Supreme Court (Number of Judges) Act, amended most recently). This has been increased over time to manage the heavy caseload. As of recent years, the actual working strength has been close to this maximum.",
        "competency": False,
    },
    {
        "id": "C10C004_MCQ_04",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "The Supreme Court",
        "node": "CIV004",
        "question": "Under which writ can the Supreme Court direct a public authority to perform a duty it is legally obligated to perform?",
        "options": [
            "A - Habeas Corpus",
            "B - Mandamus",
            "C - Certiorari",
            "D - Quo Warranto",
        ],
        "answer": "B",
        "explanation": "Mandamus (meaning 'we command') is a writ issued by the Supreme Court or High Court to direct a public authority, inferior court, or government body to perform a duty it is legally obligated to perform. It cannot be issued against the President or Governors, or against private individuals for purely private matters. Other writs: Habeas Corpus (produce the body), Certiorari (quash an order), Prohibition (stop an inferior court), Quo Warranto (by what authority).",
        "competency": False,
    },
    {
        "id": "C10C004_MCQ_05",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "The Supreme Court",
        "node": "CIV004",
        "question": "Which type of jurisdiction allows the Supreme Court to decide disputes between the Government of India and one or more States?",
        "options": [
            "A - Original Jurisdiction",
            "B - Appellate Jurisdiction",
            "C - Advisory Jurisdiction",
            "D - Writ Jurisdiction",
        ],
        "answer": "A",
        "explanation": "The Supreme Court has Original Jurisdiction in disputes between: (1) the Government of India and one or more States, (2) the Government of India and any State(s) on one side and one or more other States on the other, (3) two or more States. This jurisdiction is exclusive and cannot be exercised by any other court. The Supreme Court also has Original Jurisdiction in enforcement of Fundamental Rights.",
        "competency": False,
    },
    {
        "id": "C10C004_SAQ_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "The Supreme Court",
        "node": "CIV004",
        "question": "List any three qualifications required to be appointed as a judge of the Supreme Court of India.",
        "options": [],
        "answer": "(1) Must be a citizen of India. (2) Must have been a judge of a High Court for at least 5 years, OR (3) Must have been an advocate of a High Court for at least 10 years, OR (4) Must be, in the opinion of the President, a distinguished jurist. (Any three of these conditions, noting only one path needs to be fulfilled)",
        "explanation": "Under Article 124(3), a person is qualified for appointment as a judge of the Supreme Court if they meet ANY ONE of these: (a) a judge of one High Court for at least 5 years, (b) an advocate of a High Court for at least 10 years, or (c) a distinguished jurist in the President's opinion. There is no minimum or maximum age limit specified in the Constitution.",
        "competency": False,
        "tags": ["supreme_court", "judges", "qualifications"],
    },

    # ── NODE CIV005: Fundamental Rights and Directive Principles ────────
    {
        "id": "C10C005_MCQ_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Fundamental Rights and Directive Principles",
        "node": "CIV005",
        "question": "How many Fundamental Rights were originally granted by the Indian Constitution?",
        "options": ["A - Five", "B - Six", "C - Seven", "D - Eight"],
        "answer": "C",
        "explanation": "Originally, the Constitution provided for seven Fundamental Rights: (1) Right to Equality (Articles 14-18), (2) Right to Freedom (Articles 19-22), (3) Right against Exploitation (Articles 23-24), (4) Right to Freedom of Religion (Articles 25-28), (5) Cultural and Educational Rights (Articles 29-30), (6) Right to Property (Article 31), and (7) Right to Constitutional Remedies (Article 32). The Right to Property was removed from Fundamental Rights by the 44th Amendment and made a legal right under Article 300A.",
        "competency": False,
    },
    {
        "id": "C10C005_MCQ_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Fundamental Rights and Directive Principles",
        "node": "CIV005",
        "question": "Which Fundamental Right was removed from the list of Fundamental Rights by the 44th Amendment Act, 1978?",
        "options": [
            "A - Right to Equality",
            "B - Right to Freedom of Religion",
            "C - Right to Property",
            "D - Right against Exploitation",
        ],
        "answer": "C",
        "explanation": "The 44th Amendment Act, 1978 removed the Right to Property from the list of Fundamental Rights (Article 31 was deleted). It was made a legal right under Article 300A. The stated reason was that the Right to Property was being misused to challenge land reform and welfare legislation. It can still be enforced by a court but is no longer a Fundamental Right.",
        "competency": False,
    },
    {
        "id": "C10C005_MCQ_03",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Fundamental Rights and Directive Principles",
        "node": "CIV005",
        "question": "Which article of the Constitution is known as the 'Heart and Soul' of the Constitution?",
        "options": [
            "A - Article 14",
            "B - Article 19",
            "C - Article 32",
            "D - Article 21",
        ],
        "answer": "C",
        "explanation": "Article 32 is known as the 'Heart and Soul' of the Constitution. Dr. B.R. Ambedkar called it so because without the Right to Constitutional Remedies, all other Fundamental Rights would be meaningless. Article 32 empowers the Supreme Court to issue writs (Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto) for the enforcement of Fundamental Rights.",
        "competency": False,
    },
    {
        "id": "C10C005_MCQ_04",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Fundamental Rights and Directive Principles",
        "node": "CIV005",
        "question": "The Directive Principles of State Policy are:",
        "options": [
            "A - Justiciable and enforceable by courts",
            "B - Non-justiciable and not enforceable by courts",
            "C - Applicable only to the Central Government",
            "D - Part of the Fundamental Rights",
        ],
        "answer": "B",
        "explanation": "The Directive Principles of State Policy (Part IV, Articles 36-51) are non-justiciable, meaning they cannot be enforced by any court. However, they are fundamental in the governance of the country and it is the duty of the State to apply these principles in making laws. Some Directive Principles have been given primacy over Fundamental Rights by certain amendments.",
        "competency": False,
    },
    {
        "id": "C10C005_MCQ_05",
        "type": "mcq",
        "difficulty": "Hard",
        "topic": "Fundamental Rights and Directive Principles",
        "node": "CIV005",
        "question": "Which Fundamental Right allows Indian citizens to move freely throughout the territory of India?",
        "options": [
            "A - Right to Equality",
            "B - Right to Freedom (Article 19(d))",
            "C - Right to Life and Personal Liberty",
            "D - Right to Education",
        ],
        "answer": "B",
        "explanation": "Article 19 of the Constitution guarantees six freedoms to all citizens: (a) freedom of speech and expression, (b) freedom of assembly, (c) freedom of association, (d) freedom of movement throughout India, (e) freedom of residence and settlement, and (f) freedom of profession. These rights are subject to reasonable restrictions by the State in the interest of public order, security, etc.",
        "competency": False,
    },
    {
        "id": "C10C005_SAQ_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Fundamental Rights and Directive Principles",
        "node": "CIV005",
        "question": "State any four differences between Fundamental Rights and Directive Principles.",
        "options": [],
        "answer": "(1) Justiciability: Fundamental Rights are justiciable and enforceable by courts; Directive Principles are non-justiciable. (2) Nature: Fundamental Rights are negative restraints on the State; Directive Principles are positive directions to the State. (3) Purpose: Fundamental Rights protect individual liberty; Directive Principles aim at social and economic welfare. (4) Amendment: Fundamental Rights can be amended by special majority; Directive Principles can also be amended similarly but are considered fundamental in governance.",
        "explanation": "Despite differences, both are complementary. Fundamental Rights ensure political democracy while Directive Principles aim at social and economic democracy. The Supreme Court has held that there is no conflict between them and both should be balanced. The 42nd Amendment added Article 31C to give precedence to certain Directive Principles over Fundamental Rights.",
        "competency": False,
        "tags": ["fundamental_rights", "directive_principles", "comparison"],
    },
    {
        "id": "C10C005_COMP_01",
        "type": "case_study",
        "difficulty": "Hard",
        "topic": "Fundamental Rights and Directive Principles",
        "node": "CIV005",
        "question": "The Constitution of India aims to balance individual rights with social welfare. Discuss this balance by referring to Article 19 (freedom of speech) and Article 21 (right to life), and how reasonable restrictions and the expanded interpretation of Article 21 by the Supreme Court reflect this balance.",
        "options": [],
        "answer": "Article 19 guarantees freedoms (including speech) but with reasonable restrictions: (1) security of the state, (2) friendly relations with foreign states, (3) public order, (4) decency and morality, (5) contempt of court, (6) defamation, (7) incitement to offence. Article 21 originally said 'No person shall be deprived of his life or personal liberty except according to procedure established by law.' The Supreme Court in Maneka Gandhi v. Union of India (1978) expanded it to mean 'fair, just, and reasonable procedure', adding rights to live with dignity, clean environment, education, privacy, etc.",
        "explanation": "This case study requires: (1) explaining the specific provisions, (2) showing how judicial interpretation transformed Article 21 into a source of unenumerated rights (right to clean air, right to shelter, right to health, right to privacy as in K.S. Puttaswamy case 2017), (3) demonstrating how these expansions balance individual liberty with collective welfare.",
        "competency": True,
        "tags": ["case_study", "article_21", "judicial_interpretation"],
    },

    # ── NODE CIV006: Local Self-Government ───────────────────────────────
    {
        "id": "C10C006_MCQ_01",
        "type": "mcq",
        "difficulty": "Easy",
        "topic": "Local Self-Government",
        "node": "CIV006",
        "question": "The 73rd Constitutional Amendment Act, 1992 is related to:",
        "options": [
            "A - Urban Local Bodies",
            "B - Panchayati Raj Institutions",
            "C - The Election Commission",
            "D - Official Languages",
        ],
        "answer": "B",
        "explanation": "The 73rd Amendment Act, 1992 added Part IX to the Constitution (Articles 243-243O) and created a three-tier Panchayati Raj system: (1) Gram Panchayat (village level), (2) Panchayat Samiti (block/intermediate level), (3) Zila Parishad (district level). It mandated regular elections, reservation for SCs, STs, and women (one-third seats), and devolution of powers.",
        "competency": False,
    },
    {
        "id": "C10C006_MCQ_02",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Local Self-Government",
        "node": "CIV006",
        "question": "The 74th Constitutional Amendment Act, 1992 is related to:",
        "options": [
            "A - Panchayati Raj Institutions",
            "B - Urban Local Bodies (Municipalities)",
            "C - The Union Public Service Commission",
            "D - Cooperative Societies",
        ],
        "answer": "B",
        "explanation": "The 74th Amendment Act, 1992 added Part IXA to the Constitution (Articles 243P-243ZG) for Urban Local Bodies. It provided for: (1) Municipal Corporations (for large cities), (2) Municipal Councils (for smaller towns), and (3) Nagar Panchayats (for areas in transition from rural to urban). It mandated reservation for women, SCs, and STs, and regular elections.",
        "competency": False,
    },
    {
        "id": "C10C006_MCQ_03",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Local Self-Government",
        "node": "CIV006",
        "question": "What is the tenure of a Gram Panchayat?",
        "options": [
            "A - 3 years",
            "B - 4 years",
            "C - 5 years",
            "D - 6 years",
        ],
        "answer": "C",
        "explanation": "The tenure of a Gram Panchayat is 5 years from the date of its first meeting (Article 243E). Elections must be completed before the expiry of this term. If dissolved prematurely, fresh elections must be held within 6 months. The State Election Commission conducts these elections. This is similar to the tenure of the Lok Sabha and State Assemblies.",
        "competency": False,
    },
    {
        "id": "C10C006_MCQ_04",
        "type": "mcq",
        "difficulty": "Medium",
        "topic": "Local Self-Government",
        "node": "CIV006",
        "question": "What proportion of seats in Panchayats are reserved for women under the 73rd Amendment?",
        "options": [
            "A - One-fourth (25%)",
            "B - One-third (33.33%)",
            "C - One-half (50%)",
            "D - 15%",
        ],
        "answer": "B",
        "explanation": "The 73rd Amendment reserves not less than one-third (33.33%) of the total seats for women in Panchayats at all three levels (Article 243D). This reservation is also applied to seats reserved for SCs and STs. Several states (including Bihar, Rajasthan, Madhya Pradesh, Himachal Pradesh, and Uttarakhand) have increased this to 50% reservation for women.",
        "competency": False,
    },
    {
        "id": "C10C006_SAQ_01",
        "type": "short_answer",
        "difficulty": "Medium",
        "topic": "Local Self-Government",
        "node": "CIV006",
        "question": "What is the three-tier system of Panchayati Raj? Explain each tier briefly.",
        "options": [],
        "answer": "The three-tier system: (1) Gram Panchayat - the lowest tier at village level; elected body headed by Sarpanch; manages local infrastructure, sanitation, and welfare schemes. (2) Panchayat Samiti - intermediate tier at block/tehsil level; coordinates between Gram Panchayats and Zila Parishad. (3) Zila Parishad - the highest tier at district level; chaired by the District Collector or President; supervises and coordinates the work of Panchayat Samitis.",
        "explanation": "The three-tier system was recommended by the Balwant Rai Mehta Committee (1957) and constitutionalised by the 73rd Amendment (1992). The Gram Sabha (all adult voters of the village) is the foundation, as it approves plans and monitors the Gram Panchayat's work.",
        "competency": False,
        "tags": ["panchayati_raj", "three_tier"],
    },
    {
        "id": "C10C006_COMP_01",
        "type": "case_study",
        "difficulty": "Hard",
        "topic": "Local Self-Government",
        "node": "CIV006",
        "question": "Panchayati Raj Institutions are often described as 'institutions of self-government'. Evaluate the extent to which they have fulfilled this mandate since the 73rd Amendment. Consider: (a) their constitutional status, (b) the reservation policy, and (c) the challenges they face in practice.",
        "options": [],
        "answer": "Evaluation: (a) Constitutional status - The 73rd Amendment gave PRIs constitutional status, making elections mandatory and creating State Finance Commissions. (b) Reservation policy - One-third reservation for women has empowered over 10 million women as elected representatives (India has one of the highest numbers of women in elected local bodies globally). (c) Challenges - Limited devolution of actual powers and finances, dependence on state governments, dominant caste influence despite reservations, and lack of capacity building for elected representatives.",
        "explanation": "This competency question requires a balanced assessment. Positives: constitutional status, political empowerment of women and marginalized groups, improved local governance and accountability. Negatives: fiscal dependence on higher levels of government, limited functional autonomy, and implementation gaps across states. The devolution of powers varies significantly between states.",
        "competency": True,
        "tags": ["case_study", "panchayati_raj", "evaluation"],
    },

    # ── Additional competency-based questions ────────────────────────────
    {
        "id": "C10H001_COMP_02",
        "type": "assertion_reasoning",
        "difficulty": "Medium",
        "topic": "The First War of Independence, 1857",
        "node": "HIST001",
        "question": "Assertion (A): The First War of Independence, 1857 was not merely a sepoy mutiny. Reason (R): It involved participation from different sections of Indian society including peasants, zamindars, and rulers.",
        "options": [
            "A - Both A and R are true and R is the correct explanation of A",
            "B - Both A and R are true but R is NOT the correct explanation of A",
            "C - A is true but R is false",
            "D - A is false but R is true",
        ],
        "answer": "A",
        "explanation": "Both assertion and reason are true, and the reason correctly explains the assertion. Historians like R.C. Majumdar, S.N. Sen, and others have debated the nature of the revolt. The participation of civilians, zamindars (like Rani Lakshmibai), and rulers (like Begum Hazrat Mahal) shows it was more than a military mutiny - it had elements of a national uprising against British rule.",
        "competency": True,
        "tags": ["assertion_reasoning", "nature_of_revolt"],
    },
    {
        "id": "C10H003_COMP_03",
        "type": "data_interpretation",
        "difficulty": "Hard",
        "topic": "Mahatma Gandhi and the Nationalist Movement",
        "node": "HIST003",
        "question": "The following table shows membership and contributions to the Indian National Congress from 1920 to 1940. Analyse the data and identify the movement that caused the most significant increase in mass participation.",
        "options": [],
        "answer": "The data (simulated): Membership went from about 50,000 (1920) to about 400,000 (1930) to about 1.2 million (1940). The Civil Disobedience Movement (1930-34) marked the most significant increase in mass participation, with membership rising from ~100,000 to ~400,000. This reflected the widespread appeal of the Salt Satyagraha and the involvement of diverse social groups including peasants, women, and students.",
        "explanation": "This data interpretation question tests the ability to: (1) read and interpret numerical data, (2) correlate it with historical events (Non-Cooperation, Civil Disobedience, Quit India movements), (3) explain why the Civil Disobedience Movement saw the highest increase (simpler participation through salt satyagraha, broader geographic reach, involvement of women and students).",
        "competency": True,
        "tags": ["data_interpretation", "mass_participation", "movements"],
    },
    {
        "id": "C10C001_COMP_02",
        "type": "assertion_reasoning",
        "difficulty": "Medium",
        "topic": "The Union Parliament",
        "node": "CIV001",
        "question": "Assertion (A): The Rajya Sabha cannot be dissolved. Reason (R): Members of the Rajya Sabha are elected for a term of 6 years and one-third of the members retire every two years.",
        "options": [
            "A - Both A and R are true and R is the correct explanation of A",
            "B - Both A and R are true but R is NOT the correct explanation of A",
            "C - A is true but R is false",
            "D - A is false but R is true",
        ],
        "answer": "A",
        "explanation": "Both assertion and reason are true, and the reason correctly explains the assertion. The Rajya Sabha is a permanent House that cannot be dissolved. It has 245 members (233 elected + 12 nominated). One-third of members retire every two years, so it is a continuously functioning body. This contrasts with the Lok Sabha, which has a 5-year term and can be dissolved.",
        "competency": True,
        "tags": ["assertion_reasoning", "rajya_sabha", "parliament"],
    },
    {
        "id": "C10C005_COMP_02",
        "type": "case_study",
        "difficulty": "Hard",
        "topic": "Fundamental Rights and Directive Principles",
        "node": "CIV005",
        "question": "The Right to Information Act, 2005 is considered an extension of the Fundamental Right to Freedom of Speech and Expression under Article 19. Explain this connection and discuss how RTI strengthens democratic governance in India.",
        "options": [],
        "answer": "Article 19(1)(a) guarantees freedom of speech and expression, which includes the right to know and seek information. The RTI Act 2005 operationalises this by: (1) allowing citizens to request information from public authorities, (2) requiring public authorities to disclose information proactively, (3) establishing Information Commissions at central and state levels. RTI strengthens democracy by: promoting transparency and accountability, reducing corruption, empowering citizens to participate in governance, and enabling investigative journalism.",
        "explanation": "This competency question connects the constitutional provision (Article 19) with a modern law (RTI 2005). The Supreme Court has repeatedly held that the right to information is inherent in Article 19(1)(a). The RTI Act has been used effectively by activists (like Aruna Roy and Shehla Masood) to expose corruption and demand accountability from public officials.",
        "competency": True,
        "tags": ["case_study", "rti", "article_19", "governance"],
    },
    {
        "id": "C10H002_COMP_02",
        "type": "data_interpretation",
        "difficulty": "Medium",
        "topic": "Rise of Nationalism in India",
        "node": "HIST002",
        "question": "Given the chronological timeline: 1885 - INC founded, 1905 - Partition of Bengal, 1906 - Muslim League founded, 1916 - Lucknow Pact, 1919 - Jallianwala Bagh, 1920 - Non-Cooperation Movement. Arrange these events and explain the relationship between the Partition of Bengal and the growth of national consciousness.",
        "options": [],
        "answer": "Chronological order: 1885, 1905, 1906, 1916, 1919, 1920. The Partition of Bengal (1905) significantly boosted national consciousness because: (1) it demonstrated British divide-and-rule tactics, uniting Hindus and Muslims in protest; (2) it led to the Swadeshi Movement, the first mass nationalist movement; (3) it created a new generation of nationalist leaders; (4) it exposed the weakness of moderate methods, leading to the rise of extremism in the INC.",
        "explanation": "This data interpretation/analysis question tests both sequencing skills and historical analysis. The Partition was annulled in 1911, but the Swadeshi Movement it triggered permanently changed Indian politics by: bringing Muslims and Hindus together in the anti-partition agitation, popularising indigenous goods and khadi, and demonstrating that mass mobilisation was possible.",
        "competency": True,
        "tags": ["data_interpretation", "timeline", "swadeshi"],
    },
]


# ======================================================================
# SOLVER ENGINE
# ======================================================================

class HistoryCivicsSolver:
    """
    Deterministic solver for CISCE Class 10 History & Civics.
    """

    def __init__(self):
        self.questions = _QUESTION_BANK
        self.topic_index = self._build_index()

    def _build_index(self) -> Dict[str, List[Dict[str, Any]]]:
        idx: Dict[str, List[Dict[str, Any]]] = {}
        for q in self.questions:
            node = q["node"]
            idx.setdefault(node, []).append(q)
        return idx

    def get_topics(self) -> List[str]:
        topics = set()
        for q in self.questions:
            topics.add(q["topic"])
        return sorted(topics)

    def get_nodes(self) -> List[str]:
        return sorted(self.topic_index.keys())

    def solve(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Solve a specific question or browse the question bank.

        params:
          - mode: "solve" | "list" | "topic"
          - question_id: str (for solve mode)
          - topic: str (for topic/list mode)
          - seed: int (optional, for reproducible randomisation)
        """
        mode = params.get("mode", "list")
        seed = params.get("seed", None)

        if mode == "list":
            return self._list_questions(params.get("topic"), seed)
        elif mode == "solve":
            return self._solve_question(params.get("question_id"))
        elif mode == "topic":
            return self._list_by_topic(params.get("topic"))
        elif mode == "verify":
            return self._verify_answer(params.get("question_id"), params.get("user_answer", ""))
        else:
            return {"error": f"Unknown mode: {mode}"}

    def _list_questions(self, topic_filter: Optional[str], seed: Optional[int]) -> Dict[str, Any]:
        items = self.questions
        if topic_filter:
            items = [q for q in items if q["topic"] == topic_filter]

        if seed is not None:
            rng = random.Random(seed)
            rng.shuffle(items)

        result = []
        for q in items:
            entry = {
                "id": q["id"],
                "type": q["type"],
                "difficulty": q["difficulty"],
                "topic": q["topic"],
                "question": q["question"],
            }
            if q.get("options"):
                entry["options"] = q["options"]
            result.append(entry)
        return {"total": len(result), "questions": result}

    def _list_by_topic(self, topic: str) -> Dict[str, Any]:
        if not topic:
            return {"error": "Topic parameter is required", "available_topics": self.get_topics()}
        return self._list_questions(topic, None)

    def _solve_question(self, question_id: str) -> Dict[str, Any]:
        for q in self.questions:
            if q["id"] == question_id:
                steps = self._generate_steps(q)
                answer = q["answer"]
                explanation = q["explanation"]
                verification = self._verify(q)
                return {
                    "question_id": q["id"],
                    "topic": q["topic"],
                    "type": q["type"],
                    "question": q["question"],
                    "difficulty": q["difficulty"],
                    "competency_based": q.get("competency", False),
                    "steps": steps,
                    "answer": answer,
                    "explanation": explanation,
                    "verification": verification,
                    "success": True,
                }
        return {"error": f"Question '{question_id}' not found", "available_ids": [q["id"] for q in self.questions]}

    def _generate_steps(self, q: Dict[str, Any]) -> List[str]:
        steps = []
        steps.append(f"Step 1: Read and understand the question about '{q['topic']}'.")
        steps.append(f"Step 2: Identify the relevant facts, dates, events, or constitutional provisions from the topic '{q['node']}'.")

        if q["type"] == "mcq":
            steps.append(f"Step 3: Evaluate each option:")
            for i, opt in enumerate(q["options"]):
                steps.append(f"   Option {opt.split(' - ')[0]}: '{opt.split(' - ', 1)[1] if ' - ' in opt else opt}'")
            steps.append("Step 4: Eliminate incorrect options based on known facts.")
        elif q["type"] == "short_answer":
            steps.append("Step 3: Recall the key points asked in the question.")
            steps.append("Step 4: Formulate a concise, factual answer.")
        elif q["type"] in ("case_study", "assertion_reasoning", "data_interpretation"):
            steps.append("Step 3: Analyse the given information/data.")
            steps.append("Step 4: Apply relevant historical or constitutional knowledge.")
            steps.append("Step 5: Formulate a reasoned, well-structured answer.")
            if q["type"] == "assertion_reasoning":
                steps.append("Step 6: Evaluate both assertion and reason independently, then check if reason explains assertion.")

        steps.append(f"Step {len(steps) + 1}: Verify the answer against established facts.")
        return steps

    def _verify(self, q: Dict[str, Any]) -> str:
        qid = q["id"]
        answer = q["answer"]
        explanation = q["explanation"]

        if q["type"] == "mcq":
            correct_opt = q["options"][ord(answer) - ord("A")]
            correct_text = correct_opt.split(" - ", 1)[1] if " - " in correct_opt else correct_opt
            return (
                f"VERIFICATION: The correct answer is {answer}. "
                f"The option states: '{correct_text}'. "
                f"{explanation}"
            )
        elif q["type"] == "short_answer":
            return (
                f"VERIFICATION: The expected answer is: '{answer}'. "
                f"{explanation} "
                f"Key facts to check: ensure all points are accurate and relevant to the question."
            )
        else:
            return (
                f"VERIFICATION: Competency-based answer: '{answer}'. "
                f"{explanation} "
                f"Assessment is based on quality of reasoning, use of evidence, and coherence."
            )

    def _verify_answer(self, question_id: str, user_answer: str) -> Dict[str, Any]:
        for q in self.questions:
            if q["id"] == question_id:
                is_correct = verify_answer(user_answer, q["answer"])
                explanation = q["explanation"]
                if not is_correct:
                    explanation += f" The correct answer is: {q['answer']}"
                return {
                    "question_id": question_id,
                    "user_answer": user_answer,
                    "correct_answer": q["answer"],
                    "is_correct": is_correct,
                    "explanation": explanation,
                    "success": True,
                }
        return {"error": f"Question '{question_id}' not found"}

    def generate_question(self, node: str, difficulty: str = "Medium", competency: Optional[bool] = None) -> Dict[str, Any]:
        """
        Deterministically select a question matching the given node and difficulty.
        """
        pool = self.topic_index.get(node, [])
        filtered = [q for q in pool if q["difficulty"] == difficulty]
        if competency is not None:
            filtered = [q for q in filtered if q.get("competency", False) == competency]
        if not filtered:
            filtered = pool
        if not filtered:
            return {"error": f"No questions found for node '{node}'"}

        seed_val = make_seed(node, difficulty, competency, len(filtered))
        idx = seed_val % len(filtered)
        selected = filtered[idx]
        return {
            "id": selected["id"],
            "type": selected["type"],
            "difficulty": selected["difficulty"],
            "topic": selected["topic"],
            "question": selected["question"],
            "options": selected.get("options", []),
            "answer": selected["answer"],
            "competency_based": selected.get("competency", False),
            "seed_used": seed_val,
        }

    def get_competency_questions(self) -> List[Dict[str, Any]]:
        """Return all competency-based questions."""
        return [q for q in self.questions if q.get("competency", False)]

    def get_standard_questions(self) -> List[Dict[str, Any]]:
        """Return all standard (non-competency) questions."""
        return [q for q in self.questions if not q.get("competency", False)]

    def generate_mixed_quiz(self, count: int = 10, seed: Optional[int] = None) -> Dict[str, Any]:
        """
        Generate a mixed quiz with approximately 50% competency and 50% standard questions.
        """
        rng = random.Random(seed)
        comp = self.get_competency_questions()
        std = self.get_standard_questions()

        comp_count = min(count // 2, len(comp))
        std_count = min(count - comp_count, len(std))

        comp_selection = rng.sample(comp, comp_count) if comp_count > 0 else []
        std_selection = rng.sample(std, std_count) if std_count > 0 else []

        quiz = comp_selection + std_selection
        rng.shuffle(quiz)

        questions_out = []
        for q in quiz:
            questions_out.append({
                "id": q["id"],
                "type": q["type"],
                "topic": q["topic"],
                "question": q["question"],
                "options": q.get("options", []),
                "competency_based": q.get("competency", False),
            })

        answer_key = {q["id"]: q["answer"] for q in quiz}
        return {
            "quiz_id": hashlib.md5(str(seed).encode()).hexdigest()[:8] if seed else "manual",
            "total_questions": len(quiz),
            "competency_questions": comp_count,
            "standard_questions": std_count,
            "questions": questions_out,
            "answer_key": answer_key,
        }


# ======================================================================
# MAIN DEMONSTRATION
# ======================================================================

def main():
    print("=" * 70)
    print("CISCE Class 10 History & Civics - Deterministic Solver")
    print("=" * 70)

    solver = HistoryCivicsSolver()

    # --- Demo 1: List all topics ---
    print("\n--- DEMO 1: Available Topics ---")
    topics = solver.get_topics()
    for t in topics:
        print(f"  * {t}")

    # --- Demo 2: List questions by topic ---
    print("\n--- DEMO 2: Questions on 'The First War of Independence, 1857' ---")
    result = solver.solve({"mode": "topic", "topic": "The First War of Independence, 1857"})
    if "questions" in result:
        for q in result["questions"][:3]:
            print(f"  [{q['id']}] [{q['type']}] {q['question'][:80]}...")

    # --- Demo 3: Solve a specific MCQ ---
    print("\n--- DEMO 3: Solve an MCQ ---")
    result = solver.solve({"mode": "solve", "question_id": "C10H001_MCQ_01"})
    print(f"Question : {result['question']}")
    print(f"Topic    : {result['topic']}")
    print(f"Type     : {result['type']}")
    print(f"Steps:")
    for step in result['steps']:
        print(f"  {step}")
    print(f"Answer   : {result['answer']}")
    print(f"Verification: {result['verification'][:200]}...")

    # --- Demo 4: Solve a competency-based case study ---
    print("\n--- DEMO 4: Solve a Competency-Based Case Study ---")
    result = solver.solve({"mode": "solve", "question_id": "C10H001_COMP_01"})
    print(f"Question : {result['question'][:100]}...")
    print(f"Topic    : {result['topic']}")
    print(f"Competency: {result['competency_based']}")
    print(f"Steps:")
    for step in result['steps']:
        print(f"  {step}")
    print(f"Answer   : {result['answer'][:200]}...")
    print(f"Verification: {result['verification'][:200]}...")

    # --- Demo 5: Solve a Civics MCQ ---
    print("\n--- DEMO 5: Solve a Civics Question ---")
    result = solver.solve({"mode": "solve", "question_id": "C10C001_MCQ_01"})
    print(f"Question : {result['question']}")
    print(f"Topic    : {result['topic']}")
    print(f"Answer   : {result['answer']}")
    print(f"Verification: {result['verification'][:200]}...")

    # --- Demo 6: Verify user answer ---
    print("\n--- DEMO 6: Verify a User Answer ---")
    result = solver.solve({"mode": "verify", "question_id": "C10H002_MCQ_02", "user_answer": "C"})
    print(f"Question       : {result['question']}")
    print(f"Your Answer    : {result['user_answer']}")
    print(f"Correct Answer : {result['correct_answer']}")
    print(f"Is Correct     : {result['is_correct']}")
    print(f"Explanation    : {result['explanation'][:200]}...")

    # --- Demo 7: Generate a mixed quiz ---
    print("\n--- DEMO 7: Generate a Mixed Quiz (seed=42, 6 questions) ---")
    quiz = solver.generate_mixed_quiz(count=6, seed=42)
    print(f"Quiz ID       : {quiz['quiz_id']}")
    print(f"Total Qs      : {quiz['total_questions']}")
    print(f"Competency Qs : {quiz['competency_questions']}")
    print(f"Standard Qs   : {quiz['standard_questions']}")
    for i, q in enumerate(quiz["questions"], 1):
        marker = "[COMPETENCY]" if q["competency_based"] else "[STANDARD]"
        print(f"\n  Q{i} {marker} [{q['topic']}]")
        print(f"     {q['question'][:90]}...")

    # --- Demo 8: Generate a topic-specific question ---
    print("\n--- DEMO 8: Generate a Question from a Specific Node ---")
    gen = solver.generate_question("CIV001", "Medium")
    print(f"Generated ID    : {gen.get('id', gen.get('error', 'N/A'))}")
    print(f"Topic           : {gen.get('topic', 'N/A')}")
    print(f"Question        : {gen.get('question', 'N/A')[:100]}...")
    print(f"Competency      : {gen.get('competency_based', 'N/A')}")
    print(f"Seed Used       : {gen.get('seed_used', 'N/A')}")

    # --- Demo 9: Statistics ---
    print("\n--- DEMO 9: Question Bank Statistics ---")
    comp_qs = solver.get_competency_questions()
    std_qs = solver.get_standard_questions()
    print(f"Total Questions      : {len(solver.questions)}")
    print(f"Standard Questions   : {len(std_qs)} ({100*len(std_qs)/len(solver.questions):.1f}%)")
    print(f"Competency Questions : {len(comp_qs)} ({100*len(comp_qs)/len(solver.questions):.1f}%)")
    print(f"Topics Covered       : {len(topics)}")
    print(f"Nodes Covered        : {len(solver.get_nodes())}")

    # --- Demo 10: Solve a short answer question ---
    print("\n--- DEMO 10: Solve a Short Answer Question ---")
    result = solver.solve({"mode": "solve", "question_id": "C10H001_SAQ_01"})
    print(f"Question : {result['question']}")
    print(f"Topic    : {result['topic']}")
    print(f"Steps:")
    for step in result['steps']:
        print(f"  {step}")
    print(f"Answer   : {result['answer']}")
    print(f"Verification: {result['verification'][:200]}...")

    print("\n" + "=" * 70)
    print("Demo complete. All modules functioning correctly.")
    print("=" * 70)


if __name__ == "__main__":
    main()