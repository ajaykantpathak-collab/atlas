import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch12_p1: SimDef = {
    id: 'v3_c10_math_ch12_p1',
    title: 'Surface Areas and Volumes · Part 1/2',
    subtitle: 'Paint and fill shapes built from cones, cylinders and spheres',
    classLevel: 10, subject: 'mathematics', topic: 'Surface Areas and Volumes · Part 1/2',
    chapters: ['c10_math_ch12'],
    nodeIds: ['c10_math_cbse_12_001', 'c10_math_cbse_12_002', 'c10_math_cbse_12_003', 'c10_math_cbse_12_004', 'c10_math_cbse_12_005', 'c10_math_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a packaging engineer', intro: 'Your factory makes odd shapes — a silo that\'s cylinder plus cone, a capsule that\'s cylinder plus two hemispheres. Cost depends on surface area; capacity on volume. Neither formula exists until you build it.', goal: 'Compute surface areas and volumes of combined solids, and solve conversion problems where one solid is melted and recast into another.' },
    discovery: {
        question: 'An ice-cream cone is a cone sitting on a hemisphere. Asked for its total surface area, a student adds \'total surface area of cone + total surface area of hemisphere\' — and gets it wrong. What invisible surface did they accidentally paint?',
        options: ['The joined faces — where cone meets hemisphere, the surfaces touch internally and must be subtracted or never counted', 'The pointed tip of the cone, which has zero area', 'The bottom of the hemisphere — it\'s not exposed', 'Nothing — the method was actually correct'],
        answer: 'The joined faces — where cone meets hemisphere, the surfaces touch internally and must be subtracted or never counted',
        hook: 'Combination solids have hidden faces — wherever two solids touch, that skin is buried inside. Surface area counts only what air can touch.',
    },
    teaching: [
        { title: 'Surface Area of a Combination of Solids: Method', text: 'The surface area of a combination of solids is the total area of all **exposed outer surfaces** of the combined solid.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_12_001', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Decompose real objects — capsules, tents, silos, ice-cream cones — into basic solids, count only the exposed surfaces, and compute volumes where melted solids reshape into new ones.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_001', title: 'Surface Area of a Combination of Solids: Method',
          scaffold: { problem: '** A solid wooden toy is made by mounting a solid hemisphere of radius 3.5 cm on top of a solid right circular cylinder of the same radius.',
            steps: [
            { text: 'Identify the two constituent solids: Cylinder (r = 3.5 cm, h = 10 cm) and Hemisphere (r = 3.5 cm).' },
            { text: 'Determine exposed surfaces. Cylinder: Curved surface (exposed) + Bottom base (exposed, touches ground but painted).' },
            { text: 'Write formulas for exposed parts only. Cylinder CSA = 2πrh. Cylinder bottom base = πr². Hemisphere CSA = 2πr².' },
            { text: 'Substitute values. r = 3.5 cm = 7/2 cm, h = 10 cm.' },
            { text: 'Sum exposed areas. Total TSA = 220 + 38.5 + 77 = **335.5 cm²**.', faded: true, blankAnswer: '** 335.5 cm²' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_002', title: 'Surface Area: Cylinder with Hemispheres at Both Ends',
          scaffold: { problem: 'A medicine capsule is in the shape of a cylinder of diameter 7 mm with two hemispheres stuck at each of its ends.',
            steps: [
            { text: 'Identify given values. Diameter = 7 mm → radius r = 3.5 mm. Total length (height) of capsule H = 22 mm.' },
            { text: 'Find height of cylindrical part h. Since the capsule has two hemispheres, h = H - 2r = 22 - 2(3.5) = 22 - 7 = 15 mm.' },
            { text: 'Write the formula for total surface area of this solid. TSA = CSA of cylinder + 2 × CSA of hemisphere = 2πrh + 2(2πr²).' },
            { text: 'Substitute values. TSA = 2 × (22/7) × 3.5 × (15 + 2×3.5) = 2 × (22/7) × 3.5 × (15 + 7) = 2 × (22/7) × 3.5 × 22.' },
            { text: 'Simplify step by step. 3.5 = 7/2, so (22/7) × (7/2) = 11. Then TSA = 2 × 11 × 22 = 22 × 22 = 484 mm².' },
            { text: 'State final answer with units. Surface area of capsule = 484 mm².', faded: true, blankAnswer: '484 mm²' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_003', title: 'Volume of a Combination of Solids: Method',
          scaffold: { problem: 'A solid toy is in the shape of a right circular cylinder with a hemisphere on one end and a cone on the other end.',
            steps: [
            { text: 'Identify the three component solids and their dimensions. The toy = Hemisphere (radius r = 3.5 cm) + Cylinder (radius.' },
            { text: 'Write the volume formula for each component. V_hemi = (2/3)πr³, V_cyl = πr²h_cyl, V_cone = (1/3)πr²h_cone.' },
            { text: 'Substitute r = 3.5 cm, h_cyl = 10 cm, h_cone = 6 cm, and π = 22/7 into each formula.' },
            { text: 'Compute each volume step by step.' },
            { text: 'Add the three volumes. V_total = 89.833... + 385 + 77 = 551.833... cm³' },
            { text: 'Express answer appropriately. Using π = 22/7 exactly: V_total = (2/3)(22/7)(343/8) + (22/7)(49/4)(10).', faded: true, blankAnswer: '551.83 cm³ (or 551 5/6 cm³ exactly)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_004', title: 'Volume of Combined Solids: Cone on Cylinder, Hemisphere on Cone',
          scaffold: { problem: 'A decorative pillar for a school function is made by placing a solid cone of radius 6 cm and height 8 cm on top of a solid cylinder of the.',
            steps: [
            { text: 'Identify the two solids and their dimensions. Solid 1: Cylinder with r = 6 cm, h_cyl = 15 cm.' },
            { text: 'Write the volume formula for each solid. V_cylinder = πr²h_cyl. V_cone = (1/3)πr²h_cone.' },
            { text: 'Substitute values into cylinder formula. V_cylinder = (22/7) × (6)² × 15 = (22/7) × 36 × 15.' },
            { text: 'Compute cylinder volume stepwise. 36 × 15 = 540. (22/7) × 540 = 11880/7 cm³.' },
            { text: 'Substitute values into cone formula. V_cone = (1/3) × (22/7) × (6)² × 8 = (1/3) × (22/7) × 36 × 8.' },
            { text: 'Compute cone volume stepwise. 36 × 8 = 288. (1/3) × 288 = 96. (22/7) × 96 = 2112/7 cm³.' },
            { text: 'Add the two volumes. V_total = 11880/7 + 2112/7 = 13992/7 = 1998.857... cm³.' },
            { text: 'Round appropriately and state with units. V_total ≈ 1998.86 cm³ (or 13992/7 cm³ as exact fraction).', faded: true, blankAnswer: '13992/7 cm³ or approximately 1998.86 cm³' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_005', title: 'Conversion of Solid from One Shape to Another (Volume Conservation)',
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
        { type: 'scaffold', nodeId: 'c10_math_cbse_12_006', title: 'Frustum of a Cone: Definition and Formation',
          scaffold: { problem: 'A right circular cone of height 24 cm and base radius 10 cm is cut by a plane parallel to the base at a distance of 8 cm from the base.',
            steps: [
            { text: 'Identify the original cone dimensions: Height H = 24 cm, Base radius R = 10 cm.' },
            { text: 'Use similarity of triangles to find the top radius r of the frustum.' },
            { text: 'Solve for r: r = (10 × 16)/24 = 160/24 = 20/3 ≈ 6.67 cm.' },
            { text: 'Find the slant height l of the frustum. First find original cone slant height L = √(H² + R²) = √(24² + 10²) = √(576.' },
            { text: 'State the frustum dimensions clearly: Larger base radius R = 10 cm, Smaller top radius r = 20/3 cm (≈ 6.67 cm).', faded: true, blankAnswer: 'R = 10 cm, r = 20/3 cm (6.67 cm), h = 8 cm, l = 26/3.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_12_006', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a craft fair, a student builds a toy by gluing a cone on top of a hemisphere, base to base. To order paint, her partner adds the full surface areas of both solids — \'every face needs paint.\'',
            decisions: [{ prompt: 'What is wrong with adding the two complete surface areas?', options: [
                { text: 'The joined faces are not exposed — the cone\'s flat base and the hemisphere\'s flat face are glued together inside the toy, so no paint can reach them. The surface to paint is only the cone\'s curved part (πrl) plus the hemisphere\'s curved part (2πr²); the shared circular base must be left out entirely.', outcome: 'For combined solids, surface area means only what is visible from outside — faces glued together vanish from the surface, so each must be excluded once.' },
                { text: 'The partner is right — you paint the toy the same way you\'d paint each solid separately, so add both total surface areas.', outcome: 'That double-counts the joined circle — once as the cone\'s base and once as the hemisphere\'s face — inflating the paint estimate for a surface that no longer exists outside.', reveals: 'joined-face-double-count' },
                { text: 'Subtract the cone\'s base but keep the hemisphere\'s flat face, since it is the \'bottom\' of the toy.', outcome: 'The hemisphere\'s flat face is exactly the circle glued to the cone — it is internal too, so both sides of the join must be excluded.', reveals: 'count-one-joined-face' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'Every complicated solid is basic shapes glued together. Surface area counts the skin, volume counts the stuffing — and the glued faces belong to neither.',
            decisions: [{ prompt: 'What comes next? Surface Areas and Volumes · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Surface Areas and Volumes · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_12_001', difficulty: 'standard',
          question: 'The surface area of a combination of solids is the total area of all **exposed.',
          hint: 'If stuck, revisit **c6_math_ch08_092** (cube/cuboid TSA), **c6_math_ch08_093** (cylinder.',
          misconception: '**The "Add All TSA" Trap:** Students mechanically add the **total surface area formulas** of each individual solid.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** A solid toy is made by joining a cone (radius *r*, slant height *l*) to a hemisphere (radius *r*) base-to-base.', answer: '**Correct answer:** The student\'s expression is **incorrect**',
                  options: ['**Correct answer:** The student\'s expression is **incorrect**', 'we add πr² because it\'s the base of the cone'],
                  hint: 'If stuck, revisit **c6_math_ch08_092** (cube/cuboid TSA), **c6_math_ch08_093** (cylinder CSA/TSA).',
                  misconception: '**The "Add All TSA" Trap:** Students mechanically add the **total surface area formulas** of each individual solid (e.g., for.' },
                { id: 'b', prompt: '**ANALYZE:** Two students calculate the surface area of a solid formed by a cylinder (radius *r*, height *h*) with a hemisphere on **each end** (like.', answer: '**Correct answer:** Student A is correct',
                  options: ['**Correct answer:** Student A is correct', 'total surface area of hemisphere'],
                  hint: 'If stuck, revisit **c6_math_ch08_092** (cube/cuboid TSA), **c6_math_ch08_093** (cylinder CSA/TSA).',
                  misconception: '**The "Add All TSA" Trap:** Students mechanically add the **total surface area formulas** of each individual solid (e.g., for.' }
          ],
            remediations: { 'the-add-all-tsa-trap': { steps: ['**Targeted Remediation (4-step "Face Audit" method):** 1.', '**Draw the net:** Sketch the combined solid and **colour-code** every face — **RED** for joined/internal faces.', '**List per solid:** For each constituent solid, write its TSA formula, then **cross out** the RED terms (joined faces).', 'What remains are GREEN terms.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_002', difficulty: 'standard',
          question: 'The total surface area of a solid formed by a right circular cylinder with two.',
          hint: 'Revisit Class 9 Surface Area of Cylinder (c9_math_ch6_2 area derivation) and.',
          misconception: 'Students use the total height of the solid (cylinder + two hemispheres) directly as \'h\' in the formula TSA = 2πr(h.',
          parts: [
                { id: 'a', prompt: 'Two solids have the same total height of 30 cm and same radius 5 cm. Solid A is a cylinder with two hemispheres at ends.', answer: 'Solid A has larger surface area',
                  options: ['Solid A has larger surface area', 'two hemispheres'],
                  hint: 'Revisit Class 9 Surface Area of Cylinder (c9_math_ch6_2 area derivation) and Sphere/Hemisphere.',
                  misconception: 'Students use the total height of the solid (cylinder + two hemispheres) directly as \'h\' in the formula TSA = 2πr(h + 2r).' }
          ],
            remediations: { 'students-use-the-total-height': { steps: ['Draw the solid and label the total height H and radius r.', 'Explicitly write: "Height of cylinder h = H - 2r".', 'Circle the cylindrical part and each hemisphere separately.', 'Write the formula for each part: Cylinder CSA = 2πrh, Hemisphere CSA = 2πr² (each).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_003', difficulty: 'standard',
          question: 'The volume of a combination of solids is the total space occupied by a 3D.',
          hint: 'If stuck, revisit Class 9 mensuration (c9_math_ch6_8, c9_math_ch6_9) for.',
          misconception: 'Students consistently confuse "volume of combination" with "surface area of combination" — they subtract overlapping.',
          parts: [
                { id: 'a', prompt: 'State the volume formula for a solid formed by placing a hemisphere of radius r on top of a cylinder of the same radius r and height h.', answer: 'Correct answer: V = πr²h + (2/3)πr³',
                  options: ['Correct answer: V = πr²h + (2/3)πr³', 'volume of combination', 'surface area of combination'],
                  hint: 'If stuck, revisit Class 9 mensuration (c9_math_ch6_8, c9_math_ch6_9) for cylinder/cone/sphere.',
                  misconception: 'Students consistently confuse "volume of combination" with "surface area of combination" — they subtract overlapping areas in volume.' },
                { id: 'b', prompt: 'A solid toy is made by fixing a cone of height 12 cm on top of a cylinder of height 8 cm. Both have the same base radius of 5 cm.', answer: 'The student\'s answer is incorrect',
                  options: ['The student\'s answer is incorrect', 'volume of combination', 'surface area of combination'],
                  hint: 'If stuck, revisit Class 9 mensuration (c9_math_ch6_8, c9_math_ch6_9) for cylinder/cone/sphere.',
                  misconception: 'Students consistently confuse "volume of combination" with "surface area of combination" — they subtract overlapping areas in volume.' },
                { id: 'c', prompt: 'Two students solve the same problem: "A solid is made of a cube of side 7 cm with a hemisphere of radius 3.5 cm on top.', answer: 'Student A is correct',
                  options: ['Student A is correct', 'volume of combination', 'surface area of combination'],
                  hint: 'If stuck, revisit Class 9 mensuration (c9_math_ch6_8, c9_math_ch6_9) for cylinder/cone/sphere.',
                  misconception: 'Students consistently confuse "volume of combination" with "surface area of combination" — they subtract overlapping areas in volume.' }
          ],
            remediations: { 'students-consistently-confuse-volume-of': { steps: ['If a student subtracts volumes in a combination problem, immediately stop and ask: "Draw the solid.', 'Shade the cylinder volume in blue and the hemisphere volume in red.', 'Do the blue and red regions overlap in 3D space?" They will see the volumes are side-by-side, not overlapping.', 'Then ask: "In surface area, why did we subtract the circle areas?" Answer: "Because those circles become internal faces.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse "volume of combination" with "surface area of combination" — they subtract overlapping.',
          parts: [
                { id: 'a', prompt: 'A board exam question asks: "A solid iron pole consists of a cylinder of height 220 cm and base diameter 24 cm, which is surmounted by another cylinder.', answer: 'The student\'s volume calculation is correct: 35520π cm³',
                  options: ['The student\'s volume calculation is correct: 35520π cm³', 'volume of combination', 'surface area of combination'],
                  hint: 'If stuck, revisit Class 9 mensuration (c9_math_ch6_8, c9_math_ch6_9) for cylinder/cone/sphere.',
                  misconception: 'Students consistently confuse "volume of combination" with "surface area of combination" — they subtract overlapping areas in volume.' }
          ],
            remediations: { 'students-consistently-confuse-volume-of': { steps: ['If a student subtracts volumes in a combination problem, immediately stop and ask: "Draw the solid.', 'Shade the cylinder volume in blue and the hemisphere volume in red.', 'Do the blue and red regions overlap in 3D space?" They will see the volumes are side-by-side, not overlapping.', 'Then ask: "In surface area, why did we subtract the circle areas?" Answer: "Because those circles become internal faces.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_004', difficulty: 'standard',
          question: 'The volume of a combination of solids formed by joining a cone on top of.',
          hint: 'Review Class 9 mensuration: volume of cylinder, cone, and sphere (specifically hemisphere.',
          misconception: 'Students consistently confuse the volume of a hemisphere with that of a full sphere, writing V_hemisphere = (4/3)πr³.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The volume of a combination of solids formed by joining a cone on top of a cylinder or a',
                  options: ['The volume of a combination of solids formed by joining a cone on top of a cylinder or a', 'The surface area of a combination of solids is the total area of all **exposed outer', 'The total surface area of a solid formed by a right circular cylinder with two', 'The volume of a combination of solids is the total space occupied by a 3D object formed'],
                  hint: 'Review Class 9 mensuration: volume of cylinder, cone, and sphere (specifically hemisphere = half.',
                  misconception: 'Students consistently confuse the volume of a hemisphere with that of a full sphere, writing V_hemisphere = (4/3)πr³ instead of (2/3)πr³.' }
          ],
            remediations: { 'students-consistently-confuse-the-volume': { steps: ['If a student writes V_hemisphere = (4/3)πr³, immediately ask: "What fraction of a sphere is a hemisphere?" Guide them.', 'For the cone factor error, draw a cylinder and cone with same base and height; demonstrate with rice/sand that the cone.', 'Have them write the formula three times: V_cone = (1/3) × base area × height.', 'For radius confusion, emphasize: "Same radius at the joint — underline the radius value in the problem and use it for.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_005', difficulty: 'standard',
          question: 'When a solid is melted and recast into a different shape (or multiple shapes).',
          hint: 'If stuck, revisit c10_math_cbse_12_004 (Volume of Combined Solids) to practice volume.',
          misconception: 'Students equate SURFACE AREAS instead of volumes when a solid is melted and recast.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'When a solid is melted and recast into a different shape (or multiple shapes), the volume',
                  options: ['When a solid is melted and recast into a different shape (or multiple shapes), the volume', 'The surface area of a combination of solids is the total area of all **exposed outer', 'The total surface area of a solid formed by a right circular cylinder with two', 'The volume of a combination of solids is the total space occupied by a 3D object formed'],
                  hint: 'If stuck, revisit c10_math_cbse_12_004 (Volume of Combined Solids) to practice volume formulas, and.',
                  misconception: 'Students equate SURFACE AREAS instead of volumes when a solid is melted and recast.' }
          ],
            remediations: { 'students-equate-surface-areas-instead': { steps: ['Ask the student: "When you melt ice cubes and refreeze them in a different mould, does the amount of water change?', 'Does the outer surface area change?" Connect to volume = amount of material.', 'Show two solids with same volume but different surface areas (e.g., sphere vs long thin cylinder).', 'Calculate both to prove surface area is not conserved.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_12_006', difficulty: 'standard',
          question: 'A frustum of a right circular cone is the solid obtained when a right circular.',
          hint: 'If stuck, revisit Class 9 similar triangles (c9_math_ch4_8) and Class 8 visualising solid.',
          misconception: 'Students confuse the slant height l of the frustum with the slant height L of the original cone, and incorrectly use.',
          parts: [
                { id: 'a', prompt: 'A solid is formed by cutting a right circular cone of height 12 cm and base radius 6 cm with a plane parallel to the base at a distance of 4 cm from the base.', answer: 'The remaining solid is called a frustum of a right circular cone',
                  options: ['The remaining solid is called a frustum of a right circular cone', 'truncated cone', 'one circular face', 'frustum'],
                  hint: 'If stuck, revisit Class 9 similar triangles (c9_math_ch4_8) and Class 8 visualising solid.',
                  misconception: 'Students confuse the slant height l of the frustum with the slant height L of the original cone, and incorrectly use L in place of l when.' }
          ],
            remediations: { 'students-confuse-the-slant-height': { steps: ['If the student confuses l and L: (1) Draw the full original cone with vertex V, base radius R, height H, slant height L.', '(2) Draw the cutting plane at height h from base, creating top radius r.', '(3) Label the removed top cone: height H-h, radius r, slant height l₁.', '(4) Show clearly on the diagram: frustum slant height l = L - l₁.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
