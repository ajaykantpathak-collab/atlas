## ELI5
A wheelchair ramp's slope hides an angle: the engineer knows the tangent ratio and needs the tilt - but tangent repeats itself forever, so infinitely many angles share that ratio. The fix is to restrict each trig function to one well-behaved interval where it never repeats, then invert. Those restricted inverses - arcsin, arccos, arctan and their cousins - each carry a fixed domain and a principal range: ask for the angle whose tangent is a ratio, and the answer is the unique tilt inside the agreed window.

## DEFINITION
The inverse trigonometric functions are defined by restricting the domains of the standard trigonometric functions to intervals where they become bijective (one‑one and onto). The principal value branch of each inverse function is the specific interval chosen as its range. For the six inverse trigonometric functions, the principal domains and ranges are:

- \( \sin^{-1} x \): Domain \([-1, 1]\), Range \(\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]\)
- \( \cos^{-1} x \): Domain \([-1, 1]\), Range \([0, \pi]\)
- \( \tan^{-1} x \): Domain \(\mathbb{R}\), Range \(\left(-\frac{\pi}{2}, \frac{\pi}{2}\right)\)
- \( \cot^{-1} x \): Domain \(\mathbb{R}\), Range \((0, \pi)\)
- \( \sec^{-1} x \): Domain \(\mathbb{R} \setminus (-1, 1)\), Range \(\left[0, \pi\right] \setminus \left\{\frac{\pi}{2}\right\}\)
- \( \cosec^{-1} x \): Domain \(\mathbb{R} \setminus (-1, 1)\), Range \(\left[-\frac{\pi}{2}, \frac{\pi}{2}\right] \setminus \{0\}\)

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can correctly state the domain and range (principal value branch) of all six inverse trigonometric functions, identify whether a given value lies in the domain, and find the principal value of simple inverse trigonometric expressions by selecting the angle that lies in the prescribed range.

## SCOPE_BOUNDARY
This node covers only the definition of the six inverse trigonometric functions via domain restriction, their principal value branches (domains and ranges), and the evaluation of principal values for standard angles. It does NOT cover properties like addition formulas, identities (e.g., \( \sin^{-1}x + \cos^{-1}x = \pi/2 \)), simplification of composite expressions, or solving equations — those are treated in subsequent nodes.

## WALKTHROUGH
Imagine a civil engineer designing a wheelchair ramp: the slope ratio (rise/run) is fixed at 1:12 for safety. To find the angle of inclination, she needs the angle whose tangent is 1/12. The tangent function, however, repeats every \( \pi \) and is not one‑one on its natural domain, so “the angle whose tangent is 1/12” is ambiguous. To get a unique answer, we restrict the tangent function to an interval where it is bijective — the standard choice is \( (-\pi/2, \pi/2) \). This restricted version has an inverse, denoted \( \tan^{-1} \), whose domain is all real numbers and whose range is exactly that interval. The same idea applies to sine, cosine, cotangent, secant, and cosecant: each is restricted to a specific interval (the principal branch) to make it invertible. The key insight is that the domain of the inverse function equals the range of the original restricted function, and the range of the inverse equals the domain of the restricted original function. Once these six pairs are memorised, finding a principal value reduces to asking: “Which angle in the prescribed range gives this trigonometric ratio?”

Takeaway first: the restrictions are not decorations - periodicity destroys one-one-ness, and only the chosen principal branch restores it, making the inverse legal. Exam moves: state questions on all six domains and principal ranges, membership questions on whether a value lies in a domain, and principal-value questions selecting the angle inside the prescribed range. Method: rerun the ramp - ratio known, angle wanted, ambiguity removed by the branch - then memorise the six pairs as one table, not six facts. Check yourself: the inverse's domain is the restricted function's range and vice versa; swapping them is the classic slip. Drill: reproduce the six-pair table from memory and extract three principal values.

## DIAGNOSTIC_QUESTION_1
State the domain and range of the principal value branch of \( \cos^{-1} x \).

## DIAGNOSTIC_ANSWER_1
Domain: \([-1, 1]\); Range: \([0, \pi]\).  
A wrong answer (e.g., range \( [-\pi/2, \pi/2] \) or domain \( \mathbb{R} \)) reveals that the student has confused the principal branch of cosine with that of sine, or has not internalised that cosine is restricted to \([0, \pi]\) to make it one‑one while covering all values from \(-1\) to \(1\).

## DIAGNOSTIC_QUESTION_2
Why is the domain of \( \sec^{-1} x \) given as \( \mathbb{R} \setminus (-1, 1) \) (i.e., \( x \le -1 \) or \( x \ge 1 \))? Explain using the definition of the secant function.

