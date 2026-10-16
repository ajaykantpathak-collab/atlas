## ELI5
Prescription glasses often cement two prescriptions into one blank: lenses in contact behave as one lens whose reciprocals add. Effective focal length F comes from one over F equals the sum of one over each f; equivalently, powers add in dioptres - a plus lens and a minus lens can cancel or reinforce - and total magnification is the product of the individual magnifications. The optometrist's arithmetic is this single line.

## DEFINITION
The combination of thin lenses in contact refers to an optical system where two or more thin lenses are placed coaxially with their optical centres coincident (or so close that the separation is negligible compared to focal lengths). The combination behaves as a single equivalent lens whose focal length \(F\) is given by \(\frac{1}{F} = \frac{1}{f_1} + \frac{1}{f_2} + \frac{1}{f_3} + \dots\), and whose power \(P\) (in dioptres, D) is the algebraic sum of individual powers: \(P = P_1 + P_2 + P_3 + \dots\). The total linear magnification is the product of individual magnifications: \(m = m_1 m_2 m_3 \dots\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can calculate the effective focal length, power, and net magnification of a combination of 2–3 thin lenses in contact given individual focal lengths (with correct sign convention), and can determine whether the combination is converging or diverging. The student can also solve for an unknown focal length in a combination when the effective focal length is specified.

## SCOPE_BOUNDARY
This node covers only thin lenses in contact (zero separation). It does NOT cover separated lenses (which require the principal plane method or matrix optics), thick lenses, or lens aberrations. It assumes the paraxial approximation and Cartesian sign convention throughout. Applications to optical instruments (microscopes, telescopes) are covered in subsequent nodes.

## WALKTHROUGH
Observe a spectacle lens: many prescription glasses are actually two thin lenses cemented together (e.g., a convex lens for hypermetropia combined with a cylindrical lens for astigmatism). Start by recalling the thin lens formula \(1/v - 1/u = 1/f\) from node c12_phy_cbse_09_006. Place two lenses A and B in contact; let the first lens form an intermediate image \(I_1\) which acts as a virtual object for the second lens. Write the lens equation for each lens, add them, and use the fact that for thin lenses in contact the object distance for the second lens equals the image distance from the first (with sign change). This yields the combined focal length formula. Emphasise that powers add algebraically — a convex lens (+P) and concave lens (–P) can cancel or reinforce. End with the key formula \(P = P_1 + P_2\) and its use in optometry.

Takeaway first: powers add because each lens's output is the next's input - the thin-in-contact approximation stacks the two lens equations into one sum. Exam moves: effective-focal-length questions, power-addition questions including cancelling pairs, magnification-product questions, and convergence-verdict questions from the net sign. Method: rerun the spectacles - hypermetropia's convex plus an astigmatic cylinder, the summed prescription read straight off. Check yourself: signs travel with the powers - a diverging lens's negative dioptres subtract, and the combination's verdict depends on which wins. Drill: combine two lenses' powers, compute F, and state whether the pair converges.

## DIAGNOSTIC_QUESTION_1
State the formula for the effective focal length \(F\) of three thin lenses of focal lengths \(f_1, f_2, f_3\) placed in contact. What is the SI unit of the power of this combination?

## DIAGNOSTIC_ANSWER_1
\(\frac{1}{F} = \frac{1}{f_1} + \frac{1}{f_2} + \frac{1}{f_3}\); the SI unit of power is dioptre (D), where \(1\,\text{D} = 1\,\text{m}^{-1}\). A wrong answer (e.g., \(F = f_1 + f_2 + f_3\) or unit = watt) reveals confusion between adding focal lengths vs. adding reciprocals, or mixing up power of a lens with electrical power.

## DIAGNOSTIC_QUESTION_2
A convex lens of power +4.0 D and a concave lens of power –2.5 D are placed in contact. A student claims the combination is diverging because "one lens is concave". Explain why this reasoning is incorrect and state the nature of the combination.

## DIAGNOSTIC_ANSWER_2
The net power is \(P = +4.0 + (-2.5) = +1.5\,\text{D}\), which is positive, so the combination is converging. The student's error is assuming the nature is determined by the presence of a concave lens rather than by the algebraic sum of powers. This reveals a misunderstanding that powers add with signs, not that "concave always dominates".

## DIAGNOSTIC_QUESTION_3
Two thin lenses of focal lengths +20 cm and –30 cm are placed in contact. An object is placed 40 cm from the combination. Find the position and nature of the final image. (Use Cartesian sign convention: \(u = -40\,\text{cm}\).)

## DIAGNOSTIC_ANSWER_3
\(f_1 = +20\,\text{cm}, f_2 = -30\,\text{cm}\). \(\frac{1}{F} = \frac{1}{20} + \frac{1}{-30} = \frac{3-2}{60} = \frac{1}{60}\) ⇒ \(F = +60\,\text{cm}\). Lens formula: \(\frac{1}{v} - \frac{1}{u} = \frac{1}{F}\) ⇒ \(\frac{1}{v} = \frac{1}{60} + \frac{1}{-40} = \frac{2-3}{120} = -\frac{1}{120}\) ⇒ \(v = -120\,\text{cm}\). Image is virtual, erect, on same side as object. A wrong sign in \(u\) or \(F\) leads to a real image at +120 cm — a common sign-convention error.

## DIAGNOSTIC_QUESTION_4
Two combinations are made: (A) a convex lens of focal length 10 cm and a concave lens of focal length 20 cm; (B) two convex lenses each of focal length 20 cm. Compare the effective focal lengths and powers. Which combination has greater converging ability?

## DIAGNOSTIC_ANSWER_4
(A) \(1/F_A = 1/10 + 1/(-20) = 1/20\) ⇒ \(F_A = +20\,\text{cm}, P_A = +5\,\text{D}\). (B) \(1/F_B = 1/20 + 1/20 = 1/10\) ⇒ \(F_B = +10\,\text{cm}, P_B = +10\,\text{D}\). Combination B has greater converging ability (shorter focal length, higher power). A student who says A is stronger because it has a "stronger convex lens" ignores the cancelling effect of the concave lens.

## DIAGNOSTIC_QUESTION_5
A student solves a problem: "Two lenses of powers +3 D and –1 D are in contact. Find the focal length of the combination." Their working: \(P = 3 + 1 = 4\,\text{D}, F = 1/4 = 0.25\,\text{m}\). Identify the error and give the correct answer.

## DIAGNOSTIC_ANSWER_5
The student added the magnitudes instead of the signed powers. Correct: \(P = +3 + (-1) = +2\,\text{D}\), so \(F = 1/2 = 0.5\,\text{m} = 50\,\text{cm}\). The error reveals a failure to treat concave lens power as negative — a sign-convention slip that costs marks in both board and JEE/NEET.

## DIAGNOSTIC_QUESTION_6
Design a combination of two thin lenses in contact that has an effective power of +2.5 D. One lens must be concave. Specify the focal lengths (in cm) of both lenses. (Multiple answers possible; give one valid pair.)

## DIAGNOSTIC_ANSWER_6
Let convex lens power \(P_1 = +5\,\text{D}\) (\(f_1 = +20\,\text{cm}\)), concave lens power \(P_2 = -2.5\,\text{D}\) (\(f_2 = -40\,\text{cm}\)). Then \(P = +5 - 2.5 = +2.5\,\text{D}\). Any pair with \(P_1 + P_2 = +2.5\) and \(P_2 < 0\) works. A poor answer gives both focal lengths positive or ignores the concave requirement, showing inability to work backwards from net power.

## COMMON_MISCONCEPTION
Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm) are combined, the combination "does nothing" or "behaves like a plane glass plate". They forget that the powers cancel exactly (\(P = 0\)), making the effective focal length infinite — the combination indeed behaves like a plane glass plate (no net convergence/divergence), but the individual lenses still refract light; the emergent ray is parallel to the incident ray but laterally displaced. The error is confusing "no net power" with "no refraction at all". In JEE/NEET, this appears in questions about lateral shift in a lens combination of zero power.

