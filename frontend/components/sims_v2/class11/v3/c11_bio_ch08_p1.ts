import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch08_p1: SimDef = {
    id: 'v3_c11_bio_ch08_p1',
    title: 'Cell: The Unit of Life',
    subtitle: 'Shrink to the scale where everything alive is made of the same basic machine.',
    classLevel: 11, subject: 'biology', topic: 'Cell: The Unit of Life · Part 1/2',
    chapters: ['c11_bio_ch08'],
    nodeIds: ['c11_bio_cbse_08_001', 'c11_bio_cbse_08_002', 'c11_bio_cbse_08_003', 'c11_bio_cbse_08_004', 'c11_bio_cbse_08_005', 'c11_bio_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a microscopist on their first day in a research lab', intro: 'Under the lens, a plant cell and a cheek cell look like different worlds — and run on the same parts list. Your job: map what\'s inside.', goal: 'Identify every organelle, what it does, and what breaks when it fails.' },
    discovery: {
        question: 'Your body makes ~2 million new cells every second — yet you stay \'you\'. What keeps billions of divisions faithful?',
        options: ['DNA inside each cell carries the same instructions', 'Cells copy from a master template stored in the brain', 'The body replaces mistakes instantly', 'Cells don\'t actually copy — they grow'],
        answer: 'DNA inside each cell carries the same instructions',
        hook: 'Every cell carries the full instruction set — fidelity isn\'t enforced from outside, it\'s written into every copy.',
    },
    teaching: [
        { title: 'Cell Theory: Postulates and Significance', text: 'Cell theory is the foundational biological principle stating that all living organisms are composed of cells and cell products, and that all cells arise from pre-existing cells through division.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_08_001', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'On the cell explorer: zoom into a cell and identify organelles by function — which one makes energy? which packages proteins?',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_001', title: 'Cell Theory: Postulates and Significance',
          caseStudy: { intro: 'Look at a drop of pond water under a microscope — you see tiny moving organisms (Paramecium, Euglena) each carrying out all life functions independently.',
            decisions: [{ prompt: 'State the two postulates of modern cell theory as formulated after Virchow\'s contribution, using the exact biological terminology expected.', options: [
                { text: 'The two postulates are: (i) All living organisms are composed of cells and products of', outcome: 'The two postulates are: (i) All living organisms are composed of cells and products of cells.' },
                { text: 'products of cells', outcome: 'Not quite — Students believe "cell theory says all living things are made of cells, so viruses are non-living.', reveals: 'cell-theory-says-all-living' },
                { text: 'cell products', outcome: 'Not quite — Students believe "cell theory says all living things are made of cells, so viruses are non-living.', reveals: 'cell-theory-says-all-living' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_003', title: 'Cell Membrane: Fluid Mosaic Model',
          caseStudy: { intro: 'Imagine a drop of blood under a microscope — red blood cells maintain their biconcave shape while squeezing through capillaries narrower than their diameter.',
            decisions: [{ prompt: 'List the four major molecular components of the plasma membrane in the Fluid Mosaic Model and state the orientation of phospholipids in the.', options: [
                { text: 'The four components are: (1) Phospholipids', outcome: 'The four components are: (1) Phospholipids — arranged in a bilayer with polar heads facing aqueous.' },
                { text: 'proteins form a layer on both sides', outcome: 'Not quite — Students believe "fluid mosaic" means the membrane is a homogeneous liquid where all components.', reveals: 'fluid-mosaic-means-the-membrane' },
                { text: 'sandwich model', outcome: 'Not quite — Students believe "fluid mosaic" means the membrane is a homogeneous liquid where all components.', reveals: 'fluid-mosaic-means-the-membrane' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_004', title: 'Cell Wall: Structure and Function',
          caseStudy: { intro: 'Observe a raw mango slice and a ripe mango slice: the raw one is hard and crunchy, the ripe one is soft and yielding.',
            decisions: [{ prompt: 'What are the three distinct layers of a mature plant cell wall, listed from outermost to innermost, and what is the primary chemical.', options: [
                { text: 'The three layers are: middle lamella (outermost), primary wall, and secondary wall', outcome: 'The three layers are: middle lamella (outermost), primary wall, and secondary wall (innermost.' },
                { text: 'brick wall', outcome: 'Not quite — Students think the cell wall is a static, inert "brick wall" made only of cellulose, and that.', reveals: 'the-cell-wall-is-a' },
                { text: 'middle lamella is made of cellulose or that secondary wall is outermost', outcome: 'Not quite — Students think the cell wall is a static, inert "brick wall" made only of cellulose, and that.', reveals: 'the-cell-wall-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_005', title: 'Endomembrane System: ER, Golgi, Lysosomes',
          caseStudy: { intro: 'Imagine you eat a spoonful of sugar: your pancreatic beta cells must rapidly produce and secrete insulin, a protein hormone, into your bloodstream.',
            decisions: [{ prompt: 'Name the two types of endoplasmic reticulum and state one major function of each.', options: [
                { text: 'Rough ER (RER) has ribosomes on its cytoplasmic surface and is the site of protein', outcome: 'Rough ER (RER) has ribosomes on its cytoplasmic surface and is the site of protein synthesis for.' },
                { text: 'RER makes lipids', outcome: 'Not quite — Students often believe the smooth ER and rough ER are physically separate organelles, or that the.', reveals: 'the-smooth-er-and-rough' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_006', title: 'Mitochondria and Plastids',
          caseStudy: { intro: 'When you sprint up the stairs to your third-floor classroom, your leg muscles burn — that burning sensation comes from mitochondria working overtime to supply.',
            decisions: [{ prompt: 'State the precise sedimentation coefficient of ribosomes found in the mitochondrial matrix and chloroplast stroma, and explain why this.', options: [
                { text: 'The ribosomes in both mitochondrial matrix and chloroplast stroma are 70S (composed of', outcome: 'The ribosomes in both mitochondrial matrix and chloroplast stroma are 70S (composed of 50S and 30S.' },
                { text: 'plant mitochondria', outcome: 'Not quite — Students believe chloroplasts are "plant mitochondria" — i.e., they think chloroplasts perform.', reveals: 'chloroplasts-are-plant-mitochondria-i' },
                { text: '80S ribosomes', outcome: 'Not quite — Students believe chloroplasts are "plant mitochondria" — i.e., they think chloroplasts perform.', reveals: 'chloroplasts-are-plant-mitochondria-i' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_08_002', title: 'Identify each idea',
          dissect: { specimen: 'Cell: The Unit of Life · Part 1/2', spots: [
            { id: 's1', label: 'Cell Theory Postulates and Significance', prompt: 'Which idea is this? — Cell theory is the foundational biological principle stating that all living organisms.', answer: 'Cell Theory Postulates and Significance', options: ['Cell Theory Postulates and Significance', 'Prokaryotic vs Eukaryotic Cells', 'Cell Membrane Fluid Mosaic Model', 'Cell Wall Structure and Function'] },
            { id: 's2', label: 'Prokaryotic vs Eukaryotic Cells', prompt: 'Which idea is this? — Prokaryotic cells are cells lacking a true membrane-bound nucleus and membrane-bound.', answer: 'Prokaryotic vs Eukaryotic Cells', options: ['Prokaryotic vs Eukaryotic Cells', 'Cell Theory Postulates and Significance', 'Cell Membrane Fluid Mosaic Model', 'Cell Wall Structure and Function'] },
            { id: 's3', label: 'Cell Membrane Fluid Mosaic Model', prompt: 'Which idea is this? — The Fluid Mosaic Model describes the plasma membrane as a dynamic, quasi-fluid.', answer: 'Cell Membrane Fluid Mosaic Model', options: ['Cell Membrane Fluid Mosaic Model', 'Cell Theory Postulates and Significance', 'Prokaryotic vs Eukaryotic Cells', 'Cell Wall Structure and Function'] },
            { id: 's4', label: 'Cell Wall Structure and Function', prompt: 'Which idea is this? — The cell wall is a non-living, rigid, extracellular matrix that surrounds the plasma.', answer: 'Cell Wall Structure and Function', options: ['Cell Wall Structure and Function', 'Cell Theory Postulates and Significance', 'Prokaryotic vs Eukaryotic Cells', 'Cell Membrane Fluid Mosaic Model'] },
            { id: 's5', label: 'Endomembrane System ER Golgi Lysosomes', prompt: 'Which idea is this? — The endomembrane system is a coordinated network of membrane-bound organelles—endoplasmic.', answer: 'Endomembrane System ER Golgi Lysosomes', options: ['Endomembrane System ER Golgi Lysosomes', 'Cell Theory Postulates and Significance', 'Prokaryotic vs Eukaryotic Cells', 'Cell Membrane Fluid Mosaic Model'] },
            { id: 's6', label: 'Mitochondria and Plastids', prompt: 'Which idea is this? — Mitochondria are double-membrane-bound organelles present in almost all eukaryotic cells.', answer: 'Mitochondria and Plastids', options: ['Mitochondria and Plastids', 'Cell Theory Postulates and Significance', 'Prokaryotic vs Eukaryotic Cells', 'Cell Membrane Fluid Mosaic Model'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_001', title: 'A real-world call',
          caseStudy: { intro: 'A stem-cell treatment could repair damaged tissue — but the research uses cells whose origins some communities object to. The science works; the ethics of how it got here are contested.',
            decisions: [{ prompt: 'Should a treatment be judged by its source or its result?', options: [
                { text: 'The result — healing is the highest value', outcome: 'The compassionate argument; it sidesteps that how research happens shapes what research becomes acceptable.' },
                { text: 'The source — some means corrupt any end', outcome: 'The deontological position; it protects research ethics but tells a patient the principle outweighs their recovery.' },
                { text: 'Both — and \'alternatives exist\' changes the answer', outcome: 'The practical resolution — when another path exists, prefer it; when none does, the question gets harder honestly.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your biology club is designing a \'life detector\' badge for a science exhibition. A member writes the test as: \'Entity is living iff made of cells; viruses aren\'t made of cells, therefore viruses are simply non-living chemicals.\' Another member says that\'s a circular definition, not a functional criterion.',
            decisions: [{ prompt: 'What makes viruses exceptions to cell theory — in functional terms?', options: [
                { text: 'Viruses fail the functional test: no ribosomes (can\'t synthesise proteins), no mitochondria (can\'t make ATP), no independent metabolism or homeostasis, and no self-reproduction — they must hijack a host cell\'s machinery to replicate. \'Acellular\' is the description; lack of metabolic autonomy is the reason.', outcome: 'Cell theory marks the cell as the smallest unit that can independently run all life processes — viruses are exceptions because they can\'t, not merely because they lack compartments.' },
                { text: 'The first member is right — \'made of cells\' is the definition, so acellular means non-living; no further argument is needed.', outcome: 'That\'s circular: it names the boundary without explaining it — the theory\'s power is that the cell is the smallest independently functional unit.', reveals: 'acellular-equals-nonliving-tautology' },
                { text: 'Viruses are actually cells — just very small ones — so they follow cell theory like bacteria do.', outcome: 'Viruses have no cytoplasm, ribosomes or metabolic machinery; calling them tiny cells ignores why they can only replicate inside a host.', reveals: 'viruses-are-tiny-cells' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You\'re a colony of 37 trillion specialists — every organelle you just met is a worker keeping you alive right now.',
            decisions: [{ prompt: 'What comes next? Cell: The Unit of Life · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Cell: The Unit of Life · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_001', difficulty: 'standard',
          question: 'Cell theory is the foundational biological principle stating that all living.',
          hint: 'Revisit Class 9 "Cell Theory: Postulates by Schleiden and Schwann" (c9_bio_ch1_2) — focus.',
          misconception: 'Students believe "cell theory says all living things are made of cells, so viruses are non-living because they aren\'t.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Viruses are living because they contain genetic material and evolve.', answer: 'Viruses are acellular',
                  options: ['Viruses are acellular', 'genetic information', 'cellular organisation'],
                  hint: 'Revisit Class 9 "Cell Theory: Postulates by Schleiden and Schwann" (c9_bio_ch1_2) — focus on the.',
                  misconception: 'Students believe "cell theory says all living things are made of cells, so viruses are non-living because they aren\'t made of cells" — but.' }
          ],
            remediations: { 'cell-theory-says-all-living': { steps: ['Have the student list 7 life processes (MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion.', 'For each, ask "Can a virus do this independently?"', 'For each "no", identify which cellular component is missing (ribosomes → protein synthesis; mitochondria → ATP.', 'Conclude: cell theory defines the *minimal functional unit* — viruses lack the machinery for independent life processes.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_002', difficulty: 'standard',
          question: 'Prokaryotic cells are cells lacking a true membrane-bound nucleus and.',
          hint: 'Review Class 9 Node c9_bio_ch1_5 (Nucleus: Structure and Functions) and c9_bio_ch1_6.',
          misconception: 'Students believe "prokaryotic cells are simpler and therefore primitive/less evolved than eukaryotic cells." This leads.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Prokaryotic cells are cells lacking a true membrane-bound nucleus and membrane-bound',
                  options: ['Prokaryotic cells are cells lacking a true membrane-bound nucleus and membrane-bound', 'Cell theory is the foundational biological principle stating that all living organisms', 'The Fluid Mosaic Model describes the plasma membrane as a dynamic, quasi-fluid', 'The cell wall is a non-living, rigid, extracellular matrix that surrounds the plasma'],
                  hint: 'Review Class 9 Node c9_bio_ch1_5 (Nucleus: Structure and Functions) and c9_bio_ch1_6 (Cytoplasm and.',
                  misconception: 'Students believe "prokaryotic cells are simpler and therefore primitive/less evolved than eukaryotic cells." This leads them to think.' }
          ],
            remediations: { 'prokaryotic-cells-are-simpler-and': { steps: ['Have the student list 5 metabolic processes (e.g., glycolysis, Krebs cycle, photosynthesis, nitrogen fixation, ATP.', 'Map each process to a specific structure - plasma membrane, cytoplasm, thylakoids, nucleoid - showing prokaryotes use.', 'Compare generation times - E. coli divides every 20 minutes under optimal conditions, while eukaryotic cells take hours.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "prokaryotic cells are simpler and therefore primitive/less evolved than eukaryotic cells." This leads.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Since mitochondrial and chloroplast ribosomes are 70S like prokaryotic ribosomes, mitochondria and chloroplasts must be prokaryotic.', answer: 'The reasoning is partially valid but incomplete',
                  options: ['The reasoning is partially valid but incomplete', 'prokaryotic-like features', 'being a prokaryote'],
                  hint: 'Review Class 9 Node c9_bio_ch1_5 (Nucleus: Structure and Functions) and c9_bio_ch1_6 (Cytoplasm and.',
                  misconception: 'Students believe "prokaryotic cells are simpler and therefore primitive/less evolved than eukaryotic cells." This leads them to think.' }
          ],
            remediations: { 'prokaryotic-cells-are-simpler-and': { steps: ['Have the student list 5 metabolic processes (e.g., glycolysis, Krebs cycle, photosynthesis, nitrogen fixation, ATP.', 'Map each process to a specific structure - plasma membrane, cytoplasm, thylakoids, nucleoid - showing prokaryotes use.', 'Compare generation times - E. coli divides every 20 minutes under optimal conditions, while eukaryotic cells take hours.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_003', difficulty: 'standard',
          question: 'The Fluid Mosaic Model describes the plasma membrane as a dynamic, quasi-fluid.',
          hint: 'Review Class 9 "Cell Membrane: Structure and Selective Permeability" (c9_bio_ch1_3) and.',
          misconception: 'Students believe "fluid mosaic" means the membrane is a homogeneous liquid where all components drift freely like.',
          parts: [
                { id: 'a', prompt: 'List the four major molecular components of the plasma membrane in the Fluid Mosaic Model and state the orientation of phospholipids in the bilayer.', answer: 'The four components are: (1) Phospholipids',
                  options: ['The four components are: (1) Phospholipids', 'proteins form a layer on both sides', 'sandwich model', 'fluid mosaic'],
                  hint: 'Review Class 9 "Cell Membrane: Structure and Selective Permeability" (c9_bio_ch1_3) and Chemistry.',
                  misconception: 'Students believe "fluid mosaic" means the membrane is a homogeneous liquid where all components drift freely like molecules in water.' },
                { id: 'b', prompt: 'A researcher treats human red blood cells with an enzyme that cleaves carbohydrate moieties from membrane glycoproteins.', answer: 'cell-cell recognition and (',
                  options: ['cell-cell recognition and (', 'fluid mosaic'],
                  hint: 'Review Class 9 "Cell Membrane: Structure and Selective Permeability" (c9_bio_ch1_3) and Chemistry.',
                  misconception: 'Students believe "fluid mosaic" means the membrane is a homogeneous liquid where all components drift freely like molecules in water.' }
          ],
            remediations: { 'fluid-mosaic-means-the-membrane': { steps: ['Revisit the FRAP experiment concept — watch a 2-minute animation of fluorescence recovery (search "FRAP membrane.', 'Draw a membrane cross-section showing three barriers to free diffusion: (a) lipid raft (cholesterol-rich), (b).', 'For each barrier, name one protein whose movement it restricts (e.g., GPI-anchored protein in raft; Band 3 in RBC.', 'Explain to a peer why "fluid" ≠ "homogeneous" using the analogy of a crowded dance floor with VIP sections and barriers.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_004', difficulty: 'standard',
          question: 'The cell wall is a non-living, rigid, extracellular matrix that surrounds the.',
          hint: 'If confused about why plant cells need a wall but animal cells do not, revisit the.',
          misconception: 'Students think the cell wall is a static, inert "brick wall" made only of cellulose, and that plasmodesmata are simple.',
          parts: [
                { id: 'a', prompt: 'A researcher treats onion epidermal cells with pectinase (degrades pectin) and cellulase (degrades cellulose) separately.', answer: 'Pectinase: (a) cells become spherical (loss of shape)',
                  options: ['Pectinase: (a) cells become spherical (loss of shape)', 'brick wall'],
                  hint: 'If confused about why plant cells need a wall but animal cells do not, revisit the plasmolysis.',
                  misconception: 'Students think the cell wall is a static, inert "brick wall" made only of cellulose, and that plasmodesmata are simple pores.' }
          ],
            remediations: { 'the-cell-wall-is-a': { steps: ['Re-examine the onion peel plasmolysis observation from c11_bio_cbse_08_003 — note the wall remains intact while.', 'Prepare temporary mounts of three tissues: (a) young pumpkin cortex (parenchyma), (b) celery petiole strings.', 'Compare wall thickness, layering, and color (lignin stains red).', 'Correlate with function: thin primary walls = growth/storage; thick lignified secondary walls = support/conduction.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_005', difficulty: 'standard',
          question: 'The endomembrane system is a coordinated network of membrane-bound.',
          hint: 'If stuck, review Class 9 nodes c9_bio_ch1_7 (ER) and c9_bio_ch1_8 (Golgi) for basic.',
          misconception: 'Students often believe the smooth ER and rough ER are physically separate organelles, or that the Golgi apparatus.',
          parts: [
                { id: 'a', prompt: 'A researcher treats a secretory cell with a drug that prevents vesicle budding from the ER.', answer: 'lysosomal enzyme activity inside lysosomes, (',
                  options: ['lysosomal enzyme activity inside lysosomes, (', 'all ER functions depend on vesicular transport'],
                  hint: 'If stuck, review Class 9 nodes c9_bio_ch1_7 (ER) and c9_bio_ch1_8 (Golgi) for basic definitions.',
                  misconception: 'Students often believe the smooth ER and rough ER are physically separate organelles, or that the Golgi apparatus *creates* lysosomal.' }
          ],
            remediations: { 'the-smooth-er-and-rough': { steps: ['Revisit the **vesicular transport pathway**: Draw a flowchart: DNA → mRNA → Ribosome on RER → ER lumen → Transport.', 'Use a physical analogy: ER = factory floor (synthesis), Golgi = packaging & labeling department, Lysosomes = recycling.', 'Watch an animation of GFP-tagged protein trafficking (e.g., from NCERT e-content).', 'Practice labeling a diagram of the secretory pathway with arrows showing directionality.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_006', difficulty: 'standard',
          question: 'Mitochondria are double-membrane-bound organelles present in almost all.',
          hint: 'Revisit c11_bio_cbse_08_002 (Prokaryotic vs Eukaryotic Cells) — specifically the table.',
          misconception: 'Students believe chloroplasts are "plant mitochondria" — i.e., they think chloroplasts perform cellular respiration.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since both mitochondria and chloroplasts have double membranes, the inner membrane of mitochondria is equivalent to the thylakoid membrane.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'plant mitochondria', 'chloroplasts are "plant mitochondria"'],
                  hint: 'Revisit c11_bio_cbse_08_002 (Prokaryotic vs Eukaryotic Cells) — specifically the table comparing.',
                  misconception: 'Students believe chloroplasts are "plant mitochondria" — i.e., they think chloroplasts perform cellular respiration in plants while.' },
                { id: 'b', prompt: 'Predict the effect on cellular ATP levels if a specific inhibitor blocks the mitochondrial outer membrane porin channels (VDAC) in a hepatocyte actively.', answer: 'ATP levels in the cytosol would decrease',
                  options: ['ATP levels in the cytosol would decrease', 'no effect because mitochondria make their own ATP', 'plant mitochondria', 'chloroplasts are "plant mitochondria"'],
                  hint: 'Revisit c11_bio_cbse_08_002 (Prokaryotic vs Eukaryotic Cells) — specifically the table comparing.',
                  misconception: 'Students believe chloroplasts are "plant mitochondria" — i.e., they think chloroplasts perform cellular respiration in plants while.' }
          ],
            remediations: { 'chloroplasts-are-plant-mitochondria-i': { steps: ['Observe a prepared slide of maize root tip (non-photosynthetic tissue) stained with Janus green — mitochondria.', 'Measure O₂ consumption in dark-adapted spinach leaves using a respirometer — O₂ uptake continues in darkness, proving.', 'Construct a Venn diagram comparing inputs/outputs of mitochondria (glucose + O₂ → CO₂ + H₂O + ATP) vs chloroplasts (CO₂.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
