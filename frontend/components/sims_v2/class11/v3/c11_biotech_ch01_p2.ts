import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch01_p2: SimDef = {
    id: 'v3_c11_biotech_ch01_p2',
    title: 'Introduction to Biotechnology · Part 2/2',
    subtitle: 'Map the scope of biotechnology — from recombinant DNA to industrial fermentation.',
    classLevel: 11, subject: 'biotechnology', topic: 'Introduction to Biotechnology · Part 2/2',
    chapters: ['c11_biotech_ch01'],
    nodeIds: ['c11_biotech_cbse_01_007', 'c11_biotech_cbse_01_008', 'c11_biotech_cbse_01_009', 'c11_biotech_cbse_01_010', 'c11_biotech_cbse_01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biotech intern touring a modern insulin plant', intro: 'A pharmacy shelf full of biotech products, each one a cell tricked into working for us.', goal: 'Define biotechnology, distinguish classical from modern methods, and outline major application areas.' },
    discovery: {
        question: 'Insulin for diabetics was once extracted from pig pancreases — tonnes of tissue for grams of hormone. Today bacteria in a steel tank do the job. What actually changed?',
        options: ['The human insulin gene was moved into bacteria, turning them into protein factories', 'Bacteria naturally produce human insulin when fed sugar', 'Pig insulin was chemically edited to match human insulin', 'Fermentation tanks simply scale up pancreas extraction'],
        answer: 'The human insulin gene was moved into bacteria, turning them into protein factories',
        hook: 'Biotechnology isn\'t just brewing microbes — it\'s rewriting their instructions to build molecules they never made.',
    },
    teaching: [
        { title: 'Biotechnology in Industry: Fermentation Products', text: 'Industrial fermentation is the controlled, large-scale cultivation of microorganisms (bacteria, yeast, fungi) in bioreactors to metabolically convert substrates (like glucose, molasses, corn steep.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_01_007', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Trace how a gene becomes a product: identify where recombinant DNA, fermentation and downstream processing each fit in the biotech pipeline.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_007', title: 'Biotechnology in Industry: Fermentation Products',
          caseStudy: { intro: 'Imagine you are visiting a large factory that produces citric acid for soft drinks and penicillin for medicines.',
            decisions: [{ prompt: 'Name the microorganism and the type of respiration (aerobic/anaerobic) used in the industrial production of (a) ethanol for biofuel, (b).', options: [
                { text: '(a) *Saccharomyces cerevisiae* (yeast), anaerobic', outcome: '(a) *Saccharomyces cerevisiae* (yeast), anaerobic; (b) *Aspergillus niger* (fungus), aerobic; (c).' },
                { text: 'all use yeast', outcome: 'Not quite — Students often believe "fermentation = anaerobic process producing alcohol" because Class 10.', reveals: 'fermentation-anaerobic-process-producing-alcohol' },
                { text: 'penicillin is anaerobic', outcome: 'Not quite — Students often believe "fermentation = anaerobic process producing alcohol" because Class 10.', reveals: 'fermentation-anaerobic-process-producing-alcohol' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_008', title: 'Environmental Biotechnology: Bioremediation',
          caseStudy: { intro: 'Imagine a factory near your town has leaked chromium and lead into the soil and groundwater, making the land barren and water toxic.',
            decisions: [{ prompt: 'Define bioremediation and name one microorganism and one plant used for it, specifying the pollutant each targets.', options: [
                { text: 'Bioremediation is the use of living organisms to degrade/detoxify pollutants', outcome: 'Bioremediation is the use of living organisms to degrade/detoxify pollutants.' },
                { text: 'using chemicals to clean waste', outcome: 'Not quite — Students believe **phytoremediation simply means "planting trees to clean soil"** and that the.', reveals: 'phytoremediation-simply-means-planting-trees' },
                { text: 'planting trees to clean soil', outcome: 'Not quite — Students believe **phytoremediation simply means "planting trees to clean soil"** and that the.', reveals: 'phytoremediation-simply-means-planting-trees' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_009', title: 'Ethical Issues in Biotechnology: Bioethics',
          caseStudy: { intro: 'Imagine a 17-year-old student in Punjab reads about "Golden Rice" engineered to produce beta-carotene to prevent childhood blindness—sounds like pure good.',
            decisions: [{ prompt: 'Define bioethics in the context of biotechnology and list the four core principles used to evaluate biotechnological interventions.', options: [
                { text: 'Bioethics is the systematic application of ethical principles—autonomy (respect for', outcome: 'Bioethics is the systematic application of ethical principles—autonomy (respect for decision-making.' },
                { text: 'bioethics is about what is right or wrong in biology', outcome: 'Not quite — Students equate "bioethics" with "personal moral opinion" or "religious belief," leading them.', reveals: 'students-equate-bioethics-with-personal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_010', title: 'Biosafety: Regulations and Guidelines',
          caseStudy: { intro: 'Imagine a research team in Delhi has engineered a strain of *E. coli* to produce a novel antibiotic.',
            decisions: [{ prompt: 'Define "Biosafety Level 2 (BSL-2)" by stating the risk group of agents handled, the primary containment requirement beyond BSL-1, and one.', options: [
                { text: 'BSL-2 handles Risk Group 2 agents (moderate individual risk, low community risk, e.g.,', outcome: 'BSL-2 handles Risk Group 2 agents (moderate individual risk, low community risk, e.g.' },
                { text: 'Biosafety Level', outcome: 'Not quite — Students believe "Biosafety Level" is determined *solely* by the pathogenicity of the *wild-type.', reveals: 'biosafety-level-is-determined-solely' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_011', title: 'Intellectual Property Rights and Patents in Biotechnology',
          caseStudy: { intro: 'Imagine you\'ve engineered a novel *Bacillus* strain that degrades plastic waste 10x faster than existing strains—your lab wants to commercialize it.',
            decisions: [{ prompt: 'What are the three statutory criteria an invention must satisfy to be patentable under the Indian Patents Act, 1970 (as amended)?', options: [
                { text: 'The three criteria are: (1) Novelty—the invention must not be part of the prior art (any', outcome: 'The three criteria are: (1) Novelty—the invention must not be part of the prior art (any public.' },
                { text: 'usefulness', outcome: 'Not quite — Students often believe that "any genetically modified organism is automatically patentable.', reveals: 'any-genetically-modified-organism-is' },
                { text: 'any genetically modified organism is automatically patentable in India', outcome: 'Not quite — Students often believe that "any genetically modified organism is automatically patentable.', reveals: 'any-genetically-modified-organism-is' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_01_008', title: 'Identify each idea',
          dissect: { specimen: 'Introduction to Biotechnology · Part 2/2', spots: [
            { id: 's1', label: 'Biotechnology in Industry Fermentation Products', prompt: 'Which idea is this? — Industrial fermentation is the controlled, large-scale cultivation of microorganisms.', answer: 'Biotechnology in Industry Fermentation Products', options: ['Biotechnology in Industry Fermentation Products', 'Environmental Biotechnology Bioremediation', 'Ethical Issues in Biotechnology Bioethics', 'Biosafety Regulations and Guidelines'] },
            { id: 's2', label: 'Environmental Biotechnology Bioremediation', prompt: 'Which idea is this? — Environmental Biotechnology is the application of biotechnological tools (microorganisms.', answer: 'Environmental Biotechnology Bioremediation', options: ['Environmental Biotechnology Bioremediation', 'Biotechnology in Industry Fermentation Products', 'Ethical Issues in Biotechnology Bioethics', 'Biosafety Regulations and Guidelines'] },
            { id: 's3', label: 'Ethical Issues in Biotechnology Bioethics', prompt: 'Which idea is this? — Bioethics in biotechnology is the systematic study of ethical principles—autonomy.', answer: 'Ethical Issues in Biotechnology Bioethics', options: ['Ethical Issues in Biotechnology Bioethics', 'Biotechnology in Industry Fermentation Products', 'Environmental Biotechnology Bioremediation', 'Biosafety Regulations and Guidelines'] },
            { id: 's4', label: 'Biosafety Regulations and Guidelines', prompt: 'Which idea is this? — Biosafety refers to the principles, practices, and containment measures applied.', answer: 'Biosafety Regulations and Guidelines', options: ['Biosafety Regulations and Guidelines', 'Biotechnology in Industry Fermentation Products', 'Environmental Biotechnology Bioremediation', 'Ethical Issues in Biotechnology Bioethics'] },
            { id: 's5', label: 'Intellectual Property Rights and Patents in Biotechnology', prompt: 'Which idea is this? — Intellectual Property Rights (IPR) in biotechnology are legal rights that protect.', answer: 'Intellectual Property Rights and Patents in Biotechnology', options: ['Intellectual Property Rights and Patents in Biotechnology', 'Biotechnology in Industry Fermentation Products', 'Environmental Biotechnology Bioremediation', 'Ethical Issues in Biotechnology Bioethics'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a class field trip to a biotech park you visit three units: a unit making curd cultures and traditional fermented foods, a unit mass-producing penicillin from a Penicillium strain improved by decades of strain selection, and a unit making recombinant insulin in engineered E. coli. Your friend labels all three \'modern biotechnology\' because all use microbes.',
            decisions: [{ prompt: 'Which units are actually \'modern biotechnology\'?', options: [
                { text: 'Only the recombinant insulin unit — modern biotechnology is defined by rDNA technology, i.e., deliberately cutting and rejoining DNA. The curd unit is ancient/classical fermentation and penicillin from a selected (not engineered) strain is classical, even though microbes are used.', outcome: 'The classifier is the technology, not the product: no constructed recombinant DNA means not modern biotechnology.' },
                { text: 'All three — biotechnology means using living organisms for products, and all three use microbes, so all are modern.', outcome: 'That erases the field\'s own history: ancient (domestication), classical (fermentation without genetic manipulation), modern (rDNA). Using a microbe is not the same as engineering its genome.', reveals: 'biotech-equals-genetic-engineering' },
                { text: 'Only the penicillin and insulin units — fermentation of curd is too simple to count as biotechnology at all.', outcome: 'Dahi-making is the classical phase of biotechnology; excluding it shows the definition was memorised as \'high-tech only\' rather than \'processing materials using living systems\'.', reveals: 'fermentation-not-biotech' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_01_011', title: 'You made it',
          caseStudy: { intro: 'Biotechnology is engineering with biology\'s own toolkit — cells become factories once you can edit their code.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_007', difficulty: 'standard',
          question: 'Industrial fermentation is the controlled, large-scale cultivation.',
          hint: 'Review the difference between primary and secondary metabolites using the.',
          misconception: 'Students often believe "fermentation = anaerobic process producing alcohol" because Class 10 defines fermentation.',
          parts: [
                { id: 'a', prompt: 'Name the microorganism and the type of respiration (aerobic/anaerobic) used in the industrial production of (a) ethanol for biofuel, (b) citric acid for food.', answer: 'ethanol for biofuel, (',
                  options: ['ethanol for biofuel, (', 'all use yeast', 'penicillin is anaerobic', 'fermentation = anaerobic process producing alcohol'],
                  hint: 'Review the difference between primary and secondary metabolites using the idiophase/trophophase.',
                  misconception: 'Students often believe "fermentation = anaerobic process producing alcohol" because Class 10 defines fermentation as anaerobic respiration.' }
          ],
            remediations: { 'fermentation-anaerobic-process-producing-alcohol': { steps: ['Revisit Class 10 respiration (c10_bio_cbse_01_007): contrast anaerobic glycolysis (ethanol/lactate) with aerobic TCA.', 'Draw a 2x2 table: rows = primary vs secondary metabolite; columns = aerobic vs anaerobic.', 'Fill with examples: primary aerobic (citric acid, gluconic acid), primary anaerobic (ethanol, lactic acid), secondary.', 'For each quadrant, state the bioreactor implication: oxygen supply, growth phase coupling, nutrient feeding strategy.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "fermentation = anaerobic process producing alcohol" because Class 10 defines fermentation.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Traditional fermented foods (idli, dahi, kinema) are primitive versions of modern industrial fermentation and offer no scientific.', answer: 'Refute',
                  options: ['Refute', 'modern = superior', 'fermentation = anaerobic process producing alcohol', 'the same process strategy works for both'],
                  hint: 'Review the difference between primary and secondary metabolites using the idiophase/trophophase.',
                  misconception: 'Students often believe "fermentation = anaerobic process producing alcohol" because Class 10 defines fermentation as anaerobic respiration.' }
          ],
            remediations: { 'fermentation-anaerobic-process-producing-alcohol': { steps: ['Revisit Class 10 respiration (c10_bio_cbse_01_007): contrast anaerobic glycolysis (ethanol/lactate) with aerobic TCA.', 'Draw a 2x2 table: rows = primary vs secondary metabolite; columns = aerobic vs anaerobic.', 'Fill with examples: primary aerobic (citric acid, gluconic acid), primary anaerobic (ethanol, lactic acid), secondary.', 'For each quadrant, state the bioreactor implication: oxygen supply, growth phase coupling, nutrient feeding strategy.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_008', difficulty: 'standard',
          question: 'Environmental Biotechnology is the application of biotechnological tools.',
          hint: 'Revisit c10_bio_cbse_01_007 (Respiration types) and c9_bio_ch4_6 (Adaptations) to recall.',
          misconception: 'Students believe **phytoremediation simply means "planting trees to clean soil"** and that the contaminants disappear.',
          parts: [
                { id: 'a', prompt: 'Define bioremediation and name one microorganism and one plant used for it, specifying the pollutant each targets.', answer: 'Bioremediation is the use of living organisms to degrade/detoxify pollutants',
                  options: ['Bioremediation is the use of living organisms to degrade/detoxify pollutants', 'using chemicals to clean waste', 'planting trees to clean soil'],
                  hint: 'Revisit c10_bio_cbse_01_007 (Respiration types) and c9_bio_ch4_6 (Adaptations) to recall metabolic.',
                  misconception: 'Students believe **phytoremediation simply means "planting trees to clean soil"** and that the contaminants disappear.' },
                { id: 'b', prompt: 'Compare and contrast microbial bioremediation vs phytoremediation for heavy metal (Pb, Hg, Cd) contamination in terms of: (a) mechanism of action, (b) fate.', answer: 'mechanism of action, (',
                  options: ['mechanism of action, (', 'planting trees to clean soil'],
                  hint: 'Revisit c10_bio_cbse_01_007 (Respiration types) and c9_bio_ch4_6 (Adaptations) to recall metabolic.',
                  misconception: 'Students believe **phytoremediation simply means "planting trees to clean soil"** and that the contaminants disappear.' }
          ],
            remediations: { 'phytoremediation-simply-means-planting-trees': { steps: ['**Clarify terminology**: Create a 2x2 table: Rows = Phytoextraction vs Phytostabilization; Columns = Mechanism.', '**Concrete demonstration**: Show NCERT Fig 1.4 logic: *Brassica napus* for Hg/Pb → harvest shoots → incinerate → ash.', 'Contrast with *Vetiver grass* for erosion/stabilization → no harvest.', '**Address "disappearance" myth**: Mass balance exercise: 1 ha soil with 500 mg/kg Pb → plant uptake 100 kg Pb/ha →.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_009', difficulty: 'standard',
          question: 'Bioethics in biotechnology is the systematic study of ethical.',
          hint: 'If stuck, revisit c11_biotech_cbse_01_005 (Bt cotton mechanism) and.',
          misconception: 'Students equate "bioethics" with "personal moral opinion" or "religious belief," leading them to argue "I feel GMOs are.',
          parts: [
                { id: 'a', prompt: 'A biotech company develops a drought-tolerant GM maize variety and patents the seed. Farmers must sign contracts prohibiting seed saving.', answer: 'Justice requires fair distribution of benefits and burdens',
                  options: ['Justice requires fair distribution of benefits and burdens', 'farmers can choose not to buy'],
                  hint: 'If stuck, revisit c11_biotech_cbse_01_005 (Bt cotton mechanism) and c11_biotech_cbse_01_006.',
                  misconception: 'Students equate "bioethics" with "personal moral opinion" or "religious belief," leading them to argue "I feel GMOs are wrong" or "My.' }
          ],
            remediations: { 'students-equate-bioethics-with-personal': { steps: ['Give the student a 2×2 matrix with the four principles as rows and a concrete case (e.g., gene-drive mosquitoes.', 'Ask them to fill one specific concern per cell—e.g., Autonomy: "Communities cannot opt out of gene drive spread".', 'Have them identify which two principles conflict most sharply and write one sentence justifying which should prevail.', 'Repeat with a second case (e.g., GM mustard) to reinforce that the framework is portable, not case-specific.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_010', difficulty: 'standard',
          question: 'Biosafety refers to the principles, practices, and containment measures applied.',
          hint: 'If stuck, revisit the rDNA technology workflow (Fig 1.1 in NCERT) in node.',
          misconception: 'Students believe "Biosafety Level" is determined *solely* by the pathogenicity of the *wild-type host organism* (e.g.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since *E. coli* K-12 is a Risk Group 1 organism, any recombinant DNA experiment using this host can be performed at BSL-1 without IBSC.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'rDNA technology use', 'Biosafety Level'],
                  hint: 'If stuck, revisit the rDNA technology workflow (Fig 1.1 in NCERT) in node c11_biotech_cbse_01_001.',
                  misconception: 'Students believe "Biosafety Level" is determined *solely* by the pathogenicity of the *wild-type host organism* (e.g., "*E.' }
          ],
            remediations: { 'biosafety-level-is-determined-solely': { steps: ['If a student exhibits this misconception: 1.', '**Show the regulatory text**: Quote DBT Recombinant DNA Safety Guidelines (1990), Section 4.2: "All rDNA work shall.', '**Walk through a counter-example**: "You clone the gene for *Botulinum toxin* into *E.', 'No, it produces a lethal neurotoxin.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_01_011', difficulty: 'standard',
          question: 'Intellectual Property Rights (IPR) in biotechnology are legal rights that.',
          hint: 'If stuck, revisit c11_biotech_cbse_01_005 (GM crops) and c11_biotech_cbse_01_006.',
          misconception: 'Students often believe that "any genetically modified organism is automatically patentable in India." This is false.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Intellectual Property Rights (IPR) in biotechnology are legal rights that protect',
                  options: ['Intellectual Property Rights (IPR) in biotechnology are legal rights that protect', 'Biotechnology is the interdisciplinary application of scientific and engineering', 'Historical Development of Biotechnology is the chronological progression from ancient', 'Traditional biotechnology refers to the historical application of biological processes'],
                  hint: 'If stuck, revisit c11_biotech_cbse_01_005 (GM crops) and c11_biotech_cbse_01_006.',
                  misconception: 'Students often believe that "any genetically modified organism is automatically patentable in India." This is false because: (a) Section.' }
          ],
            remediations: { 'any-genetically-modified-organism-is': { steps: ['If a student holds this misconception, guide them through a three-step correction: (1) Read Section 3(j) of the Patents.', 'a transgenic plant (not patentable under Patents Act)—and identify the statutory basis for each outcome; (3) Work.', 'Union of India* (2013) Supreme Court judgment on Section 3(d) to see how "enhanced efficacy" is interpreted for biotech.', 'Emphasize that patentability is claim-specific: the *method* of making a GM crop may be patented even if the crop.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
