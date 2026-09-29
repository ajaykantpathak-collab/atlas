import type { SimDef } from '../../engine/types';
import C11_GeographyMapScaleSim from '../../../simulations/c6_12/C11_GeographyMapScaleSim';

/** v3 wrapped master — C11_GeographyMapScaleSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_geographymapscalesim: SimDef = {
    id: 'v3w_c11_geographymapscalesim',
    title: 'Maps: Definition, Types and Essential Elements',
    subtitle: 'This node covers the definition of a map, its essential elements (title, scale,.',
    classLevel: 11, subject: 'geography', topic: 'Maps: Definition, Types and Essential Elements',
    chapters: [],
    nodeIds: ['c11_geo_cbse_22_001', 'c11_geo_cbse_22_002', 'c11_geo_cbse_22_003', 'c11_geo_cbse_22_005', 'c11_geo_cbse_23_001', 'c11_geo_cbse_23_002', 'c11_geo_cbse_23_003', 'c11_geo_cbse_23_004', 'c11_geo_cbse_23_006', 'c11_geo_cbse_23_007', 'c11_geo_cbse_23_009', 'c11_geo_cbse_24_001', 'c11_geo_cbse_24_002', 'c11_geo_cbse_24_003', 'c11_geo_cbse_24_007'],
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
        { type: 'scaffold', nodeId: 'c11_geo_cbse_23_001', title: 'Statement (Verbal) Scale expresses the.',
          scaffold: { problem: 'A Survey of India topographical map (sheet 45D/10) has statement scale "2 cm = 1 km".',
            steps: [
            { text: 'Identify given statement scale: 2 cm (map) = 1 km (ground)' },
            { text: 'Normalize to unit map distance: 1 cm (map) = 0.5 km (ground) = 500 m (ground)' },
            { text: 'Apply to measured distance: 4.7 cm × 0.5 km/cm = 2.35 km' },
            { text: 'Convert to metres: 2.35 km × 1000 = 2350 m' },
            { text: 'Derive Representative Fraction: 1 km = 100,000 cm, so 2 cm = 100,000 cm → 1 cm = 50,000 cm → RF = 1:50,000' },
            { text: 'Verify using RF: Map distance 4.7 cm × 50,000 = 235,000 cm = 2350 m = 2.35 km ✓' },
            { text: 'Interpret: This matches Survey of India 1:50,000 series standard; statement scale "2 cm = 1 km" is the conventional.', faded: true, blankAnswer: 'Ground distance = 2.35 km (or 2350 m). RF verification.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_23_002', title: 'Representative Fraction (RF) is a.',
          scaffold: { problem: 'A Survey of India toposheet (RF 1:50,000) shows a river stretch measuring 6.4 cm between two bridges.',
            steps: [
            { text: 'Identify given RF = 1:50,000, map distance = 6.4 cm.' },
            { text: 'Apply RF formula: Ground Distance = Map Distance × Denominator = 6.4 cm × 50,000 = 320,000 cm.' },
            { text: 'Convert cm to km: 320,000 cm ÷ 100 = 3,200 m ÷ 1,000 = 3.2 km. Actual river length = 3.2 km.' },
            { text: 'For new map RF 1:25,000, same ground distance (3.2 km = 320,000 cm).' },
            { text: 'Verify: 1:25,000 is larger scale (denominator smaller), so map distance should double (50,000/25,000 = 2).', faded: true, blankAnswer: 'Actual river length = 3.2 km. On 1:25,000 map, the stretch.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_geo_cbse_22_002', title: 'Identify each idea',
          dissect: { specimen: 'Maps: Definition, Types and Essential Elements', spots: [
            { id: 's1', label: 'A map is a scaled', prompt: 'Which idea is this? — A map is a scaled, symbolized, and generalized representation of the whole or a part of.', answer: 'A map is a scaled', options: ['A map is a scaled', 'The history of map making', 'Map scale is the precise', 'Map reading is the systematic'] },
            { id: 's2', label: 'The history of map making', prompt: 'Which idea is this? — The history of map making traces the evolution of cartography from ancient symbolic.', answer: 'The history of map making', options: ['The history of map making', 'A map is a scaled', 'Map scale is the precise', 'Map reading is the systematic'] },
            { id: 's3', label: 'Map scale is the precise', prompt: 'Which idea is this? — Map scale is the precise ratio or relationship between a distance measured on a map and.', answer: 'Map scale is the precise', options: ['Map scale is the precise', 'A map is a scaled', 'The history of map making', 'Map reading is the systematic'] },
            { id: 's4', label: 'Map reading is the systematic', prompt: 'Which idea is this? — Map reading is the systematic interpretation of topographic maps to determine direction.', answer: 'Map reading is the systematic', options: ['Map reading is the systematic', 'A map is a scaled', 'The history of map making', 'Map scale is the precise'] },
            { id: 's5', label: 'Statement Verbal Scale expresses the', prompt: 'Which idea is this? — Statement (Verbal) Scale expresses the map-to-ground distance relationship in words using.', answer: 'Statement Verbal Scale expresses the', options: ['Statement Verbal Scale expresses the', 'A map is a scaled', 'The history of map making', 'Map scale is the precise'] },
            { id: 's6', label: 'Representative Fraction RF is a', prompt: 'Which idea is this? — Representative Fraction (RF) is a unitless ratio expressing map scale as 1 : X, where 1.', answer: 'Representative Fraction RF is a', options: ['Representative Fraction RF is a', 'A map is a scaled', 'The history of map making', 'Map scale is the precise'] }
          ] } }
    ],
    explore: { component: C11_GeographyMapScaleSim, prompt: 'Explore the interactive — Maps: Definition, Types and Essential Elements' },
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
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_001', difficulty: 'standard',
          question: 'Statement (Verbal) Scale expresses the map-to-ground distance relationship in.',
          hint: 'If stuck on unit conversion, review NCERT Class 8 Mathematics Chapter "Comparing.',
          misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000 m.',
          parts: [
                { id: 'a', prompt: 'What is the standard convention for writing a statement scale, and which distance (map or ground) is always stated first?', answer: 'Standard convention: "1 unit on map = X units on ground"',
                  options: ['Standard convention: "1 unit on map = X units on ground"', '1 cm = 1 km'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000 m = 1000 cm instead.' },
                { id: 'b', prompt: 'On a map with statement scale "2 cm = 1 km", a student measures 3.6 cm between two villages. Calculate the ground distance in kilometers and meters.', answer: 'Step 1: Normalize to 1 cm → 1 cm = 0.5 km (divide both sides by 2)',
                  options: ['Step 1: Normalize to 1 cm → 1 cm = 0.5 km (divide both sides by 2)', '1 cm = 1 km'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000 m = 1000 cm instead.' },
                { id: 'c', prompt: 'Compare statement scales "1 cm = 200 m" (Map A) and "1 cm = 5 km" (Map B). Which map shows more detail?', answer: 'Map A (1 cm = 200 m) shows more detail',
                  options: ['Map A (1 cm = 200 m) shows more detail', '5 km > 200 m', 'more ground shown'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000 m = 1000 cm instead.' }
          ],
            remediations: { 'the-statement-scale-1-cm': { steps: ['Remediation: (1) Drill metric conversions: 1 km = 1000 m = 100,000 cm using a 1 m ruler and 1 km mental image (10 min.', '(2) Physical demonstration: Print a map with "1 cm = 1 km", photocopy at 50%, measure same feature on both — show the.', '(3) Practice RF derivation: "1 cm = X km" → RF = 1 : (X × 100,000).', 'Do 5 conversions until automatic.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000 m.',
          parts: [
                { id: 'a', prompt: 'A hiker uses a map with statement scale "1 inch = 1 mile" to plan a trek. They measure 2.5 inches between campsites and calculate 2.5 miles.', answer: 'The map scale is not necessarily inaccurate',
                  options: ['The map scale is not necessarily inaccurate', '1 cm = 1 km'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000 m = 1000 cm instead.' },
                { id: 'b', prompt: 'Design a statement scale for a map of your school campus (approx. 600 m × 400 m) to fit on A4 paper (21 cm × 29.7 cm) with 1 cm margins.', answer: 'Usable paper: 19 cm × 27.7 cm',
                  options: ['Usable paper: 19 cm × 27.7 cm', '1 cm = 1 km'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the statement scale "1 cm = 1 km" implies a Representative Fraction of 1:1000 (mistaking 1 km = 1000 m = 1000 cm instead.' }
          ],
            remediations: { 'the-statement-scale-1-cm': { steps: ['Remediation: (1) Drill metric conversions: 1 km = 1000 m = 100,000 cm using a 1 m ruler and 1 km mental image (10 min.', '(2) Physical demonstration: Print a map with "1 cm = 1 km", photocopy at 50%, measure same feature on both — show the.', '(3) Practice RF derivation: "1 cm = X km" → RF = 1 : (X × 100,000).', 'Do 5 conversions until automatic.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_002', difficulty: 'standard',
          question: 'Representative Fraction (RF) is a unitless ratio expressing map scale as 1 : X,.',
          hint: 'Revisit c11_geo_cbse_23_001 (Statement Scale) and practice converting "1 cm = 500 m" type.',
          misconception: 'Students frequently believe RF 1:50,000 means "1 cm on map = 50,000 km on ground" — confusing the denominator\'s unit.',
          parts: [
                { id: 'a', prompt: 'Why is Representative Fraction considered a "universal" scale method while statement scale is not?', answer: 'RF is universal because it is a pure ratio without units',
                  options: ['RF is universal because it is a pure ratio without units', 'RF is more accurate', '1 cm on map = 50,000 km on ground'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe RF 1:50,000 means "1 cm on map = 50,000 km on ground" — confusing the denominator\'s unit.' },
                { id: 'b', prompt: 'On a map with RF 1:50,000, you measure the straight-line distance between two villages as 4.8 cm. Calculate the actual ground distance in kilometres.', answer: 'Step 1: RF = 1:50,000 → 1 cm map = 50,000 cm ground',
                  options: ['Step 1: RF = 1:50,000 → 1 cm map = 50,000 cm ground', '1 cm on map = 50,000 km on ground', 'RF 1:50,000 means "1 cm on map = 50,000 km on ground"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe RF 1:50,000 means "1 cm on map = 50,000 km on ground" — confusing the denominator\'s unit.' },
                { id: 'c', prompt: 'Two maps of the same region have RFs 1:25,000 and 1:100,000. Which map shows more detail? Explain using the concept of scale denominator.', answer: '1:25,000 shows more detail',
                  options: ['1:25,000 shows more detail', 'larger number = larger scale = more detail', '1 cm on map = 50,000 km on ground'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe RF 1:50,000 means "1 cm on map = 50,000 km on ground" — confusing the denominator\'s unit.' }
          ],
            remediations: { 'students-frequently-believe-rf-1': { steps: ['Have student write RF as a fraction (1/50,000) and compare with 1/1,000,000 using a number line.', 'Use a physical map — measure 1 cm, calculate ground distance in cm, then convert to km (50,000 cm = 0.5 km).', 'Photocopy the map at 200% enlargement — measure same feature, show statement scale breaks but RF ratio holds if you.', 'Practice converting 5 statement scales to RF, emphasizing "make map side 1 unit first, then convert ground to same.'] } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently believe RF 1:50,000 means "1 cm on map = 50,000 km on ground" — confusing the denominator\'s unit.',
          parts: [
                { id: 'a', prompt: 'A student converts statement scale "2 cm = 1 km" to RF as 1:50,000. Is this correct? Justify your evaluation.', answer: 'Yes, correct',
                  options: ['Yes, correct', '1 cm on map = 50,000 km on ground', 'RF 1:50,000 means "1 cm on map = 50,000 km on ground"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe RF 1:50,000 means "1 cm on map = 50,000 km on ground" — confusing the denominator\'s unit.' }
          ],
            remediations: { 'students-frequently-believe-rf-1': { steps: ['Have student write RF as a fraction (1/50,000) and compare with 1/1,000,000 using a number line.', 'Use a physical map — measure 1 cm, calculate ground distance in cm, then convert to km (50,000 cm = 0.5 km).', 'Photocopy the map at 200% enlargement — measure same feature, show statement scale breaks but RF ratio holds if you.', 'Practice converting 5 statement scales to RF, emphasizing "make map side 1 unit first, then convert ground to same.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
