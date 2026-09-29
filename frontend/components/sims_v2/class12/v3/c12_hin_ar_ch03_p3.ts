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
        { title: 'कवतिा के बहाने, बात सीधी थी पर — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: '\'आरोह भाग-2 — पाठ 3\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_03_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter the experimental decade: watch words treated as toys and then as traitors, weigh whether the poem about failed speech itself succeeds, and feel where a generation broke with the old music.',
        labels: ['कवतिा के बहाने, बात'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_013', title: 'कवतिा के बहाने, बात सीधी थी पर — आशय-स्पष्टीकरण और विश्लेषण अभ्यास',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 3\' का विश्लेषण — NCERT पाठ्यपुस्तक का उद्देश्य क्या सफल हुआ? पाठ से प्रमाण दीजिए।',
            decisions: [{ prompt: 'Define "critical interpretation" in the context of Class 12 Hindi literature. How does it differ from a summary or paraphrase?', options: [
                { text: 'Critical interpretation is an evidence-based argument about a text\'s *how* and *why*', outcome: 'Critical interpretation is an evidence-based argument about a text\'s *how* and *why* — analyzing.' },
                { text: 'explanation', outcome: 'Not quite — **Misconception:** "Critical analysis means finding *the* hidden symbolic meaning the poet intended.', reveals: 'misconception-critical-analysis-means-finding' },
                { text: 'analysis', outcome: 'Not quite — **Misconception:** "Critical analysis means finding *the* hidden symbolic meaning the poet intended.', reveals: 'misconception-critical-analysis-means-finding' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_03_015', title: 'कवतिा के बहाने, बात सीधी थी पर — वाचन-पाठ और चर्चा-बिंदु',
          caseStudy: { intro: '\'आरोह भाग-2 — पाठ 3\' का वाचन कीजिए — फिर चर्चा में राय रखिए।',
            decisions: [{ prompt: 'What are the three metaphors for poetry explicitly stated in the first three stanzas of "dfork ds cgkus"?', options: [
                { text: 'The three metaphors are: (1) poetry as "mM+ku" (stanza 1), (2) poetry as "f[kyuk" (stanza', outcome: 'The three metaphors are: (1) poetry as "mM+ku" (stanza 1), (2) poetry as "f[kyuk" (stanza 3), (3).' },
                { text: 'vk\'k;f', outcome: 'Not quite — Students treat "discussion points" as *opinion-sharing prompts* ("What do you feel about.', reveals: 'students-treat-discussion-points-as' },
                { text: 'lists "lhekk" or "vk\'k', outcome: 'Not quite — Students treat "discussion points" as *opinion-sharing prompts* ("What do you feel about.', reveals: 'students-treat-discussion-points-as' }
            ] }] } },
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
          question: '\'आरोह भाग-2 — पाठ 3\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
          hint: 'If stuck on device-function explanation: revisit Class 11 Chapter 8/9 Literary Devices.',
          misconception: '**Misconception:** "Critical analysis means finding *the* hidden symbolic meaning the poet intended — like a treasure.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-2 — पाठ 3\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'आरोह भाग-2 — पाठ 3\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 3\' का कथानक — \'आरोह भाग-2 — पाठ 3\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck on device-function explanation: revisit Class 11 Chapter 8/9 Literary Devices nodes.',
                  misconception: '**Misconception:** "Critical analysis means finding *the* hidden symbolic meaning the poet intended — like a treasure hunt where \'mM+us\'.' }
          ],
            remediations: { 'misconception-critical-analysis-means-finding': { steps: ['If a student persists in allegorical decoding: 1.', '**Diagnose:** Give them the line "dfork ,d [ksy gS cPpksa osQ cgkus" and ask: "Does the child *mean* something.', 'Or does the meaning *emerge* from the building?" Force the distinction between *intentional symbol* and *emergent.', '**Remediate:** Have them write a 50-word analysis of *only* the verb "midj.k" (participate/engage) in "tM+] psru] vrhr].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Critical analysis means finding *the* hidden symbolic meaning the poet intended — like a treasure.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: "Ooj Ojha\'s poems are simple because they use everyday words like \'mM+us\', \'f[kyus\', \'pwM+h\', \'dhy\'.', answer: 'Refute',
                  options: ['Refute', 'easy vocabulary', 'easy meaning', 'simple language, complex thought'],
                  hint: 'If stuck on device-function explanation: revisit Class 11 Chapter 8/9 Literary Devices nodes.',
                  misconception: '**Misconception:** "Critical analysis means finding *the* hidden symbolic meaning the poet intended — like a treasure hunt where \'mM+us\'.' }
          ],
            remediations: { 'misconception-critical-analysis-means-finding': { steps: ['If a student persists in allegorical decoding: 1.', '**Diagnose:** Give them the line "dfork ,d [ksy gS cPpksa osQ cgkus" and ask: "Does the child *mean* something.', 'Or does the meaning *emerge* from the building?" Force the distinction between *intentional symbol* and *emergent.', '**Remediate:** Have them write a 50-word analysis of *only* the verb "midj.k" (participate/engage) in "tM+] psru] vrhr].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है कविता के भाव, उपकरण और केंद्रीय विचार को.',
          hint: 'यदि छात्र PEEL संरचना में \'स्पष्टीकरण\' चरण में फंस जाए तो उसे c12_hin_ar_cbse_03_013.',
          misconception: 'छात्र अक्सर मानते हैं कि परीक्षा-उत्तर में कविता की पंक्तियों को सिर्फ उद्धृत करना पर्याप्त है और स्पष्टीकरण देने की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल का अर्थ है कविता के भाव, उपकरण और केंद्रीय विचार को समझकर उसे',
                  options: ['परीक्षा-उत्तर लेखन कौशल का अर्थ है कविता के भाव, उपकरण और केंद्रीय विचार को समझकर उसे', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-2 — पाठ 3\' का कथानक — \'आरोह भाग-2 — पाठ 3\' — आरोह भाग-2 का पाठ। पाठ का कथानक,', '\'आरोह भाग-2 — पाठ 3\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र PEEL संरचना में \'स्पष्टीकरण\' चरण में फंस जाए तो उसे c12_hin_ar_cbse_03_013.',
                  misconception: 'छात्र अक्सर मानते हैं कि परीक्षा-उत्तर में कविता की पंक्तियों को सिर्फ उद्धृत करना पर्याप्त है और स्पष्टीकरण देने की आवश्यकता नहीं है.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि एक कमजोर उत्तर जैसे "दुख का भाव है क्योंकि \'मन ही मन रोता रहा\'" कैसे PEEL संरचना में बदलता है: पहले.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_03_015', difficulty: 'standard',
          question: '\'आरोह भाग-2 — पाठ 3\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'Revisit c12_hin_ar_cbse_03_008 (metaphor identification) and c12_hin_ar_cbse_03_013.',
          misconception: 'Students treat "discussion points" as *opinion-sharing prompts* ("What do you feel about childhood?") rather than.',
          parts: [
                { id: 'a', prompt: 'In "ckr lh/h Fkh ij," the speaker says the word "ej xbZ" (went/left) into language.', answer: 'The personification suggests thought (ckr) has agency',
                  options: ['The personification suggests thought (ckr) has agency', 'the speaker controls the word', 'csdkj ?kweus yxh'],
                  hint: 'Revisit c12_hin_ar_cbse_03_008 (metaphor identification) and c12_hin_ar_cbse_03_013 (evaluating.',
                  misconception: 'Students treat "discussion points" as *opinion-sharing prompts* ("What do you feel about childhood?") rather than *text-anchored.' }
          ],
            remediations: { 'students-treat-discussion-points-as': { steps: ['Have the student re-read both poems with a highlighter, marking only lines that make *claims* (not images) — e.g.', 'Convert each claim into a debate motion: "This house believes poetry is a child\'s game."', 'Practice 60-second speeches *for* and *against* using only highlighted lines.', 'Record and playback — count how many sentences start with "The poem says..." vs "I think..." Target: 4:1 ratio.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
