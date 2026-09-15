import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ip_ch08_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ip_ch08_p2: SimDef = {
    id: 'v3_c11_ip_ch08_p2',
    title: 'Data Visualisation and Cyber Safety · Part 2/2',
    subtitle: 'Match the chart to the question — and the show() to the plot.',
    classLevel: 11, subject: 'informatics_practices', topic: 'Data Visualisation and Cyber Safety · Part 2/2',
    chapters: ['c11_ip_ch08'],
    nodeIds: ['c11_ip_cbse_08_007', 'c11_ip_cbse_08_008', 'c11_ip_cbse_08_009', 'c11_ip_cbse_08_010', 'c11_ip_cbse_08_011', 'c11_ip_cbse_08_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an analyst turning 110 raw numbers into one insight', intro: 'Ten matches, eleven batsmen, a spreadsheet of runs — the eye can\'t read it; the right chart can.', goal: 'Select visualisations by analytical task and produce basic Matplotlib plots correctly.' },
    discovery: {
        question: 'Average marks per subject, plotted as a line chart \'because lines show trends.\' Sound choice?',
        options: ['No — subjects are categories, not a timeline; comparison wants a bar chart, and the question picks the chart', 'Yes — lines show trends, always', 'Yes — any chart fits any data', 'No — only pie charts show subject marks'],
        answer: 'No — subjects are categories, not a timeline; comparison wants a bar chart, and the question picks the chart',
        hook: 'There\'s no single \'correct\' chart — monthly sales want a line for trend, a bar for month-vs-month; the data is fixed but the question chooses.',
    },
    teaching: [
        { title: 'Introduction to Cyber Safety and Cyber Threats', text: 'Cyber safety refers to the practice of protecting digital systems, networks, devices, and data from unauthorized access, attacks, damage, or theft through informed user behaviour and technical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ip_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Pick box plot over bar to compare mark distributions across streams, then draw a 7-day temperature line with plt.plot — and remember what actually renders it.',
        labels: ['Introduction to Cyber Safety', 'Malware: Virus, Worm, Trojan,', 'Phishing, Identity Theft', 'Safe Browsing Practices', 'Data Protection, Privacy', 'Intellectual Property Rights, Copyright'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_008', title: 'Malware: Virus, Worm, Trojan, Ransomware and Spyware',
          caseStudy: { intro: 'Imagine your friend downloads a free "game crack" from an unofficial site. Next day, their files are encrypted and a message demands ₹50,000 in Bitcoin.',
            decisions: [{ prompt: 'What is the fundamental difference between a computer virus and a worm in terms of propagation mechanism?', options: [
                { text: 'A virus requires a host program and human action (e.g., executing an infected file) to', outcome: 'A virus requires a host program and human action (e.g., executing an infected file) to replicate.' },
                { text: 'both spread automatically', outcome: 'Not quite — Students frequently believe **"Trojan is a type of virus"** because both are malicious programs.', reveals: 'students-frequently-believe-trojan-is' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_009', title: 'Phishing, Identity Theft and Cyberbullying',
          caseStudy: { intro: 'Imagine you receive a WhatsApp message claiming your bank account will be closed unless you click a link and verify your Aadhaar and OTP.',
            decisions: [{ prompt: 'What is the primary goal of a phishing attack? Provide one typical indicator of a phishing email.', options: [
                { text: 'The primary goal of phishing is to deceive the recipient into revealing sensitive', outcome: 'The primary goal of phishing is to deceive the recipient into revealing sensitive personal.' },
                { text: 'phishing installs malware directly', outcome: 'Not quite — Students often believe phishing only happens via email and that cyberbullying is just "teasing".', reveals: 'phishing-only-happens-via-email' },
                { text: 'teasing', outcome: 'Not quite — Students often believe phishing only happens via email and that cyberbullying is just "teasing".', reveals: 'phishing-only-happens-via-email' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_ip_cbse_08_010', title: 'Safe Browsing Practices and Strong Password Guidelines',
          scaffold: { problem: 'Calculate the entropy (in bits) of an 8-character password that uses only lowercase letters (a-z).',
            steps: [
            { text: 'Identify character set sizes: lowercase N1 = 26, full ASCII N2 = 95. Length L = 8 for both.' },
            { text: 'Apply entropy formula: H = L * log2(N). For lowercase: H1 = 8 * log2(26). log2(26) ≈ 4.7, so H1 ≈ 37.6 bits.' },
            { text: 'For full ASCII: H2 = 8 * log2(95). log2(95) ≈ 6.57, so H2 ≈ 52.6 bits.' },
            { text: 'Compute ratio of search spaces: (N2^L) / (N1^L) = (95/26)^8 ≈ (3.65)^8 ≈ 3,600 times larger.' },
            { text: 'Interpret: Adding uppercase, digits, symbols increases entropy by 15 bits (factor of 3,600), but increasing length.', faded: true, blankAnswer: 'Lowercase-only: ~37.6 bits. Full ASCII: ~52.6 bits. Full.' }
            ] } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_012', title: 'Intellectual Property Rights, Copyright and Plagiarism',
          caseStudy: { intro: 'Imagine you find a perfect Python script for your Class 11 IP project on GitHub. You copy it, change variable names, and submit it as your own work.',
            decisions: [{ prompt: 'What is the fundamental difference between copyright infringement and plagiarism in the context of using a photograph found on a website.', options: [
                { text: 'Copyright infringement is a legal violation of the photographer\'s exclusive rights', outcome: 'Copyright infringement is a legal violation of the photographer\'s exclusive rights (reproduction.' },
                { text: 'plagiarism is illegal copyright violation', outcome: 'Not quite — Students often believe: "If I change a few words / rewrite the code in my own style, it\'s not.', reveals: 'if-i-change-a-few' },
                { text: 'If I change a few words / rewrite the code in my own style, it\'s not plagiarism', outcome: 'Not quite — Students often believe: "If I change a few words / rewrite the code in my own style, it\'s not.', reveals: 'if-i-change-a-few' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For the science-fair data board, a teammate plots average marks per subject as a LINE chart \'because lines show trends\', and in Python runs `plt.plot(days, temps)` then declares \'Matplotlib is broken — no graph appeared.\'',
            decisions: [{ prompt: 'What are the correct visualisation and rendering rules?', options: [
                { text: 'Match chart to task and add the render step: subjects are categorical X — a line falsely implies continuity; comparison across categories wants a bar chart (lines need an ordered/continuous axis like time). And in a script, `plt.plot()` only builds the figure — `plt.show()` starts the GUI event loop that paints it; Jupyter auto-rendering is what trained the wrong expectation.', outcome: 'The board gets a bar chart that answers the comparison question honestly, and the script renders once `plt.show()` is called.' },
                { text: 'Keep the line chart — connecting the points looks like progress across subjects.', outcome: 'That continuity is false: moving from Hindi to Maths isn\'t a trend — lines reserve slope-meaning for ordered axes like time.', reveals: 'line-chart-for-categories' },
                { text: 'Reinstall Matplotlib — no output after plot() must mean a broken install.', outcome: 'Construction and rendering are separate calls: plot() adds the drawing, show() displays it — no error appeared because nothing was wrong.', reveals: 'plot-shows-automatically' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ip_cbse_08_012', title: 'You made it',
          caseStudy: { intro: 'plt.plot() only prepares the drawing; plt.show() is what puts it on screen — the picture exists in memory first, always.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_007', difficulty: 'standard',
          question: 'Cyber safety refers to the practice of protecting digital systems, networks.',
          hint: 'Revisit Class 10 Maths Chapter 14 (Probability) — focus on Exercise 14.1 questions.',
          misconception: 'Students believe **"cyber threats only happen to careless people who download random files or click suspicious.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Cyber safety refers to the practice of protecting digital systems, networks, devices, and',
                  options: ['Cyber safety refers to the practice of protecting digital systems, networks, devices, and', 'Data Visualisation is the graphical representation of information and data using visual', 'Matplotlib is a comprehensive Python library for creating static, animated, and', 'A line chart is a graphical representation that displays data points connected by'],
                  hint: 'Revisit Class 10 Maths Chapter 14 (Probability) — focus on Exercise 14.1 questions involving dice.',
                  misconception: 'Students believe **"cyber threats only happen to careless people who download random files or click suspicious links."** This leads them.' }
          ],
            remediations: { 'cyber-threats-only-happen-to': { steps: ['**Confront the "it won\'t happen to me" bias**: Show the 2023 CERT-In report stating 53% of Indian cybercrime victims.', '**Map their digital footprint**: Have them list every account (email, Instagram, UPI, school portal, coaching app) and.', 'Demonstrate credential stuffing using a safe tool like `haveibeenpwned.com`.', '**Reframe "carelessness"**: Explain that modern attacks exploit *trust* (fake teacher email), *urgency* ("submit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **"cyber threats only happen to careless people who download random files or click suspicious.',
          parts: [
                { id: 'a', prompt: 'A school\'s IT administrator argues: "We don\'t need cyber safety education for students — our firewall and antivirus will block all threats." Evaluate this.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'technology-only'],
                  hint: 'Revisit Class 10 Maths Chapter 14 (Probability) — focus on Exercise 14.1 questions involving dice.',
                  misconception: 'Students believe **"cyber threats only happen to careless people who download random files or click suspicious links."** This leads them.' }
          ],
            remediations: { 'cyber-threats-only-happen-to': { steps: ['**Confront the "it won\'t happen to me" bias**: Show the 2023 CERT-In report stating 53% of Indian cybercrime victims.', '**Map their digital footprint**: Have them list every account (email, Instagram, UPI, school portal, coaching app) and.', 'Demonstrate credential stuffing using a safe tool like `haveibeenpwned.com`.', '**Reframe "carelessness"**: Explain that modern attacks exploit *trust* (fake teacher email), *urgency* ("submit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_008', difficulty: 'standard',
          question: 'Malware (malicious software) is any program or code designed to harm, exploit.',
          hint: 'Revisit c11_ip_cbse_08_007: Review the definitions of threat, vulnerability, and attack.',
          misconception: 'Students frequently believe **"Trojan is a type of virus"** because both are malicious programs.',
          parts: [
                { id: 'a', prompt: 'Apply the definitions: A company\'s network is infected when an employee plugs in a USB drive found in the parking lot.', answer: 'This is **Ransomware** (likely delivered via a Trojan dropper on the USB)',
                  options: ['This is **Ransomware** (likely delivered via a Trojan dropper on the USB)', 'USB spread'],
                  hint: 'Revisit c11_ip_cbse_08_007: Review the definitions of threat, vulnerability, and attack vector.',
                  misconception: 'Students frequently believe **"Trojan is a type of virus"** because both are malicious programs.' }
          ],
            remediations: { 'students-frequently-believe-trojan-is': { steps: ['**Explicitly contrast** the three propagation axes: (a) Host dependency (Virus: yes, Worm/Trojan: no), (b) User.', '**Use a comparison table** with columns: Malware Type, Host Needed?, User Action Needed?, Self-Replicates?, Primary.', '**Practice hybrid classification**: Give examples like "Emotet (Trojan + Worm)" and "WannaCry (Worm + Ransomware)" and.', '**Emphasize**: "Category = behavior, not delivery method." A USB-delivered ransomware is still ransomware, not a "USB.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_009', difficulty: 'standard',
          question: 'Phishing is a cyber attack where attackers impersonate legitimate entities via.',
          hint: 'Revisit c11_ip_cbse_08_007 (Introduction to Cyber Safety and Cyber Threats) to refresh.',
          misconception: 'Students often believe phishing only happens via email and that cyberbullying is just "teasing" that can be ignored.',
          parts: [
                { id: 'a', prompt: 'A Class 11 student receives an Instagram message from a classmate\'s account saying, "You\'re so ugly, everyone hates you," followed by several peers liking the.', answer: 'This is cyberbullying',
                  options: ['This is cyberbullying', 'confront the bully online', 'ignore it completely', 'teasing'],
                  hint: 'Revisit c11_ip_cbse_08_007 (Introduction to Cyber Safety and Cyber Threats) to refresh the.',
                  misconception: 'Students often believe phishing only happens via email and that cyberbullying is just "teasing" that can be ignored.' },
                { id: 'b', prompt: 'Compare and contrast phishing and cyberbullying in terms of (a) attacker\'s motive, (b) typical victim interaction, and (c) primary harm caused.', answer: 'attacker\'s motive, (',
                  options: ['attacker\'s motive, (', 'both are online harms', 'teasing'],
                  hint: 'Revisit c11_ip_cbse_08_007 (Introduction to Cyber Safety and Cyber Threats) to refresh the.',
                  misconception: 'Students often believe phishing only happens via email and that cyberbullying is just "teasing" that can be ignored.' }
          ],
            remediations: { 'phishing-only-happens-via-email': { steps: ['If a student holds this misconception, conduct a "threat mapping" activity: (1) List all communication channels they.', '(2) For each, give a real Indian phishing example (e.g., fake UPI refund SMS, fake Instagram login page).', '(3) Show how a cyberbullying incident escalates from a joke to a police complaint using a case study (e.g., morphed.', '(4) Demonstrate identity theft via a simulated data breach: give them fragmented personal details (name, DOB, partial.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_010', difficulty: 'standard',
          question: 'Safe browsing practices are a set of proactive behaviors and technical.',
          hint: 'Revisit Class 8 Maths Chapter 2 (Exponents) for exponential notation and Class 10 Maths.',
          misconception: 'Students believe that **adding a number and symbol to a dictionary word (e.g., "Password@123") makes a password.',
          parts: [
                { id: 'a', prompt: 'What does the \'S\' in HTTPS stand for, and what specific protection does it provide that HTTP does not?', answer: 'The \'S\' stands for \'Secure\' (implemented via TLS/SSL)',
                  options: ['The \'S\' stands for \'Secure\' (implemented via TLS/SSL)', 'Password@123', '**adding a number and symbol to a dictionary word (e'],
                  hint: 'Revisit Class 8 Maths Chapter 2 (Exponents) for exponential notation and Class 10 Maths Chapter 14.',
                  misconception: 'Students believe that **adding a number and symbol to a dictionary word (e.g., "Password@123") makes a password strong** because.' }
          ],
            remediations: { 'adding-a-number-and-symbol': { steps: ['Show the student a live demo (or video) of Hashcat cracking "Password@123" in <1 second vs.', 'a 12-char random string taking years.', 'Have them calculate entropy: log2(95^8) ≈ 52 bits vs.', 'log2(7776^5) ≈ 64 bits for a 5-word Diceware passphrase.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_011', difficulty: 'standard',
          question: 'Data protection refers to the practices, safeguards, and legal frameworks.',
          hint: 'If stuck, revisit c11_ip_cbse_08_010 (Safe Browsing Practices) and audit your own phone\'s.',
          misconception: 'Students believe **Incognito/Private browsing mode makes them anonymous and prevents digital footprints**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Data protection refers to the practices, safeguards, and legal frameworks designed to',
                  options: ['Data protection refers to the practices, safeguards, and legal frameworks designed to', 'Data Visualisation is the graphical representation of information and data using visual', 'Matplotlib is a comprehensive Python library for creating static, animated, and', 'A line chart is a graphical representation that displays data points connected by'],
                  hint: 'If stuck, revisit c11_ip_cbse_08_010 (Safe Browsing Practices) and audit your own phone\'s.',
                  misconception: 'Students believe **Incognito/Private browsing mode makes them anonymous and prevents digital footprints**.' }
          ],
            remediations: { 'incognito-private-browsing-mode-makes': { steps: ['Demonstrate the misconception live. Open Incognito window, log into Google, search a unique nonsense term (e.g.', 'Open normal window, go to myactivity.google.com — show the search is there.', 'Open Command Prompt, run `ipconfig /displaydns` — show DNS cache still has google.com entries.', 'Explain: Incognito only prevents *local* browser history/cookies from persisting on *that device*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ip_cbse_08_012', difficulty: 'standard',
          question: 'Intellectual Property Rights (IPR) are legal rights granted to creators and.',
          hint: 'Revisit c11_ip_cbse_08_011 (Data Protection, Privacy and Digital Footprint) to reinforce.',
          misconception: 'Students often believe: "If I change a few words / rewrite the code in my own style, it\'s not plagiarism." This.',
          parts: [
                { id: 'a', prompt: 'A student copies three paragraphs from a Wikipedia article into their assignment, cites Wikipedia in the bibliography, but does not use quotation marks.', answer: 'This is plagiarism (specifically mosaic plagiarism)',
                  options: ['This is plagiarism (specifically mosaic plagiarism)', 'it\'s not plagiarism', 'it\'s copyright infringement', 'If I change a few words / rewrite the code in my own style, it\'s not plagiarism'],
                  hint: 'Revisit c11_ip_cbse_08_011 (Data Protection, Privacy and Digital Footprint) to reinforce that.',
                  misconception: 'Students often believe: "If I change a few words / rewrite the code in my own style, it\'s not plagiarism." This is mosaic plagiarism.' },
                { id: 'b', prompt: 'Your friend has written an original poem and posted it on their private Instagram account (visible only to followers).', answer: 'Copyright is violated: the friend owns copyright automatically upon creation (no',
                  options: ['Copyright is violated: the friend owns copyright automatically upon creation (no', 'private account means no copyright', 'If I change a few words / rewrite the code in my own style, it\'s not plagiarism'],
                  hint: 'Revisit c11_ip_cbse_08_011 (Data Protection, Privacy and Digital Footprint) to reinforce that.',
                  misconception: 'Students often believe: "If I change a few words / rewrite the code in my own style, it\'s not plagiarism." This is mosaic plagiarism.' },
                { id: 'c', prompt: 'Compare and contrast: (a) A patent for a new algorithm, (b) Copyright for the Python code implementing that algorithm, (c) A trademark for the software\'s name.', answer: 'A patent for a new algorithm, (',
                  options: ['A patent for a new algorithm, (', 'QuickSort Pro', 'copyright protects the algorithm', 'If I change a few words / rewrite the code in my own style, it\'s not plagiarism'],
                  hint: 'Revisit c11_ip_cbse_08_011 (Data Protection, Privacy and Digital Footprint) to reinforce that.',
                  misconception: 'Students often believe: "If I change a few words / rewrite the code in my own style, it\'s not plagiarism." This is mosaic plagiarism.' }
          ],
            remediations: { 'if-i-change-a-few': { steps: ['Have the student list three recent instances where they used external content (code, image, text) in school work.', 'For each, ask: "Did you check the license?', 'Would your use qualify as fair dealing under Section 52?" 3.', 'Show the Copyright Office\'s "Copyright for Students" guide (copyright.gov.in) and highlight the difference between.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