## DIAGNOSTIC_ANSWER_2
The secant function is \( \sec y = 1/\cos y \). Since \( \cos y \in [-1, 1] \), its reciprocal \( \sec y \) satisfies \( |\sec y| \ge 1 \); it never takes values strictly between \(-1\) and \(1\). Therefore, the inverse function \( \sec^{-1} x \) can only accept inputs \( x \) with \( |x| \ge 1 \).  
A wrong answer (e.g., “domain is all real numbers”) shows the student has not linked the domain of the inverse to the range of the original function, a fundamental principle from Class 11 (inverse functions).

## DIAGNOSTIC_QUESTION_3
Find the principal value of \( \tan^{-1}(-\sqrt{3}) \).

## DIAGNOSTIC_ANSWER_3
We need \( \theta \in (-\pi/2, \pi/2) \) such that \( \tan \theta = -\sqrt{3} \).  
\( \tan(-\pi/3) = -\sqrt{3} \) and \( -\pi/3 \in (-\pi/2, \pi/2) \).  
Hence, principal value = \( -\pi/3 \).  
A wrong answer like \( 2\pi/3 \) or \( -\pi/3 \) without checking the range indicates the student either forgot the range of \( \tan^{-1} \) or incorrectly used the general solution of \( \tan \theta = -\sqrt{3} \).

## DIAGNOSTIC_QUESTION_4
Compare the ranges of \( \sin^{-1} x \) and \( \cos^{-1} x \). Why are they different even though both have the same domain \([-1, 1]\)?

## DIAGNOSTIC_ANSWER_4
\( \sin^{-1} x \) has range \( [-\pi/2, \pi/2] \) because sine is restricted to \( [-\pi/2, \pi/2] \) to make it bijective; \( \cos^{-1} x \) has range \( [0, \pi] \) because cosine is restricted to \( [0, \pi] \). The intervals are chosen so that each restricted function is one‑one and covers the full range \([-1, 1]\). They differ because sine and cosine attain the same set of values on different intervals.  
A wrong answer that states the ranges are the same or gives no justification shows the student has memorised the table without understanding the geometric reason (the restricted intervals are where the functions are monotonic and cover \([-1,1]\) exactly once).

## DIAGNOSTIC_QUESTION_5
A student writes: “The principal value of \( \cosec^{-1}(-2) \) is \( -\pi/6 \).” Evaluate this statement and correct it if necessary.

## DIAGNOSTIC_ANSWER_5
The range of \( \cosec^{-1} \) is \( [-\pi/2, \pi/2] \setminus \{0\} \). We need \( \theta \) in this range with \( \cosec \theta = -2 \), i.e., \( \sin \theta = -1/2 \). The angle \( -\pi/6 \) lies in the range and satisfies \( \sin(-\pi/6) = -1/2 \). Therefore the statement is **correct**.  
If a student says it is incorrect because “range of cosec inverse is \( [0, \pi] \)”, they have confused it with \( \cos^{-1} \) or \( \sec^{-1} \). If they give \( 7\pi/6 \), they have used the general solution instead of the principal branch.

## DIAGNOSTIC_QUESTION_6
Create a real‑world problem (with numbers) that requires using the domain of \( \sin^{-1} x \) to decide whether a solution exists. Provide the problem statement and the reasoning.

## DIAGNOSTIC_ANSWER_6
Example problem: “A pendulum of length 2 m is displaced horizontally by 3 m from its equilibrium position. The angle \( \theta \) is given by \( \sin \theta = x/L \). Find \( \theta \) using inverse sine.”  
Reasoning: \( x/L = 3/2 = 1.5 \). Since the domain of \( \sin^{-1} \) is \([-1, 1]\), \( 1.5 \) is not in the domain — no real angle satisfies this. The physical interpretation: the displacement cannot exceed the length of the pendulum.  
A poor answer might give a problem where the ratio is within \([-1,1]\) (missing the domain check) or fail to explain why the domain matters.

## COMMON_MISCONCEPTION
**Notation confusion:** Many students write \( \sin^{-1} x \) and think it means \( (\sin x)^{-1} = \frac{1}{\sin x} = \cosec x \). For example, they might “simplify” \( \sin^{-1}(1/2) \) as \( 1/(\sin(1/2)) \) or claim \( \sin^{-1} x = \cosec x \). This is a catastrophic error because \( \sin^{-1} \) denotes the inverse function (angle whose sine is \( x \)), while \( (\sin x)^{-1} \) is the reciprocal. The superscript \(-1\) on a function name always means inverse; on a variable it means reciprocal. In competitive exams, this confusion leads to completely wrong answers in simplification and calculus problems.

