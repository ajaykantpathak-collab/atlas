## ELI5
The train's horn droops the instant it passes - the Doppler Effect, motion bending apparent pitch. Wavefronts bunch ahead of a closing source and stretch behind a receding one; the observer's own motion stacks the counts too. The formula prices each role separately, and only the component of velocity along the line of sight gets billed.

## DEFINITION
The Doppler Effect is the apparent change in frequency (or wavelength) of a wave when there is relative motion between the source of the wave and the observer. For sound waves in a stationary medium, the observed frequency \(f'\) is given by \(f' = f \left(\frac{v \pm v_o}{v \mp v_s}\right)\), where \(f\) is the source frequency, \(v\) is the speed of sound in the medium, \(v_o\) is the speed of the observer (positive if moving toward the source), and \(v_s\) is the speed of the source (positive if moving toward the observer). The upper signs apply when source and observer approach each other; lower signs apply when they recede.

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student can derive the Doppler shift formula for all three cases (source moving, observer moving, both moving) from first principles using wavefront arguments, correctly apply sign conventions in numerical problems involving multiple moving objects, and explain why the effect is symmetric for light but asymmetric for sound (medium dependence).

## SCOPE_BOUNDARY
Covers the classical Doppler Effect for sound waves in a stationary medium with source and observer moving along the line joining them. Does NOT cover relativistic Doppler Effect (Class 12), Doppler Effect in accelerating frames, transverse Doppler Effect, or applications involving shock waves (Mach cones).

## WALKTHROUGH
Stand near a railway crossing and listen to a train's horn as it approaches and passes you — the pitch drops sharply at the moment it crosses. This everyday observation is the Doppler Effect. Begin by drawing wavefronts as concentric circles for a stationary source, then compress them in front and stretch them behind for a moving source. Count how many wavefronts cross the observer per second in each case. Connect this to the formula \(f' = f \frac{v \pm v_o}{v \mp v_s}\) by noting that relative speed of wavefronts reaching the observer changes. The key insight: for sound, the medium defines a preferred frame, so source motion and observer motion produce different formulas — unlike light where only relative velocity matters.

Takeaway: mastery means attributing the frequency shift to source and observer motions separately, and computing with the line-of-sight components. Exam moves: find-the-observed-frequency questions and explain-the-drop items. Check yourself: the pitch drops at the crossing because the line-of-sight component flips - not because distance changes abruptly. Students miss it because they bill total speed, when the definition's formula only charges the approach component: sideways motion is invisible to the shift, and the crossing instant is where the bill changes sign.

## DIAGNOSTIC_QUESTION_1
A stationary source emits sound of frequency 500 Hz. An observer moves toward the source at 20 m/s. If the speed of sound is 340 m/s, what is the observed frequency? Write the formula you use and identify each variable with its sign.

