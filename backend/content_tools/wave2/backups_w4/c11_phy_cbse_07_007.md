## ELI5
The spring balance reads lighter at Kochi than at Srinagar - Earth's spin is quietly discounting your weight. Every surface point circles the polar axis, and the centrifugal effect tilts outward, subtracting its radial share from g. Maximum discount at the equator, none at the poles - and away from both, the plumb line leans, no longer pointing at the planet's heart.

## DEFINITION
The effective acceleration due to gravity (\(g_{\text{eff}}\)) at a point on Earth's surface is the vector sum of the true gravitational acceleration (\(g = GM/R^2\), directed toward Earth's centre) and the centrifugal acceleration (\(\omega^2 R \cos\lambda\), directed outward perpendicular to the rotation axis) arising from Earth's rotation. It varies with latitude \(\lambda\) as \(g_{\text{eff}} = g - \omega^2 R \cos^2\lambda\), where \(\omega = 7.292 \times 10^{-5}\,\text{rad/s}\) is Earth's angular speed and \(R = 6.37 \times 10^6\,\text{m}\) is Earth's mean radius.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the latitude-dependent formula for effective \(g\) by resolving centrifugal acceleration into radial and tangential components, calculate \(g_{\text{eff}}\) at any given latitude, and explain why the plumb line deviates from the true radial direction except at the poles and equator.

## SCOPE_BOUNDARY
Covers the variation of effective \(g\) solely due to Earth's rotation (centrifugal effect) assuming a spherical Earth of uniform density. Does NOT cover variations due to altitude (node 005), depth (node 006), or Earth's oblateness (equatorial bulge). The formula \(g_{\text{eff}} = g - \omega^2 R \cos^2\lambda\) is an approximation valid for a rigid spherical Earth; it ignores the tiny change in \(g\) caused by the equatorial bulge itself.

## WALKTHROUGH
Observe that a spring balance shows a slightly smaller reading for the same mass at the equator than at the poles — a real effect used in calibrating precision instruments. Connect this to the centrifugal force you studied in Laws of Motion (Class 11): every point on Earth undergoes uniform circular motion about the polar axis with radius \(r = R\cos\lambda\). The centrifugal acceleration \(\omega^2 r\) points outward perpendicular to the axis. Resolve this vector into a component opposite to \(g\) (radial: \(\omega^2 R \cos^2\lambda\)) and a component perpendicular to \(g\) (tangential: \(\omega^2 R \cos\lambda \sin\lambda\)). The radial component reduces the effective weight, giving \(g_{\text{eff}} = g - \omega^2 R \cos^2\lambda\). The tangential component causes the plumb line to deflect toward the equator.

Takeaway: mastery means resolving the centrifugal effect into radial and tangential parts, computing the effective g at any latitude, and explaining the plumb line's lean. Exam moves: latitude-comparison questions and apparent-weight items. Check yourself: the discount runs on the cosine squared - zero at the poles, full at the equator. Students miss it because they treat Earth as a still room, when the definition adds the spin's vector bookkeeping: rotation lightens the equator, deflects the plumb line in between, and the spring balance has been honest about it all along.

## DIAGNOSTIC_QUESTION_1
State the formula for effective acceleration due to gravity at latitude \(\lambda\) and define each symbol with its SI unit.

## DIAGNOSTIC_ANSWER_1
\(g_{\text{eff}} = g - \omega^2 R \cos^2\lambda\), where \(g\) = true gravitational acceleration (m/s²), \(\omega\) = angular speed of Earth (rad/s), \(R\) = Earth's radius (m), \(\lambda\) = latitude (rad or °). A wrong answer (e.g., missing \(\cos^2\lambda\) or using \(\sin\lambda\)) reveals confusion with the altitude/depth formulas or incorrect vector resolution of centrifugal acceleration.

## DIAGNOSTIC_QUESTION_2
Why does the centrifugal acceleration due to Earth's rotation reduce the effective \(g\) at the equator but have zero radial effect at the poles? Explain using the direction of the centrifugal acceleration vector.

