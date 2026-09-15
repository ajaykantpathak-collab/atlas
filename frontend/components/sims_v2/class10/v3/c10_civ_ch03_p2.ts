import type { SimDef } from '../../engine/types';

/** v3 generated — c10_civ_ch03_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_civ_ch03_p2: SimDef = {
    id: 'v3_c10_civ_ch03_p2',
    title: 'Gender, Religion and Caste · Part 2/2',
    subtitle: 'Expose the unpaid second shift hiding inside \'normal\' family life',
    classLevel: 10, subject: 'civics', topic: 'Gender, Religion and Caste · Part 2/2',
    chapters: ['c10_civ_ch03'],
    nodeIds: ['c10_civ_cbse_03_007', 'c10_civ_cbse_03_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a social researcher measuring work that never appears in GDP', intro: 'A mother nurses patients all day, then cooks dinner while everyone watches TV — and calls it duty. Your job is to make the invisible work visible.', goal: 'Define sexual division of labour and the public-private divide, and connect them to women\'s political participation.' },
    discovery: {
        question: 'Riya and Rahul are both software engineers working nine hours a day. At home, Riya does 100% of the cooking, cleaning and childcare — and the family praises her for \'managing so well.\' What\'s actually going on?',
        options: ['Sexual division of labour — her paid job is visible, her second unpaid shift at home is treated as natural', 'Nothing — she simply enjoys housework more than Rahul', 'A fair split — equal office hours means equal total work', 'A private family choice that no concept can describe'],
        answer: 'Sexual division of labour — her paid job is visible, her second unpaid shift at home is treated as natural',
        hook: 'The trick is calling it \'natural.\' Once housework is labelled a woman\'s duty, her double burden stops looking like inequality — and starts looking like praise.',
    },
    teaching: [
        { title: 'Caste Inequalities in India and Political Mobilisation', text: 'Caste inequalities refer to the systemic social, economic, and political disparities rooted in the hierarchical caste system, where historically marginalized castes (Scheduled Castes, Scheduled.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_civ_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Audit one day in a household: log every task, tag who does it and whether it\'s paid — then expose where the \'public\' world ends and the invisible \'private\' workload begins.',
        labels: ['Caste Inequalities in India', 'Constitutional Provisions Against Discrimination'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_007', title: 'Caste Inequalities in India and Political Mobilisation',
          caseStudy: { intro: 'Imagine a Class 10 student reading a news report about a Dalit candidate winning a reserved constituency in a state election, while also seeing a viral video.',
            decisions: [{ prompt: 'What is the primary basis of caste inequalities in India, and which social groups are historically most affected?', options: [
                { text: 'Caste inequalities are based on the hierarchical varna/jati system that assigns social', outcome: 'Caste inequalities are based on the hierarchical varna/jati system that assigns social status.' },
                { text: 'caste inequalities are only about economic status', outcome: 'Not quite — Students often think "caste inequalities are a thing of the past" or "caste politics is only about.', reveals: 'caste-inequalities-are-a-thing' },
                { text: 'they affect all castes equally', outcome: 'Not quite — Students often think "caste inequalities are a thing of the past" or "caste politics is only about.', reveals: 'caste-inequalities-are-a-thing' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_007', title: 'A real-world call',
          caseStudy: { intro: 'A political party can win an election by appealing to one religion\'s voters, or take the harder road of building a coalition across communities. The first path is faster. The second is harder.',
            decisions: [{ prompt: 'Is winning by division ever justified if the party then governs well?', options: [
                { text: 'Yes — good governance redeems a divisive campaign', outcome: 'This judges ends over means — but the campaign\'s damage to social trust doesn\'t vanish when the government performs.' },
                { text: 'No — the method poisons the outcome', outcome: 'This holds that democracy\'s rules matter as much as results — a government built on division carries that division into power.' },
                { text: 'It depends on how deep the division goes', outcome: 'The realist\'s answer — but \'acceptable\' division is a line everyone draws differently, and moving it is how democracies erode.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Both parents in a household work the same nine-hour day at their offices. Every evening the mother also cooks, cleans, and helps the children with homework while the father rests. Relatives praise her as a \'superwoman\' who \'manages it all so well.\'',
            decisions: [{ prompt: 'What is this arrangement really showing, beyond one person\'s efficiency?', options: [
                { text: 'It is the sexual division of labour — paid work is shared but unpaid housework and childcare fall entirely on her, a \'double burden\' of invisible work that is praised instead of shared. Equal office hours do not mean equal total work.', outcome: 'Calling it a division of labour names the pattern: society assigns domestic work to women as a duty, and that unpaid load — invisible in income statistics — limits their time and opportunities.' },
                { text: 'It is just efficient household management — she does the home tasks because she is naturally better at them, so everyone benefits.', outcome: 'Skill at cooking and cleaning is learned, not born — treating it as natural hides the unpaid hours she contributes and makes the unfair load look like talent.', reveals: 'housework-is-natural' },
                { text: 'Since she is praised and appreciated, no inequality exists — recognition makes the arrangement fair.', outcome: 'Praise does not reduce her hours or return her time; \'superwoman\' compliments often mask the double burden rather than fix it.', reveals: 'praise-equals-equality' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_03_008', title: 'You made it',
          caseStudy: { intro: 'Politics doesn\'t stop at the doorstep. The public-private divide decides whose work counts as work — and feminism\'s demand is simple: count all of it, share all of it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_civ_cbse_03_007', difficulty: 'standard',
          question: 'Caste inequalities refer to the systemic social, economic, and political.',
          hint: 'If stuck, revisit Class 6 Diversity chapter (c6_civics_ch14_033) on inequality and.',
          misconception: 'Students often think "caste inequalities are a thing of the past" or "caste politics is only about vote-bank politics.',
          parts: [
                { id: 'a', prompt: 'Why does political mobilisation along caste lines emerge in a democracy that constitutionally guarantees equality?', answer: 'Political mobilisation along caste lines emerges',
                  options: ['Political mobilisation along caste lines emerges', 'caste mobilisation is against democracy', 'it happens because politicians manipulate voters', 'caste inequalities are a thing of the past'],
                  hint: 'If stuck, revisit Class 6 Diversity chapter (c6_civics_ch14_033) on inequality and discrimination.',
                  misconception: 'Students often think "caste inequalities are a thing of the past" or "caste politics is only about vote-bank politics by corrupt leaders.".' },
                { id: 'b', prompt: 'A state government introduces a new reservation policy for OBCs in government jobs. A student argues this violates the principle of meritocracy.', answer: 'The policy is justified',
                  options: ['The policy is justified', 'reservations are unfair to upper castes', 'merit should be the only criterion', 'caste inequalities are a thing of the past'],
                  hint: 'If stuck, revisit Class 6 Diversity chapter (c6_civics_ch14_033) on inequality and discrimination.',
                  misconception: 'Students often think "caste inequalities are a thing of the past" or "caste politics is only about vote-bank politics by corrupt leaders.".' }
          ],
            remediations: { 'caste-inequalities-are-a-thing': { steps: ['If the student holds this misconception, have them: (1) Read the latest NCRB data on crimes against SCs/STs and the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_03_008', difficulty: 'standard',
          question: 'Constitutional provisions against discrimination refer to the specific articles.',
          hint: 'Revisit Article 12 definition of "State" (c8_civ_ch4_6) and the vertical vs horizontal.',
          misconception: 'Students often believe Article 15 prohibits ALL discrimination by ANYONE on grounds of religion, caste, or gender.',
          parts: [
                { id: 'a', prompt: 'A private unaided school refuses admission to a student because she is a girl. The parents approach the High Court under Article 226.', answer: 'No, Article 15(1) binds only the "State" as defined in Article 12',
                  options: ['No, Article 15(1) binds only the "State" as defined in Article 12', 'Yes, Article 15 applies to everyone'],
                  hint: 'Revisit Article 12 definition of "State" (c8_civ_ch4_6) and the vertical vs horizontal application.',
                  misconception: 'Students often believe Article 15 prohibits ALL discrimination by ANYONE on grounds of religion, caste, or gender.' },
                { id: 'b', prompt: 'Compare the scope of "sex" in Article 15(1) as originally understood versus the Supreme Court\'s interpretation in NALSA v.', answer: 'Originally "sex" meant biological male/female',
                  options: ['Originally "sex" meant biological male/female', 'Parliament must amend the Constitution'],
                  hint: 'Revisit Article 12 definition of "State" (c8_civ_ch4_6) and the vertical vs horizontal application.',
                  misconception: 'Students often believe Article 15 prohibits ALL discrimination by ANYONE on grounds of religion, caste, or gender.' }
          ],
            remediations: { 'article-15-prohibits-all-discrimination': { steps: ['Re-read Article 15 text from the Constitution (bare act).', 'Highlight "the State" in Clause (1) and "any person" in Clause (2).', 'List the specific places in Clause (2): shops, public restaurants, hotels, wells, tanks, bathing ghats, roads, places.', 'Take a news report about a private company refusing to hire women — identify which law applies (Equal Remuneration Act.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
