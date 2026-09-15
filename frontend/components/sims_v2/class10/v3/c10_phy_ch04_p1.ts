import type { SimDef } from '../../engine/types';

/** v3 generated — c10_phy_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_phy_ch04_p1: SimDef = {
    id: 'v3_c10_phy_ch04_p1',
    title: 'Light: Reflection and Refraction',
    subtitle: 'Bend light with lenses and mirrors until you can predict exactly where the image lands.',
    classLevel: 10, subject: 'physics', topic: 'Light: Reflection and Refraction · Part 1/2',
    chapters: ['c10_phy_ch04'],
    nodeIds: ['c10_phy_cbse_04_001', 'c10_phy_cbse_04_002', 'c10_phy_cbse_04_003', 'c10_phy_cbse_04_004', 'c10_phy_cbse_04_005', 'c10_phy_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an optician designing a prescription', intro: 'A patient can\'t read the board past 3 metres. Before you grind a single lens, you need to know exactly what shape bends light back onto the retina.', goal: 'Trace rays through any lens or mirror — predict image position, size and whether it\'s real or virtual.' },
    discovery: {
        question: 'A spoon in a glass of water looks bent at the waterline. The spoon is perfectly straight — so what actually changed?',
        options: ['Light changed speed crossing air to water, so its path bent', 'Water magnifies the spoon', 'The glass distorts the image', 'Reflection off the water surface doubles it'],
        answer: 'Light changed speed crossing air to water, so its path bent',
        hook: 'The bend isn\'t an illusion of the glass — light literally slows down in water, and changing speed means changing direction.',
    },
    teaching: [
        { title: 'Reflection of Light: Laws of Reflection', text: 'The laws of reflection state that: (1) The angle of incidence (∠i) is equal to the angle of reflection (∠r), and (2) The incident ray, the reflected ray, and the normal to the reflecting surface.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_phy_cbse_04_001', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'On the lens lab: move the object from beyond 2F to between F and the lens — watch the image flip from real-and-shrinking to virtual-and-magnified.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_001', title: 'Reflection of Light: Laws of Reflection',
          scaffold: { problem: 'A ray of light is incident on a plane mirror at an angle of 35° to the mirror surface.',
            steps: [
            { text: 'Identify given: angle between incident ray and mirror surface = 35°.' },
            { text: 'Recall that angle of incidence (∠i) is measured from the normal.' },
            { text: 'Apply first law of reflection: ∠r = ∠i = 55°.' },
            { text: 'The angle between incident ray and reflected ray = ∠i + ∠r = 55° + 55° = 110°.' },
            { text: 'Verify: ∠i = ∠r = 55°, both measured from normal. The rays are on opposite sides of the normal.', faded: true, blankAnswer: 'Angle of reflection = 55°; Angle between incident and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_002', title: 'Spherical Mirrors: Concave and Convex, Terms and Definitions',
          scaffold: { problem: 'A concave mirror used in a solar cooker has a radius of curvature of –40 cm (Cartesian sign convention). Calculate its focal length.',
            steps: [
            { text: 'Identify given quantities: R = –40 cm (negative because concave mirror, centre of curvature is in front of mirror).' },
            { text: 'Recall formula f = R/2. This formula is derived assuming paraxial rays (small aperture compared to radius.' },
            { text: 'Substitute: f = (–40 cm) / 2 = –20 cm. The negative sign confirms a real focus in front of the mirror, consistent with.' },
            { text: 'Check paraxial approximation: Aperture = 10 cm, |R| = 40 cm. Ratio = 10/40 = 0.25.' },
            { text: 'Verify physical reasonableness: A solar cooker focuses sunlight at 20 cm from the mirror — a practical distance for.', faded: true, blankAnswer: 'f = –20 cm; paraxial approximation is reasonably satisfied.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_003', title: 'Image Formation by Concave Mirror: Ray Diagrams for All Positions',
          scaffold: { problem: 'A concave mirror of focal length 12 cm is used in a solar cooker to focus sunlight. The sun is effectively at infinity.',
            steps: [
            { text: 'Identify given: f = -12 cm (concave mirror, Cartesian sign convention), object at infinity (u = -∞), object height not.' },
            { text: 'Recall ray diagram rule: Object at infinity → image forms at Focus (F).' },
            { text: 'For scale drawing: 1 cm = 4 cm → F at 3 cm from P on paper. Principal axis horizontal, mirror concave left-facing.' },
            { text: 'Draw two principal rays from top of object (sun): Ray 1 parallel to axis → reflects through F.' },
            { text: 'The "heat spot" is the real image of the sun. Since sun is at infinity, its image is a point at F — size ≈ 0.' },
            { text: 'The cooking pot at F intercepts this concentrated energy — the pot height (10 cm) is irrelevant to spot size; spot size.', faded: true, blankAnswer: '(a) Image at focus, 12 cm in front of mirror (v = -12 cm).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_004', title: 'Image Formation by Convex Mirror: Ray Diagrams',
          scaffold: { problem: 'An object of height 5.0 cm is placed 20 cm in front of a convex mirror of focal length 10 cm.',
            steps: [
            { text: 'Identify given quantities: object height h = 5.0 cm, object distance u = -20 cm (negative as per sign convention,.' },
            { text: 'Draw the principal axis horizontally. Mark the pole (P) at the centre of the mirror line.' },
            { text: 'Draw the object as an upward arrow of height 2.5 cm (5.0 cm / 2) at the object position, perpendicular to the principal.' },
            { text: 'Draw Ray 1: From the top of the object, draw a line parallel to the principal axis towards the mirror (solid blue.' },
            { text: 'Draw Ray 2: From the top of the object, draw a line heading towards C behind the mirror (solid blue line).' },
            { text: 'The two reflected rays (one solid diverging in front, one solid returning) appear to diverge from a point behind the.' },
            { text: 'Measure the image distance from P to the image along the principal axis on the diagram: approximately 3.3 cm on paper.' },
            { text: 'State the nature: Image is virtual (formed behind mirror), erect (upward arrow), diminished (1.66 cm < 5.0 cm), and.', faded: true, blankAnswer: 'Image distance v = +6.6 cm (behind mirror), image height h\'.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_005', title: 'Mirror Formula and Magnification (m = -v/u = h\'/h)',
          scaffold: { problem: 'A 5.0 cm tall candle is placed 40 cm in front of a concave mirror of focal length 20 cm.',
            steps: [
            { text: 'Identify given quantities with signs: h = +5.0 cm (object erect), u = -40 cm (object in front), f = -20 cm (concave.' },
            { text: 'Select mirror formula 1/f = 1/v + 1/u. Check units: all distances in cm, consistent.' },
            { text: 'Solve for v: -1/20 = 1/v - 1/40 → 1/v = -1/20 + 1/40 = -2/40 + 1/40 = -1/40 → v = -40 cm.' },
            { text: 'Calculate magnification: m = -v/u = -(-40)/(-40) = -1. Image height: h\' = m × h = -1 × 5.0 = -5.0 cm.' },
            { text: 'Interpret: v = -40 cm (negative → real image, in front of mirror), m = -1 (negative → inverted, |m| = 1 → same size).' },
            { text: 'Verify: Object at C (u = -2f = -40 cm) should give image at C (v = -2f = -40 cm), inverted, same size — matches ray.', faded: true, blankAnswer: 'Image distance v = -40 cm (40 cm in front of mirror).' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_006', title: 'Refraction of Light: Laws of Refraction (Snell\'s Law)',
          scaffold: { problem: 'A ray of light travelling in air enters a glass slab at an angle of incidence of 60°.',
            steps: [
            { text: 'Identify given quantities: n_air = 1, n_glass = 1.5, i = 60°, c = 3 × 10⁸ m/s.' },
            { text: 'Apply Snell\'s law at air-glass interface: n_air sin i = n_glass sin r → 1 × sin 60° = 1.5 × sin r.' },
            { text: 'Substitute sin 60° = 0.866 → 0.866 = 1.5 sin r → sin r = 0.866 / 1.5 = 0.5773.' },
            { text: 'Calculate r = sin⁻¹(0.5773) ≈ 35.3°. (Check: r < i, ray bends towards normal — correct for rarer to denser).' },
            { text: 'Calculate speed in glass: n_glass = c / v_glass → v_glass = c / n_glass = (3 × 10⁸) / 1.5 = 2 × 10⁸ m/s.', faded: true, blankAnswer: 'Angle of refraction = 35.3°, Speed of light in glass = 2.' }
            ] } },
        { type: 'case', nodeId: 'c10_phy_cbse_04_001', title: 'A real-world call',
          caseStudy: { intro: 'Light-based technologies — lasers, surgery, communications — heal and connect; they also enable precision weapons and surveillance systems.',
            decisions: [{ prompt: 'Should scientists refuse work with dual uses?', options: [
                { text: 'Yes — know your work\'s worst use before you do it', outcome: 'The conscientious answer; but almost no field is single-use — refusal mainly removes conscientious people from the work.' },
                { text: 'No — you can\'t control applications from the lab', outcome: 'The purist answer; honest about the limits of control, silent about the choice of what to work on.' },
                { text: 'Choose the field, publish openly, fight misuse in the open', outcome: 'The engaged answer — the scientist\'s real leverage is in what they choose to pursue and what they say about its use.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Checking reflection laws on the back of a shiny steel spoon, a student draws the \'normal\' as a line straight down, perpendicular to the spoon\'s handle axis. Her measured angles of incidence and refusal don\'t match, and she blames the spoon for being curved.',
            decisions: [{ prompt: 'Where is the real error?', options: [
                { text: 'In the normal — on a curved mirror the normal at any point is the line from that point to the mirror\'s centre of curvature, not a fixed vertical. The laws of reflection hold perfectly on curved surfaces point by point: measure the incident and reflected angles against that radial normal and they will be equal.', outcome: 'Curved mirrors follow the same laws as flat ones — the normal just changes direction with the surface, which is exactly what makes concave and convex mirrors focus and spread light.' },
                { text: 'The spoon is at fault — the laws of reflection only work on perfectly flat mirrors, so curved surfaces cannot obey them.', outcome: 'Reflection laws apply to every smooth surface — the mirror\'s curvature only changes where the normal points, not whether angle in equals angle out.', reveals: 'reflection-needs-flat' },
                { text: 'Her normal is right — on any mirror the normal must stay perpendicular to the object\'s longest axis.', outcome: 'The normal is defined by the surface at the point of incidence — for a spherical mirror it always runs through the centre of curvature, not along any external axis.', reveals: 'normal-follows-axis' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every camera, telescope, microscope and pair of spectacles is one idea: light obeys rules, and rules can be bent into instruments.',
            decisions: [{ prompt: 'What comes next? Light: Reflection and Refraction · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Light: Reflection and Refraction · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_001', difficulty: 'standard',
          question: 'The laws of reflection state that: (1) The angle of incidence (∠i) is equal.',
          hint: 'If stuck on drawing normals or measuring angles, revisit Class 7 practical skills.',
          misconception: 'Students often believe that the laws of reflection are different for curved mirrors (concave/convex) compared to plane.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The laws of reflection state that: (1) The angle of incidence (∠i) is equal to the angle',
                  options: ['The laws of reflection state that: (1) The angle of incidence (∠i) is equal to the angle', 'A spherical mirror is a reflecting surface that forms part of a hollow sphere of glass,', 'Image formation by a concave mirror is the process of locating the position, size, nature', 'Image formation by a convex mirror occurs when incident rays parallel to the principal'],
                  hint: 'If stuck on drawing normals or measuring angles, revisit Class 7 practical skills: "Drawing normals.',
                  misconception: 'Students often believe that the laws of reflection are different for curved mirrors (concave/convex) compared to plane mirrors.' }
          ],
            remediations: { 'the-laws-of-reflection-are': { steps: ['Take a stainless steel spoon. Shine a laser pointer at different points on the concave side.', 'Draw the tangent line at that point on paper, draw the normal (perpendicular to tangent), and measure ∠i and ∠r — they.', 'Repeat for convex side.', 'Generalise: any smooth curved surface is locally flat; the laws of reflection apply point-by-point.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_002', difficulty: 'standard',
          question: 'A spherical mirror is a reflecting surface that forms part of a hollow sphere.',
          hint: 'If stuck, review c10_phy_cbse_04_001 (laws of reflection) for the normal-at-a-point.',
          misconception: 'Students often believe that the centre of curvature C and the focus F are fixed physical points on the mirror itself.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A spherical mirror is a reflecting surface that forms part of a hollow sphere of glass,',
                  options: ['A spherical mirror is a reflecting surface that forms part of a hollow sphere of glass,', 'The laws of reflection state that: (1) The angle of incidence (∠i) is equal to the angle', 'Image formation by a concave mirror is the process of locating the position, size, nature', 'Image formation by a convex mirror occurs when incident rays parallel to the principal'],
                  hint: 'If stuck, review c10_phy_cbse_04_001 (laws of reflection) for the normal-at-a-point concept, and.',
                  misconception: 'Students often believe that the centre of curvature C and the focus F are fixed physical points on the mirror itself, like markings on the.' }
          ],
            remediations: { 'the-centre-of-curvature-c': { steps: ['Remediation: (1) Use a spherical ball (e.g., a rubber ball) and mark its centre with a pin.', 'Cut a small piece from the ball to represent the mirror.', 'Show that the centre of the original ball (C) is now a point in space in front of the mirror piece, not on it.', '(2) Draw a full circle on paper, mark centre C, cut out a small arc — this is the mirror.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_003', difficulty: 'standard',
          question: 'Image formation by a concave mirror is the process of locating the position.',
          hint: 'Review c8_physics_ch6_3 (principal focus of concave mirror) and c8_physics_ch6_5 (Class 8.',
          misconception: 'Students believe "concave mirrors always form real, inverted images" because they see inverted images in shaving.',
          parts: [
                { id: 'a', prompt: 'Why does a concave mirror form a real, inverted image when the object is placed beyond C, but a virtual, erect image when the object is placed between F and P?', answer: 'Beyond C: Both principal rays (parallel ray → through F',
                  options: ['Beyond C: Both principal rays (parallel ray → through F', 'concave mirrors always form real, inverted images'],
                  hint: 'Review c8_physics_ch6_3 (principal focus of concave mirror) and c8_physics_ch6_5 (Class 8 ray.',
                  misconception: 'Students believe "concave mirrors always form real, inverted images" because they see inverted images in shaving mirrors or headlights.' },
                { id: 'b', prompt: 'An object of height 4 cm is placed 30 cm from a concave mirror of focal length 10 cm.', answer: 'Given: u = -30 cm, f = -10 cm, h = +4 cm',
                  options: ['Given: u = -30 cm, f = -10 cm, h = +4 cm', 'concave mirrors always form real, inverted images'],
                  hint: 'Review c8_physics_ch6_3 (principal focus of concave mirror) and c8_physics_ch6_5 (Class 8 ray.',
                  misconception: 'Students believe "concave mirrors always form real, inverted images" because they see inverted images in shaving mirrors or headlights.' }
          ],
            remediations: { 'concave-mirrors-always-form-real': { steps: ['Take a concave mirror (or shiny spoon) and hold it at arm\'s length — observe inverted image (object beyond C).', 'Slowly bring it closer to your face — at ~15 cm (between C and F), image magnifies but stays inverted.', 'Bring it very close (< 10 cm, between F and P) — image suddenly becomes **erect and magnified**.', 'Draw ray diagrams for all three positions side-by-side on paper, tracing how the "ray through F" changes from.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_004', difficulty: 'standard',
          question: 'Image formation by a convex mirror occurs when incident rays parallel to the.',
          hint: 'If stuck, revisit c10_phy_cbse_04_002 (Spherical Mirrors: Terms and Definitions) and.',
          misconception: 'Students often draw the reflected ray for the parallel incident ray as a solid line passing through the focus F.',
          parts: [
                { id: 'a', prompt: 'State the two standard rays used to draw a ray diagram for a convex mirror and describe the path of each ray after reflection.', answer: 'The two standard rays are: (1) A ray parallel to the principal axis',
                  options: ['The two standard rays are: (1) A ray parallel to the principal axis', 'the parallel ray passes through F in front of the mirror'],
                  hint: 'If stuck, revisit c10_phy_cbse_04_002 (Spherical Mirrors: Terms and Definitions) and.',
                  misconception: 'Students often draw the reflected ray for the parallel incident ray as a solid line passing through the focus F in front of the convex.' }
          ],
            remediations: { 'students-often-draw-the-reflected': { steps: ['Take a steel spoon (convex side) and a laser pointer. Shine the laser parallel to the spoon\'s principal axis — observe.', 'On paper, draw a large convex mirror. Mark P, then measure and mark F and C **behind** the mirror at equal distances (f.', 'Practice the two rays with coloured pencils: incident rays in blue (solid), reflected rays in red (solid), virtual.', 'Draw 5 diagrams for different object positions, each time checking: (a) F and C behind mirror, (b) parallel ray.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_005', difficulty: 'standard',
          question: 'The mirror formula is a mathematical relationship connecting object distance.',
          hint: 'Revisit c10_phy_cbse_04_002 (sign convention rules) and.',
          misconception: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.',
          parts: [
                { id: 'a', prompt: 'State the mirror formula and magnification formula for spherical mirrors.', answer: 'Mirror formula: 1/f = 1/v + 1/u',
                  options: ['Mirror formula: 1/f = 1/v + 1/u', 'magnification 2', 'positive m always means virtual image'],
                  hint: 'Revisit c10_phy_cbse_04_002 (sign convention rules) and c10_phy_cbse_04_003/c10_phy_cbse_04_004.',
                  misconception: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.' },
                { id: 'b', prompt: 'An object of height 4.0 cm is placed 30 cm in front of a concave mirror of focal length 15 cm. Calculate the image distance, magnification, and image height.', answer: 'Given: h = 4.0 cm, u = -30 cm (object in front), f = -15 cm (concave mirror)',
                  options: ['Given: h = 4.0 cm, u = -30 cm (object in front), f = -15 cm (concave mirror)', 'magnification 2', 'positive m always means virtual image'],
                  hint: 'Revisit c10_phy_cbse_04_002 (sign convention rules) and c10_phy_cbse_04_003/c10_phy_cbse_04_004.',
                  misconception: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.' },
                { id: 'c', prompt: 'A convex mirror of focal length 20 cm forms an image of magnification +0.5. Compare the object distance and image distance magnitudes.', answer: 'For convex mirror: f = +20 cm, m = +0.5 (positive → virtual, erect)',
                  options: ['For convex mirror: f = +20 cm, m = +0.5 (positive → virtual, erect)', 'magnification 2', 'positive m always means virtual image'],
                  hint: 'Revisit c10_phy_cbse_04_002 (sign convention rules) and c10_phy_cbse_04_003/c10_phy_cbse_04_004.',
                  misconception: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.' }
          ],
            remediations: { 'magnification-m-v-u-without': { steps: ['Draw a concave mirror ray diagram for object at C (c10_phy_cbse_04_003). Mark u = -2f, v = -2f.', 'Write m = h\'/h. Since image is inverted, h\' is negative, h is positive → m = negative.', 'Calculate -v/u = -(-2f)/(-2f) = -1.', 'Compare: m = h\'/h = -1 and -v/u = -1. The negative sign in formula matches the physical inversion.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.',
          parts: [
                { id: 'a', prompt: 'Design a simple experiment using a concave mirror, a screen, and a meter scale to determine the focal length of the mirror.', answer: 'Procedure: (1) Fix concave mirror on stand',
                  options: ['Procedure: (1) Fix concave mirror on stand', 'magnification 2', 'positive m always means virtual image'],
                  hint: 'Revisit c10_phy_cbse_04_002 (sign convention rules) and c10_phy_cbse_04_003/c10_phy_cbse_04_004.',
                  misconception: 'Students believe magnification m = v/u (without the negative sign) and think positive m always means virtual image.' }
          ],
            remediations: { 'magnification-m-v-u-without': { steps: ['Draw a concave mirror ray diagram for object at C (c10_phy_cbse_04_003). Mark u = -2f, v = -2f.', 'Write m = h\'/h. Since image is inverted, h\' is negative, h is positive → m = negative.', 'Calculate -v/u = -(-2f)/(-2f) = -1.', 'Compare: m = h\'/h = -1 and -v/u = -1. The negative sign in formula matches the physical inversion.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_006', difficulty: 'standard',
          question: 'Refraction of light is the bending of a light ray when it passes obliquely from.',
          hint: 'If stuck, review c7_physics_ch05_006 (Laws of Reflection) for angle measurement from.',
          misconception: 'Students believe that the angle of refraction is measured between the refracted ray and the surface of the interface.',
          parts: [
                { id: 'a', prompt: 'A ray of light travels from air (n=1) into water (n=4/3) at an angle of incidence of 30°.', answer: 'Correct answer: The angle of refraction will be less than 30°',
                  options: ['Correct answer: The angle of refraction will be less than 30°', 'r > 30° because water is denser so it bends more', 'denser', 'bends away'],
                  hint: 'If stuck, review c7_physics_ch05_006 (Laws of Reflection) for angle measurement from normal, and.',
                  misconception: 'Students believe that the angle of refraction is measured between the refracted ray and the surface of the interface (like angle.' },
                { id: 'b', prompt: 'A student performs an experiment to trace the path of a ray through a rectangular glass slab for three different angles of incidence: 20°, 40°, and 60°.', answer: 'Correct answer: Yes, the results are consistent',
                  options: ['Correct answer: Yes, the results are consistent', 'No, because values are not exactly equal', 'The average is the absolute refractive index of air'],
                  hint: 'If stuck, review c7_physics_ch05_006 (Laws of Reflection) for angle measurement from normal, and.',
                  misconception: 'Students believe that the angle of refraction is measured between the refracted ray and the surface of the interface (like angle.' }
          ],
            remediations: { 'the-angle-of-refraction-is': { steps: ['Revisit Class 8 node c8_physics_ch6_10 (Lenses) and observe a convex lens bending light towards the principal axis.', 'Do the "coin in bowl" activity again. Explicitly draw the normal at the water surface.', 'Use the analogy of a car moving from pavement (fast) to sand (slow) at an angle: the front wheel hitting sand first.', 'Practice 5 ray diagrams where you only draw the normal first, then decide bending direction based on "slower medium →.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