## DIAGNOSTIC_ANSWER_2
At the equator (\(\lambda=0\)), the centrifugal acceleration \(\omega^2 R\) points exactly opposite to the true gravitational acceleration \(g\) (both along the radial line), so it directly subtracts from \(g\). At the poles (\(\lambda=90^\circ\)), the distance from the rotation axis is zero, so the centrifugal acceleration is zero; hence \(g_{\text{eff}} = g\). A wrong answer indicates the student thinks centrifugal force always acts vertically upward everywhere, rather than perpendicular to the rotation axis.

## DIAGNOSTIC_QUESTION_3
Calculate the effective \(g\) at Mumbai (latitude \(19^\circ\,\text{N}\)). Use \(g = 9.80\,\text{m/s}^2\), \(R = 6400\,\text{km}\), \(\omega = 7.29 \times 10^{-5}\,\text{rad/s}\). Give answer in m/s² to three significant figures.

## DIAGNOSTIC_ANSWER_3
Step 1: \(\omega^2 R = (7.29 \times 10^{-5})^2 \times 6.4 \times 10^6 = 0.0340\,\text{m/s}^2\).  
Step 2: \(\cos 19^\circ = 0.9455\), \(\cos^2 19^\circ = 0.8940\).  
Step 3: Reduction = \(0.0340 \times 0.8940 = 0.0304\,\text{m/s}^2\).  
Step 4: \(g_{\text{eff}} = 9.80 - 0.0304 = 9.7696 \approx 9.77\,\text{m/s}^2\).  
A wrong answer (e.g., 9.80 or 9.77 without correct reduction) shows unit conversion error (km to m) or forgetting the \(\cos^2\lambda\) factor.

## DIAGNOSTIC_QUESTION_4
A student claims: "If Earth's rotation speed doubles, the reduction in \(g\) at the equator becomes four times larger, but at \(45^\circ\) latitude it only becomes twice as large." Is this correct? Justify using the formula.

## DIAGNOSTIC_ANSWER_4
The claim is incorrect. The reduction is \(\omega^2 R \cos^2\lambda\). If \(\omega\) doubles, \(\omega^2\) becomes 4 times larger at **all** latitudes. At the equator (\(\cos^2 0 = 1\)), reduction quadruples. At \(45^\circ\) (\(\cos^2 45^\circ = 0.5\)), reduction also quadruples (from \(0.5\omega^2 R\) to \(0.5 \times 4\omega^2 R = 2\omega^2 R\)). The student incorrectly treated the latitude factor as changing with \(\omega\). This reveals a misunderstanding that the latitude dependence is independent of \(\omega\).

## DIAGNOSTIC_QUESTION_5
Two identical spring balances are calibrated at the poles. One is taken to the equator, the other to \(45^\circ\) latitude. Both measure the same 100 kg mass. Which balance shows a larger reading? By what percentage (approximately) do the two readings differ? Use \(\omega^2 R \approx 0.034\,\text{m/s}^2\), \(g \approx 9.8\,\text{m/s}^2\).

## DIAGNOSTIC_ANSWER_5
At the equator: reduction = \(0.034\,\text{m/s}^2\) → \(g_{\text{eff}} = 9.766\,\text{m/s}^2\) → reading = \(976.6\,\text{N}\).  
At \(45^\circ\): \(\cos^2 45^\circ = 0.5\) → reduction = \(0.017\,\text{m/s}^2\) → \(g_{\text{eff}} = 9.783\,\text{m/s}^2\) → reading = \(978.3\,\text{N}\).  
The \(45^\circ\) balance shows a larger reading. Percentage difference = \(\frac{978.3 - 976.6}{978.3} \times 100\% \approx 0.17\%\).  
A wrong answer (e.g., equator reading larger) reveals confusion that centrifugal effect increases with latitude.

## DIAGNOSTIC_QUESTION_6
Design a simple classroom demonstration using a rotating turntable, a small spring balance, and a mass to show that the apparent weight of an object decreases when the system rotates. Explain how the turntable models Earth's rotation and what the spring balance measures.

## DIAGNOSTIC_ANSWER_6
Place the spring balance with a hanging mass at the centre of a rotating turntable (models pole: no centrifugal effect, reading = \(mg\)). Then move the balance to the edge of the turntable (models equator: maximum centrifugal effect). As the turntable rotates, the spring balance reading decreases because the mass requires a centripetal force provided partly by the spring tension. The reduction in tension equals \(m\omega^2 r\). A poor answer describes only a qualitative idea without linking the turntable's centre/edge to poles/equator or the spring tension to apparent weight.

