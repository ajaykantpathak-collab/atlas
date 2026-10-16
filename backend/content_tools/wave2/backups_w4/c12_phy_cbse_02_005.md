## ELI5
Assembling charged balls on a table: the first costs nothing, the second fights the first's field, the third fights both - and the total fight, order-independent, is the system's electrostatic potential energy. For a pair it is k q-one q-two over the distance, signs included; for a crowd, sum over every unique pair. Positive totals mean the assembly had to be pushed together against net repulsion; negative totals mean attraction helped.

## DEFINITION
The electrostatic potential energy of a system of point charges is the total work done by an external agent to assemble them from infinity to their current positions, assuming the charges are brought in from infinity with negligible kinetic energy. For a system of two charges \(q_1\) and \(q_2\) separated by distance \(r_{12}\), it is \(U = \frac{1}{4\pi\varepsilon_0} \frac{q_1 q_2}{r_{12}}\). For \(n\) charges, it is the sum over all unique pairs: \(U = \frac{1}{4\pi\varepsilon_0} \sum_{i<j} \frac{q_i q_j}{r_{ij}}\). SI unit: joule (J).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
Student can compute the net electrostatic potential energy of a system of 3–4 point charges by correctly identifying all unique pairs, substituting values with signs, and summing the pair contributions. Student can also calculate the work required to assemble a given configuration or the energy change when a charge is moved in an external field.

## SCOPE_BOUNDARY
Covers potential energy of discrete point charge systems (two, three, and \(n\) charges) and potential energy of a charge/dipole in an external electrostatic field. Does NOT cover continuous charge distributions, energy stored in capacitors (node c12_phy_cbse_02_012), or energy density of electric fields. Assumes vacuum/air as medium (\(\varepsilon_0\)); dielectric effects are in later nodes.

## WALKTHROUGH
Imagine you are building a model of a molecule using charged balls on a table. To place the first ball, no work is needed because there is no field. To bring the second ball, you must push against the repulsion (or pull against attraction) of the first — that work becomes stored energy. For the third ball, you fight the fields of both existing balls. The total stored energy is the sum of work done in each step, independent of the order. Start by recalling that work done by an external force against a conservative field equals the increase in potential energy. Use the pair-wise formula for each unique pair, being careful with signs of charges. The net energy can be positive (net repulsion) or negative (net attraction).

Takeaway first: potential energy is the assembly's accumulated work - pair by pair, sign by sign - and the order of assembly is provably irrelevant for conservative forces. Exam moves: computation questions over three or four charges with all unique pairs, sign-handling questions, assembly-work questions, and external-field questions via U equals q V. Method: rerun the molecule model - first ball free, second ball billed, third ball billed twice, the invoice totalled. Check yourself: count pairs, not ordered couples - three charges mean three pairs, not six; double-counting is the arithmetic error that survives every sign check. Drill: compute the potential energy of one three-charge triangle, watching every sign.

## DIAGNOSTIC_QUESTION_1
State the formula for the electrostatic potential energy of a system of two point charges \(q_1\) and \(q_2\) separated by distance \(r\) in vacuum. What is the SI unit of this energy?

## DIAGNOSTIC_ANSWER_1
\(U = \frac{1}{4\pi\varepsilon_0} \frac{q_1 q_2}{r}\), SI unit: joule (J). A wrong answer (e.g., missing \(4\pi\varepsilon_0\), using \(r^2\), or giving unit as eV without conversion) reveals the student has not memorised the exact Coulomb-law-derived expression or confuses it with force or potential formulas.

## DIAGNOSTIC_QUESTION_2
Two charges \(+q\) and \(-q\) are placed at a distance \(d\). A third charge \(+q\) is brought from infinity to the midpoint of the line joining them. Is the work done by the external agent positive, negative, or zero? Explain without calculation.

## DIAGNOSTIC_ANSWER_2
Zero. At the midpoint, the potentials due to \(+q\) and \(-q\) are equal in magnitude and opposite in sign, so net potential \(V=0\). Work done \(= qV = 0\). A student answering "positive" or "negative" is likely thinking of forces (which do not cancel at the midpoint) rather than potential (a scalar that adds algebraically). This exposes the common force-vs-potential confusion.

