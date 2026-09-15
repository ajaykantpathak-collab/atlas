import type { SimDef } from '../../engine/types';

/** v3 generated — c9_engl_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_engl_ch03_p1: SimDef = {
    id: 'v3_c9_engl_ch03_p1',
    title: 'Winds of Change · Part 1/2',
    subtitle: 'A fan\'s two-thousand-year glow-up',
    classLevel: 9, subject: 'engl', topic: 'Winds of Change · Part 1/2',
    chapters: ['c9_engl_ch03'],
    nodeIds: ['c9_engl_ch3_1', 'c9_engl_ch3_10', 'c9_engl_ch3_2', 'c9_engl_ch3_3', 'c9_engl_ch3_4', 'c9_engl_ch3_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a historian of everyday objects', intro: 'The humble hand fan went from a leaf to a jewelled royal emblem to a servant-pulled ceiling machine. Your job: squeeze that entire evolution into a paragraph without breaking its timeline.', goal: 'Summarise an expository \'evolution\' text by preserving chronological stages and causal links — selecting major transitions and dropping decorative details.' },
    discovery: {
        question: 'Someone \'summarises\' the pankha\'s history as: leaf fans, bamboo fans, cloth fans, electric fans — all stages, no order, no links. What\'s wrong with it?',
        options: ['Evolution is a chain, not a list — each stage caused the next, so a summary must keep the timeline and the \'as X improved, Y replaced it\' links', 'Nothing — all four stages are named', 'It should start with electric fans', 'It needs more decoration details'],
        answer: 'Evolution is a chain, not a list — each stage caused the next, so a summary must keep the timeline and the \'as X improved, Y replaced it\' links',
        hook: 'In an evolutionary text, order IS the meaning. The Mughal jewelled pankha only exists because medieval weavers and Sultanate painters came first — scramble the sequence and you\'ve deleted the logic, not summarised it.',
    },
    teaching: [
        { title: 'Text Summary: Evolution of the Pankha (Hand Fan)', text: 'A text summary of an expository passage like "Evolution of the Pankha" is a concise, objective restatement of the text\'s central ideas — specifically the chronological development, key materials, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_engl_ch3_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Trace the pankha\'s full journey — palmyra leaf to woven bamboo to painted cloth to rope-pulled colonial punkah to electric fan — and compress it into 100 words where every stage arrives because the last one allowed it.',
        labels: ['Text Summary: Evolution', 'Values: Preserving Indigenous Crafts', 'Cultural Heritage: Pankhas as', 'Regional Variations: Pankhas', 'Historical Significance: Pankhas', 'Theme: Traditional Crafts'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_engl_ch3_1', title: 'Text Summary: Evolution of the Pankha (Hand Fan)',
          caseStudy: { intro: 'Imagine you are explaining the history of the pankha to a friend who has never seen one — you would not describe every leaf pattern, but you would tell the.',
            decisions: [{ prompt: 'What is the primary purpose of a summary for an expository text like "Evolution of the Pankha"?', options: [
                { text: 'The primary purpose is to convey the text\'s main ideas', outcome: 'The primary purpose is to convey the text\'s main ideas — the chronological stages of the pankha\'s.' },
                { text: 'to describe the beauty of pankhas', outcome: 'Not quite — Students believe a summary of an evolutionary text is just a list of stages in any order, often.', reveals: 'a-summary-of-an-evolutionary' },
                { text: 'to give my opinion on fans', outcome: 'Not quite — Students believe a summary of an evolutionary text is just a list of stages in any order, often.', reveals: 'a-summary-of-an-evolutionary' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch3_10', title: 'Values: Preserving Indigenous Crafts and Heritage',
          caseStudy: { intro: 'Imagine walking through a craft market in Jodhpur. You see handcrafted pankhas made of bamboo, palm leaf, and silk — each one unique, made by a craftsperson.',
            decisions: [{ prompt: 'State three reasons why preserving indigenous crafts like pankha making is important.', options: [
                { text: 'Three reasons: (1) Cultural identity', outcome: 'Three reasons: (1) Cultural identity — crafts carry the design aesthetics, stories, and traditions.' },
                { text: 'because old things are nice', outcome: 'Not quite — Students think preserving indigenous crafts is about nostalgia or sentimentality — keeping old.', reveals: 'preserving-indigenous-crafts-is-about' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch3_2', title: 'Cultural Heritage: Pankhas as Traditional Craft Items',
          caseStudy: { intro: 'Imagine you are at a summer wedding in Rajasthan and notice the bride being fanned with an ornate silver-handled pankha while a simpler bamboo one cools the.',
            decisions: [{ prompt: 'What is the primary cultural distinction between a pankha used in a royal court and a pankha used in a village home, beyond their.', options: [
                { text: 'The royal court pankha signifies authority, status, and ceremonial role, often made with', outcome: 'The royal court pankha signifies authority, status, and ceremonial role, often made with precious.' },
                { text: 'rich vs poor materials', outcome: 'Not quite — Students often think "cultural heritage" means only old, beautiful objects kept in museums.', reveals: 'cultural-heritage-means-only-old' },
                { text: 'cultural heritage', outcome: 'Not quite — Students often think "cultural heritage" means only old, beautiful objects kept in museums.', reveals: 'cultural-heritage-means-only-old' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch3_3', title: 'Regional Variations: Pankhas of Rajasthan and Gujarat',
          caseStudy: { intro: 'Imagine you are at a craft exhibition in Delhi where two artisans—one from Jaisalmer, one from Bhuj—are selling hand fans.',
            decisions: [{ prompt: 'What are the two primary regions discussed in the "Regional Variations" section of the chapter, and what is the generic name for the hand.', options: [
                { text: 'The two regions are Rajasthan and Gujarat', outcome: 'The two regions are Rajasthan and Gujarat; the generic name is "pankha." A wrong answer (e.g.' },
                { text: 'pankha', outcome: 'Not quite — Students often believe regional craft variations are mainly about "different decorations".', reveals: 'regional-craft-variations-are-mainly' },
                { text: 'different decorations', outcome: 'Not quite — Students often believe regional craft variations are mainly about "different decorations".', reveals: 'regional-craft-variations-are-mainly' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch3_4', title: 'Historical Significance: Pankhas in Ajanta Paintings and Temples',
          caseStudy: { intro: 'Imagine you are standing before the famous Bodhisattva Padmapani painting in Ajanta Cave 1.',
            decisions: [{ prompt: 'What is the primary historical value of identifying a pankha in an Ajanta painting or temple sculpture?', options: [
                { text: 'The primary historical value is that visual depictions serve as primary source evidence', outcome: 'The primary historical value is that visual depictions serve as primary source evidence for the.' },
                { text: 'they show artistic skill', outcome: 'Not quite — Students often assume that because pankhas appear in religious art (Ajana, temples), they were.', reveals: 'because-pankhas-appear-in-religious' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch3_5', title: 'Theme: Traditional Crafts and Modern Adaptation',
          caseStudy: { intro: 'Imagine you see a traditional bamboo pankha sold in a high-end Delhi boutique as a "handcrafted wall art piece" for ₹3,000.',
            decisions: [{ prompt: 'What is the core difference between "modernisation" and "modern adaptation" of a traditional craft as implied in the chapter?', options: [
                { text: 'Modernisation often implies replacing traditional methods entirely with industrial ones,', outcome: 'Modernisation often implies replacing traditional methods entirely with industrial ones, losing the.' },
                { text: 'both mean using machines', outcome: 'Not quite — Students think "modern adaptation" means making the craft look modern (e.g., adding neon colours).', reveals: 'modern-adaptation-means-making-the' },
                { text: 'modern adaptation', outcome: 'Not quite — Students think "modern adaptation" means making the craft look modern (e.g., adding neon colours).', reveals: 'modern-adaptation-means-making-the' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch3_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Summarising \'Evolution of the Pankha,\' a student writes: \'There were leaf fans, bamboo fans, cloth fans and electric fans.\' For order, he puts the Mughal jewelled pankha before the medieval woven one \'because it sounds more impressive.\'',
            decisions: [{ prompt: 'What two things does this summary get wrong?', options: [
                { text: 'It lists stages with no development — \'as weaving improved, bamboo replaced leaves; later courts turned the fan ceremonial\' shows how each stage produced the next — and it scrambles the timeline, which in an evolutionary text destroys the logic itself.', outcome: 'This fixes both faults: causal connectors between stages and strict chronology are what make it an evolution, not a catalogue.' },
                { text: 'Only the wording is weak — any order is fine as long as every stage gets mentioned.', outcome: 'In a text about change over time, order is the argument; a jumbled \'evolution\' proves nothing evolved.', reveals: 'order-is-optional' },
                { text: 'The summary needs more detail, not less — adding the colours and patterns of each fan would fix it.', outcome: 'Detail without sequence or causation makes the warehouse bigger, not the summary better; selection and timeline are the skills being tested.', reveals: 'more-detail-better' }
            ] }] } },
        { type: 'case', nodeId: 'c9_engl_ch3_5', title: 'The bigger picture',
          caseStudy: { intro: 'Summarising \'how X evolved\' means keeping the cause-and-effect spine: each stage is an answer to the last stage\'s limits. Lose the chronology and you\'ve lost the story.',
            decisions: [{ prompt: 'What comes next? Winds of Change · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Winds of Change · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_engl_ch3_1', difficulty: 'standard',
          question: 'A text summary of an expository passage like "Evolution of the Pankha" is.',
          hint: 'Review c8_engl_ch4_10 (tracing seed-to-tree sequence) and practice paragraph-level main.',
          misconception: 'Students believe a summary of an evolutionary text is just a list of stages in any order, often writing: "There were.',
          parts: [
                { id: 'a', prompt: 'What is the primary purpose of a summary for an expository text like "Evolution of the Pankha"?', answer: 'The primary purpose is to convey the text\'s main ideas',
                  options: ['The primary purpose is to convey the text\'s main ideas', 'to describe the beauty of pankhas', 'to give my opinion on fans', 'There were leaf fans, bamboo fans, cloth fans, and electric fans'],
                  hint: 'Review c8_engl_ch4_10 (tracing seed-to-tree sequence) and practice paragraph-level main idea.',
                  misconception: 'Students believe a summary of an evolutionary text is just a list of stages in any order, often writing: "There were leaf fans, bamboo.' }
          ],
            remediations: { 'a-summary-of-an-evolutionary': { steps: ['Give the student a 5-sentence evolutionary text (e.g., about the bicycle).', 'Ask them to number the stages 1-5.', 'Have them write one sentence per stage using "led to," "enabled," or "replaced." 4.', 'Then combine into a paragraph, deleting redundant words.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe a summary of an evolutionary text is just a list of stages in any order, often writing: "There were.',
          parts: [
                { id: 'a', prompt: 'Two summaries are written: Summary A uses "first, next, finally" but includes a detail about the color of a specific Mughal pankha.', answer: 'Summary B is better',
                  options: ['Summary B is better', 'There were leaf fans, bamboo fans, cloth fans, and electric fans', 'as weaving techniques improved, bamboo replaced leaves'],
                  hint: 'Review c8_engl_ch4_10 (tracing seed-to-tree sequence) and practice paragraph-level main idea.',
                  misconception: 'Students believe a summary of an evolutionary text is just a list of stages in any order, often writing: "There were leaf fans, bamboo.' }
          ],
            remediations: { 'a-summary-of-an-evolutionary': { steps: ['Give the student a 5-sentence evolutionary text (e.g., about the bicycle).', 'Ask them to number the stages 1-5.', 'Have them write one sentence per stage using "led to," "enabled," or "replaced." 4.', 'Then combine into a paragraph, deleting redundant words.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch3_10', difficulty: 'standard',
          question: 'Values of preserving indigenous crafts and heritage refer to the ethical.',
          hint: 'Revisit c9_engl_ch3_1 (Text Summary: Evolution of the Pankha) to understand the.',
          misconception: 'Students think preserving indigenous crafts is about nostalgia or sentimentality — keeping old things because they are.',
          parts: [
                { id: 'a', prompt: 'State three reasons why preserving indigenous crafts like pankha making is important.', answer: 'Three reasons: (1) Cultural identity',
                  options: ['Three reasons: (1) Cultural identity', 'because old things are nice'],
                  hint: 'Revisit c9_engl_ch3_1 (Text Summary: Evolution of the Pankha) to understand the historical context.',
                  misconception: 'Students think preserving indigenous crafts is about nostalgia or sentimentality — keeping old things because they are old.' }
          ],
            remediations: { 'preserving-indigenous-crafts-is-about': { steps: ['Show the student two objects: a handmade bamboo pankha and a plastic fan.', 'Ask them to list: materials, maker, time to make, environmental impact, cultural significance.', 'Discuss: what is lost when the bamboo pankha is no longer made?', 'Have them interview a local craftsperson (or read an interview) about their craft\'s challenges.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch3_2', difficulty: 'standard',
          question: 'Pankhas (hand fans) are traditional Indian craft items that embody cultural.',
          hint: 'Review "Symbolism of the Cherry Tree as Growth and Resilience" (c8_engl_ch4_8) —.',
          misconception: 'Students often think "cultural heritage" means only old, beautiful objects kept in museums.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Pankhas (hand fans) are traditional Indian craft items that embody cultural heritage',
                  options: ['Pankhas (hand fans) are traditional Indian craft items that embody cultural heritage', 'A text summary of an expository passage like "Evolution of the Pankha" is a concise,', 'Values of preserving indigenous crafts and heritage refer to the ethical, cultural, and', 'Regional variations in pankhas refer to the distinct differences in design, materials,'],
                  hint: 'Review "Symbolism of the Cherry Tree as Growth and Resilience" (c8_engl_ch4_8) — it teaches exactly.',
                  misconception: 'Students often think "cultural heritage" means only old, beautiful objects kept in museums.' }
          ],
            remediations: { 'cultural-heritage-means-only-old': { steps: ['Show the student two photos — a museum-displayed jeweled pankha and a plain bamboo pankha in use at a village temple.', 'Ask "Which one is heritage?" and let them answer.', 'Reveal both are, then ask "What makes the bamboo one heritage if it\'s not old or valuable?"', 'Guide them to identify the maker, the ritual, the community, and the transmission of skill as the heritage — not the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch3_3', difficulty: 'standard',
          question: 'Regional variations in pankhas refer to the distinct differences in design.',
          hint: 'Review the "Cultural Heritage" node (c9_engl_ch3_2) focusing on the "craft as adaptation".',
          misconception: 'Students often believe regional craft variations are mainly about "different decorations" or "artists having different.',
          parts: [
                { id: 'a', prompt: 'What are the two primary regions discussed in the "Regional Variations" section of the chapter, and what is the generic name for the hand fan in the text?', answer: 'The two regions are Rajasthan and Gujarat',
                  options: ['The two regions are Rajasthan and Gujarat', 'pankha', 'different decorations', 'artists having different styles'],
                  hint: 'Review the "Cultural Heritage" node (c9_engl_ch3_2) focusing on the "craft as adaptation" paragraph.',
                  misconception: 'Students often believe regional craft variations are mainly about "different decorations" or "artists having different styles." They miss.' },
                { id: 'b', prompt: 'The text states: "The leheriya wave pattern on a Rajasthani pankha is not merely decorative." Apply the concept of \'form follows function\' to explain what.', answer: 'Step 1: Recall leheriya is a resist-dye technique creating wave patterns',
                  options: ['Step 1: Recall leheriya is a resist-dye technique creating wave patterns', 'different decorations', 'artists having different styles'],
                  hint: 'Review the "Cultural Heritage" node (c9_engl_ch3_2) focusing on the "craft as adaptation" paragraph.',
                  misconception: 'Students often believe regional craft variations are mainly about "different decorations" or "artists having different styles." They miss.' },
                { id: 'c', prompt: 'Compare the decorative motifs of Rajasthani pankhas (geometric, leheriya) and Gujarati pankhas (mirror work/abhla, floral).', answer: 'Rajasthani geometric/leheriya motifs reflect a martial, nomadic heritage valuing',
                  options: ['Rajasthani geometric/leheriya motifs reflect a martial, nomadic heritage valuing', 'Rajasthan likes geometry, Gujarat likes mirrors', 'different decorations', 'artists having different styles'],
                  hint: 'Review the "Cultural Heritage" node (c9_engl_ch3_2) focusing on the "craft as adaptation" paragraph.',
                  misconception: 'Students often believe regional craft variations are mainly about "different decorations" or "artists having different styles." They miss.' }
          ],
            remediations: { 'regional-craft-variations-are-mainly': { steps: ['Re-read the "Regional Variations" subsection with a highlighter, marking every phrase describing *function* (e.g.', 'Draw a two-column cause-effect chart: left column = environmental/cultural cause (e.g., "desert sandstorms"), right.', 'Verbally explain one pair to a peer: "Because Rajasthan has sandstorms, the leheriya pattern hides dust." 4.', 'Rewrite the Venn diagram (Diagnostic Q6) using only these cause-effect pairs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch3_4', difficulty: 'standard',
          question: 'Historical significance refers to the value of pankhas (hand fans) depicted.',
          hint: 'If stuck, review c9_engl_ch3_1 (pankha typology) and c9_history_ajanta_caves (site.',
          misconception: 'Students often assume that because pankhas appear in religious art (Ajana, temples), they were exclusively ritual.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Historical significance refers to the value of pankhas (hand fans) depicted in Ajanta',
                  options: ['Historical significance refers to the value of pankhas (hand fans) depicted in Ajanta', 'A text summary of an expository passage like "Evolution of the Pankha" is a concise,', 'Values of preserving indigenous crafts and heritage refer to the ethical, cultural, and', 'Pankhas (hand fans) are traditional Indian craft items that embody cultural heritage'],
                  hint: 'If stuck, review c9_engl_ch3_1 (pankha typology) and c9_history_ajanta_caves (site chronology and.',
                  misconception: 'Students often assume that because pankhas appear in religious art (Ajana, temples), they were exclusively ritual or elite objects.' }
          ],
            remediations: { 'because-pankhas-appear-in-religious': { steps: ['Show the student two side-by-side images: a ritual chauri in a deity\'s hand (short, whisk) vs.', 'a narrative pankha in a king\'s court (long, solid blade).', 'Ask: "Which one would you use to cool yourself on a hot day?', 'Guide them to articulate the functional difference through handle length and blade rigidity.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_engl_ch3_5', difficulty: 'standard',
          question: 'The theme "Traditional Crafts and Modern Adaptation" refers to the central idea.',
          hint: 'Review c9_engl_ch3_1 (Summary) and practice converting three summary points into one.',
          misconception: 'Students think "modern adaptation" means making the craft look modern (e.g., adding neon colours) or using machines.',
          parts: [
                { id: 'a', prompt: 'Apply the concept: A craft NGO wants to revive a dying weaving tradition by making laptop sleeves instead of traditional sarees.', answer: 'Adaptations: 1) Use lighter, water-resistant yarn blends for modern utility',
                  options: ['Adaptations: 1) Use lighter, water-resistant yarn blends for modern utility', 'use power looms for speed', 'modern adaptation', '"modern adaptation" means making the craft look modern (e'],
                  hint: 'Review c9_engl_ch3_1 (Summary) and practice converting three summary points into one thematic.',
                  misconception: 'Students think "modern adaptation" means making the craft look modern (e.g., adding neon colours) or using machines to produce it faster.' },
                { id: 'b', prompt: 'Analyse the tension in this chapter statement: "Artisans now use synthetic dyes because natural dyes are expensive and time-consuming." Does this weaken.', answer: 'It strengthens authenticity pragmatically: 1) The chapter frames adaptation as',
                  options: ['It strengthens authenticity pragmatically: 1) The chapter frames adaptation as', 'it weakens authenticity', 'modern adaptation', '"modern adaptation" means making the craft look modern (e'],
                  hint: 'Review c9_engl_ch3_1 (Summary) and practice converting three summary points into one thematic.',
                  misconception: 'Students think "modern adaptation" means making the craft look modern (e.g., adding neon colours) or using machines to produce it faster.' }
          ],
            remediations: { 'modern-adaptation-means-making-the': { steps: ['Re-read the section "Changing Times, Changing Pankhas" with a highlighter: mark every verb showing artisan agency.', 'Create a two-column table: Column A = "Changed" (material, size, buyer), Column B = "Unchanged" (hand-weaving, motif.', 'Discuss: "If a machine makes it, which column disappears?" This makes the agency distinction concrete.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