## ON_FAILURE
1. Re‑visit the definition of inverse functions from Class 11 (node `c11_math_cbse_02_005`): if \( f \) is bijective, \( f^{-1}(y) = x \iff f(x) = y \). Emphasise that \( f^{-1} \) is a function, not a reciprocal.
2. Contrast \( \sin^{-1} x \) and \( (\sin x)^{-1} \) with a concrete example: \( \sin^{-1}(0.5) = \pi/6 \approx 0.524 \), while \( (\sin 0.5)^{-1} \approx 1/(\sin 0.5) \approx 2.085 \). They are different numbers.
3. Practice 5‑10 problems where the student must identify whether the notation denotes inverse or reciprocal (e.g., \( \tan^{-1} 1 \) vs \( \tan 1^{-1} \) vs \( (\tan 1)^{-1} \)).
4. Re‑diagnose with a question: “Evaluate \( \sin^{-1}(1/2) \) and \( (\sin(1/2))^{-1} \); explain the difference.”

## PREREQUISITE_NODE_IDS
c11_math_cbse_03_007, c11_math_cbse_02_005, c11_math_cbse_03_003
## PREREQUISITE_REASONS
c11_math_cbse_03_007: Domain and range of trigonometric functions are the starting point for restricting them to principal branches.
c11_math_cbse_02_005: Understanding that an inverse function exists only for bijective functions, and that domain/range swap, is essential.
c11_math_cbse_03_003: Basic definitions of sin, cos, tan, cot, sec, cosec and their values at standard angles are needed to evaluate principal values.

## FORWARD_NODE_IDS
c12_math_cbse_02_002, c12_math_cbse_02_003, c12_math_cbse_02_004, c12_math_cbse_02_005, c12_math_cbse_02_006, c12_math_cbse_02_007, c12_math_cbse_02_008

## FORWARD_REASONS
c12_math_cbse_02_002: Once domains and ranges are known, the next step is to understand how to compute principal values for non‑standard angles and handle expressions like \( \sin^{-1}(\sin x) \).
c12_math_cbse_02_003: Properties (e.g., \( \sin^{-1}(-x) = -\sin^{-1}x \)) rely on the symmetry of the principal branches.
c12_math_cbse_02_004: The identity \( \sin^{-1}x + \cos^{-1}x = \pi/2 \) directly uses the complementary ranges of the two principal branches.
c12_math_cbse_02_005: Understanding the domain and range of tan⁻¹ (R → (-π/2, π/2)) is essential for knowing when the sum exceeds the principal range and needs ±π adjustment.  
c12_math_cbse_02_006: Domain and range of inverse trigonometric functions are needed to understand why the identity is restricted to $[-1, 1]$.  
c12_math_cbse_02_007: Need domain/range of inverse functions to verify simplified results lie in correct intervals  
c12_math_cbse_02_008: Provides the domain and range of each inverse trig function, essential to check validity of ratios and principal values.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_03_007, c11_math_cbse_03_003
## CROSS_SUBJECT_REASONS
c11_math_cbse_03_007: The restricted domains/ranges of trigonometric functions are used in physics (e.g., simple harmonic motion, wave phase angles) to define inverse functions that return unique angles.
c11_math_cbse_03_003: Trigonometric ratios (sin, cos, tan) and their standard values are fundamental in physics for resolving vectors, calculating work done, and analysing projectile motion.

## CHAIN_DESCRIPTION
c11_math_cbse_03_007 -> c12_math_cbse_02_001 -> c12_math_cbse_02_002

## THIS_FORMULA
sin⁻¹: Domain = [-1, 1], Range = [-π/2, π/2]; cos⁻¹: Domain = [-1, 1], Range = [0, π]; tan⁻¹: Domain = ℝ, Range = (-π/2, π/2); cot⁻¹: Domain = ℝ, Range = (0, π); sec⁻¹: Domain = ℝ \ (-1, 1), Range = [0, π] \ {π/2}; cosec⁻¹: Domain = ℝ \ (-1, 1), Range = [-π/2, π/2] \ {0}

## FORMULA_VARIABLES
x = input value (real number); output = angle in radians (principal value).

## FORMULA_UNITS
Radians (dimensionless).

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c11_math_cbse_03_007 | The principal value branches of inverse trigonometric functions are used in physics to obtain unique angles from trigonometric ratios, e.g., finding the phase angle in SHM or the angle of incidence in optics.
c11_math_cbse_03_003 | Standard trigonometric values (sin, cos, tan at 0, π/6, π/4, π/3, π/2) are directly used to evaluate principal values without a calculator, a skill required in both board exams and JEE/NEET physics problems.
## PREREQ_CONCEPT
Bijectivity of a function and the fact that the domain of an inverse function equals the range of the original function, and vice versa.

