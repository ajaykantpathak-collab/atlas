import type { SimDef } from '../../engine/types';

/** v3 generated — c7_physics_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_physics_ch06_p1: SimDef = {
    id: 'v3_c7_physics_ch06_p1',
    title: 'Earth, Moon, and the Sun · Part 1/2',
    subtitle: 'Covers the daily rotation of the Earth on its axis and the resulting day and night cycle.',
    classLevel: 7, subject: 'physics', topic: 'Earth, Moon, and the Sun · Part 1/2',
    chapters: ['c7_physics_ch06'],
    nodeIds: ['c7_physics_ch06_001', 'c7_physics_ch06_002', 'c7_physics_ch06_003', 'c7_physics_ch06_004', 'c7_physics_ch06_005', 'c7_physics_ch06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Observe how a ceiling fan spins around a fixed central metal rod in your classroom.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'It is noon in India — bright sun overhead — while on the far side of the planet it is midnight. Why can the whole Earth never share daytime at once?',
        options: ['Earth is an opaque spinning sphere — sunlight lights only the half facing it, and rotation carries each side through light and dark in 24 hours', 'Because the Sun is too small to light the whole planet', 'Because clouds cover half the Earth always', 'Because night is a shadow cast by the Moon'],
        answer: 'Earth is an opaque spinning sphere — sunlight lights only the half facing it, and rotation carries each side through light and dark in 24 hours',
        hook: 'The Sun does not travel under the Earth at night — we spin. Earth rotates west to east, turning 360 degrees in 24 hours — a steady 15 degrees every hour. Stop the spin and one hemisphere would burn in endless day while the other froze in endless night.',
    },
    teaching: [
        { title: 'Rotation of the Earth: Day and Night Cycle', text: 'The rotation of the Earth is the spinning of the Earth on its imaginary axis from west to east, completing one full rotation in approximately 24 hours, which causes the cycle of day and night.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_physics_ch06_001', title: 'Your mission',
          mission: { widget: 'orbit', validate: 'orbit:speed=50',
            instruction: 'On the lab: raise the orbital speed to 50 — does the orbit hold?.',
        context: 'Take a ball and a torch in a dark room — spin the ball slowly, watch day chase night around it — then compute how many degrees your spot on Earth turns each hour.',
            observePrompt: 'What did the orbit interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_physics_ch06_001', title: 'Rotation of the Earth: Day and Night Cycle',
          scaffold: { problem: 'A point on the Earth\'s equator travels a distance of approximately 40,075 km during one complete rotation of 24 hours.',
            steps: [
            { text: 'Identify given values: Distance $d = 40,075\\text{ km}$, Time $t = 24\\text{ hours}$, and what to find: Speed $v$.' },
            { text: 'Identify the formula: $v = \\frac{d}{t}$ and check that units are compatible ($\\text{km}$ and $\\text{hours}$).' },
            { text: 'Substitute the values into the formula with units: $v = \\frac{40,075\\text{ km}}{24\\text{ hours}}$.' },
            { text: 'Perform the computation and track unit cancellation: $v = 1669.79\\text{ km/h}$.' },
            { text: 'Verify the answer is physically reasonable: The Earth is very large, so spinning once a day means equatorial points.', faded: true, blankAnswer: '1669.79 km/h' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch06_002', title: 'Apparent Movement of the Sun Across the Sky',
          scaffold: { problem: 'A student in New Delhi observes that the Sun travels an apparent angular distance of $105^\\circ$ across the sky during a clear morning.',
            steps: [
            { text: 'Identify given values with units: Total angular displacement ($\\Delta\\theta$) = $105^\\circ$, Start time = 7:00 AM, End.' },
            { text: 'Calculate the total time interval ($\\Delta t$) by counting hours from 7:00 AM to 2:00 PM: 7 hours.' },
            { text: 'Write down the formula for angular speed: $S = \\frac{\\Delta\\theta}{\\Delta t}$.' },
            { text: 'Substitute the values into the formula with units: $S = \\frac{105^\\circ}{7\\text{ h}}$.' },
            { text: 'Compute the final value with unit tracking: $S = 15^\\circ/\\text{h}$, which matches the expected steady rate of Earth\'s.', faded: true, blankAnswer: '15 °/h' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch06_003', title: 'Revolution of the Earth: Orbit Around the Sun',
          scaffold: { problem: 'The Earth travels in an approximately circular orbit of radius $1.5 \\times 10^8 \\text{ km}$ around the Sun.',
            steps: [
            { text: 'Identify given values: radius $r = 1.5 \\times 10^8 \\text{ km} = 150,000,000 \\text{ km}$, speed $v = 30 \\text{ km/s}$.' },
            { text: 'Identify the formula for the circumference of the orbit $C = 2 \\pi r$ and time $T = \\frac{C}{v}$.' },
            { text: 'Substitute values to find circumference: $C = 2 \\times 3 \\times 150,000,000 \\text{ km} = 900,000,000 \\text{ km}$.' },
            { text: 'Substitute circumference and speed into the time formula: $T = \\frac{900,000,000 \\text{ km}}{30 \\text{ km/s}}$.' },
            { text: 'Compute and track unit cancellation: $T = 30,000,000 \\text{ s}$ (the km units cancel out, leaving seconds in the.', faded: true, blankAnswer: '30,000,000 s (approximately 365 days)' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch06_004', title: 'Changing View of the Night Sky Due to Revolution',
          scaffold: { problem: 'An astronomy club in Delhi observes a particular constellation directly overhead at midnight on October 1st.',
            steps: [
            { text: 'Identify given values: rate $R = 0.986^\\circ/\\text{day}$, time $t = 90\\text{ days}$.' },
            { text: 'Select the formula relating angular shift, rate, and time: $\\theta = R \\times t$.' },
            { text: 'Substitute the given values into the formula: $\\theta = 0.986^\\circ/\\text{day} \\times 90\\text{ days}$.' },
            { text: 'Perform the multiplication: $0.986 \\times 90 = 88.74$. Track unit cancellation: days cancel out, leaving degrees.' },
            { text: 'Verify the answer is physically reasonable ($88.74^\\circ$ is roughly a quarter of a full $360^\\circ$ circle, which.', faded: true, blankAnswer: '$88.74^\\circ$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch06_005', title: 'Seasons on the Earth: Causes and Explanation',
          scaffold: { problem: 'A school in Mumbai ($19^\\circ\\text{ N}$) measures the noon sun angle on June 21st and December 21st.',
            steps: [
            { text: 'Identify the given values with units: June 21st solar altitude $\\theta_{\\text{June}} = 87.5^\\circ$, December 21st solar.' },
            { text: 'Identify the formula/operation: Find the difference in angles ($\\Delta \\theta = \\theta_{\\text{June}}.' },
            { text: 'Substitute values with units: $\\Delta \\theta = 87.5^\\circ - 47.5^\\circ$.' },
            { text: 'Compute the difference with unit tracking: $\\Delta \\theta = 40.0^\\circ$.' },
            { text: 'Verify physical reasonableness: A $40^\\circ$ shift in noon sun angle is physically reasonable for tropical and.', faded: true, blankAnswer: '$40.0^\\circ$ difference in solar altitude.' }
            ] } },
        { type: 'case', nodeId: 'c7_physics_ch06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'During a video call at lunchtime, Vani\'s cousin in America says it is midnight there. Vani\'s little brother objects: \'The sun must have moved under the Earth to reach them — that is where it goes at night.\'',
            decisions: [{ prompt: 'What actually explains the noon-midnight split?', options: [
                { text: 'The sun stays put; Earth spins west to east on its axis, so the half facing the sun has day while the opposite half sits in Earth\'s own shadow — as India rotates into the light, the other side rotates out of it. One rotation takes about 24 hours.', outcome: 'This swaps apparent motion for real motion: the daily cycle is Earth\'s spin carrying us in and out of sunlight, not the sun travelling around us.' },
                { text: 'The brother is right — every night the sun slips underneath the Earth and re-emerges in the east by morning.', outcome: 'That is a geocentric picture; the spinning-chair illusion makes a stationary sun seem to move, but it is our rotation that carries us away from it.', reveals: 'sun-goes-underneath' },
                { text: 'They are both partly right — it is midnight in America because clouds there are blocking the sun, and it will clear by their morning.', outcome: 'Night is not weather cover; it is the geometric shadow cast by an opaque, rotating Earth — half the planet is always dark.', reveals: 'night-is-clouds' }
            ] }] } },
        { type: 'case', nodeId: 'c7_physics_ch06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Day and night are not the Sun coming and going — they are you, riding a spinning planet through a beam of light.',
            decisions: [{ prompt: 'What comes next? Earth, Moon, and the Sun · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Earth, Moon, and the Sun · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'orbit', prompt: 'Explore the orbit interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'orbit', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch06_001', difficulty: 'standard',
          question: 'The rotation of the Earth is the spinning of the Earth on its imaginary axis.',
          hint: 'Review how light travels in straight lines and how shadows are cast by opaque objects.',
          misconception: 'Students often think that the Sun revolves around a stationary Earth every day, which creates day and night, because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The rotation of the Earth is the spinning of the Earth on its imaginary axis from west to',
                  options: ['The rotation of the Earth is the spinning of the Earth on its imaginary axis from west to', 'The apparent movement of the Sun across the sky refers to the daily east-to-west motion', 'The revolution of the Earth is the movement of the Earth in a nearly circular or', 'The changing view of the night sky due to revolution is the apparent shift in visible'],
                  hint: 'Review how light travels in straight lines and how shadows are cast by opaque objects.',
                  misconception: 'Students often think that the Sun revolves around a stationary Earth every day, which creates day and night, because they rely purely.' }
          ],
            remediations: { 'the-sun-revolves-around-a': { steps: ['To fix this misconception, take a spinning office chair and sit on it while looking at a stationary lamp across the.', 'As someone spins the chair slowly, notice how the lamp appears to move across your field of view and disappear behind.', 'Relate this directly to standing on the Earth: you are on a spinning platform (Earth), which makes a stationary light.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_002', difficulty: 'standard',
          question: 'The apparent movement of the Sun across the sky refers to the daily.',
          hint: 'Review c7_physics_ch06_001 to reinforce how Earth\'s rotation creates day and night before.',
          misconception: 'Students often believe that the Sun is physically moving across the sky while the Earth remains completely still at the.',
          parts: [
                { id: 'a', prompt: 'What is the apparent direction of the Sun\'s daily movement across the sky when viewed from Earth?', answer: 'The Sun appears to move from east to west',
                  options: ['The Sun appears to move from east to west', 'west to east'],
                  hint: 'Review c7_physics_ch06_001 to reinforce how Earth\'s rotation creates day and night before.',
                  misconception: 'Students often believe that the Sun is physically moving across the sky while the Earth remains completely still at the center of the.' },
                { id: 'b', prompt: 'Why does the Sun appear to rise in the east and set in the west if the Earth is spinning? Explain the physical reason.', answer: 'The Sun appears to move in the opposite direction of Earth\'s rotation',
                  options: ['The Sun appears to move in the opposite direction of Earth\'s rotation', 'the Sun revolves around the Earth'],
                  hint: 'Review c7_physics_ch06_001 to reinforce how Earth\'s rotation creates day and night before.',
                  misconception: 'Students often believe that the Sun is physically moving across the sky while the Earth remains completely still at the center of the.' }
          ],
            remediations: { 'the-sun-is-physically-moving': { steps: ['To fix this, have the student sit on a swivel chair or spin slowly in a circle while looking at a stationary lamp.', 'Point out that even though the chair is spinning, the lamp appears to sweep past their field of view in the opposite.', 'Connect this directly to how Earth\'s eastward spin creates the illusion of a westward-moving Sun.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_003', difficulty: 'standard',
          question: 'The revolution of the Earth is the movement of the Earth in a nearly circular.',
          hint: 'Review c7_physics_ch06_001 to solidify the difference between spinning on an axis versus.',
          misconception: 'Students frequently confuse Earth\'s rotation (spinning on its axis) with its revolution (orbiting the Sun), often.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The revolution of the Earth is the movement of the Earth in a nearly circular or',
                  options: ['The revolution of the Earth is the movement of the Earth in a nearly circular or', 'The rotation of the Earth is the spinning of the Earth on its imaginary axis from west to', 'The apparent movement of the Sun across the sky refers to the daily east-to-west motion', 'The changing view of the night sky due to revolution is the apparent shift in visible'],
                  hint: 'Review c7_physics_ch06_001 to solidify the difference between spinning on an axis versus travelling.',
                  misconception: 'Students frequently confuse Earth\'s rotation (spinning on its axis) with its revolution (orbiting the Sun), often believing that day and.' }
          ],
            remediations: { 'students-frequently-confuse-earth-s': { steps: ['To fix this misconception, take a globe and first spin it in place while holding a torch stationary to show how light.', 'Then, walk the spinning globe in a large circle around the torch (Revolution/Year).', 'Emphasize that spinning on the spot creates the 24-hour day, while traveling around the central light creates the.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_004', difficulty: 'standard',
          question: 'The changing view of the night sky due to revolution is the apparent shift.',
          hint: 'Review c7_physics_ch06_003 to reinforce the shape and timeline of Earth\'s orbit.',
          misconception: 'Students often think that stars change position in the night sky because the stars themselves are physically moving.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The changing view of the night sky due to revolution is the apparent shift in visible',
                  options: ['The changing view of the night sky due to revolution is the apparent shift in visible', 'The rotation of the Earth is the spinning of the Earth on its imaginary axis from west to', 'The apparent movement of the Sun across the sky refers to the daily east-to-west motion', 'The revolution of the Earth is the movement of the Earth in a nearly circular or'],
                  hint: 'Review c7_physics_ch06_003 to reinforce the shape and timeline of Earth\'s orbit.',
                  misconception: 'Students often think that stars change position in the night sky because the stars themselves are physically moving or orbiting around the.' }
          ],
            remediations: { 'stars-change-position-in-the': { steps: ['Have the student stand in the center of a classroom with distinctive posters on the walls.', 'Tell them to spin in place (representing rotation) and then walk in a large circle around a desk while keeping their.', 'Ask them to notice how walking around the circle changes which posters are in front of them versus behind them, proving.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_005', difficulty: 'standard',
          question: 'Seasons on Earth are repeating periods of the year characterized by distinct.',
          hint: 'Review node c7_physics_ch06_010 (Earth\'s Axis and Its Tilt: Significance) to reinforce.',
          misconception: 'Students often believe that Earth experiences summer when it is physically closer to the Sun and winter when it.',
          parts: [
                { id: 'a', prompt: 'What is the angle of Earth\'s axial tilt relative to the plane of its orbit around the Sun?', answer: 'Earth\'s axis is tilted at an angle of $23.5^\\circ$',
                  options: ['Earth\'s axis is tilted at an angle of $23.5^\\circ$', 'Earth stands straight up and down, missing the primary reason we have seasons'],
                  hint: 'Review node c7_physics_ch06_010 (Earth\'s Axis and Its Tilt: Significance) to reinforce how the tilt.',
                  misconception: 'Students often believe that Earth experiences summer when it is physically closer to the Sun and winter when it is farther away, confusing.' }
          ],
            remediations: { 'earth-experiences-summer-when-it': { steps: ['To fix this misconception, have the student hold a globe with a tilted axis and move it around a central lamp in a dark.', 'Ask them to measure the distance from the lamp to the Northern Hemisphere versus the Southern Hemisphere at different.', 'Point out that the distance difference from the Sun is tiny compared to the total distance, but the angle at which the.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_006', difficulty: 'standard',
          question: 'An eclipse occurs when one celestial body moves into the shadow of another.',
          hint: 'Review shadow formation properties in c6_physics_ch11_038 and Moon phases.',
          misconception: 'Students often think that eclipses happen every month because the Moon orbits Earth regularly, confusing the monthly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An eclipse occurs when one celestial body moves into the shadow of another',
                  options: ['An eclipse occurs when one celestial body moves into the shadow of another', 'The rotation of the Earth is the spinning of the Earth on its imaginary axis from west to', 'The apparent movement of the Sun across the sky refers to the daily east-to-west motion', 'The revolution of the Earth is the movement of the Earth in a nearly circular or'],
                  hint: 'Review shadow formation properties in c6_physics_ch11_038 and Moon phases in c7_physics_ch06_009.',
                  misconception: 'Students often think that eclipses happen every month because the Moon orbits Earth regularly, confusing the monthly lunar cycle with the.' }
          ],
            remediations: { 'eclipses-happen-every-month-because': { steps: ['To fix this, take two circular hoops or rings (like a bangle and a hula hoop) and tilt one inside the other at a slight.', 'Shine a flashlight through them to show that light beams only intersect or project shadows onto the inner ring when the.'], labTask: { instruction: 'On the interactive: raise the orbital speed to 50 — does the orbit hold? — then check.', widget: 'orbit', validate: 'orbit:speed=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
