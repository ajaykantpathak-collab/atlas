import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch06_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch06_p2: SimDef = {
    id: 'v3_c12_eco_ch06_p2',
    title: 'Non-Competitive Markets · Part 2/2',
    subtitle: 'One seller doesn\'t make a monopoly — zero substitutes do',
    classLevel: 12, subject: 'economics', topic: 'Non-Competitive Markets · Part 2/2',
    chapters: ['c12_eco_ch06'],
    nodeIds: ['c12_eco_cbse_06_007', 'c12_eco_cbse_06_008', 'c12_eco_cbse_06_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Competition economist', intro: 'When one firm faces no rival and no way in for rivals, price becomes a choice, not a fate. Study the chooser.', goal: 'Define monopoly through its four features, classify barriers to entry, and explain the downward-sloping demand and MR < AR.' },
    discovery: {
        question: 'A village\'s only doctor is technically a \'single seller\' — yet nobody calls her a monopoly abuser, while patented-drug firms are hauled up constantly. What separates a true monopoly?',
        options: ['No close substitutes plus entry barriers — single-seller status alone doesn\'t give market power when alternatives exist', 'Any single seller is automatically a monopoly', 'Monopoly just means charging high prices', 'Only government companies can be monopolies'],
        answer: 'No close substitutes plus entry barriers — single-seller status alone doesn\'t give market power when alternatives exist',
        hook: 'Monopoly needs BOTH one seller AND no close substitutes — and \'high price\' isn\'t in the definition. A monopolist faces the whole downward-sloping market demand curve, so every extra unit sold drops the price for all units: that\'s why MR falls below AR.',
    },
    teaching: [
        { title: 'Monopolistic Competition: Equilibrium of the Firm', text: 'Monopolistic competition equilibrium occurs when a firm maximizes profit by producing where marginal revenue equals marginal cost (MR = MC).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Grade real Indian giants: test Indian Railways against transport substitutes, sort barriers into natural, legal and strategic, then drive a monopolist to maximum profit where MR meets MC.',
        labels: ['Monopolistic Competition: Equilibrium', 'Oligopoly: Features and Kinked', 'Comparison of Market Structures'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_06_007', title: 'Monopolistic Competition: Equilibrium of the Firm',
          scaffold: { problem: '"StyleStudio," a monopolistically competitive boutique in Mumbai, faces demand P = 500 - 2Q. Its total cost is TC = 1000 + 100Q + 0.5Q².',
            steps: [
            { text: 'Write the demand function: P = 500 - 2Q. Compute total revenue: TR = P × Q = (500 - 2Q)Q = 500Q - 2Q².' },
            { text: 'Differentiate TR to get marginal revenue: MR = d(TR)/dQ = 500 - 4Q.' },
            { text: 'Differentiate TC to get marginal cost: TC = 1000 + 100Q + 0.5Q² → MC = d(TC)/dQ = 100 + Q.' },
            { text: 'Set MR = MC for profit maximization: 500 - 4Q = 100 + Q → 400 = 5Q → Q* = 80 units.' },
            { text: 'Find price from demand curve: P* = 500 - 2(80) = 500 - 160 = ₹340.' },
            { text: 'Compute TR = P* × Q* = 340 × 80 = ₹27,200.' },
            { text: 'Compute TC = 1000 + 100(80) + 0.5(80)² = 1000 + 8000 + 3200 = ₹12,200.' },
            { text: 'Profit π = TR - TC = 27,200 - 12,200 = ₹15,000 (supernormal profit).' },
            { text: 'Verify second-order condition: d(MR)/dQ = -4, d(MC)/dQ = 1 → MR slope < MC slope, so maximum.', faded: true, blankAnswer: 'Q* = 80 units, P* = ₹340, TR = ₹27,200, TC = ₹12,200, π.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_06_008', title: 'Oligopoly: Features and Kinked Demand Curve',
          scaffold: { problem: 'In the Indian cement market, a dominant firm faces a kinked demand curve. The upper segment (price ≥ ₹400 per bag) is P = 500 - 0.25Q.',
            steps: [
            { text: 'Find kink quantity by setting P=400 in both demand equations. Upper: 400 = 500 - 0.25Q → Q = 400.' },
            { text: 'Derive MR for upper segment: P = 500 - 0.25Q → TR = 500Q - 0.25Q² → MR₁ = 500 - 0.5Q.' },
            { text: 'Evaluate MR at Q=400: MR₁ = 500 - 200 = 300. MR₂ = 580 - 360 = 220. Vertical gap: MR ∈ [220, 300].' },
            { text: 'Find MC at Q=400: MC = 100 + 0.1(400) = 140. Since 140 ∉ [220, 300], equilibrium is not at kink.' },
            { text: 'New MC at Q=400: 150 + 40 = 190. Still not in [220,300]. Re-solve lower: 150 + 0.1Q = 580 - 0.9Q → Q = 430 → P = 580.', faded: true, blankAnswer: '(a) Q_k=400, P_k=₹400. (b) MR₁=500-0.5Q, MR₂=580-0.9Q. (c).' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_06_009', title: 'Comparison of Market Structures: Perfect Competition, Monopoly and Monopolistic Competition',
          caseStudy: { intro: 'Imagine you are buying three different products in India: (1) wheat from a local mandi where hundreds of farmers sell identical grain, (2) a life-saving.',
            decisions: [{ prompt: 'Define "monopolistic competition" and state two features that distinguish it from both perfect competition and monopoly.', options: [
                { text: 'Monopolistic competition is a market structure with many firms selling differentiated', outcome: 'Monopolistic competition is a market structure with many firms selling differentiated products that.' },
                { text: 'monopolistic competition is like monopoly', outcome: 'Not quite — Students often think "monopolistic competition is a type of monopoly" because of the word.', reveals: 'monopolistic-competition-is-a-type' },
                { text: 'monopolistic competition is a type of monopoly', outcome: 'Not quite — Students often think "monopolistic competition is a type of monopoly" because of the word.', reveals: 'monopolistic-competition-is-a-type' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A city\'s water supply needs ₹10,000 crore of pipes plus trivial per-litre cost. A consultant urges splitting the network between two companies \'because competition always lowers prices\'.',
            decisions: [{ prompt: 'Is splitting this monopoly smart?', options: [
                { text: 'No — this is a natural monopoly: huge fixed cost spread over the whole market beats two duplicated grids; splitting raises average cost for everyone, so regulated single supply is cheaper.', outcome: 'Competition helps where entry is feasible; where scale economies run past total demand, a second network is pure duplication.' },
                { text: 'Yes — any single seller is a monopoly that charges high prices, so rivals always help.', outcome: 'Monopoly is about barriers and no close substitutes, not \'high prices\' — and here entry just doubles the pipes, not the pressure to cut prices.', reveals: 'single-seller-always-bad' },
                { text: 'Yes — two firms halve the fixed cost each, so total cost falls.', outcome: 'Splitting demand doesn\'t split the fixed cost — each firm still builds a full grid, so two sets of pipes raise total cost.', reveals: 'entry-shares-fixed-cost' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_06_009', title: 'You made it',
          caseStudy: { intro: 'You can now define market power precisely — and explain why it survives behind patents, scale and resource control. Non-competitive markets is where microeconomics meets the news.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_007', difficulty: 'standard',
          question: 'Monopolistic competition equilibrium occurs when a firm maximizes profit.',
          hint: 'If stuck, revisit the derivation of MR from demand (c12_eco_cbse_06_002) and the.',
          misconception: 'Students often believe that because monopolistic competition has "competition" in its name, the long-run outcome.',
          parts: [
                { id: 'a', prompt: 'Define the profit-maximization condition for a monopolistically competitive firm in the short run and state the relationship between price and marginal cost.', answer: 'Correct answer: The firm maximizes profit where MR = MC',
                  options: ['Correct answer: The firm maximizes profit where MR = MC', 'competition', 'excess capacity', 'unused capacity'],
                  hint: 'If stuck, revisit the derivation of MR from demand (c12_eco_cbse_06_002) and the short-run monopoly.',
                  misconception: 'Students often believe that because monopolistic competition has "competition" in its name, the long-run outcome is identical to perfect.' },
                { id: 'b', prompt: 'A monopolistically competitive firm faces demand P = 200 - 0.5Q and has total cost TC = 2000 + 40Q.', answer: 'Step 1: TR = P×Q = (200 - 0.5Q)Q = 200Q - 0.5Q²',
                  options: ['Step 1: TR = P×Q = (200 - 0.5Q)Q = 200Q - 0.5Q²', 'competition', 'excess capacity', 'unused capacity'],
                  hint: 'If stuck, revisit the derivation of MR from demand (c12_eco_cbse_06_002) and the short-run monopoly.',
                  misconception: 'Students often believe that because monopolistic competition has "competition" in its name, the long-run outcome is identical to perfect.' }
          ],
            remediations: { 'because-monopolistic-competition-has-competition': { steps: ['If the student cannot derive the long-run tangency condition: (1) Revisit c12_eco_cbse_06_006 to recall that product.', '(2) Revisit c12_eco_cbse_06_003 (Monopoly Equilibrium) to practice the MR=MC rule and profit calculation.', '(3) Draw the standard diagram: downward-sloping AR and MR, U-shaped AC and MC.', 'Show short-run supernormal profit (AR > AC at Q*).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that because monopolistic competition has "competition" in its name, the long-run outcome.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Monopolistic competition is socially wasteful because firms operate with excess capacity and charge P > MC.', answer: 'Correct answer: The statement overlooks the benefit of product variety',
                  options: ['Correct answer: The statement overlooks the benefit of product variety', 'competition', 'excess capacity', 'unused capacity'],
                  hint: 'If stuck, revisit the derivation of MR from demand (c12_eco_cbse_06_002) and the short-run monopoly.',
                  misconception: 'Students often believe that because monopolistic competition has "competition" in its name, the long-run outcome is identical to perfect.' },
                { id: 'b', prompt: 'Construct a numerical example where a monopolistically competitive firm in long-run equilibrium has demand P = a - bQ and cost TC = F + cQ.', answer: 'Let demand: P = 100 - Q (so a=100, b=1)',
                  options: ['Let demand: P = 100 - Q (so a=100, b=1)', 'competition', 'excess capacity', 'unused capacity'],
                  hint: 'If stuck, revisit the derivation of MR from demand (c12_eco_cbse_06_002) and the short-run monopoly.',
                  misconception: 'Students often believe that because monopolistic competition has "competition" in its name, the long-run outcome is identical to perfect.' }
          ],
            remediations: { 'because-monopolistic-competition-has-competition': { steps: ['If the student cannot derive the long-run tangency condition: (1) Revisit c12_eco_cbse_06_006 to recall that product.', '(2) Revisit c12_eco_cbse_06_003 (Monopoly Equilibrium) to practice the MR=MC rule and profit calculation.', '(3) Draw the standard diagram: downward-sloping AR and MR, U-shaped AC and MC.', 'Show short-run supernormal profit (AR > AC at Q*).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_008', difficulty: 'standard',
          question: 'Oligopoly is a market structure characterized by a small number of large firms.',
          hint: 'If stuck on MR derivation or kink geometry, revisit c12_eco_cbse_06_002 (Monopoly AR/MR.',
          misconception: 'Students often believe the kink in the demand curve occurs at the profit-maximizing output determined by MC=MR, i.e.',
          parts: [
                { id: 'a', prompt: 'An oligopoly firm faces the following kinked demand curve: For P ≥ 100: P = 140 - 0.4Q For P ≤ 100: P = 180 - 0.8Q The current price is ₹100.', answer: 'Find the kink quantity',
                  options: ['Find the kink quantity', 'the firm chooses the kink'],
                  hint: 'If stuck on MR derivation or kink geometry, revisit c12_eco_cbse_06_002 (Monopoly AR/MR curves) and.',
                  misconception: 'Students often believe the kink in the demand curve occurs at the profit-maximizing output determined by MC=MR, i.e., they think the firm.' },
                { id: 'b', prompt: 'Compare the kinked demand curve model with the monopolistic competition model (c12_eco_cbse_06_006) on: (i) number of firms, (ii) nature of product, (iii).', answer: '(i) Oligopoly: few firms (2-10)',
                  options: ['(i) Oligopoly: few firms (2-10)', 'both have price rigidity', 'oligopoly has many firms', 'the firm chooses the kink'],
                  hint: 'If stuck on MR derivation or kink geometry, revisit c12_eco_cbse_06_002 (Monopoly AR/MR curves) and.',
                  misconception: 'Students often believe the kink in the demand curve occurs at the profit-maximizing output determined by MC=MR, i.e., they think the firm.' }
          ],
            remediations: { 'the-kink-in-the-demand': { steps: ['If the student cannot derive the MR discontinuity: (1) Revisit c11_math_cbse_13_009 (algebra of derivatives) to recall.', '(2) Practice: Given P = a - bQ, derive MR = a - 2bQ.', '(3) Draw two demand segments meeting at a kink, compute MR for each at the kink quantity, and observe the gap.', '(4) Use the worked example 3 as a template: plug in numbers, find where MC intersects the gap.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_009', difficulty: 'standard',
          question: 'Comparison of market structures is the systematic analysis of how perfect.',
          hint: 'If stuck on MR=MC derivation, revisit c11_math_cbse_13_007 (derivative of polynomial) and.',
          misconception: 'Students often think "monopolistic competition is a type of monopoly" because of the word "monopoly" in the name.',
          parts: [
                { id: 'a', prompt: 'A perfectly competitive firm faces market price ₹50. Its total cost function is TC = 100 + 10Q + Q².', answer: '**Perfect Competition:** P=MR=50',
                  options: ['**Perfect Competition:** P=MR=50', 'monopolistic competition is a type of monopoly', 'monopoly'],
                  hint: 'If stuck on MR=MC derivation, revisit c11_math_cbse_13_007 (derivative of polynomial) and.',
                  misconception: 'Students often think "monopolistic competition is a type of monopoly" because of the word "monopoly" in the name.' }
          ],
            remediations: { 'monopolistic-competition-is-a-type': { steps: ['If a student confuses monopolistic competition with monopoly: 1.', 'Revisit **c12_eco_cbse_06_006** (Monopolistic Competition: Features) and **c12_eco_cbse_06_001** (Monopoly: Barriers.', 'Create a two-column table: "Barriers to Entry" and "Long-Run Profit".', 'Draw the long-run equilibrium diagrams side-by-side: Monopoly (P>MC, P>AC, supernormal profit) vs Monopolistic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
