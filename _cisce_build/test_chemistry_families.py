"""test_chemistry_families.py -- acceptance harness for the batch-15b
chemistry solver families (deploy/backend/its/solver/chemistry_families.py).

Every expected value is hand-verified against the standard ICSE/CBSE
atomic-mass table (H=1, C=12, N=14, O=16, Na=23, S=32, Cl=35.5, K=39,
Ca=40, Fe=56, Cu=63.5, Zn=65, Ag=108, Ba=137, Pb=207) and the standard
constants (N_A = 6.022e23, molar volume at STP = 22.4 L, Kw = 1e-14,
CaCO3 = 100).

Run:  python D:\\platform\\_cisce_build\\test_chemistry_families.py
"""
import sys

sys.path.insert(0, "D:/platform")

from backend.its.solver.chemistry_families import model_chemistry_families

CASES = [
    # ---- equation balancing (exact small-integer solve) ----
    ("textbook: balance H2 + O2 -> H2O",
     "Balance the chemical equation: H2 + O2 -> H2O",
     "EQUATION_BALANCE", None, "2 H2 + O2 -> 2 H2O"),
    ("textbook: balance Fe + O2 -> Fe2O3",
     "Balance the equation: Fe + O2 -> Fe2O3",
     "EQUATION_BALANCE", None, "4 Fe + 3 O2 -> 2 Fe2O3"),
    ("textbook: balance Al + CuCl2 -> AlCl3 + Cu",
     "Balance: Al + CuCl2 -> AlCl3 + Cu",
     "EQUATION_BALANCE", None, "2 Al + 3 CuCl2 -> 2 AlCl3 + 3 Cu"),
    ("textbook: balance Zn + HCl -> ZnCl2 + H2",
     "Balance the equation: Zn + HCl -> ZnCl2 + H2",
     "EQUATION_BALANCE", None, "Zn + 2 HCl -> ZnCl2 + H2"),
    ("ICSE: balance Ca(NO3)2 -> CaO + NO2 + O2 (heating nitrate)",
     "Balance: Ca(NO3)2 -> CaO + NO2 + O2",
     "EQUATION_BALANCE", None, "2 Ca(NO3)2 -> 2 CaO + 4 NO2 + O2"),
    ("ICSE: balance NH3 + O2 -> N2 + H2O (burning ammonia)",
     "Balance: NH3 + O2 -> N2 + H2O",
     "EQUATION_BALANCE", None, "4 NH3 + 3 O2 -> 2 N2 + 6 H2O"),
    ("check: unbalanced equation H2 + O2 -> H2O",
     "Is the following equation balanced? H2 + O2 -> H2O",
     "EQUATION_BALANCE_CHECK", None, "not balanced"),
    ("check: balanced skeleton NaOH + HCl -> NaCl + H2O",
     "Check whether the equation is balanced: NaOH + HCl -> NaCl + H2O",
     "EQUATION_BALANCE_CHECK", None, "balanced as written"),

    # ---- language of chemistry: valency ----
    ("valency of Fe in Fe2O3 = 3 (2x + 3(-2) = 0)",
     "What is the valency of iron in Fe2O3?",
     "VALENCY_FROM_FORMULA", 3.0, "valency of Fe in Fe2O3 = 3"),
    ("valency of Al in Al2O3 = 3",
     "Find the valency of Al in Al2O3",
     "VALENCY_FROM_FORMULA", 3.0, None),
    ("valency of Zn in ZnO = 2",
     "What is the valency of zinc in ZnO?",
     "VALENCY_FROM_FORMULA", 2.0, None),
    ("valency of S in H2S = 2",
     "What is the valency of sulphur in H2S?",
     "VALENCY_FROM_FORMULA", 2.0, None),
    ("valency of P in PH3 = 3",
     "What is the valency of P in PH3?",
     "VALENCY_FROM_FORMULA", 3.0, None),
    ("valency of Cr in Cr2O3 = 3",
     "Find the valency of chromium in Cr2O3",
     "VALENCY_FROM_FORMULA", 3.0, None),

    # ---- language of chemistry: cross-over ----
    ("aluminium sulphate: Al3 + SO4(2-) -> Al2(SO4)3",
     "Write the chemical formula of aluminium sulphate",
     "CROSSOVER_NAMED", None, "Al2(SO4)3"),
    ("calcium carbonate -> CaCO3",
     "Write the formula of calcium carbonate",
     "CROSSOVER_NAMED", None, "CaCO3"),
    ("ammonium phosphate -> (NH4)3PO4",
     "What is the formula of ammonium phosphate?",
     "CROSSOVER_NAMED", None, "(NH4)3PO4"),
    ("ferric oxide -> Fe2O3",
     "Write the chemical formula of ferric oxide",
     "CROSSOVER_NAMED", None, "Fe2O3"),
    ("zinc hydroxide -> Zn(OH)2",
     "Write the formula of zinc hydroxide",
     "CROSSOVER_NAMED", None, "Zn(OH)2"),
    ("sodium carbonate -> Na2CO3",
     "What is the formula of sodium carbonate?",
     "CROSSOVER_NAMED", None, "Na2CO3"),
    ("stated valencies 3 and 2 -> A2B3",
     "The valency of element A is 3 and the valency of element B is 2. "
     "Write the formula of the compound.",
     "CROSSOVER_STATED", None, "A2B3"),

    # ---- mole concept: mass <-> moles ----
    ("moles in 36 g H2O: 36/18 = 2",
     "Calculate the number of moles in 36 g of H2O",
     "MOLE_MASS_ANY", 2.0, None),
    ("moles in 4.4 g CO2: 4.4/44 = 0.1",
     "How many moles are there in 4.4 g of CO2?",
     "MOLE_MASS_ANY", 0.1, None),
    ("mass of 0.5 mol CaCO3: 0.5 x 100 = 50 g",
     "What is the mass of 0.5 moles of CaCO3?",
     "MOLE_MASS_ANY", 50.0, None),
    ("mass of 2 mol H2SO4: 2 x 98 = 196 g",
     "Calculate the mass of 2 moles of H2SO4",
     "MOLE_MASS_ANY", 196.0, None),

    # ---- mole concept: Avogadro ----
    ("molecules in 2 mol CO2: 2 x 6.022e23",
     "Calculate the number of molecules in 2 moles of CO2",
     "PARTICLES_AVOGADRO", 1.2044e24, None),
    ("atoms in 0.5 mol H2SO4: 0.5 x 6.022e23 x 7",
     "How many atoms are there in 0.5 moles of H2SO4?",
     "PARTICLES_AVOGADRO", 2.1077e24, None),
    ("moles in 1.2044e24 molecules: /6.022e23 = 2",
     "Calculate the number of moles in 1.2044 x 10^24 molecules of CO2",
     "PARTICLES_AVOGADRO", 2.0, None),

    # ---- mole concept: molarity ----
    ("M = 0.5 mol / 0.5 L = 1",
     "Find the molarity of a solution containing 0.5 moles of NaOH "
     "dissolved in 500 mL of solution",
     "MOLARITY_ANY", 1.0, None),
    ("n = 0.5 x 0.25 = 0.125 mol",
     "How many moles of solute are in 250 mL of 0.5 M H2SO4?",
     "MOLARITY_ANY", 0.125, None),
    ("mass NaOH = 0.1 x 0.5 x 40 = 2 g",
     "Calculate the mass of NaOH required to prepare 500 mL of 0.1 M solution",
     "MOLARITY_ANY", 2.0, None),

    # ---- mole concept: STP volume ----
    ("V = 2 x 22.4 = 44.8 L",
     "What volume is occupied by 2 moles of CO2 at STP?",
     "VOLUME_AT_STP", 44.8, None),
    ("11 g CO2 = 0.25 mol -> 5.6 L",
     "What volume will 11 g of CO2 occupy at STP?",
     "VOLUME_AT_STP", 5.6, None),

    # ---- composition ----
    ("atoms in H2SO4 = 2+1+4 = 7",
     "How many atoms are there in one molecule of H2SO4?",
     "ATOM_COUNT", 7.0, None),
    ("atoms in CuSO4.5H2O = 1+1+4+10+5 = 21",
     "How many atoms are present in one formula unit of CuSO4.5H2O?",
     "ATOM_COUNT", 21.0, None),
    ("M(H2SO4) = 2+32+64 = 98",
     "Calculate the molecular mass of H2SO4",
     "MOLECULAR_MASS", 98.0, None),
    ("M(CuSO4.5H2O) = 63.5+32+64+5x18 = 249.5",
     "Calculate the molecular mass of CuSO4.5H2O",
     "MOLECULAR_MASS", 249.5, None),
    ("M(CaCO3) = 40+12+48 = 100",
     "Calculate the molecular mass of CaCO3",
     "MOLECULAR_MASS", 100.0, None),
    ("%O in CaCO3 = 48/100 x 100 = 48%",
     "Calculate the percentage of oxygen in CaCO3",
     "PERCENT_FROM_FORMULA", 48.0, None),
    ("%C in CO2 = 12/44 x 100 = 27.2727%",
     "What is the percentage of carbon in CO2?",
     "PERCENT_FROM_FORMULA", 12.0 / 44.0 * 100.0, None),
    ("% water of crystallisation in CuSO4.5H2O = 90/249.5 x 100 = 36.07%",
     "Calculate the percentage of hydrogen in CuSO4.5H2O",
     "PERCENT_FROM_FORMULA", 10.0 / 249.5 * 100.0, None),

    # ---- gas laws ----
    ("Boyle: 500 x 1/2 = 250 mL",
     "A gas occupies 500 mL at 1 atm. If the pressure is increased to "
     "2 atm at constant temperature, find the new volume.",
     "BOYLE_LAW", 250.0, None),
    ("Boyle inverse: P2 = 1 x 600/200 = 3 atm",
     "A gas at constant temperature has a volume of 600 mL at a pressure "
     "of 200 mm Hg. The volume is reduced to 200 mL. Find the new pressure.",
     "BOYLE_LAW", 600.0, None),
    ("Charles: 600 x 600/300 = 1200 mL",
     "A gas has a volume of 600 mL at constant pressure when its "
     "temperature is 27 C. If the temperature rises to 327 C, find the "
     "new volume.",
     "CHARLES_LAW", 1200.0, None),
    ("Gay-Lussac: 1 x 450/300 = 1.5 atm",
     "At constant volume, a gas at 300 K has a pressure of 1 atm. The "
     "temperature rises to 450 K. Find the new pressure.",
     "GAY_LUSSAC_LAW", 1.5, None),
    ("Combined: P2 = 2 x (3/6) x (600/300) = 2 atm",
     "Using the combined gas law: a gas at P1 = 2 atm, V1 = 3 L, "
     "T1 = 300 K is taken to V2 = 6 L and T2 = 600 K. Find P2.",
     "COMBINED_GAS_LAW", 2.0, None),

    # ---- ionic ----
    ("[OH-]=1e-3 -> pOH 3 -> pH 11",
     "The hydroxide ion concentration of a solution is 1e-3 M. Calculate "
     "the pH of the solution.",
     "PH_FROM_OH", 11.0, None),
    ("pH 5 -> pOH 9 -> [OH-] = 1e-9 M",
     "The pH of a solution is 5. Find the hydroxide ion concentration.",
     "PH_TO_OH", 1e-9, None),

    # ---- ICSE applied: hardness of water ----
    ("0.68 g CaSO4 (M=136) in 5 L -> 0.5 g CaCO3 equiv -> 100 ppm",
     "Find the degree of hardness of a water sample containing 0.68 g of "
     "CaSO4 dissolved in 5 litres of water.",
     "WATER_HARDNESS", 100.0, None),
    ("1.46 g Ca(HCO3)2 (M=162) in 10 L -> 0.9012 g equiv -> 90.12 ppm",
     "Calculate the hardness of a water sample containing 1.46 g of "
     "Ca(HCO3)2 dissolved in 10 litres of water.",
     "WATER_HARDNESS", 90.12345679012346, None),

    # ---- batch-16 book-grounded completions (TABLE_BOOKS2) ----
    # empirical formula from % composition: 40/12=3.333, 6.67/1=6.67,
    # 53.3/16=3.33 -> 1:2:1 -> CH2O
    ("books2: empirical formula 40%C 6.67%H 53.3%O -> CH2O",
     "A compound contains 40% carbon, 6.67% hydrogen and 53.3% oxygen. "
     "Find its empirical formula.",
     "EMPIRICAL_FROM_PERCENT", None, "empirical formula = CH2O"),
    # M(CH2O)=30, n=180/30=6 -> C6H12O6
    ("books2: molecular formula CH2O, M=180 -> C6H12O6",
     "The empirical formula of a compound is CH2O and its molar mass is "
     "180. Find the molecular formula.",
     "MOLECULAR_FROM_EMPIRICAL", None, "C6H12O6"),
    # M = 2 x VD = 28; M(CH2)=14; n=2 -> C2H4
    ("books2: molecular formula via vapour density 14 -> C2H4",
     "The empirical formula of a compound is CH2 and its vapour density "
     "is 14. Find the molecular formula.",
     "MOLECULAR_FROM_EMPIRICAL", None, "C2H4"),
    # 0.75 x 35 + 0.25 x 37 = 26.25 + 9.25 = 35.5
    ("books2: average atomic mass of chlorine = 35.5",
     "Chlorine has 75% Cl-35 and 25% Cl-37. Calculate the average atomic "
     "mass of chlorine.",
     "AVG_ATOMIC_MASS", 35.5, None),
    # 10/(10+90) x 100 = 10%
    ("books2: 10 g solute in 90 g water -> 10% by mass",
     "A solution contains 10 g of sugar dissolved in 90 g of water. "
     "Calculate the mass percentage of the solution.",
     "CONC_MASS_PERCENT", 10.0, None),
    # 2/(2+8) = 0.2
    ("books2: mole fraction of ethanol = 0.2",
     "Calculate the mole fraction of ethanol in a solution containing "
     "2 moles of ethanol and 8 moles of water.",
     "MOLE_FRACTION", 0.2, None),
    # H2: 4/2=2 vs O2: 3/1=3 -> H2 limiting; water = 2 x 2/2 = 2 mol = 36 g
    ("books2: limiting reagent 4 mol H2 + 3 mol O2 -> 2 mol H2O",
     "In the reaction 2 H2 + O2 -> 2 H2O, 4 moles of H2 are reacted with "
     "3 moles of O2. How many moles of water are formed?",
     "LIMITING_REAGENT", 2.0, "H2 is limiting"),
    # CH4: 8/16=0.5; O2: 8/32=0.25; ratios 0.5 vs 0.125 -> O2 limiting;
    # CO2 = 0.125/2 x 1 = 0.0625 mol = 2.75 g
    ("books2: limiting by mass 8 g CH4 + 8 g O2 -> 2.75 g CO2",
     "In the reaction CH4 + 2 O2 -> CO2 + 2 H2O, 8 g of CH4 are burnt "
     "with 8 g of O2. What mass of CO2 is formed?",
     "LIMITING_REAGENT", None, "2.75 g"),
    # 45/50 x 100 = 90%
    ("books2: percent yield 45 g / 50 g = 90%",
     "The theoretical yield of a reaction is 50 g and the actual yield is "
     "45 g. Calculate the percent yield.",
     "PERCENT_YIELD", 90.0, None),
    # 45/(90/100) = 50 g
    ("books2: theoretical yield from 45 g at 90% = 50 g",
     "The actual yield is 45 g and the percent yield is 90%. Find the "
     "theoretical yield.",
     "PERCENT_YIELD", 50.0, None),
    # 0.5 mol / 0.25 kg = 2 mol/kg
    ("books2: molality 0.5 mol NaOH in 250 g water = 2 m",
     "Calculate the molality of a solution containing 0.5 moles of NaOH "
     "in 250 g of water.",
     "MOLALITY_ANY", 2.0, None),
    # 4/40 = 0.1 mol; 0.1/0.5 kg = 0.2 mol/kg
    ("books2: molality 4 g NaOH in 500 g water = 0.2 m",
     "Calculate the molality of a solution containing 4 g of NaOH "
     "dissolved in 500 g of water.",
     "MOLALITY_ANY", 0.2, None),
    # 0.5 x 2 = 1 N
    ("books2: normality of 0.5 M H2SO4 = 1 N",
     "Calculate the normality of a 0.5 M H2SO4 solution.",
     "NORMALITY_ANY", 1.0, None),
    # 6/3 = 2 M
    ("books2: molarity of 6 N H3PO4 = 2 M",
     "Calculate the molarity of a 6 N H3PO4 solution from its normality.",
     "NORMALITY_ANY", 2.0, None),
    # M2 = 2 x 0.5/2 = 0.5 M
    ("books2: dilution 500 mL of 2 M to 2 L -> 0.5 M",
     "500 mL of a 2 M solution is diluted to 2 L. Find the molarity of "
     "the diluted solution.",
     "DILUTION_M1V1", 0.5, None),
    # V1 = 0.5 x 0.5/2 = 0.125 L = 125 mL
    ("books2: stock volume 125 mL of 2 M for 500 mL of 0.5 M",
     "What volume of 2 M stock solution is required to prepare 500 mL of "
     "a 0.5 M solution by dilution?",
     "DILUTION_M1V1", 0.125, "125 mL"),
    # equivalents: 2 x 0.5 x 0.02 = 0.02; M(NaOH) = 0.02/(1 x 0.05) = 0.4
    ("books2: titration 20 mL 0.5 M H2SO4 vs 50 mL NaOH -> 0.4 M",
     "20 mL of 0.5 M H2SO4 completely neutralises 50 mL of NaOH solution. "
     "Find the molarity of the NaOH solution.",
     "TITRATION_NORMALITY", 0.4, None),
    # 0.2 x 0.025 = 0.005 eq; N = 0.005/0.040 = 0.125 N
    ("books2: titration 25 mL 0.2 N NaOH vs 40 mL H2SO4 -> 0.125 N",
     "25 mL of 0.2 N NaOH completely neutralises 40 mL of H2SO4 solution. "
     "Find the normality of the H2SO4 solution.",
     "TITRATION_NORMALITY", 0.125, None),
    # dn = 2 - 4 = -2; Kp = 0.5 x (0.0831 x 300)^-2
    ("books2: Kp from Kc for N2 + 3 H2 -> 2 NH3 at 300 K",
     "For the reaction N2 + 3 H2 -> 2 NH3 at 300 K, Kc is 0.5. Calculate "
     "Kp.",
     "KP_KC_CONVERT", 0.5 / (0.0831 * 300.0) ** 2, None),
    # dn = +1; Kc = 0.5 / (0.0831 x 300)
    ("books2: Kc from Kp for N2O4 <-> 2 NO2 at 300 K",
     "For the reaction N2O4 <-> 2 NO2 at 300 K, Kp is 0.5. Calculate Kc.",
     "KP_KC_CONVERT", 0.5 / (0.0831 * 300.0), None),
    # K2(+2) + 2Cr + 7(-2) = 0 -> 2Cr = +12 -> Cr = +6
    ("books2: oxidation number of Cr in K2Cr2O7 = +6",
     "Calculate the oxidation number of Cr in K2Cr2O7.",
     "OXIDATION_NUMBER", 6.0, None),
    # K(+1) + Mn + 4(-2) = 0 -> Mn = +7
    ("books2: oxidation number of Mn in KMnO4 = +7",
     "Calculate the oxidation number of Mn in KMnO4.",
     "OXIDATION_NUMBER", 7.0, None),
    # 2(+1) + S + 4(-2) = 0 -> S = +6
    ("books2: oxidation number of sulphur in H2SO4 = +6",
     "Calculate the oxidation number of sulphur in H2SO4.",
     "OXIDATION_NUMBER", 6.0, None),
    # Q = 2 x 600 = 1200 C; m = 63.5 x 1200/(2 x 96500) = 0.394819 g
    ("books2: Faraday mass Cu at 2 A for 10 min",
     "A current of 2 A is passed through a solution of CuSO4 for 10 "
     "minutes. Calculate the mass of copper deposited.",
     "FARADAY_MASS", 63.5 * 1200.0 / (2.0 * 96500.0), None),
    # Q = 5 x 1200 = 6000 C; m = 108 x 6000/(1 x 96500) = 6.715 g
    ("books2: Faraday mass Ag at 5 A for 20 min",
     "A current of 5 A is passed through a solution of AgNO3 for 20 "
     "minutes. Calculate the mass of silver deposited.",
     "FARADAY_MASS", 108.0 * 6000.0 / 96500.0, None),
    # E(cell) = 0.34 - (-0.76) = +1.10 V
    ("books2: cell potential Zn/Cu = +1.10 V",
     "A cell has E(Zn2/Zn) is -0.76 V and E(Cu2/Cu) is +0.34 V. Calculate "
     "the cell potential.",
     "CELL_POTENTIAL", 1.1, None),
    # n = log 9 / log 3 = 2 (second order)
    ("books2: rate order 2 from tripling -> 9x rate",
     "When the concentration of a reactant is tripled, the rate becomes 9 "
     "times. Find the order of the reaction.",
     "RATE_ORDER_FROM_DATA", 2.0, None),
    # rate unchanged -> zero order
    ("books2: rate order 0 when rate unchanged",
     "When the concentration of a reactant is doubled, the rate remains "
     "unchanged. Find the order of the reaction.",
     "RATE_ORDER_FROM_DATA", 0.0, None),
    # t(1/2) = 0.693/0.02 = 34.65 min
    ("books2: half-life from k = 0.02 per min -> 34.65",
     "The rate constant is 0.02 per minute for a first-order reaction. "
     "Calculate the half-life.",
     "HALF_LIFE_FIRST_ORDER", 34.65, None),
    # k = 0.693/600 s = 0.001155 per s
    ("books2: rate constant from t(1/2) = 10 min -> 0.001155 per s",
     "The half-life of a first-order reaction is 10 minutes. Calculate "
     "the rate constant.",
     "HALF_LIFE_FIRST_ORDER", 0.693 / 600.0, None),
    # 30 min = 3 half-lives -> (1/2)^3 = 0.125
    ("books2: fraction after 3 half-lives = 0.125",
     "A reaction has a half-life of 10 minutes. What fraction of the "
     "reactant remains after 30 minutes?",
     "REMAINING_AFTER_HALFLIVES", 0.125, None),
    # 2 half-lives from 100 g -> 25 g left
    ("books2: 100 g left 20 min (t1/2 10 min) -> 25 g",
     "A first-order reaction starts with 100 g of reactant and has a "
     "half-life of 10 minutes. How much remains after 20 minutes?",
     "REMAINING_AFTER_HALFLIVES", 25.0, None),
    # pentane: n-pentane, isopentane, neopentane = 3
    ("books2: isomers of C5H12 = 3",
     "How many structural isomers are possible for C5H12?",
     "ISOMER_COUNT_ALKANE", 3.0, None),
    ("books2: isomers of butane = 2",
     "How many isomers does butane have?",
     "ISOMER_COUNT_ALKANE", 2.0, None),
    ("books2: isomers of octane = 18",
     "How many structural isomers are possible for octane?",
     "ISOMER_COUNT_ALKANE", 18.0, None),
    # alkane series: propane C3H8 -> butane C4H10
    ("books2: next homologue of propane = butane (C4H10)",
     "What is the next homologue of propane?",
     "HOMOLOG_NEXT", None, "C4H10"),
    # alkene series: C2H4 -> C3H6
    ("books2: next homologue of C2H4 = C3H6",
     "What is the next homologue of C2H4?",
     "HOMOLOG_NEXT", None, "C3H6"),
    # alkyne series: ethyne C2H2 -> propyne C3H4
    ("books2: next homologue of ethyne = propyne (C3H4)",
     "What is the next homologue of ethyne?",
     "HOMOLOG_NEXT", None, "C3H4"),
]

