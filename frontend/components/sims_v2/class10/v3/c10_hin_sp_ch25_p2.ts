import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch25_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch25_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch25_p2',
    title: 'तताँरा-वामीरो कथा · Part 2/3',
    subtitle: 'इस नोड में केवल तताँरा-वामीरो कथा के गौण विषयों (लोक-आस्था, प्रकृति-चेतना, सामाजिक.',
    classLevel: 10, subject: 'hin_sp', topic: 'तताँरा-वामीरो कथा · Part 2/3',
    chapters: ['c10_hin_sp_ch25'],
    nodeIds: ['c10_hin_sp_cbse_25_007', 'c10_hin_sp_cbse_25_008', 'c10_hin_sp_cbse_25_009', 'c10_hin_sp_cbse_25_010', 'c10_hin_sp_cbse_25_011', 'c10_hin_sp_cbse_25_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'तताँरा-वामीरो कथा\' में तताँरा-वामीरो-कथा जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'तताँरा-वामीरो कथा — गौण विषय', text: '\'तताँरा-वामीरो कथा\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_25_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['तताँरा-वामीरो कथा — गौण', 'तताँरा-वामीरो कथा — साहित्यिक', 'तताँरा-वामीरो कथा — पदावली', 'तताँरा-वामीरो कथा — व्याकरण', 'तताँरा-वामीरो कथा — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c10_hin_sp_cbse_25_008', title: 'Identify each idea',
          dissect: { specimen: 'तताँरा-वामीरो कथा · Part 2/3', spots: [
            { id: 's1', label: '- -', prompt: 'Which idea is this? — \'तताँरा-वामीरो कथा\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।', answer: '- -', options: ['- -', '- - -'] },
            { id: 's2', label: '- - -', prompt: 'Which idea is this? — \'तताँरा-वामीरो कथा\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '- - -', options: ['- - -', '- -'] }
          ] } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_25_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through तताँरा-वामीरो कथा like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? तताँरा-वामीरो कथा · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तताँरा-वामीरो कथा · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_007', difficulty: 'standard',
          question: '\'तताँरा-वामीरो कथा\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो c10_hin_sp_cbse_25_006 (मुख्य विषय) और c10_hin_sp_cbse_25_004 (नायक चरित्र).',
          misconception: 'छात्र मानते हैं कि \'गौण विषय = कम महत्वपूर्ण विषय\' और परीक्षा में केवल मुख्य विषय लिखकर पूरे अंक पा लेंगे। वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तताँरा-वामीरो कथा\' के गौण विषय',
                  options: ['\'तताँरा-वामीरो कथा\' के गौण विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के', '\'तताँरा-वामीरो कथा\' का कथानक', '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_25_006 (मुख्य विषय) और c10_hin_sp_cbse_25_004 (नायक चरित्र) दोबारा.',
                  misconception: 'छात्र मानते हैं कि \'गौण विषय = कम महत्वपूर्ण विषय\' और परीक्षा में केवल मुख्य विषय लिखकर पूरे अंक पा लेंगे। वास्तव में CBSE बोर्ड पूछता है.' }
          ],
            remediations: { 'cbse-1-3': { steps: ['छात्र से कहें: "पाठ के 5 मुख्य प्रसंग लिखो जहाँ तताँरा अकेला न हो — कोई शक्ति/बाधा उसके साथ हो।" 2.', 'प्रत्येक प्रसंग के आगे लिखवाएँ: "यह कौन-सी बड़ी भावना/मुद्दा दिखाता है?', '(आस्था/प्रकृति/जाति/नारी)" 3.', 'फिर पूछें: "इनमें से कौन-सा मुद्दा सीधे \'सत्य की खोज\' को आगे बढ़ाता है और कौन रोकता है?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_008', difficulty: 'standard',
          question: '\'तताँरा-वामीरो कथा\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फँसें तो **c10_hin_sp_cbse_25_003 (पाठ्य-परिवेश)** और **c10_hin_sp_cbse_25_006 (मुख्य.',
          misconception: '**सबसे घातक भ्रम:** छात्र मानते हैं कि **"बिंब = केवल दृश्य चित्र (Visual image)"** और **"रूपक = फैंसी/सजावटी भाषा"**।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तताँरा-वामीरो कथा\' में बिंब (imagery)',
                  options: ['\'तताँरा-वामीरो कथा\' में बिंब (imagery)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के', '\'तताँरा-वामीरो कथा\' का कथानक', '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो **c10_hin_sp_cbse_25_003 (पाठ्य-परिवेश)** और **c10_hin_sp_cbse_25_006 (मुख्य विषय)**.',
                  misconception: '**सबसे घातक भ्रम:** छात्र मानते हैं कि **"बिंब = केवल दृश्य चित्र (Visual image)"** और **"रूपक = फैंसी/सजावटी भाषा"**। **वास्तविकता:** 1.' }
          ],
            remediations: { 'visual-image-1': { steps: ['**इंद्रिय-मानचित्रण (Sensory Mapping) अभ्यास:** पाठ के 5 पैराग्राफ लें; प्रत्येक में **हर इंद्रिय** का एक बिंब ढूँढ़कर.', '**रूपक-विघटन (Metaphor Deconstruction) शीट:** पाठ के 3 प्रमुख रूपक चुनें; प्रत्येक के लिए कॉलम बनाएँ — उपमेय | उपमान |.', '**तुलनात्मक पुनर्लेखन:** एक रूपक लें, उसे उपमा में बदलें, फिर अतिशयोक्ति में — तीनों पढ़कर **तीव्रता/अर्थ का अंतर**.', '**बोर्ड-शैली मॉडल उत्तर:** उपरोक्त विश्लेषण को **PEEL संरचना** (Point → Evidence → Explanation → Link to theme) में.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_009', difficulty: 'standard',
          question: '\'तताँरा-वामीरो कथा\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_25_008 (बिंब और रूपक)** दोहराएँ तथा **पाठ के अंतिम 3 पैरा**.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी **\'विरोधाभास\' (Paradox)** को **\'विरोधाभासी शब्द-युग्म\' (Oxymoron जैसे: मधुर कड़वाहट, जीवित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तताँरा-वामीरो कथा\' में विरोधाभास',
                  options: ['\'तताँरा-वामीरो कथा\' में विरोधाभास', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के', '\'तताँरा-वामीरो कथा\' का कथानक', '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_25_008 (बिंब और रूपक)** दोहराएँ तथा **पाठ के अंतिम 3 पैरा** पुनः.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी **\'विरोधाभास\' (Paradox)** को **\'विरोधाभासी शब्द-युग्म\' (Oxymoron जैसे: मधुर कड़वाहट, जीवित लाश)** समझ लेते.' }
          ],
            remediations: { 'paradox-oxymoron': { steps: ['**चरण 1:** छात्र को **पाठ का वह पैरा** पढ़वाओ जहाँ तताँरा डोर काटने/टूटने के बाद हवा में भटकता है — पूछो: "क्या यह.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_010', difficulty: 'standard',
          question: '\'तताँरा-वामीरो कथा\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_25_003 (पाठ्य-परिवेश)** दोहराएँ — शब्द वहीं से निकलते हैं।',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'पदावली = कठिन शब्दों के हिंदी समानार्थी शब्द रटना\'** है। **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तताँरा-वामीरो कथा\' की पदावली',
                  options: ['\'तताँरा-वामीरो कथा\' की पदावली', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के', '\'तताँरा-वामीरो कथा\' का कथानक', '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_25_003 (पाठ्य-परिवेश)** दोहराएँ — शब्द वहीं से निकलते हैं।',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'पदावली = कठिन शब्दों के हिंदी समानार्थी शब्द रटना\'** है। **वास्तविकता:** बोर्ड परीक्षा में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read):** पाठ के उस पैराग्राफ को दोबारा पढ़ें जहाँ शब्द आया है — **संदर्भ (Context) ही कुंजी है**। 2.', '**तुलना करें:** शब्द का **शाब्दिक अर्थ** और **प्रसंगिक अर्थ** अगल-बगल लिखें — अंतर स्पष्ट होगा। 3.', '**लोक-संदर्भ जोड़ें:** शिक्षक/इंटरनेट से उस शब्द की **लोककथा/लोकगीत/रीति** में भूमिका जानें (जैसे कुरजाँ के लोकगीत)। 4.', '**लिखित अभ्यास:** प्रतिदिन 2 शब्द चुनकर **\'अर्थ + प्रसंग + कारण\'** के 3-स्तरीय नोट्स बनाएँ — 7 दिन में 14 शब्द, पूरा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_011', difficulty: 'standard',
          question: '\'तताँरा-वामीरो कथा\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'यदि शब्द-वर्गीकरण में अटके हैं, तो **NCERT कक्षा 9 हिंदी व्याकरण \'शब्द विचार\' अध्याय** के.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"तताँरा-वामीरो कथा" में भाषा-प्रयोग का अर्थ \'कठिन तत्सम शब्दों का प्रयोग\' या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तताँरा-वामीरो कथा\' में भाषा-प्रयोग',
                  options: ['\'तताँरा-वामीरो कथा\' में भाषा-प्रयोग', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के', '\'तताँरा-वामीरो कथा\' का कथानक', '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि शब्द-वर्गीकरण में अटके हैं, तो **NCERT कक्षा 9 हिंदी व्याकरण \'शब्द विचार\' अध्याय** के \'शब्दों.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **"तताँरा-वामीरो कथा" में भाषा-प्रयोग का अर्थ \'कठिन तत्सम शब्दों का प्रयोग\' या \'अलंकारों की भरमार\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें — *"पाठ के पृष्ठ 5-6 (या कोई दो पन्ने) खोलो। तीन रंग के पेन लो: लाल (तत्सम/संस्कृतनिष्ठ), नीला.', 'लेखक ने वहाँ-वहाँ वही रंग क्यों चुना?"* — इसे **\'भाषा-मानचित्रण\' (language mapping)** कहते हैं। **चरण 3:** एक संवाद अंश.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_25_012', difficulty: 'standard',
          question: '\'तताँरा-वामीरो कथा\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँस जाएँ तो c10_hin_sp_cbse_25_002 (कथानक), c10_hin_sp_cbse_25_004-005 (पात्र-चित्रण).',
          misconception: 'छात्र समझते हैं कि \'वस्तुनिष्ठ प्रश्न\' का अर्थ केवल बहुविकल्पीय (MCQ) होता है और \'आशय-सूचक\' का अर्थ केवल लंबा उत्तर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'तताँरा-वामीरो कथा\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'तताँरा-वामीरो कथा\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = विजयदान देथा का परिचय (राजस्थानी लोक-साहित्य के', '\'तताँरा-वामीरो कथा\' का कथानक', '\'तताँरा-वामीरो कथा\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो c10_hin_sp_cbse_25_002 (कथानक), c10_hin_sp_cbse_25_004-005 (पात्र-चित्रण) और.',
                  misconception: 'छात्र समझते हैं कि \'वस्तुनिष्ठ प्रश्न\' का अर्थ केवल बहुविकल्पीय (MCQ) होता है और \'आशय-सूचक\' का अर्थ केवल लंबा उत्तर होता है। असल में.' }
          ],
            remediations: { 'mcq': { steps: ['चरण 1: छात्र को CBSE हिंदी स्पर्श के गत 3 वर्षों के प्रश्न-पत्र देकर कहो — प्रत्येक प्रश्न के आगे \'व\' (वस्तुनिष्ठ) या.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
