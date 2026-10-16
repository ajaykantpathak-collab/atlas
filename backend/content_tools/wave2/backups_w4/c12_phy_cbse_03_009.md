## ELI5
Diwali string lights die whole when one bulb fails - that is series; the home's fan ignores the bedroom's switch - that is parallel. Combination of resistors is the grammar of both: in series, one path carries the same current and resistances add; in parallel, the branches share voltage and reciprocals add, making the equivalent smaller than the smallest. Kirchhoff's two conservations derive both, and mixed networks fall to repeated simplification.

## DEFINITION
Combination of resistors refers to connecting two or more resistors in an electrical circuit such that they can be replaced by a single equivalent resistor. In a **series combination**, resistors are connected end-to-end providing a single path for current; the same current flows through each resistor and the equivalent resistance is the sum of individual resistances: \(R_{\text{eq}} = R_1 + R_2 + \dots + R_n\). In a **parallel combination**, resistors are connected across the same two nodes providing multiple paths for current; the voltage across each resistor is the same and the reciprocal of the equivalent resistance equals the sum of reciprocals of individual resistances: \(\frac{1}{R_{\text{eq}}} = \frac{1}{R_1} + \frac{1}{R_2} + \dots + \frac{1}{R_n}\). The SI unit of equivalent resistance is ohm (Ω).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can (1) correctly identify series and parallel connections in a given circuit diagram, (2) compute the equivalent resistance for pure series, pure parallel, and mixed series-parallel networks using the appropriate formulas, and (3) apply Ohm's law to find the total current, branch currents, and voltage drops across each resistor in the network.

## SCOPE_BOUNDARY
This node covers series and parallel combinations of resistors only. It includes derivation of equivalent resistance formulas from Kirchhoff's laws, voltage division in series, current division in parallel, and analysis of mixed networks. It does NOT cover Kirchhoff's laws for arbitrary networks (node c12_phy_cbse_03_005), Wheatstone bridge (c12_phy_cbse_03_006), meter bridge (c12_phy_cbse_03_007), potentiometer (c12_phy_cbse_03_008), cells in series/parallel (c12_phy_cbse_03_010), or electrical energy and power (c12_phy_cbse_03_011).

## WALKTHROUGH
Observe the decorative LED string lights used during Diwali: when one bulb fuses, the entire string goes off — this is a **series** connection. Now observe the wiring in your home: switching off the bedroom light does not affect the kitchen fan — this is a **parallel** connection. Begin by identifying whether resistors share the same current (series) or the same voltage (parallel). Use Kirchhoff's junction rule (current conservation) and loop rule (energy conservation) to derive the equivalent resistance formulas. For mixed networks, simplify step-by-step by replacing series/parallel groups with their equivalents until a single resistance remains. The key formulas are \(R_{\text{eq}} = \sum R_i\) for series and \(\frac{1}{R_{\text{eq}}} = \sum \frac{1}{R_i}\) for parallel.

Takeaway first: series shares current and adds resistances; parallel shares voltage and adds reciprocals - both derivable from the junction and loop rules rather than memorised. Exam moves: identification questions on circuit diagrams, computation questions across series, parallel and mixed networks, and application questions distributing voltages and currents. Method: rerun the Diwali lights and the household wiring - the fused string against the independent branches - then simplify a mixed network stepwise. Check yourself: the parallel branch does not force equal currents - each branch takes inversely as its resistance - and the flagged misconception is precisely assuming the series rule there. Drill: reduce one mixed network and compute every branch current.

## DIAGNOSTIC_QUESTION_1
State the formula for equivalent resistance when three resistors \(R_1, R_2, R_3\) are connected in series and when they are connected in parallel. Give the SI unit of equivalent resistance.

## DIAGNOSTIC_ANSWER_1
Series: \(R_{\text{eq}} = R_1 + R_2 + R_3\); Parallel: \(\frac{1}{R_{\text{eq}}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3}\); Unit: ohm (Ω). A wrong answer (e.g., using product-over-sum for series or adding reciprocals for parallel) reveals confusion between the two combination rules and inability to recall the defining characteristic: same current in series, same voltage in parallel.

