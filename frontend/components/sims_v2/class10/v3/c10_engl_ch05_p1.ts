import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch05_p1: SimDef = {
    id: 'v3_c10_engl_ch05_p1',
    title: 'Glimpses of India · Part 1/2',
    subtitle: 'Hear the jhang-jhang that still runs a Goan village\'s mornings',
    classLevel: 10, subject: 'engl', topic: 'Glimpses of India · Part 1/2',
    chapters: ['c10_engl_ch05'],
    nodeIds: ['c10_engl_cbse_05_001', 'c10_engl_cbse_05_002', 'c10_engl_cbse_05_003', 'c10_engl_cbse_05_004', 'c10_engl_cbse_05_005', 'c10_engl_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a food historian tracing how bread became Goan', intro: 'Before alarm clocks, a bamboo staff\'s rhythm told a Goan village that morning — and fresh pao — had arrived.', goal: 'Explain the Portuguese legacy in Goan baking and why the pader is a cultural institution, not a vendor.' },
    discovery: {
        question: 'In a Goan village, a man in a knee-length kabai arrives each morning to the \'jhang-jhang\' of a bamboo staff — and the text insists he is NOT a relic of the past. What is he really?',
        options: ['A living cultural institution — his breads are still essential to every Goan festival and marriage', 'A quaint historical figure — the last of the old Portuguese bakers', 'Just a bread-seller doing his morning and evening rounds', 'A tourist attraction maintained for nostalgia'],
        answer: 'A living cultural institution — his breads are still essential to every Goan festival and marriage',
        hook: 'The pader didn\'t survive as a museum piece. Bol at Christmas, sandwiches at engagements — Goa took a Portuguese import and made it impossible to celebrate without.',
    },
    teaching: [
        { title: 'A Baker from Goa: The Portuguese Legacy and the Traditional Baker (Pader)', text: 'This node introduces the first part of "Glimpses of India" — "A Baker from Goa" — focusing on the Portuguese colonial legacy that shaped Goan baking traditions and the enduring figure of the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow the baker\'s daily route through the village — his kabai, his furnace, his jhang-jhang — and show how a colonial legacy became a Goan necessity.',
        labels: ['A Baker from Goa', 'The Baker\'s Role', 'Coorg: The Coffee Country', 'Coorg: The People, Their', 'Tea from Assam', 'Tea from Assam: Tea'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_05_001', title: 'A Baker from Goa: The Portuguese Legacy and the Traditional Baker (Pader)',
          caseStudy: { intro: 'Imagine waking up to a rhythmic *jhang-jhang* sound outside your window — not an alarm, but a baker\'s bamboo staff announcing fresh bread.',
            decisions: [{ prompt: 'What is the local Goan term for the traditional baker mentioned in the text, and what historical power introduced bread-making to Goa?', options: [
                { text: 'The traditional baker is called a *pader*, and bread-making was introduced by the', outcome: 'The traditional baker is called a *pader*, and bread-making was introduced by the Portuguese during.' },
                { text: 'British', outcome: 'Not quite — Students often treat the *pader* as a quaint historical figure — "olden days baker" — and miss that.', reveals: 'students-often-treat-the-pader' },
                { text: 'olden days baker', outcome: 'Not quite — Students often treat the *pader* as a quaint historical figure — "olden days baker" — and miss that.', reveals: 'students-often-treat-the-pader' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_05_002', title: 'The Baker\'s Role in Goan Society: Bread, Festivals and Daily Life',
          caseStudy: { intro: 'Imagine waking up in a Goan village to the rhythmic \'jhang-jhang\' of a bamboo staff — that\'s the baker announcing fresh bread.',
            decisions: [{ prompt: 'What are the two specific times of day the baker visits the household, and what distinct sound announces his arrival?', options: [
                { text: 'The baker visits twice daily: once in the morning during his selling round, and again in', outcome: 'The baker visits twice daily: once in the morning during his selling round, and again in the.' },
                { text: 'he comes only in the morning', outcome: 'Not quite — Students treat the baker as a mere "bread seller" and write answers like "he sells bread in the.', reveals: 'students-treat-the-baker-as' },
                { text: 'he rings a bell', outcome: 'Not quite — Students treat the baker as a mere "bread seller" and write answers like "he sells bread in the.', reveals: 'students-treat-the-baker-as' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_05_003', title: 'Coorg: The Coffee Country and Its Natural Beauty',
          caseStudy: { intro: 'Imagine you are a travel blogger arriving in Coorg for the first time — what would your senses pick up?',
            decisions: [{ prompt: 'What is the primary purpose of sensory imagery in a descriptive passage like "Coorg"?', options: [
                { text: 'The primary purpose is to create a vivid, immersive experience for the reader by', outcome: 'The primary purpose is to create a vivid, immersive experience for the reader by appealing to the.' },
                { text: 'to give factual information about coffee production', outcome: 'Not quite — Students often treat the Coorg passage as a collection of geographical facts (location, rainfall.', reveals: 'students-often-treat-the-coorg' },
                { text: 'analysis of language', outcome: 'Not quite — Students often treat the Coorg passage as a collection of geographical facts (location, rainfall.', reveals: 'students-often-treat-the-coorg' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_05_004', title: 'Coorg: The People, Their Courage and Their Coorgi Regiment',
          caseStudy: { intro: 'Imagine you are a travel blogger visiting Coorg and you meet a local family who proudly shows you their ancestor\'s military medals.',
            decisions: [{ prompt: 'What is the name of the traditional coat worn by Kodava men that resembles the *kuppia*, and which historical figure is it often linked.', options: [
                { text: 'The coat is called the *kuppia*', outcome: 'The coat is called the *kuppia*; the text links it to Alexander the Great\'s army, suggesting.' },
                { text: 'sherwani', outcome: 'Not quite — Students treat the Coorgi Regiment as a *separate fact* to memorize ("most decorated regiment").', reveals: 'students-treat-the-coorgi-regiment' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_05_006', title: 'Tea from Assam: Tea Gardens and the Plantation Life',
          caseStudy: { intro: 'Imagine you are standing at the edge of a vast tea garden in Assam — rows of dark green bushes stretching to the horizon, women moving rhythmically between.',
            decisions: [{ prompt: 'What are the two main visual features of the tea garden landscape described in the text that create the impression of an "endless carpet"?', options: [
                { text: 'The two main visual features are the orderly rows of tea bushes stretching into the', outcome: 'The two main visual features are the orderly rows of tea bushes stretching into the distance and.' },
                { text: 'tea factories', outcome: 'Not quite — Students often treat "Tea from Assam" as *only* a travel description of beautiful scenery, missing.', reveals: 'students-often-treat-tea-from' },
                { text: 'workers\' houses', outcome: 'Not quite — Students often treat "Tea from Assam" as *only* a travel description of beautiful scenery, missing.', reveals: 'students-often-treat-tea-from' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A grandmother describes how, in her childhood, the neighbourhood baker came each morning with a jingling basket and kept every family\'s monthly account in pencil on the wall. Her grandson scoffs: \'Old trades like that died out because delivery apps are just better.\'',
            decisions: [{ prompt: 'What does the Goan \'pader\' tradition in the chapter suggest about what would actually be lost?', options: [
                { text: 'The pader was not just a bread-seller — he was a daily ritual, a trusted figure whose jingling staff woke the village, and his pencil-on-the-wall accounts ran on relationship rather than apps. When such a trade disappears, what is lost is a sensory rhythm, human trust and a living piece of Goa\'s Portuguese-era culture — not merely a delivery channel.', outcome: 'The chapter treats the pader as a living link to the past: the loaves, the morning routine and the informal credit all carry cultural memory that an app notification cannot replace.' },
                { text: 'The grandson is right — trades survive only if they are efficient, so the pader\'s disappearance would just prove he was inferior.', outcome: 'Survival is not a verdict on worth — the pader endured because he was woven into community life, and his loss would be cultural, not just commercial.', reveals: 'new-always-beats-old' },
                { text: 'Grandmother\'s memory proves the pader was mainly about nostalgia — the actual bread and accounts were incidental.', outcome: 'The text shows the opposite — the bread was a daily necessity and the monthly pencil accounts a real trust-based economy; nostalgia is how it is remembered, not what it was.', reveals: 'tradition-is-only-nostalgia' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Culture isn\'t what invaders leave behind; it\'s what people choose to keep. The pader endures because Goa kneaded Portuguese bread into its own identity.',
            decisions: [{ prompt: 'What comes next? Glimpses of India · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Glimpses of India · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_05_001', difficulty: 'standard',
          question: 'This node introduces the first part of "Glimpses of India" — "A Baker from Goa".',
          hint: 'Review "Cultural Core: How Crafts Reflect Regional Identity" (c9_engl_ch3_9).',
          misconception: 'Students often treat the *pader* as a quaint historical figure — "olden days baker" — and miss that the text explicitly.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the author says the *pader* was "an important person in the village" — go beyond "he sold bread."', answer: 'The *pader* was important',
                  options: ['The *pader* was important', 'olden days baker', 'the *pader* still exists in Goa'],
                  hint: 'Review "Cultural Core: How Crafts Reflect Regional Identity" (c9_engl_ch3_9) — specifically the.',
                  misconception: 'Students often treat the *pader* as a quaint historical figure — "olden days baker" — and miss that the text explicitly states "the *pader*.' },
                { id: 'b', prompt: 'The author describes the baker\'s arrival: "The jingling thud of his bamboo woke us from sleep." Apply the concept of **auditory imagery** to explain what this.', answer: 'the time of day, (',
                  options: ['the time of day, (', 'sound device', 'olden days baker', 'the *pader* still exists in Goa'],
                  hint: 'Review "Cultural Core: How Crafts Reflect Regional Identity" (c9_engl_ch3_9) — specifically the.',
                  misconception: 'Students often treat the *pader* as a quaint historical figure — "olden days baker" — and miss that the text explicitly states "the *pader*.' },
                { id: 'c', prompt: 'Analyze the author\'s description of the baker\'s dress: "He wore a peculiar dress — a single-piece long frock reaching down to his knees." What does the word.', answer: '"Peculiar" signals an outsider\'s or child\'s gaze',
                  options: ['"Peculiar" signals an outsider\'s or child\'s gaze', 'old-fashioned', 'olden days baker', 'the *pader* still exists in Goa'],
                  hint: 'Review "Cultural Core: How Crafts Reflect Regional Identity" (c9_engl_ch3_9) — specifically the.',
                  misconception: 'Students often treat the *pader* as a quaint historical figure — "olden days baker" — and miss that the text explicitly states "the *pader*.' }
          ],
            remediations: { 'students-often-treat-the-pader': { steps: ['Re-read the first three paragraphs aloud, circling every proper noun (Goa, Portuguese, *pader*, *kabai*, *bol*).', 'Make a two-column table: "Portuguese Legacy" vs "Goan Adaptation" and fill it with textual phrases.', 'Verbally explain to a peer why the furnace (*bhat*) is a symbol of continuity, not just a tool.', 'Rewrite the diary entry (Diagnostic 6) using the new clarity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat the *pader* as a quaint historical figure — "olden days baker" — and miss that the text explicitly.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "The author romanticizes the *pader*; the baker was just a businessman selling a product." Defend or challenge using two pieces.', answer: 'Challenge',
                  options: ['Challenge', 'olden days baker', 'the *pader* still exists in Goa'],
                  hint: 'Review "Cultural Core: How Crafts Reflect Regional Identity" (c9_engl_ch3_9) — specifically the.',
                  misconception: 'Students often treat the *pader* as a quaint historical figure — "olden days baker" — and miss that the text explicitly states "the *pader*.' }
          ],
            remediations: { 'students-often-treat-the-pader': { steps: ['Re-read the first three paragraphs aloud, circling every proper noun (Goa, Portuguese, *pader*, *kabai*, *bol*).', 'Make a two-column table: "Portuguese Legacy" vs "Goan Adaptation" and fill it with textual phrases.', 'Verbally explain to a peer why the furnace (*bhat*) is a symbol of continuity, not just a tool.', 'Rewrite the diary entry (Diagnostic 6) using the new clarity.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_05_002', difficulty: 'standard',
          question: 'The baker (pader) in Goan society is a traditional Portuguese-influenced.',
          hint: 'If stuck, review c10_engl_cbse_05_001 — specifically the "Portuguese legacy" section.',
          misconception: 'Students treat the baker as a mere "bread seller" and write answers like "he sells bread in the morning and evening.".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the author says the baker\'s furnace is \'absolutely essential\' in a Goan village.', answer: 'The furnace is essential',
                  options: ['The furnace is essential', 'bread for eating'],
                  hint: 'If stuck, review c10_engl_cbse_05_001 — specifically the "Portuguese legacy" section on bread.',
                  misconception: 'Students treat the baker as a mere "bread seller" and write answers like "he sells bread in the morning and evening." They miss that the.' },
                { id: 'b', prompt: 'The author describes the baker\'s physical appearance: "He wore a single-piece long frock reaching down to his knees." If you were writing a character sketch.', answer: 'The kabai (frock) reveals: (1) Tradition preservation',
                  options: ['The kabai (frock) reveals: (1) Tradition preservation', 'he is poor', 'he likes loose clothes'],
                  hint: 'If stuck, review c10_engl_cbse_05_001 — specifically the "Portuguese legacy" section on bread.',
                  misconception: 'Students treat the baker as a mere "bread seller" and write answers like "he sells bread in the morning and evening." They miss that the.' },
                { id: 'c', prompt: 'Compare the baker\'s role in daily life versus his role during festivals. Use a Venn diagram logic: what overlaps, what is distinct?', answer: 'Overlap: provides bread, earns livelihood, maintains routine',
                  options: ['Overlap: provides bread, earns livelihood, maintains routine', 'sells more bread'],
                  hint: 'If stuck, review c10_engl_cbse_05_001 — specifically the "Portuguese legacy" section on bread.',
                  misconception: 'Students treat the baker as a mere "bread seller" and write answers like "he sells bread in the morning and evening." They miss that the.' }
          ],
            remediations: { 'students-treat-the-baker-as': { steps: ['Re-read the text marking every festival/occasion mentioned (Christmas, feast, engagement, daily breakfast).', 'For each, note the specific bread and the consequence of its absence (e.g., "marriage gifts meaningless without bol").', 'Create a two-column table: "Commercial Activity" vs "Cultural Function" — fill from text.', 'Practice one PEEL paragraph: Point (Baker = cultural anchor), Evidence (bol at Christmas), Explanation (without bol.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_05_003', difficulty: 'standard',
          question: 'This node covers the descriptive prose passage "Coorg" from the chapter.',
          hint: 'Review "Literary Devices: Imagery and Sound in Nature Descriptions" (c7_engl_ch01_008).',
          misconception: 'Students often treat the Coorg passage as a collection of geographical facts (location, rainfall, crops) and memorize.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of sensory imagery in a descriptive passage like "Coorg"?', answer: 'The primary purpose is to create a vivid, immersive experience for the reader by',
                  options: ['The primary purpose is to create a vivid, immersive experience for the reader by', 'to give factual information about coffee production', 'analysis of language'],
                  hint: 'Review "Literary Devices: Imagery and Sound in Nature Descriptions" (c7_engl_ch01_008) and.',
                  misconception: 'Students often treat the Coorg passage as a collection of geographical facts (location, rainfall, crops) and memorize them for "reference.' },
                { id: 'b', prompt: 'The author writes: "The air is heavy with the scent of coffee." Identify the sense appealed to and explain the effect of the word "heavy."', answer: 'The sense is smell (olfactory)',
                  options: ['The sense is smell (olfactory)', 'without explaining'],
                  hint: 'Review "Literary Devices: Imagery and Sound in Nature Descriptions" (c7_engl_ch01_008) and.',
                  misconception: 'Students often treat the Coorg passage as a collection of geographical facts (location, rainfall, crops) and memorize them for "reference.' }
          ],
            remediations: { 'students-often-treat-the-coorg': { steps: ['Have the student re-read only the first paragraph and highlight every sensory word in four colors (sight, smell, sound.', 'Ask: "If you removed all the highlighted words, what would be left?" (Bare facts.) 3.', 'Explain: "The author *chose* these words to make you *feel* Coorg.', 'Your job is to notice the choices." 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_05_004', difficulty: 'standard',
          question: 'This node analyzes the second part of the "Coorg" excerpt from *Glimpses.',
          hint: 'Review "Expository Structure and Informative Writing" (c9_engl_ch3_7) for text structure.',
          misconception: 'Students treat the Coorgi Regiment as a *separate fact* to memorize ("most decorated regiment") rather than the.',
          parts: [
                { id: 'a', prompt: 'What is the name of the traditional coat worn by Kodava men that resembles the *kuppia*, and which historical figure is it often linked to in the text?', answer: 'The coat is called the *kuppia*',
                  options: ['The coat is called the *kuppia*', 'sherwani'],
                  hint: 'Review "Expository Structure and Informative Writing" (c9_engl_ch3_7) for text structure, and.',
                  misconception: 'Students treat the Coorgi Regiment as a *separate fact* to memorize ("most decorated regiment") rather than the *culminating evidence* for.' },
                { id: 'b', prompt: 'Compare how the author establishes "courage" in the Coorg excerpt versus how the Goan baker\'s "importance" is established in the previous excerpt (A Baker from.', answer: 'Coorg: **Cumulative factual evidence**',
                  options: ['Coorg: **Cumulative factual evidence**', 'both use adjectives'],
                  hint: 'Review "Expository Structure and Informative Writing" (c9_engl_ch3_7) for text structure, and.',
                  misconception: 'Students treat the Coorgi Regiment as a *separate fact* to memorize ("most decorated regiment") rather than the *culminating evidence* for.' }
          ],
            remediations: { 'students-treat-the-coorgi-regiment': { steps: ['**Re-read with a highlighter**: Mark every sentence that shows courage *in action* (wedding gunfire, firearms license.', '**Create a two-column table**: Column A = "Claim about Coorgis" (e.g., "fiercely independent"); Column B = "Evidence.', '**Verbalize the link**: For each row, say "The author proves [Claim] by showing [Evidence]." 4.', '**Rewrite one 3-marker answer** using this table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_05_005', difficulty: 'standard',
          question: 'A legend is a traditional story passed down through generations that explains.',
          hint: 'Review c9_engl_ch3_9 (Cultural Core: How Crafts Reflect Regional Identity) to see how.',
          misconception: 'Students often think the legend of tea\'s discovery in Assam is a historically verified fact, and they confuse it with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A legend is a traditional story passed down through generations that explains the origins',
                  options: ['A legend is a traditional story passed down through generations that explains the origins', 'This node introduces the first part of "Glimpses of India"', 'The baker (pader) in Goan society is a traditional Portuguese-influenced profession that', 'This node covers the descriptive prose passage "Coorg" from the chapter *Glimpses of'],
                  hint: 'Review c9_engl_ch3_9 (Cultural Core: How Crafts Reflect Regional Identity) to see how a product.',
                  misconception: 'Students often think the legend of tea\'s discovery in Assam is a historically verified fact, and they confuse it with the Chinese legend.' }
          ],
            remediations: { 'the-legend-of-tea-s': { steps: ['Ask the student to list three different "origin stories" of tea they have heard (Chinese emperor, Assamese monk.', 'Create a three-column table: Source (Legend/History/Colonial Record), Key Figure, Purpose of Story.', 'Have them re-read the textbook passage and highlight phrases like "it is said," "legend has it," "according.', 'Practice writing one sentence that correctly frames the legend: "According to an Assamese legend, tea was discovered.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_05_006', difficulty: 'standard',
          question: 'This node covers the descriptive prose segment "Tea from Assam" (Part III) from.',
          hint: 'Review "Literary Device: Imagery of Nature" (c8_engl_ch4_7) and "Descriptive Language and.',
          misconception: 'Students often treat "Tea from Assam" as *only* a travel description of beautiful scenery, missing that it is equally.',
          parts: [
                { id: 'a', prompt: 'The text states: "The tea bushes, pruned to the same height, stood in neat rows..." Apply the concept of \'visual imagery\' to explain how this sentence creates.', answer: '**Point:** The sentence uses precise visual imagery to convey order and scale',
                  options: ['**Point:** The sentence uses precise visual imagery to convey order and scale', 'the bushes are cut short and planted in lines'],
                  hint: 'Review "Literary Device: Imagery of Nature" (c8_engl_ch4_7) and "Descriptive Language and Imagery".',
                  misconception: 'Students often treat "Tea from Assam" as *only* a travel description of beautiful scenery, missing that it is equally a **structured.' },
                { id: 'b', prompt: 'Compare the description of the tea factory ("a huge building with tall chimneys") with the description of the tea garden ("a magnificent view").', answer: 'The garden is described aesthetically ("magnificent view," "carpet of green")',
                  options: ['The garden is described aesthetically ("magnificent view," "carpet of green")', 'one is big, one is small'],
                  hint: 'Review "Literary Device: Imagery of Nature" (c8_engl_ch4_7) and "Descriptive Language and Imagery".',
                  misconception: 'Students often treat "Tea from Assam" as *only* a travel description of beautiful scenery, missing that it is equally a **structured.' }
          ],
            remediations: { 'students-often-treat-tea-from': { steps: ['**Re-read with a two-column table**: Label columns "Nature\'s Beauty" and "Human System." Place every sentence from the.', '**Highlight process verbs**: Circle *pruned, plucked, carried, weighed, processed, packed, dispatched* — these are the.', '**Rewrite one paragraph** using only process verbs and sensory nouns (no adjectives like "beautiful").', '**Answer this prompt in 50 words**: "How does the text show that the tea garden is a factory without walls?" — forces.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
