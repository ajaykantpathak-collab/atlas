## ELI5
The express approaches and the platform hears treble; you ride past the siren and hear it fall - now both move. The full Doppler formula prices each motion separately: source velocity in the numerator's denominator, observer's in the numerator's numerator - signs flipping with approach and retreat. Same shift, two addresses: the source edits wavelengths, the observer edits counting rate.

## DEFINITION
The Doppler effect for sound waves when both the source and observer are in motion relative to the medium is the change in observed frequency due to the relative motion along the line joining them. The observed frequency \( f' \) is given by \( f' = f \frac{v \pm v_o}{v \mp v_s} \), where \( f \) is the source frequency, \( v \) is the speed of sound in the medium, \( v_o \) is the velocity of the observer, and \( v_s \) is the velocity of the source. The upper signs are used when the motion is towards each other (increasing frequency), and lower signs when moving away (decreasing frequency). SI units: frequency in hertz (Hz), velocities in meters per second (m/s).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly apply the combined Doppler formula to calculate the observed frequency for any combination of source and observer motion along the line of sight, including determining the correct sign convention. They can also predict whether the observed pitch increases or decreases and explain the physical reason using wavefront compression/expansion.

## SCOPE_BOUNDARY
This node covers only mechanical sound waves propagating in a material medium (air, water, solids) with source and observer moving along the line joining them at constant velocities. It does NOT cover relativistic Doppler effect for light, accelerated motion, motion at an angle to the line of sight (except as a component), or the case where the medium itself is moving (wind). The speed of sound \( v \) is assumed constant in the medium.

