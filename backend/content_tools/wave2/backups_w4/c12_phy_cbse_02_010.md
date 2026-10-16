## ELI5
Open the fan capacitor in your mind: two metal foils separated by plastic film - a parallel plate capacitor rolled into a cylinder. Its capacitance is epsilon-zero A over d: plate area over separation, times the permittivity constant. Slide a dielectric of constant K between the plates and the capacitance multiplies by K, because the polarised dielectric's bound charges dilute the field from sigma over epsilon-zero down to sigma over K epsilon-zero.

## DEFINITION
A parallel plate capacitor consists of two large, flat, parallel conducting plates of area A separated by a small distance d. Its capacitance in vacuum is \( C_0 = \frac{\varepsilon_0 A}{d} \), where \( \varepsilon_0 = 8.85 \times 10^{-12} \, \text{F/m} \) is the permittivity of free space. When a dielectric material of dielectric constant K completely fills the space between the plates, the capacitance increases to \( C = K C_0 = \frac{K \varepsilon_0 A}{d} = \frac{\varepsilon A}{d} \), where \( \varepsilon = K \varepsilon_0 \) is the permittivity of the dielectric.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the capacitance formula for a parallel plate capacitor from the electric field of an infinite sheet, explain how polarization reduces the net field inside a dielectric, and calculate the new capacitance, charge, voltage, or energy for both isolated and battery-connected capacitors when a dielectric is inserted or removed.

## SCOPE_BOUNDARY
This node covers the parallel plate capacitor with vacuum and with a dielectric fully filling the gap. It includes derivation of \( C_0 = \varepsilon_0 A/d \), the effect of dielectric on electric field, potential difference, and capacitance, and the distinction between constant-charge and constant-voltage scenarios. It does NOT cover partial dielectric filling, combination of capacitors, energy stored (covered in c12_phy_cbse_02_012), or non-parallel-plate geometries.

## WALKTHROUGH
Observe a ceiling fan capacitor (a small cylindrical component) – it stores charge to give the motor a starting torque. Open it mentally: two metal foils separated by a plastic film. That's a parallel plate capacitor rolled up. To understand its capacitance, start with the electric field between two oppositely charged infinite plates: \( E = \sigma/\varepsilon_0 \). Since the plates are large and close, the field is uniform. Potential difference is \( V = Ed \). Capacitance is \( C = Q/V = ( \sigma A ) / ( \sigma d/\varepsilon_0 ) = \varepsilon_0 A/d \). Now insert a dielectric slab: the molecules polarize, creating an opposing field \( E_p \). The net field becomes \( E = E_0/K \), so \( V \) drops by K. If the capacitor is isolated, Q stays same, so \( C = Q/V \) increases by K. If connected to a battery, V stays same, so Q increases by K. This is the key principle.

Takeaway first: capacitance is geometry times permittivity - area up means more capacitance, gap down means more - and a dielectric's K multiplies the whole expression by diluting the field between the plates. Exam moves: derivation questions from the sheet field through V equals E d, dielectric questions on the diluted field, and battery-versus-isolated questions tracking which of Q and V stays fixed. Method: rerun the fan capacitor - unroll the foils, derive epsilon-zero A over d, insert the slab, watch V drop or Q rise. Check yourself: inserting a dielectric always raises capacitance, but whether charge or voltage responds depends entirely on the battery - the two regimes are different problems. Drill: derive the vacuum formula once, then solve one dielectric insertion in each battery regime.

## DIAGNOSTIC_QUESTION_1
State the formula for the capacitance of a parallel plate capacitor with vacuum between the plates. Define each symbol and give its SI unit.

## DIAGNOSTIC_ANSWER_1
\( C_0 = \frac{\varepsilon_0 A}{d} \), where \( \varepsilon_0 = 8.85 \times 10^{-12} \, \text{F/m} \) (permittivity of free space), A is the plate area in \( \text{m}^2 \), and d is the separation in m. Capacitance C is in farads (F). A wrong answer (e.g., \( C = \varepsilon_0 d/A \)) reveals confusion between area and separation dependence, or forgetting that \( \varepsilon_0 \) has units F/m, not F.

## DIAGNOSTIC_QUESTION_2
Explain why the capacitance increases when a dielectric is inserted between the plates of an isolated charged capacitor, even though the charge on the plates remains the same.

