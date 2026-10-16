## ELI5
Climb the Qutub Minar, then the Burj Khalifa: your 1 kg mass weighs a whisper less each step up. At height h, gravity's pull follows g times the square of R over R plus h - the same inverse-square law, just a longer lever of distance. For modest heights the drop is nearly linear, about twice h over the Earth's radius; mountains barely notice, satellites do.

## DEFINITION
The acceleration due to gravity at a height \(h\) above the Earth's surface is the gravitational acceleration experienced by a point mass at that altitude, given by \(g_h = \frac{GM_E}{(R_E + h)^2}\), where \(G\) is the universal gravitational constant, \(M_E\) is the mass of the Earth, and \(R_E\) is the radius of the Earth. Its SI unit is \(\text{m/s}^2\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can derive the exact formula for \(g_h\) from Newton's law of gravitation, apply the binomial approximation for \(h \ll R_E\), and calculate the percentage change in \(g\) at a given altitude. They can also explain why \(g\) decreases with altitude and compare the rate of decrease with that due to depth.

## SCOPE_BOUNDARY
This node covers the variation of \(g\) with altitude above the Earth's surface assuming a spherical Earth of uniform density. It does NOT cover variation due to Earth's rotation, non-spherical shape, or density variations (covered in c11_phy_cbse_07_007). It also does not cover variation below the surface (covered in c11_phy_cbse_07_006).

## WALKTHROUGH
Imagine you are standing on the terrace of a tall building like the Qutub Minar (73 m) and then on the roof of the Burj Khalifa (828 m). Do you weigh the same? Use a spring balance to measure the weight of a 1 kg mass at ground level and at the top of a tall building — the reading decreases slightly. This happens because gravitational force follows an inverse-square law with distance from Earth's centre. Start by recalling \(g = \frac{GM_E}{R_E^2}\) from the previous node (c11_phy_cbse_07_004). Replace \(R_E\) with \(R_E + h\) to get the exact formula. Then, for small \(h\) (like mountains, airplanes, low-orbit satellites), use the binomial expansion \((1 + x)^{-2} \approx 1 - 2x\) to obtain the linear approximation \(g_h \approx g(1 - 2h/R_E)\). This approximation is valid for \(h \ll R_E\) (typically \(h < 0.1 R_E \approx 640 \text{ km}\)).

Takeaway: mastery means deriving the exact formula, deploying the small-height approximation, and quoting the percentage loss at a given altitude. Exam moves: find-g-at-height questions and approximate-the-change items. Check yourself: the denominator grows by h, the square does the rest - altitude taxes gravity gently at first. Students miss it because the linear form invites misuse, when the definition scopes it: the approximation lives only where h is a speck beside the Earth's radius, and satellites already live outside its honesty.

## DIAGNOSTIC_QUESTION_1
State the exact formula for acceleration due to gravity at a height \(h\) above the Earth's surface in terms of \(g\), \(R_E\), and \(h\). What is the condition for using the approximate formula \(g_h \approx g(1 - 2h/R_E)\)?

## DIAGNOSTIC_ANSWER_1
Exact formula: \(g_h = g \left(\frac{R_E}{R_E + h}\right)^2\). Approximate formula condition: \(h \ll R_E\) (typically \(h < 0.1 R_E \approx 640 \text{ km}\)). A wrong answer (e.g., \(g_h = g - 2gh\) or missing the square) reveals the student has not derived the formula from Newton's law and is memorising incorrectly. They may also confuse the condition with \(h \ll 1\) or not know the binomial expansion condition.

## DIAGNOSTIC_QUESTION_2
Why does the acceleration due to gravity decrease with altitude? Explain using the inverse-square law and the concept of gravitational field lines. Why is the decrease not linear with \(h\)?

## DIAGNOSTIC_ANSWER_2
Gravitational field strength is proportional to the density of field lines. As altitude increases, the same number of field lines (proportional to \(M_E\)) spread over a larger spherical surface area \(4\pi (R_E + h)^2\), so density decreases as \(1/(R_E + h)^2\). The decrease is not linear because the area grows with the square of the distance; the inverse-square law gives a hyperbolic decrease. A wrong answer (e.g., "g decreases because mass decreases" or "g decreases linearly") reveals confusion between mass and distance dependence, or ignorance of the inverse-square nature of gravity.

