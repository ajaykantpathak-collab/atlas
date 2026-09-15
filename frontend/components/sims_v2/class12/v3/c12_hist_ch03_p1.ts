import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hist_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hist_ch03_p1: SimDef = {
    id: 'v3_c12_hist_ch03_p1',
    title: 'Kinship, Caste and Class (Early Societies) · Part 1/2',
    subtitle: '47 years, 1,200 manuscripts — and no original',
    classLevel: 12, subject: 'history', topic: 'Kinship, Caste and Class (Early Societies) · Part 1/2',
    chapters: ['c12_hist_ch03'],
    nodeIds: ['c12_hist_cbse_03_001', 'c12_hist_cbse_03_002', 'c12_hist_cbse_03_003', 'c12_hist_cbse_03_004', 'c12_hist_cbse_03_005', 'c12_hist_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Textual historian', intro: 'The world\'s longest epic existed in a thousand versions. One team decided to map them all.', goal: 'Grasp the BORI Critical Edition\'s method and what its variations reveal about the Mahabharata as living tradition.' },
    discovery: {
        question: 'Over 1,200 Mahabharata manuscripts, gathered over 47 years — and more than half the Critical Edition\'s 13,000 pages are the variations. What did Pune\'s scholars actually prove?',
        options: ['That there is no single original — the epic is a living, multi-vocal tradition; the common text is a scholarly reconstruction and the variations ARE the social history', 'That one true version exists', 'Vyasa\'s manuscript survived', 'Footnotes don\'t matter'],
        answer: 'That there is no single original — the epic is a living, multi-vocal tradition; the common text is a scholarly reconstruction and the variations ARE the social history',
        hook: 'The apparatus isn\'t a failure — it\'s the data: a verse common across regions is likely older; a southern variant with a local deity is cultural negotiation, not corruption. The Critical Edition doesn\'t crown a winner; it maps a thousand-year conversation.',
    },
    teaching: [
        { title: 'The Critical Edition of the Mahabharata: Bhandarkar and the BORI Project', text: 'The Critical Edition of the Mahabharata (1919–1966) was a landmark philological project at the Bhandarkar Oriental Research Institute (BORI), Pune, led by V.S.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hist_cbse_03_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Collate like a philologist: weigh manuscript consensus against regional voice, decode why variations fill the appendices, and reframe the epic as evidence of India\'s plural pasts.',
        labels: ['The Critical Edition', 'The Mahabharata\'s Authorship: Vyasa,', 'Kinship and Marriage: Gotra', 'Polyandry in the Mahabharata', 'The Four Varnas: Brahmana,', 'Varna Order as'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hist_cbse_03_001', title: 'The Critical Edition of the Mahabharata: Bhandarkar and the BORI Project',
          caseStudy: { intro: 'Imagine you find three different printed versions of the Ramayana in your grandmother\'s house, your school library, and a temple — each with slightly different.',
            decisions: [{ prompt: 'In which year did the BORI Critical Edition project begin, who was its first general editor, and approximately how many manuscripts were.', options: [
                { text: 'The project began in 1919 under General Editor V.S', outcome: 'The project began in 1919 under General Editor V.S. Sukthankar; the team consulted over 1,200.' },
                { text: 'proved', outcome: 'Not quite — Students believe the Critical Edition "proved" which Mahabharata verses are authentic and which are.', reveals: 'the-critical-edition-proved-which' },
                { text: 'Bhandarkar as editor, or dating it to 1947', outcome: 'Not quite — Students believe the Critical Edition "proved" which Mahabharata verses are authentic and which are.', reveals: 'the-critical-edition-proved-which' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_03_002', title: 'The Mahabharata\'s Authorship: Vyasa, the Brahmanas and Oral Traditions',
          caseStudy: { intro: 'Imagine your grandmother tells you a family story about an ancestor\'s bravery — each retelling adds details, drops some parts, and changes emphasis.',
            decisions: [{ prompt: 'Who is traditionally credited as the compiler of the Mahabharata in the Sanskrit tradition, and what does the Critical Edition reveal about.', options: [
                { text: 'The sage Vyasa is traditionally credited as the compiler', outcome: 'The sage Vyasa is traditionally credited as the compiler. The Critical Edition, however, shows the.' },
                { text: 'Vyasa wrote it all at once', outcome: 'Not quite — Students believe the Mahabharata was written by the sage Vyasa as a single author in one period.', reveals: 'the-mahabharata-was-written-by' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_03_004', title: 'Polyandry in the Mahabharata: Draupadi and the Pandava Marriage',
          caseStudy: { intro: 'Imagine you are at a family wedding and hear elders discussing how "in our tradition, a woman marries one man." Now, open your NCERT to page 76 and read Source.',
            decisions: [{ prompt: 'What are the three distinct explanations the Mahabharata offers for Draupadi\'s marriage to the five Pandavas?', options: [
                { text: 'The three explanations are: (1) Kunti\'s command to share whatever Arjuna won', outcome: 'The three explanations are: (1) Kunti\'s command to share whatever Arjuna won, which she could not.' },
                { text: 'only one explanation or confusing them with later additions', outcome: 'Not quite — Students often think Draupadi\'s polyandry was a unique, fictional invention of the Mahabharata with.', reveals: 'draupadi-s-polyandry-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_03_005', title: 'The Four Varnas: Brahmana, Kshatriya, Vaishya, Shudra in the Dharmasutras',
          caseStudy: { intro: 'Imagine you find an old family diary that lists "rules for each family member" — but you know real life didn\'t follow those rules exactly.',
            decisions: [{ prompt: 'List the four varnas in hierarchical order and state the primary occupation prescribed for each in the Dharmasutras.', options: [
                { text: 'Correct order: Brahmana (study/teach Vedas, perform sacrifices), Kshatriya (warfare,', outcome: 'Correct order: Brahmana (study/teach Vedas, perform sacrifices), Kshatriya (warfare, protection.' },
                { text: 'untouchables', outcome: 'Not quite — Students often believe the four-varna system was a rigid, universally enforced caste hierarchy from.', reveals: 'the-four-varna-system-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate preparing a seminar slide writes: \'Vyasa composed the Mahabharata; the Critical Edition has finally restored his original text.\'',
            decisions: [{ prompt: 'How does the chapter\'s account of the epic\'s growth correct the slide?', options: [
                { text: 'Both claims need fixing — the epic grew for roughly a millennium from suta war-songs through Brahmanical writing into a layered archive, and the Critical Edition reconstructs the version most manuscripts share, not a lost original; the regional variants in its footnotes are the evidence, not noise.', outcome: 'The chapter treats \'Vyasa\' as the tradition\'s name for a collective process and the Critical Edition as a consensus tool — \'original\' is precisely what a thousand-year accreting text doesn\'t have.' },
                { text: 'Keep it — the Critical Edition chose the commonest verses, which is what \'original\' means.', outcome: 'The common core itself accreted over centuries and over half the edition is apparatus documenting variants; most-widely-shared is a scholarly baseline, not a first draft.', reveals: 'common-core-equals-original' },
                { text: 'Fix only the second line — say \'Vyasa didn\'t write it\' but leave \'Critical Edition restored the original.\'', outcome: 'That keeps the deeper error: even without a single author, the edition still isn\'t an ur-text — it\'s a map of transmission, so removing Vyasa doesn\'t rescue \'original.\'', reveals: 'no-author-means-no-growth' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hist_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a critical edition as a map of transmission — and ask \'which manuscript, which region\' instead of \'what really happened.\'',
            decisions: [{ prompt: 'What comes next? Kinship, Caste and Class (Early Societies) · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Kinship, Caste and Class (Early Societies) · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_001', difficulty: 'standard',
          question: 'The Critical Edition of the Mahabharata (1919–1966) was a landmark philological.',
          hint: 'Revisit c9_hist_ch1_6 "Evidence in History: How Historians Interpret the Past".',
          misconception: 'Students believe the Critical Edition "proved" which Mahabharata verses are authentic and which are later additions.',
          parts: [
                { id: 'a', prompt: 'In which year did the BORI Critical Edition project begin, who was its first general editor, and approximately how many manuscripts were consulted?', answer: 'The project began in 1919 under General Editor V.S',
                  options: ['The project began in 1919 under General Editor V.S', 'proved', 'Bhandarkar as editor, or dating it to 1947'],
                  hint: 'Revisit c9_hist_ch1_6 "Evidence in History: How Historians Interpret the Past" — specifically the.',
                  misconception: 'Students believe the Critical Edition "proved" which Mahabharata verses are authentic and which are later additions, giving us a clean.' }
          ],
            remediations: { 'the-critical-edition-proved-which': { steps: ['53–55, focusing on the distinction between "main text" and "footnotes/appendices." 2.', 'Watch the 10-minute BORI documentary clip (search "BORI Critical Edition Mahabharata manuscript collation").', 'Complete a mini-exercise: take 3 printed versions of a familiar story (e.g., Cinderella, or a Panchatantra tale), mark.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Critical Edition "proved" which Mahabharata verses are authentic and which are later additions.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The Critical Edition gives us the original Mahabharata as Vyasa composed it." Use evidence from the project\'s methodology and findings.', answer: 'The statement is false',
                  options: ['The statement is false', 'original', 'proved'],
                  hint: 'Revisit c9_hist_ch1_6 "Evidence in History: How Historians Interpret the Past" — specifically the.',
                  misconception: 'Students believe the Critical Edition "proved" which Mahabharata verses are authentic and which are later additions, giving us a clean.' },
                { id: 'b', prompt: 'Design a research question for a Class 12 project that uses the Critical Edition\'s apparatus (footnotes/appendices) to investigate a social history question.', answer: 'Example: "How did the gotra exogamy rule (Source 3, NCERT p',
                  options: ['Example: "How did the gotra exogamy rule (Source 3, NCERT p', 'proved'],
                  hint: 'Revisit c9_hist_ch1_6 "Evidence in History: How Historians Interpret the Past" — specifically the.',
                  misconception: 'Students believe the Critical Edition "proved" which Mahabharata verses are authentic and which are later additions, giving us a clean.' }
          ],
            remediations: { 'the-critical-edition-proved-which': { steps: ['53–55, focusing on the distinction between "main text" and "footnotes/appendices." 2.', 'Watch the 10-minute BORI documentary clip (search "BORI Critical Edition Mahabharata manuscript collation").', 'Complete a mini-exercise: take 3 printed versions of a familiar story (e.g., Cinderella, or a Panchatantra tale), mark.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_002', difficulty: 'standard',
          question: 'The Mahabharata\'s authorship refers to the multi-layered, century-spanning.',
          hint: 'Review the suta bard\'s role in early Indian courts (Class 9, Vedic Society) and the.',
          misconception: 'Students believe the Mahabharata was written by the sage Vyasa as a single author in one period, like a modern novel.',
          parts: [
                { id: 'a', prompt: 'Who is traditionally credited as the compiler of the Mahabharata in the Sanskrit tradition, and what does the Critical Edition reveal about this attribution?', answer: 'The sage Vyasa is traditionally credited as the compiler',
                  options: ['The sage Vyasa is traditionally credited as the compiler', 'Vyasa wrote it all at once'],
                  hint: 'Review the suta bard\'s role in early Indian courts (Class 9, Vedic Society) and the NCERT\'s.',
                  misconception: 'Students believe the Mahabharata was written by the sage Vyasa as a single author in one period, like a modern novel.' },
                { id: 'b', prompt: 'Why did Brahmanas take over the Mahabharata from the 5th century BCE and commit it to writing, according to the NCERT?', answer: 'As chiefdoms like the Kurus and Panchalas became kingdoms (c',
                  options: ['As chiefdoms like the Kurus and Panchalas became kingdoms (c', 'Brahmanas wrote it to preserve Hindu religion'],
                  hint: 'Review the suta bard\'s role in early Indian courts (Class 9, Vedic Society) and the NCERT\'s.',
                  misconception: 'Students believe the Mahabharata was written by the sage Vyasa as a single author in one period, like a modern novel.' }
          ],
            remediations: { 'the-mahabharata-was-written-by': { steps: ['If the student holds the single-author misconception: (1) Re-read NCERT pp.', '74–75 ("Author(s) and dates") and underline the three distinct phases: sutas → Brahmanas writing (5th c.', 'BCE) → didactic additions (200 BCE–400 CE).', '(2) Revisit node c12_hist_cbse_03_001 (Critical Edition) to see how manuscript variations disprove a single original.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_003', difficulty: 'standard',
          question: 'This node examines the Brahmanical rules of kinship and marriage—specifically.',
          hint: 'If stuck, re-read the sections on Dharmasutras and Dharmashastras (c12_hist_cbse_03_007).',
          misconception: 'Students often believe that Brahmanical gotra rules (exogamy, wife’s gotra change) were universally followed in ancient.',
          parts: [
                { id: 'a', prompt: 'Why do historians consider the Satavahana inscriptions a crucial counterpoint to the Brahmanical gotra rules?', answer: 'The inscriptions show Satavahana rulers using metronymics (e.g., Gotami-puta,',
                  options: ['The inscriptions show Satavahana rulers using metronymics (e.g., Gotami-puta,', 'confirm'],
                  hint: 'If stuck, re-read the sections on Dharmasutras and Dharmashastras (c12_hist_cbse_03_007) and the.',
                  misconception: 'Students often believe that Brahmanical gotra rules (exogamy, wife’s gotra change) were universally followed in ancient India.' }
          ],
            remediations: { 'brahmanical-gotra-rules-exogamy': { steps: ['Re-read the Satavahana name list (Fig.', '3.3 in NCERT) and identify every Gotami-puta and Vasithi-puta.', 'Compare each queen’s gotra-name with her husband’s gotra-name; note matches.', 'Revisit the two gotra rules in the Dharmasutras (node c12_hist_cbse_03_007).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_004', difficulty: 'standard',
          question: 'Polyandry in the Mahabharata refers to the marriage of Draupadi to the five.',
          hint: 'Revisit the "Rules of marriage" and "The gotra of women" sections.',
          misconception: 'Students often think Draupadi\'s polyandry was a unique, fictional invention of the Mahabharata with no historical.',
          parts: [
                { id: 'a', prompt: 'What are the three distinct explanations the Mahabharata offers for Draupadi\'s marriage to the five Pandavas?', answer: 'The three explanations are: (1) Kunti\'s command to share whatever Arjuna won',
                  options: ['The three explanations are: (1) Kunti\'s command to share whatever Arjuna won', 'only one explanation or confusing them with later additions'],
                  hint: 'Revisit the "Rules of marriage" and "The gotra of women" sections in c12_hist_cbse_03_003; memorise.',
                  misconception: 'Students often think Draupadi\'s polyandry was a unique, fictional invention of the Mahabharata with no historical basis.' },
                { id: 'b', prompt: 'Apply the concepts of exogamy and endogamy (from c12_hist_cbse_03_003) to Draupadi\'s marriage: Was this union exogamous or endogamous with respect to the.', answer: 'The Pandavas shared the same father (Pandu) and thus the same gotra',
                  options: ['The Pandavas shared the same father (Pandu) and thus the same gotra', 'members of the same gotra cannot marry', 'it was exogamous'],
                  hint: 'Revisit the "Rules of marriage" and "The gotra of women" sections in c12_hist_cbse_03_003; memorise.',
                  misconception: 'Students often think Draupadi\'s polyandry was a unique, fictional invention of the Mahabharata with no historical basis.' }
          ],
            remediations: { 'draupadi-s-polyandry-was-a': { steps: ['If the student cannot distinguish the three explanations or conflates polyandry with polygyny: 1.', 'Re-read Source 16 (page 76) and underline each explanation in a different colour.', 'Revisit c12_hist_cbse_03_003 (Kinship and Marriage) to review the definitions of polygyny, polyandry, exogamy, endogamy.', 'Create a two-column table: "Brahmanical Norm" vs "Mahabharata Practice" for marriage forms.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_005', difficulty: 'standard',
          question: 'The Four Varnas (Brahmana, Kshatriya, Vaishya, Shudra) in the Dharmasutras.',
          hint: 'Revisit Class 9 node c9_hist_ch3_9 (Social Categories: Varna and Jati System) and the.',
          misconception: 'Students often believe the four-varna system was a rigid, universally enforced caste hierarchy from the Vedic period.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Four Varnas (Brahmana, Kshatriya, Vaishya, Shudra) in the Dharmasutras represent a',
                  options: ['The Four Varnas (Brahmana, Kshatriya, Vaishya, Shudra) in the Dharmasutras represent a', 'The Critical Edition of the Mahabharata (1919–1966) was a landmark philological project', 'The Mahabharata\'s authorship refers to the multi-layered, century-spanning process (c', 'This node examines the Brahmanical rules of kinship and marriage—specifically gotra'],
                  hint: 'Revisit Class 9 node c9_hist_ch3_9 (Social Categories: Varna and Jati System) and the Purusha Sukta.',
                  misconception: 'Students often believe the four-varna system was a rigid, universally enforced caste hierarchy from the Vedic period onward.' }
          ],
            remediations: { 'the-four-varna-system-was': { steps: ['Re-read NCERT pages 61–62 (section 3.1) and Source 6 (Rigvedic hymn).', 'Create a two-column table: "Dharmasutra Prescription" vs.', '"Counter-evidence from Text/Inscription".', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_03_006', difficulty: 'standard',
          question: 'The varna order is a four-fold theoretical classification (Brahmana, Kshatriya.',
          hint: 'If stuck, review the varna occupation table in node c12_hist_cbse_03_005 and the.',
          misconception: 'Students often think "varna" and "caste" are the same thing, and that the four-varna hierarchy was rigidly enforced.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The varna order is a four-fold theoretical classification (Brahmana, Kshatriya, Vaishya,',
                  options: ['The varna order is a four-fold theoretical classification (Brahmana, Kshatriya, Vaishya,', 'The Critical Edition of the Mahabharata (1919–1966) was a landmark philological project', 'The Mahabharata\'s authorship refers to the multi-layered, century-spanning process (c', 'This node examines the Brahmanical rules of kinship and marriage—specifically gotra'],
                  hint: 'If stuck, review the varna occupation table in node c12_hist_cbse_03_005 and the varna/jati.',
                  misconception: 'Students often think "varna" and "caste" are the same thing, and that the four-varna hierarchy was rigidly enforced in daily life across.' }
          ],
            remediations: { 'varna-and-caste-are-the': { steps: ['If the student conflates varna and jati, have them re-read node c12_hist_cbse_03_005 (Four Varnas) and node.', 'Create a two-column table: Column A = varna features (four, fixed, textual, prescriptive); Column B = jati features.', 'Then re-attempt Diagnostic Question 1.', 'If they struggle with the Buddhist critique, revisit node c9_hist_ch3_9 (Class 9: Varna and Jati System) for the basic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
