## ELI5
Pure silicon conducts feebly - its few thermal electrons and holes are equal and scarce. Doping changes everything: smuggle in one phosphorus per million silicon atoms and its fifth electron comes nearly free, making an n-type semiconductor where electrons rule; smuggle in boron and the missing bond travels as a hole, making p-type where holes rule. The mass-action law keeps the product honest: n-e times n-h equals n-i squared.

## DEFINITION
An **intrinsic semiconductor** is a pure semiconductor crystal (e.g., Si, Ge) in which the number of conduction electrons (\(n_e\)) equals the number of holes (\(n_h\)) at a given temperature, with both generated solely by thermal excitation across the band gap (\(n_e = n_h = n_i\)). An **extrinsic semiconductor** is formed by deliberately adding a tiny amount (ppm level) of a suitable impurity (dopant) to an intrinsic semiconductor to drastically increase its conductivity. Doping with a **pentavalent** atom (Group V: P, As, Sb) creates an **n-type** semiconductor where electrons are majority carriers (\(n_e \gg n_h\)); doping with a **trivalent** atom (Group III: B, Al, In) creates a **p-type** semiconductor where holes are majority carriers (\(n_h \gg n_e\)).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) explain the covalent-bond mechanism of electron-hole pair generation in intrinsic Si/Ge, (2) describe how pentavalent and trivalent dopants introduce donor/acceptor energy levels near the conduction/valence bands, (3) identify majority and minority carriers in n-type and p-type materials, and (4) apply the mass-action law \(n_e n_h = n_i^2\) and charge neutrality to calculate carrier concentrations for given doping densities.

## SCOPE_BOUNDARY
This node covers: intrinsic carrier generation, concept of holes as mobile positive charge carriers, doping with Group V (donors) and Group III (acceptors) impurities, formation of n-type and p-type semiconductors, energy band diagrams showing donor level \(E_D\) (just below \(E_C\)) and acceptor level \(E_A\) (just above \(E_V\)), the mass-action law \(n_e n_h = n_i^2\), and simple carrier concentration calculations. It does **NOT** cover p-n junction formation, depletion layer, diode biasing, rectifiers, or transistor action (those are subsequent nodes).

## WALKTHROUGH
Observe a smartphone or an LED bulb — their "brain" is a tiny semiconductor chip. In the previous node (c12_phy_cbse_14_001) we saw that pure Si/Ge have a band gap of ~1.1 eV / 0.7 eV. At room temperature, only a minuscule fraction of valence electrons (\(~10^{16} \text{m}^{-3}\)) gain enough thermal energy to jump to the conduction band, leaving behind holes. This intrinsic conductivity is far too low for practical devices. To make useful components, we "dope" the crystal: replace one Si atom in a million with a phosphorus atom (5 valence electrons). Four electrons form covalent bonds; the fifth is loosely bound and easily becomes a free electron — the dopant acts as a **donor**. Conversely, doping with boron (3 valence electrons) creates a missing bond (a **hole**) that readily accepts an electron — the dopant acts as an **acceptor**. The donated/accepted carriers become the **majority carriers**; the thermally generated ones become **minority carriers**. The product of their concentrations remains fixed at \(n_i^2\) (mass-action law). This controlled manipulation of carrier type and density is the foundation of all semiconductor devices.

Takeaway first: doping is arithmetic with impurities - donors add electrons, acceptors add holes, and the mass-action law forces the minority column down as the majority column rises. Exam moves: bond-mechanism questions, donor and acceptor level questions, majority-minority identification, and concentration computations via the mass-action law. Method: rerun the chip - one phosphorus in a million, the loose fifth electron ionised at room heat; then boron's vacancy doing the same for holes. Check yourself: the crystal stays neutral - every donor electron is matched by a fixed positive ion - so n-type is not negatively charged, merely electron-rich. Drill: compute the minority carrier density for one doping level and identify the majority carrier in two samples.

## DIAGNOSTIC_QUESTION_1
**REMEMBER:** State the mass-action law for a semiconductor in thermal equilibrium and give the SI unit of the intrinsic carrier concentration \(n_i\).

