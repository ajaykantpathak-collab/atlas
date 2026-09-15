import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ip_ch06_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ip_ch06_p2: SimDef = {
    id: 'v3_c12_ip_ch06_p2',
    title: 'Web Application Development · Part 2/2',
    subtitle: 'The heading in <head> rendered nothing — correctly',
    classLevel: 12, subject: 'informatics_practices', topic: 'Web Application Development · Part 2/2',
    chapters: ['c12_ip_ch06'],
    nodeIds: ['c12_ip_cbse_06_007', 'c12_ip_cbse_06_008', 'c12_ip_cbse_06_009', 'c12_ip_cbse_06_010', 'c12_ip_cbse_06_011', 'c12_ip_cbse_06_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Web-page builder', intro: 'Before a single visible word, every page negotiates with the browser through tags nobody sees.', goal: 'Structure a valid HTML5 document — doctype, head metadata, body content — and know what each part controls.' },
    discovery: {
        question: 'A student writes a heading inside the head tag and wonders why it never renders — the browser obeyed perfectly. What\'s the head actually for?',
        options: ['Invisible instructions — metadata like charset, viewport and title that steer the browser but never paint the page; visible content lives in body', 'Page headers', 'Styling only', 'SEO only'],
        answer: 'Invisible instructions — metadata like charset, viewport and title that steer the browser but never paint the page; visible content lives in body',
        hook: 'The doctype isn\'t a tag — it\'s a mode switch telling the browser \'standards, not quirks.\' And head versus body isn\'t optional decoration: it\'s the contract between your code and the rendering engine.',
    },
    teaching: [
        { title: 'CSS box model: margin, border, padding, and content', text: 'The CSS box model describes how HTML elements are rendered as rectangular boxes, consisting of four nested layers: content (where text/images appear), padding (space between content and border).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ip_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Write the five-line skeleton from memory: doctype, html, head, body — then place charset, viewport and title correctly and explain what each one quietly controls.',
        labels: ['CSS box model: margin,', 'Inline, internal, and external', 'Responsive design with media', 'JavaScript basics: variables, data', 'JavaScript functions and event', 'DOM manipulation: accessing'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_ip_cbse_06_007', title: 'CSS box model: margin, border, padding, and content',
          scaffold: { problem: 'A webpage has a div with the following CSS: width: 500px; padding: 25px; border: 4px solid #333; margin: 30px;.',
            steps: [
            { text: 'Identify the given values: content width = 500px, padding = 25px (each side), border = 4px (each side), margin = 30px.' },
            { text: 'Recall the default content-box model: total element width (without margin) = content width + left padding + right.' },
            { text: 'Compute total element width = 500 + 25 + 25 + 4 + 4 = 558px.' },
            { text: 'Total horizontal space including margin = total element width + left margin + right margin = 558 + 30 + 30 = 618px.' },
            { text: 'Content width remains 500px (as declared). Verify: The content area is 500px wide, surrounded by 25px padding, then 4px.', faded: true, blankAnswer: 'Total horizontal space = 618px. Content width = 500px.' }
            ] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_008', title: 'Inline, internal, and external CSS: when to use each',
          caseStudy: { intro: 'Imagine you\'re building a school website: the home page needs a unique hero banner, the "About Us" page shares the same navigation and footer, and the.',
            decisions: [{ prompt: 'What is the correct HTML syntax to link an external stylesheet named `styles.css` located in the same folder as the HTML file?', options: [
                { text: '`<link rel="stylesheet" href="styles.css">` placed inside the `<head>` element', outcome: '`<link rel="stylesheet" href="styles.css">` placed inside the `<head>` element.' },
                { text: 'styles.css', outcome: 'Not quite — **Misconception:** "External CSS is always best; inline and internal are bad practices." **Why it\'s.', reveals: 'misconception-external-css-is-always' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_009', title: 'Responsive design with media queries and viewport',
          caseStudy: { intro: 'Imagine you\'ve built a beautiful webpage on your 15-inch laptop — the navigation bar spreads horizontally, the hero section has side-by-side text and image.',
            decisions: [{ prompt: 'What is the exact purpose of the viewport meta tag `<meta name="viewport" content="width=device-width, initial-scale=1.0">` in a responsive.', options: [
                { text: 'The viewport meta tag tells the mobile browser to set the layout viewport width equal to', outcome: 'The viewport meta tag tells the mobile browser to set the layout viewport width equal to the.' },
                { text: 'it makes the site mobile-friendly', outcome: 'Not quite — Students believe "responsive design means making a separate mobile version of the site" or "media.', reveals: 'responsive-design-means-making-a' },
                { text: 'responsive design means making a separate mobile version of the site', outcome: 'Not quite — Students believe "responsive design means making a separate mobile version of the site" or "media.', reveals: 'responsive-design-means-making-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_010', title: 'JavaScript basics: variables, data types, and operators',
          caseStudy: { intro: 'Imagine you\'re building a simple calculator web page where a user enters the price of a book (₹450) and quantity (3), and you need to compute the total.',
            decisions: [{ prompt: 'What is the output of `typeof null` in JavaScript, and why does this result often surprise beginners who expect it to be `"null"`?', options: [
                { text: 'The output is `"object"`', outcome: 'The output is `"object"`. This is a long-standing JavaScript quirk from the first implementation.' },
                { text: '` or `', outcome: 'Not quite — Students believe `const` makes the value immutable (like `final` in Java).', reveals: 'const-makes-the-value-immutable' },
                { text: 'objects are mutable', outcome: 'Not quite — Students believe `const` makes the value immutable (like `final` in Java).', reveals: 'const-makes-the-value-immutable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_011', title: 'JavaScript functions and event handling in web pages',
          caseStudy: { intro: 'Imagine you are building a simple EMI calculator for a school project: the user enters principal, rate, and tenure, clicks "Calculate", and the monthly.',
            decisions: [{ prompt: 'What is the difference between a function declaration `function greet() {}` and a function expression `const greet = function() {}`.', options: [
                { text: 'A function declaration is fully hoisted (name and body), so it can be called before its', outcome: 'A function declaration is fully hoisted (name and body), so it can be called before its definition.' },
                { text: 'both are hoisted the same way', outcome: 'Not quite — Students believe `return false` inside an inline handler (e.g., `onclick="return validate()"`).', reveals: 'return-false-inside-an-inline' },
                { text: 'return validate()', outcome: 'Not quite — Students believe `return false` inside an inline handler (e.g., `onclick="return validate()"`).', reveals: 'return-false-inside-an-inline' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_012', title: 'DOM manipulation: accessing and changing HTML elements',
          caseStudy: { intro: 'Imagine you are building a "Digital India" complaint portal where citizens report civic issues.',
            decisions: [{ prompt: 'What does `document.querySelector(\'.highlight\')` return if there are three `<p class="highlight">` elements in the HTML?', options: [
                { text: 'It returns only the **first** matching element (the first `<p class="highlight">`), not a', outcome: 'It returns only the **first** matching element (the first `<p class="highlight">`), not a list.' },
                { text: 'returns all three', outcome: 'Not quite — Students believe `document.getElementById(\'x\').style = \'color: red; font-size: 18px\'` works like.', reveals: 'document' },
                { text: 'returns an array', outcome: 'Not quite — Students believe `document.getElementById(\'x\').style = \'color: red; font-size: 18px\'` works like.', reveals: 'document' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_007', title: 'A real-world call',
          caseStudy: { intro: 'A city\'s cameras catch real criminals — and record everyone else, always. The footage solved a murder last month; it also logs who visited which clinic, which protest, which door.',
            decisions: [{ prompt: 'Is safety worth being always watched?', options: [
                { text: 'Yes — the innocent have nothing to hide', outcome: 'The common argument; \'nothing to hide\' assumes the watcher will always be benign — history doesn\'t.' },
                { text: 'No — a watched population is a managed one', outcome: 'The civil-liberties answer; it asks citizens to accept risks the watched never chose.' },
                { text: 'Only with deletion clocks and independent audits', outcome: 'The governed-surveillance answer — the camera can stay if the footage expires and someone outside the system checks it.' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your teammate\'s event webpage jumps from <h1> straight to <h4> \'because h4 text looks the right size\', and uses <b> everywhere for \'important\' warnings.',
            decisions: [{ prompt: 'What does semantic HTML say about those choices?', options: [
                { text: 'Both break the structure layer — headings are the document outline screen readers and search engines navigate by, so skipping levels strands users; and <strong>, not <b>, is what marks importance — size belongs to CSS, not to whichever heading tag looks right.', outcome: 'The chapter\'s split: headings encode hierarchy, semantic tags encode meaning, styling encodes look — borrowing h4 for its font size corrupts the outline to borrow its pixels.' },
                { text: 'It\'s fine — h4 just means smaller heading, so use whatever fits the design.', outcome: 'That reads tags as sizes: the levels aren\'t a font menu, and a screen reader walking h1→h4 reports a structure that doesn\'t exist; the look he wanted is a CSS line, not a heading choice.', reveals: 'headings-are-sizes' },
                { text: 'Fix only the headings — <b> and <strong> render the same so it doesn\'t matter.', outcome: 'They render alike but announce differently — <strong> carries importance to assistive tech and search weighting while <b> is decoration; \'looks identical\' is exactly the difference between presentational and semantic.', reveals: 'bold-equals-strong' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ip_cbse_06_012', title: 'You made it',
          caseStudy: { intro: 'You can now build a valid HTML5 skeleton — and know which tags speak to the browser instead of the reader.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_007', difficulty: 'standard',
          question: 'The CSS box model describes how HTML elements are rendered as rectangular.',
          hint: 'If stuck, review c12_ip_cbse_06_006 (CSS selectors, properties) and practice writing.',
          misconception: 'Students often think margin is part of the element\'s width/height, or that padding and border are included in the width.',
          parts: [
                { id: 'a', prompt: 'What are the four components of the CSS box model, listed from innermost to outermost?', answer: 'The four components are: content, padding, border, margin',
                  options: ['The four components are: content, padding, border, margin', 'it works identically for all properties'],
                  hint: 'If stuck, review c12_ip_cbse_06_006 (CSS selectors, properties) and practice writing simple rules.',
                  misconception: 'Students often think margin is part of the element\'s width/height, or that padding and border are included in the width property.' },
                { id: 'b', prompt: 'A div has the following CSS: width: 400px; padding: 15px; border: 3px solid black; box-sizing: border-box;.', answer: 'With border-box, the declared width includes content, padding, and border',
                  options: ['With border-box, the declared width includes content, padding, and border', 'it works identically for all properties'],
                  hint: 'If stuck, review c12_ip_cbse_06_006 (CSS selectors, properties) and practice writing simple rules.',
                  misconception: 'Students often think margin is part of the element\'s width/height, or that padding and border are included in the width property.' },
                { id: 'c', prompt: 'Compare the default content-box model and border-box model. In which scenario would you prefer border-box for responsive design? Justify.', answer: 'In content-box, width applies only to content',
                  options: ['In content-box, width applies only to content', 'it works identically for all properties'],
                  hint: 'If stuck, review c12_ip_cbse_06_006 (CSS selectors, properties) and practice writing simple rules.',
                  misconception: 'Students often think margin is part of the element\'s width/height, or that padding and border are included in the width property.' }
          ],
            remediations: { 'margin-is-part-of-the': { steps: ['Draw a nested rectangle diagram labeling content, padding, border, margin.', 'Practice calculating total width for 5 examples with explicit numbers, first with content-box, then with border-box.', 'Write the shorthand for margin and padding separately, saying the order aloud (top, right, bottom, left).', 'Revisit c12_ip_cbse_06_006 (CSS selectors and properties) to reinforce property syntax.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think margin is part of the element\'s width/height, or that padding and border are included in the width.',
          parts: [
                { id: 'a', prompt: 'A student writes: "margin: 10px 20px 30px 40px;". Explain what each value represents and how the browser interprets this shorthand.', answer: 'The values are top, right, bottom, left (clockwise)',
                  options: ['The values are top, right, bottom, left (clockwise)', 'it works identically for all properties'],
                  hint: 'If stuck, review c12_ip_cbse_06_006 (CSS selectors, properties) and practice writing simple rules.',
                  misconception: 'Students often think margin is part of the element\'s width/height, or that padding and border are included in the width property.' },
                { id: 'b', prompt: 'Design a CSS rule for a card component that must be exactly 300px wide including a 2px border and 15px padding on all sides, with 20px margin outside.', answer: 'CSS: .card { box-sizing: border-box',
                  options: ['CSS: .card { box-sizing: border-box', 'it works identically for all properties'],
                  hint: 'If stuck, review c12_ip_cbse_06_006 (CSS selectors, properties) and practice writing simple rules.',
                  misconception: 'Students often think margin is part of the element\'s width/height, or that padding and border are included in the width property.' }
          ],
            remediations: { 'margin-is-part-of-the': { steps: ['Draw a nested rectangle diagram labeling content, padding, border, margin.', 'Practice calculating total width for 5 examples with explicit numbers, first with content-box, then with border-box.', 'Write the shorthand for margin and padding separately, saying the order aloud (top, right, bottom, left).', 'Revisit c12_ip_cbse_06_006 (CSS selectors and properties) to reinforce property syntax.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_008', difficulty: 'standard',
          question: 'CSS can be applied to HTML documents in three ways: **inline CSS** uses the.',
          hint: 'Revisit c12_ip_cbse_06_006 (CSS selectors, properties, and applying styles) and trace how.',
          misconception: '**Misconception:** "External CSS is always best; inline and internal are bad practices." **Why it\'s wrong:** Students.',
          parts: [
                { id: 'a', prompt: 'What is the correct HTML syntax to link an external stylesheet named `styles.css` located in the same folder as the HTML file?', answer: '`<link rel="stylesheet" href="styles.css">` placed inside the `<head>` element',
                  options: ['`<link rel="stylesheet" href="styles.css">` placed inside the `<head>` element', 'styles.css'],
                  hint: 'Revisit c12_ip_cbse_06_006 (CSS selectors, properties, and applying styles) and trace how a browser.',
                  misconception: '**Misconception:** "External CSS is always best; inline and internal are bad practices." **Why it\'s wrong:** Students hear "separation.' },
                { id: 'b', prompt: 'Compare the browser caching behavior of internal CSS vs. external CSS when a user navigates from `index.html` to `about.html` on the same site.', answer: 'External CSS reduces bandwidth',
                  options: ['External CSS reduces bandwidth', 'both cache equally'],
                  hint: 'Revisit c12_ip_cbse_06_006 (CSS selectors, properties, and applying styles) and trace how a browser.',
                  misconception: '**Misconception:** "External CSS is always best; inline and internal are bad practices." **Why it\'s wrong:** Students hear "separation.' }
          ],
            remediations: { 'misconception-external-css-is-always': { steps: ['If a student insists "external only," give them three concrete tasks: (1) Code an HTML email with a red button using.', '(2) Build a 10-page site with 5KB of shared styles + 500B page-specific styles; measure load time with all-external vs.', '(3) Override a third-party widget\'s inline style using only external CSS — observe the `!important` arms race.', 'After each, ask: "What constraint forced this method?"'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_009', difficulty: 'standard',
          question: 'Responsive design is a web development approach that creates web pages that.',
          hint: 'Revisit c12_ip_cbse_06_007 (box model) to practice calculating fluid widths with.',
          misconception: 'Students believe "responsive design means making a separate mobile version of the site" or "media queries detect mobile.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Responsive design is a web development approach that creates web pages that automatically',
                  options: ['Responsive design is a web development approach that creates web pages that automatically', 'An HTML document is structured with a root `<html>` element containing two mandatory', 'HTML text formatting tags are inline elements that define the visual presentation or', 'An HTML anchor element (`<a>`) creates a hyperlink to another web resource using the'],
                  hint: 'Revisit c12_ip_cbse_06_007 (box model) to practice calculating fluid widths with padding/border.',
                  misconception: 'Students believe "responsive design means making a separate mobile version of the site" or "media queries detect mobile phones." They write.' }
          ],
            remediations: { 'responsive-design-means-making-a': { steps: ['Have the student open Chrome DevTools (F12), click the device toolbar (Ctrl+Shift+M), and resize the viewport slowly.', 'Ask: "At what width does your layout look bad?" — that\'s your breakpoint.', 'Demonstrate the difference: load a page with `<meta name="viewport" content="width=device-width">` vs without it on.', 'Show how the "without" version renders at 980px zoomed out.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_010', difficulty: 'standard',
          question: 'JavaScript variables are named containers for storing data values that can.',
          hint: 'Revisit Class 11 IP node `c11_ip_cbse_02_006` (Variables, Assignment Statement and.',
          misconception: 'Students believe `const` makes the value immutable (like `final` in Java).',
          parts: [
                { id: 'a', prompt: 'What is the output of `typeof null` in JavaScript, and why does this result often surprise beginners who expect it to be `"null"`?', answer: 'The output is `"object"`',
                  options: ['The output is `"object"`', '` or `', 'objects are mutable', '`const` makes the value immutable (like `final` in Java)'],
                  hint: 'Revisit Class 11 IP node `c11_ip_cbse_02_006` (Variables, Assignment Statement and Dynamic Typing).',
                  misconception: 'Students believe `const` makes the value immutable (like `final` in Java).' },
                { id: 'b', prompt: 'Explain the difference between `let` and `const` in terms of reassignment and mutation. If you declare `const arr = [1, 2];`, can you execute `arr.push(3)`?', answer: '`let` allows reassignment (binding a new value to the same variable name)',
                  options: ['`let` allows reassignment (binding a new value to the same variable name)', 'objects are mutable', '`const` makes the value immutable (like `final` in Java)', 'it should also error'],
                  hint: 'Revisit Class 11 IP node `c11_ip_cbse_02_006` (Variables, Assignment Statement and Dynamic Typing).',
                  misconception: 'Students believe `const` makes the value immutable (like `final` in Java).' },
                { id: 'c', prompt: 'Predict the output of each expression and explain the type coercion rule applied: (a) `"10" + 5` (b) `"10" - 5` (c) `true + 2` (d) `null + 1` (e) `undefined.', answer: '(a) `"105"` — `+` with a string operand triggers string concatenation',
                  options: ['(a) `"105"` — `+` with a string operand triggers string concatenation', 'objects are mutable', '`const` makes the value immutable (like `final` in Java)', 'it should also error'],
                  hint: 'Revisit Class 11 IP node `c11_ip_cbse_02_006` (Variables, Assignment Statement and Dynamic Typing).',
                  misconception: 'Students believe `const` makes the value immutable (like `final` in Java).' },
                { id: 'd', prompt: 'Compare `==` and `===` with these pairs. For each, state the result of both operators and explain WHY they differ or match: (i) `0 == false` vs `0 === false`.', answer: '(i) `0 == false` → `true` (both coerce to 0)',
                  options: ['(i) `0 == false` → `true` (both coerce to 0)', 'objects are mutable', '`const` makes the value immutable (like `final` in Java)', 'it should also error'],
                  hint: 'Revisit Class 11 IP node `c11_ip_cbse_02_006` (Variables, Assignment Statement and Dynamic Typing).',
                  misconception: 'Students believe `const` makes the value immutable (like `final` in Java).' }
          ],
            remediations: { 'const-makes-the-value-immutable': { steps: ['Open browser DevTools Console (F12).', 'Type: `const a = [1]; a.push(2); console.log(a);` → observe `[1,2]`.', 'Then `a = [3];` → observe `TypeError`.', 'Create a 2-column table: "Operation" vs "Allowed on `const`?" with rows: `x = 5`, `x++`, `arr.push()`, `arr = []`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_011', difficulty: 'standard',
          question: 'A JavaScript function is a reusable block of code designed to perform.',
          hint: 'If stuck, revisit Class 11 IP "Functions" (c11_ip_cbse_05_001–005): rewrite your Python.',
          misconception: 'Students believe `return false` inside an inline handler (e.g., `onclick="return validate()"`) stops form submission.',
          parts: [
                { id: 'a', prompt: 'Explain why `btn.onclick = handleClick` and `btn.addEventListener(\'click\', handleClick)` behave differently when you want to attach two separate click handlers.', answer: '`onclick` is a single property',
                  options: ['`onclick` is a single property', 'both allow multiple handlers', 'return validate()', '`return false` inside an inline handler (e'],
                  hint: 'If stuck, revisit Class 11 IP "Functions" (c11_ip_cbse_05_001–005): rewrite your Python EMI.',
                  misconception: 'Students believe `return false` inside an inline handler (e.g., `onclick="return validate()"`) stops form submission, but they write.' },
                { id: 'b', prompt: 'Write a function `validateAge(input)` that returns `true` if the input value is a number between 18 and 60 inclusive, otherwise `false`.', answer: '```js function validateAge(input) { const val = Number(input.value)',
                  options: ['```js function validateAge(input) { const val = Number(input.value)', '>= 18` works but `', '>= 18` is false, yet `Number(', 'return validate()'],
                  hint: 'If stuck, revisit Class 11 IP "Functions" (c11_ip_cbse_05_001–005): rewrite your Python EMI.',
                  misconception: 'Students believe `return false` inside an inline handler (e.g., `onclick="return validate()"`) stops form submission, but they write.' },
                { id: 'c', prompt: 'Compare arrow functions `() => {}` and regular functions `function() {}` in the context of `this` binding inside an event handler.', answer: 'Arrow functions do not have their own `this`',
                  options: ['Arrow functions do not have their own `this`', 'both log the button', 'return validate()', '`return false` inside an inline handler (e'],
                  hint: 'If stuck, revisit Class 11 IP "Functions" (c11_ip_cbse_05_001–005): rewrite your Python EMI.',
                  misconception: 'Students believe `return false` inside an inline handler (e.g., `onclick="return validate()"`) stops form submission, but they write.' }
          ],
            remediations: { 'return-false-inside-an-inline': { steps: ['Revisit c12_ip_cbse_06_010 (JS basics) — practice writing functions with parameters/return values until you can explain.', 'Create a 3-file demo: `index.html` with a button and output `<div>`, `script.js` with a named function and.', 'Add `console.log(event)` inside the handler; inspect the event object in DevTools to see `target`, `type`.', 'Re-attempt Diagnostic Q3 and Q5; if still stuck, watch a 5-min video on "DOM Level 0 vs Level 2 events" and redo the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_ip_cbse_06_012', difficulty: 'standard',
          question: 'DOM (Document Object Model) manipulation refers to the process of using.',
          hint: 'If stuck, revisit **c12_ip_cbse_06_011** — practice writing an event handler that changes.',
          misconception: 'Students believe `document.getElementById(\'x\').style = \'color: red; font-size: 18px\'` works like CSS `style="..."`.',
          parts: [
                { id: 'a', prompt: 'Write the exact JavaScript statements to: (a) select the `<input id="pincode">`, (b) read its value, (c) create a new `<span>` with class "error" containing.', answer: '```js const input = document.getElementById(\'pincode\')',
                  options: ['```js const input = document.getElementById(\'pincode\')', '`document'],
                  hint: 'If stuck, revisit **c12_ip_cbse_06_011** — practice writing an event handler that changes.',
                  misconception: 'Students believe `document.getElementById(\'x\').style = \'color: red; font-size: 18px\'` works like CSS `style="..."`.' }
          ],
            remediations: { 'document': { steps: ['Revisit **c12_ip_cbse_06_011** (event handling) — practice attaching listeners to *single* elements first.', 'Open browser DevTools Console on any page; type `document.querySelector(\'button\')` and inspect the returned object.', 'Complete this micro-drill: create a `<div id="test">`, then in console run: `const d=document.getElementById(\'test\').', 'Re-attempt Diagnostic Question 3 without notes; if stuck, review `insertAdjacentElement` vs `appendChild` on MDN.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
