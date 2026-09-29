import type { SimDef } from '../../engine/types';
import C12_GeographyDroughtsFloodsSim from '../../../simulations/c6_12/C12_GeographyDroughtsFloodsSim';

/** v3 wrapped master — C12_GeographyDroughtsFloodsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_geographydroughtsfloodssim: SimDef = {
    id: 'v3w_c12_geographydroughtsfloodssim',
    title: 'Variability of Rainfall and Water Scarcity in India',
    subtitle: 'Covers: (a) spatial and temporal variability of Indian monsoon rainfall including.',
    classLevel: 12, subject: 'geography', topic: 'Variability of Rainfall and Water Scarcity in India',
    chapters: [],
    nodeIds: ['c12_geo_cbse_12_003', 'c12_geo_cbse_17_007', 'c12_geo_cbse_19_008', 'c12_geo_cbse_12_004', 'c12_geo_cbse_12_005', 'c12_geo_cbse_12_006', 'c12_geo_cbse_12_011', 'c12_geo_cbse_17_006', 'c12_geo_cbse_17_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Start with a real-world observation: "Check the IMD rainfall map for your district — you\'ll see some years.', goal: 'Master Variability of Rainfall and Water Scarcity in India.' },
    discovery: {
        question: 'Name the four seismic zones of India (Zone II to V) in order of increasing hazard and state the primary tectonic feature responsible for Zone V.',
        options: ['Zone II (Low), Zone III (Moderate), Zone IV (High), Zone V (Very High)', 'drought = no rain', 'flood = too much rain'],
        answer: 'Zone II (Low), Zone III (Moderate), Zone IV (High), Zone V (Very High)',
        hook: 'Students think "drought = no rain" and "flood = too much rain", ignoring that drought is a slow-onset deficit relative.',
    },
    teaching: [
        { title: 'Variability of rainfall refers to the.', text: 'Variability of rainfall refers to the spatial and temporal fluctuations in precipitation across India, where the majority of annual rainfall occurs during the Southwest Monsoon (June-September) with.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_003', title: 'Variability of rainfall refers to the.',
          scaffold: { problem: 'A farmer in Anantapur district (Andhra Pradesh) receives mean annual rainfall of 550 mm with a standard deviation of 190 mm.',
            steps: [
            { text: 'Calculate CV for Anantapur: CV = (190/550) × 100 = 34.5% — high variability.' },
            { text: 'Interpret CV: High CV means rainfall is unreliable; 34.5% CV implies frequent deviations from mean.' },
            { text: 'Probability of monsoon failure given: 3/10 = 30% chance of rainfall < 400 mm.' },
            { text: 'Groundnut needs 500 mm; with 400 mm rainfall, deficit = 100 mm.' },
            { text: 'For Ludhiana: CV = (140/700) × 100 = 20% — moderate variability.' },
            { text: 'Conclusion: Variability alone doesn\'t determine scarcity; infrastructure and aquifer properties mediate the impact.', faded: true, blankAnswer: 'Anantapur CV = 34.5% (high); crop failure probability ≥30%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_17_007', title: 'Natural disasters in India are extreme.',
          scaffold: { problem: 'Using the 2002 seismic zone map of India (BIS 1893), a school building is proposed at 29.5°N, 79.5°E (near Nainital, Uttarakhand).',
            steps: [
            { text: 'Locate 29.5°N, 79.5°E on the seismic zone map — it falls in Zone IV (High Damage Risk Zone) covering parts of.' },
            { text: 'Recall Zone IV corresponds to MSK intensity VIII (Destructive) as per IS 1893:2002.' },
            { text: 'Identify site amplification factors: (a) The location sits on alluvial fan deposits (thick Quaternary sediments) which.' },
            { text: 'Check liquefaction susceptibility: shallow water table (< 5 m) in sandy alluvium + Zone IV shaking = high liquefaction.' },
            { text: 'Synthesize: The building must be designed for Zone IV forces WITH site coefficients for soft soil (Type D/E per IS.', faded: true, blankAnswer: 'Zone IV, MSK VIII, with mandatory site-specific response.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_19_008', title: 'Percentiles and quartiles are measures.',
          scaffold: { problem: 'The annual rainfall (mm) at 9 stations in the Malwa Plateau is: 720, 850, 900, 950, 980, 1020, 1100, 1150, 1200.',
            steps: [
            { text: 'Verify data is arranged in ascending order (it is). N = 9.' },
            { text: 'Apply ungrouped positional formulas: Q₁ position = (9+1)/4 = 2.5 → interpolate between 2nd and 3rd values.' },
            { text: 'Q₁ = (850 + 900)/2 = 875 mm. Q₂ = 5th value = 980 mm. Q₃ = (1100 + 1150)/2 = 1125 mm.' },
            { text: 'IQR = Q₃ – Q₁ = 1125 – 875 = 250 mm.' },
            { text: 'Interpretation: The middle 50% of stations receive between 875–1125 mm rainfall.', faded: true, blankAnswer: 'Q₁ = 875 mm, Q₂ = 980 mm, Q₃ = 1125 mm, IQR = 250 mm..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_004', title: 'A multipurpose river project is a.',
          scaffold: { problem: 'A central Indian river basin receives 1,200 mm annual rainfall, 85% concentrated in June-September. The basin area is 25,000 km².',
            steps: [
            { text: 'Convert rainfall to meters: 1,200 mm = 1.2 m.' },
            { text: 'Calculate total annual precipitation volume = Basin area × Rainfall = 25,000 km² × 1.2 m = 25,000 × 10⁶ m² × 1.2 m =.' },
            { text: 'Calculate annual runoff volume = Precipitation volume × Runoff coefficient = 30 BCM × 0.35 = 10.5 BCM.' },
            { text: 'Reservoir live storage = 3.5 BCM. Percentage of runoff stored = (3.5 / 10.5) × 100 = 33.3%.' },
            { text: 'Interpretation: The reservoir captures one-third of annual runoff.', faded: true, blankAnswer: 'Annual runoff = 10.5 BCM. Reservoir stores 33.3% of annual.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_005', title: 'Major multipurpose river valley.',
          scaffold: { problem: 'A student is asked to explain why Bhakra Dam is a gravity dam while Maithon Dam (DVC) is a combination of concrete and earthen dam.',
            steps: [
            { text: 'Identify the river valley cross-section. Bhakra: Sutlej flows through a **deep, narrow gorge in the Himalayan.' },
            { text: 'Recall dam type selection criteria. **Gravity dams** require **strong rock foundations** to resist overturning by water.' },
            { text: 'Apply to Bhakra. Narrow gorge (width ~100 m at top) + strong rock → **226 m high concrete gravity dam** is optimal.' },
            { text: 'Apply to Maithon. Wide valley (width > 500 m) + weak laterite → **Composite dam**: central concrete.' },
            { text: 'Verify with function. Bhakra\'s height creates **high hydraulic head (200+ m)** for efficient power generation *and*.', faded: true, blankAnswer: 'Bhakra uses gravity dam due to narrow gorge and strong.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_geo_cbse_12_006', title: 'The Indira Gandhi Canal (formerly.',
          scaffold: { problem: 'A farmer in Sri Ganganagar (Stage I command area) has 5 hectares.',
            steps: [
            { text: 'Identify current water use. Wheat (flood) = 600 mm/ha; Cotton (flood) = 800 mm/ha.' },
            { text: 'Select alternative crops. Replace wheat with mustard (350 mm, drip) and cotton with cluster bean (guar, 300 mm,.' },
            { text: 'Calculate new water use. Mustard (drip, 60% efficiency) = 350/0.6 = 583 mm; Guar (sprinkler, 75% efficiency) = 300/0.75.' },
            { text: 'Compute savings. Reduction = (35,000 - 4,915) = 30,085 m³/year (86% less).' },
            { text: 'Add soil amendment. Apply gypsum 5 t/ha in Year 1, green manure (dhaincha) pre-Kharif Years 2-3.', faded: true, blankAnswer: 'Transition to mustard-guar rotation with drip/sprinkler.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_geo_cbse_17_007', title: 'Identify each idea',
          dissect: { specimen: 'Variability of Rainfall and Water Scarcity in India', spots: [
            { id: 's1', label: 'Variability of rainfall refers to', prompt: 'Which idea is this? — Variability of rainfall refers to the spatial and temporal fluctuations in precipitation.', answer: 'Variability of rainfall refers to', options: ['Variability of rainfall refers to', 'Natural disasters in India are', 'Percentiles and quartiles are measures', 'A multipurpose river project is'] },
            { id: 's2', label: 'Natural disasters in India are', prompt: 'Which idea is this? — Natural disasters in India are extreme geophysical or hydro-meteorological events —.', answer: 'Natural disasters in India are', options: ['Natural disasters in India are', 'Variability of rainfall refers to', 'Percentiles and quartiles are measures', 'A multipurpose river project is'] },
            { id: 's3', label: 'Percentiles and quartiles are measures', prompt: 'Which idea is this? — Percentiles and quartiles are measures of relative position that divide a geographical.', answer: 'Percentiles and quartiles are measures', options: ['Percentiles and quartiles are measures', 'Variability of rainfall refers to', 'Natural disasters in India are', 'A multipurpose river project is'] },
            { id: 's4', label: 'A multipurpose river project is', prompt: 'Which idea is this? — A multipurpose river project is a large-scale hydraulic engineering scheme that.', answer: 'A multipurpose river project is', options: ['A multipurpose river project is', 'Variability of rainfall refers to', 'Natural disasters in India are', 'Percentiles and quartiles are measures'] },
            { id: 's5', label: 'Major multipurpose river valley projects', prompt: 'Which idea is this? — Major multipurpose river valley projects are large-scale dams and associated.', answer: 'Major multipurpose river valley projects', options: ['Major multipurpose river valley projects', 'Variability of rainfall refers to', 'Natural disasters in India are', 'Percentiles and quartiles are measures'] },
            { id: 's6', label: 'The Indira Gandhi Canal formerly', prompt: 'Which idea is this? — The Indira Gandhi Canal (formerly Rajasthan Canal) is India\'s longest canal system.', answer: 'The Indira Gandhi Canal formerly', options: ['The Indira Gandhi Canal formerly', 'Variability of rainfall refers to', 'Natural disasters in India are', 'Percentiles and quartiles are measures'] }
          ] } }
    ],
    explore: { component: C12_GeographyDroughtsFloodsSim, prompt: 'Explore the interactive — Variability of Rainfall and Water Scarcity in India' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_003', difficulty: 'standard',
          question: 'Variability of rainfall refers to the spatial and temporal fluctuations in.',
          hint: 'If stuck, revisit c11_geo_cbse_10_004 (rainfall distribution) and c11_geo_cbse_11_005.',
          misconception: 'Students often think "water scarcity = low rainfall" and equate Rajasthan\'s scarcity solely to its aridity.',
          parts: [
                { id: 'a', prompt: 'Using the formula CV = (Standard Deviation / Mean) × 100, calculate the coefficient of variation for a station with 30-year mean annual rainfall of 800 mm and.', answer: 'CV = (240/800) × 100 = 30%',
                  options: ['CV = (240/800) × 100 = 30%', 'water scarcity = low rainfall'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "water scarcity = low rainfall" and equate Rajasthan\'s scarcity solely to its aridity.' }
          ],
            remediations: { 'water-scarcity-low-rainfall-and': { steps: ['Revisit c11_geo_cbse_10_004 (Distribution of Rainfall in India) to relearn spatial patterns — draw a map marking 5.', 'Revisit c11_geo_cbse_11_005 (Droughts: Types) to distinguish meteorological vs hydrological vs agricultural drought —.', 'Revisit c11_geo_cbse_13_007 (Water Scarcity: Causes) to separate physical vs economic scarcity drivers.', 'Take a diagnostic: given a district\'s rainfall data (mean, CV, monthly distribution), classify its scarcity type and.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "water scarcity = low rainfall" and equate Rajasthan\'s scarcity solely to its aridity.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "India\'s water scarcity is primarily caused by low rainfall." Use evidence from at least three distinct regions to support your.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'water scarcity = low rainfall'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "water scarcity = low rainfall" and equate Rajasthan\'s scarcity solely to its aridity.' }
          ],
            remediations: { 'water-scarcity-low-rainfall-and': { steps: ['Revisit c11_geo_cbse_10_004 (Distribution of Rainfall in India) to relearn spatial patterns — draw a map marking 5.', 'Revisit c11_geo_cbse_11_005 (Droughts: Types) to distinguish meteorological vs hydrological vs agricultural drought —.', 'Revisit c11_geo_cbse_13_007 (Water Scarcity: Causes) to separate physical vs economic scarcity drivers.', 'Take a diagnostic: given a district\'s rainfall data (mean, CV, monthly distribution), classify its scarcity type and.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_17_007', difficulty: 'standard',
          question: 'Natural disasters in India are extreme geophysical or hydro-meteorological.',
          hint: 'If stuck on earthquake distribution, revisit c11_geo_cbse_04_010 (Plate Tectonics:.',
          misconception: 'Students think "drought = no rain" and "flood = too much rain", ignoring that drought is a slow-onset deficit relative.',
          parts: [
                { id: 'a', prompt: 'Name the four seismic zones of India (Zone II to V) in order of increasing hazard and state the primary tectonic feature responsible for Zone V.', answer: 'Zone II (Low), Zone III (Moderate), Zone IV (High), Zone V (Very High)',
                  options: ['Zone II (Low), Zone III (Moderate), Zone IV (High), Zone V (Very High)', 'drought = no rain', 'flood = too much rain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "drought = no rain" and "flood = too much rain", ignoring that drought is a slow-onset deficit relative to demand (soil.' },
                { id: 'b', prompt: 'A district receives 40% of its normal monsoon rainfall. Reservoir storage is at 30% of capacity. Kharif sowing is 60% of normal area.', answer: 'Meteorological drought (rainfall deficit > 25% of normal), hydrological drought',
                  options: ['Meteorological drought (rainfall deficit > 25% of normal), hydrological drought', 'drought = no rain', 'flood = too much rain'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "drought = no rain" and "flood = too much rain", ignoring that drought is a slow-onset deficit relative to demand (soil.' }
          ],
            remediations: { 'drought-no-rain-and-flood': { steps: ['Revisit c11_geo_cbse_11_004 (flood causes) and c11_geo_cbse_11_005 (drought types) — draw a 2x2 table: hazard vs.', 'On an outline map of India, shade seismic zones, flood-prone basins, drought-prone districts, and cyclone tracks in.', 'For each shade, write one tectonic/climatic driver and one human factor amplifying risk.', 'Re-attempt DIAGNOSTIC_QUESTION_3 and DIAGNOSTIC_QUESTION_4 using the map as reference.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_19_008', difficulty: 'standard',
          question: 'Percentiles and quartiles are measures of relative position that divide a.',
          hint: 'If stuck on positional formulas, revisit the median derivation in c12_geo_cbse_19_004 and.',
          misconception: 'Students often confuse the percentile rank formula (percentage of scores below a value) with the percentile value.',
          parts: [
                { id: 'a', prompt: 'Define the first quartile (Q1) in a geographical dataset arranged in ascending order. What percentage of observations lie below Q1?', answer: 'Q1 is the value below',
                  options: ['Q1 is the value below', '50% lie below Q1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the percentile rank formula (percentage of scores below a value) with the percentile value formula (value at a given.' }
          ],
            remediations: { 'students-often-confuse-the-percentile': { steps: ['Revisit c12_geo_cbse_19_004 (median calculation) to reinforce positional logic and cumulative frequency construction.', 'Practice with a tiny dataset (N=7) to manually verify Q1, Q2, Q3 positions using (N+1)/4, (N+1)/2, 3(N+1)/4.', 'Draw a number line marking quartile positions to visualize "25%, 50%, 75% below".', 'Re-do Diagnostic Question 3 with N=8 (even) to practice interpolation.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_004', difficulty: 'standard',
          question: 'A multipurpose river project is a large-scale hydraulic engineering scheme that.',
          hint: 'If unclear on rainfall variability, revisit c12_geo_cbse_12_003 and Class 11 node.',
          misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical.',
          parts: [
                { id: 'a', prompt: 'The Bhakra-Nangal project on the Sutlej river provides irrigation to 1.5 million hectares and generates 1,325 MW of power.', answer: 'Step 1: Identify consumptive use (irrigation) = 5.5 BCM',
                  options: ['Step 1: Identify consumptive use (irrigation) = 5.5 BCM', 'multipurpose project', 'big dam'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical objectives.' },
                { id: 'b', prompt: 'Compare the objectives of the Damodar Valley Corporation (DVC) and the Indira Gandhi Canal Project.', answer: 'DVC (Damodar basin, Jharkhand/West Bengal): Primary objectives',
                  options: ['DVC (Damodar basin, Jharkhand/West Bengal): Primary objectives', 'multipurpose project', 'big dam'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical objectives.' }
          ],
            remediations: { 'multipurpose-project-is-just-a': { steps: ['If the student cannot differentiate project objectives by region: (1) Revisit c12_geo_cbse_12_002 (river basins) and.', '(2) Create a 3-column table: Project | Basin Geography (rainfall, terrain, water problem) | Primary Objectives.', 'Fill for Bhakra (Sutlej, Himalayan, seasonal flow → irrigation+power), Damodar (Chotanagpur plateau, flash floods →.', '(3) Re-attempt Diagnostic Question 4.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Multipurpose river projects are the most sustainable solution to India\'s water scarcity." Consider environmental, social, and economic.', answer: 'Not fully sustainable',
                  options: ['Not fully sustainable', 'yes, they solve everything', 'no, they are destructive', 'multipurpose project'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical objectives.' },
                { id: 'b', prompt: 'Compare the objectives of the Damodar Valley Corporation (DVC) and the Indira Gandhi Canal Project.', answer: 'DVC (Damodar basin, Jharkhand/West Bengal): Primary objectives',
                  options: ['DVC (Damodar basin, Jharkhand/West Bengal): Primary objectives', 'multipurpose project', 'big dam'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "multipurpose project" is just a synonym for "big dam" and that all such projects have identical objectives.' }
          ],
            remediations: { 'multipurpose-project-is-just-a': { steps: ['If the student cannot differentiate project objectives by region: (1) Revisit c12_geo_cbse_12_002 (river basins) and.', '(2) Create a 3-column table: Project | Basin Geography (rainfall, terrain, water problem) | Primary Objectives.', 'Fill for Bhakra (Sutlej, Himalayan, seasonal flow → irrigation+power), Damodar (Chotanagpur plateau, flash floods →.', '(3) Re-attempt Diagnostic Question 4.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_005', difficulty: 'standard',
          question: 'Major multipurpose river valley projects are large-scale dams and associated.',
          hint: 'If stuck, revisit c12_geo_cbse_12_004 (project classification) and c11_geo_cbse_09_009.',
          misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.',
          parts: [
                { id: 'a', prompt: 'Name the river on which Bhakra Dam is built and the reservoir it creates. Which three states are the primary beneficiaries of its irrigation and power?', answer: 'Bhakra Dam is on the **Sutlej River** creating **Gobind Sagar Reservoir**',
                  options: ['Bhakra Dam is on the **Sutlej River** creating **Gobind Sagar Reservoir**', 'big dams'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.' },
                { id: 'b', prompt: 'Using the data: Bhakra Dam height = 226 m, Gobind Sagar live storage = 7.19 billion cubic meters (BCM).', answer: '**Bhakra:** 7.19 BCM / 226 m ≈ **0.0318 BCM/m**',
                  options: ['**Bhakra:** 7.19 BCM / 226 m ≈ **0.0318 BCM/m**', 'big dams'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.' }
          ],
            remediations: { 'bhakra-nangal-and-damodar-valley': { steps: ['**Revisit c12_geo_cbse_12_004** (Multipurpose Projects: Concept) — specifically the table linking *river regime* →.', '**Review Class 11 nodes c11_geo_cbse_13_003 (Bhakra-Nangal) and c11_geo_cbse_13_004 (Damodar Valley)** — make a.', 'Monsoon), Regime (Perennial vs.', 'Flashy), Dam Height (High vs.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.',
          parts: [
                { id: 'a', prompt: 'Design a 3-point "Sustainability Audit" checklist for a *new* multipurpose project on a Himalayan river (like Bhakra) vs. a Peninsular river (like Damodar).', answer: '**Himalayan River (Bhakra-type) Audit:** 1',
                  options: ['**Himalayan River (Bhakra-type) Audit:** 1', 'big dams'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Bhakra-Nangal and Damodar Valley are similar "big dams" differing only in location**.' }
          ],
            remediations: { 'bhakra-nangal-and-damodar-valley': { steps: ['**Revisit c12_geo_cbse_12_004** (Multipurpose Projects: Concept) — specifically the table linking *river regime* →.', '**Review Class 11 nodes c11_geo_cbse_13_003 (Bhakra-Nangal) and c11_geo_cbse_13_004 (Damodar Valley)** — make a.', 'Monsoon), Regime (Perennial vs.', 'Flashy), Dam Height (High vs.'] } } },
        { type: 'subpart', nodeId: 'c12_geo_cbse_12_006', difficulty: 'standard',
          question: 'The Indira Gandhi Canal (formerly Rajasthan Canal) is India\'s longest canal.',
          hint: 'If stuck on "why this canal here?", revisit **c12_geo_cbse_12_003** (Variability of.',
          misconception: 'Students often think the Indira Gandhi Canal **originates at Bhakra Dam** because both are on the Sutlej and Bhakra is.',
          parts: [
                { id: 'a', prompt: 'Name the barrage that serves as the headworks of the Indira Gandhi Canal and the two rivers whose confluence it regulates.', answer: 'Harike Barrage, at the confluence of the Sutlej and Beas rivers in Punjab',
                  options: ['Harike Barrage, at the confluence of the Sutlej and Beas rivers in Punjab', 'Bhakra Dam', 'Sutlej alone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Indira Gandhi Canal **originates at Bhakra Dam** because both are on the Sutlej and Bhakra is more famous.' }
          ],
            remediations: { 'the-indira-gandhi-canal-originates': { steps: ['Open an outline map of India.', 'Mark: (a) Bhakra Dam (Himachal Pradesh), (b) Harike Barrage (Punjab), (c) Indira Gandhi Canal route through Hanumangarh.', 'Read the NCERT Class 12 text (Chapter 4, "Multipurpose River Projects") and underline the sentence: *"The Indira Gandhi.', 'takes off from Harike Barrage."* 3.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
