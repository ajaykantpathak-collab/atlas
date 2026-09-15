import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch12_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch12_p2: SimDef = {
    id: 'v3_c10_math_ch12_p2',
    title: 'Surface Areas and Volumes · Part 2/2',
    subtitle: 'Paint and fill shapes built from cones, cylinders and spheres',
    classLevel: 10, subject: 'mathematics', topic: 'Surface Areas and Volumes · Part 2/2',
    chapters: ['c10_math_ch12'],
    nodeIds: ['c10_math_cbse_12_007', 'c10_math_cbse_12_008', 'c10_math_cbse_12_009', 'c10_math_cbse_12_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a packaging engineer', intro: 'Your factory makes odd shapes — a silo that\'s cylinder plus cone, a capsule that\'s cylinder plus two hemispheres. Cost depends on surface area; capacity on volume. Neither formula exists until you build it.', goal: 'Compute surface areas and volumes of combined solids, and solve conversion problems where one solid is melted and recast into another.' },
    discovery: {
        question: 'An ice-cream cone is a cone sitting on a hemisphere. Asked for its total surface area, a student adds \'total surface area of cone + total surface area of hemisphere\' — and gets it wrong. What invisible surface did they accidentally paint?',
        options: ['The joined faces — where cone meets hemisphere, the surfaces touch internally and must be subtracted or never counted', 'The pointed tip of the cone, which has zero area', 'The bottom of the hemisphere — it\'s not exposed', 'Nothing — the method was actually correct'],
        answer: 'The joined faces — where cone meets hemisphere, the surfaces touch internally and must be subtracted or never counted',
        hook: 'Combination solids have hidden faces — wherever two solids touch, that skin is buried inside. Surface area counts only what air can touch.',
    },
    teaching: [
        { title: 'Surface Area of a Frustum of a Cone: Formula', text: 'The curved surface area (CSA) of a frustum of a right circular cone with radii of the two circular ends \\(r_1\\) and \\(r_2\\) (\\(r_1 > r_2\\)) and slant height \\(l\\) is given by \\(\\text{CSA} = \\pi(r_1.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_12_007', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Decompose real objects — capsules, tents, silos, ice-cream cones — into basic solids, count only the exposed surfaces, and compute volumes where melted solids reshape into new ones.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_007', title: 'Surface Area of a Frustum of a Cone: Formula',
          scaffold: { problem: 'A drinking glass is in the shape of a frustum of a cone of height 14 cm. The diameters of its two circular ends are 4 cm and 2 cm.',
            steps: [
            { text: 'Identify given values: vertical height h = 14 cm, larger radius r₁ = 2 cm, smaller radius r₂ = 1 cm.' },
            { text: 'Since slant height l is not given, compute it using the formula l = √[h² + (r₁ - r₂)²].' },
            { text: 'Write the formula for curved surface area of a frustum: CSA = π(r₁ + r₂)l.' },
            { text: 'Substitute the values: CSA = (22/7) × (2 + 1) × √197 = (22/7) × 3 × √197 = (66/7)√197 cm².' },
            { text: 'Approximate √197 ≈ 14.0357. Then CSA ≈ (66/7) × 14.0357 ≈ 9.4286 × 14.0357 ≈ 132.34 cm². State the answer with units.', faded: true, blankAnswer: 'Curved surface area ≈ 132.34 cm² (or exactly (66/7)√197.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_008', title: 'Volume of a Frustum of a Cone: Formula',
          scaffold: { problem: 'A bucket in the shape of a frustum of a cone is used to fetch water from a well.',
            steps: [
            { text: 'Identify given values: R = 28 cm (larger radius), r = 7 cm (smaller radius), h = 45 cm (vertical height).' },
            { text: 'Write the volume formula for frustum: V = (1/3) π h (R² + r² + R r).' },
            { text: 'Substitute the values: V = (1/3) × (22/7) × 45 × (28² + 7² + 28×7).' },
            { text: 'Compute squares and product: 28² = 784, 7² = 49, 28×7 = 196. Sum = 784 + 49 + 196 = 1029.' },
            { text: 'Simplify the expression: V = (1/3) × (22/7) × 45 × 1029. Cancel 7 with 1029 (1029 ÷ 7 = 147).' },
            { text: 'Convert to litres: 1 litre = 1000 cm³. Capacity = 48510 / 1000 = 48.51 litres.', faded: true, blankAnswer: '48.51 litres' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_009', title: 'Word Problems: Melting and Recasting Solids',
          scaffold: { problem: '** A solid metallic sphere of radius 4.2 cm is melted and recast into a solid right circular cylinder of radius 6 cm.',
            steps: [
            { text: 'Identify the original solid (sphere) and the new solid (cylinder).' },
            { text: 'State the principle: "Since the sphere is melted and recast into the cylinder, volume of sphere = volume of cylinder.' },
            { text: 'Write volume formulas:' },
            { text: 'Substitute the values and equate:' },
            { text: 'Simplify step by step:' },
            { text: 'State the final answer with units: Height of cylinder = 2.744 cm.', faded: true, blankAnswer: '** 2.744 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_010', title: 'Word Problems: Surface Area and Volume of Combined Solids',
          scaffold: { problem: 'A wooden toy rocket is in the shape of a cone mounted on a cylinder. The total height of the rocket is 26 cm.',
            steps: [
            { text: 'Extract dimensions. Cone: radius r₁ = 2.5 cm, height h₁ = 6 cm.' },
            { text: 'Identify painted surfaces. Orange (cone): Curved surface area of cone only (base is joined to cylinder, not painted).' },
            { text: 'Compute slant height of cone: l = √(r₁² + h₁²) = √(2.5² + 6²) = √(6.25 + 36) = √42.25 = 6.5 cm.' },
            { text: 'Orange area = CSA of cone + area of annular base = πr₁l + π(r₁² - r₂²) = 3.14 × 2.5 × 6.5 + 3.14 × (6.25 - 2.25).' },
            { text: 'Yellow area = CSA of cylinder + area of bottom base = 2πr₂h₂ + πr₂² = 2 × 3.14 × 1.5 × 20 + 3.14 × 2.25 = 188.4 + 7.065.' },
            { text: 'Volume of wood = Volume of cone + Volume of cylinder = 1/3 πr₁²h₁ + πr₂²h₂ = 1/3 × 3.14 × 6.25 × 6 + 3.14 × 2.25 × 20.', faded: true, blankAnswer: 'Orange painted area = 63.585 cm², Yellow painted area.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_12_010', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a craft fair, a student builds a toy by gluing a cone on top of a hemisphere, base to base. To order paint, her partner adds the full surface areas of both solids — \'every face needs paint.\'',
            decisions: [{ prompt: 'What is wrong with adding the two complete surface areas?', options: [
                { text: 'The joined faces are not exposed — the cone\'s flat base and the hemisphere\'s flat face are glued together inside the toy, so no paint can reach them. The surface to paint is only the cone\'s curved part (πrl) plus the hemisphere\'s curved part (2πr²); the shared circular base must be left out entirely.', outcome: 'For combined solids, surface area means only what is visible from outside — faces glued together vanish from the surface, so each must be excluded once.' },
                { text: 'The partner is right — you paint the toy the same way you\'d paint each solid separately, so add both total surface areas.', outcome: 'That double-counts the joined circle — once as the cone\'s base and once as the hemisphere\'s face — inflating the paint estimate for a surface that no longer exists outside.', reveals: 'joined-face-double-count' },
                { text: 'Subtract the cone\'s base but keep the hemisphere\'s flat face, since it is the \'bottom\' of the toy.', outcome: 'The hemisphere\'s flat face is exactly the circle glued to the cone — it is internal too, so both sides of the join must be excluded.', reveals: 'count-one-joined-face' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_12_010', title: 'You made it',
          caseStudy: { intro: 'Every complicated solid is basic shapes glued together. Surface area counts the skin, volume counts the stuffing — and the glued faces belong to neither.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_12_007', difficulty: 'standard',
          question: 'The curved surface area (CSA) of a frustum of a right circular cone with radii.',
          hint: 'Revisit c8_math_ch9_5 (Pythagoras theorem) and c9_math_ch6_8 (area of circle) — practice.',
          misconception: 'Students frequently use \\(r_1 + r_2\\) in the slant height formula \\(l = \\sqrt{h^2 + (r_1 + r_2)^2}\\) instead of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The curved surface area (CSA) of a frustum of a right circular cone with radii of the two',
                  options: ['The curved surface area (CSA) of a frustum of a right circular cone with radii of the two', 'The surface area of a combination of solids is the total area of all **exposed outer', 'The total surface area of a solid formed by a right circular cylinder with two', 'The volume of a combination of solids is the total space occupied by a 3D object formed'],
                  hint: 'Revisit c8_math_ch9_5 (Pythagoras theorem) and c9_math_ch6_8 (area of circle) — practice finding.',
                  misconception: 'Students frequently use \\(r_1 + r_2\\) in the slant height formula \\(l = \\sqrt{h^2 + (r_1 + r_2)^2}\\) instead of the correct \\(l = \\sqrt{h^2.' }
          ],
            remediations: { 'students-frequently-use-r-1': { steps: ['If a student makes this error, draw a vertical cross-section of the frustum through its axis.', 'Show the trapezoid formed.', 'Drop perpendiculars from the smaller radius endpoints to the larger base, creating a right triangle with vertical leg.', 'The slant height \\(l\\) is the hypotenuse of this right triangle.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_008', difficulty: 'standard',
          question: 'The volume of a frustum of a right circular cone is the amount of space.',
          hint: 'Revise Class 9 volume of right circular cone (NCERT Chapter 13) and Class 10 Pythagoras.',
          misconception: 'Students frequently substitute the slant height (l) instead of the vertical height (h) into the volume formula.',
          parts: [
                { id: 'a', prompt: 'A student writes the volume of a frustum as V = (1/3)πh(R³ - r³)/(R - r). Is this equivalent to the standard formula?', answer: 'Yes, it is equivalent',
                  options: ['Yes, it is equivalent', 'difference of volumes of two cones'],
                  hint: 'Revise Class 9 volume of right circular cone (NCERT Chapter 13) and Class 10 Pythagoras theorem.',
                  misconception: 'Students frequently substitute the slant height (l) instead of the vertical height (h) into the volume formula V = (1/3)πh(R² + r² + Rr).' }
          ],
            remediations: { 'students-frequently-substitute-the-slant': { steps: ['If a student uses slant height in the volume formula: 1.', 'Draw a side-view cross-section of the frustum as a trapezium.', 'Label the two radii (R and r) as horizontal segments, the slant height (l) as the slanted side, and the vertical height.', 'Drop a perpendicular from the smaller radius endpoint to the larger radius, forming a right triangle with base (R - r).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_009', difficulty: 'standard',
          question: 'When a solid is melted and recast into one or more new solids, the total volume.',
          hint: 'Revisit volume formulas in c10_math_cbse_12_003 and c10_math_cbse_12_004, and equation.',
          misconception: '**Equating surface areas instead of volumes.** Students often write "2πrh + 2πr² = 4πR²" (cylinder TSA = sphere TSA).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'When a solid is melted and recast into one or more new solids, the total volume of the',
                  options: ['When a solid is melted and recast into one or more new solids, the total volume of the', 'The surface area of a combination of solids is the total area of all **exposed outer', 'The total surface area of a solid formed by a right circular cylinder with two', 'The volume of a combination of solids is the total space occupied by a 3D object formed'],
                  hint: 'Revisit volume formulas in c10_math_cbse_12_003 and c10_math_cbse_12_004, and equation solving.',
                  misconception: '**Equating surface areas instead of volumes.** Students often write "2πrh + 2πr² = 4πR²" (cylinder TSA = sphere TSA) because they associate.' }
          ],
            remediations: { 'equating-surface-areas-instead-of': { steps: ['** Ask the student to physically demonstrate with playdough: make a cylinder, mash it into a sphere.', '** Give a checklist for every problem: ① Identify original solid(s) → write total volume expression.', '** Practice 3 problems where the only difference is: one asks for number of balls, one asks for radius of new solid.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Equating surface areas instead of volumes.** Students often write "2πrh + 2πr² = 4πR²" (cylinder TSA = sphere TSA).',
          parts: [
                { id: 'a', prompt: 'A student solves: "A cone (h=24 cm, r=6 cm) is melted into a sphere.', answer: 'The **numerical answer (6 cm) is correct**, but the reasoning is **incomplete**',
                  options: ['The **numerical answer (6 cm) is correct**, but the reasoning is **incomplete**', 'radius can\'t be same'],
                  hint: 'Revisit volume formulas in c10_math_cbse_12_003 and c10_math_cbse_12_004, and equation solving.',
                  misconception: '**Equating surface areas instead of volumes.** Students often write "2πrh + 2πr² = 4πR²" (cylinder TSA = sphere TSA) because they associate.' }
          ],
            remediations: { 'equating-surface-areas-instead-of': { steps: ['** Ask the student to physically demonstrate with playdough: make a cylinder, mash it into a sphere.', '** Give a checklist for every problem: ① Identify original solid(s) → write total volume expression.', '** Practice 3 problems where the only difference is: one asks for number of balls, one asks for radius of new solid.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_010', difficulty: 'standard',
          question: 'Word problems on surface area and volume of combined solids require translating.',
          hint: 'Revisit c10_math_cbse_12_001 (surface area method) and c10_math_cbse_12_003 (volume.',
          misconception: 'Students treat the total height of a combined solid (e.g., cone on hemisphere) as the height of the top solid.',
          parts: [
                { id: 'a', prompt: 'A solid iron pole consists of a cylinder of height 220 cm and base diameter 24 cm, surmounted by another cylinder of height 60 cm and radius 8 cm.', answer: 'Step 1: Radius of lower cylinder = 12 cm, height = 220 cm',
                  options: ['Step 1: Radius of lower cylinder = 12 cm, height = 220 cm', 'radius 8 cm'],
                  hint: 'Revisit c10_math_cbse_12_001 (surface area method) and c10_math_cbse_12_003 (volume method).',
                  misconception: 'Students treat the total height of a combined solid (e.g., cone on hemisphere) as the height of the top solid, forgetting to subtract the.' }
          ],
            remediations: { 'students-treat-the-total-height': { steps: ['When a student makes this height error, immediately ask: "Draw the solid and label the total height.', 'Where does the cone start?', 'What is the height of the hemisphere?" Make them physically measure a hemisphere (radius = height).', 'Then re-read the problem: "Total height = height of cone + height of hemisphere." Write the equation: h_cone = H_total.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
