## ELI5
The inverse trig identities are contracts with fine print: each holds only inside the principal branches. Sin of arcsin x returns x - but only for x between minus one and one; arcsin of sin x returns x - but only for the angle inside the branch. Negative-argument rules, reciprocal rules, and the complementary pair summing to pi by two all carry their own gates. Ignoring the fine print is where marks go to die: evaluate arcsin of sin of a wide angle naively and the branch quietly returns a different angle.

## DEFINITION
The properties of inverse trigonometric functions are a set of identities that relate inverse trigonometric functions to their corresponding trigonometric functions, to each other, and to algebraic expressions. These identities hold **only within the principal value branches** (specified domains and ranges) and include: (1) inverse function properties \( f(f^{-1}(x)) = x \) and \( f^{-1}(f(x)) = x \) with domain restrictions, (2) negative argument properties like \( \sin^{-1}(-x) = -\sin^{-1}x \), (3) reciprocal relations like \( \sin^{-1}x = \cosec^{-1}(1/x) \), and (4) complementary relations like \( \sin^{-1}x + \cos^{-1}x = \frac{\pi}{2} \). Each property has explicit domain conditions that must be verified before application.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can correctly apply the principal-value properties to simplify expressions (e.g., \( \tan^{-1}(\tan \frac{3\pi}{4}) \)) and solve equations (e.g., \( \sin^{-1}x + \cos^{-1}x = \frac{\pi}{3} \)) by first checking domain/range conditions, and can explain why a property fails when the input lies outside the principal branch.

## SCOPE_BOUNDARY
This node covers the fundamental properties listed in NCERT Section 2.3: inverse function properties, negative argument properties, reciprocal relations, and complementary relations. It does **NOT** cover the addition formula for \( \tan^{-1}x + \tan^{-1}y \) (node c12_math_cbse_02_005), the double-angle identity \( 2\tan^{-1}x = \sin^{-1}\frac{2x}{1+x^2} \) (node c12_math_cbse_02_006), advanced simplification techniques (node c12_math_cbse_02_007), or word problems (node c12_math_cbse_02_008).

## WALKTHROUGH
Imagine you are an architect designing a wheelchair ramp for a school in Delhi. The ramp must rise 1 metre over a horizontal distance of 2 metres. The angle of inclination \( \theta \) satisfies \( \tan\theta = \frac{1}{2} \), so \( \theta = \tan^{-1}(0.5) \). But the building code requires the angle to be between \( 0 \) and \( \frac{\pi}{2} \). How do you know \( \tan^{-1}(0.5) \) automatically gives an angle in that range? This is exactly the principal value branch property: \( \tan^{-1} : \mathbb{R} \to (-\frac{\pi}{2}, \frac{\pi}{2}) \). Start by writing down the domain and range of each inverse function from nodes c12_math_cbse_02_001 and c12_math_cbse_02_002. Then, for any property like \( \sin(\sin^{-1}x) = x \), ask: "Is \( x \) in \( [-1, 1] \)?" and "Is the output angle in \( [-\frac{\pi}{2}, \frac{\pi}{2}] \)?" The key insight is that **every property has a hidden "if and only if" condition on the domain/range** — ignoring it is the #1 source of errors in board and JEE exams.

Takeaway first: every identity is a conditional statement - the equation is true exactly when the input respects the branch, and the condition is part of the answer. Exam moves: simplification questions on compositions like arctan of tan of a wide angle, equation questions combining two inverses, and explain questions on why a property fails outside the branch. Method: rerun the ramp architect - the code demands the angle in a range, and the branch delivers - then test each identity's gate before walking through. Check yourself: sin of arcsin x is safe for all x in the domain, but arcsin of sin x is not safe for all angles - the asymmetry is the lesson. Drill: evaluate three compositions, one of them outside the branch, and state each gate.

## DIAGNOSTIC_QUESTION_1
State the exact domain and range (principal value branch) for \( \cos^{-1}x \) and \( \cot^{-1}x \). Then write the identity \( \cos(\cos^{-1}x) = x \) with its valid domain condition.

