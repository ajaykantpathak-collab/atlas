import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch22_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch22_p2: SimDef = {
    id: 'v3_c11_geo_ch22_p2',
    title: 'Introduction to Maps · Part 2/2',
    subtitle: 'Read a map as a set of deliberate trade-offs, not a shrunken photograph.',
    classLevel: 11, subject: 'geography', topic: 'Introduction to Maps · Part 2/2',
    chapters: ['c11_geo_ch22'],
    nodeIds: ['c11_geo_cbse_22_007', 'c11_geo_cbse_22_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cartographer choosing the right lie for the job', intro: 'Your phone slides from street to planet in one pinch — two thousand years of projection problems solved quietly underneath.', goal: 'Identify a map\'s essential elements and choose scale and projection by purpose.' },
    discovery: {
        question: 'A 1:10,000 map packs in far more detail — so it\'s obviously the right map for a cross-country drive?',
        options: ['No — large scale means small coverage; a road trip needs a small-scale sheet that shows the whole route', 'Yes — more detail is always better', 'Yes — you can just tile forty sheets together', 'No — large-scale maps are only for aeroplanes'],
        answer: 'No — large scale means small coverage; a road trip needs a small-scale sheet that shows the whole route',
        hook: 'Mercator blew Greenland up to South America\'s size — yet sailors swore by it, because a steady compass bearing draws as a straight line. Every map trades one truth for another.',
    },
    teaching: [
        { title: 'Map Projections: Need, Properties and Classification', text: 'Map projection is the systematic transformation of the Earth\'s three-dimensional curved surface (geoid/oblate spheroid) onto a two-dimensional flat plane using a network of latitude and longitude.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_22_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Convert an RF into ground kilometres, then defend which of the three scale forms survives a photocopier\'s resizing.',
        labels: ['Map Projections: Need, Properties', 'Choice of Map Projection'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_22_007', title: 'Map Projections: Need, Properties and Classification',
          scaffold: { problem: 'A cylindrical equal-area projection is defined by x = R(λ - λ₀), y = R sin φ.',
            steps: [
            { text: 'Compute partial derivatives of x and y with respect to φ and λ to get the Jacobian matrix of the transformation.' },
            { text: 'Calculate the first fundamental form coefficients: E = (∂x/∂φ)² + (∂y/∂φ)², F = (∂x/∂φ)(∂x/∂λ) + (∂y/∂φ)(∂y/∂λ),.' },
            { text: 'For this projection: ∂x/∂φ = 0, ∂x/∂λ = R, ∂y/∂φ = R cos φ, ∂y/∂λ = 0. So E = R² cos² φ, F = 0, G = R².' },
            { text: 'Meridional scale factor h = √(E/G) = √(R² cos² φ / R²) = cos φ. Parallel scale factor k = √(G/E) = 1/cos φ = sec φ.' },
            { text: 'Check area preservation: h × k = cos φ × sec φ = 1 → Equal-area property satisfied everywhere.' },
            { text: 'Check shape preservation: h = k only when cos φ = sec φ → cos² φ = 1 → φ = 0° (equator).', faded: true, blankAnswer: 'The projection is equal-area (h × k = 1 everywhere) but.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_22_008', title: 'Choice of Map Projection Based on Purpose and Area',
          scaffold: { problem: 'The Ministry of Agriculture needs a wall map of India (size 1m × 1.5m) showing district-wise wheat yield (tonnes/hectare) for policy.',
            steps: [
            { text: 'Identify the map purpose - thematic comparison of yield per unit area requires accurate area representation → must.' },
            { text: 'Analyze the area characteristics - India mainland spans 8°4\'N to 37°6\'N (≈29° latitude) and 68°7\'E to 97°25\'E (≈29°.' },
            { text: 'Select projection family - For mid-latitude regions with greater E-W extent, conical projections are optimal because.' },
            { text: 'Choose specific projection - Albers Equal-Area Conic with two standard parallels (typically 18°N and 32°N for India).' },
            { text: 'Verify against alternatives - Mercator (cylindrical) would exaggerate northern states\' areas (Kashmir, Punjab).' },
            { text: 'Confirm practical usability - Albers is standard for Indian thematic atlases (NATMO), supported in all GIS software.', faded: true, blankAnswer: 'Albers Equal-Area Conic projection with standard parallels.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_22_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your class is making a poster map of crop patterns across the world. A teammate enlarges a photocopied atlas map and measures distances with the printed statement \'1 cm = 100 km\'. She also picks the Mercator projection because \'it\'s the world map — the standard.\'',
            decisions: [{ prompt: 'What two cartographic errors need fixing?', options: [
                { text: 'Fix scale first: only a graphical (bar) scale survives photocopy enlargement — the RF and statement scale are tied to the original print size, so her measurements are off. Then the projection: Mercator was built in 1569 for constant-bearing navigation, and its conformal property grotesquely inflates polar areas — for comparing crop regions by area, it\'s the wrong tool.', outcome: 'She learns the rule: every map is a purpose-driven compromise — match scale type to reproduction, and projection to the question being asked.' },
                { text: 'Let her measure — a scale is a scale, however the map is reproduced.', outcome: 'RF and statement scales encode the original sheet\'s size; enlarge the print and the numbers lie — only the drawn bar stretches with the image.', reveals: 'scale-survives-photocopy' },
                { text: 'Keep Mercator — it\'s the most accurate world map, which is why Google and atlases use it.', outcome: 'Mercator preserves angles for navigation, not areas; for thematic comparison of regions it distorts exactly the property being compared.', reveals: 'mercator-is-universal-standard' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_22_008', title: 'You made it',
          caseStudy: { intro: 'A map is a selective model of reality — scale, projection and legend are the choices that decide what it can honestly say.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_007', difficulty: 'standard',
          question: 'Map projection is the systematic transformation of the Earth\'s.',
          hint: 'Revisit c11_geo_cbse_22_006 (Coordinate Systems) — specifically the difference between.',
          misconception: 'Students believe "Mercator projection is wrong/bad because it distorts area" — they treat distortion as a flaw rather.',
          parts: [
                { id: 'a', prompt: 'Classify the following projections by developable surface AND preserved property: (a) Mercator, (b) Lambert Equal-Area Conic, (c) Azimuthal Equidistant, (d).', answer: 'Mercator, (',
                  options: ['Mercator, (', 'equal-area', 'Mercator projection is wrong/bad', 'distortion'],
                  hint: 'Revisit c11_geo_cbse_22_006 (Coordinate Systems) — specifically the difference between spherical.',
                  misconception: 'Students believe "Mercator projection is wrong/bad because it distorts area" — they treat distortion as a flaw rather than a necessary.' }
          ],
            remediations: { 'mercator-projection-is-wrong-bad': { steps: ['Draw Tissot\'s indicatrix for Mercator at equator, 30°N, 60°N — circles expand but remain circles (conformal).', 'Draw indicatrix for Mollweide — circles become ellipses of equal area (equal-area).', 'Overlay a shipping route (rhumb line) on both — straight on Mercator, curved on Mollweide.', 'Ask: "If you\'re a ship captain crossing the Atlantic, which map do you want?" This concrete role-play forces the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Mercator projection is wrong/bad because it distorts area" — they treat distortion as a flaw rather.',
          parts: [
                { id: 'a', prompt: 'Design a projection specification for a new Indian topographic map series at 1:50,000 scale covering 7.5\' × 7.5\' quadrangles.', answer: 'Projection: Lambert Conformal Conic (LCC)',
                  options: ['Projection: Lambert Conformal Conic (LCC)', 'Mercator projection is wrong/bad', 'distortion', 'unsuitability'],
                  hint: 'Revisit c11_geo_cbse_22_006 (Coordinate Systems) — specifically the difference between spherical.',
                  misconception: 'Students believe "Mercator projection is wrong/bad because it distorts area" — they treat distortion as a flaw rather than a necessary.' }
          ],
            remediations: { 'mercator-projection-is-wrong-bad': { steps: ['Draw Tissot\'s indicatrix for Mercator at equator, 30°N, 60°N — circles expand but remain circles (conformal).', 'Draw indicatrix for Mollweide — circles become ellipses of equal area (equal-area).', 'Overlay a shipping route (rhumb line) on both — straight on Mercator, curved on Mollweide.', 'Ask: "If you\'re a ship captain crossing the Atlantic, which map do you want?" This concrete role-play forces the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_22_008', difficulty: 'standard',
          question: 'The choice of map projection is the systematic selection of a specific.',
          hint: 'Revisit node 007\'s projection property table and practice identifying which property.',
          misconception: 'Students believe "Mercator is for world maps, Robinson is for world maps, so they are interchangeable for any world.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The choice of map projection is the systematic selection of a specific projection type',
                  options: ['The choice of map projection is the systematic selection of a specific projection type', 'A map is a scaled, symbolized, and generalized representation of the whole or a part of', 'The history of map making traces the evolution of cartography from ancient symbolic', 'Map scale is the precise ratio or relationship between a distance measured on a map and'],
                  hint: 'Revisit node 007\'s projection property table and practice identifying which property.',
                  misconception: 'Students believe "Mercator is for world maps, Robinson is for world maps, so they are interchangeable for any world map." They miss that.' }
          ],
            remediations: { 'mercator-is-for-world-maps': { steps: ['Draw three 10°×10° grid squares at equator, 45°N, and 80°N on Mercator, Robinson, and Mollweide projections (use.', 'Measure each grid\'s area on paper and compare to true area (≈12,300 km² at equator, decreasing poleward).', 'Tabulate % area error for each projection at each latitude.', 'Conclude: Mercator error grows to ∞ at poles, Robinson keeps error <15% globally, Mollweide has 0% area error.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
