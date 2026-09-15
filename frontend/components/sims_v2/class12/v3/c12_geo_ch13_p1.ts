import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch13_p1: SimDef = {
    id: 'v3_c12_geo_ch13_p1',
    title: 'Mineral and Energy Resources · Part 1/2',
    subtitle: 'The fertile plains are barren underneath — geology explains why',
    classLevel: 12, subject: 'geography', topic: 'Mineral and Energy Resources · Part 1/2',
    chapters: ['c12_geo_ch13'],
    nodeIds: ['c12_geo_cbse_13_001', 'c12_geo_cbse_13_002', 'c12_geo_cbse_13_003', 'c12_geo_cbse_13_004', 'c12_geo_cbse_13_005', 'c12_geo_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Mineral geologist', intro: 'Jharkhand glitters, the Ganga plain grows wheat — the difference was written 2.5 billion years before either existed.', goal: 'Locate India\'s three mineral belts and connect each to the geological era that formed it.' },
    discovery: {
        question: 'The Gangetic plain — India\'s most fertile land — holds zero economic minerals, while the rocky old plateau glitters with iron and coal. Why does the rich soil have nothing underneath?',
        options: ['The plains are young alluvium — loose river fill with no deep time; minerals need billions of years of magmatism and burial, which only the ancient crystalline Peninsula went through', 'The rivers washed them away', 'Miners haven\'t looked yet', 'Plains are too fertile to mine'],
        answer: 'The plains are young alluvium — loose river fill with no deep time; minerals need billions of years of magmatism and burial, which only the ancient crystalline Peninsula went through',
        hook: 'Geology writes the resource map: Archaean shields give the three mineral belts; Gondwana rift valleys hold 97% of the coal along the Damodar–Sone–Mahanadi–Godavari line; Tertiary sedimentary basins — Assam, Cambay, Mumbai High — hold the oil. \'Where\' is decided by \'when the rock formed\'.',
    },
    teaching: [
        { title: 'Mineral Resources: Distribution and Mode of Occurrence in India', text: 'Mineral resources in India are naturally occurring inorganic substances with definite chemical composition and physical properties, concentrated in specific geological formations across the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_13_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Prospect India like a geologist: pin the three mineral belts, map Gondwana coal to its rift valleys and Tertiary oil to its basins, then explain why the southwest belt has iron but no coal.',
        labels: ['Mineral Resources: Distribution', 'Iron Ore: Types (Haematite,', 'Manganese, Bauxite and Mica', 'Non-Ferrous Minerals: Copper, Lead,', 'Non-Metallic Minerals: Limestone', 'Conventional Energy Resources: Coal'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_001', title: 'Mineral Resources: Distribution and Mode of Occurrence in India',
          caseStudy: { intro: 'Observe a physical map of India — notice how the Chhotanagpur plateau (Jharkhand-Odisha) glints with industrial activity while the Gangetic plain remains.',
            decisions: [{ prompt: 'Name the three broad mineral belts of India and state one major mineral associated with each belt.', options: [
                { text: 'Correct answer: (1) North-Eastern Plateau Region', outcome: 'Correct answer: (1) North-Eastern Plateau Region — iron ore, coal, manganese, bauxite, mica; (2).' },
                { text: 'minerals are found everywhere in India', outcome: 'Not quite — Students believe "minerals are found everywhere in India" or "the Himalayas are mineral-rich like.', reveals: 'minerals-are-found-everywhere-in' },
                { text: 'the Himalayas are mineral-rich like the Peninsular Plateau', outcome: 'Not quite — Students believe "minerals are found everywhere in India" or "the Himalayas are mineral-rich like.', reveals: 'minerals-are-found-everywhere-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_002', title: 'Iron Ore: Types (Haematite, Magnetite) and Distribution',
          caseStudy: { intro: 'Imagine holding a piece of reddish, heavy rock from a construction site near Ballari — that is likely haematite, the backbone of India’s steel industry.',
            decisions: [{ prompt: 'Name the two main types of iron ore found in India and give the chemical formula of each.', options: [
                { text: 'Haematite (Fe₂O₃) and magnetite (Fe₃O₄)', outcome: 'Haematite (Fe₂O₃) and magnetite (Fe₃O₄). A wrong answer such as “siderite and limonite” reveals the.' },
                { text: 'siderite and limonite', outcome: 'Not quite — Students believe “magnetite is the main ore of India because it has the highest iron content.', reveals: 'magnetite-is-the-main-ore' },
                { text: 'magnetite is the main ore of India', outcome: 'Not quite — Students believe “magnetite is the main ore of India because it has the highest iron content.', reveals: 'magnetite-is-the-main-ore' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_003', title: 'Manganese, Bauxite and Mica: Distribution and Uses',
          caseStudy: { intro: 'Look at your smartphone or laptop — the circuit boards inside rely on mica\'s insulating properties, the aluminium casing comes from bauxite, and the steel.',
            decisions: [{ prompt: 'Name the geological formation primarily associated with manganese deposits in India and identify the two leading producer states.', options: [
                { text: 'Manganese is mainly associated with the Dharwar system of rocks', outcome: 'Manganese is mainly associated with the Dharwar system of rocks.' },
                { text: 'Gondwana rocks', outcome: 'Not quite — Students believe "mica is only found in Jharkhand" because textbooks highlight the Hazaribagh.', reveals: 'mica-is-only-found-in' },
                { text: 'Karnataka and Goa', outcome: 'Not quite — Students believe "mica is only found in Jharkhand" because textbooks highlight the Hazaribagh.', reveals: 'mica-is-only-found-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_004', title: 'Non-Ferrous Minerals: Copper, Lead, Zinc in India',
          caseStudy: { intro: 'Look at the electrical wiring in your classroom — every wire uses copper. Now ask: where does this copper come from?',
            decisions: [{ prompt: 'Name the three major copper mining belts in India and the states they are located in.', options: [
                { text: 'The three major copper mining belts are: (1) Singhbhum district in Jharkhand, (2)', outcome: 'The three major copper mining belts are: (1) Singhbhum district in Jharkhand, (2).' },
                { text: 'Khetri is in the Dharwar craton like Singhbhum', outcome: 'Not quite — Students think "Khetri is in the Dharwar craton like Singhbhum" because both are copper belts.', reveals: 'khetri-is-in-the-dharwar' },
                { text: 'Kolar or Bailadila', outcome: 'Not quite — Students think "Khetri is in the Dharwar craton like Singhbhum" because both are copper belts.', reveals: 'khetri-is-in-the-dharwar' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_005', title: 'Non-Metallic Minerals: Limestone and Other Minerals',
          caseStudy: { intro: 'Observe a cement factory near your city or a packet of cement — the key ingredient is limestone. Ask: where does this limestone come from?',
            decisions: [{ prompt: 'Name the two states that together account for the largest share of limestone reserves in India according to the NCERT mineral belts.', options: [
                { text: 'Correct answer: Rajasthan and Madhya Pradesh (Rajasthan from the North-Western belt,', outcome: 'Correct answer: Rajasthan and Madhya Pradesh (Rajasthan from the North-Western belt, Madhya Pradesh.' },
                { text: 'Jharkhand and Odisha', outcome: 'Not quite — Students often think limestone is only found in Rajasthan because the NCERT text highlights.', reveals: 'limestone-is-only-found-in' },
                { text: 'Dolomite and limestone provide raw materials for cement industry', outcome: 'Not quite — Students often think limestone is only found in Rajasthan because the NCERT text highlights.', reveals: 'limestone-is-only-found-in' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_006', title: 'Conventional Energy Resources: Coal Types and Distribution in India',
          caseStudy: { intro: 'Observe your electricity bill — over 70% of that power comes from burning coal.',
            decisions: [{ prompt: 'Name the two main geological ages of coal deposits in India and state which age contributes approximately 80% of India\'s coal reserves.', options: [
                { text: 'Correct answer: Gondwana (Permian, ~250-300 Ma) and Tertiary (Eocene-Oligocene, ~30-60 Ma)', outcome: 'Correct answer: Gondwana (Permian, ~250-300 Ma) and Tertiary (Eocene-Oligocene, ~30-60 Ma).' },
                { text: 'Carboniferous and Cretaceous', outcome: 'Not quite — Students believe "Gondwana coal = coking coal" and "Tertiary coal = lignite only." In reality: (1).', reveals: 'gondwana-coal-coking-coal-and' },
                { text: 'Gondwana and Vindhyan', outcome: 'Not quite — Students believe "Gondwana coal = coking coal" and "Tertiary coal = lignite only." In reality: (1).', reveals: 'gondwana-coal-coking-coal-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'On a mining internship, a junior analyst recommends prioritising a Karnataka magnetite prospect over Odisha haematite leases: \'Magnetite is 72% iron versus haematite\'s 70% — higher grade wins.\'',
            decisions: [{ prompt: 'What does the mineral-resources chapter say about that logic?', options: [
                { text: 'Grade alone doesn\'t pick the mine — haematite carries ~80% of India\'s reserves and production because it sits in thick, near-surface seams next to Jharia coal, while magnetite lies deeper and needs finer grinding; industrial logistics, not just chemistry, decides value.', outcome: 'The chapter\'s Odisha–Jharkhand dominance is a Weberian story: accessible high-grade haematite plus adjacent coking coal beats a two-point grade advantage buried in harder ground.' },
                { text: 'Agree — in minerals, the richest ore is always the best investment.', outcome: 'That\'s the textbook-recall error the chapter names: memorising \'magnetite = highest Fe\' without checking depth, beneficiation cost and coal proximity — which is why magnetite is not India\'s main ore despite the higher percentage.', reveals: 'grade-equals-value' },
                { text: 'Reject both — India should stop mining iron ore and conserve reserves for the future.', outcome: 'Conservation arguments target high-grade exports specifically; abandoning production ignores that the export-ban debate is about which ore leaves the country, not whether the steel economy keeps running.', reveals: 'conservation-means-closure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read India\'s mineral map as deep time made visible — and never again expect coal under an alluvial plain.',
            decisions: [{ prompt: 'What comes next? Mineral and Energy Resources · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Mineral and Energy Resources · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_001', difficulty: 'standard',
          question: 'Mineral resources in India are naturally occurring inorganic substances with.',
          hint: 'If stuck, revisit Class 11 Chapter 5 (Minerals and Rocks) nodes c11_geo_cbse_05_001.',
          misconception: 'Students believe "minerals are found everywhere in India" or "the Himalayas are mineral-rich like the Peninsular.',
          parts: [
                { id: 'a', prompt: 'Name the three broad mineral belts of India and state one major mineral associated with each belt.', answer: 'Correct answer: (1) North-Eastern Plateau Region',
                  options: ['Correct answer: (1) North-Eastern Plateau Region', 'minerals are found everywhere in India', 'the Himalayas are mineral-rich like the Peninsular Plateau', 'mode of occurrence'],
                  hint: 'If stuck, revisit Class 11 Chapter 5 (Minerals and Rocks) nodes c11_geo_cbse_05_001 to 05_011 for.',
                  misconception: 'Students believe "minerals are found everywhere in India" or "the Himalayas are mineral-rich like the Peninsular Plateau." In reality, the.' },
                { id: 'b', prompt: 'On an outline map of India, a student marks the following coal fields: (a) Jharia, (b) Raniganj, (c) Singrauli, (d) Korba, (e) Talcher.', answer: 'Correct mapping: Jharia & Raniganj → Damodar Valley (Jharkhand-West Bengal)',
                  options: ['Correct mapping: Jharia & Raniganj → Damodar Valley (Jharkhand-West Bengal)', 'minerals are found everywhere in India', 'the Himalayas are mineral-rich like the Peninsular Plateau', 'mode of occurrence'],
                  hint: 'If stuck, revisit Class 11 Chapter 5 (Minerals and Rocks) nodes c11_geo_cbse_05_001 to 05_011 for.',
                  misconception: 'Students believe "minerals are found everywhere in India" or "the Himalayas are mineral-rich like the Peninsular Plateau." In reality, the.' }
          ],
            remediations: { 'minerals-are-found-everywhere-in': { steps: ['Revisit Class 11 node c11_geo_cbse_09_005 (Peninsular Plateau) and c11_geo_cbse_04_008 (Plate Tectonics) to relearn why.', 'On a physical map, trace the Damodar-Sone-Mahanadi-Godavari lineament — draw it yourself.', 'Compare two maps side-by-side: (a) Geological map of India (Archaean/Dharwar/Gondwana/Tertiary) and (b) Mineral map.', 'Re-attempt Diagnostic Question 2 and 4. If still stuck, watch a 10-min video on "Gondwana basins and coal formation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "minerals are found everywhere in India" or "the Himalayas are mineral-rich like the Peninsular.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s petroleum reserves are located only in Assam and Gujarat." Is this accurate as of current knowledge?', answer: 'Correct evaluation: The statement is outdated/incomplete',
                  options: ['Correct evaluation: The statement is outdated/incomplete', 'minerals are found everywhere in India', 'the Himalayas are mineral-rich like the Peninsular Plateau', 'mode of occurrence'],
                  hint: 'If stuck, revisit Class 11 Chapter 5 (Minerals and Rocks) nodes c11_geo_cbse_05_001 to 05_011 for.',
                  misconception: 'Students believe "minerals are found everywhere in India" or "the Himalayas are mineral-rich like the Peninsular Plateau." In reality, the.' }
          ],
            remediations: { 'minerals-are-found-everywhere-in': { steps: ['Revisit Class 11 node c11_geo_cbse_09_005 (Peninsular Plateau) and c11_geo_cbse_04_008 (Plate Tectonics) to relearn why.', 'On a physical map, trace the Damodar-Sone-Mahanadi-Godavari lineament — draw it yourself.', 'Compare two maps side-by-side: (a) Geological map of India (Archaean/Dharwar/Gondwana/Tertiary) and (b) Mineral map.', 'Re-attempt Diagnostic Question 2 and 4. If still stuck, watch a 10-min video on "Gondwana basins and coal formation.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_002', difficulty: 'standard',
          question: 'Iron ore is a naturally occurring solid material from which metallic iron can.',
          hint: 'If unsure about BIF or mineral belts, revisit c11_geo_cbse_05_002 (mineral formation) and.',
          misconception: 'Students believe “magnetite is the main ore of India because it has the highest iron content (72%)”.',
          parts: [
                { id: 'a', prompt: 'Name the two main types of iron ore found in India and give the chemical formula of each.', answer: 'Haematite (Fe₂O₃) and magnetite (Fe₃O₄)',
                  options: ['Haematite (Fe₂O₃) and magnetite (Fe₃O₄)', 'siderite and limonite', 'magnetite is the main ore of India', '“magnetite is the main ore of India'],
                  hint: 'If unsure about BIF or mineral belts, revisit c11_geo_cbse_05_002 (mineral formation) and.',
                  misconception: 'Students believe “magnetite is the main ore of India because it has the highest iron content (72%)”.' },
                { id: 'b', prompt: 'On an outline map of India, mark and label the following: (a) Badampahar mine, (b) Noamundi mine, (c) Kudremukh mine, (d) Bailadila range.', answer: 'Badampahar mine, (',
                  options: ['Badampahar mine, (', 'magnetite is the main ore of India', '“magnetite is the main ore of India'],
                  hint: 'If unsure about BIF or mineral belts, revisit c11_geo_cbse_05_002 (mineral formation) and.',
                  misconception: 'Students believe “magnetite is the main ore of India because it has the highest iron content (72%)”.' }
          ],
            remediations: { 'magnetite-is-the-main-ore': { steps: ['Re-read NCERT pp. 54–56, highlighting every occurrence of “haematite” and “magnetite” in two colours.', 'On a blank outline map, draw only the four belts from memory; then verify against Fig. 5.2.', 'Make a 2×2 comparison table (ore type vs. belt vs. grade vs. coal proximity).', 'Re-attempt Diagnostic Questions 2 and 4; if still wrong, revisit c11_geo_cbse_05_002 (BIF formation) and.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_003', difficulty: 'standard',
          question: 'Manganese, bauxite, and mica are three critical metallic and non-metallic.',
          hint: 'If stuck, revisit c11_geo_cbse_09_005 (Peninsular Plateau physiography) and.',
          misconception: 'Students believe "mica is only found in Jharkhand" because textbooks highlight the Hazaribagh belt\'s 150 km × 22.',
          parts: [
                { id: 'a', prompt: 'Name the geological formation primarily associated with manganese deposits in India and identify the two leading producer states.', answer: 'Manganese is mainly associated with the Dharwar system of rocks',
                  options: ['Manganese is mainly associated with the Dharwar system of rocks', 'Gondwana rocks', 'Karnataka and Goa', 'mica is only found in Jharkhand'],
                  hint: 'If stuck, revisit c11_geo_cbse_09_005 (Peninsular Plateau physiography) and c11_geo_cbse_05_002.',
                  misconception: 'Students believe "mica is only found in Jharkhand" because textbooks highlight the Hazaribagh belt\'s 150 km × 22 km dimensions.' },
                { id: 'b', prompt: 'Compare the spatial distribution patterns of mica in Jharkhand versus Rajasthan.', answer: 'Jharkhand\'s mica occurs in a concentrated pegmatite intrusive complex within the',
                  options: ['Jharkhand\'s mica occurs in a concentrated pegmatite intrusive complex within the', 'better mining technology in Rajasthan', 'mica is only found in Jharkhand'],
                  hint: 'If stuck, revisit c11_geo_cbse_09_005 (Peninsular Plateau physiography) and c11_geo_cbse_05_002.',
                  misconception: 'Students believe "mica is only found in Jharkhand" because textbooks highlight the Hazaribagh belt\'s 150 km × 22 km dimensions.' }
          ],
            remediations: { 'mica-is-only-found-in': { steps: ['Revisit c11_geo_cbse_09_005 (Peninsular Plateau) — identify Dharwar craton (manganese), Eastern Ghats laterite.', 'Use c11_geo_cbse_05_002 (Mineral Formation) to distinguish igneous (pegmatite mica), sedimentary (lateritic bauxite).', 'On an outline map, plot *only* the top 3 mines for each mineral from NCERT Table 5.2 — say each mine\'s name aloud with.', 'Re-attempt Diagnostic Question 4 (spatial comparison) and Question 5 (policy evaluation) — if still stuck, review.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_004', difficulty: 'standard',
          question: 'Non-ferrous minerals are metallic minerals that do not contain iron as a major.',
          hint: 'If stuck, review c12_geo_cbse_13_001 (mineral classification) and c11_geo_cbse_09_005.',
          misconception: 'Students think "Khetri is in the Dharwar craton like Singhbhum" because both are copper belts.',
          parts: [
                { id: 'a', prompt: 'Why are lead and zinc deposits almost always found together in India, and which geological formation hosts the Zawar lead-zinc deposits?', answer: 'Lead and zinc occur together',
                  options: ['Lead and zinc occur together', 'Dharwar system', 'Khetri is in the Dharwar craton like Singhbhum', '"Khetri is in the Dharwar craton like Singhbhum"'],
                  hint: 'If stuck, review c12_geo_cbse_13_001 (mineral classification) and c11_geo_cbse_09_005 (Peninsular.',
                  misconception: 'Students think "Khetri is in the Dharwar craton like Singhbhum" because both are copper belts.' },
                { id: 'b', prompt: 'On an outline map of India, mark and label: (a) Malanjkhand, (b) Zawar, (c) Khetri, (d) Singhbhum.', answer: 'Malanjkhand, (',
                  options: ['Malanjkhand, (', 'Khetri is in the Dharwar craton like Singhbhum', '"Khetri is in the Dharwar craton like Singhbhum"'],
                  hint: 'If stuck, review c12_geo_cbse_13_001 (mineral classification) and c11_geo_cbse_09_005 (Peninsular.',
                  misconception: 'Students think "Khetri is in the Dharwar craton like Singhbhum" because both are copper belts.' }
          ],
            remediations: { 'khetri-is-in-the-dharwar': { steps: ['Revisit c11_geo_cbse_05_002 (mineral formation modes) and c11_geo_cbse_04_008 (plate tectonics and mineralisation).', 'On a tectonic map of India, trace the Dharwar craton, Aravalli-Delhi mobile belt, and Singhbhum shear zone.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, review the NCERT Fig.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_005', difficulty: 'standard',
          question: 'Non-metallic minerals are naturally occurring inorganic substances that do not.',
          hint: 'Revisit the "Classification of Minerals" flowchart (Fig. 5.1) and the "Distribution.',
          misconception: 'Students often think limestone is only found in Rajasthan because the NCERT text highlights "Dolomite and limestone.',
          parts: [
                { id: 'a', prompt: 'A cement plant in Satna (Madhya Pradesh) sources limestone from the nearby Kaimur range.', answer: 'Steps: (1) Locate Satna in MP on the Vindhyan range',
                  options: ['Steps: (1) Locate Satna in MP on the Vindhyan range', 'Gondwana', 'Deccan Traps', 'Dolomite and limestone provide raw materials for cement industry'],
                  hint: 'Revisit the "Classification of Minerals" flowchart (Fig. 5.1) and the "Distribution of Minerals.',
                  misconception: 'Students often think limestone is only found in Rajasthan because the NCERT text highlights "Dolomite and limestone provide raw materials.' }
          ],
            remediations: { 'limestone-is-only-found-in': { steps: ['Open the "India – Mineral Belts" map (NCERT Fig. 5.2/5.3) and trace the Vindhyan and Cuddapah sedimentary basins.', 'Mark all limestone occurrences listed in the text (Rajasthan, MP, Chhattisgarh, AP, Karnataka, Tamil Nadu, Gujarat.', 'Write one-line industrial use next to each cluster (cement, flux, chemical).', 'Re-attempt Diagnostic Question 1 and 3. If still stuck, revisit c11_geo_cbse_05_008 (Sedimentary Rocks: Limestone.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_006', difficulty: 'standard',
          question: 'Coal is a combustible sedimentary rock formed from buried plant matter over.',
          hint: 'If stuck on basin-geology linkage, revisit c11_geo_cbse_05_007 (sedimentary rocks) and.',
          misconception: 'Students believe "Gondwana coal = coking coal" and "Tertiary coal = lignite only." In reality: (1) Only ~15%.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Coal is a combustible sedimentary rock formed from buried plant matter over geological',
                  options: ['Coal is a combustible sedimentary rock formed from buried plant matter over geological', 'Mineral resources in India are naturally occurring inorganic substances with definite', 'Iron ore is a naturally occurring solid material from', 'Manganese, bauxite, and mica are three critical metallic and non-metallic minerals'],
                  hint: 'If stuck on basin-geology linkage, revisit c11_geo_cbse_05_007 (sedimentary rocks) and.',
                  misconception: 'Students believe "Gondwana coal = coking coal" and "Tertiary coal = lignite only." In reality: (1) Only ~15% of Gondwana coal is coking.' }
          ],
            remediations: { 'gondwana-coal-coking-coal-and': { steps: ['Revisit c11_geo_cbse_19_005 (Class 11 coal distribution) — draw a fresh outline map marking ONLY Gondwana basins.', 'Make a 3-column table: Basin | Coal Rank | Coking/Non-coking | Key Mines. Fill from NCERT text.', 'Watch 10-min animation of Gondwana basin formation (rifting → sedimentation → coalification) to visualise why seams are.', 'Re-attempt Diagnostic Q2 and Q4. If still stuck, review c10_geo_cbse_05_005 for basic coal classification.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
