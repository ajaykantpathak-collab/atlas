import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_kr_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_kr_ch13_p2: SimDef = {
    id: 'v3_c10_hin_kr_ch13_p2',
    title: 'माता का अँचल · Part 2/3',
    subtitle: '**Covers:** Identification, evidence-based analysis, and board-answer writing for.',
    classLevel: 10, subject: 'hin_kr', topic: 'माता का अँचल · Part 2/3',
    chapters: ['c10_hin_kr_ch13'],
    nodeIds: ['c10_hin_kr_cbse_13_007', 'c10_hin_kr_cbse_13_008', 'c10_hin_kr_cbse_13_009', 'c10_hin_kr_cbse_13_010', 'c10_hin_kr_cbse_13_011', 'c10_hin_kr_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'माता का अँचल\' में माता-का-अँचल जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'पाठ के जिस अनुच्छेद में लेखक लिखता है — "गोधूलि की बेला में आँगन की मिट्टी से सौंधी गंध उठती थी, मानो धरती ने अपनी थकान उतार दी हो" — वहाँ प्रयुक्त बिंब किस.',
        options: ['सही उत्तर: यह **घ्राण बिंब (olfactory imagery)** है', 'pictures', 'The smell of cow-dung is a metaphor for village life'],
        answer: 'सही उत्तर: यह **घ्राण बिंब (olfactory imagery)** है',
        hook: 'Students consistently confuse **बिंब (imagery)** with **रूपक (metaphor)** because both create "pictures." They write.',
    },
    teaching: [
        { title: 'माता का अँचल — गौण विषय', text: '\'माता का अँचल\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_kr_cbse_13_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['माता का अँचल —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_13_007', title: 'माता का अँचल — गौण विषय',
          caseStudy: { intro: '\'माता का अँचल\' में माता-का-अँचल जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: '**REMEMBER:** "गौण विषय" की परिभाषा लिखिए और "माता का अँचल" से किन्हीं दो गौण विषयों के नाम बताइए।', options: [
                { text: '**Correct:** गौण विषय वे द्वितीयक विचार हैं जो मुख्य विषय का पूरक बनकर कथ्य को विस्तार', outcome: '**Correct:** गौण विषय वे द्वितीयक विचार हैं जो मुख्य विषय का पूरक बनकर कथ्य को विस्तार देते हैं।.' },
                { text: 'माता का अँचल', outcome: 'Not quite — **Specific Error:** Students treat **plot points** (पिता का आना, आम चुराना, गाँव का वर्णन).', reveals: 'specific-error-students-treat-plot' },
                { text: 'पिता, गाँव, आम का पेड़', outcome: 'Not quite — **Specific Error:** Students treat **plot points** (पिता का आना, आम चुराना, गाँव का वर्णन).', reveals: 'specific-error-students-treat-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_13_008', title: 'माता का अँचल — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'माता का अँचल\' में बिंब ढूँढिए — माता-का-अँचल — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'पाठ में "माता का अँचल" शीर्षक स्वयं में एक रूपक है। यह रूपक किन दो असमान वस्तुओं/अवधारणाओं को सीधे-सीधे समान कर रहा है, और तुलना-सूचक शब्द.', options: [
                { text: 'सही उत्तर: शीर्षक "माता का अँचल" रूपक है जो **माता के आँचल (भौतिक वस्त्र)** को **सुरक्षा,', outcome: 'सही उत्तर: शीर्षक "माता का अँचल" रूपक है जो **माता के आँचल (भौतिक वस्त्र)** को **सुरक्षा, प्रेम.' },
                { text: 'pictures', outcome: 'Not quite — Students consistently confuse **बिंब (imagery)** with **रूपक (metaphor)** because both create.', reveals: 'students-consistently-confuse-imagery-with' },
                { text: 'The smell of cow-dung is a metaphor for village life', outcome: 'Not quite — Students consistently confuse **बिंब (imagery)** with **रूपक (metaphor)** because both create.', reveals: 'students-consistently-confuse-imagery-with' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hin_kr_cbse_13_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through माता का अँचल like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? माता का अँचल · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — माता का अँचल · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_007', difficulty: 'standard',
          question: '\'माता का अँचल\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, re-read node c10_hin_kr_cbse_13_006 (मुख्य विषय) and list the 4-5 most.',
          misconception: '**Specific Error:** Students treat **plot points** (पिता का आना, आम चुराना, गाँव का वर्णन) as sub-themes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माता का अँचल\' के गौण विषय',
                  options: ['\'माता का अँचल\' के गौण विषय', '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है', '\'माता का अँचल\' का कथानक', '\'माता का अँचल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, re-read node c10_hin_kr_cbse_13_006 (मुख्य विषय) and list the 4-5 most memorable scenes.',
                  misconception: '**Specific Error:** Students treat **plot points** (पिता का आना, आम चुराना, गाँव का वर्णन) as sub-themes.' }
          ],
            remediations: { 'specific-error-students-treat-plot': { steps: ['**Step-by-step remediation:** 1.', '**Re-define:** Write on board: "Topic = Noun (पिता, गाँव) | Theme = Abstract Idea (पितृसत्तात्मक अनुशासन, ग्रामीण.', '**Drill:** Give 5 nouns from chapter (आम, नदी, त्योहार, माँ, पिता) — ask student to convert each to a theme statement.', '**Model:** Show a 3-mark board answer: "गौण विषय: ग्रामीण परिवेश की सहजता। साक्ष्य: \'आम के बाग में...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_008', difficulty: 'standard',
          question: '\'माता का अँचल\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'Review Class 9 poetry chapter "साखी/सबद" where कबीर के पदों में "गुरु कुम्हार शिष्य कुम्भ.',
          misconception: 'Students consistently confuse **बिंब (imagery)** with **रूपक (metaphor)** because both create "pictures." They write.',
          parts: [
                { id: 'a', prompt: 'पाठ के जिस अनुच्छेद में लेखक लिखता है — "गोधूलि की बेला में आँगन की मिट्टी से सौंधी गंध उठती थी, मानो धरती ने अपनी थकान उतार दी हो" — वहाँ प्रयुक्त बिंब किस.', answer: 'सही उत्तर: यह **घ्राण बिंब (olfactory imagery)** है',
                  options: ['सही उत्तर: यह **घ्राण बिंब (olfactory imagery)** है', 'pictures', 'The smell of cow-dung is a metaphor for village life'],
                  hint: 'Review Class 9 poetry chapter "साखी/सबद" where कबीर के पदों में "गुरु कुम्हार शिष्य कुम्भ है".',
                  misconception: 'Students consistently confuse **बिंब (imagery)** with **रूपक (metaphor)** because both create "pictures." They write: "The smell.' },
                { id: 'b', prompt: 'पाठ में "बचपन एक ऐसा मेला है जो रोज़ लगता है और रोज़ उजड़ जाता है" — यदि यह वाक्य पाठ में होता, तो यह रूपक होता या उपमा?', answer: 'सही उत्तर: यह **रूपक** है',
                  options: ['सही उत्तर: यह **रूपक** है', 'pictures', 'The smell of cow-dung is a metaphor for village life'],
                  hint: 'Review Class 9 poetry chapter "साखी/सबद" where कबीर के पदों में "गुरु कुम्हार शिष्य कुम्भ है".',
                  misconception: 'Students consistently confuse **बिंब (imagery)** with **रूपक (metaphor)** because both create "pictures." They write: "The smell.' }
          ],
            remediations: { 'students-consistently-confuse-imagery-with': { steps: ['Give the student two columns — column A: 5 sensory sentences from the text (e.g., "चूल्हे के धुएँ से आँखें जलती थीं").', 'Have them convert one बिंब into a रूपक deliberately: "चूल्हे का धुआँ **था** गाँव की साँस" — now they *feel* the.', 'Practice 3 board-style 2-mark questions: "Identify the device + quote words + name the sense/terms equated." Mark.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_009', difficulty: 'standard',
          question: '\'माता का अँचल\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके तो नोड 13_008 की \'बिंब-रूपक विश्लेषण विधि\' दोहराएँ और पाठ के \'आँचल\' प्रसंग को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **विरोधाभास** का अर्थ केवल "दो विपरीत बातों का एक साथ आना" है (जैसे — दिन में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माता का अँचल\' में विरोधाभास',
                  options: ['\'माता का अँचल\' में विरोधाभास', '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है', '\'माता का अँचल\' का कथानक', '\'माता का अँचल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो नोड 13_008 की \'बिंब-रूपक विश्लेषण विधि\' दोहराएँ और पाठ के \'आँचल\' प्रसंग को फिर से पढ़ें।',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **विरोधाभास** का अर्थ केवल "दो विपरीत बातों का एक साथ आना" है (जैसे — दिन में अंधेरा)। वे भूल जाते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र को पाठ से "आँचल" शब्द वाले 5 वाक्य छाँटने को कहें। 2.', '**चरण 2:** प्रत्येक वाक्य में पूछें — "यहाँ आँचल कपड़ा मात्र है या कुछ और दर्शा रहा है?" 3.', '**चरण 3:** विरोधाभास के लिए दो कॉलम बनवाएँ — \'कथन\' और \'छुपा सत्य\'। उदाहरण: कथन — "माँ अनपढ़ थी", छुपा सत्य — "पर.', '**चरण 4:** छात्र से एक पैराग्राफ लिखवाएँ जहाँ वह प्रतीक और विरोधाभास दोनों का प्रयोग कर माँ का चित्र खींचे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_010', difficulty: 'standard',
          question: '\'माता का अँचल\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटकें तो मुख्य विषय और संदेश (c10_hin_kr_cbse_13_006) की समीक्षा करें।',
          misconception: 'छात्र अक्सर मुख्य शब्दों को केवल उनके शाब्दिक अर्थ (dictionary meaning) में सीमित रख देते हैं और उनके पाठ‑विशेष संदर्भ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माता का अँचल\' की पदावली',
                  options: ['\'माता का अँचल\' की पदावली', '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है', '\'माता का अँचल\' का कथानक', '\'माता का अँचल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटकें तो मुख्य विषय और संदेश (c10_hin_kr_cbse_13_006) की समीक्षा करें।',
                  misconception: 'छात्र अक्सर मुख्य शब्दों को केवल उनके शाब्दिक अर्थ (dictionary meaning) में सीमित रख देते हैं और उनके पाठ‑विशेष संदर्भ, भावगत undertone या.' }
          ],
            remediations: { 'dictionary-meaning': { steps: ['छात्र को सबसे पहले शब्द को वाक्य में पढ़कर सुनने को कहें, फिर पूछें: "यह शब्द यहाँ किस भावना को व्यक्त कर रहा है?" फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_011', difficulty: 'standard',
          question: '\'माता का अँचल\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'If stuck, re-read the chapter focusing **only on dialogues** — highlight every word you.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'भाषा-प्रयोग\' = \'कठिन शब्दों की सूची बनाना + अर्थ लिखना\'**। **ठीक विपरीत:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माता का अँचल\' में भाषा-प्रयोग',
                  options: ['\'माता का अँचल\' में भाषा-प्रयोग', '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है', '\'माता का अँचल\' का कथानक', '\'माता का अँचल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, re-read the chapter focusing **only on dialogues** — highlight every word you don\'t use.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि **\'भाषा-प्रयोग\' = \'कठिन शब्दों की सूची बनाना + अर्थ लिखना\'**। **ठीक विपरीत:** बोर्ड परीक्षा में.' }
          ],
            remediations: { '9-vocabulary': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**पाठ का एक पैरा चुनें** (जैसे माँ द्वारा बेटे को जगाना)। छात्र से कहें: **"हर वाक्य को मानक हिंदी में अनूदित करो"**.', '**दोनों संस्करण साथ रखें** (मूल आंचलिक + अनूदित मानक)। पूछें: **"क्या खो गया?', 'क्या बदल गया?"** — छात्र स्वयं बोलेगा: "अपनापन खो गया", "माँ की आवाज़ बदल गई", "गाँव नहीं रहा"। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_kr_cbse_13_012', difficulty: 'standard',
          question: '\'माता का अँचल\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि छात्र वस्तुनिष्ठ और आशय‑सूचक के अंतर में भ्रमित हो, तो उसे c10_hin_kr_cbse_13_002.',
          misconception: 'छात्र अक्सर मान लेते हैं कि यदि प्रश्न का उत्तर पाठ में स्पष्ट शब्दों में नहीं लिखा है, तो वह अनुचित या “गलत” प्रश्न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'माता का अँचल\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'माता का अँचल\' के वस्तुनिष्ठ प्रश्न', '\'माता का अँचल\' का रचनाकार-परिचय और पृष्ठभूमि का अर्थ है', '\'माता का अँचल\' का कथानक', '\'माता का अँचल\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र वस्तुनिष्ठ और आशय‑सूचक के अंतर में भ्रमित हो, तो उसे c10_hin_kr_cbse_13_002.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि यदि प्रश्न का उत्तर पाठ में स्पष्ट शब्दों में नहीं लिखा है, तो वह अनुचित या “गलत” प्रश्न है, और इसलिए वे ऐसे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही पंक्ति से दोनों प्रकार के प्रश्न कैसे बन सकते हैं—उदाहरण: पंक्ति “माँ ने अपने अँचल से बच्चे को.', 'वस्तुनिष्ठ प्रश्न बनाइए: “माँ ने बच्चे को किससे ढका?” → उत्तर: अपने अँचल से। 2.', 'आशय‑सूचक प्रश्न बनाइए: “इस क्रिया से क्या भाव प्रकट होता है?” → उत्तर: ममता और सुरक्षा का भाव। फिर छात्र से अभ्यास.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
