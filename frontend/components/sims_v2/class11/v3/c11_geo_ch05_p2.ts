import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch05_p2: SimDef = {
    id: 'v3_c11_geo_ch05_p2',
    title: 'Minerals and Rocks · Part 2/2',
    subtitle: 'Tell a mineral from a rock, then name one from a handful of tests.',
    classLevel: 11, subject: 'geography', topic: 'Minerals and Rocks · Part 2/2',
    chapters: ['c11_geo_ch05'],
    nodeIds: ['c11_geo_cbse_05_007', 'c11_geo_cbse_05_008', 'c11_geo_cbse_05_009', 'c11_geo_cbse_05_010', 'c11_geo_cbse_05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a field geologist with a streak plate and a steel file', intro: 'A glassy fragment scratches your phone screen but leaves a white streak — run the checklist before you name it.', goal: 'Apply the five-part mineral definition and the diagnostic properties used in field identification.' },
    discovery: {
        question: 'Granite: natural, hard, shiny, dug straight from the earth. Is it a mineral?',
        options: ['No — it\'s a rock, an aggregate of quartz, feldspar and mica; a mineral is a single crystalline phase with fixed composition', 'Yes — every hard natural solid qualifies', 'Yes — it\'s even harder than quartz', 'No — because minerals must be translucent'],
        answer: 'No — it\'s a rock, an aggregate of quartz, feldspar and mica; a mineral is a single crystalline phase with fixed composition',
        hook: 'A mineral has one recipe; a rock is the baked dish — granite fails the mineral test the moment you see three ingredients in it.',
    },
    teaching: [
        { title: 'Sedimentary Rocks: Mechanically Formed (Sandstone, Shale)', text: 'Mechanically formed sedimentary rocks (clastic rocks) are lithified accumulations of mineral and rock fragments derived from the mechanical weathering of pre-existing rocks, transported by agents.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run a field identification — lustre, streak, hardness, cleavage — on an unknown sample, then argue why \'calcite is sedimentary\' is a lazy rule.',
        labels: ['Sedimentary Rocks: Mechanically Formed', 'Sedimentary Rocks: Chemically', 'Metamorphic Rocks: Agents', 'Metamorphic Rocks: Slate, Marble,', 'Rock Cycle: Interconversion'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_05_007', title: 'Sedimentary Rocks: Mechanically Formed (Sandstone, Shale)',
          scaffold: { problem: 'A sandstone sample from the Bhander Group (Vindhyan Supergroup, Madhya Pradesh) has the following properties: grain size 0.25 mm (medium.',
            steps: [
            { text: 'Identify grain size — 0.25 mm falls in medium sand range (0.25–0.5 mm), typical of both aeolian and shallow marine.' },
            { text: 'Assess sorting — coefficient 1.2 (well-sorted) strongly favors aeolian (wind is highly selective) over fluvial.' },
            { text: 'Evaluate roundness — 0.7 (well-rounded) indicates prolonged abrasion; wind transport produces higher roundness than.' },
            { text: 'Check composition — 95% monocrystalline quartz = extreme mineralogical maturity; unstable minerals (feldspar, lithics).' },
            { text: 'Analyze cement — syntaxial quartz overgrowths require deep burial (>2–3 km) and temperatures >80°C for silica.' },
            { text: 'Synthesize — mature quartz arenite with aeolian texture (well-sorted, well-rounded) later deeply buried and.', faded: true, blankAnswer: 'Aeolian (desert dune) depositional environment with.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_05_008', title: 'Sedimentary Rocks: Chemically and Organically Formed (Limestone, Coal)',
          scaffold: { problem: 'A limestone sample from the Kurnool formation (Andhra Pradesh) contains 92% CaCO₃, 4% MgCO₃, 2% SiO₂, 1% Al₂O₃, 1% Fe₂O₃.',
            steps: [
            { text: 'Identify the relevant BIS specification for cement-grade limestone (IS 8112 / IS 269).' },
            { text: 'Extract the given oxide percentages from the problem statement.' },
            { text: 'Check CaCO₃ content: 92% ≥ 90% → PASS.' },
            { text: 'Check MgCO₃ content: 4% ≤ 5% → PASS.' },
            { text: 'Calculate sum of impurities (SiO₂ + Al₂O₃ + Fe₂O₃) = 2% + 1% + 1% = 4% ≤ 4% → PASS.' },
            { text: 'Conclude the sample meets all three criteria and is suitable for cement manufacture.', faded: true, blankAnswer: 'Yes, the Kurnool limestone sample meets BIS cement-grade.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_05_009', title: 'Metamorphic Rocks: Agents of Metamorphism (Heat, Pressure)',
          scaffold: { problem: 'A sandstone unit is buried to 8 km depth in a foreland basin adjacent to the Himalayas. The geothermal gradient is 22°C/km.',
            steps: [
            { text: 'Identify the protolith (sandstone) and target parameters (T, P at 8 km).' },
            { text: 'Calculate temperature: T = T_surface + GG × depth = 15 + 22 × 8 = 15 + 176 = 191°C.' },
            { text: 'Calculate lithostatic pressure: P = ρ × g × z = 2600 × 9.8 × 8000 = 203,840,000 Pa = 203.8 MPa ≈ 204 MPa.' },
            { text: 'Assess metamorphic grade: 191°C is below the typical low-grade threshold (~200°C for zeolite facies onset); this.' },
            { text: 'Predict rock type: At this T-P, sandstone undergoes cementation and minor recrystallization → quartzite (non-foliated).' },
            { text: 'Verify: No directed stress → no foliation; temperature too low for index minerals like chlorite or biotite.', faded: true, blankAnswer: 'T ≈ 191°C, P ≈ 204 MPa. Very low-grade (diagenesis.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_05_010', title: 'Metamorphic Rocks: Slate, Marble, Quartzite, Gneiss',
          caseStudy: { intro: 'Imagine walking through a quarry in Rajasthan\'s Makrana region — you see brilliant white blocks being cut for the Taj Mahal\'s restoration.',
            decisions: [{ prompt: 'Name the parent rock for each: slate, marble, quartzite, gneiss. State whether each product is foliated or non-foliated.', options: [
                { text: 'Slate → shale (foliated)', outcome: 'Slate → shale (foliated); Marble → limestone or dolomite (non-foliated); Quartzite → quartz.' },
                { text: 'gneiss is just a banded rock formed from any parent by high pressure', outcome: 'Not quite — Students believe "gneiss is just a banded rock formed from any parent by high pressure.".', reveals: 'gneiss-is-just-a-banded' },
                { text: 'marble is foliated or quartzite from limestone', outcome: 'Not quite — Students believe "gneiss is just a banded rock formed from any parent by high pressure.".', reveals: 'gneiss-is-just-a-banded' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_05_011', title: 'Rock Cycle: Interconversion of Rock Types',
          caseStudy: { intro: 'Observe the Aravalli hills near Delhi—those ancient quartzite ridges were once sandstone, which was once sand eroded from even older granites.',
            decisions: [{ prompt: 'Name the three rock types involved in the rock cycle and state the primary process that forms each type from pre-existing material.', options: [
                { text: 'Igneous rocks form by crystallization from magma/lava', outcome: 'Igneous rocks form by crystallization from magma/lava; sedimentary rocks form by lithification.' },
                { text: 'sedimentary rocks form by cooling of lava', outcome: 'Not quite — Students believe the rock cycle follows a fixed sequence: igneous → sedimentary → metamorphic →.', reveals: 'the-rock-cycle-follows-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a field trip a classmate pockets a shiny granite chunk saying \'nice mineral\', then argues: \'Calcite is a sedimentary mineral — its formula CaCO₃ proves it can only form in limestone.\'',
            decisions: [{ prompt: 'What two corrections does mineralogy demand?', options: [
                { text: 'First, granite is a rock — an aggregate of quartz, feldspar and mica — while a mineral is a single crystalline phase with definite composition (test it: streak, hardness, cleavage). Second, chemistry doesn\'t fix formation mode: calcite crystallises from carbonatite magma (igneous), precipitates in caves and evaporating water (sedimentary), and recrystallises into marble (metamorphic) — P-T conditions decide, not the formula.', outcome: 'Both errors corrected: rock ≠ mineral, and a formula names the substance while the geological setting explains how it formed.' },
                { text: 'Let \'granite is a mineral\' pass — it\'s hard, shiny, and natural, so it qualifies.', outcome: 'Hard and natural isn\'t enough: a mineral needs a single ordered crystalline structure and definite composition; granite is a mixture of three minerals.', reveals: 'rocks-and-minerals-same' },
                { text: 'Agree on calcite — CaCO₃ is the formula in limestone, so it\'s purely sedimentary.', outcome: 'Same formula, three modes: igneous carbonatites, sedimentary stalactites, metamorphic marble — formation depends on pressure-temperature-composition space, not formula alone.', reveals: 'formula-fixes-formation-mode' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_05_011', title: 'You made it',
          caseStudy: { intro: 'Calcite grows in magma, drips into caves and recrystallises as marble — the formula is fixed, but the mode of birth can be any of three.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_007', difficulty: 'standard',
          question: 'Mechanically formed sedimentary rocks (clastic rocks) are lithified.',
          hint: 'If stuck, review the Hjulström curve (erosion/transport/deposition thresholds for grain.',
          misconception: 'Students believe sandstone is "just compacted sand" and shale is "just compacted mud," ignoring that cementation.',
          parts: [
                { id: 'a', prompt: 'A sandstone sample from the Vindhyan Supergroup (Central India) shows well-rounded, well-sorted quartz grains with silica cement and large-scale cross-bedding.', answer: 'Aeolian (desert) sand dune environment',
                  options: ['Aeolian (desert) sand dune environment', 'river channel', 'just compacted sand', 'just compacted mud'],
                  hint: 'If stuck, review the Hjulström curve (erosion/transport/deposition thresholds for grain sizes).',
                  misconception: 'Students believe sandstone is "just compacted sand" and shale is "just compacted mud," ignoring that cementation (silica, calcite, iron.' }
          ],
            remediations: { 'sandstone-is-just-compacted-sand': { steps: ['Revisit Class 9 weathering (c9_geo_ch1_7) — distinguish mechanical disintegration (produces clasts) from chemical.', 'Use a hand lens to compare a friable Siwalik sandstone (loose grains, visible pores) with a Vindhyan orthoquartzite.', 'Draw a burial-depth vs. cement-type diagram: near-surface → clay/iron oxide; 1–3 km → calcite; >3 km → quartz.', 'Apply to Indian basins: Cambay (shallow, calcite-cemented) vs. Krishna-Godavari (deep, quartz-cemented).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe sandstone is "just compacted sand" and shale is "just compacted mud," ignoring that cementation.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "All shales are impermeable and therefore useless for groundwater extraction."', answer: 'The statement is false',
                  options: ['The statement is false', 'just compacted sand', 'just compacted mud'],
                  hint: 'If stuck, review the Hjulström curve (erosion/transport/deposition thresholds for grain sizes).',
                  misconception: 'Students believe sandstone is "just compacted sand" and shale is "just compacted mud," ignoring that cementation (silica, calcite, iron.' },
                { id: 'b', prompt: 'Design a field observation checklist for a Class 11 student visiting a roadcut exposing alternating sandstone and shale layers in the Siwalik Hills (Himalayan.', answer: 'Checklist: (1) Sandstone: trough cross-bedding, channel scour base, coarse tail,',
                  options: ['Checklist: (1) Sandstone: trough cross-bedding, channel scour base, coarse tail,', 'just compacted sand', 'just compacted mud'],
                  hint: 'If stuck, review the Hjulström curve (erosion/transport/deposition thresholds for grain sizes).',
                  misconception: 'Students believe sandstone is "just compacted sand" and shale is "just compacted mud," ignoring that cementation (silica, calcite, iron.' }
          ],
            remediations: { 'sandstone-is-just-compacted-sand': { steps: ['Revisit Class 9 weathering (c9_geo_ch1_7) — distinguish mechanical disintegration (produces clasts) from chemical.', 'Use a hand lens to compare a friable Siwalik sandstone (loose grains, visible pores) with a Vindhyan orthoquartzite.', 'Draw a burial-depth vs. cement-type diagram: near-surface → clay/iron oxide; 1–3 km → calcite; >3 km → quartz.', 'Apply to Indian basins: Cambay (shallow, calcite-cemented) vs. Krishna-Godavari (deep, quartz-cemented).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_008', difficulty: 'standard',
          question: 'Chemically formed sedimentary rocks (e.g., limestone, rock salt, gypsum).',
          hint: 'Revisit node c11_geo_cbse_05_004 (Rock Cycle) and c11_geo_cbse_05_007 (Mechanically.',
          misconception: 'Students think "organic rocks contain organic matter" — they believe coal is made of undecomposed plant material.',
          parts: [
                { id: 'a', prompt: 'A coal sample from the Jharia coalfield shows distinct bright and dull bands.', answer: 'Bright bands = vitrinite (woody tissue, humid conditions)',
                  options: ['Bright bands = vitrinite (woody tissue, humid conditions)', 'bands are impurities', 'organic rocks contain organic matter', 'coal is made of undecomposed plant material'],
                  hint: 'Revisit node c11_geo_cbse_05_004 (Rock Cycle) and c11_geo_cbse_05_007 (Mechanically Formed.',
                  misconception: 'Students think "organic rocks contain organic matter" — they believe coal is made of undecomposed plant material.' }
          ],
            remediations: { 'organic-rocks-contain-organic-matter': { steps: ['Use dilute HCl on limestone vs. sandstone — only limestone fizzes (chemical test).', 'Examine coal under hand lens — show vitrinite bands (woody) vs. inertinite (charred), not "plant pieces".', 'Draw a 2-column table: Chemical limestone (ooids, pisolites, stalactites) vs.', 'Map Indian occurrences — mark Vindhyan (chemical/organic mix) and Gondwana (coal) on outline map to reinforce spatial.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_009', difficulty: 'standard',
          question: 'Metamorphism is the solid-state transformation of pre-existing rocks.',
          hint: 'If stuck, revisit c11_geo_cbse_05_004 (rock cycle) to see where metamorphism fits, and.',
          misconception: 'Students believe **"pressure alone creates foliation"** and that **any metamorphic rock with bands is gneiss**.',
          parts: [
                { id: 'a', prompt: 'State the two primary agents of metamorphism and give one natural source for each agent.', answer: 'The two primary agents are heat and pressure',
                  options: ['The two primary agents are heat and pressure', 'weathering and erosion', 'pressure alone creates foliation'],
                  hint: 'If stuck, revisit c11_geo_cbse_05_004 (rock cycle) to see where metamorphism fits, and c9_geo_ch1_2.',
                  misconception: 'Students believe **"pressure alone creates foliation"** and that **any metamorphic rock with bands is gneiss**.' },
                { id: 'b', prompt: 'Explain why a shale baked by a granite intrusion becomes hornfels (non-foliated) while the same shale subjected to continental collision becomes slate.', answer: 'Contact metamorphism: dominant agent is heat from magma',
                  options: ['Contact metamorphism: dominant agent is heat from magma', 'hornfels forms from more heat', 'pressure alone creates foliation'],
                  hint: 'If stuck, revisit c11_geo_cbse_05_004 (rock cycle) to see where metamorphism fits, and c9_geo_ch1_2.',
                  misconception: 'Students believe **"pressure alone creates foliation"** and that **any metamorphic rock with bands is gneiss**.' },
                { id: 'c', prompt: 'Compare and contrast contact metamorphism and regional metamorphism across these four dimensions: (a) spatial extent, (b) pressure regime, (c) typical.', answer: 'spatial extent, (',
                  options: ['spatial extent, (', 'both produce foliation', 'pressure alone creates foliation'],
                  hint: 'If stuck, revisit c11_geo_cbse_05_004 (rock cycle) to see where metamorphism fits, and c9_geo_ch1_2.',
                  misconception: 'Students believe **"pressure alone creates foliation"** and that **any metamorphic rock with bands is gneiss**.' }
          ],
            remediations: { 'pressure-alone-creates-foliation-and': { steps: ['Use a hand sample or photo of banded marble (contact) vs. gneiss (regional) — trace the bands: marble bands follow.', 'Plot a simple P-T diagram (sketch axes: T horizontal, P vertical) and mark contact (high T, low P) vs.', 'Revisit the definition of foliation: "parallel alignment of platy/elongate minerals due to directed stress" — not just.', 'Practice classifying 5 unknown samples using a dichotomous key: foliated? → yes → grain size?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_010', difficulty: 'standard',
          question: 'Metamorphic rocks are pre-existing rocks (igneous, sedimentary, or earlier.',
          hint: 'Revisit c11_geo_cbse_05_009 — focus on the table linking agent of metamorphism.',
          misconception: 'Students believe "gneiss is just a banded rock formed from any parent by high pressure." In reality, gneissic banding.',
          parts: [
                { id: 'a', prompt: 'Name the parent rock for each: slate, marble, quartzite, gneiss. State whether each product is foliated or non-foliated.', answer: 'Slate → shale (foliated)',
                  options: ['Slate → shale (foliated)', 'gneiss is just a banded rock formed from any parent by high pressure', 'marble is foliated or quartzite from limestone', '"gneiss is just a banded rock formed from any parent by high pressure'],
                  hint: 'Revisit c11_geo_cbse_05_009 — focus on the table linking agent of metamorphism.',
                  misconception: 'Students believe "gneiss is just a banded rock formed from any parent by high pressure." In reality, gneissic banding requires both high.' },
                { id: 'b', prompt: 'Explain why slate splits into thin sheets while marble does not, even though both form under metamorphic conditions.', answer: 'Slate forms from shale under directed pressure at low grade',
                  options: ['Slate forms from shale under directed pressure at low grade', 'hardness', 'mineral type', 'gneiss is just a banded rock formed from any parent by high pressure'],
                  hint: 'Revisit c11_geo_cbse_05_009 — focus on the table linking agent of metamorphism.',
                  misconception: 'Students believe "gneiss is just a banded rock formed from any parent by high pressure." In reality, gneissic banding requires both high.' },
                { id: 'c', prompt: 'A hand specimen shows alternating light (quartz-feldspar) and dark (biotite-amphibole) bands, 2–5 mm thick, with coarse interlocking grains.', answer: 'Rock: Gneiss',
                  options: ['Rock: Gneiss', 'schist', 'sandstone', 'gneiss is just a banded rock formed from any parent by high pressure'],
                  hint: 'Revisit c11_geo_cbse_05_009 — focus on the table linking agent of metamorphism.',
                  misconception: 'Students believe "gneiss is just a banded rock formed from any parent by high pressure." In reality, gneissic banding requires both high.' }
          ],
            remediations: { 'gneiss-is-just-a-banded': { steps: ['Review c11_geo_cbse_05_009 — list the three agents of metamorphism and distinguish directed vs. uniform pressure.', 'Draw a 2×2 table: rows = parent rock type (pelitic/mafic/calcareous/quartzose); columns = metamorphic grade.', 'Use a hand lens on four labelled specimens; trace the mineral alignment in slate vs. gneiss vs. marble vs. quartzite.', 'Write one-sentence "if-then" rules: "If rock splits into thin sheets AND effervesces → not slate (slate doesn\'t.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_05_011', difficulty: 'standard',
          question: 'The rock cycle is a continuous geological process driven by Earth\'s internal.',
          hint: 'Revisit c11_geo_cbse_05_004 (rock classification) and c9_geo_ch1_2 (plate tectonics).',
          misconception: 'Students believe the rock cycle follows a fixed sequence: igneous → sedimentary → metamorphic → igneous, and that.',
          parts: [
                { id: 'a', prompt: 'Name the three rock types involved in the rock cycle and state the primary process that forms each type from pre-existing material.', answer: 'Igneous rocks form by crystallization from magma/lava',
                  options: ['Igneous rocks form by crystallization from magma/lava', 'sedimentary rocks form by cooling of lava'],
                  hint: 'Revisit c11_geo_cbse_05_004 (rock classification) and c9_geo_ch1_2 (plate tectonics).',
                  misconception: 'Students believe the rock cycle follows a fixed sequence: igneous → sedimentary → metamorphic → igneous, and that sedimentary rocks only.' }
          ],
            remediations: { 'the-rock-cycle-follows-a': { steps: ['Draw a 3×3 matrix with rock types as rows and columns.', 'Fill each cell with the process converting row-type to column-type (e.g., Igneous→Sedimentary.', 'Use Deccan Basalt and Himalayan Gneiss as concrete Indian examples for each arrow.', 'Identify which transitions require plate boundary processes (subduction, collision, rifting) vs. surface processes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
