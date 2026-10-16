## ELI5
The fan's tip circles; the cyclist leans into the turn - something supplies the inward pull every instant. Centripetal force is not a new force but a job title: whatever radial component the net force carries, magnitude mv²/R. Friction serves it for the turning bicycle, tension for the whirling stone, a normal component for the banked curve. Name the provider before computing the size.

## DEFINITION
Centripetal force is the net force directed toward the center of a circular path that causes a particle to follow that curved trajectory, with magnitude given by \(F_c = \frac{m v^2}{R} = m \omega^2 R\) where \(m\) is the mass of the particle, \(v\) its linear speed, \(\omega\) its angular speed, and \(R\) the radius of the circle. It is not a new kind of force but the radial component of the net force arising from physical interactions like tension, friction, gravity, or normal reaction.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can identify the physical force providing the centripetal acceleration in a given scenario (e.g., friction for a car on a flat road, tension for a conical pendulum), correctly resolve forces into radial and vertical components, apply Newton's second law in both directions, and calculate maximum safe speeds or banking angles using the relevant formulas with proper SI units.

## SCOPE_BOUNDARY
This node covers the dynamics of uniform circular motion on horizontal and banked surfaces, including the role of friction and the derivation of maximum speed formulas. It does NOT cover non-uniform circular motion (tangential acceleration), vertical circular motion, or motion in a rotating reference frame (centrifugal force as a pseudo force).

## WALKTHROUGH
Watch a ceiling fan starting from rest: the blades accelerate until they reach a constant speed, yet each blade tip continuously changes direction. Ask: what force keeps the tip moving in a circle? The answer lies in the internal stresses of the blade material providing the inward pull. Next, consider a bicycle turning on a level road: the rider leans inward, and the friction between tyres and road supplies the necessary centripetal force. Connect this to Newton's second law: the net force toward the centre equals mass times centripetal acceleration (\(v^2/R\)). Finally, introduce the formula \(F_c = m v^2/R\) and emphasize that the specific force (friction, tension, normal component) depends on the physical situation.

Takeaway: mastery means identifying the physical provider, resolving forces radially and vertically, and computing safe speeds for flat and banked turns. Exam moves: who-provides-the-force questions and maximum-speed items. Check yourself: adding a centripetal force to a free-body diagram is double counting - the flagged error - the provider is already there. Students miss it because the special name suggests a special agent, when the definition insists it is bookkeeping: the net inward share of ordinary forces is what bends the path, and the physics lies in finding which ordinary force pays.

## DIAGNOSTIC_QUESTION_1
State the formula for centripetal force in terms of mass \(m\), linear speed \(v\), and radius \(R\). Give its SI unit.

## DIAGNOSTIC_ANSWER_1
\(F_c = \frac{m v^2}{R}\); SI unit is newton (N) or kg·m·s⁻². A wrong answer like \(F_c = m v R\) or missing the square on \(v\) reveals confusion between centripetal force and momentum or a misunderstanding of the acceleration formula \(a_c = v^2/R\).

## DIAGNOSTIC_QUESTION_2
A car of mass 1000 kg takes a circular turn of radius 50 m on a flat road at 20 m/s. The coefficient of static friction between tyres and road is 0.8. Explain why the car does not skid, and calculate the required centripetal force. Compare it with the maximum available friction force.

## DIAGNOSTIC_ANSWER_2
Required centripetal force \(F_c = \frac{1000 \times 20^2}{50} = 8000\ \text{N}\). Maximum static friction \(f_{s,\max} = \mu_s m g = 0.8 \times 1000 \times 9.8 = 7840\ \text{N}\). Since \(F_c > f_{s,\max}\), the car will actually skid. A student who claims the car does not skid has not compared the required force with the friction limit, indicating a failure to apply the condition for no skidding.

## DIAGNOSTIC_QUESTION_3
A cyclist leans at an angle of 30° to the vertical while negotiating a circular bend of radius 10 m on a level road. If the combined mass of cyclist and bicycle is 80 kg, find the speed of the cyclist. (Take \(g = 10\ \text{m/s}^2\).)

