import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch01_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch01_p2: SimDef = {
    id: 'v3_c12_cs_ch01_p2',
    title: 'Computer Networks · Part 2/2',
    subtitle: 'Two laptops, one cable, zero conversation — the missing ingredient',
    classLevel: 12, subject: 'computer_science', topic: 'Computer Networks · Part 2/2',
    chapters: ['c12_cs_ch01'],
    nodeIds: ['c12_cs_cbse_01_007', 'c12_cs_cbse_01_008', 'c12_cs_cbse_01_009', 'c12_cs_cbse_01_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Network architect', intro: 'Every file shared and every message sent rides on an invisible agreement. This chapter hands you the rulebook.', goal: 'Define a computer network through nodes, links and protocols, and explain the three needs it serves.' },
    discovery: {
        question: 'Two laptops, one Ethernet cable, zero communication — one speaks IPv4, the other only IPv6. A student insists \'they\'re connected, so it\'s a network.\' What\'s missing?',
        options: ['Protocols — the agreed rules of conversation; a link without shared rules can\'t exchange a single byte', 'A longer cable', 'A server — no network exists without one', 'Wi-Fi — cables don\'t count'],
        answer: 'Protocols — the agreed rules of conversation; a link without shared rules can\'t exchange a single byte',
        hook: 'Networks aren\'t wires — they\'re agreements. Nodes plus links plus protocols make a network; hardware alone just makes a paperweight chain. That\'s also why \'every network needs a server\' is false — peer-to-peer networks disagree.',
    },
    teaching: [
        { title: 'IPv6 Address: Format and Advantages over IPv4', text: 'IPv6 (Internet Protocol version 6) is a 128-bit addressing scheme represented as eight groups of four hexadecimal digits separated by colons (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334), designed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Design a real network for a rural medical camp with no internet: pick the topology, assign addresses, and wire up the three needs — resource sharing, communication, distributed processing — then defend each choice.',
        labels: ['IPv6 Address: Format', 'Domain Name System (DNS)', 'Client-Server Architecture and Peer-to-Peer', 'Network Security: Firewall'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_007', title: 'IPv6 Address: Format and Advantages over IPv4',
          caseStudy: { intro: 'Imagine you are setting up a smart home with 50+ IoT devices — each needs a unique IP address.',
            decisions: [{ prompt: 'Write the full expanded form of the compressed IPv6 address `2001:db8::1` and state how many hextets it contains.', options: [
                { text: 'Full expansion: `2001:0db8:0000:0000:0000:0000:0000:0001` (8 hextets)', outcome: 'Full expansion: `2001:0db8:0000:0000:0000:0000:0000:0001` (8 hextets).' },
                { text: '`::` can be used multiple times in one address (e', outcome: 'Not quite — Students think `::` can be used multiple times in one address (e.g., `2001::db8::1`) to compress.', reveals: 'can-be-used-multiple-times' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_008', title: 'Domain Name System (DNS) and URL Structure',
          caseStudy: { intro: 'Imagine you type "https://www.cbse.gov.in/exam/schedule.pdf" in your browser and press Enter.',
            decisions: [{ prompt: 'What does DNS stand for, and what is its primary function in computer networks?', options: [
                { text: 'DNS stands for Domain Name System', outcome: 'DNS stands for Domain Name System. Its primary function is to translate human-readable domain names.' },
                { text: 'DNS assigns IP addresses', outcome: 'Not quite — Students often believe that a DNS lookup always returns a single IPv4 address (A record).', reveals: 'a-dns-lookup-always-returns' },
                { text: 'DNS routes packets', outcome: 'Not quite — Students often believe that a DNS lookup always returns a single IPv4 address (A record).', reveals: 'a-dns-lookup-always-returns' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_009', title: 'Client-Server Architecture and Peer-to-Peer Model',
          caseStudy: { intro: 'Imagine you want to watch a movie: you open Netflix (client) which requests the video from Netflix\'s powerful servers (server) — this is Client-Server.',
            decisions: [{ prompt: 'What is the fundamental structural difference between Client-Server and Peer-to-Peer architectures in terms of node roles?', options: [
                { text: 'In Client-Server, roles are strictly separated: servers only provide services, clients', outcome: 'In Client-Server, roles are strictly separated: servers only provide services, clients only request.' },
                { text: 'P2P has a central server but it\'s hidden', outcome: 'Not quite — Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of.', reveals: 'peer-to-peer-means-no' },
                { text: 'Peer-to-Peer means no server at all', outcome: 'Not quite — Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of.', reveals: 'peer-to-peer-means-no' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_010', title: 'Network Security: Firewall and Encryption Basics',
          caseStudy: { intro: 'Imagine you\'re sending a confidential letter (data packet) through a messenger (network) — you\'d want a security guard (firewall) checking the messenger\'s.',
            decisions: [{ prompt: 'What is the fundamental difference between a packet-filtering firewall and a stateful inspection firewall in terms of what information they.', options: [
                { text: 'A packet-filtering firewall examines each packet in isolation using header fields', outcome: 'A packet-filtering firewall examines each packet in isolation using header fields.' },
                { text: 'stateful only checks port numbers', outcome: 'Not quite — Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls.', reveals: 'a-firewall-encrypts-data-or' },
                { text: 'encrypts data', outcome: 'Not quite — Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls.', reveals: 'a-firewall-encrypts-data-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Setting up a college fest stall, two laptops are linked by one Ethernet cable, given IPs on the same subnet, and they ping and share files fine. A teammate scoffs: \'No router, no internet — that\'s not a real network.\'',
            decisions: [{ prompt: 'Is the teammate right?', options: [
                { text: 'No — nodes, a link, and agreed protocols are already in place and resources are being shared; routers, switches and internet only scale a network, they don\'t define it.', outcome: 'A network is defined by communication and sharing, not by specific infrastructure — this is a valid two-node LAN.' },
                { text: 'Yes — no internet means no network; Wi-Fi or the web is what makes devices networked.', outcome: 'That confuses the internet with the definition: wired labs and Bluetooth photo-sharing are networks with zero internet access.', reveals: 'network-needs-internet' },
                { text: 'Yes — every real network needs at least a dedicated server to count.', outcome: 'Peer-to-peer and ad-hoc networks share resources with no dedicated server at all; only client-server setups require one.', reveals: 'network-needs-server' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_010', title: 'You made it',
          caseStudy: { intro: 'You now see networks as conversations with rules, not cables with hope. That mental model carries the whole unit — from topologies to TCP/IP.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_007', difficulty: 'standard',
          question: 'IPv6 (Internet Protocol version 6) is a 128-bit addressing scheme represented.',
          hint: 'Revisit hexadecimal-to-binary conversion (each hex digit = 4 bits) and CIDR prefix.',
          misconception: 'Students think `::` can be used multiple times in one address (e.g., `2001::db8::1`) to compress separate zero blocks.',
          parts: [
                { id: 'a', prompt: 'Write the full expanded form of the compressed IPv6 address `2001:db8::1` and state how many hextets it contains.', answer: 'Full expansion: `2001:0db8:0000:0000:0000:0000:0000:0001` (8 hextets)',
                  options: ['Full expansion: `2001:0db8:0000:0000:0000:0000:0000:0001` (8 hextets)', '`::` can be used multiple times in one address (e'],
                  hint: 'Revisit hexadecimal-to-binary conversion (each hex digit = 4 bits) and CIDR prefix calculations.',
                  misconception: 'Students think `::` can be used multiple times in one address (e.g., `2001::db8::1`) to compress separate zero blocks.' },
                { id: 'b', prompt: 'Explain why IPv6 eliminates the header checksum field present in IPv4, and what mechanism replaces its error-detection function.', answer: 'IPv6 removes the header checksum',
                  options: ['IPv6 removes the header checksum', 'IPv6 doesn\'t need error detection', '`::` can be used multiple times in one address (e'],
                  hint: 'Revisit hexadecimal-to-binary conversion (each hex digit = 4 bits) and CIDR prefix calculations.',
                  misconception: 'Students think `::` can be used multiple times in one address (e.g., `2001::db8::1`) to compress separate zero blocks.' },
                { id: 'c', prompt: 'A router receives an IPv6 packet with a `Fragment` extension header. The packet\'s payload is 1500 bytes and the MTU of the outgoing link is 1280 bytes.', answer: 'Only the *source* fragments in IPv6',
                  options: ['Only the *source* fragments in IPv6', 'fragmentation only at source', '`::` can be used multiple times in one address (e'],
                  hint: 'Revisit hexadecimal-to-binary conversion (each hex digit = 4 bits) and CIDR prefix calculations.',
                  misconception: 'Students think `::` can be used multiple times in one address (e.g., `2001::db8::1`) to compress separate zero blocks.' },
                { id: 'd', prompt: 'Compare the address assignment process for a new device joining a network in IPv4 (with DHCP) vs IPv6 (with SLAAC).', answer: 'IPv4: Device broadcasts DHCP Discover → server replies with lease',
                  options: ['IPv4: Device broadcasts DHCP Discover → server replies with lease', 'SLAAC always works', '`::` can be used multiple times in one address (e'],
                  hint: 'Revisit hexadecimal-to-binary conversion (each hex digit = 4 bits) and CIDR prefix calculations.',
                  misconception: 'Students think `::` can be used multiple times in one address (e.g., `2001::db8::1`) to compress separate zero blocks.' }
          ],
            remediations: { 'can-be-used-multiple-times': { steps: ['Have the student write 5 valid compressed addresses and their full expansions, explicitly counting hextets before/after.', 'Use the "double-colon rule" drill: "Count hextets shown + hextets implied by `::` = 8".', 'Revisit node `c12_cs_cbse_01_006` (IPv4 classes) to contrast fixed 4-octet IPv4 vs variable-compression IPv6.', 'Diagnostic re-check: Ask student to compress `2001:0db8:0000:0000:0000:0000:1428:57ab` and explain why.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think `::` can be used multiple times in one address (e.g., `2001::db8::1`) to compress separate zero blocks.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "NAT is unnecessary in IPv6 because of the large address space, so IPv6 restores true end-to-end connectivity." Is this entirely.', answer: 'Mostly correct but not absolute',
                  options: ['Mostly correct but not absolute', 'NAT is completely gone', '`::` can be used multiple times in one address (e'],
                  hint: 'Revisit hexadecimal-to-binary conversion (each hex digit = 4 bits) and CIDR prefix calculations.',
                  misconception: 'Students think `::` can be used multiple times in one address (e.g., `2001::db8::1`) to compress separate zero blocks.' },
                { id: 'b', prompt: 'Design a compressed IPv6 address for a link-local address on interface `eth0` of a Linux host, given the interface\'s MAC address is `00:1A:2B:3C:4D:5E`.', answer: 'Split MAC: `00:1A:2B` | `3C:4D:5E`',
                  options: ['Split MAC: `00:1A:2B` | `3C:4D:5E`', '`::` can be used multiple times in one address (e'],
                  hint: 'Revisit hexadecimal-to-binary conversion (each hex digit = 4 bits) and CIDR prefix calculations.',
                  misconception: 'Students think `::` can be used multiple times in one address (e.g., `2001::db8::1`) to compress separate zero blocks.' }
          ],
            remediations: { 'can-be-used-multiple-times': { steps: ['Have the student write 5 valid compressed addresses and their full expansions, explicitly counting hextets before/after.', 'Use the "double-colon rule" drill: "Count hextets shown + hextets implied by `::` = 8".', 'Revisit node `c12_cs_cbse_01_006` (IPv4 classes) to contrast fixed 4-octet IPv4 vs variable-compression IPv6.', 'Diagnostic re-check: Ask student to compress `2001:0db8:0000:0000:0000:0000:1428:57ab` and explain why.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_008', difficulty: 'standard',
          question: 'The Domain Name System (DNS) is a hierarchical, decentralized naming system.',
          hint: 'Revisit **c12_cs_cbse_01_006** (IPv4 Format and Classes) and **c12_cs_cbse_01_007** (IPv6.',
          misconception: 'Students often believe that a DNS lookup always returns a single IPv4 address (A record).',
          parts: [
                { id: 'a', prompt: 'What does DNS stand for, and what is its primary function in computer networks?', answer: 'DNS stands for Domain Name System',
                  options: ['DNS stands for Domain Name System', 'DNS assigns IP addresses', 'DNS routes packets', 'the DNS resolves the URL'],
                  hint: 'Revisit **c12_cs_cbse_01_006** (IPv4 Format and Classes) and **c12_cs_cbse_01_007** (IPv6 Address.',
                  misconception: 'Students often believe that a DNS lookup always returns a single IPv4 address (A record).' },
                { id: 'b', prompt: 'Given the URL `https://user:pass@www.example.com:8080/path/to/resource?query=value#fragment`, identify each of the six standard URL components and state the.', answer: 'Components: scheme=`https`, authority=`user:pass@www.example.com:8080`',
                  options: ['Components: scheme=`https`, authority=`user:pass@www.example.com:8080`', 'the DNS resolves the URL', 'DNS resolves the host part of the URL', 'a DNS lookup always returns a single IPv4 address (A record)'],
                  hint: 'Revisit **c12_cs_cbse_01_006** (IPv4 Format and Classes) and **c12_cs_cbse_01_007** (IPv6 Address.',
                  misconception: 'Students often believe that a DNS lookup always returns a single IPv4 address (A record).' }
          ],
            remediations: { 'a-dns-lookup-always-returns': { steps: ['Revisit the DNS hierarchy by drawing a tree: root (.) → TLD (.com, .in) → second-level (example) → subdomains (www.', 'Label each node with the responsible nameserver.', 'Practice URL parsing: take 5 complex URLs (with userinfo, port, query, fragment) and fill a table with the six.', 'Create flashcards for each DNS record type (A, AAAA, CNAME, MX, NS, TXT) with one-line purpose and example.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_009', difficulty: 'standard',
          question: 'Client-Server architecture is a distributed application structure that.',
          hint: 'If stuck, revisit c12_cs_cbse_01_001 (Introduction to Computer Networks) and list three.',
          misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application.',
          parts: [
                { id: 'a', prompt: 'A startup wants to build a real-time multiplayer game for 10,000 concurrent players with low latency. They have limited budget for server infrastructure.', answer: 'Recommend Client-Server with cloud-based auto-scaling game servers',
                  options: ['Recommend Client-Server with cloud-based auto-scaling game servers', 'Peer-to-Peer means no server at all', 'P2P has zero infrastructure cost', 'P2P works even if all known peers are offline'],
                  hint: 'If stuck, revisit c12_cs_cbse_01_001 (Introduction to Computer Networks) and list three resources.',
                  misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application server* with the absence.' },
                { id: 'b', prompt: 'Compare the scalability behavior of Client-Server vs. P2P as the number of users increases from 100 to 1,000,000.', answer: 'Client-Server: Server bandwidth grows linearly with users (O(n))',
                  options: ['Client-Server: Server bandwidth grows linearly with users (O(n))', 'P2P scales infinitely with no cost', 'Peer-to-Peer means no server at all', 'P2P has zero infrastructure cost'],
                  hint: 'If stuck, revisit c12_cs_cbse_01_001 (Introduction to Computer Networks) and list three resources.',
                  misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application server* with the absence.' }
          ],
            remediations: { 'peer-to-peer-means-no': { steps: ['Revisit the distinction between *data plane* and *control plane* using the BitTorrent example — identify which steps.', 'Draw a sequence diagram for a torrent download showing: .torrent file → tracker HTTP request → peer list → peer.', 'Ask: "If the tracker goes down, can existing peers still trade pieces?', 'Re-attempt Diagnostic Question 6 with this diagram.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_010', difficulty: 'standard',
          question: 'Network security encompasses measures to protect network infrastructure and.',
          hint: 'If stuck, revisit c12_cs_cbse_01_006 (IP Address) and c12_cs_cbse_01_003 (Network.',
          misconception: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based.',
          parts: [
                { id: 'a', prompt: 'Explain why symmetric encryption alone is insufficient for secure key exchange over an untrusted network, and how asymmetric encryption solves this.', answer: 'Symmetric encryption requires both parties to already share a secret key',
                  options: ['Symmetric encryption requires both parties to already share a secret key', 'asymmetric is faster so we use it for everything', 'encrypts data', 'blocks hackers'],
                  hint: 'If stuck, revisit c12_cs_cbse_01_006 (IP Address) and c12_cs_cbse_01_003 (Network Devices).',
                  misconception: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based on rules.' }
          ],
            remediations: { 'a-firewall-encrypts-data-or': { steps: ['Re-read NCERT Section 1.7 (Network Security) focusing on the firewall-encryption distinction table.', 'Draw a 3-column table: "Threat", "Firewall Role", "Encryption Role" with 5 rows (eavesdropping, unauthorized access.', 'For each threat, write one sentence on what firewall does and what encryption does.', 'Attempt Diagnostic Questions 2 and 4 again — they directly test this separation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
