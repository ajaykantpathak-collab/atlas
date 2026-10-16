## ELI5
A compass needle swings because aligned is cosier: a dipole in a uniform field feels a torque p E sine theta that always urges alignment, and its potential energy is minus p dot E - minus p E cosine theta. The zero of energy is conventionally set at right angles, where the dipole is indifferent. Aligned is the energy minimum, anti-aligned the maximum, and any rotation between them costs or refunds exactly the cosine's difference.

## DEFINITION
The potential energy of an electric dipole in a uniform external electric field is the work done by an external agent to assemble the dipole in the field or to rotate it from a reference orientation (where potential energy is defined as zero) to a given orientation. For a dipole of dipole moment \(\vec{p}\) in a uniform electric field \(\vec{E}\), the potential energy is \(U = -\vec{p} \cdot \vec{E} = -pE \cos\theta\), where \(\theta\) is the angle between \(\vec{p}\) and \(\vec{E}\). The SI unit is joule (J).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can (1) derive the expression \(U = -pE\cos\theta\) by calculating the work done by an external torque against the electrostatic torque, (2) compute the change in potential energy when a dipole rotates between two orientations in a uniform field, and (3) apply the result to solve numerical problems involving heat release or work done in dipole alignment (e.g., NCERT Example 2.6).

## SCOPE_BOUNDARY
Covers potential energy of a permanent dipole in a uniform external electrostatic field. Includes derivation via external torque work and via superposition of charge-potential energies. Excludes non-uniform fields, induced dipoles, dielectric polarization energy density, and magnetic dipoles (covered in Magnetism chapter).

## WALKTHROUGH
Observe a compass needle (magnetic dipole) aligning with Earth's magnetic field — it rotates to minimize potential energy. In electrostatics, a water molecule (permanent electric dipole) in a uniform field between capacitor plates experiences a torque \(\vec{\tau} = \vec{p} \times \vec{E}\). To find the energy stored, imagine an external agent slowly rotating the dipole from a reference angle \(\theta_0 = 90^\circ\) (where \(U=0\)) to a final angle \(\theta\). The external torque \(\tau_{\text{ext}} = pE\sin\theta\) does work \(W = \int_{\pi/2}^{\theta} pE\sin\theta'\, d\theta' = pE(\cos\theta_0 - \cos\theta)\). With \(\theta_0 = \pi/2\), this gives \(U(\theta) = -pE\cos\theta\). Verify by checking that \(U\) is minimum at \(\theta=0\) (stable equilibrium) and maximum at \(\theta=\pi\) (unstable).

Takeaway first: the dipole's energy is the negative dot product - minimum when aligned, maximum when opposed, zero by convention at right angles - and rotations between orientations change energy by the cosine difference times p E. Exam moves: derivation questions integrating the external torque, energy-difference questions between orientations, and application questions on heat released when a dipole snaps into alignment. Method: rerun the compass - the reference at ninety degrees, the slow rotation against the field's torque, the integral landing on minus p E cosine theta. Check yourself: the minus sign is the alignment's reward - dropping it flips stability and turns the maximum into a minimum on paper. Drill: derive U once, then compute the energy released when a dipole falls from anti-alignment to alignment.

## DIAGNOSTIC_QUESTION_1
State the formula for the potential energy of an electric dipole of dipole moment \(\vec{p}\) placed in a uniform electric field \(\vec{E}\). What is the SI unit of this energy? At what orientation is the potential energy zero according to the standard convention?

## DIAGNOSTIC_ANSWER_1
\(U = -\vec{p} \cdot \vec{E} = -pE\cos\theta\); SI unit: joule (J). By standard convention, \(U=0\) at \(\theta = 90^\circ\) (dipole perpendicular to field). A wrong answer (e.g., \(U = +pE\cos\theta\) or zero at \(\theta=0\)) reveals confusion between torque (\(\tau = pE\sin\theta\)) and energy, or ignorance of the reference-angle convention.

## DIAGNOSTIC_QUESTION_2
A dipole is placed in a uniform electric field. The torque on it is \(\vec{\tau} = \vec{p} \times \vec{E}\). Explain why the potential energy is \(U = -\vec{p} \cdot \vec{E}\) and not \(U = +\vec{p} \cdot \vec{E}\). Use the relationship between torque and potential energy for a conservative system.

