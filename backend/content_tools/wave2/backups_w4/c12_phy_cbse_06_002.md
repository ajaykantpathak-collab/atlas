## ELI5
A ceiling fan coasts when switched off - inertia resists the stop. Lenz's Law is induction's inertia: the induced current always opposes the change in flux that created it, pushing back on an approaching magnet and clinging to a receding one. The minus sign in Faraday's law is this principle in notation, and its authority is energy conservation: an induced current that helped the change would build a free-energy machine from nothing.

## DEFINITION
Lenz's Law states that the direction of the induced electromotive force (emf) in a closed circuit is such that the current it produces creates a magnetic field opposing the change in magnetic flux that induced it. It is a direct consequence of the law of conservation of energy and is mathematically represented by the negative sign in Faraday's Law: \(\mathcal{E} = -N \frac{d\Phi_B}{dt}\). The SI unit of induced emf is the volt (V).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to (1) determine the direction of induced current in a conducting loop for any given change in magnetic flux (increasing/decreasing, magnet approaching/receding, loop entering/leaving field) using Lenz's law, and (2) explain why the induced current direction satisfies energy conservation by identifying the mechanical work done against magnetic forces.

## SCOPE_BOUNDARY
This node covers Lenz's law as a qualitative and quantitative rule for finding the direction of induced emf/current in closed loops due to changing magnetic flux. It includes application to experiments with magnets and coils, loops moving in/out of fields, and loops changing shape/orientation. It does NOT cover quantitative calculation of induced emf magnitude (covered in Faraday's Law node), motional emf derivation via Lorentz force (next node), or self/mutual inductance calculations (later nodes).

## WALKTHROUGH
Imagine a ceiling fan rotating in your room — when you switch it off, the fan doesn't stop instantly; it keeps spinning due to inertia. Similarly, when a magnet moves toward a coil, the coil "resists" the change by creating its own magnetic field. Begin by holding a bar magnet near a solenoid connected to a galvanometer. Push the north pole toward the coil — the needle deflects one way. Pull it away — the needle deflects opposite. Now ask: "What would happen if the induced current *helped* the magnet move instead of opposing it?" This thought experiment leads directly to the energy conservation argument that is the heart of Lenz's law. Connect this to the negative sign in Faraday's law from the previous node (c12_phy_cbse_06_001) and establish that the negative sign is not just mathematical convention — it encodes a physical principle.

Takeaway first: the induced current's direction is the veto - always against the flux change - because helping it would conjure energy from nowhere. Exam moves: direction questions for approaching and receding magnets, entering and exiting loops, and energy-conservation questions arguing the opposition's necessity. Method: rerun the magnet and solenoid - north pole pushed, needle one way; pulled, needle the other; then the forbidden helpful-current fantasy dismantled. Check yourself: the opposition is to the change, not the field - an increasing flux is fought, a decreasing one propped up; misreading which is the standard direction error. Drill: determine the induced current's direction in three scenarios and justify one via energy conservation.

## DIAGNOSTIC_QUESTION_1
State Lenz's law in your own words and write the mathematical expression of Faraday's law that incorporates it. What is the SI unit of the quantity represented by the negative sign?

## DIAGNOSTIC_ANSWER_1
Lenz's law: The induced current flows in a direction such that its magnetic field opposes the change in magnetic flux that produced it. Faraday's law with Lenz's law: \(\mathcal{E} = -N \frac{d\Phi_B}{dt}\). The negative sign is dimensionless; the SI unit of induced emf \(\mathcal{E}\) is volt (V). A wrong answer (e.g., stating the induced current *aids* the flux change, or giving the unit of the negative sign as volt) reveals confusion between the *magnitude* of emf (Faraday) and its *direction* (Lenz), or a misunderstanding that the negative sign carries units.

## DIAGNOSTIC_QUESTION_2
A circular loop lies in the plane of this paper. A uniform magnetic field points perpendicularly *into* the paper and is increasing steadily with time. Using Lenz's law, determine the direction of the induced current in the loop as seen from above. Explain why the induced magnetic field must point *out of* the paper.

## DIAGNOSTIC_ANSWER_2
The induced current flows **counterclockwise** (as seen from above). Since the external field into the paper is increasing, the induced magnetic field must point out of the paper to oppose this increase. By the right-hand thumb rule, a counterclockwise current produces a field out of the paper. A wrong answer (clockwise) indicates the student thinks the induced field should *align* with the external field, violating energy conservation — they have not grasped that "oppose the change" means oppose the *increase*, not the field itself.

