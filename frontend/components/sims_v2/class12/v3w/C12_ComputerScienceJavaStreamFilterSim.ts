import type { SimDef } from '../../engine/types';
import C12_ComputerScienceJavaStreamFilterSim from '../../../simulations/c6_12/C12_ComputerScienceJavaStreamFilterSim';

/** v3 wrapped master — C12_ComputerScienceJavaStreamFilterSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_computersciencejavastreamfiltersim: SimDef = {
    id: 'v3w_c12_computersciencejavastreamfiltersim',
    title: 'Client-Server Architecture and Peer-to-Peer Model',
    subtitle: 'This node covers the conceptual definitions, characteristics, advantages, disadvantages,.',
    classLevel: 12, subject: 'computer_science', topic: 'Client-Server Architecture and Peer-to-Peer Model',
    chapters: [],
    nodeIds: ['c12_cs_cbse_01_009', 'c12_cs_cbse_10_009', 'c12_cs_cbse_10_011', 'c12_cs_cbse_01_010', 'c12_cs_cbse_03_001', 'c12_cs_cbse_03_002', 'c12_cs_cbse_03_003', 'c12_cs_cbse_03_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you want to watch a movie: you open Netflix (client) which requests the video from Netflix\'s powerful.', goal: 'Master Client-Server Architecture and Peer-to-Peer Model.' },
    discovery: {
        question: 'A startup wants to build a real-time multiplayer game for 10,000 concurrent players with low latency. They have limited budget for server infrastructure.',
        options: ['Recommend Client-Server with cloud-based auto-scaling game servers', 'Peer-to-Peer means no server at all', 'P2P has zero infrastructure cost'],
        answer: 'Recommend Client-Server with cloud-based auto-scaling game servers',
        hook: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application.',
    },
    teaching: [
        { title: 'Client-Server architecture is a distributed.', text: 'Client-Server architecture is a distributed application structure that partitions tasks between service providers (servers) and service requesters (clients), where the server hosts, delivers, and.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_cs_cbse_01_009', title: 'Client-Server architecture is a.',
          scaffold: { problem: 'A school wants to deploy a digital attendance system. Teachers mark attendance on tablets; data must sync to a central database accessible.',
            steps: [
            { text: 'Identify requirements — centralized data ownership (principal needs authoritative record), low device count (50),.' },
            { text: 'Map to Client-Server — tablets = clients, old PC = server (database + auth). Centralized control matches requirement.' },
            { text: 'Map to P2P — each tablet would store full attendance database; sync conflicts when two teachers edit same class; no.' },
            { text: 'Evaluate scalability — 50 clients is trivial for a simple server; P2P adds complexity (conflict resolution, discovery).' },
            { text: 'Recommend Client-Server — because (a) single source of truth for attendance, (b) simple backup (one database file), (c).', faded: true, blankAnswer: 'Client-Server architecture is recommended. Justifications:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_10_009', title: 'Text file operations for counting.',
          scaffold: { problem: 'A teacher wants to analyze student essay files. Write a program that reads `essay.txt` and prints: number of lines, number of words, and.',
            steps: [
            { text: 'Open the file in read mode using `with` statement to ensure automatic closure.' },
            { text: 'Read the entire content into a string variable using `f.read()`.' },
            { text: 'Count lines using `len(content.splitlines())` which correctly handles trailing newlines.' },
            { text: 'Count words using `len(content.split())` which splits on any whitespace and ignores empty tokens.' },
            { text: 'Count characters using `len(content)` which includes all characters including spaces and newlines.' },
            { text: 'Print the results with descriptive labels.', faded: true, blankAnswer: 'Lines: 3, Words: 15, Characters: 73' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_10_011', title: 'The `pickle` module in Python provides.',
          scaffold: { problem: 'Save a list of student records (each record is a dictionary with keys `\'roll\'`, `\'name\'`, `\'marks\'`) to a binary file `class12.dat` using.',
            steps: [
            { text: 'Import `pickle` and define the list `students = [{\'roll\': 1, \'name\': \'Asha\', \'marks\': 92}, {\'roll\': 2, \'name\': \'Rohan\',.' },
            { text: 'Open `class12.dat` in `\'wb\'` mode using `with`; call `pickle.dump(students, file)`.' },
            { text: 'Open `class12.dat` in `\'rb\'` mode using `with`; call `loaded = pickle.load(file)`.' },
            { text: 'Iterate over `loaded` and print each dictionary.' },
            { text: 'Verify that the loaded data matches the original list exactly (same types, same order).', faded: true, blankAnswer: 'Output shows both dictionaries printed with correct keys.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_01_010', title: 'Network security encompasses measures.',
          scaffold: { problem: 'A school network administrator configures a stateful firewall with these rules in order: (1) Allow established/related incoming, (2) Allow.',
            steps: [
            { text: 'Identify packet direction — incoming (from external server to internal teacher).' },
            { text: 'Check rule 1 — "Allow established/related incoming." The firewall\'s state table has an entry for the teacher\'s outgoing.' },
            { text: 'Since UDP is connectionless, "established" means the firewall saw a recent outgoing packet with matching 4-tuple.' },
            { text: 'Rule 1 matches — firewall allows the packet, updates state timestamp.' },
            { text: 'Rules 2 and 3 are not evaluated (first-match policy). The video call works.', faded: true, blankAnswer: 'The firewall allows the server\'s reply packet because it.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_03_001', title: 'The World Wide Web (Web) is a global.',
          scaffold: { problem: 'An Indian NGO runs a static website (Web 1.0) showing their projects, contact info, and donation details as fixed HTML pages.',
            steps: [
            { text: 'Identify the core limitation of Web 1.0: static HTML files cannot accept, store, or reflect user input — every change.' },
            { text: 'For volunteer sign-up: client-side needs a form (HTML `<form>`) with validation (JS); server-side needs an endpoint.' },
            { text: 'For real-time fundraising progress: client-side needs periodic AJAX polling or WebSocket to fetch current total;.' },
            { text: 'For beneficiary testimonials: client-side needs a textarea + submit button (form); server-side needs POST /testimonial.' },
            { text: 'Synthesize: All three features require **server-side logic + persistent storage + asynchronous client-server.', faded: true, blankAnswer: '- Volunteer sign-up: Form (HTML/JS) → POST /volunteer.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_cs_cbse_03_002', title: 'HTML (HyperText Markup Language) uses.',
          scaffold: { problem: 'Create an HTML5 document for a "Library Book Entry" showing: book title (heading), author and ISBN (paragraph), availability status.',
            steps: [
            { text: 'Write the minimal HTML5 skeleton with `<!DOCTYPE html>`, `<html lang="en">`, `<head>` with `<meta charset="UTF-8">` and.' },
            { text: 'Inside `<body>`, use `<article>` for the book entry (self-contained content).' },
            { text: 'Use `<header>` for title/author group. Inside: `<h1>` for title, `<p>` for author.' },
            { text: 'Use `<section>` for details. Inside: `<dl>` (description list) with `<dt>ISBN</dt><dd>978-93-12345-67-8</dd>`.' },
            { text: 'Use `<footer>` for action. Add `<button type="button" data-book-id="101">Reserve</button>` — `type="button"` prevents.' },
            { text: 'Validate nesting: all tags closed in reverse order, no block-in-inline violations. Save as .html and open in browser.', faded: true, blankAnswer: 'Complete HTML5 document as described (see code in.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_cs_cbse_10_009', title: 'Identify each idea',
          dissect: { specimen: 'Client-Server Architecture and Peer-to-Peer Model', spots: [
            { id: 's1', label: 'Client-Server architecture is a distributed', prompt: 'Which idea is this? — Client-Server architecture is a distributed application structure that partitions tasks.', answer: 'Client-Server architecture is a distributed', options: ['Client-Server architecture is a distributed', 'Text file operations for counting', 'The pickle module in Python', 'Network security encompasses measures to'] },
            { id: 's2', label: 'Text file operations for counting', prompt: 'Which idea is this? — Text file operations for counting words, lines, and characters involve reading a text.', answer: 'Text file operations for counting', options: ['Text file operations for counting', 'Client-Server architecture is a distributed', 'The pickle module in Python', 'Network security encompasses measures to'] },
            { id: 's3', label: 'The pickle module in Python', prompt: 'Which idea is this? — The `pickle` module in Python provides a way to serialize (pickle) and deserialize.', answer: 'The pickle module in Python', options: ['The pickle module in Python', 'Client-Server architecture is a distributed', 'Text file operations for counting', 'Network security encompasses measures to'] },
            { id: 's4', label: 'Network security encompasses measures to', prompt: 'Which idea is this? — Network security encompasses measures to protect network infrastructure and data from.', answer: 'Network security encompasses measures to', options: ['Network security encompasses measures to', 'Client-Server architecture is a distributed', 'Text file operations for counting', 'The pickle module in Python'] },
            { id: 's5', label: 'The World Wide Web Web', prompt: 'Which idea is this? — The World Wide Web (Web) is a global information system of interlinked hypertext.', answer: 'The World Wide Web Web', options: ['The World Wide Web Web', 'Client-Server architecture is a distributed', 'Text file operations for counting', 'The pickle module in Python'] },
            { id: 's6', label: 'HTML HyperText Markup Language uses', prompt: 'Which idea is this? — HTML (HyperText Markup Language) uses **tags** (keywords enclosed in angle brackets like.', answer: 'HTML HyperText Markup Language uses', options: ['HTML HyperText Markup Language uses', 'Client-Server architecture is a distributed', 'Text file operations for counting', 'The pickle module in Python'] }
          ] } }
    ],
    explore: { component: C12_ComputerScienceJavaStreamFilterSim, prompt: 'Explore the interactive — Client-Server Architecture and Peer-to-Peer Model' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_009', difficulty: 'standard',
          question: 'Client-Server architecture is a distributed application structure that.',
          hint: 'If stuck, revisit c12_cs_cbse_01_001 (Introduction to Computer Networks) and list three.',
          misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application.',
          parts: [
                { id: 'a', prompt: 'A startup wants to build a real-time multiplayer game for 10,000 concurrent players with low latency. They have limited budget for server infrastructure.', answer: 'Recommend Client-Server with cloud-based auto-scaling game servers',
                  options: ['Recommend Client-Server with cloud-based auto-scaling game servers', 'Peer-to-Peer means no server at all', 'P2P has zero infrastructure cost'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application server* with the absence.' },
                { id: 'b', prompt: 'Compare the scalability behavior of Client-Server vs. P2P as the number of users increases from 100 to 1,000,000.', answer: 'Client-Server: Server bandwidth grows linearly with users (O(n))',
                  options: ['Client-Server: Server bandwidth grows linearly with users (O(n))', 'P2P scales infinitely with no cost', 'Peer-to-Peer means no server at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application server* with the absence.' }
          ],
            remediations: { 'peer-to-peer-means-no': { steps: ['Revisit the distinction between *data plane* and *control plane* using the BitTorrent example — identify which steps.', 'Draw a sequence diagram for a torrent download showing: .torrent file → tracker HTTP request → peer list → peer.', 'Ask: "If the tracker goes down, can existing peers still trade pieces?', 'Re-attempt Diagnostic Question 6 with this diagram.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Blockchain networks like Bitcoin use a pure Peer-to-Peer architecture, so they have no centralization risks." Defend or refute with.', answer: 'Refute',
                  options: ['Refute', 'Peer-to-Peer means no server at all', 'P2P has zero infrastructure cost', 'P2P works even if all known peers are offline'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application server* with the absence.' },
                { id: 'b', prompt: 'Compare the scalability behavior of Client-Server vs. P2P as the number of users increases from 100 to 1,000,000.', answer: 'Client-Server: Server bandwidth grows linearly with users (O(n))',
                  options: ['Client-Server: Server bandwidth grows linearly with users (O(n))', 'P2P scales infinitely with no cost', 'Peer-to-Peer means no server at all', 'P2P has zero infrastructure cost'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "Peer-to-Peer means no server at all" — they confuse the absence of a *central application server* with the absence.' }
          ],
            remediations: { 'peer-to-peer-means-no': { steps: ['Revisit the distinction between *data plane* and *control plane* using the BitTorrent example — identify which steps.', 'Draw a sequence diagram for a torrent download showing: .torrent file → tracker HTTP request → peer list → peer.', 'Ask: "If the tracker goes down, can existing peers still trade pieces?', 'Re-attempt Diagnostic Question 6 with this diagram.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_009', difficulty: 'standard',
          question: 'Text file operations for counting words, lines, and characters involve reading.',
          hint: 'Revisit c12_cs_cbse_10_003 (Reading Files) and practice `split()` vs `split(\' \')` on.',
          misconception: 'Students believe `f.read().count(\'\\n\')` gives the correct line count for all files.',
          parts: [
                { id: 'a', prompt: 'What does `len(content.split())` return when `content = "Hello world\\n\\nPython"`?', answer: 'It returns 3',
                  options: ['It returns 3', '`f.read()'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `f.read().count(\'\\n\')` gives the correct line count for all files.' },
                { id: 'b', prompt: 'A student writes `lines = len(f.readlines())` to count lines, but gets 0 for a file they know has 5 lines. They confirm the file path is correct.', answer: 'The file pointer is at the end of the file',
                  options: ['The file pointer is at the end of the file', '`f.read()'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `f.read().count(\'\\n\')` gives the correct line count for all files.' },
                { id: 'c', prompt: 'Write a Python snippet that correctly counts lines, words, and characters (including spaces and newlines) in `data.txt` using a single `read()` call, handling.', answer: '```python with open(\'data.txt\', \'r\') as f: content = f.read() lines =',
                  options: ['```python with open(\'data.txt\', \'r\') as f: content = f.read() lines =', 'Lines: {lines}, Words: {words}, Characters: {chars}', '`f.read()'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `f.read().count(\'\\n\')` gives the correct line count for all files.' }
          ],
            remediations: { 'f': { steps: ['If a student uses `count(\'\\n\') + 1` blindly: (1) Make them test with `echo -n "hello" > test.txt` (no newline) — their.', '(2) Test with empty file — returns 1 line.', '(3) Show `splitlines()` behavior: `"a\\nb".splitlines()` → `[\'a\', \'b\']` (2), `"a\\nb\\n".splitlines()` → `[\'a\', \'b\']` (2),.', '(4) Have them rewrite using `splitlines()` and verify all three cases.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe `f.read().count(\'\\n\')` gives the correct line count for all files.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since `split()` handles multiple spaces, `split(\' \')` (with space argument) should work the same for word counting." Evaluate this claim.', answer: 'The claim is FALSE',
                  options: ['The claim is FALSE', '`f.read()'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe `f.read().count(\'\\n\')` gives the correct line count for all files.' }
          ],
            remediations: { 'f': { steps: ['If a student uses `count(\'\\n\') + 1` blindly: (1) Make them test with `echo -n "hello" > test.txt` (no newline) — their.', '(2) Test with empty file — returns 1 line.', '(3) Show `splitlines()` behavior: `"a\\nb".splitlines()` → `[\'a\', \'b\']` (2), `"a\\nb\\n".splitlines()` → `[\'a\', \'b\']` (2),.', '(4) Have them rewrite using `splitlines()` and verify all three cases.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_10_011', difficulty: 'standard',
          question: 'The `pickle` module in Python provides a way to serialize (pickle) and.',
          hint: 'Revisit binary file modes (c12_cs_cbse_10_008) and exception handling.',
          misconception: 'Students often believe `pickle` is a safe, universal format like JSON — they send pickled data over networks or load.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The `pickle` module in Python provides a way to serialize (pickle) and deserialize',
                  options: ['The `pickle` module in Python provides a way to serialize (pickle) and deserialize', 'Client-Server architecture is a distributed application structure that partitions tasks', 'Text file operations for counting words, lines, and characters involve reading a text', 'Network security encompasses measures to protect network infrastructure and data from'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe `pickle` is a safe, universal format like JSON — they send pickled data over networks or load pickles from untrusted.' }
          ],
            remediations: { 'pickle-is-a-safe': { steps: ['Re‑watch/read binary file modes (`\'wb\'`, `\'rb\'`) from node **c12_cs_cbse_10_008** — practice writing/reading raw bytes.', 'Review exception handling patterns (`try‑except‑else‑finally`, specific exception types) from node.', 'Re‑do **Diagnostic Question 3** step‑by‑step, explaining aloud why each mode and exception is chosen.', 'If custom class unpickling fails, revisit the `__init__`/`__repr__` structure and ensure the class definition is.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_010', difficulty: 'standard',
          question: 'Network security encompasses measures to protect network infrastructure and.',
          hint: 'If stuck, revisit c12_cs_cbse_01_006 (IP Address) and c12_cs_cbse_01_003 (Network.',
          misconception: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based.',
          parts: [
                { id: 'a', prompt: 'Explain why symmetric encryption alone is insufficient for secure key exchange over an untrusted network, and how asymmetric encryption solves this.', answer: 'Symmetric encryption requires both parties to already share a secret key',
                  options: ['Symmetric encryption requires both parties to already share a secret key', 'asymmetric is faster so we use it for everything', 'encrypts data'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based on rules.' }
          ],
            remediations: { 'a-firewall-encrypts-data-or': { steps: ['Re-read NCERT Section 1.7 (Network Security) focusing on the firewall-encryption distinction table.', 'Draw a 3-column table: "Threat", "Firewall Role", "Encryption Role" with 5 rows (eavesdropping, unauthorized access,.', 'For each threat, write one sentence on what firewall does and what encryption does.', 'Attempt Diagnostic Questions 2 and 4 again — they directly test this separation.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_01_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Using a 256-bit AES key is always more secure than a 2048-bit RSA key because 256 > 2048." Provide a reasoned judgment.', answer: 'The claim is false',
                  options: ['The claim is false', 'true, bigger number = more secure', 'encrypts data', 'blocks hackers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based on rules.' },
                { id: 'b', prompt: 'Design a secure communication setup for a small business with 5 employees who need to: (a) access internal file server from home, (b) send digitally signed.', answer: 'access internal file server from home, (',
                  options: ['access internal file server from home, (', 'encrypts data', 'blocks hackers', 'a firewall "encrypts data" or that encryption "blocks hackers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe a firewall "encrypts data" or that encryption "blocks hackers." Firewalls filter traffic based on rules.' }
          ],
            remediations: { 'a-firewall-encrypts-data-or': { steps: ['Re-read NCERT Section 1.7 (Network Security) focusing on the firewall-encryption distinction table.', 'Draw a 3-column table: "Threat", "Firewall Role", "Encryption Role" with 5 rows (eavesdropping, unauthorized access,.', 'For each threat, write one sentence on what firewall does and what encryption does.', 'Attempt Diagnostic Questions 2 and 4 again — they directly test this separation.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_001', difficulty: 'standard',
          question: 'The World Wide Web (Web) is a global information system of interlinked.',
          hint: 'If stuck, revisit the concept of **client-server model** and **HTTP request-response.',
          misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Google Search is a Web 1.0 service because it only shows links to other pages." Explain why this classification is incorrect, referencing at.', answer: 'Google Search is a Web 2.0 service',
                  options: ['Google Search is a Web 2.0 service', 'showing links', 'Web 2.0 = using JavaScript'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0 websites use JavaScript,.' },
                { id: 'b', prompt: 'Consider an Indian e-commerce site that displays product pages with fixed HTML, requires full page reload for every category change, and has no user reviews or.', answer: 'live price updates via AJAX, (',
                  options: ['live price updates via AJAX, (', 'Web 2.0 = using JavaScript', 'Web 2.0 = fancy animations'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0 websites use JavaScript,.' },
                { id: 'c', prompt: 'Compare the architecture of a traditional Web 1.0 blog (static HTML files served directly) with a Web 2.0 blog platform (like WordPress).', answer: '| Aspect | Web 1.0 Blog | Web 2.0 Blog Platform |',
                  options: ['| Aspect | Web 1.0 Blog | Web 2.0 Blog Platform |', 'Web 2.0 is just more HTML', 'Web 2.0 = using JavaScript'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0 websites use JavaScript,.' }
          ],
            remediations: { 'web-2': { steps: ['If a student exhibits this misconception: 1.', 'Show two code snippets: a 2003-era JS image rollover (Web 1.0) vs a modern `fetch(\'/api/like\', {method:\'POST\'})` (Web.', 'Ask: "Which one changes server state?" 2.', 'Have them trace the **HTTP request/response cycle** for both — emphasize that Web 2.0 requires *stateful server.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Web 2.0 eliminated the need for HTML because everything is now built with JavaScript frameworks like React." Provide a reasoned judgment.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'Web 2.0 = using JavaScript', 'Web 2.0 = fancy animations', 'Web 2.0 websites use JavaScript, Web 1.0 don\'t'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0 websites use JavaScript,.' },
                { id: 'b', prompt: 'Design a minimal Web 2.0 feature for a school library website: students can reserve books online and receive notifications.', answer: '**Client-side**: (1) Login page (form → POST /login), (2) Book search (AJAX GET',
                  options: ['**Client-side**: (1) Login page (form → POST /login), (2) Book search (AJAX GET', 'Web 2.0 = using JavaScript', 'Web 2.0 = fancy animations', 'Web 2.0 websites use JavaScript, Web 1.0 don\'t'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0 websites use JavaScript,.' }
          ],
            remediations: { 'web-2': { steps: ['If a student exhibits this misconception: 1.', 'Show two code snippets: a 2003-era JS image rollover (Web 1.0) vs a modern `fetch(\'/api/like\', {method:\'POST\'})` (Web.', 'Ask: "Which one changes server state?" 2.', 'Have them trace the **HTTP request/response cycle** for both — emphasize that Web 2.0 requires *stateful server.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_002', difficulty: 'standard',
          question: 'HTML (HyperText Markup Language) uses **tags** (keywords enclosed in angle.',
          hint: 'Revisit c12_cs_cbse_03_001\'s "How the Web works" section — focus on the request/response.',
          misconception: 'Students believe **attributes can appear in closing tags** (e.g., `</a href="...">`) or that **self-closing tags like.',
          parts: [
                { id: 'a', prompt: 'Identify the tag, element, and attribute in this snippet: `<img src="photo.jpg" alt="My photo">`', answer: 'Tag: `<img>` (self-closing tag)',
                  options: ['Tag: `<img>` (self-closing tag)', 'the attribute value is the element content', '**attributes can appear in closing tags** (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **attributes can appear in closing tags** (e.g., `</a href="...">`) or that **self-closing tags like `<br>` require a.' },
                { id: 'b', prompt: 'Explain why this HTML is invalid: `<p><strong>Bold and italic</p></strong>`', answer: 'The tags are improperly nested',
                  options: ['The tags are improperly nested', 'it works in browser anyway', 'identify the error in the following code'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **attributes can appear in closing tags** (e.g., `</a href="...">`) or that **self-closing tags like `<br>` require a.' },
                { id: 'c', prompt: 'Compare these two snippets. Which produces semantically correct structure for a navigation menu and why?', answer: 'Snippet B is correct',
                  options: ['Snippet B is correct', '**attributes can appear in closing tags** (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **attributes can appear in closing tags** (e.g., `</a href="...">`) or that **self-closing tags like `<br>` require a.' }
          ],
            remediations: { 'attributes-can-appear-in-closing': { steps: ['Have the student physically write 5 tag/element/attribute triples on paper: e.g., Tag=`<a>`, Element=`<a.', 'Use browser DevTools (F12) to inspect a live page — hover over elements in the Elements panel and ask "Is this a tag,.', 'Practice the "LIFO nesting" rule with a stack analogy (connect to c12_cs_cbse_03_001\'s stack concept): push opening.', 'Re-attempt Diagnostic Q2 and Q5.'] } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **attributes can appear in closing tags** (e.g., `</a href="...">`) or that **self-closing tags like.',
          parts: [
                { id: 'a', prompt: 'A student writes `<input required="false">` to make a field optional. Evaluate this approach and state the correct way to make an input optional.', answer: 'The approach is wrong',
                  options: ['The approach is wrong', '**attributes can appear in closing tags** (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **attributes can appear in closing tags** (e.g., `</a href="...">`) or that **self-closing tags like `<br>` require a.' }
          ],
            remediations: { 'attributes-can-appear-in-closing': { steps: ['Have the student physically write 5 tag/element/attribute triples on paper: e.g., Tag=`<a>`, Element=`<a.', 'Use browser DevTools (F12) to inspect a live page — hover over elements in the Elements panel and ask "Is this a tag,.', 'Practice the "LIFO nesting" rule with a stack analogy (connect to c12_cs_cbse_03_001\'s stack concept): push opening.', 'Re-attempt Diagnostic Q2 and Q5.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
