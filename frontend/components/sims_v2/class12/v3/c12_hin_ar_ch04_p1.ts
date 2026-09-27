import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch04_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch04_p1',
    title: 'कैमरे में बंद अपाहजि · Part 1/3',
    subtitle: 'He wrote in the people\'s tongue so the people could read it',
    classLevel: 12, subject: 'hin_ar', topic: 'कैमरे में बंद अपाहजि · Part 1/3',
    chapters: ['c12_hin_ar_ch04'],
    nodeIds: ['c12_hin_ar_cbse_04_001', 'c12_hin_ar_cbse_04_002', 'c12_hin_ar_cbse_04_003', 'c12_hin_ar_cbse_04_004', 'c12_hin_ar_cbse_04_005', 'c12_hin_ar_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Progressive poetry reader', intro: 'A poet-journalist who wrote for the ignored decides the poem itself must speak like them.', goal: 'Read Nagarjun through the Progressive movement — Khari Boli as politics, the street performer as systemic critique.' },
    discovery: {
        question: 'Nagarjun chooses Khari Boli — the people\'s spoken tongue — over Sanskritised literary Hindi, for poems about peasants and street performers. What does the language choice itself declare?',
        options: ['Democratic intent — the poem must be readable by the very people it depicts; medium is the politics', 'Khari Boli is easier to write', 'Sanskrit was banned', 'Nothing — language is neutral'],
        answer: 'Democratic intent — the poem must be readable by the very people it depicts; medium is the politics',
        hook: 'Progressive poets like Nagarjun — journalist, trilingual, champion of the ignored — prove the micro reveals the macro: a street performer\'s day exposes the whole machinery of exploitation. Journalism trained the eye; poetry carried the indictment.',
    },
    teaching: [
        { title: 'कैमरे में बंद अपाहजि — कवि परिचय और पृष्ठभूमि', text: 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे के लेंस में फंसा हुआ चित्रित करता है, ताकि शारीरिक सीमाओं के बावजूद मानव consciousness की गहराई, आंतरिक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk with the street performer: read rustic speech as deliberate politics, trace how one \'small\' life opens onto the entire structure that exploits it, and test why context turns description into critique.',
        labels: ['कैमरे में बंद अपाहजि'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'After a funds scandal in your student council, your group\'s protest poster is all slogans — \'We will shout for change!\' A senior suggests adding a line addressing each silent member by name, and clipping the actual audit report to the bottom.',
            decisions: [{ prompt: 'What does the structure of \'देश में चाँद विकृत\' say about the senior\'s edits?', options: [
                { text: 'Keep both — the poem\'s arc runs collective declaration (\'we\') → direct accusation (\'you\') → documentary proof; slogans alone rage at the air, but naming the complacent and ending with the audit clipping converts protest into verified indictment.', outcome: 'The poem performs its argument through structural stages, finishing with a newspaper report that turns poetic charge into documented fact — the senior is rebuilding exactly that engine.' },
                { text: 'Drop the audit — raw collective emotion is more powerful than paperwork.', outcome: 'The poem deliberately ends with reportage, not refrain: the clipping is the climax that proves \'vikrit\' isn\'t exaggeration but record; without it the poster stays an unfalsifiable mood.', reveals: 'rage-beats-record' },
                { text: 'Drop the \'you\' lines — naming members turns unity into blame.', outcome: 'The poem\'s middle stanzas are precisely the turn from \'we\' to \'you\' — the interrogation of the complacent is what makes the final evidence land; skipping it leaves only self-congratulation.', reveals: 'unity-means-no-accusation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear a poem\'s language as its argument — and see how progressive literature makes the marginal the centre.',
            decisions: [{ prompt: 'What comes next? कैमरे में बंद अपाहजि · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — कैमरे में बंद अपाहजि · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_001', difficulty: 'standard',
          question: 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ.',
          hint: 'यदि कवि के सामाजिक संदेश को समझने में कठिनाई हो, तो कक्षा 11 के समाजशास्त्र नोड.',
          misconception: 'छात्र अक्सर यह मानते हैं कि कवि का उद्देश्य केवल अपाहजि के शारीरिक कष्ट को दर्शाना है, और इसलिए वे उत्तर में केवल शरीर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे',
                  options: ['कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश है जिसे कवि सभी बिंबों, प्रतीकों और'],
                  hint: 'यदि कवि के सामाजिक संदेश को समझने में कठिनाई हो, तो कक्षा 11 के समाजशास्त्र नोड.',
                  misconception: 'छात्र अक्सर यह मानते हैं कि कवि का उद्देश्य केवल अपाहजि के शारीरिक कष्ट को दर्शाना है, और इसलिए वे उत्तर में केवल शरीर की immobilization.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को यह समझाने के लिए कि कवि का ध्यान मन पर है, पहले उन्हें कविता की उन पंक्तियों को खोजने के लिए कहें जहाँ मन की.', 'इससे उन्हें एहसास होगा कि कवि शरीर और मन के बीच एक विभेद बना रहा है — जहाँ शरीर बंधन में है, मन मुक्त है। इस विश्लेषण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_002', difficulty: 'standard',
          question: '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का.',
          hint: 'यदि अटके तो **c11_hin_ar_cbse_13_006 (जाग तुझको दूर जाना — साहित्यिक युक्तियाँ: अलंकार)**.',
          misconception: '**विशिष्ट भ्रम:** छात्र प्रायः इस कविता को **\'एक अपाहिज व्यक्ति की दुखद कहानी\'** मानकर भावार्थ लिखते हैं, जबकि कविता का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल',
                  options: ['\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश है जिसे कवि सभी बिंबों, प्रतीकों और'],
                  hint: 'यदि अटके तो **c11_hin_ar_cbse_13_006 (जाग तुझको दूर जाना — साहित्यिक युक्तियाँ: अलंकार)** में.',
                  misconception: '**विशिष्ट भ्रम:** छात्र प्रायः इस कविता को **\'एक अपाहिज व्यक्ति की दुखद कहानी\'** मानकर भावार्थ लिखते हैं, जबकि कविता का मूल विषय **\'दुख का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **c12_hin_ar_cbse_04_001 (कवि परिचय और पृष्ठभूमि)** दोबारा पढ़ने को कहें — रघुवीर सहाय की पत्रकारिता पृष्ठभूमि.', '**c11_hin_ar_cbse_16_002 (आओ, मिलकर बचाएँ — पद्यांश-वार भावार्थ)** का अभ्यास करवाएँ — वहाँ भी \'समाज की नज़र\' और.', 'पुनः निदान: छात्र से पूछें — "अगर तुम उस अपाहिज की जगह होते, तो कैमरे की फ्लैशलाइट तुम्हें \'रोशनी\' लगती या \'पूछताछ\'?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_003', difficulty: 'standard',
          question: 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें.',
          hint: 'यदि अटका हुआ महसूस करें तो कक्षा ११ के \'हस्तक्षेप\' कविता (c11_hin_ar_cbse_15_003) का.',
          misconception: 'विद्यार्थी समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल छंद पहचानना (जैसे दोहा, चौपाई) या तुकांत बताना है — वे संरचना को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,',
                  options: ['काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश है जिसे कवि सभी बिंबों, प्रतीकों और'],
                  hint: 'यदि अटका हुआ महसूस करें तो कक्षा ११ के \'हस्तक्षेप\' कविता (c11_hin_ar_cbse_15_003) का.',
                  misconception: 'विद्यार्थी समझते हैं कि \'काव्य-संरचना\' का अर्थ केवल छंद पहचानना (जैसे दोहा, चौपाई) या तुकांत बताना है — वे संरचना को स्थैतिक (स्टैटिक).' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण १: विद्यार्थी से कविता जोर से पढ़वाएँ और केवल विराम चिह्नों (कॉमा, पूर्ण विराम, डैश) को चिह्नित करने को कहें.', 'कहाँ तेज चलती है?\' चरण २: प्रत्येक पद की पंक्तियाँ गिनवाएँ और तुकांत शब्दों को रेखांकित करवाएँ — पूछें: \'पैटर्न कहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश है जिसे कवि सभी बिंबों.',
          hint: 'यदि विभाव/अनुभाव/संचारी भाव में भ्रम हो तो **कक्षा 11 आरोह, पाठ 13 (जाग तुझको दूर जाना).',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि \'करुण रस\' का अर्थ केवल **दया/सहानुभूति जगाना** है, इसलिए वे कविता को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश है जिसे कवि सभी बिंबों, प्रतीकों और',
                  options: ['केंद्रीय भाव (Central Theme) कविता का वह मूल संदेश है जिसे कवि सभी बिंबों, प्रतीकों और', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,'],
                  hint: 'यदि विभाव/अनुभाव/संचारी भाव में भ्रम हो तो **कक्षा 11 आरोह, पाठ 13 (जाग तुझको दूर जाना) का नोड.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि \'करुण रस\' का अर्थ केवल **दया/सहानुभूति जगाना** है, इसलिए वे कविता को \'एक बेचारे अपाहिज की.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें: "कविता को फिर पढ़ो, लेकिन इस बार **\'अपाहिज\' शब्द को \'दिव्यांग व्यक्ति\' से बदलकर** पढ़ो — क्या.', 'किन शब्दों से पता चलता है?" **चरण 3:** रस-निष्पत्ति का चार्ट बनवाएँ: तीन कॉलम — विभाव, अनुभाव, संचारी भाव — केवल पद 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_005', difficulty: 'standard',
          question: 'छंद कविता का वह निश्चित **मात्रिक/वर्णिक नियम-बद्ध ढाँचा** है जो पंक्तियों की.',
          hint: 'यदि गुरु-लघु या गण बनाने में अटके: **c11_hin_a_cbse_13_005** के \'मात्रा-गण अभ्यास खंड\' को.',
          misconception: 'छात्र समझते हैं कि **\'मात्रा गिनकर गण बना लेना ही छंद-विश्लेषण पूरा हो गया\'** — जबकि बोर्ड/CUET में पूछा जाता है: **"इस.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद कविता का वह निश्चित **मात्रिक/वर्णिक नियम-बद्ध ढाँचा** है जो पंक्तियों की लंबाई,',
                  options: ['छंद कविता का वह निश्चित **मात्रिक/वर्णिक नियम-बद्ध ढाँचा** है जो पंक्तियों की लंबाई,', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,'],
                  hint: 'यदि गुरु-लघु या गण बनाने में अटके: **c11_hin_a_cbse_13_005** के \'मात्रा-गण अभ्यास खंड\' को 15 मिनट.',
                  misconception: 'छात्र समझते हैं कि **\'मात्रा गिनकर गण बना लेना ही छंद-विश्लेषण पूरा हो गया\'** — जबकि बोर्ड/CUET में पूछा जाता है: **"इस छंद/लय/यति/अनुप्रास.' }
          ],
            remediations: { 'cuet': { steps: ['**पुनः पढ़ो**: कविता की पहली 4 पंक्तियाँ **ताली बजाते हुए** पढ़ो — जहाँ ताली पड़े, वहाँ यति चिह्नित करो। 2.', '**मात्रा-तालिका बनाओ**: प्रत्येक शब्द के नीचे गुरु(2)/लघु(1) लिखो, फिर गण बाँधो (कविता के पहले दो पदों के लिए)। 3.', '**भाव-सेतु जोड़ो**: हर गण/यति/अनुप्रास के सामने एक वाक्य लिखो: "यह ——— भाव देता है क्योंकि ———"। 4.', '**पुनः-निदान**: उपरोक्त DIAGNOSTIC_Q2 और Q3 फिर से हल करो — अब उत्तर में \'भाव-प्रभाव\' अनिवार्य रूप से आएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_006', difficulty: 'standard',
          question: 'अलंकार काव्य में शब्दों या अर्थों की विशेष वक्रता/सौंदर्य-वृद्धि करने वाली.',
          hint: 'यदि अटका महसूस हो तो **c11_hin_a_cbse_13_006 (जाग तुझको दूर जाना — अलंकार)** के कार्यित.',
          misconception: '**विशिष्ट भ्रांति:** छात्र \'कैमरे में बंद\' को **केवल रूपक** मानकर रुक जाते हैं, जबकि यह **बहु-स्तरीय अलंकार-युक्ति.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार काव्य में शब्दों या अर्थों की विशेष वक्रता/सौंदर्य-वृद्धि करने वाली रचनात्मक',
                  options: ['अलंकार काव्य में शब्दों या अर्थों की विशेष वक्रता/सौंदर्य-वृद्धि करने वाली रचनात्मक', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,'],
                  hint: 'यदि अटका महसूस हो तो **c11_hin_a_cbse_13_006 (जाग तुझको दूर जाना — अलंकार)** के कार्यित उदाहरण.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र \'कैमरे में बंद\' को **केवल रूपक** मानकर रुक जाते हैं, जबकि यह **बहु-स्तरीय अलंकार-युक्ति (Multi-layered.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें — "कविता की कोई एक पंक्ति चुनो जो तुम्हें सबसे अधिक चुभी हो। उसे कॉपी में लिखो।" **चरण 2:**.', '(जैसे \'चीख़ती\' तस्वीर के लिए)।" **चरण 3:** उस शब्द के **वाच्यार्थ (Literal)** और **लक्ष्यार्थ (Suggested)** में अंतर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