## COMMON_MISCONCEPTION
Students often believe the centrifugal force due to Earth's rotation acts **vertically upward** at all latitudes. In reality, the centrifugal acceleration vector is always directed **perpendicular to the rotation axis** (outward). Only at the equator is it exactly anti-parallel to \(g\). At other latitudes, it has a component perpendicular to the radial direction that deflects the plumb line toward the equator by up to ~6 arcminutes at 45° latitude. This misconception leads to incorrect formulas like \(g_{\text{eff}} = g - \omega^2 R\) (missing \(\cos^2\lambda\)) and inability to explain plumb line deviation.

## ON_FAILURE
1. Revisit the concept of centrifugal acceleration in a rotating frame (Class 11 Laws of Motion): \(a_c = \omega^2 r\) directed radially outward from the axis.  
2. Draw a 3D diagram: Earth sphere, rotation axis, a point at latitude \(\lambda\). Show the centrifugal vector perpendicular to the axis.  
3. Resolve this vector into two components: (a) along the radius (opposite to \(g\)) → magnitude \(\omega^2 R \cos^2\lambda\); (b) perpendicular to radius (toward equator) → magnitude \(\omega^2 R \cos\lambda \sin\lambda\).  
4. Practice calculating both components for \(\lambda = 0^\circ, 30^\circ, 45^\circ, 60^\circ, 90^\circ\) to see the trend.  
5. Connect the perpendicular component to the plumb line deviation (a standard board exam question).

## PREREQUISITE_NODE_IDS
c11_phy_cbse_07_004, c9_physics_ch2_10, c9_physics_ch3_4, c11_phy_cbse_07_002, c11_phy_cbse_07_005, c11_phy_cbse_07_006

