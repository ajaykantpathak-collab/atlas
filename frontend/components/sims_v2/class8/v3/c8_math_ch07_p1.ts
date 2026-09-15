import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch07_p1: SimDef = {
    id: 'v3_c8_math_ch07_p1',
    title: 'Proportional Reasoning-1 · Part 1/2',
    subtitle: 'Same shape, different size — the multiply-only rule',
    classLevel: 8, subject: 'mathematics', topic: 'Proportional Reasoning-1 · Part 1/2',
    chapters: ['c8_math_ch07'],
    nodeIds: ['c8_math_ch7_1', 'c8_math_ch7_10', 'c8_math_ch7_2', 'c8_math_ch7_3', 'c8_math_ch7_4', 'c8_math_ch7_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a recipe-and-map scaler', intro: 'Double a recipe, enlarge a map, grow a photo — all ask the same question: what keeps the proportions honest? Hint: it\'s not addition.', goal: 'Distinguish multiplicative from additive change — only multiplying all parts by the same factor preserves a ratio — and apply it to recipes, maps and similar figures.' },
    discovery: {
        question: 'A paratha recipe uses 2 cups potato to 1 cup onion for 4 parathas. To make 8, a cook adds 2 cups potato and 1 cup onion \'extra\'. Same taste?',
        options: ['No — adding equal amounts breaks the ratio; only multiplying both by 2 keeps the flavour identical', 'Yes — adding the same to both keeps it fair', 'No — he should have added only potato', 'Yes — more of everything always tastes the same'],
        answer: 'No — adding equal amounts breaks the ratio; only multiplying both by 2 keeps the flavour identical',
        hook: 'Ratios live in multiplication-land, not addition-land. Adding 2 to both sides of 3:5 gives 5:7 — bigger numbers, different ratio. Recipes, maps and photos only stay true when you scale by a factor.',
    },
    teaching: [
        { title: 'Proportional Change: Multiplicative vs Additive Changes', text: 'Proportional change refers to a change where quantities vary in a constant ratio.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch7_1', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Bust the additive trap everywhere it hides: stretch a 12×8 rectangle both ways (add 4 vs ×1.5), enlarge a map at 150%, and prove a ₹100 price hike isn\'t \'the same\' on a ₹400 shirt and a ₹600 one.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'case', nodeId: 'c8_math_ch7_1', title: 'Proportional Change: Multiplicative vs Additive Changes',
          caseStudy: { intro: 'Imagine you are helping your mother adjust a recipe for *aloo paratha* filling.',
            decisions: [{ prompt: 'State the fundamental difference between a multiplicative change and an additive change applied to two quantities that are in a ratio.', options: [
                { text: 'A multiplicative change multiplies both quantities by the same factor (e.g., ×3),', outcome: 'A multiplicative change multiplies both quantities by the same factor (e.g., ×3), preserving their.' },
                { text: 'both preserve the ratio', outcome: 'Not quite — Students treat proportional situations additively: they add the same absolute amount to both.', reveals: 'students-treat-proportional-situations-additivel' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_10', title: 'Scaling Images: Width-to-Height Ratio and Similarity',
          scaffold: { problem: 'A school\'s rectangular notice board is 120 cm wide and 80 cm tall.',
            steps: [
            { text: 'Identify given values: original width w₁ = 120 cm, original height h₁ = 80 cm, new width w₂ = 45 cm.' },
            { text: 'Check if similarity is required — "same shape" means the two rectangles must be similar, so aspect ratio must.' },
            { text: 'Set up the proportion: 120/80 = 45/h₂. Simplify left side: 120/80 = 12/8 = 3/2. So 3/2 = 45/h₂.' },
            { text: 'Solve by cross-multiplication: 3 × h₂ = 2 × 45 → 3h₂ = 90 → h₂ = 90/3 = 30.' },
            { text: 'Verify: new dimensions 45 cm × 30 cm give ratio 45/30 = 3/2, matching original 3/2. Units are cm. Answer: 30 cm.', faded: true, blankAnswer: '30 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_3', title: 'Ratios in Their Simplest Form: Reduction by Common Factors',
          scaffold: { problem: 'A school has 120 boys and 180 girls. Express the ratio of boys to girls in its simplest form.',
            steps: [
            { text: 'Identify the given quantities: boys = 120, girls = 180. Ratio = 120:180.' },
            { text: 'Find the HCF of 120 and 180. Using prime factorization: 120 = 2^3 × 3 × 5, 180 = 2^2 × 3^2 × 5.' },
            { text: 'Divide both terms by HCF: 120 ÷ 60 = 2, 180 ÷ 60 = 3.' },
            { text: 'Write the simplified ratio: 2:3.' },
            { text: 'Verify: 2 and 3 have no common factor other than 1. The ratio 2:3 is equivalent to 120:180 because 2/3 = 120/180.', faded: true, blankAnswer: '2:3' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_4', title: 'Equivalent Ratios: Multiplying and Dividing Terms',
          scaffold: { problem: 'A recipe for 6 people uses 300 g of flour and 200 g of sugar. How much flour and sugar are needed for 15 people?',
            steps: [
            { text: 'Identify the given ratio and what is asked. The flour-to-sugar ratio is 300:200.' },
            { text: 'Find the scaling factor. Since 6 people → 15 people, the factor is 15 ÷ 6 = 2.5 (or 5/2).' },
            { text: 'Multiply both terms of the ratio by the scaling factor. Flour: 300 × 2.5 = 750 g. Sugar: 200 × 2.5 = 500 g.' },
            { text: 'Verify using equivalent ratio property. Original ratio 300:200 simplifies to 3:2.' },
            { text: 'State the answer with units. For 15 people, use 750 g flour and 500 g sugar.', faded: true, blankAnswer: '750 g flour and 500 g sugar' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_5', title: 'Proportional Relationships: Identifying Proportionality',
          scaffold: { problem: 'A tailor in Jaipur stitches shirts. The table shows the number of shirts stitched and the total metres of cloth used.',
            steps: [
            { text: 'Identify the two quantities: number of shirts (s) and metres of cloth (c). We need to check if c/s is constant.' },
            { text: 'Compute the ratio cloth/shirts for each row: 6/4 = 1.5, 10.5/7 = 1.5, 15/10 = 1.5, 19.5/13 = 1.5.' },
            { text: 'Observe that all ratios equal 1.5. Therefore, the relationship is proportional.' },
            { text: 'The constant of proportionality k = 1.5 metres per shirt. Write the equation: c = 1.5s.' },
            { text: 'Verify with a new value: for 20 shirts, cloth = 1.5 × 20 = 30 m. The ratio 30/20 = 1.5 holds.', faded: true, blankAnswer: 'Yes, proportional. Constant of proportionality = 1.5.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch7_5', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch7_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Amma\'s sherbet recipe mixes 1 cup syrup with 4 cups water for 5 glasses. For a family gathering needing double, cousin Ajay suggests \'just add 1 cup of each — same increase for both, so the taste stays identical.\'',
            decisions: [{ prompt: 'Will Ajay\'s batch taste the same?', options: [
                { text: 'No — keeping the taste means keeping the 1:4 ratio, and only multiplying both parts preserves it: 2 cups syrup + 8 cups water. Ajay\'s \'+1 each\' gives 2:5, which is a weaker syrup fraction — noticeably more watery.', outcome: 'This is the core of proportional change: equal additions break ratios; only equal factors keep them.' },
                { text: 'Ajay is right — adding the same amount to both ingredients is the fairest way to scale up.', outcome: 'Fair-feeling but mathematically wrong: 2/5 is not 1/4, so the ratio shifts and the flavour dilutes.', reveals: 'add-same-keep-ratio' },
                { text: 'Neither works — you can never double a recipe because larger batches always concentrate differently.', outcome: 'Doubling is exactly what proportions allow: 2:8 keeps every sip identical; the failure belongs to the additive method, not to scaling itself.', reveals: 'recipes-cant-scale' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch7_5', title: 'The bigger picture',
          caseStudy: { intro: 'Multiplicative change keeps the ratio — that\'s what \'proportional\' means. Add the same amount to both parts and you\'ve quietly changed the recipe, the shape and the scale.',
            decisions: [{ prompt: 'What comes next? Proportional Reasoning-1 · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Proportional Reasoning-1 · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch7_1', difficulty: 'standard',
          question: 'Proportional change refers to a change where quantities vary in a constant.',
          hint: 'Review equivalent fractions (c6_math_ch03_031) and equivalent ratios (c6_math_ch06_063).',
          misconception: 'Students treat proportional situations additively: they add the same absolute amount to both quantities in a ratio.',
          parts: [
                { id: 'a', prompt: 'A map scale is 1 cm : 5 km. Two cities are 3 cm apart on the map.', answer: 'New map distance = 3 cm × 1.5 = 4.5 cm',
                  options: ['New map distance = 3 cm × 1.5 = 4.5 cm', 'enlargement is additive or doesn\'t connect scaling to ratio change'],
                  hint: 'Review equivalent fractions (c6_math_ch03_031) and equivalent ratios (c6_math_ch06_063) using.',
                  misconception: 'Students treat proportional situations additively: they add the same absolute amount to both quantities in a ratio (e.g., changing 2:3.' }
          ],
            remediations: { 'students-treat-proportional-situations-additivel': { steps: ['Return to the definition: "Proportional means the *ratio* stays the same." Write the original ratio as a fraction (2/3).', 'Show the additive result (4/5) and multiplicative result (4/6) as fractions.', 'Compute decimal values: 2/3 ≈ 0.667, 4/5 = 0.8, 4/6 ≈ 0.667.', 'Ask: "Which new fraction equals the original?" 5.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_10', difficulty: 'standard',
          question: 'When an image is scaled (enlarged or reduced), its width-to-height ratio.',
          hint: 'Revisit c8_math_ch7_1 (multiplicative vs additive change) and c8_math_ch7_7.',
          misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and.',
          parts: [
                { id: 'a', prompt: 'A rectangular image has width 18 cm and height 12 cm. What is its width-to-height ratio in simplest form?', answer: 'The ratio is 18:12',
                  options: ['The ratio is 18:12', 'change'],
                  hint: 'Revisit c8_math_ch7_1 (multiplicative vs additive change) and c8_math_ch7_7 (cross-multiplication).',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' },
                { id: 'b', prompt: 'Riya has a 10 cm × 6 cm photo. She wants to enlarge it to a width of 25 cm.', answer: 'The original aspect ratio is 10:6 = 5:3',
                  options: ['The original aspect ratio is 10:6 = 5:3', 'adding keeps the shape the same', 'change', 'says "adding keeps the shape the same" reveals the additive vs'],
                  hint: 'Revisit c8_math_ch7_1 (multiplicative vs additive change) and c8_math_ch7_7 (cross-multiplication).',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' },
                { id: 'c', prompt: 'A movie poster is 60 cm wide and 90 cm tall. You want to make a smaller version with a height of 30 cm for a brochure.', answer: 'Step 1: Original ratio = width/height = 60/90 = 2/3',
                  options: ['Step 1: Original ratio = width/height = 60/90 = 2/3', 'change'],
                  hint: 'Revisit c8_math_ch7_1 (multiplicative vs additive change) and c8_math_ch7_7 (cross-multiplication).',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' },
                { id: 'd', prompt: 'Two rectangles A and B are similar. Rectangle A has width 14 cm and height 10 cm. Rectangle B has width 21 cm.', answer: 'Rectangle A\'s aspect ratio = 14/10 = 1.4',
                  options: ['Rectangle A\'s aspect ratio = 14/10 = 1.4', 'greater than 15 cm', 'less than 15 cm', 'change'],
                  hint: 'Revisit c8_math_ch7_1 (multiplicative vs additive change) and c8_math_ch7_7 (cross-multiplication).',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' }
          ],
            remediations: { 'students-treat-scaling-as-additive': { steps: ['If a student uses additive reasoning, do NOT just say "multiply instead." Instead: (1) Have them draw two rectangles.', '(2) Ask them to compute both ratios: 12/8 = 1.5, 18/14 ≈ 1.29 — not equal.', '(3) Guide them to find the multiplier: "What number times 12 gives 18?" (1.5).', '"Now do the same to 8." (4) Connect to c8_math_ch7_1: "When we say \'scale by 1.5\', we mean multiply every dimension.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and.',
          parts: [
                { id: 'a', prompt: 'A student solves this problem: "A 4 cm × 6 cm image is scaled to a width of 10 cm. Find the new height." Their working: 4/6 = 10/h → 4h = 60 → h = 15.', answer: 'The answer 15 cm is incorrect',
                  options: ['The answer 15 cm is incorrect', 'change', 'an error'],
                  hint: 'Revisit c8_math_ch7_1 (multiplicative vs additive change) and c8_math_ch7_7 (cross-multiplication).',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' },
                { id: 'b', prompt: 'Create a real-world problem (Indian context) where a student must scale an image while preserving similarity, and the scale factor is NOT a whole number.', answer: 'Example problem: "A school\'s rectangular logo is 8 cm wide and 5 cm tall',
                  options: ['Example problem: "A school\'s rectangular logo is 8 cm wide and 5 cm tall', 'change'],
                  hint: 'Revisit c8_math_ch7_1 (multiplicative vs additive change) and c8_math_ch7_7 (cross-multiplication).',
                  misconception: 'Students treat scaling as additive: they believe that to enlarge an image, you add the same amount to both width and height.' }
          ],
            remediations: { 'students-treat-scaling-as-additive': { steps: ['If a student uses additive reasoning, do NOT just say "multiply instead." Instead: (1) Have them draw two rectangles.', '(2) Ask them to compute both ratios: 12/8 = 1.5, 18/14 ≈ 1.29 — not equal.', '(3) Guide them to find the multiplier: "What number times 12 gives 18?" (1.5).', '"Now do the same to 8." (4) Connect to c8_math_ch7_1: "When we say \'scale by 1.5\', we mean multiply every dimension.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_2', difficulty: 'standard',
          question: 'A ratio is a comparison of two quantities of the same kind and in the same.',
          hint: 'If stuck, revisit metric unit conversions (Class 6 decimals chapter) and the meaning.',
          misconception: 'Students treat the ratio \\(a:b\\) as just two numbers written with a colon, ignoring that (1) the quantities must be.',
          parts: [
                { id: 'a', prompt: 'Two ratios are given: \\(a:b = 4:5\\) and \\(c:d = 8:10\\). Without simplifying, how can you tell they represent the same multiplicative relationship?', answer: 'The ratios are the same',
                  options: ['The ratios are the same', 'they are different'],
                  hint: 'If stuck, revisit metric unit conversions (Class 6 decimals chapter) and the meaning of fraction.',
                  misconception: 'Students treat the ratio \\(a:b\\) as just two numbers written with a colon, ignoring that (1) the quantities must be in identical units.' }
          ],
            remediations: { 'students-treat-the-ratio-a': { steps: ['Ask the student to read the problem and underline the two quantities with their units.', 'Check if units match; if not, convert the larger unit to the smaller (e.g., m to cm, kg to g, rupees to paise).', 'Identify which quantity is the antecedent (first mentioned or "to" part) and which is the consequent.', 'Write the ratio as "antecedent : consequent" with the converted numbers.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_3', difficulty: 'standard',
          question: 'A ratio a:b is in its simplest form when the two terms a and b have no common.',
          hint: 'If stuck, revisit HCF by prime factorization (c7_math_ch11_004) and equivalent fractions.',
          misconception: 'Students often divide by a common factor (e.g., 2) repeatedly but stop before reaching the HCF, leaving the ratio not.',
          parts: [
                { id: 'a', prompt: 'Compare the two methods of simplifying 56:84: (a) dividing by 2 repeatedly, (b) dividing by HCF directly. Which is more efficient and why?', answer: 'Method (b) is more efficient for large numbers',
                  options: ['Method (b) is more efficient for large numbers', 'says both are equally efficient ignores the cognitive load of multiple steps'],
                  hint: 'If stuck, revisit HCF by prime factorization (c7_math_ch11_004) and equivalent fractions.',
                  misconception: 'Students often divide by a common factor (e.g., 2) repeatedly but stop before reaching the HCF, leaving the ratio not fully simplified.' }
          ],
            remediations: { 'students-often-divide-by-a': { steps: ['Remediation: Show the student that 6:9 still has a common factor 3.', 'Ask: "Can we divide both by 3?" Then demonstrate that the process must continue until no common factor remains.', 'Use the HCF method: find HCF of original numbers (24) and divide once.', 'Practice with numbers where repeated division is long (e.g., 96:144) to highlight efficiency of HCF.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_4', difficulty: 'standard',
          question: 'Two ratios a:b and c:d are equivalent if there exists a non-zero number k such.',
          hint: 'Review equivalent fractions (c6_math_ch03_031) and practice writing fractions like 2/3.',
          misconception: 'Students often multiply or divide only ONE term of the ratio when trying to find an equivalent ratio.',
          parts: [
                { id: 'a', prompt: 'Explain why the ratio 12:18 is equivalent to 2:3, but 12:18 is NOT equivalent to 4:5.', answer: '12:18 simplifies to 2:3 by dividing both terms by 6 (the HCF)',
                  options: ['12:18 simplifies to 2:3 by dividing both terms by 6 (the HCF)', '12÷3=4 and 18÷3=6, not 5'],
                  hint: 'Review equivalent fractions (c6_math_ch03_031) and practice writing fractions like 2/3 = 4/6 = 6/9.',
                  misconception: 'Students often multiply or divide only ONE term of the ratio when trying to find an equivalent ratio.' },
                { id: 'b', prompt: 'Compare these two methods for finding an equivalent ratio to 9:12 with a first term of 3: Method A: Divide both terms by 3 → 3:4 Method B: Multiply both terms.', answer: 'Yes, they are the same',
                  options: ['Yes, they are the same', 'Method A uses division, Method B uses multiplication, so they\'re different'],
                  hint: 'Review equivalent fractions (c6_math_ch03_031) and practice writing fractions like 2/3 = 4/6 = 6/9.',
                  misconception: 'Students often multiply or divide only ONE term of the ratio when trying to find an equivalent ratio.' }
          ],
            remediations: { 'students-often-multiply-or-divide': { steps: ['Show the student a visual model: draw 3 circles and 5 squares.', 'Ask: "If I triple the circles to 9, what must I do to the squares to keep the same pattern?" Physically group the.', 'Better: use a double number line.', 'Mark 0, 3, 6, 9 on top line and 0, 5, 10, 15 on bottom.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_5', difficulty: 'standard',
          question: 'A proportional relationship exists between two quantities when their ratio.',
          hint: 'Revisit equivalent ratios (c8_math_ch7_4) and multiplicative vs additive change.',
          misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.',
          parts: [
                { id: 'a', prompt: 'A student claims that the relationship shown in the table below is proportional because "as x increases, y increases." Is the student correct?', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'if a graph is a straight line, the relationship is proportional'],
                  hint: 'Revisit equivalent ratios (c8_math_ch7_4) and multiplicative vs additive change (c8_math_ch7_1).',
                  misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.' },
                { id: 'b', prompt: 'Compare the two relationships below. Which one is proportional? Justify by analyzing the structure of each equation.', answer: 'Relationship B is proportional',
                  options: ['Relationship B is proportional', 'if a graph is a straight line, the relationship is proportional'],
                  hint: 'Revisit equivalent ratios (c8_math_ch7_4) and multiplicative vs additive change (c8_math_ch7_1).',
                  misconception: 'Students often believe that if a graph is a straight line, the relationship is proportional.' }
          ],
            remediations: { 'if-a-graph-is-a': { steps: ['Remediation: 1) Have the student compute y/x for at least three points from the table or graph of y = 5x + 10.', '2) Ask them to observe that the ratios are different.', '3) Guide them to see that the equation has an extra "+10" term, which adds a fixed amount regardless of x, breaking the.', '4) Contrast with y = 5x, where every ratio is 5.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
