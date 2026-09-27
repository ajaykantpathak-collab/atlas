import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch14_p2: SimDef = {
    id: 'v3_c12_hin_a_ch14_p2',
    title: 'शेर, पहचान, चार हाथ, साझा · Part 2/3',
    subtitle: 'A lid on the well, a gag on the people',
    classLevel: 12, subject: 'hin_a', topic: 'शेर, पहचान, चार हाथ, साझा · Part 2/3',
    chapters: ['c12_hin_a_ch14'],
    nodeIds: ['c12_hin_a_cbse_14_007', 'c12_hin_a_cbse_14_008', 'c12_hin_a_cbse_14_009', 'c12_hin_a_cbse_14_010', 'c12_hin_a_cbse_14_011', 'c12_hin_a_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Satire reader', intro: 'Four short stories from a journalist\'s pen — each one a different machine for how power eats the weak.', goal: 'Read the four stories as variations on power and resistance in Asghar Wajahat\'s satirical voice.' },
    discovery: {
        question: 'A kingdom covers a well\'s mouth so no voice escapes; a magician rules by fear; a fakir trades men\'s limbs; a servant outwits his master — four stories, one theme. Which?',
        options: ['Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose', 'Magic and fantasy', 'Village comedy', 'Random variety'],
        answer: 'Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose',
        hook: 'The journalist\'s craft is the giveaway — simple spoken language carrying sharp satire; even the glossary is a code: \'myaan\' (scabbard) hints at hidden violence, the fakir\'s words flag hypocrisy. The well\'s lid is the citizenry\'s gagged voice.',
    },
    teaching: [
        { title: 'शेर, पहचान, चार हाथ, साझा — गौण विषय', text: 'गौण विषय वह अंतर्निहित अवधारणा या संदेश है जो मुख्य विषय का समर्थन करता है, लेकिन उसके स्वतंत्र रूप से कम प्रमुख होता है और कहानी, पात्रों, या घटनाओं के माध्यम से सूक्ष्म रूप से व्यक्त होता है।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the satire four ways: unmask the well\'s lid as silenced dissent, split state-scale from household-scale power, and read the vocabulary list as a map of the stories\' politics.',
        labels: ['शेर, पहचान, चार हाथ,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your hostel reports a wobbly fan. Weeks later it\'s a \'case\' — the warden consulted the electrician, who consulted the engineer, who proposed a structural audit, who now wants a committee — while the fan still wobbles.',
            decisions: [{ prompt: 'Which of Asghar Wajahat\'s story structures is playing out?', options: [
                { text: '\'चार हाथ\' — the consultative chain where each expert inflates a simple problem into an elaborate procedure; the satire is that consultation replaces repair, so name the chain and fix the fan.', outcome: 'The story\'s bottom-up repetition exists to show bureaucracy compounding — every added opinion multiplies absurdity while the object stays broken; recognising the structure is the way out of it.' },
                { text: '\'शेर\' — the mystery story where appearances deceive, so the fan probably isn\'t the real issue.', outcome: 'That misapplies the chapter\'s suspense structure to a satire problem: nothing here is hidden or supernatural — the failure is fully visible, which is exactly what the consultative-chain story mocks.', reveals: 'every-mess-is-mystery' },
                { text: 'Wait it out — each consultation is a real step, so the process is working as designed.', outcome: 'The story\'s chain is \'working\' only in the sense that it keeps moving; the diagnosis it offers is that motion through offices is a substitute for — not a route to — the repair.', reveals: 'process-equals-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a satirist\'s quartet as one argument about power — and spot how a lid on a well is a lid on a people.',
            decisions: [{ prompt: 'What comes next? शेर, पहचान, चार हाथ, साझा · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — शेर, पहचान, चार हाथ, साझा · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_007', difficulty: 'standard',
          question: 'गौण विषय वह अंतर्निहित अवधारणा या संदेश है जो मुख्य विषय का समर्थन करता है.',
          hint: 'यदि मुख्य विषय पहचानने में कठिनाई हो, तो c12_hin_a_cbse_14_006 (मुख्य विषय और संदेश) को.',
          misconception: 'छात्र अक्सर गौण विषय को मुख्य विषय का केवल एक उदाहरण या दोहराव मानते हैं, जैसे यदि मुख्य विषय पहचान है तो कोई भी पात्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय वह अंतर्निहित अवधारणा या संदेश है जो मुख्य विषय का समर्थन करता है, लेकिन उसके',
                  options: ['गौण विषय वह अंतर्निहित अवधारणा या संदेश है जो मुख्य विषय का समर्थन करता है, लेकिन उसके', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि मुख्य विषय पहचानने में कठिनाई हो, तो c12_hin_a_cbse_14_006 (मुख्य विषय और संदेश) को दोबारा.',
                  misconception: 'छात्र अक्सर गौण विषय को मुख्य विषय का केवल एक उदाहरण या दोहराव मानते हैं, जैसे यदि मुख्य विषय पहचान है तो कोई भी पात्र द्वारा अपनी भाषा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि मुख्य विषय एक व्यापक छाता है (जैसे "पहचान का संकट") और गौण विषय उसके तहत आने वाली विशिष्ट शाखाएँ हैं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_008', difficulty: 'standard',
          question: 'बिंब एक concrete, sensory अनुभव (देखा, सुना, महसूस किया गया) है जो कविता में.',
          hint: 'यदि फंसे तो कक्षा 11 के c11_hin_a_cbse_01_008 नोड पर वापस जाकर बिंब और रूपक की आधारभूत.',
          misconception: 'छात्र अक्सर सोचते हैं कि यदि कोई शब्द कविता में भावनात्मक है (जैसे "सिंह", "अग्नि"), तो वह स्वतः रूपक है। वे भूल जाते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'बिंब एक concrete, sensory अनुभव (देखा, सुना, महसूस किया गया) है जो कविता में उपयोग होता',
                  options: ['बिंब एक concrete, sensory अनुभव (देखा, सुना, महसूस किया गया) है जो कविता में उपयोग होता', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि फंसे तो कक्षा 11 के c11_hin_a_cbse_01_008 नोड पर वापस जाकर बिंब और रूपक की आधारभूत परिभाषाओं की.',
                  misconception: 'छात्र अक्सर सोचते हैं कि यदि कोई शब्द कविता में भावनात्मक है (जैसे "सिंह", "अग्नि"), तो वह स्वतः रूपक है। वे भूल जाते हैं कि रूपक तभी होता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछो: "क्या कवि यहाँ वास्तविक सिंह की बात कर रहा है या किसी व्यक्ति के लिए सिंह शब्द का उपयोग कर रहा है?" फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_009', difficulty: 'standard',
          question: 'विरोधाभास वह साहित्यिक युक्ति है जिसमें दो विपरीत विचार, स्थितियों या पात्रों.',
          hint: 'यदि छात्र इन युक्तियों के बीच अंतर नहीं कर पा रहे हैं, तो उन्हें कक्षा 11 के पाठ 1.',
          misconception: 'छात्र अक्सर विरोधाभास और प्रतीक को एक ही चीज़ मान लेते हैं, सोचते हैं कि यदि कोई पात्र दो विपरीत बातें कह रहा है तो वह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'विरोधाभास वह साहित्यिक युक्ति है जिसमें दो विपरीत विचार, स्थितियों या पात्रों को एक साथ',
                  options: ['विरोधाभास वह साहित्यिक युक्ति है जिसमें दो विपरीत विचार, स्थितियों या पात्रों को एक साथ', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि छात्र इन युक्तियों के बीच अंतर नहीं कर पा रहे हैं, तो उन्हें कक्षा 11 के पाठ 1.',
                  misconception: 'छात्र अक्सर विरोधाभास और प्रतीक को एक ही चीज़ मान लेते हैं, सोचते हैं कि यदि कोई पात्र दो विपरीत बातें कह रहा है तो वह वस्तु अपने आप प्रतीक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले स्पष्ट कीजिए कि विरोधाभास हमेशा दो विपरीत *विचारों* या *स्थितियों* के संयोजन पर निर्भर करता है (जैसे.', 'जब वे राजा (स्थिति) और जीने लायक नहीं (मूल्य) की पहचान कर लें, तो बताइए कि यह विरोधाभास है। फिर एक नया वाक्य दीजिए.', 'जब वे बोझ या जिम्मेदारी का उत्तर दें, तो बताइए कि यह प्रतीक है—क्योंकि वस्तु (मुकुट) अपने आप से परे अर्थ ले जा रही है।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_010', difficulty: 'standard',
          question: 'पदावली: मुख्य शब्द वह प्रक्रिया है जिसमें पाठ से उन शब्दों का चयन किया जाता है.',
          hint: 'यदि शब्द चयन में भ्रम हो तो कक्षा 11 के किसी भी पाठ के पदावली: मुख्य शब्द नोड (जैसे.',
          misconception: 'छात्र अक्सर मानते हैं कि मुख्य शब्द वे होते हैं जो या तो शीर्षक में आए हों, या जो कठिन या अज्ञात हों (जैसे "साझा" या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली: मुख्य शब्द वह प्रक्रिया है जिसमें पाठ से उन शब्दों का चयन किया जाता है जो विषय,',
                  options: ['पदावली: मुख्य शब्द वह प्रक्रिया है जिसमें पाठ से उन शब्दों का चयन किया जाता है जो विषय,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि शब्द चयन में भ्रम हो तो कक्षा 11 के किसी भी पाठ के पदावली: मुख्य शब्द नोड (जैसे.',
                  misconception: 'छात्र अक्सर मानते हैं कि मुख्य शब्द वे होते हैं जो या तो शीर्षक में आए हों, या जो कठिन या अज्ञात हों (जैसे "साझा" या "चार हाथ"), क्योंकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र कठिन या असामान्य शब्दों को मुख्य शब्द मान रहा है, तो उसे इस अभ्यास के लिए कहिए: पाठ को दो बार पढ़िए—पहली बार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_011', difficulty: 'standard',
          question: 'व्याकरण: पाठ में भाषा-प्रयोग वह विश्लेषणात्मक प्रक्रिया है जिसमें पाठ में उपयोग.',
          hint: 'यदि छात्र क्रिया के रूपों (जैसे गया vs गया था) के अंतर को समझने में कठिनाई महसूस कर रहा.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि एक वाक्य का अर्थ स्पष्ट है, तो वह व्याकरणिक रूप से सही होना चाहिए — जैसे "मैं स्कूल गया".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'व्याकरण: पाठ में भाषा-प्रयोग वह विश्लेषणात्मक प्रक्रिया है जिसमें पाठ में उपयोग किए गए',
                  options: ['व्याकरण: पाठ में भाषा-प्रयोग वह विश्लेषणात्मक प्रक्रिया है जिसमें पाठ में उपयोग किए गए', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि छात्र क्रिया के रूपों (जैसे गया vs गया था) के अंतर को समझने में कठिनाई महसूस कर रहा है, तो उसे.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि एक वाक्य का अर्थ स्पष्ट है, तो वह व्याकरणिक रूप से सही होना चाहिए — जैसे "मैं स्कूल गया" को "मैं स्कूल गया था".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो समान वाक्य दें: "वह खाया" और "वह खा चुका था"। पहले उनसे पूछें कि प्रत्येक वाक्य में कौन सी क्रिया हुई और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनका एक स्पष्ट सही या गलत उत्तर होता है (जैसे.',
          hint: 'यदि छात्र भ्रमित हो तो वर्ग 11 के किसी भी पाठ (जैसे c11_hin_a_cbse_01_012) में वस्तुनिष्ठ.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि वे वस्तुनिष्ठ प्रश्न का उत्तर सही दे दिया (जैसे लेखक का नाम याद है), तो वे आशय-सूचक प्रश्न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे होते हैं जिनका एक स्पष्ट सही या गलत उत्तर होता है (जैसे बहुविकल्पीय,',
                  options: ['वस्तुनिष्ठ प्रश्न वे होते हैं जिनका एक स्पष्ट सही या गलत उत्तर होता है (जैसे बहुविकल्पीय,', 'पृष्ठभूमि और रचनाकार परिचय का अर्थ है लेखक के जीवन, सामाजिक-राजनीतिक परिस्थितियों और', 'कथानक कहानी की घटनाओं का तार्किक क्रम है जिसमें संघर्ष, चोटी और समापन शामिल होता है;', 'पाठ्य-परिवेश और वातावरण वह साम ऐतिहासिक, सांस्कृतिक और वैयक्तिक पृष्ठभूमि है जिसमें कोई'],
                  hint: 'यदि छात्र भ्रमित हो तो वर्ग 11 के किसी भी पाठ (जैसे c11_hin_a_cbse_01_012) में वस्तुनिष्ठ और.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि वे वस्तुनिष्ठ प्रश्न का उत्तर सही दे दिया (जैसे लेखक का नाम याद है), तो वे आशय-सूचक प्रश्न भी आसानी से हल कर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले बताएं कि वस्तुनिष्ठ = fact (जैसे "लेखक कौन है?") और आशय-सूचक = interpretation (जैसे "इसका क्या मतलब.', 'इससे वे अंतर महसूस करेंगे। फिर पाठ से एक línea उठाएँ (जैसे "हम साझा करके आगे बढ़ते हैं") और पूछें: fact क्या है?', '(कि \'साझा\' शब्द आया) और आशय क्या है?', '(कि सहयोग से प्रगति होती है)। इस दो-स्तरीय अभ्यास को दोहराने से वे भ्रम दूर कर पाएंगे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
