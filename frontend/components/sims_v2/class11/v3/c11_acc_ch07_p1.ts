import type { SimDef } from '../../engine/types';

/** v3 generated — c11_acc_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_acc_ch07_p1: SimDef = {
    id: 'v3_c11_acc_ch07_p1',
    title: 'Depreciation, Provisions and Reserves · Part 1/2',
    subtitle: 'Calculate depreciation, distinguish provisions from reserves, and see their effect on profit.',
    classLevel: 11, subject: 'accountancy', topic: 'Depreciation, Provisions and Reserves · Part 1/2',
    chapters: ['c11_acc_ch07'],
    nodeIds: ['c11_acc_cbse_07_001', 'c11_acc_cbse_07_002', 'c11_acc_cbse_07_003', 'c11_acc_cbse_07_004', 'c11_acc_cbse_07_005', 'c11_acc_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a finance manager deciding how fast a delivery fleet \'ages\' on paper', intro: 'Machines don\'t send you a bill for wearing out — you have to write it yourself.', goal: 'Compute depreciation by SLM and WDV methods and differentiate provisions, reserves and their disclosure.' },
    discovery: {
        question: 'A machine bought for ₹5,00,000 is worth far less after five years of use, even though nothing \'happened\' to it. Where did that value go in the accounts?',
        options: ['It was charged year by year as depreciation — an expense for the wear the machine suffered earning revenue', 'It vanished only when the machine was sold', 'It stays as profit until scrapped', 'It moved to the bank account automatically'],
        answer: 'It was charged year by year as depreciation — an expense for the wear the machine suffered earning revenue',
        hook: 'Assets quietly become expenses over time — depreciation is how the books admit that truth.',
    },
    teaching: [
        { title: 'Depreciation: Meaning and Need', text: 'Depreciation is the systematic allocation of the depreciable cost of a tangible fixed asset over its estimated useful life, representing the expired portion of the asset\'s cost due to usage, passage.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_acc_cbse_07_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Compute depreciation by straight-line and written-down-value methods and see how each rewrites the profit story.',
        labels: ['Depreciation: Meaning and Need', 'Causes of Depreciation: Wear', 'Factors Affecting Amount', 'Methods of Depreciation: Straight', 'Methods of Depreciation: Written', 'Straight Line vs Written'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_acc_cbse_07_001', title: 'Depreciation: Meaning and Need',
          caseStudy: { intro: 'Imagine you buy a ₹60,000 laptop for your freelance graphic design business on April 1.',
            decisions: [{ prompt: 'Define depreciation in one sentence using the terms "depreciable cost", "useful life", and "expired cost".', options: [
                { text: 'Depreciation is the systematic allocation of the depreciable cost of a tangible fixed', outcome: 'Depreciation is the systematic allocation of the depreciable cost of a tangible fixed asset over.' },
                { text: 'depreciation is the fall in market value', outcome: 'Not quite — Students believe depreciation is a **valuation adjustment** to bring the asset to its current.', reveals: 'depreciation-is-a-valuation-adjustment' },
                { text: 'If the machine\'s market value goes up, why charge depreciation?', outcome: 'Not quite — Students believe depreciation is a **valuation adjustment** to bring the asset to its current.', reveals: 'depreciation-is-a-valuation-adjustment' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_07_002', title: 'Causes of Depreciation: Wear and Tear, Obsolescence, Expiry',
          caseStudy: { intro: 'Imagine you buy a brand‑new delivery van for ₹8,00,000. After three years, its book value drops to ₹4,50,000. Why?',
            decisions: [{ prompt: 'State the four causes of depreciation as per Accounting Standard‑6.', options: [
                { text: 'The four causes are: (1) Wear and Tear due to use or passage of time, (2) Expiration of', outcome: 'The four causes are: (1) Wear and Tear due to use or passage of time, (2) Expiration of Legal.' },
                { text: 'market value fall', outcome: 'Not quite — Students often think **depreciation is only physical wear and tear**.', reveals: 'depreciation-is-only-physical-wear' },
                { text: 'inflation', outcome: 'Not quite — Students often think **depreciation is only physical wear and tear**.', reveals: 'depreciation-is-only-physical-wear' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_07_003', title: 'Factors Affecting Amount of Depreciation',
          scaffold: { problem: 'M/s Sharma Furnishings purchased a delivery van on 1st April 2023 for ₹7,50,000.',
            steps: [
            { text: 'Identify all items that form part of the asset\'s cost per AS-6: purchase price, registration, shelving, transit.' },
            { text: 'Compute net residual value: estimated sale proceeds minus disposal expenses = ₹1,20,000 – ₹15,000 = ₹1,05,000.' },
            { text: 'Compute depreciable cost = original cost – net residual value = ₹8,10,000 – ₹1,05,000 = ₹7,05,000.' },
            { text: 'Compute annual depreciation = depreciable cost / useful life = ₹7,05,000 / 6 = ₹1,17,500 per year.' },
            { text: 'Verify: Total depreciation over 6 years = ₹1,17,500 × 6 = ₹7,05,000, which equals depreciable cost.', faded: true, blankAnswer: '(a) Original cost = ₹8,10,000; (b) Net residual value.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_07_004', title: 'Methods of Depreciation: Straight Line Method',
          scaffold: { problem: 'M/s Sharma & Co. purchased a machine on 1st July 2023 for ₹4,00,000. Freight and cartage ₹20,000, installation charges ₹30,000.',
            steps: [
            { text: 'Compute total cost of asset = Purchase price + Freight + Installation = ₹4,00,000 + ₹20,000 + ₹30,000 = ₹4,50,000.' },
            { text: 'Compute depreciable cost = Total cost - Scrap value = ₹4,50,000 - ₹40,000 = ₹4,10,000.' },
            { text: 'Compute annual depreciation = Depreciable cost / Useful life = ₹4,10,000 / 8 = ₹51,250 per year.' },
            { text: 'Compute rate of depreciation = (Annual depreciation / Total cost) × 100 = (₹51,250 / ₹4,50,000) × 100 = 11.39% (approx).' },
            { text: 'For 2023-24 (9 months: July to March): Depreciation = ₹51,250 × 9/12 = ₹38,437.50 ≈ ₹38,438.', faded: true, blankAnswer: '2023-24 Depreciation = ₹38,438; 2024-25 Depreciation.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_acc_cbse_07_005', title: 'Methods of Depreciation: Written Down Value Method',
          scaffold: { problem: 'M/s Gupta Enterprises purchased a machine for ₹12,00,000 on 1st April 2022. Installation costs were ₹80,000.',
            steps: [
            { text: 'Determine original cost = Purchase price + Installation = ₹12,00,000 + ₹80,000 = ₹12,80,000.' },
            { text: 'Calculate Year 1 (2022-23) depreciation = 20% × ₹12,80,000 = ₹2,56,000.' },
            { text: 'Calculate Year 2 (2023-24) depreciation = 20% × ₹10,24,000 = ₹2,04,800.' },
            { text: 'Calculate Year 3 (2024-25) depreciation = 20% × ₹8,19,200 = ₹1,63,840.' },
            { text: 'Prepare Machinery Account showing opening balance, depreciation credits, and closing balances for each year.', faded: true, blankAnswer: 'Machinery Account balances: 31/3/23 = ₹10,24,000; 31/3/24.' }
            ] } },
        { type: 'case', nodeId: 'c11_acc_cbse_07_006', title: 'Straight Line vs Written Down Value Method: Comparison',
          caseStudy: { intro: 'Imagine you\'re the accountant for a manufacturing company that just bought two assets: a factory building (₹50 lakh) and a CNC machine (₹30 lakh).',
            decisions: [{ prompt: 'State the formula for calculating annual depreciation under Straight Line Method and Written Down Value Method.', options: [
                { text: 'SLM: Annual Depreciation = (Cost - Scrap Value) / Useful Life', outcome: 'SLM: Annual Depreciation = (Cost - Scrap Value) / Useful Life.' },
                { text: 'original cost', outcome: 'Not quite — Students believe "WDV is better because it\'s recognised by Income Tax Act" and therefore always.', reveals: 'wdv-is-better-because-it' },
                { text: 'book value', outcome: 'Not quite — Students believe "WDV is better because it\'s recognised by Income Tax Act" and therefore always.', reveals: 'wdv-is-better-because-it' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your family\'s catering business bought a delivery van for ₹9 lakh (expected life 6 years, scrap ₹90,000). Used vans are suddenly in demand and your father says: \'The van\'s market value has actually gone up this year — charging depreciation would be silly. And anyway, no cash went out, so it\'s not a real expense.\'',
            decisions: [{ prompt: 'Should the business still charge depreciation?', options: [
                { text: 'Yes — depreciation allocates the van\'s historical cost (₹9 lakh minus scrap) over its useful life so each year\'s revenue bears the cost of using it; it is a non-cash expense driven by the matching principle, not a mark-to-market adjustment.', outcome: 'Skipping it overstates this year\'s profit and understates future years\'; market value movements are irrelevant to cost allocation.' },
                { text: 'No — depreciation exists to write the asset down to market value, and the market value rose.', outcome: 'That confuses accounting depreciation (cost allocation) with economic depreciation (value change); the books charge the original cost regardless of resale prices.', reveals: 'depreciation-is-market-valuation' },
                { text: 'No — since no cash left the business this year, there is nothing to record.', outcome: 'Expense ≠ cash outflow; the van\'s cost was \'consumed\' helping earn this year\'s revenue, so a portion must be charged to match it.', reveals: 'expense-requires-cash' }
            ] }] } },
        { type: 'case', nodeId: 'c11_acc_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'Depreciation is not about market value — it\'s about charging the cost of an asset to the years it serves.',
            decisions: [{ prompt: 'What comes next? Depreciation, Provisions and Reserves · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Depreciation, Provisions and Reserves · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_001', difficulty: 'standard',
          question: 'Depreciation is the systematic allocation of the depreciable cost of a tangible.',
          hint: 'Review the "Capital vs Revenue Expenditure" and "Matching Principle" topics from the.',
          misconception: 'Students believe depreciation is a **valuation adjustment** to bring the asset to its current market value.',
          parts: [
                { id: 'a', prompt: 'A student says: "Depreciation is charged so that we have cash to replace the asset when it wears out." Explain why this statement is incorrect and what the.', answer: 'Depreciation is a non-cash expense',
                  options: ['Depreciation is a non-cash expense', 'If the machine\'s market value goes up, why charge depreciation?'],
                  hint: 'Review the "Capital vs Revenue Expenditure" and "Matching Principle" topics from the Financial.',
                  misconception: 'Students believe depreciation is a **valuation adjustment** to bring the asset to its current market value.' },
                { id: 'b', prompt: 'Classify each of the following as depreciation, depletion, or amortisation: (a) A coal mine purchased for ₹2 crore, (b) A patent acquired for ₹50 lakh, (c).', answer: 'A coal mine purchased for ₹2 crore, (',
                  options: ['A coal mine purchased for ₹2 crore, (', 'If the machine\'s market value goes up, why charge depreciation?'],
                  hint: 'Review the "Capital vs Revenue Expenditure" and "Matching Principle" topics from the Financial.',
                  misconception: 'Students believe depreciation is a **valuation adjustment** to bring the asset to its current market value.' },
                { id: 'c', prompt: 'A company purchases a machine for ₹5,00,000 (installation ₹50,000) with a 10-year life and ₹50,000 scrap value.', answer: '(i) Year 1 profit understated by ₹4,95,000 (₹5,50,000 – ₹55,000 depreciation)',
                  options: ['(i) Year 1 profit understated by ₹4,95,000 (₹5,50,000 – ₹55,000 depreciation)', 'If the machine\'s market value goes up, why charge depreciation?'],
                  hint: 'Review the "Capital vs Revenue Expenditure" and "Matching Principle" topics from the Financial.',
                  misconception: 'Students believe depreciation is a **valuation adjustment** to bring the asset to its current market value.' }
          ],
            remediations: { 'depreciation-is-a-valuation-adjustment': { steps: ['**Confront the error**: Show a machine bought for ₹1,00,000; after 2 years market value is ₹1,20,000 due to inflation.', 'Ask: "Should we credit appreciation and stop depreciation?" Guide them to see that depreciation continues because the.', '**Re-read AS-6 definition**: "Depreciation is a measure of wearing out...', 'allocated so as to charge fair proportion of depreciable amount in each accounting period." Highlight "depreciable.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_002', difficulty: 'standard',
          question: 'Depreciation causes are the specific reasons why a tangible fixed asset loses.',
          hint: 'Revisit the "Meaning of Depreciation" (node c11_acc_cbse_07_001) and the matching.',
          misconception: 'Students often think **depreciation is only physical wear and tear**.',
          parts: [
                { id: 'a', prompt: 'A company purchases a patent for ₹10,00,000 with a legal life of 10 years. After 10 years, the patent cannot be used.', answer: 'The cause is **Expiration of Legal Rights**',
                  options: ['The cause is **Expiration of Legal Rights**', '**depreciation is only physical wear and tear**'],
                  hint: 'Revisit the "Meaning of Depreciation" (node c11_acc_cbse_07_001) and the matching principle example.',
                  misconception: 'Students often think **depreciation is only physical wear and tear**. They equate "depreciation" with "the asset getting old and broken".' },
                { id: 'b', prompt: 'A printing press buys a high‑speed printer for ₹5,00,000. Two years later, a new 3D printing technology makes the printer obsolete for the firm\'s main product.', answer: 'The cause is **Obsolescence** (technological change)',
                  options: ['The cause is **Obsolescence** (technological change)', 'write off the whole amount now', 'wear and tear', '**depreciation is only physical wear and tear**'],
                  hint: 'Revisit the "Meaning of Depreciation" (node c11_acc_cbse_07_001) and the matching principle example.',
                  misconception: 'Students often think **depreciation is only physical wear and tear**. They equate "depreciation" with "the asset getting old and broken".' },
                { id: 'c', prompt: 'Compare and contrast "Wear and Tear" and "Obsolescence" in terms of: (a) nature of decline, (b) controllability by management, (c) typical pattern of value.', answer: 'nature of decline, (',
                  options: ['nature of decline, (', '**depreciation is only physical wear and tear**'],
                  hint: 'Revisit the "Meaning of Depreciation" (node c11_acc_cbse_07_001) and the matching principle example.',
                  misconception: 'Students often think **depreciation is only physical wear and tear**. They equate "depreciation" with "the asset getting old and broken".' }
          ],
            remediations: { 'depreciation-is-only-physical-wear': { steps: ['**Isolate the asset type**: Ask "Is this asset tangible (machine, building) or intangible (patent, lease)?" Tangible →.', '**Use the "Time vs Event" test**: Wear and tear = gradual with time; Obsolescence = triggered by external event (new.', '**Map each scenario to one cause**: Give 5 short scenarios (e.g., "mine exhausted", "software licence ends", "factory.', '**Reinforce with AS‑6 wording**: Read the exact phrase "arising from use, effluxion of time or obsolescence through.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **depreciation is only physical wear and tear**.',
          parts: [
                { id: 'a', prompt: 'A factory building suffers flood damage. The accountant argues this is "abnormal factor" depreciation and should be spread over the remaining life.', answer: 'Incorrect',
                  options: ['Incorrect', 'gradual and continuing', '**depreciation is only physical wear and tear**'],
                  hint: 'Revisit the "Meaning of Depreciation" (node c11_acc_cbse_07_001) and the matching principle example.',
                  misconception: 'Students often think **depreciation is only physical wear and tear**. They equate "depreciation" with "the asset getting old and broken".' },
                { id: 'b', prompt: 'Create a mini‑case (3‑4 sentences) involving a fixed asset where **at least three** causes of depreciation operate simultaneously.', answer: 'Example: "A taxi company buys a car for ₹6,00,000',
                  options: ['Example: "A taxi company buys a car for ₹6,00,000', '**depreciation is only physical wear and tear**'],
                  hint: 'Revisit the "Meaning of Depreciation" (node c11_acc_cbse_07_001) and the matching principle example.',
                  misconception: 'Students often think **depreciation is only physical wear and tear**. They equate "depreciation" with "the asset getting old and broken".' }
          ],
            remediations: { 'depreciation-is-only-physical-wear': { steps: ['**Isolate the asset type**: Ask "Is this asset tangible (machine, building) or intangible (patent, lease)?" Tangible →.', '**Use the "Time vs Event" test**: Wear and tear = gradual with time; Obsolescence = triggered by external event (new.', '**Map each scenario to one cause**: Give 5 short scenarios (e.g., "mine exhausted", "software licence ends", "factory.', '**Reinforce with AS‑6 wording**: Read the exact phrase "arising from use, effluxion of time or obsolescence through.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_003', difficulty: 'standard',
          question: 'The amount of depreciation charged each accounting period is determined.',
          hint: 'Review the "Capital vs Revenue Expenditure" distinction from Class 11 Chapter 1.',
          misconception: 'Students often treat "cost of asset" as only the invoice price, ignoring freight, installation, and trial-run costs.',
          parts: [
                { id: 'a', prompt: 'A company buys a second-hand machine for ₹2,00,000, spends ₹25,000 on overhauling, and ₹5,000 on transportation.', answer: 'Step 1: Cost = ₹2,00,000 + ₹25,000 + ₹5,000 = ₹2,30,000',
                  options: ['Step 1: Cost = ₹2,00,000 + ₹25,000 + ₹5,000 = ₹2,30,000', 'residual value', 'market value at end of life'],
                  hint: 'Review the "Capital vs Revenue Expenditure" distinction from Class 11 Chapter 1 (Accounting for.',
                  misconception: 'Students often treat "cost of asset" as only the invoice price, ignoring freight, installation, and trial-run costs.' },
                { id: 'b', prompt: 'Compare two assets: Asset A (cost ₹10,00,000, residual ₹1,00,000, life 9 years) and Asset B (cost ₹10,00,000, residual ₹2,00,000, life 8 years).', answer: 'Asset A: depreciable cost ₹9,00,000 / 9 = ₹1,00,000 per year',
                  options: ['Asset A: depreciable cost ₹9,00,000 / 9 = ₹1,00,000 per year', 'residual value', 'market value at end of life'],
                  hint: 'Review the "Capital vs Revenue Expenditure" distinction from Class 11 Chapter 1 (Accounting for.',
                  misconception: 'Students often treat "cost of asset" as only the invoice price, ignoring freight, installation, and trial-run costs.' }
          ],
            remediations: { 'students-often-treat-cost-of': { steps: ['Have the student write the AS-6 definition of "cost of fixed asset" and "net residual value" verbatim.', 'Give a mini-case with 4-5 cost items (purchase, freight, installation, trial run, registration) and ask them to circle.', 'Provide a residual value example with explicit disposal costs; ask them to compute "net" residual value.', 'Drill: "Depreciable cost = Cost – Net Residual Value" — make them say it aloud until automatic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_004', difficulty: 'standard',
          question: 'The Straight Line Method (SLM) of depreciation allocates an equal amount.',
          hint: 'Revisit c11_acc_cbse_07_003 (Factors Affecting Amount of Depreciation) to practice.',
          misconception: 'Students believe "Straight Line Method charges a fixed percentage on the original cost every year" and mechanically.',
          parts: [
                { id: 'a', prompt: 'M/s Gupta Enterprises purchased a machine for ₹3,00,000 on 1st April 2022 (installation ₹30,000). Useful life 5 years, scrap ₹30,000.', answer: '**Journal Entries:** 2022-23: - Machine A/c Dr',
                  options: ['**Journal Entries:** 2022-23: - Machine A/c Dr', 'Straight Line Method charges a fixed percentage on the original cost every year'],
                  hint: 'Revisit c11_acc_cbse_07_003 (Factors Affecting Amount of Depreciation) to practice extracting Cost.',
                  misconception: 'Students believe "Straight Line Method charges a fixed percentage on the original cost every year" and mechanically apply Rate × Original.' },
                { id: 'b', prompt: 'Compare the total charge against Profit & Loss (Depreciation + Repairs) over 5 years for an asset under SLM vs WDV, assuming repairs increase each year.', answer: 'Under SLM: Depreciation constant (e.g., ₹20,000/year)',
                  options: ['Under SLM: Depreciation constant (e.g., ₹20,000/year)', 'Straight Line Method charges a fixed percentage on the original cost every year'],
                  hint: 'Revisit c11_acc_cbse_07_003 (Factors Affecting Amount of Depreciation) to practice extracting Cost.',
                  misconception: 'Students believe "Straight Line Method charges a fixed percentage on the original cost every year" and mechanically apply Rate × Original.' }
          ],
            remediations: { 'straight-line-method-charges-a': { steps: ['Ask the student to write the depreciable cost formula: Cost - Scrap Value.', 'Have them calculate depreciable cost for 3 examples with different scrap values.', 'Show that Rate = Annual Depreciation / Cost × 100, where Annual Depreciation = Depreciable Cost / Life.', 'Give a problem where scrap is 20% of cost. Make them compute both ways (wrong: 1/Life × Cost; right: (Cost-Scrap)/Life).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_005', difficulty: 'standard',
          question: 'The Written Down Value (WDV) Method, also known as the Reducing Balance Method.',
          hint: 'If stuck, revisit c11_acc_cbse_07_003 (Factors Affecting Amount of Depreciation) for.',
          misconception: 'Students believe "WDV depreciation amount is calculated on ORIGINAL COST every year" — they compute 20% of ₹5,00,000.',
          parts: [
                { id: 'a', prompt: 'A machine costs ₹5,00,000 with scrap value ₹50,000 and useful life 5 years. Under WDV method at 20% p.a., the depreciation for Year 3 is ₹64,000.', answer: 'Depreciation each year = Rate × WDV at beginning of that year',
                  options: ['Depreciation each year = Rate × WDV at beginning of that year', 'rate changes', 'straight line logic', 'WDV depreciation amount is calculated on ORIGINAL COST every year'],
                  hint: 'If stuck, revisit c11_acc_cbse_07_003 (Factors Affecting Amount of Depreciation) for.',
                  misconception: 'Students believe "WDV depreciation amount is calculated on ORIGINAL COST every year" — they compute 20% of ₹5,00,000 = ₹1,00,000 for ALL.' },
                { id: 'b', prompt: 'A firm purchases machinery for ₹8,00,000 on 1st July 2023 (financial year ends 31st March). Depreciation is 15% p.a. on WDV.', answer: 'Step 1: 2023-24 (9 months): Dep = 15% × ₹8,00,000 × 9/12 = ₹90,000',
                  options: ['Step 1: 2023-24 (9 months): Dep = 15% × ₹8,00,000 × 9/12 = ₹90,000', 'WDV depreciation amount is calculated on ORIGINAL COST every year'],
                  hint: 'If stuck, revisit c11_acc_cbse_07_003 (Factors Affecting Amount of Depreciation) for.',
                  misconception: 'Students believe "WDV depreciation amount is calculated on ORIGINAL COST every year" — they compute 20% of ₹5,00,000 = ₹1,00,000 for ALL.' }
          ],
            remediations: { 'wdv-depreciation-amount-is-calculated': { steps: ['Make the student write the WDV formula: Depreciation = Rate × WDV at BEGINNING of year.', 'Have them calculate WDV for 3 years manually: Year 1 WDV = Cost - Dep1; Year 2 WDV = WDV1 - Dep2; Year 3 WDV = WDV2.', 'Ask: "On which figure do you apply 10% for Year 3?" Force them to point to WDV at end of Year 2.', 'Contrast with SLM: "In SLM, base is always Cost.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_acc_cbse_07_006', difficulty: 'standard',
          question: 'The comparison between Straight Line Method (SLM) and Written Down Value Method.',
          hint: 'Revisit c11_acc_cbse_07_004 for SLM formula and c11_acc_cbse_07_005 for WDV rate formula.',
          misconception: 'Students believe "WDV is better because it\'s recognised by Income Tax Act" and therefore always choose WDV.',
          parts: [
                { id: 'a', prompt: 'State the formula for calculating annual depreciation under Straight Line Method and Written Down Value Method.', answer: 'SLM: Annual Depreciation = (Cost - Scrap Value) / Useful Life',
                  options: ['SLM: Annual Depreciation = (Cost - Scrap Value) / Useful Life', 'original cost', 'book value', 'WDV is better because it\'s recognised by Income Tax Act'],
                  hint: 'Revisit c11_acc_cbse_07_004 for SLM formula and c11_acc_cbse_07_005 for WDV rate formula and.',
                  misconception: 'Students believe "WDV is better because it\'s recognised by Income Tax Act" and therefore always choose WDV.' },
                { id: 'b', prompt: 'Asset A (office building) and Asset B (laptop) both cost ₹5,00,000 with 10-year life and ₹50,000 scrap.', answer: 'Building: SLM dep ₹45,000 + repair ₹10,000 = ₹55,000 constant → suitable',
                  options: ['Building: SLM dep ₹45,000 + repair ₹10,000 = ₹55,000 constant → suitable', 'WDV is better because it\'s recognised by Income Tax Act'],
                  hint: 'Revisit c11_acc_cbse_07_004 for SLM formula and c11_acc_cbse_07_005 for WDV rate formula and.',
                  misconception: 'Students believe "WDV is better because it\'s recognised by Income Tax Act" and therefore always choose WDV.' }
          ],
            remediations: { 'wdv-is-better-because-it': { steps: ['Ask "What if the asset is a 10-year patent with zero repairs?" Guide them to see SLM writes off evenly to zero; WDV.', 'Show a leasehold building where Companies Act requires SLM.', 'Calculate Year 10 book value under WDV (never zero) vs. SLM (exact scrap).', 'Have them redo the decision flowchart including "legal requirement" and "full write-down needed" as decision nodes.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
