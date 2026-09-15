import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch04_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch04_p3',
    title: 'f\'k{kk · Part 3/3',
    subtitle: 'Read a bureaucratic \'order\' as parody — and a soldier\'s letter as an accusation.',
    classLevel: 11, subject: 'hin_ar', topic: 'f\'k{kk · Part 3/3',
    chapters: ['c11_hin_ar_ch04'],
    nodeIds: ['c11_hin_ar_cbse_04_013', 'c11_hin_ar_cbse_04_014', 'c11_hin_ar_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader unmasking a ridiculous official letter', intro: 'A letter reaches the king from his own soldier — part chronicle of past glory, part folk tale, part indictment.', goal: 'Decode Guleri\'s linguistic satire and analyse the letter\'s fragmented narrative structure.' },
    discovery: {
        question: 'A British officer\'s order arrives dressed in legal English, dead Sanskrit and bazaar Hindi — is the absurdity just clumsy writing?',
        options: ['No — the linguistic mess is the satire: colonial authority is shown as performance, not competence', 'Yes — the officer simply couldn\'t write Hindi', 'No — it\'s actually a translation error by the editor', 'Yes — satire requires elegant language'],
        answer: 'No — the linguistic mess is the satire: colonial authority is shown as performance, not competence',
        hook: 'Guleri edited a paper through the 1899 famine that killed crores while grain was exported — the mock-bureaucratic \'order\' is a weapon, not a joke.',
    },
    teaching: [
        { title: 'Critical Thinking: Analysis and Interpretation', text: 'Critical Thinking: Analysis and Interpretation is the systematic process of examining a literary text beyond its surface meaning by breaking down its components (plot, character, theme, language.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Break a soldier\'s letter into its blocks — past glory, present misery, the snake-and-two-women folktale — and ask what the broken structure does to the ruler reading it.',
        labels: ['Critical Thinking: Analysis', 'Writing Skills: Based', 'Speaking and Listening: Discussion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_013', title: 'Critical Thinking: Analysis and Interpretation',
          caseStudy: { intro: 'Imagine you\'re watching a heated argument between a landlord and a tenant where the landlord claims he\'s "helping" the tenant by raising the rent.',
            decisions: [{ prompt: 'What is the primary analytical move required when interpreting the dialogue between Lord Lytton and the Indian ruler.', options: [
                { text: 'The primary move is identifying **dramatic irony**', outcome: 'The primary move is identifying **dramatic irony** — the gap between what Lytton claims.' },
                { text: 'understanding the plot', outcome: 'Not quite — Students believe "critical analysis" means **finding faults** in the text or **disagreeing with the.', reveals: 'critical-analysis-means-finding-faults' },
                { text: 'translating the Hindi', outcome: 'Not quite — Students believe "critical analysis" means **finding faults** in the text or **disagreeing with the.', reveals: 'critical-analysis-means-finding-faults' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_015', title: 'Speaking and Listening: Discussion Points',
          caseStudy: { intro: 'Imagine you\'re in a college seminar where the professor asks: "How does Vaid use satire to expose colonial hypocrisy in this text?" You freeze because you\'ve.',
            decisions: [{ prompt: 'Define "academic register" (शैक्षिक शैली) in the context of a Hindi literary discussion. How does it differ from casual conversation?', options: [
                { text: 'Academic register uses formal vocabulary (तत्सम शब्द like \'शोषण\', \'विडंबना\',', outcome: 'Academic register uses formal vocabulary (तत्सम शब्द like \'शोषण\', \'विडंबना\', \'उपनिवेशवाद\').' },
                { text: 'just speaking properly', outcome: 'Not quite — Students believe "discussion" means taking turns sharing opinions ("मुझे लगता है...", "मेरी राय.', reveals: 'discussion-means-taking-turns-sharing' },
                { text: 'discussion', outcome: 'Not quite — Students believe "discussion" means taking turns sharing opinions ("मुझे लगता है...", "मेरी राय.', reveals: 'discussion-means-taking-turns-sharing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a satire-writing workshop you take Guleri\'s sketch — a soldier\'s letter to his ruler mixing Sanskrit, Persian officialese and folk tale. A participant says: \'The mixed language is sloppy writing, and the snake-and-two-women folk tale is a pointless digression from the letter\'s complaint.\'',
            decisions: [{ prompt: 'How do you defend the text\'s design?', options: [
                { text: 'Decode the hybridity: the officer\'s mangled officialese (vakil, daftar, hukm) parodies the Persianised bureaucratic register — colonial power as performative language — while the elder sister\'s brave Sanskritised speech vs the younger\'s fearful fragments allegorise indigenous tradition vs colonised psyche. And the folk tale isn\'t digression: it\'s a parallel symbolic sub-plot doing the work of satire and allegory inside the letter form.', outcome: 'The workshop sees context as decoder: Guleri\'s famine-era journalism weaponised language — every register switch and the embedded tale are the critique.' },
                { text: 'Agree the language is sloppy — clean it into uniform modern Hindi for the exercise.', outcome: 'Uniforming the register erases the satire: the collision of Sanskrit, Persian and colloquial speech is precisely how colonial authority gets mocked.', reveals: 'hybrid-language-is-sloppy' },
                { text: 'Cut the folk tale — a letter should stick to its complaint.', outcome: 'The sub-plot carries the allegorical weight: it mirrors and sharpens the main letter\'s charge, so cutting it removes the satire\'s core.', reveals: 'folk-tale-is-digression' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'Two sisters face the same officer — one answers in courage and Sanskritised rebuke, one in fear; both are true, and that refusal of a clean binary is the honesty.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_013', difficulty: 'standard',
          question: 'Critical Thinking: Analysis and Interpretation is the systematic process.',
          hint: 'If stuck, return to **node 009 (Irony and Symbolism)** and re-practice identifying.',
          misconception: 'Students believe "critical analysis" means **finding faults** in the text or **disagreeing with the author**.',
          parts: [
                { id: 'a', prompt: 'What is the primary analytical move required when interpreting the dialogue between Lord Lytton and the Indian ruler in "फोनब्ज़-लाHkk"k.k"?', answer: 'The primary move is identifying **dramatic irony**',
                  options: ['The primary move is identifying **dramatic irony**', 'understanding the plot', 'translating the Hindi', 'critical analysis'],
                  hint: 'If stuck, return to **node 009 (Irony and Symbolism)** and re-practice identifying *verbal irony*.',
                  misconception: 'Students believe "critical analysis" means **finding faults** in the text or **disagreeing with the author**.' },
                { id: 'b', prompt: 'Apply the concept of "unreliable narrator" to Lord Lytton\'s speech on page 48 ("फिरकी, रक्] D;k \'कु वकदह ब्ल नस\'क इमस...").', answer: '**Claim 1:** "मैंने तुम्हें हर तरह का यकहक दिया" (I gave you every right)',
                  options: ['**Claim 1:** "मैंने तुम्हें हर तरह का यकहक दिया" (I gave you every right)', 'critical analysis', 'The author is biased against the British', 'The ruler is too emotional'],
                  hint: 'If stuck, return to **node 009 (Irony and Symbolism)** and re-practice identifying *verbal irony*.',
                  misconception: 'Students believe "critical analysis" means **finding faults** in the text or **disagreeing with the author**.' }
          ],
            remediations: { 'critical-analysis-means-finding-faults': { steps: ['**Name the confusion:** "You\'re judging the *character*, not analyzing the *craft*.', 'Ask: \'How did the author *make* me see Lytton as hypocritical?\'" 2.', '**Model the shift:** Take one Lytton quote → show the *textual mechanism* (juxtaposition, irony, lexical choice) that.', '**Practice micro-analysis:** Give 3 short quotes; student identifies *only the device* (not the meaning) — e.g., "इसमें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "critical analysis" means **finding faults** in the text or **disagreeing with the author**.',
          parts: [
                { id: 'a', prompt: 'Evaluate this interpretation: "The chapter ultimately portrays the Indian ruler as powerless and defeated, reinforcing the colonial narrative of inevitable.', answer: '**Refute.** The ruler\'s final speech ("हट्क्क्स्स हक्क्जर!',
                  options: ['**Refute.** The ruler\'s final speech ("हट्क्क्स्स हक्क्जर!', 'critical analysis', 'The author is biased against the British', 'The ruler is too emotional'],
                  hint: 'If stuck, return to **node 009 (Irony and Symbolism)** and re-practice identifying *verbal irony*.',
                  misconception: 'Students believe "critical analysis" means **finding faults** in the text or **disagreeing with the author**.' }
          ],
            remediations: { 'critical-analysis-means-finding-faults': { steps: ['**Name the confusion:** "You\'re judging the *character*, not analyzing the *craft*.', 'Ask: \'How did the author *make* me see Lytton as hypocritical?\'" 2.', '**Model the shift:** Take one Lytton quote → show the *textual mechanism* (juxtaposition, irony, lexical choice) that.', '**Practice micro-analysis:** Give 3 short quotes; student identifies *only the device* (not the meaning) — e.g., "इसमें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_014', difficulty: 'standard',
          question: 'Writing skills based on the chapter "फोकलोर के फूल" (Folklore ke Phool) refer.',
          hint: 'यदि अटके: c11_hin_ar_cbse_04_013 (Critical Thinking) के \'व्याख्या कैसे करें\' खंड को.',
          misconception: 'छात्र मानते हैं कि \'लिखने का कौशल\' का अर्थ केवल \'अच्छी हिन्दी लिखना\' (शुद्ध व्याकरण, सुंदर शब्दावली) है। वे PEEL संरचना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing skills based on the chapter "फोकलोर के फूल" (Folklore ke Phool) refer to the',
                  options: ['Writing skills based on the chapter "फोकलोर के फूल" (Folklore ke Phool) refer to the', '"Before You Read: Context and Background" for फोंकबज-लहक्कड.क establishes the historical,', 'कथावस्तु (Plot) किसी रचना में घटनाओं का तार्किक और कारण-परिणाम संबंध से बुना गया क्रम है,', 'Setting refers to the time, place, and historical context in'],
                  hint: 'यदि अटके: c11_hin_ar_cbse_04_013 (Critical Thinking) के \'व्याख्या कैसे करें\' खंड को दोहराएँ—विशेषकर.',
                  misconception: 'छात्र मानते हैं कि \'लिखने का कौशल\' का अर्थ केवल \'अच्छी हिन्दी लिखना\' (शुद्ध व्याकरण, सुंदर शब्दावली) है। वे PEEL संरचना को \'फॉर्मूला\' समझकर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से एक कमजोर उत्तर (बिना संरचना वाला) और एक मजबूत उत्तर (PEEL वाला) साथ रखवाएँ; उनसे पूछें: "कौन-सा उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_015', difficulty: 'standard',
          question: 'Speaking and Listening: Discussion Points refers to the structured oral.',
          hint: 'Review "Critical Thinking: Analysis and Interpretation" (node 013) — specifically the.',
          misconception: 'Students believe "discussion" means taking turns sharing opinions ("मुझे लगता है...", "मेरी राय में...") without.',
          parts: [
                { id: 'a', prompt: 'Define "academic register" (शैक्षिक शैली) in the context of a Hindi literary discussion. How does it differ from casual conversation?', answer: 'Academic register uses formal vocabulary (तत्सम शब्द like \'शोषण\', \'विडंबना\',',
                  options: ['Academic register uses formal vocabulary (तत्सम शब्द like \'शोषण\', \'विडंबना\',', 'just speaking properly', 'discussion', 'मुझे लगता है'],
                  hint: 'Review "Critical Thinking: Analysis and Interpretation" (node 013) — specifically the worked.',
                  misconception: 'Students believe "discussion" means taking turns sharing opinions ("मुझे लगता है...", "मेरी राय में...") without textual anchoring.' },
                { id: 'b', prompt: 'During a discussion, a peer argues: "Vaid\'s narrator is unrealistic — no Indian could speak so boldly to a Viceroy." Using textual evidence, formulate a spoken.', answer: 'Rebuttal structure: (1) Acknowledge the surface implausibility',
                  options: ['Rebuttal structure: (1) Acknowledge the surface implausibility', 'discussion', 'मुझे लगता है', 'मेरी राय में'],
                  hint: 'Review "Critical Thinking: Analysis and Interpretation" (node 013) — specifically the worked.',
                  misconception: 'Students believe "discussion" means taking turns sharing opinions ("मुझे लगता है...", "मेरी राय में...") without textual anchoring.' },
                { id: 'c', prompt: 'Compare two discussion approaches: (A) Listing all themes you remember from the chapter.', answer: 'Approach B demonstrates analysis (Bloom\'s Level 4)',
                  options: ['Approach B demonstrates analysis (Bloom\'s Level 4)', 'discussion', 'मुझे लगता है', 'मेरी राय में'],
                  hint: 'Review "Critical Thinking: Analysis and Interpretation" (node 013) — specifically the worked.',
                  misconception: 'Students believe "discussion" means taking turns sharing opinions ("मुझे लगता है...", "मेरी राय में...") without textual anchoring.' }
          ],
            remediations: { 'discussion-means-taking-turns-sharing': { steps: ['If a student defaults to opinion-sharing: (1) Interrupt gently: "रुकिए — यह आपकी राय है, लेकिन पाठ में इसका आधार कहाँ.', '(4) Assign a "textual evidence quota" for next practice: minimum 3 specific references in 2 minutes.', '(5) Record and replay — students hear their own "मुझे लगता है" patterns and self-correct.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