## DIAGNOSTIC_ANSWER_1
\( \cos^{-1}x : [-1, 1] \to [0, \pi] \); \( \cot^{-1}x : \mathbb{R} \to (0, \pi) \). Identity: \( \cos(\cos^{-1}x) = x \) for \( x \in [-1, 1] \). A wrong answer (e.g., range \( [-\frac{\pi}{2}, \frac{\pi}{2}] \) for \( \cos^{-1} \) or missing domain condition) reveals the student has memorised formulas without internalising the principal branch restrictions — this leads to errors like evaluating \( \cos^{-1}(\cos \frac{3\pi}{2}) = \frac{3\pi}{2} \) (outside range).

## DIAGNOSTIC_QUESTION_2
Explain why \( \sin^{-1}(\sin \frac{5\pi}{6}) \neq \frac{5\pi}{6} \). What is the correct value? Show how to find it using the principal branch range.

## DIAGNOSTIC_ANSWER_2
\( \frac{5\pi}{6} \notin [-\frac{\pi}{2}, \frac{\pi}{2}] \) (range of \( \sin^{-1} \)). Since \( \sin \frac{5\pi}{6} = \sin(\pi - \frac{5\pi}{6}) = \sin \frac{\pi}{6} = \frac{1}{2} \), and \( \frac{\pi}{6} \in [-\frac{\pi}{2}, \frac{\pi}{2}] \), we have \( \sin^{-1}(\sin \frac{5\pi}{6}) = \frac{\pi}{6} \). A student who answers \( \frac{5\pi}{6} \) is applying \( f^{-1}(f(x)) = x \) blindly without checking if \( x \) lies in the principal range — a classic board exam trap.

## DIAGNOSTIC_QUESTION_3
Evaluate \( \tan^{-1}(-\sqrt{3}) + \cot^{-1}(-\sqrt{3}) \) using the complementary relation and negative argument properties. Show all steps.

## DIAGNOSTIC_ANSWER_3
Using \( \tan^{-1}(-x) = -\tan^{-1}x \) and \( \cot^{-1}(-x) = \pi - \cot^{-1}x \):
\( \tan^{-1}(-\sqrt{3}) = -\tan^{-1}\sqrt{3} = -\frac{\pi}{3} \).
\( \cot^{-1}(-\sqrt{3}) = \pi - \cot^{-1}\sqrt{3} = \pi - \frac{\pi}{6} = \frac{5\pi}{6} \).
Sum = \( -\frac{\pi}{3} + \frac{5\pi}{6} = \frac{-2\pi + 5\pi}{6} = \frac{\pi}{2} \).
Alternatively, use \( \tan^{-1}x + \cot^{-1}x = \frac{\pi}{2} \) directly: \( \tan^{-1}(-\sqrt{3}) + \cot^{-1}(-\sqrt{3}) = \frac{\pi}{2} \). A wrong answer (e.g., \( -\frac{\pi}{2} \)) reveals confusion about the range of \( \cot^{-1} \) (which is \( (0,\pi) \), so \( \cot^{-1}(-\sqrt{3}) \) must be in \( (\frac{\pi}{2}, \pi) \), not negative).

## DIAGNOSTIC_QUESTION_4
Compare the two expressions: \( \sin^{-1}(\frac{1}{x}) \) and \( \cosec^{-1}(x) \). For which real values of \( x \) are they equal? Justify using domain/range.

## DIAGNOSTIC_ANSWER_4
\( \sin^{-1}(\frac{1}{x}) = \cosec^{-1}(x) \) holds when both sides are defined and in the same principal branch.
Domain of LHS: \( \frac{1}{x} \in [-1,1] \setminus \{0\} \Rightarrow |x| \ge 1 \).
Domain of RHS: \( x \in \mathbb{R} \setminus (-1,1) \Rightarrow |x| \ge 1 \).
Range of LHS: \( [-\frac{\pi}{2}, \frac{\pi}{2}] \setminus \{0\} \).
Range of RHS: \( [-\frac{\pi}{2}, \frac{\pi}{2}] \setminus \{0\} \).
Thus equality holds for all \( x \) with \( |x| \ge 1 \). A student who says "for all \( x \neq 0 \)" misses the domain restriction \( |x| \ge 1 \) (since \( \sin^{-1} \) only accepts \( [-1,1] \)).