## DIAGNOSTIC_ANSWER_3
For a cyclist leaning on a flat road, the horizontal component of the normal reaction provides the centripetal force, and the vertical component balances weight. Resolving: \(N \sin\theta = \frac{m v^2}{R}\), \(N \cos\theta = m g\). Dividing gives \(\tan\theta = \frac{v^2}{R g}\). So \(v = \sqrt{R g \tan\theta} = \sqrt{10 \times 10 \times \tan30°} = \sqrt{100 \times 0.577} \approx 7.6\ \text{m/s}\). A common error is to use \(\sin\theta\) or \(\cos\theta\) incorrectly, or to forget that the normal force is not equal to \(mg\) when leaning.

## DIAGNOSTIC_QUESTION_4
Compare the maximum safe speed for a car on a flat circular track of radius \(R\) with coefficient of friction \(\mu_s\) to that on a banked track of the same radius and same \(\mu_s\) but with banking angle \(\theta\). Derive the ratio \(v_{\text{banked}} / v_{\text{flat}}\) and discuss how it varies with \(\theta\).

## DIAGNOSTIC_ANSWER_4
For flat road: \(v_{\text{flat}} = \sqrt{\mu_s R g}\). For banked road with friction: \(v_{\text{banked}} = \sqrt{R g \frac{\tan\theta + \mu_s}{1 - \mu_s \tan\theta}}\) (for maximum speed without skidding outward). The ratio is \(\frac{v_{\text{banked}}}{v_{\text{flat}}} = \sqrt{\frac{\tan\theta + \mu_s}{\mu_s (1 - \mu_s \tan\theta)}}\). This ratio increases with \(\theta\) and exceeds 1 for any positive \(\theta\), showing banking allows higher speeds. A student who gives the frictionless banking formula \(v = \sqrt{R g \tan\theta}\) for the banked case ignores the role of friction and cannot compare correctly.

## DIAGNOSTIC_QUESTION_5
A student argues: "On a banked road, the normal force has a horizontal component that provides the centripetal force, so friction is never needed." Evaluate this statement and give a counterexample using the formula for optimum speed.

## DIAGNOSTIC_ANSWER_5
The statement is false. The horizontal component of the normal force alone provides the required centripetal force only at the optimum speed \(v_o = \sqrt{R g \tan\theta}\). If the vehicle moves slower than \(v_o\), it tends to slip down the incline, so friction acts up the slope to prevent inward skidding. If it moves faster, friction acts down the slope to prevent outward skidding. Thus friction is needed except exactly at \(v_o\). A student who agrees with the statement misunderstands that the normal force's horizontal component is fixed by the banking angle and speed, and does not automatically adjust to provide exactly the needed centripetal force at all speeds.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a conical pendulum (a mass on a string moving in a horizontal circle) to verify the formula \(F_c = m \omega^2 R\). List the measurements you would take, the graph you would plot, and how you would extract the mass from the slope.

## DIAGNOSTIC_ANSWER_6
Attach a known mass \(m\) to a string of length \(L\), whirl it in a horizontal circle of radius \(R\) by holding the other end. Measure the period \(T\) for several radii (by varying the speed). The centripetal force is provided by the horizontal component of tension: \(T \sin\theta = m \omega^2 R\). Since \(\sin\theta = R/L\), tension \(T = m \omega^2 L\). Plot \(T\) (vertical axis) versus \(\omega^2\) (horizontal axis). The slope gives \(m L\). Knowing \(L\), the mass \(m\) can be found. A poor answer might suggest plotting \(v\) vs \(R\) or not recognizing that tension is not directly measurable without a force sensor, indicating a lack of experimental design skills.

## COMMON_MISCONCEPTION
Students often believe that centripetal force is an additional force that appears in the free-body diagram alongside tension, friction, gravity, etc. They write "centripetal force" as a separate arrow pointing toward the center. In reality, centripetal force is the **net** radial component of the real forces present. For example, in a car turning on a flat road, the only horizontal force is friction; that friction **is** the centripetal force. There is no separate "centripetal force" arrow.

## ON_FAILURE
To correct this, have the student draw free-body diagrams for three cases: (1) a stone whirled in a horizontal circle by a string, (2) a car on a flat circular turn, (3) a car on a banked turn. In each case, list only the real forces (tension, weight, normal, friction). Then ask: "Which force or component of a force points toward the center?" That component **is** the centripetal force. Emphasize that centripetal force is a role, not a new force. Practice by writing Newton's second law in radial direction: \(\sum F_{\text{radial}} = m a_c\).