## ON_FAILURE
If the student cannot apply the power-addition formula correctly: (1) Revisit node c12_phy_cbse_09_006 to practice sign convention for single lens formula with 5 numerical problems. (2) Review node c10_phy_cbse_04_011 (Class 10 Power of a Lens) for the definition \(P = 1/f\) and the sign rule: converging = +ve, diverging = –ve. (3) Do a quick physical check: hold a convex and concave lens together from a spectacle kit, look at a distant object — if the combination power is near zero, the image should be at infinity (no magnification). (4) Re-attempt Diagnostic Questions 2 and 5 with explicit sign annotation.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_09_006, c12_phy_cbse_09_005, c10_phy_cbse_04_011, c12_phy_cbse_09_002

## PREREQUISITE_REASONS
c12_phy_cbse_09_006: Thin lens formula \(1/v - 1/u = 1/f\) and sign convention are the foundation for deriving the combination formula.
c12_phy_cbse_09_005: Lens maker's formula gives the physical origin of focal length and power; needed to understand why powers add.
c10_phy_cbse_04_011: Class 10 definition of power (dioptre) and its sign convention for converging/diverging lenses.
c12_phy_cbse_09_002: Combination of thin lenses uses the concept of effective focal length and image from first lens becoming object for second — same principle as mirror combinations.  

