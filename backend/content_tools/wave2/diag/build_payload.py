"""Build the DIAG-FIX authoring payload (35 slots, 26 files, classes 6-8).

Fix classes:
  A. AUTHORED_STEM (24) - answer text sat in the QUESTION slot (hard swap);
     the stem was unrecoverable, so a new stem is authored on the node's topic
     and matched to the surviving answer key. Key left byte-identical.
  B. TRIM (4)           - a genuine question sat at the head of the slot with
     the answer + misconception analysis appended after it; the question is
     restored by dropping the leaked tail. Key left byte-identical.
  C. REAUTHOR (2)       - c6_physics_ch08_034 #5: surviving question offered
     "seconds or hours" while its own key answers "minutes" - a coherent stem
     is authored; c6_physics_ch08_034 #6 survives as a trim of the same shape
     as B but is kept distinct here for auditability.
  D. EXTEND (5)         - stems under the 4-word minimum ("What is wind?");
     extended with a second clause the existing key already answers.
The applier (apply_wave2.py, house pattern) refuses any non-edited-region
change, so keys and every other section are structurally guaranteed intact.
"""

import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))

A = {  # file -> {slot: authored question}
    "c6_civics_ch12_022.md": {"3":
        "Suppose the water supply in your neighbourhood is contaminated and the drains are "
        "overflowing. Which level of government — local, state, or national — should residents "
        "approach first to get these problems fixed? Give reasons for your choice."},
    "c6_civics_ch14_029.md": {"3":
        "Imagine a family from Kerala moves to Punjab for work, and at first its members speak "
        "only Malayalam. How might their everyday language use change over time, and what does "
        "this tell us about how languages behave in a diverse country?"},
    "c6_civics_ch16_040.md": {"3":
        "In a garment factory, workers are asked to operate machines near exposed electrical "
        "wires and no safety equipment has been provided. Which right of the workers is being "
        "violated here, and why is the employer responsible for it?"},
    "c6_history_ch07_021.md": {"3":
        "The Delhi Sultanate began in 1206 CE and came to an end in 1526 CE. For how many years "
        "did it last? Show each step of your working."},
    "c6_history_ch09_037.md": {"3":
        "Shah Jahan's reign ended in personal tragedy. What happened to the emperor after the "
        "War of Succession among his sons, and where did he spend his final years?"},
    "c6_math_ch01_001.md": {
        "2": "During a height game, the teacher labels one student in the line as number '2'. "
             "The label does not describe the student's rank from the front of the line, but only "
             "that student's immediate neighbours. What does the label '2' tell you about the "
             "student's place in the line?",
        "3": "Three number cards — 200, 800 and 500 — are arranged in a row of three cells. A "
             "'supercell' is a cell whose number is greater than both of its immediate "
             "neighbours. Rearrange the cards so that exactly one cell becomes a supercell. "
             "Which number is the supercell in your arrangement? Explain why the other two "
             "cells cannot be supercells.",
        "4": "Organisers must plan drinking-water stalls for a huge public gathering where "
             "thousands of people keep moving about. Would you count every person exactly or "
             "estimate the crowd? Justify your choice.",
        "5": "Can the difference between two 5-digit numbers be a 3-digit number? If you think "
             "yes, construct an example with full working; if you think no, explain why not.",
    },
    "c6_math_ch05_057.md": {"2":
        "While solving the equation 3x = 15, a student divides both sides by 3 instead of "
        "subtracting 3 from both sides. Explain why dividing by 3 is the correct operation "
        "here, and state the principle that lets us perform the same operation on both sides."},
    "c6_math_ch06_062.md": {"2":
        "A bag contains 10 red balls and 15 blue balls. Write the ratio of the number of red "
        "balls to the number of blue balls. Why must the numbers in your ratio appear in this "
        "particular order?"},
    "c6_math_ch10_112.md": {"2":
        "A sheet of paper is folded in half and a shape is cut out through both layers. When "
        "the paper is opened, a complete symmetric shape appears. Explain why the cut repeats "
        "itself on the other side of the crease."},
    "c6_physics_ch11_035.md": {"3":
        "A classmate says a firefly must be an artificial source of light because it glows at "
        "night. Do you agree? Give reasons for your answer."},
    "c7_chem_ch02_011.md": {"6":
        "On heating, blue copper sulphate crystals turn white and lose their water of "
        "crystallisation. A classmate calls this a chemical change because a new white "
        "substance has formed. Do you accept the classmate's reasoning? Justify your answer "
        "with a simple test."},
    "c7_eco_ch02_005.md": {"6":
        "A town council proposes to pave the weekly market ground and charge every vendor a "
        "fixed fee for a paved shop space. How is this policy likely to affect the small "
        "mobile vendors and the rural consumers who buy from them? Give a reasoned assessment."},
    "c7_geo_ch01_003.md": {"5":
        "Compare the formation of the Himalayas with that of the Northern Plains. Which type "
        "of force — endogenic or exogenic — shaped each of these two physical divisions?"},
    "c7_hist_ch02_009.md": {"6":
        "Megasthenes, a Greek ambassador to the Mauryan court, described Indian society as "
        "divided into seven groups. Why do historians say his seven-fold division does not "
        "match the four-fold varna system exactly?"},
    "c7_hist_ch08_004.md": {"6":
        "A classmate states that Jewish communities such as the Bene Israel and the Cochin "
        "Jews first settled in India only during British rule. Is the classmate's claim "
        "accurate? Support your answer with historical evidence."},
    "c7_hist_ch08_009.md": {"5":
        "Historians find medieval temples, mosques and tombs sharing common decorative motifs, "
        "and records of communities of different faiths taking part in each other's festivals. "
        "What does such evidence suggest about medieval Indian society?"},
    "c7_math_ch09_009.md": {"6":
        "A classmate reads the congruence statement △ PQR ≅ △ STU and concludes that "
        "∠ P = ∠ U. Is the classmate's conclusion justified? Explain using the correct "
        "correspondence of vertices."},
    "c7_math_ch15_006.md": {"6":
        "While solving an equation, Priya reaches the line −x = 7 in her working and writes her "
        "final answer as x = 7. Has Priya made an error? If so, identify the faulty step and "
        "state the correct value of x."},
    "c8_civ_ch4_1.md": {"5":
        "A foreign national who has lived and worked in India for years, and who regularly "
        "pays taxes, demands the right to vote in Indian elections. Distinguish between a "
        "resident and a citizen of a country. Should this demand be accepted? Give reasons "
        "for your answer."},
    "c8_civ_ch4_12.md": {"5":
        "Ravi never misses voting in an election, but he never attends the ward meeting, never "
        "volunteers, and takes no part in neighbourhood problems beyond following the law. Is "
        "Ravi an active citizen in the full sense? Distinguish active from passive citizenship "
        "in your answer."},
    "c8_eco_ch2_4.md": {"5":
        "Two districts have exactly the same population size, but in district A most people "
        "are of working age and literate, while district B has a predominantly elderly, mainly "
        "farm-dependent population. Are the two districts identical for a planner? Explain "
        "using the idea of population structure."},
}