## DIAGNOSTIC_ANSWER_2
For a conservative torque, \(\tau = -\frac{dU}{d\theta}\). Given \(\tau = pE\sin\theta\) (magnitude), integrating gives \(U = -pE\cos\theta + C\). Choosing \(U=0\) at \(\theta=\pi/2\) sets \(C=0\), yielding \(U = -pE\cos\theta\). The negative sign ensures stable equilibrium at \(\theta=0\) (minimum energy). A student choosing \(U = +pE\cos\theta\) would predict stable equilibrium at \(\theta=\pi\) (anti-parallel), which contradicts the observed alignment of dipoles with the field.

## DIAGNOSTIC_QUESTION_3
An electric dipole of moment \(p = 4 \times 10^{-29}\,\text{C·m}\) is placed in a uniform electric field \(E = 2 \times 10^5\,\text{N/C}\). Calculate the work done by an external agent to rotate the dipole from \(\theta = 60^\circ\) to \(\theta = 120^\circ\). Express your answer in joules.

## DIAGNOSTIC_ANSWER_3
Given: \(p = 4 \times 10^{-29}\,\text{C·m}\), \(E = 2 \times 10^5\,\text{N/C}\), \(\theta_i = 60^\circ\), \(\theta_f = 120^\circ\).  
Work done by external agent = change in potential energy:  
\(W = \Delta U = U_f - U_i = (-pE\cos\theta_f) - (-pE\cos\theta_i) = pE(\cos\theta_i - \cos\theta_f)\).  
\(\cos 60^\circ = 0.5\), \(\cos 120^\circ = -0.5\).  
\(W = (4 \times 10^{-29})(2 \times 10^5)[0.5 - (-0.5)] = 8 \times 10^{-24} \times 1.0 = 8 \times 10^{-24}\,\text{J}\).  
A wrong answer (e.g., negative work, or using \(\sin\theta\) instead of \(\cos\theta\)) reveals sign errors or confusion between torque and energy formulas.

## DIAGNOSTIC_QUESTION_4
Two identical dipoles, each of moment \(p\), are placed in the same uniform electric field \(E\). Dipole A is aligned parallel to the field (\(\theta=0\)), Dipole B is anti-parallel (\(\theta=\pi\)). Compare their potential energies. If both are released from rest, describe their subsequent motion and final orientation. Which dipole has higher total mechanical energy if both start from rest at their respective orientations?

## DIAGNOSTIC_ANSWER_4
\(U_A = -pE\cos 0 = -pE\); \(U_B = -pE\cos\pi = +pE\). So \(U_B > U_A\). Both experience torque toward \(\theta=0\). Dipole A is already at stable equilibrium (minimum \(U\)) and remains at rest. Dipole B is at unstable equilibrium; any tiny disturbance makes it rotate toward \(\theta=0\), converting potential energy to kinetic energy, then oscillate (or damp to \(\theta=0\)). Since both start from rest, total mechanical energy \(E_{\text{mech}} = U + K = U\). Thus Dipole B has higher total mechanical energy by \(2pE\). A student claiming both have same energy or that Dipole B stays at \(\theta=\pi\) misunderstands stability and energy conservation.

## DIAGNOSTIC_QUESTION_5
A student writes: "The potential energy of a dipole in a uniform field is \(U = pE\cos\theta\). At \(\theta=0\), \(U = pE\) (maximum), so the dipole is in stable equilibrium because it has maximum potential energy." Evaluate this statement. Identify all errors and correct them.

## DIAGNOSTIC_ANSWER_5
Errors: (1) Formula sign is wrong: correct is \(U = -pE\cos\theta\). (2) At \(\theta=0\), correct \(U = -pE\) (minimum, not maximum). (3) Stable equilibrium corresponds to minimum potential energy, not maximum. (4) The student confuses the condition for stable equilibrium. The correct statement: \(U = -pE\cos\theta\); at \(\theta=0\), \(U_{\text{min}} = -pE\), stable equilibrium. At \(\theta=\pi\), \(U_{\text{max}} = +pE\), unstable equilibrium. This reveals a fundamental misconception about the relationship between potential energy minima/maxima and equilibrium stability.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment to measure the dipole moment of an unknown polar molecule using a uniform electric field and a device that can measure the work done to rotate the molecule. Specify the measurements needed, the formula to be used, and how you would account for thermal motion (which randomizes orientation).

