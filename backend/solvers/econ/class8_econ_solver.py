"""Class 8 Economics Solver — grounded in corpus nodes c8_eco_ch1..ch3.

Chapters:
  ch1 - Production & Factors of Production (nodes c8_eco_ch1_1..12)
  ch2 - Demography & Population            (nodes c8_eco_ch2_1..12)
  ch3 - Urbanisation                       (nodes c8_eco_ch3_1..12)

Deterministic only — bank lookups and arithmetic rules, no LLM.
Fail-closed: uncovered questions return verification failed, never a guess.
"""

import random
from decimal import Decimal, ROUND_HALF_UP
from typing import Any, Dict, List

# ---------------------------------------------------------------------------
# QUESTION BANKS — grounded in corpus node definitions.
# ---------------------------------------------------------------------------

_BANK_CH1_MCQ = [
    {"q": "Which of these lists the four factors of production?",
     "options": {"A": "land, labour, capital and entrepreneurship",
                 "B": "roads, banks, markets and money",
                 "C": "births, deaths, migration and growth",
                 "D": "primary, secondary, tertiary and quaternary"},
     "answer": "A", "node": "c8_eco_ch1_2"},
    {"q": "Soil, water, minerals and forests provided by nature are collectively called:",
     "options": {"A": "capital", "B": "land", "C": "labour", "D": "entrepreneurship"},
     "answer": "B", "node": "c8_eco_ch1_3"},
    {"q": "The physical and mental human effort used to produce goods and services is:",
     "options": {"A": "labour", "B": "land", "C": "technology", "D": "capital"},
     "answer": "A", "node": "c8_eco_ch1_4"},
    {"q": "Tools, machinery, factory buildings and working money are examples of:",
     "options": {"A": "capital", "B": "land", "C": "labour", "D": "services"},
     "answer": "A", "node": "c8_eco_ch1_5"},
    {"q": "The factor of production that combines the other three and takes financial risk is:",
     "options": {"A": "entrepreneurship", "B": "labour", "C": "land", "D": "capital"},
     "answer": "A", "node": "c8_eco_ch1_6"},
    {"q": "The stock of skills, knowledge and health that makes workers productive is called:",
     "options": {"A": "human capital", "B": "physical infrastructure",
                 "C": "fixed deposit", "D": "urban legacy"},
     "answer": "A", "node": "c8_eco_ch1_7"},
    {"q": "Teaching, banking and transport are examples of:",
     "options": {"A": "services", "B": "goods", "C": "land", "D": "barter"},
     "answer": "A", "node": "c8_eco_ch1_10"},
    {"q": "Producing goods in a way that does not deplete natural assets is called:",
     "options": {"A": "sustainable production", "B": "mass production",
                 "C": "urbanisation", "D": "migration"},
     "answer": "A", "node": "c8_eco_ch1_12"},
]

_BANK_CH2_MCQ = [
    {"q": "The scientific and statistical study of human populations is called:",
     "options": {"A": "demography", "B": "cartography", "C": "topography", "D": "geology"},
     "answer": "A", "node": "c8_eco_ch2_1"},
    {"q": "Population size, structure and distribution are the components of:",
     "options": {"A": "demography", "B": "production", "C": "barter", "D": "urban legacy"},
     "answer": "A", "node": "c8_eco_ch2_2"},
    {"q": "The average number of people living per square kilometre is called:",
     "options": {"A": "population density", "B": "crude birth rate",
                 "C": "demographic dividend", "D": "population ageing"},
     "answer": "A", "node": "c8_eco_ch2_5"},
    {"q": "Crude Birth Rate is expressed per:",
     "options": {"A": "1,000 people per year", "B": "100 families per decade",
                 "C": "1,00,000 households", "D": "square kilometre"},
     "answer": "A", "node": "c8_eco_ch2_6"},
    {"q": "Movement of people across boundaries to settle in a new place is:",
     "options": {"A": "migration", "B": "urbanisation", "C": "production", "D": "density"},
     "answer": "A", "node": "c8_eco_ch2_7"},
    {"q": "Economic growth potential from a rising working-age (15-59) share is called the:",
     "options": {"A": "demographic dividend", "B": "population ageing",
                 "C": "rural-urban gap", "D": "double coincidence"},
     "answer": "A", "node": "c8_eco_ch2_9"},
    {"q": "A rising proportion of elderly (60/65+) in the population is called:",
     "options": {"A": "population ageing", "B": "demographic dividend",
                 "C": "population explosion", "D": "migration"},
     "answer": "A", "node": "c8_eco_ch2_10"},
    {"q": "Governments use demographic data mainly for:",
     "options": {"A": "planning schools, hospitals and services",
                 "B": "printing currency", "C": "fixing bank interest",
                 "D": "running stock exchanges"},
     "answer": "A", "node": "c8_eco_ch2_12"},
]

