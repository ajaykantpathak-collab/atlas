import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch07_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch07_p2: SimDef = {
    id: 'v3_c12_eco_ch07_p2',
    title: 'Introduction to Macroeconomics · Part 2/2',
    subtitle: 'Why did the Depression need a whole new economics?',
    classLevel: 12, subject: 'economics', topic: 'Introduction to Macroeconomics · Part 2/2',
    chapters: ['c12_eco_ch07'],
    nodeIds: ['c12_eco_cbse_07_007', 'c12_eco_cbse_07_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Macroeconomist', intro: 'When 25% unemployment wouldn\'t fix itself, economists admitted markets don\'t always clear. Macroeconomics was born in that admission.', goal: 'Explain why aggregate outcomes differ from summed individual behaviours and identify the core macroeconomic variables.' },
    discovery: {
        question: 'Every household decides to save more by cutting spending. Classical logic says the nation gets richer — the Great Depression said otherwise. What goes wrong when everyone saves at once?',
        options: ['Fallacy of composition — less spending means less income for everyone, so actual national saving can fall even as planned saving rises', 'Nothing — more saving always means more investment', 'Banks steal the savings', 'Savings vanish into taxes'],
        answer: 'Fallacy of composition — less spending means less income for everyone, so actual national saving can fall even as planned saving rises',
        hook: 'Macro isn\'t micro scaled up — it\'s a different beast. Wage cuts help one firm hire; economy-wide wage cuts shrink everyone\'s income and demand, so hiring falls. That feedback loop is why Keynes invented macroeconomics in the Depression\'s rubble.',
    },
    teaching: [
        { title: 'Phases of Circular Flow: Production, Income and Expenditure', text: 'The three phases of circular flow – production, income generation, and expenditure – represent the continuous cycle where firms produce goods and services using factor services, pay factor incomes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the economy\'s vital signs — GDP, unemployment, inflation, growth — and trace how one collapsed sector (say, textile exports) cascades through the circular flow into a full recession via the multiplier.',
        labels: ['Phases of Circular Flow', 'Assumptions and Limitations'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_007', title: 'Phases of Circular Flow: Production, Income and Expenditure',
          scaffold: { problem: 'A small bakery in Delhi produces 2,500 loaves of bread per month, selling each at ₹40.',
            steps: [
            { text: 'Calculate value of output = 2,500 loaves × ₹40 = ₹1,00,000.' },
            { text: 'Calculate factor payments: Wages = 5 × ₹8,000 = ₹40,000; Rent = ₹20,000; Interest = ₹10,000. Sum = ₹70,000.' },
            { text: 'Profit = Value of output - (Wages+Rent+Interest) = ₹1,00,000 - ₹70,000 = ₹30,000.' },
            { text: 'Total factor income = ₹40,000 + ₹20,000 + ₹10,000 + ₹30,000 = ₹1,00,000. Identity verified.' },
            { text: 'Expenditure phase: All factor income (₹1,00,000) is spent on bread and other goods.', faded: true, blankAnswer: 'Value of output = ₹1,00,000. Factor incomes: Wages ₹40,000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_07_008', title: 'Assumptions and Limitations of the Circular Flow Model',
          scaffold: { problem: 'An economy is described by the following behavioural equations (all in ₹ crore): C = 200 + 0.8(Y - T), I = 150 - 10r, G = 200, T = 0.2Y,.',
            steps: [
            { text: 'Identify the sectors present: Households (C, S, T), Firms (I), Government (G, T), Foreign (X, M) → four-sector model.' },
            { text: 'Check standard assumptions: (a) Households consume based on disposable income (C = f(Yd)) — standard.' },
            { text: 'The basic circular flow (even four-sector) treats I as an exogenous injection.' },
            { text: 'The violated assumption is "Investment is autonomous (exogenous) and not influenced by interest rates." The model now.' },
            { text: 'Conclusion: The system embeds the circular flow identities but adds a behavioural equation (I = 150 - 10r) that takes.', faded: true, blankAnswer: 'Assumptions implicit: four sectors, households consume out.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'During a downturn, an op-ed urges every household to slash spending and save more, claiming \'if each family saves more, national saving must rise — it\'s just addition\'.',
            decisions: [{ prompt: 'Does everyone saving more lift national saving?', options: [
                { text: 'Not necessarily — the paradox of thrift: if all households cut consumption together, aggregate demand and income fall, and actual saving (S = I) can stay flat or even shrink despite bigger saving intentions.', outcome: 'What\'s true for one household is false for all at once — income is endogenous, so the aggregate doesn\'t behave like a scaled-up family budget.' },
                { text: 'Yes — the economy is just a big household, so saving more at the micro level always sums to more saving at the macro level.', outcome: 'That\'s the fallacy of composition: planned saving rises while the income drop it triggers erases the gain.', reveals: 'macro-is-scaled-micro' },
                { text: 'Yes — since saving equals Y minus C, cutting C mathematically must raise S.', outcome: 'Only if Y were fixed — but Y falls with the demand collapse, so the identity gives no free rise in S.', reveals: 'intent-equals-outcome' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_07_008', title: 'You made it',
          caseStudy: { intro: 'You can now see the economy as a system of feedbacks, not a pile of separate markets. That\'s the lens the rest of macro — and every Budget speech — is built on.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_007', difficulty: 'standard',
          question: 'The three phases of circular flow – production, income generation, and.',
          hint: 'Review factor payments and the circular flow two-sector model (node c12_eco_cbse_07_003).',
          misconception: 'Students often think the three phases occur sequentially in time (first production, then income, then expenditure).',
          parts: [
                { id: 'a', prompt: 'Why does the production phase necessarily precede the income generation phase in the circular flow? Explain using the concept of factor services.', answer: 'Production requires factor services (land, labour, capital, entrepreneurship)',
                  options: ['Production requires factor services (land, labour, capital, entrepreneurship)', 'income comes first'],
                  hint: 'Review factor payments and the circular flow two-sector model (node c12_eco_cbse_07_003).',
                  misconception: 'Students often think the three phases occur sequentially in time (first production, then income, then expenditure) rather than.' }
          ],
            remediations: { 'the-three-phases-occur-sequentially': { steps: ['If the student holds the sequential misconception, use a timeline diagram: show a factory operating continuously.', 'At any moment, it is producing (phase 1), has just paid wages for last month\'s work (phase 2), and workers are spending.', 'Have the student track a single rupee through the cycle in real time.', 'Revisit node c12_eco_cbse_07_003 (two-sector circular flow) to see the simultaneous inner and outer loops.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_008', difficulty: 'standard',
          question: 'The Circular Flow Model is a simplified representation of the macroeconomy that.',
          hint: 'Re-draw the four-sector diagram from node c12_eco_cbse_07_004, then write the equilibrium.',
          misconception: 'Students often write: "The circular flow model assumes savings = investment, so there is no problem of deficient.',
          parts: [
                { id: 'a', prompt: 'State the four core assumptions of the basic two-sector circular flow model as presented in NCERT Class 12 Macroeconomics.', answer: 'The four core assumptions are: (1) Only two sectors',
                  options: ['The four core assumptions are: (1) Only two sectors', 'households save a fixed proportion', 'explain the equilibrium condition', 'ex-ante vs ex-post'],
                  hint: 'Re-draw the four-sector diagram from node c12_eco_cbse_07_004, then write the equilibrium condition.',
                  misconception: 'Students often write: "The circular flow model assumes savings = investment, so there is no problem of deficient demand." This confuses the.' },
                { id: 'b', prompt: 'In a three-sector model (households, firms, government), the government collects ₹200 crore in taxes (T) and spends ₹250 crore (G).', answer: 'Step 1: Identify leakages = S + T = 50 + 200 = ₹250 crore',
                  options: ['Step 1: Identify leakages = S + T = 50 + 200 = ₹250 crore', 'equilibrium because G > T', 'explain the equilibrium condition', 'ex-ante vs ex-post'],
                  hint: 'Re-draw the four-sector diagram from node c12_eco_cbse_07_004, then write the equilibrium condition.',
                  misconception: 'Students often write: "The circular flow model assumes savings = investment, so there is no problem of deficient demand." This confuses the.' },
                { id: 'c', prompt: 'Compare the limitation "model assumes constant price level" with "model ignores income distribution." Which limitation is more critical for analysing (a).', answer: 'inflation targeting by RBI, and (',
                  options: ['inflation targeting by RBI, and (', 'explain the equilibrium condition', 'ex-ante vs ex-post', 'savings = investment, so there is no problem of deficient demand'],
                  hint: 'Re-draw the four-sector diagram from node c12_eco_cbse_07_004, then write the equilibrium condition.',
                  misconception: 'Students often write: "The circular flow model assumes savings = investment, so there is no problem of deficient demand." This confuses the.' }
          ],
            remediations: { 'students-often-write-the-circular': { steps: ['Revisit node c12_eco_cbse_07_006 (Leakages and Injections) — re-derive the equilibrium condition S + T + M = I + G +.', 'Use a numerical example: Y=1000, C=800, S=200, I=150 → unplanned inventory accumulation = 50 → firms cut output.', 'Practice CBSE 2023 Q12 (4 marks): "Distinguish between ex-ante and ex-post investment.', 'Re-attempt Diagnostic Question 3 with explicit "planned" vs "actual" labels.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write: "The circular flow model assumes savings = investment, so there is no problem of deficient.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The four-sector circular flow model (Y = C + I + G + X - M) fully captures the Indian economy for policy analysis because it includes.', answer: 'The statement is false',
                  options: ['The statement is false', 'explain the equilibrium condition', 'ex-ante vs ex-post', 'savings = investment, so there is no problem of deficient demand'],
                  hint: 'Re-draw the four-sector diagram from node c12_eco_cbse_07_004, then write the equilibrium condition.',
                  misconception: 'Students often write: "The circular flow model assumes savings = investment, so there is no problem of deficient demand." This confuses the.' },
                { id: 'b', prompt: 'Construct a modified circular flow diagram for an economy with: (i) households that save and pay taxes, (ii) firms that invest, (iii) government that spends.', answer: 'A good answer draws: Households → (C, S, T) → Firms/Govt/Foreign',
                  options: ['A good answer draws: Households → (C, S, T) → Firms/Govt/Foreign', 'explain the equilibrium condition', 'ex-ante vs ex-post', 'savings = investment, so there is no problem of deficient demand'],
                  hint: 'Re-draw the four-sector diagram from node c12_eco_cbse_07_004, then write the equilibrium condition.',
                  misconception: 'Students often write: "The circular flow model assumes savings = investment, so there is no problem of deficient demand." This confuses the.' }
          ],
            remediations: { 'students-often-write-the-circular': { steps: ['Revisit node c12_eco_cbse_07_006 (Leakages and Injections) — re-derive the equilibrium condition S + T + M = I + G +.', 'Use a numerical example: Y=1000, C=800, S=200, I=150 → unplanned inventory accumulation = 50 → firms cut output.', 'Practice CBSE 2023 Q12 (4 marks): "Distinguish between ex-ante and ex-post investment.', 'Re-attempt Diagnostic Question 3 with explicit "planned" vs "actual" labels.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