## DIAGNOSTIC_QUESTION_3
Calculate the acceleration due to gravity at the cruising altitude of a commercial airliner (12 km). Use \(R_E = 6370 \text{ km}\) and \(g = 9.8 \text{ m/s}^2\). Express your answer in \(\text{m/s}^2\) to three significant figures. Also find the percentage decrease from the surface value.

## DIAGNOSTIC_ANSWER_3
Given: \(h = 12 \text{ km} = 1.2 \times 10^4 \text{ m}\), \(R_E = 6.37 \times 10^6 \text{ m}\), \(g = 9.8 \text{ m/s}^2\).  
Exact: \(g_h = 9.8 \times \left(\frac{6.37 \times 10^6}{6.37 \times 10^6 + 1.2 \times 10^4}\right)^2 = 9.8 \times \left(\frac{6370}{6382}\right)^2 = 9.8 \times (0.99812)^2 = 9.8 \times 0.99624 = 9.763 \text{ m/s}^2\).  
Approximate: \(g_h \approx 9.8 \left(1 - \frac{2 \times 12}{6370}\right) = 9.8 \times (1 - 0.003768) = 9.763 \text{ m/s}^2\).  
Percentage decrease = \(\frac{9.8 - 9.763}{9.8} \times 100\% = 0.377\%\).  
A wrong answer (e.g., using \(h\) in km without converting, or forgetting the square) reveals unit inconsistency or algebraic error. If they get 9.8, they likely used \(h=0\).

## DIAGNOSTIC_QUESTION_4
Compare the rate of decrease of \(g\) with altitude (for \(h \ll R_E\)) to the rate of decrease with depth (for \(d \ll R_E\)). Which decreases faster per kilometre? Justify mathematically.

## DIAGNOSTIC_ANSWER_4
For altitude: \(g_h \approx g(1 - 2h/R_E)\) → rate = \(-2g/R_E\) per metre.  
For depth: \(g_d = g(1 - d/R_E)\) → rate = \(-g/R_E\) per metre.  
Altitude decreases twice as fast as depth per unit distance. A wrong answer (e.g., "depth decreases faster" or "same rate") reveals the student has not compared the coefficients in the linear approximations or has confused the formulas \(g_h = g(1 - 2h/R_E)\) and \(g_d = g(1 - d/R_E)\).

## DIAGNOSTIC_QUESTION_5
A student claims: "At the height of the International Space Station (~400 km), gravity is zero because astronauts float." Evaluate this statement. Calculate \(g\) at 400 km and explain why astronauts experience weightlessness.

## DIAGNOSTIC_ANSWER_5
At \(h = 400 \text{ km}\), \(g_h = 9.8 \times \left(\frac{6370}{6770}\right)^2 = 9.8 \times 0.885 = 8.67 \text{ m/s}^2\) (about 88% of surface gravity). The statement is false. Astronauts float because they are in free fall (both the ISS and the astronaut accelerate toward Earth at \(8.67 \text{ m/s}^2\)), not because gravity is absent. A wrong evaluation (e.g., agreeing with the student) reveals the common misconception that weightlessness means absence of gravity. They confuse contact force (weight) with gravitational force.

