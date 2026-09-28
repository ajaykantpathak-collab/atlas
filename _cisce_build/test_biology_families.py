# -*- coding: utf-8 -*-
"""test_biology_families.py -- hand-verified textbook-style cases for
model_biology.  Every expected value below is hand-computed:

  Tt x Tt   -> 1 TT : 2 Tt : 1 tt   (P(tt)=1/4, P(dom)=3/4, P(het)=1/2)
  Tt x tt   -> 1 Tt : 1 tt          (P(recessive)=1/2)
  TT x tt   -> all Tt               (P(dominant)=1)
  TtYy x TtYy -> 9:3:3:1            (P(both dominant)=9/16)
  ABO  AB x AO -> kids AA,AB,AB,BO -> P(B)=1/4
  ABO  BO x OO -> kids BO,BO,OO,OO -> B 50%, O 50%
  Rh   Dd x dd -> Dd,Dd,dd,dd -> P(Rh-)=1/2
  X-linked carrier mother XCXc x normal father XCY:
      daughters XCXC, XCXc; sons XCY, XcY -> 50% of sons affected,
      P(affected child)=1/4, P(carrier daughter among daughters)=1/2
  XcY father x XCXC mother -> daughters all XCXc, sons all XCY ->
      P(affected child)=0
  XX x XY -> P(male child)=1/2
  haemophilia carrier XHXh x normal XHY -> P(affected child)=1/4
  pedigree carriers Aa x Aa -> P(affected)=1/4 ; unaffected parents of
      an affected child -> next child unaffected 3/4 ; hetero-affected x
      unaffected (dominant) -> 1/2
  cardiac output = 70 mL x 72 beats/min = 5040 mL/min ; CO 5000 mL /
      HR 100 -> SV 50 mL
  lung volumes: VC = 500+2500+1000 = 4000 mL ; TLC = 4000+1200 = 5200 mL
      minute ventilation = 500 x 15 = 7500 mL/min
  transpiration: 15 mL in 30 min -> 30 mL/h ; 2 mL/min x 45 min -> 90 mL
  photosynthesis gas released -> oxygen
  balance CO2+H2O->C6H12O6+O2 -> 6,6,1,6
  RQ = 6 CO2/6 O2 = 1.0 ; RQ fats = 0.7
  10% law: 10000 J producers -> tertiary (3 hops) = 10 J
           500 kJ herbivores -> producers (1 hop up) = 5000 kJ
  N = 5000 e^(0.03x4) = 5637.48
  500 bacteria doubling every 20 min, after 2 h = 6 gens = 32000
  logistic K=10000 N0=1000 r=0.5 t=2: e=2.71828 ->
      N = 1e4x1e3x2.71828/(1e4+1e3x1.71828) = 2319.85
  HW q^2=0.16 -> q=0.4 p=0.6 -> 2pq=0.48
  HW q=0.3 -> p=0.7 -> p^2=0.49
  Shannon 40,30,20,10: H=-(0.4ln0.4+0.3ln0.3+0.2ln0.2+0.1ln0.1)=1.27985
  richness {10,25,8,40,12} -> S=5
  M = 50 mm/0.05 mm = 1000x ; image = 400x0.02mm = 8 mm
  actual = 5 mm/100 = 0.05 mm
  cell size = 0.4 mm/20 = 0.02 mm
  mitosis 5 divisions from 1 cell -> 32 cells
  meiosis 2n=24 -> gametes n=12
  EcoRI GAATTC in GAATTCGGAATTCAAGCTTGAATTC (25bp) -> 3 sites
  circular plasmid 2 cut sites -> 2 fragments
  PCR 2 copies x 2^10 = 2048 ; 1 copy x 2^5 = 32
  Chargaff 30% A -> T=30, G=C=20 ; 20% C -> G=20, A=T=30
  NPP = GPP - R = 2000 - 800 = 1200
  S = cA^z = 0.1 x 100^0.25 = 0.1 x 3.16228 = 0.316228

STEP CONTRACT (biology bar, enforced below on every matched case):
  len(steps) >= 3 AND sum(len(step)) >= 200 chars, shaped as
  method/principle -> given restatement -> computation -> verification
  -> interpretation.  Thin steps are a permanent test failure.
"""
import sys
try:
    sys.path.insert(0, 'D:/platform')
    from backend.its.solver.biology_families import model_biology
