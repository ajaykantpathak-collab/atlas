import type { SimDef } from '../../engine/types';
import C12_SociologyDefinitionFeaturesSocialSim from '../../../simulations/c6_12/C12_SociologyDefinitionFeaturesSocialSim';

/** v3 wrapped master — C12_SociologyDefinitionFeaturesSocialSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_sociologydefinitionfeaturessocialsim: SimDef = {
    id: 'v3w_c12_sociologydefinitionfeaturessocialsim',
    title: 'Social Movements: Definition, Features and the Difference from Collective Behaviour',
    subtitle: 'This node covers the NCERT definition and five defining features of social movements.',
    classLevel: 12, subject: 'sociology', topic: 'Social Movements: Definition, Features and the Difference from Collective Behaviour',
    chapters: [],
    nodeIds: ['c12_soc_cbse_15_001', 'c12_soc_cbse_15_011', 'c12_soc_cbse_03_001', 'c12_soc_cbse_09_001', 'c12_soc_cbse_13_002', 'c12_soc_cbse_01_008', 'c12_soc_cbse_10_001', 'c12_soc_cbse_10_002', 'c12_soc_cbse_01_001', 'c12_soc_cbse_04_004', 'c12_soc_cbse_04_001', 'c12_soc_cbse_03_002', 'c12_soc_cbse_03_006', 'c12_soc_cbse_03_010', 'c12_soc_cbse_09_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Begin by asking students: "You enjoy an 8-hour workday, weekends off, and the right to vote — did these just.', goal: 'Master Social Movements: Definition, Features and the Difference from Collective Behaviour.' },
    discovery: {
        question: 'Critique the statement: “Purity and pollution are merely religious beliefs; they have no material consequences for caste hierarchy today.” Use the NCERT link.',
        options: ['The statement is false', 'There are four castes in India', 'Jati is just a sub-caste of varna'],
        answer: 'The statement is false',
        hook: 'Students often equate **varna** with **caste** and **jati** with **sub-caste**, assuming varna is the “real” caste and.',
    },
    teaching: [
        { title: 'A social movement is a sustained, organised.', text: 'A social movement is a sustained, organised collective action with shared objectives and ideology that aims to bring about or prevent change in society, often by challenging state policies or.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_soc_cbse_15_001', title: 'A social movement is a sustained,.',
          scaffold: { problem: 'A group of residents in a Delhi neighbourhood forms a WhatsApp group to complain about irregular garbage collection.',
            steps: [
            { text: 'Identify the five NCERT defining features of a social movement: (1) sustained collective action over time, (2).' },
            { text: 'Test the case against Feature 1 (sustained action): The action lasted two weeks — a single issue resolved quickly.' },
            { text: 'Test against Feature 2 (organisation): A WhatsApp group and one meeting with a councillor lack formal leadership.' },
            { text: 'Test against Feature 3 (shared ideology): The shared objective is narrow (garbage collection), not a broader.' },
            { text: 'Test against Feature 4 (orientation to change): The goal was service restoration, not structural or policy change.' },
            { text: 'Test against Feature 5 (tactics): Only petition and one meeting — no sustained campaign, no distinct protest.' },
            { text: 'Conclude: This is collective action (residents acting together) but not a social movement.', faded: true, blankAnswer: 'Not a social movement — fails on all five NCERT criteria.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_15_011', title: 'New Social Movements (NSMs) are.',
          scaffold: { problem: 'Classify the following movement as \'old\', \'new\', or \'hybrid\' with justification: The 2018-19 Long March of 50,000 farmers from Nashik to.',
            steps: [
            { text: 'Identify the mobilisation base — farmers as a class (market-involved producers), organised by a left-party-affiliated.' },
            { text: 'Identify the demands — loan waiver and MSP are economic redistribution (class); Forest Rights Act enforcement is.' },
            { text: 'Identify organisational form — party-affiliated, hierarchical leadership, but also broad coalition including tribal.' },
            { text: 'Identify repertoire — long march (Gandhian/satyagraha tradition), media-savvy, urban solidarity (Mumbai citizens.' },
            { text: 'Synthesise — This is a \'new farmers\' movement\' (per NCERT 15_005) which the textbook explicitly identifies as hybrid:.', faded: true, blankAnswer: 'Hybrid — class-based economic demands (old) +.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_03_001', title: 'The caste system is a hereditary,.',
          scaffold: { problem: 'A village has three jatis: *Patel* (landowners), *Kumbhar* (potters), and *Bhangi* (scavengers).',
            steps: [
            { text: 'Identify the traditional occupation associated with each jati — Patel (cultivation, “clean”), Kumbhar (pottery,.' },
            { text: 'Apply the purity-pollution axiom: occupations involving death, waste, or bodily fluids are ritually polluting; those.' },
            { text: 'Rank the jatis: Patel (highest purity) > Kumbhar (middle) > Bhangi (lowest/polluting).' },
            { text: 'Derive commensality rules: Patels accept cooked food only from Patels or higher; Kumbhars accept from Patels and.' },
            { text: 'Derive endogamy rules: Each jati marries strictly within its own boundaries; inter-jati marriage is prohibited and.' },
            { text: 'Verify against NCERT: “Castes that are considered ritually pure have high status… rules about food and food-sharing….', faded: true, blankAnswer: 'Ritual ranking: Patel > Kumbhar > Bhangi. Commensality:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_09_001', title: 'Modernisation is a sociological process.',
          scaffold: { problem: 'A sociologist studies two villages in Tamil Nadu. Village A: Most households have smartphones, motorcycles, and LPG connections.',
            steps: [
            { text: 'List Rudolph & Rudolph\'s 7 features of modernisation: universalism, rationality, individualism, choice-based.' },
            { text: 'Map Village A practices: smartphones/motorcycles/LPG = material technology (modernisation\'s material base) BUT.' },
            { text: 'Map Village B practices: women reservation/Dalit president = universalism (citizenship over caste), achieved political.' },
            { text: 'Compare: Village A shows technological adoption without value/structural change (westernisation/modernisation of things.' },
            { text: 'Conclude: Village B is more modernised sociologically. Modernisation is about values and social relations, not gadgets.', faded: true, blankAnswer: 'Village B is more modernised sociologically because it.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_13_002', title: 'The history of globalisation refers to.',
          scaffold: { problem: 'A Class 12 student writes in a board exam: "Globalisation began in 1991 when India adopted LPG policies." Using the NCERT historical.',
            steps: [
            { text: 'Identify the error — the statement conflates *liberalisation* (a policy shift) with *globalisation* (a long-term.' },
            { text: 'Cite NCERT evidence for pre-colonial global interconnections (Silk Route, Panini, Yi Jing, kupamanduka parable).' },
            { text: 'Cite NCERT evidence for colonial globalisation (capitalist integration, indentured labour, slave trade, raw material.' },
            { text: 'Cite NCERT evidence for post-independence global engagement (Non-Aligned Movement, technology import, foreign firms).' },
            { text: 'Conclude: 1991 marks a *new phase* (neo-liberal, ICT-driven, financialised), not the *origin*.', faded: true, blankAnswer: 'Correction: (1) Globalisation ≠ LPG; LPG is India\'s entry.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_01_008', title: 'The distinctive features of Indian.',
          scaffold: { problem: 'A researcher studies a Delhi slum and finds: (1) residents from 12 states speaking 8 languages, (2) Hindus, Muslims, Sikhs, Christians,.',
            steps: [
            { text: 'Identify **plurality** — list the distinct groups coexisting: 12 state-origin groups, 6 religious communities, 5.' },
            { text: 'Identify **diversity** — describe the range of variation: languages (8), religious practices (multiple), occupational.' },
            { text: 'Identify **stratification** — map the hierarchy: (a) caste: Dalits and Adivasis concentrated in lowest-paid, most.' },
            { text: 'Analyze **intersections** — show how caste, gender, region, and occupation overlap: Dalit women waste-pickers face.' },
            { text: 'Draw conclusion — the slum is not just a "diverse community" but a **stratified social space** where plurality and.', faded: true, blankAnswer: 'The slum exhibits high plurality (12 state groups, 6.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_soc_cbse_15_011', title: 'Identify each idea',
          dissect: { specimen: 'Social Movements: Definition, Features and the Difference from Collective Behaviour', spots: [
            { id: 's1', label: 'A social movement is a', prompt: 'Which idea is this? — A social movement is a sustained, organised collective action with shared objectives and.', answer: 'A social movement is a', options: ['A social movement is a', 'New Social Movements NSMs are', 'The caste system is a', 'Modernisation is a sociological process'] },
            { id: 's2', label: 'New Social Movements NSMs are', prompt: 'Which idea is this? — New Social Movements (NSMs) are collective actions that emerged post-1960s, characterised.', answer: 'New Social Movements NSMs are', options: ['New Social Movements NSMs are', 'A social movement is a', 'The caste system is a', 'Modernisation is a sociological process'] },
            { id: 's3', label: 'The caste system is a', prompt: 'Which idea is this? — The caste system is a hereditary, endogamous, and hierarchical social institution unique.', answer: 'The caste system is a', options: ['The caste system is a', 'A social movement is a', 'New Social Movements NSMs are', 'Modernisation is a sociological process'] },
            { id: 's4', label: 'Modernisation is a sociological process', prompt: 'Which idea is this? — Modernisation is a sociological process of cultural change where traditional, local, and.', answer: 'Modernisation is a sociological process', options: ['Modernisation is a sociological process', 'A social movement is a', 'New Social Movements NSMs are', 'The caste system is a'] },
            { id: 's5', label: 'The history of globalisation refers', prompt: 'Which idea is this? — The history of globalisation refers to the long-term, phased evolution of worldwide.', answer: 'The history of globalisation refers', options: ['The history of globalisation refers', 'A social movement is a', 'New Social Movements NSMs are', 'The caste system is a'] },
            { id: 's6', label: 'The distinctive features of Indian', prompt: 'Which idea is this? — The distinctive features of Indian society refer to its **plurality** (coexistence of.', answer: 'The distinctive features of Indian', options: ['The distinctive features of Indian', 'A social movement is a', 'New Social Movements NSMs are', 'The caste system is a'] }
          ] } }
    ],
    explore: { component: C12_SociologyDefinitionFeaturesSocialSim, prompt: 'Explore the interactive — Social Movements: Definition, Features and the Difference from Collective Behaviour' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_001', difficulty: 'standard',
          question: 'A social movement is a sustained, organised collective action with shared.',
          hint: 'Revisit c11_soc_cbse_06_004 (Individual Agency and Social Structure) and.',
          misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence on.',
          parts: [
                { id: 'a', prompt: 'A spontaneous crowd gathers at a railway station after a train accident, blocks tracks, and demands compensation.', answer: 'This is collective behaviour, not a social movement',
                  options: ['This is collective behaviour, not a social movement', 'Spontaneous, disorganised protest cannot be called a social movement either'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence on organisation,.' },
                { id: 'b', prompt: 'Compare Durkheim\'s and Marx\'s (via E.P. Thompson) perspectives on collective action.', answer: 'Durkheim, writing amid industrial upheaval, feared anomie',
                  options: ['Durkheim, writing amid industrial upheaval, feared anomie', 'Spontaneous, disorganised protest cannot be called a social movement either'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence on organisation,.' }
          ],
            remediations: { 'students-equate-large-numbers-of': { steps: ['Have the student re-read NCERT Section 8.1 (Features of a Social Movement) and Section \'Distinguishing Social Change.', 'Give them three 50-word caselets — (a) 1857 Revolt, (b) 2011 Anna Hazare anti-corruption protests, (c) a spontaneous.', 'Discuss why (a) is a rebellion, (b) is a social movement, (c) is collective behaviour.', 'Re-attempt Diagnostic Questions 2 and 3.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence on.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Chipko movement was primarily an environmental movement; its economic and political dimensions were secondary." Use the NCERT\'s.', answer: 'The claim is incorrect per NCERT',
                  options: ['The claim is incorrect per NCERT', 'Spontaneous, disorganised protest cannot be called a social movement either'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence on organisation,.' },
                { id: 'b', prompt: 'Create a novel example of a social movement that meets all five NCERT defining features.', answer: 'Example: The \'Right to Pension for Informal Workers Movement\' (hypothetical)',
                  options: ['Example: The \'Right to Pension for Informal Workers Movement\' (hypothetical)', 'Spontaneous, disorganised protest cannot be called a social movement either'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence on organisation,.' },
                { id: 'c', prompt: 'Compare Durkheim\'s and Marx\'s (via E.P. Thompson) perspectives on collective action.', answer: 'Durkheim, writing amid industrial upheaval, feared anomie',
                  options: ['Durkheim, writing amid industrial upheaval, feared anomie', 'Spontaneous, disorganised protest cannot be called a social movement either'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'large numbers of people acting together\' with \'social movement\', ignoring the NCERT\'s insistence on organisation,.' }
          ],
            remediations: { 'students-equate-large-numbers-of': { steps: ['Have the student re-read NCERT Section 8.1 (Features of a Social Movement) and Section \'Distinguishing Social Change.', 'Give them three 50-word caselets — (a) 1857 Revolt, (b) 2011 Anna Hazare anti-corruption protests, (c) a spontaneous.', 'Discuss why (a) is a rebellion, (b) is a social movement, (c) is collective behaviour.', 'Re-attempt Diagnostic Questions 2 and 3.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_15_011', difficulty: 'standard',
          question: 'New Social Movements (NSMs) are collective actions that emerged post-1960s,.',
          hint: 'Revisit c12_soc_cbse_15_001 (definition/features) and c11_soc_cbse_02_009 (identity.',
          misconception: 'Students equate \'New Social Movement\' with \'recent movement\' — they classify any post-1990 protest (anti-CAA, farmers\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'New Social Movements (NSMs) are collective actions that emerged post-1960s, characterised',
                  options: ['New Social Movements (NSMs) are collective actions that emerged post-1960s, characterised', 'A social movement is a sustained, organised collective action with shared objectives and', 'The caste system is a hereditary, endogamous, and hierarchical social institution unique', 'Modernisation is a sociological process of cultural change where traditional, local, and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate \'New Social Movement\' with \'recent movement\' — they classify any post-1990 protest (anti-CAA, farmers\' protest, JNU 2016).' }
          ],
            remediations: { 'students-equate-new-social-movement': { steps: ['Re-read NCERT pages 114-115 (Distinguishing the new social movement from the old social movements) — underline the four.', 'Create a 4-column table with these dimensions as headers; fill rows for Chipko, Dalit movement, Women\'s movement,.', 'For each Indian movement, write one sentence explaining why it blurs the binary.', 'Re-attempt Diagnostic Questions 2 and 3. If still stuck, revisit c11_soc_cbse_02_009 (Identity) and c11_soc_cbse_06_002.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_001', difficulty: 'standard',
          question: 'The caste system is a hereditary, endogamous, and hierarchical social.',
          hint: 'If stuck, revisit **c11_soc_cbse_10_005** (Ghurye’s six features) and.',
          misconception: 'Students often equate **varna** with **caste** and **jati** with **sub-caste**, assuming varna is the “real” caste and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The caste system is a hereditary, endogamous, and hierarchical social institution unique',
                  options: ['The caste system is a hereditary, endogamous, and hierarchical social institution unique', 'A social movement is a sustained, organised collective action with shared objectives and', 'New Social Movements (NSMs) are collective actions that emerged post-1960s, characterised', 'Modernisation is a sociological process of cultural change where traditional, local, and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate **varna** with **caste** and **jati** with **sub-caste**, assuming varna is the “real” caste and jati a minor.' }
          ],
            remediations: { 'students-often-equate-varna-with': { steps: ['36-39 focusing on the paragraph “The precise relationship between varna and jati…”.', 'Create a two-column table: **Varna** (textual, 4, pan-India, static) vs.', '**Jati** (empirical, 1000s, regional, dynamic).', 'Fill with 3 differences each.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate **varna** with **caste** and **jati** with **sub-caste**, assuming varna is the “real” caste and.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “Purity and pollution are merely religious beliefs; they have no material consequences for caste hierarchy today.” Use the NCERT link.', answer: 'The statement is false',
                  options: ['The statement is false', 'There are four castes in India', 'Jati is just a sub-caste of varna'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate **varna** with **caste** and **jati** with **sub-caste**, assuming varna is the “real” caste and jati a minor.' }
          ],
            remediations: { 'students-often-equate-varna-with': { steps: ['36-39 focusing on the paragraph “The precise relationship between varna and jati…”.', 'Create a two-column table: **Varna** (textual, 4, pan-India, static) vs.', '**Jati** (empirical, 1000s, regional, dynamic).', 'Fill with 3 differences each.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_001', difficulty: 'standard',
          question: 'Modernisation is a sociological process of cultural change where traditional,.',
          hint: 'Revisit Class 11 Chapter 4 (Culture) nodes c11_soc_cbse_04_001 and c11_soc_cbse_04_002.',
          misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza,.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "achieved vs. ascribed identity" to analyse this situation: A Dalit student clears UPSC, becomes an IAS officer, but his marriage is still.', answer: 'Partial modernisation',
                  options: ['Partial modernisation', 'fully modernised', 'not modernised because arranged marriage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza, celebrating.' },
                { id: 'b', prompt: 'Compare and contrast modernisation and westernisation using the example of a middle-class family in Delhi that: (a) uses a washing machine, (b) celebrates.', answer: 'uses a washing machine, (',
                  options: ['uses a washing machine, (', 'A wrong answer classifying all four as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza, celebrating.' }
          ],
            remediations: { 'students-equate-modernisation-with-becoming': { steps: ['If the student conflates modernisation with westernisation: Step 1 — Have them re-read Rudolph & Rudolph\'s 7 features.', 'Step 2 — Give two columns: "Modernisation (values/structure)" vs "Westernisation (forms/culture)".', 'Step 3 — Practice classifying 10 practices (e.g., love marriage, jeans, RTI filing, Diwali LED lights, women in combat.', 'Step 4 — Ask: "Can a society be modernised but not westernised?'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza,.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast modernisation and westernisation using the example of a middle-class family in Delhi that: (a) uses a washing machine, (b) celebrates.', answer: 'uses a washing machine, (',
                  options: ['uses a washing machine, (', 'A wrong answer classifying all four as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza, celebrating.' }
          ],
            remediations: { 'students-equate-modernisation-with-becoming': { steps: ['If the student conflates modernisation with westernisation: Step 1 — Have them re-read Rudolph & Rudolph\'s 7 features.', 'Step 2 — Give two columns: "Modernisation (values/structure)" vs "Westernisation (forms/culture)".', 'Step 3 — Practice classifying 10 practices (e.g., love marriage, jeans, RTI filing, Diwali LED lights, women in combat.', 'Step 4 — Ask: "Can a society be modernised but not westernised?'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_13_002', difficulty: 'standard',
          question: 'The history of globalisation refers to the long-term, phased evolution of.',
          hint: 'Revisit c11_soc_cbse_01_006 (Capitalism and Colonialism) and c8_hist_ch3_8 (Impact of.',
          misconception: 'Students often treat "globalisation" as a *single, uniform process* that began in 1991, ignoring the deep historical.',
          parts: [
                { id: 'a', prompt: 'Explain why the NCERT textbook uses the *kupamanduka* (well-frog) parable when discussing India\'s historical global outlook.', answer: 'The parable warns against isolationism',
                  options: ['The parable warns against isolationism', 'it shows Indians were frogs', 'it criticises traditional culture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "globalisation" as a *single, uniform process* that began in 1991, ignoring the deep historical layers.' }
          ],
            remediations: { 'students-often-treat-globalisation-as': { steps: ['If a student cannot distinguish the four phases, do this 3-step remediation: (1) Re-read NCERT Box 6.1 (kupamanduka).', '(2) Watch the 10-min video "History of Globalisation in 4 Phases" (search YouTube for CBSE Class 12 Sociology Chapter.', '(3) Re-attempt Diagnostic Questions 1 and 4 verbally — if they can articulate the *coercive* vs *voluntary* and.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_008', difficulty: 'standard',
          question: 'The distinctive features of Indian society refer to its **plurality**.',
          hint: 'Revisit c11_soc_cbse_02_003 and c11_soc_cbse_06_002 — focus on the distinction between.',
          misconception: '**Misconception:** "Plurality, diversity, and stratification are just three words for the same thing — India has many.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distinctive features of Indian society refer to its **plurality** (coexistence of',
                  options: ['The distinctive features of Indian society refer to its **plurality** (coexistence of', 'A social movement is a sustained, organised collective action with shared objectives and', 'New Social Movements (NSMs) are collective actions that emerged post-1960s, characterised', 'The caste system is a hereditary, endogamous, and hierarchical social institution unique'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Plurality, diversity, and stratification are just three words for the same thing — India has many cultures and some.' }
          ],
            remediations: { 'misconception-plurality': { steps: ['** Ask the student to draw a **three-circle Venn diagram** labeled Plurality, Diversity, Stratification.', '** For each item, have them explain **why** it belongs there — forcing the analytical distinction. **', '** Give a mini-case: "A village has 5 castes, 3 religions, and 2 languages.', '** Re-administer Diagnostic Question 2. If they still conflate, repeat with a new case (urban housing society).'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Plurality, diversity, and stratification are just three words for the same thing — India has many.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Reservation policies have reduced stratification in India." Use evidence from at least two dimensions (caste, class, gender, tribe) to.', answer: '**Correct answer:** The claim is **partially true but incomplete**',
                  options: ['**Correct answer:** The claim is **partially true but incomplete**', 'caste is diversity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Plurality, diversity, and stratification are just three words for the same thing — India has many cultures and some.' },
                { id: 'b', prompt: 'Design a 5-question survey that could empirically measure the **intersection of plurality, diversity, and stratification** in an urban neighborhood.', answer: '**Correct answer (sample):** 1',
                  options: ['**Correct answer (sample):** 1', 'caste is diversity'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Plurality, diversity, and stratification are just three words for the same thing — India has many cultures and some.' }
          ],
            remediations: { 'misconception-plurality': { steps: ['** Ask the student to draw a **three-circle Venn diagram** labeled Plurality, Diversity, Stratification.', '** For each item, have them explain **why** it belongs there — forcing the analytical distinction. **', '** Give a mini-case: "A village has 5 castes, 3 religions, and 2 languages.', '** Re-administer Diagnostic Question 2. If they still conflate, repeat with a new case (urban housing society).'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
