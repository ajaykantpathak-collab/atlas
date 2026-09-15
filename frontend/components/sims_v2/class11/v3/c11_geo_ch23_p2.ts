import type { SimDef } from '../../engine/types';

/** v3 generated — c11_geo_ch23_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_geo_ch23_p2: SimDef = {
    id: 'v3_c11_geo_ch23_p2',
    title: 'Map Scale and Projection · Part 2/2',
    subtitle: 'Master the three ways maps state their shrink — and the conversion trap between them.',
    classLevel: 11, subject: 'geography', topic: 'Map Scale and Projection · Part 2/2',
    chapters: ['c11_geo_ch23'],
    nodeIds: ['c11_geo_cbse_23_007', 'c11_geo_cbse_23_008', 'c11_geo_cbse_23_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a trekker converting map marks into kilometres', intro: 'The corner of a tourist map says \'1 cm = 2 km\' — harmless until someone has to turn it into an RF.', goal: 'Convert between statement scale and representative fraction and reason about scale accuracy.' },
    discovery: {
        question: '\'1 cm = 1 km\' — convert that statement scale to a Representative Fraction. Is it 1:1,000?',
        options: ['No — 1:100,000; a kilometre is 100,000 centimetres, not 1,000', 'Yes — the units cancel cleanly', 'No — 1:10,000; divide by ten', 'Yes — RF just repeats the numbers'],
        answer: 'No — 1:100,000; a kilometre is 100,000 centimetres, not 1,000',
        hook: 'And the bigger-looking RF is the smaller scale — 1:1,000,000 shows less detail than 1:50,000 because it\'s a fraction, not a size.',
    },
    teaching: [
        { title: 'Conical Projections: Properties, Distortion and Uses', text: 'A conical projection is a map projection where the surface of the Earth (reference ellipsoid) is projected onto a cone placed over the globe, typically tangent along a single standard parallel.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_geo_cbse_23_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Normalise \'2 cm = 1 km\' into per-centimetre terms, compute a ground distance, then explain why a hiker\'s 2.5 map-miles became 3.8 trail-miles.',
        labels: ['Conical Projections: Properties, Distortion', 'Zenithal (Azimuthal) Projections: Properties', 'Properties of Map Projections'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_23_007', title: 'Conical Projections: Properties, Distortion and Uses',
          scaffold: { problem: 'Construct a simple conical projection for India using a Reduced Earth radius R = 4 cm and standard parallel φ₀ = 24°N.',
            steps: [
            { text: 'Convert all latitudes to radians: φ₀ = 24° × π/180 = 0.4189 rad; φ₁ = 8° = 0.1396 rad; φ₂ = 37° = 0.6458 rad.' },
            { text: 'Compute r₀ = R cot φ₀ = 4 × cot(24°) = 4 × 2.246 = 8.984 cm. Compute L₀ = R csc φ₀ = 4 × csc(24°) = 4 × 2.458 = 9.832.' },
            { text: 'Compute r at 8°N: r₈ = L₀ - R(φ₀ - φ₁) = 9.832 - 4(0.4189 - 0.1396) = 9.832 - 4(0.2793) = 9.832 - 1.117 = 8.715 cm.' },
            { text: 'Compute r at 37°N: r₃₇ = L₀ - R(φ₀ - φ₂) = 9.832 - 4(0.4189 - 0.6458) = 9.832 - 4(-0.2269) = 9.832 + 0.908 = 10.740 cm.' },
            { text: 'Sector angle θ = 360° × sin φ₀ = 360° × sin(24°) = 360° × 0.4067 = 146.4°.' },
            { text: 'Scale factor along parallel k = (r_φ / r₀) × (cos φ₀ / cos φ).', faded: true, blankAnswer: 'r₈ = 8.72 cm, r₂₄ = 8.98 cm, r₃₇ = 10.74 cm; θ = 146.4°; k₈.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_23_008', title: 'Zenithal (Azimuthal) Projections: Properties and Uses',
          caseStudy: { intro: 'Imagine you are an airline pilot planning the shortest route from New Delhi to San Francisco.',
            decisions: [{ prompt: 'What is the defining geometric characteristic of a zenithal (azimuthal) projection that distinguishes it from cylindrical and conical.', options: [
                { text: 'A zenithal projection uses a plane as its developable surface, tangent to the globe at a', outcome: 'A zenithal projection uses a plane as its developable surface, tangent to the globe at a single.' },
                { text: 'it uses a cone touching at a parallel', outcome: 'Not quite — Students often believe "zenithal projections are only for polar maps." In reality, zenithal.', reveals: 'zenithal-projections-are-only-for' },
                { text: 'zenithal projections are only for polar maps', outcome: 'Not quite — Students often believe "zenithal projections are only for polar maps." In reality, zenithal.', reveals: 'zenithal-projections-are-only-for' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_geo_cbse_23_009', title: 'Properties of Map Projections: Equidistance, Equivalence, Conformality',
          scaffold: { problem: 'For the Lambert Conformal Conic projection with standard parallels at φ₁ = 18°N and φ₂ = 30°N, the scale factor along any parallel is given.',
            steps: [
            { text: 'Recall the Mercator projection equations: x = R λ, y = R ln[tan(π/4 + φ/2)] where R is globe radius, λ longitude.' },
            { text: 'Compute meridional scale factor h = (1/R) · (∂y/∂φ). ∂y/∂φ = R · (1/2) sec²(π/4 + φ/2) / tan(π/4 + φ/2) = R / [2.' },
            { text: 'Compute parallel scale factor k = (1/(R cos φ)) · (∂x/∂λ). ∂x/∂λ = R. So k = (1/(R cos φ)) · R = sec φ.' },
            { text: 'Compare h and k: h = sec φ, k = sec φ → h = k at all φ. Angular deformation ω = 0. Therefore, Mercator is **conformal**.' },
            { text: 'Area scale factor S = h × k = sec² φ. At φ = 30°N: sec 30° = 2/√3 ≈ 1.1547 → S = (1.1547)² = 1.333.' },
            { text: 'Interpret: At 30°N, areas are 33.3% exaggerated; at 60°N, areas are 4× true size.', faded: true, blankAnswer: 'h = k = sec φ; S = sec² φ; at 30°N: S = 4/3 ≈ 1.33;.' }
            ] } },
        { type: 'case', nodeId: 'c11_geo_cbse_23_007', title: 'Use it in the wild',
          caseStudy: { intro: 'During a map-skills test review, a classmate converts the statement scale \'1 cm = 1 km\' into a Representative Fraction of 1:1,000. He also insists \'1:1,000,000 is a larger scale than 1:50,000 because the number is bigger.\'',
            decisions: [{ prompt: 'Where do his scale conversions go wrong?', options: [
                { text: 'Redo the units: 1 km = 100,000 cm, so \'1 cm = 1 km\' is RF 1:100,000 — not 1:1,000. And RF is a fraction: 1/50,000 is a LARGER scale than 1/1,000,000 because the divisor is smaller — it shows more detail on a smaller area. The denominator divides, it doesn\'t measure.', outcome: 'Both fixes come from treating RF as a unitless ratio: convert to identical units first, and read the fraction\'s value — not the denominator\'s size.' },
                { text: 'Let the 1:1,000 stand — 1 km has 1,000 metres, so the conversion is close enough.', outcome: 'The error isn\'t rounding: metres vs centimetres changes the RF by 100×, and every ground distance derived from it comes out wrong.', reveals: 'km-equals-thousand-units' },
                { text: 'Agree on the denominator logic — a million must be bigger than fifty thousand.', outcome: 'The denominator is a divisor: bigger denominator means smaller fraction, smaller scale, less detail — 1:50,000 zooms closer than 1:1,000,000.', reveals: 'bigger-denominator-bigger-scale' }
            ] }] } },
        { type: 'case', nodeId: 'c11_geo_cbse_23_009', title: 'You made it',
          caseStudy: { intro: 'Statement, RF, graphical — three dialects of one relationship; only the drawn bar still tells the truth after a photocopy.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_007', difficulty: 'standard',
          question: 'A conical projection is a map projection where the surface of the Earth.',
          hint: 'If stuck on the geometry, revisit the cone-globe cross-section diagram.',
          misconception: 'Students often believe that in a secant conical projection, both standard parallels can be made true-to-scale (scale.',
          parts: [
                { id: 'a', prompt: 'Compare the distortion distribution in a simple conical projection (one standard parallel) versus a secant conical projection (two standard parallels, e.g.', answer: 'Simple conical: scale factor = 1 only at 24°N (if chosen)',
                  options: ['Simple conical: scale factor = 1 only at 24°N (if chosen)', 'because it\'s simpler'],
                  hint: 'If stuck on the geometry, revisit the cone-globe cross-section diagram in c11_geo_cbse_23_005 and.',
                  misconception: 'Students often believe that in a secant conical projection, both standard parallels can be made true-to-scale (scale factor = 1).' }
          ],
            remediations: { 'in-a-secant-conical-projection': { steps: ['Revisit c11_geo_cbse_23_005 (Classification by Developable Surfaces) to reinforce the cone-globe tangency/secancy.', 'Draw a physical cross-section: a circle (globe) and a triangle (cone cross-section) intersecting at two parallels.', 'Measure the arc lengths at both parallels on the globe (2πR cos φ) and on the developed cone (θ/360 × 2πr).', 'Set up the equation θ = 360 sin φ for each parallel; observe the contradiction unless φ₁ = φ₂.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_008', difficulty: 'standard',
          question: 'Zenithal (Azimuthal) projections are a class of map projections where the.',
          hint: 'Revisit node c11_geo_cbse_23_005 (Classification by Developable Surfaces) and physically.',
          misconception: 'Students often believe "zenithal projections are only for polar maps." In reality, zenithal projections can be centred.',
          parts: [
                { id: 'a', prompt: 'Why does a gnomonic zenithal projection represent all great circles as straight lines, and what navigational advantage does this provide?', answer: 'In a gnomonic projection, the light source is at the centre of the globe',
                  options: ['In a gnomonic projection, the light source is at the centre of the globe', 'it preserves distances', 'zenithal projections are only for polar maps', 'India and its neighbourhood'],
                  hint: 'Revisit node c11_geo_cbse_23_005 (Classification by Developable Surfaces) and physically model the.',
                  misconception: 'Students often believe "zenithal projections are only for polar maps." In reality, zenithal projections can be centred on **any point**.' },
                { id: 'b', prompt: 'A cartographer needs to map the Arctic Ocean for a climate study showing accurate relative sizes of sea-ice polygons.', answer: 'Choose the **azimuthal equal-area (Lambert azimuthal equal-area)** projection',
                  options: ['Choose the **azimuthal equal-area (Lambert azimuthal equal-area)** projection', 'zenithal projections are only for polar maps', 'India and its neighbourhood', '"zenithal projections are only for polar maps'],
                  hint: 'Revisit node c11_geo_cbse_23_005 (Classification by Developable Surfaces) and physically model the.',
                  misconception: 'Students often believe "zenithal projections are only for polar maps." In reality, zenithal projections can be centred on **any point**.' },
                { id: 'c', prompt: 'Compare the distortion patterns of a polar zenithal equidistant projection and a polar stereographic projection at 60°N latitude.', answer: 'At 60°N: The **stereographic** projection is conformal',
                  options: ['At 60°N: The **stereographic** projection is conformal', 'both preserve shape', 'zenithal projections are only for polar maps', 'India and its neighbourhood'],
                  hint: 'Revisit node c11_geo_cbse_23_005 (Classification by Developable Surfaces) and physically model the.',
                  misconception: 'Students often believe "zenithal projections are only for polar maps." In reality, zenithal projections can be centred on **any point**.' }
          ],
            remediations: { 'zenithal-projections-are-only-for': { steps: ['Take a physical globe and a flat sheet of paper.', 'Touch the paper to the globe at the North Pole — this is polar aspect.', 'Now tilt the paper to touch at Mumbai (approx.', '19°N, 73°E) — this is oblique aspect.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "zenithal projections are only for polar maps." In reality, zenithal projections can be centred.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The orthographic zenithal projection is the best choice for a world map showing correct distances from the North Pole to all other points."', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'zenithal projections are only for polar maps', 'India and its neighbourhood', '"zenithal projections are only for polar maps'],
                  hint: 'Revisit node c11_geo_cbse_23_005 (Classification by Developable Surfaces) and physically model the.',
                  misconception: 'Students often believe "zenithal projections are only for polar maps." In reality, zenithal projections can be centred on **any point**.' },
                { id: 'b', prompt: 'Design a map layout for an airline\'s polar route network (e.g., Delhi → New York via North Pole).', answer: '**Projection:** Gnomonic zenithal (polar aspect)',
                  options: ['**Projection:** Gnomonic zenithal (polar aspect)', 'zenithal projections are only for polar maps', 'India and its neighbourhood', '"zenithal projections are only for polar maps'],
                  hint: 'Revisit node c11_geo_cbse_23_005 (Classification by Developable Surfaces) and physically model the.',
                  misconception: 'Students often believe "zenithal projections are only for polar maps." In reality, zenithal projections can be centred on **any point**.' }
          ],
            remediations: { 'zenithal-projections-are-only-for': { steps: ['Take a physical globe and a flat sheet of paper.', 'Touch the paper to the globe at the North Pole — this is polar aspect.', 'Now tilt the paper to touch at Mumbai (approx.', '19°N, 73°E) — this is oblique aspect.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_geo_cbse_23_009', difficulty: 'standard',
          question: 'Equidistance, equivalence, and conformality are the three fundamental metric.',
          hint: 'Revisit node c11_geo_cbse_23_005 (developable surfaces) and c8_geo_ch2_3 (distortion.',
          misconception: '**Students believe a "good" projection minimises *all* distortions simultaneously** — e.g., they think Robinson.',
          parts: [
                { id: 'a', prompt: 'Explain why a single map projection cannot simultaneously be both conformal and equivalent.', answer: '**Correct answer:** Conformality requires h = k everywhere',
                  options: ['**Correct answer:** Conformality requires h = k everywhere', 'because Mercator is conformal and Gall-Peters is equivalent', 'some projections like Robinson are both', 'better'],
                  hint: 'Revisit node c11_geo_cbse_23_005 (developable surfaces) and c8_geo_ch2_3 (distortion basics).',
                  misconception: '**Students believe a "good" projection minimises *all* distortions simultaneously** — e.g., they think Robinson or Winkel Tripel are.' },
                { id: 'b', prompt: 'Given the following scale factor data for a hypothetical projection at 30°N latitude: h = 1.15, k = 0.87.', answer: '**Correct answer with working:** (a) Conformal?',
                  options: ['**Correct answer with working:** (a) Conformal?', 'yes equivalent because product ≈ 1', 'better', 'balance'],
                  hint: 'Revisit node c11_geo_cbse_23_005 (developable surfaces) and c8_geo_ch2_3 (distortion basics).',
                  misconception: '**Students believe a "good" projection minimises *all* distortions simultaneously** — e.g., they think Robinson or Winkel Tripel are.' }
          ],
            remediations: { 'students-believe-a-good-projection': { steps: ['** Draw Tissot\'s indicatrix for three projections on the same latitude-longitude grid: Mercator (circles expanding.', '** Overlay India\'s outline on each. **', '** Measure area of Rajasthan vs. Kerala on each map using a planimeter or grid count. **', '** Calculate the ratio (map area / true area) for each state on each projection. **'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