## DIAGNOSTIC_QUESTION_3
A rectangular loop of wire (width \(w = 0.20\ \text{m}\), length \(l = 0.40\ \text{m}\)) is pulled at constant velocity \(v = 0.10\ \text{m/s}\) out of a region of uniform magnetic field \(B = 0.50\ \text{T}\) directed into the page. The loop's plane is perpendicular to the field. At the instant when half the loop is still in the field, find (a) the magnitude of the induced emf, and (b) the direction of the induced current.

## DIAGNOSTIC_ANSWER_3
(a) The flux through the loop is \(\Phi_B = B \times A_{\text{inside}}\). As the loop exits, the area inside the field decreases at rate \(\frac{dA}{dt} = -w v\). Magnitude of induced emf: \(|\mathcal{E}| = B w v = (0.50)(0.20)(0.10) = 0.010\ \text{V} = 10\ \text{mV}\).  
(b) Flux into the page is *decreasing*. To oppose this decrease, induced current must produce a field *into* the page. By right-hand rule, this requires a **clockwise** current.  
A wrong magnitude (e.g., using total area \(wl\) instead of rate of change of area) shows confusion between flux and rate of change of flux. A wrong direction (counterclockwise) shows failure to apply "oppose the *change*" — they opposed the field direction rather than its decrease.

## DIAGNOSTIC_QUESTION_4
Two identical circular loops, Loop A and Loop B, are placed coaxially. Loop A carries a steady current \(I\) clockwise as seen from the left. Loop B is initially at rest. If Loop B is moved *toward* Loop A along the common axis, what is the direction of the induced current in Loop B as seen from the left? Justify using Lenz's law and the concept of magnetic flux.

## DIAGNOSTIC_ANSWER_4
The current in Loop A produces a magnetic field pointing *to the right* along the axis (right-hand rule for clockwise current). As Loop B approaches, the flux through Loop B *to the right* increases. To oppose this increase, the induced current in Loop B must produce a field *to the left*. By right-hand rule, this requires a **counterclockwise** current as seen from the left. A wrong answer (clockwise) indicates the student used the direction of the *source* current rather than the direction of the *flux change* — a common error when multiple loops are involved.

## DIAGNOSTIC_QUESTION_5
A student argues: "In Experiment 6.1 (NCERT), when the north pole of a magnet is pushed toward a coil, the induced current creates a north pole facing the magnet. This *attracts* the magnet, so the magnet accelerates *toward* the coil without any external work. This violates conservation of energy, so Lenz's law must be wrong." Identify the flaw in this argument and explain what actually happens.

## DIAGNOSTIC_ANSWER_5
The flaw: The student claims the induced north pole *attracts* the approaching north pole. In reality, like poles **repel**. The induced current creates a north pole facing the approaching north pole, producing a **repulsive** force. The external agent must do work against this repulsion to push the magnet; that work appears as Joule heating in the coil. If the induced pole were south (as the student implicitly assumes), it would attract, violating energy conservation. The wrong argument reveals a sign error in applying the right-hand rule or confusion about pole interaction — a critical error that would lose marks in both board and JEE/NEET.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using only a bar magnet, a copper tube (length ~50 cm, inner diameter slightly larger than the magnet), and a stopwatch to demonstrate Lenz's law qualitatively. Describe what you would observe and how it proves that the induced current opposes the cause.

## DIAGNOSTIC_ANSWER_6
Drop the magnet through the copper tube and time its fall. Compare with a non-magnetic object (e.g., a steel ball of similar mass) dropped through the same tube. Observation: The magnet falls **significantly slower** than the steel ball. Explanation: As the magnet falls, flux through each cross-section of the tube changes, inducing eddy currents. These currents create magnetic fields that oppose the magnet's motion (upward force), slowing its fall. The mechanical work done by gravity is converted to heat in the tube. A poor answer (e.g., "magnet sticks to tube" or "no difference") shows lack of understanding that Lenz's law produces a *force* opposing motion, not just a current.