## DIAGNOSTIC_QUESTION_3
Calculate the electrostatic potential energy of a system of three charges: \(q_1 = +2\,\mu\text{C}\) at \((0,0)\), \(q_2 = -3\,\mu\text{C}\) at \((4\,\text{cm}, 0)\), and \(q_3 = +1\,\mu\text{C}\) at \((0, 3\,\text{cm})\). Use \(\frac{1}{4\pi\varepsilon_0} = 9\times10^9\,\text{N·m}^2/\text{C}^2\).

## DIAGNOSTIC_ANSWER_3
**Step 1:** Convert all distances to metres: \(r_{12}=0.04\,\text{m}\), \(r_{13}=0.03\,\text{m}\), \(r_{23}=\sqrt{0.04^2+0.03^2}=0.05\,\text{m}\).  
**Step 2:** Write pair energies:  
\(U_{12} = 9\times10^9 \frac{(2\times10^{-6})(-3\times10^{-6})}{0.04} = -1.35\,\text{J}\)  
\(U_{13} = 9\times10^9 \frac{(2\times10^{-6})(1\times10^{-6})}{0.03} = +0.60\,\text{J}\)  
\(U_{23} = 9\times10^9 \frac{(-3\times10^{-6})(1\times10^{-6})}{0.05} = -0.54\,\text{J}\)  
**Step 3:** Sum: \(U = -1.35 + 0.60 - 0.54 = -1.29\,\text{J}\).  
A wrong answer often comes from missing a pair, sign errors, or using cm without conversion. The negative result means the system is bound (net attraction).

## DIAGNOSTIC_QUESTION_4
A system of two charges \(q_1\) and \(q_2\) has potential energy \(U\). If both charges are doubled and their separation is halved, what is the new potential energy in terms of \(U\)?

