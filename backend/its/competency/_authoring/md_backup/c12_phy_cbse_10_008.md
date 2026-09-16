## DEFINITION
Polarization is the phenomenon of restricting the oscillations of the electric field vector of a transverse light wave to a single plane perpendicular to the direction of propagation. Malus's law states that when a plane-polarized light beam of intensity \(I_0\) passes through an analyzer (a second polaroid) whose pass-axis makes an angle \(\theta\) with the polarization direction of the incident light, the transmitted intensity \(I\) is given by \(I = I_0 \cos^2\theta\). The SI unit of intensity is watt per square metre (W/m²); angle \(\theta\) is measured in radians or degrees.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student must be able to: (1) calculate the transmitted intensity through two polaroids for any given angle between their pass-axes, including the special cases of parallel (\(\theta=0^\circ\)) and crossed (\(\theta=90^\circ\)) polaroids; (2) determine the angle required to achieve a specified fraction of transmitted intensity; (3) explain why unpolarized light incident on a single polaroid transmits exactly half the incident intensity, using the average of \(\cos^2\theta\) over all angles.

## SCOPE_BOUNDARY
This node covers: (a) the concept of plane polarization using polaroids, (b) Malus's law derivation from vector components of the electric field, (c) intensity calculations for two-polaroid systems (including crossed polaroids with a third polaroid inserted), and (d) the distinction between unpolarized and polarized light intensity reduction. It does NOT cover: polarization by reflection (Brewster's law), polarization by scattering, double refraction in crystals, or optical activity — these are separate topics in the NCERT chapter.

## WALKTHROUGH
Observe a pair of polarized sunglasses: when you rotate one lens in front of the other, the view darkens and brightens periodically. This is Malus's law in action. Begin by recalling that light is a transverse electromagnetic wave with the electric field oscillating perpendicular to the propagation direction. Unpolarized light (e.g., from a bulb) has its electric field vector randomly oriented in the transverse plane. A polaroid sheet absorbs the component parallel to its molecular chains and transmits only the perpendicular component, producing linearly polarized light. The transmitted intensity is half the incident intensity because the average of \(\cos^2\theta\) over \(0\) to \(2\pi\) is \(1/2\). When this polarized light passes through a second polaroid (analyzer), only the component of the electric field along the analyzer's pass-axis is transmitted, leading to \(I = I_0 \cos^2\theta\). Demonstrate with two polaroid sheets from a physics lab kit: hold them crossed (90°) to block nearly all light, then insert a third polaroid at 45° between them to show light reappears — a classic JEE/NEET demonstration.

## DIAGNOSTIC_QUESTION_1
State Malus's law in words and give the mathematical formula with SI units for each quantity. What is the transmitted intensity when the angle between the pass-axes is 60° if the incident polarized intensity is 10 W/m²?

## DIAGNOSTIC_ANSWER_1
Malus's law: The intensity of plane-polarized light transmitted through an analyzer is proportional to the square of the cosine of the angle between the polarization direction of the incident light and the pass-axis of the analyzer. Formula: \(I = I_0 \cos^2\theta\), where \(I_0\) = incident polarized intensity (W/m²), \(I\) = transmitted intensity (W/m²), \(\theta\) = angle between pass-axes (rad or °). For \(I_0 = 10\ \text{W/m}^2\), \(\theta = 60^\circ\): \(I = 10 \times \cos^2 60^\circ = 10 \times (0.5)^2 = 2.5\ \text{W/m}^2\). A wrong answer (e.g., using \(\cos\theta\) instead of \(\cos^2\theta\) or forgetting to square) reveals the student does not understand the vector component projection: the electric field amplitude is reduced by \(\cos\theta\), so intensity (proportional to amplitude squared) goes as \(\cos^2\theta\).

## DIAGNOSTIC_QUESTION_2
Unpolarized light of intensity \(I_{\text{inc}}\) falls on a polaroid P1. The transmitted light then passes through a second polaroid P2 whose pass-axis is at 30° to that of P1. A student claims the final intensity is \(I_{\text{inc}} \cos^2 30^\circ\). Is this correct? Explain why or why not, and give the correct expression.

