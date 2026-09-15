import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch01_p1: SimDef = {
    id: 'v3_c12_biotech_ch01_p1',
    title: 'Host-Vector System · Part 1/2',
    subtitle: 'A gene without a vehicle is just debris — meet the host-vector system.',
    classLevel: 12, subject: 'biotechnology', topic: 'Host-Vector System · Part 1/2',
    chapters: ['c12_biotech_ch01'],
    nodeIds: ['c12_biotech_cbse_01_001', 'c12_biotech_cbse_01_002', 'c12_biotech_cbse_01_003', 'c12_biotech_cbse_01_004', 'c12_biotech_cbse_01_005', 'c12_biotech_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cloning lab engineer', intro: 'Turning a bacterium into a protein factory starts with matching the right host to the right vehicle.', goal: 'Explain host-vector compatibility and select appropriate E. coli strains for cloning.' },
    discovery: {
        question: 'You drop a human insulin gene straight into E. coli — and it\'s gone by the next cell division. What was missing?',
        options: ['A vector — a DNA vehicle that carries the gene, replicates with the host, and is stably maintained', 'More copies of the gene — enough DNA guarantees some survives', 'A bigger host — only mammalian cells can hold human genes', 'Antibiotics — they force the bacterium to keep foreign DNA'],
        answer: 'A vector — a DNA vehicle that carries the gene, replicates with the host, and is stably maintained',
        hook: 'Foreign DNA alone is debris; foreign DNA on a replicating vector is a clone. The host supplies the machinery, the vector supplies the passport — gene cloning needs both, matched.',
    },
    teaching: [
        { title: 'Host-Vector System: Concept and Essential Components', text: 'A host-vector system is a compatible pair of a living host cell (which provides the cellular machinery for replication and expression) and a vector (a DNA molecule that can replicate independently.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_01_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Assemble a working host-vector system: choose the right E. coli lab strain (why DH5α over wild-type?), pair it with a plasmid vector, and justify how the pair maintains your foreign gene across generations.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_001', title: 'Host-Vector System: Concept and Essential Components',
          caseStudy: { intro: 'Imagine you have a human insulin gene and want bacteria to produce insulin for diabetic patients. You cannot just drop the gene into E.',
            decisions: [{ prompt: 'What are the four essential features that a DNA molecule must possess to function as a cloning vector in a host-vector system?', options: [
                { text: 'The four essential features are: (1) Origin of replication (ori)', outcome: 'The four essential features are: (1) Origin of replication (ori) — allows autonomous replication.' },
                { text: 'promoter', outcome: 'Not quite — Students often think "vector" and "plasmid" are synonyms, and that any plasmid can work in any.', reveals: 'vector-and-plasmid-are-synonyms' },
                { text: 'terminator', outcome: 'Not quite — Students often think "vector" and "plasmid" are synonyms, and that any plasmid can work in any.', reveals: 'vector-and-plasmid-are-synonyms' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_002', title: 'E. coli as a Cloning Host: Suitable Strains and Their Features',
          caseStudy: { intro: 'Imagine you have just cut your gene of interest and a plasmid vector with EcoRI, ligated them, and now you need to transform bacteria to amplify the.',
            decisions: [{ prompt: 'Name two E. coli strains commonly used for routine cloning and state one key genotype feature each that makes them suitable.', options: [
                { text: 'DH5α (genotype: recA1, endA1, hsdR17, lacZΔM15)', outcome: 'DH5α (genotype: recA1, endA1, hsdR17, lacZΔM15) — recA1 prevents plasmid rearrangement; HB101.' },
                { text: 'BL21 for routine cloning', outcome: 'Not quite — Students often think "any E. coli strain works for cloning" and pick BL21(DE3) for routine plasmid.', reveals: 'any-e' },
                { text: '"any E', outcome: 'Not quite — Students often think "any E. coli strain works for cloning" and pick BL21(DE3) for routine plasmid.', reveals: 'any-e' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_003', title: 'Yeast (S. cerevisiae) as a Eukaryotic Host',
          caseStudy: { intro: 'Imagine you need to produce human erythropoietin (EPO) — a heavily glycosylated hormone — for treating anemia. E.',
            decisions: [{ prompt: 'Name the two most commonly used auxotrophic selection markers in S.', options: [
                { text: 'Correct answer: URA3 (orotidine-5\'-phosphate decarboxylase, pyrimidine biosynthesis) and', outcome: 'Correct answer: URA3 (orotidine-5\'-phosphate decarboxylase, pyrimidine biosynthesis) and LEU2.' },
                { text: 'ampicillin resistance', outcome: 'Not quite — Students believe "yeast glycosylation is just like human glycosylation because both are.', reveals: 'yeast-glycosylation-is-just-like' },
                { text: '"yeast glycosylation is just like human glycosylation', outcome: 'Not quite — Students believe "yeast glycosylation is just like human glycosylation because both are.', reveals: 'yeast-glycosylation-is-just-like' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_004', title: 'Baculovirus-Insect Cell Expression System',
          caseStudy: { intro: 'Imagine you need to produce a human glycoprotein therapeutic (e.g., erythropoietin) that requires complex N-linked glycosylation for activity — E.',
            decisions: [{ prompt: 'What is the name of the strong late promoter in Autographa californica multiple nucleopolyhedrovirus (AcMNPV) that is routinely exploited.', options: [
                { text: 'The polyhedrin promoter (or polh promoter)', outcome: 'The polyhedrin promoter (or polh promoter). A wrong answer (e.g., "p10 promoter", "T7 promoter".' },
                { text: 'p10 promoter', outcome: 'Not quite — Students often believe that because insect cells are eukaryotic, they produce "human-like".', reveals: 'because-insect-cells-are-eukaryotic' },
                { text: 'T7 promoter', outcome: 'Not quite — Students often believe that because insect cells are eukaryotic, they produce "human-like".', reveals: 'because-insect-cells-are-eukaryotic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_005', title: 'Mammalian Cell Hosts: CHO and HEK293 Lines',
          caseStudy: { intro: 'Imagine you are a process development scientist at a biopharma company in Hyderabad tasked with producing a human monoclonal antibody for cancer therapy.',
            decisions: [{ prompt: 'Name the two most widely used mammalian cell lines for recombinant therapeutic protein production and state the tissue of origin for each.', options: [
                { text: 'CHO (Chinese Hamster Ovary) – derived from ovary of Chinese hamster', outcome: 'CHO (Chinese Hamster Ovary) – derived from ovary of Chinese hamster; HEK293 (Human Embryonic Kidney.' },
                { text: 'HeLa and CHO', outcome: 'Not quite — Students often think “HEK293 is human, so its glycosylation is exactly identical to native human.', reveals: 'hek293-is-human' },
                { text: 'HEK293 from liver', outcome: 'Not quite — Students often think “HEK293 is human, so its glycosylation is exactly identical to native human.', reveals: 'hek293-is-human' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_006', title: 'Ti Plasmid: Structure and Use as a Plant Vector',
          caseStudy: { intro: 'Imagine you are a plant biotechnologist at ICAR-IARI, New Delhi, tasked with developing a drought-tolerant wheat variety.',
            decisions: [{ prompt: 'What are the two *cis*-acting DNA sequences absolutely required for T-DNA transfer from *Agrobacterium* to the plant genome, and what.', options: [
                { text: 'The left border (LB) and right border (RB), each a 25-bp direct repeat (consensus:', outcome: 'The left border (LB) and right border (RB), each a 25-bp direct repeat (consensus: 5\'-TGGT...-3\').' },
                { text: 'inverted repeats', outcome: 'Not quite — Students often believe that **the entire Ti plasmid (including *vir* genes and opine catabolism.', reveals: 'the-entire-ti-plasmid-including' },
                { text: '10-bp borders', outcome: 'Not quite — Students often believe that **the entire Ti plasmid (including *vir* genes and opine catabolism.', reveals: 'the-entire-ti-plasmid-including' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'Host-Vector System · Part 1/2', spots: [
            { id: 's1', label: 'Host-Vector System Concept and Essential Components', prompt: 'Which idea is this? — A host-vector system is a compatible pair of a living host cell (which provides the.', answer: 'Host-Vector System Concept and Essential Components', options: ['Host-Vector System Concept and Essential Components', 'E coli as a Cloning Host Suitable Strains and Their Features', 'Yeast S cerevisiae as a Eukaryotic Host', 'Baculovirus-Insect Cell Expression System'] },
            { id: 's2', label: 'E coli as a Cloning Host Suitable Strains and Their Features', prompt: 'Which idea is this? — E. coli is the most widely used prokaryotic host for gene cloning due to its.', answer: 'E coli as a Cloning Host Suitable Strains and Their Features', options: ['E coli as a Cloning Host Suitable Strains and Their Features', 'Host-Vector System Concept and Essential Components', 'Yeast S cerevisiae as a Eukaryotic Host', 'Baculovirus-Insect Cell Expression System'] },
            { id: 's3', label: 'Yeast S cerevisiae as a Eukaryotic Host', prompt: 'Which idea is this? — Saccharomyces cerevisiae (baker\'s yeast) is a unicellular, non-pathogenic, GRAS-status.', answer: 'Yeast S cerevisiae as a Eukaryotic Host', options: ['Yeast S cerevisiae as a Eukaryotic Host', 'Host-Vector System Concept and Essential Components', 'E coli as a Cloning Host Suitable Strains and Their Features', 'Baculovirus-Insect Cell Expression System'] },
            { id: 's4', label: 'Baculovirus-Insect Cell Expression System', prompt: 'Which idea is this? — The Baculovirus-Insect Cell Expression System is a eukaryotic recombinant protein.', answer: 'Baculovirus-Insect Cell Expression System', options: ['Baculovirus-Insect Cell Expression System', 'Host-Vector System Concept and Essential Components', 'E coli as a Cloning Host Suitable Strains and Their Features', 'Yeast S cerevisiae as a Eukaryotic Host'] },
            { id: 's5', label: 'Mammalian Cell Hosts CHO and HEK293 Lines', prompt: 'Which idea is this? — Mammalian cell hosts such as CHO (Chinese Hamster Ovary) and HEK293 (Human Embryonic.', answer: 'Mammalian Cell Hosts CHO and HEK293 Lines', options: ['Mammalian Cell Hosts CHO and HEK293 Lines', 'Host-Vector System Concept and Essential Components', 'E coli as a Cloning Host Suitable Strains and Their Features', 'Yeast S cerevisiae as a Eukaryotic Host'] },
            { id: 's6', label: 'Ti Plasmid Structure and Use as a Plant Vector', prompt: 'Which idea is this? — The Ti (Tumor-inducing) plasmid is a large, naturally occurring plasmid in *Agrobacterium.', answer: 'Ti Plasmid Structure and Use as a Plant Vector', options: ['Ti Plasmid Structure and Use as a Plant Vector', 'Host-Vector System Concept and Essential Components', 'E coli as a Cloning Host Suitable Strains and Their Features', 'Yeast S cerevisiae as a Eukaryotic Host'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a biotech-lab summer project, a student team wants E. coli to propagate a human gene. Their mentor hands them a plasmid carrying an ampicillin-resistance gene but no origin of replication that E. coli can read, and says \'just transform it in.\'',
            decisions: [{ prompt: 'Will the plasmid be maintained in the bacteria?', options: [
                { text: 'No — a cloning vector needs an origin of replication recognised by the host plus a selectable marker, cloning sites and small size; without a compatible ori it can\'t replicate and is lost at cell division, marker or not.', outcome: 'Host-vector compatibility is the core rule: the host\'s replication machinery must recognise the vector\'s ori, and the marker only selects cells that actually took up a replicating vector.' },
                { text: 'Yes — the antibiotic marker lets you select transformed cells, and selection alone keeps the plasmid going.', outcome: 'Selection finds cells carrying the plasmid but can\'t maintain it; without a functional ori the plasmid never replicates and gets diluted out.', reveals: 'marker-alone-maintains-vector' },
                { text: 'Yes, if they add a strong promoter — that\'s what makes any plasmid a cloning vector.', outcome: 'Promoters belong to expression vectors; a cloning vector\'s essentials are ori, selectable marker, cloning sites and small size.', reveals: 'cloning-needs-promoter' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You\'ve learned the chassis-and-cargo logic every gene clone rides on. Host-vector systems frame every downstream biotech question — in boards and in actual cloning labs.',
            decisions: [{ prompt: 'What comes next? Host-Vector System · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Host-Vector System · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_001', difficulty: 'standard',
          question: 'A host-vector system is a compatible pair of a living host cell (which provides.',
          hint: 'Revisit c11_biotech_cbse_12_008 (Vectors and Cloning) and c11_bio_cbse_02_003 (Bacterial.',
          misconception: 'Students often think "vector" and "plasmid" are synonyms, and that any plasmid can work in any bacterium.',
          parts: [
                { id: 'a', prompt: 'What are the four essential features that a DNA molecule must possess to function as a cloning vector in a host-vector system?', answer: 'The four essential features are: (1) Origin of replication (ori)',
                  options: ['The four essential features are: (1) Origin of replication (ori)', 'promoter', 'terminator', 'vector'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Vectors and Cloning) and c11_bio_cbse_02_003 (Bacterial.',
                  misconception: 'Students often think "vector" and "plasmid" are synonyms, and that any plasmid can work in any bacterium.' },
                { id: 'b', prompt: 'A student claims: "Any plasmid with an antibiotic resistance gene can be used as a cloning vector in E.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'vector', 'plasmid'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Vectors and Cloning) and c11_bio_cbse_02_003 (Bacterial.',
                  misconception: 'Students often think "vector" and "plasmid" are synonyms, and that any plasmid can work in any bacterium.' },
                { id: 'c', prompt: 'You have a plasmid vector with a pUC origin (high copy number in E. coli) and an ampicillin resistance marker. You transform it into two E.', answer: 'DH5α yields higher quality and quantity of plasmid DNA',
                  options: ['DH5α yields higher quality and quantity of plasmid DNA', 'vector', 'plasmid'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Vectors and Cloning) and c11_bio_cbse_02_003 (Bacterial.',
                  misconception: 'Students often think "vector" and "plasmid" are synonyms, and that any plasmid can work in any bacterium.' }
          ],
            remediations: { 'vector-and-plasmid-are-synonyms': { steps: ['If the student cannot distinguish cloning vs expression vector features: (1) Revisit c11_biotech_cbse_07_010 (Lac.', '(2) Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) for vector classification.', '(3) Draw a two-column table: "Cloning Vector Essentials" vs "Expression Vector Additions".', '(4) Re-attempt Diagnostic Question 1 and 5.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "vector" and "plasmid" are synonyms, and that any plasmid can work in any bacterium.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "For cloning a 50 kb human genomic DNA fragment, a plasmid vector is the best choice because it has high copy number and easy.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'vector', 'plasmid'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Vectors and Cloning) and c11_bio_cbse_02_003 (Bacterial.',
                  misconception: 'Students often think "vector" and "plasmid" are synonyms, and that any plasmid can work in any bacterium.' },
                { id: 'b', prompt: 'Design a hypothetical host-vector system for expressing a toxic human protein in E. coli.', answer: 'one essential vector feature to control expression, (',
                  options: ['one essential vector feature to control expression, (', 'vector', 'plasmid'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Vectors and Cloning) and c11_bio_cbse_02_003 (Bacterial.',
                  misconception: 'Students often think "vector" and "plasmid" are synonyms, and that any plasmid can work in any bacterium.' }
          ],
            remediations: { 'vector-and-plasmid-are-synonyms': { steps: ['If the student cannot distinguish cloning vs expression vector features: (1) Revisit c11_biotech_cbse_07_010 (Lac.', '(2) Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) for vector classification.', '(3) Draw a two-column table: "Cloning Vector Essentials" vs "Expression Vector Additions".', '(4) Re-attempt Diagnostic Question 1 and 5.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_002', difficulty: 'standard',
          question: 'E. coli is the most widely used prokaryotic host for gene cloning due to its.',
          hint: 'Revisit c11_biotech_cbse_12_008 (Restriction Enzymes: Types and Cleavage Patterns) for.',
          misconception: 'Students often think "any E. coli strain works for cloning" and pick BL21(DE3) for routine plasmid propagation because.',
          parts: [
                { id: 'a', prompt: 'Name two E. coli strains commonly used for routine cloning and state one key genotype feature each that makes them suitable.', answer: 'DH5α (genotype: recA1, endA1, hsdR17, lacZΔM15)',
                  options: ['DH5α (genotype: recA1, endA1, hsdR17, lacZΔM15)', 'BL21 for routine cloning', '"any E'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Restriction Enzymes: Types and Cleavage Patterns) for hsdR.',
                  misconception: 'Students often think "any E. coli strain works for cloning" and pick BL21(DE3) for routine plasmid propagation because it\'s "common in the.' },
                { id: 'b', prompt: 'You have a high-copy plasmid (pUC19 derivative) that gives poor yield in HB101 but excellent yield in DH5α. Both strains are recA⁻ and hsdR⁻.', answer: 'DH5α carries endA1 (endonuclease I deficiency) while HB101 is endA⁺',
                  options: ['DH5α carries endA1 (endonuclease I deficiency) while HB101 is endA⁺', '"any E'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Restriction Enzymes: Types and Cleavage Patterns) for hsdR.',
                  misconception: 'Students often think "any E. coli strain works for cloning" and pick BL21(DE3) for routine plasmid propagation because it\'s "common in the.' },
                { id: 'c', prompt: 'Compare DH5α and BL21(DE3) for two distinct cloning scenarios: (a) propagating a recombinant plasmid for sequencing, (b) expressing a toxic protein under T7.', answer: 'propagating a recombinant plasmid for sequencing, (',
                  options: ['propagating a recombinant plasmid for sequencing, (', '"any E'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Restriction Enzymes: Types and Cleavage Patterns) for hsdR.',
                  misconception: 'Students often think "any E. coli strain works for cloning" and pick BL21(DE3) for routine plasmid propagation because it\'s "common in the.' }
          ],
            remediations: { 'any-e': { steps: ['Make a two-column table: Column A = mutation (recA1, endA1, hsdR17, lacZΔM15, DE3, lon, ompT); Column.', 'Re-read the genotype blocks for DH5α, HB101, JM109, TOP10, BL21(DE3) from NCERT Class 12 Ch.2 and write each genotype.', 'Do a "strain matching" drill: given 5 scenarios (blue-white screening, toxic protein expression, methylated DNA.', 'Re-attempt Diagnostic Questions 3–5; if any wrong, revisit the specific mutation\'s molecular function.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_003', difficulty: 'standard',
          question: 'Saccharomyces cerevisiae (baker\'s yeast) is a unicellular, non-pathogenic.',
          hint: 'If stuck on glycosylation differences, review c11_biotech_cbse_02_005 (Golgi) and.',
          misconception: 'Students believe "yeast glycosylation is just like human glycosylation because both are eukaryotes." In reality, yeast.',
          parts: [
                { id: 'a', prompt: 'Explain why a human glycoprotein produced in wild-type S. cerevisiae often triggers immune reactions when administered to patients, whereas the same protein.', answer: 'Correct answer: Wild-type yeast performs hypermannosylation',
                  options: ['Correct answer: Wild-type yeast performs hypermannosylation', 'yeast glycosylates differently', '"yeast glycosylation is just like human glycosylation'],
                  hint: 'If stuck on glycosylation differences, review c11_biotech_cbse_02_005 (Golgi) and.',
                  misconception: 'Students believe "yeast glycosylation is just like human glycosylation because both are eukaryotes." In reality, yeast adds only.' }
          ],
            remediations: { 'yeast-glycosylation-is-just-like': { steps: ['Revisit c11_biotech_cbse_02_005 (Golgi Apparatus) and c11_biotech_cbse_03_003 (Protein Structure Levels) to recall.', 'Draw the N-glycosylation pathway side-by-side: yeast (Man9 → Man50) vs mammalian (Man5 → GlcNAc → Gal → Sia).', 'Solve a diagnostic question: "Why does yeast-produced IFN-γ have shorter serum half-life than CHO-derived?" Answer.', 'Memorize the three glyco-engineered yeast strain names (e.g., GlycoSwitch®, PichiaMorpha®) as exam keywords.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_004', difficulty: 'standard',
          question: 'The Baculovirus-Insect Cell Expression System is a eukaryotic recombinant.',
          hint: 'If stuck, revisit c11_biotech_cbse_07_009 (Post-Translational Modifications of Proteins).',
          misconception: 'Students often believe that because insect cells are eukaryotic, they produce "human-like" glycosylation.',
          parts: [
                { id: 'a', prompt: 'What is the name of the strong late promoter in Autographa californica multiple nucleopolyhedrovirus (AcMNPV) that is routinely exploited for high-level.', answer: 'The polyhedrin promoter (or polh promoter)',
                  options: ['The polyhedrin promoter (or polh promoter)', 'p10 promoter', 'T7 promoter', 'lac promoter'],
                  hint: 'If stuck, revisit c11_biotech_cbse_07_009 (Post-Translational Modifications of Proteins) and.',
                  misconception: 'Students often believe that because insect cells are eukaryotic, they produce "human-like" glycosylation.' },
                { id: 'b', prompt: 'A researcher wants to express a human membrane protein that requires correct disulfide bond formation and N-linked glycosylation.', answer: 'Best choice: Sf9 insect cells',
                  options: ['Best choice: Sf9 insect cells', 'human-like', 'no glycosylation', 'because insect cells are eukaryotic, they produce "human-like" glycosylation'],
                  hint: 'If stuck, revisit c11_biotech_cbse_07_009 (Post-Translational Modifications of Proteins) and.',
                  misconception: 'Students often believe that because insect cells are eukaryotic, they produce "human-like" glycosylation.' },
                { id: 'c', prompt: 'Compare and contrast the homologous recombination method versus the transposon-based (e.g., Tn7) method for generating recombinant baculovirus.', answer: 'Homologous recombination: Advantages',
                  options: ['Homologous recombination: Advantages', 'human-like', 'no glycosylation', 'because insect cells are eukaryotic, they produce "human-like" glycosylation'],
                  hint: 'If stuck, revisit c11_biotech_cbse_07_009 (Post-Translational Modifications of Proteins) and.',
                  misconception: 'Students often believe that because insect cells are eukaryotic, they produce "human-like" glycosylation.' }
          ],
            remediations: { 'because-insect-cells-are-eukaryotic': { steps: ['Revisit c11_biotech_cbse_07_009 (Post-Translational Modifications of Proteins) and draw the N-glycosylation pathway.', 'Re-read the baculovirus life cycle in c12_biotech_cbse_01_004 notes — focus on the temporal regulation: early.', 'Practice a diagnostic: "Predict the glycan structure on a protein expressed in Sf9 vs High Five cells" — High Five.', 'Re-attempt DIAGNOSTIC_QUESTION_5 with the pathway diagram in front of you.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_005', difficulty: 'standard',
          question: 'Mammalian cell hosts such as CHO (Chinese Hamster Ovary) and HEK293 (Human.',
          hint: 'Revisit c11_biotech_cbse_02_004 (ER) and c11_biotech_cbse_02_005 (Golgi) for.',
          misconception: 'Students often think “HEK293 is human, so its glycosylation is exactly identical to native human proteins.” In reality.',
          parts: [
                { id: 'a', prompt: 'Name the two most widely used mammalian cell lines for recombinant therapeutic protein production and state the tissue of origin for each.', answer: 'CHO (Chinese Hamster Ovary) – derived from ovary of Chinese hamster',
                  options: ['CHO (Chinese Hamster Ovary) – derived from ovary of Chinese hamster', 'HeLa and CHO', 'HEK293 from liver'],
                  hint: 'Revisit c11_biotech_cbse_02_004 (ER) and c11_biotech_cbse_02_005 (Golgi) for glycosylation.',
                  misconception: 'Students often think “HEK293 is human, so its glycosylation is exactly identical to native human proteins.” In reality, HEK293 cells are.' }
          ],
            remediations: { 'hek293-is-human': { steps: ['If a student holds this misconception, guide them through: (1) Retrieve a recent review comparing N‑glycan profiles.', '(2) Highlight the differences in sialylation linkage and fucosylation.', '(3) Ask them to predict the impact on antibody half‑life (sialylation) and ADCC (fucosylation).', '(4) Re‑attempt Diagnostic Question 4 with the corrected understanding.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_01_006', difficulty: 'standard',
          question: 'The Ti (Tumor-inducing) plasmid is a large, naturally occurring plasmid.',
          hint: 'If unclear on *cis* vs. *trans*, revisit **c11_biotech_cbse_07_010** (Regulation of Gene.',
          misconception: 'Students often believe that **the entire Ti plasmid (including *vir* genes and opine catabolism genes) integrates into.',
          parts: [
                { id: 'a', prompt: 'A researcher constructs a binary vector system: pBIN19 (carrying T-DNA with LB/RB, *nptII* selectable marker, and a 3.2 kb *cry1Ac* gene) in *E.', answer: 'T-DNA transfer initiates at the RB nick and proceeds 5\'→3\' toward LB',
                  options: ['T-DNA transfer initiates at the RB nick and proceeds 5\'→3\' toward LB', '*nptII* mutated', '*Agrobacterium* lost pBIN19', 'plasmid'],
                  hint: 'If unclear on *cis* vs. *trans*, revisit **c11_biotech_cbse_07_010** (Regulation of Gene.',
                  misconception: 'Students often believe that **the entire Ti plasmid (including *vir* genes and opine catabolism genes) integrates into the plant genome**.' }
          ],
            remediations: { 'the-entire-ti-plasmid-including': { steps: ['Revisit **c11_biotech_cbse_12_008** (Recombinant DNA Technology: Vectors and Cloning) to review general vector.', 'Re-read the **T-DNA processing steps**: nick at RB → T-strand synthesis → VirD2 attachment → VirE2 coating → T-pilus.', 'Draw this as a 6-panel cartoon with labels.', 'Complete a **border-orientation exercise**: given a linear map of T-DNA with LB at 0 kb and RB at 20 kb, indicate which.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
