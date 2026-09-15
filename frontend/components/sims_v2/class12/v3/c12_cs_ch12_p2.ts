import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch12_p2: SimDef = {
    id: 'v3_c12_cs_ch12_p2',
    title: 'Cyber Safety and Ethics · Part 2/2',
    subtitle: 'The padlock is encryption, not decoration',
    classLevel: 12, subject: 'computer_science', topic: 'Cyber Safety and Ethics · Part 2/2',
    chapters: ['c12_cs_ch12'],
    nodeIds: ['c12_cs_cbse_12_007', 'c12_cs_cbse_12_008', 'c12_cs_cbse_12_009', 'c12_cs_cbse_12_010', 'c12_cs_cbse_12_011', 'c12_cs_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Security analyst', intro: 'The email that emptied a bank account looked perfect. Learn to see the seam in the disguise.', goal: 'Identify cyber threats by their mechanism and select the defence — encryption, firewall, awareness — that actually counters each.' },
    discovery: {
        question: 'On café Wi-Fi you log into email over http:// and a stranger across the room reads your password. No virus, no email scam — what attacked you?',
        options: ['Snooping — plain-text HTTP traffic on a shared network can be captured; HTTPS or a VPN encrypts it into unreadable ciphertext', 'A worm — it crawled in through the Wi-Fi', 'Phishing — the login page was fake', 'A firewall — it opened your ports'],
        answer: 'Snooping — plain-text HTTP traffic on a shared network can be captured; HTTPS or a VPN encrypts it into unreadable ciphertext',
        hook: 'Every cyber threat exploits a technical hole or a human one. A firewall filters network traffic — it can\'t stop an employee clicking a keylogger attachment. Match the defence to the threat: HTTPS for snooping, awareness for phishing, distribution-resistance for DDoS.',
    },
    teaching: [
        { title: 'Data Protection and Privacy in the Digital World', text: 'Data protection and privacy in the digital world refers to the principles, practices, and technologies that ensure personal and sensitive information is collected, processed, stored, and shared only.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Threat-hunt like an analyst: classify malware vs phishing vs DoS vs snooping from real scenarios, defend the HTTPS padlock by its encryption — and design the layered checklist that keeps a shared lab PC safe.',
        labels: ['Data Protection and Privacy', 'Cyber Laws: IT Act', 'Intellectual Property Rights: Copyright,', 'Open Source Software', 'Hacking: Ethical Hacking', 'Cyber Ethics and Netiquette'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_007', title: 'Data Protection and Privacy in the Digital World',
          caseStudy: { intro: 'Imagine you download a free "flashlight" app on your phone. During installation, it asks for access to your contacts, location, microphone, and call logs.',
            decisions: [{ prompt: 'Define "personal data" and "sensitive personal data" as per the Information Technology (Reasonable Security Practices and Procedures and.', options: [
                { text: 'Personal data is any information that relates to a natural person, which, either directly', outcome: 'Personal data is any information that relates to a natural person, which, either directly.' },
                { text: '**using HTTPS (the padlock icon) alone guarantees complete privacy**', outcome: 'Not quite — Students often believe that **using HTTPS (the padlock icon) alone guarantees complete privacy**.', reveals: 'using-https-the-padlock-icon' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_008', title: 'Cyber Laws: IT Act 2000 and Amendments',
          caseStudy: { intro: 'Imagine you receive a message claiming your bank account is frozen and asking for your OTP to "verify" — this is a classic identity theft attempt under Section.',
            decisions: [{ prompt: 'What is the primary purpose of the Information Technology Act, 2000, and which amendment significantly expanded its scope to cover cyber.', options: [
                { text: 'The IT Act 2000 provides legal recognition for electronic commerce and electronic', outcome: 'The IT Act 2000 provides legal recognition for electronic commerce and electronic records, defines.' },
                { text: 'legal recognition of emails', outcome: 'Not quite — Students often believe the IT Act 2000 is a single static law and that all its sections are.', reveals: 'the-it-act-2000-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_010', title: 'Open Source Software and Licensing (GPL, MIT, Apache)',
          caseStudy: { intro: 'Imagine you have just finished a Python project for your school\'s library management system and want to upload it to GitHub so others can use and improve it.',
            decisions: [{ prompt: 'What is the fundamental difference between a copyleft license (like GPL) and a permissive license (like MIT) in terms of obligations.', options: [
                { text: 'A copyleft license requires that derivative works (modified versions or works that', outcome: 'A copyleft license requires that derivative works (modified versions or works that incorporate the.' },
                { text: 'both allow proprietary use', outcome: 'Not quite — Students often believe "open source means free of cost" and "all open source licenses are basically.', reveals: 'open-source-means-free-of' },
                { text: 'both require sharing source code', outcome: 'Not quite — Students often believe "open source means free of cost" and "all open source licenses are basically.', reveals: 'open-source-means-free-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_011', title: 'Hacking: Ethical Hacking vs Cracking',
          caseStudy: { intro: 'Start with a real-world scenario: "Imagine a company hires a cybersecurity expert to test their new banking app for vulnerabilities before launch.',
            decisions: [{ prompt: 'What is the primary difference between a white hat hacker and a black hat hacker in terms of authorization and intent?', options: [
                { text: 'A white hat hacker (ethical hacker) has explicit authorization from the system owner to', outcome: 'A white hat hacker (ethical hacker) has explicit authorization from the system owner to test.' },
                { text: 'hacker', outcome: 'Not quite — Students often think "hacker" and "cracker" are synonyms, or that all hackers are criminals.', reveals: 'hacker-and-cracker-are-synonyms' },
                { text: 'cracker', outcome: 'Not quite — Students often think "hacker" and "cracker" are synonyms, or that all hackers are criminals.', reveals: 'hacker-and-cracker-are-synonyms' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_012', title: 'Cyber Ethics and Netiquette',
          caseStudy: { intro: 'Imagine you receive a WhatsApp forward claiming a "government scheme gives ₹50,000 to students" with a link asking for your Aadhaar and bank details.',
            decisions: [{ prompt: 'Define "netiquette" and give two specific examples of netiquette rules for email communication that are NOT simply "be polite."', options: [
                { text: 'Netiquette is the set of social conventions governing respectful and effective online', outcome: 'Netiquette is the set of social conventions governing respectful and effective online.' },
                { text: 'don\'t use bad words', outcome: 'Not quite — Students believe "cyber ethics = following the law" and "netiquette = using polite words." They.', reveals: 'cyber-ethics-following-the-law' },
                { text: 'cyber ethics = following the law', outcome: 'Not quite — Students believe "cyber ethics = following the law" and "netiquette = using polite words." They.', reveals: 'cyber-ethics-following-the-law' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend gets an SMS: \'Your bank account closes in 2 hours — verify at http://bank-verify-login.xyz\'. He clicks, types in his credentials on the plain-HTTP page, and shrugs: \'I have antivirus, so I\'m covered.\'',
            decisions: [{ prompt: 'What just went wrong?', options: [
                { text: 'He was phished — a spoofed domain over unencrypted HTTP harvested his credentials, and antivirus doesn\'t catch deception: the defences were checking the domain, insisting on HTTPS, and never following unsolicited links.', outcome: 'Antivirus scans files for known malware; it can\'t judge a fake page\'s intent or encrypt traffic — layered defence is the actual model.' },
                { text: 'He\'s fine — antivirus blocks all hackers and phishing by definition.', outcome: 'No single tool covers every threat class: antivirus won\'t stop a deceptive link, an HTTP snoop, or a DDoS flood.', reveals: 'antivirus-covers-everything' },
                { text: 'The only issue was the padlock icon being absent — HTTPS alone would have made the fake page safe.', outcome: 'HTTPS encrypts the channel to whichever site you reached; it doesn\'t certify the site is genuine — domain-checking is separate.', reveals: 'https-means-legitimate-site' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_12_012', title: 'You made it',
          caseStudy: { intro: 'You can now name the threat behind any headline and pick the countermeasure that actually matches it. Cyber safety is marks plus survival skills.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_007', difficulty: 'standard',
          question: 'Data protection and privacy in the digital world refers to the principles.',
          hint: 'If stuck, revisit c12_cs_cbse_12_004 (Eavesdropping and Man-in-the-Middle Attacks) and.',
          misconception: 'Students often believe that **using HTTPS (the padlock icon) alone guarantees complete privacy**.',
          parts: [
                { id: 'a', prompt: 'A school uses a web-based attendance system that transmits student roll numbers and timestamps over HTTP.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', '**using HTTPS (the padlock icon) alone guarantees complete privacy**'],
                  hint: 'If stuck, revisit c12_cs_cbse_12_004 (Eavesdropping and Man-in-the-Middle Attacks) and.',
                  misconception: 'Students often believe that **using HTTPS (the padlock icon) alone guarantees complete privacy**.' }
          ],
            remediations: { 'using-https-the-padlock-icon': { steps: ['If a student confuses HTTPS with full privacy, follow this remediation: 1.', 'Revisit **c12_cs_cbse_12_005 (Firewall and Antivirus Software)** and **c12_cs_cbse_12_006 (Safe Browsing Practices)**.', 'Conduct a live demo: Open a phishing site with a valid padlock (e.g., a typo-squatted domain) and show the certificate.', 'Assign a tracing exercise: Use browser dev tools (Network tab) to capture a login request over HTTPS, then show the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_008', difficulty: 'standard',
          question: 'The Information Technology Act, 2000 (IT Act 2000) is the primary legislation.',
          hint: 'Review the threat summaries in nodes c12_cs_cbse_12_001 through c12_cs_cbse_12_004.',
          misconception: 'Students often believe the IT Act 2000 is a single static law and that all its sections are currently enforceable.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Information Technology Act, 2000 (IT Act 2000) is the primary legislation in India',
                  options: ['The Information Technology Act, 2000 (IT Act 2000) is the primary legislation in India', 'Cyber safety refers to the practices and measures taken to protect computers, networks,', 'Malware (malicious software) is any program deliberately designed to infiltrate, damage,', 'Phishing is a cyber attack where attackers impersonate legitimate entities via deceptive'],
                  hint: 'Review the threat summaries in nodes c12_cs_cbse_12_001 through c12_cs_cbse_12_004, focusing on the.',
                  misconception: 'Students often believe the IT Act 2000 is a single static law and that all its sections are currently enforceable.' }
          ],
            remediations: { 'the-it-act-2000-is': { steps: ['If a student cannot distinguish civil vs.', 'criminal provisions, have them create a two-column table: left column "Section 43 (Civil)", right column "Section 66.', 'Fill rows: "Remedy", "Authority", "Burden of Proof", "Penalty".', 'Then, give three mini-scenarios (e.g., employee copies client list; hacker defaces website; ransomware attack) and ask.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_009', difficulty: 'standard',
          question: 'Intellectual Property Rights (IPR) are legal rights that protect creations.',
          hint: 'Revisit c12_cs_cbse_12_007 (Data Protection) and c12_cs_cbse_12_008 (Cyber Laws).',
          misconception: 'Students often think that copyright, patent, and trademark are interchangeable or that obtaining one automatically.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Intellectual Property Rights (IPR) are legal rights that protect creations of the mind,',
                  options: ['Intellectual Property Rights (IPR) are legal rights that protect creations of the mind,', 'Cyber safety refers to the practices and measures taken to protect computers, networks,', 'Malware (malicious software) is any program deliberately designed to infiltrate, damage,', 'Phishing is a cyber attack where attackers impersonate legitimate entities via deceptive'],
                  hint: 'Revisit c12_cs_cbse_12_007 (Data Protection) and c12_cs_cbse_12_008 (Cyber Laws) to recall the.',
                  misconception: 'Students often think that copyright, patent, and trademark are interchangeable or that obtaining one automatically covers the others.' }
          ],
            remediations: { 'copyright': { steps: ['If a student confuses the three IPRs, have them create a three-column table with headers: "What it protects", "Example.', 'Fill it using the NCERT textbook or official IP India website.', 'Then give them three mini-cases: (1) a poem, (2) a new encryption method, (3) a startup logo.', 'Ask them to assign the correct IPR and justify.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that copyright, patent, and trademark are interchangeable or that obtaining one automatically.',
          parts: [
                { id: 'a', prompt: 'A company uses an open-source library (licensed under GPL) in their proprietary software without releasing the source code.', answer: 'Yes, it violates the GPL license',
                  options: ['Yes, it violates the GPL license', 'open source means free to use'],
                  hint: 'Revisit c12_cs_cbse_12_007 (Data Protection) and c12_cs_cbse_12_008 (Cyber Laws) to recall the.',
                  misconception: 'Students often think that copyright, patent, and trademark are interchangeable or that obtaining one automatically covers the others.' }
          ],
            remediations: { 'copyright': { steps: ['If a student confuses the three IPRs, have them create a three-column table with headers: "What it protects", "Example.', 'Fill it using the NCERT textbook or official IP India website.', 'Then give them three mini-cases: (1) a poem, (2) a new encryption method, (3) a startup logo.', 'Ask them to assign the correct IPR and justify.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_010', difficulty: 'standard',
          question: 'Open Source Software (OSS) is software whose source code is made freely.',
          hint: 'Revisit c12_cs_cbse_12_009 (Intellectual Property Rights) and focus on the copyright.',
          misconception: 'Students often believe "open source means free of cost" and "all open source licenses are basically the same." They.',
          parts: [
                { id: 'a', prompt: 'A student finds an MIT-licensed library on GitHub, modifies it, and wants to include the modified version in a commercial closed-source application they plan.', answer: 'Yes, it is allowed',
                  options: ['Yes, it is allowed', 'No, because MIT requires open sourcing the whole app', 'open source means free of cost', 'all open source licenses are basically the same'],
                  hint: 'Revisit c12_cs_cbse_12_009 (Intellectual Property Rights) and focus on the copyright section.',
                  misconception: 'Students often believe "open source means free of cost" and "all open source licenses are basically the same." They write in exams: "GPL.' }
          ],
            remediations: { 'open-source-means-free-of': { steps: ['Revisit the definition of "derivative work" and "distribution/conveyance" in copyright law (use node c12_cs_cbse_12_009.', 'Create a three-column table: License | Copyleft?', '| Allows Proprietary Derivatives?', 'Fill it from memory, then check against reference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_011', difficulty: 'standard',
          question: 'Ethical hacking is the authorized practice of bypassing system security.',
          hint: 'If stuck, revisit c12_cs_cbse_12_001 (Threats and Prevention) and c12_cs_cbse_12_009.',
          misconception: 'Students often think "hacker" and "cracker" are synonyms, or that all hackers are criminals.',
          parts: [
                { id: 'a', prompt: 'A company discovers a security flaw in their web application. They hire a cybersecurity professional to attempt to exploit the flaw under a signed agreement.', answer: 'This is ethical hacking (white hat)',
                  options: ['This is ethical hacking (white hat)', 'hacker', 'cracker', '"hacker" and "cracker" are synonyms, or that all hackers are criminals'],
                  hint: 'If stuck, revisit c12_cs_cbse_12_001 (Threats and Prevention) and c12_cs_cbse_12_009 (Cyber Laws).',
                  misconception: 'Students often think "hacker" and "cracker" are synonyms, or that all hackers are criminals.' }
          ],
            remediations: { 'hacker-and-cracker-are-synonyms': { steps: ['If a student holds this misconception, do the following: 1) Show the NCERT definitions side by side: White Hat.', '2) Use an analogy: A locksmith (white hat) vs.', 'someone who picks locks as a hobby and tries doors without permission (grey hat).', '3) Ask the student to re-read the NCERT summary points on hackers and crackers.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_012', difficulty: 'standard',
          question: 'Cyber ethics refers to the moral principles and guidelines that govern.',
          hint: 'If unclear on threat types → revisit c12_cs_cbse_12_001 (Threats) and.',
          misconception: 'Students believe "cyber ethics = following the law" and "netiquette = using polite words." They write in exams.',
          parts: [
                { id: 'a', prompt: 'You are the admin of a school WhatsApp group for Class 12 students.', answer: 'Correct sequence: (1) **Remove the screenshot immediately**',
                  options: ['Correct sequence: (1) **Remove the screenshot immediately**', 'keep it up so everyone knows', 'transparency', 'trial by mob'],
                  hint: 'If unclear on threat types → revisit c12_cs_cbse_12_001 (Threats) and c12_cs_cbse_12_002-004.',
                  misconception: 'Students believe "cyber ethics = following the law" and "netiquette = using polite words." They write in exams: "Ethical hacking is legal.' }
          ],
            remediations: { 'cyber-ethics-following-the-law': { steps: ['If the student cannot distinguish legal vs.', 'ethical boundaries: (1) Revisit **node c12_cs_cbse_12_008** (Cyber Laws: IT Act 2000) — list 3 acts that are *legal but.', '(2) Revisit **node c12_cs_cbse_12_009** (IPR) — practice writing an **in-line code attribution comment** for a 5-line.', '(3) Re-diagnostic: Give a fresh scenario — "You find a public API with no rate limit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