## COMMON_MISCONCEPTION
Students often think Lenz's law means "induced current opposes the **magnetic field**" rather than "opposes the **change in magnetic flux**." For example, when a magnet is pulled *away* from a coil, the flux *decreases*. The induced current will create a field in the **same direction** as the magnet's field (to oppose the decrease), not opposite to it. This leads to wrong direction predictions in 50% of cases (whenever flux is decreasing). Another error: confusing the polarity of the induced emf in an *open* circuit — they apply Lenz's law to current direction but forget that emf polarity is defined as the direction a *positive* charge would move, which is the same as conventional current direction.

## ON_FAILURE
1. Revisit **c12_phy_cbse_06_001** (Faraday's Law) and practice computing \(\frac{d\Phi_B}{dt}\) with correct sign for 5 scenarios: magnet approaching, magnet receding, loop entering field, loop leaving field, loop rotating.  
2. Use the right-hand grip rule **c11_phy_cbse_03_008** (Vector Cross Product) to map current direction → magnetic field direction for a loop. Drill: "Current clockwise → field into page? Yes/No" for 10 loops.  
3. Perform the copper tube experiment (Diagnostic 6) physically or watch a video. Verbalize: "Flux increasing → induced field opposes external field. Flux decreasing → induced field aids external field."  
4. Re-attempt Diagnostic Questions 2 and 4. If direction errors persist, draw the flux change vector and the opposing induced field vector before applying right-hand rule.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_06_001, c10_phy_cbse_02_008, c10_phy_cbse_02_005, c11_phy_cbse_05_009, c11_phy_cbse_03_008, c11_math_cbse_13_006
## PREREQUISITE_REASONS
c12_phy_cbse_06_001: Provides Faraday's law (\(\mathcal{E} = -N d\Phi_B/dt\)) and magnetic flux definition — the mathematical foundation Lenz's law modifies with the negative sign.  
c10_phy_cbse_02_008: Class 10 introduction to electromagnetic induction and Faraday's experiments — builds qualitative familiarity.  
c10_phy_cbse_02_005: Force on current-carrying conductor in magnetic field — needed to understand the mechanical opposition (repulsion/attraction) that proves energy conservation.  
c11_phy_cbse_05_009: Conservation of mechanical energy — the fundamental principle from which Lenz's law derives; without it, the negative sign has no physical basis.  
c11_phy_cbse_03_008: Vector cross product — essential for relating current direction (via \(I \vec{dl}\)) to magnetic field direction (Biot-Savart) and force direction (Lorentz).  
c11_math_cbse_13_006: Derivatives (intuitive idea) — required to understand \(d\Phi_B/dt\) as rate of change of flux, not just flux difference.

## FORWARD_NODE_IDS
c12_phy_cbse_06_003, c12_phy_cbse_06_004, c12_phy_cbse_06_005, c12_phy_cbse_06_006, c12_phy_cbse_06_007
## FORWARD_REASONS
c12_phy_cbse_06_003: Motional emf derivation uses Lenz's law to determine polarity of emf across moving rod; the Lorentz force explanation also relies on opposition to motion.  
c12_phy_cbse_06_004: Self/mutual inductance defines induced emf as \(-L dI/dt\) or \(-M dI/dt\); the negative sign is Lenz's law applied to changing current.  
c12_phy_cbse_06_005: AC generator operation — the alternating emf polarity follows Lenz's law as flux changes sinusoidally; slip-ring output sign depends on it.  
c12_phy_cbse_06_006: Energy stored in inductor (\(U = \frac{1}{2}LI^2\)) comes from work done against back emf, which exists because of Lenz's law.  
c12_phy_cbse_06_007: Eddy currents are circulating currents induced by changing flux; their direction (and thus heating/braking force) is determined by Lenz's law.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_phy_cbse_03_008
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: The derivative \(d\Phi_B/dt\) is the mathematical core of Faraday-Lenz law; understanding rate of change vs. instantaneous value is crucial for both magnitude and sign.  
c11_phy_cbse_03_008: The cross product \(\vec{F} = q\vec{v} \times \vec{B}\) (Lorentz force) and \(\vec{\tau} = \vec{\mu} \times \vec{B}\) (torque on dipole) both use right-hand rule conventions that must align with Lenz's law's directional predictions.

## CHAIN_DESCRIPTION
c12_phy_cbse_06_001 → c12_phy_cbse_06_002 → c12_phy_cbse_06_003

## THIS_FORMULA
\(\mathcal{E} = -N \frac{d\Phi_B}{dt}\) (SI unit: volt, V)

## FORMULA_VARIABLES
\(\mathcal{E}\) = induced emf (V), \(N\) = number of turns (dimensionless), \(\Phi_B\) = magnetic flux through one turn (Wb = T·m²), \(t\) = time (s). The negative sign indicates opposition to flux change (Lenz's law).

## FORMULA_UNITS
V, Wb, T·m², s

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c11_math_cbse_13_006 | Derivative \(d\Phi_B/dt\) represents instantaneous rate of change of flux; the sign of the derivative determines the sign of induced emf per Lenz's law.  
c11_phy_cbse_03_008 | Cross product in Lorentz force \(\vec{F}=q\vec{v}\times\vec{B}\) gives direction of magnetic force on charges; Lenz's law predicts the same direction for induced current that produces opposing force.  
c11_phy_cbse_05_009 | Conservation of mechanical energy: work done against magnetic repulsion/attraction equals Joule heat; Lenz's law is the electromagnetic manifestation of this principle.
## PREREQ_CONCEPT
Magnetic flux (\(\Phi_B = \vec{B} \cdot \vec{A}\)) and its rate of change (\(d\Phi_B/dt\)) from Faraday's law, plus the right-hand rule for current-loop magnetic field direction.

## PREREQ_BEFORE
Student must be able to calculate magnetic flux for a loop in a uniform field (including angle dependence) and state Faraday's law with the negative sign.

## PREREQ_STUCK
If flux calculation or sign of \(d\Phi_B/dt\) is unclear, review c12_phy_cbse_06_001 (Faraday's Law) worked examples 6.2 and 6.3 from NCERT.

## WORKED_EXAMPLE_1
PROBLEM: A square loop of side 12 cm and resistance 2.0 Ω lies in the plane of the page. A uniform magnetic field of 0.80 T points into the page. The loop is pulled to the right at a constant speed of 0.050 m/s until it completely leaves the field region. The field region has a sharp boundary. (a) What is the induced emf while the loop is exiting? (b) What is the induced current magnitude and direction? (c) What magnetic force acts on the loop during exit? (d) What external force is needed to pull the loop at constant speed?

STEPS:
- Step 1: Identify given quantities: side \(a = 0.12\ \text{m}\), \(R = 2.0\ \Omega\), \(B = 0.80\ \text{T}\) (into page), \(v = 0.050\ \text{m/s}\) (to the right). The loop exits the field region — area inside field decreases.
- Step 2: Flux through loop: \(\Phi_B = B \cdot A_{\text{inside}} = B \cdot (a \cdot x)\) where \(x\) is length still inside field. Rate of change: \(d\Phi_B/dt = B a (dx/dt)\). Since \(x\) decreases, \(dx/dt = -v\). So \(d\Phi_B/dt = -B a v\).
- Step 3: Induced emf magnitude: \(|\mathcal{E}| = | -N d\Phi_B/dt | = B a v\) (N=1). Substitute: \((0.80\ \text{T})(0.12\ \text{m})(0.050\ \text{m/s}) = 0.0048\ \text{V} = 4.8\ \text{mV}\).
- Step 4: Direction: Flux into page is decreasing. Induced current must produce field into page → clockwise current (right-hand rule). Current \(I = \mathcal{E}/R = 0.0048/2.0 = 0.0024\ \text{A} = 2.4\ \text{mA}\) clockwise.
- Step 5: Magnetic force on left side of loop (current downward, field into page): \(\vec{F} = I \vec{L} \times \vec{B}\). \(\vec{L}\) downward, \(\vec{B}\) into page → force to the left (opposing motion). Magnitude: \(F = I a B = (0.0024)(0.12)(0.80) = 2.3 \times 10^{-4}\ \text{N}\) leftward.
- Step 6: To maintain constant velocity, external force must balance magnetic force: \(F_{\text{ext}} = 2.3 \times 10^{-4}\ \text{N}\) to the right. Power supplied: \(P = F_{\text{ext}} v = (2.3\times10^{-4})(0.050) = 1.15\times10^{-5}\ \text{W}\). Joule heating: \(I^2 R = (0.0024)^2(2.0) = 1.15\times10^{-5}\ \text{W}\). Energy conserved.

REASONING: The loop loses flux as it exits; Lenz's law demands induced current to oppose this loss by creating its own field into the page. The magnetic force on the current-carrying left segment opposes the motion (repulsion from the field boundary), so external work is required. That work exactly equals the energy dissipated as heat in the resistor — a perfect illustration of Lenz's law as energy conservation.

ANSWER: (a) 4.8 mV, (b) 2.4 mA clockwise, (c) \(2.3 \times 10^{-4}\ \text{N}\) leftward, (d) \(2.3 \times 10^{-4}\ \text{N}\) rightward.

## WORKED_EXAMPLE_2
PROBLEM: A circular coil of 200 turns and radius 5.0 cm is placed with its plane perpendicular to a uniform magnetic field of 0.30 T. The field is reduced to zero uniformly in 0.40 s. (a) Find the magnitude of the average induced emf. (b) If the coil is viewed from the side where the field points toward the observer, what is the direction of the induced current? (c) How much charge flows through the coil if its resistance is 4.0 Ω?

STEPS:
- Step 1: Given: \(N = 200\), \(r = 0.050\ \text{m}\), \(B_i = 0.30\ \text{T}\), \(B_f = 0\), \(\Delta t = 0.40\ \text{s}\), \(R = 4.0\ \Omega\). Area \(A = \pi r^2 = \pi (0.050)^2 = 7.85 \times 10^{-3}\ \text{m}^2\). Field perpendicular → \(\cos\theta = 1\).
- Step 2: Initial flux per turn: \(\Phi_i = B_i A = (0.30)(7.85\times10^{-3}) = 2.36 \times 10^{-3}\ \text{Wb}\). Final flux \(\Phi_f = 0\). Change in flux per turn: \(\Delta\Phi = -2.36 \times 10^{-3}\ \text{Wb}\).
- Step 3: Average induced emf magnitude: \(|\mathcal{E}_{\text{avg}}| = N |\Delta\Phi|/\Delta t = 200 \times (2.36\times10^{-3}) / 0.40 = 1.18\ \text{V}\).
- Step 4: Direction: Field toward observer is decreasing. Induced current must produce field toward observer to oppose decrease. Right-hand rule: thumb toward observer → fingers curl **counterclockwise** as seen by observer.
- Step 5: Average current: \(I_{\text{avg}} = \mathcal{E}_{\text{avg}}/R = 1.18 / 4.0 = 0.295\ \text{A}\). Charge: \(Q = I_{\text{avg}} \Delta t = 0.295 \times 0.40 = 0.118\ \text{C}\). Alternatively, \(Q = N |\Delta\Phi| / R = 200 \times 2.36\times10^{-3} / 4.0 = 0.118\ \text{C}\) (independent of time!).
- Step 6: Check units: \(N\Phi/R\) → turns·Wb/Ω = (V·s)/Ω = A·s = C. Correct.

REASONING: The decreasing flux induces an emf that drives current to create a field in the same direction as the original field (opposing the decrease). The charge flow depends only on flux change and resistance, not on how fast the change occurs — a key insight for ballistic galvanometer applications.

ANSWER: (a) 1.18 V, (b) counterclockwise as seen by observer, (c) 0.118 C.

## WORKED_EXAMPLE_3
PROBLEM: Two concentric circular loops lie in the same plane. The outer loop (radius \(R = 0.20\ \text{m}\)) carries a current \(I(t) = I_0 \sin(\omega t)\) with \(I_0 = 5.0\ \text{A}\), \(\omega = 100\pi\ \text{rad/s}\). The inner loop (radius \(r = 0.020\ \text{m}\), resistance \(0.50\ \Omega\)) is connected to a galvanometer. Find (a) the mutual inductance \(M\) of the system (approximate, assuming uniform field from outer loop over inner loop area), (b) the induced emf in the inner loop as a function of time, (c) the maximum induced current, and (d) the direction of induced current at \(t = 0\) when \(I\) is increasing from zero.

STEPS:
- Step 1: Outer loop field at center: \(B = \mu_0 I / (2R)\). Since \(r \ll R\), field is approximately uniform over inner loop area. Flux through inner loop: \(\Phi_2 = B \cdot \pi r^2 = \frac{\mu_0 I}{2R} \pi r^2\).
- Step 2: Mutual inductance: \(M = \Phi_2 / I = \frac{\mu_0 \pi r^2}{2R}\). Substitute: \(\mu_0 = 4\pi \times 10^{-7}\ \text{T·m/A}\), \(r = 0.020\ \text{m}\), \(R = 0.20\ \text{m}\). \(M = \frac{(4\pi\times10^{-7}) \pi (0.020)^2}{2(0.20)} = \frac{4\pi^2 \times 10^{-7} \times 4\times10^{-4}}{0.40} = 3.95 \times 10^{-9}\ \text{H} \approx 4.0\ \text{nH}\).
- Step 3: Induced emf in inner loop: \(\mathcal{E}_2 = -M \frac{dI}{dt}\). \(I(t) = I_0 \sin(\omega t)\) → \(dI/dt = I_0 \omega \cos(\omega t)\). \(\mathcal{E}_2(t) = -M I_0 \omega \cos(\omega t)\). Magnitude: \(M I_0 \omega = (4.0\times10^{-9})(5.0)(100\pi) = 6.28 \times 10^{-6}\ \text{V} = 6.3\ \mu\text{V}\).
- Step 4: Maximum induced current: \(I_{2,\text{max}} = \mathcal{E}_{2,\text{max}} / R = 6.28\times10^{-6} / 0.50 = 1.26 \times 10^{-5}\ \text{A} = 12.6\ \mu\text{A}\).
- Step 5: Direction at \(t=0\): \(I(0)=0\), \(dI/dt = I_0 \omega > 0\) (increasing). Outer loop current is, say, counterclockwise (producing field upward). Increasing upward flux through inner loop. Lenz's law: induced current must produce downward flux → **clockwise** as seen from above.
- Step 6: Verify energy: Power dissipated in inner loop = \(I_2^2 R\). Energy comes from work done by source driving outer loop against back emf. Consistent.

REASONING: This combines mutual inductance (next node) with Lenz's law. The small inner loop samples the changing flux from the outer loop. The negative sign in \(\mathcal{E}_2 = -M dI/dt\) is Lenz's law: when outer current increases, induced current opposes the flux increase. At \(t=0\), outer current is zero but increasing; the induced current direction is determined solely by the *rate of change*, not the instantaneous current.

ANSWER: (a) \(4.0\ \text{nH}\), (b) \(\mathcal{E}_2(t) = -6.3\cos(100\pi t)\ \mu\text{V}\), (c) \(12.6\ \mu\text{A}\), (d) clockwise (as seen from above).

## COMPETENCY_QUESTION_1
QUESTION: A metallic rod of length \(L = 1.0\ \text{m}\) rotates about one end in a plane perpendicular to a uniform magnetic field \(B = 0.50\ \text{T}\). The rod completes 30 revolutions per second. (a) Using Lenz's law, determine which end of the rod is at higher potential. (b) Derive the expression for the emf between the ends using the rate of change of area swept by the rod. (c) If the rod is replaced by a copper spoke of a bicycle wheel (same length, same rotation), why is the emf between axle and rim the same regardless of the number of spokes?

COMPETENCY: Interpreting physical situations using formulas and predicting outcomes from changing variables

STEPS:
- Step 1: Visualize rotation. Rod sweeps a circular area. Free electrons in rod experience magnetic force \(q\vec{v} \times \vec{B}\). Direction of \(\vec{v} \times \vec{B}\) gives electron accumulation → polarity.
- Step 2: Area swept per revolution = \(\pi L^2\). Rate of change of area = \(\pi L^2 f\). Flux change rate = \(B \pi L^2 f\). Emf = \(B \pi L^2 f\). (Alternatively, integrate \(B v dr\) from 0 to L: \(v = \omega r\), \(\omega = 2\pi f\), \(\int_0^L B \omega r dr = \frac{1}{2} B \omega L^2 = B \pi f L^2\).)
- Step 3: For (a): Assume rotation is counterclockwise as seen from above, B upward. At a point on rod, \(\vec{v}\) tangential. \(\vec{v} \times \vec{B}\) points radially outward (for positive charge). So outer end becomes positive, inner end negative. Higher potential at outer end.
- Step 4: For (c): Each spoke acts as a separate rod rotating in the same field. The emf between axle and rim is the same for each spoke because they all sweep the same area per unit time. Spokes are electrically in parallel (connected at axle and rim), so the total emf is the same as for one spoke. Number of spokes only increases total current capacity, not emf.

ANSWER: (a) Outer end (rim) at higher potential. (b) \(\mathcal{E} = B \pi L^2 f = \frac{1}{2} B \omega L^2\). (c) All spokes are in parallel between the same two equipotentials (axle and rim); each generates the same emf, so the parallel combination has the same emf.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A rectangular loop of wire (dimensions \(a \times b\), resistance \(R\)) falls from rest under gravity through a uniform horizontal magnetic field \(B\) directed perpendicular to the plane of the loop. The loop is oriented vertically, with its longer side \(a\) horizontal. The top edge of the loop enters the field region first. (a) Describe qualitatively the motion of the loop as it enters, passes through, and exits the field. (b) Derive the terminal velocity \(v_t\) reached while the loop is fully immersed in the field (if the field region is tall enough). (c) Sketch the induced current vs. time graph from the moment the top edge enters until the bottom edge leaves. Label key points.

COMPETENCY: Multi-step analytical reasoning combining mechanics, electromagnetism, and energy conservation

STEPS:
- Step 1: As loop enters, flux into page (say) increases → induced current counterclockwise (opposes increase). Current in top horizontal segment: left to right. Magnetic force on this segment: \(I a B\) upward (opposes gravity). Loop accelerates slower than \(g\).
- Step 2: When fully immersed, flux constant → no induced current → free fall at \(g\) (if field region tall enough). But wait: if loop is fully in uniform field, flux is constant → no emf → no current → no magnetic force. So it falls with \(g\). Terminal velocity only occurs *during entry/exit* when flux changes.
- Step 3: Correction: Terminal velocity is reached *while entering* (or exiting) when magnetic force balances weight. For entry: flux change rate = \(B a v\) (area entering per second). Emf = \(B a v\). Current \(I = B a v / R\) (counterclockwise). Magnetic force on top segment (length \(a\), current horizontal): \(F_B = I a B = (B^2 a^2 v)/R\) upward. At terminal velocity: \(F_B = mg\) → \(v_t = mgR / (B^2 a^2)\).
- Step 4: During exit, flux decreases → induced current clockwise. Current in bottom segment: right to left. Force on bottom segment: upward. Again opposes gravity. Terminal velocity same magnitude.
- Step 5: Graph: Current = 0 before entry. During entry (time \(t_1 = b/v\)): current constant = \(B a v_t / R\) counterclockwise (positive). During full immersion: current = 0. During exit (time \(t_1\)): current constant = same magnitude but clockwise (negative). After exit: 0. Graph is a rectangular pulse positive, zero, negative pulse.

ANSWER: (a) Loop enters with acceleration < g, reaches terminal velocity \(v_t = mgR/(B^2 a^2)\) while entering; falls freely at \(g\) when fully immersed; decelerates to same \(v_t\) while exiting. (b) \(v_t = \frac{mgR}{B^2 a^2}\). (c) Graph: Zero → positive constant (entry) → zero (immersed) → negative constant (exit) → zero. Current magnitude during entry/exit: \(I = \frac{B a v_t}{R} = \frac{mg}{B a}\).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Lenz's Law states that the direction of the induced ______ force (emf) in a closed circuit is such that the current it produces creates a magnetic field opposing the change in magnetic flux that induced it.

## DIAGNOSTIC_ANSWER_7
electromotive

The electromotive force completes the term: Lenz's law speaks about the induced emf's direction, not its size. **A wrong answer (a magnetic) reveals the student has swapped the induced emf for the field it creates mid-sentence.** The electromotive force completes the term: Lenz legislates the induced emf's direction, never its magnitude.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a ceiling fan ______ in your room — when you switch it off, the fan doesn't stop instantly; it keeps spinning due to inertia.

## DIAGNOSTIC_ANSWER_8
rotating

The rotating verb is the inertia's setup: the fan's coasting primes the intuition that induction, too, resists change. **A wrong answer (a stopping verb) reveals the student has begun with the fan already still, where the coasting is the analogy's engine.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student must be able to (1) determine the direction of induced current in a conducting loop for any given change in magnetic flux (increasing/decreasing, magnet approaching/receding, loop entering/leaving field) using Lenz's law, and (2) explain why the induced current direction satisfies energy conservation by identifying the.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine a ceiling fan rotating in your room — when you switch it off, the fan doesn't stop ______; it keeps spinning due to inertia.

## DIAGNOSTIC_ANSWER_10
instantly

The instantly adverb is the inertia's measure: the fan's slow spin-down is the everyday proof that change meets resistance. **A wrong answer (an eventually) reveals the student has weakened the analogy's clock to a triviality.** The instantly adverb is the inertia's clock: the fan's lazy spin-down is resistance-to-change made visible.