## DIAGNOSTIC_ANSWER_1
The mass-action law is \(n_e n_h = n_i^2\). The SI unit of \(n_i\) is \(\text{m}^{-3}\) (carriers per cubic metre).  
A wrong answer (e.g., \(n_e + n_h = n_i\) or unit \(\text{m}^{-2}\)) reveals confusion between the law of mass action (product) and charge neutrality (sum/difference) or a misunderstanding that \(n_i\) is a volume density, not an area density.

## DIAGNOSTIC_QUESTION_2
**UNDERSTAND:** In the covalent-bond model of silicon, a pentavalent phosphorus atom replaces a silicon atom. Explain why the fifth electron of phosphorus becomes a free conduction electron at room temperature, while the four bonding electrons remain tightly bound. Use the concept of ionisation energy.

## DIAGNOSTIC_ANSWER_2
The four phosphorus electrons participating in covalent bonds become part of the effective core seen by the fifth electron. The ionisation energy required to free the fifth electron is only ~0.05 eV (for Si), far smaller than the band gap (1.1 eV) and comparable to \(k_B T \approx 0.026 \text{ eV}\) at 300 K. Thus thermal energy easily ionises the donor, donating the electron to the conduction band. The bonding electrons are locked in covalent bonds requiring ~1.1 eV to break.  
A wrong answer (e.g., "all five electrons become free" or "the fifth electron is in the conduction band already") shows failure to distinguish between the donor ionisation energy and the band gap, and misunderstanding of the effective core model.

## DIAGNOSTIC_QUESTION_3
**APPLY:** A pure silicon crystal has \(5 \times 10^{28}\) atoms \(\text{m}^{-3}\) and \(n_i = 1.5 \times 10^{16} \text{m}^{-3}\) at 300 K. It is doped with \(1 \text{ ppm}\) (parts per million) of pentavalent arsenic. Calculate the equilibrium electron concentration \(n_e\) and hole concentration \(n_h\) at 300 K. Assume all donors are ionised.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Donor concentration \(N_D = 1 \text{ ppm} \times 5 \times 10^{28} \text{m}^{-3} = 10^{-6} \times 5 \times 10^{28} = 5 \times 10^{22} \text{m}^{-3}\).  
**Step 2:** Since \(N_D \gg n_i\), the electron concentration \(n_e \approx N_D = 5 \times 10^{22} \text{m}^{-3}\).  
**Step 3:** Apply mass-action law: \(n_h = \frac{n_i^2}{n_e} = \frac{(1.5 \times 10^{16})^2}{5 \times 10^{22}} = \frac{2.25 \times 10^{32}}{5 \times 10^{22}} = 4.5 \times 10^9 \text{m}^{-3}\).  
**Step 4:** Verify charge neutrality: \(n_e \approx N_D + n_h \approx 5 \times 10^{22} \text{m}^{-3}\) (since \(n_h\) is negligible).  
**Answer:** \(n_e = 5 \times 10^{22} \text{m}^{-3}\), \(n_h = 4.5 \times 10^9 \text{m}^{-3}\).  
A wrong answer (e.g., \(n_e = n_i\) or \(n_h = n_i\)) reveals the student ignores the dominance of dopant-generated carriers over thermally generated ones.

## DIAGNOSTIC_QUESTION_4
**ANALYZE:** Sketch the energy band diagram for an n-type semiconductor at room temperature. Label \(E_C\), \(E_V\), \(E_D\), \(E_F\) (Fermi level), and indicate the relative positions. Explain why \(E_F\) shifts upward compared to the intrinsic case.

## DIAGNOSTIC_ANSWER_4
The diagram shows: \(E_C\) (conduction band bottom), \(E_V\) (valence band top), \(E_D\) slightly below \(E_C\) (donor level), and \(E_F\) lying between \(E_D\) and \(E_C\) (closer to \(E_C\)).  
**Reason:** Donor atoms donate electrons to the conduction band, raising the electron concentration. The Fermi level \(E_F\) marks the energy where the probability of occupation is 1/2. With more electrons, the energy at which states are half-filled moves up toward the conduction band.  
A wrong diagram (e.g., \(E_D\) above \(E_C\) or \(E_F\) near mid-gap) indicates confusion about the donor level being a bound state just below \(E_C\) and the Fermi level's dependence on carrier concentration.