B = {  # trims: restore the genuine question, drop the leaked answer tail
    "c6_physics_ch08_034.md": {
        "1": "What is the basic SI unit of time?",
        "2": "If you have 120 seconds, how many minutes do you have?",
        "3": "A race lasts for 3 hours. How many minutes is this?",
        "4": "Which is a larger unit of time: a millennium or a century?",
        "6": "Create a scenario where it would be necessary to use a millisecond.",
    },
}

C = {  # coherent re-author where the surviving stem contradicted its own key
    "c6_physics_ch08_034.md": {"5":
        "Which unit of time would be most convenient for measuring the time it takes to walk "
        "to school: seconds, minutes, or hours? Give a reason for your choice."},
}

D = {  # sub-4-word stems extended with a clause the existing key already answers
    "c6_chemistry_ch06_002.md": {"1":
        "What is sedimentation? How is it different from dissolving?"},
    "c6_geography_ch02_011.md": {"1":
        "What is wind? Is it a substance present in the air or a movement of the air itself?"},
    "c6_geography_ch06_002.md": {
        "2": "What are latitudes? Which latitude is fixed at 0°?",
        "3": "What are longitudes? Which longitude is fixed at 0°?"},
    "c7_geo_ch02_004.md": {"1":
        "What is humidity? What does the air contain more of when humidity is high?"},
}


def main():
    merged = {}
    for src in (A, B, C, D):
        for f, slots in src.items():
            merged.setdefault(f, {}).update(slots)
    edits = [{"file": f, "set_diag": {n: {"question": q} for n, q in sorted(slots.items())}}
             for f, slots in sorted(merged.items())]
    out = os.path.join(HERE, "diag_payload.json")
    with open(out, "w", encoding="utf-8") as fh:
        json.dump({"edits": edits}, fh, ensure_ascii=False, indent=1)
    n_slots = sum(len(s) for s in merged.values())
    print(f"payload: {out}\nfiles={len(merged)} slots={n_slots} "
          f"(authored={sum(len(s) for s in A.values())}, trims={sum(len(s) for s in B.values())}, "
          f"reauthor={sum(len(s) for s in C.values())}, extend={sum(len(s) for s in D.values())})")


if __name__ == "__main__":
    main()
