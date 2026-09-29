import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch01_p2: SimDef = {
    id: 'v3_c11_hin_v_ch01_p2',
    title: 'पाठ 1 · Part 2/3',
    subtitle: 'Watch theatre\'s grammar shift from the spoken word to the seen image.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 1 · Part 2/3',
    chapters: ['c11_hin_v_ch01'],
    nodeIds: ['c11_hin_v_cbse_01_007', 'c11_hin_v_cbse_01_008', 'c11_hin_v_cbse_01_009', 'c11_hin_v_cbse_01_010', 'c11_hin_v_cbse_01_011', 'c11_hin_v_cbse_01_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a theatre-goer learning to watch with new eyes', intro: 'Before the curtain: a voice from a machine, no face attached — Agyeya builds his whole argument about modern theatre from that disembodied sound.', goal: 'Distinguish literary and visual drama and analyse the essay\'s experiential-to-theoretical arc.' },
    discovery: {
        question: 'A play\'s power used to live in its words — then cinema made sound, light and silence do the talking. Did audiences\' eyes actually change?',
        options: ['Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted', 'No — an audience is an audience, whatever the medium', 'No — only critics changed, not viewers', 'Yes — but only because tickets got cheaper'],
        answer: 'Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted',
        hook: 'Agyeya opens by hearing a gramophone before seeing anything — a miniature of his thesis: modern theatre detached sound from sight and rewired the senses.',
    },
    teaching: [
        { title: 'पाठ 1 — गौण विषय', text: '\'वितान भाग-1 — पाठ 1\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split classical Sanskrit, Parsi-folk and Mohan Rakesh\'s realism into their governing principles, then judge whether word-dominant and visual-dominant theatre can even be compared.',
        labels: ['पाठ 1 — गौण', 'पाठ 1 — साहित्यिक', 'पाठ 1 — पदावली', 'पाठ 1 — व्याकरण', 'पाठ 1 — बोध-प्रश्न'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_007', title: 'पाठ 1 — गौण विषय',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 1\' में वितान-भाग-1-—-पाठ-1 जैसे सहायक विचार आते हैं।',
            decisions: [{ prompt: 'What is the definition of a secondary theme in literary analysis, and how does it differ from the primary theme?', options: [
                { text: 'A secondary theme is a supporting idea or motif that runs parallel to the primary theme,', outcome: 'A secondary theme is a supporting idea or motif that runs parallel to the primary theme, adding.' },
                { text: 'subplots', outcome: 'Not quite — Students often confuse "secondary themes" with "subtopics mentioned in the text." They list topics.', reveals: 'students-often-confuse-secondary-themes' },
                { text: 'minor topics', outcome: 'Not quite — Students often confuse "secondary themes" with "subtopics mentioned in the text." They list topics.', reveals: 'students-often-confuse-secondary-themes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_008', title: 'पाठ 1 — साहित्यिक युक्तियाँ: बिंब और रूपक',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 1\' में बिंब ढूँढिए — वितान-भाग-1-—-पाठ-1 — ये दृश्य पाठ को जीवंत बनाते हैं।',
            decisions: [{ prompt: 'According to the author, what is the primary distinction between fp=kiV laxhr (visual art) and \'kkL=kh; laxhr (literary art) in terms.', options: [
                { text: 'The author states that fp=kiV laxhr\'s foundation is "izkFkfed voLFkk"', outcome: 'The author states that fp=kiV laxhr\'s foundation is "izkFkfed voLFkk" (immediate/existential state).' },
                { text: 'visual art uses colors, literary art uses words', outcome: 'Not quite — Students conflate "imagery" with "figurative language" (metaphor, simile, personification) and hunt.', reveals: 'students-conflate-imagery-with-figurative' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_009', title: 'पाठ 1 — साहित्यिक युक्तियाँ: विरोधाभास और प्रतीक',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 1\' में विरोधाभास ढूँढिए — जहाँ विपरीत बातें मिलकर सच बनाती हैं।',
            decisions: [{ prompt: 'Define verbal irony and situational irony in your own words, giving one example of each from everyday life (not from the textbook).', options: [
                { text: 'Verbal irony occurs when a speaker says the opposite of what they mean (e.g., saying', outcome: 'Verbal irony occurs when a speaker says the opposite of what they mean (e.g., saying "Great job!".' },
                { text: 'situational irony', outcome: 'Not quite — Students often believe irony and symbolism are merely decorative "figures of speech" that authors.', reveals: 'irony-and-symbolism-are-merely' },
                { text: 'figures of speech', outcome: 'Not quite — Students often believe irony and symbolism are merely decorative "figures of speech" that authors.', reveals: 'irony-and-symbolism-are-merely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_010', title: 'पाठ 1 — पदावली: मुख्य शब्द',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 1\' के मुख्य शब्द: वितान-भाग-1-—-पाठ-1 — इनका अर्थ जानिए।',
            decisions: [{ prompt: 'What is the most reliable first step when encountering an unपरिचित key word in a senior secondary Hindi prose text?', options: [
                { text: 'The most reliable first step is to locate all occurrences of the word in the chapter and', outcome: 'The most reliable first step is to locate all occurrences of the word in the chapter and examine.' },
                { text: 'look up the dictionary meaning first', outcome: 'Not quite — Students believe vocabulary in context means guessing a word\'s meaning from the single sentence.', reveals: 'vocabulary-in-context-means-guessing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your theatre club is adapting a stage play into a short film. A member says: \'Just film the play — theatre is literature, cinema is just literature with a camera. Agyeya\'s essay on Mohan Rakesh is basically a biography of a playwright.\'',
            decisions: [{ prompt: 'What does Agyeya\'s argument actually say?', options: [
                { text: 'Explain the grammar shift: the essay is a manifesto for रंगमंचीय/चित्रकाव्य as an independent art — a move from शब्द-प्रधान (word-dominant) to दृश्य-श्रव्य-प्रधान (audio-visual dominant) theatre. Silence, light, sound and pause have their own grammar that literary criticism ignores; Mohan Rakesh is the case study of a playwright who bridged both traditions, not merely the subject of a biography.', outcome: 'The adaptation rethink begins: film isn\'t filmed literature — it tells through image and sound, which is precisely the epistemological shift the essay maps.' },
                { text: 'Film the play as written — if the script is strong, the medium doesn\'t matter.', outcome: 'That\'s exactly the assumption the essay dismantles: visual drama has its own aesthetics; a pause on stage and a cut on screen do different work.', reveals: 'film-is-filmed-theatre' },
                { text: 'Treat the essay as Rakesh\'s life story — mine it for biographical details about the playwright.', outcome: 'Rakesh is the evidence, not the argument: the essay is about a shift in theatrical grammar, not a personality profile.', reveals: 'essay-is-playwright-biography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_012', title: 'The bigger picture',
          caseStudy: { intro: 'Comparing classical and cinematic theatre is like comparing poetry to architecture — different substances, different rules, different eyes.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_007', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 1\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
          hint: 'If stuck, review node 006 (Primary Theme) and practice distinguishing "what happens".',
          misconception: 'Students often confuse "secondary themes" with "subtopics mentioned in the text." They list topics like "radio.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 1\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।',
                  options: ['\'वितान भाग-1 — पाठ 1\' के गौण विषय — मुख्य विषय के साथ चलने वाले सहायक विचार।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 1\' का कथानक — \'वितान भाग-1 — पाठ 1\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'If stuck, review node 006 (Primary Theme) and practice distinguishing "what happens" (plot/topics).',
                  misconception: 'Students often confuse "secondary themes" with "subtopics mentioned in the text." They list topics like "radio history," "Yaksh.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student lists topics instead of themes: (1) Have them reread paragraphs 2-4 and 6-7, highlighting every sentence.', '(2) Ask: "What idea is this claim *an example of*?" (3) Group similar claims into 3-4 clusters—each cluster is.', '(4) Verify each cluster against the primary theme: does it deepen, complicate, or extend the main argument?', 'If not, it\'s a topic, not a theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "secondary themes" with "subtopics mentioned in the text." They list topics like "radio.',
          parts: [
                { id: 'a', prompt: 'Evaluate Saxena\'s claim that "fp=kiV laxhr us yksxksa dks dku fcxkM+ fn, gS" (visual art has given people the gift of seeing).', answer: 'Defensible insight, not overstatement',
                  options: ['Defensible insight, not overstatement', 'hyperbole', 'rjg&rjg dh y; osQ Hkh izdkj', 'secondary themes'],
                  hint: 'If stuck, review node 006 (Primary Theme) and practice distinguishing "what happens" (plot/topics).',
                  misconception: 'Students often confuse "secondary themes" with "subtopics mentioned in the text." They list topics like "radio history," "Yaksh.' }
          ],
            remediations: { 'students-often-confuse-secondary-themes': { steps: ['If a student lists topics instead of themes: (1) Have them reread paragraphs 2-4 and 6-7, highlighting every sentence.', '(2) Ask: "What idea is this claim *an example of*?" (3) Group similar claims into 3-4 clusters—each cluster is.', '(4) Verify each cluster against the primary theme: does it deepen, complicate, or extend the main argument?', 'If not, it\'s a topic, not a theme.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_008', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 1\' में बिंब (imagery) — शब्दों से बने जीवंत दृश्य।',
          hint: 'Review the "Before You Read" context (c11_hin_v_cbse_01_001) on the tradition of Indian.',
          misconception: 'Students conflate "imagery" with "figurative language" (metaphor, simile, personification) and hunt for decorative.',
          parts: [
                { id: 'a', prompt: 'According to the author, what is the primary distinction between fp=kiV laxhr (visual art) and \'kkL=kh; laxhr (literary art) in terms of their "rky".', answer: 'The author states that fp=kiV laxhr\'s foundation is "izkFkfed voLFkk"',
                  options: ['The author states that fp=kiV laxhr\'s foundation is "izkFkfed voLFkk"', 'visual art uses colors, literary art uses words'],
                  hint: 'Review the "Before You Read" context (c11_hin_v_cbse_01_001) on the tradition of Indian xkf;dk.',
                  misconception: 'Students conflate "imagery" with "figurative language" (metaphor, simile, personification) and hunt for decorative comparisons in the.' },
                { id: 'b', prompt: 'The author describes three types of "y;" (rhythm): foyafcry; (musical), eè;y; (poetic), and nzqry; (prosaic).', answer: 'Nzqry; is "rs"k" (prosaic/ordinary)',
                  options: ['Nzqry; is "rs"k" (prosaic/ordinary)', 'nzqry; is the most musical'],
                  hint: 'Review the "Before You Read" context (c11_hin_v_cbse_01_001) on the tradition of Indian xkf;dk.',
                  misconception: 'Students conflate "imagery" with "figurative language" (metaphor, simile, personification) and hunt for decorative comparisons in the.' }
          ],
            remediations: { 'students-conflate-imagery-with-figurative': { steps: ['Have the student re-read only the first two pages, highlighting every concrete noun (room, paint, brush, canvas, light.', 'Ask: "Which of these details could a camera capture?', 'Which require the writer\'s perception?" 3.', 'Map each highlighted detail to the author\'s claim about fp=kiV laxhr\'s "Loj" and "y;." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_009', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 1\' में विरोधाभास — विपरीत बातें मिलकर गहरा सत्य बनाती हैं।',
          hint: 'If stuck, review the "three colors = three sounds" analogy in the middle of the chapter.',
          misconception: 'Students often believe irony and symbolism are merely decorative "figures of speech" that authors add for beauty.',
          parts: [
                { id: 'a', prompt: 'In the chapter, the narrator initially mistakes the bell sound for a divine or supernatural occurrence, but it turns out to be the announcement of Yashpal\'s.', answer: 'This is situational irony',
                  options: ['This is situational irony', 'verbal irony', 'dramatic irony', 'figures of speech'],
                  hint: 'If stuck, review the "three colors = three sounds" analogy in the middle of the chapter (paragraphs.',
                  misconception: 'Students often believe irony and symbolism are merely decorative "figures of speech" that authors add for beauty.' }
          ],
            remediations: { 'irony-and-symbolism-are-merely': { steps: ['Have the student re-read the first two paragraphs and physically mark (with pencil) every sentence where the narrator\'s.', 'Create a two-column table: Column A = concrete object (bell, painting, colors), Column B = abstract idea it represents.', 'Ask: "Which device attacks the old view? Which builds the new view?" Guide them to see irony as the wrecking ball and.', 'Assign a 100-word response: "Explain how the bell\'s meaning changes from para 1 to para 5 using the E/R table and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_010', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 1\' की पदावली — मुख्य शब्द और प्रयोग जो पाठ-बोध की कुंजी हैं।',
          hint: 'Review "Text: Plot and Narrative Structure" (c11_hin_v_cbse_01_002) and practice mapping.',
          misconception: 'Students believe vocabulary in context means guessing a word\'s meaning from the single sentence where it first appears.',
          parts: [
                { id: 'a', prompt: 'In the sentence "yrk dh yksdfiz;rk dk eq[; eeZ ;g ^xkuiu* gh gSA" (The main basis of Yashodhara\'s creativity is this \'xkuiu\'), use the surrounding paragraph.', answer: '"xkuiu" means a transformative aesthetic experience that fuses sensory modes and',
                  options: ['"xkuiu" means a transformative aesthetic experience that fuses sensory modes and', 'artistic feeling'],
                  hint: 'Review "Text: Plot and Narrative Structure" (c11_hin_v_cbse_01_002) and practice mapping the.',
                  misconception: 'Students believe vocabulary in context means guessing a word\'s meaning from the single sentence where it first appears.' }
          ],
            remediations: { 'vocabulary-in-context-means-guessing': { steps: ['If a student cannot trace semantic evolution, conduct a "Word Trajectory Mapping" exercise: (1) Select one key term.', '(2) Find all 3-4 occurrences in the chapter.', '(3) For each, copy the full sentence and underline the subject, verb, and object associated with the term.', '(4) Create a two-column table: "Earlier usage" vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_011', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 1\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य.',
          hint: 'यदि अटके तो **\'शब्द-शक्ति (वाच्यार्थ/लक्ष्यार्थ/व्यंग्यार्थ)\'** की कक्षा 10 की व्याकरण.',
          misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'भाषा-प्रयोग\' का अर्थ केवल \'कठिन/तत्सम शब्दों का प्रयोग\' या \'अलंकारों की.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 1\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली',
                  options: ['\'वितान भाग-1 — पाठ 1\' में भाषा-प्रयोग — NCERT पाठ्यपुस्तक ने कैसे शब्द, वाक्य और शैली', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 1\' का कथानक — \'वितान भाग-1 — पाठ 1\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **\'शब्द-शक्ति (वाच्यार्थ/लक्ष्यार्थ/व्यंग्यार्थ)\'** की कक्षा 10 की व्याकरण पुस्तिका.',
                  misconception: '**विशिष्ट भ्रम:** छात्र समझते हैं कि **\'भाषा-प्रयोग\' का अर्थ केवल \'कठिन/तत्सम शब्दों का प्रयोग\' या \'अलंकारों की भरमार\'** है। **गलत तर्क:**.' }
          ],
            remediations: { 'wrong-idea': { steps: ['**चरण 1 — शब्द-शक्ति स्पष्ट करो:** छात्र को तीन वाक्य दो: (क) "वह रोया।" (ख) "उसकी आँखें बरस पड़ीं।" (ग) "वह फूट-फूटकर.', '**चरण 2 — \'प्रतिस्थापन परीक्षण\' (Substitution Test) कराओ:** पाठ 1 के किसी वाक्य का **महत्वपूर्ण शब्द** हटाकर.', '**चरण 3 — PEEL ढाँचे में एक उत्तर लिखवाओ:** Point (कौन-सा प्रयोग), Evidence (उद्धरण), Explanation (कैसे प्रभाव बना).', '**चरण 4 — फीडबैक लूप:** जहां Explanation कमजोर हो, वहाँ **\'क्यों?\'** पूछकर **कारण-कार्य श्रृंखला** पूरी कराओ।'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_012', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 1\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
          hint: 'यदि फँसें तो **c11_hin_v_cbse_01_004 (नायक का पात्र-चित्रण)** और **c11_hin_v_cbse_01_010.',
          misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **आशय-सूचक प्रश्नों के उत्तर "अनुमान" (guesswork) होते हैं** — "जो मन में आए.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 1\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।',
                  options: ['\'वितान भाग-1 — पाठ 1\' के वस्तुनिष्ठ प्रश्न — उत्तर पाठ में सीधे लिखे हैं।', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 1\' का कथानक — \'वितान भाग-1 — पाठ 1\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि फँसें तो **c11_hin_v_cbse_01_004 (नायक का पात्र-चित्रण)** और **c11_hin_v_cbse_01_010 (मुख्य.',
                  misconception: '**विशिष्ट भ्रांति:** छात्र मानते हैं कि **आशय-सूचक प्रश्नों के उत्तर "अनुमान" (guesswork) होते हैं** — "जो मन में आए लिख दो, कोई गलत नहीं.' }
          ],
            remediations: { 'guesswork': { steps: ['**चरणबद्ध उपचार (3-4 सत्रों में):** 1.', '**पहचान अभ्यास (15 मिनट):** छात्र को 10 मिश्रित प्रश्न दें — प्रत्येक को **O (वस्तुनिष्ठ)** या **A (आशय-सूचक)** लेबल.', '**प्रमाण-खोज खेल (20 मिनट):** एक आशय-सूचक प्रश्न दें (जैसे: "नायक ने ट्रेन की खिड़की से बाहर देखना क्यों बंद कर.', '**PEEL टेम्पलेट लेखन (15 मिनट):** खाली PEEL शीट दें: Point: ____ | Evidence 1: ____ | Evidence 2: ____ | Explanation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
