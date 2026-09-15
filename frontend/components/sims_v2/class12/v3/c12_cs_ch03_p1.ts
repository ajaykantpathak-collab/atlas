import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch03_p1: SimDef = {
    id: 'v3_c12_cs_ch03_p1',
    title: 'Web Development · Part 1/2',
    subtitle: 'The web didn\'t get new plumbing — it got a new job',
    classLevel: 12, subject: 'computer_science', topic: 'Web Development · Part 1/2',
    chapters: ['c12_cs_ch03'],
    nodeIds: ['c12_cs_cbse_03_001', 'c12_cs_cbse_03_002', 'c12_cs_cbse_03_003', 'c12_cs_cbse_03_004', 'c12_cs_cbse_03_005', 'c12_cs_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Web developer', intro: 'The 2005 web showed you pages; today\'s web lets you build them. That shift — not any gadget — is what this chapter is about.', goal: 'Distinguish Web 1.0 from Web 2.0 and identify the technologies that power interactivity and user-generated content.' },
    discovery: {
        question: 'A friend claims Web 2.0 is \'a new protocol that replaced HTTP.\' Your IRCTC app logs in, shows live seats and lets you post reviews — all over ordinary HTTPS. What\'s the truth?',
        options: ['Web 2.0 is a design shift, not a protocol — the same HTTP now carries AJAX updates, user content and API calls that make pages interactive', 'True — Web 2.0 sites run on a special new protocol', 'Web 2.0 just means websites with better graphics', 'It means any site built after the year 2000'],
        answer: 'Web 2.0 is a design shift, not a protocol — the same HTTP now carries AJAX updates, user content and API calls that make pages interactive',
        hook: 'Web 1.0 vs 2.0 isn\'t old-tech vs new-tech — it\'s read-only vs read-write. The user changed from audience to author, and the plumbing (HTML, HTTP) barely changed at all. Frameworks like React still output HTML — there is no \'post-HTML\' web.',
    },
    teaching: [
        { title: 'Introduction to Web and Web 2.0', text: 'The World Wide Web (Web) is a global information system of interlinked hypertext documents and resources accessed via the Internet using HTTP/HTTPS protocols.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Upgrade a static school site into a Web 2.0 experience: pick features (live search, reviews, share buttons), match each to its enabling tech — AJAX, server-side scripting, databases, APIs — and defend the architecture.',
        labels: ['Introduction to Web', 'HTML Structure: Tags, Elements', 'HTML Formatting and Semantic', 'HTML Lists: Ordered, Unordered', 'HTML Tables: Structure', 'HTML Forms: Input Elements'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_001', title: 'Introduction to Web and Web 2.0',
          caseStudy: { intro: 'Imagine you are comparing two Indian railway ticketing experiences: the old IRCTC website from 2005 where you could only view static timetables and had to call.',
            decisions: [{ prompt: 'State whether the following is true or false: "Web 2.0 is a separate technical protocol that replaced HTTP."', options: [
                { text: 'False', outcome: 'False. Web 2.0 is not a protocol; it is a design philosophy and set of practices that use existing.' },
                { text: 'Web 2.0 = using JavaScript', outcome: 'Not quite — Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write.', reveals: 'web-2' },
                { text: 'Web 2.0 = fancy animations', outcome: 'Not quite — Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write.', reveals: 'web-2' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_002', title: 'HTML Structure: Tags, Elements and Attributes',
          caseStudy: { intro: 'Imagine you\'re building a digital résumé for a college application.',
            decisions: [{ prompt: 'Identify the tag, element, and attribute in this snippet: `<img src="photo.jpg" alt="My photo">`', options: [
                { text: 'Tag: `<img>` (self-closing tag)', outcome: 'Tag: `<img>` (self-closing tag). Element: the entire `<img src="photo.jpg" alt="My photo">` (since.' },
                { text: 'the attribute value is the element content', outcome: 'Not quite — Students believe **attributes can appear in closing tags** (e.g., `</a href="...">`) or that.', reveals: 'attributes-can-appear-in-closing' },
                { text: '**attributes can appear in closing tags** (e', outcome: 'Not quite — Students believe **attributes can appear in closing tags** (e.g., `</a href="...">`) or that.', reveals: 'attributes-can-appear-in-closing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_003', title: 'HTML Formatting and Semantic Tags',
          caseStudy: { intro: 'Imagine you\'re building a school website\'s "Annual Day" page. You could make the event name bold with `<b>Annual Day</b>` — but a screen reader for visually.',
            decisions: [{ prompt: 'What is the fundamental difference between the `<b>` tag and the `<strong>` tag in HTML5, and why does this distinction matter for screen.', options: [
                { text: '`<b>` only applies bold styling without conveying importance, while `<strong>` indicates', outcome: '`<b>` only applies bold styling without conveying importance, while `<strong>` indicates strong.' },
                { text: 'they do the same thing', outcome: 'Not quite — Students believe `<strong>` and `<b>` are interchangeable because both render bold, and similarly.', reveals: 'strong-and-b-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_004', title: 'HTML Lists: Ordered, Unordered and Definition',
          caseStudy: { intro: 'Imagine you are building a webpage for a school magazine. You need to show: (1) a list of student achievements where ranking matters, (2) a list of club.',
            decisions: [{ prompt: 'What is the default marker style for an unordered list (`<ul>`) in HTML5, and which CSS property would you use to change it to squares?', options: [
                { text: 'The default marker is a solid disc (bullet)', outcome: 'The default marker is a solid disc (bullet). To change it to squares, use the CSS property.' },
                { text: 'circle', outcome: 'Not quite — Students often think the `type` attribute on `<ol>` changes only the visual style (like CSS) and.', reveals: 'the-type-attribute-on-ol' },
                { text: 'decimal', outcome: 'Not quite — Students often think the `type` attribute on `<ol>` changes only the visual style (like CSS) and.', reveals: 'the-type-attribute-on-ol' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_005', title: 'HTML Tables: Structure and Attributes',
          caseStudy: { intro: 'Imagine you are creating a class timetable for your school website — you need to show days as columns, periods as rows, and subjects in cells, with some.',
            decisions: [{ prompt: 'What is the correct hierarchical order of HTML table tags from outermost container to innermost cell content?', options: [
                { text: 'Correct order: `<table>` → `<tr>` → `<th>` or `<td>` → cell content', outcome: 'Correct order: `<table>` → `<tr>` → `<th>` or `<td>` → cell content.' },
                { text: 'cells exist outside rows, or confuses the nesting structure', outcome: 'Not quite — Students believe `rowspan` and `colspan` **add** extra rows/columns to the table.', reveals: 'rowspan-and-colspan-add-extra' },
                { text: '`rowspan` and `colspan` **add** extra rows/columns to the table', outcome: 'Not quite — Students believe `rowspan` and `colspan` **add** extra rows/columns to the table.', reveals: 'rowspan-and-colspan-add-extra' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_006', title: 'HTML Forms: Input Elements and Attributes',
          caseStudy: { intro: 'Imagine you are building a "Student Registration" page for your school\'s annual fest.',
            decisions: [{ prompt: 'What is the purpose of the `name` attribute in an `<input>` element inside a form, and what happens if you omit it?', options: [
                { text: 'The `name` attribute assigns a unique identifier to the input field so that when the form', outcome: 'The `name` attribute assigns a unique identifier to the input field so that when the form.' },
                { text: 'it\'s just a label for the user', outcome: 'Not quite — Students often think the `value` attribute of a text input is the same as the `placeholder`.', reveals: 'the-value-attribute-of-a' },
                { text: 'the `value` attribute of a text input is the same as the `placeholder`', outcome: 'Not quite — Students often think the `value` attribute of a text input is the same as the `placeholder`.', reveals: 'the-value-attribute-of-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student shows off a portfolio site built in React — ten static blog posts, a dark-mode toggle saved in localStorage — and insists it\'s \'obviously Web 2.0 because it uses a modern framework\'.',
            decisions: [{ prompt: 'Does the site qualify as Web 2.0?', options: [
                { text: 'No — Web 2.0 is about architecture: bidirectional data flow, server-side state, and user-generated content; a framework that compiles to static files with no backend is still Web 1.0 underneath.', outcome: 'The label follows the data flow, not the toolchain — no accounts, no shared dynamic data, no participation means no Web 2.0.' },
                { text: 'Yes — anything running JavaScript with smooth interactions is Web 2.0.', outcome: 'Web 1.0 sites used JavaScript too, for rollovers and validation; what makes 2.0 is server communication and persistent user state.', reveals: 'web2-is-javascript' },
                { text: 'Yes — Web 2.0 is simply the newer protocol that replaced HTTP.', outcome: 'Web 2.0 isn\'t a protocol at all; it still runs on ordinary HTTP/HTTPS — it\'s a design philosophy, not a wire format.', reveals: 'web2-is-protocol' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now tell a paradigm from a protocol and name the exact technology behind every interactive feature. That\'s the lens this whole chapter grades.',
            decisions: [{ prompt: 'What comes next? Web Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Web Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_001', difficulty: 'standard',
          question: 'The World Wide Web (Web) is a global information system of interlinked.',
          hint: 'If stuck, revisit the concept of **client-server model** and **HTTP request-response.',
          misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Google Search is a Web 1.0 service because it only shows links to other pages." Explain why this classification is incorrect, referencing.', answer: 'Google Search is a Web 2.0 service',
                  options: ['Google Search is a Web 2.0 service', 'showing links', 'Web 2.0 = using JavaScript', 'Web 2.0 = fancy animations'],
                  hint: 'If stuck, revisit the concept of **client-server model** and **HTTP request-response cycle** from.',
                  misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0 websites use JavaScript.' },
                { id: 'b', prompt: 'Consider an Indian e-commerce site that displays product pages with fixed HTML, requires full page reload for every category change, and has no user reviews.', answer: 'live price updates via AJAX, (',
                  options: ['live price updates via AJAX, (', 'Web 2.0 = using JavaScript', 'Web 2.0 = fancy animations', 'Web 2.0 websites use JavaScript, Web 1.0 don\'t'],
                  hint: 'If stuck, revisit the concept of **client-server model** and **HTTP request-response cycle** from.',
                  misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0 websites use JavaScript.' },
                { id: 'c', prompt: 'Compare the architecture of a traditional Web 1.0 blog (static HTML files served directly) with a Web 2.0 blog platform (like WordPress).', answer: '| Aspect | Web 1.0 Blog | Web 2.0 Blog Platform |',
                  options: ['| Aspect | Web 1.0 Blog | Web 2.0 Blog Platform |', 'Web 2.0 is just more HTML', 'Web 2.0 = using JavaScript', 'Web 2.0 = fancy animations'],
                  hint: 'If stuck, revisit the concept of **client-server model** and **HTTP request-response cycle** from.',
                  misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0 websites use JavaScript.' }
          ],
            remediations: { 'web-2': { steps: ['If a student exhibits this misconception: 1.', 'Show two code snippets: a 2003-era JS image rollover (Web 1.0) vs a modern `fetch(\'/api/like\', {method:\'POST\'})` (Web.', 'Ask: "Which one changes server state?" 2.', 'Have them trace the **HTTP request/response cycle** for both — emphasize that Web 2.0 requires *stateful server.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Web 2.0 eliminated the need for HTML because everything is now built with JavaScript frameworks like React." Provide a reasoned judgment.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'Web 2.0 = using JavaScript', 'Web 2.0 = fancy animations', 'Web 2.0 websites use JavaScript, Web 1.0 don\'t'],
                  hint: 'If stuck, revisit the concept of **client-server model** and **HTTP request-response cycle** from.',
                  misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0 websites use JavaScript.' },
                { id: 'b', prompt: 'Design a minimal Web 2.0 feature for a school library website: students can reserve books online and receive notifications.', answer: '**Client-side**: (1) Login page (form → POST /login), (2) Book search (AJAX GET',
                  options: ['**Client-side**: (1) Login page (form → POST /login), (2) Book search (AJAX GET', 'Web 2.0 = using JavaScript', 'Web 2.0 = fancy animations', 'Web 2.0 websites use JavaScript, Web 1.0 don\'t'],
                  hint: 'If stuck, revisit the concept of **client-server model** and **HTTP request-response cycle** from.',
                  misconception: 'Students often think "Web 2.0 = using JavaScript" or "Web 2.0 = fancy animations." They write in exams: "Web 2.0 websites use JavaScript.' }
          ],
            remediations: { 'web-2': { steps: ['If a student exhibits this misconception: 1.', 'Show two code snippets: a 2003-era JS image rollover (Web 1.0) vs a modern `fetch(\'/api/like\', {method:\'POST\'})` (Web.', 'Ask: "Which one changes server state?" 2.', 'Have them trace the **HTTP request/response cycle** for both — emphasize that Web 2.0 requires *stateful server.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_002', difficulty: 'standard',
          question: 'HTML (HyperText Markup Language) uses **tags** (keywords enclosed in angle.',
          hint: 'Revisit c12_cs_cbse_03_001\'s "How the Web works" section — focus on the request/response.',
          misconception: 'Students believe **attributes can appear in closing tags** (e.g., `</a href="...">`) or that **self-closing tags like.',
          parts: [
                { id: 'a', prompt: 'Identify the tag, element, and attribute in this snippet: `<img src="photo.jpg" alt="My photo">`', answer: 'Tag: `<img>` (self-closing tag)',
                  options: ['Tag: `<img>` (self-closing tag)', 'the attribute value is the element content', '**attributes can appear in closing tags** (e'],
                  hint: 'Revisit c12_cs_cbse_03_001\'s "How the Web works" section — focus on the request/response cycle and.',
                  misconception: 'Students believe **attributes can appear in closing tags** (e.g., `</a href="...">`) or that **self-closing tags like `<br>` require.' },
                { id: 'b', prompt: 'Explain why this HTML is invalid: `<p><strong>Bold and italic</p></strong>`', answer: 'The tags are improperly nested',
                  options: ['The tags are improperly nested', 'it works in browser anyway', 'identify the error in the following code', '**attributes can appear in closing tags** (e'],
                  hint: 'Revisit c12_cs_cbse_03_001\'s "How the Web works" section — focus on the request/response cycle and.',
                  misconception: 'Students believe **attributes can appear in closing tags** (e.g., `</a href="...">`) or that **self-closing tags like `<br>` require.' },
                { id: 'c', prompt: 'Compare these two snippets. Which produces semantically correct structure for a navigation menu and why?', answer: 'Snippet B is correct',
                  options: ['Snippet B is correct', '**attributes can appear in closing tags** (e'],
                  hint: 'Revisit c12_cs_cbse_03_001\'s "How the Web works" section — focus on the request/response cycle and.',
                  misconception: 'Students believe **attributes can appear in closing tags** (e.g., `</a href="...">`) or that **self-closing tags like `<br>` require.' }
          ],
            remediations: { 'attributes-can-appear-in-closing': { steps: ['Have the student physically write 5 tag/element/attribute triples on paper: e.g., Tag=`<a>`, Element=`<a.', 'Use browser DevTools (F12) to inspect a live page — hover over elements in the Elements panel and ask "Is this a tag.', 'Practice the "LIFO nesting" rule with a stack analogy (connect to c12_cs_cbse_03_001\'s stack concept): push opening.', 'Re-attempt Diagnostic Q2 and Q5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_003', difficulty: 'standard',
          question: 'HTML formatting tags control the visual presentation of text (bold, italic.',
          hint: 'If stuck on nesting rules, revisit c12_cs_cbse_03_002 "HTML Structure: Tags, Elements and.',
          misconception: 'Students believe `<strong>` and `<b>` are interchangeable because both render bold, and similarly `<em>`/`<i>` for.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'HTML formatting tags control the visual presentation of text (bold, italic, underline,',
                  options: ['HTML formatting tags control the visual presentation of text (bold, italic, underline,', 'The World Wide Web (Web) is a global information system of interlinked hypertext', 'HTML (HyperText Markup Language) uses **tags** (keywords enclosed in angle brackets like', 'HTML lists are semantic container elements that group related items in a specific order'],
                  hint: 'If stuck on nesting rules, revisit c12_cs_cbse_03_002 "HTML Structure: Tags, Elements and.',
                  misconception: 'Students believe `<strong>` and `<b>` are interchangeable because both render bold, and similarly `<em>`/`<i>` for italics.' }
          ],
            remediations: { 'strong-and-b-are-interchangeable': { steps: ['Revisit the distinction between presentational vs semantic tags using the "screen reader test" — read `<b>Warning</b>`.', 'Map each formatting tag to its semantic counterpart: b→strong, i→em, u→(avoid; use CSS), s→del, etc.', 'Practice converting 3 presentational snippets to semantic HTML, checking each tag against "does this convey meaning.', 'Re-attempt Diagnostic Questions 1 and 3 — if errors persist, review c12_cs_cbse_03_002 (HTML Structure) for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_004', difficulty: 'standard',
          question: 'HTML lists are semantic container elements that group related items in.',
          hint: 'If stuck on nesting rules, review the "Content categories" and "Permitted content".',
          misconception: 'Students often think the `type` attribute on `<ol>` changes only the visual style (like CSS) and that `start` works.',
          parts: [
                { id: 'a', prompt: 'What is the default marker style for an unordered list (`<ul>`) in HTML5, and which CSS property would you use to change it to squares?', answer: 'The default marker is a solid disc (bullet)',
                  options: ['The default marker is a solid disc (bullet)', 'circle', 'decimal'],
                  hint: 'If stuck on nesting rules, review the "Content categories" and "Permitted content" sections in the.',
                  misconception: 'Students often think the `type` attribute on `<ol>` changes only the visual style (like CSS) and that `start` works with any `type`.' },
                { id: 'b', prompt: 'Compare the structure of a definition list (`<dl>`) with a two-column table (`<table>`).', answer: '`<dl>` uses `<dt>` (term) and `<dd>` (description)',
                  options: ['`<dl>` uses `<dt>` (term) and `<dd>` (description)', 'always use tables for alignment'],
                  hint: 'If stuck on nesting rules, review the "Content categories" and "Permitted content" sections in the.',
                  misconception: 'Students often think the `type` attribute on `<ol>` changes only the visual style (like CSS) and that `start` works with any `type`.' }
          ],
            remediations: { 'the-type-attribute-on-ol': { steps: ['Revisit c12_cs_cbse_03_002 (HTML Structure) to review element nesting rules and attribute syntax.', 'Create a minimal test page with three ordered lists: one with `type="A" start="3"`, one with `type="i" start="5"`, and.', 'View in browser and compare rendered numbers.', 'Write a definition list with three terms, then intentionally break nesting by placing `<ul>` directly inside `<dl>`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_005', difficulty: 'standard',
          question: 'An HTML table is a structured grid of rows and columns used to display tabular.',
          hint: 'Revisit c12_cs_cbse_03_002 (HTML Structure: Tags, Elements and Attributes) — practice.',
          misconception: 'Students believe `rowspan` and `colspan` **add** extra rows/columns to the table.',
          parts: [
                { id: 'a', prompt: 'What is the correct hierarchical order of HTML table tags from outermost container to innermost cell content?', answer: 'Correct order: `<table>` → `<tr>` → `<th>` or `<td>` → cell content',
                  options: ['Correct order: `<table>` → `<tr>` → `<th>` or `<td>` → cell content', 'cells exist outside rows, or confuses the nesting structure', '`rowspan` and `colspan` **add** extra rows/columns to the table'],
                  hint: 'Revisit c12_cs_cbse_03_002 (HTML Structure: Tags, Elements and Attributes) — practice writing.',
                  misconception: 'Students believe `rowspan` and `colspan` **add** extra rows/columns to the table.' },
                { id: 'b', prompt: 'Compare `cellpadding` and `cellspacing`. If a table has `cellpadding="10"` and `cellspacing="5"`, describe the visual spacing between: (a) cell content and its.', answer: 'cell content and its own border, (',
                  options: ['cell content and its own border, (', '`rowspan` and `colspan` **add** extra rows/columns to the table'],
                  hint: 'Revisit c12_cs_cbse_03_002 (HTML Structure: Tags, Elements and Attributes) — practice writing.',
                  misconception: 'Students believe `rowspan` and `colspan` **add** extra rows/columns to the table.' }
          ],
            remediations: { 'rowspan-and-colspan-add-extra': { steps: ['Have the student draw a 3×3 grid on paper.', 'Shade a 2×2 block in the top-left.', 'Ask: "How many cells in row 1?', 'Which cells are missing in row 2?" 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_006', difficulty: 'standard',
          question: 'HTML forms are interactive sections of a web page that collect user input.',
          hint: 'Revisit c12_cs_cbse_03_002 (HTML Structure) and practice writing `<label.',
          misconception: 'Students often think the `value` attribute of a text input is the same as the `placeholder`.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between `method="GET"` and `method="POST"` in a form. Give one situation where you would choose POST over GET.', answer: 'GET appends form data to the URL as query parameters (visible, bookmarkable,',
                  options: ['GET appends form data to the URL as query parameters (visible, bookmarkable,', 'POST is always better', 'the `value` attribute of a text input is the same as the `placeholder`'],
                  hint: 'Revisit c12_cs_cbse_03_002 (HTML Structure) and practice writing `<label for="x">Name</label><input.',
                  misconception: 'Students often think the `value` attribute of a text input is the same as the `placeholder`.' }
          ],
            remediations: { 'the-value-attribute-of-a': { steps: ['Have the student create a minimal form with one text input: first with only `placeholder`, then with only `value`, then.', 'Submit each to a simple server endpoint (e.g., `https://httpbin.org/post`) and inspect the raw POST data.', 'Ask: "What did the server receive in each case?" 3.', 'Explicitly contrast: `placeholder` → never sent; `value` → sent as-is unless user changes it.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
