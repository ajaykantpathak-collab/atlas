## ELI5
Bring a magnet near a cathode-ray beam and the beam swerves sideways - perpendicular to both its motion and the field. The Lorentz force's magnetic part is q times v cross B: magnitude q v B sine theta, direction by the right-hand rule, reversed for negative charges. Its signature clause: always perpendicular to velocity, so it does no work, bends paths without spending energy, and cannot change a particle's speed - only its heading.

## DEFINITION
The Lorentz force is the total electromagnetic force experienced by a charge \(q\) moving with velocity \(\vec{v}\) in the presence of both an electric field \(\vec{E}\) and a magnetic field \(\vec{B}\). The magnetic component of this force is given by \(\vec{F}_m = q(\vec{v} \times \vec{B})\). Its magnitude is \(F_m = q v B \sin\theta\), where \(\theta\) is the angle between \(\vec{v}\) and \(\vec{B}\). The direction is perpendicular to the plane containing \(\vec{v}\) and \(\vec{B}\), determined by the right-hand rule for a positive charge (reverse for negative charge). The SI unit of magnetic force is the newton (N). The magnetic force does no work because it is always perpendicular to the velocity.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) calculate the magnitude and direction of the magnetic force on a moving charge given \(q\), \(\vec{v}\), \(\vec{B}\), and the angle between them; (2) apply the right-hand rule correctly for both positive and negative charges; (3) explain why the magnetic force cannot change the kinetic energy of the particle; and (4) distinguish between the electric force (\(q\vec{E}\)) and magnetic force (\(q\vec{v} \times \vec{B}\)) in terms of direction, work done, and dependence on velocity.

## SCOPE_BOUNDARY
This node covers the Lorentz force on a **single moving point charge** in uniform electric and magnetic fields. It includes the vector cross product formulation, magnitude \(qvB\sin\theta\), direction via right-hand rule, and the zero-work property. It does **NOT** cover: force on a current-carrying conductor (node c12_phy_cbse_04_002), motion of a charge in a magnetic field (circular/helical paths, node c12_phy_cbse_04_003), Biot-Savart law, Ampere's law, or torque on a current loop. Non-uniform fields and time-varying fields are excluded.

## WALKTHROUGH
Observe an old cathode-ray tube (CRT) television or a laboratory cathode-ray tube demonstration: a beam of electrons travels in a straight line until a bar magnet is brought near it — the beam deflects **perpendicular** to both the magnet's field and the beam's velocity. This is the magnetic force in action. In Class 11, you learned that a current-carrying wire experiences a force in a magnetic field (c10_phy_cbse_02_005); now we go deeper: the wire's force arises from the force on individual moving charges. Recall the vector cross product (c11_phy_cbse_03_008): \(\vec{a} \times \vec{b}\) gives a vector perpendicular to both. The magnetic force is exactly \(q(\vec{v} \times \vec{B})\). Start by identifying the charge sign, drawing \(\vec{v}\) and \(\vec{B}\), finding the angle \(\theta\), computing magnitude \(qvB\sin\theta\), and using the right-hand rule (fingers from \(\vec{v}\) to \(\vec{B}\), thumb gives direction for \(+q\); reverse for \(-q\)). The key principle: **magnetic force is always perpendicular to velocity, so it does zero work and cannot change speed — only direction.**

Takeaway first: the magnetic force is a pure turn signal - perpendicular to motion, work-free, speed-preserving - and the Lorentz force is its sum with the electric q E when both fields are present. Exam moves: magnitude-and-direction questions from given vectors, right-hand-rule questions for both charge signs, zero-work questions, and comparison questions against the electric force's habits. Method: rerun the CRT - straight beam, magnet's approach, the perpendicular swerve, right hand checked, sign reversed for electrons. Check yourself: the electric force does work and is blind to velocity; the magnetic force does none and cares only about motion - the comparison table writes itself from these two sentences. Drill: compute one magnetic force's magnitude and direction, then state what a magnetic field can never do to a particle's kinetic energy.

## DIAGNOSTIC_QUESTION_1
State the formula for the magnetic force on a charge \(q\) moving with velocity \(\vec{v}\) in a magnetic field \(\vec{B}\). What is its SI unit? Give the condition for the force to be maximum.

