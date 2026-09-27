import type { SimDef } from '../../engine/types';

/** v3 generated — c11_app_ch02 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_app_ch02: SimDef = {
    id: 'v3_c11_app_ch02',
    title: 'Numerical Application',
    subtitle: 'This node covers the conceptual distinction, formulas, and calculation of average speed.',
    classLevel: 11, subject: 'app', topic: 'Numerical Application',
    chapters: ['c11_app_ch02'],
    nodeIds: ['c11_app_cbse_02_001', 'c11_app_cbse_02_002', 'c11_app_cbse_02_003', 'c11_app_cbse_02_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start by asking: "If a Delhi Metro train goes from Rajiv Chowk to Kashmere Gate and back to Rajiv Chowk in 20.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A person walks from point A to point B (5 km away) at 5 km/h and immediately returns to A at 3 km/h.',
        options: ['Distance AB = 5 km', 'average of averages', 'average velocity is just average speed with a direction added'],
        answer: 'Distance AB = 5 km',
        hook: 'Students believe **"average velocity is just average speed with a direction added"**.',
    },
    teaching: [
        { title: 'Numerical Application', text: 'Average speed is a scalar quantity defined as the total path length travelled divided by the total time taken.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_app_cbse_02_001', title: 'Numerical Application',
          scaffold: { problem: 'A delivery scooter in Mumbai travels 8 km east in 20 minutes, then 6 km north in 15 minutes, then 10 km west in 25 minutes.',
            steps: [
            { text: 'Identify given data: three legs with distances and times. Convert all times to hours: 20 min = 1/3 h, 15 min = 1/4.' },
            { text: 'Compute total distance = 8 + 6 + 10 = 24 km. Total time = 1/3 + 1/4 + 5/12 = (4+3+5)/12 = 1 h.' },
            { text: 'Average speed = total distance / total time = 24 km / 1 h = 24 km/h.' },
            { text: 'Find net displacement using vector components. East-West: +8 km (east) - 10 km (west) = -2 km (2 km west).' },
            { text: 'Average velocity = displacement / total time = 6.32 km / 1 h = 6.32 km/h at 71.6° north of west.', faded: true, blankAnswer: 'Average speed = 24 km/h. Average velocity = 6.32 km/h.' }
            ] } },
        { type: 'case', nodeId: 'c11_app_cbse_02_004', title: 'Uniform circular motion is motion at.',
          caseStudy: { intro: '1. Watch a satellite: it never slows, yet it is always \'falling\' around Earth — its direction curves continuously. 2. Velocity = speed + direction.',
            decisions: [{ prompt: 'Why is a satellite in circular orbit \'accelerating\' despite constant speed?', options: [
                { text: 'Velocity is a vector', outcome: 'Velocity is a vector — its direction changes continuously, so velocity changes even when speed does.' },
                { text: 'constant speed means constant velocity', outcome: 'Not quite — Students believe constant speed means constant velocity — \'it never sped up, so no acceleration.\'.', reveals: 'constant-speed-means-constant-velocity' }
            ] }] } },
        { type: 'case', nodeId: 'c11_app_cbse_02_004', title: 'You made it',
          caseStudy: { intro: 'You finished Numerical Application — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_app_cbse_02_001', difficulty: 'standard',
          question: 'Average speed is a scalar quantity defined as the total path length travelled.',
          hint: 'Review vector addition for displacement (head-to-tail method) and Pythagoras theorem for.',
          misconception: 'Students believe **"average velocity is just average speed with a direction added"**.',
          parts: [
                { id: 'a', prompt: 'A person walks from point A to point B (5 km away) at 5 km/h and immediately returns to A at 3 km/h.', answer: 'Distance AB = 5 km',
                  options: ['Distance AB = 5 km', 'average of averages', 'average velocity is just average speed with a direction added', '**"average velocity is just average speed with a direction added"**'],
                  hint: 'Review vector addition for displacement (head-to-tail method) and Pythagoras theorem for magnitude.',
                  misconception: 'Students believe **"average velocity is just average speed with a direction added"**.' },
                { id: 'b', prompt: 'Compare the average speed and average velocity for these two motions: (i) A car drives 100 km north in 2 hours.', answer: '(i) Distance = 100 km, displacement = 100 km north',
                  options: ['(i) Distance = 100 km, displacement = 100 km north', 'speed with direction', 'average velocity is just average speed with a direction added', 'velocity is 50 km/h in both'],
                  hint: 'Review vector addition for displacement (head-to-tail method) and Pythagoras theorem for magnitude.',
                  misconception: 'Students believe **"average velocity is just average speed with a direction added"**.' }
          ],
            remediations: { 'average-velocity-is-just-average': { steps: ['Place the object at origin.', 'Move it to (3,0), then to (3,4), then back to (0,0).', 'Ask: "What is the final position?', 'What is the displacement vector?" (Answer: (0,0) - (0,0) = 0).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"average velocity is just average speed with a direction added"**.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If average speed is zero, then average velocity must also be zero.', answer: 'The statement is **always true**',
                  options: ['The statement is **always true**', 'average velocity is just average speed with a direction added', '**"average velocity is just average speed with a direction added"**'],
                  hint: 'Review vector addition for displacement (head-to-tail method) and Pythagoras theorem for magnitude.',
                  misconception: 'Students believe **"average velocity is just average speed with a direction added"**.' }
          ],
            remediations: { 'average-velocity-is-just-average': { steps: ['Place the object at origin.', 'Move it to (3,0), then to (3,4), then back to (0,0).', 'Ask: "What is the final position?', 'What is the displacement vector?" (Answer: (0,0) - (0,0) = 0).'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_02_002', difficulty: 'standard',
          question: 'Distance is a scalar measuring the total path length travelled regardless.',
          hint: 'Work step by step.',
          misconception: 'Students use distance and displacement interchangeably and are baffled by \'displacement = 0 after a whole lap\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Distance is a scalar measuring the total path length travelled regardless of direction,',
                  options: ['Distance is a scalar measuring the total path length travelled regardless of direction,', 'Average speed is a scalar quantity defined as the total path length travelled divided by', 'Average speed is total distance divided by total time (a scalar, always positive);', 'Uniform circular motion is motion at constant speed along a circular path — and it is'],
                  hint: 'Recall the definition.',
                  misconception: 'Students use distance and displacement interchangeably and are baffled by \'displacement = 0 after a whole lap\'.' }
          ],
            remediations: { 'students-use-distance-and-displacement': { steps: ['Draw the path: mark start S and end E.', 'Distance is every leg added; displacement is the straight S→E arrow with its direction.', 'If S=E, displacement is zero no matter the distance.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_02_003', difficulty: 'standard',
          question: 'Average speed is total distance divided by total time (a scalar, always.',
          hint: 'Work step by step.',
          misconception: 'Students average the two speeds — (40+60)/2 = 50 km/h. But equal-distance legs spend unequal time: the slow leg eats.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Average speed is total distance divided by total time (a scalar, always positive);',
                  options: ['Average speed is total distance divided by total time (a scalar, always positive);', 'Average speed is a scalar quantity defined as the total path length travelled divided by', 'Distance is a scalar measuring the total path length travelled regardless of direction,', 'Uniform circular motion is motion at constant speed along a circular path — and it is'],
                  hint: 'Recall the definition.',
                  misconception: 'Students average the two speeds — (40+60)/2 = 50 km/h. But equal-distance legs spend unequal time: the slow leg eats more of the clock,.' }
          ],
            remediations: { 'students-average-the-two-speeds': { steps: ['Stop averaging speeds — build the time column: each leg\'s distance ÷ its speed, sum the times, then divide total.', 'For velocity, use displacement instead of distance.'] } } },
        { type: 'subpart', nodeId: 'c11_app_cbse_02_004', difficulty: 'standard',
          question: 'Uniform circular motion is motion at constant speed along a circular path — and.',
          hint: 'Work step by step.',
          misconception: 'Students believe constant speed means constant velocity — \'it never sped up, so no acceleration.\' Velocity is a vector.',
          parts: [
                { id: 'a', prompt: 'Why is a satellite in circular orbit \'accelerating\' despite constant speed?', answer: 'Velocity is a vector',
                  options: ['Velocity is a vector', 'constant speed means constant velocity'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students believe constant speed means constant velocity — \'it never sped up, so no acceleration.\' Velocity is a vector; a direction change.' },
                { id: 'b', prompt: 'In uniform circular motion, where does the velocity vector point?', answer: 'Tangent to the circle at that instant',
                  options: ['Tangent to the circle at that instant', 'constant speed means constant velocity'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students believe constant speed means constant velocity — \'it never sped up, so no acceleration.\' Velocity is a vector; a direction change.' },
                { id: 'c', prompt: 'Where does the acceleration point in circular motion?', answer: 'Toward the centre',
                  options: ['Toward the centre', 'constant speed means constant velocity'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students believe constant speed means constant velocity — \'it never sped up, so no acceleration.\' Velocity is a vector; a direction change.' },
                { id: 'd', prompt: 'A stone whirled on a string is released — which way does it fly?', answer: 'Along the tangent at the release point',
                  options: ['Along the tangent at the release point', 'constant speed means constant velocity'],
                  hint: 'Think about the key idea.',
                  misconception: 'Students believe constant speed means constant velocity — \'it never sped up, so no acceleration.\' Velocity is a vector; a direction change.' }
          ],
            remediations: { 'constant-speed-means-constant-velocity': { steps: ['Ask two separate questions: did the SPEED change?', '(no — constant) Did the VELOCITY change?', 'Any velocity change — magnitude or direction — is acceleration.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