except SyntaxError:
    # a sibling subject's solver file is mid-edit in the root tree;
    # fall back to the deploy tree copy (kept identical for biology).
    # Purge partially-imported 'backend' modules so the deploy tree
    # loads fresh instead of reusing root package paths.
    for mod in [m for m in list(sys.modules)
                if m == 'backend' or m.startswith('backend.')]:
        del sys.modules[mod]
    sys.path = [p for p in sys.path if p != 'D:/platform']
    sys.path.insert(0, 'D:/platform/deploy')
    from backend.its.solver.biology_families import model_biology

# (question, expected_structure, expected_numeric, answer_substring)
CASES = [
    # ---- genetics: Punnett ----
    ("In a cross Tt x Tt, what is the probability of the offspring being tt?",
     "PUNNETT_CROSS", 0.25, None),
    ("A cross between Tt and tt gives what probability of a recessive offspring?",
     "PUNNETT_CROSS", 0.5, None),
    ("Cross TT with tt. What is the probability of the dominant phenotype in the offspring?",
     "PUNNETT_CROSS", 1.0, None),
    ("In a dihybrid cross TtYy x TtYy, what is the probability of offspring showing both dominant traits?",
     "PUNNETT_CROSS", 0.5625, None),
    ("Cross Tt with Tt. What is the probability of a heterozygous offspring?",
     "PUNNETT_CROSS", 0.5, None),
    ("A heterozygous tall pea plant (Tt) undergoes self-pollination. What is the genotype ratio of the offspring?",
     "PUNNETT_SELF", None, "1 TT : 2 Tt : 1 tt"),
    ("In a cross between Tt and Tt, give the phenotype ratio.",
     "PUNNETT_CROSS", None, "3 dominant"),
    # ---- genetics: ABO blood groups ----
    ("A heterozygous group A man marries a heterozygous group B woman. What is the probability that their child has blood group O?",
     "BLOOD_GROUP_CROSS", 0.25, None),
    ("A group AB father and a heterozygous group A mother: what is the probability that their child has group B?",
     "BLOOD_GROUP_CROSS", 0.25, None),
    ("A heterozygous group B father (BO) and a group O mother have children. What are the child blood-group probabilities?",
     "BLOOD_GROUP_CROSS", None, "B 50%"),
    # ---- genetics: Rh ----
    ("A heterozygous Rh positive father marries an Rh negative mother. What is the chance that their child is Rh negative?",
     "BLOOD_GROUP_RH", 0.5, None),
    # ---- genetics: X-linked ----
    ("A carrier mother (XCXc) and a normal father (XCY). What fraction of their sons will be colour blind?",
     "SEX_LINKED_CROSS", 0.5, None),
    ("A colour blind father (XcY) marries a normal mother (XCXC). What is the probability that their child will be colour blind?",
     "SEX_LINKED_CROSS", 0.0, None),
    ("In humans females are XX and males are XY. What is the probability that a child will be male?",
     "SEX_LINKED_CROSS", 0.5, None),
    ("A haemophilia carrier mother and a normal father have children. What is the probability that a child of theirs will be affected?",
     "SEX_LINKED_CROSS", 0.25, None),
    # ---- genetics: pedigree probability chains ----
    ("In a pedigree, both parents are carriers of an autosomal recessive trait. What is the probability that their next child will be affected?",
     "PEDIGREE_PROBABILITY", 0.25, None),
    ("A pedigree shows unaffected parents with one affected child. What is the probability that their next child is unaffected?",
     "PEDIGREE_PROBABILITY", 0.75, None),
    ("In a pedigree of an autosomal dominant disorder, a heterozygous affected father marries an unaffected woman. What is the probability that a child will be affected?",
     "PEDIGREE_PROBABILITY", 0.5, None),
    # ---- physiology: fact table, balance, RQ ----
    ("Which gas is released during photosynthesis?",
     "PHOTO_RESP_QUIZ", None, "oxygen"),
    ("What are the raw materials of photosynthesis?",
     "PHOTO_RESP_QUIZ", None, "carbon dioxide and water"),
    ("Balance the photosynthesis equation CO2 + H2O -> C6H12O6 + O2.",
     "PHOTOSYNTH_BALANCE", None, "6 CO2"),
    ("The RQ of a substrate is measured: 6 CO2 evolved and 6 O2 consumed. Calculate the respiratory quotient.",
     "RQ_NUMERIC", 1.0, None),
    ("What is the RQ of fats?",
     "RQ_SUBSTRATE", 0.7, None),
    # ---- physiology: cardiac output / breathing volumes / transpiration ----
    ("A heart has a stroke volume of 70 mL and a heart rate of 72 beats per minute. Calculate the cardiac output.",
     "CARDIAC_OUTPUT", 5040.0, None),
    ("Cardiac output is 5000 mL with a heart rate of 100 beats per minute. Find the stroke volume.",
     "CARDIAC_OUTPUT", 50.0, None),
    ("A person's tidal volume is 500 mL, inspiratory reserve volume is 2500 mL and expiratory reserve volume is 1000 mL. Find the vital capacity.",
     "BREATHING_VOLUME", 4000.0, None),
    ("Vital capacity is 4000 mL and residual volume is 1200 mL. Find the total lung capacity.",
     "BREATHING_VOLUME", 5200.0, None),
    ("Tidal volume is 500 mL and the breathing rate is 15 breaths per minute. Find the minute ventilation.",
     "BREATHING_VOLUME", 7500.0, None),
    ("In a potometer experiment, a shoot loses 15 mL of water in 30 minutes. Calculate the rate of transpiration.",
     "TRANSPIRATION_RATE", 30.0, None),
    ("The rate of transpiration is 2 mL per minute. How much water is lost in 45 minutes?",
     "TRANSPIRATION_RATE", 90.0, None),
    # ---- ecology: energy flow ----
    ("If 10000 J of energy is available to producers, how much energy is available to the tertiary consumers?",
     "ENERGY_FLOW_10_PERCENT", 10.0, None),
    ("Herbivores receive 500 kJ of energy. How much energy was available to the producers?",
     "ENERGY_FLOW_10_PERCENT", 5000.0, None),
    # ---- ecology: population growth ----
    ("A population of 5000 grows at the rate of 3 percent per year. What will be the population after 4 years?",
     "EXP_POP_GROWTH", 5637.4843, None),
    ("A culture of 500 bacteria doubles every 20 minutes. How many bacteria will there be after 2 hours?",
     "POP_DOUBLING", 32000.0, None),
    ("A population of 1000 grows logistically with a carrying capacity of 10000 at a rate of 0.5 per year. What will be the population after 2 years?",
     "LOGISTIC_GROWTH", 2319.85, None),
    # ---- ecology: Hardy-Weinberg ----
    ("In a Hardy-Weinberg population, 16 percent of the individuals are homozygous recessive. What is the frequency of heterozygous individuals?",
     "HARDY_WEINBERG", 0.48, None),
    ("The frequency of recessive allele is 0.3 in a population. Find the frequency of homozygous dominant genotype.",
     "HARDY_WEINBERG", 0.49, None),
    # ---- ecology: biodiversity ----
    ("Calculate the Shannon diversity index for a community with counts 40, 30, 20, 10.",
     "SHANNON_INDEX", 1.27985, None),
    ("What is the species richness of an area with counts 10, 25, 8, 40, 12?",
     "SPECIES_RICHNESS", 5.0, None),
    # ---- cell biology ----
    ("A cell's image measures 50 mm while its actual size is 0.05 mm. Calculate the magnification.",
     "CELL_MAGNIFICATION", 1000.0, None),
    ("With 400x magnification and actual size 0.02 mm, what is the image size?",
     "CELL_MAGNIFICATION", 8.0, None),
    ("The magnification is 100x and the image size is 5 mm. Find the actual size.",
     "CELL_MAGNIFICATION", 0.05, None),
    ("The field of view is 0.4 mm and 20 cells fit across it. What is the size of one cell?",
     "FIELD_OF_VIEW", 0.02, None),
    ("After 5 mitotic divisions starting from 1 cell, how many cells are produced?",
     "CELL_DIVISION_COUNT", 32.0, None),
    ("A cell with 2n = 24 undergoes meiosis. How many chromosomes are present in the gametes?",
     "CELL_DIVISION_COUNT", 12.0, None),
    # ---- biotech ----
    ("How many EcoRI restriction sites are present in the sequence GAATTCGGAATTCAAGCTTGAATTC?",
     "RESTRICTION_SITE_COUNT", 3.0, None),
    ("A circular plasmid of sequence GAATTCACGTACGTACGTGAATTC is cut with EcoRI at all its restriction sites. How many fragments are produced?",
     "RESTRICTION_SITE_COUNT", 2.0, None),
    ("In PCR, after 10 cycles, how many copies are formed from 2 DNA molecules?",
     "PCR_AMPLIFICATION", 2048.0, None),
    ("In PCR, after 5 cycles, how many copies are formed from 1 DNA molecule?",
     "PCR_AMPLIFICATION", 32.0, None),
    ("A double-stranded DNA sample contains 30% adenine. What percentage of the sample is guanine?",
     "CHARGAFF_DNA", 20.0, None),
    ("In a DNA molecule, 20% of the bases are cytosine. What percentage is adenine?",
     "CHARGAFF_DNA", 30.0, None),
    # ---- ecology: productivity & species-area ----
    ("The GPP of an ecosystem is 2000 kJ and respiration loses 800 kJ. Find the NPP.",
     "NPP_GPP", 1200.0, None),
    ("Using the species-area relation S = cA^z with c = 0.1 and z = 0.25, find the number of species for an area of 100 km2.",
     "SPECIES_AREA", 0.316228, None),
    # ---- honesty: must NOT match (in-domain non-solver asks) ----
    ("Who wrote the book Origin of Species?", None, None, None),
    ("What determines a person's blood group?", None, None, None),
    # ---- honesty: must NOT match (other-subject probes) ----
    ("Solve the quadratic equation x^2 - 5x + 6 = 0.",
     None, None, None),
    ("A car accelerates uniformly at 2 m/s2 from rest. Find its velocity after 5 seconds.",
     None, None, None),
    ("Calculate the pH of a 0.01 M HCl solution.",
     None, None, None),
    ("Two dice are thrown. Find the probability of getting a sum of 8.",
     None, None, None),
    ("Find the compound interest on 10000 rupees at 10 percent per annum for 2 years.",
     None, None, None),
]

