import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch16_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch16_p1: SimDef = {
    id: 'v3_c10_hin_sp_ch16_p1',
    title: 'साखी · Part 1/3',
    subtitle: 'यह नोड केवल कबीर दास का संक्षिप्त जीवन परिचय, निर्गुण भक्ति शाखा (ज्ञानाश्रयी) में उनका.',
    classLevel: 10, subject: 'hin_sp', topic: 'साखी · Part 1/3',
    chapters: ['c10_hin_sp_ch16'],
    nodeIds: ['c10_hin_sp_cbse_16_001', 'c10_hin_sp_cbse_16_002', 'c10_hin_sp_cbse_16_003', 'c10_hin_sp_cbse_16_004', 'c10_hin_sp_cbse_16_005', 'c10_hin_sp_cbse_16_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'कल्पना करें कि आप 15वीं शताब्दी के काशी के एक घाट पर खड़े हैं जहाँ एक जुलाहा (कबीर) भीड़ को संबोधित कर रहा है.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'साखी — कवि परिचय और पृष्ठभूमि', text: 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो सधुक्कड़ी भाषा में सामाजिक कुरीतियों, आडंबरों पर प्रहार करते हुए मानवतावादी मूल्यों और निर्गुण भक्ति की स्थापना.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_16_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['साखी — कवि परिचय', 'साखी — पद्यांश-वार भावार्थ', 'साखी — काव्य-संरचना और', 'साखी — केंद्रीय भाव', 'साखी — छंद और', 'साखी — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_16_004', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['**विभाव-अनुभाव-व्यभिचारी विश्लेषण (साक्ष्य सहित):**', '**रस-निर्धारण:** स्थायी भाव = **शम (वैराग्य/निवृत्ति)** →.', '**बोर्ड उत्तर संरचना (PEEL):** Point → Evidence →.', '**केंद्रीय भाव संश्लेषण:** दोनों पंक्तियों का सार — **खोज्य.', '**पद-विच्छेद व भावार्थ:** \'कुंडल\' = नाभि/कुंडलिनी स्थान.'], answer: '**पद-विच्छेद व भावार्थ:** \'कुंडल\' = नाभि/कुंडलिनी स्थान. **केंद्रीय भाव संश्लेषण:** दोनों पंक्तियों का सार — **खोज्य. **रस-निर्धारण:** स्थायी भाव = **शम (वैराग्य/निवृत्ति)** →. **विभाव-अनुभाव-व्यभिचारी विश्लेषण (साक्ष्य सहित):** **बोर्ड उत्तर संरचना (PEEL):** Point → Evidence →.' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_16_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through साखी like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? साखी · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — साखी · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_001', difficulty: 'standard',
          question: 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड.',
          hint: 'यदि छात्र अटका हो, तो उसे **कक्षा 9 स्पर्श भाग-1, पाठ-10 \'साखी\' (कबीर दास)** का \'कवि.',
          misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि **\'कबीर हिंदू-मुस्लिम एकता के प्रतीक मात्र हैं\'** और उनकी कविता को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो',
                  options: ['साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem', 'केंद्रीय भाव (Central Theme) is the single, unifying philosophical truth that Kabir'],
                  hint: 'यदि छात्र अटका हो, तो उसे **कक्षा 9 स्पर्श भाग-1, पाठ-10 \'साखी\' (कबीर दास)** का \'कवि परिचय\' खंड.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र प्रायः मान लेते हैं कि **\'कबीर हिंदू-मुस्लिम एकता के प्रतीक मात्र हैं\'** और उनकी कविता को केवल \'सांप्रदायिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**पहला चरण (स्पष्टीकरण):** छात्र से पूछें — *"कबीर ने केवल हिंदू-मुस्लिम एकता की बात की होती, तो क्या वे \'जाति न पूछो.', 'क्या ये हिंदू-मुस्लिम मुद्दे हैं?"* — इससे वे समझेंगे कि कबीर का दायरा **सांप्रदायिकता से व्यापक (मानवतावादी)** है। 2.', '**दूसरा चरण (तुलनात्मक चार्ट):** बोर्ड पर **दो कॉलम** बनाएँ — बाएँ: "सामान्य धारणा (हिंदू-मुस्लिम एकता)", दाएँ: "कबीर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का.',
          hint: 'यदि अटके: c10_hin_sp_cbse_16_001 (कवि परिचय) दोहराएँ — विशेषकर \'सधुक्कड़ी भाषा\', \'निर्गुण.',
          misconception: 'छात्र समझते हैं कि **\'भावार्थ = कठिन शब्दों के अर्थ + पंक्तियों का हिंदी अनुवाद\'**। वे प्रतीकों (हंस, माया, काया, गुरु.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem', 'केंद्रीय भाव (Central Theme) is the single, unifying philosophical truth that Kabir'],
                  hint: 'यदि अटके: c10_hin_sp_cbse_16_001 (कवि परिचय) दोहराएँ — विशेषकर \'सधुक्कड़ी भाषा\', \'निर्गुण राम\', और.',
                  misconception: 'छात्र समझते हैं कि **\'भावार्थ = कठिन शब्दों के अर्थ + पंक्तियों का हिंदी अनुवाद\'**। वे प्रतीकों (हंस, माया, काया, गुरु, चादर) को शाब्दिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **एक पद्यांश दें** और कहें: "केवल कठिन शब्दों के अर्थ मत लिखो। बताओ: कवि यहाँ किससे बोल रहे हैं?', 'इसका गहरा मतलब क्या है?" 2.', '**\'प्रतीक → अभिप्राय\' तालिका** बनवाएँ: (हंस → विवेकी, माया → भ्रम/मोह, काया → नश्वर शरीर, चादर → जीवन/शरीर/साधना)। 3.', '**मॉडल उत्तर दिखाएँ** जिसमें 4 भाग हों: शब्दार्थ → प्रतीक व्याख्या → प्रसंग → स्वभाषा में सार। छात्र से कहें: "अपना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_003', difficulty: 'standard',
          question: '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the.',
          hint: 'यदि मात्रा-गणना में अटके → कक्षा ९ की **"छंद परिचय"** पाठ (वार्णिक/मात्रिक छंद, मात्रा.',
          misconception: '**सबसे घातक भ्रम**: छात्र समझते हैं कि **"काव्य-संरचना = केवल छंद पहचानना (साखी/दोहा/चौपाई)"** और **"पद्य-विन्यास.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem',
                  options: ['**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', 'केंद्रीय भाव (Central Theme) is the single, unifying philosophical truth that Kabir'],
                  hint: 'यदि मात्रा-गणना में अटके → कक्षा ९ की **"छंद परिचय"** पाठ (वार्णिक/मात्रिक छंद, मात्रा नियम).',
                  misconception: '**सबसे घातक भ्रम**: छात्र समझते हैं कि **"काव्य-संरचना = केवल छंद पहचानना (साखी/दोहा/चौपाई)"** और **"पद्य-विन्यास = केवल तुकांत ढूँढ़ना"**।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से एक साखी **ज़ोर से पढ़वाएँ** और उंगली से **मात्रा-ताल (beat) गिनवाएँ** — "कहाँ रुके?', 'कहाँ दौड़े?" → लय का बोध। 2.', '**चरण 2**: **ग्राफ पेपर** पर ३९ खाने बनवाएँ, प्रत्येक अक्षर की मात्रा भरवाएँ — दृश्यात्मक मात्रा-गणना। 3.', '**चरण 3**: **दो साखियाँ साथ रखवाएँ** — "पहले किस विषय पर बोली?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_004', difficulty: 'standard',
          question: 'केंद्रीय भाव (Central Theme) is the single, unifying philosophical truth that.',
          hint: 'यदि अटके तो: **कक्षा 9 हिंदी (स्पर्श/संचयन) का \'रस\' अध्याय** दोहराएं — विशेषतः शान्त रस.',
          misconception: '**विशिष्ट भ्रम:** विद्यार्थी मानते हैं कि **"शान्त रस = बोरिंग/उदास/कुछ न होना"** — इसलिए वे साखी में \'क्रिया\' (भटकना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव (Central Theme) is the single, unifying philosophical truth that Kabir',
                  options: ['केंद्रीय भाव (Central Theme) is the single, unifying philosophical truth that Kabir', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem'],
                  hint: 'यदि अटके तो: **कक्षा 9 हिंदी (स्पर्श/संचयन) का \'रस\' अध्याय** दोहराएं — विशेषतः शान्त रस के उदाहरण.',
                  misconception: '**विशिष्ट भ्रम:** विद्यार्थी मानते हैं कि **"शान्त रस = बोरिंग/उदास/कुछ न होना"** — इसलिए वे साखी में \'क्रिया\' (भटकना, ढूंढना, जागना) देखकर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः परिभाषित करें:** शान्त रस = "वैराग्य-जनित पूर्णत्व की अनुभूति" — इसे \'उदासी\' नहीं, **\'पूरा हो जाना\'** कहें। 2.', '**मृग-कस्तूरी कथा सुनाएं/दिखाएं:** मृग दौड़ता है (अशान्ति) → थककर बैठता है (वैराग्य) → नाभि सूँघता है (विवेक) →.', '**अभ्यास कराएं:** साखी की प्रत्येक पंक्ति के आगे लिखवाएं: **पंक्ति → विभाव → व्यभिचारी → अनुभाव → रस**। 4.', '**तुलना कराएं:** "वीर रस में क्रिया **बाह्य विजय** के लिए; शान्त रस में क्रिया **आंतरिक निवृत्ति** के लिए।" — यह भेद.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_005', difficulty: 'standard',
          question: 'कबीर की साखियाँ **दोहा छंद** में रची गई हैं — प्रत्येक साखी में दो चरण.',
          hint: 'Review Class 9 Hindi grammar chapter "छंद" — specifically the **matra-counting table**.',
          misconception: 'Students **count letters (varna) instead of matras** — e.g., they count "गुरु" as 2 varnas and write 2 matras, ignoring.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कबीर की साखियाँ **दोहा छंद** में रची गई हैं',
                  options: ['कबीर की साखियाँ **दोहा छंद** में रची गई हैं', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem'],
                  hint: 'Review Class 9 Hindi grammar chapter "छंद" — specifically the **matra-counting table** and.',
                  misconception: 'Students **count letters (varna) instead of matras** — e.g., they count "गुरु" as 2 varnas and write 2 matras, ignoring that \'उ\' is hrasva.' }
          ],
            remediations: { 'students-count-letters-varna-instead': { steps: ['**Matra Drill Card** बनाएँ: 20 आम शब्द (राम, रहीम, गुरु, ज्ञान, माया, प्रेम, आदि) की मात्रा गिनकर कार्ड पर लिखें; रोज़.', '**Yati Locator Game**: किसी भी दोहे का पहला चरण पढ़ें, 13वीं मात्रा पर ताली बजाएँ — फिर जाँचें कि क्या विराम स्वाभाविक.', '**Peer-Check**: साथी को अपनी गणना दिखाएँ; वह लाल पेन से गलती चिह्नित करे। 4.', '**NCERT Appendix** के \'छंद परिचय\' पृष्ठ को 3 बार पढ़ें — वहाँ मात्रा-नियम (ह्रस्व/दीर्घ/संयुक्त व्यंजन) स्पष्ट हैं।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_16_006', difficulty: 'standard',
          question: 'अलंकार वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों की विशेष विन्यास से काव्य.',
          hint: 'यदि अर्थ अटक रहा है तो c10_hin_sp_cbse_16_002 (पद्यांश-वार भावार्थ) दोबारा पढ़ें.',
          misconception: '**विशिष्ट भ्रम:** छात्र **उपमा और रूपक** में केवल "जैसे/वत् शब्द की उपस्थिति/अनुपस्थिति" देखकर भेद करते हैं। वे नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'अलंकार वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों की विशेष विन्यास से काव्य में',
                  options: ['अलंकार वह साहित्यिक युक्ति है जिसमें शब्दों या अर्थों की विशेष विन्यास से काव्य में', 'साखी कबीर दास द्वारा रचित दोहा छंद में बँधे वे संक्षिप्त, सारगर्भित काव्य-खंड हैं जो', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंजा/पद) का स्वतंत्र रूप से', '**काव्य-संरचना** (Poetic Structure) refers to the macro-organization of the poem'],
                  hint: 'यदि अर्थ अटक रहा है तो c10_hin_sp_cbse_16_002 (पद्यांश-वार भावार्थ) दोबारा पढ़ें — विशेषकर.',
                  misconception: '**विशिष्ट भ्रम:** छात्र **उपमा और रूपक** में केवल "जैसे/वत् शब्द की उपस्थिति/अनुपस्थिति" देखकर भेद करते हैं। वे नहीं समझते कि **उपमा में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**दो वाक्य लिखवाओ:** (अ) "चाँद *जैसे* सुंदर मुख" (ब) "चाँद *ही* मुख है" — पूछो: "पहले में चाँद और मुख अलग हैं या एक?', '**साखी के दोहे दिखाओ:** "कस्तूरी कुंडल बसे..." (उपमा) vs "माया महा ठगनी..." (रूपक) — रेखांकित करवाओ: पहले में.', '**अभ्यास:** 5 वाक्य दें — छात्र प्रत्येक में "अलग/एक" लिखे, फिर नाम बताए। 4.', '**बोर्ड टिप:** उत्तर में लिखना: "उपमा — उपमान-उपमेय भिन्न; रूपक — उपमान-उपमेय अभिन्न" — यह 1 अंक पक्का करता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
