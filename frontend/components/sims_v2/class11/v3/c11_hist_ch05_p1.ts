import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hist_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hist_ch05_p1: SimDef = {
    id: 'v3_c11_hist_ch05_p1',
    title: 'Nomadic Empires · Part 1/2',
    subtitle: 'Meet the nomads who ran empires on a calendar of grass.',
    classLevel: 11, subject: 'history', topic: 'Nomadic Empires · Part 1/2',
    chapters: ['c11_hist_ch05'],
    nodeIds: ['c11_hist_cbse_05_001', 'c11_hist_cbse_05_002', 'c11_hist_cbse_05_003', 'c11_hist_cbse_05_004', 'c11_hist_cbse_05_005', 'c11_hist_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a steppe household planning the year\'s pastures', intro: 'Minus forty winters, no rivers, no trees — and from this the largest contiguous empire ever built. The ecology is the key.', goal: 'Explain pastoral nomadism as a mapped system and its structural dependence on settled trade.' },
    discovery: {
        question: '\'Nomad\' means wandering aimlessly across empty grassland — that\'s what made the Mongols mobile, right?',
        options: ['No — migration followed precise multi-generational maps of named pastures and water points, timed to the greening of specific grasses', 'Yes — nomads moved randomly with the weather', 'Yes — that\'s why they needed no maps', 'No — nomads never actually moved at all'],
        answer: 'No — migration followed precise multi-generational maps of named pastures and water points, timed to the greening of specific grasses',
        hook: 'And the steppe was never self-sufficient — it structurally lacked grain, metal and craft, which is why pre-Genghis graves already hold Chinese silk and Persian ceramics.',
    },
    teaching: [
        { title: 'The Mongol Steppe: Geography and the Nomadic Way of Life', text: 'The Mongol Steppe refers to the vast temperate grassland belt stretching across Central Asia from Manchuria to the Hungarian Plain, characterised by low and erratic rainfall (150–350 mm annually).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hist_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Balance a herd of \'five snouts\' for risk, then test whether the steppe economy was inherently raiding-driven or trade-connected all along.',
        labels: ['The Mongol Steppe: Geography', 'Mongol Society: Kinship, Clans', 'Temujin to Genghis Khan', 'The Mongol Army: Organisation,', 'The Yasa: Genghis Khan\'s', 'The Mongol Conquests: China,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_001', title: 'The Mongol Steppe: Geography and the Nomadic Way of Life',
          caseStudy: { intro: 'Imagine you are standing at the Gandan Monastery in Ulaanbaatar in January — the temperature is −30°C, the ground is frozen solid, and there is not a single.',
            decisions: [{ prompt: 'Identify the five domesticated animals (tavan hoshuu) that formed the core of the Mongol pastoral economy and state the primary product.', options: [
                { text: 'The five animals are: horse (transport, warfare, fermented mare\'s milk/airag), sheep', outcome: 'The five animals are: horse (transport, warfare, fermented mare\'s milk/airag), sheep (meat, wool.' },
                { text: '"cow" instead of "yak" for high altitudes, or omitting the horse', outcome: 'Not quite — Students often think "nomad" means "wandering aimlessly" — a random, unstructured movement across.', reveals: 'nomad-means-wandering-aimlessly-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_002', title: 'Mongol Society: Kinship, Clans and Pastoral Economy',
          caseStudy: { intro: 'Imagine you are visiting a Gurjar pastoral community in the Himalayan foothills during their seasonal migration — you notice families moving together, animals.',
            decisions: [{ prompt: 'What are the \'five snouts\' (tabun qosighu mal) in the Mongol pastoral economy, and why is the horse considered the most strategically.', options: [
                { text: 'The five snouts are horses, sheep, goats, cattle (including yaks), and camels', outcome: 'The five snouts are horses, sheep, goats, cattle (including yaks), and camels.' },
                { text: 'cows as primary or omitting horses', outcome: 'Not quite — Students often think Mongol society was \'egalitarian\' because it lacked cities and writing.', reveals: 'mongol-society-was-egalitarian-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_003', title: 'Temujin to Genghis Khan: Unification of the Mongol Tribes',
          caseStudy: { intro: 'Imagine you\'re standing at the Iron Age site of Rakhigarhi in Haryana, looking at excavated seals showing a unified script across hundreds.',
            decisions: [{ prompt: 'In what year was Temujin formally proclaimed Genghis Khan at the quriltai, and what does the title "Genghis Khan" literally mean?', options: [
                { text: '1206; "Universal Ruler" or "Oceanic Ruler" (from Mongolian *chinggis* = ocean/universal,', outcome: '1206; "Universal Ruler" or "Oceanic Ruler" (from Mongolian *chinggis* = ocean/universal, *khan*.' },
                { text: 'Great Khan', outcome: 'Not quite — Students believe Temujin unified the Mongols solely through brute force and that "Mongol unity".', reveals: 'temujin-unified-the-mongols-solely' },
                { text: 'Mongol unity', outcome: 'Not quite — Students believe Temujin unified the Mongols solely through brute force and that "Mongol unity".', reveals: 'temujin-unified-the-mongols-solely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_004', title: 'The Mongol Army: Organisation, Tactics and Mobility',
          caseStudy: { intro: 'Imagine you are visiting the Qutb Minar complex in Delhi and notice the Iron Pillar standing since the Gupta period.',
            decisions: [{ prompt: 'What was the basic building block of the Mongol decimal military organisation, and how many soldiers did it comprise?', options: [
                { text: 'The basic building block was the *arban*, comprising 10 soldiers', outcome: 'The basic building block was the *arban*, comprising 10 soldiers.' },
                { text: '100 soldiers', outcome: 'Not quite — Students often think the Mongol army was an undisciplined "horde" that won by sheer numbers and.', reveals: 'the-mongol-army-was-an' },
                { text: 'a tribe', outcome: 'Not quite — Students often think the Mongol army was an undisciplined "horde" that won by sheer numbers and.', reveals: 'the-mongol-army-was-an' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_006', title: 'The Mongol Conquests: China, Central Asia and the Khwarazmian Empire',
          caseStudy: { intro: 'Imagine you are standing at the Qutub Minar in Delhi, built by the Mamluk sultans who themselves fled Central Asia ahead of the Mongol storm.',
            decisions: [{ prompt: 'Name the three major sedentary powers conquered by Genghis Khan between 1206 and 1227, and state the year each campaign began.', options: [
                { text: 'Western Xia (1209), Jin Dynasty (1211), Khwarazmian Empire (1219)', outcome: 'Western Xia (1209), Jin Dynasty (1211), Khwarazmian Empire (1219).' },
                { text: 'terror tactics', outcome: 'Not quite — Students often believe the Mongols used identical "terror tactics" everywhere—massacre everyone.', reveals: 'the-mongols-used-identical-terror' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_001', title: 'A real-world call',
          caseStudy: { intro: 'Nomadic peoples built mobile civilizations across the steppe — and their raiding destroyed settled communities. History remembers them as both empire-builders and destroyers.',
            decisions: [{ prompt: 'How should we judge peoples whose survival depended on others\' loss?', options: [
                { text: 'Judge by their time — survival had different rules', outcome: 'The historical-context answer; honest about the era, but it risks excusing what the people being raided experienced as pure catastrophe.' },
                { text: 'Judge by the harm — context doesn\'t erase victims', outcome: 'The victim-centred answer; but applied alone it flattens history into a ledger of blame.' },
                { text: 'Hold both — understand without absolving', outcome: 'The historian\'s actual craft — explain why it happened AND name what it cost; the two jobs don\'t cancel.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A documentary script calls the pre-imperial Mongols \'aimless wanderers drifting across empty grassland — an egalitarian society of equals with no hierarchy, since they had no cities or kings.\'',
            decisions: [{ prompt: 'What does steppe life actually look like?', options: [
                { text: 'Rewrite both claims: nomadism was a precise system — multi-generational maps of named pastures, water points and timed migration routes, managing common grazing across thousands of households without a bureaucracy. And it was hierarchical: hereditary nobility (noyat), commoners (qara), slaves (bo\'ol) — but personal and contingent through loyalty bonds, not institutional like caste — exactly the rivalries Genghis Khan exploited.', outcome: 'The script gains the real story: ecological constraint produced a portable, kin-based, militarised society — organisation without cities, hierarchy without a state.' },
                { text: 'Keep \'aimless wanderers\' — nomad by definition means no fixed pattern.', outcome: 'Nomadic means patterned mobility, not randomness: seasonal transhumance followed pasture phenology — the steppe required precision, not drift.', reveals: 'nomad-means-aimless' },
                { text: 'Keep \'egalitarian\' — no cities or written law means no classes.', outcome: 'Absence of a state isn\'t absence of hierarchy: steep hereditary nobility, commoners and slaves existed — the ties were personal and shiftable, not flat.', reveals: 'nomads-were-egalitarian' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hist_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'The largest land empire in history grew out of an ecology that couldn\'t feed itself — the mobility was a system, not a wandering.',
            decisions: [{ prompt: 'What comes next? Nomadic Empires · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Nomadic Empires · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_001', difficulty: 'standard',
          question: 'The Mongol Steppe refers to the vast temperate grassland belt stretching across.',
          hint: 'If stuck, revisit Class 9 Geography Chapter 2 "Physical Features of India" (adapted for.',
          misconception: 'Students often think "nomad" means "wandering aimlessly" — a random, unstructured movement across empty grassland.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Mongol Steppe refers to the vast temperate grassland belt stretching across Central',
                  options: ['The Mongol Steppe refers to the vast temperate grassland belt stretching across Central', 'Mongol society in the 12th–13th centuries was organised around patrilineal kinship groups', 'The process by which Temujin (c', 'The Mongol Army (1206–1368 CE) was a highly disciplined, decimal-based military force'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 2 "Physical Features of India" (adapted for Central.',
                  misconception: 'Students often think "nomad" means "wandering aimlessly" — a random, unstructured movement across empty grassland.' }
          ],
            remediations: { 'nomad-means-wandering-aimlessly-a': { steps: ['Show the student a satellite image of Mongolia in March (snow-covered) vs.', 'July (green) and ask them to identify where a herd of 1,000 sheep would find forage in each — they will see the.', 'Give them a translated excerpt from the *Secret History of the Mongols* (Section 162) describing a clan dispute over.', 'Assign a 300-word comparison: "How did the *fixed-field* agriculture of the Mauryan empire (Class 6) produce.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "nomad" means "wandering aimlessly" — a random, unstructured movement across empty grassland.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Mongol nomadic economy was self-sufficient and isolated from settled civilisations until Genghis Khan\'s conquests forced contact." Use.', answer: 'The claim is false',
                  options: ['The claim is false', 'isolated nomad'],
                  hint: 'If stuck, revisit Class 9 Geography Chapter 2 "Physical Features of India" (adapted for Central.',
                  misconception: 'Students often think "nomad" means "wandering aimlessly" — a random, unstructured movement across empty grassland.' }
          ],
            remediations: { 'nomad-means-wandering-aimlessly-a': { steps: ['Show the student a satellite image of Mongolia in March (snow-covered) vs.', 'July (green) and ask them to identify where a herd of 1,000 sheep would find forage in each — they will see the.', 'Give them a translated excerpt from the *Secret History of the Mongols* (Section 162) describing a clan dispute over.', 'Assign a 300-word comparison: "How did the *fixed-field* agriculture of the Mauryan empire (Class 6) produce.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_002', difficulty: 'standard',
          question: 'Mongol society in the 12th–13th centuries was organised around patrilineal.',
          hint: 'Revisit c11_hist_cbse_05_001 — specifically the map of ecological zones (forest-steppe.',
          misconception: 'Students often think Mongol society was \'egalitarian\' because it lacked cities and writing, confusing the absence.',
          parts: [
                { id: 'a', prompt: 'What are the \'five snouts\' (tabun qosighu mal) in the Mongol pastoral economy, and why is the horse considered the most strategically significant among them?', answer: 'The five snouts are horses, sheep, goats, cattle (including yaks), and camels',
                  options: ['The five snouts are horses, sheep, goats, cattle (including yaks), and camels', 'cows as primary or omitting horses'],
                  hint: 'Revisit c11_hist_cbse_05_001 — specifically the map of ecological zones (forest-steppe, steppe.',
                  misconception: 'Students often think Mongol society was \'egalitarian\' because it lacked cities and writing, confusing the absence of *state* bureaucracy.' }
          ],
            remediations: { 'mongol-society-was-egalitarian-because': { steps: ['If the student holds the egalitarian misconception: (1) Have them read the *Secret History of the Mongols* excerpt.', '(2) Compare with the Gurjar/Bakarwal pastoralists of Jammu & Kashmir: ask a local elder if all families have equal say.', '(3) Create a two-column table: \'Mongol hierarchy markers\' (hereditary titles, tribute from qara, slave ownership).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_003', difficulty: 'standard',
          question: 'The process by which Temujin (c. 1162–1227), born into a minor Mongol clan.',
          hint: 'Revisit c11_hist_cbse_05_002\'s explanation of *anda* (sworn brotherhood) and *naukar*.',
          misconception: 'Students believe Temujin unified the Mongols solely through brute force and that "Mongol unity" existed before 1206.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The process by which Temujin (c',
                  options: ['The process by which Temujin (c', 'The Mongol Steppe refers to the vast temperate grassland belt stretching across Central', 'Mongol society in the 12th–13th centuries was organised around patrilineal kinship groups', 'The Mongol Army (1206–1368 CE) was a highly disciplined, decimal-based military force'],
                  hint: 'Revisit c11_hist_cbse_05_002\'s explanation of *anda* (sworn brotherhood) and *naukar* (companion).',
                  misconception: 'Students believe Temujin unified the Mongols solely through brute force and that "Mongol unity" existed before 1206.' }
          ],
            remediations: { 'temujin-unified-the-mongols-solely': { steps: ['Re-read the "Baljuna Covenant" episode (Secret History §§ 240–245) to see how oath-bound loyalty replaced kinship.', 'Compare the pre-1206 tribal map (clans as political units) with the post-1206 decimal map (mingghans as administrative.', 'List the 1206 quriltai\'s five key decrees (decimal system, keshig, Yasa, booty sharing, religious tolerance) and.', 'Write a 100-word paragraph: "How did Temujin make \'Mongol\' a political identity rather than an ethnic one?"'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_004', difficulty: 'standard',
          question: 'The Mongol Army (1206–1368 CE) was a highly disciplined, decimal-based military.',
          hint: 'If stuck, revisit the "nerge hunt" description in node 001 and the "khan election vs.',
          misconception: 'Students often think the Mongol army was an undisciplined "horde" that won by sheer numbers and brutality.',
          parts: [
                { id: 'a', prompt: 'What was the basic building block of the Mongol decimal military organisation, and how many soldiers did it comprise?', answer: 'The basic building block was the *arban*, comprising 10 soldiers',
                  options: ['The basic building block was the *arban*, comprising 10 soldiers', '100 soldiers', 'a tribe'],
                  hint: 'If stuck, revisit the "nerge hunt" description in node 001 and the "khan election vs.',
                  misconception: 'Students often think the Mongol army was an undisciplined "horde" that won by sheer numbers and brutality.' }
          ],
            remediations: { 'the-mongol-army-was-an': { steps: ['If the student holds the "undisciplined horde" misconception, have them: (1) map the decimal structure (arban → tumen).', 'This contrast reveals the Mongol army\'s institutional coherence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_005', difficulty: 'standard',
          question: 'The Yasa (also spelled Yassa) was the comprehensive code of laws promulgated.',
          hint: 'Revisit the "Kinship, Clans and Pastoral Economy" node (c11_hist_cbse_05_002) and the.',
          misconception: 'Students often believe the Yasa was a single written document like a modern constitution, surviving in archives.',
          parts: [
                { id: 'a', prompt: 'A Persian chronicler writes: "The Yasa commanded that no woman be taken as a wife without her consent, yet also permitted a man to marry his stepmother after.', answer: 'The first rule protected women\'s agency in marriage alliances between clans',
                  options: ['The first rule protected women\'s agency in marriage alliances between clans', 'hypocrisy'],
                  hint: 'Revisit the "Kinship, Clans and Pastoral Economy" node (c11_hist_cbse_05_002) and the "Temujin.',
                  misconception: 'Students often believe the Yasa was a single written document like a modern constitution, surviving in archives.' }
          ],
            remediations: { 'the-yasa-was-a-single': { steps: ['Read the *Secret History of the Mongols* (sections 202-204) to see how laws are embedded in narrative, not codified.', 'Compare with Ashoka\'s edicts (Class 6, node c6_history_ch05_009) — inscribed on stone, fixed, public.', 'List three ways the *absence of a fixed text* helped the Yasa adapt (e.g., flexible interpretation by jarquchis.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_05_006', difficulty: 'standard',
          question: 'The Mongol Conquests (1206–1227) refer to the rapid military expansion.',
          hint: 'Review the "Siege Corps" subsection in c11_hist_cbse_05_004 and the "Yasa on Surrender".',
          misconception: 'Students often believe the Mongols used identical "terror tactics" everywhere—massacre everyone, burn everything.',
          parts: [
                { id: 'a', prompt: 'Name the three major sedentary powers conquered by Genghis Khan between 1206 and 1227, and state the year each campaign began.', answer: 'Western Xia (1209), Jin Dynasty (1211), Khwarazmian Empire (1219)',
                  options: ['Western Xia (1209), Jin Dynasty (1211), Khwarazmian Empire (1219)', 'terror tactics'],
                  hint: 'Review the "Siege Corps" subsection in c11_hist_cbse_05_004 and the "Yasa on Surrender" section.',
                  misconception: 'Students often believe the Mongols used identical "terror tactics" everywhere—massacre everyone, burn everything.' }
          ],
            remediations: { 'the-mongols-used-identical-terror': { steps: ['Re-read the "Mongol Army" node (c11_hist_cbse_05_004) focusing on the distinction between field army (tumen) and siege.', 'On a map, trace the 1219 Khwarazm campaign route and mark which cities were massacred (Nishapur, Merv, Urgench) vs.', 'Compare the Yasa provisions on surrender (c11_hist_cbse_05_005) with the actual treatment of Zhongdu (1215) vs.', 'Write a 100-word note: "Mongol violence was selective, not random—explain using these three cases."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
