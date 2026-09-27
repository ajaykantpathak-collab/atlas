import type { SimDef } from '../../engine/types';
import C12_PhysicsRayOpticsAndOpticalInstrumentsSim from '../../../simulations/c6_12/C12_PhysicsRayOpticsAndOpticalInstrumentsSim';

/** v3 wrapped master — C12_PhysicsRayOpticsAndOpticalInstrumentsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_physicsrayopticsandopticalinstrumentssim: SimDef = {
    id: 'v3w_c12_physicsrayopticsandopticalinstrumentssim',
    title: 'Ray Optics And Optical Instruments',
    subtitle: 'This node covers: derivation of mirror formula and magnification for spherical mirrors.',
    classLevel: 12, subject: 'physics', topic: 'Spherical Mirrors: Mirror Formula and Magnification',
    chapters: [],
    nodeIds: ['c12_phy_cbse_09_002', 'c12_phy_cbse_09_006', 'c12_phy_cbse_09_007', 'c12_phy_cbse_09_003', 'c12_phy_cbse_09_004', 'c12_phy_cbse_09_008', 'c12_phy_cbse_09_010', 'c12_phy_cbse_09_011', 'c12_phy_cbse_10_007', 'c12_phy_cbse_09_001', 'c12_phy_cbse_09_009', 'c12_phy_cbse_09_005', 'c12_phy_cbse_10_001', 'c12_phy_cbse_10_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe the side-view mirror of a parked car (convex mirror): objects appear smaller and farther than they.', goal: 'Master Ray Optics And Optical Instruments.' },
    discovery: {
        question: 'State the formula for the effective focal length \\(F\\) of three thin lenses of focal lengths \\(f_1, f_2, f_3\\) placed in contact.',
        options: ['\\(\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} + \\frac{1}{f_3}\\)', 'does nothing', 'behaves like a plane glass plate'],
        answer: '\\(\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} + \\frac{1}{f_3}\\)',
        hook: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm).',
    },
    teaching: [
        { title: 'The mirror formula relates the object.', text: 'The mirror formula relates the object distance (u), image distance (v), and focal length (f) of a spherical mirror through the equation 1/v + 1/u = 1/f, where distances are measured from the pole.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_002', title: 'The mirror formula relates the object.',
          scaffold: { problem: 'A concave mirror of focal length 12 cm forms a real image 4 times the size of an object. Find the object distance and image distance.',
            steps: [
            { text: 'Identify given: f = -12 cm (concave ⇒ negative), m = -4 (real image ⇒ inverted ⇒ negative magnification). Find u and v.' },
            { text: 'Use magnification formula m = -v/u ⇒ -4 = -v/u ⇒ v = 4u. (Both u and v will be negative for real object/image).' },
            { text: 'Substitute v = 4u into mirror formula 1/v + 1/u = 1/f: 1/(4u) + 1/u = 1/(-12).' },
            { text: 'Combine fractions: (1 + 4)/(4u) = 5/(4u) = -1/12. Cross-multiply: 5 × (-12) = 4u × 1 ⇒ -60 = 4u ⇒ u = -15 cm.' },
            { text: 'Then v = 4u = 4 × (-15) = -60 cm. Verify: 1/(-60) + 1/(-15) = -1/60 - 4/60 = -5/60 = -1/12 = 1/f. Correct.', faded: true, blankAnswer: 'Object distance u = -15 cm (15 cm in front of mirror),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_006', title: 'The thin lens formula relates the.',
          scaffold: { problem: 'A convex lens of focal length 15 cm is used to project the image of a 2.0 cm tall candle flame onto a wall.',
            steps: [
            { text: 'Identify given quantities with units and sign convention. f = +15 cm (convex lens), u = -25 cm (real object on left), h.' },
            { text: 'Write the thin lens formula \\( \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f} \\) and solve for v.' },
            { text: 'Compute with units: \\( \\frac{1}{0.15} = 6.666... \\, \\text{m}^{-1} \\), \\( \\frac{1}{-0.25} = -4.0 \\, \\text{m}^{-1} \\).' },
            { text: 'v positive means real image on opposite side (right side). The wall should be 37.5 cm from the lens.' },
            { text: 'Magnification m = v/u = (+0.375) / (-0.25) = -1.5. Image height h\' = m × h = -1.5 × 0.020 m = -0.030 m = -3.0 cm.' },
            { text: 'Power P = 1/f = 1/0.15 = +6.67 D. Positive power confirms converging lens.' },
            { text: 'Verify physical reasonableness: Object between f and 2f (15 cm < 25 cm < 30 cm) → real, inverted, magnified image.', faded: true, blankAnswer: 'Image distance v = +37.5 cm (real), image height h\' = -3.0.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_007', title: 'The combination of thin lenses in.',
          scaffold: { problem: 'A convex lens of focal length 25 cm is placed in contact with a concave lens of focal length 50 cm.',
            steps: [
            { text: 'Identify given quantities with signs and units. \\(f_1 = +25\\,\\text{cm} = +0.25\\,\\text{m}\\) (convex), \\(f_2 =.' },
            { text: 'Write the combination formula for focal length: \\(\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2}\\).' },
            { text: 'Substitute values: \\(\\frac{1}{F} = \\frac{1}{0.25} + \\frac{1}{-0.50} = 4 - 2 = 2\\,\\text{m}^{-1}\\).' },
            { text: 'Compute \\(F = \\frac{1}{2} = 0.50\\,\\text{m} = 50\\,\\text{cm}\\). Power \\(P = \\frac{1}{F} = 2\\,\\text{D}\\) (or directly \\(P.' },
            { text: 'Since \\(P = +2\\,\\text{D} > 0\\), the combination is converging.', faded: true, blankAnswer: 'Effective focal length \\(F = +50\\,\\text{cm}\\) (or +0.50 m),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_003', title: 'Refraction is the bending of a light.',
          scaffold: { problem: 'A fisherman in Kerala looks into a river at a fish. The ray from the fish enters the water-air interface at an angle of refraction r = 30°.',
            steps: [
            { text: 'Identify given: n_water = 4/3 ≈ 1.333, n_air = 1.00, r = 30° (in air), c = 3.00 × 10⁸ m/s.' },
            { text: 'Apply Snell\'s law at water-air interface. Light goes from water (medium 1) to air (medium 2).' },
            { text: 'sin 30° = 0.5. So (4/3) sin i = 0.5 → sin i = 0.5 × 3/4 = 0.375.' },
            { text: 'i = sin⁻¹(0.375) = 22.0° (to one decimal). Speed in water: v = c/n = (3.00 × 10⁸) / (4/3) = 2.25 × 10⁸ m/s.' },
            { text: 'Check: i < r (22° < 30°), so ray bends away from normal when going from denser to rarer — correct.', faded: true, blankAnswer: 'Angle of incidence in water i = 22.0°; Speed of light in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_004', title: 'Total Internal Reflection (TIR) is the.',
          scaffold: { problem: 'A swimming pool is filled with water (refractive index = 4/3 = 1.333). A small LED light is placed at the bottom of the pool.',
            steps: [
            { text: 'Identify given quantities: n_water = 4/3 = 1.333 (denser medium), n_air = 1.0 (rarer medium), depth h = 2.0 m.' },
            { text: 'Use the critical angle formula for denser-to-rarer interface: sin(ic) = n_air / n_water = 1 / (4/3) = 3/4 = 0.75.' },
            { text: 'Calculate ic = sin⁻¹(0.75). Using a calculator: ic ≈ 48.59° (or 0.848 rad).' },
            { text: 'Geometry: Light rays that escape must strike the surface within a cone of half-angle ic around the vertical.' },
            { text: 'Compute tan(ic) = tan(48.59°) ≈ 1.134. Then R = 2.0 m × 1.134 = 2.268 m.' },
            { text: 'Verify physical reasonableness: Critical angle ~48.6° is less than 90°, so a finite circle exists.' },
            { text: 'State final answers with units: Critical angle ic = 48.6° (or 0.848 rad). Radius of escape circle R = 2.27 m.', faded: true, blankAnswer: 'Critical angle ic = 48.6° (or sin⁻¹(0.75) ≈ 0.848 rad)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_phy_cbse_09_008', title: 'A prism is a transparent optical medium.',
          scaffold: { problem: 'A ray of light is incident at an angle of 40° on one face of a prism of refracting angle 60°.',
            steps: [
            { text: 'Identify given quantities: i = 40°, e = 50°, A = 60°, n = 1.5. Find: δ, r1, r2, check symmetry.' },
            { text: 'Use deviation formula δ = i + e - A. Substitute: δ = 40° + 50° - 60° = 30°.' },
            { text: 'Apply Snell\'s law at first face: sin i = n sin r1 → sin 40° = 1.5 sin r1 → 0.6428 = 1.5 sin r1 → sin r1 = 0.4285 → r1 =.' },
            { text: 'Use geometry r1 + r2 = A → r2 = 60° - 25.4° = 34.6°.' },
            { text: 'Verify Snell\'s law at second face: n sin r2 = 1.5 × sin 34.6° = 1.5 × 0.5678 = 0.8517. sin e = sin 50° = 0.7660.' },
            { text: 'Check symmetry: i = 40°, e = 50° → i ≠ e. r1 = 25.4°, r2 = 34.6° → r1 ≠ r2. Ray does NOT pass symmetrically.' },
            { text: 'Physical reasonableness: δ = 30° is positive and less than (i+e) = 90°.', faded: true, blankAnswer: '(a) δ = 30°. (b) r1 ≈ 25.4°, r2 ≈ 34.6°. (c) No, the ray.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_phy_cbse_09_006', title: 'Identify each idea',
          dissect: { specimen: 'Ray Optics And Optical Instruments', spots: [
            { id: 's1', label: 'The mirror formula relates the', prompt: 'Which idea is this? — The mirror formula relates the object distance (u), image distance (v), and focal length.', answer: 'The mirror formula relates the', options: ['The mirror formula relates the', 'The thin lens formula relates', 'The combination of thin lenses', 'Refraction is the bending of'] },
            { id: 's2', label: 'The thin lens formula relates', prompt: 'Which idea is this? — The thin lens formula relates the object distance (u), image distance (v), and focal.', answer: 'The thin lens formula relates', options: ['The thin lens formula relates', 'The mirror formula relates the', 'The combination of thin lenses', 'Refraction is the bending of'] },
            { id: 's3', label: 'The combination of thin lenses', prompt: 'Which idea is this? — The combination of thin lenses in contact refers to an optical system where two or more.', answer: 'The combination of thin lenses', options: ['The combination of thin lenses', 'The mirror formula relates the', 'The thin lens formula relates', 'Refraction is the bending of'] },
            { id: 's4', label: 'Refraction is the bending of', prompt: 'Which idea is this? — Refraction is the bending of a light ray when it passes obliquely from one transparent.', answer: 'Refraction is the bending of', options: ['Refraction is the bending of', 'The mirror formula relates the', 'The thin lens formula relates', 'The combination of thin lenses'] },
            { id: 's5', label: 'Total Internal Reflection TIR is', prompt: 'Which idea is this? — Total Internal Reflection (TIR) is the phenomenon where a light ray traveling in an.', answer: 'Total Internal Reflection TIR is', options: ['Total Internal Reflection TIR is', 'The mirror formula relates the', 'The thin lens formula relates', 'The combination of thin lenses'] },
            { id: 's6', label: 'A prism is a transparent', prompt: 'Which idea is this? — A prism is a transparent optical medium bounded by two plane refracting surfaces inclined.', answer: 'A prism is a transparent', options: ['A prism is a transparent', 'The mirror formula relates the', 'The thin lens formula relates', 'The combination of thin lenses'] }
          ] } }
    ],
    explore: { component: C12_PhysicsRayOpticsAndOpticalInstrumentsSim, prompt: 'Explore the interactive — Ray Optics And Optical Instruments' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_002', difficulty: 'standard',
          question: 'The mirror formula relates the object distance (u), image distance (v), and.',
          hint: 'If stuck on sign assignment, revisit c12_phy_cbse_09_001 and practice the "incident light.',
          misconception: 'Students treat the mirror formula as 1/v - 1/u = 1/f (mimicking lens formula) because they memorise "mirror: +, lens:.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The mirror formula relates the object distance (u), image distance (v), and focal length',
                  options: ['The mirror formula relates the object distance (u), image distance (v), and focal length', 'The thin lens formula relates the object distance (u), image distance (v), and focal', 'The combination of thin lenses in contact refers to an optical system where two or more', 'Refraction is the bending of a light ray when it passes obliquely from one transparent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the mirror formula as 1/v - 1/u = 1/f (mimicking lens formula) because they memorise "mirror: +, lens: -" without.' }
          ],
            remediations: { 'students-treat-the-mirror-formula': { steps: ['Revisit c12_phy_cbse_09_001 (Reflection of Light: Laws and Sign Convention) — practice assigning signs to u, v, f, h,.', 'Re-derive the mirror formula from similar triangles (ΔA\'B\'F ~ ΔMPF and ΔA\'B\'P ~ ΔABP) step by step, explicitly writing.', 'Re-derive magnification from ΔABP ~ ΔA\'B\'P: B\'A\'/BA = B\'P/BP ⇒ h\'/h = (-v)/(-u) = v/u, then apply sign convention for.', 'Solve 5 numerical problems from NCERT Exercises 9.1 and 9.15, checking each sign at every step.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_006', difficulty: 'standard',
          question: 'The thin lens formula relates the object distance (u), image distance (v), and.',
          hint: 'If stuck on sign convention, revisit c12_phy_cbse_09_001 and draw ray diagrams for each.',
          misconception: 'Students often believe that a convex lens always forms a real image and a concave lens always forms a virtual image.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The thin lens formula relates the object distance (u), image distance (v), and focal',
                  options: ['The thin lens formula relates the object distance (u), image distance (v), and focal', 'The mirror formula relates the object distance (u), image distance (v), and focal length', 'The combination of thin lenses in contact refers to an optical system where two or more', 'Refraction is the bending of a light ray when it passes obliquely from one transparent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a convex lens always forms a real image and a concave lens always forms a virtual image.' }
          ],
            remediations: { 'a-convex-lens-always-forms': { steps: ['If the student confuses lens formula with mirror formula: (1) Re-derive the lens formula from refraction at two.', '(2) Make a table comparing mirror vs lens formula signs for u, v, f for all cases.', '(3) Practice 5 numerical problems each for convex and concave lenses with objects at u > 2f, u = 2f, f < u < 2f, u = f,.', '(4) For virtual image by convex lens, draw ray diagram and verify formula gives v negative.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_007', difficulty: 'standard',
          question: 'The combination of thin lenses in contact refers to an optical system where two.',
          hint: 'If stuck, review the sign convention table in c12_phy_cbse_09_006 and solve 5 single-lens.',
          misconception: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm).',
          parts: [
                { id: 'a', prompt: 'State the formula for the effective focal length \\(F\\) of three thin lenses of focal lengths \\(f_1, f_2, f_3\\) placed in contact.', answer: '\\(\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} + \\frac{1}{f_3}\\)',
                  options: ['\\(\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} + \\frac{1}{f_3}\\)', 'does nothing', 'behaves like a plane glass plate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm) are combined, the.' },
                { id: 'b', prompt: 'A convex lens of power +4.0 D and a concave lens of power –2.5 D are placed in contact.', answer: 'The net power is \\(P = +4.0 + (-2.5) = +1.5\\,\\text{D}\\)',
                  options: ['The net power is \\(P = +4.0 + (-2.5) = +1.5\\,\\text{D}\\)', 'does nothing', 'behaves like a plane glass plate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm) are combined, the.' },
                { id: 'c', prompt: 'Two thin lenses of focal lengths +20 cm and –30 cm are placed in contact. An object is placed 40 cm from the combination.', answer: '\\(f_1 = +20\\,\\text{cm}, f_2 = -30\\,\\text{cm}\\)',
                  options: ['\\(f_1 = +20\\,\\text{cm}, f_2 = -30\\,\\text{cm}\\)', 'does nothing', 'behaves like a plane glass plate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm) are combined, the.' }
          ],
            remediations: { 'when-a-convex-and-a': { steps: ['If the student cannot apply the power-addition formula correctly: (1) Revisit node c12_phy_cbse_09_006 to practice sign.', '(2) Review node c10_phy_cbse_04_011 (Class 10 Power of a Lens) for the definition \\(P = 1/f\\) and the sign rule:.', '(3) Do a quick physical check: hold a convex and concave lens together from a spectacle kit, look at a distant object —.', '(4) Re-attempt Diagnostic Questions 2 and 5 with explicit sign annotation.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm).',
          parts: [
                { id: 'a', prompt: 'A student solves a problem: "Two lenses of powers +3 D and –1 D are in contact.', answer: 'The student added the magnitudes instead of the signed powers',
                  options: ['The student added the magnitudes instead of the signed powers', 'does nothing', 'behaves like a plane glass plate', 'no net power'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that when a convex and a concave lens of equal focal length magnitude (e.g., +20 cm and –20 cm) are combined, the.' }
          ],
            remediations: { 'when-a-convex-and-a': { steps: ['If the student cannot apply the power-addition formula correctly: (1) Revisit node c12_phy_cbse_09_006 to practice sign.', '(2) Review node c10_phy_cbse_04_011 (Class 10 Power of a Lens) for the definition \\(P = 1/f\\) and the sign rule:.', '(3) Do a quick physical check: hold a convex and concave lens together from a spectacle kit, look at a distant object —.', '(4) Re-attempt Diagnostic Questions 2 and 5 with explicit sign annotation.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_003', difficulty: 'standard',
          question: 'Refraction is the bending of a light ray when it passes obliquely from one.',
          hint: 'If stuck, revisit Class 10 refraction experiments (c10_phy_cbse_04_006) and trigonometric.',
          misconception: 'Students often believe that "optically denser" means "higher mass density".',
          parts: [
                { id: 'a', prompt: 'State Snell\'s law of refraction in terms of the absolute refractive indices of the two media and the angles of incidence and refraction.', answer: 'Snell\'s law: n₁ sin i = n₂ sin r',
                  options: ['Snell\'s law: n₁ sin i = n₂ sin r', 'optically denser', 'higher mass density'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "optically denser" means "higher mass density".' },
                { id: 'b', prompt: 'A ray of light travels from water (n = 1.33) into crown glass (n = 1.52). Will the ray bend towards the normal or away from the normal?', answer: 'The ray bends towards the normal',
                  options: ['The ray bends towards the normal', 'away from the normal', 'optically denser'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "optically denser" means "higher mass density".' },
                { id: 'c', prompt: 'A light ray in air (n = 1.00) strikes a glass slab (n = 1.50) at an angle of incidence of 35°. Calculate the angle of refraction inside the glass.', answer: 'Given: n₁ = 1.00, n₂ = 1.50, i = 35°',
                  options: ['Given: n₁ = 1.00, n₂ = 1.50, i = 35°', 'optically denser', 'higher mass density'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "optically denser" means "higher mass density".' }
          ],
            remediations: { 'optically-denser-means-higher-mass': { steps: ['If a student confuses optical vs mass density, have them measure the speed of light in different media using the.', 'For the index-swapping error, make them derive n₂₁ = sin i / sin r from n = c/v and the wavefront diagram (Huygens\'.', 'Then re-do Diagnostic Question 2 and 4 with this derivation fresh in mind.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_004', difficulty: 'standard',
          question: 'Total Internal Reflection (TIR) is the phenomenon where a light ray traveling.',
          hint: 'If stuck, review the derivation of Snell\'s law in node c12_phy_cbse_09_003 and the.',
          misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium.',
          parts: [
                { id: 'a', prompt: 'A ray of light travels from glass (n = 1.5) to air (n = 1.0). The angle of incidence is 40°. Will total internal reflection occur?', answer: 'Critical angle ic = sin⁻¹(1/1.5) = sin⁻¹(0.6667) ≈ 41.8°',
                  options: ['Correct answer: Critical angle ic = sin⁻¹(1/1.5) = sin⁻¹(0.6667) ≈ 41.8°', 'bending more and more', '"bending more and more" eventually leads to reflection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium (e.g., air to glass).' },
                { id: 'b', prompt: 'Calculate the critical angle for a diamond-air interface (refractive index of diamond = 2.42).', answer: 'ic = sin⁻¹(1/2.42) = sin⁻¹(0.4132) ≈ 24.4°',
                  options: ['Correct answer: ic = sin⁻¹(1/2.42) = sin⁻¹(0.4132) ≈ 24.4°', 'bending more and more', '"bending more and more" eventually leads to reflection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium (e.g., air to glass).' }
          ],
            remediations: { 'total-internal-reflection-occurs-when': { steps: ['If the student cannot derive the critical angle condition or confuses the media direction: (1) Revisit node.', 'Increase i step by step (30°, 40°, 41.8°, 45°) and calculate r.', 'Show that at i=41.8°, r=90°; at i=45°, sin r = 1.5 × sin 45° = 1.06 > 1 → impossible.', '(2) Do the "coin in a cup" experiment: Place a coin at the bottom of an opaque cup.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a mirage, the inverted image of a tree is formed because light from the tree undergoes total internal reflection at a layer of hot air.', answer: 'Correct evaluation: The statement is partially correct but misleading',
                  options: ['Correct evaluation: The statement is partially correct but misleading', 'bending more and more', '"bending more and more" eventually leads to reflection'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that Total Internal Reflection occurs when light travels from a rarer medium to a denser medium (e.g., air to glass).' }
          ],
            remediations: { 'total-internal-reflection-occurs-when': { steps: ['If the student cannot derive the critical angle condition or confuses the media direction: (1) Revisit node.', 'Increase i step by step (30°, 40°, 41.8°, 45°) and calculate r.', 'Show that at i=41.8°, r=90°; at i=45°, sin r = 1.5 × sin 45° = 1.06 > 1 → impossible.', '(2) Do the "coin in a cup" experiment: Place a coin at the bottom of an opaque cup.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_008', difficulty: 'standard',
          question: 'A prism is a transparent optical medium bounded by two plane refracting.',
          hint: 'If stuck, revisit c12_phy_cbse_09_003 (Snell\'s law) for refraction at plane surfaces, and.',
          misconception: 'Students often believe that "minimum deviation occurs when the ray passes through the prism symmetrically" means the.',
          parts: [
                { id: 'a', prompt: 'A ray of light is incident on one face of a prism of refracting angle A = 60° at an angle of incidence i = 45°.', answer: 'δ = i + e - A = 45° + 55° - 60° = 40°',
                  options: ['δ = i + e - A = 45° + 55° - 60° = 40°', 'minimum deviation occurs when the ray passes through the prism symmetrically', 'symmetric passage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "minimum deviation occurs when the ray passes through the prism symmetrically" means the ray is perpendicular.' },
                { id: 'b', prompt: 'A prism of refracting angle A = 60° and refractive index n = 1.5 is placed in air. Calculate the angle of minimum deviation Dm.', answer: 'Given: A = 60°, n = 1.5',
                  options: ['Given: A = 60°, n = 1.5', 'minimum deviation occurs when the ray passes through the prism symmetrically', 'symmetric passage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "minimum deviation occurs when the ray passes through the prism symmetrically" means the ray is perpendicular.' }
          ],
            remediations: { 'minimum-deviation-occurs-when-the': { steps: ['If the student confuses symmetric passage with normal incidence: (1) Draw a 60° prism.', '(2) Trace rays for i = 0°, 30°, 48.6°, 60° using Snell\'s law at each face (r1 = sin⁻¹(sin i/n), r2 = A - r1, check if.', '(3) Plot δ vs i — observe the minimum at i ≈ 48.6°.', '(4) Verify that at this i, r1 = r2 = 30° = A/2, and the ray inside is parallel to the base.'] } } },
        { type: 'subpart', nodeId: 'c12_phy_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "minimum deviation occurs when the ray passes through the prism symmetrically" means the.',
          parts: [
                { id: 'a', prompt: 'A thin prism of angle A = 4° is made of crown glass (n_y = 1.52, n_v = 1.53, n_r = 1.51).', answer: 'For thin prism: δ = (n - 1)A',
                  options: ['For thin prism: δ = (n - 1)A', 'minimum deviation occurs when the ray passes through the prism symmetrically', 'symmetric passage', 'normal incidence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "minimum deviation occurs when the ray passes through the prism symmetrically" means the ray is perpendicular.' },
                { id: 'b', prompt: 'Design a simple experiment using a prism, a white screen, and a narrow slit to demonstrate that the angle of minimum deviation Dm is the same for two symmetric.', answer: 'Procedure: (1) Fix a narrow slit illuminated by white light',
                  options: ['Procedure: (1) Fix a narrow slit illuminated by white light', 'minimum deviation occurs when the ray passes through the prism symmetrically', 'symmetric passage', 'normal incidence'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "minimum deviation occurs when the ray passes through the prism symmetrically" means the ray is perpendicular.' }
          ],
            remediations: { 'minimum-deviation-occurs-when-the': { steps: ['If the student confuses symmetric passage with normal incidence: (1) Draw a 60° prism.', '(2) Trace rays for i = 0°, 30°, 48.6°, 60° using Snell\'s law at each face (r1 = sin⁻¹(sin i/n), r2 = A - r1, check if.', '(3) Plot δ vs i — observe the minimum at i ≈ 48.6°.', '(4) Verify that at this i, r1 = r2 = 30° = A/2, and the ray inside is parallel to the base.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
