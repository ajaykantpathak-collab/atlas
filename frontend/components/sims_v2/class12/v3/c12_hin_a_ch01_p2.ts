import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_a_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_a_ch01_p2: SimDef = {
    id: 'v3_c12_hin_a_ch01_p2',
    title: 'देवसेना का गीत, कार्नेलयिा का गीत · Part 2/3',
    subtitle: 'Same god, different century — context is the lens',
    classLevel: 12, subject: 'hin_a', topic: 'देवसेना का गीत, कार्नेलयिा का गीत · Part 2/3',
    chapters: ['c12_hin_a_ch01'],
    nodeIds: ['c12_hin_a_cbse_01_007', 'c12_hin_a_cbse_01_008', 'c12_hin_a_cbse_01_009', 'c12_hin_a_cbse_01_010', 'c12_hin_a_cbse_01_011', 'c12_hin_a_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Hindi poetry scholar', intro: 'Before a single line of Tulsidas, there\'s a world to rebuild — the Bhakti age that made his poems possible.', goal: 'Use contextual reading — author, era, movement, language — to situate Tulsidas\'s poems in the Bhakti tradition.' },
    discovery: {
        question: 'Same poet Tulsidas, same devotion — but read him beside Nirala and the poems could be from different universes. What separates them?',
        options: ['Context — Bhakti-era Awadhi devotion for mass access versus Chhayavad\'s Khari Boli individualism; era, movement and language write the poem before the poet does', 'Just personal taste', 'Only the language differs', 'Nothing — poetry is timeless'],
        answer: 'Context — Bhakti-era Awadhi devotion for mass access versus Chhayavad\'s Khari Boli individualism; era, movement and language write the poem before the poet does',
        hook: '\'Before You Read\' isn\'t optional décor — without it, Tulsidas\'s Rama reads as just mythology instead of a personal god open to every caste. Three questions unlock any poem: whose life, which movement, what tongue.',
    },
    teaching: [
        { title: 'देवसेना का गीत, कार्नेलयिा का गीत — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'नसोल्सुक का छर\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_a_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build the lens before the poem: reconstruct Tulsidas\'s Bhakti world — Mughal era, Awadhi, devotion for all — and test how context changes what a single word can mean.',
        labels: ['देवसेना का गीत, कार्नेलयिा'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_007', title: 'देवसेना का गीत, कार्नेलयिा का गीत — साहित्यिक युक्तियाँ: प्रतीक और बिंब',
          caseStudy: { intro: '\'नसोल्सुक का छर\' में नसोल्सुक-का-छर जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literature, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a subordinate idea that runs alongside the primary theme, enriching', outcome: 'A secondary theme is a subordinate idea that runs alongside the primary theme, enriching it.' },
                { text: 'secondary theme is just a smaller theme', outcome: 'Not quite — **Misconception:** *"Secondary themes are just \'other topics\' mentioned in the poem — like love.', reveals: 'misconception-secondary-themes-are-just' },
                { text: 'it\'s the same as the main idea but less important', outcome: 'Not quite — **Misconception:** *"Secondary themes are just \'other topics\' mentioned in the poem — like love.', reveals: 'misconception-secondary-themes-are-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your batch wants a song for the annual day honouring the school\'s retiring matron. The lyricist drafts a literal timeline — joined in this year, served in that year — and it reads like a résumé set to music.',
            decisions: [{ prompt: 'How does Nirala\'s structuring of \'देवसेना का गीत\' and \'कानेसरिया का गीत\' suggest fixing it?', options: [
                { text: 'Rebuild it as an emotional arc, not a résumé — open inside one personal moment of hers, let the feeling turn from private memory to collective debt, and end on the batch\'s open pledge — the way the poems move from private grief to an appeal the listener must carry.', outcome: 'The chapter\'s insight is that a lyric\'s plot is the journey of the speaker\'s consciousness — emotional beats do the narrative work events do in prose.' },
                { text: 'Keep the timeline — a tribute should record the facts of her service accurately.', outcome: 'That\'s the event-plot assumption the chapter corrects: a list of dates documents a career but never becomes a song — without an emotional pivot the audience is informed, not moved.', reveals: 'facts-make-a-song' },
                { text: 'Make it fully abstract — drop her story and write only grand verses about service.', outcome: 'The poems earn their collective ending by starting inside a specific grief; pure abstraction skips the concrete wound that makes the final appeal land.', reveals: 'abstract-is-universal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_a_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now approach any Hindi text with the reader\'s toolkit — biography, movement and milieu as the keys that turn \'old verse\' into argument.',
            decisions: [{ prompt: 'What comes next? देवसेना का गीत, कार्नेलयिा का गीत · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — देवसेना का गीत, कार्नेलयिा का गीत · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_007', difficulty: 'standard',
          question: '\'नसोल्सुक का छर\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, review the PEEL paragraphs in Node c12_hin_a_cbse_01_006 and practice writing.',
          misconception: '**Misconception:** *"Secondary themes are just \'other topics\' mentioned in the poem — like love, nature, or sadness.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नसोल्सुक का छर\' के गौण विषय',
                  options: ['\'नसोल्सुक का छर\' के गौण विषय', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,', '\'नसोल्सुक का छर\' का कथानक', '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, review the PEEL paragraphs in Node c12_hin_a_cbse_01_006 and practice writing one PEEL.',
                  misconception: '**Misconception:** *"Secondary themes are just \'other topics\' mentioned in the poem — like love, nature, or sadness — and I can list them.' }
          ],
            remediations: { 'misconception-secondary-themes-are-just': { steps: ['**Revisit Node c12_hin_a_cbse_01_006 (Primary Theme)** — re-read the PEEL examples there; notice how every paragraph.', '**Do a "Theme Mapping" exercise:** Draw two columns — *Primary Theme* (center) and *Secondary Themes* (branches).', 'For each branch, write **one line from the poem** and **one sentence explaining the link**.', '**Re-diagnose:** Attempt Diagnostic Question 4 again, but this time **force a comparative link** in every sentence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_008', difficulty: 'standard',
          question: '\'नसोल्सुक का छर\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck, revisit **काव्य-संरचना और पद्य-विन्यास** (c12_hin_a_cbse_01_003) — the poem\'s.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि देवसेना = \'पिछड़ी हुई स्त्री\' और कार्नेलिया = \'प्रगतिशील स्त्री\'। **वास्तविकता:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नसोल्सुक का छर\' में बिंब (imagery)',
                  options: ['\'नसोल्सुक का छर\' में बिंब (imagery)', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,', '\'नसोल्सुक का छर\' का कथानक', '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, revisit **काव्य-संरचना और पद्य-विन्यास** (c12_hin_a_cbse_01_003) — the poem\'s argument.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि देवसेना = \'पिछड़ी हुई स्त्री\' और कार्नेलिया = \'प्रगतिशील स्त्री\'। **वास्तविकता:** देवसेना एक **सुसंगत.' }
          ],
            remediations: { 'coherent-worldview': { steps: ['**पुनर्पाठ (Re-read):** छात्र को दोनों कविताएँ **मौन पाठ** (silent reading) नहीं, **सस्वर पाठ** (aloud reading) कराएँ.', '**वक्तव्य-मानचित्रण (Voice-mapping):** एक टेबल बनाएँ: कॉलम 1 = देवसेना के तर्क (यज्ञ, मन्त्र, व्यवस्था), कॉलम 2.', '**बिम्ब-विच्छेद (Image-dissection):** \'अग्नि\', \'पुरोहित\', \'यज्ञ\', \'ज्ञान\' — प्रत्येक बिम्ब के लिए लिखें: देवसेना के लिए.', '**पुनः-निदान (Re-diagnostic):** DIAGNOSTIC_QUESTION_3 और 4 दोहराएँ — अब छात्र संदर्भ-निर्भर अर्थ निकाल पाएगा।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_009', difficulty: 'standard',
          question: '\'नसोल्सुक का छर\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'यदि फंसे तो मुख्य भाव और रस (c12_hin_a_cbse_01_008) दोबारा देखें कि मुख्य भाव कैसे पहचाना.',
          misconception: 'छात्र अक्सर गौण भाव को मुख्य भाव से अलग नहीं कर पाते हैं और कोई भी प्रधान भाव जिसे वे देखते हैं, उसे मुख्य भाव मान लेते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नसोल्सुक का छर\' में विरोधाभास',
                  options: ['\'नसोल्सुक का छर\' में विरोधाभास', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,', '\'नसोल्सुक का छर\' का कथानक', '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि फंसे तो मुख्य भाव और रस (c12_hin_a_cbse_01_008) दोबारा देखें कि मुख्य भाव कैसे पहचाना जाता है।',
                  misconception: 'छात्र अक्सर गौण भाव को मुख्य भाव से अलग नहीं कर पाते हैं और कोई भी प्रधान भाव जिसे वे देखते हैं, उसे मुख्य भाव मान लेते हैं। उदाहरण के लिए.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले देवसेना का गीत के दो पद्यांश दिए जाएँ और पूछा जाए: "कौन सा भाव पूरे कविता में दोहराया जा रहा है?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_010', difficulty: 'standard',
          question: '\'नसोल्सुक का छर\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि संधि/समास/धातु पहचानने में अटकें → c11_hin_a_cbse_13_011 (व्याकरण: पद्य में.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "कठिन शब्दों के अर्थ रट लेने से" पदावली तैयार हो जाती है। **वास्तविकता:** बोर्ड.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नसोल्सुक का छर\' की पदावली',
                  options: ['\'नसोल्सुक का छर\' की पदावली', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,', '\'नसोल्सुक का छर\' का कथानक', '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि संधि/समास/धातु पहचानने में अटकें → c11_hin_a_cbse_13_011 (व्याकरण: पद्य में भाषा-प्रयोग) के.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि "कठिन शब्दों के अर्थ रट लेने से" पदावली तैयार हो जाती है। **वास्तविकता:** बोर्ड परीक्षा में पूछे जाते.' }
          ],
            remediations: { '1': { steps: ['**पुनः पढ़ें:** पाठ के उन 2-2 पद्यांशों को जोर से पढ़ें जहाँ कठिन शब्द आए हैं; ध्वनि और लय पर ध्यान दें। 2.', '**तालिका बनाएँ:** प्रत्येक शब्द के लिए 5-स्तंभ तालिका भरें — (शब्द, शब्दकोशीय अर्थ, संधि/व्युत्पत्ति, प्रसंगानुकूल.', '**तुलना करें:** उसी भाव को व्यक्त करने वाले 2 सरल शब्द लिखें और बताएँ कि कवि ने कठिन शब्द क्यों चुना (उदाहरण: "अनुराग".', '**पुनः निदान:** उपरोक्त DIAGNOSTIC_QUESTION_3 और 4 को फिर से हल करें — यदि अब सही उत्तर दे पाते हैं, तो अगले नोड.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_011', difficulty: 'standard',
          question: '\'नसोल्सुक का छर\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और.',
          hint: 'यदि मात्रा गणना में कठिनाई हो तो c11_hin_a_cbse_03_011 पर वापस जाएँ — वहाँ शब्द के.',
          misconception: 'छात्र अक्सर छंद और लय-विधान को एक ही चीज़ मान लेते हैं, उदाहरण के लिए कहते हैं कि "देवसेना का गीत में लय lenta है इसलिए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नसोल्सुक का छर\' में भाषा-प्रयोग',
                  options: ['\'नसोल्सुक का छर\' में भाषा-प्रयोग', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,', '\'नसोल्सुक का छर\' का कथानक', '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मात्रा गणना में कठिनाई हो तो c11_hin_a_cbse_03_011 पर वापस जाएँ — वहाँ शब्द के गुरु-लघu.',
                  misconception: 'छात्र अक्सर छंद और लय-विधान को एक ही चीज़ मान लेते हैं, उदाहरण के लिए कहते हैं कि "देवसेना का गीत में लय lenta है इसलिए यह Doha छंद है".' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को सबसे पहले एक Doha की पंक्ति दीजिए (जैसे "राम का नाम ले ले मनवा") और उसे बोलकर मात्राएँ गिनने को कहिए.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_a_cbse_01_012', difficulty: 'standard',
          question: '\'नसोल्सुक का छर\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'अगर छात्र कविता के भाव को समझने में फंस जाए, तो उसे c12_hin_a_cbse_01_005 (छंद और.',
          misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में कविता की पंक्तियों को शब्दशः दोहरा देते हैं और मान लेते हैं कि यही भाव का.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'नसोल्सुक का छर\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'नसोल्सुक का छर\' के वस्तुनिष्ठ प्रश्न', 'इस पाठ का रचनाकार-परिचय व पृष्ठभूमि = गोस्वामी तुलसीदास का जीवन-वृत्त (जन्म लगभग 1532,', '\'नसोल्सुक का छर\' का कथानक', '\'नसोल्सुक का छर\' का पाठ्य-परिवेश (setting)'],
                  hint: 'अगर छात्र कविता के भाव को समझने में फंस जाए, तो उसे c12_hin_a_cbse_01_005 (छंद और लय-विधा) और.',
                  misconception: 'छात्र अक्सर आशय-सूचक प्रश्नों के उत्तर में कविता की पंक्तियों को शब्दशः दोहरा देते हैं और मान लेते हैं कि यही भाव का स्पष्टीकरण है — जैसे.' }
          ],
            remediations: { 'rut-rut': { steps: ['छात्र को सबसे पहले कविता की एक पंक्ति दें और पूछें: "इस पंक्ति के शब्दों का अर्थ क्या है?" फिर पूछें: "इस पंक्ति को.', 'क्या वह गुस्सा दिखा रहा है, शांति, зов, या त्याग?" फिर उसे बताएं कि भाव का अर्थ हमेशा शब्दों के पीछे की भावना.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