## PREREQUISITE_NODE_IDS
c11_phy_cbse_04_003, c11_phy_cbse_04_009, c11_phy_cbse_04_010, c9_physics_ch2_10, c10_math_cbse_08_001, c11_phy_cbse_04_008, c11_phy_cbse_04_011

## PREREQUISITE_REASONS
c11_phy_cbse_04_003: Newton's second law (F=ma) is essential to relate net force to centripetal acceleration.
c11_phy_cbse_04_009: Static friction concept is needed for a car on a flat road.
c11_phy_cbse_04_010: Coefficient of friction and its laws are used to find maximum friction force.
c9_physics_ch2_10: Uniform circular motion kinematics (centripetal acceleration \(v^2/R\)) is the foundation.
c10_math_cbse_08_001: Trigonometric ratios (sin, cos, tan) are required to resolve forces on banked roads.
c11_phy_cbse_04_008: Centripetal force for circular motion is provided by friction, tension, or normal reaction - forces introduced here.  
c11_phy_cbse_04_011: Circular motion dynamics often involves rolling without slipping (e.g., wheels, pulleys); rolling friction provides the resistive torque in realistic problems.  

## FORWARD_NODE_IDS
c11_phy_cbse_04_013, c11_phy_cbse_04_014, c12_phy_cbse_12_001

## FORWARD_REASONS
c11_phy_cbse_04_013: Banking of roads directly applies the circular motion dynamics with friction and normal force components.
c11_phy_cbse_04_014: Solving mechanics problems using free-body diagrams requires the circular motion dynamics as a key application.
c12_phy_cbse_12_001: Circular Motion Dynamics — provides the concept of centripetal force, later used in Rutherford's electron orbit equation (Fe = Fc).  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_08_001, c10_math_cbse_08_006, c9_math_ch1_4
## CROSS_SUBJECT_REASONS
c10_math_cbse_08_001: Trigonometric ratios (sin, cos, tan) are used to resolve forces into components on inclined/banked surfaces.
c10_math_cbse_08_006: Trigonometric identity \(\sin^2\theta + \cos^2\theta = 1\) helps in eliminating the normal force when deriving maximum speed formulas.
c9_math_ch1_4: Distance formula and coordinate geometry are useful for analyzing circular paths and radius calculations.

## CHAIN_DESCRIPTION
c9_physics_ch2_10 -> c11_phy_cbse_04_012 -> c11_phy_cbse_04_013

## THIS_FORMULA
\(F_c = \frac{m v^2}{R} = m \omega^2 R\) (N); maximum speed on flat road: \(v_{\max} = \sqrt{\mu_s R g}\) (m/s); optimum speed on banked road (no friction): \(v_o = \sqrt{R g \tan\theta}\) (m/s); maximum speed on banked road with friction: \(v_{\max} = \sqrt{R g \frac{\tan\theta + \mu_s}{1 - \mu_s \tan\theta}}\) (m/s)

## FORMULA_VARIABLES
\(F_c\) = centripetal force (N), \(m\) = mass (kg), \(v\) = linear speed (m/s), \(R\) = radius of circular path (m), \(\omega\) = angular speed (rad/s), \(\mu_s\) = coefficient of static friction (dimensionless), \(g\) = acceleration due to gravity (m/s²), \(\theta\) = banking angle (rad or degrees), \(v_{\max}\) = maximum safe speed (m/s), \(v_o\) = optimum speed (m/s)

## FORMULA_UNITS
N, kg, m/s, m, rad/s, dimensionless, m/s², rad/degrees, m/s, m/s

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_08_001 | Trigonometric ratios (sin, cos, tan) are essential to resolve normal reaction and friction into vertical and horizontal components on a banked road.
c10_math_cbse_08_006 | The identity \(\sin^2\theta + \cos^2\theta = 1\) is used to eliminate the normal force when combining vertical and horizontal equations of motion.
c9_math_ch1_4 | Distance formula and coordinate geometry help derive the radius of circular paths from given geometry.

## PREREQ_CONCEPT
Newton's second law in vector form and the kinematics of uniform circular motion (centripetal acceleration \(a_c = v^2/R\)).

## PREREQ_BEFORE
The student must be able to state Newton's second law, define centripetal acceleration, and compute the components of a force along given axes using trigonometry.