## DIAGNOSTIC_QUESTION_2
Explain why the equivalent resistance of a parallel combination is always smaller than the smallest individual resistor, while the equivalent resistance of a series combination is always larger than the largest individual resistor.

## DIAGNOSTIC_ANSWER_2
In parallel, multiple current paths are added, increasing total conductance (\(G = 1/R\)), so equivalent resistance decreases below the smallest branch resistance. In series, the current must pass through all resistors sequentially, adding their resistances, so equivalent resistance exceeds the largest individual resistance. A wrong answer (e.g., "parallel adds resistance") shows the student memorizes formulas without understanding the physical meaning of conductance and current division.

## DIAGNOSTIC_QUESTION_3
Three resistors of 2 Ω, 3 Ω, and 6 Ω are connected in parallel across a 12 V battery. Calculate (a) the equivalent resistance, (b) the total current drawn from the battery, and (c) the current through the 3 Ω resistor.

## DIAGNOSTIC_ANSWER_3
(a) \(\frac{1}{R_{\text{eq}}} = \frac{1}{2} + \frac{1}{3} + \frac{1}{6} = 1 \Rightarrow R_{\text{eq}} = 1\ \Omega\). (b) \(I_{\text{total}} = \frac{V}{R_{\text{eq}}} = \frac{12\ \text{V}}{1\ \Omega} = 12\ \text{A}\). (c) \(I_{3\Omega} = \frac{V}{R} = \frac{12\ \text{V}}{3\ \Omega} = 4\ \text{A}\). A wrong answer (e.g., \(R_{\text{eq}} = 11\ \Omega\) by adding) indicates the student applied the series formula to a parallel circuit. A wrong current division (e.g., using \(I_{\text{total}} \times \frac{R_{\text{eq}}}{R}\)) shows misunderstanding of current divider rule.

## DIAGNOSTIC_QUESTION_4
A circuit consists of a 4 Ω resistor in series with a parallel combination of 6 Ω and 3 Ω resistors. The combination is connected to a 24 V battery. Find the voltage across the 6 Ω resistor.

## DIAGNOSTIC_ANSWER_4
Parallel equivalent: \(\frac{1}{R_p} = \frac{1}{6} + \frac{1}{3} = \frac{1}{2} \Rightarrow R_p = 2\ \Omega\). Total resistance: \(R_{\text{eq}} = 4 + 2 = 6\ \Omega\). Total current: \(I = \frac{24}{6} = 4\ \text{A}\). Voltage across parallel combination: \(V_p = I \times R_p = 4 \times 2 = 8\ \text{V}\). Since 6 Ω and 3 Ω are in parallel, voltage across 6 Ω = 8 V. A wrong answer (e.g., 24 V or 12 V) reveals the student cannot isolate the parallel sub-circuit or misapplies voltage division.

## DIAGNOSTIC_QUESTION_5
A student claims: "In a series circuit with two resistors of different values, the larger resistor dissipates more power. In a parallel circuit with the same two resistors, the larger resistor also dissipates more power." Evaluate this claim.

## DIAGNOSTIC_ANSWER_5
The claim is **false** for parallel. In series, same current \(I\) flows, so \(P = I^2R\) → larger \(R\) dissipates more power (true). In parallel, same voltage \(V\) applies, so \(P = V^2/R\) → larger \(R\) dissipates **less** power. A student who says "true for both" confuses the power formulas and fails to recognize that the conserved quantity changes from current (series) to voltage (parallel).

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a 9 V battery, three resistors (100 Ω, 220 Ω, 470 Ω), a multimeter, and connecting wires to verify the equivalent resistance formulas for series and parallel combinations. Describe the steps and the measurements you would take.

## DIAGNOSTIC_ANSWER_6
Steps: (1) Measure each resistor individually with multimeter in ohmmeter mode (power off). (2) Connect them in series, measure total resistance between ends — should equal sum. (3) Connect them in parallel (all three leads joined at two common nodes), measure total resistance — should equal reciprocal of sum of reciprocals. (4) Optionally, connect battery, measure voltage across combination and total current with multimeter in ammeter mode, compute \(R = V/I\) and compare. A poor answer (e.g., "measure current only" or "connect battery while measuring resistance") shows lack of practical skill: ohmmeter requires no external voltage, and ammeter must be in series.

