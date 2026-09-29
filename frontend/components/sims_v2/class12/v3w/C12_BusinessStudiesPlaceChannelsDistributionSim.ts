import type { SimDef } from '../../engine/types';
import C12_BusinessStudiesPlaceChannelsDistributionSim from '../../../simulations/c6_12/C12_BusinessStudiesPlaceChannelsDistributionSim';

/** v3 wrapped master — C12_BusinessStudiesPlaceChannelsDistributionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_businessstudiesplacechannelsdistributionsim: SimDef = {
    id: 'v3w_c12_businessstudiesplacechannelsdistributionsim',
    title: 'Marketing Mix: 4 Ps (Product, Price, Place, Promotion)',
    subtitle: 'This node covers the concept, components, and interrelationships of the 4 Ps (Product,.',
    classLevel: 12, subject: 'business_studies', topic: 'Marketing Mix: 4 Ps (Product, Price, Place, Promotion)',
    chapters: [],
    nodeIds: ['c12_bs_cbse_11_004', 'c12_bs_cbse_11_005', 'c12_bs_cbse_11_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are launching a new brand of cold-pressed juice in India.', goal: 'Master Marketing Mix: 4 Ps (Product, Price, Place, Promotion).' },
    discovery: {
        question: 'Define Marketing Mix and list its four components.',
        options: ['Marketing Mix is the set of controllable tactical tools (Product, Price, Place,', 'People', 'Process'],
        answer: 'Marketing Mix is the set of controllable tactical tools (Product, Price, Place,',
        hook: 'Students often treat the 4 Ps as independent checklists rather than an integrated system.',
    },
    teaching: [
        { title: 'Marketing Mix refers to the set of.', text: 'Marketing Mix refers to the set of controllable tactical marketing tools — Product, Price, Place, and Promotion — that a firm blends to produce the desired response in the target market.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bs_cbse_11_004', title: 'Marketing Mix refers to the set of.',
          scaffold: { problem: 'A local bakery sells artisan bread at ₹120 per loaf. It bakes fresh daily but only sells from its shop in a residential area.',
            steps: [
            { text: 'Identify the 4 Ps in the scenario: Product = artisan bread (quality, freshness), Price = ₹120/loaf, Place = own shop.' },
            { text: 'Analyze target customer: Residents nearby may not buy daily; commuters or offices might want bulk orders.' },
            { text: 'Evaluate each P for fit: Product seems good (fresh, artisan). Price may be high for daily purchase but fair for.' },
            { text: 'Pinpoint the weakest link: Place (limited access) and Promotion (wrong medium) are the gaps.' },
            { text: 'Propose test changes: Place — partner with 3 nearby cafes for daily supply.', faded: true, blankAnswer: 'Primary misalignment: Place (limited distribution) and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_11_005', title: 'Product classification categorizes.',
          scaffold: { problem: 'Classify the following products with justification: (a) Branded bottled water sold in supermarkets; (b) Customized ERP software for a.',
            steps: [
            { text: 'Identify if the buyer is an ultimate consumer (consumer product) or business/organization (industrial product).' },
            { text: 'For consumer products, assess purchase frequency, comparison effort, brand loyalty, and price sensitivity to assign.' },
            { text: 'For industrial products, assess if it becomes part of the final product (materials/parts), is a long-term asset.' },
            { text: 'Apply criteria to each product.' },
            { text: 'Verify classification against marketing strategy implications.', faded: true, blankAnswer: '(a) Consumer Convenience; (b) Industrial Capital Item; (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_11_007', title: 'Channels of distribution refer to the.',
          scaffold: { problem: 'A manufacturer of industrial robots (price ₹50 lakh each, highly technical, customized installation required, 20 potential buyers in India).',
            steps: [
            { text: 'Identify product characteristics — high unit value, technical complexity, customization, very few buyers (narrow.' },
            { text: 'Identify company factors — assume manufacturer has technical expertise but limited sales force; can afford to build.' },
            { text: 'Identify market factors — buyers are concentrated (industrial hubs), require pre-sale consultation and post-sale.' },
            { text: 'Identify middlemen factors — specialized industrial distributors exist but add cost; may lack deep technical knowledge.' },
            { text: 'Evaluate channel options — Direct (zero-level) allows manufacturer\'s engineers to sell, install, service; builds.' },
            { text: 'Recommend — Direct channel (zero-level) with company-employed sales engineers.', faded: true, blankAnswer: 'Direct channel (zero-level) with manufacturer\'s own sales.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bs_cbse_11_005', title: 'Identify each idea',
          dissect: { specimen: 'Marketing Mix: 4 Ps (Product, Price, Place, Promotion)', spots: [
            { id: 's1', label: 'Marketing Mix refers to the', prompt: 'Which idea is this? — Marketing Mix refers to the set of controllable tactical marketing tools — Product,.', answer: 'Marketing Mix refers to the', options: ['Marketing Mix refers to the', 'Product classification categorizes goods into', 'Channels of distribution refer to'] },
            { id: 's2', label: 'Product classification categorizes goods into', prompt: 'Which idea is this? — Product classification categorizes goods into consumer products (convenience, shopping,.', answer: 'Product classification categorizes goods into', options: ['Product classification categorizes goods into', 'Marketing Mix refers to the', 'Channels of distribution refer to'] },
            { id: 's3', label: 'Channels of distribution refer to', prompt: 'Which idea is this? — Channels of distribution refer to the path or route through which goods and services move.', answer: 'Channels of distribution refer to', options: ['Channels of distribution refer to', 'Marketing Mix refers to the', 'Product classification categorizes goods into'] }
          ] } }
    ],
    explore: { component: C12_BusinessStudiesPlaceChannelsDistributionSim, prompt: 'Explore the interactive — Marketing Mix: 4 Ps (Product, Price, Place, Promotion)' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_004', difficulty: 'standard',
          question: 'Marketing Mix refers to the set of controllable tactical marketing tools —.',
          hint: 'If stuck, revisit the distinction between marketing and selling (c12_bs_cbse_11_002) and.',
          misconception: 'Students often treat the 4 Ps as independent checklists rather than an integrated system.',
          parts: [
                { id: 'a', prompt: 'Define Marketing Mix and list its four components.', answer: 'Marketing Mix is the set of controllable tactical tools (Product, Price, Place,',
                  options: ['Marketing Mix is the set of controllable tactical tools (Product, Price, Place,', 'People', 'Process'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the 4 Ps as independent checklists rather than an integrated system.' },
                { id: 'b', prompt: 'A company sells affordable smartphones but only through its own website. Sales are low in rural areas where internet penetration is low.', answer: 'Place is misaligned',
                  options: ['Place is misaligned', 'Promotion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the 4 Ps as independent checklists rather than an integrated system.' },
                { id: 'c', prompt: 'A startup launches an organic skincare line priced at ₹2,500 for a 50ml bottle. Target customers are college students.', answer: 'Price and Product conflict with the target market',
                  options: ['Price and Product conflict with the target market', 'advertise more on Instagram', 'promotion can fix a wrong price-product fit'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat the 4 Ps as independent checklists rather than an integrated system.' }
          ],
            remediations: { 'students-often-treat-the-4': { steps: ['Revisit c12_bs_cbse_11_001 (Marketing: Meaning, Definition and Scope) to recall the core marketing concept: satisfying.', 'Re-read c12_bs_cbse_11_003 (Marketing Management Philosophies) to see how different philosophies prioritize different.', 'Do a 15-minute exercise: take a familiar product (e.g., Parle-G biscuit) and write one sentence for each P showing how.', 'Re-attempt Diagnostic Question 3 and 4, explicitly writing the "if-then" links between Ps.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_005', difficulty: 'standard',
          question: 'Product classification categorizes goods into consumer products (convenience,.',
          hint: 'If unclear on the 4Ps hierarchy, revisit c12_bs_cbse_11_004 and map how a change in.',
          misconception: 'Students often confuse "shopping products" with "specialty products" by assuming any product that requires comparison.',
          parts: [
                { id: 'a', prompt: 'A company sells industrial lubricants to manufacturing firms. The lubricants are purchased routinely with minimal comparison.', answer: 'Industrial lubricants fall under "Supplies and Services"',
                  options: ['Industrial lubricants fall under "Supplies and Services"', 'Materials and Parts', 'Capital Items'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "shopping products" with "specialty products" by assuming any product that requires comparison is a shopping.' },
                { id: 'b', prompt: '"Branding is just giving a catchy name to a product." Explain why this statement is incomplete and what three strategic functions branding performs beyond.', answer: 'Branding is not just a name; it performs: (1) Differentiation',
                  options: ['Branding is not just a name; it performs: (1) Differentiation', 'shopping products', 'specialty products'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "shopping products" with "specialty products" by assuming any product that requires comparison is a shopping.' },
                { id: 'c', prompt: 'A startup sells premium cold-pressed oils in 500ml glass bottles.', answer: 'No, this is not permissible',
                  options: ['No, this is not permissible', 'yes, if QR code is scannable', 'shopping products'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "shopping products" with "specialty products" by assuming any product that requires comparison is a shopping.' }
          ],
            remediations: { 'students-often-confuse-shopping-products': { steps: ['If the student misclassifies products, have them revisit the decision criteria: (1) Frequency of purchase; (2) Effort.', 'Use a 2×2 matrix: Low effort + high frequency = Convenience; High effort + low brand insistence = Shopping; High effort.', 'Practice with 10 diverse products (e.g., toothpaste, laptop, life insurance, Ferrari, surgical mask) until.', 'Then re-attempt Diagnostic Questions 1 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "shopping products" with "specialty products" by assuming any product that requires comparison.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "For a specialty product like a luxury watch, branding is more important than packaging." Provide a reasoned judgment with examples.', answer: 'The statement is partially true but misleading',
                  options: ['The statement is partially true but misleading', 'branding is everything, packaging doesn\'t matter', 'both equally important', 'shopping products'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse "shopping products" with "specialty products" by assuming any product that requires comparison is a shopping.' }
          ],
            remediations: { 'students-often-confuse-shopping-products': { steps: ['If the student misclassifies products, have them revisit the decision criteria: (1) Frequency of purchase; (2) Effort.', 'Use a 2×2 matrix: Low effort + high frequency = Convenience; High effort + low brand insistence = Shopping; High effort.', 'Practice with 10 diverse products (e.g., toothpaste, laptop, life insurance, Ferrari, surgical mask) until.', 'Then re-attempt Diagnostic Questions 1 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_007', difficulty: 'standard',
          question: 'Channels of distribution refer to the path or route through which goods and.',
          hint: 'Review Marketing Mix (c12_bs_cbse_11_004) and Product Classification (c12_bs_cbse_11_005).',
          misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.',
          parts: [
                { id: 'a', prompt: 'Compare the functions of a \'wholesaler\' and a \'retailer\' in a two-level channel. Identify one function they share and one function unique to each.', answer: 'Shared: Risk-bearing (both hold stock)',
                  options: ['Shared: Risk-bearing (both hold stock)', 'selling', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' }
          ],
            remediations: { 'direct-channel-means-the-manufacturer': { steps: ['Revisit the definition of \'intermediary\' — an independent business entity that takes title or actively negotiates.', 'Draw a diagram: Manufacturer → [Own Retail Store] → Consumer.', 'Label: "Is the store an independent intermediary?', 'Contrast with Manufacturer → [Independent Wholesaler] → [Independent Retailer] → Consumer.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Eliminating all intermediaries (going direct) always increases the manufacturer\'s profit margin because the intermediary\'s markup is.', answer: 'For: (1) No markup paid to intermediaries → higher gross margin per unit',
                  options: ['For: (1) No markup paid to intermediaries → higher gross margin per unit', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' },
                { id: 'b', prompt: 'Create a novel distribution channel scenario for a new product: \'Smart Water Bottles\' (electronic sensor tracks hydration, syncs with phone, priced at ₹2,500).', answer: 'Good answer: Hybrid strategy',
                  options: ['Good answer: Hybrid strategy', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' },
                { id: 'c', prompt: 'Compare the functions of a \'wholesaler\' and a \'retailer\' in a two-level channel. Identify one function they share and one function unique to each.', answer: 'Shared: Risk-bearing (both hold stock)',
                  options: ['Shared: Risk-bearing (both hold stock)', 'selling', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' }
          ],
            remediations: { 'direct-channel-means-the-manufacturer': { steps: ['Revisit the definition of \'intermediary\' — an independent business entity that takes title or actively negotiates.', 'Draw a diagram: Manufacturer → [Own Retail Store] → Consumer.', 'Label: "Is the store an independent intermediary?', 'Contrast with Manufacturer → [Independent Wholesaler] → [Independent Retailer] → Consumer.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
