import type { SimDef } from '../../engine/types';
import C7_PhysicsMeasurementTimeMotionCBSESim from '../../../simulations/c6_12/C7_PhysicsMeasurementTimeMotionCBSESim';

/** v3 wrapped master — C7_PhysicsMeasurementTimeMotionCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_physicsmeasurementtimemotioncbsesim: SimDef = {
    id: 'v3w_c7_physicsmeasurementtimemotioncbsesim',
    title: 'Units of Speed and Their Conversions',
    subtitle: 'Covers the mathematical conversion between kilometres per hour and metres per second for.',
    classLevel: 7, subject: 'physics', topic: 'Units of Speed and Their Conversions',
    chapters: [],
    nodeIds: ['c7_physics_ch04_010', 'c7_physics_ch04_002', 'c7_physics_ch04_004', 'c7_physics_ch04_005', 'c7_physics_ch04_006', 'c7_physics_ch04_007', 'c7_physics_ch04_008', 'c7_physics_ch04_009', 'c7_physics_ch04_001', 'c7_physics_ch04_003', 'c7_physics_ch01_007', 'c7_physics_ch06_002', 'c7_physics_ch06_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine riding a bicycle down an Indian village road where the speedometer or milestone markers indicate.', goal: 'Master Units of Speed and Their Conversions.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Speed can be expressed in different units.', text: 'Speed can be expressed in different units such as metres per second ($\\text{m/s}$) or kilometres per hour ($\\text{km/h}$), where the Standard International (SI) unit is metres per second.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_physics_ch04_010', title: 'Speed can be expressed in different.',
          scaffold: { problem: 'A school bus travels from Delhi to a nearby monument at a speed of $54\\text{ km/h}$. Express this speed in metres per second ($\\text{m/s}$).',
            steps: [
            { text: 'Identify the given quantity and target unit: Given speed $= 54\\text{ km/h}$, target unit $= \\text{m/s}$.' },
            { text: 'Recall the conversion factor from $\\text{km/h}$ to $\\text{m/s}$, which is multiplying by $\\frac{5}{18}$.' },
            { text: 'Set up the multiplication expression: $54 \\times \\frac{5}{18}$.' },
            { text: 'Cancel common factors and compute: $54 \\div 18 = 3$, then $3 \\times 5 = 15$.' },
            { text: 'Attach the correct unit and verify reasonableness: $15\\text{ m/s}$.', faded: true, blankAnswer: '15 m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_002', title: 'A simple pendulum consists of a small.',
          scaffold: { problem: 'In a school physics laboratory in Delhi, a student sets up a simple pendulum.',
            steps: [
            { text: 'Identify given values: Total time ($t$) = 45 s, Number of oscillations ($N$) = 25. What to find: Time period ($T$).' },
            { text: 'Select the appropriate formula relating time period, total time, and number of oscillations: $T = \\frac{t}{N}$.' },
            { text: 'Substitute the numerical values along with their units into the formula: $T = \\frac{45\\text{ s}}{25}$.' },
            { text: 'Perform the division: $45 \\div 25 = 1.8$, tracking unit cancellation so the resulting unit is seconds (s).' },
            { text: 'Verify if the answer is physically reasonable (1.8 s per swing is normal for a medium-length laboratory pendulum) and.', faded: true, blankAnswer: '1.8 s' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_004', title: 'Modern timekeeping devices, such as.',
          scaffold: { problem: 'During a school athletic meet in New Delhi, a timekeeper uses a digital stopwatch to measure a runner\'s sprint time.',
            steps: [
            { text: 'Identify the start time ($1\\text{ min } 15.50\\text{ s}$) and the end time ($1\\text{ min } 27.85\\text{ s}$).' },
            { text: 'Convert both times entirely into seconds by multiplying the minute value by 60 and adding the remaining seconds.' },
            { text: 'Compute start time in seconds: $(1 \\times 60) + 15.50 = 60 + 15.50 = 75.50\\text{ s}$.' },
            { text: 'Subtract the start time from the end time to find elapsed duration: $87.85\\text{ s} - 75.50\\text{ s} = 12.35\\text{ s}$.' },
            { text: 'Verify that the time difference is positive, reasonable for a short sprint segment, and expressed in correct SI units.', faded: true, blankAnswer: '12.35 s' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_005', title: 'Comparing speeds involves determining.',
          scaffold: { problem: 'Two cyclists, Priya and Rohan, participate in a school race. Priya covers a distance of 300 meters in 50 seconds.',
            steps: [
            { text: 'Identify Priya\'s data: Distance $d_1 = 300\\text{ m}$, Time $t_1 = 50\\text{ s}$.' },
            { text: 'Recall the concept that speed is distance divided by time ($v = \\frac{d}{t}$).' },
            { text: 'Calculate Priya\'s speed: $v_1 = \\frac{300\\text{ m}}{50\\text{ s}} = 6\\text{ m/s}$.' },
            { text: 'Calculate Rohan\'s speed: $v_2 = \\frac{400\\text{ m}}{80\\text{ s}} = 5\\text{ m/s}$.' },
            { text: 'Compare speeds ($6\\text{ m/s} > 5\\text{ m/s}$); Priya has a higher speed and is cycling faster.', faded: true, blankAnswer: 'Priya is faster with a speed of $6\\text{ m/s}$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_006', title: 'Speed is the distance traveled by a.',
          scaffold: { problem: 'A school bus travels along a straight highway from Delhi to a picnic spot, covering a distance of 1500 meters in 100 seconds.',
            steps: [
            { text: 'Identify given values: distance $d = 1500\\text{ m}$, time $t = 100\\text{ s}$. Unknown to find: speed ($v$).' },
            { text: 'Select the appropriate formula: $v = \\frac{d}{t}$. Check that units are in standard SI form (meters and seconds).' },
            { text: 'Substitute the given values into the formula: $v = \\frac{1500\\text{ m}}{100\\text{ s}}$.' },
            { text: 'Perform the division and cancel matching units: $1500 \\div 100 = 15$, yielding units of m/s.' },
            { text: 'Verify physical reasonableness: A bus traveling 15 meters every second is a realistic highway speed ($15\\text{ m/s}$).', faded: true, blankAnswer: '15 m/s' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_physics_ch04_007', title: 'The mathematical relationship between.',
          scaffold: { problem: 'A delivery scooter travels through a local market street at a constant speed of 8 m/s for 5 minutes.',
            steps: [
            { text: 'Identify given values and what needs to be calculated. Speed ($v$) = 8 m/s, Time ($t$) = 5 minutes. Find distance ($d$).' },
            { text: 'Check units for consistency. Time is given in minutes, but speed uses seconds.' },
            { text: 'Select the appropriate rearranged formula based on $v = \\frac{d}{t}$: $d = v \\times t$.' },
            { text: 'Substitute the values with their units into the formula: $d = 8 \\text{ m/s} \\times 300 \\text{ s}$.' },
            { text: 'Compute the numerical value and cancel the units ($\\text{m/s} \\times \\text{s} = \\text{m}$): $d = 2400 \\text{ m}$.', faded: true, blankAnswer: '2400 m' }
            ] } },
        { type: 'dissect', nodeId: 'c7_physics_ch04_002', title: 'Identify each idea',
          dissect: { specimen: 'Units of Speed and Their Conversions', spots: [
            { id: 's1', label: 'Speed can be expressed in', prompt: 'Which idea is this? — Speed can be expressed in different units such as metres per second ($\\text{m/s}$) or.', answer: 'Speed can be expressed in', options: ['Speed can be expressed in', 'A simple pendulum consists of', 'Modern timekeeping devices such as', 'Comparing speeds involves determining which'] },
            { id: 's2', label: 'A simple pendulum consists of', prompt: 'Which idea is this? — A simple pendulum consists of a small metallic ball (called the bob) suspended from a.', answer: 'A simple pendulum consists of', options: ['A simple pendulum consists of', 'Speed can be expressed in', 'Modern timekeeping devices such as', 'Comparing speeds involves determining which'] },
            { id: 's3', label: 'Modern timekeeping devices such as', prompt: 'Which idea is this? — Modern timekeeping devices, such as quartz clocks, digital watches, and electronic.', answer: 'Modern timekeeping devices such as', options: ['Modern timekeeping devices such as', 'Speed can be expressed in', 'A simple pendulum consists of', 'Comparing speeds involves determining which'] },
            { id: 's4', label: 'Comparing speeds involves determining which', prompt: 'Which idea is this? — Comparing speeds involves determining which of two or more moving objects covers a.', answer: 'Comparing speeds involves determining which', options: ['Comparing speeds involves determining which', 'Speed can be expressed in', 'A simple pendulum consists of', 'Modern timekeeping devices such as'] },
            { id: 's5', label: 'Speed is the distance traveled', prompt: 'Which idea is this? — Speed is the distance traveled by a moving object per unit of time, defined.', answer: 'Speed is the distance traveled', options: ['Speed is the distance traveled', 'Speed can be expressed in', 'A simple pendulum consists of', 'Modern timekeeping devices such as'] },
            { id: 's6', label: 'The mathematical relationship between speed', prompt: 'Which idea is this? — The mathematical relationship between speed ($v$), distance ($d$), and time ($t$) states.', answer: 'The mathematical relationship between speed', options: ['The mathematical relationship between speed', 'Speed can be expressed in', 'A simple pendulum consists of', 'Modern timekeeping devices such as'] }
          ] } }
    ],
    explore: { component: C7_PhysicsMeasurementTimeMotionCBSESim, prompt: 'Explore the interactive — Units of Speed and Their Conversions' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_physics_ch04_010', difficulty: 'standard',
          question: 'Speed can be expressed in different units such as metres per second.',
          hint: 'Review basic fraction simplification and how $1\\text{ km} = 1000\\text{ m}$ and $1\\text{.',
          misconception: 'Students frequently multiply by the wrong fraction ($\\frac{18}{5}$ instead of $\\frac{5}{18}$ when converting from.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speed can be expressed in different units such as metres per second ($\\text{m/s}$) or',
                  options: ['Speed can be expressed in different units such as metres per second ($\\text{m/s}$) or', 'A simple pendulum consists of a small metallic ball (called the bob) suspended from a', 'Modern timekeeping devices, such as quartz clocks, digital watches, and electronic', 'Comparing speeds involves determining'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently multiply by the wrong fraction ($\\frac{18}{5}$ instead of $\\frac{5}{18}$ when converting from $\\text{km/h}$ to.' }
          ],
            remediations: { 'students-frequently-multiply-by-the': { steps: ['To fix this, write out the unit replacement explicitly every single time: replace \'$1\\text{ km}$\' with \'$1000\\text{.', 'Cancel the zeros manually: $\\frac{1\\text{ km}}{1\\text{ h}} = \\frac{1000\\text{ m}}{3600\\text{ s}} = \\frac{5}{18}\\text{.', 'Check whether the final number should look larger or smaller by remembering that $\\text{km/h}$ numbers are always.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_002', difficulty: 'standard',
          question: 'A simple pendulum consists of a small metallic ball (called the bob) suspended.',
          hint: 'Review Class 6 topic c6_physics_ch08_033 (The Pendulum and Time Measurement) to.',
          misconception: 'Students often believe that a heavier bob swings faster and completes its oscillations in less time than a lighter bob.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of the time period of a simple pendulum?', answer: 'The SI unit of the time period is the second (s)',
                  options: ['The SI unit of the time period is the second (s)', 'kilogram'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that a heavier bob swings faster and completes its oscillations in less time than a lighter bob.' }
          ],
            remediations: { 'a-heavier-bob-swings-faster': { steps: ['To fix this misconception, perform a simple comparative demonstration in class.', 'Hang two bobs of identical size—one made of light wood and one made of heavy iron—using strings of the exact same.', 'Displace them together by the same small angle and release them simultaneously; observe that they keep pace with each.', 'Explain that while gravity pulls harder on the heavy bob, it also requires more force to accelerate it (inertia), so.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_004', difficulty: 'standard',
          question: 'Modern timekeeping devices, such as quartz clocks, digital watches, and.',
          hint: 'Review the basics of electric cells and circuits from Class 6, and practice reading.',
          misconception: 'Students often believe that digital stopwatches measure time continuously in a smooth flow, similar to an analog.',
          parts: [
                { id: 'a', prompt: 'What is the SI unit of time measured by modern timekeeping devices like stopwatches?', answer: 'The SI unit of time is the second (s)',
                  options: ['The SI unit of time is the second (s)', 'minute'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that digital stopwatches measure time continuously in a smooth flow, similar to an analog sundial shadow.' }
          ],
            remediations: { 'digital-stopwatches-measure-time-continuously': { steps: ['To fix this misconception, have the student examine the digital seconds display of a stopwatch or mobile phone closely.', 'Point out that the numbers jump in discrete steps (e.g., from 0.01 to 0.02) rather than sliding smoothly, proving that.', 'Explain that each jump represents a counted electrical pulse, connecting back to their prior knowledge of electric.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_005', difficulty: 'standard',
          question: 'Comparing speeds involves determining which of two or more moving objects.',
          hint: 'Review the measurement of time intervals and basic division of numbers if struggling with.',
          misconception: 'Students often think that the object that travels the greater total distance is always the faster object, completely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing speeds involves determining',
                  options: ['Comparing speeds involves determining', 'Speed can be expressed in different units such as metres per second ($\\text{m/s}$) or', 'A simple pendulum consists of a small metallic ball (called the bob) suspended from a', 'Modern timekeeping devices, such as quartz clocks, digital watches, and electronic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that the object that travels the greater total distance is always the faster object, completely ignoring the time.' }
          ],
            remediations: { 'the-object-that-travels-the': { steps: ['Have the student write down both the distance and the time taken for each object side by side.', 'Guide them to calculate how much distance each object covers in a single unit of time (such as 1 hour or 1 second).', 'Point out that comparing totals without considering time is like comparing marks scored in exams of different maximum.', 'Re-verify using the formula $v = \\frac{\\text{Distance}}{\\text{Time}}$ with unit tracking.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_006', difficulty: 'standard',
          question: 'Speed is the distance traveled by a moving object per unit of time, defined.',
          hint: 'Review c7_physics_ch04_003 and c7_physics_ch04_005 to reinforce how time is measured and.',
          misconception: 'Students often confuse the units of speed and add or multiply distance and time values arbitrarily instead of dividing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speed is the distance traveled by a moving object per unit of time, defined',
                  options: ['Speed is the distance traveled by a moving object per unit of time, defined', 'Speed can be expressed in different units such as metres per second ($\\text{m/s}$) or', 'A simple pendulum consists of a small metallic ball (called the bob) suspended from a', 'Modern timekeeping devices, such as quartz clocks, digital watches, and electronic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the units of speed and add or multiply distance and time values arbitrarily instead of dividing them.' }
          ],
            remediations: { 'students-often-confuse-the-units': { steps: ['To fix this error, guide the student back to the physical meaning of the words: "per" means "divided by" (just like.', 'Have them physically walk a measured 10-meter path in their classroom, time it with a watch, and write down the.', 'Emphasize that the fraction bar in $\\text{m/s}$ literally means division.'] } } },
        { type: 'subpart', nodeId: 'c7_physics_ch04_007', difficulty: 'standard',
          question: 'The mathematical relationship between speed ($v$), distance ($d$), and time.',
          hint: 'Review the definition of speed and how to rearrange simple algebraic equations in math.',
          misconception: 'Students often mix up the arrangement of the formula variables, writing $d = \\frac{v}{t}$ or $t = v \\times d$ because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The mathematical relationship between speed ($v$), distance ($d$), and time ($t$) states',
                  options: ['The mathematical relationship between speed ($v$), distance ($d$), and time ($t$) states', 'Speed can be expressed in different units such as metres per second ($\\text{m/s}$) or', 'A simple pendulum consists of a small metallic ball (called the bob) suspended from a', 'Modern timekeeping devices, such as quartz clocks, digital watches, and electronic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often mix up the arrangement of the formula variables, writing $d = \\frac{v}{t}$ or $t = v \\times d$ because they memorise letters.' }
          ],
            remediations: { 'students-often-mix-up-the': { steps: ['To fix this misconception, guide the student to use unit analysis (dimensional reasoning) as a sanity check.', 'Remind them that speed has units of distance over time (m/s).', 'Therefore, to find distance (metres), we must multiply speed (metres per second) by time (seconds) so that the.', 'Have them practice checking units in every calculation before plugging in numbers.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
