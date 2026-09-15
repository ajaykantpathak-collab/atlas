import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch03_p1: SimDef = {
    id: 'v3_c12_soc_ch03_p1',
    title: 'Social Institutions: Continuity and Change · Part 1/2',
    subtitle: 'A ladder where every rung exists only relative to the others',
    classLevel: 12, subject: 'sociology', topic: 'Social Institutions: Continuity and Change · Part 1/2',
    chapters: ['c12_soc_ch03'],
    nodeIds: ['c12_soc_cbse_03_001', 'c12_soc_cbse_03_002', 'c12_soc_cbse_03_003', 'c12_soc_cbse_03_004', 'c12_soc_cbse_03_005', 'c12_soc_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social structure analyst', intro: 'At the wedding, the priests, caterers and guests follow an invisible rulebook nobody wrote down — sociology\'s job is to read it.', goal: 'Explain the varna-jati distinction and the purity-pollution logic that makes caste both separating and hierarchical.' },
    discovery: {
        question: 'Strip away purity and pollution but keep fixed marriages and inherited occupations — do you still have caste, or something else entirely?',
        options: ['Not caste — without purity-pollution there\'s no moral ladder, just separate guild-like groups; ranking by ritual distance is what makes the system one', 'Yes — caste is only about who marries whom', 'Yes — hereditary jobs alone define it', 'No — because caste is really about class'],
        answer: 'Not caste — without purity-pollution there\'s no moral ladder, just separate guild-like groups; ranking by ritual distance is what makes the system one',
        hook: 'Varna is not the \'real\' caste — it\'s a four-box scriptural ideal. Jati, the thousands of actual birth-groups people marry and eat by, is the lived institution; confusing the two flattens the whole system.',
    },
    teaching: [
        { title: 'Caste System: Varna and Jati, the Principles of Purity and Pollution', text: 'The caste system is a hereditary, endogamous, and hierarchical social institution unique to the Indian subcontinent, structured around the twin principles of **varna** (a four-fold all-India.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Dissect the rulebook — birth, endogamy, food rules, hereditary work — and figure out how one institution can separate communities into boxes yet rank them on a single ladder.',
        labels: ['Caste System: Varna', 'Caste as a System', 'Caste Councils (Jati Panchayats)', 'Caste in Contemporary India', 'The Tribe-Caste Continuum', 'Tribal Society: Definition, Classification'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_001', title: 'Caste System: Varna and Jati, the Principles of Purity and Pollution',
          caseStudy: { intro: 'Imagine you are at a large Indian wedding where the catering staff, the priests, and the guests all belong to different communities that rarely eat together.',
            decisions: [{ prompt: 'State the four varna categories in their traditional hierarchical order and name the fifth category excluded from the varna scheme.', options: [
                { text: 'Brahmana (priests/teachers) → Kshatriya (warriors/rulers) → Vaishya (merchants/producers)', outcome: 'Brahmana (priests/teachers) → Kshatriya (warriors/rulers) → Vaishya (merchants/producers) → Shudra.' },
                { text: 'There are four castes in India', outcome: 'Not quite — Students often equate **varna** with **caste** and **jati** with **sub-caste**, assuming varna.', reveals: 'students-often-equate-varna-with' },
                { text: 'Jati is just a sub-caste of varna', outcome: 'Not quite — Students often equate **varna** with **caste** and **jati** with **sub-caste**, assuming varna.', reveals: 'students-often-equate-varna-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_002', title: 'Caste as a System of Stratification: Hierarchy, Hereditary Occupation and Endogamy',
          caseStudy: { intro: 'Imagine you are at a village wedding where the bride and groom are from the same caste, the priest chants Sanskrit verses, and the food is cooked only by.',
            decisions: [{ prompt: 'State the three core features that define caste as a system of stratification according to the NCERT textbook.', options: [
                { text: 'The three core features are: (1) hierarchy based on purity-pollution, (2) hereditary', outcome: 'The three core features are: (1) hierarchy based on purity-pollution, (2) hereditary occupation.' },
                { text: 'untouchability', outcome: 'Not quite — Students often think “caste is just like class but older” — they equate hierarchy with economic.', reveals: 'caste-is-just-like-class' },
                { text: 'caste is just like class but older', outcome: 'Not quite — Students often think “caste is just like class but older” — they equate hierarchy with economic.', reveals: 'caste-is-just-like-class' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_003', title: 'Caste Councils (Jati Panchayats) and the Regulation of Social Life',
          caseStudy: { intro: 'Imagine a young couple in a Rajasthan village wants to marry across jati lines — the boy is a Jat, the girl a Meghwal.',
            decisions: [{ prompt: 'What is the primary difference between a jati panchayat and a Gram Panchayat established under the 73rd Constitutional Amendment?', options: [
                { text: 'A jati panchayat is an informal, caste-based body that enforces social norms (endogamy,', outcome: 'A jati panchayat is an informal, caste-based body that enforces social norms (endogamy, purity.' },
                { text: 'both are the same', outcome: 'Not quite — Students often confuse **jati panchayats** (caste councils enforcing social norms) with **khap.', reveals: 'students-often-confuse-jati-panchayats' },
                { text: 'jati panchayat is the legal one', outcome: 'Not quite — Students often confuse **jati panchayats** (caste councils enforcing social norms) with **khap.', reveals: 'students-often-confuse-jati-panchayats' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_005', title: 'The Tribe-Caste Continuum and the Distinctiveness of Tribal Society',
          caseStudy: { intro: 'Imagine you read a news report about the Gond tribe in Madhya Pradesh demanding forest rights under the Forest Rights Act, while another article describes.',
            decisions: [{ prompt: 'What were the two main positions in the 1960s scholarly debate on the tribe-caste relationship?', options: [
                { text: 'The two positions were: (1) the continuum view — tribes are not fundamentally different', outcome: 'The two positions were: (1) the continuum view — tribes are not fundamentally different from.' },
                { text: 'tribes are primitive versions of castes', outcome: 'Not quite — Students commonly believe "tribes are primitive, isolated communities untouched by civilisation.', reveals: 'students-commonly-believe-tribes-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A sociology student watching her own family insists on \'same-caste matches only\' asks why the elders treat inter-caste marriage as a threat to \'everything\', not just a preference.',
            decisions: [{ prompt: 'Which pillar of the caste system explains the panic?', options: [
                { text: 'Endogamy is the keystone — caste-bound marriage keeps the purity-pollution hierarchy and the birth-to-occupation link intact; mixed marriage produces children whose ritual status and inherited role can\'t be fixed, which is why a \'preference\' polices itself like a load-bearing wall.', outcome: 'The chapter\'s architecture: the three pillars interlock — endogamy doesn\'t preserve \'culture,\' it preserves the closed boundaries the whole stratification system needs to reproduce.' },
                { text: 'It\'s just hierarchy — elders want to protect status, and marriage is where status shows.', outcome: 'Hierarchy names the ranking, not the mechanism that keeps it — the ranking survives only because endogamy seals it; status anxiety is the symptom, boundary-closure is the load.', reveals: 'hierarchy-alone-explains-it' },
                { text: 'It\'s occupational — they fear losing hereditary trades more than matches.', outcome: 'Occupation is a pillar, but the elders aren\'t guarding a trade — they\'re guarding the boundary; endogamy is the \'key\' precisely because it\'s what keeps both rank and occupation assignable by birth.', reveals: 'marriage-is-about-jobs' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now see caste as a system where separation creates the hierarchy — and where ritual status keeps converting into land, capital and office.',
            decisions: [{ prompt: 'What comes next? Social Institutions: Continuity and Change · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Social Institutions: Continuity and Change · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_001', difficulty: 'standard',
          question: 'The caste system is a hereditary, endogamous, and hierarchical social.',
          hint: 'If stuck, revisit **c11_soc_cbse_10_005** (Ghurye’s six features) and.',
          misconception: 'Students often equate **varna** with **caste** and **jati** with **sub-caste**, assuming varna is the “real” caste and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The caste system is a hereditary, endogamous, and hierarchical social institution unique',
                  options: ['The caste system is a hereditary, endogamous, and hierarchical social institution unique', 'Caste as a system of stratification is a hereditary, endogamous, and hierarchical social', 'Jati Panchayats (caste councils) are traditional, informal governance bodies composed of', 'Caste in contemporary India refers to the persistence of the traditional varna-jati'],
                  hint: 'If stuck, revisit **c11_soc_cbse_10_005** (Ghurye’s six features) and **c11_soc_cbse_02_003**.',
                  misconception: 'Students often equate **varna** with **caste** and **jati** with **sub-caste**, assuming varna is the “real” caste and jati a minor.' }
          ],
            remediations: { 'students-often-equate-varna-with': { steps: ['36-39 focusing on the paragraph “The precise relationship between varna and jati…”.', 'Create a two-column table: **Varna** (textual, 4, pan-India, static) vs.', '**Jati** (empirical, 1000s, regional, dynamic).', 'Fill with 3 differences each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate **varna** with **caste** and **jati** with **sub-caste**, assuming varna is the “real” caste and.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “Purity and pollution are merely religious beliefs; they have no material consequences for caste hierarchy today.” Use the NCERT link.', answer: 'The statement is false',
                  options: ['The statement is false', 'There are four castes in India', 'Jati is just a sub-caste of varna'],
                  hint: 'If stuck, revisit **c11_soc_cbse_10_005** (Ghurye’s six features) and **c11_soc_cbse_02_003**.',
                  misconception: 'Students often equate **varna** with **caste** and **jati** with **sub-caste**, assuming varna is the “real” caste and jati a minor.' }
          ],
            remediations: { 'students-often-equate-varna-with': { steps: ['36-39 focusing on the paragraph “The precise relationship between varna and jati…”.', 'Create a two-column table: **Varna** (textual, 4, pan-India, static) vs.', '**Jati** (empirical, 1000s, regional, dynamic).', 'Fill with 3 differences each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_002', difficulty: 'standard',
          question: 'Caste as a system of stratification is a hereditary, endogamous, and.',
          hint: 'Revisit c11_soc_cbse_02_003 (stratification systems) and c11_soc_cbse_03_004 (marriage.',
          misconception: 'Students often think “caste is just like class but older” — they equate hierarchy with economic inequality and assume.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why endogamy is considered the “key” to maintaining the caste system, using the concepts of hierarchy and hereditary occupation.', answer: 'Endogamy prevents mixing of castes',
                  options: ['Endogamy prevents mixing of castes', 'endogamy preserves culture', 'caste is just like class but older', 'hereditary occupation is merely a division of labour'],
                  hint: 'Revisit c11_soc_cbse_02_003 (stratification systems) and c11_soc_cbse_03_004 (marriage rules).',
                  misconception: 'Students often think “caste is just like class but older” — they equate hierarchy with economic inequality and assume hereditary occupation.' },
                { id: 'b', prompt: 'Compare how hierarchy operates in the caste system versus in a class system.', answer: 'Similarities: both rank groups unequally and affect life chances',
                  options: ['Similarities: both rank groups unequally and affect life chances', 'both are based on money', 'caste is just like class but older', 'hereditary occupation is merely a division of labour'],
                  hint: 'Revisit c11_soc_cbse_02_003 (stratification systems) and c11_soc_cbse_03_004 (marriage rules).',
                  misconception: 'Students often think “caste is just like class but older” — they equate hierarchy with economic inequality and assume hereditary occupation.' }
          ],
            remediations: { 'caste-is-just-like-class': { steps: ['If a student conflates caste with class, do this 3-step remediation: (1) Have them re-read the NCERT paragraph.', '(2) Give a mini-case: “A rich Dalit and a poor Brahmin — who has higher ritual status?” Force them to answer using.', '(3) Ask them to diagram how endogamy *causes* hereditary occupation to persist: “If a Chamar becomes a doctor, why does.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_003', difficulty: 'standard',
          question: 'Jati Panchayats (caste councils) are traditional, informal governance bodies.',
          hint: 'If stuck, revisit Node c12_soc_cbse_03_001\'s "defining features of caste" section and.',
          misconception: 'Students often confuse **jati panchayats** (caste councils enforcing social norms) with **khap panchayats**.',
          parts: [
                { id: 'a', prompt: 'In a village, a Dalit family refuses to perform the traditional "unclean" occupation (manual scavenging) assigned to their jati.', answer: 'The Dalit panchayat complies',
                  options: ['The Dalit panchayat complies', 'the panchayat agrees'],
                  hint: 'If stuck, revisit Node c12_soc_cbse_03_001\'s "defining features of caste" section and Node.',
                  misconception: 'Students often confuse **jati panchayats** (caste councils enforcing social norms) with **khap panchayats** (clan/council bodies in North.' },
                { id: 'b', prompt: 'Compare the sanctions used by jati panchayats (boycott, fine, excommunication) with the formal legal penalties available under the Protection of Civil Rights.', answer: 'Jati panchayat sanctions are socially existential',
                  options: ['Jati panchayat sanctions are socially existential', 'legal penalties are stronger', 'social death'],
                  hint: 'If stuck, revisit Node c12_soc_cbse_03_001\'s "defining features of caste" section and Node.',
                  misconception: 'Students often confuse **jati panchayats** (caste councils enforcing social norms) with **khap panchayats** (clan/council bodies in North.' }
          ],
            remediations: { 'students-often-confuse-jati-panchayats': { steps: ['If the student conflates jati/khap/gram panchayats: (1) Have them create a three-column table: *Body | Composition |.', 'Fill it using NCERT Chapter 3 (jati panchayat), Class 11 Sociology Node c11_soc_cbse_02_006 (social control), and Class.', '(2) Give a 5-minute timed exercise: "Identify the body in each scenario: (a) fines a family for interdining, (b) passes.', 'If still wrong, revisit Node c11_soc_cbse_03_001 (Social Institutions: Definition) to re-ground the concept.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_004', difficulty: 'standard',
          question: 'Caste in contemporary India refers to the persistence of the traditional.',
          hint: 'Revisit c12_soc_cbse_03_001 and c12_soc_cbse_03_002 — specifically the six defining.',
          misconception: 'Students often think \'caste is weakening everywhere\' because they see intercaste dining in colleges or upper-caste.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Caste in contemporary India refers to the persistence of the traditional varna-jati',
                  options: ['Caste in contemporary India refers to the persistence of the traditional varna-jati', 'The caste system is a hereditary, endogamous, and hierarchical social institution unique', 'Caste as a system of stratification is a hereditary, endogamous, and hierarchical social', 'Jati Panchayats (caste councils) are traditional, informal governance bodies composed of'],
                  hint: 'Revisit c12_soc_cbse_03_001 and c12_soc_cbse_03_002 — specifically the six defining features.',
                  misconception: 'Students often think \'caste is weakening everywhere\' because they see intercaste dining in colleges or upper-caste peers saying \'caste.' }
          ],
            remediations: { 'caste-is-weakening-everywhere-because': { steps: ['If a student conflates ritual/secular or thinks caste is disappearing: (1) Have them re-read the NCERT paragraphs.', '(2) Ask them to list 5 marriage ads from a newspaper matrimonial column and code each for caste preference — this makes.', '(3) Assign the case study of the 1980s rise of Dalit Panthers and Bahujan Samaj Party to show caste becoming *more*.', '(4) Re-diagnose with Question 2 above.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_005', difficulty: 'standard',
          question: 'The tribe-caste continuum refers to the sociological debate about whether.',
          hint: 'Revisit c12_soc_cbse_03_001 (caste principles) and c11_soc_cbse_02_003 (stratification.',
          misconception: 'Students commonly believe "tribes are primitive, isolated communities untouched by civilisation until recently" — the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The tribe-caste continuum refers to the sociological debate about whether tribal',
                  options: ['The tribe-caste continuum refers to the sociological debate about whether tribal', 'The caste system is a hereditary, endogamous, and hierarchical social institution unique', 'Caste as a system of stratification is a hereditary, endogamous, and hierarchical social', 'Jati Panchayats (caste councils) are traditional, informal governance bodies composed of'],
                  hint: 'Revisit c12_soc_cbse_03_001 (caste principles) and c11_soc_cbse_02_003 (stratification systems).',
                  misconception: 'Students commonly believe "tribes are primitive, isolated communities untouched by civilisation until recently" — the exact view the NCERT.' }
          ],
            remediations: { 'students-commonly-believe-tribes-are': { steps: ['If a student holds the "primitive isolation" misconception: Step 1 — Have them list every economic activity mentioned.', 'Step 2 — Ask: "Which of these require contact with non-tribal markets/polities?" (All).', 'Step 3 — Show the 1881 Census map of tribal concentrations overlapping mineral belts — ask why British built railways.', 'Step 4 — Re-read Xaxa: "middle classes are a consequence of modern education...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_006', difficulty: 'standard',
          question: 'Tribal societies in India are distinct communities characterised by their.',
          hint: 'Revisit c11_soc_cbse_03_001 (Social Institutions definition) and c11_soc_cbse_07_008.',
          misconception: 'Students consistently confuse "tribe" as a sociological category with "Scheduled Tribe" as a Constitutional-legal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Tribal societies in India are distinct communities characterised by their historical',
                  options: ['Tribal societies in India are distinct communities characterised by their historical', 'The caste system is a hereditary, endogamous, and hierarchical social institution unique', 'Caste as a system of stratification is a hereditary, endogamous, and hierarchical social', 'Jati Panchayats (caste councils) are traditional, informal governance bodies composed of'],
                  hint: 'Revisit c11_soc_cbse_03_001 (Social Institutions definition) and c11_soc_cbse_07_008 (Rural Society.',
                  misconception: 'Students consistently confuse "tribe" as a sociological category with "Scheduled Tribe" as a Constitutional-legal category.' }
          ],
            remediations: { 'students-consistently-confuse-tribe-as': { steps: ['Have the student create a two-column table: "Sociological Concept of Tribe" (left) vs.', 'Populate left column from NCERT: permanent traits (region, language, physical, ecology), acquired traits (livelihood.', 'Populate right column: Article 342, Presidential Order, Lokur Committee criteria (primitive traits, distinctive.', 'Ask: "Can a community be sociologically tribal but not Scheduled?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
