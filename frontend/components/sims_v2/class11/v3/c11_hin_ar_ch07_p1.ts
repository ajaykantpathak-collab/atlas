import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hin_ar_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hin_ar_ch07_p1: SimDef = {
    id: 'v3_c11_hin_ar_ch07_p1',
    title: 'xksLokeh rqylhnkl · Part 1/3',
    subtitle: 'Follow a simple request through an office where procedure eats its purpose.',
    classLevel: 11, subject: 'hin_ar', topic: 'xksLokeh rqylhnkl · Part 1/3',
    chapters: ['c11_hin_ar_ch07'],
    nodeIds: ['c11_hin_ar_cbse_07_001', 'c11_hin_ar_cbse_07_002', 'c11_hin_ar_cbse_07_003', 'c11_hin_ar_cbse_07_004', 'c11_hin_ar_cbse_07_005', 'c11_hin_ar_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a citizen trapped in a paper corridor', intro: 'One lost child, three offices, zero responsibility — Renu turns a queue into a verdict on the system.', goal: 'Read bureaucratic satire and analyse how episodic structure builds the indictment.' },
    discovery: {
        question: 'A lost child at the station gets shuffled: report at Platform 3, stamp at the Superintendent\'s, return — by which time the child is gone. Just slapstick?',
        options: ['No — Renu\'s satire is that procedure has outlived its purpose: every stamp is correct and the outcome is cruelty', 'Yes — it\'s comedy with no bite', 'Yes — the child should have waited properly', 'No — it\'s actually a ghost story'],
        answer: 'No — Renu\'s satire is that procedure has outlived its purpose: every stamp is correct and the outcome is cruelty',
        hook: 'Anchalik fiction\'s trick: village dialect and folk detail aren\'t decoration — they\'re the machinery that makes the bureaucracy look absurd.',
    },
    teaching: [
        { title: 'Before You Read: Context and Background', text: '"Before You Read: Context and Background" prepares students to engage with Phanishwar Nath Renu\'s satirical story "टेकी का इमला" by establishing the author\'s literary significance, the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hin_ar_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Chart the runaround office to office, identify where satire turns to indictment, and test whether the ending punishes the system or just exposes it.',
        labels: ['Before You Read: Context', 'Text: Plot and Narrative', 'Text: Setting and Atmosphere', 'Character Analysis: Protagonist', 'Character Analysis: Supporting Characters', 'Theme: Primary Theme'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_001', title: 'Before You Read: Context and Background',
          caseStudy: { intro: 'Imagine you\'re about to watch a movie set in a government office where a simple request—like getting a tree\'s shade recognized as a right—gets tangled.',
            decisions: [{ prompt: 'Who is Phanishwar Nath Renu, and what literary movement is he associated with in Hindi literature?', options: [
                { text: 'Phanishwar Nath Renu (1914–1977) is a seminal Hindi writer from Aurahi Hingna, Araria', outcome: 'Phanishwar Nath Renu (1914–1977) is a seminal Hindi writer from Aurahi Hingna, Araria (Bihar), and.' },
                { text: 'Chhayavad poet', outcome: 'Not quite — Students often confuse "Anchalik Sahitya" (regional literature) with "Gramin Sahitya" (village.', reveals: 'students-often-confuse-anchalik-sahitya' },
                { text: 'modernist novelist', outcome: 'Not quite — Students often confuse "Anchalik Sahitya" (regional literature) with "Gramin Sahitya" (village.', reveals: 'students-often-confuse-anchalik-sahitya' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_002', title: 'Text: Plot and Narrative Structure',
          caseStudy: { intro: 'Imagine you find a lost child at a railway station and call the police, but they say "file a report at Platform 3, then get it stamped at the Superintendent\'s.',
            decisions: [{ prompt: 'What are the five stages of Freytag\'s pyramid (plot structure) in their correct order?', options: [
                { text: 'Exposition → Rising Action → Climax → Falling Action → Resolution', outcome: 'Exposition → Rising Action → Climax → Falling Action → Resolution.' },
                { text: 'the cub is saved', outcome: 'Not quite — Students equate "plot" with "what happens" (summary) and "structure" with "beginning-middle-end".', reveals: 'students-equate-plot-with-what' },
                { text: 'the mother leopard arrives', outcome: 'Not quite — Students equate "plot" with "what happens" (summary) and "structure" with "beginning-middle-end".', reveals: 'students-equate-plot-with-what' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_003', title: 'Text: Setting and Atmosphere',
          caseStudy: { intro: 'Imagine walking into a crowded government office on a scorching summer afternoon: the hum of ceiling fans, the smell of dust and sweat, the palpable.',
            decisions: [{ prompt: 'What is the primary physical setting of the opening scene in "tkequ dk isM+", and what atmospheric quality does it establish?', options: [
                { text: 'The primary physical setting is the village space under a large banyan tree (isM+) during', outcome: 'The primary physical setting is the village space under a large banyan tree (isM+) during intense.' },
                { text: 'the government office', outcome: 'Not quite — Students often treat setting as a static "background" and atmosphere as mere "weather description.".', reveals: 'students-often-treat-setting-as' },
                { text: 'a riverbank', outcome: 'Not quite — Students often treat setting as a static "background" and atmosphere as mere "weather description.".', reveals: 'students-often-treat-setting-as' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_005', title: 'Character Analysis: Supporting Characters',
          caseStudy: { intro: 'Imagine you are directing a play where the lead actor is the mother, but the play falls flat if the supporting cast—the stubborn old poet, the innocent.',
            decisions: [{ prompt: 'List the names of four supporting characters from "tkequ dk isM+" and state one defining action each performs in the story.', options: [
                { text: 'Correct answer: 1', outcome: 'Correct answer: 1. Old poet (ncs gq, vkneh) – refuses to leave the tree, reveals he is a poet. 2.' },
                { text: 'the officers', outcome: 'Not quite — Students believe supporting characters exist only to "help" or "hinder" the protagonist physically.', reveals: 'supporting-characters-exist-only-to' },
                { text: 'hinder', outcome: 'Not quite — Students believe supporting characters exist only to "help" or "hinder" the protagonist physically.', reveals: 'supporting-characters-exist-only-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_006', title: 'Theme: Primary Theme and Message',
          caseStudy: { intro: 'Imagine you\'re standing at a busy Delhi intersection where a centuries-old banyan tree is marked for cutting to widen the road — the engineer sees concrete.',
            decisions: [{ prompt: 'What is the central conflict that drives the narrative of "टकेस का इस्माइल"?', options: [
                { text: 'The central conflict is between the government\'s road-widening project (bureaucratic', outcome: 'The central conflict is between the government\'s road-widening project (bureaucratic modernity) and.' },
                { text: 'the old woman vs', outcome: 'Not quite — Students often think the primary theme is "environmental conservation" or "women\'s resilience".', reveals: 'the-primary-theme-is-environmental' },
                { text: 'women\'s resilience', outcome: 'Not quite — Students often think the primary theme is "environmental conservation" or "women\'s resilience".', reveals: 'the-primary-theme-is-environmental' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a satire evening you pick Renu\'s story of a leopard cub passed between the Forest, Agriculture and Revenue departments while its mother waits. A classmate edits your script: \'Cut two of the three office refusals — they\'re repetitive — and make the climax the cub being rescued by officials.\'',
            decisions: [{ prompt: 'Why should you reject both edits?', options: [
                { text: 'Keep the pattern: the repeated refusals — forest guard, ranger, police, each citing rules and jurisdiction — ARE the structure; the circular paperwork mimics the bureaucracy being satirised. And the climax isn\'t the rescue outcome but the mother leopard bypassing the entire system: instinct achieves what the state couldn\'t, which is the satire\'s punch.', outcome: 'The script now bites as intended: repetition builds the indictment, and the resolution comes from circumventing bureaucracy, not satisfying it.' },
                { text: 'Accept the cuts — one refusal conveys the point; three is redundancy.', outcome: 'Repetition is the technique: a single refusal reads as one rude official; the pattern of identical refusals exposes a system, which is the satire\'s target.', reveals: 'repetition-is-redundancy' },
                { text: 'Let the officials save the cub — a competent government gives the story a hopeful close.', outcome: 'That reverses the satire: the story\'s logic demands the system fail while the animal\'s instinct succeeds — bureaucratic success would prove the system works.', reveals: 'officials-should-save-the-cub' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hin_ar_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every official followed the rules — that\'s the horror: the machine ran perfectly and the point was lost.',
            decisions: [{ prompt: 'What comes next? xksLokeh rqylhnkl · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — xksLokeh rqylhnkl · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_001', difficulty: 'standard',
          question: '"Before You Read: Context and Background" prepares students to engage with.',
          hint: 'Review Class 10 Hindi literary history: the transition from Chhayavad\'s romanticism.',
          misconception: 'Students often confuse "Anchalik Sahitya" (regional literature) with "Gramin Sahitya" (village literature) as synonyms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '"Before You Read: Context and Background" prepares students to engage with Phanishwar',
                  options: ['"Before You Read: Context and Background" prepares students to engage with Phanishwar', 'Plot and narrative structure refers to the deliberate arrangement of events in a', 'Setting refers to the time, place, and social environment in', 'Character analysis of the protagonist involves examining the central character\'s traits,'],
                  hint: 'Review Class 10 Hindi literary history: the transition from Chhayavad\'s romanticism to Pragativad\'s.',
                  misconception: 'Students often confuse "Anchalik Sahitya" (regional literature) with "Gramin Sahitya" (village literature) as synonyms, assuming any story.' }
          ],
            remediations: { 'students-often-confuse-anchalik-sahitya': { steps: ['If a student conflates Anchalik with Gramin: (1) Show a 2-column comparison: Column A—Premchand\'s standardized Hindi.', '(2) Ask: "Could \'टेकी का इमला\' happen in a Punjab village?', 'Why or why not?" Guide them to see that the Forest-Agriculture-Revenue jurisdictional dispute over a *single tree*.', '(3) Have them underline 5 dialect words in the first two pages and hypothesize their standard Hindi equivalents.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "Anchalik Sahitya" (regional literature) with "Gramin Sahitya" (village literature) as synonyms.',
          parts: [
                { id: 'a', prompt: 'Create a 3-sentence "Before You Read" note for a classmate who has never read Renu, explaining what to expect in terms of language, tone, and central.', answer: 'Expect Hindi infused with Maithili/Bhojpuri rhythms—words like "टेकी," "इमला,"',
                  options: ['Expect Hindi infused with Maithili/Bhojpuri rhythms—words like "टेकी," "इमला,"', 'Anchalik Sahitya', 'Gramin Sahitya'],
                  hint: 'Review Class 10 Hindi literary history: the transition from Chhayavad\'s romanticism to Pragativad\'s.',
                  misconception: 'Students often confuse "Anchalik Sahitya" (regional literature) with "Gramin Sahitya" (village literature) as synonyms, assuming any story.' }
          ],
            remediations: { 'students-often-confuse-anchalik-sahitya': { steps: ['If a student conflates Anchalik with Gramin: (1) Show a 2-column comparison: Column A—Premchand\'s standardized Hindi.', '(2) Ask: "Could \'टेकी का इमला\' happen in a Punjab village?', 'Why or why not?" Guide them to see that the Forest-Agriculture-Revenue jurisdictional dispute over a *single tree*.', '(3) Have them underline 5 dialect words in the first two pages and hypothesize their standard Hindi equivalents.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_002', difficulty: 'standard',
          question: 'Plot and narrative structure refers to the deliberate arrangement of events.',
          hint: 'If stuck, review the story summary in c11_hin_ar_cbse_07_001 and identify the main.',
          misconception: 'Students equate "plot" with "what happens" (summary) and "structure" with "beginning-middle-end" (vague).',
          parts: [
                { id: 'a', prompt: 'What are the five stages of Freytag\'s pyramid (plot structure) in their correct order?', answer: 'Exposition → Rising Action → Climax → Falling Action → Resolution',
                  options: ['Exposition → Rising Action → Climax → Falling Action → Resolution', 'the cub is saved', 'the mother leopard arrives'],
                  hint: 'If stuck, review the story summary in c11_hin_ar_cbse_07_001 and identify the main conflict: human.',
                  misconception: 'Students equate "plot" with "what happens" (summary) and "structure" with "beginning-middle-end" (vague).' },
                { id: 'b', prompt: 'In "तेंदुए का शिशु," the forest guard, ranger, and police officer all refuse immediate help.', answer: 'Each refusal escalates the institutional hierarchy (guard → ranger → police →',
                  options: ['Each refusal escalates the institutional hierarchy (guard → ranger → police →', 'to make the story longer', 'to show different characters', 'the cub is saved'],
                  hint: 'If stuck, review the story summary in c11_hin_ar_cbse_07_001 and identify the main conflict: human.',
                  misconception: 'Students equate "plot" with "what happens" (summary) and "structure" with "beginning-middle-end" (vague).' },
                { id: 'c', prompt: 'Map the following events to Freytag\'s stages: (a) Mother leopard appears at the tea garden, (b) Cub discovered under the bush, (c) Forest guard cites rules and.', answer: 'Cub discovered under the bush, (',
                  options: ['Cub discovered under the bush, (', 'the cub is saved', 'the mother leopard arrives'],
                  hint: 'If stuck, review the story summary in c11_hin_ar_cbse_07_001 and identify the main conflict: human.',
                  misconception: 'Students equate "plot" with "what happens" (summary) and "structure" with "beginning-middle-end" (vague).' }
          ],
            remediations: { 'students-equate-plot-with-what': { steps: ['Show a 2-minute clip from a familiar film (e.g., *3 Idiots*: Virus\'s repeated "no" to Joy Lobo\'s project → escalating.', 'Map it to Freytag together.', 'Give the student a 6-panel storyboard template.', 'Have them draw *only* the bureaucratic refusal scenes (guard, ranger, police, superintendent) — one panel each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_003', difficulty: 'standard',
          question: 'Setting refers to the time, place, and social environment in which a story.',
          hint: 'Review the plot summary and narrative structure in node c11_hin_ar_cbse_07_002, focusing.',
          misconception: 'Students often treat setting as a static "background" and atmosphere as mere "weather description." In "tkequ dk isM+".',
          parts: [
                { id: 'a', prompt: 'Analyze how the atmosphere shifts when the focus moves from the banyan tree to the government office (Ñf"k&foHkkx / O;kikj&foHkkx).', answer: 'The atmosphere shifts from organic warmth to sterile indifference',
                  options: ['The atmosphere shifts from organic warmth to sterile indifference', 'mood change'],
                  hint: 'Review the plot summary and narrative structure in node c11_hin_ar_cbse_07_002, focusing on the.',
                  misconception: 'Students often treat setting as a static "background" and atmosphere as mere "weather description." In "tkequ dk isM+", they might say "the.' }
          ],
            remediations: { 'students-often-treat-setting-as': { steps: ['Have the student reread the first two paragraphs aloud, marking every sensory word (heat, shade, sound, taste, smell).', 'Ask: "If you were sitting there, what would you feel physically?', 'Create a two-column chart: left column = setting details (tree, figs, jeep, office, file); right column = atmospheric.', 'Practice writing one PEEL paragraph linking a specific detail (e.g., "the axe lying beside the jeep") to its.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_004', difficulty: 'standard',
          question: 'Character analysis of the protagonist involves examining the central.',
          hint: 'Review c11_hin_ar_cbse_07_002 for the protagonist\'s key scenes: introduction under tree.',
          misconception: 'Students often treat the protagonist as a passive victim who "gets saved" by his poet identity revelation.',
          parts: [
                { id: 'a', prompt: 'Why does the old man remain silent throughout most of the officials\' debate about cutting down the tree, and what does this silence reveal about his character?', answer: 'His silence reflects helplessness against bureaucratic machinery and a poet\'s',
                  options: ['His silence reflects helplessness against bureaucratic machinery and a poet\'s', 'he was scared', 'he didn\'t understand'],
                  hint: 'Review c11_hin_ar_cbse_07_002 for the protagonist\'s key scenes: introduction under tree, officials\'.',
                  misconception: 'Students often treat the protagonist as a passive victim who "gets saved" by his poet identity revelation.' },
                { id: 'b', prompt: 'Compare the protagonist\'s response to the bureaucratic system with the responses of the Range Officer (रेंज ऑफिसर) and the DFO (डीएफओ).', answer: 'The protagonist embodies human conscience and artistic integrity - he resists',
                  options: ['The protagonist embodies human conscience and artistic integrity - he resists', 'authority figures'],
                  hint: 'Review c11_hin_ar_cbse_07_002 for the protagonist\'s key scenes: introduction under tree, officials\'.',
                  misconception: 'Students often treat the protagonist as a passive victim who "gets saved" by his poet identity revelation.' }
          ],
            remediations: { 'students-often-treat-the-protagonist': { steps: ['If a student makes this error: 1) Have them re-read the scene where the Range Officer arrives - note he says "यह वही.', '2) Create a two-column chart: "Actions BEFORE identity reveal" vs "Consequences AFTER reveal." 3) Ask: "Would the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_005', difficulty: 'standard',
          question: 'Character analysis of supporting characters involves examining their distinct.',
          hint: 'Review c11_hin_ar_cbse_07_004 worked examples on mother\'s character; practice identifying.',
          misconception: 'Students believe supporting characters exist only to "help" or "hinder" the protagonist physically.',
          parts: [
                { id: 'a', prompt: 'List the names of four supporting characters from "tkequ dk isM+" and state one defining action each performs in the story.', answer: 'Correct answer: 1',
                  options: ['Correct answer: 1', 'the officers', 'hinder', 'the mother or vague descriptions like "the officers'],
                  hint: 'Review c11_hin_ar_cbse_07_004 worked examples on mother\'s character; practice identifying her key.',
                  misconception: 'Students believe supporting characters exist only to "help" or "hinder" the protagonist physically.' },
                { id: 'b', prompt: 'Explain in your own words why the old poet (ncs gq, vkneh) refuses to move from under the tree even when threatened with death.', answer: 'Correct answer: The poet refuses',
                  options: ['Correct answer: The poet refuses', 'hinder'],
                  hint: 'Review c11_hin_ar_cbse_07_004 worked examples on mother\'s character; practice identifying her key.',
                  misconception: 'Students believe supporting characters exist only to "help" or "hinder" the protagonist physically.' }
          ],
            remediations: { 'supporting-characters-exist-only-to': { steps: ['Re-read the story marking every scene where a non-mother character speaks.', 'Create a two-column table: Column A = Character\'s exact words/actions; Column B = What larger force they represent.', 'For each character, write one sentence: "This character is not just a person; they are the embodiment of ______." 4.', 'Compare the poet\'s "vksl" (poet) identity with the mother\'s "ekyh" (mother) identity—both are *roles* that transcend.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hin_ar_cbse_07_006', difficulty: 'standard',
          question: 'The primary theme of a literary work is its central, unifying idea that emerges.',
          hint: 'If stuck, review the plot summary (node 002) focusing on the four decision-points about.',
          misconception: 'Students often think the primary theme is "environmental conservation" or "women\'s resilience" because the tree and the.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the tree is ultimately saved — what does the resolution reveal about power in the story?', answer: 'The tree is saved',
                  options: ['The tree is saved', 'the poet\'s poetry moved them', 'environmental conservation', 'women\'s resilience'],
                  hint: 'If stuck, review the plot summary (node 002) focusing on the four decision-points about the tree.',
                  misconception: 'Students often think the primary theme is "environmental conservation" or "women\'s resilience" because the tree and the old woman are.' },
                { id: 'b', prompt: 'Identify two plot points where the theme of "development vs. heritage" appears, and explain how each advances the primary theme.', answer: '1) The engineer\'s order to cut the tree for road-widening introduces the theme:',
                  options: ['1) The engineer\'s order to cut the tree for road-widening introduces the theme:', 'environmental conservation', 'women\'s resilience'],
                  hint: 'If stuck, review the plot summary (node 002) focusing on the four decision-points about the tree.',
                  misconception: 'Students often think the primary theme is "environmental conservation" or "women\'s resilience" because the tree and the old woman are.' },
                { id: 'c', prompt: 'Compare the engineer\'s and the poet\'s relationship to the tree. What does this contrast tell you about the story\'s view of "value"?', answer: 'The engineer sees the tree as an obstacle (measurable, removable)',
                  options: ['The engineer sees the tree as an obstacle (measurable, removable)', 'environmental conservation', 'women\'s resilience'],
                  hint: 'If stuck, review the plot summary (node 002) focusing on the four decision-points about the tree.',
                  misconception: 'Students often think the primary theme is "environmental conservation" or "women\'s resilience" because the tree and the old woman are.' }
          ],
            remediations: { 'the-primary-theme-is-environmental': { steps: ['Ask the student to list every scene where the tree\'s cutting is discussed — there are exactly four: engineer\'s order.', 'Have them label each scene\'s *decision-maker* (engineer, poet, officer, ruler\'s legacy) and *basis of decision* (file.', 'Show the pattern: only the last basis succeeds.', 'Co-construct the theme: "When bureaucracy meets heritage, the winner is not justice or art but historical-political.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