NEGATIVES = [
    "Solve 2x + 3 = 11 for x",
    "The area of a circle of radius 7 cm",
    "A train travels 120 km in 2 hours. Find its speed.",
    "Photosynthesis converts carbon dioxide into glucose in leaves.",
    "Find the simple interest on 5000 at 8% for 3 years",
    "The mass of the earth is 5.97 x 10^24 kg. What is its radius?",
    # batch-16 families must also decline other-subject shapes
    "The radioactive isotope Co-60 has a half-life of 5.27 years. What "
    "fraction of a sample remains after 15.81 years?",
    "A charge of 10 C flows through a copper wire in 2 seconds. Find the "
    "current in the wire.",
    "When the price of a commodity doubles, its demand becomes 0.5 times. "
    "Find the price elasticity of demand.",
]


def close(a, b, tol=1e-3):
    return abs(a - b) <= abs(b) * tol + 1e-12


def main():
    fails = []
    for label, text, want_sid, want_val, want_sub in CASES:
        r = model_chemistry_families(text)
        problems = []
        if not r.matched:
            problems.append(f"declined (note={r.note!r})")
        else:
            if r.structure != want_sid:
                problems.append(f"structure={r.structure} want {want_sid}")
            if want_val is not None and (
                    r.numeric_answer is None
                    or not close(r.numeric_answer, want_val)):
                problems.append(f"value={r.numeric_answer!r} want {want_val}")
            if want_sub is not None and want_sub not in (r.final_answer or ""):
                problems.append(
                    f"answer={r.final_answer!r} missing {want_sub!r}")
        if problems:
            fails.append((label, text, problems))
        print(("ok   " if not problems else "FAIL ") + label)
        if problems:
            for p in problems:
                print("       - " + p)

    for text in NEGATIVES:
        r = model_chemistry_families(text)
        if r.matched:
            fails.append(("negative", text, [f"fired {r.structure}"]))
            print(f"FAIL negative fired {r.structure}: {text[:60]}")
        else:
            print("ok   negative refused: " + text[:50])

    print(f"\n{len(CASES)} positive + {len(NEGATIVES)} negative cases")
    if fails:
        print(f"{len(fails)} FAILURES")
        return 1
    print("ALL GREEN")
    return 0


if __name__ == "__main__":
    sys.exit(main())