## DIAGNOSTIC_QUESTION_5
A student solves \( \cos^{-1}(2x) = \frac{\pi}{3} \) as follows: "Take cosine both sides: \( 2x = \cos\frac{\pi}{3} = \frac{1}{2} \), so \( x = \frac{1}{4} \)." Is this solution complete? If not, what verification step is missing?

## DIAGNOSTIC_ANSWER_5
The solution is incomplete. The student must verify that \( 2x = \frac{1}{2} \) lies in the domain of \( \cos^{-1} \), i.e., \( 2x \in [-1,1] \). Here \( 2(\frac{1}{4}) = \frac{1}{2} \in [-1,1] \), so \( x = \frac{1}{4} \) is valid. However, if the equation were \( \cos^{-1}(2x) = \pi \), the same steps would give \( 2x = -1 \), \( x = -\frac{1}{2} \), which is valid. But if the equation were \( \cos^{-1}(2x) = 2\pi \), the steps would give \( 2x = 1 \), \( x = \frac{1}{2} \), but \( 2\pi \notin [0,\pi] \) (range of \( \cos^{-1} \)), so no solution exists. The missing step is **checking that the given angle lies in the principal range** of the inverse function. This is a frequent JEE trap.

## DIAGNOSTIC_QUESTION_6
Create a problem where a student must use the property \( \sin^{-1}(-x) = -\sin^{-1}x \) to simplify an expression, but the input \( x \) is such that the property **cannot** be applied directly. Explain the trap.

## DIAGNOSTIC_ANSWER_6
Problem: Simplify \( \sin^{-1}(-2) \). Trap: \( -2 \notin [-1,1] \), so \( \sin^{-1}(-2) \) is **undefined**. A student who blindly writes \( -\sin^{-1}(2) \) is applying the property outside its domain. The property \( \sin^{-1}(-x) = -\sin^{-1}x \) is only valid for \( x \in [-1,1] \). A good answer identifies the domain violation and states the expression is meaningless. This tests whether the student treats properties as conditional identities, not universal algebraic rules.

## COMMON_MISCONCEPTION
**Misconception:** "\( \sin^{-1}(\sin x) = x \) for all real \( x \)."  
**Exact wrong step:** A student evaluates \( \sin^{-1}(\sin \frac{3\pi}{4}) \) and writes \( \frac{3\pi}{4} \).  
**Why it's wrong:** The range of \( \sin^{-1} \) is \( [-\frac{\pi}{2}, \frac{\pi}{2}] \). Since \( \frac{3\pi}{4} \notin [-\frac{\pi}{2}, \frac{\pi}{2}] \), the composition does not return the original angle. Instead, \( \sin \frac{3\pi}{4} = \sin(\pi - \frac{3\pi}{4}) = \sin \frac{\pi}{4} \), so \( \sin^{-1}(\sin \frac{3\pi}{4}) = \frac{\pi}{4} \). This error costs 2-3 marks in board exams (step marking for domain check) and appears in JEE as a multiple-choice trap where \( \frac{3\pi}{4} \) is a distractor option.

## ON_FAILURE
1. Revisit **c12_math_cbse_02_001** (Domain and Range) and **c12_math_cbse_02_002** (Principal Value Branches). Write down the domain and range of all six inverse functions from memory.  
2. For each property (e.g., \( \sin^{-1}(\sin x) = x \)), write the **exact condition** on \( x \) (e.g., \( x \in [-\frac{\pi}{2}, \frac{\pi}{2}] \)) next to it.  
3. Do a re-diagnostic: Evaluate \( \cos^{-1}(\cos \frac{4\pi}{3}) \) and \( \tan^{-1}(\tan \frac{5\pi}{6}) \) correctly by first finding an equivalent angle in the principal range. If you get \( \frac{4\pi}{3} \) or \( \frac{5\pi}{6} \), repeat step 2.

## PREREQUISITE_NODE_IDS
c12_math_cbse_02_001, c12_math_cbse_02_002, c11_math_cbse_03_003, c11_math_cbse_03_004, c11_math_cbse_03_005, c11_math_cbse_03_006, c11_math_cbse_03_007, c11_math_cbse_03_008, c11_math_cbse_03_009, c10_math_cbse_08_001, c10_math_cbse_08_006, c10_math_cbse_08_009, c11_math_cbse_03_010, c12_phy_cbse_07_001

