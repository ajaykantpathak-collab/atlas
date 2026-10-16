## ELI5
Flute bright with every harmonic, shehnai reedy and missing its evens - pipe physics in two instruments. Standing waves in an air column: closed ends force displacement nodes, open ends demand antinodes. An open-open pipe allows all harmonics; a closed-open one admits only odds. The boundary conditions are the bouncer, and the harmonics are the guest list.

## DEFINITION
Standing waves in pipes are stationary wave patterns formed by the superposition of incident and reflected longitudinal sound waves in an air column, where the boundary conditions (closed end = displacement node/pressure antinode, open end = displacement antinode/pressure node) restrict the allowed wavelengths to discrete values. For a pipe closed at one end, only odd harmonics are present with fundamental frequency \( \nu_1 = \frac{v}{4L} \); for a pipe open at both ends, all harmonics are present with fundamental frequency \( \nu_1 = \frac{v}{2L} \), where \( v \) is the speed of sound in air (m/s) and \( L \) is the pipe length (m).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can: (1) Identify whether a given pipe is open or closed from a diagram or description and state the correct harmonic series formula; (2) Calculate the fundamental frequency and higher harmonics for a given pipe length and speed of sound; (3) Determine which harmonic resonates with a given source frequency; (4) Explain why a closed pipe produces only odd harmonics while an open pipe produces all harmonics, using node/antinode positions at boundaries.

## SCOPE_BOUNDARY
Covers: Standing waves in organ pipes (air columns) with one end closed or both ends open; derivation of allowed wavelengths/frequencies from boundary conditions; resonance with a tuning fork; end correction (qualitative mention only). Does NOT cover: Standing waves in strings (covered in c11_phy_cbse_14_007), beats (c11_phy_cbse_14_009), Doppler effect (c11_phy_cbse_14_010/011), or quantitative end correction calculations.

## WALKTHROUGH
Observe a flute (open at both ends) and a shehnai (closed at one end) being played in a school concert. Notice the flute produces a bright tone with all harmonics, while the shehnai has a reedy tone missing even harmonics. To understand why, start by recalling that sound reflects at a closed end with a phase reversal (node) and at an open end without phase reversal (antinode) — from c11_phy_cbse_14_012. Sketch the simplest standing wave pattern that satisfies these boundary conditions: for a closed pipe, a quarter-wave fits (node at closed end, antinode at open end); for an open pipe, a half-wave fits (antinodes at both ends). Measure the pipe length \( L \) and use the speed of sound \( v \) to compute the fundamental frequency. Then generalize to higher modes by fitting additional half-wavelengths (open) or quarter-wavelengths (closed) while maintaining the boundary conditions.

Takeaway: mastery means applying the node-antinode boundary conditions to open and closed pipes, and predicting each one's harmonic menu. Exam moves: find-the-harmonics questions and compare-flute-and-shehnai items. Check yourself: a closed end is a displacement node but a pressure antinode - the two descriptions are one fact in two dialects. Students miss it because they mix the dialects, when the definition's table is consistent: displacement rules at rigid walls, pressure rules at openings, and the harmonic menus follow whichever dialect you count in.

## DIAGNOSTIC_QUESTION_1
What is the fundamental frequency of a pipe closed at one end of length 0.5 m if the speed of sound in air is 330 m/s?

## DIAGNOSTIC_ANSWER_1
The fundamental frequency is \( \nu_1 = \frac{v}{4L} = \frac{330}{4 \times 0.5} = 165 \text{ Hz} \). A wrong answer (e.g., using \( \frac{v}{2L} \)) reveals the student has confused the closed-pipe formula with the open-pipe formula, indicating they haven't internalized the boundary condition difference (node at closed end vs antinode at both ends).

## DIAGNOSTIC_QUESTION_2
Why does a pipe closed at one end produce only odd harmonics (1st, 3rd, 5th, ...) while a pipe open at both ends produces all harmonics (1st, 2nd, 3rd, ...)?

