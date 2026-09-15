"""
CISCE ECONAPP Class 9 - Deterministic Question Generator
Covers c9_econapp_001 through c9_econapp_010
Fully self-contained, deterministic seeded-random question bank.
"""

import random
import re
from typing import Dict, List, Any, Optional, Callable

# ---------------------------------------------------------------------------
# Type aliases
# ---------------------------------------------------------------------------
QuestionDict = Dict[str, Any]
VerificationResult = Dict[str, Any]

# ---------------------------------------------------------------------------
# Solver functions – deterministic correct-solution engines
# ---------------------------------------------------------------------------

def solve_mcq(question: QuestionDict, selected_index: int) -> VerificationResult:
    correct = question["answer"]
    options = question.get("options", [])
    is_correct = (0 <= selected_index < len(options) and
                  options[selected_index].strip().lower() == correct.strip().lower())
    return {
        "is_correct": is_correct,
        "selected_answer": options[selected_index] if 0 <= selected_index < len(options) else "",
        "correct_answer": correct,
        "explanation": question.get("solution", ""),
    }


def solve_fill_blank(question: QuestionDict, user_answer: str) -> VerificationResult:
    correct = question["answer"]
    is_correct = user_answer.strip().lower() == correct.strip().lower()
    return {
        "is_correct": is_correct,
        "selected_answer": user_answer.strip(),
        "correct_answer": correct,
        "explanation": question.get("solution", ""),
    }


def solve_short_answer(question: QuestionDict, user_answer: str) -> VerificationResult:
    correct = question["answer"]
    correct_words = set(re.findall(r"\w+", correct.lower()))
    user_words = set(re.findall(r"\w+", user_answer.lower()))
    overlap = correct_words & user_words
    ratio = len(overlap) / max(len(correct_words), 1)
    is_correct = ratio >= 0.5
    return {
        "is_correct": is_correct,
        "selected_answer": user_answer.strip(),
        "correct_answer": correct,
        "keyword_overlap_ratio": round(ratio, 2),
        "explanation": question.get("solution", ""),
    }


def solve_long_answer(question: QuestionDict, user_answer: str) -> VerificationResult:
    correct = question["answer"]
    correct_words = set(re.findall(r"\w+", correct.lower()))
    user_words = set(re.findall(r"\w+", user_answer.lower()))
    overlap = correct_words & user_words
    ratio = len(overlap) / max(len(correct_words), 1)
    min_keywords = question.get("verification", {}).get("min_keywords", 5)
    is_correct = ratio >= 0.4 and len(user_words) >= min_keywords
    return {
        "is_correct": is_correct,
        "selected_answer": user_answer.strip(),
        "keyword_overlap_ratio": round(ratio, 2),
        "word_count": len(user_words),
        "explanation": question.get("solution", ""),
    }


def solve_numerical(question: QuestionDict, user_answer: float) -> VerificationResult:
    correct = question["answer"]
    tolerance = question.get("verification", {}).get("tolerance", 0.01)
    is_correct = abs(float(user_answer) - float(correct)) <= tolerance
    return {
        "is_correct": is_correct,
        "selected_answer": float(user_answer),
        "correct_answer": float(correct),
        "tolerance": tolerance,
        "explanation": question.get("solution", ""),
    }


SOLVER_MAP: Dict[str, Callable] = {
    "mcq": solve_mcq,
    "fill_blank": solve_fill_blank,
    "short_answer": solve_short_answer,
    "long_answer": solve_long_answer,
    "numerical": solve_numerical,
}

# ---------------------------------------------------------------------------
# Question generators per topic  (c9_econapp_001 .. c9_econapp_010)
# ---------------------------------------------------------------------------

def gen_economic_entities(rng: random.Random, count: int) -> List[QuestionDict]:
    """c9_econapp_001 – Economic Entities: consumers, producers, government, foreign sector."""
    q_pool: List[Dict[str, Any]] = [
        {
            "type": "mcq", "difficulty": 0.1,
            "text": "Who is the largest consumer in the Indian economy?",
            "options": ["Households", "Government", "Firms", "Foreign Sector"],
            "answer": "Households",
            "solution": "Households are the largest consumer sector as every individual and family consumes goods and services.",
        },
        {
            "type": "mcq", "difficulty": 0.2,
            "text": "Which economic entity buys factors of production from households?",
            "options": ["Government", "Firms", "Foreign Sector", "Central Bank"],
            "answer": "Firms",
            "solution": "Firms purchase labour, land, capital and entrepreneurship from households to produce goods and services.",
        },
        {
            "type": "mcq", "difficulty": 0.3,
            "text": "The four economic entities in a closed economy are:",
            "options": [
                "Households, Firms, Government, Foreign Sector",
                "Producers, Consumers, Bankers, Traders",
                "Farmers, Industrialists, Service providers, Government",
                "Primary, Secondary, Tertiary, Quaternary sectors",
            ],
            "answer": "Households, Firms, Government, Foreign Sector",
            "solution": "The circular flow model identifies four economic entities: households, firms, government and the foreign sector.",
        },
        {
            "type": "fill_blank", "difficulty": 0.2,
            "text": "Payments made by households to firms for goods and services are called ____ expenditure.",
            "answer": "consumption",
            "solution": "Consumption expenditure refers to spending by households on goods and services.",
        },
        {
            "type": "short_answer", "difficulty": 0.3,
            "text": "Explain the role of the government as an economic entity in two points.",
            "answer": "The government provides public goods and services, imposes taxes, and regulates economic activity through fiscal and monetary policies.",
            "solution": "Key government roles: (1) Provides public goods like defence and infrastructure, (2) Redistributes income through taxation and subsidies, (3) Regulates markets and ensures fair competition.",
        },
        {
            "type": "mcq", "difficulty": 0.4,
            "text": "The 'Rest of the World' sector in circular flow represents:",
            "options": ["Exports and imports", "Government spending", "Household savings", "Corporate profits"],
            "answer": "Exports and imports",
            "solution": "The foreign sector (rest of the world) is represented by exports (inflow) and imports (outflow) in the circular flow model.",
        },
        {
            "type": "short_answer", "difficulty": 0.5,
            "text": "Differentiate between factor market and product market with one point each.",
            "answer": "Factor market is where factors of production (land, labour, capital, enterprise) are bought and sold. Product market is where finished goods and services are bought and sold.",
            "solution": "Factor markets deal with resources/inputs; product markets deal with finished outputs.",
        },
        {
            "type": "long_answer", "difficulty": 0.7,
            "text": "Describe the circular flow of income in a two-sector economy with the help of a diagram concept.",
            "answer": "In a two-sector economy, households and firms are the only entities. Households supply factors of production (land, labour, capital, enterprise) to firms through the factor market and receive factor incomes (rent, wages, interest, profit). Households use this income to buy goods and services from firms through the product market. This creates a continuous circular flow of income. Money flows from firms to households as factor payments and flows back from households to firms as consumption expenditure.",
            "solution": "The circular flow has two markets: (1) Factor market – households → firms (supply factors) and firms → households (factor payments). (2) Product market – firms → households (goods/services) and households → firms (consumption expenditure).",
            "verification": {"min_keywords": 8},
        },
        {
            "type": "mcq", "difficulty": 0.5,
            "text": "Transfer payments by the government (like pensions) are:",
            "options": ["Not included in national income", "Included in national income", "Part of capital expenditure", "Part of indirect taxes"],
            "answer": "Not included in national income",
            "solution": "Transfer payments are not included in national income because no goods or services are produced in exchange for these payments.",
        },
        {
            "type": "numerical", "difficulty": 0.6,
            "text": "If households spend Rs.80 out of every Rs.100 earned, what is the marginal propensity to consume (MPC)?",
            "answer": 0.8,
            "solution": "MPC = ΔC/ΔY = 80/100 = 0.8. The marginal propensity to consume measures the fraction of additional income spent on consumption.",
            "verification": {"tolerance": 0.01},
        },
    ]
    rng.shuffle(q_pool)
    return _build_questions(q_pool, count, rng, "Economic Entities")


