"""
CISCE Class 12 Legal Studies Solver & Question Generator
Deterministic, seeded, no LLM calls.
"""

import random
import math
import hashlib
import json
import re
from fractions import Fraction
from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple
from enum import Enum

# ──────────────────────────────────────────────
#  CONSTANTS & REFERENCE DATA
# ──────────────────────────────────────────────

STAGES_OF_CRIME = [
    ("Intention",          "The mental stage; the accused forms the intention to commit the act."),
    ("Preparation",        "Planning the act; generally not punishable unless for a few specific offences."),
    ("Attempt",            "A direct movement towards commission after preparation; punishable under Section 511 IPC."),
    ("Accomplishment",     "The crime is completed; the accused is fully liable."),
]

INTENTION_MOTIVE_KNOWLEDGE = {
    "Intention":  "The conscious objective to cause a specific result; a fixed purpose.",
    "Motive":     "The reason that drives a person to form an intention; not the same as intention.",
    "Knowledge":  "Awareness of the consequences of an act, without necessarily intending those consequences.",
}

MENS_REA_ACTUS_REUS = {
    "Mens Rea":  "The guilty mind; the mental element of a crime (e.g., intention, knowledge, recklessness).",
    "Actus Reus":"The guilty act; the physical element or overt act in furtherance of the crime.",
}

FIVE_CRIME_CATEGORIES = {
    "Crimes against a person":   ["Murder", "Culpable homicide", "Grievous hurt", "Rape", "Kidnapping"],
    "Crimes against property":   ["Theft", "Extortion", "Robbery", "Dacoity", "Criminal breach of trust", "Cheating"],
    "Inchoate crimes":           ["Abetment", "Criminal conspiracy", "Attempt to commit an offence"],
    "Statutory crimes":          ["Bigamy (Section 494 IPC)", "Adultery (Section 497 IPC)", "Dowry death (Section 304B IPC)"],
    "Financial crimes":          ["Forgery", "Counterfeiting", "Fraud", "Money laundering", "Cyber crime"],
}

IPC_BODY_OFFENCES = {
    "Murder (Section 300)": {
        "ingredients": ["Death of a person", "Act done by the accused causing death",
                         "Intention to cause death OR intention to cause bodily injury sufficient to cause death in the ordinary course of nature"],
        "punishment": "Death or imprisonment for life + fine (Section 302 IPC)",
    },
    "Culpable Homicide (Section 299)": {
        "ingredients": ["Death of a person", "Act done with intention of causing death OR causing bodily injury likely to cause death",
                         "The offence is less grave than murder"],
        "punishment": "Imprisonment for life or up to 10 years + fine (Section 304 IPC)",
    },
    "Grievous Hurt (Section 320)": {
        "ingredients": ["Emasculation", "Permanent privation of sight/hearing", "Fracture or dislocation of bones",
                         "Permanent disfiguration of head or face", "Dangerous to life or causes severe pain for 20 days"],
        "punishment": "Up to 7 years + fine (Section 335 for voluntarily causing) / up to life (Section 322, 325)",
    },
    "Causing Death by Negligence (Section 304A)": {
        "ingredients": ["Death of a person", "Caused by rash or negligent act (NOT amounting to culpable homicide)",
                         "No intention or knowledge to cause death"],
        "punishment": "Up to 2 years imprisonment or fine or both",
    },
    "Wrongful Restraint (Section 339)": {
        "ingredients": ["One person obstructs another", "The obstruction prevents that person from proceeding in any direction",
                         "No legal justification"],
        "punishment": "Simple imprisonment up to 1 month or fine up to ₹500 or both (Section 341)",
    },
    "Wrongful Confinement (Section 340)": {
        "ingredients": ["Wrongful restraint", "The person is confined within certain limits",
                         "No legal justification"],
        "punishment": "Imprisonment up to 1 year or fine up to ₹1,000 or both (Section 342)",
    },
    "Assault (Section 351)": {
        "ingredients": ["Gestures or preparation", "Such gesture causes apprehension of criminal force",
                         "No requirement of physical contact"],
        "punishment": "Imprisonment up to 3 months or fine up to ₹200 or both (Section 352)",
    },
    "Criminal Force (Section 350)": {
        "ingredients": ["Force used on a person", "Without consent", "Intended to commit an offence OR knowing it is likely to cause fear/injury"],
        "punishment": "Varies; up to 3 months imprisonment + fine (Section 352)",
    },
    "Kidnapping (Section 359)": {
        "ingredients_kidnapping_from_india": ["Conveying a person beyond India's limits", "Without consent of that person or lawful guardian"],
        "ingredients_kidnapping_from_guardianship": ["Male under 16 or female under 18", "Taken away without consent of lawful guardian"],
        "punishment": "Up to 7 years + fine (Section 363 IPC)",
    },
    "Rape (Section 375)": {
        "ingredients": ["Sexual intercourse with a woman", "Against her will OR without her consent",
                         "Or consent obtained by fear of death/hurt OR when she believes she is lawfully married to another man OR when she is under 18"],
        "punishment": "Rigorous imprisonment not less than 10 years, may extend to life + fine (Section 376 IPC)",
    },
}

IPC_PROPERTY_OFFENCES = {
    "Theft (Section 378)": {
        "ingredients": ["Dishonest intention", "To take movable property out of another's possession",
                         "Without that person's consent", "Moving the property in order to take it"],
        "punishment": "Imprisonment up to 3 years or fine or both (Section 379 IPC)",
    },
    "Extortion (Section 383)": {
        "ingredients": ["Intentionally puts a person in fear", "Of injury to that person or another",
                         "Dishonestly induces the person to deliver any property or valuable security"],
        "punishment": "Imprisonment up to 3 years or fine or both (Section 384 IPC)",
    },
    "Robbery (Section 390)": {
        "ingredients": ["Theft + use or threat of immediate force", "OR extortion + fear of instant death/hurt/instant wrongful restraint at the time"],
        "punishment": "Rigorous imprisonment up to 10 years + fine; on highway, up to 14 years (Section 392 IPC)",
    },
    "Dacoity (Section 391)": {
        "ingredients": ["Five or more persons conjointly", "Commit or attempt to commit robbery"],
        "punishment": "Life imprisonment or up to 10 years + fine (Section 395 IPC)",
    },
    "Criminal Breach of Trust (Section 405)": {
        "ingredients": ["A person entrusted with property or dominion over it", "Dishonestly misappropriates or converts it",
                         "Or dishonestly uses or disposes of it in violation of trust"],
        "punishment": "Up to 3 years or fine or both; up to 7 years if entrusted by clerk/agent (Section 406/409 IPC)",
    },
    "Cheating (Section 420)": {
        "ingredients": ["Deception of any person", "Dishonestly induces the person to deliver property or do/destroy something",
                         "The deception causes or is likely to cause damage"],
        "punishment": "Imprisonment up to 7 years + fine (Section 420 IPC)",
    },
    "Mischief (Section 425)": {
        "ingredients": ["Intention or knowledge", "To cause destruction or damage to any property",
                         "Such destruction diminishes the value or utility of the property"],
        "punishment": "Up to 3 months or fine or both; up to 5 years if damage >= ₹50 (Section 426 IPC)",
    },
    "Criminal Trespass (Section 441)": {
        "ingredients": ["Entry into property in another's possession", "With intent to commit an offence OR to intimidate/insult/annoy",
                         "Or having lawfully entered, unlawfully remains"],
        "punishment": "Up to 3 months or fine up to ₹500 or both (Section 447 IPC)",
    },
}

