import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch12_p1: SimDef = {
    id: 'v3_c11_bio_ch12_p1',
    title: 'Respiration in Plants · Part 1/2',
    subtitle: 'Trace glucose\'s journey through three compartments and see where each ATP is actually minted.',
    classLevel: 11, subject: 'biology', topic: 'Respiration in Plants · Part 1/2',
    chapters: ['c11_bio_ch12'],
    nodeIds: ['c11_bio_cbse_12_001', 'c11_bio_cbse_12_002', 'c11_bio_cbse_12_003', 'c11_bio_cbse_12_004', 'c11_bio_cbse_12_005', 'c11_bio_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biochemist diagnosing why sprouting seeds warm a sealed jar overnight', intro: 'The jar is warm and misted — proof of respiration. Your job is to say precisely where inside each cell the heat and water came from.', goal: 'Locate glycolysis, pyruvate oxidation, the Krebs cycle, and the ETS within the cell, and contrast fermentation fates of pyruvate.' },
    discovery: {
        question: 'Ask where respiration happens and everyone says \'mitochondria — the powerhouse\'. Yet the first ten reactions, the ones that split glucose in half, never enter it. Where does glycolysis run, and why does that location matter?',
        options: ['In the cytoplasm — it\'s the universal, oxygen-free first stage every cell runs before mitochondria get involved', 'In the chloroplast, paired with photosynthesis', 'In the nucleus, near the DNA that controls it', 'In the cell membrane, where oxygen enters'],
        answer: 'In the cytoplasm — it\'s the universal, oxygen-free first stage every cell runs before mitochondria get involved',
        hook: 'Respiration is compartmentalised — cytoplasm, matrix, inner membrane — and that geography is exactly how the cell captures energy stepwise instead of wasting it in one burst.',
    },
    teaching: [
        { title: 'Cellular Respiration: Overview and Sites', text: 'Cellular respiration is the enzyme-mediated, stepwise oxidative breakdown of organic substrates (primarily glucose) within living cells to release energy trapped as ATP, occurring in the cytoplasm.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_12_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Follow one glucose molecule from the cytoplasm to the mitochondrial matrix to the inner membrane, then predict what an uncoupler does to a root tip that can burn oxygen but can\'t bank ATP.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_12_001', title: 'Cellular Respiration: Overview and Sites',
          caseStudy: { intro: 'Observe a germinating moong bean (sprouts) kept in a closed container overnight – you\'ll notice water droplets and a slight warmth, evidence of respiration.',
            decisions: [{ prompt: 'Name the two subcellular sites in a plant cell where the major energy-yielding reactions of aerobic respiration occur, and name the.', options: [
                { text: 'Correct answer: (1) Cytoplasm – glycolysis (glucose → 2 pyruvate + 2 ATP + 2 NADH)', outcome: 'Correct answer: (1) Cytoplasm – glycolysis (glucose → 2 pyruvate + 2 ATP + 2 NADH).' },
                { text: 'mitochondria only', outcome: 'Not quite — Students think "plants respire only through stomata" and forget lenticels in woody stems/roots.', reveals: 'plants-respire-only-through-stomata' },
                { text: 'plants respire only through stomata', outcome: 'Not quite — Students think "plants respire only through stomata" and forget lenticels in woody stems/roots.', reveals: 'plants-respire-only-through-stomata' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_12_002', title: 'Glycolysis: Steps and Net ATP',
          scaffold: { problem: 'A student measures O₂ consumption and CO₂ evolution in germinating moong (mung bean) seeds.',
            steps: [
            { text: 'Recognize that RQ = CO₂ produced / O₂ consumed. RQ = 1.0 with zero O₂ consumption means CO₂ is produced without O₂.' },
            { text: 'Recall that glycolysis alone does not produce CO₂; the decarboxylation steps occur in pyruvate oxidation (link.' },
            { text: 'Identify that in plants under low O₂, pyruvate undergoes alcoholic fermentation: pyruvate → acetaldehyde + CO₂ (by.' },
            { text: 'The CO₂ measured comes exclusively from the pyruvate decarboxylase step of fermentation, not from glycolysis or Krebs.' },
            { text: 'Conclude that germinating seeds initially rely on glycolysis + fermentation for ATP, producing CO₂ without O₂, giving.', faded: true, blankAnswer: 'The CO₂ originates from pyruvate decarboxylation during.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_12_003', title: 'Fermentation: Anaerobic Respiration',
          scaffold: { problem: 'A baker prepares 500 g of dough using 100 g sucrose (C₁₂H₂₂O₁₁). Wild yeast ferment the sucrose anaerobically.',
            steps: [
            { text: 'Write hydrolysis of sucrose: C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ (glucose) + C₆H₁₂O₆ (fructose) - both enter glycolysis' },
            { text: 'Each hexose yields 2 CO₂ in alcoholic fermentation (pyruvate → acetaldehyde + CO₂, ×2 per glucose)' },
            { text: 'Moles of sucrose = 100 g ÷ 342 g/mol = 0.292 mol; yields 2 × 0.292 = 0.584 mol hexose equivalents' },
            { text: 'CO₂ produced = 0.584 mol hexose × 2 mol CO₂/mol hexose = 1.168 mol CO₂' },
            { text: 'At STP (0°C, 1 atm), 1 mol = 22.4 L; theoretical CO₂ = 1.168 × 22.4 = 26.16 L' },
            { text: 'Actual volume lower because: (a) Some glucose used for yeast biomass synthesis (anabolism), (b) CO₂ dissolves in dough.', faded: true, blankAnswer: 'Theoretical maximum CO₂ = 26.16 L at STP. Actual volume.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_12_004', title: 'Pyruvate Oxidation and Acetyl-CoA Formation',
          scaffold: { problem: 'A researcher isolates plant mitochondria and adds 10 μmol pyruvate with excess CoA, NAD⁺, and all cofactors.',
            steps: [
            { text: 'Identify stoichiometry — 1 pyruvate → 1 NADH.' },
            { text: 'Theoretical yield = 10 μmol NADH (from 10 μmol pyruvate).' },
            { text: 'Actual yield = 9.8 μmol NADH.' },
            { text: 'Percent yield = (9.8 / 10) × 100 = 98%.' },
            { text: 'Explain <100% yield: side reactions (e.g., pyruvate carboxylase activity), incomplete reduction of NAD⁺,.', faded: true, blankAnswer: '98% yield; the reaction is highly efficient but not perfect.' }
            ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_12_005', title: 'Krebs Cycle: TCA Cycle Steps',
          caseStudy: { intro: 'Imagine you\'re watching a pressure cooker whistle — steam (CO₂) escapes while the cooker (mitochondrial matrix) gets hotter as energy is trapped in high-energy.',
            decisions: [{ prompt: 'Name the enzyme that catalyzes the condensation of acetyl-CoA with oxaloacetate and the product formed.', options: [
                { text: 'Citrate synthase catalyzes the condensation of acetyl-CoA (2C) with oxaloacetate (4C) to', outcome: 'Citrate synthase catalyzes the condensation of acetyl-CoA (2C) with oxaloacetate (4C) to form.' },
                { text: 'aconitase', outcome: 'Not quite — Students believe the two CO₂ released per turn come from the acetyl-CoA that *just entered* that.', reveals: 'the-two-co-released-per' },
                { text: 'isocitrate dehydrogenase', outcome: 'Not quite — Students believe the two CO₂ released per turn come from the acetyl-CoA that *just entered* that.', reveals: 'the-two-co-released-per' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_12_006', title: 'Electron Transport Chain and Oxidative Phosphorylation',
          caseStudy: { intro: 'Imagine you are climbing the stairs of a tall building like the Qutub Minar – each step you climb stores gravitational potential energy.',
            decisions: [{ prompt: 'Name the four protein complexes of the mitochondrial electron transport chain in the correct sequence of electron flow from NADH to oxygen.', options: [
                { text: 'Correct sequence: Complex I (NADH dehydrogenase) → Complex III (cytochrome bc₁) → Complex', outcome: 'Correct sequence: Complex I (NADH dehydrogenase) → Complex III (cytochrome bc₁) → Complex.' },
                { text: 'the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell', outcome: 'Not quite — Students often believe that the 38 ATP per glucose figure is a fixed, universal yield achieved.', reveals: 'the-38-atp-per-glucose' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'Respiration in Plants · Part 1/2', spots: [
            { id: 's1', label: 'Cellular Respiration Overview and Sites', prompt: 'Which idea is this? — Cellular respiration is the enzyme-mediated, stepwise oxidative breakdown of organic.', answer: 'Cellular Respiration Overview and Sites', options: ['Cellular Respiration Overview and Sites', 'Glycolysis Steps and Net ATP', 'Fermentation Anaerobic Respiration', 'Pyruvate Oxidation and Acetyl-CoA Formation'] },
            { id: 's2', label: 'Glycolysis Steps and Net ATP', prompt: 'Which idea is this? — Glycolysis is the universal, ten-step enzymatic pathway in the cytoplasm where one.', answer: 'Glycolysis Steps and Net ATP', options: ['Glycolysis Steps and Net ATP', 'Cellular Respiration Overview and Sites', 'Fermentation Anaerobic Respiration', 'Pyruvate Oxidation and Acetyl-CoA Formation'] },
            { id: 's3', label: 'Fermentation Anaerobic Respiration', prompt: 'Which idea is this? — Fermentation is an anaerobic metabolic pathway where pyruvic acid (the end product.', answer: 'Fermentation Anaerobic Respiration', options: ['Fermentation Anaerobic Respiration', 'Cellular Respiration Overview and Sites', 'Glycolysis Steps and Net ATP', 'Pyruvate Oxidation and Acetyl-CoA Formation'] },
            { id: 's4', label: 'Pyruvate Oxidation and Acetyl-CoA Formation', prompt: 'Which idea is this? — Pyruvate oxidation (link reaction) is the mitochondrial matrix process where each.', answer: 'Pyruvate Oxidation and Acetyl-CoA Formation', options: ['Pyruvate Oxidation and Acetyl-CoA Formation', 'Cellular Respiration Overview and Sites', 'Glycolysis Steps and Net ATP', 'Fermentation Anaerobic Respiration'] },
            { id: 's5', label: 'Krebs Cycle TCA Cycle Steps', prompt: 'Which idea is this? — The Krebs cycle (tricarboxylic acid/TCA cycle) is a cyclic metabolic pathway occurring.', answer: 'Krebs Cycle TCA Cycle Steps', options: ['Krebs Cycle TCA Cycle Steps', 'Cellular Respiration Overview and Sites', 'Glycolysis Steps and Net ATP', 'Fermentation Anaerobic Respiration'] },
            { id: 's6', label: 'Electron Transport Chain and Oxidative Phosphorylation', prompt: 'Which idea is this? — The Electron Transport Chain (ETC) is a series of protein complexes (I-IV) and mobile.', answer: 'Electron Transport Chain and Oxidative Phosphorylation', options: ['Electron Transport Chain and Oxidative Phosphorylation', 'Cellular Respiration Overview and Sites', 'Glycolysis Steps and Net ATP', 'Fermentation Anaerobic Respiration'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'After three days of heavy rain, the potted plants on your school\'s terrace garden start wilting even though the soil is soaked. A classmate explains: \'Roots can\'t respire because the leaves\' stomata closed in the cloudy weather — the plant is suffocating from the top down.\'',
            decisions: [{ prompt: 'What\'s the real reason the roots are struggling?', options: [
                { text: 'Water fills the soil\'s air spaces, blocking O2 diffusion directly into root epidermal cells — roots get their oxygen from soil air (and via aerenchyma/lenticels in some plants), not shipped down from photosynthesis or through stomata. Saturated soil means hypoxic roots, whatever the leaves do.', outcome: 'Each plant part respires using locally available O2; the failure point in waterlogging is at the root surface, not the leaf.' },
                { text: 'The classmate is right — stomata are the plant\'s only breathing pores, so closed stomata starve the roots of oxygen.', outcome: 'Stomata serve leaves; stems use lenticels and roots absorb O2 from soil air spaces. Waterlogging kills by flooding those spaces, not by closing stomata.', reveals: 'stomata-only-breathing' },
                { text: 'Roots get O2 transported down through the phloem from photosynthesising leaves — cloudy skies cut off the supply.', outcome: 'Phloem carries sugars, not oxygen; root respiration depends on O2 diffusing from soil air into epidermal cells.', reveals: 'oxygen-via-phloem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You replaced \'mitochondria make energy\' with a three-address route — glycolysis outside, Krebs in the matrix, the electron chain on the membrane.',
            decisions: [{ prompt: 'What comes next? Respiration in Plants · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Respiration in Plants · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_001', difficulty: 'standard',
          question: 'Cellular respiration is the enzyme-mediated, stepwise oxidative breakdown.',
          hint: 'If stuck, revisit Class 9 Cell Structure (c9_bio_ch1_9) – specifically the mitochondrial.',
          misconception: 'Students think "plants respire only through stomata" and forget lenticels in woody stems/roots.',
          parts: [
                { id: 'a', prompt: 'A maize root tip cell is treated with a mitochondrial uncoupler (allows H⁺ to leak across inner membrane without ATP synthase).', answer: 'rate of glycolysis, (',
                  options: ['rate of glycolysis, (', 'plants respire only through stomata', '"plants respire only through stomata" and forget lenticels in woody stems/roots'],
                  hint: 'If stuck, revisit Class 9 Cell Structure (c9_bio_ch1_9) – specifically the mitochondrial diagram.',
                  misconception: 'Students think "plants respire only through stomata" and forget lenticels in woody stems/roots.' }
          ],
            remediations: { 'plants-respire-only-through-stomata': { steps: ['Take a cross-section of a woody stem (e.g., bougainvillea) and a root tip (onion) under microscope; identify lenticels.', 'Perform the classic "germinating seeds in thermos flask" experiment: one flask with live seeds, one with boiled seeds.', 'Re-read NCERT 12.1 "Do Plants Breathe?" focusing on the three reasons plants don\'t need respiratory organs.', 'Draw a concept map: "O₂ entry → stomata (leaves) / lenticels (stems) / diffusion through soil air (roots) → all living.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "plants respire only through stomata" and forget lenticels in woody stems/roots.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since fats yield more energy per gram than carbohydrates, a plant seed storing oil (e.g., groundnut) should have a higher respiratory.', answer: 'Claim is **incorrect**',
                  options: ['Claim is **incorrect**', 'plants respire only through stomata', '"plants respire only through stomata" and forget lenticels in woody stems/roots'],
                  hint: 'If stuck, revisit Class 9 Cell Structure (c9_bio_ch1_9) – specifically the mitochondrial diagram.',
                  misconception: 'Students think "plants respire only through stomata" and forget lenticels in woody stems/roots.' },
                { id: 'b', prompt: 'Design a simple experiment using germinating seeds (moong vs. groundnut), KOH, and a respirometer to demonstrate the difference in RQ between carbohydrate and.', answer: 'Setup: Two respirometers with equal *dry mass* of germinating moong (starch) and',
                  options: ['Setup: Two respirometers with equal *dry mass* of germinating moong (starch) and', 'plants respire only through stomata', '"plants respire only through stomata" and forget lenticels in woody stems/roots'],
                  hint: 'If stuck, revisit Class 9 Cell Structure (c9_bio_ch1_9) – specifically the mitochondrial diagram.',
                  misconception: 'Students think "plants respire only through stomata" and forget lenticels in woody stems/roots.' }
          ],
            remediations: { 'plants-respire-only-through-stomata': { steps: ['Take a cross-section of a woody stem (e.g., bougainvillea) and a root tip (onion) under microscope; identify lenticels.', 'Perform the classic "germinating seeds in thermos flask" experiment: one flask with live seeds, one with boiled seeds.', 'Re-read NCERT 12.1 "Do Plants Breathe?" focusing on the three reasons plants don\'t need respiratory organs.', 'Draw a concept map: "O₂ entry → stomata (leaves) / lenticels (stems) / diffusion through soil air (roots) → all living.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_002', difficulty: 'standard',
          question: 'Glycolysis is the universal, ten-step enzymatic pathway in the cytoplasm where.',
          hint: 'Review Class 9 "Mitochondria: Powerhouse of the Cell" (c9_bio_ch1_9) for ATP structure.',
          misconception: 'Students often believe that the 2 NADH produced in glycolysis directly yield 6 ATP (3 ATP each) in the electron.',
          parts: [
                { id: 'a', prompt: 'Name the enzyme that catalyzes the committed step of glycolysis and the allosteric activator that signals high energy demand in the cell.', answer: 'The committed step is catalyzed by phosphofructokinase-1 (PFK-1)',
                  options: ['The committed step is catalyzed by phosphofructokinase-1 (PFK-1)', 'hexokinase or pyruvate kinase'],
                  hint: 'Review Class 9 "Mitochondria: Powerhouse of the Cell" (c9_bio_ch1_9) for ATP structure and Class 10.',
                  misconception: 'Students often believe that the 2 NADH produced in glycolysis directly yield 6 ATP (3 ATP each) in the electron transport chain, so they.' }
          ],
            remediations: { 'the-2-nadh-produced-in': { steps: ['Draw the mitochondrial double membrane and locate the ETS complexes on the inner membrane.', 'Show that cytosolic NADH cannot cross the inner membrane.', 'Introduce the two shuttle systems using diagrams from NCERT Fig 12.4/12.5.', 'Calculate ATP yield for each shuttle: malate-aspartate = 3 ATP/NADH (NADH enters matrix), glycerol-3-phosphate = 2.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_003', difficulty: 'standard',
          question: 'Fermentation is an anaerobic metabolic pathway where pyruvic acid (the end.',
          hint: 'Review c11_bio_cbse_12_002 focusing on the energy payoff phase of glycolysis.',
          misconception: 'Students believe fermentation "produces" NAD⁺ from scratch, rather than regenerating it by transferring electrons from.',
          parts: [
                { id: 'a', prompt: 'Why does glycolysis stop in the absence of fermentation when oxygen is unavailable, even though glycolysis itself does not use oxygen directly?', answer: 'Glycolysis requires NAD⁺ as electron acceptor at the glyceraldehyde-3-phosphate',
                  options: ['Glycolysis requires NAD⁺ as electron acceptor at the glyceraldehyde-3-phosphate', 'glycolysis needs oxygen', 'produces', 'no NAD⁺ synthesis'],
                  hint: 'Review c11_bio_cbse_12_002 focusing on the energy payoff phase of glycolysis, specifically the G3P.',
                  misconception: 'Students believe fermentation "produces" NAD⁺ from scratch, rather than regenerating it by transferring electrons from NADH+H⁺ to pyruvate.' }
          ],
            remediations: { 'fermentation-produces-nad-from-scratch': { steps: ['Draw the glycolysis payoff phase showing G3P → 1,3-BPGA + NADH+H⁺. Ask: "Where does this NADH go if no oxygen?"', 'Show two fates: (a) Mitochondria → ETS → O₂ → H₂O (aerobic); (b) Cytoplasm → pyruvate → lactate/ethanol (fermentation).', 'Use a redox balance analogy: NAD⁺ is a "rechargeable battery" - fermentation recharges it by dumping electrons onto.', 'Practice writing: "Fermentation regenerates NAD⁺ from NADH+H⁺ by reducing pyruvate" - never "produces NAD⁺."'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_004', difficulty: 'standard',
          question: 'Pyruvate oxidation (link reaction) is the mitochondrial matrix process where.',
          hint: 'Review glycolysis output (c11_bio_cbse_12_002) and mitochondrial structure (c9_bio_ch1_9).',
          misconception: 'Students often think pyruvate oxidation occurs in the cytoplasm because glycolysis does, or they confuse the pyruvate.',
          parts: [
                { id: 'a', prompt: 'Name the enzyme complex that catalyzes the conversion of pyruvate to acetyl-CoA and list the three products formed per pyruvate molecule.', answer: 'Pyruvate dehydrogenase complex',
                  options: ['Pyruvate dehydrogenase complex', 'pyruvate decarboxylase'],
                  hint: 'Review glycolysis output (c11_bio_cbse_12_002) and mitochondrial structure (c9_bio_ch1_9) — focus.',
                  misconception: 'Students often think pyruvate oxidation occurs in the cytoplasm because glycolysis does, or they confuse the pyruvate dehydrogenase complex.' }
          ],
            remediations: { 'pyruvate-oxidation-occurs-in-the': { steps: ['Revisit c11_bio_cbse_12_001 (sites of respiration) to confirm mitochondrial matrix location.', 'Draw a side-by-side comparison table: Pyruvate Dehydrogenase (aerobic, matrix, CoA, NAD⁺, acetyl-CoA) vs.', 'Pyruvate Decarboxylase (anaerobic, cytosol, TPP only, acetaldehyde).', 'Use a carbon-tracking diagram: Glucose (6C) → 2 Pyruvate (3C) → 2 Acetyl-CoA (2C) + 2 CO₂.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_005', difficulty: 'standard',
          question: 'The Krebs cycle (tricarboxylic acid/TCA cycle) is a cyclic metabolic pathway.',
          hint: 'Revisit node c11_bio_cbse_12_004 and practice writing the pyruvate dehydrogenase complex.',
          misconception: 'Students believe the two CO₂ released per turn come from the acetyl-CoA that *just entered* that turn.',
          parts: [
                { id: 'a', prompt: 'Compare the carbon fate of the two carboxyl groups of oxaloacetate over two turns of the TCA cycle.', answer: 'The two carboxyl carbons of oxaloacetate are NOT lost in the first turn',
                  options: ['The two carboxyl carbons of oxaloacetate are NOT lost in the first turn', 'first turn'],
                  hint: 'Revisit node c11_bio_cbse_12_004 and practice writing the pyruvate dehydrogenase complex reaction.',
                  misconception: 'Students believe the two CO₂ released per turn come from the acetyl-CoA that *just entered* that turn.' }
          ],
            remediations: { 'the-two-co-released-per': { steps: ['Draw citrate with distinct labels for the two -CH₂COO⁻ arms (one from acetyl-CoA, one from oxaloacetate).', 'Trace each arm through aconitase → isocitrate → α-ketoglutarate → succinyl-CoA → succinate → fumarate → malate →.', 'Note that the "acetyl-CoA arm" becomes the *distal* carboxyl of α-ketoglutarate and is lost at the α-KG dehydrogenase.', 'Repeat for second turn to see the original acetyl-CoA carbons leave. Use different colored pens for each turn.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_12_006', difficulty: 'standard',
          question: 'The Electron Transport Chain (ETC) is a series of protein complexes (I-IV) and.',
          hint: 'If stuck, review the summary tables in nodes c11_bio_cbse_12_002, c11_bio_cbse_12_004.',
          misconception: 'Students often believe that the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell.',
          parts: [
                { id: 'a', prompt: 'Explain why the oxidation of one NADH molecule yields approximately 3 ATP while one FADH₂ yields only 2 ATP, even though both donate electrons to the same.', answer: 'NADH donates electrons at Complex I',
                  options: ['NADH donates electrons at Complex I', 'the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell'],
                  hint: 'If stuck, review the summary tables in nodes c11_bio_cbse_12_002, c11_bio_cbse_12_004.',
                  misconception: 'Students often believe that the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell.' },
                { id: 'b', prompt: 'A researcher adds a specific inhibitor that blocks electron transfer from cytochrome c to Complex IV in isolated mitochondria supplied with NADH and ADP.', answer: 'oxygen consumption, (',
                  options: ['oxygen consumption, (', 'the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell'],
                  hint: 'If stuck, review the summary tables in nodes c11_bio_cbse_12_002, c11_bio_cbse_12_004.',
                  misconception: 'Students often believe that the 38 ATP per glucose figure is a fixed, universal yield achieved in every cell.' }
          ],
            remediations: { 'the-38-atp-per-glucose': { steps: ['Revisit node c11_bio_cbse_12_007 (Respiratory Balance Sheet) and list the four explicit assumptions stated in NCERT.', 'Draw the two NADH shuttles (malate-aspartate vs glycerol-3-phosphate) and trace how each delivers electrons to the ETC.', 'Calculate ATP yield for one glucose in liver (malate-aspartate shuttle) vs skeletal muscle (glycerol-3-phosphate.', 'Read NCERT lines "these calculations can be made only on certain assumptions...'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
