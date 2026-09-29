import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hin_v_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hin_v_ch02_p2: SimDef = {
    id: 'v3_c12_hin_v_ch02_p2',
    title: 'जूझ · Part 2/3',
    subtitle: 'She stitched quilts on credit — so the goats could be someone else\'s',
    classLevel: 12, subject: 'hin_v', topic: 'जूझ · Part 2/3',
    chapters: ['c12_hin_v_ch02'],
    nodeIds: ['c12_hin_v_cbse_02_007', 'c12_hin_v_cbse_02_008', 'c12_hin_v_cbse_02_009', 'c12_hin_v_cbse_02_010', 'c12_hin_v_cbse_02_011', 'c12_hin_v_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Memoir reader', intro: 'A memoir of a boy who reached school late, ashamed — and the mother who calculated that it was worth it.', goal: 'Read the autobiographical sketch through education-as-liberation and the hidden machinery of class readiness.' },
    discovery: {
        question: 'A boy tends goats while other children walk to school — but his mother stitches quilts on credit for officials just to pay his fees. Why does she insist?',
        options: ['Education is the only asset that can\'t be seized — unlike land or livestock, it breaks the cycle of patron-client labour forever', 'Mother\'s love needs no reason', 'Schools were free then', 'To please the teacher'],
        answer: 'Education is the only asset that can\'t be seized — unlike land or livestock, it breaks the cycle of patron-client labour forever',
        hook: 'Read it as calculation, not just sentiment — and notice what the classroom reveals: the fluent classmate\'s ease is cultural capital, not talent. Even the teacher\'s method is real pedagogy — rhythm, repetition and emotion make poems survive decades in a student\'s memory.',
    },
    teaching: [
        { title: 'जूझ — गौण विषय', text: '\'वितान भाग-2 — पाठ 2\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow a goat-herd into a classroom: weigh a mother\'s economic logic, decode what separates the ready student from the late one, and ask what made one teacher\'s verse unforgettable.',
        labels: ['जूझ — गौण विषय', 'जूझ — साहित्यिक युक्तियाँ', 'जूझ — पदावली: मुख्य', 'जूझ — व्याकरण: पाठ', 'जूझ — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_02_008', title: 'जूझ — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'वितान भाग-2 — पाठ 2\' में बिंब ढूँढिए — वितान-भाग-2-—-पाठ-2 — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'Define "imagery" (चित्रात्मकता) in your own words and give one example from the chapter that appeals to the sense of touch (स्पर्श ज्ञान).', options: [
                { text: '**Correct answer:** Imagery is descriptive language that creates sensory experiences for', outcome: '**Correct answer:** Imagery is descriptive language that creates sensory experiences for the.' },
                { text: 'school building looked big', outcome: 'Not quite — Students think **any comparison is a metaphor** and write "स्कूल किला जैसा था" (school was like.', reveals: 'any-comparison-is-a-metaphor' },
                { text: 'beautiful description', outcome: 'Not quite — Students think **any comparison is a metaphor** and write "स्कूल किला जैसा था" (school was like.', reveals: 'any-comparison-is-a-metaphor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_02_009', title: 'जूझ — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'वितान भाग-2 — पाठ 2\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define situational irony and give one example from the chapter where the narrator\'s expectation about school is contradicted by reality.', options: [
                { text: 'Situational irony occurs when the outcome of a situation is the opposite of what was', outcome: 'Situational irony occurs when the outcome of a situation is the opposite of what was expected.' },
                { text: 'the narrator becoming a writer', outcome: 'Not quite — Students often confuse symbolism with "hidden meaning" — they think a symbol is a secret code where.', reveals: 'students-often-confuse-symbolism-with' },
                { text: 'hidden meaning', outcome: 'Not quite — Students often confuse symbolism with "hidden meaning" — they think a symbol is a secret code where.', reveals: 'students-often-confuse-symbolism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_02_010', title: 'जूझ — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'वितान भाग-2 — पाठ 2\' के मुख्य शब्द: वितान-भाग-2-—-पाठ-2 — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'What is the primary difference between a word\'s dictionary meaning (vAkya artha) and its contextual meaning (sandarbhik artha) in literary.', options: [
                { text: 'Dictionary meaning is fixed, decontextualized, and universal', outcome: 'Dictionary meaning is fixed, decontextualized, and universal; contextual meaning is fluid, shaped.' },
                { text: 'contextual meaning is just the dictionary meaning applied to a sentence', outcome: 'Not quite — Students believe "vocabulary in context" means "guessing meaning from surrounding sentences" —.', reveals: 'vocabulary-in-context-means-guessing' },
                { text: 'vocabulary in context', outcome: 'Not quite — Students believe "vocabulary in context" means "guessing meaning from surrounding sentences" —.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Profiling a self-made poet for the alumni magazine, you compress his schooling into one line — \'attended village school\' — and spend the word count on his awards. Your subject objects: \'the whole story is in the teacher who stayed after class.\'',
            decisions: [{ prompt: 'What does the pacing of \'पाठशाला जाने के लिए मन तड़पता था\' confirm?', options: [
                { text: 'He\'s right — the memoir stretches thin on years of schooling and lingers on the teacher\'s poetry sessions because the structure enacts the theme: education-as-awakening gets the slow scenes, education-as-certification gets the summary.', outcome: 'The chapter\'s pacing rule: narrative time follows meaning, not duration — the moments that made him get the slow telling, so the profile should spend its lines where the formation happened.' },
                { text: 'Keep the awards-led structure — readers want the outcome, and the schooling is background.', outcome: 'The memoir\'s frame exists to show the outcome without the process is a résumé, not a story — the reader knows he became a poet; what the retrospective adds is how it felt to become one.', reveals: 'outcome-over-process' },
                { text: 'Balance it evenly — give every year of schooling equal lines so the profile is complete.', outcome: 'Equal coverage is the chronological fallacy the chapter corrects — a formative hour can outweigh a routine year; completeness measured by calendar is flatness measured by meaning.', reveals: 'even-pacing-is-fair' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hin_v_cbse_02_012', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read a school memoir as a class document — where literacy is the one inheritance poverty cannot confiscate.',
            decisions: [{ prompt: 'What comes next? जूझ · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — जूझ · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_007', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'यदि फँस जाएँ तो: c12_hin_v_cbse_02_006 (मुख्य विषय) दोबारा पढ़ें — गौण विषय मुख्य विषय के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि गौण विषय = \'उप-कथानक\' (sub-plot) या \'साइड स्टोरी\'। इसलिए वे केवल घटनाएँ गिनाते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 2\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'वितान भाग-2 — पाठ 2\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 2\' का कथानक — \'वितान भाग-2 — पाठ 2\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँस जाएँ तो: c12_hin_v_cbse_02_006 (मुख्य विषय) दोबारा पढ़ें — गौण विषय मुख्य विषय के \'आयाम\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि गौण विषय = \'उप-कथानक\' (sub-plot) या \'साइड स्टोरी\'। इसलिए वे केवल घटनाएँ गिनाते हैं (जैसे "फूला कुएँ.' }
          ],
            remediations: { 'sub-plot': { steps: ['**चरण 1:** छात्र से कहें: "पाठ खोलो, उन 5 प्रसंगों को चिह्नित करो जहाँ कथानक अनुप्रिया के व्यक्तिगत संघर्ष से हटता है।".', '**चरण 2:** प्रत्येक प्रसंग के लिए पूछें: "यह प्रसंग कौन-सी **बड़ी सामाजिक समस्या** की ओर इशारा करता है?', 'एक शब्द/वाक्यांश में लिखो।" (यह **अमूर्तन/अवधारणा निर्माण** है — घटना से विषय तक।) 3.', '**चरण 3:** अब पूछें: "यह समस्या अनुप्रिया/फूला के मुख्य संघर्ष को कैसे **और जटिल/गंभीर** बनाती है?" (यह **मुख्य विषय से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_008', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'If stuck, revisit c11_hin_v_cbse_01_008 and practice identifying tenor/vehicle in 5.',
          misconception: 'Students think **any comparison is a metaphor** and write "स्कूल किला जैसा था" (school was like a fort) as a metaphor.',
          parts: [
                { id: 'a', prompt: 'The narrator says: "स्कूल एक लकड़ी का लट्ठा है जो गहरे पानी में तैर रहा है" (School is a log floating in deep water).', answer: '**Correct answer:** Tenor = school (स्कूल)',
                  options: ['**Correct answer:** Tenor = school (स्कूल)', 'the school is like a log', 'स्कूल किला जैसा था', 'जैसा/सा/की तरह'],
                  hint: 'If stuck, revisit c11_hin_v_cbse_01_008 and practice identifying tenor/vehicle in 5 simple.',
                  misconception: 'Students think **any comparison is a metaphor** and write "स्कूल किला जैसा था" (school was like a fort) as a metaphor.' },
                { id: 'b', prompt: 'Compare the **visual imagery** of the school in the opening paragraph ("स्कूल की इमारत दूर से एक किले जैसी लगती थी") with the **metaphor** of the "floating.', answer: '**Correct answer:** The "fort" image conveys **awe and permanence**',
                  options: ['**Correct answer:** The "fort" image conveys **awe and permanence**', 'स्कूल किला जैसा था', 'जैसा/सा/की तरह'],
                  hint: 'If stuck, revisit c11_hin_v_cbse_01_008 and practice identifying tenor/vehicle in 5 simple.',
                  misconception: 'Students think **any comparison is a metaphor** and write "स्कूल किला जैसा था" (school was like a fort) as a metaphor.' }
          ],
            remediations: { 'any-comparison-is-a-metaphor': { steps: ['metaphor distinction** using a two-column table: Column A = simile phrases from text ("जैसी", "सा"), Column.', 'Have student convert each simile to a metaphor by deleting "जैसा" and adjusting verb.', '**Sensory scavenger hunt**: Give student a fresh paragraph from the chapter; ask them to highlight words in 5 colors.', 'If they miss a sense, read that sentence aloud and ask "What do you *feel/hear/smell*?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think **any comparison is a metaphor** and write "स्कूल किला जैसा था" (school was like a fort) as a metaphor.',
          parts: [
                { id: 'a', prompt: 'Evaluate this student claim: *"The metaphor \'heart yearning to go to school\' (इकबाल जाने के लिए दिल मचल रहा था) is just a fancy way of saying \'he wanted.', answer: '**Correct answer:** Refute',
                  options: ['**Correct answer:** Refute', 'स्कूल किला जैसा था', 'जैसा/सा/की तरह', 'metaphors are mere synonyms'],
                  hint: 'If stuck, revisit c11_hin_v_cbse_01_008 and practice identifying tenor/vehicle in 5 simple.',
                  misconception: 'Students think **any comparison is a metaphor** and write "स्कूल किला जैसा था" (school was like a fort) as a metaphor.' }
          ],
            remediations: { 'any-comparison-is-a-metaphor': { steps: ['metaphor distinction** using a two-column table: Column A = simile phrases from text ("जैसी", "सा"), Column.', 'Have student convert each simile to a metaphor by deleting "जैसा" and adjusting verb.', '**Sensory scavenger hunt**: Give student a fresh paragraph from the chapter; ask them to highlight words in 5 colors.', 'If they miss a sense, read that sentence aloud and ask "What do you *feel/hear/smell*?" 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_009', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, return to c12_hin_v_cbse_02_004 (protagonist\'s desire for school) and.',
          misconception: 'Students often confuse symbolism with "hidden meaning" — they think a symbol is a secret code where X = Y (e.g., "pen.',
          parts: [
                { id: 'a', prompt: 'Identify a moment of dramatic irony in the interaction between the narrator and his mother regarding the father\'s wish for the narrator\'s education.', answer: 'When the mother says, "The time that belonged to your father is gone',
                  options: ['When the mother says, "The time that belonged to your father is gone', 'hidden meaning', 'pen = freedom', 'a symbol is a secret code where X = Y (e'],
                  hint: 'If stuck, return to c12_hin_v_cbse_02_004 (protagonist\'s desire for school) and.',
                  misconception: 'Students often confuse symbolism with "hidden meaning" — they think a symbol is a secret code where X = Y (e.g., "pen = freedom").' }
          ],
            remediations: { 'students-often-confuse-symbolism-with': { steps: ['If the student gives reductive "X = Y" symbol answers: 1) Have them re-read the mother-bangle scene (page 23-24) and.', '2) Ask: "What changes in the scene if the bangles are removed?" 3) Guide them to write: "The bangles *perform* the.', 'If irony identification fails: 1) Create a two-column table: "Narrator expects" vs "What happens" for five key moments.', '2) Highlight rows where columns contradict.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_010', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'If stuck on register analysis, review Class 11 Aroh Chapter 2 (c11_hin_ar_cbse_02_010).',
          misconception: 'Students believe "vocabulary in context" means "guessing meaning from surrounding sentences" — a reading-comprehension.',
          parts: [
                { id: 'a', prompt: 'What is the primary difference between a word\'s dictionary meaning (vAkya artha) and its contextual meaning (sandarbhik artha) in literary analysis?', answer: 'Dictionary meaning is fixed, decontextualized, and universal',
                  options: ['Dictionary meaning is fixed, decontextualized, and universal', 'contextual meaning is just the dictionary meaning applied to a sentence', 'vocabulary in context', 'guessing meaning from surrounding sentences'],
                  hint: 'If stuck on register analysis, review Class 11 Aroh Chapter 2 (c11_hin_ar_cbse_02_010) where.',
                  misconception: 'Students believe "vocabulary in context" means "guessing meaning from surrounding sentences" — a reading-comprehension strategy.' },
                { id: 'b', prompt: 'The narrator describes Nanak Singh as "lkSanyxsdj ekLVj" (resident teacher) who "Lo;a dfork djrs Fks" (regularly recited poetry).', answer: '"ekLVj" denotes institutional role (salaried, hierarchical, duty-bound)',
                  options: ['"ekLVj" denotes institutional role (salaried, hierarchical, duty-bound)', 'teacher who writes poems', 'vocabulary in context', 'guessing meaning from surrounding sentences'],
                  hint: 'If stuck on register analysis, review Class 11 Aroh Chapter 2 (c11_hin_ar_cbse_02_010) where.',
                  misconception: 'Students believe "vocabulary in context" means "guessing meaning from surrounding sentences" — a reading-comprehension strategy.' },
                { id: 'c', prompt: 'Analyze the word "ng\'kr" (pride/self-respect) as it appears in the description of the principal: "yM+dksa osQ eu esa mudh ng\'kr cSBh gqbZ Fkh." How does this.', answer: '"ng\'kr" here signifies the principal\'s internalized colonial dignity',
                  options: ['"ng\'kr" here signifies the principal\'s internalized colonial dignity', 'self-respect', 'vocabulary in context', 'guessing meaning from surrounding sentences'],
                  hint: 'If stuck on register analysis, review Class 11 Aroh Chapter 2 (c11_hin_ar_cbse_02_010) where.',
                  misconception: 'Students believe "vocabulary in context" means "guessing meaning from surrounding sentences" — a reading-comprehension strategy.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['Have the student re-read only the Nanak Singh scenes (pages 29-33 in NCERT) and highlight every address term used for.', 'For each term, ask: "Who says it? To whom? In what physical setting? With what tone?"', 'Create a 3-column table: Term | Literal Meaning | Narrative Function.', 'Student writes one paragraph explaining how the shift from "yM+dk" (institutional) to "vkuan" (intimate) redefines.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_011', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'If stuck on tense-aspect: Review Class 11 Vitan Chapter 1 Grammar node.',
          misconception: '**Misconception:** "Grammar analysis means labeling parts of speech (noun, verb, tense) in isolated sentences." **Why.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 2\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'वितान भाग-2 — पाठ 2\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 2\' का कथानक — \'वितान भाग-2 — पाठ 2\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck on tense-aspect: Review Class 11 Vitan Chapter 1 Grammar node (c11_hin_v_cbse_01_011).',
                  misconception: '**Misconception:** "Grammar analysis means labeling parts of speech (noun, verb, tense) in isolated sentences." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-grammar-analysis-means-labeling': { steps: ['If a student cannot distinguish past habitual vs.', 'perfective in Diagnostic 1: 1.', '**Revisit Class 11 node c11_hin_v_cbse_01_011** (Grammar: Language Usage in Text) — review the 3-way past tense.', '**Do a 10-sentence transformation drill**: Take 5 simple past sentences from the chapter (e.g., "mlus dgk") → convert.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_012', difficulty: 'standard',
          question: '\'वितान भाग-2 — पाठ 2\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि प्रश्न-प्रकार पहचानने में अटके → c12_hin_v_cbse_02_011 (भाषा-प्रयोग) दोहराएँ.',
          misconception: 'छात्र समझते हैं कि \'आशय-सूचक प्रश्न\' का अर्थ है \'अपनी राय लिखो\' — इसलिए वे पाठ-आधारित साक्ष्य छोड़कर सामान्य ज्ञान या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-2 — पाठ 2\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'वितान भाग-2 — पाठ 2\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-2 — पाठ 2\' का कथानक — \'वितान भाग-2 — पाठ 2\' — वितान भाग-2 का पाठ। पाठ का', '\'वितान भाग-2 — पाठ 2\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि प्रश्न-प्रकार पहचानने में अटके → c12_hin_v_cbse_02_011 (भाषा-प्रयोग) दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि \'आशय-सूचक प्रश्न\' का अर्थ है \'अपनी राय लिखो\' — इसलिए वे पाठ-आधारित साक्ष्य छोड़कर सामान्य ज्ञान या नैतिक उपदेश लिख देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को 5 वस्तुनिष्ठ और 5 आशय-सूचक प्रश्नों की मिश्रित सूची दें; उसे प्रत्येक को लेबल करने को कहें और कारण बताने को.', 'फिर एक ही प्रसंग पर दोनों प्रकार के प्रश्न बनवाएँ और उत्तर लिखवाएँ — वस्तुनिष्ठ के लिए \'पाठ-वाक्य उद्धरण\', आशय-सूचक के.', 'पुनः निदान: c11_hin_v_cbse_02_012 (कक्षा 11 का समान नोड) के 3-4 प्रश्न हल करवाएँ और तुलना करें कि कक्षा 12 में अपेक्षा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