# BRANCH_CASES: second battery exercising the remaining routing branches
# of each family (ask-routing, reverse solves, unit conversions).  The
# STEP CONTRACT applies here too -- no family may be thin on any branch.
# (question, expected_structure, expected_numeric)
BRANCH_CASES = [
    # Punnett ask-routing branches
    ("Cross Tt with Tt. What is the genotype ratio of the offspring?",
     "PUNNETT_CROSS", None),
    ("In TtYy x TtYy, what is the probability of offspring recessive for both genes?",
     "PUNNETT_CROSS", 1.0 / 16.0),
    ("Cross TtYy with TtYy.",
     "PUNNETT_CROSS", None),
    ("Tt undergoes self-pollination. What is the phenotype ratio?",
     "PUNNETT_SELF", None),
    # ABO / Rh default-report branches
    ("A heterozygous Rh positive father marries an Rh negative mother. What are the possible Rh types of their children?",
     "BLOOD_GROUP_RH", None),
    # sex-linked: carrier daughters, affected daughters, son-prob, default, sex-ratio
    ("A carrier mother (XCXc) and a normal father (XCY). What percentage of their daughters will be carriers?",
     "SEX_LINKED_CROSS", 0.5),
    ("An affected father (XcY) and a carrier mother (XCXc): what fraction of their daughters will be colour blind?",
     "SEX_LINKED_CROSS", 0.5),
    ("A carrier mother and a normal father have children. What is the probability that a son will be colour blind?",
     "SEX_LINKED_CROSS", 0.5),
    ("A carrier mother (XCXc) and a normal father (XCY) have children.",
     "SEX_LINKED_CROSS", None),
    ("What is the probability that a child will be female, given XX females and XY males?",
     "SEX_LINKED_CROSS", 0.5),
    # pedigree: carrier-among-unaffected ask + other scenarios
    ("In a pedigree, both parents are carriers of an autosomal recessive trait. What is the probability that an unaffected child of theirs is a carrier?",
     "PEDIGREE_PROBABILITY", 2.0 / 3.0),
    ("A pedigree shows an affected parent and a carrier parent of an autosomal recessive trait. What is the probability that their child is affected?",
     "PEDIGREE_PROBABILITY", 0.5),
    ("In a pedigree, an affected parent of an autosomal recessive trait marries an unaffected normal parent. What is the probability that their child will be affected?",
     "PEDIGREE_PROBABILITY", 0.0),
    # cardiac: HR reverse solve
    ("A heart pumps a cardiac output of 5000 mL with a stroke volume of 70 mL. Find the heart rate.",
     "CARDIAC_OUTPUT", 5000.0 / 70.0),
    # breathing: FRC/EC reverse rules + IC
    ("Functional residual capacity is 2200 mL and residual volume is 1200 mL. Find the expiratory reserve volume.",
     "BREATHING_VOLUME", 1000.0),
    ("Expiratory capacity is 1500 mL with tidal volume 500 mL. Find the expiratory reserve volume.",
     "BREATHING_VOLUME", 1000.0),
    ("A person's tidal volume is 500 mL and inspiratory reserve volume is 2000 mL. Find the inspiratory capacity.",
     "BREATHING_VOLUME", 2500.0),
    # photo/resp fact branches
    ("Which molecule is the energy currency of respiration?",
     "PHOTO_RESP_QUIZ", None),
    ("What happens during anaerobic respiration in yeast?",
     "PHOTO_RESP_QUIZ", None),
    ("What is the site of aerobic respiration?",
     "PHOTO_RESP_QUIZ", None),
    ("Where does photosynthesis take place?",
     "PHOTO_RESP_QUIZ", None),
    ("Write the word equation of photosynthesis.",
     "PHOTO_RESP_QUIZ", None),
    ("Write the word equation of respiration.",
     "PHOTO_RESP_QUIZ", None),
    ("In photosynthesis, the equation CO2 + H2O gives glucose and oxygen. Explain.",
     "PHOTO_RESP_QUIZ", None),
    # RQ: sub-1 substrate branch
    ("12 CO2 evolved and 20 O2 consumed. Calculate the RQ.",
     "RQ_NUMERIC", 0.6),
    # energy flow: quaternary level
    ("If producers get 1000 kJ, how much energy reaches the quaternary consumers?",
     "ENERGY_FLOW_10_PERCENT", 0.1),
    # population: doubling unit conversion
    ("A culture of 100 bacteria doubles every 2 hours. How many bacteria after 6 hours?",
     "POP_DOUBLING", 800.0),
    # Hardy-Weinberg: p-given, p2-given, hetero-given branches
    ("In a Hardy-Weinberg population the frequency of the dominant allele is 0.7. Find the frequency of homozygous recessive individuals.",
     "HARDY_WEINBERG", 0.09),
    ("In a population 36 percent are homozygous dominant. What is the frequency of heterozygous individuals?",
     "HARDY_WEINBERG", 0.48),
    ("In a Hardy-Weinberg population, 32 percent of the individuals are heterozygous. Find the frequency of the recessive allele.",
     "HARDY_WEINBERG", 0.2),
    # field of view: cells-across reverse branch
    ("The field of view is 0.5 mm and a cell measures 0.025 mm. How many cells fit across the field of view?",
     "FIELD_OF_VIEW", 20.0),
    # cell division: meiosis daughter-cell-count branch
    ("How many daughter cells are produced when one cell undergoes meiosis?",
     "CELL_DIVISION_COUNT", 4.0),
    # restriction: linear fragments branch
    ("A linear DNA fragment GAATTCACGTGAATTCGGATCCGAATTC is cut with EcoRI at all its sites. How many fragments are produced?",
     "RESTRICTION_SITE_COUNT", 4.0),
    # NPP/GPP: reverse branches
    ("The GPP of an ecosystem is 3000 kJ and the NPP is 1800 kJ. Find the respiration loss R.",
     "NPP_GPP", 1200.0),
    ("The NPP of a grassland is 1200 kJ and respiration loses 800 kJ. Find the GPP.",
     "NPP_GPP", 2000.0),
    # transpiration: per-day rate
    ("A potted plant loses 240 mL of water in 12 hours. Calculate the rate of transpiration.",
     "TRANSPIRATION_RATE", 20.0),
]