## DIAGNOSTIC_QUESTION_5
**EVALUATE:** A student claims: "In an n-type semiconductor, holes are completely absent because the pentavalent dopant donates electrons that fill all the holes." Is this statement correct? Justify using the mass-action law and the concept of thermal equilibrium.

## DIAGNOSTIC_ANSWER_5
The statement is **incorrect**. In thermal equilibrium, electron-hole pairs are continuously generated and recombined. The mass-action law \(n_e n_h = n_i^2\) holds for **both** intrinsic and extrinsic semiconductors. Since \(n_e\) is increased by doping, \(n_h\) must decrease to keep the product constant, but it never becomes zero. At 300 K, \(n_h = n_i^2 / n_e\) is small but finite (e.g., \(10^9 \text{m}^{-3}\) in the previous example).  
A wrong evaluation ("holes are absent") shows the student thinks doping eliminates the valence band or stops thermal generation, ignoring that the valence band still exists and thermal excitation still creates pairs.

## DIAGNOSTIC_QUESTION_6
**CREATE:** Design a thought experiment: A silicon sample is simultaneously doped with \(N_D = 2 \times 10^{21} \text{m}^{-3}\) donors and \(N_A = 5 \times 10^{20} \text{m}^{-3}\) acceptors (compensation doping). Predict the net carrier concentrations and the resulting semiconductor type (n-type or p-type). Explain the physical mechanism of compensation.

## DIAGNOSTIC_ANSWER_6
**Expected answer:** Net donor concentration \(N_D - N_A = 1.5 \times 10^{21} \text{m}^{-3} > 0\), so the material is **n-type**.  
\(n_e \approx N_D - N_A = 1.5 \times 10^{21} \text{m}^{-3}\).  
\(n_h = n_i^2 / n_e\).  
**Mechanism:** Each acceptor atom "captures" one donated electron (from a donor), becoming negatively ionised (\(A^-\)) and the donor becomes positively ionised (\(D^+\)). The captured electron is removed from the conduction band, effectively cancelling one donor's contribution. The remaining uncompensated donors provide the free electrons.  
A poor answer (e.g., "it becomes intrinsic" or "add the concentrations") reveals misunderstanding of charge neutrality and the fact that dopants compensate each other, not add.

## COMMON_MISCONCEPTION
**Misconception:** "In an n-type semiconductor, the donor atoms themselves become the mobile electrons."  
**Why it's wrong:** Donor atoms (e.g., P) become **fixed, positively ionised cores** (\(D^+\)) after donating their fifth electron. The donated electron becomes a **mobile conduction electron** in the crystal lattice. The dopant atom does not move; only the extra electron does. Similarly, in p-type, the acceptor becomes a fixed negative core (\(A^-\)) and the hole moves via valence electron jumps. Students often confuse the **ionised impurity** (immobile, charged) with the **free carrier** (mobile). This leads to errors in space-charge calculations (e.g., in p-n junction depletion region) and in Hall effect sign interpretation.

## ON_FAILURE
1. Revisit **c12_phy_cbse_14_001** (Energy Bands in Solids) and redraw the energy band diagram for intrinsic Si at 0 K and 300 K.  
2. Draw the 2D covalent-bond diagram for Si with one P atom and one B atom. Explicitly show: (a) the four covalent bonds of P, (b) the fifth electron loosely bound, (c) after ionisation: \(D^+\) fixed core and free electron in conduction band; for B: three bonds, one missing bond (hole), after ionisation: \(A^-\) fixed core and mobile hole in valence band.  
3. Practice the mass-action law: given \(n_i = 1.5 \times 10^{16} \text{m}^{-3}\), calculate \(n_h\) for \(n_e = 10^{20}, 10^{22}, 10^{24} \text{m}^{-3}\). Observe that \(n_h\) decreases as \(n_e\) increases, but never reaches zero.  
4. Re-attempt Diagnostic Question 3 and 6.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_14_001
## PREREQUISITE_REASONS
c12_phy_cbse_14_001: Provides the energy band model (valence band, conduction band, band gap \(E_g\)), the concept of thermal excitation of electrons across \(E_g\), and the classification of solids based on \(E_g\). Without this, the donor/acceptor levels and the mechanism of carrier generation cannot be understood.

