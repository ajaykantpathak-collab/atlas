import type { SimDef } from '../../engine/types';
import C8_ScienceReproductionInAnimalsSim from '../../../simulations/c6_12/C8_ScienceReproductionInAnimalsSim';

/** v3 wrapped master — C8_ScienceReproductionInAnimalsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_sciencereproductioninanimalssim: SimDef = {
    id: 'v3w_c8_sciencereproductioninanimalssim',
    title: 'Reproduction In Animals',
    subtitle: 'This node covers the definition of habitat and its two broad components (biotic and.',
    classLevel: 8, subject: 'science', topic: 'Habitat: Definition and Components (Living and Non-Living)',
    chapters: [],
    nodeIds: ['c8_physics_ch8_1', 'c8_physics_ch8_11', 'c8_physics_ch8_2', 'c8_physics_ch8_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Start by asking students to observe a nearby tree or pond: "What do you see living on and around it?" List.', goal: 'Master Reproduction In Animals.' },
    discovery: {
        question: 'A region experiences a 30% reduction in annual rainfall over five years. The soil moisture drops from 25% to 15% (by volume).',
        options: ['1) Reduced photosynthesis', 'plants die', 'environmental changes affect all organisms in the same way and at the same time'],
        answer: '1) Reduced photosynthesis',
        hook: 'Students often think that environmental changes affect all organisms in the same way and at the same time.',
    },
    teaching: [
        { title: 'A habitat is the natural environment where.', text: 'A habitat is the natural environment where an organism lives, providing all necessary biotic (living) and abiotic (non-living) components for its survival, growth, and reproduction.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_physics_ch8_1', title: 'A habitat is the natural environment.',
          scaffold: { problem: 'A student visits a school garden and records the following: mango tree, grass, ants, butterflies, soil, sunlight, air, water in a pond,.',
            steps: [
            { text: 'List all recorded items and recall definitions: biotic = living or once-living; abiotic = non-living physical/chemical.' },
            { text: 'Classify each: mango tree (biotic), grass (biotic), ants (biotic), butterflies (biotic), soil (abiotic), sunlight.' },
            { text: 'Select one biotic (e.g., mango tree) and one abiotic (e.g., sunlight).' },
            { text: 'Verify the interaction is direct: sunlight energy is absorbed by chlorophyll in leaves, driving the chemical reaction.' },
            { text: 'State the classification and interaction clearly with reasoning.', faded: true, blankAnswer: 'Biotic: mango tree, grass, ants, butterflies, frog..' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch8_11', title: 'Environmental changes refer to.',
          scaffold: { problem: 'In a village pond in Rajasthan, the water temperature rises from 25°C to 32°C during a heatwave.',
            steps: [
            { text: 'Identify the given physical change: temperature increase of 7°C (25°C to 32°C).' },
            { text: 'Recall the physical principle: solubility of gases in water decreases as temperature increases (from heat transfer and.' },
            { text: 'Compare the DO requirement of each fish: Rohu needs >4 mg/L, Catla needs >5 mg/L. Current DO is 3 mg/L.' },
            { text: 'Determine which threshold is crossed first: Catla requires 5 mg/L, so it is already below its limit; Rohu requires 4.' },
            { text: 'Conclude that Catla population will be affected first because its minimum DO requirement is higher, and the physical.', faded: true, blankAnswer: 'Catla fish will be affected first because their dissolved.' }
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
        { type: 'scaffold', nodeId: 'c8_physics_ch8_8', title: 'Deforestation is the large-scale.',
          scaffold: { problem: 'A 1200 hectare (ha) forest in Central India is fragmented by a new 4-lane highway project.',
            steps: [
            { text: 'Identify given quantities: Highway width = 60 m = 0.06 km; Length = 10 km. Forest area = 1200 ha.' },
            { text: 'Calculate direct cleared area: Area = Width × Length = 0.06 km × 10 km = 0.6 km².' },
            { text: 'Calculate percentage direct loss: (60 ha / 1200 ha) × 100% = 5%.' },
            { text: 'Analyze effective loss: The highway splits the forest into two patches. If split evenly, each patch ≈ 570 ha.' },
            { text: 'State answer: Direct loss = 60 ha (5%). Effective loss for tigers = 100% of the landscape\'s conservation value for this.', faded: true, blankAnswer: 'Direct habitat loss = 60 hectares (5% of total). Effective.' }
            ] } },
        { type: 'dissect', nodeId: 'c8_physics_ch8_11', title: 'Identify each idea',
          dissect: { specimen: 'Reproduction In Animals', spots: [
            { id: 's1', label: 'A habitat is the natural', prompt: 'Which idea is this? — A habitat is the natural environment where an organism lives, providing all necessary.', answer: 'A habitat is the natural', options: ['A habitat is the natural', 'Environmental changes refer to alterations', 'An ecosystem is a functional', 'Deforestation is the large-scale removal'] },
            { id: 's2', label: 'Environmental changes refer to alterations', prompt: 'Which idea is this? — Environmental changes refer to alterations in physical factors such as temperature, light.', answer: 'Environmental changes refer to alterations', options: ['Environmental changes refer to alterations', 'A habitat is the natural', 'An ecosystem is a functional', 'Deforestation is the large-scale removal'] },
            { id: 's3', label: 'An ecosystem is a functional', prompt: 'Which idea is this? — An ecosystem is a functional unit where living organisms (biotic components) interact.', answer: 'An ecosystem is a functional', options: ['An ecosystem is a functional', 'A habitat is the natural', 'Environmental changes refer to alterations', 'Deforestation is the large-scale removal'] },
            { id: 's4', label: 'Deforestation is the large-scale removal', prompt: 'Which idea is this? — Deforestation is the large-scale removal of trees from forested land for human activities.', answer: 'Deforestation is the large-scale removal', options: ['Deforestation is the large-scale removal', 'A habitat is the natural', 'Environmental changes refer to alterations', 'An ecosystem is a functional'] }
          ] } }
    ],
    explore: { component: C8_ScienceReproductionInAnimalsSim, prompt: 'Explore the interactive — Reproduction In Animals' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch8_1', difficulty: 'standard',
          question: 'A habitat is the natural environment where an organism lives, providing all.',
          hint: 'If stuck, review c6_physics_ch11_035 (light sources), c6_physics_ch07_019 (heat flow),.',
          misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living.',
          parts: [
                { id: 'a', prompt: 'What are the two main components of a habitat, and give one example of each from a forest habitat?', answer: 'The two main components are biotic (living) and abiotic (non-living)',
                  options: ['The two main components are biotic (living) and abiotic (non-living)', 'background'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living things like air,.' },
                { id: 'b', prompt: 'Why is sunlight considered an abiotic component of a habitat, and how does it directly affect the biotic components in a pond habitat?', answer: 'Sunlight is non-living, thus abiotic',
                  options: ['Sunlight is non-living, thus abiotic', 'background'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living things like air,.' },
                { id: 'c', prompt: 'A student observes a garden and records: rose plants, butterflies, soil, water, air, and sunlight. Classify each as biotic or abiotic.', answer: 'Biotic: rose plants, butterflies',
                  options: ['Biotic: rose plants, butterflies', 'background'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living things like air,.' }
          ],
            remediations: { 'only-the-visible-living-things': { steps: ['If a student holds this misconception, conduct a "habitat in a bottle" activity: Set up two sealed jars with water, one.', 'After a week, observe changes.', 'Discuss how abiotic factors (light, CO2, O2) interact with biotic components.', 'Then revisit the definition and have the student re-classify components of a local habitat.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living.',
          parts: [
                { id: 'a', prompt: 'A classmate says, "Soil is just dirt, so it\'s not important for a habitat." Evaluate this statement using the concept of abiotic components.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'background'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living things like air,.' },
                { id: 'b', prompt: 'Design a simple investigation to study the effect of one abiotic factor (choose light, water, or temperature) on the growth of a common plant (e.g., bean.', answer: 'Example: Investigate effect of light on bean sprout growth',
                  options: ['Example: Investigate effect of light on bean sprout growth', 'background'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living things like air,.' }
          ],
            remediations: { 'only-the-visible-living-things': { steps: ['If a student holds this misconception, conduct a "habitat in a bottle" activity: Set up two sealed jars with water, one.', 'After a week, observe changes.', 'Discuss how abiotic factors (light, CO2, O2) interact with biotic components.', 'Then revisit the definition and have the student re-classify components of a local habitat.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_11', difficulty: 'standard',
          question: 'Environmental changes refer to alterations in physical factors such as.',
          hint: 'Review the food web (c8_physics_ch8_5) and habitat components (c8_physics_ch8_1) to see.',
          misconception: 'Students often think that environmental changes affect all organisms in the same way and at the same time.',
          parts: [
                { id: 'a', prompt: 'A region experiences a 30% reduction in annual rainfall over five years. The soil moisture drops from 25% to 15% (by volume).', answer: '1) Reduced photosynthesis',
                  options: ['1) Reduced photosynthesis', 'plants die', 'environmental changes affect all organisms in the same way and at the same time'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that environmental changes affect all organisms in the same way and at the same time.' },
                { id: 'b', prompt: 'Compare the effects of a gradual temperature increase over 50 years versus a sudden heatwave lasting one week on a population of insects in a forest.', answer: 'The sudden heatwave is more likely to cause local extinction',
                  options: ['The sudden heatwave is more likely to cause local extinction', 'environmental changes affect all organisms in the same way and at the same time'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that environmental changes affect all organisms in the same way and at the same time.' }
          ],
            remediations: { 'environmental-changes-affect-all-organisms': { steps: ['Have the student choose two local organisms (e.g., a neem tree and a house sparrow) and research their specific.', 'Then, guide them to build a simple cause-effect chain: "Temperature rises → soil moisture drops → neem tree reduces.'] } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_11', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that environmental changes affect all organisms in the same way and at the same time.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Planting more trees in a city will always reduce the local temperature and help all organisms." Evaluate this statement.', answer: 'The statement is not entirely correct',
                  options: ['The statement is not entirely correct', 'environmental changes affect all organisms in the same way and at the same time'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that environmental changes affect all organisms in the same way and at the same time.' },
                { id: 'b', prompt: 'Compare the effects of a gradual temperature increase over 50 years versus a sudden heatwave lasting one week on a population of insects in a forest.', answer: 'The sudden heatwave is more likely to cause local extinction',
                  options: ['The sudden heatwave is more likely to cause local extinction', 'environmental changes affect all organisms in the same way and at the same time'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that environmental changes affect all organisms in the same way and at the same time.' }
          ],
            remediations: { 'environmental-changes-affect-all-organisms': { steps: ['Have the student choose two local organisms (e.g., a neem tree and a house sparrow) and research their specific.', 'Then, guide them to build a simple cause-effect chain: "Temperature rises → soil moisture drops → neem tree reduces.'] } } },
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
            remediations: { 'deforestation-only-affects-the-trees': { steps: ['**Visual Demo:** Use a jigsaw puzzle of a food web.', 'Remove the \'tree\' pieces (producers).', 'Show how herbivore pieces have no connections, then carnivore pieces fall away.', '**Map Exercise:** Give students a map of a fictional forest with a highway cutting through.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
