import type { SimDef } from '../../engine/types';
import C7_ScienceEarthMoonAndTheSunSim from '../../../simulations/c6_12/C7_ScienceEarthMoonAndTheSunSim';

/** v3 wrapped master — C7_ScienceEarthMoonAndTheSunSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_scienceearthmoonandthesunsim: SimDef = {
    id: 'v3w_c7_scienceearthmoonandthesunsim',
    title: 'Earth Moon And The Sun',
    subtitle: 'Covers the geometric and orbital conditions necessary for solar and lunar eclipses,.',
    classLevel: 7, subject: 'science', topic: 'Eclipses: Conditions for Occurrence',
    chapters: [],
    nodeIds: ['c7_physics_ch06_006', 'c7_physics_ch06_007', 'c7_physics_ch06_008', 'c7_physics_ch06_009', 'c7_physics_ch06_001', 'c7_physics_ch06_002', 'c7_physics_ch06_003', 'c7_physics_ch06_004', 'c7_physics_ch06_005', 'c7_physics_ch06_010', 'c7_physics_ch03_006', 'c7_physics_ch03_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'When you hold a small ball between a table lamp and a wall, you can easily make a shadow on the wall, but.', goal: 'Master Earth Moon And The Sun.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'An eclipse occurs when one celestial body.', text: 'An eclipse occurs when one celestial body moves into the shadow of another, which requires a precise alignment of the Sun, Earth, and Moon in a nearly straight line.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_physics_ch06_006', title: 'An eclipse occurs when one celestial.',
          scaffold: { problem: 'A student observes that during a particular year, the Moon crosses Earth\'s orbital plane (the node) exactly during a new moon phase in the.',
            steps: [
            { text: 'Identify given information: Node crossings happen in March and September, which are separated by approximately 6 months.' },
            { text: 'Identify the relationship between lunar months and eclipse seasons: Eclipse seasons occur roughly every 6 months (half.' },
            { text: 'Compute the approximate number of days for half a year: $6 \\text{ months} \\times 30 \\text{ days/month} = 180 \\text{.' },
            { text: 'Track unit cancellation: $\\text{months} \\times (\\text{days} / \\text{month}) = \\text{days}$.' },
            { text: 'Verify physical reasonableness: 180 days represents roughly half of Earth\'s 365-day revolution, which is correct for.', faded: true, blankAnswer: '180 days' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch06_007', title: 'A solar eclipse is an astronomical.',
          scaffold: { problem: 'During a solar observation in India, a student notes that the shadow cast by the Moon on Earth has a dark central region of diameter.',
            steps: [
            { text: 'Identify the given values with units: Penumbra diameter = $300\\text{ km}$, Umbra diameter = $100\\text{ km}$.' },
            { text: 'Identify the operation needed to find the difference in shadow sizes.' },
            { text: 'Substitute the values into the equation: $\\text{Difference} = 300\\text{ km} - 100\\text{ km}$.' },
            { text: 'Perform the subtraction, tracking unit preservation: $300\\text{ km} - 100\\text{ km} = 200\\text{ km}$.' },
            { text: 'Verify that the result is physically reasonable and state with units ($200\\text{ km}$).', faded: true, blankAnswer: '$200\\text{ km}$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch06_008', title: 'A lunar eclipse is an astronomical.',
          scaffold: { problem: 'During a lunar eclipse observation at an observatory in Jaipur, an astronomer notes that the Moon enters the penumbra at 21:00 hours and.',
            steps: [
            { text: 'Identify initial time ($t_1 = 21:00$ hours) and final time ($t_2 = 22:30$ hours) with units.' },
            { text: 'Find the difference in hours and minutes: $22\\text{ hr } 30\\text{ min} - 21\\text{ hr } 00\\text{ min} = 1\\text{ hour and.' },
            { text: 'Convert hours into minutes: $1\\text{ hr} \\times 60\\text{ min/hr} = 60\\text{ min}$, then add the remaining $30\\text{.' },
            { text: 'Convert minutes into seconds by multiplying by 60: $90\\text{ min} \\times 60\\text{ s/min} = 5,400\\text{ seconds}$.' },
            { text: 'Verify the physical reasonableness: 1.5 hours equals 5,400 seconds, which is correct and properly formatted with SI.', faded: true, blankAnswer: '5,400 s' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch06_009', title: 'The phases of the moon are the.',
          scaffold: { problem: 'A satellite orbiting the Moon takes roughly 7 days to travel from the New Moon position to the First Quarter position.',
            steps: [
            { text: 'Identify given time elapsed ($t = 7\\text{ days}$) and total cycle duration ($T = 29.5\\text{ days}$).' },
            { text: 'Set up the ratio of elapsed time to total cycle time: $\\text{Fraction} = \\frac{t}{T}$.' },
            { text: 'Substitute the numerical values with units: $\\text{Fraction} = \\frac{7\\text{ days}}{29.5\\text{ days}}$.' },
            { text: 'Compute the decimal value and track unit cancellation (days cancel out): $\\frac{7}{29.5} \\approx 0.2373$.' },
            { text: 'Convert to percentage by multiplying by 100%: $0.2373 \\times 100\\% = 23.73\\%$, which is physically reasonable for.', faded: true, blankAnswer: '7 days is approximately 23.73% of the 29.5-day lunar cycle.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch06_001', title: 'The rotation of the Earth is the.',
          scaffold: { problem: 'A point on the Earth\'s equator travels a distance of approximately 40,075 km during one complete rotation of 24 hours.',
            steps: [
            { text: 'Identify given values: Distance $d = 40,075\\text{ km}$, Time $t = 24\\text{ hours}$, and what to find: Speed $v$.' },
            { text: 'Identify the formula: $v = \\frac{d}{t}$ and check that units are compatible ($\\text{km}$ and $\\text{hours}$).' },
            { text: 'Substitute the values into the formula with units: $v = \\frac{40,075\\text{ km}}{24\\text{ hours}}$.' },
            { text: 'Perform the computation and track unit cancellation: $v = 1669.79\\text{ km/h}$.' },
            { text: 'Verify the answer is physically reasonable: The Earth is very large, so spinning once a day means equatorial points.', faded: true, blankAnswer: '1669.79 km/h' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch06_002', title: 'The apparent movement of the Sun across.',
          scaffold: { problem: 'A student in New Delhi observes that the Sun travels an apparent angular distance of $105^\\circ$ across the sky during a clear morning.',
            steps: [
            { text: 'Identify given values with units: Total angular displacement ($\\Delta\\theta$) = $105^\\circ$, Start time = 7:00 AM, End.' },
            { text: 'Calculate the total time interval ($\\Delta t$) by counting hours from 7:00 AM to 2:00 PM: 7 hours.' },
            { text: 'Write down the formula for angular speed: $S = \\frac{\\Delta\\theta}{\\Delta t}$.' },
            { text: 'Substitute the values into the formula with units: $S = \\frac{105^\\circ}{7\\text{ h}}$.' },
            { text: 'Compute the final value with unit tracking: $S = 15^\\circ/\\text{h}$, which matches the expected steady rate of Earth\'s.', faded: true, blankAnswer: '15 °/h' }
            ] } },
        { type: 'dissect', nodeId: 'c7_physics_ch06_007', title: 'Identify each idea',
          dissect: { specimen: 'Earth Moon And The Sun', spots: [
            { id: 's1', label: 'An eclipse occurs when one', prompt: 'Which idea is this? — An eclipse occurs when one celestial body moves into the shadow of another, which.', answer: 'An eclipse occurs when one', options: ['An eclipse occurs when one', 'A solar eclipse is an', 'A lunar eclipse is an', 'The phases of the moon'] },
            { id: 's2', label: 'A solar eclipse is an', prompt: 'Which idea is this? — A solar eclipse is an astronomical phenomenon that occurs when the Moon passes directly.', answer: 'A solar eclipse is an', options: ['A solar eclipse is an', 'An eclipse occurs when one', 'A lunar eclipse is an', 'The phases of the moon'] },
            { id: 's3', label: 'A lunar eclipse is an', prompt: 'Which idea is this? — A lunar eclipse is an astronomical event that occurs when the Earth passes directly.', answer: 'A lunar eclipse is an', options: ['A lunar eclipse is an', 'An eclipse occurs when one', 'A solar eclipse is an', 'The phases of the moon'] },
            { id: 's4', label: 'The phases of the moon', prompt: 'Which idea is this? — The phases of the moon are the different shapes of the illuminated portion of the Moon as.', answer: 'The phases of the moon', options: ['The phases of the moon', 'An eclipse occurs when one', 'A solar eclipse is an', 'A lunar eclipse is an'] },
            { id: 's5', label: 'The rotation of the Earth', prompt: 'Which idea is this? — The rotation of the Earth is the spinning of the Earth on its imaginary axis from west to.', answer: 'The rotation of the Earth', options: ['The rotation of the Earth', 'An eclipse occurs when one', 'A solar eclipse is an', 'A lunar eclipse is an'] },
            { id: 's6', label: 'The apparent movement of the', prompt: 'Which idea is this? — The apparent movement of the Sun across the sky refers to the daily east-to-west motion.', answer: 'The apparent movement of the', options: ['The apparent movement of the', 'An eclipse occurs when one', 'A solar eclipse is an', 'A lunar eclipse is an'] }
          ] } }
    ],
    explore: { component: C7_ScienceEarthMoonAndTheSunSim, prompt: 'Explore the interactive — Earth Moon And The Sun' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch06_006', difficulty: 'standard',
          question: 'An eclipse occurs when one celestial body moves into the shadow of another,.',
          hint: 'Review shadow formation properties in c6_physics_ch11_038 and Moon phases in.',
          misconception: 'Students often think that eclipses happen every month because the Moon orbits Earth regularly, confusing the monthly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An eclipse occurs when one celestial body moves into the shadow of another',
                  options: ['An eclipse occurs when one celestial body moves into the shadow of another', 'A solar eclipse is an astronomical phenomenon that occurs when the Moon passes directly', 'A lunar eclipse is an astronomical event that occurs when the Earth passes directly', 'The phases of the moon are the different shapes of the illuminated portion of the Moon as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that eclipses happen every month because the Moon orbits Earth regularly, confusing the monthly lunar cycle with the.' }
          ],
            remediations: { 'eclipses-happen-every-month-because': { steps: ['To fix this, take two circular hoops or rings (like a bangle and a hula hoop) and tilt one inside the other at a slight.', 'Shine a flashlight through them to show that light beams only intersect or project shadows onto the inner ring when the.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_007', difficulty: 'standard',
          question: 'A solar eclipse is an astronomical phenomenon that occurs when the Moon passes.',
          hint: 'Review shadow formation and straight-line light propagation in Class 6 Light topics.',
          misconception: 'Students often think that a solar eclipse occurs every single month because the Moon orbits Earth monthly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A solar eclipse is an astronomical phenomenon that occurs when the Moon passes directly',
                  options: ['A solar eclipse is an astronomical phenomenon that occurs when the Moon passes directly', 'An eclipse occurs when one celestial body moves into the shadow of another', 'A lunar eclipse is an astronomical event that occurs when the Earth passes directly', 'The phases of the moon are the different shapes of the illuminated portion of the Moon as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a solar eclipse occurs every single month because the Moon orbits Earth monthly.' }
          ],
            remediations: { 'a-solar-eclipse-occurs-every': { steps: ['To fix this misconception, hold a globe and move a smaller ball in a tilted circle around it relative to a desk lamp.', 'Show that unless the smaller ball crosses the exact horizontal plane of the lamp and globe, its shadow misses the globe.', 'Emphasize that this tilt is why eclipses are rare events.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that a solar eclipse occurs every single month because the Moon orbits Earth monthly.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "An annular solar eclipse happens when the Moon is closest to Earth (perigee) and blocks the entire Sun." Is this statement correct or.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'a solar eclipse occurs every single month'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that a solar eclipse occurs every single month because the Moon orbits Earth monthly.' }
          ],
            remediations: { 'a-solar-eclipse-occurs-every': { steps: ['To fix this misconception, hold a globe and move a smaller ball in a tilted circle around it relative to a desk lamp.', 'Show that unless the smaller ball crosses the exact horizontal plane of the lamp and globe, its shadow misses the globe.', 'Emphasize that this tilt is why eclipses are rare events.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_008', difficulty: 'standard',
          question: 'A lunar eclipse is an astronomical event that occurs when the Earth passes.',
          hint: 'Review shadow properties and straight-line light travel from Class 6 light chapters.',
          misconception: 'Students frequently confuse a lunar eclipse with a solar eclipse by swapping the positions of the Earth and the Moon.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A lunar eclipse is an astronomical event that occurs when the Earth passes directly',
                  options: ['A lunar eclipse is an astronomical event that occurs when the Earth passes directly', 'An eclipse occurs when one celestial body moves into the shadow of another', 'A solar eclipse is an astronomical phenomenon that occurs when the Moon passes directly', 'The phases of the moon are the different shapes of the illuminated portion of the Moon as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently confuse a lunar eclipse with a solar eclipse by swapping the positions of the Earth and the Moon.' }
          ],
            remediations: { 'students-frequently-confuse-a-lunar': { steps: ['To fix this, take a torch (Sun) and hold a small ball (Earth) in front of it in a dark room.', 'Place a second, smaller ball (Moon) behind the Earth so that the Earth\'s shadow falls directly on the Moon.', 'Feel the warmth of the torch on the Earth model, and observe that the Moon is safely behind the Earth, hidden in its.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_009', difficulty: 'standard',
          question: 'The phases of the moon are the different shapes of the illuminated portion of.',
          hint: 'Review how light travels in straight lines and how shadows are formed before attempting.',
          misconception: 'Students often believe that the phases of the Moon are caused by the shadow of the Earth falling on the Moon throughout.',
          parts: [
                { id: 'a', prompt: 'What is the source of light that allows us to see the Moon from Earth during a moonlit night?', answer: 'The Sun',
                  options: ['The Sun', 'the Moon itself'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the phases of the Moon are caused by the shadow of the Earth falling on the Moon throughout the month.' },
                { id: 'b', prompt: 'Analyze the scenario: Suppose you observe a First Quarter moon high in the sky during evening hours.', answer: 'Correct Answer: Full Moon',
                  options: ['Correct Answer: Full Moon', 'New Moon'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the phases of the Moon are caused by the shadow of the Earth falling on the Moon throughout the month.' }
          ],
            remediations: { 'the-phases-of-the-moon': { steps: ['To correct this, take a small globe or ball (representing the Moon) and a torch (representing the Sun) in a dark room.', 'Have the student stand in place holding the ball while you shine the torch from one side.', 'Walk the ball in a circle around the student\'s head, and have the student observe how different amounts of the lit.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the phases of the Moon are caused by the shadow of the Earth falling on the Moon throughout.',
          parts: [
                { id: 'a', prompt: 'Analyze the scenario: Suppose you observe a First Quarter moon high in the sky during evening hours.', answer: 'Correct Answer: Full Moon',
                  options: ['Correct Answer: Full Moon', 'New Moon'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the phases of the Moon are caused by the shadow of the Earth falling on the Moon throughout the month.' }
          ],
            remediations: { 'the-phases-of-the-moon': { steps: ['To correct this, take a small globe or ball (representing the Moon) and a torch (representing the Sun) in a dark room.', 'Have the student stand in place holding the ball while you shine the torch from one side.', 'Walk the ball in a circle around the student\'s head, and have the student observe how different amounts of the lit.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_001', difficulty: 'standard',
          question: 'The rotation of the Earth is the spinning of the Earth on its imaginary axis.',
          hint: 'Review how light travels in straight lines and how shadows are cast by opaque objects in.',
          misconception: 'Students often think that the Sun revolves around a stationary Earth every day, which creates day and night, because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The rotation of the Earth is the spinning of the Earth on its imaginary axis from west to',
                  options: ['The rotation of the Earth is the spinning of the Earth on its imaginary axis from west to', 'An eclipse occurs when one celestial body moves into the shadow of another', 'A solar eclipse is an astronomical phenomenon that occurs when the Moon passes directly', 'A lunar eclipse is an astronomical event that occurs when the Earth passes directly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the Sun revolves around a stationary Earth every day, which creates day and night, because they rely purely on.' }
          ],
            remediations: { 'the-sun-revolves-around-a': { steps: ['To fix this misconception, take a spinning office chair and sit on it while looking at a stationary lamp across the.', 'As someone spins the chair slowly, notice how the lamp appears to move across your field of view and disappear behind.', 'Relate this directly to standing on the Earth: you are on a spinning platform (Earth), which makes a stationary light.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch06_002', difficulty: 'standard',
          question: 'The apparent movement of the Sun across the sky refers to the daily.',
          hint: 'Review c7_physics_ch06_001 to reinforce how Earth\'s rotation creates day and night before.',
          misconception: 'Students often believe that the Sun is physically moving across the sky while the Earth remains completely still at the.',
          parts: [
                { id: 'a', prompt: 'What is the apparent direction of the Sun\'s daily movement across the sky when viewed from Earth?', answer: 'The Sun appears to move from east to west',
                  options: ['The Sun appears to move from east to west', 'west to east'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Sun is physically moving across the sky while the Earth remains completely still at the center of the.' },
                { id: 'b', prompt: 'Why does the Sun appear to rise in the east and set in the west if the Earth is spinning? Explain the physical reason.', answer: 'The Sun appears to move in the opposite direction of Earth\'s rotation',
                  options: ['The Sun appears to move in the opposite direction of Earth\'s rotation', 'the Sun revolves around the Earth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Sun is physically moving across the sky while the Earth remains completely still at the center of the.' }
          ],
            remediations: { 'the-sun-is-physically-moving': { steps: ['To fix this, have the student sit on a swivel chair or spin slowly in a circle while looking at a stationary lamp.', 'Point out that even though the chair is spinning, the lamp appears to sweep past their field of view in the opposite.', 'Connect this directly to how Earth\'s eastward spin creates the illusion of a westward-moving Sun.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
