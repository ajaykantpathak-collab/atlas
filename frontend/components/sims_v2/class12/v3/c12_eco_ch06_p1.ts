import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch06_p1: SimDef = {
    id: 'v3_c12_eco_ch06_p1',
    title: 'Non-Competitive Markets · Part 1/2',
    subtitle: 'One seller doesn\'t make a monopoly — zero substitutes do',
    classLevel: 12, subject: 'economics', topic: 'Non-Competitive Markets · Part 1/2',
    chapters: ['c12_eco_ch06'],
    nodeIds: ['c12_eco_cbse_06_001', 'c12_eco_cbse_06_002', 'c12_eco_cbse_06_003', 'c12_eco_cbse_06_004', 'c12_eco_cbse_06_005', 'c12_eco_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Competition economist', intro: 'When one firm faces no rival and no way in for rivals, price becomes a choice, not a fate. Study the chooser.', goal: 'Define monopoly through its four features, classify barriers to entry, and explain the downward-sloping demand and MR < AR.' },
    discovery: {
        question: 'A village\'s only doctor is technically a \'single seller\' — yet nobody calls her a monopoly abuser, while patented-drug firms are hauled up constantly. What separates a true monopoly?',
        options: ['No close substitutes plus entry barriers — single-seller status alone doesn\'t give market power when alternatives exist', 'Any single seller is automatically a monopoly', 'Monopoly just means charging high prices', 'Only government companies can be monopolies'],
        answer: 'No close substitutes plus entry barriers — single-seller status alone doesn\'t give market power when alternatives exist',
        hook: 'Monopoly needs BOTH one seller AND no close substitutes — and \'high price\' isn\'t in the definition. A monopolist faces the whole downward-sloping market demand curve, so every extra unit sold drops the price for all units: that\'s why MR falls below AR.',
    },
    teaching: [
        { title: 'Monopoly: Key Features and Barriers to Entry', text: 'Monopoly is a market structure characterized by a single seller (firm) producing a unique product with no close substitutes, where significant barriers to entry prevent other firms from entering the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Grade real Indian giants: test Indian Railways against transport substitutes, sort barriers into natural, legal and strategic, then drive a monopolist to maximum profit where MR meets MC.',
        labels: ['Monopoly: Key Features', 'Monopoly Firm: Average', 'Monopoly Equilibrium: Short Run', 'Monopoly: Inefficiency and Deadweight', 'Price Discrimination in Monopoly', 'Monopolistic Competition: Features'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eco_cbse_06_001', title: 'Monopoly: Key Features and Barriers to Entry',
          caseStudy: { intro: 'Imagine you are traveling on the Mumbai Metro — only one operator runs it, there\'s no alternative metro service, and no other company can start a competing.',
            decisions: [{ prompt: 'State the four key features of a monopoly market structure as per NCERT Class 12 Microeconomics.', options: [
                { text: 'The four key features are: (1) Single seller (firm = industry), (2) No close substitutes', outcome: 'The four key features are: (1) Single seller (firm = industry), (2) No close substitutes for the.' },
                { text: 'no close substitutes', outcome: 'Not quite — Students often think "monopoly means high price" and "any single seller is a monopoly." The precise.', reveals: 'monopoly-means-high-price-and' },
                { text: 'barriers to entry', outcome: 'Not quite — Students often think "monopoly means high price" and "any single seller is a monopoly." The precise.', reveals: 'monopoly-means-high-price-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_06_002', title: 'Monopoly Firm: Average and Marginal Revenue Curves',
          scaffold: { problem: 'A monopoly firm selling a patented medicine faces the demand curve: P = 500 - 5Q (P in ₹, Q in thousands of tablets).',
            steps: [
            { text: 'Identify the demand (AR) function: P = AR = 500 - 5Q.' },
            { text: 'Write Total Revenue function: TR = P × Q = (500 - 5Q)Q = 500Q - 5Q².' },
            { text: 'Differentiate TR with respect to Q to get MR: MR = d(TR)/dQ = 500 - 10Q.' },
            { text: 'Evaluate at Q = 20: AR = P = 500 - 5(20) = 400 ₹/unit. TR = 500(20) - 5(20)² = 10,000 - 2,000 = 8,000 thousand ₹ = ₹80.' },
            { text: 'Interpret: MR (300) > 0, so increasing output from 20 adds to total revenue.', faded: true, blankAnswer: 'TR = 500Q - 5Q²; MR = 500 - 10Q. At Q = 20: AR = ₹400/unit.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_06_003', title: 'Monopoly Equilibrium: Short Run Profit Maximisation',
          scaffold: { problem: 'A monopolist in Mumbai sells designer kurtas. The demand function is P = 500 - 5Q (P in ₹, Q in kurtas per day).',
            steps: [
            { text: 'Derive TR = P×Q = (500 - 5Q)Q = 500Q - 5Q². Then MR = d(TR)/dQ = 500 - 10Q.' },
            { text: 'Derive MC = d(TC)/dQ = 50 + 4Q.' },
            { text: 'Set MR = MC for profit maximization: 500 - 10Q = 50 + 4Q → 14Q = 450 → Q* = 450/14 ≈ 32.14 kurtas.' },
            { text: 'Find price from demand: P* = 500 - 5(32.14) = 500 - 160.7 = ₹339.3 per kurta.' },
            { text: 'Check second-order condition: d(MR)/dQ = -10, d(MC)/dQ = 4. Since -10 < 4, MC cuts MR from below → maximum.' },
            { text: 'Compute profit: TC = 1000 + 50(32.14) + 2(32.14)² = 1000 + 1607 + 2065.7 = ₹4672.7.', faded: true, blankAnswer: 'Q* ≈ 32.14 kurtas, P* ≈ ₹339.3, Profit ≈ ₹6,232.3 per day.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_06_004', title: 'Monopoly: Inefficiency and Deadweight Loss',
          scaffold: { problem: 'A monopolist faces the demand curve P = 200 - 2Q and has a constant marginal cost of MC = 40. There are no fixed costs.',
            steps: [
            { text: 'Write the demand function and derive marginal revenue. Demand: P = 200 - 2Q. Total Revenue = P*Q = 200Q - 2Q^2.' },
            { text: 'Set MR = MC to find monopoly quantity. 200 - 4Q = 40 => 4Q = 160 => Q_m = 40.' },
            { text: 'Find monopoly price from demand curve. P_m = 200 - 2*40 = 120.' },
            { text: 'Find competitive quantity where P = MC. 200 - 2Q = 40 => 2Q = 160 => Q_c = 80. Competitive price P_c = MC = 40.' },
            { text: 'Calculate deadweight loss. DWL = 1/2 * (Q_c - Q_m) * (P_m - MC) = 1/2 * (80 - 40) * (120 - 40) = 1/2 * 40 * 80 = 1600.', faded: true, blankAnswer: 'Monopoly: Q=40, P=120; Competitive: Q=80, P=40; Deadweight.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_06_005', title: 'Price Discrimination in Monopoly: Types and Conditions',
          scaffold: { problem: 'A monopolist operates in two separate markets. Market A (urban) demand: P_A = 120 – 2Q_A. Market B (rural) demand: P_B = 80 – Q_B.',
            steps: [
            { text: 'Write total revenue for each market. TR_A = P_A × Q_A = 120Q_A – 2Q_A². TR_B = P_B × Q_B = 80Q_B – Q_B².' },
            { text: 'Derive marginal revenues. MR_A = dTR_A/dQ_A = 120 – 4Q_A. MR_B = dTR_B/dQ_B = 80 – 2Q_B.' },
            { text: 'Derive marginal cost from total cost. TC = 10(Q_A+Q_B) + 0.5(Q_A+Q_B)². MC = dTC/dQ = 10 + (Q_A+Q_B).' },
            { text: 'Set MR_A = MR_B = MC. Solve the system: 120 – 4Q_A = 80 – 2Q_B → 4Q_A – 2Q_B = 40 → 2Q_A – Q_B = 20. (Equation 1).' },
            { text: 'Compute prices: P_A = 120 – 2(130/7) = 120 – 260/7 = 580/7 ≈ ₹82.86. P_B = 80 – 120/7 = 440/7 ≈ ₹62.86.' },
            { text: 'Total profit = TR_A + TR_B – TC. TR_A = (580/7)(130/7) = 75400/49 ≈ 1538.78.', faded: true, blankAnswer: 'Q_A ≈ 18.57 units, P_A ≈ ₹82.86; Q_B ≈ 17.14 units, P_B ≈.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_06_006', title: 'Monopolistic Competition: Features and Product Differentiation',
          caseStudy: { intro: 'Imagine walking down a busy street in Mumbai: you see five different coffee shops — Starbucks, Café Coffee Day, a local Irani café, a South Indian filter.',
            decisions: [{ prompt: 'State the five defining features of monopolistic competition as per NCERT Class 12 Microeconomics.', options: [
                { text: 'The five features are: (1) Large number of buyers and sellers, (2) Product', outcome: 'The five features are: (1) Large number of buyers and sellers, (2) Product differentiation, (3).' },
                { text: 'selling costs', outcome: 'Not quite — Students often think "product differentiation" means only physical differences (real.', reveals: 'product-differentiation-means-only-physical' },
                { text: 'non-price competition', outcome: 'Not quite — Students often think "product differentiation" means only physical differences (real.', reveals: 'product-differentiation-means-only-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A city\'s water supply needs ₹10,000 crore of pipes plus trivial per-litre cost. A consultant urges splitting the network between two companies \'because competition always lowers prices\'.',
            decisions: [{ prompt: 'Is splitting this monopoly smart?', options: [
                { text: 'No — this is a natural monopoly: huge fixed cost spread over the whole market beats two duplicated grids; splitting raises average cost for everyone, so regulated single supply is cheaper.', outcome: 'Competition helps where entry is feasible; where scale economies run past total demand, a second network is pure duplication.' },
                { text: 'Yes — any single seller is a monopoly that charges high prices, so rivals always help.', outcome: 'Monopoly is about barriers and no close substitutes, not \'high prices\' — and here entry just doubles the pipes, not the pressure to cut prices.', reveals: 'single-seller-always-bad' },
                { text: 'Yes — two firms halve the fixed cost each, so total cost falls.', outcome: 'Splitting demand doesn\'t split the fixed cost — each firm still builds a full grid, so two sets of pipes raise total cost.', reveals: 'entry-shares-fixed-cost' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now define market power precisely — and explain why it survives behind patents, scale and resource control. Non-competitive markets is where microeconomics meets the news.',
            decisions: [{ prompt: 'What comes next? Non-Competitive Markets · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Non-Competitive Markets · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_001', difficulty: 'standard',
          question: 'Monopoly is a market structure characterized by a single seller (firm).',
          hint: 'Revisit c6_economics_ch12_003 (supply-demand basics) and c9_eco_ch2_12 (monopoly.',
          misconception: 'Students often think "monopoly means high price" and "any single seller is a monopoly." The precise error: They confuse.',
          parts: [
                { id: 'a', prompt: 'A pharmaceutical company holds a patent for a life-saving drug in India for 20 years. Identify the type of barrier to entry this represents.', answer: 'The patent is a legal barrier to entry (government-granted exclusive right)',
                  options: ['The patent is a legal barrier to entry (government-granted exclusive right)', 'natural barrier', 'monopoly means high price', 'any single seller is a monopoly'],
                  hint: 'Revisit c6_economics_ch12_003 (supply-demand basics) and c9_eco_ch2_12 (monopoly introduction).',
                  misconception: 'Students often think "monopoly means high price" and "any single seller is a monopoly." The precise error: They confuse *market power*.' }
          ],
            remediations: { 'monopoly-means-high-price-and': { steps: ['If the student confuses monopoly with single seller or equates monopoly with high price: (1) Revisit c9_eco_ch2_12.', '(2) Draw two demand curves: one for a monopolist (downward sloping, no substitutes) and one for a single seller of.', '(3) Complete this diagnostic: "Give an example of a monopolist charging a low price.', 'Why is it still a monopoly?" The answer must reference barriers to entry, not price level.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "monopoly means high price" and "any single seller is a monopoly." The precise error: They confuse.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Indian Railways is a monopoly because it is the only provider of rail transport in India." Consider the presence of substitutes.', answer: 'The statement is partially correct but economically imprecise',
                  options: ['The statement is partially correct but economically imprecise', 'pure monopoly without qualification', 'monopoly means high price', 'any single seller is a monopoly'],
                  hint: 'Revisit c6_economics_ch12_003 (supply-demand basics) and c9_eco_ch2_12 (monopoly introduction).',
                  misconception: 'Students often think "monopoly means high price" and "any single seller is a monopoly." The precise error: They confuse *market power*.' },
                { id: 'b', prompt: 'Create a real-world Indian example of a monopoly arising from "economies of scale as a natural barrier." Explain why a second firm entering would.', answer: 'Example: Electricity distribution in a city (e.g., BSES in Delhi)',
                  options: ['Example: Electricity distribution in a city (e.g., BSES in Delhi)', 'Google search', 'monopoly means high price', 'any single seller is a monopoly'],
                  hint: 'Revisit c6_economics_ch12_003 (supply-demand basics) and c9_eco_ch2_12 (monopoly introduction).',
                  misconception: 'Students often think "monopoly means high price" and "any single seller is a monopoly." The precise error: They confuse *market power*.' }
          ],
            remediations: { 'monopoly-means-high-price-and': { steps: ['If the student confuses monopoly with single seller or equates monopoly with high price: (1) Revisit c9_eco_ch2_12.', '(2) Draw two demand curves: one for a monopolist (downward sloping, no substitutes) and one for a single seller of.', '(3) Complete this diagnostic: "Give an example of a monopolist charging a low price.', 'Why is it still a monopoly?" The answer must reference barriers to entry, not price level.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_002', difficulty: 'standard',
          question: 'For a monopoly firm, Average Revenue (AR) is the revenue per unit of output.',
          hint: 'If stuck, review differentiation of quadratic functions (c11_math_cbse_13_007) and the.',
          misconception: 'Students often think the MR curve for a linear demand has the same slope as AR (just shifted down) or that MR = AR for.',
          parts: [
                { id: 'a', prompt: 'Define Average Revenue and Marginal Revenue for a monopoly firm. How does the AR curve relate to the market demand curve?', answer: 'Correct Answer: Average Revenue (AR) = Total Revenue / Quantity = Price',
                  options: ['Correct Answer: Average Revenue (AR) = Total Revenue / Quantity = Price', 'AR is not the demand curve', 'MR = AR for monopoly'],
                  hint: 'If stuck, review differentiation of quadratic functions (c11_math_cbse_13_007) and the definition.',
                  misconception: 'Students often think the MR curve for a linear demand has the same slope as AR (just shifted down) or that MR = AR for the first unit only.' },
                { id: 'b', prompt: 'Compare the AR and MR curves of a monopoly with those of a perfectly competitive firm. Why can a monopoly not choose both price and quantity independently?', answer: 'Correct Answer: In perfect competition, AR = MR = P (horizontal line)',
                  options: ['Correct Answer: In perfect competition, AR = MR = P (horizontal line)', 'Monopoly can set any price and sell any quantity', 'AR and MR are same for both'],
                  hint: 'If stuck, review differentiation of quadratic functions (c11_math_cbse_13_007) and the definition.',
                  misconception: 'Students often think the MR curve for a linear demand has the same slope as AR (just shifted down) or that MR = AR for the first unit only.' }
          ],
            remediations: { 'the-mr-curve-for-a': { steps: ['Revisit the definition of Total Revenue (TR = P × Q) and practice computing TR for a demand schedule (e.g., P = 100.', 'Compute ΔTR/ΔQ for each 1-unit increase to see the discrete MR values.', 'Plot AR and discrete MR points; observe MR falls faster.', 'Derive TR = 100Q - 2Q² and differentiate to get MR = 100 - 4Q.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_003', difficulty: 'standard',
          question: 'Monopoly short-run equilibrium is the output level where a single seller.',
          hint: 'If stuck on MR/MC derivation, revisit c12_eco_cbse_06_002 for revenue curves and Class 11.',
          misconception: 'Students often believe that a monopoly always sets price where demand is elastic (MR>0) and therefore always earns.',
          parts: [
                { id: 'a', prompt: 'State the necessary and sufficient conditions for a monopoly firm\'s short-run profit-maximizing equilibrium.', answer: 'Necessary: MR = MC',
                  options: ['Necessary: MR = MC', 'identify the correct statement'],
                  hint: 'If stuck on MR/MC derivation, revisit c12_eco_cbse_06_002 for revenue curves and Class 11 calculus.',
                  misconception: 'Students often believe that a monopoly always sets price where demand is elastic (MR>0) and therefore always earns positive profit.' }
          ],
            remediations: { 'a-monopoly-always-sets-price': { steps: ['Revisit c12_eco_cbse_06_002 to rebuild AR/MR derivation from demand.', 'Review Class 11 cost curves (TC, AC, MC, AVC) — if unavailable, use c9_eco_ch1_1 to c9_eco_ch2_12 for basic cost.', 'Practice the 3-step drill: (a) Write MR and MC functions, (b) Solve MR=MC for Q*, (c) Plug Q* into demand for P*, then.', 'Draw the diagram: label MR, MC, AR, AC, AVC; shade profit/loss rectangle; mark shutdown point at min AVC.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_004', difficulty: 'standard',
          question: 'Monopoly inefficiency refers to the welfare loss arising because a monopoly.',
          hint: 'If stuck, revisit monopoly equilibrium (c12_eco_cbse_06_003) and perfect competition.',
          misconception: 'Students often think that deadweight loss is the same as the monopoly\'s profit rectangle, or that the deadweight loss.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Monopoly inefficiency refers to the welfare loss arising',
                  options: ['Monopoly inefficiency refers to the welfare loss arising', 'Monopoly is a market structure characterized by a single seller (firm) producing a unique', 'For a monopoly firm, Average Revenue (AR) is the revenue per unit of output sold and', 'Monopoly short-run equilibrium is the output level where a single seller maximizes profit'],
                  hint: 'If stuck, revisit monopoly equilibrium (c12_eco_cbse_06_003) and perfect competition.',
                  misconception: 'Students often think that deadweight loss is the same as the monopoly\'s profit rectangle, or that the deadweight loss triangle is bounded.' }
          ],
            remediations: { 'deadweight-loss-is-the-same': { steps: ['If the student confuses the DWL triangle boundaries, have them revisit: 1) the demand curve as marginal benefit curve.', 'Then re-derive the graph step by step: draw demand and MC, mark Q_m (MR=MC) and Q_c (P=MC), identify the triangle.', 'Practice calculating DWL with numerical examples until the distinction between MR and demand is clear.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_005', difficulty: 'standard',
          question: 'Price discrimination occurs when a monopoly firm charges different prices.',
          hint: 'If stuck, revisit the derivation of MR from TR = P×Q for linear demand.',
          misconception: 'Students often believe that price discrimination requires the monopolist to know each consumer’s exact willingness.',
          parts: [
                { id: 'a', prompt: 'A monopolist sells in two separate markets. Market 1 demand: P₁ = 100 – Q₁. Market 2 demand: P₂ = 80 – 0.5Q₂. Total cost: TC = 20Q, where Q = Q₁ + Q₂.', answer: 'Step 1: Find MR in each market',
                  options: ['Step 1: Find MR in each market', 'third-degree discrimination is impossible without perfect information'],
                  hint: 'If stuck, revisit the derivation of MR from TR = P×Q for linear demand (c12_eco_cbse_06_002) and.',
                  misconception: 'Students often believe that price discrimination requires the monopolist to know each consumer’s exact willingness to pay (first-degree).' }
          ],
            remediations: { 'price-discrimination-requires-the-monopolist': { steps: ['If the student cannot distinguish the degrees or apply MR₁ = MR₂ = MC: (1) Revisit c12_eco_cbse_06_002 to reinforce the.', '(2) Review c12_eco_cbse_06_003 for the single-market MR=MC rule.', '(3) Practice a two-market numerical problem step-by-step: write demand, derive MR, set equal to MC, solve for Q and P.', '(4) Use a diagram: draw two demand/MR curves side by side with a horizontal MC line, show the equilibrium quantities.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_06_006', difficulty: 'standard',
          question: 'Monopolistic competition is a market structure characterized by a large number.',
          hint: 'If stuck, revisit Class 11 "Market Equilibrium" (c11_eco_cbse_02_010) and practice.',
          misconception: 'Students often think "product differentiation" means only physical differences (real differentiation) and forget.',
          parts: [
                { id: 'a', prompt: 'State the five defining features of monopolistic competition as per NCERT Class 12 Microeconomics.', answer: 'The five features are: (1) Large number of buyers and sellers, (2) Product',
                  options: ['The five features are: (1) Large number of buyers and sellers, (2) Product', 'selling costs', 'non-price competition', 'product differentiation'],
                  hint: 'If stuck, revisit Class 11 "Market Equilibrium" (c11_eco_cbse_02_010) and practice drawing firm vs.',
                  misconception: 'Students often think "product differentiation" means only physical differences (real differentiation) and forget perceived differentiation.' },
                { id: 'b', prompt: 'Explain why the demand curve facing a firm in monopolistic competition is downward sloping but more elastic than a monopolist\'s demand curve.', answer: 'The demand curve slopes downward',
                  options: ['The demand curve slopes downward', 'demand is perfectly elastic', 'demand is inelastic', 'product differentiation'],
                  hint: 'If stuck, revisit Class 11 "Market Equilibrium" (c11_eco_cbse_02_010) and practice drawing firm vs.',
                  misconception: 'Students often think "product differentiation" means only physical differences (real differentiation) and forget perceived differentiation.' }
          ],
            remediations: { 'product-differentiation-means-only-physical': { steps: ['If the student cannot distinguish real vs.', 'perceived differentiation: Step 1 — Revisit Class 11 "Market Equilibrium" (c11_eco_cbse_02_010) to recall perfect.', 'Step 2 — Take two Indian FMCG products (e.g., Colgate vs.', 'Pepsodent toothpaste) and list 3 tangible differences (ingredients, flavor variants) and 3 intangible ones (brand.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
