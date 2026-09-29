import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch17_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch17_p3: SimDef = {
    id: 'v3_c12_hin_a_ch17_p3',
    title: 'कुटज · Part 3/3',
    subtitle: 'The courtyard is its mornings — not its name',
    classLevel: 12, subject: 'hin_a', topic: 'कुटज · Part 3/3',
    chapters: ['c12_hin_a_ch17'],
    nodeIds: ['c12_hin_a_cbse_17_013', 'c12_hin_a_cbse_17_014', 'c12_hin_a_cbse_17_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Philosophical-essay reader', intro: 'A scholar who ran All India Radio asks whether a word should come from the dictionary or from the courtyard where life happens.', goal: 'Read Aangan through naam-versus-svaroop — social labels against lived essence, tyag as uncelebrated art.' },
    discovery: {
        question: 'An Aadhaar number opens every door — subsidies, banks, travel — yet it isn\'t you. A 1950s essayist said this exact thing about \'naam\' and \'svaroop.\' What\'s the split?',
        options: ['Name is society\'s label, svaroop is lived essence — the courtyard is who gathers in it, not what it\'s called; labels serve administration, not truth', 'Aadhaar is fake identity', 'Names are always wrong', 'Svaroop means appearance'],
        answer: 'Name is society\'s label, svaroop is lived essence — the courtyard is who gathers in it, not what it\'s called; labels serve administration, not truth',
        hook: 'Mishra insists on \'aangan\' over the Sanskritised \'angana\' — the lived word carries cow-dung smell and children\'s play; the formal word is sterile. And tyag is redefined: not self-denial or heroic martyrdom but daily, uncelebrated duty — a mother\'s life as art.',
    },
    teaching: [
        { title: 'कुटज — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'अंतरा भाग-2 — पाठ 17\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_17_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Stand in a courtyard at dawn: watch the space reveal itself as process, not object; weigh name against essence; and test whether sacrifice is suffering or transcendence.',
        labels: ['कुटज — आलोचनात्मक चिंतन', 'कुटज — लेखन कौशल', 'कुटज — वाचन-श्रवण: चर्चा-बिंदु'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_013', title: 'कुटज — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 17\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।',
            decisions: [{ prompt: 'What is the primary distinction the author draws between \'uke\' (नाम) and \':i\' (रूप) in the essay "oqQVt"?', options: [
                { text: 'The author distinguishes \'uke\' as the label imposed by society/history (social identity,', outcome: 'The author distinguishes \'uke\' as the label imposed by society/history (social identity, fixed.' },
                { text: 'merely says "name vs', outcome: 'Not quite — Students often confuse \'critical analysis\' with \'listing literary devices\'.', reveals: 'students-often-confuse-critical-analysis' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_014', title: 'कुटज — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 17\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'What is the full form of PEEL in the context of writing analytical answers for Hindi literature, and what does each letter represent?', options: [
                { text: 'PEEL stands for Point, Evidence, Explanation, Link', outcome: 'PEEL stands for Point, Evidence, Explanation, Link. Point = the main argument or topic sentence.' },
                { text: 'Paragraph, Example, Explain, Line', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing the plot or listing.', reveals: 'writing-skills-based-on-the' },
                { text: 'writing skills based on the chapter', outcome: 'Not quite — Students believe "writing skills based on the chapter" means summarizing the plot or listing.', reveals: 'writing-skills-based-on-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_015', title: 'कुटज — वाचन-श्रवण: चर्चा-बिंदु',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 17\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What is the primary purpose of "evidence-based discussion" in the context of analyzing a literary text like "oqQVt"?', options: [
                { text: 'The primary purpose is to ground interpretations in specific textual details (words,', outcome: 'The primary purpose is to ground interpretations in specific textual details (words, phrases.' },
                { text: 'to express personal feelings about the story', outcome: 'Not quite — Students believe "discussion" means taking turns stating opinions ("I feel the author.', reveals: 'discussion-means-taking-turns-stating' },
                { text: 'discussion', outcome: 'Not quite — Students believe "discussion" means taking turns stating opinions ("I feel the author.', reveals: 'discussion-means-taking-turns-stating' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a housing-for-all poster contest, a teammate\'s entry shows a glossy apartment block with the line \'shelter = square feet.\' You recall the essay that starts on a mud-walled village lane and ends in a Sanskrit verse on what makes a dwelling a home.',
            decisions: [{ prompt: 'How would the essay \'कुटिर\' reframe the poster?', options: [
                { text: 'Shift the claim from floor area to shelter-as-value — the essay builds from one village lane to etymology to a universal ideal precisely to show a home is protection offered without discrimination, not a purchasable quantity.', outcome: 'The chapter\'s method is the message: digression from concrete scene to philosophy is how the essay lifts \'house\' into \'home\' — the poster needs that ascent, not a bigger number.' },
                { text: 'Keep the poster — for a scheme, square footage is the honest measurable promise.', outcome: 'Measurability isn\'t the essay\'s unit of meaning: the text argues a dwelling earns its name by what it shelters, and a poster that equates home with area repeats the reduction the essay spends its length undoing.', reveals: 'home-equals-area' },
                { text: 'Drop both and show a Sanskrit shloka alone — the philosophical ending is the essay\'s best part.', outcome: 'The verse lands because the village lane came first — the essay\'s frame pairs particular scene with universal ideal; keeping the abstraction without the mud walls cuts the argument\'s root.', reveals: 'abstraction-alone-convinces' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_17_015', title: 'You made it',
          caseStudy: { intro: 'You can now separate the label from the life — and hear a Sanskrit scholar argue that the truest word is the one that\'s been lived in.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_013', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'If stuck, revisit the distinction between \'summary\' and \'analysis\' using Class 11 node.',
          misconception: 'Students often confuse \'critical analysis\' with \'listing literary devices\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 17\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'अंतरा भाग-2 — पाठ 17\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 17\' का कथानक — \'अंतरा भाग-2 — पाठ 17\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 17\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, revisit the distinction between \'summary\' and \'analysis\' using Class 11 node.',
                  misconception: 'Students often confuse \'critical analysis\' with \'listing literary devices\'.' }
          ],
            remediations: { 'students-often-confuse-critical-analysis': { steps: ['If a student falls into device‑spotting: (1) Give them a one‑paragraph argument (e.g., "Social media connects us") and.', 'What is assumed?" (2) Map the same questions onto the essay: "What is Phosne\'s claim about \'oqQVt\'?', 'What evidence (etymology, anecdote, Gita) does he use?', 'What does he assume about tradition vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_014', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, review c12_hin_a_cbse_17_013 (Critical Thinking) for interpretive claims and.',
          misconception: 'Students believe "writing skills based on the chapter" means summarizing the plot or listing themes.',
          parts: [
                { id: 'a', prompt: 'What is the full form of PEEL in the context of writing analytical answers for Hindi literature, and what does each letter represent?', answer: 'PEEL stands for Point, Evidence, Explanation, Link',
                  options: ['PEEL stands for Point, Evidence, Explanation, Link', 'Paragraph, Example, Explain, Line', 'writing skills based on the chapter', 'knowledge of content'],
                  hint: 'If stuck, review c12_hin_a_cbse_17_013 (Critical Thinking) for interpretive claims and.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the plot or listing themes.' },
                { id: 'b', prompt: 'In the chapter "oqQVt", the author writes ":i O;fDr&lR; gS] uke lekt&lR;A" (Form is individual reality; name is social reality).', answer: 'The student reduces a dialectical relationship to a binary dismissal',
                  options: ['The student reduces a dialectical relationship to a binary dismissal', 'writing skills based on the chapter', 'knowledge of content', 'ability to argue using content'],
                  hint: 'If stuck, review c12_hin_a_cbse_17_013 (Critical Thinking) for interpretive claims and.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the plot or listing themes.' },
                { id: 'c', prompt: 'Compare how the chapter treats "thuk" (grief/sorrow) and "LokFkZ" (universal welfare). The author calls thuk both "dyk" (art) and "riL;k" (discipline).', answer: 'Thuk as "dyk" implies aesthetic shaping',
                  options: ['Thuk as "dyk" implies aesthetic shaping', 'writing skills based on the chapter', 'knowledge of content', 'ability to argue using content'],
                  hint: 'If stuck, review c12_hin_a_cbse_17_013 (Critical Thinking) for interpretive claims and.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the plot or listing themes.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student produces summaries instead of analyses: (1) Give them a 3-sentence "bad answer" (summary) and a 3-sentence.', '(2) Have them take ONE theme (e.g., "name vs form") and complete this template: "The author argues that ______.', 'This is evident when ______.', 'Ultimately this reveals ______." (3) Assign a micro-task: write ONLY the Point and Link sentences for three different.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "writing skills based on the chapter" means summarizing the plot or listing themes.',
          parts: [
                { id: 'a', prompt: 'A student writes this thesis for an essay on "oqQVt": "The chapter teaches us that home is where the heart is." Evaluate this thesis statement for a Class 12.', answer: 'Insufficient',
                  options: ['Insufficient', 'writing skills based on the chapter', 'knowledge of content', 'ability to argue using content'],
                  hint: 'If stuck, review c12_hin_a_cbse_17_013 (Critical Thinking) for interpretive claims and.',
                  misconception: 'Students believe "writing skills based on the chapter" means summarizing the plot or listing themes.' }
          ],
            remediations: { 'writing-skills-based-on-the': { steps: ['If a student produces summaries instead of analyses: (1) Give them a 3-sentence "bad answer" (summary) and a 3-sentence.', '(2) Have them take ONE theme (e.g., "name vs form") and complete this template: "The author argues that ______.', 'This is evident when ______.', 'Ultimately this reveals ______." (3) Assign a micro-task: write ONLY the Point and Link sentences for three different.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_17_015', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 17\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'If stuck, return to c12_hin_a_cbse_17_013 (Critical Thinking) and re-do the "inference.',
          misconception: 'Students believe "discussion" means taking turns stating opinions ("I feel the author is saying...") without textual.',
          parts: [
                { id: 'a', prompt: 'In "oqQVt," the author writes: ":i O;fDr&lR; gS] uke lekt&lR;A" (Form is individual reality; name is social reality).', answer: 'The distinction means ":i" (form/essence) is who a person truly is',
                  options: ['The distinction means ":i" (form/essence) is who a person truly is', 'name and form are the same thing', 'discussion', 'I feel the author is saying'],
                  hint: 'If stuck, return to c12_hin_a_cbse_17_013 (Critical Thinking) and re-do the "inference ladder".',
                  misconception: 'Students believe "discussion" means taking turns stating opinions ("I feel the author is saying...") without textual evidence.' },
                { id: 'b', prompt: 'Apply the "State-Quote-Explain-Invite" discussion cycle to this claim: "The author suggests that true home (oqQVt) is not a physical house but a state.', answer: 'State: True home is existential, not architectural',
                  options: ['State: True home is existential, not architectural', 'Does anyone see a counter-example where physical space anchors identity?', 'oqQfVgkfjdk', 'discussion'],
                  hint: 'If stuck, return to c12_hin_a_cbse_17_013 (Critical Thinking) and re-do the "inference ladder".',
                  misconception: 'Students believe "discussion" means taking turns stating opinions ("I feel the author is saying...") without textual evidence.' },
                { id: 'c', prompt: 'Compare how the concept of "thuk" (thirst/longing) functions on page 135 ("thuk Hkh ,d dyk gS...', answer: 'On page 135, "thuk" is human longing',
                  options: ['On page 135, "thuk" is human longing', 'both mean the same thing', 'discussion', 'I feel the author is saying'],
                  hint: 'If stuck, return to c12_hin_a_cbse_17_013 (Critical Thinking) and re-do the "inference ladder".',
                  misconception: 'Students believe "discussion" means taking turns stating opinions ("I feel the author is saying...") without textual evidence.' }
          ],
            remediations: { 'discussion-means-taking-turns-stating': { steps: ['If a student cannot produce evidence-based discussion: (1) Have them re-read pages 130-136 with a highlighter, marking.', '(2) Practice the 4-step cycle in writing first: fill a template [Point | Quote (with page) | Explanation | Question for.', '(3) Do a "fishbowl" drill: student observes two peers modeling the cycle, then names each step they saw.', '(4) Re-attempt Diagnostic Question 3 orally with the template as scaffold.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
