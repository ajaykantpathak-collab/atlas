import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_ar_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_ar_ch02_p2: SimDef = {
    id: 'v3_c12_hin_ar_ch02_p2',
    title: 'पतंग · Part 2/3',
    subtitle: 'A poem that mourns without ever complaining',
    classLevel: 12, subject: 'hin_ar', topic: 'पतंग · Part 2/3',
    chapters: ['c12_hin_ar_ch02'],
    nodeIds: ['c12_hin_ar_cbse_02_007', 'c12_hin_ar_cbse_02_008', 'c12_hin_ar_cbse_02_009', 'c12_hin_ar_cbse_02_010', 'c12_hin_ar_cbse_02_011', 'c12_hin_ar_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Contemporary Hindi poetry reader', intro: 'A book-length poem built to hold a vanishing world — one precise image at a time.', goal: 'Read Patang inside Alok Dhanva\'s long poem — science-trained observation as elegy for a disappearing rural world.' },
    discovery: {
        question: 'A poet watches the village world of his childhood dissolve — yet never once writes in complaint. How does a poem protest without protesting?',
        options: ['Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique', 'By staying silent', 'By blaming politicians', 'It can\'t — complaint is required'],
        answer: 'Through elegy and precise imagery — cataloguing birds, trees and light so exactly that the loss argues itself; observation IS the critique',
        hook: '\'No tone of complaint\' doesn\'t mean no criticism — the poet is also a science communicator, so the poem works like field notes: concrete, sensory, exact. It\'s one movement of a single book-length poem, an architecture of memory against erasure.',
    },
    teaching: [
        { title: 'पतंग — साहित्यिक युक्तियाँ: प्रतीक और बिंब', text: '\'इराक्स\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_ar_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Read the long poem as preservation work: follow childhood idyll into encroaching modernity, weigh what the three-part textbook split gains and costs, and hear critique inside pure description.',
        labels: ['पतंग — साहित्यिक युक्तियाँ', 'पतंग — मुख्य भाव', 'पतंग — गौण भाव', 'पतंग — पदावली: कठिन', 'पतंग — व्याकरण: पद्य', 'पतंग — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_008', title: 'पतंग — मुख्य भाव और संदेश',
          caseStudy: { intro: '\'इराक्स\' में बिंब ढूँढिए — इराक्स — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define \'imagery\' (चित्रण) and \'metaphor\' (रूपक) in your own words using NCERT terminology.', options: [
                { text: 'Imagery: संवेदनाओं (इन्द्रियों) को सम्बोधित करने वाले शब्दों/पदों का प्रयोग जो पाठक के मन', outcome: 'Imagery: संवेदनाओं (इन्द्रियों) को सम्बोधित करने वाले शब्दों/पदों का प्रयोग जो पाठक के मन में सजीव.' },
                { text: 'ठिठुरन', outcome: 'Not quite — Students believe **metaphor and simile (रूपक और उपमा) are interchangeable** because both compare.', reveals: 'metaphor-and-simile-are-interchangeable' },
                { text: '(श्रवण)। Example metaphor', outcome: 'Not quite — Students believe **metaphor and simile (रूपक और उपमा) are interchangeable** because both compare.', reveals: 'metaphor-and-simile-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_009', title: 'पतंग — गौण भाव और विषयांतर',
          caseStudy: { intro: '\'इराक्स\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define irony and symbolism in your own words, giving one example from everyday life for each (not from the poem).', options: [
                { text: 'Irony: a situation where the outcome is contrary to what was expected (e.g., a fire', outcome: 'Irony: a situation where the outcome is contrary to what was expected (e.g., a fire station burning.' },
                { text: 'red sky', outcome: 'Not quite — Students often confuse *symbolism* with *imagery* — they think any vivid description (e.g., "red.', reveals: 'students-often-confuse-symbolism-with' },
                { text: 'any vivid description (e', outcome: 'Not quite — Students often confuse *symbolism* with *imagery* — they think any vivid description (e.g., "red.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_011', title: 'पतंग — व्याकरण: पद्य में भाषा-प्रयोग',
          caseStudy: { intro: '\'इराक्स\' की भाषा देखिए — NCERT पाठ्यपुस्तक का शब्द-चयन और शैली भाव बनाती है।',
            decisions: [{ prompt: 'Identify the tense and aspect of the verb phrase "mM+kus okys" in the line "irax mM+kus okys cPpksa osQ >qaM dks".', options: [
                { text: 'The verb phrase "mM+kus okys" consists of the infinitive "mM+kus" (to fly) + the present', outcome: 'The verb phrase "mM+kus okys" consists of the infinitive "mM+kus" (to fly) + the present participle.' },
                { text: 'incorrect', outcome: 'Not quite — Students often think poetic grammar is just "incorrect" or "broken" Hindi.', reveals: 'poetic-grammar-is-just-incorrect' },
                { text: 'broken', outcome: 'Not quite — Students often think poetic grammar is just "incorrect" or "broken" Hindi.', reveals: 'poetic-grammar-is-just-incorrect' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Curating a farewell exhibit, a teammate dismisses a photo essay of childhood monsoons — paper boats, wet gullies — as \'cute nostalgia with no real content.\' You think it\'s the strongest piece submitted.',
            decisions: [{ prompt: 'How does Kunwar Narain\'s poem structure defend the piece?', options: [
                { text: 'Point to the architecture — the poem moves from a concrete childhood scene to an adult meditation, showing memory isn\'t a discarded past but a layer still alive under the present; the essay\'s small wet moments are the vessel for a universal claim.', outcome: 'The poem proves that juxtaposing then and now is how memory actually works — the \'content\' is the endurance of childhood, not the boats themselves.' },
                { text: 'Concede — childhood images are sentimental raw material until they\'re processed into a serious argument.', outcome: 'That inverts the poem\'s method: the concrete scene is what earns the abstract reflection; stripping the sensory ground leaves the \'argument\' with nothing to stand on.', reveals: 'nostalgia-is-not-content' },
                { text: 'Defend it only as emotion — \'it feels true\' is enough without needing structure talk.', outcome: 'Feeling without structure undersells the piece: the chapter\'s point is that the arrangement — present tense scene widening into reflection — is what converts one person\'s memory into everyone\'s.', reveals: 'emotion-needs-no-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_ar_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now hear a poem argue without ever accusing — the nayi kavita way of making images carry the whole weight.',
            decisions: [{ prompt: 'What comes next? पतंग · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पतंग · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_007', difficulty: 'standard',
          question: '\'इराक्स\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, revisit node 006 (Primary Theme) and re-read the poem focusing only on the.',
          misconception: 'Students often treat secondary themes as \'less important topics\' and list random observations (e.g., \'the poem mentions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'इराक्स\' के गौण विषय',
                  options: ['\'इराक्स\' के गौण विषय', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'इराक्स\' का कथानक', '\'इराक्स\' का पाठ्य-परिवेश (setting)'],
                  hint: 'If stuck, revisit node 006 (Primary Theme) and re-read the poem focusing only on the flute player.',
                  misconception: 'Students often treat secondary themes as \'less important topics\' and list random observations (e.g., \'the poem mentions a river, so nature.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Have the student re-read the poem with three colored pens: one for primary theme evidence, one for contrast pairs.', 'Ask them to write one sentence for each color: "This color shows the idea that ______." 3.', 'Then guide them to merge those sentences into named secondary themes (e.g., "Nature as a model of freedom").', 'Finally, have them explain how each secondary theme makes the primary theme richer — if they can\'t, return to step 1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat secondary themes as \'less important topics\' and list random observations (e.g., \'the poem mentions.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "The poem\'s ending, where the flute music fades and children return home, undermines the theme of freedom because it shows freedom.', answer: 'Refute',
                  options: ['Refute', 'agrees with the claim reveals a binary mindset (free vs'],
                  hint: 'If stuck, revisit node 006 (Primary Theme) and re-read the poem focusing only on the flute player.',
                  misconception: 'Students often treat secondary themes as \'less important topics\' and list random observations (e.g., \'the poem mentions a river, so nature.' }
          ],
            remediations: { 'students-often-treat-secondary-themes': { steps: ['Have the student re-read the poem with three colored pens: one for primary theme evidence, one for contrast pairs.', 'Ask them to write one sentence for each color: "This color shows the idea that ______." 3.', 'Then guide them to merge those sentences into named secondary themes (e.g., "Nature as a model of freedom").', 'Finally, have them explain how each secondary theme makes the primary theme richer — if they can\'t, return to step 1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_008', difficulty: 'standard',
          question: '\'इराक्स\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck on metaphor identification, revisit Class 11 node c11_hin_ar_cbse_02_008 worked.',
          misconception: 'Students believe **metaphor and simile (रूपक और उपमा) are interchangeable** because both compare.',
          parts: [
                { id: 'a', prompt: 'Compare the tactile imagery in stanza 2 ("बच्चों की ठिठुरी हुई मुट्ठियाँ", "सीटी बजाते") with the visual metaphor in stanza 3 ("एक एक्कस के लग्गीस...', answer: 'Tactile imagery: "ठिठुरी हुई मुट्ठियाँ" (clenched frozen fists) makes the cold',
                  options: ['Tactile imagery: "ठिठुरी हुई मुट्ठियाँ" (clenched frozen fists) makes the cold', 'imagery shows cold, metaphor shows line', '**metaphor and simile (रूपक और उपमा) are interchangeable**'],
                  hint: 'If stuck on metaphor identification, revisit Class 11 node c11_hin_ar_cbse_02_008 worked examples.',
                  misconception: 'Students believe **metaphor and simile (रूपक और उपमा) are interchangeable** because both compare.' }
          ],
            remediations: { 'metaphor-and-simile-are-interchangeable': { steps: ['Give the student two columns: "उपमा वाक्य" and "रूपक वाक्य" for the same tenor-vehicle pair (e.g., "चाँद चाँदी *जैसा*.', 'Ask them to list *three* qualities transferred in the metaphor that the simile cannot transfer.', 'Have them re-read stanza 2-3 of "इराव" and underline every word that *only makes sense because of the metaphor\'s.', 'Assign a 50-word answer: "कविता में \'मकई के भुट्टे-सी धूप\' रूपक न होता तो \'पौष्टिकता\' का भाव कैसे लुप्त होता?" — forces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_009', difficulty: 'standard',
          question: '\'इराक्स\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review the device-definition table from Class 11 (c11_hin_ar_cbse_01_009) and.',
          misconception: 'Students often confuse *symbolism* with *imagery* — they think any vivid description (e.g., "red sky") is a symbol.',
          parts: [
                { id: 'a', prompt: 'In the poem, the line "लोस्जक गक्वब" (the celebration turned into mourning) appears after a description of children playing.', answer: 'Situational irony occurs when there is a sharp contrast between what is expected',
                  options: ['Situational irony occurs when there is a sharp contrast between what is expected', 'red sky', 'any vivid description (e'],
                  hint: 'If stuck, review the device-definition table from Class 11 (c11_hin_ar_cbse_01_009) and practice.',
                  misconception: 'Students often confuse *symbolism* with *imagery* — they think any vivid description (e.g., "red sky") is a symbol.' },
                { id: 'b', prompt: 'Identify one symbol in the poem (e.g., "पेड्ह्यस ब\'क्कज" — broken toys) and explain what abstract idea it represents.', answer: 'Broken toys symbolize shattered innocence and the destruction of childhood',
                  options: ['Broken toys symbolize shattered innocence and the destruction of childhood', 'red sky', 'any vivid description (e'],
                  hint: 'If stuck, review the device-definition table from Class 11 (c11_hin_ar_cbse_01_009) and practice.',
                  misconception: 'Students often confuse *symbolism* with *imagery* — they think any vivid description (e.g., "red sky") is a symbol.' },
                { id: 'c', prompt: 'Compare the use of irony in the opening stanza (children playing amid explosions) with the irony in the closing stanza (the river and sky turning red).', answer: 'Opening stanza: personal irony',
                  options: ['Opening stanza: personal irony', 'red sky', 'any vivid description (e'],
                  hint: 'If stuck, review the device-definition table from Class 11 (c11_hin_ar_cbse_01_009) and practice.',
                  misconception: 'Students often confuse *symbolism* with *imagery* — they think any vivid description (e.g., "red sky") is a symbol.' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['Revisit the definitions in c11_hin_ar_cbse_01_009 (Class 11 Irony & Symbolism) and create a two-column table: Device |.', 'Practice labeling: take 5 lines from the poem and tag each as *only* imagery, *only* irony, *only* symbol,.', 'Write one PEEL paragraph for each device using the template: Point → Evidence (line reference) → Explanation (how the.', 'Self-check: Does my explanation show *how* the device creates meaning, not just *what* it is?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_010', difficulty: 'standard',
          question: '\'इराक्स\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'यदि मुहावरे का भावार्थ न सूझे, तो उसकी "मूल छवि" (origin image) ढूंढें — जैसे "ताना-बाना".',
          misconception: 'छात्र समझते हैं कि "कठिन शब्द" का अर्थ केवल शब्दकोश से अर्थ ढूंढना है, और "मुहावरे" का अर्थ केवल रटना है। वास्तव में.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'इराक्स\' की पदावली',
                  options: ['\'इराक्स\' की पदावली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'इराक्स\' का कथानक', '\'इराक्स\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि मुहावरे का भावार्थ न सूझे, तो उसकी "मूल छवि" (origin image) ढूंढें — जैसे "ताना-बाना" की मूल.',
                  misconception: 'छात्र समझते हैं कि "कठिन शब्द" का अर्थ केवल शब्दकोश से अर्थ ढूंढना है, और "मुहावरे" का अर्थ केवल रटना है। वास्तव में, बोर्ड परीक्षा में (1).' }
          ],
            remediations: { 'wrong-idea': { steps: ['चरण 1: कविता "पतंग" को दोबारा पढ़ें और हर उस शब्द/वाक्यांश को घेरें जिसका अर्थ आप 5 सेकंड में नहीं बता सकते। चरण 2: उन.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_011', difficulty: 'standard',
          question: '\'इराक्स\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली चुनी।',
          hint: 'Review Class 11 grammar node on non-finite verbs (participles, infinitives) and.',
          misconception: 'Students often think poetic grammar is just "incorrect" or "broken" Hindi.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'इराक्स\' में भाषा-प्रयोग',
                  options: ['\'इराक्स\' में भाषा-प्रयोग', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'इराक्स\' का कथानक', '\'इराक्स\' का पाठ्य-परिवेश (setting)'],
                  hint: 'Review Class 11 grammar node on non-finite verbs (participles, infinitives) and tatpurusha samasa.',
                  misconception: 'Students often think poetic grammar is just "incorrect" or "broken" Hindi.' }
          ],
            remediations: { 'poetic-grammar-is-just-incorrect': { steps: ['Have the student read the poem aloud three times, marking pauses and stress.', 'Provide a side-by-side comparison: poetic line vs.', 'standard prose rewrite for 5 lines.', 'Ask the student to identify the grammatical difference (word order, case, verb form) and hypothesize the effect.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_ar_cbse_02_012', difficulty: 'standard',
          question: '\'इराक्स\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि छात्र वस्तुनिष्ठ/आशय-सूचक का भेद न कर पाए, तो c12_hin_ar_cbse_02_002 (भावार्थ) और.',
          misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि आशय-सूचक प्रश्नों का उत्तर "कविता का भावार्थ" लिखकर पूरा हो जाता है।.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'इराक्स\' के वस्तुनिष्ठ प्रश्न',
                  options: ['\'इराक्स\' के वस्तुनिष्ठ प्रश्न', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'इराक्स\' का कथानक', '\'इराक्स\' का पाठ्य-परिवेश (setting)'],
                  hint: 'यदि छात्र वस्तुनिष्ठ/आशय-सूचक का भेद न कर पाए, तो c12_hin_ar_cbse_02_002 (भावार्थ) और.',
                  misconception: '**विशिष्ट भ्रांति**: छात्र मानते हैं कि आशय-सूचक प्रश्नों का उत्तर "कविता का भावार्थ" लिखकर पूरा हो जाता है। **वास्तविकता**: भावार्थ.' }
          ],
            remediations: { 'paraphrase': { steps: ['**चरण 1**: छात्र से कहें — "पहले प्रश्न को दो श्रेणियों में बाँटो: वस्तुनिष्ठ (तथ्य/एक उत्तर) vs आशय-सूचक.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