## DIAGNOSTIC_ANSWER_6
Place a sample of the polar molecules in a uniform electric field \(E\). Use an external torque to slowly rotate a single molecule from \(\theta = \pi/2\) to \(\theta = 0\) and measure the work \(W\) done. Then \(p = W/E\). To account for thermal motion: perform the experiment at very low temperature (so thermal energy \(k_B T \ll pE\)) or use an ensemble measurement: measure the average orientation \(\langle \cos\theta \rangle\) via dielectric constant and use the Langevin function \(\langle \cos\theta \rangle = \coth(pE/k_B T) - k_B T/(pE)\) to extract \(p\). A poor answer ignores thermal motion or suggests measuring torque directly without relating it to energy.

## COMMON_MISCONCEPTION
Students often write \(U = +pE\cos\theta\) because they confuse the torque formula \(\tau = pE\sin\theta\) with energy, or they think "potential energy should be positive when aligned with the field". They also frequently set the zero of potential energy at \(\theta=0\) (aligned) instead of the standard \(\theta=\pi/2\), leading to sign errors in \(\Delta U\) calculations. Another error: using the angle between \(\vec{p}\) and \(\vec{E}\) as the complement (e.g., using \(\sin\theta\) in energy) because they misremember the dot product.

## ON_FAILURE
1. Revisit the definition of potential energy for a conservative force: \(\Delta U = -W_{\text{conservative}}\) and \(\tau = -dU/d\theta\).  
2. Practice the integration: \(\tau = pE\sin\theta \Rightarrow U = -\int \tau\,d\theta = -pE\cos\theta + C\).  
3. Choose \(C\) by setting \(U=0\) at \(\theta=\pi/2\) (standard convention).  
4. Verify stable equilibrium at \(\theta=0\) (minimum \(U\)).  
5. Solve NCERT Example 2.6 step-by-step, tracking units.  
6. If vector dot product is weak, review Class 11 node c11_phy_cbse_03_007 (Scalar Product).

## PREREQUISITE_NODE_IDS
c12_phy_cbse_02_003, c12_phy_cbse_02_005, c11_phy_cbse_03_007, c11_phy_cbse_06_004, c11_phy_cbse_05_001, c11_phy_cbse_05_009, c12_phy_cbse_02_001

## PREREQUISITE_REASONS
c12_phy_cbse_02_003: Defines dipole moment \(\vec{p}\) and its direction (from -q to +q).  
c12_phy_cbse_02_005: Covers potential energy of a system of charges in an external field (Eq. 2.29), which is used to derive dipole energy via superposition.  
c11_phy_cbse_03_007: Scalar (dot) product \(\vec{p} \cdot \vec{E} = pE\cos\theta\) is essential for the final formula.  
c11_phy_cbse_06_004: Torque \(\vec{\tau} = \vec{p} \times \vec{E}\) is the starting point for the work-energy derivation.  
c11_phy_cbse_05_001: Work done by a force (and torque) definition underpins the derivation.  
c11_phy_cbse_05_009: Conservative force concept ensures path-independence of potential energy.
c12_phy_cbse_02_001: Uses potential energy of dipole in external field (U = -p·E), derived from V.  

## FORWARD_NODE_IDS
c12_phy_cbse_02_008, c12_phy_cbse_02_012
## FORWARD_REASONS
c12_phy_cbse_02_008: Dielectrics and Polarization — the alignment of permanent dipoles in an external field (governed by \(U = -\vec{p}\cdot\vec{E}\)) is the microscopic origin of polarization in polar dielectrics.  
c12_phy_cbse_02_012: Energy Stored in a Capacitor — the energy density \(\frac{1}{2}\epsilon_0 E^2\) in a dielectric-filled capacitor includes the work done to align dipoles, linking microscopic dipole energy to macroscopic capacitor energy.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_008, c11_math_cbse_03_003
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_008: Derivative Using First Principle — the relation \(\tau = -dU/d\theta\) is a direct application of the derivative; the derivation of \(U\) from \(\tau\) uses integration (inverse of derivative).  
c11_math_cbse_03_003: Trigonometric Functions: sin, cos, tan Definition — the angle dependence of torque (\(\sin\theta\)) and energy (\(\cos\theta\)) requires fluency with trigonometric functions and their derivatives/integrals.

