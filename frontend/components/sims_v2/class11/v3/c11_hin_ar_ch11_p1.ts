import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch11_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch11_p1',
    title: 'पाठ 11 · Part 1/3',
    subtitle: 'Walk through a remembered home that slowly relocates inside the speaker.',
    classLevel: 11, subject: 'hin_ar', topic: 'पाठ 11 · Part 1/3',
    chapters: ['c11_hin_ar_ch11'],
    nodeIds: ['c11_hin_ar_cbse_11_001', 'c11_hin_ar_cbse_11_002', 'c11_hin_ar_cbse_11_003', 'c11_hin_ar_cbse_11_004', 'c11_hin_ar_cbse_11_005', 'c11_hin_ar_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an emigrant reconstructing a childhood home from memory', intro: 'A poet of the masses looks back at a mud-walled house — and finds the building was never the point.', goal: 'Analyse the poem\'s refrain-anchored structure and its movement from place to person to identity.' },
    discovery: {
        question: 'Bachchan\'s \'घर की याद\' keeps returning to the same refrain — is the repetition just decoration?',
        options: ['No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker', 'Yes — it\'s a leftover from oral tradition', 'Yes — poets repeat lines to fill stanzas', 'No — the refrain changes meaning each time, so it\'s three different lines'],
        answer: 'No — the refrain is the anchor pulling wandering memory back: home isn\'t the building but the presence living in the speaker',
        hook: 'The poem moves house → people → self: first walls and courtyards, then a father\'s voice and a mother\'s cooking, then the realization the home now lives inside the speaker.',
    },
    teaching: [
        { title: 'पाठ 11 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split the poem into its three phases — physical house, human presence, internal landscape — and test what the circular ending gains.',
        labels: ['पाठ 11 — पृष्ठभूमि', 'पाठ 11 — कथानक', 'पाठ 11 — पाठ्य-परिवेश', 'पाठ 11 — पात्र-चित्रण', 'पाठ 11 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_001', title: 'पाठ 11 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'आरोह भाग-1 खोलिए और पाठ 11 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'Who is the poet of "?kj dh ;kn" and what is his most famous early work that brought him instant fame?', options: [
                { text: 'The poet is Harivansh Rai Bachchan (1913–2003)', outcome: 'The poet is Harivansh Rai Bachchan (1913–2003). His most famous early work is "Madhushala" (1935).' },
                { text: 'context', outcome: 'Not quite — Students often believe "context" means memorizing dates (birth, death, publication year) and.', reveals: 'context-means-memorizing-dates-birth' },
                { text: 'Nirala or Mahadevi Verma', outcome: 'Not quite — Students often believe "context" means memorizing dates (birth, death, publication year) and.', reveals: 'context-means-memorizing-dates-birth' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_003', title: 'पाठ 11 — पाठ्य-परिवेश और वातावरण',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 11\' का परिवेश: \'आरोह भाग-1 — पाठ 11\' — आरोह भाग-1 का पाठ। पाठ का कथानक, पात्र और केंद्रीय भाव पाठ्यपुस्तक — स्थान और समय मिलकर माहौल बनाते.',
            decisions: [{ prompt: 'What is the primary physical setting of the poem "?kj dh ;kn" and what time period does it suggest?', options: [
                { text: 'The primary setting is an old ancestral house (described through cracked walls, leaky', outcome: 'The primary setting is an old ancestral house (described through cracked walls, leaky roof, broken.' },
                { text: 'a house', outcome: 'Not quite — Students often treat setting as a static backdrop — just listing physical details like "old house.', reveals: 'students-often-treat-setting-as' },
                { text: 'village', outcome: 'Not quite — Students often treat setting as a static backdrop — just listing physical details like "old house.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_005', title: 'पाठ 11 — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: '\'आरोह भाग-1 — पाठ 11\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'In "?kj dh ;kn", which three supporting characters (or personified entities) appear most frequently across the stanzas, and what single.', options: [
                { text: 'The three most frequent supporting presences are: (1) the wife/mother, identified by', outcome: 'The three most frequent supporting presences are: (1) the wife/mother, identified by \'ek¡\' (mother).' },
                { text: 'supporting character analysis', outcome: 'Not quite — Students believe "supporting character analysis" means writing a mini-biography for each character.', reveals: 'supporting-character-analysis-means-writing' },
                { text: 'the father, the poet, or abstract concepts like \'memory\'', outcome: 'Not quite — Students believe "supporting character analysis" means writing a mini-biography for each character.', reveals: 'supporting-character-analysis-means-writing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a poetry recital rehearsal, a classmate prepares Bachchan\'s \'Ghar ki Yaad\' and announces: \'It\'s a descriptive poem — the poet lists the walls, rooms and courtyard of his old house. I\'ll read it flat, like an estate agent\'s inventory.\'',
            decisions: [{ prompt: 'What should the performance convey instead?', options: [
                { text: 'Rebuild the reading around the arc: the poem moves from physical description to emotional memory — the father\'s voice, the mother\'s silence, the joint family — to philosophical reflection; the \'events\' are mental acts: remembering, comparing, realising. The refrain isn\'t decoration but the anchor pulling wandering memory back to the core truth: home is not a building but a living presence within the speaker.', outcome: 'The recital shifts register: the house outside becomes the house inside — a consciousness-driven journey, not an inventory.' },
                { text: 'Keep the flat reading — it IS a list of rooms and walls; honesty over drama.', outcome: 'Description is the entry, not the destination: the poem\'s structure carries the speaker from architecture to identity — flat reading strands it at the door.', reveals: 'poem-is-house-inventory' },
                { text: 'Add dramatic events instead — act out family scenes so the audience \'sees\' a plot.', outcome: 'Staging external scenes invents what the poem deliberately does internally: the structure is a memory-journey anchored by refrain, not a family drama.', reveals: 'invent-events-for-plot' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'The house that \'stood silent\' in stanza one ends \'living in me\' — the same line, transformed by twelve stanzas of remembering.',
            decisions: [{ prompt: 'What comes next? पाठ 11 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 11 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'Review Class 10 Hindi textbook chapter "Hindi Sahitya ka Itihas" focusing on the.',
          misconception: 'Students often believe "context" means memorizing dates (birth, death, publication year) and listing awards.',
          parts: [
                { id: 'a', prompt: 'Who is the poet of "?kj dh ;kn" and what is his most famous early work that brought him instant fame?', answer: 'The poet is Harivansh Rai Bachchan (1913–2003)',
                  options: ['The poet is Harivansh Rai Bachchan (1913–2003)', 'context', 'Nirala or Mahadevi Verma'],
                  hint: 'Review Class 10 Hindi textbook chapter "Hindi Sahitya ka Itihas" focusing on the Chhayavaad period.',
                  misconception: 'Students often believe "context" means memorizing dates (birth, death, publication year) and listing awards.' }
          ],
            remediations: { 'context-means-memorizing-dates-birth': { steps: ['If a student reduces context to a fact-list: (1) Ask them to close the textbook and tell you *one thing* about.', '(2) Have them read the first two stanzas aloud and circle every word that signals "village/rural life" (e.g., aangan.', '(3) Connect each circled word to a biographical fact (father\'s transferable job, mother\'s domesticity).', '(4) Ask: "If the poet had been a city-born industrialist\'s son, which three images would vanish?" This forces active.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_002', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' का कथानक — \'आरोह भाग-1 — पाठ 11\' — आरोह भाग-1 का पाठ। पाठ.',
          hint: 'If stuck, review: "घटनाओं का कालानुक्रमिक क्रम (chronological sequence) बनाएं — यही कथानक.',
          misconception: '**Specific Error:** Students conflate *plot summary* (कथासार) with *plot analysis* (कथानक विश्लेषण) and treat.',
          parts: [
                { id: 'a', prompt: '\'अपना-अपना भाग्य\' कहानी में भविष्यवक्ता का कथन कहानी के आरंभ में आता है, लेकिन उसकी पूर्ति अंत में होती है। यह कौन-सा आख्यानिक युक्ति (narrative device) है?', answer: 'यह **प्रोलेप्सिस (prolepsis / flashforward)** है',
                  options: ['यह **प्रोलेप्सिस (prolepsis / flashforward)** है', 'कैसे पूरा होगा?', 'यह फ्लैशबैक है'],
                  hint: 'If stuck, review: "घटनाओं का कालानुक्रमिक क्रम (chronological sequence) बनाएं — यही कथानक (fabula).',
                  misconception: '**Specific Error:** Students conflate *plot summary* (कथासार) with *plot analysis* (कथानक विश्लेषण) and treat *narrative structure*.' }
          ],
            remediations: { 'specific-error-students-conflate-plot': { steps: ['**Isolate the confusion:** Give the student two versions of the same micro-story (3 events: A→B→C).', 'Version 1: Linear (A, then B, then C).', 'Version 2: In media res (B, flashback to A, then C).', 'Effect on reader same?" 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_003', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'If stuck, review the poem\'s summary and context from node c11_hin_ar_cbse_11_001.',
          misconception: 'Students often treat setting as a static backdrop — just listing physical details like "old house, cracked walls, leaky.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित',
                  options: ['\'आरोह भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 11\' का कथानक — \'आरोह भाग-1 — पाठ 11\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 11\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।'],
                  hint: 'If stuck, review the poem\'s summary and context from node c11_hin_ar_cbse_11_001, focusing on the.',
                  misconception: 'Students often treat setting as a static backdrop — just listing physical details like "old house, cracked walls, leaky roof" — and.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student pick ONE physical detail from the poem (e.g., "izk.k eu f?kjrk" — the leaking roof).', 'Ask: "What specific memory does the poet attach to this leak?" (Answer: monsoon nights, father\'s worry, family.', 'Ask: "If the roof weren\'t leaking, would that memory exist?" Guide them to see the leak CREATES the memory.', 'Repeat with two more details until they can articulate: "The setting detail and the emotion are the same thing in this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat setting as a static backdrop — just listing physical details like "old house, cracked walls, leaky.',
          parts: [
                { id: 'a', prompt: 'Evaluate whether the poem\'s atmosphere is ultimately one of despair or resilience. Support your judgment with two specific textual evidences.', answer: 'The atmosphere is resilience',
                  options: ['The atmosphere is resilience', 'despair'],
                  hint: 'If stuck, review the poem\'s summary and context from node c11_hin_ar_cbse_11_001, focusing on the.',
                  misconception: 'Students often treat setting as a static backdrop — just listing physical details like "old house, cracked walls, leaky roof" — and.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student pick ONE physical detail from the poem (e.g., "izk.k eu f?kjrk" — the leaking roof).', 'Ask: "What specific memory does the poet attach to this leak?" (Answer: monsoon nights, father\'s worry, family.', 'Ask: "If the roof weren\'t leaking, would that memory exist?" Guide them to see the leak CREATES the memory.', 'Repeat with two more details until they can articulate: "The setting detail and the emotion are the same thing in this.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_004', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_11_002 (कथानक और आख्यान-संरचना)** के \'टर्निंग.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि पात्र-चित्रण = पात्र के गुणों की **वर्णमाला क्रम में सूची** (alphabetical list.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 11\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
                  options: ['\'आरोह भाग-1 — पाठ 11\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 11\' का कथानक — \'आरोह भाग-1 — पाठ 11\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटका हुआ महसूस हो तो **c11_hin_ar_cbse_11_002 (कथानक और आख्यान-संरचना)** के \'टर्निंग पॉइंट्स\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि पात्र-चित्रण = पात्र के गुणों की **वर्णमाला क्रम में सूची** (alphabetical list of traits).' }
          ],
            remediations: { 'alphabetical-list-of-traits-1': { steps: ['**पाठ को \'पात्र-लेंस\' (character lens) से पुनः पढ़ें:** नायक के हर संवाद/क्रिया के आगे लिखें — "यह उसके *कौन-से* गुण को.', '**\'विरोधाभास तालिका\' (Contradiction Table) बनाएँ:** दो कॉलम — "बाहरी व्यवहार" और "आंतरिक वास्तविकता"। हर प्रमुख दृश्य.', '**एक गुण को \'माइक्रोस्कोप\' के नीचे रखें:** केवल एक गुण (जैसे: न्यायप्रियता) लें और पाठ में उसके **तीन रूप** खोजें — (क).', '**बोर्ड उत्तर-लेखन ढाँचा (PEEL) का अभ्यास:** Point → Evidence (उद्धरण) → Explanation (विश्लेषण) → Link (कथानक/विषय से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_005', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'Review c11_hin_ar_cbse_11_004\'s worked example on the father\'s "dual voice" (the.',
          misconception: 'Students believe "supporting character analysis" means writing a mini-biography for each character (age, personality.',
          parts: [
                { id: 'a', prompt: 'Compare the portrayal of the house in the opening refrain ("?kj u”kj esa frj jgk gS") with its portrayal in the closing stanzas ("foaQrq ;g cl cM+k cl gS / blh.', answer: 'Opening: the house is a concrete, sensory place',
                  options: ['Opening: the house is a concrete, sensory place', 'supporting character analysis'],
                  hint: 'Review c11_hin_ar_cbse_11_004\'s worked example on the father\'s "dual voice" (the remembering \'I\'.',
                  misconception: 'Students believe "supporting character analysis" means writing a mini-biography for each character (age, personality, likes/dislikes) as.' }
          ],
            remediations: { 'supporting-character-analysis-means-writing': { steps: ['Ask the student to list every noun/pronoun referring to someone other than "eSa" (I) in the poem.', 'For each, ask: "Does this figure speak? Act? Or only appear in the speaker\'s memory/imagination?"', 'Show how the text *constructs* the wife through three specific images (Stanza 2: "cfgu vkbZ cki osQ ?kj"; Stanza 3.', 'Practice writing one analytical sentence per figure using the template: "The poem constructs [figure].'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_11_006', difficulty: 'standard',
          question: '\'आरोह भाग-1 — पाठ 11\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 11\' का केंद्रीय भाव और.',
          hint: 'If stuck, review the concept of "refrain as structural argument" from.',
          misconception: 'Students conflate *theme* with *subject* or *plot summary*, writing "The poem is about missing home" instead of "The.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'आरोह भाग-1 — पाठ 11\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 11\' का केंद्रीय भाव और संदेश',
                  options: ['\'आरोह भाग-1 — पाठ 11\' का मुख्य विषय — \'आरोह भाग-1 — पाठ 11\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'आरोह भाग-1 — पाठ 11\' का कथानक — \'आरोह भाग-1 — पाठ 11\' — आरोह भाग-1 का पाठ। पाठ का कथानक,', '\'आरोह भाग-1 — पाठ 11\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review the concept of "refrain as structural argument" from c11_hin_ar_cbse_11_002 (Plot.',
                  misconception: 'Students conflate *theme* with *subject* or *plot summary*, writing "The poem is about missing home" instead of "The poem explores how.' }
          ],
            remediations: { 'students-conflate-theme-with-subject': { steps: ['**Re-anchor with the refrain**: Have the student write each variant of the refrain on a separate card and arrange them.', '**Map the "Four Walls"**: Draw a rectangle labeled "pkj HkkbZ pkj cfgusa".', 'Inside, place sticky notes for each memory (father\'s silence, mother\'s letter, childhood games).', 'Outside, write what *erodes* them (time, distance, death).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