## PREREQUISITE_REASONS
c12_math_cbse_02_001: Provides the domain of each inverse function (e.g., \( \sin^{-1} \) domain \( [-1,1] \)), essential for checking validity of properties.
c12_math_cbse_02_002: Provides the principal value range (e.g., \( \sin^{-1} \) range \( [-\frac{\pi}{2}, \frac{\pi}{2}] \)), which determines when \( f^{-1}(f(x)) = x \) holds.
c11_math_cbse_03_003: Defines \( \sin, \cos, \tan \) for any angle using unit circle — needed to compute values like \( \sin \frac{5\pi}{6} \).
c11_math_cbse_03_004: Gives trigonometric values for acute angles, used in substitution methods (e.g., \( x = \sin\theta \)).
c11_math_cbse_03_005: Extends trig functions to all quadrants, needed to handle angles outside principal range.
c11_math_cbse_03_006: Sign rules in quadrants, used when simplifying \( \sin^{-1}(\sin x) \) for \( x \) in different quadrants.
c11_math_cbse_03_007: Domain and range of trigonometric functions, foundation for understanding inverse restrictions.
c11_math_cbse_03_008: Pythagorean identities, used in substitution simplifications (e.g., \( \sqrt{1-\sin^2\theta} = \cos\theta \)).
c11_math_cbse_03_009: Sum/difference formulas, used in deriving addition formulas (later nodes) and in simplifications.
c11_math_cbse_03_010: Double angle formulas, used in properties like \( 2\sin^{-1}x = \sin^{-1}(2x\sqrt{1-x^2}) \).
c10_math_cbse_08_001: Basic trigonometric ratios in right triangles — intuitive foundation for inverse functions.
c10_math_cbse_08_006: Identity \( \sin^2\theta + \cos^2\theta = 1 \), used extensively in algebraic simplifications.
c10_math_cbse_08_009: Complementary angle relations, basis for \( \sin^{-1}x + \cos^{-1}x = \frac{\pi}{2} \).
c12_phy_cbse_07_001: c12_phy_cbse_07_001 | In AC circuits, phase difference \( \phi = \tan^{-1}(\frac{X_L - X_C}{R}) \) uses principal value of \( \tan^{-1} \) to determine if voltage leads or lags current.  

## FORWARD_NODE_IDS
c12_math_cbse_02_004, c12_math_cbse_02_005, c12_math_cbse_02_006, c12_math_cbse_02_007, c12_math_cbse_02_008
## FORWARD_REASONS
c12_math_cbse_02_004: The complementary relation \( \sin^{-1}x + \cos^{-1}x = \frac{\pi}{2} \) is a direct application of the basic properties and domain/range knowledge from this node.
c12_math_cbse_02_005: The addition formula \( \tan^{-1}x + \tan^{-1}y = \tan^{-1}\frac{x+y}{1-xy} \) requires understanding of principal ranges to handle the \( \pi \) adjustment cases.
c12_math_cbse_02_006: The double-angle identity \( 2\tan^{-1}x = \sin^{-1}\frac{2x}{1+x^2} \) uses substitution \( x = \tan\theta \) and the property \( \tan^{-1}(\tan\theta) = \theta \) with range checks.
c12_math_cbse_02_007: Advanced simplification (e.g., \( \tan^{-1}\sqrt{\frac{1-x}{1+x}} \)) relies on the substitution techniques and domain checks mastered here.
c12_math_cbse_02_008: Word problems (height/distance, geometry) require translating real situations into inverse trig equations and solving using these properties.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_03_003, c11_math_cbse_03_005, c11_math_cbse_03_006, c11_math_cbse_03_007, c11_math_cbse_03_008
## CROSS_SUBJECT_REASONS
c11_math_cbse_03_003: Unit circle definition of trig functions is used in physics (e.g., SHM phase angle \( \phi = \sin^{-1}(x/A) \)) where principal value determines the initial phase.
c11_math_cbse_03_005: Trigonometric functions of any angle are used in physics (AC circuits, wave optics) where inverse functions return principal angles that must be adjusted for correct quadrant.
c11_math_cbse_03_006: Sign of trig functions in quadrants is critical in physics (e.g., work done \( W = Fd\cos\theta \), where \( \theta = \cos^{-1}(W/Fd) \) must be in \( [0,\pi] \)).
c11_math_cbse_03_007: Domain/range of trig functions underpins the existence of inverses in engineering (e.g., control systems, signal processing).
c11_math_cbse_03_008: Pythagorean identities are used in calculus (integration by trigonometric substitution) where inverse trig functions appear as antiderivatives.

