import type { SimDef } from '../../engine/types';
import C11_BiotechnologyBioreactorGrowthSim from '../../../simulations/c6_12/C11_BiotechnologyBioreactorGrowthSim';

/** v3 wrapped master — C11_BiotechnologyBioreactorGrowthSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biotechnologybioreactorgrowthsim: SimDef = {
    id: 'v3w_c11_biotechnologybioreactorgrowthsim',
    title: 'Cell Culture: Animal and Plant Cell Culture Techniques',
    subtitle: 'This node covers: (1) Animal cell culture — primary culture vs cell lines, culture media.',
    classLevel: 11, subject: 'biotechnology', topic: 'Cell Culture: Animal and Plant Cell Culture Techniques',
    chapters: [],
    nodeIds: ['c11_biotech_cbse_12_011', 'c11_biotech_cbse_01_007', 'c11_biotech_cbse_01_008', 'c11_biotech_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you need to produce a life-saving monoclonal antibody for cancer treatment — you cannot extract it.', goal: 'Master Cell Culture: Animal and Plant Cell Culture Techniques.' },
    discovery: {
        question: 'A student prepares MS medium for plant tissue culture but forgets to add agar. The medium remains liquid after autoclaving.',
        options: ['Without agar, the medium lacks a solid support matrix', 'nutrients not absorbed', 'animal cells need serum, plant cells need hormones'],
        answer: 'Without agar, the medium lacks a solid support matrix',
        hook: 'Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading to errors like: (1).',
    },
    teaching: [
        { title: 'Cell culture is the laboratory technique of.', text: 'Cell culture is the laboratory technique of growing and maintaining animal or plant cells, tissues, or organs under controlled artificial conditions (aseptic environment, defined nutrient media,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_12_011', title: 'Cell culture is the laboratory.',
          scaffold: { problem: 'A researcher needs to prepare 500 mL of complete DMEM for CHO cell culture.',
            steps: [
            { text: 'Calculate basal DMEM mass = 13.4 g/L × 0.5 L = 6.7 g. Dissolve in ~400 mL water (80% final volume) with stirring.' },
            { text: 'Glucose mass = 4.5 g/L × 0.5 L = 2.25 g. Add to solution.' },
            { text: 'NaHCO₃ mass = 3.7 g/L × 0.5 L = 1.85 g. Add now — it provides CO₂ buffering capacity; adding after FBS risks.' },
            { text: 'Adjust volume to 450 mL with water (90% of 500 mL). Check pH ~7.0-7.2 (pre-CO₂).' },
            { text: 'Add 50 mL heat-inactivated FBS (10% of 500 mL). Add 5 mL pen-strep (1% of 500 mL).' },
            { text: 'Bring to final 500 mL with water. Sterile filter (0.22 μm). Store at 4°C, warm to 37°C before use.', faded: true, blankAnswer: '6.7 g DMEM powder, 2.25 g glucose, 1.85 g NaHCO₃, 50 mL.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_01_007', title: 'Industrial fermentation is the.',
          scaffold: { problem: 'A biotech company produces citric acid by *Aspergillus niger* in a 50 m³ stirred-tank bioreactor. The process is aerobic.',
            steps: [
            { text: 'Identify the oxygen balance equation at steady state: Oxygen Transfer Rate (OTR) = Oxygen Uptake Rate (OUR).' },
            { text: 'Convert OUR to consistent units: OUR = 0.15 mol/(m³·s) = 0.15 mM/s (since 1 mol/m³ = 1 mM).' },
            { text: 'Set OTR = OUR: 0.1 s⁻¹ × (0.22 mM - CL) = 0.15 mM/s.' },
            { text: 'Solve for CL: 0.22 - CL = 0.15 / 0.1 = 1.5 mM → CL = 0.22 - 1.5 = -1.28 mM.' },
            { text: 'Interpret: Negative CL is impossible; it means OTRmax = kLa × C* = 0.1 × 0.22 = 0.022 mM/s, which is far less than OUR.', faded: true, blankAnswer: 'DO would be negative (impossible), indicating severe oxygen.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_01_008', title: 'Environmental Biotechnology is the.',
          scaffold: { problem: 'An industrial site has soil contaminated with 2,000 mg/kg total petroleum hydrocarbons (TPH). The remediation target is <100 mg/kg.',
            steps: [
            { text: 'Calculate total TPH to degrade: (2000 - 100) mg/kg = 1900 mg/kg. For 1 tonne (1000 kg) soil: 1900 g TPH.' },
            { text: 'Determine required degradation rate: 1900 g / 30 days = 63.3 g/day.' },
            { text: 'Calculate required active biomass: Rate = 50 mg TPH/kg-day per 10⁸ CFU/g ≡ 0.05 g TPH/kg-day per 10⁸ CFU/g.' },
            { text: 'Estimate nutrient demand from biomass growth: TPH degraded = 1900 g. Biomass produced = 1900 g × 0.5 = 950 g biomass.' },
            { text: 'Account for existing soil nutrients: Soil has C:N:P = 100:0.5:0.1.' },
            { text: 'Calculate fertilizer addition: N needed = 190 - 9.5 = 180.5 g N. Urea (46% N) = 180.5 / 0.46 = 392 g/tonne.', faded: true, blankAnswer: 'Add 392 g urea and 219 g DAP per tonne of contaminated soil.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_01_006', title: 'Biotechnology in medicine (Red.',
          scaffold: { problem: 'A biotech startup in Pune wants to produce a recombinant human growth hormone (hGH) for clinical trials.',
            steps: [
            { text: 'Analyze hGH structure — 191 amino acids, 2 disulfide bonds (Cys53-Cys165, Cys182-Cys189), NO glycosylation sites.' },
            { text: 'Evaluate intron issue — E. coli and Pichia lack splicing machinery; must use cDNA (intron-less) for all hosts.' },
            { text: 'Assess disulfide bond formation — E. coli cytoplasm is reducing (thioredoxin/glutaredoxin); disulfide bonds form only.' },
            { text: 'Glycosylation — hGH is non-glycosylated, so hyperglycosylation in Pichia (α-1,3-mannose) or CHO (complex glycans) is.' },
            { text: 'Compare yield/regulation — E. coli: highest yield (g/L), fastest, cheapest, established for hGH (Genotropin®,.' },
            { text: 'Synthesize recommendation — **E. coli BL21(DE3) with periplasmic secretion (pelB signal peptide) or cytoplasmic.', faded: true, blankAnswer: 'E. coli BL21(DE3) with periplasmic targeting or SHuffle.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_01_007', title: 'Identify each idea',
          dissect: { specimen: 'Cell Culture: Animal and Plant Cell Culture Techniques', spots: [
            { id: 's1', label: 'Cell culture is the laboratory', prompt: 'Which idea is this? — Cell culture is the laboratory technique of growing and maintaining animal or plant.', answer: 'Cell culture is the laboratory', options: ['Cell culture is the laboratory', 'Industrial fermentation is the controlled', 'Environmental Biotechnology is the application', 'Biotechnology in medicine Red Biotechnology'] },
            { id: 's2', label: 'Industrial fermentation is the controlled', prompt: 'Which idea is this? — Industrial fermentation is the controlled, large-scale cultivation of microorganisms.', answer: 'Industrial fermentation is the controlled', options: ['Industrial fermentation is the controlled', 'Cell culture is the laboratory', 'Environmental Biotechnology is the application', 'Biotechnology in medicine Red Biotechnology'] },
            { id: 's3', label: 'Environmental Biotechnology is the application', prompt: 'Which idea is this? — Environmental Biotechnology is the application of biotechnological tools (microorganisms,.', answer: 'Environmental Biotechnology is the application', options: ['Environmental Biotechnology is the application', 'Cell culture is the laboratory', 'Industrial fermentation is the controlled', 'Biotechnology in medicine Red Biotechnology'] },
            { id: 's4', label: 'Biotechnology in medicine Red Biotechnology', prompt: 'Which idea is this? — Biotechnology in medicine (Red Biotechnology) encompasses the application of recombinant.', answer: 'Biotechnology in medicine Red Biotechnology', options: ['Biotechnology in medicine Red Biotechnology', 'Cell culture is the laboratory', 'Industrial fermentation is the controlled', 'Environmental Biotechnology is the application'] }
          ] } }
    ],
    explore: { component: C11_BiotechnologyBioreactorGrowthSim, prompt: 'Explore the interactive — Cell Culture: Animal and Plant Cell Culture Techniques' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_011', difficulty: 'standard',
          question: 'Cell culture is the laboratory technique of growing and maintaining animal or.',
          hint: 'If stuck, revisit c9_bio_ch1_4 (cell wall vs membrane) and c10_bio_cbse_02_007 (plant.',
          misconception: 'Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading to errors like: (1).',
          parts: [
                { id: 'a', prompt: 'A student prepares MS medium for plant tissue culture but forgets to add agar. The medium remains liquid after autoclaving.', answer: 'Without agar, the medium lacks a solid support matrix',
                  options: ['Without agar, the medium lacks a solid support matrix', 'nutrients not absorbed', 'animal cells need serum, plant cells need hormones'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading to errors like: (1) Assuming serum-free.' }
          ],
            remediations: { 'animal-cells-need-serum': { steps: ['Have student list all components of complete DMEM (glucose, amino acids, vitamins, salts, pyruvate) and ask "which can.', 'Show a time-lapse video of plant callus on auxin-rich vs cytokinin-rich media — visually demonstrate that the SAME.', 'Give a case study: "HEK293 cells adapted to serum-free media still require 8 recombinant supplements — identify which.', 'Assign a mini-review: compare somatic embryogenesis pathway (LEC1, LEC2, FUS3, ABI3 transcription factors) vs.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_12_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading to errors like: (1).',
          parts: [
                { id: 'a', prompt: 'Design a minimal experiment to test whether a newly isolated plant species exhibits somatic embryogenesis or organogenesis as its primary regeneration pathway.', answer: 'Explant: young leaf segments (high regeneration competence)',
                  options: ['Explant: young leaf segments (high regeneration competence)', 'animal cells need serum, plant cells need hormones', 'subculture', 'subculturing for differentiation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "animal cells need serum, plant cells need hormones" as a rigid dichotomy, leading to errors like: (1) Assuming serum-free.' }
          ],
            remediations: { 'animal-cells-need-serum': { steps: ['Have student list all components of complete DMEM (glucose, amino acids, vitamins, salts, pyruvate) and ask "which can.', 'Show a time-lapse video of plant callus on auxin-rich vs cytokinin-rich media — visually demonstrate that the SAME.', 'Give a case study: "HEK293 cells adapted to serum-free media still require 8 recombinant supplements — identify which.', 'Assign a mini-review: compare somatic embryogenesis pathway (LEC1, LEC2, FUS3, ABI3 transcription factors) vs.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_007', difficulty: 'standard',
          question: 'Industrial fermentation is the controlled, large-scale cultivation of.',
          hint: 'Review the difference between primary and secondary metabolites using the.',
          misconception: 'Students often believe "fermentation = anaerobic process producing alcohol" because Class 10 defines fermentation as.',
          parts: [
                { id: 'a', prompt: 'Name the microorganism and the type of respiration (aerobic/anaerobic) used in the industrial production of (a) ethanol for biofuel, (b) citric acid for food.', answer: 'ethanol for biofuel, (',
                  options: ['ethanol for biofuel, (', 'all use yeast', 'penicillin is anaerobic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "fermentation = anaerobic process producing alcohol" because Class 10 defines fermentation as anaerobic respiration.' }
          ],
            remediations: { 'fermentation-anaerobic-process-producing-alcohol': { steps: ['Revisit Class 10 respiration (c10_bio_cbse_01_007): contrast anaerobic glycolysis (ethanol/lactate) with aerobic TCA.', 'Draw a 2x2 table: rows = primary vs secondary metabolite; columns = aerobic vs anaerobic.', 'Fill with examples: primary aerobic (citric acid, gluconic acid), primary anaerobic (ethanol, lactic acid), secondary.', 'For each quadrant, state the bioreactor implication: oxygen supply, growth phase coupling, nutrient feeding strategy.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "fermentation = anaerobic process producing alcohol" because Class 10 defines fermentation as.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Traditional fermented foods (idli, dahi, kinema) are primitive versions of modern industrial fermentation and offer no scientific.', answer: 'Refute',
                  options: ['Refute', 'modern = superior', 'fermentation = anaerobic process producing alcohol', 'the same process strategy works for both'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "fermentation = anaerobic process producing alcohol" because Class 10 defines fermentation as anaerobic respiration.' }
          ],
            remediations: { 'fermentation-anaerobic-process-producing-alcohol': { steps: ['Revisit Class 10 respiration (c10_bio_cbse_01_007): contrast anaerobic glycolysis (ethanol/lactate) with aerobic TCA.', 'Draw a 2x2 table: rows = primary vs secondary metabolite; columns = aerobic vs anaerobic.', 'Fill with examples: primary aerobic (citric acid, gluconic acid), primary anaerobic (ethanol, lactic acid), secondary.', 'For each quadrant, state the bioreactor implication: oxygen supply, growth phase coupling, nutrient feeding strategy.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_008', difficulty: 'standard',
          question: 'Environmental Biotechnology is the application of biotechnological tools.',
          hint: 'Revisit c10_bio_cbse_01_007 (Respiration types) and c9_bio_ch4_6 (Adaptations) to recall.',
          misconception: 'Students believe **phytoremediation simply means "planting trees to clean soil"** and that the contaminants disappear.',
          parts: [
                { id: 'a', prompt: 'Define bioremediation and name one microorganism and one plant used for it, specifying the pollutant each targets.', answer: 'Bioremediation is the use of living organisms to degrade/detoxify pollutants',
                  options: ['Bioremediation is the use of living organisms to degrade/detoxify pollutants', 'using chemicals to clean waste', 'planting trees to clean soil'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **phytoremediation simply means "planting trees to clean soil"** and that the contaminants disappear.' },
                { id: 'b', prompt: 'Compare and contrast microbial bioremediation vs phytoremediation for heavy metal (Pb, Hg, Cd) contamination in terms of: (a) mechanism of action, (b) fate of.', answer: 'mechanism of action, (',
                  options: ['mechanism of action, (', 'planting trees to clean soil'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **phytoremediation simply means "planting trees to clean soil"** and that the contaminants disappear.' }
          ],
            remediations: { 'phytoremediation-simply-means-planting-trees': { steps: ['**Clarify terminology**: Create a 2x2 table: Rows = Phytoextraction vs Phytostabilization; Columns = Mechanism,.', '**Concrete demonstration**: Show NCERT Fig 1.4 logic: *Brassica napus* for Hg/Pb → harvest shoots → incinerate → ash =.', 'Contrast with *Vetiver grass* for erosion/stabilization → no harvest.', '**Address "disappearance" myth**: Mass balance exercise: 1 ha soil with 500 mg/kg Pb → plant uptake 100 kg Pb/ha →.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **phytoremediation simply means "planting trees to clean soil"** and that the contaminants disappear.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Genetically engineered microorganisms (GEMs) for bioremediation should be released freely into the environment because they solve.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'planting trees to clean soil'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **phytoremediation simply means "planting trees to clean soil"** and that the contaminants disappear.' },
                { id: 'b', prompt: 'Compare and contrast microbial bioremediation vs phytoremediation for heavy metal (Pb, Hg, Cd) contamination in terms of: (a) mechanism of action, (b) fate of.', answer: 'mechanism of action, (',
                  options: ['mechanism of action, (', 'planting trees to clean soil'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **phytoremediation simply means "planting trees to clean soil"** and that the contaminants disappear.' }
          ],
            remediations: { 'phytoremediation-simply-means-planting-trees': { steps: ['**Clarify terminology**: Create a 2x2 table: Rows = Phytoextraction vs Phytostabilization; Columns = Mechanism,.', '**Concrete demonstration**: Show NCERT Fig 1.4 logic: *Brassica napus* for Hg/Pb → harvest shoots → incinerate → ash =.', 'Contrast with *Vetiver grass* for erosion/stabilization → no harvest.', '**Address "disappearance" myth**: Mass balance exercise: 1 ha soil with 500 mg/kg Pb → plant uptake 100 kg Pb/ha →.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_006', difficulty: 'standard',
          question: 'Biotechnology in medicine (Red Biotechnology) encompasses the application of.',
          hint: 'Revisit the rDNA technology flowchart (isolation → vector → host → expression) from.',
          misconception: '**Misconception:** "Recombinant vaccines and gene therapy both involve putting genes into humans, so they are.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biotechnology in medicine (Red Biotechnology) encompasses the application of recombinant',
                  options: ['Biotechnology in medicine (Red Biotechnology) encompasses the application of recombinant', 'Cell culture is the laboratory technique of growing and maintaining animal or plant', 'Industrial fermentation is the controlled, large-scale cultivation of microorganisms', 'Environmental Biotechnology is the application of biotechnological tools (microorganisms,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Recombinant vaccines and gene therapy both involve putting genes into humans, so they are essentially the same.' }
          ],
            remediations: { 'misconception-recombinant-vaccines-and-gene': { steps: ['**Clarify the "gene" destination:** Draw a T-table: Vaccine = gene stays in *production cell* (yeast/E.', 'coli) → protein purified → injected.', 'Gene therapy = gene enters *patient\'s cell* (via vector) → protein made *in vivo*.', 'ADA" analogy:** Recombinant insulin = bakery makes bread (protein), you eat it.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Recombinant vaccines and gene therapy both involve putting genes into humans, so they are.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Edible vaccines expressed in transgenic plants (e.g., potato expressing measles antigen) are the ideal solution for global.', answer: '**Answer:** The statement overpromises',
                  options: ['**Answer:** The statement overpromises', 'antigen expression in plant', 'effective mucosal vaccine'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Recombinant vaccines and gene therapy both involve putting genes into humans, so they are essentially the same.' }
          ],
            remediations: { 'misconception-recombinant-vaccines-and-gene': { steps: ['**Clarify the "gene" destination:** Draw a T-table: Vaccine = gene stays in *production cell* (yeast/E.', 'coli) → protein purified → injected.', 'Gene therapy = gene enters *patient\'s cell* (via vector) → protein made *in vivo*.', 'ADA" analogy:** Recombinant insulin = bakery makes bread (protein), you eat it.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