## DIAGNOSTIC_ANSWER_4
Original: \(U = k \frac{q_1 q_2}{r}\). New: \(U' = k \frac{(2q_1)(2q_2)}{r/2} = k \frac{4q_1 q_2}{r/2} = 8k \frac{q_1 q_2}{r} = 8U\).  
A student answering \(4U\) or \(2U\) has missed the combined effect of charge doubling (factor 4) and distance halving (factor 2). This tests scaling reasoning.

## DIAGNOSTIC_QUESTION_5
A student claims: "The potential energy of a dipole in a uniform electric field is \(U = -pE\cos\theta\). If I rotate the dipole from \(\theta=0^\circ\) to \(\theta=180^\circ\), the change in potential energy is zero because \(\cos 0^\circ = 1\) and \(\cos 180^\circ = -1\), so \(U\) goes from \(-pE\) to \(+pE\), a change of \(2pE\)." Evaluate this statement.

## DIAGNOSTIC_ANSWER_5
The student's calculation of the change is correct (\(\Delta U = +2pE\)), but the claim "change is zero" is false. The error is in the final verbal conclusion contradicting the computed numbers. This reveals a lack of attention to the meaning of "change" and possible confusion between "change" and "final value". The correct change is \(+2pE\) (energy increases).

## DIAGNOSTIC_QUESTION_6
Design a thought experiment to determine whether the electrostatic potential energy of a system of three charges depends on the order in which they are assembled. Describe the steps and the expected outcome.

## DIAGNOSTIC_ANSWER_6
**Steps:** (1) Assemble charges \(q_1, q_2, q_3\) in order A→B→C, compute work done at each step, sum to get \(U_1\). (2) Assemble same charges in a different order (e.g., B→C→A), compute work done, sum to get \(U_2\). (3) Compare \(U_1\) and \(U_2\).  
**Expected outcome:** \(U_1 = U_2\) because electrostatic force is conservative; potential energy is a state function depending only on final configuration. A poor answer would suggest the order matters or would not invoke path-independence/conservative nature.

## COMMON_MISCONCEPTION
Students often think the potential energy of a system of charges is the sum of \(q_i V_i\) where \(V_i\) is the potential at the location of \(q_i\) due to all *other* charges, and then they forget the factor of \(1/2\) when using the formula \(U = \frac{1}{2}\sum q_i V_i\) (where \(V_i\) includes all charges). They either double-count pair energies or omit the \(1/2\) when using the "sum of qV" method. For example, for two charges they might write \(U = q_1 V_1 + q_2 V_2 = 2 \times \frac{k q_1 q_2}{r}\) instead of the correct \(\frac{k q_1 q_2}{r}\).

## ON_FAILURE
If a student double-counts or misses the 1/2 factor: (1) Re-derive the two-charge case from first principles: bring \(q_1\) (work=0), bring \(q_2\) against \(q_1\)'s field (work = \(q_2 V_1\)). Total = \(q_2 V_1\). Note that \(V_1\) is potential due to \(q_1\) only. (2) Show that \(q_1 V_2 + q_2 V_1 = 2 \times\) correct energy. (3) Practice the pair-sum method \(\sum_{i<j} \frac{k q_i q_j}{r_{ij}}\) for 3–4 charge systems until it becomes automatic. Revisit node c12_phy_cbse_02_002 (Potential Due to a Point Charge) to reinforce the definition of potential.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_02_001, c12_phy_cbse_02_002, c12_phy_cbse_02_003, c11_phy_cbse_05_001, c11_phy_cbse_05_005, c11_phy_cbse_05_009, c12_phy_cbse_02_004

## PREREQUISITE_REASONS
c12_phy_cbse_02_001: Defines electrostatic potential and potential difference, which are the basis for potential energy per unit charge.
c12_phy_cbse_02_002: Provides the potential due to a point charge, needed to compute pair-wise interaction energy.
c12_phy_cbse_02_003: Gives dipole potential, used later for dipole energy in external field.
c11_phy_cbse_05_001: Work done by a force – foundation for energy transfer.
c11_phy_cbse_05_005: Work-energy theorem – connects external work to energy change.
c11_phy_cbse_05_009: Conservative forces and potential energy – establishes path-independence.
c12_phy_cbse_02_004: Potential energy of a system of charges uses work done moving charges between equipotentials.  

## FORWARD_NODE_IDS
c12_phy_cbse_02_006, c12_phy_cbse_02_012, c12_phy_cbse_02_013, c12_phy_cbse_02_007, c12_eco_cbse_04_005

## FORWARD_REASONS
c12_phy_cbse_02_006: Directly applies system potential energy to a dipole in an external field.
c12_phy_cbse_02_012: Energy stored in a capacitor is the potential energy of the charge configuration on its plates.
c12_phy_cbse_02_013: Van de Graaff generator builds up potential energy by assembling charges on a sphere.
c12_phy_cbse_02_007: Potential energy of charge systems — basis for work done in moving charges on conductors.  
c12_eco_cbse_04_005: c12_phy_cbse_02_005 | Work-energy theorem analogy: variable cost ~ kinetic energy (depends on output), fixed cost ~ potential energy (sunk); shutdown when "revenue power" < "variable cost rate".  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_002, c11_math_cbse_10_007, c11_math_cbse_13_007
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_002: Distance formula in 3D – needed to compute separation \(r_{ij}\) between charges given coordinates.
c11_math_cbse_10_007: Slope and angle between lines – useful for dipole orientation \(\theta\) in \(U = -pE\cos\theta\).
c11_math_cbse_13_007: Derivative of polynomial functions – used in deriving force from potential energy (\(F = -dU/dr\)) in competitive exams.

## CHAIN_DESCRIPTION
c12_phy_cbse_02_002 -> c12_phy_cbse_02_005 -> c12_phy_cbse_02_006

## THIS_FORMULA
\(U = \frac{1}{4\pi\varepsilon_0} \sum_{i<j} \frac{q_i q_j}{r_{ij}}\) (J) for a system of point charges; \(U = qV(\mathbf{r})\) (J) for a single charge in external potential; \(U = -\mathbf{p}\cdot\mathbf{E} = -pE\cos\theta\) (J) for a dipole in uniform external field.

## FORMULA_VARIABLES
\(U\) = electrostatic potential energy (J); \(q_i, q_j\) = point charges (C); \(r_{ij}\) = distance between charges \(i\) and \(j\) (m); \(\varepsilon_0 = 8.85\times10^{-12}\,\text{C}^2/\text{N·m}^2\); \(V(\mathbf{r})\) = external electrostatic potential at position \(\mathbf{r}\) (V); \(\mathbf{p} = q\mathbf{d}\) = electric dipole moment (C·m); \(\mathbf{E}\) = external electric field (N/C or V/m); \(\theta\) = angle between \(\mathbf{p}\) and \(\mathbf{E}\).

## FORMULA_UNITS
J (joule), C (coulomb), m (metre), V (volt), N/C (newton per coulomb), C·m (coulomb metre)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_10_002 | Distance formula in 3D coordinates is essential to find \(r_{ij}\) when charges are placed at arbitrary \((x,y,z)\) positions.
c11_math_cbse_13_007 | Derivative of \(U(r)\) gives the electrostatic force \(F = -dU/dr\), a key link for JEE-level problems on equilibrium and oscillations.
## PREREQ_CONCEPT
Work done by an external agent against a conservative force equals the increase in potential energy of the system.

## PREREQ_BEFORE
Student must be able to calculate potential due to a point charge at any point and understand superposition of potentials.

## PREREQ_STUCK
If stuck, revisit the derivation of potential due to a point charge (c12_phy_cbse_02_002) and the work-energy theorem for conservative forces (c11_phy_cbse_05_005, c11_phy_cbse_05_009).

## WORKED_EXAMPLE_1
PROBLEM: Four identical charges \(q = 2\,\mu\text{C}\) are placed at the corners of a square of side \(10\,\text{cm}\). Find the total electrostatic potential energy of the system. Use \(k = 9\times10^9\,\text{N·m}^2/\text{C}^2\).

STEPS:
- Step 1: Identify all unique pairs. A square has 4 sides (distance \(a = 0.10\,\text{m}\)) and 2 diagonals (distance \(a\sqrt{2} = 0.1414\,\text{m}\)). Total pairs = \(\binom{4}{2} = 6\): 4 side pairs, 2 diagonal pairs.
- Step 2: Write pair energy for one side pair: \(U_{\text{side}} = k \frac{q^2}{a} = 9\times10^9 \frac{(2\times10^{-6})^2}{0.10} = 9\times10^9 \times \frac{4\times10^{-12}}{0.10} = 0.36\,\text{J}\).
- Step 3: Write pair energy for one diagonal pair: \(U_{\text{diag}} = k \frac{q^2}{a\sqrt{2}} = \frac{0.36}{\sqrt{2}} = 0.2546\,\text{J}\).
- Step 4: Total energy = \(4 \times U_{\text{side}} + 2 \times U_{\text{diag}} = 4(0.36) + 2(0.2546) = 1.44 + 0.5092 = 1.9492\,\text{J}\).
- Step 5: Verify sign: all charges positive → all pair energies positive → total positive (repulsive system). Magnitude ~1.95 J is reasonable for µC charges at cm distances.

REASONING: The pair-sum method avoids double-counting. Each pair contributes \(k q_i q_j / r_{ij}\). For identical charges, we just count the number of pairs at each distinct distance.

ANSWER: \(1.95\,\text{J}\) (approx)

## WORKED_EXAMPLE_2
PROBLEM: A charge \(q_1 = +3\,\mu\text{C}\) is fixed at the origin. A second charge \(q_2 = -2\,\mu\text{C}\) is brought from infinity to point P at \((3\,\text{cm}, 4\,\text{cm})\). Calculate the work done by the external agent. Use \(k = 9\times10^9\,\text{N·m}^2/\text{C}^2\).

STEPS:
- Step 1: Distance from origin to P: \(r = \sqrt{3^2 + 4^2} = 5\,\text{cm} = 0.05\,\text{m}\).
- Step 2: Potential at P due to \(q_1\): \(V = k \frac{q_1}{r} = 9\times10^9 \frac{3\times10^{-6}}{0.05} = 5.4\times10^5\,\text{V}\).
- Step 3: Work done by external agent = \(q_2 V = (-2\times10^{-6}) \times (5.4\times10^5) = -1.08\,\text{J}\).
- Step 4: Negative work means the external agent must *restrain* the charge (attractive force does positive work). The potential energy of the two-charge system becomes \(-1.08\,\text{J}\).
- Step 5: Check: opposite charges attract, so bringing them closer releases energy → system PE negative. Consistent.

REASONING: Work done by external agent = change in potential energy = \(q_2 V_1\) (since initial PE at infinity is zero). This is the standard assembly method.

ANSWER: \(-1.08\,\text{J}\)

## WORKED_EXAMPLE_3
PROBLEM: An electric dipole of moment \(p = 4\times10^{-29}\,\text{C·m}\) is placed in a uniform electric field \(E = 2\times10^5\,\text{N/C}\). The dipole is initially aligned with the field (\(\theta=0^\circ\)). Calculate the work required to rotate it slowly to \(\theta = 60^\circ\). Then find the torque needed to hold it at \(60^\circ\).

STEPS:
- Step 1: Potential energy of dipole in uniform field: \(U(\theta) = -pE\cos\theta\) (zero reference at \(\theta=90^\circ\)).
- Step 2: Initial energy: \(U_i = -pE\cos 0^\circ = -pE = -(4\times10^{-29})(2\times10^5) = -8\times10^{-24}\,\text{J}\).
- Step 3: Final energy: \(U_f = -pE\cos 60^\circ = -pE \times 0.5 = -4\times10^{-24}\,\text{J}\).
- Step 4: Work done by external agent = \(\Delta U = U_f - U_i = (-4 + 8)\times10^{-24} = +4\times10^{-24}\,\text{J}\). Positive work needed to rotate against the aligning torque.
- Step 5: Torque magnitude at \(\theta=60^\circ\): \(\tau = pE\sin\theta = (8\times10^{-24}) \times \sin 60^\circ = 8\times10^{-24} \times \frac{\sqrt{3}}{2} = 6.93\times10^{-24}\,\text{N·m}\).
- Step 6: Direction of torque: tends to decrease \(\theta\) (align with field). External torque must be opposite.

REASONING: The dipole's potential energy is minimum at \(\theta=0\). Rotating away increases PE. The work done equals the increase in PE. Torque is the negative derivative of U w.r.t. \(\theta\).

ANSWER: Work = \(4\times10^{-24}\,\text{J}\); Torque = \(6.93\times10^{-24}\,\text{N·m}\) (opposing the field's torque)

## COMPETENCY_QUESTION_1
QUESTION: Three charges \(+q\), \(+q\), and \(-q\) are placed at the vertices of an equilateral triangle of side \(a\). A student argues: "The potential energy of the system is zero because the total charge is \(+q\)." Is the student correct? Justify your answer by computing the actual potential energy.

COMPETENCY: Interpreting physical situations using formulas; distinguishing net charge from pair-wise interactions.

STEPS:
- Step 1: Recognize that potential energy depends on pair-wise interactions, not net charge.
- Step 2: List the three pairs: \((+q,+q)\), \((+q,-q)\), \((+q,-q)\).
- Step 3: Compute each pair energy: \(U_{++} = k\frac{q^2}{a}\) (positive); each \(U_{+-} = -k\frac{q^2}{a}\) (negative).
- Step 4: Sum: \(U = k\frac{q^2}{a} - k\frac{q^2}{a} - k\frac{q^2}{a} = -k\frac{q^2}{a}\).
- Step 5: Conclude: Net energy is negative (bound system), not zero. The student's reasoning is flawed because potential energy is not a function of total charge alone.

ANSWER: The student is incorrect. The actual potential energy is \(U = -\frac{1}{4\pi\varepsilon_0}\frac{q^2}{a}\) (negative). Total charge being non-zero does not imply zero potential energy.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A system consists of four charges at the corners of a rectangle of sides \(a\) and \(b\): \(q_1 = +Q\) at (0,0), \(q_2 = -Q\) at (a,0), \(q_3 = +Q\) at (a,b), \(q_4 = -Q\) at (0,b). Find the total electrostatic potential energy of this configuration. For what ratio \(a/b\) does the energy become zero? Interpret the physical meaning.

COMPETENCY: Predicting outcomes from changing variables; algebraic manipulation with geometric constraints.

STEPS:
- Step 1: Identify 6 pairs and their distances: sides \(a\) (two pairs: \(q_1q_2\) and \(q_3q_4\)), sides \(b\) (two pairs: \(q_1q_4\) and \(q_2q_3\)), diagonals \(\sqrt{a^2+b^2}\) (two pairs: \(q_1q_3\) and \(q_2q_4\)).
- Step 2: Write pair energies with signs:  
  \(U_{12} = k\frac{(+Q)(-Q)}{a} = -kQ^2/a\)  
  \(U_{34} = -kQ^2/a\)  
  \(U_{14} = -kQ^2/b\)  
  \(U_{23} = -kQ^2/b\)  
  \(U_{13} = k\frac{(+Q)(+Q)}{\sqrt{a^2+b^2}} = +kQ^2/\sqrt{a^2+b^2}\)  
  \(U_{24} = +kQ^2/\sqrt{a^2+b^2}\)
- Step 3: Total \(U = -2kQ^2(1/a + 1/b) + 2kQ^2/\sqrt{a^2+b^2}\).
- Step 4: Set \(U=0\): \(\frac{1}{a} + \frac{1}{b} = \frac{1}{\sqrt{a^2+b^2}}\). Let \(r = a/b\). Then \(\frac{1}{r} + 1 = \frac{\sqrt{r^2+1}}{r}\)? Wait, divide by \(b\): \(\frac{b}{a} + 1 = \frac{b}{\sqrt{a^2+b^2}}\)? Let's do carefully:  
  \(\frac{1}{a} + \frac{1}{b} = \frac{a+b}{ab}\) and \(\frac{1}{\sqrt{a^2+b^2}}\).  
  Equation: \(\frac{a+b}{ab} = \frac{1}{\sqrt{a^2+b^2}}\) → \((a+b)\sqrt{a^2+b^2} = ab\). Square both sides: \((a+b)^2(a^2+b^2) = a^2b^2\).  
  This is a quartic. Try \(a=b\): LHS = \((2a)^2(2a^2)=8a^4\), RHS = \(a^4\). Not equal.  
  Let \(x = a/b\). Then \((x+1)^2(x^2+1) = x^2\). Expand: \((x^2+2x+1)(x^2+1) = x^2\) → \(x^4+2x^3+x^2 + x^2+2x+1 = x^2\) → \(x^4+2x^3+x^2+2x+1=0\). No positive real root.  
  Actually, check sign: LHS of original equation is positive, RHS positive. But \((a+b)\sqrt{a^2+b^2} > ab\) for all positive a,b? For a=b: \(2a \cdot a\sqrt{2} = 2\sqrt{2}a^2 > a^2\). So LHS > RHS always. Thus \(U\) is always negative? Wait, the expression: \(U = 2kQ^2[1/\sqrt{a^2+b^2} - (1/a+1/b)]\). Since \(1/a+1/b > 1/\sqrt{a^2+b^2}\) always (by triangle inequality: \(a+b > \sqrt{a^2+b^2}\)), the bracket is always negative. So energy is always negative for any rectangle. It never becomes zero.
- Step 5: Physical meaning: The attractive interactions (along sides) always dominate over repulsive diagonal interactions because side distances are shorter. The system is always bound.

ANSWER: \(U = 2kQ^2\left(\frac{1}{\sqrt{a^2+b^2}} - \frac{1}{a} - \frac{1}{b}\right)\). The energy is negative for all positive \(a,b\); there is no ratio that makes it zero. The attractive nearest-neighbour interactions always outweigh the repulsive diagonal ones.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The ______ potential energy of a system of point charges is the total work done by an external agent to assemble them from infinity to their current positions, assuming the charges are brought in from infinity with negligible kinetic energy.

## DIAGNOSTIC_ANSWER_7
electrostatic

Electrostatic names the energy's currency: work stored as configuration of charges, in joules. **A wrong answer (gravitational) reveals the student has completed the definition with the analogue's name instead of the electrical one.** Electrostatic names the energy's kind: stored configuration of charges, priced in joules, every sign respected.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are building a model of a molecule using charged ______ on a table.

## DIAGNOSTIC_ANSWER_8
balls

The balls are the charges' stand-ins: neutral-looking props for quantities whose signs make the assembly cheap or expensive. **A wrong answer (beads) reveals the student has restrung the model while the walkthrough's props stay balls.** The balls are the charges' props: their placements are the configuration whose assembly the energy totals.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
Student can compute the net electrostatic potential energy of a system of 3–4 point charges by correctly identifying all unique pairs, substituting values with signs, and summing the pair contributions.

Mastery is the pair census: every unique pair found, every sign respected, the sum delivered in joules. **A wrong answer (a pair missed) reveals the student has undercounted the assembly's invoices - the most common wound in this computation.**

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine you are ______ a model of a molecule using charged balls on a table.

## DIAGNOSTIC_ANSWER_10
building

The building verb is the assembly's act: potential energy is literally the accumulated work of construction. **A wrong answer (a studying verb) reveals the student has observed the model when the definition is about building it.** The building verb is the definition's act: the energy literally is the accumulated work of construction.
