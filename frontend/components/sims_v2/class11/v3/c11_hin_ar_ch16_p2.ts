import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch16_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch16_p2: SimDef = {
    id: 'v3_c11_hin_ar_ch16_p2',
    title: 'आओ, मलिकर बचाएँ · Part 2/3',
    subtitle: 'Enter a poem that shelters the village inside language itself.',
    classLevel: 11, subject: 'hin_ar', topic: 'आओ, मलिकर बचाएँ · Part 2/3',
    chapters: ['c11_hin_ar_ch16'],
    nodeIds: ['c11_hin_ar_cbse_16_007', 'c11_hin_ar_cbse_16_008', 'c11_hin_ar_cbse_16_009', 'c11_hin_ar_cbse_16_010', 'c11_hin_ar_cbse_16_011', 'c11_hin_ar_cbse_16_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village-born poet writing back to his own roots', intro: 'Rural hunger and city alienation share one poem — and the poet who left the village must decide whether to expose it or protect it.', goal: 'Analyse dialect as aesthetic choice and the poem\'s three-part protective structure.' },
    discovery: {
        question: 'A Nagpuri-speaking poet chooses \'tyok;q\' over standard Hindi \'tyok\' — just dialect flavour?',
        options: ['No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act', 'Yes — it means the same thing either way', 'Yes — he just didn\'t know standard Hindi', 'No — because Nagpuri is actually a different language entirely'],
        answer: 'No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act',
        hook: 'The poem\'s \'let\'s hide/save\' means both conceal and protect — the insider-outsider poet wraps language around wounds so they can be witnessed without being exposed.',
    },
    teaching: [
        { title: 'आओ, मलिकर बचाएँ — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'वक्वक्स] फेद्ज च्प्क,¡\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_16_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the three-stanza arc — invitation, catalog of burdens, quiet resistance — and test whether the shape is inevitable or arbitrary.',
        labels: ['आओ, मलिकर बचाएँ —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_007', title: 'आओ, मलिकर बचाएँ — साहित्यिक युक्तियाँ: प्रतीक और बिंब',
          caseStudy: { intro: '\'वक्वक्स] फेद्ज च्प्क,¡\' में वक्वक्स]-फेद्ज-च्प्क,¡ जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature?', options: [
                { text: 'A secondary theme is a subordinate idea that supports or complements the primary theme,', outcome: 'A secondary theme is a subordinate idea that supports or complements the primary theme, exploring.' },
                { text: 'it\'s just another topic', outcome: 'Not quite — Students often list topics like "farming," "seasons," or "village life" as secondary themes without.', reveals: 'students-often-list-topics-like' },
                { text: 'the theme is farming', outcome: 'Not quite — Students often list topics like "farming," "seasons," or "village life" as secondary themes without.', reveals: 'students-often-list-topics-like' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_010', title: 'आओ, मलिकर बचाएँ — पदावली: कठिन शब्द और मुहावरे',
          caseStudy: { intro: '\'वक्वक्स] फेद्ज च्प्क,¡\' के मुख्य शब्द: वक्वक्स]-फेद्ज-च्प्क,¡ — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'From the \'शब्द-अर्थ\' box in the textbook, which word is defined as "किसी चीज़ को लेकर जुनून की हद तक चले जाने का भाव"?', options: [
                { text: '**विडम्बन** (vD[kM+iu)', outcome: 'The correct answer is **विडम्बन** (vD[kM+iu). A wrong answer like "तर्कशीलता" reveals the student.' },
                { text: 'तर्कशीलता', outcome: 'Not quite — Students treat the \'शब्द-अर्थ\' box as a definitive glossary, memorizing "वक़्स-गोक = गहरी नींद" and.', reveals: 'students-treat-the-box-as' },
                { text: 'विडम्बन', outcome: 'Not quite — Students treat the \'शब्द-अर्थ\' box as a definitive glossary, memorizing "वक़्स-गोक = गहरी नींद" and.', reveals: 'students-treat-the-box-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_011', title: 'आओ, मलिकर बचाएँ — व्याकरण: पद्य में भाषा-प्रयोग',
          caseStudy: { intro: '\'वक्वक्स] फेद्ज च्प्क,¡\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'Identify the samas (compound type) in "vkcks&gok" and "vD[kM+iu" from the poem\'s vocabulary list, and state the meaning of each compound.', options: [
                { text: 'vkcks&gok is a Tatpurusha samas (tyok;q + gok = tyok;q dk gok) meaning "deep darkness of', outcome: 'vkcks&gok is a Tatpurusha samas (tyok;q + gok = tyok;q dk gok) meaning "deep darkness of the.' },
                { text: 'poetic language', outcome: 'Not quite — Students assume "poetic language" means only figures of speech (alankar) like metaphor.', reveals: 'poetic-language-means-only-figures' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A translation club discusses a Nagpur-born poet who writes in Marathi and translates himself into Hindi, with a poem that begins \'come, let us hide\' and ends in quiet resistance. A member says: \'Pick either the village reading or the city reading — a poem can\'t be both. And the second stanza\'s long list is just imagery.\'',
            decisions: [{ prompt: 'What do both claims miss?', options: [
                { text: 'Hold the fracture: the poem speaks from inside the split between two Indias — the village with its caste, hunger and oral tradition versus the city with alienation and broken promises; the poet\'s self-translation embodies that crossing. And the list IS structure: stanza one commands (\'hide\'), stanza two stacks the burdens of modernity as rhythmic accumulation, stanza three turns declarative — \'even in this night, there\'s still much to hide.\' The form performs the hiding.', outcome: 'Both corrections land: the doubleness is the poem\'s subject, and the stanza pattern — imperative, catalogue, declaration — is the argument enacted, not ornament.' },
                { text: 'Choose the city reading — the poem lists modern burdens, so it\'s about urban alienation only.', outcome: 'Halving it destroys the tension: the poem\'s meaning lives in the contrast between village and city, agrarian memory and urban displacement.', reveals: 'pick-one-world-reading' },
                { text: 'Treat the middle stanza\'s list as decorative imagery to be sampled, not analysed.', outcome: 'The accumulation is structural enactment — the burdens pile up rhythmically so the reader feels the weight the speaker hides from.', reveals: 'list-is-just-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_012', title: 'The bigger picture',
          caseStudy: { intro: 'Invitation → enumeration → affirmation: a three-beat arc where each stanza tucks the reader deeper into what the modern world erodes.',
            decisions: [{ prompt: 'What comes next? आओ, मलिकर बचाएँ · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — आओ, मलिकर बचाएँ · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_007', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'Review the primary theme (node 006) and the setting/atmosphere (node 003) to re-ground.',
          misconception: 'Students often list topics like "farming," "seasons," or "village life" as secondary themes without articulating the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक्वक्स] फेद्ज च्प्क,¡\' के गौण विषय',
                  options: ['\'वक्वक्स] फेद्ज च्प्क,¡\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक्वक्स] फेद्ज च्प्क,¡\' का कथानक', '\'वक्वक्स] फेद्ज च्प्क,¡\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review the primary theme (node 006) and the setting/atmosphere (node 003) to re-ground yourself.',
                  misconception: 'Students often list topics like "farming," "seasons," or "village life" as secondary themes without articulating the poet\'s perspective.' }
          ],
            remediations: { 'students-often-list-topics-like': { steps: ['Ask the student to pick one recurring image (e.g., "beej" - seed) and complete the sentence: "The poet uses the seed.', 'Have them find two other images that complete the same sentence.', 'Guide them to generalize the completed sentence into a thematic statement.', 'Verify by checking if the statement can be supported by at least three distinct stanzas.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_008', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो **Node 007 (प्रतीक और बिंब)** के \'मलिकर\' प्रतीक विश्लेषण को दोबारा पढ़ें और.',
          misconception: 'छात्र प्रायः **\'मुख्य भाव\' (Central Theme) और \'संदेश\' (Message) को समानार्थी मान लेते हैं**। उदाहरण: वे लिखते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक्वक्स] फेद्ज च्प्क,¡\' में बिंब (imagery)',
                  options: ['\'वक्वक्स] फेद्ज च्प्क,¡\' में बिंब (imagery)', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक्वक्स] फेद्ज च्प्क,¡\' का कथानक', '\'वक्वक्स] फेद्ज च्प्क,¡\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **Node 007 (प्रतीक और बिंब)** के \'मलिकर\' प्रतीक विश्लेषण को दोबारा पढ़ें और **Node 002.',
                  misconception: 'छात्र प्रायः **\'मुख्य भाव\' (Central Theme) और \'संदेश\' (Message) को समानार्थी मान लेते हैं**। उदाहरण: वे लिखते हैं — "मुख्य भाव: पेड़ बचाना.' }
          ],
            remediations: { 'central-theme-message': { steps: ['**भेद स्पष्ट करें:** बोर्ड पर दो कॉलम बनाएँ — \'भाव\' (क्या महसूस होता है?', 'सहअस्तित्व, भय, आशा) और \'संदेश\' (क्या करना है?', 'संगठित हों, नीति बदलें, निगरानी करें)। 2.', '**पंक्ति-आधारित अभ्यास:** कविता की 3 पंक्तियाँ दें — छात्र बताए प्रत्येक से \'भाव\' क्या निकला और \'संदेश\' क्या निकला। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_009', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके: c11_hin_ar_cbse_16_004 (केंद्रीय भाव और रस) और c11_hin_ar_cbse_16_008 (मुख्य.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **मुख्य विषय से हटने वाला हर प्रसंग \'विषयांतर\' ही होता है**। वे \'गौण भाव\' और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक्वक्स] फेद्ज च्प्क,¡\' में विरोधाभास',
                  options: ['\'वक्वक्स] फेद्ज च्प्क,¡\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक्वक्स] फेद्ज च्प्क,¡\' का कथानक', '\'वक्वक्स] फेद्ज च्प्क,¡\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके: c11_hin_ar_cbse_16_004 (केंद्रीय भाव और रस) और c11_hin_ar_cbse_16_008 (मुख्य भाव और.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **मुख्य विषय से हटने वाला हर प्रसंग \'विषयांतर\' ही होता है**। वे \'गौण भाव\' और \'विषयांतर\' का अंतर.' }
          ],
            remediations: { 'functional-relevance': { steps: ['**केंद्रीय भाव को एक वाक्य में लिखवाएँ** — "कविता का एकमात्र उद्देश्य क्या है?" (उत्तर: मलिकर/लोक-संस्कृति बचाना)। 2.', '**हर विवादित अंश के लिए दो प्रश्न पूछें** — (अ) "क्या यह अंश मलिकर बचाने का कारण, प्रमाण, भावनात्मक बल या उपाय देता.', '**तुलना तालिका बनवाएँ** — दो स्तंभ: \'गौण भाव के लक्षण\' (समर्थन करता है, भावनात्मक बल देता है, तर्क पुष्ट करता है) बनाम.', '**अभ्यास**: कविता के 3-3 अंश देकर वर्गीकरण करवाएँ और **काव्य-पंक्ति उद्धृत कर तर्क मांगें**।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_010', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी.',
          hint: 'If stuck, review the concept of "शब्द-शक्ति" (word-power: अभिधा, लक्षणा, व्यंजना) from.',
          misconception: 'Students treat the \'शब्द-अर्थ\' box as a definitive glossary, memorizing "वक़्स-गोक = गहरी नींद" and stopping there.',
          parts: [
                { id: 'a', prompt: 'From the \'शब्द-अर्थ\' box in the textbook, which word is defined as "किसी चीज़ को लेकर जुनून की हद तक चले जाने का भाव"?', answer: '**विडम्बन** (vD[kM+iu)',
                  options: ['**विडम्बन** (vD[kM+iu)', 'तर्कशीलता', 'विडम्बन'],
                  hint: 'If stuck, review the concept of "शब्द-शक्ति" (word-power: अभिधा, लक्षणा, व्यंजना) from Class 9-10.',
                  misconception: 'Students treat the \'शब्द-अर्थ\' box as a definitive glossary, memorizing "वक़्स-गोक = गहरी नींद" and stopping there.' }
          ],
            remediations: { 'students-treat-the-box-as': { steps: ['Have the student locate all 3 occurrences of "वक़्स-गोक" in the poem and write the exact line for each.', 'Ask "What is the grammatical role here? Noun? Adverb? Verb modifier?"', 'Guide them to see the shift: first occurrence = noun (the deep sleep of tradition), second = adverbial (sleepily.', 'Assign: "Write 3 sentences using \'नींद\' in three different grammatical roles" to cement the concept.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_011', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द.',
          hint: 'Review Class 10 Hindi Grammar: Samas Vigrah and Vibhakti Pratyaya exercises, focusing.',
          misconception: 'Students assume "poetic language" means only figures of speech (alankar) like metaphor or alliteration, ignoring how.',
          parts: [
                { id: 'a', prompt: 'In the line "Hkhrj dh vkx / èkuq"k dh Mksjh", explain why the poet uses the genitive case (dh) for both "Hkhrj" and "èkuq"k" instead of the instrumental case.', answer: 'The genitive "dh" establishes possession/origin',
                  options: ['The genitive "dh" establishes possession/origin', 'poetic language'],
                  hint: 'Review Class 10 Hindi Grammar: Samas Vigrah and Vibhakti Pratyaya exercises, focusing on Tatpurusha.',
                  misconception: 'Students assume "poetic language" means only figures of speech (alankar) like metaphor or alliteration, ignoring how core grammar — case.' }
          ],
            remediations: { 'poetic-language-means-only-figures': { steps: ['Have the student rewrite three poem lines in standard prose order (SOV) and compare: "vkx Hkhrj dh gS" vs "Hkhrj.', 'Give a table of 5 poem compounds; have them split each into component words, identify samas type using the \'kCn&Nfo.', 'Ask them to replace all genitives (dh/ki/ki) with instrumental (se) in one stanza and read aloud — discuss how agency.', 'Finally, have them compose two lines using the [Noun+dh+Noun] pattern on a personal struggle, forcing grammatical.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_012', difficulty: 'standard',
          question: '\'वक्वक्स] फेद्ज च्प्क,¡\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि आशय निकालने में कठिनाई हो तो पहले stanza-wise भावार्थ (नोड 002) और केंद्रीय भाव (नोड.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में पाठ की सीधी पंक्तियों को दोहराते हैं, सोचते हैं कि यह पर्याप्त विश्लेषण है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वक्वक्स] फेद्ज च्प्क,¡\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'वक्वक्स] फेद्ज च्प्क,¡\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वक्वक्स] फेद्ज च्प्क,¡\' का कथानक', '\'वक्वक्स] फेद्ज च्प्क,¡\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि आशय निकालने में कठिनाई हो तो पहले stanza-wise भावार्थ (नोड 002) और केंद्रीय भाव (नोड 008) की.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में पाठ की सीधी पंक्तियों को दोहराते हैं, सोचते हैं कि यह पर्याप्त विश्लेषण है। उदाहरण के लिए, जब.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए: "यदि कोई वास्तव में रो रहा हो, तो कवि इसे कविता में क्यों लिखे?', 'क्या इससे कोई गहरा अर्थ हो सकता है?" फिर उनसे दो विकल्प दें: (A) शाब्दिक अर्थ: बच्चों के आंसू, (B) प्रतीकात्मक अर्थ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