## DIAGNOSTIC_ANSWER_2
In a closed pipe, the closed end must be a displacement node and the open end a displacement antinode. The distance between a node and the nearest antinode is \( \lambda/4 \), and additional segments must be half-wavelengths (\( \lambda/2 \)) to maintain the pattern, giving allowed lengths \( L = (2n-1)\lambda/4 \) (odd multiples of \( \lambda/4 \)). In an open pipe, both ends are antinodes, so the distance between them must be an integer multiple of \( \lambda/2 \), giving \( L = n\lambda/2 \) (all integers). A student who says "closed pipes have only odd harmonics because they are shorter" reveals a superficial memorization without understanding the node/antinode constraint.

## DIAGNOSTIC_QUESTION_3
A 30 cm long pipe open at both ends resonates with a tuning fork of frequency 1.1 kHz. Given speed of sound = 330 m/s, which harmonic mode is excited? If one end is now closed, will the same tuning fork still produce resonance? Explain.

## DIAGNOSTIC_ANSWER_3
For open pipe: \( \nu_n = n \frac{v}{2L} = n \frac{330}{0.6} = 550n \text{ Hz} \). For 1100 Hz, \( n = 2 \) (second harmonic). For closed pipe: fundamental \( = \frac{330}{4 \times 0.3} = 275 \text{ Hz} \); harmonics are odd multiples: 275, 825, 1375 Hz. 1100 Hz is not an odd multiple of 275 Hz, so no resonance. A wrong answer (e.g., saying resonance occurs because 1100 is a multiple of 275) shows the student doesn't recognize that only odd harmonics are allowed in a closed pipe.

## DIAGNOSTIC_QUESTION_4
Two organ pipes of equal length are sounded together. Pipe A is open at both ends, Pipe B is closed at one end. The fundamental frequency of Pipe A is 256 Hz. What is the fundamental frequency of Pipe B? If both pipes are excited at their third harmonics, what is the beat frequency heard?

## DIAGNOSTIC_ANSWER_4
For Pipe A (open): \( \nu_{1A} = \frac{v}{2L} = 256 \text{ Hz} \). For Pipe B (closed): \( \nu_{1B} = \frac{v}{4L} = \frac{1}{2} \frac{v}{2L} = 128 \text{ Hz} \). Third harmonic of A: \( 3 \times 256 = 768 \text{ Hz} \). Third harmonic of B (which is the 3rd odd harmonic, i.e., n=3 in \( (2n-1)\nu_1 \)): \( 3 \times 128 = 384 \text{ Hz} \). Beat frequency = \( |768 - 384| = 384 \text{ Hz} \). A student who uses \( 3 \times 128 = 384 \) for B's third harmonic but thinks it's the 5th harmonic (5×128=640) reveals confusion about harmonic numbering in closed pipes (only odd harmonics exist, so the "third harmonic" means the third allowed frequency, which is 3×fundamental).

## DIAGNOSTIC_QUESTION_5
A student claims: "In a closed pipe, the pressure variation is maximum at the closed end and zero at the open end. Therefore, the closed end is a pressure antinode and the open end is a pressure node." Evaluate this statement and explain how it relates to displacement nodes/antinodes.

## DIAGNOSTIC_ANSWER_5
The statement is correct. Pressure and displacement are 90° out of phase in a standing sound wave: a displacement node (zero displacement amplitude) corresponds to a pressure antinode (maximum pressure variation), and a displacement antinode corresponds to a pressure node. At the closed end, air cannot move (displacement node) so pressure varies maximally (pressure antinode). At the open end, air moves freely (displacement antinode) so pressure equals atmospheric pressure (pressure node). A student who says "pressure is maximum at the open end because the wave is open" confuses displacement and pressure boundary conditions.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a resonance tube (a cylindrical tube with a movable piston/water level) and a set of tuning forks to determine the speed of sound in air at room temperature. Describe the procedure, measurements, and formula you would use.

