import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch04_p2: SimDef = {
    id: 'v3_c11_bs_ch04_p2',
    title: 'Business Services · Part 2/2',
    subtitle: 'Five traits that make a haircut fundamentally different from the chair you sit in.',
    classLevel: 11, subject: 'business_studies', topic: 'Business Services · Part 2/2',
    chapters: ['c11_bs_ch04'],
    nodeIds: ['c11_bs_cbse_04_007', 'c11_bs_cbse_04_008', 'c11_bs_cbse_04_009', 'c11_bs_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a consultant explaining to a manufacturer why his new service arm can\'t run like the factory', intro: 'A factory owner wants to \'stockpile\' his new repair service for peak season. Convince him services obey different physics.', goal: 'Explain the five Is of services, classify business, social, and personal services, and contrast services with goods.' },
    discovery: {
        question: 'A student argues a haircut is a \'good\' because you can see and touch the result. Which feature of services proves him wrong the moment the barber starts?',
        options: ['Inseparability — production and consumption happen at once, with the customer participating; there\'s no object you could take home apart from the act', 'Intangibility — haircuts can never be seen', 'Inconsistency — every haircut looks different', 'Inventory — haircuts are too cheap to store'],
        answer: 'Inseparability — production and consumption happen at once, with the customer participating; there\'s no object you could take home apart from the act',
        hook: 'A visible outcome doesn\'t make a service a good — if it can\'t be produced without you, stored, or resold, it was a performance, not a product.',
    },
    teaching: [
        { title: 'Types of Insurance: Health, Theft and Other Insurance', text: 'Health, theft, and other general insurance policies are non-life insurance contracts that provide financial protection against specific risks such as medical expenses (health insurance), loss due.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Take a pizza-app order apart: sort the food, the delivery, the payment, and the app\'s information flow into goods versus services, then apply the five Is to explain why the delivery can\'t be warehoused.',
        labels: ['Types of Insurance: Health,', 'Communication Services: Postal', 'Transportation: Modes of Transport', 'Warehousing: Types and Functions'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_007', title: 'Types of Insurance: Health, Theft and Other Insurance',
          caseStudy: { intro: 'Imagine your family\'s two-wheeler is stolen from outside your house, and your father is hospitalized for dengue the same week.',
            decisions: [{ prompt: 'What is the fundamental difference between a life insurance contract and a health insurance contract regarding the principle of indemnity?', options: [
                { text: 'Life insurance is not a contract of indemnity', outcome: 'Life insurance is not a contract of indemnity — the sum assured is fixed and paid on death.' },
                { text: 'theft insurance', outcome: 'Not quite — Students often think "theft insurance" is a single standalone policy.', reveals: 'theft-insurance-is-a-single' },
                { text: 'both are indemnity contracts', outcome: 'Not quite — Students often think "theft insurance" is a single standalone policy.', reveals: 'theft-insurance-is-a-single' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_008', title: 'Communication Services: Postal and Telecom',
          caseStudy: { intro: 'Imagine you run a small online business selling handmade pickles from your village.',
            decisions: [{ prompt: '[REMEMBER] List the two broad categories of communication services as classified in the NCERT textbook for Class 11 Business Studies.', options: [
                { text: 'The two broad categories are **Postal Services** and **Telecom Services**', outcome: 'The two broad categories are **Postal Services** and **Telecom Services**.' },
                { text: 'Banking and Insurance', outcome: 'Not quite — **Misconception:** "Telecom services only mean mobile phones (cellular), and Postal services are.', reveals: 'misconception-telecom-services-only-mean' },
                { text: 'Courier and Email', outcome: 'Not quite — **Misconception:** "Telecom services only mean mobile phones (cellular), and Postal services are.', reveals: 'misconception-telecom-services-only-mean' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_009', title: 'Transportation: Modes of Transport and their Importance',
          caseStudy: { intro: 'Imagine you run a small business in Delhi selling Kashmiri apples.',
            decisions: [{ prompt: 'Name the four modes of transport mentioned in the NCERT Class 11 Business Studies textbook for the movement of goods and international.', options: [
                { text: 'The four modes are rail, road, air, and sea', outcome: 'The four modes are rail, road, air, and sea. A wrong answer (e.g., including pipeline or cable).' },
                { text: 'fastest mode is always best', outcome: 'Not quite — Students often believe that "fastest mode is always best" or "cheapest mode is always best." They.', reveals: 'fastest-mode-is-always-best' },
                { text: 'cheapest mode is always best', outcome: 'Not quite — Students often believe that "fastest mode is always best" or "cheapest mode is always best." They.', reveals: 'fastest-mode-is-always-best' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_010', title: 'Warehousing: Types and Functions',
          caseStudy: { intro: 'Imagine you are a mango farmer in Ratnagiri. Your harvest arrives in April, but mangoes sell best in June. You cannot keep them at home — they’ll rot.',
            decisions: [{ prompt: 'List the five types of warehouses mentioned in the NCERT textbook for Class 11 Business Studies.', options: [
                { text: 'The five types are: (1) Private warehouses, (2) Public warehouses, (3) Bonded warehouses,', outcome: 'The five types are: (1) Private warehouses, (2) Public warehouses, (3) Bonded warehouses, (4).' },
                { text: 'cold storage', outcome: 'Not quite — Students often confuse **bonded warehouses** with **public warehouses** for export goods.', reveals: 'students-often-confuse-bonded-warehouses' },
                { text: 'distribution centre', outcome: 'Not quite — Students often confuse **bonded warehouses** with **public warehouses** for export goods.', reveals: 'students-often-confuse-bonded-warehouses' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your startup club is pitching \'DabbaDash\' — a service that collects home tiffins and delivers them to offices by lunch. An investor-judge asks: \'Why call this a service and not a goods business — you do move physical dabbas?\' A teammate fumbles: \'Because it\'s fast and friendly.\'',
            decisions: [{ prompt: 'Give the investor the real answer using the five Is.', options: [
                { text: 'What\'s sold is the delivery performance, not the dabba: it\'s Intangible (can\'t be touched), Inconsistent (varies by route/rain), Inseparable (delivery happens as it\'s consumed), Inventory-less (today\'s unused slot can\'t be stored for tomorrow), and Involvement-heavy (customer must hand over the dabba and be reachable). The dabba is the customer\'s good; the transport-and-coordination is the service.', outcome: 'The five Is classify the offering by its nature — goods can be stored and standardised; this performance perishes if unused and is co-created with the customer.' },
                { text: 'It\'s a goods business — the customer receives a physical object (the delivered dabba), so tangibility wins.', outcome: 'The dabba belongs to the customer and is merely moved; what DabbaDash sells is the intangible, unstorable act of delivery — a service despite the goods involved.', reveals: 'physical-object-means-goods' },
                { text: '\'Inconsistency\' just means the service is low quality, and \'Inseparability\' means customers can\'t switch providers.', outcome: 'Both misreadings matter: inconsistency is natural performance variability, not defect; inseparability is production-consumption simultaneity — the customer can still switch to a rival tomorrow.', reveals: 'five-is-misread' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'You can now defend the five Is with real cases — and you know a service is a verb performed, never a noun on a shelf.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_007', difficulty: 'standard',
          question: 'Health, theft, and other general insurance policies are non-life insurance.',
          hint: 'Revisit c11_bs_cbse_04_004 and c11_bs_cbse_04_005 to review the principles of indemnity.',
          misconception: 'Students often think "theft insurance" is a single standalone policy.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental difference between a life insurance contract and a health insurance contract regarding the principle of indemnity?', answer: 'Life insurance is not a contract of indemnity',
                  options: ['Life insurance is not a contract of indemnity', 'theft insurance', 'both are indemnity contracts', '"theft insurance" is a single standalone policy'],
                  hint: 'Revisit c11_bs_cbse_04_004 and c11_bs_cbse_04_005 to review the principles of indemnity, insurable.',
                  misconception: 'Students often think "theft insurance" is a single standalone policy.' },
                { id: 'b', prompt: 'A farmer insures his wheat crop under a crop insurance policy for ₹2 lakh.', answer: 'The principle of indemnity is applied',
                  options: ['The principle of indemnity is applied', 'theft insurance', '"theft insurance" is a single standalone policy'],
                  hint: 'Revisit c11_bs_cbse_04_004 and c11_bs_cbse_04_005 to review the principles of indemnity, insurable.',
                  misconception: 'Students often think "theft insurance" is a single standalone policy.' },
                { id: 'c', prompt: 'Compare Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) and Pradhan Mantri Suraksha Bima Yojana (PMSBY) on three parameters: (a) risk covered, (b) premium per.', answer: 'PMJJBY: life cover (death any cause), ₹330/year, ₹2 lakh sum assured',
                  options: ['PMJJBY: life cover (death any cause), ₹330/year, ₹2 lakh sum assured', 'theft insurance', '"theft insurance" is a single standalone policy'],
                  hint: 'Revisit c11_bs_cbse_04_004 and c11_bs_cbse_04_005 to review the principles of indemnity, insurable.',
                  misconception: 'Students often think "theft insurance" is a single standalone policy.' }
          ],
            remediations: { 'theft-insurance-is-a-single': { steps: ['If a student conflates theft covers, ask them to list the subject matter in each case: "What is being insured.', 'In motor policy?" Then have them read the policy wordings: burglary requires forcible entry into premises; motor theft.', 'For indemnity confusion, give a numerical example: sum insured ₹5 lakh, actual loss ₹3 lakh — ask "How much will the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_008', difficulty: 'standard',
          question: 'Communication services are business services that enable the transmission.',
          hint: 'Revisit node **c11_bs_cbse_04_001 (Nature and Types of Business Services)**, specifically.',
          misconception: '**Misconception:** "Telecom services only mean mobile phones (cellular), and Postal services are just for letters.".',
          parts: [
                { id: 'a', prompt: '[REMEMBER] List the two broad categories of communication services as classified in the NCERT textbook for Class 11 Business Studies.', answer: 'The two broad categories are **Postal Services** and **Telecom Services**',
                  options: ['The two broad categories are **Postal Services** and **Telecom Services**', 'Banking and Insurance', 'Courier and Email', ', the student answers'],
                  hint: 'Revisit node **c11_bs_cbse_04_001 (Nature and Types of Business Services)**, specifically the table.',
                  misconception: '**Misconception:** "Telecom services only mean mobile phones (cellular), and Postal services are just for letters." **Why it happens:**.' },
                { id: 'b', prompt: '[APPLY] A rural artisan collective in Bastar (Chhattisgarh) wants to: (a) send a fragile product sample to a buyer in Chennai urgently, (b) receive payment.', answer: 'send a fragile product sample to a buyer in Chennai urgently, (',
                  options: ['send a fragile product sample to a buyer in Chennai urgently, (', 'Courier', 'Bank wire', 'Media Post'],
                  hint: 'Revisit node **c11_bs_cbse_04_001 (Nature and Types of Business Services)**, specifically the table.',
                  misconception: '**Misconception:** "Telecom services only mean mobile phones (cellular), and Postal services are just for letters." **Why it happens:**.' }
          ],
            remediations: { 'misconception-telecom-services-only-mean': { steps: ['**Step 1 – Isolate the confusion:** Ask the student to draw two columns: "Physical Item Moves" (Postal) vs "Signal.', 'Place these items in columns: *Signed contract, Cash, Pickle jar, Voice call, Video conference, TV channel, Bank.', '**Step 2 – Map to NCERT List:** Give the student the bulleted NCERT facility lists (Financial, Mail, Allied for Postal.', 'Ask them to tag each item in Step 1 with the **exact facility name** from the list (e.g., "Signed contract → Registered.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Telecom services only mean mobile phones (cellular), and Postal services are just for letters.".',
          parts: [
                { id: 'a', prompt: '[EVALUATE] "With UPI, Email, and WhatsApp, **Postal Services have become obsolete for modern business**." **Critique this statement** using at least two.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', ', the student answers', 'because'],
                  hint: 'Revisit node **c11_bs_cbse_04_001 (Nature and Types of Business Services)**, specifically the table.',
                  misconception: '**Misconception:** "Telecom services only mean mobile phones (cellular), and Postal services are just for letters." **Why it happens:**.' }
          ],
            remediations: { 'misconception-telecom-services-only-mean': { steps: ['**Step 1 – Isolate the confusion:** Ask the student to draw two columns: "Physical Item Moves" (Postal) vs "Signal.', 'Place these items in columns: *Signed contract, Cash, Pickle jar, Voice call, Video conference, TV channel, Bank.', '**Step 2 – Map to NCERT List:** Give the student the bulleted NCERT facility lists (Financial, Mail, Allied for Postal.', 'Ask them to tag each item in Step 1 with the **exact facility name** from the list (e.g., "Signed contract → Registered.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_009', difficulty: 'standard',
          question: 'Transportation in business refers to the physical movement of goods and.',
          hint: 'If stuck, revisit Class 6 Economics "Transport Networks: Connecting People and Goods".',
          misconception: 'Students often believe that "fastest mode is always best" or "cheapest mode is always best." They treat modal choice.',
          parts: [
                { id: 'a', prompt: 'Name the four modes of transport mentioned in the NCERT Class 11 Business Studies textbook for the movement of goods and international carriage of passengers.', answer: 'The four modes are rail, road, air, and sea',
                  options: ['The four modes are rail, road, air, and sea', 'fastest mode is always best', 'cheapest mode is always best', '"fastest mode is always best" or "cheapest mode is always best'],
                  hint: 'If stuck, revisit Class 6 Economics "Transport Networks: Connecting People and Goods".',
                  misconception: 'Students often believe that "fastest mode is always best" or "cheapest mode is always best." They treat modal choice as a single-factor.' },
                { id: 'b', prompt: 'A manufacturer in Ludhiana needs to send 50 tonnes of machinery parts to a client in Kolkata.', answer: 'Rail is suitable',
                  options: ['Rail is suitable', 'fastest mode is always best', 'cheapest mode is always best', '"fastest mode is always best" or "cheapest mode is always best'],
                  hint: 'If stuck, revisit Class 6 Economics "Transport Networks: Connecting People and Goods".',
                  misconception: 'Students often believe that "fastest mode is always best" or "cheapest mode is always best." They treat modal choice as a single-factor.' },
                { id: 'c', prompt: 'A florist in Bengaluru exports orchids to Dubai. The flowers must reach within 24 hours of harvest to maintain quality.', answer: 'Air transport is most appropriate',
                  options: ['Air transport is most appropriate', 'fastest mode is always best', 'cheapest mode is always best', '"fastest mode is always best" or "cheapest mode is always best'],
                  hint: 'If stuck, revisit Class 6 Economics "Transport Networks: Connecting People and Goods".',
                  misconception: 'Students often believe that "fastest mode is always best" or "cheapest mode is always best." They treat modal choice as a single-factor.' }
          ],
            remediations: { 'fastest-mode-is-always-best': { steps: ['If a student exhibits this misconception, guide them through a "Mode-Match Matrix" exercise: create a table with modes.', 'Have them fill each cell with High/Medium/Low using textbook descriptions.', 'Then give 5 mini-cases (e.g., "100 tonnes of wheat, 1000 km, 15 days, low value") and ask them to score each mode.', 'The visual comparison forces multi-criteria thinking.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_04_010', difficulty: 'standard',
          question: 'Warehousing refers to the business service of storing goods in a scientific and.',
          hint: 'Revise the "Nature and Types of Business Services" (c11_bs_cbse_04_001) and.',
          misconception: 'Students often confuse **bonded warehouses** with **public warehouses** for export goods.',
          parts: [
                { id: 'a', prompt: 'A small manufacturer of herbal soaps in Kerala wants to store finished goods near the port in Mumbai for export. They cannot afford their own warehouse.', answer: 'They should choose a **public warehouse**',
                  options: ['They should choose a **public warehouse**', 'bonded warehouse'],
                  hint: 'Revise the "Nature and Types of Business Services" (c11_bs_cbse_04_001) and "Transportation".',
                  misconception: 'Students often confuse **bonded warehouses** with **public warehouses** for export goods.' }
          ],
            remediations: { 'students-often-confuse-bonded-warehouses': { steps: ['If a student makes this error: 1.', '**Draw a timeline**: Show goods arriving at port → customs assessment → *if duty unpaid* → bonded warehouse → duty paid.', '**Contrast with public warehouse**: Goods arrive → customs already cleared → public warehouse → buyer.', '**Use the keyword "ENTRAP TRADE"**: Explain bonded warehouses enable entrepôt trade (import → store → re-export without.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
