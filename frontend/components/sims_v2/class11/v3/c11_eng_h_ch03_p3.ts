import type { SimDef } from '../../engine/types';

/** v3 generated — c11_eng_h_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_eng_h_ch03_p3: SimDef = {
    id: 'v3_c11_eng_h_ch03_p3',
    title: 'Discovering Tut: the Saga Continues · Part 3/3',
    subtitle: 'Read a 3,300-year-old cold case where the first detectives damaged the body.',
    classLevel: 11, subject: 'eng_h', topic: 'Discovering Tut: the Saga Continues · Part 3/3',
    chapters: ['c11_eng_h_ch03'],
    nodeIds: ['c11_eng_h_cbse_03_013', 'c11_eng_h_cbse_03_014', 'c11_eng_h_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a forensic reader working a pharaoh\'s cold case', intro: 'A mummy cemented in gold by ritual resins, a scan three millennia late — reconstruct what each era did to the evidence.', goal: 'Distinguish narrative order from chronology and evaluate how earlier interventions shaped the forensic record.' },
    discovery: {
        question: 'The article opens on the 2005 CT scan, jumps back to Carter\'s 1922 dig, then further back to Akhenaten\'s reign. Why scramble the timeline?',
        options: ['The flashbacks are rising action — they build the mystery of Tut\'s death that the scan must solve', 'Chronology doesn\'t matter in non-fiction', 'The scan is dull, so history is added for colour', 'The author couldn\'t decide where to begin'],
        answer: 'The flashbacks are rising action — they build the mystery of Tut\'s death that the scan must solve',
        hook: 'This is a cold case, not a chronicle — every jump backward is a clue the 2005 scan was called in to read.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical thinking on \'Discovering Tut: the Saga Continues\' — analysing the text to reach evidence-based judgements.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_eng_h_cbse_03_013', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reorder the article\'s events into narrative order versus historical order, then assess what Carter\'s chiselling did to the evidence modern forensics inherited.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Analyse \'Discovering Tut: the Saga Continues\' — is the writer\'s purpose achieved? Support your judgement with textual evidence.',
            decisions: [{ prompt: 'Define "forensic reconstruction" as used in the context of the chapter and state its primary purpose in the investigation of King Tut\'s.', options: [
                { text: 'Forensic reconstruction is the scientific process of recreating the likely physical', outcome: 'Forensic reconstruction is the scientific process of recreating the likely physical appearance and.' },
                { text: 'rebuilding the tomb', outcome: 'Not quite — Students often believe "critical thinking" in English means **criticizing the text** (finding.', reveals: 'critical-thinking-in-english-means' },
                { text: 'restoring the gold mask', outcome: 'Not quite — Students often believe "critical thinking" in English means **criticizing the text** (finding.', reveals: 'critical-thinking-in-english-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_014', title: 'Writing Skills: Based on the Chapter',
          caseStudy: { intro: 'For written answers on \'Discovering Tut: the Saga Continues\', cite the text — evidence-based writing proves your reading.',
            decisions: [{ prompt: 'What is the mandatory structural element that distinguishes a formal report from an article in CBSE Class 11 English Core?', options: [
                { text: 'A formal report requires a headline, byline (reporter\'s name/designation), and a lead', outcome: 'A formal report requires a headline, byline (reporter\'s name/designation), and a lead paragraph.' },
                { text: 'both need a headline and byline only', outcome: 'Not quite — Students treat "writing based on the chapter" as summarizing the story in the chosen format.', reveals: 'students-treat-writing-based-on' },
                { text: 'content from the chapter', outcome: 'Not quite — Students treat "writing based on the chapter" as summarizing the story in the chosen format.', reveals: 'students-treat-writing-based-on' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Talk through \'Discovering Tut: the Saga Continues\' — share your reading, listen to others, and let the text settle the argument.',
            decisions: [{ prompt: 'What are the four specific discussion prompts given in the NCERT "Talking about the text" section for this chapter?', options: [
                { text: 'The four prompts are: (1) Scientific intervention is necessary to unearth buried mysteries', outcome: 'The four prompts are: (1) Scientific intervention is necessary to unearth buried mysteries.' },
                { text: 'curse of the pharaoh', outcome: 'Not quite — Students treat "discussion" as sharing personal opinions ("I feel Tut shouldn\'t be scanned") rather.', reveals: 'students-treat-discussion-as-sharing' },
                { text: 'treasure hunting', outcome: 'Not quite — Students treat "discussion" as sharing personal opinions ("I feel Tut shouldn\'t be scanned") rather.', reveals: 'students-treat-discussion-as-sharing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your archaeology-club poster on King Tut lists: \'1323 BCE — died; 1922 — tomb found; 2005 — CT scan.\' A teammate says the three dates are just facts to memorise, and asks why the 2005 team couldn\'t simply \'look at the body properly this time\'.',
            decisions: [{ prompt: 'How do the three events actually connect?', options: [
                { text: 'As a causal chain: Carter\'s 1922 excavation chiselled and dismembered the mummy to free it from hardened resins — creating the very damage the 2005 CT scan had to work around; and the 1323 BCE context (Akhenaten\'s religious upheaval) explains Tut\'s name change and the dynasty\'s collapse. The scan exists because the earlier handling destroyed what direct inspection could have answered.', outcome: 'Context is relational: each phase caused the next phase\'s problems — the article is about how evolving technology re-reads a mishandled past.' },
                { text: 'The teammate is right — dates are a list; the 2005 team just needed better eyes than Carter\'s crew.', outcome: 'The scan wasn\'t about better eyesight — 1,700 cross-sectional images were needed precisely because the body had been cut apart and reassembled in 1922.', reveals: 'context-as-memorised-dates' },
                { text: 'Carter\'s team was careful and professional; the damage story is exaggerated.', outcome: 'The text documents the dismemberment plainly; romanticising the discovery hides why forensic scanning became necessary eighty years later.', reveals: 'carter-did-no-damage' }
            ] }] } },
        { type: 'case', nodeId: 'c11_eng_h_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'Tut\'s body reached the scanner already broken — by the resins that buried him and the rescue that dismembered him.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_013', difficulty: 'standard',
          question: 'Critical thinking on \'Discovering Tut: the Saga Continues\' — analysing the text.',
          hint: 'If stuck, review the "Understanding the text" Q1 (reasons) and Q2 (listing deeds/results).',
          misconception: 'Students often believe "critical thinking" in English means **criticizing the text** (finding faults with the author\'s.',
          parts: [
                { id: 'a', prompt: 'Analyze how the author uses the motif of "wind" and "silence" at the beginning and end of the narrative to frame the CT scan event.', answer: 'The opening wind represents chaotic, supernatural resistance',
                  options: ['The opening wind represents chaotic, supernatural resistance', 'weather description', 'critical thinking'],
                  hint: 'If stuck, review the "Understanding the text" Q1 (reasons) and Q2 (listing deeds/results) in the.',
                  misconception: 'Students often believe "critical thinking" in English means **criticizing the text** (finding faults with the author\'s writing or the.' }
          ],
            remediations: { 'critical-thinking-in-english-means': { steps: ['**Clarify the terminology**: Write "Critical = Critique (judgment of merit)" vs.', '"Critical = Analysis (dissection of parts)" on the board.', 'Ask the student to sort 5 sample statements into the two columns.', '**Model the shift**: Take a simple complaint ("The ending was boring") and collaboratively transform it into.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "critical thinking" in English means **criticizing the text** (finding faults with the author\'s.',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s claim that "Archaeology has changed substantially...', answer: 'The claim is **partially undermined** by the text\'s own narrative weight',
                  options: ['The claim is **partially undermined** by the text\'s own narrative weight', 'Yes, because they used CT scans', 'critical thinking'],
                  hint: 'If stuck, review the "Understanding the text" Q1 (reasons) and Q2 (listing deeds/results) in the.',
                  misconception: 'Students often believe "critical thinking" in English means **criticizing the text** (finding faults with the author\'s writing or the.' }
          ],
            remediations: { 'critical-thinking-in-english-means': { steps: ['**Clarify the terminology**: Write "Critical = Critique (judgment of merit)" vs.', '"Critical = Analysis (dissection of parts)" on the board.', 'Ask the student to sort 5 sample statements into the two columns.', '**Model the shift**: Take a simple complaint ("The ending was boring") and collaboratively transform it into.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_014', difficulty: 'standard',
          question: 'Writing skills from \'Discovering Tut: the Saga Continues\' — using the text as.',
          hint: 'Review c11_eng_h_cbse_03_012 (comprehension) for factual extraction and c6_english_u5_049.',
          misconception: 'Students treat "writing based on the chapter" as summarizing the story in the chosen format.',
          parts: [
                { id: 'a', prompt: 'Explain why embedding the phrase "The ritual resins had hardened, cementing Tut to the bottom of his solid gold coffin" as direct speech in a formal letter.', answer: 'Formal letters require reported/indirect speech for textual evidence to maintain',
                  options: ['Formal letters require reported/indirect speech for textual evidence to maintain', 'content from the chapter', 'plot summary'],
                  hint: 'Review c11_eng_h_cbse_03_012 (comprehension) for factual extraction and c6_english_u5_049 (formal.',
                  misconception: 'Students treat "writing based on the chapter" as summarizing the story in the chosen format.' }
          ],
            remediations: { 'students-treat-writing-based-on': { steps: ['Give the student two sample reports on the same event: one a chronological summary (flawed), one a news report with.', 'Ask them to highlight the 5Ws in the lead of the model and identify which chronological details were dropped.', 'Have them rewrite the flawed summary into a report by extracting only the scan-night details and adding.', 'Provide a checklist: "Does my lead answer Who/What/When/Where/Why?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_eng_h_cbse_03_015', difficulty: 'standard',
          question: 'Discussion points on \'Discovering Tut: the Saga Continues\' — speaking and.',
          hint: 'If stuck, review the "Archaeology has changed substantially" paragraph (page 24-25) and.',
          misconception: 'Students treat "discussion" as sharing personal opinions ("I feel Tut shouldn\'t be scanned") rather than evidence-based.',
          parts: [
                { id: 'a', prompt: 'During a discussion on "Traditions, rituals and funerary practices must be respected," a student argues: "Carter disrespected Tut by cutting the mummy, so all.', answer: 'Claim: Excavation can be respectful if conducted with modern ethics',
                  options: ['Claim: Excavation can be respectful if conducted with modern ethics', 'groups of two pairs, each pair taking opposite points of view'],
                  hint: 'If stuck, review the "Archaeology has changed substantially" paragraph (page 24-25) and create.',
                  misconception: 'Students treat "discussion" as sharing personal opinions ("I feel Tut shouldn\'t be scanned") rather than evidence-based argumentation.' }
          ],
            remediations: { 'students-treat-discussion-as-sharing': { steps: ['Have the student re-read the "Talking about the text" box and highlight the phrase "each pair taking opposite points.', 'Provide a T-chart template: Column A = "Quote supporting Prompt 1", Column B = "Quote opposing Prompt 1".', 'Practice a 2-minute "evidence-only" drill: student must speak *only* in sentences starting with "The text states...".', 'Debrief: "Did your opinion change when forced to use only textual evidence?" This shifts focus from opinion to analysis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