## PREREQUISITE_REASONS
c11_phy_cbse_07_004: Provides the baseline true gravitational acceleration \(g = GM/R^2\) at Earth's surface without rotation.  
c9_physics_ch2_10: Introduces centripetal/centrifugal acceleration \(a = \omega^2 r\) for uniform circular motion, which is the origin of the rotation effect.  
c9_physics_ch3_4: Newton's second law (\(F=ma\)) links the net force (true gravity minus centrifugal) to the effective acceleration measured by a spring balance.
c11_phy_cbse_07_002: The law provides the centripetal force for the rotating Earth frame, leading to effective \(g' = g - \omega^2 R \cos^2 \lambda\).  
c11_phy_cbse_07_005: Rotation effect combines with altitude variation to give effective \(g\) at different latitudes.  
c11_phy_cbse_07_006: Variation of \(g\) due to rotation combines with depth/altitude variations to give effective \(g\); the depth formula provides the baseline \(g\) before rotation correction.  

## FORWARD_NODE_IDS
c11_phy_cbse_07_010, c11_phy_cbse_07_011, c11_phy_cbse_07_012
## FORWARD_REASONS
c11_phy_cbse_07_010: Escape velocity derivation uses surface \(g\); rotation reduces effective \(g\) at the equator, lowering the required escape speed slightly (advantage for equatorial launches).  
c11_phy_cbse_07_011: Orbital velocity for low Earth orbit depends on effective \(g\); Earth's rotation provides an initial velocity boost \(\omega R \cos\lambda\) for eastward launches.  
c11_phy_cbse_07_012: Geostationary satellites orbit in the equatorial plane; the effective potential (gravity + centrifugal) determines the orbital radius.

## CROSS_SUBJECT_PREREQS
c10_math_cbse_08_001, c10_math_cbse_08_006
## CROSS_SUBJECT_REASONS
c10_math_cbse_08_001: Trigonometric ratios (\(\cos\lambda, \sin\lambda\)) are essential to resolve the centrifugal acceleration vector into radial and tangential components at latitude \(\lambda\).  
c10_math_cbse_08_006: The identity \(\sin^2\lambda + \cos^2\lambda = 1\) verifies that the magnitude of the centrifugal vector is correctly distributed between its two perpendicular components.

## CHAIN_DESCRIPTION
c11_phy_cbse_07_004 -> c11_phy_cbse_07_007 -> c11_phy_cbse_07_010

## THIS_FORMULA
\(g_{\text{eff}} = g - \omega^2 R \cos^2\lambda\)  (m/s²)

## FORMULA_VARIABLES
\(g_{\text{eff}}\) = effective acceleration due to gravity (m/s²), \(g\) = true gravitational acceleration \(GM/R^2\) (m/s²), \(\omega\) = angular speed of Earth (rad/s), \(R\) = Earth's radius (m), \(\lambda\) = latitude (rad or °)

## FORMULA_UNITS
m/s², rad/s, m, dimensionless (trigonometric functions use radians or degrees)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_08_001 | Trigonometric ratios (cos λ, sin λ) resolve the centrifugal acceleration vector into radial and tangential components at latitude λ.
c10_math_cbse_08_006 | The identity sin²λ + cos²λ = 1 ensures the vector resolution of centrifugal acceleration is mathematically consistent.

## PREREQ_CONCEPT
Centrifugal acceleration in a rotating reference frame: \(a_c = \omega^2 r\) directed perpendicular to the rotation axis, where \(r = R\cos\lambda\) is the distance from the axis.

## PREREQ_BEFORE
Student must be able to calculate centripetal/centrifugal acceleration for uniform circular motion and resolve a vector into two perpendicular components using trigonometry.

## PREREQ_STUCK
Review uniform circular motion (centripetal acceleration \(a = \omega^2 r\)) and vector resolution using \(\sin\theta\) and \(\cos\theta\) (Class 10 Maths Trigonometry).

## WORKED_EXAMPLE_1
PROBLEM: Calculate the effective acceleration due to gravity at the equator (\(\lambda = 0^\circ\)). Given: \(g = 9.80\,\text{m/s}^2\), \(R = 6400\,\text{km}\), \(\omega = 7.29 \times 10^{-5}\,\text{rad/s}\).

STEPS:
- Step 1: Identify given quantities: \(g = 9.80\,\text{m/s}^2\), \(R = 6400\,\text{km} = 6.4 \times 10^6\,\text{m}\), \(\omega = 7.29 \times 10^{-5}\,\text{rad/s}\), \(\lambda = 0^\circ\).
- Step 2: Formula: \(g_{\text{eff}} = g - \omega^2 R \cos^2\lambda\). At equator \(\cos 0^\circ = 1\), so \(g_{\text{eff}} = g - \omega^2 R\).
- Step 3: Compute \(\omega^2 R = (7.29 \times 10^{-5})^2 \times (6.4 \times 10^6) = 5.314 \times 10^{-9} \times 6.4 \times 10^6 = 0.0340\,\text{m/s}^2\).
- Step 4: Subtract: \(g_{\text{eff}} = 9.80 - 0.0340 = 9.766\,\text{m/s}^2\).
- Step 5: Verify: reduction is \(0.034/9.80 \approx 0.35\%\), physically reasonable. Round to three significant figures.

REASONING: At the equator, the centrifugal acceleration points exactly opposite to the true gravitational acceleration, so it directly reduces the effective \(g\). The magnitude of the centrifugal acceleration is \(\omega^2 R\) because the distance from the rotation axis equals Earth's radius \(R\).

ANSWER: \(9.77\,\text{m/s}^2\) (or \(9.766\,\text{m/s}^2\))

## WORKED_EXAMPLE_2
PROBLEM: At what latitude would the effective \(g\) become half of its polar value? Assume \(g_{\text{pole}} = 9.83\,\text{m/s}^2\), \(\omega = 7.29 \times 10^{-5}\,\text{rad/s}\), \(R = 6.37 \times 10^6\,\text{m}\). Is this physically possible on Earth?

STEPS:
- Step 1: At poles (\(\lambda = 90^\circ\)), \(\cos 90^\circ = 0\), so \(g_{\text{pole}} = g = 9.83\,\text{m/s}^2\) (no centrifugal reduction).
- Step 2: We want \(g_{\text{eff}} = g_{\text{pole}}/2 = 4.915\,\text{m/s}^2\). Use \(g_{\text{eff}} = g - \omega^2 R \cos^2\lambda\).
- Step 3: \(4.915 = 9.83 - \omega^2 R \cos^2\lambda \Rightarrow \omega^2 R \cos^2\lambda = 4.915\).
- Step 4: Compute \(\omega^2 R = (7.29 \times 10^{-5})^2 \times 6.37 \times 10^6 = 0.0339\,\text{m/s}^2\).
- Step 5: \(\cos^2\lambda = 4.915 / 0.0339 \approx 145\).
- Step 6: Since \(\cos^2\lambda \le 1\) always, this is impossible. The maximum reduction due to rotation is only \(0.034\,\text{m/s}^2\) (0.35% of \(g\)).

REASONING: The centrifugal acceleration is tiny compared to \(g\) (~0.35%). Rotation alone can never halve \(g\); the required \(\cos^2\lambda > 1\) has no real solution. This checks physical reasonableness of the formula.

ANSWER: Not physically possible; maximum reduction is only 0.034 m/s² (0.35% of g).

## WORKED_EXAMPLE_3
PROBLEM: A 100 kg object is weighed on a spring balance at Chennai (latitude \(13^\circ\,\text{N}\)) and at Delhi (latitude \(28.6^\circ\,\text{N}\)). Calculate the difference in weight readings. Use \(g = 9.80\,\text{m/s}^2\), \(R = 6400\,\text{km}\), \(\omega = 7.29 \times 10^{-5}\,\text{rad/s}\).

STEPS:
- Step 1: Given: \(m = 100\,\text{kg}\), \(g = 9.80\,\text{m/s}^2\), \(R = 6.4 \times 10^6\,\text{m}\), \(\omega = 7.29 \times 10^{-5}\,\text{rad/s}\). \(\lambda_1 = 13^\circ\), \(\lambda_2 = 28.6^\circ\).
- Step 2: Compute \(\omega^2 R = 0.0340\,\text{m/s}^2\) (as in Example 1).
- Step 3: Chennai: \(\cos 13^\circ = 0.9744\), \(\cos^2 = 0.9494\). Reduction = \(0.0340 \times 0.9494 = 0.0323\,\text{m/s}^2\). \(g_{\text{eff,1}} = 9.80 - 0.0323 = 9.7677\,\text{m/s}^2\). Weight₁ = \(100 \times 9.7677 = 976.77\,\text{N}\).
- Step 4: Delhi: \(\cos 28.6^\circ = 0.8776\), \(\cos^2 = 0.7702\). Reduction = \(0.0340 \times 0.7702 = 0.0262\,\text{m/s}^2\). \(g_{\text{eff,2}} = 9.80 - 0.0262 = 9.7738\,\text{m/s}^2\). Weight₂ = \(100 \times 9.7738 = 977.38\,\text{N}\).
- Step 5: Difference = Weight₂ - Weight₁ = \(977.38 - 976.77 = 0.61\,\text{N}\).
- Step 6: Weight is greater at higher latitude (Delhi) because centrifugal reduction is smaller there.

REASONING: The centrifugal acceleration component opposing gravity is proportional to \(\cos^2\lambda\). As latitude increases, \(\cos\lambda\) decreases, so the reduction decreases, making effective \(g\) larger. Thus a spring balance shows a larger weight at higher latitudes for the same mass.

ANSWER: 0.61 N (weight at Delhi is greater by 0.61 N)

## COMPETENCY_QUESTION_1
QUESTION: A satellite is launched from Sriharikota (latitude \(13.7^\circ\,\text{N}\)) and another from a launch pad at the equator. Both are launched eastward with the same speed relative to Earth's surface. Which launch requires less fuel to achieve a given orbital speed relative to Earth's centre? Explain using the concept of effective \(g\) and Earth's rotation.

COMPETENCY: Predicting outcomes from changing variables (latitude) and applying to real-world space launch.

STEPS:
- Step 1: The orbital speed relative to Earth's centre is the vector sum of Earth's rotational velocity at that latitude and the launch velocity relative to Earth.
- Step 2: Earth's rotational speed at latitude \(\lambda\) is \(v_{\text{rot}} = \omega R \cos\lambda\). At equator, \(\cos 0^\circ = 1\), so \(v_{\text{rot}} \approx 465\,\text{m/s}\) (maximum). At \(13.7^\circ\), \(\cos 13.7^\circ \approx 0.97\), so \(v_{\text{rot}} \approx 451\,\text{m/s}\).
- Step 3: The equatorial launch gives a larger initial velocity boost (about 14 m/s more) because it moves faster with Earth's rotation.
- Step 4: Effective \(g\) is also slightly lower at the equator (by \(\omega^2 R \cos^2\lambda\)), reducing the gravitational pull during ascent, but the velocity boost is the dominant fuel-saving factor.
- Step 5: Conclusion: The equatorial launch requires less fuel.

ANSWER: The equatorial launch requires less fuel because Earth's rotational speed is maximum at the equator (\(v = \omega R\)), giving the rocket a larger initial velocity boost relative to Earth's centre. The reduction in effective \(g\) at the equator also slightly reduces the gravitational pull, but the velocity boost is the primary factor.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Earth's rotation causes a plumb line to deviate from the true radial direction (towards Earth's centre). At a latitude of \(45^\circ\), calculate the angle of deviation of the plumb line from the radial direction. Use \(g = 9.8\,\text{m/s}^2\), \(\omega = 7.29 \times 10^{-5}\,\text{rad/s}\), \(R = 6.4 \times 10^6\,\text{m}\). (Hint: The deviation angle \(\theta\) satisfies \(\tan\theta = \frac{\text{centrifugal acceleration perpendicular to radius}}{\text{effective } g}\). The perpendicular component is \(\omega^2 R \cos\lambda \sin\lambda\).)