_BANK_CH3_MCQ = [
    {"q": "A settlement with high population density where most workers do non-farm jobs is:",
     "options": {"A": "an urban area", "B": "a weekly market", "C": "rural land", "D": "a haat"},
     "answer": "A", "node": "c8_eco_ch3_1"},
    {"q": "The process by which a rising share of people comes to live in urban areas is:",
     "options": {"A": "urbanisation", "B": "migration only",
                 "C": "sustainable production", "D": "demography"},
     "answer": "A", "node": "c8_eco_ch3_4"},
    {"q": "Manufacturing and construction activities in cities are classified as:",
     "options": {"A": "secondary activities", "B": "primary activities",
                 "C": "quaternary activities", "D": "agricultural activities"},
     "answer": "A", "node": "c8_eco_ch3_5"},
    {"q": "Housing shortages, traffic congestion and pollution from rapid city growth are:",
     "options": {"A": "challenges of urbanisation", "B": "demographic dividends",
                 "C": "factors of production", "D": "payment systems"},
     "answer": "A", "node": "c8_eco_ch3_8"},
    {"q": "A densely populated area with sub-standard, self-built housing is a:",
     "options": {"A": "slum (informal settlement)", "B": "smart city",
                 "C": "municipal corporation", "D": "urban legacy"},
     "answer": "A", "node": "c8_eco_ch3_9"},
    {"q": "A city that uses digital technology and data sensors to optimise services is a:",
     "options": {"A": "Smart City", "B": "slum", "C": "haat", "D": "village"},
     "answer": "A", "node": "c8_eco_ch3_10"},
    {"q": "Constitutionally mandated urban local self-government institutions are called:",
     "options": {"A": "Urban Local Bodies", "B": "gram panchayats",
                 "C": "stock exchanges", "D": "commercial banks"},
     "answer": "A", "node": "c8_eco_ch3_11"},
    {"q": "Village-to-city movement driven by rural push and urban pull factors is:",
     "options": {"A": "rural-urban migration", "B": "population ageing",
                 "C": "barter", "D": "urban planning"},
     "answer": "A", "node": "c8_eco_ch3_12"},
]

_BANK_CH1_FILL = [
    {"q": "The economic resources land, labour, capital and entrepreneurship are called factors of ______.",
     "answer": "production", "node": "c8_eco_ch1_2"},
    {"q": "All natural resources provided freely by nature are grouped under the factor ______.",
     "answer": "land", "node": "c8_eco_ch1_3"},
    {"q": "Wages and salaries are the reward received for the factor called ______.",
     "answer": "labour", "node": "c8_eco_ch1_4"},
    {"q": "The skills, knowledge and health embodied in workers form ______ capital.",
     "answer": "human", "node": "c8_eco_ch1_7"},
    {"q": "Tangible objects like steel or rice that can be touched and stored are ______.",
     "answer": "goods", "node": "c8_eco_ch1_10"},
]

_BANK_CH2_FILL = [
    {"q": "The statistical study of human populations is called ______.",
     "answer": "demography", "node": "c8_eco_ch2_1"},
    {"q": "People per square kilometre of land measures population ______.",
     "answer": "density", "node": "c8_eco_ch2_5"},
    {"q": "Deaths per 1,000 people per year make up the Crude ______ Rate.",
     "answer": "death", "node": "c8_eco_ch2_6"},
    {"q": "A rising share of people aged 60/65 and above indicates population ______.",
     "answer": "ageing", "node": "c8_eco_ch2_10"},
]

_BANK_CH3_FILL = [
    {"q": "The increasing percentage of a country's people living in urban areas is ______.",
     "answer": "urbanisation", "node": "c8_eco_ch3_4"},
    {"q": "Dense settlements with sub-standard, self-built housing are called ______.",
     "answer": "slums", "node": "c8_eco_ch3_9"},
    {"q": "City self-government institutions such as municipalities are Urban Local ______.",
     "answer": "Bodies", "node": "c8_eco_ch3_11"},
    {"q": "Designing land use and transport for efficient cities is urban ______.",
     "answer": "planning", "node": "c8_eco_ch3_7"},
]

_ALL_MCQ_BANKS = {"ch1": _BANK_CH1_MCQ, "ch2": _BANK_CH2_MCQ, "ch3": _BANK_CH3_MCQ}
_ALL_FILL_BANKS = {"ch1": _BANK_CH1_FILL, "ch2": _BANK_CH2_FILL, "ch3": _BANK_CH3_FILL}


