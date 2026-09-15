import type { SimDef } from '../../engine/types';
import C12_ComputerScienceOperatingSystemInternalsSim from '../../../simulations/c6_12/C12_ComputerScienceOperatingSystemInternalsSim';

/** v3 wrapped master — C12_ComputerScienceOperatingSystemInternalsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_computerscienceoperatingsysteminternalssim: SimDef = {
    id: 'v3w_c12_computerscienceoperatingsysteminternalssim',
    title: 'Operating System Internals',
    subtitle: 'This node covers: definition and classification of e-waste, hazardous constituents and.',
    classLevel: 12, subject: 'computer_science', topic: 'E-Waste Management and Disposal',
    chapters: [],
    nodeIds: ['c12_cs_cbse_13_003', 'c12_cs_cbse_01_010', 'c12_cs_cbse_12_005', 'c12_cs_cbse_07_001', 'c12_cs_cbse_13_010', 'c12_cs_cbse_04_002', 'c12_cs_cbse_13_001', 'c12_cs_cbse_13_005', 'c12_cs_cbse_13_006', 'c12_cs_cbse_13_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine your family just upgraded from a 5-year-old CRT television to a new smart TV.', goal: 'Master Operating System Internals.' },
    discovery: {
        question: 'Explain why symmetric encryption alone is insufficient for secure key exchange over an untrusted network, and how asymmetric encryption solves this.',
        options: ['Symmetric encryption requires both parties to already share a secret key', 'asymmetric is faster so we use it for everything', 'encrypts data'],
        answer: 'Symmetric encryption requires both parties to already share a secret key',
        hook: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based.',
    },
    teaching: [
        { title: 'E-Waste (Electronic Waste) refers to.', text: 'E-Waste (Electronic Waste) refers to discarded electrical or electronic devices such as computers, mobile phones, televisions, and refrigerators that have reached the end of their useful life.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_cs_cbse_13_003', title: 'E-Waste (Electronic Waste) refers to.',
          scaffold: { problem: 'A government office (bulk consumer) has 150 employees. Each employee uses 1 laptop (ITEW1, avg weight 2.5 kg, lifespan 4 years) and 1.',
            steps: [
            { text: 'Identify the formula for steady-state annual generation: Annual Generation = (Number of Units × Average Weight) /.' },
            { text: 'Compute for laptops (ITEW1): (150 units × 2.5 kg) / 4 years = 375 kg / 4 = 93.75 kg/year.' },
            { text: 'Compute for mobile phones (ITEW2): (150 units × 0.18 kg) / 2.5 years = 27 kg / 2.5 = 10.8 kg/year.' },
            { text: 'Compute for printers (ITEW6): (20 units × 12 kg) / 5 years = 240 kg / 5 = 48 kg/year.' },
            { text: 'Sum across categories: Total = 93.75 + 10.8 + 48 = 152.55 kg/year.' },
            { text: 'Interpret: This is the *theoretical* annual flow if all devices are replaced exactly at end-of-life; actual generation.', faded: true, blankAnswer: '152.55 kg/year (approx. 153 kg/year)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_01_010', title: 'Network security encompasses measures.',
          scaffold: { problem: 'A school network administrator configures a stateful firewall with these rules in order: (1) Allow established/related incoming, (2) Allow.',
            steps: [
            { text: 'Identify packet direction — incoming (from external server to internal teacher).' },
            { text: 'Check rule 1 — "Allow established/related incoming." The firewall\'s state table has an entry for the teacher\'s outgoing.' },
            { text: 'Since UDP is connectionless, "established" means the firewall saw a recent outgoing packet with matching 4-tuple.' },
            { text: 'Rule 1 matches — firewall allows the packet, updates state timestamp.' },
            { text: 'Rules 2 and 3 are not evaluated (first-match policy). The video call works.', faded: true, blankAnswer: 'The firewall allows the server\'s reply packet because it.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_12_005', title: 'A firewall is a network security system.',
          scaffold: { problem: 'A school network administrator wants to prevent students from accessing social media sites (Facebook, Instagram) during school hours (8 AM.',
            steps: [
            { text: 'Identify the assets to protect (student workstations) and the traffic to control (HTTP/HTTPS to social media domains).' },
            { text: 'Choose firewall type — a network firewall at the gateway can enforce policy for all students centrally; host-based.' },
            { text: 'Define rule logic using source IP ranges (student subnet vs teacher subnet), destination (social media IP/domain.' },
            { text: 'Write rules in order: (1) ALLOW teacher subnet to any destination on ports 80/443; (2) DENY student subnet to.' },
            { text: 'Verify by testing from a student machine (blocked) and teacher machine (allowed); enable logging to audit violations.', faded: true, blankAnswer: 'Network firewall at gateway with time-based,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_07_001', title: 'Boolean Algebra is a mathematical.',
          scaffold: { problem: 'A company gives a bonus to an employee if (the employee has worked for 5+ years) AND (the employee\'s performance rating is \'Excellent\' OR.',
            steps: [
            { text: 'Identify the atomic conditions: (a) Worked 5+ years, (b) Rating is Excellent, (c) Rating is Outstanding.' },
            { text: 'Assign Boolean variables: Y = TRUE if worked 5+ years, else FALSE; E = TRUE if rating Excellent, else FALSE; O = TRUE.' },
            { text: 'Note the logical structure: Bonus = Y AND (E OR O).' },
            { text: 'Translate to Boolean notation: AND becomes · (or implied multiplication), OR becomes +. Expression: B = Y · (E + O).' },
            { text: 'Verify: If Y=1, E=1, O=0 → B = 1·(1+0) = 1·1 = 1 (bonus given). If Y=0, E=1, O=1 → B = 0·(1+1) = 0·1 = 0 (no bonus).', faded: true, blankAnswer: 'B = Y · (E + O) where Y=worked 5+ years, E=Excellent.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_13_010', title: 'Gender issues in technology access.',
          scaffold: { problem: 'In a survey of 1,200 rural households in Uttar Pradesh, 720 households own at least one smartphone.',
            steps: [
            { text: 'Identify given data — total households = 1,200; smartphone-owning households = 720; women with meaningful access in.' },
            { text: 'Calculate (a) household smartphone penetration = (720 / 1,200) × 100 = 60%.' },
            { text: 'Calculate (b) women\'s meaningful access rate among smartphone households = (480 / 720) × 100 = 66.7%.' },
            { text: 'Calculate total women with meaningful access = 480 + 120 = 600.' },
            { text: 'Interpret: Household penetration (60%) overstates women\'s actual meaningful access (50%) by 10 percentage points.', faded: true, blankAnswer: '(a) 60%, (b) 66.7%, (c) 50%. The 10-percentage-point gap.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_04_002', title: 'A file system manages data as separate.',
          scaffold: { problem: 'A coaching institute maintains student data in three separate text files: STUDENT.TXT (RollNo, Name, Phone), BATCH.TXT (RollNo, BatchCode,.',
            steps: [
            { text: 'Read STUDENT.TXT into memory, parse each line into fields.' },
            { text: 'Read BATCH.TXT, parse, and build a mapping from RollNo to BatchCode.' },
            { text: 'Read FEES.TXT, parse, and for each RollNo sum AmountPaid.' },
            { text: 'For each student in STUDENT.TXT, look up BatchCode from Step 2 mapping and total paid from Step 3 mapping; if BatchCode.' },
            { text: 'Identify problems: (a) If a RollNo in BATCH.TXT has a typo (e.g., \'101\' vs \'10 1\'), the join fails silently — no.', faded: true, blankAnswer: 'File-system steps as above; three problems: lack of.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_cs_cbse_01_010', title: 'Identify each idea',
          dissect: { specimen: 'Operating System Internals', spots: [
            { id: 's1', label: 'E-Waste Electronic Waste refers to', prompt: 'Which idea is this? — E-Waste (Electronic Waste) refers to discarded electrical or electronic devices such as.', answer: 'E-Waste Electronic Waste refers to', options: ['E-Waste Electronic Waste refers to', 'Network security encompasses measures to', 'A firewall is a network', 'Boolean Algebra is a mathematical'] },
            { id: 's2', label: 'Network security encompasses measures to', prompt: 'Which idea is this? — Network security encompasses measures to protect network infrastructure and data from.', answer: 'Network security encompasses measures to', options: ['Network security encompasses measures to', 'E-Waste Electronic Waste refers to', 'A firewall is a network', 'Boolean Algebra is a mathematical'] },
            { id: 's3', label: 'A firewall is a network', prompt: 'Which idea is this? — A firewall is a network security system that monitors and controls incoming and outgoing.', answer: 'A firewall is a network', options: ['A firewall is a network', 'E-Waste Electronic Waste refers to', 'Network security encompasses measures to', 'Boolean Algebra is a mathematical'] },
            { id: 's4', label: 'Boolean Algebra is a mathematical', prompt: 'Which idea is this? — Boolean Algebra is a mathematical system for representing and manipulating logical.', answer: 'Boolean Algebra is a mathematical', options: ['Boolean Algebra is a mathematical', 'E-Waste Electronic Waste refers to', 'Network security encompasses measures to', 'A firewall is a network'] },
            { id: 's5', label: 'Gender issues in technology access', prompt: 'Which idea is this? — Gender issues in technology access refer to the systemic disparities in availability,.', answer: 'Gender issues in technology access', options: ['Gender issues in technology access', 'E-Waste Electronic Waste refers to', 'Network security encompasses measures to', 'A firewall is a network'] },
            { id: 's6', label: 'A file system manages data', prompt: 'Which idea is this? — A file system manages data as separate files on storage media, requiring application.', answer: 'A file system manages data', options: ['A file system manages data', 'E-Waste Electronic Waste refers to', 'Network security encompasses measures to', 'A firewall is a network'] }
          ] } }
    ],
    explore: { component: C12_ComputerScienceOperatingSystemInternalsSim, prompt: 'Explore the interactive — Operating System Internals' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_003', difficulty: 'standard',
          question: 'E-Waste (Electronic Waste) refers to discarded electrical or electronic devices.',
          hint: 'If stuck, revisit the **"Schedule I"** list in the E-Waste (Management) Rules, 2016.',
          misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'A student writes: "E-waste is any broken electronic device." Is this definition complete?', answer: 'No, the definition is incomplete',
                  options: ['No, the definition is incomplete', 'broken'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s wrong:** *Informal*.' },
                { id: 'b', prompt: 'Compare the environmental impact of **landfilling** vs **incineration** for the plastic fraction of e-waste (ABS, HIPS, PC).', answer: '**Incineration is worse** under typical Indian conditions',
                  options: ['**Incineration is worse** under typical Indian conditions', 'landfilling is worse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s wrong:** *Informal*.' }
          ],
            remediations: { 'misconception-recycling-e-waste-is': { steps: ['** Re-watch the 8-minute CPCB video "E-Waste Management in India" (search YouTube) — pause at each informal process.', '** Download **Form 1(a), Form 6, Form 7** from the CPCB website.', '** Take a **mock diagnostic**: "A bulk consumer generates 2 tonnes/year of ITEW1.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Compare the environmental impact of **landfilling** vs **incineration** for the plastic fraction of e-waste (ABS, HIPS, PC).', answer: '**Incineration is worse** under typical Indian conditions',
                  options: ['**Incineration is worse** under typical Indian conditions', 'landfilling is worse'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Recycling e-waste is always environmentally friendly — the more we recycle, the better." **Why it\'s wrong:** *Informal*.' }
          ],
            remediations: { 'misconception-recycling-e-waste-is': { steps: ['** Re-watch the 8-minute CPCB video "E-Waste Management in India" (search YouTube) — pause at each informal process.', '** Download **Form 1(a), Form 6, Form 7** from the CPCB website.', '** Take a **mock diagnostic**: "A bulk consumer generates 2 tonnes/year of ITEW1.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_010', difficulty: 'standard',
          question: 'Network security encompasses measures to protect network infrastructure and.',
          hint: 'If stuck, revisit c12_cs_cbse_01_006 (IP Address) and c12_cs_cbse_01_003 (Network.',
          misconception: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based.',
          parts: [
                { id: 'a', prompt: 'Explain why symmetric encryption alone is insufficient for secure key exchange over an untrusted network, and how asymmetric encryption solves this.', answer: 'Symmetric encryption requires both parties to already share a secret key',
                  options: ['Symmetric encryption requires both parties to already share a secret key', 'asymmetric is faster so we use it for everything', 'encrypts data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based on rules.' }
          ],
            remediations: { 'a-firewall-encrypts-data-or': { steps: ['Re-read NCERT Section 1.7 (Network Security) focusing on the firewall-encryption distinction table.', 'Draw a 3-column table: "Threat", "Firewall Role", "Encryption Role" with 5 rows (eavesdropping, unauthorized access,.', 'For each threat, write one sentence on what firewall does and what encryption does.', 'Attempt Diagnostic Questions 2 and 4 again — they directly test this separation.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Using a 256-bit AES key is always more secure than a 2048-bit RSA key because 256 > 2048." Provide a reasoned judgment.', answer: 'The claim is false',
                  options: ['The claim is false', 'true, bigger number = more secure', 'encrypts data', 'blocks hackers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based on rules.' },
                { id: 'b', prompt: 'Design a secure communication setup for a small business with 5 employees who need to: (a) access internal file server from home, (b) send digitally signed.', answer: 'access internal file server from home, (',
                  options: ['access internal file server from home, (', 'encrypts data', 'blocks hackers', 'a firewall "encrypts data" or that encryption "blocks hackers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based on rules.' }
          ],
            remediations: { 'a-firewall-encrypts-data-or': { steps: ['Re-read NCERT Section 1.7 (Network Security) focusing on the firewall-encryption distinction table.', 'Draw a 3-column table: "Threat", "Firewall Role", "Encryption Role" with 5 rows (eavesdropping, unauthorized access,.', 'For each threat, write one sentence on what firewall does and what encryption does.', 'Attempt Diagnostic Questions 2 and 4 again — they directly test this separation.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_005', difficulty: 'standard',
          question: 'A firewall is a network security system that monitors and controls incoming and.',
          hint: 'If stuck, re-read the "Malware" and "Eavesdropping and Man-in-the-Middle Attacks".',
          misconception: 'Students often believe a firewall "scans for viruses" and an antivirus "blocks hackers from the network." This.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A firewall is a network security system that monitors and controls incoming and outgoing',
                  options: ['A firewall is a network security system that monitors and controls incoming and outgoing', 'E-Waste (Electronic Waste) refers to discarded electrical or electronic devices such as', 'Network security encompasses measures to protect network infrastructure and data from', 'Boolean Algebra is a mathematical system for representing and manipulating logical'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe a firewall "scans for viruses" and an antivirus "blocks hackers from the network." This confusion arises because.' }
          ],
            remediations: { 'a-firewall-scans-for-viruses': { steps: ['If the student conflates firewall and antivirus functions, do this 3-step remediation: (1) Draw a two-column table on.', '(2) Populate using textbook definitions: Firewall = "monitors incoming/outgoing traffic based on rules", Antivirus =.', '(3) Re-attempt Diagnostic Questions 1 and 3 verbally, forcing the student to name the correct tool for each scenario.', 'If they still err, revisit node c12_cs_cbse_12_002 (Malware types) to reinforce *what* antivirus targets, and node.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe a firewall "scans for viruses" and an antivirus "blocks hackers from the network." This.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Installing both a network firewall and host-based antivirus on every computer provides complete security against all cyber threats.".', answer: 'The statement is false',
                  options: ['The statement is false', 'it is true because they cover network and endpoint', 'scans for viruses', 'blocks hackers from the network'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe a firewall "scans for viruses" and an antivirus "blocks hackers from the network." This confusion arises because.' },
                { id: 'b', prompt: 'Design a layered security strategy for a small business with 20 employees who handle customer payment data.', answer: 'firewall placement and two critical rules, (',
                  options: ['firewall placement and two critical rules, (', 'scans for viruses', 'blocks hackers from the network', 'security software'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe a firewall "scans for viruses" and an antivirus "blocks hackers from the network." This confusion arises because.' }
          ],
            remediations: { 'a-firewall-scans-for-viruses': { steps: ['If the student conflates firewall and antivirus functions, do this 3-step remediation: (1) Draw a two-column table on.', '(2) Populate using textbook definitions: Firewall = "monitors incoming/outgoing traffic based on rules", Antivirus =.', '(3) Re-attempt Diagnostic Questions 1 and 3 verbally, forcing the student to name the correct tool for each scenario.', 'If they still err, revisit node c12_cs_cbse_12_002 (Malware types) to reinforce *what* antivirus targets, and node.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_001', difficulty: 'standard',
          question: 'Boolean Algebra is a mathematical system for representing and manipulating.',
          hint: 'Revisit Class 11 Maths Chapter 14 (Mathematical Reasoning), specifically nodes.',
          misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why ordinary algebra (with variables like x, y that can be any real number) cannot directly model a decision like "If it is raining.', answer: 'Ordinary algebra deals with continuous numerical quantities and operations like',
                  options: ['Ordinary algebra deals with continuous numerical quantities and operations like', 'we can use 1 for rain and 2 for umbrella'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming A+A=2A.' },
                { id: 'b', prompt: 'A school library allows a student to borrow a reference book ONLY if (the student is in Class 12) OR (the student has a teacher\'s permission slip).', answer: 'Allowed = S + P (using + for OR)',
                  options: ['Allowed = S + P (using + for OR)', 'Allowed = S * P'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming A+A=2A.' },
                { id: 'c', prompt: 'Compare the Boolean expression A + B (OR) with the arithmetic expression a + b (addition) when A, B, a, b are all 1.', answer: 'In Boolean Algebra, 1 + 1 = 1 (TRUE OR TRUE = TRUE)',
                  options: ['In Boolean Algebra, 1 + 1 = 1 (TRUE OR TRUE = TRUE)', 'both give 2'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming A+A=2A.' }
          ],
            remediations: { 'students-often-treat-boolean-and': { steps: ['If a student shows this misconception: (1) Have them build a truth table for A+B with all four input pairs (0,0),.', '(2) Contrast with arithmetic: compute 1+1 on a calculator vs.', '(3) Revisit the definition: "Boolean values are truth states, not counts." (4) Assign a simple exercise: "Write the.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since Boolean Algebra only has 0 and 1, it\'s just a subset of arithmetic, so all arithmetic laws (like distributive a*(b+c)=a*b+a*c) must.', answer: 'The claim is partially correct but dangerously incomplete',
                  options: ['The claim is partially correct but dangerously incomplete', 'fully correct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat Boolean \'+\' and \'·\' exactly like arithmetic addition and multiplication, writing 1+1=2 or assuming A+A=2A.' }
          ],
            remediations: { 'students-often-treat-boolean-and': { steps: ['If a student shows this misconception: (1) Have them build a truth table for A+B with all four input pairs (0,0),.', '(2) Contrast with arithmetic: compute 1+1 on a calculator vs.', '(3) Revisit the definition: "Boolean values are truth states, not counts." (4) Assign a simple exercise: "Write the.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_010', difficulty: 'standard',
          question: 'Gender issues in technology access refer to the systemic disparities in.',
          hint: 'If stuck, revisit c12_cs_cbse_13_002\'s "Dimensions of Digital Divide" section and redo.',
          misconception: '**"Technology is gender-neutral; if women don\'t use it, it\'s their choice or lack of interest."** Students often write:.',
          parts: [
                { id: 'a', prompt: 'Compare how algorithmic bias in hiring platforms and gendered design in mobile money apps each reinforce technology access gaps for women.', answer: '**Hiring platforms**: Training data reflects historical male-dominated hiring →',
                  options: ['**Hiring platforms**: Training data reflects historical male-dominated hiring →', 'technical bugs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Technology is gender-neutral; if women don\'t use it, it\'s their choice or lack of interest."** Students often write: "Women in rural.' }
          ],
            remediations: { 'technology-is-gender-neutral': { steps: ['If a student exhibits this misconception: 1.', '**Show, don\'t tell**: Give them NFHS-5 state-wise tables — ask them to find states where women\'s phone ownership >80%.', 'Let them discover the gap.', '**Role-play**: "You are a 16-year-old girl in Bihar.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**"Technology is gender-neutral; if women don\'t use it, it\'s their choice or lack of interest."** Students often write:.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "If we just give every woman a smartphone, the gender digital divide will close." Evaluate using evidence from at least two Indian.', answer: 'The statement is false',
                  options: ['The statement is false', 'Kerala is already digital'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Technology is gender-neutral; if women don\'t use it, it\'s their choice or lack of interest."** Students often write: "Women in rural.' },
                { id: 'b', prompt: 'Compare how algorithmic bias in hiring platforms and gendered design in mobile money apps each reinforce technology access gaps for women.', answer: '**Hiring platforms**: Training data reflects historical male-dominated hiring →',
                  options: ['**Hiring platforms**: Training data reflects historical male-dominated hiring →', 'technical bugs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**"Technology is gender-neutral; if women don\'t use it, it\'s their choice or lack of interest."** Students often write: "Women in rural.' }
          ],
            remediations: { 'technology-is-gender-neutral': { steps: ['If a student exhibits this misconception: 1.', '**Show, don\'t tell**: Give them NFHS-5 state-wise tables — ask them to find states where women\'s phone ownership >80%.', 'Let them discover the gap.', '**Role-play**: "You are a 16-year-old girl in Bihar.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_002', difficulty: 'standard',
          question: 'A file system manages data as separate files on storage media, requiring.',
          hint: 'Revisit c12_cs_cbse_04_001 and write down the three-sentence definition of DBMS and its.',
          misconception: 'Students often think "DBMS is just a fancy file system with a GUI" and believe that because they can open an Excel file.',
          parts: [
                { id: 'a', prompt: 'State the full form of DBMS and name one key advantage it provides over a traditional file system.', answer: 'DBMS stands for Database Management System',
                  options: ['DBMS stands for Database Management System', 'DBMS is just a file manager', 'DBMS increases redundancy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "DBMS is just a fancy file system with a GUI" and believe that because they can open an Excel file and filter rows,.' }
          ],
            remediations: { 'dbms-is-just-a-fancy': { steps: ['Ask the student to list the exact steps they would take to update a student\'s address in two separate CSV files.', 'Have them simulate a power failure after the first file write and describe the resulting state.', 'Then show the same update in a DBMS with a transaction (BEGIN; UPDATE ...; UPDATE ...; COMMIT).', 'Ask: "What guarantees does the DBMS give that the file system does not?" This concrete comparison forces the student to.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "DBMS is just a fancy file system with a GUI" and believe that because they can open an Excel file.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "For a single-user application with a few hundred records, a file system is always better than a DBMS because it is simpler and faster.".', answer: 'Refute',
                  options: ['Refute', 'DBMS is just a fancy file system with a GUI', 'because they can open an Excel file and filter rows, they are using a database'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "DBMS is just a fancy file system with a GUI" and believe that because they can open an Excel file and filter rows,.' }
          ],
            remediations: { 'dbms-is-just-a-fancy': { steps: ['Ask the student to list the exact steps they would take to update a student\'s address in two separate CSV files.', 'Have them simulate a power failure after the first file write and describe the resulting state.', 'Then show the same update in a DBMS with a transaction (BEGIN; UPDATE ...; UPDATE ...; COMMIT).', 'Ask: "What guarantees does the DBMS give that the file system does not?" This concrete comparison forces the student to.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
