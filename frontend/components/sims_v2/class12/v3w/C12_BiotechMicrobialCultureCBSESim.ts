import type { SimDef } from '../../engine/types';
import C12_BiotechMicrobialCultureCBSESim from '../../../simulations/c6_12_new/C12_BiotechMicrobialCultureCBSESim';

/** v3 wrapped master — C12_BiotechMicrobialCultureCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biotechmicrobialculturecbsesim: SimDef = {
    id: 'v3w_c12_biotechmicrobialculturecbsesim',
    title: 'Microbial Culture CBSE',
    subtitle: 'This node covers the integrated analysis of factors influencing plant tissue culture.',
    classLevel: 12, subject: 'biotechnology', topic: 'Factors Affecting In Vitro Culture Responses',
    chapters: [],
    nodeIds: ['c12_biotech_cbse_06_011', 'c12_biotech_cbse_08_009', 'c12_biotech_cbse_06_001', 'c12_biotech_cbse_06_002', 'c12_biotech_cbse_06_003', 'c12_biotech_cbse_06_004', 'c12_biotech_cbse_06_005', 'c12_biotech_cbse_06_006', 'c12_biotech_cbse_06_007', 'c12_biotech_cbse_06_008', 'c12_biotech_cbse_06_009', 'c12_biotech_cbse_06_010', 'c12_biotech_cbse_08_001', 'c12_biotech_cbse_08_002', 'c12_biotech_cbse_08_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you have set up a perfect MS medium with 2,4-D and kinetin for callus induction from carrot root.', goal: 'Master Microbial Culture CBSE.' },
    discovery: {
        question: 'Compare the factor sensitivity of **direct organogenesis** (node 008) vs. **somatic embryogenesis** (node 009).',
        options: ['Correct answer: (a) Somatic embryogenesis is far more sensitive to explant age', 'optimizing one factor (e.g., BAP concentration) will fix a failed protocol', '"optimizing one factor (e'],
        answer: '(a) Somatic embryogenesis is far more sensitive to explant age',
        hook: 'Students believe "optimizing one factor (e.g., BAP concentration) will fix a failed protocol." In reality, factors.',
    },
    teaching: [
        { title: 'Factors affecting in vitro culture responses.', text: 'Factors affecting in vitro culture responses refer to the specific genetic, physiological, and environmental variables that determine the success or failure of plant tissue culture, including explant.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_011', title: 'Factors affecting in vitro culture.',
          scaffold: { problem: 'A lab tries to establish somatic embryogenesis in *Coffea arabica* using mature leaf explants on MS + 2,4-D (4 mg/L) + kinetin (1 mg/L) in.',
            steps: [
            { text: 'Compare explant sources — mature leaf (low competence, high phenolics) vs. young leaf (high competence, meristematic).' },
            { text: 'Compare PGR regime — 2,4-D 4 mg/L + kinetin 1 mg/L (high auxin, cytokinin type) vs.' },
            { text: 'Compare basal salt strength and light — full MS (high NH₄NO₃/KNO₃) in dark vs. ½ MS in light.' },
            { text: 'Revised protocol: Young leaf explants (2nd–3rd node) → ½ MS + 2,4-D 1 mg/L + TDZ 0.1 mg/L + 30 g/L sucrose + 0.7% agar,.' },
            { text: 'Verify by monitoring embryo stages weekly; expect >40% globular-to-heart transition by week 6.', faded: true, blankAnswer: 'Three critical mismatches: (1) Explant: mature leaf → young.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_08_009', title: 'Contamination in animal cell culture.',
          scaffold: { problem: 'A lab uses 500 mL of complete medium (DMEM + 10% FBS + Pen‑Strep) per week for CHO cells. The FBS lot was not tested for mycoplasma.',
            steps: [
            { text: 'Identify the initial mycoplasma concentration in the culture: 5 × 10³ CFU/mL.' },
            { text: 'Account for the 1:10 dilution during sample processing: diluted concentration = (5 × 10³ CFU/mL) / 10 = 5 × 10² CFU/mL.' },
            { text: 'Compare the diluted concentration (500 CFU/mL) with the kit\'s limit of detection (10 CFU/mL).' },
            { text: 'Consider sampling volume: the kit uses 1 mL of diluted sample, so absolute CFU in reaction = 500 CFU, well above.' },
            { text: 'Conclude that the test will be positive, confirming contamination despite asymptomatic culture appearance.', faded: true, blankAnswer: 'Yes, the PCR will detect mycoplasma (final concentration.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_001', title: 'Cell totipotency is the inherent.',
          scaffold: { problem: 'A Class 12 student reads that "Haberlandt proposed totipotency in 1902, but Steward proved it in 1958 using carrot phloem cells." The.',
            steps: [
            { text: 'Identify the error — the student states "all plant cells are totipotent" as an absolute fact, ignoring the word.' },
            { text: 'Recall NCERT phrasing — "Theoretically all plant cells are able to give rise to a complete plant" (emphasis on.' },
            { text: 'Incorporate Steward\'s specific contribution — he demonstrated *somatic embryogenesis* from *carrot phloem cells*, not.' },
            { text: 'Add two limitations — (a) dead/empty cells (xylem vessels, sclereids) lack protoplasts; (b) recalcitrant genotypes.' },
            { text: 'Construct the full-mark answer: "Haberlandt (1902) *theorized* that all plant cells are potentially totipotent.', faded: true, blankAnswer: 'Full-mark answer as constructed in Step 5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_002', title: 'The history and milestones of plant.',
          scaffold: { problem: 'A Class 12 student is asked to arrange these milestones in chronological order and identify which milestone directly enabled the next: (A).',
            steps: [
            { text: 'Identify the earliest milestone — Haberlandt\'s 1902 theoretical proposal of totipotency (E) is the conceptual origin.' },
            { text: 'Find the first experimental validation — Gautheret & Nobecourt (1939) achieved sustained callus growth (D), proving.' },
            { text: 'Identify the breakthrough in developmental control — Skoog & Miller (1957) discovered auxin/cytokinin ratios direct.' },
            { text: 'Locate the somatic embryogenesis proof — Steward (1958) demonstrated bipolar embryo formation from single cells (C),.' },
            { text: 'Identify the standardization milestone — Murashige & Skoog (1962) created a reproducible medium (A) that made all prior.' },
            { text: 'Verify causal chain: E (concept) → D (callus proliferation) → B (organized regeneration control) → C (embryogenic.', faded: true, blankAnswer: 'Chronological order: E (1902) → D (1939) → B (1957) → C.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_003', title: 'Murashige and Skoog (MS) medium is a.',
          scaffold: { problem: 'The standard MS medium contains potassium nitrate (KNO₃) at 1900 mg/L. You have a 10× macro stock solution.',
            steps: [
            { text: 'Identify the target final concentration in 1× MS: 1900 mg/L KNO₃.' },
            { text: 'Since the stock is 10×, its concentration must be 10 times the final concentration: 1900 mg/L × 10 = 19,000 mg/L = 19.' },
            { text: 'Convert to millimolar: 19,000 mg/L ÷ 101 mg/mmol = 188.1 mM (≈ 188 mM).' },
            { text: 'For 500 mL (0.5 L) of 10× stock, mass needed = concentration (g/L) × volume (L) = 19 g/L × 0.5 L = 9.5 g.' },
            { text: 'Verify: 9.5 g in 0.5 L = 19 g/L = 19,000 mg/L. Diluting 10-fold gives 1900 mg/L — correct.', faded: true, blankAnswer: '(a) 19,000 mg/L or 188 mM; (b) 9.5 g' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_06_004', title: 'Auxins and cytokinins are the two.',
          scaffold: { problem: 'A tissue culture lab is establishing a micropropagation protocol for banana (Musa sp., monocot).',
            steps: [
            { text: 'Calculate auxin:cytokinin molar ratios for each medium. NAA MW = 186.2 g/mol, BAP MW = 225.3 g/mol.' },
            { text: 'Interpret ratios using Skoog-Miller: Medium A (high cytokinin:auxin ≈ 16.5) → strong shoot promotion, minimal callus.' },
            { text: 'Evaluate shoot quality: Medium A gives highest shoot number without callus or hyperhydricity — ideal for.' },
            { text: 'Recommend Medium A (0.1 mg/L NAA + 2 mg/L BAP) as optimal for banana shoot multiplication.' },
            { text: 'Note that rooting will require a separate medium (e.g., ½ MS + 1–2 mg/L IBA, no cytokinin) — multiplication and rooting.', faded: true, blankAnswer: 'Optimal medium = A (0.1 mg/L NAA + 2 mg/L BAP);.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_08_009', title: 'Identify each idea',
          dissect: { specimen: 'Microbial Culture CBSE', spots: [
            { id: 's1', label: 'Factors affecting in vitro culture', prompt: 'Which idea is this? — Factors affecting in vitro culture responses refer to the specific genetic,.', answer: 'Factors affecting in vitro culture', options: ['Factors affecting in vitro culture', 'Contamination in animal cell culture', 'Cell totipotency is the inherent', 'The history and milestones of'] },
            { id: 's2', label: 'Contamination in animal cell culture', prompt: 'Which idea is this? — Contamination in animal cell culture refers to the unwanted presence of microorganisms.', answer: 'Contamination in animal cell culture', options: ['Contamination in animal cell culture', 'Factors affecting in vitro culture', 'Cell totipotency is the inherent', 'The history and milestones of'] },
            { id: 's3', label: 'Cell totipotency is the inherent', prompt: 'Which idea is this? — Cell totipotency is the inherent genetic potential of a single plant cell to.', answer: 'Cell totipotency is the inherent', options: ['Cell totipotency is the inherent', 'Factors affecting in vitro culture', 'Contamination in animal cell culture', 'The history and milestones of'] },
            { id: 's4', label: 'The history and milestones of', prompt: 'Which idea is this? — The history and milestones of plant tissue culture trace the chronological development of.', answer: 'The history and milestones of', options: ['The history and milestones of', 'Factors affecting in vitro culture', 'Contamination in animal cell culture', 'Cell totipotency is the inherent'] },
            { id: 's5', label: 'Murashige and Skoog MS medium', prompt: 'Which idea is this? — Murashige and Skoog (MS) medium is a chemically defined, widely used plant tissue culture.', answer: 'Murashige and Skoog MS medium', options: ['Murashige and Skoog MS medium', 'Factors affecting in vitro culture', 'Contamination in animal cell culture', 'Cell totipotency is the inherent'] },
            { id: 's6', label: 'Auxins and cytokinins are the', prompt: 'Which idea is this? — Auxins and cytokinins are the two primary classes of plant growth regulators used in.', answer: 'Auxins and cytokinins are the', options: ['Auxins and cytokinins are the', 'Factors affecting in vitro culture', 'Contamination in animal cell culture', 'Cell totipotency is the inherent'] }
          ] } }
    ],
    explore: { component: C12_BiotechMicrobialCultureCBSESim, prompt: 'Explore the interactive — Microbial Culture CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_011', difficulty: 'standard',
          question: 'Factors affecting in vitro culture responses refer to the specific genetic,.',
          hint: 'If stuck, revisit the Skoog-Miller auxin:cytokinin ratio experiment (node.',
          misconception: 'Students believe "optimizing one factor (e.g., BAP concentration) will fix a failed protocol." In reality, factors.',
          parts: [
                { id: 'a', prompt: 'Compare the factor sensitivity of **direct organogenesis** (node 008) vs. **somatic embryogenesis** (node 009).', answer: '(a) Somatic embryogenesis is far more sensitive to explant age',
                  options: ['Correct answer: (a) Somatic embryogenesis is far more sensitive to explant age', 'optimizing one factor (e.g., BAP concentration) will fix a failed protocol', '"optimizing one factor (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "optimizing one factor (e.g., BAP concentration) will fix a failed protocol." In reality, factors interact non-linearly:.' }
          ],
            remediations: { 'optimizing-one-factor-e': { steps: ['If a student cannot diagnose factor interactions: (1) Have them reconstruct a failed culture case study (provide.', '(2) Force them to write a "change only one variable" experimental plan for the top 3 suspect factors.', '(3) Revisit node c12_biotech_cbse_06_004 (PGR roles) and node c12_biotech_cbse_06_003 (MS medium composition) to.', 'Re-diagnostic: Give a new scenario (e.g., "citrus epicotyl segments on MS+NAA+BAP produce callus but no shoots") and.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "optimizing one factor (e.g., BAP concentration) will fix a failed protocol." In reality, factors.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "For a recalcitrant woody species, the single most effective modification to achieve shoot regeneration is switching from MS to WPM.', answer: 'Refute',
                  options: ['Refute', 'optimizing one factor (e.g., BAP concentration) will fix a failed protocol', '"optimizing one factor (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "optimizing one factor (e.g., BAP concentration) will fix a failed protocol." In reality, factors interact non-linearly:.' },
                { id: 'b', prompt: 'Design a 2×2 factorial experiment to test the interaction between **light quality (red vs. blue LED)** and **sucrose concentration (20 vs.', answer: 'hypothesis, (',
                  options: ['hypothesis, (', 'optimizing one factor (e.g., BAP concentration) will fix a failed protocol', '"optimizing one factor (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "optimizing one factor (e.g., BAP concentration) will fix a failed protocol." In reality, factors interact non-linearly:.' },
                { id: 'c', prompt: 'Compare the factor sensitivity of **direct organogenesis** (node 008) vs. **somatic embryogenesis** (node 009).', answer: '(a) Somatic embryogenesis is far more sensitive to explant age',
                  options: ['Correct answer: (a) Somatic embryogenesis is far more sensitive to explant age', 'optimizing one factor (e.g., BAP concentration) will fix a failed protocol', '"optimizing one factor (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "optimizing one factor (e.g., BAP concentration) will fix a failed protocol." In reality, factors interact non-linearly:.' }
          ],
            remediations: { 'optimizing-one-factor-e': { steps: ['If a student cannot diagnose factor interactions: (1) Have them reconstruct a failed culture case study (provide.', '(2) Force them to write a "change only one variable" experimental plan for the top 3 suspect factors.', '(3) Revisit node c12_biotech_cbse_06_004 (PGR roles) and node c12_biotech_cbse_06_003 (MS medium composition) to.', 'Re-diagnostic: Give a new scenario (e.g., "citrus epicotyl segments on MS+NAA+BAP produce callus but no shoots") and.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_009', difficulty: 'standard',
          question: 'Contamination in animal cell culture refers to the unwanted presence of.',
          hint: 'Review the aseptic technique workflow in node `c12_biotech_cbse_08_004` (media.',
          misconception: 'Students often believe that **adding antibiotics (Pen‑Strep) to the culture medium is a substitute for good aseptic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Contamination in animal cell culture refers to the unwanted presence of microorganisms',
                  options: ['Contamination in animal cell culture refers to the unwanted presence of microorganisms', 'Factors affecting in vitro culture responses refer to the specific genetic,', 'Cell totipotency is the inherent genetic potential of a single plant cell to', 'The history and milestones of plant tissue culture trace the chronological development of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **adding antibiotics (Pen‑Strep) to the culture medium is a substitute for good aseptic technique and will.' }
          ],
            remediations: { 'adding-antibiotics-pen-strep-to': { steps: ['If a student cannot differentiate contaminant types or design a monitoring plan: 1.', '**Re‑visit microscopy basics** — use node `c11_biotech_cbse_12_001` (Microscopy) to practice identifying bacterial.', '**Review microbial biology** — nodes `c11_bio_cbse_02_003` (Bacteria structure/reproduction) and `c11_bio_cbse_02_005`.', '**Simulate a contamination drill** — give the student three blinded culture photos (bacterial, fungal,.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **adding antibiotics (Pen‑Strep) to the culture medium is a substitute for good aseptic.',
          parts: [
                { id: 'a', prompt: 'A junior researcher argues: "Since our CO₂ incubator has a HEPA filter and we spray 70% ethanol on everything, we don\'t need to waste money on routine.', answer: '**Critique:** The statement is dangerously false',
                  options: ['**Critique:** The statement is dangerously false', 'clean environment', 'sterile culture'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **adding antibiotics (Pen‑Strep) to the culture medium is a substitute for good aseptic technique and will.' }
          ],
            remediations: { 'adding-antibiotics-pen-strep-to': { steps: ['If a student cannot differentiate contaminant types or design a monitoring plan: 1.', '**Re‑visit microscopy basics** — use node `c11_biotech_cbse_12_001` (Microscopy) to practice identifying bacterial.', '**Review microbial biology** — nodes `c11_bio_cbse_02_003` (Bacteria structure/reproduction) and `c11_bio_cbse_02_005`.', '**Simulate a contamination drill** — give the student three blinded culture photos (bacterial, fungal,.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_001', difficulty: 'standard',
          question: 'Cell totipotency is the inherent genetic potential of a single plant cell to.',
          hint: 'If stuck, revisit c11_biotech_cbse_02_009 (nucleus/chromatin) and c11_bio_cbse_13_003/004.',
          misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical.',
          parts: [
                { id: 'a', prompt: 'A researcher isolates single cells from the pith of a mature tobacco plant and cultures them on MS medium with 2,4-D (auxin) and kinetin (cytokinin).', answer: '(1) Dedifferentiation',
                  options: ['Correct answer: (1) Dedifferentiation', 'mitosis causes callus', 'auxin alone causes shoots'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical constraints: (1).' },
                { id: 'b', prompt: 'Compare the genetic basis of totipotency in plants vs. animals.', answer: 'Correct analysis: (a) Both have identical nuclear DNA in somatic cells (genetic',
                  options: ['Correct analysis: (a) Both have identical nuclear DNA in somatic cells (genetic', 'totipotency means any plant cell can *always* become a whole plant', '"totipotency means any plant cell can *always* become a whole plant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical constraints: (1).' }
          ],
            remediations: { 'totipotency-means-any-plant-cell': { steps: ['If the student holds the above misconception: Step 1 — Show a micrograph of mature xylem (dead, lignified, no nucleus).', 'Step 3 — Assign a mini-literature search: "Find one crop where somatic embryogenesis fails despite optimized PGRs.".', 'This forces confrontation with the difference between *theoretical potential* and *practical realizability*.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Haberlandt\'s totipotency concept was proven by Steward\'s carrot experiment (1958), so we now know *every* plant cell is totipotent.".', answer: 'Correct evaluation: The statement is *partially incorrect*',
                  options: ['Correct evaluation: The statement is *partially incorrect*', 'yes, it\'s proven', 'totipotency means any plant cell can *always* become a whole plant', '"totipotency means any plant cell can *always* become a whole plant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical constraints: (1).' },
                { id: 'b', prompt: 'Design a thought experiment: You have a variegated plant (green and white sectors). You culture single cells from the white (chloroplast-deficient) sector.', answer: 'Expected answer: The regenerated plant will be *all-white* (non-variegated)',
                  options: ['Expected answer: The regenerated plant will be *all-white* (non-variegated)', 'it will be variegated', 'totipotency means any plant cell can *always* become a whole plant', '"totipotency means any plant cell can *always* become a whole plant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical constraints: (1).' },
                { id: 'c', prompt: 'Compare the genetic basis of totipotency in plants vs. animals.', answer: 'Correct analysis: (a) Both have identical nuclear DNA in somatic cells (genetic',
                  options: ['Correct analysis: (a) Both have identical nuclear DNA in somatic cells (genetic', 'totipotency means any plant cell can *always* become a whole plant', '"totipotency means any plant cell can *always* become a whole plant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "totipotency means any plant cell can *always* become a whole plant." They ignore three critical constraints: (1).' }
          ],
            remediations: { 'totipotency-means-any-plant-cell': { steps: ['If the student holds the above misconception: Step 1 — Show a micrograph of mature xylem (dead, lignified, no nucleus).', 'Step 3 — Assign a mini-literature search: "Find one crop where somatic embryogenesis fails despite optimized PGRs.".', 'This forces confrontation with the difference between *theoretical potential* and *practical realizability*.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_002', difficulty: 'standard',
          question: 'The history and milestones of plant tissue culture trace the chronological.',
          hint: 'If stuck, revisit c12_biotech_cbse_06_001 (Cell Totipotency) and focus on the distinction.',
          misconception: 'Students memorize milestone names and years as isolated facts (e.g., "Haberlandt 1902, MS medium 1962") without.',
          parts: [
                { id: 'a', prompt: 'Compare the scientific contributions of Murashige & Skoog (1962) versus Steward et al. (1958). Which milestone had broader impact on the field and why?', answer: 'Steward (1958) demonstrated somatic embryogenesis in carrot, proving totipotency',
                  options: ['Steward (1958) demonstrated somatic embryogenesis in carrot, proving totipotency', 'Steward was more important'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorize milestone names and years as isolated facts (e.g., "Haberlandt 1902, MS medium 1962") without understanding the causal.' }
          ],
            remediations: { 'students-memorize-milestone-names-and': { steps: ['If the student cannot sequence milestones causally: (1) Have them draw a flowchart with arrows showing "enabled".', '(2) Assign a 200-word paragraph explaining why 1957 (Skoog & Miller) had to precede 1962 (MS medium) for the latter to.', '(3) Re-diagnose with DIAGNOSTIC_QUESTION_4 to verify they now grasp the dependency chain.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students memorize milestone names and years as isolated facts (e.g., "Haberlandt 1902, MS medium 1962") without.',
          parts: [
                { id: 'a', prompt: 'Compare the scientific contributions of Murashige & Skoog (1962) versus Steward et al. (1958). Which milestone had broader impact on the field and why?', answer: 'Steward (1958) demonstrated somatic embryogenesis in carrot, proving totipotency',
                  options: ['Steward (1958) demonstrated somatic embryogenesis in carrot, proving totipotency', 'Steward was more important'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students memorize milestone names and years as isolated facts (e.g., "Haberlandt 1902, MS medium 1962") without understanding the causal.' }
          ],
            remediations: { 'students-memorize-milestone-names-and': { steps: ['If the student cannot sequence milestones causally: (1) Have them draw a flowchart with arrows showing "enabled".', '(2) Assign a 200-word paragraph explaining why 1957 (Skoog & Miller) had to precede 1962 (MS medium) for the latter to.', '(3) Re-diagnose with DIAGNOSTIC_QUESTION_4 to verify they now grasp the dependency chain.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_003', difficulty: 'standard',
          question: 'Murashige and Skoog (MS) medium is a chemically defined, widely used plant.',
          hint: 'If stuck on concentration calculations, revisit Class 11 Chemistry node.',
          misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.',
          parts: [
                { id: 'a', prompt: 'A student prepares MS medium but forgets to add the iron source (FeSO₄·7H₂O and Na₂EDTA).', answer: 'Iron is immobile in plants',
                  options: ['Iron is immobile in plants', 'iron deficiency causes general yellowing of all leaves', 'iron is mobile so old leaves turn yellow first'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.' },
                { id: 'b', prompt: 'Compare the nitrogen source in MS medium (NH₄NO₃ + KNO₃) with that in a typical microbial medium like LB broth (tryptone/yeast extract).', answer: 'MS uses defined inorganic salts (NH₄⁺ and NO₃⁻)',
                  options: ['MS uses defined inorganic salts (NH₄⁺ and NO₃⁻)', 'plants cannot use organic nitrogen', 'MS medium'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.' }
          ],
            remediations: { 'ms-medium-is-a-single': { steps: ['Revisit the distinction between **basal medium** (macros, micros, vitamins, carbon, gelling agent) and **supplements**.', 'Review the standard MS macro/micro/vitamin tables (NCERT Appendix or standard protocol sheets) and create a one-page.', 'Practice 3–4 dilution calculations: given a stock concentration and desired final concentration, compute the volume of.', 'Re-diagnostic: Ask the student to write the full composition of "MS basal medium" and then "MS medium for shoot.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.',
          parts: [
                { id: 'a', prompt: 'A protocol for somatic embryogenesis in carrot calls for "MS medium with 2,4-D at 2 mg/L and kinetin at 0.5 mg/L." The lab has 1 mg/mL stock solutions of both.', answer: '1 mL of 1 mg/mL stock in 1 L gives 1 mg/L, not 2 mg/L',
                  options: ['1 mL of 1 mg/mL stock in 1 L gives 1 mg/L, not 2 mg/L', '1 mL each is correct', 'MS medium', '"MS medium" is a single fixed recipe that must never be altered'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.' },
                { id: 'b', prompt: 'Compare the nitrogen source in MS medium (NH₄NO₃ + KNO₃) with that in a typical microbial medium like LB broth (tryptone/yeast extract).', answer: 'MS uses defined inorganic salts (NH₄⁺ and NO₃⁻)',
                  options: ['MS uses defined inorganic salts (NH₄⁺ and NO₃⁻)', 'plants cannot use organic nitrogen', 'MS medium', '"MS medium" is a single fixed recipe that must never be altered'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "MS medium" is a single fixed recipe that must never be altered.' }
          ],
            remediations: { 'ms-medium-is-a-single': { steps: ['Revisit the distinction between **basal medium** (macros, micros, vitamins, carbon, gelling agent) and **supplements**.', 'Review the standard MS macro/micro/vitamin tables (NCERT Appendix or standard protocol sheets) and create a one-page.', 'Practice 3–4 dilution calculations: given a stock concentration and desired final concentration, compute the volume of.', 'Re-diagnostic: Ask the student to write the full composition of "MS basal medium" and then "MS medium for shoot.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_004', difficulty: 'standard',
          question: 'Auxins and cytokinins are the two primary classes of plant growth regulators.',
          hint: 'If stuck, review c11_bio_cbse_13_003 and c11_bio_cbse_13_004 — specifically the tables.',
          misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Auxins promote shoot formation and cytokinins promote root formation in tissue culture." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'explain the role', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' },
                { id: 'b', prompt: 'An explant of carrot root is cultured on MS medium supplemented with 2 mg/L 2,4-D and 0.2 mg/L kinetin. After 3 weeks, a white, friable callus forms.', answer: 'Shoot organogenesis (adventitious shoot formation) will occur',
                  options: ['Shoot organogenesis (adventitious shoot formation) will occur', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' },
                { id: 'c', prompt: 'A researcher wants to induce direct somatic embryogenesis from citrus nucellar callus.', answer: 'Stage 1 (induction): MS + 2 mg/L 2,4-D + 0.5 mg/L BAP for 4 weeks',
                  options: ['Stage 1 (induction): MS + 2 mg/L 2,4-D + 0.5 mg/L BAP for 4 weeks', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' }
          ],
            remediations: { 'auxin-root-hormone': { steps: ['If the student cannot predict morphogenic outcomes from hormone ratios: (1) Revisit c11_bio_cbse_13_003 (Auxins) and.', '(2) Draw a 2×2 grid: x-axis = auxin concentration (low→high), y-axis = cytokinin concentration (low→high); label the.', '(3) Re-attempt Diagnostic Questions 2 and 3; if still incorrect, watch the NCERT lab manual video "Organogenesis in.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "For any given plant species, there exists a single universal auxin:cytokinin ratio that produces optimal shoot regeneration across all.', answer: 'The claim is false',
                  options: ['The claim is false', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' },
                { id: 'b', prompt: 'Create a novel 3-step micropropagation protocol for a hypothetical endangered medicinal plant (assume it is a dicot shrub) using only auxin and cytokinin.', answer: 'Step 1 (shoot initiation): MS + 0.1 mg/L NAA + 2 mg/L BAP',
                  options: ['Step 1 (shoot initiation): MS + 0.1 mg/L NAA + 2 mg/L BAP', 'auxin = root hormone, cytokinin = shoot hormone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "auxin = root hormone, cytokinin = shoot hormone" as absolute rules, ignoring that (a) the ratio matters more than.' }
          ],
            remediations: { 'auxin-root-hormone': { steps: ['If the student cannot predict morphogenic outcomes from hormone ratios: (1) Revisit c11_bio_cbse_13_003 (Auxins) and.', '(2) Draw a 2×2 grid: x-axis = auxin concentration (low→high), y-axis = cytokinin concentration (low→high); label the.', '(3) Re-attempt Diagnostic Questions 2 and 3; if still incorrect, watch the NCERT lab manual video "Organogenesis in.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