## COMMON_MISCONCEPTION
Students often think that in a parallel circuit, the current is the same through each branch because "current is constant in a circuit." They apply the series rule (same current) to parallel branches, leading to incorrect current division. For example, given a 12 V battery with 4 Ω and 6 Ω in parallel, they might say "total resistance = 10 Ω, current = 1.2 A, so each resistor gets 1.2 A" instead of recognizing voltage is same (12 V) and currents are 3 A and 2 A respectively. This error stems from not distinguishing between "same current" (series) and "same voltage" (parallel) as the defining constraint.

## ON_FAILURE
1. Revisit the water flow analogy: series = single pipe with constrictions (same flow rate, pressure drops add); parallel = multiple pipes from same header (same pressure, flow rates add). 2. Draw a circuit diagram, label nodes, and explicitly write: "Series: same I, V splits" and "Parallel: same V, I splits" on the diagram. 3. Solve 5 pure-series and 5 pure-parallel numerical problems from NCERT Exercise 3.1–3.3, checking each step with the defining constraint. 4. If confusion persists, review Kirchhoff's junction rule (c12_phy_cbse_03_005) to see how current conservation forces current division in parallel.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_03_001, c12_phy_cbse_03_002, c10_phy_cbse_01_006, c10_phy_cbse_01_007, c12_phy_cbse_03_004

## PREREQUISITE_REASONS
c12_phy_cbse_03_001: Defines electric current and its direction, essential for understanding current flow in branches.
c12_phy_cbse_03_002: Ohm's law (V=IR) is the fundamental relation used to derive equivalent resistance formulas.
c10_phy_cbse_01_006: Class 10 series combination formula and voltage division rule are directly extended here.
c10_phy_cbse_01_007: Class 10 parallel combination formula and current division rule are directly extended here.
c12_phy_cbse_03_004: Series/parallel combinations of resistors with different α values lead to complex temperature dependence of equivalent resistance.  

## FORWARD_NODE_IDS
c12_phy_cbse_03_006, c12_phy_cbse_03_007, c12_phy_cbse_03_010, c12_phy_cbse_03_011

## FORWARD_REASONS
c12_phy_cbse_03_006: Wheatstone bridge balance condition uses series/parallel logic in its derivation.
c12_phy_cbse_03_007: Meter bridge is a practical application of Wheatstone bridge with a uniform wire acting as series resistors.
c12_phy_cbse_03_010: Cells in series/parallel combine emf and internal resistance exactly like resistors.
c12_phy_cbse_03_011: Power calculations in networks require equivalent resistance to find total current/voltage.

## CROSS_SUBJECT_PREREQS
c6_math_ch03_033, c6_math_ch03_036, c7_math_ch04_006, c8_math_ch2_7, c9_math_ch2_8, c10_math_cbse_03_005
## CROSS_SUBJECT_REASONS
c6_math_ch03_033: Addition of fractions is needed for summing reciprocals in parallel formula.
c6_math_ch03_036: Division of fractions is used when inverting the sum of reciprocals to get equivalent resistance.
c7_math_ch04_006: Simplification of algebraic expressions is required to manipulate combination formulas with variables.
c8_math_ch2_7: Laws of exponents help when dealing with powers of 10 in resistance values (e.g., kΩ, MΩ).
c9_math_ch2_8: Substitution method solves simultaneous equations arising in mixed network analysis.
c10_math_cbse_03_005: Substitution method for linear equations is used to solve for unknown currents in multi-loop circuits.

## CHAIN_DESCRIPTION
c12_phy_cbse_03_002 -> c12_phy_cbse_03_009 -> c12_phy_cbse_03_005

## THIS_FORMULA
Series: \(R_{\text{eq}} = R_1 + R_2 + \dots + R_n\) (Ω); Parallel: \(\frac{1}{R_{\text{eq}}} = \frac{1}{R_1} + \frac{1}{R_2} + \dots + \frac{1}{R_n}\) (Ω); Voltage division (series): \(V_k = V_{\text{total}} \frac{R_k}{R_{\text{eq}}}\) (V); Current division (two parallel): \(I_1 = I_{\text{total}} \frac{R_2}{R_1 + R_2}\) (A)

