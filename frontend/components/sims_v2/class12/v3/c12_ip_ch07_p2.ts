import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch07_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch07_p2: SimDef = {
    id: 'v3_c12_ip_ch07_p2',
    title: 'Cyber Safety · Part 2/2',
    subtitle: 'No money, no secrets — still a target',
    classLevel: 12, subject: 'informatics_practices', topic: 'Cyber Safety · Part 2/2',
    chapters: ['c12_ip_ch07'],
    nodeIds: ['c12_ip_cbse_07_007', 'c12_ip_cbse_07_008', 'c12_ip_cbse_07_009', 'c12_ip_cbse_07_010', 'c12_ip_cbse_07_011', 'c12_ip_cbse_07_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Cyber-safety analyst', intro: 'A WhatsApp \'KYC expired\' link is the exam question you answer in real life. Learn the framework before you click.', goal: 'Adopt cyber safety as personal defence — risk categories, verification discipline and individual countermeasures.' },
    discovery: {
        question: '\'I have no money and post nothing secret — cyber safety isn\'t for me.\' What three threats does this teenager still carry?',
        options: ['Identity theft on her Aadhaar, a phone turned botnet, and private data harvested for sextortion — none need a bank balance', 'Only money matters', 'Antivirus covers it', 'Teens aren\'t targets'],
        answer: 'Identity theft on her Aadhaar, a phone turned botnet, and private data harvested for sextortion — none need a bank balance',
        hook: '\'Scan the attachment with antivirus first\' is already too late — verify the sender domain, distrust urgency, cross-check on the official site. And café Wi-Fi versus weak home Wi-Fi aren\'t equal threats: sniffing thrives on public networks, but liability lands on the home subscriber.',
    },
    teaching: [
        { title: 'Safe browsing habits: HTTPS, certificates, and suspicious links', text: 'Safe browsing habits refer to the practices users adopt to protect their data and privacy while navigating the web, centred on verifying HTTPS encryption, validating digital certificates issued.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the decision framework on a fake CBSE admit-card email: verify domain, refuse urgency, never open the attachment — then weigh which individual moves defeat even sophisticated attacks.',
        labels: ['Safe browsing habits: HTTPS,', 'Public Wi-Fi risks', 'Data backup and recovery', 'Software updates and patch', 'Privacy protection on social', 'Reporting cyber incidents'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_007', title: 'Safe browsing habits: HTTPS, certificates, and suspicious links',
          caseStudy: { intro: 'Imagine you receive a WhatsApp message: "Your SBI account will be closed! Verify now: https://sbi-online-verification.secure-banking.in/login".',
            decisions: [{ prompt: 'What does the padlock icon in the browser address bar actually guarantee about a website?', options: [
                { text: 'The padlock only guarantees that the connection between your browser and the server is', outcome: 'The padlock only guarantees that the connection between your browser and the server is encrypted.' },
                { text: 'padlock means the site is safe/genuine', outcome: 'Not quite — Students believe "HTTPS = Safe Site" because the padlock icon is taught as a security indicator.', reveals: 'https-safe-site-because-the' },
                { text: 'HTTPS = Safe Site', outcome: 'Not quite — Students believe "HTTPS = Safe Site" because the padlock icon is taught as a security indicator.', reveals: 'https-safe-site-because-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_008', title: 'Public Wi-Fi risks and VPN usage',
          caseStudy: { intro: 'Imagine you\'re at a café using their free Wi-Fi to check your bank balance — you see "FREE_CAFE_WIFI" and connect without a password.',
            decisions: [{ prompt: 'What is the primary security difference between a public Wi-Fi network that requires no password (open network) and one that uses.', options: [
                { text: 'On an open network, all traffic is transmitted in cleartext', outcome: 'On an open network, all traffic is transmitted in cleartext — a passive eavesdropper can capture.' },
                { text: 'both are equally unsafe', outcome: 'Not quite — Students believe "a VPN makes me anonymous and secure on any public Wi-Fi." The exact wrong.', reveals: 'a-vpn-makes-me-anonymous' },
                { text: 'WPA2-Personal prevents all sniffing', outcome: 'Not quite — Students believe "a VPN makes me anonymous and secure on any public Wi-Fi." The exact wrong.', reveals: 'a-vpn-makes-me-anonymous' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_009', title: 'Data backup and recovery strategies',
          caseStudy: { intro: 'Imagine your laptop with all your Class 12 project files, photos, and college applications gets hit by ransomware overnight — everything encrypted, a ransom.',
            decisions: [{ prompt: 'What is the 3-2-1 backup rule, and why does each number matter?', options: [
                { text: 'The 3-2-1 rule: keep at least 3 copies of data (original + 2 backups), on 2 different', outcome: 'The 3-2-1 rule: keep at least 3 copies of data (original + 2 backups), on 2 different media types.' },
                { text: '3 backups on the same external drive', outcome: 'Not quite — Students equate "cloud sync" (Google Drive, OneDrive, Dropbox) with "backup." They believe.', reveals: 'students-equate-cloud-sync-google' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_010', title: 'Software updates and patch management for security',
          caseStudy: { intro: 'Imagine your phone notifies you of a "critical security update" — do you install it immediately or hit "Remind me tomorrow"?',
            decisions: [{ prompt: 'What is the primary purpose of a security patch released by a software vendor?', options: [
                { text: 'A security patch fixes a specific vulnerability (weakness) in software that could be', outcome: 'A security patch fixes a specific vulnerability (weakness) in software that could be exploited.' },
                { text: 'adds new features', outcome: 'Not quite — Students believe "updating is only for new features" and "if it works, don\'t fix it." They ignore.', reveals: 'updating-is-only-for-new' },
                { text: 'improves performance', outcome: 'Not quite — Students believe "updating is only for new features" and "if it works, don\'t fix it." They ignore.', reveals: 'updating-is-only-for-new' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_011', title: 'Privacy protection on social media platforms',
          caseStudy: { intro: 'Imagine you post a photo of your new Aadhaar card on Instagram Stories thinking only "Close Friends" see it — but you forgot that your Stories setting was.',
            decisions: [{ prompt: 'What is the default audience setting for new posts on a freshly created Facebook account for a user aged 17 in India as of 2024?', options: [
                { text: 'The default audience for new posts on a new Facebook account for a minor (13‑17) in India', outcome: 'The default audience for new posts on a new Facebook account for a minor (13‑17) in India.' },
                { text: 'Public', outcome: 'Not quite — Students believe **"Private Account" = "Total Privacy"**. They set Instagram to "Private" and.', reveals: 'private-account-total-privacy' },
                { text: 'Only Me', outcome: 'Not quite — Students believe **"Private Account" = "Total Privacy"**. They set Instagram to "Private" and.', reveals: 'private-account-total-privacy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_012', title: 'Reporting cyber incidents and legal recourse in India',
          caseStudy: { intro: 'Imagine you receive a WhatsApp message claiming your bank KYC has expired and asking you to click a link to update it — you click, enter details, and ₹45,000.',
            decisions: [{ prompt: 'What is the official Government of India portal for reporting cybercrimes, and what is the dedicated helpline number for financial cyber.', options: [
                { text: 'The official portal is **cybercrime.gov.in** (National Cyber Crime Reporting Portal) and', outcome: 'The official portal is **cybercrime.gov.in** (National Cyber Crime Reporting Portal) and the 24x7.' },
                { text: '100/112', outcome: 'Not quite — **Misconception**: "Cybercrime reporting is only for \'big\' crimes like hacking bank servers.', reveals: 'misconception-cybercrime-reporting-is-only' },
                { text: 'golden hour', outcome: 'Not quite — **Misconception**: "Cybercrime reporting is only for \'big\' crimes like hacking bank servers.', reveals: 'misconception-cybercrime-reporting-is-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A cousin brags his banking password \'Tr0ub4dor&3\' is uncrackable because \'it has every character type — upper, lower, digit, symbol.\'',
            decisions: [{ prompt: 'What does password entropy say?', options: [
                { text: 'It\'s ~28 bits of pattern, not strength — leetspeak on one dictionary word is in every attacker\'s ruleset; character variety adds far less than length, so a long random passphrase like four random words beats his decorated word while being easier to remember.', outcome: 'The chapter\'s formula is about the randomness of the process, not the look of the output — predictable substitutions earn almost nothing once the method is in the cracker\'s dictionary.' },
                { text: 'He\'s right — all four character classes means the full 95-character search space.', outcome: 'The search space belongs to the generation process, not the string: his word-plus-substitutions is a pattern attacker\'s tools try early, so the real space is the handful of leetspeak variants, not 95^11.', reveals: 'charset-equals-space' },
                { text: 'It\'s weak only because it\'s short — the same pattern at 16 characters is strong.', outcome: 'Length on a deterministic pattern adds little entropy — two decorated dictionary words still sit inside the pattern space; entropy counts unpredictable choices, and a longer costume on the same word changes almost none.', reveals: 'length-fixes-patterns' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_07_012', title: 'You made it',
          caseStudy: { intro: 'You can now treat cyber safety as a daily decision framework — where 2FA, zero-trust verification and offline backups beat learned helplessness.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_007', difficulty: 'standard',
          question: 'Safe browsing habits refer to the practices users adopt to protect their data.',
          hint: 'If stuck on URL parsing, revisit the DNS hierarchy concept: the registered domain is the.',
          misconception: 'Students believe "HTTPS = Safe Site" because the padlock icon is taught as a security indicator without explaining the.',
          parts: [
                { id: 'a', prompt: 'You receive an email with a link shortened via bit.ly. Describe a safe, step-by-step method to inspect the true destination without clicking the link.', answer: 'Step 1: Copy the shortened URL (do not click)',
                  options: ['Step 1: Copy the shortened URL (do not click)', 'click and see where it goes', 'trust the sender', 'HTTPS = Safe Site'],
                  hint: 'If stuck on URL parsing, revisit the DNS hierarchy concept: the registered domain is the.',
                  misconception: 'Students believe "HTTPS = Safe Site" because the padlock icon is taught as a security indicator without explaining the threat model.' }
          ],
            remediations: { 'https-safe-site-because-the': { steps: ['If the student equates HTTPS with site legitimacy: (1) Show a live demo (or screenshot) of a phishing page with a valid.', '(2) Walk through the certificate viewer: click padlock → "Certificate is valid" → "Issued.', 'Emphasise: the CA only verified the attacker controls that domain.', '(3) Have the student parse 5 URLs (mix of legitimate, subdomain-trick, homograph, shortened) and identify the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_008', difficulty: 'standard',
          question: 'Public Wi-Fi risks refer to security vulnerabilities inherent in open or poorly.',
          hint: 'Revisit c12_ip_cbse_07_007 (HTTPS, certificates, padlock icon meaning) and.',
          misconception: 'Students believe "a VPN makes me anonymous and secure on any public Wi-Fi." The exact wrong reasoning: they conflate.',
          parts: [
                { id: 'a', prompt: 'What is the primary security difference between a public Wi-Fi network that requires no password (open network) and one that uses WPA2-Personal with a shared.', answer: 'On an open network, all traffic is transmitted in cleartext',
                  options: ['On an open network, all traffic is transmitted in cleartext', 'both are equally unsafe', 'WPA2-Personal prevents all sniffing', 'a VPN makes me anonymous and secure on any public Wi-Fi'],
                  hint: 'Revisit c12_ip_cbse_07_007 (HTTPS, certificates, padlock icon meaning) and c11_cs_cbse_11_009.',
                  misconception: 'Students believe "a VPN makes me anonymous and secure on any public Wi-Fi." The exact wrong reasoning: they conflate **traffic encryption**.' }
          ],
            remediations: { 'a-vpn-makes-me-anonymous': { steps: ['Have the student draw the data path diagram — laptop → Wi-Fi AP → ISP → VPN server → destination — and label each.', 'Demonstrate a DNS leak test (ipleak.net) with VPN on/off to prove VPN doesn\'t automatically fix all leaks.', 'Show a Wireshark capture on open Wi-Fi: one without VPN (clear HTTP, DNS, SNI visible), one with VPN (only encrypted.', 'Assign re-diagnostic: Diagnostic Question 4 (data path encryption analysis) — student must score 100% before proceeding.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "a VPN makes me anonymous and secure on any public Wi-Fi." The exact wrong reasoning: they conflate.',
          parts: [
                { id: 'a', prompt: 'Evaluate this security advice for a Class 12 student: "Always use a free VPN app from the Play Store/App Store when on public Wi-Fi — it\'s better than.', answer: 'Refute',
                  options: ['Refute', 'for casual use', 'a VPN makes me anonymous and secure on any public Wi-Fi', '"a VPN makes me anonymous and secure on any public Wi-Fi'],
                  hint: 'Revisit c12_ip_cbse_07_007 (HTTPS, certificates, padlock icon meaning) and c11_cs_cbse_11_009.',
                  misconception: 'Students believe "a VPN makes me anonymous and secure on any public Wi-Fi." The exact wrong reasoning: they conflate **traffic encryption**.' }
          ],
            remediations: { 'a-vpn-makes-me-anonymous': { steps: ['Have the student draw the data path diagram — laptop → Wi-Fi AP → ISP → VPN server → destination — and label each.', 'Demonstrate a DNS leak test (ipleak.net) with VPN on/off to prove VPN doesn\'t automatically fix all leaks.', 'Show a Wireshark capture on open Wi-Fi: one without VPN (clear HTTP, DNS, SNI visible), one with VPN (only encrypted.', 'Assign re-diagnostic: Diagnostic Question 4 (data path encryption analysis) — student must score 100% before proceeding.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_009', difficulty: 'standard',
          question: 'Data backup is the process of creating and maintaining copies of data.',
          hint: 'Revisit Class 11 IP nodes on malware (c11_ip_cbse_08_008) and data protection.',
          misconception: 'Students equate "cloud sync" (Google Drive, OneDrive, Dropbox) with "backup." They believe automatic sync protects.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between incremental and differential backups.', answer: 'Incremental backs up changes',
                  options: ['Incremental backs up changes', 'incremental is always better for recovery'],
                  hint: 'Revisit Class 11 IP nodes on malware (c11_ip_cbse_08_008) and data protection (c11_ip_cbse_08_011).',
                  misconception: 'Students equate "cloud sync" (Google Drive, OneDrive, Dropbox) with "backup." They believe automatic sync protects against all data loss.' },
                { id: 'b', prompt: 'A freelancer has 200 GB of client videos. They do a full backup to an external SSD every Sunday, and incremental backups to the same SSD every weekday at 6 PM.', answer: 'Last incremental was Wednesday 6 PM',
                  options: ['Last incremental was Wednesday 6 PM', 'only Sunday full backup needed'],
                  hint: 'Revisit Class 11 IP nodes on malware (c11_ip_cbse_08_008) and data protection (c11_ip_cbse_08_011).',
                  misconception: 'Students equate "cloud sync" (Google Drive, OneDrive, Dropbox) with "backup." They believe automatic sync protects against all data loss.' },
                { id: 'c', prompt: 'Compare a 3-2-1 strategy (local HDD + cloud) with a 4-3-2 strategy (local HDD, local NAS, cloud provider A, cloud provider B).', answer: '4-3-2 adds a second on-site device (NAS) and a second cloud provider',
                  options: ['4-3-2 adds a second on-site device (NAS) and a second cloud provider', 'more copies = safer'],
                  hint: 'Revisit Class 11 IP nodes on malware (c11_ip_cbse_08_008) and data protection (c11_ip_cbse_08_011).',
                  misconception: 'Students equate "cloud sync" (Google Drive, OneDrive, Dropbox) with "backup." They believe automatic sync protects against all data loss.' }
          ],
            remediations: { 'students-equate-cloud-sync-google': { steps: ['If the student holds this misconception: (1) Have them list three data-loss events: accidental deletion, ransomware.', '(2) For each, trace what happens to a single synced folder vs.', 'a 3-2-1 setup with an air-gapped external drive.', '(3) Practical exercise: create a test folder with 5 files.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_010', difficulty: 'standard',
          question: 'Software updates and patch management refer to the systematic process.',
          hint: 'If stuck, review c12_ip_cbse_07_003 (Malware types) and c11_ip_cbse_08_008 (Malware).',
          misconception: 'Students believe "updating is only for new features" and "if it works, don\'t fix it." They ignore that patches.',
          parts: [
                { id: 'a', prompt: 'Compare the risk profiles of: (a) an unpatched internet-facing web server, (b) an unpatched internal workstation with no internet access, (c) a patched server.', answer: 'Highest: (a) — directly exploitable from internet',
                  options: ['Highest: (a) — directly exploitable from internet', 'updating is only for new features'],
                  hint: 'If stuck, review c12_ip_cbse_07_003 (Malware types) and c11_ip_cbse_08_008 (Malware) to see.',
                  misconception: 'Students believe "updating is only for new features" and "if it works, don\'t fix it." They ignore that patches primarily close *known*.' }
          ],
            remediations: { 'updating-is-only-for-new': { steps: ['Revisit c12_ip_cbse_07_003 (Malware types) to see how worms exploit unpatched vulnerabilities.', 'Watch a 5-min demo of Metasploit exploiting MS17-010 (EternalBlue) on an unpatched VM.', 'Re-attempt DIAGNOSTIC_QUESTION_3: write a 3-sentence explanation of why "compatibility testing" cannot justify 60-day.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_011', difficulty: 'standard',
          question: 'Privacy protection on social media platforms refers to the set of practices.',
          hint: 'Revisit c11_ip_cbse_08_011 (Data Protection, Privacy and Digital Footprint) and.',
          misconception: 'Students believe **"Private Account" = "Total Privacy"**. They set Instagram to "Private" and assume *nothing* leaks.',
          parts: [
                { id: 'a', prompt: 'Explain why enabling "Two‑Factor Authentication" (2FA) on Instagram does not prevent your followers from seeing your email address if it is listed in your bio.', answer: '2FA protects **account access** (login), not **data visibility**',
                  options: ['2FA protects **account access** (login), not **data visibility**', 'who can log in as me', 'who can see my data', 'Private Account'],
                  hint: 'Revisit c11_ip_cbse_08_011 (Data Protection, Privacy and Digital Footprint) and c11_cs_cbse_11_015.',
                  misconception: 'Students believe **"Private Account" = "Total Privacy"**. They set Instagram to "Private" and assume *nothing* leaks.' },
                { id: 'b', prompt: 'A student wants to share a Reel only with cousins in a WhatsApp group but not with school friends on Instagram.', answer: 'School friends on Instagram **cannot** view the Reel',
                  options: ['School friends on Instagram **cannot** view the Reel', 'yes, the link makes it public', 'Private Account', 'Total Privacy'],
                  hint: 'Revisit c11_ip_cbse_08_011 (Data Protection, Privacy and Digital Footprint) and c11_cs_cbse_11_015.',
                  misconception: 'Students believe **"Private Account" = "Total Privacy"**. They set Instagram to "Private" and assume *nothing* leaks.' },
                { id: 'c', prompt: 'Compare the privacy risks of "Live Location" sharing on WhatsApp (shared with a group for 8 hours) vs. "Add Location" tag on a public Instagram post.', answer: 'The Instagram "Add Location" tag on a **public** post is riskier: it attaches a',
                  options: ['The Instagram "Add Location" tag on a **public** post is riskier: it attaches a', 'Private Account', 'Total Privacy', '**"Private Account" = "Total Privacy"**'],
                  hint: 'Revisit c11_ip_cbse_08_011 (Data Protection, Privacy and Digital Footprint) and c11_cs_cbse_11_015.',
                  misconception: 'Students believe **"Private Account" = "Total Privacy"**. They set Instagram to "Private" and assume *nothing* leaks.' }
          ],
            remediations: { 'private-account-total-privacy': { steps: ['If a student exhibits the "Private Account = Total Privacy" misconception: 1.', 'Have them create a test Instagram account, set it Private, then use a second device (or incognito browser) to visit the.', 'Use a free EXIF viewer (e.g., exif.tools) on a photo they uploaded — show GPS coordinates embedded.', 'Walk through Settings → Security → Apps and Websites → show active third‑party tokens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_07_012', difficulty: 'standard',
          question: 'Reporting cyber incidents and legal recourse in India refers to the formal.',
          hint: 'If stuck, revisit **c12_ip_cbse_07_005 (Phishing and social engineering)** to re-learn.',
          misconception: '**Misconception**: "Cybercrime reporting is only for \'big\' crimes like hacking bank servers.',
          parts: [
                { id: 'a', prompt: 'Your friend\'s Instagram account is hacked. The hacker posts morphed obscene images of your friend and demands ₹20,000 to restore access.', answer: 'Correct sequence: (1) **Do not pay ransom**',
                  options: ['Correct sequence: (1) **Do not pay ransom**', 'FIR registration discretion', 'complaint registration on portal'],
                  hint: 'If stuck, revisit **c12_ip_cbse_07_005 (Phishing and social engineering)** to re-learn how.',
                  misconception: '**Misconception**: "Cybercrime reporting is only for \'big\' crimes like hacking bank servers.' }
          ],
            remediations: { 'misconception-cybercrime-reporting-is-only': { steps: ['If a student holds this misconception: 1.', '**Show the CFCFRMS dashboard screenshot** (publicly available in news articles) displaying real-time recovery.', '**Walk through a live demo** (or screen recording) of filing a *dummy* complaint for "UPI fraud of ₹500".', '**Assign a micro-task**: "Find one news report from the last 3 months where a student recovered money via 1930 for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
