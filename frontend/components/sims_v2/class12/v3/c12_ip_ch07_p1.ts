import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch07_p1: SimDef = {
    id: 'v3_c12_ip_ch07_p1',
    title: 'Cyber Safety · Part 1/2',
    subtitle: 'No money, no secrets — still a target',
    classLevel: 12, subject: 'informatics_practices', topic: 'Cyber Safety · Part 1/2',
    chapters: ['c12_ip_ch07'],
    nodeIds: ['c12_ip_cbse_07_001', 'c12_ip_cbse_07_002', 'c12_ip_cbse_07_003', 'c12_ip_cbse_07_004', 'c12_ip_cbse_07_005', 'c12_ip_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cyber-safety analyst', intro: 'A WhatsApp \'KYC expired\' link is the exam question you answer in real life. Learn the framework before you click.', goal: 'Adopt cyber safety as personal defence — risk categories, verification discipline and individual countermeasures.' },
    discovery: {
        question: '\'I have no money and post nothing secret — cyber safety isn\'t for me.\' What three threats does this teenager still carry?',
        options: ['Identity theft on her Aadhaar, a phone turned botnet, and private data harvested for sextortion — none need a bank balance', 'Only money matters', 'Antivirus covers it', 'Teens aren\'t targets'],
        answer: 'Identity theft on her Aadhaar, a phone turned botnet, and private data harvested for sextortion — none need a bank balance',
        hook: '\'Scan the attachment with antivirus first\' is already too late — verify the sender domain, distrust urgency, cross-check on the official site. And café Wi-Fi versus weak home Wi-Fi aren\'t equal threats: sniffing thrives on public networks, but liability lands on the home subscriber.',
    },
    teaching: [
        { title: 'Cyber safety: definition and importance for individuals', text: 'Cyber safety refers to the practice of protecting oneself and one\'s digital assets — including personal data, devices, online accounts, and digital identity — from unauthorized access, theft, damage.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the decision framework on a fake CBSE admit-card email: verify domain, refuse urgency, never open the attachment — then weigh which individual moves defeat even sophisticated attacks.',
        labels: ['Cyber safety: definition', 'Strong passwords: characteristics', 'Malware types: virus, worm,', 'Antivirus and firewall: protection', 'Phishing and social engineering', 'Two-factor authentication and secure'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_001', title: 'Cyber safety: definition and importance for individuals',
          caseStudy: { intro: 'Imagine you receive a WhatsApp message claiming your bank KYC has expired and asking you to click a link to update it — the link looks almost identical to your.',
            decisions: [{ prompt: 'Define cyber safety in one sentence focusing on the individual perspective, and name two distinct categories of personal digital assets.', options: [
                { text: 'Cyber safety is the practice of protecting an individual\'s digital identity, data,', outcome: 'Cyber safety is the practice of protecting an individual\'s digital identity, data, devices, and.' },
                { text: 'computers', outcome: 'Not quite — Students believe "cyber safety = installing antivirus + not clicking unknown links." This.', reveals: 'cyber-safety-installing-antivirus-not' },
                { text: 'viruses', outcome: 'Not quite — Students believe "cyber safety = installing antivirus + not clicking unknown links." This.', reveals: 'cyber-safety-installing-antivirus-not' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_07_002', title: 'Strong passwords: characteristics and creation strategies',
          scaffold: { problem: '** A student uses a password generator that picks 12 characters uniformly from 94 printable ASCII characters (excluding space).',
            steps: [
            { text: 'Identify L = 12, N = 94.' },
            { text: 'Compute entropy H = 12 × log₂(94). log₂(94) = ln(94)/ln(2) ≈ 4.5436 / 0.6931 ≈ 6.554.' },
            { text: 'H ≈ 12 × 6.554 = 78.65 bits.' },
            { text: 'Total possibilities = 2ᴴ ≈ 2⁷⁸.⁶⁵ ≈ 3.8 × 10²³.' },
            { text: 'Time = (3.8 × 10²³) / (10¹¹ guesses/sec) = 3.8 × 10¹² seconds ≈ 120,000 years.', faded: true, blankAnswer: '** 78.7 bits; ~120,000 years at 100 GH/s (unsalted fast.' }
            ] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_003', title: 'Malware types: virus, worm, trojan, ransomware, spyware',
          caseStudy: { intro: 'Imagine you receive an email with an attachment named "Invoice_GST.pdf.exe".',
            decisions: [{ prompt: 'Define a computer virus and state the one essential characteristic that distinguishes it from a worm.', options: [
                { text: 'A computer virus is a malicious code that attaches itself to a legitimate host program or', outcome: 'A computer virus is a malicious code that attaches itself to a legitimate host program or file and.' },
                { text: 'trojan', outcome: 'Not quite — Students often believe **"trojan" and "virus" are interchangeable terms for any malware**, or that.', reveals: 'trojan-and-virus-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_004', title: 'Antivirus and firewall: protection mechanisms',
          caseStudy: { intro: 'Imagine you receive an email with an attachment named "Invoice_GST.pdf.exe" — your antivirus immediately flags it, but why?',
            decisions: [{ prompt: 'What is the primary difference between signature-based detection and heuristic/behavioral analysis in antivirus software?', options: [
                { text: 'Signature-based detection compares file code against a database of known malware', outcome: 'Signature-based detection compares file code against a database of known malware fingerprints.' },
                { text: 'both use signatures', outcome: 'Not quite — Students often believe "antivirus protects against hackers" and "firewall protects against.', reveals: 'antivirus-protects-against-hackers-and' },
                { text: 'antivirus protects against hackers', outcome: 'Not quite — Students often believe "antivirus protects against hackers" and "firewall protects against.', reveals: 'antivirus-protects-against-hackers-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_005', title: 'Phishing and social engineering attacks: recognition and prevention',
          caseStudy: { intro: 'Imagine you receive an SMS: "Your SBI account will be closed in 2 hours. Update KYC now: http://sbi-kyc-update.in".',
            decisions: [{ prompt: 'What is the defining characteristic that distinguishes phishing from other malware attacks like viruses or ransomware?', options: [
                { text: 'Phishing is a social engineering attack that deceives the user into voluntarily', outcome: 'Phishing is a social engineering attack that deceives the user into voluntarily surrendering.' },
                { text: 'phishing installs malware', outcome: 'Not quite — Students believe phishing emails are always poorly written with obvious spelling errors and generic.', reveals: 'phishing-emails-are-always-poorly' },
                { text: 'Dear Customer', outcome: 'Not quite — Students believe phishing emails are always poorly written with obvious spelling errors and generic.', reveals: 'phishing-emails-are-always-poorly' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_006', title: 'Two-factor authentication and secure login practices',
          caseStudy: { intro: 'Imagine you get a notification: "New login to your Gmail from Mumbai" — but you\'re in Delhi. Your password was strong, yet someone accessed your account. How?',
            decisions: [{ prompt: 'Define two-factor authentication and name the three categories of authentication factors with one example each.', options: [
                { text: 'Two-factor authentication requires presenting two factors from different categories: (1)', outcome: 'Two-factor authentication requires presenting two factors from different categories: (1) Knowledge.' },
                { text: 'password and security question', outcome: 'Not quite — Students believe "2FA means entering an OTP sent to my phone" and that this single method.', reveals: '2fa-means-entering-an-otp' },
                { text: 'something you know', outcome: 'Not quite — Students believe "2FA means entering an OTP sent to my phone" and that this single method.', reveals: '2fa-means-entering-an-otp' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A cousin brags his banking password \'Tr0ub4dor&3\' is uncrackable because \'it has every character type — upper, lower, digit, symbol.\'',
            decisions: [{ prompt: 'What does password entropy say?', options: [
                { text: 'It\'s ~28 bits of pattern, not strength — leetspeak on one dictionary word is in every attacker\'s ruleset; character variety adds far less than length, so a long random passphrase like four random words beats his decorated word while being easier to remember.', outcome: 'The chapter\'s formula is about the randomness of the process, not the look of the output — predictable substitutions earn almost nothing once the method is in the cracker\'s dictionary.' },
                { text: 'He\'s right — all four character classes means the full 95-character search space.', outcome: 'The search space belongs to the generation process, not the string: his word-plus-substitutions is a pattern attacker\'s tools try early, so the real space is the handful of leetspeak variants, not 95^11.', reveals: 'charset-equals-space' },
                { text: 'It\'s weak only because it\'s short — the same pattern at 16 characters is strong.', outcome: 'Length on a deterministic pattern adds little entropy — two decorated dictionary words still sit inside the pattern space; entropy counts unpredictable choices, and a longer costume on the same word changes almost none.', reveals: 'length-fixes-patterns' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now treat cyber safety as a daily decision framework — where 2FA, zero-trust verification and offline backups beat learned helplessness.',
            decisions: [{ prompt: 'What comes next? Cyber Safety · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Cyber Safety · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_001', difficulty: 'standard',
          question: 'Cyber safety refers to the practice of protecting oneself and one\'s digital.',
          hint: 'Revisit c11_ip_cbse_08_008 (malware classification) and c11_ip_cbse_08_009 (phishing.',
          misconception: 'Students believe "cyber safety = installing antivirus + not clicking unknown links." This is dangerously incomplete.',
          parts: [
                { id: 'a', prompt: 'A Class 12 student says: "I don\'t need cyber safety because I don\'t have money in my bank account and I don\'t post anything secret." Explain why this reasoning.', answer: 'The reasoning is flawed',
                  options: ['The reasoning is flawed', 'cyber safety = installing antivirus + not clicking unknown links', 'I am safe because I have Quick Heal and don\'t open spam emails', '"cyber safety = installing antivirus + not clicking unknown links'],
                  hint: 'Revisit c11_ip_cbse_08_008 (malware classification) and c11_ip_cbse_08_009 (phishing vs identity.',
                  misconception: 'Students believe "cyber safety = installing antivirus + not clicking unknown links." This is dangerously incomplete because: (1) Modern.' },
                { id: 'b', prompt: 'You receive an email claiming to be from CBSE with subject "Urgent: Class 12 Admit Card Correction Required" — it asks you to download an attached PDF and fill.', answer: 'Step 1: Verify sender',
                  options: ['Step 1: Verify sender', 'scan with antivirus then open', 'cyber safety = installing antivirus + not clicking unknown links', 'I am safe because I have Quick Heal and don\'t open spam emails'],
                  hint: 'Revisit c11_ip_cbse_08_008 (malware classification) and c11_ip_cbse_08_009 (phishing vs identity.',
                  misconception: 'Students believe "cyber safety = installing antivirus + not clicking unknown links." This is dangerously incomplete because: (1) Modern.' },
                { id: 'c', prompt: 'Compare the cyber safety risks for an individual using public Wi-Fi at a café versus home Wi-Fi with a weak password.', answer: 'credential sniffing, (',
                  options: ['credential sniffing, (', 'cyber safety = installing antivirus + not clicking unknown links', 'I am safe because I have Quick Heal and don\'t open spam emails', '"cyber safety = installing antivirus + not clicking unknown links'],
                  hint: 'Revisit c11_ip_cbse_08_008 (malware classification) and c11_ip_cbse_08_009 (phishing vs identity.',
                  misconception: 'Students believe "cyber safety = installing antivirus + not clicking unknown links." This is dangerously incomplete because: (1) Modern.' }
          ],
            remediations: { 'cyber-safety-installing-antivirus-not': { steps: ['If the student holds the above misconception, do NOT simply re-read the definition.', 'Instead: Step 1 — Show a 2-minute video of a real vishing call (available on CERT-In YouTube) where attacker.', 'Step 2 — Have student role-play the victim and identify exactly which "antivirus + don\'t click" rule failed at each.', 'Step 3 — Map each failure to a specific Class 12 node: vishing → c12_ip_cbse_07_005 (phishing/social engineering), app.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "cyber safety = installing antivirus + not clicking unknown links." This is dangerously incomplete.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Cyber safety is primarily the responsibility of the government and tech companies; individuals cannot do much against sophisticated.', answer: 'Refute',
                  options: ['Refute', 'cyber safety = installing antivirus + not clicking unknown links', 'I am safe because I have Quick Heal and don\'t open spam emails', '"cyber safety = installing antivirus + not clicking unknown links'],
                  hint: 'Revisit c11_ip_cbse_08_008 (malware classification) and c11_ip_cbse_08_009 (phishing vs identity.',
                  misconception: 'Students believe "cyber safety = installing antivirus + not clicking unknown links." This is dangerously incomplete because: (1) Modern.' }
          ],
            remediations: { 'cyber-safety-installing-antivirus-not': { steps: ['If the student holds the above misconception, do NOT simply re-read the definition.', 'Instead: Step 1 — Show a 2-minute video of a real vishing call (available on CERT-In YouTube) where attacker.', 'Step 2 — Have student role-play the victim and identify exactly which "antivirus + don\'t click" rule failed at each.', 'Step 3 — Map each failure to a specific Class 12 node: vishing → c12_ip_cbse_07_005 (phishing/social engineering), app.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_002', difficulty: 'standard',
          question: 'A strong password is a secret authentication string that resists guessing.',
          hint: 'Revisit logarithms and change-of-base from Class 11 Math (c11_math_cbse_08_001 Binomial.',
          misconception: '**Misconception:** "Adding a symbol and number at the end of a dictionary word makes it strong." **Why students think.',
          parts: [
                { id: 'a', prompt: 'A student creates a password by taking the first letters of "My dog Bruno barks at 6 AM daily!" → "MdBba6AMd!".', answer: '**Steps:** 1',
                  options: ['**Steps:** 1', 'Adding a symbol and number at the end of a dictionary word makes it strong', 'must contain upper, lower, digit, symbol', 'password1!'],
                  hint: 'Revisit logarithms and change-of-base from Class 11 Math (c11_math_cbse_08_001 Binomial Theorem.',
                  misconception: '**Misconception:** "Adding a symbol and number at the end of a dictionary word makes it strong." **Why students think this:** School labs.' },
                { id: 'b', prompt: 'Compare these two password policies for a school ERP system. Which provides better security against offline cracking? Justify with entropy estimates.', answer: '**Answer:** Policy B is stronger',
                  options: ['**Answer:** Policy B is stronger', 'Adding a symbol and number at the end of a dictionary word makes it strong', 'must contain upper, lower, digit, symbol', 'password1!'],
                  hint: 'Revisit logarithms and change-of-base from Class 11 Math (c11_math_cbse_08_001 Binomial Theorem.',
                  misconception: '**Misconception:** "Adding a symbol and number at the end of a dictionary word makes it strong." **Why students think this:** School labs.' }
          ],
            remediations: { 'misconception-adding-a-symbol-and': { steps: ['Revisit **c11_ip_cbse_08_010** (Safe Browsing Practices and Strong Password Guidelines) — re-read the "Password.', 'Watch the 5-minute video "Password Entropy Explained" (link in Class 12 resources) focusing on the diceware example.', 'Practice: Generate 5 diceware passphrases using physical dice (or `secrets.choice` in Python), compute each entropy.', 'Re-attempt **Diagnostic Question 3** with a new sentence; if entropy calculation still uses output length, re-watch.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_003', difficulty: 'standard',
          question: 'Malware (malicious software) is a program or code designed to infiltrate.',
          hint: 'If stuck, revisit the **propagation vs payload** table in Class 11 IP node.',
          misconception: 'Students often believe **"trojan" and "virus" are interchangeable terms for any malware**, or that **ransomware is.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Ransomware is just a type of virus that encrypts files." Explain why this statement is technically incorrect, referencing propagation and.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'trojan'],
                  hint: 'If stuck, revisit the **propagation vs payload** table in Class 11 IP node c11_ip_cbse_08_008 and.',
                  misconception: 'Students often believe **"trojan" and "virus" are interchangeable terms for any malware**, or that **ransomware is a propagation method**.' },
                { id: 'b', prompt: 'An organization\'s network is hit by malware that spreads automatically via an unpatched SMB vulnerability, encrypts files on every reachable machine, and.', answer: 'This is **ransomware delivered via a worm** (worm-ransomware hybrid)',
                  options: ['This is **ransomware delivered via a worm** (worm-ransomware hybrid)', 'trojan'],
                  hint: 'If stuck, revisit the **propagation vs payload** table in Class 11 IP node c11_ip_cbse_08_008 and.',
                  misconception: 'Students often believe **"trojan" and "virus" are interchangeable terms for any malware**, or that **ransomware is a propagation method**.' },
                { id: 'c', prompt: 'Compare and contrast a trojan and spyware in terms of (a) user consent, (b) primary objective, and (c) typical persistence mechanism.', answer: 'user consent, (',
                  options: ['user consent, (', 'trojan'],
                  hint: 'If stuck, revisit the **propagation vs payload** table in Class 11 IP node c11_ip_cbse_08_008 and.',
                  misconception: 'Students often believe **"trojan" and "virus" are interchangeable terms for any malware**, or that **ransomware is a propagation method**.' }
          ],
            remediations: { 'trojan-and-virus-are-interchangeable': { steps: ['Revisit **c11_ip_cbse_08_008** (Class 11 IP malware basics) and **c11_cs_cbse_11_011** (Class 11 CS malware types).', 'Create a 5-row comparison table with columns: **Malware Type**, **Propagation Mechanism**, **Host Dependency**.', 'Fill it from memory, then verify against textbook.', 'Re-attempt Diagnostic Questions 2 and 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_004', difficulty: 'standard',
          question: 'Antivirus software is a program designed to detect, prevent, and remove.',
          hint: 'If unsure about malware types, review c12_ip_cbse_07_003; if unsure about IP/port, review.',
          misconception: 'Students often believe "antivirus protects against hackers" and "firewall protects against viruses".',
          parts: [
                { id: 'a', prompt: 'What is the primary difference between signature-based detection and heuristic/behavioral analysis in antivirus software?', answer: 'Signature-based detection compares file code against a database of known malware',
                  options: ['Signature-based detection compares file code against a database of known malware', 'both use signatures', 'antivirus protects against hackers', 'firewall protects against viruses'],
                  hint: 'If unsure about malware types, review c12_ip_cbse_07_003; if unsure about IP/port, review.',
                  misconception: 'Students often believe "antivirus protects against hackers" and "firewall protects against viruses".' },
                { id: 'b', prompt: 'A student says: "My antivirus has a firewall built in, so I don\'t need a separate firewall." Explain why this statement is partially correct but dangerous.', answer: 'Modern "internet security suites" bundle antivirus and a host-based firewall, so',
                  options: ['Modern "internet security suites" bundle antivirus and a host-based firewall, so', 'antivirus and firewall are the same thing', 'antivirus protects against hackers', 'firewall protects against viruses'],
                  hint: 'If unsure about malware types, review c12_ip_cbse_07_003; if unsure about IP/port, review.',
                  misconception: 'Students often believe "antivirus protects against hackers" and "firewall protects against viruses".' },
                { id: 'c', prompt: 'You configure a firewall rule: "Block inbound TCP port 3389 from any source to 192.168.1.50".', answer: 'The rule blocks *all* inbound traffic to port 3389 (RDP) regardless of source',
                  options: ['The rule blocks *all* inbound traffic to port 3389 (RDP) regardless of source', 'open port 3389 for everyone', 'antivirus protects against hackers', 'firewall protects against viruses'],
                  hint: 'If unsure about malware types, review c12_ip_cbse_07_003; if unsure about IP/port, review.',
                  misconception: 'Students often believe "antivirus protects against hackers" and "firewall protects against viruses".' }
          ],
            remediations: { 'antivirus-protects-against-hackers-and': { steps: ['Revisit c12_ip_cbse_07_003 (Malware types) to recall how viruses/worms/trojans operate — this clarifies *what*.', 'Revisit c11_cs_cbse_11_013 (Firewall and Antivirus Software) for the Class 11 recap of both mechanisms.', 'Draw a two-column table: left column "Threat enters via..." (USB, email, network, web download), right column "Stopped.', 'Re-attempt Diagnostic Question 3 and 6; if still stuck, watch a 5-min video on "stateful vs stateless firewall" and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_005', difficulty: 'standard',
          question: 'Phishing is a cyber attack where attackers impersonate legitimate entities.',
          hint: 'Revisit Class 11 node c11_ip_cbse_08_009 (Phishing, Identity Theft and Cyberbullying) for.',
          misconception: 'Students believe phishing emails are always poorly written with obvious spelling errors and generic greetings ("Dear.',
          parts: [
                { id: 'a', prompt: 'What is the defining characteristic that distinguishes phishing from other malware attacks like viruses or ransomware?', answer: 'Phishing is a social engineering attack that deceives the user into voluntarily',
                  options: ['Phishing is a social engineering attack that deceives the user into voluntarily', 'phishing installs malware', 'Dear Customer'],
                  hint: 'Revisit Class 11 node c11_ip_cbse_08_009 (Phishing, Identity Theft and Cyberbullying) for.',
                  misconception: 'Students believe phishing emails are always poorly written with obvious spelling errors and generic greetings ("Dear Customer").' },
                { id: 'b', prompt: 'Explain why a message claiming "Your PAN card is expired. Click here to renew: https://pan-gov-renewal.com" is suspicious, even if the website shows a padlock.', answer: 'HTTPS only encrypts traffic between you and the server',
                  options: ['HTTPS only encrypts traffic between you and the server', 'HTTPS means safe', 'Dear Customer'],
                  hint: 'Revisit Class 11 node c11_ip_cbse_08_009 (Phishing, Identity Theft and Cyberbullying) for.',
                  misconception: 'Students believe phishing emails are always poorly written with obvious spelling errors and generic greetings ("Dear Customer").' }
          ],
            remediations: { 'phishing-emails-are-always-poorly': { steps: ['If the student cannot distinguish sophisticated phishing from legitimate communication: 1.', 'Revisit c12_ip_cbse_07_007 (Safe browsing habits: HTTPS, certificates, and suspicious links) to practice URL inspection.', 'Revisit c11_ip_cbse_08_009 (Phishing, Identity Theft and Cyberbullying) for foundational examples.', 'Practice with the "Google Phishing Quiz" (phishingquiz.withgoogle.com) — attempt 10 scenarios, note every missed.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_006', difficulty: 'standard',
          question: 'Two-factor authentication (2FA) is a security process in which a user provides.',
          hint: 'Revisit c12_ip_cbse_07_002 for password entropy and c12_ip_cbse_07_005 for phishing.',
          misconception: 'Students believe "2FA means entering an OTP sent to my phone" and that this single method is universally secure.',
          parts: [
                { id: 'a', prompt: 'Compare the security and usability trade-offs of using a hardware security key versus an authenticator app for a high-value personal account (e.g., primary.', answer: 'Hardware key: highest phishing resistance (origin-bound), but requires physical',
                  options: ['Hardware key: highest phishing resistance (origin-bound), but requires physical', 'authenticator app is equally secure', '2FA means entering an OTP sent to my phone'],
                  hint: 'Revisit c12_ip_cbse_07_002 for password entropy and c12_ip_cbse_07_005 for phishing mechanics; then.',
                  misconception: 'Students believe "2FA means entering an OTP sent to my phone" and that this single method is universally secure.' }
          ],
            remediations: { '2fa-means-entering-an-otp': { steps: ['Revisit c12_ip_cbse_07_002 (Strong passwords) to reinforce that 2FA complements — not replaces — password hygiene.', 'Revisit c12_ip_cbse_07_005 (Phishing) to see how 2FA thwarts credential phishing but not session hijacking or real-time.', 'Complete a hands-on lab: enable TOTP 2FA on a test Google/GitHub account using an authenticator app, then attempt login.', 'Re-diagnostic: Answer Diagnostic Question 3 again, now justifying the ranking with hands-on experience of scanning.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