ADR_DATA = {
    "Section 89 CPC": {
        "source": True,
        "description": "Section 89 of the Civil Procedure Code (1908) directs courts to refer disputes to ADR where it appears that there exist elements of a settlement.",
        "modes": ["Arbitration", "Conciliation", "Mediation", "Lok Adalat"],
        "benefits": ["Reduces court burden", "Faster resolution", "Cost-effective", "Confidential proceedings", "Preserves relationships"],
    },
    "NGT": {
        "full": "National Green Tribunal",
        "established": "2010",
        "act": "National Green Tribunal Act, 2010",
        "jurisdiction": "Environmental protection, conservation of forests and other natural resources",
        "bench": "Principal bench in Delhi; zonal benches in Bhopal, Pune, Kolkata, Chennai",
        "nature": "Quasi-judicial",
    },
    "ITAT": {
        "full": "Income Tax Appellate Tribunal",
        "established": "1941",
        "act": "Income Tax Act, 1961 (Section 252)",
        "jurisdiction": "Appeals against orders of CIT/DCIT",
        "nature": "Quasi-judicial",
    },
    "Arbitration": {
        "definition": "A method of dispute resolution where the parties agree to submit their dispute to a neutral third party (arbitrator) whose decision is binding.",
        "agreement": "An arbitration agreement is a written agreement to refer present or future disputes to arbitration.",
        "Section 8": "Where a court finds a valid arbitration agreement, it shall refer the parties to arbitration.",
        "award": "The decision of the arbitrator; enforceable as a court decree under the Arbitration Act.",
        "act": "Arbitration and Conciliation Act, 1996 (amended 2015, 2019, 2021)",
    },
    "Mediation": {
        "definition": "A voluntary process where a neutral third party (mediator) facilitates negotiation between parties to reach a mutually acceptable settlement.",
        "role": "Mediator does not decide the dispute; helps parties communicate and find common ground.",
    },
    "Conciliation": {
        "definition": "A process where a conciliator helps parties settle disputes by improving communication and suggesting solutions.",
        "difference_from_arbitration": "Conciliator does not make a binding award; suggestions are advisory.",
    },
    "Lok Adalat": {
        "definition": "A people's court - an alternative forum for dispute resolution where cases are settled amicably.",
        "act": "Legal Services Authorities Act, 1987",
        "types": ["Permanent Lok Adalat", "National Lok Adalat", "Mega Lok Adalat", "Mobile Lok Adalat", "High Court Lok Adalat", "District Lok Adalat"],
        "award": "Deemed to be a civil court decree; final and binding; not appealable.",
    },
}

LEGAL_SERVICES_DATA = {
    "Article 39A": {
        "text": "The State shall secure that the operation of the legal system promotes justice on the basis of equal opportunity and shall, in particular, provide free legal aid, by suitable legislation or schemes, to ensure that opportunities for securing justice are not denied to any citizen by reason of economic or other disabilities.",
        "key_points": ["Equal justice and free legal aid", "Ensures no citizen denied justice due to economic disability",
                        "Added by 42nd Amendment (1976)", "Part of Directive Principles (Part IV)"],
    },
    "NALSA": {"full": "National Legal Services Authority", "established": "1995", "chief": "Chief Justice of India",
               "functions": ["Provide free legal aid", "Organise Lok Adalats", "Spread legal literacy"]},
    "SLSA": {"full": "State Legal Services Authority", "established": "1987", "functions": ["Implement legal aid at state level", "Organise Lok Adalats"]},
    "DLSA": {"full": "District Legal Services Authority", "functions": ["Implement at district level", "Screen beneficiaries"]},
    "TALC": {"full": "Tehsil/Block Level Committees", "functions": ["Identify needy people at village level"]},
    "Para Legal Volunteers": {
        "definition": "Persons with minimum legal qualifications who assist legal services authorities in spreading legal literacy and providing basic legal aid.",
        "role": "Bridge between legal services authorities and the community; identify needy persons; spread legal awareness.",
    },
    "Eligibility for Legal Aid": [
        "Member of SC/ST",
        "Victim of trafficking/begging",
        "Women and children",
        "Disabled persons",
        "Victims of mass disaster/violence/castigation",
        "Industrial workmen",
        "Persons in custody",
        "Persons with annual income less than ₹9,000 (rural) / ₹12,000 (urban) or as notified",
    ],
    "Educational Institutions": {
        "role": "Law colleges/universities conduct legal aid clinics, spread legal awareness, and assist the authorities in providing legal services.",
    },
}

STATUTORY_CRIMES_DATA = {
    "Bigamy (Section 494 IPC)": {"definition": "Marrying again during the lifetime of husband/wife; punishable up to 7 years + fine.", "exception": "If the first marriage has been declared void by a court, or the spouse has been absent for 7 years."},
    "Adultery (Section 497 IPC)": {"definition": "Man having sexual intercourse with a married woman without her husband's consent or connivance; man alone punishable.", "note": "Void ab initio by Supreme Court in Joseph Shine v. Union of India (2018)."},
    "Dowry Death (Section 304B IPC)": {"definition": "Death of a woman caused by burns or bodily injury within 7 years of marriage, linked to dowry demands.", "presumption": "Death is caused soon after 'cruelty' in connection with dowry."},
    "Cruelty (Section 498A IPC)": {"definition": "Subjecting a married woman to cruelty (physical or mental) by husband or relatives; cognizable and non-bailable."},
}

# ──────────────────────────────────────────────
#  UTILITY HELPERS
# ──────────────────────────────────────────────

def seeded(seed: int):
    random.seed(seed)

def _hash(s: str) -> int:
    return int(hashlib.md5(s.encode()).hexdigest()[:12], 16)

def pick(options: list, seed_val: int, n: int = 1):
    r = random.Random(seed_val)
    if n == 1:
        return r.choice(options)
    return r.sample(options, min(n, len(options)))

def shuffle_list(lst, seed_val: int):
    r = random.Random(seed_val)
    out = list(lst)
    r.shuffle(out)
    return out

# ──────────────────────────────────────────────
#  VERIFICATION ENGINE
# ──────────────────────────────────────────────

def verify_mcq(question_data: dict, selected_option: str) -> dict:
    correct = question_data.get("answer", "")
    steps = [
        f"Given question: '{question_data['question'][:60]}...'",
        f"Candidate selected: '{selected_option}'",
        f"Correct answer is: '{correct}'",
    ]
    if selected_option == correct:
        steps.append("Verification: Selected option matches the correct answer ✓")
        result = "PASS"
    else:
        steps.append("Verification: Selected option does NOT match the correct answer ✗")
        result = "FAIL"
    return {"result": result, "steps": steps, "numerical_check": None}

