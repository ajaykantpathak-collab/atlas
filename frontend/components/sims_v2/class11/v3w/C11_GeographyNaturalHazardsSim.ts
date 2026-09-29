import type { SimDef } from '../../engine/types';
import C11_GeographyNaturalHazardsSim from '../../../simulations/c6_12/C11_GeographyNaturalHazardsSim';

/** v3 wrapped master — C11_GeographyNaturalHazardsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographynaturalhazardssim: SimDef = {
    id: 'v3w_c11_geographynaturalhazardssim',
    title: 'Natural Hazards vs Natural Disasters: Distinction and Classification',
    subtitle: 'This node covers the conceptual distinction between hazard and disaster, the UNISDR/UNDRR.',
    classLevel: 11, subject: 'geography', topic: 'Natural Hazards vs Natural Disasters: Distinction and Classification',
    chapters: [],
    nodeIds: ['c11_geo_cbse_11_001', 'c11_geo_cbse_11_008', 'c11_geo_cbse_03_009', 'c11_geo_cbse_06_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Begin with a real-world observation: show two photographs — one of the 2001 Bhuj earthquake devastation.', goal: 'Master Natural Hazards vs Natural Disasters: Distinction and Classification.' },
    discovery: {
        question: 'The 2004 Indian Ocean tsunami was triggered by a megathrust earthquake off Sumatra.',
        options: ['Primary hazard: geophysical (earthquake)', 'geophysical', 'natural disaster'],
        answer: 'Primary hazard: geophysical (earthquake)',
        hook: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is a.',
    },
    teaching: [
        { title: 'A natural hazard is a natural process or.', text: 'A natural hazard is a natural process or phenomenon (e.g., earthquake, flood, cyclone) that *poses a threat* to life, property, or the environment; a natural disaster is the *realized impact* of that.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_11_001', title: 'A natural hazard is a natural process.',
          scaffold: { problem: 'A magnitude 6.8 earthquake strikes two locations: (i) the sparsely populated Changthang plateau in Ladakh (population density 3/km²,.',
            steps: [
            { text: 'Identify the hazard — identical geophysical hazard (M6.8 earthquake, similar peak ground acceleration).' },
            { text: 'Assess exposure — Ahmedabad has extremely high exposure (millions of people/assets in hazard zone); Changthang has.' },
            { text: 'Assess vulnerability — Ahmedabad: high physical vulnerability (weak buildings), social vulnerability (dense crowds,.' },
            { text: 'Assess capacity — Ahmedabad: moderate institutional capacity (NDRF, hospitals) but overwhelmed by scale; Changthang:.' },
            { text: 'Synthesize using risk framework — Ahmedabad: High Hazard × High Vulnerability × High Exposure / Moderate Capacity =.' },
            { text: 'Conclude — Disaster is not in the ground shaking but in the human geography of the impacted place.', faded: true, blankAnswer: 'Ahmedabad experiences a disaster due to lethal combination.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_11_008', title: 'Disaster management is the systematic.',
          scaffold: { problem: 'A village in Bihar\'s Kosi floodplain experiences annual flooding.',
            steps: [
            { text: 'Hazard profiling – Map historical flood extents, breach points, and sediment deposition zones using satellite imagery.' },
            { text: 'Mitigation (structural) – Construct raised platforms (machans) for livestock/grain storage; build flood-resilient.' },
            { text: 'Mitigation (non-structural) – Enforce floodplain zoning: prohibit permanent settlements in active breach corridors;.' },
            { text: 'Preparedness – Install community-managed rain gauges and water-level markers linked to district EWS; form Village.' },
            { text: 'Response – Pre-position country boats and life jackets at VDMC; establish relief distribution protocol (dry rations,.' },
            { text: 'Recovery – Link MGNREGA for post-flood land reclamation (de-silting, bund repair); facilitate crop insurance claims.', faded: true, blankAnswer: 'A comprehensive village flood management plan with phased,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_03_009', title: 'Volcanism is the process by which.',
          scaffold: { problem: 'A basalt from the Mid-Atlantic Ridge has 0.15 ppm Nb and 0.8 ppm La. The primitive mantle values are Nb = 0.71 ppm, La = 0.68 ppm.',
            steps: [
            { text: 'Identify the batch melting equation: Cₗ/C₀ = 1 / [D + F(1-D)] → rearrange for F = [(C₀/Cₗ) - D] / (1-D)' },
            { text: 'Calculate F using Nb: C₀/Cₗ = 0.71/0.15 = 4.73; F_Nb = (4.73 - 0.015) / (1 - 0.015) = 4.715 / 0.985 ≈ 0.0479 or 4.8%' },
            { text: 'Calculate F using La: C₀/Cₗ = 0.68/0.8 = 0.85; F_La = (0.85 - 0.005) / (1 - 0.005) = 0.845 / 0.995 ≈ 0.849 or 84.9%' },
            { text: 'Recognize F_La = 85% is geologically impossible for MORB (typical F = 5-20%).' },
            { text: 'Conclude F ≈ 5% from Nb is reliable; Nb is less incompatible, less prone to source heterogeneity effects, and gives.', faded: true, blankAnswer: 'Degree of partial melting F ≈ 5% (from Nb). La gives an.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_06_003', title: 'Volcanism is the process by which magma.',
          scaffold: { problem: 'A geologist finds a 30-m thick sequence of dark, fine-grained rock with columnar jointing and no interbedded ash layers, extending.',
            steps: [
            { text: 'Identify rock type – dark, fine-grained, columnar joints = basalt.' },
            { text: 'Note absence of pyroclastic layers → non-explosive eruption.' },
            { text: 'Observe lateral extent (50+ km) and uniform thickness → fed by linear fissure, not a point vent.' },
            { text: 'Recall Deccan Traps are flood basalts from fissure eruptions associated with the Réunion hotspot (intraplate).' },
            { text: 'Conclude: fissure eruption in an intraplate hotspot setting.', faded: true, blankAnswer: 'Fissure eruption; intraplate hotspot (Réunion plume).' }
            ] } },
        { type: 'dissect', nodeId: 'c11_geo_cbse_11_008', title: 'Identify each idea',
          dissect: { specimen: 'Natural Hazards vs Natural Disasters: Distinction and Classification', spots: [
            { id: 's1', label: 'A natural hazard is a', prompt: 'Which idea is this? — A natural hazard is a natural process or phenomenon (e.g., earthquake, flood, cyclone).', answer: 'A natural hazard is a', options: ['A natural hazard is a', 'Disaster management is the systematic', 'Volcanism is the process by'] },
            { id: 's2', label: 'Disaster management is the systematic', prompt: 'Which idea is this? — Disaster management is the systematic process of planning, organizing, and implementing.', answer: 'Disaster management is the systematic', options: ['Disaster management is the systematic', 'A natural hazard is a', 'Volcanism is the process by'] },
            { id: 's3', label: 'Volcanism is the process by', prompt: 'Which idea is this? — Volcanism is the process by which molten rock (magma), gases, and solid fragments from.', answer: 'Volcanism is the process by', options: ['Volcanism is the process by', 'A natural hazard is a', 'Disaster management is the systematic'] }
          ] } }
    ],
    explore: { component: C11_GeographyNaturalHazardsSim, prompt: 'Explore the interactive — Natural Hazards vs Natural Disasters: Distinction and Classification' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_001', difficulty: 'standard',
          question: 'A natural hazard is a natural process or phenomenon (e.g., earthquake, flood,.',
          hint: 'If stuck, revisit Class 9 Geography Chapter 1 (c9_geo_ch1_12) "Natural Hazards:.',
          misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is a.',
          parts: [
                { id: 'a', prompt: 'The 2004 Indian Ocean tsunami was triggered by a megathrust earthquake off Sumatra.', answer: 'Primary hazard: geophysical (earthquake)',
                  options: ['Primary hazard: geophysical (earthquake)', 'geophysical', 'natural disaster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is a disaster, a small one.' },
                { id: 'b', prompt: 'Analyze the statement: "The 2013 Uttarakhand floods were a natural disaster caused by unprecedented cloudburst." Identify two geographical inaccuracies in this.', answer: 'Inaccuracies: (1) "Natural disaster" implies the disaster itself is natural',
                  options: ['Inaccuracies: (1) "Natural disaster" implies the disaster itself is natural', 'natural disaster', 'large natural hazard'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is a disaster, a small one.' }
          ],
            remediations: { 'natural-disaster-is-a-synonym': { steps: ['Revisit the Bhuj vs. Andaman Sea comparison in the Walkthrough.', 'On a blank India map, mark three locations: (i) high-hazard low-disaster (e.g., Andaman Sea), (ii) low-hazard.', 'For each, write one sentence using the formula: Disaster = Hazard × Vulnerability × Exposure / Capacity.', 'Explain orally to a peer why Latur (Zone III) caused more deaths than many Zone V events.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is a.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Classifying hazards into geophysical, hydrological, meteorological, climatological, and biological is merely academic; for disaster.', answer: 'Against',
                  options: ['Against', 'natural disaster', 'large natural hazard', 'a big earthquake is a disaster, a small one is just a hazard'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is a disaster, a small one.' },
                { id: 'b', prompt: 'Design a one-page "Hazard Profile Card" template that a District Disaster Management Authority could use to summarize the hazard-disaster distinction for any.', answer: 'Template filled for Kendrapara, Odisha: (a) Cyclone & storm surge',
                  options: ['Template filled for Kendrapara, Odisha: (a) Cyclone & storm surge', 'natural disaster', 'large natural hazard', 'a big earthquake is a disaster, a small one is just a hazard'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is a disaster, a small one.' },
                { id: 'c', prompt: 'Analyze the statement: "The 2013 Uttarakhand floods were a natural disaster caused by unprecedented cloudburst." Identify two geographical inaccuracies in this.', answer: 'Inaccuracies: (1) "Natural disaster" implies the disaster itself is natural',
                  options: ['Inaccuracies: (1) "Natural disaster" implies the disaster itself is natural', 'natural disaster', 'large natural hazard', 'a big earthquake is a disaster, a small one is just a hazard'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "natural disaster" is a synonym for "large natural hazard" (e.g., "a big earthquake is a disaster, a small one.' }
          ],
            remediations: { 'natural-disaster-is-a-synonym': { steps: ['Revisit the Bhuj vs. Andaman Sea comparison in the Walkthrough.', 'On a blank India map, mark three locations: (i) high-hazard low-disaster (e.g., Andaman Sea), (ii) low-hazard.', 'For each, write one sentence using the formula: Disaster = Hazard × Vulnerability × Exposure / Capacity.', 'Explain orally to a peer why Latur (Zone III) caused more deaths than many Zone V events.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_11_008', difficulty: 'standard',
          question: 'Disaster management is the systematic process of planning, organizing, and.',
          hint: 'If stuck, revisit the hazard-specific node for the disaster most relevant to your region.',
          misconception: 'Students often think disaster management is only about post-disaster relief (distributing food, blankets).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Disaster management is the systematic process of planning, organizing, and implementing',
                  options: ['Disaster management is the systematic process of planning, organizing, and implementing', 'A natural hazard is a natural process or phenomenon (e.g., earthquake, flood, cyclone)', 'Volcanism is the process by', 'Volcanism is the process by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think disaster management is only about post-disaster relief (distributing food, blankets).' }
          ],
            remediations: { 'disaster-management-is-only-about': { steps: ['Show the Odisha cyclone mortality comparison (1999 vs 2013) using a simple bar chart.', 'Ask students to list what changed—guide them to identify shelters, early warnings, community volunteers.', 'Map these to the disaster management cycle phases.', 'Have students interview a local disaster management official or volunteer to see pre-disaster activities.', 'Assign a mini-project: audit their school/home for mitigation measures (e.g., fire extinguishers, safe exits) and.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_009', difficulty: 'standard',
          question: 'Volcanism is the process by which molten rock (magma), gases, and solid.',
          hint: 'Review "Partial melting vs. complete melting" and "Decompression melting vs.',
          misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.',
          parts: [
                { id: 'a', prompt: 'A basalt sample from the Deccan Traps has 48% SiO₂, 12% MgO, and 0.2% K₂O. A sample from Mount St. Helens (Cascade arc) has 62% SiO₂, 3% MgO, and 1.5% K₂O.', answer: 'The Deccan basalt (48% SiO₂, 12% MgO) is closer to a primary mantle melt',
                  options: ['The Deccan basalt (48% SiO₂, 12% MgO) is closer to a primary mantle melt', 'volcanoes erupt mantle material directly', '"volcanoes erupt mantle material directly"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.' },
                { id: 'b', prompt: 'Compare the volatile content (H₂O, CO₂, S) of magmas at mid-ocean ridges, hotspots, and subduction zones.', answer: 'MORB: low volatiles (0.1-0.3% H₂O)',
                  options: ['MORB: low volatiles (0.1-0.3% H₂O)', 'volcanoes erupt mantle material directly', '"volcanoes erupt mantle material directly"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.' }
          ],
            remediations: { 'volcanoes-erupt-mantle-material-directly': { steps: ['Use a melting diagram (pressure vs. temperature) to show how peridotite partial melting produces basalt, leaving a.', 'Demonstrate with a simple analogy — melting chocolate chips in cookie dough: the melt (chocolate-rich) differs from the.', 'Plot real data — MgO vs. SiO₂ for MORB, OIB, and arc basalts — to show systematic offsets from primitive mantle.', 'Introduce the concept of "primitive magma" (Mg# > 0.7, Ni > 250 ppm) as the closest approximation to primary melt, and.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Volcanic gases directly represent the composition of Earth\'s primordial atmosphere." Consider degassing history, mantle.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'volcanoes erupt mantle material directly', '"volcanoes erupt mantle material directly"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.' },
                { id: 'b', prompt: 'Design a field investigation plan to determine whether a newly discovered volcanic rock suite in the Andaman Islands represents a subduction-related arc magma.', answer: 'A strong plan includes: (1) **K₂O vs',
                  options: ['A strong plan includes: (1) **K₂O vs', 'volcanoes erupt mantle material directly', '"volcanoes erupt mantle material directly"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.' },
                { id: 'c', prompt: 'Compare the volatile content (H₂O, CO₂, S) of magmas at mid-ocean ridges, hotspots, and subduction zones.', answer: 'MORB: low volatiles (0.1-0.3% H₂O)',
                  options: ['MORB: low volatiles (0.1-0.3% H₂O)', 'volcanoes erupt mantle material directly', '"volcanoes erupt mantle material directly"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "volcanoes erupt mantle material directly" — imagining lava is simply molten mantle rock.' }
          ],
            remediations: { 'volcanoes-erupt-mantle-material-directly': { steps: ['Use a melting diagram (pressure vs. temperature) to show how peridotite partial melting produces basalt, leaving a.', 'Demonstrate with a simple analogy — melting chocolate chips in cookie dough: the melt (chocolate-rich) differs from the.', 'Plot real data — MgO vs. SiO₂ for MORB, OIB, and arc basalts — to show systematic offsets from primitive mantle.', 'Introduce the concept of "primitive magma" (Mg# > 0.7, Ni > 250 ppm) as the closest approximation to primary melt, and.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_003', difficulty: 'standard',
          question: 'Volcanism is the process by which magma (molten rock), gases, and pyroclastic.',
          hint: 'Revisit Class 9 "Volcanoes: Formation, Types and Distribution" (c9_geo_ch1_5) –.',
          misconception: 'Students often think "volcano" always means a conical mountain (central eruption) and are unaware that the Deccan Traps.',
          parts: [
                { id: 'a', prompt: 'Why does a central eruption often produce a steep-sided cone while a fissure eruption produces a flat plateau?', answer: 'Central eruptions concentrate magma at a single vent',
                  options: ['Central eruptions concentrate magma at a single vent', 'central eruptions have more gas', 'volcano'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "volcano" always means a conical mountain (central eruption) and are unaware that the Deccan Traps – one of Earth\'s.' }
          ],
            remediations: { 'volcano-always-means-a-conical': { steps: ['Show a satellite image of the Deccan Traps (flat-topped hills, step-like topography) and a photo of Barren Island.', 'Use a simple viscosity demo – pour honey (high viscosity) and water (low viscosity) on an inclined board; water spreads.', 'Plot both on a tectonic map of India – Deccan Traps over Réunion hotspot track, Barren Island on the Andaman subduction.', 'Have the student explain in their own words how magma viscosity and tectonic setting control eruption type.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "volcano" always means a conical mountain (central eruption) and are unaware that the Deccan Traps.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Fissure eruptions are less hazardous than central eruptions because they are non-explosive."', answer: 'Partially true but misleading',
                  options: ['Partially true but misleading', 'volcano'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "volcano" always means a conical mountain (central eruption) and are unaware that the Deccan Traps – one of Earth\'s.' }
          ],
            remediations: { 'volcano-always-means-a-conical': { steps: ['Show a satellite image of the Deccan Traps (flat-topped hills, step-like topography) and a photo of Barren Island.', 'Use a simple viscosity demo – pour honey (high viscosity) and water (low viscosity) on an inclined board; water spreads.', 'Plot both on a tectonic map of India – Deccan Traps over Réunion hotspot track, Barren Island on the Andaman subduction.', 'Have the student explain in their own words how magma viscosity and tectonic setting control eruption type.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