## CHAIN_DESCRIPTION
c12_phy_cbse_02_003 (dipole moment) -> c12_phy_cbse_02_006 (dipole energy in field) -> c12_phy_cbse_02_008 (dielectric polarization)

## THIS_FORMULA
\(U = -\vec{p} \cdot \vec{E} = -pE\cos\theta\) (J)

## FORMULA_VARIABLES
\(U\) = potential energy of dipole in external field (J); \(\vec{p}\) = electric dipole moment (C·m); \(\vec{E}\) = uniform external electric field (N/C or V/m); \(\theta\) = angle between \(\vec{p}\) and \(\vec{E}\) (rad or °).

## FORMULA_UNITS
J, C·m, N/C, rad

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_13_008 | The derivative/integral relationship between torque (\(\tau = pE\sin\theta\)) and potential energy (\(U = -pE\cos\theta\)) is a direct application of calculus: \(\tau = -dU/d\theta\).  
c11_math_cbse_03_003 | The angular dependence uses \(\sin\theta\) and \(\cos\theta\); their derivatives/integrals interconvert torque and energy.
## PREREQ_CONCEPT
The student must understand that electrostatic force is conservative, so potential energy can be defined, and that torque on a dipole is \(\vec{\tau} = \vec{p} \times \vec{E}\).

## PREREQ_BEFORE
The student should be able to compute the dot product \(\vec{p}\cdot\vec{E}\) and integrate \(\sin\theta\) to get \(-\cos\theta\).

## PREREQ_STUCK
If stuck, review the derivation of torque on a dipole (Class 11, Ch. 1) and the work-energy theorem for rotational motion (Class 11, Ch. 6).

## WORKED_EXAMPLE_1
PROBLEM: An HCl molecule has a permanent dipole moment of \(3.4 \times 10^{-30}\,\text{C·m}\). It is placed in a uniform electric field of magnitude \(5 \times 10^4\,\text{N/C}\). Find the potential energy of the molecule when (a) it is aligned with the field, (b) it is perpendicular to the field, and (c) it is anti-parallel to the field. Also find the work needed to rotate it from alignment to anti-parallel orientation.

STEPS:
- Step 1: Identify given quantities: \(p = 3.4 \times 10^{-30}\,\text{C·m}\), \(E = 5 \times 10^4\,\text{N/C}\). The formula is \(U = -pE\cos\theta\). SI units are consistent (C·m × N/C = N·m = J).
- Step 2: For (a) aligned: \(\theta = 0^\circ\), \(\cos 0^\circ = 1\). \(U_a = -pE = -(3.4 \times 10^{-30})(5 \times 10^4) = -1.7 \times 10^{-25}\,\text{J}\).
- Step 3: For (b) perpendicular: \(\theta = 90^\circ\), \(\cos 90^\circ = 0\). \(U_b = 0\,\text{J}\) (by convention).
- Step 4: For (c) anti-parallel: \(\theta = 180^\circ\), \(\cos 180^\circ = -1\). \(U_c = -pE(-1) = +pE = +1.7 \times 10^{-25}\,\text{J}\).
- Step 5: Work to rotate from aligned to anti-parallel = \(\Delta U = U_c - U_a = 1.7 \times 10^{-25} - (-1.7 \times 10^{-25}) = 3.4 \times 10^{-25}\,\text{J}\). The positive sign means external agent must supply energy.

REASONING: The potential energy is minimum (most negative) when the dipole is aligned with the field (stable equilibrium) and maximum when anti-parallel (unstable). The zero is chosen at perpendicular orientation. The work done by an external agent equals the increase in potential energy.

