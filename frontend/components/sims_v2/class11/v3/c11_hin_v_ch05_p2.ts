import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch05_p2: SimDef = {
    id: 'v3_c11_hin_v_ch05_p2',
    title: 'jktLFkku dh jtr cw¡nas · Part 2/3',
    subtitle: 'Read Rajasthani folk tales as a people\'s archive of honour codes.',
    classLevel: 11, subject: 'hin_v', topic: 'jktLFkku dh jtr cw¡nas · Part 2/3',
    chapters: ['c11_hin_v_ch05'],
    nodeIds: ['c11_hin_v_cbse_05_007', 'c11_hin_v_cbse_05_008', 'c11_hin_v_cbse_05_009', 'c11_hin_v_cbse_05_010', 'c11_hin_v_cbse_05_011', 'c11_hin_v_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an archivist cross-checking ballads against records', intro: 'Desert kingdoms, bards, and sacrifices that look irrational — until you learn the code they\'re written in.', goal: 'Decode the cultural rules inside Rajasthani folk narratives and analyse their non-linear structure.' },
    discovery: {
        question: 'A Rajput tale has a widow choose jauhar and a steward bankrupt himself for his lord — madness, or a code you\'re missing?',
        options: ['A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour', 'Madness — no rational person chooses death', 'A code — but only kings followed it', 'Madness — folk tales aren\'t bound by logic'],
        answer: 'A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour',
        hook: 'Vishnu Prabhakar worked the Rajasthan State Archives for decades — these aren\'t fairy tales but itihaas, history as the people witnessed it.',
    },
    teaching: [
        { title: 'Theme: Secondary Themes', text: 'Secondary themes are the underlying ideas, concerns, or messages in a literary work that support, contrast, or enrich the primary theme.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_05_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Match archival motifs (jauhar, sakha, bhamashah) to the folk narratives, then weigh why the story\'s trauma stays unresolved at the end.',
        labels: ['Theme: Secondary Themes', 'Literary Devices: Imagery', 'Literary Devices: Irony', 'Vocabulary in Context: Key', 'Grammar: Language Usage', 'Comprehension: Literal and Inferential'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_007', title: 'Theme: Secondary Themes',
          caseStudy: { intro: 'Imagine you are visiting your ancestral village and notice an ancient stepwell (baoli) that once sustained the entire community but now lies dry and forgotten.',
            decisions: [{ prompt: 'What is the precise difference between a primary theme and a secondary theme in a prose narrative?', options: [
                { text: 'A primary theme is the central, unifying idea that the entire narrative structure serves', outcome: 'A primary theme is the central, unifying idea that the entire narrative structure serves to explore.' },
                { text: 'less important', outcome: 'Not quite — Students often think "secondary theme" means "minor theme" or "sub-theme" that can be listed like.', reveals: 'secondary-theme-means-minor-theme' },
                { text: 'secondary theme', outcome: 'Not quite — Students often think "secondary theme" means "minor theme" or "sub-theme" that can be listed like.', reveals: 'secondary-theme-means-minor-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_008', title: 'Literary Devices: Imagery and Metaphor',
          caseStudy: { intro: 'Imagine you are reading a thriller novel late at night; the author writes "the silence screamed in his ears" and suddenly you *feel* the tension in your own.',
            decisions: [{ prompt: 'Define "metaphor" and give one example from everyday Hindi usage (not from the textbook).', options: [
                { text: 'A metaphor is a direct comparison between two unlike things stating one *is* the other', outcome: 'A metaphor is a direct comparison between two unlike things stating one *is* the other (e.g., "समय.' },
                { text: 'like/as', outcome: 'Not quite — Students believe imagery is *only* visual description (e.g., "the sky was blue") and miss auditory.', reveals: 'imagery-is-only-visual-description' },
                { text: 'बहादुर जैसे शेर', outcome: 'Not quite — Students believe imagery is *only* visual description (e.g., "the sky was blue") and miss auditory.', reveals: 'imagery-is-only-visual-description' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_009', title: 'Literary Devices: Irony and Symbolism',
          caseStudy: { intro: 'Imagine you are packing a small suitcase for a sudden move, knowing you can never return home — what one object would you take that carries your entire past?',
            decisions: [{ prompt: 'Define situational irony and give one example from daily life (not from the textbook).', options: [
                { text: 'Situational irony occurs when the outcome of a situation is sharply contrary to what was', outcome: 'Situational irony occurs when the outcome of a situation is sharply contrary to what was expected.' },
                { text: 'the burning pyre', outcome: 'Not quite — Students often confuse *symbolism* with *imagery* — thinking any vivid description (e.g., "the.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_010', title: 'Vocabulary in Context: Key Words',
          caseStudy: { intro: 'Imagine you are reading a news report about a local forest being cut down for a highway project; you see words like "acquisition," "rehabilitation," and.',
            decisions: [{ prompt: 'What is the primary difference between a dictionary definition of a word and its contextual meaning in a literary text like "jktLFkku.', options: [
                { text: 'A dictionary definition provides a standardized, decontextualized meaning, while', outcome: 'A dictionary definition provides a standardized, decontextualized meaning, while contextual meaning.' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe that "vocabulary in context" simply means "guessing the meaning of a hard word.', reveals: 'vocabulary-in-context-simply-means' },
                { text: 'guessing the meaning of a hard word from the surrounding sentence', outcome: 'Not quite — Students believe that "vocabulary in context" simply means "guessing the meaning of a hard word.', reveals: 'vocabulary-in-context-simply-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_012', title: 'Comprehension: Literal and Inferential Questions',
          caseStudy: { intro: 'Imagine you\'re sitting in your Class 11 Hindi exam and the first comprehension question asks: "लेखक का बचपन कहाँ बीता?" (Where did the author spend his.',
            decisions: [{ prompt: 'पाठ्य बोध (Comprehension) में \'शाब्दिक प्रश्न\' (Literal Question) और \'अनुमानात्मक प्रश्न\' (Inferential Question) का मूल अंतर क्या है?', options: [
                { text: '**Correct Answer:** शाब्दिक प्रश्न का उत्तर पाठ में स्पष्ट रूप से लिखा होता है (उदाहरण:', outcome: '**Correct Answer:** शाब्दिक प्रश्न का उत्तर पाठ में स्पष्ट रूप से लिखा होता है (उदाहरण: "लेखक का.' },
                { text: 'लेखक का जन्म कहाँ हुआ?', outcome: 'Not quite — **विशिष्ट भ्रांति:** छात्र मानते हैं कि "अनुमानात्मक प्रश्न का उत्तर पाठ में \'छिपा\' होता है जिसे.', reveals: 'wrong-idea' },
                { text: 'टोंक, राजस्थान में', outcome: 'Not quite — **विशिष्ट भ्रांति:** छात्र मानते हैं कि "अनुमानात्मक प्रश्न का उत्तर पाठ में \'छिपा\' होता है जिसे.', reveals: 'wrong-idea' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your history club presents Vishnu Prabhakar\'s \'Rajasthan ki Jatir Kahaniyan\'. A member dismisses the folk narratives: \'Oral tales aren\'t real history — no dates, no documents, just bards embellishing. And the story jumps around in time, so it\'s badly organised.\'',
            decisions: [{ prompt: 'How do you defend both the form and the history?', options: [
                { text: 'Defend both: these narratives are \'itihaas\' — history as witnessed by the people — which is why Prabhakar, a historian-storyteller in the post-Independence recovery of subaltern histories, documented them; the Rajasthani-infused language carries cultural codes a document can\'t. And the non-linearity is design: time-shifts reveal the protagonist\'s trauma gradually — the climax is an internal realisation, not an external event.', outcome: 'The club reframes: oral tradition is an archive with its own grammar, and the scrambled chronology is how the story performs memory rather than reports it.' },
                { text: 'Concede — oral tales are entertainment; real history needs documents and dates.', outcome: 'That repeats the bias that erased subaltern experience: these tales preserve what archives ignored — the people\'s own witness.', reveals: 'oral-tales-arent-history' },
                { text: 'Rearrange the story chronologically for the presentation — linear order is clearer.', outcome: 'The non-linear order is the meaning: trauma surfaces in fragments; straightening it destroys the emotional architecture built by the flashbacks.', reveals: 'linearize-the-narrative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'The archive and the bard tell the same past in different inks — folk narrative is history that refused to be filed away.',
            decisions: [{ prompt: 'What comes next? jktLFkku dh jtr cw¡nas · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — jktLFkku dh jtr cw¡nas · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_007', difficulty: 'standard',
          question: 'Secondary themes are the underlying ideas, concerns, or messages in a literary.',
          hint: 'If stuck, review node 006\'s worked examples on primary theme extraction — specifically.',
          misconception: 'Students often think "secondary theme" means "minor theme" or "sub-theme" that can be listed like topics (e.g., "water.',
          parts: [
                { id: 'a', prompt: 'Apply the concept of "thematic clustering" to this chapter: Group the following textual elements into two distinct secondary theme clusters and name each.', answer: 'Cluster 1: "Epistemic Violence of Bureaucracy"',
                  options: ['Cluster 1: "Epistemic Violence of Bureaucracy"', 'water problems', 'secondary theme', 'minor theme'],
                  hint: 'If stuck, review node 006\'s worked examples on primary theme extraction — specifically the.',
                  misconception: 'Students often think "secondary theme" means "minor theme" or "sub-theme" that can be listed like topics (e.g., "water scarcity.' }
          ],
            remediations: { 'secondary-theme-means-minor-theme': { steps: ['Ask the student to reread only the three scenes where the clerk interacts with the well (first visit, measurement.', 'Have them make a two-column table: Column A — what the clerk *does/sees/says*; Column B — what the well.', 'Guide them to see each row as a micro-conflict between two worldviews.', 'Then ask: "What larger idea does each column represent?" This moves them from listing topics to extracting thematic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "secondary theme" means "minor theme" or "sub-theme" that can be listed like topics (e.g., "water.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The contractor\'s character serves only as a villain; his greed is a simple secondary theme of corruption." Defend or refute using the.', answer: 'Refute',
                  options: ['Refute', 'corruption', 'secondary theme', 'minor theme'],
                  hint: 'If stuck, review node 006\'s worked examples on primary theme extraction — specifically the.',
                  misconception: 'Students often think "secondary theme" means "minor theme" or "sub-theme" that can be listed like topics (e.g., "water scarcity.' },
                { id: 'b', prompt: 'Create a 4-line dialogue between the old chowkidar and the new clerk that dramatizes the clash between the secondary themes of "custodial memory" and.', answer: 'Chowkidar: "Sahib, the well breathes',
                  options: ['Chowkidar: "Sahib, the well breathes', 'secondary theme', 'minor theme', 'sub-theme'],
                  hint: 'If stuck, review node 006\'s worked examples on primary theme extraction — specifically the.',
                  misconception: 'Students often think "secondary theme" means "minor theme" or "sub-theme" that can be listed like topics (e.g., "water scarcity.' }
          ],
            remediations: { 'secondary-theme-means-minor-theme': { steps: ['Ask the student to reread only the three scenes where the clerk interacts with the well (first visit, measurement.', 'Have them make a two-column table: Column A — what the clerk *does/sees/says*; Column B — what the well.', 'Guide them to see each row as a micro-conflict between two worldviews.', 'Then ask: "What larger idea does each column represent?" This moves them from listing topics to extracting thematic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_008', difficulty: 'standard',
          question: 'Imagery refers to the use of descriptive language that appeals to the five.',
          hint: 'Re-read the chapter summary and theme analysis (node 006) to anchor device-hunting in the.',
          misconception: 'Students believe imagery is *only* visual description (e.g., "the sky was blue") and miss auditory, olfactory, tactile.',
          parts: [
                { id: 'a', prompt: 'Compare the metaphor "जिंदगी एक बोझ है" (life is a burden) with "जिंदगी एक नदी है" (life is a river).', answer: '"Burden" implies weight, exhaustion, and a desire to drop it',
                  options: ['"Burden" implies weight, exhaustion, and a desire to drop it', 'the sky was blue', 'imagery is *only* visual description (e'],
                  hint: 'Re-read the chapter summary and theme analysis (node 006) to anchor device-hunting in the central.',
                  misconception: 'Students believe imagery is *only* visual description (e.g., "the sky was blue") and miss auditory, olfactory, tactile, and gustatory.' }
          ],
            remediations: { 'imagery-is-only-visual-description': { steps: ['Take the student to a well-known Hindi poem (e.g., Nirala\'s "सरोज स्मृति") and explicitly label *five* sensory images.', 'Give two sentences: "वह शेर है" vs "वह शेर जैसा है".', 'Ask: "Which one makes \'he\' *become* the lion?', 'What qualities of lion now belong to \'he\'?" 3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_009', difficulty: 'standard',
          question: 'Irony is a literary device where the intended meaning of words or events.',
          hint: 'If stuck, review node 008 (Imagery and Metaphor) focusing on the difference between.',
          misconception: 'Students often confuse *symbolism* with *imagery* — thinking any vivid description (e.g., "the burning pyre") is.',
          parts: [
                { id: 'a', prompt: 'In the chapter, the narrator\'s father says, "हम जल्दी लौट आएंगे" (We will return soon) while locking the house forever.', answer: 'This is verbal irony',
                  options: ['This is verbal irony', 'situational irony', 'the burning pyre'],
                  hint: 'If stuck, review node 008 (Imagery and Metaphor) focusing on the difference between *comparison*.',
                  misconception: 'Students often confuse *symbolism* with *imagery* — thinking any vivid description (e.g., "the burning pyre") is a symbol.' },
                { id: 'b', prompt: 'Compare the irony in the father\'s promise to return with the symbolism of the "टूटी हुई चारपाई" (broken cot) left behind.', answer: 'The father\'s verbal irony (promise vs',
                  options: ['The father\'s verbal irony (promise vs', 'the burning pyre'],
                  hint: 'If stuck, review node 008 (Imagery and Metaphor) focusing on the difference between *comparison*.',
                  misconception: 'Students often confuse *symbolism* with *imagery* — thinking any vivid description (e.g., "the burning pyre") is a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Re-teach the distinction: Imagery appeals to senses; symbolism assigns *representational* meaning.', 'Use a non-text example: a wedding ring (image: gold circle) vs.', 'symbol (eternal commitment).', 'For irony, create a 3-column table: Type | Definition | Text Example.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_010', difficulty: 'standard',
          question: 'Vocabulary in Context refers to the skill of determining the precise meaning.',
          hint: 'If stuck, review the "Theme: Primary Theme and Message" (c11_hin_v_cbse_05_006).',
          misconception: 'Students believe that "vocabulary in context" simply means "guessing the meaning of a hard word from the surrounding.',
          parts: [
                { id: 'a', prompt: 'What is the primary difference between a dictionary definition of a word and its contextual meaning in a literary text like "jktLFkku dh jtr cw¡nas"?', answer: 'A dictionary definition provides a standardized, decontextualized meaning, while',
                  options: ['A dictionary definition provides a standardized, decontextualized meaning, while', 'vocabulary in context', 'guessing the meaning of a hard word from the surrounding sentence'],
                  hint: 'If stuck, review the "Theme: Primary Theme and Message" (c11_hin_v_cbse_05_006) to re-anchor the.',
                  misconception: 'Students believe that "vocabulary in context" simply means "guessing the meaning of a hard word from the surrounding sentence." They treat.' }
          ],
            remediations: { 'vocabulary-in-context-simply-means': { steps: ['Have the student list 5 words they think are "key" to the chapter.', 'For each word, ask them to write the dictionary meaning in Column A and the "chapter meaning" in Column B using only.', 'Force them to articulate the *gap* between Column A and B in one sentence: "The chapter adds the idea of ______ which.', 'Finally, ask them to rewrite a textbook sentence using the "chapter meaning" to prove internalization.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_011', difficulty: 'standard',
          question: 'Grammar: Language Usage in the Text refers to the systematic analysis.',
          hint: 'Review Class 10 Hindi Vyakaran: समास के भेद व विग्रह, वाच्य परिवर्तन (कर्तृ/कर्मणी), और.',
          misconception: 'Students treat "grammar in text" as **spotting isolated rules** (e.g., "here is a passive verb") rather than **tracing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Grammar: Language Usage in the Text refers to the systematic analysis of syntactic',
                  options: ['Grammar: Language Usage in the Text refers to the systematic analysis of syntactic', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Plot and narrative structure refer to the sequence of events in a story and the framework', 'Setting refers to the time, place, and social environment in'],
                  hint: 'Review Class 10 Hindi Vyakaran: समास के भेद व विग्रह, वाच्य परिवर्तन (कर्तृ/कर्मणी), और अव्यय/योजक.',
                  misconception: 'Students treat "grammar in text" as **spotting isolated rules** (e.g., "here is a passive verb") rather than **tracing a grammatical.' }
          ],
            remediations: { 'students-treat-grammar-in-text': { steps: ['**Isolate one paragraph** (3-4 sentences) from the text.', '**Color-code**: verbs (blue), connectives (red), compounds (green), nominalizations (orange).', '**Ask for each color**: "What work does this do *in this sentence* and *for the paragraph\'s argument*?" 4.', '**Rewrite the paragraph** in simple active voice with no compounds — read both aloud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_012', difficulty: 'standard',
          question: 'Literal comprehension questions require students to retrieve information.',
          hint: 'If stuck, review c11_hin_v_cbse_05_002 (Plot) and c11_hin_v_cbse_05_010 (Vocabulary).',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "अनुमानात्मक प्रश्न का उत्तर पाठ में \'छिपा\' होता है जिसे ढूंढना पड़ता है".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Literal comprehension questions require students to retrieve information explicitly',
                  options: ['Literal comprehension questions require students to retrieve information explicitly', '"Before You Read: Context and Background" is a pre-reading strategy that equips students', 'Plot and narrative structure refer to the sequence of events in a story and the framework', 'Setting refers to the time, place, and social environment in'],
                  hint: 'If stuck, review c11_hin_v_cbse_05_002 (Plot) and c11_hin_v_cbse_05_010 (Vocabulary) — these.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "अनुमानात्मक प्रश्न का उत्तर पाठ में \'छिपा\' होता है जिसे ढूंढना पड़ता है" — जैसे कोई खजाना खोज रहे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडलिंग (2 मिनट):** एक छोटा अंश (3-4 वाक्य) लें। दिखाएँ: "यहाँ क्या लिखा है → यहाँ क्या नहीं लिखा → मैं कैसे जोड़ता.', '**संकेत-मानचित्रण (Clue Mapping):** छात्र से कहें: "पाठ में उन 3-4 वाक्यों को रेखांकित करो जो तुम्हारे उत्तर का आधार.', 'ये मिलकर क्या बताते हैं?" 3.', '**वाक्य-ढांचा (Sentence Scaffold):** दें — "पाठ में ______ लिखा है, और ______ भी लिखा है। इससे पता चलता है कि ______।".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
