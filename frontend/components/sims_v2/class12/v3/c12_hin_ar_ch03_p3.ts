import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch03_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch03_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch03_p3',
    title: 'कवतिा के बहाने, बात सीधी थी पर · Part 3/3',
    subtitle: 'Words as toys — and as traitors',
    classLevel: 12, subject: 'hin_ar', topic: 'कवतिा के बहाने, बात सीधी थी पर · Part 3/3',
    chapters: ['c12_hin_ar_ch03'],
    nodeIds: ['c12_hin_ar_cbse_03_013', 'c12_hin_ar_cbse_03_014', 'c12_hin_ar_cbse_03_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Experimental poetry reader', intro: 'A post-independence generation decided poetry needed to stop singing and start thinking.', goal: 'Read the two poems through Nayi Kavita\'s break with Chhayavad — play, defamiliarisation and language\'s limits.' },
    discovery: {
        question: '\'Poetry is a house of fungus; poetry is a child\'s game.\' A generation raised on sacred verse reads this — and calls it rebellion. What\'s the real move?',
        options: ['Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped', 'An insult to poetry', 'A nursery rhyme', 'Random metaphors'],
        answer: 'Defamiliarisation — strip poetry of institutional dignity so it reads as something living, messy and rule-breaking instead of worshipped',
        hook: 'Nayi Kavita broke with Chhayavad\'s romantic music for intellectual rigour and colloquial language. The twin poems test language both ways — in one, words are playthings freely mixed; in the other, language stammers and fails the very experience it tries to hold. Play and failure are the same anxiety.',
    },
    teaching: [
        { title: 'कवतिा के बहाने, बात सीधी थी पर — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण (Interpretation/Elucidation of Implication) is the analytical process of uncovering the layered meaning, authorial intent, tonal nuances, and rhetorical strategy behind a specific.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the experimental decade: watch words treated as toys and then as traitors, weigh whether the poem about failed speech itself succeeds, and feel where a generation broke with the old music.',
        labels: ['कवतिा के बहाने, बात'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_013', title: 'Use it in the wild',
          caseStudy: { intro: 'At a student copywriting gig, your teammate wrestles a slogan for hours — forcing synonyms, then rage-quitting: \'The perfect word exists; I just have to grab it and pin it down.\'',
            decisions: [{ prompt: 'What does Raghuvir Sahay\'s \'बात सीधी थी पर\' say about hunting words?', options: [
                { text: 'Stop pinning — the poem shows a word slipping out of language\'s grip and the poet chasing it like a mischievous child; it merges into living language on its own, and the poet\'s job is to receive and restore it, not capture it by force.', outcome: 'The climax is the word\'s assimilation, not its capture — poetry emerges from the friction between word and experience, so wrestling harder is exactly what doesn\'t work.' },
                { text: 'Push harder — discipline means refusing to stop until the word submits.', outcome: 'That\'s the misreading of the chase: the word escapes precisely when gripped; the poem ends not with conquest but with the poet gently returning it to where it lives.', reveals: 'force-catches-words' },
                { text: 'Give up entirely — if words escape by nature, writing is luck, not labour.', outcome: 'The poem is about the poet\'s engaged pursuit, not passivity — the chase matters; what\'s released is the fantasy of total control, not the effort.', reveals: 'writing-is-pure-luck' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_015', title: 'You made it',
          caseStudy: { intro: 'You can now read experimental poetry\'s double edge — language as both the only tool and the trap it can\'t escape.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण (Interpretation/Elucidation of Implication) is the analytical.',
          hint: 'यदि \'विडंबना\' (irony) और \'अंडरस्टेटमेंट\' (understatement) का अंतर स्पष्ट न हो, तो.',
          misconception: 'छात्र \'आशय-स्पष्टीकरण\' को \'भावार्थ लिखना\' समझते हैं। वे पंक्ति का शाब्दिक अनुवाद करके समझते हैं कि कार्य पूरा हो गया।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण (Interpretation/Elucidation of Implication) is the analytical process of',
                  options: ['आशय-स्पष्टीकरण (Interpretation/Elucidation of Implication) is the analytical process of', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि \'विडंबना\' (irony) और \'अंडरस्टेटमेंट\' (understatement) का अंतर स्पष्ट न हो, तो.',
                  misconception: 'छात्र \'आशय-स्पष्टीकरण\' को \'भावार्थ लिखना\' समझते हैं। वे पंक्ति का शाब्दिक अनुवाद करके समझते हैं कि कार्य पूरा हो गया। विशेषतः इस कविता में.' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: छात्र को कविता की कोई एक पंक्ति दें (जैसे "बात सीधी थी पर") और पूछें: "कवि ने ठीक यही शब्द क्यों चुने?', '\'बात सरल थी\' लिखने से क्या फर्क पड़ता?" चरण 2: यदि छात्र केवल शब्दार्थ बताए, तो कहें: "ठीक है, अब मान लो कवि तुम्हारा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है कविता के भाव, उपकरण और केंद्रीय विचार को.',
          hint: 'यदि छात्र PEEL संरचना में \'स्पष्टीकरण\' चरण में फंस जाए तो उसे c12_hin_ar_cbse_03_013.',
          misconception: 'छात्र अक्सर मानते हैं कि परीक्षा-उत्तर में कविता की पंक्तियों को सिर्फ उद्धृत करना पर्याप्त है और स्पष्टीकरण देने की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है कविता के भाव, उपकरण और केंद्रीय विचार को समझकर उसे',
                  options: ['परीक्षा-उत्तर लेखन कौशल का अर्थ है कविता के भाव, उपकरण और केंद्रीय विचार को समझकर उसे', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि छात्र PEEL संरचना में \'स्पष्टीकरण\' चरण में फंस जाए तो उसे c12_hin_ar_cbse_03_013.',
                  misconception: 'छात्र अक्सर मानते हैं कि परीक्षा-उत्तर में कविता की पंक्तियों को सिर्फ उद्धृत करना पर्याप्त है और स्पष्टीकरण देने की आवश्यकता नहीं है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर जैसे "दुख का भाव है क्योंकि \'मन ही मन रोता रहा\'" कैसे PEEL संरचना में बदलता है: पहले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_015', difficulty: 'standard',
          question: '\'वाचन-पाठ और चर्चा-बिंदु\' कविता के मौखिक पाठ (recitation), सही उच्चारण, लय-गति.',
          hint: 'यदि अटका हुआ महसूस हो तो **c12_hin_ar_cbse_03_004** (केंद्रीय भाव) और.',
          misconception: 'छात्र समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल **शुद्ध उच्चारण** और \'चर्चा\' का अर्थ केवल **प्रश्नोत्तर** है। वे कविता को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-पाठ और चर्चा-बिंदु\' कविता के मौखिक पाठ (recitation), सही उच्चारण, लय-गति (rhythm),',
                  options: ['\'वाचन-पाठ और चर्चा-बिंदु\' कविता के मौखिक पाठ (recitation), सही उच्चारण, लय-गति (rhythm),', '\'कविता के बहाने, बात सीधी थी पर\' कविता के रचयिता कुँवर नारायण का संक्षिप्त जीवन परिचय,', 'पद्यांश-वार भावार्थ का अर्थ है कविता के प्रत्येक पद्यांश (stanza/section) का क्रमानुसार,', 'काव्य-संरचना और पद्य-विन्यास का अर्थ है'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c12_hin_ar_cbse_03_004** (केंद्रीय भाव) और **c12_hin_ar_cbse_03_006**.',
                  misconception: 'छात्र समझते हैं कि \'वाचन-पाठ\' का अर्थ केवल **शुद्ध उच्चारण** और \'चर्चा\' का अर्थ केवल **प्रश्नोत्तर** है। वे कविता को **\'सूचना-प्रसारण\'.' }
          ],
            remediations: { 'information-delivery': { steps: ['1) **पुनर्वाचन अभ्यास**: छात्र को कविता की 2 पंक्तियाँ देकर कहें: "इसे तीन तरह से पढ़ो — (क) समाचार वाचक की तरह, (ख).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
