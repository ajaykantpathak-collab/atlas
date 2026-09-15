import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch06_p1: SimDef = {
    id: 'v3_c12_ip_ch06_p1',
    title: 'Web Application Development · Part 1/2',
    subtitle: 'The heading in <head> rendered nothing — correctly',
    classLevel: 12, subject: 'informatics_practices', topic: 'Web Application Development · Part 1/2',
    chapters: ['c12_ip_ch06'],
    nodeIds: ['c12_ip_cbse_06_001', 'c12_ip_cbse_06_002', 'c12_ip_cbse_06_003', 'c12_ip_cbse_06_004', 'c12_ip_cbse_06_005', 'c12_ip_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Web-page builder', intro: 'Before a single visible word, every page negotiates with the browser through tags nobody sees.', goal: 'Structure a valid HTML5 document — doctype, head metadata, body content — and know what each part controls.' },
    discovery: {
        question: 'A student writes a heading inside the head tag and wonders why it never renders — the browser obeyed perfectly. What\'s the head actually for?',
        options: ['Invisible instructions — metadata like charset, viewport and title that steer the browser but never paint the page; visible content lives in body', 'Page headers', 'Styling only', 'SEO only'],
        answer: 'Invisible instructions — metadata like charset, viewport and title that steer the browser but never paint the page; visible content lives in body',
        hook: 'The doctype isn\'t a tag — it\'s a mode switch telling the browser \'standards, not quirks.\' And head versus body isn\'t optional decoration: it\'s the contract between your code and the rendering engine.',
    },
    teaching: [
        { title: 'HTML document structure: head, body, and metadata tags', text: 'An HTML document is structured with a root `<html>` element containing two mandatory children: `<head>` for metadata (document title, character encoding, viewport settings, linked resources) and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Write the five-line skeleton from memory: doctype, html, head, body — then place charset, viewport and title correctly and explain what each one quietly controls.',
        labels: ['HTML document structure: head,', 'HTML text formatting', 'HTML links and anchors', 'HTML images, lists,', 'HTML forms: input types,', 'CSS: selectors, properties,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_001', title: 'HTML document structure: head, body, and metadata tags',
          caseStudy: { intro: 'Imagine you are building a webpage for your Class 12 project showcase.',
            decisions: [{ prompt: 'What is the exact purpose of the `<!DOCTYPE html>` declaration in an HTML5 document?', options: [
                { text: 'The `<!DOCTYPE html>` declaration tells the browser to render the page in standards mode', outcome: 'The `<!DOCTYPE html>` declaration tells the browser to render the page in standards mode (HTML5).' },
                { text: 'it defines the root element', outcome: 'Not quite — Students often treat `<head>` as a visible header bar (like `<header>`) and put headings, logos,.', reveals: 'students-often-treat-head-as' },
                { text: 'it links the CSS file', outcome: 'Not quite — Students often treat `<head>` as a visible header bar (like `<header>`) and put headings, logos,.', reveals: 'students-often-treat-head-as' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_002', title: 'HTML text formatting and heading tags',
          caseStudy: { intro: 'Imagine you are writing a blog post about "India\'s Space Missions" and want to structure it with a main title, section headings, and emphasized technical terms.',
            decisions: [{ prompt: 'What is the correct HTML tag for the highest-level heading in a document, and how many levels of headings does HTML provide?', options: [
                { text: 'The correct tag is `<h1>` and HTML provides six levels (`<h1>` through `<h6>`)', outcome: 'The correct tag is `<h1>` and HTML provides six levels (`<h1>` through `<h6>`).' },
                { text: '7 levels', outcome: 'Not quite — Students think heading tags (`<h1>`-`<h6>`) are only for making text "big and bold" and use them.', reveals: 'heading-tags-h1-h6-are' },
                { text: 'unlimited', outcome: 'Not quite — Students think heading tags (`<h1>`-`<h6>`) are only for making text "big and bold" and use them.', reveals: 'heading-tags-h1-h6-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_003', title: 'HTML links and anchors: href and target attributes',
          caseStudy: { intro: 'Imagine you are building a school website and need to link the "Contact Us" page from the home page, open the school\'s Wikipedia page in a new tab, and create.',
            decisions: [{ prompt: 'What is the correct HTML to create a link that opens `https://www.example.com` in a new browser tab while preventing the new page from.', options: [
                { text: '`<a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Example</a>`', outcome: '`<a href="https://www.example.com" target="_blank" rel="noopener noreferrer">Example</a>` A wrong.' },
                { text: 'https://www.example.com', outcome: 'Not quite — Students think `target="_blank"` is just a "new window" toggle and omit `rel="noopener.', reveals: 'target-blank-is-just-a' },
                { text: '_blank', outcome: 'Not quite — Students think `target="_blank"` is just a "new window" toggle and omit `rel="noopener.', reveals: 'target-blank-is-just-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_005', title: 'HTML forms: input types, labels, and form attributes',
          caseStudy: { intro: 'Imagine you are building a "Student Registration" page for your school\'s annual fest — you need to collect name, email, phone, date of birth, preferred events.',
            decisions: [{ prompt: 'What is the purpose of the `name` attribute on an `<input>` element, and what happens if you omit it?', options: [
                { text: 'The `name` attribute is the key under', outcome: 'The `name` attribute is the key under which the input\'s value is sent to the server during form.' },
                { text: 'it\'s for CSS styling', outcome: 'Not quite — **Misconception:** "The `id` and `name` attributes on an `<input>` are interchangeable — you can.', reveals: 'misconception-the-id-and-name' },
                { text: 'it\'s the label text', outcome: 'Not quite — **Misconception:** "The `id` and `name` attributes on an `<input>` are interchangeable — you can.', reveals: 'misconception-the-id-and-name' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_001', title: 'A real-world call',
          caseStudy: { intro: 'A city\'s cameras catch real criminals — and record everyone else, always. The footage solved a murder last month; it also logs who visited which clinic, which protest, which door.',
            decisions: [{ prompt: 'Is safety worth being always watched?', options: [
                { text: 'Yes — the innocent have nothing to hide', outcome: 'The common argument; \'nothing to hide\' assumes the watcher will always be benign — history doesn\'t.' },
                { text: 'No — a watched population is a managed one', outcome: 'The civil-liberties answer; it asks citizens to accept risks the watched never chose.' },
                { text: 'Only with deletion clocks and independent audits', outcome: 'The governed-surveillance answer — the camera can stay if the footage expires and someone outside the system checks it.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your teammate\'s event webpage jumps from <h1> straight to <h4> \'because h4 text looks the right size\', and uses <b> everywhere for \'important\' warnings.',
            decisions: [{ prompt: 'What does semantic HTML say about those choices?', options: [
                { text: 'Both break the structure layer — headings are the document outline screen readers and search engines navigate by, so skipping levels strands users; and <strong>, not <b>, is what marks importance — size belongs to CSS, not to whichever heading tag looks right.', outcome: 'The chapter\'s split: headings encode hierarchy, semantic tags encode meaning, styling encodes look — borrowing h4 for its font size corrupts the outline to borrow its pixels.' },
                { text: 'It\'s fine — h4 just means smaller heading, so use whatever fits the design.', outcome: 'That reads tags as sizes: the levels aren\'t a font menu, and a screen reader walking h1→h4 reports a structure that doesn\'t exist; the look he wanted is a CSS line, not a heading choice.', reveals: 'headings-are-sizes' },
                { text: 'Fix only the headings — <b> and <strong> render the same so it doesn\'t matter.', outcome: 'They render alike but announce differently — <strong> carries importance to assistive tech and search weighting while <b> is decoration; \'looks identical\' is exactly the difference between presentational and semantic.', reveals: 'bold-equals-strong' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now build a valid HTML5 skeleton — and know which tags speak to the browser instead of the reader.',
            decisions: [{ prompt: 'What comes next? Web Application Development · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Web Application Development · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_001', difficulty: 'standard',
          question: 'An HTML document is structured with a root `<html>` element containing two.',
          hint: 'If stuck, revisit "Creating and saving a text file" (Class 11 IP node c11_ip_cbse_06_002).',
          misconception: 'Students often treat `<head>` as a visible header bar (like `<header>`) and put headings, logos, or navigation inside.',
          parts: [
                { id: 'a', prompt: 'A student writes `<head><title>My Page</title><h1>Welcome</h1></head>`. Explain why the `<h1>` will not appear as a heading on the rendered page.', answer: 'The `<head>` section only contains metadata',
                  options: ['The `<head>` section only contains metadata', 'the heading will appear but without styling', 'browsers automatically move it to body', '(metadata container) with the everyday English word'],
                  hint: 'If stuck, revisit "Creating and saving a text file" (Class 11 IP node c11_ip_cbse_06_002) and.',
                  misconception: 'Students often treat `<head>` as a visible header bar (like `<header>`) and put headings, logos, or navigation inside it.' },
                { id: 'b', prompt: 'Compare the roles of `<meta name="description">` and `<meta name="viewport">`. Why would omitting each hurt a real-world website differently?', answer: '`<meta name="description">` provides a snippet for search engine results (SEO)',
                  options: ['`<meta name="description">` provides a snippet for search engine results (SEO)', 'appearance', '(metadata container) with the everyday English word'],
                  hint: 'If stuck, revisit "Creating and saving a text file" (Class 11 IP node c11_ip_cbse_06_002) and.',
                  misconception: 'Students often treat `<head>` as a visible header bar (like `<header>`) and put headings, logos, or navigation inside it.' }
          ],
            remediations: { 'students-often-treat-head-as': { steps: ['Have the student open a blank `.html` file and type only `<h1>Test</h1>` — observe raw tags in browser.', 'Add `<!DOCTYPE html><html><head></head><body>` around it — observe correct rendering.', 'Move the `<h1>` into `<head>` — observe it disappears.', 'Add `<title>Tab Title</title>` inside `<head>` — check browser tab.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat `<head>` as a visible header bar (like `<header>`) and put headings, logos, or navigation inside.',
          parts: [
                { id: 'a', prompt: 'Design a new metadata tag (not in HTML5 standard) that could help a browser automatically detect the primary language of a page\'s visible text content.', answer: 'Proposed tag: `<meta name="primary-language" content="hi">` placed in `<head>`',
                  options: ['Proposed tag: `<meta name="primary-language" content="hi">` placed in `<head>`', '(metadata container) with the everyday English word'],
                  hint: 'If stuck, revisit "Creating and saving a text file" (Class 11 IP node c11_ip_cbse_06_002) and.',
                  misconception: 'Students often treat `<head>` as a visible header bar (like `<header>`) and put headings, logos, or navigation inside it.' }
          ],
            remediations: { 'students-often-treat-head-as': { steps: ['Have the student open a blank `.html` file and type only `<h1>Test</h1>` — observe raw tags in browser.', 'Add `<!DOCTYPE html><html><head></head><body>` around it — observe correct rendering.', 'Move the `<h1>` into `<head>` — observe it disappears.', 'Add `<title>Tab Title</title>` inside `<head>` — check browser tab.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_002', difficulty: 'standard',
          question: 'HTML text formatting tags are inline elements that define the visual.',
          hint: 'If stuck, revisit c12_ip_cbse_06_001 and practice writing 5 complete HTML skeletons with.',
          misconception: 'Students think heading tags (`<h1>`-`<h6>`) are only for making text "big and bold" and use them purely for visual.',
          parts: [
                { id: 'a', prompt: 'What is the correct HTML tag for the highest-level heading in a document, and how many levels of headings does HTML provide?', answer: 'The correct tag is `<h1>` and HTML provides six levels (`<h1>` through `<h6>`)',
                  options: ['The correct tag is `<h1>` and HTML provides six levels (`<h1>` through `<h6>`)', '7 levels', 'unlimited', 'big and bold'],
                  hint: 'If stuck, revisit c12_ip_cbse_06_001 and practice writing 5 complete HTML skeletons with different.',
                  misconception: 'Students think heading tags (`<h1>`-`<h6>`) are only for making text "big and bold" and use them purely for visual sizing (e.g., using.' }
          ],
            remediations: { 'heading-tags-h1-h6-are': { steps: ['Revisit the concept of "document outline" — draw a tree diagram of a sample article with headings and show how skipping.', 'Practice converting a plain-text recipe into HTML by first marking only the hierarchy (h1/h2/h3) on paper, then adding.', 'Use the W3C Nu HTML Checker (validator.w3.org) on their code — it flags heading hierarchy errors and suggests semantic.', 'Re-read the NCERT section on "HTML Text Formatting" (Chapter 6, Web Application Development) focusing on the table.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_003', difficulty: 'standard',
          question: 'An HTML anchor element (`<a>`) creates a hyperlink to another web resource.',
          hint: 'If stuck on path resolution, revisit the folder-tree exercise in ON_FAILURE step 2 — draw.',
          misconception: 'Students think `target="_blank"` is just a "new window" toggle and omit `rel="noopener noreferrer"`.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An HTML anchor element (`<a>`) creates a hyperlink to another web resource using the',
                  options: ['An HTML anchor element (`<a>`) creates a hyperlink to another web resource using the', 'An HTML document is structured with a root `<html>` element containing two mandatory', 'HTML text formatting tags are inline elements that define the visual presentation or', 'HTML images, lists, and tables are structural elements used to embed media, organize'],
                  hint: 'If stuck on path resolution, revisit the folder-tree exercise in ON_FAILURE step 2 — draw the.',
                  misconception: 'Students think `target="_blank"` is just a "new window" toggle and omit `rel="noopener noreferrer"`.' }
          ],
            remediations: { 'target-blank-is-just-a': { steps: ['Revisit **c12_ip_cbse_06_001** (HTML document structure) to understand how `<a>` fits inside `<body>` and how.', 'Practice path resolution: draw a folder tree on paper, place `index.html` and `pages/about.html`, then write the.', 'Open browser DevTools (F12) → Console, click a `target="_blank"` link without `rel`, then type `window.opener` in the.', 'Add `rel="noopener"` and verify `window.opener` is `null`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_004', difficulty: 'standard',
          question: 'HTML images, lists, and tables are structural elements used to embed media.',
          hint: 'Revisit c12_ip_cbse_06_001 (document structure) and c12_ip_cbse_06_002 (block vs inline.',
          misconception: 'Students believe `width` and `height` attributes on `<img>` resize the image file (reducing bandwidth).',
          parts: [
                { id: 'a', prompt: 'Explain why the following nested list code is invalid: `<ul><li>Fruits<ul><li>Apple</li></ul></li><li>Vegetables</li></ul>` — actually it IS valid.', answer: 'The second code is invalid',
                  options: ['The second code is invalid', 'nesting not allowed'],
                  hint: 'Revisit c12_ip_cbse_06_001 (document structure) and c12_ip_cbse_06_002 (block vs inline elements).',
                  misconception: 'Students believe `width` and `height` attributes on `<img>` resize the image file (reducing bandwidth).' }
          ],
            remediations: { 'width-and-height-attributes-on': { steps: ['Have student create two identical web pages: one with a 2MB image displayed at 100×100 via attributes, another with the.', 'Use browser DevTools Network tab to compare actual download size.', 'Explain: attributes ≠ compression.', 'Practice: give them a 500×500 image, ask to display at 250×250 *and* provide a separate compressed version.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_005', difficulty: 'standard',
          question: 'An HTML form is a structured container (`<form>`) that collects user input.',
          hint: 'If stuck, revisit c12_ip_cbse_06_001 (HTML document structure) and c12_ip_cbse_06_003.',
          misconception: '**Misconception:** "The `id` and `name` attributes on an `<input>` are interchangeable — you can use either one for.',
          parts: [
                { id: 'a', prompt: 'What is the purpose of the `name` attribute on an `<input>` element, and what happens if you omit it?', answer: 'The `name` attribute is the key under',
                  options: ['The `name` attribute is the key under', 'it\'s for CSS styling', 'it\'s the label text'],
                  hint: 'If stuck, revisit c12_ip_cbse_06_001 (HTML document structure) and c12_ip_cbse_06_003 (anchor.',
                  misconception: '**Misconception:** "The `id` and `name` attributes on an `<input>` are interchangeable — you can use either one for labeling and form.' }
          ],
            remediations: { 'misconception-the-id-and-name': { steps: ['**Revisit labeling:** Create 3 inputs (text, checkbox, radio) each with `<label for="...">` and matching `id`.', 'Test: click the label text — does the input focus/check?', 'If not, fix `for`/`id` match.', '**Revisit name vs id:** Build a form with two text inputs: one with `id="a" name="b"`, another with `id="c" name="d"`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_006', difficulty: 'standard',
          question: 'CSS (Cascading Style Sheets) is a stylesheet language used to describe the.',
          hint: 'If stuck, revisit `c12_ip_cbse_06_004` (lists/tables) and `c12_ip_cbse_06_005` (forms).',
          misconception: '**Misconception:** "CSS properties like `margin`, `padding`, and `border` work the same way on all HTML elements.',
          parts: [
                { id: 'a', prompt: 'Given this HTML and CSS, what will be the final color of the paragraph text? Explain step by step.', answer: 'Correct answer: **green** Reasoning: 1',
                  options: ['Correct answer: **green** Reasoning: 1', 'cascade order overrides specificity'],
                  hint: 'If stuck, revisit `c12_ip_cbse_06_004` (lists/tables) and `c12_ip_cbse_06_005` (forms) to practice.',
                  misconception: '**Misconception:** "CSS properties like `margin`, `padding`, and `border` work the same way on all HTML elements, including inline elements.' }
          ],
            remediations: { 'misconception-css-properties-like-margin': { steps: ['If the student exhibits the above misconception: 1.', 'Show a live demo: create a `<span style="margin-top: 20px; background: yellow;">Test</span>` inside a paragraph.', 'Change to `display: inline-block` — now margin works.', 'Explain: **Inline elements flow with text; they don\'t create block boxes.** Vertical margins/padding are ignored for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