def gen_importance_of_agriculture(rng: random.Random, count: int) -> List[QuestionDict]:
    """c9_econapp_002 – Importance of Agriculture in India."""
    q_pool: List[Dict[str, Any]] = [
        {
            "type": "mcq", "difficulty": 0.1,
            "text": "Approximately what percentage of India's population depends on agriculture for their livelihood?",
            "options": ["25%", "40%", "55%", "70%"],
            "answer": "55%",
            "solution": "About 55% of India's population depends on agriculture, making it the backbone of the Indian economy.",
        },
        {
            "type": "mcq", "difficulty": 0.2,
            "text": "Which crop is known as the 'King of cereals'?",
            "options": ["Rice", "Wheat", "Maize", "Barley"],
            "answer": "Wheat",
            "solution": "Wheat is called the 'King of cereals' because it is the most important cereal crop and a staple food in northern India.",
        },
        {
            "type": "fill_blank", "difficulty": 0.3,
            "text": "The ____ Revolution made India self-sufficient in food grain production in the 1960s.",
            "answer": "Green",
            "solution": "The Green Revolution (1960s), led by M.S. Swaminathan, introduced high-yielding varieties of seeds, irrigation and fertilisers, making India self-sufficient in food grains.",
        },
        {
            "type": "mcq", "difficulty": 0.2,
            "text": "Who is known as the Father of the Green Revolution in India?",
            "options": ["M.S. Swaminathan", "Verghese Kurien", "Norman Borlaug", "C. Subramaniam"],
            "answer": "M.S. Swaminathan",
            "solution": "M.S. Swaminathan is known as the Father of the Green Revolution in India for his pioneering work in developing high-yielding wheat varieties.",
        },
        {
            "type": "short_answer", "difficulty": 0.3,
            "text": "Give two reasons why agriculture is important for the Indian economy.",
            "answer": "Agriculture provides food security for the population and contributes significantly to national income and employment.",
            "solution": "Importance: (1) Source of livelihood for majority of population, (2) Food security, (3) Raw material for industries, (4) Contribution to exports, (5) Market for industrial goods.",
        },
        {
            "type": "mcq", "difficulty": 0.4,
            "text": "The White Revolution in India is associated with:",
            "options": ["Milk production", "Wheat production", "Rice production", "Cotton production"],
            "answer": "Milk production",
            "solution": "The White Revolution (Operation Flood), launched by Verghese Kurien, made India the largest milk producer in the world.",
        },
        {
            "type": "short_answer", "difficulty": 0.5,
            "text": "What is the share of agriculture in India's GDP approximately?",
            "answer": "About 17-18 percent of India's GDP.",
            "solution": "Agriculture contributes approximately 17-18% to India's GDP, though it employs about 55% of the workforce, indicating low productivity.",
        },
        {
            "type": "fill_blank", "difficulty": 0.3,
            "text": "The ____ Revolution aimed to increase the production of pulses and oilseeds in India.",
            "answer": "Yellow",
            "solution": "The Yellow Revolution (1986-1990) aimed to boost production of mustard and sesame seeds.",
        },
        {
            "type": "mcq", "difficulty": 0.5,
            "text": "Which of the following is NOT a major problem faced by Indian agriculture?",
            "options": [
                "Excessive use of chemical fertilisers",
                "Inadequate irrigation facilities",
                "Large land holdings",
                "Fragmentation of land holdings",
            ],
            "answer": "Large land holdings",
            "solution": "Indian agriculture suffers from fragmented and small land holdings, not large ones. Other problems include inadequate irrigation, poor storage, and indebtedness.",
        },
        {
            "type": "long_answer", "difficulty": 0.7,
            "text": "Explain any four problems faced by the agricultural sector in India.",
            "answer": "Problems: (1) Dependence on monsoons – erratic rainfall causes crop failure, (2) Small and fragmented land holdings reduce economies of scale, (3) Inadequate irrigation – only about 50% of farmland has irrigation, (4) Poor storage and marketing facilities lead to post-harvest losses, (5) Indebtedness of farmers due to high input costs and low returns, (6) Under-employment and disguised unemployment in rural areas.",
            "solution": "Major problems: rainfall dependence, fragmented holdings, inadequate irrigation, poor storage/marketing, farmer indebtedness, and rural unemployment.",
            "verification": {"min_keywords": 8},
        },
    ]
    rng.shuffle(q_pool)
    return _build_questions(q_pool, count, rng, "Importance of Agriculture")