ANSWER: (a) \(-1.7 \times 10^{-25}\,\text{J}\); (b) \(0\,\text{J}\); (c) \(+1.7 \times 10^{-25}\,\text{J}\); Work = \(3.4 \times 10^{-25}\,\text{J}\).

## WORKED_EXAMPLE_2
PROBLEM: A dipole of moment \(p = 2 \times 10^{-28}\,\text{C·m}\) is initially at rest in a uniform electric field \(E = 10^5\,\text{N/C}\), aligned at \(\theta = 60^\circ\) to the field. It is released and rotates freely (no friction). What is its maximum angular speed if its moment of inertia about the center is \(I = 4 \times 10^{-46}\,\text{kg·m}^2\)? (Assume no radiation loss.)

STEPS:
- Step 1: Initial potential energy: \(U_i = -pE\cos 60^\circ = -(2 \times 10^{-28})(10^5)(0.5) = -1.0 \times 10^{-23}\,\text{J}\).
- Step 2: At maximum angular speed, the dipole passes through \(\theta = 0\) (minimum potential energy): \(U_f = -pE\cos 0^\circ = -pE = -2 \times 10^{-23}\,\text{J}\).
- Step 3: Loss in potential energy = gain in rotational kinetic energy: \(\Delta U = U_f - U_i = (-2 \times 10^{-23}) - (-1 \times 10^{-23}) = -1 \times 10^{-23}\,\text{J}\). So \(K_{\text{rot}} = +1 \times 10^{-23}\,\text{J}\).
- Step 4: Rotational kinetic energy \(K = \frac{1}{2} I \omega^2\). Solve for \(\omega\): \(\omega = \sqrt{2K/I} = \sqrt{2 \times 10^{-23} / (4 \times 10^{-46})} = \sqrt{0.5 \times 10^{23}} = \sqrt{5 \times 10^{22}} \approx 7.07 \times 10^{11}\,\text{rad/s}\).
- Step 5: Check units: \(K\) in J = kg·m²/s², \(I\) in kg·m², so \(\omega\) in rad/s. The angular speed is physically plausible for a molecule.

REASONING: Conservation of mechanical energy applies because the electrostatic force is conservative and no non-conservative torques act. The dipole oscillates about \(\theta=0\); maximum kinetic energy (and angular speed) occurs at the equilibrium position where potential energy is minimum.

ANSWER: \(\omega_{\text{max}} \approx 7.1 \times 10^{11}\,\text{rad/s}\).

## WORKED_EXAMPLE_3
PROBLEM: A sample contains \(N = 10^{23}\) identical polar molecules, each with dipole moment \(p = 1.5 \times 10^{-29}\,\text{C·m}\). At low temperature, they are fully polarized (all aligned with a uniform field \(E = 2 \times 10^6\,\text{V/m}\)). The field direction is suddenly reversed. Estimate the total heat released as the dipoles realign with the new field direction. Assume 100% polarization before and after.

STEPS:
- Step 1: Initial state: all dipoles aligned with original field, so \(\theta_i = 0^\circ\). \(U_i = N \times (-pE\cos 0^\circ) = -N pE\).
- Step 2: Field reverses. Dipoles are now anti-parallel to the new field: \(\theta = 180^\circ\). \(U_{\text{after reversal}} = N \times (-pE\cos 180^\circ) = +N pE\).
- Step 3: Dipoles realign to new field direction: final \(\theta_f = 0^\circ\). \(U_f = -N pE\).
- Step 4: Heat released = loss in potential energy during realignment = \(U_{\text{after reversal}} - U_f = (+N pE) - (-N pE) = 2 N pE\).
- Step 5: Compute: \(N pE = 10^{23} \times 1.5 \times 10^{-29} \times 2 \times 10^6 = 3 \times 10^0 = 3\,\text{J}\). So heat released = \(2 \times 3 = 6\,\text{J}\).

REASONING: The sudden field reversal does not instantly change dipole orientations (inertia). The dipoles are momentarily anti-parallel to the new field (high energy). As they rotate to align, the potential energy difference is dissipated as heat (via collisions, radiation). This is exactly the principle of dielectric heating.

