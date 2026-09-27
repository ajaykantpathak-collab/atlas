import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch28_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch28_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch28_p2',
    title: 'पतझड़ में टूटी पत्तयिाँ · Part 2/3',
    subtitle: 'यह नोड केवल \'पतझड़ में टूटी पत्तियाँ\' कहानी में निहित गौण विषयों (स्मृति, एकाकीपन.',
    classLevel: 10, subject: 'hin_sp', topic: 'पतझड़ में टूटी पत्तयिाँ · Part 2/3',
    chapters: ['c10_hin_sp_ch28'],
    nodeIds: ['c10_hin_sp_cbse_28_007', 'c10_hin_sp_cbse_28_008', 'c10_hin_sp_cbse_28_009', 'c10_hin_sp_cbse_28_010', 'c10_hin_sp_cbse_28_011', 'c10_hin_sp_cbse_28_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: 'क्या आपने कभी दादी/नानी को पुराने एल्बम देखते हुए अकेले मुस्कुराते या चुपके से आँसू पोंछते देखा है?', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पतझड़ में टूटी पत्तयिाँ — गौण विषय', text: 'गौण विषय (Sub-theme) कथा के केंद्रीय भाव (मुख्य विषय) के समानांतर चलने वाला वह सहायक भाव-पक्ष है जो मुख्य विषय को पुष्ट करता है, उसका विस्तार करता है या उसके विभिन्न आयामों को उजागर करता है; यह.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_28_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पतझड़ में टूटी पत्तयिाँ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_28_011', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['निष्कर्ष — लेखक ने अनवरत काल चुना क्योंकि पत्तियों का उड़ना.', 'दोनों का संयुक्त प्रभाव विश्लेषण करो — पत्तियों की अनंत गति.', 'दोनों क्रियाओं के रूप पहचानो — \'उड़ती रहीं\' = \'उड़ना\'.', 'वैकल्पिक रूपों से तुलना करो — यदि \'उड़ीं\' (सरल भूत) होता तो.', 'प्रत्येक की भूमिका निर्धारित करो — \'उड़ती रहीं\' प्रक्रिया.'], answer: 'दोनों क्रियाओं के रूप पहचानो — \'उड़ती रहीं\' = \'उड़ना\'. प्रत्येक की भूमिका निर्धारित करो — \'उड़ती रहीं\' प्रक्रिया. वैकल्पिक रूपों से तुलना करो — यदि \'उड़ीं\' (सरल भूत) होता तो. दोनों का संयुक्त प्रभाव विश्लेषण करो — पत्तियों की अनंत गति. निष्कर्ष — लेखक ने अनवरत काल चुना क्योंकि पत्तियों का उड़ना.' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_28_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पतझड़ में टूटी पत्तयिाँ like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पतझड़ में टूटी पत्तयिाँ · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पतझड़ में टूटी पत्तयिाँ · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) कथा के केंद्रीय भाव (मुख्य विषय) के समानांतर चलने वाला वह.',
          hint: 'यदि अटके तो c10_hin_sp_cbse_28_006 (मुख्य विषय और संदेश) दोहराएँ — मुख्य विषय की पकड़.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'गौण विषय\' का अर्थ **\'कम अंक वाला/छोड़ने योग्य विषय\'** है। वे मुख्य विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) कथा के केंद्रीय भाव (मुख्य विषय) के समानांतर चलने वाला वह सहायक',
                  options: ['गौण विषय (Sub-theme) कथा के केंद्रीय भाव (मुख्य विषय) के समानांतर चलने वाला वह सहायक', '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और'],
                  hint: 'यदि अटके तो c10_hin_sp_cbse_28_006 (मुख्य विषय और संदेश) दोहराएँ — मुख्य विषय की पकड़ ढीली होगी तो.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि \'गौण विषय\' का अर्थ **\'कम अंक वाला/छोड़ने योग्य विषय\'** है। वे मुख्य विषय (बुढ़ापा) पर 10 पंक्तियाँ.' }
          ],
            remediations: { '10': { steps: ['**पुनः पाठ पढ़ें — केवल गौण विषय की दृष्टि से**: हर पैराग्राफ के बाद पूछें — "यहाँ बुढ़ापे के अलावा और क्या चल रहा है?".', '**दो-स्तंभ तालिका बनाएँ**: बाएँ — प्रसंग/संवाद; दाएँ — उभरता गौण विषय। कम से कम 5 पंक्तियाँ भरें। 3.', '**PEEL अभ्यास**: एक गौण विषय चुनें (जैसे: एकाकीपन)। Point लिखें → Evidence (पाठ पंक्ति) दें → Explain करें (यह एकाकीपन.', '**साथी से चर्चा**: अपने लिखे उत्तर को साथी को पढ़वाएँ — क्या उन्हें गौण विषय स्पष्ट हुआ?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** काव्य/गद्य में प्रयुक्त वे शब्द-युग्म या पद हैं जो पाठक की.',
          hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_28_006 (मुख्य विषय और संदेश)** दोहराएँ — विषय स्पष्ट.',
          misconception: '**विशिष्ट भ्रांति:** छात्र **\'बिंब\' को केवल \'सुंदर दृश्य-चित्रण\' (Scenic Description)** मान लेते हैं और **\'रूपक\' को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** काव्य/गद्य में प्रयुक्त वे शब्द-युग्म या पद हैं जो पाठक की पाँचों',
                  options: ['**बिंब (Imagery)** काव्य/गद्य में प्रयुक्त वे शब्द-युग्म या पद हैं जो पाठक की पाँचों', '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और'],
                  hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_28_006 (मुख्य विषय और संदेश)** दोहराएँ — विषय स्पष्ट होते ही.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र **\'बिंब\' को केवल \'सुंदर दृश्य-चित्रण\' (Scenic Description)** मान लेते हैं और **\'रूपक\' को \'फैंसी तुलना\' (Fancy.' }
          ],
            remediations: { 'scenic-description-fancy-comparison-sensory': { steps: ['**लक्षित उपचार (Targeted Remediation):** 1.', '**इंद्रिय-मानचित्रण अभ्यास (Sensory Mapping Drill):** पाठ के एक पैराग्राफ को लें; 5 कॉलम बनाएँ (दृश्य, श्रवण, स्पर्श.', '**रूपक-विघटन तालिका (Metaphor Deconstruction Table):** हर रूपक के लिए 4 कॉलम: (क) उपमेय, (ख) उपमान, (ग) उपमान के 3-4.', '**तुलनात्मक पुनर्लेखन (Comparative Rewriting):** उसी भाव को **उपमा, रूपक, और सीधे कथन** में लिखवाएँ; फिर पूछें.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में असंगत, विरोधी.',
          hint: 'यदि अटके तो नोड 28_006 (मुख्य विषय) और 28_008 (बिंब) को दोबारा पढ़ें — विशेष रूप से.',
          misconception: '**विशिष्ट भ्रांति:** छात्र \'विरोधाभास\' (Paradox) और \'विरोधाभासी पद युग्म\' (Oxymoron) को एक ही समझते हैं। वे पाठ में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में असंगत, विरोधी या असत्य',
                  options: ['**विरोधाभास (Paradox):** एक ऐसा कथन या स्थिति जो पहली दृष्टि में असंगत, विरोधी या असत्य', '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और'],
                  hint: 'यदि अटके तो नोड 28_006 (मुख्य विषय) और 28_008 (बिंब) को दोबारा पढ़ें — विशेष रूप से \'प्रकृति चक्र\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र \'विरोधाभास\' (Paradox) और \'विरोधाभासी पद युग्म\' (Oxymoron) को एक ही समझते हैं। वे पाठ में "टूटी पत्तियाँ" या.' }
          ],
            remediations: { 'paradox-oxymoron-oxymoron': { steps: ['**चरण 1:** छात्र से कहें: "पाठ का वह वाक्य ढूंढो जहाँ दो विपरीत बातें एक साथ कही गई हों परंतु दोनों सत्य हों।" (उदाहरण.', '**चरण 2:** पूछें: "क्या यह केवल दो शब्दों का मेल है (जैसे \'मीठा जहर\') या पूरा एक विचार है?" — विचार स्तर का होने पर.', '**चरण 3:** प्रतीक के लिए: "पत्ती पत्ती ही है या कुछ और दर्शाती है?" — "और दर्शाती है" पर प्रतीक की परिभाषा दोहराएं। 4.', '**चरण 4:** दोनों को जोड़ने का अभ्यास कराएं: "विरोधाभास प्रतीक के अर्थ को **तर्क** देता है" — यह वाक्य याद कराएं और दो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_010', difficulty: 'standard',
          question: 'पदावली के मुख्य शब्द वे विशिष्ट शब्दावली हैं जो पाठ के केंद्रीय भाव.',
          hint: 'यदि अटके तो कक्षा 9 \'क्षितिज\' भाग-1 के \'शब्द-शक्ति\' खंड (पृष्ठ 20-25 लगभग) और नोड.',
          misconception: '**विशिष्ट भ्रम:** छात्र \'मुख्य शब्द\' को **\'कठिन शब्द\' (difficult vocabulary)** समझते हैं और केवल **शब्दकोश अर्थ रटते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली के मुख्य शब्द वे विशिष्ट शब्दावली हैं जो पाठ के केंद्रीय भाव, प्रतीकात्मक अर्थ और',
                  options: ['पदावली के मुख्य शब्द वे विशिष्ट शब्दावली हैं जो पाठ के केंद्रीय भाव, प्रतीकात्मक अर्थ और', '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और'],
                  hint: 'यदि अटके तो कक्षा 9 \'क्षितिज\' भाग-1 के \'शब्द-शक्ति\' खंड (पृष्ठ 20-25 लगभग) और नोड.',
                  misconception: '**विशिष्ट भ्रम:** छात्र \'मुख्य शब्द\' को **\'कठिन शब्द\' (difficult vocabulary)** समझते हैं और केवल **शब्दकोश अर्थ रटते हैं**। वे नहीं समझते.' }
          ],
            remediations: { 'difficult-vocabulary-6-9': { steps: ['**चरणबद्ध उपचार (3 दिन का माइक्रो-प्लान):** **दिन 1 — शब्द-शक्ति पुनर्परीक्षण:** कक्षा 9 की \'शब्द-शक्ति\'.', '(ड) एक पंक्ति में लिखें — यह शब्द किस विषय को गहराता है?', '**दिन 3 — बोर्ड पैटर्न अभ्यास:** गत 3 वर्षों के CBSE नमूना पत्रों से \'पदावली/शब्द-शक्ति\' वाले 2 प्रश्न हल करवाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_011', difficulty: 'standard',
          question: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों के चयन, उनके रूपांतरण.',
          hint: 'यदि व्याकरणिक रूप पहचानने में अटके, तो कक्षा 9-10 के \'हिंदी व्याकरण\' अध्याय \'शब्द विचार\'.',
          misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल \'कठिन शब्दों का प्रयोग\' या \'अलंकारों की पहचान\' है। वास्तव में, बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों के चयन, उनके रूपांतरण (रूप-परिवर्तन),',
                  options: ['पाठ में भाषा-प्रयोग का अर्थ है लेखक द्वारा शब्दों के चयन, उनके रूपांतरण (रूप-परिवर्तन),', '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और'],
                  hint: 'यदि व्याकरणिक रूप पहचानने में अटके, तो कक्षा 9-10 के \'हिंदी व्याकरण\' अध्याय \'शब्द विचार\', \'पद.',
                  misconception: 'छात्र समझते हैं कि \'भाषा-प्रयोग\' का अर्थ केवल \'कठिन शब्दों का प्रयोग\' या \'अलंकारों की पहचान\' है। वास्तव में, बोर्ड परीक्षा में भाषा-प्रयोग.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के 3-4 छोटे वाक्य दें और प्रत्येक में एक शब्द रेखांकित करवाएँ। 2.', 'पूछें: \'इस शब्द का मूल रूप क्या है?', '(लिंग/वचन/काल/कारक/वाच्य)\' 3.', 'फिर पूछें: \'यदि लेखक इसकी जगह दूसरा रूप प्रयोग करता (उदाहरण: बहुवचन के स्थान पर एकवचन, भूतकाल के स्थान पर वर्तमान), तो.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_28_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न वे प्रश्न हैं जिनका उत्तर निश्चित, संक्षिप्त और एक ही होता है.',
          hint: 'यदि फँस जाएँ तो नोड 006 (मुख्य विषय) और 008 (बिंब-प्रतीक) दोबारा पढ़ें — आशय-सूचक.',
          misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि आशय-सूचक प्रश्न का उत्तर \'पाठ का अनुवाद\' या \'कहानी का वह भाग दोहराना\' होता है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न वे प्रश्न हैं जिनका उत्तर निश्चित, संक्षिप्त और एक ही होता है (जैसे: एक',
                  options: ['वस्तुनिष्ठ प्रश्न वे प्रश्न हैं जिनका उत्तर निश्चित, संक्षिप्त और एक ही होता है (जैसे: एक', '\'पतझड़ में टूटी पत्तियाँ\' सुप्रसिद्ध हिंदी साहित्यकार **रामवृक्ष बेनीपुरी** द्वारा लिखित', 'कथानक (Plot) कहानी में घटित घटनाओं का तार्किक और कालानुक्रमिक क्रम है, जबकि आख्यान-संरचना', 'पाठ्य-परिवेश (Setting) किसी रचना में वर्णित समय, स्थान, भौगोलिक परिस्थितियों और'],
                  hint: 'यदि फँस जाएँ तो नोड 006 (मुख्य विषय) और 008 (बिंब-प्रतीक) दोबारा पढ़ें — आशय-सूचक प्रश्नों के 80%.',
                  misconception: '**विशिष्ट भ्रम**: छात्र मानते हैं कि आशय-सूचक प्रश्न का उत्तर \'पाठ का अनुवाद\' या \'कहानी का वह भाग दोहराना\' होता है। उदाहरण: प्रश्न — "नायक.' }
          ],
            remediations: { 'retelling': { steps: ['**चरणबद्ध उपचार (Step-by-step remediation)**: 1.', '**पहचान कराओ**: छात्र को उसका लिखा उत्तर और एक आदर्श उत्तर (PEEL में) साथ-साथ दिखाओ। पूछो — "दोनों में क्या अंतर है?', 'किसमें \'क्यों\' का उत्तर है?" 2.', '**PEEL का अभ्यास कराओ**: एक सरल आशय-सूचक प्रश्न दो (जैसे: "नायक पत्तियों को क्यों छूता है?") और छात्र से कहो — "पहले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
