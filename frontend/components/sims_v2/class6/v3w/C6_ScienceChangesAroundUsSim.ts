import type { SimDef } from '../../engine/types';
import C6_ScienceChangesAroundUsSim from '../../../simulations/c6_12/C6_ScienceChangesAroundUsSim';

/** v3 wrapped master — C6_ScienceChangesAroundUsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_sciencechangesaroundussim: SimDef = {
    id: 'v3w_c6_sciencechangesaroundussim',
    title: 'Changes Around Us',
    subtitle: 'This node covers the cause of day and night and the direction of Earth\'s rotation.',
    classLevel: 6, subject: 'science', topic: 'Rotation of the Earth: Day and Night',
    chapters: [],
    nodeIds: ['c6_physics_ch12_045', 'c6_physics_ch12_046', 'c6_physics_ch12_047', 'c6_physics_ch11_036', 'c6_physics_ch11_044', 'c6_physics_ch12_051', 'c6_physics_ch01_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Have you ever wondered why you go to bed when it’s dark and wake up when it’s bright?', goal: 'Master Changes Around Us.' },
    discovery: {
        question: 'What is the name of the imaginary line that runs through the Earth from the North Pole to the South Pole around which the Earth spins?',
        options: ['The line is called the axis', 'the Equator', 'the sun rises and sets'],
        answer: 'The line is called the axis',
        hook: 'Students often believe the Sun moves around the Earth because of the common phrase "the sun rises and sets." They.',
    },
    teaching: [
        { title: 'The Earth’s rotation is the spinning motion.', text: 'The Earth’s rotation is the spinning motion of our planet around an imaginary central line called its axis, which connects the North Pole to the South Pole.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c6_physics_ch11_036', title: 'Light is a form of energy that travels.',
          scaffold: { problem: 'You have a 50 cm ruler. You place a tall bottle 10 cm from a wall and a torch 20 cm from the bottle. Why do you see a shadow?',
            steps: [
            { text: 'Identify the source (torch), the object (bottle), and the screen (wall).' },
            { text: 'Recognize that light travels in straight lines from the torch.' },
            { text: 'Note that the bottle is an opaque object blocking the light path.' },
            { text: 'Conclude that the area behind the bottle receives no light.', faded: true, blankAnswer: 'A shadow is formed because the bottle blocks the straight.' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_physics_ch11_044', title: 'Optical instruments are devices that.',
          scaffold: { problem: 'A scientist wants to study the surface of a leaf to find tiny pores. She also wants to look at the moons of Jupiter.',
            steps: [
            { text: 'Identify the two tasks: seeing tiny pores on a leaf and seeing distant moons.' },
            { text: 'Determine the tool for the leaf: A microscope is needed for magnification of very small biological objects.' },
            { text: 'Determine the tool for the moons: A telescope is needed to magnify distant objects.' },
            { text: 'Conclude: She needs a microscope for the leaf and a telescope for the moons.', faded: true, blankAnswer: 'Microscope and Telescope.' }
            ] } },
        { type: 'case', nodeId: 'c6_physics_ch12_051', title: 'The phases of the Moon are the.',
          caseStudy: { intro: 'Have you ever noticed how the Moon sometimes looks like a thin silver slice, a half-circle, or a bright glowing ball, even though it is always the same round.',
            decisions: [{ prompt: 'Why does the Moon appear to change its shape throughout the month?', options: [
                { text: 'The Moon appears to change shape', outcome: 'The Moon appears to change shape because it orbits the Earth, and our view of the side lit by the.' },
                { text: 'the phases are caused by the Earth\'s shadow falling on the Moon', outcome: 'Not quite — Students often believe the phases are caused by the Earth\'s shadow falling on the Moon.', reveals: 'the-phases-are-caused-by' }
            ] }] } }
    ],
    explore: { component: C6_ScienceChangesAroundUsSim, prompt: 'Explore the interactive — Changes Around Us' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c6_physics_ch12_046', difficulty: 'standard',
          question: 'The revolution of the Earth is its movement in an elliptical orbit around the.',
          hint: 'Review the definition of the Solar System and the movement of planets.',
          misconception: 'Students often confuse the Earth\'s *rotation* (spinning on its axis, causing day/night) with *revolution* (orbiting the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The revolution of the Earth is its movement in an elliptical orbit around the Sun',
                  options: ['The revolution of the Earth is its movement in an elliptical orbit around the Sun', 'The Earth’s rotation is the spinning motion of our planet around an imaginary central', 'Seasons change because the Earth rotates on an axis that is tilted at an angle of 23.5', 'Light is a form of energy that travels in a straight line, known as rectilinear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the Earth\'s *rotation* (spinning on its axis, causing day/night) with *revolution* (orbiting the Sun, causing the.' }
          ],
            remediations: { 'students-often-confuse-the-earth': { steps: ['Ask the student to draw a circle representing the Sun and a path around it.', 'Label the full path as "Revolution" (1 year) and the spinning motion of the Earth on its own center as "Rotation" (1.', 'Explain that the leap year only deals with the "Revolution" timer, not the "Rotation" timer.'] } } },
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
        { type: 'subpart', nodeId: 'c6_physics_ch11_036', difficulty: 'standard',
          question: 'Light is a form of energy that travels in a straight line, known as rectilinear.',
          hint: 'Review the "straight pipe" activity in Chapter 11.',
          misconception: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.',
          parts: [
                { id: 'a', prompt: 'What happens to light when it encounters an obstacle?', answer: 'Light is blocked by the obstacle, creating a shadow on the other side',
                  options: ['Light is blocked by the obstacle, creating a shadow on the other side', 'light "fills" a room like water fills a bucket, assuming it can go anywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.' },
                { id: 'b', prompt: 'If you hold a straight pipe and a curved pipe to look at a candle, which one allows you to see the flame and why?', answer: 'Only the straight pipe works',
                  options: ['Only the straight pipe works', 'light "fills" a room like water fills a bucket, assuming it can go anywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.' },
                { id: 'c', prompt: 'A light source is placed in front of a circular ball. If the ball is moved closer to the wall behind it, what happens to the size of the shadow?', answer: 'The shadow size decreases (or becomes sharper)',
                  options: ['The shadow size decreases (or becomes sharper)', 'of blocked light rays', 'light "fills" a room like water fills a bucket, assuming it can go anywhere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe light "fills" a room like water fills a bucket, assuming it can go anywhere.' }
          ],
            remediations: { 'light-fills-a-room-like': { steps: ['First, ask the student to trace a line from a light source to a wall using a ruler.', 'Then, place a pencil in the middle of that line and ask, "Where does the light go now?" Guide them to see that the.', 'Repeat this with a sheet of paper to show that the shadow is exactly the shape of the part of the paper blocking the.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_044', difficulty: 'standard',
          question: 'Optical instruments are devices that use lenses or mirrors to manipulate light,.',
          hint: 'Review the chapter on how mirrors and lenses change the direction of light.',
          misconception: 'Students often think "magnification" is the only purpose of optical instruments.',
          parts: [
                { id: 'a', prompt: 'If you want to see the specific colors that make up a beam of sunlight, which optical instrument would you choose?', answer: 'You would use a spectroscope',
                  options: ['You would use a spectroscope', 'magnification', '"magnification" is the only purpose of optical instruments'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "magnification" is the only purpose of optical instruments.' }
          ],
            remediations: { 'magnification-is-the-only-purpose': { steps: ['First, ask the student to describe what a "rainbow" is and how it relates to white light.', 'Second, explain that light can be "spread out" or "analyzed" just as easily as it can be "zoomed in." Use the analogy.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch11_044', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "magnification" is the only purpose of optical instruments.',
          parts: [
                { id: 'a', prompt: 'Could a telescope be used to identify the component colors of a distant star\'s light?', answer: 'Yes, but only if it is fitted with a spectroscope',
                  options: ['Yes, but only if it is fitted with a spectroscope', 'magnification', '"magnification" is the only purpose of optical instruments'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "magnification" is the only purpose of optical instruments.' }
          ],
            remediations: { 'magnification-is-the-only-purpose': { steps: ['First, ask the student to describe what a "rainbow" is and how it relates to white light.', 'Second, explain that light can be "spread out" or "analyzed" just as easily as it can be "zoomed in." Use the analogy.'] } } },
        { type: 'subpart', nodeId: 'c6_physics_ch12_051', difficulty: 'standard',
          question: 'The phases of the Moon are the different shapes of the Moon\'s illuminated.',
          hint: 'Review the concept of light reflection from Chapter 12.',
          misconception: 'Students often believe the phases are caused by the Earth\'s shadow falling on the Moon.',
          parts: [
                { id: 'a', prompt: 'Why does the Moon appear to change its shape throughout the month?', answer: 'The Moon appears to change shape',
                  options: ['The Moon appears to change shape', 'the phases are caused by the Earth\'s shadow falling on the Moon'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the phases are caused by the Earth\'s shadow falling on the Moon.' },
                { id: 'b', prompt: 'If the Moon takes 29.5 days to complete its cycle, how long do you think it takes to go from a New Moon to a First Quarter phase?', answer: 'It takes approximately 7.4 days (one-fourth of the cycle)',
                  options: ['It takes approximately 7.4 days (one-fourth of the cycle)', 'the phases are caused by the Earth\'s shadow falling on the Moon'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the phases are caused by the Earth\'s shadow falling on the Moon.' },
                { id: 'c', prompt: 'Compare the Moon to a mirror. Is this a good comparison for why we see lunar phases?', answer: 'Yes, because the Moon reflects sunlight just as a mirror reflects light',
                  options: ['Yes, because the Moon reflects sunlight just as a mirror reflects light', 'the phases are caused by the Earth\'s shadow falling on the Moon'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the phases are caused by the Earth\'s shadow falling on the Moon.' }
          ],
            remediations: { 'the-phases-are-caused-by': { steps: ['First, ask the student to draw a diagram with a large circle (Sun) and a smaller circle (Moon) showing how sunlight.', 'Then, have them place an \'X\' on the Moon\'s surface and rotate it around a model of the Earth, noting when the \'X\' is.', 'This visual transition helps them see that it is the *position* of the Moon that changes our *perspective* of the lit.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
