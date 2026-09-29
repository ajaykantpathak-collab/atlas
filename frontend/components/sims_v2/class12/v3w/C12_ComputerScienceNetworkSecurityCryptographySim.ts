import type { SimDef } from '../../engine/types';
import C12_ComputerScienceNetworkSecurityCryptographySim from '../../../simulations/c6_12/C12_ComputerScienceNetworkSecurityCryptographySim';

/** v3 wrapped master — C12_ComputerScienceNetworkSecurityCryptographySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_computersciencenetworksecuritycryptographysim: SimDef = {
    id: 'v3w_c12_computersciencenetworksecuritycryptographysim',
    title: 'Network Security: Firewall and Encryption Basics',
    subtitle: 'This node covers firewall types (packet filter, stateful, application gateway),.',
    classLevel: 12, subject: 'computer_science', topic: 'Network Security: Firewall and Encryption Basics',
    chapters: [],
    nodeIds: ['c12_cs_cbse_01_010', 'c12_cs_cbse_12_005', 'c12_cs_cbse_01_001', 'c12_cs_cbse_01_002', 'c12_cs_cbse_01_009', 'c12_cs_cbse_12_007', 'c12_cs_cbse_12_004', 'c12_cs_cbse_12_001', 'c12_cs_cbse_12_011', 'c12_cs_cbse_12_012', 'c12_cs_cbse_01_007', 'c12_cs_cbse_01_003', 'c12_cs_cbse_01_005', 'c12_cs_cbse_01_006', 'c12_cs_cbse_01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you\'re sending a confidential letter (data packet) through a messenger (network) — you\'d want a.', goal: 'Master Network Security: Firewall and Encryption Basics.' },
    discovery: {
        question: 'Explain why symmetric encryption alone is insufficient for secure key exchange over an untrusted network, and how asymmetric encryption solves this.',
        options: ['Symmetric encryption requires both parties to already share a secret key', 'asymmetric is faster so we use it for everything', 'encrypts data'],
        answer: 'Symmetric encryption requires both parties to already share a secret key',
        hook: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based.',
    },
    teaching: [
        { title: 'Network security encompasses measures to.', text: 'Network security encompasses measures to protect network infrastructure and data from unauthorized access, misuse, or disruption; a firewall is a hardware or software system that monitors and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c12_cs_cbse_01_001', title: 'A computer network is a collection of.',
          scaffold: { problem: 'A small accounting firm has 5 accountants, each with a desktop.',
            steps: [
            { text: 'List the pain points — version conflicts (multiple copies), delayed access (waiting for email), no central backup.' },
            { text: 'Map pain point 1 (version conflicts) to Resource Sharing — a shared network folder ensures one authoritative file.' },
            { text: 'Map pain point 2 (delayed access) to Communication — real-time chat/presence lets accountants coordinate edits.' },
            { text: 'Map pain point 3 (no central backup) to Distributed Processing — a backup server (node) runs scheduled backup jobs.' },
            { text: 'Verify: Each core need addresses a distinct business problem; together they justify the network investment.', faded: true, blankAnswer: 'Resource Sharing → Centralised file server with version.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_01_002', title: 'A computer network is classified by its.',
          scaffold: { problem: 'A university has three campuses: Campus A and B are 800 m apart; Campus C is 35 km away in the same city.',
            steps: [
            { text: 'Identify geographical distances: A↔B = 800 m (<2 km), B↔C = 35 km (>5 km, <50 km).' },
            { text: 'Map distances to network categories: 800 m falls in LAN range (up to a few km); 35 km falls in MAN range (5–50 km).' },
            { text: 'Analyze ownership: A↔B is on university-owned land → university can lay its own fibre (private ownership).' },
            { text: 'Determine media: A↔B can use multimode fibre (MMF) or Cat6a for 10 Gbps; B↔C will use single-mode fibre (SMF) or Metro.' },
            { text: 'Classify: A↔B is a LAN link (part of Campus Area Network). B↔C is a MAN link (provider-managed Metro Ethernet).', faded: true, blankAnswer: 'A↔B = LAN (private fibre, 800 m, 10 Gbps). B↔C = MAN.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_01_009', title: 'Client-Server architecture is a.',
          scaffold: { problem: 'A school wants to deploy a digital attendance system. Teachers mark attendance on tablets; data must sync to a central database accessible.',
            steps: [
            { text: 'Identify requirements — centralized data ownership (principal needs authoritative record), low device count (50),.' },
            { text: 'Map to Client-Server — tablets = clients, old PC = server (database + auth). Centralized control matches requirement.' },
            { text: 'Map to P2P — each tablet would store full attendance database; sync conflicts when two teachers edit same class; no.' },
            { text: 'Evaluate scalability — 50 clients is trivial for a simple server; P2P adds complexity (conflict resolution, discovery).' },
            { text: 'Recommend Client-Server — because (a) single source of truth for attendance, (b) simple backup (one database file), (c).', faded: true, blankAnswer: 'Client-Server architecture is recommended. Justifications:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_12_007', title: 'Data protection and privacy in the.',
          scaffold: { problem: 'A student registers on an online learning platform. The registration form asks for: full name, email, phone number, date of birth, Aadhaar.',
            steps: [
            { text: 'Identify the stated purpose — "providing learning services" (account creation, course access, progress tracking).' },
            { text: 'List each field and map to purpose: name/email/phone = account recovery & communication (necessary); date of birth =.' },
            { text: 'Apply data minimization — collect only what is adequate, relevant, and limited to what is necessary.' },
            { text: 'Consider legal context — Aadhaar Act restricts Aadhaar usage to subsidies/services; mother\'s maiden name is sensitive.' },
            { text: 'Conclude — Excessive fields: Aadhaar number, mother\'s maiden name. Favorite color is unnecessary but not high-risk.', faded: true, blankAnswer: 'Excessive fields: Aadhaar number (legal restriction, not.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_cs_cbse_12_005', title: 'Identify each idea',
          dissect: { specimen: 'Network Security: Firewall and Encryption Basics', spots: [
            { id: 's1', label: 'Network security encompasses measures to', prompt: 'Which idea is this? — Network security encompasses measures to protect network infrastructure and data from.', answer: 'Network security encompasses measures to', options: ['Network security encompasses measures to', 'A firewall is a network', 'A computer network is a', 'A computer network is classified'] },
            { id: 's2', label: 'A firewall is a network', prompt: 'Which idea is this? — A firewall is a network security system that monitors and controls incoming and outgoing.', answer: 'A firewall is a network', options: ['A firewall is a network', 'Network security encompasses measures to', 'A computer network is a', 'A computer network is classified'] },
            { id: 's3', label: 'A computer network is a', prompt: 'Which idea is this? — A computer network is a collection of interconnected computing devices (nodes) that can.', answer: 'A computer network is a', options: ['A computer network is a', 'Network security encompasses measures to', 'A firewall is a network', 'A computer network is classified'] },
            { id: 's4', label: 'A computer network is classified', prompt: 'Which idea is this? — A computer network is classified by its geographical span into four primary types: PAN.', answer: 'A computer network is classified', options: ['A computer network is classified', 'Network security encompasses measures to', 'A firewall is a network', 'A computer network is a'] },
            { id: 's5', label: 'Client-Server architecture is a distributed', prompt: 'Which idea is this? — Client-Server architecture is a distributed application structure that partitions tasks.', answer: 'Client-Server architecture is a distributed', options: ['Client-Server architecture is a distributed', 'Network security encompasses measures to', 'A firewall is a network', 'A computer network is a'] },
            { id: 's6', label: 'Data protection and privacy in', prompt: 'Which idea is this? — Data protection and privacy in the digital world refers to the principles, practices, and.', answer: 'Data protection and privacy in', options: ['Data protection and privacy in', 'Network security encompasses measures to', 'A firewall is a network', 'A computer network is a'] }
          ] } }
    ],
    explore: { component: C12_ComputerScienceNetworkSecurityCryptographySim, prompt: 'Explore the interactive — Network Security: Firewall and Encryption Basics' },
    challenges: [
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
                  options: ['A firewall is a network security system that monitors and controls incoming and outgoing', 'Network security encompasses measures to protect network infrastructure and data from', 'A computer network is a collection of interconnected computing devices (nodes) that can', 'A computer network is classified by its geographical span into four primary types: PAN'],
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
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_001', difficulty: 'standard',
          question: 'A computer network is a collection of interconnected computing devices (nodes).',
          hint: 'If the student cannot articulate why they would want devices to communicate, revisit the.',
          misconception: 'Students often equate "computer network" with "the Internet" or "Wi-Fi".',
          parts: [
                { id: 'a', prompt: 'What are the three fundamental needs that motivate the creation of a computer network?', answer: 'The three fundamental needs are: (1) Resource sharing',
                  options: ['The three fundamental needs are: (1) Resource sharing', 'sharing files', 'internet access'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "computer network" with "the Internet" or "Wi-Fi".' },
                { id: 'b', prompt: 'A student says: "A computer network is just two or more computers connected by a cable." Explain why this definition is incomplete.', answer: 'The definition misses protocols',
                  options: ['The definition misses protocols', 'protocols', 'communication rules'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "computer network" with "the Internet" or "Wi-Fi".' },
                { id: 'c', prompt: 'Compare and contrast a standalone computer and a networked computer in terms of: (a) software installation and updates, (b) data backup strategy, (c) failure.', answer: '| Aspect | Standalone Computer | Networked Computer |',
                  options: ['| Aspect | Standalone Computer | Networked Computer |', 'networked is better in all ways'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "computer network" with "the Internet" or "Wi-Fi".' }
          ],
            remediations: { 'students-often-equate-computer-network': { steps: ['If the student exhibits the above misconception: (1) Set up a physical demo: connect two laptops with a single Ethernet.', '(2) Ask: "Is this a network?', 'Why?" Force the student to articulate: nodes, link, protocol (TCP/IP), addressing.', '(3) Revisit the definition: highlight "interconnected", "communicate", "share resources" — N/A require internet.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_002', difficulty: 'standard',
          question: 'A computer network is classified by its geographical span into four primary.',
          hint: 'Revisit the definition and need for computer networks in node c12_cs_cbse_01_001 — focus.',
          misconception: 'Students frequently believe "Wi-Fi = WAN" because Wi-Fi connects to the internet.',
          parts: [
                { id: 'a', prompt: 'A student says: "My home Wi-Fi network connecting my laptop, phone, and smart TV is a WAN because it connects to the internet." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'accessing the internet', 'being a WAN'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe "Wi-Fi = WAN" because Wi-Fi connects to the internet.' },
                { id: 'b', prompt: 'Analyze this scenario: "A wearable fitness tracker syncs data to a smartphone via Bluetooth. The smartphone uploads the data to a cloud server over 4G.', answer: 'tracker↔phone, (',
                  options: ['tracker↔phone, (', 'city-wide = MAN', '"city-wide = MAN" but cellular architecture is fundamentally WAN'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe "Wi-Fi = WAN" because Wi-Fi connects to the internet.' }
          ],
            remediations: { 'students-frequently-believe-wi-fi': { steps: ['Revisit the distance-line activity in the Walkthrough — physically draw 0 m, 10 m, 1 km, 50 km, 1000 km on paper and.', 'For each example, write: who owns the cables/airlink? (you / your school / telecom / multiple telecoms).', 'Watch a 5-minute video on "Metro Ethernet vs. IP VPN" to see provider-owned vs. customer-owned distinction.', 'Re-attempt Diagnostic Questions 2 and 4 — if you still mislabel cellular as MAN, re-read the "cellular architecture =.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently believe "Wi-Fi = WAN" because Wi-Fi connects to the internet.',
          parts: [
                { id: 'a', prompt: 'Analyze this scenario: "A wearable fitness tracker syncs data to a smartphone via Bluetooth. The smartphone uploads the data to a cloud server over 4G.', answer: 'tracker↔phone, (',
                  options: ['tracker↔phone, (', 'city-wide = MAN', '"city-wide = MAN" but cellular architecture is fundamentally WAN'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently believe "Wi-Fi = WAN" because Wi-Fi connects to the internet.' }
          ],
            remediations: { 'students-frequently-believe-wi-fi': { steps: ['Revisit the distance-line activity in the Walkthrough — physically draw 0 m, 10 m, 1 km, 50 km, 1000 km on paper and.', 'For each example, write: who owns the cables/airlink? (you / your school / telecom / multiple telecoms).', 'Watch a 5-minute video on "Metro Ethernet vs. IP VPN" to see provider-owned vs. customer-owned distinction.', 'Re-attempt Diagnostic Questions 2 and 4 — if you still mislabel cellular as MAN, re-read the "cellular architecture =.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_009', difficulty: 'standard',
          question: 'Client-Server architecture is a distributed application structure that.',
          hint: 'If stuck, revisit c12_cs_cbse_01_001 (Introduction to Computer Networks) and list three.',
          misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application.',
          parts: [
                { id: 'a', prompt: 'A startup wants to build a real-time multiplayer game for 10,000 concurrent players with low latency. They have limited budget for server infrastructure.', answer: 'Recommend Client-Server with cloud-based auto-scaling game servers',
                  options: ['Recommend Client-Server with cloud-based auto-scaling game servers', 'Peer-to-Peer means no server at all', 'P2P has zero infrastructure cost'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application server* with the absence.' },
                { id: 'b', prompt: 'Compare the scalability behavior of Client-Server vs. P2P as the number of users increases from 100 to 1,000,000.', answer: 'Client-Server: Server bandwidth grows linearly with users (O(n))',
                  options: ['Client-Server: Server bandwidth grows linearly with users (O(n))', 'P2P scales infinitely with no cost', 'Peer-to-Peer means no server at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application server* with the absence.' }
          ],
            remediations: { 'peer-to-peer-means-no': { steps: ['Revisit the distinction between *data plane* and *control plane* using the BitTorrent example — identify which steps.', 'Draw a sequence diagram for a torrent download showing: .torrent file → tracker HTTP request → peer list → peer.', 'Ask: "If the tracker goes down, can existing peers still trade pieces?', 'Re-attempt Diagnostic Question 6 with this diagram.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Blockchain networks like Bitcoin use a pure Peer-to-Peer architecture, so they have no centralization risks." Defend or refute with.', answer: 'Refute',
                  options: ['Refute', 'Peer-to-Peer means no server at all', 'P2P has zero infrastructure cost', 'P2P works even if all known peers are offline'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application server* with the absence.' },
                { id: 'b', prompt: 'Compare the scalability behavior of Client-Server vs. P2P as the number of users increases from 100 to 1,000,000.', answer: 'Client-Server: Server bandwidth grows linearly with users (O(n))',
                  options: ['Client-Server: Server bandwidth grows linearly with users (O(n))', 'P2P scales infinitely with no cost', 'Peer-to-Peer means no server at all', 'P2P has zero infrastructure cost'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application server* with the absence.' }
          ],
            remediations: { 'peer-to-peer-means-no': { steps: ['Revisit the distinction between *data plane* and *control plane* using the BitTorrent example — identify which steps.', 'Draw a sequence diagram for a torrent download showing: .torrent file → tracker HTTP request → peer list → peer.', 'Ask: "If the tracker goes down, can existing peers still trade pieces?', 'Re-attempt Diagnostic Question 6 with this diagram.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_12_007', difficulty: 'standard',
          question: 'Data protection and privacy in the digital world refers to the principles,.',
          hint: 'If stuck, revisit c12_cs_cbse_12_004 (Eavesdropping and Man-in-the-Middle Attacks) and.',
          misconception: 'Students often believe that **using HTTPS (the padlock icon) alone guarantees complete privacy**.',
          parts: [
                { id: 'a', prompt: 'A school uses a web-based attendance system that transmits student roll numbers and timestamps over HTTP.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', '**using HTTPS (the padlock icon) alone guarantees complete privacy**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that **using HTTPS (the padlock icon) alone guarantees complete privacy**.' }
          ],
            remediations: { 'using-https-the-padlock-icon': { steps: ['If a student confuses HTTPS with full privacy, follow this remediation: 1.', 'Revisit **c12_cs_cbse_12_005 (Firewall and Antivirus Software)** and **c12_cs_cbse_12_006 (Safe Browsing Practices)**.', 'Conduct a live demo: Open a phishing site with a valid padlock (e.g., a typo-squatted domain) and show the certificate.', 'Assign a tracing exercise: Use browser dev tools (Network tab) to capture a login request over HTTPS, then show the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
