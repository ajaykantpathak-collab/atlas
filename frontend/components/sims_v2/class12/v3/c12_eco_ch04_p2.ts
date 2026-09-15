import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch04_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch04_p2: SimDef = {
    id: 'v3_c12_eco_ch04_p2',
    title: 'The Theory of the Firm under Perfect Competition · Part 2/2',
    subtitle: 'Raise price, sell nothing; cut price, earn less — the price taker\'s cage',
    classLevel: 12, subject: 'economics', topic: 'The Theory of the Firm under Perfect Competition · Part 2/2',
    chapters: ['c12_eco_ch04'],
    nodeIds: ['c12_eco_cbse_04_007', 'c12_eco_cbse_04_008', 'c12_eco_cbse_04_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Market analyst', intro: 'One market structure gives sellers zero power — and that\'s exactly why economists love it as the efficiency gold standard.', goal: 'List the features of perfect competition and explain price-taking, equilibrium and the long-run normal-profit outcome.' },
    discovery: {
        question: 'At the mandi, wheat sells at ₹20/kg. A farmer tries ₹21 and sells nothing; drops to ₹19 and loses money for no reason. Why can\'t he move the price either way?',
        options: ['He\'s a price taker — thousands sell identical wheat, so buyers walk to the next farmer above ₹20 and there\'s no gain going below', 'The mandi board fixes his price legally', 'Buyers are loyal to him', 'His wheat is better quality'],
        answer: 'He\'s a price taker — thousands sell identical wheat, so buyers walk to the next farmer above ₹20 and there\'s no gain going below',
        hook: 'Many sellers alone don\'t make perfect competition — the product must be homogeneous. Toothpaste has hundreds of sellers but differentiated brands, so each has pricing power. Under true competition the firm\'s demand curve is flat at market price — sell all you want at it, nothing above it.',
    },
    teaching: [
        { title: 'Long Run Supply Curve of a Firm', text: 'The long-run supply curve of a firm under perfect competition shows the quantity of output the firm chooses to supply at each possible market price when all inputs are variable and the firm can enter.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stress-test the ideal market: check each of the seven features against a real mandi, then push a price-taking firm to its profit-maximising output and watch free entry grind supernormal profit to normal.',
        labels: ['Long Run Supply Curve', 'Determinants of Market Supply', 'Price Elasticity of Supply'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_04_007', title: 'Long Run Supply Curve of a Firm',
          scaffold: { problem: 'A perfectly competitive firm has long-run total cost LRTC(q) = q^3 - 6q^2 + 15q + 50. Find the firm\'s long-run supply curve.',
            steps: [
            { text: 'Compute LRMC = d(LRTC)/dq = 3q^2 - 12q + 15.' },
            { text: 'Compute LRAC = LRTC/q = q^2 - 6q + 15 + 50/q.' },
            { text: 'Find minimum LRAC by setting derivative of LRAC to zero: d(LRAC)/dq = 2q - 6 - 50/q^2 = 0 → 2q^3 - 6q^2 - 50 = 0.' },
            { text: 'For P < 19.32, supply q = 0. For P ≥ 19.32, supply q solves P = 3q^2 - 12q + 15 with q ≥ 4.33.' },
            { text: 'Interpret: At price ₹19.32, the firm is indifferent between producing ≈4.33 units and shutting down.', faded: true, blankAnswer: 'Long-run supply: q = 0 for P < 19.32; for P ≥ 19.32,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_04_008', title: 'Determinants of Market Supply and Shift of Supply Curve',
          scaffold: { problem: 'In a perfectly competitive market for cotton in Gujarat, there are 500 identical firms.',
            steps: [
            { text: 'Market supply before tax: Q_s = n × q_s = 500 × (10 + 2P) = 5000 + 1000P.' },
            { text: 'Tax of ₹100 per quintal raises marginal cost by ₹100 at every output.' },
            { text: 'Market supply after tax: Q_s\' = 500 × (2P - 190) = 1000P - 95000.' },
            { text: 'At P = 5000: Before tax Q_s = 5000 + 1000×5000 = 5,005,000 quintals.', faded: true, blankAnswer: 'Before tax: Q_s = 5000 + 1000P; After tax: Q_s = 1000P.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_04_009', title: 'Price Elasticity of Supply: Measurement and Determinants',
          scaffold: { problem: 'The supply schedule for mangoes in a local market in Maharashtra is given below.',
            steps: [
            { text: 'Identify initial and new values: P₁ = 40, P₂ = 50; Q₁ = 500, Q₂ = 650.' },
            { text: 'Calculate percentage change in quantity supplied: %ΔQs = ((Q₂ - Q₁)/Q₁) × 100 = ((650-500)/500) × 100 = (150/500) × 100.' },
            { text: 'Calculate percentage change in price: %ΔP = ((P₂ - P₁)/P₁) × 100 = ((50-40)/40) × 100 = (10/40) × 100 = 25%.' },
            { text: 'Apply the formula: Es = %ΔQs / %ΔP = 30% / 25% = 1.2.' },
            { text: 'Interpret: Es = 1.2 > 1, so supply is **price elastic**. A 1% price increase leads to a 1.2% increase in quantity.', faded: true, blankAnswer: 'Es = 1.2 (elastic supply)' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a grain mandi where hundreds of farmers sell identical wheat at ₹20/kg, one farmer reasons: \'I\'ll charge ₹21 — a few buyers will pay a premium for my grain.\' His sacks sit unsold all day.',
            decisions: [{ prompt: 'Why did the premium fail?', options: [
                { text: 'He\'s a price taker in near-perfect competition: identical wheat plus many sellers mean buyers simply walk to the next stall — above the market price his demand is zero.', outcome: 'The firm\'s demand curve is horizontal at the market price; there was no \'premium niche\' to capture because nothing distinguishes his wheat.' },
                { text: 'Bad luck — small price rises only trim a little demand, so a few sales should still have happened.', outcome: 'That downward-sloping response is the market\'s demand curve, not the firm\'s; for one tiny seller it\'s perfectly elastic.', reveals: 'firm-faces-sloped-demand' },
                { text: 'He should have cut to ₹19 — lower prices always win extra sales and more revenue.', outcome: 'He could already sell all his stock at ₹20; cutting just loses ₹1/kg on the same volume — no extra customers exist to win.', reveals: 'lower-price-wins-sales' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_04_009', title: 'You made it',
          caseStudy: { intro: 'You can now tell a true price-taker market from one that merely looks crowded — and predict its long-run profit destiny. Perfect competition is the benchmark every other market gets marked against.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_04_007', difficulty: 'standard',
          question: 'The long-run supply curve of a firm under perfect competition shows the.',
          hint: 'If stuck, revisit the derivative rules for polynomials (c11_math_cbse_13_007) and the.',
          misconception: 'Students often think the long-run supply curve is the same as the short-run supply curve but with a different shutdown.',
          parts: [
                { id: 'a', prompt: 'Compare the long-run supply curve of a firm with its short-run supply curve.', answer: 'The long-run supply curve is more elastic',
                  options: ['The long-run supply curve is more elastic', 'short-run supply is more elastic'],
                  hint: 'If stuck, revisit the derivative rules for polynomials (c11_math_cbse_13_007) and the short-run.',
                  misconception: 'Students often think the long-run supply curve is the same as the short-run supply curve but with a different shutdown point (e.g., using.' }
          ],
            remediations: { 'the-long-run-supply-curve': { steps: ['List all costs in short run (fixed and variable) vs long run (all variable).', 'Identify shutdown price in each case: min SAVC vs min LRAC.', 'Draw both supply curves on the same graph to visualize the difference.', 'Practice with a numerical example where fixed costs are positive in short run but zero in long run.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_04_008', difficulty: 'standard',
          question: 'Market supply is the horizontal summation of individual firms\' supply curves.',
          hint: 'If stuck, review c12_eco_cbse_04_005 (Short Run Supply Curve) and practice drawing.',
          misconception: 'Students often believe that "supply increases when price increases" — they confuse a movement along the supply curve.',
          parts: [
                { id: 'a', prompt: 'Define market supply and state the mathematical relationship between individual supply and market supply for a perfectly competitive market with \'n\' identical.', answer: 'Market supply is the total quantity supplied by all firms at each price',
                  options: ['Market supply is the total quantity supplied by all firms at each price', 'market supply is the average of individual supplies', 'supply increases when price increases'],
                  hint: 'If stuck, review c12_eco_cbse_04_005 (Short Run Supply Curve) and practice drawing horizontal.',
                  misconception: 'Students often believe that "supply increases when price increases" — they confuse a movement along the supply curve (change in quantity.' },
                { id: 'b', prompt: 'Compare the effect on the market supply curve of (a) a technological improvement that reduces marginal cost by 10% at every output level, and (b) an increase.', answer: 'Both shift the curve rightward',
                  options: ['Both shift the curve rightward', 'technology shift is larger', 'supply increases when price increases'],
                  hint: 'If stuck, review c12_eco_cbse_04_005 (Short Run Supply Curve) and practice drawing horizontal.',
                  misconception: 'Students often believe that "supply increases when price increases" — they confuse a movement along the supply curve (change in quantity.' }
          ],
            remediations: { 'supply-increases-when-price-increases': { steps: ['Revisit c12_eco_cbse_04_005 (Short Run Supply Curve) to see how the firm\'s supply curve is derived from MC.', 'Draw a supply curve on graph paper; pick a point. Show that moving along the curve changes only price and quantity.', 'Practice with the diagnostic questions above, especially Q2 and Q3.', 'Re-diagnose by asking the student to explain in their own words why a change in own price does not shift the curve.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "supply increases when price increases" — they confuse a movement along the supply curve.',
          parts: [
                { id: 'a', prompt: 'Construct a real-world scenario involving the Indian sugar industry where three determinants of market supply change simultaneously: (i) sugarcane price.', answer: '(i) Sugarcane price rise → MC increases → leftward shift',
                  options: ['(i) Sugarcane price rise → MC increases → leftward shift', 'supply increases when price increases'],
                  hint: 'If stuck, review c12_eco_cbse_04_005 (Short Run Supply Curve) and practice drawing horizontal.',
                  misconception: 'Students often believe that "supply increases when price increases" — they confuse a movement along the supply curve (change in quantity.' }
          ],
            remediations: { 'supply-increases-when-price-increases': { steps: ['Revisit c12_eco_cbse_04_005 (Short Run Supply Curve) to see how the firm\'s supply curve is derived from MC.', 'Draw a supply curve on graph paper; pick a point. Show that moving along the curve changes only price and quantity.', 'Practice with the diagnostic questions above, especially Q2 and Q3.', 'Re-diagnose by asking the student to explain in their own words why a change in own price does not shift the curve.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_04_009', difficulty: 'standard',
          question: 'Price elasticity of supply (Es) measures the responsiveness of quantity.',
          hint: 'If stuck, revisit the percentage change formula (Class 8 Math) and the slope of a line.',
          misconception: 'Students often confuse the **geometric method formula for supply elasticity** with that for demand elasticity.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Price elasticity of supply (Es) measures the responsiveness of quantity supplied of a',
                  options: ['Price elasticity of supply (Es) measures the responsiveness of quantity supplied of a', 'Perfect competition is a market structure characterized by a large number of buyers and', 'Under perfect competition, a firm is a price taker facing a perfectly elastic demand', 'The profit-maximising output level for a firm under perfect competition is determined'],
                  hint: 'If stuck, revisit the percentage change formula (Class 8 Math) and the slope of a line (Class 11.',
                  misconception: 'Students often confuse the **geometric method formula for supply elasticity** with that for demand elasticity.' }
          ],
            remediations: { 'students-often-confuse-the-geometric': { steps: ['Revisit **c12_eco_cbse_04_008** (Determinants of Market Supply) to recall what shifts supply vs.', 'Review **c9_eco_ch2_7** and **c9_eco_ch2_8** (Law of Supply, Supply Curve) to reinforce the positive P-Qs relationship.', 'Practice the geometric method on **c11_math_cbse_10_006** (Slope of a Line) using supply-specific coordinates: plot.', 'Re-do **DIAGNOSTIC_QUESTION_3** with a new supply curve that does *not* pass through origin (e.g., Q = 20 + 3P).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