## PREREQ_STUCK
If stuck, review Newton's second law (c11_phy_cbse_04_003) and uniform circular motion kinematics (c9_physics_ch2_10). Practice resolving forces on an inclined plane.

## WORKED_EXAMPLE_1
PROBLEM: A 1200 kg car travels at 25 m/s on a flat circular track of radius 80 m. The coefficient of static friction between the tyres and the road is 0.7. Determine whether the car will skid. If it does not skid, find the magnitude of the friction force acting on the car. (Take \(g = 10\ \text{m/s}^2\).)

STEPS:
- Step 1: Identify given quantities: \(m = 1200\ \text{kg}\), \(v = 25\ \text{m/s}\), \(R = 80\ \text{m}\), \(\mu_s = 0.7\), \(g = 10\ \text{m/s}^2\). Find: required centripetal force \(F_c\) and maximum static friction \(f_{s,\max}\).
- Step 2: Use the formula for centripetal force: \(F_c = \frac{m v^2}{R}\). Check units: kg·(m/s)²/m = kg·m/s² = N.
- Step 3: Substitute values: \(F_c = \frac{1200 \times (25)^2}{80} = \frac{1200 \times 625}{80} = \frac{750000}{80} = 9375\ \text{N}\).
- Step 4: Compute maximum static friction: \(f_{s,\max} = \mu_s m g = 0.7 \times 1200 \times 10 = 8400\ \text{N}\).
- Step 5: Compare: \(F_c = 9375\ \text{N} > f_{s,\max} = 8400\ \text{N}\). The required centripetal force exceeds the maximum available friction, so the car will skid. If it were not skidding, the friction force would equal \(F_c\).

REASONING: The centripetal force needed to keep the car in a circle is provided solely by friction on a flat road. If the required force exceeds the limiting static friction, the tyres cannot supply enough inward force and the car slides outward.

ANSWER: The car will skid. The required centripetal force is 9375 N, but the maximum static friction is only 8400 N.

## WORKED_EXAMPLE_2
PROBLEM: A circular race track of radius 300 m is banked at an angle of 15°. The coefficient of static friction between the tyres and the road is 0.2. Find (a) the optimum speed to avoid wear and tear on the tyres, and (b) the maximum permissible speed to avoid slipping. (Take \(g = 9.8\ \text{m/s}^2\).)

STEPS:
- Step 1: Identify given: \(R = 300\ \text{m}\), \(\theta = 15°\), \(\mu_s = 0.2\), \(g = 9.8\ \text{m/s}^2\). Find \(v_o\) and \(v_{\max}\).
- Step 2: Optimum speed (no friction needed): \(v_o = \sqrt{R g \tan\theta}\). Compute \(\tan 15° \approx 0.2679\).
- Step 3: Substitute: \(v_o = \sqrt{300 \times 9.8 \times 0.2679} = \sqrt{787.0} \approx 28.05\ \text{m/s}\).
- Step 4: Maximum speed with friction: \(v_{\max} = \sqrt{R g \frac{\tan\theta + \mu_s}{1 - \mu_s \tan\theta}}\). Compute numerator: \(\tan\theta + \mu_s = 0.2679 + 0.2 = 0.4679\). Denominator: \(1 - \mu_s \tan\theta = 1 - 0.2 \times 0.2679 = 1 - 0.0536 = 0.9464\).
- Step 5: Ratio = \(0.4679 / 0.9464 \approx 0.4944\). Then \(v_{\max} = \sqrt{300 \times 9.8 \times 0.4944} = \sqrt{1453.0} \approx 38.12\ \text{m/s}\).
- Step 6: Check units: inside sqrt: m·m/s² = m²/s², sqrt gives m/s. Answers are physically reasonable (about 101 km/h and 137 km/h).

REASONING: At optimum speed, the horizontal component of the normal force alone provides the centripetal force, so friction is zero. At higher speeds, friction acts down the incline to prevent outward skidding; the maximum speed is when friction reaches its limiting value \(\mu_s N\).

ANSWER: (a) Optimum speed \(v_o \approx 28.1\ \text{m/s}\) (101 km/h). (b) Maximum permissible speed \(v_{\max} \approx 38.1\ \text{m/s}\) (137 km/h).

