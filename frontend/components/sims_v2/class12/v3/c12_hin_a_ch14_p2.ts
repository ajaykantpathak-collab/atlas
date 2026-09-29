import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch14_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch14_p2: SimDef = {
    id: 'v3_c12_hin_a_ch14_p2',
    title: 'शेर, पहचान, चार हाथ, साझा · Part 2/3',
    subtitle: 'A lid on the well, a gag on the people',
    classLevel: 12, subject: 'hin_a', topic: 'शेर, पहचान, चार हाथ, साझा · Part 2/3',
    chapters: ['c12_hin_a_ch14'],
    nodeIds: ['c12_hin_a_cbse_14_007', 'c12_hin_a_cbse_14_008', 'c12_hin_a_cbse_14_009', 'c12_hin_a_cbse_14_010', 'c12_hin_a_cbse_14_011', 'c12_hin_a_cbse_14_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Satire reader', intro: 'Four short stories from a journalist\'s pen — each one a different machine for how power eats the weak.', goal: 'Read the four stories as variations on power and resistance in Asghar Wajahat\'s satirical voice.' },
    discovery: {
        question: 'A kingdom covers a well\'s mouth so no voice escapes; a magician rules by fear; a fakir trades men\'s limbs; a servant outwits his master — four stories, one theme. Which?',
        options: ['Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose', 'Magic and fantasy', 'Village comedy', 'Random variety'],
        answer: 'Power devouring the powerless — satire at two scales: state-level totalitarianism and household-level exploitation, both exposed through wry, colloquial prose',
        hook: 'The journalist\'s craft is the giveaway — simple spoken language carrying sharp satire; even the glossary is a code: \'myaan\' (scabbard) hints at hidden violence, the fakir\'s words flag hypocrisy. The well\'s lid is the citizenry\'s gagged voice.',
    },
    teaching: [
        { title: 'शेर, पहचान, चार हाथ, साझा — गौण विषय', text: '\'अंतरा भाग-2 — पाठ 14\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_14_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the satire four ways: unmask the well\'s lid as silenced dissent, split state-scale from household-scale power, and read the vocabulary list as a map of the stories\' politics.',
        labels: ['शेर, पहचान, चार हाथ,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_a_cbse_14_009', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['Connect to theme — the irony underscores that blind faith.', 'Name the irony type — situational irony because the act.', 'Identify the expectation — the crowd believed the beak gave.', 'Identify the literal event — the crow dies when the.', 'Write PEEL response — Point: The crow\'s death.'], answer: 'Identify the literal event — the crow dies when the. Identify the expectation — the crowd believed the beak gave. Name the irony type — situational irony because the act. Connect to theme — the irony underscores that blind faith. Write PEEL response — Point: The crow\'s death.' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your hostel reports a wobbly fan. Weeks later it\'s a \'case\' — the warden consulted the electrician, who consulted the engineer, who proposed a structural audit, who now wants a committee — while the fan still wobbles.',
            decisions: [{ prompt: 'Which of Asghar Wajahat\'s story structures is playing out?', options: [
                { text: '\'चार हाथ\' — the consultative chain where each expert inflates a simple problem into an elaborate procedure; the satire is that consultation replaces repair, so name the chain and fix the fan.', outcome: 'The story\'s bottom-up repetition exists to show bureaucracy compounding — every added opinion multiplies absurdity while the object stays broken; recognising the structure is the way out of it.' },
                { text: '\'शेर\' — the mystery story where appearances deceive, so the fan probably isn\'t the real issue.', outcome: 'That misapplies the chapter\'s suspense structure to a satire problem: nothing here is hidden or supernatural — the failure is fully visible, which is exactly what the consultative-chain story mocks.', reveals: 'every-mess-is-mystery' },
                { text: 'Wait it out — each consultation is a real step, so the process is working as designed.', outcome: 'The story\'s chain is \'working\' only in the sense that it keeps moving; the diagnosis it offers is that motion through offices is a substitute for — not a route to — the repair.', reveals: 'process-equals-progress' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_14_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a satirist\'s quartet as one argument about power — and spot how a lid on a well is a lid on a people.',
            decisions: [{ prompt: 'What comes next? शेर, पहचान, चार हाथ, साझा · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — शेर, पहचान, चार हाथ, साझा · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_007', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 14\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि मुख्य विषय पहचानने में कठिनाई हो, तो c12_hin_a_cbse_14_006 (मुख्य विषय और संदेश) को.',
          misconception: 'छात्र अक्सर गौण विषय को मुख्य विषय का केवल एक उदाहरण या दोहराव मानते हैं, जैसे यदि मुख्य विषय पहचान है तो कोई भी पात्र.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 14\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'अंतरा भाग-2 — पाठ 14\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 14\' का कथानक — \'अंतरा भाग-2 — पाठ 14\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि मुख्य विषय पहचानने में कठिनाई हो, तो c12_hin_a_cbse_14_006 (मुख्य विषय और संदेश) को दोबारा.',
                  misconception: 'छात्र अक्सर गौण विषय को मुख्य विषय का केवल एक उदाहरण या दोहराव मानते हैं, जैसे यदि मुख्य विषय पहचान है तो कोई भी पात्र द्वारा अपनी भाषा.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दिखाइए कि मुख्य विषय एक व्यापक छाता है (जैसे "पहचान का संकट") और गौण विषय उसके तहत आने वाली विशिष्ट शाखाएँ हैं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_008', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 14\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि फंसे तो कक्षा 11 के c11_hin_a_cbse_01_008 नोड पर वापस जाकर बिंब और रूपक की आधारभूत.',
          misconception: 'छात्र अक्सर सोचते हैं कि यदि कोई शब्द कविता में भावनात्मक है (जैसे "सिंह", "अग्नि"), तो वह स्वतः रूपक है। वे भूल जाते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 14\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
                  options: ['\'अंतरा भाग-2 — पाठ 14\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 14\' का कथानक — \'अंतरा भाग-2 — पाठ 14\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फंसे तो कक्षा 11 के c11_hin_a_cbse_01_008 नोड पर वापस जाकर बिंब और रूपक की आधारभूत परिभाषाओं की.',
                  misconception: 'छात्र अक्सर सोचते हैं कि यदि कोई शब्द कविता में भावनात्मक है (जैसे "सिंह", "अग्नि"), तो वह स्वतः रूपक है। वे भूल जाते हैं कि रूपक तभी होता.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र से पूछो: "क्या कवि यहाँ वास्तविक सिंह की बात कर रहा है या किसी व्यक्ति के लिए सिंह शब्द का उपयोग कर रहा है?" फिर.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_009', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 14\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review the definitions of verbal, situational, and dramatic irony.',
          misconception: 'Students often confuse symbolism with metaphor, thinking any comparison is a symbol.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 14\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 14\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 14\' का कथानक — \'अंतरा भाग-2 — पाठ 14\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review the definitions of verbal, situational, and dramatic irony.',
                  misconception: 'Students often confuse symbolism with metaphor, thinking any comparison is a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Revisit c11_hin_ar_cbse_14_009 (Class 11 Irony and Symbolism) and re-read the definitions of the three irony types with.', 'Create a three-column table: Device | Definition | Example from \'ksj\'/\'igpku\'/\'pkj gkFk\'/\'lk>k\'.', 'Fill it for all four stories.', 'Practice the PEEL structure on one symbol: Point (The beak symbolizes projected desire), Evidence (Old woman sees grain.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_010', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 14\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि शब्द चयन में भ्रम हो तो कक्षा 11 के किसी भी पाठ के पदावली: मुख्य शब्द नोड (जैसे.',
          misconception: 'छात्र अक्सर मानते हैं कि मुख्य शब्द वे होते हैं जो या तो शीर्षक में आए हों, या जो कठिन या अज्ञात हों (जैसे "साझा" या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 14\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 14\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 14\' का कथानक — \'अंतरा भाग-2 — पाठ 14\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि शब्द चयन में भ्रम हो तो कक्षा 11 के किसी भी पाठ के पदावली: मुख्य शब्द नोड (जैसे.',
                  misconception: 'छात्र अक्सर मानते हैं कि मुख्य शब्द वे होते हैं जो या तो शीर्षक में आए हों, या जो कठिन या अज्ञात हों (जैसे "साझा" या "चार हाथ"), क्योंकि.' }
          ],
            remediations: { 'wrong-idea': { steps: ['यदि छात्र कठिन या असामान्य शब्दों को मुख्य शब्द मान रहा है, तो उसे इस अभ्यास के लिए कहिए: पाठ को दो बार पढ़िए—पहली बार.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_011', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 14\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि छात्र क्रिया के रूपों (जैसे गया vs गया था) के अंतर को समझने में कठिनाई महसूस कर रहा.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि एक वाक्य का अर्थ स्पष्ट है, तो वह व्याकरणिक रूप से सही होना चाहिए — जैसे "मैं स्कूल गया".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 14\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'अंतरा भाग-2 — पाठ 14\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 14\' का कथानक — \'अंतरा भाग-2 — पाठ 14\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र क्रिया के रूपों (जैसे गया vs गया था) के अंतर को समझने में कठिनाई महसूस कर रहा है, तो उसे.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि एक वाक्य का अर्थ स्पष्ट है, तो वह व्याकरणिक रूप से सही होना चाहिए — जैसे "मैं स्कूल गया" को "मैं स्कूल गया था".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को दो समान वाक्य दें: "वह खाया" और "वह खा चुका था"। पहले उनसे पूछें कि प्रत्येक वाक्य में कौन सी क्रिया हुई और.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_14_012', difficulty: 'standard',
          question: '\'अंतरा भाग-2 — पाठ 14\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि छात्र भ्रमित हो तो वर्ग 11 के किसी भी पाठ (जैसे c11_hin_a_cbse_01_012) में वस्तुनिष्ठ.',
          misconception: 'छात्र अक्सर मानते हैं कि यदि वे वस्तुनिष्ठ प्रश्न का उत्तर सही दे दिया (जैसे लेखक का नाम याद है), तो वे आशय-सूचक प्रश्न.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'अंतरा भाग-2 — पाठ 14\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'अंतरा भाग-2 — पाठ 14\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'अंतरा भाग-2 — पाठ 14\' का कथानक — \'अंतरा भाग-2 — पाठ 14\' — अंतरा भाग-2 का पाठ। पाठ का', '\'अंतरा भाग-2 — पाठ 14\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि छात्र भ्रमित हो तो वर्ग 11 के किसी भी पाठ (जैसे c11_hin_a_cbse_01_012) में वस्तुनिष्ठ और.',
                  misconception: 'छात्र अक्सर मानते हैं कि यदि वे वस्तुनिष्ठ प्रश्न का उत्तर सही दे दिया (जैसे लेखक का नाम याद है), तो वे आशय-सूचक प्रश्न भी आसानी से हल कर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को पहले बताएं कि वस्तुनिष्ठ = fact (जैसे "लेखक कौन है?") और आशय-सूचक = interpretation (जैसे "इसका क्या मतलब.', 'इससे वे अंतर महसूस करेंगे। फिर पाठ से एक línea उठाएँ (जैसे "हम साझा करके आगे बढ़ते हैं") और पूछें: fact क्या है?', '(कि \'साझा\' शब्द आया) और आशय क्या है?', '(कि सहयोग से प्रगति होती है)। इस दो-स्तरीय अभ्यास को दोहराने से वे भ्रम दूर कर पाएंगे।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
