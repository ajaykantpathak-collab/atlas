import type { SimDef } from '../../engine/types';
import C12_SociologyConstitutionSocialChangeSim from '../../../simulations/c6_12/C12_SociologyConstitutionSocialChangeSim';

/** v3 wrapped master — C12_SociologyConstitutionSocialChangeSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_sociologyconstitutionsocialchangesim: SimDef = {
    id: 'v3w_c12_sociologyconstitutionsocialchangesim',
    title: 'Caste in Contemporary India: Continuity and Change in Ritual and Secular Dimensions',
    subtitle: 'Covers continuity (endogamy, domestic rituals, caste-based social networks) and change.',
    classLevel: 12, subject: 'sociology', topic: 'Caste in Contemporary India: Continuity and Change in Ritual and Secular Dimensions',
    chapters: [],
    nodeIds: ['c12_soc_cbse_03_004', 'c12_soc_cbse_09_010', 'c12_soc_cbse_03_007', 'c12_soc_cbse_03_008', 'c12_soc_cbse_09_001', 'c12_soc_cbse_09_003', 'c12_soc_cbse_09_008', 'c12_soc_cbse_09_011', 'c12_soc_cbse_10_010', 'c12_soc_cbse_03_003', 'c12_soc_cbse_09_006', 'c12_soc_cbse_09_007', 'c12_soc_cbse_10_003', 'c12_soc_cbse_10_004', 'c12_soc_cbse_10_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a 22-year-old engineering graduate from a traditional Brahmin family in Bengaluru who eats in the.', goal: 'Master Caste in Contemporary India: Continuity and Change in Ritual and Secular Dimensions.' },
    discovery: {
        question: 'Compare the long-term consequences of Sanskritisation vs. Christianisation on tribal kinship and gender relations.',
        options: ['Sanskritisation typically *strengthens patriarchal control* and *reinforces', 'both modernise the tribe', '**Sanskritisation = Hinduisation = becoming Hindu**'],
        answer: 'Sanskritisation typically *strengthens patriarchal control* and *reinforces',
        hook: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.',
    },
    teaching: [
        { title: 'Caste in contemporary India refers to the.', text: 'Caste in contemporary India refers to the persistence of the traditional varna-jati hierarchy in ritual domains (endogamy, purity-pollution rules, commensality) alongside its transformation in.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_soc_cbse_03_004', title: 'Caste in contemporary India refers to.',
          scaffold: { problem: 'A researcher wants to study whether caste influences hiring in a modern IT firm in Hyderabad.',
            steps: [
            { text: 'Define indicators — ritual dimension: employee self-reports on marriage preferences, commensality practices, temple.' },
            { text: 'Choose mixed methods — quantitative survey (stratified by caste category: General, OBC, SC, ST) to measure statistical.' },
            { text: 'Control for confounders — collect data on education (institute tier), parental occupation, English fluency, years of.' },
            { text: 'Analyse interaction — test whether ritual practices (e.g., vegetarianism, endogamous marriage) correlate with secular.' },
            { text: 'Interpret findings using the node\'s framework — if upper-caste employees show high ritual adherence but deny caste.', faded: true, blankAnswer: 'A 5-step mixed-methods design with ritual/secular.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_09_010', title: 'The role of the state in cultural.',
          scaffold: { problem: 'A village in Haryana has a Khap Panchayat that issues a diktat against inter-caste marriage.',
            steps: [
            { text: 'Identify the legal framework — inter-caste marriage is legal under the Hindu Marriage Act 1955 and Special Marriage Act.' },
            { text: 'Identify the cultural framework — the Khap asserts customary authority over marriage, invoking \'bhaichara\'.' },
            { text: 'Analyse the gap — police inaction reflects \'legal pluralism\' where state law coexists with customary norms, and local.' },
            { text: 'Apply \'state capacity\' — the state has legislative capacity (laws exist) but weak implementational capacity (police.' },
            { text: 'Conclude — cultural change requires not just laws but bureaucratic insulation from local power structures and judicial.', faded: true, blankAnswer: 'The state has legal authority but fails in enforcement due.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_03_007', title: 'Tribal integration refers to the.',
          scaffold: { problem: 'The **Gond** tribe in Madhya Pradesh historically had Gond Rajas (Garha Mandla kingdom).',
            steps: [
            { text: 'Identify the *voluntary cultural emulation* — claiming Rajput ancestry, adopting upper-caste diet/rituals, hiring.' },
            { text: 'Identify the *external structural classification* — the 1931 Census enumerated Gonds as "Hindu" without their consent,.' },
            { text: 'Contrast the mechanisms — Sanskritisation is *bottom-up* (tribe initiates), *mimetic* (copies upper caste),.' },
            { text: 'Note the coexistence — the same tribe experiences both: elites Sanskritise to claim Kshatriya status, while the.' },
            { text: 'Conclude — the processes are distinct but simultaneous; Sanskritisation is a *response* to Hinduisation\'s hierarchical.', faded: true, blankAnswer: 'Two processes: (1) Sanskritisation — voluntary adoption of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_03_008', title: 'The family in India is a social.',
          scaffold: { problem: 'A sociologist studies two households in coastal Karnataka. Household A: Elderly couple, their married son, daughter-in-law, and two.',
            steps: [
            { text: 'Identify co-residence composition for each household. Household A = three generations, two conjugal units (parents +.' },
            { text: 'Determine structural type. Household A fits \'joint family\' structurally (multiple conjugal units co-residing).' },
            { text: 'Infer descent rule. Household A: property in father\'s name, passes to son → patrilineal.' },
            { text: 'Infer residence rule. Household A: daughter-in-law lives with husband\'s kin → patrilocal.' },
            { text: 'Analyse authority. Household A: father/elder male controls budget, property → patriarchal.' },
            { text: 'Note ambiguities. Household B\'s \'jointness\' is functional (shared fund, mutual obligation) not structural (no multiple.', faded: true, blankAnswer: 'Household A: Structural joint, patrilineal, patrilocal,.' }
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
        { type: 'scaffold', nodeId: 'c12_soc_cbse_09_003', title: 'Critiques of Sanskritisation refer to.',
          scaffold: { problem: 'A sociologist studies the "Rathore" community (fictional), traditionally classified as Shudra, who over 30 years have: (a) adopted.',
            steps: [
            { text: 'Identify the process — this is Sanskritisation (lower caste adopting dwija customs for status mobility).' },
            { text: 'Apply Critique 1 (Positional vs Structural) — the Rathores\' *position* may have risen locally (e.g., better temple.' },
            { text: 'Apply Critique 2 (Ideological Conservatism) — by adopting vegetarianism/Brahmin priests, Rathores validate.' },
            { text: 'Apply Critique 4 (Gendered Consequences) — shift from bride-price (valuing women\'s labour) to dowry (treating daughters.' },
            { text: 'Apply Critique 5 (Erosion of Dalit/Lower-Caste Culture) — if Rathores had distinct folk deities, oral epics, or.' },
            { text: 'Synthesize — the case illustrates all five critiques simultaneously: mobility without equality, internalised.', faded: true, blankAnswer: 'The Rathore case demonstrates: (1) Positional change.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_soc_cbse_09_010', title: 'Identify each idea',
          dissect: { specimen: 'Caste in Contemporary India: Continuity and Change in Ritual and Secular Dimensions', spots: [
            { id: 's1', label: 'Caste in contemporary India refers', prompt: 'Which idea is this? — Caste in contemporary India refers to the persistence of the traditional varna-jati.', answer: 'Caste in contemporary India refers', options: ['Caste in contemporary India refers', 'The role of the state', 'Tribal integration refers to the', 'The family in India is'] },
            { id: 's2', label: 'The role of the state', prompt: 'Which idea is this? — The role of the state in cultural change refers to the deliberate use of state power —.', answer: 'The role of the state', options: ['The role of the state', 'Caste in contemporary India refers', 'Tribal integration refers to the', 'The family in India is'] },
            { id: 's3', label: 'Tribal integration refers to the', prompt: 'Which idea is this? — Tribal integration refers to the historical and ongoing processes through which tribal.', answer: 'Tribal integration refers to the', options: ['Tribal integration refers to the', 'Caste in contemporary India refers', 'The role of the state', 'The family in India is'] },
            { id: 's4', label: 'The family in India is', prompt: 'Which idea is this? — The family in India is a social institution characterised by diverse structural forms —.', answer: 'The family in India is', options: ['The family in India is', 'Caste in contemporary India refers', 'The role of the state', 'Tribal integration refers to the'] },
            { id: 's5', label: 'Modernisation is a sociological process', prompt: 'Which idea is this? — Modernisation is a sociological process of cultural change where traditional, local, and.', answer: 'Modernisation is a sociological process', options: ['Modernisation is a sociological process', 'Caste in contemporary India refers', 'The role of the state', 'Tribal integration refers to the'] },
            { id: 's6', label: 'Critiques of Sanskritisation refer to', prompt: 'Which idea is this? — Critiques of Sanskritisation refer to the sociological arguments that challenge M.N.', answer: 'Critiques of Sanskritisation refer to', options: ['Critiques of Sanskritisation refer to', 'Caste in contemporary India refers', 'The role of the state', 'Tribal integration refers to the'] }
          ] } }
    ],
    explore: { component: C12_SociologyConstitutionSocialChangeSim, prompt: 'Explore the interactive — Caste in Contemporary India: Continuity and Change in Ritual and Secular Dimensions' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_004', difficulty: 'standard',
          question: 'Caste in contemporary India refers to the persistence of the traditional.',
          hint: 'Revisit c12_soc_cbse_03_001 and c12_soc_cbse_03_002 — specifically the six defining.',
          misconception: 'Students often think \'caste is weakening everywhere\' because they see intercaste dining in colleges or upper-caste.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Caste in contemporary India refers to the persistence of the traditional varna-jati',
                  options: ['Caste in contemporary India refers to the persistence of the traditional varna-jati', 'The role of the state in cultural change refers to the deliberate use of state power', 'Tribal integration refers to the historical and ongoing processes through', 'The family in India is a social institution characterised by diverse structural forms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'caste is weakening everywhere\' because they see intercaste dining in colleges or upper-caste peers saying \'caste.' }
          ],
            remediations: { 'caste-is-weakening-everywhere-because': { steps: ['If a student conflates ritual/secular or thinks caste is disappearing: (1) Have them re-read the NCERT paragraphs on.', '(2) Ask them to list 5 marriage ads from a newspaper matrimonial column and code each for caste preference — this makes.', '(3) Assign the case study of the 1980s rise of Dalit Panthers and Bahujan Samaj Party to show caste becoming *more*.', '(4) Re-diagnose with Question 2 above.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_010', difficulty: 'standard',
          question: 'The role of the state in cultural change refers to the deliberate use of state.',
          hint: 'If stuck, revisit c11_ps_cbse_11_003 (Fundamental Rights) and c12_soc_cbse_09_006.',
          misconception: 'Students often believe that passing a law (e.g., banning dowry, child marriage, untouchability) automatically changes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The role of the state in cultural change refers to the deliberate use of state power',
                  options: ['The role of the state in cultural change refers to the deliberate use of state power', 'Caste in contemporary India refers to the persistence of the traditional varna-jati', 'Tribal integration refers to the historical and ongoing processes through', 'The family in India is a social institution characterised by diverse structural forms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that passing a law (e.g., banning dowry, child marriage, untouchability) automatically changes cultural behaviour.' }
          ],
            remediations: { 'passing-a-law-e': { steps: ['If the student equates legislation with cultural transformation: (1) Have them compare NFHS-5 data on child marriage.', '(3) Revisit c12_soc_cbse_09_006 (Secularisation) and c11_soc_cbse_03_008 (State and Sovereignty) to distinguish state.', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_5.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_007', difficulty: 'standard',
          question: 'Tribal integration refers to the historical and ongoing processes through which.',
          hint: 'If stuck, re-read c11_soc_cbse_10_010 for Sanskritisation and c12_soc_cbse_03_005 for the.',
          misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.',
          parts: [
                { id: 'a', prompt: 'A Bhil community in Rajasthan has recently: (a) stopped consuming alcohol and meat, (b) built a temple to Shiva, (c) started claiming Rajput ancestry, and (d).', answer: 'Dominant process: **Sanskritisation**',
                  options: ['Dominant process: **Sanskritisation**', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' },
                { id: 'b', prompt: 'Compare the long-term consequences of Sanskritisation vs. Christianisation on tribal kinship and gender relations.', answer: 'Sanskritisation typically *strengthens patriarchal control* and *reinforces',
                  options: ['Sanskritisation typically *strengthens patriarchal control* and *reinforces', 'both modernise the tribe', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' }
          ],
            remediations: { 'sanskritisation-hinduisation-becoming-hindu': { steps: ['**Revisit c11_soc_cbse_10_010** (Srinivas on Sanskritisation) — re-read the definition: "process by which a low.', '**Revisit c12_soc_cbse_03_005** (Tribe-Caste Continuum) — focus on the distinction: "tribes lack purity-pollution.', '**Do a 15-minute table exercise**: Draw three columns (Sanskritisation, Hinduisation, Christianisation).', 'For each, fill: *Agent* (who drives it?), *Mechanism* (how?), *Goal/Outcome* (what changes?), *Example* (one tribe).'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.',
          parts: [
                { id: 'a', prompt: '"Christianisation has been more empowering for tribal communities than Sanskritisation or Hinduisation." Evaluate this statement with reference to education,.', answer: 'The statement is partially true but context-dependent',
                  options: ['The statement is partially true but context-dependent', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' },
                { id: 'b', prompt: 'Construct a hypothetical scenario where a single tribal community simultaneously experiences Sanskritisation, Hinduisation, and Christianisation in different.', answer: '**Scenario**: The **Santhal** community in Jharkhand',
                  options: ['**Scenario**: The **Santhal** community in Jharkhand', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' },
                { id: 'c', prompt: 'Compare the long-term consequences of Sanskritisation vs. Christianisation on tribal kinship and gender relations.', answer: 'Sanskritisation typically *strengthens patriarchal control* and *reinforces',
                  options: ['Sanskritisation typically *strengthens patriarchal control* and *reinforces', 'both modernise the tribe', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' }
          ],
            remediations: { 'sanskritisation-hinduisation-becoming-hindu': { steps: ['**Revisit c11_soc_cbse_10_010** (Srinivas on Sanskritisation) — re-read the definition: "process by which a low.', '**Revisit c12_soc_cbse_03_005** (Tribe-Caste Continuum) — focus on the distinction: "tribes lack purity-pollution.', '**Do a 15-minute table exercise**: Draw three columns (Sanskritisation, Hinduisation, Christianisation).', 'For each, fill: *Agent* (who drives it?), *Mechanism* (how?), *Goal/Outcome* (what changes?), *Example* (one tribe).'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_008', difficulty: 'standard',
          question: 'The family in India is a social institution characterised by diverse structural.',
          hint: 'Revisit c11_soc_cbse_03_002 (Family: Definition, Functions, Types) and.',
          misconception: 'Students routinely equate \'matrilineal\' with \'matriarchal\', writing in exams: "Khasi society is matriarchal because.',
          parts: [
                { id: 'a', prompt: 'Define \'nuclear family\' and \'joint family\' as used in Indian sociology.', answer: 'A nuclear family consists of one set of parents and their children',
                  options: ['A nuclear family consists of one set of parents and their children', 'joint family means all relatives living together', 'Khasi society is matriarchal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students routinely equate \'matrilineal\' with \'matriarchal\', writing in exams: "Khasi society is matriarchal because property passes from.' },
                { id: 'b', prompt: 'A family in a Himalayan village has the father working in a Gulf country for 10 months a year.', answer: 'Structure: Joint (three generations co-residing',
                  options: ['Structure: Joint (three generations co-residing', 'nuclear because father is away', 'matriarchal because mother manages daily affairs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students routinely equate \'matrilineal\' with \'matriarchal\', writing in exams: "Khasi society is matriarchal because property passes from.' }
          ],
            remediations: { 'students-routinely-equate-matrilineal-with': { steps: ['Have the student create a two-column table: Column A = Matriliny (descent, inheritance, residence), Column B =.', 'Using the NCERT text, fill Column A with Khasi/Nair examples (mother-to-daughter inheritance, matrilocal residence).', 'Ask: "Who manages the family property? Who represents the clan in village councils?" — guide them to find that maternal.', 'Re-read the NCERT line: "matriarchy... has been a theoretical rather than an empirical concept."', 'Assign a 3-mark practice question: "Distinguish between matriliny and matriarchy with reference to any Indian.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students routinely equate \'matrilineal\' with \'matriarchal\', writing in exams: "Khasi society is matriarchal because.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The term \'joint family\' is an English imposition that obscures the diversity of Indian family forms." Support your evaluation with two.', answer: 'The statement is largely valid',
                  options: ['The statement is largely valid', 'joint family is a traditional Indian concept', 'Khasi society is matriarchal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students routinely equate \'matrilineal\' with \'matriarchal\', writing in exams: "Khasi society is matriarchal because property passes from.' }
          ],
            remediations: { 'students-routinely-equate-matrilineal-with': { steps: ['Have the student create a two-column table: Column A = Matriliny (descent, inheritance, residence), Column B =.', 'Using the NCERT text, fill Column A with Khasi/Nair examples (mother-to-daughter inheritance, matrilocal residence).', 'Ask: "Who manages the family property? Who represents the clan in village councils?" — guide them to find that maternal.', 'Re-read the NCERT line: "matriarchy... has been a theoretical rather than an empirical concept."', 'Assign a 3-mark practice question: "Distinguish between matriliny and matriarchy with reference to any Indian.'] } } },
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
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_003', difficulty: 'standard',
          question: 'Critiques of Sanskritisation refer to the sociological arguments that challenge.',
          hint: 'Revisit the definition and the Kumud Pawade case study in node c12_soc_cbse_09_002; focus.',
          misconception: 'Students often believe that **critiques of Sanskritisation mean the process itself does not happen or is "false."**.',
          parts: [
                { id: 'a', prompt: 'A dominant OBC community in a region abandons its traditional bride-price system and adopts dowry after Sanskritising.', answer: 'The fourth critique states Sanskritisation leads to adoption of',
                  options: ['Correct answer: The fourth critique states Sanskritisation leads to adoption of', 'dowry is bad', 'Sanskritisation is criticised, so it is not a real process'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **critiques of Sanskritisation mean the process itself does not happen or is "false."** They write:.' }
          ],
            remediations: { 'critiques-of-sanskritisation-mean-the': { steps: ['If a student conflates critique with denial: (1) Ask them to reread the Kumud Pawade excerpt (NCERT p.21) — does her.', '(2) Have them list three real-world examples of Sanskritisation they observe (e.g., meat-eating communities turning.', '(3) Then map each critique to those examples: "Does this example show positional change?', 'Does it involve adopting dowry?" This concretises the critiques as analytical lenses, not debunking tools.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **critiques of Sanskritisation mean the process itself does not happen or is "false."**.',
          parts: [
                { id: 'a', prompt: '"Evaluate the claim: \'The Backward Classes Movement and Dalit assertion movements prove Sanskritisation has failed as a strategy for social change.\'" Defend.', answer: 'Correct evaluation: The claim is largely valid',
                  options: ['Correct evaluation: The claim is largely valid', 'yes it failed', 'no it didn\'t', 'Sanskritisation is criticised, so it is not a real process'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **critiques of Sanskritisation mean the process itself does not happen or is "false."** They write:.' }
          ],
            remediations: { 'critiques-of-sanskritisation-mean-the': { steps: ['If a student conflates critique with denial: (1) Ask them to reread the Kumud Pawade excerpt (NCERT p.21) — does her.', '(2) Have them list three real-world examples of Sanskritisation they observe (e.g., meat-eating communities turning.', '(3) Then map each critique to those examples: "Does this example show positional change?', 'Does it involve adopting dowry?" This concretises the critiques as analytical lenses, not debunking tools.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
