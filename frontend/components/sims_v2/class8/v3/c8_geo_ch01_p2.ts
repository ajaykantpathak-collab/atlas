import type { SimDef } from '../../engine/types';

/** v3 generated — c8_geo_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_geo_ch01_p2: SimDef = {
    id: 'v3_c8_geo_ch01_p2',
    title: 'Natural Resources and Their Use · Part 2/2',
    subtitle: 'When does plain nature become a resource?',
    classLevel: 8, subject: 'geography', topic: 'Natural Resources and Their Use · Part 2/2',
    chapters: ['c8_geo_ch01'],
    nodeIds: ['c8_geo_ch1_4', 'c8_geo_ch1_5', 'c8_geo_ch1_6', 'c8_geo_ch1_7', 'c8_geo_ch1_8', 'c8_geo_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a resource assessment officer', intro: 'Deep ore, sacred lithium, desert wind, hot springs — four piles of \'nature\' begging to be used. Your job: apply the four tests and decide what truly counts as a resource today.', goal: 'Understand that natural substances become resources only through utility, technological accessibility, economic feasibility and cultural acceptability — and apply these criteria to real cases.' },
    discovery: {
        question: 'High-grade iron ore sits 5 km under a Central Indian forest — but digging costs ₹10,000 a ton while the market pays only ₹4,000. Is it a resource right now?',
        options: ['No — it fails the economic feasibility test, so it\'s only a potential deposit, not a usable resource', 'Yes — iron is useful, so it automatically counts', 'Yes — anything buried underground is a resource', 'No — because it\'s in a forest and forests have no resources'],
        answer: 'No — it fails the economic feasibility test, so it\'s only a potential deposit, not a usable resource',
        hook: 'Nature doesn\'t hand us resources — humans create them. Himalayan rivers flowed for millennia before turbines turned them into electricity. Useful + reachable + affordable + acceptable: fail one test and it\'s just stuff in the ground.',
    },
    teaching: [
        { title: 'Classification by Origin: Biotic (Plants, Animals) and Abiotic (Minerals, Water)', text: 'Natural resources classified by origin are divided into **Biotic resources**, which are obtained from the biosphere and possess life or are derived from living matter (such as forests, crops.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_geo_ch1_4', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the four-tests gauntlet on real cases: Thar Desert wind then and now, lithium under a sacred site in Jammu & Kashmir, and Ladakh\'s hot springs. Decide what counts as a resource — and what stays merely potential.',
        labels: ['Classification by Origin: Biotic', 'Distribution of Natural Resources', 'Connection Between Resource Distribution', 'Sustainable Use of Natural', 'Over-Exploitation of Resources: Environmental', 'Renewable Energy Resources: Solar,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_geo_ch1_4', title: 'Classification by Origin: Biotic (Plants, Animals) and Abiotic (Minerals, Water)',
          caseStudy: { intro: 'Look around your classroom or home: the wooden desk comes from trees, the pencil lead is graphite from rock, the water in your bottle flows from a river, and.',
            decisions: [{ prompt: 'What is the primary criterion used to classify natural resources into biotic and abiotic categories?', options: [
                { text: 'The primary criterion is their **origin**—whether they are derived from living biological', outcome: 'The primary criterion is their **origin**—whether they are derived from living biological organisms.' },
                { text: 'whether they can run out', outcome: 'Not quite — Students frequently misclassify fossil fuels (coal, crude oil, natural gas) as **abiotic.', reveals: 'students-frequently-misclassify-fossil-fuels' },
                { text: 'whether they can be renewed', outcome: 'Not quite — Students frequently misclassify fossil fuels (coal, crude oil, natural gas) as **abiotic.', reveals: 'students-frequently-misclassify-fossil-fuels' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_geo_ch1_6', title: 'Connection Between Resource Distribution and Human Life',
          scaffold: { problem: 'A district in the Peninsular Plateau of Jharkhand covers an area of 5,000 km² with a total population of 2,500,000 people.',
            steps: [
            { text: 'Identify given numerical values for both districts.' },
            { text: 'Apply the Population Density formula: $\\text{Density} = \\frac{\\text{Population}}{\\text{Area}}$.' },
            { text: 'Identify the dominant natural resource in each region.' },
            { text: 'Relate resource type to land carrying capacity.' },
            { text: 'Summarize the geographic finding.', faded: true, blankAnswer: '1. Jharkhand District Density = $500\\text{ persons/km²}$.' }
            ] } },
        { type: 'case', nodeId: 'c8_geo_ch1_7', title: 'Sustainable Use of Natural Resources: Principles and Practices',
          caseStudy: { intro: 'Think about a community well in a village in Maharashtra or Rajasthan: during the monsoon, the water level rises because rainwater seeps through the porous.',
            decisions: [{ prompt: 'What is the core condition required for the extraction of a renewable resource (such as groundwater or timber) to be considered sustainable?', options: [
                { text: 'The rate of resource extraction must not exceed the natural rate of replenishment or', outcome: 'The rate of resource extraction must not exceed the natural rate of replenishment or regeneration.' },
                { text: 'never cutting trees', outcome: 'Not quite — Students frequently believe that "renewable" means a resource can never run out, no matter how much.', reveals: 'students-frequently-believe-that-renewable' },
                { text: 'stopping the use of water altogether', outcome: 'Not quite — Students frequently believe that "renewable" means a resource can never run out, no matter how much.', reveals: 'students-frequently-believe-that-renewable' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch1_8', title: 'Over-Exploitation of Resources: Environmental Consequences',
          caseStudy: { intro: 'Imagine visiting a farming village in Punjab or Haryana and noticing that farmers must dig tube wells hundreds of feet deeper than they did a decade ago just.',
            decisions: [{ prompt: 'State the primary difference between resource extraction and resource over-exploitation.', options: [
                { text: 'Resource extraction is the simple physical removal of resources for human use, whereas', outcome: 'Resource extraction is the simple physical removal of resources for human use, whereas.' },
                { text: 'they are the same, or focusing only on pollution', outcome: 'Not quite — Students frequently believe that over-exploiting groundwater only affects water availability and.', reveals: 'students-frequently-believe-that-over' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch1_9', title: 'Renewable Energy Resources: Solar, Wind, Hydro, Geothermal',
          caseStudy: { intro: 'Start by observing daily life in India: notice how solar water heaters sit on sunny rooftops in Rajasthan, or how fast-moving mountain streams turn waterwheels.',
            decisions: [{ prompt: 'Which renewable energy resource harnesses heat trapped deep within the Earth\'s interior crust?', options: [
                { text: '(B) Geothermal energy', outcome: '(B) Geothermal energy. If a student chooses Solar or Biomass energy, it reveals that they confuse.' },
                { text: 'geothermal', outcome: 'Not quite — Students often confuse **geothermal energy** with surface solar heating, believing that.', reveals: 'students-often-confuse-geothermal-energy' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch1_4', title: 'Use it in the wild',
          caseStudy: { intro: 'A geologist reports rich iron ore 5 km under a forest. Digging would cost ₹10,000 per tonne while ore sells at ₹4,000. A local official declares, \'Iron is useful, so this deposit is already a resource — start mining.\'',
            decisions: [{ prompt: 'Is the deposit a resource yet?', options: [
                { text: 'Not yet — a substance becomes a resource only when it is useful, technologically reachable, economically feasible AND culturally acceptable. Useful it is, and reachable barely, but extraction costs more than the ore is worth, so it stays a potential resource.', outcome: 'This applies all four criteria rather than stopping at usefulness — physical existence alone never makes a resource.' },
                { text: 'The official is right — anything useful found in nature is automatically a resource we can use.', outcome: 'That confuses a natural deposit with a resource; the same logic would call ancient sunlight a power plant before solar technology existed.', reveals: 'useful-equals-resource' },
                { text: 'It fails only because mining technology is lacking — with better drills the price problem disappears.', outcome: 'Even with perfect drills the economics fail: paying ₹10,000 to recover ₹4,000 of ore is unfeasible regardless of the machinery used.', reveals: 'tech-fixes-economics' }
            ] }] } },
        { type: 'case', nodeId: 'c8_geo_ch1_9', title: 'You made it',
          caseStudy: { intro: 'A resource is born when human need meets human know-how. The wind didn\'t get stronger — we got smarter. Utility, technology, cost and culture together decide what nature becomes wealth.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_geo_ch1_4', difficulty: 'standard',
          question: 'Natural resources classified by origin are divided into **Biotic resources**.',
          hint: 'If stuck, revisit Class 7 Chapter on Earth\'s environment to review the components of the.',
          misconception: 'Students frequently misclassify fossil fuels (coal, crude oil, natural gas) as **abiotic resources** simply because.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Natural resources classified by origin are divided into **Biotic resources**',
                  options: ['Natural resources classified by origin are divided into **Biotic resources**', 'A resource is any element of the natural environment (matter or energy) that has utility', 'Non-renewable resources—primarily fossil fuels such as coal, petroleum, and natural', 'Resource conservation at individual and community levels refers to the deliberate,'],
                  hint: 'If stuck, revisit Class 7 Chapter on Earth\'s environment to review the components of the biosphere.',
                  misconception: 'Students frequently misclassify fossil fuels (coal, crude oil, natural gas) as **abiotic resources** simply because they are extracted.' }
          ],
            remediations: { 'students-frequently-misclassify-fossil-fuels': { steps: ['Have the student write down the definition of a "fossil": the preserved remains or traces of ancient living organisms.', 'Trace the 300-million-year timeline of a piece of Jharia coal: living Carboniferous fern tree $\\rightarrow$ buried.', 'Compare this directly to iron ore: magma cooling/chemical precipitation of iron minerals $\\rightarrow$ never had cells.', 'Reinforce the takeaway rule: "If it was once alive or created by living organisms, it is Biotic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch1_5', difficulty: 'standard',
          question: 'Uneven resource distribution refers to the non-uniform geographic allocation.',
          hint: 'If stuck, review node `c7_geo_ch01_006` to recap how the Deccan and Central Highlands.',
          misconception: 'Students frequently believe that natural resources are distributed based on modern country borders or current weather.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Uneven resource distribution refers to the non-uniform geographic allocation of natural',
                  options: ['Uneven resource distribution refers to the non-uniform geographic allocation of natural', 'A resource is any element of the natural environment (matter or energy) that has utility', 'Non-renewable resources—primarily fossil fuels such as coal, petroleum, and natural', 'Resource conservation at individual and community levels refers to the deliberate,'],
                  hint: 'If stuck, review node `c7_geo_ch01_006` to recap how the Deccan and Central Highlands formed.',
                  misconception: 'Students frequently believe that natural resources are distributed based on modern country borders or current weather patterns alone.' }
          ],
            remediations: { 'students-frequently-believe-that-natural': { steps: ['Display a side-by-side comparative map showing: (a) India\'s Physical Divisions (Plains vs.', 'Peninsular Plateau) and (b) Mineral Distribution Map of India.', 'Direct the student to trace the overlay between the Peninsular Plateau and the distribution of Iron Ore/Coal, showing.', 'Have the student complete a 2-column chart matching physical features (River Delta, Ancient Hard Plateau, Sun-drenched.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch1_6', difficulty: 'standard',
          question: 'The connection between resource distribution and human life refers to how the.',
          hint: 'If struggling, revisit node `c8_geo_ch1_5` to review why geology, terrain, and climate.',
          misconception: 'Students often believe that high population density is purely a result of modern human preference or historical.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The connection between resource distribution and human life refers to how the spatial',
                  options: ['The connection between resource distribution and human life refers to how the spatial', 'A resource is any element of the natural environment (matter or energy) that has utility', 'Non-renewable resources—primarily fossil fuels such as coal, petroleum, and natural', 'Resource conservation at individual and community levels refers to the deliberate,'],
                  hint: 'If struggling, revisit node `c8_geo_ch1_5` to review why geology, terrain, and climate cause uneven.',
                  misconception: 'Students often believe that high population density is purely a result of modern human preference or historical politics, ignoring the.' }
          ],
            remediations: { 'high-population-density-is-purely': { steps: ['Display a physical landform map of India alongside a mineral and river map.', 'Place a transparent sheet showing population density over the physical map.', 'Have the student trace the direct match between high population density zones and river basins/coastal fertile plains.', 'Ask the student to point to low-density areas (Ladakh, Thar Desert) and explicitly state which missing physical.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch1_7', difficulty: 'standard',
          question: 'Sustainable use of natural resources is the practice of utilizing physical and.',
          hint: 'Work step by step.',
          misconception: 'Students frequently believe that "renewable" means a resource can never run out, no matter how much of it humans.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sustainable use of natural resources is the practice of utilizing physical and biological',
                  options: ['Sustainable use of natural resources is the practice of utilizing physical and biological', 'A resource is any element of the natural environment (matter or energy) that has utility', 'Non-renewable resources—primarily fossil fuels such as coal, petroleum, and natural', 'Resource conservation at individual and community levels refers to the deliberate,'],
                  hint: 'Recall the definition.',
                  misconception: 'Students frequently believe that "renewable" means a resource can never run out, no matter how much of it humans consume or how fast they.' }
          ],
            remediations: { 'students-frequently-believe-that-renewable': { steps: ['Re-read the WALKTHROUGH above, then retry the diagnostic.', 'If it still feels unclear, open the prerequisite lesson linked on this page.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch1_8', difficulty: 'standard',
          question: 'Over-exploitation of resources is the extraction and consumption of natural.',
          hint: 'If you are struggling, review the classification of renewable and non-renewable resources.',
          misconception: 'Students frequently believe that over-exploiting groundwater only affects water availability and has no impact on the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Over-exploitation of resources is the extraction and consumption of natural resources',
                  options: ['Over-exploitation of resources is the extraction and consumption of natural resources', 'A resource is any element of the natural environment (matter or energy) that has utility', 'Non-renewable resources—primarily fossil fuels such as coal, petroleum, and natural', 'Resource conservation at individual and community levels refers to the deliberate,'],
                  hint: 'If you are struggling, review the classification of renewable and non-renewable resources.',
                  misconception: 'Students frequently believe that over-exploiting groundwater only affects water availability and has no impact on the physical land.' }
          ],
            remediations: { 'students-frequently-believe-that-over': { steps: ['To correct this, use a simple sponge-and-water demonstration.', 'Show a fully saturated kitchen sponge representing a healthy aquifer supporting a light weight (representing the land.', 'Use a syringe to rapidly suck water out of the sponge, demonstrating how the sponge visibly deflates and collapses.', 'Relate this physical model directly to the alluvial plains of India to show that water extraction directly alters.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch1_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently believe that over-exploiting groundwater only affects water availability and has no impact on the.',
          parts: [
                { id: 'a', prompt: 'A state government proposes to solve a drinking water crisis by digging deeper borewells (up to 1000 feet) across a drought-prone basaltic region.', answer: 'This solution is unsustainable',
                  options: ['This solution is unsustainable', 'finding more water'],
                  hint: 'If you are struggling, review the classification of renewable and non-renewable resources.',
                  misconception: 'Students frequently believe that over-exploiting groundwater only affects water availability and has no impact on the physical land.' }
          ],
            remediations: { 'students-frequently-believe-that-over': { steps: ['To correct this, use a simple sponge-and-water demonstration.', 'Show a fully saturated kitchen sponge representing a healthy aquifer supporting a light weight (representing the land.', 'Use a syringe to rapidly suck water out of the sponge, demonstrating how the sponge visibly deflates and collapses.', 'Relate this physical model directly to the alluvial plains of India to show that water extraction directly alters.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_geo_ch1_9', difficulty: 'standard',
          question: 'Renewable energy resources are inexhaustible or naturally replenished energy.',
          hint: 'Review classification by exhaustibility (`c8_geo_ch1_3`) and physical divisions of India.',
          misconception: 'Students often confuse **geothermal energy** with surface solar heating, believing that "geothermal" means topsoil.',
          parts: [
                { id: 'a', prompt: 'Which renewable energy resource harnesses heat trapped deep within the Earth\'s interior crust?', answer: '(B) Geothermal energy',
                  options: ['(B) Geothermal energy', 'geothermal'],
                  hint: 'Review classification by exhaustibility (`c8_geo_ch1_3`) and physical divisions of India.',
                  misconception: 'Students often confuse **geothermal energy** with surface solar heating, believing that "geothermal" means topsoil warmed up by sunlight.' },
                { id: 'b', prompt: 'A development board must select a site for a 500 MW solar plant. Site A is a flat desert region in western Rajasthan with 320 sunny days annually.', answer: 'Site A (Rajasthan) must be chosen',
                  options: ['Site A (Rajasthan) must be chosen', 'geothermal'],
                  hint: 'Review classification by exhaustibility (`c8_geo_ch1_3`) and physical divisions of India.',
                  misconception: 'Students often confuse **geothermal energy** with surface solar heating, believing that "geothermal" means topsoil warmed up by sunlight.' },
                { id: 'c', prompt: 'Analyze the table below comparing two potential sites for a wind farm: | Location | Average Wind Speed | Terrain Topography | | :--- | :--- | :--- | | Location.', answer: 'Location X is viable',
                  options: ['Location X is viable', 'geothermal'],
                  hint: 'Review classification by exhaustibility (`c8_geo_ch1_3`) and physical divisions of India.',
                  misconception: 'Students often confuse **geothermal energy** with surface solar heating, believing that "geothermal" means topsoil warmed up by sunlight.' }
          ],
            remediations: { 'students-often-confuse-geothermal-energy': { steps: ['Show a cross-sectional diagram of Earth\'s interior displaying the core, mantle, subterranean magma, and water trapped.', 'Point out specific Indian locations on a geological map: Manikaran in Himachal Pradesh and Puga Valley in Ladakh, where.', 'Reinforce the root words: *"Geo"* = Earth interior, *"Thermal"* = Heat.', 'Contrast this with solar insolation from the Sun.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
