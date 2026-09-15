import type { SimDef } from '../../engine/types';

/** v3 generated — c9_bio_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_bio_ch04_p2: SimDef = {
    id: 'v3_c9_bio_ch04_p2',
    title: 'Biodiversity and Classification · Part 2/2',
    subtitle: 'Variety at three levels, not just a species list',
    classLevel: 9, subject: 'biology', topic: 'Biodiversity and Classification · Part 2/2',
    chapters: ['c9_bio_ch04'],
    nodeIds: ['c9_bio_ch4_6', 'c9_bio_ch4_7', 'c9_bio_ch4_8', 'c9_bio_ch4_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a biodiversity auditor', intro: 'Everyone counts tigers; almost nobody counts grasshoppers, fungi or the genes inside a mango tree. Learn to measure life\'s variety the way ecologists actually do.', goal: 'Understand biodiversity at three levels — genetic, species and ecosystem — and why variety at each level builds resilience against disturbance.' },
    discovery: {
        question: 'A teak plantation has thousands of trees; a Western Ghats forest patch of the same size looks messier but smaller in count. Which is richer in biodiversity?',
        options: ['The forest — biodiversity isn\'t a headcount; it\'s variety at three levels: genes, species and whole ecosystems', 'The plantation — more trees means more life', 'They\'re equal — same area', 'Whichever has the most birds'],
        answer: 'The forest — biodiversity isn\'t a headcount; it\'s variety at three levels: genes, species and whole ecosystems',
        hook: 'Biodiversity isn\'t \'how many species.\' It\'s genes within a species (why some wheat survives drought), species within a habitat, and whole different ecosystems side by side. Lose any level and the system gets fragile.',
    },
    teaching: [
        { title: 'Adaptations: Structural and Behavioural', text: 'Adaptation is a heritable structural, behavioural, or physiological trait that enhances an organism\'s ability to survive and reproduce in its specific environment.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_bio_ch4_6', title: 'Your mission',
          mission: { widget: 'cell', validate: 'cell:zoom=70',
            instruction: 'On the lab: zoom into the cell to 70% — what organelles appear?.',
        context: 'Audit your school campus at all three levels: map its habitat types, count species in each, then measure variation within one common species — and prove why a farmer\'s single-wheat-variety field is a resilience disaster waiting to happen.',
            observePrompt: 'What did the cell interactive show you?' } },
        { type: 'case', nodeId: 'c9_bio_ch4_6', title: 'Adaptations: Structural and Behavioural',
          caseStudy: { intro: 'Imagine standing in the Thar Desert at noon: the ground is scorching, yet a Desert Jird darts across the sand on long hind legs, while a cactus stands leafless.',
            decisions: [{ prompt: 'Define structural adaptation and give one example from an Indian animal, explaining the environmental challenge it addresses.', options: [
                { text: 'A structural adaptation is a physical, heritable feature of an organism\'s body that', outcome: 'A structural adaptation is a physical, heritable feature of an organism\'s body that enhances.' },
                { text: 'camel sits down to avoid sun', outcome: 'Not quite — Students frequently believe adaptations arise because an organism *needs* a trait and *acquires*.', reveals: 'students-frequently-believe-adaptations-arise' },
                { text: 'describes a behaviour (e', outcome: 'Not quite — Students frequently believe adaptations arise because an organism *needs* a trait and *acquires*.', reveals: 'students-frequently-believe-adaptations-arise' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch4_7', title: 'Hierarchy of Classification: Kingdom to Species',
          caseStudy: { intro: 'Start with a familiar observation: when you organize your school notebooks, you first separate by subject (Science, Math, Languages), then by class (Class 9.',
            decisions: [{ prompt: 'What are the seven major taxonomic ranks in the hierarchical classification system, listed from broadest to most specific?', options: [
                { text: 'The seven major ranks in order are: Kingdom, Phylum, Class, Order, Family, Genus, Species', outcome: 'The seven major ranks in order are: Kingdom, Phylum, Class, Order, Family, Genus, Species.' },
                { text: 'Domain', outcome: 'Not quite — Students believe that organisms in the same Kingdom (e.g., all animals) are "basically the same".', reveals: 'organisms-in-the-same-kingdom' },
                { text: 'basically the same', outcome: 'Not quite — Students believe that organisms in the same Kingdom (e.g., all animals) are "basically the same".', reveals: 'organisms-in-the-same-kingdom' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch4_8', title: 'Binomial Nomenclature: Genus and Species Names',
          caseStudy: { intro: 'Imagine you are at a market in Kerala and hear "Mathi" for a fish, while in Bengal the same fish is called "Mourala" and in Maharashtra "Bangda" – common names.',
            decisions: [{ prompt: 'What are the two components of a binomial scientific name and how are they formatted according to international rules?', options: [
                { text: 'The two components are the genus name (capitalized) and the specific epithet (lowercase),', outcome: 'The two components are the genus name (capitalized) and the specific epithet (lowercase), both.' },
                { text: 'both words capitalized', outcome: 'Not quite — Students often think the specific epithet alone (e.g., \'indica\') is the species name and can stand.', reveals: 'the-specific-epithet-alone-e' },
                { text: 'only the first word italicized', outcome: 'Not quite — Students often think the specific epithet alone (e.g., \'indica\') is the species name and can stand.', reveals: 'the-specific-epithet-alone-e' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch4_9', title: 'Fossils: Formation and Significance in Evolution',
          caseStudy: { intro: 'Imagine you are trekking in the Siwalik Hills near Dehradun and spot a spiral-shaped shell embedded in a rock layer high above the current river level.',
            decisions: [{ prompt: 'Define fossilization and name the most common geological setting where it occurs.', options: [
                { text: 'Fossilization is the process by', outcome: 'Fossilization is the process by which organic remains are preserved over geological time through.' },
                { text: 'fossils form in volcanic rock', outcome: 'Not quite — Students believe fossils are the actual original bones/shells turned to stone ("petrified" = turned.', reveals: 'fossils-are-the-actual-original' },
                { text: 'fossils are just old bones', outcome: 'Not quite — Students believe fossils are the actual original bones/shells turned to stone ("petrified" = turned.', reveals: 'fossils-are-the-actual-original' }
            ] }] } },
        { type: 'dissect', nodeId: 'c9_bio_ch4_7', title: 'Identify each idea',
          dissect: { specimen: 'Biodiversity and Classification · Part 2/2', spots: [
            { id: 's1', label: 'Adaptations Structural and Behavioural', prompt: 'Which idea is this? — Adaptation is a heritable structural, behavioural, or physiological trait that enhances.', answer: 'Adaptations Structural and Behavioural', options: ['Adaptations Structural and Behavioural', 'Hierarchy of Classification Kingdom to Species', 'Binomial Nomenclature Genus and Species Names', 'Fossils Formation and Significance in Evolution'] },
            { id: 's2', label: 'Hierarchy of Classification Kingdom to Species', prompt: 'Which idea is this? — The hierarchical classification system organizes living organisms into a nested series.', answer: 'Hierarchy of Classification Kingdom to Species', options: ['Hierarchy of Classification Kingdom to Species', 'Adaptations Structural and Behavioural', 'Binomial Nomenclature Genus and Species Names', 'Fossils Formation and Significance in Evolution'] },
            { id: 's3', label: 'Binomial Nomenclature Genus and Species Names', prompt: 'Which idea is this? — Binomial nomenclature is the internationally standardized system of naming each species.', answer: 'Binomial Nomenclature Genus and Species Names', options: ['Binomial Nomenclature Genus and Species Names', 'Adaptations Structural and Behavioural', 'Hierarchy of Classification Kingdom to Species', 'Fossils Formation and Significance in Evolution'] },
            { id: 's4', label: 'Fossils Formation and Significance in Evolution', prompt: 'Which idea is this? — Fossils are the preserved remains, impressions, or traces of once-living organisms from.', answer: 'Fossils Formation and Significance in Evolution', options: ['Fossils Formation and Significance in Evolution', 'Adaptations Structural and Behavioural', 'Hierarchy of Classification Kingdom to Species', 'Binomial Nomenclature Genus and Species Names'] }
          ] } },
        { type: 'case', nodeId: 'c9_bio_ch4_6', title: 'A real-world call',
          caseStudy: { intro: 'A town can build a road through a wetland — cutting commute times for thousands — or around it, costing more and taking longer. The wetland doesn\'t get a vote.',
            decisions: [{ prompt: 'How do you weigh what can\'t speak for itself?', options: [
                { text: 'Build through — people\'s time is the priority', outcome: 'The direct-benefit answer; wetlands\' value is real but invisible until the floods come.' },
                { text: 'Build around — some costs aren\'t on the invoice', outcome: 'The long-view answer; costs more now, protects flood-buffering and habitat nobody priced.' },
                { text: 'Build through but fund wetland restoration elsewhere', outcome: 'The mitigation answer — honest that the original wetland is still lost; offsets work only if actually delivered.' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch4_6', title: 'Use it in the wild',
          caseStudy: { intro: 'A farmer boasts his new field of a single high-yield wheat variety holds \'maximum biodiversity — thousands of living plants.\' Next season a rust disease sweeps it while the neighbouring mixed plot survives.',
            decisions: [{ prompt: 'What did \'thousands of plants\' miss?', options: [
                { text: 'Biodiversity is variety at three levels — genetic, species and ecosystem — not a headcount. One wheat genotype across thousands of plants means near-zero genetic diversity: no resistant variants to buffer the rust, plus lost species diversity, so the field had no resilience.', outcome: 'This uses the three-level definition to explain why a big monoculture is fragile — numbers of individuals are not diversity.' },
                { text: 'The farmer is right — biodiversity counts living things, and his field held more life than the wild hedgerow.', outcome: 'Ten thousand identical plants are one species and one genotype; the diversity that resists shocks lives in variety, not volume.', reveals: 'biodiversity-is-headcount' },
                { text: 'The field failed only because it lacked pesticide — biodiversity would not have changed the outcome.', outcome: 'A mixed, genetically varied field gives the pathogen fewer compatible hosts — resilience is a property of diversity itself, not of spraying.', reveals: 'spray-beats-diversity' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch4_9', title: 'You made it',
          caseStudy: { intro: 'Saving the tiger isn\'t saving the forest. True biodiversity means variety inside every species, across every habitat — that\'s the insurance policy life holds against droughts, pests and change.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'cell', prompt: 'Explore the cell interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'cell', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch4_6', difficulty: 'standard',
          question: 'Adaptation is a heritable structural, behavioural, or physiological trait that.',
          hint: 'Revisit c9_bio_ch4_2 (Evolution: Basic Concept and Evidence) to reinforce variation.',
          misconception: 'Students frequently believe adaptations arise because an organism *needs* a trait and *acquires* it during its lifetime.',
          parts: [
                { id: 'a', prompt: 'Why is the mass nesting (arribada) of Olive Ridley turtles on Odisha\'s Gahirmatha beach considered a behavioural adaptation?', answer: 'Mass nesting is a behavioural adaptation',
                  options: ['Mass nesting is a behavioural adaptation', 'a habit they learned', 'they gather for safety'],
                  hint: 'Revisit c9_bio_ch4_2 (Evolution: Basic Concept and Evidence) to reinforce variation, selection, and.',
                  misconception: 'Students frequently believe adaptations arise because an organism *needs* a trait and *acquires* it during its lifetime through use.' }
          ],
            remediations: { 'students-frequently-believe-adaptations-arise': { steps: ['**Simulation:** Use a "Bird Beak" activity: students use different tools (tweezers, spoons, clips) as "beaks" to pick.', 'Only the "survivors" (top collectors) reproduce (pass their tool to the next round).', '**Debrief:** Show that the "beak" type didn\'t change during the round; the *proportion* of beak types in the population.', '**Explicit Contrast:** Write "Lamarck: Need → Change → Inheritance" vs.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_7', difficulty: 'standard',
          question: 'The hierarchical classification system organizes living organisms into a nested.',
          hint: 'If stuck, revisit c9_bio_ch4_4 (Classification Criteria) and practice grouping 5 familiar.',
          misconception: 'Students believe that organisms in the same Kingdom (e.g., all animals) are "basically the same" and that the hierarchy.',
          parts: [
                { id: 'a', prompt: 'Two organisms belong to the same Genus but different Species. Another pair belongs to the same Family but different Genera.', answer: 'The pair in the same Genus shares more characteristics',
                  options: ['The pair in the same Genus shares more characteristics', 'basically the same', 'organisms in the same Kingdom (e'],
                  hint: 'If stuck, revisit c9_bio_ch4_4 (Classification Criteria) and practice grouping 5 familiar organisms.',
                  misconception: 'Students believe that organisms in the same Kingdom (e.g., all animals) are "basically the same" and that the hierarchy is just a naming.' }
          ],
            remediations: { 'organisms-in-the-same-kingdom': { steps: ['Have the student list 5 traits of a sponge and 5 traits of a tiger; count shared traits (only: eukaryotic.', 'List 5 traits of tiger and 5 of lion; count shared traits (mammary glands, hair, four-chambered heart, placental.', 'Explicitly map each shared trait to its taxonomic rank (e.g., mammary glands → Class Mammalia; similar skeletal.', 'Conclude: more shared ranks = more shared traits = closer relationship.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_8', difficulty: 'standard',
          question: 'Binomial nomenclature is the internationally standardized system of naming each.',
          hint: 'Review the taxonomic hierarchy from node c9_bio_ch4_7, focusing on the definition.',
          misconception: 'Students often think the specific epithet alone (e.g., \'indica\') is the species name and can stand alone, writing "The.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Binomial nomenclature is the internationally standardized system of naming each species',
                  options: ['Binomial nomenclature is the internationally standardized system of naming each species', 'Biodiversity is the variety of life forms at all levels of biological organisation,', 'Extinction is the irreversible termination of a species when the last living individual', 'Evolution is the gradual, cumulative change in the heritable characteristics of'],
                  hint: 'Review the taxonomic hierarchy from node c9_bio_ch4_7, focusing on the definition of genus (group.',
                  misconception: 'Students often think the specific epithet alone (e.g., \'indica\') is the species name and can stand alone, writing "The species name.' }
          ],
            remediations: { 'the-specific-epithet-alone-e': { steps: ['Show the student a list: *Mangifera indica*, *Azadirachta indica*, *Tamarix indica*. Ask: "Which one is mango?"', 'Point out that \'indica\' appears in all three, so \'indica\' alone cannot identify mango.', 'Reinforce that the *species* is the combination *Mangifera indica*.', 'Practice writing five full binomials and circling the genus and specific epithet in different colors to visually.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the specific epithet alone (e.g., \'indica\') is the species name and can stand alone, writing "The.',
          parts: [
                { id: 'a', prompt: 'A textbook states: "The scientific name of the house crow is *Corvus splendens*. In a list of Indian birds, it can be abbreviated as *C.', answer: 'Yes, the statement is correct',
                  options: ['Yes, the statement is correct', 'never abbreviate', 'abbreviate both words', 'The species name of mango is *indica*'],
                  hint: 'Review the taxonomic hierarchy from node c9_bio_ch4_7, focusing on the definition of genus (group.',
                  misconception: 'Students often think the specific epithet alone (e.g., \'indica\') is the species name and can stand alone, writing "The species name.' }
          ],
            remediations: { 'the-specific-epithet-alone-e': { steps: ['Show the student a list: *Mangifera indica*, *Azadirachta indica*, *Tamarix indica*. Ask: "Which one is mango?"', 'Point out that \'indica\' appears in all three, so \'indica\' alone cannot identify mango.', 'Reinforce that the *species* is the combination *Mangifera indica*.', 'Practice writing five full binomials and circling the genus and specific epithet in different colors to visually.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch4_9', difficulty: 'standard',
          question: 'Fossils are the preserved remains, impressions, or traces of once-living.',
          hint: 'Revisit c9_bio_ch4_2 (evolution evidence types) and c8_bio_ch1_8 (levels of organisation).',
          misconception: 'Students believe fossils are the actual original bones/shells turned to stone ("petrified" = turned to rock), and that.',
          parts: [
                { id: 'a', prompt: 'Define fossilization and name the most common geological setting where it occurs.', answer: 'Fossilization is the process by',
                  options: ['Fossilization is the process by', 'fossils form in volcanic rock', 'fossils are just old bones', 'petrified'],
                  hint: 'Revisit c9_bio_ch4_2 (evolution evidence types) and c8_bio_ch1_8 (levels of organisation).',
                  misconception: 'Students believe fossils are the actual original bones/shells turned to stone ("petrified" = turned to rock), and that fossilization.' },
                { id: 'b', prompt: 'A student finds a rock with a hollow cavity shaped like a bivalve shell. The original shell material is gone.', answer: 'This is an external mold fossil',
                  options: ['This is an external mold fossil', 'it\'s a cast', 'the shell turned to stone', 'petrified'],
                  hint: 'Revisit c9_bio_ch4_2 (evolution evidence types) and c8_bio_ch1_8 (levels of organisation).',
                  misconception: 'Students believe fossils are the actual original bones/shells turned to stone ("petrified" = turned to rock), and that fossilization.' },
                { id: 'c', prompt: 'Compare and contrast carbonization and permineralization as fossilization processes. Which preserves more three-dimensional cellular detail?', answer: 'Carbonization preserves a thin carbon film of flattened organic material (mostly',
                  options: ['Carbonization preserves a thin carbon film of flattened organic material (mostly', 'both preserve 3D equally', 'carbonization makes petrified wood', 'petrified'],
                  hint: 'Revisit c9_bio_ch4_2 (evolution evidence types) and c8_bio_ch1_8 (levels of organisation).',
                  misconception: 'Students believe fossils are the actual original bones/shells turned to stone ("petrified" = turned to rock), and that fossilization.' }
          ],
            remediations: { 'fossils-are-the-actual-original': { steps: ['Show a side-by-side photo of modern bone microstructure (Haversian canals, osteocytes) vs permineralized dinosaur bone.', 'Demonstrate with sugar cube in colored water - sugar dissolves, color remains in pores.', 'Have student write the correct board-exam sentence: "During permineralization, groundwater minerals precipitate in pore.', 'Practice identifying fossil type from description: "Original shell dissolved, cavity filled with calcite" → internal.'], labTask: { instruction: 'On the interactive: zoom into the cell to 70% — what organelles appear? — then check.', widget: 'cell', validate: 'cell:zoom=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
