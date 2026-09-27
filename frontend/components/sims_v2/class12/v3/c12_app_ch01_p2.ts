import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch01_p2: SimDef = {
    id: 'v3_c12_app_ch01_p2',
    title: 'Numbers Quantification · Part 2/2',
    subtitle: 'This node covers the rule of alligation for two ingredients, mean price calculation.',
    classLevel: 12, subject: 'app', topic: 'Numbers Quantification · Part 2/2',
    chapters: ['c12_app_ch01'],
    nodeIds: ['c12_app_cbse_01_007', 'c12_app_cbse_01_008', 'c12_app_cbse_01_009', 'c12_app_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a relatable scenario: "A shopkeeper has 50 kg of basmati rice at ₹80/kg and wants to mix it with.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Create a real-world alligation problem where the mean price is *closer to the dearer ingredient* than the cheaper one. Specify all prices and the ratio.',
        options: ['Example: Tea at ₹120/kg (cheaper) and ₹200/kg (dearer) mixed to get ₹170/kg', 'closer price = more quantity', '"closer price = more quantity"'],
        answer: 'Example: Tea at ₹120/kg (cheaper) and ₹200/kg (dearer) mixed to get ₹170/kg',
        hook: '**The "Cross-Multiplication Reversal" Error:** Students write the ratio as (m - c) : (d - m) instead of (d - m) : (m.',
    },
    teaching: [
        { title: 'ALLIGATION AND MIXTURE', text: 'Alligation is a rule used to find the ratio in which two or more ingredients at given prices must be mixed to produce a mixture of a desired mean price; the mean price is the cost price of a unit.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_01_007', title: 'ALLIGATION AND MIXTURE',
          scaffold: { problem: 'A milkman has 60 litres of pure milk. He sells 15 litres to a customer and replaces it with water.',
            steps: [
            { text: 'Identify given values: initial pure milk x = 60 L, quantity removed y = 15 L, number of operations n = 3.' },
            { text: 'Apply the repeated replacement formula for the tracked component (milk): Final milk = x (1 - y/x)^n = 60 × (1.' },
            { text: 'Compute: (3/4)^3 = 27/64. Final milk = 60 × 27/64 = 1620/64 = 25.3125 L.' },
            { text: 'Final mixture volume = 60 L (always constant). Water = 60 - 25.3125 = 34.6875 L.' },
            { text: 'Profit calculation: He sells 60 L mixture at pure milk price. Cost price of mixture = cost of milk in it = 25.3125.', faded: true, blankAnswer: 'Pure milk left = 25.3125 litres. Profit percentage.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_01_008', title: 'BOATS AND STREAMS:',
          scaffold: { problem: 'A motorboat goes 30 km upstream and 44 km downstream in 10 hours. It can go 40 km upstream and 55 km downstream in 13 hours.',
            steps: [
            { text: 'Let x = boat speed in still water (km/h), y = stream speed (km/h). Then upstream speed = x−y, downstream speed = x+y.' },
            { text: 'From first journey: 30/(x−y) + 44/(x+y) = 10. From second journey: 40/(x−y) + 55/(x+y) = 13.' },
            { text: 'Substitute u = 1/(x−y), v = 1/(x+y). Equations become: 30u + 44v = 10 and 40u + 55v = 13.' },
            { text: 'Solve the linear system: Multiply first by 4 → 120u + 176v = 40. Multiply second by 3 → 120u + 165v = 39.' },
            { text: 'Back-substitute: x−y = 1/u = 5, x+y = 1/v = 11. Add: 2x = 16 → x = 8 km/h. Subtract: 2y = 6 → y = 3 km/h.', faded: true, blankAnswer: 'Speed of boat in still water = 8 km/h; Speed of stream = 3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_01_009', title: 'PIPES AND CISTERNS',
          scaffold: { problem: 'A water tank in a housing society has two inlet pipes: Pipe A (municipal supply) fills it in 12 hours, Pipe B (borewell) fills it in 18.',
            steps: [
            { text: 'Identify given data — Inlet A time = 12 h, Inlet B time = 18 h, Outlet (leak) time = 36 h.' },
            { text: 'Convert each to rate with correct sign — Rate_A = +1/12 tank/h, Rate_B = +1/18 tank/h, Rate_leak = -1/36 tank/h.' },
            { text: 'Compute net rate — Net = 1/12 + 1/18 - 1/36 = (3 + 2 - 1)/36 = 4/36 = 1/9 tank/h.' },
            { text: 'Invert net rate to get time — Time = 1 / (1/9) = 9 hours.' },
            { text: 'Verify — In 9 h, A fills 9/12 = 3/4, B fills 9/18 = 1/2, leak empties 9/36 = 1/4. Net = 3/4 + 1/2 - 1/4 = 1 tank. ✓', faded: true, blankAnswer: '9 hours.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_01_010', title: 'RACES AND GAMES',
          scaffold: { problem: 'In a 1500 m race, Runner A gives Runner B a start of 150 m and beats B by 30 seconds.',
            steps: [
            { text: 'Identify given data. Race length L = 1500 m. Start given by A to B = 150 m. Winning margin = 30 s (time).' },
            { text: 'Compute A\'s time to finish. T_A = L / v_A = 1500 / 6 = 250 s.' },
            { text: 'Determine distance covered by B when A finishes. B starts 150 m ahead, so B runs L – 150 = 1350 m in the same 250 s?' },
            { text: 'Compute B\'s speed. v_B = distance covered by B / time taken by B for that distance = 1350 / 280 = 135/28 ≈ 4.821 m/s.' },
            { text: 'Find B\'s time for full 1500 m. T_B_full = 1500 / v_B = 1500 / (135/28) = 1500 × 28 / 135 = 42000 / 135 = 2800/9 ≈.', faded: true, blankAnswer: 'B\'s speed = 135/28 m/s ≈ 4.82 m/s. B\'s time for 1500.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_01_010', title: 'RACES AND GAMES',
          caseStudy: { intro: 'Start with a real scenario: "In a 100 m sprint, Rahul gives Rohan a 10 m head start. Rahul finishes in 12 s, Rohan in 13 s.',
            decisions: [{ prompt: 'In a 500 m race, P gives Q a start of 50 m. What distance does Q actually run when P completes the race?', options: [
                { text: 'Q runs 450 m', outcome: 'Q runs 450 m. A wrong answer of 50 m or 550 m reveals the student confuses "start of x metres" with.' },
                { text: 'start of x metres', outcome: 'Not quite — Students consistently treat "A beats B by x metres" as "B ran x metres" instead of "B ran (race.', reveals: 'students-consistently-treat-a-beats' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_01_010', title: 'You made it',
          caseStudy: { intro: 'You finished Numbers Quantification — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_01_007', difficulty: 'standard',
          question: 'Alligation is a rule used to find the ratio in which two or more ingredients.',
          hint: 'If stuck, review **weighted average** (Class 11 Statistics/Financial Math) and.',
          misconception: '**The "Cross-Multiplication Reversal" Error:** Students write the ratio as (m - c) : (d - m) instead of (d - m) : (m.',
          parts: [
                { id: 'a', prompt: 'A mixture contains milk and water in the ratio 7:3. If 10 litres of the mixture is replaced by 10 litres of water, the new ratio becomes 7:5.', answer: 'Milk quantity is unchanged',
                  options: ['Milk quantity is unchanged', 'replacement'],
                  hint: 'If stuck, review **weighted average** (Class 11 Statistics/Financial Math) and **ratio-proportion.',
                  misconception: '**The "Cross-Multiplication Reversal" Error:** Students write the ratio as (m - c) : (d - m) instead of (d - m) : (m - c).' }
          ],
            remediations: { 'the-cross-multiplication-reversal-error': { steps: ['**Re-derive the rule from weighted average**: Let q_c, q_d be quantities.', 'Total cost = q_c·c + q_d·d.', 'Mean price m = (q_c·c + q_d·d)/(q_c + q_d).', 'Rearrange: q_c(m - c) = q_d(d - m) → q_c/q_d = (d - m)/(m - c).'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "Cross-Multiplication Reversal" Error:** Students write the ratio as (m - c) : (d - m) instead of (d - m) : (m.',
          parts: [
                { id: 'a', prompt: 'Create a real-world alligation problem where the mean price is *closer to the dearer ingredient* than the cheaper one. Specify all prices and the ratio.', answer: 'Example: Tea at ₹120/kg (cheaper) and ₹200/kg (dearer) mixed to get ₹170/kg',
                  options: ['Example: Tea at ₹120/kg (cheaper) and ₹200/kg (dearer) mixed to get ₹170/kg', 'closer price = more quantity', '"closer price = more quantity"'],
                  hint: 'If stuck, review **weighted average** (Class 11 Statistics/Financial Math) and **ratio-proportion.',
                  misconception: '**The "Cross-Multiplication Reversal" Error:** Students write the ratio as (m - c) : (d - m) instead of (d - m) : (m - c).' }
          ],
            remediations: { 'the-cross-multiplication-reversal-error': { steps: ['**Re-derive the rule from weighted average**: Let q_c, q_d be quantities.', 'Total cost = q_c·c + q_d·d.', 'Mean price m = (q_c·c + q_d·d)/(q_c + q_d).', 'Rearrange: q_c(m - c) = q_d(d - m) → q_c/q_d = (d - m)/(m - c).'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_01_008', difficulty: 'standard',
          question: 'Boats and Streams problems model relative motion in one dimension where.',
          hint: 'If stuck, review Class 11 Applied Mathematics: "Straight Line" (c11_app_cbse_12_001) for.',
          misconception: '**The "Still Water Speed = Average Speed" Fallacy**: Students often believe that the speed of the boat in still water.',
          parts: [
                { id: 'a', prompt: 'A man rows at 8 km/h in still water. The stream flows at 2 km/h. He rows to a place 30 km away and returns. Find the total time taken. Show all steps.', answer: 'Step 1: Identify x = 8 km/h (boat), y = 2 km/h (stream)',
                  options: ['Step 1: Identify x = 8 km/h (boat), y = 2 km/h (stream)', 'forgot the stream', 'Still Water Speed = Average Speed'],
                  hint: 'If stuck, review Class 11 Applied Mathematics: "Straight Line" (c11_app_cbse_12_001) for.',
                  misconception: '**The "Still Water Speed = Average Speed" Fallacy**: Students often believe that the speed of the boat in still water (x) equals the.' },
                { id: 'b', prompt: 'Compare two scenarios: (A) Boat speed = 10 km/h, stream = 2 km/h, distance = 24 km each way.', answer: 'Scenario A: downstream = 12, upstream = 8',
                  options: ['Scenario A: downstream = 12, upstream = 8', 'B has higher boat speed so B is faster', 'Still Water Speed = Average Speed'],
                  hint: 'If stuck, review Class 11 Applied Mathematics: "Straight Line" (c11_app_cbse_12_001) for.',
                  misconception: '**The "Still Water Speed = Average Speed" Fallacy**: Students often believe that the speed of the boat in still water (x) equals the.' }
          ],
            remediations: { 'the-still-water-speed-average': { steps: ['Revisit the reference frame concept: draw a diagram showing boat, water, ground.', 'Label velocities as vectors: v_boat/water = x, v_water/ground = y, v_boat/ground = x±y.', 'Derive average speed formula from scratch: v_avg = 2D / (D/(x+y) + D/(x−y)) = (x²−y²)/x.', 'Compare with arithmetic mean x and harmonic mean 2(x+y)(x−y)/(2x).'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_01_009', difficulty: 'standard',
          question: 'Pipes and Cisterns problems model the filling or emptying of a tank using.',
          hint: 'If stuck, review "work and time" problems from Class 8/9 (e.g., "A and B together finish.',
          misconception: '**Sign error with outlet pipes / leakage:** Students consistently write net rate = \\( \\frac{1}{x} + \\frac{1}{y}.',
          parts: [
                { id: 'a', prompt: 'If an inlet pipe can fill a cistern in 10 hours, what fraction of the cistern does it fill in 1 hour?', answer: 'Inlet fills \\( \\frac{1}{10} \\) of the cistern in 1 hour',
                  options: ['Inlet fills \\( \\frac{1}{10} \\) of the cistern in 1 hour', 'inlet fills 10 parts, outlet empties 15 parts', '10 hours', '10 tanks per hour'],
                  hint: 'If stuck, review "work and time" problems from Class 8/9 (e.g., "A and B together finish a job.',
                  misconception: '**Sign error with outlet pipes / leakage:** Students consistently write net rate = \\( \\frac{1}{x} + \\frac{1}{y} + \\frac{1}{z} \\) even when.' },
                { id: 'b', prompt: 'A tank has a leak that would empty it in 20 hours. An inlet pipe is opened which fills at 5 litres/minute, and the tank now empties in 30 hours.', answer: 'Let capacity = \\( V \\) litres',
                  options: ['Let capacity = \\( V \\) litres', 'time to empty', 'filling rate'],
                  hint: 'If stuck, review "work and time" problems from Class 8/9 (e.g., "A and B together finish a job.',
                  misconception: '**Sign error with outlet pipes / leakage:** Students consistently write net rate = \\( \\frac{1}{x} + \\frac{1}{y} + \\frac{1}{z} \\) even when.' }
          ],
            remediations: { 'sign-error-with-outlet-pipes': { steps: ['If a student makes the sign error: (1) Make them draw a tank with arrows: inlet arrows pointing **in** (+), outlet.', '(2) Have them write rates with signs for 5 problems *before* solving — e.g., "Pipe A (inlet, 6h) → rate = +1/6; Pipe.', '(3) Give a diagnostic: "A leak empties a tank in 10h.', 'An inlet fills at 20 L/min.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_01_010', difficulty: 'standard',
          question: 'A race is a competition where participants cover a fixed distance in minimum.',
          hint: 'If stuck, revisit Class 11 Arithmetic Progression (c11_app_cbse_05_003) for ratio.',
          misconception: 'Students consistently treat "A beats B by x metres" as "B ran x metres" instead of "B ran (race distance – x) metres".',
          parts: [
                { id: 'a', prompt: 'In a 500 m race, P gives Q a start of 50 m. What distance does Q actually run when P completes the race?', answer: 'Q runs 450 m',
                  options: ['Q runs 450 m', 'start of x metres'],
                  hint: 'If stuck, revisit Class 11 Arithmetic Progression (c11_app_cbse_05_003) for ratio techniques, and.',
                  misconception: 'Students consistently treat "A beats B by x metres" as "B ran x metres" instead of "B ran (race distance – x) metres".' }
          ],
            remediations: { 'students-consistently-treat-a-beats': { steps: ['Have the student draw a horizontal line representing the racecourse.', 'Mark Start (S) and Finish (F).', 'For "A gives B a start of 40 m", mark B\'s start point (B₀) 40 m from S towards F.', 'Label distances: A runs SF, B runs B₀F.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