def _fail(topic: str, reason: str) -> Dict[str, Any]:
    return {
        "answer": None,
        "steps": [f"Cannot answer deterministically: {reason}"],
        "verification": {"passed": False, "details": f"{topic}: {reason}"},
    }


def solve_mcq(params: Dict[str, Any]) -> Dict[str, Any]:
    """Answer an MCQ by exact lookup in the grounded banks. Fail-closed."""
    question = (params.get("question") or "").strip()
    user_answer = params.get("user_answer")
    for bank in _ALL_MCQ_BANKS.values():
        for entry in bank:
            if entry["q"].strip() == question:
                correct = entry["answer"]
                return {
                    "answer": {
                        "correct_option": correct,
                        "correct_text": entry["options"][correct],
                        "user_correct": user_answer == correct if user_answer else None,
                    },
                    "steps": [
                        f"Matched the question against the Class 8 Economics bank ({entry['node']})",
                        f"Recalled the fact: {entry['options'][correct]}",
                        f"Selected option {correct}",
                    ],
                    "verification": {"passed": True, "details": entry["node"]},
                }
    return _fail("solve_mcq", "question not in the grounded bank — refusing to guess")


def solve_fill_blank(params: Dict[str, Any]) -> Dict[str, Any]:
    """Fill-in-the-blank by exact lookup. Fail-closed."""
    question = (params.get("question") or "").strip()
    for bank in _ALL_FILL_BANKS.values():
        for entry in bank:
            if entry["q"].strip() == question:
                return {
                    "answer": {"word": entry["answer"]},
                    "steps": [
                        f"Matched the sentence against the grounded bank ({entry['node']})",
                        f"Filled the blank with '{entry['answer']}'",
                    ],
                    "verification": {"passed": True, "details": entry["node"]},
                }
    return _fail("solve_fill_blank", "question not in the grounded bank — refusing to guess")


def solve_numerical(params: Dict[str, Any]) -> Dict[str, Any]:
    """Demography arithmetic: population density, natural growth, working-age share.

    params keys:
      density:        {population, area_sq_km}
      natural_growth: {cbr, cdr}           (rates per 1,000)
      working_share:  {working_age, total_population}
    """
    if "density" in params:
        d = params["density"]
        pop, area = Decimal(str(d["population"])), Decimal(str(d["area_sq_km"]))
        if area <= 0:
            return _fail("solve_numerical", "area must be positive")
        density = (pop / area).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        return {
            "answer": {"density_per_sq_km": float(density)},
            "steps": [
                f"Population density = population / area = {pop} / {area}",
                "Divide and round to two decimal places",
                f"Density = {density} people per sq km",
            ],
            "verification": {"passed": True, "details": "density = pop/area"},
        }
    if "natural_growth" in params:
        g = params["natural_growth"]
        cbr, cdr = Decimal(str(g["cbr"])), Decimal(str(g["cdr"]))
        growth = (cbr - cdr).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        return {
            "answer": {"natural_growth_rate": float(growth),
                       "interpretation": "per 1,000 people per year"},
            "steps": [
                "Natural growth = Crude Birth Rate - Crude Death Rate",
                f"= {cbr} - {cdr} = {growth} per 1,000",
                "Note: migration is NOT part of natural growth",
            ],
            "verification": {"passed": True, "details": "growth = cbr - cdr"},
        }
    if "working_share" in params:
        w = params["working_share"]
        working, total = Decimal(str(w["working_age"])), Decimal(str(w["total_population"]))
        if total <= 0:
            return _fail("solve_numerical", "total population must be positive")
        share = (working / total * 100).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        return {
            "answer": {"working_age_share_percent": float(share)},
            "steps": [
                f"Working-age share = (working-age / total) x 100 = ({working} / {total}) x 100",
                f"= {share}%",
                "A high share signals demographic-dividend potential (ages 15-59)",
            ],
            "verification": {"passed": True, "details": "share = working/total x 100"},
        }
    return _fail("solve_numerical", "no recognised numerical pattern in params")


def solve(params: Dict[str, Any]) -> Dict[str, Any]:
    """Dispatcher by declared type, else inferred from payload shape."""
    qtype = params.get("type") or params.get("question_type")
    if qtype == "numerical":
        return solve_numerical(params)
    if qtype in ("mcq", "MCQ", "multiple_choice"):
        return solve_mcq(params)
    if qtype in ("fill_blank", "fill", "fill_in_the_blank"):
        return solve_fill_blank(params)
    if any(k in params for k in ("density", "natural_growth", "working_share")):
        return solve_numerical(params)
    if params.get("options"):
        return solve_mcq(params)
    if "______" in (params.get("question") or ""):
        return solve_fill_blank(params)
    return _fail("solve", "could not classify the question — refusing to guess")