## DIAGNOSTIC_ANSWER_2
The dielectric polarizes, creating an opposing electric field that reduces the net field between the plates. Since \( V = Ed \), the potential difference decreases while Q stays constant. Capacitance \( C = Q/V \) therefore increases. A wrong answer (e.g., "the dielectric adds more charge") shows misunderstanding of polarization and the distinction between free and bound charges.

## DIAGNOSTIC_QUESTION_3
A parallel plate capacitor has plate area \( 2.0 \times 10^{-3} \, \text{m}^2 \) and separation 1.0 mm. It is charged to 100 V and then disconnected from the supply. A dielectric slab of constant K = 5 is inserted completely. Calculate the new capacitance, charge, voltage, and energy stored.

## DIAGNOSTIC_ANSWER_3
Step 1: \( C_0 = \varepsilon_0 A/d = (8.85 \times 10^{-12} \times 2.0 \times 10^{-3}) / (1.0 \times 10^{-3}) = 1.77 \times 10^{-11} \, \text{F} = 17.7 \, \text{pF} \).  
Step 2: Initial charge \( Q_0 = C_0 V_0 = 17.7 \times 10^{-12} \times 100 = 1.77 \times 10^{-9} \, \text{C} \).  
Step 3: After dielectric insertion (isolated), \( Q = Q_0 \) (same). \( C = K C_0 = 5 \times 17.7 = 88.5 \, \text{pF} \).  
Step 4: New voltage \( V = Q/C = 1.77 \times 10^{-9} / 88.5 \times 10^{-12} = 20 \, \text{V} \).  
Step 5: New energy \( U = \frac{1}{2} Q V = \frac{1}{2} \times 1.77 \times 10^{-9} \times 20 = 1.77 \times 10^{-8} \, \text{J} \).  
A wrong answer (e.g., keeping V = 100 V) reveals confusion between isolated and battery-connected cases.

## DIAGNOSTIC_QUESTION_4
Compare the electric field, potential difference, and capacitance for two identical parallel plate capacitors: one with vacuum, one with a dielectric of constant K, both connected to the same battery. Which quantities are the same and which differ? Explain using the concept of polarization.

## DIAGNOSTIC_ANSWER_4
Both have the same potential difference V (fixed by battery). The capacitor with dielectric has a larger capacitance \( C = K C_0 \), larger charge \( Q = K Q_0 \), but the same electric field \( E = V/d \) because the battery maintains V and d is unchanged. Polarization creates bound charges that partially cancel the free charge field, but the battery supplies extra free charge to keep V constant. A wrong answer (e.g., "E decreases by K") confuses the isolated case with the battery-connected case.

## DIAGNOSTIC_QUESTION_5
A student claims: "When a dielectric is inserted into a capacitor connected to a battery, the energy stored increases by a factor of K." Evaluate this statement. Is it always true? If not, under what condition is it true?

## DIAGNOSTIC_ANSWER_5
The statement is true only for a capacitor connected to a battery (constant V). Energy \( U = \frac{1}{2} C V^2 \). With dielectric, \( C \) becomes \( K C_0 \), so \( U = K U_0 \). For an isolated capacitor (constant Q), energy decreases by factor K because \( U = Q^2/(2C) \). A wrong answer (e.g., "energy always increases") shows failure to distinguish between constant-V and constant-Q scenarios.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a parallel plate capacitor (two aluminum plates), a battery, a dielectric sheet (e.g., plastic), and a high-resistance voltmeter to demonstrate the effect of dielectric on capacitance. Describe the steps and what you would observe.

## DIAGNOSTIC_ANSWER_6
Step 1: Charge the capacitor with battery to voltage V, then disconnect battery. Step 2: Measure voltage V₀ with voltmeter. Step 3: Insert dielectric sheet completely between plates. Step 4: Measure new voltage V. Observation: V < V₀ (voltage drops). Step 5: Reconnect battery, charge again to V, disconnect, then remove dielectric. Observation: voltage rises above V. This shows capacitance increases with dielectric (Q constant, V drops) and decreases when removed. A poor answer (e.g., "measure current") reveals lack of understanding of how to infer capacitance from voltage changes.