## CHAIN_DESCRIPTION
c12_math_cbse_02_001 -> c12_math_cbse_02_002 -> c12_math_cbse_02_003 -> c12_math_cbse_02_004 -> c12_math_cbse_02_005

## THIS_FORMULA
Key properties (with domain conditions):
1. \( \sin(\sin^{-1}x) = x \), \( x \in [-1,1] \); \( \sin^{-1}(\sin x) = x \), \( x \in [-\frac{\pi}{2}, \frac{\pi}{2}] \)
2. \( \cos(\cos^{-1}x) = x \), \( x \in [-1,1] \); \( \cos^{-1}(\cos x) = x \), \( x \in [0, \pi] \)
3. \( \tan(\tan^{-1}x) = x \), \( x \in \mathbb{R} \); \( \tan^{-1}(\tan x) = x \), \( x \in (-\frac{\pi}{2}, \frac{\pi}{2}) \)
4. \( \sin^{-1}(-x) = -\sin^{-1}x \), \( x \in [-1,1] \); \( \cos^{-1}(-x) = \pi - \cos^{-1}x \), \( x \in [-1,1] \); \( \tan^{-1}(-x) = -\tan^{-1}x \), \( x \in \mathbb{R} \)
5. \( \sin^{-1}x = \cosec^{-1}\frac{1}{x} \), \( |x| \ge 1 \); \( \cos^{-1}x = \sec^{-1}\frac{1}{x} \), \( |x| \ge 1 \); \( \tan^{-1}x = \cot^{-1}\frac{1}{x} \), \( x > 0 \)
6. \( \sin^{-1}x + \cos^{-1}x = \frac{\pi}{2} \), \( x \in [-1,1] \); \( \tan^{-1}x + \cot^{-1}x = \frac{\pi}{2} \), \( x \in \mathbb{R} \); \( \cosec^{-1}x + \sec^{-1}x = \frac{\pi}{2} \), \( |x| \ge 1 \)

## FORMULA_VARIABLES
\( x \) = real number input to inverse trigonometric function; must satisfy domain condition for each property. Angles are in radians (principal values).

