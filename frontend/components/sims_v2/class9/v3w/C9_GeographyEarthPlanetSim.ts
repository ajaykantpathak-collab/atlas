import type { SimDef } from '../../engine/types';
import C9_GeographyEarthPlanetSim from '../../../simulations/c6_12/C9_GeographyEarthPlanetSim';

/** v3 wrapped master — C9_GeographyEarthPlanetSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_geographyearthplanetsim: SimDef = {
    id: 'v3w_c9_geographyearthplanetsim',
    title: 'Atmosphere: Composition of Gases',
    subtitle: 'Covers the chemical composition of dry air and the role of variable gases (water vapour,.',
    classLevel: 9, subject: 'geography', topic: 'Atmosphere: Composition of Gases',
    chapters: [],
    nodeIds: ['c9_geo_ch2_1', 'c9_geo_ch2_11', 'c9_geo_ch2_2', 'c9_geo_ch2_3', 'c9_geo_ch2_4', 'c9_geo_ch2_6', 'c9_geo_ch2_9', 'c9_geo_ch1_1'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Observe the air around you on a humid monsoon afternoon in Mumbai — it feels heavy and sticky, while a winter.', goal: 'Master Atmosphere: Composition of Gases.' },
    discovery: {
        question: 'State the approximate percentage by volume of nitrogen, oxygen, and argon in dry air, and name the most abundant variable gas.',
        options: ['Nitrogen ≈ 78.08%, Oxygen ≈ 20.95%, Argon ≈ 0.93%', 'the atmosphere is mostly oxygen', 'trace gas'],
        answer: 'Nitrogen ≈ 78.08%, Oxygen ≈ 20.95%, Argon ≈ 0.93%',
        hook: 'Students believe "the atmosphere is mostly oxygen because we breathe it" and consequently think nitrogen is.',
    },
    teaching: [
        { title: 'The Earth\'s atmosphere is a mixture of gases.', text: 'The Earth\'s atmosphere is a mixture of gases held by gravity, consisting primarily of nitrogen (78.08% by volume), oxygen (20.95%), argon (0.93%), and carbon dioxide (0.04%), with trace amounts of.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_geo_ch2_1', title: 'The Earth\'s atmosphere is a mixture of.',
          scaffold: { problem: 'Calculate the partial pressure of oxygen and carbon dioxide at sea level (1013.25 hPa) and at 5.5 km altitude where pressure is 500 hPa.',
            steps: [
            { text: 'Identify the volume fractions — O₂ = 0.2095, CO₂ = 0.0004 (from standard dry air composition).' },
            { text: 'Apply Dalton\'s Law at sea level: pO₂ = 0.2095 × 1013.25 = 212.3 hPa; pCO₂ = 0.0004 × 1013.25 = 0.41 hPa.' },
            { text: 'Apply Dalton\'s Law at 5.5 km: pO₂ = 0.2095 × 500 = 104.8 hPa; pCO₂ = 0.0004 × 500 = 0.20 hPa.' },
            { text: 'Compare — oxygen partial pressure drops by half (212 → 105 hPa) while percentage stays constant; this reduces the.' },
            { text: 'Interpret — percentage composition is unchanged in the homosphere, but total pressure falls with altitude, so partial.', faded: true, blankAnswer: 'Sea level: pO₂ = 212.3 hPa, pCO₂ = 0.41 hPa. At 5.5 km: pO₂.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_11', title: 'Human impact on climate refers to the.',
          scaffold: { problem: 'A 500 MW coal-fired power plant in Chhattisgarh operates at 85% capacity factor.',
            steps: [
            { text: 'Calculate annual energy output: 500 MW × 0.85 × 8760 h = 3,723,000 MWh = 3.723 × 10⁹ kWh.' },
            { text: 'Convert to heat input: 1 kWh = 3.6 MJ, so output = 1.34 × 10¹⁰ MJ.' },
            { text: 'Coal mass required = heat input / calorific value = 3.53 × 10¹⁰ MJ / 22 MJ/kg = 1.60 × 10⁹ kg = 1.60 Mt coal.' },
            { text: 'Carbon mass = coal mass × carbon content = 1.60 Mt × 0.65 = 1.04 Mt C.' },
            { text: 'CO₂ mass = carbon mass × (44/12) × combustion efficiency = 1.04 × (44/12) × 0.98 = 3.72 Mt CO₂/year.', faded: true, blankAnswer: '3.72 million tonnes CO₂ per year.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_2', title: 'The atmosphere is divided into five.',
          scaffold: { problem: 'A radiosonde launched from Chennai at 12:00 PM records surface temperature 34°C.',
            steps: [
            { text: 'Identify known values: surface T = 34°C at 0 km; tropopause T = -70°C at 15.5 km.' },
            { text: 'Compute total temperature change: ΔT = -70 - 34 = -104°C over Δz = 15.5 km.' },
            { text: 'Calculate average ELR = -ΔT/Δz = 104/15.5 = 6.7°C/km.' },
            { text: 'Recall dry adiabatic lapse rate (DALR) = 9.8°C/km for unsaturated rising air parcel.' },
            { text: 'Explain difference: ELR is the *actual* environmental profile; DALR is theoretical for a dry parcel.', faded: true, blankAnswer: 'Average ERL = 6.7°C/km. It is lower than DALR (9.8°C/km).' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_3', title: 'Air pressure is the force exerted by.',
          scaffold: { problem: 'A mountaineering team plans to climb from a base camp at 2,000 m (pressure 800 mb) to a summit at 6,000 m.',
            steps: [
            { text: 'Identify the height difference: 6,000 m - 2,000 m = 4,000 m.' },
            { text: 'Recall the approximate pressure lapse rate: 1 mb decrease per 10 m ascent in the lower troposphere.' },
            { text: 'Calculate pressure decrease: 4,000 m ÷ 10 m/mb = 400 mb decrease.' },
            { text: 'Subtract from base camp pressure: 800 mb - 400 mb = 400 mb estimated summit pressure.' },
            { text: 'Interpret: Actual pressure may be higher if the air column is warmer (lower density) or lower if colder; also the lapse.', faded: true, blankAnswer: 'Estimated summit pressure ≈ 400 mb. Actual pressure.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_4', title: 'Global wind systems are large-scale,.',
          scaffold: { problem: 'A weather station at 20°N latitude in Rajasthan records surface winds from the northeast at 15 km/h in January.',
            steps: [
            { text: 'Identify the pressure belt at 20°N – it lies under the subtropical high-pressure belt (around 30°N) where air sinks due.' },
            { text: 'Identify the pressure gradient – air flows from this subtropical high toward the equatorial low-pressure belt (ITCZ.' },
            { text: 'Determine initial flow direction – from 20°N toward the equator means a southerly component (flowing south).' },
            { text: 'Apply Coriolis effect – in Northern Hemisphere, moving air is deflected to the right of its path.' },
            { text: 'Verify with seasonal context – in January, ITCZ is south of equator, so pressure gradient from 20°N to ITCZ is strong,.', faded: true, blankAnswer: 'The northeast wind at 20°N in January is the Northeast.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_6', title: 'Seasons are the periodic changes in.',
          scaffold: { problem: 'A student in Delhi (28.6°N) observes the Sun\'s altitude at solar noon on December 22 (Winter Solstice).',
            steps: [
            { text: 'Identify the date — December 22 is Winter Solstice, when Sun\'s declination δ = -23.5° (Tropic of Capricorn).' },
            { text: 'Recall the solar altitude formula at solar noon: Altitude = 90° - |latitude - declination|.' },
            { text: 'Substitute values: Altitude = 90° - |28.6° - (-23.5°)| = 90° - 52.1° = 37.9°.' },
            { text: 'Compare with June Solstice altitude: 90° - |28.6° - 23.5°| = 84.9°.' },
            { text: 'Conclude: Low solar angle + short day length (calculated via hour angle formula) = less heating = winter.', faded: true, blankAnswer: 'Sun\'s altitude at solar noon in Delhi on Dec 22 = 37.9°..' }
            ] } },
        { type: 'dissect', nodeId: 'c9_geo_ch2_11', title: 'Identify each idea',
          dissect: { specimen: 'Atmosphere: Composition of Gases', spots: [
            { id: 's1', label: 'The Earths atmosphere is a', prompt: 'Which idea is this? — The Earth\'s atmosphere is a mixture of gases held by gravity, consisting primarily of.', answer: 'The Earths atmosphere is a', options: ['The Earths atmosphere is a', 'Human impact on climate refers', 'The atmosphere is divided into', 'Air pressure is the force'] },
            { id: 's2', label: 'Human impact on climate refers', prompt: 'Which idea is this? — Human impact on climate refers to the alteration of Earth\'s atmospheric composition and.', answer: 'Human impact on climate refers', options: ['Human impact on climate refers', 'The Earths atmosphere is a', 'The atmosphere is divided into', 'Air pressure is the force'] },
            { id: 's3', label: 'The atmosphere is divided into', prompt: 'Which idea is this? — The atmosphere is divided into five distinct layers—troposphere, stratosphere,.', answer: 'The atmosphere is divided into', options: ['The atmosphere is divided into', 'The Earths atmosphere is a', 'Human impact on climate refers', 'Air pressure is the force'] },
            { id: 's4', label: 'Air pressure is the force', prompt: 'Which idea is this? — Air pressure is the force exerted by the weight of the air column above a unit area of.', answer: 'Air pressure is the force', options: ['Air pressure is the force', 'The Earths atmosphere is a', 'Human impact on climate refers', 'The atmosphere is divided into'] },
            { id: 's5', label: 'Global wind systems are large-scale', prompt: 'Which idea is this? — Global wind systems are large-scale, persistent wind patterns driven by differential.', answer: 'Global wind systems are large-scale', options: ['Global wind systems are large-scale', 'The Earths atmosphere is a', 'Human impact on climate refers', 'The atmosphere is divided into'] },
            { id: 's6', label: 'Seasons are the periodic changes', prompt: 'Which idea is this? — Seasons are the periodic changes in weather patterns caused by Earth\'s revolution around.', answer: 'Seasons are the periodic changes', options: ['Seasons are the periodic changes', 'The Earths atmosphere is a', 'Human impact on climate refers', 'The atmosphere is divided into'] }
          ] } }
    ],
    explore: { component: C9_GeographyEarthPlanetSim, prompt: 'Explore the interactive — Atmosphere: Composition of Gases' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_geo_ch2_1', difficulty: 'standard',
          question: 'The Earth\'s atmosphere is a mixture of gases held by gravity, consisting.',
          hint: 'Revisit Class 7 node c7_geo_ch02_002 "Atmosphere: Layers and Composition" and Class 9.',
          misconception: 'Students believe "the atmosphere is mostly oxygen because we breathe it" and consequently think nitrogen is.',
          parts: [
                { id: 'a', prompt: 'State the approximate percentage by volume of nitrogen, oxygen, and argon in dry air, and name the most abundant variable gas.', answer: 'Nitrogen ≈ 78.08%, Oxygen ≈ 20.95%, Argon ≈ 0.93%',
                  options: ['Nitrogen ≈ 78.08%, Oxygen ≈ 20.95%, Argon ≈ 0.93%', 'the atmosphere is mostly oxygen', 'trace gas'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "the atmosphere is mostly oxygen because we breathe it" and consequently think nitrogen is unimportant.' }
          ],
            remediations: { 'the-atmosphere-is-mostly-oxygen': { steps: ['Show a pie chart of dry air composition; ask students to calculate the O₂:N₂ ratio (≈1:4).', 'Demonstrate a candle burning in pure O₂ (vigorous) vs. air (steady) vs.', 'Use the "bathtub analogy" for CO₂: a tap (emissions) dripping into a large tub (atmosphere) — even a slow drip.', 'Assign a 100-word writing: "Why nitrogen matters to a wheat farmer in Punjab."'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "the atmosphere is mostly oxygen because we breathe it" and consequently think nitrogen is.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Rising methane concentrations are more dangerous than rising CO₂ because methane traps 28 times more heat per molecule over 100 years."', answer: 'The statement is partially true but misleading',
                  options: ['The statement is partially true but misleading', 'the atmosphere is mostly oxygen', 'trace gas', 'insignificant gas'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "the atmosphere is mostly oxygen because we breathe it" and consequently think nitrogen is unimportant.' }
          ],
            remediations: { 'the-atmosphere-is-mostly-oxygen': { steps: ['Show a pie chart of dry air composition; ask students to calculate the O₂:N₂ ratio (≈1:4).', 'Demonstrate a candle burning in pure O₂ (vigorous) vs. air (steady) vs.', 'Use the "bathtub analogy" for CO₂: a tap (emissions) dripping into a large tub (atmosphere) — even a slow drip.', 'Assign a 100-word writing: "Why nitrogen matters to a wheat farmer in Punjab."'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_11', difficulty: 'standard',
          question: 'Human impact on climate refers to the alteration of Earth\'s atmospheric.',
          hint: 'Revisit the greenhouse gas property table in c9_geo_ch2_1 (which gases, sources,.',
          misconception: 'Students believe "global warming means everywhere gets hotter by the same amount." They miss that land warms faster.',
          parts: [
                { id: 'a', prompt: 'Using the concept of \'carbon intensity\' (CO₂ emitted per unit GDP), calculate the approximate annual CO₂ emissions from India\'s coal-based electricity sector.', answer: 'Step 1: Convert TWh to MWh: 1,100 TWh = 1,100 × 10⁶ MWh',
                  options: ['Step 1: Convert TWh to MWh: 1,100 TWh = 1,100 × 10⁶ MWh', 'global warming means everywhere gets hotter by the same amount', '"global warming means everywhere gets hotter by the same amount'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "global warming means everywhere gets hotter by the same amount." They miss that land warms faster than oceans, high.' },
                { id: 'b', prompt: 'Compare the impact of two land-use changes on local climate: (i) conversion of Western Ghats evergreen forest to areca nut plantation, (ii) conversion of Thar.', answer: 'Western Ghats conversion disrupts rainfall recycling more severely',
                  options: ['Western Ghats conversion disrupts rainfall recycling more severely', 'solar parks are worse', 'global warming means everywhere gets hotter by the same amount'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "global warming means everywhere gets hotter by the same amount." They miss that land warms faster than oceans, high.' }
          ],
            remediations: { 'global-warming-means-everywhere-gets': { steps: ['Show NASA GISS temperature anomaly maps (1880-present) — highlight faster warming over Indian landmass vs. Indian Ocean.', 'Plot aerosol optical depth (MODIS) over Indo-Gangetic Plain vs.', 'Use a simple energy balance model (online tool) to toggle aerosol forcing on/off — observe how removing aerosols.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_11', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "global warming means everywhere gets hotter by the same amount." They miss that land warms faster.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "India\'s per capita CO₂ emissions are low (~1.9 tCO₂), so it has no moral obligation to reduce emissions until developed nations reach.', answer: 'The statement is ethically incomplete',
                  options: ['The statement is ethically incomplete', 'India should emit freely', 'global warming means everywhere gets hotter by the same amount', '"global warming means everywhere gets hotter by the same amount'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "global warming means everywhere gets hotter by the same amount." They miss that land warms faster than oceans, high.' },
                { id: 'b', prompt: 'Compare the impact of two land-use changes on local climate: (i) conversion of Western Ghats evergreen forest to areca nut plantation, (ii) conversion of Thar.', answer: 'Western Ghats conversion disrupts rainfall recycling more severely',
                  options: ['Western Ghats conversion disrupts rainfall recycling more severely', 'solar parks are worse', 'global warming means everywhere gets hotter by the same amount', '"global warming means everywhere gets hotter by the same amount'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "global warming means everywhere gets hotter by the same amount." They miss that land warms faster than oceans, high.' }
          ],
            remediations: { 'global-warming-means-everywhere-gets': { steps: ['Show NASA GISS temperature anomaly maps (1880-present) — highlight faster warming over Indian landmass vs. Indian Ocean.', 'Plot aerosol optical depth (MODIS) over Indo-Gangetic Plain vs.', 'Use a simple energy balance model (online tool) to toggle aerosol forcing on/off — observe how removing aerosols.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_2', difficulty: 'standard',
          question: 'The atmosphere is divided into five distinct layers—troposphere, stratosphere,.',
          hint: 'Revisit c7_geo_ch02_002 (Atmosphere: Layers and Composition) and c7_geo_ch02_003.',
          misconception: 'Students believe the atmosphere\'s layers are separated by distinct physical barriers like "ceilings" and that.',
          parts: [
                { id: 'a', prompt: 'Explain why temperature decreases with altitude in the troposphere but increases in the stratosphere, identifying the specific heat source and mechanism in.', answer: 'In the troposphere, temperature decreases',
                  options: ['In the troposphere, temperature decreases', 'heat rising from below', 'ceilings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the atmosphere\'s layers are separated by distinct physical barriers like "ceilings" and that temperature decreases.' },
                { id: 'b', prompt: 'A weather balloon launched from Mumbai records temperature dropping at 6.5°C per km up to 14 km, then remaining constant for 2 km, then rising at 3°C per km.', answer: '0–14 km: troposphere (lapse rate 6.5°C/km)',
                  options: ['0–14 km: troposphere (lapse rate 6.5°C/km)', 'ceilings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the atmosphere\'s layers are separated by distinct physical barriers like "ceilings" and that temperature decreases.' }
          ],
            remediations: { 'the-atmosphere-s-layers-are': { steps: ['Draw a vertical temperature profile graph (temperature on x-axis, altitude on y-axis) using real radiosonde data from.', 'Mark where Mount Everest (8.8 km), commercial jets (10–12 km), weather balloons (30 km), meteors (70 km), ISS (400 km),.', 'Explain each kink: tropopause = end of ground-heated air, stratopause = end of ozone heating, mesopause = coldest.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the atmosphere\'s layers are separated by distinct physical barriers like "ceilings" and that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The thermosphere is the hottest layer (1500°C), so satellites orbiting there would melt." Justify your answer using the distinction.', answer: 'The statement is misleading',
                  options: ['The statement is misleading', 'ceilings'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the atmosphere\'s layers are separated by distinct physical barriers like "ceilings" and that temperature decreases.' }
          ],
            remediations: { 'the-atmosphere-s-layers-are': { steps: ['Draw a vertical temperature profile graph (temperature on x-axis, altitude on y-axis) using real radiosonde data from.', 'Mark where Mount Everest (8.8 km), commercial jets (10–12 km), weather balloons (30 km), meteors (70 km), ISS (400 km),.', 'Explain each kink: tropopause = end of ground-heated air, stratopause = end of ozone heating, mesopause = coldest.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_3', difficulty: 'standard',
          question: 'Air pressure is the force exerted by the weight of the air column above a unit.',
          hint: 'Revisit the concept of "air has weight" and the mercury barometer experiment from Class.',
          misconception: 'Students often believe that the subtropical high-pressure belts are caused solely by "cold air sinking" because the.',
          parts: [
                { id: 'a', prompt: 'Explain why the equatorial region experiences low pressure throughout the year while the subtropical zones (around 30°N/S) have high pressure, even though both.', answer: 'The equatorial low forms',
                  options: ['The equatorial low forms', 'cooling', 'cold air sinking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the subtropical high-pressure belts are caused solely by "cold air sinking" because the poles are cold.' },
                { id: 'b', prompt: 'A weather station at 1,500 m above sea level records a pressure of 850 mb.', answer: 'Step 1: Height difference = 1,500 m',
                  options: ['Step 1: Height difference = 1,500 m', 'cold air sinking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the subtropical high-pressure belts are caused solely by "cold air sinking" because the poles are cold.' },
                { id: 'c', prompt: 'Compare the seasonal shift of the Intertropical Convergence Zone (ITCZ) over the Indian subcontinent with its position over the Atlantic Ocean.', answer: 'Over India, the ITCZ shifts to 25°N–30°N in summer',
                  options: ['Over India, the ITCZ shifts to 25°N–30°N in summer', 'cold air sinking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the subtropical high-pressure belts are caused solely by "cold air sinking" because the poles are cold.' }
          ],
            remediations: { 'the-subtropical-high-pressure-belts': { steps: ['Draw a cross-section of the Hadley cell on the board: rising at equator, poleward flow aloft, sinking at 30°,.', 'Use a rotating globe or animation to show Coriolis deflection turning poleward flow into subtropical westerlies aloft.', 'Have students feel the warming of a bicycle pump nozzle during rapid compression to experience adiabatic heating.', 'Plot temperature and pressure data from a radiosonde ascent (available from IMD) to see pressure drop and temperature.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the subtropical high-pressure belts are caused solely by "cold air sinking" because the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Vertical pressure distribution is linear; if pressure halves at 5.5 km, it will be zero at 11 km." Justify your evaluation using the.', answer: 'The statement is false',
                  options: ['The statement is false', 'cold air sinking'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the subtropical high-pressure belts are caused solely by "cold air sinking" because the poles are cold.' }
          ],
            remediations: { 'the-subtropical-high-pressure-belts': { steps: ['Draw a cross-section of the Hadley cell on the board: rising at equator, poleward flow aloft, sinking at 30°,.', 'Use a rotating globe or animation to show Coriolis deflection turning poleward flow into subtropical westerlies aloft.', 'Have students feel the warming of a bicycle pump nozzle during rapid compression to experience adiabatic heating.', 'Plot temperature and pressure data from a radiosonde ascent (available from IMD) to see pressure drop and temperature.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_4', difficulty: 'standard',
          question: 'Global wind systems are large-scale, persistent wind patterns driven by.',
          hint: 'Revisit c9_geo_ch2_3 "Air Pressure: Horizontal and Vertical Distribution" – focus on the.',
          misconception: 'Students think the "Trade Winds" blow from the equator toward the poles because "trade" implies movement of goods from.',
          parts: [
                { id: 'a', prompt: 'A ship at 15°N, 60°W in the Atlantic Ocean records steady winds from the northeast.', answer: 'Step 1: Identify the wind belt at 15°N → Trade Winds (northeasterlies in NH)',
                  options: ['Step 1: Identify the wind belt at 15°N → Trade Winds (northeasterlies in NH)', 'Trade Winds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the "Trade Winds" blow from the equator toward the poles because "trade" implies movement of goods from tropics to temperate.' },
                { id: 'b', prompt: 'Compare the Hadley Cell and the Ferrel Cell in terms of: (a) latitudinal extent, (b) driving mechanism (thermal vs.', answer: 'latitudinal extent, (',
                  options: ['latitudinal extent, (', 'Trade Winds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the "Trade Winds" blow from the equator toward the poles because "trade" implies movement of goods from tropics to temperate.' }
          ],
            remediations: { 'the-trade-winds-blow-from': { steps: ['Draw a simple cross-section at 0° longitude showing only the Hadley Cell: label equator (hot, rising, low pressure),.', 'Draw surface arrows from 30° toward equator.', 'Apply Coriolis: in NH, arrow pointing south gets pushed right → becomes NE arrow.', 'Label these "Northeast Trades" and "Southeast Trades".', 'Contrast with monsoon: show ITCZ shifting to 25°N in summer, pulling SE trades across equator → they become SW winds.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think the "Trade Winds" blow from the equator toward the poles because "trade" implies movement of goods from.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Coriolis effect is strongest at the equator and zero at the poles." Justify your answer with the physical principle.', answer: 'The statement is false',
                  options: ['The statement is false', 'Trade Winds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the "Trade Winds" blow from the equator toward the poles because "trade" implies movement of goods from tropics to temperate.' },
                { id: 'b', prompt: 'Design a labeled diagram for a Class 9 student showing the global pressure belts, planetary wind systems, and the three-cell circulation model.', answer: 'A good answer includes: (1) Latitude lines: 0°, 30°N/S, 60°N/S, 90°N/S',
                  options: ['A good answer includes: (1) Latitude lines: 0°, 30°N/S, 60°N/S, 90°N/S', 'Trade Winds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the "Trade Winds" blow from the equator toward the poles because "trade" implies movement of goods from tropics to temperate.' },
                { id: 'c', prompt: 'Compare the Hadley Cell and the Ferrel Cell in terms of: (a) latitudinal extent, (b) driving mechanism (thermal vs.', answer: 'latitudinal extent, (',
                  options: ['latitudinal extent, (', 'Trade Winds'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think the "Trade Winds" blow from the equator toward the poles because "trade" implies movement of goods from tropics to temperate.' }
          ],
            remediations: { 'the-trade-winds-blow-from': { steps: ['Draw a simple cross-section at 0° longitude showing only the Hadley Cell: label equator (hot, rising, low pressure),.', 'Draw surface arrows from 30° toward equator.', 'Apply Coriolis: in NH, arrow pointing south gets pushed right → becomes NE arrow.', 'Label these "Northeast Trades" and "Southeast Trades".', 'Contrast with monsoon: show ITCZ shifting to 25°N in summer, pulling SE trades across equator → they become SW winds.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_6', difficulty: 'standard',
          question: 'Seasons are the periodic changes in weather patterns caused by Earth\'s.',
          hint: 'Review Class 7 "Seasons in India" (c7_geo_ch03_002) and Class 8 "Earth as an Oblate.',
          misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons.',
          parts: [
                { id: 'a', prompt: 'Calculate the approximate day length at 30°N latitude on the June Solstice (June 21), given that the Sun\'s declination is 23.5°N.', answer: 'Step 1: Latitude = 30°N, Declination = 23.5°N',
                  options: ['Step 1: Latitude = 30°N, Declination = 23.5°N', 'equal day/night everywhere or cannot apply the spherical geometry formula', 'Earth is closer to the Sun in summer and farther in winter, causing seasons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons. They cite "summer = hot = closer" logic.' },
                { id: 'b', prompt: 'Compare the seasonal temperature range at 60°N (e.g., Oslo) versus 10°N (e.g., Chennai).', answer: 'At 60°N, solar altitude varies from 53.5° (summer) to 6.5° (winter)',
                  options: ['At 60°N, solar altitude varies from 53.5° (summer) to 6.5° (winter)', 'distance from equator', 'Earth is closer to the Sun in summer and farther in winter, causing seasons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons. They cite "summer = hot = closer" logic.' }
          ],
            remediations: { 'earth-is-closer-to-the': { steps: ['Show a diagram of Earth\'s orbit with correct perihelion/aphelion dates labeled.', 'Have students calculate solar constant at perihelion (1412 W/m²) vs. aphelion (1321 W/m²) — only 7% difference.', 'Compare with solar angle change: at 30°N, noon Sun altitude is 83.5° in June vs.', 'Conclude distance effect is minor; tilt effect is dominant.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons.',
          parts: [
                { id: 'a', prompt: 'Compare the seasonal temperature range at 60°N (e.g., Oslo) versus 10°N (e.g., Chennai).', answer: 'At 60°N, solar altitude varies from 53.5° (summer) to 6.5° (winter)',
                  options: ['At 60°N, solar altitude varies from 53.5° (summer) to 6.5° (winter)', 'distance from equator', 'Earth is closer to the Sun in summer and farther in winter, causing seasons'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Earth is closer to the Sun in summer and farther in winter, causing seasons. They cite "summer = hot = closer" logic.' }
          ],
            remediations: { 'earth-is-closer-to-the': { steps: ['Show a diagram of Earth\'s orbit with correct perihelion/aphelion dates labeled.', 'Have students calculate solar constant at perihelion (1412 W/m²) vs. aphelion (1321 W/m²) — only 7% difference.', 'Compare with solar angle change: at 30°N, noon Sun altitude is 83.5° in June vs.', 'Conclude distance effect is minor; tilt effect is dominant.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
