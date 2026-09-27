import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch02_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch02_p2',
    title: 'पतंग · Part 2/3',
    subtitle: 'A poem that mourns without ever complaining',
    classLevel: 12, subject: 'hin_ar', topic: 'पतंग · Part 2/3',
    chapters: ['c12_hin_ar_ch02'],
    nodeIds: ['c12_hin_ar_cbse_02_007', 'c12_hin_ar_cbse_02_008', 'c12_hin_ar_cbse_02_009', 'c12_hin_ar_cbse_02_010', 'c12_hin_ar_cbse_02_011', 'c12_hin_ar_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Contemporary Hindi poetry reader', intro: 'A book-length poem built to hold a vanishing world — one precise image at a time.', goal: 'Read Patang inside Alok Dhanva\'s long poem — science-trained observation as elegy for a disappearing rural world.' },
    discovery: {
        question: 'A poet watches the village world of his childhood dissolve — yet never once writes in complaint. How does a poem protest without protesting?',
        options: ['Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique', 'By staying silent', 'By blaming politicians', 'It can\'t — complaint is required'],
        answer: 'Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique',
        hook: '\'No tone of complaint\' doesn\'t mean no criticism — the poet is also a science communicator, so the poem works like field notes: concrete, sensory, exact. It\'s one movement of a single book-length poem, an architecture of memory against erasure.',
    },
    teaching: [
        { title: 'पतंग — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '**बिंब (Imagery)** काव्य में प्रयुक्त वह शब्द-योजना है जो पाठक की इंद्रियों (दृश्य, श्रवण, घ्राण, स्पर्श, स्वाद) को उद्दीप्त कर मूर्त चित्र उपस्थित करती है; **प्रतीक (Symbol)** वह मूर्त वस्तु.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the long poem as preservation work: follow childhood idyll into encroaching modernity, weigh what the three-part textbook split gains and costs, and hear critique inside pure description.',
        labels: ['पतंग — साहित्यिक युक्तियाँ', 'पतंग — मुख्य भाव', 'पतंग — गौण भाव', 'पतंग — पदावली: कठिन', 'पतंग — व्याकरण: पद्य', 'पतंग — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Curating a farewell exhibit, a teammate dismisses a photo essay of childhood monsoons — paper boats, wet gullies — as \'cute nostalgia with no real content.\' You think it\'s the strongest piece submitted.',
            decisions: [{ prompt: 'How does Kunwar Narain\'s poem structure defend the piece?', options: [
                { text: 'Point to the architecture — the poem moves from a concrete childhood scene to an adult meditation, showing memory isn\'t a discarded past but a layer still alive under the present; the essay\'s small wet moments are the vessel for a universal claim.', outcome: 'The poem proves that juxtaposing then and now is how memory actually works — the \'content\' is the endurance of childhood, not the boats themselves.' },
                { text: 'Concede — childhood images are sentimental raw material until they\'re processed into a serious argument.', outcome: 'That inverts the poem\'s method: the concrete scene is what earns the abstract reflection; stripping the sensory ground leaves the \'argument\' with nothing to stand on.', reveals: 'nostalgia-is-not-content' },
                { text: 'Defend it only as emotion — \'it feels true\' is enough without needing structure talk.', outcome: 'Feeling without structure undersells the piece: the chapter\'s point is that the arrangement — present tense scene widening into reflection — is what converts one person\'s memory into everyone\'s.', reveals: 'emotion-needs-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear a poem argue without ever accusing — the nayi kavita way of making images carry the whole weight.',
            decisions: [{ prompt: 'What comes next? पतंग · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पतंग · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_007', difficulty: 'standard',
          question: '**बिंब (Imagery)** काव्य में प्रयुक्त वह शब्द-योजना है जो पाठक की इंद्रियों.',
          hint: 'यदि अटके तो c11_hin_a_cbse_01_008 (बिंब-रूपक) और c11_hin_a_cbse_01_009 (प्रतीक) के उदाहरण.',
          misconception: 'छात्र अक्सर **बिंब को अलंकार (जैसे रूपक/उपमा) समझ बैठते हैं** — उदाहरण: "पतंग आकाश की चिड़िया है" को बिंब कहना, जबकि यह.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** काव्य में प्रयुक्त वह शब्द-योजना है जो पाठक की इंद्रियों (दृश्य,',
                  options: ['**बिंब (Imagery)** काव्य में प्रयुक्त वह शब्द-योजना है जो पाठक की इंद्रियों (दृश्य,', '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,'],
                  hint: 'यदि अटके तो c11_hin_a_cbse_01_008 (बिंब-रूपक) और c11_hin_a_cbse_01_009 (प्रतीक) के उदाहरण दोहराएँ.',
                  misconception: 'छात्र अक्सर **बिंब को अलंकार (जैसे रूपक/उपमा) समझ बैठते हैं** — उदाहरण: "पतंग आकाश की चिड़िया है" को बिंब कहना, जबकि यह **रूपक** है। बिंब.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **c11_hin_a_cbse_01_008** (बिंब और रूपक) व **c11_hin_a_cbse_01_009** (विरोधाभास और प्रतीक) दोबारा पढ़वाएँ.', 'फिर **c12_hin_ar_cbse_02_006** (अलंकार) से तुलना करवाएँ: "रूपक" और "बिंब" के 3-3 उदाहरण लिखवाएँ, अंतर स्पष्ट करवाएँ। 3.', 'अंत में **पुनः निदान**: कविता \'पतंग\' के किसी पद से 2 बिंब छाँटने को कहें और बताएँ कि वे किस प्रतीक को पुष्ट करते हैं।.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_008', difficulty: 'standard',
          question: 'किसी रचना का \'मुख्य भाव\' वह केंद्रीय विचार या संदेश होता है जिसे कवि/लेखक पूरी.',
          hint: 'यदि अटके तो c12_hin_ar_cbse_02_007 (प्रतीक और बिंब) पर लौटें — वहाँ प्रतीक-चित्रण की.',
          misconception: 'छात्र प्रायः \'मुख्य भाव\' को \'कथ्य\' (कहानी/वर्णन) समझ लेते हैं — जैसे लिख देते हैं: "कविता पतंग उड़ाने का वर्णन करती.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'किसी रचना का \'मुख्य भाव\' वह केंद्रीय विचार या संदेश होता है जिसे कवि/लेखक पूरी रचना के',
                  options: ['किसी रचना का \'मुख्य भाव\' वह केंद्रीय विचार या संदेश होता है जिसे कवि/लेखक पूरी रचना के', '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,'],
                  hint: 'यदि अटके तो c12_hin_ar_cbse_02_007 (प्रतीक और बिंब) पर लौटें — वहाँ प्रतीक-चित्रण की चरणबद्ध विधि.',
                  misconception: 'छात्र प्रायः \'मुख्य भाव\' को \'कथ्य\' (कहानी/वर्णन) समझ लेते हैं — जैसे लिख देते हैं: "कविता पतंग उड़ाने का वर्णन करती है।" जबकि मुख्य भाव है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहें — "कविता की कोई एक पंक्ति चुनो जो तुम्हें सबसे अधिक छूती है।" चरण 2: पूछें — "इस पंक्ति में कौन-सा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_009', difficulty: 'standard',
          question: 'गौण भाव (Sub-theme) कविता का वह सहायक भाव है जो मुख्य भाव को पुष्ट करता है.',
          hint: 'यदि मुख्य भाव अस्पष्ट है तो c12_hin_ar_cbse_02_008 (मुख्य भाव और संदेश) दोहराओ — विशेषकर.',
          misconception: 'छात्र समझते हैं कि **\'मुख्य विषय से हटने वाली हर बात विषयांतर है\'** — इसलिए माँ का डर, दोस्तों की हँसी, हवा का चलना सब.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण भाव (Sub-theme) कविता का वह सहायक भाव है जो मुख्य भाव को पुष्ट करता है, गहराई देता है',
                  options: ['गौण भाव (Sub-theme) कविता का वह सहायक भाव है जो मुख्य भाव को पुष्ट करता है, गहराई देता है', '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,'],
                  hint: 'यदि मुख्य भाव अस्पष्ट है तो c12_hin_ar_cbse_02_008 (मुख्य भाव और संदेश) दोहराओ — विशेषकर पद 1 और.',
                  misconception: 'छात्र समझते हैं कि **\'मुख्य विषय से हटने वाली हर बात विषयांतर है\'** — इसलिए माँ का डर, दोस्तों की हँसी, हवा का चलना सब \'विषयांतर\' लिख देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कविता के **पद 2 और पद 4** आमने-सामने रखवाओ। पूछो: "पद 2 में माँ है — क्या कवि माँ पर कविता लिख रहा है?', 'नहीं — माँ बालक की उड़ान को सहारा दे रही है → **गौण भाव**।" 2.', 'फिर पद 4: "यहाँ कवि पतंग छोड़कर \'डोर-जीवन\' पर चला गया — क्या यह उड़ान का हिस्सा है?', 'नहीं — यह नया विमर्श है → **विषयांतर**।" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_010', difficulty: 'standard',
          question: 'पदावली के अंतर्गत कविता में प्रयुक्त क्लिष्ट शब्दों के सरल अर्थ, मुहावरों के.',
          hint: 'यदि मुहावरे का भावार्थ न सूझे, तो उसकी "मूल छवि" (origin image) ढूंढें — जैसे "ताना-बाना".',
          misconception: 'छात्र समझते हैं कि "कठिन शब्द" का अर्थ केवल शब्दकोश से अर्थ ढूंढना है, और "मुहावरे" का अर्थ केवल रटना है। वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के अंतर्गत कविता में प्रयुक्त क्लिष्ट शब्दों के सरल अर्थ, मुहावरों के भावार्थ तथा',
                  options: ['पदावली के अंतर्गत कविता में प्रयुक्त क्लिष्ट शब्दों के सरल अर्थ, मुहावरों के भावार्थ तथा', '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,'],
                  hint: 'यदि मुहावरे का भावार्थ न सूझे, तो उसकी "मूल छवि" (origin image) ढूंढें — जैसे "ताना-बाना" की मूल.',
                  misconception: 'छात्र समझते हैं कि "कठिन शब्द" का अर्थ केवल शब्दकोश से अर्थ ढूंढना है, और "मुहावरे" का अर्थ केवल रटना है। वास्तव में, बोर्ड परीक्षा में (1).' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: कविता "पतंग" को दोबारा पढ़ें और हर उस शब्द/वाक्यांश को घेरें जिसका अर्थ आप 5 सेकंड में नहीं बता सकते। चरण 2: उन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_011', difficulty: 'standard',
          question: 'पद्य में भाषा-प्रयोग का अर्थ है — कविता में प्रयुक्त शब्दों के चयन (पदावली).',
          hint: 'यदि शब्द-शैली (तत्सम/तद्भव) या अलंकार पहचानने में अटकें, तो c11_hin_a_cbse_13_011 और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'पद्य में भाषा-प्रयोग\' का अर्थ है — कविता में आए **कठिन शब्दों के अर्थ लिखना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्य में भाषा-प्रयोग का अर्थ है',
                  options: ['पद्य में भाषा-प्रयोग का अर्थ है', '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,'],
                  hint: 'यदि शब्द-शैली (तत्सम/तद्भव) या अलंकार पहचानने में अटकें, तो c11_hin_a_cbse_13_011 और.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि \'पद्य में भाषा-प्रयोग\' का अर्थ है — कविता में आए **कठिन शब्दों के अर्थ लिखना, संधि-विच्छेद करना.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनः पठन**: कविता को **तीन बार** पढ़ो — (क) केवल अर्थ के लिए, (ख) केवल ध्वनि/लय के लिए (ज़ोर से), (ग) केवल.', '**तुलना अभ्यास**: c12_hin_ar_cbse_02_005 (छंद और लय-विधान) और c12_hin_ar_cbse_02_006 (अलंकार) के नोट्स साथ रखो; एक.', '**लघु-लेखन**: किसी एक भाषिक युक्ति (जैसे अनुप्रास) को लेकर 50 शब्दों में लिखो: *"इस युक्ति के बिना कविता का प्रभाव कैसे.', '**पुनः निदान**: DIAGNOSTIC_QUESTION_4 (प्रतीक-विकास) फिर से हल करो; यदि अब भी अर्थ-व्यापार न पकड़ पाओ, तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_012', difficulty: 'standard',
          question: '**वस्तुनिष्ठ प्रश्न** वे हैं जिनका उत्तर पाठ में स्पष्टतः दिया होता है या जिसका.',
          hint: 'यदि छात्र वस्तुनिष्ठ/आशय-सूचक का भेद न कर पाए, तो c12_hin_ar_cbse_02_002 (भावार्थ) और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि आशय-सूचक प्रश्नों का उत्तर "कविता का भावार्थ" लिखकर पूरा हो जाता है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वस्तुनिष्ठ प्रश्न** वे हैं जिनका उत्तर पाठ में स्पष्टतः दिया होता है या जिसका एक',
                  options: ['**वस्तुनिष्ठ प्रश्न** वे हैं जिनका उत्तर पाठ में स्पष्टतः दिया होता है या जिसका एक', '\'पतंग\' अलोक धन्वा की एक प्रतीकात्मक कविता है जिसमें पतंग के माध्यम से **युवा पीढ़ी की', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद (स्टैंज़ा) के शाब्दिक अर्थ,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है कविता के बाहरी ढांचे (स्टैंज़ा विभाजन,'],
                  hint: 'यदि छात्र वस्तुनिष्ठ/आशय-सूचक का भेद न कर पाए, तो c12_hin_ar_cbse_02_002 (भावार्थ) और.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि आशय-सूचक प्रश्नों का उत्तर "कविता का भावार्थ" लिखकर पूरा हो जाता है। **वास्तविकता**: भावार्थ.' }
          ],
            remediations: { 'paraphrase': { steps: ['**चरण 1**: छात्र से कहें — "पहले प्रश्न को दो श्रेणियों में बाँटो: वस्तुनिष्ठ (तथ्य/एक उत्तर) vs आशय-सूचक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
