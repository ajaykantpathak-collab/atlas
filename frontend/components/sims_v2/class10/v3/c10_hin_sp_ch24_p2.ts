import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hin_sp_ch24_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hin_sp_ch24_p2: SimDef = {
    id: 'v3_c10_hin_sp_ch24_p2',
    title: 'डायरी का एक पन्ना · Part 2/3',
    subtitle: 'यह नोड \'डायरी का एक पन्ना\' पाठ में निहित गौण विषयों (जैसे: बाल मनोविज्ञान, सामाजिक.',
    classLevel: 10, subject: 'hin_sp', topic: 'डायरी का एक पन्ना · Part 2/3',
    chapters: ['c10_hin_sp_ch24'],
    nodeIds: ['c10_hin_sp_cbse_24_007', 'c10_hin_sp_cbse_24_008', 'c10_hin_sp_cbse_24_009', 'c10_hin_sp_cbse_24_010', 'c10_hin_sp_cbse_24_011', 'c10_hin_sp_cbse_24_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 10 learner', intro: '\'डायरी का एक पन्ना\' में डायरी-का-एक-पन्ना जैसे सहायक विचार आते हैं।', goal: 'Master every idea in this chapter.' },
    // discovery omitted — no cleanly extractable hook in this chapter
    teaching: [
        { title: 'डायरी का एक पन्ना — गौण विषय', text: '\'डायरी का एक पन्ना\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hin_sp_cbse_24_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['डायरी का एक पन्ना'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c10_hin_sp_cbse_24_010', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['**Connect to narrator\'s psychology** — नायक \'जड़ों\'.', '**Link to theme** — यह शब्द **\'विस्थापन की त्रासदी\'**.', '**State dictionary meanings** — \'उखड़ना\' = जड़ से अलग होना.', '**Identify the word and its location** — \'उखड़ना\' आता है 26.', '**Analyze connotative difference** — \'उखड़ना\' में **हिंसा.'], answer: '**Identify the word and its location** — \'उखड़ना\' आता है 26. **State dictionary meanings** — \'उखड़ना\' = जड़ से अलग होना. **Analyze connotative difference** — \'उखड़ना\' में **हिंसा. **Connect to narrator\'s psychology** — नायक \'जड़ों\'. **Link to theme** — यह शब्द **\'विस्थापन की त्रासदी\'**.' } },
        { type: 'case', nodeId: 'c10_hin_sp_cbse_24_012', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through डायरी का एक पन्ना like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? डायरी का एक पन्ना · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — डायरी का एक पन्ना · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_007', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो तुरंत **c10_hin_sp_cbse_24_006 (मुख्य विषय और संदेश)**.',
          misconception: '**सबसे घातक भ्रम:** छात्र **\'प्रसंग/घटना\' (Incident/Event)** और **\'गौण विषय\' (Sub-theme)** को एक मान लेते हैं। उदाहरण.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' के गौण विषय',
                  options: ['\'डायरी का एक पन्ना\' के गौण विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मुख्य विषय स्पष्ट नहीं है, तो तुरंत **c10_hin_sp_cbse_24_006 (मुख्य विषय और संदेश)** पर लौटें.',
                  misconception: '**सबसे घातक भ्रम:** छात्र **\'प्रसंग/घटना\' (Incident/Event)** और **\'गौण विषय\' (Sub-theme)** को एक मान लेते हैं। उदाहरण: पाठ में "बच्चे बारिश.' }
          ],
            remediations: { 'incident-event-sub-theme-what': { steps: ['**अवधारणा स्पष्ट करें (Concept Clarification):** छात्र को बैठाकर समझाएँ: "घटना = कैमरे से रिकॉर्ड किया गया दृश्य (बच्चे.', '**अभ्यास कराएँ (Guided Practice):** पाठ से 5 प्रसंग दें (जैसे: पतंग उड़ाना, मास्टरजी का पढ़ाना, बड़े बाबू का निरीक्षण.', 'इससे कौन-सा \'विचार\' निकलता है?', 'वह विचार मुख्य विषय \'शोषण\' से कैसे जुड़ता है?" इसे टेबल फॉर्मेट में भरवाएँ। 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_008', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_24_003 (पाठ्य-परिवेश)** दोहराएँ — परिवेश के.',
          misconception: '**सबसे घातक गलती**: छात्र **बिंब (Imagery)** को केवल \'सुंदर वर्णन\' या \'चित्रण\' समझते हैं और **रूपक (Metaphor)** को केवल.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' में बिंब (imagery)',
                  options: ['\'डायरी का एक पन्ना\' में बिंब (imagery)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c10_hin_sp_cbse_24_003 (पाठ्य-परिवेश)** दोहराएँ — परिवेश के ठोस ब्योरे.',
                  misconception: '**सबसे घातक गलती**: छात्र **बिंब (Imagery)** को केवल \'सुंदर वर्णन\' या \'चित्रण\' समझते हैं और **रूपक (Metaphor)** को केवल \'तुलना\' मान लेते.' }
          ],
            remediations: { 'imagery-metaphor-1': { steps: ['**चरण 1**: छात्र को **उपमा और रूपक के 5 जोड़े** दें (जैसे: "वह शेर जैसा बहादुर है" बनाम "वह शेर है") और पूछें — "कौन-सा.', 'जिसमें \'जैसे\' नहीं, वही रूपक है।" **चरण 2**: एक साधारण वाक्य दें — "रात अंधेरी थी" — और कहें: "इसे **दृश्य बिंब**.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_009', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि फँसें तो c10_hin_sp_cbse_24_008 (बिंब और रूपक) और c10_hin_sp_cbse_24_006 (मुख्य विषय).',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **विरोधाभास = विरोधाभासी अलंकार (Oxymoron)** जैसे \'मधुर कड़वाहट\', और **प्रतीक.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' में विरोधाभास',
                  options: ['\'डायरी का एक पन्ना\' में विरोधाभास', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँसें तो c10_hin_sp_cbse_24_008 (बिंब और रूपक) और c10_hin_sp_cbse_24_006 (मुख्य विषय) दोहराएँ.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **विरोधाभास = विरोधाभासी अलंकार (Oxymoron)** जैसे \'मधुर कड़वाहट\', और **प्रतीक = रूपक (Metaphor)** जैसे.' }
          ],
            remediations: { 'oxymoron': { steps: ['छात्र को पाठ के **तीन विशिष्ट अंश** दें जहाँ विरोधाभास स्पष्ट हो (जैसे आज़ादी/विस्थापन, चुप्पी/शोर, रुकना/चलना)। उससे.', 'लेखक उन्हें एक साथ क्यों रखता है?" 2.', 'प्रतीक के लिए: **\'ट्रेन\'** और **\'डायरी\'** को साथ रखें। पूछें: "दोनों वस्तुएँ हैं, फिर भी दोनों \'कुछ और\' बन जाती हैं। वह.', 'दोनों में क्या फर्क है?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_010', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck, review **node 24_001 (पृष्ठभूमि: विभाजन का इतिहास)** and **node 24_004 (नायक का.',
          misconception: 'Students believe \'पदावली: मुख्य शब्द\' means **making a list of difficult words with Hindi meanings** (शब्दार्थ लिखना).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' की पदावली',
                  options: ['\'डायरी का एक पन्ना\' की पदावली', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review **node 24_001 (पृष्ठभूमि: विभाजन का इतिहास)** and **node 24_004 (नायक का.',
                  misconception: 'Students believe \'पदावली: मुख्य शब्द\' means **making a list of difficult words with Hindi meanings** (शब्दार्थ लिखना).' }
          ],
            remediations: { 'means-making-a-list-of': { steps: ['Take the word \'विवशता\'. Ask the student: "If a teacher says \'तुम्हारी विवशता समझता हूँ\' vs \'तुम्हारी मजबूरी समझता हूँ\'.', 'Open the text to the exact sentence with \'विवशता\' (e.g., \'विवशता में लिखे गए पत्र\').', 'Practice 3 such word-pairs from the chapter (उखड़ना/हटना, स्मृति/याद, शरणार्थी/प्रवासी) using the **Connotation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_011', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'यदि क्रिया-काल पहचानने में अटके → कक्षा 9 के "क्रिया और काल" पाठ (NCERT व्याकरण) के.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "डायरी का एक पन्ना" में प्रयुक्त भाषा **अशुद्ध/अव्याकरणिक** है और परीक्षा में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' में भाषा-प्रयोग',
                  options: ['\'डायरी का एक पन्ना\' में भाषा-प्रयोग', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि क्रिया-काल पहचानने में अटके → कक्षा 9 के "क्रिया और काल" पाठ (NCERT व्याकरण) के अभ्यास 2-3.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि "डायरी का एक पन्ना" में प्रयुक्त भाषा **अशुद्ध/अव्याकरणिक** है और परीक्षा में ऐसी भाषा लिखने पर अंक.' }
          ],
            remediations: { 'cbse-creative-writing': { steps: ['**चरण 1**: छात्र से पूछें — "तुम्हारी अपनी डायरी के 3 पन्ने दिखाओ। उनमें कौन-सा क्रिया-काल सबसे ज्यादा है?', 'वाक्य पूरे हैं या अधूरे?" — इससे वह **अपनी ही डायरी** को विश्लेषण का आधार बनाएगा। 2.', '**चरण 2**: पाठ के 2 पैराग्राफ साथ रखें — एक **पाठ्यपुस्तक का गद्यांश**, दूसरा **डायरी का अंश**। छात्र से कहें: "दोनों.', '**चरण 3**: बोर्ड के **मार्किंग स्कीम** का नमूना दिखाएँ जहाँ डायरी-लेखन में "भाषा की सहजता/आत्मीयता" को 3 अंक दिए गए हैं.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_hin_sp_cbse_24_012', difficulty: 'standard',
          question: '\'डायरी का एक पन्ना\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँस जाएँ तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 008 (बिंब और रूपक)** को दोबारा.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आशय-सूचक प्रश्न का उत्तर = पाठ की पंक्तियों का हिंदी अनुवाद या सारांश\'** है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'डायरी का एक पन्ना\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'डायरी का एक पन्ना\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = सत्यजित राय के व्यक्तित्व के तीन आयाम (फ़िल्मकार,', '\'डायरी का एक पन्ना\' का कथानक', '\'डायरी का एक पन्ना\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फँस जाएँ तो **नोड 006 (मुख्य विषय और संदेश)** और **नोड 008 (बिंब और रूपक)** को दोबारा पढ़ें.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **\'आशय-सूचक प्रश्न का उत्तर = पाठ की पंक्तियों का हिंदी अनुवाद या सारांश\'** है। वे पाठ से 2-3 वाक्य.' }
          ],
            remediations: { '2-3-6-8': { steps: ['**लक्षित उपचार (4 चरण):** 1.', '**पहचान कराओ:** छात्र को 5 पुराने उत्तर दिखाओ — 3 अच्छे (PEEL वाले), 2 खराब (केवल पाठ-दोहराव वाले)। पूछो: "कौन-सा उत्तर.', '**\'क्यों\' का अभ्यास:** एक ही तथ्य पर 3 बार \'क्यों\' पूछो: (क) लेखक अकेला है — **क्यों?** (ख) वह डायरी लिखता है.', '**PEEL टेम्पलेट दें:** एक खाका (Template) दें जिसमें 4 खाने हों: Point | Evidence (पंक्ति) | Explanation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
