import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch12_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch12_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch12_p3',
    title: 'काले मेघा पानी दे · Part 3/3',
    subtitle: 'Water was free — until someone owned the spring',
    classLevel: 12, subject: 'hin_ar', topic: 'काले मेघा पानी दे · Part 3/3',
    chapters: ['c12_hin_ar_ch12'],
    nodeIds: ['c12_hin_ar_cbse_12_013', 'c12_hin_ar_cbse_12_014', 'c12_hin_ar_cbse_12_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-fiction analyst', intro: 'A hill village, a drying spring, and one woman who will not accept water as charity. The real story is who controls the source.', goal: 'Read Kaale Megha Paani De as a critique of water inequality — nature\'s scarcity meeting power\'s capture.' },
    discovery: {
        question: 'In a Kumaon village, women walk kilometres for a pot of spring water while a hotel pipes it for tourists. Is the thirst natural — or arranged?',
        options: ['Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social', 'Purely natural drought', 'The village refused pipes', 'Hotels need water more'],
        answer: 'Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social',
        hook: 'The narrator first blames nature; the local, Jija, reveals the system — and her refusal of charity water is the story\'s thesis: \'not alms, but the right to water.\' Shekhar Joshi\'s hill realism turns a drink of water into a claim of dignity.',
    },
    teaching: [
        { title: 'काले मेघा पानी दे — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ का **व्यवस्थित विश्लेषण और व्याख्या** है जिसमें पाठ की संरचना, भाषा-शैली, बिंब-प्रतीक, पात्र-चित्रण, विषय-वस्तु, और लेखकीय दृष्टिकोण को.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_12_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a spring from source to seizure: weigh geography against power in Uttarakhand\'s thirst, and judge Jija\'s refusal of water offered as charity.',
        labels: ['काले मेघा पानी दे'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family gathering, an uncle declares smartphones have ended loneliness: \'In the postman\'s day one letter decided everything; now everyone is one tap away.\' You recall the story where the man who carried everyone\'s letters died alone.',
            decisions: [{ prompt: 'What does \'डाकिया के खत\' add to the uncle\'s claim?', options: [
                { text: 'The adult narrator notes phones exist now — yet the frame\'s irony is that the postman who connected the whole village had no one to connect to him; technology changed the message\'s speed, not the human need for someone who stays.', outcome: 'The chapter reads connectivity and community as different variables: each letter was a structural hinge for a family\'s fate, and the connector himself ended in isolation — \'one tap away\' doesn\'t manufacture that bond.' },
                { text: 'Agree — instant messaging is objectively better than waiting weeks for a letter, so the loneliness argument is solved.', outcome: 'Speed isn\'t the variable the story measures: the village waited together for the postman, and the narrator\'s retrospective frame exists to show that shared anticipation was the connection — instant delivery removed the commons, not the isolation.', reveals: 'speed-equals-connection' },
                { text: 'Counter that letters were better because waiting built character — reject phones entirely.', outcome: 'The story doesn\'t romanticise scarcity — the death-letter\'s slow devastation shows what the wait cost; the frame critiques modern isolation without prescribing a return to the dak-bungalow era.', reveals: 'old-ways-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_015', title: 'You made it',
          caseStudy: { intro: 'You can now read a water story as a rights story — where the poor beg for what nature gave freely, and dignity is refusing the beggar\'s bowl.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ का **व्यवस्थित विश्लेषण.',
          hint: 'यदि **बिंब-प्रतीक का अंतर** न समझ आए तो c12_hin_ar_cbse_12_008 (बिंब-रूपक) और.',
          misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि आलोचनात्मक चिंतन = **\'अपनी राय देना\' (giving opinion)** या **\'कहानी का नैतिक सबक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ का **व्यवस्थित विश्लेषण और',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) किसी साहित्यिक पाठ का **व्यवस्थित विश्लेषण और', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और'],
                  hint: 'यदि **बिंब-प्रतीक का अंतर** न समझ आए तो c12_hin_ar_cbse_12_008 (बिंब-रूपक) और.',
                  misconception: '**सबसे घातक भ्रम:** छात्र समझते हैं कि आलोचनात्मक चिंतन = **\'अपनी राय देना\' (giving opinion)** या **\'कहानी का नैतिक सबक बताना\' (stating.' }
          ],
            remediations: { 'giving-opinion-stating-moral-lesson': { steps: ['**चरण 1:** छात्र को **\'क्या हुआ\' (plot summary)** और **\'कैसे/क्यों हुआ\' (analysis)** का अंतर स्पष्ट करें — एक पैराग्राफ.', 'क्या सुझाया?"* **चरण 3:** **विरोधाभास (irony)** के प्रकारों (स्थितिजन्य, नाटकीय, शाब्दिक) का **मिनी-चार्ट** बनवाएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_014', difficulty: 'standard',
          question: 'लेखन कौशल: पाठ-आधारित का अर्थ है NCERT पाठ्यपुस्तक के किसी गद्य/पद्य अंश से.',
          hint: 'यदि PEEL संरचना याद न रहे तो c11_hin_ar_cbse_01_014 के कार्यित उदाहरण (Worked Examples).',
          misconception: 'छात्र मानते हैं कि \'पाठ-आधारित लेखन\' का अर्थ है पाठ का सारांश लिखना या पात्रों का वर्णन करना। वास्तव में बोर्ड परीक्षा.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'लेखन कौशल: पाठ-आधारित का अर्थ है NCERT पाठ्यपुस्तक के किसी गद्य/पद्य अंश से प्रमाण',
                  options: ['लेखन कौशल: पाठ-आधारित का अर्थ है NCERT पाठ्यपुस्तक के किसी गद्य/पद्य अंश से प्रमाण', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और'],
                  hint: 'यदि PEEL संरचना याद न रहे तो c11_hin_ar_cbse_01_014 के कार्यित उदाहरण (Worked Examples) दोबारा.',
                  misconception: 'छात्र मानते हैं कि \'पाठ-आधारित लेखन\' का अर्थ है पाठ का सारांश लिखना या पात्रों का वर्णन करना। वास्तव में बोर्ड परीक्षा में हर प्रश्न एक.' }
          ],
            remediations: { 'theme': { steps: ['चरण 1: छात्र से कहें कि वह पिछले बोर्ड पेपर का कोई 5-अंकीय प्रश्न ले और उसका अपना लिखा उत्तर सामने रखे। चरण 2: साथ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक सहयोगी भाषा-कौशल गतिविधि है जिसमें छात्र पाठ को.',
          hint: 'यदि अटके तो c12_hin_ar_cbse_12_008 (बिंब/रूपक) दोबारा पढ़ें — बिंब ही वाचन के.',
          misconception: 'छात्र समझते हैं कि \'वाचन-श्रवण: चर्चा-बिंदु\' केवल \'जोर से पढ़ना और बोलना\' है — वे इसे मौखिक परीक्षा की तैयारी मानते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक सहयोगी भाषा-कौशल गतिविधि है जिसमें छात्र पाठ को सामूहिक रूप से',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक सहयोगी भाषा-कौशल गतिविधि है जिसमें छात्र पाठ को सामूहिक रूप से', '\'काले मेघा पानी दे\' कवि **धूमिल** (सुदामा पांडेय) की एक प्रसिद्ध कविता है जो ग्रामीण भारत', 'कथानक (Plot) कहानी की घटनाओं का तार्किक और कारण-कार्य (Cause-Effect) पर आधारित क्रमबद्ध', '"पाठ्य-परिवेश और वातावरण" किसी रचना में वर्णित भौगोलिक, सामाजिक, सांस्कृतिक, आर्थिक और'],
                  hint: 'यदि अटके तो c12_hin_ar_cbse_12_008 (बिंब/रूपक) दोबारा पढ़ें — बिंब ही वाचन के \'दृश्य-निर्माण\' का.',
                  misconception: 'छात्र समझते हैं कि \'वाचन-श्रवण: चर्चा-बिंदु\' केवल \'जोर से पढ़ना और बोलना\' है — वे इसे मौखिक परीक्षा की तैयारी मानते हैं, साहित्यिक विश्लेषण.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को पाठ का एक छोटा अंश (3-4 वाक्य) दें और कहें: "इसे तीन तरह से पढ़ो — (क) समाचार वाचन शैली में, (ख) कविता.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