def gen_sectors_of_economy(rng: random.Random, count: int) -> List[QuestionDict]:
    """c9_econapp_003 – Sectors of the Economy: Primary, Secondary, Tertiary."""
    q_pool: List[Dict[str, Any]] = [
        {
            "type": "mcq", "difficulty": 0.1,
            "text": "Which sector includes agriculture, fishing and mining?",
            "options": ["Primary sector", "Secondary sector", "Tertiary sector", "Quaternary sector"],
            "answer": "Primary sector",
            "solution": "The primary sector involves extraction and production of natural resources, including agriculture, fishing, forestry and mining.",
        },
        {
            "type": "mcq", "difficulty": 0.2,
            "text": "The secondary sector is also known as the:",
            "options": ["Manufacturing sector", "Service sector", "Agricultural sector", "IT sector"],
            "answer": "Manufacturing sector",
            "solution": "The secondary sector processes raw materials into finished goods through manufacturing and construction.",
        },
        {
            "type": "fill_blank", "difficulty": 0.2,
            "text": "The sector that provides services like transport, banking and insurance is the ____ sector.",
            "answer": "tertiary",
            "solution": "The tertiary (service) sector provides support services to both primary and secondary sectors.",
        },
        {
            "type": "mcq", "difficulty": 0.3,
            "text": "In India, which sector contributes the most to GDP?",
            "options": ["Primary sector", "Secondary sector", "Tertiary sector", "All contribute equally"],
            "answer": "Tertiary sector",
            "solution": "The tertiary sector now contributes over 50% to India's GDP, reflecting the shift towards a service-oriented economy.",
        },
        {
            "type": "mcq", "difficulty": 0.4,
            "text": "Which sector employs the largest number of people in India?",
            "options": ["Primary sector", "Secondary sector", "Tertiary sector", "Quaternary sector"],
            "answer": "Primary sector",
            "solution": "Despite its declining share in GDP, the primary sector still employs the largest workforce in India due to disguised unemployment.",
        },
        {
            "type": "short_answer", "difficulty": 0.4,
            "text": "Give one example each of activities in the primary, secondary and tertiary sectors.",
            "answer": "Primary: farming/fishing. Secondary: manufacturing/textiles. Tertiary: transport/banking/education.",
            "solution": "Primary = extraction (agriculture, mining); Secondary = manufacturing (textiles, steel); Tertiary = services (transport, banking, education).",
        },
        {
            "type": "fill_blank", "difficulty": 0.5,
            "text": "Employment where workers are not fully utilised is called ____ unemployment.",
            "answer": "disguised",
            "solution": "Disguised unemployment exists when more people are employed than actually needed, common in Indian agriculture.",
        },
        {
            "type": "mcq", "difficulty": 0.5,
            "text": "The shift of workforce from primary to secondary and tertiary sectors is called:",
            "options": [
                "Structural transformation",
                "Green Revolution",
                "Demographic transition",
                "Economic liberalisation",
            ],
            "answer": "Structural transformation",
            "solution": "Structural transformation refers to the reallocation of labour from low-productivity sectors (agriculture) to higher-productivity sectors (industry and services).",
        },
        {
            "type": "numerical", "difficulty": 0.6,
            "text": "If the primary sector contributes 17% to GDP but employs 55% of the workforce, what is the approximate productivity ratio (GDP share/employment share)?",
            "answer": 0.31,
            "solution": "Productivity ratio = 17/55 ≈ 0.31, indicating low productivity in the primary sector.",
            "verification": {"tolerance": 0.05},
        },
        {
            "type": "long_answer", "difficulty": 0.7,
            "text": "Why is there a gap between the GDP contribution and employment share of India's primary sector? Explain.",
            "answer": "The primary sector contributes only about 17-18% to GDP but employs about 55% of the workforce. This gap exists because: (1) Low productivity due to traditional methods of farming, (2) Dependence on monsoon and lack of irrigation, (3) Fragmented land holdings preventing mechanisation, (4) High disguised unemployment – more workers are employed than actually needed, (5) Lack of alternative employment opportunities in rural areas pushing people into agriculture.",
            "solution": "The large employment share vs low GDP share reflects low agricultural productivity, disguised unemployment, and limited non-farm opportunities in rural India.",
            "verification": {"min_keywords": 8},
        },
    ]
    rng.shuffle(q_pool)
    return _build_questions(q_pool, count, rng, "Sectors of Economy")


def gen_economic_infrastructure(rng: random.Random, count: int) -> List[QuestionDict]:
    """c9_econapp_004 – Economic Infrastructure: transport, communication, power, banking."""
    q_pool: List[Dict[str, Any]] = [
        {
            "type": "mcq", "difficulty": 0.1,
            "text": "Which is the largest mode of transport in India in terms of route length?",
            "options": ["Roadways", "Railways", "Waterways", "Airways"],
            "answer": "Roadways",
            "solution": "India has one of the largest road networks in the world (over 6 million km), making roadways the largest transport mode.",
        },
        {
            "type": "mcq", "difficulty": 0.2,
            "text": "The Golden Quadrilateral connects which four cities?",
            "options": [
                "Delhi, Mumbai, Chennai, Kolkata",
                "Delhi, Agra, Jaipur, Mumbai",
                "Chennai, Bangalore, Hyderabad, Mumbai",
                "Kolkata, Guwahati, Imphal, Shillong",
            ],
            "answer": "Delhi, Mumbai, Chennai, Kolkata",
            "solution": "The Golden Quadrilateral is a 5,846 km highway network connecting Delhi, Mumbai, Chennai and Kolkata.",
        },
        {
            "type": "fill_blank", "difficulty": 0.3,
            "text": "The first Indian railway line was opened between Bombay and Thane in ____.",
            "answer": "1853",
            "solution": "The first passenger train ran between Bombay (Mumbai) and Thane on April 16, 1853.",
        },
        {
            "type": "mcq", "difficulty": 0.3,
            "text": "Which mode of transport is most suitable for carrying heavy goods over long distances at low cost?",
            "options": ["Waterways", "Airways", "Roadways", "Pipelines"],
            "answer": "Waterways",
            "solution": "Waterways (inland and ocean) are the cheapest mode for transporting heavy and bulky goods over long distances.",
        },
        {
            "type": "mcq", "difficulty": 0.4,
            "text": "BSNL provides which type of service?",
            "options": ["Telecommunication", "Banking", "Insurance", "Electricity"],
            "answer": "Telecommunication",
            "solution": "BSNL (Bharat Sanchar Nigam Limited) is a state-owned telecommunications company providing phone and internet services.",
        },
        {
            "type": "short_answer", "difficulty": 0.3,
            "text": "Mention any two advantages of road transport over rail transport.",
            "answer": "Road transport has lower construction cost and provides door-to-door service. It is flexible and can reach remote areas.",
            "solution": "Advantages: (1) Door-to-door service, (2) Lower initial cost, (3) Flexible routes, (4) Suitable for short distances.",
        },
        {
            "type": "mcq", "difficulty": 0.5,
            "text": "Which infrastructure is essential for the functioning of ATMs and online banking?",
            "options": ["Communication infrastructure", "Power infrastructure", "Transport infrastructure", "Warehousing infrastructure"],
            "answer": "Communication infrastructure",
            "solution": "ATMs and online banking rely on telecommunication networks to connect bank servers with customer devices.",
        },
        {
            "type": "fill_blank", "difficulty": 0.4,
            "text": "India's first metro rail was started in ____ in 1984.",
            "answer": "Kolkata",
            "solution": "Kolkata Metro, started in 1984, was India's first metro railway system.",
        },
        {
            "type": "mcq", "difficulty": 0.6,
            "text": "Which of the following is NOT a component of economic infrastructure?",
            "options": ["Education", "Transport", "Communication", "Power"],
            "answer": "Education",
            "solution": "Education is part of social infrastructure. Economic infrastructure includes transport, communication, power, banking and insurance.",
        },
        {
            "type": "long_answer", "difficulty": 0.7,
            "text": "Explain how transport infrastructure contributes to economic development.",
            "answer": "Transport infrastructure contributes to economic development by: (1) Connecting production centres with markets, reducing cost of goods movement, (2) Promoting trade and commerce by facilitating movement of raw materials and finished goods, (3) Creating employment opportunities in construction and operation, (4) Encouraging industrial growth by providing access to resources and markets, (5) Promoting regional development by connecting backward areas with developed ones, (6) Facilitating tourism and movement of people.",
            "solution": "Transport links producers to consumers, lowers trade costs, creates jobs, stimulates industry and promotes balanced regional growth.",
            "verification": {"min_keywords": 8},
        },
    ]
    rng.shuffle(q_pool)
    return _build_questions(q_pool, count, rng, "Economic Infrastructure")


