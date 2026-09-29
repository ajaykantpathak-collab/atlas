import type { SimDef } from '../../engine/types';
import C12_ComputerScienceSoftwareTestingUnitSim from '../../../simulations/c6_12/C12_ComputerScienceSoftwareTestingUnitSim';

/** v3 wrapped master — C12_ComputerScienceSoftwareTestingUnitSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_computersciencesoftwaretestingunitsim: SimDef = {
    id: 'v3w_c12_computersciencesoftwaretestingunitsim',
    title: 'Eavesdropping and Man-in-the-Middle Attacks',
    subtitle: 'This node covers definitions, mechanisms, differences (eavesdropping vs. snooping vs.',
    classLevel: 12, subject: 'computer_science', topic: 'Eavesdropping and Man-in-the-Middle Attacks',
    chapters: [],
    nodeIds: ['c12_cs_cbse_12_004', 'c12_cs_cbse_12_002', 'c12_cs_cbse_12_005', 'c12_cs_cbse_12_009', 'c12_cs_cbse_12_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are sitting in a café using the free "Cafe_Free_WiFi" to check your bank balance.', goal: 'Master Eavesdropping and Man-in-the-Middle Attacks.' },
    discovery: {
        question: 'Explain in your own words why a Trojan horse is **not** considered a virus or a worm, even though it can cause similar damage.',
        options: ['**Correct answer:** A Trojan does not self-replicate', 'Trojans are viruses', 'Trojans spread like worms'],
        answer: '**Correct answer:** A Trojan does not self-replicate',
        hook: '**Misconception:** "All malware that steals data is spyware, and all malware that demands money is ransomware." **Why.',
    },
    teaching: [
        { title: 'Eavesdropping is the unauthorized real-time.', text: 'Eavesdropping is the unauthorized real-time interception and monitoring of private communications (such as VoIP calls, instant messages, video conferences, or fax transmissions) between two entities.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_cs_cbse_12_004', title: 'Eavesdropping is the unauthorized.',
          scaffold: { problem: 'Rahul connects to "Airport_Free_WiFi" (open, no password) at Delhi Airport.',
            steps: [
            { text: 'Identify the attack surface — open Wi-Fi means all traffic is broadcast in the clear; no link-layer encryption (WPA2/3).' },
            { text: 'Recognize the protocol vulnerability — HTTP sends headers (including `Cookie: sessionid=...`) in plaintext; no.' },
            { text: 'Attacker\'s tool — `tcpdump` in promiscuous mode captures every packet on the wireless channel; filter `tcp port 80`.' },
            { text: 'Attacker extracts the session cookie value and injects it into their own browser → session hijacking (impersonation).' },
            { text: 'Prevention — Rahul should have used HTTPS (forces TLS encryption of headers/body) or a VPN (encrypts all traffic from.', faded: true, blankAnswer: 'Attacker captures session cookie via passive sniffing of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_12_002', title: 'Malware (malicious software) is any.',
          scaffold: { problem: 'A student downloads a "Free Game" from an unofficial website. After installation, the game works normally, but the student notices: (1) new.',
            steps: [
            { text: 'Identify the delivery vector — user voluntarily downloaded and installed a "free game" from an untrusted source →.' },
            { text: 'Observe the payload — unwanted toolbars, search redirection, pop-up ads → matches **Adware** behavior (revenue via.' },
            { text: 'Check for self-replication — no evidence the program copies itself to other files or spreads across the network → rules.' },
            { text: 'Check for data theft or ransom demand — no encryption, no credential stealing reported → rules out **Ransomware** and.' },
            { text: 'Synthesize — the core deception is Trojan (fake game), the observable payload is Adware.', faded: true, blankAnswer: 'Trojan-delivered Adware (primary: Trojan; payload: Adware)' }
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
        { type: 'scaffold', nodeId: 'c12_cs_cbse_12_009', title: 'Intellectual Property Rights (IPR) are.',
          scaffold: { problem: 'Riya writes a Python script for a college project. She wants to prevent others from copying her code and selling it.',
            steps: [
            { text: 'Identify the creation — a computer program (source code) is a literary work under the Copyright Act.' },
            { text: 'Recall that copyright arises automatically upon creation in a tangible form; no registration is mandatory.' },
            { text: 'Determine the additional step — voluntary registration with the Copyright Office provides prima facie evidence in court.' },
            { text: 'Conclude that copyright is the applicable IPR, and registration strengthens enforcement.' },
            { text: 'Verify: Patent would not apply because it\'s not an invention with technical effect; trademark does not protect code.', faded: true, blankAnswer: 'Copyright applies automatically; voluntary registration.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_12_010', title: 'Open Source Software (OSS) is software.',
          scaffold: { problem: 'Riya has written a data visualization library in Python. She wants to publish it on PyPI.',
            steps: [
            { text: 'Identify the key requirements: permissive use (allows proprietary derivatives), attribution required, no patent.' },
            { text: 'Compare GPL: copyleft forces derivatives to be GPL — violates requirement (1).' },
            { text: 'Compare Apache 2.0: permissive, requires attribution, includes explicit patent grant and retaliation clause — adds.' },
            { text: 'Compare MIT: permissive, requires only attribution, no patent clauses — satisfies all three requirements.' },
            { text: 'Conclude MIT is the best fit.', faded: true, blankAnswer: 'MIT License' }
            ] } },
        { type: 'dissect', nodeId: 'c12_cs_cbse_12_002', title: 'Identify each idea',
          dissect: { specimen: 'Eavesdropping and Man-in-the-Middle Attacks', spots: [
            { id: 's1', label: 'Eavesdropping is the unauthorized real-time', prompt: 'Which idea is this? — Eavesdropping is the unauthorized real-time interception and monitoring of private.', answer: 'Eavesdropping is the unauthorized real-time', options: ['Eavesdropping is the unauthorized real-time', 'Malware malicious software is any', 'A firewall is a network', 'Intellectual Property Rights IPR are'] },
            { id: 's2', label: 'Malware malicious software is any', prompt: 'Which idea is this? — Malware (malicious software) is any program deliberately designed to infiltrate, damage,.', answer: 'Malware malicious software is any', options: ['Malware malicious software is any', 'Eavesdropping is the unauthorized real-time', 'A firewall is a network', 'Intellectual Property Rights IPR are'] },
            { id: 's3', label: 'A firewall is a network', prompt: 'Which idea is this? — A firewall is a network security system that monitors and controls incoming and outgoing.', answer: 'A firewall is a network', options: ['A firewall is a network', 'Eavesdropping is the unauthorized real-time', 'Malware malicious software is any', 'Intellectual Property Rights IPR are'] },
            { id: 's4', label: 'Intellectual Property Rights IPR are', prompt: 'Which idea is this? — Intellectual Property Rights (IPR) are legal rights that protect creations of the mind,.', answer: 'Intellectual Property Rights IPR are', options: ['Intellectual Property Rights IPR are', 'Eavesdropping is the unauthorized real-time', 'Malware malicious software is any', 'A firewall is a network'] },
            { id: 's5', label: 'Open Source Software OSS is', prompt: 'Which idea is this? — Open Source Software (OSS) is software whose source code is made freely available for.', answer: 'Open Source Software OSS is', options: ['Open Source Software OSS is', 'Eavesdropping is the unauthorized real-time', 'Malware malicious software is any', 'A firewall is a network'] }
          ] } }
    ],
    explore: { component: C12_ComputerScienceSoftwareTestingUnitSim, prompt: 'Explore the interactive — Eavesdropping and Man-in-the-Middle Attacks' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_004', difficulty: 'standard',
          question: 'Eavesdropping is the unauthorized real-time interception and monitoring of.',
          hint: 'Review NCERT Section 12.5 (HTTP vs HTTPS) and the "Network Security Threats" summary in.',
          misconception: 'Students frequently conflate **eavesdropping**, **snooping**, and **Man-in-the-Middle** as the same thing — "someone.',
          parts: [
                { id: 'a', prompt: 'You are on a public Wi-Fi network (no password). You open a website using `http://example.com`. An attacker on the same network captures your session cookie.', answer: 'Attack: **Eavesdropping** (passive sniffing)',
                  options: ['Attack: **Eavesdropping** (passive sniffing)', 'shows confusion between passive sniffing and active interception'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently conflate **eavesdropping**, **snooping**, and **Man-in-the-Middle** as the same thing — "someone listening to my data.".' }
          ],
            remediations: { 'students-frequently-conflate-eavesdropping': { steps: ['Have the student draw a three-column table: Attack | Passive/Active | Real-time?', '| Fill for Eavesdropping, Snooping, MitM.', 'Use a virtual lab (two VMs + attacker VM) to run `arpspoof` and `tcpdump` — observe ARP table changes (`arp -a`.', 'Revisit the NCERT distinction: "Eavesdropping is real-time interception...'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_002', difficulty: 'standard',
          question: 'Malware (malicious software) is any program deliberately designed to.',
          hint: 'If unclear on "executable file" or "user execution", review basic file types and OS.',
          misconception: '**Misconception:** "All malware that steals data is spyware, and all malware that demands money is ransomware." **Why.',
          parts: [
                { id: 'a', prompt: 'A student writes: "A worm is a type of virus that spreads faster." Is this statement correct? Answer in one sentence.', answer: '**Correct answer:** No, a worm is fundamentally different from a virus',
                  options: ['**Correct answer:** No, a worm is fundamentally different from a virus', 'worms are just faster viruses'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "All malware that steals data is spyware, and all malware that demands money is ransomware." **Why it\'s wrong:**.' },
                { id: 'b', prompt: 'Explain in your own words why a Trojan horse is **not** considered a virus or a worm, even though it can cause similar damage.', answer: '**Correct answer:** A Trojan does not self-replicate',
                  options: ['**Correct answer:** A Trojan does not self-replicate', 'Trojans are viruses', 'Trojans spread like worms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "All malware that steals data is spyware, and all malware that demands money is ransomware." **Why it\'s wrong:**.' },
                { id: 'c', prompt: 'A company\'s IT team discovers a malware that: (a) encrypts all database files, (b) displays a ransom note demanding ₹50,000 in cryptocurrency, (c) spreads to.', answer: '**Correct answer:**',
                  options: ['**Correct answer:**', '(ignoring ransom payload) or solely as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "All malware that steals data is spyware, and all malware that demands money is ransomware." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-all-malware-that-steals': { steps: ['**Revisit the propagation axis:** Draw a 2×2 table on paper: rows = "Requires host file?" (Yes/No), columns = "Requires.', 'Place Virus (Yes, Yes), Worm (No, No), Trojan (N/A — no replication, but requires human install), Ransomware (varies),.', '**Re-read NCERT 12.2.1–12.2.5** and highlight every verb describing propagation: "copies/inserts its code", "replicates.', '**Re-diagnostic:** Take the 6 diagnostic questions again.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_005', difficulty: 'standard',
          question: 'A firewall is a network security system that monitors and controls incoming and.',
          hint: 'If stuck, re-read the "Malware" and "Eavesdropping and Man-in-the-Middle Attacks".',
          misconception: 'Students often believe a firewall "scans for viruses" and an antivirus "blocks hackers from the network." This.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A firewall is a network security system that monitors and controls incoming and outgoing',
                  options: ['A firewall is a network security system that monitors and controls incoming and outgoing', 'Eavesdropping is the unauthorized real-time interception and monitoring of private', 'Malware (malicious software) is any program deliberately designed to infiltrate, damage,', 'Intellectual Property Rights (IPR) are legal rights that protect creations of the mind,'],
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
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_009', difficulty: 'standard',
          question: 'Intellectual Property Rights (IPR) are legal rights that protect creations of.',
          hint: 'Revisit c12_cs_cbse_12_007 (Data Protection) and c12_cs_cbse_12_008 (Cyber Laws) to.',
          misconception: 'Students often think that copyright, patent, and trademark are interchangeable or that obtaining one automatically.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Intellectual Property Rights (IPR) are legal rights that protect creations of the mind,',
                  options: ['Intellectual Property Rights (IPR) are legal rights that protect creations of the mind,', 'Eavesdropping is the unauthorized real-time interception and monitoring of private', 'Malware (malicious software) is any program deliberately designed to infiltrate, damage,', 'A firewall is a network security system that monitors and controls incoming and outgoing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that copyright, patent, and trademark are interchangeable or that obtaining one automatically covers the others.' }
          ],
            remediations: { 'copyright': { steps: ['If a student confuses the three IPRs, have them create a three-column table with headers: "What it protects", "Example.', 'Fill it using the NCERT textbook or official IP India website.', 'Then give them three mini-cases: (1) a poem, (2) a new encryption method, (3) a startup logo.', 'Ask them to assign the correct IPR and justify.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that copyright, patent, and trademark are interchangeable or that obtaining one automatically.',
          parts: [
                { id: 'a', prompt: 'A company uses an open-source library (licensed under GPL) in their proprietary software without releasing the source code.', answer: 'Yes, it violates the GPL license',
                  options: ['Yes, it violates the GPL license', 'open source means free to use'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that copyright, patent, and trademark are interchangeable or that obtaining one automatically covers the others.' }
          ],
            remediations: { 'copyright': { steps: ['If a student confuses the three IPRs, have them create a three-column table with headers: "What it protects", "Example.', 'Fill it using the NCERT textbook or official IP India website.', 'Then give them three mini-cases: (1) a poem, (2) a new encryption method, (3) a startup logo.', 'Ask them to assign the correct IPR and justify.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_010', difficulty: 'standard',
          question: 'Open Source Software (OSS) is software whose source code is made freely.',
          hint: 'Revisit c12_cs_cbse_12_009 (Intellectual Property Rights) and focus on the copyright.',
          misconception: 'Students often believe "open source means free of cost" and "all open source licenses are basically the same." They.',
          parts: [
                { id: 'a', prompt: 'A student finds an MIT-licensed library on GitHub, modifies it, and wants to include the modified version in a commercial closed-source application they plan.', answer: 'Yes, it is allowed',
                  options: ['Yes, it is allowed', 'No, because MIT requires open sourcing the whole app', 'open source means free of cost'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "open source means free of cost" and "all open source licenses are basically the same." They write in exams: "GPL,.' }
          ],
            remediations: { 'open-source-means-free-of': { steps: ['Revisit the definition of "derivative work" and "distribution/conveyance" in copyright law (use node c12_cs_cbse_12_009.', 'Create a three-column table: License | Copyleft?', '| Allows Proprietary Derivatives?', 'Fill it from memory, then check against reference.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "open source means free of cost" and "all open source licenses are basically the same." They.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "Using GPL-licensed code in a proprietary project is never allowed." Provide a nuanced answer covering static linking,.', answer: 'The statement is false',
                  options: ['The statement is false', 'open source means free of cost', 'all open source licenses are basically the same', 'GPL, MIT, and Apache all allow free use, so they are equivalent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "open source means free of cost" and "all open source licenses are basically the same." They write in exams: "GPL,.' }
          ],
            remediations: { 'open-source-means-free-of': { steps: ['Revisit the definition of "derivative work" and "distribution/conveyance" in copyright law (use node c12_cs_cbse_12_009.', 'Create a three-column table: License | Copyleft?', '| Allows Proprietary Derivatives?', 'Fill it from memory, then check against reference.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
