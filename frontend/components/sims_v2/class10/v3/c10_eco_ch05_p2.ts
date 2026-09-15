import type { SimDef } from '../../engine/types';

/** v3 generated — c10_eco_ch05_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_eco_ch05_p2: SimDef = {
    id: 'v3_c10_eco_ch05_p2',
    title: 'Consumer Rights · Part 2/2',
    subtitle: 'Turn a bad purchase into a case the law must answer',
    classLevel: 10, subject: 'economics', topic: 'Consumer Rights · Part 2/2',
    chapters: ['c10_eco_ch05'],
    nodeIds: ['c10_eco_cbse_05_007', 'c10_eco_cbse_05_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a consumer-rights advocate arguing before a district forum', intro: 'A pressure cooker lid bursts on first use — no instructions, no ISI mark, no refund. What sounds like bad luck is actually four legal violations at once.', goal: 'Name the consumer rights, trace the movement that won them, and apply them to real complaints.' },
    discovery: {
        question: 'A ₹500 \'pure ghee\' packet turns out adulterated. The shopkeeper blames the company, the company ignores your letter, and a lawyer costs more than the ghee. What does this prove?',
        options: ['Individual buyers are too weak to fight alone — that\'s exactly why a consumer movement had to be organised', 'Nothing — cheating on small purchases is just part of shopping', 'Only expensive products deserve legal protection', 'The consumer should simply stop buying branded goods'],
        answer: 'Individual buyers are too weak to fight alone — that\'s exactly why a consumer movement had to be organised',
        hook: 'One cheated buyer is a nuisance; a movement is a force. The rights you now take for granted were won by two decades of testing, exposing and organising.',
    },
    teaching: [
        { title: 'Exploitation of Consumers: Adulteration, Under-Weighing, False Claims', text: 'Exploitation of consumers refers to unfair trade practices where sellers deliberately deceive or harm buyers through methods such as adulteration (mixing inferior/substandard substances with genuine.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_eco_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Take a burst pressure cooker with no ISI mark and no refund to the District Forum — identify every right violated and argue for the relief a consumer deserves.',
        labels: ['Exploitation of Consumers: Adulteration,', 'How to File'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_eco_cbse_05_007', title: 'Exploitation of Consumers: Adulteration, Under-Weighing, False Claims',
          caseStudy: { intro: 'Imagine you buy a 1 kg packet of branded turmeric powder from a local kirana store in Delhi.',
            decisions: [{ prompt: 'Define adulteration in the context of consumer exploitation and give one common example from the Indian food market.', options: [
                { text: 'Adulteration is the intentional addition of inferior, harmful, or cheaper substances to a', outcome: 'Adulteration is the intentional addition of inferior, harmful, or cheaper substances to a genuine.' },
                { text: 'adulteration means selling expired goods', outcome: 'Not quite — Students often think "adulteration only happens in loose/unbranded goods" and "branded/packed goods.', reveals: 'adulteration-only-happens-in-loose' },
                { text: 'adulteration only happens in loose/unbranded goods', outcome: 'Not quite — Students often think "adulteration only happens in loose/unbranded goods" and "branded/packed goods.', reveals: 'adulteration-only-happens-in-loose' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_05_007', title: 'A real-world call',
          caseStudy: { intro: 'A consumer can buy the cheap product made in poor conditions, or the expensive fair one. Buying fair costs more; buying cheap keeps the cheap system running.',
            decisions: [{ prompt: 'Is a consumer\'s wallet a vote?', options: [
                { text: 'Yes — every purchase is a choice about what continues', outcome: 'The ethical-consumption answer; true but incomplete — the cheapest option isn\'t a \'choice\' for people who can\'t afford another.' },
                { text: 'No — the system decides what\'s on the shelf', outcome: 'The structural answer — individual choices can\'t reach what was never offered; regulation reaches further than wallets.' },
                { text: 'A vote if you can afford to cast it', outcome: 'The honest answer — consumer power is real but unequally distributed; the wallet-vote works best when it\'s not the only mechanism.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A family buys a sealed packet of spices and finds it adulterated with filler. When they return to the shop, the trader shrugs: \'Once sold, goods are yours — no refunds.\' Someone at home says nothing can be done for a ₹200 packet.',
            decisions: [{ prompt: 'What can the family actually do?', options: [
                { text: 'Keep the bill and packet as proof, and file a complaint — the consumer courts set up under the Consumer Protection Act are designed for exactly this: low-cost redressal where a district commission can order refund or compensation without needing an expensive lawyer.', outcome: 'COPRA 1986 created a three-tier system precisely because individual complaints about small purchases used to cost more to fight than they were worth — the Act flipped that calculus.' },
                { text: 'Nothing — a shopkeeper\'s \'no refund\' rule is final, and ₹200 is too small for any court.', outcome: 'Consumer forums exist for small claims too; \'sold goods are not taken back\' is a shop rule, not law, and does not excuse selling adulterated goods.', reveals: 'consumer-is-powerless' },
                { text: 'The only real remedy is to warn neighbours and boycott the shop, since the law only handles big purchases.', outcome: 'Boycott helps socially but the law is not limited to big purchases — adulteration is a serious violation and consumer commissions routinely hear small claims.', reveals: 'law-only-for-big-purchases' }
            ] }] } },
        { type: 'case', nodeId: 'c10_eco_cbse_05_008', title: 'You made it',
          caseStudy: { intro: 'Safety, information, choice, redressal — four rights that turned \'buyer beware\' into \'seller, be fair.\' The movement started long before the law caught up.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_007', difficulty: 'standard',
          question: 'Exploitation of consumers refers to unfair trade practices where sellers.',
          hint: 'If stuck, revisit c10_eco_cbse_05_002 (Rights of Consumers) to match each exploitation.',
          misconception: 'Students often think "adulteration only happens in loose/unbranded goods" and "branded/packed goods with.',
          parts: [
                { id: 'a', prompt: 'A packaged juice label states "No Added Sugar" and "100% Fruit Juice". Laboratory testing reveals it contains 15% added sucrose and only 40% fruit concentrate.', answer: 'Step 1: Identify actual fruit juice volume = 40% of 1 litre = 0.4 litres',
                  options: ['Step 1: Identify actual fruit juice volume = 40% of 1 litre = 0.4 litres', 'adulteration only happens in loose/unbranded goods', 'branded/packed goods with standardisation marks are 100% safe'],
                  hint: 'If stuck, revisit c10_eco_cbse_05_002 (Rights of Consumers) to match each exploitation type to the.',
                  misconception: 'Students often think "adulteration only happens in loose/unbranded goods" and "branded/packed goods with standardisation marks are 100%.' }
          ],
            remediations: { 'adulteration-only-happens-in-loose': { steps: ['Show the student the 2020 CSE honey adulteration case — branded, Agmark-certified honey failed NMR tests for sugar.', 'Give a packed 500g snack packet — weigh it on a digital scale. Often it reads 480g. Ask: "Is this adulteration?', 'Present two ads: one for a fairness cream claiming "permanent whitening in 7 days" (false claim), another for a helmet.', 'Have the student fill a table: Exploitation Type | Example | Detection Method | Right Violated | Law/Act.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_eco_cbse_05_008', difficulty: 'standard',
          question: 'The procedure for filing a consumer complaint under the Consumer Protection Act.',
          hint: 'If stuck, revisit c10_eco_cbse_05_004 (Consumer Disputes Redressal Forums) to clarify.',
          misconception: 'Students believe that a consumer complaint can be filed orally or through a simple phone call to the forum, and that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The procedure for filing a consumer complaint under the Consumer Protection Act (COPRA)',
                  options: ['The procedure for filing a consumer complaint under the Consumer Protection Act (COPRA)', 'The consumer movement refers to the organized collective efforts by consumers, civil', 'The four fundamental consumer rights', 'The Consumer Protection Act (COPRA) 1986 is a social welfare legislation enacted by'],
                  hint: 'If stuck, revisit c10_eco_cbse_05_004 (Consumer Disputes Redressal Forums) to clarify jurisdiction.',
                  misconception: 'Students believe that a consumer complaint can be filed orally or through a simple phone call to the forum, and that engaging a lawyer.' }
          ],
            remediations: { 'a-consumer-complaint-can-be': { steps: ['Show the student the actual complaint format from the Consumer Protection (Consumer Disputes Redressal Commissions).', 'Highlight each mandatory field — complainant details, opposite party details, facts, documents, relief, verification.', 'Contrast with an oral complaint — explain why written record is essential for quasi-judicial proceedings.', 'Cite Section 43 of COPRA 2019: "A complainant may appear in person or through a representative..." — clarify that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
