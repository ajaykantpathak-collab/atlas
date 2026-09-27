import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch08_p2: SimDef = {
    id: 'v3_c12_app_ch08_p2',
    title: 'Index Numbers Time Based · Part 2/2',
    subtitle: 'This node covers the construction of price index numbers using Relative Index, Simple.',
    classLevel: 12, subject: 'app', topic: 'Index Numbers Time Based · Part 2/2',
    chapters: ['c12_app_ch08'],
    nodeIds: ['c12_app_cbse_08_007', 'c12_app_cbse_08_008', 'c12_app_cbse_08_009', 'c12_app_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a real-world question: "Your family\'s monthly budget for 5 essential items was ₹12,000 in 2018.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A student computes a simple aggregative price index for 4 commodities: A (₹50→₹60), B (₹200→₹220), C (₹1000→₹1050), D (₹10→₹12). They get 104.5.',
        options: ['The simple aggregative index is \\( \\frac{\\sum p_n}{\\sum p_0} \\times 100 =', 'it\'s correct because formula is right', 'concealed weights'],
        answer: 'The simple aggregative index is \\( \\frac{\\sum p_n}{\\sum p_0} \\times 100 =',
        hook: 'Students believe "Weighted Aggregative Method" is a single formula, not realizing it is a *family* of methods.',
    },
    teaching: [
        { title: 'Construction of Index Number', text: 'An index number is a statistical measure that tracks the relative change in a group of related variables (typically prices or quantities) over two different time periods or locations, expressed as.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_08_007', title: 'Construction of Index Number',
          scaffold: { problem: 'A household consumes 4 items. Base year (2018) and current year (2023) data:',
            steps: [
            { text: 'Identify base period (2018) and current period (2023). List all \\( p_0, q_0, p_n, q_n \\) for 4 commodities.' },
            { text: 'For Laspeyres, compute \\( \\sum p_0 q_0 \\) and \\( \\sum p_n q_0 \\) using base-year quantities as weights.' },
            { text: 'For Paasche, compute \\( \\sum p_0 q_n \\) and \\( \\sum p_n q_n \\) using current-year quantities as weights.' },
            { text: 'For Fisher, take geometric mean of Laspeyres and Paasche indices.' },
            { text: 'For Marshall-Edgeworth, compute \\( \\sum p_0 (q_0 + q_n) \\) and \\( \\sum p_n (q_0 + q_n) \\) using average quantities.' },
            { text: 'Interpret: Laspeyres (base weights) = 124.3, Paasche (current weights) = 122.8, Fisher = 123.5, ME = 123.6.', faded: true, blankAnswer: 'Laspeyres = 124.3, Paasche = 122.8, Fisher = 123.5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_08_008', title: 'Relative Index Number',
          scaffold: { problem: 'The price of petrol in Delhi was ₹69.50/litre in January 2018 (base period).',
            steps: [
            { text: 'Identify base period price $p_0 = 69.50$ (Jan 2018). Base index $I_{2018} = 100$ by definition.' },
            { text: 'For each subsequent year, apply formula $I_n = \\frac{p_n}{p_0} \\times 100$.' },
            { text: 'Construct index series table with columns: Year, Price (₹/litre), Relative Index.' },
            { text: 'Interpret 2022 index: 137.27 means petrol price in Jan 2022 was 137.27% of Jan 2018 price, i.e., a 37.27% increase over.' },
            { text: 'Verify: % change from 2018 to 2022 = $\\frac{95.40 - 69.50}{69.50} \\times 100 = 37.27\\%$, matches index − 100.', faded: true, blankAnswer: 'Index Series: 2018=100, 2019=104.75, 2020=108.49.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_08_009', title: 'January 2010',
          scaffold: { problem: 'The wholesale price of onions in Lasalgaon mandi (Maharashtra) was ₹1,800 per quintal in January 2010 (base month) and ₹3,240 per quintal.',
            steps: [
            { text: 'Identify base period value $p_0 = 1800$ (₹/quintal) and current period value $p_n = 3240$ (₹/quintal).' },
            { text: 'Apply the relative price index formula: $I_n = \\frac{p_n}{p_0} \\times 100$.' },
            { text: 'Substitute values: $I_n = \\frac{3240}{1800} \\times 100 = 1.8 \\times 100 = 180$.' },
            { text: 'Compute percentage increase from base: $\\% \\text{increase} = I_n - 100 = 180 - 100 = 80\\%$.' },
            { text: 'Interpret: The index 180 means November 2015 price is 1.8 times the January 2010 price — an 80% rise.', faded: true, blankAnswer: 'Relative price index for November 2015 = 180. Percentage.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_08_010', title: 'November 2015',
          scaffold: { problem: 'The wholesale price of onions in Maharashtra was ₹1,200/quintal in base year 2018.',
            steps: [
            { text: 'Identify base period (2018, \\( p_0 = 1200 \\)) and current periods (2020: \\( p_1 = 2100 \\), 2022: \\( p_2 = 1500 \\)).' },
            { text: 'Apply relative index formula for each year: \\( I_{2020} = \\frac{2100}{1200} \\times 100 = 175 \\); \\( I_{2022}.' },
            { text: 'Interpret indices: 2020 price is 175% of 2018 price (75% increase); 2022 price is 125% of 2018 price (25% increase).' },
            { text: 'Compute % change from 2020 to 2022: Use ratio of indices \\( \\frac{I_{2022}}{I_{2020}} \\times 100 = \\frac{125}{175}.' },
            { text: 'Verify with raw prices: \\( \\frac{1500 - 2100}{2100} \\times 100 = -28.57\\% \\). Matches.', faded: true, blankAnswer: '2020 index = 175, 2022 index = 125. Percentage change.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_08_010', title: 'November 2015',
          caseStudy: { intro: 'You open the newspaper and see "Crude oil prices up 16% since 2005" — but how did they get that number?',
            decisions: [{ prompt: 'What is the index number of the base period in any index series, and why is it always this value?', options: [
                { text: 'The index number of the base period is always **100**', outcome: 'The index number of the base period is always **100**. This is by definition: \\( I_0.' },
                { text: 'depends on data', outcome: 'Not quite — **Misconception:** "Index number = percentage change." Students write "Index = 140%" or "Price.', reveals: 'misconception-index-number-percentage-change' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_08_010', title: 'You made it',
          caseStudy: { intro: 'You finished Index Numbers Time Based — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_08_007', difficulty: 'standard',
          question: 'An index number is a statistical measure that tracks the relative change in.',
          hint: 'If stuck on weighted methods, review the concept of "weighted mean" from.',
          misconception: 'Students believe "Weighted Aggregative Method" is a single formula, not realizing it is a *family* of methods.',
          parts: [
                { id: 'a', prompt: 'A student computes a simple aggregative price index for 4 commodities: A (₹50→₹60), B (₹200→₹220), C (₹1000→₹1050), D (₹10→₹12). They get 104.5.', answer: 'The simple aggregative index is \\( \\frac{\\sum p_n}{\\sum p_0} \\times 100 =',
                  options: ['The simple aggregative index is \\( \\frac{\\sum p_n}{\\sum p_0} \\times 100 =', 'it\'s correct because formula is right', 'concealed weights', 'Weighted Aggregative Method'],
                  hint: 'If stuck on weighted methods, review the concept of "weighted mean" from c11_app_cbse_10_001.',
                  misconception: 'Students believe "Weighted Aggregative Method" is a single formula, not realizing it is a *family* of methods (Laspeyres, Paasche, Fisher.' }
          ],
            remediations: { 'weighted-aggregative-method-is-a': { steps: ['Revisit **c12_app_cbse_08_008** (Relative Index Number) — practice computing price relatives for 5 items with different.', 'Re-do NCERT Example 3 (simple aggregative) and Example 4 (simple average of relatives) side-by-side — highlight how.', 'Create a 3×3 table: Method | Weight Used | Formula | Time Reversal Test?', 'Fill it for Laspeyres, Paasche, Fisher, Marshall-Edgeworth.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_08_008', difficulty: 'standard',
          question: 'A relative index number for a given period expresses the value of a variable.',
          hint: 'If stuck, review "percentage increase/decrease" from Class 8 arithmetic and the.',
          misconception: '**Confusing the index number with the percentage change.** Students consistently write "index = 140 means 140%.',
          parts: [
                { id: 'a', prompt: 'A student computes the relative price index for wheat in 2023 (base 2018) as $I_{2023} = \\frac{25}{20} \\times 100 = 125$.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'index = 140 means 140% increase', '40% increase'],
                  hint: 'If stuck, review "percentage increase/decrease" from Class 8 arithmetic and the definition.',
                  misconception: '**Confusing the index number with the percentage change.** Students consistently write "index = 140 means 140% increase" instead of "40%.' },
                { id: 'b', prompt: 'The price of crude oil was ₹2,500/gallon in Dec 2005 (base), ₹3,500 in Jan 2010, ₹2,800 in Nov 2015, and ₹2,900 in Oct 2020.', answer: 'Indices: 2005 = 100, 2010 = $\\frac{3500}{2500} \\times 100 = 140$, 2015 =',
                  options: ['Indices: 2005 = 100, 2010 = $\\frac{3500}{2500} \\times 100 = 140$, 2015 =', 'index = 140 means 140% increase', '40% increase'],
                  hint: 'If stuck, review "percentage increase/decrease" from Class 8 arithmetic and the definition.',
                  misconception: '**Confusing the index number with the percentage change.** Students consistently write "index = 140 means 140% increase" instead of "40%.' },
                { id: 'c', prompt: 'Compare two commodities: Commodity A (base price ₹100, current ₹150) and Commodity B (base price ₹10, current ₹18). Compute relative price indices.', answer: 'Index A = $\\frac{150}{100} \\times 100 = 150$ (50% increase)',
                  options: ['Index A = $\\frac{150}{100} \\times 100 = 150$ (50% increase)', 'index = 140 means 140% increase', '40% increase'],
                  hint: 'If stuck, review "percentage increase/decrease" from Class 8 arithmetic and the definition.',
                  misconception: '**Confusing the index number with the percentage change.** Students consistently write "index = 140 means 140% increase" instead of "40%.' }
          ],
            remediations: { 'confusing-the-index-number-with': { steps: ['If a student confuses index with % change: (1) Make them compute 3 indices by hand: base=100, current=120 → index=120.', '(2) Give 5 mixed practice items where they must state both index and % change.', '(3) Revisit the formula derivation: $I_n = \\frac{p_n}{p_0} \\times 100 = \\frac{p_n}{p_0} \\times 100\\%$ — the "×100".', '(4) Use Diagnostic Question 2 as re-test.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_08_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Confusing the index number with the percentage change.** Students consistently write "index = 140 means 140%.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "The relative index number for a commodity in 2022 with base 2018 is 95.', answer: 'The arithmetic is correct: index 95 → 5% decrease',
                  options: ['The arithmetic is correct: index 95 → 5% decrease', 'index = 140 means 140% increase', '40% increase'],
                  hint: 'If stuck, review "percentage increase/decrease" from Class 8 arithmetic and the definition.',
                  misconception: '**Confusing the index number with the percentage change.** Students consistently write "index = 140 means 140% increase" instead of "40%.' }
          ],
            remediations: { 'confusing-the-index-number-with': { steps: ['If a student confuses index with % change: (1) Make them compute 3 indices by hand: base=100, current=120 → index=120.', '(2) Give 5 mixed practice items where they must state both index and % change.', '(3) Revisit the formula derivation: $I_n = \\frac{p_n}{p_0} \\times 100 = \\frac{p_n}{p_0} \\times 100\\%$ — the "×100".', '(4) Use Diagnostic Question 2 as re-test.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_08_009', difficulty: 'standard',
          question: 'A relative index number for a given period expresses the price (or quantity).',
          hint: 'If stuck on "index vs percentage change", review Class 8-10 percentage concepts: "What %.',
          misconception: '**"The index number *is* the percentage change."** Students routinely write: "Index = 140, so percentage change.',
          parts: [
                { id: 'a', prompt: 'What is the relative price index number for a commodity in the base period itself, and why is it always that value regardless of the actual price?', answer: 'The relative price index for the base period is always **100**',
                  options: ['The relative price index for the base period is always **100**', 'it depends on the price', 'it is the actual price'],
                  hint: 'If stuck on "index vs percentage change", review Class 8-10 percentage concepts: "What % of 250.',
                  misconception: '**"The index number *is* the percentage change."** Students routinely write: "Index = 140, so percentage change = 140%." This happens.' },
                { id: 'b', prompt: 'In the crude oil example, the January 2010 index is 140. A student says: "This means the price in January 2010 was 140% of the base price, so the increase.', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'percentage *of*', 'percentage *increase over*'],
                  hint: 'If stuck on "index vs percentage change", review Class 8-10 percentage concepts: "What % of 250.',
                  misconception: '**"The index number *is* the percentage change."** Students routinely write: "Index = 140, so percentage change = 140%." This happens.' }
          ],
            remediations: { 'the-index-number-is-the': { steps: ['**Revisit the definition**: Write $I_n = \\frac{p_n}{p_0} \\times 100$ and $ \\% \\Delta = I_n - 100 $ side by side.', 'Say aloud: "Index is *ratio × 100*; percentage change is *index minus 100*." 2.', '**Drill 5 rapid conversions**: Given base price = 200, current prices = 220, 250, 180, 200, 300 → compute index and %.', '**Re-diagnostic**: Attempt Diagnostic Question 2 and 3 again.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_08_010', difficulty: 'standard',
          question: 'An index number is a statistical measure that shows the relative change in.',
          hint: 'If stuck on interpretation, revisit **c12_app_cbse_08_008 Example 1** (crude oil.',
          misconception: '**Misconception:** "Index number = percentage change." Students write "Index = 140%" or "Price increased by 140%" when.',
          parts: [
                { id: 'a', prompt: 'What is the index number of the base period in any index series, and why is it always this value?', answer: 'The index number of the base period is always **100**',
                  options: ['The index number of the base period is always **100**', 'depends on data'],
                  hint: 'If stuck on interpretation, revisit **c12_app_cbse_08_008 Example 1** (crude oil 2005–2020) and.',
                  misconception: '**Misconception:** "Index number = percentage change." Students write "Index = 140%" or "Price increased by 140%" when the index is 140.' }
          ],
            remediations: { 'misconception-index-number-percentage-change': { steps: ['**Revisit c12_app_cbse_08_008 (Relative Index Number):** Re-derive \\( I_n = \\frac{p_n}{p_0} \\times 100 \\) from first.', '**Drill:** Take 5 price pairs (base, current).', 'Then compute % change = Index − 100.', 'Say aloud: "Index is 112, change is 12%." 3.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