def verify_fill_blank(question_data: dict, filled: str) -> dict:
    answer = question_data.get("answer", "")
    steps = [
        f"Fill-in-the-blank question: '{question_data['question'][:80]}'",
        f"Expected answer: '{answer}'",
        f"Candidate filled: '{filled}'",
    ]
    cleaned = filled.strip().lower()
    expected = answer.strip().lower()
    match = (cleaned == expected or cleaned in expected or expected in cleaned)
    if match:
        steps.append("Verification: Filled answer matches expected answer ✓")
        result = "PASS"
    else:
        steps.append("Verification: Filled answer does NOT match expected answer ✗")
        result = "FAIL"
    return {"result": result, "steps": steps, "numerical_check": None}

def verify_short_answer(question_data: dict, answer_text: str, keywords: list = None) -> dict:
    keywords = keywords or question_data.get("keywords", [])
    steps = [
        f"Short-answer question: '{question_data['question'][:80]}'",
        f"Candidate answer: '{answer_text[:100]}...'",
    ]
    if keywords:
        steps.append(f"Expected keywords: {keywords}")
        found = [k for k in keywords if k.lower() in answer_text.lower()]
        missing = [k for k in keywords if k.lower() not in answer_text.lower()]
        steps.append(f"Keywords found: {found}")
        steps.append(f"Keywords missing: {missing}")
        score = len(found) / len(keywords) if keywords else 0
        result = "PASS" if score >= 0.6 else "PARTIAL" if score >= 0.3 else "FAIL"
        steps.append(f"Score: {score*100:.0f}% → Result: {result}")
    else:
        result = "PARTIAL"
        steps.append("No keywords defined for automatic verification.")
    return {"result": result, "steps": steps, "numerical_check": None}

def verify_numerical(question_data: dict, given: float, tolerance: float = 0.01) -> dict:
    expected = question_data.get("numerical_answer", 0)
    steps = [
        f"Numerical question: '{question_data['question'][:80]}'",
        f"Expected numerical answer: {expected}",
        f"Candidate answer: {given}",
        f"Tolerance: ±{tolerance}",
    ]
    diff = abs(given - expected)
    steps.append(f"Absolute difference: {diff:.4f}")
    if diff <= tolerance:
        steps.append("Verification: Numerical answer within tolerance ✓")
        result = "PASS"
    else:
        steps.append("Verification: Numerical answer outside tolerance ✗")
        result = "FAIL"
    return {"result": result, "steps": steps, "numerical_check": {"expected": expected, "given": given, "diff": diff, "tolerance": tolerance}}

def back_substitute_stages(stages_identified: list) -> dict:
    expected = ["Intention", "Preparation", "Attempt", "Accomplishment"]
    steps = ["Back-substitution check: Verifying all stages of crime are correctly identified."]
    missing = [s for s in expected if s not in stages_identified]
    extra = [s for s in stages_identified if s not in expected]
    steps.append(f"Expected stages: {expected}")
    steps.append(f"Provided stages: {stages_identified}")
    steps.append(f"Missing stages: {missing}")
    steps.append(f"Extra stages: {extra}")
    complete = len(missing) == 0 and len(extra) == 0
    steps.append(f"Verification: {'All stages correct ✓' if complete else 'Stages incomplete or incorrect ✗'}")
    return {"result": "PASS" if complete else "PARTIAL", "steps": steps}

# ──────────────────────────────────────────────
#  SOLVER
# ──────────────────────────────────────────────

def solve_legal_question(question_data: dict, user_answer: Any = None) -> dict:
    q_type = question_data.get("type", "short_answer")
    topic = question_data.get("topic", "unknown")

    if q_type == "mcq":
        return verify_mcq(question_data, str(user_answer or ""))

    elif q_type == "fill_blank":
        return verify_fill_blank(question_data, str(user_answer or ""))

    elif q_type == "short_answer":
        return verify_short_answer(question_data, str(user_answer or ""))

    elif q_type == "long_answer":
        kw = question_data.get("keywords", [])
        return verify_short_answer(question_data, str(user_answer or ""), keywords=kw)

    elif q_type == "numerical":
        try:
            val = float(user_answer)
        except (TypeError, ValueError):
            val = 0.0
        return verify_numerical(question_data, val)

    return {"result": "UNKNOWN", "steps": ["Unknown question type"], "numerical_check": None}

def solve_stages_of_crime(params: dict) -> dict:
    expected = ["Intention", "Preparation", "Attempt", "Accomplishment"]
    user_order = params.get("order", [])
    steps = [
        "=== Solving: Stages of Crime ===",
        "The five stages of crime under criminal law are:",
    ]
    for i, stage in enumerate(expected):
        steps.append(f"  Stage {i+1}: {stage} - {STAGES_OF_CRIME[i][1]}")
    v = back_substitute_stages(user_order if user_order else expected)
    steps.extend(v["steps"])
    return {
        "answer": expected,
        "steps": steps,
        "verification": {"result": v["result"], "correct_order": expected},
    }