def gen_social_infrastructure(rng: random.Random, count: int) -> List[QuestionDict]:
    """c9_econapp_005 – Social Infrastructure: education, health, sanitation."""
    q_pool: List[Dict[str, Any]] = [
        {
            "type": "mcq", "difficulty": 0.1,
            "text": "Which of the following is a component of social infrastructure?",
            "options": ["Education", "Railways", "Banking", "Roads"],
            "answer": "Education",
            "solution": "Education is a key component of social infrastructure, alongside health and sanitation.",
        },
        {
            "type": "mcq", "difficulty": 0.2,
            "text": "The national policy on education was first introduced in India in:",
            "options": ["1968", "1986", "1992", "2002"],
            "answer": "1968",
            "solution": "The first National Policy on Education (NPE) was introduced in 1968 under Prime Minister Indira Gandhi.",
        },
        {
            "type": "fill_blank", "difficulty": 0.3,
            "text": "The ____ programme aims to make elementary education compulsory for all children aged 6-14.",
            "answer": "Sarva Shiksha Abhiyan",
            "solution": "Sarva Shiksha Abhiyan (SSA), launched in 2001, is a programme for achieving universalisation of elementary education.",
        },
        {
            "type": "mcq", "difficulty": 0.3,
            "text": "Swachh Bharat Abhiyan was launched in the year:",
            "options": ["2010", "2014", "2016", "2018"],
            "answer": "2014",
            "solution": "Swachh Bharat Abhiyan (Clean India Mission) was launched on October 2, 2014.",
        },
        {
            "type": "short_answer", "difficulty": 0.4,
            "text": "Mention two ways in which health infrastructure contributes to economic development.",
            "answer": "A healthy workforce is more productive, reducing absenteeism and increasing output. It also reduces medical expenditure and increases savings.",
            "solution": "Health contributes to development by: (1) Improving worker productivity, (2) Reducing mortality/morbidity rates, (3) Lowering healthcare costs.",
        },
        {
            "type": "mcq", "difficulty": 0.4,
            "text": "Which scheme provides health insurance to economically weaker sections?",
            "options": ["Ayushman Bharat", "MGNREGA", "PMJDY", "Ujjwala"],
            "answer": "Ayushman Bharat",
            "solution": "Ayushman Bharat (2018) provides health insurance coverage of Rs.5 lakh per family per year for secondary and tertiary care.",
        },
        {
            "type": "mcq", "difficulty": 0.5,
            "text": "The Midday Meal Scheme aims to:",
            "options": [
                "Improve nutritional status of school children",
                "Provide free textbooks",
                "Build school infrastructure",
                "Train teachers",
            ],
            "answer": "Improve nutritional status of school children",
            "solution": "The Midday Meal Scheme provides free cooked lunches to children in primary and upper primary schools to improve nutritional status and increase enrolment.",
        },
        {
            "type": "short_answer", "difficulty": 0.5,
            "text": "What is the Right to Education Act and when did it come into force?",
            "answer": "The Right to Education Act (RTE) 2009 makes elementary education a fundamental right for children aged 6-14. It came into force on April 1, 2010.",
            "solution": "RTE Act 2009 guarantees free and compulsory education to all children 6-14 years. It mandates 25% reservation for disadvantaged groups in private schools.",
        },
        {
            "type": "mcq", "difficulty": 0.6,
            "text": "Which of the following is an indicator of human development?",
            "options": ["Life expectancy at birth", "Number of factories", "Railway route length", "Telephone subscribers"],
            "answer": "Life expectancy at birth",
            "solution": "Human Development Index (HDI) uses life expectancy, education and per capita income as indicators.",
        },
        {
            "type": "long_answer", "difficulty": 0.8,
            "text": "Discuss the importance of investment in health and education for economic growth.",
            "answer": "Investment in health and education is crucial for economic growth because: (1) Healthy and educated workforce has higher productivity, (2) Education enhances skills and employability, (3) Better health reduces mortality and increases working years, (4) Both attract foreign investment by creating capable human resources, (5) Educated individuals are more innovative and entrepreneurial, (6) Social returns from health/education exceed private returns, (7) Reduced inequality through inclusive growth. Countries investing heavily in human capital like Japan and South Korea have achieved rapid economic growth.",
            "solution": "Human capital formation through health and education raises productivity, innovation and employability, driving sustained economic growth.",
            "verification": {"min_keywords": 10},
        },
    ]
    rng.shuffle(q_pool)
    return _build_questions(q_pool, count, rng, "Social Infrastructure")


