import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_s_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_s_ch04_p3: SimDef = {
    id: 'v3_c11_eng_s_ch04_p3',
    title: 'Birth · Part 3/3',
    subtitle: 'Find why the story\'s climax is a gasp, not a birth.',
    classLevel: 11, subject: 'eng_s', topic: 'Birth · Part 3/3',
    chapters: ['c11_eng_s_ch04'],
    nodeIds: ['c11_eng_s_cbse_04_013', 'c11_eng_s_cbse_04_014', 'c11_eng_s_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a young doctor fighting a stillborn case at midnight', intro: 'A miner\'s cottage, no equipment, a stillborn child and a fading mother — and a doctor who arrived doubting his own profession.', goal: 'Place the true climax and explain why the resolution follows Andrew\'s arc, not the Morgans\'.' },
    discovery: {
        question: 'The baby is delivered at last — and lies lifeless. Many readers call the birth the climax. Where does the true turning point fall?',
        options: ['The resuscitation — the child\'s first cry is the irreversible pivot of both the medical and Andrew\'s identity arcs', 'The delivery — biggest event equals climax', 'The injection that saves the mother', 'Walking home at dawn — the quiet ending resolves everything'],
        answer: 'The resuscitation — the child\'s first cry is the irreversible pivot of both the medical and Andrew\'s identity arcs',
        hook: 'The delivery creates a crisis instead of ending one — climax is the turn, not the title event.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the advanced literary skill of examining a text\'s deeper layers—such as authorial intent, narrative perspective, thematic complexity, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_s_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map injection, resuscitation, first cry and the dawn walk onto the arc, and defend an ending that skips the mother\'s recovery.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a doctor like Andrew, exhausted after a 3-hour delivery where the baby appears stillborn—your textbooks say "stop," but something inside says.',
            decisions: [{ prompt: 'Define "narrative perspective" in the context of "Birth" and identify whose consciousness the reader primarily accesses during the.', options: [
                { text: 'Narrative perspective refers to the vantage point from', outcome: 'Narrative perspective refers to the vantage point from which the story is told; in "Birth," the.' },
                { text: 'omniscient narrator', outcome: 'Not quite — Students often treat "critical analysis" as hunting for *hidden symbols* (e.g., "the oil lamp.', reveals: 'students-often-treat-critical-analysis' },
                { text: 'the midwife\'s view', outcome: 'Not quite — Students often treat "critical analysis" as hunting for *hidden symbols* (e.g., "the oil lamp.', reveals: 'students-often-treat-critical-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you just witnessed Andrew Manson revive a lifeless baby in that cramped Welsh bedroom — the kettle boiling, the midwife whimpering, the old grandmother.',
            decisions: [{ prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. A wrong answer (e.g., "Paragraph, Example.' },
                { text: 'Paragraph, Example, Explanation, Line', outcome: 'Not quite — Students believe writing a character sketch means listing adjectives (brave, kind, tired) with.', reveals: 'writing-a-character-sketch-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are Andrew Manson standing in that scullery at dawn, telling Joe Morgan "Both all right." What makes that moment "real" compared to your medical.',
            decisions: [{ prompt: 'What are the three discussion questions explicitly given at the end of the chapter "Birth" in the NCERT textbook?', options: [
                { text: 'The three questions are: (1) "I have done something', outcome: 'The three questions are: (1) "I have done something; oh, God! I\'ve done something real at last.".' },
                { text: 'themes instead of questions', outcome: 'Not quite — Students often treat "discussion points" as a Q&A session where each person answers the question.', reveals: 'students-often-treat-discussion-points' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a literature-and-society seminar you\'re asked to modernise \'Birth\' — a young doctor resuscitating a stillborn baby in a 1920s Welsh mining cottage — \'just change the date to 2025, keep everything else identical\'. A classmate agrees: \'A birth is a birth; the decade doesn\'t change the drama.\'',
            decisions: [{ prompt: 'Would transplanting the story unchanged work?', options: [
                { text: 'No — the drama is built from 1920s Welsh mining conditions: no NHS, a doctor\'s fee a miner must weigh, no antibiotics, chloroform risks, the midwife\'s authority, a family that has already buried children. Cronin was himself a doctor writing from that world; move the date and every pressure that drives the scene evaporates.', outcome: 'Context is the living environment shaping each choice — poverty dictates the medical stakes; \'a birth is a birth\' erases why this one was a miracle.' },
                { text: 'The classmate is right — medical drama is timeless; resuscitation tension needs no period.', outcome: 'The tension came from scarcity — waiting on a \'company doctor\', paying for a midwife, working without modern equipment; 2025 changes all of it.', reveals: 'medical-drama-is-timeless' },
                { text: 'Context just means knowing Cronin was a doctor — the mining-town poverty is set dressing.', outcome: 'Biography alone explains authenticity, not stakes; the miner\'s wages, the absent safety net and infant mortality are what make the all-night fight to save the baby urgent.', reveals: 'context-is-author-bio-only' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_s_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'Andrew walks home having \'done something real at last\' — the arc belonged to the doctor, not the delivery.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the advanced literary skill.',
          hint: 'Review "narrative perspective" in c11_eng_s_cbse_04_002 and practice marking "Andrew\'s.',
          misconception: 'Students often treat "critical analysis" as hunting for *hidden symbols* (e.g., "the oil lamp = hope") rather than.',
          parts: [
                { id: 'a', prompt: 'Define "narrative perspective" in the context of "Birth" and identify whose consciousness the reader primarily accesses during the resuscitation scene.', answer: 'Narrative perspective refers to the vantage point from',
                  options: ['Narrative perspective refers to the vantage point from', 'omniscient narrator', 'the midwife\'s view'],
                  hint: 'Review "narrative perspective" in c11_eng_s_cbse_04_002 and practice marking "Andrew\'s lens" vs.',
                  misconception: 'Students often treat "critical analysis" as hunting for *hidden symbols* (e.g., "the oil lamp = hope") rather than examining *how the text.' }
          ],
            remediations: { 'students-often-treat-critical-analysis': { steps: ['**Re-anchor in evidence**: Have the student highlight *only* sentences describing Andrew\'s physical sensations during.', '**Map sensation to emotion**: For each sensation, ask "What is he feeling *in that second*?" building a two-column.', '**Synthesize**: Show how the *sequence* of sensations (numbness → frenzy → tactile confirmation of life) *is* the.', '**Practice**: Assign a 150-word analysis of one paragraph using the "sensation → emotion → meaning" chain.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter "Birth" refers to the ability to compose.',
          hint: 'Review PEEL method using a simple non-literary example (e.g., "School uniforms should.',
          misconception: 'Students believe writing a character sketch means listing adjectives (brave, kind, tired) with one-line examples.',
          parts: [
                { id: 'a', prompt: 'What does the acronym PEEL stand for in the context of writing structured answers for literature?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explanation, Line'],
                  hint: 'Review PEEL method using a simple non-literary example (e.g., "School uniforms should.',
                  misconception: 'Students believe writing a character sketch means listing adjectives (brave, kind, tired) with one-line examples.' }
          ],
            remediations: { 'writing-a-character-sketch-means': { steps: ['Have the student highlight every action Andrew takes in the delivery scene (paras 10-15).', 'For each action, ask: "What trait does this show?" and "Which words prove it?" 3.', 'Co-construct one PEEL paragraph together: Point (trait), Evidence (quoted action), Explanation (why it matters), Link.', 'Assign a second trait for independent practice with the same scaffold.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_s_cbse_04_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review c11_eng_s_cbse_04_013 (Critical Thinking) and practice the.',
          misconception: 'Students often treat "discussion points" as a Q&A session where each person answers the question once and the.',
          parts: [
                { id: 'a', prompt: 'What are the three discussion questions explicitly given at the end of the chapter "Birth" in the NCERT textbook?', answer: 'The three questions are: (1) "I have done something',
                  options: ['The three questions are: (1) "I have done something', 'themes instead of questions'],
                  hint: 'If stuck, review c11_eng_s_cbse_04_013 (Critical Thinking) and practice the.',
                  misconception: 'Students often treat "discussion points" as a Q&A session where each person answers the question once and the discussion ends.' },
                { id: 'b', prompt: 'Apply Discussion Question 1 to a specific moment in the story: Choose the exact paragraph where Andrew says "I\'ve done something real at last" and explain what.', answer: 'The statement occurs in the final paragraph as Andrew walks with miners',
                  options: ['The statement occurs in the final paragraph as Andrew walks with miners', 'contrasts with his earlier', 'of marriage he witnessed (Bramwell, Page, Denny) and his own', 'state where his'],
                  hint: 'If stuck, review c11_eng_s_cbse_04_013 (Critical Thinking) and practice the.',
                  misconception: 'Students often treat "discussion points" as a Q&A session where each person answers the question once and the discussion ends.' }
          ],
            remediations: { 'students-often-treat-discussion-points': { steps: ['If a student gives only a single-sentence answer and stops, intervene with: "That\'s a claim.', 'Now, find the sentence in the story that *forces* you to think that.', 'Then ask the group: \'Does anyone read that sentence differently?\'" Model this by taking their claim, quoting the.', 'Require them to respond to at least one peer\'s interpretation before adding a new point.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