## DIAGNOSTIC_ANSWER_1
**Correct answer:** \(\vec{F}_m = q(\vec{v} \times \vec{B})\); magnitude \(F_m = q v B \sin\theta\). SI unit: newton (N). Force is maximum when \(\theta = 90^\circ\) (\(\sin\theta = 1\)), i.e., velocity perpendicular to magnetic field.  
**Why a wrong answer reveals misunderstanding:** If a student writes \(F = qvB\) without \(\sin\theta\), they confuse the special case (perpendicular) with the general formula. If they give the unit as tesla or coulomb, they confuse force with field or charge. If they say maximum at \(\theta = 0^\circ\), they misunderstand the cross product.

## DIAGNOSTIC_QUESTION_2
An electron moves horizontally northward at \(2 \times 10^6 \, \text{m/s}\) in a uniform magnetic field directed vertically downward. Explain why the magnetic force does no work on the electron, and state the direction of the force.

## DIAGNOSTIC_ANSWER_2
**Correct answer:** Magnetic force \(\vec{F}_m = q(\vec{v} \times \vec{B})\) is always perpendicular to velocity \(\vec{v}\). Work done \(W = \int \vec{F} \cdot d\vec{s} = \int \vec{F} \cdot \vec{v} \, dt = 0\) because \(\vec{F} \perp \vec{v}\). For an electron (\(q = -e\)), \(\vec{v}\) is north, \(\vec{B}\) is downward. \(\vec{v} \times \vec{B}\) (north \(\times\) down) points east by right-hand rule. Since charge is negative, force is **west**.  
**Why a wrong answer reveals misunderstanding:** If the student says work is non-zero, they confuse magnetic force with electric force (which can have a component along velocity). If they give direction as east, they forgot to reverse for the negative charge. If they say force is vertical, they think force is along \(\vec{B}\) (like electric force along \(\vec{E}\)).

## DIAGNOSTIC_QUESTION_3
A proton (\(q = +1.6 \times 10^{-19} \, \text{C}\)) moves with speed \(5 \times 10^5 \, \text{m/s}\) at an angle of \(30^\circ\) to a uniform magnetic field of magnitude \(0.4 \, \text{T}\). Calculate the magnitude of the magnetic force on the proton.

## DIAGNOSTIC_ANSWER_3
**Correct answer with steps:**  
1. Given: \(q = 1.6 \times 10^{-19} \, \text{C}\), \(v = 5 \times 10^5 \, \text{m/s}\), \(B = 0.4 \, \text{T}\), \(\theta = 30^\circ\).  
2. Formula: \(F = q v B \sin\theta\).  
3. Substitute: \(F = (1.6 \times 10^{-19}) \times (5 \times 10^5) \times 0.4 \times \sin 30^\circ\).  
4. Compute: \(\sin 30^\circ = 0.5\). \(F = 1.6 \times 10^{-19} \times 5 \times 10^5 \times 0.4 \times 0.5 = 1.6 \times 10^{-19} \times 1 \times 10^5 = 1.6 \times 10^{-14} \, \text{N}\).  
5. Units: C \(\cdot\) m/s \(\cdot\) T = C \(\cdot\) m/s \(\cdot\) (N·s/C·m) = N. ✓  
**Answer:** \(1.6 \times 10^{-14} \, \text{N}\).  
**Why a wrong answer reveals misunderstanding:** If the student uses \(\cos 30^\circ\) or omits \(\sin\theta\), they misremember the cross product magnitude. If they get \(3.2 \times 10^{-14} \, \text{N}\), they used \(\sin 30^\circ = 1\) (forgetting the 0.5). If units come out as T·C·m/s without simplifying to N, they lack unit analysis.

## DIAGNOSTIC_QUESTION_4
Compare the magnetic force on a proton and an electron moving with the **same velocity** in the **same magnetic field**. How do the magnitudes and directions differ? What about their accelerations?