## FORMULA_VARIABLES
\(R_{\text{eq}}\) = equivalent resistance (Ω), \(R_1, R_2, \dots, R_n\) = individual resistances (Ω), \(V_{\text{total}}\) = total voltage across combination (V), \(V_k\) = voltage across resistor \(R_k\) (V), \(I_{\text{total}}\) = total current entering combination (A), \(I_1, I_2\) = branch currents (A)

## FORMULA_UNITS
Ω, V, A

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c6_math_ch03_033 | Adding fractions with different denominators is exactly the mathematical operation used when summing 1/R for parallel resistors.
c9_math_ch2_8 | Solving linear equations by substitution is the algebraic technique used to find branch currents in mixed series-parallel networks.
## PREREQ_CONCEPT
Ohm's law (V=IR) and the concept of conservation of charge (Kirchhoff's junction rule) and energy (Kirchhoff's loop rule).

## PREREQ_BEFORE
The student must be able to state Ohm's law, identify series and parallel connections in a diagram, and compute equivalent resistance for simple series/parallel cases from Class 10.

## PREREQ_STUCK
If stuck, revisit Ohm's law (c12_phy_cbse_03_002) and practice identifying series vs parallel connections using the "same current" vs "same voltage" test.

## WORKED_EXAMPLE_1
PROBLEM: A 12 V car battery is connected to three resistors in series: 2 Ω (headlight), 4 Ω (taillight), and 6 Ω (dashboard light). Find (a) the equivalent resistance, (b) the current in the circuit, and (c) the voltage across the 4 Ω taillight.
STEPS:
- Step 1: Identify given quantities: \(V = 12\ \text{V}\), \(R_1 = 2\ \Omega\), \(R_2 = 4\ \Omega\), \(R_3 = 6\ \Omega\). Series connection → same current.
- Step 2: Equivalent resistance formula for series: \(R_{\text{eq}} = R_1 + R_2 + R_3\).
- Step 3: Substitute: \(R_{\text{eq}} = 2 + 4 + 6 = 12\ \Omega\).
- Step 4: Total current using Ohm's law: \(I = \frac{V}{R_{\text{eq}}} = \frac{12\ \text{V}}{12\ \Omega} = 1\ \text{A}\).
- Step 5: Voltage across 4 Ω: \(V_2 = I R_2 = (1\ \text{A})(4\ \Omega) = 4\ \text{V}\). Check: \(V_1 + V_2 + V_3 = 2 + 4 + 6 = 12\ \text{V}\) ✓.
REASONING: In series, current is common, so we first find total resistance, then total current, then individual voltage drops using Ohm's law. The sum of voltage drops must equal the battery voltage (Kirchhoff's loop rule).
ANSWER: (a) 12 Ω, (b) 1 A, (c) 4 V

## WORKED_EXAMPLE_2
PROBLEM: In a household lighting circuit, three LED bulbs rated 100 Ω, 200 Ω, and 300 Ω are connected in parallel across a 240 V mains supply. Find (a) the equivalent resistance, (b) the total current drawn from mains, and (c) the current through the 200 Ω bulb.
STEPS:
- Step 1: Given: \(V = 240\ \text{V}\), \(R_1 = 100\ \Omega\), \(R_2 = 200\ \Omega\), \(R_3 = 300\ \Omega\). Parallel → same voltage across each.
- Step 2: Parallel equivalent formula: \(\frac{1}{R_{\text{eq}}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3}\).
- Step 3: Compute reciprocals: \(\frac{1}{100} = 0.01\), \(\frac{1}{200} = 0.005\), \(\frac{1}{300} \approx 0.00333\). Sum = 0.01833 S.
- Step 4: \(R_{\text{eq}} = \frac{1}{0.01833} \approx 54.55\ \Omega\). (Exact fraction: \(\frac{1}{R_{\text{eq}}} = \frac{6+3+2}{600} = \frac{11}{600} \Rightarrow R_{\text{eq}} = \frac{600}{11} \approx 54.55\ \Omega\)).
- Step 5: Total current: \(I_{\text{total}} = \frac{V}{R_{\text{eq}}} = \frac{240}{600/11} = \frac{240 \times 11}{600} = 4.4\ \text{A}\).
- Step 6: Current through 200 Ω: \(I_2 = \frac{V}{R_2} = \frac{240}{200} = 1.2\ \text{A}\). Check: \(I_1 + I_2 + I_3 = 2.4 + 1.2 + 0.8 = 4.4\ \text{A}\) ✓.
REASONING: In parallel, voltage is common, so we find equivalent resistance via conductance sum, then total current, then individual branch currents using Ohm's law. The sum of branch currents equals total current (Kirchhoff's junction rule).
ANSWER: (a) 600/11 Ω ≈ 54.55 Ω, (b) 4.4 A, (c) 1.2 A