## DIAGNOSTIC_QUESTION_6
Design a thought experiment to measure the variation of \(g\) with altitude using a simple pendulum and a stopwatch. Describe how you would isolate the effect of altitude from other factors (e.g., temperature, air buoyancy, Earth's rotation). What is the minimum height difference needed to detect a 0.1% change in \(g\) with a pendulum of length 1 m measured to 0.1 s precision over 20 oscillations?

## DIAGNOSTIC_ANSWER_6
Use \(T = 2\pi\sqrt{L/g}\) → \(g = 4\pi^2 L / T^2\). Measure period at two altitudes. To isolate altitude: use same pendulum, same location (latitude), same temperature, vacuum chamber to remove buoyancy, and correct for Earth's rotation (small at mid-latitudes). For 0.1% change in \(g\), \(\Delta g/g = 0.001\). From \(g_h \approx g(1 - 2h/R_E)\), \(\Delta g/g \approx 2\Delta h/R_E\). So \(\Delta h = 0.001 \times R_E / 2 = 0.001 \times 6.37 \times 10^6 / 2 \approx 3.2 \text{ km}\). A poor answer (e.g., "measure at sea level and mountain top" without controlling variables) reveals lack of experimental design skills and misunderstanding of error sources.

## COMMON_MISCONCEPTION
Students often believe that "zero gravity" exists in orbit because astronauts float. They confuse weightlessness (zero contact force) with zero gravitational force. They also think \(g\) becomes zero at a few hundred kilometres, not realising \(g\) at ISS altitude is still ~8.7 m/s². Another error: using \(g_h = g - \frac{2gh}{R_E}\) without the condition \(h \ll R_E\), leading to negative \(g\) for large \(h\) (e.g., at geostationary height).

## ON_FAILURE
1. Re-derive \(g_h\) from \(F = \frac{GM_E m}{(R_E + h)^2}\) and \(F = m g_h\). 2. Plot \(g_h\) vs \(h\) for \(h = 0\) to \(2R_E\) using the exact formula to see it never reaches zero. 3. Watch a video of ISS astronauts and identify that they are falling *towards* Earth, not floating *away*. 4. Practice binomial expansion: \((1 + x)^{-2} \approx 1 - 2x\) for \(x \ll 1\) with \(x = h/R_E\). 5. Solve NCERT Exercise 7.15: "A body weighs 63 N on the surface. What is the gravitational force at height \(R_E/2\)?" to reinforce exact formula usage.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_07_002, c11_phy_cbse_07_004, c8_math_ch2_3, c8_math_ch2_7
## PREREQUISITE_REASONS
c11_phy_cbse_07_002: Newton's law of universal gravitation provides the foundational force law \(F = GMm/r^2\) from which \(g_h\) is derived.
c11_phy_cbse_07_004: Acceleration due to gravity at Earth's surface (\(g = GM_E/R_E^2\)) is the reference value for comparison.
c8_math_ch2_3: Exponential notation and powers are needed to handle \((R_E + h)^2\) and binomial expansion.
c8_math_ch2_7: Multiplying powers with same base (\(a^m \times a^n = a^{m+n}\)) is used in algebraic manipulation of the formula.

## FORWARD_NODE_IDS
c11_phy_cbse_07_006, c11_phy_cbse_07_007, c11_phy_cbse_07_010, c11_phy_cbse_07_011, c11_phy_cbse_07_012, c11_phy_cbse_07_013

## FORWARD_REASONS
c11_phy_cbse_07_006: Variation with depth uses a similar shell theorem approach; understanding altitude variation prepares for depth variation.
c11_phy_cbse_07_007: Rotation effect combines with altitude variation to give effective \(g\) at different latitudes.
c11_phy_cbse_07_010: Escape velocity derivation uses the gravitational potential at altitude \(h\), which depends on \(g_h\).
c11_phy_cbse_07_011: Orbital velocity of a satellite at height \(h\) requires \(g_h\) as centripetal acceleration.
c11_phy_cbse_07_012: Variation of g with altitude explains why orbital velocity decreases with height.  
c11_phy_cbse_07_013: Variation of g with altitude is required to compute true weight at orbital heights.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_01_001, c11_math_cbse_02_005, c9_math_ch1_4
## CROSS_SUBJECT_REASONS
c11_math_cbse_01_001: Sets and relations underlie the functional dependence \(g_h = f(h)\).
c11_math_cbse_02_005: Graph of \(g_h\) vs \(h\) is a hyperbola; understanding graph shapes helps visualise the decrease.
c9_math_ch1_4: Distance formula derivation using Pythagoras theorem is analogous to the geometric reasoning for spherical shells.

## CHAIN_DESCRIPTION
c11_phy_cbse_07_002 -> c11_phy_cbse_07_004 -> c11_phy_cbse_07_005 -> c11_phy_cbse_07_006

## THIS_FORMULA
\(g_h = g \left(\frac{R_E}{R_E + h}\right)^2 = \frac{GM_E}{(R_E + h)^2}\) (exact); for \(h \ll R_E\), \(g_h \approx g \left(1 - \frac{2h}{R_E}\right)\) (approximate). SI units: \(g_h\) in \(\text{m/s}^2\), \(R_E, h\) in \(\text{m}\), \(G\) in \(\text{N·m}^2/\text{kg}^2\), \(M_E\) in \(\text{kg}\).

## FORMULA_VARIABLES
\(g_h\) = acceleration due to gravity at height \(h\) (\(\text{m/s}^2\)), \(g\) = acceleration due to gravity at surface (\(\text{m/s}^2\)), \(R_E\) = radius of Earth (\(\text{m}\)), \(h\) = height above surface (\(\text{m}\)), \(G\) = universal gravitational constant (\(6.67 \times 10^{-11} \text{ N·m}^2/\text{kg}^2\)), \(M_E\) = mass of Earth (\(5.97 \times 10^{24} \text{ kg}\)).

## FORMULA_UNITS
\(\text{m/s}^2, \text{m}, \text{kg}, \text{N·m}^2/\text{kg}^2\)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_01_001 | Functional dependence \(g_h = f(h)\) is a real-valued function; domain \(h \ge 0\), range \(0 < g_h \le g\).
c11_math_cbse_02_005 | Graph of \(g_h\) vs \(h\) is a rectangular hyperbola; slope analysis shows rate of decrease.
c9_math_ch1_4 | Distance from Earth's centre \(r = R_E + h\) uses coordinate geometry; Pythagoras theorem appears in shell theorem proofs.

## PREREQ_CONCEPT
Newton's law of universal gravitation and the expression for \(g\) at Earth's surface (\(g = GM_E/R_E^2\)).

## PREREQ_BEFORE
Student must be able to substitute \(r = R_E + h\) into \(F = GM_E m/r^2\) and equate to \(m g_h\) to derive the exact formula.

## PREREQ_STUCK
Revisit the derivation of \(g = GM_E/R_E^2\) in node c11_phy_cbse_07_004 and practice algebraic substitution with \(r = R_E + h\).

## WORKED_EXAMPLE_1
PROBLEM: A mountaineer carries a 2 kg mass to the summit of Mount Everest (height 8848 m). Calculate the weight of the mass at the summit and the percentage change from its weight at sea level. Use \(R_E = 6370 \text{ km}\), \(g = 9.8 \text{ m/s}^2\).
STEPS:
- Step 1: Identify given: \(m = 2 \text{ kg}\), \(h = 8848 \text{ m} = 8.848 \text{ km}\), \(R_E = 6370 \text{ km}\), \(g = 9.8 \text{ m/s}^2\). Find weight \(W_h = m g_h\) and percentage change.
- Step 2: Use exact formula \(g_h = g \left(\frac{R_E}{R_E + h}\right)^2\). Convert all distances to same unit (km): \(R_E = 6370 \text{ km}\), \(h = 8.848 \text{ km}\).
- Step 3: Substitute: \(g_h = 9.8 \times \left(\frac{6370}{6370 + 8.848}\right)^2 = 9.8 \times \left(\frac{6370}{6378.848}\right)^2 = 9.8 \times (0.99861)^2 = 9.8 \times 0.99722 = 9.773 \text{ m/s}^2\).
- Step 4: Weight at summit \(W_h = 2 \times 9.773 = 19.546 \text{ N}\). Weight at sea level \(W_0 = 2 \times 9.8 = 19.6 \text{ N}\). Percentage change = \(\frac{19.546 - 19.6}{19.6} \times 100\% = -0.276\%\).
- Step 5: Verify: \(h/R_E \approx 0.0014 \ll 1\), so approximate formula \(g_h \approx 9.8(1 - 2 \times 0.0014) = 9.773 \text{ m/s}^2\) matches. Answer is physically reasonable (weight decreases slightly).
REASONING: The exact formula is used because \(h\) is not extremely small compared to \(R_E\) (though approximation works well). The weight decreases because gravitational force weakens with distance. The percentage change is small because \(h \ll R_E\).
ANSWER: Weight at summit = 19.55 N (approx), percentage decrease = 0.276%.

## WORKED_EXAMPLE_2
PROBLEM: A satellite is in a circular orbit at height 400 km above Earth's surface. Calculate the centripetal acceleration required for this orbit and compare it with the value of \(g\) at that altitude. Use \(R_E = 6370 \text{ km}\), \(g = 9.8 \text{ m/s}^2\).
STEPS:
- Step 1: Given: \(h = 400 \text{ km}\), \(R_E = 6370 \text{ km}\). Find \(g_h\) and centripetal acceleration \(a_c = v^2/(R_E + h)\). But for a satellite, \(a_c = g_h\) (gravity provides centripetal force).
- Step 2: Compute \(g_h\) using exact formula: \(g_h = 9.8 \times \left(\frac{6370}{6370 + 400}\right)^2 = 9.8 \times \left(\frac{6370}{6770}\right)^2 = 9.8 \times (0.9409)^2 = 9.8 \times 0.8853 = 8.676 \text{ m/s}^2\).
- Step 3: Centripetal acceleration required for circular orbit at that height is exactly \(g_h = 8.676 \text{ m/s}^2\).
- Step 4: Compare with surface \(g\): ratio = \(8.676 / 9.8 = 0.885\) (88.5%). The satellite experiences 88.5% of surface gravity.
- Step 5: Check orbital speed: \(v = \sqrt{g_h (R_E + h)} = \sqrt{8.676 \times 6.77 \times 10^6} = \sqrt{5.874 \times 10^7} = 7664 \text{ m/s} \approx 7.66 \text{ km/s}\), which matches known LEO speed. Reasonable.
REASONING: In a circular orbit, gravitational force provides the necessary centripetal force, so \(m g_h = m v^2 / (R_E + h)\) → \(g_h = v^2 / (R_E + h)\). Thus the centripetal acceleration equals \(g_h\) at that altitude.
ANSWER: \(g_h = 8.68 \text{ m/s}^2\) (centripetal acceleration = 8.68 m/s²), which is 88.5% of surface \(g\).

## WORKED_EXAMPLE_3
PROBLEM: At what height above Earth's surface does the acceleration due to gravity become half of its value at the surface? Use \(R_E = 6370 \text{ km}\). Also find the orbital period of a satellite at this height (use \(GM_E = g R_E^2\)).
STEPS:
- Step 1: Given: \(g_h = g/2\). Use exact formula: \(g/2 = g \left(\frac{R_E}{R_E + h}\right)^2\).
- Step 2: Simplify: \(1/2 = \left(\frac{R_E}{R_E + h}\right)^2\) → \(\frac{R_E + h}{R_E} = \sqrt{2}\) → \(1 + h/R_E = \sqrt{2}\) → \(h = R_E(\sqrt{2} - 1)\).
- Step 3: Substitute \(R_E = 6370 \text{ km}\): \(h = 6370 \times (1.4142 - 1) = 6370 \times 0.4142 = 2638 \text{ km}\).
- Step 4: Orbital period \(T = 2\pi \sqrt{\frac{(R_E + h)^3}{GM_E}}\). Use \(GM_E = g R_E^2 = 9.8 \times (6.37 \times 10^6)^2 = 3.98 \times 10^{14} \text{ m}^3/\text{s}^2\).
- Step 5: \(R_E + h = 6370 + 2638 = 9008 \text{ km} = 9.008 \times 10^6 \text{ m}\). \(T = 2\pi \sqrt{\frac{(9.008 \times 10^6)^3}{3.98 \times 10^{14}}} = 2\pi \sqrt{\frac{7.31 \times 10^{20}}{3.98 \times 10^{14}}} = 2\pi \sqrt{1.837 \times 10^6} = 2\pi \times 1355 = 8515 \text{ s} \approx 2.36 \text{ hours}\).
- Step 6: Verify: For \(h \approx 2638 \text{ km}\), \(g_h\) is half, so centripetal acceleration is half. Orbital speed \(v = \sqrt{g_h (R_E + h)} = \sqrt{4.9 \times 9.008 \times 10^6} = 6640 \text{ m/s}\). Period \(T = 2\pi (R_E + h)/v = 2\pi \times 9.008 \times 10^6 / 6640 = 8515 \text{ s}\). Consistent.
REASONING: The exact formula must be used because \(h\) is not \(\ll R_E\) (here \(h \approx 0.41 R_E\)). The problem combines altitude variation of \(g\) with orbital mechanics (Kepler's third law / centripetal force).
ANSWER: Height = 2638 km, Orbital period = 2.36 hours (8515 s).

## COMPETENCY_QUESTION_1
QUESTION: A physics student argues: "Since \(g\) decreases with altitude, a pendulum clock taken to a high mountain will run slower. But the clock's period also depends on length, and metals expand with temperature. On a mountain, temperature is lower, so the pendulum contracts, making it run faster. These two effects might cancel." Evaluate this claim quantitatively. Assume a brass pendulum (\(\alpha = 1.9 \times 10^{-5} \text{ K}^{-1}\)), temperature lapse rate 6.5 K/km, and mountain height 3 km. Calculate the fractional change in period due to each effect and the net change.
COMPETENCY: Predicting outcomes from changing variables and unit analysis
STEPS:
- Step 1: Period of pendulum \(T = 2\pi\sqrt{L/g}\). Fractional change \(\Delta T/T = \frac{1}{2}(\Delta L/L - \Delta g/g)\).
- Step 2: Altitude effect on \(g\): \(\Delta g/g \approx -2h/R_E = -2 \times 3000 / 6.37 \times 10^6 = -9.42 \times 10^{-4}\) (decrease).
- Step 3: Temperature change: \(\Delta T_{\text{temp}} = -6.5 \text{ K/km} \times 3 \text{ km} = -19.5 \text{ K}\). Thermal contraction: \(\Delta L/L = \alpha \Delta T = 1.9 \times 10^{-5} \times (-19.5) = -3.705 \times 10^{-4}\) (decrease).
- Step 4: Net fractional period change: \(\Delta T/T = \frac{1}{2}(-3.705 \times 10^{-4} - (-9.42 \times 10^{-4})) = \frac{1}{2}(5.715 \times 10^{-4}) = 2.86 \times 10^{-4}\).
- Step 5: Period increases by 0.0286%. The clock runs slower (loses time). The effects do not cancel; gravity effect dominates.
ANSWER: Net fractional increase in period = \(2.86 \times 10^{-4}\) (clock runs slower). Gravity effect (-0.094%) is larger than thermal contraction effect (+0.037% on period).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The Gravitational Potential Energy (GPE) of a satellite of mass \(m\) at height \(h\) is \(U = -\frac{GM_E m}{R_E + h}\). Using the relation \(g_h = \frac{GM_E}{(R_E + h)^2}\), express \(U\) in terms of \(g_h\) and \(h\). Then, show that for \(h \ll R_E\), the difference in GPE between height \(h\) and the surface approximates to \(mgh\). Explain why this approximation fails for large \(h\).
COMPETENCY: Interpreting physical situations using formulas and connecting concepts across nodes
STEPS:
- Step 1: From \(g_h = \frac{GM_E}{(R_E + h)^2}\), we have \(GM_E = g_h (R_E + h)^2\). Substitute into \(U\): \(U = -\frac{g_h (R_E + h)^2 m}{R_E + h} = -m g_h (R_E + h)\).
- Step 2: At surface (\(h=0\)), \(U_0 = -m g R_E\). At height \(h\), \(U_h = -m g_h (R_E + h)\).
- Step 3: Difference \(\Delta U = U_h - U_0 = -m g_h (R_E + h) + m g R_E\). For \(h \ll R_E\), \(g_h \approx g(1 - 2h/R_E)\).
- Step 4: Substitute: \(\Delta U \approx -m g(1 - 2h/R_E)(R_E + h) + m g R_E = -m g(R_E + h - 2h - 2h^2/R_E) + m g R_E = -m g(R_E - h) + m g R_E = m g h\) (neglecting \(h^2/R_E\)).
- Step 5: Approximation fails for large \(h\) because \(g_h\) is not constant; the linear approximation \(g_h \approx g(1 - 2h/R_E)\) breaks down, and the exact \(\Delta U = GM_E m \left(\frac{1}{R_E} - \frac{1}{R_E + h}\right)\) must be used.
ANSWER: \(U = -m g_h (R_E + h)\). For \(h \ll R_E\), \(\Delta U \approx mgh\). Fails for large \(h\) because \(g\) varies significantly and the binomial approximation is invalid.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are ______ on the terrace of a tall building like the Qutub Minar (73 m) and then on the roof of the Burj Khalifa (828 m).

## DIAGNOSTIC_ANSWER_7
standing

**A wrong answer ("looking" or "sitting") reveals the student has paraphrased the walkthrough's participle - you are standing on the terrace.** Standing is the walkthrough's own participle, and the participle is what the blank grades. Recall the two towers before filling, and fill the word exactly as written.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Use a spring balance to measure the weight of a ______ kg mass at ground level and at the top of a tall building — the reading decreases slightly.

## DIAGNOSTIC_ANSWER_8
1

**A wrong answer (2 or any other figure) reveals the student has drifted from the walkthrough - the test mass is a 1 kg standard.** The 1 is the walkthrough's own mass figure. Recall the slight reading drop before filling, and give the figure exactly.