## DIAGNOSTIC_ANSWER_2
The student's claim is incorrect. Unpolarized light incident on the first polaroid P1 transmits only the component along its pass-axis. Since the electric field vectors are randomly oriented, the average transmitted intensity is half the incident intensity: \(I_1 = \frac{1}{2} I_{\text{inc}}\). This light is now polarized along P1's pass-axis. When it passes through P2 at 30°, Malus's law gives \(I_2 = I_1 \cos^2 30^\circ = \frac{1}{2} I_{\text{inc}} \cos^2 30^\circ\). The student forgot the factor of 1/2 for the first polaroid. This error shows the student does not distinguish between unpolarized and polarized incident light on a polaroid.

## DIAGNOSTIC_QUESTION_3
Two polaroids P1 and P2 are crossed (pass-axes at 90°). A third polaroid P3 is inserted between them with its pass-axis at 45° to both P1 and P2. If unpolarized light of intensity 32 W/m² is incident on P1, calculate the intensity emerging from P2. Show all steps with units.

## DIAGNOSTIC_ANSWER_3
Step 1: Unpolarized light on P1 → transmitted intensity \(I_1 = \frac{1}{2} \times 32 = 16\ \text{W/m}^2\) (polarized along P1).
Step 2: P1 to P3 (angle 45°): \(I_3 = I_1 \cos^2 45^\circ = 16 \times \left(\frac{1}{\sqrt{2}}\right)^2 = 16 \times \frac{1}{2} = 8\ \text{W/m}^2\) (polarized along P3).
Step 3: P3 to P2 (angle 45°): \(I_2 = I_3 \cos^2 45^\circ = 8 \times \frac{1}{2} = 4\ \text{W/m}^2\).
Final answer: 4 W/m². A wrong answer (e.g., 0 W/m² because P1 and P2 are crossed) reveals the student does not realize that inserting a third polaroid at an intermediate angle allows transmission by rotating the polarization direction stepwise. This is a classic JEE trap.

## DIAGNOSTIC_QUESTION_4
A beam of plane-polarized light of intensity \(I_0\) is incident on a polaroid whose pass-axis makes an angle \(\theta\) with the polarization direction. The transmitted beam then passes through a second identical polaroid whose pass-axis is at an angle \(\phi\) relative to the first polaroid. Derive the expression for the final intensity in terms of \(I_0, \theta, \phi\). For what values of \(\theta\) and \(\phi\) is the final intensity maximum? Minimum?

