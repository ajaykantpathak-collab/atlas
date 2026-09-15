import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch12_p1: SimDef = {
    id: 'v3_c12_cs_ch12_p1',
    title: 'Cyber Safety and Ethics · Part 1/2',
    subtitle: 'The padlock is encryption, not decoration',
    classLevel: 12, subject: 'computer_science', topic: 'Cyber Safety and Ethics · Part 1/2',
    chapters: ['c12_cs_ch12'],
    nodeIds: ['c12_cs_cbse_12_001', 'c12_cs_cbse_12_002', 'c12_cs_cbse_12_003', 'c12_cs_cbse_12_004', 'c12_cs_cbse_12_005', 'c12_cs_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Security analyst', intro: 'The email that emptied a bank account looked perfect. Learn to see the seam in the disguise.', goal: 'Identify cyber threats by their mechanism and select the defence — encryption, firewall, awareness — that actually counters each.' },
    discovery: {
        question: 'On café Wi-Fi you log into email over http:// and a stranger across the room reads your password. No virus, no email scam — what attacked you?',
        options: ['Snooping — plain-text HTTP traffic on a shared network can be captured; HTTPS or a VPN encrypts it into unreadable ciphertext', 'A worm — it crawled in through the Wi-Fi', 'Phishing — the login page was fake', 'A firewall — it opened your ports'],
        answer: 'Snooping — plain-text HTTP traffic on a shared network can be captured; HTTPS or a VPN encrypts it into unreadable ciphertext',
        hook: 'Every cyber threat exploits a technical hole or a human one. A firewall filters network traffic — it can\'t stop an employee clicking a keylogger attachment. Match the defence to the threat: HTTPS for snooping, awareness for phishing, distribution-resistance for DDoS.',
    },
    teaching: [
        { title: 'Introduction to Cyber Safety and Cyber Threats', text: 'Cyber safety refers to the practices and measures taken to protect computers, networks, and data from unauthorized access, attacks, or damage, while cyber threats are malicious activities.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_12_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Threat-hunt like an analyst: classify malware vs phishing vs DoS vs snooping from real scenarios, defend the HTTPS padlock by its encryption — and design the layered checklist that keeps a shared lab PC safe.',
        labels: ['Introduction to Cyber Safety', 'Malware: Virus, Worm, Trojan,', 'Phishing, Identity Theft', 'Eavesdropping and Man-in-the-Middle Attacks', 'Firewall and Antivirus Software', 'Safe Browsing Practices'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_001', title: 'Introduction to Cyber Safety and Cyber Threats',
          caseStudy: { intro: 'Imagine you receive an email that looks exactly like it\'s from your bank, asking you to "verify your account" by clicking a link and entering your password.',
            decisions: [{ prompt: 'What is the primary difference between a computer virus and a computer worm in terms of how they spread?', options: [
                { text: 'A virus requires a host program and human action (like opening an infected file) to', outcome: 'A virus requires a host program and human action (like opening an infected file) to replicate and.' },
                { text: 'both need a host file', outcome: 'Not quite — Students often believe that **having an antivirus installed makes them completely safe from all.', reveals: 'having-an-antivirus-installed-makes' },
                { text: 'both spread only via email', outcome: 'Not quite — Students often believe that **having an antivirus installed makes them completely safe from all.', reveals: 'having-an-antivirus-installed-makes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_002', title: 'Malware: Virus, Worm, Trojan, Ransomware, Spyware',
          caseStudy: { intro: 'Imagine you receive an email with an attachment labeled "Invoice.pdf.exe".',
            decisions: [{ prompt: 'A student writes: "A worm is a type of virus that spreads faster." Is this statement correct? Answer in one sentence.', options: [
                { text: '**Correct answer:** No, a worm is fundamentally different from a virus', outcome: '**Correct answer:** No, a worm is fundamentally different from a virus because it is a standalone.' },
                { text: 'worms are just faster viruses', outcome: 'Not quite — **Misconception:** "All malware that steals data is spyware, and all malware that demands money.', reveals: 'misconception-all-malware-that-steals' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_003', title: 'Phishing, Identity Theft and Cyberbullying',
          caseStudy: { intro: 'Imagine you receive an SMS: "Your SBI account will be closed in 2 hours. Update KYC immediately: http://sbi-kyc-update.xyz".',
            decisions: [{ prompt: 'A student receives an email claiming to be from "CBSE Board" with sender address "cbse.results@gov.in.biz" and subject "URGENT: Your Class.', options: [
                { text: 'Correct indicators: (1) Sender domain "gov.in.biz" is a subdomain of "biz"', outcome: 'Correct indicators: (1) Sender domain "gov.in.biz" is a subdomain of "biz" — not the official.' },
                { text: 'the email has spelling mistakes', outcome: 'Not quite — Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear.', reveals: 'phishing-only-happens-via-email' },
                { text: 'Dear Customer', outcome: 'Not quite — Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear.', reveals: 'phishing-only-happens-via-email' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_005', title: 'Firewall and Antivirus Software',
          caseStudy: { intro: 'Imagine you are the IT administrator for a school computer lab.',
            decisions: [{ prompt: 'What is the primary function of a network firewall, and where is it typically placed in a network topology?', options: [
                { text: 'A network firewall filters traffic between two or more networks (e.g., a school LAN and', outcome: 'A network firewall filters traffic between two or more networks (e.g., a school LAN and the.' },
                { text: 'firewall scans files for viruses on a computer', outcome: 'Not quite — Students often believe a firewall "scans for viruses" and an antivirus "blocks hackers from the.', reveals: 'a-firewall-scans-for-viruses' },
                { text: 'scans for viruses', outcome: 'Not quite — Students often believe a firewall "scans for viruses" and an antivirus "blocks hackers from the.', reveals: 'a-firewall-scans-for-viruses' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_006', title: 'Safe Browsing Practices and Digital Citizenship',
          caseStudy: { intro: 'Imagine you click a link from a WhatsApp forward claiming "Free JEE Mock Test PDF" — the page looks like a known coaching site but the URL.',
            decisions: [{ prompt: 'A student sees a padlock icon in the browser address bar on a banking website.', options: [
                { text: 'The student conflates *encryption* (HTTPS guarantees data-in-transit', outcome: 'The student conflates *encryption* (HTTPS guarantees data-in-transit confidentiality/integrity via.' },
                { text: 'trust seal', outcome: 'Not quite — **Misconception:** "If a website has HTTPS and a padlock, it is safe to enter my Aadhaar/bank.', reveals: 'misconception-if-a-website-has' },
                { text: 'channel seal', outcome: 'Not quite — **Misconception:** "If a website has HTTPS and a padlock, it is safe to enter my Aadhaar/bank.', reveals: 'misconception-if-a-website-has' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend gets an SMS: \'Your bank account closes in 2 hours — verify at http://bank-verify-login.xyz\'. He clicks, types in his credentials on the plain-HTTP page, and shrugs: \'I have antivirus, so I\'m covered.\'',
            decisions: [{ prompt: 'What just went wrong?', options: [
                { text: 'He was phished — a spoofed domain over unencrypted HTTP harvested his credentials, and antivirus doesn\'t catch deception: the defences were checking the domain, insisting on HTTPS, and never following unsolicited links.', outcome: 'Antivirus scans files for known malware; it can\'t judge a fake page\'s intent or encrypt traffic — layered defence is the actual model.' },
                { text: 'He\'s fine — antivirus blocks all hackers and phishing by definition.', outcome: 'No single tool covers every threat class: antivirus won\'t stop a deceptive link, an HTTP snoop, or a DDoS flood.', reveals: 'antivirus-covers-everything' },
                { text: 'The only issue was the padlock icon being absent — HTTPS alone would have made the fake page safe.', outcome: 'HTTPS encrypts the channel to whichever site you reached; it doesn\'t certify the site is genuine — domain-checking is separate.', reveals: 'https-means-legitimate-site' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now name the threat behind any headline and pick the countermeasure that actually matches it. Cyber safety is marks plus survival skills.',
            decisions: [{ prompt: 'What comes next? Cyber Safety and Ethics · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Cyber Safety and Ethics · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_001', difficulty: 'standard',
          question: 'Cyber safety refers to the practices and measures taken to protect computers.',
          hint: 'If stuck, revisit the concept of "client-server communication" and "file execution" from.',
          misconception: 'Students often believe that **having an antivirus installed makes them completely safe from all cyber threats**.',
          parts: [
                { id: 'a', prompt: 'A student uses a free public Wi‑Fi at a café to log into their school email. They see "http://" in the address bar.', answer: 'The threat is **snooping (or sniffing)**',
                  options: ['The threat is **snooping (or sniffing)**', 'phishing', 'antivirus'],
                  hint: 'If stuck, revisit the concept of "client-server communication" and "file execution" from Class 11.',
                  misconception: 'Students often believe that **having an antivirus installed makes them completely safe from all cyber threats**.' }
          ],
            remediations: { 'having-an-antivirus-installed-makes': { steps: ['If a student holds this misconception, do the following: 1.', 'Show a 2-minute demo: send a harmless phishing email (simulated) to a test account with antivirus running — the email.', 'Ask: "Did the antivirus stop it?', 'Why not?" Guide them to realize antivirus scans *files/programs*, not *intent* or *network traffic*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that **having an antivirus installed makes them completely safe from all cyber threats**.',
          parts: [
                { id: 'a', prompt: 'A company installs a firewall but still suffers a data breach because an employee clicked a malicious email attachment that installed a keylogger.', answer: 'The firewall did **not** necessarily fail',
                  options: ['The firewall did **not** necessarily fail', 'firewall should have blocked the email', 'firewall is useless'],
                  hint: 'If stuck, revisit the concept of "client-server communication" and "file execution" from Class 11.',
                  misconception: 'Students often believe that **having an antivirus installed makes them completely safe from all cyber threats**.' }
          ],
            remediations: { 'having-an-antivirus-installed-makes': { steps: ['If a student holds this misconception, do the following: 1.', 'Show a 2-minute demo: send a harmless phishing email (simulated) to a test account with antivirus running — the email.', 'Ask: "Did the antivirus stop it?', 'Why not?" Guide them to realize antivirus scans *files/programs*, not *intent* or *network traffic*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_002', difficulty: 'standard',
          question: 'Malware (malicious software) is any program deliberately designed.',
          hint: 'If unclear on "executable file" or "user execution", review basic file types and.',
          misconception: '**Misconception:** "All malware that steals data is spyware, and all malware that demands money is ransomware." **Why.',
          parts: [
                { id: 'a', prompt: 'A student writes: "A worm is a type of virus that spreads faster." Is this statement correct? Answer in one sentence.', answer: '**Correct answer:** No, a worm is fundamentally different from a virus',
                  options: ['**Correct answer:** No, a worm is fundamentally different from a virus', 'worms are just faster viruses'],
                  hint: 'If unclear on "executable file" or "user execution", review basic file types and OS process.',
                  misconception: '**Misconception:** "All malware that steals data is spyware, and all malware that demands money is ransomware." **Why it\'s wrong:**.' },
                { id: 'b', prompt: 'Explain in your own words why a Trojan horse is **not** considered a virus or a worm, even though it can cause similar damage.', answer: '**Correct answer:** A Trojan does not self-replicate',
                  options: ['**Correct answer:** A Trojan does not self-replicate', 'Trojans are viruses', 'Trojans spread like worms'],
                  hint: 'If unclear on "executable file" or "user execution", review basic file types and OS process.',
                  misconception: '**Misconception:** "All malware that steals data is spyware, and all malware that demands money is ransomware." **Why it\'s wrong:**.' },
                { id: 'c', prompt: 'A company\'s IT team discovers a malware that: (a) encrypts all database files, (b) displays a ransom note demanding ₹50,000 in cryptocurrency, (c) spreads.', answer: '**Correct answer:**',
                  options: ['**Correct answer:**', '(ignoring ransom payload) or solely as'],
                  hint: 'If unclear on "executable file" or "user execution", review basic file types and OS process.',
                  misconception: '**Misconception:** "All malware that steals data is spyware, and all malware that demands money is ransomware." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-all-malware-that-steals': { steps: ['**Revisit the propagation axis:** Draw a 2×2 table on paper: rows = "Requires host file?" (Yes/No), columns = "Requires.', 'Place Virus (Yes, Yes), Worm (No, No), Trojan (N/A — no replication, but requires human install), Ransomware (varies).', '**Re-read NCERT 12.2.1–12.2.5** and highlight every verb describing propagation: "copies/inserts its code", "replicates.', '**Re-diagnostic:** Take the 6 diagnostic questions again.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_003', difficulty: 'standard',
          question: 'Phishing is a cyber attack where attackers impersonate legitimate entities via.',
          hint: 'If unable to parse URLs, revisit c12_cs_cbse_12_001\'s "HTTP vs HTTPS" and "Network.',
          misconception: 'Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear Customer").',
          parts: [
                { id: 'a', prompt: 'A student receives an email claiming to be from "CBSE Board" with sender address "cbse.results@gov.in.biz" and subject "URGENT: Your Class 12 Marksheet Error.', answer: 'Correct indicators: (1) Sender domain "gov.in.biz" is a subdomain of "biz"',
                  options: ['Correct indicators: (1) Sender domain "gov.in.biz" is a subdomain of "biz"', 'the email has spelling mistakes', 'Dear Customer'],
                  hint: 'If unable to parse URLs, revisit c12_cs_cbse_12_001\'s "HTTP vs HTTPS" and "Network Security.',
                  misconception: 'Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear Customer").' },
                { id: 'b', prompt: 'Explain in your own words how a phishing attack can lead to identity theft, using the sequence: fake UPI payment request → user enters MPIN → attacker gains.', answer: 'Identity theft legally begins at the SIM swap step',
                  options: ['Identity theft legally begins at the SIM swap step', 'user enters MPIN', 'Dear Customer'],
                  hint: 'If unable to parse URLs, revisit c12_cs_cbse_12_001\'s "HTTP vs HTTPS" and "Network Security.',
                  misconception: 'Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear Customer").' },
                { id: 'c', prompt: 'A Class 12 student receives this WhatsApp message from an unknown number: "Hi, I\'m from your school\'s alumni association.', answer: 'SLAM evaluation: Sender',
                  options: ['SLAM evaluation: Sender', 'Dear Customer'],
                  hint: 'If unable to parse URLs, revisit c12_cs_cbse_12_001\'s "HTTP vs HTTPS" and "Network Security.',
                  misconception: 'Students believe phishing only happens via email with obvious errors (bad grammar, generic "Dear Customer").' }
          ],
            remediations: { 'phishing-only-happens-via-email': { steps: ['If a student cannot identify the domain spoofing in Diagnostic Q1, immediately revisit **c12_cs_cbse_12_001**.', 'Practice dissecting 10 real vs spoofed URLs (e.g., `sbi.co.in` vs `sbi.co.in.phishersite.com` vs `sbi-login.xyz`).', 'For identity theft confusion (Q2), use the "credential vs identity" flowchart: Phishing → steals *credentials* →.', 'For cyberbullying (Q4), have the student document a real-week log of online interactions — they\'ll see patterns.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_004', difficulty: 'standard',
          question: 'Eavesdropping is the unauthorized real-time interception and monitoring.',
          hint: 'Review NCERT Section 12.5 (HTTP vs HTTPS) and the "Network Security Threats" summary.',
          misconception: 'Students frequently conflate **eavesdropping**, **snooping**, and **Man-in-the-Middle** as the same thing — "someone.',
          parts: [
                { id: 'a', prompt: 'You are on a public Wi-Fi network (no password). You open a website using `http://example.com`. An attacker on the same network captures your session cookie.', answer: 'Attack: **Eavesdropping** (passive sniffing)',
                  options: ['Attack: **Eavesdropping** (passive sniffing)', 'shows confusion between passive sniffing and active interception'],
                  hint: 'Review NCERT Section 12.5 (HTTP vs HTTPS) and the "Network Security Threats" summary in Section.',
                  misconception: 'Students frequently conflate **eavesdropping**, **snooping**, and **Man-in-the-Middle** as the same thing — "someone listening to my data.".' }
          ],
            remediations: { 'students-frequently-conflate-eavesdropping': { steps: ['Have the student draw a three-column table: Attack | Passive/Active | Real-time?', '| Fill for Eavesdropping, Snooping, MitM.', 'Use a virtual lab (two VMs + attacker VM) to run `arpspoof` and `tcpdump` — observe ARP table changes (`arp -a`.', 'Revisit the NCERT distinction: "Eavesdropping is real-time interception...'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_005', difficulty: 'standard',
          question: 'A firewall is a network security system that monitors and controls incoming and.',
          hint: 'If stuck, re-read the "Malware" and "Eavesdropping and Man-in-the-Middle Attacks".',
          misconception: 'Students often believe a firewall "scans for viruses" and an antivirus "blocks hackers from the network." This.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A firewall is a network security system that monitors and controls incoming and outgoing',
                  options: ['A firewall is a network security system that monitors and controls incoming and outgoing', 'Cyber safety refers to the practices and measures taken to protect computers, networks,', 'Malware (malicious software) is any program deliberately designed to infiltrate, damage,', 'Phishing is a cyber attack where attackers impersonate legitimate entities via deceptive'],
                  hint: 'If stuck, re-read the "Malware" and "Eavesdropping and Man-in-the-Middle Attacks" sections in NCERT.',
                  misconception: 'Students often believe a firewall "scans for viruses" and an antivirus "blocks hackers from the network." This confusion arises because.' }
          ],
            remediations: { 'a-firewall-scans-for-viruses': { steps: ['If the student conflates firewall and antivirus functions, do this 3-step remediation: (1) Draw a two-column table.', '(2) Populate using textbook definitions: Firewall = "monitors incoming/outgoing traffic based on rules", Antivirus.', '(3) Re-attempt Diagnostic Questions 1 and 3 verbally, forcing the student to name the correct tool for each scenario.', 'If they still err, revisit node c12_cs_cbse_12_002 (Malware types) to reinforce *what* antivirus targets, and node.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_006', difficulty: 'standard',
          question: 'Safe Browsing Practices are a set of proactive habits and technical checks.',
          hint: 'If stuck on HTTPS vs safety, revisit c12_cs_cbse_12_004 (Eavesdropping) to see why.',
          misconception: '**Misconception:** "If a website has HTTPS and a padlock, it is safe to enter my Aadhaar/bank details." **Why it\'s.',
          parts: [
                { id: 'a', prompt: 'A student sees a padlock icon in the browser address bar on a banking website.', answer: 'The student conflates *encryption* (HTTPS guarantees data-in-transit',
                  options: ['The student conflates *encryption* (HTTPS guarantees data-in-transit', 'trust seal', 'channel seal', 'the padlock is a "trust seal" rather than a "channel seal'],
                  hint: 'If stuck on HTTPS vs safety, revisit c12_cs_cbse_12_004 (Eavesdropping) to see why encryption.',
                  misconception: '**Misconception:** "If a website has HTTPS and a padlock, it is safe to enter my Aadhaar/bank details." **Why it\'s wrong:** HTTPS (TLS).' },
                { id: 'b', prompt: 'You receive an email: "Urgent: Your CBSE 12th result is ready.', answer: '1) **Verify sender independently**: Go to `cbse.gov.in` directly (type URL)',
                  options: ['1) **Verify sender independently**: Go to `cbse.gov.in` directly (type URL)', 'open it to see', 'scan after opening', 'before opening'],
                  hint: 'If stuck on HTTPS vs safety, revisit c12_cs_cbse_12_004 (Eavesdropping) to see why encryption.',
                  misconception: '**Misconception:** "If a website has HTTPS and a padlock, it is safe to enter my Aadhaar/bank details." **Why it\'s wrong:** HTTPS (TLS).' },
                { id: 'c', prompt: 'Compare the privacy implications of: (A) Using a browser\'s "Incognito/Private Mode" vs (B) Using a VPN.', answer: 'The claim is false',
                  options: ['The claim is false', 'Incognito hides from ISP'],
                  hint: 'If stuck on HTTPS vs safety, revisit c12_cs_cbse_12_004 (Eavesdropping) to see why encryption.',
                  misconception: '**Misconception:** "If a website has HTTPS and a padlock, it is safe to enter my Aadhaar/bank details." **Why it\'s wrong:** HTTPS (TLS).' }
          ],
            remediations: { 'misconception-if-a-website-has': { steps: ['**Revisit Node c12_cs_cbse_12_005 (Firewall and Antivirus Software)** — specifically the "HTTP vs HTTPS" and "Browser.', 'Re-read the NCERT lines: "Always look for the \'https://\' at the beginning of the address (URL) of the websites while.', '**Hands-on Lab**: Open `http://neverssl.com` (HTTP) and `https://paytm.com` (HTTPS) in Chrome.', 'Click padlock → "Connection is secure" → "Certificate" → Note "Issued by: Let\'s Encrypt" (DV).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
