import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ca_ch01_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ca_ch01_p2: SimDef = {
    id: 'v3_c12_ca_ch01_p2',
    title: 'OVERVIEW OF · Part 2/2',
    subtitle: 'One entry, every ledger updated — what a computerised accounting system really is',
    classLevel: 12, subject: 'computerised_accounting', topic: 'OVERVIEW OF · Part 2/2',
    chapters: ['c12_ca_ch01'],
    nodeIds: ['c12_ca_cbse_01_007', 'c12_ca_cbse_01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Systems accountant', intro: 'Manual bookkeeping copies the same number into five books. A CAS writes it once and updates everything — here\'s how that magic actually works.', goal: 'Explain the five components of a computerised accounting system and trace how integrated processing replaces manual posting.' },
    discovery: {
        question: 'A kirana store owner buys Tally and declares, \'Our computerised accounting system is now installed.\' What\'s missing from that claim?',
        options: ['Software is only one of five components — a CAS also needs procedures, data, people and hardware working together', 'Nothing — buying accounting software IS installing a computerised accounting system', 'Only a faster printer is missing', 'The system isn\'t real until a CA certifies it'],
        answer: 'Software is only one of five components — a CAS also needs procedures, data, people and hardware working together',
        hook: 'Students write \'Tally is CAS\' and lose marks — the software is the visible tip. The system is five pillars, and it\'s the procedure-plus-people layer that turns one voucher entry into instant ledgers, trial balance and P&L.',
    },
    teaching: [
        { title: 'Limitations Of Cas', text: 'Limitations of Computerised Accounting System (CAS) refer to the inherent constraints and risks associated with processing accounting transactions through computer hardware and software, including.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ca_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Computerise a 200-transaction retail shop: trace one credit sale from voucher entry through every ledger and report it updates automatically, then design the account code structure that lets the system group accounts on its own.',
        labels: ['Limitations Of Cas', 'Accounting Information System (Ais)'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ca_cbse_01_007', title: 'Limitations Of Cas',
          caseStudy: { intro: 'Imagine a small retail business "Sharma Electronics" that switched from manual books to Tally software last year. The owner, Mr.',
            decisions: [{ prompt: 'State the four limitations of Computerised Accounting System (CAS) as per NCERT Class 12 Chapter 1.', options: [
                { text: 'The four limitations are: (1) Faster obsolescence of technology necessitates investment', outcome: 'The four limitations are: (1) Faster obsolescence of technology necessitates investment in shorter.' },
                { text: 'high initial cost', outcome: 'Not quite — Students often confuse "Limitations of CAS" with "Disadvantages of CAS implementation".', reveals: 'students-often-confuse-limitations-of' },
                { text: 'requires skilled staff', outcome: 'Not quite — Students often confuse "Limitations of CAS" with "Disadvantages of CAS implementation".', reveals: 'students-often-confuse-limitations-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_01_008', title: 'Accounting Information System (Ais)',
          caseStudy: { intro: 'Imagine you run a mid-sized garment manufacturing firm in Surat.',
            decisions: [{ prompt: 'What is the primary purpose of the Management Information System (MIS) sub-system within an Accounting Information System?', options: [
                { text: 'The MIS sub-system generates and processes customised reports vital for management', outcome: 'The MIS sub-system generates and processes customised reports vital for management decision-making.' },
                { text: 'MIS records daily cash receipts', outcome: 'Not quite — Students often think each AIS sub-system is a *standalone module* that works independently — e.g.', reveals: 'each-ais-sub-system-is' },
                { text: 'Inventory sub-system does inventory, Payroll does payroll, they don\'t talk', outcome: 'Not quite — Students often think each AIS sub-system is a *standalone module* that works independently — e.g.', reveals: 'each-ais-sub-system-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A trader installs accounting software and proudly declares: \'We have a computerised accounting system now — the computer posts everything, so the staff don\'t even need to know debit and credit.\'',
            decisions: [{ prompt: 'Is the system complete, and is the debit/credit knowledge really redundant?', options: [
                { text: 'Neither — CAS is five components (procedure, data, people, hardware, software), and the software only automates posting: staff still choose voucher types and pass journal adjustments like depreciation, which need debit/credit logic.', outcome: 'Automation replaces the ledger-posting step, not accounting judgement — a wrong voucher choice propagates the error everywhere instantly.' },
                { text: 'Yes — the software is the system, and auto-posting means no human accounting knowledge is needed.', outcome: 'Software is one pillar of five; and every voucher type has hard-coded debit/credit logic the user must trigger correctly.', reveals: 'cas-is-just-software' },
                { text: 'Yes — since ledgers and trial balance update automatically, debit and credit have become obsolete concepts.', outcome: 'Rectification and year-end entries go through journal vouchers with no preset logic — debit/credit fluency is still required there.', reveals: 'automation-kills-debit-credit' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ca_cbse_01_008', title: 'You made it',
          caseStudy: { intro: 'You can now explain why CAS is a system, not a download — and why one entry replaces the whole posting phase. Boards love the \'five components\' question; businesses live by it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ca_cbse_01_007', difficulty: 'standard',
          question: 'Limitations of Computerised Accounting System (CAS) refer to the inherent.',
          hint: 'If stuck, revisit c12_ca_cbse_01_002 (Components Of Cas) and identify which component.',
          misconception: 'Students often confuse "Limitations of CAS" with "Disadvantages of CAS implementation" or "Limitations of Accounting".',
          parts: [
                { id: 'a', prompt: 'Compare the limitation "Faster obsolescence of technology" in CAS with the concept of "depreciation of fixed assets" learned in Class 11 Accountancy.', answer: 'Similarity: Both involve loss of value/utility over time',
                  options: ['Similarity: Both involve loss of value/utility over time', 'they are the same', 'Limitations of CAS', 'Disadvantages of CAS implementation'],
                  hint: 'If stuck, revisit c12_ca_cbse_01_002 (Components Of Cas) and identify which component each.',
                  misconception: 'Students often confuse "Limitations of CAS" with "Disadvantages of CAS implementation" or "Limitations of Accounting".' }
          ],
            remediations: { 'students-often-confuse-limitations-of': { steps: ['If a student lists generic disadvantages instead of the four NCERT limitations: 1.', 'Ask them to open NCERT Chapter 1, Section 1.7 "LIMITATIONS OF CAS" and read the four bullet points aloud.', 'Create a two-column table: Column A = "NCERT Limitation", Column B = "What makes this a TECHNOLOGY-SPECIFIC risk?" Fill.', 'Give three scenarios (power cut corrupts data, GST update forces software upgrade, hacker steals data, bank asks for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "Limitations of CAS" with "Disadvantages of CAS implementation" or "Limitations of Accounting".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The risk of hacking in CAS is exaggerated because manual ledgers can also be stolen or tampered with." Use the NCERT limitations.', answer: 'The statement is false',
                  options: ['The statement is false', 'both have risks so it\'s equal', 'Limitations of CAS', 'Disadvantages of CAS implementation'],
                  hint: 'If stuck, revisit c12_ca_cbse_01_002 (Components Of Cas) and identify which component each.',
                  misconception: 'Students often confuse "Limitations of CAS" with "Disadvantages of CAS implementation" or "Limitations of Accounting".' },
                { id: 'b', prompt: 'Design a 3-point risk mitigation plan for a medium-sized firm using CAS to address the four NCERT limitations.', answer: 'A good answer includes: 1',
                  options: ['A good answer includes: 1', 'Limitations of CAS', 'Disadvantages of CAS implementation', 'Limitations of Accounting'],
                  hint: 'If stuck, revisit c12_ca_cbse_01_002 (Components Of Cas) and identify which component each.',
                  misconception: 'Students often confuse "Limitations of CAS" with "Disadvantages of CAS implementation" or "Limitations of Accounting".' }
          ],
            remediations: { 'students-often-confuse-limitations-of': { steps: ['If a student lists generic disadvantages instead of the four NCERT limitations: 1.', 'Ask them to open NCERT Chapter 1, Section 1.7 "LIMITATIONS OF CAS" and read the four bullet points aloud.', 'Create a two-column table: Column A = "NCERT Limitation", Column B = "What makes this a TECHNOLOGY-SPECIFIC risk?" Fill.', 'Give three scenarios (power cut corrupts data, GST update forces software upgrade, hacker steals data, bank asks for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ca_cbse_01_008', difficulty: 'standard',
          question: 'An Accounting Information System (AIS) is an integrated framework.',
          hint: 'If stuck, revisit c12_ca_cbse_01_004 (Grouping of Accounts) and practice coding 20.',
          misconception: 'Students often think each AIS sub-system is a *standalone module* that works independently — e.g., "Inventory.',
          parts: [
                { id: 'a', prompt: 'A retail chain uses an AIS. On 15th March, a store manager enters a cash sale of ₹45,000.', answer: 'Correct response: (1) Cash and Bank sub-system',
                  options: ['Correct response: (1) Cash and Bank sub-system', 'Inventory sub-system does inventory, Payroll does payroll, they don\'t talk', 'each AIS sub-system is a *standalone module* that works independently'],
                  hint: 'If stuck, revisit c12_ca_cbse_01_004 (Grouping of Accounts) and practice coding 20 accounts from.',
                  misconception: 'Students often think each AIS sub-system is a *standalone module* that works independently — e.g., "Inventory sub-system does inventory.' },
                { id: 'b', prompt: 'Compare the Fixed Assets Accounting sub-system and the Expense Accounting sub-system in terms of (a) nature of items tracked, (b) valuation method, and (c).', answer: 'nature of items tracked, (',
                  options: ['nature of items tracked, (', 'Inventory sub-system does inventory, Payroll does payroll, they don\'t talk', 'each AIS sub-system is a *standalone module* that works independently'],
                  hint: 'If stuck, revisit c12_ca_cbse_01_004 (Grouping of Accounts) and practice coding 20 accounts from.',
                  misconception: 'Students often think each AIS sub-system is a *standalone module* that works independently — e.g., "Inventory sub-system does inventory.' }
          ],
            remediations: { 'each-ais-sub-system-is': { steps: ['If a student exhibits this misconception: (1) Have them trace a *single* credit purchase of raw material (₹50,000, GST.', '(2) Then ask: "If the Purchase clerk enters the invoice but the Inventory clerk doesn\'t see it until evening, what two.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
