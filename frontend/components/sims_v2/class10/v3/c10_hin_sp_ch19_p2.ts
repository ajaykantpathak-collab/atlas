import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch19_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch19_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch19_p2',
    title: 'पर्वत प्रदेश में पावस · Part 2/3',
    subtitle: 'यह नोड **केवल** \'पर्वत प्रदेश में पावस\' कविता में प्रयुक्त **प्रतीक और बिंब** की पहचान.',
    classLevel: 10, subject: 'hin_sp', topic: 'पर्वत प्रदेश में पावस · Part 2/3',
    chapters: ['c10_hin_sp_ch19'],
    nodeIds: ['c10_hin_sp_cbse_19_007', 'c10_hin_sp_cbse_19_008', 'c10_hin_sp_cbse_19_009', 'c10_hin_sp_cbse_19_010', 'c10_hin_sp_cbse_19_011', 'c10_hin_sp_cbse_19_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'पर्वत प्रदेश में पावस\' में पर्वत-प्रदेश-में-पावस जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पर्वत प्रदेश में पावस — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'पर्वत प्रदेश में पावस\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_19_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पर्वत प्रदेश में पावस'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_19_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पर्वत प्रदेश में पावस like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पर्वत प्रदेश में पावस · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पर्वत प्रदेश में पावस · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_007', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो **c10_hin_sp_cbse_19_006** के \'उपमा-रूपक पहचान\' अभ्यास को दोहराएँ — हर अलंकार.',
          misconception: '**सटीक भ्रम:** छात्र समझते हैं कि **हर तुलना (उपमा/रूपक) अपने आप एक प्रतीक बन जाती है**। **वास्तविकता:** "बारिश मोतियों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' के गौण विषय',
                  options: ['\'पर्वत प्रदेश में पावस\' के गौण विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो **c10_hin_sp_cbse_19_006** के \'उपमा-रूपक पहचान\' अभ्यास को दोहराएँ — हर अलंकार से पूछें.',
                  misconception: '**सटीक भ्रम:** छात्र समझते हैं कि **हर तुलना (उपमा/रूपक) अपने आप एक प्रतीक बन जाती है**। **वास्तविकता:** "बारिश मोतियों सी गिरी" — यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कविता की कोई एक पंक्ति चुनवाओ जिसमें \'जैसे/जैसी\' हो (उपमा)। 2.', '**चरण 2:** पूछो: "यह तुलना कौन-सी इंद्रिय को जगाती है?" → बिंब पहचाना। 3.', '**चरण 3:** अब पूछो: "कवि ने *इसी* तुलना को क्यों चुना?', 'क्या \'मोती\' की जगह \'काँच के टुकड़े\' होते तो अर्थ बदल जाता?" → प्रतीक की ओर ध्यान गया। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_008', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_19_002 (पद्यांश-वार भावार्थ)** और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'मुख्य भाव\' = \'कविता का सारांश (summary)\'। वे लिखते हैं: "कविता में बादल आते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' में बिंब (imagery)',
                  options: ['\'पर्वत प्रदेश में पावस\' में बिंब (imagery)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_19_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_19_007.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'मुख्य भाव\' = \'कविता का सारांश (summary)\'। वे लिखते हैं: "कविता में बादल आते हैं, बारिश होती है.' }
          ],
            remediations: { 'summary': { steps: ['**पहला कदम**: छात्र से कहें — "कविता की **पहली और अंतिम 4 पंक्तियाँ** साथ रखकर पढ़ो। पूछो: कवि आरंभ में क्या देखता है?', 'अंत में क्या महसूस करता है?', '**दूसरा कदम**: **\'भाव-शब्द\' सूची** बनवाएँ: आनंद, मुक्ति, नवजीवन, सौंदर्य, कृतज्ञता, शांति, ऐक्य। इनमें से किन्हीं तीन.', '**तीसरा कदम**: एक **तालिका** बनवाएँ — स्तंभ 1: रूपक (नर्तकी/अतिथि/माता), स्तंभ 2: कौन-सा पद, स्तंभ 3: क्या भाव व्यक्त.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_009', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_19_008 (मुख्य भाव और संदेश)** दोबारा पढ़ें.',
          misconception: '**सबसे गंभीर भ्रांति:** विद्यार्थी समझते हैं कि **"कोई भी छोटा प्रसंग गौण भाव है और कोई भी लंबा प्रसंग विषयांतर"**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' में विरोधाभास',
                  options: ['\'पर्वत प्रदेश में पावस\' में विरोधाभास', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_19_008 (मुख्य भाव और संदेश)** दोबारा पढ़ें — मुख्य भाव.',
                  misconception: '**सबसे गंभीर भ्रांति:** विद्यार्थी समझते हैं कि **"कोई भी छोटा प्रसंग गौण भाव है और कोई भी लंबा प्रसंग विषयांतर"** — जबकि सच्चाई यह है कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पढ़ाई करवाएँ:** कविता के **पहले दो पदों** को साथ पढ़ें — विद्यार्थी से पूछें: "कौन-सी पंक्तियाँ केवल बारिश का.', '(मुख्य भाव) कौन-सी पंक्तियाँ बारिश के *साथ* हो रही किसी और चीज़ का वर्णन कर रही हैं?', '(गौण भाव) कौन-सी पंक्ति अचानक बारिश छोड़कर किसी *अन्य* विषय पर चली गई?', '**रंग-कोडिंग करवाएँ:** तीन रंगों के पेन दें — मुख्य भाव (नीला), गौण भाव (हरा), विषयांतर (लाल)। पूरी कविता पर मार्किंग.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_010', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी.',
          hint: 'यदि अटके तो c10_hin_sp_cbse_19_002 (पद्यांश-वार भावार्थ) और c10_hin_sp_cbse_19_007.',
          misconception: 'छात्र समझते हैं कि \'कठिन शब्द अर्थ\' का मतलब केवल **शब्दकोशीय अर्थ रटना** है। वे \'शैल=पहाड़\', \'गिरि=पर्वत\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' की पदावली',
                  options: ['\'पर्वत प्रदेश में पावस\' की पदावली', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_19_002 (पद्यांश-वार भावार्थ) और c10_hin_sp_cbse_19_007 (प्रतीक) दोबारा.',
                  misconception: 'छात्र समझते हैं कि \'कठिन शब्द अर्थ\' का मतलब केवल **शब्दकोशीय अर्थ रटना** है। वे \'शैल=पहाड़\', \'गिरि=पर्वत\', \'निर्झर=झरना\' लिखकर संतुष्ट हो.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "कविता की कोई एक पंक्ति चुनो जिसमें कठिन शब्द हो। उस शब्द को घेरो।" **चरण 2**: पूछें — "इस.', 'अब आँख बंद करो और बताओ — कवि ने *यही* शब्द क्यों चुना, उसका पर्यायवाची क्यों नहीं?" (उदाहरण: \'शैल\' बनाम \'पहाड़\')। **चरण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_011', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि अटका हुआ लगे, तो **c10_hin_sp_cbse_19_006 (अलंकार)** और **c10_hin_sp_cbse_19_007.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'पद्य में भाषा-प्रयोग\' का प्रश्न आने पर उन्हें **अलंकारों के नाम गिनाने** हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' में भाषा-प्रयोग',
                  options: ['\'पर्वत प्रदेश में पावस\' में भाषा-प्रयोग', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ लगे, तो **c10_hin_sp_cbse_19_006 (अलंकार)** और **c10_hin_sp_cbse_19_007.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि \'पद्य में भाषा-प्रयोग\' का प्रश्न आने पर उन्हें **अलंकारों के नाम गिनाने** हैं (जैसे "यहाँ अनुप्रास है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें — "कविता की कोई एक पंक्ति जोर से पढ़ो। बताओ: तुम्हें कौन-सी ध्वनि (क, ख, ग, घ...', 'या म, न, ङ...) बार-बार सुनाई दी?" (ध्वनि-जागरूकता जगाएँ)। 2.', '**चरण 2:** उसी पंक्ति का एक शब्द लें (जैसे \'निर्झर\')। पूछें: "इस शब्द की जगह \'झरना\' लिख देते तो क्या फर्क पड़ता?', 'सांस्कृतिक बोध में?" (शब्द-चयन का औचित्य समझाएँ)। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_012', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँस जाएँ तो c10_hin_sp_cbse_19_002 (भावार्थ) और c10_hin_sp_cbse_19_006 (अलंकार).',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर = पंक्ति का हिंदी अनुवाद/सरल अर्थ" — इसलिए वे लिखते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'पर्वत प्रदेश में पावस\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो c10_hin_sp_cbse_19_002 (भावार्थ) और c10_hin_sp_cbse_19_006 (अलंकार) दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "आशय-सूचक प्रश्न का उत्तर = पंक्ति का हिंदी अनुवाद/सरल अर्थ" — इसलिए वे लिखते हैं: "कवि कह रहा है.' }
          ],
            remediations: { 'cbse-1-1': { steps: ['**तत्काल निदान:** छात्र से कहें — "यह पंक्ति पढ़ो: \'मेघ घिर आए\'। अब मुझे बताओ: कवि ने \'घिर आए\' क्यों लिखा, \'आए\' क्यों.', '**मॉडलिंग दिखाएँ:** उसी पंक्ति का दो उत्तर लिखवाएँ — (क) कमज़ोर: "बादल आ गए।" (ख) बोर्ड-स्तरीय: "\'घिर आए\' **मानवीकरण**.', '**अभ्यास ड्रिल:** प्रतिदिन 1 काव्यांश दें, केवल 2 आशय-सूचक प्रश्न — छात्र को **PEEL शीट** (4 कॉलम: Point, Evidence.', '**फीडबैक लूप:** शिक्षक केवल Explanation कॉलम जाँचें — वहाँ \'क्यों/कैसे\' शब्द अनिवार्य हों; न होने पर वापस करें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
