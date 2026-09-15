import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch03_p2: SimDef = {
    id: 'v3_c12_ip_ch03_p2',
    title: 'Introduction to Computer Networks · Part 2/2',
    subtitle: 'The cable was hardware — the protocols made it a network',
    classLevel: 12, subject: 'informatics_practices', topic: 'Introduction to Computer Networks · Part 2/2',
    chapters: ['c12_ip_ch03'],
    nodeIds: ['c12_ip_cbse_03_007', 'c12_ip_cbse_03_008', 'c12_ip_cbse_03_009', 'c12_ip_cbse_03_010', 'c12_ip_cbse_03_011', 'c12_ip_cbse_03_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Network planner', intro: 'Fifty computers, one printer, one internet line — the network is the agreement that lets them share.', goal: 'Define a network by function — nodes, links, protocols, and resource sharing over mere connection.' },
    discovery: {
        question: 'Two laptops joined by one Ethernet cable — is that a network? Not until something invisible agrees to the conversation. What\'s missing?',
        options: ['Protocols and configuration — addressing, TCP/IP, sharing services; the cable is only the medium, the rules make it a network', 'A bigger cable', 'Internet', 'A password'],
        answer: 'Protocols and configuration — addressing, TCP/IP, sharing services; the cable is only the medium, the rules make it a network',
        hook: 'A network is defined by function, not wires — one printer serving thirty PCs is the purpose made visible. And \'network\' vs \'distributed system\' is the transparency line: in a network you know there are many machines; a distributed system hides them behind one face.',
    },
    teaching: [
        { title: 'MAC address vs IP address: physical and logical addressing', text: 'A MAC (Media Access Control) address is a 48-bit hardware identifier permanently assigned to a network interface controller (NIC) by its manufacturer, operating at the Data Link Layer (Layer 2) for.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Wire a school lab for sharing: list the hardware AND the protocol layer that makes one printer serve thirty machines, then weigh connection against purpose.',
        labels: ['MAC address vs IP', 'Client-server model: request-response architecture', 'Circuit switching vs packet', 'DNS: domain name resolution', 'Network protocols: TCP, UDP,', 'Network security basics: firewall'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_007', title: 'MAC address vs IP address: physical and logical addressing',
          caseStudy: { intro: 'Imagine you\'re sending a letter from Delhi to Mumbai. The postal system needs two kinds of addresses: your permanent home address (like a MAC address — fixed.',
            decisions: [{ prompt: 'What is the fundamental difference between how a MAC address and an IP address are assigned to a device?', options: [
                { text: 'A MAC address is permanently assigned by the hardware manufacturer during production and', outcome: 'A MAC address is permanently assigned by the hardware manufacturer during production and burned.' },
                { text: 'both are assigned by the ISP', outcome: 'Not quite — Students often believe that "MAC address is for LAN, IP address is for WAN" — implying they operate.', reveals: 'mac-address-is-for-lan' },
                { text: 'both are configured by the user', outcome: 'Not quite — Students often believe that "MAC address is for LAN, IP address is for WAN" — implying they operate.', reveals: 'mac-address-is-for-lan' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_008', title: 'Client-server model: request-response architecture',
          caseStudy: { intro: 'Imagine you order food via a delivery app: you (client) send a request (order details) to the restaurant (server) which processes it and sends back a response.',
            decisions: [{ prompt: 'In the client-server model, which entity *initiates* the communication by sending the first message?', options: [
                { text: 'The client initiates communication by sending the first message (the request)', outcome: 'The client initiates communication by sending the first message (the request).' },
                { text: 'the server', outcome: 'Not quite — Students often believe "the server connects to the client" because in daily language we say "the.', reveals: 'the-server-connects-to-the' },
                { text: 'both simultaneously', outcome: 'Not quite — Students often believe "the server connects to the client" because in daily language we say "the.', reveals: 'the-server-connects-to-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_009', title: 'Circuit switching vs packet switching',
          caseStudy: { intro: 'Imagine you\'re calling a friend on a landline (circuit switched) versus sending a WhatsApp voice note (packet switched).',
            decisions: [{ prompt: 'What are the three distinct phases of a circuit-switched communication session, and what happens in each phase?', options: [
                { text: 'The three phases are: (1) Connection Setup', outcome: 'The three phases are: (1) Connection Setup — a dedicated path is established end-to-end via.' },
                { text: 'setup, routing, teardown', outcome: 'Not quite — Students believe "packet switching = Internet, circuit switching = telephone" and that they are.', reveals: 'packet-switching-internet' },
                { text: 'packet switching = Internet, circuit switching = telephone', outcome: 'Not quite — Students believe "packet switching = Internet, circuit switching = telephone" and that they are.', reveals: 'packet-switching-internet' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_010', title: 'DNS: domain name resolution to IP addresses',
          caseStudy: { intro: 'Imagine you type "www.cbse.gov.in" in your browser — how does your computer find the IP address of the CBSE server?',
            decisions: [{ prompt: 'What is the primary function of a recursive resolver in the DNS resolution process?', options: [
                { text: 'A recursive resolver accepts a DNS query from a client (stub resolver) and performs the', outcome: 'A recursive resolver accepts a DNS query from a client (stub resolver) and performs the entire.' },
                { text: 'it only queries the root server', outcome: 'Not quite — Students believe the root server returns the IP address of the final domain (e.g., "root knows.', reveals: 'the-root-server-returns-the' },
                { text: 'it caches only', outcome: 'Not quite — Students believe the root server returns the IP address of the final domain (e.g., "root knows.', reveals: 'the-root-server-returns-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_011', title: 'Network protocols: TCP, UDP, HTTP, FTP and their roles',
          caseStudy: { intro: 'Imagine you\'re video-calling a friend on WhatsApp while simultaneously downloading a large game update on Steam and browsing a website.',
            decisions: [{ prompt: 'What is the fundamental difference between TCP and UDP in terms of connection establishment and reliability guarantees?', options: [
                { text: 'TCP is connection-oriented: it establishes a connection via a three-way handshake (SYN,', outcome: 'TCP is connection-oriented: it establishes a connection via a three-way handshake (SYN, SYN-ACK.' },
                { text: 'UDP also establishes a connection', outcome: 'Not quite — Students often believe "TCP is always better because it\'s reliable" and "UDP is only for.', reveals: 'tcp-is-always-better-because' },
                { text: 'TCP does not guarantee order', outcome: 'Not quite — Students often believe "TCP is always better because it\'s reliable" and "UDP is only for.', reveals: 'tcp-is-always-better-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_012', title: 'Network security basics: firewall and encryption overview',
          caseStudy: { intro: 'Imagine you\'re sending a confidential email from your school computer to a teacher — how does the network ensure no one reads or tampers with it en route?',
            decisions: [{ prompt: 'What is the fundamental difference between a packet-filtering firewall and a stateful inspection firewall in terms of connection tracking?', options: [
                { text: 'A packet-filtering firewall examines each packet in isolation (source/destination IP,', outcome: 'A packet-filtering firewall examines each packet in isolation (source/destination IP, port.' },
                { text: 'both track connections', outcome: 'Not quite — Students believe "firewall encrypts data" or "encryption blocks hackers." They confuse *access.', reveals: 'firewall-encrypts-data-or-encryption' },
                { text: 'filtering', outcome: 'Not quite — Students believe "firewall encrypts data" or "encryption blocks hackers." They confuse *access.', reveals: 'firewall-encrypts-data-or-encryption' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A campus IT proposal describes the college\'s three buildings — linked by the college\'s own fibre over 2 km — as a \'MAN deployment\' to justify leasing telecom circuits.',
            decisions: [{ prompt: 'Is the classification right?', options: [
                { text: 'No — it\'s a LAN: 2 km with the organisation owning the medium end-to-end is local by scope and private by ownership; MAN means a city-scale 5–50 km reach, usually on leased lines — calling it one inflates the design and the bill.', outcome: 'The chapter\'s test is geography plus who owns the wire: private fibre across a campus is a LAN whatever the building count; the proposal spent MAN money on LAN facts.' },
                { text: 'Yes — three buildings means \'metropolitan\' by definition.', outcome: 'Building count isn\'t the classifier — scope and medium are; a multi-building campus on owned fibre is textbook LAN, and \'metropolitan\' starts at city scale.', reveals: 'many-buildings-equals-man' },
                { text: 'Call it a WAN — any inter-building link rides the wide area.', outcome: 'WAN crosses regions and countries on public telecom infrastructure; 2 km of private fibre never leaves the campus, let alone the public network.', reveals: 'any-link-is-wan' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_012', title: 'You made it',
          caseStudy: { intro: 'You can now define a network by what it enables — and spot the protocol layer invisible inside every \'connected\' device.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_007', difficulty: 'standard',
          question: 'A MAC (Media Access Control) address is a 48-bit hardware identifier.',
          hint: 'Revisit c12_ip_cbse_03_006 (IPv4 structure, classes, and subnet) and practice converting.',
          misconception: 'Students often believe that "MAC address is for LAN, IP address is for WAN" — implying they operate in separate.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the scope of uniqueness for MAC addresses vs IPv4 addresses.', answer: 'MAC addresses must be unique only within a single broadcast domain (LAN)',
                  options: ['MAC addresses must be unique only within a single broadcast domain (LAN)', 'MAC addresses are globally unique like IPs', 'IPs only need to be unique in a LAN', 'MAC address is for LAN, IP address is for WAN'],
                  hint: 'Revisit c12_ip_cbse_03_006 (IPv4 structure, classes, and subnet) and practice converting 5.',
                  misconception: 'Students often believe that "MAC address is for LAN, IP address is for WAN" — implying they operate in separate, non-overlapping domains.' }
          ],
            remediations: { 'mac-address-is-for-lan': { steps: ['If a student holds the "MAC for LAN, IP for WAN" misconception: (1) Draw a 3-hop path: Host A → Router R1 → Router R2 →.', '(2) Have them write the src/dst IP and MAC at each segment.', '(3) Point out: IP stays A→B throughout; MAC changes A→R1, then R1→R2, then R2→B.', '(4) Ask: "If MAC were only for LAN, what would R1 and R2 use on the WAN link between them?" (Answer: they still use.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "MAC address is for LAN, IP address is for WAN" — implying they operate in separate.',
          parts: [
                { id: 'a', prompt: 'A network administrator claims: "Since IPv6 has 128-bit addresses, we no longer need MAC addresses — the interface identifier in IPv6 (EUI-64) can serve as the.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'MAC address is for LAN, IP address is for WAN'],
                  hint: 'Revisit c12_ip_cbse_03_006 (IPv4 structure, classes, and subnet) and practice converting 5.',
                  misconception: 'Students often believe that "MAC address is for LAN, IP address is for WAN" — implying they operate in separate, non-overlapping domains.' }
          ],
            remediations: { 'mac-address-is-for-lan': { steps: ['If a student holds the "MAC for LAN, IP for WAN" misconception: (1) Draw a 3-hop path: Host A → Router R1 → Router R2 →.', '(2) Have them write the src/dst IP and MAC at each segment.', '(3) Point out: IP stays A→B throughout; MAC changes A→R1, then R1→R2, then R2→B.', '(4) Ask: "If MAC were only for LAN, what would R1 and R2 use on the WAN link between them?" (Answer: they still use.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_008', difficulty: 'standard',
          question: 'The client-server model is a distributed application architecture where clients.',
          hint: 'Revisit c12_ip_cbse_03_006 (IP addressing) and c12_ip_cbse_03_007 (MAC vs IP) to clarify.',
          misconception: 'Students often believe "the server connects to the client" because in daily language we say "the website sent me the.',
          parts: [
                { id: 'a', prompt: 'In the client-server model, which entity *initiates* the communication by sending the first message?', answer: 'The client initiates communication by sending the first message (the request)',
                  options: ['The client initiates communication by sending the first message (the request)', 'the server', 'both simultaneously', 'pushes'],
                  hint: 'Revisit c12_ip_cbse_03_006 (IP addressing) and c12_ip_cbse_03_007 (MAC vs IP) to clarify how.',
                  misconception: 'Students often believe "the server connects to the client" because in daily language we say "the website sent me the page." They write.' },
                { id: 'b', prompt: 'A student says: "In client-server architecture, the server connects to the client to deliver the webpage." Explain why this statement is incorrect using the.', answer: 'The server does not "connect to the client"',
                  options: ['The server does not "connect to the client"', 'the server connects to the client', 'the website sent me the page', 'Server establishes connection with client and pushes data'],
                  hint: 'Revisit c12_ip_cbse_03_006 (IP addressing) and c12_ip_cbse_03_007 (MAC vs IP) to clarify how.',
                  misconception: 'Students often believe "the server connects to the client" because in daily language we say "the website sent me the page." They write.' },
                { id: 'c', prompt: 'Draw a sequence diagram (text description acceptable) for a DNS query where a browser needs the IP address of "example.com".', answer: 'Correct sequence: 1',
                  options: ['Correct sequence: 1', 'the server connects to the client', 'the website sent me the page', 'Server establishes connection with client and pushes data'],
                  hint: 'Revisit c12_ip_cbse_03_006 (IP addressing) and c12_ip_cbse_03_007 (MAC vs IP) to clarify how.',
                  misconception: 'Students often believe "the server connects to the client" because in daily language we say "the website sent me the page." They write.' },
                { id: 'd', prompt: 'Compare HTTP/1.1 (stateless) and a hypothetical stateful protocol where the server remembers each client\'s previous requests.', answer: 'Advantage: Server can maintain shopping cart without cookies/tokens',
                  options: ['Advantage: Server can maintain shopping cart without cookies/tokens', 'stateful is always better', 'no disadvantage', 'the server connects to the client'],
                  hint: 'Revisit c12_ip_cbse_03_006 (IP addressing) and c12_ip_cbse_03_007 (MAC vs IP) to clarify how.',
                  misconception: 'Students often believe "the server connects to the client" because in daily language we say "the website sent me the page." They write.' }
          ],
            remediations: { 'the-server-connects-to-the': { steps: ['If the student thinks the server initiates, do this 3-step remediation: (1) Use a physical analogy: "You (client) call.', '(3) Revisit Class 11 node c11_cs_cbse_11_008 (Client-Server Architecture) and trace the sequence diagram there.', 'Then re-attempt Diagnostic Question 2 and 3.', 'If still stuck, review TCP 3-way handshake in c12_ip_cbse_03_011 (Network Protocols).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_009', difficulty: 'standard',
          question: 'Circuit switching establishes a dedicated end-to-end physical path between.',
          hint: 'If stuck, revisit c12_ip_cbse_03_004 (transmission media) and draw how multiple.',
          misconception: 'Students believe "packet switching = Internet, circuit switching = telephone" and that they are mutually exclusive.',
          parts: [
                { id: 'a', prompt: 'What are the three distinct phases of a circuit-switched communication session, and what happens in each phase?', answer: 'The three phases are: (1) Connection Setup',
                  options: ['The three phases are: (1) Connection Setup', 'setup, routing, teardown', 'packet switching = Internet, circuit switching = telephone', 'circuit switching involves routing decisions during transfer'],
                  hint: 'If stuck, revisit c12_ip_cbse_03_004 (transmission media) and draw how multiple conversations share.',
                  misconception: 'Students believe "packet switching = Internet, circuit switching = telephone" and that they are mutually exclusive technologies.' },
                { id: 'b', prompt: 'Compare the impact of a single link failure on an ongoing circuit-switched call versus a packet-switched TCP connection. Which recovers faster and why?', answer: 'Circuit switching: the dedicated path is broken → call drops immediately',
                  options: ['Circuit switching: the dedicated path is broken → call drops immediately', 'both drop equally', 'connection-oriented', 'packet switching = Internet, circuit switching = telephone'],
                  hint: 'If stuck, revisit c12_ip_cbse_03_004 (transmission media) and draw how multiple conversations share.',
                  misconception: 'Students believe "packet switching = Internet, circuit switching = telephone" and that they are mutually exclusive technologies.' }
          ],
            remediations: { 'packet-switching-internet': { steps: ['Revisit c12_ip_cbse_03_001 (network definition) to clarify "dedicated path" vs "shared medium".', 'Revisit c12_ip_cbse_03_004 (transmission media) to understand that fiber/copper are shared in packet switching via.', 'Draw a timeline diagram: circuit switching shows a solid block per connection; packet switching shows interleaved small.', 'Re-diagnostic: Ask student to explain why a 1 Gbps Ethernet link can carry 100 VoIP calls (64 kbps each) but only 10.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_010', difficulty: 'standard',
          question: 'DNS (Domain Name System) is a hierarchical, distributed naming system that.',
          hint: 'If stuck, revisit c12_ip_cbse_03_006 (IPv4 structure) and c12_ip_cbse_03_008.',
          misconception: 'Students believe the root server returns the IP address of the final domain (e.g., "root knows www.google.com\'s IP").',
          parts: [
                { id: 'a', prompt: 'A user types "mail.google.com" in their browser. The local DNS cache is empty.', answer: 'Step 1: Stub resolver → Recursive resolver: query for mail.google.com A record',
                  options: ['Step 1: Stub resolver → Recursive resolver: query for mail.google.com A record', 'root knows www.google.com\'s IP', 'the root server returns the IP address of the final domain (e'],
                  hint: 'If stuck, revisit c12_ip_cbse_03_006 (IPv4 structure) and c12_ip_cbse_03_008 (client-server model).',
                  misconception: 'Students believe the root server returns the IP address of the final domain (e.g., "root knows www.google.com\'s IP").' }
          ],
            remediations: { 'the-root-server-returns-the': { steps: ['If the student holds this misconception: 1.', 'Draw the delegation chain on paper: Client → Recursive Resolver → Root (.', '→ .com TLD) → .com TLD (→ google.com auth) → google.com auth (→ A record).', 'At each arrow, write the QUERY sent and RESPONSE received (referral vs answer).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_011', difficulty: 'standard',
          question: 'Network protocols are standardized rules and conventions that govern how data.',
          hint: 'If stuck, revisit c12_ip_cbse_03_008 (client-server model) and c12_ip_cbse_03_009.',
          misconception: 'Students often believe "TCP is always better because it\'s reliable" and "UDP is only for streaming." They fail to see.',
          parts: [
                { id: 'a', prompt: 'A student claims: "HTTP runs on UDP because web pages need to load fast, and UDP is faster than TCP." Explain why this statement is incorrect and describe the.', answer: 'HTTP (versions 1.0/1.1/2) runs over TCP, not UDP',
                  options: ['HTTP (versions 1.0/1.1/2) runs over TCP, not UDP', 'HTTP uses UDP', 'fast = UDP', 'TCP is always better'],
                  hint: 'If stuck, revisit c12_ip_cbse_03_008 (client-server model) and c12_ip_cbse_03_009 (circuit.',
                  misconception: 'Students often believe "TCP is always better because it\'s reliable" and "UDP is only for streaming." They fail to see that TCP\'s.' },
                { id: 'b', prompt: 'A developer is building a multiplayer online game where players\' positions update 60 times per second.', answer: 'Choose UDP',
                  options: ['Choose UDP', 'TCP is always better', 'UDP is only for streaming', 'Which protocol for a stock trading platform?'],
                  hint: 'If stuck, revisit c12_ip_cbse_03_008 (client-server model) and c12_ip_cbse_03_009 (circuit.',
                  misconception: 'Students often believe "TCP is always better because it\'s reliable" and "UDP is only for streaming." They fail to see that TCP\'s.' },
                { id: 'c', prompt: 'Compare FTP and HTTP for downloading a single large file (e.g., a 2 GB software installer).', answer: 'connection management, (',
                  options: ['connection management, (', 'TCP is always better', 'UDP is only for streaming', 'Which protocol for a stock trading platform?'],
                  hint: 'If stuck, revisit c12_ip_cbse_03_008 (client-server model) and c12_ip_cbse_03_009 (circuit.',
                  misconception: 'Students often believe "TCP is always better because it\'s reliable" and "UDP is only for streaming." They fail to see that TCP\'s.' }
          ],
            remediations: { 'tcp-is-always-better-because': { steps: ['Revisit c12_ip_cbse_03_009 (Circuit switching vs packet switching) to reinforce packet-switched network characteristics.', 'Review c11_cs_cbse_11_009 (Network Protocols: HTTP, HTTPS, FTP, TCP/IP) for Class 11 baseline on TCP/UDP/HTTP/FTP.', 'Do a table-comparison exercise: create a 4×4 matrix (Protocol vs Connection, Reliability, Ordering, Typical Use) and.', 'Rediagnostic: Ask student to explain why a video conference uses UDP for audio/video but TCP for chat messages in the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_012', difficulty: 'standard',
          question: 'Network security basics encompass firewalls — hardware/software systems that.',
          hint: 'If stuck, revisit c12_ip_cbse_03_011 (Network protocols: TCP, UDP, HTTP, FTP) and draw.',
          misconception: 'Students believe "firewall encrypts data" or "encryption blocks hackers." They confuse *access control* (firewall.',
          parts: [
                { id: 'a', prompt: 'In a TLS 1.3 handshake, why does the server send its certificate *after* the ClientHello but *before* the ServerHello, and what would break if the order were.', answer: 'The certificate contains the server\'s public key needed for key exchange',
                  options: ['The certificate contains the server\'s public key needed for key exchange', 'certificate is just for show', 'firewall encrypts data', 'encryption blocks hackers'],
                  hint: 'If stuck, revisit c12_ip_cbse_03_011 (Network protocols: TCP, UDP, HTTP, FTP) and draw the packet.',
                  misconception: 'Students believe "firewall encrypts data" or "encryption blocks hackers." They confuse *access control* (firewall decides *whether* traffic.' },
                { id: 'b', prompt: 'Compare the key management overhead of symmetric encryption (AES-256) vs asymmetric encryption (RSA-2048) for a school with 500 students where each pair needs.', answer: 'Symmetric: n(n-1)/2 = 500×499/2 = 124,750 unique pairwise keys',
                  options: ['Symmetric: n(n-1)/2 = 500×499/2 = 124,750 unique pairwise keys', 'symmetric needs 500 keys', 'firewall encrypts data', 'encryption blocks hackers'],
                  hint: 'If stuck, revisit c12_ip_cbse_03_011 (Network protocols: TCP, UDP, HTTP, FTP) and draw the packet.',
                  misconception: 'Students believe "firewall encrypts data" or "encryption blocks hackers." They confuse *access control* (firewall decides *whether* traffic.' }
          ],
            remediations: { 'firewall-encrypts-data-or-encryption': { steps: ['Revisit c11_cs_cbse_11_013 (Firewall and Antivirus Software) — relabel firewall types with OSI layers.', 'Revisit c11_ip_cbse_08_007-08_012 (Cyber Safety) — map each threat (phishing, malware) to whether.', 'Draw a 3-column table: Threat | Firewall Role | Encryption Role.', 'Re-attempt Diagnostic Q3 and Q5 — if still wrong, watch a 10-min video on "stateful vs stateless firewall" and "TLS.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
