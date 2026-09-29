import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch06_p2: SimDef = {
    id: 'v3_c8_physics_ch06_p2',
    title: 'Light: Mirrors and Lenses · Part 2/2',
    subtitle: 'Your face, flipped and shrunk by a spoon',
    classLevel: 8, subject: 'physics', topic: 'Light: Mirrors and Lenses · Part 2/2',
    chapters: ['c8_physics_ch06'],
    nodeIds: ['c8_physics_ch6_4', 'c8_physics_ch6_5', 'c8_physics_ch6_6', 'c8_physics_ch6_7', 'c8_physics_ch6_8', 'c8_physics_ch6_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a mirror-market investigator', intro: 'A spoon is secretly two mirrors. Learn to tell concave from convex by touch and by image — and never again mix up which surface gets the name.', goal: 'Distinguish concave and convex mirrors as parts of a sphere — the reflecting surface decides the type — and predict their basic image behaviour.' },
    discovery: {
        question: 'One steel spoon, two totally different mirrors: the inside flips your face upside down at arm\'s length, the outside keeps it tiny and upright at every distance. Why?',
        options: ['The inside is a concave mirror (reflecting surface caves in — can invert images); the outside is convex (always upright and shrunk)', 'The spoon is just badly made', 'One side is dirtier than the other', 'Your eyes adjust differently to each side'],
        answer: 'The inside is a concave mirror (reflecting surface caves in — can invert images); the outside is convex (always upright and shrunk)',
        hook: 'Concave vs convex isn\'t about the object\'s shape — it\'s about WHICH surface does the reflecting. A shiny ball silvered on the inside is still a concave mirror, even though the whole thing looks convex.',
    },
    teaching: [
        { title: 'Principal Focus and Focal Length of a Convex Mirror', text: 'The principal focus of a convex mirror is the point on the principal axis where incident rays parallel to the principal axis appear to diverge from after reflection.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch6_4', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Raid the kitchen: use a spoon, a katori and a steel plate to compare plane, concave and convex reflections — close up, far away — and pin down exactly what curvature does to your face.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_physics_ch6_4', title: 'Principal Focus and Focal Length of a Convex Mirror',
          scaffold: { problem: 'A convex mirror used as a security mirror in a shop has a radius of curvature of 4.0 m. Calculate its focal length.',
            steps: [
            { text: 'Identify given quantities: R = +4.0 m (positive because centre of curvature is behind the mirror, opposite to incident.' },
            { text: 'Recall the formula relating focal length and radius of curvature for spherical mirrors: f = R/2.' },
            { text: 'Substitute the value: f = (+4.0 m) / 2.' },
            { text: 'Compute: f = +2.0 m. The positive sign indicates the focus is behind the mirror (virtual focus).' },
            { text: 'Verify: A security mirror needs a wide field of view, which corresponds to a shorter focal length (more curvature).', faded: true, blankAnswer: '+2.0 m' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch6_5', title: 'Image Formation by Concave Mirror: Ray Diagrams',
          scaffold: { problem: 'A student uses a concave mirror of focal length 10 cm in the school lab.',
            steps: [
            { text: 'Identify given quantities with units and what to find. Focal length f = 10 cm → Radius R = 20 cm (C at 20 cm).' },
            { text: 'Set up the diagram geometry. Draw principal axis horizontally. Mark Pole (P) at left.' },
            { text: 'Draw Ray 1 (parallel to axis). From object top, draw a line parallel to principal axis to the mirror curve.' },
            { text: 'Draw Ray 2 (through C). From object top, draw a line passing through C (4 cm mark) to the mirror curve.' },
            { text: 'Locate image. The two reflected rays intersect at a point between C and F.' },
            { text: 'Verify reasonableness. Object beyond C (25 cm > 20 cm) should give image between C and F (10 cm < v < 20 cm), real.', faded: true, blankAnswer: 'Image distance v = 16 cm (real, in front of mirror), Image.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch6_6', title: 'Image Formation by Convex Mirror: Ray Diagrams',
          scaffold: { problem: 'A convex mirror of focal length 10 cm is used as a side-view mirror on a tractor. A tree 3 m tall stands 15 m in front of the mirror.',
            steps: [
            { text: 'Convert given values to scale. Focal length f = 10 cm = 0.1 m → on diagram, F is 0.1 cm behind P.' },
            { text: 'Draw principal axis horizontally. Draw convex mirror as a shallow curve bulging left (towards object).' },
            { text: 'Draw Ray 1 from top of object arrow parallel to principal axis towards mirror.' },
            { text: 'Draw Ray 2 from top of object arrow heading towards C behind the mirror.' },
            { text: 'Extend both reflected rays backwards (dashed lines) behind the mirror.' },
            { text: 'Measure image distance (distance from P to image along axis behind mirror) and image height on diagram.', faded: true, blankAnswer: 'Image distance = 9 cm behind the mirror (virtual). Image.' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch6_7', title: 'Real vs Virtual Images: Properties and Differences',
          caseStudy: { intro: 'Observe a spoon: the inner curved side (concave) shows your upside-down reflection when held far away, but a right-side-up magnified reflection when brought.',
            decisions: [{ prompt: 'State the fundamental difference between a real image and a virtual image in terms of light rays and screen projection.', options: [
                { text: 'A real image is formed by the actual convergence of light rays and can be obtained on a', outcome: 'A real image is formed by the actual convergence of light rays and can be obtained on a screen.' },
                { text: 'virtual images are always smaller', outcome: 'Not quite — Students believe that virtual images are "not real" in the sense of being illusions, and therefore.', reveals: 'virtual-images-are-not-real' },
                { text: 'not real', outcome: 'Not quite — Students believe that virtual images are "not real" in the sense of being illusions, and therefore.', reveals: 'virtual-images-are-not-real' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch6_8', title: 'Uses of Concave Mirrors: Shaving Mirror, Headlight Reflector, Dentist Mirror',
          caseStudy: { intro: 'Begin by asking students to observe a steel spoon: the inner curved surface acts as a concave mirror.',
            decisions: [{ prompt: 'What type of image (real/virtual, erect/inverted, magnified/diminished) is formed by a concave mirror when the object is placed between the.', options: [
                { text: 'Virtual, erect, and magnified', outcome: 'Virtual, erect, and magnified. A wrong answer (e.g., saying real or inverted) reveals the student.' },
                { text: 'real or inverted', outcome: 'Not quite — Students often believe a concave mirror *always* produces a magnified image.', reveals: 'a-concave-mirror-always-produces' },
                { text: 'a concave mirror *always* produces a magnified image', outcome: 'Not quite — Students often believe a concave mirror *always* produces a magnified image.', reveals: 'a-concave-mirror-always-produces' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch6_9', title: 'Uses of Convex Mirrors: Side-View Mirror, Security Mirror',
          caseStudy: { intro: 'Observe a car\'s side-view mirror: notice how it shows a much larger portion of the road behind than a flat mirror of the same size would.',
            decisions: [{ prompt: 'What type of image is always formed by a convex mirror, regardless of where the object is placed?', options: [
                { text: 'A convex mirror always forms a virtual, erect, and diminished image', outcome: 'A convex mirror always forms a virtual, erect, and diminished image.' },
                { text: 'real and inverted', outcome: 'Not quite — Students often think convex mirrors are used in vehicle headlights (like concave mirrors) because.', reveals: 'convex-mirrors-are-used-in' },
                { text: 'magnified', outcome: 'Not quite — Students often think convex mirrors are used in vehicle headlights (like concave mirrors) because.', reveals: 'convex-mirrors-are-used-in' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch6_4', title: 'Use it in the wild',
          caseStudy: { intro: 'Playing with a steel spoon at dinner, Esha sees her face magnified on the inner side but small and upright on the outer side. Her uncle says, \'Same spoon, same curve — the images should match.\'',
            decisions: [{ prompt: 'Why do the two sides of one spoon behave differently?', options: [
                { text: 'Each side acts as a different spherical mirror: the inner, caved-in surface is concave (it can magnify or invert depending on distance) while the outer, bulging surface is convex (always upright and diminished). The mirror type is named by which surface reflects, not by the spoon\'s shape.', outcome: 'This uses the real definition — reflecting surface, not object shape — to explain both images from one piece of steel.' },
                { text: 'The uncle is right — one object means one mirror type, so both sides must be convex since the spoon is curved.', outcome: 'A spherical shell has two faces; \'concave\' and \'convex\' describe which face does the reflecting, so one spoon hosts both mirror types.', reveals: 'one-shape-one-mirror' },
                { text: 'The difference is just dirt or lighting on one side — mirrors of any shape always give identical images.', outcome: 'Curvature direction, not cleanliness, controls the image; concave and convex surfaces bend light oppositely.', reveals: 'image-is-lighting' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch6_9', title: 'You made it',
          caseStudy: { intro: 'Every curved mirror is a slice of a sphere: reflect off the inner surface (concave) or the outer surface (convex). Same sphere, opposite sides, completely different images.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch6_4', difficulty: 'standard',
          question: 'The principal focus of a convex mirror is the point on the principal axis where.',
          hint: 'Review c8_physics_ch6_2 (Parts of a Spherical Mirror) and c7_physics_ch05_006 (Laws.',
          misconception: 'Students often think the principal focus of a convex mirror is a real point in front of the mirror where light actually.',
          parts: [
                { id: 'a', prompt: 'Define the principal focus of a convex mirror and state its position relative to the mirror. What is the SI unit of focal length?', answer: 'The principal focus of a convex mirror is the point on the principal axis from',
                  options: ['The principal focus of a convex mirror is the point on the principal axis from', 'places the focus in front of the mirror reveals confusion with concave mirrors'],
                  hint: 'Review c8_physics_ch6_2 (Parts of a Spherical Mirror) and c7_physics_ch05_006 (Laws of Reflection).',
                  misconception: 'Students often think the principal focus of a convex mirror is a real point in front of the mirror where light actually converges, just.' }
          ],
            remediations: { 'the-principal-focus-of-a': { steps: ['Use a shiny stainless steel bowl (convex surface) and a laser pointer in a darkened room.', 'Shine the laser parallel to the principal axis; mark the incident and reflected ray directions on paper.', 'Extend the reflected ray backward with a dashed line behind the bowl — the intersection is the virtual focus.', 'Repeat for 3-4 parallel rays; all extensions meet at the same point behind the mirror.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch6_5', difficulty: 'standard',
          question: 'Image formation by a concave mirror is the process of locating the position.',
          hint: 'If stuck, review c8_physics_ch6_3 (Principal Focus and Focal Length of a Concave Mirror).',
          misconception: 'Students often believe that a concave mirror *always* forms a real, inverted image because they associate "concave".',
          parts: [
                { id: 'a', prompt: 'State the two principal rays used to draw ray diagrams for a concave mirror and describe the path of each ray after reflection.', answer: 'The two principal rays are: (1) A ray incident parallel to the principal axis',
                  options: ['The two principal rays are: (1) A ray incident parallel to the principal axis', 'concave', 'converging', 'convergence always means a real image on a screen'],
                  hint: 'If stuck, review c8_physics_ch6_3 (Principal Focus and Focal Length of a Concave Mirror).',
                  misconception: 'Students often believe that a concave mirror *always* forms a real, inverted image because they associate "concave" with "converging" and.' },
                { id: 'b', prompt: 'An object is placed exactly at the centre of curvature (C) of a concave mirror.', answer: 'Ray 1 from the object top goes parallel to the axis, reflects through F',
                  options: ['Ray 1 from the object top goes parallel to the axis, reflects through F', 'parallel ray reflects through F', 'concave', 'converging'],
                  hint: 'If stuck, review c8_physics_ch6_3 (Principal Focus and Focal Length of a Concave Mirror).',
                  misconception: 'Students often believe that a concave mirror *always* forms a real, inverted image because they associate "concave" with "converging" and.' },
                { id: 'c', prompt: 'Draw a ray diagram (using a scale of 1 cm = 2 cm) for a concave mirror of focal length 6 cm when an object of height 4 cm is placed 16 cm from the pole.', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'concave', 'converging', 'convergence always means a real image on a screen'],
                  hint: 'If stuck, review c8_physics_ch6_3 (Principal Focus and Focal Length of a Concave Mirror).',
                  misconception: 'Students often believe that a concave mirror *always* forms a real, inverted image because they associate "concave" with "converging" and.' }
          ],
            remediations: { 'a-concave-mirror-always-forms': { steps: ['Take a concave mirror (spoon inner side) and hold it close to your face (object between F and P).', 'Observe your erect, magnified image—this is virtual, not on a screen.', 'Now hold the spoon at arm\'s length (object beyond C).', 'Observe a tiny, inverted image—this is real.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch6_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that a concave mirror *always* forms a real, inverted image because they associate "concave".',
          parts: [
                { id: 'a', prompt: 'Design a simple activity using a concave mirror (like a shaving mirror or a spoon), a candle, and a white screen (paper/cardboard) to demonstrate the.', answer: '**Procedure:** Fix the concave mirror on a stand',
                  options: ['**Procedure:** Fix the concave mirror on a stand', 'the image disappears at F', 'concave', 'converging'],
                  hint: 'If stuck, review c8_physics_ch6_3 (Principal Focus and Focal Length of a Concave Mirror).',
                  misconception: 'Students often believe that a concave mirror *always* forms a real, inverted image because they associate "concave" with "converging" and.' }
          ],
            remediations: { 'a-concave-mirror-always-forms': { steps: ['Take a concave mirror (spoon inner side) and hold it close to your face (object between F and P).', 'Observe your erect, magnified image—this is virtual, not on a screen.', 'Now hold the spoon at arm\'s length (object beyond C).', 'Observe a tiny, inverted image—this is real.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch6_6', difficulty: 'standard',
          question: 'Image formation by a convex mirror is the process of locating the virtual.',
          hint: 'If stuck, revisit c8_physics_ch6_4 (Principal Focus and Focal Length of a Convex Mirror).',
          misconception: 'Students often think the focal point (F) and centre of curvature (C) of a convex mirror are in front of the mirror.',
          parts: [
                { id: 'a', prompt: 'What are the two principal rays used to draw a ray diagram for a convex mirror, and how does each ray behave after reflection?', answer: 'Ray 1: Incident parallel to the principal axis',
                  options: ['Ray 1: Incident parallel to the principal axis', 'F is halfway between P and C', 'Ray 2 passes through F after reflection'],
                  hint: 'If stuck, revisit c8_physics_ch6_4 (Principal Focus and Focal Length of a Convex Mirror).',
                  misconception: 'Students often think the focal point (F) and centre of curvature (C) of a convex mirror are in front of the mirror (like a concave mirror).' },
                { id: 'b', prompt: 'An object of height 4 cm is placed 20 cm in front of a convex mirror of focal length 15 cm.', answer: 'Draw principal axis, mirror (curved outward), mark P',
                  options: ['Draw principal axis, mirror (curved outward), mark P', 'F is halfway between P and C'],
                  hint: 'If stuck, revisit c8_physics_ch6_4 (Principal Focus and Focal Length of a Convex Mirror).',
                  misconception: 'Students often think the focal point (F) and centre of curvature (C) of a convex mirror are in front of the mirror (like a concave mirror).' },
                { id: 'c', prompt: 'Compare the ray diagrams for a convex mirror and a concave mirror when the object is placed at infinity. How do the image positions and natures differ?', answer: 'For convex mirror: Rays from infinity are parallel',
                  options: ['For convex mirror: Rays from infinity are parallel', 'F is halfway between P and C'],
                  hint: 'If stuck, revisit c8_physics_ch6_4 (Principal Focus and Focal Length of a Convex Mirror).',
                  misconception: 'Students often think the focal point (F) and centre of curvature (C) of a convex mirror are in front of the mirror (like a concave mirror).' }
          ],
            remediations: { 'the-focal-point-f-and': { steps: ['Take a stainless steel spoon.', 'Look at the back (convex side).', 'See your erect, small image.', 'Trace the spoon\'s curve on paper.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch6_7', difficulty: 'standard',
          question: 'A real image is formed when light rays actually converge at a point after.',
          hint: 'Review the ray diagram rules for concave mirror (c8_physics_ch6_5) and convex mirror.',
          misconception: 'Students believe that virtual images are "not real" in the sense of being illusions, and therefore cannot.',
          parts: [
                { id: 'a', prompt: 'An object is placed 20 cm in front of a concave mirror of focal length 15 cm. Without drawing a ray diagram, determine whether the image is real or virtual.', answer: 'Given: f = 15 cm, u = 20 cm (object distance)',
                  options: ['Given: f = 15 cm, u = 20 cm (object distance)', 'not real'],
                  hint: 'Review the ray diagram rules for concave mirror (c8_physics_ch6_5) and convex mirror.',
                  misconception: 'Students believe that virtual images are "not real" in the sense of being illusions, and therefore cannot be photographed or seen.' },
                { id: 'b', prompt: 'Compare the image formed by a concave mirror when the object is at the centre of curvature (C) versus when the object is between the pole (P) and focus (F).', answer: 'At C: image at C, real, inverted, same size',
                  options: ['At C: image at C, real, inverted, same size', 'not real'],
                  hint: 'Review the ray diagram rules for concave mirror (c8_physics_ch6_5) and convex mirror.',
                  misconception: 'Students believe that virtual images are "not real" in the sense of being illusions, and therefore cannot be photographed or seen.' }
          ],
            remediations: { 'virtual-images-are-not-real': { steps: ['Use a concave mirror to form a real image of a distant window on a wall (screen).', 'Let students touch the image on the wall.', 'Then have them look into the same mirror from close up (object between P and F) — they see an erect magnified image but.', 'Explicitly contrast: "You can touch the first image on the wall; the second image exists only in the mirror." 4.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch6_8', difficulty: 'standard',
          question: 'Concave mirrors are converging mirrors that produce magnified, erect, virtual.',
          hint: 'Revisit c8_physics_ch6_5 (Image Formation by Concave Mirror: Ray Diagrams) and practice.',
          misconception: 'Students often believe a concave mirror *always* produces a magnified image.',
          parts: [
                { id: 'a', prompt: 'What type of image (real/virtual, erect/inverted, magnified/diminished) is formed by a concave mirror when the object is placed between the pole and the focus?', answer: 'Virtual, erect, and magnified',
                  options: ['Virtual, erect, and magnified', 'real or inverted', 'a concave mirror *always* produces a magnified image'],
                  hint: 'Revisit c8_physics_ch6_5 (Image Formation by Concave Mirror: Ray Diagrams) and practice drawing the.',
                  misconception: 'Students often believe a concave mirror *always* produces a magnified image.' },
                { id: 'b', prompt: 'In a car headlight, the bulb is placed at the focus of the concave reflector.', answer: 'The reflected beam will diverge (spread out) instead of being parallel',
                  options: ['The reflected beam will diverge (spread out) instead of being parallel', 'beam becomes more parallel', 'a concave mirror *always* produces a magnified image'],
                  hint: 'Revisit c8_physics_ch6_5 (Image Formation by Concave Mirror: Ray Diagrams) and practice drawing the.',
                  misconception: 'Students often believe a concave mirror *always* produces a magnified image.' }
          ],
            remediations: { 'a-concave-mirror-always-produces': { steps: ['Have the student perform the spoon experiment systematically: (1) Bring spoon from arm\'s length to eye, noting image.', '(2) Mark the approximate focal point by finding where a distant window forms a sharp image on paper.', '(3) Place a phone flashlight at that spot and observe the beam on a wall 3 m away.', '(4) Record observations in a table: Object distance, Image nature, Size, Use case.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch6_9', difficulty: 'standard',
          question: 'Convex mirrors are spherical mirrors with reflecting surfaces curved outward.',
          hint: 'Revisit c8_physics_ch6_6 (Image Formation by Convex Mirror: Ray Diagrams) and.',
          misconception: 'Students often think convex mirrors are used in vehicle headlights (like concave mirrors) because both are "curved.',
          parts: [
                { id: 'a', prompt: 'What type of image is always formed by a convex mirror, regardless of where the object is placed?', answer: 'A convex mirror always forms a virtual, erect, and diminished image',
                  options: ['A convex mirror always forms a virtual, erect, and diminished image', 'real and inverted', 'magnified', 'curved mirrors'],
                  hint: 'Revisit c8_physics_ch6_6 (Image Formation by Convex Mirror: Ray Diagrams) and c8_physics_ch6_7.',
                  misconception: 'Students often think convex mirrors are used in vehicle headlights (like concave mirrors) because both are "curved mirrors." They confuse.' },
                { id: 'b', prompt: 'A bus driver looks into a convex side-view mirror of focal length 0.6 m. A cyclist is 12 m behind the bus.', answer: 'Image position: between pole and focus (i.e., < 0.6 m behind mirror)',
                  options: ['Image position: between pole and focus (i.e., < 0.6 m behind mirror)', 'curved mirrors'],
                  hint: 'Revisit c8_physics_ch6_6 (Image Formation by Convex Mirror: Ray Diagrams) and c8_physics_ch6_7.',
                  misconception: 'Students often think convex mirrors are used in vehicle headlights (like concave mirrors) because both are "curved mirrors." They confuse.' },
                { id: 'c', prompt: 'Compare the field of view provided by a convex side-view mirror and a plane mirror of identical dimensions mounted on a car.', answer: 'The convex mirror shows more traffic',
                  options: ['The convex mirror shows more traffic', 'it doesn\'t shrink things', 'curved mirrors'],
                  hint: 'Revisit c8_physics_ch6_6 (Image Formation by Convex Mirror: Ray Diagrams) and c8_physics_ch6_7.',
                  misconception: 'Students often think convex mirrors are used in vehicle headlights (like concave mirrors) because both are "curved mirrors." They confuse.' }
          ],
            remediations: { 'convex-mirrors-are-used-in': { steps: ['Take a stainless steel spoon: observe your face in the concave side (magnified, inverted when far) and the convex side.', 'Then shine a torch into each side in a dark room: the concave side focuses light into a bright spot (like a headlight).', 'This direct comparison of the two curvatures corrects the confusion.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
