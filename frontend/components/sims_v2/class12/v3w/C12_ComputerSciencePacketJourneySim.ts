import type { SimDef } from '../../engine/types';
import C12_ComputerSciencePacketJourneySim from '../../../simulations/c6_12/C12_ComputerSciencePacketJourneySim';

/** v3 wrapped master — C12_ComputerSciencePacketJourneySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_computersciencepacketjourneysim: SimDef = {
    id: 'v3w_c12_computersciencepacketjourneysim',
    title: 'Packet Journey',
    subtitle: 'This node covers tree topology (definition, structure as star-bus combination,.',
    classLevel: 12, subject: 'computer_science', topic: 'Tree and Hybrid Topology',
    chapters: [],
    nodeIds: ['c12_cs_cbse_02_005', 'c12_cs_cbse_02_007', 'c12_cs_cbse_02_009', 'c12_cs_cbse_01_003', 'c12_cs_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine your school wants to connect three buildings — Admin Block, Science Block, and Library — each having.', goal: 'Master Packet Journey.' },
    discovery: {
        question: 'A company uses a hybrid topology combining star and ring. The star segment connects workstations to a switch in each department; the ring segment connects.',
        options: ['Only that workstation loses connectivity', 'the whole department goes down', 'the ring breaks'],
        answer: 'Only that workstation loses connectivity',
        hook: 'Students often think "hybrid topology" means simply connecting two different topologies with a cable, without realizing.',
    },
    teaching: [
        { title: 'Tree topology is a hierarchical network.', text: 'Tree topology is a hierarchical network structure where a root node (central hub) connects to multiple levels of subordinate nodes in a branching pattern, combining characteristics of star and bus.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_cs_cbse_02_005', title: 'Tree topology is a hierarchical network.',
          scaffold: { problem: 'A school has 3 buildings (Admin, Science, Arts). Each building has 2 computer labs with 25 PCs per lab.',
            steps: [
            { text: 'Identify hierarchy levels — Root (school level) → Building switches (level 1) → Lab switches (level 2) → PCs (level 3).' },
            { text: 'Calculate total PCs — 3 buildings × 2 labs × 25 PCs = 150 PCs.' },
            { text: 'Count switches — 1 root switch + 3 building switches + (3×2=6) lab switches = 10 switches.' },
            { text: 'Count inter-switch cable segments — Root to 3 building switches = 3 segments.' },
            { text: 'Analyze failure — Science building switch is at level 1. Its failure disconnects both its lab switches and all 50 PCs.', faded: true, blankAnswer: '(a) 3 switch levels (root, building, lab), (b) 150 PCs, (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_02_007', title: 'The TCP/IP (Transmission Control.',
          scaffold: { problem: 'A student in Chennai opens a website hosted in Bengaluru. The browser uses HTTPS (port 443). The client\'s ephemeral port is 49152.',
            steps: [
            { text: 'Identify the starting point — Application layer has no data yet (SYN is a Transport layer control packet), so.' },
            { text: 'Transport layer (TCP) — builds TCP header: Source Port = 49152, Destination Port = 443, Sequence Number = ISN (e.g.,.' },
            { text: 'Internet layer (IPv4) — builds IP header: Version=4, IHL=5, DSCP=0, Total Length=40 (20 TCP + 20 IP), Identification,.' },
            { text: 'Network Access layer (Ethernet) — builds Ethernet frame: Destination MAC=00:AA:BB:CC:DD:EE (gateway), Source.' },
            { text: 'Verify — each layer adds its header (and trailer at Network Access); the payload of each layer is the entire PDU from.', faded: true, blankAnswer: 'Application: (empty) → Transport: TCP header (src port.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_02_009', title: 'Circuit switching establishes a.',
          scaffold: { problem: 'A small office has a 10 Mbps internet link. Employee A makes a VoIP call requiring 64 kbps constant for 30 minutes.',
            steps: [
            { text: 'Identify traffic requirements: VoIP = 64 kbps continuous for 1800 sec; File = 50 MB = 400 Mbits; Web = 200 kbps average.' },
            { text: 'Circuit switching scenario: Reserve 64 kbps for VoIP (always), remaining 9.936 Mbps for others.' },
            { text: 'Packet switching scenario: All share 10 Mbps dynamically. VoIP gets priority 64 kbps (negligible).' },
            { text: 'Compare: Circuit switching wastes 9.936 Mbps during VoIP silence (but VoIP is constant, so no silence).' },
            { text: 'Conclusion: For this mix, packet switching is better because web traffic is bursty and VoIP is low-rate constant;.', faded: true, blankAnswer: 'Packet switching completes all activities faster overall.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_01_003', title: 'Network devices are hardware components.',
          scaffold: { problem: 'A school computer lab has 20 computers connected to a 24‑port hub.',
            steps: [
            { text: 'Identify the problem — hub operates at Layer 1, creates a single shared collision domain; all 20 PCs contend for the.' },
            { text: 'Identify the solution — switch operates at Layer 2, learns MAC addresses, and creates a separate collision domain for.' },
            { text: 'Explain MAC learning — when PC A sends a frame to PC B, the switch records PC A\'s MAC on port 1; when PC B replies, the.' },
            { text: 'Explain collision elimination — with full‑duplex links, each port can send and receive simultaneously without.' },
            { text: 'Quantify improvement — theoretical aggregate bandwidth increases from 100 Mbps shared to 20 × 100 Mbps full‑duplex = 2.' },
            { text: 'Note limitation — broadcast traffic (ARP, DHCP) still floods all ports; broadcast domain remains one.', faded: true, blankAnswer: 'Collisions are eliminated because each switch port is a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_01_010', title: 'Network security encompasses measures.',
          scaffold: { problem: 'A school network administrator configures a stateful firewall with these rules in order: (1) Allow established/related incoming, (2) Allow.',
            steps: [
            { text: 'Identify packet direction — incoming (from external server to internal teacher).' },
            { text: 'Check rule 1 — "Allow established/related incoming." The firewall\'s state table has an entry for the teacher\'s outgoing.' },
            { text: 'Since UDP is connectionless, "established" means the firewall saw a recent outgoing packet with matching 4-tuple.' },
            { text: 'Rule 1 matches — firewall allows the packet, updates state timestamp.' },
            { text: 'Rules 2 and 3 are not evaluated (first-match policy). The video call works.', faded: true, blankAnswer: 'The firewall allows the server\'s reply packet because it.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_cs_cbse_02_007', title: 'Identify each idea',
          dissect: { specimen: 'Packet Journey', spots: [
            { id: 's1', label: 'Tree topology is a hierarchical', prompt: 'Which idea is this? — Tree topology is a hierarchical network structure where a root node (central hub).', answer: 'Tree topology is a hierarchical', options: ['Tree topology is a hierarchical', 'The TCPIP Transmission Control ProtocolInternet', 'Circuit switching establishes a dedicated', 'Network devices are hardware components'] },
            { id: 's2', label: 'The TCPIP Transmission Control ProtocolInternet', prompt: 'Which idea is this? — The TCP/IP (Transmission Control Protocol/Internet Protocol) protocol suite is a.', answer: 'The TCPIP Transmission Control ProtocolInternet', options: ['The TCPIP Transmission Control ProtocolInternet', 'Tree topology is a hierarchical', 'Circuit switching establishes a dedicated', 'Network devices are hardware components'] },
            { id: 's3', label: 'Circuit switching establishes a dedicated', prompt: 'Which idea is this? — Circuit switching establishes a dedicated end-to-end physical path between sender and.', answer: 'Circuit switching establishes a dedicated', options: ['Circuit switching establishes a dedicated', 'Tree topology is a hierarchical', 'The TCPIP Transmission Control ProtocolInternet', 'Network devices are hardware components'] },
            { id: 's4', label: 'Network devices are hardware components', prompt: 'Which idea is this? — Network devices are hardware components that connect computers and other devices to share.', answer: 'Network devices are hardware components', options: ['Network devices are hardware components', 'Tree topology is a hierarchical', 'The TCPIP Transmission Control ProtocolInternet', 'Circuit switching establishes a dedicated'] },
            { id: 's5', label: 'Network security encompasses measures to', prompt: 'Which idea is this? — Network security encompasses measures to protect network infrastructure and data from.', answer: 'Network security encompasses measures to', options: ['Network security encompasses measures to', 'Tree topology is a hierarchical', 'The TCPIP Transmission Control ProtocolInternet', 'Circuit switching establishes a dedicated'] }
          ] } }
    ],
    explore: { component: C12_ComputerSciencePacketJourneySim, prompt: 'Explore the interactive — Packet Journey' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_005', difficulty: 'standard',
          question: 'Tree topology is a hierarchical network structure where a root node (central.',
          hint: 'If unsure about any basic topology\'s structure or failure mode, immediately revisit the.',
          misconception: 'Students often think "hybrid topology" means simply connecting two different topologies with a cable, without realizing.',
          parts: [
                { id: 'a', prompt: 'A company uses a hybrid topology combining star and ring. The star segment connects workstations to a switch in each department; the ring segment connects.', answer: 'Only that workstation loses connectivity',
                  options: ['Only that workstation loses connectivity', 'the whole department goes down', 'the ring breaks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hybrid topology" means simply connecting two different topologies with a cable, without realizing that the.' },
                { id: 'b', prompt: 'Design a tree topology for a university with: 1 main campus switch (root), 4 building switches (level 1), and each building has 3 floor switches (level 2).', answer: 'Total PCs = 4 buildings × 3 floors × 20 PCs = 240 PCs',
                  options: ['Total PCs = 4 buildings × 3 floors × 20 PCs = 240 PCs', 'hybrid topology', 'extended star'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hybrid topology" means simply connecting two different topologies with a cable, without realizing that the.' },
                { id: 'c', prompt: 'Compare tree topology and hybrid (star-ring) topology on these parameters: (a) fault isolation when a non-root switch fails, (b) cabling cost for 100 nodes.', answer: 'fault isolation when a non-root switch fails, (',
                  options: ['fault isolation when a non-root switch fails, (', 'hybrid topology', 'extended star'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hybrid topology" means simply connecting two different topologies with a cable, without realizing that the.' }
          ],
            remediations: { 'hybrid-topology-means-simply-connecting': { steps: ['Revisit c12_cs_cbse_02_002 (Bus Topology) and c12_cs_cbse_02_003 (Star Topology) — explicitly compare bus backbone.', 'star backbone (point-to-point, switch-centered).', 'Re-draw tree topology from scratch: root → level-1 hubs on a bus backbone → level-2 stars.', 'Label "backbone" and "segments".'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "hybrid topology" means simply connecting two different topologies with a cable, without realizing.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Hybrid topology is always superior to tree topology because it combines the best features of multiple topologies." Provide two.', answer: 'The statement is false',
                  options: ['The statement is false', 'hybrid is always better', 'more features', 'better'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "hybrid topology" means simply connecting two different topologies with a cable, without realizing that the.' }
          ],
            remediations: { 'hybrid-topology-means-simply-connecting': { steps: ['Revisit c12_cs_cbse_02_002 (Bus Topology) and c12_cs_cbse_02_003 (Star Topology) — explicitly compare bus backbone.', 'star backbone (point-to-point, switch-centered).', 'Re-draw tree topology from scratch: root → level-1 hubs on a bus backbone → level-2 stars.', 'Label "backbone" and "segments".'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_007', difficulty: 'standard',
          question: 'The TCP/IP (Transmission Control Protocol/Internet Protocol) protocol suite is.',
          hint: 'If stuck on layer ordering or encapsulation, revisit c12_cs_cbse_02_010 (MAC vs IP.',
          misconception: 'Students often believe the TCP/IP model has 5 layers (adding Physical as a separate layer) because many textbooks show.',
          parts: [
                { id: 'a', prompt: 'An HTTP GET request is sent from a browser (port 54321) to a web server (port 80).', answer: 'Correct trace: Application layer',
                  options: ['Correct trace: Application layer', 'packet', 'IP header contains port number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the TCP/IP model has 5 layers (adding Physical as a separate layer) because many textbooks show a 5-layer hybrid.' }
          ],
            remediations: { 'the-tcp-ip-model-has': { steps: ['Revisit the layer encapsulation diagram — draw the 4-layer stack on paper, label each layer with 2 protocols and the.', 'Use the "postal analogy" mapping: Application = letter content, Transport = envelope with tracking number, Internet =.', 'Complete the table in NCERT Exercise Q2 (textbook) matching protocols to layers.', 'Re-attempt Diagnostic Questions 1 and 3 — if you still swap layer order or PDU names, watch a 5-minute animation of.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the TCP/IP model has 5 layers (adding Physical as a separate layer) because many textbooks show.',
          parts: [
                { id: 'a', prompt: 'A network administrator argues: "Since UDP is unreliable, it should never be used for any real application — always use TCP." Evaluate this claim with two.', answer: 'Correct evaluation: The claim is false',
                  options: ['Correct evaluation: The claim is false', 'UDP is for games only', 'TCP is always better for reliability', 'IP header contains port number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the TCP/IP model has 5 layers (adding Physical as a separate layer) because many textbooks show a 5-layer hybrid.' },
                { id: 'b', prompt: 'Design a new application-layer protocol for a real-time multiplayer cricket scoring app where multiple users update scores simultaneously.', answer: 'Good answer: (a) UDP —',
                  options: ['Good answer: (a) UDP —', 'IP header contains port number', 'TCP header contains IP address'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the TCP/IP model has 5 layers (adding Physical as a separate layer) because many textbooks show a 5-layer hybrid.' }
          ],
            remediations: { 'the-tcp-ip-model-has': { steps: ['Revisit the layer encapsulation diagram — draw the 4-layer stack on paper, label each layer with 2 protocols and the.', 'Use the "postal analogy" mapping: Application = letter content, Transport = envelope with tracking number, Internet =.', 'Complete the table in NCERT Exercise Q2 (textbook) matching protocols to layers.', 'Re-attempt Diagnostic Questions 1 and 3 — if you still swap layer order or PDU names, watch a 5-minute animation of.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_009', difficulty: 'standard',
          question: 'Circuit switching establishes a dedicated end-to-end physical path between.',
          hint: 'If stuck, review the definitions of bandwidth, latency, and traffic types in node.',
          misconception: 'Students often believe "circuit switching is faster because it\'s a direct line." They confuse *propagation delay* (same.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why packet switching is more efficient than circuit switching for bursty data traffic like web browsing.', answer: 'Packet switching allows multiple users to share the same link by statistically',
                  options: ['Packet switching allows multiple users to share the same link by statistically', 'packets are smaller', 'packets take different routes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "circuit switching is faster because it\'s a direct line." They confuse *propagation delay* (same for both) with.' }
          ],
            remediations: { 'circuit-switching-is-faster-because': { steps: ['Revisit the analogy: reserved railway track vs.', 'Ask student to list what happens when a train (circuit) vs.', 'a truck (packet) encounters a blockage.', 'Review the diagnostic question 2 answer — explicitly write "statistical multiplexing" and define it: "sharing a link by.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "circuit switching is faster because it\'s a direct line." They confuse *propagation delay* (same.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Packet switching is always superior to circuit switching because it uses bandwidth more efficiently." Defend or refute with two.', answer: 'Refute',
                  options: ['Refute', 'file transfer', 'circuit switching is faster', '"circuit switching is faster'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "circuit switching is faster because it\'s a direct line." They confuse *propagation delay* (same for both) with.' }
          ],
            remediations: { 'circuit-switching-is-faster-because': { steps: ['Revisit the analogy: reserved railway track vs.', 'Ask student to list what happens when a train (circuit) vs.', 'a truck (packet) encounters a blockage.', 'Review the diagnostic question 2 answer — explicitly write "statistical multiplexing" and define it: "sharing a link by.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_003', difficulty: 'standard',
          question: 'Network devices are hardware components that connect computers and other.',
          hint: 'Review OSI layer functions: Physical = bits/signals, Data Link = frames/MAC, Network =.',
          misconception: 'Students often think a switch "routes" packets using IP addresses like a router, or that a router "switches" frames.',
          parts: [
                { id: 'a', prompt: 'A school has two separate LANs in different buildings connected by a fibre link.', answer: 'A router should be placed at each end',
                  options: ['A router should be placed at each end', 'routes', 'switches'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a switch "routes" packets using IP addresses like a router, or that a router "switches" frames using MAC addresses.' },
                { id: 'b', prompt: 'A network engineer connects a legacy Token Ring network (using MAC addresses) to a modern Ethernet network (also using MAC addresses) using a device that.', answer: 'A gateway is used',
                  options: ['A gateway is used', 'router', 'routes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a switch "routes" packets using IP addresses like a router, or that a router "switches" frames using MAC addresses.' },
                { id: 'c', prompt: 'Compare the collision domain and broadcast domain count for a 24‑port hub, a 24‑port switch, and a router with 24 interfaces.', answer: 'Hub: 1 collision domain, 1 broadcast domain',
                  options: ['Hub: 1 collision domain, 1 broadcast domain', 'switch has 24 broadcast domains', 'routes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a switch "routes" packets using IP addresses like a router, or that a router "switches" frames using MAC addresses.' }
          ],
            remediations: { 'a-switch-routes-packets-using': { steps: ['Revisit the OSI model layers (Physical, Data Link, Network, Transport, Session, Presentation, Application) and write.', 'Create a comparison table with columns: Device, OSI Layer, Addressing Used, Collision Domains, Broadcast Domains,.', 'Fill it from memory, then check against textbook.', 'Practice 5 scenario questions: "Which device separates broadcast domains?" "Which device extends a 100 m Ethernet cable.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a switch "routes" packets using IP addresses like a router, or that a router "switches" frames.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A repeater can be used to connect two different network segments that use different data link protocols (e.g., Ethernet and Wi‑Fi).', answer: 'The statement is false',
                  options: ['The statement is false', 'routes', 'switches'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think a switch "routes" packets using IP addresses like a router, or that a router "switches" frames using MAC addresses.' }
          ],
            remediations: { 'a-switch-routes-packets-using': { steps: ['Revisit the OSI model layers (Physical, Data Link, Network, Transport, Session, Presentation, Application) and write.', 'Create a comparison table with columns: Device, OSI Layer, Addressing Used, Collision Domains, Broadcast Domains,.', 'Fill it from memory, then check against textbook.', 'Practice 5 scenario questions: "Which device separates broadcast domains?" "Which device extends a 100 m Ethernet cable.'] } } },
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
            remediations: { 'a-firewall-encrypts-data-or': { steps: ['Re-read NCERT Section 1.7 (Network Security) focusing on the firewall-encryption distinction table.', 'Draw a 3-column table: "Threat", "Firewall Role", "Encryption Role" with 5 rows (eavesdropping, unauthorized access,.', 'For each threat, write one sentence on what firewall does and what encryption does.', 'Attempt Diagnostic Questions 2 and 4 again — they directly test this separation.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