## WORKED_EXAMPLE_3
PROBLEM: A small block of mass 0.5 kg is placed on a horizontal turntable at a distance of 0.2 m from the centre. The coefficient of static friction between the block and the turntable is 0.3. The turntable starts from rest and rotates with a constant angular acceleration of 2 rad/s². Find the time at which the block starts to slip. (Take \(g = 10\ \text{m/s}^2\).)

STEPS:
- Step 1: Identify given: \(m = 0.5\ \text{kg}\), \(R = 0.2\ \text{m}\), \(\mu_s = 0.3\), \(\alpha = 2\ \text{rad/s}^2\), \(g = 10\ \text{m/s}^2\). The block slips when the required centripetal force exceeds maximum static friction. Note: tangential acceleration also requires friction, but the problem asks for slipping due to radial motion; we assume the friction is sufficient to provide tangential acceleration until radial limit is reached.
- Step 2: Angular speed as a function of time: \(\omega = \alpha t\) (starting from rest). Centripetal acceleration \(a_c = \omega^2 R = \alpha^2 t^2 R\).
- Step 3: Required centripetal force: \(F_c = m a_c = m \alpha^2 t^2 R\).
- Step 4: Maximum static friction: \(f_{s,\max} = \mu_s m g\).
- Step 5: Set \(F_c = f_{s,\max}\) to find the time when slipping impends: \(m \alpha^2 t^2 R = \mu_s m g\). Cancel \(m\): \(\alpha^2 t^2 R = \mu_s g\).
- Step 6: Solve for \(t\): \(t^2 = \frac{\mu_s g}{\alpha^2 R} = \frac{0.3 \times 10}{(2)^2 \times 0.2} = \frac{3}{4 \times 0.2} = \frac{3}{0.8} = 3.75\). \(t = \sqrt{3.75} \approx 1.936\ \text{s}\).

REASONING: The block experiences a centripetal force requirement that grows with time as the turntable speeds up. Static friction provides this force until its maximum value is reached. The tangential friction needed for angular acceleration is small compared to the radial demand and is ignored here (or assumed to be within the same friction limit, but the radial component is usually the limiting factor).

ANSWER: The block starts to slip at \(t \approx 1.94\ \text{s}\).

## COMPETENCY_QUESTION_1
QUESTION: A truck of mass 5000 kg is moving on a flat circular road of radius 100 m at a speed of 20 m/s. The coefficient of static friction between the tyres and the road is 0.6. A student claims that the friction force acting on the truck is \(\mu_s m g = 0.6 \times 5000 \times 10 = 30000\ \text{N}\). Is the student correct? Explain your reasoning and calculate the actual friction force if the truck does not skid.

COMPETENCY: Interpreting physical situations using formulas and distinguishing between maximum static friction and actual static friction.

STEPS:
- Step 1: Understand the situation: The truck is moving in a circle at constant speed on a flat road. The only horizontal force is friction, which provides the centripetal force.
- Step 2: Identify the relevant principle: For uniform circular motion on a flat road, the actual static friction force equals the required centripetal force, provided it does not exceed the maximum static friction.
- Step 3: Calculate required centripetal force: \(F_c = \frac{m v^2}{R} = \frac{5000 \times 20^2}{100} = \frac{5000 \times 400}{100} = 20000\ \text{N}\).
- Step 4: Calculate maximum static friction: \(f_{s,\max} = \mu_s m g = 0.6 \times 5000 \times 10 = 30000\ \text{N}\).
- Step 5: Compare: \(F_c = 20000\ \text{N} < f_{s,\max} = 30000\ \text{N}\). The truck does not skid. The actual friction force is exactly the required centripetal force, i.e., 20000 N, not the maximum value.

ANSWER: The student is incorrect. The actual static friction force is 20000 N (directed toward the centre), not 30000 N. The value 30000 N is the maximum possible static friction; the actual friction adjusts to match the required centripetal force up to that limit.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A car is moving on a banked circular road of radius 200 m and banking angle 10°. The coefficient of static friction is 0.15. The driver wants to know the range of speeds at which the car can safely negotiate the curve without skidding either inward or outward. Derive the expressions for minimum and maximum safe speeds and compute their values. (Take \(g = 10\ \text{m/s}^2\).)

COMPETENCY: Predicting outcomes from changing variables and applying the full friction-banking model to find a safe speed range.

