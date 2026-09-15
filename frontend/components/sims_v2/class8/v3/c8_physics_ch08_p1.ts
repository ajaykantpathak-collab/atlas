import type { SimDef } from '../../engine/types';

/** v3 generated — c8_physics_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_physics_ch08_p1: SimDef = {
    id: 'v3_c8_physics_ch08_p1',
    title: 'How Nature Works in Harmony · Part 1/2',
    subtitle: 'Every creature\'s address includes the non-living',
    classLevel: 8, subject: 'physics', topic: 'How Nature Works in Harmony · Part 1/2',
    chapters: ['c8_physics_ch08'],
    nodeIds: ['c8_physics_ch8_1', 'c8_physics_ch8_10', 'c8_physics_ch8_11', 'c8_physics_ch8_2', 'c8_physics_ch8_3', 'c8_physics_ch8_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a habitat surveyor', intro: 'Look at a pond and you\'ll list fish and frogs — but the real habitat includes sunlight, oxygen and mud. Learn to see the invisible half of every home in nature.', goal: 'Understand a habitat as the combination of biotic (living) and abiotic (non-living) components, and how abiotic factors like water, light and soil shape the organisms within.' },
    discovery: {
        question: '\'Soil is just dirt — it doesn\'t count as part of a habitat.\' Your classmate says this in a garden full of roses and butterflies. Is he right?',
        options: ['No — a habitat is living (biotic) AND non-living (abiotic) parts; soil anchors plants, holds water and feeds the whole web', 'Yes — only living things count', 'Partly — soil counts only for worms', 'No — because dirt is technically alive'],
        answer: 'No — a habitat is living (biotic) AND non-living (abiotic) parts; soil anchors plants, holds water and feeds the whole web',
        hook: 'A habitat isn\'t just the creatures you can see — it\'s their full address: sunlight, water, air, soil and temperature included. A fish\'s home isn\'t \'water\'; it\'s water + dissolved oxygen + the muddy bottom.',
    },
    teaching: [
        { title: 'Habitat: Definition and Components (Living and Non-Living)', text: 'A habitat is the natural environment where an organism lives, providing all necessary biotic (living) and abiotic (non-living) components for its survival, growth, and reproduction.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_physics_ch8_1', title: 'Your mission',
          mission: { widget: 'prism', validate: 'prism:angle=60',
            instruction: 'On the lab: set the light angle to 60° — how does the spectrum shift?.',
        context: 'Audit three habitats — a garden, a desert, a freshwater lake. Sort every component into biotic or abiotic, then predict what happens to each habitat if just one abiotic factor (water, light, heat) is taken away.',
            observePrompt: 'What did the prism interactive show you?' } },
        { type: 'case', nodeId: 'c8_physics_ch8_1', title: 'Habitat: Definition and Components (Living and Non-Living)',
          caseStudy: { intro: 'Start by asking students to observe a nearby tree or pond: "What do you see living on and around it?" List their observations (birds, insects, moss, water.',
            decisions: [{ prompt: 'What are the two main components of a habitat, and give one example of each from a forest habitat?', options: [
                { text: 'The two main components are biotic (living) and abiotic (non-living)', outcome: 'The two main components are biotic (living) and abiotic (non-living).' },
                { text: 'background', outcome: 'Not quite — Students often think that only the visible living things (plants, animals) are part of a habitat.', reveals: 'only-the-visible-living-things' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch8_10', title: 'Symbiotic Relationships: Mutualism, Commensalism, Parasitism',
          caseStudy: { intro: 'Observe a cattle egret walking beside a grazing cow in a field — the bird snaps up insects stirred up by the cow\'s hooves while the cow seems unbothered.',
            decisions: [{ prompt: 'A student sees a remora fish attached to a shark. The remora gets transport and food scraps; the shark is neither helped nor harmed.', options: [
                { text: 'Commensalism', outcome: 'Commensalism. A wrong answer (e.g., mutualism or parasitism) reveals the student cannot correctly.' },
                { text: 'symbiosis', outcome: 'Not quite — Students often believe "symbiosis" automatically means "both organisms benefit" because the word.', reveals: 'symbiosis-automatically-means-both-organisms' },
                { text: 'both organisms benefit', outcome: 'Not quite — Students often believe "symbiosis" automatically means "both organisms benefit" because the word.', reveals: 'symbiosis-automatically-means-both-organisms' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch8_11', title: 'Environmental Changes and Their Effects on Organisms',
          caseStudy: { intro: 'Observe a nearby pond in summer: the water level drops, the water becomes warmer, and fewer frogs and insects are visible.',
            decisions: [{ prompt: 'What are the four main physical (abiotic) environmental factors that, when changed, most directly affect the survival of organisms in.', options: [
                { text: 'The four main physical factors are temperature, light availability, water availability,', outcome: 'The four main physical factors are temperature, light availability, water availability, and air.' },
                { text: 'environmental changes affect all organisms in the same way and at the same time', outcome: 'Not quite — Students often think that environmental changes affect all organisms in the same way and at the.', reveals: 'environmental-changes-affect-all-organisms' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch8_3', title: 'Producers, Consumers, and Decomposers in an Ecosystem',
          caseStudy: { intro: 'Observe a small kitchen garden or park: you see grass, a grasshopper on a leaf, a bird pecking at the grasshopper, and white mold on a fallen fruit.',
            decisions: [{ prompt: 'Name the three main functional groups of organisms in an ecosystem based on how they obtain energy, and give one common example of each.', options: [
                { text: 'Producers (e.g., mango tree), Consumers (e.g., goat), Decomposers (e.g., bread mold)', outcome: 'Producers (e.g., mango tree), Consumers (e.g., goat), Decomposers (e.g., bread mold).' },
                { text: 'plants, animals, bacteria', outcome: 'Not quite — Students often think decomposers are just "small consumers" because both feed on other organisms.', reveals: 'decomposers-are-just-small-consumers' },
                { text: 'small consumers', outcome: 'Not quite — Students often think decomposers are just "small consumers" because both feed on other organisms.', reveals: 'decomposers-are-just-small-consumers' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_physics_ch8_4', title: 'Food Chains: Transfer of Energy from One Organism to Another',
          scaffold: { problem: 'In a grassland ecosystem, grass (producers) captures 25,000 J of solar energy per square metre per day.',
            steps: [
            { text: 'Identify given — Producer energy E₁ = 25,000 J; trophic levels: grass (n=1), grasshopper (n=2), frog (n=3), snake.' },
            { text: 'Write formula Eₙ = E₁ × (0.10)ⁿ⁻¹. For snake, n=4, so exponent = 4−1 = 3.' },
            { text: 'Substitute: E₄ = 25,000 J × (0.10)³ = 25,000 J × 0.001.' },
            { text: 'Compute: 25,000 × 0.001 = 25. Track units: J × (no unit) = J.' },
            { text: 'Verify reasonableness — 25 J is very small compared to 25,000 J, consistent with 90% loss at each of three transfers.', faded: true, blankAnswer: '25 J' }
            ] } },
        { type: 'case', nodeId: 'c8_physics_ch8_1', title: 'Use it in the wild',
          caseStudy: { intro: 'For a habitat poster, a group lists \'fish, frogs, water plants\' under \'parts of a pond habitat\' and writes \'water, sunlight, mud\' under \'just background — not really part of it.\'',
            decisions: [{ prompt: 'Does the second column belong in the habitat?', options: [
                { text: 'Absolutely — a habitat is biotic plus abiotic components together: the water, dissolved oxygen, sunlight and muddy bottom are what let the fish and plants live. Remove the \'background\' and the living column collapses with it.', outcome: 'This recognises that non-living factors are not scenery — they are the survival conditions every organism in the habitat depends on.' },
                { text: 'The split is correct — only living things make a habitat; the rest is setting, like furniture in a room.', outcome: 'Without water and dissolved oxygen there are no fish at all; abiotic components are habitat members, not furniture.', reveals: 'habitat-is-living-only' },
                { text: 'The abiotic items matter only for plants, since animals like fish do not use sunlight or soil.', outcome: 'Fish depend on plants and algae driven by sunlight and on oxygen dissolved from air and photosynthesis — the abiotic web feeds everything.', reveals: 'animals-need-no-abiotic' }
            ] }] } },
        { type: 'case', nodeId: 'c8_physics_ch8_4', title: 'The bigger picture',
          caseStudy: { intro: 'Every organism lives at an address made of sunlight, soil, water and air as much as neighbours and predators. Remove one abiotic piece and the whole arrangement collapses.',
            decisions: [{ prompt: 'What comes next? How Nature Works in Harmony · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — How Nature Works in Harmony · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'prism', prompt: 'Explore the prism interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'prism', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_physics_ch8_1', difficulty: 'standard',
          question: 'A habitat is the natural environment where an organism lives, providing all.',
          hint: 'If stuck, review c6_physics_ch11_035 (light sources), c6_physics_ch07_019 (heat flow).',
          misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living.',
          parts: [
                { id: 'a', prompt: 'What are the two main components of a habitat, and give one example of each from a forest habitat?', answer: 'The two main components are biotic (living) and abiotic (non-living)',
                  options: ['The two main components are biotic (living) and abiotic (non-living)', 'background'],
                  hint: 'If stuck, review c6_physics_ch11_035 (light sources), c6_physics_ch07_019 (heat flow), and.',
                  misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living things like air.' },
                { id: 'b', prompt: 'Why is sunlight considered an abiotic component of a habitat, and how does it directly affect the biotic components in a pond habitat?', answer: 'Sunlight is non-living, thus abiotic',
                  options: ['Sunlight is non-living, thus abiotic', 'background'],
                  hint: 'If stuck, review c6_physics_ch11_035 (light sources), c6_physics_ch07_019 (heat flow), and.',
                  misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living things like air.' },
                { id: 'c', prompt: 'A student observes a garden and records: rose plants, butterflies, soil, water, air, and sunlight. Classify each as biotic or abiotic.', answer: 'Biotic: rose plants, butterflies',
                  options: ['Biotic: rose plants, butterflies', 'background'],
                  hint: 'If stuck, review c6_physics_ch11_035 (light sources), c6_physics_ch07_019 (heat flow), and.',
                  misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living things like air.' },
                { id: 'd', prompt: 'Compare the abiotic components of a desert habitat and a freshwater lake habitat.', answer: 'Desert: high temperature, low water availability, sandy soil',
                  options: ['Desert: high temperature, low water availability, sandy soil', 'background'],
                  hint: 'If stuck, review c6_physics_ch11_035 (light sources), c6_physics_ch07_019 (heat flow), and.',
                  misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living things like air.' }
          ],
            remediations: { 'only-the-visible-living-things': { steps: ['If a student holds this misconception, conduct a "habitat in a bottle" activity: Set up two sealed jars with water, one.', 'After a week, observe changes.', 'Discuss how abiotic factors (light, CO2, O2) interact with biotic components.', 'Then revisit the definition and have the student re-classify components of a local habitat.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living.',
          parts: [
                { id: 'a', prompt: 'A classmate says, "Soil is just dirt, so it\'s not important for a habitat." Evaluate this statement using the concept of abiotic components.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'background'],
                  hint: 'If stuck, review c6_physics_ch11_035 (light sources), c6_physics_ch07_019 (heat flow), and.',
                  misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living things like air.' },
                { id: 'b', prompt: 'Design a simple investigation to study the effect of one abiotic factor (choose light, water, or temperature) on the growth of a common plant (e.g., bean.', answer: 'Example: Investigate effect of light on bean sprout growth',
                  options: ['Example: Investigate effect of light on bean sprout growth', 'background'],
                  hint: 'If stuck, review c6_physics_ch11_035 (light sources), c6_physics_ch07_019 (heat flow), and.',
                  misconception: 'Students often think that only the visible living things (plants, animals) are part of a habitat, and that non-living things like air.' }
          ],
            remediations: { 'only-the-visible-living-things': { steps: ['If a student holds this misconception, conduct a "habitat in a bottle" activity: Set up two sealed jars with water, one.', 'After a week, observe changes.', 'Discuss how abiotic factors (light, CO2, O2) interact with biotic components.', 'Then revisit the definition and have the student re-classify components of a local habitat.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_10', difficulty: 'standard',
          question: 'Symbiosis is a close, long-term biological interaction between two different.',
          hint: 'Revisit interdependence in ecosystems (c8_physics_ch8_7) and practice identifying.',
          misconception: 'Students often believe "symbiosis" automatically means "both organisms benefit" because the word is used colloquially.',
          parts: [
                { id: 'a', prompt: 'A student sees a remora fish attached to a shark. The remora gets transport and food scraps; the shark is neither helped nor harmed.', answer: 'Commensalism',
                  options: ['Commensalism', 'symbiosis', 'both organisms benefit', 'any close association must benefit or harm both partners'],
                  hint: 'Revisit interdependence in ecosystems (c8_physics_ch8_7) and practice identifying benefits/harms.',
                  misconception: 'Students often believe "symbiosis" automatically means "both organisms benefit" because the word is used colloquially to imply cooperation.' },
                { id: 'b', prompt: 'In a certain forest, ants live in the hollow thorns of an acacia tree.', answer: 'Mutualism; sign pair (+,+)',
                  options: ['Mutualism; sign pair (+,+)', 'symbiosis', 'both organisms benefit'],
                  hint: 'Revisit interdependence in ecosystems (c8_physics_ch8_7) and practice identifying benefits/harms.',
                  misconception: 'Students often believe "symbiosis" automatically means "both organisms benefit" because the word is used colloquially to imply cooperation.' }
          ],
            remediations: { 'symbiosis-automatically-means-both-organisms': { steps: ['Create a three-column chart with headings "Both benefit (+,+)", "One benefits, other unaffected (+,0)", "One benefits.', 'Give the student 5 clear local examples (e.g., lichen, barnacles on whale, leech on cow) and have them place each.', 'Ask the student to write the term (mutualism, commensalism, parasitism) at the top of each column.', 'Reinforce that "symbiosis" is the umbrella term for all three columns.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_11', difficulty: 'standard',
          question: 'Environmental changes refer to alterations in physical factors such.',
          hint: 'Review the food web (c8_physics_ch8_5) and habitat components (c8_physics_ch8_1) to see.',
          misconception: 'Students often think that environmental changes affect all organisms in the same way and at the same time.',
          parts: [
                { id: 'a', prompt: 'A region experiences a 30% reduction in annual rainfall over five years. The soil moisture drops from 25% to 15% (by volume).', answer: '1) Reduced photosynthesis',
                  options: ['1) Reduced photosynthesis', 'plants die', 'environmental changes affect all organisms in the same way and at the same time'],
                  hint: 'Review the food web (c8_physics_ch8_5) and habitat components (c8_physics_ch8_1) to see how.',
                  misconception: 'Students often think that environmental changes affect all organisms in the same way and at the same time.' },
                { id: 'b', prompt: 'Compare the effects of a gradual temperature increase over 50 years versus a sudden heatwave lasting one week on a population of insects in a forest.', answer: 'The sudden heatwave is more likely to cause local extinction',
                  options: ['The sudden heatwave is more likely to cause local extinction', 'environmental changes affect all organisms in the same way and at the same time'],
                  hint: 'Review the food web (c8_physics_ch8_5) and habitat components (c8_physics_ch8_1) to see how.',
                  misconception: 'Students often think that environmental changes affect all organisms in the same way and at the same time.' }
          ],
            remediations: { 'environmental-changes-affect-all-organisms': { steps: ['Have the student choose two local organisms (e.g., a neem tree and a house sparrow) and research their specific.', 'Then, guide them to build a simple cause-effect chain: "Temperature rises → soil moisture drops → neem tree reduces.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_2', difficulty: 'standard',
          question: 'An ecosystem is a functional unit where living organisms (biotic components).',
          hint: 'If stuck, review Class 6 "Sources of Light" and "The Water Cycle and Heat Transfer".',
          misconception: 'Students often think abiotic components are just a passive background and do not actively influence living organisms.',
          parts: [
                { id: 'a', prompt: 'Explain why sunlight is considered the primary energy source for most ecosystems, and describe how it enters the living component of the ecosystem.', answer: 'Sunlight is the primary energy source',
                  options: ['Sunlight is the primary energy source', 'sunlight gives heat to animals', 'plants eat sunlight'],
                  hint: 'If stuck, review Class 6 "Sources of Light" and "The Water Cycle and Heat Transfer" to recall how.',
                  misconception: 'Students often think abiotic components are just a passive background and do not actively influence living organisms.' },
                { id: 'b', prompt: 'Compare a desert ecosystem and a tropical rainforest ecosystem in terms of two abiotic factors and predict how these factors limit the types of biotic.', answer: 'Desert: low rainfall, high temperature extremes → biotic community limited to',
                  options: ['Desert: low rainfall, high temperature extremes → biotic community limited to', 'lists only temperature or only rainfall, or says both have same organisms'],
                  hint: 'If stuck, review Class 6 "Sources of Light" and "The Water Cycle and Heat Transfer" to recall how.',
                  misconception: 'Students often think abiotic components are just a passive background and do not actively influence living organisms.' }
          ],
            remediations: { 'abiotic-components-are-just-a': { steps: ['If a student holds this misconception, conduct a mini-investigation: Place two identical potted plants – one watered.', 'After a week, observe wilting in the unwatered plant.', 'Ask: "What abiotic factor changed?', 'How did the living plant respond?" Then show a dead leaf and a rock; ask which was once living.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_3', difficulty: 'standard',
          question: 'Producers are organisms (mainly green plants) that capture solar energy through.',
          hint: 'Review photosynthesis (Class 6 Light chapter) and the idea that energy changes form but.',
          misconception: 'Students often think decomposers are just "small consumers" because both feed on other organisms.',
          parts: [
                { id: 'a', prompt: 'In a pond ecosystem, you observe: (a) algae, (b) tadpole, (c) water beetle, (d) bacteria on dead leaves.', answer: 'algae, (',
                  options: ['algae, (', 'small consumers', 'decomposers are just "small consumers"'],
                  hint: 'Review photosynthesis (Class 6 Light chapter) and the idea that energy changes form but is not.',
                  misconception: 'Students often think decomposers are just "small consumers" because both feed on other organisms.' },
                { id: 'b', prompt: 'Compare the energy flow path in a forest ecosystem when (i) a deer eats grass and (ii) a fungus grows on a dead deer.', answer: 'In (i), chemical energy in grass moves to deer via ingestion',
                  options: ['In (i), chemical energy in grass moves to deer via ingestion', 'both transfer energy the same way', 'small consumers', 'decomposers are just "small consumers"'],
                  hint: 'Review photosynthesis (Class 6 Light chapter) and the idea that energy changes form but is not.',
                  misconception: 'Students often think decomposers are just "small consumers" because both feed on other organisms.' }
          ],
            remediations: { 'decomposers-are-just-small-consumers': { steps: ['Conduct a side-by-side observation: Place a piece of ripe banana in two jars.', 'In Jar A, add a few ants (consumers); in Jar B, leave it open to air (decomposers).', 'After 3 days, compare: Jar A shows bite marks and ant feces (internal digestion); Jar B shows liquefaction, fungal.', 'Discuss how Jar B returns nutrients to soil while Jar A transfers energy to ant biomass.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } },
        { type: 'subpart', nodeId: 'c8_physics_ch8_4', difficulty: 'standard',
          question: 'A food chain is a linear sequence showing how energy stored in organic matter.',
          hint: 'Review c8_physics_ch8_3 for trophic level definitions and Class 7 percentage-to-decimal.',
          misconception: 'Students believe the 10% rule means each organism *keeps* 10% and *passes* 90% to the next level — exactly backwards.',
          parts: [
                { id: 'a', prompt: 'State the approximate percentage of energy transferred from one trophic level to the next in a typical food chain, and give the SI unit for measuring this.', answer: 'About 10% of energy transfers to the next trophic level',
                  options: ['About 10% of energy transfers to the next trophic level', 'energy is measured in watts'],
                  hint: 'Review c8_physics_ch8_3 for trophic level definitions and Class 7 percentage-to-decimal conversion.',
                  misconception: 'Students believe the 10% rule means each organism *keeps* 10% and *passes* 90% to the next level — exactly backwards.' },
                { id: 'b', prompt: 'Explain why a food chain rarely has more than four or five trophic levels, using the 10% rule and the concept of energy dissipation.', answer: 'At each step 90% of energy is lost as heat, waste, and uneaten parts',
                  options: ['At each step 90% of energy is lost as heat, waste, and uneaten parts', 'predators are fewer'],
                  hint: 'Review c8_physics_ch8_3 for trophic level definitions and Class 7 percentage-to-decimal conversion.',
                  misconception: 'Students believe the 10% rule means each organism *keeps* 10% and *passes* 90% to the next level — exactly backwards.' }
          ],
            remediations: { 'the-10-rule-means-each': { steps: ['Use a concrete analogy — give a student ₹100 (producer energy).', 'Draw the pyramid together, labelling each level with "Used for life: 90%" and "Passed on: 10%".', 'Re-calculate the pond example (50,000 J → 50 J) aloud, emphasising "passed on" at each arrow.', 'Ask the student to explain in their own words why the snake gets only 10 J, not 9,000 J.'], labTask: { instruction: 'On the interactive: set the light angle to 60° — how does the spectrum shift? — then check.', widget: 'prism', validate: 'prism:angle=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
