import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch03_p1: SimDef = {
    id: 'v3_c12_ip_ch03_p1',
    title: 'Introduction to Computer Networks · Part 1/2',
    subtitle: 'The cable was hardware — the protocols made it a network',
    classLevel: 12, subject: 'informatics_practices', topic: 'Introduction to Computer Networks · Part 1/2',
    chapters: ['c12_ip_ch03'],
    nodeIds: ['c12_ip_cbse_03_001', 'c12_ip_cbse_03_002', 'c12_ip_cbse_03_003', 'c12_ip_cbse_03_004', 'c12_ip_cbse_03_005', 'c12_ip_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Network planner', intro: 'Fifty computers, one printer, one internet line — the network is the agreement that lets them share.', goal: 'Define a network by function — nodes, links, protocols, and resource sharing over mere connection.' },
    discovery: {
        question: 'Two laptops joined by one Ethernet cable — is that a network? Not until something invisible agrees to the conversation. What\'s missing?',
        options: ['Protocols and configuration — addressing, TCP/IP, sharing services; the cable is only the medium, the rules make it a network', 'A faster cable — two nodes need real bandwidth before they can exchange data', 'Internet access — a link is not a network until it can reach the web', 'A shared password — security credentials are what authorise the connection'],
        answer: 'Protocols and configuration — addressing, TCP/IP, sharing services; the cable is only the medium, the rules make it a network',
        hook: 'A network is defined by function, not wires — one printer serving thirty PCs is the purpose made visible. And \'network\' vs \'distributed system\' is the transparency line: in a network you know there are many machines; a distributed system hides them behind one face.',
    },
    teaching: [
        { title: 'What is a computer network: definition and purpose', text: 'A computer network is a collection of interconnected computing devices (such as computers, servers, printers, and smartphones) linked by communication channels (wired or wireless) that enables them.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Wire a school lab for sharing: list the hardware AND the protocol layer that makes one printer serve thirty machines, then weigh connection against purpose.',
        labels: ['What is a computer', 'Types of networks: LAN,', 'Network topologies: bus, star,', 'Transmission media: guided (twisted', 'Network devices: hub, switch,', 'IP addressing: IPv4 structure,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_001', title: 'What is a computer network: definition and purpose',
          caseStudy: { intro: 'Imagine your school has 50 computers in the lab, but only one high-speed printer and one internet connection.',
            decisions: [{ prompt: 'Define a computer network in one sentence using the terms \'nodes\', \'links\', and \'protocols\'.', options: [
                { text: 'A computer network is a set of nodes (computing devices) connected by links', outcome: 'A computer network is a set of nodes (computing devices) connected by links (communication.' },
                { text: 'computers connected by cables', outcome: 'Not quite — Students often equate a computer network with its physical components (cables, routers, switches).', reveals: 'students-often-equate-a-computer' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_002', title: 'Types of networks: LAN, MAN, WAN, and PAN',
          caseStudy: { intro: 'Imagine you are designing the network infrastructure for a new university.',
            decisions: [{ prompt: 'Which network type typically uses Bluetooth or Zigbee as its primary communication technology and covers a radius of about 10 metres around.', options: [
                { text: 'PAN (Personal Area Network)', outcome: 'PAN (Personal Area Network). A wrong answer (e.g., LAN) reveals the student confuses short-range.' },
                { text: 'LAN = wired, WAN = wireless', outcome: 'Not quite — Students often think "LAN = wired, WAN = wireless". In reality, LANs can be wireless (Wi-Fi) and.', reveals: 'lan-wired' },
                { text: '"LAN = wired, WAN = wireless"', outcome: 'Not quite — Students often think "LAN = wired, WAN = wireless". In reality, LANs can be wireless (Wi-Fi) and.', reveals: 'lan-wired' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_003', title: 'Network topologies: bus, star, ring, and tree',
          caseStudy: { intro: 'Imagine you are the network administrator for a new school building with three computer labs (30 PCs each), an admin office (10 PCs), and a library (5 PCs).',
            decisions: [{ prompt: 'Define bus topology and state the function of terminators at both ends of the backbone cable.', options: [
                { text: '**Correct answer:** Bus topology uses a single central cable (backbone) to', outcome: '**Correct answer:** Bus topology uses a single central cable (backbone) to which all nodes connect.' },
                { text: 'terminators boost the signal', outcome: 'Not quite — **Misconception:** "Tree topology is just a combination of bus and star, so it inherits all.', reveals: 'misconception-tree-topology-is-just' },
                { text: 'terminators connect the ends to form a ring', outcome: 'Not quite — **Misconception:** "Tree topology is just a combination of bus and star, so it inherits all.', reveals: 'misconception-tree-topology-is-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_004', title: 'Transmission media: guided (twisted pair, coaxial, fiber) vs unguided',
          caseStudy: { intro: 'Imagine you are the network administrator for a new school building.',
            decisions: [{ prompt: '**REMEMBER:** Name the three guided transmission media types covered in the NCERT Class 12 IP syllabus and state one distinguishing.', options: [
                { text: 'The three guided media are: (1) Twisted Pair', outcome: 'The three guided media are: (1) Twisted Pair — two insulated copper wires twisted together.' },
                { text: 'Wi-Fi" as guided', outcome: 'Not quite — **Misconception:** "Fiber optic cable is just \'better\' than copper in every way, so we should.', reveals: 'misconception-fiber-optic-cable-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_005', title: 'Network devices: hub, switch, router, repeater, gateway, modem',
          caseStudy: { intro: 'Imagine your school computer lab has 30 PCs connected to a single internet line.',
            decisions: [{ prompt: 'Name the OSI layer at which a switch operates and state its primary forwarding criterion.', options: [
                { text: 'A switch operates at **Layer 2 (Data Link Layer)** and forwards frames based on', outcome: 'A switch operates at **Layer 2 (Data Link Layer)** and forwards frames based on **destination MAC.' },
                { text: 'Layer 3 / IP address', outcome: 'Not quite — Students often write **“switch forwards data based on IP address”** or **“router works on MAC.', reveals: 'students-often-write-switch-forwards' },
                { text: 'switch forwards by MAC, router forwards by IP', outcome: 'Not quite — Students often write **“switch forwards data based on IP address”** or **“router works on MAC.', reveals: 'students-often-write-switch-forwards' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_03_006', title: 'IP addressing: IPv4 structure, classes, and subnet masks',
          scaffold: { problem: 'A school network uses 172.16.0.0/16. The admin wants to create subnets for 4 labs, each supporting up to 500 devices.',
            steps: [
            { text: 'Identify given: base network 172.16.0.0/16 (Class B default). Need 4 subnets → borrow 2 bits (2^2 = 4).' },
            { text: 'New prefix length = 16 + 2 = 18 → mask /18 = 255.255.192.0 (binary: 11111111.11111111.11000000.00000000).' },
            { text: 'Subnet block size = 2^(32−18) = 2^14 = 16384 addresses. In third octet: increment = 256 / 4 = 64.' },
            { text: 'Usable hosts per subnet = 2^14 − 2 = 16382 (far more than 500, but /18 is smallest mask giving ≥4 subnets; /19 would.' },
            { text: 'Verify: 172.16.0.0/18 → network 172.16.0.0, broadcast 172.16.63.255, usable 172.16.0.1 – 172.16.63.254. Correct.', faded: true, blankAnswer: 'New mask: 255.255.192.0 (/18). Subnets: 172.16.0.0/18.' }
            ] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A campus IT proposal describes the college\'s three buildings — linked by the college\'s own fibre over 2 km — as a \'MAN deployment\' to justify leasing telecom circuits.',
            decisions: [{ prompt: 'Is the classification right?', options: [
                { text: 'No — it\'s a LAN: 2 km with the organisation owning the medium end-to-end is local by scope and private by ownership; MAN means a city-scale 5–50 km reach, usually on leased lines — calling it one inflates the design and the bill.', outcome: 'The chapter\'s test is geography plus who owns the wire: private fibre across a campus is a LAN whatever the building count; the proposal spent MAN money on LAN facts.' },
                { text: 'Yes — three buildings means \'metropolitan\' by definition.', outcome: 'Building count isn\'t the classifier — scope and medium are; a multi-building campus on owned fibre is textbook LAN, and \'metropolitan\' starts at city scale.', reveals: 'many-buildings-equals-man' },
                { text: 'Call it a WAN — any inter-building link rides the wide area.', outcome: 'WAN crosses regions and countries on public telecom infrastructure; 2 km of private fibre never leaves the campus, let alone the public network.', reveals: 'any-link-is-wan' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now define a network by what it enables — and spot the protocol layer invisible inside every \'connected\' device.',
            decisions: [{ prompt: 'What comes next? Introduction to Computer Networks · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Introduction to Computer Networks · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_001', difficulty: 'standard',
          question: 'A computer network is a collection of interconnected computing devices (such.',
          hint: 'Revisit Class 11 IP node c11_ip_cbse_11_001 (Introduction to Computer Networks) and.',
          misconception: 'Students often equate a computer network with its physical components (cables, routers, switches) and overlook that.',
          parts: [
                { id: 'a', prompt: 'Define a computer network in one sentence using the terms \'nodes\', \'links\', and \'protocols\'.', answer: 'A computer network is a set of nodes (computing devices) connected by links',
                  options: ['A computer network is a set of nodes (computing devices) connected by links', 'computers connected by cables'],
                  hint: 'Revisit Class 11 IP node c11_ip_cbse_11_001 (Introduction to Computer Networks) and.',
                  misconception: 'Students often equate a computer network with its physical components (cables, routers, switches) and overlook that a network.' }
          ],
            remediations: { 'students-often-equate-a-computer': { steps: ['If the student defines a network only by hardware, do this 3-step remediation: (1) Show two laptops connected by.', 'Ask: "Is this a network?" (2) Enable file sharing, set static IPs, verify ping and folder access.', 'The cable is same." (3) Have them write the NCERT definition highlighting "protocols" and "resource sharing." Re-test.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_002', difficulty: 'standard',
          question: 'A computer network is classified by its geographical span into four primary.',
          hint: 'Review Class 11 node c11_cs_cbse_11_002 "Types of Networks: LAN, MAN, WAN" and re-make.',
          misconception: 'Students often think "LAN = wired, WAN = wireless". In reality, LANs can be wireless (Wi-Fi) and WANs can be wired.',
          parts: [
                { id: 'a', prompt: 'Which network type typically uses Bluetooth or Zigbee as its primary communication technology and covers a radius of about 10 metres around a person?', answer: 'PAN (Personal Area Network)',
                  options: ['PAN (Personal Area Network)', 'LAN = wired, WAN = wireless', '"LAN = wired, WAN = wireless"'],
                  hint: 'Review Class 11 node c11_cs_cbse_11_002 "Types of Networks: LAN, MAN, WAN" and re-make the.',
                  misconception: 'Students often think "LAN = wired, WAN = wireless". In reality, LANs can be wireless (Wi-Fi) and WANs can be wired (submarine fibre).' },
                { id: 'b', prompt: 'A city government deploys a wireless network covering 40 km to connect traffic cameras, smart streetlights, and municipal offices.', answer: 'MAN (Metropolitan Area Network)',
                  options: ['MAN (Metropolitan Area Network)', 'LAN = wired, WAN = wireless', '"LAN = wired, WAN = wireless"'],
                  hint: 'Review Class 11 node c11_cs_cbse_11_002 "Types of Networks: LAN, MAN, WAN" and re-make the.',
                  misconception: 'Students often think "LAN = wired, WAN = wireless". In reality, LANs can be wireless (Wi-Fi) and WANs can be wired (submarine fibre).' },
                { id: 'c', prompt: 'Compare the typical latency and bandwidth characteristics of a LAN (1 Gbps Ethernet) and a WAN (leased line 100 Mbps) when transferring a 10 GB dataset between.', answer: 'LAN will complete faster',
                  options: ['LAN will complete faster', 'LAN = wired, WAN = wireless', '"LAN = wired, WAN = wireless"'],
                  hint: 'Review Class 11 node c11_cs_cbse_11_002 "Types of Networks: LAN, MAN, WAN" and re-make the.',
                  misconception: 'Students often think "LAN = wired, WAN = wireless". In reality, LANs can be wireless (Wi-Fi) and WANs can be wired (submarine fibre).' }
          ],
            remediations: { 'lan-wired': { steps: ['Revisit node c11_cs_cbse_11_002 (Class 11 Types of Networks) and re-read the distance-range table.', 'Create a four-row comparison table (PAN/LAN/MAN/WAN) with columns: Max Distance, Typical Media, Ownership, Speed.', 'Take the diagnostic questions 1–3 again; if any answer is wrong, re-read the justification in the answer key and add.', 'Explain the table to a peer without looking at notes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "LAN = wired, WAN = wireless". In reality, LANs can be wireless (Wi-Fi) and WANs can be wired.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A PAN is just a very small LAN, so the same security policies (firewalls, VLANs) apply." Defend or refute with two technical reasons.', answer: 'Refute',
                  options: ['Refute', 'LAN = wired, WAN = wireless', '"LAN = wired, WAN = wireless"'],
                  hint: 'Review Class 11 node c11_cs_cbse_11_002 "Types of Networks: LAN, MAN, WAN" and re-make the.',
                  misconception: 'Students often think "LAN = wired, WAN = wireless". In reality, LANs can be wireless (Wi-Fi) and WANs can be wired (submarine fibre).' },
                { id: 'b', prompt: 'Design a network plan for a multinational bank headquartered in Mumbai with branches in Delhi, London, and Singapore.', answer: 'HQ↔branch: WAN (MPLS/VPN over internet) – connects across countries',
                  options: ['HQ↔branch: WAN (MPLS/VPN over internet) – connects across countries', 'LAN = wired, WAN = wireless', '"LAN = wired, WAN = wireless"'],
                  hint: 'Review Class 11 node c11_cs_cbse_11_002 "Types of Networks: LAN, MAN, WAN" and re-make the.',
                  misconception: 'Students often think "LAN = wired, WAN = wireless". In reality, LANs can be wireless (Wi-Fi) and WANs can be wired (submarine fibre).' }
          ],
            remediations: { 'lan-wired': { steps: ['Revisit node c11_cs_cbse_11_002 (Class 11 Types of Networks) and re-read the distance-range table.', 'Create a four-row comparison table (PAN/LAN/MAN/WAN) with columns: Max Distance, Typical Media, Ownership, Speed.', 'Take the diagnostic questions 1–3 again; if any answer is wrong, re-read the justification in the answer key and add.', 'Explain the table to a peer without looking at notes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_003', difficulty: 'standard',
          question: 'Network topology defines the physical or logical arrangement of nodes.',
          hint: 'Review the "Network Topologies" section in Class 11 CS textbook (c11_cs_cbse_11_003) and.',
          misconception: '**Misconception:** "Tree topology is just a combination of bus and star, so it inherits all advantages of both and.',
          parts: [
                { id: 'a', prompt: 'Define bus topology and state the function of terminators at both ends of the backbone cable.', answer: '**Correct answer:** Bus topology uses a single central cable (backbone) to',
                  options: ['**Correct answer:** Bus topology uses a single central cable (backbone) to', 'terminators boost the signal', 'terminators connect the ends to form a ring'],
                  hint: 'Review the "Network Topologies" section in Class 11 CS textbook (c11_cs_cbse_11_003) and practice.',
                  misconception: '**Misconception:** "Tree topology is just a combination of bus and star, so it inherits all advantages of both and no disadvantages." **Why.' }
          ],
            remediations: { 'misconception-tree-topology-is-just': { steps: ['Revisit **c11_cs_cbse_11_003** (Class 11 Network Topologies) — focus on the definition of single point of failure for.', 'Create a **comparison table** with columns: Topology, Cable Cost, Fault Impact, Scalability, Troubleshooting Ease.', 'Fill it from memory, then check against textbook.', 'Re-attempt **Diagnostic Question 4** (bank branch) and **Diagnostic Question 6** (campus design) after 24 hours.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_004', difficulty: 'standard',
          question: 'Transmission media are the physical pathways that carry data signals between.',
          hint: 'If stuck, review Class 11 CS node c11_cs_cbse_11_005 (Transmission Media: Guided and.',
          misconception: '**Misconception:** "Fiber optic cable is just \'better\' than copper in every way, so we should always use fiber." **Why.',
          parts: [
                { id: 'a', prompt: '**REMEMBER:** Name the three guided transmission media types covered in the NCERT Class 12 IP syllabus and state one distinguishing physical characteristic.', answer: 'The three guided media are: (1) Twisted Pair',
                  options: ['The three guided media are: (1) Twisted Pair', 'Wi-Fi" as guided'],
                  hint: 'If stuck, review Class 11 CS node c11_cs_cbse_11_005 (Transmission Media: Guided and Unguided) —.',
                  misconception: '**Misconception:** "Fiber optic cable is just \'better\' than copper in every way, so we should always use fiber." **Why it\'s wrong:** Fiber.' },
                { id: 'b', prompt: '**ANALYZE:** Compare the attenuation mechanisms in guided vs. unguided media.', answer: '**Guided media:** Dominant loss is **conductor resistance (I²R) and dielectric',
                  options: ['**Guided media:** Dominant loss is **conductor resistance (I²R) and dielectric', 'both lose signal equally with distance'],
                  hint: 'If stuck, review Class 11 CS node c11_cs_cbse_11_005 (Transmission Media: Guided and Unguided) —.',
                  misconception: '**Misconception:** "Fiber optic cable is just \'better\' than copper in every way, so we should always use fiber." **Why it\'s wrong:** Fiber.' }
          ],
            remediations: { 'misconception-fiber-optic-cable-is': { steps: ['If the student cannot differentiate media based on physical principles: 1.', 'Revisit **c11_cs_cbse_11_005** (Class 11 CS Transmission Media) — watch the animation of twisted pair canceling EMI and.', 'Build a comparison table with columns: Medium, Conductor Material, Signal Type, Max Bandwidth (typical), Max Distance.', 'Fill it from NCERT textbook Table 3.x.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_005', difficulty: 'standard',
          question: 'Network devices are hardware components that facilitate communication and data.',
          hint: 'If OSI layers are shaky, revisit Class 11 CS node **c11_cs_cbse_11_001** (Introduction.',
          misconception: 'Students often write **“switch forwards data based on IP address”** or **“router works on MAC address”** — swapping the.',
          parts: [
                { id: 'a', prompt: 'Name the OSI layer at which a switch operates and state its primary forwarding criterion.', answer: 'A switch operates at **Layer 2 (Data Link Layer)** and forwards frames based on',
                  options: ['A switch operates at **Layer 2 (Data Link Layer)** and forwards frames based on', 'Layer 3 / IP address', 'switch forwards by MAC, router forwards by IP'],
                  hint: 'If OSI layers are shaky, revisit Class 11 CS node **c11_cs_cbse_11_001** (Introduction to Computer.',
                  misconception: 'Students often write **“switch forwards data based on IP address”** or **“router works on MAC address”** — swapping the Layer 2/3.' }
          ],
            remediations: { 'students-often-write-switch-forwards': { steps: ['Re‑visit **c11_cs_cbse_11_004** (Class 11 Network Devices) — watch the 10‑minute video on “Hub vs Switch vs Router” and.', 'Create a **three‑column flashcard set**: Device | OSI Layer | Forwarding Criterion (Hub: L1 / N/A; Switch: L2 / MAC.', 'Do the **re‑diagnostic**: answer Diagnostic Question 3 aloud without notes.', 'If you still say “switch” for inter‑LAN, repeat step 1 focusing on the “IP network boundary” concept.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_03_006', difficulty: 'standard',
          question: 'An IPv4 address is a 32-bit logical identifier assigned to network interfaces.',
          hint: 'If stuck on binary conversion or bitwise logic, revisit c11_cs_cbse_01_011 (binary.',
          misconception: 'Students treat the subnet mask as an intrinsic property of the IP address class (e.g., "192.168.x.x always has mask.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast: (i) Classful addressing with default masks, (ii) CIDR (Classless Inter-Domain Routing) with VLSM.', answer: 'Classful: 192.168.1.0 is Class C → only one /24 (254 hosts)',
                  options: ['Classful: 192.168.1.0 is Class C → only one /24 (254 hosts)', 'use three Class C networks'],
                  hint: 'If stuck on binary conversion or bitwise logic, revisit c11_cs_cbse_01_011 (binary basics) and.',
                  misconception: 'Students treat the subnet mask as an intrinsic property of the IP address class (e.g., "192.168.x.x always has mask 255.255.255.0") rather.' }
          ],
            remediations: { 'students-treat-the-subnet-mask': { steps: ['Revisit binary conversion: practice writing 0–255 in 8-bit binary until instant (use c11_cs_cbse_01_011.', 'Drill the leading-bit rule: write first octet 1–255, classify by first 1–4 bits (0, 10, 110, 1110, 1111).', 'Do 10 subnetting problems *only in binary*: IP, mask, AND → network, OR (inverse mask) → broadcast, count host bits →.', 'Then introduce CIDR shortcut: /n means n leading 1s.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
