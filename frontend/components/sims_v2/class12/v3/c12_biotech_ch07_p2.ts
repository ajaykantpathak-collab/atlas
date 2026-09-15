import type { SimDef } from '../../engine/types';

/** v3 generated — c12_biotech_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_biotech_ch07_p2: SimDef = {
    id: 'v3_c12_biotech_ch07_p2',
    title: 'Plant Tissue Culture Applications · Part 2/2',
    subtitle: '50,000 identical banana plants from one shoot tip — cloning at industrial scale.',
    classLevel: 12, subject: 'biotechnology', topic: 'Plant Tissue Culture Applications · Part 2/2',
    chapters: ['c12_biotech_ch07'],
    nodeIds: ['c12_biotech_cbse_07_007', 'c12_biotech_cbse_07_008', 'c12_biotech_cbse_07_009', 'c12_biotech_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Tissue-culture entrepreneur', intro: 'When a crop can\'t seed and cuttings carry disease, the lab becomes the nursery — here\'s the assembly line.', goal: 'Describe the stages of micropropagation and the construction of synthetic seeds.' },
    discovery: {
        question: 'A farmer needs 50,000 disease-free \'Grand Naine\' banana plants by next season — suckers are scarce and carry viruses. Which technology delivers?',
        options: ['Micropropagation — shoot tips multiplied through staged in vitro culture into thousands of identical plantlets', 'Grafting — joining banana stems to disease-free rootstocks', 'Seed propagation — planting 50,000 banana seeds from the fruit', 'Selective breeding — crossing varieties over several generations for uniformity'],
        answer: 'Micropropagation — shoot tips multiplied through staged in vitro culture into thousands of identical plantlets',
        hook: 'Bananas barely make viable seeds and suckers inherit every virus — so the answer isn\'t breeding at all. Staged culture (Stage 0 to IV) clones clean plants faster than any field method.',
    },
    teaching: [
        { title: 'Protoplast Isolation and Somatic Hybridization', text: 'Protoplast isolation is the enzymatic removal of the plant cell wall (using cellulase and pectinase) to obtain plasma membrane and cell contents; somatic hybridization is the fusion of protoplasts.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_biotech_cbse_07_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Run a micropropagation pipeline: take a banana shoot tip through establishment, multiplication, rooting and hardening — then package elite sandalwood as synthetic seeds that survive a courier box.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_007', title: 'Protoplast Isolation and Somatic Hybridization',
          caseStudy: { intro: 'Imagine you want to transfer late-blight resistance from a wild potato species (*Solanum demissum*) into a high-yielding cultivated potato (*Solanum.',
            decisions: [{ prompt: 'What are the two main enzymes used for protoplast isolation and what specific cell wall components do they degrade?', options: [
                { text: 'Cellulase degrades cellulose (β-1,4-glucan) and pectinase degrades pectin', outcome: 'Cellulase degrades cellulose (β-1,4-glucan) and pectinase degrades pectin (polygalacturonic acid).' },
                { text: 'protease and lipase', outcome: 'Not quite — Students think somatic hybridization = protoplast fusion only, ignoring the critical regeneration.', reveals: 'somatic-hybridization-protoplast-fusion-only' },
                { text: 'cellulase and hemicellulase', outcome: 'Not quite — Students think somatic hybridization = protoplast fusion only, ignoring the critical regeneration.', reveals: 'somatic-hybridization-protoplast-fusion-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_008', title: 'Cybrids: Production and Significance in Breeding',
          caseStudy: { intro: 'Imagine you are a plant breeder trying to develop a hybrid wheat variety with male sterility for easy cross-pollination — but the male sterility gene resides.',
            decisions: [{ prompt: 'Define cybrid and state the key genomic difference between a cybrid and a somatic hybrid produced from the same two parental species.', options: [
                { text: 'A cybrid is a cytoplasmic hybrid containing the nuclear genome of one parent and the', outcome: 'A cybrid is a cytoplasmic hybrid containing the nuclear genome of one parent and the.' },
                { text: 'cybrids have mixed nuclear DNA', outcome: 'Not quite — Students often confuse cybrids with somatic hybrids, thinking both involve "mixing genomes from two.', reveals: 'students-often-confuse-cybrids-with' },
                { text: 'mixing genomes from two parents', outcome: 'Not quite — Students often confuse cybrids with somatic hybrids, thinking both involve "mixing genomes from two.', reveals: 'students-often-confuse-cybrids-with' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_07_009', title: 'Secondary Metabolite Production in Bioreactors',
          scaffold: { problem: 'A 20 L airlift bioreactor runs *Catharanthus roseus* suspension culture for 25 days. Final biomass = 18 g DW L⁻¹.',
            steps: [
            { text: 'Calculate single-stage volumetric productivity (baseline). Pᵥ₁ = (X₁ × Cₚ₁) / t₁ = (18 g L⁻¹ × 0.45 mg g⁻¹) / 25.' },
            { text: 'Determine Stage 2 biomass after 18% reduction. X₂ = 18 × (1 - 0.18) = 14.76 g L⁻¹.' },
            { text: 'Determine elicited specific content. Cₚ₂ = 0.45 × 3.2 = 1.44 mg g⁻¹ DW.' },
            { text: 'Calculate two-stage volumetric productivity. Pᵥ₂ = (X₂ × Cₚ₂) / t_total = (14.76 × 1.44) / 25 = 21.2544 / 25 = 0.850.' },
            { text: 'Compute net gain. ΔPᵥ = Pᵥ₂ - Pᵥ₁ = 0.850 - 0.324 = 0.526 mg L⁻¹ day⁻¹ (162% increase).' },
            { text: 'Verify units and reasonableness: biomass drop < content rise → net positive, typical for good elicitation.', faded: true, blankAnswer: 'Net gain = **0.526 mg L⁻¹ day⁻¹** (two-stage Pᵥ = 0.850.' }
            ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_010', title: 'In Vitro Conservation and Cryopreservation of Germplasm',
          caseStudy: { intro: 'Imagine you\'re a plant breeder who has developed a disease-resistant banana variety through years of selection.',
            decisions: [{ prompt: 'Define cryopreservation and state the temperature at which plant germplasm is stored in liquid nitrogen.', options: [
                { text: 'Cryopreservation is the storage of plant cells, tissues, or organs at ultra-low', outcome: 'Cryopreservation is the storage of plant cells, tissues, or organs at ultra-low temperature (-196°C.' },
                { text: '-80°C or -150°C', outcome: 'Not quite — Students confuse **vitrification** with **controlled-rate freezing** and think both use similar.', reveals: 'students-confuse-vitrification-with-controlled' },
                { text: 'both use similar cryoprotectant concentrations', outcome: 'Not quite — Students confuse **vitrification** with **controlled-rate freezing** and think both use similar.', reveals: 'students-confuse-vitrification-with-controlled' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_biotech_cbse_07_008', title: 'Identify each idea',
          dissect: { specimen: 'Plant Tissue Culture Applications · Part 2/2', spots: [
            { id: 's1', label: 'Protoplast Isolation and Somatic Hybridization', prompt: 'Which idea is this? — Protoplast isolation is the enzymatic removal of the plant cell wall (using cellulase and.', answer: 'Protoplast Isolation and Somatic Hybridization', options: ['Protoplast Isolation and Somatic Hybridization', 'Cybrids Production and Significance in Breeding', 'Secondary Metabolite Production in Bioreactors', 'In Vitro Conservation and Cryopreservation of Germplasm'] },
            { id: 's2', label: 'Cybrids Production and Significance in Breeding', prompt: 'Which idea is this? — Cybrids (cytoplasmic hybrids) are plants produced by protoplast fusion where the nuclear.', answer: 'Cybrids Production and Significance in Breeding', options: ['Cybrids Production and Significance in Breeding', 'Protoplast Isolation and Somatic Hybridization', 'Secondary Metabolite Production in Bioreactors', 'In Vitro Conservation and Cryopreservation of Germplasm'] },
            { id: 's3', label: 'Secondary Metabolite Production in Bioreactors', prompt: 'Which idea is this? — Secondary metabolite production in bioreactors is the controlled cultivation of plant.', answer: 'Secondary Metabolite Production in Bioreactors', options: ['Secondary Metabolite Production in Bioreactors', 'Protoplast Isolation and Somatic Hybridization', 'Cybrids Production and Significance in Breeding', 'In Vitro Conservation and Cryopreservation of Germplasm'] },
            { id: 's4', label: 'In Vitro Conservation and Cryopreservation of Germplasm', prompt: 'Which idea is this? — In vitro conservation refers to the preservation of plant genetic resources (germplasm).', answer: 'In Vitro Conservation and Cryopreservation of Germplasm', options: ['In Vitro Conservation and Cryopreservation of Germplasm', 'Protoplast Isolation and Somatic Hybridization', 'Cybrids Production and Significance in Breeding', 'Secondary Metabolite Production in Bioreactors'] }
          ] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A nursery intern is asked to run the shoot-multiplication stage for banana plantlets. The medium she prepares is rich in auxin but low in cytokinin — and the cultures keep sprouting roots instead of multiplying shoots.',
            decisions: [{ prompt: 'What went wrong, and what\'s the fix?', options: [
                { text: 'The hormone ratio is inverted: shoot multiplication (Stage II) needs high cytokinin:auxin; a high auxin:cytokinin mix triggers rooting — that\'s Stage III\'s job.', outcome: 'Skoog–Miller logic runs the whole protocol: cytokinin-heavy drives shoots, auxin-heavy drives roots, and hardening uses none — matching stage to ratio fixes it.' },
                { text: 'Nothing — auxin is the shoot hormone, so the shoots will multiply once the dose kicks in.', outcome: 'That\'s the classic swap: auxin promotes rooting and callus; cytokinin is what pushes shoot buds to proliferate.', reveals: 'auxin-for-shoots' },
                { text: 'The cultures failed because micropropagation genetically modifies the plant and the cells are rejecting the foreign genes.', outcome: 'No foreign DNA is inserted — micropropagation is clonal vegetative propagation; hormones only redirect expression of existing genes.', reveals: 'microprop-is-gmo' }
            ] }] } },
        { type: 'case', nodeId: 'c12_biotech_cbse_07_010', title: 'You made it',
          caseStudy: { intro: 'You\'ve industrialised a plant — clones at scale, shipped as alginate-bead \'seeds\'. Micropropagation stages and synthetic seeds are board favourites and a real agri-business model.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_07_007', difficulty: 'standard',
          question: 'Protoplast isolation is the enzymatic removal of the plant cell wall (using.',
          hint: 'If stuck on enzyme specificity, revisit c11_biotech_cbse_02_003 (Cell Wall) and.',
          misconception: 'Students think somatic hybridization = protoplast fusion only, ignoring the critical regeneration and selection steps.',
          parts: [
                { id: 'a', prompt: 'What are the two main enzymes used for protoplast isolation and what specific cell wall components do they degrade?', answer: 'Cellulase degrades cellulose (β-1,4-glucan) and pectinase degrades pectin',
                  options: ['Cellulase degrades cellulose (β-1,4-glucan) and pectinase degrades pectin', 'protease and lipase', 'cellulase and hemicellulase'],
                  hint: 'If stuck on enzyme specificity, revisit c11_biotech_cbse_02_003 (Cell Wall) and c11_bio_cbse_03_004.',
                  misconception: 'Students think somatic hybridization = protoplast fusion only, ignoring the critical regeneration and selection steps.' },
                { id: 'b', prompt: 'A researcher isolates protoplasts from Species A (2n=24) and Species B (2n=18), fuses them with PEG, and regenerates plants.', answer: 'Somatic hybrids',
                  options: ['Somatic hybrids', 'cybrids'],
                  hint: 'If stuck on enzyme specificity, revisit c11_biotech_cbse_02_003 (Cell Wall) and c11_bio_cbse_03_004.',
                  misconception: 'Students think somatic hybridization = protoplast fusion only, ignoring the critical regeneration and selection steps.' }
          ],
            remediations: { 'somatic-hybridization-protoplast-fusion-only': { steps: ['If the student cannot explain the full workflow: 1.', 'Revisit c11_biotech_cbse_02_003 (Cell Wall) to recall cellulose/pectin composition.', 'Re-read NCERT Fig 7.4 (protoplast fusion schematic) and label each arrow with reagent/action.', 'Practice drawing the flowchart: Explant → Enzymatic isolation → Protoplasts → PEG fusion → Heterokaryon → Nuclear.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_07_008', difficulty: 'standard',
          question: 'Cybrids (cytoplasmic hybrids) are plants produced by protoplast fusion where.',
          hint: 'If stuck, revisit c12_biotech_cbse_07_007 (Protoplast Isolation and Somatic.',
          misconception: 'Students often confuse cybrids with somatic hybrids, thinking both involve "mixing genomes from two parents." The.',
          parts: [
                { id: 'a', prompt: 'A researcher fuses protoplasts from Species X (nuclear genome Nx, mitochondrial genome Mx, chloroplast genome Cx) and Species Y (Ny, My, Cy).', answer: 'This is a cybrid',
                  options: ['This is a cybrid', 'mixing genomes from two parents', 'some cytoplasmic mixing'],
                  hint: 'If stuck, revisit c12_biotech_cbse_07_007 (Protoplast Isolation and Somatic Hybridization) for.',
                  misconception: 'Students often confuse cybrids with somatic hybrids, thinking both involve "mixing genomes from two parents." The specific error: they.' }
          ],
            remediations: { 'students-often-confuse-cybrids-with': { steps: ['If the student conflates cybrids with somatic hybrids: (1) Have them draw two side-by-side diagrams: somatic hybrid.', '(2) Ask: "Which nucleus divides in the first mitotic division after fusion?" — cybrid: only the unirradiated nucleus.', '(3) Assign re-reading of NCERT Fig 7.4 caption: "Loss of Nuclei B → Somatic Cybrid Plant." (4) Re-diagnostic: Give.', 'Regenerated plant has wheat nuclear DNA, rice mitochondria.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse cybrids with somatic hybrids, thinking both involve "mixing genomes from two parents." The.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Cybrids are always superior to somatic hybrids for crop improvement because they avoid nuclear genome instability from wide crosses.".', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'mixing genomes from two parents', 'some cytoplasmic mixing'],
                  hint: 'If stuck, revisit c12_biotech_cbse_07_007 (Protoplast Isolation and Somatic Hybridization) for.',
                  misconception: 'Students often confuse cybrids with somatic hybrids, thinking both involve "mixing genomes from two parents." The specific error: they.' }
          ],
            remediations: { 'students-often-confuse-cybrids-with': { steps: ['If the student conflates cybrids with somatic hybrids: (1) Have them draw two side-by-side diagrams: somatic hybrid.', '(2) Ask: "Which nucleus divides in the first mitotic division after fusion?" — cybrid: only the unirradiated nucleus.', '(3) Assign re-reading of NCERT Fig 7.4 caption: "Loss of Nuclei B → Somatic Cybrid Plant." (4) Re-diagnostic: Give.', 'Regenerated plant has wheat nuclear DNA, rice mitochondria.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_07_009', difficulty: 'standard',
          question: 'Secondary metabolite production in bioreactors is the controlled cultivation.',
          hint: 'If stuck, redraw the **amphibolic pathway** (c11_bio_cbse_12_008) labeling the.',
          misconception: '**"Higher biomass always means higher total metabolite yield."** Students assume a linear relationship: more cells.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Secondary metabolites are produced during the exponential growth phase of plant cell cultures because cells are dividing rapidly and need.', answer: '**Correct answer:** The statement is **incorrect**',
                  options: ['**Correct answer:** The statement is **incorrect**', 'Higher biomass always means higher total metabolite yield', 'a linear relationship: more cells = more product'],
                  hint: 'If stuck, redraw the **amphibolic pathway** (c11_bio_cbse_12_008) labeling the.',
                  misconception: '**"Higher biomass always means higher total metabolite yield."** Students assume a linear relationship: more cells = more product.' }
          ],
            remediations: { 'higher-biomass-always-means-higher': { steps: ['** Revisit **c11_bio_cbse_12_008 Amphibolic Pathway** — draw the carbon split at acetyl-CoA/pyruvate between TCA.', '** Watch a 5-min video of *Lithospermum* hairy-root bioreactor (search "shikonin bioreactor 1987 Fujita") — observe the.', '** Re-do **Diagnostic Question 3** with new numbers: 4.5 g L⁻¹ DW, 2.1 mg g⁻¹ DW, 18 days → calculate both.', '** Explain aloud to a peer: "Why does constant tip speed *not* guarantee constant kLa at scale?" — if you stall, review.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_07_010', difficulty: 'standard',
          question: 'In vitro conservation refers to the preservation of plant genetic resources.',
          hint: 'If stuck on cryopreservation protocol steps, revisit c12_biotech_cbse_07_001.',
          misconception: 'Students confuse **vitrification** with **controlled-rate freezing** and think both use similar cryoprotectant.',
          parts: [
                { id: 'a', prompt: 'Define cryopreservation and state the temperature at which plant germplasm is stored in liquid nitrogen.', answer: 'Cryopreservation is the storage of plant cells, tissues, or organs at ultra-low',
                  options: ['Cryopreservation is the storage of plant cells, tissues, or organs at ultra-low', '-80°C or -150°C', 'both use similar cryoprotectant concentrations'],
                  hint: 'If stuck on cryopreservation protocol steps, revisit c12_biotech_cbse_07_001 (Micropropagation.',
                  misconception: 'Students confuse **vitrification** with **controlled-rate freezing** and think both use similar cryoprotectant concentrations.' },
                { id: 'b', prompt: 'A student writes: "In slow-growth storage, we reduce temperature to 4°C and subculture every 3 months.', answer: 'Error 1: Slow-growth storage typically uses 15-25°C (not 4°C',
                  options: ['Error 1: Slow-growth storage typically uses 15-25°C (not 4°C', 'both use similar cryoprotectant concentrations'],
                  hint: 'If stuck on cryopreservation protocol steps, revisit c12_biotech_cbse_07_001 (Micropropagation.',
                  misconception: 'Students confuse **vitrification** with **controlled-rate freezing** and think both use similar cryoprotectant concentrations.' },
                { id: 'c', prompt: 'You have meristematic explants of a rare medicinal plant (explants = 2 mm shoot tips).', answer: 'Preculture medium composition and duration, (',
                  options: ['Preculture medium composition and duration, (', 'both use similar cryoprotectant concentrations'],
                  hint: 'If stuck on cryopreservation protocol steps, revisit c12_biotech_cbse_07_001 (Micropropagation.',
                  misconception: 'Students confuse **vitrification** with **controlled-rate freezing** and think both use similar cryoprotectant concentrations.' },
                { id: 'd', prompt: 'Compare controlled-rate freezing (slow freezing) and vitrification methods of cryopreservation across FOUR parameters: (i) cooling rate, (ii) cryoprotectant.', answer: '| Parameter | Controlled-Rate Freezing | Vitrification |',
                  options: ['| Parameter | Controlled-Rate Freezing | Vitrification |', 'both use similar cryoprotectant concentrations'],
                  hint: 'If stuck on cryopreservation protocol steps, revisit c12_biotech_cbse_07_001 (Micropropagation.',
                  misconception: 'Students confuse **vitrification** with **controlled-rate freezing** and think both use similar cryoprotectant concentrations.' }
          ],
            remediations: { 'students-confuse-vitrification-with-controlled': { steps: ['If the student confuses vitrification and controlled freezing: (1) Have them draw a cooling curve for each method.', '(2) Make a comparison table with columns: Cryoprotectant, Concentration, Cooling Rate, Ice Formation, Equipment, Best.', '(3) Assign a re-diagnostic: "Explain why PVS2 at 1°C/min cooling would fail" — answer: high cryoprotectant + slow.', '(4) Direct them to revisit c12_biotech_cbse_07_001 (Micropropagation) for explant types, and c12_biotech_cbse_07_002.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
