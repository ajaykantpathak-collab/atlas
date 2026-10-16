## ELI5
A camera flash spends its life charging slowly and discharging in a blink: the energy between those moments lives in the capacitor's field. Charging work integrates to half Q V - equivalently half C V squared or half Q squared over C - because the voltage climbs from zero as the charge piles up, making the average only half the final value. The energy density of that field is half epsilon-zero E squared, and the dielectric fills the story.

## DEFINITION
Energy stored in a capacitor is the electrostatic potential energy accumulated when work is done to transfer charge from one plate to another against the growing potential difference. It equals the work done by an external agent to charge the capacitor from zero to its final charge Q, and is given by \( U = \frac{1}{2}CV^2 = \frac{1}{2}QV = \frac{1}{2}\frac{Q^2}{C} \), where C is capacitance, V is potential difference, and Q is charge on the positive plate. The SI unit is joule (J). This energy resides in the electric field between the plates, with energy density \( u = \frac{1}{2}\varepsilon_0 E^2 \) (for vacuum).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) derive the energy formula by integrating the work done in charging a capacitor, (2) calculate stored energy for single capacitors and combinations (series/parallel) using the appropriate equivalent capacitance, (3) compute energy density from electric field strength, and (4) analyze energy redistribution when charged capacitors are connected (e.g., energy loss as heat/radiation).

## SCOPE_BOUNDARY
Covers energy stored in a single capacitor, energy density in the electric field, and energy changes when capacitors are combined or dielectrics are inserted/removed under constant charge or constant voltage conditions. Does NOT cover energy in AC circuits, inductors, or electromagnetic radiation beyond the transient loss mentioned in NCERT Example 2.10.

## WALKTHROUGH
Observe a camera flash unit: a capacitor charges slowly from a battery, then discharges rapidly to produce a bright flash. The energy for the flash comes from the work done by the battery in moving charge onto the capacitor plates. Begin by recalling that capacitance \( C = Q/V \) (from c12_phy_cbse_02_009) and that work done against a variable force is the integral of force over displacement (c11_phy_cbse_05_002). Imagine transferring charge \( dq \) from the negative to the positive plate when the capacitor already has charge \( q \); the potential difference is \( q/C \), so the incremental work is \( dW = (q/C)\,dq \). Integrate from 0 to Q to obtain \( U = \frac{1}{2}Q^2/C \). Substitute \( Q = CV \) to get the three equivalent forms.

Takeaway first: the factor of half is the variable voltage's confession - each increment is charged against the then-current voltage, and the average is exactly half the final. Exam moves: derivation questions by integration, computation questions across the three equivalent forms, combination questions using equivalent capacitance, and redistribution questions on connecting charged capacitors. Method: rerun the flash - d W equals q over C dq, integrated from zero to Q, then dressed in the three forms. Check yourself: the three forms are chosen by what the problem holds fixed - battery connected favours half C V squared, isolated favours half Q squared over C; choosing wrongly halves or doubles the answer. Drill: derive the energy once, compute it in two forms, and explain the lost energy when two unequal charged capacitors are connected.

## DIAGNOSTIC_QUESTION_1
State the three equivalent formulas for the energy stored in a capacitor and give the SI unit of each quantity involved.

## DIAGNOSTIC_ANSWER_1
The three formulas are \( U = \frac{1}{2}CV^2 \), \( U = \frac{1}{2}QV \), and \( U = \frac{1}{2}\frac{Q^2}{C} \). SI units: U in joules (J), C in farads (F), V in volts (V), Q in coulombs (C). A wrong answer (e.g., missing the 1/2 factor, or writing \( U = QV \)) reveals that the student assumes constant voltage during charging, confusing the energy supplied by the battery with the energy stored in the capacitor.

## DIAGNOSTIC_QUESTION_2
Explain why the energy stored in a capacitor is \( \frac{1}{2}QV \) and not \( QV \), even though the battery does work \( QV \) to move charge Q across a potential difference V.

