import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch04_p3: SimDef = {
    id: 'v3_c12_hin_a_ch04_p3',
    title: 'j?kqohj lgk; · Part 3/3',
    subtitle: 'Not the ghats — the lane where the city actually lives',
    classLevel: 12, subject: 'hin_a', topic: 'j?kqohj lgk; · Part 3/3',
    chapters: ['c12_hin_a_ch04'],
    nodeIds: ['c12_hin_a_cbse_04_013', 'c12_hin_a_cbse_04_014', 'c12_hin_a_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modernist poetry reader', intro: 'A post-independence poet picks the narrowest space in the city and makes it speak.', goal: 'Read Banaras through Nayi Kavita\'s experimental lens — title as thesis, image over statement.' },
    discovery: {
        question: 'The poem is titled \'Banaras\' — not a highway or a plaza but a narrow lane, a cul-de-sac. What has the title already decided before line one?',
        options: ['The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre', 'Banaras is small', 'Lanes are pretty', 'Nothing — it\'s just a name'],
        answer: 'The vantage — this is poetry spoken from the margins, in claustrophobic concrete imagery, not from the city\'s ceremonial centre',
        hook: 'A poet born in 1934 writes under Nayi Kavita\'s contract already broken — no fixed metre, image over statement, ambiguity as value. Where Bhakti verse transmits truth, this poetry enacts the search for it; context isn\'t a crutch, it\'s the knowledge the poem presupposes.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis is the disciplined process of examining a text beyond its literal meaning to uncover deeper layers of significance, evaluate the author\'s choices, and construct.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_04_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk the cul-de-sac of modernist verse: predict imagery from title and era, weigh ambiguity as method, and feel how the poem speaks from beneath the flyover, not from its span.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are sitting in the examination hall and the question asks: "Analyze how the poet uses the evening setting to comment on the erosion of traditional.',
            decisions: [{ prompt: 'Define "critical thinking" in the context of literary analysis of a poem. How does it differ from literal comprehension?', options: [
                { text: 'Critical thinking in literary analysis means evaluating how a poem\'s form, language, and', outcome: 'Critical thinking in literary analysis means evaluating how a poem\'s form, language, and structure.' },
                { text: 'What happens?', outcome: 'Not quite — Students believe "critical thinking" means criticizing the poem (finding flaws) or offering.', reveals: 'critical-thinking-means-criticizing-the' },
                { text: 'How and why does the poem make it mean what it means?', outcome: 'Not quite — Students believe "critical thinking" means criticizing the poem (finding flaws) or offering.', reveals: 'critical-thinking-means-criticizing-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you sit down to answer "cukjl esa olar dk vkxeu oSQls gksrk gS vkSj mldk D;k izHkko bl \'kgj ij iM+rk gS\\" but your mind goes blank — you remember the.',
            decisions: [{ prompt: 'What is the full form of PEEL in the context of writing structured answers for literature questions?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., \\"Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line\\', outcome: 'Not quite — Students believe that writing a detailed summary of the poem constitutes a good answer.', reveals: 'writing-a-detailed-summary-of' },
                { text: 'knowing the poem\\', outcome: 'Not quite — Students believe that writing a detailed summary of the poem constitutes a good answer.', reveals: 'writing-a-detailed-summary-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are in a Class 12 Hindi class and the teacher says, "In groups of four, discuss how the poet contrasts the village and the city in \'cukjl\'.',
            decisions: [{ prompt: 'What is the primary purpose of a "discussion point" in a literature speaking-listening activity?', options: [
                { text: 'A discussion point is a specific, text-anchored observation or question designed to', outcome: 'A discussion point is a specific, text-anchored observation or question designed to invite multiple.' },
                { text: 'to share my feelings about the poem', outcome: 'Not quite — Students believe a "good discussion" means everyone speaks equally and agrees on a single.', reveals: 'a-good-discussion-means-everyone' },
                { text: 'good discussion', outcome: 'Not quite — Students believe a "good discussion" means everyone speaks equally and agrees on a single.', reveals: 'a-good-discussion-means-everyone' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A short-film jury member rejects your submission about a child calling \'Papa — Papa\' toward a father who never comes, saying \'nothing happens — no climax, no arrival, no story.\'',
            decisions: [{ prompt: 'How does the structure of \'फ्नेक\' answer that verdict?', options: [
                { text: 'The climax is internal — the repeated \'पिता-पिता\' at widening intervals spirals the child\'s urgency upward while the father\'s absence grows more total; the non-arrival IS the event, and the final cry is the peak the film was building toward.', outcome: 'The chapter separates external event from structural peak: repetition placed at lengthening intervals propels time and loss forward — \'nothing happening\' is precisely what\'s happening.' },
                { text: 'The juror is right — a climax requires the awaited person to appear or definitively not appear on screen.', outcome: 'That demands an external resolution the poem refuses on purpose: the spiral structure makes absence itself the accumulating force, so an arrival would release the tension the film exists to hold.', reveals: 'climax-needs-arrival' },
                { text: 'Compromise — add a montage of the father elsewhere so the audience at least sees him.', outcome: 'Cutting away breaks the one-point perspective that makes the waiting legible; the poem never leaves the child\'s call because the structure\'s power is that we stay inside the unanswered side.', reveals: 'show-both-sides' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'You can now decode a title before the first line — and read Nayi Kavita\'s broken forms as the broken world\'s true shape.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis is the disciplined process of examining.',
          hint: 'If the student cannot move from "what happens" to "how it means", return to node 012.',
          misconception: 'Students believe "critical thinking" means criticizing the poem (finding flaws) or offering a purely subjective.',
          parts: [
                { id: 'a', prompt: 'The poem contains the image "vthc lh ueh" (एक वीथी लह उह — a single lane, a single lamp).', answer: 'Synecdoche uses a part to represent the whole',
                  options: ['Synecdoche uses a part to represent the whole', 'critical thinking', 'I feel sad for the village'],
                  hint: 'If the student cannot move from "what happens" to "how it means", return to node 012.',
                  misconception: 'Students believe "critical thinking" means criticizing the poem (finding flaws) or offering a purely subjective emotional reaction ("I feel.' }
          ],
            remediations: { 'critical-thinking-means-criticizing-the': { steps: ['Have the student re-read the poem aloud, marking every sensory image (sight, sound, smell) with a highlighter.', 'Ask them to group the images into clusters (e.g., "light/fire", "darkness/night", "movement/stillness").', 'For each cluster, ask: "What does this cluster *do* in the poem?', 'What would be lost if it were removed?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical thinking" means criticizing the poem (finding flaws) or offering a purely subjective.',
          parts: [
                { id: 'a', prompt: 'A critic claims: "The poem \'cukjl\' is ultimately pessimistic because it documents a dying way of life without hope." Evaluate this claim using evidence from.', answer: 'The claim is reductive',
                  options: ['The claim is reductive', 'critical thinking', 'I feel sad for the village'],
                  hint: 'If the student cannot move from "what happens" to "how it means", return to node 012.',
                  misconception: 'Students believe "critical thinking" means criticizing the poem (finding flaws) or offering a purely subjective emotional reaction ("I feel.' }
          ],
            remediations: { 'critical-thinking-means-criticizing-the': { steps: ['Have the student re-read the poem aloud, marking every sensory image (sight, sound, smell) with a highlighter.', 'Ask them to group the images into clusters (e.g., "light/fire", "darkness/night", "movement/stillness").', 'For each cluster, ask: "What does this cluster *do* in the poem?', 'What would be lost if it were removed?" 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter refer to the ability to compose structured.',
          hint: 'If stuck, revisit c12_hin_a_cbse_04_012 (Comprehension) to practice extracting exact.',
          misconception: 'Students believe that writing a detailed summary of the poem constitutes a good answer.',
          parts: [
                { id: 'a', prompt: 'What is the full form of PEEL in the context of writing structured answers for literature questions?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line\\', 'knowing the poem\\', 'answering the question analytically.\\'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_04_012 (Comprehension) to practice extracting exact lines for.',
                  misconception: 'Students believe that writing a detailed summary of the poem constitutes a good answer.' },
                { id: 'b', prompt: 'A student writes: \\"In cukjl, the poet describes the village beautifully. The fields are green and the crops are growing.', answer: 'Weaknesses: (1) No textual evidence',
                  options: ['Weaknesses: (1) No textual evidence', 'grammar errors\\', 'knowing the poem\\', 'answering the question analytically.\\'],
                  hint: 'If stuck, revisit c12_hin_a_cbse_04_012 (Comprehension) to practice extracting exact lines for.',
                  misconception: 'Students believe that writing a detailed summary of the poem constitutes a good answer.' }
          ],
            remediations: { 'writing-a-detailed-summary-of': { steps: ['Have the student take a textbook question and highlight the command word (e.g., \\"explain\\", \\"compare\\", \\"evaluate\\").', 'Together, list 3 exact lines from the poem that address the command.', 'Model one PEEL paragraph on the board, thinking aloud: \\"My point is...', 'Assign a parallel question for independent practice with a PEEL template scaffold.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_04_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, re-read stanza 2 and 4 of "cukjl" and list every sensory image; then convert.',
          misconception: 'Students believe a "good discussion" means everyone speaks equally and agrees on a single interpretation.',
          parts: [
                { id: 'a', prompt: 'A student says, "The poem \'cukjl\' is sad because the village is disappearing." How would you turn this opinion into a valid discussion point using the poem\'s.', answer: 'Valid discussion point: "In stanza 3, the repetition \'èkhjs&èkhjs\' describes the',
                  options: ['Valid discussion point: "In stanza 3, the repetition \'èkhjs&èkhjs\' describes the', 'good discussion'],
                  hint: 'If stuck, re-read stanza 2 and 4 of "cukjl" and list every sensory image; then convert each image.',
                  misconception: 'Students believe a "good discussion" means everyone speaks equally and agrees on a single interpretation.' },
                { id: 'b', prompt: 'During a discussion on "cukjl", a peer claims the poem romanticizes the village.', answer: 'Step 1: Paraphrase',
                  options: ['Step 1: Paraphrase', 'good discussion'],
                  hint: 'If stuck, re-read stanza 2 and 4 of "cukjl" and list every sensory image; then convert each image.',
                  misconception: 'Students believe a "good discussion" means everyone speaks equally and agrees on a single interpretation.' },
                { id: 'c', prompt: 'Compare two discussion points for "cukjl": (A) "The city is shown as noisy and crowded." (B) "Stanza 1 uses \'olar\' and \'coaMj\' to depict the city; stanza 2.', answer: 'Point B generates deeper analysis',
                  options: ['Point B generates deeper analysis', 'better', 'good discussion'],
                  hint: 'If stuck, re-read stanza 2 and 4 of "cukjl" and list every sensory image; then convert each image.',
                  misconception: 'Students believe a "good discussion" means everyone speaks equally and agrees on a single interpretation.' }
          ],
            remediations: { 'a-good-discussion-means-everyone': { steps: ['Revisit c12_hin_a_cbse_04_006 (Theme) and c12_hin_a_cbse_04_008 (Literary Devices) to extract 5 concrete textual.', 'Convert each detail into an open question using the stem: "How does [detail] in stanza [X] shape the poem\'s view.', 'Practice with a partner: one asks, the other answers *only* with textual evidence; then switch.', 'Record a 3-minute discussion, replay, and mark every utterance that quotes or references the text — aim for >80%.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
