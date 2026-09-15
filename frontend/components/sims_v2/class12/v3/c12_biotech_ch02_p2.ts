import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch02_p2: SimDef = {
    id: 'v3_c12_biotech_ch02_p2',
    title: 'Recombinant DNA Technology · Part 2/2',
    subtitle: 'Sticky ends aren\'t universal glue — only matching overhangs can pair.',
    classLevel: 12, subject: 'biotechnology', topic: 'Recombinant DNA Technology · Part 2/2',
    chapters: ['c12_biotech_ch02'],
    nodeIds: ['c12_biotech_cbse_02_007', 'c12_biotech_cbse_02_008', 'c12_biotech_cbse_02_009', 'c12_biotech_cbse_02_010', 'c12_biotech_cbse_02_011', 'c12_biotech_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Molecular cloning designer', intro: 'Every successful clone is won or lost at the enzyme-selection step — before a single tube is opened.', goal: 'Classify restriction endonucleases and predict compatibility of sticky and blunt ends.' },
    discovery: {
        question: 'You cut a plasmid with EcoRI (overhang AATT) and your gene with BamHI (overhang GATC), then ligate — zero colonies. Why?',
        options: ['The sticky ends aren\'t complementary — EcoRI and BamHI overhangs cannot base-pair', 'Ligase only joins blunt ends, never sticky ends', 'EcoRI and BamHI are incompatible because both are Type II enzymes', 'The plasmid was too large for ligation to succeed'],
        answer: 'The sticky ends aren\'t complementary — EcoRI and BamHI overhangs cannot base-pair',
        hook: '\'Sticky\' doesn\'t mean universally sticky — cohesion demands complementarity. Students assume any overhang joins any overhang; only matching sequences anneal, which makes enzyme choice a design decision.',
    },
    teaching: [
        { title: 'Primer Design for PCR: Length, GC Content, Specificity', text: 'Primer design for PCR is the process of selecting short, single-stranded DNA oligonucleotides (typically 18–30 nucleotides) that flank a target DNA region, with optimized length, GC content (40–60%).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_02_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Design a cloning strategy: pick Type II restriction enzymes by their recognition sites, predict sticky vs blunt ends from the cut pattern, and plan compatible enzyme pairs for a directional clone.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_02_007', title: 'Primer Design for PCR: Length, GC Content, Specificity',
          scaffold: { problem: 'A researcher wants to amplify a 500 bp gene fragment. The coding strand sequence at the 5\' end is: 5\'-ATG GCT AGC TGA TCC GTA ACC-3\'.',
            steps: [
            { text: 'Extract the first 20 nucleotides of the coding strand as the forward primer (5\'→3\'): 5\'-ATGGCTAGCTGATCCGTAAC-3\'.' },
            { text: 'Count nucleotides: A=5, T=5, G=5, C=5. Total N=20. GC count = 10. GC% = (10/20)×100 = 50%.' },
            { text: 'Apply Wallace rule: Tm = 2×(A+T) + 4×(G+C) = 2×(5+5) + 4×(5+5) = 2×10 + 4×10 = 20 + 40 = 60°C.' },
            { text: 'Apply salt-adjusted formula: Tm = 81.5 + 16.6×log10(0.05) + 41×(50) - 600/20. log10(0.05) = -1.3010.' },
            { text: 'Evaluate criteria: Length 20 nt (✓ 18-30), GC% 50% (✓ 40-60%), Wallace Tm 60°C (✓ 55-65°C), Salt-adjusted Tm 50.4°C.', faded: true, blankAnswer: 'Primer: 5\'-ATGGCTAGCTGATCCGTAAC-3\'; GC% = 50%; Wallace.' }
            ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_008', title: 'Agarose Gel Electrophoresis: Principle and DNA Separation',
          caseStudy: { intro: 'Imagine you have just finished a PCR reaction (node c12_biotech_cbse_02_006) and need to confirm whether you amplified the correct 500 bp product or got.',
            decisions: [{ prompt: 'What is the direction of DNA migration in agarose gel electrophoresis and why does DNA move in that direction?', options: [
                { text: 'DNA migrates toward the anode (positive electrode)', outcome: 'DNA migrates toward the anode (positive electrode) because its phosphate backbone confers a net.' },
                { text: 'toward cathode', outcome: 'Not quite — Students often believe that "DNA migrates toward the positive electrode because it is positively.', reveals: 'dna-migrates-toward-the-positive' },
                { text: 'because DNA is positively charged', outcome: 'Not quite — Students often believe that "DNA migrates toward the positive electrode because it is positively.', reveals: 'dna-migrates-toward-the-positive' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_009', title: 'Recovery of DNA Fragments from Gels (Elution)',
          caseStudy: { intro: 'Imagine you have just run a restriction digest on a 1% agarose gel and see a perfect 2.3 kb band glowing under UV light — that band contains the gene insert.',
            decisions: [{ prompt: 'What is the primary function of chaotropic salts (e.g., sodium iodide, guanidinium thiocyanate) in commercial gel extraction kits?', options: [
                { text: 'Chaotropic salts disrupt the hydrogen-bonding network of water, promoting DNA adsorption', outcome: 'Chaotropic salts disrupt the hydrogen-bonding network of water, promoting DNA adsorption onto the.' },
                { text: 'they dissolve the agarose', outcome: 'Not quite — Students believe "the brighter the band on the gel, the more DNA I will recover after elution.".', reveals: 'the-brighter-the-band-on' },
                { text: 'they precipitate DNA', outcome: 'Not quite — Students believe "the brighter the band on the gel, the more DNA I will recover after elution.".', reveals: 'the-brighter-the-band-on' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_02_010', title: 'Transformation: Methods and Efficiency Factors',
          scaffold: { problem: 'A student transforms 50 µL of chemically competent *E. coli* (efficiency 5 × 10⁷ cfu/µg) with 2 µL of a ligation mixture containing 10.',
            steps: [
            { text: 'Calculate DNA amount used: 10 ng/µL × 2 µL = 20 ng = 0.02 µg.' },
            { text: 'Determine dilution factor from plating: Total recovery volume = 1000 µL, volume plated = 200 µL → fraction plated.' },
            { text: 'Compute observed efficiency = Total transformants / DNA (µg) = 1600 / 0.02 = 8 × 10⁴ cfu/µg.' },
            { text: 'Compare with rated efficiency (5 × 10⁷ cfu/µg). Observed is ~600-fold lower.' },
            { text: 'Interpret: Such a drop is common due to ligation inhibitors, suboptimal competence, or DNA damage.', faded: true, blankAnswer: 'Observed transformation efficiency = 8 × 10⁴ cfu/µg (much.' }
            ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_011', title: 'Blue-White Selection Using the lacZ Reporter System',
          caseStudy: { intro: 'Imagine you have just transformed E. coli with a ligation mixture containing pUC19 vector and a PCR product.',
            decisions: [{ prompt: 'What is the function of the lacZα fragment in blue-white selection, and which host genotype is required for complementation?', options: [
                { text: 'The lacZα fragment encodes the N-terminal portion of β-galactosidase (α-peptide)', outcome: 'The lacZα fragment encodes the N-terminal portion of β-galactosidase (α-peptide).' },
                { text: 'lacZα is the full β-galactosidase gene', outcome: 'Not quite — Students often think that **any white colony must contain the correct insert**.', reveals: 'any-white-colony-must-contain' },
                { text: 'host must be lacZ+', outcome: 'Not quite — Students often think that **any white colony must contain the correct insert**.', reveals: 'any-white-colony-must-contain' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_012', title: 'Sanger Dideoxy DNA Sequencing Method',
          caseStudy: { intro: 'Imagine you have just cloned a gene into pUC19 (from node c12_biotech_cbse_02_011) and need to confirm there are no mutations before expressing the protein.',
            decisions: [{ prompt: 'What is the structural difference between a deoxynucleotide triphosphate (dNTP) and a dideoxynucleotide triphosphate (ddNTP) that causes.', options: [
                { text: 'A dNTP has a 3\'-hydroxyl (-OH) group on its deoxyribose sugar, while a ddNTP lacks this', outcome: 'A dNTP has a 3\'-hydroxyl (-OH) group on its deoxyribose sugar, while a ddNTP lacks this 3\'-OH (it.' },
                { text: 'ddNTP has no phosphate groups', outcome: 'Not quite — **Misconception:** "The ddNTPs are added *after* the normal dNTPs, so the polymerase first makes.', reveals: 'misconception-the-ddntps-are-added' },
                { text: 'ddNTP lacks the base', outcome: 'Not quite — **Misconception:** "The ddNTPs are added *after* the normal dNTPs, so the polymerase first makes.', reveals: 'misconception-the-ddntps-are-added' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'Recombinant DNA Technology · Part 2/2', spots: [
            { id: 's1', label: 'Primer Design for PCR Length GC Content Specificity', prompt: 'Which idea is this? — Primer design for PCR is the process of selecting short, single-stranded DNA.', answer: 'Primer Design for PCR Length GC Content Specificity', options: ['Primer Design for PCR Length GC Content Specificity', 'Agarose Gel Electrophoresis Principle and DNA Separation', 'Recovery of DNA Fragments from Gels Elution', 'Transformation Methods and Efficiency Factors'] },
            { id: 's2', label: 'Agarose Gel Electrophoresis Principle and DNA Separation', prompt: 'Which idea is this? — Agarose gel electrophoresis is a molecular biology technique used to separate DNA.', answer: 'Agarose Gel Electrophoresis Principle and DNA Separation', options: ['Agarose Gel Electrophoresis Principle and DNA Separation', 'Primer Design for PCR Length GC Content Specificity', 'Recovery of DNA Fragments from Gels Elution', 'Transformation Methods and Efficiency Factors'] },
            { id: 's3', label: 'Recovery of DNA Fragments from Gels Elution', prompt: 'Which idea is this? — DNA elution (recovery) is the process of isolating and purifying a specific DNA fragment.', answer: 'Recovery of DNA Fragments from Gels Elution', options: ['Recovery of DNA Fragments from Gels Elution', 'Primer Design for PCR Length GC Content Specificity', 'Agarose Gel Electrophoresis Principle and DNA Separation', 'Transformation Methods and Efficiency Factors'] },
            { id: 's4', label: 'Transformation Methods and Efficiency Factors', prompt: 'Which idea is this? — Transformation is the process by which a host cell (typically bacterial) takes.', answer: 'Transformation Methods and Efficiency Factors', options: ['Transformation Methods and Efficiency Factors', 'Primer Design for PCR Length GC Content Specificity', 'Agarose Gel Electrophoresis Principle and DNA Separation', 'Recovery of DNA Fragments from Gels Elution'] },
            { id: 's5', label: 'Blue-White Selection Using the lacZ Reporter System', prompt: 'Which idea is this? — Blue-white selection is a screening technique used in recombinant DNA technology.', answer: 'Blue-White Selection Using the lacZ Reporter System', options: ['Blue-White Selection Using the lacZ Reporter System', 'Primer Design for PCR Length GC Content Specificity', 'Agarose Gel Electrophoresis Principle and DNA Separation', 'Recovery of DNA Fragments from Gels Elution'] },
            { id: 's6', label: 'Sanger Dideoxy DNA Sequencing Method', prompt: 'Which idea is this? — Sanger dideoxy DNA sequencing is a chain-termination method that determines the.', answer: 'Sanger Dideoxy DNA Sequencing Method', options: ['Sanger Dideoxy DNA Sequencing Method', 'Primer Design for PCR Length GC Content Specificity', 'Agarose Gel Electrophoresis Principle and DNA Separation', 'Recovery of DNA Fragments from Gels Elution'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a school lab practical, a team must insert a DNA fragment into a vector. They can cut both with EcoRI, which leaves 5′-AATT sticky overhangs, or SmaI, which cuts dead centre and leaves blunt ends. A teammate votes SmaI \'because blunt ends are simpler\'.',
            decisions: [{ prompt: 'Which enzyme gives the better cloning strategy?', options: [
                { text: 'EcoRI — sticky ends base-pair across the insert–vector junction, stabilising it and making ligation 10–100× more efficient; they can also enforce insert orientation.', outcome: 'Cohesive ends turn a random collision into a matched join; blunt-end ligation works but is far less efficient and orientation-free.' },
                { text: 'SmaI — blunt ends join any fragment to any vector, so ligation is simpler and just as efficient.', outcome: 'Blunt ends have no complementary overhangs to anneal, so ligase works far slower and the insert can go in backwards.', reveals: 'blunt-ligation-equal' },
                { text: 'It doesn\'t matter — any restriction enzyme cutting DNA at a defined site is equally good for cloning.', outcome: 'Cleavage geometry differs: Type II enzymes cutting within their palindrome give sticky ends, central cutters give blunt — and end type drives ligation success.', reveals: 'any-cutter-equally-good' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'You now read overhangs like a molecular engineer. Restriction enzyme types and end compatibility are precision board questions — and daily decisions in any molecular biology lab.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_007', difficulty: 'standard',
          question: 'Primer design for PCR is the process of selecting short, single-stranded DNA.',
          hint: 'Revisit c11_biotech_cbse_03_006 (DNA Structure) and practice writing complementary.',
          misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.',
          parts: [
                { id: 'a', prompt: 'A student writes a forward primer sequence: 5\'-ATGCGTACGTACGTACGT-3\'.', answer: 'The primer has 20 nucleotides',
                  options: ['The primer has 20 nucleotides', 'longer primers are always more specific', '"longer primers are always more specific" and design 35–40 nt primers'],
                  hint: 'Revisit c11_biotech_cbse_03_006 (DNA Structure) and practice writing complementary strands for 10.',
                  misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.' },
                { id: 'b', prompt: 'Explain why a primer pair with a ΔTm (difference in melting temperatures) of 12°C would likely fail in a standard PCR, even if both primers individually have.', answer: 'PCR uses a single annealing temperature for both primers',
                  options: ['PCR uses a single annealing temperature for both primers', 'it works because both are in range', 'longer primers are always more specific', '"longer primers are always more specific" and design 35–40 nt primers'],
                  hint: 'Revisit c11_biotech_cbse_03_006 (DNA Structure) and practice writing complementary strands for 10.',
                  misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.' },
                { id: 'c', prompt: 'Given the target DNA sequence: 5\'-...ATG GCT AGC TGA TCC GTA...-3\' (coding strand), design a 20-nucleotide forward primer starting at the ATG start codon.', answer: 'Forward primer (same as coding strand start): 5\'-ATGGCTAGCTGATCCGTA-3\' (20 nt)',
                  options: ['Forward primer (same as coding strand start): 5\'-ATGGCTAGCTGATCCGTA-3\' (20 nt)', 'longer primers are always more specific', '"longer primers are always more specific" and design 35–40 nt primers'],
                  hint: 'Revisit c11_biotech_cbse_03_006 (DNA Structure) and practice writing complementary strands for 10.',
                  misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.' },
                { id: 'd', prompt: 'Two primers are proposed for a PCR: Forward: 5\'-GGC CGC GGC CGC GGC-3\' (15 nt) Reverse: 5\'-CCG CCG CCG CCG CCG-3\' (15 nt) Analyze this pair for THREE major.', answer: 'Flaw 1: Length = 15 nt (below 18 nt minimum) → low specificity, high chance of',
                  options: ['Flaw 1: Length = 15 nt (below 18 nt minimum) → low specificity, high chance of', 'longer primers are always more specific', '"longer primers are always more specific" and design 35–40 nt primers'],
                  hint: 'Revisit c11_biotech_cbse_03_006 (DNA Structure) and practice writing complementary strands for 10.',
                  misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.' }
          ],
            remediations: { 'longer-primers-are-always-more': { steps: ['If a student cannot calculate Tm or GC%, direct them to: (1) revisit c11_biotech_cbse_03_006 (DNA Structure).', 'Re-diagnostic: Give a new 20-mer and ask for both Tm values and whether they differ by >3°C.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.',
          parts: [
                { id: 'a', prompt: 'A researcher claims: "For maximum specificity, I always design primers with the highest possible GC content (80–90%) because G-C pairs have three hydrogen.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'longer primers are always more specific', '"longer primers are always more specific" and design 35–40 nt primers'],
                  hint: 'Revisit c11_biotech_cbse_03_006 (DNA Structure) and practice writing complementary strands for 10.',
                  misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.' },
                { id: 'b', prompt: 'Create a 22-nucleotide forward primer for the sequence 5\'-ATG GAA TTC GAT CCA GCT AGC-3\' (coding strand) such that: (a) it starts at the ATG, (b) its GC%.', answer: 'Target start: ATGGAA',
                  options: ['Target start: ATGGAA', 'longer primers are always more specific', '"longer primers are always more specific" and design 35–40 nt primers'],
                  hint: 'Revisit c11_biotech_cbse_03_006 (DNA Structure) and practice writing complementary strands for 10.',
                  misconception: 'Students often believe that "longer primers are always more specific" and design 35–40 nt primers.' }
          ],
            remediations: { 'longer-primers-are-always-more': { steps: ['If a student cannot calculate Tm or GC%, direct them to: (1) revisit c11_biotech_cbse_03_006 (DNA Structure).', 'Re-diagnostic: Give a new 20-mer and ask for both Tm values and whether they differ by >3°C.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_008', difficulty: 'standard',
          question: 'Agarose gel electrophoresis is a molecular biology technique used to separate.',
          hint: 'If stuck, review the nucleotide structure in c11_biotech_cbse_03_006 and the.',
          misconception: 'Students often believe that "DNA migrates toward the positive electrode because it is positively charged" — confusing.',
          parts: [
                { id: 'a', prompt: 'What is the direction of DNA migration in agarose gel electrophoresis and why does DNA move in that direction?', answer: 'DNA migrates toward the anode (positive electrode)',
                  options: ['DNA migrates toward the anode (positive electrode)', 'toward cathode', 'because DNA is positively charged', 'DNA migrates toward the positive electrode'],
                  hint: 'If stuck, review the nucleotide structure in c11_biotech_cbse_03_006 and the electrophoresis.',
                  misconception: 'Students often believe that "DNA migrates toward the positive electrode because it is positively charged" — confusing the anode/cathode.' },
                { id: 'b', prompt: 'A student runs a 1% agarose gel at 100 V for 30 minutes and sees that a 10 kb band and a 12 kb band are not resolved (they appear as a single band).', answer: 'The conclusion is incorrect',
                  options: ['The conclusion is incorrect', 'high percentage for small fragments, low percentage for large fragments', 'DNA migrates toward the positive electrode'],
                  hint: 'If stuck, review the nucleotide structure in c11_biotech_cbse_03_006 and the electrophoresis.',
                  misconception: 'Students often believe that "DNA migrates toward the positive electrode because it is positively charged" — confusing the anode/cathode.' },
                { id: 'c', prompt: 'You have a DNA ladder with bands at 100, 200, 300, 500, 1000, 2000, and 3000 bp.', answer: 'Migration distance is linear with log₁₀(size)',
                  options: ['Migration distance is linear with log₁₀(size)', 'DNA migrates toward the positive electrode'],
                  hint: 'If stuck, review the nucleotide structure in c11_biotech_cbse_03_006 and the electrophoresis.',
                  misconception: 'Students often believe that "DNA migrates toward the positive electrode because it is positively charged" — confusing the anode/cathode.' },
                { id: 'd', prompt: 'Compare the resolution of a 3 kb fragment on a 0.8% agarose gel run at 50 V for 2 hours versus the same gel run at 120 V for 45 minutes.', answer: 'The 50 V / 2 h run gives better resolution',
                  options: ['The 50 V / 2 h run gives better resolution', 'DNA migrates toward the positive electrode'],
                  hint: 'If stuck, review the nucleotide structure in c11_biotech_cbse_03_006 and the electrophoresis.',
                  misconception: 'Students often believe that "DNA migrates toward the positive electrode because it is positively charged" — confusing the anode/cathode.' }
          ],
            remediations: { 'dna-migrates-toward-the-positive': { steps: ['If the student cannot explain why DNA moves toward the anode, revisit c11_biotech_cbse_03_006 (DNA structure) and.', 'Have them draw a nucleotide and circle the phosphate group; then write "negative charge → moves to anode (+)".', 'For log-linear confusion, give them a ladder with 3 bands and ask them to plot log(size) vs.', 'distance on graph paper — the straight line proves the relationship.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_009', difficulty: 'standard',
          question: 'DNA elution (recovery) is the process of isolating and purifying a specific DNA.',
          hint: 'Review c12_biotech_cbse_02_008 — specifically the relationship between agarose.',
          misconception: 'Students believe "the brighter the band on the gel, the more DNA I will recover after elution." This is wrong because.',
          parts: [
                { id: 'a', prompt: 'A student excises a 5 kb DNA band from a 0.8% agarose gel, dissolves the gel slice at 50°C in binding buffer, loads it onto a spin column, washes with.', answer: '1) Elution volume (30 µL) is too low for a 5 kb fragment',
                  options: ['1) Elution volume (30 µL) is too low for a 5 kb fragment', 'gel not fully dissolved', 'too much UV exposure', 'the brighter the band on the gel, the more DNA I will recover after elution'],
                  hint: 'Review c12_biotech_cbse_02_008 — specifically the relationship between agarose concentration.',
                  misconception: 'Students believe "the brighter the band on the gel, the more DNA I will recover after elution." This is wrong because: (1) UV illumination.' },
                { id: 'b', prompt: 'You need to recover a 12 kb fragment for cloning into a BAC vector. The fragment was separated on a 0.6% low-melting-point agarose gel.', answer: 'Choose electroelution',
                  options: ['Choose electroelution', 'the brighter the band on the gel, the more DNA I will recover after elution', '"the brighter the band on the gel, the more DNA I will recover after elution'],
                  hint: 'Review c12_biotech_cbse_02_008 — specifically the relationship between agarose concentration.',
                  misconception: 'Students believe "the brighter the band on the gel, the more DNA I will recover after elution." This is wrong because: (1) UV illumination.' }
          ],
            remediations: { 'the-brighter-the-band-on': { steps: ['If the student confuses elution principles, have them: (1) Revisit c12_biotech_cbse_02_008 (Agarose Gel.', '(2) Perform a "paper elution" simulation: draw a gel lane with bands, assign hypothetical masses, calculate recovery.', '(3) Re-attempt Diagnostic Question 2 and 3, explicitly writing the size cutoff for their chosen kit (check a real kit.', 'This bridges the gap between "band on gel" and "µg in tube."'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_010', difficulty: 'standard',
          question: 'Transformation is the process by which a host cell (typically bacterial) takes.',
          hint: 'If stuck, review the CaCl₂ heat shock protocol steps and the definition of \'competent.',
          misconception: 'Students often believe that *all* bacteria are naturally competent and that transformation efficiency depends only.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Transformation is the process by',
                  options: ['Transformation is the process by', 'Restriction endonucleases are bacterial enzymes that recognize specific palindromic DNA', 'Sticky ends (cohesive ends) are single-stranded DNA overhangs generated when a', 'DNA ligase is an enzyme that catalyzes the formation of a phosphodiester bond between the'],
                  hint: 'If stuck, review the CaCl₂ heat shock protocol steps and the definition of \'competent cells\' from.',
                  misconception: 'Students often believe that *all* bacteria are naturally competent and that transformation efficiency depends only on the amount of DNA.' }
          ],
            remediations: { 'all-bacteria-are-naturally-competent': { steps: ['Revisit the concept of cell membrane structure and charge (c11_biotech_cbse_02_003: Cell Membrane: Fluid Mosaic Model).', 'Watch a video of the CaCl₂/heat shock protocol and identify the exact step where charge neutralization occurs vs.', 'where membrane fluidity changes.', 'Re-solve Diagnostic Question 3 with a different DNA amount (e.g., 5 ng) to practice unit conversions and dilution.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_011', difficulty: 'standard',
          question: 'Blue-white selection is a screening technique used in recombinant DNA.',
          hint: 'Review the lac operon (c11_biotech_cbse_07_010) and the pUC19 vector map.',
          misconception: 'Students often think that **any white colony must contain the correct insert**.',
          parts: [
                { id: 'a', prompt: 'What is the function of the lacZα fragment in blue-white selection, and which host genotype is required for complementation?', answer: 'The lacZα fragment encodes the N-terminal portion of β-galactosidase (α-peptide)',
                  options: ['The lacZα fragment encodes the N-terminal portion of β-galactosidase (α-peptide)', 'lacZα is the full β-galactosidase gene', 'host must be lacZ+', '**any white colony must contain the correct insert**'],
                  hint: 'Review the lac operon (c11_biotech_cbse_07_010) and the pUC19 vector map (c11_biotech_cbse_12_008).',
                  misconception: 'Students often think that **any white colony must contain the correct insert**.' },
                { id: 'b', prompt: 'A student clones a 1.2 kb insert into the EcoRI site of pUC19 and plates transformants on LB-Amp-X-gal-IPTG. All colonies are blue.', answer: 'No, the conclusion is not always correct',
                  options: ['No, the conclusion is not always correct', 'yes, all blue means no insert', '**any white colony must contain the correct insert**'],
                  hint: 'Review the lac operon (c11_biotech_cbse_07_010) and the pUC19 vector map (c11_biotech_cbse_12_008).',
                  misconception: 'Students often think that **any white colony must contain the correct insert**.' },
                { id: 'c', prompt: 'You have a pUC19 derivative where the MCS is cloned in the reverse orientation relative to the lacZα start codon.', answer: 'All colonies will be blue',
                  options: ['All colonies will be blue', '**any white colony must contain the correct insert**'],
                  hint: 'Review the lac operon (c11_biotech_cbse_07_010) and the pUC19 vector map (c11_biotech_cbse_12_008).',
                  misconception: 'Students often think that **any white colony must contain the correct insert**.' }
          ],
            remediations: { 'any-white-colony-must-contain': { steps: ['If a student cannot distinguish selection vs.', 'screen, or predicts colony colors incorrectly, do the following: (1) Revisit the lac operon regulation.', '(2) Draw the pUC19 map showing lacZα, MCS, ampR, and ori; annotate reading frame and orientation.', '(3) Simulate a ligation on paper: vector cut with EcoRI, insert with EcoRI ends, ligate.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_02_012', difficulty: 'standard',
          question: 'Sanger dideoxy DNA sequencing is a chain-termination method that determines the.',
          hint: 'If stuck, redraw the nucleotide structure from c11_biotech_cbse_03_008 and explicitly.',
          misconception: '**Misconception:** "The ddNTPs are added *after* the normal dNTPs, so the polymerase first makes a full-length copy and.',
          parts: [
                { id: 'a', prompt: 'Compare the information obtained from a Sanger sequencing chromatogram (four-color capillary electrophoresis) with that from a traditional four-lane.', answer: 'Same: Both produce a ladder of fragments ending at each base',
                  options: ['Same: Both produce a ladder of fragments ending at each base', 'chromatogram reads top-to-bottom', 'radioactive gel is more accurate'],
                  hint: 'If stuck, redraw the nucleotide structure from c11_biotech_cbse_03_008 and explicitly label the 3\'.',
                  misconception: '**Misconception:** "The ddNTPs are added *after* the normal dNTPs, so the polymerase first makes a full-length copy and then chops it up.' }
          ],
            remediations: { 'misconception-the-ddntps-are-added': { steps: ['Revisit **c11_biotech_cbse_03_008** (Nucleotides and Nucleosides) to draw dATP vs ddATP side-by-side, highlighting the.', 'Re-watch the Sanger animation from **c11_biotech_cbse_12_010** focusing on the *simultaneous* presence of dNTPs and.', 'Do a "paper gel" exercise: write a 10-base template, simulate fragment lengths for each ddNTP at 10% incorporation.', 'Re-attempt **DIAGNOSTIC_QUESTION_3** with a different ratio (e.g., 1:10) to reinforce the probability calculation.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