## DIAGNOSTIC_ANSWER_6
Procedure: (1) Fill a resonance tube with water, leaving an air column of adjustable length. (2) Strike a tuning fork of known frequency \( \nu \) and hold it over the open end. (3) Lower the water level (or raise the tube) until a loud resonance is heard (first resonance). Measure the air column length \( L_1 \). (4) Continue lowering to find the next resonance (second resonance) and measure length \( L_2 \). (5) For a closed pipe, \( L_2 - L_1 = \lambda/2 \). So \( \lambda = 2(L_2 - L_1) \). (6) Speed of sound \( v = \nu \lambda = 2\nu (L_2 - L_1) \). A poor answer that only finds one resonance length and uses \( L = \lambda/4 \) without end correction reveals ignorance of the end correction and the advantage of using two resonances to eliminate it.

## COMMON_MISCONCEPTION
Students often think that the "third harmonic" of a closed pipe means \( n=3 \) in the formula \( \nu_n = n \frac{v}{4L} \), giving \( 3v/4L \), but then they incorrectly assume the next harmonic is \( 4v/4L = v/L \) (i.e., they think all integer multiples exist). The correct interpretation is that only odd integer multiples of the fundamental exist: \( \nu_1 = v/4L \), \( \nu_3 = 3v/4L \), \( \nu_5 = 5v/4L \), etc. The harmonic number \( n \) in the formula \( \nu_n = n \frac{v}{4L} \) runs over odd integers only (1, 3, 5...). Another error: confusing the end correction (0.6r) with the pipe length, leading to using \( L \) instead of effective length \( L + 0.6r \) in calculations when the radius is given.

## ON_FAILURE
If a student confuses harmonic numbering: (1) Have them draw the standing wave patterns for the first three modes of a closed pipe, labeling nodes (N) and antinodes (A). (2) Count the number of quarter-wavelengths in each pattern: 1, 3, 5. (3) Relate each pattern to the formula \( L = (2m-1)\lambda/4 \) where m=1,2,3... (4) Show that the frequency is \( \nu = v/\lambda = (2m-1)v/4L \). (5) Emphasize that "m-th harmonic" in a closed pipe means the m-th allowed mode, which corresponds to the (2m-1)-th harmonic of the fundamental frequency series. For end correction confusion: perform a lab demonstration with two pipes of same length but different radii, showing the resonance length differs slightly.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_14_005, c11_phy_cbse_14_006, c11_phy_cbse_14_007, c11_phy_cbse_14_012, c9_physics_ch5_1, c9_physics_ch5_3, c9_physics_ch5_4, c9_physics_ch5_6, c11_phy_cbse_14_002, c11_phy_cbse_14_003, c11_phy_cbse_14_009, c11_phy_cbse_14_010

## PREREQUISITE_REASONS
c11_phy_cbse_14_005: Principle of superposition is required to understand how incident and reflected waves form standing waves.
c11_phy_cbse_14_006: Interference (constructive/destructive) explains the formation of nodes and antinodes in standing waves.
c11_phy_cbse_14_007: Standing waves in strings provide the analogous concept of boundary conditions (fixed ends = nodes) which transfers to pipes (closed end = node, open end = antinode).
c11_phy_cbse_14_012: Reflection of waves with phase change at rigid boundary (closed end) and without phase change at open boundary is the direct cause of the boundary conditions for pipes.
c9_physics_ch5_1: Production of sound by vibrations (tuning forks) is the source used in resonance experiments.
c9_physics_ch5_3: Sound as longitudinal waves with compressions/rarefactions is the wave type in pipes.
c9_physics_ch5_4: Relationship between wavelength, frequency, and time period is needed to connect pipe length to frequency.
c9_physics_ch5_6: Speed of sound in air is the wave speed \( v \) used in all frequency calculations.
c11_phy_cbse_14_002: Standing waves in pipes use speed of sound v = √(γP/ρ) to find resonant frequencies.  
c11_phy_cbse_14_003: Standing waves in pipes (organ pipes, resonance tube) require the speed of sound in air as input.  
c11_phy_cbse_14_009: e mention only). Does NOT cover: Standing waves in strings (covered in c11_phy_cbse_14_007), beats (c11_phy_cbse_14_009), Doppler effect (c11_phy_cbse_14_010/011), or quantitative end correction calculations.  
c11_phy_cbse_14_010: ing waves in strings (covered in c11_phy_cbse_14_007), beats (c11_phy_cbse_14_009), Doppler effect (c11_phy_cbse_14_010/011), or quantitative end correction calculations.  

