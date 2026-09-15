import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch09_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch09_p2: SimDef = {
    id: 'v3_c12_bio_ch09_p2',
    title: 'Strategies for Enhancement in Food Production · Part 2/2',
    subtitle: 'Same cows, double the milk — the difference is science, not luck.',
    classLevel: 12, subject: 'biology', topic: 'Strategies for Enhancement in Food Production · Part 2/2',
    chapters: ['c12_bio_ch09'],
    nodeIds: ['c12_bio_cbse_09_007', 'c12_bio_cbse_09_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Dairy farm consultant', intro: 'India became the world\'s largest milk producer on management science, not better cows — learn how.', goal: 'Apply principles of animal husbandry and scientific dairy farm management.' },
    discovery: {
        question: 'Two dairy farms own identical cows — yet one yields twice the milk. What is the most likely difference?',
        options: ['Management — balanced feeding, hygienic housing, veterinary care and breeding records drive yield', 'Luck — milk yield is fixed by the cow\'s genetics and cannot be managed', 'Climate — only farms in cold regions produce high yields', 'Breed alone — identical cows means identical yield regardless of care'],
        answer: 'Management — balanced feeding, hygienic housing, veterinary care and breeding records drive yield',
        hook: 'We credit the animal and blame the breed — but animal husbandry is a science precisely because yield is engineered through feeding, housing, health and records, not inherited wholesale.',
    },
    teaching: [
        { title: 'Plant Tissue Culture: Micropropagation', text: 'Plant tissue culture (micropropagation) is an *in vitro* aseptic technique where small explants (meristems, nodes, leaves) from a selected mother plant are cultured on a defined nutrient medium under.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_09_007', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Audit a struggling dairy farm: redesign its feeding ration, housing hygiene and health protocol, and justify each change by the yield and welfare gains it produces.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_09_007', title: 'Plant Tissue Culture: Micropropagation',
          scaffold: { problem: 'A tissue culture lab initiates micropropagation of orchid (Dendrobium) using 10 shoot-tip explants.',
            steps: [
            { text: 'Identify the exponential growth model: shoots after each cycle = previous shoots × multiplication rate.' },
            { text: 'Cycle 1: 10 explants × 6 = 60 shoots. Cycle 2: 60 × 6 = 360 shoots. Cycle 3: 360 × 6 = 2,160 shoots.' },
            { text: 'Apply rooting success: 2,160 × 0.90 = 1,944 rooted plantlets.' },
            { text: 'Apply acclimatization survival: 1,944 × 0.80 = 1,555 saleable plantlets.' },
            { text: 'Verify: 10 × 6³ × 0.9 × 0.8 = 10 × 216 × 0.72 = 1,555.2 ≈ 1,555.', faded: true, blankAnswer: '1,555 saleable plantlets.' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_09_008', title: 'Single Cell Protein (SCP): Production and Uses',
          caseStudy: { intro: 'Begin by observing a packet of baker\'s yeast or a probiotic drink — both are microbial biomass consumed directly.',
            decisions: [{ prompt: 'Define Single Cell Protein (SCP) and name any two microorganisms commonly used for its commercial production.', options: [
                { text: 'Single Cell Protein (SCP) is the dried microbial biomass used as a protein supplement', outcome: 'Single Cell Protein (SCP) is the dried microbial biomass used as a protein supplement.' },
                { text: 'SCP is a protein extracted from single cells', outcome: 'Not quite — Students often think SCP is a "pure protein isolate" like whey protein powder, and that the.', reveals: 'scp-is-a-pure-protein' },
                { text: 'pure protein isolate', outcome: 'Not quite — Students often think SCP is a "pure protein isolate" like whey protein powder, and that the.', reveals: 'scp-is-a-pure-protein' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_09_008', title: 'Identify each idea',
          dissect: { specimen: 'Strategies for Enhancement in Food Production · Part 2/2', spots: [
            { id: 's1', label: 'Plant Tissue Culture Micropropagation', prompt: 'Which idea is this? — Plant tissue culture (micropropagation) is an *in vitro* aseptic technique where small.', answer: 'Plant Tissue Culture Micropropagation', options: ['Plant Tissue Culture Micropropagation', 'Single Cell Protein SCP Production and Uses'] },
            { id: 's2', label: 'Single Cell Protein SCP Production and Uses', prompt: 'Which idea is this? — Single Cell Protein (SCP) is the dried biomass of microorganisms (bacteria, yeast, fungi.', answer: 'Single Cell Protein SCP Production and Uses', options: ['Single Cell Protein SCP Production and Uses', 'Plant Tissue Culture Micropropagation'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A dairy farmer brags that his shed is so clean he has stopped vaccinating the herd and skipped deworming \'to save money\'. The vet-college student interning with him is asked whether that\'s sound management.',
            decisions: [{ prompt: 'Can spotless housing replace preventive health care?', options: [
                { text: 'No — hygiene cuts pathogen load but can\'t break every cycle: worm eggs persist in soil for years and airborne or vector-borne diseases arrive regardless; vaccination primes immunity and deworming interrupts parasite cycles.', outcome: 'Husbandry is four interdependent pillars — feeding, breeding, health and housing; excellent housing can\'t substitute for the health pillar.' },
                { text: 'Yes — a clean shed removes the source of disease, so vaccines and dewormers become redundant.', outcome: 'Cleanliness lowers exposure but can\'t stop wind-borne FMD or nematode eggs lying dormant in pasture soil for years.', reveals: 'hygiene-replaces-vaccines' },
                { text: 'Yes — and the money saved can go to extra calories, since feed quantity alone decides milk yield.', outcome: 'Milk synthesis needs a balanced ration — protein, minerals, fibre, not just calories — and a sick or wormy cow won\'t convert feed to milk anyway.', reveals: 'calories-equal-balanced-ration' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_09_008', title: 'You made it',
          caseStudy: { intro: 'You now see farms as systems, not just animals. Animal husbandry principles score easy board marks — and India\'s dairy economy runs on exactly this knowledge.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_007', difficulty: 'standard',
          question: 'Plant tissue culture (micropropagation) is an *in vitro* aseptic technique.',
          hint: 'If unsure about hormone functions, immediately review **c11_bio_cbse_13_003** and.',
          misconception: '**Misconception**: "Micropropagation always produces genetically identical clones, so somaclonal variation is not.',
          parts: [
                { id: 'a', prompt: 'Define "totipotency" in the context of plant tissue culture and name the type of explant that best exploits this property for clonal micropropagation.', answer: 'Totipotency is the inherent capacity of a single living plant cell to divide and',
                  options: ['Totipotency is the inherent capacity of a single living plant cell to divide and', 'leaf disc', 'callus', 'clonal fidelity'],
                  hint: 'If unsure about hormone functions, immediately review **c11_bio_cbse_13_003** and.',
                  misconception: '**Misconception**: "Micropropagation always produces genetically identical clones, so somaclonal variation is not a concern if you use.' },
                { id: 'b', prompt: 'Compare and contrast "direct organogenesis" and "indirect organogenesis via callus" in micropropagation with respect to: (a) genetic fidelity of regenerated.', answer: 'genetic fidelity of regenerated plantlets, (',
                  options: ['genetic fidelity of regenerated plantlets, (', 'true-to-type', 'clonal fidelity', 'phenotypic uniformity'],
                  hint: 'If unsure about hormone functions, immediately review **c11_bio_cbse_13_003** and.',
                  misconception: '**Misconception**: "Micropropagation always produces genetically identical clones, so somaclonal variation is not a concern if you use.' }
          ],
            remediations: { 'misconception-micropropagation-always-produces-g': { steps: ['If the student cannot distinguish direct vs indirect organogenesis or predict auxin:cytokinin effects: 1.', 'Revisit **c11_bio_cbse_13_003** (Auxins) and **c11_bio_cbse_13_004** (Cytokinins) — draw a 2×2 table: high auxin/low.', 'Watch a 5-min video of "Skoog & Miller tobacco pith experiment" to visualize the ratio concept.', 'Re-attempt **DIAGNOSTIC_QUESTION_2** and **DIAGNOSTIC_QUESTION_4** with the table as reference.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "Micropropagation always produces genetically identical clones, so somaclonal variation is not.',
          parts: [
                { id: 'a', prompt: 'A commercial lab aims to produce 100,000 virus-free banana plantlets from a single indexed meristem in 6 months.', answer: 'Number of plantlets after *n* cycles = 5ⁿ',
                  options: ['Number of plantlets after *n* cycles = 5ⁿ', '6 cycles enough', 'clonal fidelity', 'phenotypic uniformity'],
                  hint: 'If unsure about hormone functions, immediately review **c11_bio_cbse_13_003** and.',
                  misconception: '**Misconception**: "Micropropagation always produces genetically identical clones, so somaclonal variation is not a concern if you use.' },
                { id: 'b', prompt: 'Design a low-cost, farmer-level "hardening protocol" for tissue-cultured plantlets being transferred from culture vessels to field soil in a tropical Indian.', answer: 'Key stresses & low-tech mitigations: (1) **Low humidity / high transpiration**',
                  options: ['Key stresses & low-tech mitigations: (1) **Low humidity / high transpiration**', 'clonal fidelity', 'phenotypic uniformity'],
                  hint: 'If unsure about hormone functions, immediately review **c11_bio_cbse_13_003** and.',
                  misconception: '**Misconception**: "Micropropagation always produces genetically identical clones, so somaclonal variation is not a concern if you use.' }
          ],
            remediations: { 'misconception-micropropagation-always-produces-g': { steps: ['If the student cannot distinguish direct vs indirect organogenesis or predict auxin:cytokinin effects: 1.', 'Revisit **c11_bio_cbse_13_003** (Auxins) and **c11_bio_cbse_13_004** (Cytokinins) — draw a 2×2 table: high auxin/low.', 'Watch a 5-min video of "Skoog & Miller tobacco pith experiment" to visualize the ratio concept.', 'Re-attempt **DIAGNOSTIC_QUESTION_2** and **DIAGNOSTIC_QUESTION_4** with the table as reference.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_09_008', difficulty: 'standard',
          question: 'Single Cell Protein (SCP) is the dried biomass of microorganisms (bacteria.',
          hint: 'If stuck, revisit c11_biotech_cbse_01_007 (industrial fermentation) and c8_bio_ch1_10.',
          misconception: 'Students often think SCP is a "pure protein isolate" like whey protein powder, and that the microbial cells are lysed.',
          parts: [
                { id: 'a', prompt: 'A biotech company plans to produce SCP using *Methylophilus methylotrophus* on methanol derived from natural gas.', answer: 'Ammonia (or ammonium salts) must be added as the nitrogen source',
                  options: ['Ammonia (or ammonium salts) must be added as the nitrogen source', 'vitamins', 'phosphate', 'pure protein isolate'],
                  hint: 'If stuck, revisit c11_biotech_cbse_01_007 (industrial fermentation) and c8_bio_ch1_10 (beneficial.',
                  misconception: 'Students often think SCP is a "pure protein isolate" like whey protein powder, and that the microbial cells are lysed to extract protein.' }
          ],
            remediations: { 'scp-is-a-pure-protein': { steps: ['If the student confuses SCP with protein isolates: (1) Revisit c8_bio_ch1_11 (yeast in baking) — note that baker\'s.', '(2) Perform a simple observation: compare a commercial yeast powder (whole cells) vs.', 'whey protein isolate (white fine powder) — note texture, solubility, label ingredients.', '(3) Re-read the NCERT box on "Single Cell Protein" in Ch.9 and list components: protein, nucleic acids, lipids.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
