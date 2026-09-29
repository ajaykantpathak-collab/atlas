import type { SimDef } from '../../engine/types';
import C10_MathematicsSurfaceAreasAndVolumesSim from '../../../simulations/c6_12/C10_MathematicsSurfaceAreasAndVolumesSim';

/** v3 wrapped master — C10_MathematicsSurfaceAreasAndVolumesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_mathematicssurfaceareasandvolumessim: SimDef = {
    id: 'v3w_c10_mathematicssurfaceareasandvolumessim',
    title: 'Area of a Combination of Plane Figures (Circle + Polygon)',
    subtitle: 'This node covers composite figures made of circles (or sectors/segments) combined with.',
    classLevel: 10, subject: 'mathematics', topic: 'Area of a Combination of Plane Figures (Circle + Polygon)',
    chapters: [],
    nodeIds: ['c10_math_cbse_11_008', 'c10_math_cbse_12_005', 'c10_math_cbse_12_009', 'c10_math_cbse_12_010', 'c10_math_cbse_11_010', 'c10_math_cbse_12_001', 'c10_math_cbse_12_002', 'c10_math_cbse_12_006', 'c10_math_cbse_12_007', 'c10_math_cbse_12_003', 'c10_math_cbse_12_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine a circular park with a square fountain built inside it.', goal: 'Master Area of a Combination of Plane Figures (Circle + Polygon).' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'The area of a combination of plane figures.', text: 'The area of a combination of plane figures (such as a circle and a polygon) is found by adding or subtracting the areas of the individual component shapes.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_math_cbse_11_008', title: 'The area of a combination of plane.',
          scaffold: { problem: 'Find the area of the shaded region in the given figure where a square ABCD is inscribed in a circle of radius 7 cm.',
            steps: [
            { text: 'Identify: Square inscribed in circle → diagonal of square = diameter of circle = 2 × 7 = 14 cm.' },
            { text: 'Side of square: diagonal = a√2 = 14, so a = 14/√2 = 7√2 cm.' },
            { text: 'Area of circle = πr² = π × 49 = 49π cm².' },
            { text: 'Area of square = a² = (7√2)² = 98 cm².' },
            { text: 'Shaded area = Area of circle − Area of square = 49π − 98 = 49(π − 2) ≈ 49 × 1.14 ≈ 55.86 cm².', faded: true, blankAnswer: 'Shaded area = 49(π − 2) ≈ 55.86 cm².' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_005', title: 'When a solid is melted and recast into.',
          scaffold: { problem: 'A solid metallic sphere of radius 10.5 cm is melted and recast into a number of smaller solid cones, each of radius 3.5 cm and height 3 cm.',
            steps: [
            { text: 'Identify given: Sphere radius R = 10.5 cm = 21/2 cm. Cone radius r = 3.5 cm = 7/2 cm. Cone height h = 3 cm.' },
            { text: 'Write volume formulas: Volume of sphere = (4/3)πR³. Volume of one cone = (1/3)πr²h.' },
            { text: 'Apply volume conservation: Volume of sphere = n × Volume of one cone, where n = number of cones.' },
            { text: 'Substitute values: (4/3)π(21/2)³ = n × (1/3)π(7/2)²(3).' },
            { text: 'Cancel common factors: π cancels. (1/3) cancels partially. (4/3) / (1/3) = 4. So 4 × (21/2)³ = n × (7/2)² × 3.' },
            { text: 'Compute powers: (21/2)³ = 9261/8. (7/2)² = 49/4.' },
            { text: 'Equation: 4 × (9261/8) = n × (49/4) × 3 → (9261/2) = n × (147/4).' },
            { text: 'Solve for n: n = (9261/2) × (4/147) = (9261 × 2) / 147 = 18522 / 147 = 126.', faded: true, blankAnswer: '126 cones' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_009', title: 'When a solid is melted and recast into.',
          scaffold: { problem: '** A solid metallic sphere of radius 4.2 cm is melted and recast into a solid right circular cylinder of radius 6 cm.',
            steps: [
            { text: 'Identify the original solid (sphere) and the new solid (cylinder).' },
            { text: 'State the principle: "Since the sphere is melted and recast into the cylinder, volume of sphere = volume of cylinder.' },
            { text: 'Write volume formulas:' },
            { text: 'Substitute the values and equate:' },
            { text: 'Simplify step by step:' },
            { text: 'State the final answer with units: Height of cylinder = 2.744 cm.', faded: true, blankAnswer: '** 2.744 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_010', title: 'Word problems on surface area and.',
          scaffold: { problem: 'A wooden toy rocket is in the shape of a cone mounted on a cylinder. The total height of the rocket is 26 cm.',
            steps: [
            { text: 'Extract dimensions. Cone: radius r₁ = 2.5 cm, height h₁ = 6 cm.' },
            { text: 'Identify painted surfaces. Orange (cone): Curved surface area of cone only (base is joined to cylinder, not painted).' },
            { text: 'Compute slant height of cone: l = √(r₁² + h₁²) = √(2.5² + 6²) = √(6.25 + 36) = √42.25 = 6.5 cm.' },
            { text: 'Orange area = CSA of cone + area of annular base = πr₁l + π(r₁² - r₂²) = 3.14 × 2.5 × 6.5 + 3.14 × (6.25 - 2.25) =.' },
            { text: 'Yellow area = CSA of cylinder + area of bottom base = 2πr₂h₂ + πr₂² = 2 × 3.14 × 1.5 × 20 + 3.14 × 2.25 = 188.4 + 7.065.' },
            { text: 'Volume of wood = Volume of cone + Volume of cylinder = 1/3 πr₁²h₁ + πr₂²h₂ = 1/3 × 3.14 × 6.25 × 6 + 3.14 × 2.25 × 20 =.', faded: true, blankAnswer: 'Orange painted area = 63.585 cm², Yellow painted area =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_11_010', title: 'Word problems on area of combined.',
          scaffold: { problem: 'A rectangular garden 30 m long and 20 m wide has two semicircular flower beds on its two shorter sides (outside the rectangle).',
            steps: [
            { text: 'Identify the shapes and given dimensions. The figure consists of a rectangle (30 m × 20 m) and two semicircles on the.' },
            { text: 'Determine the operation. The flower beds are outside the rectangle, so the total area = Area of rectangle + Area of two.' },
            { text: 'Write the formulas and substitute values. Area of rectangle = length × breadth = 30 × 20 = 600 m².' },
            { text: 'Compute total area. Total area = 600 + 2200/7 = (4200/7 + 2200/7) = 6400/7 ≈ 914.29 m².' },
            { text: 'Compute cost. Cost = Total area × Rate = (6400/7) × 15 = 96000/7 = ₹13,714.29 (approx).', faded: true, blankAnswer: 'Total area = 6400/7 m² (≈ 914.29 m²); Cost of levelling =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_001', title: 'The surface area of a combination of.',
          scaffold: { problem: '** A solid wooden toy is made by mounting a solid hemisphere of radius 3.5 cm on top of a solid right circular cylinder of the same radius.',
            steps: [
            { text: 'Identify the two constituent solids: Cylinder (r = 3.5 cm, h = 10 cm) and Hemisphere (r = 3.5 cm).' },
            { text: 'Determine exposed surfaces. Cylinder: Curved surface (exposed) + Bottom base (exposed, touches ground but painted) +.' },
            { text: 'Write formulas for exposed parts only. Cylinder CSA = 2πrh. Cylinder bottom base = πr². Hemisphere CSA = 2πr².' },
            { text: 'Substitute values. r = 3.5 cm = 7/2 cm, h = 10 cm.' },
            { text: 'Sum exposed areas. Total TSA = 220 + 38.5 + 77 = **335.5 cm²**.', faded: true, blankAnswer: '** 335.5 cm²' }
            ] } },
        { type: 'dissect', nodeId: 'c10_math_cbse_12_005', title: 'Identify each idea',
          dissect: { specimen: 'Area of a Combination of Plane Figures (Circle + Polygon)', spots: [
            { id: 's1', label: 'The area of a combination', prompt: 'Which idea is this? — The area of a combination of plane figures (such as a circle and a polygon) is found by.', answer: 'The area of a combination', options: ['The area of a combination', 'When a solid is melted', 'Word problems on surface area', 'Word problems on area of'] },
            { id: 's2', label: 'When a solid is melted', prompt: 'Which idea is this? — When a solid is melted and recast into a different shape (or multiple shapes), the volume.', answer: 'When a solid is melted', options: ['When a solid is melted', 'The area of a combination', 'Word problems on surface area', 'Word problems on area of'] },
            { id: 's3', label: 'Word problems on surface area', prompt: 'Which idea is this? — Word problems on surface area and volume of combined solids require translating a.', answer: 'Word problems on surface area', options: ['Word problems on surface area', 'The area of a combination', 'When a solid is melted', 'Word problems on area of'] },
            { id: 's4', label: 'Word problems on area of', prompt: 'Which idea is this? — Word problems on area of combined regions require calculating the total area of a plane.', answer: 'Word problems on area of', options: ['Word problems on area of', 'The area of a combination', 'When a solid is melted', 'Word problems on surface area'] },
            { id: 's5', label: 'The surface area of a', prompt: 'Which idea is this? — The surface area of a combination of solids is the total area of all **exposed outer.', answer: 'The surface area of a', options: ['The surface area of a', 'The area of a combination', 'When a solid is melted', 'Word problems on surface area'] }
          ] } }
    ],
    explore: { component: C10_MathematicsSurfaceAreasAndVolumesSim, prompt: 'Explore the interactive — Area of a Combination of Plane Figures (Circle + Polygon)' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_11_008', difficulty: 'standard',
          question: 'The area of a combination of plane figures (such as a circle and a polygon) is.',
          hint: 'Review individual area formulas (c10_math_cbse_11_001, c9_math_ch6_11) and practice.',
          misconception: 'Students often confuse inscribed vs circumscribed figures: (1) Square inscribed in circle → diagonal of square =.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The area of a combination of plane figures (such as a circle and a polygon) is found by',
                  options: ['The area of a combination of plane figures (such as a circle and a polygon) is found by', 'When a solid is melted and recast into a different shape (or multiple shapes), the volume', 'When a solid is melted and recast into one or more new solids, the total volume of the', 'Word problems on surface area and volume of combined solids require translating a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse inscribed vs circumscribed figures: (1) Square inscribed in circle → diagonal of square = diameter of circle.' }
          ],
            remediations: { 'students-often-confuse-inscribed-vs': { steps: ['Draw each composite figure and color-code the component shapes.', 'For each problem, write: "Shaded area = [shape 1] ± [shape 2]" before computing.', 'Practice the two key relationships: inscribed square (diagonal = diameter), inscribed circle (side = diameter).', 'Always check: does the answer make sense?'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_005', difficulty: 'standard',
          question: 'When a solid is melted and recast into a different shape (or multiple shapes),.',
          hint: 'If stuck, revisit c10_math_cbse_12_004 (Volume of Combined Solids) to practice volume.',
          misconception: 'Students equate SURFACE AREAS instead of volumes when a solid is melted and recast.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'When a solid is melted and recast into a different shape (or multiple shapes), the volume',
                  options: ['When a solid is melted and recast into a different shape (or multiple shapes), the volume', 'The area of a combination of plane figures (such as a circle and a polygon) is found by', 'When a solid is melted and recast into one or more new solids, the total volume of the', 'Word problems on surface area and volume of combined solids require translating a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate SURFACE AREAS instead of volumes when a solid is melted and recast.' }
          ],
            remediations: { 'students-equate-surface-areas-instead': { steps: ['Ask the student: "When you melt ice cubes and refreeze them in a different mould, does the amount of water change?', 'Does the outer surface area change?" Connect to volume = amount of material.', 'Show two solids with same volume but different surface areas (e.g., sphere vs long thin cylinder).', 'Calculate both to prove surface area is not conserved.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_009', difficulty: 'standard',
          question: 'When a solid is melted and recast into one or more new solids, the total volume.',
          hint: 'Revisit volume formulas in c10_math_cbse_12_003 and c10_math_cbse_12_004, and equation.',
          misconception: '**Equating surface areas instead of volumes.** Students often write "2πrh + 2πr² = 4πR²" (cylinder TSA = sphere TSA).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'When a solid is melted and recast into one or more new solids, the total volume of the',
                  options: ['When a solid is melted and recast into one or more new solids, the total volume of the', 'The area of a combination of plane figures (such as a circle and a polygon) is found by', 'When a solid is melted and recast into a different shape (or multiple shapes), the volume', 'Word problems on surface area and volume of combined solids require translating a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Equating surface areas instead of volumes.** Students often write "2πrh + 2πr² = 4πR²" (cylinder TSA = sphere TSA) because they associate.' }
          ],
            remediations: { 'equating-surface-areas-instead-of': { steps: ['** Ask the student to physically demonstrate with playdough: make a cylinder, mash it into a sphere.', '** Give a checklist for every problem: ① Identify original solid(s) → write total volume expression.', '** Practice 3 problems where the only difference is: one asks for number of balls, one asks for radius of new solid,.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Equating surface areas instead of volumes.** Students often write "2πrh + 2πr² = 4πR²" (cylinder TSA = sphere TSA).',
          parts: [
                { id: 'a', prompt: 'A student solves: "A cone (h=24 cm, r=6 cm) is melted into a sphere.', answer: 'The **numerical answer (6 cm) is correct**, but the reasoning is **incomplete**',
                  options: ['The **numerical answer (6 cm) is correct**, but the reasoning is **incomplete**', 'radius can\'t be same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Equating surface areas instead of volumes.** Students often write "2πrh + 2πr² = 4πR²" (cylinder TSA = sphere TSA) because they associate.' }
          ],
            remediations: { 'equating-surface-areas-instead-of': { steps: ['** Ask the student to physically demonstrate with playdough: make a cylinder, mash it into a sphere.', '** Give a checklist for every problem: ① Identify original solid(s) → write total volume expression.', '** Practice 3 problems where the only difference is: one asks for number of balls, one asks for radius of new solid,.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_010', difficulty: 'standard',
          question: 'Word problems on surface area and volume of combined solids require translating.',
          hint: 'Revisit c10_math_cbse_12_001 (surface area method) and c10_math_cbse_12_003 (volume.',
          misconception: 'Students treat the total height of a combined solid (e.g., cone on hemisphere) as the height of the top solid,.',
          parts: [
                { id: 'a', prompt: 'A solid iron pole consists of a cylinder of height 220 cm and base diameter 24 cm, surmounted by another cylinder of height 60 cm and radius 8 cm.', answer: 'Step 1: Radius of lower cylinder = 12 cm, height = 220 cm',
                  options: ['Step 1: Radius of lower cylinder = 12 cm, height = 220 cm', 'radius 8 cm'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the total height of a combined solid (e.g., cone on hemisphere) as the height of the top solid, forgetting to subtract the.' }
          ],
            remediations: { 'students-treat-the-total-height': { steps: ['When a student makes this height error, immediately ask: "Draw the solid and label the total height.', 'Where does the cone start?', 'What is the height of the hemisphere?" Make them physically measure a hemisphere (radius = height).', 'Then re-read the problem: "Total height = height of cone + height of hemisphere." Write the equation: h_cone = H_total.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the total height of a combined solid (e.g., cone on hemisphere) as the height of the top solid,.',
          parts: [
                { id: 'a', prompt: 'A student solves: "A solid is a cone on a hemisphere with same radius 7 cm. Total height = 21 cm.', answer: 'The student used total height 21 cm as the height of the cone',
                  options: ['The student used total height 21 cm as the height of the cone', 'height confusion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the total height of a combined solid (e.g., cone on hemisphere) as the height of the top solid, forgetting to subtract the.' }
          ],
            remediations: { 'students-treat-the-total-height': { steps: ['When a student makes this height error, immediately ask: "Draw the solid and label the total height.', 'Where does the cone start?', 'What is the height of the hemisphere?" Make them physically measure a hemisphere (radius = height).', 'Then re-read the problem: "Total height = height of cone + height of hemisphere." Write the equation: h_cone = H_total.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_11_010', difficulty: 'standard',
          question: 'Word problems on area of combined regions require calculating the total area of.',
          hint: 'If stuck, revisit c10_math_cbse_11_008 (Area of a Combination of Plane Figures) and.',
          misconception: 'Students often treat the combined region as a single formula rather than decomposing it.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Word problems on area of combined regions require calculating the total area of a plane',
                  options: ['Word problems on area of combined regions require calculating the total area of a plane', 'The area of a combination of plane figures (such as a circle and a polygon) is found by', 'When a solid is melted and recast into a different shape (or multiple shapes), the volume', 'When a solid is melted and recast into one or more new solids, the total volume of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the combined region as a single formula rather than decomposing it.' }
          ],
            remediations: { 'students-often-treat-the-combined': { steps: ['If a student cannot decompose the figure: 1.', 'Ask them to trace the boundary of the shaded region with a coloured pen.', 'Have them list every distinct shape they see (circle, triangle, rectangle).', 'For each shape, write its area formula next to it on the diagram.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_001', difficulty: 'standard',
          question: 'The surface area of a combination of solids is the total area of all **exposed.',
          hint: 'If stuck, revisit **c6_math_ch08_092** (cube/cuboid TSA), **c6_math_ch08_093** (cylinder.',
          misconception: '**The "Add All TSA" Trap:** Students mechanically add the **total surface area formulas** of each individual solid.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** A solid toy is made by joining a cone (radius *r*, slant height *l*) to a hemisphere (radius *r*) base-to-base.', answer: '**Correct answer:** The student\'s expression is **incorrect**',
                  options: ['**Correct answer:** The student\'s expression is **incorrect**', 'we add πr² because it\'s the base of the cone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Add All TSA" Trap:** Students mechanically add the **total surface area formulas** of each individual solid (e.g., for.' },
                { id: 'b', prompt: '**ANALYZE:** Two students calculate the surface area of a solid formed by a cylinder (radius *r*, height *h*) with a hemisphere on **each end** (like a.', answer: '**Correct answer:** Student A is correct',
                  options: ['**Correct answer:** Student A is correct', 'total surface area of hemisphere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Add All TSA" Trap:** Students mechanically add the **total surface area formulas** of each individual solid (e.g., for.' }
          ],
            remediations: { 'the-add-all-tsa-trap': { steps: ['**Targeted Remediation (4-step "Face Audit" method):** 1.', '**Draw the net:** Sketch the combined solid and **colour-code** every face — **RED** for joined/internal faces,.', '**List per solid:** For each constituent solid, write its TSA formula, then **cross out** the RED terms (joined faces).', 'What remains are GREEN terms.'] } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**The "Add All TSA" Trap:** Students mechanically add the **total surface area formulas** of each individual solid.',
          parts: [
                { id: 'a', prompt: '**ANALYZE:** Two students calculate the surface area of a solid formed by a cylinder (radius *r*, height *h*) with a hemisphere on **each end** (like a.', answer: '**Correct answer:** Student A is correct',
                  options: ['**Correct answer:** Student A is correct', 'total surface area of hemisphere'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**The "Add All TSA" Trap:** Students mechanically add the **total surface area formulas** of each individual solid (e.g., for.' }
          ],
            remediations: { 'the-add-all-tsa-trap': { steps: ['**Targeted Remediation (4-step "Face Audit" method):** 1.', '**Draw the net:** Sketch the combined solid and **colour-code** every face — **RED** for joined/internal faces,.', '**List per solid:** For each constituent solid, write its TSA formula, then **cross out** the RED terms (joined faces).', 'What remains are GREEN terms.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
