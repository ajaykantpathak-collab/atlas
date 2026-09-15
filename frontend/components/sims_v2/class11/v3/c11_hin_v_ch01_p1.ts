import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_v_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_v_ch01_p1: SimDef = {
    id: 'v3_c11_hin_v_ch01_p1',
    title: 'tc lsD\'ku vkfI+kQlj · Part 1/3',
    subtitle: 'Watch theatre\'s grammar shift from the spoken word to the seen image.',
    classLevel: 11, subject: 'hin_v', topic: 'tc lsD\'ku vkfI+kQlj · Part 1/3',
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
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" provides the historical, cultural, and literary framework necessary to understand the essay "Hkkjrh; xkf;dkvksa esa cstksM+µyrk eaxs\'kdj" by Agyeya.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_v_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split classical Sanskrit, Parsi-folk and Mohan Rakesh\'s realism into their governing principles, then judge whether word-dominant and visual-dominant theatre can even be compared.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a play but the programme notes are in a language you barely understand—you\'d miss half the meaning.',
            decisions: [{ prompt: 'According to the background context, what is the fundamental difference between साहित्यिक नाट्य (literary drama) and रंगमंचीय नाट्य.', options: [
                { text: 'साहित्यिक नाट्य is written primarily for reading—its medium is language on the page, and', outcome: 'साहित्यिक नाट्य is written primarily for reading—its medium is language on the page, and its.' },
                { text: 'one is old, one is new', outcome: 'Not quite — Students treat \'context and background\' as a list of facts to memorize (dates, names, movements).', reveals: 'students-treat-context-and-background' },
                { text: 'one is better than the other', outcome: 'Not quite — Students treat \'context and background\' as a list of facts to memorize (dates, names, movements).', reveals: 'students-treat-context-and-background' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you\'re watching a film and suddenly the screen goes black — you only hear sounds.',
            decisions: [{ prompt: 'What are the three structural components (feuV) of a traditional play as referenced in the text, and which term does the author use for the.', options: [
                { text: 'The three components are: प्रस्तावना (exposition), विकास (development/rising action), and', outcome: 'The three components are: प्रस्तावना (exposition), विकास (development/rising action), and उपसंहार.' },
                { text: 'climax', outcome: 'Not quite — Students confuse "plot" (what happens in the story) with "narrative structure" (how the story.', reveals: 'students-confuse-plot-what-happens' },
                { text: 'rising action', outcome: 'Not quite — Students confuse "plot" (what happens in the story) with "narrative structure" (how the story.', reveals: 'students-confuse-plot-what-happens' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine you walk into your grandfather\'s study and hear an old gramophone crackle to life—suddenly the room feels thicker with history than with furniture.',
            decisions: [{ prompt: 'What is the primary physical setting where the narrator first hears the \'लोज\' (sound), and what time of day does it occur?', options: [
                { text: 'The primary physical setting is the narrator\'s private study/room (ड्योढ़ी/कमरा) and it', outcome: 'The primary physical setting is the narrator\'s private study/room (ड्योढ़ी/कमरा) and it occurs.' },
                { text: 'art gallery', outcome: 'Not quite — Students often treat \'setting\' as only the physical location (the room) and \'atmosphere\' as.', reveals: 'students-often-treat-setting-as' },
                { text: 'daytime', outcome: 'Not quite — Students often treat \'setting\' as only the physical location (the room) and \'atmosphere\' as.', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_004', title: 'Character Analysis: Protagonist',
          caseStudy: { intro: 'Imagine you are introducing your friend to a remarkable artist you met — you wouldn\'t just say "she paints well"; you\'d describe the moment she mixed colours.',
            decisions: [{ prompt: 'What is the primary textual evidence used to establish Yashodhara\'s impatience with superficial art appreciation in the opening paragraph?', options: [
                { text: 'The author describes Yashodhara becoming restless ("व्याकुल") and speaking sharply', outcome: 'The author describes Yashodhara becoming restless ("व्याकुल") and speaking sharply ("तीक्ष्ण स्वर").' },
                { text: 'she smiled politely', outcome: 'Not quite — Students often treat Yashodhara as a fictional character with a plotted arc, expecting a clear.', reveals: 'students-often-treat-yashodhara-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_v_cbse_01_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you\'re watching a documentary about a blind painter. The camera focuses on the painter, but you notice the people around them—the teacher who first.',
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
            decisions: [{ prompt: 'What comes next? tc lsD\'ku vkfI+kQlj · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — tc lsD\'ku vkfI+kQlj · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" provides the historical, cultural.',
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
          question: 'Plot and Narrative Structure refers to the organized sequence of events in.',
          hint: 'Review the story/discourse distinction using a familiar fairy tale: Cinderella\'s story.',
          misconception: 'Students confuse "plot" (what happens in the story) with "narrative structure" (how the story is arranged and told).',
          parts: [
                { id: 'a', prompt: 'The author states: "fp=kiV laxhr dk rky izkFkfed voLFkk dk rky gksrk gS" (Cinematic theatre\'s director is the director of the fundamental state).', answer: '"voLFkk" here means the foundational visual-aural reality of the performance',
                  options: ['"voLFkk" here means the foundational visual-aural reality of the performance', 'director vs playwright hierarchy'],
                  hint: 'Review the story/discourse distinction using a familiar fairy tale: Cinderella\'s story = girl loses.',
                  misconception: 'Students confuse "plot" (what happens in the story) with "narrative structure" (how the story is arranged and told).' },
                { id: 'b', prompt: 'Compare the narrative function of "djQ.k jl" (delicate water/water-like subtlety) in the author\'s description of his own writing versus "xkuiu" in fp=kiV.', answer: '"djQ.k jl" represents the author\'s literary method: subtle, inferential, flowing',
                  options: ['"djQ.k jl" represents the author\'s literary method: subtle, inferential, flowing', 'both mean subtlety'],
                  hint: 'Review the story/discourse distinction using a familiar fairy tale: Cinderella\'s story = girl loses.',
                  misconception: 'Students confuse "plot" (what happens in the story) with "narrative structure" (how the story is arranged and told).' }
          ],
            remediations: { 'students-confuse-plot-what-happens': { steps: ['Have the student draw a horizontal line. Mark three points: "Gramophone Memory," "Film Case Study," "Theory of Two.', 'Ask: "What does each section DO for the reader?" (Hook → Illustrate → Generalize).', 'Give them a new short text (e.g., a film review) and ask them to map its structure using the same three labels.', 'Explicitly contrast: "Plot = beads. Structure = the string and the pattern." Repeat until they label function, not.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_v_cbse_01_003', difficulty: 'standard',
          question: 'Setting in this essay refers to the physical, temporal, and cultural backdrop.',
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
          question: 'Character analysis of the protagonist involves systematically examining the.',
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
          question: 'Character analysis of supporting characters involves examining how secondary.',
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
          question: 'The primary theme is the central, unifying idea or message that the author.',
          hint: 'If stuck, review the plot summary (c11_hin_v_cbse_01_002) and the protagonist\'s character.',
          misconception: 'Students often confuse the **primary theme** with the **protagonist\'s biography** or a **moral lesson**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The primary theme is the central, unifying idea or message that the author conveys',
                  options: ['The primary theme is the central, unifying idea or message that the author conveys', '"Before You Read: Context and Background" provides the historical, cultural, and literary', 'Plot and Narrative Structure refers to the organized sequence of events in a literary', 'Setting in this essay refers to the physical, temporal, and cultural backdrop against'],
                  hint: 'If stuck, review the plot summary (c11_hin_v_cbse_01_002) and the protagonist\'s character arc.',
                  misconception: 'Students often confuse the **primary theme** with the **protagonist\'s biography** or a **moral lesson**.' }
          ],
            remediations: { 'students-often-confuse-the-primary': { steps: ['**Re-read only the author\'s reflective passages** (ignore narrative events) – highlight every sentence starting with.', '**List the key claims** made in those passages (e.g., "Art is xkuiu", "Traditional and modern art cannot compromise").', '**Group the claims** into one coherent statement: "The chapter argues that modern Indian painting is a necessary.', '**Verify** by checking if *every* major event in the narrative serves as an example for this statement.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