## FORWARD_NODE_IDS
c11_phy_cbse_14_011

## FORWARD_REASONS
c11_phy_cbse_14_011: Same as above; the Doppler shift formulas require the source frequency, which for a pipe is determined by its harmonic series.

## CROSS_SUBJECT_PREREQS
c9_math_ch8_4, c9_math_ch8_5, c10_math_cbse_08_006
## CROSS_SUBJECT_REASONS
c9_math_ch8_4: Arithmetic progression (AP) models the harmonic frequencies of an open pipe (ν, 2ν, 3ν, ...) and the odd harmonics of a closed pipe (ν, 3ν, 5ν, ...) which are also an AP with common difference 2ν.
c9_math_ch8_5: The nth term formula of an AP (\( a_n = a + (n-1)d \)) directly gives the frequency of the nth harmonic for open pipes and the m-th allowed mode for closed pipes.
c10_math_cbse_08_006: Trigonometric identity \( \sin^2\theta + \cos^2\theta = 1 \) is used in deriving the standing wave equation from superposition of two travelling waves (e.g., \( \sin(kx-\omega t) + \sin(kx+\omega t) = 2\sin kx \cos \omega t \)).

## CHAIN_DESCRIPTION
c11_phy_cbse_14_005 -> c11_phy_cbse_14_006 -> c11_phy_cbse_14_012 -> c11_phy_cbse_14_008 -> c11_phy_cbse_14_009

## THIS_FORMULA
Open pipe: \( \nu_n = n \frac{v}{2L} \) (n = 1, 2, 3, ...); Closed pipe: \( \nu_n = n \frac{v}{4L} \) (n = 1, 3, 5, ...) or \( \nu_m = (2m-1) \frac{v}{4L} \) (m = 1, 2, 3, ...); End correction (qualitative): effective length \( L_{\text{eff}} = L + 0.6r \) for an open end (r = radius).

## FORMULA_VARIABLES
\( \nu_n \) = frequency of nth harmonic (Hz); \( v \) = speed of sound in air (m/s); \( L \) = length of pipe (m); \( n \) = harmonic number (integer for open pipe, odd integer for closed pipe); \( m \) = mode number (1, 2, 3, ...) for closed pipe; \( r \) = radius of pipe (m) for end correction.

## FORMULA_UNITS
Hz, m/s, m, dimensionless, m

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch8_4 | The harmonic frequencies of an open pipe form an arithmetic progression with first term \( v/2L \) and common difference \( v/2L \); the allowed frequencies of a closed pipe form an arithmetic progression with first term \( v/4L \) and common difference \( v/2L \).
c10_math_cbse_08_006 | The trigonometric identity \( \sin A + \sin B = 2 \sin\frac{A+B}{2} \cos\frac{A-B}{2} \) is used to derive the standing wave equation \( y = 2a \sin kx \cos \omega t \) from superposition of two travelling waves in opposite directions.

## PREREQ_CONCEPT
Standing waves are formed by superposition of two identical waves travelling in opposite directions; boundary conditions at the ends of the pipe (node at closed end, antinode at open end) select only specific wavelengths.

## PREREQ_BEFORE
The student must be able to draw standing wave patterns for strings fixed at both ends (nodes at both ends) and identify the relationship between string length and wavelength for each harmonic.

## PREREQ_STUCK
Review the standing wave patterns for a string fixed at both ends (c11_phy_cbse_14_007) and the reflection of waves at rigid and open boundaries (c11_phy_cbse_14_012). Practice drawing the first three modes for each case.

