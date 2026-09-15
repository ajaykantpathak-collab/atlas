import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hist_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hist_ch03_p1: SimDef = {
    id: 'v3_c9_hist_ch03_p1',
    title: 'State and Society up to 1000 CE · Part 1/2',
    subtitle: 'How iron ploughs built kingdoms',
    classLevel: 9, subject: 'history', topic: 'State and Society up to 1000 CE · Part 1/2',
    chapters: ['c9_hist_ch03'],
    nodeIds: ['c9_hist_ch3_1', 'c9_hist_ch3_10', 'c9_hist_ch3_11', 'c9_hist_ch3_12', 'c9_hist_ch3_2', 'c9_hist_ch3_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chronicler of the Vedic transition', intro: 'The people who sang the Rigveda herded cattle in Punjab; their grandchildren ruled farmed kingdoms in the Ganga valley. Trace what iron axes, ploughshares and surplus grain did to an entire society.', goal: 'Compare Early and Later Vedic society — pastoral Punjab to agricultural Ganga doab — and explain how iron technology and surplus drove the rise of janapadas and rigid varna.' },
    discovery: {
        question: 'A Rigvedic verse has one family where the father is a physician, the mother grinds corn and the son is a poet. If rigid caste was always the rule, how is this family possible?',
        options: ['Early Vedic varna was fluid and occupation-based — the hard birth-based four-caste cage only crystallised later, in the Later Vedic period', 'The verse must be mistranslated', 'Caste rules applied only to strangers', 'Poets were exempt from everything'],
        answer: 'Early Vedic varna was fluid and occupation-based — the hard birth-based four-caste cage only crystallised later, in the Later Vedic period',
        hook: 'One technology rewired a whole society: iron axes cleared the Ganga\'s dense forests, iron ploughs raised surpluses, and surplus funded kings, priests and standing armies. Cattle-herding tribes of the Punjab became territorial kingdoms almost by accident of metallurgy.',
    },
    teaching: [
        { title: 'Vedic Society: Early and Later Vedic Periods', text: 'The Vedic Society spans two distinct phases: the Early Vedic (Rigvedic) period (c.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hist_ch3_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the thousand-year transformation: pastoral clans of Sapta Sindhu composing hymns around fire altars → iron-equipped farmers in the Ganga doab → janapada kingdoms with taxes and rigid varna. Then ask why women\'s ritual roles shrank as priestly power grew.',
        labels: ['Vedic Society: Early', 'Family, Women and Social', 'Religion: Yajnas, Nature Worship', 'Education in Early India', 'Political Assemblies: Sabha, Samiti', 'Janapadas and Mahajanapadas: Territorial'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_hist_ch3_10', title: 'Family, Women and Social Mobility in Early India',
          caseStudy: { intro: 'Imagine you are visiting the Brihadisvara Temple in Thanjavur and notice a Chola inscription recording a woman donating land for a lamp — how could a woman own.',
            decisions: [{ prompt: 'What are the two main forms of marriage recognized in Dharmashastras that determine the varna status of offspring, and which one permits.', options: [
                { text: 'The two forms are anuloma (man of higher varna marries woman of lower varna) and', outcome: 'The two forms are anuloma (man of higher varna marries woman of lower varna) and pratiloma (man.' },
                { text: '"early Indian society was rigidly fixed by birth', outcome: 'Not quite — Students often believe "early Indian society was rigidly fixed by birth — no mobility existed until.', reveals: 'early-indian-society-was-rigidly' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_11', title: 'Religion: Yajnas, Nature Worship and Bhakti Tradition',
          caseStudy: { intro: 'Imagine you visit an ancient temple in Tamil Nadu and see a priest performing a fire ritual (homa) while devotees sing passionate hymns to Vishnu outside.',
            decisions: [{ prompt: 'Name the three main phases of religious practice covered in this topic (up to 1000 CE) and give the approximate century range for each.', options: [
                { text: 'The three phases are: 1) Vedic yajnas and nature worship (c', outcome: 'The three phases are: 1) Vedic yajnas and nature worship (c. 1500–500 BCE), 2) Upanishadic/Puranic.' },
                { text: 'Gupta period', outcome: 'Not quite — Students often believe that "Bhakti started only in the medieval period with saints like Kabir and.', reveals: 'bhakti-started-only-in-the' },
                { text: 'Bhakti started only in the medieval period with saints like Kabir and Mirabai', outcome: 'Not quite — Students often believe that "Bhakti started only in the medieval period with saints like Kabir and.', reveals: 'bhakti-started-only-in-the' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_12', title: 'Education in Early India: Gurukula System',
          caseStudy: { intro: 'Imagine you visit a traditional gurukula in Rishikesh today and see students chanting Sanskrit verses while living simply with their guru.',
            decisions: [{ prompt: 'What were the three primary categories of students who were traditionally eligible for admission into a Vedic gurukula based on varna.', options: [
                { text: 'The three eligible varnas were Brahmin, Kshatriya, and Vaishya (the dvija or \'twice-born\'', outcome: 'The three eligible varnas were Brahmin, Kshatriya, and Vaishya (the dvija or \'twice-born\' castes).' },
                { text: 'Shudras or women as eligible', outcome: 'Not quite — Students often believe the gurukula was an egalitarian \'ancient university\' open to all seekers.', reveals: 'the-gurukula-was-an-egalitarian' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_2', title: 'Political Assemblies: Sabha, Samiti and Vidatha',
          caseStudy: { intro: 'Imagine you are at a village *panchayat* meeting today — some elders sit on a raised platform, others stand around, and everyone has a say on a new road or.',
            decisions: [{ prompt: 'Name the three political assemblies mentioned in the Rigveda and state one primary function of each in the Early Vedic period.', options: [
                { text: 'The three assemblies are Sabha, Samiti, and Vidatha', outcome: 'The three assemblies are Sabha, Samiti, and Vidatha. Samiti: general tribal assembly for war/peace.' },
                { text: 'Sabha elected the king', outcome: 'Not quite — Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic.', reveals: 'sabha-and-samiti-are-simply' },
                { text: 'upper house', outcome: 'Not quite — Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic.', reveals: 'sabha-and-samiti-are-simply' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_3', title: 'Janapadas and Mahajanapadas: Territorial States',
          caseStudy: { intro: 'Imagine a map of India in 600 BCE. Instead of modern states, you see sixteen major political units — the Mahajanapadas.',
            decisions: [{ prompt: 'Define "janapada" and "mahajanapada" and explain the difference between them.', options: [
                { text: 'A janapada (jana = people, pada = foothold) was an early territorial settlement of a', outcome: 'A janapada (jana = people, pada = foothold) was an early territorial settlement of a tribe, the.' },
                { text: 'they are the same', outcome: 'Not quite — Students think all Mahajanapadas were monarchies and that ancient India had only kingdoms.', reveals: 'all-mahajanapadas-were-monarchies-and' },
                { text: 'all Mahajanapadas were monarchies and that ancient India had only kingdoms', outcome: 'Not quite — Students think all Mahajanapadas were monarchies and that ancient India had only kingdoms.', reveals: 'all-mahajanapadas-were-monarchies-and' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A quiz question asks what changed between the Rigvedic and Later Vedic periods. A contestant answers: \'Nothing much — same people, same rigid four-caste system from day one, just new addresses.\'',
            decisions: [{ prompt: 'What did the transition actually involve?', options: [
                { text: 'A society remade: eastward migration from the Punjab to the Ganga doab, iron axes and ploughshares turning forest into farmland, surplus funding chiefs who became territorial kings — and varna hardening from a fluid occupational order into birth-based hierarchy. Even the Rigveda\'s caste verse is a late hymn, not day-one reality.', outcome: 'This traces the real causal chain — iron → surplus → janapadas → stratification — instead of projecting a later rigidity backward.' },
                { text: 'The contestant is right — the Purusha Sukta is in the Rigveda, so the rigid caste order existed from the start.', outcome: 'The Purusha Sukta belongs to the late tenth mandala; earlier hymns show occupational fluidity — the poet\'s father a physician, his mother grinding corn.', reveals: 'caste-was-always-fixed' },
                { text: 'The only real change was religious — bigger sacrifices for bigger gods; economy and society stayed pastoral.', outcome: 'Ritual elaboration rode on a material shift: cattle camps became ploughed villages, and tribal janas became taxed territorial kingdoms.', reveals: 'only-religion-changed' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_3', title: 'The bigger picture',
          caseStudy: { intro: 'From jana (tribe) to janapada (territory) is the story of iron + surplus: cleared forests became fields, fields fed chiefs and priests, and flexible social ranks hardened into birth-based varna.',
            decisions: [{ prompt: 'What comes next? State and Society up to 1000 CE · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — State and Society up to 1000 CE · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hist_ch3_1', difficulty: 'standard',
          question: 'The Vedic Society spans two distinct phases: the Early Vedic (Rigvedic) period.',
          hint: 'Revisit c6_history_ch04_006 (Harappan decline) and the concept of "Dark Age".',
          misconception: 'Students believe the four varnas (Brahmin, Kshatriya, Vaishya, Shudra) existed as rigid, birth-based castes from the.',
          parts: [
                { id: 'a', prompt: 'Compare the role and status of women in the Early Vedic period (evidence: Rigvedic hymns by female rishis, swayamvara references) with the Later Vedic period.', answer: 'Change 1: Female rishis (Lopamudra, Ghosha) disappear',
                  options: ['Change 1: Female rishis (Lopamudra, Ghosha) disappear', 'women lost status'],
                  hint: 'Revisit c6_history_ch04_006 (Harappan decline) and the concept of "Dark Age" / Chalcolithic.',
                  misconception: 'Students believe the four varnas (Brahmin, Kshatriya, Vaishya, Shudra) existed as rigid, birth-based castes from the Rigveda itself.' }
          ],
            remediations: { 'the-four-varnas-brahmin': { steps: ['Have the student read Rigveda 9.112.3 aloud and identify the three occupations in one family.', 'Compare with *Shatapatha Brahmana* 1.1.4.12 where *shudra* is barred from *upayana*.', 'Plot both passages on a timeline (Early vs Later Vedic) using the internal chronology of the Vedic corpus (mandala 1–9.', 'Ask the student to rewrite their earlier answer distinguishing *varna* as "colour/class" in Early Vedic from *varna*.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_10', difficulty: 'standard',
          question: 'Family, Women and Social Mobility in Early India (c. 600 BCE – 1000 CE).',
          hint: 'If stuck, revisit c9_hist_ch3_9 (Social Categories: Varna and Jati System) and focus.',
          misconception: 'Students often believe "early Indian society was rigidly fixed by birth — no mobility existed until modern times." They.',
          parts: [
                { id: 'a', prompt: 'What are the two main forms of marriage recognized in Dharmashastras that determine the varna status of offspring, and which one permits a higher-varna man.', answer: 'The two forms are anuloma (man of higher varna marries woman of lower varna) and',
                  options: ['The two forms are anuloma (man of higher varna marries woman of lower varna) and', '"early Indian society was rigidly fixed by birth'],
                  hint: 'If stuck, revisit c9_hist_ch3_9 (Social Categories: Varna and Jati System) and focus on the section.',
                  misconception: 'Students often believe "early Indian society was rigidly fixed by birth — no mobility existed until modern times." They cite the Purusha.' },
                { id: 'b', prompt: 'Compare the role of Buddhist sangha and Bhakti movements in enabling social mobility for women and lower varnas in early India.', answer: 'Buddhist sangha and Bhakti movements offered mobility through *renunciation* and',
                  options: ['Buddhist sangha and Bhakti movements offered mobility through *renunciation* and', 'religious mobility', '"early Indian society was rigidly fixed by birth'],
                  hint: 'If stuck, revisit c9_hist_ch3_9 (Social Categories: Varna and Jati System) and focus on the section.',
                  misconception: 'Students often believe "early Indian society was rigidly fixed by birth — no mobility existed until modern times." They cite the Purusha.' }
          ],
            remediations: { 'early-indian-society-was-rigidly': { steps: ['Re-read the Nasik inscription of Gautami Balashri (c. 2nd century CE) — note she calls herself "one who delights in the.', 'Compare with Manusmriti 9.11 ("women have no right to property") — ask: which reflects lived reality?', 'Study the Mandasor silk-weavers\' inscription (Gupta period) — they collectively funded a sun temple, gained royal.', 'Write a 3-sentence explanation: "Texts prescribe; inscriptions describe.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "early Indian society was rigidly fixed by birth — no mobility existed until modern times." They.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Arthashastra\'s regulations on women\'s property and marriage show the Mauryan state actively protected women\'s rights." Use evidence.', answer: 'The claim is overstated',
                  options: ['The claim is overstated', '"early Indian society was rigidly fixed by birth'],
                  hint: 'If stuck, revisit c9_hist_ch3_9 (Social Categories: Varna and Jati System) and focus on the section.',
                  misconception: 'Students often believe "early Indian society was rigidly fixed by birth — no mobility existed until modern times." They cite the Purusha.' },
                { id: 'b', prompt: 'Construct a historical argument: "Social mobility in early India was more achievable through economic organizations (shrenis) than through religious.', answer: 'A strong argument: (1) Shrenis (guilds) of merchants/artisans (e.g., weavers,',
                  options: ['A strong argument: (1) Shrenis (guilds) of merchants/artisans (e.g., weavers,', '"early Indian society was rigidly fixed by birth'],
                  hint: 'If stuck, revisit c9_hist_ch3_9 (Social Categories: Varna and Jati System) and focus on the section.',
                  misconception: 'Students often believe "early Indian society was rigidly fixed by birth — no mobility existed until modern times." They cite the Purusha.' }
          ],
            remediations: { 'early-indian-society-was-rigidly': { steps: ['Re-read the Nasik inscription of Gautami Balashri (c. 2nd century CE) — note she calls herself "one who delights in the.', 'Compare with Manusmriti 9.11 ("women have no right to property") — ask: which reflects lived reality?', 'Study the Mandasor silk-weavers\' inscription (Gupta period) — they collectively funded a sun temple, gained royal.', 'Write a 3-sentence explanation: "Texts prescribe; inscriptions describe.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_11', difficulty: 'standard',
          question: 'This topic examines the evolution of religious practices in the Indian.',
          hint: 'Revisit c9_hist_ch3_1 (Vedic Society) for yajna details and c9_hist_ch3_9 (Social.',
          misconception: 'Students often believe that "Bhakti started only in the medieval period with saints like Kabir and Mirabai" and that.',
          parts: [
                { id: 'a', prompt: 'Name the three main phases of religious practice covered in this topic (up to 1000 CE) and give the approximate century range for each.', answer: 'The three phases are: 1) Vedic yajnas and nature worship (c',
                  options: ['The three phases are: 1) Vedic yajnas and nature worship (c', 'Gupta period', 'Bhakti started only in the medieval period with saints like Kabir and Mirabai', 'Vedic yajnas disappeared after the Upanishads'],
                  hint: 'Revisit c9_hist_ch3_1 (Vedic Society) for yajna details and c9_hist_ch3_9 (Social Categories) for.',
                  misconception: 'Students often believe that "Bhakti started only in the medieval period with saints like Kabir and Mirabai" and that "Vedic yajnas.' },
                { id: 'b', prompt: 'You are given two short texts: (A) a Rigvedic hymn praising Indra for releasing waters, and (B) a poem by Andal (Alvar) expressing longing for union with.', answer: 'Text A is nature worship (Indra as a cosmic power controlling rain)',
                  options: ['Text A is nature worship (Indra as a cosmic power controlling rain)', 'prayer', 'Bhakti started only in the medieval period with saints like Kabir and Mirabai', 'Vedic yajnas disappeared after the Upanishads'],
                  hint: 'Revisit c9_hist_ch3_1 (Vedic Society) for yajna details and c9_hist_ch3_9 (Social Categories) for.',
                  misconception: 'Students often believe that "Bhakti started only in the medieval period with saints like Kabir and Mirabai" and that "Vedic yajnas.' }
          ],
            remediations: { 'bhakti-started-only-in-the': { steps: ['If the student holds this misconception, have them create a two-column chart: left column "Vedic Ritual (c.', '1000 BCE–1000 CE)" with sub-rows for "Rigvedic Yajna," "Royal Ashvamedha (Gupta/Chola)," "Brahmin Priest Role"; right.', '600–1000 CE)" with sub-rows for "Alvar/Nayanar Poems," "Temple Worship," "Inclusivity (caste/gender)." Use Chola.', 'This visual comparison forces recognition of coexistence and continuity.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_12', difficulty: 'standard',
          question: 'The Gurukula system was a residential mode of education in early India (c.',
          hint: 'Revisit c9_hist_ch3_9 (Social Categories: Varna and Jati System) and review the section.',
          misconception: 'Students often believe the gurukula was an egalitarian \'ancient university\' open to all seekers of knowledge, similar.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Gurukula system was a residential mode of education in early India (c',
                  options: ['The Gurukula system was a residential mode of education in early India (c', 'The Vedic Society spans two distinct phases: the Early Vedic (Rigvedic) period (c', 'Family, Women and Social Mobility in Early India (c', 'This topic examines the evolution of religious practices in the Indian subcontinent from c'],
                  hint: 'Revisit c9_hist_ch3_9 (Social Categories: Varna and Jati System) and review the section.',
                  misconception: 'Students often believe the gurukula was an egalitarian \'ancient university\' open to all seekers of knowledge, similar to modern residential.' }
          ],
            remediations: { 'the-gurukula-was-an-egalitarian': { steps: ['Have the student read Gautama Dharmasutra 1.1.1–5 (translated) listing who may study the Veda.', 'Contrast with Vinaya Pitaka rules for bhikkhu/bhikkhuni ordination (no varna bar).', 'Map the social groups excluded from gurukula but included in vihara.', 'Ask: "If you were a Shudra boy in 500 CE, where could you get educated?" This forces confrontation with the textual.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_2', difficulty: 'standard',
          question: 'The Sabha, Samiti, and Vidatha were the three principal political assemblies.',
          hint: 'Revisit c9_hist_ch3_1: focus on the shift from *go* (cattle) economy to *kshetra* (field).',
          misconception: 'Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic parliament, projecting the.',
          parts: [
                { id: 'a', prompt: 'Name the three political assemblies mentioned in the Rigveda and state one primary function of each in the Early Vedic period.', answer: 'The three assemblies are Sabha, Samiti, and Vidatha',
                  options: ['The three assemblies are Sabha, Samiti, and Vidatha', 'Sabha elected the king', 'upper house', 'lower house'],
                  hint: 'Revisit c9_hist_ch3_1: focus on the shift from *go* (cattle) economy to *kshetra* (field) economy.',
                  misconception: 'Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic parliament, projecting the modern Indian.' },
                { id: 'b', prompt: 'A Later Vedic text describes the *rajan* performing the *Rajasuya* sacrifice with the help of *ratnins* (jewels/officers) including the *Senani*, *Suta*, and.', answer: 'The *ratnins* are institutionalised royal officers replacing the collective',
                  options: ['The *ratnins* are institutionalised royal officers replacing the collective', 'upper house', 'lower house'],
                  hint: 'Revisit c9_hist_ch3_1: focus on the shift from *go* (cattle) economy to *kshetra* (field) economy.',
                  misconception: 'Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic parliament, projecting the modern Indian.' },
                { id: 'c', prompt: 'Compare the Vidatha of the Rigveda with the *gana-sangha* assemblies of the 6th century BCE (e.g., Vajji, Malla).', answer: 'Similarities: both involve collective deliberation beyond a single ruler',
                  options: ['Similarities: both involve collective deliberation beyond a single ruler', 'upper house', 'lower house'],
                  hint: 'Revisit c9_hist_ch3_1: focus on the shift from *go* (cattle) economy to *kshetra* (field) economy.',
                  misconception: 'Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic parliament, projecting the modern Indian.' }
          ],
            remediations: { 'sabha-and-samiti-are-simply': { steps: ['Read Rigveda 1.167 (Samiti) and 8.4 (Sabha) in translation — note who speaks, who decides, what the occasion is.', 'Read Aitareya Brahmana 8.15 (Rajasuya *ratnins*) — map each *ratnin* to a lost assembly function.', 'Create a two-column table: "Early Vedic Assembly Function" vs "Later Vedic Royal Officer" — fill it using the texts.', 'Explain orally to a peer why "parliament" is an anachronism, using the table as evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_3', difficulty: 'standard',
          question: 'Janapadas and Mahajanapadas were the territorial states of ancient India (c.',
          hint: 'Revisit c9_hist_ch3_1 (Vedic Society) for the tribal background and c9_hist_ch3_2 (Vedic.',
          misconception: 'Students think all Mahajanapadas were monarchies and that ancient India had only kingdoms.',
          parts: [
                { id: 'a', prompt: 'List six of the sixteen Mahajanapadas and classify each as a monarchy or republic.', answer: 'Six Mahajanapadas: (1) Magadha',
                  options: ['Six Mahajanapadas: (1) Magadha', 'all Mahajanapadas were monarchies and that ancient India had only kingdoms'],
                  hint: 'Revisit c9_hist_ch3_1 (Vedic Society) for the tribal background and c9_hist_ch3_2 (Vedic Political.',
                  misconception: 'Students think all Mahajanapadas were monarchies and that ancient India had only kingdoms.' },
                { id: 'b', prompt: 'What three factors drove the formation of Mahajanapadas from earlier tribal organizations?', answer: 'Three factors: (1) Iron tools',
                  options: ['Three factors: (1) Iron tools', 'kings conquered territory', 'all Mahajanapadas were monarchies and that ancient India had only kingdoms'],
                  hint: 'Revisit c9_hist_ch3_1 (Vedic Society) for the tribal background and c9_hist_ch3_2 (Vedic Political.',
                  misconception: 'Students think all Mahajanapadas were monarchies and that ancient India had only kingdoms.' }
          ],
            remediations: { 'all-mahajanapadas-were-monarchies-and': { steps: ['Show a map of the sixteen Mahajanapadas.', 'Color-code: monarchies in one color, republics in another.', 'Ask the student to identify the pattern: where are the republics located?', '(Mainly north of the Ganges.) 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
