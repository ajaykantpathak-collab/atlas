import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch08_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch08_p2: SimDef = {
    id: 'v3_c12_biotech_ch08_p2',
    title: 'Animal Cell Culture · Part 2/2',
    subtitle: 'Fresh donor cells or an immortal line? Every drug test pays for one with the other.',
    classLevel: 12, subject: 'biotechnology', topic: 'Animal Cell Culture · Part 2/2',
    chapters: ['c12_biotech_ch08'],
    nodeIds: ['c12_biotech_cbse_08_007', 'c12_biotech_cbse_08_008', 'c12_biotech_cbse_08_009', 'c12_biotech_cbse_08_010', 'c12_biotech_cbse_08_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cell-culture researcher', intro: 'The polio vaccine was scaled in flasks, not animals — animal cell culture is how modern medicine tests everything.', goal: 'Describe the conditions for animal cell culture and compare primary cultures with established cell lines.' },
    discovery: {
        question: 'You must test a liver drug: choose between fresh primary hepatocytes from a donor and the immortal HepG2 cell line. What does each option really buy you?',
        options: ['Primary cells give realistic drug metabolism; HepG2 gives unlimited identical replicates — realism vs reproducibility', 'Primary cells are cheaper; cell lines are only used when tissue is unavailable', 'HepG2 is always superior because immortal cells are genetically normal', 'There is no difference — any liver cell behaves identically in a flask'],
        answer: 'Primary cells give realistic drug metabolism; HepG2 gives unlimited identical replicates — realism vs reproducibility',
        hook: 'The \'better\' cell doesn\'t exist — primary culture keeps the tissue\'s true character but dies; established lines are immortal and uniform but drift from normal. Every experiment pays for one with the other.',
    },
    teaching: [
        { title: 'Subculturing and Passaging of Animal Cells', text: 'Subculturing (or passaging) is the process of detaching adherent cells from their growth surface using enzymatic (e.g., trypsin-EDTA) or mechanical methods, then transferring a defined fraction.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_08_007', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Set up an animal cell culture lab: recreate the physico-chemical conditions cells demand outside the body, and choose between primary culture and established cell lines for a drug-toxicity study.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_007', title: 'Subculturing and Passaging of Animal Cells',
          caseStudy: { intro: 'Imagine you are culturing HeLa cells in a T-75 flask. On Monday they are 30% confluent; by Wednesday they form a solid sheet covering 100% of the plastic.',
            decisions: [{ prompt: 'What is the primary purpose of adding EDTA to trypsin during the passaging of adherent animal cells?', options: [
                { text: 'EDTA is a chelating agent that binds divalent cations (Ca²⁺ and Mg²⁺) required for', outcome: 'EDTA is a chelating agent that binds divalent cations (Ca²⁺ and Mg²⁺) required for.' },
                { text: 'EDTA neutralizes trypsin', outcome: 'Not quite — Students think "passage number" equals "population doubling number" and write them interchangeably.', reveals: 'passage-number-equals-population-doubling' },
                { text: 'EDTA provides nutrients', outcome: 'Not quite — Students think "passage number" equals "population doubling number" and write them interchangeably.', reveals: 'passage-number-equals-population-doubling' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_08_008', title: 'Cryopreservation of Animal Cells: Freezing and Thawing',
          scaffold: { problem: 'You need to prepare 50 mL of freezing medium for cryopreserving a Vero cell line.',
            steps: [
            { text: 'Identify the total volume required (50 mL) and the percentage composition (90% FBS, 10% DMSO).' },
            { text: 'Calculate volume of FBS = 90% of 50 mL = 0.90 × 50 mL = 45 mL.' },
            { text: 'Calculate volume of DMSO = 10% of 50 mL = 0.10 × 50 mL = 5 mL.' },
            { text: 'Verify sum = 45 mL + 5 mL = 50 mL (correct).' },
            { text: 'Calculate number of aliquots from 100 mL FBS: each aliquot uses 45 mL FBS, so 100 mL / 45 mL ≈ 2.22 → only 2 full.', faded: true, blankAnswer: '45 mL FBS + 5 mL DMSO per 50 mL aliquot; 2 full aliquots.' }
            ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_009', title: 'Contamination: Bacterial, Fungal, and Mycoplasma Issues',
          caseStudy: { intro: 'Imagine you are culturing CHO cells for recombinant EPO production.',
            decisions: [{ prompt: 'A researcher notes that the culture medium in a T‑75 flask has become turbid and the phenol red indicator has shifted from red to yellow.', options: [
                { text: '**Answer:** Bacterial contamination (likely Gram‑negative rods such as *Pseudomonas* or *E', outcome: '**Answer:** Bacterial contamination (likely Gram‑negative rods such as *Pseudomonas* or *E. coli*).' },
                { text: 'fungal contamination', outcome: 'Not quite — Students often believe that **adding antibiotics (Pen‑Strep) to the culture medium is a substitute.', reveals: 'adding-antibiotics-pen-strep-to' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_011', title: 'Applications of Animal Cell Culture in Research and Industry',
          caseStudy: { intro: 'Imagine a patient with haemophilia A who needs Factor VIII infusions to prevent spontaneous bleeding — historically this came from pooled human plasma carrying.',
            decisions: [{ prompt: 'Name any four therapeutic proteins listed in NCERT Table 8.3 that are produced in CHO cells and state their clinical use in one phrase each.', options: [
                { text: 'Correct answer: (1) FSH', outcome: 'Correct answer: (1) FSH — infertility treatment; (2) HGH — growth hormone deficiency; (3) EPO.' },
                { text: 'animal cell culture applications', outcome: 'Not quite — Students think "animal cell culture applications" means only "making medicines" and forget the.', reveals: 'animal-cell-culture-applications-means' },
                { text: 'making medicines', outcome: 'Not quite — Students think "animal cell culture applications" means only "making medicines" and forget the.', reveals: 'animal-cell-culture-applications-means' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_08_008', title: 'Identify each idea',
          dissect: { specimen: 'Animal Cell Culture · Part 2/2', spots: [
            { id: 's1', label: 'Subculturing and Passaging of Animal Cells', prompt: 'Which idea is this? — Subculturing (or passaging) is the process of detaching adherent cells from their growth.', answer: 'Subculturing and Passaging of Animal Cells', options: ['Subculturing and Passaging of Animal Cells', 'Cryopreservation of Animal Cells Freezing and Thawing', 'Contamination Bacterial Fungal and Mycoplasma Issues', 'Scale-up Roller Bottles Microcarriers and Bioreactors'] },
            { id: 's2', label: 'Cryopreservation of Animal Cells Freezing and Thawing', prompt: 'Which idea is this? — Cryopreservation is the process of preserving viable animal cells at ultra-low.', answer: 'Cryopreservation of Animal Cells Freezing and Thawing', options: ['Cryopreservation of Animal Cells Freezing and Thawing', 'Subculturing and Passaging of Animal Cells', 'Contamination Bacterial Fungal and Mycoplasma Issues', 'Scale-up Roller Bottles Microcarriers and Bioreactors'] },
            { id: 's3', label: 'Contamination Bacterial Fungal and Mycoplasma Issues', prompt: 'Which idea is this? — Contamination in animal cell culture refers to the unwanted presence of microorganisms.', answer: 'Contamination Bacterial Fungal and Mycoplasma Issues', options: ['Contamination Bacterial Fungal and Mycoplasma Issues', 'Subculturing and Passaging of Animal Cells', 'Cryopreservation of Animal Cells Freezing and Thawing', 'Scale-up Roller Bottles Microcarriers and Bioreactors'] },
            { id: 's4', label: 'Scale-up Roller Bottles Microcarriers and Bioreactors', prompt: 'Which idea is this? — Scale-up in animal cell culture refers to the systematic process of increasing cell.', answer: 'Scale-up Roller Bottles Microcarriers and Bioreactors', options: ['Scale-up Roller Bottles Microcarriers and Bioreactors', 'Subculturing and Passaging of Animal Cells', 'Cryopreservation of Animal Cells Freezing and Thawing', 'Contamination Bacterial Fungal and Mycoplasma Issues'] },
            { id: 's5', label: 'Applications of Animal Cell Culture in Research and Industry', prompt: 'Which idea is this? — Applications of animal cell culture refer to the diverse uses of in vitro grown animal.', answer: 'Applications of Animal Cell Culture in Research and Industry', options: ['Applications of Animal Cell Culture in Research and Industry', 'Subculturing and Passaging of Animal Cells', 'Cryopreservation of Animal Cells Freezing and Thawing', 'Contamination Bacterial Fungal and Mycoplasma Issues'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'During a pharma-lab internship, a student watches a liver-cell line clear a new drug in a toxicity screen. She proposes the company skip animal studies entirely: \'it\'s the same cells — the dish tells us everything.\'',
            decisions: [{ prompt: 'Can cell-culture data alone clear the drug?', options: [
                { text: 'No — culture gives controlled, reproducible screening on a homogeneous population, but it can\'t reproduce whole-body pharmacokinetics, immune responses or inter-organ metabolism, so regulators still need in vivo data.', outcome: 'Cell culture is a reductionist model, not a replica: great for ranking compounds early, blind to effects that need a whole organism.' },
                { text: 'Yes — the same cells behave identically in a flask as in the organism, so a clean screen means a safe drug.', outcome: 'In vitro cells lose systemic regulation — hormones, circulation, immune cells — and can miss a drug that\'s only toxic after the body metabolises it.', reveals: 'in-vitro-equals-in-vivo' },
                { text: 'No — cultured cells are too artificial to be useful at all; go straight to animal testing.', outcome: 'That throws away real advantages: no ethical clearance, reproducible dose-response curves and scalable screening make culture the right first filter.', reveals: 'cell-culture-useless' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_08_011', title: 'You made it',
          caseStudy: { intro: 'You now weigh realism against reproducibility — the core trade-off of all biomedical research. Culture types are crisp board content and the daily decision of every pharma research lab.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_007', difficulty: 'standard',
          question: 'Subculturing (or passaging) is the process of detaching adherent cells from.',
          hint: 'Revisit c12_biotech_cbse_08_006 and c11_biotech_cbse_05_010 (cyclin D/CDK4-Rb pathway).',
          misconception: 'Students think "passage number" equals "population doubling number" and write them interchangeably in exams.',
          parts: [
                { id: 'a', prompt: 'You have a T-75 flask of CHO cells at 90% confluency (approx. 1.5 × 10⁷ cells).', answer: 'Step 1: Total cells needed = 6 wells × 2 × 10⁵ cells/well = 1.2 × 10⁶ cells',
                  options: ['Step 1: Total cells needed = 6 wells × 2 × 10⁵ cells/well = 1.2 × 10⁶ cells', 'passage number', 'population doubling number'],
                  hint: 'Revisit c12_biotech_cbse_08_006 and c11_biotech_cbse_05_010 (cyclin D/CDK4-Rb pathway) to link.',
                  misconception: 'Students think "passage number" equals "population doubling number" and write them interchangeably in exams.' }
          ],
            remediations: { 'passage-number-equals-population-doubling': { steps: ['If a student conflates passage number with population doublings: (1) Have them calculate PDL for three scenarios: 1:2.', '(2) Ask them to re-read the NCERT definition: "A passage number refers specifically to the number of times a cell line.', 'After 12 days, what is the passage number and approximate PDL?" (Passage = 4, PDL = 4 × log₂5 ≈ 9.3).', '(4) Remediate by revisiting c12_biotech_cbse_08_003 (finite vs continuous) to link PDL to Hayflick limit.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "passage number" equals "population doubling number" and write them interchangeably in exams.',
          parts: [
                { id: 'a', prompt: 'A lab protocol says: "Incubate cells with 0.25% trypsin-EDTA at 37 °C for 10 minutes." A student follows this exactly, but the next passage shows 80% cell.', answer: '10 minutes at 37 °C with 0.25% trypsin is excessive for most mammalian cells',
                  options: ['10 minutes at 37 °C with 0.25% trypsin is excessive for most mammalian cells', 'complete detachment', 'minimal necessary exposure', 'passage number'],
                  hint: 'Revisit c12_biotech_cbse_08_006 and c11_biotech_cbse_05_010 (cyclin D/CDK4-Rb pathway) to link.',
                  misconception: 'Students think "passage number" equals "population doubling number" and write them interchangeably in exams.' },
                { id: 'b', prompt: 'Design a passaging workflow for a newly established primary mouse embryonic fibroblast (MEF) culture that will be used for a CRISPR screen requiring 5 × 10⁷.', answer: 'MEFs are finite, adherent, and senesce by passage 5–6',
                  options: ['MEFs are finite, adherent, and senesce by passage 5–6', 'passage number', 'population doubling number'],
                  hint: 'Revisit c12_biotech_cbse_08_006 and c11_biotech_cbse_05_010 (cyclin D/CDK4-Rb pathway) to link.',
                  misconception: 'Students think "passage number" equals "population doubling number" and write them interchangeably in exams.' }
          ],
            remediations: { 'passage-number-equals-population-doubling': { steps: ['If a student conflates passage number with population doublings: (1) Have them calculate PDL for three scenarios: 1:2.', '(2) Ask them to re-read the NCERT definition: "A passage number refers specifically to the number of times a cell line.', 'After 12 days, what is the passage number and approximate PDL?" (Passage = 4, PDL = 4 × log₂5 ≈ 9.3).', '(4) Remediate by revisiting c12_biotech_cbse_08_003 (finite vs continuous) to link PDL to Hayflick limit.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_008', difficulty: 'standard',
          question: 'Cryopreservation is the process of preserving viable animal cells at ultra-low.',
          hint: 'Revisit Class 11 Biology node c11_bio_cbse_08_003 (Fluid Mosaic Model) for membrane.',
          misconception: 'Students believe that **faster freezing is better** because it "gets the cells to the safe low temperature quickly.".',
          parts: [
                { id: 'a', prompt: 'A researcher has 5 mL of a healthy log-phase CHO cell suspension.', answer: 'Total cells = 5 mL × 2 × 10⁶ cells/mL = 1 × 10⁷ cells',
                  options: ['Total cells = 5 mL × 2 × 10⁶ cells/mL = 1 × 10⁷ cells', 'gets the cells to the safe low temperature quickly'],
                  hint: 'Revisit Class 11 Biology node c11_bio_cbse_08_003 (Fluid Mosaic Model) for membrane permeability.',
                  misconception: 'Students believe that **faster freezing is better** because it "gets the cells to the safe low temperature quickly." This is exactly.' }
          ],
            remediations: { 'faster-freezing-is-better-because': { steps: ['If the student insists faster freezing is better: (1) Ask them to draw a cell in a freezing medium where extracellular.', '(2) Prompt: "Where is the water concentration higher — inside or outside the cell?" (3) Guide them to realise water.', '(4) Have them revisit **c11_bio_cbse_08_003** (Fluid Mosaic Model) to recall that membrane fluidity drops at low.', '(5) Re-test with Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_009', difficulty: 'standard',
          question: 'Contamination in animal cell culture refers to the unwanted presence.',
          hint: 'Review the aseptic technique workflow in node `c12_biotech_cbse_08_004` (media.',
          misconception: 'Students often believe that **adding antibiotics (Pen‑Strep) to the culture medium is a substitute for good aseptic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Contamination in animal cell culture refers to the unwanted presence of microorganisms',
                  options: ['Contamination in animal cell culture refers to the unwanted presence of microorganisms', 'Animal cell culture is the in vitro maintenance and proliferation of animal cells under', 'Primary cell culture is the initial heterogeneous population of cells isolated directly', 'Finite cell lines are cell populations derived from normal tissues that undergo a limited'],
                  hint: 'Review the aseptic technique workflow in node `c12_biotech_cbse_08_004` (media preparation) and the.',
                  misconception: 'Students often believe that **adding antibiotics (Pen‑Strep) to the culture medium is a substitute for good aseptic technique and will.' }
          ],
            remediations: { 'adding-antibiotics-pen-strep-to': { steps: ['If a student cannot differentiate contaminant types or design a monitoring plan: 1.', '**Re‑visit microscopy basics** — use node `c11_biotech_cbse_12_001` (Microscopy) to practice identifying bacterial.', '**Review microbial biology** — nodes `c11_bio_cbse_02_003` (Bacteria structure/reproduction) and `c11_bio_cbse_02_005`.', '**Simulate a contamination drill** — give the student three blinded culture photos (bacterial, fungal.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_010', difficulty: 'standard',
          question: 'Scale-up in animal cell culture refers to the systematic process of increasing.',
          hint: 'Revisit c12_biotech_cbse_08_006 and specifically review the distinction between.',
          misconception: '**Misconception**: "Scale-up means keeping the *same* parameters (pH, temperature, RPM) constant across all vessel.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Scale-up in animal cell culture refers to the systematic process of increasing cell',
                  options: ['Scale-up in animal cell culture refers to the systematic process of increasing cell', 'Animal cell culture is the in vitro maintenance and proliferation of animal cells under', 'Primary cell culture is the initial heterogeneous population of cells isolated directly', 'Finite cell lines are cell populations derived from normal tissues that undergo a limited'],
                  hint: 'Revisit c12_biotech_cbse_08_006 and specifically review the distinction between integrin-mediated.',
                  misconception: '**Misconception**: "Scale-up means keeping the *same* parameters (pH, temperature, RPM) constant across all vessel sizes." **Why it\'s.' }
          ],
            remediations: { 'misconception-scale-up-means-keeping': { steps: ['If a student exhibits the above misconception: 1.', '**Revisit Node c12_biotech_cbse_08_006 (Anchorage Dependence)** — confirm they understand *why* adherent cells need.', '**Demonstrate with a physical analogy**: Stir water in a teacup (radius 3 cm) at 60 rpm vs.', 'a bathtub (radius 50 cm) at 60 rpm — feel the difference in fluid velocity at the wall.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_011', difficulty: 'standard',
          question: 'Applications of animal cell culture refer to the diverse uses of in vitro grown.',
          hint: 'Revisit c11_bio_cbse_19_003 (insulin recombinant production) and c12_biotech_cbse_08_004.',
          misconception: 'Students think "animal cell culture applications" means only "making medicines" and forget the research applications.',
          parts: [
                { id: 'a', prompt: 'Name any four therapeutic proteins listed in NCERT Table 8.3 that are produced in CHO cells and state their clinical use in one phrase each.', answer: 'Correct answer: (1) FSH',
                  options: ['Correct answer: (1) FSH', 'animal cell culture applications', 'making medicines'],
                  hint: 'Revisit c11_bio_cbse_19_003 (insulin recombinant production) and c12_biotech_cbse_08_004.',
                  misconception: 'Students think "animal cell culture applications" means only "making medicines" and forget the research applications: (1) model systems for.' }
          ],
            remediations: { 'animal-cell-culture-applications-means': { steps: ['Have the student create a two-column table: LEFT column "Research Applications" — list 4 from NCERT (model systems.', 'For each therapeutic protein in Table 8.3, write: Protein | Host cell | Glycoprotein? (Y/N) | Clinical use.', 'Draw the tPA production flowchart (Fig 8.9) from memory with 6 boxes.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, revisit node c12_biotech_cbse_08_004 (media types) and.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