ANSWER: \(6\,\text{J}\).

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "If a dipole is placed in a uniform electric field, its potential energy is \(U = pE\cos\theta\). Therefore, when the dipole is aligned with the field (\(\theta=0\)), the potential energy is maximum, so the dipole is in stable equilibrium because systems tend to maximize potential energy." Identify the errors in this statement and write the correct physical principle.

COMPETENCY: Interpreting physical situations using formulas and identifying misconceptions about equilibrium stability.

STEPS:
- Step 1: Recall the correct formula for dipole potential energy: \(U = -\vec{p}\cdot\vec{E} = -pE\cos\theta\).
- Step 2: Evaluate at \(\theta=0\): \(U = -pE\) (minimum, not maximum).
- Step 3: State the correct principle: Systems in stable equilibrium minimize potential energy.
- Step 4: Explain that the torque \(\vec{\tau} = \vec{p}\times\vec{E}\) acts to reduce \(\theta\) toward 0, confirming stable equilibrium at minimum \(U\).

ANSWER: The student has three errors: (1) Wrong sign in formula (should be negative). (2) At \(\theta=0\), correct \(U = -pE\) is minimum, not maximum. (3) Stable equilibrium corresponds to minimum potential energy, not maximum. The torque \(\vec{\tau} = \vec{p}\times\vec{E}\) rotates the dipole toward alignment with \(\vec{E}\), reducing \(\theta\) and lowering \(U\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A water molecule (dipole moment \(p = 6.2 \times 10^{-30}\,\text{C·m}\)) is in a uniform electric field \(E = 10^6\,\text{V/m}\). It is initially in thermal equilibrium at temperature \(T = 300\,\text{K}\), so its orientation is random. The field is suddenly turned on. Assuming the molecule rotates without friction and no energy is lost to radiation, what is the maximum angular speed it can attain as it aligns with the field? Moment of inertia of water molecule about its center: \(I = 1.9 \times 10^{-47}\,\text{kg·m}^2\). (Hint: Use energy conservation; initial orientation for maximum speed is anti-parallel to the field.)

COMPETENCY: Applying energy conservation across electrostatics and rotational mechanics to find a dynamical quantity.

STEPS:
- Step 1: Maximum kinetic energy occurs when potential energy loss is maximum. Initial orientation for maximum loss: anti-parallel to field (\(\theta_i = 180^\circ\)). Final: aligned (\(\theta_f = 0^\circ\)).
- Step 2: \(\Delta U = U_f - U_i = (-pE\cos 0) - (-pE\cos 180) = -pE - (+pE) = -2pE\). Loss in \(U = 2pE\).
- Step 3: This loss equals gain in rotational kinetic energy: \(\frac{1}{2} I \omega_{\text{max}}^2 = 2pE\).
- Step 4: Compute \(pE = (6.2 \times 10^{-30})(10^6) = 6.2 \times 10^{-24}\,\text{J}\). So \(2pE = 1.24 \times 10^{-23}\,\text{J}\).
- Step 5: \(\omega_{\text{max}} = \sqrt{4pE / I} = \sqrt{1.24 \times 10^{-23} / (0.5 \times 1.9 \times 10^{-47})} = \sqrt{1.24 / 0.95 \times 10^{24}} \approx \sqrt{1.305 \times 10^{24}} \approx 1.14 \times 10^{12}\,\text{rad/s}\).

ANSWER: \(\omega_{\text{max}} \approx 1.1 \times 10^{12}\,\text{rad/s}\).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The potential energy of an electric dipole in a uniform external electric field is the work done by an external agent to assemble the dipole in the field or to rotate it from a ______ orientation (where potential energy is defined as zero) to a given orientation.

## DIAGNOSTIC_ANSWER_7
reference

The reference orientation is the zero's address: energy differences are what physics fixes, and this angle is where the ledger opens at nil. **A wrong answer (an initial) reveals the student has made the zero accidental when the definition makes it conventional and stated.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a compass needle (magnetic dipole) aligning with Earth's magnetic field — it rotates to minimize ______ energy.

## DIAGNOSTIC_ANSWER_8
potential

The potential energy is what the needle minimises: alignment is the compass's lowest-energy seat, and torque is the road there. **A wrong answer (kinetic) reveals the student has credited the motion when the alignment verdict belongs to stored energy.**