SOLVER_REGISTRY = {
    "c8_eco_mcq": solve_mcq,
    "c8_eco_fill_blank": solve_fill_blank,
    "c8_eco_numerical": solve_numerical,
    "c8_eco_solve": solve,
}


class Class8EconQuestionGenerator:
    """Deterministic practice-question generator over the same grounded banks."""

    TOPIC_BY_CH = {
        "ch1": "Production and Factors of Production",
        "ch2": "Demography and Population",
        "ch3": "Urbanisation",
    }

    def __init__(self, seed: int = 0):
        self.rng = random.Random(seed)

    def _gen_numerical(self) -> Dict[str, Any]:
        pattern = self.rng.choice(["density", "growth", "share"])
        if pattern == "density":
            area = self.rng.choice([40, 55, 70, 90, 120, 250])
            pop = area * self.rng.randint(2, 40)
            ans = round(pop / area, 2)
            return {
                "id": f"c8eco_num_{self.rng.randint(1000, 9999)}",
                "type": "numerical", "topic": self.TOPIC_BY_CH["ch2"],
                "difficulty": "medium",
                "question": (f"A district has a population of {pop:,} living in "
                             f"{area} square kilometres. Calculate its population density."),
                "options": {}, "answer": ans, "tolerance": 0.01,
                "params": {"density": {"population": pop, "area_sq_km": area}},
                "explanation": "Density = population / area (people per sq km).",
            }
        if pattern == "growth":
            cbr = Decimal(self.rng.randint(14, 30))
            cdr = Decimal(self.rng.randint(4, 12))
            ans = float(cbr - cdr)
            return {
                "id": f"c8eco_num_{self.rng.randint(1000, 9999)}",
                "type": "numerical", "topic": self.TOPIC_BY_CH["ch2"],
                "difficulty": "medium",
                "question": (f"A country's Crude Birth Rate is {cbr} and its Crude Death Rate "
                             f"is {cdr} (both per 1,000 people). Find the natural growth rate."),
                "options": {}, "answer": ans, "tolerance": 0.01,
                "params": {"natural_growth": {"cbr": float(cbr), "cdr": float(cdr)}},
                "explanation": "Natural growth = CBR - CDR (per 1,000 people per year).",
            }
        total = self.rng.choice([1000, 2000, 5000, 10000])
        working = int(total * self.rng.randint(50, 68) / 100)
        ans = round(working / total * 100, 2)
        return {
            "id": f"c8eco_num_{self.rng.randint(1000, 9999)}",
            "type": "numerical", "topic": self.TOPIC_BY_CH["ch2"],
            "difficulty": "hard",
            "question": (f"Out of {total:,} people, {working:,} are of working age (15-59). "
                         "What percentage of the population is of working age?"),
            "options": {}, "answer": ans, "tolerance": 0.01,
            "params": {"working_share": {"working_age": working, "total_population": total}},
            "explanation": "Working-age share = (working-age / total) x 100.",
        }

    def generate_questions(self, count: int = 10) -> List[Dict[str, Any]]:
        out: List[Dict[str, Any]] = []
        for i in range(max(0, count)):
            roll = i % 4
            if roll == 3:
                out.append(self._gen_numerical())
                continue
            use_mcq = roll != 2
            ch = self.rng.choice(list(_ALL_MCQ_BANKS.keys() if use_mcq else _ALL_FILL_BANKS.keys()))
            if use_mcq:
                e = self.rng.choice(_ALL_MCQ_BANKS[ch])
                out.append({
                    "id": f"c8eco_{e['node']}_{self.rng.randint(1000, 9999)}",
                    "type": "mcq", "topic": self.TOPIC_BY_CH[ch],
                    "difficulty": "medium", "question": e["q"],
                    "options": e["options"], "answer": e["answer"],
                    "explanation": f"Grounded in the Class 8 Economics corpus ({e['node']}).",
                })
            else:
                e = self.rng.choice(_ALL_FILL_BANKS[ch])
                out.append({
                    "id": f"c8eco_{e['node']}_{self.rng.randint(1000, 9999)}",
                    "type": "fill_blank", "topic": self.TOPIC_BY_CH[ch],
                    "difficulty": "easy", "question": e["q"],
                    "options": {}, "answer": e["answer"],
                    "explanation": f"Grounded in the Class 8 Economics corpus ({e['node']}).",
                })
        return out


QUESTION_GEN_REGISTRY = {
    "c8_eco_questions": Class8EconQuestionGenerator,
}