def gen_money_and_banking(rng: random.Random, count: int) -> List[QuestionDict]:
    """c9_econapp_006 – Money and Banking."""
    q_pool: List[Dict[str, Any]] = [
        {
            "type": "mcq", "difficulty": 0.1,
            "text": "Which of the following is NOT a function of money?",
            "options": ["Barter system", "Medium of exchange", "Measure of value", "Store of value"],
            "answer": "Barter system",
            "solution": "Barter system is the system of exchange that existed before money. Functions of money are: medium of exchange, measure of value, store of value, standard of deferred payment.",
        },
        {
            "type": "fill_blank", "difficulty": 0.2,
            "text": "The central bank of India is the ____.",
            "answer": "Reserve Bank of India",
            "solution": "The Reserve Bank of India (RBI), established in 1935 and nationalised in 1949, is the central bank of India.",
        },
        {
            "type": "mcq", "difficulty": 0.2,
            "text": "When was the Reserve Bank of India established?",
            "options": ["1935", "1947", "1949", "1950"],
            "answer": "1935",
            "solution": "RBI was established on April 1, 1935, based on the recommendations of the Hilton-Young Commission.",
        },
        {
            "type": "mcq", "difficulty": 0.3,
            "text": "Which function of money eliminates the need for a double coincidence of wants?",
            "options": ["Medium of exchange", "Measure of value", "Store of value", "Standard of deferred payment"],
            "answer": "Medium of exchange",
            "solution": "Money as a medium of exchange eliminates the double coincidence of wants problem inherent in barter.",
        },
        {
            "type": "mcq", "difficulty": 0.3,
            "text": "A commercial bank that accepts deposits and gives loans is performing:",
            "options": ["Primary functions", "Secondary functions", "Development functions", "Regulatory functions"],
            "answer": "Primary functions",
            "solution": "Primary functions of commercial banks are accepting deposits and advancing loans/credit.",
        },
        {
            "type": "fill_blank", "difficulty": 0.4,
            "text": "Interest paid by the RBI on deposits kept by commercial banks is called ____ rate.",
            "answer": "bank",
            "solution": "The bank rate is the rate at which RBI lends to commercial banks without any security.",
        },
        {
            "type": "mcq", "difficulty": 0.4,
            "text": "Which of the following is a quantitative credit control measure of RBI?",
            "options": ["Open Market Operations", "Moral suasion", "Rationing of credit", "Direct action"],
            "answer": "Open Market Operations",
            "solution": "Open Market Operations (buying/selling government securities) is a quantitative method of credit control by RBI.",
        },
        {
            "type": "short_answer", "difficulty": 0.5,
            "text": "What is a cheque? Mention one advantage of using cheques.",
            "answer": "A cheque is a written order by a bank account holder to their bank to pay a specified sum to a person or entity. It reduces the risk of carrying cash.",
            "solution": "Cheques are negotiable instruments. Advantages: safe, convenient for large amounts, creates a record, reduces cash handling.",
        },
        {
            "type": "mcq", "difficulty": 0.6,
            "text": "The cash reserve ratio (CRR) is the percentage of deposits that commercial banks must keep with the RBI. If CRR is 4.5%, banks can lend:",
            "options": ["4.5% of deposits", "95.5% of deposits", "100% of deposits", "0% of deposits"],
            "answer": "95.5% of deposits",
            "solution": "If CRR = 4.5%, banks must keep 4.5% with RBI and can lend out the remaining 95.5% of deposits.",
        },
        {
            "type": "long_answer", "difficulty": 0.7,
            "text": "Distinguish between the Central Bank and Commercial Banks with any three points of difference.",
            "answer": "Differences: (1) Central Bank (RBI) is the apex bank of the country while commercial banks operate under the RBI. (2) RBI issues currency notes; commercial banks do not. (3) RBI is the banker to the government; commercial banks are bankers to the public. (4) RBI controls monetary policy; commercial banks follow it. (5) RBI has the monopoly of note issue; commercial banks create credit.",
            "solution": "RBI is the apex monetary authority issuing currency and controlling credit; commercial banks mobilise deposits, provide credit and offer banking services to the public.",
            "verification": {"min_keywords": 8},
        },
    ]
    rng.shuffle(q_pool)
    return _build_questions(q_pool, count, rng, "Money and Banking")


def gen_consumer_protection(rng: random.Random, count: int) -> List[QuestionDict]:
    """c9_econapp_007 – Consumer Protection: rights, COPRA, consumer courts."""
    q_pool: List[Dict[str, Any]] = [
        {
            "type": "mcq", "difficulty": 0.1,
            "text": "Under COPRA 1986, a 'consumer' is defined as any person who:",
            "options": [
                "Buys goods or hires services for consideration",
                "Sells goods to others",
                "Manufactures goods",
                "Only buys luxury goods",
            ],
            "answer": "Buys goods or hires services for consideration",
            "solution": "COPRA defines a consumer as any person who buys goods or hires services for consideration which is paid or promised.",
        },
        {
            "type": "mcq", "difficulty": 0.2,
            "text": "How many consumer rights are recognised under COPRA?",
            "options": ["4", "5", "6", "7"],
            "answer": "6",
            "solution": "The six consumer rights are: Right to Safety, Right to Information, Right to Choose, Right to be Heard, Right to Seek Redressal, Right to Consumer Education.",
        },
        {
            "type": "fill_blank", "difficulty": 0.3,
            "text": "The ____ right of consumers ensures they can seek compensation for defective goods.",
            "answer": "Right to Seek Redressal",
            "solution": "The Right to Seek Redressal allows consumers to get compensation or replacement for defective or unsatisfactory goods/services.",
        },
        {
            "type": "mcq", "difficulty": 0.3,
            "text": "A consumer can file a complaint with the District Commission if the value of goods/services and compensation claimed does not exceed:",
            "options": ["Rs.1 crore", "Rs.10 lakh", "Rs.50 lakh", "Rs.5 crore"],
            "answer": "Rs.1 crore",
            "solution": "As per the Consumer Protection Act 2019, the District Commission handles cases up to Rs.1 crore, State Commission Rs.1 crore to Rs.10 crore, National Commission above Rs.10 crore.",
        },
        {
            "type": "short_answer", "difficulty": 0.4,
            "text": "Mention any four consumer rights under COPRA.",
            "answer": "Right to Safety, Right to Information, Right to Choose, Right to be Heard, Right to Seek Redressal, Right to Consumer Education.",
            "solution": "The six rights are: Safety, Information, Choice, Representation, Redressal, and Consumer Education.",
        },
        {
            "type": "mcq", "difficulty": 0.5,
            "text": "The 'ISI' mark on an electrical appliance indicates that the product:",
            "options": [
                "Meets quality standards set by BIS",
                "Is manufactured in India",
                "Is exported",
                "Is the cheapest available",
            ],
            "answer": "Meets quality standards set by BIS",
            "solution": "The ISI (Indian Standards Institution) mark certifies that the product conforms to quality standards specified by the Bureau of Indian Standards (BIS).",
        },
        {
            "type": "fill_blank", "difficulty": 0.4,
            "text": "____ marks indicate that food products meet FSSAI standards.",
            "answer": "FSSAI",
            "solution": "The FSSAI (Food Safety and Standards Authority of India) logo and licence number on food products indicate compliance with food safety standards.",
        },
        {
            "type": "mcq", "difficulty": 0.6,
            "text": "Which of the following is NOT a remedy available to consumers under COPRA?",
            "options": ["Punishment of the seller", "Replacement of defective goods", "Refund of price paid", "Compensation for damages"],
            "answer": "Punishment of the seller",
            "solution": "Remedies include removal of defect, replacement, refund, compensation for loss/injury. Punishment is not a consumer remedy — it is a legal consequence.",
        },
        {
            "type": "short_answer", "difficulty": 0.5,
            "text": "What is the full form of COPRA and when was it enacted?",
            "answer": "COPRA stands for Consumer Protection Act, 1986. It was amended in 2019 as the Consumer Protection Act 2019.",
            "solution": "The Consumer Protection Act was enacted in 1986 to protect consumer interests and provide for consumer councils and consumer courts.",
        },
        {
            "type": "long_answer", "difficulty": 0.7,
            "text": "Explain the 'Right to Information' and 'Right to Choose' with suitable examples.",
            "answer": "Right to Information means consumers have the right to be informed about the quality, quantity, potency, purity, standard and price of goods. For example, a consumer buying a drug has the right to know its expiry date and side effects. Right to Choose means consumers have the right to select from a variety of goods and services at competitive prices. For example, a consumer can choose between different brands of smartphones based on features and price.",
            "solution": "Right to Information ensures transparency about product details; Right to Choose ensures access to a variety of options free from coercion.",
            "verification": {"min_keywords": 10},
        },
    ]
    rng.shuffle(q_pool)
    return _build_questions(q_pool, count, rng, "Consumer Protection")


