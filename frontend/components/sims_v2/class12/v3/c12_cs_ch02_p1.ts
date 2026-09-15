import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch02_p1: SimDef = {
    id: 'v3_c12_cs_ch02_p1',
    title: 'Network Topologies and Protocols · Part 1/2',
    subtitle: 'The cables say star, the data says otherwise',
    classLevel: 12, subject: 'computer_science', topic: 'Network Topologies and Protocols · Part 1/2',
    chapters: ['c12_cs_ch02'],
    nodeIds: ['c12_cs_cbse_02_001', 'c12_cs_cbse_02_002', 'c12_cs_cbse_02_003', 'c12_cs_cbse_02_004', 'c12_cs_cbse_02_005', 'c12_cs_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Network designer', intro: 'Before any network is built, someone draws its shape. That drawing decides cost, speed and what breaks when something fails.', goal: 'Define topology, distinguish physical from logical layouts, and compare bus, star, ring, mesh, tree and hybrid designs.' },
    discovery: {
        question: 'A lab\'s 15 computers are star-wired to a switch that just died. The admin says \'the topology is still star — look at the cables.\' Right or wrong?',
        options: ['Wrong — physical layout is star, but logical topology is the data path; a dead switch means no path exists at all', 'Right — cables decide topology, always', 'Wrong — it became a ring the moment the switch failed', 'Right — topology is whatever the diagram shows'],
        answer: 'Wrong — physical layout is star, but logical topology is the data path; a dead switch means no path exists at all',
        hook: 'Topology lives on two levels: the cables you can touch and the route data actually takes. A star-wired room running through a hub is logically a bus. Students who memorise shapes without this split miss every assertion-reason question on the topic.',
    },
    teaching: [
        { title: 'Network Topology: Definition and Types', text: 'Network topology is the geometric arrangement of nodes (computers, servers, peripherals) and links (communication channels) in a computer network, defining both the physical layout of cables/devices.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_02_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Architect a network from constraints: sketch all six topologies, count links in mesh vs star (n(n−1)/2 vs n−1), and design a hybrid that survives a single link failure with hops under two.',
        labels: ['Network Topology: Definition', 'Bus Topology: Advantages', 'Star Topology: Features', 'Ring and Mesh Topology', 'Tree and Hybrid Topology', 'Network Protocols: HTTP, HTTPS,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_001', title: 'Network Topology: Definition and Types',
          caseStudy: { intro: 'Imagine you are setting up a Wi‑Fi network for a three‑floor house: the router sits on the ground floor, laptops are on the first and second floors, and.',
            decisions: [{ prompt: 'What is the exact definition of \'network topology\' as per the CBSE Class 12 Computer Science curriculum?', options: [
                { text: 'Network topology is the geometric arrangement of nodes (computers, servers, peripherals)', outcome: 'Network topology is the geometric arrangement of nodes (computers, servers, peripherals) and links.' },
                { text: '\'topology\' only means the physical shape of cables', outcome: 'Not quite — Students often think \'topology\' only means the physical shape of cables.', reveals: 'topology-only-means-the-physical' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_002', title: 'Bus Topology: Advantages and Disadvantages',
          caseStudy: { intro: 'Imagine you are setting up a network for a temporary classroom with 5 laptops that need to share a single printer for a week-long workshop.',
            decisions: [{ prompt: 'What is the function of terminators at both ends of the backbone in a bus topology?', options: [
                { text: 'Terminators absorb electrical signals reaching the ends of the backbone, preventing', outcome: 'Terminators absorb electrical signals reaching the ends of the backbone, preventing signal.' },
                { text: 'they amplify the signal', outcome: 'Not quite — Students often believe that because bus topology uses less cable, it is "more efficient".', reveals: 'because-bus-topology-uses-less' },
                { text: 'they connect to the server', outcome: 'Not quite — Students often believe that because bus topology uses less cable, it is "more efficient".', reveals: 'because-bus-topology-uses-less' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_003', title: 'Star Topology: Features and Applications',
          caseStudy: { intro: 'Imagine you\'re setting up a computer lab for 30 students in your school.',
            decisions: [{ prompt: 'In a star topology with 15 nodes connected to a central switch, how many dedicated point-to-point links exist between nodes and the central.', options: [
                { text: '15 links', outcome: '15 links. Each node has exactly one dedicated cable connecting it to the central switch.' },
                { text: 'star topology has no single point of failure', outcome: 'Not quite — Students often believe "star topology has no single point of failure" because they focus.', reveals: 'star-topology-has-no-single' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_004', title: 'Ring and Mesh Topology: Comparison',
          caseStudy: { intro: 'Imagine you are designing a network for a new metro rail control system that must never go down — which topology would you choose and why?',
            decisions: [{ prompt: 'Define ring topology and state the medium access control method typically used in it.', options: [
                { text: 'Ring topology: each node connects to exactly two neighbors forming a closed loop; data', outcome: 'Ring topology: each node connects to exactly two neighbors forming a closed loop; data travels.' },
                { text: 'CSMA/CD', outcome: 'Not quite — Students often think "mesh topology means every device is connected to every other device" and.', reveals: 'mesh-topology-means-every-device' },
                { text: 'central hub', outcome: 'Not quite — Students often think "mesh topology means every device is connected to every other device" and.', reveals: 'mesh-topology-means-every-device' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_005', title: 'Tree and Hybrid Topology',
          caseStudy: { intro: 'Imagine your school wants to connect three buildings — Admin Block, Science Block, and Library — each having two computer labs.',
            decisions: [{ prompt: 'What is the fundamental structural difference between a tree topology and a simple star topology?', options: [
                { text: 'A tree topology has multiple hierarchical levels (root → intermediate hubs → leaf nodes)', outcome: 'A tree topology has multiple hierarchical levels (root → intermediate hubs → leaf nodes) forming.' },
                { text: 'both have a central hub', outcome: 'Not quite — Students often think "hybrid topology" means simply connecting two different topologies with.', reveals: 'hybrid-topology-means-simply-connecting' },
                { text: 'hybrid topology', outcome: 'Not quite — Students often think "hybrid topology" means simply connecting two different topologies with.', reveals: 'hybrid-topology-means-simply-connecting' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_006', title: 'Network Protocols: HTTP, HTTPS, FTP',
          caseStudy: { intro: 'Imagine you\'re browsing an online shopping site: you type "www.shop.example.com" in your browser, press Enter, and within seconds the homepage appears.',
            decisions: [{ prompt: 'A student writes: "HTTP and HTTPS are the same protocol, just HTTPS adds a password." What specific misconception does this reveal about.', options: [
                { text: 'The student confuses authentication (proving identity) with encryption (confidentiality)', outcome: 'The student confuses authentication (proving identity) with encryption (confidentiality) and thinks.' },
                { text: 'HTTPS is just HTTP with a password', outcome: 'Not quite — Students believe "HTTPS is just HTTP with a password" or "HTTPS encrypts only the password field.".', reveals: 'https-is-just-http-with' },
                { text: 'HTTPS encrypts only the password field', outcome: 'Not quite — Students believe "HTTPS is just HTTP with a password" or "HTTPS encrypts only the password field.".', reveals: 'https-is-just-http-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'An office on a coaxial bus network suffers constant collisions. The admin proposes rewiring all 20 desks to a central switch; the boss objects that a star \'wastes cable\'.',
            decisions: [{ prompt: 'Who\'s right, and why?', options: [
                { text: 'The admin — a switch gives each port its own collision domain so collisions essentially vanish; the extra per-desk cable pays for itself in recovered throughput almost immediately.', outcome: 'Physical shape costs cable, but the logical behaviour is what matters — star over switch removes the shared collision domain that bus forces on everyone.' },
                { text: 'The boss — a star uses more cable, so it\'s strictly worse.', outcome: 'Cable metres aren\'t the only cost: one shared collision domain keeps throttling all 20 machines, and retransmission losses dwarf the one-time wiring bill.', reveals: 'cable-count-only-metric' },
                { text: 'Neither — the cable layout is the topology, so whether the centre is a hub or switch changes nothing.', outcome: 'Physical and logical topology differ: the same star cabling with a hub still behaves like a logical bus — the forwarding device decides.', reveals: 'physical-equals-logical-topology' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now choose a layout by cost, reliability and scale before a single cable is bought. Topology math is quick, certain board marks.',
            decisions: [{ prompt: 'What comes next? Network Topologies and Protocols · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Network Topologies and Protocols · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_001', difficulty: 'standard',
          question: 'Network topology is the geometric arrangement of nodes (computers, servers.',
          hint: 'If stuck, revisit Class 11 Mathematics: Sets (c11_math_cbse_01_001) for vertex/edge set.',
          misconception: 'Students often think \'topology\' only means the physical shape of cables.',
          parts: [
                { id: 'a', prompt: 'A school lab has 15 computers connected to a central switch. The switch fails.', answer: 'The administrator is confusing physical and logical topology',
                  options: ['The administrator is confusing physical and logical topology', '\'topology\' only means the physical shape of cables'],
                  hint: 'If stuck, revisit Class 11 Mathematics: Sets (c11_math_cbse_01_001) for vertex/edge set notation.',
                  misconception: 'Students often think \'topology\' only means the physical shape of cables.' },
                { id: 'b', prompt: 'Compare the number of dedicated point‑to‑point links required for a fully connected mesh topology with 8 nodes versus a star topology with the same 8 nodes.', answer: 'Mesh: n(n‑1)/2 = 8×7/2 = 28 links',
                  options: ['Mesh: n(n‑1)/2 = 8×7/2 = 28 links', '\'topology\' only means the physical shape of cables'],
                  hint: 'If stuck, revisit Class 11 Mathematics: Sets (c11_math_cbse_01_001) for vertex/edge set notation.',
                  misconception: 'Students often think \'topology\' only means the physical shape of cables.' }
          ],
            remediations: { 'topology-only-means-the-physical': { steps: ['Revisit the definition: write it three times, each time underlining \'geometric arrangement\', \'nodes\', and \'links\'.', 'Draw two diagrams side‑by‑side: same physical star cabling, one with a hub (label logical bus), one with a switch.', 'Explain aloud: \'Physical = wires; Logical = signal path.\' 4.', 'Re‑attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think \'topology\' only means the physical shape of cables.',
          parts: [
                { id: 'a', prompt: 'Assertion (A): In a tree topology, the failure of a non‑root node never disconnects any other node from the root.', answer: 'A is false but R is true',
                  options: ['A is false but R is true', '\'exactly one parent\' guarantees redundancy, confusing tree with mesh', '\'topology\' only means the physical shape of cables'],
                  hint: 'If stuck, revisit Class 11 Mathematics: Sets (c11_math_cbse_01_001) for vertex/edge set notation.',
                  misconception: 'Students often think \'topology\' only means the physical shape of cables.' }
          ],
            remediations: { 'topology-only-means-the-physical': { steps: ['Revisit the definition: write it three times, each time underlining \'geometric arrangement\', \'nodes\', and \'links\'.', 'Draw two diagrams side‑by‑side: same physical star cabling, one with a hub (label logical bus), one with a switch.', 'Explain aloud: \'Physical = wires; Logical = signal path.\' 4.', 'Re‑attempt Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_002', difficulty: 'standard',
          question: 'Bus topology is a network architecture where all devices (nodes) are connected.',
          hint: 'Revisit c12_cs_cbse_02_001 to review topology definitions and collision domain concept.',
          misconception: 'Students often believe that because bus topology uses less cable, it is "more efficient" or "faster" than star.',
          parts: [
                { id: 'a', prompt: 'A small office has 8 computers connected in a bus topology using coaxial cable. One computer\'s network card fails and continuously transmits garbage data.', answer: 'The entire network becomes unusable',
                  options: ['The entire network becomes unusable', 'only that computer is affected', 'the terminators will block the garbage data', 'more efficient'],
                  hint: 'Revisit c12_cs_cbse_02_001 to review topology definitions and collision domain concept; then draw.',
                  misconception: 'Students often believe that because bus topology uses less cable, it is "more efficient" or "faster" than star topology.' },
                { id: 'b', prompt: 'Compare the fault tolerance of bus topology versus star topology when (a) a drop line/cable to one device fails, and (b) the central backbone/hub fails.', answer: '| Failure Type | Bus Topology | Star Topology |',
                  options: ['| Failure Type | Bus Topology | Star Topology |', 'backbone', 'server', 'more efficient'],
                  hint: 'Revisit c12_cs_cbse_02_001 to review topology definitions and collision domain concept; then draw.',
                  misconception: 'Students often believe that because bus topology uses less cable, it is "more efficient" or "faster" than star topology.' }
          ],
            remediations: { 'because-bus-topology-uses-less': { steps: ['If the student exhibits the above misconception: (1) Have them simulate a 4-node bus vs 4-node star using a network.', '(2) Ask them to calculate effective bandwidth per node in a 10 Mbps bus with 4 active nodes vs a 10 Mbps star with.', '(3) Revisit the concept of **collision domain** (from c12_cs_cbse_02_001) and **shared vs dedicated media**.', '(4) Re-diagnose with DIAGNOSTIC_QUESTION_2 to confirm they can now explain the performance degradation mechanism.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_003', difficulty: 'standard',
          question: 'Star topology is a network configuration where all nodes (computers, printers.',
          hint: 'Revisit c12_cs_cbse_02_001 (topology definitions) and c12_cs_cbse_02_002 (bus topology.',
          misconception: 'Students often believe "star topology has no single point of failure" because they focus on node-level fault isolation.',
          parts: [
                { id: 'a', prompt: 'In a star topology with 15 nodes connected to a central switch, how many dedicated point-to-point links exist between nodes and the central device?', answer: '15 links',
                  options: ['15 links', 'star topology has no single point of failure'],
                  hint: 'Revisit c12_cs_cbse_02_001 (topology definitions) and c12_cs_cbse_02_002 (bus topology limitations).',
                  misconception: 'Students often believe "star topology has no single point of failure" because they focus on node-level fault isolation (one cable cut.' },
                { id: 'b', prompt: 'A student claims: "Star topology is better than bus topology because it uses less cable." Is this statement correct? Explain why or why not.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'star topology has no single point of failure'],
                  hint: 'Revisit c12_cs_cbse_02_001 (topology definitions) and c12_cs_cbse_02_002 (bus topology limitations).',
                  misconception: 'Students often believe "star topology has no single point of failure" because they focus on node-level fault isolation (one cable cut.' },
                { id: 'c', prompt: 'Compare the fault tolerance of star topology vs bus topology when: (a) one node\'s network cable is cut, (b) the central device (hub/switch) fails, (c) the.', answer: '| Failure Scenario | Star Topology Impact | Bus Topology Impact |',
                  options: ['| Failure Scenario | Star Topology Impact | Bus Topology Impact |', 'star has no single point of failure', 'bus is more fault-tolerant', 'star topology has no single point of failure'],
                  hint: 'Revisit c12_cs_cbse_02_001 (topology definitions) and c12_cs_cbse_02_002 (bus topology limitations).',
                  misconception: 'Students often believe "star topology has no single point of failure" because they focus on node-level fault isolation (one cable cut.' }
          ],
            remediations: { 'star-topology-has-no-single': { steps: ['Have the student draw two star networks — one with a hub, one with a switch — and label all single points of failure.', 'Ask them to simulate (on paper) what happens when: (a) Node 3\'s cable is unplugged, (b) The hub/switch power fails.', 'Compare with bus topology: simulate backbone cut.', 'Complete a 3-column table: Failure Type | Star Impact | Bus Impact.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_004', difficulty: 'standard',
          question: 'Ring topology connects each node to exactly two neighbors forming a closed loop.',
          hint: 'If stuck, review c12_cs_cbse_02_001 (topology definitions) and c12_cs_cbse_02_002.',
          misconception: 'Students often think "mesh topology means every device is connected to every other device" and conclude it\'s the best.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Ring topology connects each node to exactly two neighbors forming a closed loop where',
                  options: ['Ring topology connects each node to exactly two neighbors forming a closed loop where', 'Network topology is the geometric arrangement of nodes (computers, servers, peripherals)', 'Bus topology is a network architecture where all devices (nodes) are connected to a', 'Star topology is a network configuration where all nodes (computers, printers, servers)'],
                  hint: 'If stuck, review c12_cs_cbse_02_001 (topology definitions) and c12_cs_cbse_02_002.',
                  misconception: 'Students often think "mesh topology means every device is connected to every other device" and conclude it\'s the best for all networks.' }
          ],
            remediations: { 'mesh-topology-means-every-device': { steps: ['Revisit c12_cs_cbse_02_001 (Network Topology: Definition and Types) to recall the visual representation of each.', 'Draw a 6-node ring and a 6-node full mesh on paper; count links physically.', 'Simulate a cable cut in each drawing and trace if communication can continue.', 'Re-attempt Diagnostic Question 3 with the drawings.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_005', difficulty: 'standard',
          question: 'Tree topology is a hierarchical network structure where a root node (central.',
          hint: 'If unsure about any basic topology\'s structure or failure mode, immediately revisit the.',
          misconception: 'Students often think "hybrid topology" means simply connecting two different topologies with a cable, without realizing.',
          parts: [
                { id: 'a', prompt: 'A company uses a hybrid topology combining star and ring. The star segment connects workstations to a switch in each department; the ring segment connects.', answer: 'Only that workstation loses connectivity',
                  options: ['Only that workstation loses connectivity', 'the whole department goes down', 'the ring breaks', 'hybrid topology'],
                  hint: 'If unsure about any basic topology\'s structure or failure mode, immediately revisit the.',
                  misconception: 'Students often think "hybrid topology" means simply connecting two different topologies with a cable, without realizing that the.' },
                { id: 'b', prompt: 'Design a tree topology for a university with: 1 main campus switch (root), 4 building switches (level 1), and each building has 3 floor switches (level 2).', answer: 'Total PCs = 4 buildings × 3 floors × 20 PCs = 240 PCs',
                  options: ['Total PCs = 4 buildings × 3 floors × 20 PCs = 240 PCs', 'hybrid topology', 'extended star'],
                  hint: 'If unsure about any basic topology\'s structure or failure mode, immediately revisit the.',
                  misconception: 'Students often think "hybrid topology" means simply connecting two different topologies with a cable, without realizing that the.' },
                { id: 'c', prompt: 'Compare tree topology and hybrid (star-ring) topology on these parameters: (a) fault isolation when a non-root switch fails, (b) cabling cost for 100 nodes.', answer: 'fault isolation when a non-root switch fails, (',
                  options: ['fault isolation when a non-root switch fails, (', 'hybrid topology', 'extended star'],
                  hint: 'If unsure about any basic topology\'s structure or failure mode, immediately revisit the.',
                  misconception: 'Students often think "hybrid topology" means simply connecting two different topologies with a cable, without realizing that the.' }
          ],
            remediations: { 'hybrid-topology-means-simply-connecting': { steps: ['Revisit c12_cs_cbse_02_002 (Bus Topology) and c12_cs_cbse_02_003 (Star Topology) — explicitly compare bus backbone.', 'star backbone (point-to-point, switch-centered).', 'Re-draw tree topology from scratch: root → level-1 hubs on a bus backbone → level-2 stars.', 'Label "backbone" and "segments".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_006', difficulty: 'standard',
          question: 'Network protocols are standardized rules governing communication between.',
          hint: 'Revisit c12_cs_cbse_02_007 (TCP/IP Protocol Suite) and draw the encapsulation diagram.',
          misconception: 'Students believe "HTTPS is just HTTP with a password" or "HTTPS encrypts only the password field." In reality, HTTPS.',
          parts: [
                { id: 'a', prompt: 'A web developer configures a server to listen on port 8080 for HTTP and port 8443 for HTTPS.', answer: 'For `http://example.com:8080/page.html`: `GET /page.html HTTP/1.1`',
                  options: ['For `http://example.com:8080/page.html`: `GET /page.html HTTP/1.1`', 'HTTPS GET', 'HTTPS is just HTTP with a password', 'HTTPS encrypts only the password field'],
                  hint: 'Revisit c12_cs_cbse_02_007 (TCP/IP Protocol Suite) and draw the encapsulation diagram: Application.',
                  misconception: 'Students believe "HTTPS is just HTTP with a password" or "HTTPS encrypts only the password field." In reality, HTTPS establishes a TLS.' }
          ],
            remediations: { 'https-is-just-http-with': { steps: ['If the student conflates HTTPS with "HTTP + password" or thinks FTP credentials are encrypted: 1.', 'Have them run `openssl s_client -connect example.com:443` and observe the TLS handshake (Certificate, ServerHello.', 'Use Wireshark to capture: (a) HTTP on port 80 — show plaintext GET/POST, (b) HTTPS on port 443 — show TLS records only.', 'Trace the FTP active vs passive flow with `ftp -v` and `netstat -an` to see who connects to whom.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
