import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch11_p3 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch11_p3: SimDef = {
    id: 'v3_c11_cs_ch11_p3',
    title: 'Computer Networks and Cyber Safety · Part 3/3',
    subtitle: 'See what makes devices a network and why LAN, MAN and WAN are measured in geography, not wires.',
    classLevel: 11, subject: 'computer_science', topic: 'Computer Networks and Cyber Safety · Part 3/3',
    chapters: ['c11_cs_ch11'],
    nodeIds: ['c11_cs_cbse_11_013', 'c11_cs_cbse_11_014', 'c11_cs_cbse_11_015'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an IT planner connecting a school\'s devices', intro: 'Four devices, one printer, one movie — figure out who talks to whom, over what medium, speaking which protocol.', goal: 'Identify network components and classify networks by geographical span.' },
    discovery: {
        question: 'A school lab\'s computers share files and one printer, but the internet is down. Is the lab still a network?',
        options: ['Yes — a LAN exists on its own; the internet is a service that rides on networks, not a requirement', 'No — without internet there is nothing to share', 'Only if the computers use cables, since Wi-Fi needs internet', 'No — a network requires a server connected to the web'],
        answer: 'Yes — a LAN exists on its own; the internet is a service that rides on networks, not a requirement',
        hook: 'Network ≠ internet — two machines sharing a printer are already a network; the web is just the biggest one.',
    },
    teaching: [
        { title: 'Firewall and Antivirus Software', text: 'A firewall is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules, establishing a barrier between a trusted internal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_11_013', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map sender, receiver, medium and protocol for phone-to-printer and laptop-to-TV, then classify a campus network versus a city-spanning link.',
        labels: ['Firewall and Antivirus Software', 'Safe Browsing Practices', 'Data Protection and Privacy'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_013', title: 'Firewall and Antivirus Software',
          caseStudy: { intro: 'Imagine you just connected your new laptop to your home Wi-Fi and within minutes, a pop-up appears saying "Your files are encrypted – pay ₹50,000 to decrypt.".',
            decisions: [{ prompt: 'What is the primary difference between a packet-filtering firewall and a stateful inspection firewall in terms of connection tracking?', options: [
                { text: 'A packet-filtering firewall examines each packet in isolation (source/destination IP,', outcome: 'A packet-filtering firewall examines each packet in isolation (source/destination IP, port.' },
                { text: 'both track connections', outcome: 'Not quite — Students believe "If I have a good antivirus, I don\'t need a firewall" or vice versa.', reveals: 'if-i-have-a-good' },
                { text: 'If I have a good antivirus, I don\'t need a firewall', outcome: 'Not quite — Students believe "If I have a good antivirus, I don\'t need a firewall" or vice versa.', reveals: 'if-i-have-a-good' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_014', title: 'Safe Browsing Practices and Digital Citizenship',
          caseStudy: { intro: 'Imagine you receive an email claiming your bank password expires today, with a link to "renew" it.',
            decisions: [{ prompt: 'What is the key difference between an active digital footprint and a passive digital footprint?', options: [
                { text: 'Active digital footprints are created intentionally by the user (e.g., posting on social', outcome: 'Active digital footprints are created intentionally by the user (e.g., posting on social media.' },
                { text: 'incognito/private browsing mode makes them completely anonymous online', outcome: 'Not quite — Students often believe that "incognito/private browsing mode makes them completely anonymous.', reveals: 'incognito-private-browsing-mode-makes' },
                { text: 'cookies are active', outcome: 'Not quite — Students often believe that "incognito/private browsing mode makes them completely anonymous.', reveals: 'incognito-private-browsing-mode-makes' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_015', title: 'Data Protection and Privacy in the Digital World',
          caseStudy: { intro: 'Imagine you post a photo from your birthday party on a social media platform, then delete it the next day after a disagreement with a friend.',
            decisions: [{ prompt: 'What is the difference between active and passive digital footprints? Give one example of each.', options: [
                { text: 'Active digital footprints are data trails intentionally created by the user (e.g.,', outcome: 'Active digital footprints are data trails intentionally created by the user (e.g., posting.' },
                { text: 'confuses the two (e', outcome: 'Not quite — Students often believe that deleting a post or photo from a social media platform permanently.', reveals: 'deleting-a-post-or-photo' },
                { text: 'the photo no longer exists anywhere', outcome: 'Not quite — Students often believe that deleting a post or photo from a social media platform permanently.', reveals: 'deleting-a-post-or-photo' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_013', title: 'Use it in the wild',
          caseStudy: { intro: 'The school ISP link is down all week. A classmate says the computer lab is now \'useless — no network without internet\'. Your team still needs to share a 2 GB dataset across 30 lab PCs and use the single lab printer.',
            decisions: [{ prompt: 'Can the lab still function as a network?', options: [
                { text: 'Yes — it\'s a LAN: autonomous PCs interconnected to share files and the printer. A network needs sender, receiver, medium and a shared protocol — internet is a network OF networks, not a requirement for one. File sharing and printing run fine with the WAN link down.', outcome: 'Connectivity to the global internet is optional; local resource-sharing over agreed protocols IS the definition of a network.' },
                { text: 'No — no internet means no network; \'network\' and \'internet\' are the same thing.', outcome: 'That conflation would declare every offline office LAN \'not a network\'; the lab\'s file shares and printer prove otherwise.', reveals: 'network-equals-internet' },
                { text: 'Partly — files can be shared only by copying to pen drives, which technically forms a \'sneakernet\'.', outcome: 'Carrying drives isn\'t a computer network at all — the lab\'s existing cables and protocols already provide real-time sharing without internet.', reveals: 'sneakernet-counts-as-lan' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_015', title: 'You made it',
          caseStudy: { intro: 'Geography and ownership classify a network — LAN for a campus, MAN for a city — not the cable or the speed.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_013', difficulty: 'standard',
          question: 'A firewall is a network security system that monitors and controls incoming and.',
          hint: 'Revise c11_cs_cbse_11_006 (IP Address) for subnetting notation and c11_cs_cbse_11_011.',
          misconception: 'Students believe "If I have a good antivirus, I don\'t need a firewall" or vice versa.',
          parts: [
                { id: 'a', prompt: 'Compare signature-based and heuristic-based antivirus detection in terms of: (a) ability to detect zero-day malware, (b) false positive rate, (c) resource.', answer: '| Aspect | Signature-based | Heuristic-based |',
                  options: ['| Aspect | Signature-based | Heuristic-based |', 'justify your choice', 'If I have a good antivirus, I don\'t need a firewall', '"If I have a good antivirus, I don\'t need a firewall" or vice versa'],
                  hint: 'Revise c11_cs_cbse_11_006 (IP Address) for subnetting notation and c11_cs_cbse_11_011 (Malware) for.',
                  misconception: 'Students believe "If I have a good antivirus, I don\'t need a firewall" or vice versa.' }
          ],
            remediations: { 'if-i-have-a-good': { steps: ['Draw a two-layer diagram: Network perimeter (firewall) → Host (antivirus).', 'Trace a malware download: User clicks link → Firewall allows outbound HTTP → Server sends malicious EXE → Firewall.', 'Ask: "At which step could each tool stop the attack?" This visual trace separates network vs.', 'host inspection roles concretely.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_013', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "If I have a good antivirus, I don\'t need a firewall" or vice versa.',
          parts: [
                { id: 'a', prompt: 'Your school lab has 50 PCs. The IT admin installs a free antivirus that updates signatures once a week via manual USB.', answer: 'Evaluation: Timeliness – poor (weekly gap allows new malware)',
                  options: ['Evaluation: Timeliness – poor (weekly gap allows new malware)', 'daily manual updates', 'If I have a good antivirus, I don\'t need a firewall', '"If I have a good antivirus, I don\'t need a firewall" or vice versa'],
                  hint: 'Revise c11_cs_cbse_11_006 (IP Address) for subnetting notation and c11_cs_cbse_11_011 (Malware) for.',
                  misconception: 'Students believe "If I have a good antivirus, I don\'t need a firewall" or vice versa.' }
          ],
            remediations: { 'if-i-have-a-good': { steps: ['Draw a two-layer diagram: Network perimeter (firewall) → Host (antivirus).', 'Trace a malware download: User clicks link → Firewall allows outbound HTTP → Server sends malicious EXE → Firewall.', 'Ask: "At which step could each tool stop the attack?" This visual trace separates network vs.', 'host inspection roles concretely.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_014', difficulty: 'standard',
          question: 'Safe Browsing Practices refer to the set of proactive measures and habits (such.',
          hint: 'If stuck, revisit node c11_cs_cbse_11_012 (Phishing, Identity Theft and Cyberbullying).',
          misconception: 'Students often believe that "incognito/private browsing mode makes them completely anonymous online." They think.',
          parts: [
                { id: 'a', prompt: 'You receive an email from "support@paytm-services.com" asking you to confirm your UPI PIN by clicking a link.', answer: 'Step 1: Do not click the link',
                  options: ['Step 1: Do not click the link', 'check if it\'s real', 'incognito/private browsing mode makes them completely anonymous online', '"incognito/private browsing mode makes them completely anonymous online'],
                  hint: 'If stuck, revisit node c11_cs_cbse_11_012 (Phishing, Identity Theft and Cyberbullying) and.',
                  misconception: 'Students often believe that "incognito/private browsing mode makes them completely anonymous online." They think it hides their IP address.' }
          ],
            remediations: { 'incognito-private-browsing-mode-makes': { steps: ['Demonstrate live: open a normal browser window and an incognito window, visit a "what is my IP" site in both – show the.', 'Explain that incognito only clears local traces (history, cookies) after the window closes.', 'List what still tracks you: router logs, ISP, website server logs, Google account if signed in.', 'Have the student write a one-sentence correction: "Incognito hides my activity from other users of this device, not.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_015', difficulty: 'standard',
          question: 'Data Protection and Privacy in the Digital World refers to the principles.',
          hint: 'Review c11_cs_cbse_11_012 (Phishing, Identity Theft and Cyberbullying) and.',
          misconception: 'Students often believe that deleting a post or photo from a social media platform permanently erases it from the.',
          parts: [
                { id: 'a', prompt: 'A student downloads an image from a website labeled "free for personal use" and uses it in a school project without citing the source.', answer: 'The teacher is correct',
                  options: ['The teacher is correct', 'the photo no longer exists anywhere'],
                  hint: 'Review c11_cs_cbse_11_012 (Phishing, Identity Theft and Cyberbullying) and c11_cs_cbse_11_009.',
                  misconception: 'Students often believe that deleting a post or photo from a social media platform permanently erases it from the internet.' },
                { id: 'b', prompt: 'You receive an email claiming to be from your bank, stating your account will be closed unless you click a link and enter your PIN.', answer: 'This is phishing (a type of cyber crime)',
                  options: ['This is phishing (a type of cyber crime)', 'the photo no longer exists anywhere'],
                  hint: 'Review c11_cs_cbse_11_012 (Phishing, Identity Theft and Cyberbullying) and c11_cs_cbse_11_009.',
                  misconception: 'Students often believe that deleting a post or photo from a social media platform permanently erases it from the internet.' },
                { id: 'c', prompt: 'Compare and contrast ethical hacking and non-ethical hacking in terms of intent, authorization, and outcome. Provide a real-world example of each.', answer: 'Ethical hacking (white hat) is authorized, aims to improve security by finding',
                  options: ['Ethical hacking (white hat) is authorized, aims to improve security by finding', 'the photo no longer exists anywhere'],
                  hint: 'Review c11_cs_cbse_11_012 (Phishing, Identity Theft and Cyberbullying) and c11_cs_cbse_11_009.',
                  misconception: 'Students often believe that deleting a post or photo from a social media platform permanently erases it from the internet.' }
          ],
            remediations: { 'deleting-a-post-or-photo': { steps: ['To correct this, demonstrate the "Wayback Machine" (archive.org) by entering a known deleted page URL to show.', 'Then, have the student create a test post on a private account, delete it, and immediately try to access it via.', 'Explain that deletion only removes the pointer from the user\'s view; the data persists on the platform\'s servers and.', 'Reinforce with the NCERT line: "No Permanent Deletion!!'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
