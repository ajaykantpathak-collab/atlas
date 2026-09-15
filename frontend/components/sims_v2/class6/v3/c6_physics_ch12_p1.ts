import type { SimDef } from '../../engine/types';

/** v3 generated — c6_physics_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_physics_ch12_p1: SimDef = {
    id: 'v3_c6_physics_ch12_p1',
    title: 'Earth, Moon, and Eclipses · Part 1/2',
    subtitle: 'This node covers the cause of day and night and the direction of Earth\'s rotation.',
    classLevel: 6, subject: 'physics', topic: 'Earth, Moon, and Eclipses · Part 1/2',
    chapters: ['c6_physics_ch12'],
    nodeIds: ['c6_physics_ch12_045', 'c6_physics_ch12_046', 'c6_physics_ch12_047', 'c6_physics_ch12_048', 'c6_physics_ch12_049', 'c6_physics_ch12_050'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why you go to bed when it’s dark and wake up when it’s bright?', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Your uncle insists the Sun rises because it travels across the sky every day, just like a bus crossing town. What is actually moving?',
        options: ['We are — Earth spins on its axis once every 24 hours, carrying us into sunlight and back out', 'The Sun — it really does circle the Earth daily', 'The clouds — they drag the Sun across the sky', 'Nothing moves — light simply fades and returns'],
        answer: 'We are — Earth spins on its axis once every 24 hours, carrying us into sunlight and back out',
        hook: 'Day and night exist because Earth is a spinning sphere — sunlight can only ever light one half at a time. The sun seems to cross the sky for the same reason a lamp seems to spin when you turn in a circle: the observer is the one moving.',
    },
    teaching: [
        { title: 'Rotation of the Earth: Day and Night', text: 'The Earth’s rotation is the spinning motion of our planet around an imaginary central line called its axis, which connects the North Pole to the South Pole.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_physics_ch12_045', title: 'Your mission',
          mission: { widget: 'moon', validate: 'moon:phase=80',
            instruction: 'On the lab: sweep to full moon — what does the lit fraction do?.',
        context: 'Shine a flashlight on a ball in a dark room, spin the ball slowly, and show why one side lives in day while the other lives in night — then explain what happens if the spinning stops.',
            observePrompt: 'What did the moon interactive show you?' } },
        { type: 'case', nodeId: 'c6_physics_ch12_045', title: 'Rotation of the Earth: Day and Night',
          caseStudy: { intro: 'Have you ever wondered why you go to bed when it’s dark and wake up when it’s bright?',
            decisions: [{ prompt: 'What is the name of the imaginary line that runs through the Earth from the North Pole to the South Pole around which the Earth spins?', options: [
                { text: 'The line is called the axis', outcome: 'The line is called the axis. A student who answers "the Equator" is confusing the line of rotation.' },
                { text: 'the Equator', outcome: 'Not quite — Students often believe the Sun moves around the Earth because of the common phrase "the sun rises.', reveals: 'the-sun-moves-around-the' },
                { text: 'the sun rises and sets', outcome: 'Not quite — Students often believe the Sun moves around the Earth because of the common phrase "the sun rises.', reveals: 'the-sun-moves-around-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch12_047', title: 'Seasons: Why They Change',
          caseStudy: { intro: 'Have you ever noticed that when it is very hot in India during June, people in countries like Australia are wearing sweaters and celebrating winter?',
            decisions: [{ prompt: 'What is the specific angle at which the Earth’s axis is tilted?', options: [
                { text: 'The Earth\'s axis is tilted at 23.5 degrees', outcome: 'The Earth\'s axis is tilted at 23.5 degrees. An incorrect answer usually indicates a lack of rote.' },
                { text: 'summer occurs because the Earth moves closer to the Sun in its orbit', outcome: 'Not quite — Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.', reveals: 'summer-occurs-because-the-earth' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch12_048', title: 'Understanding Eclipses',
          caseStudy: { intro: 'Have you ever noticed your own shadow on the ground when standing in front of a bright bulb?',
            decisions: [{ prompt: 'What is the position of the Moon during a solar eclipse?', options: [
                { text: 'During a solar eclipse, the Moon is positioned between the Earth and the Sun', outcome: 'During a solar eclipse, the Moon is positioned between the Earth and the Sun.' },
                { text: 'the Sun is between the Earth and Moon', outcome: 'Not quite — Students often believe eclipses happen every month because the Moon orbits the Earth monthly.', reveals: 'eclipses-happen-every-month-because' },
                { text: 'eclipses happen every month', outcome: 'Not quite — Students often believe eclipses happen every month because the Moon orbits the Earth monthly.', reveals: 'eclipses-happen-every-month-because' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch12_049', title: 'Solar Eclipse: Moon Blocks the Sun',
          caseStudy: { intro: 'Have you ever noticed how a lamp casts a shadow when you put your hand in front of it?',
            decisions: [{ prompt: 'What three celestial objects must align in a straight line for a solar eclipse to happen?', options: [
                { text: 'The Sun, the Moon, and the Earth must align in that specific order', outcome: 'The Sun, the Moon, and the Earth must align in that specific order.' },
                { text: 'goes out', outcome: 'Not quite — Students often believe that the Sun "goes out" or "vanishes" during an eclipse.', reveals: 'the-sun-goes-out-or' },
                { text: 'vanishes', outcome: 'Not quite — Students often believe that the Sun "goes out" or "vanishes" during an eclipse.', reveals: 'the-sun-goes-out-or' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch12_050', title: 'Lunar Eclipse: Earth Blocks the Sun',
          caseStudy: { intro: 'Have you ever played with a flashlight and your hand to cast a shadow on a wall?',
            decisions: [{ prompt: 'What three objects must be in a line for a lunar eclipse to occur?', options: [
                { text: 'The Sun, the Earth, and the Moon must be in a line', outcome: 'The Sun, the Earth, and the Moon must be in a line. A wrong answer (like swapping the Earth and.' },
                { text: 'blocker', outcome: 'Not quite — Students often confuse lunar and solar eclipses, thinking the Moon blocks the Sun in both.', reveals: 'students-often-confuse-lunar-and' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch12_045', title: 'Use it in the wild',
          caseStudy: { intro: 'Video-calling a pen-pal abroad, a student is confused: it\'s bright afternoon at home but her friend\'s window is pitch dark. \'Maybe their Sun is off today,\' her little brother offers.',
            decisions: [{ prompt: 'What explains day in one place and night in another at the same moment?', options: [
                { text: 'The Earth is a spinning ball — at any moment, the Sun lights only half of it, and the line between light and dark keeps moving as Earth rotates. Her home sits on the lit side while her friend\'s sits on the dark side; in a few hours they will swap. If Earth were flat, everyone would share day and night at the same time — which is not what the call shows.', outcome: 'Day and night are just the two halves of a turning sphere — the moving edge between them is the terminator, and time zones are the same idea sliced by longitude.' },
                { text: 'The brother might be right — night could mean the Sun has dimmed or switched off over there.', outcome: 'The Sun never switches — the friend\'s side of the planet has simply rotated out of the sunlight, while the lit side enjoys afternoon.', reveals: 'sun-switches-off' },
                { text: 'Different countries have different suns — that is why their days differ.', outcome: 'There is one Sun — the spherical Earth\'s rotation makes it light different halves at different times, which the video call demonstrates directly.', reveals: 'each-place-own-sun' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch12_050', title: 'The bigger picture',
          caseStudy: { intro: 'The Sun does not rise — we roll toward it. Every sunrise is just your spot on Earth turning back into the light.',
            decisions: [{ prompt: 'What comes next? Earth, Moon, and Eclipses · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Earth, Moon, and Eclipses · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'moon', prompt: 'Explore the moon interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'moon', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch12_045', difficulty: 'standard',
          question: 'The Earth’s rotation is the spinning motion of our planet around an imaginary.',
          hint: 'Review the shape of the Earth and how shadows form when an object blocks a light source.',
          misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They.',
          parts: [
                { id: 'a', prompt: 'What is the name of the imaginary line that runs through the Earth from the North Pole to the South Pole around which the Earth spins?', answer: 'The line is called the axis',
                  options: ['The line is called the axis', 'the Equator', 'the sun rises and sets', 'the Sun moves around the Earth'],
                  hint: 'Review the shape of the Earth and how shadows form when an object blocks a light source.',
                  misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They assume the observer.' },
                { id: 'b', prompt: 'If you are in India and it is currently daytime, what is happening on the opposite side of the Earth, and why?', answer: 'It is currently night on the opposite side',
                  options: ['It is currently night on the opposite side', 'the sun rises and sets', 'the Sun moves around the Earth'],
                  hint: 'Review the shape of the Earth and how shadows form when an object blocks a light source.',
                  misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They assume the observer.' },
                { id: 'c', prompt: 'If the Earth stopped rotating suddenly, what would happen to the cycle of day and night?', answer: 'The cycle would stop',
                  options: ['The cycle would stop', 'the sun rises and sets', 'the Sun moves around the Earth'],
                  hint: 'Review the shape of the Earth and how shadows form when an object blocks a light source.',
                  misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They assume the observer.' },
                { id: 'd', prompt: 'Why does the Sun appear to move from the East to the West throughout the day?', answer: 'The Sun appears to move',
                  options: ['The Sun appears to move', 'the sun rises and sets', 'the Sun moves around the Earth'],
                  hint: 'Review the shape of the Earth and how shadows form when an object blocks a light source.',
                  misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They assume the observer.' }
          ],
            remediations: { 'the-sun-moves-around-the': { steps: ['Ask the student to stand up and spin in a circle while looking at a lamp in the room.', 'Ask them if the lamp moved or if their perspective of the lamp changed.', 'Explain that just as the lamp stayed in one place while they spun, the Sun stays in one place while the Earth spins.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_045', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They.',
          parts: [
                { id: 'a', prompt: 'Is it possible for the entire Earth to experience daytime at the exact same moment? Explain your reasoning.', answer: 'No, because the Earth is a sphere',
                  options: ['No, because the Earth is a sphere', 'the sun rises and sets', 'the Sun moves around the Earth'],
                  hint: 'Review the shape of the Earth and how shadows form when an object blocks a light source.',
                  misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They assume the observer.' },
                { id: 'b', prompt: 'If you were standing on the Moon looking at the Earth, what would you observe about the Earth\'s "day" side?', answer: 'The "day" side would appear bright',
                  options: ['The "day" side would appear bright', 'the sun rises and sets', 'the Sun moves around the Earth'],
                  hint: 'Review the shape of the Earth and how shadows form when an object blocks a light source.',
                  misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They assume the observer.' }
          ],
            remediations: { 'the-sun-moves-around-the': { steps: ['Ask the student to stand up and spin in a circle while looking at a lamp in the room.', 'Ask them if the lamp moved or if their perspective of the lamp changed.', 'Explain that just as the lamp stayed in one place while they spun, the Sun stays in one place while the Earth spins.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_046', difficulty: 'standard',
          question: 'The revolution of the Earth is its movement in an elliptical orbit around the.',
          hint: 'Review the definition of the Solar System and the movement of planets.',
          misconception: 'Students often confuse the Earth\'s *rotation* (spinning on its axis, causing day/night) with *revolution* (orbiting the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The revolution of the Earth is its movement in an elliptical orbit around the Sun',
                  options: ['The revolution of the Earth is its movement in an elliptical orbit around the Sun', 'The Earth’s rotation is the spinning motion of our planet around an imaginary central', 'Seasons change because the Earth rotates on an axis that is tilted at an angle of 23.5', 'An eclipse is an astronomical event where one celestial body passes into the shadow of'],
                  hint: 'Review the definition of the Solar System and the movement of planets.',
                  misconception: 'Students often confuse the Earth\'s *rotation* (spinning on its axis, causing day/night) with *revolution* (orbiting the Sun, causing the.' }
          ],
            remediations: { 'students-often-confuse-the-earth': { steps: ['Ask the student to draw a circle representing the Sun and a path around it.', 'Label the full path as "Revolution" (1 year) and the spinning motion of the Earth on its own center as "Rotation" (1.', 'Explain that the leap year only deals with the "Revolution" timer, not the "Rotation" timer.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_047', difficulty: 'standard',
          question: 'Seasons change because the Earth rotates on an axis that is tilted at an angle.',
          hint: 'Review the difference between rotation (spinning) and revolution (orbiting).',
          misconception: 'Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.',
          parts: [
                { id: 'a', prompt: 'What is the specific angle at which the Earth’s axis is tilted?', answer: 'The Earth\'s axis is tilted at 23.5 degrees',
                  options: ['The Earth\'s axis is tilted at 23.5 degrees', 'summer occurs because the Earth moves closer to the Sun in its orbit'],
                  hint: 'Review the difference between rotation (spinning) and revolution (orbiting).',
                  misconception: 'Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.' },
                { id: 'b', prompt: 'If the Northern Hemisphere is tilted toward the Sun, why does it experience summer?', answer: 'It experiences summer',
                  options: ['It experiences summer', 'closer', 'being "closer" to the Sun causes summer', 'summer occurs because the Earth moves closer to the Sun in its orbit'],
                  hint: 'Review the difference between rotation (spinning) and revolution (orbiting).',
                  misconception: 'Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.' },
                { id: 'c', prompt: 'If it is summer in Delhi, what season is it in a city located in the Southern Hemisphere, such as Buenos Aires?', answer: 'It would be winter',
                  options: ['It would be winter', 'summer occurs because the Earth moves closer to the Sun in its orbit'],
                  hint: 'Review the difference between rotation (spinning) and revolution (orbiting).',
                  misconception: 'Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.' },
                { id: 'd', prompt: 'How would seasons on Earth be affected if the Earth\'s axis were not tilted at all (0 degrees)?', answer: 'There would be no change in seasons',
                  options: ['There would be no change in seasons', 'summer occurs because the Earth moves closer to the Sun in its orbit'],
                  hint: 'Review the difference between rotation (spinning) and revolution (orbiting).',
                  misconception: 'Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.' }
          ],
            remediations: { 'summer-occurs-because-the-earth': { steps: ['First, draw a circle representing the orbit with the Sun in the center.', 'Second, draw the Earth at two opposite sides of the orbit, always leaning the axis in the same direction (e.g., toward.', 'Third, shade the part of the Earth receiving sunlight in each position to visually demonstrate that the "leaning" side.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_048', difficulty: 'standard',
          question: 'An eclipse is an astronomical event where one celestial body passes into the.',
          hint: 'Review how shadows are formed using a torch and an opaque object in a dark room.',
          misconception: 'Students often believe eclipses happen every month because the Moon orbits the Earth monthly.',
          parts: [
                { id: 'a', prompt: 'What is the position of the Moon during a solar eclipse?', answer: 'During a solar eclipse, the Moon is positioned between the Earth and the Sun',
                  options: ['During a solar eclipse, the Moon is positioned between the Earth and the Sun', 'the Sun is between the Earth and Moon', 'eclipses happen every month'],
                  hint: 'Review how shadows are formed using a torch and an opaque object in a dark room.',
                  misconception: 'Students often believe eclipses happen every month because the Moon orbits the Earth monthly.' },
                { id: 'b', prompt: 'Why does the Moon disappear or turn dark during a lunar eclipse?', answer: 'The Moon turns dark',
                  options: ['The Moon turns dark', 'runs out of light', 'eclipses happen every month'],
                  hint: 'Review how shadows are formed using a torch and an opaque object in a dark room.',
                  misconception: 'Students often believe eclipses happen every month because the Moon orbits the Earth monthly.' },
                { id: 'c', prompt: 'If you are standing in a location experiencing a solar eclipse, what do you see when you look at the Sun?', answer: 'You see the Moon blocking part or all of the Sun\'s light',
                  options: ['You see the Moon blocking part or all of the Sun\'s light', 'eclipses happen every month'],
                  hint: 'Review how shadows are formed using a torch and an opaque object in a dark room.',
                  misconception: 'Students often believe eclipses happen every month because the Moon orbits the Earth monthly.' },
                { id: 'd', prompt: 'Compare the shadow-casting object in a solar eclipse versus a lunar eclipse.', answer: 'In a solar eclipse, the Moon casts the shadow',
                  options: ['In a solar eclipse, the Moon casts the shadow', 'eclipses happen every month'],
                  hint: 'Review how shadows are formed using a torch and an opaque object in a dark room.',
                  misconception: 'Students often believe eclipses happen every month because the Moon orbits the Earth monthly.' }
          ],
            remediations: { 'eclipses-happen-every-month-because': { steps: ['Take a flashlight and two balls of different sizes (one large for Earth, one small for Moon).', 'Place them on a table and move the small ball around the large ball while keeping the flashlight stationary.', 'Ask the student to tilt the path of the small ball up and down relative to the light beam.', 'Explain that unless the balls are exactly at the same "height" as the light beam, no shadow falls on the other, just.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_049', difficulty: 'standard',
          question: 'A solar eclipse occurs when the Moon moves directly between the Earth and the.',
          hint: 'Review the properties of shadows and light sources in basic optics.',
          misconception: 'Students often believe that the Sun "goes out" or "vanishes" during an eclipse.',
          parts: [
                { id: 'a', prompt: 'What three celestial objects must align in a straight line for a solar eclipse to happen?', answer: 'The Sun, the Moon, and the Earth must align in that specific order',
                  options: ['The Sun, the Moon, and the Earth must align in that specific order', 'goes out', 'vanishes', 'the Sun "goes out" or "vanishes" during an eclipse'],
                  hint: 'Review the properties of shadows and light sources in basic optics.',
                  misconception: 'Students often believe that the Sun "goes out" or "vanishes" during an eclipse.' },
                { id: 'b', prompt: 'Why does the sky turn into twilight during a total solar eclipse?', answer: 'The sky turns dark',
                  options: ['The sky turns dark', 'the Sun disappears', 'goes out', 'vanishes'],
                  hint: 'Review the properties of shadows and light sources in basic optics.',
                  misconception: 'Students often believe that the Sun "goes out" or "vanishes" during an eclipse.' },
                { id: 'c', prompt: 'If you are standing in a place where only a small "bite" of the Sun is covered by the Moon, which type of eclipse are you experiencing?', answer: 'You are experiencing a partial solar eclipse',
                  options: ['You are experiencing a partial solar eclipse', 'goes out', 'vanishes', 'the Sun "goes out" or "vanishes" during an eclipse'],
                  hint: 'Review the properties of shadows and light sources in basic optics.',
                  misconception: 'Students often believe that the Sun "goes out" or "vanishes" during an eclipse.' },
                { id: 'd', prompt: 'Compare a solar eclipse to an object casting a shadow on a wall. What represents the "wall" in our solar system?', answer: 'The Earth represents the "wall"',
                  options: ['The Earth represents the "wall"', 'goes out', 'vanishes', 'the Sun "goes out" or "vanishes" during an eclipse'],
                  hint: 'Review the properties of shadows and light sources in basic optics.',
                  misconception: 'Students often believe that the Sun "goes out" or "vanishes" during an eclipse.' }
          ],
            remediations: { 'the-sun-goes-out-or': { steps: ['First, use a flashlight (Sun) and a marble (Moon) to cast a shadow on a piece of paper (Earth).', 'Move the marble between the light and the paper to show that the light is still there, just hidden.', 'Ask the student to describe why the paper gets dark (it\'s the shadow, not the light disappearing).', 'Finally, explain that the Moon does the same thing on a much larger scale in space.'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_050', difficulty: 'standard',
          question: 'A lunar eclipse is a celestial event that occurs when the Earth passes directly.',
          hint: 'Review the concept of how shadows are formed by opaque objects.',
          misconception: 'Students often confuse lunar and solar eclipses, thinking the Moon blocks the Sun in both.',
          parts: [
                { id: 'a', prompt: 'What three objects must be in a line for a lunar eclipse to occur?', answer: 'The Sun, the Earth, and the Moon must be in a line',
                  options: ['The Sun, the Earth, and the Moon must be in a line', 'blocker'],
                  hint: 'Review the concept of how shadows are formed by opaque objects.',
                  misconception: 'Students often confuse lunar and solar eclipses, thinking the Moon blocks the Sun in both.' }
          ],
            remediations: { 'students-often-confuse-lunar-and': { steps: ['First, draw a straight line on a paper.', 'Label the left side "Sun," the middle "Earth," and the right side "Moon." Explain that since the Sun provides the.', 'Tell the student: "If the Earth is in the middle, it casts a shadow on the object behind it (the Moon)."'], labTask: { instruction: 'On the interactive: sweep to full moon — what does the lit fraction do? — then check.', widget: 'moon', validate: 'moon:phase=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
