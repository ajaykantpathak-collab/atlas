import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch15 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch15: SimDef = {
    id: 'v3_c12_eco_ch15',
    title: 'The **1991 Economic Crisis** refers to a severe.',
    subtitle: 'This node covers the background and causes of the 1991 crisis, the depletion of foreign.',
    classLevel: 12, subject: 'economics', topic: 'The **1991 Economic Crisis** refers to a severe.',
    chapters: ['c12_eco_ch15'],
    nodeIds: ['c12_eco_cbse_15_001', 'c12_eco_cbse_15_002', 'c12_eco_cbse_15_003', 'c12_eco_cbse_15_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Think of how a country pays for things it imports from abroad, like crude oil or machinery—it needs foreign.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Suppose the government of India decides to reduce its equity share in a public sector bank from 100% to 49% by selling shares to private investors. 1.',
        options: ['**Model Answer:** 1', 'Privatisation', 'Disinvestment'],
        answer: '**Model Answer:** 1',
        hook: 'Students often believe that "Privatisation" and "Disinvestment" are completely synonymous, or that any sale.',
    },
    teaching: [
        { title: 'The **1991 Economic Crisis** refers to.', text: 'The **1991 Economic Crisis** refers to a severe macroeconomic crisis in India characterized by a persistent Balance of Payments (BOP) deficit, high fiscal deficit, double-digit inflation, and foreign.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_15_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_eco_cbse_15_001', title: 'The **1991 Economic Crisis** refers to.',
          caseStudy: { intro: 'Think of how a country pays for things it imports from abroad, like crude oil or machinery—it needs foreign currency, primarily US Dollars.',
            decisions: [{ prompt: 'What are the two broad classifications of the measures introduced under the New Economic Policy (NEP) of 1991? Define each.', options: [
                { text: 'The two classifications are: 1', outcome: 'The two classifications are: 1. **Stabilisation Measures**: Short-term measures aimed at correcting.' },
                { text: 'Liberalisation, Privatisation, and Globalisation', outcome: 'Not quite — "The New Economic Policy (LPG) was introduced voluntarily by India to modernise its economy.".', reveals: 'the-new-economic-policy-lpg' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_15_002', title: 'According to the NCERT Class 12.',
          caseStudy: { intro: 'Before 1991, starting a business in India required navigating a complex system of government permissions known as the "License Raj," and foreign products were.',
            decisions: [{ prompt: 'What is the difference between privatisation and disinvestment under the New Economic Policy of 1991?', options: [
                { text: '**Model Answer:** * **Privatisation** is a broader concept that refers to the transfer of', outcome: '**Model Answer:** * **Privatisation** is a broader concept that refers to the transfer.' },
                { text: 'Privatisation', outcome: 'Not quite — Students often believe that "Privatisation" and "Disinvestment" are completely synonymous, or that.', reveals: 'privatisation-and-disinvestment-are-completely' },
                { text: 'Disinvestment', outcome: 'Not quite — Students often believe that "Privatisation" and "Disinvestment" are completely synonymous, or that.', reveals: 'privatisation-and-disinvestment-are-completely' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_15_003', title: '**Financial Sector Reforms** refer to.',
          caseStudy: { intro: 'Before 1991, if a bank wanted to open a new branch or change its interest rates, it had to run to the Reserve Bank of India (RBI) for permission, which stifled.',
            decisions: [{ prompt: 'What major shift occurred in the role of the Reserve Bank of India (RBI) as a result of the 1991 financial sector reforms?', options: [
                { text: '**Model Answer:** The role of the RBI was reduced from a *regulator* to a *facilitator*', outcome: '**Model Answer:** The role of the RBI was reduced from a *regulator* to a *facilitator* of the.' },
                { text: 'the RBI lost all its power and ceased to control banks', outcome: 'Not quite — The belief that the 1991 reforms completely abolished the RBI\'s control over the banking sector.', reveals: 'the-belief-that-the-1991' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_15_004', title: 'You made it',
          caseStudy: { intro: 'You finished The **1991 Economic Crisis** refers to a severe. — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_15_001', difficulty: 'standard',
          question: 'The **1991 Economic Crisis** refers to a severe macroeconomic crisis in India.',
          hint: 'None',
          misconception: '"The New Economic Policy (LPG) was introduced voluntarily by India to modernise its economy." **Correction**: India did.',
          parts: [
                { id: 'a', prompt: 'What are the two broad classifications of the measures introduced under the New Economic Policy (NEP) of 1991? Define each.', answer: 'The two classifications are: 1',
                  options: ['The two classifications are: 1', 'Liberalisation, Privatisation, and Globalisation'],
                  hint: 'None',
                  misconception: '"The New Economic Policy (LPG) was introduced voluntarily by India to modernise its economy." **Correction**: India did not voluntarily.' },
                { id: 'b', prompt: 'Why did India have to approach the IMF and World Bank in 1991, and what were the conditions attached to the loan?', answer: 'India approached the IMF and World Bank (IBRD)',
                  options: ['India approached the IMF and World Bank (IBRD)', 'fund developmental projects'],
                  hint: 'None',
                  misconception: '"The New Economic Policy (LPG) was introduced voluntarily by India to modernise its economy." **Correction**: India did not voluntarily.' }
          ],
            remediations: { 'the-new-economic-policy-lpg': { steps: ['If the student fails to grasp this concept, remind them that India\'s forex reserves were down to less than two weeks.', 'Explain that international financial institutions do not give massive loans without guarantees of economic reform.', 'Have the student write down the exact conditions imposed by these institutions to see how they directly map to the LPG.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_15_002', difficulty: 'standard',
          question: 'According to the NCERT Class 12 curriculum, the components of the New Economic.',
          hint: 'None',
          misconception: 'Students often believe that "Privatisation" and "Disinvestment" are completely synonymous, or that any sale.',
          parts: [
                { id: 'a', prompt: 'Suppose the government of India decides to reduce its equity share in a public sector bank from 100% to 49% by selling shares to private investors. 1.', answer: '**Model Answer:** 1',
                  options: ['**Model Answer:** 1', 'Privatisation', 'Disinvestment'],
                  hint: 'None',
                  misconception: 'Students often believe that "Privatisation" and "Disinvestment" are completely synonymous, or that any sale of government shares.' },
                { id: 'b', prompt: 'Explain any three major financial sector reforms introduced under Liberalisation in 1991.', answer: '**Model Answer:** The three major financial sector reforms introduced under',
                  options: ['**Model Answer:** The three major financial sector reforms introduced under', 'Privatisation', 'Disinvestment'],
                  hint: 'None',
                  misconception: 'Students often believe that "Privatisation" and "Disinvestment" are completely synonymous, or that any sale of government shares.' }
          ],
            remediations: { 'privatisation-and-disinvestment-are-completely': { steps: ['If the student gets this wrong, explain that privatisation is the broad goal of transferring control to the private.', 'Emphasize that if the government sells 10% of its shares but keeps 90%, it has performed *disinvestment*, but the.', 'Only when the government transfers majority stake or management control does it achieve full privatisation.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_15_003', difficulty: 'standard',
          question: '**Financial Sector Reforms** refer to the policy measures initiated since 1991.',
          hint: 'None',
          misconception: 'The belief that the 1991 reforms completely abolished the RBI\'s control over the banking sector, leaving banks.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**Financial Sector Reforms** refer to the policy measures initiated',
                  options: ['**Financial Sector Reforms** refer to the policy measures initiated', 'The **1991 Economic Crisis** refers to a severe macroeconomic crisis in India', 'According to the NCERT Class 12 curriculum, the components of the New Economic Policy', 'The New Economic Policy 1991 divided into two programme types: stabilisation measures'],
                  hint: 'None',
                  misconception: 'The belief that the 1991 reforms completely abolished the RBI\'s control over the banking sector, leaving banks completely unregulated.' }
          ],
            remediations: { 'the-belief-that-the-1991': { steps: ['Remind the student that the RBI did not abdicate its authority.', 'Explain that the RBI shifted from micro-managing (such as setting exact interest rates for every loan and deciding.', 'Use the analogy of a traffic police officer who stops checking every driver\'s license at every intersection but still.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_15_004', difficulty: 'standard',
          question: 'The New Economic Policy 1991 divided into two programme types: stabilisation.',
          hint: 'Work step by step.',
          misconception: 'Students memorise \'LPG\' and \'NEP 1991\' as synonyms and lose the stabilisation/structural split the exam asks for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The New Economic Policy 1991 divided into two programme types: stabilisation measures',
                  options: ['The New Economic Policy 1991 divided into two programme types: stabilisation measures', 'The **1991 Economic Crisis** refers to a severe macroeconomic crisis in India', 'According to the NCERT Class 12 curriculum, the components of the New Economic Policy', '**Financial Sector Reforms** refer to the policy measures initiated'],
                  hint: 'Recall the definition.',
                  misconception: 'Students memorise \'LPG\' and \'NEP 1991\' as synonyms and lose the stabilisation/structural split the exam asks for.' }
          ],
            remediations: { 'students-memorise-lpg-and-nep': { steps: ['Sort the measures into two columns: \'survive now\' vs \'change forever\'.', 'Devaluation/import cuts go left; delicensing/disinvestment/FDI go right.', 'LPG belongs entirely on the right.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