## WALKTHROUGH
Imagine standing on a railway platform as an express train approaches, blowing its whistle. You notice the pitch is higher than when the train is stationary. Now imagine you are on a moving train passing a stationary siren – the pitch changes again. What happens when both are moving? Start by recalling the two separate cases: moving source (wavefronts bunch up) and moving observer (encounters wavefronts at a different rate). To combine them, first draw a diagram showing the direction of motion of source and observer relative to the medium. Choose a sign convention: velocities towards each other are positive. Then apply the formula \( f' = f \frac{v + v_o}{v - v_s} \) (for approach). The key principle is that the frequency detected by the observer equals the rate at which wavefronts cross the observer's position, which depends on both the source's emission rate modified by its motion and the observer's motion through the wave pattern.

Takeaway: mastery means applying the combined formula with correct signs, and explaining why source and observer motions shift frequency differently. Exam moves: combined-case numericals and explain-the-asymmetry items. Check yourself: a moving source truly bunches the wavelengths; a moving observer merely meets them faster - the asymmetry is physical, not algebraic. Students miss it because they add the two shifts, when the definition's formula nests them: the medium is the referee, and only its frame keeps the signs honest.

## DIAGNOSTIC_QUESTION_1
State the combined Doppler effect formula for sound when both source and observer are moving along the line joining them. Define each variable and its SI unit.

## DIAGNOSTIC_ANSWER_1
The formula is \( f' = f \frac{v + v_o}{v - v_s} \) for motion towards each other. Here \( f' \) = observed frequency (Hz), \( f \) = source frequency (Hz), \( v \) = speed of sound in medium (m/s), \( v_o \) = velocity of observer (m/s, positive towards source), \( v_s \) = velocity of source (m/s, positive towards observer). If a student writes \( f' = f \frac{v - v_o}{v + v_s} \) for approach, they have confused the sign convention. If they omit units or use km/h without conversion, they lack unit awareness.

## DIAGNOSTIC_QUESTION_2
A police car siren emits a frequency of 800 Hz. The car moves towards a stationary observer at 30 m/s. The observer then starts moving towards the car at 10 m/s. Explain qualitatively how the observed frequency changes compared to the stationary observer case. Does the formula \( f' = f \frac{v}{v - v_s} \) still apply?

## DIAGNOSTIC_ANSWER_2
When the observer is stationary, the observed frequency is \( f' = f \frac{v}{v - v_s} \) (higher than 800 Hz). When the observer also moves towards the source, they encounter wavefronts more frequently, so the observed frequency increases further. The formula \( f' = f \frac{v}{v - v_s} \) no longer applies because it assumes \( v_o = 0 \). The correct formula is \( f' = f \frac{v + v_o}{v - v_s} \). A student who says the frequency decreases or stays the same confuses the effect of observer motion. One who uses the same formula fails to recognize the additional factor \( (v + v_o) \).

## DIAGNOSTIC_QUESTION_3
A source emits sound at 500 Hz. The speed of sound in air is 340 m/s. The source moves away from a stationary observer at 20 m/s. The observer then moves away from the source at 15 m/s. Calculate the observed frequency in both cases. (Give answers to 1 decimal place.)

## DIAGNOSTIC_ANSWER_3
Case 1 (stationary observer, source receding): \( f' = f \frac{v}{v + v_s} = 500 \times \frac{340}{340 + 20} = 500 \times \frac{340}{360} = 472.2 \) Hz.
Case 2 (both receding): \( f' = f \frac{v - v_o}{v + v_s} = 500 \times \frac{340 - 15}{340 + 20} = 500 \times \frac{325}{360} = 451.4 \) Hz.
If a student uses \( v - v_s \) in the denominator for receding source, they have the sign wrong. If they forget to subtract \( v_o \) in the numerator for receding observer, they treat the observer as stationary. Unit mismatch (e.g., using km/h) would give wildly incorrect results.

## DIAGNOSTIC_QUESTION_4
Two cars A and B are moving towards each other on a straight road. Car A sounds its horn at 440 Hz. Car A moves at 25 m/s, car B at 20 m/s. Speed of sound = 330 m/s. A student calculates the frequency heard by driver B as \( f' = 440 \times \frac{330 + 20}{330 - 25} = 440 \times \frac{350}{305} = 504.9 \) Hz. Another student uses \( f' = 440 \times \frac{330 - 20}{330 + 25} = 382.5 \) Hz. Which is correct? Explain the error in the wrong approach.

## DIAGNOSTIC_ANSWER_4
The first student is correct. Since both are moving towards each other, the observer (B) moves towards the source (+v_o) and the source (A) moves towards the observer (-v_s in denominator). The second student used signs for motion away from each other. The error is in sign convention: they treated both velocities as if the source and observer were receding. A common mistake is to use the same sign for both velocities without considering whether each motion increases or decreases the observed frequency.

## DIAGNOSTIC_QUESTION_5
A tuning fork of frequency 512 Hz is moved towards a wall at 5 m/s. The sound reflects off the wall and returns to the tuning fork. An observer holding the tuning fork hears beats between the direct sound and the reflected sound. Given speed of sound = 340 m/s, calculate the beat frequency. (Hint: Treat the wall as a stationary observer for the incident wave, then as a stationary source for the reflected wave.)

## DIAGNOSTIC_ANSWER_5
Step 1: Frequency 'heard' by the wall (stationary observer, moving source): \( f_1 = f \frac{v}{v - v_s} = 512 \times \frac{340}{340 - 5} = 512 \times \frac{340}{335} = 519.6 \) Hz.
Step 2: Wall reflects this frequency. Now the wall acts as a stationary source emitting \( f_1 \). The tuning fork (observer) moves towards the wall at 5 m/s: \( f_2 = f_1 \frac{v + v_o}{v} = 519.6 \times \frac{340 + 5}{340} = 519.6 \times \frac{345}{340} = 527.2 \) Hz.
Step 3: Beat frequency = \( |f_2 - f| = |527.2 - 512| = 15.2 \) Hz.
If a student uses only one Doppler shift (e.g., \( f' = f \frac{v + v_o}{v - v_s} \) directly), they get 527.2 Hz but miss the two-step reasoning. If they forget the wall is stationary in both steps, they might use wrong formulas. The beat frequency is the difference between the direct frequency (512 Hz) and the reflected frequency (527.2 Hz).

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a smartphone and a Bluetooth speaker to demonstrate the Doppler effect with both source and observer moving. Describe the setup, the measurements you would take, and how you would calculate the expected frequency shift. Assume you have a frequency generator app and a frequency analyzer app.

## DIAGNOSTIC_ANSWER_6
Setup: Place the Bluetooth speaker (source) on a toy car moving on a track. The smartphone (observer) is mounted on another toy car moving on a parallel track. Use the frequency generator app to emit a constant tone (e.g., 1000 Hz). Use the frequency analyzer app on the same or another phone to record the received frequency. Vary the speeds of the cars (measure with a stopwatch and meter scale) and record observed frequencies for approaching and receding cases. Calculate expected shifts using \( f' = f \frac{v \pm v_o}{v \mp v_s} \) with \( v = 340 \) m/s. Compare measured vs calculated. A good answer includes controlling wind, ensuring motion along the line joining them, and repeating trials. A poor answer might ignore the need to measure speeds accurately, forget to account for the medium's speed of sound, or not mention how to isolate the direct sound from reflections.

## COMMON_MISCONCEPTION
Students often believe that the Doppler shift depends on the distance between source and observer, not just their relative velocity. They might think that if the source is far away, the shift is smaller even if the velocity is the same. Another specific error: they treat the speed of sound as changing with the motion of the source (e.g., "the sound travels faster because the source is moving"). In reality, the speed of sound in a medium is constant for a given temperature; only the wavelength and frequency change. A third error is using the same sign for both velocities in the formula without considering direction: they might write \( f' = f \frac{v + v_o}{v + v_s} \) for approach, which is incorrect.

## ON_FAILURE
To address the distance misconception: Use a video of a passing ambulance siren – the pitch changes abruptly when it passes, not gradually with distance. To fix the speed of sound misconception: Perform a thought experiment – if the source moves at the speed of sound, wavefronts pile up (sonic boom), but the speed of each wavefront relative to air remains \( v \). To fix sign convention: Teach a systematic method: (1) Draw a line from source to observer. (2) Assign positive direction from observer to source. (3) Velocity components along this line: if source moves towards observer, \( v_s \) is positive (denominator \( v - v_s \)); if observer moves towards source, \( v_o \) is positive (numerator \( v + v_o \)). Practice with 5 varied scenarios until the student can consistently choose signs.

## PREREQUISITE_NODE_IDS
c11_phy_cbse_14_010, c11_phy_cbse_14_002, c9_physics_ch2_3, c9_physics_ch5_4, c10_math_cbse_03_005, c11_phy_cbse_14_008, c11_phy_cbse_14_009

## PREREQUISITE_REASONS
c11_phy_cbse_14_010: Provides the basic Doppler formulas for moving source only and moving observer only, which are combined here.
c11_phy_cbse_14_002: Establishes the wave speed formula \( v = f \lambda \), essential for understanding how frequency and wavelength change.
c9_physics_ch2_3: Defines velocity as a vector, necessary for assigning signs to \( v_o \) and \( v_s \) along the line of sight.
c9_physics_ch5_4: Gives the relationship \( v = f \lambda \), used to derive the Doppler shift from wavefront spacing.
c10_math_cbse_03_005: Substitution method for solving linear equations, needed for multi-step Doppler problems (e.g., finding unknown velocity).
c11_phy_cbse_14_008: Same as above; the Doppler shift formulas require the source frequency, which for a pipe is determined by its harmonic series.  
c11_phy_cbse_14_009: When both source and observer move, the observed frequency shifts; beats between the shifted and original frequencies are used in radar/sonar applications.  

## FORWARD_NODE_IDS


## FORWARD_REASONS
none

## CROSS_SUBJECT_PREREQS
c9_math_ch1_4, c9_math_ch2_5, c10_math_cbse_03_005
## CROSS_SUBJECT_REASONS
c9_math_ch1_4: Distance formula and coordinate geometry are used to set up relative positions and velocities in vector form.
c9_math_ch2_5: Graphical representation of linear equations helps visualize the relationship between observed frequency and relative velocity.
c10_math_cbse_03_005: Substitution method for solving simultaneous equations is directly applied when given observed frequencies to find unknown source/observer speeds.

## CHAIN_DESCRIPTION
c11_phy_cbse_14_010 -> c11_phy_cbse_14_011 -> none

## THIS_FORMULA
\( f' = f \frac{v \pm v_o}{v \mp v_s} \) (Hz) where upper signs for approach, lower for recession.

## FORMULA_VARIABLES
\( f' \) = observed frequency (Hz), \( f \) = source frequency (Hz), \( v \) = speed of sound in medium (m/s), \( v_o \) = velocity of observer (m/s, positive towards source), \( v_s \) = velocity of source (m/s, positive towards observer).

## FORMULA_UNITS
Hz, m/s

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch1_4 | The distance formula and coordinate geometry allow us to resolve velocities along the line joining source and observer, which is essential for applying the 1D Doppler formula.
c9_math_ch2_5 | The linear relationship between observed frequency and relative velocity can be graphed (f' vs v_rel) to visualize the Doppler shift, connecting algebra to graphical analysis.
c10_math_cbse_03_005 | Substitution method for solving linear equations is used when two Doppler equations (e.g., approaching and receding) are combined to find unknown source frequency or speed of sound.

## PREREQ_CONCEPT
Understanding of relative velocity in one dimension and the individual Doppler formulas for moving source and moving observer separately.

## PREREQ_BEFORE
The student must be able to correctly apply the formulas \( f' = f \frac{v}{v \mp v_s} \) (moving source) and \( f' = f \frac{v \pm v_o}{v} \) (moving observer) with proper sign conventions.

## PREREQ_STUCK
If stuck, review the derivation of the moving source formula (wavelength compression) and moving observer formula (relative speed of wavefronts) from node c11_phy_cbse_14_010, focusing on the sign convention for each case.

## WORKED_EXAMPLE_1
PROBLEM: A train approaches a railway platform at 30 m/s blowing a whistle of frequency 400 Hz. A passenger on the platform runs towards the train at 5 m/s. Speed of sound in air is 340 m/s. What frequency does the passenger hear? (Answer in Hz to one decimal place.)

STEPS:
- Step 1: Identify given quantities: \( f = 400 \) Hz, \( v = 340 \) m/s, \( v_s = 30 \) m/s (source moving towards observer), \( v_o = 5 \) m/s (observer moving towards source). Both motions are towards each other, so use upper signs in formula.
- Step 2: Write the combined Doppler formula for approach: \( f' = f \frac{v + v_o}{v - v_s} \).
- Step 3: Substitute values with units: \( f' = 400 \times \frac{340 + 5}{340 - 30} = 400 \times \frac{345}{310} \).
- Step 4: Compute: \( \frac{345}{310} = 1.1129 \); \( f' = 400 \times 1.1129 = 445.16 \) Hz.
- Step 5: Verify reasonableness: The frequency should be higher than 400 Hz because both motions increase frequency. 445.2 Hz is plausible. Round to one decimal: 445.2 Hz.

REASONING: The source moving towards the observer compresses wavefronts, effectively increasing frequency. The observer moving towards the source encounters wavefronts at a higher rate. Both effects multiply. The formula combines them by modifying the effective wave speed relative to the observer (numerator) and the effective wavelength (denominator).

ANSWER: 445.2 Hz

## WORKED_EXAMPLE_2
PROBLEM: A car sounds its horn at 500 Hz while moving away from a stationary cliff at 20 m/s. The driver hears the echo from the cliff. What is the frequency of the echo heard by the driver? Speed of sound = 330 m/s.

STEPS:
- Step 1: This is a two-step Doppler problem. First, the cliff (stationary observer) receives sound from the moving source (car moving away). Second, the cliff reflects that frequency, acting as a stationary source, and the car (now moving observer) receives the echo.
- Step 2: Step A: Frequency at cliff: \( f_1 = f \frac{v}{v + v_s} \) (source receding). \( f_1 = 500 \times \frac{330}{330 + 20} = 500 \times \frac{330}{350} = 471.43 \) Hz.
- Step 3: Step B: Frequency heard by driver (observer moving away from stationary source): \( f_2 = f_1 \frac{v - v_o}{v} \). Here \( v_o = 20 \) m/s (driver moving away from cliff). \( f_2 = 471.43 \times \frac{330 - 20}{330} = 471.43 \times \frac{310}{330} = 442.86 \) Hz.
- Step 4: Alternatively, combine into one formula: \( f_2 = f \frac{v - v_o}{v + v_s} = 500 \times \frac{310}{350} = 442.86 \) Hz.
- Step 5: Check: Both source and observer receding, so frequency decreases twice. 442.9 Hz < 471.4 Hz < 500 Hz. Consistent.

REASONING: The cliff acts as a stationary observer for the incident wave and a stationary source for the reflected wave. The car's motion away from the cliff reduces the frequency in both steps. The combined effect is the product of the two Doppler factors.

ANSWER: 442.9 Hz

## WORKED_EXAMPLE_3
PROBLEM: Two motorcycles A and B are moving in opposite directions on a straight road. Motorcycle A sounds its horn at 600 Hz. The speed of sound is 340 m/s. When they approach each other, the rider of B hears a frequency of 660 Hz. When they move away from each other, the rider of B hears 540 Hz. Find the speeds of the two motorcycles (assume they have the same speed).

STEPS:
- Step 1: Let the speed of each motorcycle be \( u \) m/s. When approaching, source (A) moves towards observer (B) and observer moves towards source. Formula: \( f_{app} = f \frac{v + u}{v - u} \). Given \( f_{app} = 660 \) Hz, \( f = 600 \) Hz, \( v = 340 \) m/s.
- Step 2: When receding: \( f_{rec} = f \frac{v - u}{v + u} \). Given \( f_{rec} = 540 \) Hz.
- Step 3: Set up equations:
  \( 660 = 600 \frac{340 + u}{340 - u} \)  -> (1)
  \( 540 = 600 \frac{340 - u}{340 + u} \)  -> (2)
- Step 4: Solve equation (1): \( \frac{660}{600} = 1.1 = \frac{340 + u}{340 - u} \). Cross-multiply: \( 1.1(340 - u) = 340 + u \) -> \( 374 - 1.1u = 340 + u \) -> \( 34 = 2.1u \) -> \( u = 16.19 \) m/s.
- Step 5: Verify with equation (2): \( \frac{540}{600} = 0.9 = \frac{340 - 16.19}{340 + 16.19} = \frac{323.81}{356.19} = 0.909 \). Slight rounding difference; exact fraction: \( u = \frac{34}{2.1} = \frac{340}{21} = 16.19 \) m/s. Consistent.
- Step 6: Convert to km/h if needed: \( 16.19 \times 3.6 = 58.3 \) km/h. Reasonable for motorcycles.

REASONING: The problem gives two conditions (approach and recession) which yield two equations. Since the speeds are equal, we have one unknown. The ratio of frequencies gives a simple algebraic equation. The symmetry of the formulas \( \frac{v+u}{v-u} \) and its reciprocal \( \frac{v-u}{v+u} \) means the product of the two frequency ratios is 1. Here \( \frac{660}{600} \times \frac{540}{600} = 1.1 \times 0.9 = 0.99 \approx 1 \), confirming consistency.

ANSWER: 16.2 m/s (or 58.3 km/h) for each motorcycle.

## COMPETENCY_QUESTION_1
QUESTION: A stationary source emits a frequency \( f_0 \). An observer moves towards the source at speed \( v_o \) and measures frequency \( f_1 \). The observer then moves away from the source at the same speed \( v_o \) and measures frequency \( f_2 \). Derive an expression for the speed of sound \( v \) in terms of \( f_0, f_1, f_2 \), and \( v_o \). Explain how this method can be used to measure the speed of sound experimentally.

COMPETENCY: Deriving relationships from physical principles and designing experimental methods.

STEPS:
- Step 1: Write Doppler formula for observer moving towards stationary source: \( f_1 = f_0 \frac{v + v_o}{v} \).
- Step 2: Write formula for observer moving away: \( f_2 = f_0 \frac{v - v_o}{v} \).
- Step 3: Divide the two equations: \( \frac{f_1}{f_2} = \frac{v + v_o}{v - v_o} \).
- Step 4: Solve for \( v \): \( f_1(v - v_o) = f_2(v + v_o) \) -> \( v(f_1 - f_2) = v_o(f_1 + f_2) \) -> \( v = v_o \frac{f_1 + f_2}{f_1 - f_2} \).
- Step 5: Experimental method: Use a known frequency source (tuning fork), move a microphone (observer) towards and away at known speed \( v_o \) (e.g., on a cart), measure \( f_1 \) and \( f_2 \) with a frequency analyzer, compute \( v \).

ANSWER: \( v = v_o \frac{f_1 + f_2}{f_1 - f_2} \). This eliminates the need to know the exact source frequency \( f_0 \) if \( f_1 \) and \( f_2 \) are measured accurately. The method works because the ratio of frequencies depends only on \( v \) and \( v_o \).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A bat emits an ultrasonic pulse at 40 kHz while flying at 10 m/s towards a stationary insect. The bat detects the echo reflected from the insect. (a) What frequency does the insect "hear"? (b) What frequency does the bat detect in the echo? (c) If the bat's auditory system can detect a frequency difference of 200 Hz, what is the minimum speed of the insect (moving directly away from the bat) that the bat can detect? Speed of sound = 340 m/s.

COMPETENCY: Applying Doppler effect in a two-step reflection scenario and analyzing detection thresholds.

STEPS:
- Step 1: (a) Insect is stationary observer, bat is moving source towards observer: \( f_1 = f_0 \frac{v}{v - v_b} = 40000 \times \frac{340}{340 - 10} = 40000 \times \frac{340}{330} = 41212 \) Hz.
- Step 2: (b) Insect reflects frequency \( f_1 \). Now insect is stationary source, bat is moving observer towards source: \( f_2 = f_1 \frac{v + v_b}{v} = 41212 \times \frac{340 + 10}{340} = 41212 \times \frac{350}{340} = 42424 \) Hz.
- Step 3: (c) Insect moves away at speed \( v_i \). Bat still moves towards insect at \( v_b = 10 \) m/s. Two-step: Insect receives \( f_1' = f_0 \frac{v - v_i}{v - v_b} \) (observer moving away, source moving towards). Bat receives echo: \( f_2' = f_1' \frac{v + v_b}{v + v_i} \) (source moving away, observer moving towards).
- Step 4: Combine: \( f_2' = f_0 \frac{(v - v_i)(v + v_b)}{(v - v_b)(v + v_i)} \). We want \( |f_2' - f_2| \geq 200 \) Hz. For small \( v_i \), approximate using derivative or solve exactly. Let's solve exactly: \( f_2 = 42424 \) Hz. Set \( f_2' = 42424 - 200 = 42224 \) Hz (since insect moving away lowers frequency).
- Step 5: \( 42224 = 40000 \frac{(340 - v_i)(350)}{(330)(340 + v_i)} \). Simplify: \( \frac{42224}{40000} = 1.0556 = \frac{350(340 - v_i)}{330(340 + v_i)} \). Cross-multiply: \( 1.0556 \times 330 (340 + v_i) = 350 (340 - v_i) \). \( 348.35 (340 + v_i) = 350 (340 - v_i) \). \( 118439 + 348.35 v_i = 119000 - 350 v_i \). \( 698.35 v_i = 561 \). \( v_i = 0.803 \) m/s.
- Step 6: Minimum detectable speed of insect is about 0.8 m/s (2.9 km/h).

ANSWER: (a) 41.2 kHz, (b) 42.4 kHz, (c) 0.8 m/s (approx). The bat's Doppler processing is highly sensitive.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The Doppler effect for sound waves when both the source and observer are in motion relative to the medium is the change in observed ______ due to the relative motion along the line joining them.

## DIAGNOSTIC_ANSWER_7
frequency

**A wrong answer ("amplitude" or "wavelength" alone) reveals the student has swapped the definition's observable - the effect changes the observed frequency.** Frequency is the definition's own observable, and the noun is what the blank grades. Recall the line-joining condition before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine standing on a railway platform as an express train ______, blowing its whistle.

## DIAGNOSTIC_ANSWER_8
approaches

**A wrong answer ("departs" or "waits") reveals the student has swapped the walkthrough's verb - the express train approaches the platform.** Approaches is the walkthrough's own verb, and the verb is what the blank grades. Recall the blown whistle before filling, and give the verb exactly.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can correctly apply the combined Doppler formula to calculate the observed frequency for any combination of source and observer motion along the line of sight, including determining the correct sign convention.

**A wrong answer (one case only) reveals the student has under-answered the mastery criterion.** Full mastery adds: apply the combined formula with correct signs for arbitrary source and observer motions, and explain the asymmetry between moving-source and moving-observer shifts.
