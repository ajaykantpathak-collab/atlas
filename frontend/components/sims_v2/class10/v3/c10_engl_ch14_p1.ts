import type { SimDef } from '../../engine/types';

/** v3 generated — c10_engl_ch14_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_engl_ch14_p1: SimDef = {
    id: 'v3_c10_engl_ch14_p1',
    title: 'Footprints without Feet · Part 1/2',
    subtitle: 'Become invisible — and learn why that solves nothing',
    classLevel: 10, subject: 'engl', topic: 'Footprints without Feet · Part 1/2',
    chapters: ['c10_engl_ch14'],
    nodeIds: ['c10_engl_cbse_14_001', 'c10_engl_cbse_14_002', 'c10_engl_cbse_14_003', 'c10_engl_cbse_14_004', 'c10_engl_cbse_14_005', 'c10_engl_cbse_14_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a brilliant but lawless scientist', intro: 'You have done what no physicist dreamed of: swallowed rare drugs, watched your body turn transparent as air. Then you step outside into a London January and realise the cold doesn\'t care that it can\'t see you.', goal: 'Explain the refractive-index logic of Griffin\'s invisibility and judge how a discovery\'s value depends on the hands that hold it.' },
    discovery: {
        question: 'Griffin discovers drugs that make the human body\'s refractive index match air — light passes through him, so he becomes invisible. But footprints appear in mud, snow shows his steps, and stolen food bulges visibly in his invisible stomach. What does this reveal about his \'perfect\' power?',
        options: ['Invisibility hides the body, not its effects — he still leaves evidence wherever he goes', 'The drugs were imperfect and kept wearing off randomly', 'His power worked only in daylight, like a vampire reversed', 'He could only stay invisible while holding his breath'],
        answer: 'Invisibility hides the body, not its effects — he still leaves evidence wherever he goes',
        hook: 'Griffin could vanish but could not hide his footprints, his breath in cold air, or the food inside him. Being unseen is not the same as being untraceable.',
    },
    teaching: [
        { title: 'Griffin the Scientist: Discovery of Invisibility Through Drugs', text: 'Griffin\'s discovery of invisibility is a fictional scientific process in which a scientist uses rare drugs to alter the refractive index of the human body to match that of air, allowing light to pass.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_engl_cbse_14_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Test a scientific breakthrough that bends light around a human body — then survive a winter night as an invisible man who still needs warmth, food and shelter, all of which give him away.',
        labels: ['Griffin the Scientist: Discovery', 'Griffin\'s Lawlessness: Setting Fire', 'Footprints in the Mud', 'Griffin in the London', 'Griffin in the Drapery', 'Griffin in Iping Village'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_engl_cbse_14_001', title: 'Griffin the Scientist: Discovery of Invisibility Through Drugs',
          caseStudy: { intro: 'Imagine you\'re reading a superhero origin story, but instead of a spider bite or a gamma-ray blast, the hero becomes invisible through a chemistry experiment.',
            decisions: [{ prompt: 'What is the scientific principle that Griffin exploits to achieve invisibility?', options: [
                { text: 'Griffin exploits the principle of refractive index matching: he uses drugs to make the', outcome: 'Griffin exploits the principle of refractive index matching: he uses drugs to make the refractive.' },
                { text: 'magic potion', outcome: 'Not quite — Students often believe Griffin\'s invisibility comes from a single "magic potion" that turns him.', reveals: 'griffin-s-invisibility-comes-from' },
                { text: 'he became transparent like glass', outcome: 'Not quite — Students often believe Griffin\'s invisibility comes from a single "magic potion" that turns him.', reveals: 'griffin-s-invisibility-comes-from' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_14_002', title: 'Griffin\'s Lawlessness: Setting Fire to His Landlord\'s House',
          caseStudy: { intro: 'Imagine you have a brilliant idea for a science project, but your teacher threatens to throw it away because you haven\'t paid the lab fee.',
            decisions: [{ prompt: 'What specific action does Griffin take against his landlord\'s house, and what immediate advantage does his invisibility give him during.', options: [
                { text: 'Griffin deliberately sets fire to the house and then escapes unseen', outcome: 'Griffin deliberately sets fire to the house and then escapes unseen because he is invisible.' },
                { text: 'the fire started accidentally', outcome: 'Not quite — Students often believe Griffin set the fire accidentally while conducting experiments, or that.', reveals: 'griffin-set-the-fire-accidentally' },
                { text: 'he fought the landlord', outcome: 'Not quite — Students often believe Griffin set the fire accidentally while conducting experiments, or that.', reveals: 'griffin-set-the-fire-accidentally' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_14_003', title: 'Footprints in the Mud: How the Invisible Man Was Discovered',
          caseStudy: { intro: 'Imagine you\'ve just turned invisible — no one can see you, you think you\'re perfectly hidden. But then you step in a mud puddle.',
            decisions: [{ prompt: 'What specific physical circumstance forced Griffin to walk barefoot on the London streets, leading to the muddy footprints?', options: [
                { text: 'Griffin had set fire to his landlord\'s house (as revenge for eviction) and had to remove', outcome: 'Griffin had set fire to his landlord\'s house (as revenge for eviction) and had to remove his.' },
                { text: 'he lost his shoes', outcome: 'Not quite — Students believe the muddy footprints appeared because Griffin\'s invisibility "wore off" on his.', reveals: 'the-muddy-footprints-appeared-because' },
                { text: 'he chose to be barefoot', outcome: 'Not quite — Students believe the muddy footprints appeared because Griffin\'s invisibility "wore off" on his.', reveals: 'the-muddy-footprints-appeared-because' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_14_004', title: 'Griffin in the London Store: Clothing and Feeding Himself',
          caseStudy: { intro: 'Imagine you are invisible on a freezing January night in London — no clothes, no money, no shelter. What would you do? Griffin chooses a department store.',
            decisions: [{ prompt: 'What specific items does Griffin take from the London store to clothe and feed himself, and in what order does he do so?', options: [
                { text: 'Griffin first takes warm clothing: an overcoat, hat, socks, and shoes from the clothing', outcome: 'Griffin first takes warm clothing: an overcoat, hat, socks, and shoes from the clothing department.' },
                { text: 'he steals money first', outcome: 'Not quite — Students think Griffin is a "victim of circumstances" forced to steal because he is invisible.', reveals: 'griffin-is-a-victim-of' },
                { text: 'he eats before dressing', outcome: 'Not quite — Students think Griffin is a "victim of circumstances" forced to steal because he is invisible.', reveals: 'griffin-is-a-victim-of' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_14_005', title: 'Griffin in the Drapery Shop: The Shopkeeper\'s Terrifying Experience',
          caseStudy: { intro: 'Imagine you are the shopkeeper locking up your drapery shop at night when suddenly a coat lifts itself off the rack and walks toward you — no legs, no arms.',
            decisions: [{ prompt: 'What is the immediate cause of the shopkeeper\'s terror in the drapery shop episode?', options: [
                { text: 'The shopkeeper is terrified', outcome: 'The shopkeeper is terrified because he sees clothes moving on their own — coats, shirts, and.' },
                { text: 'Griffin threatens him with a knife', outcome: 'Not quite — Students often think the shopkeeper "sees Griffin" because the text describes clothes moving as.', reveals: 'the-shopkeeper-sees-griffin-because' },
                { text: 'sees Griffin', outcome: 'Not quite — Students often think the shopkeeper "sees Griffin" because the text describes clothes moving as.', reveals: 'the-shopkeeper-sees-griffin-because' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_14_006', title: 'Griffin in Iping Village: The Stranger and the Vicar\'s House',
          caseStudy: { intro: 'Imagine a mysterious stranger wrapped in bandages and dark glasses arriving in your quiet village during a snowstorm, demanding a room but refusing to show his.',
            decisions: [{ prompt: 'What is the name of the inn where Griffin stays in Iping, and who is the landlady?', options: [
                { text: 'The inn is called the Coach and Horses, and the landlady is Mrs', outcome: 'The inn is called the Coach and Horses, and the landlady is Mrs. Hall.' },
                { text: 'the villagers saw an invisible man', outcome: 'Not quite — Students often believe Griffin is completely invisible during his stay in Iping, but he wears.', reveals: 'griffin-is-completely-invisible-during' },
                { text: 'a different inn or landlord', outcome: 'Not quite — Students often believe Griffin is completely invisible during his stay in Iping, but he wears.', reveals: 'griffin-is-completely-invisible-during' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_14_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a sleepover, the group debates which superpower they\'d want. Most pick invisibility — \'imagine what you could get away with!\' One quiet kid who just read \'Footprints without Feet\' says the story changed his mind.',
            decisions: [{ prompt: 'What caution does Griffin\'s story actually offer?', options: [
                { text: 'That a great power without character becomes a crime spree — Griffin was a brilliant scientist who made his body transparent like glass, but instead of serving science he used invisibility to steal, assault and terrorise. The story shows the discovery was not the problem; the man misusing it was. A power only amplifies what the person already is.', outcome: 'Griffin could have been celebrated for one of the great discoveries; because he chose selfish ends, invisibility turned a promising scientist into a hunted lawbreaker.' },
                { text: 'The story proves science itself is dangerous — discoveries like invisibility should simply never be made.', outcome: 'The science was neutral — the harm came from Griffin\'s choices; a discovery\'s danger lies in its misuse, not its existence.', reveals: 'science-itself-is-evil' },
                { text: 'It proves invisibility is the best power to have, since Griffin got away with everything thanks to it.', outcome: 'He did not get away — he was chased, freezing, forced to bandage himself visible again, and finally cornered; the power gave him no peace at all.', reveals: 'invisibility-has-no-cost' }
            ] }] } },
        { type: 'case', nodeId: 'c10_engl_cbse_14_006', title: 'The bigger picture',
          caseStudy: { intro: 'Science gave Griffin a miracle, and he used it for arson and theft. The footprints in the snow were the honest part of him — the man remained visible in his choices.',
            decisions: [{ prompt: 'What comes next? Footprints without Feet · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Footprints without Feet · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_engl_cbse_14_001', difficulty: 'standard',
          question: 'Griffin\'s discovery of invisibility is a fictional scientific process in which.',
          hint: 'Review character analysis steps from Class 9 (c9_engl_ch1_2) and the theme of innovation.',
          misconception: 'Students often believe Griffin\'s invisibility comes from a single "magic potion" that turns him transparent like glass.',
          parts: [
                { id: 'a', prompt: 'Why does Griffin choose to experiment on himself rather than on a test subject?', answer: 'Griffin experiments on himself',
                  options: ['Griffin experiments on himself', 'a lawless person', 'had no one to share his secret', 'he was forced'],
                  hint: 'Review character analysis steps from Class 9 (c9_engl_ch1_2) and the theme of innovation from Class.',
                  misconception: 'Students often believe Griffin\'s invisibility comes from a single "magic potion" that turns him transparent like glass.' },
                { id: 'b', prompt: 'If Griffin\'s drugs had made his body\'s refractive index equal to that of water (1.33) instead of air (1.0), what would happen when he stood in a room?', answer: 'He would remain visible in air',
                  options: ['He would remain visible in air', 'he\'d be half-invisible', 'magic potion', 'transparent'],
                  hint: 'Review character analysis steps from Class 9 (c9_engl_ch1_2) and the theme of innovation from Class.',
                  misconception: 'Students often believe Griffin\'s invisibility comes from a single "magic potion" that turns him transparent like glass.' },
                { id: 'c', prompt: 'Compare Griffin\'s scientific method with standard ethical research practices. Identify three specific steps he skips, with textual support.', answer: 'Griffin skips: (1) Peer review and collaboration',
                  options: ['Griffin skips: (1) Peer review and collaboration', 'he was secretive', 'magic potion', 'transparent'],
                  hint: 'Review character analysis steps from Class 9 (c9_engl_ch1_2) and the theme of innovation from Class.',
                  misconception: 'Students often believe Griffin\'s invisibility comes from a single "magic potion" that turns him transparent like glass.' }
          ],
            remediations: { 'griffin-s-invisibility-comes-from': { steps: ['Have the student re-read the two paragraphs where the narrator explains Griffin\'s process.', 'Highlight every occurrence of "refractive index," "drugs," "air," and "transparent." 3.', 'Draw a quick diagram: light ray → air (n=1.0) → body (n=1.0) → no bend → invisible.', 'Ask: "Why is glass visible if it\'s transparent?" Guide them to: glass has n=1.5, air n=1.0 → light bends at surface →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_14_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Griffin\'s invisibility comes from a single "magic potion" that turns him transparent like glass.',
          parts: [
                { id: 'a', prompt: 'Evaluate: Was Griffin\'s discovery a triumph of science or a curse? Justify with two pieces of evidence from the story.', answer: 'It is both: a scientific triumph',
                  options: ['It is both: a scientific triumph', 'magic potion', 'transparent', 'invisible'],
                  hint: 'Review character analysis steps from Class 9 (c9_engl_ch1_2) and the theme of innovation from Class.',
                  misconception: 'Students often believe Griffin\'s invisibility comes from a single "magic potion" that turns him transparent like glass.' },
                { id: 'b', prompt: 'Write a 50-word diary entry from Griffin\'s perspective on the night he first becomes fully invisible.', answer: 'A strong entry: "Midnight',
                  options: ['A strong entry: "Midnight', 'magic potion', 'transparent', 'invisible'],
                  hint: 'Review character analysis steps from Class 9 (c9_engl_ch1_2) and the theme of innovation from Class.',
                  misconception: 'Students often believe Griffin\'s invisibility comes from a single "magic potion" that turns him transparent like glass.' }
          ],
            remediations: { 'griffin-s-invisibility-comes-from': { steps: ['Have the student re-read the two paragraphs where the narrator explains Griffin\'s process.', 'Highlight every occurrence of "refractive index," "drugs," "air," and "transparent." 3.', 'Draw a quick diagram: light ray → air (n=1.0) → body (n=1.0) → no bend → invisible.', 'Ask: "Why is glass visible if it\'s transparent?" Guide them to: glass has n=1.5, air n=1.0 → light bends at surface →.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_14_002', difficulty: 'standard',
          question: 'Griffin\'s act of setting fire to his landlord\'s house is a pivotal plot event.',
          hint: 'If stuck, review "Character Analysis: Tenali Ramakrishna as a Witty Advisor".',
          misconception: 'Students often believe Griffin set the fire accidentally while conducting experiments, or that he *had* to burn the.',
          parts: [
                { id: 'a', prompt: 'What specific action does Griffin take against his landlord\'s house, and what immediate advantage does his invisibility give him during this event?', answer: 'Griffin deliberately sets fire to the house and then escapes unseen',
                  options: ['Griffin deliberately sets fire to the house and then escapes unseen', 'the fire started accidentally', 'he fought the landlord'],
                  hint: 'If stuck, review "Character Analysis: Tenali Ramakrishna as a Witty Advisor" (c8_engl_ch1_2) — same.',
                  misconception: 'Students often believe Griffin set the fire accidentally while conducting experiments, or that he *had* to burn the house to destroy the.' }
          ],
            remediations: { 'griffin-set-the-fire-accidentally': { steps: ['Re-read the two paragraphs around "His landlord disliked him..." with a highlighter.', 'Mark every verb that shows *choice* (decided, set fire, escaped, wandered).', 'Write one sentence: "Griffin chose to burn the house because ______." 4.', 'Check if your blank contains "revenge" or "anger" — if it contains "accident" or "necessity," repeat step 1.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_14_003', difficulty: 'standard',
          question: 'This node covers the pivotal plot event in H.G. Wells\' "Footprints without.',
          hint: 'If stuck, re-read the arson scene (node 002) and ask: "What exactly does Griffin lose.',
          misconception: 'Students believe the muddy footprints appeared because Griffin\'s invisibility "wore off" on his feet or that the mud.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the muddy footprints were visible to others even though Griffin himself was invisible.', answer: 'Invisibility only affects Griffin\'s body',
                  options: ['Invisibility only affects Griffin\'s body', 'the mud became invisible too', 'his feet were visible', 'wore off'],
                  hint: 'If stuck, re-read the arson scene (node 002) and ask: "What exactly does Griffin lose in the fire?".',
                  misconception: 'Students believe the muddy footprints appeared because Griffin\'s invisibility "wore off" on his feet or that the mud became invisible too.' },
                { id: 'b', prompt: 'Analyze how the muddy footprints incident functions as the structural turning point of the story. What changes for Griffin before vs. after this moment?', answer: 'Before: Griffin is a secretive scientist controlling his invisibility, choosing',
                  options: ['Before: Griffin is a secretive scientist controlling his invisibility, choosing', 'wore off', 'his feet became visible', 'the mud disappeared'],
                  hint: 'If stuck, re-read the arson scene (node 002) and ask: "What exactly does Griffin lose in the fire?".',
                  misconception: 'Students believe the muddy footprints appeared because Griffin\'s invisibility "wore off" on his feet or that the mud became invisible too.' }
          ],
            remediations: { 'the-muddy-footprints-appeared-because': { steps: ['If a student holds this misconception: 1.', 'Draw a quick diagram: stick figure (transparent) + brown ovals on feet (mud) + brown prints on ground.', 'Ask: "Is the mud part of Griffin\'s body?" (No).', '"Does light pass through mud?" (No).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_14_004', difficulty: 'standard',
          question: 'This episode from "Footprints without Feet" depicts Griffin, the invisible.',
          hint: 'Review PEEL structure from Class 9 writing nodes (c9_engl_ch1_7) and irony examples from.',
          misconception: 'Students think Griffin is a "victim of circumstances" forced to steal because he is invisible.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why Griffin must wear clothes even though he is invisible, and what problem this creates for him.', answer: 'Griffin wears clothes',
                  options: ['Griffin wears clothes', 'he wears clothes to hide his invisibility', 'he doesn\'t need clothes', 'victim of circumstances'],
                  hint: 'Review PEEL structure from Class 9 writing nodes (c9_engl_ch1_7) and irony examples from Class 8.',
                  misconception: 'Students think Griffin is a "victim of circumstances" forced to steal because he is invisible.' },
                { id: 'b', prompt: 'Using the PEEL structure, write a 4-sentence answer to: "How does Griffin\'s behaviour in the London store show he is resourceful?"', answer: 'Point: Griffin demonstrates practical resourcefulness in the store',
                  options: ['Point: Griffin demonstrates practical resourcefulness in the store', 'Explanation', 'victim of circumstances', 'Griffin is a "victim of circumstances" forced to steal'],
                  hint: 'Review PEEL structure from Class 9 writing nodes (c9_engl_ch1_7) and irony examples from Class 8.',
                  misconception: 'Students think Griffin is a "victim of circumstances" forced to steal because he is invisible.' },
                { id: 'c', prompt: 'Compare Griffin\'s actions in the London store with his earlier action of setting fire to his landlord\'s house (node 002).', answer: 'The landlord\'s house burning was reactive revenge (emotional, destructive)',
                  options: ['The landlord\'s house burning was reactive revenge (emotional, destructive)', 'just crimes', 'victim of circumstances', 'Griffin is a "victim of circumstances" forced to steal'],
                  hint: 'Review PEEL structure from Class 9 writing nodes (c9_engl_ch1_7) and irony examples from Class 8.',
                  misconception: 'Students think Griffin is a "victim of circumstances" forced to steal because he is invisible.' }
          ],
            remediations: { 'griffin-is-a-victim-of': { steps: ['Re-read the store episode highlighting every verb showing *choice* (broke open, fitted himself, helped himself, settled.', 'Create a two-column table: "Need caused by invisibility" vs "Griffin\'s chosen response."', 'Ask: "Could an honest invisible man survive differently?" Discuss alternatives (police, charity, confession).', 'Rewrite the diary entry (Diagnostic 6) forcing Griffin to admit one alternative he rejected.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_14_005', difficulty: 'standard',
          question: 'This topic examines the episode in H.G. Wells\' "Footprints without Feet" where.',
          hint: 'Review c9_engl_ch1_7 (first-person narrative perspective) and c8_engl_ch3_7.',
          misconception: 'Students often think the shopkeeper "sees Griffin" because the text describes clothes moving as if worn.',
          parts: [
                { id: 'a', prompt: 'What is the immediate cause of the shopkeeper\'s terror in the drapery shop episode?', answer: 'The shopkeeper is terrified',
                  options: ['The shopkeeper is terrified', 'Griffin threatens him with a knife', 'sees Griffin', 'The shopkeeper saw Griffin putting on clothes'],
                  hint: 'Review c9_engl_ch1_7 (first-person narrative perspective) and c8_engl_ch3_7 (foreshadowing).',
                  misconception: 'Students often think the shopkeeper "sees Griffin" because the text describes clothes moving as if worn.' }
          ],
            remediations: { 'the-shopkeeper-sees-griffin-because': { steps: ['Re-read the episode aloud, highlighting every verb that describes what the shopkeeper *directly* perceives (heard, saw.', 'Draw a two-column table: "Shopkeeper\'s Experience" | "Reader\'s Knowledge." Fill it with textual phrases.', 'Practice writing one PEEL paragraph using only the left column as evidence.', 'Compare with a model answer that maintains the distinction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_engl_cbse_14_006', difficulty: 'standard',
          question: 'This node covers the analysis of the prose episode in H.G. Wells\' "Footprints.',
          hint: 'Review c10_engl_cbse_14_005 (Drapery Shop) to recall how Griffin stole money and clothes.',
          misconception: 'Students often believe Griffin is completely invisible during his stay in Iping, but he wears bandages, dark glasses,.',
          parts: [
                { id: 'a', prompt: 'What is the name of the inn where Griffin stays in Iping, and who is the landlady?', answer: 'The inn is called the Coach and Horses, and the landlady is Mrs',
                  options: ['The inn is called the Coach and Horses, and the landlady is Mrs', 'the villagers saw an invisible man', 'a different inn or landlord'],
                  hint: 'Review c10_engl_cbse_14_005 (Drapery Shop) to recall how Griffin stole money and clothes, and why.',
                  misconception: 'Students often believe Griffin is completely invisible during his stay in Iping, but he wears bandages, dark glasses, a hat, and clothes.' },
                { id: 'b', prompt: 'Why do the villagers of Iping find the stranger suspicious even before the burglary?', answer: 'The villagers find the stranger suspicious',
                  options: ['The villagers find the stranger suspicious', 'the villagers saw an invisible man'],
                  hint: 'Review c10_engl_cbse_14_005 (Drapery Shop) to recall how Griffin stole money and clothes, and why.',
                  misconception: 'Students often believe Griffin is completely invisible during his stay in Iping, but he wears bandages, dark glasses, a hat, and clothes.' },
                { id: 'c', prompt: 'If a new stranger arrived in a village today wearing a hoodie, mask, and gloves, refusing to remove them, and objects in his room moved at night, how would the.', answer: 'The reaction would be similar: fear, gossip, and suspicion',
                  options: ['The reaction would be similar: fear, gossip, and suspicion', 'people would not care today', 'the villagers saw an invisible man'],
                  hint: 'Review c10_engl_cbse_14_005 (Drapery Shop) to recall how Griffin stole money and clothes, and why.',
                  misconception: 'Students often believe Griffin is completely invisible during his stay in Iping, but he wears bandages, dark glasses, a hat, and clothes.' },
                { id: 'd', prompt: 'Compare Griffin\'s behavior in the Iping inn with his behavior in the London drapery shop (from the previous episode).', answer: 'In London, Griffin steals clothes and food out of necessity and escapes unseen',
                  options: ['In London, Griffin steals clothes and food out of necessity and escapes unseen', 'he is the same in both', 'the villagers saw an invisible man'],
                  hint: 'Review c10_engl_cbse_14_005 (Drapery Shop) to recall how Griffin stole money and clothes, and why.',
                  misconception: 'Students often believe Griffin is completely invisible during his stay in Iping, but he wears bandages, dark glasses, a hat, and clothes.' }
          ],
            remediations: { 'griffin-is-completely-invisible-during': { steps: ['Re-read the episode with a two-column chart: "What the villagers see/hear" vs "What Griffin actually does (invisible).".', 'Highlight every mention of bandages, clothes, or disguise — this proves he is masked.', 'Trace the burglary: the vicar and wife hear money taken but see no one; the stranger later produces cash.', 'Explain aloud: "Griffin is invisible, but he wears a costume so people see a man.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
