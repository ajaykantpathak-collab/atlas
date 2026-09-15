import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch01_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch01_p2: SimDef = {
    id: 'v3_c12_soc_ch01_p2',
    title: 'Introducing Indian Society · Part 2/2',
    subtitle: 'The science of what you think you already know',
    classLevel: 12, subject: 'sociology', topic: 'Introducing Indian Society · Part 2/2',
    chapters: ['c12_soc_ch01'],
    nodeIds: ['c12_soc_cbse_01_007', 'c12_soc_cbse_01_008', 'c12_soc_cbse_01_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Sociological investigator', intro: 'The hardest thing to study is the world you grew up inside — because it trained you not to notice it.', goal: 'Explain why common sense is inadequate for studying society and apply self-reflexivity and the sociological imagination.' },
    discovery: {
        question: 'You live inside Indian society every day — so what could a subject called \'sociology of India\' possibly teach you that you don\'t already know?',
        options: ['That your everyday knowledge is \'partial\' twice over — incomplete and tilted to your own group\'s viewpoint — and sociology\'s first job is unlearning it', 'Nothing — common sense is enough', 'Only facts about villages and castes you haven\'t visited', 'Statistics you could look up anyway'],
        answer: 'That your everyday knowledge is \'partial\' twice over — incomplete and tilted to your own group\'s viewpoint — and sociology\'s first job is unlearning it',
        hook: 'Unlearning doesn\'t mean common sense is false — it means it\'s a view from somewhere. \'Caste doesn\'t matter in cities\' is true from an upper-caste city address; sociology studies why both that claim and a Dalit student\'s opposite experience get produced.',
    },
    teaching: [
        { title: 'The Relationship Between Sociology and History in the Indian Context', text: 'Sociology and history are distinct but complementary disciplines: sociology examines recurrent social patterns, structures, and processes (synchronic analysis), while history investigates unique.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_01_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Locate yourself on the social map, take one personal worry — like not getting a college seat — and trace it upward into structural machinery: seats, coaching economies, reservations, regional gaps.',
        labels: ['The Relationship Between Sociology', 'The Distinctive Features', 'The Debate Between Universalism'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_01_007', title: 'The Relationship Between Sociology and History in the Indian Context',
          caseStudy: { intro: 'Imagine you are studying the 1857 Revolt: a historian would trace the sequence of events, leadership decisions, and military outcomes day by day; a sociologist.',
            decisions: [{ prompt: 'State the fundamental methodological difference between sociology and history in one sentence, using the terms "synchronic" and.', options: [
                { text: 'Sociology is primarily synchronic', outcome: 'Sociology is primarily synchronic — it analyses social structures and patterns at a given time.' },
                { text: 'sociology studies present, history studies past', outcome: 'Not quite — Students often think "sociology studies present, history studies past" — a temporal distinction.', reveals: 'sociology-studies-present' },
                { text: '"sociology studies present, history studies past"', outcome: 'Not quite — Students often think "sociology studies present, history studies past" — a temporal distinction.', reveals: 'sociology-studies-present' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_01_008', title: 'The Distinctive Features of Indian Society: Plurality, Diversity and Stratification',
          caseStudy: { intro: 'Imagine you are standing in a bustling railway station in Mumbai: you hear Marathi, Hindi, Gujarati, Tamil, and Bengali; you see people dressed.',
            decisions: [{ prompt: 'Define \'plurality\', \'diversity\', and \'stratification\' in the context of Indian society. Give one concrete example for each.', options: [
                { text: '**Correct answer:** Plurality = coexistence of multiple distinct groups (e.g., Hindus,', outcome: '**Correct answer:** Plurality = coexistence of multiple distinct groups (e.g., Hindus, Muslims.' },
                { text: 'caste is diversity', outcome: 'Not quite — **Misconception:** "Plurality, diversity, and stratification are just three words for the same.', reveals: 'misconception-plurality' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_01_009', title: 'The Debate Between Universalism and Particularism in Studying Indian Society',
          caseStudy: { intro: 'Imagine you are a sociologist studying a joint family in a Tamil Nadu village.',
            decisions: [{ prompt: 'Define "universalism" and "particularism" in the context of studying Indian society in one sentence each.', options: [
                { text: 'Universalism: The approach that seeks to apply general sociological theories (often', outcome: 'Universalism: The approach that seeks to apply general sociological theories (often Western-origin).' },
                { text: 'universalism means studying all societies, particularism means studying one', outcome: 'Not quite — Students often think "universalism = quantitative/Western, particularism = qualitative/Indian.".', reveals: 'universalism-quantitative-western' },
                { text: 'universalism = quantitative/Western, particularism = qualitative/Indian', outcome: 'Not quite — Students often think "universalism = quantitative/Western, particularism = qualitative/Indian.".', reveals: 'universalism-quantitative-western' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A field-research intern studying a denotified tribe writes that the community\'s stigma \'comes from their own nomadic culture — an old prejudice with no history.\'',
            decisions: [{ prompt: 'What does the colonial analysis show instead?', options: [
                { text: 'The state manufactured the category — the 1871 Act branded whole nomadic communities \'criminal by birth,\' confined and surveilled them until the label produced its own evidence; denotification repealed the law, but the stigma, police bias and missing documents outlived it.', outcome: 'The chapter\'s argument: colonialism didn\'t just label society — it built categories (census jatis, criminal tribes, zamindars) that still structure present life.' },
                { text: 'The intern is right — stigma attaches to the lifestyle, so time alone erases it.', outcome: 'That reads a state-made category as cultural fact — the stigma was legislated into being and survived denotification; \'no history\' is exactly the amnesia the analysis exists to correct.', reveals: 'stigma-is-cultural' },
                { text: 'Partially — the law mattered then, but today\'s stigma is purely economic backwardness.', outcome: 'The poverty and the stigma share the same root — exclusion from land, documents and credit was created by the label; treating present disadvantage as independent severs the colonial thread the chapter traces.', reveals: 'present-detached-from-past' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_01_009', title: 'You made it',
          caseStudy: { intro: 'You can now turn a private trouble into a public issue — the single move that makes sociology a method, not a pile of facts.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_007', difficulty: 'standard',
          question: 'Sociology and history are distinct but complementary disciplines: sociology.',
          hint: 'Revisit c11_soc_cbse_01_008 — specifically the table comparing sociology with history.',
          misconception: 'Students often think "sociology studies present, history studies past" — a temporal distinction.',
          parts: [
                { id: 'a', prompt: 'State the fundamental methodological difference between sociology and history in one sentence, using the terms "synchronic" and "diachronic."', answer: 'Sociology is primarily synchronic',
                  options: ['Sociology is primarily synchronic', 'sociology studies present, history studies past', '"sociology studies present, history studies past"'],
                  hint: 'Revisit c11_soc_cbse_01_008 — specifically the table comparing sociology with history, economics.',
                  misconception: 'Students often think "sociology studies present, history studies past" — a temporal distinction.' }
          ],
            remediations: { 'sociology-studies-present': { steps: ['If the student persists in the temporal distinction: Step 1 — Ask them to classify these studies: (a) A sociologist.', 'Both study the "present" — but (a) seeks a pattern, (b) seeks a narrative.', 'Step 2 — Have them re-read Srinivas\'s "Social Change in Modern India" (Ch.', '2 on dominant caste) and underline every historical reference (land grants, colonial acts, pre-colonial polity).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "sociology studies present, history studies past" — a temporal distinction.',
          parts: [
                { id: 'a', prompt: 'The Subaltern Studies collective (Guha, Chakraborty, Pandey) explicitly positioned themselves at the intersection of history and sociology.', answer: '"Historical sociology" is more accurate: they use historical archives to build',
                  options: ['"Historical sociology" is more accurate: they use historical archives to build', 'sociology studies present, history studies past', 'focuses only on their use of archives misses the theoretical ambition', '"sociology studies present, history studies past"'],
                  hint: 'Revisit c11_soc_cbse_01_008 — specifically the table comparing sociology with history, economics.',
                  misconception: 'Students often think "sociology studies present, history studies past" — a temporal distinction.' }
          ],
            remediations: { 'sociology-studies-present': { steps: ['If the student persists in the temporal distinction: Step 1 — Ask them to classify these studies: (a) A sociologist.', 'Both study the "present" — but (a) seeks a pattern, (b) seeks a narrative.', 'Step 2 — Have them re-read Srinivas\'s "Social Change in Modern India" (Ch.', '2 on dominant caste) and underline every historical reference (land grants, colonial acts, pre-colonial polity).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_008', difficulty: 'standard',
          question: 'The distinctive features of Indian society refer to its **plurality**.',
          hint: 'Revisit c11_soc_cbse_02_003 and c11_soc_cbse_06_002 — focus on the distinction between.',
          misconception: '**Misconception:** "Plurality, diversity, and stratification are just three words for the same thing — India has many.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distinctive features of Indian society refer to its **plurality** (coexistence of',
                  options: ['The distinctive features of Indian society refer to its **plurality** (coexistence of', 'The significance of a sociology of India lies in its systematic, scientific study of', 'Colonialism in India refers to the British imperial rule (1757–1947) that restructured', 'Nationalism in the Indian context refers to the ideological and political process through'],
                  hint: 'Revisit c11_soc_cbse_02_003 and c11_soc_cbse_06_002 — focus on the distinction between.',
                  misconception: '**Misconception:** "Plurality, diversity, and stratification are just three words for the same thing — India has many cultures and some.' }
          ],
            remediations: { 'misconception-plurality': { steps: ['** Ask the student to draw a **three-circle Venn diagram** labeled Plurality, Diversity, Stratification.', '** For each item, have them explain **why** it belongs there — forcing the analytical distinction. **', '** Give a mini-case: "A village has 5 castes, 3 religions, and 2 languages.', '** Re-administer Diagnostic Question 2. If they still conflate, repeat with a new case (urban housing society).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_01_009', difficulty: 'standard',
          question: 'The debate between universalism and particularism in studying Indian society.',
          hint: 'Revisit c12_soc_cbse_01_005 (Intellectual Context) to see how Ghurye, Srinivas, and.',
          misconception: 'Students often think "universalism = quantitative/Western, particularism = qualitative/Indian." This is false: Dumont\'s.',
          parts: [
                { id: 'a', prompt: 'A researcher studies "middle-class formation in Bengaluru" using Erik Olin Wright\'s class schema (contradictory class locations) without modification.', answer: 'First researcher: Universalist',
                  options: ['First researcher: Universalist', 'universalism = quantitative/Western, particularism = qualitative/Indian', '"universalism = quantitative/Western, particularism = qualitative/Indian'],
                  hint: 'Revisit c12_soc_cbse_01_005 (Intellectual Context) to see how Ghurye, Srinivas, and Dumont each.',
                  misconception: 'Students often think "universalism = quantitative/Western, particularism = qualitative/Indian." This is false: Dumont\'s universalism was.' }
          ],
            remediations: { 'universalism-quantitative-western': { steps: ['If the student conflates method with stance: 1) Have them classify three studies (one quantitative universalist, one.', '2) Ask them to rewrite the quantitative particularist study\'s hypothesis replacing its indigenous concept with.', '3) Re-test with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
