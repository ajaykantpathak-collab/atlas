import type { SimDef } from '../../engine/types';
import C11_GeoInteriorEarthCBSESim from '../../../simulations/c6_12_new/C11_GeoInteriorEarthCBSESim';

/** v3 wrapped master — C11_GeoInteriorEarthCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geointeriorearthcbsesim: SimDef = {
    id: 'v3w_c11_geointeriorearthcbsesim',
    title: 'Geo Interior Earth CBSE',
    subtitle: 'Covers classification and characteristics of direct (mining, drilling, volcanism) and.',
    classLevel: 11, subject: 'science', topic: 'Sources of Information about Earth\'s Interior: Direct and Indirect',
    chapters: [],
    nodeIds: ['c11_geo_cbse_03_001', 'c11_geo_cbse_03_002', 'c11_geo_cbse_03_003', 'c11_geo_cbse_03_004', 'c11_geo_cbse_03_006', 'c11_geo_cbse_03_008', 'c11_geo_cbse_03_009', 'c11_geo_cbse_06_001', 'c11_geo_cbse_06_003', 'c11_geo_cbse_03_007', 'c11_geo_cbse_10_001', 'c11_geo_cbse_20_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine standing at the Kolar Gold Fields in Karnataka, where mines once reached 3.2 km deep—yet Earth\'s.', goal: 'Master Geo Interior Earth CBSE.' },
    discovery: {
        question: 'State the approximate thickness range of the continental crust and the oceanic crust, and name the dominant rock type in each.',
        options: ['Continental crust: 30–70 km thick, dominated by granitic (SIAL) rocks', 'both are 30 km', 'oceanic crust is granitic'],
        answer: 'Continental crust: 30–70 km thick, dominated by granitic (SIAL) rocks',
        hook: 'Students believe **"the mantle is molten magma"** because textbooks say "magma comes from the mantle." They confuse the.',
    },
    teaching: [
        { title: 'Direct sources of information about Earth\'s.', text: 'Direct sources of information about Earth\'s interior are materials physically obtained from the crust and upper mantle through mining, deep drilling, and volcanic eruptions.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_03_001', title: 'Direct sources of information about.',
          scaffold: { problem: 'The Kola Superdeep Borehole reached 12,262 m. Earth\'s mean radius is 6,371 km.',
            steps: [
            { text: 'Convert both measurements to the same unit: 12,262 m = 12.262 km; Earth radius = 6,371 km.' },
            { text: 'Compute the fraction: 12.262 / 6,371 = 0.001925 ≈ 0.19%.' },
            { text: 'Note that the continental crust averages 30–50 km thick, so the borehole penetrated only the upper crust.' },
            { text: 'Conclude that direct sampling covers <0.2% of Earth\'s radius, leaving 99.8% inaccessible to physical observation.' },
            { text: 'Interpret: All knowledge of the mantle and core must come from indirect geophysical methods.', faded: true, blankAnswer: 'Direct drilling samples only 0.19% of Earth\'s radius,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_03_002', title: 'Seismic waves are elastic waves of.',
          scaffold: { problem: 'An earthquake occurs in the Hindu Kush region (Afghanistan). A seismograph station in New Delhi records the P-wave at 04:32:15 UTC and the.',
            steps: [
            { text: 'Calculate P-S time interval = 04:36:45 - 04:32:15 = 4 minutes 30 seconds = 270 seconds.' },
            { text: 'Apply empirical formula: Distance = Δt × 8 = 270 × 8 = 2160 km.' },
            { text: 'Recognize this assumes average crustal velocities (Vp=6, Vs=3.5 km/s) and straight ray paths in homogeneous medium.' },
            { text: 'Actual path traverses heterogeneous crust, mantle; velocities increase with depth causing ray bending (refraction).' },
            { text: 'Real distance requires travel-time tables (Jeffreys-Bullen) accounting for layered Earth model; for Hindu Kush-Delhi.', faded: true, blankAnswer: 'Approximate distance = 2160 km using simple formula; actual.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_03_003', title: 'The Earth\'s interior is concentrically.',
          scaffold: { problem: 'A seismic station at Delhi records a P-wave arrival from an earthquake at the Hindu Kush region (focus depth 200 km).',
            steps: [
            { text: 'Identify the velocity contrast at the Moho: v₁ = 6.5 km/s (crust), v₂ = 8.0 km/s (mantle).' },
            { text: 'Apply Snell\'s law for critical angle: sin i_c = v₁ / v₂ = 6.5 / 8.0 = 0.8125.' },
            { text: 'Compute i_c = sin⁻¹(0.8125) ≈ 54.3°.' },
            { text: 'For a flat layer, the ray travels down to Moho at critical angle, reflects, and returns symmetrically.' },
            { text: 'Total epicentral distance for PmP = 2x ≈ 111.4 km. This is the minimum distance; closer than this, the ray refracts.', faded: true, blankAnswer: 'Critical angle = 54.3°; Minimum epicentral distance for PmP.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_03_004', title: 'Major discontinuities are sharp.',
          scaffold: { problem: 'A seismologist observes that at a certain distance from an earthquake epicenter, P-waves arrive earlier than expected for a direct mantle.',
            steps: [
            { text: 'Identify the observation – early P-wave arrival (Pdiff or PKP) at distances beyond 103° where direct mantle P-waves are.' },
            { text: 'Recall that the Gutenberg discontinuity at ~2,900 km marks a sharp drop in P-wave velocity (from ~13.7 to ~8.1 km/s).' },
            { text: 'Apply Snell\'s Law – the velocity drop causes P-waves to refract away from the normal, creating a P-wave shadow zone.' },
            { text: 'Note that waves entering the core (PKP) are refracted back into the mantle and arrive at distances >143°, filling the.' },
            { text: 'The existence of PKP arrivals and the absence of S-waves in the core (no SKS, SKKS) confirms the outer core is liquid.' },
            { text: 'Conclude that the observed travel-time curve (with a gap and later arrivals) matches the prediction for a low-velocity.', faded: true, blankAnswer: 'The Gutenberg discontinuity is confirmed as the boundary to.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_03_006', title: 'The mantle is the thickest layer of.',
          scaffold: { problem: 'A seismic station records a P-wave arrival from a deep-focus earthquake (depth 500 km) at an epicentral distance of 30°.',
            steps: [
            { text: 'Identify the layers the ray traverses. At 30° epicentral distance (~3,330 km great-circle arc), the ray turns in the.' },
            { text: 'Calculate vertical travel time through each layer segment. Source at 500 km → 410 km (90 km in transition zone, Vp=9.9.' },
            { text: 'The remaining travel time (385 – 60.8 ≈ 324 s) is spent on the horizontal/downgoing legs.' },
            { text: 'Confirm by checking maximum distance for upper-mantle turning ray: critical angle at 410 km, i_c = arcsin(8.1/9.9) ≈.' },
            { text: 'Conclude: Yes, the ray samples the mesosphere. The 500 km deep source is in the transition zone; the ray goes up.', faded: true, blankAnswer: 'Yes, the ray path penetrates the mesosphere (lower mantle).' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_03_008', title: 'The geothermal gradient is the rate of.',
          scaffold: { problem: 'The Main Central Thrust zone in the Himachal Himalaya has a measured surface heat flow of 85 mW/m².',
            steps: [
            { text: 'Identify given values — heat flow q = 85 mW/m² = 0.085 W/m², thermal conductivity k = 3.2 W/m·K, surface temperature T₀.' },
            { text: 'Apply Fourier\'s Law in 1D steady state: q = k × G, so G = q / k = 0.085 / 3.2 = 0.02656 K/m = 26.6°C/km.' },
            { text: 'Calculate expected conductive temperature at 2 km: T(z) = T₀ + G × z = 12°C + (26.6°C/km × 2 km) = 12 + 53.2 = 65.2°C.' },
            { text: 'Compare with measured temperature (95°C) — discrepancy = 95 - 65.2 = 29.8°C higher than conductive prediction.' },
            { text: 'Interpret discrepancy — the measured temperature is significantly higher, indicating advective heat transfer.' },
            { text: 'Relate to tectonic setting — the Main Central Thrust is a major crustal-scale shear zone; frictional heating during.', faded: true, blankAnswer: 'Near-surface conductive gradient = 26.6°C/km. Expected.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_geo_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Geo Interior Earth CBSE', spots: [
            { id: 's1', label: 'Direct sources of information about', prompt: 'Which idea is this? — Direct sources of information about Earth\'s interior are materials physically obtained.', answer: 'Direct sources of information about', options: ['Direct sources of information about', 'Seismic waves are elastic waves', 'The Earths interior is concentrically', 'Major discontinuities are sharp boundaries'] },
            { id: 's2', label: 'Seismic waves are elastic waves', prompt: 'Which idea is this? — Seismic waves are elastic waves of energy generated by earthquakes or explosions that.', answer: 'Seismic waves are elastic waves', options: ['Seismic waves are elastic waves', 'Direct sources of information about', 'The Earths interior is concentrically', 'Major discontinuities are sharp boundaries'] },
            { id: 's3', label: 'The Earths interior is concentrically', prompt: 'Which idea is this? — The Earth\'s interior is concentrically layered into three principal compositional zones:.', answer: 'The Earths interior is concentrically', options: ['The Earths interior is concentrically', 'Direct sources of information about', 'Seismic waves are elastic waves', 'Major discontinuities are sharp boundaries'] },
            { id: 's4', label: 'Major discontinuities are sharp boundaries', prompt: 'Which idea is this? — Major discontinuities are sharp boundaries within Earth\'s interior where seismic wave.', answer: 'Major discontinuities are sharp boundaries', options: ['Major discontinuities are sharp boundaries', 'Direct sources of information about', 'Seismic waves are elastic waves', 'The Earths interior is concentrically'] },
            { id: 's5', label: 'The mantle is the thickest', prompt: 'Which idea is this? — The mantle is the thickest layer of Earth\'s interior (≈2,900 km), bounded above by the.', answer: 'The mantle is the thickest', options: ['The mantle is the thickest', 'Direct sources of information about', 'Seismic waves are elastic waves', 'The Earths interior is concentrically'] },
            { id: 's6', label: 'The geothermal gradient is the', prompt: 'Which idea is this? — The geothermal gradient is the rate of increase in temperature with depth in the Earth\'s.', answer: 'The geothermal gradient is the', options: ['The geothermal gradient is the', 'Direct sources of information about', 'Seismic waves are elastic waves', 'The Earths interior is concentrically'] }
          ] } }
    ],
    explore: { component: C11_GeoInteriorEarthCBSESim, prompt: 'Explore the interactive — Geo Interior Earth CBSE' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_001', difficulty: 'standard',
          question: 'Direct sources of information about Earth\'s interior are materials physically.',
          hint: 'Review Class 9 Geography Chapter 1: "Earth\'s Layers: Crust, Mantle and Core" and.',
          misconception: 'Students often believe that volcanic eruptions bring material from the core, or that the deepest drill holes have.',
          parts: [
                { id: 'a', prompt: 'Why can\'t we rely solely on direct sources to understand Earth\'s core, and what fundamental physical property of seismic waves makes them the most powerful.', answer: 'Direct sources are limited to the crust and uppermost mantle',
                  options: ['Direct sources are limited to the crust and uppermost mantle', 'seismic waves tell us about earthquakes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that volcanic eruptions bring material from the core, or that the deepest drill holes have reached the mantle.' },
                { id: 'b', prompt: 'Compare the information provided by gravity anomalies and magnetic surveys about Earth\'s interior. Which reveals sharp boundaries better, and why?', answer: 'Gravity anomalies reflect lateral density variations and are smoothed by the',
                  options: ['Gravity anomalies reflect lateral density variations and are smoothed by the', 'clear layer boundaries'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that volcanic eruptions bring material from the core, or that the deepest drill holes have reached the mantle.' }
          ],
            remediations: { 'volcanic-eruptions-bring-material-from': { steps: ['Draw a to-scale cross-section: Earth radius 6,371 cm on paper = 63.71 m; mark 12.2 cm for deepest borehole.', 'Show a volcano diagram with magma chamber at 50–100 km depth, far above the core-mantle boundary (2,900 km).', 'Have students calculate percentages: 12.2/6371 × 100 = 0.19%.', 'Emphasize that all direct samples come from the thin "skin" of the crust.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that volcanic eruptions bring material from the core, or that the deepest drill holes have.',
          parts: [
                { id: 'a', prompt: 'Compare the information provided by gravity anomalies and magnetic surveys about Earth\'s interior. Which reveals sharp boundaries better, and why?', answer: 'Gravity anomalies reflect lateral density variations and are smoothed by the',
                  options: ['Gravity anomalies reflect lateral density variations and are smoothed by the', 'clear layer boundaries'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that volcanic eruptions bring material from the core, or that the deepest drill holes have reached the mantle.' }
          ],
            remediations: { 'volcanic-eruptions-bring-material-from': { steps: ['Draw a to-scale cross-section: Earth radius 6,371 cm on paper = 63.71 m; mark 12.2 cm for deepest borehole.', 'Show a volcano diagram with magma chamber at 50–100 km depth, far above the core-mantle boundary (2,900 km).', 'Have students calculate percentages: 12.2/6371 × 100 = 0.19%.', 'Emphasize that all direct samples come from the thin "skin" of the crust.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_002', difficulty: 'standard',
          question: 'Seismic waves are elastic waves of energy generated by earthquakes or.',
          hint: 'Review Class 9 Chapter 1.6 "Earthquakes: Causes, Measurement and Effects" for.',
          misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids.',
          parts: [
                { id: 'a', prompt: 'A seismograph station records a P-wave arrival at 10:00:00 UTC and an S-wave arrival at 10:04:00 UTC. Calculate the epicenter distance from the station.', answer: 'Step 1: Time difference = 4 minutes = 240 seconds',
                  options: ['Step 1: Time difference = 4 minutes = 240 seconds', 'P-waves travel through liquids'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids because they are.' },
                { id: 'b', prompt: 'Compare the particle motion of P-waves, S-waves, and Rayleigh waves.', answer: 'P-waves: particle motion parallel to propagation (push-pull) → causes vertical',
                  options: ['P-waves: particle motion parallel to propagation (push-pull) → causes vertical', 'P-waves travel through liquids'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids because they are.' }
          ],
            remediations: { 'p-waves-travel-through-liquids': { steps: ['Use a slinky demo - push-pull creates compressions (P-wave), side-flick creates shear (S-wave).', 'Submerge slinky in water - push-pull still works (sound waves travel in water), side-flick dies immediately (no shear.', 'Connect to Earth: outer core is liquid iron (like water for shear waves), so S-waves stop at 2900 km depth creating.', 'Have student draw ray paths showing P-wave refraction at core-mantle boundary vs S-wave termination.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The P-wave shadow zone (103°-142°) is smaller than the S-wave shadow zone (103°-180°) because P-waves travel faster." Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'P-waves travel through liquids'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids because they are.' },
                { id: 'b', prompt: 'Design a simple experiment using a slinky and a rope to demonstrate the difference between P-wave and S-wave particle motion to a Class 9 student.', answer: 'Stretch a slinky on a smooth floor',
                  options: ['Stretch a slinky on a smooth floor', 'P-waves travel through liquids'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids because they are.' },
                { id: 'c', prompt: 'Compare the particle motion of P-waves, S-waves, and Rayleigh waves.', answer: 'P-waves: particle motion parallel to propagation (push-pull) → causes vertical',
                  options: ['P-waves: particle motion parallel to propagation (push-pull) → causes vertical', 'P-waves travel through liquids'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "P-waves travel through liquids because they are faster" rather than "P-waves travel through liquids because they are.' }
          ],
            remediations: { 'p-waves-travel-through-liquids': { steps: ['Use a slinky demo - push-pull creates compressions (P-wave), side-flick creates shear (S-wave).', 'Submerge slinky in water - push-pull still works (sound waves travel in water), side-flick dies immediately (no shear.', 'Connect to Earth: outer core is liquid iron (like water for shear waves), so S-waves stop at 2900 km depth creating.', 'Have student draw ray paths showing P-wave refraction at core-mantle boundary vs S-wave termination.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_003', difficulty: 'standard',
          question: 'The Earth\'s interior is concentrically layered into three principal.',
          hint: 'Revisit c11_geo_cbse_03_002: focus on the "Seismic Wave Behaviour at Boundaries" section.',
          misconception: 'Students believe **"the mantle is molten magma"** because textbooks say "magma comes from the mantle." They confuse the.',
          parts: [
                { id: 'a', prompt: 'State the approximate thickness range of the continental crust and the oceanic crust, and name the dominant rock type in each.', answer: 'Continental crust: 30–70 km thick, dominated by granitic (SIAL) rocks',
                  options: ['Continental crust: 30–70 km thick, dominated by granitic (SIAL) rocks', 'both are 30 km', 'oceanic crust is granitic'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"the mantle is molten magma"** because textbooks say "magma comes from the mantle." They confuse the **asthenosphere**.' },
                { id: 'b', prompt: 'Explain why S-waves cannot travel through the outer core, and what this tells us about its physical state.', answer: 'S-waves are shear waves requiring material rigidity (shear modulus > 0)',
                  options: ['S-waves are shear waves requiring material rigidity (shear modulus > 0)', 'S-waves are absorbed by heat', 'the mantle is molten magma'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"the mantle is molten magma"** because textbooks say "magma comes from the mantle." They confuse the **asthenosphere**.' },
                { id: 'c', prompt: 'A P-wave travels vertically downward from the surface. At the Mohorovičić discontinuity (depth 35 km), its velocity jumps from 6.8 km/s to 8.1 km/s.', answer: 'Step 1: Identify v1 = 6.8 km/s (crust), v2 = 8.1 km/s (mantle)',
                  options: ['Step 1: Identify v1 = 6.8 km/s (crust), v2 = 8.1 km/s (mantle)', 'the mantle is molten magma', 'magma comes from the mantle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"the mantle is molten magma"** because textbooks say "magma comes from the mantle." They confuse the **asthenosphere**.' }
          ],
            remediations: { 'the-mantle-is-molten-magma': { steps: ['Show a **seismic velocity vs depth graph** (PREM model) — point out S-wave velocities are non-zero throughout the.', 'Use the **"chocolate bar" analogy**: a solid chocolate bar flows over months under weight (solid-state creep) but is.', 'Have students calculate mantle viscosity from post-glacial rebound data (e.g., Fennoscandia uplift ~10 mm/yr →.', 'Re-read c11_geo_cbse_03_006 (Asthenosphere) focusing on "partial melt ≠ fully molten."'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"the mantle is molten magma"** because textbooks say "magma comes from the mantle." They confuse the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The mantle is liquid because it convects and drives plate tectonics." Justify your answer using seismic evidence.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'liquid', 'the mantle is molten magma', 'magma comes from the mantle'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **"the mantle is molten magma"** because textbooks say "magma comes from the mantle." They confuse the **asthenosphere**.' }
          ],
            remediations: { 'the-mantle-is-molten-magma': { steps: ['Show a **seismic velocity vs depth graph** (PREM model) — point out S-wave velocities are non-zero throughout the.', 'Use the **"chocolate bar" analogy**: a solid chocolate bar flows over months under weight (solid-state creep) but is.', 'Have students calculate mantle viscosity from post-glacial rebound data (e.g., Fennoscandia uplift ~10 mm/yr →.', 'Re-read c11_geo_cbse_03_006 (Asthenosphere) focusing on "partial melt ≠ fully molten."'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_004', difficulty: 'standard',
          question: 'Major discontinuities are sharp boundaries within Earth\'s interior where.',
          hint: 'If stuck, revisit c11_geo_cbse_03_002 (Seismic Waves) to review how P and S waves behave.',
          misconception: 'Students often think the Mohorovičić discontinuity is a single, fixed depth globally (e.g., "30 km") and confuse it.',
          parts: [
                { id: 'a', prompt: 'Name the three major discontinuities in Earth\'s interior in order from shallowest to deepest, and state the approximate depth of each.', answer: 'The three major discontinuities from shallowest to deepest are: (1) Mohorovičić',
                  options: ['The three major discontinuities from shallowest to deepest are: (1) Mohorovičić', 'the Mohorovičić discontinuity is a single, fixed depth globally (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Mohorovičić discontinuity is a single, fixed depth globally (e.g., "30 km") and confuse it with the crust-mantle.' },
                { id: 'b', prompt: 'Explain why S-waves cannot pass through the Gutenberg discontinuity while P-waves can, and what this tells us about the physical state of the outer core.', answer: 'S-waves are shear waves that require a rigid medium to propagate',
                  options: ['S-waves are shear waves that require a rigid medium to propagate', 'the Mohorovičić discontinuity is a single, fixed depth globally (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Mohorovičić discontinuity is a single, fixed depth globally (e.g., "30 km") and confuse it with the crust-mantle.' },
                { id: 'c', prompt: 'Compare the Mohorovičić and Gutenberg discontinuities in terms of: (a) the layers they separate, (b) the nature of the velocity change (increase or decrease),.', answer: 'the layers they separate, (',
                  options: ['the layers they separate, (', 'the Mohorovičić discontinuity is a single, fixed depth globally (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Mohorovičić discontinuity is a single, fixed depth globally (e.g., "30 km") and confuse it with the crust-mantle.' }
          ],
            remediations: { 'the-mohorovi-i-discontinuity-is': { steps: ['Draw a side-by-side cross-section of oceanic and continental crust to scale, labeling Moho depth in each (e.g., 7 km.', 'Use the concept of isostasy (from c11_geo_cbse_03_003) to explain why thicker crust has a deeper Moho (like icebergs).', 'Show a table of typical P-wave velocities above and below Moho for both settings, emphasizing the velocity jump is.', 'Practice a board-style question: "Explain why the Moho is deeper under the Himalayas than under the Indian Ocean."'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Mohorovičić discontinuity is a single, fixed depth globally (e.g., "30 km") and confuse it.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Lehmann discontinuity is the most important boundary for understanding Earth\'s magnetic field." Provide two reasons supporting or.', answer: 'The statement is largely incorrect',
                  options: ['The statement is largely incorrect', 'the Mohorovičić discontinuity is a single, fixed depth globally (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Mohorovičić discontinuity is a single, fixed depth globally (e.g., "30 km") and confuse it with the crust-mantle.' }
          ],
            remediations: { 'the-mohorovi-i-discontinuity-is': { steps: ['Draw a side-by-side cross-section of oceanic and continental crust to scale, labeling Moho depth in each (e.g., 7 km.', 'Use the concept of isostasy (from c11_geo_cbse_03_003) to explain why thicker crust has a deeper Moho (like icebergs).', 'Show a table of typical P-wave velocities above and below Moho for both settings, emphasizing the velocity jump is.', 'Practice a board-style question: "Explain why the Moho is deeper under the Himalayas than under the Indian Ocean."'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_006', difficulty: 'standard',
          question: 'The mantle is the thickest layer of Earth\'s interior (≈2,900 km), bounded above.',
          hint: 'Revisit node 002 (Seismic Waves) and practice drawing/annotating the PREM velocity.',
          misconception: 'Students often think the asthenosphere is a **liquid layer** ("magma ocean") because textbooks say it "flows" and has.',
          parts: [
                { id: 'a', prompt: 'A seismic tomography cross-section shows a low-velocity anomaly at 150 km depth beneath a mid-ocean ridge extending laterally 200 km.', answer: 'Step 1: ΔVs = 4.2 – 4.6 = –0.4 km/s',
                  options: ['Step 1: ΔVs = 4.2 – 4.6 = –0.4 km/s', 'magma ocean', 'and has'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the asthenosphere is a **liquid layer** ("magma ocean") because textbooks say it "flows" and has "partial melt." In.' }
          ],
            remediations: { 'the-asthenosphere-is-a-liquid': { steps: ['Show a stress–strain rate diagram for olivine: plot dislocation creep (asthenosphere) vs.', 'diffusion creep (mesosphere) fields.', 'Use a spring-dashpot analogy: asthenosphere = low-viscosity dashpot; mesosphere = high-viscosity dashpot in series with.', 'Have students calculate melt fraction from Vs reduction (as in DQ3) to internalize that 2% melt → ~5% Vs drop, not.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_03_008', difficulty: 'standard',
          question: 'The geothermal gradient is the rate of increase in temperature with depth in.',
          hint: 'If stuck, revisit Class 11 Physics Chapter 11 (Thermal Properties of Matter) for.',
          misconception: 'Students often believe the geothermal gradient is constant everywhere (~25–30°C/km) and that temperature increases.',
          parts: [
                { id: 'a', prompt: 'Explain why the geothermal gradient is steeper in the upper crust than in the lower crust and mantle, even though temperature increases continuously with depth.', answer: 'The gradient is steeper in the upper crust',
                  options: ['The gradient is steeper in the upper crust', 'higher temperature', 'pressure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the geothermal gradient is constant everywhere (~25–30°C/km) and that temperature increases linearly all the way to.' }
          ],
            remediations: { 'the-geothermal-gradient-is-constant': { steps: ['Plot a temperature-depth profile for three real boreholes — Kolar (craton), Puga (geothermal), and a sedimentary basin.', 'Calculate gradients for each 500 m interval and observe how they change with depth and location.', 'Overlay the lithosphere-asthenosphere boundary depth (from seismic node c11_geo_cbse_03_004) and mark where the.', 'Re-read the section on heat transfer mechanisms (conduction, advection, radiation) in the textbook and label each.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