## DIAGNOSTIC_ANSWER_4
After first polaroid: \(I_1 = I_0 \cos^2\theta\) (polarized along first polaroid's axis). After second polaroid: \(I_2 = I_1 \cos^2\phi = I_0 \cos^2\theta \cos^2\phi\). Maximum intensity occurs when \(\cos^2\theta = 1\) and \(\cos^2\phi = 1\) i.e., \(\theta = 0^\circ, 180^\circ\) and \(\phi = 0^\circ, 180^\circ\) (both polaroids parallel to incident polarization and to each other). Minimum intensity (zero) occurs when either \(\cos\theta = 0\) (\(\theta = 90^\circ\)) or \(\cos\phi = 0\) (\(\phi = 90^\circ\)), i.e., when the first polaroid is crossed with the incident polarization or the second polaroid is crossed with the first. A wrong answer that gives maximum at \(\theta = \phi = 45^\circ\) shows confusion between the angle of the first polaroid relative to the incident polarization and the angle between the two polaroids.

## DIAGNOSTIC_QUESTION_5
In an experiment, a student uses two polaroids and measures transmitted intensity at various angles. The data shows \(I = 0\) at \(\theta = 90^\circ\) and \(I = I_{\text{max}}\) at \(\theta = 0^\circ\), but at \(\theta = 30^\circ\) the measured intensity is \(0.6 I_{\text{max}}\) instead of the theoretical \(0.75 I_{\text{max}}\). Evaluate possible reasons for this discrepancy. Which reason is most likely in a typical school lab?

## DIAGNOSTIC_ANSWER_5
Possible reasons: (1) The polaroids are not ideal — they absorb some light even for the transmitted component (absorption loss). (2) The incident light is not perfectly monochromatic or perfectly collimated, causing partial depolarization. (3) The angle setting has a systematic error (e.g., the scale reads 30° but actual angle is larger). (4) The detector (photodiode/LDR) has a non-linear response. Most likely in a school lab: polaroid sheets are not perfect polarizers; they have a finite extinction ratio (typically 100:1 to 1000:1) and absorb 10–20% of the preferred polarization. This reduces the maximum transmitted intensity and also makes the minimum non-zero, flattening the \(\cos^2\theta\) curve. A student who blames only "experimental error" without specifying the physical limitation of the polaroid material shows lack of understanding of real-world polarizer imperfections.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using two polaroid sheets, a white LED torch, and a smartphone light sensor app to verify Malus's law. Describe the procedure, the data to be recorded, and how you would analyze the data to confirm the \(\cos^2\theta\) dependence. What precautions would you take to ensure the incident light is unpolarized?

## DIAGNOSTIC_ANSWER_6
Procedure: (1) Place the LED torch facing the smartphone's light sensor (or use the phone's front camera with a light meter app). (2) Hold one polaroid (P1) fixed in front of the torch. (3) Hold the second polaroid (P2) between P1 and the sensor, and rotate P2 in steps of 10° from 0° to 180°. (4) Record the sensor reading (lux) at each angle. (5) Subtract the background reading (with torch off). (6) Plot normalized intensity \(I/I_{\text{max}}\) vs \(\theta\) and compare with \(\cos^2\theta\). To ensure incident light is unpolarized: use a standard white LED torch (not a laser) and verify that rotating a single polaroid in front of the torch (without P1) gives constant intensity. If intensity varies, the torch itself emits partially polarized light; use a diffuser (tracing paper) in front of the torch. A poor answer would omit background subtraction, angle calibration, or the check for unpolarized incident light, indicating the student does not understand experimental controls.

