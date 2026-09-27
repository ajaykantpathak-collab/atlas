import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch11_p3: SimDef = {
    id: 'v3_c12_hin_a_ch11_p3',
    title: 'सुमरिनिी के मनके · Part 3/3',
    subtitle: 'Three stories, one evolving conscience',
    classLevel: 12, subject: 'hin_a', topic: 'सुमरिनिी के मनके · Part 3/3',
    chapters: ['c12_hin_a_ch11'],
    nodeIds: ['c12_hin_a_cbse_11_013', 'c12_hin_a_cbse_11_014', 'c12_hin_a_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Premchand scholar', intro: 'A village schoolteacher who resigned for the nation wrote India\'s conscience in three registers — hope, grit and moral courage.', goal: 'Situate Lajwanti, Kafan and Maine Kaha Tha within Premchand\'s creative periods and nationalist arc.' },
    discovery: {
        question: 'One author writes \'Lajwanti,\' \'Kafan\' and \'Maine Kaha Tha\' — reformist hope in one, bitter disillusion in another. What changed between them?',
        options: ['His periods — the early didactic reformer of 1903 became, by the Madhuri years, a structurally critical writer who\'d resigned his post for the nationalist cause and saw deeper than individual failing', 'Different ghostwriters', 'He aged, nothing more', 'Stories vary randomly'],
        answer: 'His periods — the early didactic reformer of 1903 became, by the Madhuri years, a structurally critical writer who\'d resigned his post for the nationalist cause and saw deeper than individual failing',
        hook: 'Reading all three as \'social reform tales\' flattens his evolution — Kafan\'s Ghisu-Madhav aren\'t just poor, they\'re a verdict on a system. And his nine-language reach lives inside the prose: rustic village speech beside Sanskritised commentary is strategy, not inconsistency.',
    },
    teaching: [
        { title: 'सुमरिनिी के मनके — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें पाठ को गहराई से पढ़कर उसके विषय, भाव, पात्र-चित्रण, साहित्यिक युक्तियों और लेखक के उद्देश्य का तार्किक विश्लेषण किया जाता है, ताकि उसके निहितार्थ को समझा जा.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_11_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read Premchand across his own evolution: separate the reformer\'s hope from the disillusioned analyst, weigh resignation as authorial act, and test whether education alone transforms material life.',
        labels: ['सुमरिनिी के मनके —'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a school internship, a tribal scholarship boy refuses to recite the expected answers or name the textbook he was handed — he just says he belongs to the wild and slips away. The staff room has already filed him as \'difficult, unteachable.\'',
            decisions: [{ prompt: 'What does the story \'बालक बच गया\' read in his refusal?', options: [
                { text: 'A climax of self-keeping — the boy\'s defiant \'I am a wild one\' is the peak the questioning was building toward, and his \'Yaw\' and escape release it; the file on him reads defiance where the story reads a child refusing to be renamed by the institution.', outcome: 'The chapter\'s structural point: the struggle scenes rise toward the refusal, not the obedience — so \'unteachable\' records the school\'s failure to see what his refusal was protecting.' },
                { text: 'Side with the staff — he won\'t answer, so the verdict of \'unteachable\' is a fair label.', outcome: 'The story treats the interrogation itself as the problem: the adults\' questions measure him against a script he never agreed to, so his silence is evidence of the script\'s failure, not his.', reveals: 'noncompliance-equals-inability' },
                { text: 'Coach him to give the expected answers so he can get through and leave.', outcome: 'That\'s the assimilation route the story\'s climax rejects — his escape with identity intact is the \'bach gaya\' the title means; coaching him to recite would be the institution winning after all.', reveals: 'compliance-equals-survival' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'You can now track a writer\'s changing lens across a career — and hear the difference between reforming a society and indicting it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें पाठ को गहराई से पढ़कर उसके विषय, भाव.',
          hint: 'पात्र-चित्रण के आधारभूत तत्वों (उपस्थिति, कार्य, संवाद, विचार) की समीक्षा करें—विशेष रूप.',
          misconception: 'छात्र अक्सर आलोचनात्मक चिंतन को पाठ के भावों का mere identification (जैसे "यह दुखद है") समझ लेते हैं और इसे पर्याप्त.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें पाठ को गहराई से पढ़कर उसके विषय, भाव,',
                  options: ['आलोचनात्मक चिंतन वह प्रक्रिया है जिसमें पाठ को गहराई से पढ़कर उसके विषय, भाव,', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा'],
                  hint: 'पात्र-चित्रण के आधारभूत तत्वों (उपस्थिति, कार्य, संवाद, विचार) की समीक्षा करें—विशेष रूप से.',
                  misconception: 'छात्र अक्सर आलोचनात्मक चिंतन को पाठ के भावों का mere identification (जैसे "यह दुखद है") समझ लेते हैं और इसे पर्याप्त मान लेते हैं, जबकि.' }
          ],
            remediations: { 'mere-identification': { steps: ['छात्र से कहिए कि वह एक ऐसा वाक्य चुनें जहाँ उसे भाव मजबूत लगा हो (जैसे "मन ciężार से भर गया")। फिर उनसे पूछिए: (1) कौन.', '(भार), (2) इस शब्द का सामान्य अर्थ क्या है?', '(भौतिक वजन), (3) यहाँ इसका क्या अर्थ हो सकता है?', '(मानसिक तनाव), (4) लेखक ने वजन जैसे शब्द का प्रयोग क्यों किया?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित वह क्षमता है जिसमें पाठ को पढ़कर, उसकी मुख्य बात को.',
          hint: 'यदि छात्र फंस जाए तो c12_hin_a_cbse_11_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या) की.',
          misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में लंबा होना ही गुणवत्ता है, इसलिए वे अनावश्यक विवरण या पाठ की दोहराव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित वह क्षमता है जिसमें पाठ को पढ़कर, उसकी मुख्य बात को समझकर, उसके',
                  options: ['लेखन कौशल: पाठ-आधारित वह क्षमता है जिसमें पाठ को पढ़कर, उसकी मुख्य बात को समझकर, उसके', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा'],
                  hint: 'यदि छात्र फंस जाए तो c12_hin_a_cbse_11_013 (आलोचनात्मक चिंतन: विश्लेषण और व्याख्या) की समीक्षा करें।',
                  misconception: 'छात्र अक्सर मानते हैं कि पाठ-आधारित उत्तर में लंबा होना ही गुणवत्ता है, इसलिए वे अनावश्यक विवरण या पाठ की दोहराव में समय बर्बाद कर देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक लंबा लेकिन असंबंधित उत्तर और एक छोटा लेकिन सटीक उत्तर कैसे अलग होते हैं। फिर एक प्रश्न दीजिए और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_11_015', difficulty: 'standard',
          question: 'वाचन-श्रवण वह प्रक्रिया है जिसमें पाठ को उच्च स्वर में पढ़कर (वाचन) और उसे.',
          hint: 'यदि छात्र वाचन-श्रवण में भाव को समझने में कठिनाई महसूस कर रहा है, तो कक्षा 11 के.',
          misconception: 'छात्र अक्सर मानते हैं कि वाचन-श्रवण का अर्थ केवल पाठ को गलती-free तरीके से पढ़ना है — जैसे कि सही उच्चारण और बिना किसी.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण वह प्रक्रिया है जिसमें पाठ को उच्च स्वर में पढ़कर (वाचन) और उसे ध्यान से सुनकर',
                  options: ['वाचन-श्रवण वह प्रक्रिया है जिसमें पाठ को उच्च स्वर में पढ़कर (वाचन) और उसे ध्यान से सुनकर', '\'सुमिरनी के मनके\' सुप्रसिद्ध कथाकार **मैत्रेयी पुष्पा** द्वारा रचित एक **आंचलिक उपन्यास**', '\'कथानक\' (Plot) कहानी की घटनाओं का कारण-परिणाम-आधारित तार्किक क्रम है, जबकि', 'पाठ्य-परिवेश वह ऐतिहासिक, सामाजिक, सांस्कृतिक और भौतिक परिस्थिति है जिसमें कोई पाठ लिखा'],
                  hint: 'यदि छात्र वाचन-श्रवण में भाव को समझने में कठिनाई महसूस कर रहा है, तो कक्षा 11 के.',
                  misconception: 'छात्र अक्सर मानते हैं कि वाचन-श्रवण का अर्थ केवल पाठ को गलती-free तरीके से पढ़ना है — जैसे कि सही उच्चारण और बिना किसी रुकावट के। वे यह.' }
          ],
            remediations: { 'free-true': { steps: ['छात्र को पहले किसी भावनात्मक रूप से स्पष्ट पाठ (जैसे एक प्रार्थना या एक शोकगीत) दिया जाए। उनसे कहा जाए कि वे इसे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
