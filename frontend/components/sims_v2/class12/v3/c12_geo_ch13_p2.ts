import type { SimDef } from '../../engine/types';

/** v3 generated — c12_geo_ch13_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_geo_ch13_p2: SimDef = {
    id: 'v3_c12_geo_ch13_p2',
    title: 'Mineral and Energy Resources · Part 2/2',
    subtitle: 'The fertile plains are barren underneath — geology explains why',
    classLevel: 12, subject: 'geography', topic: 'Mineral and Energy Resources · Part 2/2',
    chapters: ['c12_geo_ch13'],
    nodeIds: ['c12_geo_cbse_13_007', 'c12_geo_cbse_13_008', 'c12_geo_cbse_13_009', 'c12_geo_cbse_13_010', 'c12_geo_cbse_13_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Mineral geologist', intro: 'Jharkhand glitters, the Ganga plain grows wheat — the difference was written 2.5 billion years before either existed.', goal: 'Locate India\'s three mineral belts and connect each to the geological era that formed it.' },
    discovery: {
        question: 'The Gangetic plain — India\'s most fertile land — holds zero economic minerals, while the rocky old plateau glitters with iron and coal. Why does the rich soil have nothing underneath?',
        options: ['The plains are young alluvium — loose river fill with no deep time; minerals need billions of years of magmatism and burial, which only the ancient crystalline Peninsula went through', 'The rivers washed them away', 'Miners haven\'t looked yet', 'Plains are too fertile to mine'],
        answer: 'The plains are young alluvium — loose river fill with no deep time; minerals need billions of years of magmatism and burial, which only the ancient crystalline Peninsula went through',
        hook: 'Geology writes the resource map: Archaean shields give the three mineral belts; Gondwana rift valleys hold 97% of the coal along the Damodar–Sone–Mahanadi–Godavari line; Tertiary sedimentary basins — Assam, Cambay, Mumbai High — hold the oil. \'Where\' is decided by \'when the rock formed\'.',
    },
    teaching: [
        { title: 'Conventional Energy: Petroleum and Natural Gas Reserves', text: 'Petroleum and natural gas are conventional fossil fuel energy resources formed from buried organic matter in sedimentary basins of tertiary geological age; in India, petroleum reserves occur.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_geo_cbse_13_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Prospect India like a geologist: pin the three mineral belts, map Gondwana coal to its rift valleys and Tertiary oil to its basins, then explain why the southwest belt has iron but no coal.',
        labels: ['Conventional Energy: Petroleum', 'Non-Conventional Energy: Solar', 'Non-Conventional Energy: Tidal, Geothermal', 'Non-Conventional Energy: Nuclear Energy', 'Conservation of Mineral'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_008', title: 'Non-Conventional Energy: Solar and Wind Energy in India',
          caseStudy: { intro: 'Begin by observing rooftop solar panels in your neighbourhood or wind turbines along the highways of western India — these are visible markers of India\'s.',
            decisions: [{ prompt: 'Name the two Indian states identified in the NCERT text as having the greatest potential for solar energy development and state the primary.', options: [
                { text: 'Correct answer: Gujarat and Rajasthan; the primary reason is their location in the', outcome: 'Correct answer: Gujarat and Rajasthan; the primary reason is their location in the western part.' },
                { text: 'Kerala or Assam', outcome: 'Not quite — Students often believe that **wind energy potential in India is highest only along the coasts**.', reveals: 'wind-energy-potential-in-india' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_13_009', title: 'Non-Conventional Energy: Tidal, Geothermal and Biogas',
          scaffold: { problem: 'The Gulf of Kachchh has a tidal range of 7 m during spring tides. A proposed barrage encloses a basin area of 150 km².',
            steps: [
            { text: 'Convert basin area to m²: 150 km² = 150 × 10⁶ m² = 1.5 × 10⁸ m².' },
            { text: 'Calculate potential energy per tidal cycle: E = 0.5 × ρ × g × A × H² = 0.5 × 1025 × 9.8 × 1.5×10⁸ × 7² = 0.5 × 1025.' },
            { text: 'Two high tides per day → energy per day = 2 × 3.69 × 10¹³ = 7.38 × 10¹³ J/day.' },
            { text: 'Average power = Energy/day ÷ seconds per day = 7.38×10¹³ ÷ 86400 ≈ 8.54 × 10⁸ W = 854 MW (theoretical).' },
            { text: 'Apply 30% efficiency: 854 × 0.30 ≈ 256 MW average output.', faded: true, blankAnswer: '~256 MW average power potential.' }
            ] } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_010', title: 'Non-Conventional Energy: Nuclear Energy in India',
          caseStudy: { intro: 'Observe how your smartphone charger gets warm — that heat comes from coal plants hundreds of kilometers away, but what if the same electricity came from.',
            decisions: [{ prompt: 'Name the two primary nuclear minerals used for energy generation in India and state the specific rock formation where uranium deposits.', options: [
                { text: 'Correct answer: Uranium and thorium', outcome: 'Correct answer: Uranium and thorium; uranium occurs in Dharwar rocks.' },
                { text: 'plutonium and uranium', outcome: 'Not quite — Students believe "nuclear energy is renewable like solar/wind" because NCERT groups it under.', reveals: 'nuclear-energy-is-renewable-like' },
                { text: 'uranium in Gondwana rocks', outcome: 'Not quite — Students believe "nuclear energy is renewable like solar/wind" because NCERT groups it under.', reveals: 'nuclear-energy-is-renewable-like' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_011', title: 'Conservation of Mineral and Energy Resources: Need and Methods',
          caseStudy: { intro: 'Observe a kabadiwala (scrap dealer) in your neighbourhood collecting old newspapers, copper wires, and aluminium cans.',
            decisions: [{ prompt: 'State the three main characteristics of mineral resources mentioned in the NCERT that make conservation necessary.', options: [
                { text: 'The three characteristics are: (1) uneven spatial distribution, (2) inverse relationship', outcome: 'The three characteristics are: (1) uneven spatial distribution, (2) inverse relationship between.' },
                { text: 'minerals are renewable', outcome: 'Not quite — Students equate "conservation" with "stopping mining" or "not using resources." In reality, NCERT.', reveals: 'students-equate-conservation-with-stopping' },
                { text: 'evenly distributed', outcome: 'Not quite — Students equate "conservation" with "stopping mining" or "not using resources." In reality, NCERT.', reveals: 'students-equate-conservation-with-stopping' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'On a mining internship, a junior analyst recommends prioritising a Karnataka magnetite prospect over Odisha haematite leases: \'Magnetite is 72% iron versus haematite\'s 70% — higher grade wins.\'',
            decisions: [{ prompt: 'What does the mineral-resources chapter say about that logic?', options: [
                { text: 'Grade alone doesn\'t pick the mine — haematite carries ~80% of India\'s reserves and production because it sits in thick, near-surface seams next to Jharia coal, while magnetite lies deeper and needs finer grinding; industrial logistics, not just chemistry, decides value.', outcome: 'The chapter\'s Odisha–Jharkhand dominance is a Weberian story: accessible high-grade haematite plus adjacent coking coal beats a two-point grade advantage buried in harder ground.' },
                { text: 'Agree — in minerals, the richest ore is always the best investment.', outcome: 'That\'s the textbook-recall error the chapter names: memorising \'magnetite = highest Fe\' without checking depth, beneficiation cost and coal proximity — which is why magnetite is not India\'s main ore despite the higher percentage.', reveals: 'grade-equals-value' },
                { text: 'Reject both — India should stop mining iron ore and conserve reserves for the future.', outcome: 'Conservation arguments target high-grade exports specifically; abandoning production ignores that the export-ban debate is about which ore leaves the country, not whether the steel economy keeps running.', reveals: 'conservation-means-closure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_geo_cbse_13_011', title: 'You made it',
          caseStudy: { intro: 'You can now read India\'s mineral map as deep time made visible — and never again expect coal under an alluvial plain.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_007', difficulty: 'standard',
          question: 'Petroleum and natural gas are conventional fossil fuel energy resources formed.',
          hint: 'If stuck, revisit the sedimentary basin map in Class 11 (c11_geo_cbse_19_006) and the.',
          misconception: 'Students often think petroleum is found all over India because they see petrol pumps everywhere, but they confuse.',
          parts: [
                { id: 'a', prompt: 'Why are petroleum reserves in India confined to sedimentary basins of the tertiary period?', answer: 'Petroleum forms from organic matter buried in sedimentary basins',
                  options: ['Petroleum forms from organic matter buried in sedimentary basins', 'because of volcanic activity', 'found in igneous rocks'],
                  hint: 'If stuck, revisit the sedimentary basin map in Class 11 (c11_geo_cbse_19_006) and the pipeline.',
                  misconception: 'Students often think petroleum is found all over India because they see petrol pumps everywhere, but they confuse distribution.' }
          ],
            remediations: { 'petroleum-is-found-all-over': { steps: ['Revisit the map in NCERT Figure 5.4 (India – Conventional Energy Resources) and identify only the *reserve* symbols.', 'List the four sedimentary basins: Assam-Arakan, Gujarat-Cambay, Mumbai Offshore, Krishna-Godavari-Kaveri.', 'For each basin, name one major oil/gas field.', 'Draw a quick sketch map from memory and compare with the textbook.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_008', difficulty: 'standard',
          question: 'Solar and wind energy in India refer to the harnessing of renewable energy from.',
          hint: 'If unable to explain why Rajasthan has high solar but also high wind, revisit the concept.',
          misconception: 'Students often believe that **wind energy potential in India is highest only along the coasts** because they associate.',
          parts: [
                { id: 'a', prompt: 'Explain why the western part of India (Rajasthan, Gujarat) has higher solar energy potential than the northeastern states, even though both receive abundant.', answer: 'Correct answer: The western region has higher solar potential',
                  options: ['Correct answer: The western region has higher solar potential', 'more sunlight'],
                  hint: 'If unable to explain why Rajasthan has high solar but also high wind, revisit the concept.',
                  misconception: 'Students often believe that **wind energy potential in India is highest only along the coasts** because they associate wind with sea.' }
          ],
            remediations: { 'wind-energy-potential-in-india': { steps: ['Revisit **c11_geo_cbse_10_002 (Monsoon: Origin and Mechanism)** to understand how the seasonal shift of ITCZ and.', 'Study the **topographical map of the Western Ghats (SOI toposheet 58D/58H)** and identify the Palghat Gap, Shencottah.', 'Use the **India Meteorological Department\'s Wind Atlas** (online) to compare wind power density at 100m hub height for.', 'Re-attempt Diagnostic Question 4 with this data.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_009', difficulty: 'standard',
          question: 'Non-conventional energy sources are renewable, environment-friendly.',
          hint: 'If stuck on geothermal distribution, revisit Class 11 "Temperature Inside the Earth.',
          misconception: 'Students confuse tidal energy with wave energy, writing "tidal energy uses waves" — but tides are caused by lunar/solar.',
          parts: [
                { id: 'a', prompt: 'Name the specific location in India where a geothermal energy plant has been commissioned, and state the geological feature that makes this site suitable.', answer: 'Manikaran in Himachal Pradesh',
                  options: ['Manikaran in Himachal Pradesh', 'Ladakh', 'Gujarat', 'tidal energy uses waves'],
                  hint: 'If stuck on geothermal distribution, revisit Class 11 "Temperature Inside the Earth: Geothermal.',
                  misconception: 'Students confuse tidal energy with wave energy, writing "tidal energy uses waves" — but tides are caused by lunar/solar gravity.' },
                { id: 'b', prompt: 'A village in Punjab generates 500 kg of cattle dung daily. If 1 kg dung yields 0.037 m³ biogas (60% methane), and a household needs 1.5 m³/day for cooking, how.', answer: 'Step 1: Daily biogas production = 500 kg × 0.037 m³/kg = 18.5 m³',
                  options: ['Step 1: Daily biogas production = 500 kg × 0.037 m³/kg = 18.5 m³', 'tidal energy uses waves'],
                  hint: 'If stuck on geothermal distribution, revisit Class 11 "Temperature Inside the Earth: Geothermal.',
                  misconception: 'Students confuse tidal energy with wave energy, writing "tidal energy uses waves" — but tides are caused by lunar/solar gravity.' },
                { id: 'c', prompt: 'Compare the spatial distribution logic of tidal vs. geothermal energy sites in India. Why are they mutually exclusive in terms of geological setting?', answer: 'Tidal sites require coastal zones with high tidal range (west coast gulfs)',
                  options: ['Tidal sites require coastal zones with high tidal range (west coast gulfs)', 'both need water', 'tidal energy uses waves'],
                  hint: 'If stuck on geothermal distribution, revisit Class 11 "Temperature Inside the Earth: Geothermal.',
                  misconception: 'Students confuse tidal energy with wave energy, writing "tidal energy uses waves" — but tides are caused by lunar/solar gravity.' }
          ],
            remediations: { 'students-confuse-tidal-energy-with': { steps: ['Revisit Class 9 plate tectonics (c9_geo_ch1_2, c9_geo_ch1_5) to understand why geothermal sites align with Himalayan.', 'Use Survey of India toposheet 45K/12 (Manikaran) to identify hot spring symbols and contour spacing indicating.', 'Watch 5-min animation of tidal barrage operation (e.g., La Rance, France) to distinguish ebb/flood generation from wave.', 'Re-attempt Diagnostic Q2 and Q4 after Steps 1–3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students confuse tidal energy with wave energy, writing "tidal energy uses waves" — but tides are caused by lunar/solar.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Biogas from municipal waste (like Okhla, Delhi) solves both energy and waste management problems, so it should replace LPG in all.', answer: 'Partially true but not scalable for full LPG replacement',
                  options: ['Partially true but not scalable for full LPG replacement', 'yes, it\'s free gas', 'tidal energy uses waves'],
                  hint: 'If stuck on geothermal distribution, revisit Class 11 "Temperature Inside the Earth: Geothermal.',
                  misconception: 'Students confuse tidal energy with wave energy, writing "tidal energy uses waves" — but tides are caused by lunar/solar gravity.' },
                { id: 'b', prompt: 'Design a state-level policy proposal for Gujarat to develop tidal energy in the Gulf of Kachchh, addressing: (a) site selection criteria, (b) environmental.', answer: 'site selection criteria, (',
                  options: ['site selection criteria, (', 'tidal energy uses waves'],
                  hint: 'If stuck on geothermal distribution, revisit Class 11 "Temperature Inside the Earth: Geothermal.',
                  misconception: 'Students confuse tidal energy with wave energy, writing "tidal energy uses waves" — but tides are caused by lunar/solar gravity.' }
          ],
            remediations: { 'students-confuse-tidal-energy-with': { steps: ['Revisit Class 9 plate tectonics (c9_geo_ch1_2, c9_geo_ch1_5) to understand why geothermal sites align with Himalayan.', 'Use Survey of India toposheet 45K/12 (Manikaran) to identify hot spring symbols and contour spacing indicating.', 'Watch 5-min animation of tidal barrage operation (e.g., La Rance, France) to distinguish ebb/flood generation from wave.', 'Re-attempt Diagnostic Q2 and Q4 after Steps 1–3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_010', difficulty: 'standard',
          question: 'Nuclear energy in India refers to electricity generated through controlled.',
          hint: 'If stuck on geological settings: revisit c11_geo_cbse_05_002 (Formation of Minerals.',
          misconception: 'Students believe "nuclear energy is renewable like solar/wind" because NCERT groups it under "Non-Conventional Energy.',
          parts: [
                { id: 'a', prompt: 'Name the two primary nuclear minerals used for energy generation in India and state the specific rock formation where uranium deposits occur.', answer: 'Correct answer: Uranium and thorium',
                  options: ['Correct answer: Uranium and thorium', 'plutonium and uranium', 'uranium in Gondwana rocks', 'nuclear energy is renewable like solar/wind'],
                  hint: 'If stuck on geological settings: revisit c11_geo_cbse_05_002 (Formation of Minerals: Igneous.',
                  misconception: 'Students believe "nuclear energy is renewable like solar/wind" because NCERT groups it under "Non-Conventional Energy Sources." They miss.' },
                { id: 'b', prompt: 'On an outline map of India, a student marks Tarapur (Maharashtra), Rawatbhata (Rajasthan), Kalpakkam (Tamil Nadu), Narora (Uttar Pradesh), Kaiga (Karnataka).', answer: 'Correct answer: Rawatbhata (Rajasthan)',
                  options: ['Correct answer: Rawatbhata (Rajasthan)', 'nuclear energy is renewable like solar/wind', 'Non-Conventional Energy Sources'],
                  hint: 'If stuck on geological settings: revisit c11_geo_cbse_05_002 (Formation of Minerals: Igneous.',
                  misconception: 'Students believe "nuclear energy is renewable like solar/wind" because NCERT groups it under "Non-Conventional Energy Sources." They miss.' }
          ],
            remediations: { 'nuclear-energy-is-renewable-like': { steps: ['Re-read NCERT p.61-62 "Non-Conventional Energy Sources" paragraph distinguishing exhaustible (nuclear) vs renewable.', 'Create a two-column table: Exhaustible (coal, petroleum, natural gas, nuclear) vs Renewable (solar, wind, tidal.', 'For each exhaustible, name the mineral fuel (uranium for nuclear).', 'Attempt Diagnostic Question 5 again — now evaluate sustainability with the correct classification.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_13_011', difficulty: 'standard',
          question: 'Conservation of mineral and energy resources refers to the sustainable.',
          hint: 'If stuck, revisit **c12_geo_cbse_13_004** (Non-ferrous scarcity) and.',
          misconception: 'Students equate "conservation" with "stopping mining" or "not using resources." In reality, NCERT conservation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Conservation of mineral and energy resources refers to the sustainable management and',
                  options: ['Conservation of mineral and energy resources refers to the sustainable management and', 'Mineral resources in India are naturally occurring inorganic substances with definite', 'Iron ore is a naturally occurring solid material from', 'Manganese, bauxite, and mica are three critical metallic and non-metallic minerals'],
                  hint: 'If stuck, revisit **c12_geo_cbse_13_004** (Non-ferrous scarcity) and **c12_geo_cbse_13_007**.',
                  misconception: 'Students equate "conservation" with "stopping mining" or "not using resources." In reality, NCERT conservation is **active management**.' }
          ],
            remediations: { 'students-equate-conservation-with-stopping': { steps: ['Revisit **c12_geo_cbse_13_001** (Mineral distribution) to re-learn *which* minerals are scarce in India (Cu, Pb, Zn) vs.', 'Re-read **c10_geo_cbse_05_008** (Class 10 Conservation) for the basic 3R framework (Reduce, Reuse, Recycle).', 'Do a **re-diagnostic**: List 5 items in your house containing copper/aluminium; trace their end-of-life path — are they.', 'This connects abstract policy to tangible material flows.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
