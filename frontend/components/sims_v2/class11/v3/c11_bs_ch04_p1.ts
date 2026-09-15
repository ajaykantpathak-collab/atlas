import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch04_p1: SimDef = {
    id: 'v3_c11_bs_ch04_p1',
    title: 'Business Services · Part 1/2',
    subtitle: 'Five traits that make a haircut fundamentally different from the chair you sit in.',
    classLevel: 11, subject: 'business_studies', topic: 'Business Services · Part 1/2',
    chapters: ['c11_bs_ch04'],
    nodeIds: ['c11_bs_cbse_04_001', 'c11_bs_cbse_04_002', 'c11_bs_cbse_04_003', 'c11_bs_cbse_04_004', 'c11_bs_cbse_04_005', 'c11_bs_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a consultant explaining to a manufacturer why his new service arm can\'t run like the factory', intro: 'A factory owner wants to \'stockpile\' his new repair service for peak season. Convince him services obey different physics.', goal: 'Explain the five Is of services, classify business, social, and personal services, and contrast services with goods.' },
    discovery: {
        question: 'A student argues a haircut is a \'good\' because you can see and touch the result. Which feature of services proves him wrong the moment the barber starts?',
        options: ['Inseparability — production and consumption happen at once, with the customer participating; there\'s no object you could take home apart from the act', 'Intangibility — haircuts can never be seen', 'Inconsistency — every haircut looks different', 'Inventory — haircuts are too cheap to store'],
        answer: 'Inseparability — production and consumption happen at once, with the customer participating; there\'s no object you could take home apart from the act',
        hook: 'A visible outcome doesn\'t make a service a good — if it can\'t be produced without you, stored, or resold, it was a performance, not a product.',
    },
    teaching: [
        { title: 'Nature and Types of Business Services', text: 'Business services are those services used by business enterprises for the conduct of their activities, such as banking, insurance, transportation, warehousing, and communication.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Take a pizza-app order apart: sort the food, the delivery, the payment, and the app\'s information flow into goods versus services, then apply the five Is to explain why the delivery can\'t be warehoused.',
        labels: ['Nature and Types', 'Banking: Types of Bank', 'Banking Services: Cheques, Drafts', 'Insurance: Principles of Insurance', 'Principles of Insurance: Indemnity,', 'Types of Insurance: Life,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_001', title: 'Nature and Types of Business Services',
          caseStudy: { intro: 'Imagine you order a pizza via a food-delivery app. The app shows the menu (information), the restaurant cooks the pizza (production), the delivery partner.',
            decisions: [{ prompt: 'State the five Is of services and give a one-line explanation for each.', options: [
                { text: 'The five Is are: Intangibility (cannot be touched, only experienced), Inconsistency', outcome: 'The five Is are: Intangibility (cannot be touched, only experienced), Inconsistency (varies with.' },
                { text: 'Invisibility', outcome: 'Not quite — Students often treat "business services" as just "services used by businesses" and list examples.', reveals: 'students-often-treat-business-services' },
                { text: 'Intangibility', outcome: 'Not quite — Students often treat "business services" as just "services used by businesses" and list examples.', reveals: 'students-often-treat-business-services' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_002', title: 'Banking: Types of Bank Accounts (Savings, Current, Recurring, Fixed)',
          caseStudy: { intro: 'Imagine you receive your first salary of ₹25,000 and want to keep it safe while earning some interest, but you also need to pay rent and bills regularly.',
            decisions: [{ prompt: 'State the one defining feature that distinguishes a Current Account from a Savings Account in terms of interest payment and transaction.', options: [
                { text: 'A Current Account offers *no interest* on deposits and allows *unlimited transactions*,', outcome: 'A Current Account offers *no interest* on deposits and allows *unlimited transactions*, whereas.' },
                { text: 'Current Account gives higher interest', outcome: 'Not quite — Students often think **Recurring Deposit and Fixed Deposit are the same because both are "term.', reveals: 'recurring-deposit-and-fixed-deposit' },
                { text: 'term deposits', outcome: 'Not quite — Students often think **Recurring Deposit and Fixed Deposit are the same because both are "term.', reveals: 'recurring-deposit-and-fixed-deposit' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_003', title: 'Banking Services: Cheques, Drafts and Electronic Banking',
          caseStudy: { intro: 'Imagine you run a small online handicraft business in Jaipur. A corporate client in Mumbai owes you ₹75,000.',
            decisions: [{ prompt: 'State the three parties involved in a cheque transaction and define the role of each in one sentence.', options: [
                { text: 'The three parties are: (1) Drawer – the account holder who writes and signs the cheque', outcome: 'The three parties are: (1) Drawer – the account holder who writes and signs the cheque ordering.' },
                { text: 'cancelled', outcome: 'Not quite — Students often believe a demand draft (DD) can be "cancelled" like a cheque by the purchaser simply.', reveals: 'a-demand-draft-dd-can' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_004', title: 'Insurance: Principles of Insurance (Utmost Good Faith, Insurable Interest)',
          caseStudy: { intro: 'Imagine you want to insure your father\'s life for ₹1 crore. The agent asks about his health history - he had a heart attack two years ago but is fine now.',
            decisions: [{ prompt: 'Define "material fact" in the context of Utmost Good Faith in insurance.', options: [
                { text: 'A material fact is any information that would influence the mind of a prudent insurer in', outcome: 'A material fact is any information that would influence the mind of a prudent insurer in deciding.' },
                { text: 'any fact about the proposer', outcome: 'Not quite — Students believe "Utmost Good Faith means the insurer must also disclose everything to the insured".', reveals: 'utmost-good-faith-means-the' },
                { text: 'material fact', outcome: 'Not quite — Students believe "Utmost Good Faith means the insurer must also disclose everything to the insured".', reveals: 'utmost-good-faith-means-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_005', title: 'Principles of Insurance: Indemnity, Subrogation and Contribution',
          caseStudy: { intro: 'Imagine your neighbour\'s faulty wiring causes a fire that damages your ₹5 lakh warehouse.',
            decisions: [{ prompt: 'State the Principle of Indemnity in one sentence and name the one major type of insurance where it does NOT apply.', options: [
                { text: 'Correct answer: "The Principle of Indemnity states that the insurer compensates the', outcome: 'Correct answer: "The Principle of Indemnity states that the insurer compensates the insured only.' },
                { text: 'no profit', outcome: 'Not quite — Students believe "Contribution means the insured can claim the full loss from ANY one insurer, and.', reveals: 'contribution-means-the-insured-can' },
                { text: 'contribution among insurers', outcome: 'Not quite — Students believe "Contribution means the insured can claim the full loss from ANY one insurer, and.', reveals: 'contribution-means-the-insured-can' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_006', title: 'Types of Insurance: Life, Fire and Marine Insurance',
          caseStudy: { intro: 'Imagine three friends: Arjun (sole earner for family), Priya (factory owner), and Samir (importer of electronics).',
            decisions: [{ prompt: 'State the subject matter of insurance for Life, Fire, and Marine Insurance in one sentence each.', options: [
                { text: 'Life Insurance: Human life', outcome: 'Life Insurance: Human life. Fire Insurance: Physical property/assets.' },
                { text: 'Life insurance covers property', outcome: 'Not quite — Students often believe "Indemnity means the insurance company pays the policy amount (sum insured).', reveals: 'indemnity-means-the-insurance-company' },
                { text: 'indemnity = compensation', outcome: 'Not quite — Students often believe "Indemnity means the insurance company pays the policy amount (sum insured).', reveals: 'indemnity-means-the-insurance-company' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your startup club is pitching \'DabbaDash\' — a service that collects home tiffins and delivers them to offices by lunch. An investor-judge asks: \'Why call this a service and not a goods business — you do move physical dabbas?\' A teammate fumbles: \'Because it\'s fast and friendly.\'',
            decisions: [{ prompt: 'Give the investor the real answer using the five Is.', options: [
                { text: 'What\'s sold is the delivery performance, not the dabba: it\'s Intangible (can\'t be touched), Inconsistent (varies by route/rain), Inseparable (delivery happens as it\'s consumed), Inventory-less (today\'s unused slot can\'t be stored for tomorrow), and Involvement-heavy (customer must hand over the dabba and be reachable). The dabba is the customer\'s good; the transport-and-coordination is the service.', outcome: 'The five Is classify the offering by its nature — goods can be stored and standardised; this performance perishes if unused and is co-created with the customer.' },
                { text: 'It\'s a goods business — the customer receives a physical object (the delivered dabba), so tangibility wins.', outcome: 'The dabba belongs to the customer and is merely moved; what DabbaDash sells is the intangible, unstorable act of delivery — a service despite the goods involved.', reveals: 'physical-object-means-goods' },
                { text: '\'Inconsistency\' just means the service is low quality, and \'Inseparability\' means customers can\'t switch providers.', outcome: 'Both misreadings matter: inconsistency is natural performance variability, not defect; inseparability is production-consumption simultaneity — the customer can still switch to a rival tomorrow.', reveals: 'five-is-misread' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend the five Is with real cases — and you know a service is a verb performed, never a noun on a shelf.',
            decisions: [{ prompt: 'What comes next? Business Services · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Business Services · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_001', difficulty: 'standard',
          question: 'Business services are those services used by business enterprises for the.',
          hint: 'Revisit Class 9 Economics Chapter 1 (c9_eco_ch1_10) on public goods and private goods.',
          misconception: 'Students often treat "business services" as just "services used by businesses" and list examples like "cleaning.',
          parts: [
                { id: 'a', prompt: 'A student says, "A haircut is a good because you can see the result." Explain why this is incorrect using the concept of inseparability and involvement.', answer: 'A haircut is a service',
                  options: ['A haircut is a service', 'Inconsistency', 'low quality', 'Inseparability'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (c9_eco_ch1_10) on public goods and private goods, and Class 6.',
                  misconception: 'Students often treat "business services" as just "services used by businesses" and list examples like "cleaning services for an office".' },
                { id: 'b', prompt: 'Classify each of the following into Business, Social, or Personal services: (a) A corporate law firm advising a company on mergers, (b) An NGO running free.', answer: 'A corporate law firm advising a company on mergers, (',
                  options: ['A corporate law firm advising a company on mergers, (', 'Inconsistency', 'low quality', 'Inseparability'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (c9_eco_ch1_10) on public goods and private goods, and Class 6.',
                  misconception: 'Students often treat "business services" as just "services used by businesses" and list examples like "cleaning services for an office".' }
          ],
            remediations: { 'students-often-treat-business-services': { steps: ['Re-read the petrol-pump example in NCERT (section 4.1) and explicitly map each business service (transport.', 'Create a 3x5 table: Rows = Business, Social, Personal; Columns = Five Is.', 'Fill with one original example per cell.', 'For each of the five business services, write one sentence explaining why a business *cannot* operate efficiently.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "business services" as just "services used by businesses" and list examples like "cleaning.',
          parts: [
                { id: 'a', prompt: 'Design a new business service for small kirana stores in your neighbourhood.', answer: 'Example: "StockSmart" – a just-in-time inventory replenishment service',
                  options: ['Example: "StockSmart" – a just-in-time inventory replenishment service', 'Inconsistency', 'low quality', 'Inseparability'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (c9_eco_ch1_10) on public goods and private goods, and Class 6.',
                  misconception: 'Students often treat "business services" as just "services used by businesses" and list examples like "cleaning services for an office".' }
          ],
            remediations: { 'students-often-treat-business-services': { steps: ['Re-read the petrol-pump example in NCERT (section 4.1) and explicitly map each business service (transport.', 'Create a 3x5 table: Rows = Business, Social, Personal; Columns = Five Is.', 'Fill with one original example per cell.', 'For each of the five business services, write one sentence explaining why a business *cannot* operate efficiently.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_002', difficulty: 'standard',
          question: 'A bank account is a financial record maintained by a banking institution that.',
          hint: 'Revisit c11_bs_cbse_04_001 (Nature and Types of Business Services) and.',
          misconception: 'Students often think **Recurring Deposit and Fixed Deposit are the same because both are "term deposits" and offer.',
          parts: [
                { id: 'a', prompt: 'A small trader needs to make 50–60 transactions per month, including cheque payments to suppliers and cash withdrawals for daily expenses.', answer: 'He should choose a **Current Account**',
                  options: ['He should choose a **Current Account**', 'term deposits'],
                  hint: 'Revisit c11_bs_cbse_04_001 (Nature and Types of Business Services) and c10_eco_cbse_03_003 (Loan.',
                  misconception: 'Students often think **Recurring Deposit and Fixed Deposit are the same because both are "term deposits" and offer similar interest.' },
                { id: 'b', prompt: 'Compare a Fixed Deposit and a Recurring Deposit for a 3-year tenure at 7% p.a. compounded quarterly.', answer: 'The **Fixed Deposit** will yield a higher maturity value',
                  options: ['The **Fixed Deposit** will yield a higher maturity value', 'monthly compounding is better', 'term deposits'],
                  hint: 'Revisit c11_bs_cbse_04_001 (Nature and Types of Business Services) and c10_eco_cbse_03_003 (Loan.',
                  misconception: 'Students often think **Recurring Deposit and Fixed Deposit are the same because both are "term deposits" and offer similar interest.' }
          ],
            remediations: { 'recurring-deposit-and-fixed-deposit': { steps: ['Draw a timeline: Show 12 monthly RD instalments of ₹1,000 each, marking how many months each earns interest.', 'Contrast with a single ₹12,000 FD for 12 months.', 'Calculate interest for first RD instalment (₹1,000 × 12 months) vs.', 'FD (₹12,000 × 12 months) using simple interest to visualise the gap.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_003', difficulty: 'standard',
          question: 'Banking services encompass the instruments and electronic channels that.',
          hint: 'If stuck, revisit the "cheque facility" and "remittance of funds" sub-sections in NCERT.',
          misconception: 'Students often believe a demand draft (DD) can be "cancelled" like a cheque by the purchaser simply by instructing.',
          parts: [
                { id: 'a', prompt: 'Explain why a crossed cheque is considered safer than a bearer cheque, and describe what "account payee only" crossing adds to that safety.', answer: 'A crossed cheque (two parallel lines) cannot be encashed over the counter',
                  options: ['A crossed cheque (two parallel lines) cannot be encashed over the counter', 'crossed cheque cannot be stolen', 'bearer cheque is safer', 'cancelled'],
                  hint: 'If stuck, revisit the "cheque facility" and "remittance of funds" sub-sections in NCERT Class 11.',
                  misconception: 'Students often believe a demand draft (DD) can be "cancelled" like a cheque by the purchaser simply by instructing their bank.' },
                { id: 'b', prompt: 'A business in Delhi must pay ₹12 lakh to a vendor in Chennai today. The vendor insists on immediate credit confirmation.', answer: 'settlement finality time, (',
                  options: ['settlement finality time, (', 'cancelled'],
                  hint: 'If stuck, revisit the "cheque facility" and "remittance of funds" sub-sections in NCERT Class 11.',
                  misconception: 'Students often believe a demand draft (DD) can be "cancelled" like a cheque by the purchaser simply by instructing their bank.' }
          ],
            remediations: { 'a-demand-draft-dd-can': { steps: ['If a student asserts "DD can be stopped like a cheque," do this: (1) Show a specimen DD form highlighting "Issuing.', '(2) Contrast with cheque: drawer orders *their* bank; draft is *bank* ordering *its own* branch.', '(3) Walk through a lost DD scenario: purchaser applies for duplicate → bank demands indemnity bond → waits for "cooling.', '(4) Assign a mini-case: "Purchaser stops DD, payee sues bank – who wins?" to cement that bank\'s liability.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_004', difficulty: 'standard',
          question: 'Utmost Good Faith (Uberrimae Fidei) is the fundamental principle requiring both.',
          hint: 'Revisit c10_eco_cbse_03_004 (good credit vs bad credit) and c9_math_ch7_007 (probability.',
          misconception: 'Students believe "Utmost Good Faith means the insurer must also disclose everything to the insured" - they think it\'s.',
          parts: [
                { id: 'a', prompt: 'Explain why the timing requirement for Insurable Interest differs across Life, Fire, and Marine insurance. Use the underlying economic rationale in your answer.', answer: 'Life insurance: Insurable interest must exist at policy inception',
                  options: ['Life insurance: Insurable interest must exist at policy inception', 'all require interest at inception', 'Utmost Good Faith means the insurer must also disclose everything to the insured', 'it\'s a symmetric duty'],
                  hint: 'Revisit c10_eco_cbse_03_004 (good credit vs bad credit) and c9_math_ch7_007 (probability formula).',
                  misconception: 'Students believe "Utmost Good Faith means the insurer must also disclose everything to the insured" - they think it\'s a symmetric duty.' },
                { id: 'b', prompt: 'Mr. Sharma takes a fire insurance policy on his factory worth ₹50 lakh. Six months later, he sells the factory to Mr. Verma but forgets to assign the policy.', answer: 'No, the insurer will not pay',
                  options: ['No, the insurer will not pay', 'yes, he paid premium', 'Utmost Good Faith means the insurer must also disclose everything to the insured', 'it\'s a symmetric duty'],
                  hint: 'Revisit c10_eco_cbse_03_004 (good credit vs bad credit) and c9_math_ch7_007 (probability formula).',
                  misconception: 'Students believe "Utmost Good Faith means the insurer must also disclose everything to the insured" - they think it\'s a symmetric duty.' }
          ],
            remediations: { 'utmost-good-faith-means-the': { steps: ['Ask the student to list 5 facts about themselves they would disclose if buying life insurance.', 'For each, ask "Would a prudent insurer change the premium or reject based on this?" - this isolates material facts.', 'Present a fire insurance case where ownership changes hands before loss - ask "Who suffers financial loss?" to ground.', 'Use a Venn diagram: Left circle = facts proposer knows, Right circle = facts insurer knows.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_005', difficulty: 'standard',
          question: 'The principles of Indemnity, Subrogation, and Contribution are core doctrines.',
          hint: 'Revisit c11_bs_cbse_04_004 and create a two-column table: "Utmost Good Faith" (duty.',
          misconception: 'Students believe "Contribution means the insured can claim the full loss from ANY one insurer, and that insurer then.',
          parts: [
                { id: 'a', prompt: 'A factory owner insures his machinery worth ₹50 lakh under two policies: Policy X for ₹30 lakh and Policy Y for ₹40 lakh. A fire causes ₹20 lakh damage.', answer: 'Correct answer: Contribution prevents double recovery',
                  options: ['Correct answer: Contribution prevents double recovery', 'each pays ₹20 lakh', 'contribution among insurers', 'insured\'s choice of insurer'],
                  hint: 'Revisit c11_bs_cbse_04_004 and create a two-column table: "Utmost Good Faith" (duty to disclose.',
                  misconception: 'Students believe "Contribution means the insured can claim the full loss from ANY one insurer, and that insurer then sorts out sharing with.' },
                { id: 'b', prompt: 'Your car (insured for ₹6 lakh) is damaged in an accident caused by a rash driver. Repair cost is ₹2 lakh. Your insurer pays you ₹2 lakh.', answer: 'Correct answer: The Principle of Subrogation is violated',
                  options: ['Correct answer: The Principle of Subrogation is violated', 'the insured can keep both', 'contribution among insurers', 'insured\'s choice of insurer'],
                  hint: 'Revisit c11_bs_cbse_04_004 and create a two-column table: "Utmost Good Faith" (duty to disclose.',
                  misconception: 'Students believe "Contribution means the insured can claim the full loss from ANY one insurer, and that insurer then sorts out sharing with.' }
          ],
            remediations: { 'contribution-means-the-insured-can': { steps: ['Draw a three-column table: Column A = Single Policy (Indemnity only), Column B = Double Insurance (Indemnity.', 'In each column, write: "Who pays?", "How much?", "Can insured profit?"', 'Use the ₹5 lakh loss / ₹3L+₹4L policy example to fill Column B—show insurer paying ₹2.14L, not ₹5L.', 'Add landlord negligence to fill Column C—show insurer suing landlord after paying.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_006', difficulty: 'standard',
          question: 'Life insurance is a contract providing financial protection against the.',
          hint: 'Revisit c11_bs_cbse_04_005 (Indemnity principle) and c11_bs_cbse_04_004 (Utmost Good.',
          misconception: 'Students often believe "Indemnity means the insurance company pays the policy amount (sum insured) in case of loss.".',
          parts: [
                { id: 'a', prompt: 'State the subject matter of insurance for Life, Fire, and Marine Insurance in one sentence each.', answer: 'Life Insurance: Human life',
                  options: ['Life Insurance: Human life', 'Life insurance covers property', 'indemnity = compensation', 'compensation = actual financial loss measured in money'],
                  hint: 'Revisit c11_bs_cbse_04_005 (Indemnity principle) and c11_bs_cbse_04_004 (Utmost Good Faith &.',
                  misconception: 'Students often believe "Indemnity means the insurance company pays the policy amount (sum insured) in case of loss." They confuse *sum.' },
                { id: 'b', prompt: 'Explain in your own words why a life insurance contract is NOT a contract of indemnity, while fire and marine insurance ARE contracts of indemnity.', answer: 'Life insurance pays a pre-fixed sum assured',
                  options: ['Life insurance pays a pre-fixed sum assured', 'Life insurance also pays actual loss', 'indemnity = compensation', 'compensation = actual financial loss measured in money'],
                  hint: 'Revisit c11_bs_cbse_04_005 (Indemnity principle) and c11_bs_cbse_04_004 (Utmost Good Faith &.',
                  misconception: 'Students often believe "Indemnity means the insurance company pays the policy amount (sum insured) in case of loss." They confuse *sum.' },
                { id: 'c', prompt: 'A businessman insures his warehouse for ₹50 lakh. A fire causes ₹30 lakh damage. The insurer pays ₹30 lakh.', answer: 'Fire: Principle of Indemnity (actual loss ₹30L paid, not policy limit ₹50L)',
                  options: ['Fire: Principle of Indemnity (actual loss ₹30L paid, not policy limit ₹50L)', 'Both pay actual loss', 'indemnity = compensation', 'compensation = actual financial loss measured in money'],
                  hint: 'Revisit c11_bs_cbse_04_005 (Indemnity principle) and c11_bs_cbse_04_004 (Utmost Good Faith &.',
                  misconception: 'Students often believe "Indemnity means the insurance company pays the policy amount (sum insured) in case of loss." They confuse *sum.' },
                { id: 'd', prompt: 'Compare the requirement of insurable interest in Life, Fire, and Marine insurance. Create a timeline showing when insurable interest MUST exist for each type.', answer: 'Life: Must exist at inception (policy taken), not needed at claim',
                  options: ['Life: Must exist at inception (policy taken), not needed at claim', 'Fire needs it only at inception', 'indemnity = compensation', 'compensation = actual financial loss measured in money'],
                  hint: 'Revisit c11_bs_cbse_04_005 (Indemnity principle) and c11_bs_cbse_04_004 (Utmost Good Faith &.',
                  misconception: 'Students often believe "Indemnity means the insurance company pays the policy amount (sum insured) in case of loss." They confuse *sum.' }
          ],
            remediations: { 'indemnity-means-the-insurance-company': { steps: ['Ask the student to define "indemnity" in their own words.', 'Give a concrete example: "You insure a ₹20L car for ₹20L. Accident causes ₹5L repair. How much does insurer pay?"', 'If they say ₹20L, ask: "Did you make a profit of ₹15L?"', 'Explain indemnity = "restore to pre-loss financial position, no profit no loss."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
