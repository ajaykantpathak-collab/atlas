import type { SimDef } from '../../engine/types';
import C12_ComputerScienceJavaProjectBankingSim from '../../../simulations/c6_12/C12_ComputerScienceJavaProjectBankingSim';

/** v3 wrapped master — C12_ComputerScienceJavaProjectBankingSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_computersciencejavaprojectbankingsim: SimDef = {
    id: 'v3w_c12_computersciencejavaprojectbankingsim',
    title: 'Java Project Banking',
    subtitle: 'This node covers the definitions, mechanisms, recognition techniques, and prevention.',
    classLevel: 12, subject: 'computer_science', topic: 'Phishing, Identity Theft and Cyberbullying',
    chapters: [],
    nodeIds: ['c12_cs_cbse_12_003', 'c12_cs_cbse_04_006', 'c12_cs_cbse_04_007', 'c12_cs_cbse_13_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you receive an SMS: "Your SBI account will be closed in 2 hours.', goal: 'Master Java Project Banking.' },
    discovery: {
        question: 'A student receives an email claiming to be from "CBSE Board" with sender address "cbse.results@gov.in.biz" and subject "URGENT: Your Class 12 Marksheet Error -.',
        options: ['Correct indicators: (1) Sender domain "gov.in.biz" is a subdomain of "biz"', 'the email has spelling mistakes', 'Dear Customer'],
        answer: 'Correct indicators: (1) Sender domain "gov.in.biz" is a subdomain of "biz"',
        hook: 'Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear Customer").',
    },
    teaching: [
        { title: 'Phishing is a cyber attack where attackers.', text: 'Phishing is a cyber attack where attackers impersonate legitimate entities via deceptive emails, messages, or websites to trick users into revealing sensitive information like passwords, OTPs, or.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_cs_cbse_12_003', title: 'Phishing is a cyber attack where.',
          scaffold: { problem: 'Riya receives an SMS: "Dear Parent, Your ward\'s Class 12 CBSE roll number 12345678 has been flagged for correction.',
            steps: [
            { text: 'Extract sender info — SMS from unknown 10-digit number, not official CBSE short code (e.g., 1600-xxxx).' },
            { text: 'Analyze the link domain — "vercel.app" is a free hosting platform for developers, not a government domain (.gov.in or.' },
            { text: 'Identify urgency trigger — "before 3 PM", "admit card will be blocked" creates artificial time pressure to bypass.' },
            { text: 'Check requested action — "update details" likely leads to a form asking for Aadhaar, PAN, DOB, school code — high-value.' },
            { text: 'Verify independently — Search "CBSE roll number correction official website" → leads to cbse.gov.in or.' },
            { text: 'Conclusion — This is a targeted spear phishing attack using student-specific data (roll number) and exam-season context.', faded: true, blankAnswer: 'Confirmed phishing attempt. Do not click. Report to school.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_04_006', title: 'Selection (σ) is a unary relational.',
          scaffold: { problem: 'Consider a relation Book(ISBN, Title, Author, Price, Year) with the following tuples:',
            steps: [
            { text: 'Identify the selection condition: Year = 2020 AND Price < 500.' },
            { text: 'Apply selection σ_{Year=2020 ∧ Price<500}(Book). This examines each tuple: (\'B1\', \'Python Basics\', \'Gupta\', 450, 2020).' },
            { text: 'Identify projection attributes: Title, Price.' },
            { text: 'Apply projection π_{Title, Price} on the selection result. The single tuple yields (\'Python Basics\', 450).' },
            { text: 'Since only one tuple, no duplicates to remove. Final result: {(\'Python Basics\', 450)}.', faded: true, blankAnswer: '{(\'Python Basics\', 450)}' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_04_007', title: 'In relational algebra, **Union (∪)**.',
          scaffold: { problem: 'A school maintains two relations: **CricketPlayers** (RollNo, Name, Class) and **FootballPlayers** (RollNo, Name, Class).',
            steps: [
            { text: 'Verify union compatibility — both relations have same degree (3) and corresponding attributes (RollNo:int, Name:string,.' },
            { text: 'Compute Union — combine all tuples from both relations, remove duplicates.' },
            { text: 'Compute Intersection — keep only tuples present in both relations.' },
            { text: 'Compute Cartesian Product — pair each tuple of CricketPlayers with each tuple of FootballPlayers.' },
            { text: 'Verify cardinalities: Union ≤ sum of cardinalities (4 ≤ 6), Intersection ≤ min cardinality (2 ≤ 3), Product = product.', faded: true, blankAnswer: '(a) Union: degree 3, cardinality 4, tuples as above. (b).' }
            ] } },
        { type: 'case', nodeId: 'c12_cs_cbse_13_001', title: 'Technology refers to the application of.',
          caseStudy: { intro: 'Imagine you are handed a smartphone in 2010 and another in 2024 — both are "technology", yet the 2024 device has reshaped how a farmer in Maharashtra checks.',
            decisions: [{ prompt: 'Define "technology" in the context of societal impact analysis.', options: [
                { text: 'Correct answer: Technology is the *application* of scientific knowledge through', outcome: 'Correct answer: Technology is the *application* of scientific knowledge through engineered.' },
                { text: 'gadgets', outcome: 'Not quite — Students conflate "technology impact" with "listing features of a gadget".', reveals: 'students-conflate-technology-impact-with' },
                { text: 'computers', outcome: 'Not quite — Students conflate "technology impact" with "listing features of a gadget".', reveals: 'students-conflate-technology-impact-with' }
            ] }] } }
    ],
    explore: { component: C12_ComputerScienceJavaProjectBankingSim, prompt: 'Explore the interactive — Java Project Banking' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_003', difficulty: 'standard',
          question: 'Phishing is a cyber attack where attackers impersonate legitimate entities via.',
          hint: 'If unable to parse URLs, revisit c12_cs_cbse_12_001\'s "HTTP vs HTTPS" and "Network.',
          misconception: 'Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear Customer").',
          parts: [
                { id: 'a', prompt: 'A student receives an email claiming to be from "CBSE Board" with sender address "cbse.results@gov.in.biz" and subject "URGENT: Your Class 12 Marksheet Error -.', answer: 'Correct indicators: (1) Sender domain "gov.in.biz" is a subdomain of "biz"',
                  options: ['Correct indicators: (1) Sender domain "gov.in.biz" is a subdomain of "biz"', 'the email has spelling mistakes', 'Dear Customer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear Customer").' },
                { id: 'b', prompt: 'Explain in your own words how a phishing attack can lead to identity theft, using the sequence: fake UPI payment request → user enters MPIN → attacker gains.', answer: 'Identity theft legally begins at the SIM swap step',
                  options: ['Identity theft legally begins at the SIM swap step', 'user enters MPIN', 'Dear Customer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear Customer").' },
                { id: 'c', prompt: 'A Class 12 student receives this WhatsApp message from an unknown number: "Hi, I\'m from your school\'s alumni association.', answer: 'SLAM evaluation: Sender',
                  options: ['SLAM evaluation: Sender', 'Dear Customer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear Customer").' }
          ],
            remediations: { 'phishing-only-happens-via-email': { steps: ['If a student cannot identify the domain spoofing in Diagnostic Q1, immediately revisit **c12_cs_cbse_12_001**.', 'Practice dissecting 10 real vs spoofed URLs (e.g., `sbi.co.in` vs `sbi.co.in.phishersite.com` vs `sbi-login.xyz`).', 'For identity theft confusion (Q2), use the "credential vs identity" flowchart: Phishing → steals *credentials* →.', 'For cyberbullying (Q4), have the student document a real-week log of online interactions — they\'ll see patterns.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear Customer").',
          parts: [
                { id: 'a', prompt: 'Your friend argues: "Cyberbullying isn\'t real bullying because you can just block the person or log off." Evaluate this claim using psychological and technical.', answer: 'The claim is invalid',
                  options: ['The claim is invalid', 'Dear Customer'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear Customer").' }
          ],
            remediations: { 'phishing-only-happens-via-email': { steps: ['If a student cannot identify the domain spoofing in Diagnostic Q1, immediately revisit **c12_cs_cbse_12_001**.', 'Practice dissecting 10 real vs spoofed URLs (e.g., `sbi.co.in` vs `sbi.co.in.phishersite.com` vs `sbi-login.xyz`).', 'For identity theft confusion (Q2), use the "credential vs identity" flowchart: Phishing → steals *credentials* →.', 'For cyberbullying (Q4), have the student document a real-week log of online interactions — they\'ll see patterns.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_006', difficulty: 'standard',
          question: 'Selection (σ) is a unary relational operation that returns a subset of tuples.',
          hint: 'If unsure about relation structure, revisit c12_cs_cbse_04_004 (Relational Data Model).',
          misconception: 'Students often think projection (π) only removes columns and forget that it also eliminates duplicate rows.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Selection (σ) is a unary relational operation that returns a subset of tuples (rows) from',
                  options: ['Selection (σ) is a unary relational operation that returns a subset of tuples (rows) from', 'Phishing is a cyber attack where attackers impersonate legitimate entities via deceptive', 'In relational algebra, **Union (∪)** combines tuples from two union-compatible relations', 'Technology refers to the application of scientific knowledge for practical purposes,'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think projection (π) only removes columns and forget that it also eliminates duplicate rows.' }
          ],
            remediations: { 'projection-only-removes-columns-and': { steps: ['Write the original relation.', 'Apply projection by listing only the chosen columns.', 'Explicitly strike out duplicate rows in the result.', 'Count remaining rows. Repeat with 3-4 examples until they automatically check for duplicates.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_007', difficulty: 'standard',
          question: 'In relational algebra, **Union (∪)** combines tuples from two union-compatible.',
          hint: 'If stuck, revisit Class 11 Mathematics nodes c11_math_cbse_01_009 (Union),.',
          misconception: 'Students often think that **Union and Intersection can be applied to any two relations as long as they have the same.',
          parts: [
                { id: 'a', prompt: 'What are the two necessary conditions for two relations to be union-compatible so that Union or Intersection can be applied?', answer: 'The two relations must have (1) the same number of attributes (degree) and (2)',
                  options: ['The two relations must have (1) the same number of attributes (degree) and (2)', 'same table name', 'same primary key'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that **Union and Intersection can be applied to any two relations as long as they have the same number of columns**,.' }
          ],
            remediations: { 'union-and-intersection-can-be': { steps: ['Revisit the definition of **domain** in the relational model (node c12_cs_cbse_04_004).', 'Review Class 11 Set Theory nodes c11_math_cbse_01_009 (Union) and c11_math_cbse_01_010 (Intersection) to reinforce that.', 'Practice with a concrete counterexample: Relation R(A:int, B:int) and S(A:int, B:char).', 'Attempt to compute R ∪ S manually and observe that tuples like (1, 2) and (1, \'X\') cannot coexist in a single relation.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that **Union and Intersection can be applied to any two relations as long as they have the same.',
          parts: [
                { id: 'a', prompt: 'A database designer claims: "Cartesian Product is useless in practice because it produces huge relations; we should never use it." Evaluate this statement.', answer: 'Partially true',
                  options: ['Partially true', 'entirely true'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that **Union and Intersection can be applied to any two relations as long as they have the same number of columns**,.' }
          ],
            remediations: { 'union-and-intersection-can-be': { steps: ['Revisit the definition of **domain** in the relational model (node c12_cs_cbse_04_004).', 'Review Class 11 Set Theory nodes c11_math_cbse_01_009 (Union) and c11_math_cbse_01_010 (Intersection) to reinforce that.', 'Practice with a concrete counterexample: Relation R(A:int, B:int) and S(A:int, B:char).', 'Attempt to compute R ∪ S manually and observe that tuples like (1, 2) and (1, \'X\') cannot coexist in a single relation.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_001', difficulty: 'standard',
          question: 'Technology refers to the application of scientific knowledge for practical.',
          hint: 'Revisit `c11_stat_cbse_02_007` (sampling methods) and `c11_stat_cbse_07_010` (correlation.',
          misconception: 'Students conflate "technology impact" with "listing features of a gadget".',
          parts: [
                { id: 'a', prompt: 'Define "technology" in the context of societal impact analysis. Your definition must distinguish it from "science" and "engineering" in one sentence.', answer: 'Correct answer: Technology is the *application* of scientific knowledge through',
                  options: ['Correct answer: Technology is the *application* of scientific knowledge through', 'gadgets', 'computers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "technology impact" with "listing features of a gadget".' },
                { id: 'b', prompt: 'Compare the *modular approach* and *top-down approach* for solving the UPI street-vendor project.', answer: 'Modular approach: breaks project into independent modules (survey, interview,',
                  options: ['Modular approach: breaks project into independent modules (survey, interview,', 'it sounds more organised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "technology impact" with "listing features of a gadget".' }
          ],
            remediations: { 'students-conflate-technology-impact-with': { steps: ['Re-read NCERT §13.1–13.3 and explicitly map each PBL step to the UPI vendor project (Diagnostic Q3).', 'Watch the 12-minute NPTEL video "Technology Assessment Frameworks" (search "NPTEL technology society impact matrix").', 'Re-attempt Diagnostic Q6 with a different technology (e.g., Aadhaar, Aarogya Setu) until you can populate all four.', 'If stuck on dual-impact reasoning, revisit Class 11 Statistics node `c11_stat_cbse_07_010` (Distinction Between.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_13_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students conflate "technology impact" with "listing features of a gadget".',
          parts: [
                { id: 'a', prompt: 'Compare the *modular approach* and *top-down approach* for solving the UPI street-vendor project.', answer: 'Modular approach: breaks project into independent modules (survey, interview,',
                  options: ['Modular approach: breaks project into independent modules (survey, interview,', 'it sounds more organised'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "technology impact" with "listing features of a gadget".' }
          ],
            remediations: { 'students-conflate-technology-impact-with': { steps: ['Re-read NCERT §13.1–13.3 and explicitly map each PBL step to the UPI vendor project (Diagnostic Q3).', 'Watch the 12-minute NPTEL video "Technology Assessment Frameworks" (search "NPTEL technology society impact matrix").', 'Re-attempt Diagnostic Q6 with a different technology (e.g., Aadhaar, Aarogya Setu) until you can populate all four.', 'If stuck on dual-impact reasoning, revisit Class 11 Statistics node `c11_stat_cbse_07_010` (Distinction Between.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