## DIAGNOSTIC_ANSWER_2
During charging, the potential difference across the capacitor increases from 0 to V. The average potential difference during the process is \( V/2 \), so the work done (energy stored) is \( Q \times (V/2) = \frac{1}{2}QV \). The battery supplies energy \( QV \); the other half is dissipated as heat in the connecting wires (or radiated) during the transient current. A wrong answer (e.g., "energy is QV because W=QV") shows the student treats the voltage as constant throughout charging, ignoring the variable nature of the potential difference.

## DIAGNOSTIC_QUESTION_3
A 12 μF capacitor is charged to 200 V. Calculate the energy stored in it. If this capacitor is then disconnected from the supply and connected in parallel with an uncharged 6 μF capacitor, find the final energy of the system. (Use \( \frac{1}{2}CV^2 \) and charge conservation.)

## DIAGNOSTIC_ANSWER_3
**Step 1:** Initial energy \( U_i = \frac{1}{2} C_1 V^2 = \frac{1}{2} \times 12 \times 10^{-6} \times (200)^2 = 0.24 \, \text{J} \).  
**Step 2:** Initial charge \( Q = C_1 V = 12 \times 10^{-6} \times 200 = 2.4 \times 10^{-3} \, \text{C} \).  
**Step 3:** After connecting in parallel, total capacitance \( C_{\text{eq}} = 12 + 6 = 18 \, \mu\text{F} \). Common voltage \( V' = Q / C_{\text{eq}} = 2.4 \times 10^{-3} / 18 \times 10^{-6} = 133.33 \, \text{V} \).  
**Step 4:** Final energy \( U_f = \frac{1}{2} C_{\text{eq}} (V')^2 = \frac{1}{2} \times 18 \times 10^{-6} \times (133.33)^2 = 0.16 \, \text{J} \).  
**Step 5:** Energy lost = \( 0.24 - 0.16 = 0.08 \, \text{J} \) (dissipated as heat/radiation).  
A wrong answer (e.g., using \( V' = 200 \, \text{V} \) or forgetting to convert μF to F) indicates confusion about charge conservation vs. voltage conservation in isolated systems.

## DIAGNOSTIC_QUESTION_4
A parallel-plate capacitor with plate area A and separation d is charged to a potential difference V and then disconnected from the battery. The plates are slowly pulled apart to double the separation (2d). Does the stored energy increase, decrease, or stay the same? Justify using the formula \( U = \frac{1}{2}\frac{Q^2}{C} \) and the capacitance of a parallel-plate capacitor.

## DIAGNOSTIC_ANSWER_4
The stored energy **increases**. Since the capacitor is disconnected, charge Q remains constant. Capacitance \( C = \varepsilon_0 A / d \); when d doubles, C halves. From \( U = \frac{1}{2}\frac{Q^2}{C} \), if C halves, U doubles. The external agent pulling the plates does positive work against the attractive force between the plates, which adds to the stored energy. A wrong answer (e.g., "energy stays the same" or "energy decreases") reveals the student incorrectly assumes constant voltage or ignores the work done by the external agent.

## DIAGNOSTIC_QUESTION_5
A student claims: "When a dielectric slab is inserted into a capacitor that remains connected to a battery, the stored energy decreases because the capacitance increases but the voltage is constant, so \( U = \frac{1}{2}CV^2 \) increases. Wait, that means energy increases. Actually, the battery supplies extra energy, so the capacitor's stored energy increases." Evaluate this statement and identify any conceptual error.

## DIAGNOSTIC_ANSWER_5
The student's final conclusion is correct: **stored energy increases** when a dielectric is inserted with the battery connected. However, the reasoning is slightly garbled. The correct logic: Voltage V is fixed by the battery. Capacitance increases by factor K (dielectric constant). Since \( U = \frac{1}{2}CV^2 \), U increases by factor K. The battery supplies additional charge to maintain V, doing work \( \Delta U_{\text{battery}} = \Delta Q \cdot V = (KC_0 - C_0)V \cdot V = (K-1)C_0V^2 \). The capacitor's energy increases by \( \frac{1}{2}(K-1)C_0V^2 \); the other half is dissipated as heat or work done on the dielectric. The student's initial "decreases" was a slip, but they corrected it. A fully wrong answer would be to say energy decreases or that the battery does no work.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a capacitor, a battery, and a small electric motor (or LED) to demonstrate that a charged capacitor stores energy. Describe the procedure, what you would observe, and how you would estimate the stored energy from the observations.

## DIAGNOSTIC_ANSWER_6
**Procedure:** Charge a large electrolytic capacitor (e.g., 1000 μF, 16 V) using a 9 V battery through a current-limiting resistor. Disconnect the battery. Connect the capacitor to a small DC motor (or LED with a series resistor). Observe the motor spinning (or LED glowing) for a short time.  
**Observation:** The motor runs/LED lights using only the capacitor's stored energy, proving energy was stored.  
**Estimation:** Measure the time the motor runs and its average current (using a multimeter in series). Approximate energy delivered = \( \int V(t)I(t)\,dt \). If voltage drops linearly from 9 V to 0, average voltage = 4.5 V. If average current is 10 mA for 2 s, energy ≈ 4.5 V × 0.01 A × 2 s = 0.09 J. Compare with \( \frac{1}{2}CV^2 = \frac{1}{2} \times 1000 \times 10^{-6} \times 81 = 0.0405 \, \text{J} \). Discrepancy due to non-ideal discharge and measurement errors.  
A poor answer (e.g., "just connect and see" without quantitative estimation) shows inability to link the physical demonstration to the energy formula.

## COMMON_MISCONCEPTION
Students often think the energy stored in a capacitor is \( QV \) (or \( CV^2 \)) because they use the formula \( W = QV \) for work done by a battery moving charge Q across a constant potential difference V. They forget that during charging, the capacitor's voltage is not constant; it rises from 0 to V, so the average voltage is V/2, giving the factor 1/2. Another error: when a charged capacitor is connected to an identical uncharged capacitor, students assume the final energy is the same as initial (conservation of energy), ignoring that half the energy is lost as heat/radiation during the transient current. They also confuse the conditions: for a capacitor disconnected from the battery, charge is constant; for one connected, voltage is constant.

## ON_FAILURE
If a student cannot derive the 1/2 factor or makes the \( QV \) error:  
1. Revisit **c11_phy_cbse_05_002** (Work Done by Variable Force) and re-derive \( W = \int_0^Q \frac{q}{C}\,dq \) step by step.  
2. Draw a graph of V vs q (straight line through origin) and show that the area under the curve (work) is the area of a triangle: \( \frac{1}{2} \times Q \times V \).  
3. Perform the two-capacitor connection experiment (Diagnostic 6) and measure the energy loss; discuss where the missing energy went.  
4. Re-solve NCERT Example 2.10 with full unit tracking.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_02_009, c12_phy_cbse_02_011, c11_phy_cbse_05_002, c11_phy_cbse_05_005, c11_phy_cbse_05_007, c12_phy_cbse_02_005, c12_phy_cbse_02_006, c12_phy_cbse_02_010

## PREREQUISITE_REASONS
c12_phy_cbse_02_009: Defines capacitance C = Q/V, the fundamental relation used in all energy formulas.  
c12_phy_cbse_02_011: Provides equivalent capacitance for series/parallel combinations, needed to compute energy in networks.  
c11_phy_cbse_05_002: Introduces integration for work done by a variable force, directly used in deriving \( U = \int (q/C)\,dq \).  
c11_phy_cbse_05_005: Work-energy theorem connects external work to stored potential energy.  
c11_phy_cbse_05_007: Gravitational potential energy analogy helps understand energy storage in a field.
c12_phy_cbse_02_005: Energy stored in a capacitor is the potential energy of the charge configuration on its plates.  
c12_phy_cbse_02_006: Energy Stored in a Capacitor — the energy density \(\frac{1}{2}\epsilon_0 E^2\) in a dielectric-filled capacitor includes the work done to align dipoles, linking microscopic dipole energy to macroscopic capacitor energy.  
c12_phy_cbse_02_010: Energy stored in a capacitor uses the capacitance formulas derived here.  

## FORWARD_NODE_IDS
c12_phy_cbse_02_013
## FORWARD_REASONS
c12_phy_cbse_02_013: Van de Graaff generator stores large charge on a spherical conductor (a capacitor); its maximum energy is limited by dielectric breakdown, directly applying energy storage concepts.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_008, c11_math_cbse_13_009
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_008: Derivative using first principle builds the foundation for understanding integration as the inverse process, used in deriving the energy formula.  
c11_math_cbse_13_009: Algebra of derivatives (sum, product rules) is needed when differentiating energy expressions to find force or pressure on capacitor plates.

## CHAIN_DESCRIPTION
c12_phy_cbse_02_009 -> c12_phy_cbse_02_012 -> c12_phy_cbse_02_013

## THIS_FORMULA
\( U = \frac{1}{2}CV^2 = \frac{1}{2}QV = \frac{1}{2}\frac{Q^2}{C} \) ; energy density \( u = \frac{1}{2}\varepsilon_0 E^2 \)

## FORMULA_VARIABLES
U = energy stored (J), C = capacitance (F), V = potential difference (V), Q = charge on positive plate (C), ε₀ = permittivity of free space (8.85 × 10⁻¹² F/m), E = electric field magnitude (V/m or N/C)

## FORMULA_UNITS
J, F, V, C, F/m, V/m

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_008 | Integration (inverse of derivative) is used to compute work done by a variable force in charging a capacitor.
c11_math_cbse_13_009 | Algebraic manipulation of derivatives is needed when finding force on capacitor plates from energy gradient (F = -dU/dx).
## PREREQ_CONCEPT
Work done by a variable force (integration) and the definition of capacitance (C = Q/V).

## PREREQ_BEFORE
The student must be able to set up and evaluate a definite integral of the form \( \int_0^Q \frac{q}{C}\,dq \) and know that capacitance relates charge and voltage linearly.

## PREREQ_STUCK
Review the integration derivation in c11_phy_cbse_05_002 and the capacitance definition in c12_phy_cbse_02_009.

## WORKED_EXAMPLE_1
**PROBLEM:** A parallel-plate capacitor has plates of area 0.02 m² separated by 1 mm of air. It is connected to a 12 V battery. Calculate (a) its capacitance, (b) the charge on each plate, (c) the energy stored, and (d) the energy density in the electric field between the plates. (ε₀ = 8.85 × 10⁻¹² F/m)

**STEPS:**
- Step 1: Identify given quantities: A = 0.02 m², d = 1 mm = 0.001 m, V = 12 V, ε₀ = 8.85 × 10⁻¹² F/m.
- Step 2: Compute capacitance using parallel-plate formula \( C = \varepsilon_0 A/d \).
  \( C = (8.85 \times 10^{-12} \times 0.02) / 0.001 = 1.77 \times 10^{-10} \, \text{F} = 177 \, \text{pF} \).
- Step 3: Compute charge \( Q = CV = 1.77 \times 10^{-10} \times 12 = 2.124 \times 10^{-9} \, \text{C} \).
- Step 4: Compute stored energy \( U = \frac{1}{2}CV^2 = 0.5 \times 1.77 \times 10^{-10} \times 144 = 1.274 \times 10^{-8} \, \text{J} \).
- Step 5: Electric field \( E = V/d = 12 / 0.001 = 12,000 \, \text{V/m} \). Energy density \( u = \frac{1}{2}\varepsilon_0 E^2 = 0.5 \times 8.85 \times 10^{-12} \times (12000)^2 = 6.37 \times 10^{-4} \, \text{J/m}^3 \).
- Step 6: Verify: Volume between plates = A × d = 0.02 × 0.001 = 2 × 10⁻⁵ m³. Total energy = u × volume = 6.37 × 10⁻⁴ × 2 × 10⁻⁵ = 1.274 × 10⁻⁸ J (matches).

**REASONING:** The parallel-plate capacitance formula comes from Gauss's law. Energy stored is computed directly from C and V. Energy density provides a field-based perspective, consistent with the total energy when multiplied by the field volume.

**ANSWER:** (a) 177 pF, (b) 2.12 nC, (c) 12.7 nJ, (d) 6.37 × 10⁻⁴ J/m³.

## WORKED_EXAMPLE_2
**PROBLEM:** A 4 μF capacitor is charged to 200 V. The supply is disconnected. The capacitor is then connected in parallel with an uncharged 2 μF capacitor. Find (a) the common potential difference after connection, (b) the initial and final energies of the system, and (c) the energy lost as heat.

**STEPS:**
- Step 1: Initial charge on 4 μF capacitor: \( Q = C_1 V = 4 \times 10^{-6} \times 200 = 8 \times 10^{-4} \, \text{C} \).
- Step 2: Initial energy: \( U_i = \frac{1}{2} C_1 V^2 = 0.5 \times 4 \times 10^{-6} \times 40000 = 0.08 \, \text{J} \).
- Step 3: After parallel connection, total capacitance \( C_{\text{eq}} = 4 + 2 = 6 \, \mu\text{F} \). Charge is conserved (isolated system), so common voltage \( V' = Q / C_{\text{eq}} = 8 \times 10^{-4} / 6 \times 10^{-6} = 133.33 \, \text{V} \).
- Step 4: Final energy: \( U_f = \frac{1}{2} C_{\text{eq}} (V')^2 = 0.5 \times 6 \times 10^{-6} \times (133.33)^2 = 0.0533 \, \text{J} \).
- Step 5: Energy lost = \( U_i - U_f = 0.08 - 0.0533 = 0.0267 \, \text{J} \).
- Step 6: Check using alternative formula: \( U_f = \frac{1}{2} \frac{Q^2}{C_{\text{eq}}} = 0.5 \times (8 \times 10^{-4})^2 / (6 \times 10^{-6}) = 0.0533 \, \text{J} \). Consistent.

**REASONING:** When the battery is disconnected, the system is isolated; charge cannot leave, so total charge is conserved. The capacitors reach a common potential because they are in parallel. The energy loss is inevitable due to transient current (heat/radiation), as explained in NCERT Example 2.10.

**ANSWER:** (a) 133.33 V, (b) Initial 0.08 J, Final 0.0533 J, (c) 0.0267 J lost.

## WORKED_EXAMPLE_3
**PROBLEM:** A parallel-plate capacitor with plate area A and separation d is charged to a charge Q and then disconnected from the battery. A dielectric slab of dielectric constant K and thickness d (same as plate separation) is inserted slowly between the plates, completely filling the gap. Calculate (a) the initial energy, (b) the final energy, (c) the work done by the external agent inserting the slab, and (d) the force on the slab during insertion if it is inserted a distance x (0 < x < plate length L). Assume the plates are square of side L.

**STEPS:**
- Step 1: Initial capacitance \( C_0 = \varepsilon_0 A/d = \varepsilon_0 L^2/d \). Initial energy \( U_i = \frac{1}{2} Q^2 / C_0 \).
- Step 2: Final capacitance with dielectric fully inserted: \( C_f = K C_0 \). Since Q is constant, final energy \( U_f = \frac{1}{2} Q^2 / (K C_0) = U_i / K \).
- Step 3: The energy decreases: \( \Delta U = U_f - U_i = U_i (1/K - 1) \), which is negative. The external agent must do negative work (i.e., the slab is pulled in by the field). The work done by the agent is \( W_{\text{ext}} = \Delta U = U_i (1/K - 1) \). (The field does positive work, so the agent must hold back.)
- Step 4: For partial insertion x, the capacitor is equivalent to two capacitors in parallel: one with dielectric (area L×x, capacitance \( C_1 = K \varepsilon_0 L x / d \)), one without (area L×(L-x), capacitance \( C_2 = \varepsilon_0 L (L-x) / d \)). Total capacitance \( C(x) = \frac{\varepsilon_0 L}{d} [K x + (L-x)] = \frac{\varepsilon_0 L}{d} [L + (K-1)x] \).
- Step 5: Energy as function of x: \( U(x) = \frac{1}{2} Q^2 / C(x) \). The force on the slab is \( F = -\frac{dU}{dx} \) (negative gradient of energy with respect to x). Compute derivative:
  \( \frac{dU}{dx} = -\frac{1}{2} Q^2 \frac{1}{C^2} \frac{dC}{dx} \).
  \( \frac{dC}{dx} = \frac{\varepsilon_0 L}{d} (K-1) \).
  So \( F = \frac{1}{2} Q^2 \frac{1}{C^2} \frac{\varepsilon_0 L}{d} (K-1) \). Substitute \( C = \frac{\varepsilon_0 L}{d} [L + (K-1)x] \) to get F in terms of x.
- Step 6: At x=0 (just starting), \( C = C_0 \), \( F = \frac{1}{2} Q^2 \frac{1}{C_0^2} \frac{\varepsilon_0 L}{d} (K-1) = \frac{1}{2} \frac{Q^2}{C_0} \frac{K-1}{L} = U_i \frac{K-1}{L} \). The force pulls the slab in.

**REASONING:** This example combines energy storage, dielectrics, and the concept of force as the negative gradient of potential energy (from mechanics). The capacitor is isolated, so Q is constant. The force arises because the system tends to minimize its energy by pulling the dielectric in (increasing capacitance).

**ANSWER:** (a) \( U_i = \frac{1}{2} Q^2 / C_0 \), (b) \( U_f = U_i / K \), (c) \( W_{\text{ext}} = U_i (1/K - 1) \) (negative, meaning the field does the work), (d) \( F(x) = \frac{1}{2} \frac{Q^2}{C(x)^2} \frac{\varepsilon_0 L}{d} (K-1) \).

## COMPETENCY_QUESTION_1
**QUESTION:** A 10 μF capacitor is charged to 50 V and then disconnected from the battery. A dielectric slab of dielectric constant 4 is inserted between the plates, completely filling the space. (a) What is the new capacitance? (b) What is the new voltage across the capacitor? (c) Calculate the initial and final stored energies. (d) Did the energy increase or decrease? Explain the physical reason for the change.

**COMPETENCY:** Interpreting physical situations using formulas and explaining energy changes in terms of work done by/on the system.

**STEPS:**
- Step 1: Initial capacitance C₀ = 10 μF, initial voltage V₀ = 50 V, initial charge Q = C₀V₀ = 500 μC. Since disconnected, Q is constant.
- Step 2: New capacitance C = K C₀ = 4 × 10 = 40 μF.
- Step 3: New voltage V = Q/C = 500/40 = 12.5 V.
- Step 4: Initial energy Uᵢ = ½ C₀V₀² = 0.5 × 10⁻⁵ × 2500 = 0.0125 J. Final energy U_f = ½ C V² = 0.5 × 40 × 10⁻⁶ × (12.5)² = 0.003125 J. (Or U_f = Uᵢ/K = 0.0125/4 = 0.003125 J.)
- Step 5: Energy decreased by factor 4. The dielectric is pulled into the capacitor by the electrostatic force; the field does positive work on the slab. If the slab is inserted slowly, an external agent must apply a restraining force, doing negative work. The energy lost by the capacitor equals the work done by the field on the slab (which could be converted to kinetic energy if released, or dissipated if inserted slowly).

**ANSWER:** (a) 40 μF, (b) 12.5 V, (c) Initial 0.0125 J, Final 0.003125 J, (d) Energy decreases by factor 4 because the field does work pulling the dielectric in.

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** (Assertion-Reason)  
**Assertion:** When a charged capacitor is disconnected from the battery and its plates are pulled apart to increase the separation, the energy stored in the capacitor increases.  
**Reason:** The capacitance decreases, and since the charge remains constant, the energy \( U = \frac{1}{2}\frac{Q^2}{C} \) increases. The extra energy comes from the work done by the external agent in pulling the plates against their mutual attraction.  
Choose the correct option:  
(A) Both Assertion and Reason are true and Reason is the correct explanation of Assertion.  
(B) Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion.  
(C) Assertion is true but Reason is false.  
(D) Assertion is false but Reason is true.

**COMPETENCY:** Evaluating the correctness of physical statements and identifying causal relationships between work, energy, and capacitance.

**STEPS:**
- Step 1: Check Assertion: Isolated capacitor → Q constant. Increasing plate separation d decreases C (C ∝ 1/d). From U = ½ Q²/C, U increases. Assertion is true.
- Step 2: Check Reason: Capacitance decreases → energy increases. The external agent does positive work against the attractive force between plates. This work adds to the stored energy. Reason is true.
- Step 3: Does Reason correctly explain Assertion? Yes, the Reason explicitly states the mechanism (work done by external agent) that supplies the additional energy. The energy increase is directly accounted for by the work done.
- Step 4: Select option (A).

**ANSWER:** (A) Both Assertion and Reason are true and Reason is the correct explanation of Assertion.

**DIFFICULTY:** hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Energy stored in a capacitor is the ______ potential energy accumulated when work is done to transfer charge from one plate to another against the growing potential difference.

## DIAGNOSTIC_ANSWER_7
electrostatic

Electrostatic names the energy's form: work done against the growing field, stored and released as field energy. **A wrong answer (kinetic) reveals the student has credited the charges' motion when the storage is in the field between plates.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a camera flash unit: a ______ charges slowly from a battery, then discharges rapidly to produce a bright flash.

## DIAGNOSTIC_ANSWER_8
capacitor

The capacitor completes the flash's anatomy: the slow-charging, fast-spending hoard that lights the scene. **A wrong answer (a bulb) reveals the student has swapped the storeroom for the window the energy leaves through.** The capacitor completes the flash's pair: one component sips from the battery, and the same component funds the blink.

## DIAGNOSTIC_QUESTION_9
What is Energy stored in a capacitor? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Energy stored in a capacitor is the electrostatic potential energy accumulated when work is done to transfer charge from one plate to another against the growing potential difference.

The definition is the accumulation story: transfer against a rising voltage, and the total work is the stored energy. **A wrong answer that multiplies Q by V reveals the student has charged the capacitor at final voltage from the first coulomb, forgetting the climb.**

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Energy stored in a capacitor?

## DIAGNOSTIC_ANSWER_10
They forget that during charging, the capacitor's voltage is not constant; it rises from 0 to V, so the average voltage is V/2, giving the factor 1/2.

The flagged error is the constant-voltage assumption: the capacitor's voltage is born at zero and climbs to V, so every coulomb costs a different fare. **A wrong answer computing Q V reveals the student has paid full fare throughout - the missing half is the lesson's whole point.**

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
The student can (1) derive the energy formula by integrating the work done in charging a capacitor, (2) calculate stored energy for single capacitors and combinations (series/parallel) using the appropriate equivalent capacitance, (3) compute energy density from electric field strength, and (4) analyze energy redistribution when charged.
