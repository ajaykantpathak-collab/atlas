import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch14_p1: SimDef = {
    id: 'v3_c12_hin_a_ch14_p1',
    title: 'शेर, पहचान, चार हाथ, साझा · Part 1/3',
    subtitle: 'A lid on the well, a gag on the people',
    classLevel: 12, subject: 'hin_a', topic: 'शेर, पहचान, चार हाथ, साझा · Part 1/3',
    chapters: ['c12_hin_a_ch14'],
    nodeIds: ['c12_hin_a_cbse_14_001', 'c12_hin_a_cbse_14_002', 'c12_hin_a_cbse_14_003', 'c12_hin_a_cbse_14_004', 'c12_hin_a_cbse_14_005', 'c12_hin_a_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Satire reader', intro: 'Four short stories from a journalist\'s pen — each one a different machine for how power eats the weak.', goal: 'Read the four stories as variations on power and resistance in Asghar Wajahat\'s satirical voice.' },
    discovery: {
        question: 'A kingdom covers a well\'s mouth so no voice escapes; a magician rules by fear; a fakir trades men\'s limbs; a servant outwits his master — four stories, one theme. Which?',
        options: ['Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose', 'Magic and fantasy', 'Village comedy', 'Random variety'],
        answer: 'Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose',
        hook: 'The journalist\'s craft is the giveaway — simple spoken language carrying sharp satire; even the glossary is a code: \'myaan\' (scabbard) hints at hidden violence, the fakir\'s words flag hypocrisy. The well\'s lid is the citizenry\'s gagged voice.',
    },
    teaching: [
        { title: 'शेर, पहचान, चार हाथ, साझा — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और रचनात्मक यात्रा का संक्षिप्त विवरण देना, जिससे पाठ के पीछे के उद्देश्य और संदेश को बेहतर ढंग से समझा जा सके।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the satire four ways: unmask the well\'s lid as silenced dissent, split state-scale from household-scale power, and read the vocabulary list as a map of the stories\' politics.',
        labels: ['शेर, पहचान, चार हाथ,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your hostel reports a wobbly fan. Weeks later it\'s a \'case\' — the warden consulted the electrician, who consulted the engineer, who proposed a structural audit, who now wants a committee — while the fan still wobbles.',
            decisions: [{ prompt: 'Which of Asghar Wajahat\'s story structures is playing out?', options: [
                { text: '\'चार हाथ\' — the consultative chain where each expert inflates a simple problem into an elaborate procedure; the satire is that consultation replaces repair, so name the chain and fix the fan.', outcome: 'The story\'s bottom-up repetition exists to show bureaucracy compounding — every added opinion multiplies absurdity while the object stays broken; recognising the structure is the way out of it.' },
                { text: '\'शेर\' — the mystery story where appearances deceive, so the fan probably isn\'t the real issue.', outcome: 'That misapplies the chapter\'s suspense structure to a satire problem: nothing here is hidden or supernatural — the failure is fully visible, which is exactly what the consultative-chain story mocks.', reveals: 'every-mess-is-mystery' },
                { text: 'Wait it out — each consultation is a real step, so the process is working as designed.', outcome: 'The story\'s chain is \'working\' only in the sense that it keeps moving; the diagnosis it offers is that motion through offices is a substitute for — not a route to — the repair.', reveals: 'process-equals-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a satirist\'s quartet as one argument about power — and spot how a lid on a well is a lid on a people.',
            decisions: [{ prompt: 'What comes next? शेर, पहचान, चार हाथ, साझा · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — शेर, पहचान, चार हाथ, साझा · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक.',
          hint: 'यदि फंसे हुए महसूस हो तो Class 11 के किसी भी पाठ के लेखक परिचय (जैसे.',
          misconception: 'छात्र अक्सर सोचते हैं कि लेखक का परिचय केवल इसलिए महत्वपूर्ण है क्योंकि यह पाठ्यक्रम में दिया गया है और इसे याद करके.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और',
                  options: ['पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई', 'नायक/प्रमुख पात्र का चित्रण वह प्रक्रिया है जिसमें लेखक द्वारा दिखाए गए पात्र के बाह्य'],
                  hint: 'यदि फंसे हुए महसूस हो तो Class 11 के किसी भी पाठ के लेखक परिचय (जैसे c11_hin_a_cbse_01_001) को.',
                  misconception: 'छात्र अक्सर सोचते हैं कि लेखक का परिचय केवल इसलिए महत्वपूर्ण है क्योंकि यह पाठ्यक्रम में दिया गया है और इसे याद करके लिखने से बोर्ड परीक्षा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछिए कि वे अपने पसंदीदा फिल्म या किताब केcreator के बारे में क्या जानते हैं - जैसे कि वे क्यों बने, क्या.', 'इस चरण-दर-चरण संवाद के माध्यम से अवधारणा को concreat बनाइए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_002', difficulty: 'standard',
          question: 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल.',
          hint: 'यदि stuck महसूस हो तो कक्षा 11 के किसी भी पाठ के कथानक-analysis को दोबारा देखें — विशेषकर.',
          misconception: 'विद्यार्थी अक्सर यह मानते हैं कि यदि कहानी में अतीत की घटनाएँ आएँ तो वह स्वतः ही अनुक्रम-विक्रम संरचना है, भले ही वे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;',
                  options: ['कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई', 'नायक/प्रमुख पात्र का चित्रण वह प्रक्रिया है जिसमें लेखक द्वारा दिखाए गए पात्र के बाह्य'],
                  hint: 'यदि stuck महसूस हो तो कक्षा 11 के किसी भी पाठ के कथानक-analysis को दोबारा देखें — विशेषकर वह जहाँ.',
                  misconception: 'विद्यार्थी अक्सर यह मानते हैं कि यदि कहानी में अतीत की घटनाएँ आएँ तो वह स्वतः ही अनुक्रम-विक्रम संरचना है, भले ही वे केवल पात्र के संवाद या.' }
          ],
            remediations: { 'wrong-idea': { steps: ['विद्यार्थी को दो टुकड़े दें: एक जहाँ पात्र बस कहता है "मैं अपने बचपन को याद कर रहा हूँ" (सामग्री: अतीत, संरचना: रैखिक.', 'दूसरे में क्या रुका?" इससे स्पष्ट होगा कि संरचना में बदलाव केवल समय के उल्लेख से नहीं, बल्कि कथन के प्रवाह के 중단 से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है.',
          hint: 'यदि छात्र पाठ्य-परिवेश की पहचान में फँस गया है, तो उसे कक्षा 11 के पाठ 1, 2 और 3 के.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश केवल तभी मायने रखता है जब पाठ स्पष्ट रूप से ऐतिहासिक घटनाओं का उल्लेख करे—जैसे.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई',
                  options: ['पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'नायक/प्रमुख पात्र का चित्रण वह प्रक्रिया है जिसमें लेखक द्वारा दिखाए गए पात्र के बाह्य'],
                  hint: 'यदि छात्र पाठ्य-परिवेश की पहचान में फँस गया है, तो उसे कक्षा 11 के पाठ 1, 2 और 3 के "पाठ्य-परिवेश.',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ्य-परिवेश केवल तभी मायने रखता है जब पाठ स्पष्ट रूप से ऐतिहासिक घटनाओं का उल्लेख करे—जैसे यदि कोई पाठ "1947 में.' }
          ],
            remediations: { '1947': { steps: ['यदि छात्र इस गलतफहमी में फंसा है, तो उसे इस प्रकार सुधारें: पहले, उसे एक ऐसा पाठ दें जिसमें स्पष्ट ऐतिहासिक संदर्भ न हो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_004', difficulty: 'standard',
          question: 'नायक/प्रमुख पात्र का चित्रण वह प्रक्रिया है जिसमें लेखक द्वारा दिखाए गए पात्र.',
          hint: 'यदि फँसें तो कक्षा 11 के पात्र-चित्रण के मूल मॉडल (c11_hin_a_cbse_04_004) को पुनः देखें.',
          misconception: 'छात्र अक्सर नायक के चित्रण को केवल उसके बाह्य लक्षणों (जैसे: वह शेर जैसा दिखता है, चार हाथ हैं) तक सीमित रखते हैं और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'नायक/प्रमुख पात्र का चित्रण वह प्रक्रिया है जिसमें लेखक द्वारा दिखाए गए पात्र के बाह्य',
                  options: ['नायक/प्रमुख पात्र का चित्रण वह प्रक्रिया है जिसमें लेखक द्वारा दिखाए गए पात्र के बाह्य', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि फँसें तो कक्षा 11 के पात्र-चित्रण के मूल मॉडल (c11_hin_a_cbse_04_004) को पुनः देखें — विशेष रूप.',
                  misconception: 'छात्र अक्सर नायक के चित्रण को केवल उसके बाह्य लक्षणों (जैसे: वह शेर जैसा दिखता है, चार हाथ हैं) तक सीमित रखते हैं और उसके आंतरिक आयामों.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र केवल बाह्य लक्षणों पर ध्यान दे रहा है, तो उसे निम्नलिखित चरण-दर-चरण अभ्यास करवाएँ: 1.', 'पाठ से दो बाह्य लक्षणों की सूची बनवाएँ (जैसे: कपड़ों का रंग, चलन की शैली)। 2.', 'प्रत्येक बाह्य लक्षण के लिए पूछें: "यह लक्षण नायक के आंतरिक गुण (जैसे: आत्मविश्वास, डर, उदारता) को कैसे दर्शा सकता है?".', 'फिर पाठ से एक ऐसा क्षण चुनें जहाँ नायक का आंतरिक संघर्ष स्पष्ट हो (जैसे: वह कुछ लेना चाहता है लेकिन रोकता है)। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_005', difficulty: 'standard',
          question: 'सहायक पात्र वे किरदार होते हैं जो मुख्य पात्र के साथ कहानी में मौजूद रहते हैं.',
          hint: 'यदि फंसे हों तो मुख्य पात्र के चरित्र-चित्रण (c12_hin_a_cbse_14_004) की समीक्षा करें.',
          misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र का महत्व केवल तभी होता है जब वह मुख्य पात्र के लक्ष्य में bezpośred्त रूप से मदद.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे किरदार होते हैं जो मुख्य पात्र के साथ कहानी में मौजूद रहते हैं, उनके',
                  options: ['सहायक पात्र वे किरदार होते हैं जो मुख्य पात्र के साथ कहानी में मौजूद रहते हैं, उनके', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि फंसे हों तो मुख्य पात्र के चरित्र-चित्रण (c12_hin_a_cbse_14_004) की समीक्षा करें — वहां मुख्य.',
                  misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र का महत्व केवल तभी होता है जब वह मुख्य पात्र के लक्ष्य में bezpośred्त रूप से मदद करता है (जैसे हथियार.' }
          ],
            remediations: { 'bezpo-red': { steps: ['छात्र को बताइए कि कहानी को केवल एक \'मिशन\' नहीं, बल्कि एक \'मानव अनुभव\' मानिए। फिर किसी znan कहानी (जैसे \'गोदान\') से एक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_006', difficulty: 'standard',
          question: '"मुख्य विषय" (Central Theme) वह **केंद्रीय विचार या संदेश** है जो पूरी रचना में.',
          hint: 'यदि अटके तो **कथानक नोड (c12_hin_a_cbse_14_002)** पर वापस जाएँ और घटनाक्रम का.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "मुख्य विषय" = "कहानी का सारांश" या "नैतिक शिक्षा (मोरल)"। **वास्तविकता:** विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"मुख्य विषय" (Central Theme) वह **केंद्रीय विचार या संदेश** है जो पूरी रचना में बार-बार',
                  options: ['"मुख्य विषय" (Central Theme) वह **केंद्रीय विचार या संदेश** है जो पूरी रचना में बार-बार', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि अटके तो **कथानक नोड (c12_hin_a_cbse_14_002)** पर वापस जाएँ और घटनाक्रम का **फ्लोचार्ट** बनाएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "मुख्य विषय" = "कहानी का सारांश" या "नैतिक शिक्षा (मोरल)"। **वास्तविकता:** विषय **सार्वभौमिक मानवीय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के **तीन प्रसंग** चुनो जहाँ पात्र **अकेले असफल** हुए और **साथ सफल** हुए।" 2.', 'उनसे प्रत्येक प्रसंग का **एक वाक्य में निचोड़** लिखवाएँ — "अकेला शेर हारा", "पहचान अकेला भटका", "चार हाथ अकेला थका"। 3.', 'अब पूछें: "इन तीनों वाक्यों में **क्या समान है**?" — उत्तर मिलेगा: "अकेलापन = असफलता, साथ = सफलता"। 4.', 'इसी समानता को **सार्वभौमिक वाक्य** में बदलवाएँ — यही मुख्य विषय है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