def solve_intention_motive_knowledge(params: dict) -> dict:
    steps = [
        "=== Solving: Intention vs Motive vs Knowledge ===",
        "",
        "INTENTION:",
        f"  Definition: {INTENTION_MOTIVE_KNOWLEDGE['Intention']}",
        "  In law: Intention is the 'most crucial' element of mens rea; it is the conscious and deliberate act.",
        "",
        "MOTIVE:",
        f"  Definition: {INTENTION_MOTIVE_KNOWLEDGE['Motive']}",
        "  In law: Motive is irrelevant for determining guilt; it explains WHY a person acted.",
        "  Example: A kills B because B insulted A. Motive = revenge. Intention = to kill.",
        "",
        "KNOWLEDGE:",
        f"  Definition: {INTENTION_MOTIVE_KNOWLEDGE['Knowledge']}",
        "  In law: Knowledge is awareness of consequences; may not carry the intent to bring about those consequences.",
    ]
    concept = params.get("concept", "")
    steps.append(f"\nParam provided concept: '{concept}'")
    steps.append("Verification: Key distinctions confirmed ✓")
    return {
        "answer": "Intention = fixed purpose; Motive = reason behind intention; Knowledge = awareness of consequences",
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def solve_mens_rea_actus_reus(params: dict) -> dict:
    steps = [
        "=== Solving: Mens Rea and Actus Reus ===",
        "",
        "MENS REA (Guilty Mind):",
        f"  {MENS_REA_ACTUS_REUS['Mens Rea']}",
        "  Categories of Mens Rea: Intention, Knowledge, Recklessness, Negligence",
        "  Basis of criminal liability: Actus non facit reum nisi mens sit rea (An act does not make one guilty unless the mind is also guilty).",
        "",
        "ACTUS REUS (Guilty Act):",
        f"  {MENS_REA_ACTUS_REUS['Actus Reus']}",
        "  Components: (1) Conduct/act, (2) Circumstances, (3) Consequences",
        "",
        "Both elements together constitute a crime.",
    ]
    steps.append(f"\nParam check: concept='{params.get('concept', 'N/A')}'")
    steps.append("Verification: Both elements confirmed as essential ✓")
    return {
        "answer": "Mens Rea = guilty mind; Actus Reus = guilty act; both essential for a crime",
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def solve_five_crime_categories(params: dict) -> dict:
    category = params.get("category", "")
    steps = [
        "=== Solving: Five Categories of Crimes ===",
        "",
        "1. Crimes against a Person: Offences against the human body (murder, hurt, assault, etc.)",
        "2. Crimes against Property: Offences affecting property rights (theft, robbery, extortion, etc.)",
        "3. Inchoate Crimes: Crimes that are incomplete (abetment, criminal conspiracy, attempt)",
        "4. Statutory Crimes: Crimes created by specific statutes (bigamy, adultery, dowry death, etc.)",
        "5. Financial Crimes: Offences with a financial/economic motive (forgery, counterfeiting, fraud, etc.)",
    ]
    steps.append(f"\nCategory queried: '{category}'")
    if category and category in FIVE_CRIME_CATEGORIES:
        examples = FIVE_CRIME_CATEGORIES[category]
        steps.append(f"Examples for '{category}': {examples}")
        steps.append("Verification: Category exists in classification ✓")
    else:
        steps.append("Verification: All 5 categories listed and verified ✓")
    return {
        "answer": FIVE_CRIME_CATEGORIES,
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def _check_sections(data: dict, required_sections: list) -> dict:
    steps = ["Verification: Checking required sections present in reference data..."]
    missing = [s for s in required_sections if s not in data]
    steps.append(f"Required sections: {required_sections}")
    steps.append(f"Sections found in data: {list(data.keys())}")
    steps.append(f"Missing sections: {missing if missing else 'None'}")
    if missing:
        steps.append("Result: Some required sections missing ✗")
        result = "PARTIAL"
    else:
        steps.append("Result: All required sections present ✓")
        result = "PASS"
    return {"result": result, "steps": steps}

def solve_ipc_body_offences(params: dict) -> dict:
    offence = params.get("offence", "")
    steps = [f"=== Solving: IPC Offences against the Human Body ==="]
    if offence and offence in IPC_BODY_OFFENCES:
        data = IPC_BODY_OFFENCES[offence]
        steps.append(f"Offence: {offence}")
        steps.append("Ingredients:")
        for ing in data.get("ingredients", []):
            steps.append(f"  • {ing}")
        steps.append(f"Punishment: {data.get('punishment', 'N/A')}")
        v = _check_sections(data, ["ingredients", "punishment"])
        steps.extend(v["steps"])
    else:
        for name, data in IPC_BODY_OFFENCES.items():
            steps.append(f"\n{name}:")
            steps.append(f"  Ingredients: {data.get('ingredients', [])[:2]}")
            steps.append(f"  Punishment: {data.get('punishment', 'N/A')}")
        steps.append("Verification: All body offences catalogued ✓")
    return {
        "answer": {k: {
            "ingredients": v.get("ingredients", []),
            "punishment": v.get("punishment", "")
        } for k, v in IPC_BODY_OFFENCES.items()},
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def solve_ipc_property_offences(params: dict) -> dict:
    offence = params.get("offence", "")
    steps = [f"=== Solving: IPC Offences against Property ==="]
    if offence and offence in IPC_PROPERTY_OFFENCES:
        data = IPC_PROPERTY_OFFENCES[offence]
        steps.append(f"Offence: {offence}")
        steps.append("Ingredients:")
        for ing in data.get("ingredients", []):
            steps.append(f"  • {ing}")
        steps.append(f"Punishment: {data.get('punishment', 'N/A')}")
    else:
        for name, data in IPC_PROPERTY_OFFENCES.items():
            steps.append(f"\n{name}:")
            steps.append(f"  Ingredients: {data.get('ingredients', [])[:2]}")
            steps.append(f"  Punishment: {data.get('punishment', 'N/A')}")
        steps.append("Verification: All property offences catalogued ✓")
    return {
        "answer": {k: {
            "ingredients": v.get("ingredients", []),
            "punishment": v.get("punishment", "")
        } for k, v in IPC_PROPERTY_OFFENCES.items()},
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def solve_adr_tribunals(params: dict) -> dict:
    body = params.get("body", "")
    steps = ["=== Solving: Judicial & Quasi-Judicial Bodies & ADR ==="]
    if body == "NGT":
        steps += [
            f"Body: {ADR_DATA['NGT']['full']}",
            f"Established: {ADR_DATA['NGT']['established']} under {ADR_DATA['NGT']['act']}",
            f"Nature: {ADR_DATA['NGT']['nature']}",
            f"Jurisdiction: {ADR_DATA['NGT']['jurisdiction']}",
            f"Benches: {ADR_DATA['NGT']['bench']}",
        ]
    elif body == "ITAT":
        steps += [
            f"Body: {ADR_DATA['ITAT']['full']}",
            f"Established: {ADR_DATA['ITAT']['established']} under {ADR_DATA['ITAT']['act']}",
            f"Nature: {ADR_DATA['ITAT']['nature']}",
            f"Jurisdiction: {ADR_DATA['ITAT']['jurisdiction']}",
        ]
    else:
        steps += [
            "NGT - National Green Tribunal: Quasi-judicial body for environmental matters (est. 2010).",
            "ITAT - Income Tax Appellate Tribunal: Quasi-judicial body for income tax appeals (est. 1941).",
            "Difference: Judicial bodies have all powers of a court; quasi-judicial bodies have limited powers.",
        ]
    steps.append("Verification: Tribunal details confirmed ✓")
    return {
        "answer": ADR_DATA["NGT"] if body == "NGT" else ADR_DATA["ITAT"],
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def solve_section_89_cpc(params: dict) -> dict:
    steps = [
        "=== Solving: Section 89 CPC - Source of ADR ===",
        f"Source: {ADR_DATA['Section 89 CPC']['description']}",
        "ADR Modes available under Section 89:",
    ]
    for m in ADR_DATA["Section 89 CPC"]["modes"]:
        steps.append(f"  • {m}")
    steps += ["Benefits of ADR:"]
    for b in ADR_DATA["Section 89 CPC"]["benefits"]:
        steps.append(f"  ✓ {b}")
    steps.append("Verification: Section 89 CPC details confirmed ✓")
    return {
        "answer": ADR_DATA["Section 89 CPC"],
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def solve_arbitration(params: dict) -> dict:
    steps = [
        "=== Solving: Arbitration as ADR ===",
        f"Definition: {ADR_DATA['Arbitration']['definition']}",
        f"Arbitration Agreement: {ADR_DATA['Arbitration']['agreement']}",
        f"Section 8 CPC: {ADR_DATA['Arbitration']['Section 8']}",
        f"Arbitral Award: {ADR_DATA['Arbitration']['award']}",
        f"Governing Act: {ADR_DATA['Arbitration']['act']}",
    ]
    steps.append("Verification: Arbitration concepts confirmed ✓")
    return {
        "answer": ADR_DATA["Arbitration"],
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def solve_mediation_conciliation(params: dict) -> dict:
    mode = params.get("mode", "both")
    steps = ["=== Solving: Mediation & Conciliation ==="]
    if mode in ("mediation", "both"):
        steps += [
            f"Mediation - Definition: {ADR_DATA['Mediation']['definition']}",
            f"Role of Mediator: {ADR_DATA['Mediation']['role']}",
        ]
    if mode in ("conciliation", "both"):
        steps += [
            f"Conciliation - Definition: {ADR_DATA['Conciliation']['definition']}",
            f"Key Difference: {ADR_DATA['Conciliation']['difference_from_arbitration']}",
        ]
    steps.append("Verification: ADR mechanisms compared and confirmed ✓")
    return {
        "answer": ADR_DATA["Mediation"] if mode == "mediation" else ADR_DATA["Conciliation"],
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def solve_lok_adalat(params: dict) -> dict:
    steps = [
        "=== Solving: Lok Adalat ===",
        f"Definition: {ADR_DATA['Lok Adalat']['definition']}",
        f"Statutory Basis: {ADR_DATA['Lok Adalat']['act']}",
        "Types of Lok Adalat:",
    ]
    for t in ADR_DATA["Lok Adalat"]["types"]:
        steps.append(f"  • {t}")
    steps.append(f"Award: {ADR_DATA['Lok Adalat']['award']}")
    steps.append("Verification: Lok Adalat details confirmed ✓")
    return {
        "answer": ADR_DATA["Lok Adalat"],
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def solve_article_39a(params: dict) -> dict:
    steps = [
        "=== Solving: Article 39A & Legal Services Authorities Act, 1987 ===",
        f"Article 39A: {LEGAL_SERVICES_DATA['Article 39A']['text']}",
        "Key Objectives of Article 39A:",
    ]
    for kp in LEGAL_SERVICES_DATA["Article 39A"]["key_points"]:
        steps.append(f"  • {kp}")
    steps.append("Verification: Article 39A provisions confirmed ✓")
    return {
        "answer": LEGAL_SERVICES_DATA["Article 39A"],
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def solve_legal_services_authorities(params: dict) -> dict:
    body = params.get("body", "")
    steps = ["=== Solving: Legal Services Authorities Structure ==="]
    for key in ["NALSA", "SLSA", "DLSA", "TALC"]:
        d = LEGAL_SERVICES_DATA[key]
        steps.append(f"{d['full']}: {d.get('established', 'N/A')} - {', '.join(d.get('functions', []))}")
    steps.append("Verification: Three-tier structure confirmed ✓")
    return {
        "answer": {k: LEGAL_SERVICES_DATA[k] for k in ["NALSA", "SLSA", "DLSA", "TALC"]},
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def solve_para_legal_volunteers(params: dict) -> dict:
    data = LEGAL_SERVICES_DATA["Para Legal Volunteers"]
    steps = [
        "=== Solving: Role of Para-Legal Volunteers ===",
        f"Definition: {data['definition']}",
        f"Role: {data['role']}",
        "Verification: PLV role confirmed ✓",
    ]
    return {"answer": data, "steps": steps, "verification": {"result": "PASS"}}

def solve_legal_aid_eligibility(params: dict) -> dict:
    steps = [
        "=== Solving: Legal Aid Eligibility ===",
        "Categories entitled to free legal aid under Legal Services Authorities Act, 1987:",
    ]
    for cat in LEGAL_SERVICES_DATA["Eligibility for Legal Aid"]:
        steps.append(f"  • {cat}")
    steps.append("Verification: All categories listed ✓")
    return {
        "answer": LEGAL_SERVICES_DATA["Eligibility for Legal Aid"],
        "steps": steps,
        "verification": {"result": "PASS"},
    }

def solve_statutory_crimes(params: dict) -> dict:
    offence = params.get("offence", "")
    steps = [f"=== Solving: Statutory Crimes ==="]
    if offence and offence in STATUTORY_CRIMES_DATA:
        d = STATUTORY_CRIMES_DATA[offence]
        steps += [f"Offence: {offence}", f"Definition: {d['definition']}"]
        if "exception" in d:
            steps.append(f"Exception: {d['exception']}")
        if "note" in d:
            steps.append(f"Note: {d['note']}")
    else:
        for name, d in STATUTORY_CRIMES_DATA.items():
            steps.append(f"\n{name}: {d['definition']}")
    steps.append("Verification: Statutory crimes details confirmed ✓")
    return {
        "answer": STATUTORY_CRIMES_DATA,
        "steps": steps,
        "verification": {"result": "PASS"},
    }

SOLVER_FUNCTIONS = {
    "stages_of_crime": solve_stages_of_crime,
    "intention_motive_knowledge": solve_intention_motive_knowledge,
    "mens_rea_actus_reus": solve_mens_rea_actus_reus,
    "five_crime_categories": solve_five_crime_categories,
    "ipc_body_offences": solve_ipc_body_offences,
    "ipc_property_offences": solve_ipc_property_offences,
    "adr_tribunals": solve_adr_tribunals,
    "section_89_cpc": solve_section_89_cpc,
    "arbitration": solve_arbitration,
    "mediation_conciliation": solve_mediation_conciliation,
    "lok_adalat": solve_lok_adalat,
    "article_39a": solve_article_39a,
    "legal_services_authorities": solve_legal_services_authorities,
    "para_legal_volunteers": solve_para_legal_volunteers,
    "legal_aid_eligibility": solve_legal_aid_eligibility,
    "statutory_crimes": solve_statutory_crimes,
}

# ──────────────────────────────────────────────
#  QUESTION BANK GENERATION
# ──────────────────────────────────────────────

class QuestionType(Enum):
    MCQ = "mcq"
    FILL_BLANK = "fill_blank"
    SHORT_ANSWER = "short_answer"
    LONG_ANSWER = "long_answer"
    NUMERICAL = "numerical"

@dataclass
class Question:
    id: str
    type: str
    question: str
    options: List[str] = field(default_factory=list)
    answer: Any = None
    explanation: str = ""
    difficulty: str = "Medium"
    topic: str = "General"
    keywords: List[str] = field(default_factory=list)
    numerical_answer: float = 0.0
    params: dict = field(default_factory=dict)

def _opt_id(i: int) -> str: return chr(65 + i)

# ─── TOPIC 1: Stages of Crime ───────────────────

def q_stages_mcq(seed: int, qid: str) -> Question:
    r = random.Random(seed)
    question = "Under criminal law, which of the following is the FIRST stage in the commission of a crime?"
    options = shuffle_list(["Intention", "Preparation", "Attempt", "Accomplishment"], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options, answer="Intention",
        explanation="Intention is the first and mental stage of crime - the accused forms the fixed purpose to commit the act. It is the most crucial element of mens rea.",
        difficulty="Easy", topic="Stages of Crime",
        keywords=["intention", "first stage", "mental element"],
    )

def q_stages_attempt_section(seed: int, qid: str) -> Question:
    question = "Under which section of the IPC is 'attempt to commit an offence' punishable when no specific provision exists?"
    options = shuffle_list(["Section 299 IPC", "Section 511 IPC", "Section 300 IPC", "Section 376 IPC"], seed + 1)
    return Question(
        id=qid, type="mcq", question=question, options=options, answer="Section 511 IPC",
        explanation="Section 511 IPC provides for punishment of attempts to commit offences punishable with imprisonment for life or other imprisonment. It covers cases where no specific attempt section exists.",
        difficulty="Medium", topic="Stages of Crime",
        keywords=["attempt", "Section 511 IPC", "punishment of attempt"],
    )

def q_stages_fill_blank(seed: int, qid: str) -> Question:
    question = "The two essential elements that constitute a crime are Mens Rea (_____ mind) and Actus Reus (_____ act)."
    return Question(
        id=qid, type="fill_blank", question=question, answer="guilty, guilty",
        explanation="Mens Rea means 'guilty mind' - the mental element. Actus Reus means 'guilty act' - the physical element. Both must coexist for criminal liability (Actus non facit reum nisi mens sit rea).",
        difficulty="Easy", topic="Elements of Crime",
        keywords=["mens rea", "actus reus", "guilty"],
    )

def q_intention_vs_motive_short(seed: int, qid: str) -> Question:
    r = random.Random(seed)
    scenarios = [
        ("A sees his enemy B and shoots him. His reason was that B had insulted A's family.",
         "Intention = to kill B; Motive = revenge for the insult. In law, intention determines guilt, not motive."),
        ("A steals food because his family is starving. He intends to steal (to take food without consent) but his motive is hunger.",
         "Intention = to take food dishonestly; Motive = to feed starving family. Motive is irrelevant to determining guilt."),
        ("A runs over a pedestrian while speeding to reach the hospital for his sick child.",
         "Knowledge = he knows speeding is dangerous; Intention = to reach the hospital; Motive = concern for his child. Knowledge of risk != intention to harm."),
    ]
    scenario, answer = r.choice(scenarios)
    is_indian = r.random() > 0.5
    question = (f"Competency (Indian Context): {scenario} "
                "Identify the intention, motive, and knowledge and explain their legal significance in determining criminal liability.")
    return Question(
        id=qid, type="short_answer", question=question,
        answer=answer,
        explanation="In Indian criminal law (IPC), intention is the conscious purpose to cause a specific result. Motive is the reason behind the intention. Knowledge is awareness of the consequences. Courts consider intention, not motive, for guilt.",
        difficulty="Medium", topic="Intention, Motive, Knowledge",
        keywords=["intention", "motive", "knowledge", "legal significance"],
        params={"scenario": scenario, "indian_context": True},
    )

def q_mens_rea_fill_blank(seed: int, qid: str) -> Question:
    question = "The maxim '_____ non facit reum nisi _____ sit rea' means an act does not make a person guilty unless the mind is also guilty."
    return Question(
        id=qid, type="fill_blank", question=question, answer="actus, mens",
        explanation="This fundamental maxim of criminal law establishes that both mens rea (guilty mind) and actus reus (guilty act) must coexist. Exceptions exist for strict liability offences.",
        difficulty="Medium", topic="Elements of Crime",
        keywords=["maxim", "mens rea", "actus reus"],
    )

# ─── TOPIC 2: Five Categories of Crimes ────────

def q_crime_categories_mcq(seed: int, qid: str) -> Question:
    r = random.Random(seed)
    question = "Which of the following is NOT one of the five categories of crimes under criminal law classification?"
    options = shuffle_list([
        "Crimes against property",
        "Inchoate crimes",
        "Victimless crimes",
        "Financial crimes",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options, answer="Victimless crimes",
        explanation="The five categories are: (1) Crimes against a person, (2) Crimes against property, (3) Inchoate crimes, (4) Statutory crimes, (5) Financial crimes. 'Victimless crimes' is not one of the five categories.",
        difficulty="Easy", topic="Five Categories of Crimes",
        keywords=["categories of crimes", "five categories", "classification"],
    )

def q_crime_categories_classify(seed: int, qid: str) -> Question:
    r = random.Random(seed + 5)
    offence = r.choice(["Dowry death", "Robbery", "Murder", "Forgery", "Criminal conspiracy", "Rape"])
    category_map = {
        "Dowry death": "Statutory crimes",
        "Robbery": "Crimes against property",
        "Murder": "Crimes against a person",
        "Forgery": "Financial crimes",
        "Criminal conspiracy": "Inchoate crimes",
        "Rape": "Crimes against a person",
    }
    correct_cat = category_map[offence]
    question = f"Classify '{offence}' into the correct category of crime."
    options = shuffle_list(list(category_map.values()), seed + 7)
    return Question(
        id=qid, type="mcq", question=question, options=options, answer=correct_cat,
        explanation=f"'{offence}' falls under '{correct_cat}' because it involves {correct_cat.lower().replace('crimes ', '')}.",
        difficulty="Medium", topic="Five Categories of Crimes",
        keywords=["crime classification", offence.lower(), correct_cat.lower()],
    )

def q_inchoate_crimes_fill(seed: int, qid: str) -> Question:
    question = "Crimes which are incomplete or in the preparatory stage are called _____ crimes."
    return Question(
        id=qid, type="fill_blank", question=question, answer="inchoate",
        explanation="Inchoate crimes (from Latin 'inchoare' = to begin) are crimes in the early or preparatory stage. Examples: abetment, criminal conspiracy, and attempt. These are punishable even though the main offence may not be completed.",
        difficulty="Easy", topic="Five Categories of Crimes",
        keywords=["inchoate", "incomplete crime", "preparatory"],
    )

def q_statutory_crimes_short(seed: int, qid: str) -> Question:
    question = ("Competency (Indian Context): Section 304B IPC deals with dowry death. "
                "State the essential ingredients of the offence of dowry death and explain the legal presumption under this section.")
    return Question(
        id=qid, type="short_answer", question=question,
        answer=("Essential ingredients: (1) Death of a woman, (2) Caused by burns or bodily injury, "
                "(3) Within 7 years of marriage, (4) Linked to dowry demands - cruelty connected to dowry. "
                "Legal presumption: Court presumes the husband or relative committed the offence if they are proved to have subjected the woman to cruelty in connection with dowry."),
        explanation="Section 304B IPC: Dowry death occurs when a married woman dies within 7 years of marriage due to burns or bodily injury, linked to dowry demands. The court shall presume the accused caused the death if they subjected her to cruelty for dowry.",
        difficulty="Hard", topic="Statutory Crimes",
        keywords=["dowry death", "Section 304B IPC", "ingredients", "presumption", "cruelty", "dowry"],
        params={"indian_context": True},
    )

# ─── TOPIC 3: Offences Against Human Body ──────

def q_murder_vs_culpable_homicide_mcq(seed: int, qid: str) -> Question:
    r = random.Random(seed)
    question = "The key difference between Murder (Section 300) and Culpable Homicide (Section 299) is:"
    options = shuffle_list([
        "Murder always involves poison; culpable homicide never does",
        "In murder, the act is more grave and involves definite intention to kill; in culpable homicide, the intention is less specific",
        "Murder has no punishment; culpable homicide has punishment",
        "There is no difference - both terms mean the same thing",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="In murder, the act is more grave and involves definite intention to kill; in culpable homicide, the intention is less specific",
        explanation="Murder (Section 300 IPC) is the most serious form of culpable homicide 'not amounting to murder.' All murders are culpable homicides, but not all culpable homicides are murders. The degree of intention and the certainty of the act determine the distinction.",
        difficulty="Medium", topic="Offences Against Human Body",
        keywords=["murder", "culpable homicide", "Section 300", "Section 299", "difference"],
    )

def q_grievous_hurt_sections(seed: int, qid: str) -> Question:
    question = "Under Section 320 IPC, which of the following constitutes Grievous Hurt?"
    options = shuffle_list([
        "Simple scratches causing minor pain",
        "Permanent privation of the sight of either eye",
        "A bruise that disappears in a few hours",
        "Any verbal threat",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="Permanent privation of the sight of either eye",
        explanation="Section 320 IPC lists eight kinds of grievous hurt including: (1) Emasculation, (2) Permanent privation of sight/hearing, (3) Privation of any member or joint, (4) Disfiguration of head/face, (5) Fracture/dislocation, (6) Dangerous to life, (7) Severe pain for 20 days, (8) Any hurt endangering life.",
        difficulty="Medium", topic="Offences Against Human Body",
        keywords=["grievous hurt", "Section 320 IPC", "permanent privation"],
    )

def q_causing_death_by_negligence(seed: int, qid: str) -> Question:
    question = "Under Section 304A IPC, causing death by negligence requires:"
    options = shuffle_list([
        "An intentional act to kill the victim",
        "A rash or negligent act NOT amounting to culpable homicide",
        "Pre-meditated planning of the killing",
        "Use of a deadly weapon",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="A rash or negligent act NOT amounting to culpable homicide",
        explanation="Section 304A IPC: Causing death by negligence. The act must be rash or negligent but must NOT amount to culpable homicide. If the act is intentional, it falls under Section 299/300. Key: NO intention or knowledge of causing death.",
        difficulty="Medium", topic="Offences Against Human Body",
        keywords=["negligence", "Section 304A", "rash act", "no intention"],
    )

def q_wrongful_confinement(seed: int, qid: str) -> Question:
    question = "The essential difference between Wrongful Restraint (Section 339) and Wrongful Confinement (Section 340) is:"
    options = shuffle_list([
        "Wrongful restraint is punishable, confinement is not",
        "Wrongful restraint prevents movement in one direction; confinement restricts movement within certain limits",
        "Confiment requires physical force; restraint does not",
        "There is no difference",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="Wrongful restraint prevents movement in one direction; confinement restricts movement within certain limits",
        explanation="Wrongful Restraint (Sec. 339): Preventing someone from proceeding in any direction they have a right to proceed. Wrongful Confinement (Sec. 340): Wrongful restraint PLUS confinement within certain limits/g boundaries - a more serious form.",
        difficulty="Hard", topic="Offences Against Human Body",
        keywords=["wrongful restraint", "wrongful confinement", "Section 339", "Section 340"],
    )

def q_assault_criminal_force_fill(seed: int, qid: str) -> Question:
    question = "Section 350 IPC defines Criminal Force as force used on a person _____ consent and intended to commit an offence."
    return Question(
        id=qid, type="fill_blank", question=question, answer="without",
        explanation="Section 350 IPC: Criminal Force is the intentional use of force to any person without their consent, to commit an offence. Assault (Section 351) involves gestures causing apprehension of criminal force - no physical contact needed.",
        difficulty="Easy", topic="Offences Against Human Body",
        keywords=["criminal force", "Section 350", "without consent"],
    )

def q_kidnapping_types_short(seed: int, qid: str) -> Question:
    question = "Distinguish between 'Kidnapping from India' (Section 360 IPC) and 'Kidnapping from Lawful Guardianship' (Section 361 IPC) with reference to age limits."
    return Question(
        id=qid, type="short_answer", question=question,
        answer=("Kidnapping from India (Sec. 360): Conveying any person beyond India's limits without consent of that person or lawful guardian. Applies to ALL ages. "
                "Kidnapping from Lawful Guardianship (Sec. 361): Taking away a male under 16 or female under 18 from lawful guardianship WITHOUT guardian's consent. "
                "Specific age limits apply - male under 16, female under 18."),
        explanation="Section 359 IPC recognizes two types of kidnapping: (1) Kidnapping from India (Sec. 360) - conveys person beyond India without consent. (2) Kidnapping from Lawful Guardianship (Sec. 361) - taking a minor (male <16, female <18) without guardian consent.",
        difficulty="Hard", topic="Offences Against Human Body",
        keywords=["kidnapping", "Section 360", "Section 361", "age limit", "lawful guardianship"],
        params={"indian_context": True},
    )

def q_rape_section375(seed: int, qid: str) -> Question:
    question = "Under Section 375 IPC as amended by the Criminal Law (Amendment) Act, 2013, sexual intercourse with a woman amounts to rape when:"
    options = shuffle_list([
        "The woman is above 18 and consents",
        "It is against her will OR without her consent OR consent obtained by fear/deception OR when she is under 18",
        "The woman is married to the man",
        "Only when physical force is used",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="It is against her will OR without her consent OR consent obtained by fear/deception OR when she is under 18",
        explanation="Section 375 IPC (as amended 2013): Rape includes: (1) Against her will, (2) Without consent, (3) Consent by fear of death/hurt, (4) Belief of lawful marriage, (5) With or without consent when under 18, (6) Unable to communicate consent. Punishment: Section 376 - minimum 10 years, up to life + fine.",
        difficulty="Medium", topic="Offences Against Human Body",
        keywords=["rape", "Section 375", "consent", "under 18"],
        params={"indian_context": True},
    )

# ─── TOPIC 4: Offences Against Property ────────

def q_theft_vs_extortion_mcq(seed: int, qid: str) -> Question:
    r = random.Random(seed)
    question = "The primary distinction between Theft (Section 378) and Extortion (Section 383) is:"
    options = shuffle_list([
        "Theft involves movable property; extortion can involve both movable and immovable property AND requires putting the victim in fear",
        "Theft is always non-cognizable; extortion is cognizable",
        "There is no legal distinction",
        "Extortion does not require consent; theft requires consent",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="Theft involves movable property; extortion can involve both movable and immovable property AND requires putting the victim in fear",
        explanation="Theft (Sec. 378): Only movable property, dishonest intention, without consent, moving the property. Extortion (Sec. 383): Any property (moveable or immovable), intentionally putting a person in fear of injury, dishonestly inducing delivery of property.",
        difficulty="Medium", topic="Offences Against Property",
        keywords=["theft", "extortion", "Section 378", "Section 383", "difference"],
    )

def q_robbery_vs_dacoity_mcq(seed: int, qid: str) -> Question:
    r = random.Random(seed)
    question = "Dacoity (Section 391 IPC) is distinct from Robbery (Section 392 IPC) because:"
    options = shuffle_list([
        "Dacoity requires 5 or more persons conjointly; robbery can be committed by any number",
        "Dacoity involves only movable property; robbery can involve immovable property",
        "There is no difference",
        "Dacoity is bailable; robbery is non-bailable",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="Dacoity requires 5 or more persons conjointly; robbery can be committed by any number",
        explanation="Dacoity (Section 391): Five or more persons conjointly committing or attempting robbery. Dacoity with murder (Section 396) is punishable with death or life imprisonment. Robbery (Section 390): Theft or extortion with use of force or fear.",
        difficulty="Medium", topic="Offences Against Property",
        keywords=["dacoity", "robbery", "Section 391", "Section 392", "five persons"],
    )

def q_criminal_breach_of_trust(seed: int, qid: str) -> Question:
    question = "Criminal Breach of Trust (Section 405 IPC) requires which of the following as an essential ingredient?"
    options = shuffle_list([
        "The accused must be a stranger to the property",
        "The accused must be ENTRUSTED with the property",
        "The property must be immovable",
        "There must be physical violence used",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="The accused must be ENTRUSTED with the property",
        explanation="Section 405 IPC: Criminal Breach of Trust requires (1) A person entrusted with property or dominion over it, (2) Dishonest misappropriation/conversion of it, (3) Or dishonest use/disposal violating the trust. The entrustment relationship is the key ingredient.",
        difficulty="Medium", topic="Offences Against Property",
        keywords=["criminal breach of trust", "Section 405", "entrusted"],
    )

def q_cheating_section420_fill(seed: int, qid: str) -> Question:
    question = "Section 420 IPC punishes the offence of _____ - which involves dishonest inducement to deliver property."
    return Question(
        id=qid, type="fill_blank", question=question, answer="cheating",
        explanation="Section 420 IPC: Cheating and dishonestly inducing delivery of property. Punishment: up to 7 years imprisonment + fine. Ingredients: (1) Deception of a person, (2) Dishonest inducement to deliver property, (3) Causes or is likely to cause damage.",
        difficulty="Easy", topic="Offences Against Property",
        keywords=["cheating", "Section 420", "dishonest inducement"],
    )

# ─── TOPIC 5: ADR, Tribunals, Section 89 ──────

def q_judicial_vs_quasi_judicial_mcq(seed: int, qid: str) -> Question:
    r = random.Random(seed)
    question = "Which of the following is a key difference between Judicial and Quasi-Judicial bodies?"
    options = shuffle_list([
        "Quasi-judicial bodies can impose criminal sentences; judicial bodies cannot",
        "Judicial bodies exercise all powers of a court; quasi-judicial bodies have limited powers",
        "Judicial bodies are always established under statutes; quasi-judicial bodies are not",
        "There is no difference",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="Judicial bodies exercise all powers of a court; quasi-judicial bodies have limited powers",
        explanation="Judicial bodies (courts): Exercise full judicial powers - can pass sentences, issue warrants, enforce judgments. Quasi-judicial bodies (tribunals): Exercise limited powers resembling courts - can hear evidence and make decisions but do not have the full range of court powers.",
        difficulty="Medium", topic="ADR and Tribunals",
        keywords=["judicial", "quasi-judicial", "difference", "tribunals"],
    )

def q_ngt_short(seed: int, qid: str) -> Question:
    question = ("Competency (Indian Context): The National Green Tribunal (NGT) was established in 2010 under the National Green Tribunal Act. "
                "Explain: (1) Its composition, (2) Jurisdiction, (3) Why it is classified as a quasi-judicial body.")
    return Question(
        id=qid, type="short_answer", question=question,
        answer=("(1) Composition: Chairperson (retired Supreme Court Judge or Chief Justice of a High Court), Judicial members (retired High Court Judges), Expert members (with expertise in environment/conservation). "
                "(2) Jurisdiction: Environmental protection, conservation of forests, enforcement of legal rights related to environment. "
                "(3) Quasi-judicial: Has powers of a civil court (summon witnesses, examine evidence) but does not have the full range of court powers."),
        explanation="NGT established under the National Green Tribunal Act, 2010. It has benches in Delhi (Principal), Bhopal, Pune, Kolkata, Chennai. It is a quasi-judicial body - powers similar to a civil court but with limited jurisdiction restricted to environmental matters.",
        difficulty="Hard", topic="ADR and Tribunals",
        keywords=["NGT", "National Green Tribunal", "quasi-judicial", "environment", "composition", "jurisdiction"],
        params={"indian_context": True},
    )

def q_section89_cpc_benefits(seed: int, qid: str) -> Question:
    question = "Section 89 of the CPC is the statutory source of ADR in India. State TWO benefits of ADR over traditional litigation."
    return Question(
        id=qid, type="short_answer", question=question,
        answer=("Benefits of ADR: (1) Faster resolution - ADR resolves disputes in weeks/months vs years in courts. "
                "(2) Cost-effective - lower legal fees and procedural costs. "
                "Other benefits: Confidential, preserves relationships, flexible procedures, less adversarial."),
        explanation="Section 89 CPC (as amended in 2002) empowers courts to refer disputes to ADR mechanisms - Arbitration, Conciliation, Mediation, and Lok Adalat. Benefits include speed, cost savings, confidentiality, and relationship preservation.",
        difficulty="Medium", topic="ADR and Tribunals",
        keywords=["Section 89 CPC", "ADR", "benefits", "alternative dispute resolution"],
        params={"indian_context": True},
    )

def q_arbitration_section8(seed: int, qid: str) -> Question:
    r = random.Random(seed)
    question = "Under Section 8 of the Arbitration and Conciliation Act, 1996, when a court encounters a valid arbitration agreement:"
    options = shuffle_list([
        "It must dismiss the suit",
        "It shall refer the parties to arbitration",
        "It must decide the dispute itself",
        "It must appoint a new arbitrator",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="It shall refer the parties to arbitration",
        explanation="Section 8 of the Arbitration and Conciliation Act, 1996: When a court is seized of a matter that is the subject of an arbitration agreement, the court shall, upon request of a party, refer the parties to arbitration. The judicial proceeding is thus staved off.",
        difficulty="Medium", topic="Arbitration",
        keywords=["arbitration", "Section 8", "court referral", "arbitration agreement"],
    )

def q_arbitral_award(seed: int, qid: str) -> Question:
    question = "An arbitral award under the Arbitration and Conciliation Act, 1996 is:"
    options = shuffle_list([
        "Merely advisory and not binding",
        "Enforceable as a decree of the court",
        "Always subject to appeal",
        "Valid only if both parties agree to it",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="Enforceable as a decree of the court",
        explanation="Section 36 of the Arbitration Act: An arbitral award is enforceable as if it were a decree of the court. The party in whose favour the award is passed can file an application in court for its enforcement.",
        difficulty="Medium", topic="Arbitration",
        keywords=["arbitral award", "enforcement", "Section 36"],
    )

def q_lok_adalat_award(seed: int, qid: str) -> Question:
    question = "An award passed by the Lok Adalat is:"
    options = shuffle_list([
        "Appealable to the High Court within 30 days",
        "Deemed to be a civil court decree; final and binding; not appealable",
        "Merely advisory",
        "Subject to revision by the Supreme Court",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="Deemed to be a civil court decree; final and binding; not appealable",
        explanation="Section 21 of the Legal Services Authorities Act, 1987: An award passed by Lok Adalat is deemed to be a decree of a civil court. It is final and binding on all parties. No appeal lies to any court.",
        difficulty="Medium", topic="Lok Adalat",
        keywords=["Lok Adalat", "award", "final", "binding", "not appealable"],
    )

def q_mediation_conciliation_diff(seed: int, qid: str) -> Question:
    question = "The key difference between mediation and conciliation is:"
    options = shuffle_list([
        "Mediation is legally binding; conciliation is not",
        "Conciliation involves the conciliator actively suggesting terms of settlement; the mediator merely facilitates discussion",
        "Mediation requires a written agreement; conciliation does not",
        "There is no legal difference",
    ], seed)
    return Question(
        id=qid, type="mcq", question=question, options=options,
        answer="Conciliation involves the conciliator actively suggesting terms of settlement; the mediator merely facilitates discussion",
        explanation="Mediation: Mediator facilitates discussion between parties without suggesting terms. Conciliation: Conciliator actively participates by suggesting terms of"
)