## COMMON_MISCONCEPTION
Students often think that inserting a dielectric always increases the energy stored in a capacitor. They confuse the constant-voltage (battery connected) case where energy increases by K with the constant-charge (isolated) case where energy decreases by K. The error stems from not recognizing that the battery does work to supply extra charge when the dielectric is inserted, while in the isolated case the system does work pulling the dielectric in, reducing stored energy. Another error: assuming the electric field inside the dielectric is always \( E_0/K \) even when the capacitor is connected to a battery; actually E remains \( V/d \) because the battery maintains the potential difference.

## ON_FAILURE
If the student confuses constant-Q vs constant-V scenarios, have them revisit c12_phy_cbse_02_009 (Capacitor: Definition and Capacitance) to reinforce \( C = Q/V \). Then do a guided comparison: take a charged capacitor, disconnect battery, insert dielectric, measure V drop. Then recharge to same V, keep battery connected, insert dielectric, measure charge increase (via ammeter in series during insertion). Explicitly track Q, V, C, E, U in a table for both cases. Re-diagnostic: ask them to predict what happens to energy if a dielectric is inserted while the capacitor is connected to a battery via a resistor (transient current).

## PREREQUISITE_NODE_IDS
c12_phy_cbse_02_008, c12_phy_cbse_02_009, c12_phy_cbse_02_004, c12_phy_cbse_02_001, c11_phy_cbse_01_002, c11_phy_cbse_05_001, c12_phy_cbse_02_007

## PREREQUISITE_REASONS
c12_phy_cbse_02_008: Understanding dielectric polarization is essential to explain why the net field reduces.
c12_phy_cbse_02_009: Basic definition of capacitance \( C = Q/V \) and the concept of a capacitor are foundational.
c12_phy_cbse_02_004: Equipotential surfaces and the relation \( E = -dV/dr \) justify \( V = Ed \) for uniform field.
c12_phy_cbse_02_001: Electrostatic potential definition is needed to understand potential difference between plates.
c11_phy_cbse_01_002: SI units and dimensional analysis ensure correct unit handling in formulas.
c11_phy_cbse_05_001: Work-energy theorem underpins the energy stored derivation and the work done by battery.
c12_phy_cbse_02_007: Parallel Plate Capacitor — directly applies E = σ/ε₀ and conductor surface charge distribution to derive capacitance.  

## FORWARD_NODE_IDS
c12_phy_cbse_02_011, c12_phy_cbse_02_012, c12_phy_cbse_02_013
## FORWARD_REASONS
c12_phy_cbse_02_011: Combination of capacitors builds on the single parallel plate capacitor as a building block.
c12_phy_cbse_02_012: Energy stored in a capacitor uses the capacitance formulas derived here.
c12_phy_cbse_02_013: Van de Graaff generator uses a spherical capacitor concept, but the parallel plate principles of capacitance and dielectric breakdown are relevant.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_007, c11_math_cbse_13_008
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_007: Derivative of polynomial functions is used in the integration step for energy stored \( U = \int V dQ \).
c11_math_cbse_13_008: Derivative using first principles helps understand the relation \( E = -dV/dx \) as a limit.

## CHAIN_DESCRIPTION
c12_phy_cbse_02_009 -> c12_phy_cbse_02_010 -> c12_phy_cbse_02_011

## THIS_FORMULA
\( C_0 = \frac{\varepsilon_0 A}{d} \) (vacuum); \( C = \frac{K \varepsilon_0 A}{d} = \frac{\varepsilon A}{d} \) (with dielectric); \( E = \frac{\sigma}{\varepsilon_0} \) (vacuum); \( E = \frac{\sigma}{K \varepsilon_0} \) (with dielectric, isolated); \( E = \frac{V}{d} \) (battery connected)

## FORMULA_VARIABLES
\( C_0 \) = capacitance in vacuum (F), \( \varepsilon_0 \) = permittivity of free space (\( 8.85 \times 10^{-12} \, \text{F/m} \)), A = plate area (\( \text{m}^2 \)), d = plate separation (m), K = dielectric constant (dimensionless), \( \varepsilon = K \varepsilon_0 \) = permittivity of dielectric (F/m), \( \sigma = Q/A \) = surface charge density (\( \text{C/m}^2 \)), E = electric field (V/m), V = potential difference (V), Q = charge on plates (C)

