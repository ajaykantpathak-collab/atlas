import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eng_v_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eng_v_ch03_p3: SimDef = {
    id: 'v3_c12_eng_v_ch03_p3',
    title: 'Journey to the End of the Earth · Part 3/3',
    subtitle: 'Humanity arrived in the last seconds — and changed the climate anyway',
    classLevel: 12, subject: 'eng_v', topic: 'Journey to the End of the Earth · Part 3/3',
    chapters: ['c12_eng_v_ch03'],
    nodeIds: ['c12_eng_v_cbse_03_013', 'c12_eng_v_cbse_03_014', 'c12_eng_v_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Environmental essayist', intro: 'A ship of schoolchildren heads to the frozen archive where Earth keeps its past — and its prognosis.', goal: 'Read Antarctica as planetary archive — Gondwana, ice cores and the case for intergenerational climate education.' },
    discovery: {
        question: 'On Earth\'s geological clock, all of human civilisation fits in the last seconds — yet \'for humans, the prognosis isn\'t good.\' How can a blink of a species threaten a 500-million-year system?',
        options: ['Because we\'ve changed the atmosphere\'s boundary conditions faster than the planet can adapt — a CO₂ blanket rearranges climate the way continental drift once did', 'We can\'t — the claim is exaggerated', 'Industry is bigger than geology', 'Ice melts every summer anyway'],
        answer: 'Because we\'ve changed the atmosphere\'s boundary conditions faster than the planet can adapt — a CO₂ blanket rearranges climate the way continental drift once did',
        hook: 'This isn\'t a travelogue — it\'s a geological argument wearing a journey\'s clothes. Antarctica\'s ice cores hold half a million years of carbon records; Gondwana\'s breakup rearranged the climate once, and our emissions are rearranging it again — the same scale of forcing, at a thousand times the speed.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis involves examining a text beyond its surface meaning to evaluate the author\'s purpose, perspective, and techniques, and to interpret how these elements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eng_v_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Join Students on Ice at the bottom of the world: read the continent as archive — Gondwana\'s drift, the circumpolar current, the frozen carbon diary — and weigh why teenagers, not tourists, were taken there.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a policy-maker reading this travelogue to decide whether to fund Antarctic research.',
            decisions: [{ prompt: 'What is the primary purpose of Tishani Doshi\'s narrative in "Journey to the End of the Earth"?', options: [
                { text: 'The primary purpose is to advocate for planetary awareness by showing how Antarctica\'s', outcome: 'The primary purpose is to advocate for planetary awareness by showing how Antarctica\'s geological.' },
                { text: 'to describe a travel experience', outcome: 'Not quite — Students often treat critical thinking as \'giving an opinion\' about the text (e.g., \'I liked the.', reveals: 'students-often-treat-critical-thinking' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you just returned from a school trip to a glacier in Ladakh and your principal asks you to write a speech for the morning assembly on "Why Melting.',
            decisions: [{ prompt: 'Define the PEEL structure and state the recommended word limit for a CBSE Class 12 Article writing task.', options: [
                { text: 'PEEL stands for Point (topic sentence), Evidence (textual quote/fact), Explanation', outcome: 'PEEL stands for Point (topic sentence), Evidence (textual quote/fact), Explanation (analysis.' },
                { text: 'PEEL is for essays only', outcome: 'Not quite — Students believe "using chapter content" means summarising the story in their writing.', reveals: 'using-chapter-content-means-summarising' },
                { text: 'word limit is 200 words', outcome: 'Not quite — Students believe "using chapter content" means summarising the story in their writing.', reveals: 'using-chapter-content-means-summarising' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you are at a youth climate summit and need to discuss the urgency of protecting Antarctica.',
            decisions: [{ prompt: 'List two discussion topics from the chapter that relate to climate change.', options: [
                { text: 'Correct answer: (1) The melting of the West Antarctic ice sheet and its impact on sea', outcome: 'Correct answer: (1) The melting of the West Antarctic ice sheet and its impact on sea levels; (2).' },
                { text: 'global warming', outcome: 'Not quite — Students think discussion points are just personal opinions ("I think...") without textual.', reveals: 'discussion-points-are-just-personal' },
                { text: 'I think', outcome: 'Not quite — Students think discussion points are just personal opinions ("I think...") without textual.', reveals: 'discussion-points-are-just-personal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'You\'re back from an internship field visit to a shrinking wetland and must write it up. Your draft is a day-by-day diary: arrived, walked, sampled water, came home.',
            decisions: [{ prompt: 'How would the structure of \'Journey to the End of the Earth\' improve it?', options: [
                { text: 'Restructure it as an argument, not a diary — open with the sensory arrival, flash back to the wetland\'s deep history, lay out the human damage, describe the restoration effort, and end on one epiphanic moment of physically standing in the water.', outcome: 'Doshi makes structure the argument: the Gondwana timescale reframes the present, the Students on Ice section pivots from despair to agency, and the walk on the frozen ocean condenses the whole thesis into one moment.' },
                { text: 'Keep the diary — chronological order is the most honest record of what you actually did.', outcome: 'That produces the summary-level reading the chapter warns against: the geological flashback isn\'t \'background\', it\'s the device that makes the later data mean something; without it the visit is a list of events.', reveals: 'chronology-equals-honesty' },
                { text: 'Cut the personal parts and report only the data so it reads as objective science.', outcome: 'The text\'s first-person reflective voice is what anchors geological scale in human perception; stripping the \'I\' loses the epiphany that turns information into responsibility.', reveals: 'objectivity-needs-no-i' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eng_v_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You can now argue Antarctica\'s case on geological timescales — and explain why one white continent holds the planet\'s whole medical record.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis involves examining a text beyond its.',
          hint: 'If stuck, review the difference between \'theme\' and \'thesis\' using node.',
          misconception: 'Students often treat critical thinking as \'giving an opinion\' about the text (e.g., \'I liked the description.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Critical thinking in literary analysis involves examining a text beyond its surface',
                  options: ['Critical thinking in literary analysis involves examining a text beyond its surface', 'The "Before You Read" section is a pre-reading pedagogical tool that activates prior', 'Plot and narrative structure in a non-fiction travelogue like "Journey to the End of the', 'Setting refers to the time, place, and physical environment where a narrative unfolds'],
                  hint: 'If stuck, review the difference between \'theme\' and \'thesis\' using node c12_eng_v_cbse_03_006, then.',
                  misconception: 'Students often treat critical thinking as \'giving an opinion\' about the text (e.g., \'I liked the description of icebergs\') rather than.' }
          ],
            remediations: { 'students-often-treat-critical-thinking': { steps: ['Revisit node c12_eng_v_cbse_03_008 (Literary Devices: Imagery and Metaphor) to identify specific devices in the text.', 'Practice the PEEL structure (Point, Evidence, Explanation, Link) using a short passage: pick one claim about author\'s.', 'Re-attempt Diagnostic Question 4 with the PEEL scaffold.', 'If still struggling, review Class 11 critical thinking nodes (e.g., c11_eng_h_cbse_01_013) for analytical frameworks.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter "Journey to the End of the Earth" refers.',
          hint: 'If stuck, revisit c11_eng_h_cbse_01_014 (Class 11 Article Writing) and practise PEEL.',
          misconception: 'Students believe "using chapter content" means summarising the story in their writing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing Skills based on the chapter "Journey to the End of the Earth" refers to the',
                  options: ['Writing Skills based on the chapter "Journey to the End of the Earth" refers to the', 'The "Before You Read" section is a pre-reading pedagogical tool that activates prior', 'Plot and narrative structure in a non-fiction travelogue like "Journey to the End of the', 'Setting refers to the time, place, and physical environment where a narrative unfolds'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_014 (Class 11 Article Writing) and practise PEEL.',
                  misconception: 'Students believe "using chapter content" means summarising the story in their writing.' }
          ],
            remediations: { 'using-chapter-content-means-summarising': { steps: ['Show the student a side-by-side comparison: a 3-mark summary paragraph vs.', 'a 5-mark PEEL paragraph on the same topic.', 'Have them highlight every sentence in their draft and label it P, E, E, or L.', 'Sentences that don\'t fit any label are likely summary — delete or convert.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "using chapter content" means summarising the story in their writing.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s analytical paragraph claim: "Tishani Doshi uses the Gondwana supercontinent only to show India and Antarctica were once connected.".', answer: 'No, it is incomplete',
                  options: ['No, it is incomplete', 'where we\'ve come from and where we could possibly be heading', 'evolution and extinction', 'using chapter content'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_014 (Class 11 Article Writing) and practise PEEL.',
                  misconception: 'Students believe "using chapter content" means summarising the story in their writing.' },
                { id: 'b', prompt: 'Create a 50-word diary entry from the perspective of a Students on Ice participant the night after the "Walk on the Ocean" episode.', answer: '*March 12, 2025, 22:00 hrs, aboard Akademik Shokalskiy* Tonight I still feel the',
                  options: ['*March 12, 2025, 22:00 hrs, aboard Akademik Shokalskiy* Tonight I still feel the', 'using chapter content', '"using chapter content" means summarising the story in their writing'],
                  hint: 'If stuck, revisit c11_eng_h_cbse_01_014 (Class 11 Article Writing) and practise PEEL.',
                  misconception: 'Students believe "using chapter content" means summarising the story in their writing.' }
          ],
            remediations: { 'using-chapter-content-means-summarising': { steps: ['Show the student a side-by-side comparison: a 3-mark summary paragraph vs.', 'a 5-mark PEEL paragraph on the same topic.', 'Have them highlight every sentence in their draft and label it P, E, E, or L.', 'Sentences that don\'t fit any label are likely summary — delete or convert.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eng_v_cbse_03_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to structured oral activities.',
          hint: 'Revisit the theme nodes (006, 007) and list three theme statements with two quotes each.',
          misconception: 'Students think discussion points are just personal opinions ("I think...") without textual anchoring.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Speaking and Listening: Discussion Points refers to structured oral activities where',
                  options: ['Speaking and Listening: Discussion Points refers to structured oral activities where', 'The "Before You Read" section is a pre-reading pedagogical tool that activates prior', 'Plot and narrative structure in a non-fiction travelogue like "Journey to the End of the', 'Setting refers to the time, place, and physical environment where a narrative unfolds'],
                  hint: 'Revisit the theme nodes (006, 007) and list three theme statements with two quotes each.',
                  misconception: 'Students think discussion points are just personal opinions ("I think...") without textual anchoring.' }
          ],
            remediations: { 'discussion-points-are-just-personal': { steps: ['Remediation: 1) Revisit c12_eng_v_cbse_03_006 (Primary Theme) and 007 (Secondary Themes) to list theme statements with.', '2) Practice turning each theme into an open-ended question using the stem "How does the text suggest...?" 3) Do.', '4) Re-diagnose with Diagnostic Question 3 to check if the student can now counter a misconception with evidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
