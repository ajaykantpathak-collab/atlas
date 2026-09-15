import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch06_p1: SimDef = {
    id: 'v3_c11_geo_ch06_p1',
    title: 'Geomorphic Processes · Part 1/2',
    subtitle: 'Classify Earth\'s reshaping forces by their energy source, not their mood.',
    classLevel: 11, subject: 'geography', topic: 'Geomorphic Processes · Part 1/2',
    chapters: ['c11_geo_ch06'],
    nodeIds: ['c11_geo_cbse_06_001', 'c11_geo_cbse_06_002', 'c11_geo_cbse_06_003', 'c11_geo_cbse_06_004', 'c11_geo_cbse_06_005', 'c11_geo_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a geomorphologist balancing two rival budgets', intro: 'The Aravallis slumped low and ancient beside the still-rising Himalaya — two energy budgets made that portrait.', goal: 'Distinguish endogenic from exogenic processes and epeirogenic from orogenic crustal movements.' },
    discovery: {
        question: 'Volcanoes flatten landscapes; rivers build deltas. So is \'endogenic = constructive, exogenic = destructive\' a reliable rule?',
        options: ['No — the split is by energy source: Earth\'s internal heat versus the Sun; each can build or destroy', 'Yes — internal forces always build, surface forces always wear down', 'Yes — exceptions are too rare to matter', 'No — because both are actually powered by gravity'],
        answer: 'No — the split is by energy source: Earth\'s internal heat versus the Sun; each can build or destroy',
        hook: 'The Himalaya rises ~5 mm a year endogenically while rivers shave 1-2 mm off it exogenically — same mountains, opposite engines.',
    },
    teaching: [
        { title: 'Geomorphic Processes: Endogenic and Exogenic Classification', text: 'Geomorphic processes are the physical and chemical actions that modify Earth\'s surface, classified by their energy source: endogenic processes derive energy from Earth\'s interior (radioactive decay.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_06_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Net out uplift versus denudation over a thousand Himalayan years, then assign epeirogenic and orogenic signatures to India\'s three great regions.',
        labels: ['Geomorphic Processes: Endogenic', 'Diastrophism: Epeirogenic (Vertical)', 'Volcanism: Types of Volcanic', 'Weathering: Definition and Significance', 'Physical Weathering: Frost Action,', 'Chemical Weathering: Solution, Oxidation,'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_06_001', title: 'Geomorphic Processes: Endogenic and Exogenic Classification',
          scaffold: { problem: 'The Western Ghats escarpment shows evidence of both endogenic and exogenic processes.',
            steps: [
            { text: 'Identify endogenic feature - fault scarp offsetting Deccan Traps indicates tectonic uplift along Western Ghats fault.' },
            { text: 'Calculate long-term uplift rate: 15 m / 65 Myr = 0.00023 mm/yr (very slow, but persistent).' },
            { text: 'Identify exogenic feature - 20 m laterite profile represents intense chemical weathering under tropical climate.' },
            { text: 'Calculate weathering rate: 20 m / 65 Myr = 0.00031 mm/yr (comparable to uplift rate).' },
            { text: 'Compare with modern river incision (0.3 mm/yr) - current exogenic denudation far exceeds long-term averages due.' },
            { text: 'Synthesize: Landscape shaped by slow endogenic uplift creating relief, exploited by intense exogenic.', faded: true, blankAnswer: 'Over 65 Myr, endogenic uplift (0.00023 mm/yr) and exogenic.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_06_002', title: 'Diastrophism: Epeirogenic (Vertical) and Orogenic (Horizontal) Movements',
          caseStudy: { intro: 'Observe the landscape around you: the flat Deccan Plateau you might see in central India versus the towering Himalayas in the north.',
            decisions: [{ prompt: 'Define diastrophism and name its two main types with their directional characteristics.', options: [
                { text: 'Diastrophism refers to all processes that move, elevate, or build up portions of the', outcome: 'Diastrophism refers to all processes that move, elevate, or build up portions of the Earth\'s crust.' },
                { text: 'swaps the direction (e', outcome: 'Not quite — Students often think that epeirogenic movements only cause uplift and orogenic movements only cause.', reveals: 'epeirogenic-movements-only-cause-uplift' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_06_003', title: 'Volcanism: Types of Volcanic Eruptions (Fissure vs Central)',
          caseStudy: { intro: 'Observe the flat-topped hills of the Deccan Plateau near Pune – these are stacked basalt layers from ancient fissure eruptions.',
            decisions: [{ prompt: 'Define fissure eruption and name the major landform it creates in India.', options: [
                { text: 'A fissure eruption is the outpouring of low-viscosity basaltic lava through long, linear', outcome: 'A fissure eruption is the outpouring of low-viscosity basaltic lava through long, linear cracks.' },
                { text: 'fissure eruption builds a conical mountain', outcome: 'Not quite — Students often think "volcano" always means a conical mountain (central eruption) and are unaware.', reveals: 'volcano-always-means-a-conical' },
                { text: 'volcano', outcome: 'Not quite — Students often think "volcano" always means a conical mountain (central eruption) and are unaware.', reveals: 'volcano-always-means-a-conical' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_06_004', title: 'Weathering: Definition and Significance in Geomorphology',
          caseStudy: { intro: 'Observe a crumbling boundary wall in your neighbourhood or a temple plinth where the stone blocks have developed honeycomb-like pits and flaking surfaces.',
            decisions: [{ prompt: 'Define weathering in one sentence and state the single criterion that distinguishes it from erosion.', options: [
                { text: 'Correct answer: Weathering is the in-situ mechanical disintegration and chemical', outcome: 'Correct answer: Weathering is the in-situ mechanical disintegration and chemical decomposition.' },
                { text: 'transport', outcome: 'Not quite — Students believe "weathering = physical breaking of rocks by temperature changes" and equate.', reveals: 'weathering-physical-breaking-of-rocks' },
                { text: 'movement', outcome: 'Not quite — Students believe "weathering = physical breaking of rocks by temperature changes" and equate.', reveals: 'weathering-physical-breaking-of-rocks' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_06_005', title: 'Physical Weathering: Frost Action, Thermal Expansion, Exfoliation',
          caseStudy: { intro: 'Begin by showing a photograph of a granitic tor in the Deccan Plateau (e.g., Hampi or Mahabalipuram) with curved, onion-skin layers peeling off.',
            decisions: [{ prompt: 'Define frost action and state the approximate volumetric expansion of water when it freezes at 0°C.', options: [
                { text: 'Frost action is the mechanical weathering process where water enters rock cracks,', outcome: 'Frost action is the mechanical weathering process where water enters rock cracks, freezes, expands.' },
                { text: 'water contracts when freezing', outcome: 'Not quite — Students often believe exfoliation is caused *only* by daily temperature changes (thermal.', reveals: 'exfoliation-is-caused-only-by' },
                { text: 'expansion is 50%', outcome: 'Not quite — Students often believe exfoliation is caused *only* by daily temperature changes (thermal.', reveals: 'exfoliation-is-caused-only-by' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_06_006', title: 'Chemical Weathering: Solution, Oxidation, Carbonation, Hydration',
          scaffold: { problem: 'The Barakar sandstone (arkosic, 40% feldspar) in the Damodar Valley experiences mean annual temperature 26°C and rainfall 1400 mm.',
            steps: [
            { text: 'Identify the key mineral — potassium feldspar (KAlSi3O8) constitutes 40% of the arkose, making it the primary reactive.' },
            { text: 'Assess climate — 1400 mm rainfall provides ample water for hydrolysis; 26°C accelerates reaction kinetics (Arrhenius.' },
            { text: 'Select dominant process — hydrolysis (a hydration-driven reaction) attacks feldspar because carbonation targets.' },
            { text: 'Write balanced hydrolysis reaction: 2KAlSi3O8(s) + 2H2CO3(aq) + 9H2O(l) → Al2Si2O5(OH)4(s) + 4H4SiO4(aq) + 2K+(aq).' },
            { text: 'Analyze products — kaolinite [Al2Si2O5(OH)4] is stable, insoluble clay; K+, H4SiO4, HCO3- are leached by percolating.' },
            { text: 'Conclude soil characteristics — kaolinite has low cation exchange capacity (1:1 layer, no isomorphic substitution),.', faded: true, blankAnswer: 'Dominant process = hydrolysis (hydration-driven). Reaction.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is debating which force \'built\' India\'s landscape. A classmate declares: \'Simple — endogenic forces like volcanoes construct the land, exogenic forces like rivers only destroy it. So all building comes from inside the Earth.\'',
            decisions: [{ prompt: 'Where does this neat rule break down?', options: [
                { text: 'Correct the classification principle: endogenic vs exogenic is about ENERGY SOURCE (interior heat vs solar/gravity), not about building vs destroying. Volcanism is endogenic yet pyroclastic flows flatten landscapes; river and glacier deposition is exogenic yet builds deltas and moraines. The Himalayas (orogenic uplift) rise while the Indo-Gangetic basin subsides — both are diastrophism.', outcome: 'The debate matures: Earth\'s surface is built and worn by both engines — classify by where the energy comes from, not by whether relief rises or falls.' },
                { text: 'Accept the rule — internal = constructive, external = destructive is a tidy way to remember it.', outcome: 'Tidy but wrong: deposition by rivers builds deltas (exogenic construction) and eruptions destroy relief (endogenic destruction) — the rule fails both ways.', reveals: 'endogenic-constructive-exogenic-destructive' },
                { text: 'Argue instead that only mountain-building counts as diastrophism — plains and plateaus aren\'t deformed.', outcome: 'Diastrophism covers both: epeirogenic movement also subsides blocks into basins like the Indo-Gangetic Plain — vertical and horizontal deformation both qualify.', reveals: 'diastrophism-is-only-mountains' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Ask not what a process does but where its fuel comes from — that single question classifies every sculptor of the surface.',
            decisions: [{ prompt: 'What comes next? Geomorphic Processes · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Geomorphic Processes · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_001', difficulty: 'standard',
          question: 'Geomorphic processes are the physical and chemical actions that modify Earth\'s.',
          hint: 'Revisit Class 9 Chapter 1 (Earth\'s layers, plate tectonics) and Chapter 2 (atmosphere.',
          misconception: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.',
          parts: [
                { id: 'a', prompt: 'A student states: "Earthquakes are exogenic processes because they happen on the Earth\'s surface and destroy buildings." Is this classification correct?', answer: 'No, earthquakes are endogenic processes',
                  options: ['No, earthquakes are endogenic processes', 'endogenic = constructive, exogenic = destructive', '"endogenic = constructive, exogenic = destructive" as an absolute rule'],
                  hint: 'Revisit Class 9 Chapter 1 (Earth\'s layers, plate tectonics) and Chapter 2 (atmosphere, winds).',
                  misconception: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.' },
                { id: 'b', prompt: 'Explain why chemical weathering of limestone by carbonic acid (H₂CO₃) is classified as an exogenic process, even though the carbon dioxide comes from both.', answer: 'Chemical weathering is exogenic',
                  options: ['Chemical weathering is exogenic', 'endogenic = constructive, exogenic = destructive', '"endogenic = constructive, exogenic = destructive" as an absolute rule'],
                  hint: 'Revisit Class 9 Chapter 1 (Earth\'s layers, plate tectonics) and Chapter 2 (atmosphere, winds).',
                  misconception: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.' }
          ],
            remediations: { 'endogenic-constructive': { steps: ['Draw a two-column table: Column A "Energy Source: Earth\'s Interior" (radioactive decay, primordial heat), Column.', 'Place each process in correct column by tracing its energy: magma rise → mantle heat (A); river flow → solar.', 'For each, ask "If Sun disappeared, would this stop?" If yes → exogenic. If no → endogenic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "If solar radiation stopped tomorrow, all exogenic processes would cease immediately, but endogenic processes would continue unchanged.', answer: 'Largely accurate',
                  options: ['Largely accurate', 'endogenic = constructive, exogenic = destructive', '"endogenic = constructive, exogenic = destructive" as an absolute rule'],
                  hint: 'Revisit Class 9 Chapter 1 (Earth\'s layers, plate tectonics) and Chapter 2 (atmosphere, winds).',
                  misconception: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.' },
                { id: 'b', prompt: 'Design a field observation checklist for a Class 11 student visiting a local river valley to identify evidence of both endogenic and exogenic processes.', answer: 'Good checklist: 1) River terraces at multiple levels - indicates tectonic uplift',
                  options: ['Good checklist: 1) River terraces at multiple levels - indicates tectonic uplift', 'endogenic = constructive, exogenic = destructive', '"endogenic = constructive, exogenic = destructive" as an absolute rule'],
                  hint: 'Revisit Class 9 Chapter 1 (Earth\'s layers, plate tectonics) and Chapter 2 (atmosphere, winds).',
                  misconception: 'Students believe "endogenic = constructive, exogenic = destructive" as an absolute rule.' }
          ],
            remediations: { 'endogenic-constructive': { steps: ['Draw a two-column table: Column A "Energy Source: Earth\'s Interior" (radioactive decay, primordial heat), Column.', 'Place each process in correct column by tracing its energy: magma rise → mantle heat (A); river flow → solar.', 'For each, ask "If Sun disappeared, would this stop?" If yes → exogenic. If no → endogenic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_002', difficulty: 'standard',
          question: 'Diastrophism encompasses all endogenic processes that deform the Earth\'s crust.',
          hint: 'Review plate boundary types (convergent, divergent) and the concept of endogenic forces.',
          misconception: 'Students often think that epeirogenic movements only cause uplift and orogenic movements only cause mountain building.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Diastrophism encompasses all endogenic processes that deform the Earth\'s crust through',
                  options: ['Diastrophism encompasses all endogenic processes that deform the Earth\'s crust through', 'Geomorphic processes are the physical and chemical actions that modify Earth\'s surface,', 'Volcanism is the process by', 'Weathering is the in-situ disintegration and decomposition of rocks and minerals at or'],
                  hint: 'Review plate boundary types (convergent, divergent) and the concept of endogenic forces from.',
                  misconception: 'Students often think that epeirogenic movements only cause uplift and orogenic movements only cause mountain building, ignoring that.' }
          ],
            remediations: { 'epeirogenic-movements-only-cause-uplift': { steps: ['Use a physical model (clay layers) to demonstrate horizontal compression creating folds (orogenic) vs.', 'On an outline map of India, shade the Himalayan zone and label "Horizontal Compression → Folding/Faulting".', 'Draw a simple cross-section showing the Himalayan foreland basin subsidence as a vertical downwarp caused by horizontal.', 'Practice explaining the difference using the keywords: "direction of force", "scale", "landform", and "example".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_003', difficulty: 'standard',
          question: 'Volcanism is the process by which magma (molten rock), gases, and pyroclastic.',
          hint: 'Revisit Class 9 "Volcanoes: Formation, Types and Distribution" (c9_geo_ch1_5).',
          misconception: 'Students often think "volcano" always means a conical mountain (central eruption) and are unaware that the Deccan Traps.',
          parts: [
                { id: 'a', prompt: 'Why does a central eruption often produce a steep-sided cone while a fissure eruption produces a flat plateau?', answer: 'Central eruptions concentrate magma at a single vent',
                  options: ['Central eruptions concentrate magma at a single vent', 'central eruptions have more gas', 'volcano'],
                  hint: 'Revisit Class 9 "Volcanoes: Formation, Types and Distribution" (c9_geo_ch1_5) – specifically the.',
                  misconception: 'Students often think "volcano" always means a conical mountain (central eruption) and are unaware that the Deccan Traps – one of Earth\'s.' }
          ],
            remediations: { 'volcano-always-means-a-conical': { steps: ['Show a satellite image of the Deccan Traps (flat-topped hills, step-like topography) and a photo of Barren Island.', 'Use a simple viscosity demo – pour honey (high viscosity) and water (low viscosity) on an inclined board; water spreads.', 'Plot both on a tectonic map of India – Deccan Traps over Réunion hotspot track, Barren Island on the Andaman subduction.', 'Have the student explain in their own words how magma viscosity and tectonic setting control eruption type.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_004', difficulty: 'standard',
          question: 'Weathering is the in-situ disintegration and decomposition of rocks and.',
          hint: 'If stuck, revisit c11_geo_cbse_06_001 and draw the endogenic-exogenic flowchart with.',
          misconception: 'Students believe "weathering = physical breaking of rocks by temperature changes" and equate it exclusively with frost.',
          parts: [
                { id: 'a', prompt: 'Define weathering in one sentence and state the single criterion that distinguishes it from erosion.', answer: 'Correct answer: Weathering is the in-situ mechanical disintegration and chemical',
                  options: ['Correct answer: Weathering is the in-situ mechanical disintegration and chemical', 'transport', 'movement', 'weathering = physical breaking of rocks by temperature changes'],
                  hint: 'If stuck, revisit c11_geo_cbse_06_001 and draw the endogenic-exogenic flowchart with weathering.',
                  misconception: 'Students believe "weathering = physical breaking of rocks by temperature changes" and equate it exclusively with frost wedging or thermal.' },
                { id: 'b', prompt: 'Given two locations — (A) Bangalore (granite bedrock, tropical savanna climate, 900 mm rainfall) and (B) Leh (granite bedrock, cold desert climate, 100.', answer: 'Correct answer with steps: Step 1: Identify rock type is same (granite)',
                  options: ['Correct answer with steps: Step 1: Identify rock type is same (granite)', 'weathering = physical breaking of rocks by temperature changes'],
                  hint: 'If stuck, revisit c11_geo_cbse_06_001 and draw the endogenic-exogenic flowchart with weathering.',
                  misconception: 'Students believe "weathering = physical breaking of rocks by temperature changes" and equate it exclusively with frost wedging or thermal.' }
          ],
            remediations: { 'weathering-physical-breaking-of-rocks': { steps: ['Revisit Class 9 node c9_geo_ch1_7 (Weathering: Physical, Chemical and Biological) and create a three-column table.', 'On a political map of India, mark Bangalore, Leh, Mumbai, and Jaisalmer; annotate each with mean annual temperature.', 'Conduct the "vinegar on limestone" demo (chemical) vs. "freeze-thaw in plastic bottle" demo (physical) — time each.', 'Write a 100-word explanation of why the same granite forms tors in Hyderabad but laterite in Kerala — this forces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_005', difficulty: 'standard',
          question: 'Physical weathering is the mechanical disintegration of rocks into smaller.',
          hint: 'If stuck, review Class 9 Science chapter on "Matter in Our Surroundings" (states.',
          misconception: 'Students often believe exfoliation is caused *only* by daily temperature changes (thermal expansion) and ignore the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Physical weathering is the mechanical disintegration of rocks into smaller fragments',
                  options: ['Physical weathering is the mechanical disintegration of rocks into smaller fragments', 'Geomorphic processes are the physical and chemical actions that modify Earth\'s surface,', 'Diastrophism encompasses all endogenic processes that deform the Earth\'s crust through', 'Volcanism is the process by'],
                  hint: 'If stuck, review Class 9 Science chapter on "Matter in Our Surroundings" (states of water.',
                  misconception: 'Students often believe exfoliation is caused *only* by daily temperature changes (thermal expansion) and ignore the dominant role.' }
          ],
            remediations: { 'exfoliation-is-caused-only-by': { steps: ['Use a physical model: take a foam block (representing rock under pressure) and compress it between two boards.', 'Remove the top board and observe the foam expanding upward and cracking parallel to the surface.', 'Compare with a freeze-thaw demo: saturate a porous sandstone sample, freeze it, and observe fracture propagation.', 'Have students sketch the stress directions in both cases (vertical tension for unloading vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_006', difficulty: 'standard',
          question: 'Chemical weathering is the decomposition and alteration of rocks and minerals.',
          hint: 'Review Class 9 Chapter 2 "Physical Features of India" section on rock types and Class 11.',
          misconception: 'Students believe "chemical weathering only happens in hot, wet climates" and that "oxidation = rusting of iron metal.".',
          parts: [
                { id: 'a', prompt: 'A limestone block (density 2.7 g/cm³, dimensions 50 cm × 30 cm × 20 cm) in Cherrapunji (annual rainfall 11,777 mm) loses 0.5 mm thickness per year through.', answer: 'Step 1: Top surface area = 0.5 m × 0.3 m = 0.15 m² = 1500 cm²',
                  options: ['Step 1: Top surface area = 0.5 m × 0.3 m = 0.15 m² = 1500 cm²', 'chemical weathering only happens in hot, wet climates', 'oxidation = rusting of iron metal'],
                  hint: 'Review Class 9 Chapter 2 "Physical Features of India" section on rock types and Class 11 Chemistry.',
                  misconception: 'Students believe "chemical weathering only happens in hot, wet climates" and that "oxidation = rusting of iron metal." The first ignores.' },
                { id: 'b', prompt: 'Compare the depth of weathering profiles developed on granite in humid tropical Kerala versus arid western Rajasthan.', answer: 'Kerala\'s lateritic profiles reach 30-50 m depth',
                  options: ['Kerala\'s lateritic profiles reach 30-50 m depth', 'chemical weathering only happens in hot, wet climates', 'oxidation = rusting of iron metal'],
                  hint: 'Review Class 9 Chapter 2 "Physical Features of India" section on rock types and Class 11 Chemistry.',
                  misconception: 'Students believe "chemical weathering only happens in hot, wet climates" and that "oxidation = rusting of iron metal." The first ignores.' }
          ],
            remediations: { 'chemical-weathering-only-happens-in': { steps: ['Use the Goldich stability series diagram (from NCERT Fig. 6.5) to rank minerals by weathering susceptibility — olivine.', 'Map Indian rock types to this series — Deccan basalt (pyroxene-rich) vs. Bundelkhand granite (feldspar-rich) vs.', 'Overlay climate data (rainfall, temperature) to predict dominant process: high rain + carbonate rock = carbonation.', 'Verify with field photos — laterite profiles (Kerala), karst towers (Cherrapunji), tors (Rajasthan) — linking each.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
