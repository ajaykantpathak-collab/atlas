import type { SimDef } from '../../engine/types';
import C12_SociologyDefinitionFeaturesTribeSim from '../../../simulations/c6_12/C12_SociologyDefinitionFeaturesTribeSim';

/** v3 wrapped master — C12_SociologyDefinitionFeaturesTribeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_sociologydefinitionfeaturestribesim: SimDef = {
    id: 'v3w_c12_sociologydefinitionfeaturestribesim',
    title: 'The Distinctive Features of Indian Society: Plurality, Diversity and Stratification',
    subtitle: 'This node covers the conceptual definitions and interrelationships of plurality,.',
    classLevel: 12, subject: 'sociology', topic: 'The Distinctive Features of Indian Society: Plurality, Diversity and Stratification',
    chapters: [],
    nodeIds: ['c12_soc_cbse_01_008', 'c12_soc_cbse_01_001', 'c12_soc_cbse_09_001', 'c12_soc_cbse_03_002', 'c12_soc_cbse_03_005', 'c12_soc_cbse_03_006', 'c12_soc_cbse_03_001', 'c12_soc_cbse_05_001', 'c12_soc_cbse_10_001', 'c12_soc_cbse_10_002', 'c12_soc_cbse_13_002', 'c12_soc_cbse_09_002', 'c12_soc_cbse_15_001', 'c12_soc_cbse_15_011', 'c12_soc_cbse_01_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are standing in a bustling railway station in Mumbai: you hear Marathi, Hindi, Gujarati, Tamil,.', goal: 'Master The Distinctive Features of Indian Society: Plurality, Diversity and Stratification.' },
    discovery: {
        question: 'Apply the concept of "achieved vs. ascribed identity" to analyse this situation: A Dalit student clears UPSC, becomes an IAS officer, but his marriage is still.',
        options: ['Partial modernisation', 'fully modernised', 'not modernised because arranged marriage'],
        answer: 'Partial modernisation',
        hook: 'Students equate modernisation with "becoming like the West" — wearing Western clothes, speaking English, eating pizza,.',
    },
    teaching: [
        { title: 'The distinctive features of Indian society.', text: 'The distinctive features of Indian society refer to its **plurality** (coexistence of multiple cultural, religious, linguistic, and ethnic groups), **diversity** (the vast range of variations in.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_soc_cbse_01_008', title: 'The distinctive features of Indian.',
          scaffold: { problem: 'A researcher studies a Delhi slum and finds: (1) residents from 12 states speaking 8 languages, (2) Hindus, Muslims, Sikhs, Christians,.',
            steps: [
            { text: 'Identify **plurality** — list the distinct groups coexisting: 12 state-origin groups, 6 religious communities, 5.' },
            { text: 'Identify **diversity** — describe the range of variation: languages (8), religious practices (multiple), occupational.' },
            { text: 'Identify **stratification** — map the hierarchy: (a) caste: Dalits and Adivasis concentrated in lowest-paid, most.' },
            { text: 'Analyze **intersections** — show how caste, gender, region, and occupation overlap: Dalit women waste-pickers face.' },
            { text: 'Draw conclusion — the slum is not just a "diverse community" but a **stratified social space** where plurality and.', faded: true, blankAnswer: 'The slum exhibits high plurality (12 state groups, 6.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_01_001', title: 'The significance of a sociology of.',
          scaffold: { problem: 'A student from a rural OBC family in Tamil Nadu gets a software job in Bangalore but feels alienated and faces subtle exclusion from.',
            steps: [
            { text: 'Identify the personal trouble — the individual\'s feelings of alienation, imposter syndrome, fear of speaking up, worry.' },
            { text: 'Locate the individual on the social map — rural, OBC, Tamil-speaking, first-generation professional, likely lower.' },
            { text: 'Identify structural factors shaping the workplace — (a) IT sector\'s recruitment from elite urban colleges (caste-class.' },
            { text: 'Connect trouble to issue — the individual\'s struggle is not personal failure but a pattern: rural OBC professionals.' },
            { text: 'Formulate as social issue — "Structural exclusion of first-generation professionals from marginalized backgrounds in.', faded: true, blankAnswer: 'Personal trouble: individual alienation and career anxiety..' }
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
        { type: 'scaffold', nodeId: 'c12_soc_cbse_03_002', title: 'Caste as a system of stratification is.',
          scaffold: { problem: 'In a village, the dominant caste (landowning, ritually high) refuses to let a lower-caste family draw water from the common well.',
            steps: [
            { text: 'Identify the pillar being violated — the well incident is about *hierarchy* (purity-pollution), not economics.' },
            { text: 'Note that the lower-caste family’s economic achievement (government job) does not override their ritual status —.' },
            { text: 'Connect to hereditary occupation — traditionally, the lower caste’s occupation (e.g., sanitation) is ritually.' },
            { text: 'Connect to endogamy — because they marry only within their caste, their children inherit the same ritual status,.' },
            { text: 'Synthesize — the three pillars interlock: hereditary occupation assigns polluting work, hierarchy ranks them low,.', faded: true, blankAnswer: 'The water ban persists because caste hierarchy is ritual.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_03_005', title: 'The tribe-caste continuum refers to the.',
          scaffold: { problem: 'A student argues: "The Gonds had a kingdom, so they were never a tribe — they were a caste." Using the NCERT\'s "secondary phenomena".',
            steps: [
            { text: 'Identify the student\'s hidden assumption — that state formation and tribal identity are mutually exclusive.' },
            { text: 'Recall the NCERT evidence — Gond kingdoms (Garha Mandla, Chanda) existed, adivasis exercised dominance through raiding.' },
            { text: 'Apply the "secondary phenomena" argument — tribal identity emerges from the *encounter* with state societies;.' },
            { text: 'Apply the 1970s critique — the tribe-peasantry distinction fails on *all* criteria (size, isolation, religion,.', faded: true, blankAnswer: 'The claim is false. Gond kingdoms demonstrate that tribal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_03_006', title: 'Tribal societies in India are distinct.',
          scaffold: { problem: 'A research team wants to study the impact of a proposed bauxite mine on two tribal communities: the Dongria Kondh of Niyamgiri hills.',
            steps: [
            { text: 'Map permanent traits for each community. Dongria Kondh: Region = Eastern Ghats (middle India belt), Language = Kui.' },
            { text: 'Map acquired traits. Dongria Kondh: Livelihood = shifting cultivation + forest produce collection, Assimilation = low.' },
            { text: 'Identify the critical analytical divergence. Both face mining displacement, but Dongria Kondh\'s identity is anchored in.' },
            { text: 'Predict differential outcomes. Dongria Kondh likely to mobilise around Forest Rights Act, constitutional protections.' },
            { text: 'Formulate research hypothesis. "Development-induced displacement triggers identity assertion, but the *form* of.', faded: true, blankAnswer: 'Comparative framework with 5 analytical steps as above;.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_soc_cbse_01_001', title: 'Identify each idea',
          dissect: { specimen: 'The Distinctive Features of Indian Society: Plurality, Diversity and Stratification', spots: [
            { id: 's1', label: 'The distinctive features of Indian', prompt: 'Which idea is this? — The distinctive features of Indian society refer to its **plurality** (coexistence of.', answer: 'The distinctive features of Indian', options: ['The distinctive features of Indian', 'The significance of a sociology', 'Modernisation is a sociological process', 'Caste as a system of'] },
            { id: 's2', label: 'The significance of a sociology', prompt: 'Which idea is this? — The significance of a sociology of India lies in its systematic, scientific study of.', answer: 'The significance of a sociology', options: ['The significance of a sociology', 'The distinctive features of Indian', 'Modernisation is a sociological process', 'Caste as a system of'] },
            { id: 's3', label: 'Modernisation is a sociological process', prompt: 'Which idea is this? — Modernisation is a sociological process of cultural change where traditional, local, and.', answer: 'Modernisation is a sociological process', options: ['Modernisation is a sociological process', 'The distinctive features of Indian', 'The significance of a sociology', 'Caste as a system of'] },
            { id: 's4', label: 'Caste as a system of', prompt: 'Which idea is this? — Caste as a system of stratification is a hereditary, endogamous, and hierarchical social.', answer: 'Caste as a system of', options: ['Caste as a system of', 'The distinctive features of Indian', 'The significance of a sociology', 'Modernisation is a sociological process'] },
            { id: 's5', label: 'The tribe-caste continuum refers to', prompt: 'Which idea is this? — The tribe-caste continuum refers to the sociological debate about whether tribal.', answer: 'The tribe-caste continuum refers to', options: ['The tribe-caste continuum refers to', 'The distinctive features of Indian', 'The significance of a sociology', 'Modernisation is a sociological process'] },
            { id: 's6', label: 'Tribal societies in India are', prompt: 'Which idea is this? — Tribal societies in India are distinct communities characterised by their historical.', answer: 'Tribal societies in India are', options: ['Tribal societies in India are', 'The distinctive features of Indian', 'The significance of a sociology', 'Modernisation is a sociological process'] }
          ] } }
    ],
    explore: { component: C12_SociologyDefinitionFeaturesTribeSim, prompt: 'Explore the interactive — The Distinctive Features of Indian Society: Plurality, Diversity and Stratification' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_008', difficulty: 'standard',
          question: 'The distinctive features of Indian society refer to its **plurality**.',
          hint: 'Revisit c11_soc_cbse_02_003 and c11_soc_cbse_06_002 — focus on the distinction between.',
          misconception: '**Misconception:** "Plurality, diversity, and stratification are just three words for the same thing — India has many.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distinctive features of Indian society refer to its **plurality** (coexistence of',
                  options: ['The distinctive features of Indian society refer to its **plurality** (coexistence of', 'The significance of a sociology of India lies in its systematic, scientific study of', 'Modernisation is a sociological process of cultural change where traditional, local, and', 'Caste as a system of stratification is a hereditary, endogamous, and hierarchical social'],
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
            remediations: { 'misconception-plurality': { steps: ['** Ask the student to draw a **three-circle Venn diagram** labeled Plurality, Diversity, Stratification.', '** For each item, have them explain **why** it belongs there — forcing the analytical distinction. **', '** Give a mini-case: "A village has 5 castes, 3 religions, and 2 languages.', '** Re-administer Diagnostic Question 2. If they still conflate, repeat with a new case (urban housing society).'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_001', difficulty: 'standard',
          question: 'The significance of a sociology of India lies in its systematic, scientific.',
          hint: 'Revisit c11_soc_cbse_01_002 (Sociological Imagination) and practice converting three.',
          misconception: 'Students often think \'unlearning common sense\' means \'common sense is false and sociology gives the true facts\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The significance of a sociology of India lies in its systematic, scientific study of',
                  options: ['The significance of a sociology of India lies in its systematic, scientific study of', 'The distinctive features of Indian society refer to its **plurality** (coexistence of', 'Modernisation is a sociological process of cultural change where traditional, local, and', 'Caste as a system of stratification is a hereditary, endogamous, and hierarchical social'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'unlearning common sense\' means \'common sense is false and sociology gives the true facts\'.' }
          ],
            remediations: { 'unlearning-common-sense-means-common': { steps: ['Ask the student to write three \'common sense\' statements about Indian society they believe are true.', 'For each, identify the social group whose viewpoint it represents (e.g., \'caste doesn\'t matter\' — urban upper-caste.', 'Find a counter-perspective from a different group (e.g., a Dalit student\'s experience of discrimination in the same.', 'Explain that sociology does not decide which is \'true\' but studies the conditions producing both views.', 'Re-attempt Diagnostic Question 2 with this framework.'] } } },
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
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_002', difficulty: 'standard',
          question: 'Caste as a system of stratification is a hereditary, endogamous, and.',
          hint: 'Revisit c11_soc_cbse_02_003 (stratification systems) and c11_soc_cbse_03_004 (marriage.',
          misconception: 'Students often think “caste is just like class but older” — they equate hierarchy with economic inequality and assume.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why endogamy is considered the “key” to maintaining the caste system, using the concepts of hierarchy and hereditary occupation.', answer: 'Endogamy prevents mixing of castes',
                  options: ['Endogamy prevents mixing of castes', 'endogamy preserves culture', 'caste is just like class but older'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “caste is just like class but older” — they equate hierarchy with economic inequality and assume hereditary occupation.' },
                { id: 'b', prompt: 'Compare how hierarchy operates in the caste system versus in a class system.', answer: 'Similarities: both rank groups unequally and affect life chances',
                  options: ['Similarities: both rank groups unequally and affect life chances', 'both are based on money', 'caste is just like class but older'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “caste is just like class but older” — they equate hierarchy with economic inequality and assume hereditary occupation.' }
          ],
            remediations: { 'caste-is-just-like-class': { steps: ['If a student conflates caste with class, do this 3-step remediation: (1) Have them re-read the NCERT paragraph on.', '(2) Give a mini-case: “A rich Dalit and a poor Brahmin — who has higher ritual status?” Force them to answer using.', '(3) Ask them to diagram how endogamy *causes* hereditary occupation to persist: “If a Chamar becomes a doctor, why does.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think “caste is just like class but older” — they equate hierarchy with economic inequality and assume.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: “Hereditary occupation is the economic base of caste; without it, the caste system would collapse.” Use evidence from the NCERT text.', answer: 'The statement is partially true but incomplete',
                  options: ['The statement is partially true but incomplete', 'caste is just like class but older', 'hereditary occupation is merely a division of labour'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “caste is just like class but older” — they equate hierarchy with economic inequality and assume hereditary occupation.' },
                { id: 'b', prompt: 'Create a short case study (150 words) of a fictional village where a lower-caste family attempts to educate their daughter for a government job.', answer: 'A good case study will show: (1) Hierarchy',
                  options: ['A good case study will show: (1) Hierarchy', 'caste is just like class but older', 'hereditary occupation is merely a division of labour'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “caste is just like class but older” — they equate hierarchy with economic inequality and assume hereditary occupation.' },
                { id: 'c', prompt: 'Compare how hierarchy operates in the caste system versus in a class system.', answer: 'Similarities: both rank groups unequally and affect life chances',
                  options: ['Similarities: both rank groups unequally and affect life chances', 'both are based on money', 'caste is just like class but older', 'hereditary occupation is merely a division of labour'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “caste is just like class but older” — they equate hierarchy with economic inequality and assume hereditary occupation.' }
          ],
            remediations: { 'caste-is-just-like-class': { steps: ['If a student conflates caste with class, do this 3-step remediation: (1) Have them re-read the NCERT paragraph on.', '(2) Give a mini-case: “A rich Dalit and a poor Brahmin — who has higher ritual status?” Force them to answer using.', '(3) Ask them to diagram how endogamy *causes* hereditary occupation to persist: “If a Chamar becomes a doctor, why does.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_005', difficulty: 'standard',
          question: 'The tribe-caste continuum refers to the sociological debate about whether.',
          hint: 'Revisit c12_soc_cbse_03_001 (caste principles) and c11_soc_cbse_02_003 (stratification.',
          misconception: 'Students commonly believe "tribes are primitive, isolated communities untouched by civilisation until recently" — the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The tribe-caste continuum refers to the sociological debate about whether tribal',
                  options: ['The tribe-caste continuum refers to the sociological debate about whether tribal', 'The distinctive features of Indian society refer to its **plurality** (coexistence of', 'The significance of a sociology of India lies in its systematic, scientific study of', 'Modernisation is a sociological process of cultural change where traditional, local, and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students commonly believe "tribes are primitive, isolated communities untouched by civilisation until recently" — the exact view the NCERT.' }
          ],
            remediations: { 'students-commonly-believe-tribes-are': { steps: ['If a student holds the "primitive isolation" misconception: Step 1 — Have them list every economic activity mentioned.', 'Step 2 — Ask: "Which of these require contact with non-tribal markets/polities?" (All).', 'Step 3 — Show the 1881 Census map of tribal concentrations overlapping mineral belts — ask why British built railways.', 'Step 4 — Re-read Xaxa: "middle classes are a consequence of modern education...'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_006', difficulty: 'standard',
          question: 'Tribal societies in India are distinct communities characterised by their.',
          hint: 'Revisit c11_soc_cbse_03_001 (Social Institutions definition) and c11_soc_cbse_07_008.',
          misconception: 'Students consistently confuse "tribe" as a sociological category with "Scheduled Tribe" as a Constitutional-legal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Tribal societies in India are distinct communities characterised by their historical',
                  options: ['Tribal societies in India are distinct communities characterised by their historical', 'The distinctive features of Indian society refer to its **plurality** (coexistence of', 'The significance of a sociology of India lies in its systematic, scientific study of', 'Modernisation is a sociological process of cultural change where traditional, local, and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "tribe" as a sociological category with "Scheduled Tribe" as a Constitutional-legal category.' }
          ],
            remediations: { 'students-consistently-confuse-tribe-as': { steps: ['Have the student create a two-column table: "Sociological Concept of Tribe" (left) vs.', 'Populate left column from NCERT: permanent traits (region, language, physical, ecology), acquired traits (livelihood,.', 'Populate right column: Article 342, Presidential Order, Lokur Committee criteria (primitive traits, distinctive.', 'Ask: "Can a community be sociologically tribal but not Scheduled?', 'Assign re-diagnostic: "Explain why the Gond kingdom of Garha Mandla was a tribal polity but would not fit the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
