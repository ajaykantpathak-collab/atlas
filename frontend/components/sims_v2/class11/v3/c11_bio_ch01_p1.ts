import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch01_p1: SimDef = {
    id: 'v3_c11_bio_ch01_p1',
    title: 'The Living World · Part 1/2',
    subtitle: 'Decide what actually counts as \'living\' when growth and movement can be faked.',
    classLevel: 11, subject: 'biology', topic: 'The Living World · Part 1/2',
    chapters: ['c11_bio_ch01'],
    nodeIds: ['c11_bio_cbse_01_001', 'c11_bio_cbse_01_002', 'c11_bio_cbse_01_003', 'c11_bio_cbse_01_004', 'c11_bio_cbse_01_005', 'c11_bio_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a researcher vetting a strange entity found in a hydrothermal vent', intro: 'Your Mars-rover-style probe just flagged something that grows and metabolises but can\'t reproduce alone. Before you announce \'life\', you\'d better define it.', goal: 'Apply the defining characteristics of life — cellular organisation, metabolism, growth, reproduction, response, adaptation — to classify ambiguous cases.' },
    discovery: {
        question: 'A dried raisin swells when dropped in water, a salt crystal grows in a saturated solution, and fire spreads while consuming oxygen. A classmate argues all three are \'alive\' because they grow and respond. Which single criterion separates the sprouting moong seed from all three impostors?',
        options: ['Its size increase comes from new protoplasm made by metabolism inside cells, not passive addition from outside', 'It is green, and only green things are alive', 'It moves faster than a crystal or a flame', 'It is larger than the other three'],
        answer: 'Its size increase comes from new protoplasm made by metabolism inside cells, not passive addition from outside',
        hook: 'Life isn\'t one visible property — it\'s a package of cellular organisation, metabolism, and self-driven growth that must all be present together.',
    },
    teaching: [
        { title: 'What is Living: Characteristics of Living Organisms', text: 'Living organisms are self-sustaining, thermodynamically open systems characterized by cellular organization, metabolism (catabolism and anabolism), homeostasis, growth through intracellular.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_01_001', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Given a lineup of borderline cases — a virus, a frozen bacterium, a prion, a flame, a germinating seed — sort each as living, non-living, or borderline by checking all the defining characteristics, not just the obvious one.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_01_001', title: 'What is Living: Characteristics of Living Organisms',
          caseStudy: { intro: 'Observe a sprouting moong dal seed on your kitchen counter versus a salt crystal growing in a saturated solution — both increase in size, yet only one.',
            decisions: [{ prompt: 'List the seven defining characteristics of living organisms as per Class 11 NCERT, using the exact biological terminology for each.', options: [
                { text: 'The seven characteristics are: (1) Cellular organization, (2) Metabolism (sum of', outcome: 'The seven characteristics are: (1) Cellular organization, (2) Metabolism (sum of anabolism and.' },
                { text: 'movement, breathing, growth', outcome: 'Not quite — Students equate "movement" with life (e.g., "fire moves, so it\'s alive") or "growth" with any size.', reveals: 'students-equate-movement-with-life' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_01_002', title: 'Growth, Reproduction and Metabolism',
          caseStudy: { intro: 'Observe a germinating moong bean (green gram) on your kitchen counter over three days - the radicle elongates, cotyledons expand, and tiny root hairs appear.',
            decisions: [{ prompt: 'Define metabolism in a living organism and state why the sum of anabolic and catabolic reactions must be considered together, not.', options: [
                { text: 'Metabolism is the sum total of all enzyme-catalyzed biochemical reactions (anabolism -', outcome: 'Metabolism is the sum total of all enzyme-catalyzed biochemical reactions (anabolism - building.' },
                { text: 'breaking down food for energy', outcome: 'Not quite — Students believe "growth = increase in size/weight" and equate it with non-living accretion.', reveals: 'growth-increase-in-size-weight' },
                { text: 'growth = increase in size/weight', outcome: 'Not quite — Students believe "growth = increase in size/weight" and equate it with non-living accretion.', reveals: 'growth-increase-in-size-weight' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_01_003', title: 'Cellular Organisation and Consciousness',
          caseStudy: { intro: 'Observe a drop of stagnant pond water under a microscope — you see Paramecium, a single cell performing feeding, movement, and reproduction all by itself.',
            decisions: [{ prompt: 'Define cellular organisation and consciousness as two defining characteristics of living organisms.', options: [
                { text: 'Cellular organisation: All living organisms are composed of cells arranged hierarchically', outcome: 'Cellular organisation: All living organisms are composed of cells arranged hierarchically.' },
                { text: 'cellular organisation means having a nucleus', outcome: 'Not quite — Students equate "cellular organisation" with merely "being made of cells" — they miss that.', reveals: 'students-equate-cellular-organisation-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_01_004', title: 'Diversity in the Living World: Need for Classification',
          caseStudy: { intro: 'Imagine you visit a vegetable market in Delhi and hear vendors calling cauliflower "phool gobhi," "cauliflower," and "bandh gobhi" interchangeably — yet.',
            decisions: [{ prompt: 'State the fundamental difference between taxonomy and systematics as defined in modern biology, and explain why this distinction matters.', options: [
                { text: 'Taxonomy is the science of identification, nomenclature, and classification of organisms', outcome: 'Taxonomy is the science of identification, nomenclature, and classification of organisms.' },
                { text: 'they are the same', outcome: 'Not quite — Students believe classification is primarily about "arranging organisms into neat boxes" based.', reveals: 'classification-is-primarily-about-arranging' },
                { text: 'systematics is just naming', outcome: 'Not quite — Students believe classification is primarily about "arranging organisms into neat boxes" based.', reveals: 'classification-is-primarily-about-arranging' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_01_005', title: 'Taxonomic Hierarchy: Kingdom to Species',
          caseStudy: { intro: 'Imagine you find an unfamiliar flowering plant in the Western Ghats — it has opposite leaves, square stem, and bilabiate flowers.',
            decisions: [{ prompt: 'Define the term \'taxon\' and give one example each of a taxon at the level of Family, Genus, and Species for a plant and an animal.', options: [
                { text: 'A taxon (plural: taxa) is any taxonomic group of any rank that represents a real', outcome: 'A taxon (plural: taxa) is any taxonomic group of any rank that represents a real biological entity.' },
                { text: '\'mammals\' as a family or \'dog\' as a species', outcome: 'Not quite — Students believe that \'Species\' is defined solely by morphological similarity and that members of.', reveals: 'species-is-defined-solely-by' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_01_006', title: 'Taxonomic Aids: Herbaria, Botanical Gardens, Museums',
          caseStudy: { intro: 'Imagine you find an unusual flowering shrub during a trek in the Western Ghats.',
            decisions: [{ prompt: 'What is the primary purpose of a herbarium in taxonomic studies, and what critical information must be included on its label?', options: [
                { text: 'A herbarium provides a permanent, dried, pressed plant specimen that serves as a voucher', outcome: 'A herbarium provides a permanent, dried, pressed plant specimen that serves as a voucher for.' },
                { text: 'the label only needs the common name or omitting locality data', outcome: 'Not quite — Students often think a botanical garden is merely a public park for recreation and that any planted.', reveals: 'a-botanical-garden-is-merely' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_01_002', title: 'Identify each idea',
          dissect: { specimen: 'The Living World · Part 1/2', spots: [
            { id: 's1', label: 'What is Living Characteristics of Living Organisms', prompt: 'Which idea is this? — Living organisms are self-sustaining, thermodynamically open systems characterized.', answer: 'What is Living Characteristics of Living Organisms', options: ['What is Living Characteristics of Living Organisms', 'Growth Reproduction and Metabolism', 'Cellular Organisation and Consciousness', 'Diversity in the Living World Need for Classification'] },
            { id: 's2', label: 'Growth Reproduction and Metabolism', prompt: 'Which idea is this? — Growth in living organisms is an irreversible increase in mass and number of cells.', answer: 'Growth Reproduction and Metabolism', options: ['Growth Reproduction and Metabolism', 'What is Living Characteristics of Living Organisms', 'Cellular Organisation and Consciousness', 'Diversity in the Living World Need for Classification'] },
            { id: 's3', label: 'Cellular Organisation and Consciousness', prompt: 'Which idea is this? — Cellular organisation is the defining structural hierarchy of life where cells (the basic.', answer: 'Cellular Organisation and Consciousness', options: ['Cellular Organisation and Consciousness', 'What is Living Characteristics of Living Organisms', 'Growth Reproduction and Metabolism', 'Diversity in the Living World Need for Classification'] },
            { id: 's4', label: 'Diversity in the Living World Need for Classification', prompt: 'Which idea is this? — Classification is the scientific process of grouping organisms into hierarchical.', answer: 'Diversity in the Living World Need for Classification', options: ['Diversity in the Living World Need for Classification', 'What is Living Characteristics of Living Organisms', 'Growth Reproduction and Metabolism', 'Cellular Organisation and Consciousness'] },
            { id: 's5', label: 'Taxonomic Hierarchy Kingdom to Species', prompt: 'Which idea is this? — Taxonomic hierarchy is the systematic arrangement of organisms into a ranked series.', answer: 'Taxonomic Hierarchy Kingdom to Species', options: ['Taxonomic Hierarchy Kingdom to Species', 'What is Living Characteristics of Living Organisms', 'Growth Reproduction and Metabolism', 'Cellular Organisation and Consciousness'] },
            { id: 's6', label: 'Taxonomic Aids Herbaria Botanical Gardens Museums', prompt: 'Which idea is this? — Taxonomic aids are standardized tools and repositories—specifically herbaria (collections.', answer: 'Taxonomic Aids Herbaria Botanical Gardens Museums', options: ['Taxonomic Aids Herbaria Botanical Gardens Museums', 'What is Living Characteristics of Living Organisms', 'Growth Reproduction and Metabolism', 'Cellular Organisation and Consciousness'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a school debate on \'What is life?\', your opponent argues fire is alive: it moves, grows by spreading, consumes oxygen, and produces \'offspring\' sparks. She challenges you: \'Name one living characteristic fire lacks.\'',
            decisions: [{ prompt: 'What\'s the winning counterargument?', options: [
                { text: 'Fire only mimics life at the surface: its \'respiration\' is uncontrolled oxidation with no enzymes or ATP coupling, its \'growth\' is thermal diffusion not cellular accretion, and its \'reproduction\' is fragmentation with no genetic inheritance. Life is a syndrome — cellular organisation, metabolism, homeostasis, heredity — where each process runs through molecular machinery fire doesn\'t have.', outcome: 'Analogical resemblance is not homological equivalence: what matters is the mechanism underneath each characteristic.' },
                { text: 'Concede — fire shows movement, growth, energy use and reproduction, so by the checklist it\'s alive.', outcome: 'The checklist tests mechanism, not resemblance; fire fails every criterion once you ask how each process is carried out.', reveals: 'surface-traits-equal-life' },
                { text: 'Fire isn\'t alive only because it can\'t move from place to place on its own — movement is the decisive test.', outcome: 'Movement alone is a weak criterion (streams move, rooted plants don\'t); the full syndrome of cellular, metabolic, hereditary traits is what defines life.', reveals: 'movement-defines-life' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You stopped judging life by surface resemblance and started checking mechanism. That shift — process versus mechanism — is the whole first lesson of Class 11 biology.',
            decisions: [{ prompt: 'What comes next? The Living World · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Living World · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_001', difficulty: 'standard',
          question: 'Living organisms are self-sustaining, thermodynamically open systems.',
          hint: 'Revisit c9_bio_ch1_2 (Cell Theory postulates) and c10_bio_cbse_01_001 (Life Processes.',
          misconception: 'Students equate "movement" with life (e.g., "fire moves, so it\'s alive") or "growth" with any size increase (crystal.',
          parts: [
                { id: 'a', prompt: 'List the seven defining characteristics of living organisms as per Class 11 NCERT, using the exact biological terminology for each.', answer: 'The seven characteristics are: (1) Cellular organization, (2) Metabolism (sum of',
                  options: ['The seven characteristics are: (1) Cellular organization, (2) Metabolism (sum of', 'movement, breathing, growth'],
                  hint: 'Revisit c9_bio_ch1_2 (Cell Theory postulates) and c10_bio_cbse_01_001 (Life Processes overview).',
                  misconception: 'Students equate "movement" with life (e.g., "fire moves, so it\'s alive") or "growth" with any size increase (crystal, raisin).' },
                { id: 'b', prompt: 'A dried raisin placed in water swells up due to osmosis. A student argues this proves the raisin is alive because it shows "growth" and "response.', answer: 'The raisin exhibits *physical* swelling (imbibition), not biological growth',
                  options: ['The raisin exhibits *physical* swelling (imbibition), not biological growth', 'it\'s a dead fruit'],
                  hint: 'Revisit c9_bio_ch1_2 (Cell Theory postulates) and c10_bio_cbse_01_001 (Life Processes overview).',
                  misconception: 'Students equate "movement" with life (e.g., "fire moves, so it\'s alive") or "growth" with any size increase (crystal, raisin).' },
                { id: 'c', prompt: 'Compare and contrast "growth in a living organism" versus "growth in a crystal" by analyzing the underlying mechanisms at molecular, cellular, and systemic.', answer: '**Molecular**: Living',
                  options: ['**Molecular**: Living', 'crystals grow externally, organisms internally'],
                  hint: 'Revisit c9_bio_ch1_2 (Cell Theory postulates) and c10_bio_cbse_01_001 (Life Processes overview).',
                  misconception: 'Students equate "movement" with life (e.g., "fire moves, so it\'s alive") or "growth" with any size increase (crystal, raisin).' }
          ],
            remediations: { 'students-equate-movement-with-life': { steps: ['Have student observe yeast fermentation (sugar + yeast → CO₂ bubbles) vs. vinegar + baking soda (CO₂ bubbles).', 'Ask: "Both produce gas. Why is only yeast alive?" Guide them to identify: yeast shows *enzyme-catalyzed* metabolic.', 'Contrast with vinegar reaction: no cells, no enzymes, no reproduction, no homeostasis.', 'Generalize: "Life = coordinated, enzyme-mediated, genetically encoded processes within a bounded cellular system.".'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate "movement" with life (e.g., "fire moves, so it\'s alive") or "growth" with any size increase (crystal.',
          parts: [
                { id: 'a', prompt: 'A research team discovers a novel entity in a hydrothermal vent: it has a lipid membrane, RNA genome, ribosomes, and performs ATP-driven peptide synthesis, but.', answer: 'Judgment: Borderline / "life-like" but not fully living',
                  options: ['Judgment: Borderline / "life-like" but not fully living', 'living because it has metabolism and RNA'],
                  hint: 'Revisit c9_bio_ch1_2 (Cell Theory postulates) and c10_bio_cbse_01_001 (Life Processes overview).',
                  misconception: 'Students equate "movement" with life (e.g., "fire moves, so it\'s alive") or "growth" with any size increase (crystal, raisin).' }
          ],
            remediations: { 'students-equate-movement-with-life': { steps: ['Have student observe yeast fermentation (sugar + yeast → CO₂ bubbles) vs. vinegar + baking soda (CO₂ bubbles).', 'Ask: "Both produce gas. Why is only yeast alive?" Guide them to identify: yeast shows *enzyme-catalyzed* metabolic.', 'Contrast with vinegar reaction: no cells, no enzymes, no reproduction, no homeostasis.', 'Generalize: "Life = coordinated, enzyme-mediated, genetically encoded processes within a bounded cellular system.".'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_002', difficulty: 'standard',
          question: 'Growth in living organisms is an irreversible increase in mass and number.',
          hint: 'If stuck on ATP-yield connection to growth, revisit c10_bio_cbse_01_007 (Respiration.',
          misconception: 'Students believe "growth = increase in size/weight" and equate it with non-living accretion (crystal, snowball).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Growth in living organisms is an irreversible increase in mass and number of cells',
                  options: ['Growth in living organisms is an irreversible increase in mass and number of cells', 'Living organisms are self-sustaining, thermodynamically open systems characterized by', 'Cellular organisation is the defining structural hierarchy of life where cells (the basic', 'Classification is the scientific process of grouping organisms into hierarchical'],
                  hint: 'If stuck on ATP-yield connection to growth, revisit c10_bio_cbse_01_007 (Respiration: Aerobic.',
                  misconception: 'Students believe "growth = increase in size/weight" and equate it with non-living accretion (crystal, snowball).' }
          ],
            remediations: { 'growth-increase-in-size-weight': { steps: ['Revisit Class 9 meristematic tissue concept (c9_bio_ch2_2) - observe onion root tip mitosis slide; identify that growth.', 'Perform simple experiment - weigh dry moong seeds, sprout for 3 days, weigh dry mass again. Calculate % increase.', 'Draw concept map linking "Growth" -> "Cell Division (Mitosis)" -> "Requires ATP" -> "From Metabolism (Catabolism)" ->.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_003', difficulty: 'standard',
          question: 'Cellular organisation is the defining structural hierarchy of life where cells.',
          hint: 'Revisit Class 9 Cell Theory (c9_bio_ch1_2) and Levels of Organisation (c8_bio_ch1_8).',
          misconception: 'Students equate "cellular organisation" with merely "being made of cells" — they miss that it specifically means.',
          parts: [
                { id: 'a', prompt: 'A student says: "Amoeba and human both show cellular organisation because both are made of cells." Explain why this statement is incomplete.', answer: 'The statement misses division of labour and hierarchical organisation',
                  options: ['The statement misses division of labour and hierarchical organisation', 'both have cell membrane'],
                  hint: 'Revisit Class 9 Cell Theory (c9_bio_ch1_2) and Levels of Organisation (c8_bio_ch1_8) — draw the.',
                  misconception: 'Students equate "cellular organisation" with merely "being made of cells" — they miss that it specifically means HIERARCHICAL organisation.' }
          ],
            remediations: { 'students-equate-cellular-organisation-with': { steps: ['Revisit Class 9 Cell Theory (c9_bio_ch1_2): Write the 3 postulates and identify which applies to unicellular.', 'Draw a 5-level hierarchy diagram for a mango tree (cell: parenchyma → tissue: xylem → organ: root → system: root system.', 'Perform the Mimosa pudica touch test (Diagnostic Q6) and simultaneously test your knee-jerk reflex (Class 10.', 'Complete the comparison table: Stimulus | Receptor | Signal Type | Effector | Speed for both.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_004', difficulty: 'standard',
          question: 'Classification is the scientific process of grouping organisms into.',
          hint: 'Revisit Class 9 "Need for Classification" (c9_bio_ch4_3) and "Biodiversity: Definition.',
          misconception: 'Students believe classification is primarily about "arranging organisms into neat boxes" based on overall similarity.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since DNA sequencing can now determine evolutionary relationships directly, the traditional taxonomic hierarchy (kingdom, phylum, class...).', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'arranging organisms into neat boxes'],
                  hint: 'Revisit Class 9 "Need for Classification" (c9_bio_ch4_3) and "Biodiversity: Definition and.',
                  misconception: 'Students believe classification is primarily about "arranging organisms into neat boxes" based on overall similarity (phenetics).' },
                { id: 'b', prompt: 'You discover a new flowering plant in the Western Ghats with these traits: vascular tissue present, seeds enclosed in ovary, two cotyledons, reticulate leaf.', answer: 'Lowest confident rank: Class Dicotyledonae (or Eudicots)',
                  options: ['Lowest confident rank: Class Dicotyledonae (or Eudicots)', 'it\'s a Lamiaceae', 'arranging organisms into neat boxes'],
                  hint: 'Revisit Class 9 "Need for Classification" (c9_bio_ch4_3) and "Biodiversity: Definition and.',
                  misconception: 'Students believe classification is primarily about "arranging organisms into neat boxes" based on overall similarity (phenetics).' },
                { id: 'c', prompt: 'Compare the taxonomic resolution achieved by: (a) morphological classification used by Linnaeus, (b) five-kingdom classification (Whittaker, 1969), and (c).', answer: 'morphological classification used by Linnaeus, (',
                  options: ['morphological classification used by Linnaeus, (', 'better/worse', 'arranging organisms into neat boxes'],
                  hint: 'Revisit Class 9 "Need for Classification" (c9_bio_ch4_3) and "Biodiversity: Definition and.',
                  misconception: 'Students believe classification is primarily about "arranging organisms into neat boxes" based on overall similarity (phenetics).' }
          ],
            remediations: { 'classification-is-primarily-about-arranging': { steps: ['Show a cladogram of vertebrates highlighting that "fish" is paraphyletic (excludes tetrapods).', 'Ask: "If classification grouped by swimming, where do penguins, ichthyosaurs, and dolphins go?"', 'Contrast with "mammary glands + three ear bones" — a synapomorphy uniting whales, bats, humans.', 'Assign reading: NCERT Box 1.1 (Ernst Mayr) — he defined species as "groups of actually or potentially interbreeding.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_005', difficulty: 'standard',
          question: 'Taxonomic hierarchy is the systematic arrangement of organisms into a ranked.',
          hint: 'Review c9_bio_ch4_7 (Hierarchy of Classification) and c9_bio_ch4_8 (Binomial.',
          misconception: 'Students believe that \'Species\' is defined solely by morphological similarity and that members of a species cannot.',
          parts: [
                { id: 'a', prompt: 'Define the term \'taxon\' and give one example each of a taxon at the level of Family, Genus, and Species for a plant and an animal.', answer: 'A taxon (plural: taxa) is any taxonomic group of any rank that represents a real',
                  options: ['A taxon (plural: taxa) is any taxonomic group of any rank that represents a real', '\'mammals\' as a family or \'dog\' as a species'],
                  hint: 'Review c9_bio_ch4_7 (Hierarchy of Classification) and c9_bio_ch4_8 (Binomial Nomenclature) — focus.',
                  misconception: 'Students believe that \'Species\' is defined solely by morphological similarity and that members of a species cannot interbreed with other.' },
                { id: 'b', prompt: 'A student classifies the housefly (*Musca domestica*) as: Kingdom Animalia, Phylum Arthropoda, Class Insecta, Order Diptera, Family Muscidae, Genus *Musca*.', answer: 'Phylum (animals) vs Division (plants)',
                  options: ['Phylum (animals) vs Division (plants)', '\'Class differs\' or \'both words capitalised\''],
                  hint: 'Review c9_bio_ch4_7 (Hierarchy of Classification) and c9_bio_ch4_8 (Binomial Nomenclature) — focus.',
                  misconception: 'Students believe that \'Species\' is defined solely by morphological similarity and that members of a species cannot interbreed with other.' }
          ],
            remediations: { 'species-is-defined-solely-by': { steps: ['Revisit c9_bio_ch4_7 (Hierarchy of Classification) and c9_bio_ch4_8 (Binomial Nomenclature) — specifically the.', 'Use Table 1.1 (NCERT) to trace *Homo sapiens* and *Mangifera indica* through all seven categories, writing one.', 'Practice with three new organisms (e.g., *Azadirachta indica* neem, *Pavo cristatus* peacock, *Escherichia coli*) using.', 'Explain aloud why \'Phylum\' is used for animals but \'Division\' for plants — this terminology difference is a frequent.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_01_006', difficulty: 'standard',
          question: 'Taxonomic aids are standardized tools and repositories—specifically herbaria.',
          hint: 'Revisit the taxonomic hierarchy (node c11_bio_cbse_01_005) and the need for.',
          misconception: 'Students often think a botanical garden is merely a public park for recreation and that any planted tree qualifies as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Taxonomic aids are standardized tools and repositories—specifically herbaria (collections',
                  options: ['Taxonomic aids are standardized tools and repositories—specifically herbaria (collections', 'Living organisms are self-sustaining, thermodynamically open systems characterized by', 'Growth in living organisms is an irreversible increase in mass and number of cells', 'Cellular organisation is the defining structural hierarchy of life where cells (the basic'],
                  hint: 'Revisit the taxonomic hierarchy (node c11_bio_cbse_01_005) and the need for classification (node.',
                  misconception: 'Students often think a botanical garden is merely a public park for recreation and that any planted tree qualifies as a taxonomic.' }
          ],
            remediations: { 'a-botanical-garden-is-merely': { steps: ['If a student cannot distinguish the three aids, have them physically visit (or virtually tour) a university herbarium.', 'Task: locate a single species (e.g., *Azadirachta indica*) in all three—examine the pressed leaf and flower on the.', 'Then write a one-page comparison of what unique taxonomic data each provided.', 'This concrete multi-aid encounter cements the complementary roles.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
