import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch05_p1: SimDef = {
    id: 'v3_c7_physics_ch05_p1',
    title: 'Light: Shadows and Reflections · Part 1/2',
    subtitle: 'Covers the identification and classification of light sources into natural and artificial.',
    classLevel: 7, subject: 'physics', topic: 'Light: Shadows and Reflections · Part 1/2',
    chapters: ['c7_physics_ch05'],
    nodeIds: ['c7_physics_ch05_001', 'c7_physics_ch05_002', 'c7_physics_ch05_003', 'c7_physics_ch05_004', 'c7_physics_ch05_005', 'c7_physics_ch05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking outside on a sunny afternoon in your courtyard and then coming inside a room to switch on.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A garden lamp soaks up sunshine all day and glows through the night on stored power. Natural light source or artificial — which team does it belong to?',
        options: ['A hybrid — the energy comes naturally from the Sun, but the LED that actually emits the light is human-made', 'Purely natural — sunlight powers it end to end', 'Purely artificial — it glows at night like a torch', 'Neither — stored light belongs to no category'],
        answer: 'A hybrid — the energy comes naturally from the Sun, but the LED that actually emits the light is human-made',
        hook: 'The real test of a light source is emission, not glow. The Moon shines by borrowing sunlight — it reflects, never produces. A firefly, glowing by its own chemistry, is a truer source than the whole Moon.',
    },
    teaching: [
        { title: 'Sources of Light: Natural and Artificial', text: 'Sources of light are physical objects or phenomena that emit their own light or scatter light from another source, categorized into natural sources (like the Sun and stars) and artificial sources.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch05_001', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Sort the night sky and your house — Sun, Moon, stars, firefly, candle, LED, neon sign — into emitters and borrowers, natural and artificial, and defend each call.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_005', title: 'Shadow Formation: Conditions and Types of Shadows',
          scaffold: { problem: 'A cylindrical water bottle of height 15 cm is placed 30 cm away from a point source of light on a desk.',
            steps: [
            { text: 'Identify given quantities: height of object ($h_o = 15\\text{ cm}$), distance from source to object ($d_{so} = 30\\text{.' },
            { text: 'Identify the geometric proportionality formula for similar triangles formed by light rays: $\\frac{h_s}{h_o}.' },
            { text: 'Rearrange the formula to solve for shadow height: $h_s = h_o \\times \\left(\\frac{d_{ss}}{d_{so}}\\right)$.' },
            { text: 'Substitute the values with units and compute: $h_s = 15\\text{ cm} \\times \\left(\\frac{90\\text{ cm}}{30\\text{ cm}}\\right).' },
            { text: 'Verify the answer physically: The screen is three times as far from the source as the object, so the shadow height.', faded: true, blankAnswer: '45 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch05_006', title: 'Reflection of Light: Laws of Reflection',
          scaffold: { problem: 'A light ray strikes a plane glass mirror in a physics lab in Delhi at an angle of incidence of 35°.',
            steps: [
            { text: 'Identify the given value: Angle of incidence ($\\angle i$) = 35°.' },
            { text: 'Recall the first law of reflection: Angle of incidence equals angle of reflection ($\\angle i = \\angle r$).' },
            { text: 'Substitute the value for the angle of reflection: $\\angle r = 35°$.' },
            { text: 'Compute the total angle by adding the two angles: Total angle = $\\angle i + \\angle r = 35° + 35° = 70°$.' },
            { text: 'Verify the answer physically: Both angles are equal relative to the normal, and 70° is a reasonable geometric sum for.', faded: true, blankAnswer: 'Angle of reflection = 35°, Total angle between rays = 70°' }
            ] } },
        { type: 'case', nodeId: 'c7_physics_ch05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a night cycling trip, Chotu\'s red rear reflector blazes whenever a car headlight hits it. He tells his sister, \'My reflector is a light source, just like the moon — they both shine in the dark.\'',
            decisions: [{ prompt: 'Are the reflector and the moon really light sources?', options: [
                { text: 'Neither — a source must emit its own light. The reflector only bounces back headlight beams, and the moon only returns sunlight; put both in true darkness with nothing shining on them and they go black. A firefly or a bulb genuinely emits light.', outcome: 'This applies the emit-versus-reflect test: visibility alone does not make a source, only self-generated light does.' },
                { text: 'Chotu is right — anything that shines brightly in the dark is a light source by definition.', outcome: 'Shining by reflected light is being a mirror, not a source; the test is whether it glows when no outside light falls on it.', reveals: 'shiny-means-source' },
                { text: 'The moon is a natural light source because it is huge and in the sky, but the reflector is not because humans made it.', outcome: 'Natural-versus-artificial is about origin, but source-versus-reflector is about emission: the moon emits nothing, whatever its size or pedigree.', reveals: 'big-things-emit' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Ask any glowing thing one question: did you make this light or borrow it? Emitters pass; reflectors get caught.',
            decisions: [{ prompt: 'What comes next? Light: Shadows and Reflections · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Light: Shadows and Reflections · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch05_001', difficulty: 'standard',
          question: 'Sources of light are physical objects or phenomena that emit their own light.',
          hint: 'Review basic properties of luminous objects and simple light-emitting components from.',
          misconception: 'Students often believe that any object that shines or glows in the dark—such as the Moon, polished metals, or road.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sources of light are physical objects or phenomena that emit their own light or scatter',
                  options: ['Sources of light are physical objects or phenomena that emit their own light or scatter', 'Luminous objects are those that emit their own light by converting various forms of', 'Light travels in straight lines in a homogeneous, transparent medium, a property known as', 'Transparent materials allow light to pass through them completely so objects can be seen'],
                  hint: 'Review basic properties of luminous objects and simple light-emitting components from Class 6.',
                  misconception: 'Students often believe that any object that shines or glows in the dark—such as the Moon, polished metals, or road reflectors—is a source.' }
          ],
            remediations: { 'any-object-that-shines-or': { steps: ['To correct this misconception, take the student into a completely dark room without any windows and place a mirror,.', 'Ask the student to turn off the smartphone screen and observe whether the mirror or spoon continues to shine.', 'When they observe that the mirror and spoon become completely invisible because no light is striking them, explain that.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_002', difficulty: 'standard',
          question: 'Luminous objects are those that emit their own light by converting various.',
          hint: 'Review c7_physics_ch05_001 on Sources of Light: Natural and Artificial to reinforce how.',
          misconception: 'Students often think that any object that looks bright, shiny, or glows when light hits it (such as a polished metal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Luminous objects are those that emit their own light by converting various forms of',
                  options: ['Luminous objects are those that emit their own light by converting various forms of', 'Sources of light are physical objects or phenomena that emit their own light or scatter', 'Light travels in straight lines in a homogeneous, transparent medium, a property known as', 'Transparent materials allow light to pass through them completely so objects can be seen'],
                  hint: 'Review c7_physics_ch05_001 on Sources of Light: Natural and Artificial to reinforce how different.',
                  misconception: 'Students often think that any object that looks bright, shiny, or glows when light hits it (such as a polished metal plate, a glass marble.' }
          ],
            remediations: { 'any-object-that-looks-bright': { steps: ['To fix this, take the student into a windowless room or use a closed shoebox.', 'Place a shiny object like a steel spoon and a glowing object like a lit torch inside the box.', 'Close the lid completely and look through a pinhole—only the lit torch part of the torch can be seen if it emits light.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_003', difficulty: 'standard',
          question: 'Light travels in straight lines in a homogeneous, transparent medium,.',
          hint: 'Review basic ray concepts and the difference between light and sound propagation.',
          misconception: 'Students often think that light can bend around sharp corners or edges of obstacles if the light is bright enough,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Light travels in straight lines in a homogeneous, transparent medium, a property known as',
                  options: ['Light travels in straight lines in a homogeneous, transparent medium, a property known as', 'Sources of light are physical objects or phenomena that emit their own light or scatter', 'Luminous objects are those that emit their own light by converting various forms of', 'Transparent materials allow light to pass through them completely so objects can be seen'],
                  hint: 'Review basic ray concepts and the difference between light and sound propagation.',
                  misconception: 'Students often think that light can bend around sharp corners or edges of obstacles if the light is bright enough, or they confuse the.' }
          ],
            remediations: { 'light-can-bend-around-sharp': { steps: ['To fix this, take a straight pipe and a bent pipe, look at a lighted bulb through both, and record the observation that.', 'Emphasize that unlike sound waves which can diffract significantly around obstacles due to their long wavelengths.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_004', difficulty: 'standard',
          question: 'Transparent materials allow light to pass through them completely so objects.',
          hint: 'Review how light behaves when it encounters obstacles by revisiting c7_physics_ch05_003.',
          misconception: 'Students frequently confuse translucent materials with transparent materials because they both let some light pass.',
          parts: [
                { id: 'a', prompt: 'Explain why you cannot see your friend standing on the other side of a thick wooden wall even when the room is brightly lit.', answer: 'A wooden wall is an opaque material',
                  options: ['A wooden wall is an opaque material', 'the wall is too dark'],
                  hint: 'Review how light behaves when it encounters obstacles by revisiting c7_physics_ch05_003.',
                  misconception: 'Students frequently confuse translucent materials with transparent materials because they both let some light pass through.' }
          ],
            remediations: { 'students-frequently-confuse-translucent-material': { steps: ['To correct this, hold a clear glass tumbler and a piece of oiled tracing paper side by side in front of printed text.', 'Ask the student to read the text through the glass (where letters are sharp and clear) and then through the oiled paper.', 'Explain that because the text cannot be seen distinctly through the oiled paper, light is being scattered, proving the.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_005', difficulty: 'standard',
          question: 'A shadow is a dark patch formed on a surface when an opaque or translucent.',
          hint: 'Review c7_physics_ch05_003 and c7_physics_ch05_004 to reinforce how light travels and.',
          misconception: 'Students often believe that the shadow of an object moves on its own or that translucent objects cast completely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A shadow is a dark patch formed on a surface when an opaque or translucent object blocks',
                  options: ['A shadow is a dark patch formed on a surface when an opaque or translucent object blocks', 'Sources of light are physical objects or phenomena that emit their own light or scatter', 'Luminous objects are those that emit their own light by converting various forms of', 'Light travels in straight lines in a homogeneous, transparent medium, a property known as'],
                  hint: 'Review c7_physics_ch05_003 and c7_physics_ch05_004 to reinforce how light travels and interacts.',
                  misconception: 'Students often believe that the shadow of an object moves on its own or that translucent objects cast completely pitch-black shadows.' }
          ],
            remediations: { 'the-shadow-of-an-object': { steps: ['To fix this, take a translucent plastic scale and an opaque book.', 'Hold each between a torch and a white wall in a darkened room.', 'Observe that the book casts a dark, sharp shadow (umbra only), while the translucent scale casts a very faint, hazy.', 'Conclude that translucent objects reduce the intensity of light rather than blocking it completely, resulting in.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch05_006', difficulty: 'standard',
          question: 'The laws of reflection state that when light falls on a smooth, reflective.',
          hint: 'Review basic geometry concepts regarding perpendicular lines and angle measurements from.',
          misconception: 'Students frequently measure the angle of incidence and angle of reflection between the light ray and the reflecting.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The laws of reflection state that when light falls on a smooth, reflective surface, the',
                  options: ['The laws of reflection state that when light falls on a smooth, reflective surface, the', 'Sources of light are physical objects or phenomena that emit their own light or scatter', 'Luminous objects are those that emit their own light by converting various forms of', 'Light travels in straight lines in a homogeneous, transparent medium, a property known as'],
                  hint: 'Review basic geometry concepts regarding perpendicular lines and angle measurements from.',
                  misconception: 'Students frequently measure the angle of incidence and angle of reflection between the light ray and the reflecting surface itself, rather.' }
          ],
            remediations: { 'students-frequently-measure-the-angle': { steps: ['Take a flat sheet of paper and draw a straight line representing the mirror.', 'Draw a dashed line straight up at a 90° angle from the middle of the mirror line; label this dashed line as the.', 'Emphasize by drawing an arc that all angle measurements in optics must start from this dashed normal line, never from.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
