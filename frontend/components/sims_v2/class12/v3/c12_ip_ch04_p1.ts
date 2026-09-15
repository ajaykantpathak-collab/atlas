import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch04_p1: SimDef = {
    id: 'v3_c12_ip_ch04_p1',
    title: 'Societal Impacts · Part 1/2',
    subtitle: 'She never posted — and the internet still knows',
    classLevel: 12, subject: 'informatics_practices', topic: 'Societal Impacts · Part 1/2',
    chapters: ['c12_ip_ch04'],
    nodeIds: ['c12_ip_cbse_04_001', 'c12_ip_cbse_04_002', 'c12_ip_cbse_04_003', 'c12_ip_cbse_04_004', 'c12_ip_cbse_04_005', 'c12_ip_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Privacy auditor', intro: 'Footprints on wet sand wash away; digital ones get copied, sold and aggregated. Learn to see your own trail.', goal: 'Distinguish active from passive digital footprints — and why deletion never fully erases them.' },
    discovery: {
        question: 'A student who posts nothing insists she has no digital footprint — yet phone ads for a product she searched once follow her for weeks. What is she missing?',
        options: ['Passive traces — ISP logs, cookies, device fingerprints and metadata record her without a single post; the footprint isn\'t what you publish, it\'s what the network keeps', 'Incognito deletes it', 'No posts, no data', 'Ads are coincidence'],
        answer: 'Passive traces — ISP logs, cookies, device fingerprints and metadata record her without a single post; the footprint isn\'t what you publish, it\'s what the network keeps',
        hook: 'Deleting an account doesn\'t erase the trail — brokers already scraped it into shadow profiles, and platforms retain logs and \'anonymised\' analytics beyond the delete button. One UPI order leaves active data you typed and passive data you never saw — the payment record outlives the GPS ping by years.',
    },
    teaching: [
        { title: 'Digital footprint: definition and how it is created', text: 'A digital footprint is the trail of data — both intentional and unintentional — that a user leaves behind while using the internet, including social media posts, browsing history, online.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Audit a single online order: separate active footprints from passive ones, rank which records persist longest, and design an audit checklist for the footprints you forgot you made.',
        labels: ['Digital footprint: definition', 'Intellectual property rights: copyright,', 'Plagiarism: definition, types,', 'Open source software', 'Cybercrime: definition and common', 'Identity theft and phishing'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_001', title: 'Digital footprint: definition and how it is created',
          caseStudy: { intro: 'Begin by asking: "When you search for \'best smartphones under ₹20,000\' on Google, then see phone ads on Instagram, YouTube, and news sites for the next two.',
            decisions: [{ prompt: 'Define "digital footprint" in one sentence using the exact terminology from the NCERT Class 12 Informatics Practices textbook.', options: [
                { text: 'A digital footprint is the trail of data created by a user\'s online activities, including', outcome: 'A digital footprint is the trail of data created by a user\'s online activities, including both.' },
                { text: 'social media posts', outcome: 'Not quite — Students believe "digital footprint = what I post on Instagram/Facebook." They equate it solely.', reveals: 'digital-footprint-what-i-post' },
                { text: 'digital footprint = what I post on Instagram/Facebook', outcome: 'Not quite — Students believe "digital footprint = what I post on Instagram/Facebook." They equate it solely.', reveals: 'digital-footprint-what-i-post' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_002', title: 'Intellectual property rights: copyright, patent, trademark',
          caseStudy: { intro: 'Imagine you have developed a mobile game called "Mumbai Metro Dash" — you wrote the code, designed a unique path-finding algorithm, and created a catchy logo.',
            decisions: [{ prompt: 'What is the fundamental difference in *what* copyright and patent protect? Give one example of subject matter for each.', options: [
                { text: 'Copyright protects original *expression* of ideas (e.g., software code, novel, song)', outcome: 'Copyright protects original *expression* of ideas (e.g., software code, novel, song) — not the idea.' },
                { text: 'both protect ideas', outcome: 'Not quite — **Misconception**: "Copyright protects the *logic/algorithm* of my program because it\'s part of the.', reveals: 'misconception-copyright-protects-the-logic' },
                { text: 'copyright protects algorithms', outcome: 'Not quite — **Misconception**: "Copyright protects the *logic/algorithm* of my program because it\'s part of the.', reveals: 'misconception-copyright-protects-the-logic' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_003', title: 'Plagiarism: definition, types, and how to avoid it',
          caseStudy: { intro: 'Imagine you\'re writing your Class 12 IP project report and you find a perfect Python function on GitHub that solves your problem — do you copy it?',
            decisions: [{ prompt: 'Define plagiarism in your own words and list the four main types recognised in academic and professional contexts.', options: [
                { text: 'Plagiarism is presenting another\'s work, ideas, or expressions as one\'s own without', outcome: 'Plagiarism is presenting another\'s work, ideas, or expressions as one\'s own without proper.' },
                { text: 'copy-paste', outcome: 'Not quite — Students believe "paraphrasing means changing a few words" and that "if I rewrite it in my own.', reveals: 'paraphrasing-means-changing-a-few' },
                { text: 'paraphrasing means changing a few words', outcome: 'Not quite — Students believe "paraphrasing means changing a few words" and that "if I rewrite it in my own.', reveals: 'paraphrasing-means-changing-a-few' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_004', title: 'Open source software and creative commons licensing',
          caseStudy: { intro: 'Imagine you\'ve written a Python library for data cleaning and want to share it on GitHub so others can use and improve it.',
            decisions: [{ prompt: 'What are the four essential freedoms that define free and open source software according to the Free Software Foundation?', options: [
                { text: 'The four freedoms are: (0) Freedom to run the program for any purpose', outcome: 'The four freedoms are: (0) Freedom to run the program for any purpose; (1) Freedom to study and.' },
                { text: 'free of cost', outcome: 'Not quite — Students often think "open source" means "free of charge" or "public domain." They also confuse.', reveals: 'open-source-means-free-of' },
                { text: 'open source means public domain', outcome: 'Not quite — Students often think "open source" means "free of charge" or "public domain." They also confuse.', reveals: 'open-source-means-free-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_005', title: 'Cybercrime: definition and common categories',
          caseStudy: { intro: 'Imagine you receive a WhatsApp message claiming your bank KYC has expired and asking you to click a link to update details — this is a classic phishing.',
            decisions: [{ prompt: 'Define cybercrime in one sentence using the "tool, target, or both" framework. Give one example for each case.', options: [
                { text: 'Cybercrime is any illegal act where a computer/network is used as a tool (e.g., sending', outcome: 'Cybercrime is any illegal act where a computer/network is used as a tool (e.g., sending phishing.' },
                { text: 'crime using computers', outcome: 'Not quite — Students believe "hacking" is a synonym for all cybercrime — they write "the hacker stole.', reveals: 'hacking-is-a-synonym-for' },
                { text: 'hacking', outcome: 'Not quite — Students believe "hacking" is a synonym for all cybercrime — they write "the hacker stole.', reveals: 'hacking-is-a-synonym-for' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_006', title: 'Identity theft and phishing attacks',
          caseStudy: { intro: 'Imagine you receive an SMS: "Dear customer, your SBI account will be closed in 2 hours. Update KYC immediately: http://sbi-kyc-update.in".',
            decisions: [{ prompt: 'A student receives an email claiming to be from "Amazon India" with sender address "support@amazon-india-services.xyz" and a link.', options: [
                { text: 'Correct indicators: (1) Sender domain "amazon-india-services.xyz" does not match Amazon\'s', outcome: 'Correct indicators: (1) Sender domain "amazon-india-services.xyz" does not match Amazon\'s official.' },
                { text: 'the email has spelling mistakes', outcome: 'Not quite — **Misconception:** "Phishing only happens via email, and you can spot it easily by bad.', reveals: 'misconception-phishing-only-happens-via' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_001', title: 'A real-world call',
          caseStudy: { intro: 'A company can cut costs by automating — or keep jobs it doesn\'t strictly need. Shareholders want efficiency; the town needs the jobs.',
            decisions: [{ prompt: 'Does a company owe its workers more than the market requires?', options: [
                { text: 'No — efficiency is what lets companies survive', outcome: 'The market argument — a company that keeps unnecessary jobs may fail entirely, losing all of them.' },
                { text: 'Yes — a company is also a community member', outcome: 'The stakeholder argument — businesses that benefit from a town owe it something beyond the legal minimum.' },
                { text: 'It owes transition, not stasis', outcome: 'The modern answer — automate, but fund retraining; the job may not be saved, the worker should be.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a hackathon, a rival team lifts your app\'s source code, ports your matching algorithm and launches with a look-alike name and logo — shrugging, \'you never registered anything.\'',
            decisions: [{ prompt: 'Which IPR answers which violation?', options: [
                { text: 'Code is copyright — automatic on creation, no registration needed, so the shrug is wrong there; the algorithm would need a granted patent, which you can\'t claim retroactively; and the name/logo needs a registered trademark to force statutory enforcement.', outcome: 'The chapter\'s three-way map: expression (copyright, automatic), invention (patent, must register), identity (trademark, must register) — \'never registered\' only disarms the two that needed filing.' },
                { text: 'They\'re fully right — unregistered means unprotected, so all three are fair game.', outcome: 'Only patent and trademark depend on registration; copyright attaches the moment the code was written, so \'you never registered\' is no defence for copying it.', reveals: 'no-registration-no-rights' },
                { text: 'Copyright covers all three — code, algorithm and logo are all your \'creative work.\'', outcome: 'Copyright guards expression, not function or identity: the algorithm\'s working method isn\'t protected by the code\'s text, and a brand name is trademark territory — one right can\'t stretch across all three violations.', reveals: 'copyright-covers-everything' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now see the internet\'s other ledger — the one recording you whether or not you ever post.',
            decisions: [{ prompt: 'What comes next? Societal Impacts · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Societal Impacts · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_001', difficulty: 'standard',
          question: 'A digital footprint is the trail of data — both intentional and unintentional.',
          hint: 'Revisit c11_ip_cbse_08_011 "Data Protection, Privacy and Digital Footprint".',
          misconception: 'Students believe "digital footprint = what I post on Instagram/Facebook." They equate it solely with *active*.',
          parts: [
                { id: 'a', prompt: 'A student says: "I don\'t post anything on social media, so I have no digital footprint." Explain why this statement is incorrect, giving two specific examples.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'incognito mode prevents all tracking', 'digital footprint = what I post on Instagram/Facebook', '"digital footprint = what I post on Instagram/Facebook'],
                  hint: 'Revisit c11_ip_cbse_08_011 "Data Protection, Privacy and Digital Footprint" — specifically the.',
                  misconception: 'Students believe "digital footprint = what I post on Instagram/Facebook." They equate it solely with *active*, *visible*, *user-generated*.' },
                { id: 'b', prompt: 'Compare the digital footprint of a Class 12 student who uses a school-issued Chromebook (managed by IT admin) versus their personal smartphone.', answer: '(1) Visibility: School Chromebook',
                  options: ['(1) Visibility: School Chromebook', 'both are equally private', 'digital footprint = what I post on Instagram/Facebook', 'claims "both are equally private" fails to analyse institutional vs'],
                  hint: 'Revisit c11_ip_cbse_08_011 "Data Protection, Privacy and Digital Footprint" — specifically the.',
                  misconception: 'Students believe "digital footprint = what I post on Instagram/Facebook." They equate it solely with *active*, *visible*, *user-generated*.' }
          ],
            remediations: { 'digital-footprint-what-i-post': { steps: ['Have the student open their browser\'s Developer Tools (F12) → Application → Cookies → observe 50+ entries from sites.', 'Visit amiunique.org/fp — show their browser fingerprint is 1 in 200,000+ unique.', 'Assign a 15-minute "Passive Footprint Hunt": list 10 passive traces from their last hour online (e.g., YouTube autoplay.', 'Re-attempt Diagnostic Question 2 — if they still miss passive traces, revisit c11_ip_cbse_08_011 (Data Protection.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "digital footprint = what I post on Instagram/Facebook." They equate it solely with *active*.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Deleting your social media account erases your digital footprint." Provide a reasoned judgment with two technical reasons why remnants.', answer: 'The claim is false',
                  options: ['The claim is false', 'GDPR gives right to be forgotten, so it\'s erased', 'digital footprint = what I post on Instagram/Facebook', '"digital footprint = what I post on Instagram/Facebook'],
                  hint: 'Revisit c11_ip_cbse_08_011 "Data Protection, Privacy and Digital Footprint" — specifically the.',
                  misconception: 'Students believe "digital footprint = what I post on Instagram/Facebook." They equate it solely with *active*, *visible*, *user-generated*.' },
                { id: 'b', prompt: 'Design a "Digital Footprint Audit Checklist" for a Class 12 student preparing for college admissions.', answer: 'A strong checklist includes: (1) Search your name + "site:linkedin.com" /',
                  options: ['A strong checklist includes: (1) Search your name + "site:linkedin.com" /', 'digital footprint = what I post on Instagram/Facebook', '"digital footprint = what I post on Instagram/Facebook'],
                  hint: 'Revisit c11_ip_cbse_08_011 "Data Protection, Privacy and Digital Footprint" — specifically the.',
                  misconception: 'Students believe "digital footprint = what I post on Instagram/Facebook." They equate it solely with *active*, *visible*, *user-generated*.' }
          ],
            remediations: { 'digital-footprint-what-i-post': { steps: ['Have the student open their browser\'s Developer Tools (F12) → Application → Cookies → observe 50+ entries from sites.', 'Visit amiunique.org/fp — show their browser fingerprint is 1 in 200,000+ unique.', 'Assign a 15-minute "Passive Footprint Hunt": list 10 passive traces from their last hour online (e.g., YouTube autoplay.', 'Re-attempt Diagnostic Question 2 — if they still miss passive traces, revisit c11_ip_cbse_08_011 (Data Protection.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_002', difficulty: 'standard',
          question: 'Intellectual Property Rights (IPR) are legal rights granted to creators and.',
          hint: 'If confused between copyright/patent/trademark, revisit the **comparison table** in Class.',
          misconception: '**Misconception**: "Copyright protects the *logic/algorithm* of my program because it\'s part of the code." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Intellectual Property Rights (IPR) are legal rights granted to creators and inventors to',
                  options: ['Intellectual Property Rights (IPR) are legal rights granted to creators and inventors to', 'A digital footprint is the trail of data', 'Plagiarism is the act of using someone else\'s work, ideas, expressions, or intellectual', 'Open source software (OSS) is software whose source code is made freely available for'],
                  hint: 'If confused between copyright/patent/trademark, revisit the **comparison table** in Class 11 node.',
                  misconception: '**Misconception**: "Copyright protects the *logic/algorithm* of my program because it\'s part of the code." **Why it\'s wrong**: Copyright.' }
          ],
            remediations: { 'misconception-copyright-protects-the-logic': { steps: ['**Revisit Class 11 node `c11_ip_cbse_08_012` (Intellectual Property Rights, Copyright and Plagiarism)** — re-read the.', '**Create a 3-column flashcard**: Column 1 = Subject matter (Code / Algorithm / Logo), Column 2 = IPR Type (Copyright.', 'Memorise by covering columns.', '**Practice the "Riya/SmartStock" scenario (Diagnostic Q6)** — write the answer *from memory* in 3 minutes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_003', difficulty: 'standard',
          question: 'Plagiarism is the act of using someone else\'s work, ideas, expressions,.',
          hint: 'If unclear on the difference between copyright infringement and plagiarism, revisit.',
          misconception: 'Students believe "paraphrasing means changing a few words" and that "if I rewrite it in my own words, I don\'t need.',
          parts: [
                { id: 'a', prompt: 'A student writes in their IP project report: "Python\'s list comprehension provides a concise way to create lists." They do not cite any source.', answer: 'No, this is not plagiarism',
                  options: ['No, this is not plagiarism', 'paraphrasing means changing a few words', 'if I rewrite it in my own words, I don\'t need to cite'],
                  hint: 'If unclear on the difference between copyright infringement and plagiarism, revisit.',
                  misconception: 'Students believe "paraphrasing means changing a few words" and that "if I rewrite it in my own words, I don\'t need to cite." This is the.' }
          ],
            remediations: { 'paraphrasing-means-changing-a-few': { steps: ['Revisit c11_ip_cbse_08_012 (Class 11 IP: Intellectual Property Rights, Copyright and Plagiarism) — specifically the.', 'Take a 200-word technical passage (e.g., from NCERT IP textbook), deliberately create one example of each plagiarism.', 'Use the re-diagnostic: "Given this corrected version, identify which citation element (author, year, title, URL) would.', 'If unable to answer, practice IEEE citation for 5 source types: website, GitHub repo, research paper, textbook, YouTube.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_004', difficulty: 'standard',
          question: 'Open source software (OSS) is software whose source code is made freely.',
          hint: 'Revisit c11_ip_cbse_08_012 (Intellectual Property Rights, Copyright and Plagiarism) and.',
          misconception: 'Students often think "open source" means "free of charge" or "public domain." They also confuse Creative Commons.',
          parts: [
                { id: 'a', prompt: 'What are the four essential freedoms that define free and open source software according to the Free Software Foundation?', answer: 'The four freedoms are: (0) Freedom to run the program for any purpose',
                  options: ['The four freedoms are: (0) Freedom to run the program for any purpose', 'free of cost', 'open source means public domain', 'open source'],
                  hint: 'Revisit c11_ip_cbse_08_012 (Intellectual Property Rights, Copyright and Plagiarism) and.',
                  misconception: 'Students often think "open source" means "free of charge" or "public domain." They also confuse Creative Commons licenses with software.' },
                { id: 'b', prompt: 'A student wants to share a dataset on Kaggle and allow others to use it commercially, modify it, and share their modifications, but only if they give credit.', answer: 'CC BY-SA (Attribution-ShareAlike)',
                  options: ['CC BY-SA (Attribution-ShareAlike)', 'open source', 'free of charge', 'public domain'],
                  hint: 'Revisit c11_ip_cbse_08_012 (Intellectual Property Rights, Copyright and Plagiarism) and.',
                  misconception: 'Students often think "open source" means "free of charge" or "public domain." They also confuse Creative Commons licenses with software.' }
          ],
            remediations: { 'open-source-means-free-of': { steps: ['If the student conflates open source with free of cost, have them read the OSI definition and FSF four freedoms, then.', 'If they misuse CC for code, show the Creative Commons FAQ stating "CC licenses should not be used for software" and.', 'If they can\'t distinguish copyleft, have them trace what happens when a GPL library is linked into a proprietary.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_005', difficulty: 'standard',
          question: 'Cybercrime refers to any illegal activity that uses a computer, computer.',
          hint: 'If stuck, revisit c11_ip_cbse_08_008 (malware taxonomy) and c11_ip_cbse_08_009 (phishing.',
          misconception: 'Students believe "hacking" is a synonym for all cybercrime — they write "the hacker stole my identity" or "the hacker.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Cybercrime and cyber attack mean the same thing." Is this correct? Explain why or why not using the concepts of intent and legality.', answer: 'Incorrect',
                  options: ['Incorrect', 'hacking', 'the hacker stole my identity', 'the hacker sent a phishing email'],
                  hint: 'If stuck, revisit c11_ip_cbse_08_008 (malware taxonomy) and c11_ip_cbse_08_009 (phishing.',
                  misconception: 'Students believe "hacking" is a synonym for all cybercrime — they write "the hacker stole my identity" or "the hacker sent a phishing.' },
                { id: 'b', prompt: 'Classify each scenario into the correct cybercrime category: (a) An attacker floods an e-commerce site with traffic so legitimate customers cannot access.', answer: '(a) DoS/DDoS attack',
                  options: ['(a) DoS/DDoS attack', 'hacking', 'the hacker stole my identity', 'the hacker sent a phishing email'],
                  hint: 'If stuck, revisit c11_ip_cbse_08_008 (malware taxonomy) and c11_ip_cbse_08_009 (phishing.',
                  misconception: 'Students believe "hacking" is a synonym for all cybercrime — they write "the hacker stole my identity" or "the hacker sent a phishing.' }
          ],
            remediations: { 'hacking-is-a-synonym-for': { steps: ['Revisit c11_ip_cbse_08_008 (Malware types) and c11_ip_cbse_08_009 (Phishing/Identity Theft) — create a two-column.', 'For each of the 6 categories in this node, write one Indian news headline (e.g., "AIIMS Delhi ransomware attack 2023.', 'Take the Diagnostic Question 3 again — if any classification is wrong, re-read the IT Act section definitions from the.', 'Practice writing the legal section number next to each category until recall is automatic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_04_006', difficulty: 'standard',
          question: 'Identity theft is the deliberate unauthorized acquisition and misuse of.',
          hint: 'If unclear on PII categories, revisit Class 11 node c11_ip_cbse_08_011 (Data Protection.',
          misconception: '**Misconception:** "Phishing only happens via email, and you can spot it easily by bad grammar/spelling.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast "pharming" and "phishing" in terms of (a) user interaction required, (b) technical mechanism, (c) detectability by an average user.', answer: 'user interaction required, (',
                  options: ['user interaction required, (', 'phishing is worse'],
                  hint: 'If unclear on PII categories, revisit Class 11 node c11_ip_cbse_08_011 (Data Protection, Privacy.',
                  misconception: '**Misconception:** "Phishing only happens via email, and you can spot it easily by bad grammar/spelling.' }
          ],
            remediations: { 'misconception-phishing-only-happens-via': { steps: ['**Revisit Class 11 Cyber Safety nodes**: c11_ip_cbse_08_009 (Phishing, Identity Theft and Cyberbullying) and.', '**Hands-on drill**: Use the "Phishing Quiz" at `phishingquiz.withgoogle.com` (or Indian equivalent `cybercrime.gov.in`.', '**Analyze a real Indian phishing sample**: Search "SBI phishing email 2024" or "UPI mandate fraud screenshot" — dissect.', '**Re-diagnostic**: Retake Diagnostic Questions 1, 3, and 4 — if any error persists, repeat step 2 with focus on that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