## FORWARD_NODE_IDS
c12_phy_cbse_14_003, c12_phy_cbse_14_008

## FORWARD_REASONS
c12_phy_cbse_14_003: The formation of a p-n junction requires joining n-type and p-type semiconductors. Understanding majority/minority carriers, doping concentrations, and the Fermi level shift in each type is essential to explain diffusion, drift, depletion layer formation, and barrier potential.
c12_phy_cbse_14_008: Knowledge of n-type/p-type doping, majority/minority carriers, and donor/acceptor impurities is needed to understand the doping profiles of E, B, C regions.  

## CROSS_SUBJECT_PREREQS
c8_math_ch2_3, c8_math_ch7_2
## CROSS_SUBJECT_REASONS
c8_math_ch2_3: Exponential notation (powers of 10) is used throughout to express carrier concentrations (e.g., \(n_i = 1.5 \times 10^{16} \text{m}^{-3}\)), doping levels (ppm = \(10^{-6}\)), and the mass-action law product (\(n_i^2 = 2.25 \times 10^{32} \text{m}^{-6}\)).  
c8_math_ch7_2: Ratios and proportions are used to convert ppm (parts per million) doping into absolute impurity concentration: \(N_D = (\text{ppm}/10^6) \times \text{host atom density}\).

## CHAIN_DESCRIPTION
c12_phy_cbse_14_001 -> c12_phy_cbse_14_002 -> c12_phy_cbse_14_003

## THIS_FORMULA
Mass-action law: \(n_e n_h = n_i^2\) (units: \(\text{m}^{-6}\))  
Charge neutrality (n-type): \(n_e \approx N_D\) (when \(N_D \gg n_i\))  
Charge neutrality (p-type): \(n_h \approx N_A\) (when \(N_A \gg n_i\))  
Compensation: \(n_e - n_h = N_D - N_A\) (for \(N_D, N_A \gg n_i\))

## FORMULA_VARIABLES
\(n_e\) = free electron concentration (\(\text{m}^{-3}\))  
\(n_h\) = hole concentration (\(\text{m}^{-3}\))  
\(n_i\) = intrinsic carrier concentration (\(\text{m}^{-3}\))  
\(N_D\) = donor impurity concentration (\(\text{m}^{-3}\))  
\(N_A\) = acceptor impurity concentration (\(\text{m}^{-3}\))

## FORMULA_UNITS
\(\text{m}^{-3}\) for all concentrations; \(\text{m}^{-6}\) for \(n_i^2\).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c8_math_ch2_3 | Exponential notation (powers of 10) handles the enormous range of carrier densities from intrinsic (\(10^{16} \text{m}^{-3}\)) to heavily doped (\(10^{25} \text{m}^{-3}\)).
c8_math_ch7_2 | Ratio and proportion converts ppm doping to absolute concentration: \(1 \text{ ppm} = 1/10^6\) of host atoms.
## PREREQ_CONCEPT
Energy band theory of solids (valence band, conduction band, band gap) and thermal excitation of electrons across the gap to create electron-hole pairs.

## PREREQ_BEFORE
Student must be able to draw the energy band diagram of an intrinsic semiconductor at 0 K and at room temperature, and explain why the number of electrons equals the number of holes in an intrinsic semiconductor.

## PREREQ_STUCK
Revisit c12_phy_cbse_14_001 (Energy Bands in Solids) and review the covalent bond model of Si/Ge showing electron-hole pair generation.