## FORWARD_NODE_IDS
c12_phy_cbse_09_009, c12_phy_cbse_09_010, c12_phy_cbse_09_011
## FORWARD_REASONS
c12_phy_cbse_09_009: Simple microscope uses a single convex lens, but its magnifying power formula \(m = 1 + D/f\) relies on the lens power concept from this node.
c12_phy_cbse_09_010: Compound microscope combines objective and eyepiece lenses; the total magnification is the product of individual magnifications (Eq. 9.33), directly extending this node.
c12_phy_cbse_09_011: Astronomical telescope uses objective + eyepiece in contact (normal adjustment); its magnifying power \(m = f_o/f_e\) is derived using the combination principle.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_02_010, c11_math_cbse_13_009
## CROSS_SUBJECT_REASONS
c11_math_cbse_02_010: Algebra of real functions (sum of functions) mirrors the algebraic addition of lens powers \(P = P_1 + P_2\).
c11_math_cbse_13_009: Algebra of derivatives (sum rule) parallels the additive nature of optical power — a conceptual bridge for calculus-minded students.

## CHAIN_DESCRIPTION
c12_phy_cbse_09_006 -> c12_phy_cbse_09_007 -> c12_phy_cbse_09_010

## THIS_FORMULA
\(\frac{1}{F} = \frac{1}{f_1} + \frac{1}{f_2} + \frac{1}{f_3} + \dots\) (effective focal length in metres); \(P = P_1 + P_2 + P_3 + \dots\) (power in dioptres, D); \(m = m_1 m_2 m_3 \dots\) (total linear magnification, dimensionless).

## FORMULA_VARIABLES
\(F\) = effective focal length of combination (m); \(f_1, f_2, f_3, \dots\) = focal lengths of individual lenses (m), positive for convex, negative for concave; \(P\) = net power of combination (D); \(P_1, P_2, \dots\) = individual powers (D); \(m\) = net linear magnification; \(m_1, m_2, \dots\) = individual magnifications.

