import type { SimDef } from '../../engine/types';

/** v3 generated — c6_hin_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_hin_ch13_p1: SimDef = {
    id: 'v3_c6_hin_ch13_p1',
    title: 'पाठ 13 · Part 1/3',
    subtitle: 'इस नोड में केवल पाठ 13 के रचनाकार का संक्षिप्त जीवन परिचय, उनकी साहित्यिक विशेषताएँ, तथा.',
    classLevel: 6, subject: 'hin', topic: 'पाठ 13 · Part 1/3',
    chapters: ['c6_hin_ch13'],
    nodeIds: ['c6_hin_cbse_13_001', 'c6_hin_cbse_13_002', 'c6_hin_cbse_13_003', 'c6_hin_cbse_13_004', 'c6_hin_cbse_13_005', 'c6_hin_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 6 learner', intro: 'कल्पना करो कि तुम्हें एक पुराना पत्र मिला है जिसमें कोई बहुत भावुक बात लिखी है, लेकिन तुम्हें नहीं पता कि.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पाठ 13 — पृष्ठभूमि और रचनाकार परिचय', text: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक परिस्थितियों तथा लेखक के व्यक्तित्व, जीवन-दर्शन एवं साहित्यिक योगदान का संक्षिप्त विवरण है जो पाठ की विषय-वस्तु और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_hin_cbse_13_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पाठ 13 — पृष्ठभूमि', 'पाठ 13 — कथानक', 'पाठ 13 — पाठ्य-परिवेश', 'पाठ 13 — पात्र-चित्रण', 'पाठ 13 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c6_hin_cbse_13_002', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 13 · Part 1/3', spots: [
            { id: 's1', label: '13 -', prompt: 'Which idea is this? — **कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत.', answer: '13 -', options: ['13 -', '13 -'] },
            { id: 's2', label: '13 -', prompt: 'Which idea is this? — \'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है.', answer: '13 -', options: ['13 -', '13 -'] }
          ] } },
        { type: 'case', nodeId: 'c6_hin_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through पाठ 13 like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? पाठ 13 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 13 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_001', difficulty: 'standard',
          question: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक.',
          hint: 'यदि अटका हुआ महसूस हो तो **\'रचनाकार के जीवन की एक घटना → पाठ की एक पंक्ति/पात्र/स्थिति\'**.',
          misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि **"पृष्ठभूमि और रचनाकार परिचय" केवल \'जानकारी\' (फैक्ट्स) है जिसे परीक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक',
                  options: ['\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है', 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें किसी कहानी या उपन्यास के प्रमुख पात्र'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'रचनाकार के जीवन की एक घटना → पाठ की एक पंक्ति/पात्र/स्थिति\'** — इस तीर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र अक्सर मानते हैं कि **"पृष्ठभूमि और रचनाकार परिचय" केवल \'जानकारी\' (फैक्ट्स) है जिसे परीक्षा में 1-2 अंकों के.' }
          ],
            remediations: { '1-2': { steps: ['**पुनः पढ़वाएँ (सक्रिय पठन):** छात्र से कहें — *"पाठ 13 के पहले पैरा/भूमिका में रचनाकार परिचय पढ़ो और **लाल पेन से** उन.', '**जोड़ने का अभ्यास:** अब पाठ से **कोई एक संवाद या वर्णन** चुनने को कहें जो ग्रामीण/प्रशासनिक यथार्थ दिखाता हो। पूछें.', '(आईएएस/ग्रामीण/व्यंग्य) तीर खींचकर मिलाओ।"* 3.', '**मिनी-लेखन:** छात्र से एक वाक्य में लिखवाएँ — *"रचनाकार का आईएएस होना इस पंक्ति को कैसे \'व्यंग्य\' बनाता है?"* — इससे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_002', difficulty: 'standard',
          question: '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर.',
          hint: 'अगर अटका लगे: "किसी परिचित घटना (जैसे सुबह से शाम तक का दिन) की 5-6 घटनाएँ लिखो और उन्हें.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कथानक = कहानी का सारांश" और "आख्यान-संरचना = अध्यायों/अनुच्छेदों में बँटवारा"।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत',
                  options: ['**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है', 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें किसी कहानी या उपन्यास के प्रमुख पात्र'],
                  hint: 'अगर अटका लगे: "किसी परिचित घटना (जैसे सुबह से शाम तक का दिन) की 5-6 घटनाएँ लिखो और उन्हें तीर.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि "कथानक = कहानी का सारांश" और "आख्यान-संरचना = अध्यायों/अनुच्छेदों में बँटवारा"। वे फ्लैशबैक देखते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से एक जानी-पहचानी घटना (स्कूल का दिन) का **सख्त कालक्रम** लिखवाओ — यही कथानक है। 2.', '**चरण 2:** उसी घटना को **तीन अलग शैलियों** में लिखवाओ: (अ) सीधा क्रम, (ब) अंत से शुरुआत (फ्लैशबैक), (स) दो समानांतर.', '**चरण 3:** पूछो: "क्या घटनाएँ बदलीं?', '**चरण 4:** शब्द दें: "घटनाओं का अपना क्रम = कथानक। बताने का तुम्हारा चुनाव = आख्यान-संरचना।" इसे दो-तीन कहानियों पर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_003', difficulty: 'standard',
          question: '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक.',
          hint: 'यदि अटक जाएँ, तो पहले **कथानक का आरंभिक पैराग्राफ** दोबारा पढ़ें और तीन रंगों से अंडरलाइन.',
          misconception: 'छात्र समझते हैं कि **\'परिवेश\' केवल \'पृष्ठभूमि\' (backdrop) है — स्थिर, निष्क्रिय, सजावटी**। वे नहीं देख पाते कि परिवेश.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है',
                  options: ['\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें किसी कहानी या उपन्यास के प्रमुख पात्र'],
                  hint: 'यदि अटक जाएँ, तो पहले **कथानक का आरंभिक पैराग्राफ** दोबारा पढ़ें और तीन रंगों से अंडरलाइन करें: लाल.',
                  misconception: 'छात्र समझते हैं कि **\'परिवेश\' केवल \'पृष्ठभूमि\' (backdrop) है — स्थिर, निष्क्रिय, सजावटी**। वे नहीं देख पाते कि परिवेश **सक्रिय शक्ति.' }
          ],
            remediations: { 'backdrop': { steps: ['**चित्र-आधारित अभ्यास:** छात्र को एक ही स्थान (जैसे: पुराना घर) के दो चित्र दिखाओ — एक धूप में, एक बरसात में; एक सजा.', '**शब्द-प्रतिस्थापन खेल:** एक पैराग्राफ में ५ प्रमुख संज्ञा/विशेषण बदलवाओ (नीम → बरगद, खाट → सोफा, ढीली → कसी, सूना →.', '**\'क्यों\' की श्रृंखला:** हर ब्यौरे पर पूछो — "लेखक ने *यही* पेड़, *यही* खाट, *यही* समय क्यों चुना?', 'दूसरा कुछ क्यों नहीं?" — जब तक छात्र **लेखकीय इरादे (authorial intent)** तक न पहुँच जाए।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_004', difficulty: 'standard',
          question: 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें किसी कहानी या उपन्यास के.',
          hint: 'यदि छात्र अटका हो तो **\'पाठ-परिवेश और वातावरण\' (c6_hin_cbse_13_003)** दोहराएँ — विशेषकर.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "पात्र-चित्रण = पात्र का वर्णन (Description)" — यानी लेखक ने पात्र के बारे में जो.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें किसी कहानी या उपन्यास के प्रमुख पात्र',
                  options: ['पात्र-चित्रण एक साहित्यिक विश्लेषण कौशल है जिसमें किसी कहानी या उपन्यास के प्रमुख पात्र', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है'],
                  hint: 'यदि छात्र अटका हो तो **\'पाठ-परिवेश और वातावरण\' (c6_hin_cbse_13_003)** दोहराएँ — विशेषकर यह समझने के.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि "पात्र-चित्रण = पात्र का वर्णन (Description)" — यानी लेखक ने पात्र के बारे में जो विशेषण लिखे हैं.' }
          ],
            remediations: { 'description': { steps: ['**दिखाएँ बनाम बताएँ (Show vs Tell) खेल:** छात्र को दो वाक्य दें — (अ) "सीता ईमानदार थी।" (ब) "सीता ने गिरा हुआ पर्स.', '**चार-खाना चार्ट (Four-Quadrant Chart) बनवाएँ:** एक कागज को चार भागों में बाँटें — भौतिक, मनोवैज्ञानिक, सामाजिक.', '**PEEL मॉडल पर एक गुण लिखवाएँ:** Point (गुण बताएँ), Evidence (संवाद/कार्य उद्धृत करें), Explain (यह गुण कैसे सिद्ध होता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_005', difficulty: 'standard',
          question: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के.',
          hint: 'यदि अटके, तो "पात्र-चित्रण: नायक/प्रमुख पात्र" (c6_hin_cbse_13_004) के \'चरित्र-चक्र\'.',
          misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र केवल नायक की \'मदद\' (Help) करने के लिए होते हैं — जैसे सामान पहुँचाना, संदेश देना.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर',
                  options: ['सहायक पात्र (Supporting Characters) वे पात्र होते हैं जो नायक/प्रमुख पात्र के साथ रहकर', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है'],
                  hint: 'यदि अटके, तो "पात्र-चित्रण: नायक/प्रमुख पात्र" (c6_hin_cbse_13_004) के \'चरित्र-चक्र\' (Character.',
                  misconception: 'छात्र अक्सर मानते हैं कि सहायक पात्र केवल नायक की \'मदद\' (Help) करने के लिए होते हैं — जैसे सामान पहुँचाना, संदेश देना, या साथ खड़े रहना। वे.' }
          ],
            remediations: { 'help': { steps: ['छात्र से कहो: "एक कहानी याद करो जहाँ हीरो का दोस्त उसे गलत काम करने को उकसाए (जैसे क्लास बंक करना, झूठ बोलना)। क्या वह.', 'फिर दो कॉलम बनवाओ: "सकारात्मक सहयोग" (Positive Support) और "नकारात्मक उत्प्रेरण" (Negative Catalysis) — जानी-मानी.', 'अंत में पूछो: "अगर शकुनी न होता, तो क्या दुर्योधन का चरित्र वही होता?" — इससे \'कार्यात्मक अनिवार्यता\' (Functional.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_hin_cbse_13_006', difficulty: 'standard',
          question: 'मुख्य विषय वह केंद्रीय विचार है जिसे लेखक अपनी कहानी के माध्यम से बताना चाहता.',
          hint: 'यदि फँसें तो घटनाओं के क्रम (kathanakram) और प्रमुख पात्र के निर्णय (nayak ka nirnay) की.',
          misconception: 'छात्र अक्सर मुख्य विषय को कहानी की पहली या आखिरी घटना मान लेते हैं, जैसे कि यदि कहानी में अंत में कोई पुरस्कार मिलता है.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'मुख्य विषय वह केंद्रीय विचार है जिसे लेखक अपनी कहानी के माध्यम से बताना चाहता है, जबकि',
                  options: ['मुख्य विषय वह केंद्रीय विचार है जिसे लेखक अपनी कहानी के माध्यम से बताना चाहता है, जबकि', '\'पृष्ठभूमि और रचनाकार परिचय\' किसी पाठ के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक', '**कथानक** कहानी की घटनाओं का तार्किक और कालानुक्रमिक क्रम है (क्या हुआ, फिर क्या हुआ, अंत', '\'पाठ्य-परिवेश\' (Setting) किसी कहानी या कविता का भौतिक, सामाजिक और सांस्कृतिक संदर्भ है'],
                  hint: 'यदि फँसें तो घटनाओं के क्रम (kathanakram) और प्रमुख पात्र के निर्णय (nayak ka nirnay) की अवधारणा को.',
                  misconception: 'छात्र अक्सर मुख्य विषय को कहानी की पहली या आखिरी घटना मान लेते हैं, जैसे कि यदि कहानी में अंत में कोई पुरस्कार मिलता है तो मुख्य विषय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को कहानी की 3 महत्वपूर्ण घटनाएँ बताइए और पूछिए कि इनमें क्या आम है?', 'जैसे: (1) गाय जंगल में भटकती है, (2) वह भटकते-भटकते थक जाती है, (3) अंत में परिचित ध्वनि सुनकर घर लौटती है। फिर स्पष्ट.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
