import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch13_p1: SimDef = {
    id: 'v3_c12_hs_ch13_p1',
    title: 'Consumer Education · Part 1/2',
    subtitle: 'Same machine, different buyer — the law sees the purpose',
    classLevel: 12, subject: 'home_science', topic: 'Consumer Education · Part 1/2',
    chapters: ['c12_hs_ch13'],
    nodeIds: ['c12_hs_cbse_13_001', 'c12_hs_cbse_13_002', 'c12_hs_cbse_13_003', 'c12_hs_cbse_13_004', 'c12_hs_cbse_13_005', 'c12_hs_cbse_13_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Consumer-law analyst', intro: 'Three shoppers buy the same notebooks — mother, principal, kirana owner. Only two are consumers.', goal: 'Classify consumers by purpose of purchase — and why resellers fall outside the Act\'s protection.' },
    discovery: {
        question: 'A hospital buys an MRI; a distributor buys the same MRI to resell. Two organisations, one machine — only one is a \'consumer\' under the law. Which, and why?',
        options: ['The hospital — consumer status follows end-use, not buyer type; the distributor purchases for resale, which the Act excludes', 'The distributor — whoever pays for goods counts as a consumer', 'Both — the Act protects every purchase of goods or services equally', 'Neither — consumer status applies only to individuals, never organisations'],
        answer: 'The hospital — consumer status follows end-use, not buyer type; the distributor purchases for resale, which the Act excludes',
        hook: '\'Anyone who pays is a consumer\' is wrong — the law protects personal, household and self-employment purchases only. A freelancer\'s laptop is a consumer purchase; a factory\'s raw cotton is not. Purpose, not payment, is the test.',
    },
    teaching: [
        { title: 'Consumer: Definition and Classification of Consumers', text: 'A consumer is any person who buys goods or avails services for personal use, household consumption, or self-employment purposes, in exchange for consideration (money, promise of payment, or deferred.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_13_001', title: 'Your mission',
          mission: { widget: 'supply', validate: 'supply:demand=80',
            instruction: 'On the lab: push demand to 80 — where does the price settle?.',
        context: 'Run the purpose test on edge cases: the farmer\'s own tractor versus the contractor\'s rental fleet, the school\'s mid-day meal versus the corporation\'s bridge steel — and draft a lawyer\'s three-question checklist.',
            observePrompt: 'What did the supply interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_001', title: 'Consumer: Definition and Classification of Consumers',
          caseStudy: { intro: 'Imagine you walk into a supermarket and see three shoppers: a mother buying milk for her child, a school principal purchasing 500 notebooks for students, and.',
            decisions: [{ prompt: 'A person purchases a laptop for their freelance graphic design work from home.', options: [
                { text: 'The buyer is an **Individual Consumer** (self-employment category)', outcome: 'The buyer is an **Individual Consumer** (self-employment category).' },
                { text: 'commercial buyer', outcome: 'Not quite — Students equate "consumer" with "any buyer who pays money" and classify all organisational buyers.', reveals: 'students-equate-consumer-with-any' },
                { text: 'reseller', outcome: 'Not quite — Students equate "consumer" with "any buyer who pays money" and classify all organisational buyers.', reveals: 'students-equate-consumer-with-any' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_003', title: 'Consumer Rights: Basic Rights as per Consumer Protection Act',
          caseStudy: { intro: 'Imagine you buy a new smartphone online, but when it arrives, the screen is cracked and the charger is missing.',
            decisions: [{ prompt: 'List the six basic consumer rights as per the Consumer Protection Act.', options: [
                { text: 'The six basic consumer rights are: (1) Right to Safety, (2) Right to be Informed, (3)', outcome: 'The six basic consumer rights are: (1) Right to Safety, (2) Right to be Informed, (3) Right.' },
                { text: 'Right to Refund', outcome: 'Not quite — Students often think "Right to Redressal" means an automatic right to a full refund or replacement.', reveals: 'right-to-redressal-means-an' },
                { text: 'Right to Warranty', outcome: 'Not quite — Students often think "Right to Redressal" means an automatic right to a full refund or replacement.', reveals: 'right-to-redressal-means-an' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_004', title: 'Consumer Responsibilities and Consumer Education: Need and Scope',
          caseStudy: { intro: 'Imagine you bought a packet of milk that curdled before the expiry date, but the shopkeeper refuses to exchange it because you didn’t keep the receipt.',
            decisions: [{ prompt: 'Define consumer responsibility and give one example that is NOT simply “complaining when cheated.”', options: [
                { text: 'Consumer responsibility is a proactive duty a buyer must fulfil to protect themselves and', outcome: 'Consumer responsibility is a proactive duty a buyer must fulfil to protect themselves and the.' },
                { text: 'filing a complaint after being cheated', outcome: 'Not quite — Students equate consumer responsibilities with “filing complaints” or “knowing rights.” They write.', reveals: 'students-equate-consumer-responsibilities-with' },
                { text: 'responsibilities are only invoked after a violation', outcome: 'Not quite — Students equate consumer responsibilities with “filing complaints” or “knowing rights.” They write.', reveals: 'students-equate-consumer-responsibilities-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_005', title: 'Consumer Problems: Adulteration, Misleading Advertising and Unfair Trade Practices',
          caseStudy: { intro: 'Imagine you bought a "100% pure honey" bottle that crystallised strangely, a fairness cream that promised "visible results in 7 days" but caused rashes, and.',
            decisions: [{ prompt: 'A student writes: "Adulteration means mixing something cheap with something expensive. Misleading advertising means lying in ads.', options: [
                { text: 'The statement oversimplifies all three concepts and misses legal nuances', outcome: 'The statement oversimplifies all three concepts and misses legal nuances.' },
                { text: 'cheating', outcome: 'Not quite — Students believe "adulteration only applies to food" and "misleading advertising only applies.', reveals: 'adulteration-only-applies-to-food' },
                { text: 'adulteration only applies to food', outcome: 'Not quite — Students believe "adulteration only applies to food" and "misleading advertising only applies.', reveals: 'adulteration-only-applies-to-food' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_006', title: 'Food Adulteration: Common Adulterants and Detection Methods',
          caseStudy: { intro: 'Imagine you buy a packet of turmeric powder from a local shop, and when you add it to warm milk, it leaves a bright yellow residue that doesn\'t dissolve.',
            decisions: [{ prompt: 'A student writes: "To detect metanil yellow in turmeric, add conc.', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. Conc. HCl alone does not produce a magenta colour with metanil yellow.' },
                { text: 'one universal test (like iodine or HCl) detects adulteration in any food', outcome: 'Not quite — Students believe **"one universal test (like iodine or HCl) detects adulteration in any food"**.', reveals: 'one-universal-test-like-iodine' },
                { text: 'add iodine to check purity', outcome: 'Not quite — Students believe **"one universal test (like iodine or HCl) detects adulteration in any food"**.', reveals: 'one-universal-test-like-iodine' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_13_002', title: 'Identify each idea',
          dissect: { specimen: 'Consumer Education · Part 1/2', spots: [
            { id: 's1', label: 'Consumer Definition and Classification of Consumers', prompt: 'Which idea is this? — A consumer is any person who buys goods or avails services for personal use, household.', answer: 'Consumer Definition and Classification of Consumers', options: ['Consumer Definition and Classification of Consumers', 'Consumer Rights Basic Rights as per Consumer Protection Act', 'Food Adulteration Common Adulterants and Detection Methods'] },
            { id: 's2', label: 'Consumer Rights Basic Rights as per Consumer Protection Act', prompt: 'Which idea is this? — Consumer rights are the fundamental entitlements guaranteed to every consumer under the.', answer: 'Consumer Rights Basic Rights as per Consumer Protection Act', options: ['Consumer Rights Basic Rights as per Consumer Protection Act', 'Consumer Definition and Classification of Consumers', 'Food Adulteration Common Adulterants and Detection Methods'] },
            { id: 's3', label: 'Food Adulteration Common Adulterants and Detection Methods', prompt: 'Which idea is this? — Food adulteration is the intentional or accidental addition, subtraction, or substitution.', answer: 'Food Adulteration Common Adulterants and Detection Methods', options: ['Food Adulteration Common Adulterants and Detection Methods', 'Consumer Definition and Classification of Consumers', 'Consumer Rights Basic Rights as per Consumer Protection Act'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your friend buys a ₹45,000 smartwatch right after a tech influencer\'s glowing review, though his current watch works fine — then asks you, genuinely puzzled, \'why did I even buy this?\'',
            decisions: [{ prompt: 'How do the five consumer-behaviour factors decode the purchase?', options: [
                { text: 'It was a layered pull — personal (his age and tech-job identity), psychological (the review taught him to perceive new \'needs\' and superior utility), social (the influencer as an aspirational reference group) — the factors converged to override a working watch.', outcome: 'The chapter\'s insight: purchases are rarely single-need — the watch was bought by the interplay of identity, perception and reference-group pressure, which is exactly the design marketers build for.' },
                { text: 'It was purely economic — he could afford it, so affordability explains the buy.', outcome: 'Income permits, it doesn\'t motivate — the same salary bought a functioning watch last year; what changed was perception and social pull, which are the psychological and social factors.', reveals: 'affordability-equals-motive' },
                { text: 'It was just advertising — he got manipulated, full stop.', outcome: 'The influencer is a mechanism, not the whole explanation — the buy needed his self-image to answer the pull; naming \'manipulation\' skips the personal and psychological levers that made him reachable.', reveals: 'ads-do-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_13_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now define \'consumer\' the way the law does — by what the purchase is FOR, not who paid for it.',
            decisions: [{ prompt: 'What comes next? Consumer Education · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Consumer Education · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'supply', prompt: 'Explore the supply interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'supply', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_001', difficulty: 'standard',
          question: 'A consumer is any person who buys goods or avails services for personal use.',
          hint: 'If stuck on classification, revisit the "purpose test" in c11_hs_cbse_04_001.',
          misconception: 'Students equate "consumer" with "any buyer who pays money" and classify all organisational buyers as "institutional.',
          parts: [
                { id: 'a', prompt: 'A person purchases a laptop for their freelance graphic design work from home. Under the Consumer Protection Act, how is this buyer classified, and why?', answer: 'The buyer is an **Individual Consumer** (self-employment category)',
                  options: ['The buyer is an **Individual Consumer** (self-employment category)', 'commercial buyer', 'reseller'],
                  hint: 'If stuck on classification, revisit the "purpose test" in c11_hs_cbse_04_001 (Characteristics.',
                  misconception: 'Students equate "consumer" with "any buyer who pays money" and classify all organisational buyers as "institutional consumers".' },
                { id: 'b', prompt: 'Explain in your own words why a hospital buying MRI machines is classified differently from a medical equipment distributor buying the same machines, even.', answer: 'The hospital is an **Institutional Consumer**',
                  options: ['The hospital is an **Institutional Consumer**', 'institutional buyers', 'consumers'],
                  hint: 'If stuck on classification, revisit the "purpose test" in c11_hs_cbse_04_001 (Characteristics.',
                  misconception: 'Students equate "consumer" with "any buyer who pays money" and classify all organisational buyers as "institutional consumers".' },
                { id: 'c', prompt: 'Compare the consumer status of: (a) a government school buying mid-day meal ingredients, (b) a government corporation buying steel to build a bridge.', answer: 'a government school buying mid-day meal ingredients, (',
                  options: ['a government school buying mid-day meal ingredients, (', 'end-use in service'],
                  hint: 'If stuck on classification, revisit the "purpose test" in c11_hs_cbse_04_001 (Characteristics.',
                  misconception: 'Students equate "consumer" with "any buyer who pays money" and classify all organisational buyers as "institutional consumers".' }
          ],
            remediations: { 'students-equate-consumer-with-any': { steps: ['If a student misclassifies buyers, do this 3-step remediation: (1) Draw a 2×2 matrix: Rows = Buyer Type (Individual.', '(2) Place 6 scenario cards (e.g., "mother buying milk", "kirana buying milk", "factory buying milk for ice cream".', '(3) For each misplaced card, ask: "Who *ultimately consumes* this product?" — the answer reveals the true consumer.', 'Re-test with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_002', difficulty: 'standard',
          question: 'Consumer needs refer to the fundamental requirements (physiological, safety.',
          hint: 'Review Maslow\'s hierarchy in c11_psy_cbse_08_004 and the resource classification.',
          misconception: 'Students often treat \'consumer needs\' and \'consumer wants\' as interchangeable, writing "need for a smartphone" when the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Consumer needs refer to the fundamental requirements (physiological, safety, social,',
                  options: ['Consumer needs refer to the fundamental requirements (physiological, safety, social,', 'A consumer is any person who buys goods or avails services for personal use, household', 'Consumer rights are the fundamental entitlements guaranteed to every consumer under the', 'Consumer responsibilities are the proactive duties a consumer must fulfil'],
                  hint: 'Review Maslow\'s hierarchy in c11_psy_cbse_08_004 and the resource classification.',
                  misconception: 'Students often treat \'consumer needs\' and \'consumer wants\' as interchangeable, writing "need for a smartphone" when the textbook.' }
          ],
            remediations: { 'students-often-treat-consumer-needs': { steps: ['Revisit the Maslow’s hierarchy diagram in Class 11 Psychology (c11_psy_cbse_08_004) and map each level to a product.', 'Create a two-column table: left column = 5 factor categories; right column = one personal purchase you made last month.', 'For any factor with no tick, ask "Could this factor have been activated by a marketer?" and write a one-sentence.', 'Re-attempt Diagnostic Questions 2 and 4; if still stuck, review the NCERT \'Basic Concepts\' section of Chapter 13.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_003', difficulty: 'standard',
          question: 'Consumer rights are the fundamental entitlements guaranteed to every consumer.',
          hint: 'If stuck, revisit c12_hs_cbse_13_001 (Consumer: Definition and Classification) and.',
          misconception: 'Students often think "Right to Redressal" means an automatic right to a full refund or replacement in every complaint.',
          parts: [
                { id: 'a', prompt: 'A consumer buys a "100% cotton" shirt that shrinks excessively after one wash. The label did not mention any pre-shrink treatment or care instructions.', answer: 'Two rights are violated: (1) Right to be Informed',
                  options: ['Two rights are violated: (1) Right to be Informed', 'Right to Redressal'],
                  hint: 'If stuck, revisit c12_hs_cbse_13_001 (Consumer: Definition and Classification) and clarify the.',
                  misconception: 'Students often think "Right to Redressal" means an automatic right to a full refund or replacement in every complaint.' }
          ],
            remediations: { 'right-to-redressal-means-an': { steps: ['If a student confuses redressal with automatic refund: Step 1 — Re-read the definition of Right to Redressal in the.', 'Step 3 — Practice with two scenarios: (a) Minor defect → repair ordered; (b) Major safety hazard → refund.', 'Step 4 — Re-attempt Diagnostic Question 3, explicitly naming the forum (District Commission) and the range of possible.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Right to Redressal" means an automatic right to a full refund or replacement in every complaint.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Right to Consumer Education is the most important right because it enables the exercise of all other rights." Support your.', answer: 'The statement is largely valid',
                  options: ['The statement is largely valid', 'Right to Redressal'],
                  hint: 'If stuck, revisit c12_hs_cbse_13_001 (Consumer: Definition and Classification) and clarify the.',
                  misconception: 'Students often think "Right to Redressal" means an automatic right to a full refund or replacement in every complaint.' }
          ],
            remediations: { 'right-to-redressal-means-an': { steps: ['If a student confuses redressal with automatic refund: Step 1 — Re-read the definition of Right to Redressal in the.', 'Step 3 — Practice with two scenarios: (a) Minor defect → repair ordered; (b) Major safety hazard → refund.', 'Step 4 — Re-attempt Diagnostic Question 3, explicitly naming the forum (District Commission) and the range of possible.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_004', difficulty: 'standard',
          question: 'Consumer responsibilities are the proactive duties a consumer must fulfil.',
          hint: 'Revisit node c12_hs_cbse_13_003 and create a mind‑map linking each right to its matching.',
          misconception: 'Students equate consumer responsibilities with “filing complaints” or “knowing rights.” They write: “Responsibility.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why consumer education is needed even when the Consumer Protection Act grants six legal rights.', answer: 'Legal rights exist on paper, but consumers need education to know those rights,',
                  options: ['Legal rights exist on paper, but consumers need education to know those rights,', 'responsibilities are only invoked after a violation'],
                  hint: 'Revisit node c12_hs_cbse_13_003 and create a mind‑map linking each right to its matching.',
                  misconception: 'Students equate consumer responsibilities with “filing complaints” or “knowing rights.” They write: “Responsibility is to complain.' },
                { id: 'b', prompt: 'A consumer buys a “100% natural” face cream online without checking for a licence number or reading reviews. She develops a rash.', answer: 'Neglected responsibilities: (1) Being informed',
                  options: ['Neglected responsibilities: (1) Being informed', 'responsibilities are only invoked after a violation'],
                  hint: 'Revisit node c12_hs_cbse_13_003 and create a mind‑map linking each right to its matching.',
                  misconception: 'Students equate consumer responsibilities with “filing complaints” or “knowing rights.” They write: “Responsibility is to complain.' },
                { id: 'c', prompt: 'Compare the scope of consumer education in a rural village versus an urban metro. Identify two overlaps and two differences.', answer: 'Overlaps: basic rights awareness, redressal mechanisms',
                  options: ['Overlaps: basic rights awareness, redressal mechanisms', 'responsibilities are only invoked after a violation'],
                  hint: 'Revisit node c12_hs_cbse_13_003 and create a mind‑map linking each right to its matching.',
                  misconception: 'Students equate consumer responsibilities with “filing complaints” or “knowing rights.” They write: “Responsibility is to complain.' }
          ],
            remediations: { 'students-equate-consumer-responsibilities-with': { steps: ['Have the student create a two‑column table: “Right” vs.', '“Corresponding Responsibility” for all six rights (e.g., Right to Safety → Responsibility to check quality marks).', 'Ask them to audit their last five purchases: which responsibilities did they fulfil?', 'Re‑attempt Diagnostic Question 3 with a new case study.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_005', difficulty: 'standard',
          question: 'Consumer problems refer to the systematic exploitation of consumers through.',
          hint: 'Revisit c12_hs_cbse_13_003 and create a 2-column table: Right Name | Real-world violation.',
          misconception: 'Students believe "adulteration only applies to food" and "misleading advertising only applies to TV/print ads.".',
          parts: [
                { id: 'a', prompt: 'A student writes: "Adulteration means mixing something cheap with something expensive. Misleading advertising means lying in ads.', answer: 'The statement oversimplifies all three concepts and misses legal nuances',
                  options: ['The statement oversimplifies all three concepts and misses legal nuances', 'cheating', 'adulteration only applies to food', 'misleading advertising only applies to TV/print ads'],
                  hint: 'Revisit c12_hs_cbse_13_003 and create a 2-column table: Right Name | Real-world violation example.',
                  misconception: 'Students believe "adulteration only applies to food" and "misleading advertising only applies to TV/print ads." In reality: (1).' },
                { id: 'b', prompt: 'A packaged juice label states "No Added Sugar" in large font. The ingredient list shows "Apple Juice Concentrate (60%), Water, Acidity Regulator (330), Vitamin.', answer: 'Yes, this is potentially misleading advertising',
                  options: ['Yes, this is potentially misleading advertising', 'sucrose', 'adulteration only applies to food', 'misleading advertising only applies to TV/print ads'],
                  hint: 'Revisit c12_hs_cbse_13_003 and create a 2-column table: Right Name | Real-world violation example.',
                  misconception: 'Students believe "adulteration only applies to food" and "misleading advertising only applies to TV/print ads." In reality: (1).' },
                { id: 'c', prompt: 'Compare and contrast: (a) Selling milk diluted with water, and (b) Selling "herbal weight-loss tea" containing undeclared sibutramine (a banned.', answer: 'Selling milk diluted with water, and (',
                  options: ['Selling milk diluted with water, and (', 'adulteration', 'adulteration only applies to food', 'misleading advertising only applies to TV/print ads'],
                  hint: 'Revisit c12_hs_cbse_13_003 and create a 2-column table: Right Name | Real-world violation example.',
                  misconception: 'Students believe "adulteration only applies to food" and "misleading advertising only applies to TV/print ads." In reality: (1).' }
          ],
            remediations: { 'adulteration-only-applies-to-food': { steps: ['Re-read CPA 2019 Sections 2(1)(b), 2(28), 2(47) — highlight the phrases "any goods," "any audio or visual," "includes."', 'Take 3 non-food products you used today (toothpaste, phone charger, detergent) — for each, invent one adulteration, one.', 'Map each to the exact section.', 'Re-attempt Diagnostic Questions 3 and 6. If still stuck, revisit c12_hs_cbse_13_003 (Consumer Rights) to re-anchor each.'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_13_006', difficulty: 'standard',
          question: 'Food adulteration is the intentional or accidental addition, subtraction,.',
          hint: 'Revisit c11_hs_cbse_03_003 (nutrient classification) and c11_bio_cbse_09_001-09_003.',
          misconception: 'Students believe **"one universal test (like iodine or HCl) detects adulteration in any food"** — they write "add.',
          parts: [
                { id: 'a', prompt: 'A student writes: "To detect metanil yellow in turmeric, add conc. HCl — if magenta colour appears, metanil yellow is present." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'one universal test (like iodine or HCl) detects adulteration in any food', 'add iodine to check purity'],
                  hint: 'Revisit c11_hs_cbse_03_003 (nutrient classification) and c11_bio_cbse_09_001-09_003 (carbohydrate.',
                  misconception: 'Students believe **"one universal test (like iodine or HCl) detects adulteration in any food"** — they write "add iodine to check purity".' },
                { id: 'b', prompt: 'You are given a sample of mustard oil suspected to be adulterated with argemone oil. You have BaCl₂ solution, conc. H₂SO₄, conc. HCl, and nitric acid.', answer: 'Step 1: Take 1 mL oil sample in a test tube',
                  options: ['Step 1: Take 1 mL oil sample in a test tube', 'one universal test (like iodine or HCl) detects adulteration in any food', 'add iodine to check purity'],
                  hint: 'Revisit c11_hs_cbse_03_003 (nutrient classification) and c11_bio_cbse_09_001-09_003 (carbohydrate.',
                  misconception: 'Students believe **"one universal test (like iodine or HCl) detects adulteration in any food"** — they write "add iodine to check purity".' },
                { id: 'c', prompt: 'Compare the detection of **kesari dal (Lathyrus sativus) in besan** vs **metanil yellow in turmeric**. Both use acid-based tests.', answer: 'Kesari dal detection uses **conc',
                  options: ['Kesari dal detection uses **conc', 'one universal test (like iodine or HCl) detects adulteration in any food', 'add iodine to check purity'],
                  hint: 'Revisit c11_hs_cbse_03_003 (nutrient classification) and c11_bio_cbse_09_001-09_003 (carbohydrate.',
                  misconception: 'Students believe **"one universal test (like iodine or HCl) detects adulteration in any food"** — they write "add iodine to check purity".' }
          ],
            remediations: { 'one-universal-test-like-iodine': { steps: ['If a student writes "iodine test" for non-starch adulterants: (1) Ask: "What functional group does iodine react with?".', '(2) Show the structure of metanil yellow (azo dye) and argemone alkaloid — neither has starch or significant.', '(3) Give a table: **Adulterant → Target Functional Group → Specific Reagent → Observation**.', '(4) Assign: "For each of the 8 food categories, write the adulterant, its chemical class, and why iodine fails." (5).'], labTask: { instruction: 'On the interactive: push demand to 80 — where does the price settle? — then check.', widget: 'supply', validate: 'supply:demand=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