## DIAGNOSTIC_ANSWER_1
Formula: \(f' = f \frac{v + v_o}{v}\) (observer moving toward stationary source). Given: \(f = 500 \text{ Hz}\), \(v = 340 \text{ m/s}\), \(v_o = +20 \text{ m/s}\) (toward source). \(f' = 500 \times \frac{340 + 20}{340} = 500 \times \frac{360}{340} \approx 529.4 \text{ Hz}\). A wrong answer (e.g., 470 Hz) reveals the student used the wrong sign for \(v_o\) or confused the formula with the source-moving case \(f' = f \frac{v}{v - v_s}\).

## DIAGNOSTIC_QUESTION_2
Explain why the Doppler shift for a source moving toward a stationary observer at speed \(v_s\) is \(f' = f \frac{v}{v - v_s}\), while for an observer moving toward a stationary source at the same speed \(v_o = v_s\), the shift is \(f' = f \frac{v + v_o}{v}\). Why are these two expressions not equal even though the relative speed is the same?

## DIAGNOSTIC_ANSWER_2
Sound requires a medium; the wave speed \(v\) is defined relative to the medium. When the source moves, it compresses wavefronts in the medium, altering the wavelength \(\lambda' = \frac{v - v_s}{f}\). The observer receives these shortened waves at speed \(v\), so \(f' = \frac{v}{\lambda'} = f \frac{v}{v - v_s}\). When the observer moves, the wavelength in the medium is unchanged (\(\lambda = v/f\)), but the observer encounters wavefronts at relative speed \(v + v_o\), giving \(f' = \frac{v + v_o}{\lambda} = f \frac{v + v_o}{v}\). The asymmetry arises because the medium breaks Galilean relativity for sound. A student who claims they are equal confuses sound with light (where no medium exists).

## DIAGNOSTIC_QUESTION_3
A police car with a siren of frequency 800 Hz moves at 30 m/s toward a stationary observer. Simultaneously, the observer starts running toward the police car at 5 m/s. Speed of sound = 330 m/s. Calculate the observed frequency. Show all steps with units.

## DIAGNOSTIC_ANSWER_3
Step 1: Identify given: \(f = 800 \text{ Hz}\), \(v = 330 \text{ m/s}\), \(v_s = +30 \text{ m/s}\) (source toward observer), \(v_o = +5 \text{ m/s}\) (observer toward source).
Step 2: Formula for both moving toward each other: \(f' = f \frac{v + v_o}{v - v_s}\).
Step 3: Substitute: \(f' = 800 \times \frac{330 + 5}{330 - 30} = 800 \times \frac{335}{300}\).
Step 4: Compute: \(\frac{335}{300} = 1.1167\), \(f' = 800 \times 1.1167 = 893.3 \text{ Hz}\).
Step 5: Check: Both motions increase frequency, so \(f' > 800 \text{ Hz}\) — physically reasonable. A wrong answer like 853 Hz suggests using \(f' = f \frac{v}{v - v_s}\) (ignoring observer motion) or sign error in \(v_o\).

## DIAGNOSTIC_QUESTION_4
Two cars A and B move on a straight road. Car A (source) emits a horn at 440 Hz and moves at 25 m/s. Car B (observer) moves at 15 m/s. Speed of sound = 340 m/s. Calculate the observed frequency in four cases: (a) both moving toward each other, (b) both moving away from each other, (c) A chasing B (same direction, A behind), (d) B chasing A (same direction, B behind). Tabulate your results and explain the trend.

## DIAGNOSTIC_ANSWER_4
(a) Toward: \(f' = 440 \times \frac{340 + 15}{340 - 25} = 440 \times \frac{355}{315} = 495.9 \text{ Hz}\).
(b) Away: \(f' = 440 \times \frac{340 - 15}{340 + 25} = 440 \times \frac{325}{365} = 391.8 \text{ Hz}\).
(c) A chases B: relative motion = A approaches B from behind. \(v_s = +25\), \(v_o = +15\) (both in same direction, but A catches up). Sign convention: if both move right, and A is behind B, A moves toward B (+\(v_s\)), B moves away from A (-\(v_o\) relative to source direction). Correct: source toward observer (+\(v_s\)), observer away from source (-\(v_o\)). \(f' = 440 \times \frac{340 - 15}{340 - 25} = 440 \times \frac{325}{315} = 454.0 \text{ Hz}\).
(d) B chases A: source away from observer (-\(v_s\)), observer toward source (+\(v_o\)). \(f' = 440 \times \frac{340 + 15}{340 + 25} = 440 \times \frac{355}{365} = 428.0 \text{ Hz}\).
Trend: Highest when approaching head-on, lowest when receding head-on. Chasing cases give intermediate shifts. Wrong signs in chasing cases are the most common error — students must define positive direction consistently.

## DIAGNOSTIC_QUESTION_5
A student solves a Doppler problem: "Source frequency 600 Hz, source speed 40 m/s toward observer, observer speed 10 m/s away from source, sound speed 330 m/s." The student writes \(f' = 600 \times \frac{330 - 10}{330 - 40} = 600 \times \frac{320}{290} = 662 \text{ Hz}\). Identify the error, correct it, and explain why the student's reasoning was flawed.

## DIAGNOSTIC_ANSWER_5
Error: Sign of \(v_s\). Source moves TOWARD observer, so \(v_s = +40 \text{ m/s}\) (denominator \(v - v_s\)). Observer moves AWAY from source, so \(v_o = -10 \text{ m/s}\) (numerator \(v + v_o = v - 10\)). Student used \(v - v_s\) correctly but should have used \(v - 10\) in numerator. Correct: \(f' = 600 \times \frac{330 - 10}{330 - 40} = 600 \times \frac{320}{290} = 662 \text{ Hz}\) — wait, the student's numerical answer is accidentally correct because both signs were wrong in a compensating way! The student likely thinks "toward = minus in denominator, away = minus in numerator" as a memorized rule without understanding. The flaw: they don't grasp that the formula \(f' = f \frac{v + v_o}{v - v_s}\) uses a SINGLE sign convention: \(v_o\) positive if observer moves TOWARD source, \(v_s\) positive if source moves TOWARD observer. Here \(v_o = -10\), \(v_s = +40\). The student's answer is numerically correct but conceptually wrong — they would fail if both moved toward (\(v_o = +10, v_s = +40\)) and they'd write \(\frac{330 - 10}{330 - 40}\) instead of \(\frac{330 + 10}{330 - 40}\).

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a smartphone and a Bluetooth speaker to measure the speed of sound using the Doppler Effect. Describe the procedure, measurements needed, and the formula you would use to calculate \(v\). Assume you can measure frequency accurately using a spectrum analyzer app.

## DIAGNOSTIC_ANSWER_6
Procedure: (1) Fix a Bluetooth speaker on a toy car moving at constant known speed \(v_s\) (measure with stopwatch and meter tape). (2) Speaker plays a pure tone of known frequency \(f\) (e.g., 1000 Hz from a signal generator app). (3) Smartphone with spectrum analyzer app acts as stationary observer at a fixed position on the car's path. (4) Record the frequency \(f'\) when the car approaches directly toward the phone. (5) Use formula \(f' = f \frac{v}{v - v_s}\) (observer stationary, source moving toward). Solve for \(v\): \(v = \frac{f' v_s}{f' - f}\). (6) Repeat for receding case \(f'' = f \frac{v}{v + v_s}\) for verification. Key requirement: car speed \(v_s\) must be known independently (not from Doppler shift). A poor answer would suggest using the phone as both source and observer (circular) or ignoring the need to know \(v_s\) independently.

## COMMON_MISCONCEPTION
Students believe the Doppler shift depends only on the relative velocity between source and observer, so they use \(f' = f \frac{v + v_{rel}}{v}\) or \(f' = f \frac{v}{v - v_{rel}}\) interchangeably. They fail to recognize that for sound, the medium provides an absolute reference frame: a source moving at 30 m/s toward a stationary observer produces a different shift than an observer moving at 30 m/s toward a stationary source. This error stems from overgeneralizing the relativistic Doppler formula (where only relative velocity matters) to sound waves. In board exams, this appears when students use the "source moving" formula for an "observer moving" problem, or add speeds incorrectly in chasing scenarios.

## ON_FAILURE
Step 1: Have the student draw wavefront diagrams for three cases: (a) stationary source, stationary observer; (b) source moving toward stationary observer; (c) stationary source, observer moving toward source. Step 2: Ask them to measure wavelength \(\lambda\) in each diagram and compute frequency received using \(f' = \frac{\text{relative speed of wavefronts}}{\lambda}\). Step 3: Show that in (b), \(\lambda\) changes but wave speed relative to observer is \(v\); in (c), \(\lambda\) is unchanged but relative speed is \(v + v_o\). Step 4: Derive both formulas from the diagrams. Step 5: Practice 5 numerical problems where only the observer moves, then 5 where only the source moves, forcing sign convention discipline. Step 6: Only then introduce combined motion.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_14_002, c11_phy_cbse_14_003, c11_phy_cbse_14_004, c9_physics_ch5_4, c9_physics_ch5_6

## PREREQUISITE_REASONS
c11_phy_cbse_14_002: Speed of wave formula \(v = f\lambda\) is essential to relate frequency shift to wavelength change in Doppler derivation.
c11_phy_cbse_14_003: Newton-Laplace formula for speed of sound in air provides the value of \(v\) used in all Doppler calculations.
c11_phy_cbse_14_004: Factors affecting speed of sound (temperature, humidity) are needed when problems give conditions instead of direct \(v\) value.
c9_physics_ch5_4: Wavelength, frequency, time period relationships (\(v = f\lambda\)) are the foundation for understanding how motion alters perceived frequency.
c9_physics_ch5_6: Speed of sound in different media establishes that \(v\) is a property of the medium, not the source — critical for Doppler sign convention.

## FORWARD_NODE_IDS
c11_phy_cbse_14_011, c12_phy_cbse_10_003, c11_phy_cbse_14_007, c11_phy_cbse_14_009, c11_phy_cbse_14_008

## FORWARD_REASONS
c11_phy_cbse_14_011: This node (Doppler Effect: Source Moving and Observer Moving) directly builds on the formula derived here by analyzing each case separately with detailed wavefront diagrams and special cases (source speed = sound speed, supersonic).
c12_phy_cbse_10_003: Provides the classical Doppler effect for sound, which is the conceptual starting point for understanding the differences with light.  
c11_phy_cbse_14_007: c11_phy_cbse_14_001,c11_phy_cbse_14_002,c11_phy_cbse_14_005,c11_phy_cbse_14_006,c11_phy_cbse_14_012 -> c11_phy_cbse_14_007 -> c11_phy_cbse_14_008,c11_phy_cbse_14_009,c11_phy_cbse_14_010  
c11_phy_cbse_14_009: c11_phy_cbse_14_005 (superposition) → c11_phy_cbse_14_009 (beats) → c11_phy_cbse_14_010 (Doppler effect with beats)  
c11_phy_cbse_14_008: ing waves in strings (covered in c11_phy_cbse_14_007), beats (c11_phy_cbse_14_009), Doppler effect (c11_phy_cbse_14_010/011), or quantitative end correction calculations.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_02_006, c11_math_cbse_02_007, c10_math_cbse_03_010
## CROSS_SUBJECT_REASONS
c11_math_cbse_02_006: Quadratic equations appear when solving Doppler problems for unknown speed (e.g., given beat frequency between direct and reflected sound, find source speed).
c11_math_cbse_02_007: Nature of roots (discriminant) determines if a real speed solution exists in such quadratic Doppler problems.
c10_math_cbse_03_010: Upstream/downstream relative velocity problems (boat in river) are mathematically identical to Doppler chasing scenarios — same sign convention logic.

## CHAIN_DESCRIPTION
c11_phy_cbse_14_002 -> c11_phy_cbse_14_010 -> c11_phy_cbse_14_011: Wave speed formula enables Doppler derivation, which then splits into detailed source/observer moving cases and leads to reflection applications.

## THIS_FORMULA
\(f' = f \frac{v \pm v_o}{v \mp v_s}\) where \(f'\) = observed frequency (Hz), \(f\) = source frequency (Hz), \(v\) = speed of sound in medium (m/s), \(v_o\) = speed of observer (m/s, +ve if moving toward source), \(v_s\) = speed of source (m/s, +ve if moving toward observer). Upper signs for approach, lower for recession.

## FORMULA_VARIABLES
\(f'\) = observed/apparent frequency (Hz); \(f\) = actual source frequency (Hz); \(v\) = speed of sound in the medium (m/s); \(v_o\) = velocity of observer relative to medium (m/s), positive when moving toward source; \(v_s\) = velocity of source relative to medium (m/s), positive when moving toward observer.

## FORMULA_UNITS
Hz, m/s

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_02_006 | Quadratic equations model Doppler problems where unknown speed must be found from beat frequency between direct and reflected waves (e.g., radar speed gun calculations).
c11_math_cbse_02_007 | Discriminant analysis determines whether a physically real speed solution exists in Doppler-based quadratic problems.
c10_math_cbse_03_010 | Upstream/downstream boat problems use identical relative velocity sign conventions as Doppler chasing scenarios (source/observer moving in same direction).

## PREREQ_CONCEPT
Wave speed in a medium is independent of source motion but depends on medium properties; frequency and wavelength are linked by \(v = f\lambda\).

## PREREQ_BEFORE
Student must be able to calculate wavelength from frequency and wave speed, and understand that wave speed is relative to the medium, not the source.

## PREREQ_STUCK
Revisit c11_phy_cbse_14_002 (Speed of Wave Formula) and c9_physics_ch5_4 (Wavelength-Frequency Relationship) to reinforce \(v = f\lambda\) and the medium-dependent nature of sound speed.

## WORKED_EXAMPLE_1
PROBLEM: A motorcycle rider sounds a horn of frequency 500 Hz while moving at 20 m/s toward a stationary pedestrian. The speed of sound in air is 330 m/s. The pedestrian holds a tuning fork of frequency 510 Hz. Calculate the beat frequency heard by the pedestrian between the horn and the tuning fork.
STEPS:
- Step 1: Identify given quantities with units: \(f_{\text{horn}} = 500 \text{ Hz}\), \(v_s = +20 \text{ m/s}\) (source moving toward observer), \(v_o = 0\) (stationary observer), \(v = 330 \text{ m/s}\), \(f_{\text{fork}} = 510 \text{ Hz}\).
- Step 2: Determine the correct Doppler formula for source moving toward stationary observer: \(f' = f \frac{v}{v - v_s}\). Verify units: all speeds in m/s, frequencies in Hz.
- Step 3: Substitute values: \(f'_{\text{horn}} = 500 \times \frac{330}{330 - 20} = 500 \times \frac{330}{310}\).
- Step 4: Compute with unit tracking: \(\frac{330}{310} = 1.0645\), \(f'_{\text{horn}} = 500 \times 1.0645 = 532.26 \text{ Hz}\).
- Step 5: Calculate beat frequency: \(f_{\text{beat}} = |f'_{\text{horn}} - f_{\text{fork}}| = |532.26 - 510| = 22.26 \text{ Hz}\).
- Step 6: Physical reasonableness check: Source approaching increases frequency above 500 Hz; 532 Hz > 510 Hz so beats are positive and plausible for audible range.
REASONING: The moving source compresses wavefronts, reducing effective wavelength to \(\lambda' = \frac{v - v_s}{f}\). The stationary observer receives these at speed \(v\), so observed frequency is \(v/\lambda'\). The tuning fork is stationary relative to the observer, so its frequency is unchanged at 510 Hz. Beats arise from superposition of two slightly different frequencies at the same location.
ANSWER: 22.3 Hz (approx)

## WORKED_EXAMPLE_2
PROBLEM: An ambulance with a siren of frequency 900 Hz moves at 25 m/s on a straight road. A car ahead moves in the same direction at 15 m/s. The ambulance is behind the car. Speed of sound = 340 m/s. Find the frequency heard by the car driver. Then find the frequency heard by the ambulance driver of the sound reflected from the car (assume car reflects sound perfectly).
STEPS:
- Step 1: Define positive direction as the direction of motion (ambulance toward car). Given: \(f = 900 \text{ Hz}\), \(v = 340 \text{ m/s}\), \(v_s = +25 \text{ m/s}\) (ambulance/source moving toward car/observer), \(v_o = +15 \text{ m/s}\) (car/observer moving away from ambulance/source? Wait — car is ahead moving same direction. Ambulance approaches car from behind, so relative to the direction from source to observer, the observer is moving AWAY from the source. Thus \(v_o = -15 \text{ m/s}\)).
- Step 2: Clarify sign convention: In formula \(f' = f \frac{v + v_o}{v - v_s}\), \(v_o\) is +ve if observer moves TOWARD source. Here car moves away from ambulance, so \(v_o = -15 \text{ m/s}\). \(v_s\) is +ve if source moves TOWARD observer. Ambulance moves toward car, so \(v_s = +25 \text{ m/s}\).
- Step 3: First Doppler shift (direct sound): \(f_1 = 900 \times \frac{340 + (-15)}{340 - 25} = 900 \times \frac{325}{315} = 928.57 \text{ Hz}\).
- Step 4: Reflection from car: Car acts as a new source re-emitting at frequency \(f_1 = 928.57 \text{ Hz}\). Now car is source (\(v_s' = -15 \text{ m/s}\), moving away from ambulance), ambulance is observer (\(v_o' = +25 \text{ m/s}\), moving toward car).
- Step 5: Second Doppler shift (reflected sound): \(f_2 = f_1 \frac{v + v_o'}{v - v_s'} = 928.57 \times \frac{340 + 25}{340 - (-15)} = 928.57 \times \frac{365}{355} = 954.7 \text{ Hz}\).
- Step 6: Verify: Double shift amplifies the effect. Direct shift: 900 → 928.6 Hz (+3.2%). Reflected shift: 928.6 → 954.7 Hz (+2.8%). Total shift ~6% — reasonable for these speeds.
REASONING: This is a two-step Doppler problem. The car receives a shifted frequency \(f_1\) and reflects it (acts as a moving source at that frequency). The ambulance then receives this reflected wave while moving. The sign convention must be applied carefully at each step relative to the instantaneous source-observer line.
ANSWER: Direct sound heard by car driver = 928.6 Hz; Reflected sound heard by ambulance driver = 954.7 Hz

## WORKED_EXAMPLE_3
PROBLEM: A bat emits ultrasonic pulses at 40 kHz while flying at 8 m/s toward a vertical wall. The bat detects the echo. Speed of sound in air = 330 m/s. (a) What frequency does the wall "receive"? (b) What frequency does the bat detect in the echo? (c) If the bat's auditory system can resolve frequency differences of 200 Hz, what is the minimum speed of the bat toward the wall that would allow it to detect the Doppler shift in the echo? (d) Explain why bats use high frequencies (ultrasound) for echolocation.
STEPS:
- Step 1: Given: \(f = 40,000 \text{ Hz}\), \(v_{\text{bat}} = 8 \text{ m/s}\), \(v = 330 \text{ m/s}\). Wall is stationary.
- Step 2: (a) Wall as stationary observer, bat as source moving toward wall: \(v_s = +8 \text{ m/s}\), \(v_o = 0\). \(f_{\text{wall}} = f \frac{v}{v - v_s} = 40000 \times \frac{330}{330 - 8} = 40000 \times \frac{330}{322} = 40993.8 \text{ Hz}\).
- Step 3: (b) Wall reflects sound — acts as stationary source emitting at \(f_{\text{wall}} = 40993.8 \text{ Hz}\). Bat is observer moving toward source: \(v_o = +8 \text{ m/s}\), \(v_s = 0\). \(f_{\text{echo}} = f_{\text{wall}} \frac{v + v_o}{v} = 40993.8 \times \frac{330 + 8}{330} = 40993.8 \times \frac{338}{330} = 41991.6 \text{ Hz}\).
- Step 4: (c) Total shift \(\Delta f = f_{\text{echo}} - f\). For general bat speed \(u\): \(f_{\text{echo}} = f \frac{v}{v - u} \frac{v + u}{v} = f \frac{v + u}{v - u}\). \(\Delta f = f \left(\frac{v + u}{v - u} - 1\right) = f \frac{2u}{v - u}\). Set \(\Delta f \ge 200 \text{ Hz}\): \(40000 \times \frac{2u}{330 - u} \ge 200\). Solve: \(\frac{2u}{330 - u} \ge 0.005\), \(2u \ge 1.65 - 0.005u\), \(2.005u \ge 1.65\), \(u \ge 0.823 \text{ m/s}\).
- Step 5: (d) High frequency (short wavelength) gives better spatial resolution (\(\lambda = v/f \approx 8.25 \text{ mm}\) at 40 kHz vs 33 cm at 1 kHz). Also, Doppler shift \(\Delta f \propto f\) for fixed \(u\), so higher \(f\) gives larger absolute shift, easier to detect.
- Step 6: Check units: All speeds m/s, frequencies Hz. Minimum speed 0.82 m/s ≈ 3 km/h — biologically plausible for a bat.
REASONING: The wall receives a shifted frequency because the moving source compresses wavefronts. The wall reflects this frequency unchanged (stationary source). The moving bat then receives a second shift. The combined effect is multiplicative: \(f_{\text{echo}} = f \frac{v+u}{v-u}\). For small \(u\), \(\Delta f \approx 2f u/v\). High frequency amplifies the shift and provides finer spatial detail for echolocation.
ANSWER: (a) 40.99 kHz (b) 41.99 kHz (c) 0.82 m/s (d) Higher frequency gives larger absolute Doppler shift and shorter wavelength for better spatial resolution.

## COMPETENCY_QUESTION_1
QUESTION: A train blows a whistle of frequency 400 Hz while approaching a railway platform at 30 m/s. A passenger on the platform runs toward the train at 5 m/s. Speed of sound = 330 m/s. At the exact moment the passenger passes a stationary observer on the platform, both measure the whistle frequency. (a) Calculate the frequency measured by each. (b) Explain why the two frequencies differ even though both are at the same location at that instant. (c) If the train instead moves away from the platform at 30 m/s while the passenger still runs toward it at 5 m/s, what would each measure?
COMPETENCY: Interpreting physical situations using formulas and explaining frame-dependent measurements
STEPS:
- Step 1: Identify the two observers: stationary platform observer (\(v_o = 0\)) and running passenger (\(v_o = +5 \text{ m/s}\) toward train). Source (train) moves toward both at \(v_s = +30 \text{ m/s}\).
- Step 2: Apply formula \(f' = f \frac{v + v_o}{v - v_s}\) for each. Stationary: \(f'_{\text{stat}} = 400 \times \frac{330}{330 - 30} = 400 \times \frac{330}{300} = 440 \text{ Hz}\). Running: \(f'_{\text{run}} = 400 \times \frac{330 + 5}{330 - 30} = 400 \times \frac{335}{300} = 446.67 \text{ Hz}\).
- Step 3: Explain difference: Doppler shift depends on observer's motion relative to the MEDIUM, not just position. The running passenger encounters wavefronts at a higher rate because they move through the medium toward the source. The medium (air) defines the rest frame for sound waves.
- Step 4: For part (c): Train receding (\(v_s = -30 \text{ m/s}\)), passenger toward train (\(v_o = +5 \text{ m/s}\)). Stationary: \(f' = 400 \times \frac{330}{330 + 30} = 400 \times \frac{330}{360} = 366.67 \text{ Hz}\). Running: \(f' = 400 \times \frac{330 + 5}{330 + 30} = 400 \times \frac{335}{360} = 372.22 \text{ Hz}\).
ANSWER: (a) Stationary: 440 Hz, Running: 446.7 Hz. (b) Frequency measurement depends on observer's velocity relative to the medium, not just position. (c) Stationary: 366.7 Hz, Running: 372.2 Hz.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A radar gun used by traffic police emits microwaves of frequency 10 GHz. A car approaches the radar at 30 m/s. The radar detects the reflected signal and measures the beat frequency between emitted and reflected waves. (a) Calculate the beat frequency. (b) If the radar gun software assumes the speed of light \(c = 3 \times 10^8 \text{ m/s}\) but the actual speed in air is \(c/n\) where \(n = 1.0003\), what is the percentage error in the calculated car speed? (c) Why can police radar use the formula \(f_{\text{beat}} \approx \frac{2v f}{c}\) (non-relativistic) even though light requires relativistic Doppler formula?
COMPETENCY: Predicting outcomes from changing variables and unit analysis with dimensional reasoning
STEPS:
- Step 1: For electromagnetic waves, relativistic Doppler for source moving toward stationary observer: \(f' = f \sqrt{\frac{c+v}{c-v}} \approx f (1 + v/c)\) for \(v \ll c\). Reflection from car: car receives \(f'\) and re-emits (reflects) at that frequency. Radar receives this reflected wave from a source (car) moving toward it at \(v\). Total shift: \(f_{\text{refl}} = f \frac{c+v}{c-v} \approx f (1 + 2v/c)\). Beat frequency: \(f_{\text{beat}} = f_{\text{refl}} - f \approx \frac{2vf}{c}\).
- Step 2: (a) \(f_{\text{beat}} = \frac{2 \times 30 \times 10^{10}}{3 \times 10^8} = \frac{60 \times 10^{10}}{3 \times 10^8} = 2000 \text{ Hz} = 2 \text{ kHz}\).
- Step 3: (b) Actual \(c_{\text{air}} = c/n\). Radar assumes \(c\), so calculated speed \(v_{\text{calc}} = \frac{f_{\text{beat}} c}{2f}\). True speed \(v_{\text{true}} = \frac{f_{\text{beat}} c_{\text{air}}}{2f} = \frac{f_{\text{beat}} c}{2f n}\). Error: \(\frac{v_{\text{calc}} - v_{\text{true}}}{v_{\text{true}}} = n - 1 = 0.0003 = 0.03\%\).
- Step 4: (c) Non-relativistic approximation \(f_{\text{beat}} \approx 2vf/c\) is valid because \(v/c = 30/3\times10^8 = 10^{-7} \ll 1\). The relativistic formula \(\sqrt{(c+v)/(c-v)}\) expands to \(1 + v/c + \frac{1}{2}(v/c)^2 + \cdots\). The \((v/c)^2\) term is \(\sim 10^{-14}\), utterly negligible. Police radar measures speed to ~1 km/h precision; relativistic corrections are far below this threshold.
ANSWER: (a) 2 kHz (b) 0.03% overestimate (c) \(v/c \sim 10^{-7}\), so non-relativistic approximation error is \(\sim 10^{-14}\), far below measurement precision.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The Doppler Effect is the apparent change in frequency (or ______) of a wave when there is relative motion between the source of the wave and the observer.

## DIAGNOSTIC_ANSWER_7
wavelength

**A wrong answer ("amplitude" or "speed") reveals the student has swapped the definition's second observable - the apparent change is in frequency or wavelength.** Wavelength is the definition's own alternative, and the noun is what the blank grades. Recall the relative-motion trigger before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Stand near a railway crossing and listen to a train's horn as it ______ and passes you — the pitch drops sharply at the moment it crosses.

## DIAGNOSTIC_ANSWER_8
approaches

**A wrong answer ("departs" or "slows") reveals the student has swapped the walkthrough's verb - the horn sounds as the train approaches and passes.** Approaches is the walkthrough's own verb, and the verb is what the blank grades. Recall the sharp pitch drop after before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can derive the Doppler shift formula for all three cases (source moving, observer moving, both moving) from first principles using wavefront arguments, correctly apply sign conventions in numerical problems involving multiple moving objects, and explain why the effect is symmetric for light but asymmetric for sound (medium.
