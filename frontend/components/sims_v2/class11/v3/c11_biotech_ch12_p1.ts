import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch12_p1: SimDef = {
    id: 'v3_c11_biotech_ch12_p1',
    title: 'Tools and Techniques in Biotechnology · Part 1/2',
    subtitle: 'Chain together PCR, electrophoresis and blotting into one analysis pipeline.',
    classLevel: 11, subject: 'biotechnology', topic: 'Tools and Techniques in Biotechnology · Part 1/2',
    chapters: ['c11_biotech_ch12'],
    nodeIds: ['c11_biotech_cbse_12_001', 'c11_biotech_cbse_12_002', 'c11_biotech_cbse_12_003', 'c11_biotech_cbse_12_004', 'c11_biotech_cbse_12_005', 'c11_biotech_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a forensic technician building a DNA profile from a trace sample', intro: 'One hair, three tools, one answer: whose DNA is it?', goal: 'Explain the principle and use of PCR, gel electrophoresis, blotting and basic cloning tools.' },
    discovery: {
        question: 'A crime lab has a pinhead of DNA — far too little to test. Which technique lets them get enough material without ever \'growing\' a sample?',
        options: ['PCR — copying the DNA exponentially, doubling it every cycle', 'Gel electrophoresis, which multiplies fragments', 'Centrifugation, which concentrates DNA by spinning', 'Southern blotting, which clones DNA onto membrane'],
        answer: 'PCR — copying the DNA exponentially, doubling it every cycle',
        hook: 'PCR is a molecular photocopier: thirty doublings turn one strand into a billion.',
    },
    teaching: [
        { title: 'Microscopy: Light, Electron and Fluorescence Microscopy', text: 'Microscopy is the technical field of using microscopes to visualize structures or details invisible to the naked eye, characterized by two fundamental parameters: **magnification** (the ratio of the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_12_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Assemble a workflow — extract, amplify with PCR, separate on gel — to fingerprint a DNA sample.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_12_001', title: 'Microscopy: Light, Electron and Fluorescence Microscopy',
          scaffold: { problem: 'A biology student observes a stained onion epidermal cell using a compound microscope.',
            steps: [
            { text: 'Identify given values: Me = 10×, Mo1 = 40×, Mo2 = 100×, Image width = 4.2 mm, λ = 550 nm, NA1 = 0.65, NA2 = 1.25.' },
            { text: 'Calculate total magnification for each objective: M_total = Mo × Me.' },
            { text: 'Calculate actual size: Actual size = Image size / M_total.' },
            { text: 'Calculate resolution limit for each objective using d = λ / (2 × NA).' },
            { text: 'Compare resolution limits to ribosome size (20 nm) and conclude.', faded: true, blankAnswer: '(a) 400×. (b) 4.2 mm / 400 = 0.0105 mm = 10.5 μm. (c) 100.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_12_002', title: 'Centrifugation: Differential and Density Gradient',
          scaffold: { problem: 'A protocol for pelleting mitochondria states: "Centrifuge at 12,000 ×g for 15 min." Your lab has a fixed-angle rotor with maximum radius.',
            steps: [
            { text: 'Identify given: RCF_target = 12,000 ×g, r = 9.5 cm. Find rpm.' },
            { text: 'Rearrange formula: rpm = √(RCF / (1.118×10⁻⁵ × r)).' },
            { text: 'Substitute: rpm = √(12,000 / (1.118×10⁻⁵ × 9.5)) = √(12,000 / 1.0621×10⁻⁴) = √(1.1298×10⁸) ≈ 10,630 rpm.' },
            { text: 'Calculate actual RCF at 12,000 rpm: RCF_actual = 1.118×10⁻⁵ × 9.5 × (12,000)² = 1.118×10⁻⁵ × 9.5 × 1.44×10⁸ = 15,260 ×g.' },
            { text: 'Compute overshoot factor: 15,260 / 12,000 = 1.27. You overshoot by 27%, risking mitochondrial damage and co-pelleting.', faded: true, blankAnswer: 'Required rpm = 10,630 rpm. At 12,000 rpm, RCF = 15,260 ×g.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_12_003', title: 'Spectrophotometry: Principle and Applications',
          scaffold: { problem: 'A researcher measures the absorbance of a DNA sample at 260 nm in a 1 cm quartz cuvette and obtains A = 0.42.',
            steps: [
            { text: 'Recognize that the measured absorbance (0.42) is from the diluted sample.' },
            { text: 'Calculate diluted concentration: 0.42 × 50 µg/mL = 21 µg/mL.' },
            { text: 'Determine dilution factor: Total volume = 500 µL, sample volume = 5 µL → dilution factor = 500/5 = 100.' },
            { text: 'Calculate original concentration: 21 µg/mL × 100 = 2100 µg/mL.' },
            { text: 'Convert to ng/µL: 2100 µg/mL = 2100 ng/µL (since 1 µg/mL = 1 ng/µL).', faded: true, blankAnswer: 'Original DNA concentration = 2100 µg/mL = 2100 ng/µL.' }
            ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_004', title: 'Chromatography: Gel Filtration and Ion Exchange',
          caseStudy: { intro: 'Imagine you have a crude bacterial lysate containing your target protein (50 kDa, pI 6.5) mixed with larger aggregates (500 kDa), smaller contaminants (10.',
            decisions: [{ prompt: 'Define gel filtration chromatography and state the single physical property it exploits for separation.', options: [
                { text: 'Gel filtration chromatography (size exclusion chromatography) separates molecules based', outcome: 'Gel filtration chromatography (size exclusion chromatography) separates molecules based on their.' },
                { text: 'separates by molecular weight', outcome: 'Not quite — Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration.', reveals: 'students-consistently-confuse-molecular-weight' },
                { text: 'molecular weight', outcome: 'Not quite — Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration.', reveals: 'students-consistently-confuse-molecular-weight' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_12_005', title: 'PCR: Principle, Steps and Applications',
          scaffold: { problem: 'A forensic lab receives a crime scene sample with an estimated 3 haploid genome equivalents of human DNA.',
            steps: [
            { text: 'Identify given values: N₀ = 3 (haploid genomes = 3 template molecules for a single-copy locus), n = 28 cycles.' },
            { text: 'Recall the theoretical amplification formula for PCR: N = N₀ × 2ⁿ.' },
            { text: 'Substitute values: N = 3 × 2²⁸.' },
            { text: 'Compute 2²⁸ = 268,435,456; then N = 3 × 268,435,456 = 805,306,368 molecules.' },
            { text: 'Compare with detection threshold: 805,306,368 >> 500. The theoretical yield is ~1.6 million times above threshold.' },
            { text: 'Interpret: Yes, detection is easily achieved theoretically. However, note that real-world efficiency is <100%.', faded: true, blankAnswer: '8.05 × 10⁸ amplicon molecules; Yes, well above the.' }
            ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_006', title: 'Gel Electrophoresis: Agarose and Polyacrylamide',
          caseStudy: { intro: 'Imagine you have just completed a PCR reaction (from node c11_biotech_cbse_12_005) and have a tube of colorless liquid — how do you know if your target DNA.',
            decisions: [{ prompt: 'What is the primary basis of separation for DNA fragments in agarose gel electrophoresis?', options: [
                { text: 'DNA fragments are separated solely by size (length in base pairs)', outcome: 'DNA fragments are separated solely by size (length in base pairs) because all DNA molecules have.' },
                { text: 'charge', outcome: 'Not quite — Students believe that **DNA fragments are separated by charge** because DNA is negatively charged.', reveals: 'dna-fragments-are-separated-by' },
                { text: 'charge-to-mass ratio', outcome: 'Not quite — Students believe that **DNA fragments are separated by charge** because DNA is negatively charged.', reveals: 'dna-fragments-are-separated-by' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'Tools and Techniques in Biotechnology · Part 1/2', spots: [
            { id: 's1', label: 'Microscopy Light Electron and Fluorescence Microscopy', prompt: 'Which idea is this? — Microscopy is the technical field of using microscopes to visualize structures or details.', answer: 'Microscopy Light Electron and Fluorescence Microscopy', options: ['Microscopy Light Electron and Fluorescence Microscopy', 'Centrifugation Differential and Density Gradient', 'Spectrophotometry Principle and Applications', 'Chromatography Gel Filtration and Ion Exchange'] },
            { id: 's2', label: 'Centrifugation Differential and Density Gradient', prompt: 'Which idea is this? — Centrifugation is a biophysical separation technique that uses centrifugal force.', answer: 'Centrifugation Differential and Density Gradient', options: ['Centrifugation Differential and Density Gradient', 'Microscopy Light Electron and Fluorescence Microscopy', 'Spectrophotometry Principle and Applications', 'Chromatography Gel Filtration and Ion Exchange'] },
            { id: 's3', label: 'Spectrophotometry Principle and Applications', prompt: 'Which idea is this? — Spectrophotometry is an analytical technique that measures the amount of light absorbed.', answer: 'Spectrophotometry Principle and Applications', options: ['Spectrophotometry Principle and Applications', 'Microscopy Light Electron and Fluorescence Microscopy', 'Centrifugation Differential and Density Gradient', 'Chromatography Gel Filtration and Ion Exchange'] },
            { id: 's4', label: 'Chromatography Gel Filtration and Ion Exchange', prompt: 'Which idea is this? — Chromatography is a separation technique where components of a mixture are distributed.', answer: 'Chromatography Gel Filtration and Ion Exchange', options: ['Chromatography Gel Filtration and Ion Exchange', 'Microscopy Light Electron and Fluorescence Microscopy', 'Centrifugation Differential and Density Gradient', 'Spectrophotometry Principle and Applications'] },
            { id: 's5', label: 'PCR Principle Steps and Applications', prompt: 'Which idea is this? — Polymerase Chain Reaction (PCR) is an in vitro enzymatic technique that exponentially.', answer: 'PCR Principle Steps and Applications', options: ['PCR Principle Steps and Applications', 'Microscopy Light Electron and Fluorescence Microscopy', 'Centrifugation Differential and Density Gradient', 'Spectrophotometry Principle and Applications'] },
            { id: 's6', label: 'Gel Electrophoresis Agarose and Polyacrylamide', prompt: 'Which idea is this? — Gel electrophoresis is a laboratory technique used to separate macromolecules (DNA, RNA.', answer: 'Gel Electrophoresis Agarose and Polyacrylamide', options: ['Gel Electrophoresis Agarose and Polyacrylamide', 'Microscopy Light Electron and Fluorescence Microscopy', 'Centrifugation Differential and Density Gradient', 'Spectrophotometry Principle and Applications'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_001', title: 'A real-world call',
          caseStudy: { intro: 'CRISPR can edit a human embryo to remove a deadly disease — the edit is permanent and passes to every descendant. The same technique could someday select height, eye colour, maybe intelligence.',
            decisions: [{ prompt: 'Is preventing disease worth opening the door to designing humans?', options: [
                { text: 'Yes — a child free of disease justifies the risk', outcome: 'The compassionate answer; \'the door\' isn\'t hypothetical — every precedent makes the next edit easier to justify.' },
                { text: 'No — germline edits are forever', outcome: 'The precautionary answer — mistakes propagate; but refusing also means watching children born with preventable suffering.' },
                { text: 'Yes for disease only — a hard legal line at enhancement', outcome: 'The boundary answer — draw the line where suffering ends and preference begins; the hard part is that line moves.' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your school lab gets three requests in one week: (a) image the 3D surface of a pollen grain, (b) visualise the internal membranes of a mitochondrion, (c) track a GFP-tagged protein moving in a living cell, and (d) see a 20 nm ribosome. A senior says: \'Use the compound light microscope at 1000× for everything — maximum zoom solves all of it.\'',
            decisions: [{ prompt: 'Which instrument for which job?', options: [
                { text: 'Pollen surface → SEM; mitochondrion interior → TEM; live GFP tracking → fluorescence/confocal. The ribosome is beyond light microscopy entirely: resolution is capped near ~200 nm by the wavelength of light, so 1000× magnification just enlarges blur — electrons\' tiny wavelength is what resolves 20 nm.', outcome: 'Choose by resolution and sample question, not zoom: magnification without resolving power reveals nothing new.' },
                { text: 'The senior is right — 1000× is more than enough for ribosomes since bigger magnification shows smaller things.', outcome: 'Magnification spreads the image; resolution sets the smallest distinguishable detail. Light physically cannot resolve 20 nm objects, whatever the zoom.', reveals: 'more-zoom-more-detail' },
                { text: 'Use TEM for everything including the living cell — highest resolution wins every time.', outcome: 'TEM needs fixed, sectioned, vacuum-compatible samples — a living cell dies in the beam; live tracking needs fluorescence microscopy even at lower resolution.', reveals: 'highest-resolution-always-best' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'The biotech toolbox is a relay: PCR makes enough, gels sort by size, and probes find the one you\'re hunting.',
            decisions: [{ prompt: 'What comes next? Tools and Techniques in Biotechnology · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Tools and Techniques in Biotechnology · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_001', difficulty: 'standard',
          question: 'Microscopy is the technical field of using microscopes to visualize structures.',
          hint: 'Revisit Class 8 Biology node c8_bio_ch1_2 "Microscope: Tool for Observing Tiny Organisms".',
          misconception: '**Misconception:** "Higher magnification always shows more detail." Students believe that a 1000× light microscope.',
          parts: [
                { id: 'a', prompt: 'A researcher wants to observe the dynamic movement of mitochondria in a living mammalian cell in real time.', answer: 'Fluorescence confocal microscopy is most suitable',
                  options: ['Fluorescence confocal microscopy is most suitable', 'Higher magnification always shows more detail'],
                  hint: 'Revisit Class 8 Biology node c8_bio_ch1_2 "Microscope: Tool for Observing Tiny Organisms" for parts.',
                  misconception: '**Misconception:** "Higher magnification always shows more detail." Students believe that a 1000× light microscope reveals more detail than.' }
          ],
            remediations: { 'misconception-higher-magnification-always-shows': { steps: ['**Confront the error directly:** Show two images of the same diatom at 400×: one from a high-NA objective (sharp), one.', 'Ask: "Same magnification, different detail—why?" 2.', '**Derive the limit conceptually:** Use the "two flashlights in fog" analogy—two close lights merge into one blur.', '**Practice calculation:** Give λ = 550 nm, NA = 1.25 → d = 220 nm.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Higher magnification always shows more detail." Students believe that a 1000× light microscope.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Confocal microscopy is always superior to widefield fluorescence microscopy for imaging fixed tissue sections." Provide two scenarios.', answer: 'The statement is false',
                  options: ['The statement is false', 'Higher magnification always shows more detail'],
                  hint: 'Revisit Class 8 Biology node c8_bio_ch1_2 "Microscope: Tool for Observing Tiny Organisms" for parts.',
                  misconception: '**Misconception:** "Higher magnification always shows more detail." Students believe that a 1000× light microscope reveals more detail than.' },
                { id: 'b', prompt: 'Design a fluorescence microscopy experiment to determine whether Protein X localizes to the nucleus or the mitochondria in HeLa cells.', answer: 'The type of fluorescent probe (direct antibody vs',
                  options: ['The type of fluorescent probe (direct antibody vs', 'Higher magnification always shows more detail'],
                  hint: 'Revisit Class 8 Biology node c8_bio_ch1_2 "Microscope: Tool for Observing Tiny Organisms" for parts.',
                  misconception: '**Misconception:** "Higher magnification always shows more detail." Students believe that a 1000× light microscope reveals more detail than.' }
          ],
            remediations: { 'misconception-higher-magnification-always-shows': { steps: ['**Confront the error directly:** Show two images of the same diatom at 400×: one from a high-NA objective (sharp), one.', 'Ask: "Same magnification, different detail—why?" 2.', '**Derive the limit conceptually:** Use the "two flashlights in fog" analogy—two close lights merge into one blur.', '**Practice calculation:** Give λ = 550 nm, NA = 1.25 → d = 220 nm.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_002', difficulty: 'standard',
          question: 'Centrifugation is a biophysical separation technique that uses centrifugal.',
          hint: 'Revisit Class 9 Biology Chapter 5 (Cell Organelles) for organelle sizes and Class 9.',
          misconception: 'Students believe **"higher rpm always gives better separation"** and that **differential centrifugation separates.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Differential centrifugation separates particles based on density differences, while density gradient centrifugation separates based on size.', answer: 'The student has **reversed the principles**',
                  options: ['The student has **reversed the principles**', 'higher rpm always gives better separation'],
                  hint: 'Revisit Class 9 Biology Chapter 5 (Cell Organelles) for organelle sizes and Class 9 Chemistry.',
                  misconception: 'Students believe **"higher rpm always gives better separation"** and that **differential centrifugation separates by density**.' },
                { id: 'b', prompt: 'You have a crude liver homogenate containing nuclei (~5-10 µm), mitochondria (~0.5-1 µm), microsomes (vesicles, ~50-100 nm), and ribosomes (~20-30 nm).', answer: '**Step 1: Low speed (600-1,000 ×g, 10 min)** – Pellets nuclei and whole cells',
                  options: ['**Step 1: Low speed (600-1,000 ×g, 10 min)** – Pellets nuclei and whole cells', 'higher rpm always gives better separation'],
                  hint: 'Revisit Class 9 Biology Chapter 5 (Cell Organelles) for organelle sizes and Class 9 Chemistry.',
                  misconception: 'Students believe **"higher rpm always gives better separation"** and that **differential centrifugation separates by density**.' },
                { id: 'c', prompt: 'Compare rate-zonal and isopycnic density gradient centrifugation on: (a) gradient type, (b) separation criterion, (c) run time relative to particle banding.', answer: '**(a) Gradient:** Rate-zonal uses shallow gradient (5-20% sucrose)',
                  options: ['**(a) Gradient:** Rate-zonal uses shallow gradient (5-20% sucrose)', 'higher rpm always gives better separation'],
                  hint: 'Revisit Class 9 Biology Chapter 5 (Cell Organelles) for organelle sizes and Class 9 Chemistry.',
                  misconception: 'Students believe **"higher rpm always gives better separation"** and that **differential centrifugation separates by density**.' }
          ],
            remediations: { 'higher-rpm-always-gives-better': { steps: ['** Draw a table with two columns: "Differential Centrifugation" and "Density Gradient Centrifugation".', '** Demonstrate RCF calculation: Take two rotors (r=5 cm and r=15 cm) at same rpm (e.g., 10,000).', '** Show a video/simulation of rate-zonal vs isopycnic banding.', '** Assign a "protocol debugging" exercise: "A student spun nuclei at 100,000 ×g.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_003', difficulty: 'standard',
          question: 'Spectrophotometry is an analytical technique that measures the amount of light.',
          hint: 'Review Class 9 chemistry chapter on solutions (c9_chem_ch1_2) for molarity and dilution.',
          misconception: 'Students often believe that the Beer-Lambert law (A = εlc) holds for all concentrations and all samples.',
          parts: [
                { id: 'a', prompt: 'Define absorbance (A) and transmittance (T). Write the mathematical relationship between them.', answer: 'Absorbance (A) is the negative logarithm of transmittance: A = -log₁₀(T), where',
                  options: ['Absorbance (A) is the negative logarithm of transmittance: A = -log₁₀(T), where', 'A = I/I₀', 'A = log(I/I₀)', 'the Beer-Lambert law (A = εlc) holds for all concentrations and all samples'],
                  hint: 'Review Class 9 chemistry chapter on solutions (c9_chem_ch1_2) for molarity and dilution formula.',
                  misconception: 'Students often believe that the Beer-Lambert law (A = εlc) holds for all concentrations and all samples.' },
                { id: 'b', prompt: 'Why is absorbance preferred over transmittance for constructing calibration curves in quantitative spectrophotometry?', answer: 'Absorbance is directly proportional to concentration (A = εlc) according to the',
                  options: ['Absorbance is directly proportional to concentration (A = εlc) according to the', 'both are linear', 'transmittance is easier to measure', 'the Beer-Lambert law (A = εlc) holds for all concentrations and all samples'],
                  hint: 'Review Class 9 chemistry chapter on solutions (c9_chem_ch1_2) for molarity and dilution formula.',
                  misconception: 'Students often believe that the Beer-Lambert law (A = εlc) holds for all concentrations and all samples.' },
                { id: 'c', prompt: 'Compare a colorimeter and a UV-visible spectrophotometer in terms of (a) wavelength selection mechanism, (b) bandwidth, and (c) suitability for scanning.', answer: 'wavelength selection mechanism, (',
                  options: ['wavelength selection mechanism, (', 'both use prisms', 'colorimeter gives better resolution', 'the Beer-Lambert law (A = εlc) holds for all concentrations and all samples'],
                  hint: 'Review Class 9 chemistry chapter on solutions (c9_chem_ch1_2) for molarity and dilution formula.',
                  misconception: 'Students often believe that the Beer-Lambert law (A = εlc) holds for all concentrations and all samples.' }
          ],
            remediations: { 'the-beer-lambert-law-a': { steps: ['Re-derive A = -log(I/I₀) from T = I/I₀ to reinforce the logarithmic link.', 'Use a simulator (e.g., PhET Beer-Lambert Law) to vary concentration and path length, observing when the A vs.', 'Practice converting between ε (M⁻¹ cm⁻¹) and E¹% (mL g⁻¹ cm⁻¹) using molecular weight: ε = E¹% × MW / 10.', 'Measure a known dye (e.g., potassium permanganate) at 5 concentrations spanning A = 0.1 to 1.5, plot A vs.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_004', difficulty: 'standard',
          question: 'Chromatography is a separation technique where components of a mixture are.',
          hint: 'Review Class 10 Chemistry pH/pI relationship (c10_chem_cbse_02_008) and Class 9 Chemistry.',
          misconception: 'Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration, believing a 100 kDa.',
          parts: [
                { id: 'a', prompt: 'A mixture contains Protein A (pI 4.5), Protein B (pI 7.0), and Protein C (pI 9.5).', answer: 'At pH 8.0: Protein A (pI 4.5) is negatively charged → binds strongly',
                  options: ['At pH 8.0: Protein A (pI 4.5) is negatively charged → binds strongly', 'more negative binds less', 'more negative requires more counter-ions to displace', 'molecular weight'],
                  hint: 'Review Class 10 Chemistry pH/pI relationship (c10_chem_cbse_02_008) and Class 9 Chemistry.',
                  misconception: 'Students consistently confuse "molecular weight" with "hydrodynamic size" in gel filtration, believing a 100 kDa globular protein and a 100.' }
          ],
            remediations: { 'students-consistently-confuse-molecular-weight': { steps: ['Draw a pore diagram: large molecule bypassing pores (short path) vs small molecule entering pores (long path).', 'Use a charge table: list protein pI, buffer pH, resulting protein charge, resin type, and binding prediction for 5.', 'Role-play the ion exchange column: student acts as "salt ion" displacing "protein" from "resin" — physically.', 'Revisit Class 10 Chemistry (c10_chem_cbse_02_008) pH/pI relationship: if pH > pI, protein is negative; if pH <.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_005', difficulty: 'standard',
          question: 'Polymerase Chain Reaction (PCR) is an in vitro enzymatic technique that.',
          hint: 'Revisit Class 9 Biology (c9_bio_ch1_12) on DNA replication — specifically the role of RNA.',
          misconception: '**Misconception:** "PCR amplifies the entire genome / all DNA in the tube." Students believe that because Taq.',
          parts: [
                { id: 'a', prompt: 'State the three steps of a standard PCR cycle in correct order with their typical temperature ranges and the key molecular event occurring at each step.', answer: 'The three steps in order: (1) Denaturation at 94–98°C',
                  options: ['The three steps in order: (1) Denaturation at 94–98°C', 'PCR amplifies the entire genome / all DNA in the tube', 'because Taq polymerase replicates DNA, it copies everything present'],
                  hint: 'Revisit Class 9 Biology (c9_bio_ch1_12) on DNA replication — specifically the role of RNA primer.',
                  misconception: '**Misconception:** "PCR amplifies the entire genome / all DNA in the tube." Students believe that because Taq polymerase replicates DNA,.' },
                { id: 'b', prompt: 'A student sets up a PCR with 100 ng of human genomic DNA as template but gets no amplification.', answer: 'Two distinct reasons: (1) **Primer-template mismatch**',
                  options: ['Two distinct reasons: (1) **Primer-template mismatch**', 'wrong temperature', 'bad enzyme', 'PCR amplifies the entire genome / all DNA in the tube'],
                  hint: 'Revisit Class 9 Biology (c9_bio_ch1_12) on DNA replication — specifically the role of RNA primer.',
                  misconception: '**Misconception:** "PCR amplifies the entire genome / all DNA in the tube." Students believe that because Taq polymerase replicates DNA,.' },
                { id: 'c', prompt: 'Compare and contrast standard endpoint PCR, RT-PCR, and qPCR (real-time PCR) in terms of: (a) what they measure, (b) when quantification occurs, and (c) the.', answer: '| Feature | Standard PCR | RT-PCR | qPCR (Real-time PCR) |',
                  options: ['| Feature | Standard PCR | RT-PCR | qPCR (Real-time PCR) |', 'RT-PCR is real-time PCR', 'PCR amplifies the entire genome / all DNA in the tube', 'because Taq polymerase replicates DNA, it copies everything present'],
                  hint: 'Revisit Class 9 Biology (c9_bio_ch1_12) on DNA replication — specifically the role of RNA primer.',
                  misconception: '**Misconception:** "PCR amplifies the entire genome / all DNA in the tube." Students believe that because Taq polymerase replicates DNA,.' }
          ],
            remediations: { 'misconception-pcr-amplifies-the-entire': { steps: ['**Step-by-step remediation:** (1) Draw a double-stranded DNA template with Gene X and Gene Y far apart.', '(2) Add Forward and Reverse primers *only* binding to Gene X.', '(3) Walk through Cycle 1: Denature → Anneal (primers bind ONLY to Gene X) → Extend (Taq extends ONLY from primers.', '(4) Ask: "Where are primers for Gene Y?" Student realises: nowhere.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_006', difficulty: 'standard',
          question: 'Gel electrophoresis is a laboratory technique used to separate macromolecules.',
          hint: 'Review Class 10 Chemistry (c10_chem_cbse_02_001) on acid dissociation and pH, and Class 9.',
          misconception: 'Students believe that **DNA fragments are separated by charge** because DNA is negatively charged.',
          parts: [
                { id: 'a', prompt: 'What is the primary basis of separation for DNA fragments in agarose gel electrophoresis?', answer: 'DNA fragments are separated solely by size (length in base pairs)',
                  options: ['DNA fragments are separated solely by size (length in base pairs)', 'charge', 'charge-to-mass ratio', '**DNA fragments are separated by charge**'],
                  hint: 'Review Class 10 Chemistry (c10_chem_cbse_02_001) on acid dissociation and pH, and Class 9 Biology.',
                  misconception: 'Students believe that **DNA fragments are separated by charge** because DNA is negatively charged.' },
                { id: 'b', prompt: 'You have two DNA fragments: 500 bp and 3000 bp. You run them on a 1% agarose gel at 100 V for 45 minutes.', answer: 'Wells are at the cathode (negative) end',
                  options: ['Wells are at the cathode (negative) end', '**DNA fragments are separated by charge**'],
                  hint: 'Review Class 10 Chemistry (c10_chem_cbse_02_001) on acid dissociation and pH, and Class 9 Biology.',
                  misconception: 'Students believe that **DNA fragments are separated by charge** because DNA is negatively charged.' }
          ],
            remediations: { 'dna-fragments-are-separated-by': { steps: ['**Confront the misconception directly**: Ask the student to calculate the charge and mass of a 100 bp vs.', '1000 bp DNA fragment (assume 1 charge per bp, 660 Da per bp).', 'Show that charge/mass = 1/660 for both.', '**Use a physical analogy**: Compare to people of different heights running through a forest — taller people have more.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
