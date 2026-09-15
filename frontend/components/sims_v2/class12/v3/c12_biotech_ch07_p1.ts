import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch07_p1: SimDef = {
    id: 'v3_c12_biotech_ch07_p1',
    title: 'Plant Tissue Culture Applications · Part 1/2',
    subtitle: '50,000 identical banana plants from one shoot tip — cloning at industrial scale.',
    classLevel: 12, subject: 'biotechnology', topic: 'Plant Tissue Culture Applications · Part 1/2',
    chapters: ['c12_biotech_ch07'],
    nodeIds: ['c12_biotech_cbse_07_001', 'c12_biotech_cbse_07_002', 'c12_biotech_cbse_07_003', 'c12_biotech_cbse_07_004', 'c12_biotech_cbse_07_005', 'c12_biotech_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Tissue-culture entrepreneur', intro: 'When a crop can\'t seed and cuttings carry disease, the lab becomes the nursery — here\'s the assembly line.', goal: 'Describe the stages of micropropagation and the construction of synthetic seeds.' },
    discovery: {
        question: 'A farmer needs 50,000 disease-free \'Grand Naine\' banana plants by next season — suckers are scarce and carry viruses. Which technology delivers?',
        options: ['Micropropagation — shoot tips multiplied through staged in vitro culture into thousands of identical plantlets', 'Grafting — joining banana stems to disease-free rootstocks', 'Seed propagation — planting 50,000 banana seeds from the fruit', 'Selective breeding — crossing varieties over several generations for uniformity'],
        answer: 'Micropropagation — shoot tips multiplied through staged in vitro culture into thousands of identical plantlets',
        hook: 'Bananas barely make viable seeds and suckers inherit every virus — so the answer isn\'t breeding at all. Staged culture (Stage 0 to IV) clones clean plants faster than any field method.',
    },
    teaching: [
        { title: 'Micropropagation: Stages and Commercial Advantages', text: 'Micropropagation is an in vitro plant tissue culture technique for rapid clonal multiplication of genetically identical plants (clones) through a defined sequence of stages: Stage 0 (mother plant.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_07_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Run a micropropagation pipeline: take a banana shoot tip through establishment, multiplication, rooting and hardening — then package elite sandalwood as synthetic seeds that survive a courier box.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_001', title: 'Micropropagation: Stages and Commercial Advantages',
          caseStudy: { intro: 'Imagine a banana farmer in Maharashtra who needs 50,000 disease-free, uniform plants of the \'Grand Naine\' variety for the next planting season — but suckers.',
            decisions: [{ prompt: 'What is the correct sequence of the five stages of micropropagation from mother plant to field-ready plantlet?', options: [
                { text: 'Stage 0 (Mother plant selection & preparation) → Stage I (Aseptic establishment of', outcome: 'Stage 0 (Mother plant selection & preparation) → Stage I (Aseptic establishment of explant) → Stage.' },
                { text: 'micropropagation creates GMOs', outcome: 'Not quite — **Misconception:** "Micropropagation produces genetically modified plants because it uses.', reveals: 'misconception-micropropagation-produces-genetica' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_002', title: 'Synthetic Seeds: Production, Encapsulation, and Storage',
          caseStudy: { intro: 'Imagine you are a horticulturist trying to ship a rare, elite sandalwood variety to farmers across India.',
            decisions: [{ prompt: 'What is the primary gelling agent used for synthetic seed encapsulation and what ionic crosslinker converts it into a solid bead?', options: [
                { text: 'The primary gelling agent is sodium alginate (a polysaccharide from brown algae) and the', outcome: 'The primary gelling agent is sodium alginate (a polysaccharide from brown algae) and the.' },
                { text: 'somatic embryos wrapped in alginate', outcome: 'Not quite — Students often think synthetic seeds are simply “somatic embryos wrapped in alginate” and that the.', reveals: 'synthetic-seeds-are-simply-somatic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_003', title: 'Somaclonal Variation: Causes and Agricultural Uses',
          caseStudy: { intro: 'Imagine a banana farmer who uses tissue culture to produce thousands of identical disease-free plantlets, but after a few seasons notices some plants showing.',
            decisions: [{ prompt: 'Define somaclonal variation and state the term used for plants regenerated from tissue culture that exhibit such variation.', options: [
                { text: 'Somaclonal variation is the genetic and phenotypic variation observed in plants', outcome: 'Somaclonal variation is the genetic and phenotypic variation observed in plants regenerated from.' },
                { text: 'variation from sexual reproduction', outcome: 'Not quite — Students often believe somaclonal variation is intentionally induced by adding mutagens to the.', reveals: 'somaclonal-variation-is-intentionally-induced' },
                { text: 'mutation induced by chemicals', outcome: 'Not quite — Students often believe somaclonal variation is intentionally induced by adding mutagens to the.', reveals: 'somaclonal-variation-is-intentionally-induced' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_004', title: 'Virus-Free Plant Production via Meristem Culture',
          caseStudy: { intro: 'Imagine a banana farmer in Maharashtra whose entire plantation shows bunchy top disease caused by a virus — every sucker she plants carries the virus because.',
            decisions: [{ prompt: 'What is the typical size range of the meristem explant used for virus elimination, and why is this size critical?', options: [
                { text: 'The typical size is 0.1–1.0 mm (often 0.2–0.5 mm)', outcome: 'The typical size is 0.1–1.0 mm (often 0.2–0.5 mm). This size is critical because it usually.' },
                { text: '2–5 mm', outcome: 'Not quite — Students often think "meristem culture" means culturing the entire shoot tip (several mm long) and.', reveals: 'meristem-culture-means-culturing-the' },
                { text: 'any size works', outcome: 'Not quite — Students often think "meristem culture" means culturing the entire shoot tip (several mm long) and.', reveals: 'meristem-culture-means-culturing-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_005', title: 'Embryo Rescue: Technique and Applications in Breeding',
          caseStudy: { intro: 'Imagine a wheat breeder trying to transfer rust resistance from a wild grass relative (Aegilops) into cultivated wheat.',
            decisions: [{ prompt: 'What is the primary biological barrier that embryo rescue overcomes in wide hybridization?', options: [
                { text: 'Embryo rescue overcomes post-zygotic embryo abortion caused by endosperm failure or', outcome: 'Embryo rescue overcomes post-zygotic embryo abortion caused by endosperm failure or maternal–embryo.' },
                { text: 'pollen tube growth failure', outcome: 'Not quite — Students often believe embryo rescue "creates" hybrids that cannot form naturally.', reveals: 'embryo-rescue-creates-hybrids-that' },
                { text: 'creates', outcome: 'Not quite — Students often believe embryo rescue "creates" hybrids that cannot form naturally.', reveals: 'embryo-rescue-creates-hybrids-that' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_006', title: 'Haploid Production through Anther and Pollen Culture',
          caseStudy: { intro: 'Imagine you are a plant breeder trying to develop a new wheat variety with disease resistance and high yield.',
            decisions: [{ prompt: 'Define androgenesis in the context of plant tissue culture and state the ploidy level of the plants produced directly from anther culture.', options: [
                { text: 'Androgenesis is the in vitro development of haploid plants from male gametophytic cells', outcome: 'Androgenesis is the in vitro development of haploid plants from male gametophytic cells.' },
                { text: 'diploid', outcome: 'Not quite — Students believe that haploid plants produced from anther culture are directly usable as crop.', reveals: 'haploid-plants-produced-from-anther' },
                { text: 'polyploid', outcome: 'Not quite — Students believe that haploid plants produced from anther culture are directly usable as crop.', reveals: 'haploid-plants-produced-from-anther' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_07_002', title: 'Identify each idea',
          dissect: { specimen: 'Plant Tissue Culture Applications · Part 1/2', spots: [
            { id: 's1', label: 'Micropropagation Stages and Commercial Advantages', prompt: 'Which idea is this? — Micropropagation is an in vitro plant tissue culture technique for rapid clonal.', answer: 'Micropropagation Stages and Commercial Advantages', options: ['Micropropagation Stages and Commercial Advantages', 'Synthetic Seeds Production Encapsulation and Storage', 'Somaclonal Variation Causes and Agricultural Uses', 'Virus-Free Plant Production via Meristem Culture'] },
            { id: 's2', label: 'Synthetic Seeds Production Encapsulation and Storage', prompt: 'Which idea is this? — Synthetic seeds are artificially encapsulated somatic embryos (or other meristematic.', answer: 'Synthetic Seeds Production Encapsulation and Storage', options: ['Synthetic Seeds Production Encapsulation and Storage', 'Micropropagation Stages and Commercial Advantages', 'Somaclonal Variation Causes and Agricultural Uses', 'Virus-Free Plant Production via Meristem Culture'] },
            { id: 's3', label: 'Somaclonal Variation Causes and Agricultural Uses', prompt: 'Which idea is this? — Somaclonal variation refers to the genetic and phenotypic variations observed in plants.', answer: 'Somaclonal Variation Causes and Agricultural Uses', options: ['Somaclonal Variation Causes and Agricultural Uses', 'Micropropagation Stages and Commercial Advantages', 'Synthetic Seeds Production Encapsulation and Storage', 'Virus-Free Plant Production via Meristem Culture'] },
            { id: 's4', label: 'Virus-Free Plant Production via Meristem Culture', prompt: 'Which idea is this? — Virus-free plant production via meristem culture is an in vitro technique where the.', answer: 'Virus-Free Plant Production via Meristem Culture', options: ['Virus-Free Plant Production via Meristem Culture', 'Micropropagation Stages and Commercial Advantages', 'Synthetic Seeds Production Encapsulation and Storage', 'Somaclonal Variation Causes and Agricultural Uses'] },
            { id: 's5', label: 'Embryo Rescue Technique and Applications in Breeding', prompt: 'Which idea is this? — Embryo rescue is an in vitro plant tissue culture technique where immature or hybrid.', answer: 'Embryo Rescue Technique and Applications in Breeding', options: ['Embryo Rescue Technique and Applications in Breeding', 'Micropropagation Stages and Commercial Advantages', 'Synthetic Seeds Production Encapsulation and Storage', 'Somaclonal Variation Causes and Agricultural Uses'] },
            { id: 's6', label: 'Haploid Production through Anther and Pollen Culture', prompt: 'Which idea is this? — Haploid production through anther and pollen culture (androgenesis) is a plant tissue.', answer: 'Haploid Production through Anther and Pollen Culture', options: ['Haploid Production through Anther and Pollen Culture', 'Micropropagation Stages and Commercial Advantages', 'Synthetic Seeds Production Encapsulation and Storage', 'Somaclonal Variation Causes and Agricultural Uses'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A nursery intern is asked to run the shoot-multiplication stage for banana plantlets. The medium she prepares is rich in auxin but low in cytokinin — and the cultures keep sprouting roots instead of multiplying shoots.',
            decisions: [{ prompt: 'What went wrong, and what\'s the fix?', options: [
                { text: 'The hormone ratio is inverted: shoot multiplication (Stage II) needs high cytokinin:auxin; a high auxin:cytokinin mix triggers rooting — that\'s Stage III\'s job.', outcome: 'Skoog–Miller logic runs the whole protocol: cytokinin-heavy drives shoots, auxin-heavy drives roots, and hardening uses none — matching stage to ratio fixes it.' },
                { text: 'Nothing — auxin is the shoot hormone, so the shoots will multiply once the dose kicks in.', outcome: 'That\'s the classic swap: auxin promotes rooting and callus; cytokinin is what pushes shoot buds to proliferate.', reveals: 'auxin-for-shoots' },
                { text: 'The cultures failed because micropropagation genetically modifies the plant and the cells are rejecting the foreign genes.', outcome: 'No foreign DNA is inserted — micropropagation is clonal vegetative propagation; hormones only redirect expression of existing genes.', reveals: 'microprop-is-gmo' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You\'ve industrialised a plant — clones at scale, shipped as alginate-bead \'seeds\'. Micropropagation stages and synthetic seeds are board favourites and a real agri-business model.',
            decisions: [{ prompt: 'What comes next? Plant Tissue Culture Applications · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Plant Tissue Culture Applications · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_07_001', difficulty: 'standard',
          question: 'Micropropagation is an in vitro plant tissue culture technique for rapid clonal.',
          hint: 'If stuck on hormone logic, re-watch the auxin/cytokinin interaction animation.',
          misconception: '**Misconception:** "Micropropagation produces genetically modified plants because it uses artificial media and.',
          parts: [
                { id: 'a', prompt: 'A student writes: "In Stage II of micropropagation, we add high auxin to promote shoot proliferation." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'micropropagation creates GMOs'],
                  hint: 'If stuck on hormone logic, re-watch the auxin/cytokinin interaction animation.',
                  misconception: '**Misconception:** "Micropropagation produces genetically modified plants because it uses artificial media and hormones." **Why it\'s.' },
                { id: 'b', prompt: 'A tissue culture lab prepares 5 L of Stage II multiplication medium for banana.', answer: '**Step 1:** Total BAP needed = 2 mg/L × 5 L = 10 mg',
                  options: ['**Step 1:** Total BAP needed = 2 mg/L × 5 L = 10 mg', 'micropropagation creates GMOs'],
                  hint: 'If stuck on hormone logic, re-watch the auxin/cytokinin interaction animation.',
                  misconception: '**Misconception:** "Micropropagation produces genetically modified plants because it uses artificial media and hormones." **Why it\'s.' },
                { id: 'c', prompt: 'Compare micropropagation and conventional vegetative propagation (cuttings) for a woody perennial crop like teak (Tectona grandis) on these parameters: (a).', answer: '| Parameter | Micropropagation | Conventional Cuttings |',
                  options: ['| Parameter | Micropropagation | Conventional Cuttings |', 'micropropagation creates GMOs'],
                  hint: 'If stuck on hormone logic, re-watch the auxin/cytokinin interaction animation.',
                  misconception: '**Misconception:** "Micropropagation produces genetically modified plants because it uses artificial media and hormones." **Why it\'s.' }
          ],
            remediations: { 'misconception-micropropagation-produces-genetica': { steps: ['**Revisit totipotency:** Go to c11_biotech_cbse_12_011 (Cell Culture: Animal and Plant Cell Culture Techniques) and.', '**Hormone ratio drill:** Draw a 2×2 table: High Cytokinin/Low Auxin → Shoots; Low Cytokinin/High Auxin → Roots.', 'Memorize this logic, not individual concentrations.', '**Redo Diagnostic Q2 & Q3:** Write the correct hormone ratio statement 3 times, then solve a fresh media calculation.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Micropropagation produces genetically modified plants because it uses artificial media and.',
          parts: [
                { id: 'a', prompt: 'A commercial lab claims: "Our Stage IV hardening protocol uses 100% humidity for 4 weeks, then direct field transfer." Evaluate this claim.', answer: 'The claim is **unsound**',
                  options: ['The claim is **unsound**', 'high humidity is good for survival', 'micropropagation creates GMOs'],
                  hint: 'If stuck on hormone logic, re-watch the auxin/cytokinin interaction animation.',
                  misconception: '**Misconception:** "Micropropagation produces genetically modified plants because it uses artificial media and hormones." **Why it\'s.' }
          ],
            remediations: { 'misconception-micropropagation-produces-genetica': { steps: ['**Revisit totipotency:** Go to c11_biotech_cbse_12_011 (Cell Culture: Animal and Plant Cell Culture Techniques) and.', '**Hormone ratio drill:** Draw a 2×2 table: High Cytokinin/Low Auxin → Shoots; Low Cytokinin/High Auxin → Roots.', 'Memorize this logic, not individual concentrations.', '**Redo Diagnostic Q2 & Q3:** Write the correct hormone ratio statement 3 times, then solve a fresh media calculation.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_07_002', difficulty: 'standard',
          question: 'Synthetic seeds are artificially encapsulated somatic embryos (or other.',
          hint: 'Revisit the somatic embryogenesis section in the micropropagation node.',
          misconception: 'Students often think synthetic seeds are simply “somatic embryos wrapped in alginate” and that the bead itself provides.',
          parts: [
                { id: 'a', prompt: 'A lab encapsulates 200 somatic embryos in 2% (w/v) sodium alginate dropped into 50 mM CaCl₂.', answer: 'Conversion frequency = (160/200) × 100 = 80%',
                  options: ['Conversion frequency = (160/200) × 100 = 80%', 'somatic embryos wrapped in alginate'],
                  hint: 'Revisit the somatic embryogenesis section in the micropropagation node (c12_biotech_cbse_07_001).',
                  misconception: 'Students often think synthetic seeds are simply “somatic embryos wrapped in alginate” and that the bead itself provides all requirements.' }
          ],
            remediations: { 'synthetic-seeds-are-simply-somatic': { steps: ['If a student confuses storage vs.', 'germination media, have them: (1) re‑read the NCERT Figure 7.3 caption listing “nutrient elements, growth regulators.', '“Outside bead (germination)” with at least three entries each; (3) attempt Diagnostic Question 3 again, explicitly.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_07_003', difficulty: 'standard',
          question: 'Somaclonal variation refers to the genetic and phenotypic variations observed.',
          hint: 'Revisit c12_biotech_cbse_07_001 (Micropropagation stages) and c11_biotech_cbse_12_011.',
          misconception: 'Students often believe somaclonal variation is intentionally induced by adding mutagens to the culture medium.',
          parts: [
                { id: 'a', prompt: 'Define somaclonal variation and state the term used for plants regenerated from tissue culture that exhibit such variation.', answer: 'Somaclonal variation is the genetic and phenotypic variation observed in plants',
                  options: ['Somaclonal variation is the genetic and phenotypic variation observed in plants', 'variation from sexual reproduction', 'mutation induced by chemicals', 'mutagens are added to create somaclonal variation'],
                  hint: 'Revisit c12_biotech_cbse_07_001 (Micropropagation stages) and c11_biotech_cbse_12_011 (Plant cell.',
                  misconception: 'Students often believe somaclonal variation is intentionally induced by adding mutagens to the culture medium, confusing it with mutation.' },
                { id: 'b', prompt: 'A tissue culture lab regenerates 5000 banana plantlets from a single elite cultivar.', answer: 'Step 1: Identify off-types (stunted) and desirable variants (resistant) through',
                  options: ['Step 1: Identify off-types (stunted) and desirable variants (resistant) through', 'mutagens are added to create somaclonal variation'],
                  hint: 'Revisit c12_biotech_cbse_07_001 (Micropropagation stages) and c11_biotech_cbse_12_011 (Plant cell.',
                  misconception: 'Students often believe somaclonal variation is intentionally induced by adding mutagens to the culture medium, confusing it with mutation.' }
          ],
            remediations: { 'somaclonal-variation-is-intentionally-induced': { steps: ['If the student holds this misconception, first clarify that somaclonal variation is a natural consequence of in vitro.', 'Use the analogy: "Just as photocopying a document repeatedly introduces smudges and shifts without any deliberate.', 'Assign a diagnostic question: "List three culture conditions that increase somaclonal variation frequency" (answer.', 'Re-test with an assertion-reason item on this distinction.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_07_004', difficulty: 'standard',
          question: 'Virus-free plant production via meristem culture is an in vitro technique where.',
          hint: 'If stuck, review the shoot apical meristem diagram in c11_bio_cbse_06_001 and the virus.',
          misconception: 'Students often think "meristem culture" means culturing the entire shoot tip (several mm long) and that any shoot tip.',
          parts: [
                { id: 'a', prompt: 'What is the typical size range of the meristem explant used for virus elimination, and why is this size critical?', answer: 'The typical size is 0.1–1.0 mm (often 0.2–0.5 mm)',
                  options: ['The typical size is 0.1–1.0 mm (often 0.2–0.5 mm)', '2–5 mm', 'any size works', 'meristem culture'],
                  hint: 'If stuck, review the shoot apical meristem diagram in c11_bio_cbse_06_001 and the virus movement.',
                  misconception: 'Students often think "meristem culture" means culturing the entire shoot tip (several mm long) and that any shoot tip will yield virus-free.' },
                { id: 'b', prompt: 'A student claims: "Meristem culture works because the meristem cells divide so fast that viruses cannot replicate in them." Is this correct?', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'meristem culture'],
                  hint: 'If stuck, review the shoot apical meristem diagram in c11_bio_cbse_06_001 and the virus movement.',
                  misconception: 'Students often think "meristem culture" means culturing the entire shoot tip (several mm long) and that any shoot tip will yield virus-free.' },
                { id: 'c', prompt: 'You are tasked with producing virus-free potato plants from a cultivar infected with Potato virus Y (PVY).', answer: 'explant size, (',
                  options: ['explant size, (', 'meristem culture'],
                  hint: 'If stuck, review the shoot apical meristem diagram in c11_bio_cbse_06_001 and the virus movement.',
                  misconception: 'Students often think "meristem culture" means culturing the entire shoot tip (several mm long) and that any shoot tip will yield virus-free.' },
                { id: 'd', prompt: 'Compare meristem culture and thermotherapy for virus elimination in terms of: (i) mechanism, (ii) effect on plant genotype, (iii) suitability for different.', answer: '(i) Meristem culture exploits anatomical virus-free zones',
                  options: ['(i) Meristem culture exploits anatomical virus-free zones', 'meristem culture'],
                  hint: 'If stuck, review the shoot apical meristem diagram in c11_bio_cbse_06_001 and the virus movement.',
                  misconception: 'Students often think "meristem culture" means culturing the entire shoot tip (several mm long) and that any shoot tip will yield virus-free.' }
          ],
            remediations: { 'meristem-culture-means-culturing-the': { steps: ['If a student cannot distinguish meristem tip from shoot tip, or cannot explain the size–survival trade-off, have them.', '(2) Revisit c12_biotech_cbse_07_001 (Micropropagation) to see how explant size affects contamination and regeneration.', '(3) Perform a virtual lab exercise (e.g., NCERT lab manual activity) measuring regeneration percentage vs.', 'explant size (0.1, 0.3, 0.5, 1.0 mm) and plotting the curve.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_07_005', difficulty: 'standard',
          question: 'Embryo rescue is an in vitro plant tissue culture technique where immature.',
          hint: 'Review c11_bio_cbse_03_007 (double fertilization) and c11_bio_cbse_05_007 (seed.',
          misconception: 'Students often believe embryo rescue "creates" hybrids that cannot form naturally.',
          parts: [
                { id: 'a', prompt: 'In a cross between *Brassica napus* (2n=38) and *B. oleracea* (2n=18), hybrid embryos abort at the globular stage (10 DAP). The breeder wants to rescue them.', answer: 'Excise at late globular/early heart stage (just before abortion at 10 DAP)',
                  options: ['Excise at late globular/early heart stage (just before abortion at 10 DAP)', 'creates', 'artificial', 'embryo rescue "creates" hybrids that cannot form naturally'],
                  hint: 'Review c11_bio_cbse_03_007 (double fertilization) and c11_bio_cbse_05_007 (seed development stages).',
                  misconception: 'Students often believe embryo rescue "creates" hybrids that cannot form naturally.' }
          ],
            remediations: { 'embryo-rescue-creates-hybrids-that': { steps: ['If the student confuses pre/post-zygotic barriers: Revisit c11_bio_cbse_03_007 (double fertilization) and.', 'If they confuse embryo rescue with somatic embryogenesis: Revisit c12_biotech_cbse_07_002 (synthetic seeds) and compare.', 'If they cannot design medium: Revisit c12_biotech_cbse_07_001 (micropropagation media) and c11_biotech_cbse_12_011.', 'Then re-attempt Diagnostic Questions 3 and 5.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_07_006', difficulty: 'standard',
          question: 'Haploid production through anther and pollen culture (androgenesis) is a plant.',
          hint: 'Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_03_008 (haplodiplontic life.',
          misconception: 'Students believe that haploid plants produced from anther culture are directly usable as crop varieties.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In anther culture, any anther from a flowering plant can produce haploids because all anthers contain microspores." Explain why this.', answer: 'The statement is incorrect because: (1) The donor plant must be at the correct',
                  options: ['The statement is incorrect because: (1) The donor plant must be at the correct', 'single allele = homozygous'],
                  hint: 'Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_03_008 (haplodiplontic life cycle).',
                  misconception: 'Students believe that haploid plants produced from anther culture are directly usable as crop varieties.' },
                { id: 'b', prompt: 'Design a pretreatment protocol for wheat anthers to maximize androgenic response.', answer: 'the pretreatment type, (',
                  options: ['the pretreatment type, (', 'cold for wheat, heat for rice', 'single allele = homozygous'],
                  hint: 'Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_03_008 (haplodiplontic life cycle).',
                  misconception: 'Students believe that haploid plants produced from anther culture are directly usable as crop varieties.' },
                { id: 'c', prompt: 'Compare direct embryogenesis vs callus-mediated regeneration in anther culture. Which pathway is preferred for doubled haploid breeding programs and why?', answer: 'Direct embryogenesis: microspores → embryo → plantlet without callus phase',
                  options: ['Direct embryogenesis: microspores → embryo → plantlet without callus phase', 'callus is better', 'single allele = homozygous'],
                  hint: 'Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_03_008 (haplodiplontic life cycle).',
                  misconception: 'Students believe that haploid plants produced from anther culture are directly usable as crop varieties.' }
          ],
            remediations: { 'haploid-plants-produced-from-anther': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) to recall homologous pairing requirement.', 'Draw meiosis in a haploid (n) vs doubled haploid (2n) — show unpaired univalents vs paired bivalents.', 'Redo Diagnostic Question 5 with this cytogenetic lens.', 'Practice writing: "Haploids (n) are sterile due to unpaired chromosomes in meiosis; colchicine doubling restores.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
