import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch11_p1: SimDef = {
    id: 'v3_c12_bs_ch11_p1',
    title: 'Marketing Management · Part 1/2',
    subtitle: 'The ad is the last step, not the first — what marketing really is',
    classLevel: 12, subject: 'business_studies', topic: 'Marketing Management · Part 1/2',
    chapters: ['c12_bs_ch11'],
    nodeIds: ['c12_bs_cbse_11_001', 'c12_bs_cbse_11_002', 'c12_bs_cbse_11_003', 'c12_bs_cbse_11_004', 'c12_bs_cbse_11_005', 'c12_bs_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Marketing strategist', intro: 'Every product you love reached you through a process that began before it existed — marketing is that process.', goal: 'Define marketing as a need-satisfying exchange process and contrast it with mere selling and advertising.' },
    discovery: {
        question: 'A founder finishes her music-learning app and announces: \'Product\'s ready — now we do marketing. Let\'s run Instagram ads.\' What did she get wrong?',
        options: ['Marketing started long before the app existed — identifying learner needs, designing the offering, pricing it and placing it in stores; ads are only the last step', 'Nothing — running ads is the entire job of marketing', 'She\'s only wrong because ads belong on TV, not Instagram', 'She should have registered the brand before any marketing could legally begin'],
        answer: 'Marketing started long before the app existed — identifying learner needs, designing the offering, pricing it and placing it in stores; ads are only the last step',
        hook: 'Students equate marketing with advertising or selling because that\'s the only part they see. The definition is a whole process — need identification, value creation, delivery and exchange — and promotion is just one tool inside it.',
    },
    teaching: [
        { title: 'Marketing: Meaning, Definition and Scope', text: 'Marketing is a social and managerial process by which individuals and groups obtain what they need and want through creating, offering, and freely exchanging products and services of value with.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Take a new offering from blank page to launch: identify the customer need, shape the offering across product, price, place and promotion, and defend why selling is only a sliver of what you just did.',
        labels: ['Marketing: Meaning, Definition', 'Marketing vs Selling: Distinction', 'Marketing Management Philosophies: Production,', 'Marketing Mix: 4 Ps', 'Product: Classification and Branding,', 'Price: Factors Affecting Pricing'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_001', title: 'Marketing: Meaning, Definition and Scope',
          caseStudy: { intro: 'Imagine you want to buy a new smartphone. You see an Instagram reel reviewing the camera, read a comparison article on a tech website, visit a store to hold.',
            decisions: [{ prompt: 'Define marketing in one sentence using the Philip Kotler definition. Include the phrases "social process" and "freely exchanging."', options: [
                { text: 'Correct answer: Marketing is a social process by', outcome: 'Correct answer: Marketing is a social process by which individuals and groups obtain what they need.' },
                { text: 'marketing is selling products', outcome: 'Not quite — Students consistently equate marketing with only advertising or selling.', reveals: 'students-consistently-equate-marketing-with' },
                { text: 'marketing is advertising', outcome: 'Not quite — Students consistently equate marketing with only advertising or selling.', reveals: 'students-consistently-equate-marketing-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_002', title: 'Marketing vs Selling: Distinction',
          caseStudy: { intro: 'Imagine you walk into two electronics stores to buy a laptop. Store A\'s salesperson immediately pushes the most expensive model, highlighting its high.',
            decisions: [{ prompt: 'State the primary focus of marketing and the primary focus of selling as per NCERT Class 12 Business Studies.', options: [
                { text: 'Marketing focuses on **customer needs and satisfaction**', outcome: 'Marketing focuses on **customer needs and satisfaction**; selling focuses on **product and sales.' },
                { text: 'both focus on profit', outcome: 'Not quite — **Students equate "marketing" with "advertising/sales promotion" and think "selling" is just.', reveals: 'students-equate-marketing-with-advertising' },
                { text: 'marketing focuses on advertising', outcome: 'Not quite — **Students equate "marketing" with "advertising/sales promotion" and think "selling" is just.', reveals: 'students-equate-marketing-with-advertising' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_003', title: 'Marketing Management Philosophies: Production, Product, Selling, Marketing, Societal',
          caseStudy: { intro: 'Imagine you\'re starting a business selling packaged drinking water in a region with unreliable tap water.',
            decisions: [{ prompt: 'A company manufacturing basic cement focuses on maximizing production efficiency, achieving economies of scale, and ensuring the product.', options: [
                { text: 'Production Concept', outcome: 'Production Concept. The company focuses on high production efficiency, wide distribution, and low.' },
                { text: 'Product Concept', outcome: 'Not quite — Students treat the five philosophies as a historical timeline where companies "graduate" from.', reveals: 'students-treat-the-five-philosophies' },
                { text: 'making it well', outcome: 'Not quite — Students treat the five philosophies as a historical timeline where companies "graduate" from.', reveals: 'students-treat-the-five-philosophies' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_004', title: 'Marketing Mix: 4 Ps (Product, Price, Place, Promotion)',
          caseStudy: { intro: 'Imagine you are launching a new brand of cold-pressed juice in India. You have a great product, but sales are low. Where do you start?',
            decisions: [{ prompt: 'Define Marketing Mix and list its four components.', options: [
                { text: 'Marketing Mix is the set of controllable tactical tools (Product, Price, Place,', outcome: 'Marketing Mix is the set of controllable tactical tools (Product, Price, Place, Promotion) a firm.' },
                { text: 'People', outcome: 'Not quite — Students often treat the 4 Ps as independent checklists rather than an integrated system.', reveals: 'students-often-treat-the-4' },
                { text: 'Process', outcome: 'Not quite — Students often treat the 4 Ps as independent checklists rather than an integrated system.', reveals: 'students-often-treat-the-4' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_005', title: 'Product: Classification and Branding, Packaging and Labelling',
          caseStudy: { intro: 'Imagine you are launching a new organic honey brand in India. How do you decide whether it\'s a convenience or shopping product?',
            decisions: [{ prompt: 'A company sells industrial lubricants to manufacturing firms. The lubricants are purchased routinely with minimal comparison.', options: [
                { text: 'Industrial lubricants fall under "Supplies and Services"', outcome: 'Industrial lubricants fall under "Supplies and Services" — specifically "Maintenance and Repair.' },
                { text: 'Materials and Parts', outcome: 'Not quite — Students often confuse "shopping products" with "specialty products" by assuming any product that.', reveals: 'students-often-confuse-shopping-products' },
                { text: 'Capital Items', outcome: 'Not quite — Students often confuse "shopping products" with "specialty products" by assuming any product that.', reveals: 'students-often-confuse-shopping-products' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A founder finishes building a classical-music learning app and announces: \'Product done — now for marketing. Let\'s run Instagram ads.\' The ad spend burns through budget with almost no conversions.',
            decisions: [{ prompt: 'What did \'marketing\' actually require first?', options: [
                { text: 'Need research on what learners struggle with, features and pricing built around those needs, and distribution sorted out — ads only communicate an offering that\'s already been created and placed.', outcome: 'Marketing starts before the product exists and continues after the sale; promotion is just one element, so skipping to it wastes spend on an unvalidated offer.' },
                { text: 'He was right — marketing means advertising; conversions failing just means the ads were bad.', outcome: 'That collapses marketing into its promotion element; no ad quality fixes an offering nobody needed at a price nobody accepts.', reveals: 'marketing-is-advertising' },
                { text: 'He was right — marketing and selling are the same job: push whatever the team built.', outcome: 'Selling starts from the factory\'s output and the seller\'s needs; marketing starts from the customer\'s needs — opposite directions.', reveals: 'marketing-is-selling' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now see marketing as the system behind every product you buy, not the ad on top of it. That reframing is exactly what board questions test — and what real founders get wrong.',
            decisions: [{ prompt: 'What comes next? Marketing Management · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Marketing Management · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_001', difficulty: 'standard',
          question: 'Marketing is a social and managerial process by which individuals and groups.',
          hint: 'If stuck, revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) and.',
          misconception: 'Students consistently equate marketing with only advertising or selling.',
          parts: [
                { id: 'a', prompt: 'Define marketing in one sentence using the Philip Kotler definition. Include the phrases "social process" and "freely exchanging."', answer: 'Correct answer: Marketing is a social process by',
                  options: ['Correct answer: Marketing is a social process by', 'marketing is selling products', 'marketing is advertising'],
                  hint: 'If stuck, revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) and identify which.',
                  misconception: 'Students consistently equate marketing with only advertising or selling.' },
                { id: 'b', prompt: 'A local bakery wants to expand its business. The owner currently only sells walk-in cakes.', answer: 'Correct answer (any three with valid examples): Services',
                  options: ['Correct answer (any three with valid examples): Services', 'cakes, pastries, bread'],
                  hint: 'If stuck, revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) and identify which.',
                  misconception: 'Students consistently equate marketing with only advertising or selling.' },
                { id: 'c', prompt: 'Compare the AMA (2017) definition of marketing with the Kotler definition. Identify ONE key similarity and ONE key difference in their emphasis.', answer: 'Correct answer: Similarity',
                  options: ['Correct answer: Similarity', 'both are same', 'AMA includes stakeholders'],
                  hint: 'If stuck, revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) and identify which.',
                  misconception: 'Students consistently equate marketing with only advertising or selling.' }
          ],
            remediations: { 'students-consistently-equate-marketing-with': { steps: ['If the student equates marketing with advertising/selling: Step 1 — Have them re-read the Kotler definition and.', 'Does selling identify the need?" Step 3 — Use the smartphone walkthrough: list 5 marketing activities that happened.', 'Step 4 — Re-attempt Diagnostic Question 2 and 3.', 'If still stuck, revisit c11_bs_cbse_01_006 (Commerce: Trade and Auxiliaries to Trade) to see where marketing fits.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_002', difficulty: 'standard',
          question: 'Marketing is a comprehensive, customer-oriented process that begins with.',
          hint: 'If stuck, revisit c12_bs_cbse_11_001 and rewrite the definition of marketing as a 5-step.',
          misconception: '**Students equate "marketing" with "advertising/sales promotion" and think "selling" is just a subset of marketing.**.',
          parts: [
                { id: 'a', prompt: 'State the primary focus of marketing and the primary focus of selling as per NCERT Class 12 Business Studies.', answer: 'Marketing focuses on **customer needs and satisfaction**',
                  options: ['Marketing focuses on **customer needs and satisfaction**', 'both focus on profit', 'marketing focuses on advertising'],
                  hint: 'If stuck, revisit c12_bs_cbse_11_001 and rewrite the definition of marketing as a 5-step process.',
                  misconception: '**Students equate "marketing" with "advertising/sales promotion" and think "selling" is just a subset of marketing.** *Why this error.' },
                { id: 'b', prompt: 'A company manufactures electric scooters. The management says: "We have produced 10,000 units; now we need an aggressive sales team to push them through.', answer: 'This is a **selling orientation**',
                  options: ['This is a **selling orientation**', 'marketing because they want to sell'],
                  hint: 'If stuck, revisit c12_bs_cbse_11_001 and rewrite the definition of marketing as a 5-step process.',
                  misconception: '**Students equate "marketing" with "advertising/sales promotion" and think "selling" is just a subset of marketing.** *Why this error.' }
          ],
            remediations: { 'students-equate-marketing-with-advertising': { steps: ['**Revisit the comparison table in NCERT (Chapter 11, page 298-299)** — read the *explanatory text* for each row, not.', '**Watch the 10-minute video "Marketing vs Selling - Class 12 Business Studies" by Magnet Brains or Gyanipandit**.', '**Do this diagnostic re-test:** Take any 3 brands you use (e.g., Zomato, BoAt, Amul).', 'For each, write two actions — one proving marketing orientation, one proving selling orientation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_003', difficulty: 'standard',
          question: 'Marketing Management Philosophies are five distinct orientations that guide how.',
          hint: 'Revisit c12_bs_cbse_11_001 (Marketing Meaning) and c12_bs_cbse_11_002 (Marketing.',
          misconception: 'Students treat the five philosophies as a historical timeline where companies "graduate" from Production → Product →.',
          parts: [
                { id: 'a', prompt: 'A company manufacturing basic cement focuses on maximizing production efficiency, achieving economies of scale, and ensuring the product is available at every.', answer: 'Production Concept',
                  options: ['Production Concept', 'Product Concept', 'making it well', 'making it abundantly and cheaply'],
                  hint: 'Revisit c12_bs_cbse_11_001 (Marketing Meaning) and c12_bs_cbse_11_002 (Marketing vs Selling).',
                  misconception: 'Students treat the five philosophies as a historical timeline where companies "graduate" from Production → Product → Selling → Marketing →.' },
                { id: 'b', prompt: '"Consumers will favour products that offer the most quality, performance, and innovative features." This statement reflects the core assumption of which.', answer: 'Product Concept',
                  options: ['Product Concept', 'Marketing Concept', 'Selling Concept'],
                  hint: 'Revisit c12_bs_cbse_11_001 (Marketing Meaning) and c12_bs_cbse_11_002 (Marketing vs Selling).',
                  misconception: 'Students treat the five philosophies as a historical timeline where companies "graduate" from Production → Product → Selling → Marketing →.' },
                { id: 'c', prompt: 'A firm has unsold inventory of a seasonal product (woolen sweaters) as summer approaches.', answer: 'Selling Concept',
                  options: ['Selling Concept', 'Marketing Concept', 'marketing', 'any promotional activity is "marketing'],
                  hint: 'Revisit c12_bs_cbse_11_001 (Marketing Meaning) and c12_bs_cbse_11_002 (Marketing vs Selling).',
                  misconception: 'Students treat the five philosophies as a historical timeline where companies "graduate" from Production → Product → Selling → Marketing →.' }
          ],
            remediations: { 'students-treat-the-five-philosophies': { steps: ['If a student sequences them historically: (1) Ask: "Would a commodity salt manufacturer in 2024 benefit from Societal.', 'Why or why not?" (2) Have them map 5 real Indian companies (Ambuja Cement, Titan, LIC agent, Zomato, Aravind Eye Care).', '(3) Re-test with Diagnostic Question 4 (matrix) and Question 6 (startup pitch) to verify they now see philosophies.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the five philosophies as a historical timeline where companies "graduate" from Production → Product →.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "The Societal Marketing Concept is just the Marketing Concept with better PR.', answer: 'Refute',
                  options: ['Refute', 'long-term business survival', 'societal well-being'],
                  hint: 'Revisit c12_bs_cbse_11_001 (Marketing Meaning) and c12_bs_cbse_11_002 (Marketing vs Selling).',
                  misconception: 'Students treat the five philosophies as a historical timeline where companies "graduate" from Production → Product → Selling → Marketing →.' }
          ],
            remediations: { 'students-treat-the-five-philosophies': { steps: ['If a student sequences them historically: (1) Ask: "Would a commodity salt manufacturer in 2024 benefit from Societal.', 'Why or why not?" (2) Have them map 5 real Indian companies (Ambuja Cement, Titan, LIC agent, Zomato, Aravind Eye Care).', '(3) Re-test with Diagnostic Question 4 (matrix) and Question 6 (startup pitch) to verify they now see philosophies.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_004', difficulty: 'standard',
          question: 'Marketing Mix refers to the set of controllable tactical marketing tools.',
          hint: 'If stuck, revisit the distinction between marketing and selling (c12_bs_cbse_11_002) and.',
          misconception: 'Students often treat the 4 Ps as independent checklists rather than an integrated system.',
          parts: [
                { id: 'a', prompt: 'Define Marketing Mix and list its four components.', answer: 'Marketing Mix is the set of controllable tactical tools (Product, Price, Place,',
                  options: ['Marketing Mix is the set of controllable tactical tools (Product, Price, Place,', 'People', 'Process', 'People" or "Process'],
                  hint: 'If stuck, revisit the distinction between marketing and selling (c12_bs_cbse_11_002) and the.',
                  misconception: 'Students often treat the 4 Ps as independent checklists rather than an integrated system.' },
                { id: 'b', prompt: 'A company sells affordable smartphones but only through its own website. Sales are low in rural areas where internet penetration is low.', answer: 'Place is misaligned',
                  options: ['Place is misaligned', 'Promotion'],
                  hint: 'If stuck, revisit the distinction between marketing and selling (c12_bs_cbse_11_002) and the.',
                  misconception: 'Students often treat the 4 Ps as independent checklists rather than an integrated system.' },
                { id: 'c', prompt: 'A startup launches an organic skincare line priced at ₹2,500 for a 50ml bottle. Target customers are college students.', answer: 'Price and Product conflict with the target market',
                  options: ['Price and Product conflict with the target market', 'advertise more on Instagram', 'only changes Promotion (e', 'promotion can fix a wrong price-product fit'],
                  hint: 'If stuck, revisit the distinction between marketing and selling (c12_bs_cbse_11_002) and the.',
                  misconception: 'Students often treat the 4 Ps as independent checklists rather than an integrated system.' },
                { id: 'd', prompt: 'Compare the role of Product and Promotion in creating customer value. How does a change in Product design affect Promotion strategy?', answer: 'Product creates core value (features, quality, design)',
                  options: ['Product creates core value (features, quality, design)', 'how do the 4 Ps interact?'],
                  hint: 'If stuck, revisit the distinction between marketing and selling (c12_bs_cbse_11_002) and the.',
                  misconception: 'Students often treat the 4 Ps as independent checklists rather than an integrated system.' }
          ],
            remediations: { 'students-often-treat-the-4': { steps: ['Revisit c12_bs_cbse_11_001 (Marketing: Meaning, Definition and Scope) to recall the core marketing concept: satisfying.', 'Re-read c12_bs_cbse_11_003 (Marketing Management Philosophies) to see how different philosophies prioritize different.', 'Do a 15-minute exercise: take a familiar product (e.g., Parle-G biscuit) and write one sentence for each P showing how.', 'Re-attempt Diagnostic Question 3 and 4, explicitly writing the "if-then" links between Ps.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_005', difficulty: 'standard',
          question: 'Product classification categorizes goods into consumer products (convenience.',
          hint: 'If unclear on the 4Ps hierarchy, revisit c12_bs_cbse_11_004 and map how a change.',
          misconception: 'Students often confuse "shopping products" with "specialty products" by assuming any product that requires comparison.',
          parts: [
                { id: 'a', prompt: 'A company sells industrial lubricants to manufacturing firms. The lubricants are purchased routinely with minimal comparison.', answer: 'Industrial lubricants fall under "Supplies and Services"',
                  options: ['Industrial lubricants fall under "Supplies and Services"', 'Materials and Parts', 'Capital Items', 'materials'],
                  hint: 'If unclear on the 4Ps hierarchy, revisit c12_bs_cbse_11_004 and map how a change in product.',
                  misconception: 'Students often confuse "shopping products" with "specialty products" by assuming any product that requires comparison is a shopping.' },
                { id: 'b', prompt: '"Branding is just giving a catchy name to a product." Explain why this statement is incomplete and what three strategic functions branding performs beyond.', answer: 'Branding is not just a name; it performs: (1) Differentiation',
                  options: ['Branding is not just a name; it performs: (1) Differentiation', 'shopping products', 'specialty products'],
                  hint: 'If unclear on the 4Ps hierarchy, revisit c12_bs_cbse_11_004 and map how a change in product.',
                  misconception: 'Students often confuse "shopping products" with "specialty products" by assuming any product that requires comparison is a shopping.' },
                { id: 'c', prompt: 'A startup sells premium cold-pressed oils in 500ml glass bottles.', answer: 'No, this is not permissible',
                  options: ['No, this is not permissible', 'yes, if QR code is scannable', 'shopping products', 'specialty products'],
                  hint: 'If unclear on the 4Ps hierarchy, revisit c12_bs_cbse_11_004 and map how a change in product.',
                  misconception: 'Students often confuse "shopping products" with "specialty products" by assuming any product that requires comparison is a shopping.' },
                { id: 'd', prompt: 'Compare the packaging requirements for a consumer convenience product (e.g., biscuits) vs an industrial capital item (e.g., a CNC machine).', answer: 'For biscuits (convenience product): Primary packaging (wrapper) is critical for',
                  options: ['For biscuits (convenience product): Primary packaging (wrapper) is critical for', 'shopping products', 'specialty products'],
                  hint: 'If unclear on the 4Ps hierarchy, revisit c12_bs_cbse_11_004 and map how a change in product.',
                  misconception: 'Students often confuse "shopping products" with "specialty products" by assuming any product that requires comparison is a shopping.' }
          ],
            remediations: { 'students-often-confuse-shopping-products': { steps: ['If the student misclassifies products, have them revisit the decision criteria: (1) Frequency of purchase; (2) Effort.', 'Use a 2×2 matrix: Low effort + high frequency = Convenience; High effort + low brand insistence = Shopping; High effort.', 'Practice with 10 diverse products (e.g., toothpaste, laptop, life insurance, Ferrari, surgical mask) until.', 'Then re-attempt Diagnostic Questions 1 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_006', difficulty: 'standard',
          question: 'Price is the monetary value assigned to a product or service, representing the.',
          hint: 'If stuck, review Class 11 Economics Chapter 2 (Demand) and Class 11 Accountancy Chapter 8.',
          misconception: 'Students often think pricing is only about covering costs and adding a fixed profit margin (cost-plus).',
          parts: [
                { id: 'a', prompt: 'A company manufacturing pens has a fixed cost of ₹2,00,000 and variable cost of ₹5 per pen. It expects to sell 50,000 pens.', answer: 'Step 1: Total variable cost = ₹5 × 50,000 = ₹2,50,000',
                  options: ['Step 1: Total variable cost = ₹5 × 50,000 = ₹2,50,000', 'calculates markup on variable cost only (₹5 × 1'],
                  hint: 'If stuck, review Class 11 Economics Chapter 2 (Demand) and Class 11 Accountancy Chapter 8.',
                  misconception: 'Students often think pricing is only about covering costs and adding a fixed profit margin (cost-plus).' }
          ],
            remediations: { 'pricing-is-only-about-covering': { steps: ['If the student exhibits this misconception, have them revisit the concept of demand elasticity (Class 11 Economics.', 'Then ask them to analyse the pricing of a real product like the iPhone: identify whether Apple uses cost-plus.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
