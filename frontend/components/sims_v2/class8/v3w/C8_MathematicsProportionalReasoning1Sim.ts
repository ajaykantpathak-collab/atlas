import type { SimDef } from '../../engine/types';
import C8_MathematicsProportionalReasoning1Sim from '../../../simulations/c6_12/C8_MathematicsProportionalReasoning1Sim';

/** v3 wrapped master — C8_MathematicsProportionalReasoning1Sim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicsproportionalreasoning1sim: SimDef = {
    id: 'v3w_c8_mathematicsproportionalreasoning1sim',
    title: 'Proportional Reasoning1',
    subtitle: 'Covers identification and comparison of multiplicative vs additive changes in.',
    classLevel: 8, subject: 'mathematics', topic: 'Proportional Change: Multiplicative vs Additive Changes',
    chapters: [],
    nodeIds: ['c8_math_ch7_1', 'c8_math_ch7_10', 'c8_math_ch10_3', 'c8_math_ch7_4', 'c8_math_ch7_5', 'c8_math_ch7_6', 'c8_math_ch7_8', 'c8_math_ch7_9', 'c8_math_ch10_10', 'c8_math_ch10_5', 'c8_math_ch10_7', 'c8_math_ch10_9', 'c8_math_ch12_12', 'c8_math_ch12_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you are helping your mother adjust a recipe for *aloo paratha* filling.', goal: 'Master Proportional Reasoning1.' },
    discovery: {
        question: 'Riya has a 10 cm × 6 cm photo. She wants to enlarge it to a width of 25 cm.',
        options: ['The original aspect ratio is 10:6 = 5:3', 'adding keeps the shape the same', 'change'],
        answer: 'The original aspect ratio is 10:6 = 5:3',
        hook: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and.',
    },
    teaching: [
        { title: 'Proportional change refers to a change where.', text: 'Proportional change refers to a change where quantities vary in a constant ratio.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch7_1', title: 'Proportional change refers to a change.',
          scaffold: { problem: 'A *chana masala* recipe for 6 people uses 300 g chickpeas and 150 g onions. You need to cook for 9 people.',
            steps: [
            { text: 'Identify the original ratio of chickpeas to onions: 300 g : 150 g = 2 : 1 (divide both by 150).' },
            { text: 'Determine the scale factor for number of people: 9 people ÷ 6 people = 1.5 (or 3/2).' },
            { text: 'Apply multiplicative change: Multiply EACH ingredient by 1.5. Chickpeas: 300 g × 1.5 = 450 g.' },
            { text: 'Verify the ratio is preserved: 450 : 225 = 2 : 1 (divide both by 225). Correct.' },
            { text: 'Show additive error: If we added 150 g to each (since 9-6=3 people, maybe add half?), chickpeas = 450 g, onions = 300 g.', faded: true, blankAnswer: '450 g chickpeas and 225 g onions.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_10', title: 'When an image is scaled (enlarged or.',
          scaffold: { problem: 'A school\'s rectangular notice board is 120 cm wide and 80 cm tall.',
            steps: [
            { text: 'Identify given values: original width w₁ = 120 cm, original height h₁ = 80 cm, new width w₂ = 45 cm.' },
            { text: 'Check if similarity is required — "same shape" means the two rectangles must be similar, so aspect ratio must be.' },
            { text: 'Set up the proportion: 120/80 = 45/h₂. Simplify left side: 120/80 = 12/8 = 3/2. So 3/2 = 45/h₂.' },
            { text: 'Solve by cross-multiplication: 3 × h₂ = 2 × 45 → 3h₂ = 90 → h₂ = 90/3 = 30.' },
            { text: 'Verify: new dimensions 45 cm × 30 cm give ratio 45/30 = 3/2, matching original 3/2. Units are cm. Answer: 30 cm.', faded: true, blankAnswer: '30 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_3', title: 'Calculating actual distances from map.',
          scaffold: { problem: 'On a map of Rajasthan with RF 1 : 2,000,000, the distance between Jaipur and Jodhpur measures 3.6 cm.',
            steps: [
            { text: 'Identify given values: RF = 1 : 2,000,000, map distance = 3.6 cm. Required: actual distance in km.' },
            { text: 'Write the proportion: map distance / actual distance = 1 / 2,000,000.' },
            { text: 'Multiply: 3.6 × 2,000,000 = 7,200,000 cm. (3.6 × 2 = 7.2; append six zeros → 7,200,000)' },
            { text: 'Convert cm to km: 1 km = 100,000 cm. Divide 7,200,000 by 100,000 = 72 km. (Cancel five zeros: 7,200,000 / 100,000 = 72)' },
            { text: 'Interpret: The actual straight-line distance between Jaipur and Jodhpur on this map scale is 72 km.', faded: true, blankAnswer: '72 km' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_4', title: 'Two ratios a:b and c:d are equivalent.',
          scaffold: { problem: 'A recipe for 6 people uses 300 g of flour and 200 g of sugar. How much flour and sugar are needed for 15 people?',
            steps: [
            { text: 'Identify the given ratio and what is asked. The flour-to-sugar ratio is 300:200.' },
            { text: 'Find the scaling factor. Since 6 people → 15 people, the factor is 15 ÷ 6 = 2.5 (or 5/2).' },
            { text: 'Multiply both terms of the ratio by the scaling factor. Flour: 300 × 2.5 = 750 g. Sugar: 200 × 2.5 = 500 g.' },
            { text: 'Verify using equivalent ratio property. Original ratio 300:200 simplifies to 3:2.' },
            { text: 'State the answer with units. For 15 people, use 750 g flour and 500 g sugar.', faded: true, blankAnswer: '750 g flour and 500 g sugar' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_5', title: 'A proportional relationship exists.',
          scaffold: { problem: 'A tailor in Jaipur stitches shirts. The table shows the number of shirts stitched and the total metres of cloth used.',
            steps: [
            { text: 'Identify the two quantities: number of shirts (s) and metres of cloth (c). We need to check if c/s is constant.' },
            { text: 'Compute the ratio cloth/shirts for each row: 6/4 = 1.5, 10.5/7 = 1.5, 15/10 = 1.5, 19.5/13 = 1.5.' },
            { text: 'Observe that all ratios equal 1.5. Therefore, the relationship is proportional.' },
            { text: 'The constant of proportionality k = 1.5 metres per shirt. Write the equation: c = 1.5s.' },
            { text: 'Verify with a new value: for 20 shirts, cloth = 1.5 × 20 = 30 m. The ratio 30/20 = 1.5 holds.', faded: true, blankAnswer: 'Yes, proportional. Constant of proportionality = 1.5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_6', title: 'The unitary method is a technique for.',
          scaffold: { problem: 'A school canteen buys 12.5 kg of rice for ₹625. They need to cook 3.2 kg for today\'s lunch. What is the cost of the rice used?',
            steps: [
            { text: 'Identify given values: Total quantity = 12.5 kg, Total cost = ₹625. Required quantity = 3.2 kg.' },
            { text: 'Find cost of 1 kg (unit value) by dividing total cost by total quantity: ₹625 ÷ 12.5.' },
            { text: 'Perform division: 625 ÷ 12.5 = 6250 ÷ 125 = 50. So, 1 kg costs ₹50.' },
            { text: 'Multiply unit cost by required quantity: ₹50 × 3.2 = ₹160.' },
            { text: 'Verify: 12.5 kg costs ₹625, so 3.2 kg (which is less than half) should cost less than ₹312.50. ₹160 is reasonable.', faded: true, blankAnswer: '₹160' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch7_10', title: 'Identify each idea',
          dissect: { specimen: 'Proportional Reasoning1', spots: [
            { id: 's1', label: 'Proportional change refers to a', prompt: 'Which idea is this? — Proportional change refers to a change where quantities vary in a constant ratio.', answer: 'Proportional change refers to a', options: ['Proportional change refers to a', 'When an image is scaled', 'Calculating actual distances from map', 'Two ratios ab and cd'] },
            { id: 's2', label: 'When an image is scaled', prompt: 'Which idea is this? — When an image is scaled (enlarged or reduced), its width-to-height ratio (aspect ratio).', answer: 'When an image is scaled', options: ['When an image is scaled', 'Proportional change refers to a', 'Calculating actual distances from map', 'Two ratios ab and cd'] },
            { id: 's3', label: 'Calculating actual distances from map', prompt: 'Which idea is this? — Calculating actual distances from map scales uses the Representative Fraction (RF) or.', answer: 'Calculating actual distances from map', options: ['Calculating actual distances from map', 'Proportional change refers to a', 'When an image is scaled', 'Two ratios ab and cd'] },
            { id: 's4', label: 'Two ratios ab and cd', prompt: 'Which idea is this? — Two ratios a:b and c:d are equivalent if there exists a non-zero number k such that c = a.', answer: 'Two ratios ab and cd', options: ['Two ratios ab and cd', 'Proportional change refers to a', 'When an image is scaled', 'Calculating actual distances from map'] },
            { id: 's5', label: 'A proportional relationship exists between', prompt: 'Which idea is this? — A proportional relationship exists between two quantities when their ratio remains.', answer: 'A proportional relationship exists between', options: ['A proportional relationship exists between', 'Proportional change refers to a', 'When an image is scaled', 'Calculating actual distances from map'] },
            { id: 's6', label: 'The unitary method is a', prompt: 'Which idea is this? — The unitary method is a technique for solving proportional problems by first finding the.', answer: 'The unitary method is a', options: ['The unitary method is a', 'Proportional change refers to a', 'When an image is scaled', 'Calculating actual distances from map'] }
          ] } }
    ],
    explore: { component: C8_MathematicsProportionalReasoning1Sim, prompt: 'Explore the interactive — Proportional Reasoning1' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch7_1', difficulty: 'standard',
          question: 'Proportional change refers to a change where quantities vary in a constant.',
          hint: 'Review equivalent fractions (c6_math_ch03_031) and equivalent ratios (c6_math_ch06_063).',
          misconception: 'Students treat proportional situations additively: they add the same absolute amount to both quantities in a ratio.',
          parts: [
                { id: 'a', prompt: 'A map scale is 1 cm : 5 km. Two cities are 3 cm apart on the map.', answer: 'New map distance = 3 cm × 1.5 = 4.5 cm',
                  options: ['New map distance = 3 cm × 1.5 = 4.5 cm', 'enlargement is additive or doesn\'t connect scaling to ratio change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat proportional situations additively: they add the same absolute amount to both quantities in a ratio (e.g., changing 2:3 to.' }
          ],
            remediations: { 'students-treat-proportional-situations-additivel': { steps: ['Return to the definition: "Proportional means the *ratio* stays the same." Write the original ratio as a fraction (2/3).', 'Show the additive result (4/5) and multiplicative result (4/6) as fractions.', 'Compute decimal values: 2/3 ≈ 0.667, 4/5 = 0.8, 4/6 ≈ 0.667.', 'Ask: "Which new fraction equals the original?" 5.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_10', difficulty: 'standard',
          question: 'When an image is scaled (enlarged or reduced), its width-to-height ratio.',
          hint: 'Revisit c8_math_ch7_1 (multiplicative vs additive change) and c8_math_ch7_7.',
          misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and.',
          parts: [
                { id: 'a', prompt: 'A rectangular image has width 18 cm and height 12 cm. What is its width-to-height ratio in simplest form?', answer: 'The ratio is 18:12',
                  options: ['The ratio is 18:12', 'change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' },
                { id: 'b', prompt: 'Riya has a 10 cm × 6 cm photo. She wants to enlarge it to a width of 25 cm.', answer: 'The original aspect ratio is 10:6 = 5:3',
                  options: ['The original aspect ratio is 10:6 = 5:3', 'adding keeps the shape the same', 'change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' },
                { id: 'c', prompt: 'A movie poster is 60 cm wide and 90 cm tall. You want to make a smaller version with a height of 30 cm for a brochure.', answer: 'Step 1: Original ratio = width/height = 60/90 = 2/3',
                  options: ['Step 1: Original ratio = width/height = 60/90 = 2/3', 'change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' }
          ],
            remediations: { 'students-treat-scaling-as-additive': { steps: ['If a student uses additive reasoning, do NOT just say "multiply instead." Instead: (1) Have them draw two rectangles on.', '(2) Ask them to compute both ratios: 12/8 = 1.5, 18/14 ≈ 1.29 — not equal.', '(3) Guide them to find the multiplier: "What number times 12 gives 18?" (1.5).', '"Now do the same to 8." (4) Connect to c8_math_ch7_1: "When we say \'scale by 1.5\', we mean multiply every dimension by.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and.',
          parts: [
                { id: 'a', prompt: 'A student solves this problem: "A 4 cm × 6 cm image is scaled to a width of 10 cm. Find the new height." Their working: 4/6 = 10/h → 4h = 60 → h = 15.', answer: 'The answer 15 cm is incorrect',
                  options: ['The answer 15 cm is incorrect', 'change', 'an error'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' },
                { id: 'b', prompt: 'Create a real-world problem (Indian context) where a student must scale an image while preserving similarity, and the scale factor is NOT a whole number.', answer: 'Example problem: "A school\'s rectangular logo is 8 cm wide and 5 cm tall',
                  options: ['Example problem: "A school\'s rectangular logo is 8 cm wide and 5 cm tall', 'change'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' }
          ],
            remediations: { 'students-treat-scaling-as-additive': { steps: ['If a student uses additive reasoning, do NOT just say "multiply instead." Instead: (1) Have them draw two rectangles on.', '(2) Ask them to compute both ratios: 12/8 = 1.5, 18/14 ≈ 1.29 — not equal.', '(3) Guide them to find the multiplier: "What number times 12 gives 18?" (1.5).', '"Now do the same to 8." (4) Connect to c8_math_ch7_1: "When we say \'scale by 1.5\', we mean multiply every dimension by.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_3', difficulty: 'standard',
          question: 'Calculating actual distances from map scales uses the Representative Fraction.',
          hint: 'Revisit decimal multiplication (c7_math_ch12_002) and metric conversion ladder.',
          misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000.',
          parts: [
                { id: 'a', prompt: 'Two maps show the same region. Map A has RF 1 : 100,000. Map B has RF 1 : 200,000. On Map A, a road measures 5 cm. On Map B, the same road measures 2.5 cm.', answer: 'The product of map distance and RF denominator is invariant',
                  options: ['Correct answer: The product of map distance and RF denominator is invariant', 'because the scales are different', 'because 5 cm is double 2.5 cm'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000 km").' }
          ],
            remediations: { 'students-treat-the-rf-denominator': { steps: ['If a student makes this error, have them physically measure 1 cm on a ruler, then walk 100,000 cm (1 km) on the school.', 'Then guide them through a three-column table: Map Distance (cm) | Actual Distance (cm) | Actual Distance (km).', 'Fill row by row: 1 cm → 50,000 cm → 0.5 km; 2 cm → 100,000 cm → 1 km; 3 cm → 150,000 cm → 1.5 km.', 'Emphasise that the RF gives centimetres, and the ÷100,000 step is mandatory for kilometres.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000.',
          parts: [
                { id: 'a', prompt: 'A student solves this problem: "Map scale 1 : 50,000. Map distance = 8 cm. Find actual distance in metres." Their working: 8 × 50,000 = 400,000 cm.', answer: 'Correct evaluation: Yes, the method and answer are correct',
                  options: ['Correct evaluation: Yes, the method and answer are correct', 'incorrect because you should divide by 1000'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000 km").' },
                { id: 'b', prompt: 'Two maps show the same region. Map A has RF 1 : 100,000. Map B has RF 1 : 200,000. On Map A, a road measures 5 cm. On Map B, the same road measures 2.5 cm.', answer: 'The product of map distance and RF denominator is invariant',
                  options: ['Correct answer: The product of map distance and RF denominator is invariant', 'because the scales are different', 'because 5 cm is double 2.5 cm'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000 km").' }
          ],
            remediations: { 'students-treat-the-rf-denominator': { steps: ['If a student makes this error, have them physically measure 1 cm on a ruler, then walk 100,000 cm (1 km) on the school.', 'Then guide them through a three-column table: Map Distance (cm) | Actual Distance (cm) | Actual Distance (km).', 'Fill row by row: 1 cm → 50,000 cm → 0.5 km; 2 cm → 100,000 cm → 1 km; 3 cm → 150,000 cm → 1.5 km.', 'Emphasise that the RF gives centimetres, and the ÷100,000 step is mandatory for kilometres.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_4', difficulty: 'standard',
          question: 'Two ratios a:b and c:d are equivalent if there exists a non-zero number k such.',
          hint: 'Review equivalent fractions (c6_math_ch03_031) and practice writing fractions like 2/3 =.',
          misconception: 'Students often multiply or divide only ONE term of the ratio when trying to find an equivalent ratio.',
          parts: [
                { id: 'a', prompt: 'Explain why the ratio 12:18 is equivalent to 2:3, but 12:18 is NOT equivalent to 4:5.', answer: '12:18 simplifies to 2:3 by dividing both terms by 6 (the HCF)',
                  options: ['12:18 simplifies to 2:3 by dividing both terms by 6 (the HCF)', '12÷3=4 and 18÷3=6, not 5'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often multiply or divide only ONE term of the ratio when trying to find an equivalent ratio.' },
                { id: 'b', prompt: 'Compare these two methods for finding an equivalent ratio to 9:12 with a first term of 3: Method A: Divide both terms by 3 → 3:4 Method B: Multiply both terms.', answer: 'Yes, they are the same',
                  options: ['Yes, they are the same', 'Method A uses division, Method B uses multiplication, so they\'re different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often multiply or divide only ONE term of the ratio when trying to find an equivalent ratio.' }
          ],
            remediations: { 'students-often-multiply-or-divide': { steps: ['Show the student a visual model: draw 3 circles and 5 squares.', 'Ask: "If I triple the circles to 9, what must I do to the squares to keep the same pattern?" Physically group the.', 'Better: use a double number line.', 'Mark 0, 3, 6, 9 on top line and 0, 5, 10, 15 on bottom.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often multiply or divide only ONE term of the ratio when trying to find an equivalent ratio.',
          parts: [
                { id: 'a', prompt: 'Compare these two methods for finding an equivalent ratio to 9:12 with a first term of 3: Method A: Divide both terms by 3 → 3:4 Method B: Multiply both terms.', answer: 'Yes, they are the same',
                  options: ['Yes, they are the same', 'Method A uses division, Method B uses multiplication, so they\'re different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often multiply or divide only ONE term of the ratio when trying to find an equivalent ratio.' }
          ],
            remediations: { 'students-often-multiply-or-divide': { steps: ['Show the student a visual model: draw 3 circles and 5 squares.', 'Ask: "If I triple the circles to 9, what must I do to the squares to keep the same pattern?" Physically group the.', 'Better: use a double number line.', 'Mark 0, 3, 6, 9 on top line and 0, 5, 10, 15 on bottom.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_5', difficulty: 'standard',
          question: 'A proportional relationship exists between two quantities when their ratio.',
          hint: 'Revisit equivalent ratios (c8_math_ch7_4) and multiplicative vs additive change.',
          misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.',
          parts: [
                { id: 'a', prompt: 'A student claims that the relationship shown in the table below is proportional because "as x increases, y increases." Is the student correct?', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'if a graph is a straight line, the relationship is proportional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.' },
                { id: 'b', prompt: 'Compare the two relationships below. Which one is proportional? Justify by analyzing the structure of each equation.', answer: 'Relationship B is proportional',
                  options: ['Relationship B is proportional', 'if a graph is a straight line, the relationship is proportional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.' }
          ],
            remediations: { 'if-a-graph-is-a': { steps: ['Remediation: 1) Have the student compute y/x for at least three points from the table or graph of y = 5x + 10.', '2) Ask them to observe that the ratios are different.', '3) Guide them to see that the equation has an extra "+10" term, which adds a fixed amount regardless of x, breaking the.', '4) Contrast with y = 5x, where every ratio is 5.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.',
          parts: [
                { id: 'a', prompt: 'A classmate argues that the graph of a proportional relationship must be a straight line passing through the origin.', answer: 'The first student is correct',
                  options: ['The first student is correct', 'if a graph is a straight line, the relationship is proportional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.' },
                { id: 'b', prompt: 'Compare the two relationships below. Which one is proportional? Justify by analyzing the structure of each equation.', answer: 'Relationship B is proportional',
                  options: ['Relationship B is proportional', 'if a graph is a straight line, the relationship is proportional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.' }
          ],
            remediations: { 'if-a-graph-is-a': { steps: ['Remediation: 1) Have the student compute y/x for at least three points from the table or graph of y = 5x + 10.', '2) Ask them to observe that the ratios are different.', '3) Guide them to see that the equation has an extra "+10" term, which adds a fixed amount regardless of x, breaking the.', '4) Contrast with y = 5x, where every ratio is 5.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_6', difficulty: 'standard',
          question: 'The unitary method is a technique for solving proportional problems by first.',
          hint: 'If stuck, review decimal division (c7_math_ch12_004, c7_math_ch12_005) and the concept of.',
          misconception: 'Students often incorrectly apply the unitary method to inverse proportion problems (e.g., "5 workers take 10 days to.',
          parts: [
                { id: 'a', prompt: 'Explain why dividing the total quantity by the number of units gives the correct value for one unit in a direct proportion situation.', answer: 'In direct proportion, the ratio between the two quantities is constant',
                  options: ['In direct proportion, the ratio between the two quantities is constant', 'because the formula says so'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often incorrectly apply the unitary method to inverse proportion problems (e.g., "5 workers take 10 days to build a wall.' }
          ],
            remediations: { 'students-often-incorrectly-apply-the': { steps: ['When a student makes this error, first ask: "If 5 workers take 10 days, would 1 worker take more or fewer days?" Guide.', 'Then ask: "Would 8 workers take more or fewer days than 1 worker?" This leads to 50 ÷ 8 = 6.25 days.', 'Emphasize: in direct proportion, both quantities change in the same direction (more workers → more work done in same.', 'Have them practice classifying problems as direct or inverse before applying the unitary method.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