## WORKED_EXAMPLE_3
PROBLEM: A circuit has a 10 Ω resistor in series with a parallel combination of 15 Ω and 30 Ω resistors. This network is connected to a 60 V battery. Find (a) the equivalent resistance of the network, (b) the total current, (c) the voltage across the parallel combination, (d) the power dissipated in the 15 Ω resistor.
STEPS:
- Step 1: Simplify parallel branch: \(\frac{1}{R_p} = \frac{1}{15} + \frac{1}{30} = \frac{2+1}{30} = \frac{3}{30} = \frac{1}{10} \Rightarrow R_p = 10\ \Omega\).
- Step 2: Total equivalent resistance: \(R_{\text{eq}} = 10\ \Omega\ (\text{series}) + 10\ \Omega\ (\text{parallel equivalent}) = 20\ \Omega\).
- Step 3: Total current from battery: \(I_{\text{total}} = \frac{V}{R_{\text{eq}}} = \frac{60\ \text{V}}{20\ \Omega} = 3\ \text{A}\).
- Step 4: Voltage across series 10 Ω: \(V_{10} = I_{\text{total}} \times 10 = 30\ \text{V}\). Voltage across parallel combination: \(V_p = 60 - 30 = 30\ \text{V}\) (or \(I_{\text{total}} \times R_p = 3 \times 10 = 30\ \text{V}\)).
- Step 5: Current through 15 Ω: \(I_{15} = \frac{V_p}{15} = \frac{30}{15} = 2\ \text{A}\). (Current through 30 Ω = 1 A; sum = 3 A ✓).
- Step 6: Power in 15 Ω: \(P = I_{15}^2 R = (2)^2 \times 15 = 60\ \text{W}\). Alternatively, \(P = \frac{V_p^2}{R} = \frac{900}{15} = 60\ \text{W}\).
REASONING: Mixed networks are simplified stepwise: replace parallel groups with equivalent, then treat as series. Once total current is known, work backwards to find voltages and currents in the original branches. Power calculation uses the branch-specific current or voltage.
ANSWER: (a) 20 Ω, (b) 3 A, (c) 30 V, (d) 60 W