## FORMULA_UNITS
F, F/m, m², m, dimensionless, C/m², V/m, V, C

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_007 | Derivative of polynomial functions used in energy integration \( U = \int_0^Q \frac{Q'}{C} dQ' \).
c11_math_cbse_13_008 | First principle derivative explains the fundamental relation \( E = -\frac{dV}{dx} \) between field and potential.
c11_math_cbse_09_006 | Sum of infinite GP appears in the derivation of effective capacitance for series combinations (next node).
c11_math_cbse_05_006 | Linear inequalities used to determine valid ranges for dielectric constant K > 1.
## PREREQ_CONCEPT
The electric field due to an infinite plane sheet of uniform charge density is \( E = \sigma/(2\varepsilon_0) \), and superposition gives \( E = \sigma/\varepsilon_0 \) between two oppositely charged plates.

## PREREQ_BEFORE
The student must be able to apply Gauss's law to find the electric field of an infinite sheet, understand superposition of fields, and know the definition of potential difference as \( V = \int E \cdot dl \).

## PREREQ_STUCK
If stuck, review Gauss's law application to infinite sheet (Class 12 Chapter 1) and the relation between electric field and potential (c12_phy_cbse_02_004).

## WORKED_EXAMPLE_1
PROBLEM: A parallel plate capacitor in a school lab has circular plates of radius 10 cm separated by 2.0 mm of air. It is connected to a 12 V battery. Calculate (a) the capacitance, (b) the charge on each plate, (c) the electric field between the plates, and (d) the energy stored.

STEPS:
- Step 1: Identify given quantities: radius r = 0.10 m, so area \( A = \pi r^2 = \pi \times (0.10)^2 = 0.0314 \, \text{m}^2 \). Separation d = 2.0 mm = 0.0020 m. Voltage V = 12 V. \( \varepsilon_0 = 8.85 \times 10^{-12} \, \text{F/m} \).
- Step 2: Choose formula: \( C = \varepsilon_0 A / d \) for air (K ≈ 1).
- Step 3: Substitute: \( C = (8.85 \times 10^{-12} \times 0.0314) / 0.0020 = 1.39 \times 10^{-10} \, \text{F} = 139 \, \text{pF} \).
- Step 4: Charge \( Q = C V = 1.39 \times 10^{-10} \times 12 = 1.67 \times 10^{-9} \, \text{C} \).
- Step 5: Electric field \( E = V/d = 12 / 0.0020 = 6000 \, \text{V/m} \).
- Step 6: Energy \( U = \frac{1}{2} C V^2 = 0.5 \times 1.39 \times 10^{-10} \times 144 = 1.00 \times 10^{-8} \, \text{J} \).
REASONING: The battery fixes the potential difference, so we use \( C = \varepsilon_0 A/d \) directly. The field is uniform because d << plate dimensions. Energy stored is the work done by the battery to charge the capacitor.
ANSWER: (a) 139 pF, (b) 1.67 nC, (c) 6000 V/m, (d) 10.0 nJ.

## WORKED_EXAMPLE_2
PROBLEM: The same capacitor from Example 1 is disconnected from the battery. A mica sheet of dielectric constant K = 6 and thickness 2.0 mm (exactly filling the gap) is inserted. Find the new (a) capacitance, (b) voltage, (c) electric field, (d) energy stored. Does the energy increase or decrease? Explain.

STEPS:
- Step 1: After disconnection, charge Q remains constant at \( 1.67 \times 10^{-9} \, \text{C} \).
- Step 2: New capacitance \( C' = K C = 6 \times 139 \, \text{pF} = 834 \, \text{pF} \).
- Step 3: New voltage \( V' = Q / C' = 1.67 \times 10^{-9} / 8.34 \times 10^{-10} = 2.00 \, \text{V} \).
- Step 4: New electric field \( E' = V'/d = 2.00 / 0.0020 = 1000 \, \text{V/m} \). (Alternatively, \( E' = E_0/K = 6000/6 = 1000 \, \text{V/m} \).)
- Step 5: New energy \( U' = \frac{1}{2} Q V' = 0.5 \times 1.67 \times 10^{-9} \times 2.00 = 1.67 \times 10^{-9} \, \text{J} = 1.67 \, \text{nJ} \).
- Step 6: Compare: original energy was 10.0 nJ, new is 1.67 nJ. Energy decreased by factor K = 6.
REASONING: With battery disconnected, the capacitor is isolated. The dielectric polarizes, creating an opposing field that reduces the net field. The potential difference drops, so the stored energy \( U = Q^2/(2C) \) decreases because C increases while Q is fixed. The "missing" energy is the work done by the system in pulling the dielectric into the capacitor (attractive force).
ANSWER: (a) 834 pF, (b) 2.00 V, (c) 1000 V/m, (d) 1.67 nJ. Energy decreases by factor 6.

## WORKED_EXAMPLE_3
PROBLEM: A parallel plate capacitor with plate area 50 cm² and separation 1.0 mm is charged to 200 V and then disconnected. A dielectric slab of thickness 0.5 mm and K = 4 is inserted, touching one plate. Calculate the new capacitance and voltage. (This is a partial dielectric filling – a common competitive exam extension.)

STEPS:
- Step 1: Convert units: A = 50 cm² = 50 × 10⁻⁴ m² = 5.0 × 10⁻³ m². d = 1.0 mm = 0.0010 m. t = 0.5 mm = 0.00050 m. V₀ = 200 V.
- Step 2: Initial capacitance \( C_0 = \varepsilon_0 A / d = (8.85 \times 10^{-12} \times 5.0 \times 10^{-3}) / 0.0010 = 4.425 \times 10^{-11} \, \text{F} = 44.25 \, \text{pF} \).
- Step 3: Initial charge \( Q = C_0 V_0 = 44.25 \times 10^{-12} \times 200 = 8.85 \times 10^{-9} \, \text{C} \). Q remains constant.
- Step 4: The system is equivalent to two capacitors in series: one with dielectric (thickness t, K=4), one with air (thickness d-t). \( C_1 = K \varepsilon_0 A / t \), \( C_2 = \varepsilon_0 A / (d-t) \).
- Step 5: Compute: \( C_1 = 4 \times 8.85 \times 10^{-12} \times 5.0 \times 10^{-3} / 0.00050 = 3.54 \times 10^{-10} \, \text{F} = 354 \, \text{pF} \). \( C_2 = 8.85 \times 10^{-12} \times 5.0 \times 10^{-3} / 0.00050 = 8.85 \times 10^{-11} \, \text{F} = 88.5 \, \text{pF} \).
- Step 6: Series combination: \( 1/C = 1/C_1 + 1/C_2 = 1/354 + 1/88.5 = 0.00282 + 0.0113 = 0.01412 \, \text{pF}^{-1} \). So \( C = 70.8 \, \text{pF} \).
- Step 7: New voltage \( V = Q/C = 8.85 \times 10^{-9} / 70.8 \times 10^{-12} = 125 \, \text{V} \).
REASONING: Partial filling creates two capacitors in series because the displacement field D is continuous across the boundary, but the electric field differs in the two regions. The series formula applies. This combines concepts from this node and the next node (combinations).
ANSWER: New capacitance = 70.8 pF, new voltage = 125 V.

## COMPETENCY_QUESTION_1
QUESTION: A parallel plate capacitor is charged to a potential difference V and then disconnected from the supply. A dielectric slab of constant K is slowly inserted between the plates. The force exerted by the capacitor on the slab is F. If the same capacitor is instead kept connected to the battery while the slab is inserted, how does the force compare? Justify your answer using energy considerations.

COMPETENCY: Interpreting physical situations using formulas; predicting outcomes from changing variables.
STEPS:
- Step 1: For isolated capacitor, energy \( U = Q^2/(2C) \). As slab enters, C increases, so U decreases. The force is attractive: \( F = -dU/dx \) (positive if x is insertion distance). The system does work pulling the slab in.
- Step 2: For battery-connected capacitor, voltage V is constant. Energy \( U = \frac{1}{2} C V^2 \). As C increases, U increases. The battery supplies charge, doing work \( V dQ = V^2 dC \). The net energy change of capacitor+battery system is \( dU_{\text{total}} = \frac{1}{2} V^2 dC - V^2 dC = -\frac{1}{2} V^2 dC \). So total energy decreases, force is still attractive.
- Step 3: Magnitude: For isolated, \( F = \frac{Q^2}{2} \frac{d(1/C)}{dx} \). For battery, \( F = \frac{1}{2} V^2 \frac{dC}{dx} \). Since \( Q = C V \), both give same force magnitude at any given insertion depth.
- Step 4: Conclusion: The force is the same in both cases (attractive). The battery supplies energy to maintain voltage, but the mechanical force on the dielectric is identical.
ANSWER: The force is the same in both cases (attractive). The battery does extra work to keep voltage constant, but the force on the dielectric depends only on the gradient of capacitance and the instantaneous Q and V, which are related by \( Q = CV \).
DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: A parallel plate capacitor has plate area A and separation d. It is filled with two dielectric slabs of equal thickness d/2 and dielectric constants K₁ and K₂, placed side by side (each covering half the area). Find the equivalent capacitance. Now, if the slabs are stacked (one on top of the other, each of thickness d/2), find the equivalent capacitance. Compare the two configurations for K₁ = 2, K₂ = 6.

COMPETENCY: Unit analysis and dimensional reasoning; applying series/parallel concepts to dielectric configurations.
STEPS:
- Step 1: Side-by-side configuration: The two dielectrics are in parallel (same voltage across each half). Capacitance of each half: \( C_1 = K_1 \varepsilon_0 (A/2) / d \), \( C_2 = K_2 \varepsilon_0 (A/2) / d \). Equivalent \( C_{\text{parallel}} = C_1 + C_2 = \frac{\varepsilon_0 A}{2d} (K_1 + K_2) \).
- Step 2: Stacked configuration: The two dielectrics are in series (same charge, thickness d/2 each). \( C_1 = K_1 \varepsilon_0 A / (d/2) = 2 K_1 \varepsilon_0 A / d \), \( C_2 = 2 K_2 \varepsilon_0 A / d \). Series: \( 1/C_{\text{series}} = 1/C_1 + 1/C_2 = \frac{d}{2\varepsilon_0 A} (1/K_1 + 1/K_2) \). So \( C_{\text{series}} = \frac{2\varepsilon_0 A}{d} \frac{K_1 K_2}{K_1 + K_2} \).
- Step 3: For K₁=2, K₂=6: \( C_{\text{parallel}} = \frac{\varepsilon_0 A}{2d} (8) = 4 \frac{\varepsilon_0 A}{d} \). \( C_{\text{series}} = \frac{2\varepsilon_0 A}{d} \frac{12}{8} = 3 \frac{\varepsilon_0 A}{d} \).
- Step 4: The parallel (side-by-side) configuration gives larger capacitance because the effective dielectric constant is the arithmetic mean, while the series (stacked) gives the harmonic mean. Arithmetic mean ≥ harmonic mean.
ANSWER: Side-by-side: \( C = 4 \varepsilon_0 A/d \). Stacked: \( C = 3 \varepsilon_0 A/d \). Parallel configuration yields higher capacitance.
DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A parallel plate capacitor consists of two large, flat, parallel ______ plates of area A separated by a small distance d.

## DIAGNOSTIC_ANSWER_7
conducting

The conducting word is the plates' material: charge must be free to spread evenly across each face for the uniform-field derivation to hold. **A wrong answer (insulating) reveals the student has swapped the capacitor's metals for its dielectric and grounded the charge.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a ceiling fan ______ (a small cylindrical component) – it stores charge to give the motor a starting torque.

## DIAGNOSTIC_ANSWER_8
capacitor

The capacitor completes the component's name: the small cylinder that stores the motor's starting surge. **A wrong answer (a resistor) reveals the student has swapped the storage component for a dissipator and lost the charge-hoarding story.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can derive the capacitance formula for a parallel plate capacitor from the electric field of an infinite sheet, explain how polarization reduces the net field inside a dielectric, and calculate the new capacitance, charge, voltage, or energy for both isolated and battery-connected capacitors when a dielectric is inserted or.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Observe a ceiling fan capacitor (a small ______ component) – it stores charge to give the motor a starting torque.

## DIAGNOSTIC_ANSWER_10
cylindrical

The cylindrical word is the unrolled capacitor's shape: foil and film wound into a small drum on the fan. **A wrong answer (a spherical word) reveals the student has reshaped the component whose plates the derivation unrolls.** The cylindrical word is the rolled design: the fan's capacitor is a parallel-plate pair wound into a drum.
