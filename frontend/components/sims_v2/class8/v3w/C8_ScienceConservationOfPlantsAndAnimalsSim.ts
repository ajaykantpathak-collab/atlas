import type { SimDef } from '../../engine/types';
import C8_ScienceConservationOfPlantsAndAnimalsSim from '../../../simulations/c6_12/C8_ScienceConservationOfPlantsAndAnimalsSim';

/** v3 wrapped master — C8_ScienceConservationOfPlantsAndAnimalsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_scienceconservationofplantsandanimalssim: SimDef = {
    id: 'v3w_c8_scienceconservationofplantsandanimalssim',
    title: 'Conservation Of Plants And Animals',
    subtitle: 'This node covers the ecological consequences of deforestation: habitat fragmentation,.',
    classLevel: 8, subject: 'science', topic: 'Human Impact on Ecosystems: Deforestation and Habitat Loss',
    chapters: [],
    nodeIds: ['c8_physics_ch8_8', 'c8_physics_ch8_2', 'c8_physics_ch8_9', 'c8_physics_ch8_3', 'c8_physics_ch9_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Begin by showing students a satellite image time-lapse of a familiar Indian forest region (e.g., Corbett.', goal: 'Master Conservation Of Plants And Animals.' },
    discovery: {
        question: 'A 500 km² forest loses 2% of its area per year due to logging. If this rate continues, calculate the forest area remaining after 5 years.',
        options: ['**Calculation:** Year 1: 500 × 0.98 = 490 km²', 'deforestation only affects the trees cut down', 'animals can just move to another forest'],
        answer: '**Calculation:** Year 1: 500 × 0.98 = 490 km²',
        hook: 'Students often think "deforestation only affects the trees cut down" or "animals can just move to another forest." They.',
    },
    teaching: [
        { title: 'Deforestation is the large-scale removal of.', text: 'Deforestation is the large-scale removal of trees from forested land for human activities such as agriculture, logging, or urbanization, leading to habitat loss where the natural environment required.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_physics_ch8_8', title: 'Deforestation is the large-scale.',
          scaffold: { problem: 'A 1200 hectare (ha) forest in Central India is fragmented by a new 4-lane highway project.',
            steps: [
            { text: 'Identify given quantities: Highway width = 60 m = 0.06 km; Length = 10 km. Forest area = 1200 ha.' },
            { text: 'Calculate direct cleared area: Area = Width × Length = 0.06 km × 10 km = 0.6 km².' },
            { text: 'Calculate percentage direct loss: (60 ha / 1200 ha) × 100% = 5%.' },
            { text: 'Analyze effective loss: The highway splits the forest into two patches. If split evenly, each patch ≈ 570 ha.' },
            { text: 'State answer: Direct loss = 60 ha (5%). Effective loss for tigers = 100% of the landscape\'s conservation value for this.', faded: true, blankAnswer: 'Direct habitat loss = 60 hectares (5% of total). Effective.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch8_2', title: 'An ecosystem is a functional unit where.',
          scaffold: { problem: 'A student sets up a terrarium with soil, water, small plants, and a few insects in a sealed glass jar placed near a window.',
            steps: [
            { text: 'List all components mentioned: soil, water, plants, insects, glass jar, sunlight (from window), air inside jar.' },
            { text: 'Classify each as biotic or abiotic: Biotic – plants, insects (and microorganisms in soil).' },
            { text: 'Select three abiotic: sunlight, water, air (CO₂ and O₂). Select three biotic: plants, insects, soil bacteria/fungi.' },
            { text: 'Describe interaction 1: Plants use sunlight (abiotic) to photosynthesize, taking in CO₂ from air (abiotic) and water.' },
            { text: 'Describe interaction 2: Insects consume plant material (biotic) and respire using O₂ (abiotic), releasing CO₂ (abiotic).' },
            { text: 'Conclude that these cyclic interactions (energy flow from sun, gas exchange, nutrient cycling) sustain the terrarium.', faded: true, blankAnswer: 'Abiotic: sunlight, water, air (CO₂/O₂). Biotic: plants,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch8_9', title: 'Elephant corridors are designated.',
          scaffold: { problem: 'In a region of West Bengal, two forest patches are separated by 18 km of tea gardens.',
            steps: [
            { text: 'Identify given quantities: elephant walking speed = 4.5 km/h, available night time = 10 h, actual distance = 18 km.' },
            { text: 'Identify the formula: distance = speed × time. We need to find maximum distance possible in 10 h.' },
            { text: 'Substitute values: maximum distance = 4.5 km/h × 10 h = 45 km.' },
            { text: 'Compare with actual distance: 18 km < 45 km, so they can cross in one night.' },
            { text: 'Verify reasonableness: 4 hours of walking at night is feasible; elephants would have 6 hours left for feeding/drinking.', faded: true, blankAnswer: 'Maximum distance in one night = 45 km. Actual distance 18.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch8_3', title: 'Producers are organisms (mainly green.',
          scaffold: { problem: 'During a nature walk near your school, you spot: (1) neem tree, (2) caterpillar on neem leaf, (3) bulbul bird eating the caterpillar, (4).',
            steps: [
            { text: 'Identify the energy source for each organism. Neem tree uses sunlight (photosynthesis) → producer.' },
            { text: 'Determine the mode of nutrition: Neem – autotrophic; caterpillar – herbivore (primary consumer); bulbul – carnivore.' },
            { text: 'Draw the energy flow arrows: Sunlight → Neem tree → Caterpillar → Bulbul.' },
            { text: 'Verify that energy flows one way (Sun to producers to consumers to decomposers) and nutrients cycle back to producers.' },
            { text: 'State final classification: Neem tree = Producer; Caterpillar = Primary Consumer; Bulbul = Secondary Consumer; Mold =.', faded: true, blankAnswer: 'Neem tree – Producer; Caterpillar – Consumer (herbivore);.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch9_9', title: 'Biodiversity refers to the variety of.',
          scaffold: { problem: 'During a nature walk in a school garden in Bengaluru, a Class 8 student records the following organisms: 1 neem tree, 2 grass species, 1.',
            steps: [
            { text: 'Identify given organisms and their groups. List each with classification reasoning.' },
            { text: 'Count total distinct organisms (types). Here: neem tree (plant), grass species 1 (plant), grass species 2 (plant),.' },
            { text: 'Count per group: Plants = 3, Animals = 3, Microorganisms = 2.' },
            { text: 'Calculate percentages: Plants = (3/8)*100 = 37.5%, Animals = 37.5%, Microorganisms = 25%.' },
            { text: 'Verify: percentages sum to 100%. Reasonable.', faded: true, blankAnswer: 'Plants: 37.5%, Animals: 37.5%, Microorganisms: 25%.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_physics_ch8_2', title: 'Identify each idea',
          dissect: { specimen: 'Conservation Of Plants And Animals', spots: [
            { id: 's1', label: 'Deforestation is the large-scale removal', prompt: 'Which idea is this? — Deforestation is the large-scale removal of trees from forested land for human activities.', answer: 'Deforestation is the large-scale removal', options: ['Deforestation is the large-scale removal', 'An ecosystem is a functional', 'Elephant corridors are designated strips', 'Producers are organisms mainly green'] },
            { id: 's2', label: 'An ecosystem is a functional', prompt: 'Which idea is this? — An ecosystem is a functional unit where living organisms (biotic components) interact.', answer: 'An ecosystem is a functional', options: ['An ecosystem is a functional', 'Deforestation is the large-scale removal', 'Elephant corridors are designated strips', 'Producers are organisms mainly green'] },
            { id: 's3', label: 'Elephant corridors are designated strips', prompt: 'Which idea is this? — Elephant corridors are designated strips of natural habitat that connect fragmented.', answer: 'Elephant corridors are designated strips', options: ['Elephant corridors are designated strips', 'Deforestation is the large-scale removal', 'An ecosystem is a functional', 'Producers are organisms mainly green'] },
            { id: 's4', label: 'Producers are organisms mainly green', prompt: 'Which idea is this? — Producers are organisms (mainly green plants) that capture solar energy through.', answer: 'Producers are organisms mainly green', options: ['Producers are organisms mainly green', 'Deforestation is the large-scale removal', 'An ecosystem is a functional', 'Elephant corridors are designated strips'] },
            { id: 's5', label: 'Biodiversity refers to the variety', prompt: 'Which idea is this? — Biodiversity refers to the variety of life forms on Earth, including plants, animals, and.', answer: 'Biodiversity refers to the variety', options: ['Biodiversity refers to the variety', 'Deforestation is the large-scale removal', 'An ecosystem is a functional', 'Elephant corridors are designated strips'] }
          ] } }
    ],
    explore: { component: C8_ScienceConservationOfPlantsAndAnimalsSim, prompt: 'Explore the interactive — Conservation Of Plants And Animals' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch8_8', difficulty: 'standard',
          question: 'Deforestation is the large-scale removal of trees from forested land for human.',
          hint: 'If stuck, revisit c8_physics_ch8_4 (Food Chains) and c8_physics_ch8_6 (Trophic Levels) to.',
          misconception: 'Students often think "deforestation only affects the trees cut down" or "animals can just move to another forest." They.',
          parts: [
                { id: 'a', prompt: 'A 500 km² forest loses 2% of its area per year due to logging. If this rate continues, calculate the forest area remaining after 5 years.', answer: '**Calculation:** Year 1: 500 × 0.98 = 490 km²',
                  options: ['**Calculation:** Year 1: 500 × 0.98 = 490 km²', 'deforestation only affects the trees cut down', 'animals can just move to another forest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "deforestation only affects the trees cut down" or "animals can just move to another forest." They fail to grasp that.' },
                { id: 'b', prompt: 'Compare the impact of clear-cutting a 10 km² block in the middle of a 1000 km² forest versus clear-cutting a 10 km² strip that cuts the forest into two 495 km².', answer: 'The 10 km² strip causes far greater damage',
                  options: ['The 10 km² strip causes far greater damage', 'deforestation only affects the trees cut down', 'animals can just move to another forest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "deforestation only affects the trees cut down" or "animals can just move to another forest." They fail to grasp that.' }
          ],
            remediations: { 'deforestation-only-affects-the-trees': { steps: ['**Visual Demo:** Use a jigsaw puzzle of a food web.', 'Remove the \'tree\' pieces (producers).', 'Show how herbivore pieces have no connections, then carnivore pieces fall away.', '**Map Exercise:** Give students a map of a fictional forest with a highway cutting through.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "deforestation only affects the trees cut down" or "animals can just move to another forest." They.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Planting fast-growing monoculture trees (like eucalyptus) after deforestation restores the ecosystem because the trees grow back quickly.".', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'deforestation only affects the trees cut down', 'animals can just move to another forest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "deforestation only affects the trees cut down" or "animals can just move to another forest." They fail to grasp that.' },
                { id: 'b', prompt: 'Compare the impact of clear-cutting a 10 km² block in the middle of a 1000 km² forest versus clear-cutting a 10 km² strip that cuts the forest into two 495 km².', answer: 'The 10 km² strip causes far greater damage',
                  options: ['The 10 km² strip causes far greater damage', 'deforestation only affects the trees cut down', 'animals can just move to another forest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "deforestation only affects the trees cut down" or "animals can just move to another forest." They fail to grasp that.' }
          ],
            remediations: { 'deforestation-only-affects-the-trees': { steps: ['**Visual Demo:** Use a jigsaw puzzle of a food web.', 'Remove the \'tree\' pieces (producers).', 'Show how herbivore pieces have no connections, then carnivore pieces fall away.', '**Map Exercise:** Give students a map of a fictional forest with a highway cutting through.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_2', difficulty: 'standard',
          question: 'An ecosystem is a functional unit where living organisms (biotic components).',
          hint: 'If stuck, review Class 6 "Sources of Light" and "The Water Cycle and Heat Transfer" to.',
          misconception: 'Students often think abiotic components are just a passive background and do not actively influence living organisms.',
          parts: [
                { id: 'a', prompt: 'Explain why sunlight is considered the primary energy source for most ecosystems, and describe how it enters the living component of the ecosystem.', answer: 'Sunlight is the primary energy source',
                  options: ['Sunlight is the primary energy source', 'sunlight gives heat to animals', 'plants eat sunlight'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think abiotic components are just a passive background and do not actively influence living organisms.' }
          ],
            remediations: { 'abiotic-components-are-just-a': { steps: ['If a student holds this misconception, conduct a mini-investigation: Place two identical potted plants – one watered.', 'After a week, observe wilting in the unwatered plant.', 'Ask: "What abiotic factor changed?', 'How did the living plant respond?" Then show a dead leaf and a rock; ask which was once living.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_9', difficulty: 'standard',
          question: 'Elephant corridors are designated strips of natural habitat that connect.',
          hint: 'Review speed calculations (c7_physics_ch04_007) and habitat fragmentation impacts.',
          misconception: 'Students often think elephant corridors are simply narrow fenced pathways (like cattle lanes) that force elephants.',
          parts: [
                { id: 'a', prompt: 'Why is the width of an elephant corridor just as important as its length when designing safe passage for elephants?', answer: 'Corridor width is critical',
                  options: ['Corridor width is critical', 'corridor', 'fenced passage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think elephant corridors are simply narrow fenced pathways (like cattle lanes) that force elephants through a specific.' },
                { id: 'b', prompt: 'An elephant herd walks at an average speed of 5 km/h. They need to cross a corridor that is 12 km long to reach a water source.', answer: 'Given: speed = 5 km/h, distance = 12 km',
                  options: ['Given: speed = 5 km/h, distance = 12 km', 'corridor', 'fenced passage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think elephant corridors are simply narrow fenced pathways (like cattle lanes) that force elephants through a specific.' },
                { id: 'c', prompt: 'Two corridors are proposed: Corridor A is 1 km wide and 10 km long; Corridor B is 500 m wide and 8 km long.', answer: 'Corridor A: safe width = 1000 m - 2×200 m = 600 m',
                  options: ['Corridor A: safe width = 1000 m - 2×200 m = 600 m', 'corridor', 'fenced passage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think elephant corridors are simply narrow fenced pathways (like cattle lanes) that force elephants through a specific.' }
          ],
            remediations: { 'elephant-corridors-are-simply-narrow': { steps: ['If a student holds this misconception, have them compare two scenarios: (1) a 100 m wide fenced lane through farmland,.', 'Ask them to list pros/cons for elephant use in each.', 'Then show camera trap data (or describe) where elephants avoid narrow fenced lanes but readily use wide natural.', 'This contrast directly addresses the flawed reasoning by highlighting behavioral responses.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think elephant corridors are simply narrow fenced pathways (like cattle lanes) that force elephants.',
          parts: [
                { id: 'a', prompt: 'A wildlife manager proposes building an elephant corridor through a region with intense agriculture, arguing that the corridor will be fenced on both sides to.', answer: 'The proposal is flawed',
                  options: ['The proposal is flawed', 'corridor', 'fenced passage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think elephant corridors are simply narrow fenced pathways (like cattle lanes) that force elephants through a specific.' }
          ],
            remediations: { 'elephant-corridors-are-simply-narrow': { steps: ['If a student holds this misconception, have them compare two scenarios: (1) a 100 m wide fenced lane through farmland,.', 'Ask them to list pros/cons for elephant use in each.', 'Then show camera trap data (or describe) where elephants avoid narrow fenced lanes but readily use wide natural.', 'This contrast directly addresses the flawed reasoning by highlighting behavioral responses.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_3', difficulty: 'standard',
          question: 'Producers are organisms (mainly green plants) that capture solar energy through.',
          hint: 'Review photosynthesis (Class 6 Light chapter) and the idea that energy changes form but.',
          misconception: 'Students often think decomposers are just "small consumers" because both feed on other organisms.',
          parts: [
                { id: 'a', prompt: 'In a pond ecosystem, you observe: (a) algae, (b) tadpole, (c) water beetle, (d) bacteria on dead leaves.', answer: 'algae, (',
                  options: ['algae, (', 'small consumers', 'decomposers are just "small consumers"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think decomposers are just "small consumers" because both feed on other organisms.' },
                { id: 'b', prompt: 'Compare the energy flow path in a forest ecosystem when (i) a deer eats grass and (ii) a fungus grows on a dead deer.', answer: 'In (i), chemical energy in grass moves to deer via ingestion',
                  options: ['In (i), chemical energy in grass moves to deer via ingestion', 'both transfer energy the same way', 'small consumers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think decomposers are just "small consumers" because both feed on other organisms.' }
          ],
            remediations: { 'decomposers-are-just-small-consumers': { steps: ['Conduct a side-by-side observation: Place a piece of ripe banana in two jars.', 'In Jar A, add a few ants (consumers); in Jar B, leave it open to air (decomposers).', 'After 3 days, compare: Jar A shows bite marks and ant feces (internal digestion); Jar B shows liquefaction, fungal.', 'Discuss how Jar B returns nutrients to soil while Jar A transfers energy to ant biomass.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think decomposers are just "small consumers" because both feed on other organisms.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If all decomposers disappeared, producers would grow better because more nutrients would stay in the soil." Evaluate this statement and.', answer: 'Incorrect',
                  options: ['Incorrect', 'small consumers', 'decomposers are just "small consumers"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think decomposers are just "small consumers" because both feed on other organisms.' },
                { id: 'b', prompt: 'Compare the energy flow path in a forest ecosystem when (i) a deer eats grass and (ii) a fungus grows on a dead deer.', answer: 'In (i), chemical energy in grass moves to deer via ingestion',
                  options: ['In (i), chemical energy in grass moves to deer via ingestion', 'both transfer energy the same way', 'small consumers', 'decomposers are just "small consumers"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think decomposers are just "small consumers" because both feed on other organisms.' }
          ],
            remediations: { 'decomposers-are-just-small-consumers': { steps: ['Conduct a side-by-side observation: Place a piece of ripe banana in two jars.', 'In Jar A, add a few ants (consumers); in Jar B, leave it open to air (decomposers).', 'After 3 days, compare: Jar A shows bite marks and ant feces (internal digestion); Jar B shows liquefaction, fungal.', 'Discuss how Jar B returns nutrients to soil while Jar A transfers energy to ant biomass.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch9_9', difficulty: 'standard',
          question: 'Biodiversity refers to the variety of life forms on Earth, including plants,.',
          hint: 'Review c8_physics_ch9_1 (Conditions for Life) and c6_physics_ch02_009 (Exploring the.',
          misconception: 'Students often think \'diversity\' only means number of species (species richness) and ignore genetic diversity within a.',
          parts: [
                { id: 'a', prompt: 'List the three major groups of living organisms on Earth and give one example of each.', answer: 'Plants (e.g., mango tree), Animals (e.g., cow), Microorganisms (e.g., bacteria)',
                  options: ['Plants (e.g., mango tree), Animals (e.g., cow), Microorganisms (e.g., bacteria)', 'only visible macro-organisms count as life'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'diversity\' only means number of species (species richness) and ignore genetic diversity within a species and.' }
          ],
            remediations: { 'diversity-only-means-number-of': { steps: ['Remediation: Take the student to two sites: a natural grove and a monoculture plantation.', 'Ask them to list all different \'kinds\' of plants they see in 10 minutes.', 'Then ask: \'Are all teak trees identical?', 'Check leaf size, bark texture.\' Guide them to see variation within species (genetic diversity) and the variety of.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
