import type { SimDef } from '../../engine/types';

/** v3 generated — c10_phy_ch04_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_phy_ch04_p2: SimDef = {
    id: 'v3_c10_phy_ch04_p2',
    title: 'Light: Reflection and Refraction',
    subtitle: 'Bend light with lenses and mirrors until you can predict exactly where the image lands.',
    classLevel: 10, subject: 'physics', topic: 'Light: Reflection and Refraction · Part 2/2',
    chapters: ['c10_phy_ch04'],
    nodeIds: ['c10_phy_cbse_04_007', 'c10_phy_cbse_04_008', 'c10_phy_cbse_04_009', 'c10_phy_cbse_04_010', 'c10_phy_cbse_04_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an optician designing a prescription', intro: 'A patient can\'t read the board past 3 metres. Before you grind a single lens, you need to know exactly what shape bends light back onto the retina.', goal: 'Trace rays through any lens or mirror — predict image position, size and whether it\'s real or virtual.' },
    discovery: {
        question: 'A spoon in a glass of water looks bent at the waterline. The spoon is perfectly straight — so what actually changed?',
        options: ['Light changed speed crossing air to water, so its path bent', 'Water magnifies the spoon', 'The glass distorts the image', 'Reflection off the water surface doubles it'],
        answer: 'Light changed speed crossing air to water, so its path bent',
        hook: 'The bend isn\'t an illusion of the glass — light literally slows down in water, and changing speed means changing direction.',
    },
    teaching: [
        { title: 'Refractive Index: Definition, Formula and Relative Refractive Index', text: 'The absolute refractive index of a medium is the ratio of the speed of light in vacuum (or air) to the speed of light in that medium.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_phy_cbse_04_007', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'On the lens lab: move the object from beyond 2F to between F and the lens — watch the image flip from real-and-shrinking to virtual-and-magnified.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_007', title: 'Refractive Index: Definition, Formula and Relative Refractive Index',
          scaffold: { problem: 'Light travels from air into a diamond. The speed of light in diamond is 1.24 × 10⁸ m/s. Calculate the absolute refractive index of diamond.',
            steps: [
            { text: 'Identify given quantities: c = 3.0 × 10⁸ m/s (speed in air/vacuum), v = 1.24 × 10⁸ m/s (speed in diamond).' },
            { text: 'Write the formula for absolute refractive index: n = c / v. Check units: both speeds in m/s, so n will be dimensionless.' },
            { text: 'Substitute values: n = (3.0 × 10⁸ m/s) / (1.24 × 10⁸ m/s).' },
            { text: 'Cancel the common factor 10⁸ and units m/s: n = 3.0 / 1.24 = 2.41935...' },
            { text: 'Round to appropriate significant figures (given data has 2 or 3 significant figures): n = 2.42.', faded: true, blankAnswer: '2.42 (dimensionless)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_009', title: 'Image Formation by Lenses: Ray Diagrams for All Positions',
          scaffold: { problem: 'An object of height 5.0 cm is placed at a distance of 40 cm from a convex lens of focal length 15 cm.',
            steps: [
            { text: 'Identify given quantities: object height h = 5.0 cm, object distance u = 40 cm, focal length f = 15 cm.' },
            { text: 'Draw principal axis horizontally. Mark optical centre O. Mark focal points F on both sides at 3 cm (15 cm) from O.' },
            { text: 'Draw Ray 1: From object top, draw line parallel to principal axis to lens.' },
            { text: 'Draw Ray 2: From object top, draw line through O straight through undeviated.' },
            { text: 'Draw Ray 3: From object top, draw line through F on left side to lens.' },
            { text: 'The three refracted rays intersect at a point on the right side.' },
            { text: 'State nature: Real, inverted, diminished (height 2.35 cm < 5 cm), located between F and 2F on opposite side.', faded: true, blankAnswer: 'Image distance = 19 cm (real, on opposite side), image.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_010', title: 'Lens Formula and Magnification',
          scaffold: { problem: 'A student uses a convex lens of focal length 12 cm to project an image of a 3 cm tall candle flame onto a screen.',
            steps: [
            { text: 'Identify given quantities with signs using Cartesian convention. Convex lens → f = +12 cm.' },
            { text: 'Write lens formula 1/f = 1/v - 1/u. Check units: all distances in cm, consistent.' },
            { text: 'Solve for 1/v: 1/v = 1/12 - 1/18 = (3 - 2)/36 = 1/36. Therefore v = +36 cm.' },
            { text: 'Compute magnification m = v/u = (+36)/(-18) = -2. Image height h\' = m × h = (-2) × (+3) = -6 cm.' },
            { text: 'Interpret signs: v = +36 cm → image on opposite side (right) → real image.', faded: true, blankAnswer: 'v = +36 cm, m = -2, h\' = -6 cm; image is real, inverted.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_phy_cbse_04_011', title: 'Power of a Lens: Definition, Unit (Dioptre) and Combinations',
          scaffold: { problem: 'An optician prescribes a corrective lens of power -2.5 D for a student\'s right eye. Calculate the focal length of this lens in cm.',
            steps: [
            { text: 'Identify given: P = -2.5 D. To find: f in cm, lens type, vision defect.' },
            { text: 'Use formula f = 1/P. Ensure P is in dioptre (it is). f will be in meters.' },
            { text: 'Substitute: f = 1/(-2.5) = -0.4 m.' },
            { text: 'Convert to cm: -0.4 m × 100 = -40 cm. Negative sign indicates concave (diverging) lens.' },
            { text: 'Interpret: Negative power → concave lens → corrects myopia (nearsightedness).', faded: true, blankAnswer: 'f = -40 cm; concave lens; corrects myopia.' }
            ] } },
        { type: 'case', nodeId: 'c10_phy_cbse_04_007', title: 'A real-world call',
          caseStudy: { intro: 'Light-based technologies — lasers, surgery, communications — heal and connect; they also enable precision weapons and surveillance systems.',
            decisions: [{ prompt: 'Should scientists refuse work with dual uses?', options: [
                { text: 'Yes — know your work\'s worst use before you do it', outcome: 'The conscientious answer; but almost no field is single-use — refusal mainly removes conscientious people from the work.' },
                { text: 'No — you can\'t control applications from the lab', outcome: 'The purist answer; honest about the limits of control, silent about the choice of what to work on.' },
                { text: 'Choose the field, publish openly, fight misuse in the open', outcome: 'The engaged answer — the scientist\'s real leverage is in what they choose to pursue and what they say about its use.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Checking reflection laws on the back of a shiny steel spoon, a student draws the \'normal\' as a line straight down, perpendicular to the spoon\'s handle axis. Her measured angles of incidence and refusal don\'t match, and she blames the spoon for being curved.',
            decisions: [{ prompt: 'Where is the real error?', options: [
                { text: 'In the normal — on a curved mirror the normal at any point is the line from that point to the mirror\'s centre of curvature, not a fixed vertical. The laws of reflection hold perfectly on curved surfaces point by point: measure the incident and reflected angles against that radial normal and they will be equal.', outcome: 'Curved mirrors follow the same laws as flat ones — the normal just changes direction with the surface, which is exactly what makes concave and convex mirrors focus and spread light.' },
                { text: 'The spoon is at fault — the laws of reflection only work on perfectly flat mirrors, so curved surfaces cannot obey them.', outcome: 'Reflection laws apply to every smooth surface — the mirror\'s curvature only changes where the normal points, not whether angle in equals angle out.', reveals: 'reflection-needs-flat' },
                { text: 'Her normal is right — on any mirror the normal must stay perpendicular to the object\'s longest axis.', outcome: 'The normal is defined by the surface at the point of incidence — for a spherical mirror it always runs through the centre of curvature, not along any external axis.', reveals: 'normal-follows-axis' }
            ] }] } },
        { type: 'case', nodeId: 'c10_phy_cbse_04_011', title: 'You made it',
          caseStudy: { intro: 'Every camera, telescope, microscope and pair of spectacles is one idea: light obeys rules, and rules can be bent into instruments.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_007', difficulty: 'standard',
          question: 'The absolute refractive index of a medium is the ratio of the speed of light.',
          hint: 'Revisit c10_phy_cbse_04_006 (Snell\'s law) and c9_physics_ch2_2 (speed definition).',
          misconception: 'Students believe refractive index is a property of the material alone and forget it depends on the color (wavelength).',
          parts: [
                { id: 'a', prompt: 'What is the absolute refractive index of a medium in which the speed of light is 2.0 × 10⁸ m/s? (Take speed of light in vacuum = 3.0 × 10⁸ m/s)', answer: '1.5 (dimensionless)',
                  options: ['1.5 (dimensionless)', '1.5 m/s'],
                  hint: 'Revisit c10_phy_cbse_04_006 (Snell\'s law) and c9_physics_ch2_2 (speed definition) — practice.',
                  misconception: 'Students believe refractive index is a property of the material alone and forget it depends on the color (wavelength) of light.' },
                { id: 'b', prompt: 'A ray of light passes from medium A (refractive index 1.5) to medium B (refractive index 1.33). Will the ray bend towards the normal or away from the normal?', answer: 'The ray bends away from the normal',
                  options: ['The ray bends away from the normal', 'towards the normal'],
                  hint: 'Revisit c10_phy_cbse_04_006 (Snell\'s law) and c9_physics_ch2_2 (speed definition) — practice.',
                  misconception: 'Students believe refractive index is a property of the material alone and forget it depends on the color (wavelength) of light.' }
          ],
            remediations: { 'refractive-index-is-a-property': { steps: ['Take a prism and shine white light through it in a darkened room.', 'Observe the spectrum on a wall.', 'Ask: "If glass had only one refractive index, why would the colors separate?" Then show a table of refractive indices.', 'Have the student calculate the relative refractive index of violet with respect to red (1.532/1.512 ≈ 1.013) to see the.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe refractive index is a property of the material alone and forget it depends on the color (wavelength).',
          parts: [
                { id: 'a', prompt: 'In an experiment, a student measures the speed of light in a transparent liquid as 2.4 × 10⁸ m/s. She calculates the absolute refractive index as 1.25.', answer: 'The first student (1.25) is correct',
                  options: ['The first student (1.25) is correct', 'refractive index of medium', 'refractive index of vacuum with respect to medium'],
                  hint: 'Revisit c10_phy_cbse_04_006 (Snell\'s law) and c9_physics_ch2_2 (speed definition) — practice.',
                  misconception: 'Students believe refractive index is a property of the material alone and forget it depends on the color (wavelength) of light.' }
          ],
            remediations: { 'refractive-index-is-a-property': { steps: ['Take a prism and shine white light through it in a darkened room.', 'Observe the spectrum on a wall.', 'Ask: "If glass had only one refractive index, why would the colors separate?" Then show a table of refractive indices.', 'Have the student calculate the relative refractive index of violet with respect to red (1.532/1.512 ≈ 1.013) to see the.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_008', difficulty: 'standard',
          question: 'A spherical lens is a transparent medium bounded by two spherical surfaces (or.',
          hint: 'Review refraction through a glass slab (c10_phy_cbse_04_006) and spherical mirror terms.',
          misconception: 'Students often think that the focal length of a lens depends only on its curvature (radius) and not on the refractive.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A spherical lens is a transparent medium bounded by two spherical surfaces (or one',
                  options: ['A spherical lens is a transparent medium bounded by two spherical surfaces (or one', 'The laws of reflection state that: (1) The angle of incidence (∠i) is equal to the angle', 'A spherical mirror is a reflecting surface that forms part of a hollow sphere of glass,', 'Image formation by a concave mirror is the process of locating the position, size, nature'],
                  hint: 'Review refraction through a glass slab (c10_phy_cbse_04_006) and spherical mirror terms.',
                  misconception: 'Students often think that the focal length of a lens depends only on its curvature (radius) and not on the refractive index of the.' }
          ],
            remediations: { 'the-focal-length-of-a': { steps: ['Revisit refraction at a spherical surface (c10_phy_cbse_04_006) — draw ray diagrams for a single convex spherical.', 'Use a physical lens (convex and concave) and a laser pointer to trace rays; observe convergence/divergence.', 'Practice sign convention with a table: list quantities (u, v, f, R, h, h\') and their signs for real/virtual.', 'Solve 5 numerical problems using lens maker\'s formula (for awareness) and sign convention only, checking each sign.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_009', difficulty: 'standard',
          question: 'Image formation by lenses involves tracing the paths of at least two standard.',
          hint: 'If stuck, review the three standard rays in c10_phy_cbse_04_008 and practice drawing them.',
          misconception: 'Students often believe that a concave lens can form a real image if the object is placed very close to the lens.',
          parts: [
                { id: 'a', prompt: 'An object of height 4.0 cm is placed at a distance of 30 cm from a convex lens of focal length 10 cm.', answer: '**Construction steps (scale 1 cm = 5 cm):** 1',
                  options: ['**Construction steps (scale 1 cm = 5 cm):** 1', 'ray through focus'],
                  hint: 'If stuck, review the three standard rays in c10_phy_cbse_04_008 and practice drawing them for.',
                  misconception: 'Students often believe that a concave lens can form a real image if the object is placed very close to the lens (between F and O).' }
          ],
            remediations: { 'a-concave-lens-can-form': { steps: ['Use a laser pointer and a concave lens in a darkened room: shine the laser parallel to the principal axis and observe.', 'Draw the ray diagram for concave lens with object at three positions (at infinity, between infinity and 2F, between 2F.', 'Explicitly trace the backward extensions of refracted rays to show they always meet on the object side.', 'Complete the table in NCERT Activity 10.6 (or similar) for concave lens, writing "virtual, erect, diminished" for every.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_010', difficulty: 'standard',
          question: 'The lens formula relates the object distance (u), image distance (v), and focal.',
          hint: 'If stuck on sign convention, revisit c10_phy_cbse_04_009 ray diagrams and.',
          misconception: 'Students often write the lens formula as 1/f = 1/v + 1/u (mirroring the mirror formula) and use m = -v/u for lenses.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The lens formula relates the object distance (u), image distance (v), and focal length',
                  options: ['The lens formula relates the object distance (u), image distance (v), and focal length', 'The laws of reflection state that: (1) The angle of incidence (∠i) is equal to the angle', 'A spherical mirror is a reflecting surface that forms part of a hollow sphere of glass,', 'Image formation by a concave mirror is the process of locating the position, size, nature'],
                  hint: 'If stuck on sign convention, revisit c10_phy_cbse_04_009 ray diagrams and c8_physics_ch6_10 lens.',
                  misconception: 'Students often write the lens formula as 1/f = 1/v + 1/u (mirroring the mirror formula) and use m = -v/u for lenses.' }
          ],
            remediations: { 'students-often-write-the-lens': { steps: ['Draw a ray diagram for a convex lens with object beyond 2f. Label u (negative, left of lens), v (positive, right.', 'Write the lens formula 1/f = 1/v - 1/u and substitute the signed distances from the diagram.', 'Compare with mirror formula 1/f = 1/v + 1/u — note the minus sign comes from v and u having opposite signs for real.', 'Practice 5 numerical problems where you explicitly write sign conventions first (e.g., "Convex lens: f = +10 cm; Object.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c10_phy_cbse_04_011', difficulty: 'standard',
          question: 'The power of a lens is a measure of its ability to converge or diverge light.',
          hint: 'If stuck, review c10_phy_cbse_04_010 (Lens Formula and Magnification) for focal length.',
          misconception: 'Students often think the power of a combination is the average of individual powers, or they add focal lengths directly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The power of a lens is a measure of its ability to converge or diverge light rays,',
                  options: ['The power of a lens is a measure of its ability to converge or diverge light rays,', 'The laws of reflection state that: (1) The angle of incidence (∠i) is equal to the angle', 'A spherical mirror is a reflecting surface that forms part of a hollow sphere of glass,', 'Image formation by a concave mirror is the process of locating the position, size, nature'],
                  hint: 'If stuck, review c10_phy_cbse_04_010 (Lens Formula and Magnification) for focal length calculations.',
                  misconception: 'Students often think the power of a combination is the average of individual powers, or they add focal lengths directly (f_comb = f₁ + f₂).' }
          ],
            remediations: { 'the-power-of-a-combination': { steps: ['Revisit the definition P = 1/f (f in meters) and do unit conversion drills: 20 cm → 0.20 m → P = 5 D.', 'Use a sign-convention table: Convex → f positive → P positive; Concave → f negative → P negative.', 'Perform a hands-on activity: hold two convex lenses together, focus sunlight on paper, measure combined focal length.', 'Practice prescription reading: write lens type and focal length for -3 D, +1.5 D, -0.75 D.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
