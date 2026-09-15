import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bs_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bs_ch03_p1: SimDef = {
    id: 'v3_c11_bs_ch03_p1',
    title: 'Private, Public and Global Enterprises · Part 1/2',
    subtitle: 'Separate \'owned by the public\' from \'sold to the public\' — the exam\'s favourite trap.',
    classLevel: 11, subject: 'business_studies', topic: 'Private, Public and Global Enterprises · Part 1/2',
    chapters: ['c11_bs_ch03'],
    nodeIds: ['c11_bs_cbse_03_001', 'c11_bs_cbse_03_002', 'c11_bs_cbse_03_003', 'c11_bs_cbse_03_004', 'c11_bs_cbse_03_005', 'c11_bs_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a policy analyst explaining a disinvestment headline', intro: 'The news says government will sell 51% of a PSU. Before you can say what changes, you need the real definition of public sector.', goal: 'Distinguish private from public sector enterprises and classify the three public sector forms by ownership, control, and legal basis.' },
    discovery: {
        question: 'A student calls LIC \'a public sector company because it sells insurance to the public\' — and calls Reliance \'private\' for the opposite reason. Both labels are wrong for the same reason. What\'s the actual test?',
        options: ['Ownership and legal origin — LIC is government-owned under its own Act; a \'public limited company\' like Reliance sells shares publicly but stays privately controlled', 'Size — only large firms count as public sector', 'Who buys the product — serving citizens makes it public', 'Stock exchange listing — listed firms are public sector'],
        answer: 'Ownership and legal origin — LIC is government-owned under its own Act; a \'public limited company\' like Reliance sells shares publicly but stays privately controlled',
        hook: '\'Public sector\' means owned BY the public through government; \'public limited\' means shares sold TO the public — same word, opposite classifications.',
    },
    teaching: [
        { title: 'Private Sector and Public Sector: Meaning and Distinction', text: 'The private sector comprises business enterprises owned, controlled, and managed by private individuals or groups (sole proprietorship, partnership, Joint Hindu Family, cooperative, company) with the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bs_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify a lineup — Indian Railways, Reliance, LIC, BHEL, your local kirana — into private sector versus departmental undertaking, statutory corporation, or government company, citing ownership and the law that created each.',
        labels: ['Private Sector and Public', 'Departmental Undertakings: Features, Merits', 'Statutory Corporations: Features, Merits', 'Government Companies: Features, Merits', 'Forms of Public Sector', 'Changing Role of Public'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_001', title: 'Private Sector and Public Sector: Meaning and Distinction',
          caseStudy: { intro: 'Imagine you are reading a news headline: "Government to sell 51% stake in BPCL to private players." You wonder: What changes when BPCL moves from public.',
            decisions: [{ prompt: 'Define \'Public Sector Enterprise\' as per the Companies Act, 2013 threshold.', options: [
                { text: 'A Government Company is defined under Section 2(45) of the Companies Act, 2013 as any', outcome: 'A Government Company is defined under Section 2(45) of the Companies Act, 2013 as any company.' },
                { text: 'majority stake without specifying 51%', outcome: 'Not quite — Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.', reveals: 'students-consistently-confuse-public-sector' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_002', title: 'Departmental Undertakings: Features, Merits and Limitations',
          caseStudy: { intro: 'Imagine you are travelling from Delhi to Mumbai by train. The Indian Railways that runs this train is not a private company like IndiGo or a government company.',
            decisions: [{ prompt: 'What is the single most distinctive financial characteristic of a departmental undertaking that separates it from a statutory corporation.', options: [
                { text: 'The distinctive financial characteristic is that all funding comes directly from the', outcome: 'The distinctive financial characteristic is that all funding comes directly from the government.' },
                { text: 'it raises funds by issuing shares', outcome: 'Not quite — Students often believe that "departmental undertaking" and "government department" are synonyms.', reveals: 'departmental-undertaking-and-government-departme' },
                { text: 'departmental undertaking', outcome: 'Not quite — Students often believe that "departmental undertaking" and "government department" are synonyms.', reveals: 'departmental-undertaking-and-government-departme' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_003', title: 'Statutory Corporations: Features, Merits and Limitations',
          caseStudy: { intro: 'Imagine you\'re travelling from Delhi to Mumbai. You book a ticket on **Air India (before 2022)** or send a parcel via **Indian Railways** — both feel like.',
            decisions: [{ prompt: 'Name the specific legislation that brings a statutory corporation into existence and state the two key attributes that the legislation.', options: [
                { text: 'A statutory corporation is created by a **Special Act of Parliament (or State', outcome: 'A statutory corporation is created by a **Special Act of Parliament (or State Legislature)**.' },
                { text: 'Companies Act', outcome: 'Not quite — Students believe **"Statutory Corporation = Government Company with a different name"**.', reveals: 'statutory-corporation-government-company-with' },
                { text: 'Government notification', outcome: 'Not quite — Students believe **"Statutory Corporation = Government Company with a different name"**.', reveals: 'statutory-corporation-government-company-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_004', title: 'Government Companies: Features, Merits and Limitations',
          caseStudy: { intro: 'Imagine you read a news headline: "Government to sell 10% stake in Bharat Electronics Ltd (BEL) via offer for sale." You wonder: Is BEL a government department.',
            decisions: [{ prompt: 'State the exact legal threshold of paid-up share capital that the government must hold for a company to be classified as a Government.', options: [
                { text: 'The government (Central, State, or both combined) must hold **not less than 51%** of the', outcome: 'The government (Central, State, or both combined) must hold **not less than 51%** of the paid-up.' },
                { text: 'majority stake', outcome: 'Not quite — Students confuse **Government Company** with **Government-Owned Company** broadly.', reveals: 'students-confuse-government-company-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_005', title: 'Forms of Public Sector Enterprises: Comparative Analysis',
          caseStudy: { intro: 'Imagine the Government of India wants to establish a new enterprise for manufacturing bullet trains.',
            decisions: [{ prompt: 'Name the three forms of organising public sector enterprises in India and state the specific legislation under which each is created.', options: [
                { text: 'The three forms are: (1) Departmental Undertaking – created as a government department', outcome: 'The three forms are: (1) Departmental Undertaking – created as a government department under.' },
                { text: 'Government Company', outcome: 'Not quite — Students often believe "Government Company" implies a private-sector-style company with full.', reveals: 'government-company-implies-a-private' },
                { text: 'Statutory Corporation', outcome: 'Not quite — Students often believe "Government Company" implies a private-sector-style company with full.', reveals: 'government-company-implies-a-private' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'During a stock-market club session you\'re sorting enterprises for a mock ESG portfolio. Members argue over SAIL and BHEL: \'They say Ltd. and are Public Limited Companies whose shares trade on NSE — so they must be private sector. Public sector means something the public can\'t buy shares in, like the Railways.\'',
            decisions: [{ prompt: 'Which sector do SAIL and BHEL actually belong to?', options: [
                { text: 'Public sector — the test is ownership: government holds ≥51% of paid-up capital, making them Government Companies. \'Public Limited\' only describes share transferability under the Companies Act; \'public sector\' describes who owns it. SAIL is public limited by form and public sector by ownership.', outcome: 'Two different axes — legal form (public/private limited) and ownership (private individuals vs government ≥51%) — must not be conflated.' },
                { text: 'Private sector — anything listed on a stock exchange with \'Ltd.\' in its name is a private company.', outcome: 'Exchange listing and \'Ltd.\' are about form, not ownership; a company can be publicly traded AND government-owned.', reveals: 'ltd-means-private-sector' },
                { text: 'Neither — if shares trade publicly it can\'t be \'public sector\' because that term means closed to public participation.', outcome: '\'Public\' in public sector means owned by the public through government — the opposite of closed; citizens hold it via the state\'s majority stake.', reveals: 'public-sector-means-not-listed' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bs_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now sort enterprises by who owns them and what statute birthed them — not by what they sell or how big they are.',
            decisions: [{ prompt: 'What comes next? Private, Public and Global Enterprises · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Private, Public and Global Enterprises · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_001', difficulty: 'standard',
          question: 'The private sector comprises business enterprises owned, controlled, and.',
          hint: 'If stuck, revisit Class 9 Economics Chapter 1 \'The Story of Village Palampur\' / \'People.',
          misconception: 'Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The private sector comprises business enterprises owned, controlled, and managed by',
                  options: ['The private sector comprises business enterprises owned, controlled, and managed by', 'A departmental undertaking is the oldest and most traditional form of public sector', 'A statutory corporation is a public enterprise created by a Special Act of Parliament or', 'A Government Company is a company registered under the Companies Act, 2013 (or any'],
                  hint: 'If stuck, revisit Class 9 Economics Chapter 1 \'The Story of Village Palampur\' / \'People.',
                  misconception: 'Students consistently confuse \'Public Sector Enterprise\' with \'Public Limited Company\'.' }
          ],
            remediations: { 'students-consistently-confuse-public-sector': { steps: ['Ask the student to write the legal definition of \'Government Company\' (Sec 2(45) Companies Act, 2013) and \'Public.', 'Highlight the words "held by the Central Government/State Government" vs "minimum seven members".', 'Give a concrete example: "Indian Oil Corporation Ltd. (IOCL) – 51.5% govt holding → Public Sector Government Company.', 'Drill with 5 rapid-fire names (ONGC, TCS, FCI, SBI, Infosys) requiring the student to state: "Public/Private + Form.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_002', difficulty: 'standard',
          question: 'A departmental undertaking is the oldest and most traditional form of public.',
          hint: 'If stuck, revisit c11_bs_cbse_03_001 (Private Sector and Public Sector: Meaning and Dist).',
          misconception: 'Students often believe that "departmental undertaking" and "government department" are synonyms, and therefore think.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the employees of a departmental undertaking are considered "government servants" whereas employees of a government company are.', answer: 'Departmental undertaking employees are recruited through the same civil service',
                  options: ['Departmental undertaking employees are recruited through the same civil service', 'both are paid by government', 'departmental undertaking', 'government department'],
                  hint: 'If stuck, revisit c11_bs_cbse_03_001 (Private Sector and Public Sector: Meaning and Dist) and.',
                  misconception: 'Students often believe that "departmental undertaking" and "government department" are synonyms, and therefore think *every* government.' },
                { id: 'b', prompt: 'A new metro rail project is proposed in a state capital. The state government wants to complete it quickly, adopt latest signalling technology, and adjust.', answer: 'No, a departmental undertaking is unsuitable',
                  options: ['No, a departmental undertaking is unsuitable', 'political interference', 'departmental undertaking', 'government department'],
                  hint: 'If stuck, revisit c11_bs_cbse_03_001 (Private Sector and Public Sector: Meaning and Dist) and.',
                  misconception: 'Students often believe that "departmental undertaking" and "government department" are synonyms, and therefore think *every* government.' },
                { id: 'c', prompt: 'Compare the accountability mechanism of a departmental undertaking with that of a statutory corporation.', answer: 'Departmental undertakings provide stronger direct parliamentary control',
                  options: ['Departmental undertakings provide stronger direct parliamentary control', 'departmental undertaking', 'government department'],
                  hint: 'If stuck, revisit c11_bs_cbse_03_001 (Private Sector and Public Sector: Meaning and Dist) and.',
                  misconception: 'Students often believe that "departmental undertaking" and "government department" are synonyms, and therefore think *every* government.' }
          ],
            remediations: { 'departmental-undertaking-and-government-departme': { steps: ['If the student conflates all government departments with departmental undertakings, do this 3-step remediation: (1).', '(2) Ask the student to place each of these in the correct column: Indian Railways, Income Tax Department, Post Office.', '(3) For each placement, demand the reasoning: "Does it sell a service/good to the public for a price?" Only \'yes\'.', 'This isolates the *commercial activity* criterion that the textbook uses.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "departmental undertaking" and "government department" are synonyms, and therefore think.',
          parts: [
                { id: 'a', prompt: '"Departmental undertakings are the best form for running commercial enterprises like hotels or textile mills." Evaluate this statement critically using.', answer: 'The statement is false',
                  options: ['The statement is false', 'departmental undertaking', 'government department'],
                  hint: 'If stuck, revisit c11_bs_cbse_03_001 (Private Sector and Public Sector: Meaning and Dist) and.',
                  misconception: 'Students often believe that "departmental undertaking" and "government department" are synonyms, and therefore think *every* government.' }
          ],
            remediations: { 'departmental-undertaking-and-government-departme': { steps: ['If the student conflates all government departments with departmental undertakings, do this 3-step remediation: (1).', '(2) Ask the student to place each of these in the correct column: Indian Railways, Income Tax Department, Post Office.', '(3) For each placement, demand the reasoning: "Does it sell a service/good to the public for a price?" Only \'yes\'.', 'This isolates the *commercial activity* criterion that the textbook uses.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_003', difficulty: 'standard',
          question: 'A statutory corporation is a public enterprise created by a Special Act.',
          hint: 'If stuck, revisit the "Departmental Undertakings" node (c11_bs_cbse_03_002) and list its.',
          misconception: 'Students believe **"Statutory Corporation = Government Company with a different name"** or **"Statutory Corporation.',
          parts: [
                { id: 'a', prompt: 'Name the specific legislation that brings a statutory corporation into existence and state the two key attributes that the legislation defines for the.', answer: 'A statutory corporation is created by a **Special Act of Parliament (or State',
                  options: ['A statutory corporation is created by a **Special Act of Parliament (or State', 'Companies Act', 'Government notification', 'Statutory Corporation = Government Company with a different name'],
                  hint: 'If stuck, revisit the "Departmental Undertakings" node (c11_bs_cbse_03_002) and list its six.',
                  misconception: 'Students believe **"Statutory Corporation = Government Company with a different name"** or **"Statutory Corporation = Departmental.' },
                { id: 'b', prompt: 'Explain why the employees of a statutory corporation are NOT considered government servants, and how their service conditions are actually determined.', answer: 'Employees are not government servants',
                  options: ['Employees are not government servants', 'They are appointed by the ministry', 'They follow IAS rules', 'Statutory Corporation = Government Company with a different name'],
                  hint: 'If stuck, revisit the "Departmental Undertakings" node (c11_bs_cbse_03_002) and list its six.',
                  misconception: 'Students believe **"Statutory Corporation = Government Company with a different name"** or **"Statutory Corporation = Departmental.' }
          ],
            remediations: { 'statutory-corporation-government-company-with': { steps: ['**Isolate the birth event**: Ask the student to write one sentence for each form: "Departmental undertaking is born.', '**Create a 3-column table** (Feature | Departmental | Statutory | Government Company) with only the six features.', 'Student fills each cell from memory.', '**Role-play**: "You are the CEO of LIC (statutory corp).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_004', difficulty: 'standard',
          question: 'A Government Company is a company registered under the Companies Act, 2013 (or.',
          hint: 'If stuck on the 51% threshold or legal form distinctions, revisit c11_bs_cbse_03_001.',
          misconception: 'Students confuse **Government Company** with **Government-Owned Company** broadly.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Government Company is a company registered under the Companies Act, 2013 (or any',
                  options: ['A Government Company is a company registered under the Companies Act, 2013 (or any', 'The private sector comprises business enterprises owned, controlled, and managed by', 'A departmental undertaking is the oldest and most traditional form of public sector', 'A statutory corporation is a public enterprise created by a Special Act of Parliament or'],
                  hint: 'If stuck on the 51% threshold or legal form distinctions, revisit c11_bs_cbse_03_001 (Private.',
                  misconception: 'Students confuse **Government Company** with **Government-Owned Company** broadly.' }
          ],
            remediations: { 'students-confuse-government-company-with': { steps: ['If a student misclassifies enterprises due to this misconception, do this 3-step remediation: 1.', '**Create a threshold checklist**: On a card, write: "Govt Company = (a) Companies Act registration + (b) Govt holds.', '**Contrast with "Government Shareholding"**: Show a shareholding pattern of Axis Bank (Govt entities hold ~15%) and BEL.', 'Ask: "Which meets the 51% *control* threshold?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_005', difficulty: 'standard',
          question: 'Comparative analysis of public sector enterprises involves systematically.',
          hint: 'If stuck, revisit the "Features", "Merits", and "Limitations" sub-sections of nodes 002.',
          misconception: 'Students often believe "Government Company" implies a private-sector-style company with full autonomy, overlooking that.',
          parts: [
                { id: 'a', prompt: 'Explain why a Statutory Corporation is considered a \'body corporate\' while a Departmental Undertaking is not, and state one practical consequence of this.', answer: 'A Statutory Corporation is a body corporate',
                  options: ['A Statutory Corporation is a body corporate', 'Government Company', 'Statutory Corporation'],
                  hint: 'If stuck, revisit the "Features", "Merits", and "Limitations" sub-sections of nodes 002, 003, and.',
                  misconception: 'Students often believe "Government Company" implies a private-sector-style company with full autonomy, overlooking that ≥51% government.' },
                { id: 'b', prompt: 'The Government wants to set up an enterprise for strategic defence production (missiles) where secrecy and direct parliamentary control are paramount.', answer: 'Departmental Undertaking is most suitable',
                  options: ['Departmental Undertaking is most suitable', 'Government Company', 'Statutory Corporation'],
                  hint: 'If stuck, revisit the "Features", "Merits", and "Limitations" sub-sections of nodes 002, 003, and.',
                  misconception: 'Students often believe "Government Company" implies a private-sector-style company with full autonomy, overlooking that ≥51% government.' },
                { id: 'c', prompt: 'Compare the financing mechanisms of the three forms and analyse how each mechanism impacts the enterprise\'s ability to respond to market opportunities.', answer: 'Departmental Undertaking: Financed by budgetary appropriation',
                  options: ['Departmental Undertaking: Financed by budgetary appropriation', 'Government Company', 'Statutory Corporation'],
                  hint: 'If stuck, revisit the "Features", "Merits", and "Limitations" sub-sections of nodes 002, 003, and.',
                  misconception: 'Students often believe "Government Company" implies a private-sector-style company with full autonomy, overlooking that ≥51% government.' }
          ],
            remediations: { 'government-company-implies-a-private': { steps: ['Re-read the "Features" section of each form in nodes 002, 003, 004 and highlight every phrase describing "control".', 'Create a 3×3 matrix: rows = forms, columns = Source of Power, Appointment of Top Management, Scope of Operations.', 'For each column, ask: "Who ultimately decides—the Minister, the Board, or the Act?" 4.', 'Write one sentence per form explaining how that decision-flow affects autonomy.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_bs_cbse_03_006', difficulty: 'standard',
          question: 'The changing role of the public sector refers to the strategic shift.',
          hint: 'Revisit node c11_bs_cbse_03_005 (Comparative Analysis of Public Enterprise Forms).',
          misconception: 'Students often equate "disinvestment" with "privatisation" and assume the government always sells 100% stake and loses.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The changing role of the public sector refers to the strategic shift in government policy',
                  options: ['The changing role of the public sector refers to the strategic shift in government policy', 'The private sector comprises business enterprises owned, controlled, and managed by', 'A departmental undertaking is the oldest and most traditional form of public sector', 'A statutory corporation is a public enterprise created by a Special Act of Parliament or'],
                  hint: 'Revisit node c11_bs_cbse_03_005 (Comparative Analysis of Public Enterprise Forms) to recall which.',
                  misconception: 'Students often equate "disinvestment" with "privatisation" and assume the government always sells 100% stake and loses control.' }
          ],
            remediations: { 'students-often-equate-disinvestment-with': { steps: ['Draw a spectrum line: "Minority Stake Sale (OFS/ETF) → Majority Stake Sale (Strategic Sale) → 100% Sale.', 'Place three real examples on it: LIC IPO (2022) at minority, Air India (2022) at strategic, and a hypothetical 100%.', 'Ask the student to label each point with "% stake sold" and "Control transferred?', 'Have them re-read the 1991 policy line: "Bring down government equity in all non-strategic PSUs to 26% or lower,.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
