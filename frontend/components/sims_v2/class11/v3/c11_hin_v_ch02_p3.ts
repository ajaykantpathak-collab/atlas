import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch02_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch02_p3: SimDef = {
    id: 'v3_c11_hin_v_ch02_p3',
    title: 'ikB\'kkyk tkus osQ fy, · Part 3/3',
    subtitle: 'See a pond as a village\'s constitution, not its engineering.',
    classLevel: 11, subject: 'hin_v', topic: 'ikB\'kkyk tkus osQ fy, · Part 3/3',
    chapters: ['c11_hin_v_ch02'],
    nodeIds: ['c11_hin_v_cbse_02_013', 'c11_hin_v_cbse_02_014', 'c11_hin_v_cbse_02_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village deciding who owns the rain', intro: 'Tankers queue at the municipal tap while the old johad sits dry — the difference between them was never concrete, it was cooperation.', goal: 'Read the johad system as social institution and analyse the chapter\'s inductive structure.' },
    discovery: {
        question: 'Alwar\'s johads brought dead wells back to life — so is water revival basically an engineering project?',
        options: ['No — johads are a social contract: caste, gender and gram-sabha power decide who builds, who shares, who is heard', 'Yes — dig the right pond and the water follows', 'Yes — runoff math is the whole problem', 'No — because johads are religious structures'],
        answer: 'No — johads are a social contract: caste, gender and gram-sabha power decide who builds, who shares, who is heard',
        hook: 'The pond is the easy part — historically the dominant castes controlled the water; revival worked only when women\'s jal sabhas rewrote the sharing rules.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the higher-order cognitive process of deconstructing a literary text to examine its underlying structures, evaluating the author\'s choices (language.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_02_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compute a catchment-to-command ratio for a village, then follow the chapter\'s escalation from grain-share to cash wage to piece-rate labour.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you sit in the exam hall and the question reads: "Explain how the *khadin* system reflects the Thar community\'s deep understanding of soil moisture.".',
            decisions: [{ prompt: 'Define the PEEL structure for writing a literature-based answer in CBSE Class 11 Hindi Core.', options: [
                { text: 'PEEL stands for Point (main claim in one sentence), Evidence (specific textual detail or', outcome: 'PEEL stands for Point (main claim in one sentence), Evidence (specific textual detail or quote).' },
                { text: 'PEEL means writing a summary', outcome: 'Not quite — Students believe "writing skills" means learning *formats* (report, article, speech) by heart.', reveals: 'writing-skills-means-learning-formats' },
                { text: 'writing skills', outcome: 'Not quite — Students believe "writing skills" means learning *formats* (report, article, speech) by heart.', reveals: 'writing-skills-means-learning-formats' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are at a community meeting in a Rajasthan desert village deciding where to build the next house.',
            decisions: [{ prompt: 'What are the three types of sand (इक्यिकुह, इक्रिकुह, ज्स्त्क.खिकुह) described in the chapter, and which one is considered best for.', options: [
                { text: 'The three types are: इक्यिकुह (coarse sand from riverbeds), इक्रिकुह (fine sand from', outcome: 'The three types are: इक्यिकुह (coarse sand from riverbeds), इक्रिकुह (fine sand from dunes), and.' },
                { text: 'misidentifies the composition of ज्स्त्क', outcome: 'Not quite — Students treat discussion as opinion-sharing without textual anchoring.', reveals: 'students-treat-discussion-as-opinion' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_013', title: 'Use it in the wild',
          caseStudy: { intro: 'For a project on water scarcity, a student presents Anupam Mishra\'s johad chapter as \'a DIY guide to building check-dams — shapes, sizes, materials.\' A classmate asks why the chapter spends so long on village meetings and voluntary labour.',
            decisions: [{ prompt: 'What is the chapter really about?', options: [
                { text: 'Read the johad as a social contract, not a technique: the chapter documents a decentralised water democracy — shramdaan and gram sabha decisions, shared labour across caste and gender, the three water categories managed as a common-pool resource. The engineering details serve the argument that community governance, marginalized by modern administration, is what kept wells alive.', outcome: 'The project reframes: the question isn\'t \'how to build a pond\' but \'how a community sustains its water democracy\' — the meetings are the technology.' },
                { text: 'Keep the technical reading — the social passages are human-interest padding around the engineering.', outcome: 'That inverts the essay: the technique is the lens; the analysis of common-pool governance is the subject.', reveals: 'johad-is-engineering-guide' },
                { text: 'Summarise it chronologically — first canals, then johads, then borewells — as a history of water tech.', outcome: 'The text\'s plot is an architecture of persuasion, not a timeline: it deliberately places traditional johads after modern canals to create rhetorical tension.', reveals: 'nonfiction-plot-is-timeline' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_02_015', title: 'You made it',
          caseStudy: { intro: 'The text ends not with a policy memo but trickling streams merging into sweet water — small flows self-organising into abundance is the whole argument.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the higher-order cognitive.',
          hint: 'If stuck, return to node 006 (Primary Theme) and node 009 (Irony/Symbolism)—these two.',
          misconception: 'Students equate "critical thinking" with "finding faults" or "giving opinions," leading them to write subjective.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical Thinking: Analysis and Interpretation is the higher-order cognitive process of',
                  options: ['Critical Thinking: Analysis and Interpretation is the higher-order cognitive process of', 'Before You Read: Context and Background is a pre-reading strategy that equips students', 'Plot and Narrative Structure in non-fiction expository texts refers to the logical', 'Setting refers to the physical, temporal, and social environment in'],
                  hint: 'If stuck, return to node 006 (Primary Theme) and node 009 (Irony/Symbolism)—these two nodes provide.',
                  misconception: 'Students equate "critical thinking" with "finding faults" or "giving opinions," leading them to write subjective reactions ("I feel the.' }
          ],
            remediations: { 'students-equate-critical-thinking-with': { steps: ['Show the student two paragraphs on the same topic: one opinion-based ("The author seems sad about pots dying"), one.', 'Ask them to label each sentence as "claim," "evidence," or "warrant." 3.', 'Have them rewrite the opinion paragraph by inserting textual evidence after every claim.', 'Practice this template on three chapter passages until the structure becomes automatic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_014', difficulty: 'standard',
          question: 'Writing skills based on Chapter 2 ("जक्तLFkku dh jtr cw¡nas") refer to the.',
          hint: 'Review c11_hin_v_cbse_02_010 (Vocabulary) and c11_hin_v_cbse_02_006 (Primary Theme).',
          misconception: 'Students believe "writing skills" means learning *formats* (report, article, speech) by heart.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing skills based on Chapter 2 ("जक्तLFkku dh jtr cw¡nas") refer to the ability to',
                  options: ['Writing skills based on Chapter 2 ("जक्तLFkku dh jtr cw¡nas") refer to the ability to', 'Before You Read: Context and Background is a pre-reading strategy that equips students', 'Plot and Narrative Structure in non-fiction expository texts refers to the logical', 'Setting refers to the physical, temporal, and social environment in'],
                  hint: 'Review c11_hin_v_cbse_02_010 (Vocabulary) and c11_hin_v_cbse_02_006 (Primary Theme).',
                  misconception: 'Students believe "writing skills" means learning *formats* (report, article, speech) by heart.' }
          ],
            remediations: { 'writing-skills-means-learning-formats': { steps: ['Give the student a 5-mark question and a 2/5 sample answer (summary-only). Ask: "What textual proof is missing?"', 'Co-construct a PEEL paragraph on the board using *only* three chapter terms.', 'Assign a "terminology hunt"—list 10 chapter-specific words, define each in one sentence, then use each in a PEEL.', 'Practice timed 5-mark answers where the rubric awards 1 mark each for Point, Evidence, Explanation, Link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills" means learning *formats* (report, article, speech) by heart.',
          parts: [
                { id: 'a', prompt: 'Critique this claim using textual evidence: "The author romanticizes the *khadin* system; modern canals are objectively more efficient for Rajasthan\'s water.', answer: 'The text never claims *khadins* yield more water per hectare',
                  options: ['The text never claims *khadins* yield more water per hectare', 'writing skills', '"writing skills" means learning *formats* (report, article, speech) by heart'],
                  hint: 'Review c11_hin_v_cbse_02_010 (Vocabulary) and c11_hin_v_cbse_02_006 (Primary Theme).',
                  misconception: 'Students believe "writing skills" means learning *formats* (report, article, speech) by heart.' }
          ],
            remediations: { 'writing-skills-means-learning-formats': { steps: ['Give the student a 5-mark question and a 2/5 sample answer (summary-only). Ask: "What textual proof is missing?"', 'Co-construct a PEEL paragraph on the board using *only* three chapter terms.', 'Assign a "terminology hunt"—list 10 chapter-specific words, define each in one sentence, then use each in a PEEL.', 'Practice timed 5-mark answers where the rubric awards 1 mark each for Point, Evidence, Explanation, Link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_02_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to structured oral activities.',
          hint: 'Review the sand classification (pages 13-14) and the building description (pages 15-16).',
          misconception: 'Students treat discussion as opinion-sharing without textual anchoring.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to structured oral activities where',
                  options: ['Speaking and Listening: Discussion Points refers to structured oral activities where', 'Before You Read: Context and Background is a pre-reading strategy that equips students', 'Plot and Narrative Structure in non-fiction expository texts refers to the logical', 'Setting refers to the physical, temporal, and social environment in'],
                  hint: 'Review the sand classification (pages 13-14) and the building description (pages 15-16) with focus.',
                  misconception: 'Students treat discussion as opinion-sharing without textual anchoring.' }
          ],
            remediations: { 'students-treat-discussion-as-opinion': { steps: ['Have the student re-read the sand classification (pages 13-14) and building process (pages 15-16) with a highlighter.', 'Pair them with a peer for "Evidence Tennis": Speaker A makes a claim; Speaker B asks "Which page?" then adds a related.', 'Use a two-column graphic organizer: left column = discussion point, right column = page/line reference.', 'Role-play a village meeting (पंचायत) where every proposal must cite the chapter – e.g., "We should use ज्स्त्क.खिकुह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
