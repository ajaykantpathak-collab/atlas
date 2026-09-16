import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch12_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch12_p2: SimDef = {
    id: 'v3_c6_physics_ch12_p2',
    title: 'Earth, Moon, and Eclipses · Part 2/2',
    subtitle: 'This node covers the causes and names of the lunar phases within the Class 6 curriculum.',
    classLevel: 6, subject: 'physics', topic: 'Earth, Moon, and Eclipses · Part 2/2',
    chapters: ['c6_physics_ch12'],
    nodeIds: ['c6_physics_ch12_051', 'c6_physics_ch12_045'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever noticed how the Moon sometimes looks like a thin silver slice, a half-circle, or a bright.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Your uncle insists the Sun rises because it travels across the sky every day, just like a bus crossing town. What is actually moving?',
        options: ['We are — Earth spins on its axis once every 24 hours, carrying us into sunlight and back out', 'The Sun — it really does circle the Earth daily', 'The clouds — they drag the Sun across the sky', 'Nothing moves — light simply fades and returns'],
        answer: 'We are — Earth spins on its axis once every 24 hours, carrying us into sunlight and back out',
        hook: 'Day and night exist because Earth is a spinning sphere — sunlight can only ever light one half at a time. The sun seems to cross the sky for the same reason a lamp seems to spin when you turn in a circle: the observer is the one moving.',
    },
    teaching: [
        { title: 'Phases of the Moon', text: 'The phases of the Moon are the different shapes of the Moon\'s illuminated portion as seen from Earth, caused by the Moon orbiting the Earth while reflecting sunlight.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch12_051', title: 'Your mission',
          mission: { widget: 'moon', validate: 'moon:phase=80',
            instruction: 'On the lab: sweep to full moon — what does the lit fraction do?.',
        context: 'Shine a flashlight on a ball in a dark room, spin the ball slowly, and show why one side lives in day while the other lives in night — then explain what happens if the spinning stops.',
            observePrompt: 'What did the moon interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch12_051', title: 'Phases of the Moon',
          caseStudy: { intro: 'Have you ever noticed how the Moon sometimes looks like a thin silver slice, a half-circle, or a bright glowing ball, even though it is always the same round.',
            decisions: [{ prompt: 'Why does the Moon appear to change its shape throughout the month?', options: [
                { text: 'The Moon appears to change shape', outcome: 'The Moon appears to change shape because it orbits the Earth, and our view of the side lit by the.' },
                { text: 'the phases are caused by the Earth\'s shadow falling on the Moon', outcome: 'Not quite — Students often believe the phases are caused by the Earth\'s shadow falling on the Moon.', reveals: 'the-phases-are-caused-by' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch12_052', title: 'Exploring the Night Sky',
          caseStudy: { intro: 'Have you ever looked at a group of stars and thought they looked like a kite, a hunter, or a bear?',
            decisions: [{ prompt: 'What is a constellation? (A) A single, extremely bright star. (B) A group of stars that form a pattern when viewed from Earth.', options: [
                { text: '(B) is the correct answer', outcome: '(B) is the correct answer. Choosing (A) reveals a misunderstanding that a constellation is a single.' },
                { text: 'family', outcome: 'Not quite — Students often believe that stars within a constellation are physically connected or belong to.', reveals: 'stars-within-a-constellation-are' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch12_051', title: 'Use it in the wild',
          caseStudy: { intro: 'Video-calling a pen-pal abroad, a student is confused: it\'s bright afternoon at home but her friend\'s window is pitch dark. \'Maybe their Sun is off today,\' her little brother offers.',
            decisions: [{ prompt: 'What explains day in one place and night in another at the same moment?', options: [
                { text: 'The Earth is a spinning ball — at any moment, the Sun lights only half of it, and the line between light and dark keeps moving as Earth rotates. Her home sits on the lit side while her friend\'s sits on the dark side; in a few hours they will swap. If Earth were flat, everyone would share day and night at the same time — which is not what the call shows.', outcome: 'Day and night are just the two halves of a turning sphere — the moving edge between them is the terminator, and time zones are the same idea sliced by longitude.' },
                { text: 'The brother might be right — night could mean the Sun has dimmed or switched off over there.', outcome: 'The Sun never switches — the friend\'s side of the planet has simply rotated out of the sunlight, while the lit side enjoys afternoon.', reveals: 'sun-switches-off' },
                { text: 'Different countries have different suns — that is why their days differ.', outcome: 'There is one Sun — the spherical Earth\'s rotation makes it light different halves at different times, which the video call demonstrates directly.', reveals: 'each-place-own-sun' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch12_052', title: 'You made it',
          caseStudy: { intro: 'The Sun does not rise — we roll toward it. Every sunrise is just your spot on Earth turning back into the light.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'moon', prompt: 'Explore the moon interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'moon', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch12_051', difficulty: 'standard',
          question: 'The phases of the Moon are the different shapes of the Moon\'s illuminated.',
          hint: 'Review the concept of light reflection from Chapter 12.',
          misconception: 'Students often believe the phases are caused by the Earth\'s shadow falling on the Moon.',
          parts: [
                { id: 'a', prompt: 'Why does the Moon appear to change its shape throughout the month?', answer: 'The Moon appears to change shape',
                  options: ['The Moon appears to change shape', 'the phases are caused by the Earth\'s shadow falling on the Moon'],
                  hint: 'Review the concept of light reflection from Chapter 12.',
                  misconception: 'Students often believe the phases are caused by the Earth\'s shadow falling on the Moon.' },
                { id: 'b', prompt: 'If the Moon takes 29.5 days to complete its cycle, how long do you think it takes to go from a New Moon to a First Quarter phase?', answer: 'It takes approximately 7.4 days (one-fourth of the cycle)',
                  options: ['It takes approximately 7.4 days (one-fourth of the cycle)', 'the phases are caused by the Earth\'s shadow falling on the Moon'],
                  hint: 'Review the concept of light reflection from Chapter 12.',
                  misconception: 'Students often believe the phases are caused by the Earth\'s shadow falling on the Moon.' },
                { id: 'c', prompt: 'Compare the Moon to a mirror. Is this a good comparison for why we see lunar phases?', answer: 'Yes, because the Moon reflects sunlight just as a mirror reflects light',
                  options: ['Yes, because the Moon reflects sunlight just as a mirror reflects light', 'the phases are caused by the Earth\'s shadow falling on the Moon'],
                  hint: 'Review the concept of light reflection from Chapter 12.',
                  misconception: 'Students often believe the phases are caused by the Earth\'s shadow falling on the Moon.' }
          ],
            remediations: { 'the-phases-are-caused-by': { steps: ['First, ask the student to draw a diagram with a large circle (Sun) and a smaller circle (Moon) showing how sunlight.', 'Then, have them place an \'X\' on the Moon\'s surface and rotate it around a model of the Earth, noting when the \'X\'.', 'This visual transition helps them see that it is the *position* of the Moon that changes our *perspective* of the lit.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_052', difficulty: 'standard',
          question: 'A constellation is a recognized group of stars that appears to form a specific.',
          hint: 'Review the chapter on Earth\'s motion and how it affects our view of space.',
          misconception: 'Students often believe that stars within a constellation are physically connected or belong to a single "family." This.',
          parts: [
                { id: 'a', prompt: 'What is a constellation? (A) A single, extremely bright star. (B) A group of stars that form a pattern when viewed from Earth.', answer: '(B) is the correct answer',
                  options: ['(B) is the correct answer', 'family'],
                  hint: 'Review the chapter on Earth\'s motion and how it affects our view of space.',
                  misconception: 'Students often believe that stars within a constellation are physically connected or belong to a single "family." This happens because.' },
                { id: 'b', prompt: 'If you draw a line connecting stars to make a "hunter" shape, are those lines actually present in the sky? Why or why not?', answer: 'No, the lines are not in the sky',
                  options: ['No, the lines are not in the sky', 'family'],
                  hint: 'Review the chapter on Earth\'s motion and how it affects our view of space.',
                  misconception: 'Students often believe that stars within a constellation are physically connected or belong to a single "family." This happens because.' }
          ],
            remediations: { 'stars-within-a-constellation-are': { steps: ['Ask the student to visualize two people standing on different sides of a field.', 'From a distance, they might look like they are standing side-by-side (a constellation pattern), but in reality, they.', 'Explain that space is 3D, and the "pattern" is just our perspective.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_052', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that stars within a constellation are physically connected or belong to a single "family." This.',
          parts: [
                { id: 'a', prompt: 'Could you use the Pole Star to find your direction if you were standing at the South Pole? Justify your answer.', answer: 'No, the Pole Star is only visible from the Northern Hemisphere',
                  options: ['No, the Pole Star is only visible from the Northern Hemisphere', 'family'],
                  hint: 'Review the chapter on Earth\'s motion and how it affects our view of space.',
                  misconception: 'Students often believe that stars within a constellation are physically connected or belong to a single "family." This happens because.' },
                { id: 'b', prompt: 'Design a new constellation using five stars in your textbook or a diagram. What would you name it and what story would you tell about it?', answer: 'A good answer creates a unique pattern and links it to a creative, logical story',
                  options: ['A good answer creates a unique pattern and links it to a creative, logical story', 'family'],
                  hint: 'Review the chapter on Earth\'s motion and how it affects our view of space.',
                  misconception: 'Students often believe that stars within a constellation are physically connected or belong to a single "family." This happens because.' }
          ],
            remediations: { 'stars-within-a-constellation-are': { steps: ['Ask the student to visualize two people standing on different sides of a field.', 'From a distance, they might look like they are standing side-by-side (a constellation pattern), but in reality, they.', 'Explain that space is 3D, and the "pattern" is just our perspective.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
