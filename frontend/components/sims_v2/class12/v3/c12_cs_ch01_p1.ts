import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch01_p1: SimDef = {
    id: 'v3_c12_cs_ch01_p1',
    title: 'Computer Networks · Part 1/2',
    subtitle: 'Two laptops, one cable, zero conversation — the missing ingredient',
    classLevel: 12, subject: 'computer_science', topic: 'Computer Networks · Part 1/2',
    chapters: ['c12_cs_ch01'],
    nodeIds: ['c12_cs_cbse_01_001', 'c12_cs_cbse_01_002', 'c12_cs_cbse_01_003', 'c12_cs_cbse_01_004', 'c12_cs_cbse_01_005', 'c12_cs_cbse_01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Network architect', intro: 'Every file shared and every message sent rides on an invisible agreement. This chapter hands you the rulebook.', goal: 'Define a computer network through nodes, links and protocols, and explain the three needs it serves.' },
    discovery: {
        question: 'Two laptops, one Ethernet cable, zero communication — one speaks IPv4, the other only IPv6. A student insists \'they\'re connected, so it\'s a network.\' What\'s missing?',
        options: ['Protocols — the agreed rules of conversation; a link without shared rules can\'t exchange a single byte', 'A longer cable', 'A server — no network exists without one', 'Wi-Fi — cables don\'t count'],
        answer: 'Protocols — the agreed rules of conversation; a link without shared rules can\'t exchange a single byte',
        hook: 'Networks aren\'t wires — they\'re agreements. Nodes plus links plus protocols make a network; hardware alone just makes a paperweight chain. That\'s also why \'every network needs a server\' is false — peer-to-peer networks disagree.',
    },
    teaching: [
        { title: 'Introduction to Computer Networks and their Need', text: 'A computer network is a collection of interconnected computing devices (nodes) that can communicate with each other and share resources such as data, applications, and hardware.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Design a real network for a rural medical camp with no internet: pick the topology, assign addresses, and wire up the three needs — resource sharing, communication, distributed processing — then defend each choice.',
        labels: ['Introduction to Computer Networks', 'Types of Networks: LAN,', 'Network Devices: Hub, Switch,', 'Transmission Media: Guided (Twisted', 'Transmission Media: Unguided (Radio,', 'IP Address: IPv4 Format'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_001', title: 'Introduction to Computer Networks and their Need',
          caseStudy: { intro: 'Imagine you are working on a project with three classmates. Each of you has a laptop with part of the code, but you need to combine everything into one final.',
            decisions: [{ prompt: 'What are the three fundamental needs that motivate the creation of a computer network?', options: [
                { text: 'The three fundamental needs are: (1) Resource sharing', outcome: 'The three fundamental needs are: (1) Resource sharing — e.g., multiple computers in a lab accessing.' },
                { text: 'sharing files', outcome: 'Not quite — Students often equate "computer network" with "the Internet" or "Wi-Fi".', reveals: 'students-often-equate-computer-network' },
                { text: 'internet access', outcome: 'Not quite — Students often equate "computer network" with "the Internet" or "Wi-Fi".', reveals: 'students-often-equate-computer-network' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_002', title: 'Types of Networks: LAN, MAN, WAN, PAN',
          caseStudy: { intro: 'Imagine you want to transfer a photo from your phone to your friend\'s laptop sitting next to you — you\'d use Bluetooth (PAN).',
            decisions: [{ prompt: 'A student says: "My home Wi-Fi network connecting my laptop, phone, and smart TV is a WAN because it connects to the internet." Is this.', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. A home Wi-Fi network is a LAN — it spans a single residence (typically.' },
                { text: 'accessing the internet', outcome: 'Not quite — Students frequently believe "Wi-Fi = WAN" because Wi-Fi connects to the internet.', reveals: 'students-frequently-believe-wi-fi' },
                { text: 'being a WAN', outcome: 'Not quite — Students frequently believe "Wi-Fi = WAN" because Wi-Fi connects to the internet.', reveals: 'students-frequently-believe-wi-fi' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_003', title: 'Network Devices: Hub, Switch, Router, Repeater, Gateway',
          caseStudy: { intro: 'Imagine you are setting up a computer lab in your school: 30 PCs in one room, a server in another room 150 metres away, and an internet connection from an ISP.',
            decisions: [{ prompt: 'What is the fundamental difference between a hub and a switch in terms of how they handle incoming data frames?', options: [
                { text: 'A hub operates at Layer 1 and broadcasts every incoming frame out of all other ports,', outcome: 'A hub operates at Layer 1 and broadcasts every incoming frame out of all other ports, creating.' },
                { text: 'switch uses IP addresses', outcome: 'Not quite — Students often think a switch "routes" packets using IP addresses like a router, or that a router.', reveals: 'a-switch-routes-packets-using' },
                { text: 'hub filters frames', outcome: 'Not quite — Students often think a switch "routes" packets using IP addresses like a router, or that a router.', reveals: 'a-switch-routes-packets-using' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_004', title: 'Transmission Media: Guided (Twisted Pair, Coaxial, Fiber Optic)',
          caseStudy: { intro: 'Imagine you are setting up a gaming LAN party in a hostel: you have a 100 m run from the switch to your room.',
            decisions: [{ prompt: 'Name the three categories of guided transmission media covered in the CBSE Class 12 syllabus and state one distinguishing physical feature.', options: [
                { text: 'The three are Twisted Pair (pairs of insulated copper wires twisted together), Coaxial', outcome: 'The three are Twisted Pair (pairs of insulated copper wires twisted together), Coaxial Cable.' },
                { text: 'Radio waves', outcome: 'Not quite — Students often believe "Fiber is always faster than copper" and therefore select fiber for a 20.', reveals: 'fiber-is-always-faster-than' },
                { text: 'Microwave', outcome: 'Not quite — Students often believe "Fiber is always faster than copper" and therefore select fiber for a 20.', reveals: 'fiber-is-always-faster-than' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_005', title: 'Transmission Media: Unguided (Radio, Microwave, Satellite)',
          caseStudy: { intro: 'Imagine you\'re streaming a live cricket match from Mumbai to a village in Ladakh — the signal travels from the stadium camera to a satellite 36,000 km above.',
            decisions: [{ prompt: 'State the frequency range of microwaves used in terrestrial communication and name the propagation mode they primarily use.', options: [
                { text: 'Microwaves: 300 MHz – 300 GHz (commonly 1–40 GHz for terrestrial links)', outcome: 'Microwaves: 300 MHz – 300 GHz (commonly 1–40 GHz for terrestrial links).' },
                { text: 'microwaves use sky wave propagation', outcome: 'Not quite — Students often believe "higher frequency always means better (faster, longer range) wireless." They.', reveals: 'higher-frequency-always-means-better' },
                { text: 'higher frequency always means better (faster, longer range) wireless', outcome: 'Not quite — Students often believe "higher frequency always means better (faster, longer range) wireless." They.', reveals: 'higher-frequency-always-means-better' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_006', title: 'IP Address: IPv4 Format and Classes',
          caseStudy: { intro: 'Imagine you are setting up a Wi-Fi router at home and it assigns your phone an address like 192.168.1.15 — why those four numbers, and why does 192.168.x.x.',
            decisions: [{ prompt: 'What is the maximum decimal value of the first octet in a Class A IPv4 address, and which bit pattern in the first octet defines Class A?', options: [
                { text: 'The maximum first-octet value for Class A is 127', outcome: 'The maximum first-octet value for Class A is 127; Class A is defined by a leading bit of 0 (i.e.' },
                { text: 'leading bits 10', outcome: 'Not quite — Students often believe the "class" of an IP address is determined by the subnet mask configured.', reveals: 'the-class-of-an-ip' },
                { text: 'if I set mask 255.255.255.0 on 10.0.0.1, it becomes Class C', outcome: 'Not quite — Students often believe the "class" of an IP address is determined by the subnet mask configured.', reveals: 'the-class-of-an-ip' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Setting up a college fest stall, two laptops are linked by one Ethernet cable, given IPs on the same subnet, and they ping and share files fine. A teammate scoffs: \'No router, no internet — that\'s not a real network.\'',
            decisions: [{ prompt: 'Is the teammate right?', options: [
                { text: 'No — nodes, a link, and agreed protocols are already in place and resources are being shared; routers, switches and internet only scale a network, they don\'t define it.', outcome: 'A network is defined by communication and sharing, not by specific infrastructure — this is a valid two-node LAN.' },
                { text: 'Yes — no internet means no network; Wi-Fi or the web is what makes devices networked.', outcome: 'That confuses the internet with the definition: wired labs and Bluetooth photo-sharing are networks with zero internet access.', reveals: 'network-needs-internet' },
                { text: 'Yes — every real network needs at least a dedicated server to count.', outcome: 'Peer-to-peer and ad-hoc networks share resources with no dedicated server at all; only client-server setups require one.', reveals: 'network-needs-server' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_01_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now see networks as conversations with rules, not cables with hope. That mental model carries the whole unit — from topologies to TCP/IP.',
            decisions: [{ prompt: 'What comes next? Computer Networks · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Computer Networks · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_001', difficulty: 'standard',
          question: 'A computer network is a collection of interconnected computing devices (nodes).',
          hint: 'If the student cannot articulate why they would want devices to communicate, revisit the.',
          misconception: 'Students often equate "computer network" with "the Internet" or "Wi-Fi".',
          parts: [
                { id: 'a', prompt: 'What are the three fundamental needs that motivate the creation of a computer network?', answer: 'The three fundamental needs are: (1) Resource sharing',
                  options: ['The three fundamental needs are: (1) Resource sharing', 'sharing files', 'internet access'],
                  hint: 'If the student cannot articulate why they would want devices to communicate, revisit the concept.',
                  misconception: 'Students often equate "computer network" with "the Internet" or "Wi-Fi".' },
                { id: 'b', prompt: 'A student says: "A computer network is just two or more computers connected by a cable." Explain why this definition is incomplete.', answer: 'The definition misses protocols',
                  options: ['The definition misses protocols', 'protocols', 'communication rules'],
                  hint: 'If the student cannot articulate why they would want devices to communicate, revisit the concept.',
                  misconception: 'Students often equate "computer network" with "the Internet" or "Wi-Fi".' },
                { id: 'c', prompt: 'Compare and contrast a standalone computer and a networked computer in terms of: (a) software installation and updates, (b) data backup strategy, (c) failure.', answer: '| Aspect | Standalone Computer | Networked Computer |',
                  options: ['| Aspect | Standalone Computer | Networked Computer |', 'networked is better in all ways'],
                  hint: 'If the student cannot articulate why they would want devices to communicate, revisit the concept.',
                  misconception: 'Students often equate "computer network" with "the Internet" or "Wi-Fi".' }
          ],
            remediations: { 'students-often-equate-computer-network': { steps: ['If the student exhibits the above misconception: (1) Set up a physical demo: connect two laptops with a single Ethernet.', '(2) Ask: "Is this a network?', 'Why?" Force the student to articulate: nodes, link, protocol (TCP/IP), addressing.', '(3) Revisit the definition: highlight "interconnected", "communicate", "share resources" — N/A require internet.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_002', difficulty: 'standard',
          question: 'A computer network is classified by its geographical span into four primary.',
          hint: 'Revisit the definition and need for computer networks in node c12_cs_cbse_01_001 — focus.',
          misconception: 'Students frequently believe "Wi-Fi = WAN" because Wi-Fi connects to the internet.',
          parts: [
                { id: 'a', prompt: 'A student says: "My home Wi-Fi network connecting my laptop, phone, and smart TV is a WAN because it connects to the internet." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'accessing the internet', 'being a WAN'],
                  hint: 'Revisit the definition and need for computer networks in node c12_cs_cbse_01_001 — focus on the.',
                  misconception: 'Students frequently believe "Wi-Fi = WAN" because Wi-Fi connects to the internet.' },
                { id: 'b', prompt: 'Analyze this scenario: "A wearable fitness tracker syncs data to a smartphone via Bluetooth. The smartphone uploads the data to a cloud server over 4G.', answer: 'tracker↔phone, (',
                  options: ['tracker↔phone, (', 'city-wide = MAN', '"city-wide = MAN" but cellular architecture is fundamentally WAN'],
                  hint: 'Revisit the definition and need for computer networks in node c12_cs_cbse_01_001 — focus on the.',
                  misconception: 'Students frequently believe "Wi-Fi = WAN" because Wi-Fi connects to the internet.' }
          ],
            remediations: { 'students-frequently-believe-wi-fi': { steps: ['Revisit the distance-line activity in the Walkthrough — physically draw 0 m, 10 m, 1 km, 50 km, 1000 km on paper and.', 'For each example, write: who owns the cables/airlink? (you / your school / telecom / multiple telecoms).', 'Watch a 5-minute video on "Metro Ethernet vs. IP VPN" to see provider-owned vs. customer-owned distinction.', 'Re-attempt Diagnostic Questions 2 and 4 — if you still mislabel cellular as MAN, re-read the "cellular architecture.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_003', difficulty: 'standard',
          question: 'Network devices are hardware components that connect computers and other.',
          hint: 'Review OSI layer functions: Physical = bits/signals, Data Link = frames/MAC, Network.',
          misconception: 'Students often think a switch "routes" packets using IP addresses like a router, or that a router "switches" frames.',
          parts: [
                { id: 'a', prompt: 'A school has two separate LANs in different buildings connected by a fibre link.', answer: 'A router should be placed at each end',
                  options: ['A router should be placed at each end', 'routes', 'switches'],
                  hint: 'Review OSI layer functions: Physical = bits/signals, Data Link = frames/MAC, Network = packets/IP.',
                  misconception: 'Students often think a switch "routes" packets using IP addresses like a router, or that a router "switches" frames using MAC addresses.' },
                { id: 'b', prompt: 'A network engineer connects a legacy Token Ring network (using MAC addresses) to a modern Ethernet network (also using MAC addresses) using a device that.', answer: 'A gateway is used',
                  options: ['A gateway is used', 'router', 'routes', 'switches'],
                  hint: 'Review OSI layer functions: Physical = bits/signals, Data Link = frames/MAC, Network = packets/IP.',
                  misconception: 'Students often think a switch "routes" packets using IP addresses like a router, or that a router "switches" frames using MAC addresses.' },
                { id: 'c', prompt: 'Compare the collision domain and broadcast domain count for a 24‑port hub, a 24‑port switch, and a router with 24 interfaces.', answer: 'Hub: 1 collision domain, 1 broadcast domain',
                  options: ['Hub: 1 collision domain, 1 broadcast domain', 'switch has 24 broadcast domains', 'routes', 'switches'],
                  hint: 'Review OSI layer functions: Physical = bits/signals, Data Link = frames/MAC, Network = packets/IP.',
                  misconception: 'Students often think a switch "routes" packets using IP addresses like a router, or that a router "switches" frames using MAC addresses.' }
          ],
            remediations: { 'a-switch-routes-packets-using': { steps: ['Revisit the OSI model layers (Physical, Data Link, Network, Transport, Session, Presentation, Application) and write.', 'Create a comparison table with columns: Device, OSI Layer, Addressing Used, Collision Domains, Broadcast Domains.', 'Fill it from memory, then check against textbook.', 'Practice 5 scenario questions: "Which device separates broadcast domains?" "Which device extends a 100 m Ethernet cable.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think a switch "routes" packets using IP addresses like a router, or that a router "switches" frames.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A repeater can be used to connect two different network segments that use different data link protocols (e.g., Ethernet and Wi‑Fi).', answer: 'The statement is false',
                  options: ['The statement is false', 'routes', 'switches'],
                  hint: 'Review OSI layer functions: Physical = bits/signals, Data Link = frames/MAC, Network = packets/IP.',
                  misconception: 'Students often think a switch "routes" packets using IP addresses like a router, or that a router "switches" frames using MAC addresses.' }
          ],
            remediations: { 'a-switch-routes-packets-using': { steps: ['Revisit the OSI model layers (Physical, Data Link, Network, Transport, Session, Presentation, Application) and write.', 'Create a comparison table with columns: Device, OSI Layer, Addressing Used, Collision Domains, Broadcast Domains.', 'Fill it from memory, then check against textbook.', 'Practice 5 scenario questions: "Which device separates broadcast domains?" "Which device extends a 100 m Ethernet cable.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_004', difficulty: 'standard',
          question: 'Guided transmission media are physical cables that provide a conduit for.',
          hint: 'If stuck, revisit the "Types of Networks" (c12_cs_cbse_01_002) and "Network Devices".',
          misconception: 'Students often believe "Fiber is always faster than copper" and therefore select fiber for a 20 m desktop connection.',
          parts: [
                { id: 'a', prompt: 'A school lab needs a 150 m backbone link between two switches. The budget allows either Cat 6 UTP (100 m max segment) or Multi‑mode fiber (550 m at 1 Gbps).', answer: 'Step 1: Note required distance = 150 m',
                  options: ['Step 1: Note required distance = 150 m', 'Fiber is always faster than copper'],
                  hint: 'If stuck, revisit the "Types of Networks" (c12_cs_cbse_01_002) and "Network Devices".',
                  misconception: 'Students often believe "Fiber is always faster than copper" and therefore select fiber for a 20 m desktop connection in a board exam case.' }
          ],
            remediations: { 'fiber-is-always-faster-than': { steps: ['Re‑watch a 5‑minute cable cross‑section animation (search "twisted pair vs coaxial vs fiber cross section").', 'Re‑read the specification table in the NCERT Computer Networks chapter (bandwidth, max length, attenuation for each.', 'Do a hands‑on "cable identification" drill: given 6 unlabeled cable snippets, label each as UTP Cat 5e, UTP Cat 6, STP.', 'Re‑attempt Diagnostic Questions 3 and 4; if still wrong, revisit node c12_cs_cbse_01_003 (Network Devices) to see where.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_005', difficulty: 'standard',
          question: 'Unguided transmission media (wireless media) transmit electromagnetic signals.',
          hint: 'If stuck, revisit Class 12 Physics Chapter 8 (Electromagnetic Waves) — specifically sky.',
          misconception: 'Students often believe "higher frequency always means better (faster, longer range) wireless." They write: "Microwave.',
          parts: [
                { id: 'a', prompt: 'State the frequency range of microwaves used in terrestrial communication and name the propagation mode they primarily use.', answer: 'Microwaves: 300 MHz – 300 GHz (commonly 1–40 GHz for terrestrial links)',
                  options: ['Microwaves: 300 MHz – 300 GHz (commonly 1–40 GHz for terrestrial links)', 'microwaves use sky wave propagation', 'higher frequency always means better (faster, longer range) wireless', 'Microwave is better than radio'],
                  hint: 'If stuck, revisit Class 12 Physics Chapter 8 (Electromagnetic Waves) — specifically sky wave.',
                  misconception: 'Students often believe "higher frequency always means better (faster, longer range) wireless." They write: "Microwave is better than radio.' },
                { id: 'b', prompt: 'A company needs to connect two offices 40 km apart in hilly terrain where laying fiber is impossible.', answer: 'Microwave (6 GHz) is best',
                  options: ['Microwave (6 GHz) is best', 'higher frequency always means better (faster, longer range) wireless', 'Microwave is better than radio', '"higher frequency always means better (faster, longer range) wireless'],
                  hint: 'If stuck, revisit Class 12 Physics Chapter 8 (Electromagnetic Waves) — specifically sky wave.',
                  misconception: 'Students often believe "higher frequency always means better (faster, longer range) wireless." They write: "Microwave is better than radio.' }
          ],
            remediations: { 'higher-frequency-always-means-better': { steps: ['Revisit electromagnetic spectrum chart (Class 12 Physics Ch 8 node c12_phy_ch08_001) — locate radio/microwave/IR bands.', 'Draw a table: Frequency Band | Range | Propagation | Typical Use | Range Limit. Fill from NCERT.', 'Watch 5-min animation of ionospheric reflection (sky wave) vs LOS microwave vs satellite geometry.', 'Re-attempt Diagnostic Q3 and Q6 — if still wrong, ask teacher to demonstrate path loss calculator (friis equation) for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_006', difficulty: 'standard',
          question: 'An IPv4 address is a 32-bit logical identifier assigned to each device on.',
          hint: 'Review 8-bit binary place values (128, 64, 32, 16, 8, 4, 2, 1) and practice converting.',
          misconception: 'Students often believe the "class" of an IP address is determined by the subnet mask configured on the interface (e.g.',
          parts: [
                { id: 'a', prompt: 'What is the maximum decimal value of the first octet in a Class A IPv4 address, and which bit pattern in the first octet defines Class A?', answer: 'The maximum first-octet value for Class A is 127',
                  options: ['The maximum first-octet value for Class A is 127', 'leading bits 10', 'if I set mask 255.255.255.0 on 10.0.0.1, it becomes Class C'],
                  hint: 'Review 8-bit binary place values (128, 64, 32, 16, 8, 4, 2, 1) and practice converting 10, 127.',
                  misconception: 'Students often believe the "class" of an IP address is determined by the subnet mask configured on the interface (e.g., "if I set mask.' },
                { id: 'b', prompt: 'A student writes: "The IP address 172.16.255.255 is a Class B broadcast address." Is this statement correct? Explain why or why not.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'incorrect', 'if I set mask 255.255.255.0 on 10.0.0.1, it becomes Class C', '172.16'],
                  hint: 'Review 8-bit binary place values (128, 64, 32, 16, 8, 4, 2, 1) and practice converting 10, 127.',
                  misconception: 'Students often believe the "class" of an IP address is determined by the subnet mask configured on the interface (e.g., "if I set mask.' },
                { id: 'c', prompt: 'Given the IPv4 address 203.0.113.45, determine: (a) its class, (b) default subnet mask in dotted-decimal and CIDR notation, (c) network address, (d) broadcast.', answer: 'its class, (',
                  options: ['its class, (', 'Class B', '/16 mask', 'if I set mask 255.255.255.0 on 10.0.0.1, it becomes Class C'],
                  hint: 'Review 8-bit binary place values (128, 64, 32, 16, 8, 4, 2, 1) and practice converting 10, 127.',
                  misconception: 'Students often believe the "class" of an IP address is determined by the subnet mask configured on the interface (e.g., "if I set mask.' },
                { id: 'd', prompt: 'Compare the total number of usable host addresses available in a single Class A network versus a single Class B network.', answer: 'Class A: 2^24 - 2 ≈ 16.7 million usable hosts',
                  options: ['Class A: 2^24 - 2 ≈ 16.7 million usable hosts', 'Class B has more', 'if I set mask 255.255.255.0 on 10.0.0.1, it becomes Class C'],
                  hint: 'Review 8-bit binary place values (128, 64, 32, 16, 8, 4, 2, 1) and practice converting 10, 127.',
                  misconception: 'Students often believe the "class" of an IP address is determined by the subnet mask configured on the interface (e.g., "if I set mask.' }
          ],
            remediations: { 'the-class-of-an-ip': { steps: ['Have the student write the binary of first octets 10, 130, 200, 224, 240 and circle the leading bits.', 'Ask them to map each leading-bit pattern to its class name and first-octet decimal range using a 3-column table.', 'Give 5 addresses (e.g., 10.1.1.1, 128.0.0.1, 191.255.255.255, 192.168.0.1, 239.255.255.255) and have them classify each.', 'Re-diagnose with: "Classify 172.31.255.255 and state its default mask." — if they answer Class B / 255.255.0.0, the fix.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
