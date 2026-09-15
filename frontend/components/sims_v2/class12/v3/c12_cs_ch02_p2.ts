import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch02_p2: SimDef = {
    id: 'v3_c12_cs_ch02_p2',
    title: 'Network Topologies and Protocols · Part 2/2',
    subtitle: 'The cables say star, the data says otherwise',
    classLevel: 12, subject: 'computer_science', topic: 'Network Topologies and Protocols · Part 2/2',
    chapters: ['c12_cs_ch02'],
    nodeIds: ['c12_cs_cbse_02_007', 'c12_cs_cbse_02_008', 'c12_cs_cbse_02_009', 'c12_cs_cbse_02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Network designer', intro: 'Before any network is built, someone draws its shape. That drawing decides cost, speed and what breaks when something fails.', goal: 'Define topology, distinguish physical from logical layouts, and compare bus, star, ring, mesh, tree and hybrid designs.' },
    discovery: {
        question: 'A lab\'s 15 computers are star-wired to a switch that just died. The admin says \'the topology is still star — look at the cables.\' Right or wrong?',
        options: ['Wrong — physical layout is star, but logical topology is the data path; a dead switch means no path exists at all', 'Right — cables decide topology, always', 'Wrong — it became a ring the moment the switch failed', 'Right — topology is whatever the diagram shows'],
        answer: 'Wrong — physical layout is star, but logical topology is the data path; a dead switch means no path exists at all',
        hook: 'Topology lives on two levels: the cables you can touch and the route data actually takes. A star-wired room running through a hub is logically a bus. Students who memorise shapes without this split miss every assertion-reason question on the topic.',
    },
    teaching: [
        { title: 'TCP/IP Protocol Suite: Layers and Functions', text: 'The TCP/IP (Transmission Control Protocol/Internet Protocol) protocol suite is a four-layer hierarchical framework (Application, Transport, Internet, Network Access) that standardizes end-to-end data.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_02_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Architect a network from constraints: sketch all six topologies, count links in mesh vs star (n(n−1)/2 vs n−1), and design a hybrid that survives a single link failure with hops under two.',
        labels: ['TCP/IP Protocol Suite: Layers', 'Email Protocols: SMTP, POP3,', 'Data Communication: Circuit Switching', 'MAC Address vs IP'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_007', title: 'TCP/IP Protocol Suite: Layers and Functions',
          caseStudy: { intro: 'Imagine you send a WhatsApp message from your phone in Delhi to a friend in Mumbai — the message travels through cell towers, fiber cables, routers, and.',
            decisions: [{ prompt: 'List the four layers of the TCP/IP model in order from the top (closest to the user application) to the bottom (closest to the physical.', options: [
                { text: 'Correct answer: Application → Transport → Internet → Network Access (also called Link or', outcome: 'Correct answer: Application → Transport → Internet → Network Access (also called Link or Network.' },
                { text: 'Physical, Data Link, Network, Transport', outcome: 'Not quite — Students often believe the TCP/IP model has 5 layers (adding Physical as a separate layer) because.', reveals: 'the-tcp-ip-model-has' },
                { text: 'IP header contains port number', outcome: 'Not quite — Students often believe the TCP/IP model has 5 layers (adding Physical as a separate layer) because.', reveals: 'the-tcp-ip-model-has' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_008', title: 'Email Protocols: SMTP, POP3, IMAP',
          caseStudy: { intro: 'Imagine you are sending an email from your phone to a friend\'s laptop. How does the message travel from your device to theirs?',
            decisions: [{ prompt: 'What is the primary function of SMTP in email communication, and on which default port does it operate?', options: [
                { text: 'SMTP is used for sending emails from a client to a server or between servers', outcome: 'SMTP is used for sending emails from a client to a server or between servers; its default port.' },
                { text: 'SMTP receives emails on port 110', outcome: 'Not quite — Students often think SMTP is used for both sending and receiving emails because it is the most.', reveals: 'smtp-is-used-for-both' },
                { text: 'SMTP receives emails or uses port 110', outcome: 'Not quite — Students often think SMTP is used for both sending and receiving emails because it is the most.', reveals: 'smtp-is-used-for-both' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_009', title: 'Data Communication: Circuit Switching vs Packet Switching',
          caseStudy: { intro: 'Imagine you are on a phone call (circuit switched) versus sending a WhatsApp message (packet switched).',
            decisions: [{ prompt: 'What is the defining characteristic of circuit switching that distinguishes it from packet switching?', options: [
                { text: 'Circuit switching establishes a dedicated physical path (or logical channel) between', outcome: 'Circuit switching establishes a dedicated physical path (or logical channel) between endpoints for.' },
                { text: 'data is divided into packets', outcome: 'Not quite — Students often believe "circuit switching is faster because it\'s a direct line." They confuse.', reveals: 'circuit-switching-is-faster-because' },
                { text: 'it uses store-and-forward', outcome: 'Not quite — Students often believe "circuit switching is faster because it\'s a direct line." They confuse.', reveals: 'circuit-switching-is-faster-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_010', title: 'MAC Address vs IP Address',
          caseStudy: { intro: 'Imagine you are sending a letter to a friend in another city. You write their name and house address (like a MAC address — fixed to the physical house) on the.',
            decisions: [{ prompt: 'State the bit-length and typical textual representation of an IPv4 address and a MAC address.', options: [
                { text: 'IPv4 address: 32 bits, written as four decimal octets separated by dots (e.g.,', outcome: 'IPv4 address: 32 bits, written as four decimal octets separated by dots (e.g., 192.168.1.10).' },
                { text: 'MAC is 32 bits or IP is hexadecimal', outcome: 'Not quite — Students often think the MAC address changes when a device connects to a different Wi-Fi network.', reveals: 'the-mac-address-changes-when' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An office on a coaxial bus network suffers constant collisions. The admin proposes rewiring all 20 desks to a central switch; the boss objects that a star \'wastes cable\'.',
            decisions: [{ prompt: 'Who\'s right, and why?', options: [
                { text: 'The admin — a switch gives each port its own collision domain so collisions essentially vanish; the extra per-desk cable pays for itself in recovered throughput almost immediately.', outcome: 'Physical shape costs cable, but the logical behaviour is what matters — star over switch removes the shared collision domain that bus forces on everyone.' },
                { text: 'The boss — a star uses more cable, so it\'s strictly worse.', outcome: 'Cable metres aren\'t the only cost: one shared collision domain keeps throttling all 20 machines, and retransmission losses dwarf the one-time wiring bill.', reveals: 'cable-count-only-metric' },
                { text: 'Neither — the cable layout is the topology, so whether the centre is a hub or switch changes nothing.', outcome: 'Physical and logical topology differ: the same star cabling with a hub still behaves like a logical bus — the forwarding device decides.', reveals: 'physical-equals-logical-topology' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_02_010', title: 'You made it',
          caseStudy: { intro: 'You can now choose a layout by cost, reliability and scale before a single cable is bought. Topology math is quick, certain board marks.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_007', difficulty: 'standard',
          question: 'The TCP/IP (Transmission Control Protocol/Internet Protocol) protocol suite.',
          hint: 'If stuck on layer ordering or encapsulation, revisit c12_cs_cbse_02_010 (MAC vs.',
          misconception: 'Students often believe the TCP/IP model has 5 layers (adding Physical as a separate layer) because many textbooks show.',
          parts: [
                { id: 'a', prompt: 'An HTTP GET request is sent from a browser (port 54321) to a web server (port 80).', answer: 'Correct trace: Application layer',
                  options: ['Correct trace: Application layer', 'packet', 'IP header contains port number', 'TCP header contains IP address'],
                  hint: 'If stuck on layer ordering or encapsulation, revisit c12_cs_cbse_02_010 (MAC vs IP Address) and.',
                  misconception: 'Students often believe the TCP/IP model has 5 layers (adding Physical as a separate layer) because many textbooks show a 5-layer hybrid.' }
          ],
            remediations: { 'the-tcp-ip-model-has': { steps: ['Revisit the layer encapsulation diagram — draw the 4-layer stack on paper, label each layer with 2 protocols and the.', 'Use the "postal analogy" mapping: Application = letter content, Transport = envelope with tracking number, Internet.', 'Complete the table in NCERT Exercise Q2 (textbook) matching protocols to layers.', 'Re-attempt Diagnostic Questions 1 and 3 — if you still swap layer order or PDU names, watch a 5-minute animation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the TCP/IP model has 5 layers (adding Physical as a separate layer) because many textbooks show.',
          parts: [
                { id: 'a', prompt: 'A network administrator argues: "Since UDP is unreliable, it should never be used for any real application — always use TCP." Evaluate this claim with two.', answer: 'Correct evaluation: The claim is false',
                  options: ['Correct evaluation: The claim is false', 'UDP is for games only', 'TCP is always better for reliability', 'IP header contains port number'],
                  hint: 'If stuck on layer ordering or encapsulation, revisit c12_cs_cbse_02_010 (MAC vs IP Address) and.',
                  misconception: 'Students often believe the TCP/IP model has 5 layers (adding Physical as a separate layer) because many textbooks show a 5-layer hybrid.' },
                { id: 'b', prompt: 'Design a new application-layer protocol for a real-time multiplayer cricket scoring app where multiple users update scores simultaneously.', answer: 'Good answer: (a) UDP —',
                  options: ['Good answer: (a) UDP —', 'IP header contains port number', 'TCP header contains IP address'],
                  hint: 'If stuck on layer ordering or encapsulation, revisit c12_cs_cbse_02_010 (MAC vs IP Address) and.',
                  misconception: 'Students often believe the TCP/IP model has 5 layers (adding Physical as a separate layer) because many textbooks show a 5-layer hybrid.' }
          ],
            remediations: { 'the-tcp-ip-model-has': { steps: ['Revisit the layer encapsulation diagram — draw the 4-layer stack on paper, label each layer with 2 protocols and the.', 'Use the "postal analogy" mapping: Application = letter content, Transport = envelope with tracking number, Internet.', 'Complete the table in NCERT Exercise Q2 (textbook) matching protocols to layers.', 'Re-attempt Diagnostic Questions 1 and 3 — if you still swap layer order or PDU names, watch a 5-minute animation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_008', difficulty: 'standard',
          question: 'Email protocols are standardized rules that govern the transmission, retrieval.',
          hint: 'If stuck, revisit the TCP/IP Protocol Suite node (c12_cs_cbse_02_007) and focus on the.',
          misconception: 'Students often think SMTP is used for both sending and receiving emails because it is the most famous email protocol.',
          parts: [
                { id: 'a', prompt: 'What is the primary function of SMTP in email communication, and on which default port does it operate?', answer: 'SMTP is used for sending emails from a client to a server or between servers',
                  options: ['SMTP is used for sending emails from a client to a server or between servers', 'SMTP receives emails on port 110', 'SMTP receives emails or uses port 110'],
                  hint: 'If stuck, revisit the TCP/IP Protocol Suite node (c12_cs_cbse_02_007) and focus on the application.',
                  misconception: 'Students often think SMTP is used for both sending and receiving emails because it is the most famous email protocol.' },
                { id: 'b', prompt: 'A user wants to access their email from both a smartphone and a laptop, and see the same folder structure and read/unread status on both.', answer: 'They should configure IMAP',
                  options: ['They should configure IMAP', 'SMTP receives emails on port 110'],
                  hint: 'If stuck, revisit the TCP/IP Protocol Suite node (c12_cs_cbse_02_007) and focus on the application.',
                  misconception: 'Students often think SMTP is used for both sending and receiving emails because it is the most famous email protocol.' }
          ],
            remediations: { 'smtp-is-used-for-both': { steps: ['Revisit the TCP/IP application layer concept from node c12_cs_cbse_02_007 to see where email protocols sit.', 'Draw a three-step diagram: Sender → SMTP → Receiver\'s Server → POP3/IMAP → Receiver\'s Client.', 'Create a comparison table with columns: Protocol, Direction (Push/Pull), Port, Server Action (Delete/Keep).', 'Re-attempt Diagnostic Questions 2 and 3 after the table is complete.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_009', difficulty: 'standard',
          question: 'Circuit switching establishes a dedicated end-to-end physical path between.',
          hint: 'If stuck, review the definitions of bandwidth, latency, and traffic types in node.',
          misconception: 'Students often believe "circuit switching is faster because it\'s a direct line." They confuse *propagation delay* (same.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why packet switching is more efficient than circuit switching for bursty data traffic like web browsing.', answer: 'Packet switching allows multiple users to share the same link by statistically',
                  options: ['Packet switching allows multiple users to share the same link by statistically', 'packets are smaller', 'packets take different routes', 'circuit switching is faster'],
                  hint: 'If stuck, review the definitions of bandwidth, latency, and traffic types in node.',
                  misconception: 'Students often believe "circuit switching is faster because it\'s a direct line." They confuse *propagation delay* (same for both) with.' }
          ],
            remediations: { 'circuit-switching-is-faster-because': { steps: ['Revisit the analogy: reserved railway track vs.', 'Ask student to list what happens when a train (circuit) vs.', 'a truck (packet) encounters a blockage.', 'Review the diagnostic question 2 answer — explicitly write "statistical multiplexing" and define it: "sharing a link.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_02_010', difficulty: 'standard',
          question: 'A MAC (Media Access Control) address is a unique 48-bit hardware identifier.',
          hint: 'If stuck, review binary-to-hex conversion (Class 8 math) and the TCP/IP layer summary.',
          misconception: 'Students often think the MAC address changes when a device connects to a different Wi-Fi network, just like the.',
          parts: [
                { id: 'a', prompt: 'State the bit-length and typical textual representation of an IPv4 address and a MAC address.', answer: 'IPv4 address: 32 bits, written as four decimal octets separated by dots (e.g.,',
                  options: ['IPv4 address: 32 bits, written as four decimal octets separated by dots (e.g.,', 'MAC is 32 bits or IP is hexadecimal'],
                  hint: 'If stuck, review binary-to-hex conversion (Class 8 math) and the TCP/IP layer summary table from.',
                  misconception: 'Students often think the MAC address changes when a device connects to a different Wi-Fi network, just like the IP address does.' },
                { id: 'b', prompt: 'A laptop connects to a Wi-Fi network at home, then later connects to a different Wi-Fi network at a café. Which address — MAC or IP — changes, and why?', answer: 'The IP address changes',
                  options: ['The IP address changes', 'hardware addresses are reassigned per network'],
                  hint: 'If stuck, review binary-to-hex conversion (Class 8 math) and the TCP/IP layer summary table from.',
                  misconception: 'Students often think the MAC address changes when a device connects to a different Wi-Fi network, just like the IP address does.' }
          ],
            remediations: { 'the-mac-address-changes-when': { steps: ['Revisit c12_cs_cbse_02_007 (TCP/IP Protocol Suite) to reinforce layer functions — specifically that Layer 2 uses MAC.', 'Use a physical analogy: show a NIC label (MAC) vs. a DHCP lease screen (IP).', 'Practice identifying address types from 10 mixed strings (IPv4, IPv6, MAC) until 100% accuracy.', 'Re-attempt Diagnostic Questions 2 and 4; if errors persist, draw the encapsulation diagram: IP packet inside Ethernet.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
