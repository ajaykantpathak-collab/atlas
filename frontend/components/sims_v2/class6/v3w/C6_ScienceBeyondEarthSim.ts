import type { SimDef } from '../../engine/types';
import C6_ScienceBeyondEarthSim from '../../../simulations/c6_12/C6_ScienceBeyondEarthSim';

/** v3 wrapped master — C6_ScienceBeyondEarthSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencebeyondearthsim: SimDef = {
    id: 'v3w_c6_sciencebeyondearthsim',
    title: 'Revolution of the Earth: The Year',
    subtitle: 'This node covers the Earth\'s orbital period and the concept of a leap year.',
    classLevel: 6, subject: 'science', topic: 'Revolution of the Earth: The Year',
    chapters: [],
    nodeIds: ['c6_physics_ch12_046', 'c6_physics_ch12_049', 'c6_physics_ch12_045', 'c6_physics_ch12_047', 'c6_physics_ch12_048', 'c6_physics_ch12_050', 'c6_physics_ch12_051'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Think about your birthday—it happens every year, but have you ever wondered why we suddenly have an extra day.', goal: 'Master Revolution of the Earth: The Year.' },
    discovery: {
        question: 'What three celestial objects must align in a straight line for a solar eclipse to happen?',
        options: ['The Sun, the Moon, and the Earth must align in that specific order', 'goes out', 'vanishes'],
        answer: 'The Sun, the Moon, and the Earth must align in that specific order',
        hook: 'Students often believe that the Sun "goes out" or "vanishes" during an eclipse.',
    },
    teaching: [
        { title: 'The revolution of the Earth is its movement.', text: 'The revolution of the Earth is its movement in an elliptical orbit around the Sun, which takes approximately 365.25 days to complete one full cycle.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_physics_ch12_049', title: 'A solar eclipse occurs when the Moon.',
          scaffold: { problem: 'If a small town in India is 500 km wide and the shadow of the Moon during a total solar eclipse moves across the country at 2000 km/h, how.',
            steps: [
            { text: 'Identify that the path width is 500 km and the speed is 2000 km/h.' },
            { text: 'Use the formula: Time = Distance / Speed.' },
            { text: 'Apply the values: Time = 500 km / 2000 km/h.' },
            { text: 'Compute the result: 0.25 hours.' },
            { text: 'Convert to minutes: 0.25 * 60 = 15 minutes.', faded: true, blankAnswer: '15 minutes' }
            ] } },
        { type: 'case', nodeId: 'c6_physics_ch12_045', title: 'The Earth’s rotation is the spinning.',
          caseStudy: { intro: 'Have you ever wondered why you go to bed when it’s dark and wake up when it’s bright?',
            decisions: [{ prompt: 'What is the name of the imaginary line that runs through the Earth from the North Pole to the South Pole around which the Earth spins?', options: [
                { text: 'The line is called the axis', outcome: 'The line is called the axis. A student who answers "the Equator" is confusing the line of rotation.' },
                { text: 'the Equator', outcome: 'Not quite — Students often believe the Sun moves around the Earth because of the common phrase "the sun rises.', reveals: 'the-sun-moves-around-the' },
                { text: 'the sun rises and sets', outcome: 'Not quite — Students often believe the Sun moves around the Earth because of the common phrase "the sun rises.', reveals: 'the-sun-moves-around-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_physics_ch12_047', title: 'Seasons change because the Earth.',
          caseStudy: { intro: 'Have you ever noticed that when it is very hot in India during June, people in countries like Australia are wearing sweaters and celebrating winter?',
            decisions: [{ prompt: 'What is the specific angle at which the Earth’s axis is tilted?', options: [
                { text: 'The Earth\'s axis is tilted at 23.5 degrees', outcome: 'The Earth\'s axis is tilted at 23.5 degrees. An incorrect answer usually indicates a lack of rote.' },
                { text: 'summer occurs because the Earth moves closer to the Sun in its orbit', outcome: 'Not quite — Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.', reveals: 'summer-occurs-because-the-earth' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch12_048', title: 'An eclipse is an astronomical event.',
          scaffold: { problem: 'A student wants to model an eclipse using a torch, a tennis ball (Earth), and a marble (Moon).',
            steps: [
            { text: 'Identify the light source (torch).' },
            { text: 'Identify the target (marble/Moon).' },
            { text: 'Identify the blocker (tennis ball/Earth).' },
            { text: 'Arrange in order: Torch -> Tennis Ball -> Marble.' },
            { text: 'Ensure all three are aligned on a single straight horizontal line.', faded: true, blankAnswer: 'Torch -> Tennis Ball -> Marble.' }
            ] } },
        { type: 'case', nodeId: 'c6_physics_ch12_050', title: 'A lunar eclipse is a celestial event.',
          caseStudy: { intro: 'Have you ever played with a flashlight and your hand to cast a shadow on a wall?',
            decisions: [{ prompt: 'What three objects must be in a line for a lunar eclipse to occur?', options: [
                { text: 'The Sun, the Earth, and the Moon must be in a line', outcome: 'The Sun, the Earth, and the Moon must be in a line. A wrong answer (like swapping the Earth and.' },
                { text: 'blocker', outcome: 'Not quite — Students often confuse lunar and solar eclipses, thinking the Moon blocks the Sun in both.', reveals: 'students-often-confuse-lunar-and' }
            ] }] } }
    ],
    explore: { component: C6_ScienceBeyondEarthSim, prompt: 'Explore the interactive — Revolution of the Earth: The Year' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_physics_ch12_046', difficulty: 'standard',
          question: 'The revolution of the Earth is its movement in an elliptical orbit around the.',
          hint: 'Review the definition of the Solar System and the movement of planets.',
          misconception: 'Students often confuse the Earth\'s *rotation* (spinning on its axis, causing day/night) with *revolution* (orbiting the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The revolution of the Earth is its movement in an elliptical orbit around the Sun',
                  options: ['The revolution of the Earth is its movement in an elliptical orbit around the Sun', 'A solar eclipse occurs when the Moon moves directly between the Earth and the Sun,', 'The Earth’s rotation is the spinning motion of our planet around an imaginary central', 'Seasons change because the Earth rotates on an axis that is tilted at an angle of 23.5'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the Earth\'s *rotation* (spinning on its axis, causing day/night) with *revolution* (orbiting the Sun, causing the.' }
          ],
            remediations: { 'students-often-confuse-the-earth': { steps: ['Ask the student to draw a circle representing the Sun and a path around it.', 'Label the full path as "Revolution" (1 year) and the spinning motion of the Earth on its own center as "Rotation" (1.', 'Explain that the leap year only deals with the "Revolution" timer, not the "Rotation" timer.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_049', difficulty: 'standard',
          question: 'A solar eclipse occurs when the Moon moves directly between the Earth and the.',
          hint: 'Review the properties of shadows and light sources in basic optics.',
          misconception: 'Students often believe that the Sun "goes out" or "vanishes" during an eclipse.',
          parts: [
                { id: 'a', prompt: 'What three celestial objects must align in a straight line for a solar eclipse to happen?', answer: 'The Sun, the Moon, and the Earth must align in that specific order',
                  options: ['The Sun, the Moon, and the Earth must align in that specific order', 'goes out', 'vanishes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Sun "goes out" or "vanishes" during an eclipse.' },
                { id: 'b', prompt: 'Why does the sky turn into twilight during a total solar eclipse?', answer: 'The sky turns dark',
                  options: ['The sky turns dark', 'the Sun disappears', 'goes out'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Sun "goes out" or "vanishes" during an eclipse.' },
                { id: 'c', prompt: 'If you are standing in a place where only a small "bite" of the Sun is covered by the Moon, which type of eclipse are you experiencing?', answer: 'You are experiencing a partial solar eclipse',
                  options: ['You are experiencing a partial solar eclipse', 'goes out', 'vanishes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Sun "goes out" or "vanishes" during an eclipse.' }
          ],
            remediations: { 'the-sun-goes-out-or': { steps: ['First, use a flashlight (Sun) and a marble (Moon) to cast a shadow on a piece of paper (Earth).', 'Move the marble between the light and the paper to show that the light is still there, just hidden.', 'Ask the student to describe why the paper gets dark (it\'s the shadow, not the light disappearing).', 'Finally, explain that the Moon does the same thing on a much larger scale in space.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_049', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the Sun "goes out" or "vanishes" during an eclipse.',
          parts: [
                { id: 'a', prompt: 'Describe what you would see if you were in the "narrow strip" mentioned in the text during a total solar eclipse.', answer: 'You would see the Sun completely hidden by the Moon, causing the sky to darken',
                  options: ['You would see the Sun completely hidden by the Moon, causing the sky to darken', 'goes out', 'vanishes', 'the Sun "goes out" or "vanishes" during an eclipse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Sun "goes out" or "vanishes" during an eclipse.' }
          ],
            remediations: { 'the-sun-goes-out-or': { steps: ['First, use a flashlight (Sun) and a marble (Moon) to cast a shadow on a piece of paper (Earth).', 'Move the marble between the light and the paper to show that the light is still there, just hidden.', 'Ask the student to describe why the paper gets dark (it\'s the shadow, not the light disappearing).', 'Finally, explain that the Moon does the same thing on a much larger scale in space.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_045', difficulty: 'standard',
          question: 'The Earth’s rotation is the spinning motion of our planet around an imaginary.',
          hint: 'Review the shape of the Earth and how shadows form when an object blocks a light source.',
          misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They.',
          parts: [
                { id: 'a', prompt: 'What is the name of the imaginary line that runs through the Earth from the North Pole to the South Pole around which the Earth spins?', answer: 'The line is called the axis',
                  options: ['The line is called the axis', 'the Equator', 'the sun rises and sets'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They assume the observer is.' },
                { id: 'b', prompt: 'If you are in India and it is currently daytime, what is happening on the opposite side of the Earth, and why?', answer: 'It is currently night on the opposite side',
                  options: ['It is currently night on the opposite side', 'the sun rises and sets', 'the Sun moves around the Earth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They assume the observer is.' },
                { id: 'c', prompt: 'If the Earth stopped rotating suddenly, what would happen to the cycle of day and night?', answer: 'The cycle would stop',
                  options: ['The cycle would stop', 'the sun rises and sets', 'the Sun moves around the Earth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They assume the observer is.' }
          ],
            remediations: { 'the-sun-moves-around-the': { steps: ['Ask the student to stand up and spin in a circle while looking at a lamp in the room.', 'Ask them if the lamp moved or if their perspective of the lamp changed.', 'Explain that just as the lamp stayed in one place while they spun, the Sun stays in one place while the Earth spins.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_045', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They.',
          parts: [
                { id: 'a', prompt: 'Is it possible for the entire Earth to experience daytime at the exact same moment? Explain your reasoning.', answer: 'No, because the Earth is a sphere',
                  options: ['No, because the Earth is a sphere', 'the sun rises and sets', 'the Sun moves around the Earth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They assume the observer is.' },
                { id: 'b', prompt: 'If you were standing on the Moon looking at the Earth, what would you observe about the Earth\'s "day" side?', answer: 'The "day" side would appear bright',
                  options: ['The "day" side would appear bright', 'the sun rises and sets', 'the Sun moves around the Earth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They assume the observer is.' }
          ],
            remediations: { 'the-sun-moves-around-the': { steps: ['Ask the student to stand up and spin in a circle while looking at a lamp in the room.', 'Ask them if the lamp moved or if their perspective of the lamp changed.', 'Explain that just as the lamp stayed in one place while they spun, the Sun stays in one place while the Earth spins.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_047', difficulty: 'standard',
          question: 'Seasons change because the Earth rotates on an axis that is tilted at an angle.',
          hint: 'Review the difference between rotation (spinning) and revolution (orbiting).',
          misconception: 'Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.',
          parts: [
                { id: 'a', prompt: 'What is the specific angle at which the Earth’s axis is tilted?', answer: 'The Earth\'s axis is tilted at 23.5 degrees',
                  options: ['The Earth\'s axis is tilted at 23.5 degrees', 'summer occurs because the Earth moves closer to the Sun in its orbit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.' },
                { id: 'b', prompt: 'If the Northern Hemisphere is tilted toward the Sun, why does it experience summer?', answer: 'It experiences summer',
                  options: ['It experiences summer', 'closer', 'being "closer" to the Sun causes summer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.' },
                { id: 'c', prompt: 'If it is summer in Delhi, what season is it in a city located in the Southern Hemisphere, such as Buenos Aires?', answer: 'It would be winter',
                  options: ['It would be winter', 'summer occurs because the Earth moves closer to the Sun in its orbit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.' }
          ],
            remediations: { 'summer-occurs-because-the-earth': { steps: ['First, draw a circle representing the orbit with the Sun in the center.', 'Second, draw the Earth at two opposite sides of the orbit, always leaning the axis in the same direction (e.g., toward.', 'Third, shade the part of the Earth receiving sunlight in each position to visually demonstrate that the "leaning" side.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_047', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.',
          parts: [
                { id: 'a', prompt: 'Is the change of seasons caused by the Earth getting closer and farther from the Sun in its orbit? Explain.', answer: 'No, the distance to the Sun is not the primary cause of seasons',
                  options: ['No, the distance to the Sun is not the primary cause of seasons', 'summer occurs because the Earth moves closer to the Sun in its orbit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe summer occurs because the Earth moves closer to the Sun in its orbit.' }
          ],
            remediations: { 'summer-occurs-because-the-earth': { steps: ['First, draw a circle representing the orbit with the Sun in the center.', 'Second, draw the Earth at two opposite sides of the orbit, always leaning the axis in the same direction (e.g., toward.', 'Third, shade the part of the Earth receiving sunlight in each position to visually demonstrate that the "leaning" side.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_048', difficulty: 'standard',
          question: 'An eclipse is an astronomical event where one celestial body passes into the.',
          hint: 'Review how shadows are formed using a torch and an opaque object in a dark room.',
          misconception: 'Students often believe eclipses happen every month because the Moon orbits the Earth monthly.',
          parts: [
                { id: 'a', prompt: 'What is the position of the Moon during a solar eclipse?', answer: 'During a solar eclipse, the Moon is positioned between the Earth and the Sun',
                  options: ['During a solar eclipse, the Moon is positioned between the Earth and the Sun', 'the Sun is between the Earth and Moon', 'eclipses happen every month'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe eclipses happen every month because the Moon orbits the Earth monthly.' },
                { id: 'b', prompt: 'Why does the Moon disappear or turn dark during a lunar eclipse?', answer: 'The Moon turns dark',
                  options: ['The Moon turns dark', 'runs out of light', 'eclipses happen every month'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe eclipses happen every month because the Moon orbits the Earth monthly.' },
                { id: 'c', prompt: 'If you are standing in a location experiencing a solar eclipse, what do you see when you look at the Sun?', answer: 'You see the Moon blocking part or all of the Sun\'s light',
                  options: ['You see the Moon blocking part or all of the Sun\'s light', 'eclipses happen every month'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe eclipses happen every month because the Moon orbits the Earth monthly.' }
          ],
            remediations: { 'eclipses-happen-every-month-because': { steps: ['Take a flashlight and two balls of different sizes (one large for Earth, one small for Moon).', 'Place them on a table and move the small ball around the large ball while keeping the flashlight stationary.', 'Ask the student to tilt the path of the small ball up and down relative to the light beam.', 'Explain that unless the balls are exactly at the same "height" as the light beam, no shadow falls on the other, just.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_048', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe eclipses happen every month because the Moon orbits the Earth monthly.',
          parts: [
                { id: 'a', prompt: 'Imagine you have a torch (Sun), a small ball (Moon), and a globe (Earth). How would you arrange them to show a lunar eclipse?', answer: 'The order must be Torch -> Globe -> Ball',
                  options: ['The order must be Torch -> Globe -> Ball', 'eclipses happen every month'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe eclipses happen every month because the Moon orbits the Earth monthly.' }
          ],
            remediations: { 'eclipses-happen-every-month-because': { steps: ['Take a flashlight and two balls of different sizes (one large for Earth, one small for Moon).', 'Place them on a table and move the small ball around the large ball while keeping the flashlight stationary.', 'Ask the student to tilt the path of the small ball up and down relative to the light beam.', 'Explain that unless the balls are exactly at the same "height" as the light beam, no shadow falls on the other, just.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_050', difficulty: 'standard',
          question: 'A lunar eclipse is a celestial event that occurs when the Earth passes directly.',
          hint: 'Review the concept of how shadows are formed by opaque objects.',
          misconception: 'Students often confuse lunar and solar eclipses, thinking the Moon blocks the Sun in both.',
          parts: [
                { id: 'a', prompt: 'What three objects must be in a line for a lunar eclipse to occur?', answer: 'The Sun, the Earth, and the Moon must be in a line',
                  options: ['The Sun, the Earth, and the Moon must be in a line', 'blocker'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse lunar and solar eclipses, thinking the Moon blocks the Sun in both.' }
          ],
            remediations: { 'students-often-confuse-lunar-and': { steps: ['First, draw a straight line on a paper.', 'Label the left side "Sun," the middle "Earth," and the right side "Moon." Explain that since the Sun provides the.', 'Tell the student: "If the Earth is in the middle, it casts a shadow on the object behind it (the Moon)."'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