## FORMULA_UNITS
metre (m) for focal lengths; dioptre (D = m⁻¹) for power; magnification is dimensionless.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_02_010 | The sum of lens powers \(P = P_1 + P_2\) is an algebraic sum of functions, identical to \((f+g)(x) = f(x) + g(x)\) in function algebra.
c11_math_cbse_13_009 | The sum rule for derivatives \((f+g)' = f' + g'\) structurally resembles the additive combination of optical powers — both express linearity of the underlying operation.
## PREREQ_CONCEPT
Thin lens formula with Cartesian sign convention and the concept of lens power as reciprocal of focal length.

## PREREQ_BEFORE
The student must be able to apply \(1/v - 1/u = 1/f\) for a single lens with correct signs for \(u, v, f\), and convert between focal length (cm/m) and power (D).

## PREREQ_STUCK
If stuck, review the sign convention table in c12_phy_cbse_09_006 and solve 5 single-lens problems with mixed convex/concave lenses.

## WORKED_EXAMPLE_1
PROBLEM: A convex lens of focal length 25 cm is placed in contact with a concave lens of focal length 50 cm. Find the effective focal length and power of the combination. Is the combination converging or diverging?

STEPS:
- Step 1: Identify given quantities with signs and units. \(f_1 = +25\,\text{cm} = +0.25\,\text{m}\) (convex), \(f_2 = -50\,\text{cm} = -0.50\,\text{m}\) (concave). To find: \(F\) (in m and cm) and \(P\) (in D).
- Step 2: Write the combination formula for focal length: \(\frac{1}{F} = \frac{1}{f_1} + \frac{1}{f_2}\). Convert all focal lengths to metres for power in dioptres.
- Step 3: Substitute values: \(\frac{1}{F} = \frac{1}{0.25} + \frac{1}{-0.50} = 4 - 2 = 2\,\text{m}^{-1}\).
- Step 4: Compute \(F = \frac{1}{2} = 0.50\,\text{m} = 50\,\text{cm}\). Power \(P = \frac{1}{F} = 2\,\text{D}\) (or directly \(P = 1/0.25 + 1/(-0.50) = 4 - 2 = 2\,\text{D}\)).
- Step 5: Since \(P = +2\,\text{D} > 0\), the combination is converging. Verify: the convex lens is stronger (shorter focal length) than the concave lens, so net convergence is expected.

REASONING: The algebraic addition of powers automatically accounts for the opposing effects of converging and diverging lenses. Using metres ensures power comes out directly in dioptres. The positive net power confirms converging behaviour.

ANSWER: Effective focal length \(F = +50\,\text{cm}\) (or +0.50 m), Power \(P = +2.0\,\text{D}\). The combination is converging.

## WORKED_EXAMPLE_2
PROBLEM: Three thin lenses of powers +3.0 D, –1.5 D, and +2.0 D are placed in contact. An object of height 2.0 cm is placed 30 cm from the combination. Find the position, nature, and size of the final image.

STEPS:
- Step 1: Given: \(P_1 = +3.0\,\text{D}, P_2 = -1.5\,\text{D}, P_3 = +2.0\,\text{D}\); object height \(h = +2.0\,\text{cm}\); object distance \(u = -30\,\text{cm} = -0.30\,\text{m}\). To find: \(v\), image nature, image height \(h'\).
- Step 2: Net power \(P = P_1 + P_2 + P_3 = 3.0 - 1.5 + 2.0 = +3.5\,\text{D}\). Effective focal length \(F = 1/P = 1/3.5 \approx 0.2857\,\text{m} = 28.57\,\text{cm}\).
- Step 3: Apply lens formula for combination: \(\frac{1}{v} - \frac{1}{u} = \frac{1}{F}\). Use consistent units (cm): \(F = +28.57\,\text{cm}, u = -30\,\text{cm}\). \(\frac{1}{v} = \frac{1}{F} + \frac{1}{u} = \frac{1}{28.57} + \frac{1}{-30} = 0.0350 - 0.0333 = 0.0017\,\text{cm}^{-1}\).
- Step 4: \(v = 1/0.0017 \approx 588\,\text{cm} = +5.88\,\text{m}\). Positive \(v\) means real image on opposite side. Magnification \(m = v/u = 588/(-30) = -19.6\). Image height \(h' = m \times h = -19.6 \times 2.0 = -39.2\,\text{cm}\).
- Step 5: Interpret: Image is real (v > 0), inverted (m < 0), magnified 19.6×, located 5.88 m from the lens combination. Physically reasonable: object just outside focal length (30 cm > 28.57 cm) gives large real image.

REASONING: The combination acts as a single converging lens of power +3.5 D. The object is placed slightly beyond the focal point, producing a highly magnified real image — similar to a projector lens. Unit consistency (cm for distances, D for power) is maintained by converting F to cm.

ANSWER: Image distance \(v = +588\,\text{cm}\) (real), magnification \(m = -19.6\), image height \(h' = -39.2\,\text{cm}\) (inverted, magnified).

## WORKED_EXAMPLE_3
PROBLEM: A camera lens system uses two thin lenses in contact: a convex lens of focal length 12 cm and a concave lens of unknown focal length. The combination must have an effective focal length of 20 cm for a specific focusing requirement. Find the focal length and power of the concave lens.

STEPS:
- Step 1: Given: \(f_1 = +12\,\text{cm} = +0.12\,\text{m}\) (convex), \(F = +20\,\text{cm} = +0.20\,\text{m}\) (combination). To find: \(f_2\) and \(P_2\).
- Step 2: Use combination formula in power form (easier): \(P = P_1 + P_2\). Compute \(P = 1/F = 1/0.20 = +5.0\,\text{D}\). \(P_1 = 1/f_1 = 1/0.12 = +8.333\,\text{D}\).
- Step 3: Solve for \(P_2\): \(P_2 = P - P_1 = 5.0 - 8.333 = -3.333\,\text{D}\).
- Step 4: Find \(f_2 = 1/P_2 = 1/(-3.333) = -0.30\,\text{m} = -30\,\text{cm}\). Negative sign confirms concave lens.
- Step 5: Check: \(\frac{1}{F} = \frac{1}{12} + \frac{1}{-30} = \frac{5-2}{60} = \frac{3}{60} = \frac{1}{20}\) ✓. The concave lens reduces the converging power from 8.33 D to 5.0 D, increasing focal length from 12 cm to 20 cm — typical in camera lenses to correct aberrations.

REASONING: Working in dioptres avoids fractions and makes the algebra transparent. The negative power of the concave lens subtracts from the convex lens power, yielding a longer effective focal length. This is a standard design technique in photographic objectives.

ANSWER: Focal length of concave lens \(f_2 = -30\,\text{cm}\), Power \(P_2 = -3.33\,\text{D}\) (or \(-10/3\,\text{D}\) exactly).

## COMPETENCY_QUESTION_1
QUESTION: An optometrist prescribes a corrective lens of power +2.5 D for a hypermetropic patient. The lens is made by cementing a convex lens of power +6.0 D with a concave lens. What is the power of the concave lens? If the convex lens has a focal length of 16.7 cm, verify the focal length of the concave lens. Explain why a combination is used instead of a single convex lens of +2.5 D.

COMPETENCY: Interpreting physical situations using formulas; real-world application of lens combination.

STEPS:
- Step 1: Net prescribed power \(P = +2.5\,\text{D}\). Convex lens power \(P_1 = +6.0\,\text{D}\). Find \(P_2\): \(P_2 = P - P_1 = 2.5 - 6.0 = -3.5\,\text{D}\).
- Step 2: Focal length of concave lens \(f_2 = 1/P_2 = 1/(-3.5) = -0.2857\,\text{m} = -28.6\,\text{cm}\). Given convex lens focal length \(f_1 = 16.7\,\text{cm} = 0.167\,\text{m}\), its power \(P_1 = 1/0.167 \approx 6.0\,\text{D}\) ✓.
- Step 3: Reason for combination: A single +2.5 D lens would be thick at the centre (large curvature) causing spherical aberration and chromatic aberration. Using a strong convex +6.0 D and a concave –3.5 D allows thinner profiles, reduced aberrations, and better optical quality. The concave lens also corrects for dispersion (achromatic combination).

ANSWER: Power of concave lens = –3.5 D; focal length = –28.6 cm. Combinations reduce aberrations, allow thinner lenses, and enable achromatic correction.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two thin lenses A and B of focal lengths \(f_A = +15\,\text{cm}\) and \(f_B = -10\,\text{cm}\) are placed in contact. An object is placed 20 cm from the combination. (a) Find the position and magnification of the final image. (b) The combination is now separated by 5 cm (air gap). Without calculation, predict whether the effective focal length will increase or decrease, and justify your answer. (c) If the object is moved to 5 cm from the combination, describe qualitatively how the image changes.

COMPETENCY: Predicting outcomes from changing variables; analyzing beyond the taught scope (separated lenses).

STEPS:
- Step 1 (a): \(P_A = 1/0.15 = +6.67\,\text{D}, P_B = 1/(-0.10) = -10.0\,\text{D}\). Net \(P = -3.33\,\text{D}\), so \(F = -30\,\text{cm}\) (diverging). Lens formula: \(1/v = 1/F + 1/u = 1/(-30) + 1/(-20) = -5/60 = -1/12\) ⇒ \(v = -12\,\text{cm}\). \(m = v/u = (-12)/(-20) = +0.6\). Image: virtual, erect, diminished, 12 cm on object side.
- Step 2 (b): For separated lenses, the effective power is \(P = P_1 + P_2 - d P_1 P_2\) (where \(d\) is separation in metres). Here \(d = 0.05\,\text{m}\), \(P_1 P_2 = -66.7\), so \(-d P_1 P_2 = +3.33\,\text{D}\). Net \(P = -3.33 + 3.33 = 0\) → \(F \to \infty\). The effective focal length increases (becomes infinite). Physically, the separation introduces a positive correction because the diverging lens is weaker than the converging lens? Wait: \(P_1 P_2\) is negative, so \(-d P_1 P_2\) is positive, making the combination less diverging (more converging). So \(F\) increases (becomes less negative, eventually positive).
- Step 3 (c): At \(u = -5\,\text{cm}\), object is inside the focal length of the diverging combination (\(F = -30\,\text{cm}\)). For a diverging lens, any real object produces a virtual image between lens and focal point. Magnification \(m = F/(F-u)\)? Actually for diverging lens, image is always virtual, erect, diminished. At \(u = -5\,\text{cm}\), \(1/v = 1/(-30) + 1/(-5) = -7/30\) ⇒ \(v = -30/7 \approx -4.3\,\text{cm}\), \(m = v/u = 0.86\). Image is closer to lens, larger than at 20 cm (magnification increased from 0.6 to 0.86).

ANSWER: (a) \(v = -12\,\text{cm}\), virtual, erect, diminished, \(m = +0.6\). (b) Effective focal length increases (becomes less diverging); separation adds positive power when \(P_1 P_2 < 0\). (c) Image remains virtual, erect, but moves closer to lens and becomes larger (magnification increases towards 1 as \(u \to 0\)).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The ______ of thin lenses in contact refers to an optical system where two or more thin lenses are placed coaxially with their optical centres coincident (or so close that the separation is negligible compared to focal lengths).

## DIAGNOSTIC_ANSWER_7
combination

The combination is the system's name: two or more lenses stacked into one optical citizen. **A wrong answer (a sequence) reveals the student has spaced the lenses where the definition insists on contact.** The combination is the system's name: two or more lenses stacked into one optical citizen.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe a ______ lens: many prescription glasses are actually two thin lenses cemented together (e.g., a convex lens for hypermetropia combined with a cylindrical lens for astigmatism).

## DIAGNOSTIC_ANSWER_8
spectacle

The spectacle word is the application: prescription blanks are literally cemented combinations. **A wrong answer (a camera) reveals the student has photographed the concept where the walkthrough fits it on a face.** The spectacle word is the application: prescription blanks are cemented combinations worn on the nose.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can calculate the effective focal length, power, and net magnification of a combination of 2–3 thin lenses in contact given individual focal lengths (with correct sign convention), and can determine whether the combination is converging or diverging.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Observe a spectacle lens: many prescription glasses are actually two thin lenses cemented together (e.g., a convex lens for ______ combined with a cylindrical lens for astigmatism).

## DIAGNOSTIC_ANSWER_10
hypermetropia

The hypermetropia is the first prescription: the convex component correcting the short-focus eye before the cylinder corrects the axis. **A wrong answer (myopia) reveals the student has prescribed the wrong defect and flipped the first lens's sign.**
