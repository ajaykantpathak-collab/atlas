import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch06_p1: SimDef = {
    id: 'v3_c12_hin_a_ch06_p1',
    title: 'तुलसीदास · Part 1/3',
    subtitle: 'A Muslim poet heard one verse — and walked to Braj',
    classLevel: 12, subject: 'hin_a', topic: 'तुलसीदास · Part 1/3',
    chapters: ['c12_hin_a_ch06'],
    nodeIds: ['c12_hin_a_cbse_06_001', 'c12_hin_a_cbse_06_002', 'c12_hin_a_cbse_06_003', 'c12_hin_a_cbse_06_004', 'c12_hin_a_cbse_06_005', 'c12_hin_a_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Bhakti-tradition scholar', intro: 'He was born into one faith and sang himself into another\'s heart — the Bhakti movement\'s boldest proof.', goal: 'Situate Raskhan in syncretic Bhakti and distinguish virah from vatsalya across the chapter\'s texts.' },
    discovery: {
        question: 'A 16th-century Muslim leaves court life for Vrindavan and writes Krishna-bhakti in Braj Bhasha. Why does Raskhan matter beyond his poems?',
        options: ['He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper', 'He converted religions', 'His poetry is prettier than Surdas\'s', 'Courts were boring'],
        answer: 'He embodies Bhakti\'s syncretic proof — devotion crossing religious borders, lived not imitated; spiritual love answerable to no gatekeeper',
        hook: 'One chapter holds two flavours of prem: Radha\'s virah — love through separation — and Yashoda\'s vatsalya — a mother\'s tenderness. Reading both as just \'love\' flattens Bhakti\'s emotional precision; each is a different road to the divine.',
    },
    teaching: [
        { title: 'तुलसीदास — कवि परिचय और पृष्ठभूमि', text: 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर भक्ति आंदोलन को जनमानस तक पहुँचाया।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter Braj through an outsider who became its own: trace Raskhan\'s turn from worldly life to Krishna, then weigh longing against maternal love as two bhakti grammars.',
        labels: ['तुलसीदास — कवि परिचय', 'तुलसीदास — पद्यांश-वार भावार्थ', 'तुलसीदास — काव्य-संरचना और', 'तुलसीदास — केंद्रीय भाव', 'तुलसीदास — छंद और', 'तुलसीदास — साहित्यिक युक्तियाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_006', title: 'तुलसीदास — साहित्यिक युक्तियाँ: अलंकार',
          caseStudy: { intro: 'You open the Tulsidas pada and your eye catches a repetition — "राम राम राम" — and you think, "That\'s just emphasis." But wait: in the very next line, "सीय.',
            decisions: [{ prompt: 'तुलसीदास के पद्यों में \'अनुप्रास अलंकार\' की पहचान करने का सबसे सीधा नियम क्या है? उदाहरण सहित बताइए।', options: [
                { text: '**Correct answer**: अनुप्रास अलंकार तब होता है जब एक ही वर्ण (व्यंजन या स्वर) की आवृत्ति', outcome: '**Correct answer**: अनुप्रास अलंकार तब होता है जब एक ही वर्ण (व्यंजन या स्वर) की आवृत्ति बार-बार.' },
                { text: 'कनक कनक ते सौ गुनी', outcome: 'Not quite — **Exact error**: Students memorize alankar *definitions* (e.g., "उपमा में \'जैसे/वैसे\' होता है") and.', reveals: 'exact-error-students-memorize-alankar' },
                { text: 'word repetition', outcome: 'Not quite — **Exact error**: Students memorize alankar *definitions* (e.g., "उपमा में \'जैसे/वैसे\' होता है") and.', reveals: 'exact-error-students-memorize-alankar' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student society is profiling a beloved classical-music teacher who converted faiths midlife and then devoted himself to Krishna-bhakti poetry. A committee member wants his early Persian-Arabic training cut from the bio: \'it muddies the devotional image.\'',
            decisions: [{ prompt: 'How does the structure of the Raskhan sketch answer that edit?', options: [
                { text: 'Keep it exactly where the sketch keeps it — the biography deliberately establishes his Islamic scholarly background before the Gita Govinda turning point, so the devotion reads as a boundary crossed, not a brand polished; cutting the \'before\' guts the \'after\'.', outcome: 'The chapter shows those details are thematic scaffolding, not trivia: the juxtaposition is what proves divine love transcends religious identity — remove the contrast and Raskhan becomes a generic saint.' },
                { text: 'Cut it — the committee is right that a devotional profile should foreground only the devotional life.', outcome: 'That inverts the sketch\'s design: the earlier identity is what makes the transformation legible as transformation; without it, there\'s no crossing, only a career.', reveals: 'background-muddies-message' },
                { text: 'Keep the training but move it to a footnote so it doesn\'t interrupt the devotional arc.', outcome: 'Placement is the argument — the sketch sequences background before the turning point so readers feel the leap; demoting it to a footnote keeps the fact but kills the contrast that gives it meaning.', reveals: 'order-doesnt-matter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read Bhakti as lived synthesis — and separate virah from vatsalya like the tradition itself does.',
            decisions: [{ prompt: 'What comes next? तुलसीदास · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — तुलसीदास · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_001', difficulty: 'standard',
          question: 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की.',
          hint: 'भक्ति आंदोलन के सामाजिक लक्ष्यों की समीक्षा करें—विशेषकर भाषा और पहुँच के मुद्दे।',
          misconception: 'छात्र अक्सर मानते हैं कि तुलसीदास केवल एक धार्मिक कवि थे और उनका कार्य केवल राम भक्ति तक सीमित था। यह गलत है क्योंकि.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर',
                  options: ['तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है', 'केंद्रीय भाव वह मुख्य भावना है जो कविता के समग्र अनुभव को एकत्रित करती है, जबकि रस वह'],
                  hint: 'भक्ति आंदोलन के सामाजिक लक्ष्यों की समीक्षा करें—विशेषकर भाषा और पहुँच के मुद्दे।',
                  misconception: 'छात्र अक्सर मानते हैं कि तुलसीदास केवल एक धार्मिक कवि थे और उनका कार्य केवल राम भक्ति तक सीमित था। यह गलत है क्योंकि उन्होंने अवधी भाषा का.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछें कि तुलसीदास ने क्यों संस्कृत के बजाय अवधी चुनी, फिर चर्चा करें कि भाषा का चयन किस सामाजिक संदेश को देता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_002', difficulty: 'standard',
          question: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर.',
          hint: 'यदि छात्र भावार्थ निकालते समय केवल शब्दों के अर्थ जोड़कर रुक जाता है, तो उसे कक्षा 11 के.',
          misconception: 'छात्र अक्सर यह मान लेते हैं कि पद्यांश का भावार्थ निकालने के लिए बस प्रत्येक पंक्ति के शब्दकोश अर्थ को जोड़ देना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों',
                  options: ['पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है', 'केंद्रीय भाव वह मुख्य भावना है जो कविता के समग्र अनुभव को एकत्रित करती है, जबकि रस वह'],
                  hint: 'यदि छात्र भावार्थ निकालते समय केवल शब्दों के अर्थ जोड़कर रुक जाता है, तो उसे कक्षा 11 के साहित्यिक.',
                  misconception: 'छात्र अक्सर यह मान लेते हैं कि पद्यांश का भावार्थ निकालने के लिए बस प्रत्येक पंक्ति के शब्दकोश अर्थ को जोड़ देना पर्याप्त है, जैसे कि "जहाँ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक ही पंक्ति के दो अलग-अलग अर्थ कैसे हो सकते हैं: उदाहरण के लिए, "जहाँ मृगमरीचिक-а síरा" को पहले.', 'जब छात्र कहेंगे कि नहीं (मृगमरीचिक幻觉 है), तो समझाइए कि यहाँ शब्द प्रतीक के रूप में काम कर रहे हैं—मृगमरीचिक幻觉 जैसा झूठा.', 'क्या वह कुछ और कहना चाहता है?" इससे छात्र को समझ में आएगा कि भावार्थ निकालने में शब्दकोश अर्थ ही अंतिम उत्तर नहीं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_003', difficulty: 'standard',
          question: 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है — स्टैंजा की संख्या.',
          hint: 'यदि तुकाबंदी पहचान में फँस गए हैं, तो c12_hin_a_cbse_06_002 में भावार्थ विश्लेषण पर फिर.',
          misconception: 'छात्र अक्सर यह मानते हैं कि यदि एक पद में तुकाबंदी योजना स्थिर नहीं है, तो यह खराब कविता है या तुलसीदास ने छंद नियमों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है',
                  options: ['काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'केंद्रीय भाव वह मुख्य भावना है जो कविता के समग्र अनुभव को एकत्रित करती है, जबकि रस वह'],
                  hint: 'यदि तुकाबंदी पहचान में फँस गए हैं, तो c12_hin_a_cbse_06_002 में भावार्थ विश्लेषण पर फिर से विचार.',
                  misconception: 'छात्र अक्सर यह मानते हैं कि यदि एक पद में तुकाबंदी योजना स्थिर नहीं है, तो यह खराब कविता है या तुलसीदास ने छंद नियमों का पालन नहीं किया। यह.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक विशिष्ट पद (जैसे रामचरितमानस से एक दुखद क्षण) दिखाइए जहाँ तुकाबंदी बदलती है। उनसे पहले स्थिर तुकाबंदी वाले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_004', difficulty: 'standard',
          question: 'केंद्रीय भाव वह मुख्य भावना है जो कविता के समग्र अनुभव को एकत्रित करती है, जबकि.',
          hint: 'यदि छात्र केंद्रीय भाव नहीं पहचान पा रहा है, तो उसे c12_hin_a_cbse_06_002 (पद्यांश-वार.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि कविता में कोई दुखद घटना वर्णित है (जैसे सीता का वनवास), तो उसका रस necessarily करुण रस.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'केंद्रीय भाव वह मुख्य भावना है जो कविता के समग्र अनुभव को एकत्रित करती है, जबकि रस वह',
                  options: ['केंद्रीय भाव वह मुख्य भावना है जो कविता के समग्र अनुभव को एकत्रित करती है, जबकि रस वह', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है'],
                  hint: 'यदि छात्र केंद्रीय भाव नहीं पहचान पा रहा है, तो उसे c12_hin_a_cbse_06_002 (पद्यांश-वार भावार्थ) में.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि कविता में कोई दुखद घटना वर्णित है (जैसे सीता का वनवास), तो उसका रस necessarily करुण रस होगा — जैसे दुख = करुण।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक तुलसीदास पद दें जिसमें स्पष्ट दुखद घटना हो (जैसे जटाट्यू धारी राम का वनवास), और पूछें: "इस घटना को पढ़कर.', 'क्या यह क्रोध लाता है, या शांति?" फिर उसके उत्तर के आधार पर बताएँ कि रस घटना के परिणामस्वरूप मन में आने वाली भावना है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_005', difficulty: 'standard',
          question: 'छंद कविता में अक्षरों की मात्रा (गuru-लघु) के predetermined पैटर्न का व्यवस्थित.',
          hint: 'यदि छात्र मात्रा गणना में फंस रहे हैं, तो उन्हें c11_hin_a_cbse_06_011 (पद्य में.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि दो पंक्तियों का अंताक्षरी समान है (जैसे -आ, -ई), तो वे एक ही छंद में हैं। यह गलती इसलिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'छंद कविता में अक्षरों की मात्रा (गuru-लघु) के predetermined पैटर्न का व्यवस्थित क्रम है,',
                  options: ['छंद कविता में अक्षरों की मात्रा (गuru-लघु) के predetermined पैटर्न का व्यवस्थित क्रम है,', 'तुलसीदास (1532-1623) अवध के संत-कवि थे जिन्होंने अवधी भाषा में \'रामचरितमानस\' की रचना कर', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (स्टांजा) को पढ़कर उसके शब्दों', 'काव्य-संरचना पद्य के समग्र फ्रेमवर्क को संदर्भित करती है'],
                  hint: 'यदि छात्र मात्रा गणना में फंस रहे हैं, तो उन्हें c11_hin_a_cbse_06_011 (पद्य में भाषा-प्रयोग).',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि दो पंक्तियों का अंताक्षरी समान है (जैसे -आ, -ई), तो वे एक ही छंद में हैं। यह गलती इसलिए होती है क्योंकि वे छंद.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को एक पंक्ति दीजिए और कहिए: \'इस पंक्ति को आवाज़ में पढ़िए और हर बार जब आपका बल पड़ता है, तो एक ताली बजाइए। अब इन.', 'यदि नहीं, तो किस पैटर्न में बदलाव आ रहा है?\' इस शारीरिक क्रिया के माध्यम से वे ध्वनि समानता (अंताक्षरी) से मात्रा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_006', difficulty: 'standard',
          question: 'अलंकार (Alankar) in Tulsidas\'s poetry refers to the deliberate use.',
          hint: 'If stuck on *identification*, revisit Class 11 alankar nodes (c11_hin_a_cbse_13_006 etc.).',
          misconception: '**Exact error**: Students memorize alankar *definitions* (e.g., "उपमा में \'जैसे/वैसे\' होता है") and hunt for *keywords*.',
          parts: [
                { id: 'a', prompt: 'दिए गए पदांश में अलंकार पहचानिए और बताइए कि वह पद के केंद्रीय भाव को कैसे तीव्र करता है: "सीय राम मय सब जग जानी / करहु प्रणाम जोरि जुग पानी"', answer: '**Correct answer**: **यमक अलंकार**',
                  options: ['**Correct answer**: **यमक अलंकार**', 'अनुप्रास'],
                  hint: 'If stuck on *identification*, revisit Class 11 alankar nodes (c11_hin_a_cbse_13_006 etc.) and.',
                  misconception: '**Exact error**: Students memorize alankar *definitions* (e.g., "उपमा में \'जैसे/वैसे\' होता है") and hunt for *keywords* in the text.' },
                { id: 'b', prompt: 'तुलसीदास एक ही भाव को व्यक्त करने के लिए दो अलग-अलग अलंकारों — उपमा और रूपक — का प्रयोग कब और क्यों करते हैं? एक पद से उदाहरण देकर विश्लेषण कीजिए।', answer: '**Correct answer**: - **उपमा** (explicit comparison: "जैसे...वैसे")',
                  options: ['**Correct answer**: - **उपमा** (explicit comparison: "जैसे...वैसे")', 'comparison figures'],
                  hint: 'If stuck on *identification*, revisit Class 11 alankar nodes (c11_hin_a_cbse_13_006 etc.) and.',
                  misconception: '**Exact error**: Students memorize alankar *definitions* (e.g., "उपमा में \'जैसे/वैसे\' होता है") and hunt for *keywords* in the text.' }
          ],
            remediations: { 'exact-error-students-memorize-alankar': { steps: ['Take ONE pada (e.g., "सीय राम मय सब जग जानी").', '**Read it 3 times**: (a) literal meaning, (b) theological meaning (what does Tulsidas want the bhakta to *realize*?).', '**Ask**: "If I delete this word/phrase, does the *realization* weaken?" If yes → that\'s your alankar\'s *function*.', '**Revisit Class 11 nodes**: `c11_hin_a_cbse_13_006` (जाग तुझको दूर जाना — अलंकार) and `c11_hin_a_cbse_14_006` (बादल को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_06_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Exact error**: Students memorize alankar *definitions* (e.g., "उपमा में \'जैसे/वैसे\' होता है") and hunt for *keywords*.',
          parts: [
                { id: 'a', prompt: '"तुलसीदास के अलंकार केवल शोभा बढ़ाते हैं, भाव नहीं गढ़ते।" इस कथन का मूल्यांकन कीजिए। प्रमाण सहित खंडन या समर्थन करें।', answer: '**Correct evaluation**: **खंडन**',
                  options: ['**Correct evaluation**: **खंडन**', 'beauty', 'instrument'],
                  hint: 'If stuck on *identification*, revisit Class 11 alankar nodes (c11_hin_a_cbse_13_006 etc.) and.',
                  misconception: '**Exact error**: Students memorize alankar *definitions* (e.g., "उपमा में \'जैसे/वैसे\' होता है") and hunt for *keywords* in the text.' }
          ],
            remediations: { 'exact-error-students-memorize-alankar': { steps: ['Take ONE pada (e.g., "सीय राम मय सब जग जानी").', '**Read it 3 times**: (a) literal meaning, (b) theological meaning (what does Tulsidas want the bhakta to *realize*?).', '**Ask**: "If I delete this word/phrase, does the *realization* weaken?" If yes → that\'s your alankar\'s *function*.', '**Revisit Class 11 nodes**: `c11_hin_a_cbse_13_006` (जाग तुझको दूर जाना — अलंकार) and `c11_hin_a_cbse_14_006` (बादल को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
