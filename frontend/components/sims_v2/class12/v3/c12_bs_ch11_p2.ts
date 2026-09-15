import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch11_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch11_p2: SimDef = {
    id: 'v3_c12_bs_ch11_p2',
    title: 'Marketing Management · Part 2/2',
    subtitle: 'The ad is the last step, not the first — what marketing really is',
    classLevel: 12, subject: 'business_studies', topic: 'Marketing Management · Part 2/2',
    chapters: ['c12_bs_ch11'],
    nodeIds: ['c12_bs_cbse_11_007', 'c12_bs_cbse_11_008', 'c12_bs_cbse_11_009', 'c12_bs_cbse_11_010', 'c12_bs_cbse_11_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Marketing strategist', intro: 'Every product you love reached you through a process that began before it existed — marketing is that process.', goal: 'Define marketing as a need-satisfying exchange process and contrast it with mere selling and advertising.' },
    discovery: {
        question: 'A founder finishes her music-learning app and announces: \'Product\'s ready — now we do marketing. Let\'s run Instagram ads.\' What did she get wrong?',
        options: ['Marketing started long before the app existed — identifying learner needs, designing the offering, pricing it and placing it in stores; ads are only the last step', 'Nothing — running ads is the entire job of marketing', 'She\'s only wrong because ads belong on TV, not Instagram', 'She should have registered the brand before any marketing could legally begin'],
        answer: 'Marketing started long before the app existed — identifying learner needs, designing the offering, pricing it and placing it in stores; ads are only the last step',
        hook: 'Students equate marketing with advertising or selling because that\'s the only part they see. The definition is a whole process — need identification, value creation, delivery and exchange — and promotion is just one tool inside it.',
    },
    teaching: [
        { title: 'Place: Channels of Distribution and their Types', text: 'Channels of distribution refer to the path or route through which goods and services move from the producer to the final consumer, including all intermediaries such as wholesalers, retailers, agents.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Take a new offering from blank page to launch: identify the customer need, shape the offering across product, price, place and promotion, and defend why selling is only a sliver of what you just did.',
        labels: ['Place: Channels of Distribution', 'Promotion: Advertising, Personal Selling,', 'Market Segmentation: Bases', 'Marketing Research: Meaning, Process', 'Consumer Behaviour: Factors Influencing'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_007', title: 'Place: Channels of Distribution and their Types',
          caseStudy: { intro: 'Imagine you want to buy a new smartphone. You could order it directly from the manufacturer\'s website (direct channel), buy it from a large electronics retail.',
            decisions: [{ prompt: 'State the definition of a \'zero-level channel\' and give one real-world example of a company in India that uses it for a major product line.', options: [
                { text: 'A zero-level channel (direct channel) is where the producer sells directly to the final', outcome: 'A zero-level channel (direct channel) is where the producer sells directly to the final consumer.' },
                { text: 'manufacturer → retailer → consumer', outcome: 'Not quite — Students often believe that \'direct channel\' means the manufacturer has no physical retail presence.', reveals: 'direct-channel-means-the-manufacturer' },
                { text: '\'direct channel\' means the manufacturer has no physical retail presence at all', outcome: 'Not quite — Students often believe that \'direct channel\' means the manufacturer has no physical retail presence.', reveals: 'direct-channel-means-the-manufacturer' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_008', title: 'Promotion: Advertising, Personal Selling, Sales Promotion, Public Relations',
          caseStudy: { intro: 'Imagine you are launching a new brand of organic honey in a crowded market.',
            decisions: [{ prompt: 'What are the four elements of the promotion mix as per the marketing mix (4 Ps)?', options: [
                { text: 'The four elements are advertising, personal selling, sales promotion, and public relations', outcome: 'The four elements are advertising, personal selling, sales promotion, and public relations.' },
                { text: 'direct marketing', outcome: 'Not quite — Students often think "promotion" means only "advertising" or "sales promotion" (discounts).', reveals: 'promotion-means-only-advertising-or' },
                { text: 'packaging', outcome: 'Not quite — Students often think "promotion" means only "advertising" or "sales promotion" (discounts).', reveals: 'promotion-means-only-advertising-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_009', title: 'Market Segmentation: Bases and Importance',
          caseStudy: { intro: 'Imagine you are launching a new brand of packaged millet snacks in India.',
            decisions: [{ prompt: 'What is the primary purpose of market segmentation according to NCERT Class 12 Business Studies?', options: [
                { text: 'The primary purpose is to divide a heterogeneous market into homogeneous sub-groups so', outcome: 'The primary purpose is to divide a heterogeneous market into homogeneous sub-groups so that a firm.' },
                { text: 'to increase total market size', outcome: 'Not quite — Students often think segmentation means "choosing a target market" — they confuse segmentation.', reveals: 'segmentation-means-choosing-a-target' },
                { text: 'choosing a target market', outcome: 'Not quite — Students often think segmentation means "choosing a target market" — they confuse segmentation.', reveals: 'segmentation-means-choosing-a-target' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_011', title: 'Consumer Behaviour: Factors Influencing Consumer Buying Decisions',
          caseStudy: { intro: 'Imagine you walk into a supermarket to buy toothpaste. You pick up a red pack of Colgate, but your friend insists on a green Ayurvedic brand.',
            decisions: [{ prompt: 'A student states: "Cultural factors are the most important because they are the broadest." Is this statement correct?', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. While cultural factors are the broadest, "most important" depends.' },
                { text: 'social class', outcome: 'Not quite — Students treat the four factor categories as mutually exclusive buckets.', reveals: 'students-treat-the-four-factor' },
                { text: 'income', outcome: 'Not quite — Students treat the four factor categories as mutually exclusive buckets.', reveals: 'students-treat-the-four-factor' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A founder finishes building a classical-music learning app and announces: \'Product done — now for marketing. Let\'s run Instagram ads.\' The ad spend burns through budget with almost no conversions.',
            decisions: [{ prompt: 'What did \'marketing\' actually require first?', options: [
                { text: 'Need research on what learners struggle with, features and pricing built around those needs, and distribution sorted out — ads only communicate an offering that\'s already been created and placed.', outcome: 'Marketing starts before the product exists and continues after the sale; promotion is just one element, so skipping to it wastes spend on an unvalidated offer.' },
                { text: 'He was right — marketing means advertising; conversions failing just means the ads were bad.', outcome: 'That collapses marketing into its promotion element; no ad quality fixes an offering nobody needed at a price nobody accepts.', reveals: 'marketing-is-advertising' },
                { text: 'He was right — marketing and selling are the same job: push whatever the team built.', outcome: 'Selling starts from the factory\'s output and the seller\'s needs; marketing starts from the customer\'s needs — opposite directions.', reveals: 'marketing-is-selling' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_11_011', title: 'You made it',
          caseStudy: { intro: 'You now see marketing as the system behind every product you buy, not the ad on top of it. That reframing is exactly what board questions test — and what real founders get wrong.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_007', difficulty: 'standard',
          question: 'Channels of distribution refer to the path or route through which goods and.',
          hint: 'Review Marketing Mix (c12_bs_cbse_11_004) and Product Classification (c12_bs_cbse_11_005).',
          misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.',
          parts: [
                { id: 'a', prompt: 'Compare the functions of a \'wholesaler\' and a \'retailer\' in a two-level channel. Identify one function they share and one function unique to each.', answer: 'Shared: Risk-bearing (both hold stock)',
                  options: ['Shared: Risk-bearing (both hold stock)', 'selling', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Review Marketing Mix (c12_bs_cbse_11_004) and Product Classification (c12_bs_cbse_11_005) to recall.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' }
          ],
            remediations: { 'direct-channel-means-the-manufacturer': { steps: ['Revisit the definition of \'intermediary\' — an independent business entity that takes title or actively negotiates.', 'Draw a diagram: Manufacturer → [Own Retail Store] → Consumer.', 'Label: "Is the store an independent intermediary?', 'Contrast with Manufacturer → [Independent Wholesaler] → [Independent Retailer] → Consumer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Eliminating all intermediaries (going direct) always increases the manufacturer\'s profit margin because the intermediary\'s markup.', answer: 'For: (1) No markup paid to intermediaries → higher gross margin per unit',
                  options: ['For: (1) No markup paid to intermediaries → higher gross margin per unit', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Review Marketing Mix (c12_bs_cbse_11_004) and Product Classification (c12_bs_cbse_11_005) to recall.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' },
                { id: 'b', prompt: 'Create a novel distribution channel scenario for a new product: \'Smart Water Bottles\' (electronic sensor tracks hydration, syncs with phone, priced at ₹2,500).', answer: 'Good answer: Hybrid strategy',
                  options: ['Good answer: Hybrid strategy', '\'direct channel\' means the manufacturer has no physical retail presence at all'],
                  hint: 'Review Marketing Mix (c12_bs_cbse_11_004) and Product Classification (c12_bs_cbse_11_005) to recall.',
                  misconception: 'Students often believe that \'direct channel\' means the manufacturer has no physical retail presence at all.' }
          ],
            remediations: { 'direct-channel-means-the-manufacturer': { steps: ['Revisit the definition of \'intermediary\' — an independent business entity that takes title or actively negotiates.', 'Draw a diagram: Manufacturer → [Own Retail Store] → Consumer.', 'Label: "Is the store an independent intermediary?', 'Contrast with Manufacturer → [Independent Wholesaler] → [Independent Retailer] → Consumer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_008', difficulty: 'standard',
          question: 'Promotion refers to the communication process used by marketers to inform.',
          hint: 'Revisit node c12_bs_cbse_11_004 (Marketing Mix: 4 Ps) and practice classifying products.',
          misconception: 'Students often think "promotion" means only "advertising" or "sales promotion" (discounts).',
          parts: [
                { id: 'a', prompt: 'Explain why personal selling is more effective than advertising for selling complex, high-value industrial machinery.', answer: 'Personal selling allows two-way communication, demonstration, negotiation, and',
                  options: ['Personal selling allows two-way communication, demonstration, negotiation, and', 'advertising is cheaper', 'promotion', 'advertising'],
                  hint: 'Revisit node c12_bs_cbse_11_004 (Marketing Mix: 4 Ps) and practice classifying products.',
                  misconception: 'Students often think "promotion" means only "advertising" or "sales promotion" (discounts).' },
                { id: 'b', prompt: 'A company selling affordable daily-use shampoo wants to quickly increase trial among price-sensitive rural consumers.', answer: 'Sales promotion (e.g., free sachets, discounts, coupons) should be primary',
                  options: ['Sales promotion (e.g., free sachets, discounts, coupons) should be primary', 'promotion', 'advertising', 'sales promotion'],
                  hint: 'Revisit node c12_bs_cbse_11_004 (Marketing Mix: 4 Ps) and practice classifying products.',
                  misconception: 'Students often think "promotion" means only "advertising" or "sales promotion" (discounts).' },
                { id: 'c', prompt: 'Compare the cost per contact and feedback immediacy of advertising vs personal selling.', answer: 'Advertising has low cost per contact but delayed/indirect feedback',
                  options: ['Advertising has low cost per contact but delayed/indirect feedback', 'promotion', 'advertising', 'sales promotion'],
                  hint: 'Revisit node c12_bs_cbse_11_004 (Marketing Mix: 4 Ps) and practice classifying products.',
                  misconception: 'Students often think "promotion" means only "advertising" or "sales promotion" (discounts).' }
          ],
            remediations: { 'promotion-means-only-advertising-or': { steps: ['If the student confuses promotion with only discounts/ads, first revisit the definition of promotion mix from node.', 'Then, create a comparison table of the four tools on parameters: nature of communication, cost per contact, feedback.', 'Use concrete examples: toothpaste (advertising + sales promotion), industrial robots (personal selling), new restaurant.', 'Ask the student to explain why each tool fits.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_009', difficulty: 'standard',
          question: 'Market segmentation is the process of dividing a heterogeneous total market.',
          hint: 'Revisit c12_bs_cbse_11_001 (Marketing: Meaning, Definition and Scope) and.',
          misconception: 'Students often think segmentation means "choosing a target market" — they confuse segmentation (slicing the whole.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why "income" is a demographic base while "lifestyle" is a psychographic base, using an Indian example for each.', answer: 'Income is a measurable, objective characteristic (quantifiable in rupees)',
                  options: ['Income is a measurable, objective characteristic (quantifiable in rupees)', 'choosing a target market'],
                  hint: 'Revisit c12_bs_cbse_11_001 (Marketing: Meaning, Definition and Scope) and c12_bs_cbse_11_004.',
                  misconception: 'Students often think segmentation means "choosing a target market" — they confuse segmentation (slicing the whole market) with targeting.' }
          ],
            remediations: { 'segmentation-means-choosing-a-target': { steps: ['If the student conflates segmentation with targeting, do this 3-step fix: (1) Draw a pizza representing the total.', '(2) Show segmentation as cutting the pizza into slices (geographic, demographic, etc.) — no slice is chosen yet.', '(3) Show targeting as picking ONE slice to serve.', 'Then give a practice exercise: "List 3 slices for a new Ayurvedic hair oil" — they must produce 3 distinct bases with.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_010', difficulty: 'standard',
          question: 'Marketing Research is the systematic and objective process of identifying.',
          hint: 'Revisit c11_stat_cbse_01_006 (Primary vs Secondary Data) and c12_bs_cbse_11_004.',
          misconception: 'Students equate "marketing research" with "conducting a questionnaire." They think Step 3 (data collection) IS the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Marketing Research is the systematic and objective process of identifying, collecting,',
                  options: ['Marketing Research is the systematic and objective process of identifying, collecting,', 'Marketing is a social and managerial process by', 'Marketing is a comprehensive, customer-oriented process that begins with identifying', 'Marketing Management Philosophies are five distinct orientations that guide how'],
                  hint: 'Revisit c11_stat_cbse_01_006 (Primary vs Secondary Data) and c12_bs_cbse_11_004 (Marketing Mix).',
                  misconception: 'Students equate "marketing research" with "conducting a questionnaire." They think Step 3 (data collection) IS the research, ignoring Steps.' }
          ],
            remediations: { 'students-equate-marketing-research-with': { steps: ['If a student cannot list the 5 steps in order: (1) Make them write each step on a sticky note, shuffle, re-sequence.', '(3) Re-diagnose: Give a new 2-line scenario (e.g., "Hotel occupancy dropping"), ask them to write ONLY Step 1 and Step.', 'If they write "Do a survey" for Step 1, revert to sticky-note exercise.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_11_011', difficulty: 'standard',
          question: 'Consumer behaviour refers to the study of how individuals, groups,.',
          hint: 'Review "Market Segmentation: Bases and Importance" (c12_bs_cbse_11_009) — focus on how.',
          misconception: 'Students treat the four factor categories as mutually exclusive buckets.',
          parts: [
                { id: 'a', prompt: 'A student states: "Cultural factors are the most important because they are the broadest." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'social class', 'income', 'breadth equals importance confuses scope with impact'],
                  hint: 'Review "Market Segmentation: Bases and Importance" (c12_bs_cbse_11_009) — focus on how.',
                  misconception: 'Students treat the four factor categories as mutually exclusive buckets.' },
                { id: 'b', prompt: 'Rahul, a 25-year-old software engineer, buys a premium noise-cancelling headphone after seeing his team lead use the same brand.', answer: 'Rahul: Social factor (reference group influence',
                  options: ['Rahul: Social factor (reference group influence', 'social class', 'income'],
                  hint: 'Review "Market Segmentation: Bases and Importance" (c12_bs_cbse_11_009) — focus on how.',
                  misconception: 'Students treat the four factor categories as mutually exclusive buckets.' },
                { id: 'c', prompt: 'A marketer of instant noodles wants to increase sales in South India where consumers traditionally prefer rice-based breakfasts.', answer: 'Primary factor: Cultural',
                  options: ['Primary factor: Cultural', 'social factors', 'psychological — change perception through advertising', 'social class'],
                  hint: 'Review "Market Segmentation: Bases and Importance" (c12_bs_cbse_11_009) — focus on how.',
                  misconception: 'Students treat the four factor categories as mutually exclusive buckets.' },
                { id: 'd', prompt: 'Compare and contrast how "family" operates as a social factor versus how "lifestyle" operates as a personal factor in the purchase of a family car.', answer: 'Family (social factor): Involves multiple roles (initiator: child suggests',
                  options: ['Family (social factor): Involves multiple roles (initiator: child suggests', 'social class', 'income'],
                  hint: 'Review "Market Segmentation: Bases and Importance" (c12_bs_cbse_11_009) — focus on how.',
                  misconception: 'Students treat the four factor categories as mutually exclusive buckets.' }
          ],
            remediations: { 'students-treat-the-four-factor': { steps: ['Revisit the "buying scenario mapping" exercise from the walkthrough.', 'For each misclassified item, identify the boundary confusion (e.g., "I put \'friend\'s advice\' under personal.', 'Create a "factor interaction diagram" for one high-involvement purchase showing arrows between categories (e.g.', 'Re-attempt Diagnostic Questions 2 and 4. If errors persist, review the definitions of "reference group," "lifestyle.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
