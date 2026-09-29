import type { SimDef } from '../../engine/types';
import C9_GeoIndiaSizeLocationCBSESim from '../../../simulations/c6_12_new/C9_GeoIndiaSizeLocationCBSESim';

/** v3 wrapped master — C9_GeoIndiaSizeLocationCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_geoindiasizelocationcbsesim: SimDef = {
    id: 'v3w_c9_geoindiasizelocationcbsesim',
    title: 'Air Pressure: Horizontal and Vertical Distribution',
    subtitle: 'Covers global pressure belt systems (formation, location, seasonal shift) and vertical.',
    classLevel: 9, subject: 'science', topic: 'Air Pressure: Horizontal and Vertical Distribution',
    chapters: [],
    nodeIds: ['c9_geo_ch2_3', 'c9_geo_ch2_4', 'c9_geo_ch2_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are standing on a beach in Chennai at noon feeling the warm air rise, while a weather balloon.', goal: 'Master Air Pressure: Horizontal and Vertical Distribution.' },
    discovery: {
        question: 'Explain why the equatorial region experiences low pressure throughout the year while the subtropical zones (around 30°N/S) have high pressure, even though both.',
        options: ['The equatorial low forms', 'cooling', 'cold air sinking'],
        answer: 'The equatorial low forms',
        hook: 'Students often believe that the subtropical high-pressure belts are caused solely by "cold air sinking" because the.',
    },
    teaching: [
        { title: 'Air pressure is the force exerted by the.', text: 'Air pressure is the force exerted by the weight of the air column above a unit area of the Earth\'s surface, measured in millibars (mb) or hectopascals (hPa).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c9_geo_ch2_5', title: 'Local winds are winds that blow over a.',
          scaffold: { problem: 'A farmer in Sri Ganganagar, Rajasthan (western end of the Indo-Gangetic plain) observes that on 25th May, the morning temperature is 32°C.',
            steps: [
            { text: 'Identify the regional setting — Sri Ganganagar lies on the eastern edge of the Thar Desert, a source region for Loo.' },
            { text: 'Recall the diurnal heating cycle — intense May insolation heats the desert surface to >60°C by noon, creating a deep,.' },
            { text: 'Apply the pressure gradient force — air from the slightly cooler, moister Indo-Gangetic plain (east) rushes westward.' },
            { text: 'Analyze the air mass transformation — as this air moves over the hot desert, it undergoes sensible heating (temperature.' },
            { text: 'Verify with observations — the observed shift from 32°C/40% RH to 47°C/8% RH with dusty westerlies matches the Loo.', faded: true, blankAnswer: 'The change is caused by the onset of the Loo: intense.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_geo_ch2_4', title: 'Identify each idea',
          dissect: { specimen: 'Air Pressure: Horizontal and Vertical Distribution', spots: [
            { id: 's1', label: 'Air pressure is the force', prompt: 'Which idea is this? — Air pressure is the force exerted by the weight of the air column above a unit area of.', answer: 'Air pressure is the force', options: ['Air pressure is the force', 'Global wind systems are large-scale', 'Local winds are winds that'] },
            { id: 's2', label: 'Global wind systems are large-scale', prompt: 'Which idea is this? — Global wind systems are large-scale, persistent wind patterns driven by differential.', answer: 'Global wind systems are large-scale', options: ['Global wind systems are large-scale', 'Air pressure is the force', 'Local winds are winds that'] },
            { id: 's3', label: 'Local winds are winds that', prompt: 'Which idea is this? — Local winds are winds that blow over a limited geographical area due to local pressure.', answer: 'Local winds are winds that', options: ['Local winds are winds that', 'Air pressure is the force', 'Global wind systems are large-scale'] }
          ] } }
    ],
    explore: { component: C9_GeoIndiaSizeLocationCBSESim, prompt: 'Explore the interactive — Air Pressure: Horizontal and Vertical Distribution' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c9_geo_ch2_5', difficulty: 'standard',
          question: 'Local winds are winds that blow over a limited geographical area due to local.',
          hint: 'If stuck, revisit the adiabatic lapse rate concept (dry vs. moist) from physics and the.',
          misconception: 'Students often believe the Loo is a "summer monsoon wind" or a precursor to the monsoon because it blows just before.',
          parts: [
                { id: 'a', prompt: 'On an outline map of North America, the Rocky Mountains run north-south.', answer: 'The wind is the Chinook',
                  options: ['The wind is the Chinook', 'warm air from the south', 'compression heating without mentioning adiabatic processes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Loo is a "summer monsoon wind" or a precursor to the monsoon because it blows just before the monsoon onset.' }
          ],
            remediations: { 'the-loo-is-a-summer': { steps: ['Draw a cross-section of the Thar Desert-North Indian plain at 2 PM in May: show surface heating → low pressure → inflow.', 'Draw a map of Western Europe: plot high pressure over Bay of Biscay, low over Mediterranean, trace air funneling down.', 'Draw a cross-section of the Rockies: moist ascent (cool, rain) → dry descent (warm, dry) → Chinook.', 'Create a comparison table with columns: Wind, Region, Season, Thermal Nature, Driving Mechanism, Topographic Role,.'] } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Loo is a "summer monsoon wind" or a precursor to the monsoon because it blows just before.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Mistral is essentially a European version of the Loo because both are dry winds caused by high pressure pushing air into low.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'dry wind = same mechanism', 'summer monsoon wind'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Loo is a "summer monsoon wind" or a precursor to the monsoon because it blows just before the monsoon onset.' },
                { id: 'b', prompt: 'Design a simple early-warning advisory for farmers in western Uttar Pradesh to mitigate Loo damage to late-sown wheat.', answer: 'the meteorological threshold to trigger the alert, (',
                  options: ['the meteorological threshold to trigger the alert, (', 'summer monsoon wind'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Loo is a "summer monsoon wind" or a precursor to the monsoon because it blows just before the monsoon onset.' }
          ],
            remediations: { 'the-loo-is-a-summer': { steps: ['Draw a cross-section of the Thar Desert-North Indian plain at 2 PM in May: show surface heating → low pressure → inflow.', 'Draw a map of Western Europe: plot high pressure over Bay of Biscay, low over Mediterranean, trace air funneling down.', 'Draw a cross-section of the Rockies: moist ascent (cool, rain) → dry descent (warm, dry) → Chinook.', 'Create a comparison table with columns: Wind, Region, Season, Thermal Nature, Driving Mechanism, Topographic Role,.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
