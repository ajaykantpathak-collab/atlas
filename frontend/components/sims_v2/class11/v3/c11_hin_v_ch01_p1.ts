import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch01_p1: SimDef = {
    id: 'v3_c11_hin_v_ch01_p1',
    title: 'पाठ 1 · Part 1/3',
    subtitle: 'Watch theatre\'s grammar shift from the spoken word to the seen image.',
    classLevel: 11, subject: 'hin_v', topic: 'पाठ 1 · Part 1/3',
    chapters: ['c11_hin_v_ch01'],
    nodeIds: ['c11_hin_v_cbse_01_001', 'c11_hin_v_cbse_01_002', 'c11_hin_v_cbse_01_003', 'c11_hin_v_cbse_01_004', 'c11_hin_v_cbse_01_005', 'c11_hin_v_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a theatre-goer learning to watch with new eyes', intro: 'Before the curtain: a voice from a machine, no face attached — Agyeya builds his whole argument about modern theatre from that disembodied sound.', goal: 'Distinguish literary and visual drama and analyse the essay\'s experiential-to-theoretical arc.' },
    discovery: {
        question: 'A play\'s power used to live in its words — then cinema made sound, light and silence do the talking. Did audiences\' eyes actually change?',
        options: ['Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted', 'No — an audience is an audience, whatever the medium', 'No — only critics changed, not viewers', 'Yes — but only because tickets got cheaper'],
        answer: 'Yes — sound became meaning, silence became drama, lighting became narrative; the grammar of watching shifted',
        hook: 'Agyeya opens by hearing a gramophone before seeing anything — a miniature of his thesis: modern theatre detached sound from sight and rewired the senses.',
    },
    teaching: [
        { title: 'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय', text: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के निर्णायक तथ्यों (जन्म-स्थान व काल, साहित्यिक युग या धारा, प्रमुख रचनाएँ, विचारधारा) और रचना-काल की.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split classical Sanskrit, Parsi-folk and Mohan Rakesh\'s realism into their governing principles, then judge whether word-dominant and visual-dominant theatre can even be compared.',
        labels: ['पाठ 1 — पृष्ठभूमि', 'पाठ 1 — कथानक', 'पाठ 1 — पाठ्य-परिवेश', 'पाठ 1 — पात्र-चित्रण', 'पाठ 1 — मुख्य'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_001', title: 'पाठ 1 — पृष्ठभूमि और रचनाकार परिचय',
          caseStudy: { intro: 'वितान भाग-1 खोलिए और पाठ 01 के आरंभ के \'पाठ के बारे में / रचनाकार-परिचय\' खंड तक चलिए। वहाँ चार बातें नोट कीजिए — (1) रचनाकार का नाम और जन्म-मृत्यु का काल, (2).',
            decisions: [{ prompt: 'According to the background context, what is the fundamental difference between साहित्यिक नाट्य (literary drama) and रंगमंचीय नाट्य.', options: [
                { text: 'साहित्यिक नाट्य is written primarily for reading—its medium is language on the page, and', outcome: 'साहित्यिक नाट्य is written primarily for reading—its medium is language on the page, and its.' },
                { text: 'one is old, one is new', outcome: 'Not quite — Students treat \'context and background\' as a list of facts to memorize (dates, names, movements).', reveals: 'students-treat-context-and-background' },
                { text: 'one is better than the other', outcome: 'Not quite — Students treat \'context and background\' as a list of facts to memorize (dates, names, movements).', reveals: 'students-treat-context-and-background' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_002', title: 'पाठ 1 — कथानक और आख्यान-संरचना',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 1\' का क्रम: शुरुआत वितान-भाग-1-—-पाठ-1 से, घटनाएँ बढ़ती हैं, अंत \'वितान भाग-1 पर।',
            decisions: [{ prompt: 'What are the three structural components (feuV) of a traditional play as referenced in the text, and which term does the author use for the.', options: [
                { text: 'The three components are: प्रस्तावना (exposition), विकास (development/rising action), and', outcome: 'The three components are: प्रस्तावना (exposition), विकास (development/rising action), and उपसंहार.' },
                { text: 'climax', outcome: 'Not quite — Students confuse "plot" (what happens in the story) with "narrative structure" (how the story.', reveals: 'students-confuse-plot-what-happens' },
                { text: 'rising action', outcome: 'Not quite — Students confuse "plot" (what happens in the story) with "narrative structure" (how the story.', reveals: 'students-confuse-plot-what-happens' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_003', title: 'पाठ 1 — पाठ्य-परिवेश और वातावरण',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 1\' का परिवेश: \'वितान भाग-1 — पाठ 1\' — वितान भाग-1 का पाठ। पाठ का कथानक, पात्र और केंद्रीय भाव पाठ्यपुस्त — स्थान और समय मिलकर माहौल बनाते.',
            decisions: [{ prompt: 'What is the primary physical setting where the narrator first hears the \'लोज\' (sound), and what time of day does it occur?', options: [
                { text: 'The primary physical setting is the narrator\'s private study/room (ड्योढ़ी/कमरा) and it', outcome: 'The primary physical setting is the narrator\'s private study/room (ड्योढ़ी/कमरा) and it occurs.' },
                { text: 'art gallery', outcome: 'Not quite — Students often treat \'setting\' as only the physical location (the room) and \'atmosphere\' as.', reveals: 'students-often-treat-setting-as' },
                { text: 'daytime', outcome: 'Not quite — Students often treat \'setting\' as only the physical location (the room) and \'atmosphere\' as.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_004', title: 'पाठ 1 — पात्र-चित्रण: नायक/प्रमुख पात्र',
          caseStudy: { intro: 'मुख्य पात्र की पहचान, कार्य और विकास — \'वितान भाग-1 — पाठ 1\' में वितान-भाग-1-—-पाठ-1 से पात्र उभरता है।',
            decisions: [{ prompt: 'What is the primary textual evidence used to establish Yashodhara\'s impatience with superficial art appreciation in the opening paragraph?', options: [
                { text: 'The author describes Yashodhara becoming restless ("व्याकुल") and speaking sharply', outcome: 'The author describes Yashodhara becoming restless ("व्याकुल") and speaking sharply ("तीक्ष्ण स्वर").' },
                { text: 'she smiled politely', outcome: 'Not quite — Students often treat Yashodhara as a fictional character with a plotted arc, expecting a clear.', reveals: 'students-often-treat-yashodhara-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_005', title: 'पाठ 1 — पात्र-चित्रण: सहायक पात्र',
          caseStudy: { intro: '\'वितान भाग-1 — पाठ 1\' में सहायक पात्र पहचानिए — जो मुख्य पात्र की सहायता करते हैं।',
            decisions: [{ prompt: 'List all supporting characters (individuals or groups) explicitly mentioned or referenced in the essay "Hkkjrh; xkf;dkvksa esa cstksM+µyrk.', options: [
                { text: 'The supporting characters are: (1) The blind painter\'s first teacher (uwjtgk¡), who', outcome: 'The supporting characters are: (1) The blind painter\'s first teacher (uwjtgk¡), who introduced him.' },
                { text: 'character', outcome: 'Not quite — Students often treat supporting characters in non-fiction essays as mere "background information".', reveals: 'students-often-treat-supporting-characters' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your theatre club is adapting a stage play into a short film. A member says: \'Just film the play — theatre is literature, cinema is just literature with a camera. Agyeya\'s essay on Mohan Rakesh is basically a biography of a playwright.\'',
            decisions: [{ prompt: 'What does Agyeya\'s argument actually say?', options: [
                { text: 'Explain the grammar shift: the essay is a manifesto for रंगमंचीय/चित्रकाव्य as an independent art — a move from शब्द-प्रधान (word-dominant) to दृश्य-श्रव्य-प्रधान (audio-visual dominant) theatre. Silence, light, sound and pause have their own grammar that literary criticism ignores; Mohan Rakesh is the case study of a playwright who bridged both traditions, not merely the subject of a biography.', outcome: 'The adaptation rethink begins: film isn\'t filmed literature — it tells through image and sound, which is precisely the epistemological shift the essay maps.' },
                { text: 'Film the play as written — if the script is strong, the medium doesn\'t matter.', outcome: 'That\'s exactly the assumption the essay dismantles: visual drama has its own aesthetics; a pause on stage and a cut on screen do different work.', reveals: 'film-is-filmed-theatre' },
                { text: 'Treat the essay as Rakesh\'s life story — mine it for biographical details about the playwright.', outcome: 'Rakesh is the evidence, not the argument: the essay is about a shift in theatrical grammar, not a personality profile.', reveals: 'essay-is-playwright-biography' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Comparing classical and cinematic theatre is like comparing poetry to architecture — different substances, different rules, different eyes.',
            decisions: [{ prompt: 'What comes next? पाठ 1 · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — पाठ 1 · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_001', difficulty: 'standard',
          question: 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के.',
          hint: 'If stuck, review the difference between नाट्यशैली (dramatic style/convention) and.',
          misconception: 'Students treat \'context and background\' as a list of facts to memorize (dates, names, movements) rather than as.',
          parts: [
                { id: 'a', prompt: 'Agyeya states: "चित्रकाव्य नाट्य के कारण लेखिक नाट्य की परम्परा उपेक्षित नहीं हुई, बल्कि दर्शकों का साहित्यिक नाट्य को देखने का दृष्टिकोण भी बदल गया।" Explain.', answer: 'Visual drama did not replace or diminish literary drama',
                  options: ['Visual drama did not replace or diminish literary drama', 'visual drama killed literary drama', 'they have nothing to do with each other'],
                  hint: 'If stuck, review the difference between नाट्यशैली (dramatic style/convention) and यथार्थवाद.',
                  misconception: 'Students treat \'context and background\' as a list of facts to memorize (dates, names, movements) rather than as a conceptual lens.' },
                { id: 'b', prompt: 'The text mentions three historical phases: classical Sanskrit theatre (with its निर्दिष्ट नियम), Parsi/folk theatre (लोक-रंजक), and modern realistic theatre.', answer: 'It inherits primarily from the modern realistic phase (Mohan Rakesh)',
                  options: ['It inherits primarily from the modern realistic phase (Mohan Rakesh)', 'classical'],
                  hint: 'If stuck, review the difference between नाट्यशैली (dramatic style/convention) and यथार्थवाद.',
                  misconception: 'Students treat \'context and background\' as a list of facts to memorize (dates, names, movements) rather than as a conceptual lens.' }
          ],
            remediations: { 'students-treat-context-and-background': { steps: ['Ask the student to read aloud the paragraph where Agyeya describes "ध्वनि, प्रकाश, मौन" as the grammar of visual drama.', 'Have them list three things a novel can do that a stage play cannot, and three things a stage play can do that a novel.', 'Show a 2-minute clip of a modern Hindi play (e.g., Mohan Rakesh\'s "Aadhe Adhure" staging) with sound off, then with.', 'Re-read the essay\'s opening anecdote (Agyeya hearing a sound in his room, mistaking it for a ghost, then realizing it\'s.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_002', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 1\' का कथानक — \'वितान भाग-1 — पाठ 1\' — वितान भाग-1 का पाठ।.',
          hint: 'Review the story/discourse distinction using a परिचित fairy tale: Cinderella\'s story.',
          misconception: 'Students confuse "plot" (what happens in the story) with "narrative structure" (how the story is arranged and told).',
          parts: [
                { id: 'a', prompt: 'The author states: "fp=kiV laxhr dk rky izkFkfed voLFkk dk rky gksrk gS" (Cinematic theatre\'s director is the director of the fundamental state).', answer: '"voLFkk" here means the foundational visual-aural reality of the performance',
                  options: ['"voLFkk" here means the foundational visual-aural reality of the performance', 'director vs playwright hierarchy'],
                  hint: 'Review the story/discourse distinction using a परिचित fairy tale: Cinderella\'s story = girl loses.',
                  misconception: 'Students confuse "plot" (what happens in the story) with "narrative structure" (how the story is arranged and told).' },
                { id: 'b', prompt: 'Compare the narrative function of "djQ.k jl" (delicate water/water-like subtlety) in the author\'s description of his own writing versus "xkuiu" in fp=kiV.', answer: '"djQ.k jl" represents the author\'s literary method: subtle, inferential, flowing',
                  options: ['"djQ.k jl" represents the author\'s literary method: subtle, inferential, flowing', 'both mean subtlety'],
                  hint: 'Review the story/discourse distinction using a परिचित fairy tale: Cinderella\'s story = girl loses.',
                  misconception: 'Students confuse "plot" (what happens in the story) with "narrative structure" (how the story is arranged and told).' }
          ],
            remediations: { 'students-confuse-plot-what-happens': { steps: ['Have the student draw a horizontal line. Mark three points: "Gramophone Memory," "Film Case Study," "Theory of Two.', 'Ask: "What does each section DO for the reader?" (Hook → Illustrate → Generalize).', 'Give them a new short text (e.g., a film review) and ask them to map its structure using the same three labels.', 'Explicitly contrast: "Plot = beads. Structure = the string and the pattern." Repeat until they label function, not.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_003', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण.',
          hint: 'If stuck, review the distinction between \'frame narrative\' (the night in the room) and.',
          misconception: 'Students often treat \'setting\' as only the physical location (the room) and \'atmosphere\' as a single mood (sadness).',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the \'atmosphere\' of the opening paragraph differs from the atmosphere of the paragraph where the author discusses Raja Ravi.', answer: 'The opening atmosphere is intimate, suspenseful, and subjective—dominated by the',
                  options: ['The opening atmosphere is intimate, suspenseful, and subjective—dominated by the', 'informative'],
                  hint: 'If stuck, review the distinction between \'frame narrative\' (the night in the room) and \'embedded.',
                  misconception: 'Students often treat \'setting\' as only the physical location (the room) and \'atmosphere\' as a single mood (sadness).' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student draw three concentric circles labeled \'Room\', \'Studio\', \'Art Market\'.', 'Ask them to place 5 textual quotes in the correct circle (e.g., "मेरे कमरे में लोज" → Room; "चित्रकार के पास शिष्य.', 'For each circle, write one adjective describing the atmosphere (e.g., Room: claustrophobic; Studio: emptied; Market.', 'Finally, ask: "Which circle does the author\'s voice occupy at the end?" (Answer: all three simultaneously—this is the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat \'setting\' as only the physical location (the room) and \'atmosphere\' as a single mood (sadness).',
          parts: [
                { id: 'a', prompt: 'Evaluate the author\'s decision to end the essay with the image of "रात के तीन-तीन पहर" (three watches of the night) and the continuing sound of the record.', answer: 'It strengthens the argument',
                  options: ['It strengthens the argument', 'just a nice ending'],
                  hint: 'If stuck, review the distinction between \'frame narrative\' (the night in the room) and \'embedded.',
                  misconception: 'Students often treat \'setting\' as only the physical location (the room) and \'atmosphere\' as a single mood (sadness).' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student draw three concentric circles labeled \'Room\', \'Studio\', \'Art Market\'.', 'Ask them to place 5 textual quotes in the correct circle (e.g., "मेरे कमरे में लोज" → Room; "चित्रकार के पास शिष्य.', 'For each circle, write one adjective describing the atmosphere (e.g., Room: claustrophobic; Studio: emptied; Market.', 'Finally, ask: "Which circle does the author\'s voice occupy at the end?" (Answer: all three simultaneously—this is the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_004', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 1\' का पात्र-चित्रण — मुख्य पात्र की प्रकृति, क्रिया और विकास।',
          hint: 'Review the difference between biography and character portrayal in memoir — re-read node.',
          misconception: 'Students often treat Yashodhara as a fictional character with a plotted arc, expecting a clear \'beginning-middle-end\'.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the author considers Yashodhara\'s blending of traditional techniques with modern sensibility as her defining artistic trait.', answer: 'The author values this blend',
                  options: ['The author values this blend', 'she uses old colours'],
                  hint: 'Review the difference between biography and character portrayal in memoir — re-read node 002\'s.',
                  misconception: 'Students often treat Yashodhara as a fictional character with a plotted arc, expecting a clear \'beginning-middle-end\' transformation.' },
                { id: 'b', prompt: 'The author writes: "उसकी कला में लोक का सौन्दर्य और शास्त्र की गहराई दोनों हैं।" Identify two specific moments in the text where Yashodhara demonstrates folk.', answer: 'Folk aesthetics: (1) using village women\'s tattoo patterns as border motifs, (2)',
                  options: ['Folk aesthetics: (1) using village women\'s tattoo patterns as border motifs, (2)', 'she paints villages'],
                  hint: 'Review the difference between biography and character portrayal in memoir — re-read node 002\'s.',
                  misconception: 'Students often treat Yashodhara as a fictional character with a plotted arc, expecting a clear \'beginning-middle-end\' transformation.' }
          ],
            remediations: { 'students-often-treat-yashodhara-as': { steps: ['Have the student list all author-narrated incidents chronologically on index cards.', 'Colour-code each card by the author\'s apparent purpose: \'shows technique\', \'shows philosophy\', \'shows social role\'.', 'Ask: "Which pile has the most cards?', 'Why did the author need so many examples of that trait?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_005', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 1\' के सहायक पात्र — वे चरित्र जो मुख्य पात्र के साथ पाठ को.',
          hint: 'Review the protagonist\'s key traits: blindness as artistic method, rejection of classical.',
          misconception: 'Students often treat supporting characters in non-fiction essays as mere "background information" or "examples" rather.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the essay portrays the difference between classical artists (shastriya kalakar) and folk artists (lok kalakar) as collective.', answer: 'Classical artists are portrayed as rigid, rule-bound, and focused on technical',
                  options: ['Classical artists are portrayed as rigid, rule-bound, and focused on technical', 'different styles'],
                  hint: 'Review the protagonist\'s key traits: blindness as artistic method, rejection of classical training.',
                  misconception: 'Students often treat supporting characters in non-fiction essays as mere "background information" or "examples" rather than deliberate.' }
          ],
            remediations: { 'students-often-treat-supporting-characters': { steps: ['Create a two-column chart. Column A: Each supporting character/group.', 'For each row, find one sentence from the text proving the Column B claim.', 'Draw arrows showing how each Column B idea connects to the essay\'s central thesis: "Folk art\'s vitality lies in its.', 'Ask the student to explain aloud: "If this character were removed, what argument would weaken?" This makes their.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_006', difficulty: 'standard',
          question: '\'वितान भाग-1 — पाठ 1\' का मुख्य विषय — \'वितान भाग-1 — पाठ 1\' का केंद्रीय भाव और.',
          hint: 'यदि अटके तो **c11_hin_v_cbse_01_002 (कथानक और आख्यान-संरचना)** के \'क्लाइमेक्स\' और.',
          misconception: 'छात्र अक्सर **\'मुख्य विषय\' को \'कहानी का नैतिक उपदेश\' (Moral of the story) मान लेते हैं** — जैसे "झूठ मत बोलो", "बड़ों.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '\'वितान भाग-1 — पाठ 1\' का मुख्य विषय — \'वितान भाग-1 — पाठ 1\' का केंद्रीय भाव और संदेश',
                  options: ['\'वितान भाग-1 — पाठ 1\' का मुख्य विषय — \'वितान भाग-1 — पाठ 1\' का केंद्रीय भाव और संदेश', 'रचनाकार-परिचय और पृष्ठभूमि एक चयनात्मक विवरण-कौशल है: रचना से पहले रचनाकार के जीवन के', '\'वितान भाग-1 — पाठ 1\' का कथानक — \'वितान भाग-1 — पाठ 1\' — वितान भाग-1 का पाठ। पाठ का', '\'वितान भाग-1 — पाठ 1\' का पाठ्य-परिवेश (setting) — पाठ किस स्थान, समय और वातावरण में घटित'],
                  hint: 'यदि अटके तो **c11_hin_v_cbse_01_002 (कथानक और आख्यान-संरचना)** के \'क्लाइमेक्स\' और \'निर्णायक मोड़\'.',
                  misconception: 'छात्र अक्सर **\'मुख्य विषय\' को \'कहानी का नैतिक उपदेश\' (Moral of the story) मान लेते हैं** — जैसे "झूठ मत बोलो", "बड़ों का आदर करो"। यह भूल.' }
          ],
            remediations: { 'moral-of-the-story': { steps: ['**पुनर्परिभाषित करें:** छात्र से कहें — "मुख्य विषय वह **प्रश्न** है जो रचना बार-बार पूछती है, **उत्तर** नहीं। पाठ 1.', '(उदाहरण: \'क्या चुप रहना सुरक्षित है?\')" 2.', '**सबूत-आधारित निष्कर्षण:** छात्र से पाठ के **3 विशिष्ट स्थल** (पृष्ठ/पंक्ति) मांगें जहां वह प्रश्न गूंजता हो — संवाद.', '**सामान्यीकरण का अभ्यास:** उन 3 स्थलों से **एक वाक्य में पैटर्न** निकालने को कहें: "हर बार जब नायक बोलना चाहता है.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
