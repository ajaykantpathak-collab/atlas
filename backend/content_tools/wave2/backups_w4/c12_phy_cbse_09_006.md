## ELI5
Hold a magnifying glass to the sun and find the bright spot: that distance is the focal length, and the thin lens formula predicts every image - one over v minus one over u equals one over f, distances signed from the optical centre. Magnification is v over u, its sign confessing inverted or erect, and power in dioptres is one over f - the optician's currency for spectacles, positive for convergers, negative for divergers.

## DEFINITION
The thin lens formula relates the object distance (u), image distance (v), and focal length (f) of a thin lens through the equation \( \frac{1}{v} - \frac{1}{u} = \frac{1}{f} \), where all distances are measured from the optical centre of the lens following the Cartesian sign convention. Linear magnification (m) is defined as the ratio of the image height (h') to the object height (h), given by \( m = \frac{h'}{h} = \frac{v}{u} \). The SI unit for distances is metre (m), magnification is dimensionless, and focal length is in metre (m). Power of a lens \( P = \frac{1}{f} \) (in dioptre, D) quantifies its converging (positive) or diverging (negative) ability.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) correctly apply the Cartesian sign convention to assign signs to u, v, f, h, h' for any combination of convex/concave lens and real/virtual object/image; (2) solve the thin lens formula algebraically to find any unknown among u, v, f; (3) compute magnification and interpret its sign and magnitude to describe image nature (real/virtual, erect/inverted, magnified/diminished); (4) determine the power of a lens from its focal length and vice versa, including unit conversion between cm and m.

## SCOPE_BOUNDARY
This node covers the thin lens formula derivation from refraction at two spherical surfaces, the magnification formula, Cartesian sign convention for lenses, and power of a lens. It does NOT cover: lens maker's formula (covered in c12_phy_cbse_09_005), combination of thin lenses in contact (c12_phy_cbse_09_007), optical instruments like microscopes/telescopes (c12_phy_cbse_09_009 onwards), or thick lens effects. The thin lens approximation assumes lens thickness is negligible compared to object/image distances and radii of curvature.

## WALKTHROUGH
Imagine holding a convex lens (like a magnifying glass) under sunlight — you see a bright spot on paper at a certain distance. That distance is the focal length. Now place a candle at various distances from the lens and observe the image on a screen: sometimes real and inverted, sometimes virtual and erect. To predict exactly where the image forms and its size, we need a formula. Start by recalling the refraction at a single spherical surface formula from the previous node (c12_phy_cbse_09_005). Apply it twice — once for each surface of the lens — and combine them assuming the lens is thin. This yields the thin lens formula. The sign convention is critical: light travels left to right, distances measured along incident light are positive, opposite are negative; heights upward are positive. Practice with a convex lens (f positive) and concave lens (f negative) for objects at different positions. The power of a lens (in dioptres) is simply 1/f (in metres) — opticians use this for spectacles.

Takeaway first: the thin lens formula is the mirror formula's cousin with a minus in the middle - and the sign convention does all the differentiating between lenses and positions. Exam moves: sign-assignment questions, solve-for-unknown questions, nature-prediction questions from m, and power questions with centimetre-to-metre conversions. Method: rerun the candle - screen images real and inverted at some distances, magnified and erect when close, each confirmed by the formula. Check yourself: a convex lens gives virtual erect magnified images only inside its focal length; the flagged error forgets that near-object case and bankrupts the magnifying glass. Drill: solve one numerical for v and m, and convert one spectacle prescription into focal length.

