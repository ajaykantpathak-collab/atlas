import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch03_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch03_p2: SimDef = {
    id: 'v3_c11_bio_ch03_p2',
    title: 'Plant Kingdom · Part 2/2',
    subtitle: 'Draw the line between plants that hide their reproduction and plants that seed it.',
    classLevel: 11, subject: 'biology', topic: 'Plant Kingdom · Part 2/2',
    chapters: ['c11_bio_ch03'],
    nodeIds: ['c11_bio_cbse_03_007', 'c11_bio_cbse_03_008', 'c11_bio_cbse_03_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a botanist cataloguing a Western Ghats forest during monsoon', intro: 'Slippery algae on rocks, moss carpets, ferns in the shade, pines with cones, mangoes in fruit — one forest, five evolutionary strategies to sort.', goal: 'Distinguish cryptogams from seed plants and place representatives in the five major plant groups using seeds, vascular tissue, and dominant life phase.' },
    discovery: {
        question: 'A fern unfurls elegant fronds with proper roots, stems, and vascular tissue — yet botanists group it with mosses and algae, not with seed plants. What is it missing that outweighs all that sophistication?',
        options: ['Seeds — it still reproduces by spores, placing it with the cryptogams', 'Flowers — without them it counts as a lower plant', 'Fruits — nothing encloses its offspring', 'True leaves — its fronds don\'t count'],
        answer: 'Seeds — it still reproduces by spores, placing it with the cryptogams',
        hook: 'Vascular tissue evolved before seeds — so \'advanced plumbing\' doesn\'t earn a plant a place among the seed-bearers. The seed is the dividing line.',
    },
    teaching: [
        { title: 'Angiosperms: Covered Seeds', text: 'Angiosperms are flowering plants characterized by the presence of ovules enclosed within an ovary (part of the pistil), which develops into a fruit after fertilization, thereby protecting the seeds.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_03_007', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Classify five specimens — Spirogyra, Funaria, a fern, Pinus, and Hibiscus — into algae, bryophyte, pteridophyte, gymnosperm, and angiosperm, citing one observable feature for each call.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_03_007', title: 'Angiosperms: Covered Seeds',
          caseStudy: { intro: 'Observe a mango tree and a wheat plant growing in your neighborhood — both produce seeds, yet the mango seed lies inside a fleshy fruit while the wheat grain.',
            decisions: [{ prompt: 'Name the two classes of angiosperms and state one fundamental difference in their seed structure that is used as a primary classification.', options: [
                { text: 'The two classes are Dicotyledonae (dicots) and Monocotyledonae (monocots)', outcome: 'The two classes are Dicotyledonae (dicots) and Monocotyledonae (monocots).' },
                { text: 'dicots have tap roots, monocots have fibrous roots', outcome: 'Not quite — Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two.', reveals: 'double-fertilization-means-two-sperm' },
                { text: 'double fertilization means two sperm fertilize one egg', outcome: 'Not quite — Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two.', reveals: 'double-fertilization-means-two-sperm' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_03_008', title: 'Plant Life Cycles: Haplontic, Diplontic, Haplodiplontic',
          caseStudy: { intro: 'Observe a green pond scum (Spirogyra), a moss cushion on a brick wall, and a mango tree in your neighbourhood.',
            decisions: [{ prompt: 'Name the type of life cycle exhibited by *Volvox* and state the ploidy of its dominant vegetative colony.', options: [
                { text: '*Volvox* exhibits a haplontic life cycle', outcome: '*Volvox* exhibits a haplontic life cycle. Its dominant vegetative colony is haploid (n).' },
                { text: 'haplodiplontic', outcome: 'Not quite — Students often believe "haplodiplontic" means the haploid and diploid phases are isomorphic.', reveals: 'haplodiplontic-means-the-haploid-and' },
                { text: 'the colony is diploid or meiosis occurs during gamete formation', outcome: 'Not quite — Students often believe "haplodiplontic" means the haploid and diploid phases are isomorphic.', reveals: 'haplodiplontic-means-the-haploid-and' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_03_008', title: 'Identify each idea',
          dissect: { specimen: 'Plant Kingdom · Part 2/2', spots: [
            { id: 's1', label: 'Angiosperms Covered Seeds', prompt: 'Which idea is this? — Angiosperms are flowering plants characterized by the presence of ovules enclosed within.', answer: 'Angiosperms Covered Seeds', options: ['Angiosperms Covered Seeds', 'Plant Life Cycles Haplontic Diplontic Haplodiplontic', 'Economic Importance of Algae and Gymnosperms'] },
            { id: 's2', label: 'Plant Life Cycles Haplontic Diplontic Haplodiplontic', prompt: 'Which idea is this? — Plant life cycles are classified into three patterns based on the ploidy of the dominant.', answer: 'Plant Life Cycles Haplontic Diplontic Haplodiplontic', options: ['Plant Life Cycles Haplontic Diplontic Haplodiplontic', 'Angiosperms Covered Seeds', 'Economic Importance of Algae and Gymnosperms'] },
            { id: 's3', label: 'Economic Importance of Algae and Gymnosperms', prompt: 'Which idea is this? — Economic importance of algae and gymnosperms refers to the direct and indirect benefits.', answer: 'Economic Importance of Algae and Gymnosperms', options: ['Economic Importance of Algae and Gymnosperms', 'Angiosperms Covered Seeds', 'Plant Life Cycles Haplontic Diplontic Haplodiplontic'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your eco-club is cataloguing plants on a trek: moss carpets on bark, ferns unfurling in the shade, a pine bearing cones, and a flowering mango. A teammate sorts them as \'cryptogams = simple plants without plumbing\' and \'phanerogams = advanced plants with vascular tissue\'.',
            decisions: [{ prompt: 'Which plant breaks their rule?', options: [
                { text: 'The fern — a cryptogam (spore-bearing, no seed) that possesses full xylem and phloem, true roots, stems and leaves. Seedlessness is the cryptogam criterion, not absence of vascular tissue; evolution produced vessels before seeds, and seeds before flowers.', outcome: 'Cryptogam vs phanerogam is a reproductive split (spores vs seeds); vascular tissue and \'advanced\' structure evolved on a different timeline.' },
                { text: 'The pine — it\'s \'lower\' because it has no flowers, so it must be a cryptogam like the moss.', outcome: 'Gymnosperms are phanerogams: they bear seeds (naked on cones, not enclosed in fruit); \'no flower\' doesn\'t mean \'no seed\'.', reveals: 'no-flowers-means-cryptogam' },
                { text: 'None breaks it — seedless plants are always structurally simple and seedless equals non-vascular.', outcome: 'Pteridophytes falsify the equation directly: first terrestrial plants with vascular tissue, yet reproducing by spores.', reveals: 'seedless-means-nonvascular' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_03_009', title: 'You made it',
          caseStudy: { intro: 'You learned that plant evolution added traits stepwise — vascular tissue first, then seeds, then flowers — and classification tracks that sequence, not appearances.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_007', difficulty: 'standard',
          question: 'Angiosperms are flowering plants characterized by the presence of ovules.',
          hint: 'Revisit c10_bio_cbse_03_007 (Fertilisation in Plants: Double Fertilisation and Seed.',
          misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.',
          parts: [
                { id: 'a', prompt: 'Name the two classes of angiosperms and state one fundamental difference in their seed structure that is used as a primary classification criterion.', answer: 'The two classes are Dicotyledonae (dicots) and Monocotyledonae (monocots)',
                  options: ['The two classes are Dicotyledonae (dicots) and Monocotyledonae (monocots)', 'dicots have tap roots, monocots have fibrous roots', 'double fertilization means two sperm fertilize one egg'],
                  hint: 'Revisit c10_bio_cbse_03_007 (Fertilisation in Plants: Double Fertilisation and Seed Formation) and.',
                  misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.' },
                { id: 'b', prompt: 'A student observes a plant with parallel leaf venation, floral parts in multiples of three, and a fibrous root system.', answer: 'The plant is a monocot (parallel venation, trimerous flowers, fibrous roots)',
                  options: ['The plant is a monocot (parallel venation, trimerous flowers, fibrous roots)', 'double fertilization means two sperm fertilize one egg'],
                  hint: 'Revisit c10_bio_cbse_03_007 (Fertilisation in Plants: Double Fertilisation and Seed Formation) and.',
                  misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.' },
                { id: 'c', prompt: 'Compare the post-fertilization development of the ovule in a gymnosperm (e.g., Pinus) and an angiosperm (e.g., Pisum sativum).', answer: 'In Pinus (gymnosperm): ovule is naked on megasporophyll',
                  options: ['In Pinus (gymnosperm): ovule is naked on megasporophyll', 'both have endosperm', 'double fertilization means two sperm fertilize one egg'],
                  hint: 'Revisit c10_bio_cbse_03_007 (Fertilisation in Plants: Double Fertilisation and Seed Formation) and.',
                  misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.' }
          ],
            remediations: { 'double-fertilization-means-two-sperm': { steps: ['Draw the mature embryo sac (Polygonum type) labeling all 7 cells and 8 nuclei with ploidy (n).', 'Simulate pollen tube entry — trace path of two male gametes: one to egg apparatus, one to central cell.', 'Write fusion equations: n (male) + n (egg) = 2n (zygote); n (male) + n (polar nucleus 1) + n (polar nucleus 2) = 3n.', 'Compare with gymnosperm: only n + n = 2n (zygote); female gametophyte remains haploid nutritive tissue.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "All monocots have scattered vascular bundles in the stem and all dicots have vascular bundles in a ring." Identify the error and.', answer: 'The statement is an overgeneralization',
                  options: ['The statement is an overgeneralization', 'double fertilization means two sperm fertilize one egg'],
                  hint: 'Revisit c10_bio_cbse_03_007 (Fertilisation in Plants: Double Fertilisation and Seed Formation) and.',
                  misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.' },
                { id: 'b', prompt: 'Design a simple field observation protocol to distinguish between a dicot and monocot seedling at the 2-leaf stage without uprooting the plant, using only.', answer: 'Protocol: (1) Observe cotyledon number',
                  options: ['Protocol: (1) Observe cotyledon number', 'double fertilization means two sperm fertilize one egg'],
                  hint: 'Revisit c10_bio_cbse_03_007 (Fertilisation in Plants: Double Fertilisation and Seed Formation) and.',
                  misconception: 'Students believe "double fertilization means two sperm fertilize one egg" — they confuse the two male gametes\' targets.' }
          ],
            remediations: { 'double-fertilization-means-two-sperm': { steps: ['Draw the mature embryo sac (Polygonum type) labeling all 7 cells and 8 nuclei with ploidy (n).', 'Simulate pollen tube entry — trace path of two male gametes: one to egg apparatus, one to central cell.', 'Write fusion equations: n (male) + n (egg) = 2n (zygote); n (male) + n (polar nucleus 1) + n (polar nucleus 2) = 3n.', 'Compare with gymnosperm: only n + n = 2n (zygote); female gametophyte remains haploid nutritive tissue.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_008', difficulty: 'standard',
          question: 'Plant life cycles are classified into three patterns based on the ploidy of the.',
          hint: 'Review "Cell Division: Mitosis and Meiosis" (c9_bio_ch1_12) and "Sexual Reproduction.',
          misconception: 'Students often believe "haplodiplontic" means the haploid and diploid phases are isomorphic (similar in morphology and.',
          parts: [
                { id: 'a', prompt: 'Name the type of life cycle exhibited by *Volvox* and state the ploidy of its dominant vegetative colony. At what stage does meiosis occur in this cycle?', answer: '*Volvox* exhibits a haplontic life cycle',
                  options: ['*Volvox* exhibits a haplontic life cycle', 'haplodiplontic', 'the colony is diploid or meiosis occurs during gamete formation'],
                  hint: 'Review "Cell Division: Mitosis and Meiosis" (c9_bio_ch1_12) and "Sexual Reproduction in Flowering.',
                  misconception: 'Students often believe "haplodiplontic" means the haploid and diploid phases are isomorphic (similar in morphology and size) in all groups.' },
                { id: 'b', prompt: 'Explain why bryophytes are called "amphibians of the plant kingdom" in the context of their haplodiplontic life cycle.', answer: 'Bryophytes require water for motile male gametes (antherozoids) to swim to the',
                  options: ['Bryophytes require water for motile male gametes (antherozoids) to swim to the', 'haplodiplontic'],
                  hint: 'Review "Cell Division: Mitosis and Meiosis" (c9_bio_ch1_12) and "Sexual Reproduction in Flowering.',
                  misconception: 'Students often believe "haplodiplontic" means the haploid and diploid phases are isomorphic (similar in morphology and size) in all groups.' },
                { id: 'c', prompt: 'A student observes a fern prothallus under a microscope and sees archegonia and antheridia on the same structure.', answer: 'The prothallus is the haploid (n) gametophyte',
                  options: ['The prothallus is the haploid (n) gametophyte', 'haplodiplontic'],
                  hint: 'Review "Cell Division: Mitosis and Meiosis" (c9_bio_ch1_12) and "Sexual Reproduction in Flowering.',
                  misconception: 'Students often believe "haplodiplontic" means the haploid and diploid phases are isomorphic (similar in morphology and size) in all groups.' },
                { id: 'd', prompt: 'Compare the site and timing of meiosis in the life cycles of *Fucus* (brown alga), *Funaria* (moss), and *Pinus* (gymnosperm).', answer: '| Organism | Life Cycle Type | Stage of Meiosis | Dominant Phase Ploidy |',
                  options: ['| Organism | Life Cycle Type | Stage of Meiosis | Dominant Phase Ploidy |', 'haplodiplontic'],
                  hint: 'Review "Cell Division: Mitosis and Meiosis" (c9_bio_ch1_12) and "Sexual Reproduction in Flowering.',
                  misconception: 'Students often believe "haplodiplontic" means the haploid and diploid phases are isomorphic (similar in morphology and size) in all groups.' }
          ],
            remediations: { 'haplodiplontic-means-the-haploid-and': { steps: ['Revisit the definition of meiosis (reduction division) and mitosis (equational division) from c9_bio_ch1_12.', 'Draw a simple flowchart for each cycle type: Haplontic = Haploid (mitosis) -> Gametes -> Zygote (2n) -> Meiosis ->.', 'Map each plant group studied in nodes 002-007 onto these flowcharts.', 'Practice Exercise 2 from NCERT: "When and where does reduction division take place in the life cycle of a liverwort,.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_03_009', difficulty: 'standard',
          question: 'Economic importance of algae and gymnosperms refers to the direct and indirect.',
          hint: 'If stuck, revisit Table 3.1 in NCERT (node 003) for algal class comparison and Figure 3.4.',
          misconception: 'Students memorize "algin from brown algae, carrageen from red algae" but **fail to understand that these are sulphate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Economic importance of algae and gymnosperms refers to the direct and indirect benefits',
                  options: ['Economic importance of algae and gymnosperms refers to the direct and indirect benefits', 'Cryptogamae and Phanerogamae represent the two major sub-divisions of Kingdom Plantae', 'Algae are chlorophyll-bearing, simple, thalloid, autotrophic, and largely aquatic', 'Chlorophyceae, Phaeophyceae, and Rhodophyceae are the three major classes of algae'],
                  hint: 'If stuck, revisit Table 3.1 in NCERT (node 003) for algal class comparison and Figure 3.4 (node.',
                  misconception: 'Students memorize "algin from brown algae, carrageen from red algae" but **fail to understand that these are sulphate esters.' }
          ],
            remediations: { 'students-memorize-algin-from-brown': { steps: ['**Draw a two-column table:** Left column = "Cell Wall Polysaccharide (Structural, Extracted by Hot Water/Acid)" → Algin.', 'Right column = "Storage Product (Cytoplasmic, Solvent Extraction)" → Laminarin/Mannitol (brown), Floridean Starch.', '**Lab demo:** Boil *Sargassum* in dilute acid → filter → add calcium chloride to filtrate → alginate gel forms (wall.', 'Separately, crush *Sargassum* in alcohol → precipitate → iodine test → laminarin (storage) gives no color (β-1,3.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
