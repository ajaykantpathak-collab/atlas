import type { SimDef } from '../../engine/types';

/** v3 generated — c10_hist_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_hist_ch05_p1: SimDef = {
    id: 'v3_c10_hist_ch05_p1',
    title: 'Print Culture and the Modern World · Part 1/2',
    subtitle: 'Watch a carved block of wood set the modern world arguing',
    classLevel: 10, subject: 'history', topic: 'Print Culture and the Modern World · Part 1/2',
    chapters: ['c10_hist_ch05'],
    nodeIds: ['c10_hist_cbse_05_001', 'c10_hist_cbse_05_002', 'c10_hist_cbse_05_003', 'c10_hist_cbse_05_004', 'c10_hist_cbse_05_005', 'c10_hist_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a printer\'s apprentice watching ideas go viral — on paper', intro: 'In a workshop in China, a carver cuts characters backwards into wood. A thousand years later, presses in India churn out newspapers the British wish would disappear. Same invention, new world.', goal: 'Trace print\'s journey from East Asia to Europe to India, and explain how print culture fuelled religion, reform and nationalism.' },
    discovery: {
        question: 'The world\'s oldest dated printed book — the Diamond Sutra, 868 CE — was made in China by carving text into wooden blocks, centuries before Gutenberg. If printing was this old, why did it take so long to change the world?',
        options: ['Woodblock printing was slow and craft-bound; only cheap paper, movable type and mass literacy turned print into a revolution', 'China kept the technique a total state secret until 1900', 'Ancient people simply had nothing worth printing', 'Woodblocks could only print pictures, never words'],
        answer: 'Woodblock printing was slow and craft-bound; only cheap paper, movable type and mass literacy turned print into a revolution',
        hook: 'Carving a block for every page was art, not industry. The explosion came when type could be rearranged and reused — suddenly ideas travelled faster than the people who had them.',
    },
    teaching: [
        { title: 'The First Printed Books: China and Japan (Woodblock Printing)', text: 'Woodblock printing is a technique for reproducing text, images, or patterns by carving a relief image onto a wooden block, inking the raised surfaces, and pressing paper against it.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_hist_cbse_05_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Follow print from carved Chinese blocks to Gutenberg\'s press to colonial India — where newspapers argued, reformers fought, and a scared Raj tried to censor it all.',
        labels: ['The First Printed Books', 'Print Comes to Europe', 'The Print Revolution', 'The Reading Mania', 'Print Culture and', 'Print in India'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_001', title: 'The First Printed Books: China and Japan (Woodblock Printing)',
          caseStudy: { intro: 'Imagine you are visiting a museum and see a replica of the *Diamond Sutra* scroll — a 5-meter-long paper roll printed in 868 CE.',
            decisions: [{ prompt: 'What is the name and approximate date of the world\'s oldest dated printed book, and in which country was it produced?', options: [
                { text: 'The *Diamond Sutra*, dated 868 CE (9th year of Xiantong era), produced in China during', outcome: 'The *Diamond Sutra*, dated 868 CE (9th year of Xiantong era), produced in China during the Tang.' },
                { text: 'Gutenberg Bible, 1450s, Germany', outcome: 'Not quite — Students often believe woodblock printing was invented by Gutenberg in 1450s Europe, or that the.', reveals: 'woodblock-printing-was-invented-by' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_003', title: 'The Print Revolution and Its Impact on Society',
          caseStudy: { intro: 'Imagine you see a WhatsApp forward today that changes how thousands think about a law — now ask: how did a single pamphlet in 1517 (Luther\'s 95 Theses) spark.',
            decisions: [{ prompt: 'What was the *first major book* printed by Gutenberg using movable metal type in Mainz, and in approximately what year was it completed?', options: [
                { text: 'The Gutenberg Bible (42-line Bible), completed c', outcome: 'The Gutenberg Bible (42-line Bible), completed c. 1455. A wrong answer (e.g., "Luther\'s Bible".' },
                { text: 'Luther\'s Bible', outcome: 'Not quite — Students believe the Print Revolution *instantly* democratized knowledge: "Gutenberg invented the.', reveals: 'the-print-revolution-instantly-democratized' },
                { text: 'Erasmus\'s New Testament', outcome: 'Not quite — Students believe the Print Revolution *instantly* democratized knowledge: "Gutenberg invented the.', reveals: 'the-print-revolution-instantly-democratized' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_004', title: 'The Reading Mania in Europe: Literacy and Cheap Books',
          caseStudy: { intro: 'Imagine you\'re a 14-year-old apprentice in a 1780s Paris workshop — you earn a few sous a week, but you can buy a *Bibliothèque Bleue* booklet for one sou and.',
            decisions: [{ prompt: 'Name the cheap, small booklets sold by pedlars in France that contained folk tales, religious stories, and practical information, printed.', options: [
                { text: '*Bibliothèque Bleue* (Blue Library) booklets', outcome: '*Bibliothèque Bleue* (Blue Library) booklets. A wrong answer like "chapbooks" confuses the English.' },
                { text: 'chapbooks', outcome: 'Not quite — Students believe "cheap books = Enlightenment ideas for the masses." In reality, *Bibliothèque.', reveals: 'cheap-books-enlightenment-ideas-for' },
                { text: 'penny magazines', outcome: 'Not quite — Students believe "cheap books = Enlightenment ideas for the masses." In reality, *Bibliothèque.', reveals: 'cheap-books-enlightenment-ideas-for' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_005', title: 'Print Culture and the French Revolution: Ideas of Enlightenment',
          caseStudy: { intro: 'Imagine you see a viral social media post today criticizing a government policy — it spreads fast, people comment, and suddenly everyone is discussing it.',
            decisions: [{ prompt: 'Name any two Enlightenment philosophers whose works were widely printed and read in pre-revolutionary France, and state one key idea each.', options: [
                { text: 'Correct answer: Voltaire (advocated freedom of speech, religious tolerance, and', outcome: 'Correct answer: Voltaire (advocated freedom of speech, religious tolerance, and separation.' },
                { text: 'they wanted freedom', outcome: 'Not quite — Students often believe Enlightenment ideas spread *only* among the elite (philosophes, aristocrats).', reveals: 'enlightenment-ideas-spread-only-among' },
                { text: 'freedom', outcome: 'Not quite — Students often believe Enlightenment ideas spread *only* among the elite (philosophes, aristocrats).', reveals: 'enlightenment-ideas-spread-only-among' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_006', title: 'Print in India: The East India Company and Missionary Presses',
          caseStudy: { intro: 'Imagine you visit the old Portuguese church in Old Goa and see a 16th-century printing press on display — the very first in Asia.',
            decisions: [{ prompt: 'In which year and location was the first printing press established in India, and who brought it?', options: [
                { text: 'The first printing press in India was established in 1556 at Goa by Portuguese Jesuit', outcome: 'The first printing press in India was established in 1556 at Goa by Portuguese Jesuit missionaries.' },
                { text: 'Calcutta, 1780, East India Company', outcome: 'Not quite — Students believe printing in India began with the British (East India Company) in Calcutta around.', reveals: 'printing-in-india-began-with' },
                { text: 'Serampore, 1800, William Carey', outcome: 'Not quite — Students believe printing in India began with the British (East India Company) in Calcutta around.', reveals: 'printing-in-india-began-with' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_001', title: 'A real-world call',
          caseStudy: { intro: 'Print culture spread ideas — and propaganda. The same press that carried reform movements carried hate pamphlets. Every technology of free speech is also a technology of its abuse.',
            decisions: [{ prompt: 'Is a freer press always better?', options: [
                { text: 'Yes — the answer to bad speech is more speech', outcome: 'The liberal tradition\'s answer; it assumes good ideas win, which history only sometimes confirms.' },
                { text: 'Yes, but platforms shape what wins', outcome: 'The structural answer — \'free\' doesn\'t mean flat; the press\'s owners and algorithms decide which speech travels.' },
                { text: 'Freedom without literacy is a weapon, not a right', outcome: 'The education answer — print\'s danger was never print; it was readers who couldn\'t tell pamphlet from paper.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Clearing out the school library, a student says printed books were always just \'slow internet\' — they never changed anything that speeches couldn\'t. The librarian asks him to think about what print made possible for the first time.',
            decisions: [{ prompt: 'What did print actually change that speeches never could?', options: [
                { text: 'Scale and permanence — one speech reaches whoever stands in the crowd and vanishes, but one printed text reaches thousands of strangers identically, survives to be reread, debated and answered. That is how ideas built movements: cheap printed matter created reading publics, spread reform and criticism, and let arguments travel far beyond the speaker\'s voice.', outcome: 'From woodblock editions meant for free distribution to the pamphlet wars of later centuries, print turned private thought into a public force — the effect speeches could never sustain alone.' },
                { text: 'The student is right — print is just speech on paper and changed nothing fundamental.', outcome: 'Print multiplied an idea a thousandfold and froze it in checkable form — creating shared debates and publics that no sequence of speeches could produce.', reveals: 'print-is-just-speech' },
                { text: 'Print mattered only for religion — printing sacred texts for merit — and played no role in political or social change.', outcome: 'Early printing did serve devotion, like the Diamond Sutra distributed freely for merit, but print quickly escaped the temple — pamphlets, books and newspapers reshaped politics and society.', reveals: 'print-was-only-religious' }
            ] }] } },
        { type: 'case', nodeId: 'c10_hist_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Print didn\'t just copy books faster — it created publics, arguments and revolutions. Every protest pamphlet and newspaper you see is Gutenberg\'s echo.',
            decisions: [{ prompt: 'What comes next? Print Culture and the Modern World · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Print Culture and the Modern World · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_001', difficulty: 'standard',
          question: 'Woodblock printing is a technique for reproducing text, images, or patterns.',
          hint: 'If stuck, review Class 9 "Early Chinese Civilisation: Writing and Governance" (paper.',
          misconception: 'Students often believe woodblock printing was invented by Gutenberg in 1450s Europe, or that the *Diamond Sutra* was.',
          parts: [
                { id: 'a', prompt: 'Compare the social purpose of the earliest woodblock prints in China (e.g., *Diamond Sutra*) and Japan (e.g., *Hyakumanto Darani*).', answer: 'Similarity: Both were Buddhist texts produced for religious merit',
                  options: ['Similarity: Both were Buddhist texts produced for religious merit', 'just religious books'],
                  hint: 'If stuck, review Class 9 "Early Chinese Civilisation: Writing and Governance" (paper, script) and.',
                  misconception: 'Students often believe woodblock printing was invented by Gutenberg in 1450s Europe, or that the *Diamond Sutra* was printed with movable.' }
          ],
            remediations: { 'woodblock-printing-was-invented-by': { steps: ['Show a side-by-side image of a Tang woodblock (carved wood) and a Gutenberg metal type piece. Ask: "What material?', 'Use a timeline card sort: place "Paper invented (Han)", "Diamond Sutra printed (868)", "Bi Sheng movable clay type.', 'Read a 2-sentence primary source: Empress Shōtoku\'s edict (764 CE) ordering one million charms printed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe woodblock printing was invented by Gutenberg in 1450s Europe, or that the *Diamond Sutra* was.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Woodblock printing in Tang China was a \'revolution\' comparable to Gutenberg\'s press in 15th-century Europe." Use evidence from the 7th–9th.', answer: 'The claim is overstated',
                  options: ['The claim is overstated', 'yes, it was a revolution', 'no impact'],
                  hint: 'If stuck, review Class 9 "Early Chinese Civilisation: Writing and Governance" (paper, script) and.',
                  misconception: 'Students often believe woodblock printing was invented by Gutenberg in 1450s Europe, or that the *Diamond Sutra* was printed with movable.' }
          ],
            remediations: { 'woodblock-printing-was-invented-by': { steps: ['Show a side-by-side image of a Tang woodblock (carved wood) and a Gutenberg metal type piece. Ask: "What material?', 'Use a timeline card sort: place "Paper invented (Han)", "Diamond Sutra printed (868)", "Bi Sheng movable clay type.', 'Read a 2-sentence primary source: Empress Shōtoku\'s edict (764 CE) ordering one million charms printed.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_002', difficulty: 'standard',
          question: 'The invention of the movable-type printing press by Johannes Gutenberg.',
          hint: 'If stuck, review the "Paper reaches Europe" subsection in c10_hist_cbse_05_001 and the.',
          misconception: 'Students often believe Gutenberg *invented printing* (as if no printing existed before) or that his press *immediately*.',
          parts: [
                { id: 'a', prompt: 'Why was oil-based ink a necessary innovation for Gutenberg\'s metal type, and what problem would water-based ink (used in woodblock printing) have caused?', answer: 'Water-based ink does not adhere well to non-porous metal surfaces',
                  options: ['Water-based ink does not adhere well to non-porous metal surfaces', 'oil-based ink dried faster'],
                  hint: 'If stuck, review the "Paper reaches Europe" subsection in c10_hist_cbse_05_001 and the Silk Route.',
                  misconception: 'Students often believe Gutenberg *invented printing* (as if no printing existed before) or that his press *immediately* made books cheap.' }
          ],
            remediations: { 'gutenberg-invented-printing-as-if': { steps: ['Revisit c10_hist_cbse_05_001 (Chinese woodblock and Korean metal type) and make a two-column table: "What existed.', 'Use the NCERT illustration of the Gutenberg press — label each part (type, ink, paper, screw) and write one sentence.', 'Compare the price of a manuscript (c. 1450) and a printed book (c.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_003', difficulty: 'standard',
          question: 'The Print Revolution refers to the profound societal transformation in Europe.',
          hint: 'Revisit c10_hist_cbse_05_002: focus on the *comparison table* (manuscript vs.',
          misconception: 'Students believe the Print Revolution *instantly* democratized knowledge: "Gutenberg invented the press → suddenly.',
          parts: [
                { id: 'a', prompt: 'What was the *first major book* printed by Gutenberg using movable metal type in Mainz, and in approximately what year was it completed?', answer: 'The Gutenberg Bible (42-line Bible), completed c',
                  options: ['The Gutenberg Bible (42-line Bible), completed c', 'Luther\'s Bible', 'Erasmus\'s New Testament', 'printing moment'],
                  hint: 'Revisit c10_hist_cbse_05_002: focus on the *comparison table* (manuscript vs.',
                  misconception: 'Students believe the Print Revolution *instantly* democratized knowledge: "Gutenberg invented the press → suddenly everyone read books →.' },
                { id: 'b', prompt: 'A historian argues: "The printing press *caused* the Protestant Reformation." Using the distinction between *necessary condition* and *sufficient condition*.', answer: 'The press was a *necessary condition*',
                  options: ['The press was a *necessary condition*', 'press caused Reformation', 'Printing press was the main cause of Reformation', 'dangerous'],
                  hint: 'Revisit c10_hist_cbse_05_002: focus on the *comparison table* (manuscript vs.',
                  misconception: 'Students believe the Print Revolution *instantly* democratized knowledge: "Gutenberg invented the press → suddenly everyone read books →.' }
          ],
            remediations: { 'the-print-revolution-instantly-democratized': { steps: ['Show the student a facsimile of a 1470 *incunabulum* (dense Latin, no pagination, expensive binding) vs.', 'Ask "Who could buy/read each?" — guide them to see *class/language barriers*.', 'Use a map of 1550 European printing centres (Venice, Paris, Basel, Wittenberg) and ask "Why are there gaps?" — lead.', 'Assign a 150-word answer: "Why did it take 150 years for print to raise literacy above 30%?" — forcing them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_004', difficulty: 'standard',
          question: 'The Reading Mania in Europe (c. 17th–19th centuries) refers to the explosive.',
          hint: 'Revisit node 003 "Print Revolution and Its Impact" — specifically the distinction between.',
          misconception: 'Students believe "cheap books = Enlightenment ideas for the masses." In reality, *Bibliothèque Bleue* and chapbooks.',
          parts: [
                { id: 'a', prompt: 'Name the cheap, small booklets sold by pedlars in France that contained folk tales, religious stories, and practical information, printed on poor-quality paper.', answer: '*Bibliothèque Bleue* (Blue Library) booklets',
                  options: ['*Bibliothèque Bleue* (Blue Library) booklets', 'chapbooks', 'penny magazines', 'almanacs'],
                  hint: 'Revisit node 003 "Print Revolution and Its Impact" — specifically the distinction between.',
                  misconception: 'Students believe "cheap books = Enlightenment ideas for the masses." In reality, *Bibliothèque Bleue* and chapbooks sold *Bluebeard*.' },
                { id: 'b', prompt: 'A historian finds a 1760s English chapbook titled *The History of Jack the Giant-Killer* with a woodcut of a giant on the cover.', answer: '(1) Large type and simple vocabulary',
                  options: ['(1) Large type and simple vocabulary', 'woodcuts', 'cheap books = Enlightenment ideas for the masses', 'What did a French peasant likely read in 1750?'],
                  hint: 'Revisit node 003 "Print Revolution and Its Impact" — specifically the distinction between.',
                  misconception: 'Students believe "cheap books = Enlightenment ideas for the masses." In reality, *Bibliothèque Bleue* and chapbooks sold *Bluebeard*.' },
                { id: 'c', prompt: 'Compare the reading practices of aristocratic women in 18th-century French salons with those of working-class women in English industrial towns.', answer: 'Similarity: Both read novels and periodicals',
                  options: ['Similarity: Both read novels and periodicals', 'idle reading', 'working-class women couldn\'t read', 'cheap books = Enlightenment ideas for the masses'],
                  hint: 'Revisit node 003 "Print Revolution and Its Impact" — specifically the distinction between.',
                  misconception: 'Students believe "cheap books = Enlightenment ideas for the masses." In reality, *Bibliothèque Bleue* and chapbooks sold *Bluebeard*.' }
          ],
            remediations: { 'cheap-books-enlightenment-ideas-for': { steps: ['Re-read the NCERT box on "Chapbooks and the *Bibliothèque Bleue*" — list 5 actual titles mentioned (e.g., *The Seven.', 'Compare with a list of Enlightenment titles (Voltaire\'s *Philosophical Letters*, Diderot\'s *Encyclopédie*) — note price.', 'Create a two-column table: "Cheap Print Content" vs. "Enlightenment Content" with 3 examples each.', 'Practice the CBSE question: "Identify the source: a 12-page booklet with a woodcut of a cat wearing boots, sold by.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_005', difficulty: 'standard',
          question: 'Print Culture and the French Revolution: Ideas of Enlightenment refers to the.',
          hint: 'Revisit c10_hist_cbse_05_003 (Print Revolution and Its Impact) and c10_hist_cbse_05_004.',
          misconception: 'Students often believe Enlightenment ideas spread *only* among the elite (philosophes, aristocrats) because books were.',
          parts: [
                { id: 'a', prompt: 'Name any two Enlightenment philosophers whose works were widely printed and read in pre-revolutionary France, and state one key idea each promoted.', answer: 'Correct answer: Voltaire (advocated freedom of speech, religious tolerance, and',
                  options: ['Correct answer: Voltaire (advocated freedom of speech, religious tolerance, and', 'they wanted freedom', 'freedom'],
                  hint: 'Revisit c10_hist_cbse_05_003 (Print Revolution and Its Impact) and c10_hist_cbse_05_004 (Reading.',
                  misconception: 'Students often believe Enlightenment ideas spread *only* among the elite (philosophes, aristocrats) because books were expensive, and that.' },
                { id: 'b', prompt: 'Compare the role of *pamphlets* (like Sieyès\' *What is the Third Estate?*) versus *newspapers* (like Marat\'s *L\'Ami du peuple*) in mobilizing different social.', answer: 'Correct answer: Pamphlets targeted the educated bourgeoisie and nobles with',
                  options: ['Correct answer: Pamphlets targeted the educated bourgeoisie and nobles with', 'just printed papers'],
                  hint: 'Revisit c10_hist_cbse_05_003 (Print Revolution and Its Impact) and c10_hist_cbse_05_004 (Reading.',
                  misconception: 'Students often believe Enlightenment ideas spread *only* among the elite (philosophes, aristocrats) because books were expensive, and that.' }
          ],
            remediations: { 'enlightenment-ideas-spread-only-among': { steps: ['If the student holds this misconception: (1) Show a facsimile of a 1789 *bibliothèque bleue* pamphlet (e.g., *Le.', '(2) Compare the *cahiers de doléances* of the Third Estate (peasants/artisans) with those of the nobility — highlight.', '(3) Ask: "If peasants only cared about bread, why did they write \'liberty\' first in their grievance lists?" This forces.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_006', difficulty: 'standard',
          question: 'Print in India refers to the introduction and development of printing.',
          hint: 'If confused about chronology, revisit c6_history_ch10_040 (East India Company and Battle.',
          misconception: 'Students believe printing in India began with the British (East India Company) in Calcutta around 1780, and that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Print in India refers to the introduction and development of printing technology in the',
                  options: ['Print in India refers to the introduction and development of printing technology in the', 'Woodblock printing is a technique for reproducing text, images, or patterns by carving a', 'The invention of the movable-type printing press by Johannes Gutenberg in Mainz, Germany', 'The Print Revolution refers to the profound societal transformation in Europe (c'],
                  hint: 'If confused about chronology, revisit c6_history_ch10_040 (East India Company and Battle.',
                  misconception: 'Students believe printing in India began with the British (East India Company) in Calcutta around 1780, and that William Carey\'s Serampore.' }
          ],
            remediations: { 'printing-in-india-began-with': { steps: ['Revisit c6_history_ch10_039 (Coming of Europeans) to confirm Portuguese arrival (1498) and Goa as capital (1510).', 'Map the three early presses — Goa 1556 (Jesuit), Tranquebar 1712 (Danish-Halle), Calcutta 1780 (Company) — on.', 'Compare their output: Goa printed *Doutrina Christã* (Konkani, Roman script); Tranquebar printed Tamil New Testament.', 'Write one sentence explaining why the 1556 date matters: "It proves print entered India via Catholic missionaries 224.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
