import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch04_p3: SimDef = {
    id: 'v3_c12_hin_ar_ch04_p3',
    title: 'कैमरे में बंद अपाहजि · Part 3/3',
    subtitle: 'He wrote in the people\'s tongue so the people could read it',
    classLevel: 12, subject: 'hin_ar', topic: 'कैमरे में बंद अपाहजि · Part 3/3',
    chapters: ['c12_hin_ar_ch04'],
    nodeIds: ['c12_hin_ar_cbse_04_013', 'c12_hin_ar_cbse_04_014', 'c12_hin_ar_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Progressive poetry reader', intro: 'A poet-journalist who wrote for the ignored decides the poem itself must speak like them.', goal: 'Read Nagarjun through the Progressive movement — Khari Boli as politics, the street performer as systemic critique.' },
    discovery: {
        question: 'Nagarjun chooses Khari Boli — the people\'s spoken tongue — over Sanskritised literary Hindi, for poems about peasants and street performers. What does the language choice itself declare?',
        options: ['Democratic intent — the poem must be readable by the very people it depicts; medium is the politics', 'Khari Boli is easier to write', 'Sanskrit was banned', 'Nothing — language is neutral'],
        answer: 'Democratic intent — the poem must be readable by the very people it depicts; medium is the politics',
        hook: 'Progressive poets like Nagarjun — journalist, trilingual, champion of the ignored — prove the micro reveals the macro: a street performer\'s day exposes the whole machinery of exploitation. Journalism trained the eye; poetry carried the indictment.',
    },
    teaching: [
        { title: 'कैमरे में बंद अपाहजि — आशय-स्पष्टीकरण और विश्लेषण अभ्यास', text: 'आशय-स्पष्टीकरण (Interpretation/Explanation of intent) is the analytical skill of uncovering the poet\'s underlying purpose, perspective, and message by closely examining word choice, imagery, tone.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Walk with the street performer: read rustic speech as deliberate politics, trace how one \'small\' life opens onto the entire structure that exploits it, and test why context turns description into critique.',
        labels: ['कैमरे में बंद अपाहजि'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_014', title: 'कैमरे में बंद अपाहजि — परीक्षा-उत्तर लेखन कौशल',
          caseStudy: { intro: 'You sit down for your Hindi board exam, see a 5-mark question on "कैमरे में बंद अपाहजि", and your mind goes blank — sound familiar?',
            decisions: [{ prompt: '"कैमरे में बंद अपाहजि" शीर्षक में प्रयुक्त \'कैमरा\' शब्द किस साहित्यिक युक्ति का उदाहरण है और इसका केंद्रीय प्रतीकात्मक अर्थ क्या है?', options: [
                { text: 'Correct: \'कैमरा\' रूपक (metaphor) है जो मीडिया की घुसपैठी, वस्तुनिष्ठ और अमानवीय दृष्टि को', outcome: 'Correct: \'कैमरा\' रूपक (metaphor) है जो मीडिया की घुसपैठी, वस्तुनिष्ठ और अमानवीय दृष्टि को दर्शाता.' },
                { text: 'camera = media gaze', outcome: 'Not quite — Students believe "good answer = more points/facts." They write 10 bullet points for a 3-mark.', reveals: 'good-answer-more-points-facts' },
                { text: 'good answer = more points/facts', outcome: 'Not quite — Students believe "good answer = more points/facts." They write 10 bullet points for a 3-mark.', reveals: 'good-answer-more-points-facts' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'After a funds scandal in your student council, your group\'s protest poster is all slogans — \'We will shout for change!\' A senior suggests adding a line addressing each silent member by name, and clipping the actual audit report to the bottom.',
            decisions: [{ prompt: 'What does the structure of \'देश में चाँद विकृत\' say about the senior\'s edits?', options: [
                { text: 'Keep both — the poem\'s arc runs collective declaration (\'we\') → direct accusation (\'you\') → documentary proof; slogans alone rage at the air, but naming the complacent and ending with the audit clipping converts protest into verified indictment.', outcome: 'The poem performs its argument through structural stages, finishing with a newspaper report that turns poetic charge into documented fact — the senior is rebuilding exactly that engine.' },
                { text: 'Drop the audit — raw collective emotion is more powerful than paperwork.', outcome: 'The poem deliberately ends with reportage, not refrain: the clipping is the climax that proves \'vikrit\' isn\'t exaggeration but record; without it the poster stays an unfalsifiable mood.', reveals: 'rage-beats-record' },
                { text: 'Drop the \'you\' lines — naming members turns unity into blame.', outcome: 'The poem\'s middle stanzas are precisely the turn from \'we\' to \'you\' — the interrogation of the complacent is what makes the final evidence land; skipping it leaves only self-congratulation.', reveals: 'unity-means-no-accusation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'You can now hear a poem\'s language as its argument — and see how progressive literature makes the marginal the centre.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_013', difficulty: 'standard',
          question: 'आशय-स्पष्टीकरण (Interpretation/Explanation of intent) is the analytical skill.',
          hint: 'यदि \'कैमरा\' को रूपक (metaphor) न मान पा रहे हों, तो c12_hin_ar_cbse_04_007 (प्रतीक) के.',
          misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि कविता \'विकलांग व्यक्तियों की पीड़ा\' (suffering of disabled persons) पर केंद्रित.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आशय-स्पष्टीकरण (Interpretation/Explanation of intent) is the analytical skill of',
                  options: ['आशय-स्पष्टीकरण (Interpretation/Explanation of intent) is the analytical skill of', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,'],
                  hint: 'यदि \'कैमरा\' को रूपक (metaphor) न मान पा रहे हों, तो c12_hin_ar_cbse_04_007 (प्रतीक) के \'कैमरा.',
                  misconception: '**विशिष्ट भ्रम:** छात्र मानते हैं कि कविता \'विकलांग व्यक्तियों की पीड़ा\' (suffering of disabled persons) पर केंद्रित है, जबकि कविता का.' }
          ],
            remediations: { 'suffering-of-disabled-persons': { steps: ['**पुनः पढ़ें:** कविता को **तीन बार** पढ़ें — पहली बार: केवल ध्वनि/लय के लिए (कैमरे की \'क्लिक\' ध्वनि सुनें)। दूसरी बार.', '**तुलना करें:** c12_hin_ar_cbse_04_007 (प्रतीक) और c12_hin_ar_cbse_04_008 (मुख्य भाव) के नोट्स देखें — विशेष रूप से.', '**लिखें:** 50 शब्दों में उत्तर दें: "कवि अपाहिज पर नहीं, कैमरे पर क्यों व्यंग्य करता है?" — फिर अपने उत्तर की तुलना.', '**पुनः निदान:** DIAGNOSTIC_QUESTION_2 और 4 को दोबारा हल करें — इस बार \'विरोधाभास\' और \'प्रतीक-उलटफेर\' पर फोकस करें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_014', difficulty: 'standard',
          question: 'परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) is the systematic ability.',
          hint: 'यदि साक्ष्य चयन (Evidence) में अटके — c12_hin_ar_cbse_04_002 (पद्यांश-वार भावार्थ).',
          misconception: 'Students believe "good answer = more points/facts." They write 10 bullet points for a 3-mark question, quoting entire.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) is the systematic ability to',
                  options: ['परीक्षा-उत्तर लेखन कौशल (Exam Answer Writing Skill) is the systematic ability to', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,'],
                  hint: 'यदि साक्ष्य चयन (Evidence) में अटके — c12_hin_ar_cbse_04_002 (पद्यांश-वार भावार्थ) दोहराएँ; यदि.',
                  misconception: 'Students believe "good answer = more points/facts." They write 10 bullet points for a 3-mark question, quoting entire stanzas, but miss the.' }
          ],
            remediations: { 'good-answer-more-points-facts': { steps: ['Take one 3-mark question from the last 5 years\' papers. Write a "bad answer" deliberately (list devices,.', 'Together, convert it to PEEL — highlight Point in yellow, Evidence in green, Explanation in blue, Link in pink.', 'Student writes 3 fresh answers using the color code.', 'Compare with CBSE model answers — mark where their Explanation is thin.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_014', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "good answer = more points/facts." They write 10 bullet points for a 3-mark question, quoting entire.',
          parts: [
                { id: 'a', prompt: 'कथन का मूल्यांकन कीजिए: "कैमरे में बंद अपाहजि केवल मीडिया आलोचना की कविता है, विकलांगता विमर्श की नहीं।" अपने उत्तर में कविता के कम से कम दो प्रसंगों का उल्लेख.', answer: 'Correct: कथन आंशिक रूप से सत्य किंतु अपूर्ण है। मीडिया आलोचना प्रमुख है',
                  options: ['Correct: कथन आंशिक रूप से सत्य किंतु अपूर्ण है। मीडिया आलोचना प्रमुख है', 'उसके पैर नहीं / पर पंख हैं', 'अपने अस्तित्व का सवाल', 'good answer = more points/facts'],
                  hint: 'यदि साक्ष्य चयन (Evidence) में अटके — c12_hin_ar_cbse_04_002 (पद्यांश-वार भावार्थ) दोहराएँ; यदि.',
                  misconception: 'Students believe "good answer = more points/facts." They write 10 bullet points for a 3-mark question, quoting entire stanzas, but miss the.' }
          ],
            remediations: { 'good-answer-more-points-facts': { steps: ['Take one 3-mark question from the last 5 years\' papers. Write a "bad answer" deliberately (list devices,.', 'Together, convert it to PEEL — highlight Point in yellow, Evidence in green, Explanation in blue, Link in pink.', 'Student writes 3 fresh answers using the color code.', 'Compare with CBSE model answers — mark where their Explanation is thin.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_04_015', difficulty: 'standard',
          question: '\'वाचन-पाठ और चर्चा-बिंदु\' काव्य-अध्ययन की वह सहभागितामूलक प्रक्रिया है जिसमें.',
          hint: 'यदि प्रतीक-योजना अस्पष्ट हो तो c12_hin_ar_cbse_04_007 (प्रतीक) पर वापस जाएँ और \'कैमरा\' व.',
          misconception: 'छात्र अक्सर समझते हैं कि \'वाचन-पाठ और चर्चा\' का अर्थ है कविता का \'सारांश याद करना\' या \'भावार्थ लिखना\'। वे चर्चा को.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वाचन-पाठ और चर्चा-बिंदु\' काव्य-अध्ययन की वह सहभागितामूलक प्रक्रिया है जिसमें कविता का',
                  options: ['\'वाचन-पाठ और चर्चा-बिंदु\' काव्य-अध्ययन की वह सहभागितामूलक प्रक्रिया है जिसमें कविता का', 'कैमरे में बंद अपाहजि एक ऐसी कविता है जिसमें कवि एक शारीरिक रूप से असमर्थ व्यक्ति को कैमरे', '\'पद्यांश-वार भावार्थ\' का अर्थ है कविता के प्रत्येक पद्यांश (स्टैंज़ा) का क्रमवार, सरल', 'काव्य-संरचना और पद्य-विन्यास से तात्पर्य कविता के आंतरिक ढांचे से है जिसमें छंद,'],
                  hint: 'यदि प्रतीक-योजना अस्पष्ट हो तो c12_hin_ar_cbse_04_007 (प्रतीक) पर वापस जाएँ और \'कैमरा\' व \'चीज़\'.',
                  misconception: 'छात्र अक्सर समझते हैं कि \'वाचन-पाठ और चर्चा\' का अर्थ है कविता का \'सारांश याद करना\' या \'भावार्थ लिखना\'। वे चर्चा को \'प्रश्नोत्तर\' सत्र मानते.' }
          ],
            remediations: { 'cuet': { steps: ['यदि छात्र उपरोक्त निदानात्मक प्रश्नों में 3 से कम सही कर पाए, तो उन्हें इस क्रम में पुनर्अभ्यास कराएँ: १).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