## COMMON_MISCONCEPTION
Students often think that when unpolarized light passes through a polaroid, the transmitted intensity is \(I_0 \cos^2\theta\) where \(\theta\) is the angle of the polaroid's pass-axis relative to some fixed reference. They confuse the angle in Malus's law (which is between the polarization direction of the *incident polarized light* and the analyzer's pass-axis) with an absolute orientation angle. For unpolarized incident light, there is no preferred direction, so the transmitted intensity is always \(I_0/2\) regardless of the polaroid's orientation. Another error: in a crossed-polaroid system (P1 and P2 at 90°), inserting a third polaroid at 45° *increases* transmission; students incorrectly believe adding more polaroids always decreases intensity. This stems from not realizing that the third polaroid rotates the polarization direction, allowing a component to pass the final analyzer.

## ON_FAILURE
If the student cannot correctly apply Malus's law or distinguish unpolarized vs polarized incident light: (1) Revisit the vector nature of the electric field: draw the E-vector decomposition diagram for a polarized wave incident on an analyzer at angle \(\theta\) — show that the transmitted amplitude is \(E_0 \cos\theta\) and intensity is proportional to \(E_0^2 \cos^2\theta\). (2) Practice the "average of \(\cos^2\theta\)" calculation: \(\frac{1}{2\pi}\int_0^{2\pi} \cos^2\theta\, d\theta = 1/2\) to internalize the 1/2 factor for unpolarized light. (3) Perform the three-polaroid demonstration physically (or watch a video) to see that crossed polaroids transmit light when a third is inserted at 45°. (4) Re-solve Diagnostic Question 3 step-by-step, labeling each stage with polarization direction and intensity. (5) Review Class 11 wave optics node c11_phy_cbse_14_001 (transverse waves) and c11_phy_cbse_14_005 (superposition) to reinforce the transverse nature of light and vector addition of fields.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_10_004, c12_phy_cbse_10_005, c12_phy_cbse_10_006, c11_phy_cbse_14_001, c11_phy_cbse_14_005, c10_math_cbse_08_001, c11_math_cbse_03_003, c12_phy_cbse_10_007

## PREREQUISITE_REASONS
c12_phy_cbse_10_004: Coherent sources and interference establish the wave nature of light and superposition principle, which underlies polarization as a transverse wave phenomenon.
c12_phy_cbse_10_005: Young's double slit experiment demonstrates interference of light waves, reinforcing that light is a wave with phase and amplitude — prerequisite for understanding polarization as a directional property of the electric field vector.
c12_phy_cbse_10_006: Interference intensity distribution uses \(I = I_0 \cos^2(\phi/2)\), which is mathematically similar to Malus's law; familiarity with cosine-squared dependence helps.
c11_phy_cbse_14_001: Transverse and longitudinal waves — establishes that light is a transverse wave, a necessary condition for polarization.
c11_phy_cbse_14_005: Principle of superposition of waves — needed to understand how vector components of electric fields add.
c10_math_cbse_08_001: Trigonometric ratios (sin, cos, tan) in right triangles — essential for resolving the electric field vector into components.
c11_math_cbse_03_003: Trigonometric functions of any angle — extends cos to angles beyond 90°, needed for Malus's law over full rotation.
c12_phy_cbse_10_007: Polarization deals with transverse nature of light; diffraction demonstrates wave nature and is a prerequisite for understanding limits of optical instruments (resolving power) which connects to polarization in advanced optics.  

## FORWARD_NODE_IDS


## FORWARD_REASONS
N/A

## CROSS_SUBJECT_PREREQS
c10_math_cbse_08_001, c11_math_cbse_03_003, c11_math_cbse_03_008
## CROSS_SUBJECT_REASONS
c10_math_cbse_08_001: Trigonometric ratios provide the geometric basis for resolving the electric field vector into components parallel and perpendicular to the polaroid axis.
c11_math_cbse_03_003: Trigonometric functions of any angle allow Malus's law to be applied for arbitrary orientations (0° to 360°), not just acute angles.
c11_math_cbse_03_008: Trigonometric identities (e.g., \(\cos^2\theta = \frac{1+\cos2\theta}{2}\)) are used to derive the average intensity for unpolarized light and to analyze intensity variation in rotating-analyzer experiments.

## CHAIN_DESCRIPTION
c11_phy_cbse_14_001 -> c12_phy_cbse_10_004 -> c12_phy_cbse_10_008 -> N/A

## THIS_FORMULA
\(I = I_0 \cos^2\theta\) where \(I\) = transmitted intensity (W/m²), \(I_0\) = incident polarized intensity (W/m²), \(\theta\) = angle between polarization direction of incident light and pass-axis of analyzer (rad or °). For unpolarized light incident on a single polaroid: \(I = \frac{1}{2} I_{\text{inc}}\).

## FORMULA_VARIABLES
\(I\) = transmitted intensity (W/m²); \(I_0\) = incident polarized intensity (W/m²); \(\theta\) = angle between incident polarization direction and analyzer pass-axis (rad or °); \(I_{\text{inc}}\) = incident unpolarized intensity (W/m²).

## FORMULA_UNITS
W/m² for intensity; radian or degree for angle (cosine is dimensionless).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_08_001 | Trigonometric ratios (cosθ) are used to resolve the electric field vector into components along the polaroid axis; the square of the component gives intensity.
c11_math_cbse_03_008 | Trigonometric identity cos²θ = (1+cos2θ)/2 is used to find the average transmitted intensity for unpolarized light (integral over 0 to 2π gives 1/2).
c11_math_cbse_13_010 | Derivative of cos²θ (i.e., -sin2θ) is used in optimization problems, e.g., finding the angle for maximum transmission through three polaroids (as in Example 10.2).
## PREREQ_CONCEPT
Light is a transverse electromagnetic wave with the electric field vector oscillating perpendicular to the direction of propagation; polarization is the confinement of this oscillation to a specific plane.

## PREREQ_BEFORE
The student must be able to resolve a vector into perpendicular components using trigonometry and understand that intensity of a wave is proportional to the square of its amplitude.

## PREREQ_STUCK
If stuck, revisit vector resolution of forces (Class 11 Physics Chapter 4) and the trigonometric identity \(\cos^2\theta + \sin^2\theta = 1\) (Class 10/11 Mathematics).

## WORKED_EXAMPLE_1
PROBLEM: Unpolarized light from a 100 W bulb (assumed isotropic) is incident on a circular polaroid sheet of radius 5 cm placed 2 m away. The bulb radiates uniformly in all directions. Calculate the intensity of light transmitted through the polaroid. Then a second identical polaroid is placed behind the first with its pass-axis at 60° to the first. Find the final transmitted intensity. (Assume no absorption losses other than polarization.)

STEPS:
- Step 1: Calculate the total power incident on the first polaroid. The bulb radiates 100 W uniformly over a sphere of radius 2 m. Surface area of sphere = \(4\pi r^2 = 4\pi (2)^2 = 16\pi\ \text{m}^2\). Intensity at 2 m = \(100 / (16\pi) = 1.989\ \text{W/m}^2\). Area of polaroid = \(\pi (0.05)^2 = 0.007854\ \text{m}^2\). Power incident on polaroid = \(1.989 \times 0.007854 = 0.01562\ \text{W}\).
- Step 2: First polaroid transmits half the incident unpolarized intensity. Transmitted power = \(0.5 \times 0.01562 = 0.00781\ \text{W}\). This light is now polarized along the first polaroid's pass-axis.
- Step 3: Second polaroid at 60° to the first. Apply Malus's law: transmitted power = \(0.00781 \times \cos^2 60^\circ = 0.00781 \times 0.25 = 0.00195\ \text{W}\).
- Step 4: Convert back to intensity (optional): final intensity = power / area = \(0.00195 / 0.007854 = 0.248\ \text{W/m}^2\).
- Step 5: Verify reasonableness: final intensity is \(1/8\) of the original intensity at the polaroid (1/2 from first polaroid × 1/4 from cos²60°). The numbers are small because the bulb is far and the polaroid is small — physically plausible.

REASONING: The problem combines inverse-square law for intensity from a point source (Class 11/12) with Malus's law. The key is to track power through each stage: unpolarized light loses half its intensity at the first polaroid, then the polarized light follows Malus's law at the second. Unit consistency (W, m², W/m²) is maintained throughout.

ANSWER: Transmitted intensity after first polaroid = 0.995 W/m² (or power = 0.00781 W). Final transmitted intensity after second polaroid = 0.248 W/m² (or power = 0.00195 W).

## WORKED_EXAMPLE_2
PROBLEM: In a physics lab, a student sets up two polaroids P1 and P2 with their pass-axes crossed (90°). She then inserts a third polaroid P3 between them and rotates P3 until the transmitted intensity is maximum. If the incident unpolarized light intensity is 40 W/m², what is the maximum transmitted intensity, and at what angle(s) of P3 relative to P1 does this occur? (Assume ideal polaroids.)

STEPS:
- Step 1: Unpolarized light on P1 → intensity after P1: \(I_1 = \frac{1}{2} \times 40 = 20\ \text{W/m}^2\) (polarized along P1).
- Step 2: Let the angle between P1 and P3 be \(\theta\). Then angle between P3 and P2 is \(90^\circ - \theta\) (since P1 and P2 are crossed). Intensity after P3: \(I_3 = I_1 \cos^2\theta = 20 \cos^2\theta\). Intensity after P2: \(I_2 = I_3 \cos^2(90^\circ - \theta) = 20 \cos^2\theta \sin^2\theta\).
- Step 3: Simplify: \(I_2 = 20 \cos^2\theta \sin^2\theta = 20 (\frac{1}{2}\sin 2\theta)^2 = 20 \times \frac{1}{4} \sin^2 2\theta = 5 \sin^2 2\theta\).
- Step 4: Maximum of \(\sin^2 2\theta\) is 1, occurring when \(2\theta = 90^\circ, 270^\circ\) i.e., \(\theta = 45^\circ, 135^\circ\). So maximum transmitted intensity = \(5 \times 1 = 5\ \text{W/m}^2\).
- Step 5: Check: Without P3, crossed polaroids give zero intensity. With P3 at 45°, we get 5 W/m², which is \(1/8\) of the original unpolarized intensity (40/8 = 5). Correct.

REASONING: This is a classic three-polaroid problem (NCERT Example 10.2). The intensity varies as \(\sin^2 2\theta\), which has maxima at 45° and 135°. The factor of 1/2 from the first polaroid and the product of two \(\cos^2\) terms yields the 1/8 overall transmission at maximum.

ANSWER: Maximum transmitted intensity = 5 W/m², occurring when P3 is at 45° or 135° relative to P1.

## WORKED_EXAMPLE_3
PROBLEM: A beam of plane-polarized light of intensity 50 W/m² is incident on a polaroid P1. The transmitted light then passes through a second polaroid P2 whose pass-axis is at 30° to the polarization direction of the incident light. However, P1 and P2 are not ideal: each absorbs 10% of the light polarized along its pass-axis (i.e., transmission coefficient for the preferred polarization is 0.9). Calculate the final transmitted intensity.

STEPS:
- Step 1: Incident polarized light on P1. The component along P1's pass-axis is \(E_0 \cos\theta_1\), where \(\theta_1\) is the angle between incident polarization and P1's pass-axis. The problem says P2's pass-axis is at 30° to the incident polarization, but does not specify P1's angle. Assume P1's pass-axis is aligned with the incident polarization (\(\theta_1 = 0^\circ\)) for maximum transmission through P1. (If not aligned, we need that angle; typical exam problems assume the first polaroid is aligned with the incident polarization unless stated otherwise.) So \(\theta_1 = 0^\circ\).
- Step 2: Intensity after P1 (ideal): \(I_1 = I_0 \cos^2 0^\circ = 50 \times 1 = 50\ \text{W/m}^2\). But P1 absorbs 10% of the preferred polarization, so actual transmitted intensity = \(0.9 \times 50 = 45\ \text{W/m}^2\). This light is now polarized along P1.
- Step 3: Angle between P1 and P2: since incident polarization is along P1, and P2 is at 30° to incident polarization, the angle between P1 and P2 is also 30°. Apply Malus's law for ideal transmission: \(I_2' = 45 \cos^2 30^\circ = 45 \times (\sqrt{3}/2)^2 = 45 \times 3/4 = 33.75\ \text{W/m}^2\).
- Step 4: P2 also absorbs 10% of the light polarized along its pass-axis. So final transmitted intensity = \(0.9 \times 33.75 = 30.375\ \text{W/m}^2\).
- Step 5: Verify: If both polaroids were ideal and aligned with incident polarization (0° and 30°), final intensity = \(50 \cos^2 30^\circ = 37.5\ \text{W/m}^2\). With 10% absorption each, we get \(37.5 \times 0.9 \times 0.9 = 30.375\ \text{W/m}^2\). Matches.

