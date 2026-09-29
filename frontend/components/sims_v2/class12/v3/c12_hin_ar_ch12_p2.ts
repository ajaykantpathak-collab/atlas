import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch12_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch12_p2',
    title: 'काले मेघा पानी दे · Part 2/3',
    subtitle: 'Water was free — until someone owned the spring',
    classLevel: 12, subject: 'hin_ar', topic: 'काले मेघा पानी दे · Part 2/3',
    chapters: ['c12_hin_ar_ch12'],
    nodeIds: ['c12_hin_ar_cbse_12_007', 'c12_hin_ar_cbse_12_008', 'c12_hin_ar_cbse_12_009', 'c12_hin_ar_cbse_12_010', 'c12_hin_ar_cbse_12_011', 'c12_hin_ar_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Regional-fiction analyst', intro: 'A hill village, a drying spring, and one woman who will not accept water as charity. The real story is who controls the source.', goal: 'Read Kaale Megha Paani De as a critique of water inequality — nature\'s scarcity meeting power\'s capture.' },
    discovery: {
        question: 'In a Kumaon village, women walk kilometres for a pot of spring water while a hotel pipes it for tourists. Is the thirst natural — or arranged?',
        options: ['Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social', 'Purely natural drought', 'The village refused pipes', 'Hotels need water more'],
        answer: 'Both, but power decides — steep terrain makes water scarce, yet the powerful capture the springs; scarcity is geographical, suffering is social',
        hook: 'The narrator first blames nature; the local, Jija, reveals the system — and her refusal of charity water is the story\'s thesis: \'not alms, but the right to water.\' Shekhar Joshi\'s hill realism turns a drink of water into a claim of dignity.',
    },
    teaching: [
        { title: 'काले मेघा पानी दे — गौण विषय', text: '\'डाकिया के खत\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a spring from source to seizure: weigh geography against power in Uttarakhand\'s thirst, and judge Jija\'s refusal of water offered as charity.',
        labels: ['काले मेघा पानी दे'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_008', title: 'काले मेघा पानी दे — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'डाकिया के खत\' में बिंब ढूँढिए — डाकिया-के-खत — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'What is the definition of imagery in literature? Give one example of visual imagery from the story "dkys es?kk ikuh ns".', options: [
                { text: 'Imagery is descriptive language that appeals to the five senses to create a mental picture', outcome: 'Imagery is descriptive language that appeals to the five senses to create a mental picture.' },
                { text: 'descriptive words', outcome: 'Not quite — Students often think any descriptive adjective is imagery (e.g., "beautiful well" → not imagery.', reveals: 'any-descriptive-adjective-is-imagery' },
                { text: 'beautiful well', outcome: 'Not quite — Students often think any descriptive adjective is imagery (e.g., "beautiful well" → not imagery.', reveals: 'any-descriptive-adjective-is-imagery' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_010', title: 'काले मेघा पानी दे — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'डाकिया के खत\' के मुख्य शब्द: डाकिया-के-खत — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'What is the primary context clue that distinguishes the meaning of "xqM+èkkuh" in the phrase "xqM+èkkuh ns" from its literal composition.', options: [
                { text: 'The primary clue is the collocational pattern "xqM+èkkuh ns" functioning as a compound', outcome: 'The primary clue is the collocational pattern "xqM+èkkuh ns" functioning as a compound verb phrase.' },
                { text: 'xqM+èkkuh ns', outcome: 'Not quite — Students treat the end-of-chapter word list (shabdarth) as definitive meanings, memorizing "v?;Z.', reveals: 'students-treat-the-end-of' },
                { text: '(give) governs the noun', outcome: 'Not quite — Students treat the end-of-chapter word list (shabdarth) as definitive meanings, memorizing "v?;Z.', reveals: 'students-treat-the-end-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family gathering, an uncle declares smartphones have ended loneliness: \'In the postman\'s day one letter decided everything; now everyone is one tap away.\' You recall the story where the man who carried everyone\'s letters died alone.',
            decisions: [{ prompt: 'What does \'डाकिया के खत\' add to the uncle\'s claim?', options: [
                { text: 'The adult narrator notes phones exist now — yet the frame\'s irony is that the postman who connected the whole village had no one to connect to him; technology changed the message\'s speed, not the human need for someone who stays.', outcome: 'The chapter reads connectivity and community as different variables: each letter was a structural hinge for a family\'s fate, and the connector himself ended in isolation — \'one tap away\' doesn\'t manufacture that bond.' },
                { text: 'Agree — instant messaging is objectively better than waiting weeks for a letter, so the loneliness argument is solved.', outcome: 'Speed isn\'t the variable the story measures: the village waited together for the postman, and the narrator\'s retrospective frame exists to show that shared anticipation was the connection — instant delivery removed the commons, not the isolation.', reveals: 'speed-equals-connection' },
                { text: 'Counter that letters were better because waiting built character — reject phones entirely.', outcome: 'The story doesn\'t romanticise scarcity — the death-letter\'s slow devastation shows what the wait cost; the frame critiques modern isolation without prescribing a return to the dak-bungalow era.', reveals: 'old-ways-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_12_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a water story as a rights story — where the poor beg for what nature gave freely, and dignity is refusing the beggar\'s bowl.',
            decisions: [{ prompt: 'What comes next? काले मेघा पानी दे · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — काले मेघा पानी दे · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_007', difficulty: 'standard',
          question: '\'डाकिया के खत\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि अटके तो c12_hin_ar_cbse_12_006 (मुख्य विषय और संदेश) पर लौटें — वहाँ मुख्य विषय की.',
          misconception: 'छात्र अक्सर \'गौण विषय\' को \'मुख्य विषय का छोटा रूप\' या \'कहानी की कोई भी छोटी घटना\' समझ लेते हैं। उदाहरण: वे लिख देते हैं.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डाकिया के खत\' के गौण विषय',
                  options: ['\'डाकिया के खत\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'डाकिया के खत\' का कथानक', '\'डाकिया के खत\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके तो c12_hin_ar_cbse_12_006 (मुख्य विषय और संदेश) पर लौटें — वहाँ मुख्य विषय की पहचान की.',
                  misconception: 'छात्र अक्सर \'गौण विषय\' को \'मुख्य विषय का छोटा रूप\' या \'कहानी की कोई भी छोटी घटना\' समझ लेते हैं। उदाहरण: वे लिख देते हैं — \'गौण विषय: नायक.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से कहें: "पाठ के 5 प्रमुख प्रसंग लिखो जो मुख्य कथानक (पानी खोजना) से अलग हों।" 2.', 'प्रत्येक प्रसंग के आगे लिखवाएँ: "यह प्रसंग कौन-सा सामाजिक/मानवीय मुद्दा उठाता है?" 3.', 'उन मुद्दों को समूहित करें — जो 2+ बार आए, वही गौण विषय हैं। 4.', 'फिर प्रत्येक गौण विषय के लिए PEEL पैराग्राफ लिखने का अभ्यास कराएँ। 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_008', difficulty: 'standard',
          question: '\'डाकिया के खत\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" node from Class 11.',
          misconception: 'Students often think any descriptive adjective is imagery (e.g., "beautiful well" → not imagery because it doesn\'t.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words the difference between a metaphor and a simile.', answer: 'A simile uses "like" or "as" to compare',
                  options: ['A simile uses "like" or "as" to compare', 'they are the same', 'metaphor is stronger', 'beautiful well'],
                  hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" node from Class 11.',
                  misconception: 'Students often think any descriptive adjective is imagery (e.g., "beautiful well" → not imagery because it doesn\'t evoke a sense).' },
                { id: 'b', prompt: 'In the passage where the narrator describes the sound of "pots clattering against each other in the silent night," identify the type of imagery and explain.', answer: 'Auditory imagery',
                  options: ['Auditory imagery', 'visual', 'it shows noise', 'beautiful well'],
                  hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" node from Class 11.',
                  misconception: 'Students often think any descriptive adjective is imagery (e.g., "beautiful well" → not imagery because it doesn\'t evoke a sense).' },
                { id: 'c', prompt: 'Compare the metaphor "water is blood" (implied in the story) with the imagery of "dry throats" used earlier.', answer: '"Dry throats" (tactile imagery) makes the physical suffering immediate',
                  options: ['"Dry throats" (tactile imagery) makes the physical suffering immediate', 'beautiful well', 'water is like life', 'any descriptive adjective is imagery (e'],
                  hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" node from Class 11.',
                  misconception: 'Students often think any descriptive adjective is imagery (e.g., "beautiful well" → not imagery because it doesn\'t evoke a sense).' }
          ],
            remediations: { 'any-descriptive-adjective-is-imagery': { steps: ['Return to the story and pick five sentences; for each, label the sense appealed to (V/A/T/O/G).', 'List every "X is Y" statement in the text; test if "like/as" is absent → metaphor.', 'Re-read the Class 11 node c11_hin_ar_cbse_01_008 for definitions and examples.', 'Re-attempt Diagnostic Questions 1–4, checking each step against the sense-classification and direct-comparison criteria.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think any descriptive adjective is imagery (e.g., "beautiful well" → not imagery because it doesn\'t.',
          parts: [
                { id: 'a', prompt: 'Critique the effectiveness of the metaphor "the well is a temple" (if it appears) in the context of the story\'s critique of superstition.', answer: 'It weakens the rationalist message',
                  options: ['It weakens the rationalist message', 'it\'s beautiful', 'it shows respect', 'beautiful well'],
                  hint: 'If stuck, review the "Literary Devices: Imagery and Metaphor" node from Class 11.',
                  misconception: 'Students often think any descriptive adjective is imagery (e.g., "beautiful well" → not imagery because it doesn\'t evoke a sense).' }
          ],
            remediations: { 'any-descriptive-adjective-is-imagery': { steps: ['Return to the story and pick five sentences; for each, label the sense appealed to (V/A/T/O/G).', 'List every "X is Y" statement in the text; test if "like/as" is absent → metaphor.', 'Re-read the Class 11 node c11_hin_ar_cbse_01_008 for definitions and examples.', 'Re-attempt Diagnostic Questions 1–4, checking each step against the sense-classification and direct-comparison criteria.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_009', difficulty: 'standard',
          question: '\'डाकिया के खत\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि अटके हों, तो c11_hin_ar_cbse_12_009 के WORKED_EXAMPLE_1-2 दोहराएँ — वहाँ.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **विरोधाभास = विरोधाभासी विशेषण** (जैसे "काले मेघा" — काला = अशुभ, मेघा = शुभ)।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डाकिया के खत\' में विरोधाभास',
                  options: ['\'डाकिया के खत\' में विरोधाभास', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'डाकिया के खत\' का कथानक', '\'डाकिया के खत\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटके हों, तो c11_hin_ar_cbse_12_009 के WORKED_EXAMPLE_1-2 दोहराएँ — वहाँ विरोधाभास/प्रतीक की.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि **विरोधाभास = विरोधाभासी विशेषण** (जैसे "काले मेघा" — काला = अशुभ, मेघा = शुभ)। **वास्तविकता**: इस.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1**: छात्र से कहें — "पाठ से वह वाक्य ढूँढ़ो जहाँ तुम्हें लगा \'अरे, यह तो उल्टा हुआ!\'" — वही विरोधाभास का बिंदु.', 'विरोधाभास से क्या **अतिरिक्त प्रभाव** पैदा हुआ?" (उत्तर: पाठक स्वयं निष्कर्ष निकाले, प्रभाव गहरा हो)। **चरण 3**: प्रतीक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_010', difficulty: 'standard',
          question: '\'डाकिया के खत\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, return to c11_hin_ar_cbse_12_010 (Class 11 Chapter 12 Vocabulary in Context).',
          misconception: 'Students treat the end-of-chapter word list (shabdarth) as definitive meanings, memorizing "v?;Z = ty p<+kuk" (craving.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डाकिया के खत\' की पदावली',
                  options: ['\'डाकिया के खत\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'डाकिया के खत\' का कथानक', '\'डाकिया के खत\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, return to c11_hin_ar_cbse_12_010 (Class 11 Chapter 12 Vocabulary in Context) and re-do.',
                  misconception: 'Students treat the end-of-chapter word list (shabdarth) as definitive meanings, memorizing "v?;Z = ty p<+kuk" (craving water) without.' }
          ],
            remediations: { 'students-treat-the-end-of': { steps: ['Have the student reread the specific paragraph where the target word appears, covering the gloss.', 'Ask: "What is the speaker doing/feeling here?', 'What grammatical role does the word play?', 'What cultural ritual or object is referenced?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_011', difficulty: 'standard',
          question: '\'डाकिया के खत\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली.',
          hint: 'यदि शब्द-श्रेणी या वाक्य-भेद पहचानने में अटकें, तो **c11_hin_ar_cbse_12_011 (कक्षा 11.',
          misconception: '**भ्रान्ति:** *"व्याकरण: पाठ में भाषा-प्रयोग का अर्थ है पाठ में आए कठिन शब्दों के अर्थ लिखना, संधि-विच्छेद करना, या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डाकिया के खत\' में भाषा-प्रयोग',
                  options: ['\'डाकिया के खत\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'डाकिया के खत\' का कथानक', '\'डाकिया के खत\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि शब्द-श्रेणी या वाक्य-भेद पहचानने में अटकें, तो **c11_hin_ar_cbse_12_011 (कक्षा 11 आरोह पाठ 12.',
                  misconception: '**भ्रान्ति:** *"व्याकरण: पाठ में भाषा-प्रयोग का अर्थ है पाठ में आए कठिन शब्दों के अर्थ लिखना, संधि-विच्छेद करना, या उपसर्ग-प्रत्यय.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1:** छात्र से कहें — *"पाठ का कोई एक पृष्ठ खोलो। तीन वाक्य छाँटो जो तुम्हें \'ग्रामीण\' लगते हैं। उन्हें यहाँ.', 'वह तत्सम/तद्भव/देशज/विदेशज में से कौन सा है?', 'यदि उसकी जगह तत्सम शब्द रख दें (जैसे \'पनघट\' → \'जलाशय\'), तो दृश्य कैसे बदलेगा?"* **चरण 3:** छात्र को **PEEL शीट** दें: |.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_12_012', difficulty: 'standard',
          question: '\'डाकिया के खत\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि आशय-सूचक उत्तर नहीं बन पा रहे, तो c12_hin_ar_cbse_12_006 (मुख्य विषय) और.',
          misconception: 'छात्र समझते हैं कि \'आशय-सूचक\' प्रश्न का उत्तर पाठ की किसी पंक्ति को उठाकर थोड़ा घुमा-फिराकर लिख देना है — जबकि वास्तव.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डाकिया के खत\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'डाकिया के खत\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'डाकिया के खत\' का कथानक', '\'डाकिया के खत\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि आशय-सूचक उत्तर नहीं बन पा रहे, तो c12_hin_ar_cbse_12_006 (मुख्य विषय) और c12_hin_ar_cbse_12_008.',
                  misconception: 'छात्र समझते हैं कि \'आशय-सूचक\' प्रश्न का उत्तर पाठ की किसी पंक्ति को उठाकर थोड़ा घुमा-फिराकर लिख देना है — जबकि वास्तव में आशय-सूचक उत्तर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पाठ के 3-4 मुख्य प्रसंग दें और प्रत्येक के लिए पूछें: "यहाँ *क्या* हो रहा है?', '(वस्तुनिष्ठ) — यहाँ *क्यों* और *कैसे* हो रहा है?', '(आशय-सूचक)" — दोनों उत्तर साथ-साथ लिखवाएँ। 2.', 'पूर्ववर्ती नोड c12_hin_ar_cbse_12_006 (मुख्य विषय और संदेश) और c12_hin_ar_cbse_12_008 (साहित्यिक युक्तियाँ: बिंब और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
