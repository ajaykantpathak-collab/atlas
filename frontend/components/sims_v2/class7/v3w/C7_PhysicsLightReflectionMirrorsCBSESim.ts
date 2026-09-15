import type { SimDef } from '../../engine/types';
import C7_PhysicsLightReflectionMirrorsCBSESim from '../../../simulations/c6_12/C7_PhysicsLightReflectionMirrorsCBSESim';

/** v3 wrapped master — C7_PhysicsLightReflectionMirrorsCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_physicslightreflectionmirrorscbsesim: SimDef = {
    id: 'v3w_c7_physicslightreflectionmirrorscbsesim',
    title: 'Light Reflection Mirrors CBSE',
    subtitle: 'Covers regular (specular) reflection on flat plane mirrors and surfaces, angle.',
    classLevel: 7, subject: 'physics', topic: 'Reflection of Light: Laws of Reflection',
    chapters: [],
    nodeIds: ['c7_physics_ch05_006', 'c7_physics_ch05_007', 'c7_physics_ch05_009', 'c7_physics_ch05_011', 'c7_physics_ch05_010', 'c7_physics_ch05_002', 'c7_physics_ch05_003', 'c7_physics_ch05_001', 'c7_physics_ch05_004', 'c7_physics_ch05_005', 'c7_physics_ch05_008', 'c7_physics_ch01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine holding a pocket mirror in the sunlight and bouncing a bright patch of light onto a classroom wall.', goal: 'Master Light Reflection Mirrors CBSE.' },
    discovery: {
        question: 'What type of reflecting surfaces are used inside a standard school periscope?',
        options: ['Plane mirrors are used inside a standard school periscope', 'convex mirrors', 'concave mirrors'],
        answer: 'Plane mirrors are used inside a standard school periscope',
        hook: 'Students often believe that a periscope magnifies distant objects like a telescope or binoculars do.',
    },
    teaching: [
        { title: 'The laws of reflection state that when light.', text: 'The laws of reflection state that when light falls on a smooth, reflective surface, the angle of reflection equals the angle of incidence, and the incident ray, reflected ray, and normal all lie in.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_physics_ch05_006', title: 'The laws of reflection state that when.',
          scaffold: { problem: 'A light ray strikes a plane glass mirror in a physics lab in Delhi at an angle of incidence of 35°.',
            steps: [
            { text: 'Identify the given value: Angle of incidence ($\\angle i$) = 35°.' },
            { text: 'Recall the first law of reflection: Angle of incidence equals angle of reflection ($\\angle i = \\angle r$).' },
            { text: 'Substitute the value for the angle of reflection: $\\angle r = 35°$.' },
            { text: 'Compute the total angle by adding the two angles: Total angle = $\\angle i + \\angle r = 35° + 35° = 70°$.' },
            { text: 'Verify the answer physically: Both angles are equal relative to the normal, and 70° is a reasonable geometric sum for.', faded: true, blankAnswer: 'Angle of reflection = 35°, Total angle between rays = 70°' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_007', title: 'The image formed by a plane mirror is.',
          scaffold: { problem: 'A science student places a glowing LED bulb 25 cm in front of a flat plane mirror in a physics lab in Delhi.',
            steps: [
            { text: 'Identify given values: object distance ($d_o$) = 25 cm. Identify what to find: image distance ($d_i$) and total.' },
            { text: 'Recall the plane mirror property formula relating object distance and image distance: $d_i = d_o$.' },
            { text: 'Substitute the given object distance into the property equation: $d_i = 25\\text{ cm}$.' },
            { text: 'Compute the total distance between object and image by adding object distance and image distance: $D_{total} = d_o +.' },
            { text: 'Final calculation: $D_{total} = 50\\text{ cm}$. Verify that 50 cm is physically reasonable for a table-top lab setup.', faded: true, blankAnswer: 'Image distance = 25 cm; Total distance between object and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_009', title: 'A periscope is an optical instrument.',
          scaffold: { problem: 'A light ray travels from air into a glass slab at an angle of 30 degrees. The refractive index of glass is 1.5.',
            steps: [
            { text: 'Identify given values - angle of incidence (i) = 30 degrees, refractive index (n) = 1.5' },
            { text: 'Apply Snell\'s Law: n1 * sin(i) = n2 * sin(r), where n1 = 1 (air)' },
            { text: 'Calculate sin(r) = sin(30) / 1.5 = 0.5 / 1.5 = 0.333' },
            { text: 'Find r = arcsin(0.333) = 19.47 degrees' },
            { text: 'Verify: the refracted angle is less than the incident angle, which is expected when light enters a denser medium', faded: true, blankAnswer: 'The angle of refraction is approximately 19.47 degrees.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_011', title: 'A real image is formed when light rays.',
          scaffold: { problem: 'A student sets up an experiment in a physics laboratory in Delhi.',
            steps: [
            { text: 'Identify the optical device and setup used in the experiment (convex lens with a paper screen).' },
            { text: 'Analyze the interaction of light rays with the screen (light rays from the window pass through the lens and actually.' },
            { text: 'Apply the definition of image types (an image formed by actual intersection of light rays that can be caught on a.' },
            { text: 'List the two characteristics (1. Can be caught on a screen, 2.' },
            { text: 'Verify consistency and conclude with the classification.', faded: true, blankAnswer: 'The image is real because it can be caught on a screen and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_010', title: 'A kaleidoscope is an optical instrument.',
          scaffold: { problem: 'A student sets up two plane mirrors at an angle of $40^\\circ$ in a school science laboratory in Delhi.',
            steps: [
            { text: 'Identify the given angle between the mirrors: $\\theta = 40^\\circ$ and what needs to be found: number of images ($N$).' },
            { text: 'Select the appropriate formula for multiple reflections: $N = (\\frac{360^\\circ}{\\theta}) - 1$.' },
            { text: 'Substitute the given value into the formula: $N = (\\frac{360^\\circ}{40^\\circ}) - 1$.' },
            { text: 'Compute the division and track unit cancellation (degrees cancel out): $N = 9 - 1$.' },
            { text: 'Compute the final subtraction and verify physical reasonability: $N = 8$ images, which is a valid whole-number integer.', faded: true, blankAnswer: '8 images' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_002', title: 'Luminous objects are those that emit.',
          scaffold: { problem: 'Classify the following four items found in a typical Indian school classroom into luminous and non-luminous categories: 1) A glowing tube.',
            steps: [
            { text: 'Examine item 1 (glowing tube light). It uses electricity to produce its own light. Therefore, it is luminous.' },
            { text: 'Examine item 2 (wooden desk). It does not produce any light; it only reflects classroom light.' },
            { text: 'Examine item 3 (burning sun). It undergoes nuclear fusion to generate its own massive amount of light.' },
            { text: 'Examine item 4 (green chalkboard). It does not emit light of its own and is only visible because light bounces off its.' },
            { text: 'Group the items into final categories: Luminous = Tube light, Sun; Non-luminous = Wooden desk, Chalkboard.', faded: true, blankAnswer: 'Luminous: Tube light, Sun; Non-luminous: Wooden desk,.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_physics_ch05_007', title: 'Identify each idea',
          dissect: { specimen: 'Light Reflection Mirrors CBSE', spots: [
            { id: 's1', label: 'The laws of reflection state', prompt: 'Which idea is this? — The laws of reflection state that when light falls on a smooth, reflective surface, the.', answer: 'The laws of reflection state', options: ['The laws of reflection state', 'The image formed by a', 'A periscope is an optical', 'A real image is formed'] },
            { id: 's2', label: 'The image formed by a', prompt: 'Which idea is this? — The image formed by a plane mirror is virtual, erect, of the exact same size as the.', answer: 'The image formed by a', options: ['The image formed by a', 'The laws of reflection state', 'A periscope is an optical', 'A real image is formed'] },
            { id: 's3', label: 'A periscope is an optical', prompt: 'Which idea is this? — A periscope is an optical instrument that uses two plane mirrors placed parallel to each.', answer: 'A periscope is an optical', options: ['A periscope is an optical', 'The laws of reflection state', 'The image formed by a', 'A real image is formed'] },
            { id: 's4', label: 'A real image is formed', prompt: 'Which idea is this? — A real image is formed when light rays actually intersect after reflection or refraction,.', answer: 'A real image is formed', options: ['A real image is formed', 'The laws of reflection state', 'The image formed by a', 'A periscope is an optical'] },
            { id: 's5', label: 'A kaleidoscope is an optical', prompt: 'Which idea is this? — A kaleidoscope is an optical instrument consisting of inclined plane mirrors that creates.', answer: 'A kaleidoscope is an optical', options: ['A kaleidoscope is an optical', 'The laws of reflection state', 'The image formed by a', 'A periscope is an optical'] },
            { id: 's6', label: 'Luminous objects are those that', prompt: 'Which idea is this? — Luminous objects are those that emit their own light by converting various forms of.', answer: 'Luminous objects are those that', options: ['Luminous objects are those that', 'The laws of reflection state', 'The image formed by a', 'A periscope is an optical'] }
          ] } }
    ],
    explore: { component: C7_PhysicsLightReflectionMirrorsCBSESim, prompt: 'Explore the interactive — Light Reflection Mirrors CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch05_006', difficulty: 'standard',
          question: 'The laws of reflection state that when light falls on a smooth, reflective.',
          hint: 'Review basic geometry concepts regarding perpendicular lines and angle measurements from.',
          misconception: 'Students frequently measure the angle of incidence and angle of reflection between the light ray and the reflecting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The laws of reflection state that when light falls on a smooth, reflective surface, the',
                  options: ['The laws of reflection state that when light falls on a smooth, reflective surface, the', 'The image formed by a plane mirror is virtual, erect, of the exact same size as the', 'A periscope is an optical instrument that uses two plane mirrors placed parallel to each', 'A real image is formed when light rays actually intersect after reflection or refraction,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently measure the angle of incidence and angle of reflection between the light ray and the reflecting surface itself, rather.' }
          ],
            remediations: { 'students-frequently-measure-the-angle': { steps: ['Take a flat sheet of paper and draw a straight line representing the mirror.', 'Draw a dashed line straight up at a 90° angle from the middle of the mirror line; label this dashed line as the.', 'Emphasize by drawing an arc that all angle measurements in optics must start from this dashed normal line, never from.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_007', difficulty: 'standard',
          question: 'The image formed by a plane mirror is virtual, erect, of the exact same size as.',
          hint: 'Review c7_physics_ch05_006 to master the basic laws of reflection before computing mirror.',
          misconception: 'Students often believe that the image formed in a plane mirror changes its size as the observer moves closer to or.',
          parts: [
                { id: 'a', prompt: 'Why is the image formed by a plane mirror called a "virtual image" instead of a "real image"?', answer: 'A plane mirror forms a virtual image',
                  options: ['A plane mirror forms a virtual image', 'we can clearly see them with our eyes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the image formed in a plane mirror changes its size as the observer moves closer to or farther away from the.' }
          ],
            remediations: { 'the-image-formed-in-a': { steps: ['To fix this misconception, have the student stand at a fixed distance from a wall mirror holding a ruler vertically.', 'Have them measure the height of their own reflection directly on the mirror surface using a dry-erase marker (or a.', 'Then, have them take two giant steps backward and measure the reflection height again on the same sheet.', 'They will observe that the measured height of the reflection remains identical, proving that image size depends only on.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_009', difficulty: 'standard',
          question: 'A periscope is an optical instrument that uses two plane mirrors placed.',
          hint: 'Review c7_physics_ch05_006 on the laws of reflection to ensure you understand that angle.',
          misconception: 'Students often believe that a periscope magnifies distant objects like a telescope or binoculars do.',
          parts: [
                { id: 'a', prompt: 'What type of reflecting surfaces are used inside a standard school periscope?', answer: 'Plane mirrors are used inside a standard school periscope',
                  options: ['Plane mirrors are used inside a standard school periscope', 'convex mirrors', 'concave mirrors'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a periscope magnifies distant objects like a telescope or binoculars do.' },
                { id: 'b', prompt: 'If light strikes the top mirror of a periscope at an angle of incidence of 30 degrees measured from the normal, what is the angle of reflection at that mirror?', answer: 'The angle of reflection is 30 degrees',
                  options: ['The angle of reflection is 30 degrees', '60 degrees', 'a periscope magnifies distant objects like a telescope or binoculars do'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a periscope magnifies distant objects like a telescope or binoculars do.' },
                { id: 'c', prompt: 'How does the final image seen through a simple two-mirror periscope compare to the actual object in terms of orientation (upright or inverted)?', answer: 'The final image is upright (erect)',
                  options: ['The final image is upright (erect)', 'inverted', 'a periscope magnifies distant objects like a telescope or binoculars do'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a periscope magnifies distant objects like a telescope or binoculars do.' }
          ],
            remediations: { 'a-periscope-magnifies-distant-objects': { steps: ['To fix this, have the student construct a simple periscope using a shoe box and two small pocket mirrors.', 'Ask them to look at a pencil placed outside a window through the periscope and measure the size of the pencil compared.', 'They will observe that the image is the exact same size, proving that mirrors reflect light without magnifying it.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that a periscope magnifies distant objects like a telescope or binoculars do.',
          parts: [
                { id: 'a', prompt: 'A student builds a periscope where the top and bottom mirrors are accidentally glued parallel to each other, but at an angle of 30 degrees to the tube instead.', answer: 'No, it will not successfully show the object',
                  options: ['No, it will not successfully show the object', 'a periscope magnifies distant objects like a telescope or binoculars do'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a periscope magnifies distant objects like a telescope or binoculars do.' }
          ],
            remediations: { 'a-periscope-magnifies-distant-objects': { steps: ['To fix this, have the student construct a simple periscope using a shoe box and two small pocket mirrors.', 'Ask them to look at a pencil placed outside a window through the periscope and measure the size of the pencil compared.', 'They will observe that the image is the exact same size, proving that mirrors reflect light without magnifying it.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_011', difficulty: 'standard',
          question: 'A real image is formed when light rays actually intersect after reflection or.',
          hint: 'Review c7_physics_ch05_007 to reinforce how plane mirrors form images behind the.',
          misconception: 'Students often think that "virtual" means the image is not real and therefore no light is involved, or they believe.',
          parts: [
                { id: 'a', prompt: 'What is the primary physical difference that distinguishes a real image from a virtual image regarding a screen?', answer: 'A real image can be caught or formed on a screen',
                  options: ['A real image can be caught or formed on a screen', 'virtual', 'you can touch a virtual image if you put your hand behind a plane mirror'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "virtual" means the image is not real and therefore no light is involved, or they believe that you can touch a.' },
                { id: 'b', prompt: 'Why is the image formed by a plane mirror considered virtual even though you can see it clearly with your eyes?', answer: 'An image in a plane mirror is virtual',
                  options: ['An image in a plane mirror is virtual', 'virtual', 'you can touch a virtual image if you put your hand behind a plane mirror'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "virtual" means the image is not real and therefore no light is involved, or they believe that you can touch a.' },
                { id: 'c', prompt: 'Analyze the orientation of images: Can a real image ever be erect (upright), and can a virtual image ever be inverted? Explain your reasoning.', answer: 'Real images are almost always inverted (upside down) relative to the object',
                  options: ['Real images are almost always inverted (upside down) relative to the object', 'virtual', 'you can touch a virtual image if you put your hand behind a plane mirror'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "virtual" means the image is not real and therefore no light is involved, or they believe that you can touch a.' }
          ],
            remediations: { 'virtual-means-the-image-is': { steps: ['To fix this, take a small pocket mirror and shine a torch at it in a darkened room, holding a white paper screen behind.', 'Guide the student to observe that light bounces off the surface and enters their eyes, creating an apparent position.', 'Emphasize that "virtual" means \'formed where light *appears* to come from\', not \'made of magic\'.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "virtual" means the image is not real and therefore no light is involved, or they believe.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A virtual image is a fake image created by the mirror, so no light is actually involved in making it." Is this statement correct or.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'virtual', 'you can touch a virtual image if you put your hand behind a plane mirror'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "virtual" means the image is not real and therefore no light is involved, or they believe that you can touch a.' }
          ],
            remediations: { 'virtual-means-the-image-is': { steps: ['To fix this, take a small pocket mirror and shine a torch at it in a darkened room, holding a white paper screen behind.', 'Guide the student to observe that light bounces off the surface and enters their eyes, creating an apparent position.', 'Emphasize that "virtual" means \'formed where light *appears* to come from\', not \'made of magic\'.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_010', difficulty: 'standard',
          question: 'A kaleidoscope is an optical instrument consisting of inclined plane mirrors.',
          hint: 'Review c7_physics_ch05_006 and c7_physics_ch05_007 to master single-mirror reflections.',
          misconception: 'Students often believe that the number of images formed by two inclined mirrors is simply $360^\\circ$ divided by the.',
          parts: [
                { id: 'a', prompt: 'What is the primary optical phenomenon responsible for the repeating patterns seen inside a kaleidoscope?', answer: 'The primary phenomenon is multiple reflections',
                  options: ['The primary phenomenon is multiple reflections', 'refraction', 'dispersion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the number of images formed by two inclined mirrors is simply $360^\\circ$ divided by the angle.' }
          ],
            remediations: { 'the-number-of-images-formed': { steps: ['To fix this misconception, take two real mirrors hinged together at $90^\\circ$ and place a single coin in front of them.', 'Have the student physically point to and count the images visible in the mirrors: one in the left mirror, one in the.', 'Then show them that the math formula must include a subtraction of 1 ($4 - 1 = 3$) to account for this exact overlap.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_002', difficulty: 'standard',
          question: 'Luminous objects are those that emit their own light by converting various.',
          hint: 'Review c7_physics_ch05_001 on Sources of Light: Natural and Artificial to reinforce how.',
          misconception: 'Students often think that any object that looks bright, shiny, or glows when light hits it (such as a polished metal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Luminous objects are those that emit their own light by converting various forms of',
                  options: ['Luminous objects are those that emit their own light by converting various forms of', 'The laws of reflection state that when light falls on a smooth, reflective surface, the', 'The image formed by a plane mirror is virtual, erect, of the exact same size as the', 'A periscope is an optical instrument that uses two plane mirrors placed parallel to each'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that any object that looks bright, shiny, or glows when light hits it (such as a polished metal plate, a glass marble,.' }
          ],
            remediations: { 'any-object-that-looks-bright': { steps: ['To fix this, take the student into a windowless room or use a closed shoebox.', 'Place a shiny object like a steel spoon and a glowing object like a lit torch inside the box.', 'Close the lid completely and look through a pinhole—only the lit torch part of the torch can be seen if it emits light,.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