## WORKED_EXAMPLE_1
PROBLEM: A cylindrical pipe of length 50 cm and radius 2 cm is closed at one end. It is sounded with a tuning fork of frequency 340 Hz. The speed of sound in air is 340 m/s. (a) Find the fundamental frequency of the pipe. (b) Which harmonic of the pipe resonates with the tuning fork? (c) If the pipe is now opened at both ends, what is the new fundamental frequency and which harmonic will resonate with the same tuning fork?

STEPS:
- Step 1: Identify given quantities: L = 0.50 m, r = 0.02 m, v = 340 m/s, source frequency = 340 Hz. Pipe initially closed at one end.
- Step 2: For closed pipe, fundamental frequency \( \nu_1 = \frac{v}{4L} \). (Ignore end correction as radius is small and not asked for precise value).
- Step 3: Compute \( \nu_1 = \frac{340}{4 \times 0.50} = \frac{340}{2} = 170 \text{ Hz} \).
- Step 4: Allowed harmonics are odd multiples: 170 Hz, 510 Hz, 850 Hz, ... The tuning fork frequency 340 Hz is not an odd multiple of 170 Hz (340/170 = 2, which is even). So no resonance with closed pipe.
- Step 5: For open pipe, fundamental frequency \( \nu_1' = \frac{v}{2L} = \frac{340}{2 \times 0.50} = 340 \text{ Hz} \). This exactly matches the tuning fork frequency, so the fundamental (first harmonic) resonates.
- Step 6: Verify: For open pipe, harmonics are 340, 680, 1020 Hz... 340 Hz is the first harmonic.

REASONING: The boundary conditions dictate the allowed wavelengths. A closed pipe requires a node at the closed end and antinode at the open end, giving quarter-wave resonances. An open pipe requires antinodes at both ends, giving half-wave resonances. The same pipe length therefore has a fundamental frequency twice as high when opened, shifting the harmonic series.

ANSWER: (a) 170 Hz; (b) No resonance (340 Hz is not an odd harmonic of 170 Hz); (c) Open pipe fundamental = 340 Hz, first harmonic resonates.

## WORKED_EXAMPLE_2
PROBLEM: A resonance tube experiment is performed with a tuning fork of frequency 512 Hz. The first resonance is observed when the air column length is 16.0 cm, and the second resonance at 50.0 cm. The radius of the tube is 1.5 cm. Calculate the speed of sound in air and the end correction. Compare the end correction with the theoretical value 0.6r.

STEPS:
- Step 1: Given: \( \nu = 512 \text{ Hz} \), \( L_1 = 0.160 \text{ m} \), \( L_2 = 0.500 \text{ m} \), \( r = 0.015 \text{ m} \).
- Step 2: For a closed pipe, the first resonance occurs at \( L_1 + e = \lambda/4 \) and second at \( L_2 + e = 3\lambda/4 \), where e is end correction.
- Step 3: Subtract: \( (L_2 + e) - (L_1 + e) = 3\lambda/4 - \lambda/4 = \lambda/2 \). So \( \lambda = 2(L_2 - L_1) = 2(0.500 - 0.160) = 0.680 \text{ m} \).
- Step 4: Speed of sound \( v = \nu \lambda = 512 \times 0.680 = 348.16 \text{ m/s} \).
- Step 5: Find end correction e: \( L_1 + e = \lambda/4 = 0.680/4 = 0.170 \text{ m} \). So \( e = 0.170 - 0.160 = 0.010 \text{ m} = 1.0 \text{ cm} \).
- Step 6: Theoretical end correction = 0.6r = 0.6 × 1.5 cm = 0.9 cm. Experimental e = 1.0 cm, close to theoretical (difference due to experimental error, temperature, etc.).

REASONING: Using two resonance lengths eliminates the unknown end correction e when calculating wavelength. The speed of sound is then found from v = νλ. The end correction is then back-calculated from the first resonance condition.

ANSWER: Speed of sound = 348 m/s (approx), end correction = 1.0 cm (theoretical 0.9 cm).

## WORKED_EXAMPLE_3
PROBLEM: An organ pipe P1 closed at one end and another pipe P2 open at both ends are tuned to the same fundamental frequency of 256 Hz. The speed of sound is 330 m/s. (a) Find the lengths of P1 and P2. (b) The pipes are now sounded together at their third harmonics. Calculate the beat frequency. (c) If the temperature rises, increasing the speed of sound to 340 m/s, what are the new fundamental frequencies? Will the pipes still be in tune with each other?

STEPS:
- Step 1: For P1 (closed): \( \nu_1 = \frac{v}{4L_1} \Rightarrow L_1 = \frac{v}{4\nu_1} = \frac{330}{4 \times 256} = 0.322 \text{ m} \). For P2 (open): \( \nu_1 = \frac{v}{2L_2} \Rightarrow L_2 = \frac{v}{2\nu_1} = \frac{330}{2 \times 256} = 0.645 \text{ m} \).
- Step 2: Third harmonic of P1 (closed): only odd harmonics exist. The third allowed mode is n=3 in \( \nu_n = n \frac{v}{4L} \), so \( \nu_{3,P1} = 3 \times 256 = 768 \text{ Hz} \). Third harmonic of P2 (open): \( \nu_{3,P2} = 3 \times 256 = 768 \text{ Hz} \). Beat frequency = |768 - 768| = 0 Hz. (They are in unison at third harmonic too because both are 3×fundamental).
- Step 3: New speed v' = 340 m/s. Lengths unchanged. New fundamental P1: \( \nu_1' = \frac{340}{4 \times 0.322} = 264 \text{ Hz} \). New fundamental P2: \( \nu_1' = \frac{340}{2 \times 0.645} = 264 \text{ Hz} \). Both increase by same factor (340/330), so they remain in tune with each other.
- Step 4: Note: The ratio of lengths L2/L1 = 2 is maintained, so both pipes' frequencies scale identically with v.

REASONING: The fundamental frequency of a closed pipe is half that of an open pipe of the same length. To have the same fundamental, the closed pipe must be half the length of the open pipe. Since both frequencies are proportional to v, any change in v affects both equally, preserving their tuning relative to each other.

ANSWER: (a) P1 length = 0.322 m, P2 length = 0.645 m; (b) Beat frequency = 0 Hz; (c) New fundamentals = 264 Hz each, pipes remain in tune.

## COMPETENCY_QUESTION_1
QUESTION: A student performs a resonance tube experiment with a tuning fork of frequency 480 Hz. She obtains the first resonance at 17.5 cm and the second resonance at 54.5 cm. She calculates the speed of sound as 352 m/s. Later, she repeats the experiment with the same tuning fork but uses a tube of larger radius (3 cm instead of 1.5 cm). She finds the first resonance at 17.0 cm and the second at 54.0 cm. (a) Calculate the end correction for each tube. (b) Explain why the end correction changes with radius. (c) Will the calculated speed of sound change? Justify.

COMPETENCY: Interpreting physical situations using formulas and explaining the effect of changing parameters on experimental results.

STEPS:
- Step 1: For first tube (r=1.5 cm): λ = 2(L2 - L1) = 2(54.5 - 17.5) = 74.0 cm = 0.74 m. v = νλ = 480 × 0.74 = 355.2 m/s (close to given 352, rounding). e = λ/4 - L1 = 18.5 - 17.5 = 1.0 cm. Theoretical 0.6r = 0.9 cm.
- Step 2: For second tube (r=3 cm): λ = 2(54.0 - 17.0) = 74.0 cm (same). v = 355.2 m/s (same). e = 18.5 - 17.0 = 1.5 cm. Theoretical 0.6r = 1.8 cm.
- Step 3: End correction increases with radius because the antinode forms slightly outside the open end; the effective length extension is proportional to the radius (approximately 0.6r).
- Step 4: Speed of sound calculated from v = ν × 2(L2 - L1) is independent of end correction because the difference L2 - L1 eliminates e. So v remains unchanged.

ANSWER: (a) Tube 1: e ≈ 1.0 cm; Tube 2: e ≈ 1.5 cm. (b) End correction is proportional to radius (≈0.6r) because the air vibration extends further outside a wider tube. (c) No, speed of sound does not change; it is calculated from the difference in resonance lengths which cancels the end correction.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Two organ pipes, A (closed at one end) and B (open at both ends), have lengths in the ratio 1:2. They are sounded together in their fundamental modes. (a) What is the ratio of their fundamental frequencies? (b) If the length of pipe A is increased by 10% and the length of pipe B is decreased by 10%, what is the new ratio of their fundamental frequencies? (c) A tuning fork of frequency 440 Hz is sounded with the modified pipes. Which pipe (if any) will resonate with the tuning fork in its fundamental mode? Assume speed of sound = 330 m/s and original length of A = 0.25 m.

COMPETENCY: Predicting outcomes from changing variables and applying formulas to a multi-step physical scenario.

STEPS:
- Step 1: Original lengths: L_A = 0.25 m, L_B = 0.50 m (ratio 1:2). Original fundamentals: ν_A = v/(4L_A) = 330/(4×0.25) = 330 Hz. ν_B = v/(2L_B) = 330/(2×0.50) = 330 Hz. Ratio = 1:1.
- Step 2: New lengths: L_A' = 0.25 × 1.10 = 0.275 m. L_B' = 0.50 × 0.90 = 0.45 m.
- Step 3: New fundamentals: ν_A' = 330/(4×0.275) = 300 Hz. ν_B' = 330/(2×0.45) = 366.67 Hz. Ratio = 300 : 366.67 = 9 : 11 (or 0.818).
- Step 4: Tuning fork = 440 Hz. Compare: ν_A' = 300 Hz (not 440). ν_B' = 366.67 Hz (not 440). Neither resonates in fundamental mode.
- Step 5: Check harmonics: Pipe A (closed) harmonics: 300, 900, 1500... (odd multiples). Pipe B (open) harmonics: 366.67, 733.33, 1100... (all multiples). 440 Hz is not a harmonic of either modified pipe.

ANSWER: (a) 1:1; (b) 9:11 (or 0.818); (c) Neither pipe resonates with 440 Hz in fundamental or harmonic modes.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Standing waves in pipes are stationary wave patterns formed by the ______ of incident and reflected longitudinal sound waves in an air column, where the boundary conditions (closed end = displacement node/pressure antinode, open end = displacement antinode/pressure node) restrict the allowed wavelengths to discrete values.

## DIAGNOSTIC_ANSWER_7
superposition

**A wrong answer ("interference" or "reflection" alone) reveals the student has swapped the definition's builder - standing pipe waves are formed by superposition.** Superposition is the definition's own builder, and the noun is what the blank grades. Recall the incident-and-reflected pair before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: ______ a flute (open at both ends) and a shehnai (closed at one end) being played in a school concert.

## DIAGNOSTIC_ANSWER_8
Observe

**A wrong answer ("Imagine" or "Watch") reveals the student has swapped the walkthrough's opener - observe a flute and a shehnai played together.** Observe is the walkthrough's own opening verb, and the verb is what the blank grades. Recall the missing even harmonics before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_9
What is Standing waves in pipes? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Standing waves in pipes are stationary wave patterns formed by the superposition of incident and reflected longitudinal sound waves in an air column, where the boundary conditions (closed end = displacement node/pressure antinode, open end = displacement antinode/pressure node) restrict the allowed wavelengths to discrete values.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can: (1) Identify whether a given pipe is open or closed from a diagram or description and state the correct harmonic series formula; (2) Calculate the fundamental frequency and higher harmonics for a given pipe length and speed of sound; (3) Determine which harmonic resonates with a given source frequency; (4) Explain why a.