STEPS:
- Step 1: Understand the physics: At low speeds, the car tends to slip down the incline (inward), so friction acts up the slope. At high speeds, it tends to slip up the incline (outward), so friction acts down the slope.
- Step 2: Write equations for the two cases. For maximum speed (friction down): \(N \sin\theta + f \cos\theta = \frac{m v_{\max}^2}{R}\), \(N \cos\theta - f \sin\theta = m g\), with \(f = \mu_s N\). For minimum speed (friction up): \(N \sin\theta - f \cos\theta = \frac{m v_{\min}^2}{R}\), \(N \cos\theta + f \sin\theta = m g\), with \(f = \mu_s N\).
- Step 3: Solve each system for \(v\). Standard results: \(v_{\max} = \sqrt{R g \frac{\tan\theta + \mu_s}{1 - \mu_s \tan\theta}}\), \(v_{\min} = \sqrt{R g \frac{\tan\theta - \mu_s}{1 + \mu_s \tan\theta}}\).
- Step 4: Compute \(\tan 10° \approx 0.1763\). \(\mu_s = 0.15\).
- Step 5: For \(v_{\max}\): numerator = \(0.1763 + 0.15 = 0.3263\); denominator = \(1 - 0.15 \times 0.1763 = 1 - 0.0264 = 0.9736\); ratio = \(0.3263 / 0.9736 \approx 0.3351\). \(v_{\max} = \sqrt{200 \times 10 \times 0.3351} = \sqrt{670.2} \approx 25.9\ \text{m/s}\).
- Step 6: For \(v_{\min}\): numerator = \(0.1763 - 0.15 = 0.0263\); denominator = \(1 + 0.15 \times 0.1763 = 1 + 0.0264 = 1.0264\); ratio = \(0.0263 / 1.0264 \approx 0.0256\). \(v_{\min} = \sqrt{200 \times 10 \times 0.0256} = \sqrt{51.2} \approx 7.16\ \text{m/s}\).
- Step 7: Check: \(v_{\min} < v_o < v_{\max}\). Optimum speed \(v_o = \sqrt{R g \tan\theta} = \sqrt{200 \times 10 \times 0.1763} = \sqrt{352.6} \approx 18.78\ \text{m/s}\). Indeed \(7.16 < 18.78 < 25.9\).

ANSWER: Minimum safe speed \(v_{\min} \approx 7.2\ \text{m/s}\) (26 km/h), maximum safe speed \(v_{\max} \approx 25.9\ \text{m/s}\) (93 km/h). The car can safely negotiate the curve at any speed between these values.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: It is not a new kind of force but the radial component of the net force arising from physical ______ like tension, friction, gravity, or normal reaction.

## DIAGNOSTIC_ANSWER_7
interactions

**A wrong answer ("forces" or "effects") reveals the student has paraphrased the definition's noun - the radial component arises from physical interactions.** Interactions is the definition's own noun, and the noun is what the blank grades. Recall the tension-friction-gravity list before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Watch a ceiling fan starting from rest: the blades accelerate until they reach a constant speed, yet each blade tip continuously changes ______.

## DIAGNOSTIC_ANSWER_8
direction

**A wrong answer ("speed" or "radius") reveals the student has swapped the walkthrough's noun - each blade tip continuously changes direction.** Direction is the walkthrough's own noun, and the noun is what the blank grades. Recall the from-rest start before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_9
What is Centripetal force? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
It is not a new kind of force but the radial component of the net force arising from physical interactions like tension, friction, gravity, or normal reaction.

**A wrong answer (any paraphrase) reveals the student has not quoted the definition.** The lesson's own sentence: centripetal force is not a new kind of force but the radial component of the net force arising from physical interactions like tension, friction, gravity, or normal reaction.

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Centripetal force?

## DIAGNOSTIC_ANSWER_10
Students often believe that centripetal force is an additional force that appears in the free-body diagram alongside tension, friction, gravity, etc.

**A wrong answer (adding a centripetal force to the diagram) reveals the student holds the flagged mix-up.** The term names the net radial share, not an extra agent - draw the real forces, and their inward resultant already is the centripetal force.

## DIAGNOSTIC_QUESTION_11
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_11
The student can identify the physical force providing the centripetal acceleration in a given scenario (e.g., friction for a car on a flat road, tension for a conical pendulum), correctly resolve forces into radial and vertical components, apply Newton's second law in both directions, and calculate maximum safe speeds or banking angles.
