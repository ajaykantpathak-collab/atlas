import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch22_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch22_p1: SimDef = {
    id: 'v3_c11_geo_ch22_p1',
    title: 'Introduction to Maps · Part 1/2',
    subtitle: 'Read a map as a set of deliberate trade-offs, not a shrunken photograph.',
    classLevel: 11, subject: 'geography', topic: 'Introduction to Maps · Part 1/2',
    chapters: ['c11_geo_ch22'],
    nodeIds: ['c11_geo_cbse_22_001', 'c11_geo_cbse_22_002', 'c11_geo_cbse_22_003', 'c11_geo_cbse_22_004', 'c11_geo_cbse_22_005', 'c11_geo_cbse_22_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cartographer choosing the right lie for the job', intro: 'Your phone slides from street to planet in one pinch — two thousand years of projection problems solved quietly underneath.', goal: 'Identify a map\'s essential elements and choose scale and projection by purpose.' },
    discovery: {
        question: 'A 1:10,000 map packs in far more detail — so it\'s obviously the right map for a cross-country drive?',
        options: ['No — large scale means small coverage; a road trip needs a small-scale sheet that shows the whole route', 'Yes — more detail is always better', 'Yes — you can just tile forty sheets together', 'No — large-scale maps are only for aeroplanes'],
        answer: 'No — large scale means small coverage; a road trip needs a small-scale sheet that shows the whole route',
        hook: 'Mercator blew Greenland up to South America\'s size — yet sailors swore by it, because a steady compass bearing draws as a straight line. Every map trades one truth for another.',
    },
    teaching: [
        { title: 'Maps: Definition, Types and Essential Elements', text: 'A map is a scaled, symbolized, and generalized representation of the whole or a part of the Earth\'s surface on a flat plane, showing selected physical and human features using a specific projection.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_22_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Convert an RF into ground kilometres, then defend which of the three scale forms survives a photocopier\'s resizing.',
        labels: ['Maps: Definition, Types', 'History of Map Making', 'Map Scale: Statement, Representative', 'Map Symbols and Conventional', 'Map Reading: Direction, Distance', 'Coordinate Systems: Latitude, Longitude'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_22_001', title: 'Maps: Definition, Types and Essential Elements',
          scaffold: { problem: 'A topographic map of a part of the Western Ghats has an RF of 1:25,000.',
            steps: [
            { text: 'Identify the given RF = 1:25,000, meaning 1 unit on map = 25,000 units on ground.' },
            { text: 'Map distance = 6.4 cm. Ground distance in cm = 6.4 × 25,000 = 160,000 cm.' },
            { text: 'Convert ground distance to kilometres: 160,000 cm ÷ 100,000 = 1.6 km.' },
            { text: 'For Statement of Scale: 1 cm on map represents 25,000 cm on ground. 25,000 cm = 250 m = 0.25 km.' },
            { text: 'Verify: 6.4 cm × 0.25 km/cm = 1.6 km. Consistent.', faded: true, blankAnswer: 'Ground distance = 1.6 km. Statement of Scale: 1.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_22_003', title: 'Map Scale: Statement, Representative Fraction and Graphical Scale',
          scaffold: { problem: 'A topographical sheet of the Sundarbans delta has R.F. 1:50,000.',
            steps: [
            { text: 'Identify given R.F. = 1:50,000, meaning 1 unit on map = 50,000 same units on ground.' },
            { text: 'Convert map measurement to ground distance in same unit: 6.8 cm × 50,000 = 340,000 cm.' },
            { text: 'Convert ground distance to kilometres: 340,000 cm ÷ 100,000 (cm per km) = 3.4 km.' },
            { text: 'For the second map (R.F. 1:250,000), use the actual ground distance (340,000 cm) to find new map distance: 340,000.' },
            { text: 'Verify consistency: 1:250,000 is 5× smaller scale than 1:50,000 (250,000/50,000 = 5), so map distance should be 5.' },
            { text: 'Interpret geographically: The watchtowers are 3.4 km apart on ground; on the larger-scale sheet (1:50,000) they\'re 6.8.', faded: true, blankAnswer: 'Actual ground distance = 3.4 km. Distance on 1:250,000 map.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_22_004', title: 'Map Symbols and Conventional Signs (Colour and Shape Codes)',
          caseStudy: { intro: 'Begin by showing a 1:50,000 topographical map extract of your local area (e.g., your district headquarters) and ask students to locate their school using only.',
            decisions: [{ prompt: 'On a Survey of India 1:50,000 topographical map, what does a **solid blue circle** of 0.5 mm diameter represent, and how does it differ.', options: [
                { text: 'A solid blue circle represents a **well or tube well** (point feature – groundwater', outcome: 'A solid blue circle represents a **well or tube well** (point feature – groundwater access), while.' },
                { text: 'blue = river', outcome: 'Not quite — Students believe **colour alone determines the feature** (e.g., "blue = river", "green = forest".', reveals: 'colour-alone-determines-the-feature' },
                { text: 'green = forest', outcome: 'Not quite — Students believe **colour alone determines the feature** (e.g., "blue = river", "green = forest".', reveals: 'colour-alone-determines-the-feature' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_22_005', title: 'Map Reading: Direction, Distance and Relief Interpretation',
          scaffold: { problem: 'On a 1:50,000 topographic sheet, a jeep track runs from point P (spot height 1,200 m) to point Q (spot height 1,560 m).',
            steps: [
            { text: 'Identify the vertical interval (VI) = 1,560 m - 1,200 m = 360 m.' },
            { text: 'Convert map distance to ground distance using RF: 6.4 cm × 50,000 = 320,000 cm = 3.2 km (Horizontal Equivalent, HE).' },
            { text: 'Compute gradient = VI / HE = 360 m / 3,200 m = 0.1125 = 1 : 8.89 (approx 1 in 9).' },
            { text: 'Interpret: a gradient of 1:9 means for every 9 m horizontal travel, elevation changes by 1 m — a moderate slope.' },
            { text: 'Verify: 3.2 km ground distance with 360 m climb is realistic for a mountain jeep track.', faded: true, blankAnswer: 'Average gradient = 1 : 8.9 (or 11.25%); Ground length.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_22_006', title: 'Coordinate Systems: Latitude, Longitude and Grid References',
          scaffold: { problem: 'A GPS receiver at a weather station in Jaipur shows coordinates: 26°55\'12"N, 75°47\'24"E (WGS84). Convert to Decimal Degrees (DD).',
            steps: [
            { text: 'Convert DMS to DD: Latitude = 26 + 55/60 + 12/3600 = 26.9200°N. Longitude = 75 + 47/60 + 24/3600 = 75.7900°E.' },
            { text: 'Calculate time difference from GMT: Longitude = 75.79°E → Time ahead = 75.79 / 15 = 5.0527 hours = 5 hours 3 minutes 10.' },
            { text: 'LMT = GMT + 5h 03m 10s = 17:03:10 (5:03 PM).' },
            { text: 'Length of 1° longitude at 26.92°N = 111.32 km × cos(26.92°) = 111.32 × 0.8916 = 99.25 km.' },
            { text: 'Verify: Jaipur\'s IST is UTC+5:30 (based on 82.5°E). LMT at 75.79°E is ~27 minutes behind IST (since 82.5 - 75.79.', faded: true, blankAnswer: 'DD: 26.9200°N, 75.7900°E. LMT at GMT 12:00 = 17:03:10. 1°.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_22_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is making a poster map of crop patterns across the world. A teammate enlarges a photocopied atlas map and measures distances with the printed statement \'1 cm = 100 km\'. She also picks the Mercator projection because \'it\'s the world map — the standard.\'',
            decisions: [{ prompt: 'What two cartographic errors need fixing?', options: [
                { text: 'Fix scale first: only a graphical (bar) scale survives photocopy enlargement — the RF and statement scale are tied to the original print size, so her measurements are off. Then the projection: Mercator was built in 1569 for constant-bearing navigation, and its conformal property grotesquely inflates polar areas — for comparing crop regions by area, it\'s the wrong tool.', outcome: 'She learns the rule: every map is a purpose-driven compromise — match scale type to reproduction, and projection to the question being asked.' },
                { text: 'Let her measure — a scale is a scale, however the map is reproduced.', outcome: 'RF and statement scales encode the original sheet\'s size; enlarge the print and the numbers lie — only the drawn bar stretches with the image.', reveals: 'scale-survives-photocopy' },
                { text: 'Keep Mercator — it\'s the most accurate world map, which is why Google and atlases use it.', outcome: 'Mercator preserves angles for navigation, not areas; for thematic comparison of regions it distorts exactly the property being compared.', reveals: 'mercator-is-universal-standard' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_22_006', title: 'The bigger picture',
          caseStudy: { intro: 'A map is a selective model of reality — scale, projection and legend are the choices that decide what it can honestly say.',
            decisions: [{ prompt: 'What comes next? Introduction to Maps · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Maps · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_001', difficulty: 'standard',
          question: 'A map is a scaled, symbolized, and generalized representation of the whole or.',
          hint: 'If stuck, revisit Class 6-8 mathematics chapters on ratio, proportion, and unit.',
          misconception: 'Students often believe that "scale" on a map is only the scale bar (graphical scale) and do not realize that the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A map is a scaled, symbolized, and generalized representation of the whole or a part of',
                  options: ['A map is a scaled, symbolized, and generalized representation of the whole or a part of', 'The history of map making traces the evolution of cartography from ancient symbolic', 'Map scale is the precise ratio or relationship between a distance measured on a map and', 'Map symbols and conventional signs are standardized graphical representations (using'],
                  hint: 'If stuck, revisit Class 6-8 mathematics chapters on ratio, proportion, and unit conversion, and.',
                  misconception: 'Students often believe that "scale" on a map is only the scale bar (graphical scale) and do not realize that the Representative Fraction.' }
          ],
            remediations: { 'scale-on-a-map-is': { steps: ['To remediate, give the student three versions of the same map: original, enlarged 150%, reduced 75%.', 'Ask them to measure a known distance (e.g., between two cities) using the RF, statement, and graphical scale on each.', 'They will find that RF and statement give wrong results on enlarged/reduced copies, while the graphical scale still.', 'Then have them write a one-sentence rule: "Only graphical scales survive reproduction; RF and statement scales must.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_002', difficulty: 'standard',
          question: 'The history of map making traces the evolution of cartography from ancient.',
          hint: 'Revisit c8_geo_ch2_1 (Earth as an Oblate Spheroid) and c8_geo_ch2_2 (Map Projections.',
          misconception: 'Students treat "Mercator projection" as *the* world map, unaware that its cylindrical conformal property serves.',
          parts: [
                { id: 'a', prompt: 'Why did portolan charts of the 13th–16th centuries use rhumb lines (lines of constant bearing) instead of a latitude/longitude grid, and what navigational.', answer: 'Portolan charts served Mediterranean pilots sailing by compass course',
                  options: ['Portolan charts served Mediterranean pilots sailing by compass course', 'lack of latitude knowledge'],
                  hint: 'Revisit c8_geo_ch2_1 (Earth as an Oblate Spheroid) and c8_geo_ch2_2 (Map Projections: Mercator and.',
                  misconception: 'Students treat "Mercator projection" as *the* world map, unaware that its cylindrical conformal property serves *navigation* but makes.' },
                { id: 'b', prompt: 'A 1569 Mercator world map shows Greenland larger than South America.', answer: 'sec φ = 2 → φ = 60° (since cos 60° = 0.5)',
                  options: ['sec φ = 2 → φ = 60° (since cos 60° = 0.5)', 'area distortion is bad'],
                  hint: 'Revisit c8_geo_ch2_1 (Earth as an Oblate Spheroid) and c8_geo_ch2_2 (Map Projections: Mercator and.',
                  misconception: 'Students treat "Mercator projection" as *the* world map, unaware that its cylindrical conformal property serves *navigation* but makes.' }
          ],
            remediations: { 'students-treat-mercator-projection-as': { steps: ['Draw three 10 cm circles on paper; label them "Ptolemy (conic)", "Mercator (cylindrical)", "Equal-area (Mollweide)".', 'Trace India\'s outline on each using a printed reference; measure India\'s area on each tracing with graph paper.', 'Record ratios — students *see* area distortion differences.', 'Overlay a rhumb line (straight on Mercator, curved on others) and a great-circle route (curved on Mercator, straight.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_003', difficulty: 'standard',
          question: 'Map scale is the precise ratio or relationship between a distance measured on.',
          hint: 'If stuck on conversions, revisit Class 6 Maths Chapter 8 (Decimals) and Class 7 Maths.',
          misconception: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.',
          parts: [
                { id: 'a', prompt: 'A map has a Statement of Scale: "2 cm represents 1 km". If this map is reduced to half its original size during photocopying, what happens to the accuracy.', answer: 'The Statement of Scale and R.F',
                  options: ['The Statement of Scale and R.F', 'all three become wrong', 'only R.F', '(like a world map)'],
                  hint: 'If stuck on conversions, revisit Class 6 Maths Chapter 8 (Decimals) and Class 7 Maths Chapter 8.',
                  misconception: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.' },
                { id: 'b', prompt: 'Convert the Statement of Scale "3 cm represents 1.5 km" into Representative Fraction. Show all steps including unit conversions.', answer: 'Step 1: Write the statement as a ratio: 3 cm (map) : 1.5 km (ground)',
                  options: ['Step 1: Write the statement as a ratio: 3 cm (map) : 1.5 km (ground)', 'large scale', 'covers a large area'],
                  hint: 'If stuck on conversions, revisit Class 6 Maths Chapter 8 (Decimals) and Class 7 Maths Chapter 8.',
                  misconception: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.' },
                { id: 'c', prompt: 'Compare the three scale methods for a map that will be: (a) printed in a textbook and never resized, (b) used as a base map for GIS digitization where users.', answer: 'printed in a textbook and never resized, (',
                  options: ['printed in a textbook and never resized, (', 'large scale', 'covers a large area'],
                  hint: 'If stuck on conversions, revisit Class 6 Maths Chapter 8 (Decimals) and Class 7 Maths Chapter 8.',
                  misconception: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.' }
          ],
            remediations: { 'large-scale-means-covers-a': { steps: ['Write two fractions: 1/10,000 and 1/10,000,000. Ask which is numerically larger.', 'Relate to map detail — the larger fraction (1/10,000) shows more detail (individual buildings), the smaller fraction.', 'Create a flashcard: "Large Scale = Large Fraction = Small Area = High Detail" and "Small Scale = Small Fraction = Large.', 'Practice classifying 5 R.F.s from Indian topographical sheets (1:50,000, 1:250,000) and atlas maps (1:5,000,000.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "For a world map showing global migration patterns, an R.F.', answer: 'The claim is correct',
                  options: ['The claim is correct', 'large scale = large area', 'large scale', 'covers a large area'],
                  hint: 'If stuck on conversions, revisit Class 6 Maths Chapter 8 (Decimals) and Class 7 Maths Chapter 8.',
                  misconception: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.' }
          ],
            remediations: { 'large-scale-means-covers-a': { steps: ['Write two fractions: 1/10,000 and 1/10,000,000. Ask which is numerically larger.', 'Relate to map detail — the larger fraction (1/10,000) shows more detail (individual buildings), the smaller fraction.', 'Create a flashcard: "Large Scale = Large Fraction = Small Area = High Detail" and "Small Scale = Small Fraction = Large.', 'Practice classifying 5 R.F.s from Indian topographical sheets (1:50,000, 1:250,000) and atlas maps (1:5,000,000.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_004', difficulty: 'standard',
          question: 'Map symbols and conventional signs are standardized graphical representations.',
          hint: 'If symbols look like "random shapes", revisit **c8_geo_ch2_4 (Physical Maps: Reading.',
          misconception: 'Students believe **colour alone determines the feature** (e.g., "blue = river", "green = forest", "brown = mountain").',
          parts: [
                { id: 'a', prompt: 'Given a map extract where a **red square with a flag** and a **red square with a cross** appear 2 cm apart at scale 1:50,000, calculate the ground distance.', answer: '**Calculation:** 2 cm × 50,000 = 100,000 cm = **1 km ground distance**',
                  options: ['**Calculation:** 2 cm × 50,000 = 100,000 cm = **1 km ground distance**', 'forgets to convert using RF', 'blue = river', 'green = forest'],
                  hint: 'If symbols look like "random shapes", revisit **c8_geo_ch2_4 (Physical Maps: Reading Colours)** and.',
                  misconception: 'Students believe **colour alone determines the feature** (e.g., "blue = river", "green = forest", "brown = mountain") and ignore.' }
          ],
            remediations: { 'colour-alone-determines-the-feature': { steps: ['Give the student a **colour-only map** (all symbols in black) and a **shape-only map** (all symbols in outline) of the.', 'Use a **symbol sorting card game**: 30 cards with symbols; sort first by colour (7 piles), then by shape within each.', 'Field exercise – walk 500 m around school, sketch 10 features using *only* standard symbols; peer-review using Survey.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_005', difficulty: 'standard',
          question: 'Map reading is the systematic interpretation of topographic maps to determine.',
          hint: 'Revisit c11_geo_cbse_22_003 (Map Scale) for RF conversions and c11_geo_cbse_22_004 (Map.',
          misconception: 'Students often believe that contour lines can cross or merge to form a cliff, but in reality contour lines never cross.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Map reading is the systematic interpretation of topographic maps to determine direction',
                  options: ['Map reading is the systematic interpretation of topographic maps to determine direction', 'A map is a scaled, symbolized, and generalized representation of the whole or a part of', 'The history of map making traces the evolution of cartography from ancient symbolic', 'Map scale is the precise ratio or relationship between a distance measured on a map and'],
                  hint: 'Revisit c11_geo_cbse_22_003 (Map Scale) for RF conversions and c11_geo_cbse_22_004 (Map Symbols).',
                  misconception: 'Students often believe that contour lines can cross or merge to form a cliff, but in reality contour lines never cross (except.' }
          ],
            remediations: { 'contour-lines-can-cross-or': { steps: ['Take a 1:50,000 topographic sheet of a familiar area (e.g., your district).', 'Locate the contour interval in the margin (usually 20 m).', 'Trace a few contour lines with a pencil and label their elevations using nearby spot heights.', 'Practice measuring straight-line distance between two points using a divider and the graphical scale; then measure.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_006', difficulty: 'standard',
          question: 'A coordinate system is a standardized framework that uses angular measurements.',
          hint: 'Review Class 7 Geography Chapter 1 (India\'s Location) for lat/long basics and Class 11.',
          misconception: 'Students treat latitude/longitude and grid references as interchangeable "coordinates" and assume 1° longitude = 111.',
          parts: [
                { id: 'a', prompt: 'Why does the linear distance represented by 1° of longitude decrease as you move from the Equator toward the poles, while 1° of latitude remains nearly.', answer: 'Lines of longitude (meridians) are great circles that converge at the poles',
                  options: ['Lines of longitude (meridians) are great circles that converge at the poles', 'latitude lines also converge'],
                  hint: 'Review Class 7 Geography Chapter 1 (India\'s Location) for lat/long basics and Class 11 Practical.',
                  misconception: 'Students treat latitude/longitude and grid references as interchangeable "coordinates" and assume 1° longitude = 111 km everywhere.' },
                { id: 'b', prompt: 'Two cities, A (20°N, 75°E) and B (20°N, 85°E), lie on the same parallel.', answer: 'The claim is false',
                  options: ['The claim is false', 'parallel is shortest'],
                  hint: 'Review Class 7 Geography Chapter 1 (India\'s Location) for lat/long basics and Class 11 Practical.',
                  misconception: 'Students treat latitude/longitude and grid references as interchangeable "coordinates" and assume 1° longitude = 111 km everywhere.' }
          ],
            remediations: { 'students-treat-latitude-longitude-and': { steps: ['**Datum/Projection Confusion**: Use a transparency overlay: print a WGS84 lat/long graticule and an Everest Polyconic.', 'Overlay on a light table — the graticule curves, the grid is square, and they don\'t align perfectly.', 'This visualizes the datum shift and projection distortion.', '**Grid Reference Order**: Practice the "along the corridor, up the stairs" mnemonic with a physical 1:50,000 sheet.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
