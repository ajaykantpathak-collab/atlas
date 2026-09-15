import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch03_p2: SimDef = {
    id: 'v3_c12_hist_ch03_p2',
    title: 'Kinship, Caste and Class (Early Societies) · Part 2/2',
    subtitle: '47 years, 1,200 manuscripts — and no original',
    classLevel: 12, subject: 'history', topic: 'Kinship, Caste and Class (Early Societies) · Part 2/2',
    chapters: ['c12_hist_ch03'],
    nodeIds: ['c12_hist_cbse_03_007', 'c12_hist_cbse_03_008', 'c12_hist_cbse_03_009', 'c12_hist_cbse_03_010', 'c12_hist_cbse_03_011', 'c12_hist_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Textual historian', intro: 'The world\'s longest epic existed in a thousand versions. One team decided to map them all.', goal: 'Grasp the BORI Critical Edition\'s method and what its variations reveal about the Mahabharata as living tradition.' },
    discovery: {
        question: 'Over 1,200 Mahabharata manuscripts, gathered over 47 years — and more than half the Critical Edition\'s 13,000 pages are the variations. What did Pune\'s scholars actually prove?',
        options: ['That there is no single original — the epic is a living, multi-vocal tradition; the common text is a scholarly reconstruction and the variations ARE the social history', 'That one true version exists', 'Vyasa\'s manuscript survived', 'Footnotes don\'t matter'],
        answer: 'That there is no single original — the epic is a living, multi-vocal tradition; the common text is a scholarly reconstruction and the variations ARE the social history',
        hook: 'The apparatus isn\'t a failure — it\'s the data: a verse common across regions is likely older; a southern variant with a local deity is cultural negotiation, not corruption. The Critical Edition doesn\'t crown a winner; it maps a thousand-year conversation.',
    },
    teaching: [
        { title: 'The Dharmasutras and Dharmashastras: Prescriptive Texts for Social Conduct', text: 'The Dharmasutras (c. 500–200 BCE) and Dharmashastras (c. 200 BCE–200 CE onwards) are Sanskrit normative texts composed by Brahmanas that prescribe rules for social conduct, including varna-based.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_03_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Collate like a philologist: weigh manuscript consensus against regional voice, decode why variations fill the appendices, and reframe the epic as evidence of India\'s plural pasts.',
        labels: ['The Dharmasutras and Dharmashastras', 'Strategies of Kshatriya Assertion', 'Mixed Castes or Jatis', 'Beyond the Four Varnas', 'The Bhagavad Gita\'s Position', 'Gender in the Mahabharata'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_03_010', title: 'Beyond the Four Varnas: Satvakas, Chandalas and Outcaste Groups',
          caseStudy: { intro: 'Imagine visiting an ancient village site where archaeologists found separate burial grounds outside the main settlement — who lived there and why?',
            decisions: [{ prompt: 'According to the Manusmriti, which of the following was NOT a prescribed duty or restriction for chandalas?', options: [
                { text: 'Correct answer: C) Serving as village priests', outcome: 'Correct answer: C) Serving as village priests. The Manusmriti assigned chandalas "polluting" tasks.' },
                { text: 'chandalas = untouchables = Dalits today', outcome: 'Not quite — Students often think "chandalas = untouchables = Dalits today" and assume the category was static.', reveals: 'chandalas-untouchables-dalits-today-and' },
                { text: 'A or B', outcome: 'Not quite — Students often think "chandalas = untouchables = Dalits today" and assume the category was static.', reveals: 'chandalas-untouchables-dalits-today-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_03_012', title: 'Gender in the Mahabharata: Patriliny, Stridhana and Women\'s Property',
          caseStudy: { intro: 'Imagine you\'re at a family wedding and hear elders discussing "streedhan" — the gold, cash, and gifts given to the bride.',
            decisions: [{ prompt: 'What does the term *patriliny* mean in the context of early Indian societies, and which epic narrative reinforced this ideal?', options: [
                { text: 'Patriliny means tracing descent and inheritance from father to son, grandson, and so on', outcome: 'Patriliny means tracing descent and inheritance from father to son, grandson, and so on.' },
                { text: 'descent through mother', outcome: 'Not quite — Students often believe **stridhana = dowry** and that **women had *no* property rights in ancient.', reveals: 'stridhana-dowry-and-that-women' },
                { text: 'equal inheritance for daughters', outcome: 'Not quite — Students often believe **stridhana = dowry** and that **women had *no* property rights in ancient.', reveals: 'stridhana-dowry-and-that-women' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate preparing a seminar slide writes: \'Vyasa composed the Mahabharata; the Critical Edition has finally restored his original text.\'',
            decisions: [{ prompt: 'How does the chapter\'s account of the epic\'s growth correct the slide?', options: [
                { text: 'Both claims need fixing — the epic grew for roughly a millennium from suta war-songs through Brahmanical writing into a layered archive, and the Critical Edition reconstructs the version most manuscripts share, not a lost original; the regional variants in its footnotes are the evidence, not noise.', outcome: 'The chapter treats \'Vyasa\' as the tradition\'s name for a collective process and the Critical Edition as a consensus tool — \'original\' is precisely what a thousand-year accreting text doesn\'t have.' },
                { text: 'Keep it — the Critical Edition chose the commonest verses, which is what \'original\' means.', outcome: 'The common core itself accreted over centuries and over half the edition is apparatus documenting variants; most-widely-shared is a scholarly baseline, not a first draft.', reveals: 'common-core-equals-original' },
                { text: 'Fix only the second line — say \'Vyasa didn\'t write it\' but leave \'Critical Edition restored the original.\'', outcome: 'That keeps the deeper error: even without a single author, the edition still isn\'t an ur-text — it\'s a map of transmission, so removing Vyasa doesn\'t rescue \'original.\'', reveals: 'no-author-means-no-growth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_03_012', title: 'You made it',
          caseStudy: { intro: 'You can now read a critical edition as a map of transmission — and ask \'which manuscript, which region\' instead of \'what really happened.\'',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_007', difficulty: 'standard',
          question: 'The Dharmasutras (c. 500–200 BCE) and Dharmashastras (c. 200 BCE–200.',
          hint: 'If confused about "prescriptive vs. descriptive", revisit the Rigvedic hymn.',
          misconception: 'Students often believe the Dharmasutras/Dharmashastras *were* the law of the land — that everyone in ancient India.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Dharmasutras (c',
                  options: ['The Dharmasutras (c', 'The Critical Edition of the Mahabharata (1919–1966) was a landmark philological project', 'The Mahabharata\'s authorship refers to the multi-layered, century-spanning process (c', 'This node examines the Brahmanical rules of kinship and marriage—specifically gotra'],
                  hint: 'If confused about "prescriptive vs. descriptive", revisit the Rigvedic hymn (poet/physician/grinder.',
                  misconception: 'Students often believe the Dharmasutras/Dharmashastras *were* the law of the land — that everyone in ancient India followed Manusmriti\'s.' }
          ],
            remediations: { 'the-dharmasutras-dharmashastras-were-the': { steps: ['If the student conflates prescription with practice: (1) Re-read NCERT pp.', '57–58 on "Brahmanical texts claimed universal validity...', 'but real social relations were more complicated." (2) Compare the eight marriage forms (prescriptive list) with.', '(3) Revisit the Buddhist critique (Source 13) and identify the specific logical move: empirical observation (wealth.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_008', difficulty: 'standard',
          question: 'The Nanda (c. 345–321 BCE) and Maurya (c. 321–185 BCE) dynasties, emerging from.',
          hint: 'Review the varna prescriptions in c12_hist_cbse_03_005 and the Maurya empire\'s rise.',
          misconception: 'Students often believe the Mauryas were *definitely* Kshatriyas (because the Mahavamsa says so) or *definitely* Shudras.',
          parts: [
                { id: 'a', prompt: 'Compare the legitimization strategies of the Mauryas (c. 321–185 BCE) and the Satavahanas (c. 1st century BCE–2nd century CE) regarding varna.', answer: 'Similarity: Both dynasties used religious patronage (Mauryas: Buddhism/Jainism',
                  options: ['Similarity: Both dynasties used religious patronage (Mauryas: Buddhism/Jainism', 'misses the source distinction (external vs'],
                  hint: 'Review the varna prescriptions in c12_hist_cbse_03_005 and the Maurya empire\'s rise.',
                  misconception: 'Students often believe the Mauryas were *definitely* Kshatriyas (because the Mahavamsa says so) or *definitely* Shudras (because the.' }
          ],
            remediations: { 'the-mauryas-were-definitely-kshatriyas': { steps: ['If the student cannot distinguish prescriptive from descriptive sources, revisit **c12_hist_cbse_03_006** (Varna Order.', 'If the historical chronology is shaky, review **c7_hist_ch02_003** (Maurya Empire: Chandragupta Maurya and His.', 'For the Satavahana/Shaka comparison, re-read the NCERT section on "Non-Kshatriya kings" (pp.', '62–63) and the Junagadh inscription analysis in **c12_hist_cbse_03_010**.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_009', difficulty: 'standard',
          question: 'The theory of varna-samkara (intermixture) is a Brahmanical classificatory.',
          hint: 'If confused about anuloma/pratiloma, revisit the definitions in node c12_hist_cbse_03_005.',
          misconception: 'Students often believe varna-samkara describes the *actual historical origin* of jatis through biological intermixture.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The theory of varna-samkara (intermixture) is a Brahmanical classificatory framework',
                  options: ['The theory of varna-samkara (intermixture) is a Brahmanical classificatory framework', 'The Critical Edition of the Mahabharata (1919–1966) was a landmark philological project', 'The Mahabharata\'s authorship refers to the multi-layered, century-spanning process (c', 'This node examines the Brahmanical rules of kinship and marriage—specifically gotra'],
                  hint: 'If confused about anuloma/pratiloma, revisit the definitions in node c12_hist_cbse_03_005 and the.',
                  misconception: 'Students often believe varna-samkara describes the *actual historical origin* of jatis through biological intermixture.' }
          ],
            remediations: { 'varna-samkara-describes-the-actual': { steps: ['If stuck, revisit c12_hist_cbse_03_005 (Four Varnas) to recall the ideal four-fold division, then c12_hist_cbse_03_006.', 'Re-read NCERT sections 3.3 (Jatis and social mobility) and 3.4 (Beyond the four varnas) focusing on Satavahana.', 'Specifically, compare Manusmriti\'s varna-samkara verses with the Satavahana practice of endogamy and the weavers\' guild.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_010', difficulty: 'standard',
          question: 'This topic examines social groups in early India (c. 600 BCE–600 CE) that.',
          hint: 'Revisit the varna-samkara theory (node 009) and the Manusmriti\'s role (node 007) to see.',
          misconception: 'Students often think "chandalas = untouchables = Dalits today" and assume the category was static and uniformly.',
          parts: [
                { id: 'a', prompt: 'According to the Manusmriti, which of the following was NOT a prescribed duty or restriction for chandalas?', answer: 'Correct answer: C) Serving as village priests',
                  options: ['Correct answer: C) Serving as village priests', 'chandalas = untouchables = Dalits today', 'A or B', 'the category was static and uniformly enforced'],
                  hint: 'Revisit the varna-samkara theory (node 009) and the Manusmriti\'s role (node 007) to see how texts.',
                  misconception: 'Students often think "chandalas = untouchables = Dalits today" and assume the category was static and uniformly enforced.' }
          ],
            remediations: { 'chandalas-untouchables-dalits-today-and': { steps: ['Re-read the Matanga Jataka excerpt (Source 10 in NCERT) and list every action Matanga takes that contradicts.', 'Compare the Satavahana metronymics (Fig.', '3.3) with the Brahmanical gotra rules (Section 2.4) — make a two-column table.', 'Re-attempt Diagnostic Question 5 using this table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "chandalas = untouchables = Dalits today" and assume the category was static and uniformly.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The category \'chandala\' was a fixed, birth-based identity in early India." Use evidence from the Matanga Jataka and the Satavahana.', answer: 'The statement is partially true but oversimplified',
                  options: ['The statement is partially true but oversimplified', 'chandalas = untouchables = Dalits today', 'the category was static and uniformly enforced'],
                  hint: 'Revisit the varna-samkara theory (node 009) and the Manusmriti\'s role (node 007) to see how texts.',
                  misconception: 'Students often think "chandalas = untouchables = Dalits today" and assume the category was static and uniformly enforced.' }
          ],
            remediations: { 'chandalas-untouchables-dalits-today-and': { steps: ['Re-read the Matanga Jataka excerpt (Source 10 in NCERT) and list every action Matanga takes that contradicts.', 'Compare the Satavahana metronymics (Fig.', '3.3) with the Brahmanical gotra rules (Section 2.4) — make a two-column table.', 'Re-attempt Diagnostic Question 5 using this table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_011', difficulty: 'standard',
          question: 'The Bhagavad Gita (c. 200 BCE–200 CE), embedded in the Mahabharata\'s Bhishma.',
          hint: 'If confused about varna vs. jati, re-watch the Class 9 recap **c9_hist_ch3_9** (first 10.',
          misconception: '**Students believe the Bhagavad Gita either (a) fully endorses the birth-based caste system of the Manusmriti, or (b).',
          parts: [
                { id: 'a', prompt: 'The NCERT (p. 61) calls the Bhagavad Gita a "pan-Indian authority across traditions." Explain why this description matters for historians reconstructing early.', answer: 'It means the Gita was recognized as authoritative by **multiple, often competing',
                  options: ['It means the Gita was recognized as authoritative by **multiple, often competing', 'it was the only authority'],
                  hint: 'If confused about varna vs. jati, re-watch the Class 9 recap **c9_hist_ch3_9** (first 10 minutes).',
                  misconception: '**Students believe the Bhagavad Gita either (a) fully endorses the birth-based caste system of the Manusmriti, or (b) completely rejects.' }
          ],
            remediations: { 'students-believe-the-bhagavad-gita': { steps: ['61–62 (Section 3.1)** and **p.', '73 (Section 6.1)** side-by-side.', 'Write out **Gita 4.13 and 18.41–44** in translation; underline every occurrence of *guna*, *karma*, *svabhava*.', 'Compare with **Manusmriti 1.87–91** (birth-based varna duties) using the table in c12_hist_cbse_03_007.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_012', difficulty: 'standard',
          question: 'This node examines how early Indian texts (c. 500 BCE–500 CE), particularly the.',
          hint: 'Revisit c12_hist_cbse_03_007 (Dharmasutras/Dharmashastras) for the textual tradition, and.',
          misconception: 'Students often believe **stridhana = dowry** and that **women had *no* property rights in ancient India**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node examines how early Indian texts (c',
                  options: ['This node examines how early Indian texts (c', 'The Critical Edition of the Mahabharata (1919–1966) was a landmark philological project', 'The Mahabharata\'s authorship refers to the multi-layered, century-spanning process (c', 'This node examines the Brahmanical rules of kinship and marriage—specifically gotra'],
                  hint: 'Revisit c12_hist_cbse_03_007 (Dharmasutras/Dharmashastras) for the textual tradition, and.',
                  misconception: 'Students often believe **stridhana = dowry** and that **women had *no* property rights in ancient India**.' }
          ],
            remediations: { 'stridhana-dowry-and-that-women': { steps: ['If the student confuses stridhana with dowry or thinks women had zero property rights: (1) Re-read Source 12 (p.', '69) carefully — highlight "the gifts they received on the occasion of marriage as stridhana...', 'inherited by their children, without the husband having any claim." (2) Compare with the *Majjhima Nikaya* story.', '(3) Do the "Two-Column Table" exercise: Column A = Manusmriti prescriptions for women\'s wealth; Column B = Evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
