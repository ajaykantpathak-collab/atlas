import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch03_p2: SimDef = {
    id: 'v3_c12_hin_a_ch03_p2',
    title: 'यह दीप अकेला, मैंने देखा एक बूँद · Part 2/3',
    subtitle: 'The poet who went to jail wrote about a little bird',
    classLevel: 12, subject: 'hin_a', topic: 'यह दीप अकेला, मैंने देखा एक बूँद · Part 2/3',
    chapters: ['c12_hin_a_ch03'],
    nodeIds: ['c12_hin_a_cbse_03_007', 'c12_hin_a_cbse_03_008', 'c12_hin_a_cbse_03_009', 'c12_hin_a_cbse_03_010', 'c12_hin_a_cbse_03_011', 'c12_hin_a_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Modern Hindi poetry reader', intro: 'A freedom fighter turned editor turned poet — each life sharpened the next. Two poems show the whole arc.', goal: 'Read Vajra\'s two poems through his biography — activism, editorial craft, and the shift from exhortation to observation.' },
    discovery: {
        question: 'A poet jailed in 1942 writes of a small, dear bird begging to be let into a heart — \'इसे भी दिल को दे दो.\' What makes the plea more than birdwatching?',
        options: ['Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness', 'He loved birds', 'It\'s a children\'s poem', 'Sentimentality'],
        answer: 'Lived captivity — a man who lost freedom to state power writes sheltering the small and vulnerable as political tenderness',
        hook: 'Vajra\'s two poems mark an evolution: the early one exhorts the collective \'you\' to accept the fragile; the later one whispers \'I saw\' — private epiphany replacing public call. Radio editing and Sanskrit-English schooling sharpened the ear that compresses so much into so few words.',
    },
    teaching: [
        { title: 'यह दीप अकेला, मैंने देखा एक बूँद — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'मैंने देखा, एक चाँद\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track a poet across two registers: weigh the jailed activist\'s communal plea against the solitary observer\'s small epiphany, and hear the refrain built for a listening audience.',
        labels: ['यह दीप अकेला, मैंने'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_007', title: 'यह दीप अकेला, मैंने देखा एक बूँद — साहित्यिक युक्तियाँ: प्रतीक और बिंब',
          caseStudy: { intro: '\'मैंने देखा, एक चाँद\' में मैंने-देखा,-एक-चाँद जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'In Varjk\'s poem "नहीं वोस्यक", the line "यह तू है अक्रक चरखा जिसे फिर भी कोई और नहीं चलाता" primarily supports which secondary theme?', options: [
                { text: 'Correct answer: Individual autonomy and self-reliance (व्यक्तिगत स्वायत्तता और', outcome: 'Correct answer: Individual autonomy and self-reliance (व्यक्तिगत स्वायत्तता और आत्मनिर्भरता).' },
                { text: 'industrial progress', outcome: 'Not quite — Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list.', reveals: 'students-often-confuse-secondary-theme' },
                { text: 'secondary theme', outcome: 'Not quite — Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list.', reveals: 'students-often-confuse-secondary-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_009', title: 'यह दीप अकेला, मैंने देखा एक बूँद — गौण भाव और विषयांतर',
          caseStudy: { intro: '\'मैंने देखा, एक चाँद\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example from daily life for each (not from the poems).', options: [
                { text: 'Irony: A situation where the outcome is contrary to what was expected (e.g., a fire', outcome: 'Irony: A situation where the outcome is contrary to what was expected (e.g., a fire station burning.' },
                { text: 'sarcasm', outcome: 'Not quite — Students often conflate **symbolism with metaphor** — they think any comparison is a symbol.', reveals: 'students-often-conflate-symbolism-with' },
                { text: 'metaphor', outcome: 'Not quite — Students often conflate **symbolism with metaphor** — they think any comparison is a symbol.', reveals: 'students-often-conflate-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a personality-development workshop, the facilitator insists each student define themselves in one word for the badge. A friend who\'s a painter-cricketer-caregiver freezes: \'None of these fit. Something\'s wrong with me.\'',
            decisions: [{ prompt: 'What do Dangwal\'s poems in this chapter tell her?', options: [
                { text: 'Nothing\'s wrong — \'नहीं वोश्यक\' spends four stanzas piling metaphor on metaphor precisely because identity won\'t sit in one word; each new facet re-reads all the others, and the refrain keeps inviting the search rather than closing it.', outcome: 'The refrain-catalogue structure enacts the refusal to be pinned down — the badge exercise mistakes a list for a person, while the poem shows elusiveness is the truth of a self.' },
                { text: 'Pick the dominant word — everyone has one core trait, and finding it is the point of the exercise.', outcome: 'That\'s the single-label fallacy the poem resists: every metaphor presented as \'the answer\' is immediately reframed by the next, proving the \'one word\' can\'t hold the subject.', reveals: 'one-word-captures-self' },
                { text: 'Skip the badge — since identity can\'t be fixed, the exercise is pointless.', outcome: 'The poem doesn\'t abandon the search — the refrain is an invitation to keep looking, not a verdict that looking is futile; the point is the seeking, not the surrender.', reveals: 'unfixable-means-pointless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_03_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read biography as a poetic instrument — and trace one poet\'s arc from barricades to the small bird at the window.',
            decisions: [{ prompt: 'What comes next? यह दीप अकेला, मैंने देखा एक बूँद · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — यह दीप अकेला, मैंने देखा एक बूँद · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_007', difficulty: 'standard',
          question: '\'मैंने देखा, एक चाँद\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, review Class 11 Aroh Chapter 1 "नमक का दारोगा" or Chapter 3 "मीरा के पद".',
          misconception: 'Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list things like.',
          parts: [
                { id: 'a', prompt: 'In Varjk\'s poem "नहीं वोस्यक", the line "यह तू है अक्रक चरखा जिसे फिर भी कोई और नहीं चलाता" primarily supports which secondary theme?', answer: 'Correct answer: Individual autonomy and self-reliance (व्यक्तिगत स्वायत्तता और',
                  options: ['Correct answer: Individual autonomy and self-reliance (व्यक्तिगत स्वायत्तता और', 'industrial progress', 'secondary theme', 'subplot'],
                  hint: 'If stuck, review Class 11 Aroh Chapter 1 "नमक का दारोगा" or Chapter 3 "मीरा के पद" secondary theme.',
                  misconception: 'Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list things like "charkha," "roti,".' },
                { id: 'b', prompt: 'Explain in your own words how the secondary theme of "beauty in the mundane" operates differently in the two poems: "नहीं वोस्यक" and "मैंने देखा, एक चाँद".', answer: 'Correct answer: In "नहीं वोस्यक", beauty in the mundane is argued intellectually',
                  options: ['Correct answer: In "नहीं वोस्यक", beauty in the mundane is argued intellectually', 'descriptions of poor people\'s lives', 'secondary theme', 'subplot'],
                  hint: 'If stuck, review Class 11 Aroh Chapter 1 "नमक का दारोगा" or Chapter 3 "मीरा के पद" secondary theme.',
                  misconception: 'Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list things like "charkha," "roti,".' },
                { id: 'c', prompt: 'Compare the role of "transformation" in both poems. In "नहीं वोस्यक", what transforms? In "मैंने देखा, एक चाँद", what transforms?', answer: 'Correct answer: In "नहीं वोस्यक", *perception* transforms',
                  options: ['Correct answer: In "नहीं वोस्यक", *perception* transforms', 'both show poor things becoming beautiful', 'secondary theme', 'subplot'],
                  hint: 'If stuck, review Class 11 Aroh Chapter 1 "नमक का दारोगा" or Chapter 3 "मीरा के पद" secondary theme.',
                  misconception: 'Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list things like "charkha," "roti,".' }
          ],
            remediations: { 'students-often-confuse-secondary-theme': { steps: ['If the student lists nouns instead of thematic statements: (1) Have them re-read the last stanza of "नहीं वोस्यक" and.', '(3) Practice converting 5 nouns from the poem into thematic statements.', '(4) Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list things like.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student interpretation: "The secondary theme of \'मैंने देखा, एक चाँद\' is hunger because the roti represents food scarcity." Is this a valid.', answer: 'Correct answer: No, it is not a valid secondary theme',
                  options: ['Correct answer: No, it is not a valid secondary theme', 'secondary theme', 'subplot', 'minor topic mentioned once'],
                  hint: 'If stuck, review Class 11 Aroh Chapter 1 "नमक का दारोगा" or Chapter 3 "मीरा के पद" secondary theme.',
                  misconception: 'Students often confuse "secondary theme" with "subplot" or "minor topic mentioned once." They list things like "charkha," "roti,".' }
          ],
            remediations: { 'students-often-confuse-secondary-theme': { steps: ['If the student lists nouns instead of thematic statements: (1) Have them re-read the last stanza of "नहीं वोस्यक" and.', '(3) Practice converting 5 nouns from the poem into thematic statements.', '(4) Re-attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_008', difficulty: 'standard',
          question: '\'मैंने देखा, एक चाँद\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फंसे हुए महसूस हों, तो कक्षा 11 के पाठ 6 के नोड c11_hin_a_cbse_03_006 (मुख्य विषय और.',
          misconception: 'छात्र अक्सर मानते हैं कि कविता का मुख्य भाव केवल \'एक दिया और एक बूँद देखना\' है — यानी वे कविता के शाब्दिक, दृश्य विवरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैंने देखा, एक चाँद\' में बिंब (imagery)',
                  options: ['\'मैंने देखा, एक चाँद\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'मैंने देखा, एक चाँद\' का कथानक', '\'मैंने देखा, एक चाँद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे हुए महसूस हों, तो कक्षा 11 के पाठ 6 के नोड c11_hin_a_cbse_03_006 (मुख्य विषय और संदेश) की.',
                  misconception: 'छात्र अक्सर मानते हैं कि कविता का मुख्य भाव केवल \'एक दिया और एक बूँद देखना\' है — यानी वे कविता के शाब्दिक, दृश्य विवरण को मुख्य भाव मान.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र मुख्य भाव को शाब्दिक रूप से समझ रहा है, तो उसे कविता के प्रत्येक stanza को आवाज़ में पढ़ने के लिए कहिए और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_009', difficulty: 'standard',
          question: '\'मैंने देखा, एक चाँद\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review "Symbol vs Metaphor" distinction in c12_hin_a_cbse_03_008 and practice.',
          misconception: 'Students often conflate **symbolism with metaphor** — they think any comparison is a symbol.',
          parts: [
                { id: 'a', prompt: 'Identify one symbol in "मैंने देखा, एक चाँद" and explain how the poet develops its symbolic meaning across the poem.', answer: 'The moon (चाँद) functions as a symbol of fragile freedom',
                  options: ['The moon (चाँद) functions as a symbol of fragile freedom', 'moon = beauty'],
                  hint: 'If stuck, review "Symbol vs Metaphor" distinction in c12_hin_a_cbse_03_008 and practice annotating.',
                  misconception: 'Students often conflate **symbolism with metaphor** — they think any comparison is a symbol.' }
          ],
            remediations: { 'students-often-conflate-symbolism-with': { steps: ['Revisit node c12_hin_a_cbse_03_008 (Imagery and Metaphor) to sharpen the distinction: metaphor = explicit comparison.', 'Re-read "नहीं वोस्यक" marking every occurrence of "नहीं" and "यह" — trace how the poem builds an expectation then.', 'For symbolism, list all concrete nouns in "मैंने देखा, एक चाँद" (चाँद, फूल, पवन, तेल, गंध) and write the abstract idea.', 'Re-diagnostic: Write one PEEL paragraph analyzing the irony in the title "नहीं वोस्यक" using the structure: Point →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_010', difficulty: 'standard',
          question: '\'मैंने देखा, एक चाँद\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि शब्दों के शब्दकोश अर्थ याद नहीं आ रहे हैं तो कक्षा 11 के नोड c11_hin_a_cbse_03_010.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि वे किसी शब्द का शब्दकोश अर्थ जानते हैं तो वे उसकी भावात्मक व्याख्या भी सही कर सकते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैंने देखा, एक चाँद\' की पदावली',
                  options: ['\'मैंने देखा, एक चाँद\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'मैंने देखा, एक चाँद\' का कथानक', '\'मैंने देखा, एक चाँद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि शब्दों के शब्दकोश अर्थ याद नहीं आ रहे हैं तो कक्षा 11 के नोड c11_hin_a_cbse_03_010 (पदावली.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि वे किसी शब्द का शब्दकोश अर्थ जानते हैं तो वे उसकी भावात्मक व्याख्या भी सही कर सकते हैं—जैसे वे "बूँद" का अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि कोई छात्र इस भ्रम में फंसा हुआ है तो उसे निम्नलिखित चरण-दर-चरण प्रक्रिया का पालन कराना चाहिए: (1) कविता की कोई एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_011', difficulty: 'standard',
          question: '\'मैंने देखा, एक चाँद\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck on samAs vigraha or karak assignment, review Class 11 Chapter 3 grammar.',
          misconception: 'Students treat "Language Usage" as **vocabulary listing** (defining "izÑr", "Lo;aHkw", "v;qr%") rather than.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैंने देखा, एक चाँद\' में भाषा-प्रयोग',
                  options: ['\'मैंने देखा, एक चाँद\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'मैंने देखा, एक चाँद\' का कथानक', '\'मैंने देखा, एक चाँद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck on samAs vigraha or karak assignment, review Class 11 Chapter 3 grammar exercises.',
                  misconception: 'Students treat "Language Usage" as **vocabulary listing** (defining "izÑr", "Lo;aHkw", "v;qr%") rather than **grammatical analysis**.' }
          ],
            remediations: { 'students-treat-language-usage-as': { steps: ['**Revisit Class 11 Grammar Node**: Go to `c11_hin_ar_cbse_03_011` (or any Chapter 3 grammar node) and re-do the.', '**Mini-drill**: Take 5 lines from "nhi vosQyk", parse every verb (mood, tense, person), every compound (samAs type).', '**Re-diagnostic**: Answer Diagnostic Question 2 and 4 again *without notes*.', 'If you still paraphrase instead of analyzing grammatical function, repeat step 2 with a peer — teach them the parsing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_03_012', difficulty: 'standard',
          question: '\'मैंने देखा, एक चाँद\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फंसें, तो कक्षा 11 के नोड c11_hin_a_cbse_03_012 में वस्तुनिष्ठ और आशय-सूचक प्रश्नों.',
          misconception: 'छात्र अक्सर वस्तुनिष्ठ और आशय-सूचक प्रश्नों के उत्तर को एक ही तरह लिखते हैं — जैसे कि "कवि ने एक दीप और एक बूँद देखी".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मैंने देखा, एक चाँद\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'मैंने देखा, एक चाँद\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'मैंने देखा, एक चाँद\' का कथानक', '\'मैंने देखा, एक चाँद\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसें, तो कक्षा 11 के नोड c11_hin_a_cbse_03_012 में वस्तुनिष्ठ और आशय-सूचक प्रश्नों के आधारभूत.',
                  misconception: 'छात्र अक्सर वस्तुनिष्ठ और आशय-सूचक प्रश्नों के उत्तर को एक ही तरह लिखते हैं — जैसे कि "कवि ने एक दीप और एक बूँद देखी" दोनों प्रकार के.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि दो अलग-अलग प्रश्न लाइए: (1) "कवि ने क्या देखा?" — उत्तर में केवल "एक अकेला दिया और एक बूँद" लिखवाइए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
