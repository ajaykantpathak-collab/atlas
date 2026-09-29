import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch08_p2: SimDef = {
    id: 'v3_c11_bio_ch08_p2',
    title: 'Cell: The Unit of Life',
    subtitle: 'Shrink to the scale where everything alive is made of the same basic machine.',
    classLevel: 11, subject: 'biology', topic: 'Cell: The Unit of Life',
    chapters: ['c11_bio_ch08'],
    nodeIds: ['c11_bio_cbse_08_007', 'c11_bio_cbse_08_008', 'c11_bio_cbse_08_009', 'c11_bio_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a microscopist on their first day in a research lab', intro: 'Under the lens, a plant cell and a cheek cell look like different worlds — and run on the same parts list. Your job: map what\'s inside.', goal: 'Identify every organelle, what it does, and what breaks when it fails.' },
    discovery: {
        question: 'Your body makes ~2 million new cells every second — yet you stay \'you\'. What keeps billions of divisions faithful?',
        options: ['DNA inside each cell carries the same instructions', 'Cells copy from a master template stored in the brain', 'The body replaces mistakes instantly', 'Cells don\'t actually copy — they grow'],
        answer: 'DNA inside each cell carries the same instructions',
        hook: 'Every cell carries the full instruction set — fidelity isn\'t enforced from outside, it\'s written into every copy.',
    },
    teaching: [
        { title: 'Ribosomes and Cytoskeleton', text: 'Ribosomes are non-membranous ribonucleoprotein particles composed of ribosomal RNA (rRNA) and proteins that serve as the universal site of protein synthesis in all living cells.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_08_007', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'On the cell explorer: zoom into a cell and identify organelles by function — which one makes energy? which packages proteins?',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_007', title: 'Ribosomes and Cytoskeleton',
          caseStudy: { intro: 'Imagine you are eating a bowl of rajma (kidney beans) – rich in plant proteins.',
            decisions: [{ prompt: 'What are the sedimentation coefficients (S values) of the complete ribosome and its two subunits in prokaryotes and eukaryotes?', options: [
                { text: 'Prokaryotes: 70S ribosome made of 50S and 30S subunits', outcome: 'Prokaryotes: 70S ribosome made of 50S and 30S subunits. Eukaryotes: 80S ribosome made of 60S and.' },
                { text: '70S+80S=150S or confusing subunit values', outcome: 'Not quite — Students often think the "S" in 70S/80S stands for "size" in a simple additive way (e.g.', reveals: 'the-s-in-70s-80s' },
                { text: 'the "S" in 70S/80S stands for "size" in a simple additive way (e', outcome: 'Not quite — Students often think the "S" in 70S/80S stands for "size" in a simple additive way (e.g.', reveals: 'the-s-in-70s-80s' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_008', title: 'Nucleus: Structure and Chromatin',
          caseStudy: { intro: 'Observe an onion root tip slide under a compound microscope - you see distinct dark-stained bodies (chromosomes) in dividing cells but a faint network.',
            decisions: [{ prompt: 'Name the two membranes that constitute the nuclear envelope and state the width of the perinuclear space between them.', options: [
                { text: 'The nuclear envelope consists of an outer nuclear membrane and an inner nuclear membrane', outcome: 'The nuclear envelope consists of an outer nuclear membrane and an inner nuclear membrane with.' },
                { text: 'single membrane', outcome: 'Not quite — Students believe chromatin and chromosomes are chemically different substances - they think.', reveals: 'chromatin-and-chromosomes-are-chemically' },
                { text: 'no space', outcome: 'Not quite — Students believe chromatin and chromosomes are chemically different substances - they think.', reveals: 'chromatin-and-chromosomes-are-chemically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_009', title: 'Centrosome and Vacuoles',
          caseStudy: { intro: 'Observe a drop of pond water under a microscope — you see *Paramecium* rhythmically expanding and contracting a clear bladder: that is a contractile vacuole.',
            decisions: [{ prompt: 'Name the protein subunit that polymerizes into the microtubule triplets of a centriole and state the exact arrangement (number of triplets.', options: [
                { text: 'The subunit is α/β-tubulin heterodimer', outcome: 'The subunit is α/β-tubulin heterodimer; a mature centriole has nine microtubule triplets arranged.' },
                { text: 'actin filaments', outcome: 'Not quite — Students believe "vacuoles are just storage bags" and "centrosomes are present in all eukaryotes.".', reveals: 'vacuoles-are-just-storage-bags' },
                { text: '9 doublets', outcome: 'Not quite — Students believe "vacuoles are just storage bags" and "centrosomes are present in all eukaryotes.".', reveals: 'vacuoles-are-just-storage-bags' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_010', title: 'Microbodies and Cell Inclusions',
          caseStudy: { intro: 'Observe a germinating castor seed (common in Indian kitchens) – the oily endosperm shrinks as the seedling grows.',
            decisions: [{ prompt: 'Define microbodies and name the two main types found in plant cells, stating one key function of each.', options: [
                { text: 'Microbodies are small, single-membrane-bound vesicles containing oxidative enzymes', outcome: 'Microbodies are small, single-membrane-bound vesicles containing oxidative enzymes; the two main.' },
                { text: 'microbodies are lysosomes', outcome: 'Not quite — Students often think microbodies are "small lysosomes" because both are single-membrane vesicles.', reveals: 'microbodies-are-small-lysosomes-because' },
                { text: 'glyoxysomes do photosynthesis', outcome: 'Not quite — Students often think microbodies are "small lysosomes" because both are single-membrane vesicles.', reveals: 'microbodies-are-small-lysosomes-because' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_08_008', title: 'Identify each idea',
          dissect: { specimen: 'Cell: The Unit of Life · Part 2/2', spots: [
            { id: 's1', label: 'Ribosomes and Cytoskeleton', prompt: 'Which idea is this? — Ribosomes are non-membranous ribonucleoprotein particles composed of ribosomal RNA (rRNA).', answer: 'Ribosomes and Cytoskeleton', options: ['Ribosomes and Cytoskeleton', 'Nucleus Structure and Chromatin', 'Centrosome and Vacuoles', 'Microbodies and Cell Inclusions'] },
            { id: 's2', label: 'Nucleus Structure and Chromatin', prompt: 'Which idea is this? — The nucleus is a double membrane-bound organelle that houses the genetic material (DNA).', answer: 'Nucleus Structure and Chromatin', options: ['Nucleus Structure and Chromatin', 'Ribosomes and Cytoskeleton', 'Centrosome and Vacuoles', 'Microbodies and Cell Inclusions'] },
            { id: 's3', label: 'Centrosome and Vacuoles', prompt: 'Which idea is this? — Centrosome is a non-membrane-bound organelle in animal cells comprising two perpendicular.', answer: 'Centrosome and Vacuoles', options: ['Centrosome and Vacuoles', 'Ribosomes and Cytoskeleton', 'Nucleus Structure and Chromatin', 'Microbodies and Cell Inclusions'] },
            { id: 's4', label: 'Microbodies and Cell Inclusions', prompt: 'Which idea is this? — Microbodies are small, single-membrane-bound organelles (e.g., peroxisomes, glyoxysomes).', answer: 'Microbodies and Cell Inclusions', options: ['Microbodies and Cell Inclusions', 'Ribosomes and Cytoskeleton', 'Nucleus Structure and Chromatin', 'Centrosome and Vacuoles'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_007', title: 'A real-world call',
          caseStudy: { intro: 'A stem-cell treatment could repair damaged tissue — but the research uses cells whose origins some communities object to. The science works; the ethics of how it got here are contested.',
            decisions: [{ prompt: 'Should a treatment be judged by its source or its result?', options: [
                { text: 'The result — healing is the highest value', outcome: 'The compassionate argument; it sidesteps that how research happens shapes what research becomes acceptable.' },
                { text: 'The source — some means corrupt any end', outcome: 'The deontological position; it protects research ethics but tells a patient the principle outweighs their recovery.' },
                { text: 'Both — and \'alternatives exist\' changes the answer', outcome: 'The practical resolution — when another path exists, prefer it; when none does, the question gets harder honestly.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your biology club is designing a \'life detector\' badge for a science exhibition. A member writes the test as: \'Entity is living iff made of cells; viruses aren\'t made of cells, therefore viruses are simply non-living chemicals.\' Another member says that\'s a circular definition, not a functional criterion.',
            decisions: [{ prompt: 'What makes viruses exceptions to cell theory — in functional terms?', options: [
                { text: 'Viruses fail the functional test: no ribosomes (can\'t synthesise proteins), no mitochondria (can\'t make ATP), no independent metabolism or homeostasis, and no self-reproduction — they must hijack a host cell\'s machinery to replicate. \'Acellular\' is the description; lack of metabolic autonomy is the reason.', outcome: 'Cell theory marks the cell as the smallest unit that can independently run all life processes — viruses are exceptions because they can\'t, not merely because they lack compartments.' },
                { text: 'The first member is right — \'made of cells\' is the definition, so acellular means non-living; no further argument is needed.', outcome: 'That\'s circular: it names the boundary without explaining it — the theory\'s power is that the cell is the smallest independently functional unit.', reveals: 'acellular-equals-nonliving-tautology' },
                { text: 'Viruses are actually cells — just very small ones — so they follow cell theory like bacteria do.', outcome: 'Viruses have no cytoplasm, ribosomes or metabolic machinery; calling them tiny cells ignores why they can only replicate inside a host.', reveals: 'viruses-are-tiny-cells' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_08_010', title: 'You made it',
          caseStudy: { intro: 'You\'re a colony of 37 trillion specialists — every organelle you just met is a worker keeping you alive right now.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_007', difficulty: 'standard',
          question: 'Ribosomes are non-membranous ribonucleoprotein particles composed of ribosomal.',
          hint: 'Review the prokaryotic vs eukaryotic cell comparison (c11_bio_cbse_08_002) and the.',
          misconception: 'Students often think the "S" in 70S/80S stands for "size" in a simple additive way (e.g., 50S+30S=80S) and that.',
          parts: [
                { id: 'a', prompt: 'What are the sedimentation coefficients (S values) of the complete ribosome and its two subunits in prokaryotes and eukaryotes?', answer: 'Prokaryotes: 70S ribosome made of 50S and 30S subunits',
                  options: ['Prokaryotes: 70S ribosome made of 50S and 30S subunits', '70S+80S=150S or confusing subunit values', 'the "S" in 70S/80S stands for "size" in a simple additive way (e'],
                  hint: 'Review the prokaryotic vs eukaryotic cell comparison (c11_bio_cbse_08_002) and the endomembrane.',
                  misconception: 'Students often think the "S" in 70S/80S stands for "size" in a simple additive way (e.g., 50S+30S=80S) and that sedimentation coefficient.' },
                { id: 'b', prompt: 'Why do mitochondrial ribosomes in eukaryotic cells resemble prokaryotic (70S) ribosomes rather than cytoplasmic (80S) ribosomes?', answer: 'Mitochondria originated from an endosymbiotic prokaryote',
                  options: ['Mitochondria originated from an endosymbiotic prokaryote', 'mitochondria are smaller so they have smaller ribosomes', 'ribosome size correlates only with organelle size', 'the "S" in 70S/80S stands for "size" in a simple additive way (e'],
                  hint: 'Review the prokaryotic vs eukaryotic cell comparison (c11_bio_cbse_08_002) and the endomembrane.',
                  misconception: 'Students often think the "S" in 70S/80S stands for "size" in a simple additive way (e.g., 50S+30S=80S) and that sedimentation coefficient.' },
                { id: 'c', prompt: 'A drug called cytochalasin D binds to actin monomers and prevents microfilament polymerization.', answer: 'cytoplasmic streaming in Chara internodal cells and (',
                  options: ['cytoplasmic streaming in Chara internodal cells and (', 'the "S" in 70S/80S stands for "size" in a simple additive way (e'],
                  hint: 'Review the prokaryotic vs eukaryotic cell comparison (c11_bio_cbse_08_002) and the endomembrane.',
                  misconception: 'Students often think the "S" in 70S/80S stands for "size" in a simple additive way (e.g., 50S+30S=80S) and that sedimentation coefficient.' }
          ],
            remediations: { 'the-s-in-70s-80s': { steps: ['Revisit the concept of sedimentation coefficient using a physical analogy: two objects of same mass but different.', 'ball) fall at different speeds in air – similarly, subunits sediment at rates not strictly proportional to mass.', 'Watch an animation of ribosome subunit association/dissociation (e.g., from NCERT e-content) to visualize that 50S+30S.', 'Compare prokaryotic and eukaryotic ribosome subunit compositions side-by-side in a table, emphasizing that.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "S" in 70S/80S stands for "size" in a simple additive way (e.g., 50S+30S=80S) and that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Because ribosomes lack a membrane, they should not be classified as organelles."', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'the "S" in 70S/80S stands for "size" in a simple additive way (e'],
                  hint: 'Review the prokaryotic vs eukaryotic cell comparison (c11_bio_cbse_08_002) and the endomembrane.',
                  misconception: 'Students often think the "S" in 70S/80S stands for "size" in a simple additive way (e.g., 50S+30S=80S) and that sedimentation coefficient.' }
          ],
            remediations: { 'the-s-in-70s-80s': { steps: ['Revisit the concept of sedimentation coefficient using a physical analogy: two objects of same mass but different.', 'ball) fall at different speeds in air – similarly, subunits sediment at rates not strictly proportional to mass.', 'Watch an animation of ribosome subunit association/dissociation (e.g., from NCERT e-content) to visualize that 50S+30S.', 'Compare prokaryotic and eukaryotic ribosome subunit compositions side-by-side in a table, emphasizing that.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_008', difficulty: 'standard',
          question: 'The nucleus is a double membrane-bound organelle that houses the genetic.',
          hint: 'If stuck, revisit Class 12 molecular basis chapter (DNA packaging) or Class 9 nucleus.',
          misconception: 'Students believe chromatin and chromosomes are chemically different substances - they think "chromatin becomes.',
          parts: [
                { id: 'a', prompt: 'Explain why the nucleolus is not considered a membrane-bound organelle despite being a distinct spherical body within the nucleus.', answer: 'The nucleolus lacks a bounding membrane',
                  options: ['The nucleolus lacks a bounding membrane', 'nucleolus is in nucleus', 'chromatin becomes chromosomes'],
                  hint: 'If stuck, revisit Class 12 molecular basis chapter (DNA packaging) or Class 9 nucleus basics.',
                  misconception: 'Students believe chromatin and chromosomes are chemically different substances - they think "chromatin becomes chromosomes" like water.' },
                { id: 'b', prompt: 'A student observes a human karyotype and identifies a chromosome with one very long arm and one extremely short arm.', answer: 'This is an acrocentric chromosome',
                  options: ['This is an acrocentric chromosome', 'near the end', 'at the end', 'chromatin becomes chromosomes'],
                  hint: 'If stuck, revisit Class 12 molecular basis chapter (DNA packaging) or Class 9 nucleus basics.',
                  misconception: 'Students believe chromatin and chromosomes are chemically different substances - they think "chromatin becomes chromosomes" like water.' }
          ],
            remediations: { 'chromatin-and-chromosomes-are-chemically': { steps: ['Use a spring coil analogy - same spring (DNA-histone), different extension states (chromatin extended, chromosome.', 'Show time-lapse video of live-cell imaging (GFP-histone) demonstrating real-time condensation in prophase and.', 'Build a physical model with string (DNA) and beads (histones) to demonstrate how looping and coiling creates.', 'Clarify centromere vs kinetochore using the "landing pad vs landing gear" analogy - centromere is the permanent DNA.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_009', difficulty: 'standard',
          question: 'Centrosome is a non-membrane-bound organelle in animal cells comprising two.',
          hint: 'If confused about tonoplast transport, revisit "Cell Membrane: Fluid Mosaic Model".',
          misconception: 'Students believe "vacuoles are just storage bags" and "centrosomes are present in all eukaryotes." Specifically, they.',
          parts: [
                { id: 'a', prompt: 'Name the protein subunit that polymerizes into the microtubule triplets of a centriole and state the exact arrangement (number of triplets and their angular.', answer: 'The subunit is α/β-tubulin heterodimer',
                  options: ['The subunit is α/β-tubulin heterodimer', 'actin filaments', '9 doublets', 'vacuoles are just storage bags'],
                  hint: 'If confused about tonoplast transport, revisit "Cell Membrane: Fluid Mosaic Model".',
                  misconception: 'Students believe "vacuoles are just storage bags" and "centrosomes are present in all eukaryotes." Specifically, they think plant vacuoles.' },
                { id: 'b', prompt: 'In a hypotonic medium, a *Chlamydomonas* cell (with a contractile vacuole) and a mature plant mesophyll cell (with a large central vacuole) both experience.', answer: 'The *Chlamydomonas* cell will burst first',
                  options: ['The *Chlamydomonas* cell will burst first', 'vacuoles are just storage bags', 'centrosomes are present in all eukaryotes', '"vacuoles are just storage bags" and "centrosomes are present in all eukaryotes'],
                  hint: 'If confused about tonoplast transport, revisit "Cell Membrane: Fluid Mosaic Model".',
                  misconception: 'Students believe "vacuoles are just storage bags" and "centrosomes are present in all eukaryotes." Specifically, they think plant vacuoles.' },
                { id: 'c', prompt: 'Compare the biogenesis of a centriole (procentriole assembly) with the formation of a plant central vacuole from provacuoles.', answer: 'Shared: (1) both require templated assembly',
                  options: ['Shared: (1) both require templated assembly', 'both membranous', 'both protein-only', 'vacuoles are just storage bags'],
                  hint: 'If confused about tonoplast transport, revisit "Cell Membrane: Fluid Mosaic Model".',
                  misconception: 'Students believe "vacuoles are just storage bags" and "centrosomes are present in all eukaryotes." Specifically, they think plant vacuoles.' }
          ],
            remediations: { 'vacuoles-are-just-storage-bags': { steps: ['Re-draw the centriole cross-section from memory — nine triplets, cartwheel hub, radial spokes.', 'Set up a plasmolysis demo with *Rhoeo* peel in 0.1 M vs. 1.0 M sucrose; measure plasmolysis incidence.', 'Watch a time-lapse of *Paramecium* contractile vacuole cycle; note filling (diastole) and expulsion (systole).'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_08_010', difficulty: 'standard',
          question: 'Microbodies are small, single-membrane-bound organelles (e.g., peroxisomes.',
          hint: 'Review c11_bio_cbse_08_005 (Endomembrane System) for organelle biogenesis pathways and.',
          misconception: 'Students often think microbodies are "small lysosomes" because both are single-membrane vesicles with enzymes.',
          parts: [
                { id: 'a', prompt: 'A student observes two types of granules in a plant cell under the microscope: one stains blue-black with iodine, the other dissolves in ethanol and stains red.', answer: 'Blue-black iodine stain → starch grains (polysaccharide storage)',
                  options: ['Blue-black iodine stain → starch grains (polysaccharide storage)', 'starch granules are plastids', 'lipid droplets are microbodies', 'small lysosomes'],
                  hint: 'Review c11_bio_cbse_08_005 (Endomembrane System) for organelle biogenesis pathways and.',
                  misconception: 'Students often think microbodies are "small lysosomes" because both are single-membrane vesicles with enzymes.' }
          ],
            remediations: { 'microbodies-are-small-lysosomes-because': { steps: ['Create a comparison table (Peroxisome vs Lysosome) with columns: Membrane origin, Enzyme type (oxidase/catalase.', 'Perform catalase test on potato tuber (peroxisome-rich) vs. liver (lysosome-rich) – only potato shows rapid O₂ bubbles.', 'Trace the pathway: Glycolate (from chloroplast) → Peroxisome (glycine) → Mitochondria (NH₃/CO₂) → Peroxisome (serine) →.', 'Re-attempt labelling with functional annotations.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