# STEP CONTRACT (biology bar): every matched answer must carry the
# 5-beat shape at depth -- >= 3 steps, >= 200 total chars.  Thin steps
# are a permanent failure.
MIN_STEPS = 3
MIN_STEP_CHARS = 200

passed = failed = contract_fail = 0
details = []
families_seen = {}
ALL_CASES = CASES + [c + (None,) for c in BRANCH_CASES]
for text, exp_struct, exp_num, exp_sub in ALL_CASES:
    r = model_biology(text)
    ok = True
    why = []
    if exp_struct is None:
        if r.matched:
            ok = False
            why.append(f"expected no match, got {r.structure} "
                       f"({r.final_answer})")
    else:
        if not r.matched:
            ok = False
            why.append("UNMATCHED")
        else:
            families_seen[r.structure] = families_seen.get(
                r.structure, 0) + 1
            if r.structure != exp_struct:
                ok = False
                why.append(f"structure {r.structure} != {exp_struct}")
            if exp_num is not None:
                got = r.numeric_answer
                if got is None or abs(got - exp_num) > max(0.01,
                                                           abs(exp_num)
                                                           * 0.01):
                    ok = False
                    why.append(f"numeric {got} != {exp_num}")
            if exp_sub is not None and exp_sub not in (r.final_answer
                                                       or ""):
                ok = False
                why.append(f"answer {r.final_answer!r} missing "
                           f"{exp_sub!r}")
            # --- STEP CONTRACT assertions (every matched probe) ---
            n_steps = len(r.steps or [])
            n_chars = sum(len(s) for s in (r.steps or []))
            if n_steps < MIN_STEPS:
                ok = False
                why.append(f"CONTRACT: {r.structure} only {n_steps} "
                           f"steps (< {MIN_STEPS})")
            if n_chars < MIN_STEP_CHARS:
                ok = False
                why.append(f"CONTRACT: {r.structure} steps total "
                           f"{n_chars} chars (< {MIN_STEP_CHARS})")
            if (n_steps < MIN_STEPS or n_chars < MIN_STEP_CHARS):
                contract_fail += 1
    if ok:
        passed += 1
    else:
        failed += 1
        details.append((text[:70], "; ".join(why)))

print(f"PASS {passed} | FAIL {failed}  (of {len(ALL_CASES)}: "
      f"{len(CASES)} main + {len(BRANCH_CASES)} branch)")
print(f"step-contract violations: {contract_fail} "
      f"(min {MIN_STEPS} steps / {MIN_STEP_CHARS} chars per matched case)")
print("families exercised:", len(families_seen), "->",
      ", ".join(sorted(families_seen)))
for d in details:
    print("  FAIL:", d)
sys.exit(1 if failed else 0)
