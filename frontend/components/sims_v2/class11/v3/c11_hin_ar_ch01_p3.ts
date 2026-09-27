import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch01_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch01_p3: SimDef = {
    id: 'v3_c11_hin_ar_ch01_p3',
    title: 'पाठ 1 · Part 3/3',
    subtitle: 'Read a chess game as the diagnosis of a kingdom already lost.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 1 · Part 3/3',
    chapters: ['c11_hin_ar_ch01'],
    nodeIds: ['c11_hin_ar_cbse_01_013', 'c11_hin_ar_cbse_01_014', 'c11_hin_ar_cbse_01_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reader watching a kingdom fall one move at a time', intro: 'In 1856 Lucknow two nobles chase checkmate while the Company chases the crown — and Premchand refuses to tell you whom to blame.', goal: 'Analyse feudal decay as systemic, not personal, and evaluate Premchand\'s deliberate historical distortion.' },
    discovery: {
        question: 'Two nobles play chess while the British annex Awadh — are Mir and Roshan the villains of \'Shatranj ke Khiladi\'?',
        options: ['No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab', 'Yes — their chess obsession alone destroyed the kingdom', 'Yes — they are the story\'s clear antagonists', 'No — the British officer is the story\'s only villain'],
        answer: 'No — Premchand gives no moral centre; they are products of a decaying system whose rot trickles down from a \'caged bird\' Nawab',
        hook: 'Premchand wrote 1856 from inside 1924 — the \'polite\' annexation mirrors the reformist colonial rhetoric of his own time.',
    },
    teaching: [
        { title: 'पाठ 1 — आलोचनात्मक चिंतन: विश्लेषण और व्याख्या', text: 'आलोचनात्मक चिंतन (Critical Thinking) साहित्यिक पाठ का वह विश्लेषणात्मक दृष्टिकोण है जिसमें पाठक पाठ की सतही अर्थ-परत से आगे जाकर उसकी अंतर्निहित मान्यताओं, भाषाई संरचना, विचारधारात्मक अंतर्वस्तु और.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_01_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Hold the three timelines — 1856 Lucknow, 1924 India, today — and weigh whether shrinking Wajid Ali Shah to a caged bird is a historical error or an artistic necessity.',
        labels: ['पाठ 1 — आलोचनात्मक', 'पाठ 1 — लेखन', 'पाठ 1 — वाचन-श्रवण'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'dissect', nodeId: 'c11_hin_ar_cbse_01_014', title: 'Identify each idea',
          dissect: { specimen: 'पाठ 1 · Part 3/3', spots: [
            { id: 's1', label: '1 -', prompt: 'Which idea is this? — पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र दिए गए गद्य/पद्य अंश का सटीक बोध करके.', answer: '1 -', options: ['1 -', '1 - -'] },
            { id: 's2', label: '1 - -', prompt: 'Which idea is this? — **वाचन-श्रवण: चर्चा-बिंदु** एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी पाठ का.', answer: '1 - -', options: ['1 - -', '1 -'] }
          ] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_013', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is staging a reading of Premchand\'s \'Shatranj ke Khiladi\'. The director wants to stage it as \'a comedy about two chess-obsessed nobles in old Lucknow — period fun, nothing more.\' You sense the 1856 setting is doing heavier work.',
            decisions: [{ prompt: 'What reading should the production take?', options: [
                { text: 'Stage it as national allegory: Premchand wrote in 1924 — Non-Cooperation rising, Jallianwala Bagh fresh — and chose 1856 Awadh deliberately. The chessboard is a structural device: while Mirza and Mir move pieces, the kingdom is annexed without a shot — aristocratic decadence mirroring the \'polite\' colonial takeover the audience of 1924 would recognise in their own moment.', outcome: 'The comedy turns sharp: context isn\'t backdrop, it\'s the prism that makes chess-playing during a collapse mean political paralysis.' },
                { text: 'Go with the comedy reading — the story\'s humour about chess addicts carries itself without history lessons.', outcome: 'Stripping the 1856/1924 double timeline reduces a critique of feudal and colonial complicity to costume farce.', reveals: 'chess-players-is-just-comedy' },
                { text: 'Present it as a moral tale — chess is a vice, so the nobles deserved to lose their kingdom.', outcome: 'The game is a metaphor for paralysis, not a sin being punished; Premchand indicts a system\'s decadence, not a hobby.', reveals: 'chess-is-the-vice' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_01_015', title: 'You made it',
          caseStudy: { intro: 'An older Premchand story gave vice and virtue clear names; here nobody is clean — which is exactly what systemic decay looks like.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_013', difficulty: 'standard',
          question: 'आलोचनात्मक चिंतन (Critical Thinking) साहित्यिक पाठ का वह विश्लेषणात्मक.',
          hint: 'यदि अटका हुआ महसूस हो तो **\'बिंब और रूपक\' (c11_hin_ar_cbse_01_008)** और **\'विरोधाभास और.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि आलोचनात्मक चिंतन में **"अपनी राय देना" (giving personal opinion)** ही मुख्य.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'आलोचनात्मक चिंतन (Critical Thinking) साहित्यिक पाठ का वह विश्लेषणात्मक दृष्टिकोण है',
                  options: ['आलोचनात्मक चिंतन (Critical Thinking) साहित्यिक पाठ का वह विश्लेषणात्मक दृष्टिकोण है', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो'],
                  hint: 'यदि अटका हुआ महसूस हो तो **\'बिंब और रूपक\' (c11_hin_ar_cbse_01_008)** और **\'विरोधाभास और प्रतीक\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि आलोचनात्मक चिंतन में **"अपनी राय देना" (giving personal opinion)** ही मुख्य कार्य है — जैसे "मुझे.' }
          ],
            remediations: { 'giving-personal-opinion-textual-evidence': { steps: ['**चरण 1 — भेद स्पष्ट करें:** छात्र से कहें: "दो वाक्य लिखो: (अ) \'मुझे यह कविता पसंद नहीं आई\' (ब) \'कविता की छंद-मुक्त.', 'लेखक ने *यही* शब्द क्यों चुना, उसका पर्यायवाची क्यों नहीं?', 'यदि यह शब्द बदल दिया जाए तो अर्थ कैसे बदलेगा?" — इससे \'राय\' की आदत \'विश्लेषण\' की आदत में बदलती है।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_014', difficulty: 'standard',
          question: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र दिए गए गद्य/पद्य अंश का सटीक बोध.',
          hint: 'यदि फँसें तो **c11_hin_ar_cbse_01_013 (आलोचनात्मक चिंतन)** के \'बिंब/प्रतीक विश्लेषण\' और.',
          misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर लिखने का अर्थ है पाठ के महत्त्वपूर्ण अंशों को **याद करके हूबहू उतार देना** (rote.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र दिए गए गद्य/पद्य अंश का सटीक बोध करके,',
                  options: ['पाठ-आधारित लेखन कौशल वह क्षमता है जिसमें छात्र दिए गए गद्य/पद्य अंश का सटीक बोध करके,', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो'],
                  hint: 'यदि फँसें तो **c11_hin_ar_cbse_01_013 (आलोचनात्मक चिंतन)** के \'बिंब/प्रतीक विश्लेषण\' और \'विषय.',
                  misconception: '**विशिष्ट भ्रांति:** "पाठ-आधारित उत्तर लिखने का अर्थ है पाठ के महत्त्वपूर्ण अंशों को **याद करके हूबहू उतार देना** (rote reproduction)।".' }
          ],
            remediations: { 'rote-reproduction-10': { steps: ['**चरणबद्ध उपचार:** 1) छात्र से कहें: "पाठ बंद करो। प्रश्न को तीन बार पढ़ो और की-वर्ड (विश्लेषण/तुलना/समीक्षा) को घेरे.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_01_015', difficulty: 'standard',
          question: '**वाचन-श्रवण: चर्चा-बिंदु** एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी.',
          hint: 'यदि अटके हों तो **c11_hin_ar_cbse_01_013 (आलोचनात्मक चिंतन)** के \'व्याख्या बनाम राय\'.',
          misconception: '**विशिष्ट भ्रांति:** *"चर्चा-बिंदु का अर्थ है — पाठ पर अपनी \'राय\' (opinion) दे देना। साक्ष्य की आवश्यकता नहीं; जो मन.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**वाचन-श्रवण: चर्चा-बिंदु** एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी पाठ का',
                  options: ['**वाचन-श्रवण: चर्चा-बिंदु** एक संरचित शैक्षिक प्रक्रिया है जिसमें शिक्षार्थी किसी पाठ का', 'पृष्ठभूमि (Background) किसी रचना के लेखन-काल की ऐतिहासिक, सामाजिक, सांस्कृतिक और राजनीतिक', 'कथानक (Plot) किसी कथा में घटनाओं का कारण-कार्य संबंध (Causal Sequence) युक्त तार्किक क्रम', 'पाठ्य-परिवेश वह भौतिक, सामाजिक और ऐतिहासिक पृष्ठभूमि है जिसमें कोई कहानी घटित होती है, जो'],
                  hint: 'यदि अटके हों तो **c11_hin_ar_cbse_01_013 (आलोचनात्मक चिंतन)** के \'व्याख्या बनाम राय\' अभ्यास और.',
                  misconception: '**विशिष्ट भ्रांति:** *"चर्चा-बिंदु का अर्थ है — पाठ पर अपनी \'राय\' (opinion) दे देना। साक्ष्य की आवश्यकता नहीं; जो मन में आए बोल दो।"* **यह.' }
          ],
            remediations: { 'opinion': { steps: ['**लक्षित उपचार (4 चरण):** 1.', '**भेद स्पष्ट करें:** छात्र को दो कथन दें — (क) *"मुझे यह पसंद नहीं आया"* (राय), (ख) *"लेखक ने रूपक X का प्रयोग कर.', '**साक्ष्य-खोज अभ्यास:** पाठ 1 का एक विवादास्पद प्रसंग दें (जैसे: नायक का पत्र फाड़ना)। कहें: *"पाठ से **ठीक दो वाक्य**.', '**तर्क-मानचित्रण:** श्यामपट पर T-चार्ट बनाएं — बाएँ स्तंभ में \'दावा\', दाएँ में \'पाठ्य-साक्ष्य + तर्क\'। छात्र से अपने.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
