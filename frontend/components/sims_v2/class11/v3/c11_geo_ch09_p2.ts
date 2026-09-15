import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch09_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch09_p2: SimDef = {
    id: 'v3_c11_geo_ch09_p2',
    title: 'Physiography of India · Part 2/2',
    subtitle: 'Read India\'s six landform regions as six different geological histories.',
    classLevel: 11, subject: 'geography', topic: 'Physiography of India · Part 2/2',
    chapters: ['c11_geo_ch09'],
    nodeIds: ['c11_geo_cbse_09_007', 'c11_geo_cbse_09_008', 'c11_geo_cbse_09_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a physiographer flying the country in terrain view', intro: 'Towering arc, flat plain, worn-down plateau — one country assembled from very different crust.', goal: 'Identify India\'s physiographic divisions and the structural logic behind them.' },
    discovery: {
        question: 'Sand dunes, scorching aridity — so the Thar surely earns its own physiographic division?',
        options: ['No — structurally it\'s the Peninsular Plateau\'s western margin; a climatic region painted on a physiographic unit', 'Yes — deserts are always separate divisions', 'Yes — its climate makes it geologically distinct', 'No — it actually belongs to the Northern Plains'],
        answer: 'No — structurally it\'s the Peninsular Plateau\'s western margin; a climatic region painted on a physiographic unit',
        hook: 'Physiography reads the bones, not the weather — the Thar sits on Precambrian craton like the rest of the peninsula.',
    },
    teaching: [
        { title: 'The Coastal Plains: East Coast vs West Coast', text: 'The Coastal Plains of India are narrow strips of low-lying flat land along the Arabian Sea (West Coast) and the Bay of Bengal (East Coast), formed by marine and fluvial depositional processes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Divide India into its six physiographic units by structure and history, then explain why the Himalayan width varies from 150 to 400 km along the arc.',
        labels: ['The Coastal Plains: East', 'The Islands: Andaman-Nicobar (Bay', 'Drainage Systems of India'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_geo_cbse_09_007', title: 'The Coastal Plains: East Coast vs West Coast',
          caseStudy: { intro: 'Observe a satellite image of India\'s coastline: the western side appears as a thin, almost unbroken line squeezed between the Western Ghats and the Arabian.',
            decisions: [{ prompt: 'Name the four subdivisions of the Western Coastal Plain from north to south and state the approximate width range of this plain.', options: [
                { text: 'Correct answer: Kachchh & Kathiawar, Konkan, Kanara (or Karnataka), Malabar', outcome: 'Correct answer: Kachchh & Kathiawar, Konkan, Kanara (or Karnataka), Malabar; width 50-60 km.' },
                { text: 'Coromandel or stating width >100 km', outcome: 'Not quite — Students often think the Eastern Coastal Plain is wider *because* the Eastern Ghats are higher than.', reveals: 'the-eastern-coastal-plain-is' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_09_008', title: 'The Islands: Andaman-Nicobar (Bay of Bengal) and Lakshadweep (Arabian Sea)',
          scaffold: { problem: 'A research team measures the water table on Kavaratti Island (Lakshadweep) at 0.5 m above mean sea level during post-monsoon.',
            steps: [
            { text: 'Identify the applicable principle — Ghyben-Herzberg relation for freshwater lenses on small oceanic islands.' },
            { text: 'Recall the density ratio: ρ_s ≈ 1025 kg/m³, ρ_f ≈ 1000 kg/m³ → ρ_s/(ρ_s - ρ_f) = 1025/25 = 41.' },
            { text: 'Apply formula h = 41 × z, where z = 0.5 m → h = 41 × 0.5 = 20.5 m below sea level.' },
            { text: 'Total freshwater column = z + h = 0.5 + 20.5 = 21 m. But aquifer thickness = 15 m.' },
            { text: 'Interpret: Theoretical lens (21 m) exceeds aquifer thickness (15 m) → lens is truncated at base; sustainable yield.', faded: true, blankAnswer: 'Theoretical lens thickness = 20.5 m below MSL; total.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_09_009', title: 'Drainage Systems of India: Himalayan vs Peninsular Rivers',
          caseStudy: { intro: 'Begin by asking students to observe a physical map of India and trace the Ganga from Gangotri to the Bay of Bengal, then trace the Godavari from Trimbak to the.',
            decisions: [{ prompt: 'Name the two major river systems of India based on their origin and give one example of each.', options: [
                { text: 'The two major river systems are Himalayan rivers (e.g., Ganga) and Peninsular rivers', outcome: 'The two major river systems are Himalayan rivers (e.g., Ganga) and Peninsular rivers (e.g.' },
                { text: 'exceptions', outcome: 'Not quite — Students think the Narmada and Tapi are "exceptions" among Peninsular rivers because they flow.', reveals: 'the-narmada-and-tapi-are' },
                { text: 'Indus and Ganga as two systems', outcome: 'Not quite — Students think the Narmada and Tapi are "exceptions" among Peninsular rivers because they flow.', reveals: 'the-narmada-and-tapi-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a map exhibition you must label India\'s physiographic divisions. A teammate draws a separate \'Thar Desert division\' bounded by the 250 mm rainfall line, and shades the whole Himalayan arc as one uniform \'mountain division\'.',
            decisions: [{ prompt: 'What should the map actually show?', options: [
                { text: 'Redraw on structural grounds: the Thar is a climatic region superimposed on the Peninsular Plateau\'s western margin — its boundary is the geological contact with the Aravalli basement, not the 250 mm isohyet. And the Himalayas are three distinct longitudinal belts — Himadri, Himachal, Shiwaliks — with different geology and origins; the Shiwaliks are a foreland-basin unit, not mere \'foothills\'.', outcome: 'The map now reflects what the divisions are — surface expressions of distinct tectonic provinces — instead of climate zones and a single wall of mountain.' },
                { text: 'Keep the Thar division — a desert that looks that different deserves its own unit.', outcome: 'Physiographic divisions are geological, not climatic: the Thar sits on Precambrian peninsula basement under wind-blown deposits — aridity is a climate overlay.', reveals: 'thar-is-own-division' },
                { text: 'Keep the single Himalayan unit — it\'s one continuous chain, so subdividing is overkill.', outcome: 'The chain is neither uniform nor single: the belts differ in lithology, structure and origin — Pir Panjal, for instance, is Himachal, not Himadri.', reveals: 'himalayas-one-uniform-range' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_09_009', title: 'You made it',
          caseStudy: { intro: 'The Himalaya, the plains, the peninsula, the desert, the coasts, the islands — six units, six different geological biographies.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_007', difficulty: 'standard',
          question: 'The Coastal Plains of India are narrow strips of low-lying flat land along the.',
          hint: 'Revise Class 9 Ch.2 "Erosion and Deposition by Sea Waves and Wind" (c9_geo_ch1_9) and.',
          misconception: 'Students often think the Eastern Coastal Plain is wider *because* the Eastern Ghats are higher than the Western Ghats.',
          parts: [
                { id: 'a', prompt: 'Name the four subdivisions of the Western Coastal Plain from north to south and state the approximate width range of this plain.', answer: 'Correct answer: Kachchh & Kathiawar, Konkan, Kanara (or Karnataka), Malabar',
                  options: ['Correct answer: Kachchh & Kathiawar, Konkan, Kanara (or Karnataka), Malabar', 'Coromandel or stating width >100 km'],
                  hint: 'Revise Class 9 Ch.2 "Erosion and Deposition by Sea Waves and Wind" (c9_geo_ch1_9) and Class 10.',
                  misconception: 'Students often think the Eastern Coastal Plain is wider *because* the Eastern Ghats are higher than the Western Ghats.' }
          ],
            remediations: { 'the-eastern-coastal-plain-is': { steps: ['On a physical map, trace the 200 m contour line along both coasts — measure the horizontal distance from this contour.', 'Plot the longitudinal profiles of Narmada (west) and Godavari (east) — note gradient change in lower reaches.', 'Overlay cyclone track data (IMD) for 2000-2020 — count landfalls on each coast.', 'Re-read NCERT Class 11 Ch.9 section "Coastal Plains" focusing on the terms "submerged coast" and "emergent coast".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_008', difficulty: 'standard',
          question: 'The Andaman-Nicobar Islands (Bay of Bengal) are a tectonically active, volcanic.',
          hint: 'Revisit Class 9 Chapter 2 (Plate Tectonics) for boundary types and Class 9 Chapter 3.',
          misconception: 'Students consistently believe both island groups are "coral islands" because textbooks often group them together.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Andaman-Nicobar Islands (Bay of Bengal) are a tectonically active, volcanic island',
                  options: ['The Andaman-Nicobar Islands (Bay of Bengal) are a tectonically active, volcanic island', 'Physiographic divisions of India refer to the classification of the Indian landmass into', 'The Himalayan Mountains are a young fold mountain system formed by the convergent', 'The Northern Plains of India are a vast, flat alluvial tract formed by the continuous'],
                  hint: 'Revisit Class 9 Chapter 2 (Plate Tectonics) for boundary types and Class 9 Chapter 3 (Volcanoes).',
                  misconception: 'Students consistently believe both island groups are "coral islands" because textbooks often group them together as "India\'s islands." They.' }
          ],
            remediations: { 'students-consistently-believe-both-island': { steps: ['Draw two cross-sections side-by-side — Andaman: deep trench → volcanic arc → folded sedimentary hills → narrow shelf →.', 'Label rock types (andesite/basalt vs. coral limestone) and mark groundwater (spring vs. lens).', 'Overlay climate data (both ~2000-3000 mm rain) and ask: "Same rain, different geology → different water systems. Why?"', 'Map 2004 tsunami impact — Andaman: run-up 10-15 m on coasts, inland penetration limited by hills; Lakshadweep.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently believe both island groups are "coral islands" because textbooks often group them together.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The strategic value of Andaman-Nicobar Islands for India\'s maritime security is primarily due to their location astride the Malacca.', answer: 'Correct evaluation: Statement is partially correct but oversimplified',
                  options: ['Correct evaluation: Statement is partially correct but oversimplified', 'nearness to trade routes'],
                  hint: 'Revisit Class 9 Chapter 2 (Plate Tectonics) for boundary types and Class 9 Chapter 3 (Volcanoes).',
                  misconception: 'Students consistently believe both island groups are "coral islands" because textbooks often group them together as "India\'s islands." They.' }
          ],
            remediations: { 'students-consistently-believe-both-island': { steps: ['Draw two cross-sections side-by-side — Andaman: deep trench → volcanic arc → folded sedimentary hills → narrow shelf →.', 'Label rock types (andesite/basalt vs. coral limestone) and mark groundwater (spring vs. lens).', 'Overlay climate data (both ~2000-3000 mm rain) and ask: "Same rain, different geology → different water systems. Why?"', 'Map 2004 tsunami impact — Andaman: run-up 10-15 m on coasts, inland penetration limited by hills; Lakshadweep.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_09_009', difficulty: 'standard',
          question: 'The drainage system of India comprises two distinct river regimes: Himalayan.',
          hint: 'Review Class 9 "Drainage Patterns" (c9_geo_ch1_8) and Class 11 "Himalayan Mountains".',
          misconception: 'Students think the Narmada and Tapi are "exceptions" among Peninsular rivers because they flow west, and mistakenly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The drainage system of India comprises two distinct river regimes: Himalayan rivers',
                  options: ['The drainage system of India comprises two distinct river regimes: Himalayan rivers', 'Physiographic divisions of India refer to the classification of the Indian landmass into', 'The Himalayan Mountains are a young fold mountain system formed by the convergent', 'The Northern Plains of India are a vast, flat alluvial tract formed by the continuous'],
                  hint: 'Review Class 9 "Drainage Patterns" (c9_geo_ch1_8) and Class 11 "Himalayan Mountains".',
                  misconception: 'Students think the Narmada and Tapi are "exceptions" among Peninsular rivers because they flow west, and mistakenly classify them.' }
          ],
            remediations: { 'the-narmada-and-tapi-are': { steps: ['On a tectonic map of India, locate the Narmada-Son lineament and the Satpura range.', 'Trace the Narmada from Amarkantak to the Gulf of Khambhat; note it flows through a graben (rift valley) bounded.', 'Compare with the Indus which flows through a suture zone (Indus-Tsangpo suture) in the Himalayas.', 'List regime data: Narmada discharge drops to <10 m³/s in summer; Indus remains >500 m³/s.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
