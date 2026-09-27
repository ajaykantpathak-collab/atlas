import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch16_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch16_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch16_p3',
    title: 'आओ, मलिकर बचाएँ · Part 3/3',
    subtitle: 'Enter a poem that shelters the village inside language itself.',
    classLevel: 11, subject: 'hin_ar', topic: 'आओ, मलिकर बचाएँ · Part 3/3',
    chapters: ['c11_hin_ar_ch16'],
    nodeIds: ['c11_hin_ar_cbse_16_013', 'c11_hin_ar_cbse_16_014', 'c11_hin_ar_cbse_16_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a village-born poet writing back to his own roots', intro: 'Rural hunger and city alienation share one poem — and the poet who left the village must decide whether to expose it or protect it.', goal: 'Analyse dialect as aesthetic choice and the poem\'s three-part protective structure.' },
    discovery: {
        question: 'A Nagpuri-speaking poet chooses \'tyok;q\' over standard Hindi \'tyok\' — just dialect flavour?',
        options: ['No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act', 'Yes — it means the same thing either way', 'Yes — he just didn\'t know standard Hindi', 'No — because Nagpuri is actually a different language entirely'],
        answer: 'No — dialect keeps the rhythm and earthiness of lived rural speech; choosing it over Sanskritised Hindi is a political-aesthetic act',
        hook: 'The poem\'s \'let\'s hide/save\' means both conceal and protect — the insider-outsider poet wraps language around wounds so they can be witnessed without being exposed.',
    },
    teaching: [
        { title: 'आओ, मलिकर बचाएँ — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण (Interpretation of Intended Meaning) is the analytical process of explaining the poet\'s deeper purpose, thematic significance, and emotional undertone behind specific lines or stanzas.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_16_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Track the three-stanza arc — invitation, catalog of burdens, quiet resistance — and test whether the shape is inevitable or arbitrary.',
        labels: ['आओ, मलिकर बचाएँ —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c11_hin_ar_cbse_16_013', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['**विषयगत संबंध स्थापित करें** — यह रूपक केंद्रीय भाव "मलिकर.', '**प्रसंग-स्थिति पहचानें** — यह अंश कविता के मध्य भाग में.', '**प्रमुख युक्तियाँ चिह्नित करें** — (क) रूपक: "मलिकर.', '**युक्ति → प्रभाव → अर्थ श्रृंखला बनाएँ** — रूपक "बीज".', '**संरचित उत्तर लिखें** — तीन पैरा: प्रसंग, युक्ति-विश्लेषण.'], answer: '**प्रसंग-स्थिति पहचानें** — यह अंश कविता के मध्य भाग में. **प्रमुख युक्तियाँ चिह्नित करें** — (क) रूपक: "मलिकर. **युक्ति → प्रभाव → अर्थ श्रृंखला बनाएँ** — रूपक "बीज". **विषयगत संबंध स्थापित करें** — यह रूपक केंद्रीय भाव "मलिकर. **संरचित उत्तर लिखें** — तीन पैरा: प्रसंग, युक्ति-विश्लेषण.' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_013', title: 'Use it in the wild',
          caseStudy: { intro: 'A translation club discusses a Nagpur-born poet who writes in Marathi and translates himself into Hindi, with a poem that begins \'come, let us hide\' and ends in quiet resistance. A member says: \'Pick either the village reading or the city reading — a poem can\'t be both. And the second stanza\'s long list is just imagery.\'',
            decisions: [{ prompt: 'What do both claims miss?', options: [
                { text: 'Hold the fracture: the poem speaks from inside the split between two Indias — the village with its caste, hunger and oral tradition versus the city with alienation and broken promises; the poet\'s self-translation embodies that crossing. And the list IS structure: stanza one commands (\'hide\'), stanza two stacks the burdens of modernity as rhythmic accumulation, stanza three turns declarative — \'even in this night, there\'s still much to hide.\' The form performs the hiding.', outcome: 'Both corrections land: the doubleness is the poem\'s subject, and the stanza pattern — imperative, catalogue, declaration — is the argument enacted, not ornament.' },
                { text: 'Choose the city reading — the poem lists modern burdens, so it\'s about urban alienation only.', outcome: 'Halving it destroys the tension: the poem\'s meaning lives in the contrast between village and city, agrarian memory and urban displacement.', reveals: 'pick-one-world-reading' },
                { text: 'Treat the middle stanza\'s list as decorative imagery to be sampled, not analysed.', outcome: 'The accumulation is structural enactment — the burdens pile up rhythmically so the reader feels the weight the speaker hides from.', reveals: 'list-is-just-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_16_015', title: 'You made it',
          caseStudy: { intro: 'Invitation → enumeration → affirmation: a three-beat arc where each stanza tucks the reader deeper into what the modern world erodes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण (Interpretation of Intended Meaning) is the analytical process.',
          hint: 'यदि अटके हों तो c11_hin_ar_cbse_16_006 और c11_hin_ar_cbse_16_007 के "युक्ति-पहचान अभ्यास".',
          misconception: 'छात्र प्रायः मानते हैं कि आशय-स्पष्टीकरण में **कठिन शब्दों का अर्थ लिखना** या **पंक्तियों का क्रमवार अनुवाद** करना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण (Interpretation of Intended Meaning) is the analytical process of',
                  options: ['आशय-स्पष्टीकरण (Interpretation of Intended Meaning) is the analytical process of', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद'],
                  hint: 'यदि अटके हों तो c11_hin_ar_cbse_16_006 और c11_hin_ar_cbse_16_007 के "युक्ति-पहचान अभ्यास" दोहराएँ.',
                  misconception: 'छात्र प्रायः मानते हैं कि आशय-स्पष्टीकरण में **कठिन शब्दों का अर्थ लिखना** या **पंक्तियों का क्रमवार अनुवाद** करना पर्याप्त है। वे "कवि.' }
          ],
            remediations: { 'content': { steps: ['**पृथक्करण अभ्यास:** छात्र से एक ही पंक्ति का पहले "भावार्थ" लिखवाएँ, फिर "आशय" — दोनों को आमने-सामने रखकर अंतर स्पष्ट.', '**उपकरण-प्रभाव श्रृंखला (Device→Effect→Meaning):** एक टेबल बनवाएँ: कॉलम 1 — युक्ति (रूपक/अनुप्रास/प्रतीक), कॉलम 2.', '**मॉडल उत्तर विश्लेषण:** बोर्ड के आदर्श उत्तर (model answer) देकर उसमें **तीन चालें** (contextualization, device-chain.', '**मौखिक रिहर्सल:** छात्र से कहें — "मानो तुम कवि हो, समझाओ तुमने यह रूपक *यहाँ* क्यों रखा?" — यह भूमिका-परिवर्तन (role.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल, पाठ्यक्रम की समझ को बोर्ड परीक्षा के मानकों (शब्द.',
          hint: 'यदि अटके तो c11_hin_ar_cbse_16_013 (आशय-स्पष्टीकरण) के \'विश्लेषण अभ्यास\' दोहराएं और.',
          misconception: 'छात्र मानते हैं कि "लंबा उत्तर = अधिक अंक" और इसलिए 3 अंकों के प्रश्न में पृष्ठ भर देते हैं, जबकि CBSE मार्किंग स्कीम.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल, पाठ्यक्रम की समझ को बोर्ड परीक्षा के मानकों (शब्द सीमा, अंक',
                  options: ['परीक्षा-उत्तर लेखन कौशल, पाठ्यक्रम की समझ को बोर्ड परीक्षा के मानकों (शब्द सीमा, अंक', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद'],
                  hint: 'यदि अटके तो c11_hin_ar_cbse_16_013 (आशय-स्पष्टीकरण) के \'विश्लेषण अभ्यास\' दोहराएं और.',
                  misconception: 'छात्र मानते हैं कि "लंबा उत्तर = अधिक अंक" और इसलिए 3 अंकों के प्रश्न में पृष्ठ भर देते हैं, जबकि CBSE मार्किंग स्कीम \'बिंदुवार सटीकता\'.' }
          ],
            remediations: { '3': { steps: ['चरण 1: छात्र से कहें — "पिछले वर्ष के CBSE टॉपर की उत्तर पुस्तिका (Model Answer Sheet) देखें: उत्तर कहाँ शुरू होता है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_16_015', difficulty: 'standard',
          question: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है: कविता को **शुद्ध उच्चारण, उचित विराम.',
          hint: 'यदि **छंद-गणना** में अटके — c11_hin_ar_cbse_16_005 (छंद और लय-विधान) के \'मात्रिक गणना.',
          misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **\'वाचन-पाठ\' = \'तेज़ आवाज़ में पढ़ देना\'** और **\'चर्चा-बिंदु\' = \'कहानी का सार.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-पाठ और चर्चा-बिंदु का अर्थ है: कविता को **शुद्ध उच्चारण, उचित विराम, लय-गति और',
                  options: ['वाचन-पाठ और चर्चा-बिंदु का अर्थ है: कविता को **शुद्ध उच्चारण, उचित विराम, लय-गति और', 'कवि परिचय और पृष्ठभूमि का अर्थ है कवि के जीवन-परिचय (जन्म, शिक्षा, प्रमुख रचनाएँ,', 'पद्यांश-वार भावार्थ, कविता के प्रत्येक पद/पंक्ति समूह के शब्दों, प्रसंग, अलंकार और', 'काव्य-संरचना (Poetic Structure) से तात्पर्य कविता के बाह्य रूप-विधान से है जिसमें पद/छंद'],
                  hint: 'यदि **छंद-गणना** में अटके — c11_hin_ar_cbse_16_005 (छंद और लय-विधान) के \'मात्रिक गणना अभ्यास\'.',
                  misconception: '**विशिष्ट भ्रम**: छात्र समझते हैं कि **\'वाचन-पाठ\' = \'तेज़ आवाज़ में पढ़ देना\'** और **\'चर्चा-बिंदु\' = \'कहानी का सार बताना\'**।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**ध्वनि-अभ्यास (2 दिन)**: कविता के **प्रत्येक पद को 3 बार पढ़ो** — पहली बार केवल **मात्रा गिनते हुए** (गण-गणना), दूसरी.', '**PEEL-ड्रिल (3 दिन)**: रोज़ **एक चर्चा-बिंदु** लो और उसका उत्तर **PEEL शीट** पर लिखो — Point/Evidence/Explanation/Link.', '**प्रतीक-मानचित्र (1 दिन)**: कविता के **प्रमुख प्रतीक (मलिकर, कंदर, प्रलय, अग्नि, जल)** को केंद्र में रखकर.', '**मॉक-वाचन (परीक्षा से 1 दिन पहले)**: पूरी कविता **स्टॉपवॉच के साथ** पढ़ो — **2 मिनट 30 सेकंड** आदर्श समय है। रिकॉर्ड.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
