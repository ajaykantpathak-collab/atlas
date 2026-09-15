import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hist_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hist_ch02_p1: SimDef = {
    id: 'v3_c9_hist_ch02_p1',
    title: 'Early Humans and the First Civilisations · Part 1/2',
    subtitle: 'The 99% of history before farms existed',
    classLevel: 9, subject: 'history', topic: 'Early Humans and the First Civilisations · Part 1/2',
    chapters: ['c9_hist_ch02'],
    nodeIds: ['c9_hist_ch2_1', 'c9_hist_ch2_10', 'c9_hist_ch2_11', 'c9_hist_ch2_2', 'c9_hist_ch2_3', 'c9_hist_ch2_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a palaeo-detective at Bhimbetka', intro: 'Thirty-thousand-year-old paintings on a Madhya Pradesh rock wall: people hunting, dancing, cooperating. Reconstruct how they lived — and why it wasn\'t the miserable struggle you imagined.', goal: 'Understand early human evolution and hunter-gatherer life — Out of Africa origins, fire and tools, egalitarian bands — and how sedentary agriculture reshaped society.' },
    discovery: {
        question: 'We picture hunter-gatherers as starving, desperate survivors — yet the !Kung San spent only 15-20 hours a week getting food and ate 75+ plant species. Was pre-farming life actually the harder one?',
        options: ['No — diverse diets, short work weeks and shared food made foragers healthier than early farmers, who got harder labour and worse nutrition', 'Yes — farming obviously improved everything', 'The !Kung San were just lucky', 'Hunter-gatherers were actually rich'],
        answer: 'No — diverse diets, short work weeks and shared food made foragers healthier than early farmers, who got harder labour and worse nutrition',
        hook: 'Evolution wasn\'t a straight escalator: Homo sapiens, Neanderthals, Denisovans and Homo floresiensis overlapped and even interbred — most non-Africans still carry 1–4% Neanderthal DNA. And DNA proves nearly everyone\'s roots trace back to Africa ~300,000 years ago.',
    },
    teaching: [
        { title: 'Early Humans: Origins and Hunter-Gatherer Life', text: 'Early Humans: Origins and Hunter-Gatherer Life refers to the period from approximately 2.5 million years ago to 10,000 BCE when hominins (including *Homo habilis*, *Homo erectus*, and *Homo sapiens*).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hist_ch2_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Walk 2.5 million years in fast-forward: Homo habilis\' first tools, fire cooking supper and expanding brains, the Out-of-Africa trek, and the Bhimbetka cave artists — then explain how sitting still (farming) accidentally invented property and hierarchy.',
        labels: ['Early Humans: Origins', 'Egyptian Civilisation: Pyramids', 'Early Chinese Civilisation: Writing', 'Archaeology: Methods of Studying', 'Palaeolithic Period: Tools', 'Mesolithic Period: Transition'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_hist_ch2_1', title: 'Early Humans: Origins and Hunter-Gatherer Life',
          caseStudy: { intro: 'Imagine you\'re standing at the Bhimbetka rock shelters in Madhya Pradesh, looking at paintings made 30,000 years ago showing people hunting deer and dancing.',
            decisions: [{ prompt: 'What is the approximate time range for the emergence of *Homo sapiens* in Africa according to current archaeological and genetic evidence?', options: [
                { text: '*Homo sapiens* emerged in Africa approximately 300,000 years ago, based on fossils from', outcome: '*Homo sapiens* emerged in Africa approximately 300,000 years ago, based on fossils from Jebel.' },
                { text: '2 million years ago', outcome: 'Not quite — Students believe human evolution was a linear "march of progress" from ape to modern human, with.', reveals: 'human-evolution-was-a-linear' },
                { text: '10,000 years ago', outcome: 'Not quite — Students believe human evolution was a linear "march of progress" from ape to modern human, with.', reveals: 'human-evolution-was-a-linear' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_10', title: 'Egyptian Civilisation: Pyramids and Society',
          caseStudy: { intro: 'Imagine standing before the Great Pyramid of Giza — 2.3 million stone blocks, each weighing 2.5 tonnes, aligned to true north with astonishing precision.',
            decisions: [{ prompt: 'Name the river that sustained Egyptian civilisation and state the approximate time period of the Old Kingdom pyramid-building phase.', options: [
                { text: 'The Nile River sustained Egyptian civilisation', outcome: 'The Nile River sustained Egyptian civilisation; the Old Kingdom pyramid-building phase lasted c.' },
                { text: 'Tigris', outcome: 'Not quite — Students believe pyramids were built by foreign slaves (often conflating with the biblical Exodus.', reveals: 'pyramids-were-built-by-foreign' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_11', title: 'Early Chinese Civilisation: Writing and Governance',
          caseStudy: { intro: 'Imagine you find a turtle shell with strange carved symbols in a museum — like the ones at the National Museum, New Delhi.',
            decisions: [{ prompt: 'What material was primarily used for the earliest Chinese writing during the Shang dynasty, and what was its ritual purpose?', options: [
                { text: 'Oracle bones (ox scapulae and turtle plastrons) were used for pyromantic divination', outcome: 'Oracle bones (ox scapulae and turtle plastrons) were used for pyromantic divination — heating them.' },
                { text: 'bamboo strips', outcome: 'Not quite — Students think Chinese writing began as "pictures of objects" (like Egyptian hieroglyphs) and.', reveals: 'chinese-writing-began-as-pictures' },
                { text: 'pictures of objects', outcome: 'Not quite — Students think Chinese writing began as "pictures of objects" (like Egyptian hieroglyphs) and.', reveals: 'chinese-writing-began-as-pictures' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_2', title: 'Archaeology: Methods of Studying Prehistory',
          caseStudy: { intro: 'Imagine you are walking near the Bhimbetka rock shelters in Madhya Pradesh and see ancient paintings on a cave wall—how would an archaeologist prove these are.',
            decisions: [{ prompt: 'What is the primary purpose of stratigraphy in archaeological excavation?', options: [
                { text: 'Stratigraphy establishes the relative chronological sequence of layers (strata) at a site', outcome: 'Stratigraphy establishes the relative chronological sequence of layers (strata) at a site based.' },
                { text: 'it gives the exact calendar date', outcome: 'Not quite — Students believe that "excavation is the main work of archaeology" and that "finding complete.', reveals: 'excavation-is-the-main-work' },
                { text: 'excavation is the main work of archaeology', outcome: 'Not quite — Students believe that "excavation is the main work of archaeology" and that "finding complete.', reveals: 'excavation-is-the-main-work' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_3', title: 'Palaeolithic Period: Tools and Way of Life',
          caseStudy: { intro: 'Imagine you are standing at the Bhimbetka rock shelters in Madhya Pradesh, looking at paintings of hunters chasing deer made 30,000 years ago.',
            decisions: [{ prompt: 'Name the three sub-phases of the Palaeolithic Period in chronological order and give one characteristic tool type for each phase found.', options: [
                { text: 'Lower Palaeolithic (handaxes/cleavers), Middle Palaeolithic (scrapers/points on flakes),', outcome: 'Lower Palaeolithic (handaxes/cleavers), Middle Palaeolithic (scrapers/points on flakes), Upper.' },
                { text: 'delayed', outcome: 'Not quite — Students believe the Indian Palaeolithic is a "delayed" version of the European sequence (e.g.', reveals: 'the-indian-palaeolithic-is-a' },
                { text: 'microliths for Upper Palaeolithic or missing Middle Palaeolithic', outcome: 'Not quite — Students believe the Indian Palaeolithic is a "delayed" version of the European sequence (e.g.', reveals: 'the-indian-palaeolithic-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_4', title: 'Mesolithic Period: Transition and Microliths',
          caseStudy: { intro: 'Imagine you are at the Bhimbetka rock shelters in Madhya Pradesh, looking at tiny, geometric stone tools barely the size of a fingernail displayed in the site.',
            decisions: [{ prompt: 'What is the approximate time range of the Mesolithic period in the Indian subcontinent, and what is the defining tool type of this period?', options: [
                { text: 'The Mesolithic in India dates roughly from 10,000 to 6,000 BCE and is defined by', outcome: 'The Mesolithic in India dates roughly from 10,000 to 6,000 BCE and is defined by **microliths**.' },
                { text: '2 million years ago', outcome: 'Not quite — Students often think **"Mesolithic = just smaller Palaeolithic tools"** and miss the revolutionary.', reveals: 'mesolithic-just-smaller-palaeolithic-tools' },
                { text: 'handaxes', outcome: 'Not quite — Students often think **"Mesolithic = just smaller Palaeolithic tools"** and miss the revolutionary.', reveals: 'mesolithic-just-smaller-palaeolithic-tools' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'At the Bhimbetka rock shelters, a visitor sneers at the 30,000-year-old hunting paintings: \'These people barely survived — starving, sick, always on the edge. Farming finally rescued them.\'',
            decisions: [{ prompt: 'Does the evidence support the sneer?', options: [
                { text: 'Mostly not — ethnographic parallels like the !Kung San show foragers worked 15–20 hours a week, ate dozens of plant species, shared equally and stayed healthy; early farmers in fact worked harder, ate narrower diets and built hierarchies. \'Primitive\' is a progress myth, not a finding.', outcome: 'This confronts the progress narrative with the actual evidence — foraging was often healthier and more equal than early farming.' },
                { text: 'The visitor is right — without farms or cities, life was unrelieved misery, which is why humans invented agriculture.', outcome: 'Skeletal evidence shows foragers were taller and better-toothed than early farmers; agriculture was adopted for other pressures, not because foraging failed.', reveals: 'foragers-were-miserable' },
                { text: 'Half right — hunter-gatherers were healthy only because there were so few people; hardship arrived purely from population growth.', outcome: 'The record shows active advantages — diverse diet, short work, egalitarian sharing — not merely the absence of crowding; the sneer still misreads the evidence.', reveals: 'few-people-lucky' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch2_4', title: 'The bigger picture',
          caseStudy: { intro: 'For 99% of our story we were mobile foragers — equal, well-fed, cooperative. Settled farming brought surplus, and surplus brought kings. \'Progress\' was a trade, not a gift.',
            decisions: [{ prompt: 'What comes next? Early Humans and the First Civilisations · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Early Humans and the First Civilisations · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hist_ch2_1', difficulty: 'standard',
          question: 'Early Humans: Origins and Hunter-Gatherer Life refers to the period from.',
          hint: 'If stuck on timescale, revisit the "Geological Time Scale" from Class 9 Geography.',
          misconception: 'Students believe human evolution was a linear "march of progress" from ape to modern human, with each species replacing.',
          parts: [
                { id: 'a', prompt: 'Why is the "Out of Africa" theory considered the most widely accepted model for human migration, and what evidence supports it over the multiregional.', answer: 'The Out of Africa theory is supported by genetic evidence (mitochondrial DNA and',
                  options: ['The Out of Africa theory is supported by genetic evidence (mitochondrial DNA and', 'fossils found in Africa', 'march of progress'],
                  hint: 'If stuck on timescale, revisit the "Geological Time Scale" from Class 9 Geography (Chapter 2) and.',
                  misconception: 'Students believe human evolution was a linear "march of progress" from ape to modern human, with each species replacing the previous one.' },
                { id: 'b', prompt: 'A Class 9 student claims: "Hunter-gatherers lived a harsh, short life constantly on the verge of starvation." Using evidence from the !Kung San studies and.', answer: 'The claim is largely incorrect',
                  options: ['The claim is largely incorrect', 'progress narrative', 'march of progress'],
                  hint: 'If stuck on timescale, revisit the "Geological Time Scale" from Class 9 Geography (Chapter 2) and.',
                  misconception: 'Students believe human evolution was a linear "march of progress" from ape to modern human, with each species replacing the previous one.' },
                { id: 'c', prompt: 'Compare the social organization of a typical Upper Palaeolithic hunter-gatherer band (25-50 people) with a Neolithic village (200-500 people).', answer: 'Hunter-gatherer bands: mobile, egalitarian, leadership by consensus/skill (not',
                  options: ['Hunter-gatherer bands: mobile, egalitarian, leadership by consensus/skill (not', 'march of progress'],
                  hint: 'If stuck on timescale, revisit the "Geological Time Scale" from Class 9 Geography (Chapter 2) and.',
                  misconception: 'Students believe human evolution was a linear "march of progress" from ape to modern human, with each species replacing the previous one.' }
          ],
            remediations: { 'human-evolution-was-a-linear': { steps: ['Use the "Human Evolution Branching Diagram" from NCERT Class 12 (or Smithsonian website) - trace multiple lineages.', 'Compare three hunter-gatherer case studies: !Kung San (Kalahari), Inuit (Arctic), and Andaman Islanders (tropical.', 'Plot fossil dates on a timeline showing overlap: Neanderthals (400-40 kya), *Homo sapiens* (300 kya-present), *Homo.', 'Write one paragraph explaining why "linear progress" is wrong using the interbreeding evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe human evolution was a linear "march of progress" from ape to modern human, with each species replacing.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The control of fire was the single most important technological breakthrough in human evolution." Assess its validity using evidence.', answer: 'The statement is largely valid but oversimplified',
                  options: ['The statement is largely valid but oversimplified', 'just for warmth', 'march of progress'],
                  hint: 'If stuck on timescale, revisit the "Geological Time Scale" from Class 9 Geography (Chapter 2) and.',
                  misconception: 'Students believe human evolution was a linear "march of progress" from ape to modern human, with each species replacing the previous one.' }
          ],
            remediations: { 'human-evolution-was-a-linear': { steps: ['Use the "Human Evolution Branching Diagram" from NCERT Class 12 (or Smithsonian website) - trace multiple lineages.', 'Compare three hunter-gatherer case studies: !Kung San (Kalahari), Inuit (Arctic), and Andaman Islanders (tropical.', 'Plot fossil dates on a timeline showing overlap: Neanderthals (400-40 kya), *Homo sapiens* (300 kya-present), *Homo.', 'Write one paragraph explaining why "linear progress" is wrong using the interbreeding evidence.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_10', difficulty: 'standard',
          question: 'Egyptian Civilisation (c. 3100–30 BCE) was a Bronze Age civilisation centred.',
          hint: 'Revisit c9_hist_ch2_9 (Mesopotamian ziggurats vs. Egyptian pyramids) and.',
          misconception: 'Students believe pyramids were built by foreign slaves (often conflating with the biblical Exodus narrative) and that.',
          parts: [
                { id: 'a', prompt: 'Name the river that sustained Egyptian civilisation and state the approximate time period of the Old Kingdom pyramid-building phase.', answer: 'The Nile River sustained Egyptian civilisation',
                  options: ['The Nile River sustained Egyptian civilisation', 'Tigris'],
                  hint: 'Revisit c9_hist_ch2_9 (Mesopotamian ziggurats vs. Egyptian pyramids) and c6_history_ch04_003.',
                  misconception: 'Students believe pyramids were built by foreign slaves (often conflating with the biblical Exodus narrative) and that pyramid construction.' },
                { id: 'b', prompt: 'A student claims: "The pyramids were built by Hebrew slaves, as shown in the Bible." Using archaeological evidence from the workers\' village at Deir el-Medina.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'Friends of Khufu'],
                  hint: 'Revisit c9_hist_ch2_9 (Mesopotamian ziggurats vs. Egyptian pyramids) and c6_history_ch04_003.',
                  misconception: 'Students believe pyramids were built by foreign slaves (often conflating with the biblical Exodus narrative) and that pyramid construction.' }
          ],
            remediations: { 'pyramids-were-built-by-foreign': { steps: ['Show students the "Diary of Merer" (Wadi al-Jarf papyri, c. 2560 BCE) — a real inspector\'s log detailing limestone.', 'Compare with the biblical Exodus timeline (c. 13th century BCE) — 1,300 years *after* the Great Pyramid.', 'Analyse workers\' tomb inscriptions at Giza (e.g., "Overseer of the Craftsmen") showing skilled Egyptian labour.', 'Have students rewrite the "slave narrative" as a corrected evidence-based paragraph for board-style answer writing.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_11', difficulty: 'standard',
          question: 'Early Chinese Civilisation (c. 1600–256 BCE) refers to the Shang and Zhou.',
          hint: 'Revisit c9_hist_ch2_9\'s "cuneiform evolution from tokens to script" and c9_hist_ch2_10\'s.',
          misconception: 'Students think Chinese writing began as "pictures of objects" (like Egyptian hieroglyphs) and remained pictographic.',
          parts: [
                { id: 'a', prompt: 'A historian argues: "Chinese logographic writing prevented the development of alphabetic literacy but enabled bureaucratic unity across dialects." Using.', answer: 'Valid: Oracle bones (c',
                  options: ['Valid: Oracle bones (c', 'pictures of objects'],
                  hint: 'Revisit c9_hist_ch2_9\'s "cuneiform evolution from tokens to script" and c9_hist_ch2_10\'s "pharaoh.',
                  misconception: 'Students think Chinese writing began as "pictures of objects" (like Egyptian hieroglyphs) and remained pictographic.' }
          ],
            remediations: { 'chinese-writing-began-as-pictures': { steps: ['Show oracle bone character for "horse" (馬) — a stylised outline — and "mother" (母) — woman with breasts marked.', 'Contrast with Egyptian hieroglyph for "sun" (☉) — a circle.', 'Explain Chinese characters quickly abstracted; by Zhou, 80% were semantic-phonetic compounds.', 'Have student decode a simple compound (e.g., 江 = water 氵+ work 工 → "river where work happens") to see sound+meaning.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_2', difficulty: 'standard',
          question: 'Archaeology is the scientific study of human prehistory and history through the.',
          hint: 'Revisit c9_hist_ch2_1 (Early Humans: Origins and Hunter-Gatherer Life) and ask: "If there.',
          misconception: 'Students believe that "excavation is the main work of archaeology" and that "finding complete, beautiful objects (like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Archaeology is the scientific study of human prehistory and history through the',
                  options: ['Archaeology is the scientific study of human prehistory and history through the', 'Early Humans: Origins and Hunter-Gatherer Life refers to the period from approximately', 'Egyptian Civilisation (c', 'Early Chinese Civilisation (c'],
                  hint: 'Revisit c9_hist_ch2_1 (Early Humans: Origins and Hunter-Gatherer Life) and ask: "If there are.',
                  misconception: 'Students believe that "excavation is the main work of archaeology" and that "finding complete, beautiful objects (like gold beads or intact.' }
          ],
            remediations: { 'excavation-is-the-main-work': { steps: ['Show a simplified Harris Matrix diagram of a hypothetical site with 5 layers, a pit, and a wall.', 'Give them a "context sheet" template (find number, layer, coordinates, associations, sketch) and a tray of "finds".', 'Compare their records with the actual layer sequence.', 'Discuss: "If you had just pulled the nice tool out, what information would be lost forever?" This forces the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_3', difficulty: 'standard',
          question: 'The Palaeolithic Period (Old Stone Age) in the Indian subcontinent spans from.',
          hint: 'If stuck, review the "Law of Superposition" and "type fossil" concept in c9_hist_ch2_2.',
          misconception: 'Students believe the Indian Palaeolithic is a "delayed" version of the European sequence (e.g., handaxes appear later.',
          parts: [
                { id: 'a', prompt: 'An archaeologist finds a layer with Levallois flakes and side-scrapers but no handaxes at a site near the Narmada Valley.', answer: 'Middle Palaeolithic',
                  options: ['Middle Palaeolithic', 'advanced', 'delayed', 'the Indian Palaeolithic is a "delayed" version of the European sequence (e'],
                  hint: 'If stuck, review the "Law of Superposition" and "type fossil" concept in c9_hist_ch2_2 using the.',
                  misconception: 'Students believe the Indian Palaeolithic is a "delayed" version of the European sequence (e.g., handaxes appear later in India because.' },
                { id: 'b', prompt: 'Compare the subsistence strategies implied by Lower Palaeolithic Acheulean sites (e.g., Attirampakkam) and Upper Palaeolithic sites (e.g., Bhimbetka III-F-23).', answer: 'Lower: large-game hunting/scavenging with heavy tools in open grasslands',
                  options: ['Lower: large-game hunting/scavenging with heavy tools in open grasslands', 'better brains', 'delayed', 'the Indian Palaeolithic is a "delayed" version of the European sequence (e'],
                  hint: 'If stuck, review the "Law of Superposition" and "type fossil" concept in c9_hist_ch2_2 using the.',
                  misconception: 'Students believe the Indian Palaeolithic is a "delayed" version of the European sequence (e.g., handaxes appear later in India because.' }
          ],
            remediations: { 'the-indian-palaeolithic-is-a': { steps: ['Revisit c9_hist_ch2_2 (archaeological dating methods) to understand how Attirampakkam\'s 1.5 Ma date was obtained.', 'On a map of India, plot Attirampakkam, Hunsgi, and Bhimbetka; note their distinct geological settings (river gravels.', 'Write one sentence for each site explaining why its tool kit suits its local stone and ecology.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_4', difficulty: 'standard',
          question: 'The Mesolithic Period (c. 10,000–6,000 BCE) in the Indian subcontinent marks.',
          hint: 'If stuck, re-read the Palaeolithic node (c9_hist_ch2_3) focusing on tool types and.',
          misconception: 'Students often think **"Mesolithic = just smaller Palaeolithic tools"** and miss the revolutionary shift to **composite.',
          parts: [
                { id: 'a', prompt: 'What is the approximate time range of the Mesolithic period in the Indian subcontinent, and what is the defining tool type of this period?', answer: 'The Mesolithic in India dates roughly from 10,000 to 6,000 BCE and is defined by',
                  options: ['The Mesolithic in India dates roughly from 10,000 to 6,000 BCE and is defined by', '2 million years ago', 'handaxes', 'Mesolithic = just smaller Palaeolithic tools'],
                  hint: 'If stuck, re-read the Palaeolithic node (c9_hist_ch2_3) focusing on tool types and environment, and.',
                  misconception: 'Students often think **"Mesolithic = just smaller Palaeolithic tools"** and miss the revolutionary shift to **composite tool technology**.' },
                { id: 'b', prompt: 'An archaeologist finds a Mesolithic site with numerous geometric microliths, faunal remains of wild cattle (Bos namadicus) showing size reduction, and charcoal.', answer: 'The evidence indicates a **broad-spectrum economy**: microliths (especially',
                  options: ['The evidence indicates a **broad-spectrum economy**: microliths (especially', 'hunting and gathering', 'Mesolithic = just smaller Palaeolithic tools'],
                  hint: 'If stuck, re-read the Palaeolithic node (c9_hist_ch2_3) focusing on tool types and environment, and.',
                  misconception: 'Students often think **"Mesolithic = just smaller Palaeolithic tools"** and miss the revolutionary shift to **composite tool technology**.' }
          ],
            remediations: { 'mesolithic-just-smaller-palaeolithic-tools': { steps: ['**Revisit c9_hist_ch2_3 (Palaeolithic)** and list the specific limitations of core tools (heavy, non-replaceable, high.', '**Use a physical analogy**: Compare a disposable razor cartridge (microlith) vs.', 'a solid metal knife (Palaeolithic point) — which is easier to maintain and carry?', '**Map exercise**: Plot Bagor, Adamgarh, Langhnaj, Bhimbetka on an outline map of India; note their eco-zones (Aravalli.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
