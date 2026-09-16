import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch11_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch11_p2: SimDef = {
    id: 'v3_c6_physics_ch11_p2',
    title: 'Light: Shadows and Reflections · Part 2/2',
    subtitle: 'This node covers the basic structure and image formation mechanics of a pinhole camera.',
    classLevel: 6, subject: 'physics', topic: 'Light: Shadows and Reflections · Part 2/2',
    chapters: ['c6_physics_ch11'],
    nodeIds: ['c6_physics_ch11_035', 'c6_physics_ch11_036', 'c6_physics_ch11_037', 'c6_physics_ch11_038'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered how a tiny hole in a dark box can "capture" a picture of the world outside?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'On a bright moonlit night, a friend calls the Moon a natural source of light, just like the Sun. Are they right?',
        options: ['No — the Moon only bounces sunlight back to us; a true source makes its own light, like the Sun, stars, or a firefly', 'Yes — anything glowing in the night sky counts as a source', 'Yes — moonlight is made inside the Moon', 'No — the Moon is actually an artificial satellite'],
        answer: 'No — the Moon only bounces sunlight back to us; a true source makes its own light, like the Sun, stars, or a firefly',
        hook: 'Glowing is not the same as producing. Mirrors and the Moon reflect light made elsewhere — while a tiny firefly, glowing by its own chemistry, is a genuine natural source. Artificial sources are the ones humans built, like bulbs and candles.',
    },
    teaching: [
        { title: 'The Pinhole Camera: How It Works', text: 'A pinhole camera is a simple light-tight box with a tiny hole on one side that forms an inverted, real image of an object on the opposite screen by allowing light to travel in straight lines.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch11_041', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Sort a jumble of glowing things — Sun, moon, mirror, firefly, candle, phone screen — into emitters, reflectors, natural, and artificial, and defend each label.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch11_041', title: 'The Pinhole Camera: How It Works',
          caseStudy: { intro: 'Have you ever wondered how a tiny hole in a dark box can "capture" a picture of the world outside?',
            decisions: [{ prompt: 'What happens to the image if you make the pinhole very large?', options: [
                { text: 'The image becomes blurry or disappears entirely', outcome: 'The image becomes blurry or disappears entirely because too much light enters from different.' },
                { text: 'bigger window', outcome: 'Not quite — Students often believe the pinhole "turns" the light around or that there is a mirror inside the.', reveals: 'the-pinhole-turns-the-light' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch11_042', title: 'Making a Periscope Using Reflection',
          caseStudy: { intro: 'Have you ever tried to see over a tall crowd at a school parade or look around a corner without being spotted?',
            decisions: [{ prompt: 'What is the primary function of a periscope? [1-2 sentence response]', options: [
                { text: 'A periscope allows a person to see objects that are not in their direct line of sight', outcome: 'A periscope allows a person to see objects that are not in their direct line of sight.' },
                { text: 'travels', outcome: 'Not quite — Students often think the light "travels" through the cardboard tube as if it were a clear pipe.', reveals: 'the-light-travels-through-the' },
                { text: 'the light "travels" through the cardboard tube as if it were a clear pipe', outcome: 'Not quite — Students often think the light "travels" through the cardboard tube as if it were a clear pipe.', reveals: 'the-light-travels-through-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch11_044', title: 'Uses of Light and Optical Instruments',
          caseStudy: { intro: 'Have you ever looked at a tiny insect and wished you could see its wings clearly, or looked at the Moon and wanted to see its craters?',
            decisions: [{ prompt: 'What is the primary function of a microscope compared to a telescope?', options: [
                { text: 'A microscope magnifies very small objects to reveal details like cells, while a telescope', outcome: 'A microscope magnifies very small objects to reveal details like cells, while a telescope magnifies.' },
                { text: 'distance', outcome: 'Not quite — Students often think "magnification" is the only purpose of optical instruments.', reveals: 'magnification-is-the-only-purpose' },
                { text: '"magnification" is the only purpose of optical instruments', outcome: 'Not quite — Students often think "magnification" is the only purpose of optical instruments.', reveals: 'magnification-is-the-only-purpose' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch11_041', title: 'Use it in the wild',
          caseStudy: { intro: 'On a terrace at night, a friend points at the bright moon and says, \'The Moon is a light source — look how it lights up the whole garden.\' You have a ball and a lamp to prove otherwise.',
            decisions: [{ prompt: 'How does the ball-and-lamp test settle it?', options: [
                { text: 'Switch the lamp on in a dark room and the ball glows — yet switch the lamp off and the ball makes no light of its own. The Moon is the same: it shines only because sunlight bounces off it, so it is a reflector, not a source. A true source — a star, a flame, a torch — produces its own light.', outcome: 'The test separates \'gives out light\' from \'gives back light\' — anything visible by reflected light, like the ball or the Moon, fails the lamp-off check.' },
                { text: 'The friend is right — anything that lights up your garden is by definition a light source.', outcome: 'Brightness is not proof of production — the ball glows under the lamp too, but goes dark the instant the lamp is off, showing it only reflects.', reveals: 'bright-means-source' },
                { text: 'The Moon is half a source — it makes some light and reflects the rest.', outcome: 'It makes none — its entire glow is borrowed sunlight, which the ball-and-lamp demonstration mimics exactly.', reveals: 'moon-is-half-source' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch11_044', title: 'You made it',
          caseStudy: { intro: 'Ask one question of any bright thing: did it make this light, or borrow it? That single test separates every source from every mirror.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch11_041', difficulty: 'standard',
          question: 'A pinhole camera is a simple light-tight box with a tiny hole on one side that.',
          hint: 'Review the properties of shadows; shadows are formed because light cannot pass through.',
          misconception: 'Students often believe the pinhole "turns" the light around or that there is a mirror inside the box to flip the image.',
          parts: [
                { id: 'a', prompt: 'What happens to the image if you make the pinhole very large?', answer: 'The image becomes blurry or disappears entirely',
                  options: ['The image becomes blurry or disappears entirely', 'bigger window'],
                  hint: 'Review the properties of shadows; shadows are formed because light cannot pass through an object.',
                  misconception: 'Students often believe the pinhole "turns" the light around or that there is a mirror inside the box to flip the image.' }
          ],
            remediations: { 'the-pinhole-turns-the-light': { steps: ['Take a cardboard tube and hold a burning candle in front of it in a dark room.', 'Ask the student to trace the path of the light from the candle flame to the back of the tube with a string.', 'Show them that the string must pass through the center to reach the opposite side, physically demonstrating the.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_042', difficulty: 'standard',
          question: 'A periscope is an optical instrument that uses two plane mirrors placed.',
          hint: 'Review the properties of plane mirrors and how they reflect light.',
          misconception: 'Students often think the light "travels" through the cardboard tube as if it were a clear pipe.',
          parts: [
                { id: 'a', prompt: 'If you place the two mirrors in a periscope parallel to each other but at 30-degree angles instead of 45-degree angles, will you be able to see the object.', answer: 'No, you will not see the object clearly',
                  options: ['No, you will not see the object clearly', 'travels', 'the light "travels" through the cardboard tube as if it were a clear pipe'],
                  hint: 'Review the properties of plane mirrors and how they reflect light.',
                  misconception: 'Students often think the light "travels" through the cardboard tube as if it were a clear pipe.' },
                { id: 'b', prompt: 'A student is building a periscope. They place the first mirror at the top.', answer: 'It will reflect at a 45-degree angle',
                  options: ['It will reflect at a 45-degree angle', 'travels', 'the light "travels" through the cardboard tube as if it were a clear pipe'],
                  hint: 'Review the properties of plane mirrors and how they reflect light.',
                  misconception: 'Students often think the light "travels" through the cardboard tube as if it were a clear pipe.' }
          ],
            remediations: { 'the-light-travels-through-the': { steps: ['First, ask the student to trace the path of a laser pointer or flashlight beam onto a single mirror.', 'Ask, "Where does the light go?" Then, place a second mirror in the path of the reflected light and ask, "How can.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_042', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the light "travels" through the cardboard tube as if it were a clear pipe.',
          parts: [
                { id: 'a', prompt: 'If you removed one of the two mirrors from a periscope, could you still see the hidden object? Defend your answer.', answer: 'No, because one mirror can only change the direction of light once',
                  options: ['No, because one mirror can only change the direction of light once', 'travels', 'the light "travels" through the cardboard tube as if it were a clear pipe'],
                  hint: 'Review the properties of plane mirrors and how they reflect light.',
                  misconception: 'Students often think the light "travels" through the cardboard tube as if it were a clear pipe.' }
          ],
            remediations: { 'the-light-travels-through-the': { steps: ['First, ask the student to trace the path of a laser pointer or flashlight beam onto a single mirror.', 'Ask, "Where does the light go?" Then, place a second mirror in the path of the reflected light and ask, "How can.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_043', difficulty: 'standard',
          question: 'Multiple reflection is the process where a light ray bounces off two or more.',
          hint: 'Review the basic Law of Reflection (angle of incidence = angle of reflection).',
          misconception: 'Students often think that the *size* of the mirror determines the number of images, rather than the *angle*.',
          parts: [
                { id: 'a', prompt: 'Why does a kaleidoscope create a circular, symmetrical pattern rather than just a single blurry reflection?', answer: 'The angled mirrors reflect the objects repeatedly in a circle, creating symmetry',
                  options: ['The angled mirrors reflect the objects repeatedly in a circle, creating symmetry', 'because the beads are colorful'],
                  hint: 'Review the basic Law of Reflection (angle of incidence = angle of reflection).',
                  misconception: 'Students often think that the *size* of the mirror determines the number of images, rather than the *angle*.' },
                { id: 'b', prompt: 'If you have two mirrors and you want to see MORE images than you currently see, what should you do to the angle between them?', answer: 'You should decrease the angle',
                  options: ['You should decrease the angle', 'the angle and image count are unrelated'],
                  hint: 'Review the basic Law of Reflection (angle of incidence = angle of reflection).',
                  misconception: 'Students often think that the *size* of the mirror determines the number of images, rather than the *angle*.' }
          ],
            remediations: { 'the-size-of-the-mirror': { steps: ['Ask the student to take two small mirrors and place a coin between them at a 90-degree angle.', 'Ask them to count the images.', 'Now, tell them to keep the mirrors the same size but squeeze them together to a 45-degree angle.', 'Ask them to recount; they will see more images despite the mirror size remaining unchanged, proving angle is the key.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_044', difficulty: 'standard',
          question: 'Optical instruments are devices that use lenses or mirrors to manipulate light.',
          hint: 'Review the chapter on how mirrors and lenses change the direction of light.',
          misconception: 'Students often think "magnification" is the only purpose of optical instruments.',
          parts: [
                { id: 'a', prompt: 'If you want to see the specific colors that make up a beam of sunlight, which optical instrument would you choose?', answer: 'You would use a spectroscope',
                  options: ['You would use a spectroscope', 'magnification', '"magnification" is the only purpose of optical instruments'],
                  hint: 'Review the chapter on how mirrors and lenses change the direction of light.',
                  misconception: 'Students often think "magnification" is the only purpose of optical instruments.' }
          ],
            remediations: { 'magnification-is-the-only-purpose': { steps: ['First, ask the student to describe what a "rainbow" is and how it relates to white light.', 'Second, explain that light can be "spread out" or "analyzed" just as easily as it can be "zoomed in." Use the analogy.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
