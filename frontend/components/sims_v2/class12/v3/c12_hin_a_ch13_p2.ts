import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch13_p2: SimDef = {
    id: 'v3_c12_hin_a_ch13_p2',
    title: 'गांधी, नेहरू और यासरि अराफ़ात · Part 2/3',
    subtitle: '1938: the revolutionaries who still knew how to laugh',
    classLevel: 12, subject: 'hin_a', topic: 'गांधी, नेहरू और यासरि अराफ़ात · Part 2/3',
    chapters: ['c12_hin_a_ch13'],
    nodeIds: ['c12_hin_a_cbse_13_007', 'c12_hin_a_cbse_13_008', 'c12_hin_a_cbse_13_009', 'c12_hin_a_cbse_13_010', 'c12_hin_a_cbse_13_011', 'c12_hin_a_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Freedom-era memoir reader', intro: 'Before Quit India, there were the quiet years — and a memoirist who remembered the people inside the movement.', goal: 'Read the memoir through its 1938 setting — nationalism as lived relationship, not marble statue.' },
    discovery: {
        question: 'Nagpur, 1938: a revolutionary editor jokes through clandestine work while a provisional government forms in shadow. What makes this memoir different from a freedom-fighter hagiography?',
        options: ['Humanity beside heroism — the note gives Sakharam a rule of humour and a smiling gaze; the memoir records people, not icons', 'It names real people', 'It\'s more recent', 'Memoirs are always accurate'],
        answer: 'Humanity beside heroism — the note gives Sakharam a rule of humour and a smiling gaze; the memoir records people, not icons',
        hook: 'The year is precise — 1938, pre-Quit India, not the famous 1942. And the language carries the era: Marathi-inflected Hindi, short colloquial sentences, dialogue over description. Personal memory and national history are woven on the same loom.',
    },
    teaching: [
        { title: 'गांधी, नेहरू और यासरि अराफ़ात — गौण विषय', text: 'गौण विषय (Sub-themes) वे सहायक विचार-धाराएँ हैं जो पाठ के मुख्य विषय (Central Theme) को पुष्ट, विस्तृत या पूरक करती हैं और पात्रों के आचरण, संवाद या घटनाक्रम के माध्यम से उभरती हैं।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_13_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sit in a 1938 Nagpur room: weigh Sakharam\'s warmth against his revolution, separate the provisional government\'s claim from the British one, and hear how colloquial prose carries lived history.',
        labels: ['गांधी, नेहरू और यासरि'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A senior who documented a student protest movement now calls it \'my movement, my story\' — editing out the grassroots workers whose songs and sacrifices built it, and ending every retelling on his own reflection.',
            decisions: [{ prompt: 'What does Bhisham Sahni\'s memoir structure say to that?', options: [
                { text: 'Hand the ending to the collective — the chapter deliberately closes on the revolutionary\'s \'they are not just yours, they are ours too,\' surrendering the writer\'s \'I\' to the movement\'s \'we\'; a witness holds the story in trust, not ownership.', outcome: 'The memoir\'s architecture is the argument: embedded voices — Nehru\'s sparrow tale, the child\'s song — exist so the writer never owns history, only testifies to it.' },
                { text: 'Let him own it — he wrote it down, so the narrative is his by right.', outcome: 'The chapter\'s ending exists to refute that claim: the narrator who steps back for the revolutionary\'s voice enacts the truth that recording isn\'t owning — the movement\'s people are co-owners of its telling.', reveals: 'writer-owns-the-story' },
                { text: 'Cut the folk and domestic episodes from the retelling — keep only the political events so it stays \'serious.\'', outcome: 'The memoir\'s power is the weave — the sparrow story and the child\'s song structurally foreshadow sacrifice; stripping them leaves a chronology without the argument that private life feeds public courage.', reveals: 'politics-over-domestic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_13_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a memoir as national history told in a personal voice — where revolutionaries joke, worry and persist.',
            decisions: [{ prompt: 'What comes next? गांधी, नेहरू और यासरि अराफ़ात · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — गांधी, नेहरू और यासरि अराफ़ात · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-themes) वे सहायक विचार-धाराएँ हैं जो पाठ के मुख्य विषय (Central.',
          hint: 'यदि फँसें तो c11_hin_a_cbse_01_007 (कक्षा 11 अंतरा पाठ 1 का गौण विषय नोड) दोबारा करें.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'गौण विषय\' को \'उप-कथानक\' (sub-plot) या \'द्वितीयक पात्र\' समझते हैं। उदाहरण: वे लिखते हैं — "गौण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-themes) वे सहायक विचार-धाराएँ हैं जो पाठ के मुख्य विषय (Central Theme) को',
                  options: ['गौण विषय (Sub-themes) वे सहायक विचार-धाराएँ हैं जो पाठ के मुख्य विषय (Central Theme) को', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ'],
                  hint: 'यदि फँसें तो c11_hin_a_cbse_01_007 (कक्षा 11 अंतरा पाठ 1 का गौण विषय नोड) दोबारा करें — वहाँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'गौण विषय\' को \'उप-कथानक\' (sub-plot) या \'द्वितीयक पात्र\' समझते हैं। उदाहरण: वे लिखते हैं — "गौण विषय है: अराफात का.' }
          ],
            remediations: { 'sub-plot': { steps: ['छात्र से कहें: "पाठ के 5 मुख्य प्रसंग चुनो (जैसे: प्रार्थना सभा, शिविर दौरा, अराफात-मुलाकात, नेहरू का भाषण, गाँधी का.', 'फिर c12_hin_a_cbse_13_006 (मुख्य विषय) दोबारा पढ़ें और तुलना करें: मुख्य विषय = केंद्रीय संदेश; गौण विषय = सहायक स्तंभ।.', 'अभ्यास: पाठ से 3 वाक्य उठाएँ जो घटना नहीं, विचार व्यक्त करते हों (जैसे: "अहिंसा कायर का नहीं, वीर का हथियार है").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_008', difficulty: 'standard',
          question: 'बिंब वह साहित्यिक युक्ति है जिससे पाठक के मन में संवेदी (दृश्य, श्रवण, स्पर्श.',
          hint: 'यदि फंस रहे हैं तो वर्ग 11 के किसी भी पाठ (जैसे c11_hin_a_cbse_01_008) में बिंब और रूपक.',
          misconception: 'छात्र अक्सर मानते हैं कि बिंब और रूपक में अंतर केवल यह है कि बिंब में "जैसे" या "वैसे ही" आता है और रूपक में नहीं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब वह साहित्यिक युक्ति है जिससे पाठक के मन में संवेदी (दृश्य, श्रवण, स्पर्श, स्वाद,',
                  options: ['बिंब वह साहित्यिक युक्ति है जिससे पाठक के मन में संवेदी (दृश्य, श्रवण, स्पर्श, स्वाद,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ'],
                  hint: 'यदि फंस रहे हैं तो वर्ग 11 के किसी भी पाठ (जैसे c11_hin_a_cbse_01_008) में बिंब और रूपक के आधारभूत.',
                  misconception: 'छात्र अक्सर मानते हैं कि बिंब और रूपक में अंतर केवल यह है कि बिंब में "जैसे" या "वैसे ही" आता है और रूपक में नहीं, इसलिए वे कोई भी वाक्य.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस मिथक को दूर करने के लिए, छात्र को 3 वाक्य दें: (1) "उसके बाल रेशमのように चमक रहे थे", (2) "उसकी मुस्कान सूरज थी", (3).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_009', difficulty: 'standard',
          question: 'विरोधाभास वह साहित्यिक युक्ति है जिसमें दो相反ित तत्वों को एक साथ रखा जाता है.',
          hint: 'यदि stuck हों तो कक्षा 11 के किसी भी पाठ में साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक.',
          misconception: 'छात्र अक्सर विरोधाभास को साधारण विपरीत तथ्यों (जैसे "नेहरू अंग्रेजी बोलते थे और वे भारतीय भी थे") से समान मान लेते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास वह साहित्यिक युक्ति है जिसमें दो相反ित तत्वों को एक साथ रखा जाता है ताकि गहरी',
                  options: ['विरोधाभास वह साहित्यिक युक्ति है जिसमें दो相反ित तत्वों को एक साथ रखा जाता है ताकि गहरी', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ'],
                  hint: 'यदि stuck हों तो कक्षा 11 के किसी भी पाठ में साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक (जैसे.',
                  misconception: 'छात्र अक्सर विरोधाभास को साधारण विपरीत तथ्यों (जैसे "नेहरू अंग्रेजी बोलते थे और वे भारतीय भी थे") से समान मान लेते हैं, जबकि साहित्यिक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए: "इस पंक्ति में क्या दो ऐसी बातें हैं जो एक-दूसरे के उलट लगती हैं?" जब वह पहचान ले, तो आगे पूछिए: "यदि.', 'इससे वह सतही टकराव से आगे बढ़कर विश्लेषण कर पाएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द पाठ में प्रयुक्त महत्वपूर्ण शब्दों के अर्थ, पर्यायवाची.',
          hint: 'यदि शब्दों के अर्थ को समझने में कठिनाई हो तो वर्ग 11 के पदावली नोड्स (जैसे.',
          misconception: 'छात्र अक्सर मुख्य शब्दों के अर्थ को केवल शब्दकोश के प्रथम अर्थ से जोड़कर याद लेते हैं और फिर उन्हें किसी भी वाक्य में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द पाठ में प्रयुक्त महत्वपूर्ण शब्दों के अर्थ, पर्यायवाची, विलोम और उनके',
                  options: ['पदावली: मुख्य शब्द पाठ में प्रयुक्त महत्वपूर्ण शब्दों के अर्थ, पर्यायवाची, विलोम और उनके', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ'],
                  hint: 'यदि शब्दों के अर्थ को समझने में कठिनाई हो तो वर्ग 11 के पदावली नोड्स (जैसे c11_hin_a_cbse_10_010).',
                  misconception: 'छात्र अक्सर मुख्य शब्दों के अर्थ को केवल शब्दकोश के प्रथम अर्थ से जोड़कर याद लेते हैं और फिर उन्हें किसी भी वाक्य में प्रयोग कर देते हैं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले पाठ से दो-तीन वाक्य दिए जाइए जिनमें मुख्य शब्द आए हों, और उनसे पूछा जाइए: "इस वाक्य में इस शब्द का क्या.', 'क्यों आपको ऐसा लगता है?" फिर उनके उत्तर को शब्दकोश के अर्थ के साथ तुलना करके दिखाइए कि समान शब्द कैसे अलग-अलग वाक्यों.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग से तात्पर्य लेखन में प्रयोग किए गए शब्दों के चयन, वाक्य.',
          hint: 'यदि छात्र फंस रहे हैं, तो कक्षा 11 के व्याकरण: पाठ में भाषा-प्रयोग.',
          misconception: 'छात्र अक्सर मानते हैं कि भाषा-प्रयोग का अर्थ केवल कठिन या असामान्य शब्दों का अर्थ जानना है, जैसे "सत्याग्रह" या "तत्सम".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग से तात्पर्य लेखन में प्रयोग किए गए शब्दों के चयन, वाक्य रचना,',
                  options: ['पाठ में भाषा-प्रयोग से तात्पर्य लेखन में प्रयोग किए गए शब्दों के चयन, वाक्य रचना,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ'],
                  hint: 'यदि छात्र फंस रहे हैं, तो कक्षा 11 के व्याकरण: पाठ में भाषा-प्रयोग (c11_hin_a_cbse_01_011) को.',
                  misconception: 'छात्र अक्सर मानते हैं कि भाषा-प्रयोग का अर्थ केवल कठिन या असामान्य शब्दों का अर्थ जानना है, जैसे "सत्याग्रह" या "तत्सम" शब्दों का अर्थ याद.' }
          ],
            remediations: { 'wrong-idea': { steps: ['इस भ्रम को दूर करने के लिए, छात्र को एक सरल वाक्य दें जैसे "गांधी ने marcha की" और पूछें: "यह वाक्य सही है या नहीं?', 'क्यों?" फिर उन्हें बताएं कि "marcha" अंग्रेजी से आया है और hindi में इसका उपयोग अनुचित है; सही होगा "गांधी ने मार्च.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_13_012', difficulty: 'standard',
          question: 'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वह प्रश्न है जो पाठ के स्पष्ट तथ्यों.',
          hint: 'यदि फँसें तो कक्षा 11 के बोध-प्रश्न: वस्तुनिष्ठ (c11_hin_a_cbse_01_012) को दोबारा पढ़िए.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों का उत्तर देते समय पाठ में सीधे लिखे शब्दों को दोहराते हैं और मान लेते हैं कि यही पर्याप्त.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वह प्रश्न है जो पाठ के स्पष्ट तथ्यों (वस्तुनिष्ठ) और',
                  options: ['बोध-प्रश्न: वस्तुनिष्ठ और आशय-सूचक वह प्रश्न है जो पाठ के स्पष्ट तथ्यों (वस्तुनिष्ठ) और', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है किसी लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक वह क्रम है जिसमें कहानी की घटनाएँ होती हैं, जबकि आख्यान-संरचना वह ढाँचा है जिसमें', 'पाठ्य-परिवेश वह समय, स्थान, सामाजिक, राजनीतिक, और सांस्कृतिक परिस्थिति है जिसमें कोई पाठ'],
                  hint: 'यदि फँसें तो कक्षा 11 के बोध-प्रश्न: वस्तुनिष्ठ (c11_hin_a_cbse_01_012) को दोबारा पढ़िए और पाठ में.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों का उत्तर देते समय पाठ में सीधे लिखे शब्दों को दोहराते हैं और मान लेते हैं कि यही पर्याप्त है — जैसे यदि पाठ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए दो उत्तर लिखकर: 1.', 'कमजोर उत्तर: "पाठ में लिखा है कि नेहरू ने त्याग किया।" (पूछे गए प्रश्न: "नेहरू के त्याग से क्या आशय है?") 2.', 'मजबूत उत्तर: "नेहरू का त्याग केवल व्यक्तिगत सुविधा छोड़ने तक सीमित नहीं था; इसका अर्थ था कि वे राष्ट्रीय एकता और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
