import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch11_p1: SimDef = {
    id: 'v3_c11_cs_ch11_p1',
    title: 'Computer Networks and Cyber Safety · Part 1/3',
    subtitle: 'See what makes devices a network and why LAN, MAN and WAN are measured in geography, not wires.',
    classLevel: 11, subject: 'computer_science', topic: 'Computer Networks and Cyber Safety · Part 1/3',
    chapters: ['c11_cs_ch11'],
    nodeIds: ['c11_cs_cbse_11_001', 'c11_cs_cbse_11_002', 'c11_cs_cbse_11_003', 'c11_cs_cbse_11_004', 'c11_cs_cbse_11_005', 'c11_cs_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an IT planner connecting a school\'s devices', intro: 'Four devices, one printer, one movie — figure out who talks to whom, over what medium, speaking which protocol.', goal: 'Identify network components and classify networks by geographical span.' },
    discovery: {
        question: 'A school lab\'s computers share files and one printer, but the internet is down. Is the lab still a network?',
        options: ['Yes — a LAN exists on its own; the internet is a service that rides on networks, not a requirement', 'No — without internet there is nothing to share', 'Only if the computers use cables, since Wi-Fi needs internet', 'No — a network requires a server connected to the web'],
        answer: 'Yes — a LAN exists on its own; the internet is a service that rides on networks, not a requirement',
        hook: 'Network ≠ internet — two machines sharing a printer are already a network; the web is just the biggest one.',
    },
    teaching: [
        { title: 'Introduction to Computer Networks', text: 'A computer network is an interconnected collection of autonomous computing devices (nodes) that communicate and share resources (data, hardware, software) through a shared transmission medium.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map sender, receiver, medium and protocol for phone-to-printer and laptop-to-TV, then classify a campus network versus a city-spanning link.',
        labels: ['Introduction to Computer Networks', 'Types of Networks: LAN,', 'Network Topologies: Bus, Star,', 'Network Devices: Hub, Switch,', 'Transmission Media: Guided', 'IP Address: IPv4'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_001', title: 'Introduction to Computer Networks',
          caseStudy: { intro: 'Imagine you and three friends are working on a group project from different homes.',
            decisions: [{ prompt: 'Define a computer network in your own words, and state the one characteristic that distinguishes it from a mere collection of computers.', options: [
                { text: 'A computer network is a set of autonomous computers interconnected by a transmission', outcome: 'A computer network is a set of autonomous computers interconnected by a transmission medium.' },
                { text: 'cables connecting computers', outcome: 'Not quite — Students often believe "network = internet" — they think a group of computers connected in a room.', reveals: 'network-internet-they-think-a' },
                { text: 'network = internet', outcome: 'Not quite — Students often believe "network = internet" — they think a group of computers connected in a room.', reveals: 'network-internet-they-think-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_002', title: 'Types of Networks: LAN, MAN, WAN',
          caseStudy: { intro: 'Imagine you are sharing a video file with a friend sitting next to you in the same classroom using a Wi-Fi hotspot—what type of network is that?',
            decisions: [{ prompt: 'What is the primary criterion used to distinguish a LAN from a MAN and a WAN?', options: [
                { text: 'The primary criterion is the geographical area covered: LAN covers a small area (e.g., a', outcome: 'The primary criterion is the geographical area covered: LAN covers a small area (e.g., a building).' },
                { text: 'cable type', outcome: 'Not quite — Students often think that "LAN = wired, WAN = wireless" or "LAN = fast, WAN = slow." They confuse.', reveals: 'lan-wired' },
                { text: 'LAN = wired, WAN = wireless', outcome: 'Not quite — Students often think that "LAN = wired, WAN = wireless" or "LAN = fast, WAN = slow." They confuse.', reveals: 'lan-wired' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_003', title: 'Network Topologies: Bus, Star, Ring, Mesh, Tree',
          caseStudy: { intro: 'Imagine you are setting up a computer lab for 20 computers in your school. You have a limited budget but need reliable connectivity.',
            decisions: [{ prompt: 'Define "network topology" and name the five standard topologies covered in CBSE Class 11.', options: [
                { text: 'Network topology is the arrangement of nodes and links in a network, defining data flow', outcome: 'Network topology is the arrangement of nodes and links in a network, defining data flow paths.' },
                { text: 'Hybrid', outcome: 'Not quite — Students often believe "Star topology requires a server at the center." They confuse the central.', reveals: 'star-topology-requires-a-server' },
                { text: 'Wireless', outcome: 'Not quite — Students often believe "Star topology requires a server at the center." They confuse the central.', reveals: 'star-topology-requires-a-server' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_004', title: 'Network Devices: Hub, Switch, Router, Modem, Gateway',
          caseStudy: { intro: 'Imagine you are setting up a computer lab in your school with 30 computers that need to share files and access the internet.',
            decisions: [{ prompt: 'What is the primary function of a hub in a network, and at which OSI layer does it operate?', options: [
                { text: 'A hub operates at the Physical Layer (Layer 1) and simply regenerates and broadcasts', outcome: 'A hub operates at the Physical Layer (Layer 1) and simply regenerates and broadcasts incoming.' },
                { text: 'hub uses MAC addresses', outcome: 'Not quite — Students often think a router and a modem are the same device because home "routers" provided.', reveals: 'a-router-and-a-modem' },
                { text: 'hub operates at Layer 2', outcome: 'Not quite — Students often think a router and a modem are the same device because home "routers" provided.', reveals: 'a-router-and-a-modem' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_005', title: 'Transmission Media: Guided and Unguided',
          caseStudy: { intro: 'Imagine you\'re setting up a network for your school\'s new computer lab - should you use Ethernet cables, Wi-Fi, or fiber optics?',
            decisions: [{ prompt: 'What is the fundamental physical difference between guided and unguided transmission media that determines how signals propagate?', options: [
                { text: 'Guided media uses physical conductors (copper wires or glass fibers) that physically', outcome: 'Guided media uses physical conductors (copper wires or glass fibers) that physically confine and.' },
                { text: 'guided is faster', outcome: 'Not quite — Students believe "wireless (unguided) is always more convenient and modern, so it should replace.', reveals: 'wireless-unguided-is-always-more' },
                { text: 'guided uses wires, unguided doesn\'t', outcome: 'Not quite — Students believe "wireless (unguided) is always more convenient and modern, so it should replace.', reveals: 'wireless-unguided-is-always-more' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_cs_cbse_11_006', title: 'IP Address: IPv4 and IPv6',
          scaffold: { problem: 'A school lab has 60 devices. The network administrator allocates the IPv4 block 192.168.10.0/26.',
            steps: [
            { text: 'Identify prefix length = 26, so host bits = 32 - 26 = 6.' },
            { text: 'Calculate total addresses in block = 2^6 = 64.' },
            { text: 'Usable hosts = 64 - 2 (network + broadcast) = 62.' },
            { text: 'Compare 62 usable ≥ 60 devices → sufficient.' },
            { text: 'Network address = 192.168.10.0 (host bits all 0). First usable = 192.168.10.1.', faded: true, blankAnswer: 'Yes, 62 usable addresses; first usable 192.168.10.1, last.' }
            ] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'The school ISP link is down all week. A classmate says the computer lab is now \'useless — no network without internet\'. Your team still needs to share a 2 GB dataset across 30 lab PCs and use the single lab printer.',
            decisions: [{ prompt: 'Can the lab still function as a network?', options: [
                { text: 'Yes — it\'s a LAN: autonomous PCs interconnected to share files and the printer. A network needs sender, receiver, medium and a shared protocol — internet is a network OF networks, not a requirement for one. File sharing and printing run fine with the WAN link down.', outcome: 'Connectivity to the global internet is optional; local resource-sharing over agreed protocols IS the definition of a network.' },
                { text: 'No — no internet means no network; \'network\' and \'internet\' are the same thing.', outcome: 'That conflation would declare every offline office LAN \'not a network\'; the lab\'s file shares and printer prove otherwise.', reveals: 'network-equals-internet' },
                { text: 'Partly — files can be shared only by copying to pen drives, which technically forms a \'sneakernet\'.', outcome: 'Carrying drives isn\'t a computer network at all — the lab\'s existing cables and protocols already provide real-time sharing without internet.', reveals: 'sneakernet-counts-as-lan' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'Geography and ownership classify a network — LAN for a campus, MAN for a city — not the cable or the speed.',
            decisions: [{ prompt: 'What comes next? Computer Networks and Cyber Safety · Part 2/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Computer Networks and Cyber Safety · Part 2/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_001', difficulty: 'standard',
          question: 'A computer network is an interconnected collection of autonomous computing.',
          hint: 'If stuck, revisit the idea of "data transfer" from Class 9-10 IT/ICT: how a file moves.',
          misconception: 'Students often believe "network = internet" — they think a group of computers connected in a room without internet.',
          parts: [
                { id: 'a', prompt: 'A school has 20 computers in a lab, all connected to a central switch. The switch is not connected to the internet or any server.', answer: 'No, this is not a computer network in the functional sense',
                  options: ['No, this is not a computer network in the functional sense', 'yes, because they are connected by cables', 'network = internet'],
                  hint: 'If stuck, revisit the idea of "data transfer" from Class 9-10 IT/ICT: how a file moves from phone.',
                  misconception: 'Students often believe "network = internet" — they think a group of computers connected in a room without internet access is *not*.' }
          ],
            remediations: { 'network-internet-they-think-a': { steps: ['If the student equates network with internet: (1) Disconnect the classroom router\'s WAN cable; (2) Have students ping.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "network = internet" — they think a group of computers connected in a room without internet.',
          parts: [
                { id: 'a', prompt: 'A company decides to replace all standalone PCs with a networked environment.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'network = internet'],
                  hint: 'If stuck, revisit the idea of "data transfer" from Class 9-10 IT/ICT: how a file moves from phone.',
                  misconception: 'Students often believe "network = internet" — they think a group of computers connected in a room without internet access is *not*.' }
          ],
            remediations: { 'network-internet-they-think-a': { steps: ['If the student equates network with internet: (1) Disconnect the classroom router\'s WAN cable; (2) Have students ping.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_002', difficulty: 'standard',
          question: 'A Local Area Network (LAN) connects computers within a limited geographical.',
          hint: 'Revisit "Introduction to Computer Networks" (c11_cs_cbse_11_001) and practice identifying.',
          misconception: 'Students often think that "LAN = wired, WAN = wireless" or "LAN = fast, WAN = slow." They confuse the technology.',
          parts: [
                { id: 'a', prompt: 'A university has three campuses in the same city connected by dedicated fiber optic cables.', answer: 'Each campus network is a LAN (confined to a single campus)',
                  options: ['Each campus network is a LAN (confined to a single campus)', 'LAN = wired, WAN = wireless', 'LAN = fast, WAN = slow', '"LAN = wired, WAN = wireless" or "LAN = fast, WAN = slow'],
                  hint: 'Revisit "Introduction to Computer Networks" (c11_cs_cbse_11_001) and practice identifying network.',
                  misconception: 'Students often think that "LAN = wired, WAN = wireless" or "LAN = fast, WAN = slow." They confuse the technology (Ethernet, Wi-Fi, fiber.' }
          ],
            remediations: { 'lan-wired': { steps: ['Draw three concentric circles labeled Building → City → World.', 'Place LAN, MAN, WAN respectively.', 'For each circle, list: (a) typical distance range, (b) who owns the cables/links, (c) one real example.', 'Give the student five short scenarios (e.g., "home Wi-Fi," "city traffic camera network," "bank ATM network across.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_003', difficulty: 'standard',
          question: 'Network topology refers to the physical or logical arrangement of nodes.',
          hint: 'Revisit c11_cs_cbse_11_002 to clarify the difference between network type (geographic.',
          misconception: 'Students often believe "Star topology requires a server at the center." They confuse the central connecting device.',
          parts: [
                { id: 'a', prompt: 'In a Star topology, all nodes connect to a central device. Explain why a single cable failure affects only one node, whereas in Bus topology the same failure.', answer: 'In Star, each node has a dedicated point-to-point link to the central hub/switch',
                  options: ['In Star, each node has a dedicated point-to-point link to the central hub/switch', 'Star has more cables so it\'s safer', 'Star is robust', 'Star topology requires a server at the center'],
                  hint: 'Revisit c11_cs_cbse_11_002 to clarify the difference between network type (geographic scope) and.',
                  misconception: 'Students often believe "Star topology requires a server at the center." They confuse the central connecting device (hub/switch) with.' },
                { id: 'b', prompt: 'A small startup has 8 computers and wants to minimize cabling cost while allowing easy addition of new devices. They do not have a dedicated server room.', answer: 'Recommend Bus topology',
                  options: ['Recommend Bus topology', 'reliability', 'Star topology requires a server at the center', 'Server'],
                  hint: 'Revisit c11_cs_cbse_11_002 to clarify the difference between network type (geographic scope) and.',
                  misconception: 'Students often believe "Star topology requires a server at the center." They confuse the central connecting device (hub/switch) with.' }
          ],
            remediations: { 'star-topology-requires-a-server': { steps: ['Show a physical switch and a server side-by-side; emphasize switch has many ports, server has 1-2 NICs.', 'Draw Star topology twice — first with a switch at center labeled "Switch (Layer 2)", second with a server at center.', 'Simulate failure: unplug switch cable → all PCs lose connectivity; unplug server cable → PCs can still ping each other.', 'Assign a 2-minute write: "Explain why the central device in Star is not necessarily a server."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_004', difficulty: 'standard',
          question: 'Network devices are hardware components that facilitate communication and data.',
          hint: 'Review the OSI model layer functions (especially Layer 1: signals, Layer 2: frames/MAC.',
          misconception: 'Students often think a router and a modem are the same device because home "routers" provided by ISPs are actually.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Network devices are hardware components that facilitate communication and data transfer',
                  options: ['Network devices are hardware components that facilitate communication and data transfer', 'A computer network is an interconnected collection of autonomous computing devices', 'A Local Area Network (LAN) connects computers within a limited geographical area such as', 'Network topology refers to the physical or logical arrangement of nodes (computers,'],
                  hint: 'Review the OSI model layer functions (especially Layer 1: signals, Layer 2: frames/MAC, Layer 3.',
                  misconception: 'Students often think a router and a modem are the same device because home "routers" provided by ISPs are actually combo devices.' }
          ],
            remediations: { 'a-router-and-a-modem': { steps: ['If a student confuses modem/router/switch, have them trace a packet from a PC to a website: 1) PC creates packet with.', 'Emphasize: switch uses MAC, router uses IP, modem uses signals.', 'Draw the layered encapsulation/decapsulation at each hop.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_005', difficulty: 'standard',
          question: 'Transmission media refers to the physical pathway or channel through which data.',
          hint: 'Review "Introduction to Computer Networks" (c11_cs_cbse_11_001) focusing on the OSI.',
          misconception: 'Students believe "wireless (unguided) is always more convenient and modern, so it should replace wired (guided).',
          parts: [
                { id: 'a', prompt: 'Your school wants to connect two buildings 800 meters apart across a public road where digging permission is denied. The network requires 1 Gbps bandwidth.', answer: 'Outdoor-rated Cat6 UTP with media converters, (',
                  options: ['Outdoor-rated Cat6 UTP with media converters, (', 'wireless is easier', 'They equate'],
                  hint: 'Review "Introduction to Computer Networks" (c11_cs_cbse_11_001) focusing on the OSI model\'s.',
                  misconception: 'Students believe "wireless (unguided) is always more convenient and modern, so it should replace wired (guided) everywhere." They equate.' }
          ],
            remediations: { 'wireless-unguided-is-always-more': { steps: ['Have the student physically trace a wired connection from PC → wall jack → patch panel → switch → router, then trace.', 'Emphasize: "Wireless still needs wires - it just moves the cable from your desk to the ceiling." 2.', 'Run a practical test: Transfer a 1 GB file between two laptops via (a) direct Cat6 cable, (b) Wi-Fi 5GHz 1m apart, (c).', 'Record time and calculate throughput.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_006', difficulty: 'standard',
          question: 'An IP address is a unique numerical identifier assigned to each device on.',
          hint: 'Revisit binary conversion (decimal ↔ 8-bit binary) and exponent rules (2^a × 2^b.',
          misconception: 'Students often think IPv6 addresses are "just longer IPv4 addresses" and treat each hex group as an independent octet.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An IP address is a unique numerical identifier assigned to each device on a network that',
                  options: ['An IP address is a unique numerical identifier assigned to each device on a network that', 'A computer network is an interconnected collection of autonomous computing devices', 'A Local Area Network (LAN) connects computers within a limited geographical area such as', 'Network topology refers to the physical or logical arrangement of nodes (computers,'],
                  hint: 'Revisit binary conversion (decimal ↔ 8-bit binary) and exponent rules (2^a × 2^b = 2^(a+b)) from.',
                  misconception: 'Students often think IPv6 addresses are "just longer IPv4 addresses" and treat each hex group as an independent octet.' }
          ],
            remediations: { 'ipv6-addresses-are-just-longer': { steps: ['Have the student write an IPv6 address in full 32-hex-digit form (no compression) to internalize the 128-bit length.', 'Use a /64 prefix on paper: draw a 128-bit line, mark the /64 boundary, label "Subnet Prefix" and "Interface ID".', 'Practice compressing only the longest zero run: give five addresses with multiple zero sequences; student must identify.', 'Contrast IPv4 subnet mask (dotted decimal) with IPv6 prefix length (/n) by converting 255.255.255.192 → /26.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
