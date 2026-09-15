import type { SimDef } from '../../engine/types';

/** v3 generated — c11_cs_ch11_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_cs_ch11_p2: SimDef = {
    id: 'v3_c11_cs_ch11_p2',
    title: 'Computer Networks and Cyber Safety · Part 2/3',
    subtitle: 'See what makes devices a network and why LAN, MAN and WAN are measured in geography, not wires.',
    classLevel: 11, subject: 'computer_science', topic: 'Computer Networks and Cyber Safety · Part 2/3',
    chapters: ['c11_cs_ch11'],
    nodeIds: ['c11_cs_cbse_11_007', 'c11_cs_cbse_11_008', 'c11_cs_cbse_11_009', 'c11_cs_cbse_11_010', 'c11_cs_cbse_11_011', 'c11_cs_cbse_11_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an IT planner connecting a school\'s devices', intro: 'Four devices, one printer, one movie — figure out who talks to whom, over what medium, speaking which protocol.', goal: 'Identify network components and classify networks by geographical span.' },
    discovery: {
        question: 'A school lab\'s computers share files and one printer, but the internet is down. Is the lab still a network?',
        options: ['Yes — a LAN exists on its own; the internet is a service that rides on networks, not a requirement', 'No — without internet there is nothing to share', 'Only if the computers use cables, since Wi-Fi needs internet', 'No — a network requires a server connected to the web'],
        answer: 'Yes — a LAN exists on its own; the internet is a service that rides on networks, not a requirement',
        hook: 'Network ≠ internet — two machines sharing a printer are already a network; the web is just the biggest one.',
    },
    teaching: [
        { title: 'Domain Name System (DNS) and URL', text: 'The Domain Name System (DNS) is a hierarchical, distributed naming system that translates human-readable domain names (e.g., www.example.com) into machine-readable IP addresses (e.g., 192.0.2.1).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_cs_cbse_11_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map sender, receiver, medium and protocol for phone-to-printer and laptop-to-TV, then classify a campus network versus a city-spanning link.',
        labels: ['Domain Name System (DNS)', 'Client-Server Architecture', 'Network Protocols: HTTP, HTTPS,', 'Introduction to Cyber Safety', 'Malware: Virus, Worm, Trojan,', 'Phishing, Identity Theft'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_007', title: 'Domain Name System (DNS) and URL',
          caseStudy: { intro: 'Imagine you type "www.cbse.gov.in" in your browser and press Enter — within milliseconds, the correct webpage appears.',
            decisions: [{ prompt: 'What is the primary function of a DNS recursive resolver in the domain name resolution process?', options: [
                { text: 'The recursive resolver acts on behalf of the client (stub resolver) to perform the full', outcome: 'The recursive resolver acts on behalf of the client (stub resolver) to perform the full sequence.' },
                { text: 'it stores all domain-to-IP mappings', outcome: 'Not quite — Students believe DNS resolution always starts at the root server for every query.', reveals: 'dns-resolution-always-starts-at' },
                { text: 'a centralized database', outcome: 'Not quite — Students believe DNS resolution always starts at the root server for every query.', reveals: 'dns-resolution-always-starts-at' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_008', title: 'Client-Server Architecture',
          caseStudy: { intro: 'Imagine you open a browser on your phone and type "www.irctc.co.in" to book a train ticket.',
            decisions: [{ prompt: 'In a client-server interaction, which entity initiates the communication and which entity waits passively for a request?', options: [
                { text: 'The client initiates the communication', outcome: 'The client initiates the communication; the server waits passively (listens) for incoming requests.' },
                { text: 'server initiates', outcome: 'Not quite — Students often think "client" and "server" refer to specific hardware (e.g., "a server is a big.', reveals: 'client-and-server-refer-to' },
                { text: 'client', outcome: 'Not quite — Students often think "client" and "server" refer to specific hardware (e.g., "a server is a big.', reveals: 'client-and-server-refer-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_009', title: 'Network Protocols: HTTP, HTTPS, FTP, TCP/IP',
          caseStudy: { intro: 'Imagine you open a browser and type "https://www.cbse.gov.in" – what actually happens before the page appears?',
            decisions: [{ prompt: 'State the default port numbers used by HTTP, HTTPS, and FTP (control connection).', options: [
                { text: 'HTTP uses port 80, HTTPS uses port 443, and FTP control connection uses port 21', outcome: 'HTTP uses port 80, HTTPS uses port 443, and FTP control connection uses port 21.' },
                { text: 'HTTPS uses port 80', outcome: 'Not quite — Students often believe that HTTPS is a completely different protocol from HTTP, rather than HTTP.', reveals: 'https-is-a-completely-different' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_010', title: 'Introduction to Cyber Safety and Cyber Threats',
          caseStudy: { intro: 'Imagine you receive an email claiming to be from your bank asking you to "verify your account" by clicking a link and entering your PIN.',
            decisions: [{ prompt: 'Define "digital footprint" and distinguish between active and passive digital footprints with one example each.', options: [
                { text: 'A digital footprint is the trail of data created by a user\'s online activities', outcome: 'A digital footprint is the trail of data created by a user\'s online activities.' },
                { text: 'active', outcome: 'Not quite — Students believe that "deleting a post or photo from social media permanently removes it from the.', reveals: 'deleting-a-post-or-photo' },
                { text: 'UI removal', outcome: 'Not quite — Students believe that "deleting a post or photo from social media permanently removes it from the.', reveals: 'deleting-a-post-or-photo' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_011', title: 'Malware: Virus, Worm, Trojan, Ransomware',
          caseStudy: { intro: 'Imagine you receive an email with an attachment named "Diwali_Bonus_Policy.pdf.exe" – you click it expecting a document, but your files start encrypting.',
            decisions: [{ prompt: '**REMEMBER:** List the four malware types covered in this chapter and state the one-line defining characteristic of each (propagation.', options: [
                { text: '**Correct Answer:** 1', outcome: '**Correct Answer:** 1. **Virus** – Attaches to executable files/boot sectors; requires human action.' },
                { text: 'Virus spreads automatically', outcome: 'Not quite — **Misconception:** "A Trojan is a type of virus because both are malicious programs that harm your.', reveals: 'misconception-a-trojan-is-a' },
                { text: 'Trojan replicates itself', outcome: 'Not quite — **Misconception:** "A Trojan is a type of virus because both are malicious programs that harm your.', reveals: 'misconception-a-trojan-is-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_012', title: 'Phishing, Identity Theft and Cyberbullying',
          caseStudy: { intro: 'Imagine you receive an email claiming your SBI account will be closed in 2 hours unless you "verify" your details by clicking a link.',
            decisions: [{ prompt: 'Define phishing and give one characteristic that distinguishes a phishing email from a legitimate email from your bank.', options: [
                { text: 'Phishing is a fraudulent attempt to obtain sensitive information by disguising as a', outcome: 'Phishing is a fraudulent attempt to obtain sensitive information by disguising as a trustworthy.' },
                { text: 'phishing emails have spelling errors', outcome: 'Not quite — Students believe phishing only happens via email and only targets "gullible" people.', reveals: 'phishing-only-happens-via-email' },
                { text: 'gullible', outcome: 'Not quite — Students believe phishing only happens via email and only targets "gullible" people.', reveals: 'phishing-only-happens-via-email' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_007', title: 'Use it in the wild',
          caseStudy: { intro: 'The school ISP link is down all week. A classmate says the computer lab is now \'useless — no network without internet\'. Your team still needs to share a 2 GB dataset across 30 lab PCs and use the single lab printer.',
            decisions: [{ prompt: 'Can the lab still function as a network?', options: [
                { text: 'Yes — it\'s a LAN: autonomous PCs interconnected to share files and the printer. A network needs sender, receiver, medium and a shared protocol — internet is a network OF networks, not a requirement for one. File sharing and printing run fine with the WAN link down.', outcome: 'Connectivity to the global internet is optional; local resource-sharing over agreed protocols IS the definition of a network.' },
                { text: 'No — no internet means no network; \'network\' and \'internet\' are the same thing.', outcome: 'That conflation would declare every offline office LAN \'not a network\'; the lab\'s file shares and printer prove otherwise.', reveals: 'network-equals-internet' },
                { text: 'Partly — files can be shared only by copying to pen drives, which technically forms a \'sneakernet\'.', outcome: 'Carrying drives isn\'t a computer network at all — the lab\'s existing cables and protocols already provide real-time sharing without internet.', reveals: 'sneakernet-counts-as-lan' }
            ] }] } },
        { type: 'case', nodeId: 'c11_cs_cbse_11_012', title: 'The bigger picture',
          caseStudy: { intro: 'Geography and ownership classify a network — LAN for a campus, MAN for a city — not the cable or the speed.',
            decisions: [{ prompt: 'What comes next? Computer Networks and Cyber Safety · Part 3/3 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Computer Networks and Cyber Safety · Part 3/3 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_007', difficulty: 'standard',
          question: 'The Domain Name System (DNS) is a hierarchical, distributed naming system that.',
          hint: 'Revisit IPv4/IPv6 address formats (c11_cs_cbse_11_006) and practice converting between.',
          misconception: 'Students believe DNS resolution always starts at the root server for every query.',
          parts: [
                { id: 'a', prompt: 'Explain why the DNS hierarchy uses both recursive and iterative queries instead of just one type throughout the entire resolution process.', answer: 'Recursive queries are used between the client and recursive resolver',
                  options: ['Recursive queries are used between the client and recursive resolver', 'iterative is faster', 'DNS resolution always starts at the root server for every query'],
                  hint: 'Revisit IPv4/IPv6 address formats (c11_cs_cbse_11_006) and practice converting between domain names.',
                  misconception: 'Students believe DNS resolution always starts at the root server for every query.' },
                { id: 'b', prompt: 'Compare the DNS record types A, AAAA, CNAME, and MX. For each, state what it maps FROM and what it maps TO, and give one scenario where you would use each type.', answer: 'A: domain name → IPv4 address (e.g., www.example.com → 93.184.216.34)',
                  options: ['A: domain name → IPv4 address (e.g., www.example.com → 93.184.216.34)', 'CNAME maps to IP', 'DNS resolution always starts at the root server for every query'],
                  hint: 'Revisit IPv4/IPv6 address formats (c11_cs_cbse_11_006) and practice converting between domain names.',
                  misconception: 'Students believe DNS resolution always starts at the root server for every query.' }
          ],
            remediations: { 'dns-resolution-always-starts-at': { steps: ['Ask the student to run `dig +trace www.example.com` in a terminal and observe the actual query sequence.', 'Then run `dig www.example.com` twice and compare the `Query time` and `SERVER` fields — the second will show near-zero.', 'Have them check the TTL in the ANSWER section.', 'Explain: "The first trace shows the full hierarchy; the second shows cache hit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe DNS resolution always starts at the root server for every query.',
          parts: [
                { id: 'a', prompt: 'A company hosts its website at `web.company.com` (A record → 203.0.113.10) and email at `mail.company.com` (A record → 203.0.113.20).', answer: 'Yes, both work correctly',
                  options: ['Yes, both work correctly', 'email fails because MX points to hostname not IP', 'DNS resolution always starts at the root server for every query'],
                  hint: 'Revisit IPv4/IPv6 address formats (c11_cs_cbse_11_006) and practice converting between domain names.',
                  misconception: 'Students believe DNS resolution always starts at the root server for every query.' },
                { id: 'b', prompt: 'Design a DNS zone file snippet for a fictional startup `techstart.in` that: (a) points the apex domain to IPv4 198.51.100.5 and IPv6 2001:db8::5, (b) creates.', answer: '``` $ORIGIN techstart.in',
                  options: ['``` $ORIGIN techstart.in', 'DNS resolution always starts at the root server for every query'],
                  hint: 'Revisit IPv4/IPv6 address formats (c11_cs_cbse_11_006) and practice converting between domain names.',
                  misconception: 'Students believe DNS resolution always starts at the root server for every query.' }
          ],
            remediations: { 'dns-resolution-always-starts-at': { steps: ['Ask the student to run `dig +trace www.example.com` in a terminal and observe the actual query sequence.', 'Then run `dig www.example.com` twice and compare the `Query time` and `SERVER` fields — the second will show near-zero.', 'Have them check the TTL in the ANSWER section.', 'Explain: "The first trace shows the full hierarchy; the second shows cache hit.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_008', difficulty: 'standard',
          question: 'Client-Server Architecture is a distributed computing model where tasks are.',
          hint: 'Revisit IP addressing (node c11_cs_cbse_11_006) and DNS resolution (node.',
          misconception: 'Students often think "client" and "server" refer to specific hardware (e.g., "a server is a big rack-mounted machine,.',
          parts: [
                { id: 'a', prompt: 'In a client-server interaction, which entity initiates the communication and which entity waits passively for a request?', answer: 'The client initiates the communication',
                  options: ['The client initiates the communication', 'server initiates', 'client', 'server'],
                  hint: 'Revisit IP addressing (node c11_cs_cbse_11_006) and DNS resolution (node c11_cs_cbse_11_007) to see.',
                  misconception: 'Students often think "client" and "server" refer to specific hardware (e.g., "a server is a big rack-mounted machine, a client is.' },
                { id: 'b', prompt: 'A school uses a central file server. Teachers save lesson plans on it from their laptops; students open read-only copies from the computer lab.', answer: 'Clients: teachers\' laptops and lab computers (they request file save/open)',
                  options: ['Clients: teachers\' laptops and lab computers (they request file save/open)', 'client', 'server', 'a server is a big rack-mounted machine, a client is a laptop'],
                  hint: 'Revisit IP addressing (node c11_cs_cbse_11_006) and DNS resolution (node c11_cs_cbse_11_007) to see.',
                  misconception: 'Students often think "client" and "server" refer to specific hardware (e.g., "a server is a big rack-mounted machine, a client is.' }
          ],
            remediations: { 'client-and-server-refer-to': { steps: ['Ask the student to open two terminal windows on the same laptop.', 'Point out that the *same laptop* is both server (first terminal) and client (second terminal).', 'Have them swap roles—stop the server, start a different server on another port, and use the browser as client.', 'Emphasise: "Client and server are software roles, not hardware labels.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_009', difficulty: 'standard',
          question: 'Network protocols are standardized sets of rules that define how devices.',
          hint: 'Revisit the DNS lookup process (c11_cs_cbse_11_007) and the client‑server message flow.',
          misconception: 'Students often believe that HTTPS is a completely different protocol from HTTP, rather than HTTP layered over TLS/SSL.',
          parts: [
                { id: 'a', prompt: 'State the default port numbers used by HTTP, HTTPS, and FTP (control connection).', answer: 'HTTP uses port 80, HTTPS uses port 443, and FTP control connection uses port 21',
                  options: ['HTTP uses port 80, HTTPS uses port 443, and FTP control connection uses port 21', 'HTTPS uses port 80'],
                  hint: 'Revisit the DNS lookup process (c11_cs_cbse_11_007) and the client‑server message flow.',
                  misconception: 'Students often believe that HTTPS is a completely different protocol from HTTP, rather than HTTP layered over TLS/SSL.' }
          ],
            remediations: { 'https-is-a-completely-different': { steps: ['Draw a four‑layer TCP/IP model diagram (Application, Transport, Internet, Link).', 'Place HTTP, FTP, TLS, TCP, IP in their correct layers.', 'Then trace an HTTPS request: Application → HTTP → TLS → TCP → IP.', 'Ask the student to label where encryption occurs and why FTP credentials are exposed.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_010', difficulty: 'standard',
          question: 'Cyber safety refers to the practices, measures, and awareness required.',
          hint: 'Revisit c11_cs_cbse_11_007 (DNS and URL) and c11_cs_cbse_11_009 (HTTPS/TCP/IP) — practice.',
          misconception: 'Students believe that "deleting a post or photo from social media permanently removes it from the internet." This.',
          parts: [
                { id: 'a', prompt: 'Define "digital footprint" and distinguish between active and passive digital footprints with one example each.', answer: 'A digital footprint is the trail of data created by a user\'s online activities',
                  options: ['A digital footprint is the trail of data created by a user\'s online activities', 'active', 'UI removal', 'data deletion'],
                  hint: 'Revisit c11_cs_cbse_11_007 (DNS and URL) and c11_cs_cbse_11_009 (HTTPS/TCP/IP) — practice.',
                  misconception: 'Students believe that "deleting a post or photo from social media permanently removes it from the internet." This misconception arises.' },
                { id: 'b', prompt: 'A student downloads a 2-minute educational video from YouTube, adds a title slide "Prepared by [Student Name]", and submits it as their own project work.', answer: 'This is both plagiarism and copyright infringement',
                  options: ['This is both plagiarism and copyright infringement', 'fair use', 'only plagiarism', 'UI removal'],
                  hint: 'Revisit c11_cs_cbse_11_007 (DNS and URL) and c11_cs_cbse_11_009 (HTTPS/TCP/IP) — practice.',
                  misconception: 'Students believe that "deleting a post or photo from social media permanently removes it from the internet." This misconception arises.' },
                { id: 'c', prompt: 'Your friend receives an SMS: "Your ATM card ending in 4567 will be blocked. Update KYC immediately: http://sbi-kyc-update.tk".', answer: 'Three indicators: (1) URL uses .tk (free Tokelau domain) instead of sbi.co.in or',
                  options: ['Three indicators: (1) URL uses .tk (free Tokelau domain) instead of sbi.co.in or', 'spelling errors', 'unknown sender', 'UI removal'],
                  hint: 'Revisit c11_cs_cbse_11_007 (DNS and URL) and c11_cs_cbse_11_009 (HTTPS/TCP/IP) — practice.',
                  misconception: 'Students believe that "deleting a post or photo from social media permanently removes it from the internet." This misconception arises.' },
                { id: 'd', prompt: 'Compare ethical hacking and non-ethical hacking across four dimensions: intent, authorisation, outcome, and legal status.', answer: 'Ethical hacking: intent = improve security',
                  options: ['Ethical hacking: intent = improve security', 'technical skill', 'UI removal', 'data deletion'],
                  hint: 'Revisit c11_cs_cbse_11_007 (DNS and URL) and c11_cs_cbse_11_009 (HTTPS/TCP/IP) — practice.',
                  misconception: 'Students believe that "deleting a post or photo from social media permanently removes it from the internet." This misconception arises.' }
          ],
            remediations: { 'deleting-a-post-or-photo': { steps: ['Demonstrate the "View Page Source" and "Inspect Element" browser tools to show that deleted content may still exist.', 'Use the Wayback Machine (archive.org) to show historical snapshots of a familiar website — prove deletion is not.', 'Walk through NCERT Exercise Q8 (Preeti-Himanshu-Gayatri scenario) as a case study: trace the data flow from upload →.', 'Assign a practical: "Find a deleted tweet/post of a public figure that still exists in screenshots/news articles".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_011', difficulty: 'standard',
          question: 'Malware (malicious software) is a program or code designed to infiltrate.',
          hint: 'Revisit c11_cs_cbse_11_010\'s "Cyber Crime" section (11.5) and re-read the definitions.',
          misconception: '**Misconception:** "A Trojan is a type of virus because both are malicious programs that harm your computer." **Why.',
          parts: [
                { id: 'a', prompt: '**REMEMBER:** List the four malware types covered in this chapter and state the one-line defining characteristic of each (propagation method + payload).', answer: '**Correct Answer:** 1',
                  options: ['**Correct Answer:** 1', 'Virus spreads automatically', 'Trojan replicates itself'],
                  hint: 'Revisit c11_cs_cbse_11_010\'s "Cyber Crime" section (11.5) and re-read the definitions of virus.',
                  misconception: '**Misconception:** "A Trojan is a type of virus because both are malicious programs that harm your computer." **Why students make this.' },
                { id: 'b', prompt: '**UNDERSTAND:** A student claims: "WannaCry was a virus because it destroyed data." Using the definitions from this chapter, explain why this classification.', answer: '**Correct Answer:** WannaCry is **Ransomware** (specifically a cryptoworm)',
                  options: ['**Correct Answer:** WannaCry is **Ransomware** (specifically a cryptoworm)', 'damage', 'spread speed'],
                  hint: 'Revisit c11_cs_cbse_11_010\'s "Cyber Crime" section (11.5) and re-read the definitions of virus.',
                  misconception: '**Misconception:** "A Trojan is a type of virus because both are malicious programs that harm your computer." **Why students make this.' },
                { id: 'c', prompt: '**APPLY:** Your school\'s computer lab has 30 PCs connected via a switch.', answer: '**Correct Answer with Steps:** 1',
                  options: ['**Correct Answer with Steps:** 1', 'Trojan spreads to all PCs via network', 'Worm needs user to click'],
                  hint: 'Revisit c11_cs_cbse_11_010\'s "Cyber Crime" section (11.5) and re-read the definitions of virus.',
                  misconception: '**Misconception:** "A Trojan is a type of virus because both are malicious programs that harm your computer." **Why students make this.' }
          ],
            remediations: { 'misconception-a-trojan-is-a': { steps: ['**Targeted Remediation Steps:** 1.', '**Draw the "Propagation vs.', 'Payload" matrix** on paper: X-axis = Propagation (Human-triggered vs Autonomous), Y-axis = Payload (Destruction.', 'Place each malware type in the correct quadrant.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_cs_cbse_11_012', difficulty: 'standard',
          question: 'Phishing is a cybercrime where attackers impersonate legitimate entities.',
          hint: 'Revisit c11_cs_cbse_11_010 — specifically the "Digital Footprint" section (active.',
          misconception: 'Students believe phishing only happens via email and only targets "gullible" people.',
          parts: [
                { id: 'a', prompt: 'A student receives a WhatsApp message: "Congratulations! You\'ve won ₹50,000 in KBC lottery.', answer: 'This is phishing (specifically smishing',
                  options: ['This is phishing (specifically smishing', 'it\'s safe because KBC exists', 'gullible', 'phishing only happens via email and only targets "gullible" people'],
                  hint: 'Revisit c11_cs_cbse_11_010 — specifically the "Digital Footprint" section (active vs passive) and.',
                  misconception: 'Students believe phishing only happens via email and only targets "gullible" people.' },
                { id: 'b', prompt: 'Your friend\'s Instagram account posts embarrassing photos of a classmate with cruel captions.', answer: 'Yes, it\'s cyberbullying: (1) Repetition',
                  options: ['Yes, it\'s cyberbullying: (1) Repetition', 'it\'s not bullying', 'gullible', 'phishing only happens via email and only targets "gullible" people'],
                  hint: 'Revisit c11_cs_cbse_11_010 — specifically the "Digital Footprint" section (active vs passive) and.',
                  misconception: 'Students believe phishing only happens via email and only targets "gullible" people.' },
                { id: 'c', prompt: 'Compare financial identity theft and criminal identity theft. Give one specific scenario for each where the victim faces different consequences.', answer: 'Financial identity theft: thief uses stolen PAN/Aadhaar to take a loan',
                  options: ['Financial identity theft: thief uses stolen PAN/Aadhaar to take a loan', 'both cause money loss', 'gullible', 'phishing only happens via email and only targets "gullible" people'],
                  hint: 'Revisit c11_cs_cbse_11_010 — specifically the "Digital Footprint" section (active vs passive) and.',
                  misconception: 'Students believe phishing only happens via email and only targets "gullible" people.' }
          ],
            remediations: { 'phishing-only-happens-via-email': { steps: ['Show two real phishing emails — one obvious (lottery), one sophisticated (fake CBSE result portal with student\'s roll.', 'Demonstrate header analysis — "View Source" to see actual sender IP vs displayed name.', 'Role-play: student receives "your WhatsApp will expire, pay ₹50" — practice calling official number (not in message).', 'Create a "trust but verify" card: Official helplines (bank, UIDAI, cybercrime.gov.in) saved in phone.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