## PREREQ_BEFORE
The student must be able to sketch the graphs of the six trigonometric functions, state their natural domains and ranges, and explain what it means for a function to be one‑one and onto.

## PREREQ_STUCK
Review the graphs and domain/range of trigonometric functions (c11_math_cbse_03_007) and the definition of inverse functions (c11_math_cbse_02_005).

## WORKED_EXAMPLE_1
PROBLEM: A ladder 10 m long leans against a vertical wall. The foot of the ladder is 6 m away from the wall. Find the angle (in radians) that the ladder makes with the ground, using the appropriate inverse trigonometric function. Give the principal value.

STEPS:
- Step 1: Identify the given data. Ladder length = hypotenuse = 10 m. Distance from wall = adjacent side = 6 m.
- Step 2: Choose the trigonometric ratio that involves adjacent and hypotenuse: cosine. cos θ = adjacent/hypotenuse = 6/10 = 3/5.
- Step 3: The angle θ = cos⁻¹(3/5). The principal value branch of cos⁻¹ has range [0, π]. Since 3/5 > 0, the angle lies in the first quadrant.
- Step 4: 3/5 is not a standard angle; we leave the answer as cos⁻¹(3/5) or approximate using a calculator. For exact principal value, we write θ = cos⁻¹(3/5). (In board exams, if the ratio is not standard, the answer is expressed as an inverse trig function.)
- Step 5: Verify that 3/5 ∈ [-1, 1] (domain of cos⁻¹) and the resulting angle will be in [0, π]. The answer is physically meaningful: the ladder makes an acute angle with the ground.

REASONING: The cosine function is restricted to [0, π] to make it bijective; its inverse cos⁻¹ returns the unique angle in that range with the given cosine. The problem directly maps the physical ratio to the principal value.

ANSWER: θ = cos⁻¹(3/5) radians (≈ 0.927 rad).

## WORKED_EXAMPLE_2
PROBLEM: Find the principal value of sin⁻¹(-1/√2).

STEPS:
- Step 1: Recall the domain and range of sin⁻¹: Domain = [-1, 1], Range = [-π/2, π/2].
- Step 2: Check that -1/√2 ≈ -0.707 lies in [-1, 1]. It does.
- Step 3: We need an angle θ ∈ [-π/2, π/2] such that sin θ = -1/√2.
- Step 4: Standard angle with sine 1/√2 is π/4. Since sine is negative in the fourth quadrant (and also in the third, but third quadrant is not in the range), the required angle is -π/4.
- Step 5: Confirm -π/4 ∈ [-π/2, π/2] and sin(-π/4) = -1/√2.

REASONING: The principal value branch of sine is chosen as [-π/2, π/2] because sine is strictly increasing there and covers all values from -1 to 1 exactly once. The negative input gives a negative angle in the fourth quadrant.

ANSWER: -π/4 radians.

## WORKED_EXAMPLE_3
PROBLEM: Find the domain of the function f(x) = sin⁻¹(2x - 1) + cos⁻¹(x + 1/2).

STEPS:
- Step 1: The domain of f is the intersection of the domains of the two inverse trigonometric terms.
- Step 2: For sin⁻¹(2x - 1) to be defined, its argument must satisfy -1 ≤ 2x - 1 ≤ 1.
  Solve: -1 ≤ 2x - 1 ≤ 1 → Add 1: 0 ≤ 2x ≤ 2 → Divide by 2: 0 ≤ x ≤ 1.
- Step 3: For cos⁻¹(x + 1/2) to be defined, its argument must satisfy -1 ≤ x + 1/2 ≤ 1.
  Solve: -1 ≤ x + 1/2 ≤ 1 → Subtract 1/2: -3/2 ≤ x ≤ 1/2.
- Step 4: Intersection of [0, 1] and [-3/2, 1/2] is [0, 1/2].
- Step 5: Check endpoints: x = 0 gives sin⁻¹(-1) = -π/2 and cos⁻¹(1/2) = π/3, both defined. x = 1/2 gives sin⁻¹(0) = 0 and cos⁻¹(1) = 0, both defined.
- Step 6: Therefore, the domain of f is [0, 1/2].

REASONING: The domain of a sum of functions is the intersection of their individual domains. Each inverse trigonometric function imposes a condition on its argument based on its principal domain.

ANSWER: Domain = [0, 1/2].