## WORKED_EXAMPLE_1
**PROBLEM:** A silicon wafer at 300 K has an intrinsic carrier concentration \(n_i = 1.5 \times 10^{16} \text{m}^{-3}\). It is doped with phosphorus (pentavalent) at a concentration of \(5 \times 10^{21} \text{m}^{-3}\). Calculate the equilibrium electron concentration \(n_e\) and hole concentration \(n_h\). Identify the majority and minority carriers.

**STEPS:**
- Step 1: Identify given quantities: \(n_i = 1.5 \times 10^{16} \text{m}^{-3}\), \(N_D = 5 \times 10^{21} \text{m}^{-3}\), \(N_A = 0\). Temperature = 300 K (all donors ionised).
- Step 2: Since \(N_D \gg n_i\) (\(5 \times 10^{21} \gg 1.5 \times 10^{16}\)), the electron concentration is dominated by donors: \(n_e \approx N_D = 5 \times 10^{21} \text{m}^{-3}\).
- Step 3: Apply mass-action law \(n_e n_h = n_i^2\) to find hole concentration:  
  \(n_h = \frac{n_i^2}{n_e} = \frac{(1.5 \times 10^{16})^2}{5 \times 10^{21}} = \frac{2.25 \times 10^{32}}{5 \times 10^{21}} = 4.5 \times 10^{10} \text{m}^{-3}\).
- Step 4: Verify charge neutrality: \(n_e = N_D + n_h \approx 5 \times 10^{21} + 4.5 \times 10^{10} \approx 5 \times 10^{21} \text{m}^{-3}\) (valid).
- Step 5: Identify carriers: Electrons are majority carriers (\(n_e \gg n_h\)), holes are minority carriers. The material is n-type.

**REASONING:** At room temperature, the donor ionisation energy (~0.05 eV) is much smaller than \(k_B T\), so virtually all donors are ionised, donating electrons to the conduction band. The Fermi level shifts up near the donor level. The mass-action law, derived from detailed balance of generation and recombination, holds regardless of doping.

**ANSWER:** \(n_e = 5 \times 10^{21} \text{m}^{-3}\), \(n_h = 4.5 \times 10^{10} \text{m}^{-3}\). Majority carriers: electrons; Minority carriers: holes. Semiconductor type: n-type.

## WORKED_EXAMPLE_2
**PROBLEM:** A germanium sample at 300 K has \(n_i = 2.4 \times 10^{19} \text{m}^{-3}\). It is doped with boron (trivalent) at \(2 \times 10^{20} \text{m}^{-3}\). Calculate \(n_e\) and \(n_h\). If the same sample is additionally doped with arsenic at \(1 \times 10^{20} \text{m}^{-3}\), find the new carrier concentrations and the resulting semiconductor type.

**STEPS:**
- Step 1 (Part A - only boron): \(N_A = 2 \times 10^{20} \text{m}^{-3}\), \(N_D = 0\). Since \(N_A \gg n_i\), \(n_h \approx N_A = 2 \times 10^{20} \text{m}^{-3}\).
- Step 2: \(n_e = \frac{n_i^2}{n_h} = \frac{(2.4 \times 10^{19})^2}{2 \times 10^{20}} = \frac{5.76 \times 10^{38}}{2 \times 10^{20}} = 2.88 \times 10^{18} \text{m}^{-3}\).
- Step 3: Majority carriers = holes (p-type).
- Step 4 (Part B - compensation): Add \(N_D = 1 \times 10^{20} \text{m}^{-3}\). Net acceptor concentration: \(N_A - N_D = 2 \times 10^{20} - 1 \times 10^{20} = 1 \times 10^{20} \text{m}^{-3} > 0\).
- Step 5: Still p-type. \(n_h \approx N_A - N_D = 1 \times 10^{20} \text{m}^{-3}\).
- Step 6: \(n_e = \frac{n_i^2}{n_h} = \frac{5.76 \times 10^{38}}{1 \times 10^{20}} = 5.76 \times 10^{18} \text{m}^{-3}\).

**REASONING:** In compensation doping, donors and acceptors cancel each other's effect. Each donor electron recombines with an acceptor hole, leaving ionised \(D^+\) and \(A^-\) cores. The net doping determines the majority carrier type and concentration. The mass-action law still holds with the new majority carrier density.

