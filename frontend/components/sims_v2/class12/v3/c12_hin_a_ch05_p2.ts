import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch05_p2: SimDef = {
    id: 'v3_c12_hin_a_ch05_p2',
    title: 'रघुवीर सहाय · Part 2/3',
    subtitle: 'When the wheel stops, a whole culture stops',
    classLevel: 12, subject: 'hin_a', topic: 'रघुवीर सहाय · Part 2/3',
    chapters: ['c12_hin_a_ch05'],
    nodeIds: ['c12_hin_a_cbse_05_007', 'c12_hin_a_cbse_05_008', 'c12_hin_a_cbse_05_009', 'c12_hin_a_cbse_05_010', 'c12_hin_a_cbse_05_011', 'c12_hin_a_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Social-realist poetry reader', intro: 'A journalist-poet sets down his notebook and picks up the potter\'s vocabulary instead.', goal: 'Read the potter poems through Jagdish Lalak\'s journalistic eye — dialect as realism, craft as vanishing culture.' },
    discovery: {
        question: 'A journalist-poet writes about a Haryana potter in the potter\'s own dialect — \'fiQjdh\', \'uanu\' and all. Why not translate him into polished Hindi?',
        options: ['Dialect is realism and empathy — the village must sound like itself; polishing it would break the very world the poem honours', 'Dialect is just flavour', 'He lacked vocabulary', 'To test the reader'],
        answer: 'Dialect is realism and empathy — the village must sound like itself; polishing it would break the very world the poem honours',
        hook: 'The potter and his wheel are one system — body, skill and cyclical tradition; when the wheel stops, a culture stops. Journalism taught Lalak the colloquial register that reaches beyond Haryana — local speech, universal hearing.',
    },
    teaching: [
        { title: 'रघुवीर सहाय — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'अंतरा भाग-2 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Listen at the potter\'s wheel: weigh dialect as documentary fidelity, read man and wheel as a single craft, and feel what\'s lost when such poems stop being written.',
        labels: ['रघुवीर सहाय — साहित्यिक', 'रघुवीर सहाय — मुख्य', 'रघुवीर सहाय — गौण', 'रघुवीर सहाय — पदावली', 'रघुवीर सहाय — व्याकरण', 'रघुवीर सहाय — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_007', title: 'रघुवीर सहाय — साहित्यिक युक्तियाँ: प्रतीक और बिंब',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 5\' में अंतरा-भाग-2-—-पाठ-5 जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme in terms of textual prominence and.', options: [
                { text: 'A secondary theme is a recurring idea that supports, contrasts, or complicates the', outcome: 'A secondary theme is a recurring idea that supports, contrasts, or complicates the primary theme.' },
                { text: 'less important', outcome: 'Not quite — Students often confuse "secondary theme" with "minor detail" or "subplot".', reveals: 'students-often-confuse-secondary-theme' },
                { text: 'secondary theme', outcome: 'Not quite — Students often confuse "secondary theme" with "minor detail" or "subplot".', reveals: 'students-often-confuse-secondary-theme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_008', title: 'रघुवीर सहाय — मुख्य भाव और संदेश',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 5\' में बिंब ढूँढिए — अंतरा-भाग-2-—-पाठ-5 — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'What is the precise difference between a metaphor and a simile? Give one example of each from everyday Hindi usage.', options: [
                { text: 'A metaphor directly equates two things (e.g., "समय धन है"', outcome: 'A metaphor directly equates two things (e.g., "समय धन है" — Time is money), while a simile uses.' },
                { text: 'both compare things', outcome: 'Not quite — Students often treat imagery and metaphor as decorative "ornaments" added to a poem, rather than.', reveals: 'students-often-treat-imagery-and' },
                { text: 'जीवन एक प्रवाह है', outcome: 'Not quite — Students often treat imagery and metaphor as decorative "ornaments" added to a poem, rather than.', reveals: 'students-often-treat-imagery-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_009', title: 'रघुवीर सहाय — गौण भाव और विषयांतर',
          caseStudy: { intro: '\'अंतरा भाग-2 — पाठ 5\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example from everyday life for each.', options: [
                { text: 'Irony: a situation where the outcome is contrary to what was expected (e.g., a fire', outcome: 'Irony: a situation where the outcome is contrary to what was expected (e.g., a fire station burning.' },
                { text: 'funny coincidence', outcome: 'Not quite — Students often equate irony with "unfortunate coincidence" (e.g., "It rained on my wedding day.', reveals: 'students-often-equate-irony-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a documentary assignment on the old woman who has carried loads at the mandi for fifty years, your partner wants to end on a sponsor\'s donation — \'give it a clean resolution so it doesn\'t feel unfinished.\'',
            decisions: [{ prompt: 'What does the ending of Nagarjun\'s poem about the old woman suggest?', options: [
                { text: 'End with the question, not the fix — the poem closes by turning from her story to a direct question at the reader, making society\'s neglect the unresolved fact; a sponsor\'s cheque would manufacture closure the reality hasn\'t earned.', outcome: 'The chapter calls this the modernist open resolution: the story hands responsibility to the audience instead of discharging it — your film should do the same.' },
                { text: 'Use the donation ending — leaving a documentary unresolved is weak storytelling.', outcome: 'That reads closure as craft; the poem shows the unanswered ending is the stronger structure because the neglect is real and continuing — a neat fix would lie.', reveals: 'endings-must-resolve' },
                { text: 'End on her statistics — years worked, loads carried — so the film closes with evidence, not sentiment.', outcome: 'Numbers summarise her but don\'t turn the gaze; the poem\'s final move is a question that conscripts the viewer — data can\'t perform that transfer of responsibility.', reveals: 'data-is-the-ending' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_05_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear dialect as the poem\'s conscience — a vanishing world recorded in its own accent.',
            decisions: [{ prompt: 'What comes next? रघुवीर सहाय · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — रघुवीर सहाय · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_007', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, revisit the "Theme: Primary Theme and Message" node (c12_hin_a_cbse_05_006) and.',
          misconception: 'Students often confuse "secondary theme" with "minor detail" or "subplot".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'अंतरा भाग-2 — पाठ 5\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 5\' का कथानक — \'अंतरा भाग-2 — पाठ 5\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, revisit the "Theme: Primary Theme and Message" node (c12_hin_a_cbse_05_006) and re-read.',
                  misconception: 'Students often confuse "secondary theme" with "minor detail" or "subplot".' }
          ],
            remediations: { 'students-often-confuse-secondary-theme': { steps: ['If the student cannot distinguish secondary themes, take them back to the poem "olar vk;k" and do a three-column.', 'Have them write one sentence per column summarizing the thread.', 'Then repeat for "rksM+ks" with columns: physical labor, mental purification, social refusal.', 'This visual separation builds the clustering habit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_008', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 5\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck, review the "Imagery Classification Chart" from Class 11 (node.',
          misconception: 'Students often treat imagery and metaphor as decorative "ornaments" added to a poem, rather than as the **structuring.',
          parts: [
                { id: 'a', prompt: 'What is the precise difference between a metaphor and a simile? Give one example of each from everyday Hindi usage.', answer: 'A metaphor directly equates two things (e.g., "समय धन है"',
                  options: ['A metaphor directly equates two things (e.g., "समय धन है"', 'both compare things', 'जीवन एक प्रवाह है'],
                  hint: 'If stuck, review the "Imagery Classification Chart" from Class 11 (node c11_hin_ar_cbse_08_008) and.',
                  misconception: 'Students often treat imagery and metaphor as decorative "ornaments" added to a poem, rather than as the **structuring logic** of Prasad\'s.' }
          ],
            remediations: { 'students-often-treat-imagery-and': { steps: ['**Revisit Class 11 Imagery/Metaphor nodes** (e.g., c11_hin_ar_cbse_01_008): Reread the definitions and the worked.', '**Do a "Device Hunt"**: Take any 4 lines from "olar vk;k".', 'Highlight every sensory word in one colour, every metaphor in another.', '**Write the "So What?" sentence**: For each highlighted item, write one sentence: "This [image/metaphor] makes the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_009', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 5\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, revisit the "Symbol Test" (recurrence + semantic shift + thematic link) and the.',
          misconception: 'Students often equate irony with "unfortunate coincidence" (e.g., "It rained on my wedding day — how ironic!") and.',
          parts: [
                { id: 'a', prompt: 'Identify one symbol in "Raksaks" and explain how its meaning shifts across the three stanzas.', answer: 'The "house" (ghar) is the central symbol',
                  options: ['The "house" (ghar) is the central symbol', 'the house symbolizes life', 'treats the house only as a building fails to track the semantic shift'],
                  hint: 'If stuck, revisit the "Symbol Test" (recurrence + semantic shift + thematic link) and the "Irony.',
                  misconception: 'Students often equate irony with "unfortunate coincidence" (e.g., "It rained on my wedding day — how ironic!") and treat every noun in.' }
          ],
            remediations: { 'students-often-equate-irony-with': { steps: ['If a student cannot distinguish irony from coincidence: 1) Give three clear examples (verbal, situational, dramatic).', '2) Return to "Olar Vak" stanza 2 and have them complete a two-column table: "What the old man says" vs.', 'If a student over-identifies symbols: 1) Provide the "Symbol Test": Does the object appear ≥2 times?', 'Does its meaning change/deepen?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate irony with "unfortunate coincidence" (e.g., "It rained on my wedding day — how ironic!") and.',
          parts: [
                { id: 'a', prompt: 'Evaluate which poem uses symbolism more effectively to convey the inevitability of aging. Support your judgment with two textual reasons.', answer: '"Raksaks" uses symbolism more effectively',
                  options: ['"Raksaks" uses symbolism more effectively', 'Olar Vak', 'it has more symbols'],
                  hint: 'If stuck, revisit the "Symbol Test" (recurrence + semantic shift + thematic link) and the "Irony.',
                  misconception: 'Students often equate irony with "unfortunate coincidence" (e.g., "It rained on my wedding day — how ironic!") and treat every noun in.' }
          ],
            remediations: { 'students-often-equate-irony-with': { steps: ['If a student cannot distinguish irony from coincidence: 1) Give three clear examples (verbal, situational, dramatic).', '2) Return to "Olar Vak" stanza 2 and have them complete a two-column table: "What the old man says" vs.', 'If a student over-identifies symbols: 1) Provide the "Symbol Test": Does the object appear ≥2 times?', 'Does its meaning change/deepen?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_010', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 5\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि फँस जाएँ तो **पद्यांश-वार भावार्थ (c12_hin_a_cbse_05_002)** पर लौटें और उस विशिष्ट.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कठिन शब्द" का अर्थ **केवल संस्कृतनिष्ठ/तत्सम शब्द** (Sanskritized/tatsama.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 5\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 5\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 5\' का कथानक — \'अंतरा भाग-2 — पाठ 5\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँस जाएँ तो **पद्यांश-वार भावार्थ (c12_hin_a_cbse_05_002)** पर लौटें और उस विशिष्ट पंक्ति को.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कठिन शब्द" का अर्थ **केवल संस्कृतनिष्ठ/तत्सम शब्द** (Sanskritized/tatsama words) होता है और.' }
          ],
            remediations: { 'sanskritized-tatsama-words': { steps: ['**चरणबद्ध उपचार (remediation):** 1.', '**पुनः पठन (re-reading):** कविता के **पद्यांश-वार भावार्थ** (c12_hin_a_cbse_05_002) को दोबारा पढ़ें और हर पंक्ति में आए.', '**तालिका निर्माण:** दो स्तंभ बनाएँ — **स्तंभ A:** शब्द/मुहावरा (शाब्दिक अर्थ), **स्तंभ B:** कविता में प्रसंगानुकूल.', '**मुहावरा-विश्लेषण अभ्यास:** कविता से किन्हीं 3 मुहावरों को चुनें और प्रत्येक के लिए लिखें: (क) शाब्दिक अर्थ, (ख).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_011', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 5\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck, review Class 11 Hindi Vyakaran Chapter on "Kriya ke Kaal aur Karak" and.',
          misconception: 'Students treat dialectal forms in the poem as "incorrect Hindi" or "mistakes" rather than as a coherent grammatical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 5\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'अंतरा भाग-2 — पाठ 5\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 5\' का कथानक — \'अंतरा भाग-2 — पाठ 5\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review Class 11 Hindi Vyakaran Chapter on "Kriya ke Kaal aur Karak" and "Samasa".',
                  misconception: 'Students treat dialectal forms in the poem as "incorrect Hindi" or "mistakes" rather than as a coherent grammatical system with its own.' }
          ],
            remediations: { 'students-treat-dialectal-forms-in': { steps: ['Have the student list 5 verb forms from the poem that "look wrong" (e.g., pyrs, fiQjdh, ngj&ngj).', 'For each, find the standard Khari Boli equivalent using a grammar reference.', 'Identify the specific grammatical difference (tense, aspect, gender, number, reduplication).', 'Re-read the poem asking: "What does THIS form DO that the standard form cannot?" — e.g., "pyrs pyrs pyrs" enacts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_05_012', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 5\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि छात्र आशय-सूचक प्रश्नों के उत्तर में केवल पाठ की दोहराव दे रहा है, तो उसे.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में पाठ से प्रत्यक्ष उद्धरण दे देते हैं और मानते हैं कि उनका काम पूरा हो गया है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 5\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 5\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 5\' का कथानक — \'अंतरा भाग-2 — पाठ 5\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र आशय-सूचक प्रश्नों के उत्तर में केवल पाठ की दोहराव दे रहा है, तो उसे c12_hin_a_cbse_05_004.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में पाठ से प्रत्यक्ष उद्धरण दे देते हैं और मानते हैं कि उनका काम पूरा हो गया है, जैसे कि "कविता में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही वाक्य अलग-अलग संदर्भों में अलग अर्थ दे सकता है। उदाहरण: "दिया बुझ गया" — एक विज्ञान पाठ में.', 'इस प्रकार रूपक के भावनात्मक अर्थ को जोड़कर समझाइए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