## COMPETENCY_QUESTION_1
QUESTION: A student is asked to find the principal value of cos⁻¹(-1/√2). She writes the answer as 3π/4. Another student writes 5π/4.  
(a) Which answer is correct according to the definition of the principal value branch of cos⁻¹?  
(b) Explain why the other answer is not accepted as the principal value.  
(c) If the question had asked for “the value of cos⁻¹(-1/√2) without specifying principal value”, would both answers be acceptable? Why or why not?

COMPETENCY: Error identification and correction

STEPS:
- Step 1: Recall the range of the principal value branch of cos⁻¹: [0, π].
- Step 2: Check each proposed angle: 3π/4 ∈ [0, π] and cos(3π/4) = -1/√2. 5π/4 ∉ [0, π] (it is > π).
- Step 3: Conclude that 3π/4 is the principal value; 5π/4 is a valid angle with the same cosine but lies outside the principal range.
- Step 4: Without the “principal value” specification, cos⁻¹ is ambiguous because cosine is not one‑one on ℝ. By convention, cos⁻¹ denotes the principal branch unless stated otherwise, so only 3π/4 is correct.

ANSWER: (a) 3π/4 is correct. (b) 5π/4 is not in the range [0, π] of the principal branch. (c) No; the notation cos⁻¹ universally means the principal value branch in standard mathematics (CBSE, JEE, NEET). The general solution would be written as 2nπ ± 3π/4.

DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: In a physics experiment, the angle of a pendulum from the vertical is given by θ = sin⁻¹(x/L), where x is the horizontal displacement and L is the length of the pendulum.  
(a) If L = 2 m and x = 1 m, find θ in degrees (principal value).  
(b) If the student mistakenly uses x = 2.5 m in the same formula, what happens? Explain using the domain of sin⁻¹.  
(c) Suppose the pendulum is released from rest at x = 1 m. The angular displacement as a function of time is θ(t) = sin⁻¹( (1/2) sin(ωt) ). What is the maximum value of θ(t)? Justify using the range of sin⁻¹.

COMPETENCY: Translating real-world situations to mathematical expressions

STEPS:
- Step 1: For (a), compute x/L = 1/2. Domain of sin⁻¹ is [-1,1], so valid. Principal value: sin⁻¹(1/2) = π/6 rad = 30°.
- Step 2: For (b), x/L = 2.5/2 = 1.25 ∉ [-1,1]. sin⁻¹(1.25) is undefined. Physically, the horizontal displacement cannot exceed the length of the pendulum.
- Step 3: For (c), the argument of sin⁻¹ is (1/2) sin(ωt). Since |sin(ωt)| ≤ 1, the argument lies in [-1/2, 1/2] ⊂ [-1,1]. The maximum of sin⁻¹ occurs at the maximum argument, i.e., when sin(ωt) = 1 → argument = 1/2. Then θ_max = sin⁻¹(1/2) = π/6. The range of sin⁻¹ is [-π/2, π/2], so π/6 is attainable.

ANSWER: (a) 30° (or π/6 rad). (b) The formula gives an undefined value because 1.25 is outside the domain of sin⁻¹; physically, x cannot exceed L. (c) Maximum θ = π/6 rad (30°), because the argument of sin⁻¹ is at most 1/2 and sin⁻¹ is increasing on its domain.

DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The inverse trigonometric functions are defined by ______ the domains of the standard trigonometric functions to intervals where they become bijective (one‑one and onto).

## DIAGNOSTIC_ANSWER_7
restricting

Restricting is the legal move: the periodic functions are fenced into intervals where they behave one-one, and only then inverted. **A wrong answer (extending) reveals the student has widened the domain when the entire construction depends on narrowing it.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a civil engineer designing a wheelchair ramp: the slope ______ (rise/run) is fixed at 1:12 for safety.

## DIAGNOSTIC_ANSWER_8
ratio

Ratio is the sensor's reading: the ramp hands the engineer a rise-over-run number, and the inverse must translate it into a tilt. **A wrong answer (an angle) reveals the student has started from the answer the inverse function exists to find.**

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can correctly state the domain and range (principal value branch) of all six inverse trigonometric functions, identify whether a given value lies in the domain, and find the principal value of simple inverse trigonometric expressions by selecting the angle that lies in the prescribed range.

## DIAGNOSTIC_QUESTION_10
Fill in the blank: Imagine a civil engineer designing a ______ ramp: the slope ratio (rise/run) is fixed at 1:12 for safety.

## DIAGNOSTIC_ANSWER_10
wheelchair

The wheelchair word fixes the stakes: the ramp's safety ratio is why the angle must be recovered uniquely, not approximately. **A wrong answer (any other structure) reveals the student has swapped the walkthrough's engineered scenario for a generic triangle.**
