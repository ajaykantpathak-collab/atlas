import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch19_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch19_p3: SimDef = {
    id: 'v3_c10_hin_sp_ch19_p3',
    title: 'पर्वत प्रदेश में पावस · Part 3/3',
    subtitle: 'यह नोड **केवल आशय-स्पष्टीकरण लेखन कौशल** पर केंद्रित है: पद्यांश के भावार्थ को.',
    classLevel: 10, subject: 'hin_sp', topic: 'पर्वत प्रदेश में पावस · Part 3/3',
    chapters: ['c10_hin_sp_ch19'],
    nodeIds: ['c10_hin_sp_cbse_19_013', 'c10_hin_sp_cbse_19_014', 'c10_hin_sp_cbse_19_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'पर्वत प्रदेश में पावस\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'पर्वत प्रदेश में पावस — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'पर्वत प्रदेश में पावस\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_19_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['पर्वत प्रदेश में पावस'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_19_014', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['PEEL ढाँचा लागू करें — Point: "कवि ने बादलों की विशालता और.', 'कविता स्कैन — बादल संबंधी स्टैंजा पहचानें: स्टैंजा 2 ("बादल.', 'अंतिम पॉलिश — सुनिश्चित करें कि प्रत्येक चरण अगले से.', 'प्रश्न का विश्लेषण — कीवर्ड: "बादलों का चित्रण", "दो बिंब".', 'शब्द सीमा जाँच — लगभग 45-50 शब्द (3 अंक के लिए आदर्श)।.'], answer: 'प्रश्न का विश्लेषण — कीवर्ड: "बादलों का चित्रण", "दो बिंब". कविता स्कैन — बादल संबंधी स्टैंजा पहचानें: स्टैंजा 2 ("बादल. PEEL ढाँचा लागू करें — Point: "कवि ने बादलों की विशालता और. शब्द सीमा जाँच — लगभग 45-50 शब्द (3 अंक के लिए आदर्श)।. अंतिम पॉलिश — सुनिश्चित करें कि प्रत्येक चरण अगले से.' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_19_015', title: 'You made it',
          caseStudy: { intro: 'You finished पर्वत प्रदेश में पावस — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_013', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_19_002 (पद्यांश-वार भावार्थ)** और.',
          misconception: '**विशिष्ट भ्रान्ति:** छात्र समझते हैं कि **आशय-स्पष्टीकरण = शब्दार्थ + सरल भाषा में अनुवाद**। **वास्तविकता:** CBSE.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' का आलोचनात्मक चिंतन',
                  options: ['\'पर्वत प्रदेश में पावस\' का आलोचनात्मक चिंतन', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **c10_hin_sp_cbse_19_002 (पद्यांश-वार भावार्थ)** और **c10_hin_sp_cbse_19_007.',
                  misconception: '**विशिष्ट भ्रान्ति:** छात्र समझते हैं कि **आशय-स्पष्टीकरण = शब्दार्थ + सरल भाषा में अनुवाद**। **वास्तविकता:** CBSE बोर्ड परीक्षा में.' }
          ],
            remediations: { 'cbse': { steps: ['**पहला कदम:** छात्र से कहें — *"एक पंक्ति चुनो और केवल उसका **शब्दार्थ** लिखो।"* फिर पूछें — *"अब बताओ कवि ने यही शब्द.', 'कौन-सा भाव जगाना चाहता था?"* 2.', '**दूसरा कदम:** उसी पंक्ति का **भावार्थ** (सन्दर्भ सहित) लिखवाएँ और दोनों की तुलना करवाएँ। 3.', '**तीसरा कदम:** **4-चरणीय टेम्पलेट** (प्रसंग → शब्दार्थ → भाव-विवेचन → निष्कर्ष) देकर 3-4 पद्यांशों पर अभ्यास करवाएँ, हर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_014', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'If stuck, return to c10_hin_sp_cbse_19_013 (आशय-स्पष्टीकरण और विश्लेषण) and practice.',
          misconception: '**विशिष्ट भ्रांति:** "उत्तर में कविता की अधिकतम पंक्तियाँ उद्धृत करने से पूरे अंक मिलते हैं।" **गलत तर्क:** छात्र मानते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' पर पाठ-आधारित लेखन',
                  options: ['\'पर्वत प्रदेश में पावस\' पर पाठ-आधारित लेखन', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, return to c10_hin_sp_cbse_19_013 (आशय-स्पष्टीकरण और विश्लेषण) and practice writing.',
                  misconception: '**विशिष्ट भ्रांति:** "उत्तर में कविता की अधिकतम पंक्तियाँ उद्धृत करने से पूरे अंक मिलते हैं।" **गलत तर्क:** छात्र मानते हैं कि बोर्ड.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**मॉडल उत्तर विघटन (Model Answer Deconstruction):** बोर्ड के नमूना उत्तर (Sample Answer Key) लें और छात्र से कहें: "हर.', '**\'क्यों?\' खेल (The \'Why?\' Game):** छात्र के हर कथन के बाद आप पूछें "क्यों?" — जब तक वे कविता के विशिष्ट.', '**समयबद्ध माइक्रो-लेखन (Timed Micro-Writing):** रोज़ एक 2-अंक और एक 3-अंक का प्रश्न दें, 5/7 मिनट का टाइमर लगाएँ, फिर.', 'Link केंद्रीय भाव से था?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_19_015', difficulty: 'standard',
          question: '\'पर्वत प्रदेश में पावस\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_19_005 (छंद) और c10_hin_sp_cbse_19_006 (अलंकार).',
          misconception: 'छात्र समझते हैं कि **\'वाचन-पाठ\' का अर्थ केवल \'कविता को जोर से पढ़ देना\' है** और \'चर्चा-बिंदु\' का अर्थ \'प्रश्न पूछ लेना\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'पर्वत प्रदेश में पावस\' पर वाचन-श्रवण और चर्चा-बिंदु',
                  options: ['\'पर्वत प्रदेश में पावस\' पर वाचन-श्रवण और चर्चा-बिंदु', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सुमित्रानंदन पंत का जीवन-वृत्त (जन्म 1900, कौसानी', '\'पर्वत प्रदेश में पावस\' का कथानक', '\'पर्वत प्रदेश में पावस\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो c10_hin_sp_cbse_19_005 (छंद) और c10_hin_sp_cbse_19_006 (अलंकार) को दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि **\'वाचन-पाठ\' का अर्थ केवल \'कविता को जोर से पढ़ देना\' है** और \'चर्चा-बिंदु\' का अर्थ \'प्रश्न पूछ लेना\' है। वे यह नहीं.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र से कहो — "कविता की पहली पंक्ति को **ताली बजाते हुए** पढ़ो (प्रत्येक मात्रा पर एक ताली) — तुम्हें 11.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
