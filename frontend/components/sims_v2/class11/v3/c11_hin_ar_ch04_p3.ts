import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch04_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch04_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch04_p3',
    title: 'पाठ 4 · Part 3/3',
    subtitle: 'Read a bureaucratic \'order\' as parody — and a soldier\'s letter as an accusation.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 4 · Part 3/3',
    chapters: ['c11_hin_ar_ch04'],
    nodeIds: ['c11_hin_ar_cbse_04_013', 'c11_hin_ar_cbse_04_014', 'c11_hin_ar_cbse_04_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader unmasking a ridiculous official letter', intro: 'A letter reaches the king from his own soldier — part chronicle of past glory, part folk tale, part indictment.', goal: 'Decode Guleri\'s linguistic satire and analyse the letter\'s fragmented narrative structure.' },
    discovery: {
        question: 'A British officer\'s order arrives dressed in legal English, dead Sanskrit and bazaar Hindi — is the absurdity just clumsy writing?',
        options: ['No — the linguistic mess is the satire: colonial authority is shown as performance, not competence', 'Yes — the officer simply couldn\'t write Hindi', 'No — it\'s actually a translation error by the editor', 'Yes — satire requires elegant language'],
        answer: 'No — the linguistic mess is the satire: colonial authority is shown as performance, not competence',
        hook: 'Guleri edited a paper through the 1899 famine that killed crores while grain was exported — the mock-bureaucratic \'order\' is a weapon, not a joke.',
    },
    teaching: [
        { title: 'पाठ 4 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) एक बौद्धिक प्रक्रिया है जिसमें पाठ के तथ्यों, तर्कों, भाषा-प्रयोग और संरचना का वस्तुनिष्ठ विश्लेषण करके उसके निहितार्थ, पूर्वधारणाओं और सौंदर्यात्मक मूल्यांकन तक.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_04_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Break a soldier\'s letter into its blocks — past glory, present misery, the snake-and-two-women folktale — and ask what the broken structure does to the ruler reading it.',
        labels: ['पाठ 4 — आलोचनात्मक', 'पाठ 4 — लेखन', 'पाठ 4 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_04_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 4 · Part 3/3', spots: [
            { id: 's1', label: '4 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल (Text-based Writing Skills) is the competency to construct.', answer: '4 -', options: ['4 -', '4 - -'] },
            { id: 's2', label: '4 - -', prompt: 'Which idea is this? — वाचन-श्रवण: चर्चा-बिंदु एक **भाषा-कौशल** है जिसमें शिक्षार्थी किसी पाठ (गद्य/पद्य) को.', answer: '4 - -', options: ['4 - -', '4 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_013', title: 'Use it in the wild',
          caseStudy: { intro: 'In a satire-writing workshop you take Guleri\'s sketch — a soldier\'s letter to his ruler mixing Sanskrit, Persian officialese and folk tale. A participant says: \'The mixed language is sloppy writing, and the snake-and-two-women folk tale is a pointless digression from the letter\'s complaint.\'',
            decisions: [{ prompt: 'How do you defend the text\'s design?', options: [
                { text: 'Decode the hybridity: the officer\'s mangled officialese (vakil, daftar, hukm) parodies the Persianised bureaucratic register — colonial power as performative language — while the elder sister\'s brave Sanskritised speech vs the younger\'s fearful fragments allegorise indigenous tradition vs colonised psyche. And the folk tale isn\'t digression: it\'s a parallel symbolic sub-plot doing the work of satire and allegory inside the letter form.', outcome: 'The workshop sees context as decoder: Guleri\'s famine-era journalism weaponised language — every register switch and the embedded tale are the critique.' },
                { text: 'Agree the language is sloppy — clean it into uniform modern Hindi for the exercise.', outcome: 'Uniforming the register erases the satire: the collision of Sanskrit, Persian and colloquial speech is precisely how colonial authority gets mocked.', reveals: 'hybrid-language-is-sloppy' },
                { text: 'Cut the folk tale — a letter should stick to its complaint.', outcome: 'The sub-plot carries the allegorical weight: it mirrors and sharpens the main letter\'s charge, so cutting it removes the satire\'s core.', reveals: 'folk-tale-is-digression' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_04_015', title: 'You made it',
          caseStudy: { intro: 'Two sisters face the same officer — one answers in courage and Sanskritised rebuke, one in fear; both are true, and that refusal of a clean binary is the honesty.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) एक बौद्धिक प्रक्रिया है जिसमें पाठ के.',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_04_008 (बिंब और रूपक)** और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"विश्लेषण का अर्थ है पाठ में आई हर साहित्यिक युक्ति को सूचीबद्ध करना (Listing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) एक बौद्धिक प्रक्रिया है जिसमें पाठ के तथ्यों,',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) एक बौद्धिक प्रक्रिया है जिसमें पाठ के तथ्यों,', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_04_008 (बिंब और रूपक)** और **c11_hin_ar_cbse_04_009.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **"विश्लेषण का अर्थ है पाठ में आई हर साहित्यिक युक्ति को सूचीबद्ध करना (Listing Devices)"**.' }
          ],
            remediations: { 'listing-devices': { steps: ['**चरणबद्ध उपचार (Remediation):** 1.', '**\'क्या\' से \'कैसे\' पर शिफ्ट करें:** छात्र को एक छोटा अंश (4-5 पंक्तियां) दें और कहें: *"यहां 3 युक्तियां हैं — अब.', 'अगर वह दूसरी युक्ति चुनता तो अर्थ कैसे बदलता?\' "* — यह **लेखकीय इरादे (Authorial Intent)** पर सोचने को बाध्य करता है। 2.', '**\'युक्ति-कार्य-तालिका\' (Device-Function Table) बनवाएं:** स्तंभ: युक्ति | उद्धरण | स्थानीय कार्य (Local Effect) |.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skills) is the competency to construct.',
          hint: 'यदि अटके: c11_hin_ar_cbse_04_013 (आलोचनात्मक चिंतन) पर लौटें — वहाँ से एक दावा चुनें.',
          misconception: '**"पाठ-आधारित उत्तर का अर्थ है पाठ की कहानी अपने शब्दों में दोहराना।"** — यह सबसे घातक भ्रम है। छात्र सोचते हैं कि "पाठ.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल (Text-based Writing Skills) is the competency to construct',
                  options: ['पाठ-आधारित लेखन कौशल (Text-based Writing Skills) is the competency to construct', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),'],
                  hint: 'यदि अटके: c11_hin_ar_cbse_04_013 (आलोचनात्मक चिंतन) पर लौटें — वहाँ से एक दावा चुनें, उसके लिए पाठ.',
                  misconception: '**"पाठ-आधारित उत्तर का अर्थ है पाठ की कहानी अपने शब्दों में दोहराना।"** — यह सबसे घातक भ्रम है। छात्र सोचते हैं कि "पाठ के आधार पर" का अर्थ.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — अंतर स्पष्ट करें:** छात्र के सामने एक ही प्रश्न के दो उत्तर रखें — एक सारांश-आधारित (2/5 अंक), एक.', '**चरण 2 — PEEL का \'E\' (Explanation) अलग करवाएँ:** छात्र से कहें: "अपने उत्तर में हर साक्ष्य के बाद लिखो: \'यह.', '**चरण 3 — \'साक्ष्य खोज\' अभ्यास:** 5 मिनट दें, एक दावा दें (जैसे: "नायिका विद्रोही है"), छात्र को पाठ से **ठीक दो**.', '**चरण 4 — मॉडल उत्तर सह-लेखन:** बोर्ड के पिछले वर्ष के 5-अंकीय प्रश्न लें, मिलकर PEEL कंकाल बनाएँ, फिर छात्र को.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_04_015', difficulty: 'standard',
          question: 'वाचन-श्रवण: चर्चा-बिंदु एक **भाषा-कौशल** है जिसमें शिक्षार्थी किसी पाठ.',
          hint: 'यदि अटका हो तो **नोड 008 (बिंब/रूपक) और 009 (विरोधाभास/प्रतीक)** दोहराएँ — चर्चा-बिंदु का.',
          misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **"चर्चा-बिंदु = पाठ के मुख्य बिंदुओं का सारांश + अपनी पसंद/नापसंद"**। **गलत.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वाचन-श्रवण: चर्चा-बिंदु एक **भाषा-कौशल** है जिसमें शिक्षार्थी किसी पाठ (गद्य/पद्य) को',
                  options: ['वाचन-श्रवण: चर्चा-बिंदु एक **भाषा-कौशल** है जिसमें शिक्षार्थी किसी पाठ (गद्य/पद्य) को', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल से संबंधित ऐतिहासिक, सामाजिक, सांस्कृतिक,', 'कथानक (Plot) किसी रचना में घटनाओं का कारण-परिणाम (Cause-and-Effect) से बंधा हुआ तार्किक', 'पाठ्य-परिवेश (Setting) किसी रचना में कथानक घटित होने का समग्र संदर्भ है जिसमें काल (समय),'],
                  hint: 'यदि अटका हो तो **नोड 008 (बिंब/रूपक) और 009 (विरोधाभास/प्रतीक)** दोहराएँ — चर्चा-बिंदु का **सबसे.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र समझते हैं कि **"चर्चा-बिंदु = पाठ के मुख्य बिंदुओं का सारांश + अपनी पसंद/नापसंद"**। **गलत तर्क**: वे पाठ पढ़कर.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — भेद स्पष्ट करें**: छात्र के सामने **दो नमूने** रखें — (क) **कमजोर चर्चा-बिंदु** (सारांश + राय), (ख) **बलवत.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