## DIAGNOSTIC_ANSWER_4
**Correct answer:** Magnitudes are equal: \(|q|\) is same (\(e\)), \(v\), \(B\), \(\theta\) same \(\Rightarrow F = evB\sin\theta\) same. Directions are **opposite** because charges have opposite signs: \(\vec{F}_p = +e(\vec{v} \times \vec{B})\), \(\vec{F}_e = -e(\vec{v} \times \vec{B}) = -\vec{F}_p\). Accelerations differ greatly: \(\vec{a} = \vec{F}/m\). Proton mass \(m_p \approx 1.67 \times 10^{-27} \, \text{kg}\), electron mass \(m_e \approx 9.1 \times 10^{-31} \, \text{kg}\). So \(a_e \approx 1836 \times a_p\) (electron accelerates much more).  
**Why a wrong answer reveals misunderstanding:** If the student says magnitudes differ, they confuse charge magnitude with sign. If they say directions are same, they ignore the sign of \(q\). If they say accelerations are same, they forget Newton's second law (\(a = F/m\)) and the huge mass difference.

## DIAGNOSTIC_QUESTION_5
A student claims: "If a charged particle moves parallel to a uniform magnetic field, it experiences the maximum magnetic force because the field lines are aligned with its motion." Evaluate this statement and correct it.

## DIAGNOSTIC_ANSWER_5
**Correct answer:** The statement is **false**. When \(\vec{v} \parallel \vec{B}\), \(\theta = 0^\circ\) (or \(180^\circ\)), \(\sin\theta = 0\), so magnetic force \(F = qvB\sin\theta = 0\). The force is **zero**, not maximum. Maximum force occurs at \(\theta = 90^\circ\) (perpendicular). The student likely confuses "parallel" with "perpendicular" or thinks magnetic force acts along the field like electric force.  
**Why a wrong answer reveals misunderstanding:** If the student agrees, they fundamentally misunderstand the cross product: \(\vec{v} \times \vec{B} = 0\) when parallel. They may be visualizing field lines as "pushing" along their direction (like electric field lines). This is a critical conceptual error that leads to wrong predictions in all subsequent topics (circular motion, velocity selector, etc.).

## DIAGNOSTIC_QUESTION_6
Design a simple classroom experiment (using a cathode-ray tube or a simulation) to demonstrate that the magnetic force on a moving charge is always perpendicular to its velocity. Describe the setup, what you would observe, and how it proves the perpendicular nature.

## DIAGNOSTIC_ANSWER_6
**Expected answer:**  
**Setup:** Use a cathode-ray tube (CRT) with a fluorescent screen. Apply a uniform magnetic field perpendicular to the electron beam (e.g., using a pair of Helmholtz coils or a strong bar magnet placed suitably).  
**Observation:** The electron beam (visible as a glowing spot/line on the screen) deflects into a **circular arc** on the screen. The deflection is in a plane perpendicular to the magnetic field. If the magnetic field is parallel to the beam, no deflection occurs (spot stays centered).  
**Proof:** Circular motion requires a centripetal force **perpendicular to velocity** at every instant. Since the magnetic force provides this centripetal force (\(F = qvB = mv^2/r\)), it must be perpendicular to \(\vec{v}\). The radius \(r = mv/(qB)\) is constant, confirming constant speed (no work done).  
**Why a poor answer reveals misunderstanding:** If the student describes the beam speeding up or slowing down, they think magnetic force does work. If they say the beam deflects along the field lines, they confuse magnetic with electric force. If they cannot explain why the path is circular, they haven't connected force direction to centripetal acceleration.

## COMMON_MISCONCEPTION
**Specific error:** Students believe that "magnetic force can increase or decrease the speed of a charged particle" because they analogize it to electric force (\(q\vec{E}\)) or gravity, which can have components along velocity. They also frequently **forget to reverse the right-hand rule direction for negative charges** (e.g., electron), giving the force direction for a positive charge instead. A third error: they think the magnetic force is maximum when \(\vec{v}\) and \(\vec{B}\) are parallel ("aligned"), confusing the cross product with the dot product. These errors appear in board exams (direction of deflection questions) and JEE/NEET (velocity selector, cyclotron problems where sign of charge matters).

