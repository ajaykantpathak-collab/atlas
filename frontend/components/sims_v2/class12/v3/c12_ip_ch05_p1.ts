import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch05_p1: SimDef = {
    id: 'v3_c12_ip_ch05_p1',
    title: 'Internet and Web · Part 1/2',
    subtitle: 'The internet is the road; the web is one kind of traffic',
    classLevel: 12, subject: 'informatics_practices', topic: 'Internet and Web · Part 1/2',
    chapters: ['c12_ip_ch05'],
    nodeIds: ['c12_ip_cbse_05_001', 'c12_ip_cbse_05_002', 'c12_ip_cbse_05_003', 'c12_ip_cbse_05_004', 'c12_ip_cbse_05_005', 'c12_ip_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Internet architect', intro: 'Two words everyone uses interchangeably — and a distinction every web page silently depends on.', goal: 'Distinguish the internet from the web — and the roles of URL, HTML and HTTP.' },
    discovery: {
        question: 'WhatsApp runs on the internet but never touches the web — while YouTube needs both. What\'s the actual dividing line?',
        options: ['The internet is the infrastructure; the web is one service riding on it — email, VoIP and WhatsApp are internet services that aren\'t the web', 'Same thing, two names', 'Web is bigger', 'Apps vs browsers only'],
        answer: 'The internet is the infrastructure; the web is one service riding on it — email, VoIP and WhatsApp are internet services that aren\'t the web',
        hook: 'Three pillars built the web — URL locates, HTML structures, HTTP transfers — and they came decades after the internet existed. \'Checking email in a browser\' doesn\'t make email a web service; the access method isn\'t the service.',
    },
    teaching: [
        { title: 'Internet vs World Wide Web: distinguishing the two concepts', text: 'The Internet is the global hardware infrastructure of interconnected computers and networking devices that enables data transmission, while the World Wide Web (WWW) is an information system.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split the two layers cleanly: assign everyday services to internet-or-web, map the three pillars\' jobs, and weigh the claim that the web made the internet public.',
        labels: ['Internet vs World Wide', 'How the internet works', 'URL structure: protocol, domain,', 'Web browsers and web', 'HTTP and HTTPS: request-response', 'Static vs dynamic web'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_001', title: 'Internet vs World Wide Web: distinguishing the two concepts',
          caseStudy: { intro: 'Start by asking: "When you send a WhatsApp message, are you using the Internet or the Web?',
            decisions: [{ prompt: 'Define the Internet and the World Wide Web in one sentence each.', options: [
                { text: 'The Internet is the global network of interconnected computing devices and networking', outcome: 'The Internet is the global network of interconnected computing devices and networking hardware that.' },
                { text: 'they are the same thing', outcome: 'Not quite — Students often use "Internet" and "World Wide Web" interchangeably, thinking they are synonyms.', reveals: 'students-often-use-internet-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_002', title: 'How the internet works: packets, routers, and ISPs',
          caseStudy: { intro: 'Imagine you send a WhatsApp message from your phone in Delhi to a friend in Mumbai.',
            decisions: [{ prompt: 'What is a packet in the context of computer networks, and why is data divided into packets before transmission?', options: [
                { text: 'A packet is a small, fixed-size unit of data that includes a header (with', outcome: 'A packet is a small, fixed-size unit of data that includes a header (with source/destination.' },
                { text: 'packets are just small files', outcome: 'Not quite — Students often believe that packets from the same message always travel the same path and arrive.', reveals: 'packets-from-the-same-message' },
                { text: 'packets travel in a fixed path', outcome: 'Not quite — Students often believe that packets from the same message always travel the same path and arrive.', reveals: 'packets-from-the-same-message' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_003', title: 'URL structure: protocol, domain, path, and query parameters',
          caseStudy: { intro: 'Imagine you are browsing for NCERT textbooks and type `https://ncert.nic.in/textbook/pdf/kech1ps.pdf` in the address bar — the page loads instantly.',
            decisions: [{ prompt: 'Write down the five components of the URL `https://www.example.com:8080/search?q=informatics+practices&page=2#results` and state the.', options: [
                { text: 'Correct answer: (1) Protocol: `https`', outcome: 'Correct answer: (1) Protocol: `https` — specifies the secure communication scheme.' },
                { text: '`www` is a mandatory part of every URL', outcome: 'Not quite — Students consistently confuse the **domain name** with the **full host** and believe `www` is.', reveals: 'students-consistently-confuse-the-domain' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_004', title: 'Web browsers and web servers: roles and interaction',
          caseStudy: { intro: 'Imagine you type `https://www.irctc.co.in` in Chrome and press Enter. Within seconds, the railway booking page appears. What just happened?',
            decisions: [{ prompt: 'What is the primary role of a web browser in the client–server model of the World Wide Web?', options: [
                { text: 'The web browser acts as the **client**: it initiates communication by sending HTTP/HTTPS', outcome: 'The web browser acts as the **client**: it initiates communication by sending HTTP/HTTPS requests.' },
                { text: 'the browser stores website files', outcome: 'Not quite — **“The browser runs the server-side code (PHP, Python, Java) to generate the page.”** Students.', reveals: 'the-browser-runs-the-server' },
                { text: 'the browser processes PHP code', outcome: 'Not quite — **“The browser runs the server-side code (PHP, Python, Java) to generate the page.”** Students.', reveals: 'the-browser-runs-the-server' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_005', title: 'HTTP and HTTPS: request-response and secure communication',
          caseStudy: { intro: 'Imagine you log into your school’s result portal: you type the URL, press Enter, and see your marks. What just happened?',
            decisions: [{ prompt: 'What are the three main parts of an HTTP request message?', options: [
                { text: 'The three main parts are: (1) Request Line (method, request-target, HTTP version), (2)', outcome: 'The three main parts are: (1) Request Line (method, request-target, HTTP version), (2) Headers.' },
                { text: 'HTTP with a lock icon', outcome: 'Not quite — Students think HTTPS is just "HTTP with a lock icon" and that the HTTP protocol itself changes.', reveals: 'https-is-just-http-with' },
                { text: 'HTTPS uses different status codes', outcome: 'Not quite — Students think HTTPS is just "HTTP with a lock icon" and that the HTTP protocol itself changes.', reveals: 'https-is-just-http-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend cancels a 2 GB upload after a network dip, convinced \'the whole file travels as one block — if it drops, everything was wasted.\'',
            decisions: [{ prompt: 'What does packet switching say actually happened?', options: [
                { text: 'The file never travelled whole — it was chopped into addressed packets that hopped independently through routers; only unacknowledged packets were lost, so resuming resends those, not the 2 GB — and routers even re-fragment when a link\'s MTU is smaller.', outcome: 'The chapter\'s model: independent packets let links be shared, lost pieces be retried alone, and congestion be routed around — \'one giant block\' is the mental model the design replaced.' },
                { text: 'He\'s right — a file is a single unit on the wire, so the dip killed it all.', outcome: 'That\'s circuit-thinking: the Internet is packet-switched precisely so a dip costs a few packets, not the file — the reassembly at the destination exists because pieces take different hops.', reveals: 'file-is-one-block' },
                { text: 'Partially right — packets exist, but each takes the same fixed route, so one dip in the route loses everything.', outcome: 'Packets aren\'t rail cars on one track — each is forwarded hop-by-hop from routing tables, so paths can differ per packet; a dip disrupts what\'s in flight, not a fixed \'route\' carrying the file.', reveals: 'packets-follow-one-path' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now separate the road from the traffic — and explain why the web is a passenger, not the highway.',
            decisions: [{ prompt: 'What comes next? Internet and Web · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Internet and Web · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_001', difficulty: 'standard',
          question: 'The Internet is the global hardware infrastructure of interconnected computers.',
          hint: 'If stuck, revisit Class 11 CS Chapter 11 (Computer Networks) nodes c11_cs_cbse_11_001.',
          misconception: 'Students often use "Internet" and "World Wide Web" interchangeably, thinking they are synonyms.',
          parts: [
                { id: 'a', prompt: 'Compare the roles of HTML, URL, and HTTP in the World Wide Web. Which one identifies a resource, which one defines its structure, and which one transfers it?', answer: 'URL (Uniform Resource Locator) identifies the location of a resource on the Web',
                  options: ['URL (Uniform Resource Locator) identifies the location of a resource on the Web', 'swaps these roles (e'],
                  hint: 'If stuck, revisit Class 11 CS Chapter 11 (Computer Networks) nodes c11_cs_cbse_11_001 (network.',
                  misconception: 'Students often use "Internet" and "World Wide Web" interchangeably, thinking they are synonyms.' }
          ],
            remediations: { 'students-often-use-internet-and': { steps: ['Have the student list five things they do online (e.g., WhatsApp, YouTube, Gmail, Zoom, Google search).', 'For each, ask: "Does this use HTTP/HTML? Is it a website?"', 'Classify each as Web or non-Web Internet service.', 'Re-read the NCERT section 5.6.1 and 5.6.2-5.6.4 to see the explicit listing of Web vs other services.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often use "Internet" and "World Wide Web" interchangeably, thinking they are synonyms.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The invention of the World Wide Web made the Internet popular among the general public." Provide two pieces of evidence to support.', answer: 'The claim is largely supported',
                  options: ['The claim is largely supported', 'says the Internet and Web were invented together reveals historical inaccuracy'],
                  hint: 'If stuck, revisit Class 11 CS Chapter 11 (Computer Networks) nodes c11_cs_cbse_11_001 (network.',
                  misconception: 'Students often use "Internet" and "World Wide Web" interchangeably, thinking they are synonyms.' }
          ],
            remediations: { 'students-often-use-internet-and': { steps: ['Have the student list five things they do online (e.g., WhatsApp, YouTube, Gmail, Zoom, Google search).', 'For each, ask: "Does this use HTTP/HTML? Is it a website?"', 'Classify each as Web or non-Web Internet service.', 'Re-read the NCERT section 5.6.1 and 5.6.2-5.6.4 to see the explicit listing of Web vs other services.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_002', difficulty: 'standard',
          question: 'The Internet operates as a global packet-switched network where data is divided.',
          hint: 'If stuck, revisit Class 11 nodes c11_cs_cbse_11_006 (IP Address) and c11_cs_cbse_11_004.',
          misconception: 'Students often believe that packets from the same message always travel the same path and arrive in order.',
          parts: [
                { id: 'a', prompt: 'What is a packet in the context of computer networks, and why is data divided into packets before transmission?', answer: 'A packet is a small, fixed-size unit of data that includes a header (with',
                  options: ['A packet is a small, fixed-size unit of data that includes a header (with', 'packets are just small files', 'packets travel in a fixed path', 'packets from the same message always travel the same path and arrive in order'],
                  hint: 'If stuck, revisit Class 11 nodes c11_cs_cbse_11_006 (IP Address) and c11_cs_cbse_11_004 (Network.',
                  misconception: 'Students often believe that packets from the same message always travel the same path and arrive in order.' },
                { id: 'b', prompt: 'A 4000-byte IP packet (including 20-byte header) arrives at a router whose outgoing link has an MTU of 1500 bytes. The "Don\'t Fragment" bit is 0.', answer: 'Original payload = 4000 - 20 = 3980 bytes',
                  options: ['Original payload = 4000 - 20 = 3980 bytes', 'packets from the same message always travel the same path and arrive in order'],
                  hint: 'If stuck, revisit Class 11 nodes c11_cs_cbse_11_006 (IP Address) and c11_cs_cbse_11_004 (Network.',
                  misconception: 'Students often believe that packets from the same message always travel the same path and arrive in order.' },
                { id: 'c', prompt: 'Compare the roles of a switch, a router, and a gateway in a typical home network that connects to the Internet.', answer: 'A switch forwards frames within the LAN using MAC addresses (Layer 2)',
                  options: ['A switch forwards frames within the LAN using MAC addresses (Layer 2)', 'switch does NAT', 'gateway is the ISP\'s router', 'packets from the same message always travel the same path and arrive in order'],
                  hint: 'If stuck, revisit Class 11 nodes c11_cs_cbse_11_006 (IP Address) and c11_cs_cbse_11_004 (Network.',
                  misconception: 'Students often believe that packets from the same message always travel the same path and arrive in order.' }
          ],
            remediations: { 'packets-from-the-same-message': { steps: ['Revisit the concept of packet headers (source/dest IP, TTL, flags) using a packet capture tool (Wireshark) on a simple.', 'Draw a 4-router topology on paper, assign IP subnets, and manually trace a packet with a given destination IP, showing.', 'Simulate fragmentation: take a 3000-byte packet, set MTU=1400, and calculate fragments on paper.', 'Re-diagnose with DIAGNOSTIC_QUESTION_3 to verify fragmentation math.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_003', difficulty: 'standard',
          question: 'A Uniform Resource Locator (URL) is a standardized address string that uniquely.',
          hint: 'If stuck, revisit Class 11 node c11_cs_cbse_11_007 (DNS and URL) and practice splitting.',
          misconception: 'Students consistently confuse the **domain name** with the **full host** and believe `www` is a mandatory part of every.',
          parts: [
                { id: 'a', prompt: 'Write down the five components of the URL `https://www.example.com:8080/search?q=informatics+practices&page=2#results` and state the function of each component.', answer: 'Correct answer: (1) Protocol: `https`',
                  options: ['Correct answer: (1) Protocol: `https`', '`www` is a mandatory part of every URL'],
                  hint: 'If stuck, revisit Class 11 node c11_cs_cbse_11_007 (DNS and URL) and practice splitting 20 URLs.',
                  misconception: 'Students consistently confuse the **domain name** with the **full host** and believe `www` is a mandatory part of every URL.' },
                { id: 'b', prompt: 'A student claims: "The domain name in `https://mail.google.com/mail/u/0/#inbox` is `google.com` and the subdomain is `mail`." Is this correct?', answer: 'Correct answer: Yes, the claim is correct',
                  options: ['Correct answer: Yes, the claim is correct', 'identify the component', '`www` is a mandatory part of every URL'],
                  hint: 'If stuck, revisit Class 11 node c11_cs_cbse_11_007 (DNS and URL) and practice splitting 20 URLs.',
                  misconception: 'Students consistently confuse the **domain name** with the **full host** and believe `www` is a mandatory part of every URL.' },
                { id: 'c', prompt: 'Compare the two URLs and explain which one is more likely to be a phishing attempt, justifying your answer using URL structure analysis: URL.', answer: 'Correct answer: URL A is the phishing attempt',
                  options: ['Correct answer: URL A is the phishing attempt', '`www` is a mandatory part of every URL'],
                  hint: 'If stuck, revisit Class 11 node c11_cs_cbse_11_007 (DNS and URL) and practice splitting 20 URLs.',
                  misconception: 'Students consistently confuse the **domain name** with the **full host** and believe `www` is a mandatory part of every URL.' }
          ],
            remediations: { 'students-consistently-confuse-the-domain': { steps: ['Have the student write 10 real URLs from their browser history (bank, school, YouTube, etc.) on paper.', 'Using three colored pens, underline protocol (blue), host including subdomain (green), path (red), query (orange).', 'For each, answer: "Which part identifies the server? Which part tells the server *what* resource?', 'Revisit c11_cs_cbse_11_007 (DNS and URL) and c12_ip_cbse_05_001 (Internet vs WWW) to reinforce that the domain is.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_004', difficulty: 'standard',
          question: 'A web browser is a client-side software application that sends HTTP/HTTPS.',
          hint: 'If unsure about client–server roles, review c11_cs_cbse_11_008; if URL parsing is shaky.',
          misconception: '**“The browser runs the server-side code (PHP, Python, Java) to generate the page.”** Students often think that when.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A web browser is a client-side software application that sends HTTP/HTTPS requests to web',
                  options: ['A web browser is a client-side software application that sends HTTP/HTTPS requests to web', 'The Internet is the global hardware infrastructure of interconnected computers and', 'The Internet operates as a global packet-switched network where data is divided into', 'A Uniform Resource Locator (URL) is a standardized address string that uniquely'],
                  hint: 'If unsure about client–server roles, review c11_cs_cbse_11_008; if URL parsing is shaky, redo.',
                  misconception: '**“The browser runs the server-side code (PHP, Python, Java) to generate the page.”** Students often think that when they request a `.php`.' }
          ],
            remediations: { 'the-browser-runs-the-server': { steps: ['**Revisit the execution boundary**: Draw two boxes labeled “Server” and “Browser”.', 'List what runs in each: Server → PHP, Python, Java, Node.js, SQL, template engine.', 'Browser → HTML parser, CSS engine, JavaScript engine (V8, SpiderMonkey).', '**Trace a concrete example**: Use the worked example below (IRCTC login).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_005', difficulty: 'standard',
          question: 'HTTP (HyperText Transfer Protocol) is an application-layer protocol that.',
          hint: 'Review c11_cs_cbse_11_009 (Network Protocols) and the TCP/IP model diagram; focus.',
          misconception: 'Students think HTTPS is just "HTTP with a lock icon" and that the HTTP protocol itself changes.',
          parts: [
                { id: 'a', prompt: 'Compare HTTP status codes 301, 302, 304, 401, 403, 404, 500, 503. Group them by class (3xx, 4xx, 5xx) and give one real-world scenario for each.', answer: '3xx Redirection: 301 (permanent move',
                  options: ['3xx Redirection: 301 (permanent move', 'HTTP with a lock icon', 'HTTPS uses different status codes', 'HTTPS encrypts the URL'],
                  hint: 'Review c11_cs_cbse_11_009 (Network Protocols) and the TCP/IP model diagram; focus on where HTTP.',
                  misconception: 'Students think HTTPS is just "HTTP with a lock icon" and that the HTTP protocol itself changes.' }
          ],
            remediations: { 'https-is-just-http-with': { steps: ['Revisit the OSI/TCP‑IP layer model (c11_cs_cbse_11_009) to see where HTTP (Layer 7) and TLS (between Layer 4 and 7) sit.', 'Use browser DevTools → Network tab to capture a live HTTP request and a live HTTPS request; compare raw headers — they.', 'Practice writing raw HTTP requests with `telnet` or `nc` to a test server (e.g., `httpbin.org`) to internalise the.', 'Re‑attempt Diagnostic Questions 1, 3, and 6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_006', difficulty: 'standard',
          question: 'A static web page delivers identical pre-written HTML/CSS/JS content to every.',
          hint: 'If stuck, revisit `c12_ip_cbse_05_004` (Web browsers and web servers) and trace the.',
          misconception: '**Misconception:** "Dynamic web pages are those that look interactive or have moving parts; static pages are plain and.',
          parts: [
                { id: 'a', prompt: 'Compare the server-side processing steps when a browser requests (a) a static `.html` page and (b) a dynamic `.php` page that displays a user\'s order history.', answer: '**Static (.html):** 1',
                  options: ['**Static (.html):** 1', 'the web server directly queries the database'],
                  hint: 'If stuck, revisit `c12_ip_cbse_05_004` (Web browsers and web servers) and trace the.',
                  misconception: '**Misconception:** "Dynamic web pages are those that look interactive or have moving parts; static pages are plain and boring." **Why it\'s.' }
          ],
            remediations: { 'misconception-dynamic-web-pages-are': { steps: ['If a student confuses client-side vs server-side dynamism: 1.', '**Revisit** `c12_ip_cbse_05_004` (Web browsers and web servers) — focus on the HTTP request-response cycle: who sends.', '**Trace** two requests on paper: (a) `GET /page.html` → server reads file → sends bytes; (b) `GET /page.php` → server.', '**Re-diagnostic:** Give them a `.html` file containing `<script>fetch(\'/api/data\').then(...)</script>` and ask: "Does.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
