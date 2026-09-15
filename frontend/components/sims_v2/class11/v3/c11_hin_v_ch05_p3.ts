import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch05_p3: SimDef = {
    id: 'v3_c11_hin_v_ch05_p3',
    title: 'jktLFkku dh jtr cw¡nas · Part 3/3',
    subtitle: 'Read Rajasthani folk tales as a people\'s archive of honour codes.',
    classLevel: 11, subject: 'hin_v', topic: 'jktLFkku dh jtr cw¡nas · Part 3/3',
    chapters: ['c11_hin_v_ch05'],
    nodeIds: ['c11_hin_v_cbse_05_013', 'c11_hin_v_cbse_05_014', 'c11_hin_v_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an archivist cross-checking ballads against records', intro: 'Desert kingdoms, bards, and sacrifices that look irrational — until you learn the code they\'re written in.', goal: 'Decode the cultural rules inside Rajasthani folk narratives and analyse their non-linear structure.' },
    discovery: {
        question: 'A Rajput tale has a widow choose jauhar and a steward bankrupt himself for his lord — madness, or a code you\'re missing?',
        options: ['A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour', 'Madness — no rational person chooses death', 'A code — but only kings followed it', 'Madness — folk tales aren\'t bound by logic'],
        answer: 'A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour',
        hook: 'Vishnu Prabhakar worked the Rajasthan State Archives for decades — these aren\'t fairy tales but itihaas, history as the people witnessed it.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking in literary analysis refers to the ability to examine a text beyond its literal meaning, evaluating the author\'s choices (such as structure, language, symbolism, and perspective).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_05_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Match archival motifs (jauhar, sakha, bhamashah) to the folk narratives, then weigh why the story\'s trauma stays unresolved at the end.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you are a journalist investigating why a once-green kingdom has turned barren.',
            decisions: [{ prompt: 'What is the primary allegorical meaning of the "white hair" (jtr cw¡nsa) in the story "jktLFkku dh jtr cw¡nas"?', options: [
                { text: 'The white hair allegorically represents the loss of forest cover/greenery due to', outcome: 'The white hair allegorically represents the loss of forest cover/greenery due to environmental.' },
                { text: 'the king\'s aging', outcome: 'Not quite — Students often treat "critical thinking" as merely finding faults in the story or expressing.', reveals: 'students-often-treat-critical-thinking' },
                { text: 'wisdom', outcome: 'Not quite — Students often treat "critical thinking" as merely finding faults in the story or expressing.', reveals: 'students-often-treat-critical-thinking' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'Imagine you sit in the exam hall and see a question: "How does the author use the protagonist\'s silence to critique the feudal system?',
            decisions: [{ prompt: 'What is the full form of the PEEL structure used for writing analytical answers in Hindi literature, and what does each letter stand for.', options: [
                { text: 'PEEL stands for **P**oint (मुख्य बात/दावा), **E**vidence (पाठ्य साक्ष्य/घटना),', outcome: 'PEEL stands for **P**oint (मुख्य बात/दावा), **E**vidence (पाठ्य साक्ष्य/घटना), **E**xplanation.' },
                { text: 'difficult', outcome: 'Not quite — Students believe that writing a good Hindi answer means using "difficult" or "Sanskritized".', reveals: 'writing-a-good-hindi-answer' },
                { text: 'Sanskritized', outcome: 'Not quite — Students believe that writing a good Hindi answer means using "difficult" or "Sanskritized".', reveals: 'writing-a-good-hindi-answer' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a Class 11 literature circle discussing why the author describes the palace windows as "जर्जर" (dilapidated) yet "स्मृतियों का भंडार".',
            decisions: [{ prompt: 'Define "evidence-based discussion point" in the context of analyzing "जक्तल्फक्कु ध झत्र च्वनस" and give one example from the chapter\'s.', options: [
                { text: 'An evidence-based discussion point is an analytical claim about the text supported by a', outcome: 'An evidence-based discussion point is an analytical claim about the text supported by a specific.' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students believe "discussion points" are personal opinions or emotional reactions ("मुझे लगा कि...".', reveals: 'discussion-points-are-personal-opinions' },
                { text: 'discussion points', outcome: 'Not quite — Students believe "discussion points" are personal opinions or emotional reactions ("मुझे लगा कि...".', reveals: 'discussion-points-are-personal-opinions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your history club presents Vishnu Prabhakar\'s \'Rajasthan ki Jatir Kahaniyan\'. A member dismisses the folk narratives: \'Oral tales aren\'t real history — no dates, no documents, just bards embellishing. And the story jumps around in time, so it\'s badly organised.\'',
            decisions: [{ prompt: 'How do you defend both the form and the history?', options: [
                { text: 'Defend both: these narratives are \'itihaas\' — history as witnessed by the people — which is why Prabhakar, a historian-storyteller in the post-Independence recovery of subaltern histories, documented them; the Rajasthani-infused language carries cultural codes a document can\'t. And the non-linearity is design: time-shifts reveal the protagonist\'s trauma gradually — the climax is an internal realisation, not an external event.', outcome: 'The club reframes: oral tradition is an archive with its own grammar, and the scrambled chronology is how the story performs memory rather than reports it.' },
                { text: 'Concede — oral tales are entertainment; real history needs documents and dates.', outcome: 'That repeats the bias that erased subaltern experience: these tales preserve what archives ignored — the people\'s own witness.', reveals: 'oral-tales-arent-history' },
                { text: 'Rearrange the story chronologically for the presentation — linear order is clearer.', outcome: 'The non-linear order is the meaning: trauma surfaces in fragments; straightening it destroys the emotional architecture built by the flashbacks.', reveals: 'linearize-the-narrative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'The archive and the bard tell the same past in different inks — folk narrative is history that refused to be filed away.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_013', difficulty: 'standard',
          question: 'Critical thinking in literary analysis refers to the ability to examine a text.',
          hint: 'If stuck, review the symbolism and irony nodes (c11_hin_v_cbse_05_008.',
          misconception: 'Students often treat "critical thinking" as merely finding faults in the story or expressing personal dislike.',
          parts: [
                { id: 'a', prompt: 'What is the primary allegorical meaning of the "white hair" (jtr cw¡nsa) in the story "jktLFkku dh jtr cw¡nas"?', answer: 'The white hair allegorically represents the loss of forest cover/greenery due to',
                  options: ['The white hair allegorically represents the loss of forest cover/greenery due to', 'the king\'s aging', 'wisdom', 'I think the king was foolish'],
                  hint: 'If stuck, review the symbolism and irony nodes (c11_hin_v_cbse_05_008, c11_hin_v_cbse_05_009) and.',
                  misconception: 'Students often treat "critical thinking" as merely finding faults in the story or expressing personal dislike.' }
          ],
            remediations: { 'students-often-treat-critical-thinking': { steps: ['Ask the student to highlight every adjective used for the king and every description of the land in two different.', 'Have them list what the king *says* vs.', 'what the land *shows* in a two-column table.', 'Guide them to write one sentence connecting a specific irony (e.g., "crown of white hair" vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_014', difficulty: 'standard',
          question: 'Writing Skills based on the chapter refers to the ability to construct.',
          hint: 'If stuck, review **c11_hin_v_cbse_05_013 (Critical Thinking)** — specifically the.',
          misconception: 'Students believe that writing a good Hindi answer means using "difficult" or "Sanskritized" vocabulary (e.g., "शोषण".',
          parts: [
                { id: 'a', prompt: 'What is the full form of the PEEL structure used for writing analytical answers in Hindi literature, and what does each letter stand for in the context of.', answer: 'PEEL stands for **P**oint (मुख्य बात/दावा), **E**vidence (पाठ्य साक्ष्य/घटना),',
                  options: ['PEEL stands for **P**oint (मुख्य बात/दावा), **E**vidence (पाठ्य साक्ष्य/घटना),', 'difficult', 'Sanskritized', 'प्रतिरोध'],
                  hint: 'If stuck, review **c11_hin_v_cbse_05_013 (Critical Thinking)** — specifically the distinction.',
                  misconception: 'Students believe that writing a good Hindi answer means using "difficult" or "Sanskritized" vocabulary (e.g., "शोषण" instead of "जुल्म".' },
                { id: 'b', prompt: 'Compare two ways of embedding textual evidence in a Hindi answer: (A) Direct quote: "उसने कहा, \'मैं झूठ नहीं बोलूंगा\'।" (B) Paraphrase: "जब उससे झूठे कागज़ पर.', answer: 'For **character analysis**, direct quotes (A) are superior',
                  options: ['For **character analysis**, direct quotes (A) are superior', 'difficult', 'Sanskritized', 'प्रतिरोध'],
                  hint: 'If stuck, review **c11_hin_v_cbse_05_013 (Critical Thinking)** — specifically the distinction.',
                  misconception: 'Students believe that writing a good Hindi answer means using "difficult" or "Sanskritized" vocabulary (e.g., "शोषण" instead of "जुल्म".' }
          ],
            remediations: { 'writing-a-good-hindi-answer': { steps: ['If a student submits a flowery, evidence-free answer: 1.', '**Highlight** every sentence in their answer with three colors: Yellow = Point/Claim, Green = Textual Evidence, Blue.', 'If a color is missing, that PEEL component is absent.', '**Rewrite one paragraph together** using only Class 9-level Hindi vocabulary but strict PEEL structure — prove that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that writing a good Hindi answer means using "difficult" or "Sanskritized" vocabulary (e.g., "शोषण".',
          parts: [
                { id: 'a', prompt: 'Evaluate this student\'s claim: "Since the chapter is a translation from another language, we should not focus on specific Hindi words or phrases used by the.', answer: '**Refute.** Board exams (CBSE Hindi Core/Elective) assess *close reading of the',
                  options: ['**Refute.** Board exams (CBSE Hindi Core/Elective) assess *close reading of the', 'difficult', 'Sanskritized', 'प्रतिरोध'],
                  hint: 'If stuck, review **c11_hin_v_cbse_05_013 (Critical Thinking)** — specifically the distinction.',
                  misconception: 'Students believe that writing a good Hindi answer means using "difficult" or "Sanskritized" vocabulary (e.g., "शोषण" instead of "जुल्म".' }
          ],
            remediations: { 'writing-a-good-hindi-answer': { steps: ['If a student submits a flowery, evidence-free answer: 1.', '**Highlight** every sentence in their answer with three colors: Yellow = Point/Claim, Green = Textual Evidence, Blue.', 'If a color is missing, that PEEL component is absent.', '**Rewrite one paragraph together** using only Class 9-level Hindi vocabulary but strict PEEL structure — prove that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'If stuck, review c11_hin_v_cbse_05_013 (Critical Thinking) for argument generation and.',
          misconception: 'Students believe "discussion points" are personal opinions or emotional reactions ("मुझे लगा कि..." / "यह दुखद है").',
          parts: [
                { id: 'a', prompt: 'Explain why simply stating "the author uses irony in describing the palace" is an incomplete discussion point, and show how to complete it using a specific.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'A wrong answer (e.g', 'discussion points', 'मुझे लगा कि'],
                  hint: 'If stuck, review c11_hin_v_cbse_05_013 (Critical Thinking) for argument generation and.',
                  misconception: 'Students believe "discussion points" are personal opinions or emotional reactions ("मुझे लगा कि..." / "यह दुखद है") rather than textual.' },
                { id: 'b', prompt: 'During a discussion on the theme of "folk memory vs. official history," a peer claims: "The folk songs in the chapter are just decorative." Using two specific.', answer: 'Response: "I hear you',
                  options: ['Response: "I hear you', 'A wrong answer (e.g', ') reveals inability to cite evidence or engage dialogically', 'are personal opinions or emotional reactions ('],
                  hint: 'If stuck, review c11_hin_v_cbse_05_013 (Critical Thinking) for argument generation and.',
                  misconception: 'Students believe "discussion points" are personal opinions or emotional reactions ("मुझे लगा कि..." / "यह दुखद है") rather than textual.' },
                { id: 'c', prompt: 'Compare how two different discussion points — one focusing on the protagonist\'s displacement (csch gkynkj\'s migration) and another on the palace\'s.', answer: 'Point 1 (displacement): Requires evidence of csch gkynkj\'s forced migration',
                  options: ['Point 1 (displacement): Requires evidence of csch gkynkj\'s forced migration', 'sadness', 'discussion points', 'मुझे लगा कि'],
                  hint: 'If stuck, review c11_hin_v_cbse_05_013 (Critical Thinking) for argument generation and.',
                  misconception: 'Students believe "discussion points" are personal opinions or emotional reactions ("मुझे लगा कि..." / "यह दुखद है") rather than textual.' }
          ],
            remediations: { 'discussion-points-are-personal-opinions': { steps: ['Give the student a 2-column template: Column A = "My Claim" (one sentence), Column B = "Textual Evidence" (page/line.', 'Have them convert three past "opinions" into evidence-based points using the chapter.', 'Pair them with a peer who models "building on" language ("आपके बिंदु को आगे बढ़ाते हुए..." / "इसके विपरीत पाठ में...").', 'Record a 2-minute practice discussion; replay and highlight every unsupported claim with a red flag.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