## ON_FAILURE
**Step-by-step remediation:**  
1. **Revisit vector cross product** (c11_phy_cbse_03_008): Practice \(\vec{a} \times \vec{b}\) with simple vectors (e.g., \(\hat{i} \times \hat{j} = \hat{k}\)). Use the right-hand rule physically: fingers from first vector to second, thumb gives direction.  
2. **Drill the sign rule**: For 5 different \((\vec{v}, \vec{B})\) pairs, compute \(\vec{v} \times \vec{B}\) direction, then state force direction for proton and electron. Check with a simulation (e.g., PhET "Magnets and Electromagnets" or "Lorentz Force").  
3. **Work-energy theorem review** (c11_phy_cbse_05_005): Write \(W = \Delta K = \int \vec{F} \cdot d\vec{s}\). Show that if \(\vec{F} \perp \vec{v}\), then \(\vec{F} \cdot \vec{v} = 0 \Rightarrow W = 0 \Rightarrow \Delta K = 0\). Do a numerical example: electron in uniform B, compute speed after 1 ms — it's unchanged.  
4. **Re-diagnostic**: Solve Diagnostic Questions 2 and 5 again without notes. If correct, proceed; else repeat step 2 with a peer or teacher.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_03_008, c11_phy_cbse_02_003, c11_phy_cbse_04_003, c10_phy_cbse_02_005, c11_math_cbse_03_003, c11_math_cbse_03_005, c11_math_cbse_10_006, c11_phy_cbse_05_005

