import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch02_p1: SimDef = {
    id: 'v3_c9_engl_ch02_p1',
    title: 'The Pot Maker · Part 1/2',
    subtitle: 'A potter\'s daughter vs. a mother\'s fear',
    classLevel: 9, subject: 'engl', topic: 'The Pot Maker · Part 1/2',
    chapters: ['c9_engl_ch02'],
    nodeIds: ['c9_engl_ch2_1', 'c9_engl_ch2_10', 'c9_engl_ch2_2', 'c9_engl_ch2_3', 'c9_engl_ch2_4', 'c9_engl_ch2_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biographer condensing a life story', intro: 'A girl wants to spin clay like her grandfather; her mother wants a salary slip. Tell the whole story in 150 words — without losing the cultural stakes or the mother\'s very real worry.', goal: 'Write a structured summary of \'The Pot Maker\' — Sentila\'s dream, the conflict with Arenla, secret practice, exhibition and resolution — selecting plot-critical events over every detail.' },
    discovery: {
        question: 'Sentila\'s mother blocks her from learning pottery — not because she hates the craft, but for a reason many parents would recognise. What is it?',
        options: ['She wants the security of formal education and a government job — pottery looks like a low-income dead end, not a career', 'She thinks pots are unlucky', 'She wants Sentila to marry instead', 'She doesn\'t want her copying the grandfather'],
        answer: 'She wants the security of formal education and a government job — pottery looks like a low-income dead end, not a career',
        hook: 'The conflict isn\'t love vs hate — it\'s security vs calling. Arenla\'s worry is economic, not emotional. And the story resolves not by argument but by proof: the village exhibition makes Sentila\'s talent undeniable.',
    },
    teaching: [
        { title: 'Story Summary: Sentila\'s Pursuit of Pot Making', text: 'A story summary is a concise retelling of the narrative\'s essential elements—main character, setting, central conflict, key events, and resolution—in the student\'s own words, without personal opinion.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch2_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Compress Sentila\'s story into a board-ready summary: the Naga village setting, the education-vs-tradition conflict, the secret practice with her grandfather\'s tools, the exhibition triumph — ordered, compressed, no copied sentences.',
        labels: ['Story Summary: Sentila\'s Pursuit', 'Values: Perseverance and Respect', 'Character Analysis: Sentila', 'Character Analysis: Arenla (Mother)', 'Theme: Following One\'s Passion', 'Theme: Traditional Crafts'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch2_1', title: 'Story Summary: Sentila\'s Pursuit of Pot Making',
          caseStudy: { intro: 'Imagine you have just watched a short film about a girl who wants to be a potter in a village where girls are expected to study for government jobs.',
            decisions: [{ prompt: 'What are the five essential elements that must appear in a story summary?', options: [
                { text: 'The five essential elements are: (1) main character, (2) setting, (3) central conflict,', outcome: 'The five essential elements are: (1) main character, (2) setting, (3) central conflict, (4) key.' },
                { text: 'beginning, middle, end', outcome: 'Not quite — Students believe a summary is a shortened version of every paragraph.', reveals: 'a-summary-is-a-shortened' },
                { text: 'a summary is a shortened version of every paragraph', outcome: 'Not quite — Students believe a summary is a shortened version of every paragraph.', reveals: 'a-summary-is-a-shortened' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch2_10', title: 'Values: Perseverance and Respect for Traditional Skills',
          caseStudy: { intro: 'Imagine you\'re watching a potter at a village fair – the clay looks messy, the wheel wobbles, and the first few pots collapse.',
            decisions: [{ prompt: 'What are the two core values highlighted in "The Pot Maker" through Sentila\'s journey?', options: [
                { text: 'The two core values are perseverance (Sentila\'s continued effort despite failures and', outcome: 'The two core values are perseverance (Sentila\'s continued effort despite failures and opposition).' },
                { text: 'hard work', outcome: 'Not quite — Students often treat "perseverance" and "respect for traditional skills" as separate, parallel.', reveals: 'students-often-treat-perseverance-and' },
                { text: 'tradition', outcome: 'Not quite — Students often treat "perseverance" and "respect for traditional skills" as separate, parallel.', reveals: 'students-often-treat-perseverance-and' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch2_2', title: 'Character Analysis: Sentila and Her Determination',
          caseStudy: { intro: 'Imagine you want to pursue a career your family considers unconventional — like a boy wanting to be a classical dancer or a girl wanting to be a mechanic.',
            decisions: [{ prompt: 'What is the primary character trait that defines Sentila in "The Pot Maker"? State the trait and give one example from the story.', options: [
                { text: 'Sentila\'s defining trait is determination', outcome: 'Sentila\'s defining trait is determination — specifically, quiet persistence in learning pottery.' },
                { text: 'she is rebellious', outcome: 'Not quite — Students equate determination with dramatic struggle or verbal assertion (e.g., "She fought for her.', reveals: 'students-equate-determination-with-dramatic' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch2_3', title: 'Character Analysis: Arenla (Mother) and Her Concerns',
          caseStudy: { intro: 'Imagine you are Arenla, a mother in a Naga village. Your daughter Sentila wants to make pots instead of studying for a government job.',
            decisions: [{ prompt: 'Who is Arenla and what is her relationship to the protagonist?', options: [
                { text: 'Arenla is Sentila\'s mother in "Sentila\'s Pursuit of Pot Making." She is a parent in a', outcome: 'Arenla is Sentila\'s mother in "Sentila\'s Pursuit of Pot Making." She is a parent in a Naga village.' },
                { text: 'she is the antagonist', outcome: 'Not quite — Students label Arenla as "the opposing mother" or "the antagonist" without analyzing her.', reveals: 'students-label-arenla-as-the' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch2_4', title: 'Theme: Following One\'s Passion Against Family Expectations',
          caseStudy: { intro: 'Imagine you love painting, but your parents insist you study engineering because it\'s "secure." That knot in your stomach -- that\'s the heartbeat of this.',
            decisions: [{ prompt: 'What is the central thematic conflict in "The Pot Maker" expressed as a tension between two opposing forces?', options: [
                { text: 'The central thematic conflict is the tension between Sentila\'s individual passion for', outcome: 'The central thematic conflict is the tension between Sentila\'s individual passion for pottery and.' },
                { text: 'Sentila wants to be a potter', outcome: 'Not quite — Students often treat "following passion" as a single heroic moment of defiance (e.g., Sentila.', reveals: 'students-often-treat-following-passion' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch2_5', title: 'Theme: Traditional Crafts and Vocations',
          caseStudy: { intro: 'Imagine you visit your grandmother\'s village and see her making bamboo baskets the same way her grandmother did -- but your parents want you to become.',
            decisions: [{ prompt: 'What is the definition of a traditional vocation as presented in the context of Class 9 literature studies?', options: [
                { text: 'A traditional vocation is an occupation passed down through generations within a', outcome: 'A traditional vocation is an occupation passed down through generations within a community.' },
                { text: 'an old job', outcome: 'Not quite — Students treat "traditional crafts" as static museum pieces rather than living economic activities.', reveals: 'students-treat-traditional-crafts-as' },
                { text: 'handicraft', outcome: 'Not quite — Students treat "traditional crafts" as static museum pieces rather than living economic activities.', reveals: 'students-treat-traditional-crafts-as' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Asked to summarise \'Sentila\'s Pursuit of Pot Making,\' a student writes: \'Sentila wants to make pots. Her mother says no. She practices secretly. There is a fair. Her pots win. Mother is happy.\'',
            decisions: [{ prompt: 'What is missing from this summary?', options: [
                { text: 'The substance: the Naga village setting, why Arenla objects — she sees a government job as security and pottery as an uncertain craft — the grandfather\'s legacy behind Sentila\'s passion, and the exhibition where public admiration finally turns the mother. Plot points without stakes are not a summary.', outcome: 'This restores the conflict\'s reasons and the cultural context that make the resolution meaningful — the difference between a gist and a board-level summary.' },
                { text: 'Nothing — it is short, in order, and hits every event, which is all a summary requires.', outcome: 'It omits the setting, the mother\'s actual reasoning and the craft\'s significance; brevity without the conflict\'s cause is just a chopped plot list.', reveals: 'short-is-summary' },
                { text: 'The summary fails only because it never says whether pottery or education was the better choice.', outcome: 'A summary does not adjudicate; it reports the conflict and its resolution — the verdict belongs to the story, not the student.', reveals: 'summary-must-judge' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch2_5', title: 'The bigger picture',
          caseStudy: { intro: 'A summary selects and compresses — it isn\'t every paragraph shrunk. Keep the five elements (character, setting, conflict, key events, resolution) and let the minor scenes go.',
            decisions: [{ prompt: 'What comes next? The Pot Maker · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Pot Maker · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch2_1', difficulty: 'standard',
          question: 'A story summary is a concise retelling of the narrative\'s essential.',
          hint: 'Review "Plot and Setting" (c6_english_u1_001) and practice the.',
          misconception: 'Students believe a summary is a shortened version of every paragraph.',
          parts: [
                { id: 'a', prompt: 'In your own words, explain why Sentila\'s mother Arenla initially opposes her learning pottery.', answer: 'Arenla opposes Sentila\'s pursuit',
                  options: ['Arenla opposes Sentila\'s pursuit', 'Arenla hates pottery', 'a summary is a shortened version of every paragraph'],
                  hint: 'Review "Plot and Setting" (c6_english_u1_001) and practice the "Somebody-Wanted-But-So-Then" frame.',
                  misconception: 'Students believe a summary is a shortened version of every paragraph.' },
                { id: 'b', prompt: 'Given the following disordered events, arrange them in the correct chronological order for a summary: (a) Sentila\'s pots are displayed at the village.', answer: 'Correct order: (b) → (d) → (a) → (c)',
                  options: ['Correct order: (b) → (d) → (a) → (c)', 'a summary is a shortened version of every paragraph'],
                  hint: 'Review "Plot and Setting" (c6_english_u1_001) and practice the "Somebody-Wanted-But-So-Then" frame.',
                  misconception: 'Students believe a summary is a shortened version of every paragraph.' }
          ],
            remediations: { 'a-summary-is-a-shortened': { steps: ['Give the student a two-column table: left column "Text Events," right column "Summary-Worthy?" with Yes/No.', 'Have them mark only events that change the conflict or character.', 'Model merging three "Yes" events into one complex sentence using a participle phrase (e.g., "After practicing secretly.', 'Ask them to rewrite the summary using only the merged sentences.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a summary is a shortened version of every paragraph.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student summary: "Sentila wants to make pots. Her mother says no. She practices secretly. Then there is a fair. Her pots win.', answer: 'Insufficient',
                  options: ['Insufficient', 'a summary is a shortened version of every paragraph'],
                  hint: 'Review "Plot and Setting" (c6_english_u1_001) and practice the "Somebody-Wanted-But-So-Then" frame.',
                  misconception: 'Students believe a summary is a shortened version of every paragraph.' }
          ],
            remediations: { 'a-summary-is-a-shortened': { steps: ['Give the student a two-column table: left column "Text Events," right column "Summary-Worthy?" with Yes/No.', 'Have them mark only events that change the conflict or character.', 'Model merging three "Yes" events into one complex sentence using a participle phrase (e.g., "After practicing secretly.', 'Ask them to rewrite the summary using only the merged sentences.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch2_10', difficulty: 'standard',
          question: 'Perseverance in "The Pot Maker" is the sustained effort to master a difficult.',
          hint: 'If stuck, review the kiln disaster scene in c9_engl_ch2_1 and the mother-daughter.',
          misconception: 'Students often treat "perseverance" and "respect for traditional skills" as separate, parallel themes – one about.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "respect for traditional skills" to this scenario: A city designer visits the village, calls the pottery "rustic aesthetic," and wants.', answer: 'The story would critique this as exploitation, not respect',
                  options: ['The story would critique this as exploitation, not respect', 'modernization', 'wider appreciation'],
                  hint: 'If stuck, review the kiln disaster scene in c9_engl_ch2_1 and the mother-daughter resolution.',
                  misconception: 'Students often treat "perseverance" and "respect for traditional skills" as separate, parallel themes – one about Sentila\'s character, the.' }
          ],
            remediations: { 'students-often-treat-perseverance-and': { steps: ['If a student separates the values, do this 3-step remediation: (1) Have them re-read the kiln disaster scene and list.', '(2) Ask: "Could she have solved the cracking problem without her grandmother\'s ash technique?" The answer (no) proves.', '(3) Then examine Arenla\'s final words: "You\'ve given our pottery new life." Ask: "What would happen to the tradition.', 'This makes the fusion visible in the text\'s cause-effect logic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch2_2', difficulty: 'standard',
          question: 'Character analysis is the systematic examination of a literary character\'s.',
          hint: 'Review "Show, Don\'t Tell" in character analysis from c8_engl_ch4_2 (Rakesh\'s actions.',
          misconception: 'Students equate determination with dramatic struggle or verbal assertion (e.g., "She fought for her right!").',
          parts: [
                { id: 'a', prompt: 'What is the primary character trait that defines Sentila in "The Pot Maker"? State the trait and give one example from the story.', answer: 'Sentila\'s defining trait is determination',
                  options: ['Sentila\'s defining trait is determination', 'she is rebellious'],
                  hint: 'Review "Show, Don\'t Tell" in character analysis from c8_engl_ch4_2 (Rakesh\'s actions revealing.',
                  misconception: 'Students equate determination with dramatic struggle or verbal assertion (e.g., "She fought for her right!").' },
                { id: 'b', prompt: 'Explain in your own words how Sentila\'s determination differs from Jahnavi\'s determination in "The Day the River Spoke" (Class 6).', answer: 'Similarity: Both pursue dreams denied by tradition (Jahnavi: education',
                  options: ['Similarity: Both pursue dreams denied by tradition (Jahnavi: education', 'both fight openly'],
                  hint: 'Review "Show, Don\'t Tell" in character analysis from c8_engl_ch4_2 (Rakesh\'s actions revealing.',
                  misconception: 'Students equate determination with dramatic struggle or verbal assertion (e.g., "She fought for her right!").' }
          ],
            remediations: { 'students-equate-determination-with-dramatic': { steps: ['Re-read the wheel scene aloud — notice verbs: "returned", "listened", "adjusted", "waited".', 'Compare with Jahnavi (c6_english_u1_002): make a T-chart of "Spoken vs Silent Actions".', 'Write one PEEL paragraph using ONLY verbs from the text as evidence.', 'Ask: "What would happen if Sentila shouted?" — discuss with peer using cultural context (Naga village hierarchy).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch2_3', difficulty: 'standard',
          question: 'Character analysis of Arenla (Sentila\'s mother) involves examining her traits.',
          hint: 'Revisit c9_engl_ch2_2 (Sentila\'s character analysis) to understand the protagonist\'s.',
          misconception: 'Students label Arenla as "the opposing mother" or "the antagonist" without analyzing her motivations.',
          parts: [
                { id: 'a', prompt: 'What is Arenla\'s primary concern about Sentila\'s desire to make pots?', answer: 'Arenla\'s primary concern is Sentila\'s future security and social standing',
                  options: ['Arenla\'s primary concern is Sentila\'s future security and social standing', 'she hates pottery'],
                  hint: 'Revisit c9_engl_ch2_2 (Sentila\'s character analysis) to understand the protagonist\'s perspective.',
                  misconception: 'Students label Arenla as "the opposing mother" or "the antagonist" without analyzing her motivations.' }
          ],
            remediations: { 'students-label-arenla-as-the': { steps: ['Give the student a two-column table: "What Arenla says/does" | "What it reveals about her motivation." 2.', 'Have them fill three rows from the story.', 'Ask: "Is Arenla trying to control Sentila, or protect her?', 'What evidence supports your answer?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch2_4', difficulty: 'standard',
          question: 'Theme analysis of "Following One\'s Passion Against Family Expectations".',
          hint: 'Review c9_engl_ch2_2 and c9_engl_ch2_3 -- specifically, re-read the "Character.',
          misconception: 'Students often treat "following passion" as a single heroic moment of defiance (e.g., Sentila declaring "I won\'t.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Arenla opposes Sentila\'s desire to become a potter. What does her opposition reveal about the theme?', answer: 'Arenla opposes pottery',
                  options: ['Arenla opposes pottery', 'follow your dreams', 'dreams collide with a parent\'s lived experience of hardship', 'controlling'],
                  hint: 'Review c9_engl_ch2_2 and c9_engl_ch2_3 -- specifically, re-read the "Character Motivation" sections.',
                  misconception: 'Students often treat "following passion" as a single heroic moment of defiance (e.g., Sentila declaring "I won\'t study!").' }
          ],
            remediations: { 'students-often-treat-following-passion': { steps: ['If a student writes "Sentila rebels against her mother," do this: 1) Ask them to find the exact page where Sentila.', '2) Have them list three things Sentila *does* (wakes early, practices wheel, carries pots to market) and three things.', '3) Ask: "Who changed more?" Guide them to see Arenla\'s shift from fear to pride is earned by Sentila\'s *output*, not.', '4) Rewrite the theme statement together: "Passion persuades through proof, not protest."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch2_5', difficulty: 'standard',
          question: 'Traditional crafts and vocations refer to skilled occupations passed down.',
          hint: 'If stuck, review c9_engl_ch2_4\'s analysis of the mother-daughter conflict -- the.',
          misconception: 'Students treat "traditional crafts" as static museum pieces rather than living economic activities.',
          parts: [
                { id: 'a', prompt: 'What is the definition of a traditional vocation as presented in the context of Class 9 literature studies?', answer: 'A traditional vocation is an occupation passed down through generations within a',
                  options: ['A traditional vocation is an occupation passed down through generations within a', 'an old job', 'handicraft'],
                  hint: 'If stuck, review c9_engl_ch2_4\'s analysis of the mother-daughter conflict -- the traditional craft.',
                  misconception: 'Students treat "traditional crafts" as static museum pieces rather than living economic activities.' }
          ],
            remediations: { 'students-treat-traditional-crafts-as': { steps: ['Have the student reread only the paragraphs describing Sentila\'s actual work process -- preparing clay, throwing pots.', 'Ask: "What problems does she solve daily? What decisions require judgment?"', 'List her as a problem-solver: adjusting clay consistency for humidity, designing for urban taste, timing firings.', 'Rewrite the theme statement using only verbs from this list -- "Traditional craft survives when practitioners adapt.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