REASONING: Real polaroids have two imperfections: (1) they do not transmit 100% of the preferred polarization (absorption loss), and (2) they do not completely block the perpendicular polarization (finite extinction ratio). This problem includes only absorption loss. The calculation applies Malus's law for the ideal polarization filtering, then multiplies by the transmission coefficient for each polaroid. The order of operations matters: first resolve the electric field component (cosθ), square for intensity, then apply absorption factor.

ANSWER: 30.4 W/m² (rounded to three significant figures).

## COMPETENCY_QUESTION_1
QUESTION: A photographer uses a polarizing filter on his camera lens to reduce glare from a wet road. The reflected glare is partially polarized horizontally. The filter's pass-axis is vertical. If the glare intensity is 200 W/m² (polarized horizontally) and the background scene intensity is 100 W/m² (unpolarized), what is the total intensity reaching the camera sensor through the filter? Assume the filter is ideal.

COMPETENCY: Interpreting physical situations using formulas
STEPS:
- Step 1: Identify the nature of each light component: glare is horizontally polarized; background is unpolarized.
- Step 2: The filter's pass-axis is vertical. For horizontally polarized glare, the angle between polarization direction (horizontal) and pass-axis (vertical) is 90°. By Malus's law, transmitted glare intensity = \(200 \cos^2 90^\circ = 0\).
- Step 3: For unpolarized background, transmitted intensity = half of incident = \(0.5 \times 100 = 50\ \text{W/m}^2\).
- Step 4: Total transmitted intensity = glare transmitted + background transmitted = \(0 + 50 = 50\ \text{W/m}^2\).
- Step 5: Interpret: The polarizer blocks the horizontally polarized glare completely while transmitting half the unpolarized background. This is how polarizing sunglasses work.

