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
        { title: 'जूझ — गौण विषय', text: 'गौण विषय (Sub-themes) वे सहायक कथानक या विचार-धाराएँ हैं जो मुख्य विषय के समानांतर चलती हैं, पात्रों के अंतर्विरोध उजागर करती हैं, सामाजिक-सांस्कृतिक परिवेश को विस्तार देती हैं, और कृति के केंद्रीय.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hin_v_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow a goat-herd into a classroom: weigh a mother\'s economic logic, decode what separates the ready student from the late one, and ask what made one teacher\'s verse unforgettable.',
        labels: ['जूझ — गौण विषय', 'जूझ — साहित्यिक युक्तियाँ', 'जूझ — पदावली: मुख्य', 'जूझ — व्याकरण: पाठ', 'जूझ — बोध-प्रश्न: वस्तुनिष्ठ'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'build', nodeId: 'c12_hin_v_cbse_02_010', title: 'Put the steps in order',
          build: { prompt: 'Rebuild the worked example — tap the steps in the right order', blocks: ['प्रत्येक प्रसंग के लिए: (क) वाक्य लिखिए, (ख) \'संघर्ष\' का.', '\'जूझ\' (क्रिया/क्रिया-विशेषणात्मक) और \'संघर्ष\' (संज्ञा) के.', 'पाठ से \'संघर्ष\' के तीनों प्रसंग ढूंढिए (पृष्ठ.', 'निष्कर्ष: लेखक \'संघर्ष\' का प्रयोग **संघर्ष को ठोस, नाम देने.', 'तीनों अर्थों की तुलना कीजिए — क्या क्रमिक विकास है? (जैसे.'], answer: 'पाठ से \'संघर्ष\' के तीनों प्रसंग ढूंढिए (पृष्ठ. प्रत्येक प्रसंग के लिए: (क) वाक्य लिखिए, (ख) \'संघर्ष\' का. तीनों अर्थों की तुलना कीजिए — क्या क्रमिक विकास है? (जैसे. \'जूझ\' (क्रिया/क्रिया-विशेषणात्मक) और \'संघर्ष\' (संज्ञा) के. निष्कर्ष: लेखक \'संघर्ष\' का प्रयोग **संघर्ष को ठोस, नाम देने.' } },
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
          question: 'गौण विषय (Sub-themes) वे सहायक कथानक या विचार-धाराएँ हैं जो मुख्य विषय के.',
          hint: 'यदि फँस जाएँ तो: c12_hin_v_cbse_02_006 (मुख्य विषय) दोबारा पढ़ें — गौण विषय मुख्य विषय के.',
          misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि गौण विषय = \'उप-कथानक\' (sub-plot) या \'साइड स्टोरी\'। इसलिए वे केवल घटनाएँ गिनाते.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'गौण विषय (Sub-themes) वे सहायक कथानक या विचार-धाराएँ हैं जो मुख्य विषय के समानांतर चलती',
                  options: ['गौण विषय (Sub-themes) वे सहायक कथानक या विचार-धाराएँ हैं जो मुख्य विषय के समानांतर चलती', '"पृष्ठभूमि और रचनाकार परिचय" किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', '\'जूझ\' का कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कथा में चित्रित वह समग्र भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फँस जाएँ तो: c12_hin_v_cbse_02_006 (मुख्य विषय) दोबारा पढ़ें — गौण विषय मुख्य विषय के \'आयाम\'.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र समझते हैं कि गौण विषय = \'उप-कथानक\' (sub-plot) या \'साइड स्टोरी\'। इसलिए वे केवल घटनाएँ गिनाते हैं (जैसे "फूला कुएँ.' }
          ],
            remediations: { 'sub-plot': { steps: ['**चरण 1:** छात्र से कहें: "पाठ खोलो, उन 5 प्रसंगों को चिह्नित करो जहाँ कथानक अनुप्रिया के व्यक्तिगत संघर्ष से हटता है।".', '**चरण 2:** प्रत्येक प्रसंग के लिए पूछें: "यह प्रसंग कौन-सी **बड़ी सामाजिक समस्या** की ओर इशारा करता है?', 'एक शब्द/वाक्यांश में लिखो।" (यह **अमूर्तन/अवधारणा निर्माण** है — घटना से विषय तक।) 3.', '**चरण 3:** अब पूछें: "यह समस्या अनुप्रिया/फूला के मुख्य संघर्ष को कैसे **और जटिल/गंभीर** बनाती है?" (यह **मुख्य विषय से.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_008', difficulty: 'standard',
          question: '**बिंब (Imagery):** शब्दों के माध्यम से इंद्रिय-अनुभूतियों (दृश्य, श्रवण.',
          hint: 'यदि अटके: c11_hin_v_cbse_01_008 (वितान पाठ-1 बिंब-रूपक) के "कार्यपत्रक" खंड को दोहराएँ.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **बिंब केवल "सुंदर वर्णन" (descriptive decoration)** है और **रूपक केवल "तुलना".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**बिंब (Imagery):** शब्दों के माध्यम से इंद्रिय-अनुभूतियों (दृश्य, श्रवण, घ्राण, स्पर्श,',
                  options: ['**बिंब (Imagery):** शब्दों के माध्यम से इंद्रिय-अनुभूतियों (दृश्य, श्रवण, घ्राण, स्पर्श,', '"पृष्ठभूमि और रचनाकार परिचय" किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', '\'जूझ\' का कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कथा में चित्रित वह समग्र भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि अटके: c11_hin_v_cbse_01_008 (वितान पाठ-1 बिंब-रूपक) के "कार्यपत्रक" खंड को दोहराएँ — वहाँ.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **बिंब केवल "सुंदर वर्णन" (descriptive decoration)** है और **रूपक केवल "तुलना" (comparison)** है।.' }
          ],
            remediations: { 'descriptive-decoration-comparison-1-authenticate': { steps: ['**पुनः पाठ पढ़ें (c12_hin_v_cbse_02_002, c12_hin_v_cbse_02_003):** केवल उन अंशों को चिह्नित करें जहाँ इंद्रिय शब्द आएँ.', '**वाक्य-संरचना जाँचें (c11_hin_v_cbse_01_008, c11_hin_v_cbse_02_008 रेफर करें):** प्रत्येक चिह्नित वाक्य में पूछें.', 'यदि हाँ → उपमा/उत्प्रेक्षा/उपमान (बिंब हो सकता है, रूपक नहीं)। यदि नहीं, और एक वस्तु दूसरी *बन* गई है → रूपक। 3.', '**प्रभाव-लेखन अभ्यास:** प्रत्येक पहचाने गए बिंब/रूपक के लिए एक वाक्य लिखें: "यह युक्ति पाठक को ______ महसूस/समझ कराती.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_009', difficulty: 'standard',
          question: '**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जहाँ कथन या स्थिति में दो विरोधी.',
          hint: 'यदि फँसें तो **c12_hin_v_cbse_02_002 (कथानक)** और **c12_hin_v_cbse_02_004 (नायक चरित्र)**.',
          misconception: 'छात्र **विरोधाभास** को **विरोधाभासी अलंकार (ऑक्सीमोरन)** जैसे "मधुर कड़वाहट" समझ लेते हैं — जबकि उपन्यास में विरोधाभास.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जहाँ कथन या स्थिति में दो विरोधी तथ्य एक',
                  options: ['**विरोधाभास (Paradox)** वह साहित्यिक युक्ति है जहाँ कथन या स्थिति में दो विरोधी तथ्य एक', '"पृष्ठभूमि और रचनाकार परिचय" किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', '\'जूझ\' का कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कथा में चित्रित वह समग्र भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि फँसें तो **c12_hin_v_cbse_02_002 (कथानक)** और **c12_hin_v_cbse_02_004 (नायक चरित्र)** को 15.',
                  misconception: 'छात्र **विरोधाभास** को **विरोधाभासी अलंकार (ऑक्सीमोरन)** जैसे "मधुर कड़वाहट" समझ लेते हैं — जबकि उपन्यास में विरोधाभास.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को **c11_hin_v_cbse_01_009** (कक्षा 11 वितान पाठ 1: विरोधाभास और प्रतीक) पुनः पढ़ने को कहें, विशेषकर "प्रतीक का.', '\'जूझ\' के अध्याय 3 और 7 से **पाँच-पाँच वाक्य** निकालें जहाँ कथन-आचरण में अंतर हो — उन्हें दो कॉलम में लिखें: "कहा".', 'इसी तरह तीन वस्तुएँ (साइकिल, बारिश, खिड़की) चुनें और प्रत्येक के लिए **तीन कालखंडों** (आरंभ, मध्य, अंत) में अर्थ.', 'पुनः नैदानिक प्रश्न 2 और 4 हल करें — यदि अब सही, तो आगे बढ़ें।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_010', difficulty: 'standard',
          question: 'पदावली (Vocabulary) in \'जूझ\' refers to the curated set of key words — including.',
          hint: 'If stuck on word-origin classification → revisit **c11_hin_v_cbse_02_010** (Class 11.',
          misconception: 'Students treat \'पदावली\' as a **vocabulary list to memorize** — they learn "जूझ = संघर्ष, व्यथा = दुख" and stop there.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'पदावली (Vocabulary) in \'जूझ\' refers to the curated set of key words',
                  options: ['पदावली (Vocabulary) in \'जूझ\' refers to the curated set of key words', '"पृष्ठभूमि और रचनाकार परिचय" किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', '\'जूझ\' का कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कथा में चित्रित वह समग्र भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'If stuck on word-origin classification → revisit **c11_hin_v_cbse_02_010** (Class 11 Vitan Ch2.',
                  misconception: 'Students treat \'पदावली\' as a **vocabulary list to memorize** — they learn "जूझ = संघर्ष, व्यथा = दुख" and stop there.' }
          ],
            remediations: { 'students-treat-as-a-vocabulary': { steps: ['Pick **one pivotal word** (e.g., \'आत्मबल\') from the text.', 'Find **all 3-4 occurrences** in the chapter.', 'For each, write: (a) Sentence before, (b) The word, (c) Sentence after, (d) *Why this word here?*', 'Compare with a synonym (e.g., \'हौसला\', \'शक्ति\') — write why the synonym *fails*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_011', difficulty: 'standard',
          question: '"पाठ में भाषा-प्रयोग" refers to the deliberate choices an author makes.',
          hint: 'If stuck on verb identification, review Class 11 Hindi grammar chapter "क्रिया और काल".',
          misconception: 'Students treat "भाषा-प्रयोग" as a **vocabulary listing exercise** — they underline "difficult words" (कठिन शब्द) and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"पाठ में भाषा-प्रयोग" refers to the deliberate choices an author makes in vocabulary',
                  options: ['"पाठ में भाषा-प्रयोग" refers to the deliberate choices an author makes in vocabulary', '"पृष्ठभूमि और रचनाकार परिचय" किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', '\'जूझ\' का कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कथा में चित्रित वह समग्र भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'If stuck on verb identification, review Class 11 Hindi grammar chapter "क्रिया और काल" (Verb and.',
                  misconception: 'Students treat "भाषा-प्रयोग" as a **vocabulary listing exercise** — they underline "difficult words" (कठिन शब्द) and write meanings.' }
          ],
            remediations: { 'students-treat-as-a-vocabulary': { steps: ['**Revisit c11_hin_v_cbse_02_011 (Class 11 Vitan Ch2 भाषा-प्रयोग)** — re-do its Worked Example 2 on voice-shift.', '**Micro-drill**: Take 3 sentences from "जूझ" (e.g., opening para, climax, ending).', 'For each: (a) identify verb tense/voice, (b) rewrite in opposite voice, (c) write 1 line on *what changes in tone*.', '**Re-diagnostic**: Attempt DIAGNOSTIC_QUESTION_3 again — if you can now explain *why* active voice serves the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hin_v_cbse_02_012', difficulty: 'standard',
          question: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे प्रश्न हैं जिनका उत्तर पाठ में.',
          hint: 'यदि प्रश्न-प्रकार पहचानने में अटके → c12_hin_v_cbse_02_011 (भाषा-प्रयोग) दोहराएँ.',
          misconception: 'छात्र समझते हैं कि \'आशय-सूचक प्रश्न\' का अर्थ है \'अपनी राय लिखो\' — इसलिए वे पाठ-आधारित साक्ष्य छोड़कर सामान्य ज्ञान या.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'वस्तुनिष्ठ प्रश्न (Objective Questions) वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से',
                  options: ['वस्तुनिष्ठ प्रश्न (Objective Questions) वे प्रश्न हैं जिनका उत्तर पाठ में स्पष्ट रूप से', '"पृष्ठभूमि और रचनाकार परिचय" किसी साहित्यिक कृति के **ऐतिहासिक, सामाजिक, सांस्कृतिक', '\'जूझ\' का कथानक (Plot) घटनाओं का तार्किक और कारण-कार्य संबंध से बंधा हुआ क्रम है, जबकि', 'पाठ्य-परिवेश और वातावरण का अर्थ है कथा में चित्रित वह समग्र भौगोलिक, सामाजिक, सांस्कृतिक,'],
                  hint: 'यदि प्रश्न-प्रकार पहचानने में अटके → c12_hin_v_cbse_02_011 (भाषा-प्रयोग) दोहराएँ.',
                  misconception: 'छात्र समझते हैं कि \'आशय-सूचक प्रश्न\' का अर्थ है \'अपनी राय लिखो\' — इसलिए वे पाठ-आधारित साक्ष्य छोड़कर सामान्य ज्ञान या नैतिक उपदेश लिख देते.' }
          ],
            remediations: { 'wrong-idea': { steps: ['छात्र को 5 वस्तुनिष्ठ और 5 आशय-सूचक प्रश्नों की मिश्रित सूची दें; उसे प्रत्येक को लेबल करने को कहें और कारण बताने को.', 'फिर एक ही प्रसंग पर दोनों प्रकार के प्रश्न बनवाएँ और उत्तर लिखवाएँ — वस्तुनिष्ठ के लिए \'पाठ-वाक्य उद्धरण\', आशय-सूचक के.', 'पुनः निदान: c11_hin_v_cbse_02_012 (कक्षा 11 का समान नोड) के 3-4 प्रश्न हल करवाएँ और तुलना करें कि कक्षा 12 में अपेक्षा.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
