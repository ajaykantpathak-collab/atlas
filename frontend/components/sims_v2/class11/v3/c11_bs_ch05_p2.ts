import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch05_p2: SimDef = {
    id: 'v3_c11_bs_ch05_p2',
    title: 'Emerging Modes of Business · Part 2/2',
    subtitle: 'Buying online is the smallest part of what networks do to a business.',
    classLevel: 11, subject: 'business_studies', topic: 'Emerging Modes of Business · Part 2/2',
    chapters: ['c11_bs_ch05'],
    nodeIds: ['c11_bs_cbse_05_007', 'c11_bs_cbse_05_008', 'c11_bs_cbse_05_009', 'c11_bs_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a digital-strategy intern mapping a firm\'s electronic transactions', intro: 'Your manager wants every electronic activity tagged by category. Half of them never touch a customer — that\'s the part everyone gets wrong.', goal: 'Define e-business versus e-commerce and classify transactions as B2B, B2C, Intra-B, or C2C.' },
    discovery: {
        question: 'A firm\'s production team adjusts output live as sales data flows in over the company intranet — no customer ever sees it and nothing is sold online. Is this e-commerce, e-business, or neither?',
        options: ['E-business but not e-commerce — it digitises an internal function, while e-commerce covers only buyer-seller interactions over the internet', 'E-commerce, because computers are involved', 'Neither — nothing was bought or sold', 'Both — every electronic activity counts as both'],
        answer: 'E-business but not e-commerce — it digitises an internal function, while e-commerce covers only buyer-seller interactions over the internet',
        hook: 'E-commerce is the online storefront; e-business is the entire digital nervous system — inventory, production, HR, and accounting included.',
    },
    teaching: [
        { title: 'Business Process Outsourcing (BPO): Features and Scope', text: 'Business Process Outsourcing (BPO) is the practice of contracting specific non-core business processes or operations (such as customer support, payroll, data entry, or technical support) to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify a day\'s worth of digital activity — a midnight textbook purchase, the app paying its payment gateway, marketing syncing with tech on the intranet, one user selling to another — into B2C, B2B, Intra-B, and C2C.',
        labels: ['Business Process Outsourcing (BPO)', 'Benefits and Limitations', 'E-business Applications: E-Procurement, E-Commerce', 'Resources Required for E-business'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_007', title: 'Business Process Outsourcing (BPO): Features and Scope',
          caseStudy: { intro: 'Imagine you run a fast-growing Indian startup selling handmade organic skincare products online.',
            decisions: [{ prompt: 'What is the fundamental distinction between \'horizontal\' and \'vertical\' BPO services? Give one Indian industry example of each.', options: [
                { text: 'Horizontal BPO services are generic, industry-agnostic processes (e.g., payroll', outcome: 'Horizontal BPO services are generic, industry-agnostic processes (e.g., payroll processing.' },
                { text: 'horizontal means domestic, vertical means international', outcome: 'Not quite — Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO.', reveals: 'students-often-equate-bpo-with' },
                { text: 'captive BPO', outcome: 'Not quite — Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO.', reveals: 'students-often-equate-bpo-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_008', title: 'Benefits and Limitations of Outsourcing',
          caseStudy: { intro: 'Imagine you run a fast-growing Delhi-based startup selling handmade organic skincare products online.',
            decisions: [{ prompt: 'Define outsourcing and distinguish it from merely hiring a temporary worker for a short-term task.', options: [
                { text: 'Outsourcing is a long-term contractual arrangement where an external vendor assumes', outcome: 'Outsourcing is a long-term contractual arrangement where an external vendor assumes operational.' },
                { text: 'Outsourcing means sending jobs to Philippines or India to pay lower salaries', outcome: 'Not quite — Students believe outsourcing is **only about reducing labor costs by moving jobs to low-wage.', reveals: 'outsourcing-is-only-about-reducing' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_009', title: 'E-business Applications: E-Procurement, E-Commerce and E-Trading',
          caseStudy: { intro: 'Imagine you\'re a procurement manager at Maruti Suzuki needing 50,000 steel sheets monthly.',
            decisions: [{ prompt: 'Define e-Procurement and state the two specific mechanisms it uses for B2B transactions as per NCERT.', options: [
                { text: 'e-Procurement involves internet-based sales transactions between business firms using (1)', outcome: 'e-Procurement involves internet-based sales transactions between business firms using (1) reverse.' },
                { text: 'online shopping for businesses', outcome: 'Not quite — Students often treat e-Procurement, e-Commerce, and e-Trading as interchangeable "online.', reveals: 'students-often-treat-e-procurement' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_010', title: 'Resources Required for E-business: Hardware, Software and Data',
          caseStudy: { intro: 'Imagine you want to start an online store selling handmade Indian crafts to customers across India and abroad.',
            decisions: [{ prompt: 'List the three categories of resources required for e-business implementation as identified in the NCERT textbook, and give one specific.', options: [
                { text: 'The three categories are: (1) Hardware - e.g., web server, client computers, routers', outcome: 'The three categories are: (1) Hardware - e.g., web server, client computers, routers; (2) Software.' },
                { text: 'internet connection', outcome: 'Not quite — Students believe "data" only means the product catalogue, ignoring that transaction logs, customer.', reveals: 'data-only-means-the-product' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Two neighbourhood bakeries compete in your school\'s \'digitisation challenge\'. Bakery A builds a glossy website for online orders but keeps kitchen, stock and accounts on paper registers. Bakery B has no online shop at all, but its billing, inventory, production schedule and supplier ordering all run on one internal network. The judge asks which is the bigger e-business.',
            decisions: [{ prompt: 'Which bakery is more of an e-business?', options: [
                { text: 'Bakery B — e-business covers every networked business function: intra-B coordination between sales, kitchen, inventory and accounts, plus B2B supplier ordering. A customer-facing website is only the B2C slice of e-commerce; Bakery A is a manual business with a digital brochure.', outcome: 'E-business is the firm\'s whole digital nervous system — internal networked processes count even with zero online sales.' },
                { text: 'Bakery A — e-business means selling online, and it has a storefront website while B doesn\'t sell to customers digitally at all.', outcome: 'That collapses e-business into B2C e-commerce; the NCERT definition covers industry, trade AND commerce over networks — including invisible internal processes.', reveals: 'ebusiness-equals-online-shop' },
                { text: 'Neither — e-business requires both online sales and internal networking, so both fail.', outcome: 'There\'s no such combined requirement; even a firm with no customer website can be an e-business if its internal functions run on networks (Intra-B).', reveals: 'ebusiness-needs-both' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_05_010', title: 'You made it',
          caseStudy: { intro: 'You can now draw the real boundary: e-commerce is a subset of e-business, and \'Intra-B\' is the category everyone forgets exists.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_007', difficulty: 'standard',
          question: 'Business Process Outsourcing (BPO) is the practice of contracting specific.',
          hint: 'If unclear on core competency vs core activity, revisit the Zomato example: Food delivery.',
          misconception: 'Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO is horizontal.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental distinction between \'horizontal\' and \'vertical\' BPO services? Give one Indian industry example of each.', answer: 'Horizontal BPO services are generic, industry-agnostic processes (e.g., payroll',
                  options: ['Horizontal BPO services are generic, industry-agnostic processes (e.g., payroll', 'horizontal means domestic, vertical means international', 'captive BPO', 'third-party BPO'],
                  hint: 'If unclear on core competency vs core activity, revisit the Zomato example: Food delivery logistics.',
                  misconception: 'Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO is horizontal (generic).' },
                { id: 'b', prompt: 'A US healthcare provider wants to outsource medical transcription (converting doctor voice notes to electronic records).', answer: 'Medical transcription is a *vertical* BPO service',
                  options: ['Medical transcription is a *vertical* BPO service', 'cheaper labour', 'captive BPO', 'third-party BPO'],
                  hint: 'If unclear on core competency vs core activity, revisit the Zomato example: Food delivery logistics.',
                  misconception: 'Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO is horizontal (generic).' }
          ],
            remediations: { 'students-often-equate-bpo-with': { steps: ['If the student conflates BPO with call centres: (1) Show the NASSCOM BPM industry revenue split: Voice ~25%, Non-voice.', '(2) Map 5 BPO job roles to required qualifications: Medical Coder (CPC certification), Legal Process Analyst (Law.', '(3) Use the "Core Competency Matrix" exercise: List 10 processes of a chosen company (e.g., Zomato), classify each.', 'This shifts focus from "type of work" to "strategic role of work."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO is horizontal.',
          parts: [
                { id: 'a', prompt: 'Design a BPO engagement model for an Indian ed-tech company (like BYJU\'S or Unacademy) that wants to outsource its *student doubt-resolution* process (students.', answer: 'Horizontal or vertical classification with justification, (',
                  options: ['Horizontal or vertical classification with justification, (', 'captive BPO', 'third-party BPO', 'insourcing'],
                  hint: 'If unclear on core competency vs core activity, revisit the Zomato example: Food delivery logistics.',
                  misconception: 'Students often equate BPO with "call centres" or "low-skill data entry jobs" and assume all BPO is horizontal (generic).' }
          ],
            remediations: { 'students-often-equate-bpo-with': { steps: ['If the student conflates BPO with call centres: (1) Show the NASSCOM BPM industry revenue split: Voice ~25%, Non-voice.', '(2) Map 5 BPO job roles to required qualifications: Medical Coder (CPC certification), Legal Process Analyst (Law.', '(3) Use the "Core Competency Matrix" exercise: List 10 processes of a chosen company (e.g., Zomato), classify each.', 'This shifts focus from "type of work" to "strategic role of work."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_008', difficulty: 'standard',
          question: 'Outsourcing is the strategic practice of contracting out non-core business.',
          hint: 'Revisit the \'Core Competency\' concept in node c11_bs_cbse_05_006 (Outsourcing: Concept.',
          misconception: 'Students believe outsourcing is **only about reducing labor costs by moving jobs to low-wage countries** (equating.',
          parts: [
                { id: 'a', prompt: 'Analyze the limitation of \'loss of control\' in outsourcing. Compare how this manifests differently for (a) a manufacturing firm outsourcing component.', answer: 'a manufacturing firm outsourcing component production vs',
                  options: ['a manufacturing firm outsourcing component production vs', 'Outsourcing means sending jobs to Philippines or India to pay lower salaries'],
                  hint: 'Revisit the \'Core Competency\' concept in node c11_bs_cbse_05_006 (Outsourcing: Concept, Scope and.',
                  misconception: 'Students believe outsourcing is **only about reducing labor costs by moving jobs to low-wage countries** (equating it solely with.' }
          ],
            remediations: { 'outsourcing-is-only-about-reducing': { steps: ['**Clarify the definition**: Write on board: "Outsourcing = Contracting out a PROCESS (not just tasks) to a VENDOR (who.', 'Contrast with: Offshoring (geographic relocation), Subcontracting (specific task), Temporary Staffing (labor supply).', '**Use the family business analogy**: "If your family\'s sweet shop hires an accountant full-time, that\'s hiring.', 'If you pay a CA firm monthly to handle all accounting/GST, that\'s outsourcing—the CA firm decides which junior does the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_009', difficulty: 'standard',
          question: 'E-business applications are specific internet-enabled tools and processes that.',
          hint: 'Revisit c11_bs_cbse_05_003 and create a 2x2 matrix: rows = scope (B2B, B2C, Intra-B.',
          misconception: 'Students often treat e-Procurement, e-Commerce, and e-Trading as interchangeable "online buying-selling" because all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'E-business applications are specific internet-enabled tools and processes that',
                  options: ['E-business applications are specific internet-enabled tools and processes that', 'E-business is the conduct of industry, trade, and commerce using computer networks', 'E-business refers to the conduct of industry, trade, and commerce using computer networks', 'The scope of e-business is classified by the nature of transacting parties into four'],
                  hint: 'Revisit c11_bs_cbse_05_003 and create a 2x2 matrix: rows = scope (B2B, B2C, Intra-B, C2C), columns.',
                  misconception: 'Students often treat e-Procurement, e-Commerce, and e-Trading as interchangeable "online buying-selling" because all involve websites and.' }
          ],
            remediations: { 'students-often-treat-e-procurement': { steps: ['Ask the student to list the two parties in each transaction type (e.g., "Who buys and who sells in e-Procurement?").', 'Have them draw a 3-column table: Application | Parties | Price Discovery Mechanism.', 'Give three scenarios (government tender, buying a book, buying shares) and ask them to map each to the correct column.', 'Explicitly contrast "reverse auction" (sellers compete for one buyer) vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_05_010', difficulty: 'standard',
          question: 'Resources required for e-business refer to the essential technological.',
          hint: 'Revisit the distinction between "accessing the internet" (client role) and "hosting.',
          misconception: 'Students believe "data" only means the product catalogue, ignoring that transaction logs, customer behaviour analytics.',
          parts: [
                { id: 'a', prompt: 'Explain why a simple broadband connection and a laptop are insufficient for running a professional B2C e-commerce website, even though they can access the.', answer: 'A laptop and broadband are client-side resources',
                  options: ['A laptop and broadband are client-side resources', 'storage'],
                  hint: 'Revisit the distinction between "accessing the internet" (client role) and "hosting a service.',
                  misconception: 'Students believe "data" only means the product catalogue, ignoring that transaction logs, customer behaviour analytics, session cookies.' },
                { id: 'b', prompt: 'A small artisan wants to sell customised jewellery via Instagram and WhatsApp, accepting UPI payments.', answer: 'Smartphone, (',
                  options: ['Smartphone, (', 'payment gateway is a physical device rather than a software interface/API'],
                  hint: 'Revisit the distinction between "accessing the internet" (client role) and "hosting a service.',
                  misconception: 'Students believe "data" only means the product catalogue, ignoring that transaction logs, customer behaviour analytics, session cookies.' }
          ],
            remediations: { 'data-only-means-the-product': { steps: ['Ask the student to trace a single online order from click to delivery, listing every piece of information.', 'Have them classify each information piece as "catalogue data" or "transactional/operational data."', 'Show how missing operational data (e.g., no courier API pincode data) breaks the process.', 'Revisit the NCERT phrase "online embodiment of all content" and expand "content" to include process data, not just.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