## PREREQUISITE_REASONS
c11_phy_cbse_03_008: Vector cross product — essential for direction and magnitude \(qvB\sin\theta\) of magnetic force.  
c11_phy_cbse_02_003: Instantaneous velocity — the \(\vec{v}\) in Lorentz force is the instantaneous velocity vector.  
c11_phy_cbse_04_003: Newton's second law (\(F=ma\)) — needed to connect force to acceleration and subsequent motion (circular/helical).  
c10_phy_cbse_02_005: Force on current-carrying conductor — provides the macroscopic precursor; the force on a wire is the sum of forces on individual charges.  
c11_math_cbse_03_003: Trigonometric functions (sin, cos, tan) — used in \(\sin\theta\) for magnitude and in resolving vectors.  
c11_math_cbse_03_005: Trigonometric functions of any angle — needed when \(\theta > 90^\circ\) (e.g., obtuse angles in 3D geometry).
c11_math_cbse_10_006: c11_math_cbse_10_006 | Slope of a line (parallel/perpendicular) — geometric interpretation of \(\vec{v} \perp \vec{B}\) for maximum force.  
c11_phy_cbse_05_005: 3. Work-energy theorem review (c11_phy_cbse_05_005): Write \(W = \Delta K = \int \vec{F} \cdot d\vec{s}\). Show that if \(\vec{F} \perp \vec{v}\), then \(\vec{F} \cdot \ve  

## FORWARD_NODE_IDS
c12_phy_cbse_04_002, c12_phy_cbse_04_003, c12_phy_cbse_04_009, c12_math_cbse_10_004, c12_math_cbse_10_001, c12_math_cbse_11_007, c12_math_cbse_10_008

## FORWARD_REASONS
c12_phy_cbse_04_002: Magnetic force on a current-carrying conductor is derived by summing \(q(\vec{v} \times \vec{B})\) over all moving charges in the conductor (\(F = I\vec{l} \times \vec{B}\)).  
c12_phy_cbse_04_003: Motion of a charge in a uniform magnetic field (circular/helical paths) directly uses \(\vec{F} = q(\vec{v} \times \vec{B})\) as the centripetal force.
c12_phy_cbse_04_009: Lorentz force on a moving charge is the foundation for force on a current element.  
c12_math_cbse_10_004: c12_phy_cbse_04_001 | Electric flux \(\Phi = \vec{E} \cdot \vec{A}\) uses dot product to find the component of electric field normal to a surface.  
c12_math_cbse_10_001: c12_phy_cbse_04_001 | Displacement, velocity, and acceleration in kinematics are vectors; this node defines the mathematical object used to model them.  
c12_math_cbse_11_007: c12_phy_cbse_04_001 | Motion of a charged particle in a uniform electric field between parallel plates uses plane equations to describe plate surfaces.  
c12_math_cbse_10_008: c12_phy_cbse_04_001 | Motion in a plane: velocity vector gives direction of motion; position vector r(t) = r₀ + v t is exactly the vector equation of a line with λ = t.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_03_003, c11_math_cbse_03_005, c11_phy_cbse_03_008, c11_phy_cbse_02_003
## CROSS_SUBJECT_REASONS
c11_math_cbse_03_003: Trigonometric functions (sin, cos, tan) — the magnitude \(qvB\sin\theta\) requires \(\sin\theta\); direction angles use trigonometry.  
c11_math_cbse_03_005: Trigonometric functions of any angle — for 3D orientations where \(\theta\) may be obtuse, \(\sin\theta\) remains positive (magnitude) but cross product direction flips.  
c11_phy_cbse_03_008: Vector cross product — the mathematical operation defining the magnetic force direction and magnitude.  
c11_phy_cbse_02_003: Velocity vector — the \(\vec{v}\) in Lorentz force is the instantaneous velocity from kinematics.

## CHAIN_DESCRIPTION
c11_phy_cbse_03_008 (cross product) → c12_phy_cbse_04_001 (Lorentz force) → c12_phy_cbse_04_002 (force on current) and c12_phy_cbse_04_003 (charge motion in B).

## THIS_FORMULA
\(\vec{F}_m = q (\vec{v} \times \vec{B})\); magnitude \(F_m = q v B \sin\theta\) (SI unit: newton, N)

## FORMULA_VARIABLES
\(q\) = charge of particle (coulomb, C); \(\vec{v}\) = velocity of particle (metre per second, m/s); \(\vec{B}\) = magnetic field (tesla, T); \(\theta\) = angle between \(\vec{v}\) and \(\vec{B}\) (radian or degree); \(\vec{F}_m\) = magnetic force (newton, N).

## FORMULA_UNITS
C, m/s, T, N (also N = C·m/s·T)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_03_003 | Trigonometric function \(\sin\theta\) gives the magnitude scaling factor in the cross product \(|\vec{v} \times \vec{B}| = vB\sin\theta\).  
c11_phy_cbse_03_008 | Vector cross product \(\vec{v} \times \vec{B}\) determines the direction of magnetic force via the right-hand rule.  
c11_phy_cbse_02_003 | Instantaneous velocity \(\vec{v}\) is the kinematic quantity that couples to the magnetic field in the Lorentz force.  
c11_math_cbse_10_006 | Slope of a line (parallel/perpendicular) — geometric interpretation of \(\vec{v} \perp \vec{B}\) for maximum force.
## PREREQ_CONCEPT
Vector cross product and its geometric meaning: a vector perpendicular to the plane of the two input vectors, with magnitude equal to the product of their magnitudes times the sine of the included angle.

## PREREQ_BEFORE
The student must be able to compute the cross product of two vectors in 3D (using components or the right-hand rule) and state the angle between them.

## PREREQ_STUCK
If stuck, review the right-hand rule for cross product (c11_phy_cbse_03_008) by practicing with \(\hat{i}, \hat{j}, \hat{k}\) unit vectors: \(\hat{i} \times \hat{j} = \hat{k}\), \(\hat{j} \times \hat{k} = \hat{i}\), \(\hat{k} \times \hat{i} = \hat{j}\), and the anti-commutative property.

## WORKED_EXAMPLE_1
**PROBLEM:** In a cathode-ray tube (like an old TV picture tube), an electron moves horizontally from south to north with a speed of \(3.0 \times 10^7 \, \text{m/s}\). A uniform magnetic field of \(0.02 \, \text{T}\) is applied vertically downward. Calculate the magnitude and direction of the magnetic force on the electron. (Charge of electron \(e = -1.6 \times 10^{-19} \, \text{C}\))  

**STEPS:**  
- Step 1: Identify given quantities with units. \(q = -1.6 \times 10^{-19} \, \text{C}\), \(v = 3.0 \times 10^7 \, \text{m/s}\) (north), \(B = 0.02 \, \text{T}\) (downward), \(\theta = 90^\circ\) (horizontal vs vertical). Find \(\vec{F}_m\).  
- Step 2: Choose formula. Magnitude: \(F = |q| v B \sin\theta\). Direction: right-hand rule for \(\vec{v} \times \vec{B}\), then reverse for negative charge.  
- Step 3: Substitute values. \(F = (1.6 \times 10^{-19}) \times (3.0 \times 10^7) \times 0.02 \times \sin 90^\circ\).  
- Step 4: Compute with unit tracking. \(\sin 90^\circ = 1\). \(F = 1.6 \times 10^{-19} \times 3.0 \times 10^7 \times 0.02 = 1.6 \times 3.0 \times 0.02 \times 10^{-12} = 0.096 \times 10^{-12} = 9.6 \times 10^{-14} \, \text{N}\). Units: C·(m/s)·T = C·(m/s)·(N·s/C·m) = N. ✓  
- Step 4 (direction): \(\vec{v}\) (north) \(\times\) \(\vec{B}\) (down) → using right-hand rule: fingers north, curl down → thumb points **east**. But electron has negative charge, so force is opposite: **west**.  
- Step 5: Verify reasonableness. Force is tiny (\(\sim 10^{-13} \, \text{N}\)), typical for single electron. Direction perpendicular to both v and B.  

**REASONING:** The magnetic force magnitude depends on the component of velocity perpendicular to B. Here v is entirely perpendicular, so \(\sin\theta = 1\). The cross product gives a vector perpendicular to both v (north) and B (down), which is east-west. The negative charge flips the direction. This force will cause the electron to deflect westward, curving its path.  

**ANSWER:** Magnitude \(9.6 \times 10^{-14} \, \text{N}\), direction **west** (horizontally).

## WORKED_EXAMPLE_2
**PROBLEM:** A proton (\(q = +1.6 \times 10^{-19} \, \text{C}\), \(m = 1.67 \times 10^{-27} \, \text{kg}\)) moves with velocity \(\vec{v} = (2\hat{i} + 3\hat{j}) \times 10^5 \, \text{m/s}\) in a magnetic field \(\vec{B} = 0.5 \hat{k} \, \text{T}\). Find the magnetic force vector \(\vec{F}_m\) on the proton.  

**STEPS:**  
- Step 1: Identify given vectors. \(\vec{v} = (2\hat{i} + 3\hat{j}) \times 10^5 \, \text{m/s}\), \(\vec{B} = 0.5 \hat{k} \, \text{T}\), \(q = +1.6 \times 10^{-19} \, \text{C}\).  
- Step 2: Compute cross product \(\vec{v} \times \vec{B}\). \(\vec{v} \times \vec{B} = (2\hat{i} + 3\hat{j}) \times 10^5 \times 0.5 \hat{k} = 10^5 \times 0.5 \times (2\hat{i} \times \hat{k} + 3\hat{j} \times \hat{k})\).  
- Step 3: Use cyclic cross products: \(\hat{i} \times \hat{k} = -\hat{j}\), \(\hat{j} \times \hat{k} = \hat{i}\). So \(\vec{v} \times \vec{B} = 0.5 \times 10^5 \times (2(-\hat{j}) + 3\hat{i}) = 0.5 \times 10^5 \times (3\hat{i} - 2\hat{j}) = (1.5\hat{i} - 1.0\hat{j}) \times 10^5 \, \text{m/s·T}\).  
- Step 4: Multiply by \(q\). \(\vec{F}_m = 1.6 \times 10^{-19} \times (1.5\hat{i} - 1.0\hat{j}) \times 10^5 = (2.4\hat{i} - 1.6\hat{j}) \times 10^{-14} \, \text{N}\).  
- Step 5: Check units and perpendicularity. \(\vec{F}_m \cdot \vec{v} = (2.4\hat{i} - 1.6\hat{j}) \cdot (2\hat{i} + 3\hat{j}) \times 10^{-14} \times 10^5 = (4.8 - 4.8) \times 10^{-9} = 0\). ✓ Force is perpendicular to velocity.  

**REASONING:** Using component form avoids angle calculation. The cross product is computed algebraically using unit vector rules. The resulting force has no \(\hat{k}\) component, so it lies in the xy-plane, perpendicular to \(\vec{B}\) (which is along z). The dot product with \(\vec{v}\) confirms zero work.  

**ANSWER:** \(\vec{F}_m = (2.4\hat{i} - 1.6\hat{j}) \times 10^{-14} \, \text{N}\).

## WORKED_EXAMPLE_3
**PROBLEM:** A velocity selector uses crossed electric and magnetic fields to allow only particles of a specific speed to pass undeflected. An electron (\(q = -e\)) travels along the +x axis. The electric field is \(\vec{E} = 500 \hat{j} \, \text{V/m}\) (upward) and the magnetic field is \(\vec{B} = 0.01 \hat{k} \, \text{T}\) (out of page). What speed must the electron have to pass through undeflected? If the electron's speed is half this value, which way will it deflect?  

**STEPS:**  
- Step 1: Condition for no deflection: net force \(\vec{F} = q(\vec{E} + \vec{v} \times \vec{B}) = 0 \Rightarrow \vec{E} = -\vec{v} \times \vec{B}\). Since \(q\) cancels, speed is independent of charge sign/magnitude.  
- Step 2: \(\vec{v} = v \hat{i}\). Compute \(\vec{v} \times \vec{B} = v \hat{i} \times 0.01 \hat{k} = 0.01 v (\hat{i} \times \hat{k}) = 0.01 v (-\hat{j}) = -0.01 v \hat{j}\).  
- Step 3: Set \(\vec{E} = -\vec{v} \times \vec{B}\). \(500 \hat{j} = -(-0.01 v \hat{j}) = 0.01 v \hat{j}\). So \(500 = 0.01 v \Rightarrow v = 500 / 0.01 = 5 \times 10^4 \, \text{m/s}\).  
- Step 4: For \(v' = v/2 = 2.5 \times 10^4 \, \text{m/s}\), magnetic force magnitude \(F_m = e v' B = e \times 2.5 \times 10^4 \times 0.01 = 250 e \, \text{N}\) (downward, since \(\vec{v} \times \vec{B} = -\hat{j}\)). Electric force \(F_e = e E = 500 e \, \text{N}\) (upward, since \(q = -e\), \(\vec{F}_e = -e \vec{E} = -e(500\hat{j}) = -500e \hat{j}\)? Wait: \(\vec{F}_e = q\vec{E} = (-e)(500\hat{j}) = -500e \hat{j}\) (downward). Let's re-evaluate carefully.  
  - \(\vec{E} = 500 \hat{j}\) (up). Electron charge \(q = -e\). \(\vec{F}_e = q\vec{E} = -e \times 500 \hat{j} = -500e \hat{j}\) (downward).  
  - \(\vec{v} \times \vec{B}\) for \(v \hat{i}\) and \(B \hat{k}\) is \(vB (\hat{i} \times \hat{k}) = vB (-\hat{j})\) (downward).  
  - \(\vec{F}_m = q(\vec{v} \times \vec{B}) = (-e)(-vB \hat{j}) = +e vB \hat{j}\) (upward).  
  - At \(v = 5 \times 10^4\): \(F_m = e \times 5 \times 10^4 \times 0.01 = 500e\) (up) balances \(F_e = 500e\) (down). ✓  
  - At \(v' = 2.5 \times 10^4\): \(F_m = e \times 2.5 \times 10^4 \times 0.01 = 250e\) (up). \(F_e = 500e\) (down). Net force = \(250e\) downward.  
- Step 5: Deflection is downward (toward -y).  

**REASONING:** The velocity selector balances electric and magnetic forces. The condition \(\vec{E} = -\vec{v} \times \vec{B}\) (for any charge) gives \(v = E/B\). When speed is lower, magnetic force (\(qvB\)) decreases while electric force (\(qE\)) stays constant. For an electron, electric force is opposite to \(\vec{E}\) (down), magnetic force is opposite to \(\vec{v} \times \vec{B}\) (which is down, so magnetic force is up). Net force is down.  

**ANSWER:** Required speed \(v = 5 \times 10^4 \, \text{m/s}\). At half speed, electron deflects **downward** (toward -y direction).

## COMPETENCY_QUESTION_1
**QUESTION:** A charged particle enters a region of uniform magnetic field with its velocity perpendicular to the field. It follows a circular path. A student argues: "The magnetic force acts as a centripetal force, so it does work on the particle to keep it moving in a circle." Is the student correct? Justify your answer using the work-energy theorem and the nature of the magnetic force.  

**COMPETENCY:** Interpreting physical situations using formulas and explaining physical reasoning.  

**STEPS:**  
- Step 1: Recall the work-energy theorem: \(W_{\text{net}} = \Delta K\).  
- Step 2: Magnetic force \(\vec{F}_m = q(\vec{v} \times \vec{B})\) is always perpendicular to \(\vec{v}\).  
- Step 3: Work done by magnetic force \(W_m = \int \vec{F}_m \cdot d\vec{s} = \int \vec{F}_m \cdot \vec{v} \, dt = 0\) because \(\vec{F}_m \perp \vec{v}\).  
- Step 4: Since \(W_m = 0\), \(\Delta K = 0\). Kinetic energy (and speed) remains constant. The magnetic force only changes the direction of velocity, not its magnitude.  

**ANSWER:** The student is **incorrect**. Magnetic force does **zero work** because it is always perpendicular to the instantaneous velocity. It provides the centripetal acceleration needed for circular motion (\(qvB = mv^2/r\)), but since it has no component along the velocity, it cannot change the kinetic energy. The speed remains constant; only the direction changes.  

**DIFFICULTY:** easy

## COMPETENCY_QUESTION_2
**QUESTION:** In a mass spectrometer, singly charged ions (charge \(+e\)) are accelerated from rest through a potential difference \(V = 2000 \, \text{V}\) and then enter a uniform magnetic field \(B = 0.2 \, \text{T}\) perpendicular to their velocity. They follow a circular path of radius \(r = 0.05 \, \text{m}\). Determine the mass of the ion. (Given: \(e = 1.6 \times 10^{-19} \, \text{C}\))  

**COMPETENCY:** Multi-step calculation combining energy conservation (electric potential energy → kinetic energy) and magnetic force as centripetal force.  

**STEPS:**  
- Step 1: Ion accelerated from rest through potential \(V\). Gain in kinetic energy = loss in potential energy: \(\frac{1}{2}mv^2 = eV\). So \(v = \sqrt{2eV/m}\).  
- Step 2: In magnetic field, magnetic force provides centripetal force: \(evB = mv^2/r \Rightarrow r = mv/(eB)\).  
- Step 3: Substitute \(v\) from step 1 into step 2: \(r = \frac{m}{eB} \sqrt{\frac{2eV}{m}} = \frac{\sqrt{2m eV}}{eB} = \frac{1}{B} \sqrt{\frac{2mV}{e}}\).  
- Step 4: Solve for \(m\): \(r^2 = \frac{2mV}{e B^2} \Rightarrow m = \frac{e B^2 r^2}{2V}\).  
- Step 5: Plug numbers: \(m = \frac{(1.6 \times 10^{-19}) \times (0.2)^2 \times (0.05)^2}{2 \times 2000} = \frac{1.6 \times 10^{-19} \times 0.04 \times 0.0025}{4000} = \frac{1.6 \times 10^{-19} \times 10^{-4}}{4000} = \frac{1.6 \times 10^{-23}}{4 \times 10^3} = 0.4 \times 10^{-26} = 4 \times 10^{-27} \, \text{kg}\).  

**ANSWER:** Mass \(m = 4 \times 10^{-27} \, \text{kg}\) (approximately 2.4 u, consistent with a helium-4 nucleus or similar).  

**DIFFICULTY:** medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The magnetic force does no work because it is always ______ to the velocity.

## DIAGNOSTIC_ANSWER_7
perpendicular

Perpendicular is the no-work clause: force at right angles to every displacement along the path contributes exactly nothing. **A wrong answer (parallel) reveals the student has allowed the field to push the particle along its motion and change its speed.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe an old cathode-ray tube (CRT) television or a laboratory cathode-ray tube demonstration: a beam of electrons travels in a straight line until a bar magnet is brought near it — the beam deflects ______ to both the magnet's field and the beam's velocity.

## DIAGNOSTIC_ANSWER_8
perpendicular

The perpendicular swerve is the observation: the beam bends sideways, the geometry's own confession of a cross product. **A wrong answer (toward) reveals the student has aimed the deflection along the field, erasing the perpendicularity the tube displays.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Observe an old cathode-ray tube (CRT) television or a laboratory cathode-ray tube ______: a beam of electrons travels in a straight line until a bar magnet is brought near it — the beam deflects perpendicular to both the magnet's field and the beam's velocity.

## DIAGNOSTIC_ANSWER_9
demonstration

The demonstration completes the CRT's title: the laboratory's tube, not the television, is the walkthrough's named instrument. **A wrong answer (a screen) reveals the student has pointed at the output while the sentence names the apparatus.**
