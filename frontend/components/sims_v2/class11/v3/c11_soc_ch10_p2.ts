import type { SimDef } from '../../engine/types';

/** v3 generated — c11_soc_ch10_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_soc_ch10_p2: SimDef = {
    id: 'v3_c11_soc_ch10_p2',
    title: 'Indian Sociologists · Part 2/2',
    subtitle: 'Discover the discipline built by necessity, not just by ideas.',
    classLevel: 11, subject: 'sociology', topic: 'Indian Sociologists · Part 2/2',
    chapters: ['c11_soc_ch10'],
    nodeIds: ['c11_soc_cbse_10_007', 'c11_soc_cbse_10_008', 'c11_soc_cbse_10_009', 'c11_soc_cbse_10_010', 'c11_soc_cbse_10_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an archivist of how Indian sociology was actually assembled', intro: 'Great thinkers get the credit — but syllabi, journals and colonial survey budgets did the building.', goal: 'Explain how institutions and the colonial context shaped Indian sociology\'s questions.' },
    discovery: {
        question: 'Sociology and social anthropology merged in Indian universities because the theories had converged — an intellectual marriage?',
        options: ['Mostly an administrative compromise — resource scarcity and colonial funding structures forced the departments together', 'Yes — the theories naturally united', 'Yes — Ghurye designed it as theory', 'No — they never actually merged'],
        answer: 'Mostly an administrative compromise — resource scarcity and colonial funding structures forced the departments together',
        hook: 'The discipline was built by improvisation: Ghurye\'s 35-year headship controlled appointments and journals; Calcutta\'s anthropology existed because the colonial state needed ethnographic surveys.',
    },
    teaching: [
        { title: 'D.P. Mukerji: Tradition and Change, the Concept of Living Tradition (Shruti, Smriti, Anubhava)', text: 'D.P. Mukerji\'s concept of \'living tradition\' refers to a dynamic social process where Indian traditions maintain continuity with the past through shruti (revealed texts) and smriti (remembered.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_soc_cbse_10_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Weigh A.R. Desai\'s Marxist lens against Ghurye\'s diffusionism for reading post-independence India — using the three dilemmas the colonial context created.',
        labels: ['D.P. Mukerji: Tradition', 'A.R. Desai: Marxist Sociologist', 'M.N. Srinivas: Life, Career', 'Srinivas on Sanskritisation, Westernisation', 'Comparing Ghurye, Mukerji, Desai'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_soc_cbse_10_008', title: 'A.R. Desai: Marxist Sociologist and His Critique of the Welfare State',
          caseStudy: { intro: 'Imagine your family is debating whether the government should provide free healthcare, subsidized grain, and guaranteed employment.',
            decisions: [{ prompt: 'What are the three defining features of a welfare state according to A.R. Desai?', options: [
                { text: 'The three features are: (i) A welfare state is a **positive state** (interventionist, not', outcome: 'The three features are: (i) A welfare state is a **positive state** (interventionist, not.' },
                { text: 'equality', outcome: 'Not quite — Students often think Desai criticizes the welfare state **because it "does too little"** (like.', reveals: 'desai-criticizes-the-welfare-state' },
                { text: 'social security', outcome: 'Not quite — Students often think Desai criticizes the welfare state **because it "does too little"** (like.', reveals: 'desai-criticizes-the-welfare-state' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_10_009', title: 'M.N. Srinivas: Life, Career and the Village Studies Tradition in Indian Sociology',
          caseStudy: { intro: 'Imagine you are a young researcher in 1948, returning to India after studying at Oxford with the giants of British social anthropology.',
            decisions: [{ prompt: 'What were the two doctoral degrees earned by M.N. Srinivas, and from which institutions?', options: [
                { text: 'M.N', outcome: 'M.N. Srinivas earned a Ph.D. from Bombay University (1944) under G.S. Ghurye, and a D.Phil.' },
                { text: 'just studied villages', outcome: 'Not quite — Students often think Srinivas "just studied villages" or that village studies was merely a research.', reveals: 'srinivas-just-studied-villages-or' },
                { text: 'both degrees were from Bombay, or naming the wrong supervisors', outcome: 'Not quite — Students often think Srinivas "just studied villages" or that village studies was merely a research.', reveals: 'srinivas-just-studied-villages-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_10_010', title: 'Srinivas on Sanskritisation, Westernisation and the Dominant Caste Concept',
          caseStudy: { intro: 'Imagine you visit a village in Karnataka where a community traditionally classified as \'lower caste\' has recently built a temple, hired a Brahmin priest.',
            decisions: [{ prompt: 'Define Sanskritisation in one precise sentence using Srinivas\'s original formulation.', options: [
                { text: 'Sanskritisation is the process by', outcome: 'Sanskritisation is the process by which a lower caste or tribe adopts the customs, rituals.' },
                { text: 'adopts Brahmin customs', outcome: 'Not quite — Students treat Sanskritisation, Westernisation, and Dominant Caste as three *separate* topics.', reveals: 'students-treat-sanskritisation' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Preparing a history-of-the-discipline talk, a student says: \'Indian sociology began with great thinkers — Ghurye, Srinivas — and their ideas.\' And \'colonial context just means British rule was bad; our sociology is a nationalist reaction.\'',
            decisions: [{ prompt: 'What does institutional and colonial history actually show?', options: [
                { text: 'Rebuild it structurally: the discipline was forged administratively — Bombay\'s 1919 department under Ghurye\'s 35-year control of appointments and the Sociological Bulletin; Calcutta\'s anthropology funded by colonial ethnographic surveys; Lucknow\'s merged department because a VC refused a separate chair. And colonial context isn\'t just grievance: it posed structural dilemmas — Ghurye\'s \'backward Hindus\' was a methodological counter to colonial anthropometry using indigenous texts, and Mukerji\'s \'tradition\' theorised endogenous change, not conservatism.', outcome: 'The talk gains its real story: Indian sociology\'s shape — merged disciplines, village studies, Indology — was made in budgets and chairs, and its theory answered epistemic problems, not just political ones.' },
                { text: 'Keep the great-thinkers account — disciplines begin with ideas, not offices.', outcome: 'Institutional history shaped what ideas could be made: who was hired, funded and housed determined the discipline\'s form as much as any theory.', reveals: 'ideas-not-institutions' },
                { text: 'Keep the reaction framing — colonialism was bad, so sociology opposed it.', outcome: 'Reaction reduces epistemology to politics: the colonial context demanded theoretical innovation about evidence and categories — not just nationalist sentiment.', reveals: 'sociology-as-mere-reaction' }
            ] }] } },
        { type: 'case', nodeId: 'c11_soc_cbse_10_011', title: 'You made it',
          caseStudy: { intro: 'Colonialism wasn\'t just the villain — it set the questions: what is a colony\'s sociology for, and who is the anthropologist\'s \'primitive\' inside a civilisation?',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_008', difficulty: 'standard',
          question: 'A.R. Desai\'s Marxist critique of the welfare state argues that the so-called.',
          hint: 'Revisit the Marxist concept of "relative autonomy of the state" (from Class 11 Political.',
          misconception: 'Students often think Desai criticizes the welfare state **because it "does too little"** (like a liberal critic wanting.',
          parts: [
                { id: 'a', prompt: 'Desai excludes socialist/communist states from his definition of the welfare state.', answer: 'Desai excludes them',
                  options: ['Desai excludes them', 'because communist states are authoritarian', 'does too little'],
                  hint: 'Revisit the Marxist concept of "relative autonomy of the state" (from Class 11 Political Theory.',
                  misconception: 'Students often think Desai criticizes the welfare state **because it "does too little"** (like a liberal critic wanting more funding).' }
          ],
            remediations: { 'desai-criticizes-the-welfare-state': { steps: ['** Ask them to re-read Desai\'s five test criteria and mark which ones could be solved by "better administration" vs.', '** Show a 2x2 matrix: (Axis 1: Administrative vs. Structural; Axis 2: Desai\'s view vs. Liberal view).', '** Have them explain *why* Desai says "the capitalist profit motive cannot be made subservient to community needs.', '** Assign a micro-task: Find one Indian policy (e.g., PM-KISAN, Ayushman Bharat) and analyse whether it challenges.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Desai criticizes the welfare state **because it "does too little"** (like a liberal critic wanting.',
          parts: [
                { id: 'a', prompt: 'Create a **new test criterion** (a sixth one) that Desai *might have added* if he were analyzing the Indian welfare state post-1991 liberalization.', answer: '**Proposed criterion:** "Does the welfare state prevent the **commodification of',
                  options: ['**Proposed criterion:** "Does the welfare state prevent the **commodification of', 'does too little'],
                  hint: 'Revisit the Marxist concept of "relative autonomy of the state" (from Class 11 Political Theory.',
                  misconception: 'Students often think Desai criticizes the welfare state **because it "does too little"** (like a liberal critic wanting more funding).' }
          ],
            remediations: { 'desai-criticizes-the-welfare-state': { steps: ['** Ask them to re-read Desai\'s five test criteria and mark which ones could be solved by "better administration" vs.', '** Show a 2x2 matrix: (Axis 1: Administrative vs. Structural; Axis 2: Desai\'s view vs. Liberal view).', '** Have them explain *why* Desai says "the capitalist profit motive cannot be made subservient to community needs.', '** Assign a micro-task: Find one Indian policy (e.g., PM-KISAN, Ayushman Bharat) and analyse whether it challenges.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_010', difficulty: 'standard',
          question: 'Sanskritisation is the process by which a lower caste or tribe adopts the.',
          hint: 'Revisit c11_soc_cbse_10_009, specifically the section on Srinivas\'s Oxford training under.',
          misconception: 'Students treat Sanskritisation, Westernisation, and Dominant Caste as three *separate* topics to memorise, missing that.',
          parts: [
                { id: 'a', prompt: 'Define Sanskritisation in one precise sentence using Srinivas\'s original formulation.', answer: 'Sanskritisation is the process by',
                  options: ['Sanskritisation is the process by', 'adopts Brahmin customs'],
                  hint: 'Revisit c11_soc_cbse_10_009, specifically the section on Srinivas\'s Oxford training under.',
                  misconception: 'Students treat Sanskritisation, Westernisation, and Dominant Caste as three *separate* topics to memorise, missing that Srinivas designed.' }
          ],
            remediations: { 'students-treat-sanskritisation': { steps: ['Draw a triangle on paper labelled "Village X". Place three castes at corners: Dominant Caste (land + numbers), Ritual.', 'Draw an arrow from Lower Caste → Dominant Caste labelled "Sanskritisation (emulation of *local* dominant culture)".', 'Draw an arrow from Outside (City/State/Market) → All Castes labelled "Westernisation (education, jobs, law.', 'Ask: "If Lower Caste gets government jobs (Westernisation), do they Sanskritise *more* or *less*?" Guide them to see.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_soc_cbse_10_011', difficulty: 'standard',
          question: 'This topic compares the four foundational approaches to Indianising sociology.',
          hint: 'If unable to summarise any one sociologist\'s core argument in one paragraph, return.',
          misconception: 'Students often treat the four sociologists as a chronological sequence where each \'improves\' on the previous (Ghurye →.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This topic compares the four foundational approaches to Indianising sociology',
                  options: ['This topic compares the four foundational approaches to Indianising sociology', 'The institutional history of sociology in India refers to the formal establishment and', 'The colonial context of Indian modernity refers to the historical condition where India\'s', 'Accidental Pioneers refers to scholars like L.K'],
                  hint: 'If unable to summarise any one sociologist\'s core argument in one paragraph, return to that.',
                  misconception: 'Students often treat the four sociologists as a chronological sequence where each \'improves\' on the previous (Ghurye → Mukerji → Desai →.' }
          ],
            remediations: { 'students-often-treat-the-four': { steps: ['If a student insists on a linear \'evolution\' narrative: (1) Draw a timeline showing overlapping lifespans and.', '(2) Assign a \'paradigm mapping\' exercise: give four short research abstracts (one on textual caste rules, one on bhakti.', '(3) Ask: \'If you were studying *urban middle-class caste associations today*, which two would you combine and why?\'.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
