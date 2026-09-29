import type { SimDef } from '../../engine/types';
import C12_SociologyIntroducingIndianSocietySim from '../../../simulations/c6_12/C12_SociologyIntroducingIndianSocietySim';

/** v3 wrapped master — C12_SociologyIntroducingIndianSocietySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_sociologyintroducingindiansocietysim: SimDef = {
    id: 'v3w_c12_sociologyintroducingindiansocietysim',
    title: 'The Significance of a Sociology of India: Why Study Indian Society',
    subtitle: 'This node covers the epistemological rationale for studying Indian society.',
    classLevel: 12, subject: 'sociology', topic: 'The Significance of a Sociology of India: Why Study Indian Society',
    chapters: [],
    nodeIds: ['c12_soc_cbse_01_001', 'c12_soc_cbse_01_002', 'c12_soc_cbse_01_004', 'c12_soc_cbse_01_006', 'c12_soc_cbse_01_008', 'c12_soc_cbse_01_009', 'c12_soc_cbse_06_003', 'c12_soc_cbse_13_003', 'c12_soc_cbse_13_009', 'c12_soc_cbse_14_001', 'c12_soc_cbse_14_003', 'c12_soc_cbse_14_004', 'c12_soc_cbse_14_005', 'c12_soc_cbse_14_010', 'c12_soc_cbse_02_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are asked: "Why do we need a whole subject to study Indian society when we live in it every day?".', goal: 'Master The Significance of a Sociology of India: Why Study Indian Society.' },
    discovery: {
        question: 'What was the primary purpose of the British decennial census (starting 1881) in India, and how did it unintentionally become a sociological tool?',
        options: ['The census was primarily an administrative tool for governance', 'the census was done to help sociologists', 'applied Western theories to India'],
        answer: 'The census was primarily an administrative tool for governance',
        hook: 'Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.',
    },
    teaching: [
        { title: 'The significance of a sociology of India.', text: 'The significance of a sociology of India lies in its systematic, scientific study of Indian society that moves beyond common sense by requiring \'unlearning\' of partial, group-biased knowledge,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_soc_cbse_01_001', title: 'The significance of a sociology of.',
          scaffold: { problem: 'A student from a rural OBC family in Tamil Nadu gets a software job in Bangalore but feels alienated and faces subtle exclusion from.',
            steps: [
            { text: 'Identify the personal trouble — the individual\'s feelings of alienation, imposter syndrome, fear of speaking up, worry.' },
            { text: 'Locate the individual on the social map — rural, OBC, Tamil-speaking, first-generation professional, likely lower.' },
            { text: 'Identify structural factors shaping the workplace — (a) IT sector\'s recruitment from elite urban colleges (caste-class.' },
            { text: 'Connect trouble to issue — the individual\'s struggle is not personal failure but a pattern: rural OBC professionals.' },
            { text: 'Formulate as social issue — "Structural exclusion of first-generation professionals from marginalized backgrounds in.', faded: true, blankAnswer: 'Personal trouble: individual alienation and career anxiety..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_01_002', title: 'Colonialism in India refers to the.',
          scaffold: { problem: 'A student reads that the 1931 Census dropped the caste question due to nationalist pressure but the 1941 Census reinstated it for.',
            steps: [
            { text: 'Identify the colonial state\'s core governance problem — ruling a vast, diverse population with minimal personnel.' },
            { text: 'Recognise that caste provided a ready-made, locally recognised framework for grouping people — the state could.' },
            { text: 'See how caste enumeration enabled specific policies: recruitment into "martial races" for the army, targeting "criminal.' },
            { text: 'Conclude that the colonial state\'s "administrative necessity" was actually a political strategy — caste data made.', faded: true, blankAnswer: 'The colonial state reinstated caste enumeration because it.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_01_004', title: 'Sociology\'s engagement with Indian.',
          scaffold: { problem: 'A Class 12 student is asked: "Trace how the colonial category \'criminal tribes\' (under the 1871 Criminal Tribes Act) became a sociological.',
            steps: [
            { text: 'Identify the colonial origin — 1871 Act notified specific nomadic communities as "habitually criminal" based on.' },
            { text: 'Explain the administrative logic — the Act served surveillance and labour control (e.g., forcing settlement for.' },
            { text: 'Trace the nationalist critique — leaders like Nehru opposed it as colonial stigma; the Act was repealed in 1952,.' },
            { text: 'Show the sociological engagement — post-colonial sociologists (e.g., Meena Radhakrishna, 2006) study DNTs not as.' },
            { text: 'Conclude — sociology transformed a colonial legal category into a subject of critical study, exposing the state\'s role.', faded: true, blankAnswer: 'The colonial "criminal tribe" category was produced by the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_01_006', title: 'The "problem of the village" refers to.',
          scaffold: { problem: 'A Class 12 student writes in a board exam answer: "M.N. Srinivas studied Rampura village because he thought Indian villages were isolated.',
            steps: [
            { text: 'Identify the factual error — Srinivas did not believe villages were isolated; he chose the village as a manageable.' },
            { text: 'Recall Srinivas\'s own later critique — he acknowledged that caste, kinship, and economy extend beyond village.' },
            { text: 'Rewrite using the distinction between unit of observation (village) and unit of analysis (caste/region/state):.' },
            { text: 'Verify the rewrite includes both the methodological reason (fieldwork manageability) and the theoretical correction.', faded: true, blankAnswer: 'Corrected answer: "Srinivas chose the village as a.' }
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
        { type: 'scaffold', nodeId: 'c12_soc_cbse_01_009', title: 'The debate between universalism and.',
          scaffold: { problem: 'A student reads a paper: "We apply Bourdieu\'s forms of capital (economic, cultural, social) to analyze educational inequality in Delhi.',
            steps: [
            { text: 'Identify the theoretical framework — Bourdieu\'s capital theory is a Western (French) sociological framework claiming.' },
            { text: 'Classify the stance — Using it without modification in Delhi is universalist; the categories originate outside India.' },
            { text: 'Imagine a particularist revision — Ask: What local concepts do Delhi parents/students use to explain educational.' },
            { text: 'Show how categories change — Instead of "cultural capital" (measured by books/museum visits), the study might measure.' },
            { text: 'Note the epistemological shift — The revised study tests whether *indigenous* categories explain variance better than.', faded: true, blankAnswer: 'Universalist stance; particularist revision replaces.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_soc_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'The Significance of a Sociology of India: Why Study Indian Society', spots: [
            { id: 's1', label: 'The significance of a sociology', prompt: 'Which idea is this? — The significance of a sociology of India lies in its systematic, scientific study of.', answer: 'The significance of a sociology', options: ['The significance of a sociology', 'Colonialism in India refers to', 'Sociologys engagement with Indian society', 'The problem of the village'] },
            { id: 's2', label: 'Colonialism in India refers to', prompt: 'Which idea is this? — Colonialism in India refers to the British imperial rule (1757–1947) that restructured.', answer: 'Colonialism in India refers to', options: ['Colonialism in India refers to', 'The significance of a sociology', 'Sociologys engagement with Indian society', 'The problem of the village'] },
            { id: 's3', label: 'Sociologys engagement with Indian society', prompt: 'Which idea is this? — Sociology\'s engagement with Indian society refers to the historical and intellectual.', answer: 'Sociologys engagement with Indian society', options: ['Sociologys engagement with Indian society', 'The significance of a sociology', 'Colonialism in India refers to', 'The problem of the village'] },
            { id: 's4', label: 'The problem of the village', prompt: 'Which idea is this? — The "problem of the village" refers to the epistemological and methodological debate in.', answer: 'The problem of the village', options: ['The problem of the village', 'The significance of a sociology', 'Colonialism in India refers to', 'Sociologys engagement with Indian society'] },
            { id: 's5', label: 'The distinctive features of Indian', prompt: 'Which idea is this? — The distinctive features of Indian society refer to its **plurality** (coexistence of.', answer: 'The distinctive features of Indian', options: ['The distinctive features of Indian', 'The significance of a sociology', 'Colonialism in India refers to', 'Sociologys engagement with Indian society'] },
            { id: 's6', label: 'The debate between universalism and', prompt: 'Which idea is this? — The debate between universalism and particularism in studying Indian society concerns.', answer: 'The debate between universalism and', options: ['The debate between universalism and', 'The significance of a sociology', 'Colonialism in India refers to', 'Sociologys engagement with Indian society'] }
          ] } }
    ],
    explore: { component: C12_SociologyIntroducingIndianSocietySim, prompt: 'Explore the interactive — The Significance of a Sociology of India: Why Study Indian Society' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_001', difficulty: 'standard',
          question: 'The significance of a sociology of India lies in its systematic, scientific.',
          hint: 'Revisit c11_soc_cbse_01_002 (Sociological Imagination) and practice converting three.',
          misconception: 'Students often think \'unlearning common sense\' means \'common sense is false and sociology gives the true facts\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The significance of a sociology of India lies in its systematic, scientific study of',
                  options: ['The significance of a sociology of India lies in its systematic, scientific study of', 'Colonialism in India refers to the British imperial rule (1757–1947) that restructured', 'Sociology\'s engagement with Indian society refers to the historical and intellectual', 'The "problem of the village" refers to the epistemological and methodological debate in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'unlearning common sense\' means \'common sense is false and sociology gives the true facts\'.' }
          ],
            remediations: { 'unlearning-common-sense-means-common': { steps: ['Ask the student to write three \'common sense\' statements about Indian society they believe are true.', 'For each, identify the social group whose viewpoint it represents (e.g., \'caste doesn\'t matter\' — urban upper-caste.', 'Find a counter-perspective from a different group (e.g., a Dalit student\'s experience of discrimination in the same.', 'Explain that sociology does not decide which is \'true\' but studies the conditions producing both views.', 'Re-attempt Diagnostic Question 2 with this framework.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_002', difficulty: 'standard',
          question: 'Colonialism in India refers to the British imperial rule (1757–1947) that.',
          hint: 'If stuck, revisit c11_soc_cbse_03_001 (Social Institutions) and c11_soc_cbse_06_002.',
          misconception: 'Students often think colonialism simply "added" modern institutions (courts, schools, railways) to an unchanged.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Colonialism in India refers to the British imperial rule (1757–1947) that restructured',
                  options: ['Colonialism in India refers to the British imperial rule (1757–1947) that restructured', 'The significance of a sociology of India lies in its systematic, scientific study of', 'Sociology\'s engagement with Indian society refers to the historical and intellectual', 'The "problem of the village" refers to the epistemological and methodological debate in'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think colonialism simply "added" modern institutions (courts, schools, railways) to an unchanged traditional society.' }
          ],
            remediations: { 'colonialism-simply-added-modern-institutions': { steps: ['If a student cannot distinguish between "colonial impact" and "colonial policy", do this: 1) Give them two 1901 census.', '3) Ask them to write one paragraph explaining how the *category* "Scheduled Tribe" is a colonial-production, not a.', 'Re-diagnose with DIAGNOSTIC_QUESTION_3.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_004', difficulty: 'standard',
          question: 'Sociology\'s engagement with Indian society refers to the historical and.',
          hint: 'Revisit c11_soc_cbse_01_007 (Growth of Sociology in India: Colonial Context) and.',
          misconception: 'Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.',
          parts: [
                { id: 'a', prompt: 'What was the primary purpose of the British decennial census (starting 1881) in India, and how did it unintentionally become a sociological tool?', answer: 'The census was primarily an administrative tool for governance',
                  options: ['The census was primarily an administrative tool for governance', 'the census was done to help sociologists', 'applied Western theories to India'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.' },
                { id: 'b', prompt: 'Compare how D.P. Mukerji and A.R. Desai each used Marxism to study Indian society.', answer: 'Mukerji used Marxism dialectically',
                  options: ['Mukerji used Marxism dialectically', 'applied Western theories to India', 'Indian sociology simply "applied Western theories to India"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.' }
          ],
            remediations: { 'indian-sociology-simply-applied-western': { steps: ['If the student holds this misconception: (1) Assign the 1901 Census Report excerpt (Risley on caste) and ask: "What.', '(3) Have them write a 200-word reflection: "How did the British act of counting create the \'caste system\' as a.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "The village studies of the 1950s-60s (Srinivas, Dube, Beteille) were purely academic exercises with no policy relevance." Use.', answer: 'The statement is false',
                  options: ['The statement is false', 'applied Western theories to India', 'Indian sociology simply "applied Western theories to India"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.' },
                { id: 'b', prompt: 'Compare how D.P. Mukerji and A.R. Desai each used Marxism to study Indian society.', answer: 'Mukerji used Marxism dialectically',
                  options: ['Mukerji used Marxism dialectically', 'applied Western theories to India', 'Indian sociology simply "applied Western theories to India"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Indian sociology simply "applied Western theories to India" — a passive transfer.' }
          ],
            remediations: { 'indian-sociology-simply-applied-western': { steps: ['If the student holds this misconception: (1) Assign the 1901 Census Report excerpt (Risley on caste) and ask: "What.', '(3) Have them write a 200-word reflection: "How did the British act of counting create the \'caste system\' as a.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_006', difficulty: 'standard',
          question: 'The "problem of the village" refers to the epistemological and methodological.',
          hint: 'If stuck, revisit c11_soc_cbse_05_010 (Village Studies in Indian Sociology) and the.',
          misconception: 'Students often think the "problem of the village" means "villages are not important" or "we shouldn\'t study villages.".',
          parts: [
                { id: 'a', prompt: 'What is the "village republic" thesis, and which colonial administrator-scholar is most associated with its formulation in the early 19th century?', answer: 'The "village republic" thesis portrays the Indian village as a self-governing,',
                  options: ['The "village republic" thesis portrays the Indian village as a self-governing,', 'little republics having nearly everything they want within themselves', 'problem of the village'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "problem of the village" means "villages are not important" or "we shouldn\'t study villages." The actual problem.' },
                { id: 'b', prompt: 'Explain why M.N. Srinivas chose the village (Rampura) as his unit of study in the 1950s, and identify one limitation he himself later acknowledged about this.', answer: 'Srinivas chose the village',
                  options: ['Srinivas chose the village', 'Srinivas believed villages were isolated', 'problem of the village'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "problem of the village" means "villages are not important" or "we shouldn\'t study villages." The actual problem.' }
          ],
            remediations: { 'the-problem-of-the-village': { steps: ['Re-read the distinction between "unit of observation" (where you do fieldwork) and "unit of analysis" (what explains.', 'Revisit c11_soc_cbse_05_010 (Village Studies in Indian Sociology) to see how triangulation was used to go beyond.', 'Write a one-paragraph comparison: "How would a study of \'water scarcity\' differ if the unit of analysis is the village.', 'the river basin/caste irrigation network?" 4.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "problem of the village" means "villages are not important" or "we shouldn\'t study villages.".',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The village study tradition in Indian sociology was merely a colonial hangover; it has no analytical value today." Support your judgment.', answer: 'The claim is false',
                  options: ['The claim is false', 'problem of the village', 'villages are not important', 'we shouldn\'t study villages'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the "problem of the village" means "villages are not important" or "we shouldn\'t study villages." The actual problem.' }
          ],
            remediations: { 'the-problem-of-the-village': { steps: ['Re-read the distinction between "unit of observation" (where you do fieldwork) and "unit of analysis" (what explains.', 'Revisit c11_soc_cbse_05_010 (Village Studies in Indian Sociology) to see how triangulation was used to go beyond.', 'Write a one-paragraph comparison: "How would a study of \'water scarcity\' differ if the unit of analysis is the village.', 'the river basin/caste irrigation network?" 4.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_008', difficulty: 'standard',
          question: 'The distinctive features of Indian society refer to its **plurality**.',
          hint: 'Revisit c11_soc_cbse_02_003 and c11_soc_cbse_06_002 — focus on the distinction between.',
          misconception: '**Misconception:** "Plurality, diversity, and stratification are just three words for the same thing — India has many.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distinctive features of Indian society refer to its **plurality** (coexistence of',
                  options: ['The distinctive features of Indian society refer to its **plurality** (coexistence of', 'The significance of a sociology of India lies in its systematic, scientific study of', 'Colonialism in India refers to the British imperial rule (1757–1947) that restructured', 'Sociology\'s engagement with Indian society refers to the historical and intellectual'],
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
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_009', difficulty: 'standard',
          question: 'The debate between universalism and particularism in studying Indian society.',
          hint: 'Revisit c12_soc_cbse_01_005 (Intellectual Context) to see how Ghurye, Srinivas, and.',
          misconception: 'Students often think "universalism = quantitative/Western, particularism = qualitative/Indian." This is false: Dumont\'s.',
          parts: [
                { id: 'a', prompt: 'A researcher studies "middle-class formation in Bengaluru" using Erik Olin Wright\'s class schema (contradictory class locations) without modification.', answer: 'First researcher: Universalist',
                  options: ['First researcher: Universalist', 'universalism = quantitative/Western, particularism = qualitative/Indian', '"universalism = quantitative/Western, particularism = qualitative/Indian'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "universalism = quantitative/Western, particularism = qualitative/Indian." This is false: Dumont\'s universalism was.' }
          ],
            remediations: { 'universalism-quantitative-western': { steps: ['If the student conflates method with stance: 1) Have them classify three studies (one quantitative universalist, one.', '2) Ask them to rewrite the quantitative particularist study\'s hypothesis replacing its indigenous concept with a.', '3) Re-test with Diagnostic Question 3.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