**ANSWER:**  
Part A: \(n_h = 2 \times 10^{20} \text{m}^{-3}\), \(n_e = 2.88 \times 10^{18} \text{m}^{-3}\), p-type.  
Part B: \(n_h = 1 \times 10^{20} \text{m}^{-3}\), \(n_e = 5.76 \times 10^{18} \text{m}^{-3}\), still p-type (but less heavily doped).

## WORKED_EXAMPLE_3
**PROBLEM:** An intrinsic silicon sample (\(n_i = 1.5 \times 10^{16} \text{m}^{-3}\)) is doped with \(N_D = 3 \times 10^{22} \text{m}^{-3}\) donors and \(N_A = 1 \times 10^{22} \text{m}^{-3}\) acceptors. The sample is then heated to a temperature where \(n_i\) becomes \(1 \times 10^{20} \text{m}^{-3}\). Determine the electron and hole concentrations at this higher temperature. Discuss whether the semiconductor behaves as extrinsic or intrinsic at this temperature.

**STEPS:**
- Step 1: Net doping at low T: \(N_D - N_A = 2 \times 10^{22} \text{m}^{-3}\). At low T (300 K), \(n_e \approx 2 \times 10^{22} \text{m}^{-3} \gg n_i(300K) = 1.5 \times 10^{16}\). Extrinsic behaviour.
- Step 2: At high T, \(n_i = 1 \times 10^{20} \text{m}^{-3}\). Compare net doping with \(n_i\): \(N_D - N_A = 2 \times 10^{22}\) vs \(n_i = 1 \times 10^{20}\). Still \(N_D - N_A \gg n_i\).
- Step 3: Therefore, extrinsic behaviour persists. \(n_e \approx N_D - N_A = 2 \times 10^{22} \text{m}^{-3}\).
- Step 4: \(n_h = \frac{n_i^2}{n_e} = \frac{(1 \times 10^{20})^2}{2 \times 10^{22}} = \frac{1 \times 10^{40}}{2 \times 10^{22}} = 5 \times 10^{17} \text{m}^{-3}\).
- Step 5: Check intrinsic limit: If temperature were raised further so that \(n_i \approx N_D - N_A\), the material would become intrinsic. Here, \(n_i\) is still 200 times smaller than net doping.

**REASONING:** The transition from extrinsic to intrinsic behaviour occurs when the thermally generated carrier concentration \(n_i\) becomes comparable to the net doping concentration \(|N_D - N_A|\). As long as \(|N_D - N_A| \gg n_i\), the dopants dominate the carrier concentrations. The mass-action law is valid at all temperatures in thermal equilibrium.

**ANSWER:** \(n_e = 2 \times 10^{22} \text{m}^{-3}\), \(n_h = 5 \times 10^{17} \text{m}^{-3}\). The semiconductor still behaves as extrinsic (n-type) because net doping (\(2 \times 10^{22} \text{m}^{-3}\)) is much larger than \(n_i\) (\(1 \times 10^{20} \text{m}^{-3}\)).

## COMPETENCY_QUESTION_1
**QUESTION:** A student sets up an experiment to measure the Hall voltage in a silicon sample at 300 K. The sample is doped with phosphorus at \(N_D = 10^{21} \text{m}^{-3}\). The measured Hall coefficient \(R_H\) is negative.  
(a) Explain why the sign of \(R_H\) confirms n-type conduction.  
(b) If the same sample is heated to 500 K where \(n_i = 10^{22} \text{m}^{-3}\), predict the sign of \(R_H\) and justify your answer.  
(c) Sketch the energy band diagram at 500 K showing the position of the Fermi level relative to \(E_C\) and \(E_V\).

**COMPETENCY:** Interpreting physical situations using formulas and predicting outcomes from changing variables (temperature dependence of carrier concentrations).

