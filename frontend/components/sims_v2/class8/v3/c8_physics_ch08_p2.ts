import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch08_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch08_p2: SimDef = {
    id: 'v3_c8_physics_ch08_p2',
    title: 'How Nature Works in Harmony · Part 2/2',
    subtitle: 'Every creature\'s address includes the non-living',
    classLevel: 8, subject: 'physics', topic: 'How Nature Works in Harmony · Part 2/2',
    chapters: ['c8_physics_ch08'],
    nodeIds: ['c8_physics_ch8_5', 'c8_physics_ch8_6', 'c8_physics_ch8_7', 'c8_physics_ch8_8', 'c8_physics_ch8_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a habitat surveyor', intro: 'Look at a pond and you\'ll list fish and frogs — but the real habitat includes sunlight, oxygen and mud. Learn to see the invisible half of every home in nature.', goal: 'Understand a habitat as the combination of biotic (living) and abiotic (non-living) components, and how abiotic factors like water, light and soil shape the organisms within.' },
    discovery: {
        question: '\'Soil is just dirt — it doesn\'t count as part of a habitat.\' Your classmate says this in a garden full of roses and butterflies. Is he right?',
        options: ['No — a habitat is living (biotic) AND non-living (abiotic) parts; soil anchors plants, holds water and feeds the whole web', 'Yes — only living things count', 'Partly — soil counts only for worms', 'No — because dirt is technically alive'],
        answer: 'No — a habitat is living (biotic) AND non-living (abiotic) parts; soil anchors plants, holds water and feeds the whole web',
        hook: 'A habitat isn\'t just the creatures you can see — it\'s their full address: sunlight, water, air, soil and temperature included. A fish\'s home isn\'t \'water\'; it\'s water + dissolved oxygen + the muddy bottom.',
    },
    teaching: [
        { title: 'Food Webs: Interconnected Food Chains in an Ecosystem', text: 'A food web is a network of interconnected food chains that shows the multiple feeding relationships among different organisms in an ecosystem, illustrating how energy and nutrients flow through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch8_5', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Audit three habitats — a garden, a desert, a freshwater lake. Sort every component into biotic or abiotic, then predict what happens to each habitat if just one abiotic factor (water, light, heat) is taken away.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch8_5', title: 'Food Webs: Interconnected Food Chains in an Ecosystem',
          caseStudy: { intro: 'Start by observing a local garden or park: notice that a butterfly feeds on nectar from flowers, a frog eats the butterfly, a snake eats the frog, and a hawk.',
            decisions: [{ prompt: 'What is a food web, and how does it differ from a food chain?', options: [
                { text: 'A food web is a network of multiple interconnected food chains showing various feeding', outcome: 'A food web is a network of multiple interconnected food chains showing various feeding.' },
                { text: 'food web is just a bigger food chain', outcome: 'Not quite — Students often think that in a food web, each organism has only one predator and one prey.', reveals: 'in-a-food-web' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch8_6', title: 'Trophic Levels and Energy Flow in Ecosystems',
          scaffold: { problem: 'A pond ecosystem in West Bengal receives solar energy of 50,000 J/m²/day. Phytoplankton (producers) capture 1% of this for photosynthesis.',
            steps: [
            { text: 'Identify given quantities: Solar input = 50,000 J/m²/day; Photosynthetic efficiency = 1% = 0.01; Trophic transfer.' },
            { text: 'Calculate producer energy captured: E_producer = 0.01 × 50,000 J/m²/day = 500 J/m²/day.' },
            { text: 'Apply 10% rule for each transfer to reach tertiary consumers (3 transfers: producer→primary→secondary→tertiary).' },
            { text: 'Compute: (0.10)³ = 0.001. E_tertiary = 500 × 0.001 = 0.5 J/m²/day.' },
            { text: 'Verify: 0.5 J/m²/day is very small, explaining why top predators are rare. Units tracked: J/m²/day throughout.', faded: true, blankAnswer: '0.5 J/m²/day' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch8_8', title: 'Human Impact on Ecosystems: Deforestation and Habitat Loss',
          caseStudy: { intro: 'Begin by showing students a satellite image time-lapse of a familiar Indian forest region (e.g., Corbett National Park periphery or Aravalli range) over 20.',
            decisions: [{ prompt: 'What is the primary ecological role of trees (producers) in a forest ecosystem that makes their removal through deforestation.', options: [
                { text: 'Trees are primary producers that convert solar energy into chemical energy (glucose) via', outcome: 'Trees are primary producers that convert solar energy into chemical energy (glucose) via.' },
                { text: 'trees provide oxygen', outcome: 'Not quite — Students often think "deforestation only affects the trees cut down" or "animals can just move.', reveals: 'deforestation-only-affects-the-trees' },
                { text: 'trees give shade', outcome: 'Not quite — Students often think "deforestation only affects the trees cut down" or "animals can just move.', reveals: 'deforestation-only-affects-the-trees' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch8_9', title: 'Elephant Corridors: Wildlife Conservation and Safe Movement',
          caseStudy: { intro: 'Imagine you are driving on a highway through a forested region in Assam or Karnataka and see a sign warning of elephant crossings.',
            decisions: [{ prompt: 'What is the primary purpose of an elephant corridor in wildlife conservation?', options: [
                { text: 'The primary purpose of an elephant corridor is to connect fragmented habitats so that', outcome: 'The primary purpose of an elephant corridor is to connect fragmented habitats so that elephants can.' },
                { text: 'protecting elephants from poachers', outcome: 'Not quite — Students often think elephant corridors are simply narrow fenced pathways (like cattle lanes) that.', reveals: 'elephant-corridors-are-simply-narrow' },
                { text: 'corridor', outcome: 'Not quite — Students often think elephant corridors are simply narrow fenced pathways (like cattle lanes) that.', reveals: 'elephant-corridors-are-simply-narrow' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch8_5', title: 'Use it in the wild',
          caseStudy: { intro: 'For a habitat poster, a group lists \'fish, frogs, water plants\' under \'parts of a pond habitat\' and writes \'water, sunlight, mud\' under \'just background — not really part of it.\'',
            decisions: [{ prompt: 'Does the second column belong in the habitat?', options: [
                { text: 'Absolutely — a habitat is biotic plus abiotic components together: the water, dissolved oxygen, sunlight and muddy bottom are what let the fish and plants live. Remove the \'background\' and the living column collapses with it.', outcome: 'This recognises that non-living factors are not scenery — they are the survival conditions every organism in the habitat depends on.' },
                { text: 'The split is correct — only living things make a habitat; the rest is setting, like furniture in a room.', outcome: 'Without water and dissolved oxygen there are no fish at all; abiotic components are habitat members, not furniture.', reveals: 'habitat-is-living-only' },
                { text: 'The abiotic items matter only for plants, since animals like fish do not use sunlight or soil.', outcome: 'Fish depend on plants and algae driven by sunlight and on oxygen dissolved from air and photosynthesis — the abiotic web feeds everything.', reveals: 'animals-need-no-abiotic' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch8_9', title: 'You made it',
          caseStudy: { intro: 'Every organism lives at an address made of sunlight, soil, water and air as much as neighbours and predators. Remove one abiotic piece and the whole arrangement collapses.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch8_5', difficulty: 'standard',
          question: 'A food web is a network of interconnected food chains that shows the multiple.',
          hint: 'Review the definitions and examples of producers, consumers, and decomposers.',
          misconception: 'Students often think that in a food web, each organism has only one predator and one prey, essentially treating the web.',
          parts: [
                { id: 'a', prompt: 'Why does a food web provide more stability to an ecosystem than a single food chain?', answer: 'A food web provides alternative pathways for energy flow',
                  options: ['A food web provides alternative pathways for energy flow', 'food webs have more organisms'],
                  hint: 'Review the definitions and examples of producers, consumers, and decomposers (c8_physics_ch8_3) and.',
                  misconception: 'Students often think that in a food web, each organism has only one predator and one prey, essentially treating the web as a set.' }
          ],
            remediations: { 'in-a-food-web': { steps: ['To address this, have students list all the foods a common animal (e.g., a crow) eats and all the animals that eat it.', 'Then, using a whiteboard, draw a food web for a familiar ecosystem (like a school garden) where each student adds one.', 'Emphasize that arrows can branch out from one organism to several others.', 'Practice with at least three different ecosystems until they naturally draw branching arrows.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_6', difficulty: 'standard',
          question: 'Trophic levels represent the hierarchical stages in an ecosystem through which.',
          hint: 'Review c8_physics_ch8_4 (Food Chains) and c8_physics_ch8_5 (Food Webs) to practice.',
          misconception: 'Students believe the 10% rule means "90% of energy is destroyed" or "energy disappears." In reality, energy.',
          parts: [
                { id: 'a', prompt: 'What is the approximate percentage of energy transferred from one trophic level to the next according to Lindeman\'s 10% rule, and what is the primary form.', answer: 'Approximately 10% is transferred',
                  options: ['Approximately 10% is transferred', '50% transferred', 'lost as light', '90% of energy is destroyed'],
                  hint: 'Review c8_physics_ch8_4 (Food Chains) and c8_physics_ch8_5 (Food Webs) to practice assigning.',
                  misconception: 'Students believe the 10% rule means "90% of energy is destroyed" or "energy disappears." In reality, energy is conserved (First Law) but.' },
                { id: 'b', prompt: 'Why does a pyramid of energy always upright (decreasing at higher levels), while a pyramid of biomass can sometimes be inverted (e.g., phytoplankton vs.', answer: 'Energy pyramids are always upright',
                  options: ['Energy pyramids are always upright', '90% of energy is destroyed', 'energy disappears', 'the 10% rule means "90% of energy is destroyed" or "energy disappears'],
                  hint: 'Review c8_physics_ch8_4 (Food Chains) and c8_physics_ch8_5 (Food Webs) to practice assigning.',
                  misconception: 'Students believe the 10% rule means "90% of energy is destroyed" or "energy disappears." In reality, energy is conserved (First Law) but.' },
                { id: 'c', prompt: 'In a Rajasthan desert ecosystem, producers capture 20,000 J/m²/yr of solar energy.', answer: 'Step 1: Producer energy = 20,000 J/m²/yr',
                  options: ['Step 1: Producer energy = 20,000 J/m²/yr', '90% of energy is destroyed', 'energy disappears', 'the 10% rule means "90% of energy is destroyed" or "energy disappears'],
                  hint: 'Review c8_physics_ch8_4 (Food Chains) and c8_physics_ch8_5 (Food Webs) to practice assigning.',
                  misconception: 'Students believe the 10% rule means "90% of energy is destroyed" or "energy disappears." In reality, energy is conserved (First Law) but.' },
                { id: 'd', prompt: 'Analyze this statement: "If we eliminate all herbivores from an ecosystem, carnivores will survive by eating more producers." Use energy flow principles.', answer: 'The statement is false',
                  options: ['The statement is false', '90% of energy is destroyed', 'energy disappears', 'the 10% rule means "90% of energy is destroyed" or "energy disappears'],
                  hint: 'Review c8_physics_ch8_4 (Food Chains) and c8_physics_ch8_5 (Food Webs) to practice assigning.',
                  misconception: 'Students believe the 10% rule means "90% of energy is destroyed" or "energy disappears." In reality, energy is conserved (First Law) but.' }
          ],
            remediations: { 'the-10-rule-means-90': { steps: ['Revisit heat transfer concepts from Class 6 (c6_physics_ch07_019, c6_physics_ch07_022): energy moves from concentrated.', 'Do a quick demo: burn a peanut (chemical energy) under a test tube of water; measure temperature rise.', 'Calculate energy transferred to water vs.', 'total energy in peanut (approx.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the 10% rule means "90% of energy is destroyed" or "energy disappears." In reality, energy.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Decomposers get the most energy because they break down dead organisms from all trophic levels." Evaluate this claim using the concept.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', '90% of energy is destroyed', 'energy disappears', 'the 10% rule means "90% of energy is destroyed" or "energy disappears'],
                  hint: 'Review c8_physics_ch8_4 (Food Chains) and c8_physics_ch8_5 (Food Webs) to practice assigning.',
                  misconception: 'Students believe the 10% rule means "90% of energy is destroyed" or "energy disappears." In reality, energy is conserved (First Law) but.' },
                { id: 'b', prompt: 'Design a simple investigation using a local compost pit or kitchen waste bin to demonstrate that energy is lost as heat during decomposition.', answer: 'Materials: Two identical insulated boxes, fresh vegetable waste (measured mass),',
                  options: ['Materials: Two identical insulated boxes, fresh vegetable waste (measured mass),', '90% of energy is destroyed', 'energy disappears', 'the 10% rule means "90% of energy is destroyed" or "energy disappears'],
                  hint: 'Review c8_physics_ch8_4 (Food Chains) and c8_physics_ch8_5 (Food Webs) to practice assigning.',
                  misconception: 'Students believe the 10% rule means "90% of energy is destroyed" or "energy disappears." In reality, energy is conserved (First Law) but.' }
          ],
            remediations: { 'the-10-rule-means-90': { steps: ['Revisit heat transfer concepts from Class 6 (c6_physics_ch07_019, c6_physics_ch07_022): energy moves from concentrated.', 'Do a quick demo: burn a peanut (chemical energy) under a test tube of water; measure temperature rise.', 'Calculate energy transferred to water vs.', 'total energy in peanut (approx.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_7', difficulty: 'standard',
          question: 'Balance in nature is the dynamic equilibrium in an ecosystem where populations.',
          hint: 'Review food webs (c8_physics_ch8_5) and trophic levels/energy flow (c8_physics_ch8_6).',
          misconception: 'Students often think \'balance in nature\' means every population stays exactly the same number forever, like a perfectly.',
          parts: [
                { id: 'a', prompt: 'In a pond food web, algae are eaten by zooplankton, which are eaten by small fish, which are eaten by large fish.', answer: 'Step 1: Large fish decline → less predation on small fish',
                  options: ['Step 1: Large fish decline → less predation on small fish', 'only direct predator-prey pairs matter'],
                  hint: 'Review food webs (c8_physics_ch8_5) and trophic levels/energy flow (c8_physics_ch8_6) — focus.',
                  misconception: 'Students often think \'balance in nature\' means every population stays exactly the same number forever, like a perfectly balanced scale.' }
          ],
            remediations: { 'balance-in-nature-means-every': { steps: ['Show a 1-minute video of a predator-prey simulation (e.g., lynx and hare population graphs) and ask students.', 'Have them draw a simple feedback loop diagram: more predators → fewer prey → fewer predators → more prey.', 'Use a hands-on model: two students act as \'foxes\' and \'rabbits\' with paper tokens; each round, foxes \'eat\' rabbits.', 'Record numbers for 10 rounds and plot.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_8', difficulty: 'standard',
          question: 'Deforestation is the large-scale removal of trees from forested land for human.',
          hint: 'If stuck, revisit c8_physics_ch8_4 (Food Chains) and c8_physics_ch8_6 (Trophic Levels).',
          misconception: 'Students often think "deforestation only affects the trees cut down" or "animals can just move to another forest." They.',
          parts: [
                { id: 'a', prompt: 'A 500 km² forest loses 2% of its area per year due to logging. If this rate continues, calculate the forest area remaining after 5 years.', answer: '**Calculation:** Year 1: 500 × 0.98 = 490 km²',
                  options: ['**Calculation:** Year 1: 500 × 0.98 = 490 km²', 'deforestation only affects the trees cut down', 'animals can just move to another forest'],
                  hint: 'If stuck, revisit c8_physics_ch8_4 (Food Chains) and c8_physics_ch8_6 (Trophic Levels) to visualize.',
                  misconception: 'Students often think "deforestation only affects the trees cut down" or "animals can just move to another forest." They fail to grasp that.' },
                { id: 'b', prompt: 'Compare the impact of clear-cutting a 10 km² block in the middle of a 1000 km² forest versus clear-cutting a 10 km² strip that cuts the forest into two 495 km².', answer: 'The 10 km² strip causes far greater damage',
                  options: ['The 10 km² strip causes far greater damage', 'deforestation only affects the trees cut down', 'animals can just move to another forest'],
                  hint: 'If stuck, revisit c8_physics_ch8_4 (Food Chains) and c8_physics_ch8_6 (Trophic Levels) to visualize.',
                  misconception: 'Students often think "deforestation only affects the trees cut down" or "animals can just move to another forest." They fail to grasp that.' }
          ],
            remediations: { 'deforestation-only-affects-the-trees': { steps: ['**Visual Demo:** Use a jigsaw puzzle of a food web.', 'Remove the \'tree\' pieces (producers).', 'Show how herbivore pieces have no connections, then carnivore pieces fall away.', '**Map Exercise:** Give students a map of a fictional forest with a highway cutting through.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_9', difficulty: 'standard',
          question: 'Elephant corridors are designated strips of natural habitat that connect.',
          hint: 'Review speed calculations (c7_physics_ch04_007) and habitat fragmentation impacts.',
          misconception: 'Students often think elephant corridors are simply narrow fenced pathways (like cattle lanes) that force elephants.',
          parts: [
                { id: 'a', prompt: 'Why is the width of an elephant corridor just as important as its length when designing safe passage for elephants?', answer: 'Corridor width is critical',
                  options: ['Corridor width is critical', 'corridor', 'fenced passage'],
                  hint: 'Review speed calculations (c7_physics_ch04_007) and habitat fragmentation impacts.',
                  misconception: 'Students often think elephant corridors are simply narrow fenced pathways (like cattle lanes) that force elephants through a specific.' },
                { id: 'b', prompt: 'An elephant herd walks at an average speed of 5 km/h. They need to cross a corridor that is 12 km long to reach a water source.', answer: 'Given: speed = 5 km/h, distance = 12 km',
                  options: ['Given: speed = 5 km/h, distance = 12 km', 'corridor', 'fenced passage'],
                  hint: 'Review speed calculations (c7_physics_ch04_007) and habitat fragmentation impacts.',
                  misconception: 'Students often think elephant corridors are simply narrow fenced pathways (like cattle lanes) that force elephants through a specific.' },
                { id: 'c', prompt: 'Two corridors are proposed: Corridor A is 1 km wide and 10 km long; Corridor B is 500 m wide and 8 km long.', answer: 'Corridor A: safe width = 1000 m - 2×200 m = 600 m',
                  options: ['Corridor A: safe width = 1000 m - 2×200 m = 600 m', 'corridor', 'fenced passage'],
                  hint: 'Review speed calculations (c7_physics_ch04_007) and habitat fragmentation impacts.',
                  misconception: 'Students often think elephant corridors are simply narrow fenced pathways (like cattle lanes) that force elephants through a specific.' }
          ],
            remediations: { 'elephant-corridors-are-simply-narrow': { steps: ['If a student holds this misconception, have them compare two scenarios: (1) a 100 m wide fenced lane through farmland.', 'Ask them to list pros/cons for elephant use in each.', 'Then show camera trap data (or describe) where elephants avoid narrow fenced lanes but readily use wide natural.', 'This contrast directly addresses the flawed reasoning by highlighting behavioral responses.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
