import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch11_p1: SimDef = {
    id: 'v3_c12_biotech_ch11_p1',
    title: 'Biotechnology in Agriculture · Part 1/2',
    subtitle: 'A bacterium that engineers plants for a living — we just hired it.',
    classLevel: 12, subject: 'biotechnology', topic: 'Biotechnology in Agriculture · Part 1/2',
    chapters: ['c12_biotech_ch11'],
    nodeIds: ['c12_biotech_cbse_11_001', 'c12_biotech_cbse_11_002', 'c12_biotech_cbse_11_003', 'c12_biotech_cbse_11_004', 'c12_biotech_cbse_11_005', 'c12_biotech_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Plant transformation specialist', intro: 'Plant cells wear walls that reject DNA — getting a gene inside takes either a natural courier or a gun.', goal: 'Compare Agrobacterium-mediated transformation with biolistic gene delivery.' },
    discovery: {
        question: 'A tumour-like growth on a rose stem turns out to be nature\'s own genetic engineering — a bacterium inserted its DNA into the plant. Which bacterium, and what did it transfer?',
        options: ['Agrobacterium tumefaciens — it transfers T-DNA from its Ti plasmid into the plant genome', 'E. coli — it injects plasmid DNA through its cell wall', 'Rhizobium — it swaps nitrogen-fixation genes with the host', 'A virus — it coats plant cells in foreign protein'],
        answer: 'Agrobacterium tumefaciens — it transfers T-DNA from its Ti plasmid into the plant genome',
        hook: 'Crown gall disease is proof that cross-kingdom gene transfer happens in nature — biotechnology didn\'t invent gene transfer, it domesticated a bacterium that had perfected it millions of years earlier.',
    },
    teaching: [
        { title: 'Transgenic Plants: Overview of Gene Transfer Methods', text: 'Transgenic plants are genetically modified organisms created by introducing foreign DNA (transgenes) into the plant genome using gene transfer methods; the two principal methods are *Agrobacterium.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_11_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'Get a drought-tolerance gene into wheat: choose between Agrobacterium\'s natural T-DNA delivery and the gene gun\'s physical bombardment — matching the method to the plant\'s cell wall and genome.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_001', title: 'Transgenic Plants: Overview of Gene Transfer Methods',
          caseStudy: { intro: 'Imagine you are a plant biotechnologist tasked with creating a drought-tolerant wheat variety. You have the drought-tolerance gene cloned in a plasmid.',
            decisions: [{ prompt: 'Name the two principal gene transfer methods used for creating transgenic plants and state the biological basis of each method in one.', options: [
                { text: 'Correct answer: (1) *Agrobacterium tumefaciens*-mediated transformation', outcome: 'Correct answer: (1) *Agrobacterium tumefaciens*-mediated transformation — utilizes the natural.' },
                { text: 'electroporation and microinjection', outcome: 'Not quite — Students often believe that *Agrobacterium* transfers the entire Ti plasmid into the plant cell.', reveals: 'agrobacterium-transfers-the-entire-ti' },
                { text: '*Agrobacterium* transfers the entire Ti plasmid into the plant cell', outcome: 'Not quite — Students often believe that *Agrobacterium* transfers the entire Ti plasmid into the plant cell.', reveals: 'agrobacterium-transfers-the-entire-ti' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_002', title: 'Agrobacterium-Mediated Transformation Mechanism',
          caseStudy: { intro: 'Imagine you find a tumour-like growth on a rose stem — that is crown gall disease, nature\'s own genetic engineering.',
            decisions: [{ prompt: 'What are the minimal cis-acting elements required on the Ti plasmid for T-DNA transfer into a plant cell, and why are the vir genes not.', options: [
                { text: 'The minimal cis-acting elements are the 25-bp left border (LB) and right border (RB)', outcome: 'The minimal cis-acting elements are the 25-bp left border (LB) and right border (RB) direct repeats.' },
                { text: 'vir genes are cis-acting', outcome: 'Not quite — **Misconception:** "The T-DNA is transferred as double-stranded DNA and integrates via homologous.', reveals: 'misconception-the-t-dna-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_11_003', title: 'Biolistics (Gene Gun) Method for Plant Transformation',
          scaffold: { problem: 'A biolistics experiment uses 0.6 μm gold particles (density 19.3 g/cm³) with a helium pressure of 900 psi.',
            steps: [
            { text: 'Convert pressure to Pascals: 900 psi = 900 × 6894.76 = 6,205,284 Pa.' },
            { text: 'Calculate cross-sectional area of particle: radius = 0.3 μm = 3×10⁻⁷ m; A = πr² = 3.14 × (3×10⁻⁷)² = 2.826×10⁻¹³ m².' },
            { text: 'Calculate force: F = P × A = 6.205×10⁶ × 2.826×10⁻¹³ = 1.753×10⁻⁶ N.' },
            { text: 'Calculate particle volume: V = (4/3)πr³ = (4/3) × 3.14 × (3×10⁻⁷)³ = 1.13×10⁻¹⁹ m³.' },
            { text: 'Calculate mass: m = density × volume = 19300 kg/m³ × 1.13×10⁻¹⁹ = 2.18×10⁻¹⁵ kg.' },
            { text: 'Calculate acceleration: a = F/m = 1.753×10⁻⁶ / 2.18×10⁻¹⁵ = 8.04×10⁸ m/s².' },
            { text: 'Calculate velocity: v = √(2as) = √(2 × 8.04×10⁸ × 0.015) = √(2.412×10⁷) = 4911 m/s.', faded: true, blankAnswer: 'Theoretical velocity ≈ 4910 m/s (actual ~300-500 m/s).' }
            ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_004', title: 'Bt Cotton: cry Gene and Insect Resistance',
          caseStudy: { intro: 'Imagine a cotton farmer in Maharashtra losing 40% of his yield to bollworms despite spraying chemical pesticides 12 times a season.',
            decisions: [{ prompt: 'What is the molecular form of the Cry protein as it is stored in *Bacillus thuringiensis* crystals and initially expressed in Bt cotton.', options: [
                { text: 'The Cry protein is stored and initially expressed as an **inactive protoxin', outcome: 'The Cry protein is stored and initially expressed as an **inactive protoxin (δ-endotoxin)**.' },
                { text: 'active toxin of 65 kDa', outcome: 'Not quite — **Misconception**: "Bt cotton kills all insects, including beneficial ones like bees and ladybird.', reveals: 'misconception-bt-cotton-kills-all' },
                { text: 'insecticidal', outcome: 'Not quite — **Misconception**: "Bt cotton kills all insects, including beneficial ones like bees and ladybird.', reveals: 'misconception-bt-cotton-kills-all' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_005', title: 'Golden Rice: beta-Carotene Pathway Engineering',
          caseStudy: { intro: 'Imagine a child in a rice-dependent region suffering from night blindness due to vitamin A deficiency.',
            decisions: [{ prompt: 'What are the two transgenes introduced into Golden Rice and from which organisms were they originally isolated in GR1?', options: [
                { text: 'The two transgenes are *psy* (phytoene synthase) from daffodil (*Narcissus', outcome: 'The two transgenes are *psy* (phytoene synthase) from daffodil (*Narcissus pseudonarcissus*) and.' },
                { text: '*crtB* or *crtY* or saying both genes are from daffodil', outcome: 'Not quite — Students often think Golden Rice makes vitamin A (retinol) directly in the grain.', reveals: 'golden-rice-makes-vitamin-a' },
                { text: 'Golden Rice makes vitamin A (retinol) directly in the grain', outcome: 'Not quite — Students often think Golden Rice makes vitamin A (retinol) directly in the grain.', reveals: 'golden-rice-makes-vitamin-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_006', title: 'Herbicide-Resistant Crops: Mechanism and Examples',
          caseStudy: { intro: 'Imagine a farmer spraying a field with glyphosate (Roundup) — every plant dies except the crop.',
            decisions: [{ prompt: 'What is the primary biochemical target of glyphosate in plants, and which enzyme does the CP4 EPSPS transgene encode?', options: [
                { text: 'Glyphosate targets 5-enolpyruvylshikimate-3-phosphate synthase (EPSPS) in the shikimate', outcome: 'Glyphosate targets 5-enolpyruvylshikimate-3-phosphate synthase (EPSPS) in the shikimate pathway.' },
                { text: 'glyphosate targets glutamine synthetase', outcome: 'Not quite — Students believe "herbicide resistance means the plant breaks down the herbicide" for ALL.', reveals: 'herbicide-resistance-means-the-plant' },
                { text: 'CP4 EPSPS degrades glyphosate', outcome: 'Not quite — Students believe "herbicide resistance means the plant breaks down the herbicide" for ALL.', reveals: 'herbicide-resistance-means-the-plant' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_11_002', title: 'Identify each idea',
          dissect: { specimen: 'Biotechnology in Agriculture · Part 1/2', spots: [
            { id: 's1', label: 'Transgenic Plants Overview of Gene Transfer Methods', prompt: 'Which idea is this? — Transgenic plants are genetically modified organisms created by introducing foreign DNA.', answer: 'Transgenic Plants Overview of Gene Transfer Methods', options: ['Transgenic Plants Overview of Gene Transfer Methods', 'Agrobacterium-Mediated Transformation Mechanism', 'Biolistics Gene Gun Method for Plant Transformation', 'Bt Cotton cry Gene and Insect Resistance'] },
            { id: 's2', label: 'Agrobacterium-Mediated Transformation Mechanism', prompt: 'Which idea is this? — Agrobacterium-mediated transformation is a natural gene transfer mechanism where.', answer: 'Agrobacterium-Mediated Transformation Mechanism', options: ['Agrobacterium-Mediated Transformation Mechanism', 'Transgenic Plants Overview of Gene Transfer Methods', 'Biolistics Gene Gun Method for Plant Transformation', 'Bt Cotton cry Gene and Insect Resistance'] },
            { id: 's3', label: 'Biolistics Gene Gun Method for Plant Transformation', prompt: 'Which idea is this? — Biolistics (Gene Gun) is a physical method of plant transformation where microscopic gold.', answer: 'Biolistics Gene Gun Method for Plant Transformation', options: ['Biolistics Gene Gun Method for Plant Transformation', 'Transgenic Plants Overview of Gene Transfer Methods', 'Agrobacterium-Mediated Transformation Mechanism', 'Bt Cotton cry Gene and Insect Resistance'] },
            { id: 's4', label: 'Bt Cotton cry Gene and Insect Resistance', prompt: 'Which idea is this? — Bt cotton is a genetically modified cotton variety that expresses insecticidal crystal.', answer: 'Bt Cotton cry Gene and Insect Resistance', options: ['Bt Cotton cry Gene and Insect Resistance', 'Transgenic Plants Overview of Gene Transfer Methods', 'Agrobacterium-Mediated Transformation Mechanism', 'Biolistics Gene Gun Method for Plant Transformation'] },
            { id: 's5', label: 'Golden Rice beta-Carotene Pathway Engineering', prompt: 'Which idea is this? — Golden Rice is a genetically engineered rice variety that produces β-carotene (provitamin.', answer: 'Golden Rice beta-Carotene Pathway Engineering', options: ['Golden Rice beta-Carotene Pathway Engineering', 'Transgenic Plants Overview of Gene Transfer Methods', 'Agrobacterium-Mediated Transformation Mechanism', 'Biolistics Gene Gun Method for Plant Transformation'] },
            { id: 's6', label: 'Herbicide-Resistant Crops Mechanism and Examples', prompt: 'Which idea is this? — Herbicide-resistant crops are genetically modified plants engineered to survive the.', answer: 'Herbicide-Resistant Crops Mechanism and Examples', options: ['Herbicide-Resistant Crops Mechanism and Examples', 'Transgenic Plants Overview of Gene Transfer Methods', 'Agrobacterium-Mediated Transformation Mechanism', 'Biolistics Gene Gun Method for Plant Transformation'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_001', title: 'A real-world call',
          caseStudy: { intro: 'Agricultural biotechnology can grow more food on less land with less water — and concentrates seed ownership in a few companies who control what farmers plant.',
            decisions: [{ prompt: 'Is feeding more people worth concentrating control of food?', options: [
                { text: 'Yes — hunger is the emergency, ownership is secondary', outcome: 'The food-security answer; true until the concentrated ownership itself creates the next emergency.' },
                { text: 'No — who controls seeds controls everything after', outcome: 'The sovereignty answer; refusing the technology has costs too — yields that don\'t rise as populations do.' },
                { text: 'Yes with public seeds — the tech in public hands', outcome: 'The structural answer — public-sector breeding keeps the yield without the lock; requires funding public research adequately.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At an agri-biotech internship, the team must put a drought-tolerance gene into wheat. A colleague insists on Agrobacterium-mediated transformation because \'it always gives clean, single-copy inserts\' — but weeks of co-cultivation keep failing.',
            decisions: [{ prompt: 'How should they deliver the gene?', options: [
                { text: 'Switch to biolistics — wheat is a monocot that poorly induces Agrobacterium\'s vir genes, so the gene gun\'s physical DNA delivery bypasses the host-range barrier, accepting messier, multi-copy inserts as the trade-off.', outcome: 'Agrobacterium\'s clean T-DNA transfer is preferred for dicots; monocots\' weak wound response makes particle bombardment the practical route.' },
                { text: 'Persist with Agrobacterium — it always produces single-copy inserts and single copy is what regulators demand.', outcome: 'The biological block isn\'t about insert quality — monocots barely trigger vir induction, so T-DNA transfer barely happens; biolistics exists precisely for this.', reveals: 'agrobacterium-always-works' },
                { text: 'Agrobacterium injects its whole Ti plasmid into the plant, so moving the gene to a different spot on the plasmid will fix it.', outcome: 'Only the T-DNA segment between the border repeats is transferred; the vir genes and backbone stay in the bacterium — repositioning outside the borders won\'t help.', reveals: 'whole-ti-plasmid-transfers' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now know the two roads into a plant genome — biological courier and particle gun. Gene transfer methods are standard board fare and the first real choice in any crop-engineering project.',
            decisions: [{ prompt: 'What comes next? Biotechnology in Agriculture · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Biotechnology in Agriculture · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_001', difficulty: 'standard',
          question: 'Transgenic plants are genetically modified organisms created by introducing.',
          hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) and.',
          misconception: 'Students often believe that *Agrobacterium* transfers the entire Ti plasmid into the plant cell.',
          parts: [
                { id: 'a', prompt: 'Name the two principal gene transfer methods used for creating transgenic plants and state the biological basis of each method in one sentence.', answer: 'Correct answer: (1) *Agrobacterium tumefaciens*-mediated transformation',
                  options: ['Correct answer: (1) *Agrobacterium tumefaciens*-mediated transformation', 'electroporation and microinjection', '*Agrobacterium* transfers the entire Ti plasmid into the plant cell'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) and practice.',
                  misconception: 'Students often believe that *Agrobacterium* transfers the entire Ti plasmid into the plant cell.' }
          ],
            remediations: { 'agrobacterium-transfers-the-entire-ti': { steps: ['If a student cannot distinguish T-DNA from the whole Ti plasmid: (1) Have them draw the Ti plasmid map labeling T-DNA.', '(2) Walk through the molecular steps: wound phenolics → VirA/VirG two-component system → *vir* gene expression →.', '(3) Give a binary vector diagram and ask them to circle the region that enters the plant.', '(4) Re-test with a diagnostic: "A binary vector has the gene of interest between LB and RB, but the *nptII* marker.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that *Agrobacterium* transfers the entire Ti plasmid into the plant cell.',
          parts: [
                { id: 'a', prompt: 'Critique the following statement: "For commercial transgenic crop development, *Agrobacterium* transformation should always be used because it gives.', answer: 'Correct evaluation: The statement is an oversimplification',
                  options: ['Correct evaluation: The statement is an oversimplification', '*Agrobacterium* transfers the entire Ti plasmid into the plant cell'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) and practice.',
                  misconception: 'Students often believe that *Agrobacterium* transfers the entire Ti plasmid into the plant cell.' },
                { id: 'b', prompt: 'Design a minimal binary vector map (describe components in order) for *Agrobacterium*-mediated transformation of tomato with a fruit-specific promoter driving.', answer: 'Expected answer (components in order on T-DNA): Left Border (LB)',
                  options: ['Expected answer (components in order on T-DNA): Left Border (LB)', '*Agrobacterium* transfers the entire Ti plasmid into the plant cell'],
                  hint: 'Revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) and practice.',
                  misconception: 'Students often believe that *Agrobacterium* transfers the entire Ti plasmid into the plant cell.' }
          ],
            remediations: { 'agrobacterium-transfers-the-entire-ti': { steps: ['If a student cannot distinguish T-DNA from the whole Ti plasmid: (1) Have them draw the Ti plasmid map labeling T-DNA.', '(2) Walk through the molecular steps: wound phenolics → VirA/VirG two-component system → *vir* gene expression →.', '(3) Give a binary vector diagram and ask them to circle the region that enters the plant.', '(4) Re-test with a diagnostic: "A binary vector has the gene of interest between LB and RB, but the *nptII* marker.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_002', difficulty: 'standard',
          question: 'Agrobacterium-mediated transformation is a natural gene transfer mechanism.',
          hint: 'If stuck on vector construction, revisit c11_biotech_cbse_12_007 (restriction enzymes).',
          misconception: '**Misconception:** "The T-DNA is transferred as double-stranded DNA and integrates via homologous recombination." **Why.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the binary vector system and the co-integrate vector system for *Agrobacterium*-mediated transformation in terms of plasmid structure.', answer: '| Feature | Binary Vector System | Co-integrate Vector System |',
                  options: ['| Feature | Binary Vector System | Co-integrate Vector System |', 'binary vector uses recombination'],
                  hint: 'If stuck on vector construction, revisit c11_biotech_cbse_12_007 (restriction enzymes) and.',
                  misconception: '**Misconception:** "The T-DNA is transferred as double-stranded DNA and integrates via homologous recombination." **Why it\'s wrong:** T-DNA.' }
          ],
            remediations: { 'misconception-the-t-dna-is': { steps: ['** Show the VirD1/D2 nicking reaction at RB and LB — only one strand is nicked at each border.', '** Explain leading-strand synthesis: VirD2 remains covalently bound to 5\' end of nicked strand; DNA polymerase extends.', '** Demonstrate VirE2 coating the T-strand and VirD2 providing NLS for nuclear import — this is a protein-DNA complex.', '** Contrast NHEJ (random, microhomology-mediated) vs. homologous recombination (requires long homology arms, rare.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_003', difficulty: 'standard',
          question: 'Biolistics (Gene Gun) is a physical method of plant transformation where.',
          hint: 'Review plasmid DNA isolation (c11_biotech_cbse_12_008) and kinematics equations.',
          misconception: 'Students often think biolistics simply \'shoots DNA into cells\' without understanding the critical role of particle.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Biolistics (Gene Gun) is a physical method of plant transformation where microscopic gold',
                  options: ['Biolistics (Gene Gun) is a physical method of plant transformation where microscopic gold', 'Transgenic plants are genetically modified organisms created by introducing foreign DNA', 'Agrobacterium-mediated transformation is a natural gene transfer mechanism where', 'Bt cotton is a genetically modified cotton variety that expresses insecticidal crystal'],
                  hint: 'Review plasmid DNA isolation (c11_biotech_cbse_12_008) and kinematics equations.',
                  misconception: 'Students often think biolistics simply \'shoots DNA into cells\' without understanding the critical role of particle coating chemistry.' }
          ],
            remediations: { 'biolistics-simply-shoots-dna-into': { steps: ['If a student cannot explain the coating chemistry, have them revisit the precipitation reaction: DNA + Ca²⁺.', 'Use c11_biotech_cbse_12_008 (Recombinant DNA Technology: Vectors and Cloning) to review plasmid preparation.', 'Then re-diagnose with DIAGNOSTIC_QUESTION_2.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_004', difficulty: 'standard',
          question: 'Bt cotton is a genetically modified cotton variety that expresses insecticidal.',
          hint: 'If stuck, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology) and.',
          misconception: '**Misconception**: "Bt cotton kills all insects, including beneficial ones like bees and ladybird beetles." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'What is the molecular form of the Cry protein as it is stored in *Bacillus thuringiensis* crystals and initially expressed in Bt cotton plants, and what is its.', answer: 'The Cry protein is stored and initially expressed as an **inactive protoxin',
                  options: ['The Cry protein is stored and initially expressed as an **inactive protoxin', 'active toxin of 65 kDa', 'insecticidal', 'broad-spectrum'],
                  hint: 'If stuck, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology) and c11_biotech_cbse_07_007.',
                  misconception: '**Misconception**: "Bt cotton kills all insects, including beneficial ones like bees and ladybird beetles." **Why it\'s wrong**: Cry.' },
                { id: 'b', prompt: 'A farmer plants Bt cotton expressing *cry1Ac* but notices increasing bollworm survival after 5 years.', answer: 'Pyramid *cry1Ac* with **cry2Ab** (or *cry1F*)',
                  options: ['Pyramid *cry1Ac* with **cry2Ab** (or *cry1F*)', 'insecticidal', 'broad-spectrum'],
                  hint: 'If stuck, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology) and c11_biotech_cbse_07_007.',
                  misconception: '**Misconception**: "Bt cotton kills all insects, including beneficial ones like bees and ladybird beetles." **Why it\'s wrong**: Cry.' },
                { id: 'c', prompt: 'Compare the receptor-binding step of Cry1Ac and Cry2Ab toxins in lepidopteran midgut cells.', answer: 'Cry1Ac binds primarily to **cadherin-like proteins (CaLP)** and secondarily to',
                  options: ['Cry1Ac binds primarily to **cadherin-like proteins (CaLP)** and secondarily to', 'both bind to the same receptor', 'insecticidal', 'broad-spectrum'],
                  hint: 'If stuck, revisit c11_biotech_cbse_12_008 (Recombinant DNA Technology) and c11_biotech_cbse_07_007.',
                  misconception: '**Misconception**: "Bt cotton kills all insects, including beneficial ones like bees and ladybird beetles." **Why it\'s wrong**: Cry.' }
          ],
            remediations: { 'misconception-bt-cotton-kills-all': { steps: ['If a student holds this misconception: 1.', '**Revisit receptor specificity**: Have them compare midgut pH (lepidopteran ~10 vs.', 'honeybee ~6.5) and list known Cry receptors (cadherin, APN, ALP, ABCC2) — ask: "Are these receptors found in bee midgut.', '**Analyze protease activation**: Show that bovine trypsin (used in lab activation) mimics lepidopteran proteases but.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_005', difficulty: 'standard',
          question: 'Golden Rice is a genetically engineered rice variety that produces β-carotene.',
          hint: 'Revisit c12_biotech_cbse_11_002 (Agrobacterium mechanism) and c11_biotech_cbse_12_008.',
          misconception: 'Students often think Golden Rice makes vitamin A (retinol) directly in the grain.',
          parts: [
                { id: 'a', prompt: 'What are the two transgenes introduced into Golden Rice and from which organisms were they originally isolated in GR1?', answer: 'The two transgenes are *psy* (phytoene synthase) from daffodil (*Narcissus',
                  options: ['The two transgenes are *psy* (phytoene synthase) from daffodil (*Narcissus', '*crtB* or *crtY* or saying both genes are from daffodil', 'Golden Rice makes vitamin A (retinol) directly in the grain'],
                  hint: 'Revisit c12_biotech_cbse_11_002 (Agrobacterium mechanism) and c11_biotech_cbse_12_008 (recombinant.',
                  misconception: 'Students often think Golden Rice makes vitamin A (retinol) directly in the grain.' },
                { id: 'b', prompt: 'Compare the β-carotene levels in GR1 and GR2. What specific change in the *psy* gene source caused the increase, and why does that change improve flux?', answer: 'GR1 (daffodil *psy*) produced ~1.6 µg/g β-carotene',
                  options: ['GR1 (daffodil *psy*) produced ~1.6 µg/g β-carotene', 'stronger promoter', 'better transformation', 'Golden Rice makes vitamin A (retinol) directly in the grain'],
                  hint: 'Revisit c12_biotech_cbse_11_002 (Agrobacterium mechanism) and c11_biotech_cbse_12_008 (recombinant.',
                  misconception: 'Students often think Golden Rice makes vitamin A (retinol) directly in the grain.' }
          ],
            remediations: { 'golden-rice-makes-vitamin-a': { steps: ['If a student writes “Golden Rice produces vitamin A” or cannot name both genes and their sources: (1) Have them draw.', '(2) Ask them to highlight which steps are catalysed by transgenes vs.', '(3) Give a fill-in table: Gene | Source | Enzyme | Substrate → Product.', '(4) Re-test with a diagnostic question: “Which enzyme cleaves β-carotene to retinal in humans?” to reinforce the.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_11_006', difficulty: 'standard',
          question: 'Herbicide-resistant crops are genetically modified plants engineered to survive.',
          hint: 'If stuck, revisit c11_bio_cbse_09_006 (Enzyme Kinetics) for inhibition concepts and.',
          misconception: 'Students believe "herbicide resistance means the plant breaks down the herbicide" for ALL herbicide-resistant crops.',
          parts: [
                { id: 'a', prompt: 'A researcher constructs a glyphosate-resistance cassette using the native plant EPSPS promoter instead of a constitutive promoter.', answer: 'The plant will likely show partial or no resistance',
                  options: ['The plant will likely show partial or no resistance', 'it will work fine', 'herbicide resistance means the plant breaks down the herbicide'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_006 (Enzyme Kinetics) for inhibition concepts and.',
                  misconception: 'Students believe "herbicide resistance means the plant breaks down the herbicide" for ALL herbicide-resistant crops.' },
                { id: 'b', prompt: 'Compare the resistance evolution risk in weeds for glyphosate-resistant (Roundup Ready) vs.', answer: 'Glyphosate resistance evolves faster',
                  options: ['Glyphosate resistance evolves faster', 'both have equal risk', 'herbicide resistance means the plant breaks down the herbicide'],
                  hint: 'If stuck, revisit c11_bio_cbse_09_006 (Enzyme Kinetics) for inhibition concepts and.',
                  misconception: 'Students believe "herbicide resistance means the plant breaks down the herbicide" for ALL herbicide-resistant crops.' }
          ],
            remediations: { 'herbicide-resistance-means-the-plant': { steps: ['Revisit c12_biotech_cbse_11_001 (Transgenic Plants overview) to recall that transgenes can confer traits via different.', 'Draw a two-column table: Column A = Herbicide (Glyphosate, Glufosinate); Column B = Mechanism (Target-site.', 'Watch a 5-min animation of glyphosate binding EPSPS active site vs. PAT acetylating glufosinate.', 'Re-attempt Diagnostic Question 1 and 2; if still wrong, re-read the WALKTHROUGH focusing on the "lock vs. key" analogy.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