## COMPETENCY_QUESTION_1
QUESTION: Two resistors \(R_1 = 10\ \Omega\) and \(R_2 = 20\ \Omega\) are connected in parallel across a battery of negligible internal resistance. A student argues: "Since \(R_2\) is larger, it will draw more current and dissipate more power." Is the student correct? Justify your answer using the relevant formulas.
COMPETENCY: Predicting outcomes from changing variables
STEPS:
- Step 1: Recognize parallel connection → same voltage \(V\) across both resistors.
- Step 2: Current through each: \(I_1 = V/R_1\), \(I_2 = V/R_2\). Since \(R_2 > R_1\), \(I_2 < I_1\). The larger resistor draws LESS current.
- Step 3: Power dissipated: \(P_1 = V^2/R_1\), \(P_2 = V^2/R_2\). Since \(R_2 > R_1\), \(P_2 < P_1\). The larger resistor dissipates LESS power.
- Step 4: Conclude the student's claim is incorrect for both current and power in parallel. (In series, the opposite would be true.)
ANSWER: The student is incorrect. In parallel, voltage is same; current is inversely proportional to resistance (\(I \propto 1/R\)), so the 20 Ω resistor draws half the current of the 10 Ω resistor. Power \(P = V^2/R\) is also inversely proportional to resistance, so the 20 Ω resistor dissipates half the power.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A 12 V battery with internal resistance 1 Ω is connected to a network where a 6 Ω resistor is in series with a parallel combination of two 12 Ω resistors. (a) Find the total current supplied by the battery. (b) Find the terminal voltage of the battery. (c) If one of the 12 Ω resistors is removed (open circuit), how does the terminal voltage change? Explain.
COMPETENCY: Interpreting physical situations using formulas
STEPS:
- Step 1: Simplify parallel branch: two 12 Ω in parallel → \(R_p = 6\ \Omega\).
- Step 2: Total external resistance: \(R_{\text{ext}} = 6\ \Omega\ (\text{series}) + 6\ \Omega\ (\text{parallel eq.}) = 12\ \Omega\).
- Step 3: Total circuit resistance including internal: \(R_{\text{total}} = R_{\text{ext}} + r = 12 + 1 = 13\ \Omega\).
- Step 4: Total current: \(I = \frac{\mathcal{E}}{R_{\text{total}}} = \frac{12}{13} \approx 0.923\ \text{A}\).
- Step 5: Terminal voltage: \(V_{\text{term}} = \mathcal{E} - I r = 12 - (12/13) \times 1 = 12 - 12/13 = 144/13 \approx 11.08\ \text{V}\).
- Step 6: After removing one 12 Ω, parallel branch becomes single 12 Ω. New \(R_p' = 12\ \Omega\). New \(R_{\text{ext}}' = 6 + 12 = 18\ \Omega\). New total resistance = 19 Ω. New current \(I' = 12/19 \approx 0.632\ \text{A}\). New terminal voltage \(V_{\text{term}}' = 12 - (12/19) = 216/19 \approx 11.37\ \text{V}\).
- Step 7: Terminal voltage increases because current decreases, reducing internal voltage drop \(Ir\).
ANSWER: (a) 12/13 A ≈ 0.923 A, (b) 144/13 V ≈ 11.08 V, (c) Terminal voltage increases to 216/19 V ≈ 11.37 V because the total resistance increases, current decreases, and the internal voltage drop \(Ir\) becomes smaller.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: ______ of resistors refers to connecting two or more resistors in an electrical circuit such that they can be replaced by a single equivalent resistor.

## DIAGNOSTIC_ANSWER_7
Combination

The combination is the grammar being defined: two or more resistors replaceable by one equivalent - that is the whole clause. **A wrong answer (a circuit) reveals the student has named the venue where the definition names the arrangement.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe the decorative LED string lights used during Diwali: when one bulb fuses, the entire string goes off — this is a series ______.

## DIAGNOSTIC_ANSWER_8
connection

The connection completes the series phrase: one fused bulb breaks the only path, and the whole string mourns. **A wrong answer (parallel) reveals the student has given the string the home's wiring, where one failure is a private affair.**

## DIAGNOSTIC_QUESTION_9
What is Combination of resistors? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Combination of resistors refers to connecting two or more resistors in an electrical circuit such that they can be replaced by a single equivalent resistor.

The definition is replacement-shaped: the pair or crowd of resistors must be exchangable for one resistor doing identical work. **A wrong answer that describes behaviour only reveals the student has praised the symptoms while skipping the replaceability that defines the term.**

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Combination of resistors?

## DIAGNOSTIC_ANSWER_10
Students often think that in a parallel circuit, the current is the same through each branch because "current is constant in a circuit." They apply the series rule (same current) to parallel branches, leading to incorrect current division.

The flagged error transplants series logic into parallel soil: branches share voltage, not current, and each draws inversely as its resistance. **A wrong answer forcing equal branch currents reveals the student has wired the house like the Diwali string - the exact confusion this node was built to clear.**

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
The student can (1) correctly identify series and parallel connections in a given circuit diagram, (2) compute the equivalent resistance for pure series, pure parallel, and mixed series-parallel networks using the appropriate formulas, and (3) apply Ohm's law to find the total current, branch currents, and voltage drops across each.
