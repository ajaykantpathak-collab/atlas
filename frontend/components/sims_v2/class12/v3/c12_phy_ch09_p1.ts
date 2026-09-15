import type { SimDef } from '../../engine/types';

/** v3 generated — c12_phy_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_phy_ch09_p1: SimDef = {
    id: 'v3_c12_phy_ch09_p1',
    title: 'Ray Optics and Optical Instruments · Part 1/2',
    subtitle: 'One flipped sign flipped the image\'s nature',
    classLevel: 12, subject: 'physics', topic: 'Ray Optics and Optical Instruments · Part 1/2',
    chapters: ['c12_phy_ch09'],
    nodeIds: ['c12_phy_cbse_09_001', 'c12_phy_cbse_09_002', 'c12_phy_cbse_09_003', 'c12_phy_cbse_09_004', 'c12_phy_cbse_09_005', 'c12_phy_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Optics sign-keeper', intro: 'The car\'s side mirror shrinks the world for a reason — and the sign convention is the language that says it.', goal: 'Master the laws of reflection and Cartesian sign convention — including why f = R/2 carries a sign.' },
    discovery: {
        question: 'A concave mirror\'s focal length is written +15 cm — and the mirror equation now predicts a virtual image where a real one should be. What went wrong?',
        options: ['The sign convention — f and R are negative for concave because focus and centre sit against the incident light; one flipped sign flips the image\'s nature', 'Rounding error', 'Mirror is convex', 'Focus is behind'],
        answer: 'The sign convention — f and R are negative for concave because focus and centre sit against the incident light; one flipped sign flips the image\'s nature',
        hook: 'The mirror\'s normal isn\'t drawn at random — it always runs through the centre of curvature, which is why a parallel ray bounces through focus and why f = R/2 exists at all. And the sign convention isn\'t bookkeeping: it encodes whether the focus is real or virtual.',
    },
    teaching: [
        { title: 'Reflection of Light: Laws and Sign Convention', text: 'Reflection of light is the phenomenon where a light ray, incident on a smooth surface, bounces back into the same medium following two laws: (1) The angle of incidence equals the angle of reflection.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_phy_cbse_09_001', title: 'Your mission',
          mission: { widget: 'lens', validate: 'lens:focal=50',
            instruction: 'On the lab: set the focal length mid-range — where does the image form?.',
        context: 'Apply the Cartesian rules without mercy: assign signs to u, v, f, R for both mirror types, verify f = R/2 with a sun-and-screen measurement, and trace how one wrong sign corrupts the whole equation.',
            observePrompt: 'What did the lens interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_001', title: 'Reflection of Light: Laws and Sign Convention',
          scaffold: { problem: 'A concave mirror has a radius of curvature of 40 cm. An object is placed 30 cm in front of the mirror.',
            steps: [
            { text: 'Identify given quantities: R = 40 cm (magnitude), object distance = 30 cm (magnitude). Mirror is concave.' },
            { text: 'Recall sign convention: Incident light travels from object to mirror (left to right). Pole is origin.' },
            { text: 'For concave mirror, centre of curvature and focus are on the same side as the object (left of pole).' },
            { text: 'Object is on the left (same side as centre), so object distance u is measured from pole to object against incident.' },
            { text: 'Focal point is real because reflected rays actually converge there (concave mirror).', faded: true, blankAnswer: 'R = –40 cm, f = –20 cm, u = –30 cm. Focal point is real.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_002', title: 'Spherical Mirrors: Mirror Formula and Magnification',
          scaffold: { problem: 'A concave mirror of focal length 12 cm forms a real image 4 times the size of an object. Find the object distance and image distance.',
            steps: [
            { text: 'Identify given: f = -12 cm (concave ⇒ negative), m = -4 (real image ⇒ inverted ⇒ negative magnification). Find u and v.' },
            { text: 'Use magnification formula m = -v/u ⇒ -4 = -v/u ⇒ v = 4u. (Both u and v will be negative for real object/image).' },
            { text: 'Substitute v = 4u into mirror formula 1/v + 1/u = 1/f: 1/(4u) + 1/u = 1/(-12).' },
            { text: 'Combine fractions: (1 + 4)/(4u) = 5/(4u) = -1/12. Cross-multiply: 5 × (-12) = 4u × 1 ⇒ -60 = 4u ⇒ u = -15 cm.' },
            { text: 'Then v = 4u = 4 × (-15) = -60 cm. Verify: 1/(-60) + 1/(-15) = -1/60 - 4/60 = -5/60 = -1/12 = 1/f. Correct.', faded: true, blankAnswer: 'Object distance u = -15 cm (15 cm in front of mirror).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_003', title: 'Refraction of Light: Snell\'s Law',
          scaffold: { problem: 'A fisherman in Kerala looks into a river at a fish. The ray from the fish enters the water-air interface at an angle of refraction r = 30°.',
            steps: [
            { text: 'Identify given: n_water = 4/3 ≈ 1.333, n_air = 1.00, r = 30° (in air), c = 3.00 × 10⁸ m/s.' },
            { text: 'Apply Snell\'s law at water-air interface. Light goes from water (medium 1) to air (medium 2).' },
            { text: 'sin 30° = 0.5. So (4/3) sin i = 0.5 → sin i = 0.5 × 3/4 = 0.375.' },
            { text: 'i = sin⁻¹(0.375) = 22.0° (to one decimal). Speed in water: v = c/n = (3.00 × 10⁸) / (4/3) = 2.25 × 10⁸ m/s.' },
            { text: 'Check: i < r (22° < 30°), so ray bends away from normal when going from denser to rarer — correct.', faded: true, blankAnswer: 'Angle of incidence in water i = 22.0°; Speed of light.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_004', title: 'Total Internal Reflection: Critical Angle and Applications',
          scaffold: { problem: 'A swimming pool is filled with water (refractive index = 4/3 = 1.333). A small LED light is placed at the bottom of the pool.',
            steps: [
            { text: 'Identify given quantities: n_water = 4/3 = 1.333 (denser medium), n_air = 1.0 (rarer medium), depth h = 2.0 m.' },
            { text: 'Use the critical angle formula for denser-to-rarer interface: sin(ic) = n_air / n_water = 1 / (4/3) = 3/4 = 0.75.' },
            { text: 'Calculate ic = sin⁻¹(0.75). Using a calculator: ic ≈ 48.59° (or 0.848 rad).' },
            { text: 'Geometry: Light rays that escape must strike the surface within a cone of half-angle ic around the vertical.' },
            { text: 'Compute tan(ic) = tan(48.59°) ≈ 1.134. Then R = 2.0 m × 1.134 = 2.268 m.' },
            { text: 'Verify physical reasonableness: Critical angle ~48.6° is less than 90°, so a finite circle exists.' },
            { text: 'State final answers with units: Critical angle ic = 48.6° (or 0.848 rad). Radius of escape circle R = 2.27 m.', faded: true, blankAnswer: 'Critical angle ic = 48.6° (or sin⁻¹(0.75) ≈ 0.848 rad).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_005', title: 'Refraction at Spherical Surfaces: Lens Maker\'s Formula',
          scaffold: { problem: 'A double convex lens is made of glass with refractive index 1.55. Both surfaces have the same radius of curvature.',
            steps: [
            { text: 'Identify given quantities: n = 1.55 (lens in air, so n₁=1, n₂=1.55), f = +20 cm (converging lens), R₁ = R (first.' },
            { text: 'Write lens maker\'s formula for lens in air: 1/f = (n-1)(1/R₁ - 1/R₂).' },
            { text: 'Substitute values with signs: 1/0.20 = (1.55 - 1)(1/R - 1/(-R)) = 0.55 × (1/R + 1/R) = 0.55 × (2/R) = 1.10/R.' },
            { text: 'Solve for R: R = 1.10 × 0.20 = 0.22 m = 22 cm.' },
            { text: 'Verify: For a typical glass lens, R ≈ 2f/(n-1) ≈ 40/0.55 ≈ 72 cm?', faded: true, blankAnswer: 'R = 22 cm (or 0.22 m).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_006', title: 'Thin Lens Formula and Magnification',
          scaffold: { problem: 'A convex lens of focal length 15 cm is used to project the image of a 2.0 cm tall candle flame onto a wall.',
            steps: [
            { text: 'Identify given quantities with units and sign convention. f = +15 cm (convex lens), u = -25 cm (real object on left),.' },
            { text: 'Write the thin lens formula \\( \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f} \\) and solve for v.' },
            { text: 'Compute with units: \\( \\frac{1}{0.15} = 6.666... \\, \\text{m}^{-1} \\), \\( \\frac{1}{-0.25} = -4.0 \\, \\text{m}^{-1} \\).' },
            { text: 'v positive means real image on opposite side (right side). The wall should be 37.5 cm from the lens.' },
            { text: 'Magnification m = v/u = (+0.375) / (-0.25) = -1.5. Image height h\' = m × h = -1.5 × 0.020 m = -0.030 m = -3.0 cm.' },
            { text: 'Power P = 1/f = 1/0.15 = +6.67 D. Positive power confirms converging lens.' },
            { text: 'Verify physical reasonableness: Object between f and 2f (15 cm < 25 cm < 30 cm) → real, inverted, magnified image.', faded: true, blankAnswer: 'Image distance v = +37.5 cm (real), image height h\' = -3.0.' }
            ] } },
        { type: 'case', nodeId: 'c12_phy_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A driving-school instructor teaches that the convex side mirror \'warns: objects are closer than they appear\' is just legal boilerplate — \'the mirror is smaller, that\'s all.\'',
            decisions: [{ prompt: 'What does the mirror formula say the convex mirror is actually doing?', options: [
                { text: 'It\'s optically shrinking distances — a convex mirror always forms a virtual, erect, diminished image behind it (v positive, |m| < 1), so the car genuinely looks smaller and farther than it is; the warning is the physics, not the packaging.', outcome: 'The chapter\'s map of the formula: f positive, u negative forces v small and positive, so magnification stays under one — wider field, but everything in it is compressed.' },
                { text: 'He\'s right — the mirror just shows a wider area; distances are true.', outcome: 'The wider field is bought with diminution — every object lands closer to the focus than the pole-side distance it actually occupies, which is exactly why the warning exists.', reveals: 'wide-field-is-free' },
                { text: 'The mirror makes cars look farther only at long range — nearby cars appear true-size.', outcome: 'Diminution holds at every object distance for a convex mirror — |m| rises as the car approaches but stays under 1; there\'s no true-size zone in the formula.', reveals: 'close-up-is-true-size' }
            ] }] } },
        { type: 'case', nodeId: 'c12_phy_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now run mirror math on convention, not memory — where every sign is a statement about real versus virtual.',
            decisions: [{ prompt: 'What comes next? Ray Optics and Optical Instruments · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Ray Optics and Optical Instruments · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'lens', prompt: 'Explore the lens interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'lens', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_001', difficulty: 'standard',
          question: 'Reflection of light is the phenomenon where a light ray, incident on a smooth.',
          hint: 'If confused about sign assignment, go back to c9_math_ch1_1 (Cartesian Coordinate System).',
          misconception: 'Students often believe the sign convention is arbitrary and that "object distance is always negative, image distance.',
          parts: [
                { id: 'a', prompt: 'State the two laws of reflection and the Cartesian sign convention rule for distances measured along the principal axis.', answer: 'Laws: (1) Angle of incidence equals angle of reflection (∠i = ∠r)',
                  options: ['Laws: (1) Angle of incidence equals angle of reflection (∠i = ∠r)', 'distances measured from the focus', 'object distance always negative'],
                  hint: 'If confused about sign assignment, go back to c9_math_ch1_1 (Cartesian Coordinate System) and.',
                  misconception: 'Students often believe the sign convention is arbitrary and that "object distance is always negative, image distance positive for real.' },
                { id: 'b', prompt: 'Compare the sign of focal length for a concave mirror and a convex mirror under the Cartesian convention.', answer: 'Concave mirror: f is negative',
                  options: ['Concave mirror: f is negative', 'concave mirrors have positive f', 'real is positive'],
                  hint: 'If confused about sign assignment, go back to c9_math_ch1_1 (Cartesian Coordinate System) and.',
                  misconception: 'Students often believe the sign convention is arbitrary and that "object distance is always negative, image distance positive for real.' }
          ],
            remediations: { 'the-sign-convention-is-arbitrary': { steps: ['Revisit c10_phy_cbse_04_001 (Laws of Reflection) and c10_phy_cbse_04_002 (Spherical Mirrors Terms) to recall mirror.', 'Draw a coordinate axis on paper: mark pole as origin, incident light direction as +x.', 'Place a concave mirror at origin facing left.', 'Mark focus and centre on the left (negative x).'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_002', difficulty: 'standard',
          question: 'The mirror formula relates the object distance (u), image distance (v), and.',
          hint: 'If stuck on sign assignment, revisit c12_phy_cbse_09_001 and practice the "incident light.',
          misconception: 'Students treat the mirror formula as 1/v - 1/u = 1/f (mimicking lens formula) because they memorise "mirror: +, lens.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The mirror formula relates the object distance (u), image distance (v), and focal length',
                  options: ['The mirror formula relates the object distance (u), image distance (v), and focal length', 'Reflection of light is the phenomenon where a light ray, incident on a smooth surface,', 'Refraction is the bending of a light ray when it passes obliquely from one transparent', 'Total Internal Reflection (TIR) is the phenomenon where a light ray traveling in an'],
                  hint: 'If stuck on sign assignment, revisit c12_phy_cbse_09_001 and practice the "incident light direction.',
                  misconception: 'Students treat the mirror formula as 1/v - 1/u = 1/f (mimicking lens formula) because they memorise "mirror: +, lens: -" without.' }
          ],
            remediations: { 'students-treat-the-mirror-formula': { steps: ['Revisit c12_phy_cbse_09_001 (Reflection of Light: Laws and Sign Convention) — practice assigning signs to u, v, f,.', 'Re-derive the mirror formula from similar triangles (ΔA\'B\'F ~ ΔMPF and ΔA\'B\'P ~ ΔABP) step by step, explicitly writing.', 'Re-derive magnification from ΔABP ~ ΔA\'B\'P: B\'A\'/BA = B\'P/BP ⇒ h\'/h = (-v)/(-u) = v/u, then apply sign convention for.', 'Solve 5 numerical problems from NCERT Exercises 9.1 and 9.15, checking each sign at every step.'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_003', difficulty: 'standard',
          question: 'Refraction is the bending of a light ray when it passes obliquely from one.',
          hint: 'If stuck, revisit Class 10 refraction experiments (c10_phy_cbse_04_006) and trigonometric.',
          misconception: 'Students often believe that "optically denser" means "higher mass density".',
          parts: [
                { id: 'a', prompt: 'State Snell\'s law of refraction in terms of the absolute refractive indices of the two media and the angles of incidence and refraction.', answer: 'Snell\'s law: n₁ sin i = n₂ sin r',
                  options: ['Snell\'s law: n₁ sin i = n₂ sin r', 'optically denser', 'higher mass density', '"optically denser" means "higher mass density"'],
                  hint: 'If stuck, revisit Class 10 refraction experiments (c10_phy_cbse_04_006) and trigonometric ratios.',
                  misconception: 'Students often believe that "optically denser" means "higher mass density".' },
                { id: 'b', prompt: 'A ray of light travels from water (n = 1.33) into crown glass (n = 1.52). Will the ray bend towards the normal or away from the normal?', answer: 'The ray bends towards the normal',
                  options: ['The ray bends towards the normal', 'away from the normal', 'optically denser', 'higher mass density'],
                  hint: 'If stuck, revisit Class 10 refraction experiments (c10_phy_cbse_04_006) and trigonometric ratios.',
                  misconception: 'Students often believe that "optically denser" means "higher mass density".' },
                { id: 'c', prompt: 'A light ray in air (n = 1.00) strikes a glass slab (n = 1.50) at an angle of incidence of 35°. Calculate the angle of refraction inside the glass.', answer: 'Given: n₁ = 1.00, n₂ = 1.50, i = 35°',
                  options: ['Given: n₁ = 1.00, n₂ = 1.50, i = 35°', 'optically denser', 'higher mass density', '"optically denser" means "higher mass density"'],
                  hint: 'If stuck, revisit Class 10 refraction experiments (c10_phy_cbse_04_006) and trigonometric ratios.',
                  misconception: 'Students often believe that "optically denser" means "higher mass density".' },
                { id: 'd', prompt: 'A student performs the glass slab experiment and obtains the following data for sin i and sin r: | sin i | 0.20 | 0.40 | 0.60 | 0.80 | | sin r | 0.13 | 0.26 |.', answer: 'The data shows sin i / sin r = 0.20/0.13 ≈ 1.54 (constant)',
                  options: ['The data shows sin i / sin r = 0.20/0.13 ≈ 1.54 (constant)', 'optically denser', 'higher mass density', '"optically denser" means "higher mass density"'],
                  hint: 'If stuck, revisit Class 10 refraction experiments (c10_phy_cbse_04_006) and trigonometric ratios.',
                  misconception: 'Students often believe that "optically denser" means "higher mass density".' }
          ],
            remediations: { 'optically-denser-means-higher-mass': { steps: ['If a student confuses optical vs mass density, have them measure the speed of light in different media using the.', 'For the index-swapping error, make them derive n₂₁ = sin i / sin r from n = c/v and the wavefront diagram (Huygens\'.', 'Then re-do Diagnostic Question 2 and 4 with this derivation fresh in mind.'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_004', difficulty: 'standard',
          question: 'Total Internal Reflection (TIR) is the phenomenon where a light ray traveling.',
          hint: 'If stuck, review the derivation of Snell\'s law in node c12_phy_cbse_09_003 and the.',
          misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium.',
          parts: [
                { id: 'a', prompt: 'A ray of light travels from glass (n = 1.5) to air (n = 1.0). The angle of incidence is 40°. Will total internal reflection occur?', answer: 'Correct answer: Critical angle ic = sin⁻¹(1/1.5) = sin⁻¹(0.6667) ≈ 41.8°',
                  options: ['Correct answer: Critical angle ic = sin⁻¹(1/1.5) = sin⁻¹(0.6667) ≈ 41.8°', 'bending more and more', '"bending more and more" eventually leads to reflection'],
                  hint: 'If stuck, review the derivation of Snell\'s law in node c12_phy_cbse_09_003 and the definition.',
                  misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium (e.g., air to glass).' },
                { id: 'b', prompt: 'Calculate the critical angle for a diamond-air interface (refractive index of diamond = 2.42).', answer: 'Correct answer: ic = sin⁻¹(1/2.42) = sin⁻¹(0.4132) ≈ 24.4°',
                  options: ['Correct answer: ic = sin⁻¹(1/2.42) = sin⁻¹(0.4132) ≈ 24.4°', 'bending more and more', '"bending more and more" eventually leads to reflection'],
                  hint: 'If stuck, review the derivation of Snell\'s law in node c12_phy_cbse_09_003 and the definition.',
                  misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium (e.g., air to glass).' }
          ],
            remediations: { 'total-internal-reflection-occurs-when': { steps: ['If the student cannot derive the critical angle condition or confuses the media direction: (1) Revisit node.', 'Increase i step by step (30°, 40°, 41.8°, 45°) and calculate r.', 'Show that at i=41.8°, r=90°; at i=45°, sin r = 1.5 × sin 45° = 1.06 > 1 → impossible.', '(2) Do the "coin in a cup" experiment: Place a coin at the bottom of an opaque cup.'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a mirage, the inverted image of a tree is formed because light from the tree undergoes total internal reflection at a layer of hot air.', answer: 'Correct evaluation: The statement is partially correct but misleading',
                  options: ['Correct evaluation: The statement is partially correct but misleading', 'bending more and more', '"bending more and more" eventually leads to reflection'],
                  hint: 'If stuck, review the derivation of Snell\'s law in node c12_phy_cbse_09_003 and the definition.',
                  misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium (e.g., air to glass).' }
          ],
            remediations: { 'total-internal-reflection-occurs-when': { steps: ['If the student cannot derive the critical angle condition or confuses the media direction: (1) Revisit node.', 'Increase i step by step (30°, 40°, 41.8°, 45°) and calculate r.', 'Show that at i=41.8°, r=90°; at i=45°, sin r = 1.5 × sin 45° = 1.06 > 1 → impossible.', '(2) Do the "coin in a cup" experiment: Place a coin at the bottom of an opaque cup.'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_005', difficulty: 'standard',
          question: 'The lens maker\'s formula relates the focal length (f) of a thin lens to the.',
          hint: 'Revisit the derivation of the single spherical surface refraction formula (Eq.',
          misconception: 'Students often believe that the lens maker\'s formula 1/f = (n-1)(1/R₁ - 1/R₂) uses the absolute refractive index n.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The lens maker\'s formula relates the focal length (f) of a thin lens to the refractive',
                  options: ['The lens maker\'s formula relates the focal length (f) of a thin lens to the refractive', 'Reflection of light is the phenomenon where a light ray, incident on a smooth surface,', 'The mirror formula relates the object distance (u), image distance (v), and focal length', 'Refraction is the bending of a light ray when it passes obliquely from one transparent'],
                  hint: 'Revisit the derivation of the single spherical surface refraction formula (Eq.',
                  misconception: 'Students often believe that the lens maker\'s formula 1/f = (n-1)(1/R₁ - 1/R₂) uses the absolute refractive index n of the lens material.' }
          ],
            remediations: { 'the-lens-maker-s-formula': { steps: ['If a student cannot apply the lens maker\'s formula correctly when the medium changes, have them revisit the single.', 'Ask them to re-derive the lens maker\'s formula for a lens in a medium of refractive index n_m, explicitly writing n₁.', 'Then add the two equations.', 'This forces them to see that the relative index (n_lens/n_m) appears naturally.'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_006', difficulty: 'standard',
          question: 'The thin lens formula relates the object distance (u), image distance (v), and.',
          hint: 'If stuck on sign convention, revisit c12_phy_cbse_09_001 and draw ray diagrams for each.',
          misconception: 'Students often believe that a convex lens always forms a real image and a concave lens always forms a virtual image.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The thin lens formula relates the object distance (u), image distance (v), and focal',
                  options: ['The thin lens formula relates the object distance (u), image distance (v), and focal', 'Reflection of light is the phenomenon where a light ray, incident on a smooth surface,', 'The mirror formula relates the object distance (u), image distance (v), and focal length', 'Refraction is the bending of a light ray when it passes obliquely from one transparent'],
                  hint: 'If stuck on sign convention, revisit c12_phy_cbse_09_001 and draw ray diagrams for each case.',
                  misconception: 'Students often believe that a convex lens always forms a real image and a concave lens always forms a virtual image.' }
          ],
            remediations: { 'a-convex-lens-always-forms': { steps: ['If the student confuses lens formula with mirror formula: (1) Re-derive the lens formula from refraction at two.', '(2) Make a table comparing mirror vs lens formula signs for u, v, f for all cases.', '(3) Practice 5 numerical problems each for convex and concave lenses with objects at u > 2f, u = 2f, f < u < 2f, u =.', '(4) For virtual image by convex lens, draw ray diagram and verify formula gives v negative.'], labTask: { instruction: 'On the interactive: set the focal length mid-range — where does the image form? — then check.', widget: 'lens', validate: 'lens:focal=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