COMPETENCY: Interpreting physical situations using formulas and vector resolution (combining rotation effect with direction of effective gravity).

STEPS:
- Step 1: Centrifugal acceleration at latitude \(\lambda\): \(a_c = \omega^2 R \cos\lambda\) directed outward perpendicular to axis.
- Step 2: Resolve \(a_c\): radial component \(a_{c,\text{rad}} = \omega^2 R \cos^2\lambda\) (opposite to \(g\)), tangential component \(a_{c,\text{tan}} = \omega^2 R \cos\lambda \sin\lambda\) (perpendicular to radius, toward equator).
- Step 3: Effective gravity vector \(\vec{g}_{\text{eff}} = \vec{g} + (-\vec{a}_c)\). The deviation angle \(\theta\) from the radial direction is given by \(\tan\theta = \frac{a_{c,\text{tan}}}{g - a_{c,\text{rad}}}\).
- Step 4: For \(\lambda = 45^\circ\), \(\cos 45^\circ = \sin 45^\circ = 1/\sqrt{2} \approx 0.7071\).
- Step 5: \(\omega^2 R = (7.29 \times 10^{-5})^2 \times 6.4 \times 10^6 = 0.0340\,\text{m/s}^2\).
- Step 6: \(a_{c,\text{tan}} = 0.0340 \times 0.7071 \times 0.7071 = 0.0170\,\text{m/s}^2\). \(a_{c,\text{rad}} = 0.0340 \times 0.5 = 0.0170\,\text{m/s}^2\).
- Step 7: \(g_{\text{eff,rad}} = 9.8 - 0.0170 = 9.783\,\text{m/s}^2\).
- Step 8: \(\tan\theta = 0.0170 / 9.783 = 0.001738\). \(\theta = \arctan(0.001738) \approx 0.0996^\circ \approx 5.98'\) (arcminutes).

ANSWER: \(0.10^\circ\) (or \(6\) arcminutes) towards the equator.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Observe that a spring balance shows a ______ smaller reading for the same mass at the equator than at the poles — a real effect used in calibrating precision instruments.

## DIAGNOSTIC_ANSWER_7
slightly

**A wrong answer ("much" or "greatly") reveals the student has paraphrased the walkthrough's adverb - the balance reads slightly smaller at the equator.** Slightly is the walkthrough's own adverb, and the adverb is what the blank grades. Recall the poles comparison before filling, and give the adverb exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Observe that a spring balance shows a slightly smaller reading for the same mass at the equator than at the poles — a real effect used in ______ precision instruments.

## DIAGNOSTIC_ANSWER_8
calibrating

**A wrong answer ("reading" or "testing") reveals the student has paraphrased the walkthrough's participle - the effect is used in calibrating precision instruments.** Calibrating is the walkthrough's own participle, and the participle is what the blank grades. Recall the equator-versus-poles gap before filling, and fill the word exactly as written.
