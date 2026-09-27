import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_al_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_al_ch01_p2: SimDef = {
    id: 'v3_c11_hin_al_ch01_p2',
    title: 'हुसैन की कहानी अपनी ज़बानी · Part 2/3',
    subtitle: 'यह नोड **केवल** \'हुसैन की कहानी अपनी ज़बानी\' में आए गौण विषयों (जैसे: सांप्रदायिक.',
    classLevel: 11, subject: 'hin_al', topic: 'हुसैन की कहानी अपनी ज़बानी · Part 2/3',
    chapters: ['c11_hin_al_ch01'],
    nodeIds: ['c11_hin_al_cbse_01_007', 'c11_hin_al_cbse_01_008', 'c11_hin_al_cbse_01_009', 'c11_hin_al_cbse_01_010', 'c11_hin_al_cbse_01_011', 'c11_hin_al_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'कल्पना कीजिए आपने अपने शहर की दीवार पर एक भित्तिचित्र (graffiti) देखा — मुख्य आकृति तो एक पक्षी की है, लेकिन.', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'हुसैन की कहानी अपनी ज़बानी — गौण विषय', text: 'गौण विषय (Sub-theme) वह साहित्यिक अवयव है जो मुख्य विषय के समानांतर चलता हुआ कथा में **विस्तार, गहराई और यथार्थपरकता** जोड़ता है, बिना मुख्य कथानक का केंद्रीय बनें; यह स्वतंत्र उप-कथानक (sub-plot) के.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_al_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['हुसैन की कहानी अपनी'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_al_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through हुसैन की कहानी अपनी ज़बानी like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? हुसैन की कहानी अपनी ज़बानी · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — हुसैन की कहानी अपनी ज़बानी · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_007', difficulty: 'standard',
          question: 'गौण विषय (Sub-theme) वह साहित्यिक अवयव है जो मुख्य विषय के समानांतर चलता हुआ.',
          hint: 'यदि अटका लगे, तो **नोड 006 (मुख्य विषय)** और **नोड 002 (कथानक संरचना)** के नोट्स दोबारा.',
          misconception: 'छात्र अक्सर मान लेते हैं कि **\'जो प्रसंग कम आए, वही गौण विषय है\'** — यह **आवृत्ति-भ्रम** है। वास्तव में गौण विषय.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-theme) वह साहित्यिक अवयव है जो मुख्य विषय के समानांतर चलता हुआ कथा में',
                  options: ['गौण विषय (Sub-theme) वह साहित्यिक अवयव है जो मुख्य विषय के समानांतर चलता हुआ कथा में', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक'],
                  hint: 'यदि अटका लगे, तो **नोड 006 (मुख्य विषय)** और **नोड 002 (कथानक संरचना)** के नोट्स दोबारा पढ़ें.',
                  misconception: 'छात्र अक्सर मान लेते हैं कि **\'जो प्रसंग कम आए, वही गौण विषय है\'** — यह **आवृत्ति-भ्रम** है। वास्तव में गौण विषय **संरचनात्मक भार** से तय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्पाठ (Re-read):** छात्र से कहें — पाठ के **किन्हीं 5 पृष्ठ** चुनें और हर पृष्ठ पर पूछें: "यहाँ मुख्य विषय.', 'और **साथ-साथ** कौन-सी अलग कहानी चल रही है?" 2.', '**तालिका निर्माण:** दो स्तंभ बनाएँ — बाएँ \'मुख्य विषय की घटनाएँ\', दाएँ \'समानांतर प्रसंग\'; छात्र स्वयं भरें। 3.', '**स्वतंत्रता परीक्षण:** प्रत्येक दाएँ-स्तंभ प्रसंग के लिए पूछें — "अगर मुख्य विषय हटा दें, क्या यह प्रसंग **अपनी पूर्ण.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_008', difficulty: 'standard',
          question: '**बिंब (Imagery)** शब्दों द्वारा पाठक की इंद्रियों (दृश्य, श्रवण, घ्राण.',
          hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 10 की हिंदी व्याकरण पुस्तक के \'अलंकार\' अध्याय** का \'रूपक.',
          misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'बिंब = केवल दृश्य वर्णन (Visual description)\'** और **\'रूपक = कोई भी तुलनात्मक वाक्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery)** शब्दों द्वारा पाठक की इंद्रियों (दृश्य, श्रवण, घ्राण, स्पर्श, स्वाद)',
                  options: ['**बिंब (Imagery)** शब्दों द्वारा पाठक की इंद्रियों (दृश्य, श्रवण, घ्राण, स्पर्श, स्वाद)', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक'],
                  hint: 'यदि अटका हुआ महसूस हो तो **कक्षा 10 की हिंदी व्याकरण पुस्तक के \'अलंकार\' अध्याय** का \'रूपक और उपमा.',
                  misconception: '**विशिष्ट भ्रम**: छात्र अक्सर **\'बिंब = केवल दृश्य वर्णन (Visual description)\'** और **\'रूपक = कोई भी तुलनात्मक वाक्य (Any comparative.' }
          ],
            remediations: { 'visual-description-any-comparative-statement': { steps: ['**इंद्रिय-मानचित्रण (Sensory Mapping) अभ्यास**: पाठ के 5 वाक्य चुनो। प्रत्येक के आगे 5 कॉलम बनाओ.', '**रूपक-शल्यक्रिया (Metaphor Surgery)**: पाठ से 3 रूपक छाँटो। प्रत्येक को टेबल पर रखो: - कॉलम A: उपमेय (किसके बारे में.', '**बिंब-रूपक संवाद**: किसी एक प्रसंग पर दोनों लिखो — पहले बिंब (इंद्रियानुभव), फिर रूपक (अर्थ-निर्माण)। अंतर स्पष्ट होगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_009', difficulty: 'standard',
          question: '**विरोधाभास** (Paradox) एक साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी लगने.',
          hint: 'यदि फँसें तो c11_hin_al_cbse_01_002 (कथानक) और c11_hin_al_cbse_01_006 (मुख्य विषय) को.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **विरोधाभास = विडंबना (Irony)** और **प्रतीक = रूपक (Metaphor)**। **गलत तर्क:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास** (Paradox) एक साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी लगने वाले तथ्यों',
                  options: ['**विरोधाभास** (Paradox) एक साहित्यिक युक्ति है जिसमें दो परस्पर विरोधी लगने वाले तथ्यों', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक'],
                  hint: 'यदि फँसें तो c11_hin_al_cbse_01_002 (कथानक) और c11_hin_al_cbse_01_006 (मुख्य विषय) को दोहराएँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **विरोधाभास = विडंबना (Irony)** और **प्रतीक = रूपक (Metaphor)**। **गलत तर्क:** "दोनों में दो चीज़ों.' }
          ],
            remediations: { 'irony-metaphor': { steps: ['**अंतर स्पष्ट करें:** छात्र के सामने दो कॉलम बनाएँ — बाएँ \'विडंबना/रूपक\', दाएँ \'विरोधाभास/प्रतीक\'। पाठ के 3-3 उदाहरण.', '**\'कार्य\' पर फोकस:** समझाएँ — विरोधाभास **सत्य उद्घाटित करता है**, विडंबना **स्थिति की विडंबना दर्शाती है**; प्रतीक.', '**अभ्यास:** पाठ से 5 वाक्य दें, छात्र को प्रत्येक के लिए युक्ति + उसका कार्य (function) लिखने को कहें। गलती पर तुरंत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_010', difficulty: 'standard',
          question: 'पदावली (Vocabulary/Glossary) किसी रचना में प्रयुक्त उन विशिष्ट, क्षेत्रीय.',
          hint: 'यदि अटके तो **पाठ के उस अनुच्छेद को पुनः पढ़ें जहाँ शब्द आया है** — प्रसंग (context) ही.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पदावली: मुख्य शब्द\' का अर्थ है — **पाठ में आए कठिन/अपरिचित शब्दों की सूची.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (Vocabulary/Glossary) किसी रचना में प्रयुक्त उन विशिष्ट, क्षेत्रीय, बोलीगत, तकनीकी',
                  options: ['पदावली (Vocabulary/Glossary) किसी रचना में प्रयुक्त उन विशिष्ट, क्षेत्रीय, बोलीगत, तकनीकी', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक'],
                  hint: 'यदि अटके तो **पाठ के उस अनुच्छेद को पुनः पढ़ें जहाँ शब्द आया है** — प्रसंग (context) ही शब्द का.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि \'पदावली: मुख्य शब्द\' का अर्थ है — **पाठ में आए कठिन/अपरिचित शब्दों की सूची बनाकर उनके शब्दकोशीय.' }
          ],
            remediations: { 'dictionary-meaning-deliberately': { steps: ['**चरण 1 — शब्द को \'लेबल\' से मुक्त करें:** छात्र से कहें — *"आँख बंद करो और \'भट्टा\' बोलो। क्या तुम्हें धूल, गर्मी, ईंटों.', 'अब बोलो \'ईंट का कारखाना\'। क्या फर्क पड़ा?"* इस **संवेदी तुलना (sensory comparison)** से अर्थ-छाया (connotation) का बोध.', 'और अगर तुम इंस्पेक्टर होते, तो क्या कहते?"* इससे **भाषाई चयन में निहित दृष्टिकोण (perspective)** स्पष्ट होगा। **चरण 3.', '(ख) किस काम के साथ जुड़ा है?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_011', difficulty: 'standard',
          question: 'इस पाठ में भाषा-प्रयोग का अर्थ है लेखक हुसैन द्वारा अपनी आत्मकथा को मौखिक शैली.',
          hint: 'यदि अटका हुआ महसूस हो तो NCERT कक्षा 9-10 की "भाषा और व्याकरण" इकाई में "बोली-भाषा".',
          misconception: 'छात्र प्रायः मानते हैं कि पाठ में भोजपुरी/उर्दू/अंग्रेज़ी मिश्रण लेखक की "हिंदी कमज़ोर होने" या "व्याकरण न आने" का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'इस पाठ में भाषा-प्रयोग का अर्थ है लेखक हुसैन द्वारा अपनी आत्मकथा को मौखिक शैली (oral',
                  options: ['इस पाठ में भाषा-प्रयोग का अर्थ है लेखक हुसैन द्वारा अपनी आत्मकथा को मौखिक शैली (oral', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक'],
                  hint: 'यदि अटका हुआ महसूस हो तो NCERT कक्षा 9-10 की "भाषा और व्याकरण" इकाई में "बोली-भाषा", "मानकीकरण" और.',
                  misconception: 'छात्र प्रायः मानते हैं कि पाठ में भोजपुरी/उर्दू/अंग्रेज़ी मिश्रण लेखक की "हिंदी कमज़ोर होने" या "व्याकरण न आने" का प्रमाण है। वास्तव में यह.' }
          ],
            remediations: { 'deliberate-stylistic-choice-code-mixing': { steps: ['चरण 1: छात्र से कहें कि वह अपने घर/मोहल्ले में बोले जाने वाले किसी एक वाक्य को लिखे (जैसे "हम जइबो") और फिर उसे "शुद्ध.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_al_cbse_01_012', difficulty: 'standard',
          question: '**बोध-प्रश्न** पाठ की समझ जाँचने के दो प्रमुख प्रकार हैं: (1) **वस्तुनिष्ठ.',
          hint: 'यदि फँसें तो **c11_hin_al_cbse_01_006 (मुख्य विषय और संदेश)** और **c11_hin_al_cbse_01_008.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **आशय-सूचक प्रश्नों का उत्तर "अपनी भाषा में संक्षेप में" (in brief, in own.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बोध-प्रश्न** पाठ की समझ जाँचने के दो प्रमुख प्रकार हैं: (1) **वस्तुनिष्ठ प्रश्न**',
                  options: ['**बोध-प्रश्न** पाठ की समझ जाँचने के दो प्रमुख प्रकार हैं: (1) **वस्तुनिष्ठ प्रश्न**', '\'हुसैन की कहानी अपनी ज़बानी\' कक्षा 11 हिंदी अंतरा भाग-1 का पहला अध्याय है, जिसे प्रसिद्ध', 'कथानक (Plot) घटनाओं का तार्किक एवं कालानुक्रमिक क्रम है जो कारण-कार्य संबंध से बंधा होता', 'पाठ्य-परिवेश (Setting) किसी रचना का वह समग्र स्पेस-टाइम-सोसायटी फ्रेमवर्क है जिसमें कथानक'],
                  hint: 'यदि फँसें तो **c11_hin_al_cbse_01_006 (मुख्य विषय और संदेश)** और **c11_hin_al_cbse_01_008.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **आशय-सूचक प्रश्नों का उत्तर "अपनी भाषा में संक्षेप में" (in brief, in own words) देना पर्याप्त.' }
          ],
            remediations: { 'in-brief': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**स्पष्ट करें:** "आशय-सूचक प्रश्न में \'अपनी भाषा में\' का अर्थ है — **व्याख्या (explanation) अपनी भाषा में**, लेकिन.', '**मॉडल दिखाएँ:** एक ही प्रश्न के दो उत्तर लिखवाएँ — **बिना साक्ष्य वाला** (कमज़ोर) और **साक्ष्य सहित** (मज़बूत) — और.', '**अभ्यास कराएँ:** पाठ के 3 प्रमुख प्रसंग चुनकर, प्रत्येक पर **एक आशय-सूचक प्रश्न बनवाएँ** और **PEEL ढाँचे में उत्तर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
