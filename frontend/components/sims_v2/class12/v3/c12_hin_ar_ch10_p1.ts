import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch10_p1: SimDef = {
    id: 'v3_c12_hin_ar_ch10_p1',
    title: 'भक्तनि · Part 1/3',
    subtitle: 'A poet wrote prose so a servant\'s life would count',
    classLevel: 12, subject: 'hin_ar', topic: 'भक्तनि · Part 1/3',
    chapters: ['c12_hin_ar_ch10'],
    nodeIds: ['c12_hin_ar_cbse_10_001', 'c12_hin_ar_cbse_10_002', 'c12_hin_ar_cbse_10_003', 'c12_hin_ar_cbse_10_004', 'c12_hin_ar_cbse_10_005', 'c12_hin_ar_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi sketch-reader', intro: 'From a collection of remembered lives, one woman steps forward — and a child\'s eye becomes the sharpest lens on inequality.', goal: 'Read the sketch through Mahadevi Verma\'s reformist lens — caste, gender and the child\'s innocent gaze.' },
    discovery: {
        question: 'A servant-woman, married at five, widowed young, speaks in village dialect inside a professor\'s household. Why did a poet famous for Chhayavad lyrics choose to record her?',
        options: ['Reformer\'s testimony — Mahadevi Verma ran a girls\' school; the sketch documents caste-gender oppression through a child\'s eyes to demand change', 'She needed a memoir chapter', 'Servants make easy characters', 'Poetry didn\'t sell'],
        answer: 'Reformer\'s testimony — Mahadevi Verma ran a girls\' school; the sketch documents caste-gender oppression through a child\'s eyes to demand change',
        hook: 'Don\'t read it as just a sad servant story — the context stages a power binary (master-servant, caste, literacy) that the child\'s innocent gaze both reveals and unsettles. The Avadhi dialect she speaks is authenticity itself: identity recorded with respect, not corrected.',
    },
    teaching: [
        { title: 'भक्तनि — पृष्ठभूमि और रचनाकार परिचय', text: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के लेखक/कवि के व्यक्तित्व, कालखंड, सामाजिक-सांस्कृतिक परिवेश, साहित्यिक योगदान तथा रचना-प्रक्रिया को समझकर रचना के मूल.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'See through the child-narrator\'s eyes: map the household\'s hierarchy before a word of plot, weigh dialect as dignity, and read a memory sketch as social evidence.',
        labels: ['भक्तनि — पृष्ठभूमि और', 'भक्तनि — कथानक और', 'भक्तनि — पाठ्य-परिवेश और', 'भक्तनि — पात्र-चित्रण: नायक/प्रमुख', 'भक्तनि — पात्र-चित्रण: सहायक', 'भक्तनि — मुख्य विषय'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a features-writing course, you\'re profiling the woman who\'s run your hostel kitchen for 30 years. Your editor wants a \'heartwarming\' ending where she cries as the final batch of students leaves — \'that\'s the emotional payoff.\'',
            decisions: [{ prompt: 'What would Mohan Rakesh\'s \'भक्तिन\' tell the editor?', options: [
                { text: 'Cut the tears — the story ends with the narrator noting Bhaktin\'s unbothered self-sufficiency at his own departure, and that refusal of sentimental closure IS the portrait; a lifetime of abandonment made her dignity non-negotiable, and dependency would betray her.', outcome: 'The chapter\'s lesson: the open, unsentimental ending honours her autonomy — the lack of payoff is the resolution, because her strength was never wired to anyone\'s leaving.' },
                { text: 'Add the crying scene — readers need emotional closure, and her reserve is just a detail to warm up.', outcome: 'That\'s the exact misreading: her composure isn\'t a gap in the story, it\'s the story — turning self-reliance into breakdown writes a different, lesser person.', reveals: 'tears-equal-depth' },
                { text: 'Reorder the piece chronologically — childhood, marriage, abandonment, kitchen — so her arc reads cleanly.', outcome: 'The story deliberately opens on her cooking now and folds the past in as flashback; the mundane present framing the hard past is what makes her endurance land — flattening the order flattens her.', reveals: 'chronology-equals-clarity' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read an autobiographical sketch as a reformer\'s document — where one remembered woman exposes a whole system\'s quiet cruelties.',
            decisions: [{ prompt: 'What comes next? भक्तनि · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — भक्तनि · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_001', difficulty: 'standard',
          question: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना.',
          hint: 'यदि फँस जाएँ तो कक्षा 11 का नोड c11_hin_ar_cbse_10_001 (पृष्ठभूमि और रचनाकार परिचय).',
          misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ केवल लेखक की जन्मतिथि, मृत्युतिथि, प्रमुख कृतियाँ और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के',
                  options: ['पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है', 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के **बाह्य व्यक्तित्व (वेश-भूषा,'],
                  hint: 'यदि फँस जाएँ तो कक्षा 11 का नोड c11_hin_ar_cbse_10_001 (पृष्ठभूमि और रचनाकार परिचय) दोहराएँ जहाँ.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'पृष्ठभूमि और रचनाकार परिचय\' का अर्थ केवल लेखक की जन्मतिथि, मृत्युतिथि, प्रमुख कृतियाँ और पुरस्कार रट लेना है। वे.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "मैथिलीशरण गुप्त की कोई एक कविता (जैसे \'भारत-भारती\' का अंश) पढ़ो और बताओ कि इसमें गुप्त जी का अपना जीवन.', 'कक्षा 11 के नोड c11_hin_ar_cbse_10_001 (पाठ 10 — पृष्ठभूमि और रचनाकार परिचय) को दोबारा पढ़ें जहाँ इसी प्रक्रिया को सरल.', 'पुनः निदान: छात्र से भक्तिन के किसी एक प्रसंग (जैसे मंदिर प्रवेश) को गुप्त जी के गांधीवादी विचारों से जोड़कर 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_002', difficulty: 'standard',
          question: 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है.',
          hint: 'अगर \'कथानक vs कथा\' भेद स्पष्ट नहीं तो c11_hin_ar_cbse_10_002 के \'WORKED_EXAMPLE_1\'.',
          misconception: 'विद्यार्थी समझते हैं कि \'कथानक = घटनाओं का सारांश\' और \'आख्यान-संरचना = फ्लैशबैक की उपस्थिति मात्र\'। **वास्तविक भूल:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि',
                  options: ['कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'पाठ्य-परिवेश और वातावरण का अर्थ है', 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के **बाह्य व्यक्तित्व (वेश-भूषा,'],
                  hint: 'अगर \'कथानक vs कथा\' भेद स्पष्ट नहीं तो c11_hin_ar_cbse_10_002 के \'WORKED_EXAMPLE_1\' (राजा-रानी.',
                  misconception: 'विद्यार्थी समझते हैं कि \'कथानक = घटनाओं का सारांश\' और \'आख्यान-संरचना = फ्लैशबैक की उपस्थिति मात्र\'। **वास्तविक भूल:** वे नहीं देखते कि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: c12_hin_ar_cbse_10_001 (पृष्ठभूमि) दोबारा पढ़ो — रचनाकार का \'प्रयोगधर्मी\' स्वरूप समझो। चरण 2: पाठ के पहले 3 पैरा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_003', difficulty: 'standard',
          question: 'पाठ्य-परिवेश और वातावरण का अर्थ है — रचना में वर्णित भौगोलिक स्थान, ऐतिहासिक.',
          hint: 'यदि अटके तो कक्षा 11 के नोड c11_hin_ar_cbse_10_003 \'पाठ्य-परिवेश और वातावरण\' को दोबारा.',
          misconception: 'विद्यार्थी अक्सर \'परिवेश\' (setting) को केवल \'कहाँ और कब\' (where and when) तक सीमित कर देते हैं — वे भौगोलिक स्थान और.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ्य-परिवेश और वातावरण का अर्थ है',
                  options: ['पाठ्य-परिवेश और वातावरण का अर्थ है', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के **बाह्य व्यक्तित्व (वेश-भूषा,'],
                  hint: 'यदि अटके तो कक्षा 11 के नोड c11_hin_ar_cbse_10_003 \'पाठ्य-परिवेश और वातावरण\' को दोबारा पढ़ें — वहाँ.',
                  misconception: 'विद्यार्थी अक्सर \'परिवेश\' (setting) को केवल \'कहाँ और कब\' (where and when) तक सीमित कर देते हैं — वे भौगोलिक स्थान और ऐतिहासिक काल लिखकर.' }
          ],
            remediations: { 'setting-where-and-when-class': { steps: ['चरण 1: विद्यार्थी से कहें — \'पाठ खोलो, पहले पन्ने पर जहाँ काशी का वर्णन है, वहाँ पेंसिल से हर संज्ञा (घाट, गंगा, मंदिर.', 'दो सूचियाँ बनाओ।\' चरण 3: कहो — \'अब एक वाक्य लिखो जिसमें दोनों सूचियों का कोई एक-एक शब्द आए और बताए कि चीज़ ने भावना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_004', difficulty: 'standard',
          question: 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के **बाह्य व्यक्तित्व.',
          hint: 'यदि **द्वंद्वात्मक संबंध (Dialectical Relationship)** समझ न आए, तो.',
          misconception: '**विशिष्ट भ्रांति**: "भक्तिन एक **आदर्श नौकरानी (Ideal Servant)** है जो मालकिन के प्रति **समर्पित और आज्ञाकारी** रहती.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के **बाह्य व्यक्तित्व (वेश-भूषा,',
                  options: ['पात्र-चित्रण (Character Sketch) का अर्थ है किसी पात्र के **बाह्य व्यक्तित्व (वेश-भूषा,', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि **द्वंद्वात्मक संबंध (Dialectical Relationship)** समझ न आए, तो **c11_hin_ar_cbse_02_004.',
                  misconception: '**विशिष्ट भ्रांति**: "भक्तिन एक **आदर्श नौकरानी (Ideal Servant)** है जो मालकिन के प्रति **समर्पित और आज्ञाकारी** रहती है।" **यह गलत क्यों.' }
          ],
            remediations: { 'ideal-servant-1': { steps: ['**चरण 1**: छात्र को **पाठ के तीन प्रसंग** दें जहाँ भक्तिन **आज्ञा नहीं मानती / सलाह देती है / नाराज़ होती है** — उन्हें.', 'लेखिका ने उसे रोका क्यों नहीं?" **चरण 3**: **c12_hin_ar_cbse_10_003 (पाठ्य-परिवेश और वातावरण)** दोबारा पढ़वाएँ — वहाँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_005', difficulty: 'standard',
          question: 'सहायक पात्र वे पात्र हैं जो नायक/प्रमुख पात्र के साथ अंतःक्रिया करके कथानक को.',
          hint: 'यदि भक्तिन के चरित्र के आयाम अस्पष्ट हैं, तो तुरंत c12_hin_ar_cbse_10_004 के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र सहायक पात्रों को **\'कम महत्वपूर्ण पात्र\' (less important characters)** मानते हैं और उनके.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'सहायक पात्र वे पात्र हैं जो नायक/प्रमुख पात्र के साथ अंतःक्रिया करके कथानक को गति देते',
                  options: ['सहायक पात्र वे पात्र हैं जो नायक/प्रमुख पात्र के साथ अंतःक्रिया करके कथानक को गति देते', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि भक्तिन के चरित्र के आयाम अस्पष्ट हैं, तो तुरंत c12_hin_ar_cbse_10_004 के WORKED_EXAMPLE_1 और.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र सहायक पात्रों को **\'कम महत्वपूर्ण पात्र\' (less important characters)** मानते हैं और उनके चरित्र-चित्रण में केवल.' }
          ],
            remediations: { 'less-important-characters': { steps: ['**चरण 1:** छात्र से कहें — \'पाठ खोलो और सास/मालकिन/गाँव की स्त्रियों के **केवल संवाद** (dialogues) निकालकर अलग कागज़ पर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_10_006', difficulty: 'standard',
          question: 'किसी साहित्यिक कृति का **मुख्य विषय (Main Theme)** वह केंद्रीय विचार, सत्य या.',
          hint: 'यदि अटके तो **Class 11 आरोह भाग-1, पाठ 1 के \'मुख्य विषय और संदेश\'.',
          misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि *भक्तनि* का मुख्य विषय **"विधवा स्त्री का कष्ट"** या **"ठाकुर की क्रूरता"** है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'किसी साहित्यिक कृति का **मुख्य विषय (Main Theme)** वह केंद्रीय विचार, सत्य या भाव होता है',
                  options: ['किसी साहित्यिक कृति का **मुख्य विषय (Main Theme)** वह केंद्रीय विचार, सत्य या भाव होता है', 'पृष्ठभूमि और रचनाकार परिचय वह साहित्यिक विश्लेषण-प्रक्रिया है जिसमें किसी रचना के', 'कथानक (plot) किसी रचना में घटनाओं का कारण-कार्य-संबंध युक्त तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है'],
                  hint: 'यदि अटके तो **Class 11 आरोह भाग-1, पाठ 1 के \'मुख्य विषय और संदेश\' (c11_hin_ar_cbse_01_006)** को.',
                  misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि *भक्तनि* का मुख्य विषय **"विधवा स्त्री का कष्ट"** या **"ठाकुर की क्रूरता"** है। **वास्तविकता:** ये.' }
          ],
            remediations: { 'incidents': { steps: ['**पुनः पढ़ें:** Node c12_hin_ar_cbse_10_002 (कथानक) और c12_hin_ar_cbse_10_004/005 (पात्र-चित्रण) — केवल घटनाएँ नहीं.', '**T-Chart बनाएँ:** बाएँ कॉलम में 4 प्रमुख प्रसंग लिखें, दाएँ में पूछें — "यह प्रसंग किस **बड़े सत्य** की ओर इशारा करता.', '**तुलना करें:** Class 11 के किसी उपन्यास (जैसे *आधा गाँव* — Node c11_hin_ar_cbse_01_006) का मुख्य विषय लिखकर मिलाएँ.', '**पुनः प्रयास करें:** DIAGNOSTIC_QUESTION_1 का उत्तर फिर से लिखें, इस बार **एक सार्वभौमिक वाक्य** में।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