ANSWER: 50 W/m²
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a JEE-style experiment, three polaroids P1, P2, P3 are arranged coaxially. P1 and P2 are fixed with their pass-axes at 60° to each other. P3 is rotated between them at a constant angular speed \(\omega\). Unpolarized light of intensity \(I_0\) is incident on P1. Derive the expression for the time-dependent intensity transmitted through P3 (and then through P2) as a function of time \(t\), assuming at \(t=0\) the pass-axis of P3 is parallel to that of P1. Plot the qualitative variation of transmitted intensity vs time for one full rotation of P3.

COMPETENCY: Predicting outcomes from changing variables
STEPS:
- Step 1: Intensity after P1 (unpolarized incident): \(I_1 = I_0/2\) (polarized along P1).
- Step 2: Let angle of P3 relative to P1 be \(\theta = \omega t\). Intensity after P3: \(I_3 = I_1 \cos^2(\omega t) = \frac{I_0}{2} \cos^2(\omega t)\). This light is polarized along P3.
- Step 3: Angle between P3 and P2 is \(60^\circ - \omega t\) (since P2 is at 60° to P1). Intensity after P2: \(I_2 = I_3 \cos^2(60^\circ - \omega t) = \frac{I_0}{2} \cos^2(\omega t) \cos^2(60^\circ - \omega t)\).
- Step 4: Simplify using trigonometric identities: \(\cos^2 A \cos^2 B = \frac{1}{4}(1+\cos 2A)(1+\cos 2B)\). The intensity varies periodically with frequency \(2\omega\) (since \(\cos^2\) has period \(\pi\)). The plot will show maxima when P3 is aligned with either P1 or P2 (i.e., at \(\omega t = 0^\circ, 60^\circ, 180^\circ, 240^\circ\)) and minima when P3 is at 45° to both? Actually find maxima by derivative or inspection: product \(\cos^2\theta \cos^2(60^\circ-\theta)\) is maximum when \(\theta = 0^\circ\) or \(60^\circ\) (one of the cos² is 1, the other is cos²60°=1/4 → product = 1/4). At \(\theta = 30^\circ\), both cos² = cos²30° = 3/4 → product = 9/16 = 0.5625, which is larger than 0.25. So maximum is at 30° (midway). The variation is symmetric.
- Step 5: Qualitative plot: intensity oscillates between a minimum (when P3 is crossed with either P1 or P2? Actually when P3 is crossed with P1 (\(\theta=90^\circ\)), I3=0 so I2=0; when P3 is crossed with P2 (\(\theta=-30^\circ\) or 150°), cos²(60°-θ)=0 so I2=0) and a maximum at \(\theta=30^\circ\) (and 150°? wait periodicity). The function has period 180° in θ because cos² has period 180°. So for one full rotation of P3 (360°), there are two identical cycles.

