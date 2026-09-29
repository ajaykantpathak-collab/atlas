import type { SimDef } from '../../engine/types';
import C11_GeographyMapProjectionsSim from '../../../simulations/c6_12/C11_GeographyMapProjectionsSim';

/** v3 wrapped master — C11_GeographyMapProjectionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographymapprojectionssim: SimDef = {
    id: 'v3w_c11_geographymapprojectionssim',
    title: 'Maps: Definition, Types and Essential Elements',
    subtitle: 'This node covers the definition of a map, its essential elements (title, scale,.',
    classLevel: 11, subject: 'geography', topic: 'Maps: Definition, Types and Essential Elements',
    chapters: [],
    nodeIds: ['c11_geo_cbse_22_001', 'c11_geo_cbse_22_002', 'c11_geo_cbse_22_003', 'c11_geo_cbse_22_005', 'c11_geo_cbse_22_006', 'c11_geo_cbse_22_007', 'c11_geo_cbse_22_008', 'c11_geo_cbse_23_002', 'c11_geo_cbse_23_004', 'c11_geo_cbse_23_005', 'c11_geo_cbse_23_006', 'c11_geo_cbse_23_007', 'c11_geo_cbse_23_008', 'c11_geo_cbse_23_009', 'c11_geo_cbse_15_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Begin by showing students a familiar object: a Google Maps screenshot of their school locality on a phone.', goal: 'Master Maps: Definition, Types and Essential Elements.' },
    discovery: {
        question: 'A map has a Statement of Scale: "2 cm represents 1 km". If this map is reduced to half its original size during photocopying, what happens to the accuracy of.',
        options: ['The Statement of Scale and R.F', 'all three become wrong', 'only R.F'],
        answer: 'The Statement of Scale and R.F',
        hook: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.',
    },
    teaching: [
        { title: 'A map is a scaled, symbolized, and.', text: 'A map is a scaled, symbolized, and generalized representation of the whole or a part of the Earth\'s surface on a flat plane, showing selected physical and human features using a specific projection.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_geo_cbse_22_001', title: 'A map is a scaled, symbolized, and.',
          scaffold: { problem: 'A topographic map of a part of the Western Ghats has an RF of 1:25,000.',
            steps: [
            { text: 'Identify the given RF = 1:25,000, meaning 1 unit on map = 25,000 units on ground.' },
            { text: 'Map distance = 6.4 cm. Ground distance in cm = 6.4 × 25,000 = 160,000 cm.' },
            { text: 'Convert ground distance to kilometres: 160,000 cm ÷ 100,000 = 1.6 km.' },
            { text: 'For Statement of Scale: 1 cm on map represents 25,000 cm on ground. 25,000 cm = 250 m = 0.25 km.' },
            { text: 'Verify: 6.4 cm × 0.25 km/cm = 1.6 km. Consistent.', faded: true, blankAnswer: 'Ground distance = 1.6 km. Statement of Scale: 1 cm.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_22_002', title: 'The history of map making traces the.',
          scaffold: { problem: 'A Class 11 student claims: "Ptolemy\'s map was \'wrong\' because he underestimated Earth\'s circumference and placed India too far east." Using.',
            steps: [
            { text: 'Identify the two distinct errors — circumference (Eratosthenes ~39,690 km vs Ptolemy ~28,800 km) and longitudinal.' },
            { text: 'Recognise Ptolemy *adopted* Posidonius/Strabo\'s smaller circumference (not his own measurement) and *extended* Eurasia.' },
            { text: 'Assess impact: smaller circumference + overextended Eurasia → Atlantic Ocean narrower on map → Columbus\'s belief that.' },
            { text: 'Judge "wrongness": Ptolemy\'s *method* (coordinate grid, conic projection, gazetteer of 8,000 places) was revolutionary;.' },
            { text: 'Synthesise: The claim confuses *data limitations* with *conceptual failure*.' },
            { text: 'Conclude: Historical evaluation must distinguish *structural innovation* from *input accuracy* — a principle still.', faded: true, blankAnswer: 'Ptolemy\'s *Geographia* introduced the latitude/longitude.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_22_003', title: 'Map scale is the precise ratio or.',
          scaffold: { problem: 'A topographical sheet of the Sundarbans delta has R.F. 1:50,000.',
            steps: [
            { text: 'Identify given R.F. = 1:50,000, meaning 1 unit on map = 50,000 same units on ground.' },
            { text: 'Convert map measurement to ground distance in same unit: 6.8 cm × 50,000 = 340,000 cm.' },
            { text: 'Convert ground distance to kilometres: 340,000 cm ÷ 100,000 (cm per km) = 3.4 km.' },
            { text: 'For the second map (R.F. 1:250,000), use the actual ground distance (340,000 cm) to find new map distance: 340,000 cm ÷.' },
            { text: 'Verify consistency: 1:250,000 is 5× smaller scale than 1:50,000 (250,000/50,000 = 5), so map distance should be 5×.' },
            { text: 'Interpret geographically: The watchtowers are 3.4 km apart on ground; on the larger-scale sheet (1:50,000) they\'re 6.8.', faded: true, blankAnswer: 'Actual ground distance = 3.4 km. Distance on 1:250,000 map.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_22_005', title: 'Map reading is the systematic.',
          scaffold: { problem: 'On a 1:50,000 topographic sheet, a jeep track runs from point P (spot height 1,200 m) to point Q (spot height 1,560 m).',
            steps: [
            { text: 'Identify the vertical interval (VI) = 1,560 m - 1,200 m = 360 m.' },
            { text: 'Convert map distance to ground distance using RF: 6.4 cm × 50,000 = 320,000 cm = 3.2 km (Horizontal Equivalent, HE).' },
            { text: 'Compute gradient = VI / HE = 360 m / 3,200 m = 0.1125 = 1 : 8.89 (approx 1 in 9).' },
            { text: 'Interpret: a gradient of 1:9 means for every 9 m horizontal travel, elevation changes by 1 m — a moderate slope.' },
            { text: 'Verify: 3.2 km ground distance with 360 m climb is realistic for a mountain jeep track.', faded: true, blankAnswer: 'Average gradient = 1 : 8.9 (or 11.25%); Ground length of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_22_006', title: 'A coordinate system is a standardized.',
          scaffold: { problem: 'A GPS receiver at a weather station in Jaipur shows coordinates: 26°55\'12"N, 75°47\'24"E (WGS84). Convert to Decimal Degrees (DD).',
            steps: [
            { text: 'Convert DMS to DD: Latitude = 26 + 55/60 + 12/3600 = 26.9200°N. Longitude = 75 + 47/60 + 24/3600 = 75.7900°E.' },
            { text: 'Calculate time difference from GMT: Longitude = 75.79°E → Time ahead = 75.79 / 15 = 5.0527 hours = 5 hours 3 minutes 10.' },
            { text: 'LMT = GMT + 5h 03m 10s = 17:03:10 (5:03 PM).' },
            { text: 'Length of 1° longitude at 26.92°N = 111.32 km × cos(26.92°) = 111.32 × 0.8916 = 99.25 km.' },
            { text: 'Verify: Jaipur\'s IST is UTC+5:30 (based on 82.5°E). LMT at 75.79°E is ~27 minutes behind IST (since 82.5 - 75.79 =.', faded: true, blankAnswer: 'DD: 26.9200°N, 75.7900°E. LMT at GMT 12:00 = 17:03:10. 1°.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_22_007', title: 'Map projection is the systematic.',
          scaffold: { problem: 'A cylindrical equal-area projection is defined by x = R(λ - λ₀), y = R sin φ.',
            steps: [
            { text: 'Compute partial derivatives of x and y with respect to φ and λ to get the Jacobian matrix of the transformation.' },
            { text: 'Calculate the first fundamental form coefficients: E = (∂x/∂φ)² + (∂y/∂φ)², F = (∂x/∂φ)(∂x/∂λ) + (∂y/∂φ)(∂y/∂λ), G =.' },
            { text: 'For this projection: ∂x/∂φ = 0, ∂x/∂λ = R, ∂y/∂φ = R cos φ, ∂y/∂λ = 0. So E = R² cos² φ, F = 0, G = R².' },
            { text: 'Meridional scale factor h = √(E/G) = √(R² cos² φ / R²) = cos φ. Parallel scale factor k = √(G/E) = 1/cos φ = sec φ.' },
            { text: 'Check area preservation: h × k = cos φ × sec φ = 1 → Equal-area property satisfied everywhere.' },
            { text: 'Check shape preservation: h = k only when cos φ = sec φ → cos² φ = 1 → φ = 0° (equator).', faded: true, blankAnswer: 'The projection is equal-area (h × k = 1 everywhere) but.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_geo_cbse_22_002', title: 'Identify each idea',
          dissect: { specimen: 'Maps: Definition, Types and Essential Elements', spots: [
            { id: 's1', label: 'A map is a scaled', prompt: 'Which idea is this? — A map is a scaled, symbolized, and generalized representation of the whole or a part of.', answer: 'A map is a scaled', options: ['A map is a scaled', 'The history of map making', 'Map scale is the precise', 'Map reading is the systematic'] },
            { id: 's2', label: 'The history of map making', prompt: 'Which idea is this? — The history of map making traces the evolution of cartography from ancient symbolic.', answer: 'The history of map making', options: ['The history of map making', 'A map is a scaled', 'Map scale is the precise', 'Map reading is the systematic'] },
            { id: 's3', label: 'Map scale is the precise', prompt: 'Which idea is this? — Map scale is the precise ratio or relationship between a distance measured on a map and.', answer: 'Map scale is the precise', options: ['Map scale is the precise', 'A map is a scaled', 'The history of map making', 'Map reading is the systematic'] },
            { id: 's4', label: 'Map reading is the systematic', prompt: 'Which idea is this? — Map reading is the systematic interpretation of topographic maps to determine direction.', answer: 'Map reading is the systematic', options: ['Map reading is the systematic', 'A map is a scaled', 'The history of map making', 'Map scale is the precise'] },
            { id: 's5', label: 'A coordinate system is a', prompt: 'Which idea is this? — A coordinate system is a standardized framework that uses angular measurements (latitude.', answer: 'A coordinate system is a', options: ['A coordinate system is a', 'A map is a scaled', 'The history of map making', 'Map scale is the precise'] },
            { id: 's6', label: 'Map projection is the systematic', prompt: 'Which idea is this? — Map projection is the systematic transformation of the Earth\'s three-dimensional curved.', answer: 'Map projection is the systematic', options: ['Map projection is the systematic', 'A map is a scaled', 'The history of map making', 'Map scale is the precise'] }
          ] } }
    ],
    explore: { component: C11_GeographyMapProjectionsSim, prompt: 'Explore the interactive — Maps: Definition, Types and Essential Elements' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_001', difficulty: 'standard',
          question: 'A map is a scaled, symbolized, and generalized representation of the whole or a.',
          hint: 'If stuck, revisit Class 6-8 mathematics chapters on ratio, proportion, and unit.',
          misconception: 'Students often believe that "scale" on a map is only the scale bar (graphical scale) and do not realize that the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A map is a scaled, symbolized, and generalized representation of the whole or a part of',
                  options: ['A map is a scaled, symbolized, and generalized representation of the whole or a part of', 'The history of map making traces the evolution of cartography from ancient symbolic', 'Map scale is the precise ratio or relationship between a distance measured on a map and', 'Map reading is the systematic interpretation of topographic maps to determine direction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "scale" on a map is only the scale bar (graphical scale) and do not realize that the Representative Fraction.' }
          ],
            remediations: { 'scale-on-a-map-is': { steps: ['To remediate, give the student three versions of the same map: original, enlarged 150%, reduced 75%.', 'Ask them to measure a known distance (e.g., between two cities) using the RF, statement, and graphical scale on each.', 'They will find that RF and statement give wrong results on enlarged/reduced copies, while the graphical scale still.', 'Then have them write a one-sentence rule: "Only graphical scales survive reproduction; RF and statement scales must be.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_002', difficulty: 'standard',
          question: 'The history of map making traces the evolution of cartography from ancient.',
          hint: 'Revisit c8_geo_ch2_1 (Earth as an Oblate Spheroid) and c8_geo_ch2_2 (Map Projections:.',
          misconception: 'Students treat "Mercator projection" as *the* world map, unaware that its cylindrical conformal property serves.',
          parts: [
                { id: 'a', prompt: 'Why did portolan charts of the 13th–16th centuries use rhumb lines (lines of constant bearing) instead of a latitude/longitude grid, and what navigational.', answer: 'Portolan charts served Mediterranean pilots sailing by compass course',
                  options: ['Portolan charts served Mediterranean pilots sailing by compass course', 'lack of latitude knowledge'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Mercator projection" as *the* world map, unaware that its cylindrical conformal property serves *navigation* but makes it.' },
                { id: 'b', prompt: 'A 1569 Mercator world map shows Greenland larger than South America.', answer: 'sec φ = 2 → φ = 60° (since cos 60° = 0.5)',
                  options: ['sec φ = 2 → φ = 60° (since cos 60° = 0.5)', 'area distortion is bad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat "Mercator projection" as *the* world map, unaware that its cylindrical conformal property serves *navigation* but makes it.' }
          ],
            remediations: { 'students-treat-mercator-projection-as': { steps: ['Draw three 10 cm circles on paper; label them "Ptolemy (conic)", "Mercator (cylindrical)", "Equal-area (Mollweide)".', 'Trace India\'s outline on each using a printed reference; measure India\'s area on each tracing with graph paper.', 'Record ratios — students *see* area distortion differences.', 'Overlay a rhumb line (straight on Mercator, curved on others) and a great-circle route (curved on Mercator, straight on.', 'Discuss: "Which projection would *you* choose for (a) sailing Mumbai–Dubai, (b) mapping crop distribution, (c) planning.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_003', difficulty: 'standard',
          question: 'Map scale is the precise ratio or relationship between a distance measured on a.',
          hint: 'If stuck on conversions, revisit Class 6 Maths Chapter 8 (Decimals) and Class 7 Maths.',
          misconception: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.',
          parts: [
                { id: 'a', prompt: 'A map has a Statement of Scale: "2 cm represents 1 km". If this map is reduced to half its original size during photocopying, what happens to the accuracy of.', answer: 'The Statement of Scale and R.F',
                  options: ['The Statement of Scale and R.F', 'all three become wrong', 'only R.F'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.' },
                { id: 'b', prompt: 'Convert the Statement of Scale "3 cm represents 1.5 km" into Representative Fraction. Show all steps including unit conversions.', answer: 'Step 1: Write the statement as a ratio: 3 cm (map) : 1.5 km (ground)',
                  options: ['Step 1: Write the statement as a ratio: 3 cm (map) : 1.5 km (ground)', 'large scale', 'covers a large area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.' },
                { id: 'c', prompt: 'Compare the three scale methods for a map that will be: (a) printed in a textbook and never resized, (b) used as a base map for GIS digitization where users.', answer: 'printed in a textbook and never resized, (',
                  options: ['printed in a textbook and never resized, (', 'large scale', 'covers a large area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.' }
          ],
            remediations: { 'large-scale-means-covers-a': { steps: ['Write two fractions: 1/10,000 and 1/10,000,000. Ask which is numerically larger.', 'Relate to map detail — the larger fraction (1/10,000) shows more detail (individual buildings), the smaller fraction.', 'Create a flashcard: "Large Scale = Large Fraction = Small Area = High Detail" and "Small Scale = Small Fraction = Large.', 'Practice classifying 5 R.F.s from Indian topographical sheets (1:50,000, 1:250,000) and atlas maps (1:5,000,000,.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "For a world map showing global migration patterns, an R.F.', answer: 'The claim is correct',
                  options: ['The claim is correct', 'large scale = large area', 'large scale', 'covers a large area'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "large scale" means "covers a large area" (like a world map) because the word "large" suggests big.' }
          ],
            remediations: { 'large-scale-means-covers-a': { steps: ['Write two fractions: 1/10,000 and 1/10,000,000. Ask which is numerically larger.', 'Relate to map detail — the larger fraction (1/10,000) shows more detail (individual buildings), the smaller fraction.', 'Create a flashcard: "Large Scale = Large Fraction = Small Area = High Detail" and "Small Scale = Small Fraction = Large.', 'Practice classifying 5 R.F.s from Indian topographical sheets (1:50,000, 1:250,000) and atlas maps (1:5,000,000,.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_005', difficulty: 'standard',
          question: 'Map reading is the systematic interpretation of topographic maps to determine.',
          hint: 'Revisit c11_geo_cbse_22_003 (Map Scale) for RF conversions and c11_geo_cbse_22_004 (Map.',
          misconception: 'Students often believe that contour lines can cross or merge to form a cliff, but in reality contour lines never cross.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Map reading is the systematic interpretation of topographic maps to determine direction',
                  options: ['Map reading is the systematic interpretation of topographic maps to determine direction', 'A map is a scaled, symbolized, and generalized representation of the whole or a part of', 'The history of map making traces the evolution of cartography from ancient symbolic', 'Map scale is the precise ratio or relationship between a distance measured on a map and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that contour lines can cross or merge to form a cliff, but in reality contour lines never cross (except at.' }
          ],
            remediations: { 'contour-lines-can-cross-or': { steps: ['Take a 1:50,000 topographic sheet of a familiar area (e.g., your district).', 'Locate the contour interval in the margin (usually 20 m).', 'Trace a few contour lines with a pencil and label their elevations using nearby spot heights.', 'Practice measuring straight-line distance between two points using a divider and the graphical scale; then measure a.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_006', difficulty: 'standard',
          question: 'A coordinate system is a standardized framework that uses angular measurements.',
          hint: 'Review Class 7 Geography Chapter 1 (India\'s Location) for lat/long basics and Class 11.',
          misconception: 'Students treat latitude/longitude and grid references as interchangeable "coordinates" and assume 1° longitude = 111 km.',
          parts: [
                { id: 'a', prompt: 'Why does the linear distance represented by 1° of longitude decrease as you move from the Equator toward the poles, while 1° of latitude remains nearly.', answer: 'Lines of longitude (meridians) are great circles that converge at the poles',
                  options: ['Lines of longitude (meridians) are great circles that converge at the poles', 'latitude lines also converge'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat latitude/longitude and grid references as interchangeable "coordinates" and assume 1° longitude = 111 km everywhere.' },
                { id: 'b', prompt: 'Two cities, A (20°N, 75°E) and B (20°N, 85°E), lie on the same parallel.', answer: 'The claim is false',
                  options: ['The claim is false', 'parallel is shortest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat latitude/longitude and grid references as interchangeable "coordinates" and assume 1° longitude = 111 km everywhere.' }
          ],
            remediations: { 'students-treat-latitude-longitude-and': { steps: ['**Datum/Projection Confusion**: Use a transparency overlay: print a WGS84 lat/long graticule and an Everest Polyconic.', 'Overlay on a light table — the graticule curves, the grid is square, and they don\'t align perfectly.', 'This visualizes the datum shift and projection distortion.', '**Grid Reference Order**: Practice the "along the corridor, up the stairs" mnemonic with a physical 1:50,000 sheet.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat latitude/longitude and grid references as interchangeable "coordinates" and assume 1° longitude = 111 km.',
          parts: [
                { id: 'a', prompt: 'Two cities, A (20°N, 75°E) and B (20°N, 85°E), lie on the same parallel.', answer: 'The claim is false',
                  options: ['The claim is false', 'parallel is shortest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat latitude/longitude and grid references as interchangeable "coordinates" and assume 1° longitude = 111 km everywhere.' }
          ],
            remediations: { 'students-treat-latitude-longitude-and': { steps: ['**Datum/Projection Confusion**: Use a transparency overlay: print a WGS84 lat/long graticule and an Everest Polyconic.', 'Overlay on a light table — the graticule curves, the grid is square, and they don\'t align perfectly.', 'This visualizes the datum shift and projection distortion.', '**Grid Reference Order**: Practice the "along the corridor, up the stairs" mnemonic with a physical 1:50,000 sheet.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_007', difficulty: 'standard',
          question: 'Map projection is the systematic transformation of the Earth\'s.',
          hint: 'Revisit c11_geo_cbse_22_006 (Coordinate Systems) — specifically the difference between.',
          misconception: 'Students believe "Mercator projection is wrong/bad because it distorts area" — they treat distortion as a flaw rather.',
          parts: [
                { id: 'a', prompt: 'Classify the following projections by developable surface AND preserved property: (a) Mercator, (b) Lambert Equal-Area Conic, (c) Azimuthal Equidistant, (d).', answer: 'Mercator, (',
                  options: ['Mercator, (', 'equal-area', 'Mercator projection is wrong/bad'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Mercator projection is wrong/bad because it distorts area" — they treat distortion as a flaw rather than a necessary.' }
          ],
            remediations: { 'mercator-projection-is-wrong-bad': { steps: ['Draw Tissot\'s indicatrix for Mercator at equator, 30°N, 60°N — circles expand but remain circles (conformal).', 'Draw indicatrix for Mollweide — circles become ellipses of equal area (equal-area).', 'Overlay a shipping route (rhumb line) on both — straight on Mercator, curved on Mollweide.', 'Ask: "If you\'re a ship captain crossing the Atlantic, which map do you want?" This concrete role-play forces the.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Mercator projection is wrong/bad because it distorts area" — they treat distortion as a flaw rather.',
          parts: [
                { id: 'a', prompt: 'Design a projection specification for a new Indian topographic map series at 1:50,000 scale covering 7.5\' × 7.5\' quadrangles.', answer: 'Projection: Lambert Conformal Conic (LCC)',
                  options: ['Projection: Lambert Conformal Conic (LCC)', 'Mercator projection is wrong/bad', 'distortion', 'unsuitability'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "Mercator projection is wrong/bad because it distorts area" — they treat distortion as a flaw rather than a necessary.' }
          ],
            remediations: { 'mercator-projection-is-wrong-bad': { steps: ['Draw Tissot\'s indicatrix for Mercator at equator, 30°N, 60°N — circles expand but remain circles (conformal).', 'Draw indicatrix for Mollweide — circles become ellipses of equal area (equal-area).', 'Overlay a shipping route (rhumb line) on both — straight on Mercator, curved on Mollweide.', 'Ask: "If you\'re a ship captain crossing the Atlantic, which map do you want?" This concrete role-play forces the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
