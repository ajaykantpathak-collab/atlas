import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hin_ga_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hin_ga_ch07_p2: SimDef = {
    id: 'v3_c9_hin_ga_ch07_p2',
    title: 'पाठ 7 · Part 2/3',
    subtitle: 'यह नोड केवल \'गौण विषय\' की पहचान, वर्गीकरण, मुख्य विषय से संबंध, और पाठगत साक्ष्य द्वारा.',
    classLevel: 9, subject: 'hin_ga', topic: 'पाठ 7 · Part 2/3',
    chapters: ['c9_hin_ga_ch07'],
    nodeIds: ['c9_hin_ga_cbse_07_007', 'c9_hin_ga_cbse_07_008', 'c9_hin_ga_cbse_07_009', 'c9_hin_ga_cbse_07_010', 'c9_hin_ga_cbse_07_011', 'c9_hin_ga_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: '\'मेरे बचपन के दिन\' में महादेवी वर्मा, बचपन, आत्मकथा, स्मृति जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 7 — गौण विषय', text: '\'मेरे बचपन के दिन\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hin_ga_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 7 — गौण', 'पाठ 7 — साहित्यिक', 'पाठ 7 — पदावली', 'पाठ 7 — व्याकरण', 'पाठ 7 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c9_hin_ga_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 7 · Part 2/3', spots: [
            { id: 's1', label: '7 -', prompt: 'Which idea is this? — \'मेरे बचपन के दिन\' में भाषा-प्रयोग — महादेवी वर्मा ने कैसे शब्द, वाक्य और शैली चुनी।', answer: '7 -', options: ['7 -', '7 - -'] },
            { id: 's2', label: '7 - -', prompt: 'Which idea is this? — \'मेरे बचपन के दिन\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', answer: '7 - -', options: ['7 - -', '7 -'] }
          ] } },
        { type: 'case', nodeId: 'c9_hin_ga_cbse_07_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 7 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 7 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 7 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_007', difficulty: 'standard',
          question: '\'मेरे बचपन के दिन\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो नोड 006 (मुख्य विषय) के \'मास्टरी क्राइटेरिया\' को दोहराएँ और नोड 004/005 के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "गौण विषय = कहानी में घटने वाली कोई भी छोटी घटना या पात्र की कोई भी विशेषता"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरे बचपन के दिन\' के गौण विषय',
                  options: ['\'मेरे बचपन के दिन\' के गौण विषय', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'मेरे बचपन के दिन\' का कथानक', '\'मेरे बचपन के दिन\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो नोड 006 (मुख्य विषय) के \'मास्टरी क्राइटेरिया\' को दोहराएँ और नोड 004/005 के.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि "गौण विषय = कहानी में घटने वाली कोई भी छोटी घटना या पात्र की कोई भी विशेषता"। **गलत तर्क:** वे पाठ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 (अवधारणा स्पष्टीकरण):** छात्र से कहो: "घटना कैमरे से रिकॉर्ड होती है, विषय दिमाग में बनता है।" उसे 3 घटनाएँ.', '**चरण 2 (मैपिंग):** पाठ 7 की 5 प्रमुख घटनाएँ बोर्ड पर लिखवाओ। प्रत्येक के सामने लिखवाओ: "यह घटना कौन-सा मूल्य दर्शाती.', '**चरण 3 (मुख्य विषय से जोड़):** प्रत्येक समूह के लिए पूछो: "यह मुख्य विषय (नोड 006) को कैसे मजबूत करता है?" लिखित उत्तर.', '**चरण 4 (अभ्यास):** एक नया छोटा पैराग्राफ देकर गौण विषय पहचानने का स्वतंत्र अभ्यास करवाओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_008', difficulty: 'standard',
          question: '\'मेरे बचपन के दिन\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटके तो **उपमा और रूपक के 5-5 उदाहरण** लिखकर उनके भेद (सहायक शब्द की.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **हर मानवीकरण (personification) रूपक है**। उदाहरण: "हवा गाती हुई निकली" — छात्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरे बचपन के दिन\' में बिंब (imagery)',
                  options: ['\'मेरे बचपन के दिन\' में बिंब (imagery)', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'मेरे बचपन के दिन\' का कथानक', '\'मेरे बचपन के दिन\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **उपमा और रूपक के 5-5 उदाहरण** लिखकर उनके भेद (सहायक शब्द की उपस्थिति/अनुपस्थिति) पर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **हर मानवीकरण (personification) रूपक है**। उदाहरण: "हवा गाती हुई निकली" — छात्र इसे रूपक कहते हैं.' }
          ],
            remediations: { 'personification': { steps: ['छात्र को दो कॉलम बनाने को कहें: **स्तंभ अ — संज्ञा-संज्ञा समानता (रूपक)**, **स्तंभ ब — क्रिया/विशेषण आरोप.', '10 पंक्तियाँ दें (मिश्रित), छात्र को प्रत्येक पंक्ति में उपमेय-उपमान रेखांकित कर सही स्तंभ में रखने को कहें। 3.', 'हर चयन पर पूछें: "क्या \'जैसे/वैसा\' है?', 'क्या दो संज्ञाएँ बराबर रखी गई हैं?" — इससे निर्णय-नियम आंतरिक हो जाता है। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_009', difficulty: 'standard',
          question: '\'मेरे बचपन के दिन\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि stuck महसूस हो तो बिंब और रूपक (c9_hin_ga_cbse_07_008) की पहचान में अभ्यास करें.',
          misconception: 'छात्र अक्सर विरोधाभास को प्रतीक से conflate कर देते हैं, सोचते हैं कि यदि कोई वाक्य विरोधाभासी है तो वह अपने आप में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरे बचपन के दिन\' में विरोधाभास',
                  options: ['\'मेरे बचपन के दिन\' में विरोधाभास', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'मेरे बचपन के दिन\' का कथानक', '\'मेरे बचपन के दिन\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि stuck महसूस हो तो बिंब और रूपक (c9_hin_ga_cbse_07_008) की पहचान में अभ्यास करें - क्योंकि.',
                  misconception: 'छात्र अक्सर विरोधाभास को प्रतीक से conflate कर देते हैं, सोचते हैं कि यदि कोई वाक्य विरोधाभासी है तो वह अपने आप में प्रतीक भी बन जाता है.' }
          ],
            remediations: { 'conflate': { steps: ['सबसे पहले छात्र से स्पष्ट वाक्यों में प्रत्येक concept अलग-अलग पहलवाने को कहिए: "वह खुश थी लेकिन रो रही थी" (केवल.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_010', difficulty: 'standard',
          question: '\'मेरे बचपन के दिन\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि अटके तो c9_hin_ga_cbse_07_006 (मुख्य विषय और संदेश) पर लौटें — विषय स्पष्ट होते ही.',
          misconception: 'छात्र समझते हैं कि **\'कठिन/अपरिचित शब्द\' ही \'मुख्य शब्द\' होते हैं** — इसलिए वे पाठ से \'क्लिष्ट\' शब्द छाँट लेते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरे बचपन के दिन\' की पदावली',
                  options: ['\'मेरे बचपन के दिन\' की पदावली', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'मेरे बचपन के दिन\' का कथानक', '\'मेरे बचपन के दिन\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c9_hin_ga_cbse_07_006 (मुख्य विषय और संदेश) पर लौटें — विषय स्पष्ट होते ही मुख्य शब्द.',
                  misconception: 'छात्र समझते हैं कि **\'कठिन/अपरिचित शब्द\' ही \'मुख्य शब्द\' होते हैं** — इसलिए वे पाठ से \'क्लिष्ट\' शब्द छाँट लेते हैं (जैसे \'यथार्थवाद\'.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ का **एक पैराग्राफ** दें और कहें: "इसमें से **सबसे साधारण 3 शब्द** चुनो जो अगर हटा दिए जाएँ तो पैराग्राफ का.', 'फिर उन 3 शब्दों के लिए **\'शब्द-प्रतिस्थापन परीक्षण\'** करवाएँ: "इस शब्द की जगह X रख दो — अर्थ में क्या फर्क पड़ा?".', 'अंत में छात्र से कहें: "**इन 3 शब्दों को लेकर एक नया वाक्य लिखो जो पाठ की कहानी न कहे, पर पाठ का विषय कहे**" — इससे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_011', difficulty: 'standard',
          question: '\'मेरे बचपन के दिन\' में भाषा-प्रयोग — महादेवी वर्मा ने कैसे शब्द, वाक्य और शैली.',
          hint: 'Review **c9_hin_ga_cbse_07_010 (पदावली)** for word-origin classification and Class 8.',
          misconception: 'Students treat "भाषा-प्रयोग" as a **vocabulary listing exercise** — they hunt for "hard words" (शब्दार्थ), write their.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरे बचपन के दिन\' में भाषा-प्रयोग',
                  options: ['\'मेरे बचपन के दिन\' में भाषा-प्रयोग', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'मेरे बचपन के दिन\' का कथानक', '\'मेरे बचपन के दिन\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review **c9_hin_ga_cbse_07_010 (पदावली)** for word-origin classification and Class 8 Hindi grammar.',
                  misconception: 'Students treat "भाषा-प्रयोग" as a **vocabulary listing exercise** — they hunt for "hard words" (शब्दार्थ), write their meanings, and stop.' }
          ],
            remediations: { 'students-treat-as-a-vocabulary': { steps: ['** Take ONE sentence from the text. Ask: "List 3 other ways to say this same thing in Hindi." (e.g., "वह चला गया" → "वह.', '** For each alternative, ask: "If the author used *this* version, how would the character sound different? Richer?', '** Return to the original sentence. Ask: "So why did the author pick *this specific one*?" — Force the student.', '** Repeat with 2 more sentences. Gradually shift from *teacher-led* to *student-led* questioning.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_hin_ga_cbse_07_012', difficulty: 'standard',
          question: '\'मेरे बचपन के दिन\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि अटके तो नोड 006 (मुख्य विषय और संदेश) और नोड 004 (नायक चित्रण) को दोहराएँ — ये.',
          misconception: 'छात्र अक्सर मान लेते हैं कि \'आशय-सूचक प्रश्न\' का अर्थ \'बड़ा उत्तर लिखना\' होता है, इसलिए वे पाठ के असंबंधित विवरण जोड़कर.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'मेरे बचपन के दिन\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'मेरे बचपन के दिन\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का पृष्ठभूमि और रचनाकार परिचय', '\'मेरे बचपन के दिन\' का कथानक', '\'मेरे बचपन के दिन\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो नोड 006 (मुख्य विषय और संदेश) और नोड 004 (नायक चित्रण) को दोहराएँ — ये आशय-सूचक उत्तर.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि \'आशय-सूचक प्रश्न\' का अर्थ \'बड़ा उत्तर लिखना\' होता है, इसलिए वे पाठ के असंबंधित विवरण जोड़कर शब्द-सीमा पूरी करने.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को 3 वस्तुनिष्ठ और 3 आशय-सूचक प्रश्न दें; उसे केवल \'प्रश्न के प्रकार\' पहचानने को कहें (उत्तर न लिखवाएँ).', 'चरण 4: बोर्ड के विगत 3 वर्षों के 2-3 अंकों वाले आशय-सूचक प्रश्नों के उत्तर दिखाएँ और उनकी शब्द-सीमा व संरचना का.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
