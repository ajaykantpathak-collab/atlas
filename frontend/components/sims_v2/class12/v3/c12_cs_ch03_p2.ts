import type { SimDef } from '../../engine/types';

/** v3 generated — c12_cs_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_cs_ch03_p2: SimDef = {
    id: 'v3_c12_cs_ch03_p2',
    title: 'Web Development · Part 2/2',
    subtitle: 'The web didn\'t get new plumbing — it got a new job',
    classLevel: 12, subject: 'computer_science', topic: 'Web Development · Part 2/2',
    chapters: ['c12_cs_ch03'],
    nodeIds: ['c12_cs_cbse_03_007', 'c12_cs_cbse_03_008', 'c12_cs_cbse_03_009', 'c12_cs_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Web developer', intro: 'The 2005 web showed you pages; today\'s web lets you build them. That shift — not any gadget — is what this chapter is about.', goal: 'Distinguish Web 1.0 from Web 2.0 and identify the technologies that power interactivity and user-generated content.' },
    discovery: {
        question: 'A friend claims Web 2.0 is \'a new protocol that replaced HTTP.\' Your IRCTC app logs in, shows live seats and lets you post reviews — all over ordinary HTTPS. What\'s the truth?',
        options: ['Web 2.0 is a design shift, not a protocol — the same HTTP now carries AJAX updates, user content and API calls that make pages interactive', 'True — Web 2.0 sites run on a special new protocol', 'Web 2.0 just means websites with better graphics', 'It means any site built after the year 2000'],
        answer: 'Web 2.0 is a design shift, not a protocol — the same HTTP now carries AJAX updates, user content and API calls that make pages interactive',
        hook: 'Web 1.0 vs 2.0 isn\'t old-tech vs new-tech — it\'s read-only vs read-write. The user changed from audience to author, and the plumbing (HTML, HTTP) barely changed at all. Frameworks like React still output HTML — there is no \'post-HTML\' web.',
    },
    teaching: [
        { title: 'CSS: Introduction and Adding Styles to HTML', text: 'CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation and layout of HTML documents.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_cs_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Upgrade a static school site into a Web 2.0 experience: pick features (live search, reviews, share buttons), match each to its enabling tech — AJAX, server-side scripting, databases, APIs — and defend the architecture.',
        labels: ['CSS: Introduction and Adding', 'CSS Selectors and Properties', 'Web Hosting and Domain', 'Static vs Dynamic Web'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_007', title: 'CSS: Introduction and Adding Styles to HTML',
          caseStudy: { intro: 'Imagine you\'ve built a webpage with HTML — headings, paragraphs, a table — but it looks plain, like a raw text document.',
            decisions: [{ prompt: 'What is the correct syntax for a CSS rule that makes all `<h1>` elements have red text and a font size of 24 pixels?', options: [
                { text: 'Correct answer: `h1 { color: red', outcome: 'Correct answer: `h1 { color: red; font-size: 24px; }`. A wrong answer like `h1: color=red.' },
                { text: 'part of HTML', outcome: 'Not quite — Students often think CSS is "part of HTML" and write things like `<p font-color="red">` or put CSS.', reveals: 'css-is-part-of-html' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_008', title: 'CSS Selectors and Properties',
          caseStudy: { intro: 'Imagine you are building a school website and the principal asks: "Make all main headings dark blue, give the current page link in the navigation a yellow.',
            decisions: [{ prompt: 'What is the difference between a class selector and an ID selector in CSS, and how do you write each in a stylesheet?', options: [
                { text: 'A class selector starts with a dot (`.classname`) and can be applied to multiple elements', outcome: 'A class selector starts with a dot (`.classname`) and can be applied to multiple elements; an.' },
                { text: 'specificity weight', outcome: 'Not quite — Students often believe that the universal selector `*` has zero specificity and can be overridden.', reveals: 'the-universal-selector-has-zero' },
                { text: 'cascade order', outcome: 'Not quite — Students often believe that the universal selector `*` has zero specificity and can be overridden.', reveals: 'the-universal-selector-has-zero' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_009', title: 'Web Hosting and Domain Registration',
          caseStudy: { intro: 'Imagine you have built a portfolio website using HTML and CSS (from previous nodes) and want to share it with the world.',
            decisions: [{ prompt: 'What is the primary function of the Domain Name System (DNS) in the context of web hosting?', options: [
                { text: 'The primary function of DNS is to translate human-readable domain names (e.g.,', outcome: 'The primary function of DNS is to translate human-readable domain names (e.g., example.com) into.' },
                { text: 'DNS stores website files', outcome: 'Not quite — Students often think that buying a domain automatically includes web hosting, or that uploading.', reveals: 'buying-a-domain-automatically-includes' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student shows off a portfolio site built in React — ten static blog posts, a dark-mode toggle saved in localStorage — and insists it\'s \'obviously Web 2.0 because it uses a modern framework\'.',
            decisions: [{ prompt: 'Does the site qualify as Web 2.0?', options: [
                { text: 'No — Web 2.0 is about architecture: bidirectional data flow, server-side state, and user-generated content; a framework that compiles to static files with no backend is still Web 1.0 underneath.', outcome: 'The label follows the data flow, not the toolchain — no accounts, no shared dynamic data, no participation means no Web 2.0.' },
                { text: 'Yes — anything running JavaScript with smooth interactions is Web 2.0.', outcome: 'Web 1.0 sites used JavaScript too, for rollovers and validation; what makes 2.0 is server communication and persistent user state.', reveals: 'web2-is-javascript' },
                { text: 'Yes — Web 2.0 is simply the newer protocol that replaced HTTP.', outcome: 'Web 2.0 isn\'t a protocol at all; it still runs on ordinary HTTP/HTTPS — it\'s a design philosophy, not a wire format.', reveals: 'web2-is-protocol' }
            ] }] } },
        { type: 'case', nodeId: 'c12_cs_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'You can now tell a paradigm from a protocol and name the exact technology behind every interactive feature. That\'s the lens this whole chapter grades.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_007', difficulty: 'standard',
          question: 'CSS (Cascading Style Sheets) is a stylesheet language used to describe the.',
          hint: 'Revisit c12_cs_cbse_03_002 (HTML Structure) and practice adding id/class to elements.',
          misconception: 'Students often think CSS is "part of HTML" and write things like `<p font-color="red">` or put CSS properties directly.',
          parts: [
                { id: 'a', prompt: 'What is the correct syntax for a CSS rule that makes all `<h1>` elements have red text and a font size of 24 pixels?', answer: 'Correct answer: `h1 { color: red',
                  options: ['Correct answer: `h1 { color: red', 'part of HTML'],
                  hint: 'Revisit c12_cs_cbse_03_002 (HTML Structure) and practice adding id/class to elements until you can.',
                  misconception: 'Students often think CSS is "part of HTML" and write things like `<p font-color="red">` or put CSS properties directly on tags without the.' },
                { id: 'b', prompt: 'Explain in your own words the difference between internal and external CSS. Give one advantage of external CSS for a website with 50 pages.', answer: 'Internal CSS is written inside a `<style>` tag in the HTML file\'s `<head>`',
                  options: ['Internal CSS is written inside a `<style>` tag in the HTML file\'s `<head>`', 'external CSS loads faster', 'part of HTML'],
                  hint: 'Revisit c12_cs_cbse_03_002 (HTML Structure) and practice adding id/class to elements until you can.',
                  misconception: 'Students often think CSS is "part of HTML" and write things like `<p font-color="red">` or put CSS properties directly on tags without the.' },
                { id: 'c', prompt: 'You have an HTML file with a paragraph `<p id="intro">Welcome</p>`.', answer: 'HTML: `<link rel="stylesheet" href="main.css">` (inside `<head>`)',
                  options: ['HTML: `<link rel="stylesheet" href="main.css">` (inside `<head>`)', 'part of HTML'],
                  hint: 'Revisit c12_cs_cbse_03_002 (HTML Structure) and practice adding id/class to elements until you can.',
                  misconception: 'Students often think CSS is "part of HTML" and write things like `<p font-color="red">` or put CSS properties directly on tags without the.' },
                { id: 'd', prompt: 'Compare the specificity of these three CSS rules targeting the same `<div>`: 1. `div { color: black; }` 2.', answer: 'The div will be red',
                  options: ['The div will be red', 'part of HTML'],
                  hint: 'Revisit c12_cs_cbse_03_002 (HTML Structure) and practice adding id/class to elements until you can.',
                  misconception: 'Students often think CSS is "part of HTML" and write things like `<p font-color="red">` or put CSS properties directly on tags without the.' }
          ],
            remediations: { 'css-is-part-of-html': { steps: ['Have the student create a single HTML file with one `<h1>` and one `<p>`.', 'Ask them to make the heading red using an inline style.', 'Verify they write `style="color:red"` correctly.', 'Move that rule to an internal `<style>` block targeting `h1`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think CSS is "part of HTML" and write things like `<p font-color="red">` or put CSS properties directly.',
          parts: [
                { id: 'a', prompt: 'A student writes this in their HTML head: ```html <style> p { color: blue; } .note { color: red; } </style> ``` and this paragraph: `<p.', answer: 'The student is wrong',
                  options: ['The student is wrong', 'part of HTML'],
                  hint: 'Revisit c12_cs_cbse_03_002 (HTML Structure) and practice adding id/class to elements until you can.',
                  misconception: 'Students often think CSS is "part of HTML" and write things like `<p font-color="red">` or put CSS properties directly on tags without the.' }
          ],
            remediations: { 'css-is-part-of-html': { steps: ['Have the student create a single HTML file with one `<h1>` and one `<p>`.', 'Ask them to make the heading red using an inline style.', 'Verify they write `style="color:red"` correctly.', 'Move that rule to an internal `<style>` block targeting `h1`.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_008', difficulty: 'standard',
          question: 'CSS Selectors are patterns used to target specific HTML elements for styling.',
          hint: 'If stuck, revisit HTML tags and attributes (c12_cs_cbse_03_002) and CSS introduction.',
          misconception: 'Students often believe that the universal selector `*` has zero specificity and can be overridden by any other.',
          parts: [
                { id: 'a', prompt: 'Compare the specificity of the following three selectors for the same element: (1) `#main-content`, (2) `.article .highlight`, (3) `div p span`.', answer: 'Specificity is calculated as (ID count, class/attribute/pseudo-class count,',
                  options: ['Specificity is calculated as (ID count, class/attribute/pseudo-class count,', 'specificity weight', 'cascade order', 'more classes beat an ID, or counting elements first'],
                  hint: 'If stuck, revisit HTML tags and attributes (c12_cs_cbse_03_002) and CSS introduction.',
                  misconception: 'Students often believe that the universal selector `*` has zero specificity and can be overridden by any other selector.' }
          ],
            remediations: { 'the-universal-selector-has-zero': { steps: ['Revisit the specificity calculation: write three rules targeting the same element — one with an ID, one with two.', 'Practice combinators: create a nested list (`ul > li > ul > li`) and write rules using space vs `>` to color only.', 'Review the CSS Introduction node (c12_cs_cbse_03_007) for the syntax of rule sets and how to link stylesheets.', 'Re-diagnostic: after practice, answer Diagnostic Question 4 again without notes.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_009', difficulty: 'standard',
          question: 'Web hosting is a service that allows individuals and organizations to make.',
          hint: 'If stuck, revisit c12_cs_cbse_03_001 (Web basics) and c12_cs_cbse_03_002 (HTML) to ensure.',
          misconception: 'Students often think that buying a domain automatically includes web hosting, or that uploading files to the.',
          parts: [
                { id: 'a', prompt: 'What is the primary function of the Domain Name System (DNS) in the context of web hosting?', answer: 'The primary function of DNS is to translate human-readable domain names (e.g.,',
                  options: ['The primary function of DNS is to translate human-readable domain names (e.g.,', 'DNS stores website files'],
                  hint: 'If stuck, revisit c12_cs_cbse_03_001 (Web basics) and c12_cs_cbse_03_002 (HTML) to ensure you can.',
                  misconception: 'Students often think that buying a domain automatically includes web hosting, or that uploading files to the registrar\'s panel makes the.' }
          ],
            remediations: { 'buying-a-domain-automatically-includes': { steps: ['If the student confuses domain registration with hosting, have them: 1) Revisit c12_cs_cbse_03_001 (Introduction.', '2) Draw a diagram showing browser -> DNS -> IP -> Web Server.', '3) Practice in a sandbox: register a free subdomain (e.g., from Freenom) and point it to a free hosting (e.g., GitHub.', '4) Re-attempt Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_cs_cbse_03_010', difficulty: 'standard',
          question: 'Static web pages deliver fixed content stored as HTML files on the server.',
          hint: 'If unclear on server vs client roles, revisit c12_cs_cbse_03_001 (Web 2.0) and.',
          misconception: 'Students often think "dynamic webpage = any page with moving/changing elements (animations, clocks, sliders)".',
          parts: [
                { id: 'a', prompt: 'Two websites: Site A serves the same `about.html` file to every visitor.', answer: 'Site A is static',
                  options: ['Site A is static', 'both are static because they send HTML'],
                  hint: 'If unclear on server vs client roles, revisit c12_cs_cbse_03_001 (Web 2.0) and c12_cs_cbse_03_009.',
                  misconception: 'Students often think "dynamic webpage = any page with moving/changing elements (animations, clocks, sliders)".' },
                { id: 'b', prompt: 'Compare caching behavior: A static `product.html` page vs a dynamic `/product?id=123` page that fetches data from a database.', answer: 'The static page is cached aggressively by CDNs (edge servers)',
                  options: ['The static page is cached aggressively by CDNs (edge servers)', 'both can be cached the same way'],
                  hint: 'If unclear on server vs client roles, revisit c12_cs_cbse_03_001 (Web 2.0) and c12_cs_cbse_03_009.',
                  misconception: 'Students often think "dynamic webpage = any page with moving/changing elements (animations, clocks, sliders)".' }
          ],
            remediations: { 'dynamic-webpage-any-page-with': { steps: ['Revisit the HTTP request-response cycle: draw two diagrams — one where the server reads a file (`read file → send`).', 'Use browser DevTools Network tab: visit a static site (e.g., a GitHub Pages blog) and a dynamic site (e.g., a logged-in.', 'Compare `Content-Type`, response time, and whether the HTML contains user-specific data.', 'Re-read c12_cs_cbse_03_009 (Web Hosting) to recall static hosting vs application hosting differences.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
