import type { SimDef } from '../../engine/types';

/** v3 generated — c9_geo_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_geo_ch02_p1: SimDef = {
    id: 'v3_c9_geo_ch02_p1',
    title: 'Atmosphere and Climate · Part 1/2',
    subtitle: 'The invisible cocktail inside every breath',
    classLevel: 9, subject: 'geography', topic: 'Atmosphere and Climate · Part 1/2',
    chapters: ['c9_geo_ch02'],
    nodeIds: ['c9_geo_ch2_1', 'c9_geo_ch2_10', 'c9_geo_ch2_11', 'c9_geo_ch2_2', 'c9_geo_ch2_3', 'c9_geo_ch2_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an atmospheric analyst', intro: 'Sticky Mumbai monsoon air and crisp Delhi winter air are the \'same\' air — with different water vapour. Decode what air is actually made of, and why the tiniest ingredient steers the climate.', goal: 'Understand the atmosphere\'s composition — permanent gases (N₂ ~78%, O₂ ~21%, Ar ~1%) versus variable water vapour — and the distinct climate roles of CO₂, water vapour and ozone.' },
    discovery: {
        question: 'We breathe oxygen — so the atmosphere must be mostly oxygen, right? What actually fills 78% of every breath you take?',
        options: ['Nitrogen — the quiet majority that dilutes oxygen enough to stop everything from bursting into flames', 'Oxygen — it\'s what we need most', 'Carbon dioxide — it\'s the famous one', 'Water vapour — it\'s everywhere'],
        answer: 'Nitrogen — the quiet majority that dilutes oxygen enough to stop everything from bursting into flames',
        hook: '\'Trace gas\' doesn\'t mean \'unimportant.\' CO₂ is just 0.04% of air yet it\'s the climate\'s control knob — water vapour (up to 4%) only amplifies what CO₂ starts. And water vapour is the variable gas that makes monsoon air feel heavy while desert air stays crisp.',
    },
    teaching: [
        { title: 'Atmosphere: Composition of Gases', text: 'The Earth\'s atmosphere is a mixture of gases held by gravity, consisting primarily of nitrogen (78.08% by volume), oxygen (20.95%), argon (0.93%), and carbon dioxide (0.04%), with trace amounts.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_geo_ch2_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Dissect a breath of air: pin down the percentages of nitrogen, oxygen and argon, figure out why oxygen stays at ~21% up to 100 km then thins out above, and judge whether methane\'s 28× heat-trapping punch makes it scarier than CO₂.',
        labels: ['Atmosphere: Composition of Gases', 'Carbon Footprint: Definition', 'Human Impact on Climate', 'Layers of the Atmosphere', 'Air Pressure: Horizontal', 'Winds: Causes and Types'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_1', title: 'Atmosphere: Composition of Gases',
          scaffold: { problem: 'Calculate the partial pressure of oxygen and carbon dioxide at sea level (1013.25 hPa) and at 5.5 km altitude where pressure is 500 hPa.',
            steps: [
            { text: 'Identify the volume fractions — O₂ = 0.2095, CO₂ = 0.0004 (from standard dry air composition).' },
            { text: 'Apply Dalton\'s Law at sea level: pO₂ = 0.2095 × 1013.25 = 212.3 hPa; pCO₂ = 0.0004 × 1013.25 = 0.41 hPa.' },
            { text: 'Apply Dalton\'s Law at 5.5 km: pO₂ = 0.2095 × 500 = 104.8 hPa; pCO₂ = 0.0004 × 500 = 0.20 hPa.' },
            { text: 'Compare — oxygen partial pressure drops by half (212 → 105 hPa) while percentage stays constant; this reduces the.' },
            { text: 'Interpret — percentage composition is unchanged in the homosphere, but total pressure falls with altitude, so partial.', faded: true, blankAnswer: 'Sea level: pO₂ = 212.3 hPa, pCO₂ = 0.41 hPa. At 5.5 km: pO₂.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_10', title: 'Carbon Footprint: Definition and Reduction Strategies',
          scaffold: { problem: 'A family in Bengaluru wants to reduce their carbon footprint. They currently use 400 kWh/month electricity (grid factor 0.82 kg CO₂/kWh).',
            steps: [
            { text: 'Calculate baseline emissions from each source using given emission factors.' },
            { text: 'Compute total baseline footprint in kg CO₂e.' },
            { text: 'For Option A, subtract solar generation from grid electricity (400-360=40 kWh grid), recalculate electricity emissions.' },
            { text: 'For Option B, keep electricity and LPG same; remove petrol car emissions, add EV charging electricity (1000 km × 0.15.' },
            { text: 'Compare total footprint of each option against baseline and each other; interpret result in Indian context (grid coal.', faded: true, blankAnswer: 'Baseline: Electricity = 400×0.82=328 kg; LPG = 20×2.99=59.8.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_11', title: 'Human Impact on Climate: Pollution and Global Warming',
          scaffold: { problem: 'A 500 MW coal-fired power plant in Chhattisgarh operates at 85% capacity factor.',
            steps: [
            { text: 'Calculate annual energy output: 500 MW × 0.85 × 8760 h = 3,723,000 MWh = 3.723 × 10⁹ kWh.' },
            { text: 'Convert to heat input: 1 kWh = 3.6 MJ, so output = 1.34 × 10¹⁰ MJ.' },
            { text: 'Coal mass required = heat input / calorific value = 3.53 × 10¹⁰ MJ / 22 MJ/kg = 1.60 × 10⁹ kg = 1.60 Mt coal.' },
            { text: 'Carbon mass = coal mass × carbon content = 1.60 Mt × 0.65 = 1.04 Mt C.' },
            { text: 'CO₂ mass = carbon mass × (44/12) × combustion efficiency = 1.04 × (44/12) × 0.98 = 3.72 Mt CO₂/year.', faded: true, blankAnswer: '3.72 million tonnes CO₂ per year.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_2', title: 'Layers of the Atmosphere: Troposphere to Exosphere',
          scaffold: { problem: 'A radiosonde launched from Chennai at 12:00 PM records surface temperature 34°C.',
            steps: [
            { text: 'Identify known values: surface T = 34°C at 0 km; tropopause T = -70°C at 15.5 km.' },
            { text: 'Compute total temperature change: ΔT = -70 - 34 = -104°C over Δz = 15.5 km.' },
            { text: 'Calculate average ELR = -ΔT/Δz = 104/15.5 = 6.7°C/km.' },
            { text: 'Recall dry adiabatic lapse rate (DALR) = 9.8°C/km for unsaturated rising air parcel.' },
            { text: 'Explain difference: ELR is the *actual* environmental profile; DALR is theoretical for a dry parcel.', faded: true, blankAnswer: 'Average ERL = 6.7°C/km. It is lower than DALR (9.8°C/km).' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_geo_ch2_3', title: 'Air Pressure: Horizontal and Vertical Distribution',
          scaffold: { problem: 'A mountaineering team plans to climb from a base camp at 2,000 m (pressure 800 mb) to a summit at 6,000 m.',
            steps: [
            { text: 'Identify the height difference: 6,000 m - 2,000 m = 4,000 m.' },
            { text: 'Recall the approximate pressure lapse rate: 1 mb decrease per 10 m ascent in the lower troposphere.' },
            { text: 'Calculate pressure decrease: 4,000 m ÷ 10 m/mb = 400 mb decrease.' },
            { text: 'Subtract from base camp pressure: 800 mb - 400 mb = 400 mb estimated summit pressure.' },
            { text: 'Interpret: Actual pressure may be higher if the air column is warmer (lower density) or lower if colder; also the lapse.', faded: true, blankAnswer: 'Estimated summit pressure ≈ 400 mb. Actual pressure.' }
            ] } },
        { type: 'case', nodeId: 'c9_geo_ch2_4', title: 'Winds: Causes and Types of Global Wind Systems',
          caseStudy: { intro: 'Notice how a kite flown in your neighborhood always seems to drift in a similar direction day after day, but if you travel to Kerala versus Delhi, the.',
            decisions: [{ prompt: 'State the primary cause of planetary winds and name the three major planetary wind belts.', options: [
                { text: 'Planetary winds are caused by pressure differences between latitudinal pressure belts', outcome: 'Planetary winds are caused by pressure differences between latitudinal pressure belts created.' },
                { text: 'winds are caused by temperature differences alone', outcome: 'Not quite — Students think the "Trade Winds" blow from the equator toward the poles because "trade" implies.', reveals: 'the-trade-winds-blow-from' },
                { text: 'Trade Winds', outcome: 'Not quite — Students think the "Trade Winds" blow from the equator toward the poles because "trade" implies.', reveals: 'the-trade-winds-blow-from' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Filling in an atmosphere pie chart, Meera writes: \'Air is basically all oxygen — that\'s what we breathe — and CO₂ at 0.04% is so tiny it cannot matter for climate.\'',
            decisions: [{ prompt: 'What does the real composition show?', options: [
                { text: 'Nitrogen dominates at ~78%, oxygen is ~21%, argon ~0.93% — oxygen is not even half of air. And 0.04% is not insignificant: CO₂ absorbs infrared where water vapour is transparent, so a trace gas steers the whole climate. Water vapour, meanwhile, is the variable gas driving weather.', outcome: 'This replaces \'we breathe it so it\'s most of air\' with the measured percentages, and shows trace does not mean trivial.' },
                { text: 'Meera is right — since we breathe oxygen, air must be mostly oxygen; filler gases like nitrogen don\'t count.', outcome: 'Breathing uses a minority gas; nitrogen\'s bulk is not filler — it dilutes oxygen enough to prevent runaway combustion and feeds the soil\'s nitrogen cycle.', reveals: 'air-is-mostly-oxygen' },
                { text: 'Water vapour is the biggest gas since it drives all weather — permanent gases are the minor part.', outcome: 'Water vapour tops out near 4% and swings with place and season; the weather-maker is a variable trace, while nitrogen quietly forms four-fifths of the air.', reveals: 'water-vapour-dominates' }
            ] }] } },
        { type: 'case', nodeId: 'c9_geo_ch2_4', title: 'The bigger picture',
          caseStudy: { intro: 'Air is a precise cocktail: ~78% nitrogen, ~21% oxygen, ~1% argon, plus a variable splash of water vapour that runs all our weather. Change the trace gases by a whisker and the climate notices.',
            decisions: [{ prompt: 'What comes next? Atmosphere and Climate · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Atmosphere and Climate · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_geo_ch2_1', difficulty: 'standard',
          question: 'The Earth\'s atmosphere is a mixture of gases held by gravity, consisting.',
          hint: 'Revisit Class 7 node c7_geo_ch02_002 "Atmosphere: Layers and Composition" and Class 9.',
          misconception: 'Students believe "the atmosphere is mostly oxygen because we breathe it" and consequently think nitrogen.',
          parts: [
                { id: 'a', prompt: 'State the approximate percentage by volume of nitrogen, oxygen, and argon in dry air, and name the most abundant variable gas.', answer: 'Nitrogen ≈ 78.08%, Oxygen ≈ 20.95%, Argon ≈ 0.93%',
                  options: ['Nitrogen ≈ 78.08%, Oxygen ≈ 20.95%, Argon ≈ 0.93%', 'the atmosphere is mostly oxygen', 'trace gas', 'insignificant gas'],
                  hint: 'Revisit Class 7 node c7_geo_ch02_002 "Atmosphere: Layers and Composition" and Class 9 Chemistry.',
                  misconception: 'Students believe "the atmosphere is mostly oxygen because we breathe it" and consequently think nitrogen is unimportant.' }
          ],
            remediations: { 'the-atmosphere-is-mostly-oxygen': { steps: ['Show a pie chart of dry air composition; ask students to calculate the O₂:N₂ ratio (≈1:4).', 'Demonstrate a candle burning in pure O₂ (vigorous) vs. air (steady) vs.', 'Use the "bathtub analogy" for CO₂: a tap (emissions) dripping into a large tub (atmosphere) — even a slow drip.', 'Assign a 100-word writing: "Why nitrogen matters to a wheat farmer in Punjab."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "the atmosphere is mostly oxygen because we breathe it" and consequently think nitrogen.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Rising methane concentrations are more dangerous than rising CO₂ because methane traps 28 times more heat per molecule over 100 years."', answer: 'The statement is partially true but misleading',
                  options: ['The statement is partially true but misleading', 'the atmosphere is mostly oxygen', 'trace gas', 'insignificant gas'],
                  hint: 'Revisit Class 7 node c7_geo_ch02_002 "Atmosphere: Layers and Composition" and Class 9 Chemistry.',
                  misconception: 'Students believe "the atmosphere is mostly oxygen because we breathe it" and consequently think nitrogen is unimportant.' }
          ],
            remediations: { 'the-atmosphere-is-mostly-oxygen': { steps: ['Show a pie chart of dry air composition; ask students to calculate the O₂:N₂ ratio (≈1:4).', 'Demonstrate a candle burning in pure O₂ (vigorous) vs. air (steady) vs.', 'Use the "bathtub analogy" for CO₂: a tap (emissions) dripping into a large tub (atmosphere) — even a slow drip.', 'Assign a 100-word writing: "Why nitrogen matters to a wheat farmer in Punjab."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_10', difficulty: 'standard',
          question: 'Carbon footprint is the total amount of greenhouse gases (primarily carbon.',
          hint: 'Revisit c9_geo_ch2_9 (Climate Change: Causes and Evidence) to review greenhouse gas.',
          misconception: 'Students think carbon footprint only includes visible smoke (car exhaust, factory chimneys) and ignore embedded.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Carbon footprint is the total amount of greenhouse gases (primarily carbon dioxide,',
                  options: ['Carbon footprint is the total amount of greenhouse gases (primarily carbon dioxide,', 'The Earth\'s atmosphere is a mixture of gases held by gravity, consisting primarily of', 'Human impact on climate refers to the alteration of Earth\'s atmospheric composition and', 'The atmosphere is divided into five distinct layers—troposphere, stratosphere,'],
                  hint: 'Revisit c9_geo_ch2_9 (Climate Change: Causes and Evidence) to review greenhouse gas sources and the.',
                  misconception: 'Students think carbon footprint only includes visible smoke (car exhaust, factory chimneys) and ignore embedded emissions in food, clothes.' }
          ],
            remediations: { 'carbon-footprint-only-includes-visible': { steps: ['Show a life-cycle diagram of a cotton T-shirt (water, pesticides, transport, energy).', 'Use the "Carbon Footprint of a Sandwich" activity – break down bread, cheese, tomato, transport.', 'Have students log everything they consume for one day and categorise as direct/indirect.', 'Discuss why "invisible" emissions matter using India\'s methane from rice paddies and livestock.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_11', difficulty: 'standard',
          question: 'Human impact on climate refers to the alteration of Earth\'s atmospheric.',
          hint: 'Revisit the greenhouse gas property table in c9_geo_ch2_1 (which gases, sources.',
          misconception: 'Students believe "global warming means everywhere gets hotter by the same amount." They miss that land warms faster.',
          parts: [
                { id: 'a', prompt: 'Using the concept of \'carbon intensity\' (CO₂ emitted per unit GDP), calculate the approximate annual CO₂ emissions from India\'s coal-based electricity sector.', answer: 'Step 1: Convert TWh to MWh: 1,100 TWh = 1,100 × 10⁶ MWh',
                  options: ['Step 1: Convert TWh to MWh: 1,100 TWh = 1,100 × 10⁶ MWh', 'global warming means everywhere gets hotter by the same amount', '"global warming means everywhere gets hotter by the same amount'],
                  hint: 'Revisit the greenhouse gas property table in c9_geo_ch2_1 (which gases, sources, lifetimes) and the.',
                  misconception: 'Students believe "global warming means everywhere gets hotter by the same amount." They miss that land warms faster than oceans, high.' },
                { id: 'b', prompt: 'Compare the impact of two land-use changes on local climate: (i) conversion of Western Ghats evergreen forest to areca nut plantation, (ii) conversion of Thar.', answer: 'Western Ghats conversion disrupts rainfall recycling more severely',
                  options: ['Western Ghats conversion disrupts rainfall recycling more severely', 'solar parks are worse', 'global warming means everywhere gets hotter by the same amount', '"global warming means everywhere gets hotter by the same amount'],
                  hint: 'Revisit the greenhouse gas property table in c9_geo_ch2_1 (which gases, sources, lifetimes) and the.',
                  misconception: 'Students believe "global warming means everywhere gets hotter by the same amount." They miss that land warms faster than oceans, high.' }
          ],
            remediations: { 'global-warming-means-everywhere-gets': { steps: ['Show NASA GISS temperature anomaly maps (1880-present) — highlight faster warming over Indian landmass vs. Indian Ocean.', 'Plot aerosol optical depth (MODIS) over Indo-Gangetic Plain vs.', 'Use a simple energy balance model (online tool) to toggle aerosol forcing on/off — observe how removing aerosols.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_2', difficulty: 'standard',
          question: 'The atmosphere is divided into five distinct layers—troposphere, stratosphere.',
          hint: 'Revisit c7_geo_ch02_002 (Atmosphere: Layers and Composition) and c7_geo_ch02_003.',
          misconception: 'Students believe the atmosphere\'s layers are separated by distinct physical barriers like "ceilings" and that.',
          parts: [
                { id: 'a', prompt: 'Explain why temperature decreases with altitude in the troposphere but increases in the stratosphere, identifying the specific heat source and mechanism.', answer: 'In the troposphere, temperature decreases',
                  options: ['In the troposphere, temperature decreases', 'heat rising from below', 'ceilings'],
                  hint: 'Revisit c7_geo_ch02_002 (Atmosphere: Layers and Composition) and c7_geo_ch02_003 (Temperature.',
                  misconception: 'Students believe the atmosphere\'s layers are separated by distinct physical barriers like "ceilings" and that temperature decreases.' },
                { id: 'b', prompt: 'A weather balloon launched from Mumbai records temperature dropping at 6.5°C per km up to 14 km, then remaining constant for 2 km, then rising at 3°C per km.', answer: '0–14 km: troposphere (lapse rate 6.5°C/km)',
                  options: ['0–14 km: troposphere (lapse rate 6.5°C/km)', 'ceilings'],
                  hint: 'Revisit c7_geo_ch02_002 (Atmosphere: Layers and Composition) and c7_geo_ch02_003 (Temperature.',
                  misconception: 'Students believe the atmosphere\'s layers are separated by distinct physical barriers like "ceilings" and that temperature decreases.' }
          ],
            remediations: { 'the-atmosphere-s-layers-are': { steps: ['Draw a vertical temperature profile graph (temperature on x-axis, altitude on y-axis) using real radiosonde data from.', 'Mark where Mount Everest (8.8 km), commercial jets (10–12 km), weather balloons (30 km), meteors (70 km), ISS (400 km).', 'Explain each kink: tropopause = end of ground-heated air, stratopause = end of ozone heating, mesopause = coldest.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_3', difficulty: 'standard',
          question: 'Air pressure is the force exerted by the weight of the air column above a unit.',
          hint: 'Revisit the concept of "air has weight" and the mercury barometer experiment from Class.',
          misconception: 'Students often believe that the subtropical high-pressure belts are caused solely by "cold air sinking" because the.',
          parts: [
                { id: 'a', prompt: 'Explain why the equatorial region experiences low pressure throughout the year while the subtropical zones (around 30°N/S) have high pressure, even though both.', answer: 'The equatorial low forms',
                  options: ['The equatorial low forms', 'cooling', 'cold air sinking'],
                  hint: 'Revisit the concept of "air has weight" and the mercury barometer experiment from Class 6/7.',
                  misconception: 'Students often believe that the subtropical high-pressure belts are caused solely by "cold air sinking" because the poles are cold.' },
                { id: 'b', prompt: 'A weather station at 1,500 m above sea level records a pressure of 850 mb.', answer: 'Step 1: Height difference = 1,500 m',
                  options: ['Step 1: Height difference = 1,500 m', 'cold air sinking'],
                  hint: 'Revisit the concept of "air has weight" and the mercury barometer experiment from Class 6/7.',
                  misconception: 'Students often believe that the subtropical high-pressure belts are caused solely by "cold air sinking" because the poles are cold.' },
                { id: 'c', prompt: 'Compare the seasonal shift of the Intertropical Convergence Zone (ITCZ) over the Indian subcontinent with its position over the Atlantic Ocean.', answer: 'Over India, the ITCZ shifts to 25°N–30°N in summer',
                  options: ['Over India, the ITCZ shifts to 25°N–30°N in summer', 'cold air sinking'],
                  hint: 'Revisit the concept of "air has weight" and the mercury barometer experiment from Class 6/7.',
                  misconception: 'Students often believe that the subtropical high-pressure belts are caused solely by "cold air sinking" because the poles are cold.' }
          ],
            remediations: { 'the-subtropical-high-pressure-belts': { steps: ['Draw a cross-section of the Hadley cell on the board: rising at equator, poleward flow aloft, sinking at 30°.', 'Use a rotating globe or animation to show Coriolis deflection turning poleward flow into subtropical westerlies aloft.', 'Have students feel the warming of a bicycle pump nozzle during rapid compression to experience adiabatic heating.', 'Plot temperature and pressure data from a radiosonde ascent (available from IMD) to see pressure drop and temperature.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_geo_ch2_4', difficulty: 'standard',
          question: 'Global wind systems are large-scale, persistent wind patterns driven.',
          hint: 'Revisit c9_geo_ch2_3 "Air Pressure: Horizontal and Vertical Distribution" – focus on the.',
          misconception: 'Students think the "Trade Winds" blow from the equator toward the poles because "trade" implies movement of goods from.',
          parts: [
                { id: 'a', prompt: 'A ship at 15°N, 60°W in the Atlantic Ocean records steady winds from the northeast.', answer: 'Step 1: Identify the wind belt at 15°N → Trade Winds (northeasterlies in NH)',
                  options: ['Step 1: Identify the wind belt at 15°N → Trade Winds (northeasterlies in NH)', 'Trade Winds'],
                  hint: 'Revisit c9_geo_ch2_3 "Air Pressure: Horizontal and Vertical Distribution" – focus on the.',
                  misconception: 'Students think the "Trade Winds" blow from the equator toward the poles because "trade" implies movement of goods from tropics to temperate.' },
                { id: 'b', prompt: 'Compare the Hadley Cell and the Ferrel Cell in terms of: (a) latitudinal extent, (b) driving mechanism (thermal vs.', answer: 'latitudinal extent, (',
                  options: ['latitudinal extent, (', 'Trade Winds'],
                  hint: 'Revisit c9_geo_ch2_3 "Air Pressure: Horizontal and Vertical Distribution" – focus on the.',
                  misconception: 'Students think the "Trade Winds" blow from the equator toward the poles because "trade" implies movement of goods from tropics to temperate.' }
          ],
            remediations: { 'the-trade-winds-blow-from': { steps: ['Draw a simple cross-section at 0° longitude showing only the Hadley Cell: label equator (hot, rising, low pressure).', 'Draw surface arrows from 30° toward equator.', 'Apply Coriolis: in NH, arrow pointing south gets pushed right → becomes NE arrow.', 'Label these "Northeast Trades" and "Southeast Trades".'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
