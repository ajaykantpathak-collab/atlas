import type { SimDef } from '../../engine/types';

/** v3 generated — c10_civ_ch05_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_civ_ch05_p2: SimDef = {
    id: 'v3_c10_civ_ch05_p2',
    title: 'Outcomes of Democracy · Part 2/2',
    subtitle: 'Weigh growth numbers against dignity, rights and real development',
    classLevel: 10, subject: 'civics', topic: 'Outcomes of Democracy · Part 2/2',
    chapters: ['c10_civ_ch05'],
    nodeIds: ['c10_civ_cbse_05_007', 'c10_civ_cbse_05_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a development economist comparing national report cards', intro: 'A scholarship stuck in a government office gets released within 30 days of an RTI filing. That small win is accountability — one of democracy\'s quieter outcomes.', goal: 'Distinguish growth from development and argue democracy\'s outcomes — accountability, legitimacy, dignity — with evidence.' },
    discovery: {
        question: 'From 1950 to 2000, dictatorships averaged 4.42% growth a year while democracies averaged 3.95%. Case closed for dictatorship — right?',
        options: ['No — dictatorships swung wildly between booms and collapses, while democracies grew slower but never crashed into famine', 'Yes — a higher average growth rate settles the debate', 'No — the data is too old to mean anything today', 'Yes — but only for countries that were already rich'],
        answer: 'No — dictatorships swung wildly between booms and collapses, while democracies grew slower but never crashed into famine',
        hook: 'The average hides the horror. Half a point of growth buys you stability, dignity and no catastrophic lows — development is more than a GDP line going up.',
    },
    teaching: [
        { title: 'Assessing Democracy\'s Outcomes: How to Evaluate Democratic Performance', text: 'Assessing democracy\'s outcomes means evaluating the performance of a democratic system against a set of normative and empirical criteria — primarily accountability, responsiveness, legitimacy.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_civ_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Judge two countries: one dictatorial with 8% growth but 65% literacy, one democratic at 5% with 92% literacy — build the case for which is truly more \'developed.\'',
        labels: ['Assessing Democracy\'s Outcomes: How', 'Transparency and Corruption'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_007', title: 'Assessing Democracy\'s Outcomes: How to Evaluate Democratic Performance',
          caseStudy: { intro: 'Imagine you read a news headline: "Country X holds regular elections but 30% of its children are malnourished." A Class 10 student might wonder: *Is this.',
            decisions: [{ prompt: 'Name any three criteria used to assess the outcomes of democracy as per the Class 10 NCERT framework.', options: [
                { text: 'Correct answer: Any three of', outcome: 'Correct answer: Any three of — (1) Accountable, responsive and legitimate government, (2) Economic.' },
                { text: 'free media, independent judiciary, federalism', outcome: 'Not quite — Students often believe **"Democracy\'s outcome is just whether elections are held regularly and.', reveals: 'democracy-s-outcome-is-just' },
                { text: 'Democracy\'s outcome is just whether elections are held regularly and freely', outcome: 'Not quite — Students often believe **"Democracy\'s outcome is just whether elections are held regularly and.', reveals: 'democracy-s-outcome-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_008', title: 'Transparency and Corruption in Democratic Governance',
          caseStudy: { intro: 'Imagine you read a news report about a local road repair project where the contractor used substandard materials but the bill was passed without inspection.',
            decisions: [{ prompt: 'What is the primary purpose of the Right to Information Act, 2005 in the context of democratic governance?', options: [
                { text: 'The RTI Act empowers citizens to request information from public authorities, making', outcome: 'The RTI Act empowers citizens to request information from public authorities, making government.' },
                { text: 'RTI is only for getting personal documents', outcome: 'Not quite — Students often believe that the RTI Act itself investigates and punishes corruption.', reveals: 'the-rti-act-itself-investigates' },
                { text: 'RTI is a scheme for welfare benefits', outcome: 'Not quite — Students often believe that the RTI Act itself investigates and punishes corruption.', reveals: 'the-rti-act-itself-investigates' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_007', title: 'A real-world call',
          caseStudy: { intro: 'A country develops fast under a strong central government that limits criticism. A slower, messier democracy next door protects dissent but delivers less growth.',
            decisions: [{ prompt: 'Which country would you rather live in — and what does \'outcome\' even mean?', options: [
                { text: 'The fast one — growth is the outcome that matters', outcome: 'Defensible — until the criticism you\'d want to make becomes illegal to voice.' },
                { text: 'The democratic one — the process IS the outcome', outcome: 'Democracy\'s defenders argue the ability to change course peacefully is worth more than any single result.' },
                { text: 'Neither is pure — judge by who\'s protected', outcome: 'The most honest lens: ask not \'how fast did it grow\' but \'what happened to the people who disagreed\'.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family debate, a teenager argues that democracy is inefficient: \'Our colony\'s road took two years of meetings and complaints to get repaired. Under a dictator it would be fixed in a week — so democracy delivers less.\'',
            decisions: [{ prompt: 'How should the family judge democracy\'s actual outcomes?', options: [
                { text: 'Democracy should be judged by accountability, legitimacy and dignity, not only speed. The road was delayed because officials had to answer complaints, budgets were scrutinised and citizens could protest — those checks slow decisions but make them the people\'s own, and rulers who fail can be removed.', outcome: 'A dictator may pour tar faster, but no one can question where the money went or vote him out — democratic outcomes include answerable government and citizens\' dignity, which speed alone cannot measure.' },
                { text: 'The teenager is right — the only fair test of a government is how fast it completes projects, so non-democratic rule wins.', outcome: 'Speed without accountability lets rulers act against citizens\' wishes with no remedy — a fast road paired with silence, no elections and no right to complain is a poor outcome.', reveals: 'speed-is-the-only-outcome' },
                { text: 'Democracy is clearly better because it guarantees every decision is made quickly and correctly.', outcome: 'Democracy does not guarantee quick or perfect decisions — it guarantees that decisions can be questioned and rulers changed, which is its real strength.', reveals: 'democracy-means-fast-decisions' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_008', title: 'You made it',
          caseStudy: { intro: 'Democracy\'s report card isn\'t only economic — it\'s accountability, dignity and citizens who can demand answers. Growth matters; so does who the growth belongs to.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_007', difficulty: 'standard',
          question: 'Assessing democracy\'s outcomes means evaluating the performance of a democratic.',
          hint: 'If stuck, revisit the specific sibling node for that criterion (e.g., for "accommodation.',
          misconception: 'Students often believe **"Democracy\'s outcome is just whether elections are held regularly and freely."** They equate.',
          parts: [
                { id: 'a', prompt: 'Name any three criteria used to assess the outcomes of democracy as per the Class 10 NCERT framework.', answer: 'Correct answer: Any three of',
                  options: ['Correct answer: Any three of', 'free media, independent judiciary, federalism', 'Democracy\'s outcome is just whether elections are held regularly and freely', '**"Democracy\'s outcome is just whether elections are held regularly and freely'],
                  hint: 'If stuck, revisit the specific sibling node for that criterion (e.g., for "accommodation of social.',
                  misconception: 'Students often believe **"Democracy\'s outcome is just whether elections are held regularly and freely."** They equate *procedural.' }
          ],
            remediations: { 'democracy-s-outcome-is-just': { steps: ['**Re-read the chapter\'s opening case study** (usually a comparison of two countries or a cartoon) — identify which.', '**Make a two-column table:** Column A = "Procedural feature" (e.g., universal franchise), Column B = "Outcome criterion.', '**Take a recent newspaper report** on a government scheme (e.g., PM-KISAN, Jal Jeevan Mission).', 'Tag each paragraph with the criterion it speaks to.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe **"Democracy\'s outcome is just whether elections are held regularly and freely."** They equate.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "If a democracy has high GDP growth, it is performing well on outcomes." Use at least two other criteria from the framework to justify.', answer: 'Correct critique: GDP growth is **necessary but insufficient**',
                  options: ['Correct critique: GDP growth is **necessary but insufficient**', 'GDP growth means people have money, so it\'s good', 'Democracy\'s outcome is just whether elections are held regularly and freely', '**"Democracy\'s outcome is just whether elections are held regularly and freely'],
                  hint: 'If stuck, revisit the specific sibling node for that criterion (e.g., for "accommodation of social.',
                  misconception: 'Students often believe **"Democracy\'s outcome is just whether elections are held regularly and freely."** They equate *procedural.' },
                { id: 'b', prompt: 'Design a **Democracy Report Card** for your district. Choose four indicators (one per criterion) that a citizen group could realistically track using public.', answer: 'Expected answer (sample): 1',
                  options: ['Expected answer (sample): 1', 'Democracy\'s outcome is just whether elections are held regularly and freely', '**"Democracy\'s outcome is just whether elections are held regularly and freely'],
                  hint: 'If stuck, revisit the specific sibling node for that criterion (e.g., for "accommodation of social.',
                  misconception: 'Students often believe **"Democracy\'s outcome is just whether elections are held regularly and freely."** They equate *procedural.' }
          ],
            remediations: { 'democracy-s-outcome-is-just': { steps: ['**Re-read the chapter\'s opening case study** (usually a comparison of two countries or a cartoon) — identify which.', '**Make a two-column table:** Column A = "Procedural feature" (e.g., universal franchise), Column B = "Outcome criterion.', '**Take a recent newspaper report** on a government scheme (e.g., PM-KISAN, Jal Jeevan Mission).', 'Tag each paragraph with the criterion it speaks to.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_008', difficulty: 'standard',
          question: 'Transparency in democratic governance refers to the principle that government.',
          hint: 'If stuck, revisit c9_civ_ch1_12 (RTI Act) and c7_civ_ch03_011 (Accountability and.',
          misconception: 'Students often believe that the RTI Act itself investigates and punishes corruption.',
          parts: [
                { id: 'a', prompt: 'Why does secrecy in government decision-making often lead to corruption? Explain the mechanism.', answer: 'Secrecy reduces the probability of detection for corrupt acts',
                  options: ['Secrecy reduces the probability of detection for corrupt acts', 'secrecy is needed for national security so it doesn\'t cause corruption', 'corruption happens only', 'powers of RTI'],
                  hint: 'If stuck, revisit c9_civ_ch1_12 (RTI Act) and c7_civ_ch03_011 (Accountability and Transparency).',
                  misconception: 'Students often believe that the RTI Act itself investigates and punishes corruption.' }
          ],
            remediations: { 'the-rti-act-itself-investigates': { steps: ['Re-read the RTI Act\'s preamble and Section 2(j) definition of "right to information" — note it says "right.', 'Create a two-column table: "Information Access (RTI)" vs. "Investigation & Prosecution (CVC/Lokpal/CBI/Courts)" and.', 'Use a recent news report (e.g., a scam exposed via RTI but prosecuted by CBI) to trace the actual sequence: citizen.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
