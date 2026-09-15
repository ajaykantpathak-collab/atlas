import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch13_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch13_p2: SimDef = {
    id: 'v3_c12_hs_ch13_p2',
    title: 'Consumer Education · Part 2/2',
    subtitle: 'Same machine, different buyer — the law sees the purpose',
    classLevel: 12, subject: 'home_science', topic: 'Consumer Education · Part 2/2',
    chapters: ['c12_hs_ch13'],
    nodeIds: ['c12_hs_cbse_13_007', 'c12_hs_cbse_13_008', 'c12_hs_cbse_13_009', 'c12_hs_cbse_13_010', 'c12_hs_cbse_13_011', 'c12_hs_cbse_13_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Consumer-law analyst', intro: 'Three shoppers buy the same notebooks — mother, principal, kirana owner. Only two are consumers.', goal: 'Classify consumers by purpose of purchase — and why resellers fall outside the Act\'s protection.' },
    discovery: {
        question: 'A hospital buys an MRI; a distributor buys the same MRI to resell. Two organisations, one machine — only one is a \'consumer\' under the law. Which, and why?',
        options: ['The hospital — consumer status follows end-use, not buyer type; the distributor purchases for resale, which the Act excludes', 'The distributor', 'Both are consumers', 'Neither is'],
        answer: 'The hospital — consumer status follows end-use, not buyer type; the distributor purchases for resale, which the Act excludes',
        hook: '\'Anyone who pays is a consumer\' is wrong — the law protects personal, household and self-employment purchases only. A freelancer\'s laptop is a consumer purchase; a factory\'s raw cotton is not. Purpose, not payment, is the test.',
    },
    teaching: [
        { title: 'Standardisation and Quality Marks: ISI, AGMARK, FPO and BIS', text: 'Standardisation is the process of establishing and applying technical standards to ensure products, processes, and services meet specified quality, safety, and performance criteria; quality marks.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_13_007', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Run the purpose test on edge cases: the farmer\'s own tractor versus the contractor\'s rental fleet, the school\'s mid-day meal versus the corporation\'s bridge steel — and draft a lawyer\'s three-question checklist.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_007', title: 'Standardisation and Quality Marks: ISI, AGMARK, FPO and BIS',
          caseStudy: { intro: 'Imagine you pick up a packet of biscuits, a bottle of honey, and a pressure cooker in a supermarket — how do you know the biscuits aren\'t made with rancid fat.',
            decisions: [{ prompt: 'A student sees the ISI mark on a cement bag and the AGMARK on a packet of turmeric powder.', options: [
                { text: 'No, she is not correct', outcome: 'No, she is not correct. The ISI mark (now BIS) certifies *manufactured/industrial products* against.' },
                { text: 'quality mark', outcome: 'Not quite — Students often believe that **any product carrying a quality mark is automatically superior to one.', reveals: 'any-product-carrying-a-quality' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_008', title: 'Weights and Measures: Standards and Consumer Protection',
          caseStudy: { intro: 'Imagine you buy 1 kg of apples from a street vendor who uses a battered iron weight and a beam balance.',
            decisions: [{ prompt: 'What is the primary legislation governing weights and measures in India today, and which system of units does it mandate?', options: [
                { text: 'The Legal Metrology Act, 2009 is the primary legislation', outcome: 'The Legal Metrology Act, 2009 is the primary legislation; it mandates the International System.' },
                { text: 'both metric and imperial are allowed', outcome: 'Not quite — Students often believe that a verification stamp on a weighing scale is permanently valid once.', reveals: 'a-verification-stamp-on-a' },
                { text: 'the 1976 Act or saying "both metric and imperial are allowed', outcome: 'Not quite — Students often believe that a verification stamp on a weighing scale is permanently valid once.', reveals: 'a-verification-stamp-on-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_010', title: 'Consumer Disputes Redressal Commissions: District, State and National',
          caseStudy: { intro: 'Imagine you bought a premium smart TV for ₹1.2 lakh that developed a manufacturing defect within a week, and the seller refuses replacement citing "physical.',
            decisions: [{ prompt: 'What is the maximum pecuniary jurisdiction of the District Consumer Disputes Redressal Commission under the Consumer Protection Act, 2019?', options: [
                { text: 'The maximum pecuniary jurisdiction of the District Commission is ₹1 crore', outcome: 'The maximum pecuniary jurisdiction of the District Commission is ₹1 crore.' },
                { text: 'District Forum', outcome: 'Not quite — Students often believe that the District Commission is called "District Forum" and the State.', reveals: 'the-district-commission-is-called' },
                { text: 'State Commission', outcome: 'Not quite — Students often believe that the District Commission is called "District Forum" and the State.', reveals: 'the-district-commission-is-called' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_011', title: 'Role of Consumer Organisations and NGOs in Consumer Protection',
          caseStudy: { intro: 'Imagine you purchase a popular branded pressure cooker that bursts due to a manufacturing defect, causing injury.',
            decisions: [{ prompt: 'Name any two national-level consumer NGOs in India and state one specific function each performs that is NOT directly filing a case in.', options: [
                { text: 'Correct answer: (1) Consumer Unity & Trust Society (CUTS) – conducts policy research and', outcome: 'Correct answer: (1) Consumer Unity & Trust Society (CUTS) – conducts policy research and advocacy.' },
                { text: 'filing cases', outcome: 'Not quite — Students often believe consumer NGOs are primarily "lawyers for the poor" who only file cases.', reveals: 'consumer-ngos-are-primarily-lawyers' },
                { text: 'helping consumers', outcome: 'Not quite — Students often believe consumer NGOs are primarily "lawyers for the poor" who only file cases.', reveals: 'consumer-ngos-are-primarily-lawyers' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_012', title: 'Sustainable Consumption and Green Consumerism',
          caseStudy: { intro: 'Imagine you are buying a new refrigerator. You see two models: one costs ₹25,000 with a 2-star energy rating, the other ₹32,000 with a 5-star rating.',
            decisions: [{ prompt: 'Define "green consumerism" in one sentence and name two eco-labels recognized in India that a green consumer would look for on a product.', options: [
                { text: 'Green consumerism is the practice of choosing products based on their minimal', outcome: 'Green consumerism is the practice of choosing products based on their minimal environmental impact.' },
                { text: 'buying green-colored products', outcome: 'Not quite — Students often think **green consumerism means buying more "eco-friendly" products**.', reveals: 'green-consumerism-means-buying-more' },
                { text: 'ISO 9001', outcome: 'Not quite — Students often think **green consumerism means buying more "eco-friendly" products**.', reveals: 'green-consumerism-means-buying-more' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_13_008', title: 'Identify each idea',
          dissect: { specimen: 'Consumer Education · Part 2/2', spots: [
            { id: 's1', label: 'Standardisation and Quality Marks ISI AGMARK FPO and BIS', prompt: 'Which idea is this? — Standardisation is the process of establishing and applying technical standards to ensure.', answer: 'Standardisation and Quality Marks ISI AGMARK FPO and BIS', options: ['Standardisation and Quality Marks ISI AGMARK FPO and BIS', 'Weights and Measures Standards and Consumer Protection', 'Consumer Protection Act 1986 Redressal Mechanism and Forums', 'Sustainable Consumption and Green Consumerism'] },
            { id: 's2', label: 'Weights and Measures Standards and Consumer Protection', prompt: 'Which idea is this? — Weights and Measures standards refer to the legally mandated system of uniform units.', answer: 'Weights and Measures Standards and Consumer Protection', options: ['Weights and Measures Standards and Consumer Protection', 'Standardisation and Quality Marks ISI AGMARK FPO and BIS', 'Consumer Protection Act 1986 Redressal Mechanism and Forums', 'Sustainable Consumption and Green Consumerism'] },
            { id: 's3', label: 'Consumer Protection Act 1986 Redressal Mechanism and Forums', prompt: 'Which idea is this? — The Consumer Protection Act 1986 establishes a three-tier quasi-judicial redressal.', answer: 'Consumer Protection Act 1986 Redressal Mechanism and Forums', options: ['Consumer Protection Act 1986 Redressal Mechanism and Forums', 'Standardisation and Quality Marks ISI AGMARK FPO and BIS', 'Weights and Measures Standards and Consumer Protection', 'Sustainable Consumption and Green Consumerism'] },
            { id: 's4', label: 'Sustainable Consumption and Green Consumerism', prompt: 'Which idea is this? — Sustainable consumption refers to the use of goods and services that meet present needs.', answer: 'Sustainable Consumption and Green Consumerism', options: ['Sustainable Consumption and Green Consumerism', 'Standardisation and Quality Marks ISI AGMARK FPO and BIS', 'Weights and Measures Standards and Consumer Protection', 'Consumer Protection Act 1986 Redressal Mechanism and Forums'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your friend buys a ₹45,000 smartwatch right after a tech influencer\'s glowing review, though his current watch works fine — then asks you, genuinely puzzled, \'why did I even buy this?\'',
            decisions: [{ prompt: 'How do the five consumer-behaviour factors decode the purchase?', options: [
                { text: 'It was a layered pull — personal (his age and tech-job identity), psychological (the review taught him to perceive new \'needs\' and superior utility), social (the influencer as an aspirational reference group) — the factors converged to override a working watch.', outcome: 'The chapter\'s insight: purchases are rarely single-need — the watch was bought by the interplay of identity, perception and reference-group pressure, which is exactly the design marketers build for.' },
                { text: 'It was purely economic — he could afford it, so affordability explains the buy.', outcome: 'Income permits, it doesn\'t motivate — the same salary bought a functioning watch last year; what changed was perception and social pull, which are the psychological and social factors.', reveals: 'affordability-equals-motive' },
                { text: 'It was just advertising — he got manipulated, full stop.', outcome: 'The influencer is a mechanism, not the whole explanation — the buy needed his self-image to answer the pull; naming \'manipulation\' skips the personal and psychological levers that made him reachable.', reveals: 'ads-do-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_012', title: 'You made it',
          caseStudy: { intro: 'You can now define \'consumer\' the way the law does — by what the purchase is FOR, not who paid for it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_007', difficulty: 'standard',
          question: 'Standardisation is the process of establishing and applying technical standards.',
          hint: 'Revisit the "Consumer Rights" node (c12_hs_cbse_13_003) and match each right to the.',
          misconception: 'Students often believe that **any product carrying a quality mark is automatically superior to one without it**, and.',
          parts: [
                { id: 'a', prompt: 'A student sees the ISI mark on a cement bag and the AGMARK on a packet of turmeric powder.', answer: 'No, she is not correct',
                  options: ['No, she is not correct', 'quality mark'],
                  hint: 'Revisit the "Consumer Rights" node (c12_hs_cbse_13_003) and match each right to the quality mark.',
                  misconception: 'Students often believe that **any product carrying a quality mark is automatically superior to one without it**, and that **all quality.' }
          ],
            remediations: { 'any-product-carrying-a-quality': { steps: ['If a student cannot differentiate the marks by product domain and legal status: (1) Have them create a 4-column table.', '(2) Ask them to visit the BIS Care app, AGMARKNET, and FSSAI portal (or screenshots) to *verify a real licence number*.', '(3) Re-diagnose with DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_5, which specifically test the mandatory/voluntary.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_008', difficulty: 'standard',
          question: 'Weights and Measures standards refer to the legally mandated system of uniform.',
          hint: 'Review c12_hs_cbse_13_003 (Consumer Rights) and c12_hs_cbse_13_007 (Standardisation.',
          misconception: 'Students often believe that a verification stamp on a weighing scale is permanently valid once issued, like a vehicle.',
          parts: [
                { id: 'a', prompt: 'What is the primary legislation governing weights and measures in India today, and which system of units does it mandate?', answer: 'The Legal Metrology Act, 2009 is the primary legislation',
                  options: ['The Legal Metrology Act, 2009 is the primary legislation', 'both metric and imperial are allowed', 'the 1976 Act or saying "both metric and imperial are allowed'],
                  hint: 'Review c12_hs_cbse_13_003 (Consumer Rights) and c12_hs_cbse_13_007 (Standardisation Marks) — focus.',
                  misconception: 'Students often believe that a verification stamp on a weighing scale is permanently valid once issued, like a vehicle registration.' },
                { id: 'b', prompt: 'A vendor uses a 1 kg brass weight to weigh sugar on a beam balance.', answer: 'Actual error = True mass – Nominal mass = 985 g – 1000 g = –15 g',
                  options: ['Actual error = True mass – Nominal mass = 985 g – 1000 g = –15 g', 'miscalculates error direction (e'],
                  hint: 'Review c12_hs_cbse_13_003 (Consumer Rights) and c12_hs_cbse_13_007 (Standardisation Marks) — focus.',
                  misconception: 'Students often believe that a verification stamp on a weighing scale is permanently valid once issued, like a vehicle registration.' }
          ],
            remediations: { 'a-verification-stamp-on-a': { steps: ['If a student cannot interpret the quarterly expiry on a verification stamp, have them: (1) Revisit the stamp diagram.', '13.3) and practice reading 5 sample stamps with different year/quarter combinations; (2) Calculate expiry dates for.', 'If they still err, they must review the Legal Metrology (General) Rules, 2011, Rule 12 on verification validity.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_009', difficulty: 'standard',
          question: 'The Consumer Protection Act 1986 establishes a three-tier quasi-judicial.',
          hint: 'If unsure, review c12_hs_cbse_13_001 (consumer definition) and c12_hs_cbse_13_003.',
          misconception: 'Students often think the District Forum handles claims up to ₹1 crore and the State Commission up to ₹20 lakh.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Consumer Protection Act 1986 establishes a three-tier quasi-judicial redressal',
                  options: ['The Consumer Protection Act 1986 establishes a three-tier quasi-judicial redressal', 'A consumer is any person who buys goods or avails services for personal use, household', 'Consumer needs refer to the fundamental requirements (physiological, safety, social,', 'Consumer rights are the fundamental entitlements guaranteed to every consumer under the'],
                  hint: 'If unsure, review c12_hs_cbse_13_001 (consumer definition) and c12_hs_cbse_13_003 (consumer rights).',
                  misconception: 'Students often think the District Forum handles claims up to ₹1 crore and the State Commission up to ₹20 lakh — swapping the two middle.' }
          ],
            remediations: { 'the-district-forum-handles-claims': { steps: ['Revisit the pecuniary limits table — write them in ascending order: District (₹20L), State (₹20L–₹1Cr), National.', 'Create a mnemonic: "District = 20, State = 1 Crore, National = Above".', 'Practice 5 jurisdiction-mapping problems (e.g., claim ₹5L, ₹50L, ₹2Cr).', 'Re-attempt Diagnostic Questions 1, 3, 5. If still wrong, review the Act\'s Sections 9, 17, 21 (jurisdiction) and 15, 19.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_010', difficulty: 'standard',
          question: 'The Consumer Disputes Redressal Commissions are a three-tier quasi-judicial.',
          hint: 'Revisit c12_hs_cbse_13_009 (Consumer Protection Act 1986: Redressal Mechanism) and.',
          misconception: 'Students often believe that the District Commission is called "District Forum" and the State Commission is "State.',
          parts: [
                { id: 'a', prompt: 'What is the maximum pecuniary jurisdiction of the District Consumer Disputes Redressal Commission under the Consumer Protection Act, 2019?', answer: 'The maximum pecuniary jurisdiction of the District Commission is ₹1 crore',
                  options: ['The maximum pecuniary jurisdiction of the District Commission is ₹1 crore', 'District Forum', 'State Commission'],
                  hint: 'Revisit c12_hs_cbse_13_009 (Consumer Protection Act 1986: Redressal Mechanism) and compare the 1986.',
                  misconception: 'Students often believe that the District Commission is called "District Forum" and the State Commission is "State Commission" under the.' },
                { id: 'b', prompt: 'A consumer files a complaint against a builder for deficiency in service regarding a flat worth ₹8 crore.', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'District Forum', 'State Commission'],
                  hint: 'Revisit c12_hs_cbse_13_009 (Consumer Protection Act 1986: Redressal Mechanism) and compare the 1986.',
                  misconception: 'Students often believe that the District Commission is called "District Forum" and the State Commission is "State Commission" under the.' }
          ],
            remediations: { 'the-district-commission-is-called': { steps: ['If the student confuses the 1986 and 2019 Act terminology or appeal hierarchy: (1) Have them create a two-column table.', '(2) Walk through a concrete case: "₹50 lakh complaint → District Commission → appeal to State Commission in 45 days.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the District Commission is called "District Forum" and the State Commission is "State.',
          parts: [
                { id: 'a', prompt: 'Design a flowchart that a consumer can follow to decide which commission to approach for a complaint about a defective laptop worth ₹75,000, including the.', answer: 'Flowchart: Start → Value ≤ ₹1 crore?',
                  options: ['Flowchart: Start → Value ≤ ₹1 crore?', 'District Forum', 'State Commission'],
                  hint: 'Revisit c12_hs_cbse_13_009 (Consumer Protection Act 1986: Redressal Mechanism) and compare the 1986.',
                  misconception: 'Students often believe that the District Commission is called "District Forum" and the State Commission is "State Commission" under the.' }
          ],
            remediations: { 'the-district-commission-is-called': { steps: ['If the student confuses the 1986 and 2019 Act terminology or appeal hierarchy: (1) Have them create a two-column table.', '(2) Walk through a concrete case: "₹50 lakh complaint → District Commission → appeal to State Commission in 45 days.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_011', difficulty: 'standard',
          question: 'Consumer organisations and NGOs (Non-Governmental Organisations) in consumer.',
          hint: 'Revisit c12_hs_cbse_13_003 (Consumer Rights) and c12_hs_cbse_13_010 (Redressal.',
          misconception: 'Students often believe consumer NGOs are primarily "lawyers for the poor" who only file cases in consumer courts.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Consumer organisations and NGOs (Non-Governmental Organisations) in consumer protection',
                  options: ['Consumer organisations and NGOs (Non-Governmental Organisations) in consumer protection', 'A consumer is any person who buys goods or avails services for personal use, household', 'Consumer needs refer to the fundamental requirements (physiological, safety, social,', 'Consumer rights are the fundamental entitlements guaranteed to every consumer under the'],
                  hint: 'Revisit c12_hs_cbse_13_003 (Consumer Rights) and c12_hs_cbse_13_010 (Redressal Commissions) — focus.',
                  misconception: 'Students often believe consumer NGOs are primarily "lawyers for the poor" who only file cases in consumer courts.' }
          ],
            remediations: { 'consumer-ngos-are-primarily-lawyers': { steps: ['If the student holds this misconception: (1) Assign them to visit the website of any one Indian consumer NGO (e.g.', '(2) Have them compare the NGO\'s activities with the powers of the District Commission (c12_hs_cbse_13_010) using a Venn.', '(3) Re-test with Diagnostic Question 2 and 4 to verify they can now distinguish proactive vs reactive functions and NGO.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_012', difficulty: 'standard',
          question: 'Sustainable consumption refers to the use of goods and services that meet.',
          hint: 'Revisit the "life cycle of a T-shirt" diagram from Class 11 Ecology (c11_soc_cbse_08_008).',
          misconception: 'Students often think **green consumerism means buying more "eco-friendly" products**.',
          parts: [
                { id: 'a', prompt: 'Define "green consumerism" in one sentence and name two eco-labels recognized in India that a green consumer would look for on a product.', answer: 'Green consumerism is the practice of choosing products based on their minimal',
                  options: ['Green consumerism is the practice of choosing products based on their minimal', 'buying green-colored products', 'ISO 9001', 'eco-friendly'],
                  hint: 'Revisit the "life cycle of a T-shirt" diagram from Class 11 Ecology (c11_soc_cbse_08_008) and trace.',
                  misconception: 'Students often think **green consumerism means buying more "eco-friendly" products**.' },
                { id: 'b', prompt: 'Explain why "reduce" is placed before "reuse" and "recycle" in the 3R hierarchy, using the concept of life cycle impact.', answer: '"Reduce" is highest',
                  options: ['"Reduce" is highest', 'recycle is best because it makes new things', 'eco-friendly', '**green consumerism means buying more "eco-friendly" products**'],
                  hint: 'Revisit the "life cycle of a T-shirt" diagram from Class 11 Ecology (c11_soc_cbse_08_008) and trace.',
                  misconception: 'Students often think **green consumerism means buying more "eco-friendly" products**.' },
                { id: 'c', prompt: 'A family replaces ten 60W incandescent bulbs (used 5 hours/day) with 9W LED bulbs. Electricity costs ₹7/kWh.', answer: '**Step 1:** Power saved per bulb = 60W – 9W = 51W = 0.051 kW',
                  options: ['**Step 1:** Power saved per bulb = 60W – 9W = 51W = 0.051 kW', 'eco-friendly', '**green consumerism means buying more "eco-friendly" products**'],
                  hint: 'Revisit the "life cycle of a T-shirt" diagram from Class 11 Ecology (c11_soc_cbse_08_008) and trace.',
                  misconception: 'Students often think **green consumerism means buying more "eco-friendly" products**.' }
          ],
            remediations: { 'green-consumerism-means-buying-more': { steps: ['If a student exhibits this misconception: 1.', '**Ask them to calculate** the carbon footprint of manufacturing one stainless steel bottle (≈ 1.2 kg CO₂) vs.', 'one PET bottle (≈ 0.08 kg CO₂).', '**Show** that the steel bottle must replace *at least 15* PET bottles to break even.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
