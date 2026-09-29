import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch05_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch05_p3: SimDef = {
    id: 'v3_c11_hin_v_ch05_p3',
    title: 'पाठ 5 · Part 3/3',
    subtitle: 'Read Rajasthani folk tales as a people\'s archive of honour codes.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 5 · Part 3/3',
    chapters: ['c11_hin_v_ch05'],
    nodeIds: ['c11_hin_v_cbse_05_013', 'c11_hin_v_cbse_05_014', 'c11_hin_v_cbse_05_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an archivist cross-checking ballads against records', intro: 'Desert kingdoms, bards, and sacrifices that look irrational — until you learn the code they\'re written in.', goal: 'Decode the cultural rules inside Rajasthani folk narratives and analyse their non-linear structure.' },
    discovery: {
        question: 'A Rajput tale has a widow choose jauhar and a steward bankrupt himself for his lord — madness, or a code you\'re missing?',
        options: ['A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour', 'Madness — no rational person chooses death', 'A code — but only kings followed it', 'Madness — folk tales aren\'t bound by logic'],
        answer: 'A code — maru-maryada, jauhar and bhamashah are implicit rules that make \'irrational\' sacrifice read as honour',
        hook: 'Vishnu Prabhakar worked the Rajasthan State Archives for decades — these aren\'t fairy tales but itihaas, history as the people witnessed it.',
    },
    teaching: [
        { title: 'पाठ 5 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: '\'वितान भाग-1 — पाठ 5\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_05_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Match archival motifs (jauhar, sakha, bhamashah) to the folk narratives, then weigh why the story\'s trauma stays unresolved at the end.',
        labels: ['पाठ 5 — आलोचनात्मक', 'पाठ 5 — लेखन', 'पाठ 5 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_014', title: 'पाठ 5 — लेखन कौशल: पाठ-आधारित',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 5\' से उद्धरण लीजिए और अपने उत्तर से जोड़िए।',
            decisions: [{ prompt: 'PEEL संरचना के \'E\' (Evidence) चरण में क्या अनिवार्य रूप से शामिल होना चाहिए? एक वाक्य में उत्तर दीजिए।', options: [
                { text: '**उत्तर:** \'E\' चरण में पाठ से लिया गया **सटीक उद्धरण (Exact Quote)** या **विशिष्ट प्रसंग', outcome: '**उत्तर:** \'E\' चरण में पाठ से लिया गया **सटीक उद्धरण (Exact Quote)** या **विशिष्ट प्रसंग संदर्भ.' },
                { text: '* — छात्र मानते हैं कि *', outcome: 'Not quite — **विशिष्ट भ्रांति:** *"बड़े/जटिल शब्द (Sophisticated Vocabulary) और लंबे वाक्य लिखने से अंक अधिक.', reveals: 'sophisticated-vocabulary-cbse-clarity' },
                { text: '* लिखना *', outcome: 'Not quite — **विशिष्ट भ्रांति:** *"बड़े/जटिल शब्द (Sophisticated Vocabulary) और लंबे वाक्य लिखने से अंक अधिक.', reveals: 'sophisticated-vocabulary-cbse-clarity' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your history club presents Vishnu Prabhakar\'s \'Rajasthan ki Jatir Kahaniyan\'. A member dismisses the folk narratives: \'Oral tales aren\'t real history — no dates, no documents, just bards embellishing. And the story jumps around in time, so it\'s badly organised.\'',
            decisions: [{ prompt: 'How do you defend both the form and the history?', options: [
                { text: 'Defend both: these narratives are \'itihaas\' — history as witnessed by the people — which is why Prabhakar, a historian-storyteller in the post-Independence recovery of subaltern histories, documented them; the Rajasthani-infused language carries cultural codes a document can\'t. And the non-linearity is design: time-shifts reveal the protagonist\'s trauma gradually — the climax is an internal realisation, not an external event.', outcome: 'The club reframes: oral tradition is an archive with its own grammar, and the scrambled chronology is how the story performs memory rather than reports it.' },
                { text: 'Concede — oral tales are entertainment; real history needs documents and dates.', outcome: 'That repeats the bias that erased subaltern experience: these tales preserve what archives ignored — the people\'s own witness.', reveals: 'oral-tales-arent-history' },
                { text: 'Rearrange the story chronologically for the presentation — linear order is clearer.', outcome: 'The non-linear order is the meaning: trauma surfaces in fragments; straightening it destroys the emotional architecture built by the flashbacks.', reveals: 'linearize-the-narrative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_05_015', title: 'You made it',
          caseStudy: { intro: 'The archive and the bard tell the same past in different inks — folk narrative is history that refused to be filed away.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_013', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित.',
          hint: 'यदि फँसें: **c11_hin_v_cbse_05_008 व 009** (बिंब/रूपक/विरोधाभास/प्रतीक) पर लौटें — एक-एक.',
          misconception: 'छात्र समझते हैं कि **\'आलोचनात्मक चिंतन\' = \'अपनी राय देना\' या \'पाठ की बुराई करना\'**। वास्तव में: (1) यह **व्यक्तिगत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 5\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।',
                  options: ['\'वितान भाग-1 — पाठ 5\' का आलोचनात्मक चिंतन — विश्लेषण करके प्रमाण-आधारित निष्कर्ष।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें: **c11_hin_v_cbse_05_008 व 009** (बिंब/रूपक/विरोधाभास/प्रतीक) पर लौटें — एक-एक युक्ति को.',
                  misconception: 'छात्र समझते हैं कि **\'आलोचनात्मक चिंतन\' = \'अपनी राय देना\' या \'पाठ की बुराई करना\'**। वास्तव में: (1) यह **व्यक्तिगत पसंद/नापसंद** नहीं.' }
          ],
            remediations: { '1': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र से कहें — "पाठ की कोई एक पंक्ति लो। पहले बताओ: **क्या लिखा है?** (वर्णन) फिर: **कैसे.', '**चरण 2 — PEEL का अभ्यास:** एक कमजोर उत्तर दें (केवल वर्णन) और छात्र से कहें: "इसे PEEL में ढालो — Point जोड़ो.', '**चरण 3 — युक्ति-संवाद कराएँ:** दो युक्तियाँ (जैसे: बिंब + विरोधाभास) दें और पूछें: "ये दोनों *मिलकर* क्या कर रहे हैं.', '**चरण 4 — बोर्ड-उत्तर तुलना:** NCERT मार्किंग स्कीम के दो नमूना उत्तर (एक 2/5, एक 5/5) दिखाएँ और अंतर चिह्नित कराएँ.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_014', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' पर पाठ-आधारित लेखन — पाठ से प्रमाण लेकर उत्तर की पुष्टि।',
          hint: 'यदि फँस जाएँ तो **c11_hin_v_cbse_05_013 (आलोचनात्मक चिंतन)** और.',
          misconception: '**विशिष्ट भ्रांति:** *"बड़े/जटिल शब्द (Sophisticated Vocabulary) और लंबे वाक्य लिखने से अंक अधिक मिलते हैं।"* — छात्र.',
          parts: [
                { id: 'a', prompt: 'प्रश्न: *"पाठ में \'विरोधाभास\' (Paradox) युक्ति कैसे प्रयुक्त हुई है?"* — इसके लिए PEEL रूपरेखा (Outline) बनाइए जिसमें Point, Evidence (उद्धरण सहित).', answer: '**चरण-दर-चरण उत्तर:** 1',
                  options: ['**चरण-दर-चरण उत्तर:** 1', '* — छात्र मानते हैं कि *', '* लिखना *', 'पात्र-चित्रण की बहुआयामी जटिलताएँ पाठ की विषयवस्तु को प्रतिबिंबित करती हैं'],
                  hint: 'यदि फँस जाएँ तो **c11_hin_v_cbse_05_013 (आलोचनात्मक चिंतन)** और **c11_hin_v_cbse_05_008/009.',
                  misconception: '**विशिष्ट भ्रांति:** *"बड़े/जटिल शब्द (Sophisticated Vocabulary) और लंबे वाक्य लिखने से अंक अधिक मिलते हैं।"* — छात्र मानते हैं कि *"नायक.' },
                { id: 'b', prompt: 'दो उत्तर अंश दिए गए हैं — पहचानिए कौन-सा **विश्लेषणात्मक (Analytical)** है और कौन-सा **वर्णनात्मक (Descriptive)**, तथा कारण बताइए: अ) *"नायक बाज़ार जाता है.', answer: '**उत्तर:** अ **वर्णनात्मक (Descriptive)**',
                  options: ['**उत्तर:** अ **वर्णनात्मक (Descriptive)**', '* — छात्र मानते हैं कि *', '* लिखना *', 'पात्र-चित्रण की बहुआयामी जटिलताएँ पाठ की विषयवस्तु को प्रतिबिंबित करती हैं'],
                  hint: 'यदि फँस जाएँ तो **c11_hin_v_cbse_05_013 (आलोचनात्मक चिंतन)** और **c11_hin_v_cbse_05_008/009.',
                  misconception: '**विशिष्ट भ्रांति:** *"बड़े/जटिल शब्द (Sophisticated Vocabulary) और लंबे वाक्य लिखने से अंक अधिक मिलते हैं।"* — छात्र मानते हैं कि *"नायक.' }
          ],
            remediations: { 'sophisticated-vocabulary-cbse-clarity': { steps: ['**\'शब्द-जाल\' तोड़ो:** छात्र से कहें — *"अगले 3 उत्तर केवल **सरल, छोटे वाक्यों** में लिखो (अधिकतम 12 शब्द/वाक्य)।.', '**PEEL रंग-कोडिंग:** छात्र के लिखे उत्तर में 4 रंगों से हाइलाइट करवाएँ: **नीला = Point, हरा = Evidence, पीला.', '**\'क्यों?\' खेल:** छात्र के हर दावे पर आप बार-बार पूछें *"पाठ में कहाँ लिखा है?', 'वह वाक्य कैसे तुम्हारी बात सिद्ध करता है?"* — जब तक वह स्वयं Evidence→Explanation जोड़ना न सीख जाए। 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_05_015', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 5\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और.',
          hint: 'यदि अटके: c11_hin_v_cbse_05_013 (आलोचनात्मक चिंतन) के \'साक्ष्य-चयन\' चरण को दोहराएँ.',
          misconception: 'छात्र अक्सर मानते हैं कि \'चर्चा-बिंदु\' का अर्थ है **शिक्षक द्वारा दिए गए प्रश्नों के \'सही उत्तर\' खोजना** — जैसे यह एक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 5\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।',
                  options: ['\'वितान भाग-1 — पाठ 5\' पर वाचन-श्रवण और चर्चा-बिंदु — पढ़ने, सुनने और विचार-विमर्श का कौशल।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 5\' का कथानक — \'वितान भाग-1 — पाठ 5\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 5\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके: c11_hin_v_cbse_05_013 (आलोचनात्मक चिंतन) के \'साक्ष्य-चयन\' चरण को दोहराएँ — विशेष रूप से.',
                  misconception: 'छात्र अक्सर मानते हैं कि \'चर्चा-बिंदु\' का अर्थ है **शिक्षक द्वारा दिए गए प्रश्नों के \'सही उत्तर\' खोजना** — जैसे यह एक मौखिक परीक्षा हो।.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**पुनर्निर्देशन (Redirect):** अगली चर्चा से पहले, छात्र को एक छोटा अनुच्छेद (5-6 पंक्तियाँ) दें और कहें: "इसमें तीन.', '**मॉडलिंग (Modeling):** शिक्षक स्वयं एक \'गलत\' व्याख्या प्रस्तुत करें (जानबूझकर कमजोर साक्ष्य के साथ) और छात्रों से.', '**मेटाकॉग्निटिव संकेत (Metacognitive cue):** चर्चा के अंत में 2 मिनट दें: "लिखो — आज मेरी समझ कैसे बदली?', 'कौन-सा साक्ष्य सबसे आश्चर्यजनक था?" यह \'उत्पाद\' (उत्तर) से \'प्रक्रिया\' (चिंतन) पर ध्यान ले जाता है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
