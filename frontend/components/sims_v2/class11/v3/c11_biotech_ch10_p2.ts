import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch10_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch10_p2: SimDef = {
    id: 'v3_c11_biotech_ch10_p2',
    title: 'Protein Informatics · Part 2/2',
    subtitle: 'Explore protein databases, domains and homology-based structure prediction.',
    classLevel: 11, subject: 'biotechnology', topic: 'Protein Informatics · Part 2/2',
    chapters: ['c11_biotech_ch10'],
    nodeIds: ['c11_biotech_cbse_10_007', 'c11_biotech_cbse_10_008', 'c11_biotech_cbse_10_009', 'c11_biotech_cbse_10_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a structural bioinformatician shortlisting drug targets', intro: 'The lab wants a structure by Friday; the crystal will take a year. Compute it instead.', goal: 'Navigate protein databases, identify domains/motifs, and explain comparative modelling.' },
    discovery: {
        question: 'Two proteins share 60% of their amino-acid sequence. A drug blocks one cleanly. Can you predict the other\'s shape well enough to guess whether the drug will fit?',
        options: ['Yes — homologous sequences usually fold alike, so one structure models the other', 'No — protein shape is unrelated to sequence', 'Only if the proteins come from the same organ', 'Yes, but only after crystallising it — prediction is impossible'],
        answer: 'Yes — homologous sequences usually fold alike, so one structure models the other',
        hook: 'Protein informatics rests on one bet: evolution reuses folds, so similarity in sequence means similarity in shape.',
    },
    teaching: [
        { title: 'Molecular Visualisation Tools: RasMol and PyMOL', text: 'Molecular visualisation tools are software applications that render three-dimensional protein structures from atomic coordinate files (primarily PDB format) into interactive graphical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_10_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Pull a protein\'s record, inspect its predicted domains, and judge whether a homologous structure can stand in for it.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_10_007', title: 'Molecular Visualisation Tools: RasMol and PyMOL',
          caseStudy: { intro: 'Imagine you have just built a homology model of a hypothetical kinase (from node c11_biotech_cbse_10_004) and received a PDB file — how do you actually *see*.',
            decisions: [{ prompt: 'What is the primary file format read by both RasMol and PyMOL for protein structure visualisation, and what does this file contain at the.', options: [
                { text: 'The primary format is PDB (Protein Data Bank, .pdb extension)', outcome: 'The primary format is PDB (Protein Data Bank, .pdb extension).' },
                { text: 'structure viewers', outcome: 'Not quite — Students believe RasMol and PyMOL are interchangeable "structure viewers" differing only.', reveals: 'rasmol-and-pymol-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_10_008', title: 'Protein-Protein Interactions: Prediction Methods',
          caseStudy: { intro: 'Imagine you have discovered a novel hypothetical protein from a genomic sequence (as discussed in c11_biotech_cbse_10_008) and you need to find its functional.',
            decisions: [{ prompt: 'Define "interolog" in the context of protein-protein interaction prediction and state the primary assumption underlying this method.', options: [
                { text: 'An interolog is a conserved protein-protein interaction where orthologous proteins in', outcome: 'An interolog is a conserved protein-protein interaction where orthologous proteins in different.' },
                { text: 'any predicted interaction', outcome: 'Not quite — Students often believe that "protein-protein docking" (structure-based) is the *primary* or *most.', reveals: 'protein-protein-docking-structure-based' },
                { text: 'protein-protein docking', outcome: 'Not quite — Students often believe that "protein-protein docking" (structure-based) is the *primary* or *most.', reveals: 'protein-protein-docking-structure-based' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_10_009', title: 'Protein Function Prediction from Sequence',
          caseStudy: { intro: 'Imagine you have sequenced a novel gene from a thermophilic bacterium in a hot spring in Ladakh. You have the protein sequence but no idea what it does.',
            decisions: [{ prompt: 'List the three main computational approaches for predicting protein function from sequence as described in the NCERT textbook, and name one.', options: [
                { text: 'The three approaches are: (1) Homology-based inference using sequence similarity searches', outcome: 'The three approaches are: (1) Homology-based inference using sequence similarity searches (tool.' },
                { text: 'Ramachandran plot', outcome: 'Not quite — Students equate "sequence similarity" with "functional identity".', reveals: 'students-equate-sequence-similarity-with' },
                { text: 'Homology modelling', outcome: 'Not quite — Students equate "sequence similarity" with "functional identity".', reveals: 'students-equate-sequence-similarity-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_10_010', title: 'Homology Modelling: Steps and Tools',
          caseStudy: { intro: 'Imagine you\'ve discovered a novel antifungal protein from *Azadirachta indica* (neem) seeds with only its amino acid sequence known.',
            decisions: [{ prompt: 'What is the minimum sequence identity threshold generally considered reliable for homology modelling of a globular protein\'s global fold.', options: [
                { text: 'The generally accepted threshold is 30% sequence identity over the aligned region', outcome: 'The generally accepted threshold is 30% sequence identity over the aligned region.' },
                { text: 'copying coordinates from the template', outcome: 'Not quite — Students believe homology modelling is simply "copying coordinates from the template" and that any.', reveals: 'homology-modelling-is-simply-copying' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'Protein Informatics · Part 2/2', spots: [
            { id: 's1', label: 'Molecular Visualisation Tools RasMol and PyMOL', prompt: 'Which idea is this? — Molecular visualisation tools are software applications that render three-dimensional.', answer: 'Molecular Visualisation Tools RasMol and PyMOL', options: ['Molecular Visualisation Tools RasMol and PyMOL', 'Protein-Protein Interactions Prediction Methods', 'Protein Function Prediction from Sequence', 'Homology Modelling Steps and Tools'] },
            { id: 's2', label: 'Protein-Protein Interactions Prediction Methods', prompt: 'Which idea is this? — Protein-protein interaction (PPI) prediction methods are computational techniques used.', answer: 'Protein-Protein Interactions Prediction Methods', options: ['Protein-Protein Interactions Prediction Methods', 'Molecular Visualisation Tools RasMol and PyMOL', 'Protein Function Prediction from Sequence', 'Homology Modelling Steps and Tools'] },
            { id: 's3', label: 'Protein Function Prediction from Sequence', prompt: 'Which idea is this? — Protein function prediction from sequence is the computational inference of a protein\'s.', answer: 'Protein Function Prediction from Sequence', options: ['Protein Function Prediction from Sequence', 'Molecular Visualisation Tools RasMol and PyMOL', 'Protein-Protein Interactions Prediction Methods', 'Homology Modelling Steps and Tools'] },
            { id: 's4', label: 'Homology Modelling Steps and Tools', prompt: 'Which idea is this? — Homology modelling is a computational method for predicting the three-dimensional.', answer: 'Homology Modelling Steps and Tools', options: ['Homology Modelling Steps and Tools', 'Molecular Visualisation Tools RasMol and PyMOL', 'Protein-Protein Interactions Prediction Methods', 'Protein Function Prediction from Sequence'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a school science project you want to compare the 3D structures of human and zebrafish insulin. Your partner says: \'Search CATH for the PDB file — a PDB ID maps straight to a CATH code, and PDB and CATH are basically the same database with different names.\'',
            decisions: [{ prompt: 'How do you actually get structures and their classifications?', options: [
                { text: 'Retrieve the experimental structure files (coordinates, method, resolution) from PDB; then use CATH to see how each protein\'s domains are classified (Class→Architecture→Topology→Homology). One PDB entry can contain several CATH domains — they are complementary, not interchangeable.', outcome: 'PDB stores raw experimental entries; CATH organises individual domains into structural families — you need both, in that order.' },
                { text: 'One PDB ID gives one CATH code — just type the ID into CATH and read the answer.', outcome: 'CATH works at the domain level; multi-domain or multi-chain PDB entries split into several CATH domains, so there\'s no 1:1 mapping.', reveals: 'pdb-id-equals-cath-code' },
                { text: 'Skip PDB — CATH alone contains the coordinates, so it replaces PDB entirely.', outcome: 'CATH is a classification layer over experimental data; it doesn\'t host raw coordinate files, so you still need PDB for the structures themselves.', reveals: 'cath-replaces-pdb' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_10_010', title: 'You made it',
          caseStudy: { intro: 'A protein\'s sequence is a folding recipe — informatics reads the recipe before the oven is ever switched on.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_007', difficulty: 'standard',
          question: 'Molecular visualisation tools are software applications that render.',
          hint: 'If confused about coordinate-to-image mapping, revisit c11_biotech_cbse_10_001 (PDB file.',
          misconception: 'Students believe RasMol and PyMOL are interchangeable "structure viewers" differing only in graphics quality.',
          parts: [
                { id: 'a', prompt: 'What is the primary file format read by both RasMol and PyMOL for protein structure visualisation, and what does this file contain at the atomic level?', answer: 'The primary format is PDB (Protein Data Bank, .pdb extension)',
                  options: ['The primary format is PDB (Protein Data Bank, .pdb extension)', 'structure viewers'],
                  hint: 'If confused about coordinate-to-image mapping, revisit c11_biotech_cbse_10_001 (PDB file anatomy).',
                  misconception: 'Students believe RasMol and PyMOL are interchangeable "structure viewers" differing only in graphics quality.' },
                { id: 'b', prompt: 'In PyMOL, a student types `show cartoon` and sees the protein backbone as smooth tubes, but the side chains are invisible.', answer: '`show sticks` applies globally to all selected atoms (default: everything)',
                  options: ['`show sticks` applies globally to all selected atoms (default: everything)', 'use hide sticks', 'structure viewers'],
                  hint: 'If confused about coordinate-to-image mapping, revisit c11_biotech_cbse_10_001 (PDB file anatomy).',
                  misconception: 'Students believe RasMol and PyMOL are interchangeable "structure viewers" differing only in graphics quality.' },
                { id: 'c', prompt: 'Compare the scripting capabilities of RasMol and PyMOL for automating the generation of 50 publication-quality figures of different protein-ligand complexes.', answer: 'PyMOL is far more suitable',
                  options: ['PyMOL is far more suitable', 'structure viewers'],
                  hint: 'If confused about coordinate-to-image mapping, revisit c11_biotech_cbse_10_001 (PDB file anatomy).',
                  misconception: 'Students believe RasMol and PyMOL are interchangeable "structure viewers" differing only in graphics quality.' }
          ],
            remediations: { 'rasmol-and-pymol-are-interchangeable': { steps: ['Have the student open the *same* PDB (e.g., 1CRN) in both tools side-by-side.', 'In RasMol: execute `wireframe`, then `wireframe off` — note global effect.', 'In PyMOL: `show lines`, create two selections (`select a, chain A`, `select b, chain B`), then `hide lines, a`.', 'Explain: RasMol has one global "display list"; PyMOL has a tree of objects each with independent representation flags.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe RasMol and PyMOL are interchangeable "structure viewers" differing only in graphics quality.',
          parts: [
                { id: 'a', prompt: 'A student loads a homology model (from node c11_biotech_cbse_10_004) into PyMOL and notices a long loop region with unusually high B-factors (coloured red.', answer: 'The statement is partially correct but oversimplified',
                  options: ['The statement is partially correct but oversimplified', 'error metric', 'structure viewers'],
                  hint: 'If confused about coordinate-to-image mapping, revisit c11_biotech_cbse_10_001 (PDB file anatomy).',
                  misconception: 'Students believe RasMol and PyMOL are interchangeable "structure viewers" differing only in graphics quality.' },
                { id: 'b', prompt: 'Design a PyMOL script snippet that: (1) Loads a PDB file provided as a command-line argument; (2) Colours the protein by secondary structure (helix=red.', answer: '```python import sys pdb_file = sys.argv[1] pdb_code = pdb_file.split(\'.\')[0]',
                  options: ['```python import sys pdb_file = sys.argv[1] pdb_code = pdb_file.split(\'.\')[0]', 'structure viewers'],
                  hint: 'If confused about coordinate-to-image mapping, revisit c11_biotech_cbse_10_001 (PDB file anatomy).',
                  misconception: 'Students believe RasMol and PyMOL are interchangeable "structure viewers" differing only in graphics quality.' }
          ],
            remediations: { 'rasmol-and-pymol-are-interchangeable': { steps: ['Have the student open the *same* PDB (e.g., 1CRN) in both tools side-by-side.', 'In RasMol: execute `wireframe`, then `wireframe off` — note global effect.', 'In PyMOL: `show lines`, create two selections (`select a, chain A`, `select b, chain B`), then `hide lines, a`.', 'Explain: RasMol has one global "display list"; PyMOL has a tree of objects each with independent representation flags.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_008', difficulty: 'standard',
          question: 'Protein-protein interaction (PPI) prediction methods are computational.',
          hint: 'Revisit c11_biotech_cbse_10_001 (PDB navigation) and c11_biotech_cbse_10_002 (domain.',
          misconception: 'Students often believe that "protein-protein docking" (structure-based) is the *primary* or *most reliable*.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Protein-protein docking is always more accurate than sequence-based interolog mapping because it uses 3D structural physics." Explain why.', answer: 'Docking suffers from (1) conformational flexibility',
                  options: ['Docking suffers from (1) conformational flexibility', 'docking needs structures', 'protein-protein docking'],
                  hint: 'Revisit c11_biotech_cbse_10_001 (PDB navigation) and c11_biotech_cbse_10_002 (domain analysis with.',
                  misconception: 'Students often believe that "protein-protein docking" (structure-based) is the *primary* or *most reliable* computational method for PPI.' },
                { id: 'b', prompt: 'You have a hypothetical protein "X" from a newly sequenced bacterium. No experimental structure exists. You find a homolog in *E.', answer: 'Step 1: Use BLASTP against UniProt to confirm Protein Y is the top ortholog of X',
                  options: ['Step 1: Use BLASTP against UniProt to confirm Protein Y is the top ortholog of X', 'homology search', 'protein-protein docking'],
                  hint: 'Revisit c11_biotech_cbse_10_001 (PDB navigation) and c11_biotech_cbse_10_002 (domain analysis with.',
                  misconception: 'Students often believe that "protein-protein docking" (structure-based) is the *primary* or *most reliable* computational method for PPI.' },
                { id: 'c', prompt: 'Compare and contrast "domain-domain interaction (DDI) based prediction" and "phylogenetic profiling" for PPI inference.', answer: '| Feature | DDI-based | Phylogenetic Profiling |',
                  options: ['| Feature | DDI-based | Phylogenetic Profiling |', 'sequence similarity', 'protein-protein docking'],
                  hint: 'Revisit c11_biotech_cbse_10_001 (PDB navigation) and c11_biotech_cbse_10_002 (domain analysis with.',
                  misconception: 'Students often believe that "protein-protein docking" (structure-based) is the *primary* or *most reliable* computational method for PPI.' }
          ],
            remediations: { 'protein-protein-docking-structure-based': { steps: ['If a student exhibits the docking-centric misconception: (1) Show them the STRING database evidence channels for.', '(2) Assign a mini-task: "Predict interactors for a hypothetical protein with only a sequence.', 'List 3 methods you *can* use and 1 you *cannot*." (3) Explain the "inverse relationship": docking requires a *known.', '(4) Revisit c11_biotech_cbse_10_001 (PDB/CATH) to reinforce that <20% of proteomes have experimental structures, making.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_009', difficulty: 'standard',
          question: 'Protein function prediction from sequence is the computational inference of.',
          hint: 'Revisit primary structure analysis (node 10_002) for ProtParam usage and evolutionary.',
          misconception: 'Students equate "sequence similarity" with "functional identity".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Protein function prediction from sequence is the computational inference of a protein\'s',
                  options: ['Protein function prediction from sequence is the computational inference of a protein\'s', 'Protein Structure Databases are curated repositories that store experimentally determined', 'Primary structure analysis of proteins involves computational determination of', 'Secondary structure prediction is the computational inference of local protein'],
                  hint: 'Revisit primary structure analysis (node 10_002) for ProtParam usage and evolutionary biology.',
                  misconception: 'Students equate "sequence similarity" with "functional identity".' }
          ],
            remediations: { 'students-equate-sequence-similarity-with': { steps: ['Retrieve both sequences (P00760, P00766).', 'Run BLASTp pairwise — note 41% identity, E-value 1e-60.', 'Align catalytic triad (His57, Asp102, Ser195) — conserved.', 'Align substrate binding pocket (S1 pocket) — Asp189 in trypsin (binds Lys/Arg) vs.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_10_010', difficulty: 'standard',
          question: 'Homology modelling is a computational method for predicting the.',
          hint: 'Revisit node c11_biotech_cbse_10_001 (PDB database navigation and structure quality.',
          misconception: 'Students believe homology modelling is simply "copying coordinates from the template" and that any template with >25%.',
          parts: [
                { id: 'a', prompt: 'A student claims: "SWISS-MODEL and MODELLER produce identical results because both use the same template structures from PDB." Explain why this statement.', answer: 'SWISS-MODEL uses ProMod3 with automated template selection, HHblits/HHsearch for',
                  options: ['SWISS-MODEL uses ProMod3 with automated template selection, HHblits/HHsearch for', 'black boxes', 'copying coordinates from the template'],
                  hint: 'Revisit node c11_biotech_cbse_10_001 (PDB database navigation and structure quality indicators) and.',
                  misconception: 'Students believe homology modelling is simply "copying coordinates from the template" and that any template with >25% identity will produce.' },
                { id: 'b', prompt: 'You have a target protein (350 residues) and find two templates in PDB: Template A (2XYZ) with 40% identity over 85% coverage, and Template B (3ABC) with 55%.', answer: 'Prioritise Template A (40% identity, 85% coverage)',
                  options: ['Prioritise Template A (40% identity, 85% coverage)', 'copying coordinates from the template'],
                  hint: 'Revisit node c11_biotech_cbse_10_001 (PDB database navigation and structure quality indicators) and.',
                  misconception: 'Students believe homology modelling is simply "copying coordinates from the template" and that any template with >25% identity will produce.' },
                { id: 'c', prompt: 'During homology modelling of a TIM-barrel enzyme, the initial MODELLER run produces a model with DOPE score -45,000 but the Ramachandran plot shows 12%.', answer: 'The outliers likely stem from inaccurate loop modelling (MODELLER\'s default loop',
                  options: ['The outliers likely stem from inaccurate loop modelling (MODELLER\'s default loop', 'copying coordinates from the template'],
                  hint: 'Revisit node c11_biotech_cbse_10_001 (PDB database navigation and structure quality indicators) and.',
                  misconception: 'Students believe homology modelling is simply "copying coordinates from the template" and that any template with >25% identity will produce.' }
          ],
            remediations: { 'homology-modelling-is-simply-copying': { steps: ['Have the student manually align a target-template pair (e.g., using Clustal Omega) and visually inspect gaps.', 'Run MODELLER twice: once with default alignment, once with manually corrected alignment — compare DOPE scores and.', 'Use PyMOL to superimpose both models on the template and highlight regions where backbone deviates >2Å.', 'Ask: "Which errors came from alignment vs loop modelling?" This forces confrontation with the alignment-structure.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