**STEPS:**
- Step 1: Recall Hall coefficient for single carrier type: \(R_H = \frac{1}{n_e q}\) for electrons (negative), \(R_H = \frac{1}{n_h q}\) for holes (positive). Negative \(R_H\) implies majority carriers are electrons → n-type.
- Step 2: At 500 K, \(n_i = 10^{22} \text{m}^{-3}\). Compare with net doping \(N_D = 10^{21} \text{m}^{-3}\). Now \(n_i > N_D\), so intrinsic carriers dominate.
- Step 3: In intrinsic regime, \(n_e = n_h = n_i\). Both carriers contribute to Hall effect. For Si, electron mobility > hole mobility, so Hall coefficient remains negative but magnitude decreases.
- Step 4: Fermi level at 500 K moves back toward mid-gap (intrinsic position) because \(n_e \approx n_h\).

**ANSWER:**  
(a) Negative \(R_H\) indicates majority carriers are negatively charged electrons, confirming n-type.  
(b) At 500 K, \(n_i = 10^{22} \text{m}^{-3} > N_D = 10^{21} \text{m}^{-3}\). The sample becomes intrinsic. Electron and hole concentrations are nearly equal. Since electron mobility in Si is higher than hole mobility, the Hall coefficient remains negative but its magnitude drops significantly (closer to intrinsic value).  
(c) Band diagram: \(E_F\) near mid-gap (\(E_C - E_F \approx E_F - E_V\)), donor level \(E_D\) still just below \(E_C\) but now mostly neutral (electrons thermally excited to \(E_C\)).

**DIFFICULTY:** hard

## COMPETENCY_QUESTION_2
**QUESTION:** (Assertion-Reason)  
**Assertion (A):** In a p-type semiconductor, the Fermi level lies closer to the valence band than to the conduction band.  
**Reason (R):** Acceptor atoms introduce energy levels just above the valence band, which accept electrons from the valence band, creating holes as majority carriers.  
Choose the correct option:  
(1) Both A and R are true and R is the correct explanation of A.  
(2) Both A and R are true but R is NOT the correct explanation of A.  
(3) A is true but R is false.  
(4) A is false but R is true.

**COMPETENCY:** Predicting outcomes from changing variables and unit analysis (energy level positions).

**STEPS:**
- Step 1: Evaluate Assertion: In p-type, holes are majority carriers. The Fermi level \(E_F\) lies closer to \(E_V\) (valence band) because the probability of hole occupation (1 - f(E)) is high near \(E_V\). True.
- Step 2: Evaluate Reason: Acceptor level \(E_A\) is slightly above \(E_V\). Electrons from \(E_V\) jump to \(E_A\) (ionising acceptors), leaving holes in \(E_V\). This increases hole concentration. True.
- Step 3: Check causality: The acceptor level position (just above \(E_V\)) and the resulting hole majority directly cause \(E_F\) to shift down toward \(E_V\). R correctly explains A.

**ANSWER:** (1) Both A and R are true and R is the correct explanation of A.

**DIFFICULTY:** medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: An extrinsic semiconductor is formed by ______ adding a tiny amount (ppm level) of a suitable impurity (dopant) to an intrinsic semiconductor to drastically increase its conductivity.

## DIAGNOSTIC_ANSWER_7
deliberately

The deliberately adverb is doping's signature: the impurity is invited, measured in parts per million, never an accident. **A wrong answer (accidentally) reveals the student has confused engineered extrinsic material with contaminated crystal.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a smartphone or an LED bulb — their "brain" is a tiny ______ chip.

## DIAGNOSTIC_ANSWER_8
semiconductor

The semiconductor chip is the device's brain: every processor is doped silicon wearing these rules. **A wrong answer (a battery) reveals the student has misplaced the brain in an electrochemical cell.** The semiconductor chip is the device's brain: every processor is doped silicon wearing these rules.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: To make useful components, we "dope" the crystal: replace one Si atom in a million with a phosphorus atom (______ valence electrons).

## DIAGNOSTIC_ANSWER_9
5

The five is phosphorus's handshake: four electrons bond with the neighbours, the fifth hangs loose as a donor. **A wrong answer (a trivalent count) reveals the student has doped n-type material with an acceptor's arithmetic.** The five is phosphorus's handshake: four electrons bond, the fifth hangs loose as a donor.
