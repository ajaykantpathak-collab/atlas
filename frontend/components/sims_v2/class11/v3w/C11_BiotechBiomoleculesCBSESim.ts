import type { SimDef } from '../../engine/types';
import C11_BiotechBiomoleculesCBSESim from '../../../simulations/c6_12_new/C11_BiotechBiomoleculesCBSESim';

/** v3 wrapped master — C11_BiotechBiomoleculesCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biotechbiomoleculescbsesim: SimDef = {
    id: 'v3w_c11_biotechbiomoleculescbsesim',
    title: 'Biomolecules CBSE',
    subtitle: 'This node covers fatty acid structure/nomenclature, triglyceride types, phospholipid.',
    classLevel: 11, subject: 'biotechnology', topic: 'Lipids: Fatty Acids, Triglycerides and Phospholipids',
    chapters: [],
    nodeIds: ['c11_biotech_cbse_03_004', 'c11_biotech_cbse_03_009', 'c11_biotech_cbse_02_010', 'c11_biotech_cbse_12_002', 'c11_biotech_cbse_12_003', 'c11_biotech_cbse_12_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you drop a spoonful of cooking oil (triglyceride) into a glass of water — it floats as a separate.', goal: 'Master Biomolecules CBSE.' },
    discovery: {
        question: 'Write the systematic shorthand notation for a saturated fatty acid with 16 carbon atoms. What does each part of the notation signify?',
        options: ['**Answer:** 16:0', 'What lipid forms the cell membrane?', 'triglyceride'],
        answer: '**Answer:** 16:0',
        hook: '**“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride” interchangeably.',
    },
    teaching: [
        { title: 'Lipids are a diverse group of hydrophobic or.', text: 'Lipids are a diverse group of hydrophobic or amphipathic biomolecules primarily composed of hydrocarbon chains, classified into simple lipids (fats/oils as triacylglycerols, waxes) and compound.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_03_004', title: 'Lipids are a diverse group of.',
          scaffold: { problem: 'A fatty acid isolated from a seed oil has the systematic notation **18:3 (Δ9,12,15)**.',
            steps: [
            { text: 'Decode notation — 18 carbons, 3 double bonds at Δ9, Δ12, Δ15.' },
            { text: 'Number carbons from carboxyl carbon (C-1) to methyl (C-18). Place double bonds between C9–C10, C12–C13, C15–C16.' },
            { text: 'Recognize this pattern (18:3 Δ9,12,15) as **α-linolenic acid** (an ω-3 fatty acid).' },
            { text: 'Theoretical IV for 3 double bonds in C18 = 3 × 126 = 378. Experimental IV = 0.85 g I₂/g × 100 = 85.' },
            { text: 'Conclude: The fatty acid is α-linolenic acid; reported IV suggests sample is not pure or measurement error.', faded: true, blankAnswer: '(a) 18 carbons, 3 double bonds. (b) Skeleton with cis.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_03_009', title: 'Water is a polar molecule with a bent.',
          scaffold: { problem: 'A biotechnology lab needs to prepare 500 mL of 0.1 M Tris-HCl buffer (pH 8.0) for DNA electrophoresis.',
            steps: [
            { text: 'Calculate moles of Tris base: mass / molar mass = 6.05 g / 121.1 g·mol⁻¹ = 0.0500 mol.' },
            { text: 'For pH = pKa, [Tris-H⁺] = [Tris] (Henderson-Hasselbalch). To protonate half, moles HCl needed = 0.0500 mol / 2 = 0.0250.' },
            { text: 'Volume of 12 M HCl = moles / molarity = 0.0250 mol / 12 mol·L⁻¹ = 0.00208 L = 2.08 mL.' },
            { text: 'Final [Cl⁻] = moles HCl / total volume = 0.0250 mol / 0.500 L = 0.050 M.' },
            { text: 'Water\'s high dielectric constant (ε ≈ 78.5) ensures Tris (a weak base) and HCl (strong acid) dissociate fully into.', faded: true, blankAnswer: '(a) 0.0500 mol, (b) 2.08 mL of 12 M HCl, (c) 0.050 M Cl⁻.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_02_010', title: 'Ribosomes are non-membranous.',
          scaffold: { problem: 'A biotechnology student prepares a cell lysate from rat liver (eukaryotic) and E.',
            steps: [
            { text: 'Identify all possible particles in the mix: prokaryotic 30S, 50S, 70S; eukaryotic 40S, 60S, 80S.' },
            { text: 'Recall sedimentation order (slowest to fastest): free small subunits < free large subunits < intact prokaryotic.' },
            { text: 'Map the four observed peaks to the six particles. Since only four peaks, some particles co-sediment or are absent.' },
            { text: 'Assign peaks: Peak 4 (topmost) = 30S + 40S; Peak 7 = 50S + 60S; Peak 10 = 70S; Peak 13 (bottom) = 80S.' },
            { text: 'Verify with A260 ratios: 70S and 80S peaks should be larger (intact ribosomes dominate). Subunit peaks smaller.' },
            { text: 'Confirm by running control gradients of pure E. coli and pure rat liver lysates separately to validate assignments.', faded: true, blankAnswer: 'Peak 4: 30S + 40S subunits; Peak 7: 50S + 60S subunits;.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_12_002', title: 'Centrifugation is a biophysical.',
          scaffold: { problem: 'A protocol for pelleting mitochondria states: "Centrifuge at 12,000 ×g for 15 min." Your lab has a fixed-angle rotor with maximum radius.',
            steps: [
            { text: 'Identify given: RCF_target = 12,000 ×g, r = 9.5 cm. Find rpm.' },
            { text: 'Rearrange formula: rpm = √(RCF / (1.118×10⁻⁵ × r)).' },
            { text: 'Substitute: rpm = √(12,000 / (1.118×10⁻⁵ × 9.5)) = √(12,000 / 1.0621×10⁻⁴) = √(1.1298×10⁸) ≈ 10,630 rpm.' },
            { text: 'Calculate actual RCF at 12,000 rpm: RCF_actual = 1.118×10⁻⁵ × 9.5 × (12,000)² = 1.118×10⁻⁵ × 9.5 × 1.44×10⁸ = 15,260 ×g.' },
            { text: 'Compute overshoot factor: 15,260 / 12,000 = 1.27. You overshoot by 27%, risking mitochondrial damage and co-pelleting.', faded: true, blankAnswer: 'Required rpm = 10,630 rpm. At 12,000 rpm, RCF = 15,260 ×g.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_12_003', title: 'Spectrophotometry is an analytical.',
          scaffold: { problem: 'A researcher measures the absorbance of a DNA sample at 260 nm in a 1 cm quartz cuvette and obtains A = 0.42.',
            steps: [
            { text: 'Recognize that the measured absorbance (0.42) is from the diluted sample.' },
            { text: 'Calculate diluted concentration: 0.42 × 50 µg/mL = 21 µg/mL.' },
            { text: 'Determine dilution factor: Total volume = 500 µL, sample volume = 5 µL → dilution factor = 500/5 = 100.' },
            { text: 'Calculate original concentration: 21 µg/mL × 100 = 2100 µg/mL.' },
            { text: 'Convert to ng/µL: 2100 µg/mL = 2100 ng/µL (since 1 µg/mL = 1 ng/µL).', faded: true, blankAnswer: 'Original DNA concentration = 2100 µg/mL = 2100 ng/µL.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_12_004', title: 'Chromatography is a separation.',
          scaffold: { problem: 'You have a mixture of three proteins: Thyroglobulin (669 kDa, globular), BSA (66 kDa, globular), and Cytochrome c (12 kDa, globular).',
            steps: [
            { text: 'Identify the fractionation range of the gel (4–150 kDa) and the molecular weights of the proteins.' },
            { text: 'Compare each protein\'s MW to the fractionation range: Thyroglobulin (669 kDa) > upper limit (150 kDa) → completely.' },
            { text: 'Determine elution order: largest (most excluded) elutes first → Thyroglobulin (Vo), then BSA, then Cytochrome c (near.' },
            { text: 'Note that all are globular, so hydrodynamic radius correlates with MW; no shape correction needed.' },
            { text: 'Verify: Vo contains Thyroglobulin only; Vt contains Cytochrome c and buffer salts; BSA elutes in between.', faded: true, blankAnswer: 'Elution order: 1) Thyroglobulin (Vo), 2) BSA (between Vo.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_03_009', title: 'Identify each idea',
          dissect: { specimen: 'Biomolecules CBSE', spots: [
            { id: 's1', label: 'Lipids are a diverse group', prompt: 'Which idea is this? — Lipids are a diverse group of hydrophobic or amphipathic biomolecules primarily composed.', answer: 'Lipids are a diverse group', options: ['Lipids are a diverse group', 'Water is a polar molecule', 'Ribosomes are non-membranous ribonucleoprotein complexes', 'Centrifugation is a biophysical separation'] },
            { id: 's2', label: 'Water is a polar molecule', prompt: 'Which idea is this? — Water is a polar molecule with a bent geometry (104.5° bond angle) that exhibits.', answer: 'Water is a polar molecule', options: ['Water is a polar molecule', 'Lipids are a diverse group', 'Ribosomes are non-membranous ribonucleoprotein complexes', 'Centrifugation is a biophysical separation'] },
            { id: 's3', label: 'Ribosomes are non-membranous ribonucleoprotein complexes', prompt: 'Which idea is this? — Ribosomes are non-membranous ribonucleoprotein complexes composed of ribosomal RNA (rRNA).', answer: 'Ribosomes are non-membranous ribonucleoprotein complexes', options: ['Ribosomes are non-membranous ribonucleoprotein complexes', 'Lipids are a diverse group', 'Water is a polar molecule', 'Centrifugation is a biophysical separation'] },
            { id: 's4', label: 'Centrifugation is a biophysical separation', prompt: 'Which idea is this? — Centrifugation is a biophysical separation technique that uses centrifugal force.', answer: 'Centrifugation is a biophysical separation', options: ['Centrifugation is a biophysical separation', 'Lipids are a diverse group', 'Water is a polar molecule', 'Ribosomes are non-membranous ribonucleoprotein complexes'] },
            { id: 's5', label: 'Spectrophotometry is an analytical technique', prompt: 'Which idea is this? — Spectrophotometry is an analytical technique that measures the amount of light absorbed.', answer: 'Spectrophotometry is an analytical technique', options: ['Spectrophotometry is an analytical technique', 'Lipids are a diverse group', 'Water is a polar molecule', 'Ribosomes are non-membranous ribonucleoprotein complexes'] },
            { id: 's6', label: 'Chromatography is a separation technique', prompt: 'Which idea is this? — Chromatography is a separation technique where components of a mixture are distributed.', answer: 'Chromatography is a separation technique', options: ['Chromatography is a separation technique', 'Lipids are a diverse group', 'Water is a polar molecule', 'Ribosomes are non-membranous ribonucleoprotein complexes'] }
          ] } }
    ],
    explore: { component: C11_BiotechBiomoleculesCBSESim, prompt: 'Explore the interactive — Biomolecules CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_004', difficulty: 'standard',
          question: 'Lipids are a diverse group of hydrophobic or amphipathic biomolecules primarily.',
          hint: 'If stuck, revisit Class 10 Chemistry Chapter 4 (Carbon Compounds): ester functional.',
          misconception: '**“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride” interchangeably.',
          parts: [
                { id: 'a', prompt: 'Write the systematic shorthand notation for a saturated fatty acid with 16 carbon atoms. What does each part of the notation signify?', answer: '**Answer:** 16:0',
                  options: ['**Answer:** 16:0', 'What lipid forms the cell membrane?', 'triglyceride'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride” interchangeably because dietary fats are.' },
                { id: 'b', prompt: 'A fatty acid is denoted as 18:2 (Δ9,12). Without drawing the full structure, explain in your own words: (a) how many carbons, (b) how many double bonds, (c).', answer: '**Answer:** (a) 18 carbons total',
                  options: ['**Answer:** (a) 18 carbons total', 'conjugated', 'What lipid forms the cell membrane?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride” interchangeably because dietary fats are.' },
                { id: 'c', prompt: 'You are given three test tubes: (A) pure tripalmitin (triglyceride with three palmitic acids), (B) pure phosphatidylcholine (a glycerophospholipid), (C) a 1:1.', answer: '**Answer:** - Tube A (tripalmitin): **Oil droplets**',
                  options: ['**Answer:** - Tube A (tripalmitin): **Oil droplets**', 'What lipid forms the cell membrane?', 'triglyceride'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride” interchangeably because dietary fats are.' }
          ],
            remediations: { 'all-lipids-are-fats-triglycerides': { steps: ['**Re-anchor the definition**: Have the student write the one-sentence solubility definition: “Lipids are biomolecules.', '**Contrast table exercise**: Give a 3-column table (Class | Backbone | Key Functional Groups | Amphipathic?', 'Student fills it for the five classes using NCERT Figs 3.13–3.15.', '**“Odd one out” drill**: Show four structures (tripalmitin, phosphatidylcholine, cholesterol, beeswax).'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride” interchangeably.',
          parts: [
                { id: 'a', prompt: 'A researcher claims: “Because cholesterol has a hydroxyl group at C-3, it is a phospholipid.” Evaluate this statement. Is cholesterol a phospholipid?', answer: '**Answer:** The claim is **false**',
                  options: ['**Answer:** The claim is **false**', 'cholesterol is a glycolipid', 'What lipid forms the cell membrane?', 'triglyceride'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**“All lipids are fats / triglycerides.”** Students often use “lipid”, “fat”, and “triglyceride” interchangeably because dietary fats are.' }
          ],
            remediations: { 'all-lipids-are-fats-triglycerides': { steps: ['**Re-anchor the definition**: Have the student write the one-sentence solubility definition: “Lipids are biomolecules.', '**Contrast table exercise**: Give a 3-column table (Class | Backbone | Key Functional Groups | Amphipathic?', 'Student fills it for the five classes using NCERT Figs 3.13–3.15.', '**“Odd one out” drill**: Show four structures (tripalmitin, phosphatidylcholine, cholesterol, beeswax).'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_009', difficulty: 'standard',
          question: 'Water is a polar molecule with a bent geometry (104.5° bond angle) that.',
          hint: 'Revisit Class 9 Chemistry Chapter 3 (Atoms and Molecules) for covalent bonding and.',
          misconception: 'Students often believe "water\'s high specific heat is because water molecules have many degrees of freedom" or.',
          parts: [
                { id: 'a', prompt: 'State the bond angle in a water molecule and explain how this geometry, combined with the electronegativity difference between oxygen and hydrogen, gives water.', answer: 'The H–O–H bond angle is 104.5°',
                  options: ['The H–O–H bond angle is 104.5°', '180° bond angle', 'no dipole moment'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "water\'s high specific heat is because water molecules have many degrees of freedom" or "hydrogen bonds are covalent.' },
                { id: 'b', prompt: 'A student claims: "Water has a high boiling point because its molecules are heavy." Critique this statement using the concept of hydrogen bonding and compare.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'hydrogen bonds are covalent bonds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "water\'s high specific heat is because water molecules have many degrees of freedom" or "hydrogen bonds are covalent.' },
                { id: 'c', prompt: 'You are given 100 mL of water at 25°C. Calculate the energy (in kJ) required to heat it to 100°C and then completely vaporize it.', answer: 'Step 1: Mass of water = 100 mL × 1.00 g·mL⁻¹ = 100 g',
                  options: ['Step 1: Mass of water = 100 mL × 1.00 g·mL⁻¹ = 100 g', 'hydrogen bonds are covalent bonds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "water\'s high specific heat is because water molecules have many degrees of freedom" or "hydrogen bonds are covalent.' }
          ],
            remediations: { 'water-s-high-specific-heat': { steps: ['Have the student draw a single water molecule and label covalent bonds (O–H) vs. hydrogen bonds (O···H–O) to a neighbor.', 'Use a molecular dynamics simulation (e.g., PhET "States of Matter" or "Molecule Polarity") to visualize H-bonds.', 'Calculate energy to break one H-bond (~20 kJ·mol⁻¹) vs. energy to raise 1 mol water by 1 K (75.3 J·mol⁻¹·K⁻¹ × 1 K =.', 'Assign a 2-minute write-up: "Explain to a Class 9 student why water\'s specific heat is high, using the words \'hydrogen.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "water\'s high specific heat is because water molecules have many degrees of freedom" or.',
          parts: [
                { id: 'a', prompt: 'A researcher argues: "Since water has a high dielectric constant (ε ≈ 78.5), it weakens electrostatic interactions between charged groups on a protein, so salt.', answer: 'Partially correct',
                  options: ['Partially correct', 'salt bridges are impossible in water', 'dielectric constant doesn\'t matter', 'hydrogen bonds are covalent bonds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "water\'s high specific heat is because water molecules have many degrees of freedom" or "hydrogen bonds are covalent.' },
                { id: 'b', prompt: 'Design a thought experiment to demonstrate that the hydrophobic effect is entropically driven at room temperature.', answer: 'System: Two nonpolar solute molecules (e.g., methane) in water at 25°C',
                  options: ['System: Two nonpolar solute molecules (e.g., methane) in water at 25°C', 'measure temperature change', 'hydrophobic effect is enthalpic', 'hydrogen bonds are covalent bonds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "water\'s high specific heat is because water molecules have many degrees of freedom" or "hydrogen bonds are covalent.' }
          ],
            remediations: { 'water-s-high-specific-heat': { steps: ['Have the student draw a single water molecule and label covalent bonds (O–H) vs. hydrogen bonds (O···H–O) to a neighbor.', 'Use a molecular dynamics simulation (e.g., PhET "States of Matter" or "Molecule Polarity") to visualize H-bonds.', 'Calculate energy to break one H-bond (~20 kJ·mol⁻¹) vs. energy to raise 1 mol water by 1 K (75.3 J·mol⁻¹·K⁻¹ × 1 K =.', 'Assign a 2-minute write-up: "Explain to a Class 9 student why water\'s specific heat is high, using the words \'hydrogen.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_010', difficulty: 'standard',
          question: 'Ribosomes are non-membranous ribonucleoprotein complexes composed of ribosomal.',
          hint: 'If stuck, revisit the prokaryotic vs eukaryotic cell comparison (c11_biotech_cbse_02_001).',
          misconception: 'Students believe Svedberg units are additive (30S + 50S = 80S) because they treat \'S\' as a mass unit.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ribosomes are non-membranous ribonucleoprotein complexes composed of ribosomal RNA (rRNA)',
                  options: ['Ribosomes are non-membranous ribonucleoprotein complexes composed of ribosomal RNA (rRNA)', 'Lipids are a diverse group of hydrophobic or amphipathic biomolecules primarily composed', 'Water is a polar molecule with a bent geometry (104.5° bond angle) that exhibits', 'Centrifugation is a biophysical separation technique that uses centrifugal force'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Svedberg units are additive (30S + 50S = 80S) because they treat \'S\' as a mass unit.' }
          ],
            remediations: { 'svedberg-units-are-additive-30s': { steps: ['Show a video of sucrose gradient centrifugation — particles separate by sedimentation rate, not mass alone.', 'Use the analogy of a centrifuge separating sand (compact) vs. feathers (fluffy) of equal mass — shape matters.', 'Provide a table: Prokaryote 30S (16S rRNA + 21 proteins) + 50S (23S+5S rRNA + 34 proteins) = 70S; Eukaryote 40S (18S.', 'Ask student to calculate the "missing" S units (30+50=80 but observed 70; 40+60=100 but observed 80) and explain the.', 'Connect to mitochondrial 55S (28S+39S) to reinforce the concept.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_02_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Svedberg units are additive (30S + 50S = 80S) because they treat \'S\' as a mass unit.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Ribosomes are the only non-membranous organelles in the cell." Provide evidence for or against.', answer: 'The statement is false',
                  options: ['The statement is false', 'ribosomes have no membrane', 'Svedberg units are additive (30S + 50S = 80S)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Svedberg units are additive (30S + 50S = 80S) because they treat \'S\' as a mass unit.' }
          ],
            remediations: { 'svedberg-units-are-additive-30s': { steps: ['Show a video of sucrose gradient centrifugation — particles separate by sedimentation rate, not mass alone.', 'Use the analogy of a centrifuge separating sand (compact) vs. feathers (fluffy) of equal mass — shape matters.', 'Provide a table: Prokaryote 30S (16S rRNA + 21 proteins) + 50S (23S+5S rRNA + 34 proteins) = 70S; Eukaryote 40S (18S.', 'Ask student to calculate the "missing" S units (30+50=80 but observed 70; 40+60=100 but observed 80) and explain the.', 'Connect to mitochondrial 55S (28S+39S) to reinforce the concept.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_002', difficulty: 'standard',
          question: 'Centrifugation is a biophysical separation technique that uses centrifugal.',
          hint: 'Revisit Class 9 Biology Chapter 5 (Cell Organelles) for organelle sizes and Class 9.',
          misconception: 'Students believe **"higher rpm always gives better separation"** and that **differential centrifugation separates by.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Differential centrifugation separates particles based on density differences, while density gradient centrifugation separates based on size.', answer: 'The student has **reversed the principles**',
                  options: ['The student has **reversed the principles**', 'higher rpm always gives better separation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"higher rpm always gives better separation"** and that **differential centrifugation separates by density**.' },
                { id: 'b', prompt: 'You have a crude liver homogenate containing nuclei (~5-10 µm), mitochondria (~0.5-1 µm), microsomes (vesicles, ~50-100 nm), and ribosomes (~20-30 nm).', answer: '**Step 1: Low speed (600-1,000 ×g, 10 min)** – Pellets nuclei and whole cells',
                  options: ['**Step 1: Low speed (600-1,000 ×g, 10 min)** – Pellets nuclei and whole cells', 'higher rpm always gives better separation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"higher rpm always gives better separation"** and that **differential centrifugation separates by density**.' },
                { id: 'c', prompt: 'Compare rate-zonal and isopycnic density gradient centrifugation on: (a) gradient type, (b) separation criterion, (c) run time relative to particle banding,.', answer: '**(a) Gradient:** Rate-zonal uses shallow gradient (5-20% sucrose)',
                  options: ['**(a) Gradient:** Rate-zonal uses shallow gradient (5-20% sucrose)', 'higher rpm always gives better separation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"higher rpm always gives better separation"** and that **differential centrifugation separates by density**.' }
          ],
            remediations: { 'higher-rpm-always-gives-better': { steps: ['** Draw a table with two columns: "Differential Centrifugation" and "Density Gradient Centrifugation".', '** Demonstrate RCF calculation: Take two rotors (r=5 cm and r=15 cm) at same rpm (e.g., 10,000).', '** Show a video/simulation of rate-zonal vs isopycnic banding.', '** Assign a "protocol debugging" exercise: "A student spun nuclei at 100,000 ×g.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"higher rpm always gives better separation"** and that **differential centrifugation separates by.',
          parts: [
                { id: 'a', prompt: 'Create a novel separation challenge: You have a mixture of two viruses – Virus A (diameter 50 nm, density 1.15 g/cm³) and Virus B (diameter 80 nm, density 1.15.', answer: '**Method: Rate-zonal density gradient centrifugation.**',
                  options: ['**Method: Rate-zonal density gradient centrifugation.**', 'higher rpm always gives better separation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"higher rpm always gives better separation"** and that **differential centrifugation separates by density**.' }
          ],
            remediations: { 'higher-rpm-always-gives-better': { steps: ['** Draw a table with two columns: "Differential Centrifugation" and "Density Gradient Centrifugation".', '** Demonstrate RCF calculation: Take two rotors (r=5 cm and r=15 cm) at same rpm (e.g., 10,000).', '** Show a video/simulation of rate-zonal vs isopycnic banding.', '** Assign a "protocol debugging" exercise: "A student spun nuclei at 100,000 ×g.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_003', difficulty: 'standard',
          question: 'Spectrophotometry is an analytical technique that measures the amount of light.',
          hint: 'Review Class 9 chemistry chapter on solutions (c9_chem_ch1_2) for molarity and dilution.',
          misconception: 'Students often believe that the Beer-Lambert law (A = εlc) holds for all concentrations and all samples.',
          parts: [
                { id: 'a', prompt: 'Define absorbance (A) and transmittance (T). Write the mathematical relationship between them.', answer: 'Absorbance (A) is the negative logarithm of transmittance: A = -log₁₀(T), where',
                  options: ['Absorbance (A) is the negative logarithm of transmittance: A = -log₁₀(T), where', 'A = I/I₀', 'A = log(I/I₀)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Beer-Lambert law (A = εlc) holds for all concentrations and all samples.' },
                { id: 'b', prompt: 'Why is absorbance preferred over transmittance for constructing calibration curves in quantitative spectrophotometry?', answer: 'Absorbance is directly proportional to concentration (A = εlc) according to the',
                  options: ['Absorbance is directly proportional to concentration (A = εlc) according to the', 'both are linear', 'transmittance is easier to measure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Beer-Lambert law (A = εlc) holds for all concentrations and all samples.' },
                { id: 'c', prompt: 'Compare a colorimeter and a UV-visible spectrophotometer in terms of (a) wavelength selection mechanism, (b) bandwidth, and (c) suitability for scanning an.', answer: 'wavelength selection mechanism, (',
                  options: ['wavelength selection mechanism, (', 'both use prisms', 'colorimeter gives better resolution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the Beer-Lambert law (A = εlc) holds for all concentrations and all samples.' }
          ],
            remediations: { 'the-beer-lambert-law-a': { steps: ['Re-derive A = -log(I/I₀) from T = I/I₀ to reinforce the logarithmic link.', 'Use a simulator (e.g., PhET Beer-Lambert Law) to vary concentration and path length, observing when the A vs.', 'Practice converting between ε (M⁻¹ cm⁻¹) and E¹% (mL g⁻¹ cm⁻¹) using molecular weight: ε = E¹% × MW / 10.', 'Measure a known dye (e.g., potassium permanganate) at 5 concentrations spanning A = 0.1 to 1.5, plot A vs.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_004', difficulty: 'standard',
          question: 'Chromatography is a separation technique where components of a mixture are.',
          hint: 'Review Class 10 Chemistry pH/pI relationship (c10_chem_cbse_02_008) and Class 9 Chemistry.',
          misconception: 'Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration, believing a 100 kDa.',
          parts: [
                { id: 'a', prompt: 'A mixture contains Protein A (pI 4.5), Protein B (pI 7.0), and Protein C (pI 9.5).', answer: 'At pH 8.0: Protein A (pI 4.5) is negatively charged → binds strongly',
                  options: ['At pH 8.0: Protein A (pI 4.5) is negatively charged → binds strongly', 'more negative binds less', 'more negative requires more counter-ions to displace'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration, believing a 100 kDa globular protein and a 100.' }
          ],
            remediations: { 'students-consistently-confuse-molecular-weight': { steps: ['Draw a pore diagram: large molecule bypassing pores (short path) vs small molecule entering pores (long path) —.', 'Use a charge table: list protein pI, buffer pH, resulting protein charge, resin type, and binding prediction for 5.', 'Role-play the ion exchange column: student acts as "salt ion" displacing "protein" from "resin" — physically.', 'Revisit Class 10 Chemistry (c10_chem_cbse_02_008) pH/pI relationship: if pH > pI, protein is negative; if pH < pI,.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration, believing a 100 kDa.',
          parts: [
                { id: 'a', prompt: 'Design a two-step purification scheme for a target enzyme (MW 60 kDa, pI 5.0) from a crude plant extract containing proteases (MW 25 kDa, pI 8.0),.', answer: 'Step 1: Ion exchange on DEAE-agarose at pH 7.0',
                  options: ['Step 1: Ion exchange on DEAE-agarose at pH 7.0', 'molecular weight', 'hydrodynamic size', 'Protein with pI 9 binds to DEAE at pH 7'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration, believing a 100 kDa globular protein and a 100.' }
          ],
            remediations: { 'students-consistently-confuse-molecular-weight': { steps: ['Draw a pore diagram: large molecule bypassing pores (short path) vs small molecule entering pores (long path) —.', 'Use a charge table: list protein pI, buffer pH, resulting protein charge, resin type, and binding prediction for 5.', 'Role-play the ion exchange column: student acts as "salt ion" displacing "protein" from "resin" — physically.', 'Revisit Class 10 Chemistry (c10_chem_cbse_02_008) pH/pI relationship: if pH > pI, protein is negative; if pH < pI,.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