## FORMULA_UNITS
dimensionless (angles in radians, ratios are pure numbers)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_03_001 | Inverse trigonometric functions appear in physics when finding angles from ratios (e.g., angle of incidence from Snell's law \( \theta_2 = \sin^{-1}(\frac{n_1}{n_2}\sin\theta_1) \)), where principal value gives the physically correct acute angle.
 c12_phy_cbse_07_001 | In AC circuits, phase difference \( \phi = \tan^{-1}(\frac{X_L - X_C}{R}) \) uses principal value of \( \tan^{-1} \) to determine if voltage leads or lags current.
## PREREQ_CONCEPT
Principal value branches (domain and range) of all six inverse trigonometric functions.

## PREREQ_BEFORE
The student must be able to instantly recall the domain and range of \( \sin^{-1}, \cos^{-1}, \tan^{-1}, \cosec^{-1}, \sec^{-1}, \cot^{-1} \) and evaluate basic trigonometric ratios for standard angles (0, π/6, π/4, π/3, π/2, π, etc.).

## PREREQ_STUCK
If stuck, immediately revisit c12_math_cbse_02_001 and c12_math_cbse_02_002 and write the domain/range table three times from memory.

## WORKED_EXAMPLE_1
PROBLEM: Find the principal value of \( \tan^{-1}(\tan \frac{7\pi}{6}) \).
STEPS:
- Step 1: Identify the given angle \( \frac{7\pi}{6} \) and the principal range of \( \tan^{-1} \), which is \( (-\frac{\pi}{2}, \frac{\pi}{2}) \).
- Step 2: Check if \( \frac{7\pi}{6} \) lies in \( (-\frac{\pi}{2}, \frac{\pi}{2}) \). Since \( \frac{7\pi}{6} \approx 210^\circ \) and \( (-\frac{\pi}{2}, \frac{\pi}{2}) \approx (-90^\circ, 90^\circ) \), it does NOT lie in the principal range.
- Step 3: Use the periodicity of tangent: \( \tan(\pi + \theta) = \tan\theta \). Write \( \frac{7\pi}{6} = \pi + \frac{\pi}{6} \). So \( \tan \frac{7\pi}{6} = \tan \frac{\pi}{6} = \frac{1}{\sqrt{3}} \).
- Step 4: Now \( \frac{\pi}{6} \in (-\frac{\pi}{2}, \frac{\pi}{2}) \), so \( \tan^{-1}(\tan \frac{7\pi}{6}) = \tan^{-1}(\tan \frac{\pi}{6}) = \frac{\pi}{6} \).
- Step 5: Verify: \( \frac{\pi}{6} \) is in the principal range, and \( \tan \frac{\pi}{6} = \frac{1}{\sqrt{3}} = \tan \frac{7\pi}{6} \). Correct.
REASONING: The property \( \tan^{-1}(\tan x) = x \) only holds when \( x \) is in the principal range \( (-\frac{\pi}{2}, \frac{\pi}{2}) \). For angles outside, we use periodicity to find an equivalent angle inside the range. This is the standard method for all "inverse of trig" compositions.
ANSWER: \( \frac{\pi}{6} \)

## WORKED_EXAMPLE_2
PROBLEM: Simplify \( \cos^{-1}(-\frac{1}{2}) + \sin^{-1}(-\frac{\sqrt{3}}{2}) \) using negative argument properties.
STEPS:
- Step 1: Recall negative argument properties: \( \cos^{-1}(-x) = \pi - \cos^{-1}x \) for \( x \in [-1,1] \), and \( \sin^{-1}(-x) = -\sin^{-1}x \) for \( x \in [-1,1] \).
- Step 2: Apply to first term: \( \cos^{-1}(-\frac{1}{2}) = \pi - \cos^{-1}(\frac{1}{2}) \). Since \( \cos^{-1}(\frac{1}{2}) = \frac{\pi}{3} \) (principal value), this becomes \( \pi - \frac{\pi}{3} = \frac{2\pi}{3} \).
- Step 3: Apply to second term: \( \sin^{-1}(-\frac{\sqrt{3}}{2}) = -\sin^{-1}(\frac{\sqrt{3}}{2}) \). Since \( \sin^{-1}(\frac{\sqrt{3}}{2}) = \frac{\pi}{3} \), this becomes \( -\frac{\pi}{3} \).
- Step 4: Add the results: \( \frac{2\pi}{3} + (-\frac{\pi}{3}) = \frac{\pi}{3} \).
- Step 5: Cross-check using complementary relation: \( \cos^{-1}(-\frac{1}{2}) = \frac{2\pi}{3} \), \( \sin^{-1}(-\frac{\sqrt{3}}{2}) = -\frac{\pi}{3} \). Sum = \( \frac{\pi}{3} \). Both terms are in their respective principal ranges (\( \frac{2\pi}{3} \in [0,\pi] \), \( -\frac{\pi}{3} \in [-\frac{\pi}{2}, \frac{\pi}{2}] \)).
REASONING: Negative argument properties convert negative inputs to positive ones, allowing use of standard angle values. The complementary relation \( \sin^{-1}x + \cos^{-1}x = \frac{\pi}{2} \) is NOT directly applicable here because the arguments are different (\( -\frac{1}{2} \) vs \( -\frac{\sqrt{3}}{2} \)).
ANSWER: \( \frac{\pi}{3} \)

## WORKED_EXAMPLE_3
PROBLEM: Prove that \( \sin^{-1}\frac{3}{5} - \cos^{-1}\frac{12}{13} = \sin^{-1}\frac{16}{65} \).
STEPS:
- Step 1: Let \( \alpha = \sin^{-1}\frac{3}{5} \) and \( \beta = \cos^{-1}\frac{12}{13} \). Then \( \sin\alpha = \frac{3}{5} \), \( \cos\beta = \frac{12}{13} \), with \( \alpha \in [-\frac{\pi}{2}, \frac{\pi}{2}] \), \( \beta \in [0,\pi] \).
- Step 2: Find \( \cos\alpha \) and \( \sin\beta \) using Pythagorean identity. Since \( \alpha \in [-\frac{\pi}{2}, \frac{\pi}{2}] \), \( \cos\alpha \ge 0 \): \( \cos\alpha = \sqrt{1 - \sin^2\alpha} = \sqrt{1 - \frac{9}{25}} = \sqrt{\frac{16}{25}} = \frac{4}{5} \). Since \( \beta \in [0,\pi] \), \( \sin\beta \ge 0 \): \( \sin\beta = \sqrt{1 - \cos^2\beta} = \sqrt{1 - \frac{144}{169}} = \sqrt{\frac{25}{169}} = \frac{5}{13} \).
- Step 3: We need to prove \( \alpha - \beta = \sin^{-1}\frac{16}{65} \). Take sine of both sides: \( \sin(\alpha - \beta) = \sin\alpha\cos\beta - \cos\alpha\sin\beta \).
- Step 4: Substitute values: \( \sin(\alpha - \beta) = \frac{3}{5} \cdot \frac{12}{13} - \frac{4}{5} \cdot \frac{5}{13} = \frac{36}{65} - \frac{20}{65} = \frac{16}{65} \).
- Step 5: Now check if \( \alpha - \beta \) lies in the range of \( \sin^{-1} \), i.e., \( [-\frac{\pi}{2}, \frac{\pi}{2}] \). \( \alpha = \sin^{-1}\frac{3}{5} \approx 0.6435 \) rad, \( \beta = \cos^{-1}\frac{12}{13} \approx 0.3948 \) rad. So \( \alpha - \beta \approx 0.2487 \in [-\frac{\pi}{2}, \frac{\pi}{2}] \). Therefore \( \alpha - \beta = \sin^{-1}\frac{16}{65} \).
- Step 6: Conclude: \( \sin^{-1}\frac{3}{5} - \cos^{-1}\frac{12}{13} = \sin^{-1}\frac{16}{65} \).
REASONING: This proof uses the substitution method (let inverse trig = angle) combined with trigonometric identities. The critical step is verifying the range of the resulting angle to ensure the inverse sine returns the correct value. This combines properties from this node (range checks) with Class 11 trigonometric identities.
ANSWER: Proved.

## COMPETENCY_QUESTION_1
QUESTION: A student claims that \( \sin^{-1}(\sin \theta) = \theta \) for all \( \theta \in \mathbb{R} \). To test this, evaluate \( \sin^{-1}(\sin \frac{5\pi}{4}) \) and \( \sin^{-1}(\sin(-\frac{2\pi}{3})) \). Explain why the claim is false and state the correct general method to evaluate \( \sin^{-1}(\sin \theta) \) for any real \( \theta \).
COMPETENCY: Error identification and correction
STEPS:
- Step 1: Evaluate \( \sin^{-1}(\sin \frac{5\pi}{4}) \) by finding an equivalent angle in \( [-\frac{\pi}{2}, \frac{\pi}{2}] \).
- Step 2: Evaluate \( \sin^{-1}(\sin(-\frac{2\pi}{3})) \) similarly.
- Step 3: Show that neither equals the original angle.
- Step 4: Describe the general method: reduce \( \theta \) to an angle \( \phi \in [-\frac{\pi}{2}, \frac{\pi}{2}] \) such that \( \sin\phi = \sin\theta \), using symmetry and periodicity.
ANSWER: 
\( \frac{5\pi}{4} \) is in third quadrant, \( \sin \frac{5\pi}{4} = -\sin \frac{\pi}{4} = -\frac{1}{\sqrt{2}} \). The angle in \( [-\frac{\pi}{2}, \frac{\pi}{2}] \) with sine \( -\frac{1}{\sqrt{2}} \) is \( -\frac{\pi}{4} \). So \( \sin^{-1}(\sin \frac{5\pi}{4}) = -\frac{\pi}{4} \neq \frac{5\pi}{4} \).
\( -\frac{2\pi}{3} \) is in third quadrant (negative angle), \( \sin(-\frac{2\pi}{3}) = -\sin \frac{2\pi}{3} = -\sin(\pi - \frac{\pi}{3}) = -\sin \frac{\pi}{3} = -\frac{\sqrt{3}}{2} \). The angle in \( [-\frac{\pi}{2}, \frac{\pi}{2}] \) with sine \( -\frac{\sqrt{3}}{2} \) is \( -\frac{\pi}{3} \). So \( \sin^{-1}(\sin(-\frac{2\pi}{3})) = -\frac{\pi}{3} \neq -\frac{2\pi}{3} \).
General method: For any \( \theta \), find \( \phi \in [-\frac{\pi}{2}, \frac{\pi}{2}] \) such that \( \sin\phi = \sin\theta \). Use \( \sin(\pi - \theta) = \sin\theta \) and \( \sin(-\theta) = -\sin\theta \) to bring \( \theta \) into the principal range.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Solve for \( x \): \( \tan^{-1}\frac{1-x}{1+x} = \frac{1}{2}\tan^{-1}x \), \( x > 0 \). (Hint: Use substitution \( x = \tan\theta \) and the double-angle formula for tangent.)
COMPETENCY: Translating real-world situations to mathematical expressions (here, solving an inverse trigonometric equation using algebraic manipulation and range checks)
STEPS:
- Step 1: Let \( x = \tan\theta \), where \( \theta \in (0, \frac{\pi}{2}) \) since \( x > 0 \).
- Step 2: Then \( \tan^{-1}x = \theta \). The equation becomes \( \tan^{-1}\frac{1-\tan\theta}{1+\tan\theta} = \frac{\theta}{2} \).
- Step 3: Recognize \( \frac{1-\tan\theta}{1+\tan\theta} = \tan(\frac{\pi}{4} - \theta) \). So LHS = \( \tan^{-1}(\tan(\frac{\pi}{4} - \theta)) \).
- Step 4: Determine the range of \( \frac{\pi}{4} - \theta \). Since \( \theta \in (0, \frac{\pi}{2}) \), \( \frac{\pi}{4} - \theta \in (-\frac{\pi}{4}, \frac{\pi}{4}) \subset (-\frac{\pi}{2}, \frac{\pi}{2}) \). So \( \tan^{-1}(\tan(\frac{\pi}{4} - \theta)) = \frac{\pi}{4} - \theta \).
- Step 5: Equation becomes \( \frac{\pi}{4} - \theta = \frac{\theta}{2} \Rightarrow \frac{\pi}{4} = \frac{3\theta}{2} \Rightarrow \theta = \frac{\pi}{6} \).
- Step 6: Then \( x = \tan\frac{\pi}{6} = \frac{1}{\sqrt{3}} \). Verify \( x > 0 \) and all steps valid.
ANSWER: \( x = \frac{1}{\sqrt{3}} \)
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The properties of inverse trigonometric functions are a set of identities that relate inverse trigonometric functions to their ______ trigonometric functions, to each other, and to algebraic expressions.

## DIAGNOSTIC_ANSWER_7
corresponding

Corresponding is the pairing word: each inverse identity links a function with its own inverse, and none works across the family fence. **A wrong answer (any other function) reveals the student has married inverses to strangers, which no identity in the list permits.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: The ramp must rise 1 metre over a horizontal ______ of 2 metres.

## DIAGNOSTIC_ANSWER_8
distance

The horizontal distance completes the slope's fraction: rise over run is what the tangent reads, and the ramp's geometry sets both. **A wrong answer (a vertical word) reveals the student has doubled the rise and destroyed the ratio the angle hides in.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: The ramp must rise 1 metre over a ______ distance of 2 metres.

## DIAGNOSTIC_ANSWER_9
horizontal

Horizontal is the run to the rise: the ramp's geometry hides its angle in a ratio of exactly these two lengths. **A wrong answer (a length word) reveals the student has named a measurement where the fraction's direction is asked.** Horizontal is the run beneath the metre of rise: the ramp's ratio hides its angle in these two lengths, and the code checks the result.
