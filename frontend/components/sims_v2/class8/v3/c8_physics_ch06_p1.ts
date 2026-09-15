import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch06_p1: SimDef = {
    id: 'v3_c8_physics_ch06_p1',
    title: 'Light: Mirrors and Lenses · Part 1/2',
    subtitle: 'Your face, flipped and shrunk by a spoon',
    classLevel: 8, subject: 'physics', topic: 'Light: Mirrors and Lenses · Part 1/2',
    chapters: ['c8_physics_ch06'],
    nodeIds: ['c8_physics_ch6_1', 'c8_physics_ch6_10', 'c8_physics_ch6_11', 'c8_physics_ch6_12', 'c8_physics_ch6_2', 'c8_physics_ch6_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a mirror-market investigator', intro: 'A spoon is secretly two mirrors. Learn to tell concave from convex by touch and by image — and never again mix up which surface gets the name.', goal: 'Distinguish concave and convex mirrors as parts of a sphere — the reflecting surface decides the type — and predict their basic image behaviour.' },
    discovery: {
        question: 'One steel spoon, two totally different mirrors: the inside flips your face upside down at arm\'s length, the outside keeps it tiny and upright at every distance. Why?',
        options: ['The inside is a concave mirror (reflecting surface caves in — can invert images); the outside is convex (always upright and shrunk)', 'The spoon is just badly made', 'One side is dirtier than the other', 'Your eyes adjust differently to each side'],
        answer: 'The inside is a concave mirror (reflecting surface caves in — can invert images); the outside is convex (always upright and shrunk)',
        hook: 'Concave vs convex isn\'t about the object\'s shape — it\'s about WHICH surface does the reflecting. A shiny ball silvered on the inside is still a concave mirror, even though the whole thing looks convex.',
    },
    teaching: [
        { title: 'Spherical Mirrors: Concave and Convex - Definition', text: 'A spherical mirror is a reflecting surface that forms a part of a hollow sphere; if the inner (concave) surface is polished and reflects light, it is a concave mirror, and if the outer (convex).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch6_1', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Raid the kitchen: use a spoon, a katori and a steel plate to compare plane, concave and convex reflections — close up, far away — and pin down exactly what curvature does to your face.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch6_1', title: 'Spherical Mirrors: Concave and Convex - Definition',
          caseStudy: { intro: 'Take a stainless steel spoon from the kitchen and look at your face in the inner curved side — you see a magnified, upright image when close, but an inverted.',
            decisions: [{ prompt: 'What is the fundamental difference between a concave mirror and a convex mirror in terms of which spherical surface acts as the reflecting.', options: [
                { text: 'A concave mirror has the inner surface of the sphere as the reflecting surface (caves', outcome: 'A concave mirror has the inner surface of the sphere as the reflecting surface (caves in), while.' },
                { text: 'concave', outcome: 'Not quite — Students believe the name "concave" or "convex" describes the overall shape of the mirror object.', reveals: 'the-name-concave-or-convex' },
                { text: 'convex', outcome: 'Not quite — Students believe the name "concave" or "convex" describes the overall shape of the mirror object.', reveals: 'the-name-concave-or-convex' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch6_10', title: 'Lenses: Convex (Converging) and Concave (Diverging)',
          caseStudy: { intro: 'Hold a magnifying glass (convex lens) in sunlight and observe the bright spot it forms on paper – that spot is where parallel sun rays converge.',
            decisions: [{ prompt: 'A student picks up a lens and notices it is thicker at the middle than at the edges.', options: [
                { text: 'It is a convex (converging) lens', outcome: 'It is a convex (converging) lens; it converges parallel rays to a real point on the principal axis.' },
                { text: 'thicker at centre', outcome: 'Not quite — Students often think a concave lens "always forms a virtual image" is its defining property, but.', reveals: 'a-concave-lens-always-forms' },
                { text: 'converging', outcome: 'Not quite — Students often think a concave lens "always forms a virtual image" is its defining property, but.', reveals: 'a-concave-lens-always-forms' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch6_11', title: 'Image Formation by Convex Lens: Ray Diagrams',
          scaffold: { problem: 'A 5 cm tall object is placed 40 cm from a convex lens of focal length 15 cm.',
            steps: [
            { text: 'Convert given values to diagram scale: Object distance u = 40 cm → 8 cm on paper.' },
            { text: 'Draw principal axis horizontally. Draw a vertical line for the lens at centre. Mark O (optical centre).' },
            { text: 'Place object arrow (1 cm tall) upright on left side at 8 cm from lens (beyond 2F₁ which is at 6 cm).' },
            { text: 'Draw Ray 1: From object tip, parallel to axis → after lens, passes through F₂.' },
            { text: 'Measure image distance from lens to intersection: ~3.4 cm on paper → 3.4 × 5 = 17 cm actual.', faded: true, blankAnswer: 'Image distance = 17 cm (on opposite side), Image height.' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch6_12', title: 'Image Formation by Concave Lens: Ray Diagrams',
          caseStudy: { intro: 'Observe how a peephole in a door (a concave lens) makes people outside appear smaller and upright – this is a real-world example of a diverging lens forming.',
            decisions: [{ prompt: 'State the nature (real/virtual, erect/inverted, magnified/diminished) of the image formed by a concave lens when the object is placed.', options: [
                { text: 'The image is virtual, erect, and highly diminished (point-sized) formed at the focus on', outcome: 'The image is virtual, erect, and highly diminished (point-sized) formed at the focus on the same.' },
                { text: 'closer object', outcome: 'Not quite — Students often think a concave lens can form a real image if the object is placed very close to the.', reveals: 'a-concave-lens-can-form' },
                { text: 'magnified virtual image', outcome: 'Not quite — Students often think a concave lens can form a real image if the object is placed very close to the.', reveals: 'a-concave-lens-can-form' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch6_2', title: 'Parts of a Spherical Mirror: Pole, Centre of Curvature, Radius',
          scaffold: { problem: 'A concave mirror used in a solar cooker has a radius of curvature of 40 cm. The diameter of its reflecting surface (aperture) is 12 cm.',
            steps: [
            { text: 'Identify given quantities: R = 40 cm (radius of curvature), aperture = 12 cm (diameter of reflecting surface).' },
            { text: 'Recall definition: Radius of curvature R = distance PC between pole and centre of curvature. So PC = R = 40 cm.' },
            { text: 'The mirror\'s edge is at the rim of the aperture. The distance from pole to rim along the mirror surface is not along.' },
            { text: 'Compare PC = 40 cm with aperture radius = 6 cm. Since 40 cm > 6 cm, the centre of curvature is far outside the physical.' },
            { text: 'Verify: For a typical solar cooker mirror, R is much larger than aperture, so C is well outside the mirror.', faded: true, blankAnswer: '(a) PC = 40 cm (b) The mirror\'s edge lies in a plane.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch6_3', title: 'Principal Focus and Focal Length of a Concave Mirror',
          scaffold: { problem: 'A concave mirror in a dentist\'s clinic has a focal length of -12 cm. What is its radius of curvature?',
            steps: [
            { text: 'Identify given: f = -12 cm = -0.12 m (negative for concave mirror). Find: R (radius of curvature) in metres.' },
            { text: 'Recall formula relating f and R: f = R/2. Rearrange: R = 2f.' },
            { text: 'Substitute f with units: R = 2 × (-0.12 m) = -0.24 m.' },
            { text: 'Check unit cancellation: 2 (dimensionless) × m = m. Sign: negative, consistent with concave mirror (centre of curvature.' },
            { text: 'Verify reasonableness: A dentist\'s mirror typically has a focal length of 10-15 cm, so R = 24 cm is plausible.', faded: true, blankAnswer: 'R = -0.24 m' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch6_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Playing with a steel spoon at dinner, Esha sees her face magnified on the inner side but small and upright on the outer side. Her uncle says, \'Same spoon, same curve — the images should match.\'',
            decisions: [{ prompt: 'Why do the two sides of one spoon behave differently?', options: [
                { text: 'Each side acts as a different spherical mirror: the inner, caved-in surface is concave (it can magnify or invert depending on distance) while the outer, bulging surface is convex (always upright and diminished). The mirror type is named by which surface reflects, not by the spoon\'s shape.', outcome: 'This uses the real definition — reflecting surface, not object shape — to explain both images from one piece of steel.' },
                { text: 'The uncle is right — one object means one mirror type, so both sides must be convex since the spoon is curved.', outcome: 'A spherical shell has two faces; \'concave\' and \'convex\' describe which face does the reflecting, so one spoon hosts both mirror types.', reveals: 'one-shape-one-mirror' },
                { text: 'The difference is just dirt or lighting on one side — mirrors of any shape always give identical images.', outcome: 'Curvature direction, not cleanliness, controls the image; concave and convex surfaces bend light oppositely.', reveals: 'image-is-lighting' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch6_3', title: 'The bigger picture',
          caseStudy: { intro: 'Every curved mirror is a slice of a sphere: reflect off the inner surface (concave) or the outer surface (convex). Same sphere, opposite sides, completely different images.',
            decisions: [{ prompt: 'What comes next? Light: Mirrors and Lenses · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Light: Mirrors and Lenses · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch6_1', difficulty: 'standard',
          question: 'A spherical mirror is a reflecting surface that forms a part of a hollow.',
          hint: 'If stuck, revisit "Light Travels in Straight Lines" (c6_physics_ch11_036) and "Images.',
          misconception: 'Students believe the name "concave" or "convex" describes the overall shape of the mirror object (e.g., the glass.',
          parts: [
                { id: 'a', prompt: 'Why does a stainless steel spoon show an inverted image on one side when held at arm\'s length but an upright image on the other side at the same distance?', answer: 'The inner side of the spoon is a concave mirror',
                  options: ['The inner side of the spoon is a concave mirror', 'concave', 'convex', 'both sides should behave similarly'],
                  hint: 'If stuck, revisit "Light Travels in Straight Lines" (c6_physics_ch11_036) and "Images Formed in.',
                  misconception: 'Students believe the name "concave" or "convex" describes the overall shape of the mirror object (e.g., the glass bulges out, so it\'s.' },
                { id: 'b', prompt: 'A student says: "A concave mirror is just a piece of a sphere, so any spherical piece of glass with a shiny coating is a concave mirror." Is this statement.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'concave', 'convex'],
                  hint: 'If stuck, revisit "Light Travels in Straight Lines" (c6_physics_ch11_036) and "Images Formed in.',
                  misconception: 'Students believe the name "concave" or "convex" describes the overall shape of the mirror object (e.g., the glass bulges out, so it\'s.' },
                { id: 'c', prompt: 'Compare the reflecting surfaces of a concave mirror, a convex mirror, and a plane mirror. What geometric property distinguishes all three?', answer: 'A plane mirror has a flat (zero curvature) reflecting surface',
                  options: ['A plane mirror has a flat (zero curvature) reflecting surface', 'concave', 'convex'],
                  hint: 'If stuck, revisit "Light Travels in Straight Lines" (c6_physics_ch11_036) and "Images Formed in.',
                  misconception: 'Students believe the name "concave" or "convex" describes the overall shape of the mirror object (e.g., the glass bulges out, so it\'s.' }
          ],
            remediations: { 'the-name-concave-or-convex': { steps: ['Give the student a stainless steel spoon and a shiny steel bowl.', 'Ask them to touch the reflecting side of each with a finger — inner side of spoon, outer side of bowl.', 'Have them say aloud: "This surface caves in — concave mirror" or "This surface bulges out — convex mirror."', 'Repeat with a silvered glass ball (if available) silvered on the inside — guide them to touch the inner surface and.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch6_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the name "concave" or "convex" describes the overall shape of the mirror object (e.g., the glass.',
          parts: [
                { id: 'a', prompt: 'A teacher shows a spherical glass shell silvered on the inside and asks: "Is this a concave or convex mirror?" The student replies: "It\'s convex because the.', answer: 'The response is incorrect',
                  options: ['The response is incorrect', 'concave', 'convex'],
                  hint: 'If stuck, revisit "Light Travels in Straight Lines" (c6_physics_ch11_036) and "Images Formed in.',
                  misconception: 'Students believe the name "concave" or "convex" describes the overall shape of the mirror object (e.g., the glass bulges out, so it\'s.' },
                { id: 'b', prompt: 'Design a simple activity using household items to demonstrate the difference between concave and convex mirrors to a Class 6 student.', answer: 'Items: a stainless steel spoon, a shiny steel bowl (katori), a flat steel plate',
                  options: ['Items: a stainless steel spoon, a shiny steel bowl (katori), a flat steel plate', 'concave', 'convex'],
                  hint: 'If stuck, revisit "Light Travels in Straight Lines" (c6_physics_ch11_036) and "Images Formed in.',
                  misconception: 'Students believe the name "concave" or "convex" describes the overall shape of the mirror object (e.g., the glass bulges out, so it\'s.' }
          ],
            remediations: { 'the-name-concave-or-convex': { steps: ['Give the student a stainless steel spoon and a shiny steel bowl.', 'Ask them to touch the reflecting side of each with a finger — inner side of spoon, outer side of bowl.', 'Have them say aloud: "This surface caves in — concave mirror" or "This surface bulges out — convex mirror."', 'Repeat with a silvered glass ball (if available) silvered on the inside — guide them to touch the inner surface and.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch6_10', difficulty: 'standard',
          question: 'A lens is a transparent optical medium bounded by two spherical surfaces (or.',
          hint: 'Review the refraction activities from Class 7 (e.g., pencil in water, coin in bowl) and.',
          misconception: 'Students often think a concave lens "always forms a virtual image" is its defining property, but they confuse this with.',
          parts: [
                { id: 'a', prompt: 'A student picks up a lens and notices it is thicker at the middle than at the edges.', answer: 'It is a convex (converging) lens',
                  options: ['It is a convex (converging) lens', 'thicker at centre', 'converging', 'always forms a virtual image'],
                  hint: 'Review the refraction activities from Class 7 (e.g., pencil in water, coin in bowl) and the concept.',
                  misconception: 'Students often think a concave lens "always forms a virtual image" is its defining property, but they confuse this with the fact that.' }
          ],
            remediations: { 'a-concave-lens-always-forms': { steps: ['If a student confuses lens and mirror focal-length relationships, do this: (1) Take a convex lens and a concave mirror.', '(2) Focus sunlight with each onto paper; measure both focal lengths.', '(3) Notice they are not simply R/2.', '(4) Then draw ray diagrams for a single spherical refracting surface to show bending depends on refractive index.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch6_11', difficulty: 'standard',
          question: 'Image formation by a convex lens is the process of tracing at least two.',
          hint: 'Review the three principal rays for concave mirror (c8_physics_ch6_5) and note the.',
          misconception: 'Students think the ray through the optical centre always passes straight without any lateral shift, even for thick.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Image formation by a convex lens is the process of tracing at least two of three',
                  options: ['Image formation by a convex lens is the process of tracing at least two of three', 'A spherical mirror is a reflecting surface that forms a part of a hollow sphere', 'A lens is a transparent optical medium bounded by two spherical surfaces (or one', 'A concave lens is a diverging lens that causes parallel incident rays to spread out as if'],
                  hint: 'Review the three principal rays for concave mirror (c8_physics_ch6_5) and note the analogy: mirror.',
                  misconception: 'Students think the ray through the optical centre always passes straight without any lateral shift, even for thick lenses.' }
          ],
            remediations: { 'the-ray-through-the-optical': { steps: ['Take a thick magnifying glass and a thin spectacle lens.', 'Shine a laser pointer through the centre of each onto a wall.', 'Mark the incident and emergent ray positions.', 'For the thin lens, the shift is barely measurable; for the thick lens, a clear lateral shift appears.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch6_12', difficulty: 'standard',
          question: 'A concave lens is a diverging lens that causes parallel incident rays to spread.',
          hint: 'Review c7_physics_ch05_003 (Light Travels in a Straight Line) and c7_physics_ch05_011.',
          misconception: 'Students often think a concave lens can form a real image if the object is placed very close to the lens, because they.',
          parts: [
                { id: 'a', prompt: 'Explain why a concave lens always forms a virtual image, using the behaviour of the three principal rays.', answer: 'A concave lens diverges incident rays',
                  options: ['A concave lens diverges incident rays', 'closer object', 'magnified virtual image'],
                  hint: 'Review c7_physics_ch05_003 (Light Travels in a Straight Line) and c7_physics_ch05_011 (Real and.',
                  misconception: 'Students often think a concave lens can form a real image if the object is placed very close to the lens, because they confuse "closer.' }
          ],
            remediations: { 'a-concave-lens-can-form': { steps: ['If the student draws the central ray bending, have them place a concave lens on a printed grid and shine a laser.', 'Then, use a ray box to trace the three principal rays on paper, emphasizing that only the central ray goes straight.', 'Finally, ask them to extend the diverging rays backward with a dashed line to locate the virtual image.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch6_2', difficulty: 'standard',
          question: 'The pole (P) is the geometric centre of the spherical mirror\'s reflecting.',
          hint: 'Revisit "Parts of a circle/sphere" from Class 6-7 Mathematics (centre, radius, diameter.',
          misconception: 'Students think the centre of curvature (C) is the same as the pole (P) because both are described as "centre" points.',
          parts: [
                { id: 'a', prompt: 'A student draws a concave mirror and marks the centre of curvature (C) on the reflecting surface itself.', answer: 'A spherical mirror is a part of a hollow sphere',
                  options: ['A spherical mirror is a part of a hollow sphere', 'centre', '"centre" means the middle of the mirror\'s physical area'],
                  hint: 'Revisit "Parts of a circle/sphere" from Class 6-7 Mathematics (centre, radius, diameter, chord) and.',
                  misconception: 'Students think the centre of curvature (C) is the same as the pole (P) because both are described as "centre" points.' },
                { id: 'b', prompt: 'The radius of curvature of a concave mirror is 30 cm. What is the distance between the pole and the centre of curvature?', answer: 'Distance PC = R = 30 cm',
                  options: ['Distance PC = R = 30 cm', 'centre'],
                  hint: 'Revisit "Parts of a circle/sphere" from Class 6-7 Mathematics (centre, radius, diameter, chord) and.',
                  misconception: 'Students think the centre of curvature (C) is the same as the pole (P) because both are described as "centre" points.' },
                { id: 'c', prompt: 'Two spherical mirrors have the same radius of curvature (20 cm). Mirror A is concave, Mirror B is convex.', answer: 'For Mirror A (concave): C is 20 cm in front of the pole, on the same side as the',
                  options: ['For Mirror A (concave): C is 20 cm in front of the pole, on the same side as the', 'centre'],
                  hint: 'Revisit "Parts of a circle/sphere" from Class 6-7 Mathematics (centre, radius, diameter, chord) and.',
                  misconception: 'Students think the centre of curvature (C) is the same as the pole (P) because both are described as "centre" points.' }
          ],
            remediations: { 'the-centre-of-curvature-c': { steps: ['Take a spherical ball (cricket ball) and cut a small cap from it - this cap is a spherical mirror.', 'The centre of the original ball is C. The centre of the cap\'s flat circular edge is P.', 'Measure distance from P to C - this is R.', 'Compare with radius of the cap\'s edge (aperture/2).'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch6_3', difficulty: 'standard',
          question: 'The principal focus (F) of a concave mirror is the point on the principal axis.',
          hint: 'Review "Parts of a Spherical Mirror" (c8_physics_ch6_2) to recall definitions of pole.',
          misconception: 'Students often think the principal focus is a physical "hole" or "spot" on the mirror surface where light enters.',
          parts: [
                { id: 'a', prompt: 'Two concave mirrors A and B have the same aperture but mirror A has a radius of curvature of 30 cm while mirror B has a radius of curvature of 60 cm.', answer: 'Mirror A: f_A = -15 cm',
                  options: ['Mirror A: f_A = -15 cm', 'more curved', 'both give same spot size or B is better'],
                  hint: 'Review "Parts of a Spherical Mirror" (c8_physics_ch6_2) to recall definitions of pole, centre.',
                  misconception: 'Students often think the principal focus is a physical "hole" or "spot" on the mirror surface where light enters, rather than a point.' }
          ],
            remediations: { 'the-principal-focus-is-a': { steps: ['To correct the "focus on the mirror" misconception: (1) Take a concave mirror and a laser pointer.', '(2) Shine the laser parallel to the principal axis from different heights and mark where the reflected dot hits.', '(3) Students will see the dots converge at one point in air, not on the mirror.', '(4) Then cover half the mirror with tape and repeat — the convergence point stays the same, only the brightness changes.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