ANSWER: \(I(t) = \frac{I_0}{2} \cos^2(\omega t) \cos^2(60^\circ - \omega t)\). The intensity varies periodically with period \(\pi/\omega\) (half the rotation period of P3), reaching maxima of \(9I_0/32\) at \(\omega t = 30^\circ, 150^\circ, 210^\circ, 330^\circ\) and zeros at \(\omega t = 90^\circ, 270^\circ\) (crossed with P1) and \(\omega t = -30^\circ, 150^\circ\)? Wait, need to be precise: zeros when \(\cos^2(\omega t)=0\) → \(\omega t = 90^\circ, 270^\circ\); and when \(\cos^2(60^\circ-\omega t)=0\) → \(60^\circ-\omega t = 90^\circ\) → \(\omega t = -30^\circ = 330^\circ\), and \(60^\circ-\omega t = 270^\circ\) → \(\omega t = -210^\circ = 150^\circ\). So zeros at 90°, 150°, 270°, 330°. Maxima at 30° and 210° (value \(9I_0/32\)) and also at 0° and 180°? At 0°: product = 1 × 1/4 = 1/4 → \(I_0/8 = 4I_0/32\), which is less than \(9I_0/32\). So primary maxima at 30° and 210°; secondary maxima at 0° and 180°. The plot shows two primary peaks and two secondary peaks per full rotation.
DIFFICULTY: hard