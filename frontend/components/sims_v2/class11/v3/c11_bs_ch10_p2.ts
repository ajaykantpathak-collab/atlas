import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch10_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch10_p2: SimDef = {
    id: 'v3_c11_bs_ch10_p2',
    title: 'Internal Trade · Part 2/2',
    subtitle: 'Follow one biscuit across three states and watch each trader earn his margin.',
    classLevel: 11, subject: 'business_studies', topic: 'Internal Trade · Part 2/2',
    chapters: ['c11_bs_ch10'],
    nodeIds: ['c11_bs_cbse_10_007', 'c11_bs_cbse_10_008', 'c11_bs_cbse_10_009', 'c11_bs_cbse_10_010', 'c11_bs_cbse_10_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a supply-chain analyst justifying each intermediary\'s cut', intro: 'A startup wants to \'cut out all middlemen\'. Before they delete the chain, make them name what each link actually does.', goal: 'Distinguish internal from external trade and wholesale from retail by quantity, purpose, and customer.' },
    discovery: {
        question: 'Punjab wheat becomes Delhi flour, passes a Mumbai wholesaler, then a kirana retailer, then you. A student claims the inter-state hops were \'external trade\' and the quantity alone separates wholesaler from retailer. Fix both errors in one stroke.',
        options: ['All of it is internal trade — borders were never crossed — and wholesale versus retail is set by purpose and customer, not just lot size', 'Only the last sale is internal; the rest crossed state lines', 'Quantity is indeed the sole test — big lots mean wholesale', 'The farmer\'s sale isn\'t trade because wheat is raw'],
        answer: 'All of it is internal trade — borders were never crossed — and wholesale versus retail is set by purpose and customer, not just lot size',
        hook: 'Internal means national borders, not state lines — and a wholesaler is defined by who buys and why, not merely how much.',
    },
    teaching: [
        { title: 'Chain Stores or Multiple Shops: Features and Merits', text: 'Chain stores or multiple shops are a network of retail outlets owned and operated by a single organisation (manufacturer or intermediary) that sell standardised, branded consumer products with rapid.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_10_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Trace a biscuit from a Gujarat factory to your hand, marking each intermediary\'s contribution — bulk-breaking, storage, transport, risk — and justify which transactions count as internal trade and why.',
        labels: ['Chain Stores or Multiple', 'Mail Order Houses: Features,', 'Super Markets and Discount', 'Role of Chambers', 'Distinction between Wholesale Trade'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_007', title: 'Chain Stores or Multiple Shops: Features and Merits',
          caseStudy: { intro: 'Imagine you visit a Bata shoe store in your city and later see another Bata store in a different city — same layout, same brands, same fixed prices.',
            decisions: [{ prompt: 'State the definition of chain stores or multiple shops as per NCERT Class 11 Business Studies.', options: [
                { text: 'Chain stores or multiple shops are networks of retail shops owned and operated by', outcome: 'Chain stores or multiple shops are networks of retail shops owned and operated by manufacturers.' },
                { text: 'wide variety of products', outcome: 'Not quite — Students often think chain stores are just "many branches of a big shop" and assume they offer wide.', reveals: 'chain-stores-are-just-many' },
                { text: 'credit sales', outcome: 'Not quite — Students often think chain stores are just "many branches of a big shop" and assume they offer wide.', reveals: 'chain-stores-are-just-many' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_008', title: 'Mail Order Houses: Features, Merits and Limitations',
          caseStudy: { intro: 'Imagine you live in a remote village in Rajasthan where the nearest shopping mall is 200 km away.',
            decisions: [{ prompt: 'State the six criteria that make a product suitable for mail order trading as per NCERT.', options: [
                { text: 'The six criteria are: (i) graded and standardised, (ii) easily transported at low cost,', outcome: 'The six criteria are: (i) graded and standardised, (ii) easily transported at low cost, (iii) ready.' },
                { text: 'perishable goods', outcome: 'Not quite — Students often confuse mail order houses with e-commerce (online shopping), assuming they are the.', reveals: 'students-often-confuse-mail-order' },
                { text: 'high-value jewellery', outcome: 'Not quite — Students often confuse mail order houses with e-commerce (online shopping), assuming they are the.', reveals: 'students-often-confuse-mail-order' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_009', title: 'Super Markets and Discount Stores: Features',
          caseStudy: { intro: 'Imagine you walk into a Big Bazaar or DMart on a weekend: you pick up a trolley, navigate aisles labelled "Staples," "Fresh Produce," "Home Care," select.',
            decisions: [{ prompt: 'State the six defining characteristics of a supermarket as per NCERT Class 11 Business Studies.', options: [
                { text: 'The six characteristics are: (i) Complete line of food items and groceries plus non-food', outcome: 'The six characteristics are: (i) Complete line of food items and groceries plus non-food.' },
                { text: 'cash-only', outcome: 'Not quite — Students often conflate "supermarket" and "departmental store" because both are large.', reveals: 'students-often-conflate-supermarket-and' },
                { text: 'self-service', outcome: 'Not quite — Students often conflate "supermarket" and "departmental store" because both are large.', reveals: 'students-often-conflate-supermarket-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_010', title: 'Role of Chambers of Commerce and Trade Associations',
          caseStudy: { intro: 'Imagine a truck loaded with Maharashtra mangoes stuck at the Madhya Pradesh border for hours because of octroi checks, while the fruit perishes.',
            decisions: [{ prompt: 'Name any three national-level Chambers of Commerce and Industry in India mentioned in the NCERT textbook.', options: [
                { text: 'The three national-level chambers are: (1) Associated Chamber of Commerce and Industry', outcome: 'The three national-level chambers are: (1) Associated Chamber of Commerce and Industry (ASSOCHAM).' },
                { text: 'Chambers impose sales tax rates', outcome: 'Not quite — Students often believe Chambers of Commerce are government regulatory bodies (like RBI or SEBI).', reveals: 'chambers-of-commerce-are-government' },
                { text: 'Chambers interact with government to harmonise sales tax structure', outcome: 'Not quite — Students often believe Chambers of Commerce are government regulatory bodies (like RBI or SEBI).', reveals: 'chambers-of-commerce-are-government' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_011', title: 'Distinction between Wholesale Trade and Retail Trade',
          caseStudy: { intro: 'Imagine you buy a 5kg bag of rice from a local kirana store for ₹300, but the same rice costs ₹250/kg if you buy a 50kg sack directly from a grain market.',
            decisions: [{ prompt: 'Define wholesale trade and retail trade in one sentence each, highlighting the primary difference in the target buyer.', options: [
                { text: 'Wholesale trade involves buying and selling goods in large quantities for resale or', outcome: 'Wholesale trade involves buying and selling goods in large quantities for resale or intermediate.' },
                { text: 'selling goods', outcome: 'Not quite — Students often believe "Wholesalers sell cheap, retailers sell expensive" is the only difference.', reveals: 'wholesalers-sell-cheap' },
                { text: 'Wholesalers sell cheap, retailers sell expensive', outcome: 'Not quite — Students often believe "Wholesalers sell cheap, retailers sell expensive" is the only difference.', reveals: 'wholesalers-sell-cheap' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a business-studies quiz bowl you\'re asked to sort four trades: (a) a Punjab farmer sells wheat to a Punjab mill, (b) the mill sells flour to a Delhi wholesaler, (c) the wholesaler sells to a Kochi retailer, (d) a Surat firm ships spices to Dubai. A rival buzzes: \'(b) and (c) are external trade — they cross state borders.\'',
            decisions: [{ prompt: 'Which trades are internal, which external?', options: [
                { text: '(a), (b) and (c) are all internal trade — the border that matters is the national one, not state lines; no customs duty applies anywhere inside India. Only (d) is external/international because goods cross the national frontier into the UAE.', outcome: 'Internal trade means buyer and seller both within the country\'s boundaries — distance and state lines are irrelevant.' },
                { text: 'The rival is right — \'internal\' means within a state, so inter-state commerce is external.', outcome: 'That uses the everyday meaning of \'internal\'; the trade definition turns on national borders — inter-state sales remain domestic internal trade.', reveals: 'interstate-is-external' },
                { text: '(a) isn\'t trade at all — a village farmer selling at a mandi is informal, not \'trade\'.', outcome: 'Formality isn\'t the criterion either; a farmer\'s mandi sale is a genuine internal wholesale transaction feeding the distribution chain.', reveals: 'informal-sale-not-trade' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_10_011', title: 'You made it',
          caseStudy: { intro: 'You saw the distribution chain as engineered value: every middleman exists because scattered producers and scattered consumers need bridging.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_007', difficulty: 'standard',
          question: 'Chain stores or multiple shops are a network of retail outlets owned and.',
          hint: 'Revisit "Retail Trade: Features and Functions of Retailers" (c11_bs_cbse_10_003) and.',
          misconception: 'Students often think chain stores are just "many branches of a big shop" and assume they offer wide variety like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Chain stores or multiple shops are a network of retail outlets owned and operated by a',
                  options: ['Chain stores or multiple shops are a network of retail outlets owned and operated by a', 'Internal trade refers to the buying and selling of goods and services within the', 'Wholesale trade refers to the purchase and sale of goods and services in large quantities', 'Retail trade refers to the business activity of purchasing goods in relatively large'],
                  hint: 'Revisit "Retail Trade: Features and Functions of Retailers" (c11_bs_cbse_10_003) and "Types.',
                  misconception: 'Students often think chain stores are just "many branches of a big shop" and assume they offer wide variety like departmental stores.' }
          ],
            remediations: { 'chain-stores-are-just-many': { steps: ['Ask the student to draw a two-column table: left column "Chain Store Feature", right column "What it means in practice".', 'Fill using Bata example: e.g., Feature: Centralised procurement → Practice: All Bata shoes made/ordered at head office.', 'Have them list 3 products they buy regularly (toothpaste, school shoes, notebooks) and identify which are sold via.', 'Give a scenario: "A chain store branch manager wants to stock a new local snack brand." Ask: "Can they?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think chain stores are just "many branches of a big shop" and assume they offer wide variety like.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "Chain stores are always more profitable than departmental stores because they have lower operating costs." Defend or critique using at least three.', answer: 'Critique — the statement is false',
                  options: ['Critique — the statement is false', 'many branches of a big shop', 'multiple shops', 'multiple product lines'],
                  hint: 'Revisit "Retail Trade: Features and Functions of Retailers" (c11_bs_cbse_10_003) and "Types.',
                  misconception: 'Students often think chain stores are just "many branches of a big shop" and assume they offer wide variety like departmental stores.' },
                { id: 'b', prompt: 'Design a mini business plan for a new chain store venture in India selling affordable branded school uniforms.', answer: 'two locations you would choose and why, (',
                  options: ['two locations you would choose and why, (', 'many branches of a big shop', 'multiple shops', 'multiple product lines'],
                  hint: 'Revisit "Retail Trade: Features and Functions of Retailers" (c11_bs_cbse_10_003) and "Types.',
                  misconception: 'Students often think chain stores are just "many branches of a big shop" and assume they offer wide variety like departmental stores.' }
          ],
            remediations: { 'chain-stores-are-just-many': { steps: ['Ask the student to draw a two-column table: left column "Chain Store Feature", right column "What it means in practice".', 'Fill using Bata example: e.g., Feature: Centralised procurement → Practice: All Bata shoes made/ordered at head office.', 'Have them list 3 products they buy regularly (toothpaste, school shoes, notebooks) and identify which are sold via.', 'Give a scenario: "A chain store branch manager wants to stock a new local snack brand." Ask: "Can they?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_008', difficulty: 'standard',
          question: 'Mail order houses are retail trading establishments that sell goods exclusively.',
          hint: 'Revisit c11_bs_cbse_10_005 (Types of Retail Trade: Large-Scale Retailers) to review the.',
          misconception: 'Students often confuse mail order houses with e-commerce (online shopping), assuming they are the same because both.',
          parts: [
                { id: 'a', prompt: 'A company wants to sell handmade artisanal pottery (fragile, unique designs, made-to-order) via mail order.', answer: 'Not suitable',
                  options: ['Not suitable', 'yes, because pictures can show design', 'ordering from home', 'instant order confirmation'],
                  hint: 'Revisit c11_bs_cbse_10_005 (Types of Retail Trade: Large-Scale Retailers) to review the.',
                  misconception: 'Students often confuse mail order houses with e-commerce (online shopping), assuming they are the same because both involve "ordering from.' }
          ],
            remediations: { 'students-often-confuse-mail-order': { steps: ['If a student conflates mail order with e-commerce: (1) Ask them to list the *exact* steps from seeing an ad.', '(2) Contrast with e-commerce steps (app → cart → UPI → courier tracking → OTP delivery).', '(3) Highlight three non-negotiable differences: *medium of order* (post vs internet), *payment trigger* (cash.', '(4) Give a practice question: "Why can\'t a mail order house offer \'7-day easy return\'?" — force them to reason through.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_009', difficulty: 'standard',
          question: 'A supermarket is a large-scale retail establishment operating on a self-service.',
          hint: 'Revisit c11_bs_cbse_10_005 "Types of Retail Trade: Large-Scale Retailers" and create.',
          misconception: 'Students often conflate "supermarket" and "departmental store" because both are large, multi-department, one-roof.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A supermarket is a large-scale retail establishment operating on a self-service basis,',
                  options: ['A supermarket is a large-scale retail establishment operating on a self-service basis,', 'Internal trade refers to the buying and selling of goods and services within the', 'Wholesale trade refers to the purchase and sale of goods and services in large quantities', 'Retail trade refers to the business activity of purchasing goods in relatively large'],
                  hint: 'Revisit c11_bs_cbse_10_005 "Types of Retail Trade: Large-Scale Retailers" and create.',
                  misconception: 'Students often conflate "supermarket" and "departmental store" because both are large, multi-department, one-roof retailers.' }
          ],
            remediations: { 'students-often-conflate-supermarket-and': { steps: ['Create a two-column table: left column "Departmental Store Feature," right column "Supermarket Feature." Fill from.', 'For each row, ask "Why?"—e.g., "Why cash-only?" → "To avoid bad debts and reduce working capital, enabling lower.', 'Memorise the "Self-Service + Cash-Only + Low Margin = Supermarket" triplet as the defining DNA.', 'Practice writing one 3-mark distinction question daily for a week until automatic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_010', difficulty: 'standard',
          question: 'Chambers of Commerce and Trade Associations are voluntary, non-governmental.',
          hint: 'Revisit c11_bs_cbse_10_001 (Internal Trade meaning) and c11_bs_cbse_10_002 (Wholesale.',
          misconception: 'Students often believe Chambers of Commerce are government regulatory bodies (like RBI or SEBI) that *enforce* laws.',
          parts: [
                { id: 'a', prompt: 'A manufacturer in Gujarat wants to send goods to a retailer in West Bengal. The truck faces delays at three state borders due to octroi collection.', answer: 'Intervention area: "Octroi and other local levies"',
                  options: ['Intervention area: "Octroi and other local levies"', 'chambers pay the octroi', 'chambers build roads', 'Chambers impose sales tax rates'],
                  hint: 'Revisit c11_bs_cbse_10_001 (Internal Trade meaning) and c11_bs_cbse_10_002 (Wholesale trade.',
                  misconception: 'Students often believe Chambers of Commerce are government regulatory bodies (like RBI or SEBI) that *enforce* laws on businesses.' }
          ],
            remediations: { 'chambers-of-commerce-are-government': { steps: ['If the student makes this error: (1) Ask: "Who pays the membership fees to FICCI – the government or the businesses?".', '(2) Show the NCERT phrase: "interact with the government at different levels to reorient or put in place policies".', 'Highlight \'interact with\' ≠ \'are part of\'.', '(3) Give a concrete analogy: "Chambers are like a students\' union talking to the principal; they don\'t set the exam.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_10_011', difficulty: 'standard',
          question: 'Wholesale trade refers to the purchase and sale of goods in large quantities.',
          hint: 'Re-read the \'Services of Wholesalers\' (10.3.1, 10.3.2) and \'Services of Retailers\'.',
          misconception: 'Students often believe "Wholesalers sell cheap, retailers sell expensive" is the only difference, confusing *price.',
          parts: [
                { id: 'a', prompt: 'Ramesh runs a shop buying 100 kg of sugar weekly from a wholesale market and selling it in 1 kg packets to households.', answer: 'Ramesh is primarily a retailer',
                  options: ['Ramesh is primarily a retailer', 'buys 100 kg', 'Wholesalers sell cheap, retailers sell expensive'],
                  hint: 'Re-read the \'Services of Wholesalers\' (10.3.1, 10.3.2) and \'Services of Retailers\' (10.4.1, 10.4.2).',
                  misconception: 'Students often believe "Wholesalers sell cheap, retailers sell expensive" is the only difference, confusing *price level* with *pricing.' }
          ],
            remediations: { 'wholesalers-sell-cheap': { steps: ['Draw a 3-box flowchart: Manufacturer → [Box A] → [Box B] → Consumer.', 'Ask: "Who is the buyer of Box A? (Retailer) Who is the buyer of Box B? (Consumer)".', 'Write the rule: "Wholesaler = Sells to Reseller. Retailer = Sells to Consumer."', 'Give 5 rapid-fire scenarios (e.g., "Farmer sells 50kg apples to jam factory", "Apparel store sells 1 shirt to you") and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
