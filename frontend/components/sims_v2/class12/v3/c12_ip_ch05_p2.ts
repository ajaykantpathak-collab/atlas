import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch05_p2: SimDef = {
    id: 'v3_c12_ip_ch05_p2',
    title: 'Internet and Web · Part 2/2',
    subtitle: 'The internet is the road; the web is one kind of traffic',
    classLevel: 12, subject: 'informatics_practices', topic: 'Internet and Web · Part 2/2',
    chapters: ['c12_ip_ch05'],
    nodeIds: ['c12_ip_cbse_05_007', 'c12_ip_cbse_05_008', 'c12_ip_cbse_05_009', 'c12_ip_cbse_05_010', 'c12_ip_cbse_05_011', 'c12_ip_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Internet architect', intro: 'Two words everyone uses interchangeably — and a distinction every web page silently depends on.', goal: 'Distinguish the internet from the web — and the roles of URL, HTML and HTTP.' },
    discovery: {
        question: 'WhatsApp runs on the internet but never touches the web — while YouTube needs both. What\'s the actual dividing line?',
        options: ['The internet is the infrastructure; the web is one service riding on it — email, VoIP and WhatsApp are internet services that aren\'t the web', 'Same thing, two names', 'Web is bigger', 'Apps vs browsers only'],
        answer: 'The internet is the infrastructure; the web is one service riding on it — email, VoIP and WhatsApp are internet services that aren\'t the web',
        hook: 'Three pillars built the web — URL locates, HTML structures, HTTP transfers — and they came decades after the internet existed. \'Checking email in a browser\' doesn\'t make email a web service; the access method isn\'t the service.',
    },
    teaching: [
        { title: 'Web hosting and domain name registration', text: 'Web hosting is a service that provides storage space and computing resources on a server connected to the Internet, allowing a locally created website (HTML, CSS, JavaScript, images, databases) to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Split the two layers cleanly: assign everyday services to internet-or-web, map the three pillars\' jobs, and weigh the claim that the web made the internet public.',
        labels: ['Web hosting and domain', 'Search engines: crawling, indexing,', 'Web 2.0 and 3.0', 'Email protocols: SMTP, POP3,', 'Cloud computing: services', 'Internet services: FTP, Telnet,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_007', title: 'Web hosting and domain name registration',
          caseStudy: { intro: 'Imagine you have built a portfolio website on your laptop with HTML, CSS, and a few images. Right now, only you can see it by opening the file locally.',
            decisions: [{ prompt: 'What is the primary function of the Domain Name System (DNS) in the context of web hosting?', options: [
                { text: 'The DNS translates a human-readable domain name (e.g., example.com) into the numeric IP', outcome: 'The DNS translates a human-readable domain name (e.g., example.com) into the numeric IP address.' },
                { text: 'DNS stores website files', outcome: 'Not quite — Students believe that buying a domain name automatically includes web hosting, or that the.', reveals: 'buying-a-domain-name-automatically' },
                { text: 'DNS is the web server', outcome: 'Not quite — Students believe that buying a domain name automatically includes web hosting, or that the.', reveals: 'buying-a-domain-name-automatically' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_008', title: 'Search engines: crawling, indexing, and ranking',
          caseStudy: { intro: 'Imagine you search for "best street food in Delhi" and get millions of results in 0.5 seconds.',
            decisions: [{ prompt: 'What is the primary function of a web crawler (spider) in a search engine?', options: [
                { text: 'A web crawler systematically browses the World Wide Web by following hyperlinks from', outcome: 'A web crawler systematically browses the World Wide Web by following hyperlinks from known pages.' },
                { text: 'crawlers rank pages', outcome: 'Not quite — **Misconception**: "Search engines search the live internet in real time when I type a query.".', reveals: 'misconception-search-engines-search-the' },
                { text: 'crawlers answer user queries', outcome: 'Not quite — **Misconception**: "Search engines search the live internet in real time when I type a query.".', reveals: 'misconception-search-engines-search-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_009', title: 'Web 2.0 and 3.0: evolution of the web',
          caseStudy: { intro: 'Begin by asking: "When you post a photo on Instagram, who owns that data and how does the platform \'understand\' your preferences?" This triggers curiosity.',
            decisions: [{ prompt: 'State the primary distinguishing feature of Web 2.0 compared to Web 1.0 in one sentence.', options: [
                { text: 'Web 2.0 enables user-generated content and two-way interaction (read-write), whereas Web', outcome: 'Web 2.0 enables user-generated content and two-way interaction (read-write), whereas Web 1.0 was.' },
                { text: 'Web 2.0 uses HTML5', outcome: 'Not quite — Students often think Web 3.0 is only about cryptocurrencies or that Web 2.0 "ended" when Web 3.0.', reveals: 'web-3' },
                { text: 'Web 3.0 is only about cryptocurrencies or that Web 2', outcome: 'Not quite — Students often think Web 3.0 is only about cryptocurrencies or that Web 2.0 "ended" when Web 3.0.', reveals: 'web-3' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_010', title: 'Email protocols: SMTP, POP3, and IMAP',
          caseStudy: { intro: 'Imagine you are setting up a new email account on your phone and laptop.',
            decisions: [{ prompt: 'What is the primary function of SMTP in email communication, and which default port number does it use for unencrypted communication?', options: [
                { text: 'SMTP (Simple Mail Transfer Protocol) is used exclusively for sending emails from a client', outcome: 'SMTP (Simple Mail Transfer Protocol) is used exclusively for sending emails from a client to a mail.' },
                { text: 'SMTP server', outcome: 'Not quite — Students often believe that SMTP is used for both sending and receiving emails because they see.', reveals: 'smtp-is-used-for-both' },
                { text: 'SMTP receives emails or uses port 110', outcome: 'Not quite — Students often believe that SMTP is used for both sending and receiving emails because they see.', reveals: 'smtp-is-used-for-both' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_011', title: 'Cloud computing: services and deployment models',
          caseStudy: { intro: 'Imagine your school wants to launch a new online admission portal.',
            decisions: [{ prompt: 'A student writes: "IaaS means the provider gives you the application, PaaS means they give you the platform, and SaaS means they give you.', options: [
                { text: 'The student\'s statement is circular and incorrect: SaaS *is* software, not "given', outcome: 'The student\'s statement is circular and incorrect: SaaS *is* software, not "given software.".' },
                { text: 'cloud = virtualization', outcome: 'Not quite — Students often believe "cloud = virtualization" or "private cloud = on-premises virtualization.".', reveals: 'cloud-virtualization-or-private-cloud' },
                { text: 'private cloud = on-premises virtualization', outcome: 'Not quite — Students often believe "cloud = virtualization" or "private cloud = on-premises virtualization.".', reveals: 'cloud-virtualization-or-private-cloud' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_012', title: 'Internet services: FTP, Telnet, and remote access',
          caseStudy: { intro: 'Imagine you are a Class 12 student who needs to upload your Python project files to a school server and later remotely check the server logs — how would you.',
            decisions: [{ prompt: 'What are the default port numbers for FTP (control connection), Telnet, and SSH?', options: [
                { text: 'FTP control uses TCP port 21, Telnet uses TCP port 23, SSH uses TCP port 22', outcome: 'FTP control uses TCP port 21, Telnet uses TCP port 23, SSH uses TCP port 22.' },
                { text: 'SFTP is just FTP running over SSH', outcome: 'Not quite — Students often think "SFTP is just FTP running over SSH" and that it uses two ports like FTP (21.', reveals: 'sftp-is-just-ftp-running' },
                { text: 'suggests', outcome: 'Not quite — Students often think "SFTP is just FTP running over SSH" and that it uses two ports like FTP (21.', reveals: 'sftp-is-just-ftp-running' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A friend cancels a 2 GB upload after a network dip, convinced \'the whole file travels as one block — if it drops, everything was wasted.\'',
            decisions: [{ prompt: 'What does packet switching say actually happened?', options: [
                { text: 'The file never travelled whole — it was chopped into addressed packets that hopped independently through routers; only unacknowledged packets were lost, so resuming resends those, not the 2 GB — and routers even re-fragment when a link\'s MTU is smaller.', outcome: 'The chapter\'s model: independent packets let links be shared, lost pieces be retried alone, and congestion be routed around — \'one giant block\' is the mental model the design replaced.' },
                { text: 'He\'s right — a file is a single unit on the wire, so the dip killed it all.', outcome: 'That\'s circuit-thinking: the Internet is packet-switched precisely so a dip costs a few packets, not the file — the reassembly at the destination exists because pieces take different hops.', reveals: 'file-is-one-block' },
                { text: 'Partially right — packets exist, but each takes the same fixed route, so one dip in the route loses everything.', outcome: 'Packets aren\'t rail cars on one track — each is forwarded hop-by-hop from routing tables, so paths can differ per packet; a dip disrupts what\'s in flight, not a fixed \'route\' carrying the file.', reveals: 'packets-follow-one-path' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_05_012', title: 'You made it',
          caseStudy: { intro: 'You can now separate the road from the traffic — and explain why the web is a passenger, not the highway.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_007', difficulty: 'standard',
          question: 'Web hosting is a service that provides storage space and computing resources.',
          hint: 'Revisit c12_ip_cbse_05_004 (Web browsers and web servers) and c12_ip_cbse_05_003 (URL.',
          misconception: 'Students believe that buying a domain name automatically includes web hosting, or that the registrar "stores" the.',
          parts: [
                { id: 'a', prompt: 'You are hosting a dynamic PHP website with a MySQL database on a shared hosting plan.', answer: 'Yes, it will work',
                  options: ['Yes, it will work', 'stores'],
                  hint: 'Revisit c12_ip_cbse_05_004 (Web browsers and web servers) and c12_ip_cbse_05_003 (URL structure).',
                  misconception: 'Students believe that buying a domain name automatically includes web hosting, or that the registrar "stores" the website files.' },
                { id: 'b', prompt: 'Compare and contrast: (a) registering a domain directly with a registry (e.g., NIC.IN for .in domains) versus (b) registering through an accredited registrar.', answer: 'Individual end-users can only register through accredited registrars (option b)',
                  options: ['Individual end-users can only register through accredited registrars (option b)', 'you can register directly with the registry if you pay more', 'stores'],
                  hint: 'Revisit c12_ip_cbse_05_004 (Web browsers and web servers) and c12_ip_cbse_05_003 (URL structure).',
                  misconception: 'Students believe that buying a domain name automatically includes web hosting, or that the registrar "stores" the website files.' }
          ],
            remediations: { 'buying-a-domain-name-automatically': { steps: ['If the student conflates domain registration with hosting, have them: (1) Open two browser tabs — one at a registrar.', '(2) Perform a `dig +trace myname.tech` in terminal to see the delegation chain: root → .tech TLD → registrar\'s.', '(3) Upload a test `index.html` via the host\'s drag-and-drop deploy (Netlify) or Git push (GitHub Pages) and verify.', 'This isolates the two services and proves they are independent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that buying a domain name automatically includes web hosting, or that the registrar "stores" the.',
          parts: [
                { id: 'a', prompt: 'A small business owner wants to host a simple 5-page static brochure site (HTML/CSS only, no database, no CMS).', answer: 'GitHub Pages is the best choice: free, automatic HTTPS, global CDN, zero server',
                  options: ['GitHub Pages is the best choice: free, automatic HTTPS, global CDN, zero server', 'stores'],
                  hint: 'Revisit c12_ip_cbse_05_004 (Web browsers and web servers) and c12_ip_cbse_05_003 (URL structure).',
                  misconception: 'Students believe that buying a domain name automatically includes web hosting, or that the registrar "stores" the website files.' }
          ],
            remediations: { 'buying-a-domain-name-automatically': { steps: ['If the student conflates domain registration with hosting, have them: (1) Open two browser tabs — one at a registrar.', '(2) Perform a `dig +trace myname.tech` in terminal to see the delegation chain: root → .tech TLD → registrar\'s.', '(3) Upload a test `index.html` via the host\'s drag-and-drop deploy (Netlify) or Git push (GitHub Pages) and verify.', 'This isolates the two services and proves they are independent.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_008', difficulty: 'standard',
          question: 'A search engine is a software system that discovers, organizes, and retrieves.',
          hint: 'If stuck, review HTTP GET/response (c12_ip_cbse_05_005) and URL anatomy.',
          misconception: '**Misconception**: "Search engines search the live internet in real time when I type a query." **Why it\'s wrong**.',
          parts: [
                { id: 'a', prompt: 'A new website `www.example.in` publishes a page about "organic farming tips". The page has no incoming links from other sites.', answer: 'Not unless the crawler discovers the URL through other means (e.g., XML sitemap',
                  options: ['Not unless the crawler discovers the URL through other means (e.g., XML sitemap', 'yes, crawlers visit every domain automatically', 'Google opens every website and reads it when I search'],
                  hint: 'If stuck, review HTTP GET/response (c12_ip_cbse_05_005) and URL anatomy (c12_ip_cbse_05_003), then.',
                  misconception: '**Misconception**: "Search engines search the live internet in real time when I type a query." **Why it\'s wrong**: Students imagine the.' }
          ],
            remediations: { 'misconception-search-engines-search-the': { steps: ['Revisit **c12_ip_cbse_05_005** (HTTP request-response) to recall how a browser fetches a single page — then scale that.', 'Draw the three-stage pipeline (Crawl → Index → Rank) on paper; label inputs/outputs of each stage.', 'Watch a 5-minute animation of "How Search Works" (e.g., Google\'s own explanation) to visualize the index as a giant.', 'Re-attempt Diagnostic Questions 2 and 3; if still stuck, ask: "What data structure lets you find all pages containing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_009', difficulty: 'standard',
          question: 'Web 2.0 refers to the second generation of the World Wide Web characterized.',
          hint: 'Revisit c12_ip_cbse_05_004 (browser-server roles) and c12_ip_cbse_05_006 (static.',
          misconception: 'Students often think Web 3.0 is only about cryptocurrencies or that Web 2.0 "ended" when Web 3.0 started.',
          parts: [
                { id: 'a', prompt: 'A startup wants to build a platform where users own their identity and data, and no central server can censor content.', answer: 'Web 3.0 principles align',
                  options: ['Web 3.0 principles align', 'Web 2.0 with better privacy settings', 'Web 3.0 is only about cryptocurrencies or that Web 2'],
                  hint: 'Revisit c12_ip_cbse_05_004 (browser-server roles) and c12_ip_cbse_05_006 (static vs dynamic pages).',
                  misconception: 'Students often think Web 3.0 is only about cryptocurrencies or that Web 2.0 "ended" when Web 3.0 started.' },
                { id: 'b', prompt: 'Compare the role of the server in Web 1.0, Web 2.0, and Web 3.0 architectures. How does the trust model change across generations?', answer: 'Web 1.0: central server serves static files',
                  options: ['Web 1.0: central server serves static files', 'servers disappear in Web 3.0', 'says "servers disappear in Web 3', 'Web 3.0 is only about cryptocurrencies or that Web 2'],
                  hint: 'Revisit c12_ip_cbse_05_004 (browser-server roles) and c12_ip_cbse_05_006 (static vs dynamic pages).',
                  misconception: 'Students often think Web 3.0 is only about cryptocurrencies or that Web 2.0 "ended" when Web 3.0 started.' }
          ],
            remediations: { 'web-3': { steps: ['If a student conflates Web 3.0 with just blockchain, have them: (1) Re-read the NCERT summary of WWW evolution (Chapter.', 'If confusion persists, revisit c12_ip_cbse_05_001 (Internet vs WWW) and c12_ip_cbse_05_008 (Search engines) to see how.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_010', difficulty: 'standard',
          question: 'Email protocols are standardized rules that govern the transmission, retrieval.',
          hint: 'If stuck, revisit Class 11 Computer Science node c11_cs_cbse_11_008 (Client-Server.',
          misconception: 'Students often believe that SMTP is used for both sending and receiving emails because they see "SMTP server" in both.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Email protocols are standardized rules that govern the transmission, retrieval, and',
                  options: ['Email protocols are standardized rules that govern the transmission, retrieval, and', 'The Internet is the global hardware infrastructure of interconnected computers and', 'The Internet operates as a global packet-switched network where data is divided into', 'A Uniform Resource Locator (URL) is a standardized address string that uniquely'],
                  hint: 'If stuck, revisit Class 11 Computer Science node c11_cs_cbse_11_008 (Client-Server Architecture).',
                  misconception: 'Students often believe that SMTP is used for both sending and receiving emails because they see "SMTP server" in both incoming and outgoing.' }
          ],
            remediations: { 'smtp-is-used-for-both': { steps: ['If the student confuses SMTP with receiving protocols, have them: (1) Revisit the client-server model from.', '(2) Use a telnet/netcat demo: connect to port 25 (SMTP) and try a POP3 command (USER) — it fails.', 'Then connect to port 110 (POP3) and try an SMTP command (MAIL FROM) — it fails.', '(3) Complete a table: Protocol | Direction | Port | Server Role.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_011', difficulty: 'standard',
          question: 'Cloud computing is a model for enabling ubiquitous, convenient, on-demand.',
          hint: 'Revisit c11_cs_cbse_11_008 (Client-Server Architecture) to reinforce how cloud extends.',
          misconception: 'Students often believe "cloud = virtualization" or "private cloud = on-premises virtualization." They equate running.',
          parts: [
                { id: 'a', prompt: 'A startup is building a mobile app backend. They have 3 developers, no DevOps expertise, unpredictable traffic (viral spikes possible), and want to focus only.', answer: 'This is PaaS (Platform as a Service)',
                  options: ['This is PaaS (Platform as a Service)', 'AWS EC2', 'cloud = virtualization', 'private cloud = on-premises virtualization'],
                  hint: 'Revisit c11_cs_cbse_11_008 (Client-Server Architecture) to reinforce how cloud extends the model.',
                  misconception: 'Students often believe "cloud = virtualization" or "private cloud = on-premises virtualization." They equate running VMware vSphere.' },
                { id: 'b', prompt: 'Compare the cost structure of running a 24/7 web server on-premises (capital expenditure: ₹5,00,000 for hardware, ₹50,000/year for power/cooling, 5-year life).', answer: 'On-premises 5-year cost = ₹5,00,000 + (5 × ₹50,000) = ₹7,50,000',
                  options: ['On-premises 5-year cost = ₹5,00,000 + (5 × ₹50,000) = ₹7,50,000', 'cloud = virtualization', 'private cloud = on-premises virtualization', '"cloud = virtualization" or "private cloud = on-premises virtualization'],
                  hint: 'Revisit c11_cs_cbse_11_008 (Client-Server Architecture) to reinforce how cloud extends the model.',
                  misconception: 'Students often believe "cloud = virtualization" or "private cloud = on-premises virtualization." They equate running VMware vSphere.' }
          ],
            remediations: { 'cloud-virtualization-or-private-cloud': { steps: ['If the student conflates virtualization with cloud: (1) Have them list the five NIST characteristics and tick which.', '(2) Show a screenshot of a cloud self-service portal (e.g., AWS Console) where a user spins up a VPC, EC2, RDS.', '(3) Assign a re-diagnostic: "Explain why a university computer lab with 50 virtualized desktops managed by IT staff.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_05_012', difficulty: 'standard',
          question: 'FTP (File Transfer Protocol) is a standard network protocol used for.',
          hint: 'If stuck, review c12_ip_cbse_05_005 (HTTPS vs HTTP) and c11_cs_cbse_11_009 (network.',
          misconception: 'Students often think "SFTP is just FTP running over SSH" and that it uses two ports like FTP (21 for control, 20 for.',
          parts: [
                { id: 'a', prompt: 'What are the default port numbers for FTP (control connection), Telnet, and SSH?', answer: 'FTP control uses TCP port 21, Telnet uses TCP port 23, SSH uses TCP port 22',
                  options: ['FTP control uses TCP port 21, Telnet uses TCP port 23, SSH uses TCP port 22', 'SFTP is just FTP running over SSH', 'suggests'],
                  hint: 'If stuck, review c12_ip_cbse_05_005 (HTTPS vs HTTP) and c11_cs_cbse_11_009 (network protocols).',
                  misconception: 'Students often think "SFTP is just FTP running over SSH" and that it uses two ports like FTP (21 for control, 20 for data).' }
          ],
            remediations: { 'sftp-is-just-ftp-running': { steps: ['Revisit c12_ip_cbse_05_003 (URL structure) to see `ftp://` and `ssh://` as protocol schemes.', 'Revisit c12_ip_cbse_05_005 (HTTP/HTTPS) to reinforce the pattern: unencrypted protocol → encrypted successor.', 'Do a hands-on lab: install OpenSSH server on a VM, generate keys with `ssh-keygen -t ed25519`, copy public key with.', 'Re-attempt Diagnostic Questions 2, 3, and 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
