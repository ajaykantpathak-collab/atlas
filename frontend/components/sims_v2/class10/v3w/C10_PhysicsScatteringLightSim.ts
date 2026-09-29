import type { SimDef } from '../../engine/types';
import C10_PhysicsScatteringLightSim from '../../../simulations/c6_12/C10_PhysicsScatteringLightSim';

/** v3 wrapped master — C10_PhysicsScatteringLightSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_physicsscatteringlightsim: SimDef = {
    id: 'v3w_c10_physicsscatteringlightsim',
    title: 'Image Formation by Concave Mirror: Ray Diagrams for All Positions',
    subtitle: 'Covers qualitative ray diagram construction and image characteristic description for.',
    classLevel: 10, subject: 'physics', topic: 'Image Formation by Concave Mirror: Ray Diagrams for All Positions',
    chapters: [],
    nodeIds: ['c10_phy_cbse_04_003', 'c10_phy_cbse_04_005', 'c10_phy_cbse_04_006', 'c10_phy_cbse_04_007', 'c10_phy_cbse_04_008', 'c10_phy_cbse_04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Observe the concave mirror in your school laboratory or a shiny metal spoon\'s inner surface — notice how your.', goal: 'Master Image Formation by Concave Mirror: Ray Diagrams for All Positions.' },
    discovery: {
        question: 'State the mirror formula and magnification formula for spherical mirrors.',
        options: ['Mirror formula: 1/f = 1/v + 1/u', 'magnification 2', 'positive m always means virtual image'],
        answer: 'Mirror formula: 1/f = 1/v + 1/u',
        hook: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.',
    },
    teaching: [
        { title: 'Image formation by a concave mirror is the.', text: 'Image formation by a concave mirror is the process of locating the position, size, nature (real or virtual), and orientation (erect or inverted) of the image formed when light rays from an object.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_003', title: 'Image formation by a concave mirror is.',
          scaffold: { problem: 'A concave mirror of focal length 12 cm is used in a solar cooker to focus sunlight. The sun is effectively at infinity.',
            steps: [
            { text: 'Identify given: f = -12 cm (concave mirror, Cartesian sign convention), object at infinity (u = -∞), object height not.' },
            { text: 'Recall ray diagram rule: Object at infinity → image forms at Focus (F).' },
            { text: 'For scale drawing: 1 cm = 4 cm → F at 3 cm from P on paper. Principal axis horizontal, mirror concave left-facing.' },
            { text: 'Draw two principal rays from top of object (sun): Ray 1 parallel to axis → reflects through F.' },
            { text: 'The "heat spot" is the real image of the sun. Since sun is at infinity, its image is a point at F — size ≈ 0.' },
            { text: 'The cooking pot at F intercepts this concentrated energy — the pot height (10 cm) is irrelevant to spot size; spot size.', faded: true, blankAnswer: '(a) Image at focus, 12 cm in front of mirror (v = -12 cm)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_005', title: 'The mirror formula is a mathematical.',
          scaffold: { problem: 'A 5.0 cm tall candle is placed 40 cm in front of a concave mirror of focal length 20 cm.',
            steps: [
            { text: 'Identify given quantities with signs: h = +5.0 cm (object erect), u = -40 cm (object in front), f = -20 cm (concave.' },
            { text: 'Select mirror formula 1/f = 1/v + 1/u. Check units: all distances in cm, consistent.' },
            { text: 'Solve for v: -1/20 = 1/v - 1/40 → 1/v = -1/20 + 1/40 = -2/40 + 1/40 = -1/40 → v = -40 cm.' },
            { text: 'Calculate magnification: m = -v/u = -(-40)/(-40) = -1. Image height: h\' = m × h = -1 × 5.0 = -5.0 cm.' },
            { text: 'Interpret: v = -40 cm (negative → real image, in front of mirror), m = -1 (negative → inverted, |m| = 1 → same size).' },
            { text: 'Verify: Object at C (u = -2f = -40 cm) should give image at C (v = -2f = -40 cm), inverted, same size — matches ray.', faded: true, blankAnswer: 'Image distance v = -40 cm (40 cm in front of mirror),.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_006', title: 'Refraction of light is the bending of a.',
          scaffold: { problem: 'A ray of light travelling in air enters a glass slab at an angle of incidence of 60°.',
            steps: [
            { text: 'Identify given quantities: n_air = 1, n_glass = 1.5, i = 60°, c = 3 × 10⁸ m/s.' },
            { text: 'Apply Snell\'s law at air-glass interface: n_air sin i = n_glass sin r → 1 × sin 60° = 1.5 × sin r.' },
            { text: 'Substitute sin 60° = 0.866 → 0.866 = 1.5 sin r → sin r = 0.866 / 1.5 = 0.5773.' },
            { text: 'Calculate r = sin⁻¹(0.5773) ≈ 35.3°. (Check: r < i, ray bends towards normal — correct for rarer to denser).' },
            { text: 'Calculate speed in glass: n_glass = c / v_glass → v_glass = c / n_glass = (3 × 10⁸) / 1.5 = 2 × 10⁸ m/s.', faded: true, blankAnswer: 'Angle of refraction = 35.3°, Speed of light in glass = 2 ×.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_007', title: 'The absolute refractive index of a.',
          scaffold: { problem: 'Light travels from air into a diamond. The speed of light in diamond is 1.24 × 10⁸ m/s. Calculate the absolute refractive index of diamond.',
            steps: [
            { text: 'Identify given quantities: c = 3.0 × 10⁸ m/s (speed in air/vacuum), v = 1.24 × 10⁸ m/s (speed in diamond).' },
            { text: 'Write the formula for absolute refractive index: n = c / v. Check units: both speeds in m/s, so n will be dimensionless.' },
            { text: 'Substitute values: n = (3.0 × 10⁸ m/s) / (1.24 × 10⁸ m/s).' },
            { text: 'Cancel the common factor 10⁸ and units m/s: n = 3.0 / 1.24 = 2.41935...' },
            { text: 'Round to appropriate significant figures (given data has 2 or 3 significant figures): n = 2.42.', faded: true, blankAnswer: '2.42 (dimensionless)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_008', title: 'A spherical lens is a transparent.',
          scaffold: { problem: 'A convex lens forms a real image of a distant tree on a screen placed 25 cm from the lens. What is the focal length of the lens?',
            steps: [
            { text: 'Identify given quantities: object distance u ≈ ∞ (distant tree), image distance v = +25 cm (real image on opposite side.' },
            { text: 'Recall that for a thin lens, when object is at infinity, image forms at focus. So v = f.' },
            { text: 'For convex lens, f is positive. Therefore, f = +25 cm = +0.25 m.' },
            { text: 'For a concave lens of same magnitude, f = -25 cm. A distant object (u = -∞) will form a virtual image at the focus on.' },
            { text: 'The negative sign for v means the image is virtual, on the same side as the object, 25 cm from the lens.', faded: true, blankAnswer: 'Convex lens focal length = +25 cm. Concave lens forms a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_011', title: 'The power of a lens is a measure of its.',
          scaffold: { problem: 'An optician prescribes a corrective lens of power -2.5 D for a student\'s right eye. Calculate the focal length of this lens in cm.',
            steps: [
            { text: 'Identify given: P = -2.5 D. To find: f in cm, lens type, vision defect.' },
            { text: 'Use formula f = 1/P. Ensure P is in dioptre (it is). f will be in meters.' },
            { text: 'Substitute: f = 1/(-2.5) = -0.4 m.' },
            { text: 'Convert to cm: -0.4 m × 100 = -40 cm. Negative sign indicates concave (diverging) lens.' },
            { text: 'Interpret: Negative power → concave lens → corrects myopia (nearsightedness).', faded: true, blankAnswer: 'f = -40 cm; concave lens; corrects myopia.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_phy_cbse_04_005', title: 'Identify each idea',
          dissect: { specimen: 'Image Formation by Concave Mirror: Ray Diagrams for All Positions', spots: [
            { id: 's1', label: 'Image formation by a concave', prompt: 'Which idea is this? — Image formation by a concave mirror is the process of locating the position, size, nature.', answer: 'Image formation by a concave', options: ['Image formation by a concave', 'The mirror formula is a', 'Refraction of light is the', 'The absolute refractive index of'] },
            { id: 's2', label: 'The mirror formula is a', prompt: 'Which idea is this? — The mirror formula is a mathematical relationship connecting object distance (u), image.', answer: 'The mirror formula is a', options: ['The mirror formula is a', 'Image formation by a concave', 'Refraction of light is the', 'The absolute refractive index of'] },
            { id: 's3', label: 'Refraction of light is the', prompt: 'Which idea is this? — Refraction of light is the bending of a light ray when it passes obliquely from one.', answer: 'Refraction of light is the', options: ['Refraction of light is the', 'Image formation by a concave', 'The mirror formula is a', 'The absolute refractive index of'] },
            { id: 's4', label: 'The absolute refractive index of', prompt: 'Which idea is this? — The absolute refractive index of a medium is the ratio of the speed of light in vacuum.', answer: 'The absolute refractive index of', options: ['The absolute refractive index of', 'Image formation by a concave', 'The mirror formula is a', 'Refraction of light is the'] },
            { id: 's5', label: 'A spherical lens is a', prompt: 'Which idea is this? — A spherical lens is a transparent medium bounded by two spherical surfaces (or one.', answer: 'A spherical lens is a', options: ['A spherical lens is a', 'Image formation by a concave', 'The mirror formula is a', 'Refraction of light is the'] },
            { id: 's6', label: 'The power of a lens', prompt: 'Which idea is this? — The power of a lens is a measure of its ability to converge or diverge light rays,.', answer: 'The power of a lens', options: ['The power of a lens', 'Image formation by a concave', 'The mirror formula is a', 'Refraction of light is the'] }
          ] } }
    ],
    explore: { component: C10_PhysicsScatteringLightSim, prompt: 'Explore the interactive — Image Formation by Concave Mirror: Ray Diagrams for All Positions' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_003', difficulty: 'standard',
          question: 'Image formation by a concave mirror is the process of locating the position,.',
          hint: 'Review c8_physics_ch6_3 (principal focus of concave mirror) and c8_physics_ch6_5 (Class 8.',
          misconception: 'Students believe "concave mirrors always form real, inverted images" because they see inverted images in shaving.',
          parts: [
                { id: 'a', prompt: 'Why does a concave mirror form a real, inverted image when the object is placed beyond C, but a virtual, erect image when the object is placed between F and P?', answer: 'Beyond C: Both principal rays (parallel ray → through F',
                  options: ['Beyond C: Both principal rays (parallel ray → through F', 'concave mirrors always form real, inverted images'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "concave mirrors always form real, inverted images" because they see inverted images in shaving mirrors or headlights.' },
                { id: 'b', prompt: 'An object of height 4 cm is placed 30 cm from a concave mirror of focal length 10 cm.', answer: 'Given: u = -30 cm, f = -10 cm, h = +4 cm',
                  options: ['Given: u = -30 cm, f = -10 cm, h = +4 cm', 'concave mirrors always form real, inverted images'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "concave mirrors always form real, inverted images" because they see inverted images in shaving mirrors or headlights.' }
          ],
            remediations: { 'concave-mirrors-always-form-real': { steps: ['Take a concave mirror (or shiny spoon) and hold it at arm\'s length — observe inverted image (object beyond C).', 'Slowly bring it closer to your face — at ~15 cm (between C and F), image magnifies but stays inverted.', 'Bring it very close (< 10 cm, between F and P) — image suddenly becomes **erect and magnified**.', 'Draw ray diagrams for all three positions side-by-side on paper, tracing how the "ray through F" changes from.', 'Label each diagram with "Real/Inverted" or "Virtual/Erect" to cement the transition at F.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_005', difficulty: 'standard',
          question: 'The mirror formula is a mathematical relationship connecting object distance.',
          hint: 'Revisit c10_phy_cbse_04_002 (sign convention rules) and.',
          misconception: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.',
          parts: [
                { id: 'a', prompt: 'State the mirror formula and magnification formula for spherical mirrors.', answer: 'Mirror formula: 1/f = 1/v + 1/u',
                  options: ['Mirror formula: 1/f = 1/v + 1/u', 'magnification 2', 'positive m always means virtual image'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.' },
                { id: 'b', prompt: 'An object of height 4.0 cm is placed 30 cm in front of a concave mirror of focal length 15 cm. Calculate the image distance, magnification, and image height.', answer: 'Given: h = 4.0 cm, u = -30 cm (object in front), f = -15 cm (concave mirror)',
                  options: ['Given: h = 4.0 cm, u = -30 cm (object in front), f = -15 cm (concave mirror)', 'magnification 2', 'positive m always means virtual image'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.' },
                { id: 'c', prompt: 'A convex mirror of focal length 20 cm forms an image of magnification +0.5. Compare the object distance and image distance magnitudes.', answer: 'For convex mirror: f = +20 cm, m = +0.5 (positive → virtual, erect)',
                  options: ['For convex mirror: f = +20 cm, m = +0.5 (positive → virtual, erect)', 'magnification 2', 'positive m always means virtual image'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.' }
          ],
            remediations: { 'magnification-m-v-u-without': { steps: ['Draw a concave mirror ray diagram for object at C (c10_phy_cbse_04_003). Mark u = -2f, v = -2f.', 'Write m = h\'/h. Since image is inverted, h\' is negative, h is positive → m = negative.', 'Calculate -v/u = -(-2f)/(-2f) = -1.', 'Compare: m = h\'/h = -1 and -v/u = -1. The negative sign in formula matches the physical inversion.', 'Practice 5 numericals where you FIRST predict image nature (real/virtual, erect/inverted) from object position, THEN.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a concave mirror, a screen, and a meter scale to determine the focal length of the mirror.', answer: 'Procedure: (1) Fix concave mirror on stand',
                  options: ['Procedure: (1) Fix concave mirror on stand', 'magnification 2', 'positive m always means virtual image'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.' }
          ],
            remediations: { 'magnification-m-v-u-without': { steps: ['Draw a concave mirror ray diagram for object at C (c10_phy_cbse_04_003). Mark u = -2f, v = -2f.', 'Write m = h\'/h. Since image is inverted, h\' is negative, h is positive → m = negative.', 'Calculate -v/u = -(-2f)/(-2f) = -1.', 'Compare: m = h\'/h = -1 and -v/u = -1. The negative sign in formula matches the physical inversion.', 'Practice 5 numericals where you FIRST predict image nature (real/virtual, erect/inverted) from object position, THEN.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_006', difficulty: 'standard',
          question: 'Refraction of light is the bending of a light ray when it passes obliquely from.',
          hint: 'If stuck, review c7_physics_ch05_006 (Laws of Reflection) for angle measurement from.',
          misconception: 'Students believe that the angle of refraction is measured between the refracted ray and the surface of the interface.',
          parts: [
                { id: 'a', prompt: 'A ray of light travels from air (n=1) into water (n=4/3) at an angle of incidence of 30°.', answer: 'The angle of refraction will be less than 30°',
                  options: ['Correct answer: The angle of refraction will be less than 30°', 'r > 30° because water is denser so it bends more', 'denser'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the angle of refraction is measured between the refracted ray and the surface of the interface (like angle of.' },
                { id: 'b', prompt: 'A student performs an experiment to trace the path of a ray through a rectangular glass slab for three different angles of incidence: 20°, 40°, and 60°.', answer: 'Yes, the results are consistent',
                  options: ['Correct answer: Yes, the results are consistent', 'No, because values are not exactly equal', 'The average is the absolute refractive index of air'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the angle of refraction is measured between the refracted ray and the surface of the interface (like angle of.' }
          ],
            remediations: { 'the-angle-of-refraction-is': { steps: ['Revisit Class 8 node c8_physics_ch6_10 (Lenses) and observe a convex lens bending light towards the principal axis —.', 'Do the "coin in bowl" activity again. Explicitly draw the normal at the water surface.', 'Use the analogy of a car moving from pavement (fast) to sand (slow) at an angle: the front wheel hitting sand first.', 'Practice 5 ray diagrams where you only draw the normal first, then decide bending direction based on "slower medium →.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that the angle of refraction is measured between the refracted ray and the surface of the interface.',
          parts: [
                { id: 'a', prompt: 'A ray of light passes from medium A (n=1.6) to medium B (n=1.2). The angle of incidence in A is 30°.', answer: 'The answer is NOT physically possible',
                  options: ['Correct answer: The answer is NOT physically possible', 'Not possible because sin r > 1', 'Should bend towards normal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the angle of refraction is measured between the refracted ray and the surface of the interface (like angle of.' },
                { id: 'b', prompt: 'Design a simple experiment using a rectangular glass slab, pins, and a protractor to verify that the emergent ray is parallel to the incident ray but laterally.', answer: 'Expected answer: (1) Fix white paper on board, place glass slab, mark outline',
                  options: ['Expected answer: (1) Fix white paper on board, place glass slab, mark outline', 'measure angles only', 'use a laser pointer without pins'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the angle of refraction is measured between the refracted ray and the surface of the interface (like angle of.' },
                { id: 'c', prompt: 'A student performs an experiment to trace the path of a ray through a rectangular glass slab for three different angles of incidence: 20°, 40°, and 60°.', answer: 'Yes, the results are consistent',
                  options: ['Correct answer: Yes, the results are consistent', 'No, because values are not exactly equal', 'The average is the absolute refractive index of air'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that the angle of refraction is measured between the refracted ray and the surface of the interface (like angle of.' }
          ],
            remediations: { 'the-angle-of-refraction-is': { steps: ['Revisit Class 8 node c8_physics_ch6_10 (Lenses) and observe a convex lens bending light towards the principal axis —.', 'Do the "coin in bowl" activity again. Explicitly draw the normal at the water surface.', 'Use the analogy of a car moving from pavement (fast) to sand (slow) at an angle: the front wheel hitting sand first.', 'Practice 5 ray diagrams where you only draw the normal first, then decide bending direction based on "slower medium →.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_007', difficulty: 'standard',
          question: 'The absolute refractive index of a medium is the ratio of the speed of light in.',
          hint: 'Revisit c10_phy_cbse_04_006 (Snell\'s law) and c9_physics_ch2_2 (speed definition) —.',
          misconception: 'Students believe refractive index is a property of the material alone and forget it depends on the color (wavelength).',
          parts: [
                { id: 'a', prompt: 'What is the absolute refractive index of a medium in which the speed of light is 2.0 × 10⁸ m/s? (Take speed of light in vacuum = 3.0 × 10⁸ m/s)', answer: '1.5 (dimensionless)',
                  options: ['1.5 (dimensionless)', '1.5 m/s'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe refractive index is a property of the material alone and forget it depends on the color (wavelength) of light.' },
                { id: 'b', prompt: 'A ray of light passes from medium A (refractive index 1.5) to medium B (refractive index 1.33). Will the ray bend towards the normal or away from the normal?', answer: 'The ray bends away from the normal',
                  options: ['The ray bends away from the normal', 'towards the normal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe refractive index is a property of the material alone and forget it depends on the color (wavelength) of light.' }
          ],
            remediations: { 'refractive-index-is-a-property': { steps: ['Take a prism and shine white light through it in a darkened room.', 'Observe the spectrum on a wall.', 'Ask: "If glass had only one refractive index, why would the colors separate?" Then show a table of refractive indices.', 'Have the student calculate the relative refractive index of violet with respect to red (1.532/1.512 ≈ 1.013) to see the.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe refractive index is a property of the material alone and forget it depends on the color (wavelength).',
          parts: [
                { id: 'a', prompt: 'In an experiment, a student measures the speed of light in a transparent liquid as 2.4 × 10⁸ m/s. She calculates the absolute refractive index as 1.25.', answer: 'The first student (1.25) is correct',
                  options: ['The first student (1.25) is correct', 'refractive index of medium', 'refractive index of vacuum with respect to medium'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe refractive index is a property of the material alone and forget it depends on the color (wavelength) of light.' }
          ],
            remediations: { 'refractive-index-is-a-property': { steps: ['Take a prism and shine white light through it in a darkened room.', 'Observe the spectrum on a wall.', 'Ask: "If glass had only one refractive index, why would the colors separate?" Then show a table of refractive indices.', 'Have the student calculate the relative refractive index of violet with respect to red (1.532/1.512 ≈ 1.013) to see the.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_008', difficulty: 'standard',
          question: 'A spherical lens is a transparent medium bounded by two spherical surfaces (or.',
          hint: 'Review refraction through a glass slab (c10_phy_cbse_04_006) and spherical mirror terms.',
          misconception: 'Students often think that the focal length of a lens depends only on its curvature (radius) and not on the refractive.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A spherical lens is a transparent medium bounded by two spherical surfaces (or one',
                  options: ['A spherical lens is a transparent medium bounded by two spherical surfaces (or one', 'Image formation by a concave mirror is the process of locating the position, size, nature', 'The mirror formula is a mathematical relationship connecting object distance (u), image', 'Refraction of light is the bending of a light ray when it passes obliquely from one'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the focal length of a lens depends only on its curvature (radius) and not on the refractive index of the.' }
          ],
            remediations: { 'the-focal-length-of-a': { steps: ['Revisit refraction at a spherical surface (c10_phy_cbse_04_006) — draw ray diagrams for a single convex spherical.', 'Use a physical lens (convex and concave) and a laser pointer to trace rays; observe convergence/divergence.', 'Practice sign convention with a table: list quantities (u, v, f, R, h, h\') and their signs for real/virtual.', 'Solve 5 numerical problems using lens maker\'s formula (for awareness) and sign convention only, checking each sign.'] } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_011', difficulty: 'standard',
          question: 'The power of a lens is a measure of its ability to converge or diverge light.',
          hint: 'If stuck, review c10_phy_cbse_04_010 (Lens Formula and Magnification) for focal length.',
          misconception: 'Students often think the power of a combination is the average of individual powers, or they add focal lengths directly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The power of a lens is a measure of its ability to converge or diverge light rays,',
                  options: ['The power of a lens is a measure of its ability to converge or diverge light rays,', 'Image formation by a concave mirror is the process of locating the position, size, nature', 'The mirror formula is a mathematical relationship connecting object distance (u), image', 'Refraction of light is the bending of a light ray when it passes obliquely from one'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the power of a combination is the average of individual powers, or they add focal lengths directly (f_comb = f₁ + f₂).' }
          ],
            remediations: { 'the-power-of-a-combination': { steps: ['Revisit the definition P = 1/f (f in meters) and do unit conversion drills: 20 cm → 0.20 m → P = 5 D.', 'Use a sign-convention table: Convex → f positive → P positive; Concave → f negative → P negative.', 'Perform a hands-on activity: hold two convex lenses together, focus sunlight on paper, measure combined focal length,.', 'Practice prescription reading: write lens type and focal length for -3 D, +1.5 D, -0.75 D.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
