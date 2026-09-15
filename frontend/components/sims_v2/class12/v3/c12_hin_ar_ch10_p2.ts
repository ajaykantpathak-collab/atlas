import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch10_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch10_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch10_p2',
    title: 'èkeZohj Hkkjrh · Part 2/3',
    subtitle: 'A poet wrote prose so a servant\'s life would count',
    classLevel: 12, subject: 'hin_ar', topic: 'èkeZohj Hkkjrh · Part 2/3',
    chapters: ['c12_hin_ar_ch10'],
    nodeIds: ['c12_hin_ar_cbse_10_007', 'c12_hin_ar_cbse_10_008', 'c12_hin_ar_cbse_10_009', 'c12_hin_ar_cbse_10_010', 'c12_hin_ar_cbse_10_011', 'c12_hin_ar_cbse_10_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi sketch-reader', intro: 'From a collection of remembered lives, one woman steps forward — and a child\'s eye becomes the sharpest lens on inequality.', goal: 'Read the sketch through Mahadevi Verma\'s reformist lens — caste, gender and the child\'s innocent gaze.' },
    discovery: {
        question: 'A servant-woman, married at five, widowed young, speaks in village dialect inside a professor\'s household. Why did a poet famous for Chhayavad lyrics choose to record her?',
        options: ['Reformer\'s testimony — Mahadevi Verma ran a girls\' school; the sketch documents caste-gender oppression through a child\'s eyes to demand change', 'She needed a memoir chapter', 'Servants make easy characters', 'Poetry didn\'t sell'],
        answer: 'Reformer\'s testimony — Mahadevi Verma ran a girls\' school; the sketch documents caste-gender oppression through a child\'s eyes to demand change',
        hook: 'Don\'t read it as just a sad servant story — the context stages a power binary (master-servant, caste, literacy) that the child\'s innocent gaze both reveals and unsettles. The Avadhi dialect she speaks is authenticity itself: identity recorded with respect, not corrected.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, motifs, and concerns that run parallel to the primary theme of a literary work, enriching its texture by exploring complementary or contrasting dimensions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'See through the child-narrator\'s eyes: map the household\'s hierarchy before a word of plot, weigh dialect as dignity, and read a memory sketch as social evidence.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are reading "HkfDru" and suddenly pause at the line describing HkfDru\'s hands: "काले-काले हाथ...',
            decisions: [{ prompt: 'Define \'imagery\' (बिम्ब) and \'metaphor\' (रूपक) in your own words, giving one example of each from the text "HkfDru" (do not quote more than.', options: [
                { text: '**Correct answer:** Imagery = sensory language creating mental pictures (e.g., "काले-काले', outcome: '**Correct answer:** Imagery = sensory language creating mental pictures (e.g., "काले-काले हाथ...' },
                { text: 'HkfDru\'s hands were black', outcome: 'Not quite — **The "Imagery = Description" Trap:** Students equate *any* descriptive detail with imagery.', reveals: 'the-imagery-description-trap-students' },
                { text: 'HkfDru is like a bird', outcome: 'Not quite — **The "Imagery = Description" Trap:** Students equate *any* descriptive detail with imagery.', reveals: 'the-imagery-description-trap-students' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are reading "HkfDru" and notice the protagonist’s name means "great" or "grand", yet she is a poor, illiterate domestic worker — this jarring.',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one generic example of each (not from the textbook).', options: [
                { text: 'Irony: A contrast between expectation and reality (e.g., a fire station burning down)', outcome: 'Irony: A contrast between expectation and reality (e.g., a fire station burning down).' },
                { text: 'bad luck', outcome: 'Not quite — Students often label any unfortunate event as "irony" (e.g., "It’s ironic that HkfDru is poor").', reveals: 'students-often-label-any-unfortunate' },
                { text: 'sarcasm only', outcome: 'Not quite — Students often label any unfortunate event as "irony" (e.g., "It’s ironic that HkfDru is poor").', reveals: 'students-often-label-any-unfortunate' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you\'re reading HkfDru and encounter the phrase "bZ dmu cM+h ckr vk;A" — a dictionary gives "dmu = big, ckr = matter", but that misses the affectionate.',
            decisions: [{ prompt: 'What is the primary strategy for determining the meaning of an unfamiliar word in a literary text like HkfDru?', options: [
                { text: 'The primary strategy is to analyze the surrounding context', outcome: 'The primary strategy is to analyze the surrounding context — including tone, imagery, character.' },
                { text: 'look it up in a dictionary first', outcome: 'Not quite — Students treat the \'kCn&Nfo (word-meanings) list as a definitive answer key, memorizing glosses.', reveals: 'students-treat-the-kcn-nfo' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_011', title: 'Grammar: Language Usage in the Text',
          caseStudy: { intro: 'Imagine you are listening to an elderly grandmother in a village narrating her life story — she doesn\'t speak textbook Hindi; her verbs end in \'th\' instead.',
            decisions: [{ prompt: 'Identify the specific verb ending used by HkfDru in the text that replaces the standard Hindi \'है\' (hai) or \'हैं\' (hain), and give one.', options: [
                { text: 'The verb ending is \'थ\' (th) used for both singular and plural present tense (e.g., "गक', outcome: 'The verb ending is \'थ\' (th) used for both singular and plural present tense (e.g., "गक; गस" -> "गक.' },
                { text: '\'है\' or \'हो\'', outcome: 'Not quite — Students treat dialectal forms in "HkfDru" as *errors* or *deviations* from "correct" Hindi that.', reveals: 'students-treat-dialectal-forms-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you are sitting in the exam hall and see a question: "Why does HkfDru hide her real name?" You might panic because the story never says it directly.',
            decisions: [{ prompt: 'Define literal and inferential comprehension questions in your own words.', options: [
                { text: 'Literal questions ask for facts explicitly stated in the text (e.g., "What is HkfDru\'s', outcome: 'Literal questions ask for facts explicitly stated in the text (e.g., "What is HkfDru\'s age when she.' },
                { text: 'not directly stated', outcome: 'Not quite — Students treat inferential questions as "opinion questions" and answer from personal feeling (e.g.', reveals: 'students-treat-inferential-questions-as' },
                { text: 'not in the text at all', outcome: 'Not quite — Students treat inferential questions as "opinion questions" and answer from personal feeling (e.g.', reveals: 'students-treat-inferential-questions-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a features-writing course, you\'re profiling the woman who\'s run your hostel kitchen for 30 years. Your editor wants a \'heartwarming\' ending where she cries as the final batch of students leaves — \'that\'s the emotional payoff.\'',
            decisions: [{ prompt: 'What would Mohan Rakesh\'s \'भक्तिन\' tell the editor?', options: [
                { text: 'Cut the tears — the story ends with the narrator noting Bhaktin\'s unbothered self-sufficiency at his own departure, and that refusal of sentimental closure IS the portrait; a lifetime of abandonment made her dignity non-negotiable, and dependency would betray her.', outcome: 'The chapter\'s lesson: the open, unsentimental ending honours her autonomy — the lack of payoff is the resolution, because her strength was never wired to anyone\'s leaving.' },
                { text: 'Add the crying scene — readers need emotional closure, and her reserve is just a detail to warm up.', outcome: 'That\'s the exact misreading: her composure isn\'t a gap in the story, it\'s the story — turning self-reliance into breakdown writes a different, lesser person.', reveals: 'tears-equal-depth' },
                { text: 'Reorder the piece chronologically — childhood, marriage, abandonment, kitchen — so her arc reads cleanly.', outcome: 'The story deliberately opens on her cooking now and folds the past in as flashback; the mundane present framing the hard past is what makes her endurance land — flattening the order flattens her.', reveals: 'chronology-equals-clarity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read an autobiographical sketch as a reformer\'s document — where one remembered woman exposes a whole system\'s quiet cruelties.',
            decisions: [{ prompt: 'What comes next? èkeZohj Hkkjrh · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — èkeZohj Hkkjrh · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, motifs, and concerns that run.',
          hint: 'If unable to separate primary from secondary themes, review the "Theme: Primary Theme and.',
          misconception: 'Students often treat secondary themes as "minor themes" — less important, less developed, or just "extra topics.',
          parts: [
                { id: 'a', prompt: 'In "HkfDru", the narrator consistently uses the masculine pronoun "th" (तह) and the name "HkfDru" for a female squirrel.', answer: 'The narrator\'s refusal to gender HkfDru linguistically',
                  options: ['The narrator\'s refusal to gender HkfDru linguistically', 'mistake', 'mlus viuk le`f¼&lwpd uke fdlh dks crkrh ugha'],
                  hint: 'If unable to separate primary from secondary themes, review the "Theme: Primary Theme and Message".',
                  misconception: 'Students often treat secondary themes as "minor themes" — less important, less developed, or just "extra topics mentioned." They write.' },
                { id: 'b', prompt: 'Compare how the secondary theme of "critique of institutional education" appears in the narrator\'s role as a teacher versus HkfDru\'s "education." What contrast.', answer: 'The narrator teaches in a formal system: rigid schedules, prescribed curricula,',
                  options: ['The narrator teaches in a formal system: rigid schedules, prescribed curricula,', 'both learn'],
                  hint: 'If unable to separate primary from secondary themes, review the "Theme: Primary Theme and Message".',
                  misconception: 'Students often treat secondary themes as "minor themes" — less important, less developed, or just "extra topics mentioned." They write.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student lists themes without tracing them textually: 1) Assign re-reading of **three specific passages** (HkfDru\'s.', '3) Ask them to write **one analytical paragraph** connecting two themes using the structure: "Theme A [evidence].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat secondary themes as "minor themes" — less important, less developed, or just "extra topics.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The secondary theme of maternal instinct in \'HkfDru\' reinforces traditional gender roles rather than subverting them." Defend your.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'motherhood = traditional femininity'],
                  hint: 'If unable to separate primary from secondary themes, review the "Theme: Primary Theme and Message".',
                  misconception: 'Students often treat secondary themes as "minor themes" — less important, less developed, or just "extra topics mentioned." They write.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['If a student lists themes without tracing them textually: 1) Assign re-reading of **three specific passages** (HkfDru\'s.', '3) Ask them to write **one analytical paragraph** connecting two themes using the structure: "Theme A [evidence].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_008', difficulty: 'standard',
          question: 'Imagery (बिम्ब/प्रतिबिम्ब) refers to the use of vivid, sensory language that.',
          hint: 'If stuck on tenor/vehicle: revisit **c11_hin_ar_cbse_10_008** Step 2 "Metaphor Surgery".',
          misconception: '**The "Imagery = Description" Trap:** Students equate *any* descriptive detail with imagery.',
          parts: [
                { id: 'a', prompt: 'Compare the **extended metaphor of the "cage" (पिंजरा)** for society (pp. 68-69) with the **repeated "bird" imagery** for HkfDru (pp. 64, 72).', answer: '**Correct answer:** The "cage" metaphor frames society as an *active, confining',
                  options: ['**Correct answer:** The "cage" metaphor frames society as an *active, confining', 'extended metaphor', 'symbols'],
                  hint: 'If stuck on tenor/vehicle: revisit **c11_hin_ar_cbse_10_008** Step 2 "Metaphor Surgery" exercise.',
                  misconception: '**The "Imagery = Description" Trap:** Students equate *any* descriptive detail with imagery.' }
          ],
            remediations: { 'the-imagery-description-trap-students': { steps: ['**Step 1 (5 min):** Re-read Class 11 node **c11_hin_ar_cbse_10_008** (Literary Devices: Imagery and Metaphor) — focus.', '**Step 2 (10 min):** Take the *first paragraph* of "HkfDru" (p.', 'Highlight: 🟡 visual, 🔵 auditory, 🟢 tactile, 🟠 olfactory, 🟣 gustatory.', 'Count — if <3 senses, re-read with a partner, asking "What do I *feel/smell/hear* here?" **Step 3 (5 min):** Do the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_009', difficulty: 'standard',
          question: 'Irony is a literary device where there is a contradiction between appearance.',
          hint: 'If unable to separate irony from mere contrast, review the "expectation vs.',
          misconception: 'Students often label any unfortunate event as "irony" (e.g., "It’s ironic that HkfDru is poor") — this is *situational.',
          parts: [
                { id: 'a', prompt: 'In "HkfDru", the narrator initially finds HkfDru’s lack of a formal name amusing, yet later realizes HkfDru’s identity is deeply rooted in her relationships.', answer: 'Situational irony occurs when the outcome is the opposite of what is expected',
                  options: ['Situational irony occurs when the outcome is the opposite of what is expected', 'dramatic irony', 'verbal irony'],
                  hint: 'If unable to separate irony from mere contrast, review the "expectation vs.',
                  misconception: 'Students often label any unfortunate event as "irony" (e.g., "It’s ironic that HkfDru is poor") — this is *situational misfortune*, not.' }
          ],
            remediations: { 'students-often-label-any-unfortunate': { steps: ['Re-read the three key scenes: HkfDru’s introduction (name irony), the *chulha* scenes (symbolism), the name-writing.', 'For each, fill a two-column table: Column A = "Literal Event/Object", Column B = "Opposite Meaning / Abstract Idea".', 'Re-attempt Diagnostic Questions 2 and 3 using this table.', 'If stuck, revisit node c12_hin_ar_cbse_10_008 (Imagery and Metaphor) to reinforce the distinction between one-time.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the meaning.',
          hint: 'If stuck, re-read the "Hkk"kk dh ckr" (Language Talk) section at the end of the chapter.',
          misconception: 'Students treat the \'kCn&Nfo (word-meanings) list as a definitive answer key, memorizing glosses like "vLi"V.',
          parts: [
                { id: 'a', prompt: 'What is the primary strategy for determining the meaning of an unfamiliar word in a literary text like HkfDru?', answer: 'The primary strategy is to analyze the surrounding context',
                  options: ['The primary strategy is to analyze the surrounding context', 'look it up in a dictionary first'],
                  hint: 'If stuck, re-read the "Hkk"kk dh ckr" (Language Talk) section at the end of the chapter — it is the.',
                  misconception: 'Students treat the \'kCn&Nfo (word-meanings) list as a definitive answer key, memorizing glosses like "vLi"V iqujko`fÙk;k¡ = clear.' },
                { id: 'b', prompt: 'In the sentence "gekjs ekyfdu rkS jkr&fnu fdrfc;u ek¡ xM+h jgrh gSa", the phrase "fdrfc;u ek¡" literally means "hands full of work", but what does.', answer: 'It conveys overwhelmed helplessness mixed with tender resignation',
                  options: ['It conveys overwhelmed helplessness mixed with tender resignation', 'she has a lot of work'],
                  hint: 'If stuck, re-read the "Hkk"kk dh ckr" (Language Talk) section at the end of the chapter — it is the.',
                  misconception: 'Students treat the \'kCn&Nfo (word-meanings) list as a definitive answer key, memorizing glosses like "vLi"V iqujko`fÙk;k¡ = clear.' }
          ],
            remediations: { 'students-treat-the-kcn-nfo': { steps: ['If a student cannot move beyond dictionary meanings: (1) Give them the sentence "HkfDru dh oaQtwlh osQ izk.k iawthHkwr.', '(2) Have them read the paragraph aloud in Braj rhythm, then in flat standard Hindi — hear the difference.', '(3) Assign: find 3 words where the glossary meaning feels "thin" and write 2 lines explaining the missing emotional.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic study of how.',
          hint: 'If stuck, review Class 11 Chapter 10 Grammar node (c11_hin_ar_cbse_10_011) — specifically.',
          misconception: 'Students treat dialectal forms in "HkfDru" as *errors* or *deviations* from "correct" Hindi that the author "couldn\'t.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Grammar: Language Usage in the Text refers to the systematic study of how grammatical',
                  options: ['Grammar: Language Usage in the Text refers to the systematic study of how grammatical', '"Before You Read: Context and Background" is a pre-reading section that provides', 'Plot and narrative structure refer to the sequence of events in a story (plot) and the', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, review Class 11 Chapter 10 Grammar node (c11_hin_ar_cbse_10_011) — specifically the.',
                  misconception: 'Students treat dialectal forms in "HkfDru" as *errors* or *deviations* from "correct" Hindi that the author "couldn\'t avoid" because the.' }
          ],
            remediations: { 'students-treat-dialectal-forms-in': { steps: ['If a student holds this misconception: Step 1 — Give them two sentences: one with a genuine performance error (e.g.', 'Ask: "Which follows a *system*?" Step 2 — Show the Braj grammar rule: present tense 3rd person singular ends in -th.', 'Step 3 — Have them find 5 consistent \'th\' endings in the text.', 'Step 4 — Ask: "If it were random errors, would it be this consistent?" Step 5 — Re-read the narrator\'s reaction: she.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_012', difficulty: 'standard',
          question: 'Literal comprehension questions ask for information directly stated in the text.',
          hint: 'If stuck, review the chapter summary and character sketches from nodes.',
          misconception: 'Students treat inferential questions as "opinion questions" and answer from personal feeling (e.g., "I think she.',
          parts: [
                { id: 'a', prompt: 'Read the question: "What work does HkfDru do in the narrator\'s house?" Is this literal or inferential? Explain how you know.', answer: 'This is a literal question',
                  options: ['This is a literal question', 'detail-rich', 'implicit', 'not directly stated'],
                  hint: 'If stuck, review the chapter summary and character sketches from nodes c12_hin_ar_cbse_10_002 and.',
                  misconception: 'Students treat inferential questions as "opinion questions" and answer from personal feeling (e.g., "I think she is sad") instead.' },
                { id: 'b', prompt: 'Answer this literal question using the text: "What name does the narrator\'s mother give HkfDru, and why does she choose it?"', answer: 'Steps: 1) Identify keywords: "mother", "give HkfDru", "name"',
                  options: ['Steps: 1) Identify keywords: "mother", "give HkfDru", "name"', 'not directly stated', 'not in the text at all'],
                  hint: 'If stuck, review the chapter summary and character sketches from nodes c12_hin_ar_cbse_10_002 and.',
                  misconception: 'Students treat inferential questions as "opinion questions" and answer from personal feeling (e.g., "I think she is sad") instead.' }
          ],
            remediations: { 'students-treat-inferential-questions-as': { steps: ['Give the student a short paragraph from the chapter.', 'Ask them to write one literal and one inferential question about it.', 'Have them swap with a partner and answer each other\'s questions, highlighting the exact words used.', 'Debrief: for inferential answers, demand "Show me the two sentences that led you there." Repeat with three new.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