def gen_poverty_and_unemployment(rng: random.Random, count: int) -> List[QuestionDict]:
    """c9_econapp_008 – Poverty and Unemployment."""
    q_pool: List[Dict[str, Any]] = [
        {
            "type": "mcq", "difficulty": 0.1,
            "text": "Poverty line in India is based on:",
            "options:": ["Minimum calorie intake", "Maximum income earned", "Number of family members", "Type of house"],
            "answer": "Minimum calorie intake",
            "solution": "The poverty line in India is based on the minimum calorie intake (2400 kcal rural, 2100 kcal urban) and is expressed in monetary terms.",
        },
        {
            "type": "mcq", "difficulty": 0.2,
            "text": "Which type of unemployment occurs when workers move from one job to another?",
            "options": ["Frictional", "Seasonal", "Structural", "Disguised"],
            "answer": "Frictional",
            "solution": "Frictional unemployment is temporary unemployment that occurs when workers are between jobs or searching for new jobs.",
        },
        {
            "type": "mcq", "difficulty": 0.2,
            "text": "Unemployment that occurs during off-seasons in agriculture is called:",
            "options": ["Seasonal unemployment", "Structural unemployment", "Disguised unemployment", "Cyclical unemployment"],
            "answer": "Seasonal unemployment",
            "solution": "Seasonal unemployment occurs when people cannot find work during certain months of the year, such as agricultural workers during the lean season.",
        },
        {
            "type": "fill_blank", "difficulty": 0.3,
            "text": "MGNREGA stands for ____.",
            "answer": "Mahatma Gandhi National Rural Employment Guarantee Act",
            "solution": "MGNREGA (2005) guarantees 100 days of wage employment in a financial year to rural households.",
        },
        {
            "type": "mcq", "difficulty": 0.3,
            "text": "Which committee fixed the poverty line in India?",
            "options": [
                "Tendulkar Committee", "Lakdawala Committee",
                "Rangarajan Committee", "Dreze Committee",
            ],
            "answer": "Tendulkar Committee",
            "solution": "The Tendulkar Committee (2009) updated the methodology for estimating poverty in India based on private consumption expenditure.",
        },
        {
            "type": "short_answer", "difficulty": 0.4,
            "text": "What is disguised unemployment? Give one example.",
            "answer": "Disguised unemployment is when more people are employed than actually needed. Example: five people working on a small farm where only two are needed.",
            "solution": "In disguised unemployment, removing surplus workers does not affect total output. Common in Indian agriculture.",
        },
        {
            "type": "mcq", "difficulty": 0.4,
            "text": "Which scheme aims to provide self-employment to rural poor?",
            "options": ["MGNREGA", "Swarnjayanti Gram Swarozgar Yojana", "ICDS", "Jawahar Rozgar Yojana"],
            "answer": "Swarnjayanti Gram Swarozgar Yojana",
            "solution": "Swarnjayanti Gram Swarozgar Yojana (SGSY) was a self-employment programme for the rural poor, now integrated into NRLM.",
        },
        {
            "type": "short_answer", "difficulty": 0.5,
            "text": "Mention two causes of poverty in India.",
            "answer": "Causes of poverty: (1) Low economic growth during colonial period, (2) Population explosion, (3) Unequal distribution of income, (4) Underemployment and unemployment, (5) Social factors like caste system and illiteracy.",
            "solution": "Major causes include historical factors, population growth, income inequality, unemployment and social inequalities.",
        },
        {
            "type": "mcq", "difficulty": 0.6,
            "text": "Which of the following is an anti-poverty programme launched in 1978?",
            "options": ["Integrated Rural Development Programme", "MGNREGA", "National Food Security Act", "Pradhan Mantri Jan Dhan Yojana"],
            "answer": "Integrated Rural Development Programme",
            "solution": "IRDP (1978) aimed at providing assistance to rural poor in the form of bank credit and government subsidy for self-employment.",
        },
        {
            "type": "long_answer", "difficulty": 0.7,
            "text": "Discuss the measures taken by the Government of India to remove poverty.",
            "answer": "Government measures to remove poverty include: (1) MGNREGA – guarantees 100 days of wage employment, (2) PMRY – Prime Minister's Rozgar Yojana for self-employment of educated unemployed youth, (3) IRDP – provides bank credit and subsidy for self-employment, (4) Swarnjayanti Gram Swarozgar Yojana – organises self-employment of the poor, (5) National Food Security Act – provides subsidised food grains, (6) Midday Meal Scheme – improves nutrition and education, (7) Housing schemes like PMAY-G, (8) Skill development programmes like PMKVY.",
            "solution": "Key programmes: MGNREGA (employment), NFS Act (food security), housing schemes, skill development, and self-employment programmes.",
            "verification": {"min_keywords": 8},
        },
    ]
    rng.shuffle(q_pool)
    return _build_questions(q_pool, count, rng, "Poverty and Unemployment")


