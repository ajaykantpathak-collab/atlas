import type { SimDef } from '../../engine/types';

/** v3 generated — c9_bio_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_bio_ch04_p1: SimDef = {
    id: 'v3_c9_bio_ch04_p1',
    title: 'Biodiversity and Classification · Part 1/2',
    subtitle: 'Variety at three levels, not just a species list',
    classLevel: 9, subject: 'biology', topic: 'Biodiversity and Classification · Part 1/2',
    chapters: ['c9_bio_ch04'],
    nodeIds: ['c9_bio_ch4_1', 'c9_bio_ch4_10', 'c9_bio_ch4_2', 'c9_bio_ch4_3', 'c9_bio_ch4_4', 'c9_bio_ch4_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biodiversity auditor', intro: 'Everyone counts tigers; almost nobody counts grasshoppers, fungi or the genes inside a mango tree. Learn to measure life\'s variety the way ecologists actually do.', goal: 'Understand biodiversity at three levels — genetic, species and ecosystem — and why variety at each level builds resilience against disturbance.' },
    discovery: {
        question: 'A teak plantation has thousands of trees; a Western Ghats forest patch of the same size looks messier but smaller in count. Which is richer in biodiversity?',
        options: ['The forest — biodiversity isn\'t a headcount; it\'s variety at three levels: genes, species and whole ecosystems', 'The plantation — more trees means more life', 'They\'re equal — same area', 'Whichever has the most birds'],
        answer: 'The forest — biodiversity isn\'t a headcount; it\'s variety at three levels: genes, species and whole ecosystems',
        hook: 'Biodiversity isn\'t \'how many species.\' It\'s genes within a species (why some wheat survives drought), species within a habitat, and whole different ecosystems side by side. Lose any level and the system gets fragile.',
    },
    teaching: [
        { title: 'Biodiversity: Definition and Importance', text: 'Biodiversity is the variety of life forms at all levels of biological organisation, including genetic diversity within species, species diversity within ecosystems, and ecosystem diversity across.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_bio_ch4_1', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Audit your school campus at all three levels: map its habitat types, count species in each, then measure variation within one common species — and prove why a farmer\'s single-wheat-variety field is a resilience disaster waiting to happen.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c9_bio_ch4_1', title: 'Biodiversity: Definition and Importance',
          caseStudy: { intro: 'Start by asking students to observe a typical Indian home garden or nearby park: they will see mango trees, hibiscus shrubs, grass, butterflies, earthworms.',
            decisions: [{ prompt: 'Define biodiversity and name its three hierarchical levels.', options: [
                { text: 'Biodiversity is the variety of life at genetic, species, and ecosystem levels', outcome: 'Biodiversity is the variety of life at genetic, species, and ecosystem levels.' },
                { text: 'different plants and animals', outcome: 'Not quite — Students equate biodiversity solely with "number of species" and think a place with many.', reveals: 'students-equate-biodiversity-solely-with' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch4_10', title: 'Extinction: Causes and Conservation Efforts',
          caseStudy: { intro: 'Imagine walking through a forest in central India where your grandparents once saw tigers regularly, but today you find only pugmark casts in a museum.',
            decisions: [{ prompt: 'Define \'extinction\' and distinguish it from \'local extinction (extirpation)\' using a specific Indian example.', options: [
                { text: 'Extinction is the global, permanent loss of a species when the last individual dies', outcome: 'Extinction is the global, permanent loss of a species when the last individual dies (e.g., Indian.' },
                { text: 'conservation means putting animals in zoos or national parks', outcome: 'Not quite — Students believe "conservation means putting animals in zoos or national parks" - they equate.', reveals: 'conservation-means-putting-animals-in' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch4_2', title: 'Evolution: Basic Concept and Evidence',
          caseStudy: { intro: 'Look at your own hand and then at a bat\'s wing, a whale\'s flipper, and a cat\'s forelimb — all have the same basic bone arrangement (humerus, radius, ulna.',
            decisions: [{ prompt: 'Define evolution in biological terms and state one key difference between evolution and metamorphosis.', options: [
                { text: 'Evolution is the change in heritable traits of populations over generations, not changes', outcome: 'Evolution is the change in heritable traits of populations over generations, not changes within.' },
                { text: 'evolution means monkeys turned into humans', outcome: 'Not quite — Students believe "evolution means monkeys turned into humans" or "individual organisms evolve.', reveals: 'evolution-means-monkeys-turned-into' },
                { text: 'individual organisms evolve during their lifetime', outcome: 'Not quite — Students believe "evolution means monkeys turned into humans" or "individual organisms evolve.', reveals: 'evolution-means-monkeys-turned-into' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch4_3', title: 'Need for Classification of Living Organisms',
          caseStudy: { intro: 'Imagine walking into a massive library in Delhi where millions of books are piled randomly on the floor with no shelves, no labels, and no catalog — finding.',
            decisions: [{ prompt: 'List two fundamental problems scientists would face if there were no standardized system for classifying living organisms.', options: [
                { text: 'Correct answer: (1) Inability to uniquely identify and communicate about specific', outcome: 'Correct answer: (1) Inability to uniquely identify and communicate about specific organisms.' },
                { text: 'it would be messy', outcome: 'Not quite — Students often believe classification is primarily about "naming things" or "putting labels.', reveals: 'classification-is-primarily-about-naming' },
                { text: 'hard to study', outcome: 'Not quite — Students often believe classification is primarily about "naming things" or "putting labels.', reveals: 'classification-is-primarily-about-naming' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch4_4', title: 'Classification Criteria: Characteristics Used',
          caseStudy: { intro: 'Imagine you are sorting a pile of mixed dal (lentils), rice, pebbles, and twigs.',
            decisions: [{ prompt: 'State the five fundamental characteristics used as the basis for classifying organisms in the modern five-kingdom system.', options: [
                { text: 'The five fundamental characteristics are: (1) Cell type', outcome: 'The five fundamental characteristics are: (1) Cell type — prokaryotic or eukaryotic, (2) Cellular.' },
                { text: 'habitat (water/land)', outcome: 'Not quite — Students believe that **visible, external morphological similarities (like wings, fins, green.', reveals: 'visible' },
                { text: 'body colour', outcome: 'Not quite — Students believe that **visible, external morphological similarities (like wings, fins, green.', reveals: 'visible' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch4_5', title: 'Five Kingdom Classification: Monera, Protista, Fungi, Plantae, Animalia',
          caseStudy: { intro: 'Observe a drop of pond water from a nearby lake under a microscope—you see tiny moving rods (bacteria), larger blob-like amoebae, and green thread-like algae.',
            decisions: [{ prompt: 'Name the five kingdoms in Whittaker\'s classification and state the primary criterion used to separate Monera from the other four kingdoms.', options: [
                { text: 'The five kingdoms are Monera, Protista, Fungi, Plantae, and Animalia', outcome: 'The five kingdoms are Monera, Protista, Fungi, Plantae, and Animalia.' },
                { text: 'Bacteria', outcome: 'Not quite — Students think "Protista is a kingdom for \'leftovers\' that don\'t fit anywhere else, so it has.', reveals: 'protista-is-a-kingdom-for' },
                { text: '"Bacteria" as a separate kingdom or citing nutrition mode as the main separator', outcome: 'Not quite — Students think "Protista is a kingdom for \'leftovers\' that don\'t fit anywhere else, so it has.', reveals: 'protista-is-a-kingdom-for' }
            ] }] } },
        { type: 'dissect', nodeId: 'c9_bio_ch4_10', title: 'Identify each idea',
          dissect: { specimen: 'Biodiversity and Classification · Part 1/2', spots: [
            { id: 's1', label: 'Biodiversity Definition and Importance', prompt: 'Which idea is this? — Biodiversity is the variety of life forms at all levels of biological organisation.', answer: 'Biodiversity Definition and Importance', options: ['Biodiversity Definition and Importance', 'Extinction Causes and Conservation Efforts', 'Evolution Basic Concept and Evidence', 'Need for Classification of Living Organisms'] },
            { id: 's2', label: 'Extinction Causes and Conservation Efforts', prompt: 'Which idea is this? — Extinction is the irreversible termination of a species when the last living individual.', answer: 'Extinction Causes and Conservation Efforts', options: ['Extinction Causes and Conservation Efforts', 'Biodiversity Definition and Importance', 'Evolution Basic Concept and Evidence', 'Need for Classification of Living Organisms'] },
            { id: 's3', label: 'Evolution Basic Concept and Evidence', prompt: 'Which idea is this? — Evolution is the gradual, cumulative change in the heritable characteristics.', answer: 'Evolution Basic Concept and Evidence', options: ['Evolution Basic Concept and Evidence', 'Biodiversity Definition and Importance', 'Extinction Causes and Conservation Efforts', 'Need for Classification of Living Organisms'] },
            { id: 's4', label: 'Need for Classification of Living Organisms', prompt: 'Which idea is this? — Classification is the scientific process of grouping living organisms into hierarchical.', answer: 'Need for Classification of Living Organisms', options: ['Need for Classification of Living Organisms', 'Biodiversity Definition and Importance', 'Extinction Causes and Conservation Efforts', 'Evolution Basic Concept and Evidence'] },
            { id: 's5', label: 'Classification Criteria Characteristics Used', prompt: 'Which idea is this? — Classification criteria are the fundamental, heritable characteristics — such as cell.', answer: 'Classification Criteria Characteristics Used', options: ['Classification Criteria Characteristics Used', 'Biodiversity Definition and Importance', 'Extinction Causes and Conservation Efforts', 'Evolution Basic Concept and Evidence'] }
          ] } },
        { type: 'case', nodeId: 'c9_bio_ch4_1', title: 'A real-world call',
          caseStudy: { intro: 'A town can build a road through a wetland — cutting commute times for thousands — or around it, costing more and taking longer. The wetland doesn\'t get a vote.',
            decisions: [{ prompt: 'How do you weigh what can\'t speak for itself?', options: [
                { text: 'Build through — people\'s time is the priority', outcome: 'The direct-benefit answer; wetlands\' value is real but invisible until the floods come.' },
                { text: 'Build around — some costs aren\'t on the invoice', outcome: 'The long-view answer; costs more now, protects flood-buffering and habitat nobody priced.' },
                { text: 'Build through but fund wetland restoration elsewhere', outcome: 'The mitigation answer — honest that the original wetland is still lost; offsets work only if actually delivered.' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch4_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A farmer boasts his new field of a single high-yield wheat variety holds \'maximum biodiversity — thousands of living plants.\' Next season a rust disease sweeps it while the neighbouring mixed plot survives.',
            decisions: [{ prompt: 'What did \'thousands of plants\' miss?', options: [
                { text: 'Biodiversity is variety at three levels — genetic, species and ecosystem — not a headcount. One wheat genotype across thousands of plants means near-zero genetic diversity: no resistant variants to buffer the rust, plus lost species diversity, so the field had no resilience.', outcome: 'This uses the three-level definition to explain why a big monoculture is fragile — numbers of individuals are not diversity.' },
                { text: 'The farmer is right — biodiversity counts living things, and his field held more life than the wild hedgerow.', outcome: 'Ten thousand identical plants are one species and one genotype; the diversity that resists shocks lives in variety, not volume.', reveals: 'biodiversity-is-headcount' },
                { text: 'The field failed only because it lacked pesticide — biodiversity would not have changed the outcome.', outcome: 'A mixed, genetically varied field gives the pathogen fewer compatible hosts — resilience is a property of diversity itself, not of spraying.', reveals: 'spray-beats-diversity' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch4_5', title: 'The bigger picture',
          caseStudy: { intro: 'Saving the tiger isn\'t saving the forest. True biodiversity means variety inside every species, across every habitat — that\'s the insurance policy life holds against droughts, pests and change.',
            decisions: [{ prompt: 'What comes next? Biodiversity and Classification · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Biodiversity and Classification · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch4_1', difficulty: 'standard',
          question: 'Biodiversity is the variety of life forms at all levels of biological.',
          hint: 'Revisit c8_bio_ch1_8 (Levels of Organisation) and c6_biology_ch09_006 (Food Chain).',
          misconception: 'Students equate biodiversity solely with "number of species" and think a place with many individuals of few species.',
          parts: [
                { id: 'a', prompt: 'Define biodiversity and name its three hierarchical levels.', answer: 'Biodiversity is the variety of life at genetic, species, and ecosystem levels',
                  options: ['Biodiversity is the variety of life at genetic, species, and ecosystem levels', 'different plants and animals'],
                  hint: 'Revisit c8_bio_ch1_8 (Levels of Organisation) and c6_biology_ch09_006 (Food Chain) to rebuild the.',
                  misconception: 'Students equate biodiversity solely with "number of species" and think a place with many individuals of few species (like a teak plantation.' },
                { id: 'b', prompt: 'A farmer replaces a traditional mixed-crop field (wheat, mustard, chickpea) with a single high-yielding wheat variety.', answer: 'Species diversity drops',
                  options: ['Species diversity drops', 'less crop types'],
                  hint: 'Revisit c8_bio_ch1_8 (Levels of Organisation) and c6_biology_ch09_006 (Food Chain) to rebuild the.',
                  misconception: 'Students equate biodiversity solely with "number of species" and think a place with many individuals of few species (like a teak plantation.' },
                { id: 'c', prompt: 'Compare the biodiversity of a natural Western Ghats forest and a teak plantation of the same area. Which has higher ecosystem diversity and why?', answer: 'The natural forest has higher ecosystem diversity',
                  options: ['The natural forest has higher ecosystem diversity', 'many teak trees'],
                  hint: 'Revisit c8_bio_ch1_8 (Levels of Organisation) and c6_biology_ch09_006 (Food Chain) to rebuild the.',
                  misconception: 'Students equate biodiversity solely with "number of species" and think a place with many individuals of few species (like a teak plantation.' }
          ],
            remediations: { 'students-equate-biodiversity-solely-with': { steps: ['Take the student to two nearby sites: a natural grove and a monoculture plantation (or lawn).', 'Have them record: (1) number of habitat types, (2) number of species in each, (3) visible variations in one common.', 'Guide them to fill a three-column table (Ecosystem, Species, Genetic) for each site.', 'The side-by-side comparison makes the three levels concrete and shows why the monoculture scores low on all three.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_10', difficulty: 'standard',
          question: 'Extinction is the irreversible termination of a species when the last living.',
          hint: 'If stuck, revisit c6_biology_ch09_006 (The Food Chain: Energy Flow in Nature) and draw.',
          misconception: 'Students believe "conservation means putting animals in zoos or national parks" - they equate conservation with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Extinction is the irreversible termination of a species when the last living individual',
                  options: ['Extinction is the irreversible termination of a species when the last living individual', 'Biodiversity is the variety of life forms at all levels of biological organisation,', 'Evolution is the gradual, cumulative change in the heritable characteristics of', 'Classification is the scientific process of grouping living organisms into hierarchical'],
                  hint: 'If stuck, revisit c6_biology_ch09_006 (The Food Chain: Energy Flow in Nature) and draw a complete.',
                  misconception: 'Students believe "conservation means putting animals in zoos or national parks" - they equate conservation with physical containment rather.' }
          ],
            remediations: { 'conservation-means-putting-animals-in': { steps: ['Show a 3-minute video comparing two Indian tiger reserves - one with only boundary protection (high conflict, genetic.', 'Have students map the \'conservation web\' for tigers: legal protection, habitat, prey, corridors, community support.', 'Assign a case study analysis of the Sariska tiger reintroduction (2008 onwards) - why did just releasing tigers into.', 'Students rewrite their definition of conservation to include at least four interacting components beyond \'protected.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_2', difficulty: 'standard',
          question: 'Evolution is the gradual, cumulative change in the heritable characteristics.',
          hint: 'Review c9_bio_ch4_1 (Biodiversity) to re-establish that variation exists at every level.',
          misconception: 'Students believe "evolution means monkeys turned into humans" or "individual organisms evolve during their lifetime.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Evolution is the gradual, cumulative change in the heritable characteristics of',
                  options: ['Evolution is the gradual, cumulative change in the heritable characteristics of', 'Biodiversity is the variety of life forms at all levels of biological organisation,', 'Extinction is the irreversible termination of a species when the last living individual', 'Classification is the scientific process of grouping living organisms into hierarchical'],
                  hint: 'Review c9_bio_ch4_1 (Biodiversity) to re-establish that variation exists at every level — within.',
                  misconception: 'Students believe "evolution means monkeys turned into humans" or "individual organisms evolve during their lifetime." The exact error: they.' }
          ],
            remediations: { 'evolution-means-monkeys-turned-into': { steps: ['Use the "mouse tail-cutting" thought experiment (Weismann, 1891) — cut tails of mice for 20 generations; offspring are.', 'Distinguish somatic cells (body) from germ cells (sperm/egg) — only changes in germ-line DNA are heritable.', 'Show a simple pedigree: a bodybuilder\'s muscles don\'t make their baby muscular.', 'Revisit the definition — evolution = change in *allele frequencies in a population*, not change in an individual\'s.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "evolution means monkeys turned into humans" or "individual organisms evolve during their lifetime.".',
          parts: [
                { id: 'a', prompt: 'Design a simple investigation using only observable features (no DNA) to determine whether the wings of a butterfly and a bat are homologous or analogous.', answer: 'Compare: (1) internal skeleton',
                  options: ['Compare: (1) internal skeleton', 'evolution means monkeys turned into humans', 'individual organisms evolve during their lifetime'],
                  hint: 'Review c9_bio_ch4_1 (Biodiversity) to re-establish that variation exists at every level — within.',
                  misconception: 'Students believe "evolution means monkeys turned into humans" or "individual organisms evolve during their lifetime." The exact error: they.' }
          ],
            remediations: { 'evolution-means-monkeys-turned-into': { steps: ['Use the "mouse tail-cutting" thought experiment (Weismann, 1891) — cut tails of mice for 20 generations; offspring are.', 'Distinguish somatic cells (body) from germ cells (sperm/egg) — only changes in germ-line DNA are heritable.', 'Show a simple pedigree: a bodybuilder\'s muscles don\'t make their baby muscular.', 'Revisit the definition — evolution = change in *allele frequencies in a population*, not change in an individual\'s.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_3', difficulty: 'standard',
          question: 'Classification is the scientific process of grouping living organisms into.',
          hint: 'Revisit c9_bio_ch4_1 (Biodiversity: Definition and Importance) and c8_bio_ch1_9.',
          misconception: 'Students often believe classification is primarily about "naming things" or "putting labels on organisms" — a static.',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab discovers an unknown insect damaging wheat crops.', answer: 'Correct answer: Classification groups organisms with shared characteristics',
                  options: ['Correct answer: Classification groups organisms with shared characteristics', 'the scientist knew the name', 'naming things', 'putting labels on organisms'],
                  hint: 'Revisit c9_bio_ch4_1 (Biodiversity: Definition and Importance) and c8_bio_ch1_9 (Microorganisms.',
                  misconception: 'Students often believe classification is primarily about "naming things" or "putting labels on organisms" — a static filing system.' }
          ],
            remediations: { 'classification-is-primarily-about-naming': { steps: ['Give the student 15 diverse leaves (neem, mango, peepal, banyan, tulsi, mint, coriander, curry leaf, spinach, grass).', 'Ask them to sort into groups *without* using names — only observable traits (venation, margin, texture, smell).', 'Have them explain their grouping logic.', 'Reveal the botanical families (e.g., neem & bakain = Meliaceae; mint, tulsi, basil = Lamiaceae — all have square stems.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_4', difficulty: 'standard',
          question: 'Classification criteria are the fundamental, heritable characteristics — such.',
          hint: 'If stuck, revisit **c8_bio_ch1_3 (Cell: Basic Unit of Life)** for cell types and.',
          misconception: 'Students believe that **visible, external morphological similarities (like wings, fins, green colour, or habitat) are.',
          parts: [
                { id: 'a', prompt: 'State the five fundamental characteristics used as the basis for classifying organisms in the modern five-kingdom system.', answer: 'The five fundamental characteristics are: (1) Cell type',
                  options: ['The five fundamental characteristics are: (1) Cell type', 'habitat (water/land)', 'body colour', 'presence of wings'],
                  hint: 'If stuck, revisit **c8_bio_ch1_3 (Cell: Basic Unit of Life)** for cell types and **c7_bio_ch03_002.',
                  misconception: 'Students believe that **visible, external morphological similarities (like wings, fins, green colour, or habitat) are the primary basis for.' },
                { id: 'b', prompt: 'A student observes a green, slimy growth on a damp wall. It is unicellular, has a cell wall, and performs photosynthesis.', answer: 'Step 1: Identify observed traits',
                  options: ['Step 1: Identify observed traits', 'it\'s green and makes food'],
                  hint: 'If stuck, revisit **c8_bio_ch1_3 (Cell: Basic Unit of Life)** for cell types and **c7_bio_ch03_002.',
                  misconception: 'Students believe that **visible, external morphological similarities (like wings, fins, green colour, or habitat) are the primary basis for.' }
          ],
            remediations: { 'visible': { steps: ['**Concrete observation** — Give the student three pictures: a bat skeleton, a bird skeleton, a butterfly wing.', '**Connect to criteria** — Explain that *bone structure* (internal morphology) reflects common ancestry (tetrapod.', '**Apply hierarchy** — List the five criteria on cards. Have the student sort the cards from "most fundamental".', '**Verbalize rule** — "Classification uses traits that are *hard to change* (cell type, body plan) over traits that.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_5', difficulty: 'standard',
          question: 'The Five Kingdom Classification is a phylogenetic system proposed by R.H.',
          hint: 'Revisit c8_bio_ch1_3 (cell structure) and c9_bio_ch4_4 (classification criteria) with.',
          misconception: 'Students think "Protista is a kingdom for \'leftovers\' that don\'t fit anywhere else, so it has no defining features.".',
          parts: [
                { id: 'a', prompt: 'Name the five kingdoms in Whittaker\'s classification and state the primary criterion used to separate Monera from the other four kingdoms.', answer: 'The five kingdoms are Monera, Protista, Fungi, Plantae, and Animalia',
                  options: ['The five kingdoms are Monera, Protista, Fungi, Plantae, and Animalia', 'Bacteria', '"Bacteria" as a separate kingdom or citing nutrition mode as the main separator'],
                  hint: 'Revisit c8_bio_ch1_3 (cell structure) and c9_bio_ch4_4 (classification criteria) with labeled.',
                  misconception: 'Students think "Protista is a kingdom for \'leftovers\' that don\'t fit anywhere else, so it has no defining features." They memorize examples.' }
          ],
            remediations: { 'protista-is-a-kingdom-for': { steps: ['Have the student make a three-column table with headers "Cell Structure", "Body Organization", "Nutrition Mode" and.', 'Give 5 unnamed organism descriptions (e.g., "unicellular, eukaryotic, photosynthetic, flagellated") and ask the student.', 'Discuss why "leftovers" is wrong—Protista shares the positive trait of lacking tissue-level organization, which is.', 'Re-test with Sargassum (multicellular, eukaryotic, photosynthetic, no tissues) → Plantae, not Protista.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
