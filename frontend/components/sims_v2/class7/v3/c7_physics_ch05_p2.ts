import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch05_p2: SimDef = {
    id: 'v3_c7_physics_ch05_p2',
    title: 'Light: Shadows and Reflections · Part 2/2',
    subtitle: 'Covers the properties of images formed by single flat (plane) mirrors in air, including.',
    classLevel: 7, subject: 'physics', topic: 'Light: Shadows and Reflections · Part 2/2',
    chapters: ['c7_physics_ch05'],
    nodeIds: ['c7_physics_ch05_007', 'c7_physics_ch05_008', 'c7_physics_ch05_009', 'c7_physics_ch05_010', 'c7_physics_ch05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Stand in front of the large mirror in your dressing room or look into your bathroom glass while brushing your.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A garden lamp soaks up sunshine all day and glows through the night on stored power. Natural light source or artificial — which team does it belong to?',
        options: ['A hybrid — the energy comes naturally from the Sun, but the LED that actually emits the light is human-made', 'Purely natural — sunlight powers it end to end', 'Purely artificial — it glows at night like a torch', 'Neither — stored light belongs to no category'],
        answer: 'A hybrid — the energy comes naturally from the Sun, but the LED that actually emits the light is human-made',
        hook: 'The real test of a light source is emission, not glow. The Moon shines by borrowing sunlight — it reflects, never produces. A firefly, glowing by its own chemistry, is a truer source than the whole Moon.',
    },
    teaching: [
        { title: 'Images Formed in a Plane Mirror: Properties', text: 'The image formed by a plane mirror is virtual, erect, of the exact same size as the object, located as far behind the mirror as the object is in front of it, and laterally inverted.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch05_007', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Sort the night sky and your house — Sun, Moon, stars, firefly, candle, LED, neon sign — into emitters and borrowers, natural and artificial, and defend each call.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_007', title: 'Images Formed in a Plane Mirror: Properties',
          scaffold: { problem: 'A science student places a glowing LED bulb 25 cm in front of a flat plane mirror in a physics lab in Delhi.',
            steps: [
            { text: 'Identify given values: object distance ($d_o$) = 25 cm. Identify what to find: image distance ($d_i$) and total.' },
            { text: 'Recall the plane mirror property formula relating object distance and image distance: $d_i = d_o$.' },
            { text: 'Substitute the given object distance into the property equation: $d_i = 25\\text{ cm}$.' },
            { text: 'Compute the total distance between object and image by adding object distance and image distance: $D_{total} = d_o.' },
            { text: 'Final calculation: $D_{total} = 50\\text{ cm}$. Verify that 50 cm is physically reasonable for a table-top lab setup.', faded: true, blankAnswer: 'Image distance = 25 cm; Total distance between object and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_008', title: 'Pinhole Camera: Principle and Construction',
          scaffold: { problem: 'A school flag pole of height 12 m stands at a distance of 60 m from a large pinhole camera box.',
            steps: [
            { text: 'Identify given values: Object height $h_o = 12\\text{ m}$, object distance $u = 60\\text{ m}$, image distance $v.' },
            { text: 'Identify the pinhole camera similarity formula: $\\frac{h_i}{h_o} = \\frac{v}{u}$.' },
            { text: 'Substitute known values with units into the formula: $\\frac{h_i}{1200\\text{ cm}} = \\frac{0.5\\text{ m}}{60\\text{ m}}$.' },
            { text: 'Compute and track unit cancellation: Note that meters cancel out in $\\frac{0.5\\text{ m}}{60\\text{ m}} = \\frac{1}{120}$.' },
            { text: 'Verify the answer is physically reasonable: An image distance of 0.5 m is extremely small compared to a 60 m object.', faded: true, blankAnswer: '10 cm (inverted)' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_009', title: 'Periscope: Construction and Working',
          scaffold: { problem: 'A light ray travels from air into a glass slab at an angle of 30 degrees. The refractive index of glass is 1.5.',
            steps: [
            { text: 'Identify given values - angle of incidence (i) = 30 degrees, refractive index (n) = 1.5' },
            { text: 'Apply Snell\'s Law: n1 * sin(i) = n2 * sin(r), where n1 = 1 (air)' },
            { text: 'Calculate sin(r) = sin(30) / 1.5 = 0.5 / 1.5 = 0.333' },
            { text: 'Find r = arcsin(0.333) = 19.47 degrees' },
            { text: 'Verify: the refracted angle is less than the incident angle, which is expected when light enters a denser medium', faded: true, blankAnswer: 'The angle of refraction is approximately 19.47 degrees.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_010', title: 'Kaleidoscope: Multiple Reflections and Symmetry',
          scaffold: { problem: 'A student sets up two plane mirrors at an angle of $40^\\circ$ in a school science laboratory in Delhi.',
            steps: [
            { text: 'Identify the given angle between the mirrors: $\\theta = 40^\\circ$ and what needs to be found: number of images ($N$).' },
            { text: 'Select the appropriate formula for multiple reflections: $N = (\\frac{360^\\circ}{\\theta}) - 1$.' },
            { text: 'Substitute the given value into the formula: $N = (\\frac{360^\\circ}{40^\\circ}) - 1$.' },
            { text: 'Compute the division and track unit cancellation (degrees cancel out): $N = 9 - 1$.' },
            { text: 'Compute the final subtraction and verify physical reasonability: $N = 8$ images, which is a valid whole-number integer.', faded: true, blankAnswer: '8 images' }
            ] } },
        { type: 'case', nodeId: 'c7_physics_ch05_011', title: 'Real and Virtual Images: Differences',
          caseStudy: { intro: 'When you look into your dressing table mirror at home, you see your face clearly, but if you place a sheet of paper behind the mirror, no image appears on it.',
            decisions: [{ prompt: 'What is the primary physical difference that distinguishes a real image from a virtual image regarding a screen?', options: [
                { text: 'A real image can be caught or formed on a screen', outcome: 'A real image can be caught or formed on a screen because light rays actually meet at that point.' },
                { text: 'virtual', outcome: 'Not quite — Students often think that "virtual" means the image is not real and therefore no light is involved.', reveals: 'virtual-means-the-image-is' },
                { text: 'you can touch a virtual image if you put your hand behind a plane mirror', outcome: 'Not quite — Students often think that "virtual" means the image is not real and therefore no light is involved.', reveals: 'virtual-means-the-image-is' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a night cycling trip, Chotu\'s red rear reflector blazes whenever a car headlight hits it. He tells his sister, \'My reflector is a light source, just like the moon — they both shine in the dark.\'',
            decisions: [{ prompt: 'Are the reflector and the moon really light sources?', options: [
                { text: 'Neither — a source must emit its own light. The reflector only bounces back headlight beams, and the moon only returns sunlight; put both in true darkness with nothing shining on them and they go black. A firefly or a bulb genuinely emits light.', outcome: 'This applies the emit-versus-reflect test: visibility alone does not make a source, only self-generated light does.' },
                { text: 'Chotu is right — anything that shines brightly in the dark is a light source by definition.', outcome: 'Shining by reflected light is being a mirror, not a source; the test is whether it glows when no outside light falls on it.', reveals: 'shiny-means-source' },
                { text: 'The moon is a natural light source because it is huge and in the sky, but the reflector is not because humans made it.', outcome: 'Natural-versus-artificial is about origin, but source-versus-reflector is about emission: the moon emits nothing, whatever its size or pedigree.', reveals: 'big-things-emit' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch05_011', title: 'You made it',
          caseStudy: { intro: 'Ask any glowing thing one question: did you make this light or borrow it? Emitters pass; reflectors get caught.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch05_007', difficulty: 'standard',
          question: 'The image formed by a plane mirror is virtual, erect, of the exact same size.',
          hint: 'Review c7_physics_ch05_006 to master the basic laws of reflection before computing mirror.',
          misconception: 'Students often believe that the image formed in a plane mirror changes its size as the observer moves closer to.',
          parts: [
                { id: 'a', prompt: 'Why is the image formed by a plane mirror called a "virtual image" instead of a "real image"?', answer: 'A plane mirror forms a virtual image',
                  options: ['A plane mirror forms a virtual image', 'we can clearly see them with our eyes'],
                  hint: 'Review c7_physics_ch05_006 to master the basic laws of reflection before computing mirror distances.',
                  misconception: 'Students often believe that the image formed in a plane mirror changes its size as the observer moves closer to or farther away from the.' }
          ],
            remediations: { 'the-image-formed-in-a': { steps: ['To fix this misconception, have the student stand at a fixed distance from a wall mirror holding a ruler vertically.', 'Have them measure the height of their own reflection directly on the mirror surface using a dry-erase marker (or.', 'Then, have them take two giant steps backward and measure the reflection height again on the same sheet.', 'They will observe that the measured height of the reflection remains identical, proving that image size depends only.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_008', difficulty: 'standard',
          question: 'A pinhole camera is a simple optical device without a lens that forms.',
          hint: 'Review c7_physics_ch05_003 to reinforce that light beams do not bend around corners.',
          misconception: 'Students often believe that the inverted image inside a pinhole camera is caused by mirrors or lenses hidden inside the.',
          parts: [
                { id: 'a', prompt: 'What type of image is formed on the screen of a working pinhole camera? A) Erect and virtual B) Inverted and real C) Erect and real D) Inverted and virtual', answer: 'B) Inverted and real',
                  options: ['B) Inverted and real', 'the image is right-side up'],
                  hint: 'Review c7_physics_ch05_003 to reinforce that light beams do not bend around corners in free space.',
                  misconception: 'Students often believe that the inverted image inside a pinhole camera is caused by mirrors or lenses hidden inside the box, or they think.' },
                { id: 'b', prompt: 'A candle of height 10 cm is placed 40 cm away from the pinhole of a pinhole camera.', answer: '5 cm',
                  options: ['5 cm', 'the image is right-side up'],
                  hint: 'Review c7_physics_ch05_003 to reinforce that light beams do not bend around corners in free space.',
                  misconception: 'Students often believe that the inverted image inside a pinhole camera is caused by mirrors or lenses hidden inside the box, or they think.' },
                { id: 'c', prompt: 'If you slowly slide the inner tube of a pinhole camera outward so that the distance between the pinhole and the translucent screen increases from 10 cm to 30.', answer: 'B) The image becomes larger and fainter',
                  options: ['B) The image becomes larger and fainter', 'the image is right-side up'],
                  hint: 'Review c7_physics_ch05_003 to reinforce that light beams do not bend around corners in free space.',
                  misconception: 'Students often believe that the inverted image inside a pinhole camera is caused by mirrors or lenses hidden inside the box, or they think.' }
          ],
            remediations: { 'the-inverted-image-inside-a': { steps: ['To fix this misconception, take a cardboard shoebox with a pinhole on one end and a tracing paper screen on the other.', 'Hold a glowing torch in front of it with the bulb pointing up.', 'Have the student use a piece of colored thread or a laser pointer to trace a straight line from the top of the torch.', 'Seeing the physical crossing of straight light paths makes the inversion intuitive and clear.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the inverted image inside a pinhole camera is caused by mirrors or lenses hidden inside the.',
          parts: [
                { id: 'a', prompt: 'An inquisitive student makes a pinhole camera but punches three separate pinholes close together instead of one.', answer: 'Answer: C) Three overlapping images forming a blurred composite picture',
                  options: ['Answer: C) Three overlapping images forming a blurred composite picture', 'the image is right-side up'],
                  hint: 'Review c7_physics_ch05_003 to reinforce that light beams do not bend around corners in free space.',
                  misconception: 'Students often believe that the inverted image inside a pinhole camera is caused by mirrors or lenses hidden inside the box, or they think.' }
          ],
            remediations: { 'the-inverted-image-inside-a': { steps: ['To fix this misconception, take a cardboard shoebox with a pinhole on one end and a tracing paper screen on the other.', 'Hold a glowing torch in front of it with the bulb pointing up.', 'Have the student use a piece of colored thread or a laser pointer to trace a straight line from the top of the torch.', 'Seeing the physical crossing of straight light paths makes the inversion intuitive and clear.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_009', difficulty: 'standard',
          question: 'A periscope is an optical instrument that uses two plane mirrors placed.',
          hint: 'Review c7_physics_ch05_006 on the laws of reflection to ensure you understand that angle.',
          misconception: 'Students often believe that a periscope magnifies distant objects like a telescope or binoculars do.',
          parts: [
                { id: 'a', prompt: 'What type of reflecting surfaces are used inside a standard school periscope?', answer: 'Plane mirrors are used inside a standard school periscope',
                  options: ['Plane mirrors are used inside a standard school periscope', 'convex mirrors', 'concave mirrors', 'a periscope magnifies distant objects like a telescope or binoculars do'],
                  hint: 'Review c7_physics_ch05_006 on the laws of reflection to ensure you understand that angle.',
                  misconception: 'Students often believe that a periscope magnifies distant objects like a telescope or binoculars do.' },
                { id: 'b', prompt: 'If light strikes the top mirror of a periscope at an angle of incidence of 30 degrees measured from the normal, what is the angle of reflection at that mirror?', answer: 'The angle of reflection is 30 degrees',
                  options: ['The angle of reflection is 30 degrees', '60 degrees', 'a periscope magnifies distant objects like a telescope or binoculars do'],
                  hint: 'Review c7_physics_ch05_006 on the laws of reflection to ensure you understand that angle.',
                  misconception: 'Students often believe that a periscope magnifies distant objects like a telescope or binoculars do.' },
                { id: 'c', prompt: 'How does the final image seen through a simple two-mirror periscope compare to the actual object in terms of orientation (upright or inverted)?', answer: 'The final image is upright (erect)',
                  options: ['The final image is upright (erect)', 'inverted', 'a periscope magnifies distant objects like a telescope or binoculars do'],
                  hint: 'Review c7_physics_ch05_006 on the laws of reflection to ensure you understand that angle.',
                  misconception: 'Students often believe that a periscope magnifies distant objects like a telescope or binoculars do.' }
          ],
            remediations: { 'a-periscope-magnifies-distant-objects': { steps: ['To fix this, have the student construct a simple periscope using a shoe box and two small pocket mirrors.', 'Ask them to look at a pencil placed outside a window through the periscope and measure the size of the pencil compared.', 'They will observe that the image is the exact same size, proving that mirrors reflect light without magnifying it.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_010', difficulty: 'standard',
          question: 'A kaleidoscope is an optical instrument consisting of inclined plane mirrors.',
          hint: 'Review c7_physics_ch05_006 and c7_physics_ch05_007 to master single-mirror reflections.',
          misconception: 'Students often believe that the number of images formed by two inclined mirrors is simply $360^\\circ$ divided by the.',
          parts: [
                { id: 'a', prompt: 'What is the primary optical phenomenon responsible for the repeating patterns seen inside a kaleidoscope?', answer: 'The primary phenomenon is multiple reflections',
                  options: ['The primary phenomenon is multiple reflections', 'refraction', 'dispersion'],
                  hint: 'Review c7_physics_ch05_006 and c7_physics_ch05_007 to master single-mirror reflections and image.',
                  misconception: 'Students often believe that the number of images formed by two inclined mirrors is simply $360^\\circ$ divided by the angle.' }
          ],
            remediations: { 'the-number-of-images-formed': { steps: ['To fix this misconception, take two real mirrors hinged together at $90^\\circ$ and place a single coin in front of them.', 'Have the student physically point to and count the images visible in the mirrors: one in the left mirror, one in the.', 'Then show them that the math formula must include a subtraction of 1 ($4 - 1 = 3$) to account for this exact overlap.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_011', difficulty: 'standard',
          question: 'A real image is formed when light rays actually intersect after reflection.',
          hint: 'Review c7_physics_ch05_007 to reinforce how plane mirrors form images behind the.',
          misconception: 'Students often think that "virtual" means the image is not real and therefore no light is involved, or they believe.',
          parts: [
                { id: 'a', prompt: 'What is the primary physical difference that distinguishes a real image from a virtual image regarding a screen?', answer: 'A real image can be caught or formed on a screen',
                  options: ['A real image can be caught or formed on a screen', 'virtual', 'you can touch a virtual image if you put your hand behind a plane mirror'],
                  hint: 'Review c7_physics_ch05_007 to reinforce how plane mirrors form images behind the reflecting surface.',
                  misconception: 'Students often think that "virtual" means the image is not real and therefore no light is involved, or they believe that you can touch.' },
                { id: 'b', prompt: 'Why is the image formed by a plane mirror considered virtual even though you can see it clearly with your eyes?', answer: 'An image in a plane mirror is virtual',
                  options: ['An image in a plane mirror is virtual', 'virtual', 'you can touch a virtual image if you put your hand behind a plane mirror'],
                  hint: 'Review c7_physics_ch05_007 to reinforce how plane mirrors form images behind the reflecting surface.',
                  misconception: 'Students often think that "virtual" means the image is not real and therefore no light is involved, or they believe that you can touch.' },
                { id: 'c', prompt: 'If a convex lens forms an image of a candle flame on a white cardboard screen placed 30 cm away from the lens, is this image real or virtual, and why?', answer: 'Identify that the image is formed on a white cardboard screen',
                  options: ['Identify that the image is formed on a white cardboard screen', 'virtual', 'you can touch a virtual image if you put your hand behind a plane mirror'],
                  hint: 'Review c7_physics_ch05_007 to reinforce how plane mirrors form images behind the reflecting surface.',
                  misconception: 'Students often think that "virtual" means the image is not real and therefore no light is involved, or they believe that you can touch.' },
                { id: 'd', prompt: 'Analyze the orientation of images: Can a real image ever be erect (upright), and can a virtual image ever be inverted? Explain your reasoning.', answer: 'Real images are almost always inverted (upside down) relative to the object',
                  options: ['Real images are almost always inverted (upside down) relative to the object', 'virtual', 'you can touch a virtual image if you put your hand behind a plane mirror'],
                  hint: 'Review c7_physics_ch05_007 to reinforce how plane mirrors form images behind the reflecting surface.',
                  misconception: 'Students often think that "virtual" means the image is not real and therefore no light is involved, or they believe that you can touch.' }
          ],
            remediations: { 'virtual-means-the-image-is': { steps: ['To fix this, take a small pocket mirror and shine a torch at it in a darkened room, holding a white paper screen behind.', 'Guide the student to observe that light bounces off the surface and enters their eyes, creating an apparent position.', 'Emphasize that "virtual" means \'formed where light *appears* to come from\', not \'made of magic\'.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