def gen_planning_in_india(rng: random.Random, count: int) -> List[QuestionDict]:
    """c9_econapp_009 – Planning in India: Five Year Plans, NITI Aayog."""
    q_pool: List[Dict[str, Any]] = [
        {
            "type": "mcq", "difficulty": 0.1,
            "text": "Planning in India was inspired by the:",
            "options": ["Soviet Union", "United States", "United Kingdom", "Japan"],
            "answer": "Soviet Union",
            "solution": "India adopted the Five Year Plan model from the Soviet Union's planned economy approach.",
        },
        {
            "type": "mcq", "difficulty": 0.2,
            "text": "The Planning Commission of India was established in:",
            "options": ["1947", "1950", "1952", "1955"],
            "answer": "1950",
            "solution": "The Planning Commission was established on March 15, 1950, under the chairmanship of the Prime Minister.",
        },
        {
            "type": "fill_blank", "difficulty": 0.3,
            "text": "The First Five Year Plan focused on the development of the ____ sector.",
            "answer": "primary",
            "solution": "The First Five Year Plan (1951-1956) prioritised the primary sector, especially agriculture and irrigation.",
        },
        {
            "type": "mcq", "difficulty": 0.3,
            "text": "The Green Revolution in India is associated with which Five Year Plan?",
            "options": [
                "Third Five Year Plan", "Fourth Five Year Plan",
                "Fifth Five Year Plan", "Second Five Year Plan",
            ],
            "answer": "Third Five Year Plan",
            "solution": "The Third Plan (1961-1966) emphasised agriculture to achieve self-sufficiency in food grains, leading to the Green Revolution.",
        },
        {
            "type": "mcq", "difficulty": 0.4,
            "text": "Which institution replaced the Planning Commission in 2015?",
            "options": ["NITI Aayog", "Finance Commission", "Election Commission", "UPSC"],
            "answer": "NITI Aayog",
            "solution": "NITI Aayog (National Institution for Transforming India) replaced the Planning Commission on January 1, 2015.",
        },
        {
            "type": "short_answer", "difficulty": 0.4,
            "text": "What is a Five Year Plan? What was its main objective?",
            "answer": "A Five Year Plan is a centralised and integrated national economic programme covering five years. Its main objective was to achieve rapid economic development and raise living standards.",
            "solution": "Five Year Plans are comprehensive economic programmes with specific targets for growth, employment, and social welfare over five-year periods.",
        },
        {
            "type": "mcq", "difficulty": 0.5,
            "text": "The Eleventh Five Year Plan aimed for an average annual growth rate of:",
            "options": ["5.2%", "8%", "9%", "6.5%"],
            "answer": "9%",
            "solution": "The Eleventh Plan (2007-2012) targeted an average growth rate of 9% in GDP.",
        },
        {
            "type": "fill_blank", "difficulty": 0.4,
            "text": "NITI Aayog stands for ____.",
            "answer": "National Institution for Transforming India",
            "solution": "NITI Aayog was established to replace the Planning Commission and foster cooperative federalism.",
        },
        {
            "type": "mcq", "difficulty": 0.5,
            "text": "How many Five Year Plans were formulated before NITI Aayog was established?",
            "options": ["11", "12", "13", "15"],
            "answer": "12",
            "solution": "Twelve Five Year Plans were formulated between 1951 and 2017 before NITI Aayog replaced the Planning Commission.",
        },
        {
            "type": "long_answer", "difficulty": 0.7,
            "text": "Explain the main differences between the Planning Commission and NITI Aayog.",
            "answer": "Differences: (1) Planning Commission was established in 1950; NITI Aayog in 2015. (2) Planning Commission had top-down approach; NITI Aayog follows bottom-up approach. (3) Planning Commission had binding Five Year Plans; NITI Aayog has a more flexible approach with 'Strategy for New India @ 75'. (4) Planning Commission allocated funds to states; NITI Aayog acts as a think tank and advisory body. (5) NITI Aayog includes Chief Ministers and Lieutenant Governors as members, promoting cooperative federalism. (6) NITI Aayog focuses on sustainable development goals.",
            "solution": "Planning Commission was a top-down, fund-allocating body; NITI Aayog is a think tank promoting cooperative federalism and sustainable development.",
            "verification": {"min_keywords": 8},
        },
    ]
    rng.shuffle(q_pool)
    return _build_questions(q_pool, count, rng, "Planning in India")


def gen_sustainable_development(rng: random.Random, count: int) -> List[QuestionDict]:
    """c9_econapp_010 – Sustainable Development and Environment."""
    q_pool: List[Dict[str, Any]] = [
        {
            "type": "mcq", "difficulty": 0.1,
            "text": "Sustainable development means development that meets the needs of the present without compromising:",
            "options": [
                "The ability of future generations to meet their needs",
                "Current economic growth",
                "Industrial production",
                "Government revenue",
            ],
            "answer": "The ability of future generations to meet their needs",
            "solution": "The Brundtland Commission (1987) defined sustainable development as meeting present needs without compromising future generations' ability to meet theirs.",
        },
        {
            "type": "mcq", "difficulty": 0.2,
            "text": "How many Sustainable Development Goals (SDGs) were adopted by the UN?",
            "options": ["12", "17", "21", "8"],
            "answer": "17",
            "solution": "The UN adopted 17 Sustainable Development Goals in 2015 to be achieved by 2030, covering economic, social and environmental dimensions.",
        },
        {
            "type": "fill_blank", "difficulty": 0.3,
            "text": "The year ____ was declared the International Year of Sustainable Tourism for Development.",
            "answer": "2017",
            "solution": "2017 was designated by the UN as the International Year of Sustainable Tourism for Development.",
        },
        {
            "type": "mcq", "difficulty": 0.3,
            "text": "Which of the following is NOT a pillar of sustainable development?",
            "options": ["Economic growth only", "Economic growth", "Social inclusion", "Environmental protection"],
            "answer": "Economic growth only",
            "solution": "Sustainable development has three pillars: economic growth, social inclusion, and environmental protection — all three together.",
        },
        {
            "type": "short_answer", "difficulty": 0.4,
            "text": "Mention any two causes of environmental degradation.",
            "answer": "Causes: (1) Deforestation, (2) Industrial pollution, (3) Overuse of natural resources, (4) Population growth, (5) Use of chemical fertilisers and pesticides.",
            "solution": "Environmental degradation is caused by deforestation, industrialisation, pollution, over-exploitation of resources and unsustainable farming practices.",
        },
        {
            "type": "mcq", "difficulty": 0.4,
            "text": "The Kyoto Protocol is related to:",
            "options": ["Climate change", "Biodiversity", "Ozone layer", "Wetlands"],
            "answer": "Climate change",
            "solution": "The Kyoto Protocol (1997) is an international treaty committing countries to reduce greenhouse gas emissions to combat climate change.",
        },
        {
            "type": "fill_blank", "difficulty": 0.5,
            "text": "The Montreal Protocol aims to protect the ____ layer.",
            "answer": "ozone",
            "solution": "The Montreal Protocol (1987) aims to phase out substances that deplete the ozone layer, such as CFCs.",
        },
        {
            "type": "mcq", "difficulty": 0.5,
            "text": "Which of the following is a non-renewable resource?",
            "options": ["Coal", "Solar energy", "Wind energy", "Forests"],
            "answer": "Coal",
            "solution": "Coal is a non-renewable fossil fuel. Solar, wind, and forests (if sustainably managed) are renewable resources.",
        },
        {
            "type": "short_answer", "difficulty": 0.5,
            "text": "What is Agenda 21? When was it adopted?",
            "answer": "Agenda 21 is an action plan for sustainable development adopted at the UN Earth Summit in Rio de Janeiro in 1992. It covers social, economic and environmental dimensions of sustainable development.",
            "solution": "Agenda 21 is a comprehensive plan of action to address environmental and developmental challenges globally, adopted at the Rio Earth Summit (1992).",
        },
        {
            "type": "long_answer", "difficulty": 0.7,
            "text": "What is sustainable development? Discuss the challenges to sustainable development in India.",
            "answer": "Sustainable development is development that meets the needs of the present without compromising the ability of future generations to meet their own needs. Challenges in India: (1) Population pressure – high growth strains resources, (2) Poverty – poor depend on natural resources for survival, (3) Air and water pollution from industrialisation, (4) Deforestation and loss of biodiversity, (5) Land degradation and soil erosion, (6) Climate change impacts like floods and droughts, (7) Over-exploitation of groundwater, (8) Inadequate waste management.",
            "solution": "Sustainable development balances economic, social and environmental needs. India faces challenges from population, poverty, pollution, resource depletion and climate change.",
            "verification": {"min_keywords": 10},
        },
    ]
    rng.shuffle(q_pool)
    return _build_questions(q_pool, count, rng, "Sustainable Development")