## DIAGNOSTIC_QUESTION_1
State the thin lens formula and the magnification formula for a lens. Write the Cartesian sign convention rules for object distance (u), image distance (v), focal length (f), object height (h), and image height (h').

## DIAGNOSTIC_ANSWER_1
Thin lens formula: \( \frac{1}{v} - \frac{1}{u} = \frac{1}{f} \). Magnification: \( m = \frac{h'}{h} = \frac{v}{u} \). Sign convention: (1) All distances measured from optical centre. (2) Distances measured in the direction of incident light (left to right) are positive; opposite direction negative. (3) Heights measured upward perpendicular to principal axis are positive; downward negative. (4) For a convex lens, f > 0; for concave lens, f < 0. (5) Real object: u < 0; real image: v > 0; virtual image: v < 0. A wrong answer (e.g., using \( \frac{1}{v} + \frac{1}{u} = \frac{1}{f} \) or mixing sign rules) reveals confusion between mirror and lens formulas or ignorance of the Cartesian convention.

## DIAGNOSTIC_QUESTION_2
A student writes the lens formula as \( \frac{1}{v} + \frac{1}{u} = \frac{1}{f} \) and uses it for a convex lens with object at 30 cm (u = -30 cm) and f = 10 cm. They get v = 7.5 cm. Explain why the formula and sign usage are incorrect. What is the correct image distance and nature?

## DIAGNOSTIC_ANSWER_2
The lens formula is \( \frac{1}{v} - \frac{1}{u} = \frac{1}{f} \), not plus. With u = -30 cm, f = +10 cm: \( \frac{1}{v} = \frac{1}{10} + \frac{1}{-30} = \frac{3-1}{30} = \frac{2}{30} = \frac{1}{15} \), so v = +15 cm. The image is real (v positive), inverted, on the opposite side. The student's formula gives wrong sign for u term and thus wrong v. This error reveals they are using the mirror formula \( \frac{1}{v} + \frac{1}{u} = \frac{1}{f} \) instead of the lens formula, a common board exam trap.

## DIAGNOSTIC_QUESTION_3
A convex lens of focal length 20 cm forms a real image of an object placed 30 cm from the lens. Calculate the image distance, magnification, and image height if the object height is 4 cm. State the nature of the image.

## DIAGNOSTIC_ANSWER_3
Given: f = +20 cm, u = -30 cm, h = +4 cm (erect object). Using \( \frac{1}{v} - \frac{1}{u} = \frac{1}{f} \): \( \frac{1}{v} = \frac{1}{20} + \frac{1}{-30} = \frac{3-2}{60} = \frac{1}{60} \) → v = +60 cm. Magnification m = v/u = 60/(-30) = -2. Image height h' = m × h = -2 × 4 = -8 cm. Image is real (v>0), inverted (h' negative), magnified (|m|>1), located 60 cm on the opposite side. A wrong answer (e.g., v = 12 cm from using plus sign) indicates sign convention or algebraic error.

## DIAGNOSTIC_QUESTION_4
A concave lens of focal length -15 cm is used to view an object placed 10 cm from it. Without calculation, predict: (a) sign of image distance v, (b) sign of magnification m, (c) whether image is real or virtual, (d) whether image is magnified or diminished. Justify using the lens formula qualitatively.

## DIAGNOSTIC_ANSWER_4
For concave lens, f < 0. Object is real: u < 0. Lens formula: \( \frac{1}{v} = \frac{1}{f} + \frac{1}{u} \). Both terms on RHS are negative → \( \frac{1}{v} < 0 \) → v < 0. So (a) v is negative. (b) m = v/u = (negative)/(negative) = positive. (c) v negative means virtual image (same side as object). (d) |v| < |u| because \( \frac{1}{|v|} = \frac{1}{|f|} + \frac{1}{|u|} > \frac{1}{|u|} \) → |v| < |u| → |m| = |v|/|u| < 1 → diminished. A student who says image is real or magnified has not internalised that concave lenses always produce virtual, erect, diminished images for real objects.

## DIAGNOSTIC_QUESTION_5
An optician prescribes a corrective lens of power -2.5 D. A student claims the focal length is -40 cm and the lens is convex. Evaluate this claim. If wrong, correct it and explain the error.

## DIAGNOSTIC_ANSWER_5
Power P = -2.5 D. Focal length f = 1/P = 1/(-2.5) = -0.4 m = -40 cm. The focal length value is correct, but the lens is concave (diverging), not convex. Convex lenses have positive power (converging). The student incorrectly associated negative focal length with convex lens. This error reveals confusion between sign of focal length and lens type: f positive → convex; f negative → concave. In competitive exams, this sign trap appears frequently.

## DIAGNOSTIC_QUESTION_6
Design a simple experiment using a convex lens, a candle, and a screen to verify the thin lens formula. List the measurements you would take, the graph you would plot to determine focal length, and how you would use the slope/intercept.

## DIAGNOSTIC_ANSWER_6
Fix the lens on a stand. Place the candle (object) at various distances u (e.g., 30, 40, 50, 60 cm) from the lens. For each u, move the screen to get a sharp real image; measure v. Record u and v in cm. Convert to metres. Plot \( \frac{1}{v} \) vs \( \frac{1}{u} \) (or \( \frac{1}{u} \) vs \( \frac{1}{v} \)). From formula \( \frac{1}{v} - \frac{1}{u} = \frac{1}{f} \), a plot of \( \frac{1}{v} \) (y-axis) vs \( \frac{1}{u} \) (x-axis) gives slope +1 and y-intercept \( \frac{1}{f} \). Alternatively, plot \( \frac{1}{u} + \frac{1}{v} \) vs something? Actually, \( \frac{1}{v} = \frac{1}{u} + \frac{1}{f} \) → straight line with slope 1, intercept 1/f. A good answer shows understanding of linearizing the formula. A poor answer (e.g., plotting v vs u) indicates lack of algebraic manipulation skill.

## COMMON_MISCONCEPTION
Students often believe that a convex lens always forms a real image and a concave lens always forms a virtual image. They forget that a convex lens forms a virtual, erect, magnified image when the object is placed between the focal point and the lens (u < f). This is the principle of a simple microscope. In JEE/NEET, questions frequently test this by placing an object at u = f/2 and asking for image nature — many students incorrectly answer "real". Another error: using the formula \( \frac{1}{v} + \frac{1}{u} = \frac{1}{f} \) (mirror formula) for lenses, leading to sign errors in v and magnification.

## ON_FAILURE
If the student confuses lens formula with mirror formula: (1) Re-derive the lens formula from refraction at two surfaces (refer to c12_phy_cbse_09_005) to see the minus sign origin. (2) Make a table comparing mirror vs lens formula signs for u, v, f for all cases. (3) Practice 5 numerical problems each for convex and concave lenses with objects at u > 2f, u = 2f, f < u < 2f, u = f, u < f. (4) For virtual image by convex lens, draw ray diagram and verify formula gives v negative. (5) Revisit sign convention node c12_phy_cbse_09_001.

## PREREQUISITE_NODE_IDS
c12_phy_cbse_09_005, c12_phy_cbse_09_001, c10_phy_cbse_04_010, c11_math_cbse_13_008, c12_phy_cbse_09_002

## PREREQUISITE_REASONS
c12_phy_cbse_09_005: Provides the derivation of refraction at a single spherical surface and lens maker's formula, which is the basis for deriving the thin lens formula by applying the surface formula twice.
c12_phy_cbse_09_001: Establishes the Cartesian sign convention and laws of reflection, which are extended to refraction and lenses with the same sign rules.
c10_phy_cbse_04_010: Class 10 covers lens formula and magnification at a basic level; this node builds on that with rigorous derivation and sign convention.
c11_math_cbse_13_008: Algebra of derivatives and basic calculus from Class 11 Maths helps in understanding rate of change concepts used in advanced optics (e.g., longitudinal magnification).
c12_phy_cbse_09_002: Thin lens formula and magnification follow an analogous derivation pattern; sign convention mastery here transfers directly.  

## FORWARD_NODE_IDS
c12_phy_cbse_09_007, c12_phy_cbse_09_009, c12_phy_cbse_09_010, c12_phy_cbse_09_011
## FORWARD_REASONS
c12_phy_cbse_09_007: Combination of thin lenses in contact uses the thin lens formula and power addition (P = P1 + P2) derived here.
c12_phy_cbse_09_009: Simple microscope uses a single convex lens; its magnifying power derivation uses the lens formula and magnification.
c12_phy_cbse_09_010: Compound microscope uses objective and eyepiece lenses; image formation by each lens is analysed using the thin lens formula.
c12_phy_cbse_09_011: Astronomical telescope uses objective and eyepiece; angular magnification derivation relies on lens formula for both lenses.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_02_005, c11_math_cbse_02_010, c10_math_cbse_04_005
## CROSS_SUBJECT_REASONS
c11_math_cbse_02_005: Functions (polynomial, rational) are used to model the lens formula \( \frac{1}{v} - \frac{1}{u} = \frac{1}{f} \) as a rational function; domain/range analysis helps understand allowed u, v values.
c11_math_cbse_02_010: Algebra of real functions (sum, difference) is used when combining powers of lenses in contact: P = P1 + P2.
c10_math_cbse_04_005: Quadratic formula and completing the square appear when solving for u or v in displacement method experiments (e.g., two positions of lens for fixed object-screen distance).

## CHAIN_DESCRIPTION
c12_phy_cbse_09_005 -> c12_phy_cbse_09_006 -> c12_phy_cbse_09_007

## THIS_FORMULA
Thin lens formula: \( \frac{1}{v} - \frac{1}{u} = \frac{1}{f} \) (all distances in m). Magnification: \( m = \frac{h'}{h} = \frac{v}{u} \). Power of lens: \( P = \frac{1}{f} \) (f in m, P in dioptre D).

## FORMULA_VARIABLES
u = object distance from optical centre (m), negative for real object; v = image distance from optical centre (m), positive for real image, negative for virtual; f = focal length (m), positive for convex lens, negative for concave; h = object height (m), positive if erect (upward); h' = image height (m), positive if erect, negative if inverted; m = linear magnification (dimensionless); P = power of lens (dioptre, D = m⁻¹).

## FORMULA_UNITS
m (metre) for u, v, f; dimensionless for m, h'/h; D (dioptre = m⁻¹) for P.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_02_005 | The lens formula \( \frac{1}{v} - \frac{1}{u} = \frac{1}{f} \) can be rearranged as \( v = \frac{uf}{u+f} \), a rational function; its domain (u ≠ -f) and asymptotes correspond to physical situations (object at focus gives image at infinity).
c11_math_cbse_02_010 | When combining lenses in contact, powers add algebraically: P = P1 + P2 + ...; this is direct application of sum of functions.
c10_math_cbse_04_005 | In the displacement method (fixed object-screen distance D, lens moved to two positions giving sharp images), the focal length is found from \( f = \frac{D^2 - d^2}{4D} \), derived by solving a quadratic equation formed from lens formula.
## PREREQ_CONCEPT
Refraction at a single spherical surface formula: \( \frac{n_2}{v} - \frac{n_1}{u} = \frac{n_2 - n_1}{R} \), and Cartesian sign convention for mirrors/lenses.

## PREREQ_BEFORE
Student must be able to apply the sign convention correctly for mirrors (c12_phy_cbse_09_001) and understand the derivation of refraction at a spherical surface (c12_phy_cbse_09_005). They should also be comfortable solving linear equations in two variables.

## PREREQ_STUCK
If stuck on sign convention, revisit c12_phy_cbse_09_001 and draw ray diagrams for each case (convex/concave lens, real/virtual object) labelling u, v, f, h, h' with signs. If stuck on algebra, review solving equations with fractions (Class 10 Maths).

## WORKED_EXAMPLE_1
PROBLEM: A convex lens of focal length 15 cm is used to project the image of a 2.0 cm tall candle flame onto a wall. The candle is placed 25 cm from the lens. Find the distance of the wall from the lens (image distance), the height and nature of the image on the wall, and the power of the lens in dioptres.
STEPS:
- Step 1: Identify given quantities with units and sign convention. f = +15 cm (convex lens), u = -25 cm (real object on left), h = +2.0 cm (erect object). Convert to metres: f = +0.15 m, u = -0.25 m, h = +0.020 m.
- Step 2: Write the thin lens formula \( \frac{1}{v} - \frac{1}{u} = \frac{1}{f} \) and solve for v. Substitute: \( \frac{1}{v} = \frac{1}{f} + \frac{1}{u} = \frac{1}{0.15} + \frac{1}{-0.25} \).
- Step 3: Compute with units: \( \frac{1}{0.15} = 6.666... \, \text{m}^{-1} \), \( \frac{1}{-0.25} = -4.0 \, \text{m}^{-1} \). Sum = 2.666... m⁻¹. So \( \frac{1}{v} = 2.666... \, \text{m}^{-1} \) → v = +0.375 m = +37.5 cm.
- Step 4: v positive means real image on opposite side (right side). The wall should be 37.5 cm from the lens.
- Step 5: Magnification m = v/u = (+0.375) / (-0.25) = -1.5. Image height h' = m × h = -1.5 × 0.020 m = -0.030 m = -3.0 cm. Negative sign means inverted image. Magnified (|m| > 1).
- Step 6: Power P = 1/f = 1/0.15 = +6.67 D. Positive power confirms converging lens.
- Step 7: Verify physical reasonableness: Object between f and 2f (15 cm < 25 cm < 30 cm) → real, inverted, magnified image beyond 2f (v > 30 cm). 37.5 cm > 30 cm, correct.
REASONING: The thin lens formula is derived from applying refraction at two spherical surfaces with the thin lens approximation. The sign convention ensures the same formula works for all lens types and object positions. Power in dioptres is the reciprocal of focal length in metres, used by opticians.
ANSWER: Image distance v = +37.5 cm (real), image height h' = -3.0 cm (inverted, magnified), power P = +6.67 D.

## WORKED_EXAMPLE_2
PROBLEM: A concave lens of focal length -20 cm forms an image of an object placed 30 cm from it. Find the image distance, magnification, and describe the image. If the object is 5 cm tall, what is the image height?
STEPS:
- Step 1: Given f = -20 cm (concave lens), u = -30 cm (real object), h = +5 cm. Convert to metres: f = -0.20 m, u = -0.30 m, h = +0.05 m.
- Step 2: Apply lens formula \( \frac{1}{v} - \frac{1}{u} = \frac{1}{f} \). \( \frac{1}{v} = \frac{1}{f} + \frac{1}{u} = \frac{1}{-0.20} + \frac{1}{-0.30} \).
- Step 3: Compute: \( \frac{1}{-0.20} = -5.0 \, \text{m}^{-1} \), \( \frac{1}{-0.30} = -3.333... \, \text{m}^{-1} \). Sum = -8.333... m⁻¹. So \( \frac{1}{v} = -8.333... \) → v = -0.12 m = -12 cm.
- Step 4: v negative means virtual image on same side as object (left side). Image distance from lens = 12 cm.
- Step 5: Magnification m = v/u = (-0.12)/(-0.30) = +0.4. Positive means erect image. |m| = 0.4 < 1 means diminished.
- Step 6: Image height h' = m × h = +0.4 × 0.05 = +0.02 m = +2.0 cm. Positive confirms erect.
- Step 7: Power P = 1/f = 1/(-0.20) = -5.0 D. Negative power confirms diverging lens.
- Step 8: Verify: Concave lens always gives virtual, erect, diminished image for real object. v = -12 cm is between lens and focal point (|v| < |f| = 20 cm), correct.
REASONING: The concave lens diverges light rays, so the image is always virtual and on the same side as the object. The formula with sign convention automatically yields v negative and m positive. The magnitude of v is less than u, giving diminished image.
ANSWER: Image distance v = -12 cm (virtual), magnification m = +0.4 (erect, diminished), image height h' = +2.0 cm, power P = -5.0 D.

## WORKED_EXAMPLE_3
PROBLEM: A student uses a convex lens of focal length 10 cm to obtain a sharp image of a distant tree on a screen. The screen is placed at the focal plane. Then the student places a 3 cm tall object at a distance of 8 cm from the lens (between lens and focus). Find the position, nature, and size of the image. Can this image be obtained on a screen? Explain. Also calculate the angular magnification if the lens is used as a simple microscope with the final image at the near point (D = 25 cm).
STEPS:
- Step 1: For distant tree (u → ∞), image forms at focus: v = f = +10 cm. This is real image on screen.
- Step 2: For object at u = -8 cm (between lens and focus, since |u| = 8 cm < f = 10 cm), f = +10 cm. Use lens formula: \( \frac{1}{v} = \frac{1}{f} + \frac{1}{u} = \frac{1}{10} + \frac{1}{-8} \) (working in cm for convenience, but must be consistent).
- Step 3: \( \frac{1}{v} = 0.1 - 0.125 = -0.025 \, \text{cm}^{-1} \) → v = -40 cm. Negative v means virtual image on same side as object, 40 cm from lens.
- Step 4: Magnification m = v/u = (-40)/(-8) = +5. Image is erect (m positive), magnified 5 times.
- Step 5: Image height h' = m × h = +5 × 3 cm = +15 cm. Erect, virtual, magnified.
- Step 6: Cannot be obtained on a screen because virtual image (rays diverge after lens). Screen requires real image (converging rays).
- Step 7: Angular magnification as simple microscope with image at near point D = 25 cm: m_angular = 1 + D/f = 1 + 25/10 = 3.5. (If image at infinity, m = D/f = 2.5). The lens formula gave linear magnification m = v/u = 5 for this specific object distance (u = 8 cm). The angular magnification formula assumes object at or near focus.
- Step 8: Note: The linear magnification (5) is different from angular magnification (3.5) because angular magnification compares angle subtended at eye with and without lens at near point.
REASONING: When object is inside focal length of convex lens, it acts as a magnifying glass. The virtual image is on the same side, so cannot be projected. The angular magnification formula for simple microscope is derived from the lens formula assuming the final image is at the near point (v = -D) or at infinity.
ANSWER: For object at 8 cm: v = -40 cm (virtual, same side), m = +5, h' = +15 cm (erect, magnified). Cannot be obtained on screen. Angular magnification (image at near point) = 3.5.

## COMPETENCY_QUESTION_1
QUESTION: A convex lens of focal length 20 cm is placed in front of a convex mirror of focal length 15 cm such that their principal axes coincide. A point object is placed 30 cm in front of the lens. The lens-mirror separation is 50 cm. Find the final image position after two refractions (lens) and one reflection (mirror). Use Cartesian sign convention throughout. (This combines lens formula, mirror formula, and sign convention for multiple optical elements.)
COMPETENCY: Interpreting physical situations using formulas and sign conventions for multiple optical elements.
STEPS:
- Step 1: First refraction through lens. u₁ = -30 cm, f_lens = +20 cm. Find v₁ using \( \frac{1}{v_1} - \frac{1}{u_1} = \frac{1}{f} \).
- Step 2: v₁ = +60 cm (real image 60 cm right of lens). This image acts as object for mirror.
- Step 3: Mirror is 50 cm right of lens. Object for mirror is at distance from mirror: u_m = -(60 - 50) = -10 cm (real object for mirror, in front of it). f_mirror = +15 cm (convex mirror has positive f in Cartesian? Wait: For mirrors, concave f negative, convex f positive? In Cartesian: for mirrors, f = R/2. Concave mirror: centre of curvature left of pole → R negative → f negative. Convex mirror: centre right → R positive → f positive. Yes, convex mirror f = +15 cm).
- Step 4: Mirror formula: \( \frac{1}{v_m} + \frac{1}{u_m} = \frac{1}{f_m} \). \( \frac{1}{v_m} = \frac{1}{15} - \frac{1}{-10} = \frac{1}{15} + \frac{1}{10} = \frac{5}{30} = \frac{1}{6} \) → v_m = +6 cm. Positive v for mirror means image behind mirror (virtual).
- Step 5: This image is 6 cm behind mirror. Mirror is 50 cm right of lens. So final image is 50 + 6 = 56 cm to the right of lens. Virtual.
ANSWER: Final image is virtual, located 56 cm to the right of the lens (6 cm behind the convex mirror).
DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: In a displacement method experiment, a convex lens forms sharp images on a screen for two positions separated by 20 cm. The object and screen are fixed 100 cm apart. Find the focal length of the lens. If the object size is 2 cm and the two image sizes are 4.5 cm and 0.8 cm, verify the magnification relation \( m_1 m_2 = 1 \) and find the object size from the image sizes.
COMPETENCY: Applying lens formula in experimental context (displacement method) and using magnification product property.
STEPS:
- Step 1: Displacement method: D = 100 cm (object-screen distance), d = 20 cm (distance between two lens positions). Focal length \( f = \frac{D^2 - d^2}{4D} \).
- Step 2: Compute: \( f = \frac{100^2 - 20^2}{4 \times 100} = \frac{10000 - 400}{400} = \frac{9600}{400} = 24 \) cm.
- Step 3: For first position, let u₁ = -x, v₁ = D - x = 100 - x. Magnification m₁ = v₁/u₁ = (100 - x)/(-x) = -(100 - x)/x. Image size h₁' = m₁ × h = 4.5 cm (magnified, inverted? Actually first position usually gives magnified inverted image, so m₁ negative, h₁' negative? But size given as 4.5 cm magnitude. We'll use absolute sizes).
- Step 4: Second position: lens moved d = 20 cm away from object. u₂ = -(x + 20), v₂ = 100 - (x + 20) = 80 - x. m₂ = v₂/u₂ = (80 - x)/[-(x + 20)] = -(80 - x)/(x + 20). Image size h₂' = 0.8 cm.
- Step 5: Product m₁ m₂ = [-(100 - x)/x] × [-(80 - x)/(x + 20)] = (100 - x)(80 - x) / [x(x + 20)]. From lens formula, it can be shown m₁ m₂ = 1 for the two positions. Verify numerically: We know D=100, d=20. The two positions correspond to u₁ = -(D-d)/2? Actually standard: u₁ = -(D-d)/2, v₁ = (D+d)/2 for first position? Let's use known result: m₁ = (D+d)/(D-d), m₂ = (D-d)/(D+d). Then m₁ m₂ = 1.
- Step 6: Here D=100, d=20 → m₁ = (100+20)/(100-20) = 120/80 = 1.5, m₂ = 80/120 = 2/3 ≈ 0.667. Product = 1.5 × 0.667 = 1. Verified.
- Step 7: Given image sizes 4.5 cm and 0.8 cm. Since m₁ = h₁'/h = 4.5/h, m₂ = h₂'/h = 0.8/h. Then (4.5/h) × (0.8/h) = 1 → 3.6 / h² = 1 → h² = 3.6 → h = √3.6 ≈ 1.897 cm ≈ 1.9 cm. (Given object size was 2 cm, close enough; slight rounding).
ANSWER: Focal length f = 24 cm. Magnification product m₁ m₂ = 1 verified. Object size calculated from image sizes ≈ 1.9 cm (consistent with 2 cm).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The SI unit for distances is metre (m), ______ is dimensionless, and focal length is in metre (m).

## DIAGNOSTIC_ANSWER_7
magnification

Magnification is the dimensionless member: distances in metres, but the size ratio carries no unit at all. **A wrong answer (a metre) reveals the student has given the height ratio the wrong citizenship.** Magnification is the dimensionless member: metres for distances, a bare ratio for sizes.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine holding a convex lens (like a ______ glass) under sunlight — you see a bright spot on paper at a certain distance.

## DIAGNOSTIC_ANSWER_8
magnifying

The magnifying glass completes the comparison: the household name for the convex lens the formula describes. **A wrong answer (a reading stone) reveals the student has swapped in an antique where the walkthrough names the modern tool.** The magnifying glass completes the comparison: the household title of the convex lens under analysis.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: The power of a lens (in dioptres) is simply ______/f (in metres) — opticians use this for spectacles.

## DIAGNOSTIC_ANSWER_9
1

The one is the power's numerator: dioptres count reciprocal metres, nothing more. **A wrong answer (f alone) reveals the student has inverted the definition and prescribed spectacles in metres of focal length.** The one is power's numerator: dioptres count reciprocal metres, the optician's whole conversion.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student must be able to: (1) correctly apply the Cartesian sign convention to assign signs to u, v, f, h, h' for any combination of convex/concave lens and real/virtual object/image; (2) solve the thin lens formula algebraically to find any unknown among u, v, f; (3) compute magnification and interpret its sign and magnitude to.
