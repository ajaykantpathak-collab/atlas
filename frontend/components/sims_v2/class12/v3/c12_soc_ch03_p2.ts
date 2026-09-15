import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch03_p2: SimDef = {
    id: 'v3_c12_soc_ch03_p2',
    title: 'Social Institutions: Continuity and Change · Part 2/2',
    subtitle: 'A ladder where every rung exists only relative to the others',
    classLevel: 12, subject: 'sociology', topic: 'Social Institutions: Continuity and Change · Part 2/2',
    chapters: ['c12_soc_ch03'],
    nodeIds: ['c12_soc_cbse_03_007', 'c12_soc_cbse_03_008', 'c12_soc_cbse_03_009', 'c12_soc_cbse_03_010', 'c12_soc_cbse_03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social structure analyst', intro: 'At the wedding, the priests, caterers and guests follow an invisible rulebook nobody wrote down — sociology\'s job is to read it.', goal: 'Explain the varna-jati distinction and the purity-pollution logic that makes caste both separating and hierarchical.' },
    discovery: {
        question: 'Strip away purity and pollution but keep fixed marriages and inherited occupations — do you still have caste, or something else entirely?',
        options: ['Not caste — without purity-pollution there\'s no moral ladder, just separate guild-like groups; ranking by ritual distance is what makes the system one', 'Yes — caste is only about who marries whom', 'Yes — hereditary jobs alone define it', 'No — because caste is really about class'],
        answer: 'Not caste — without purity-pollution there\'s no moral ladder, just separate guild-like groups; ranking by ritual distance is what makes the system one',
        hook: 'Varna is not the \'real\' caste — it\'s a four-box scriptural ideal. Jati, the thousands of actual birth-groups people marry and eat by, is the lived institution; confusing the two flattens the whole system.',
    },
    teaching: [
        { title: 'Tribes and the Process of Integration: Sanskritisation, Hinduisation and Christianisation', text: 'Tribal integration refers to the historical and ongoing processes through which tribal communities are absorbed into mainstream society, primarily through **Sanskritisation** (adoption of upper-caste.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Dissect the rulebook — birth, endogamy, food rules, hereditary work — and figure out how one institution can separate communities into boxes yet rank them on a single ladder.',
        labels: ['Tribes and the Process', 'The Family in India', 'Changes in the Family', 'Kinship: Rules of Descent,', 'Marriage Rules in India'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_007', title: 'Tribes and the Process of Integration: Sanskritisation, Hinduisation and Christianisation',
          caseStudy: { intro: 'Imagine a Gond village in Madhya Pradesh where families have stopped eating beef, started wearing the sacred thread, and hired a Brahmin priest for weddings.',
            decisions: [{ prompt: 'Define Sanskritisation in the context of tribal communities. How does M.N. Srinivas\'s original concept apply to tribes?', options: [
                { text: 'Sanskritisation is a process where a lower caste or tribal group attempts to raise its', outcome: 'Sanskritisation is a process where a lower caste or tribal group attempts to raise its ritual.' },
                { text: 'becoming Hindu', outcome: 'Not quite — Students often think **Sanskritisation = Hinduisation = becoming Hindu**.', reveals: 'sanskritisation-hinduisation-becoming-hindu' },
                { text: '**Sanskritisation = Hinduisation = becoming Hindu**', outcome: 'Not quite — Students often think **Sanskritisation = Hinduisation = becoming Hindu**.', reveals: 'sanskritisation-hinduisation-becoming-hindu' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_008', title: 'The Family in India: Nuclear and Joint Family, Patriarchy and Matriarchy',
          caseStudy: { intro: 'Imagine a Class 12 student from Delhi visiting their cousin in Shillong, Meghalaya.',
            decisions: [{ prompt: 'Define \'nuclear family\' and \'joint family\' as used in Indian sociology.', options: [
                { text: 'A nuclear family consists of one set of parents and their children', outcome: 'A nuclear family consists of one set of parents and their children.' },
                { text: 'joint family means all relatives living together', outcome: 'Not quite — Students routinely equate \'matrilineal\' with \'matriarchal\', writing in exams: "Khasi society.', reveals: 'students-routinely-equate-matrilineal-with' },
                { text: 'Khasi society is matriarchal', outcome: 'Not quite — Students routinely equate \'matrilineal\' with \'matriarchal\', writing in exams: "Khasi society.', reveals: 'students-routinely-equate-matrilineal-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_009', title: 'Changes in the Family: Industrialisation, Urbanisation and the Decline of the Joint Family',
          caseStudy: { intro: 'Imagine a family in 1950s rural Bihar where three brothers farm jointly, share a kitchen, and pool income.',
            decisions: [{ prompt: 'Define "joint family" in the Indian sociological context and distinguish it from the vernacular understanding of "extended family." Why.', options: [
                { text: 'A joint family is a residential, commensal, and coparcenary unit comprising multiple', outcome: 'A joint family is a residential, commensal, and coparcenary unit comprising multiple married.' },
                { text: 'any large family living together', outcome: 'Not quite — Students equate "decline of joint family" with "rise of individualism" or "Western-style nuclear.', reveals: 'students-equate-decline-of-joint' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_010', title: 'Kinship: Rules of Descent, Marriage and the Gotra/Pravara System',
          caseStudy: { intro: 'Imagine you are at a North Indian wedding where the priest asks the bride\'s and groom\'s gotras before the ceremony. Why does this matter?',
            decisions: [{ prompt: 'Define \'gotra\' and state its primary function in regulating Hindu marriage.', options: [
                { text: 'Gotra is an exogamous patrilineal clan tracing descent from a common Vedic rishi', outcome: 'Gotra is an exogamous patrilineal clan tracing descent from a common Vedic rishi; its primary.' },
                { text: 'gotra is mother\'s lineage', outcome: 'Not quite — Students often think "gotra = caste" or "gotra is inherited from mother." In reality, gotra is.', reveals: 'gotra-caste-or-gotra-is' },
                { text: 'gotra determines occupation', outcome: 'Not quite — Students often think "gotra = caste" or "gotra is inherited from mother." In reality, gotra is.', reveals: 'gotra-caste-or-gotra-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_011', title: 'Marriage Rules in India: Endogamy, Exogamy, Hypergamy and Hypogamy',
          caseStudy: { intro: 'Imagine you are scrolling through a matrimonial website and see a profile that reads: "Seeking alliance for Brahmin boy, 28, Engineer.',
            decisions: [{ prompt: 'Define endogamy and exogamy in the context of the Indian caste system. Give one example of each.', options: [
                { text: 'Endogamy: marriage within one\'s own caste/sub-caste (e.g., a Jat marrying a Jat)', outcome: 'Endogamy: marriage within one\'s own caste/sub-caste (e.g., a Jat marrying a Jat).' },
                { text: 'dowry-giving', outcome: 'Not quite — Students often think hypergamy means "dowry-giving" and hypogamy means "dowry-receiving", confusing.', reveals: 'hypergamy-means-dowry-giving-and' },
                { text: 'dowry-receiving', outcome: 'Not quite — Students often think hypergamy means "dowry-giving" and hypogamy means "dowry-receiving", confusing.', reveals: 'hypergamy-means-dowry-giving-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A sociology student watching her own family insists on \'same-caste matches only\' asks why the elders treat inter-caste marriage as a threat to \'everything\', not just a preference.',
            decisions: [{ prompt: 'Which pillar of the caste system explains the panic?', options: [
                { text: 'Endogamy is the keystone — caste-bound marriage keeps the purity-pollution hierarchy and the birth-to-occupation link intact; mixed marriage produces children whose ritual status and inherited role can\'t be fixed, which is why a \'preference\' polices itself like a load-bearing wall.', outcome: 'The chapter\'s architecture: the three pillars interlock — endogamy doesn\'t preserve \'culture,\' it preserves the closed boundaries the whole stratification system needs to reproduce.' },
                { text: 'It\'s just hierarchy — elders want to protect status, and marriage is where status shows.', outcome: 'Hierarchy names the ranking, not the mechanism that keeps it — the ranking survives only because endogamy seals it; status anxiety is the symptom, boundary-closure is the load.', reveals: 'hierarchy-alone-explains-it' },
                { text: 'It\'s occupational — they fear losing hereditary trades more than matches.', outcome: 'Occupation is a pillar, but the elders aren\'t guarding a trade — they\'re guarding the boundary; endogamy is the \'key\' precisely because it\'s what keeps both rank and occupation assignable by birth.', reveals: 'marriage-is-about-jobs' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_011', title: 'You made it',
          caseStudy: { intro: 'You can now see caste as a system where separation creates the hierarchy — and where ritual status keeps converting into land, capital and office.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_007', difficulty: 'standard',
          question: 'Tribal integration refers to the historical and ongoing processes through which.',
          hint: 'If stuck, re-read c11_soc_cbse_10_010 for Sanskritisation and c12_soc_cbse_03_005 for the.',
          misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.',
          parts: [
                { id: 'a', prompt: 'A Bhil community in Rajasthan has recently: (a) stopped consuming alcohol and meat, (b) built a temple to Shiva, (c) started claiming Rajput ancestry, and (d).', answer: 'Dominant process: **Sanskritisation**',
                  options: ['Dominant process: **Sanskritisation**', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'If stuck, re-read c11_soc_cbse_10_010 for Sanskritisation and c12_soc_cbse_03_005 for the.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' },
                { id: 'b', prompt: 'Compare the long-term consequences of Sanskritisation vs. Christianisation on tribal kinship and gender relations.', answer: 'Sanskritisation typically *strengthens patriarchal control* and *reinforces',
                  options: ['Sanskritisation typically *strengthens patriarchal control* and *reinforces', 'both modernise the tribe', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'If stuck, re-read c11_soc_cbse_10_010 for Sanskritisation and c12_soc_cbse_03_005 for the.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' }
          ],
            remediations: { 'sanskritisation-hinduisation-becoming-hindu': { steps: ['**Revisit c11_soc_cbse_10_010** (Srinivas on Sanskritisation) — re-read the definition: "process by which a low.', '**Revisit c12_soc_cbse_03_005** (Tribe-Caste Continuum) — focus on the distinction: "tribes lack purity-pollution.', '**Do a 15-minute table exercise**: Draw three columns (Sanskritisation, Hinduisation, Christianisation).', 'For each, fill: *Agent* (who drives it?), *Mechanism* (how?), *Goal/Outcome* (what changes?), *Example* (one tribe).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.',
          parts: [
                { id: 'a', prompt: '"Christianisation has been more empowering for tribal communities than Sanskritisation or Hinduisation." Evaluate this statement with reference to education.', answer: 'The statement is partially true but context-dependent',
                  options: ['The statement is partially true but context-dependent', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'If stuck, re-read c11_soc_cbse_10_010 for Sanskritisation and c12_soc_cbse_03_005 for the.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' },
                { id: 'b', prompt: 'Construct a hypothetical scenario where a single tribal community simultaneously experiences Sanskritisation, Hinduisation, and Christianisation in different.', answer: '**Scenario**: The **Santhal** community in Jharkhand',
                  options: ['**Scenario**: The **Santhal** community in Jharkhand', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'If stuck, re-read c11_soc_cbse_10_010 for Sanskritisation and c12_soc_cbse_03_005 for the.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' }
          ],
            remediations: { 'sanskritisation-hinduisation-becoming-hindu': { steps: ['**Revisit c11_soc_cbse_10_010** (Srinivas on Sanskritisation) — re-read the definition: "process by which a low.', '**Revisit c12_soc_cbse_03_005** (Tribe-Caste Continuum) — focus on the distinction: "tribes lack purity-pollution.', '**Do a 15-minute table exercise**: Draw three columns (Sanskritisation, Hinduisation, Christianisation).', 'For each, fill: *Agent* (who drives it?), *Mechanism* (how?), *Goal/Outcome* (what changes?), *Example* (one tribe).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_008', difficulty: 'standard',
          question: 'The family in India is a social institution characterised by diverse structural.',
          hint: 'Revisit c11_soc_cbse_03_002 (Family: Definition, Functions, Types) and.',
          misconception: 'Students routinely equate \'matrilineal\' with \'matriarchal\', writing in exams: "Khasi society is matriarchal because.',
          parts: [
                { id: 'a', prompt: 'Define \'nuclear family\' and \'joint family\' as used in Indian sociology.', answer: 'A nuclear family consists of one set of parents and their children',
                  options: ['A nuclear family consists of one set of parents and their children', 'joint family means all relatives living together', 'Khasi society is matriarchal'],
                  hint: 'Revisit c11_soc_cbse_03_002 (Family: Definition, Functions, Types) and c11_soc_cbse_03_003.',
                  misconception: 'Students routinely equate \'matrilineal\' with \'matriarchal\', writing in exams: "Khasi society is matriarchal because property passes from.' },
                { id: 'b', prompt: 'A family in a Himalayan village has the father working in a Gulf country for 10 months a year.', answer: 'Structure: Joint (three generations co-residing',
                  options: ['Structure: Joint (three generations co-residing', 'nuclear because father is away', 'matriarchal because mother manages daily affairs', 'Khasi society is matriarchal'],
                  hint: 'Revisit c11_soc_cbse_03_002 (Family: Definition, Functions, Types) and c11_soc_cbse_03_003.',
                  misconception: 'Students routinely equate \'matrilineal\' with \'matriarchal\', writing in exams: "Khasi society is matriarchal because property passes from.' }
          ],
            remediations: { 'students-routinely-equate-matrilineal-with': { steps: ['Have the student create a two-column table: Column A = Matriliny (descent, inheritance, residence), Column.', 'Using the NCERT text, fill Column A with Khasi/Nair examples (mother-to-daughter inheritance, matrilocal residence).', 'Ask: "Who manages the family property? Who represents the clan in village councils?" — guide them to find that maternal.', 'Re-read the NCERT line: "matriarchy... has been a theoretical rather than an empirical concept."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_009', difficulty: 'standard',
          question: 'Industrialisation and urbanisation transform family structures by separating.',
          hint: 'Revisit c12_soc_cbse_03_008\'s section on "The Diverse Forms of the Family" and.',
          misconception: 'Students equate "decline of joint family" with "rise of individualism" or "Western-style nuclear family." They write.',
          parts: [
                { id: 'a', prompt: 'A 2021 study in Hyderabad\'s IT corridor finds that 68% of tech professionals live in nuclear families, yet 82% contribute financially to parents\' households.', answer: 'This is transformation, not decline',
                  options: ['This is transformation, not decline', 'nuclear family rise'],
                  hint: 'Revisit c12_soc_cbse_03_008\'s section on "The Diverse Forms of the Family" and.',
                  misconception: 'Students equate "decline of joint family" with "rise of individualism" or "Western-style nuclear family." They write: "Urbanisation breaks.' }
          ],
            remediations: { 'students-equate-decline-of-joint': { steps: ['Have them compare 2011 Census data on household size (avg 4.8) with NSSO 2018 data on "financial support.', 'Assign the Uberoi (1993) essay "The Family in India: Beyond the Nuclear vs.', 'Ask them to interview two nuclear-family households (one migrant worker, one middle-class) mapping all kinship.', 'Re-diagnose using Question 3 — they must now explain how remittances and ritual visits constitute "joint family.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_010', difficulty: 'standard',
          question: 'Kinship is a culturally defined system of social relationships based on descent.',
          hint: 'Redraw the patrilineage diagram from Class 11 (c11_soc_cbse_03_003) labeling each male\'s.',
          misconception: 'Students often think "gotra = caste" or "gotra is inherited from mother." In reality, gotra is a *sub-caste*.',
          parts: [
                { id: 'a', prompt: 'Define \'gotra\' and state its primary function in regulating Hindu marriage.', answer: 'Gotra is an exogamous patrilineal clan tracing descent from a common Vedic rishi',
                  options: ['Gotra is an exogamous patrilineal clan tracing descent from a common Vedic rishi', 'gotra is mother\'s lineage', 'gotra determines occupation', 'gotra = caste'],
                  hint: 'Redraw the patrilineage diagram from Class 11 (c11_soc_cbse_03_003) labeling each male\'s gotra.',
                  misconception: 'Students often think "gotra = caste" or "gotra is inherited from mother." In reality, gotra is a *sub-caste* patrilineal clan; caste (jati).' },
                { id: 'b', prompt: 'A Brahmin boy (gotra: Bharadvaja, pravara: Angirasa, Bharhaspatya, Bharadvaja) wants to marry a girl (gotra: Bharadvaja, pravara: Angirasa, Bharhaspatya.', answer: 'Step 1: Identify boy\'s gotra = Bharadvaja',
                  options: ['Step 1: Identify boy\'s gotra = Bharadvaja', 'allowed because pravara is same', 'gotra = caste', 'gotra is inherited from mother'],
                  hint: 'Redraw the patrilineage diagram from Class 11 (c11_soc_cbse_03_003) labeling each male\'s gotra.',
                  misconception: 'Students often think "gotra = caste" or "gotra is inherited from mother." In reality, gotra is a *sub-caste* patrilineal clan; caste (jati).' },
                { id: 'c', prompt: 'Compare the Nair matrilineal taravad (Kerala) and the North Indian patrilineal joint family on: (a) descent reckoning, (b) property inheritance, (c) residence.', answer: 'and the North Indian patrilineal joint family on: (',
                  options: ['and the North Indian patrilineal joint family on: (', 'both patrilineal', 'gotra = caste', 'gotra is inherited from mother'],
                  hint: 'Redraw the patrilineage diagram from Class 11 (c11_soc_cbse_03_003) labeling each male\'s gotra.',
                  misconception: 'Students often think "gotra = caste" or "gotra is inherited from mother." In reality, gotra is a *sub-caste* patrilineal clan; caste (jati).' }
          ],
            remediations: { 'gotra-caste-or-gotra-is': { steps: ['Revisit c11_soc_cbse_03_003 (consanguineal vs.', 'affinal) and c11_soc_cbse_03_004 (endogamy/exogamy definitions).', 'Draw two concentric circles: outer = jati (e.g., Saraswat Brahmin), inner segments = gotras (Bharadvaja, Kashyapa.', 'Place ego in one segment; shade own segment (gotra prohibited) and outside outer circle (caste prohibited).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_011', difficulty: 'standard',
          question: 'Marriage rules in India are culturally prescribed norms that regulate spouse.',
          hint: 'Review c12_soc_cbse_03_001 (Caste System: Varna and Jati) and c12_soc_cbse_03_002 (Caste.',
          misconception: 'Students often think hypergamy means "dowry-giving" and hypogamy means "dowry-receiving", confusing economic.',
          parts: [
                { id: 'a', prompt: 'Define endogamy and exogamy in the context of the Indian caste system. Give one example of each.', answer: 'Endogamy: marriage within one\'s own caste/sub-caste (e.g., a Jat marrying a Jat)',
                  options: ['Endogamy: marriage within one\'s own caste/sub-caste (e.g., a Jat marrying a Jat)', 'dowry-giving', 'dowry-receiving'],
                  hint: 'Review c12_soc_cbse_03_001 (Caste System: Varna and Jati) and c12_soc_cbse_03_002 (Caste.',
                  misconception: 'Students often think hypergamy means "dowry-giving" and hypogamy means "dowry-receiving", confusing economic transactions with ritual.' },
                { id: 'b', prompt: 'A Reddy (dominant caste) man from Andhra Pradesh marries a Brahmin woman. Identify which marriage rules are followed and which are violated.', answer: 'Caste endogamy is violated (intercaste marriage)',
                  options: ['Caste endogamy is violated (intercaste marriage)', 'dowry-giving', 'dowry-receiving'],
                  hint: 'Review c12_soc_cbse_03_001 (Caste System: Varna and Jati) and c12_soc_cbse_03_002 (Caste.',
                  misconception: 'Students often think hypergamy means "dowry-giving" and hypogamy means "dowry-receiving", confusing economic transactions with ritual.' }
          ],
            remediations: { 'hypergamy-means-dowry-giving-and': { steps: ['If the student conflates hypergamy/hypogamy with dowry or cannot apply all four rules to one case: (1) Revisit Class 11.', '(2) Create a 2×2 table: rows = caste endogamy (yes/no), columns = gotra exogamy (yes/no); fill with four marriage.', '(3) Watch the 10-min video "Marriage Rules in Indian Sociology" (NCERT official).', '(4) Re-attempt Diagnostic Question 3 and 6.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