def gen_planning_budget(rng: random.Random, count: int) -> List[QuestionDict]:
    """c9_econapp_extra – Government Budget and Public Finance (bonus topic)."""
    q_pool: List[Dict[str, Any]] = [
        {
            "type": "mcq", "difficulty": 0.1,
            "text": "A government budget is presented annually in the:",
            "options": ["Parliament", "Supreme Court", "Election Commission", "RBI"],
            "answer": "Parliament",
            "solution": "The Union Budget is presented annually in the Parliament by the Finance Minister.",
        },
        {
            "type": "mcq", "difficulty": 0.3,
            "text": "Taxes that are paid directly to the government by the taxpayer are called:",
            "options": ["Direct taxes", "Indirect taxes", "Progressive taxes", "Regressive taxes"],
            "answer": "Direct taxes",
            "solution": "Direct taxes (income tax, wealth tax) are paid directly to the government and cannot be shifted to others.",
        },
        {
            "type": "fill_blank", "difficulty": 0.3,
            "text": "GST stands for ____.",
            "answer": "Goods and Services Tax",
            "solution": "GST is a comprehensive indirect tax levied on manufacture, sale and consumption of goods and services.",
        },
        {
            "type": "mcq", "difficulty": 0.4,
            "text": "When government expenditure exceeds revenue receipts, it is called:",
            "options": ["Fiscal deficit", "Trade deficit", "Current account deficit", "Budget surplus"],
            "answer": "Fiscal deficit",
            "solution": "Fiscal deficit = Total expenditure – Total revenue receipts (excluding borrowings).",
        },
        {
            "type": "mcq", "difficulty": 0.5,
            "text": "Which tax is levied by the Central Government but collected and appropriated by States?",
            "options": ["IGST", "CGST", "SGST", "UTGST"],
            "answer": "IGST",
            "solution": "IGST (Integrated GST) is levied on inter-state supply of goods and services and is collected and apportioned between Centre and States.",
        },
        {
            "type": "long_answer", "difficulty": 0.7,
            "text": "Distinguish between direct and indirect taxes with two points of difference.",
            "answer": "Direct taxes: (1) Paid directly to government by taxpayer, (2) Cannot be shifted to another person, (3) Based on ability to pay principle, (4) Examples: Income Tax, Wealth Tax. Indirect taxes: (1) Collected from consumers through sellers, (2) Can be shifted to another person, (3) Based on consumption principle, (4) Examples: GST, Excise Duty.",
            "solution": "Direct taxes are paid directly and cannot be shifted; indirect taxes are paid through intermediaries and can be passed on.",
            "verification": {"min_keywords": 8},
        },
    ]
    rng.shuffle(q_pool)
    return _build_questions(q_pool, count, rng, "Government Budget")


def gen_globalisation_india(rng: random.Random, count: int) -> List[QuestionDict]:
    """c9_econapp_extra – Globalisation and India (bonus topic)."""
    q_pool: List[Dict[str, Any]] = [
        {
            "type": "mcq", "difficulty": 0.1,
            "text": "Globalisation refers to the integration of:",
            "options": [
                "Economies of different countries",
                "States within India",
                "Different sectors within a country",
                "Rural and urban areas",
            ],
            "answer": "Economies of different countries",
            "solution": "Globalisation is the process of integrating economies of different countries through trade, investment and technology.",
        },
        {
            "type": "mcq", "difficulty": 0.3,
            "text": "India's New Economic Policy was announced in:",
            "options": ["1985", "1991", "1995", "2000"],
            "answer": "1991",
            "solution": "India announced the New Economic Policy (LPG reforms) in 1991 under Finance Minister Dr. Manmohan Singh and PM P.V. Narasimha Rao.",
        },
        {
            "type": "fill_blank", "difficulty": 0.3,
            "text": "LPG stands for Liberalisation, Privatisation and ____",
            "answer": "Globalisation",
            "solution": "LPG = Liberalisation, Privatisation, Globalisation — the three pillars of India's 1991 economic reforms.",
        },
    ]

# =============================================================================
# QUESTION_REGISTRY for auto-discovery
# =============================================================================
QUESTION_REGISTRY = {
    "economic_entities": gen_economic_entities,
    "importance_of_agriculture": gen_importance_of_agriculture,
    "sectors_of_economy": gen_sectors_of_economy,
    "economic_infrastructure": gen_economic_infrastructure,
    "social_infrastructure": gen_social_infrastructure,
}


def generate_questions(seed: int, count: int) -> List[Dict[str, Any]]:
    """Generate deterministic questions using seeded random."""
    rng = random.Random(seed)
    all_questions: List[Dict[str, Any]] = []
    for gen_func in QUESTION_REGISTRY.values():
        all_questions.extend(gen_func(rng))
    rng.shuffle(all_questions)
    result = []
    for i, q in enumerate(all_questions[:count]):
        q_copy = dict(q)
        q_copy["id"] = f"c9_econapp_{seed}_{i:03d}"
        q_copy.setdefault("question_type", q_copy.pop("type", "mcq"))
        q_copy.setdefault("topic", "economic_applications")
        q_copy.setdefault("verification", True)
        result.append(q_copy)
    return result


def verify_all_questions(questions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Validate all questions have required fields."""
    required = {"id", "question_text", "question_type", "answer", "difficulty"}
    results: Dict[str, Any] = {"errors": [], "valid": True, "count": len(questions)}
    for q in questions:
        qid = q.get("id", "unknown")
        for field in required:
            if field not in q:
                results["errors"].append(f"{qid}: missing field '{field}'")
                results["valid"] = False
    return results


if __name__ == "__main__":
    qs = generate_questions(42, 10)
    print(f"Generated {len(qs)} questions")
    v = verify_all_questions(qs)
    print(f"Valid: {v['valid']}, Errors: {len(v['errors'])}")
    for q in qs[:3]:
        print(f"  {q['id']}: {q.get('question_text', q.get('text', ''))[:60]}")