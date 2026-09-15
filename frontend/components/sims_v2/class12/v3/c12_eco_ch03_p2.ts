import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch03_p2: SimDef = {
    id: 'v3_c12_eco_ch03_p2',
    title: 'Production and Costs · Part 2/2',
    subtitle: 'Hiring cooks tonight vs buying ovens next quarter — the run that matters isn\'t on the calendar',
    classLevel: 12, subject: 'economics', topic: 'Production and Costs · Part 2/2',
    chapters: ['c12_eco_ch03'],
    nodeIds: ['c12_eco_cbse_03_007', 'c12_eco_cbse_03_008', 'c12_eco_cbse_03_009', 'c12_eco_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Production manager', intro: 'Every firm is trapped by what it can\'t change quickly. That constraint — not the clock — defines its economics.', goal: 'Distinguish short run from long run by factor fixity and connect the production function to product curves and costs.' },
    discovery: {
        question: 'A startup in a co-working space boasts: \'We can change our office monthly — we\'re a long-run firm from day one.\' What kills the claim?',
        options: ['Long run needs ALL inputs variable — its licensed software, key hires and equipment can\'t be adjusted overnight', 'True — flexible rent means flexible everything', 'Long run just means surviving one year', 'Startups are always in the short run forever'],
        answer: 'Long run needs ALL inputs variable — its licensed software, key hires and equipment can\'t be adjusted overnight',
        hook: 'Short run and long run aren\'t calendar time — they\'re about factor fixity. A firm that can rebuild its factory in three months hits the long run fast; one waiting five years for clearance stays in the short run that whole time. Fixed factor ≠ fixed cost, either.',
    },
    teaching: [
        { title: 'Short Run Cost Curves: Shapes of TC, TVC, TFC, SAC and SMC', text: 'Short-run cost curves graphically represent how Total Cost (TC), Total Variable Cost (TVC), Total Fixed Cost (TFC), Short-run Average Cost (SAC), and Short-run Marginal Cost (SMC) behave as output.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run a Tirupur garment unit: decide what changes today (tailors, shifts) versus next year (machines, premises), compute output from Q = f(L, K), then chase TP, AP and MP through the law of variable proportions to the cost curves they cast.',
        labels: ['Short Run Cost Curves', 'Long Run Average Cost', 'Total, Average and Marginal', 'Producer\'s Equilibrium: MR-MC Approach'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_03_007', title: 'Short Run Cost Curves: Shapes of TC, TVC, TFC, SAC and SMC',
          scaffold: { problem: 'A firm has TFC = ₹2,000. The following table shows TVC at different output levels. Complete the table for TC, AFC, AVC, SAC, and SMC.',
            steps: [
            { text: 'Recall definitions: TC = TFC + TVC; AFC = TFC/Q; AVC = TVC/Q; SAC = TC/Q = AFC + AVC; SMC = ΔTC/ΔQ (since TFC constant.' },
            { text: 'Calculate TC for each Q by adding TFC (2000) to TVC.' },
            { text: 'Compute AFC, AVC, SAC for Q = 1 to 5 (Q=0 undefined for averages).' },
            { text: 'Compute SMC between successive outputs: SMC from Q=0 to 1 = (TC₁ - TC₀)/(1-0) = TVC₁ - TVC₀ = 500; similarly for other.' },
            { text: 'Locate minimum SAC and check where SMC crosses SAC.', faded: true, blankAnswer: 'Completed table:' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_03_008', title: 'Long Run Average Cost Curve: Envelope of Short Run SAC Curves',
          scaffold: { problem: 'A firm in Pune manufactures auto components. It can choose from three plant sizes with the following short-run total cost functions (TC.',
            steps: [
            { text: 'Compute SAC for each plant: SAC = TC/q.' },
            { text: 'Evaluate each SAC at q = 200.' },
            { text: 'Minimum SAC at q=200 is 120 (Plant A). LRAC(200) = 120. Optimal plant: A.' },
            { text: 'Evaluate at q = 500.' },
            { text: 'Minimum SAC at q=500 is 105 (Plant B). LRAC(500) = 105. Optimal plant: B.' },
            { text: 'Evaluate at q = 800.' },
            { text: 'Minimum SAC at q=800 is 98.5 (Plant C). LRAC(800) = 98.5. Optimal plant: C.', faded: true, blankAnswer: 'LRAC(200)=₹120 (Plant A), LRAC(500)=₹105 (Plant B).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_03_009', title: 'Total, Average and Marginal Revenue: Relationship',
          scaffold: { problem: 'A perfectly competitive firm sells wheat at a constant market price of ₹20 per kg.',
            steps: [
            { text: 'Identify the market structure: perfect competition implies price is constant at ₹20.' },
            { text: 'Write the TR function: TR = P × Q = 20Q.' },
            { text: 'Calculate TR for Q = 0 to 10: TR = 0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200.' },
            { text: 'AR = TR/Q = 20 for all Q > 0 (horizontal line at ₹20).' },
            { text: 'MR = ΔTR/ΔQ = 20 for each additional unit (horizontal line at ₹20).' },
            { text: 'Plot: TR is a straight line through origin with slope 20; AR and MR coincide as a horizontal line at ₹20.', faded: true, blankAnswer: 'TR = 20Q (linear through origin); AR = MR = 20 (horizontal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_03_010', title: 'Producer\'s Equilibrium: MR-MC Approach',
          scaffold: { problem: 'A perfectly competitive firm faces a market price of ₹200. Its total cost function is TC = 500 + 50Q + 5Q².',
            steps: [
            { text: 'Under perfect competition, MR = Price = ₹200 (constant).' },
            { text: 'Find MC by differentiating TC: MC = d(TC)/dQ = 50 + 10Q.' },
            { text: 'Set MR = MC: 200 = 50 + 10Q → 10Q = 150 → Q = 15 units.' },
            { text: 'Check second-order condition: d(MC)/dQ = 10 > 0, so MC is rising at Q=15. Condition satisfied.' },
            { text: 'Compute TR = P × Q = 200 × 15 = ₹3,000. Compute TC = 500 + 50(15) + 5(15)² = 500 + 750 + 1,125 = ₹2,375.', faded: true, blankAnswer: 'Profit-maximizing output = 15 units, Maximum profit = ₹625.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A cloud kitchen with two ovens and hired chefs has run for two years. The owner declares \'we\'re in the long run now — it\'s been over a year\' while deciding whether to hire more chefs or lease a bigger kitchen.',
            decisions: [{ prompt: 'Is \'two years\' the right test for the long run?', options: [
                { text: 'No — run is defined by input fixity, not the calendar: hiring chefs is short-run (ovens fixed); leasing a bigger kitchen makes capital variable and is the long-run decision, whenever it happens.', outcome: 'A firm could reach its \'long run\' in three months or stay in the short run for five years — what matters is whether the fixed factor can finally be changed.' },
                { text: 'Yes — short run means under a year, long run means over a year, and two years clears the bar.', outcome: 'Calendar time isn\'t the criterion; if ovens still can\'t be added, every hiring decision remains short-run no matter how many years pass.', reveals: 'run-is-calendar-time' },
                { text: 'Yes — a lean startup with rented space has no fixed factors, so it\'s always long-run anyway.', outcome: 'Flexible space doesn\'t free everything: equipment, licences and key contracts can stay fixed — the long run needs ALL inputs variable.', reveals: 'no-fixed-factors-claim' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'You can now separate \'more workers tonight\' from \'a bigger plant next year\' — and predict exactly how output and costs bend with each. Production theory is where micro gets mathematical.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_007', difficulty: 'standard',
          question: 'Short-run cost curves graphically represent how Total Cost (TC), Total Variable.',
          hint: 'If stuck, go back to c12_eco_cbse_03_003 (Law of Variable Proportions) and.',
          misconception: 'Students often believe that because TFC is constant, the SAC curve is also a rectangular hyperbola like AFC.',
          parts: [
                { id: 'a', prompt: 'What is the vertical distance between the TC and TVC curves at any output level, and why is it constant?', answer: 'The vertical distance equals Total Fixed Cost (TFC), which is constant',
                  options: ['The vertical distance equals Total Fixed Cost (TFC), which is constant', 'distance increases with output', 'fixed costs vary or that TVC includes a fixed component', 'because TFC is constant, the SAC curve is also a rectangular hyperbola like AFC'],
                  hint: 'If stuck, go back to c12_eco_cbse_03_003 (Law of Variable Proportions) and c12_eco_cbse_03_005.',
                  misconception: 'Students often believe that because TFC is constant, the SAC curve is also a rectangular hyperbola like AFC.' },
                { id: 'b', prompt: 'A firm\'s short-run Total Cost function is TC = 100 + 20Q - 2Q² + 0.2Q³. Calculate the output level where SMC is minimum. (Hint: SMC = d(TC)/dQ)', answer: 'SMC = d(TC)/dQ = 20 - 4Q + 0.6Q²',
                  options: ['SMC = d(TC)/dQ = 20 - 4Q + 0.6Q²', 'because TFC is constant, the SAC curve is also a rectangular hyperbola like AFC'],
                  hint: 'If stuck, go back to c12_eco_cbse_03_003 (Law of Variable Proportions) and c12_eco_cbse_03_005.',
                  misconception: 'Students often believe that because TFC is constant, the SAC curve is also a rectangular hyperbola like AFC.' },
                { id: 'c', prompt: 'At the output where SAC is minimum, which of the following is true? (a) SMC > SAC (b) SMC < SAC (c) SMC = SAC (d) SMC = 0', answer: 'SMC = SAC (',
                  options: ['SMC = SAC (', 'because TFC is constant, the SAC curve is also a rectangular hyperbola like AFC'],
                  hint: 'If stuck, go back to c12_eco_cbse_03_003 (Law of Variable Proportions) and c12_eco_cbse_03_005.',
                  misconception: 'Students often believe that because TFC is constant, the SAC curve is also a rectangular hyperbola like AFC.' }
          ],
            remediations: { 'because-tfc-is-constant': { steps: ['Revisit node c12_eco_cbse_03_003 (Law of Variable Proportions) and draw MP and AP curves; label the three stages.', 'Revisit node c12_eco_cbse_03_005 (Cost Concepts) and practise calculating TC, TVC, TFC, AFC, AVC, SAC, SMC from a given.', 'Draw TVC curve on graph paper using a numerical schedule that shows increasing then diminishing returns; identify the.', 'Use the marginal-average rule: if marginal < average, average falls; if marginal > average, average rises.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that because TFC is constant, the SAC curve is also a rectangular hyperbola like AFC.',
          parts: [
                { id: 'a', prompt: 'Construct a numerical example (with at least 5 output levels) showing TC, TVC, TFC, SAC, and SMC where SMC first falls, then rises, and cuts SAC at its.', answer: 'Example: TFC = 100',
                  options: ['Example: TFC = 100', 'because TFC is constant, the SAC curve is also a rectangular hyperbola like AFC'],
                  hint: 'If stuck, go back to c12_eco_cbse_03_003 (Law of Variable Proportions) and c12_eco_cbse_03_005.',
                  misconception: 'Students often believe that because TFC is constant, the SAC curve is also a rectangular hyperbola like AFC.' }
          ],
            remediations: { 'because-tfc-is-constant': { steps: ['Revisit node c12_eco_cbse_03_003 (Law of Variable Proportions) and draw MP and AP curves; label the three stages.', 'Revisit node c12_eco_cbse_03_005 (Cost Concepts) and practise calculating TC, TVC, TFC, AFC, AVC, SAC, SMC from a given.', 'Draw TVC curve on graph paper using a numerical schedule that shows increasing then diminishing returns; identify the.', 'Use the marginal-average rule: if marginal < average, average falls; if marginal > average, average rises.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_008', difficulty: 'standard',
          question: 'The Long Run Average Cost (LRAC) curve is the envelope of a family of Short Run.',
          hint: 'If stuck on envelope construction, revisit c12_eco_cbse_03_007 and practice: "For a given.',
          misconception: 'Students often believe the LRAC curve passes through the minimum points of all SAC curves. This is incorrect.',
          parts: [
                { id: 'a', prompt: 'What is the geometric relationship between the Long Run Average Cost (LRAC) curve and the Short Run Average Cost (SAC) curves? State it precisely.', answer: 'The LRAC curve is the lower envelope of the family of SAC curves',
                  options: ['The LRAC curve is the lower envelope of the family of SAC curves', 'LRAC is the average of all SAC curves', 'LRAC intersects each SAC at its minimum', 'the LRAC curve passes through the minimum points of all SAC curves'],
                  hint: 'If stuck on envelope construction, revisit c12_eco_cbse_03_007 and practice: "For a given output.',
                  misconception: 'Students often believe the LRAC curve passes through the minimum points of all SAC curves. This is incorrect.' }
          ],
            remediations: { 'the-lrac-curve-passes-through': { steps: ['If the student draws LRAC through SAC minima: (1) Revisit node c12_eco_cbse_03_007 (Short Run Cost Curves) to recall.', '(2) Draw three SACs with different fixed costs (different vertical intercepts).', '(3) For a given output, compute total cost = SAC × output for each plant.', 'The plant with lowest total cost has the lowest SAC at that output.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_009', difficulty: 'standard',
          question: 'Total Revenue (TR) is the total money receipts a firm receives from selling its.',
          hint: 'Review the derivative of a polynomial (c11_math_cbse_13_007) and the product rule.',
          misconception: 'Students often think that when price falls, MR falls by the same amount as AR.',
          parts: [
                { id: 'a', prompt: 'A firm faces the demand function P = 100 - 2Q. Calculate TR, AR, and MR functions. At what output is TR maximized?', answer: 'TR = P×Q = (100 - 2Q)Q = 100Q - 2Q²',
                  options: ['TR = P×Q = (100 - 2Q)Q = 100Q - 2Q²', 'when price falls, MR falls by the same amount as AR'],
                  hint: 'Review the derivative of a polynomial (c11_math_cbse_13_007) and the product rule.',
                  misconception: 'Students often think that when price falls, MR falls by the same amount as AR.' },
                { id: 'b', prompt: 'Compare the shape of the TR curve under perfect competition and under monopoly.', answer: 'Under perfect competition, price is constant, so TR = P×Q is linear with slope P',
                  options: ['Under perfect competition, price is constant, so TR = P×Q is linear with slope P', 'when price falls, MR falls by the same amount as AR'],
                  hint: 'Review the derivative of a polynomial (c11_math_cbse_13_007) and the product rule.',
                  misconception: 'Students often think that when price falls, MR falls by the same amount as AR.' }
          ],
            remediations: { 'when-price-falls': { steps: ['If the student confuses the slope of MR relative to AR, have them derive MR from TR = P×Q using the product rule.', 'Then plot a linear demand P = 10 - Q, compute TR, AR, MR for Q=0..10, and observe that MR intercept is same as AR but.', 'Revisit the algebraic derivation in c11_math_cbse_13_009 (Algebra of Derivatives) and the graphical relationship.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_010', difficulty: 'standard',
          question: 'Producer\'s equilibrium under the MR-MC approach occurs when a firm maximizes.',
          hint: 'If stuck, go back to c12_eco_cbse_03_009 (revenue marginals) and c12_eco_cbse_03_005.',
          misconception: 'Students often believe that "MR = MC" alone is sufficient for equilibrium, ignoring the rising MC condition.',
          parts: [
                { id: 'a', prompt: 'A firm under perfect competition faces a market price of ₹100. Its MC at 10 units is ₹90, at 11 units is ₹100, and at 12 units is ₹110.', answer: 'Equilibrium at 11 units',
                  options: ['Equilibrium at 11 units', 'MC < MR', 'MR = MC', '"MR = MC" alone is sufficient for equilibrium, ignoring the rising MC condition'],
                  hint: 'If stuck, go back to c12_eco_cbse_03_009 (revenue marginals) and c12_eco_cbse_03_005 (cost.',
                  misconception: 'Students often believe that "MR = MC" alone is sufficient for equilibrium, ignoring the rising MC condition.' },
                { id: 'b', prompt: 'Given the following data for a monopolist, find the profit-maximizing output and the maximum profit.', answer: 'Step 1: Calculate TR = P × Q: (100, 180, 240, 280, 300)',
                  options: ['Step 1: Calculate TR = P × Q: (100, 180, 240, 280, 300)', 'MR = MC', '"MR = MC" alone is sufficient for equilibrium, ignoring the rising MC condition'],
                  hint: 'If stuck, go back to c12_eco_cbse_03_009 (revenue marginals) and c12_eco_cbse_03_005 (cost.',
                  misconception: 'Students often believe that "MR = MC" alone is sufficient for equilibrium, ignoring the rising MC condition.' },
                { id: 'c', prompt: '"Under perfect competition, a firm\'s MC curve is U-shaped. The firm will always produce at the minimum point of MC because that minimizes cost per unit.".', answer: 'The statement is false',
                  options: ['The statement is false', 'MR = MC', '"MR = MC" alone is sufficient for equilibrium, ignoring the rising MC condition'],
                  hint: 'If stuck, go back to c12_eco_cbse_03_009 (revenue marginals) and c12_eco_cbse_03_005 (cost.',
                  misconception: 'Students often believe that "MR = MC" alone is sufficient for equilibrium, ignoring the rising MC condition.' }
          ],
            remediations: { 'mr-mc-alone-is-sufficient': { steps: ['If the student cannot correctly apply the two conditions: (1) Revisit c12_eco_cbse_03_009 to recalculate MR from.', '(2) Draw a rough graph with MR downward sloping and MC U-shaped; mark the two intersections and label which has.', '(3) Practice with a discrete table: compute MR and MC for each unit, find where MR = MC, then check if MC at that.', '(4) Re-do Diagnostic Questions 2 and 3 with a fresh table, explaining each step aloud.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
