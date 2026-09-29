import type { SimDef } from '../../engine/types';
import C10_HistoryCivicsRiseDictatorshipsCausesSim from '../../../simulations/c6_12/C10_HistoryCivicsRiseDictatorshipsCausesSim';

/** v3 wrapped master — C10_HistoryCivicsRiseDictatorshipsCausesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_historycivicsrisedictatorshipscausessim: SimDef = {
    id: 'v3w_c10_historycivicsrisedictatorshipscausessim',
    title: 'The Print Revolution and Its Impact on Society',
    subtitle: 'Covers the European Print Revolution (1450s–1600) and its direct societal impacts: spread.',
    classLevel: 10, subject: 'history', topic: 'The Print Revolution and Its Impact on Society',
    chapters: [],
    nodeIds: ['c10_hist_cbse_05_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you see a WhatsApp forward today that changes how thousands think about a law — now ask: how did a.', goal: 'Master The Print Revolution and Its Impact on Society.' },
    discovery: {
        question: 'What was the *first major book* printed by Gutenberg using movable metal type in Mainz, and in approximately what year was it completed?',
        options: ['The Gutenberg Bible (42-line Bible), completed c', 'Luther\'s Bible', 'Erasmus\'s New Testament'],
        answer: 'The Gutenberg Bible (42-line Bible), completed c',
        hook: 'Students believe the Print Revolution *instantly* democratized knowledge: "Gutenberg invented the press → suddenly.',
    },
    teaching: [
        { title: 'The Print Revolution refers to the profound.', text: 'The Print Revolution refers to the profound societal transformation in Europe (c.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_hist_cbse_05_003', title: 'The Print Revolution refers to the.',
          scaffold: { problem: 'Using the concept of "information ecology," explain why Martin Luther\'s German New Testament (1522) spread faster and wider than John.',
            steps: [
            { text: 'Identify the *technological difference* — Wycliffe\'s Bible circulated in hand-copied manuscripts (each copy taking.' },
            { text: 'Identify the *distribution difference* — Manuscripts moved through Church/academic networks (controlled by bishops who.' },
            { text: 'Identify the *reception difference* — Wycliffe\'s readers were tiny Lollard cells (hundreds); Luther\'s print run created.' },
            { text: 'Synthesize the causal chain — Technology (press) → Economics (low unit cost) → Distribution (market not monastery) →.' },
            { text: 'Conclude — Print did not just *reproduce* Luther\'s translation; it *enabled* a new kind of religious politics by.', faded: true, blankAnswer: 'Luther\'s Testament spread faster because movable type.' }
            ] } }
    ],
    explore: { component: C10_HistoryCivicsRiseDictatorshipsCausesSim, prompt: 'Explore the interactive — The Print Revolution and Its Impact on Society' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_003', difficulty: 'standard',
          question: 'The Print Revolution refers to the profound societal transformation in Europe.',
          hint: 'Revisit c10_hist_cbse_05_002: focus on the *comparison table* (manuscript vs.',
          misconception: 'Students believe the Print Revolution *instantly* democratized knowledge: "Gutenberg invented the press → suddenly.',
          parts: [
                { id: 'a', prompt: 'What was the *first major book* printed by Gutenberg using movable metal type in Mainz, and in approximately what year was it completed?', answer: 'The Gutenberg Bible (42-line Bible), completed c',
                  options: ['The Gutenberg Bible (42-line Bible), completed c', 'Luther\'s Bible', 'Erasmus\'s New Testament'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Print Revolution *instantly* democratized knowledge: "Gutenberg invented the press → suddenly everyone read books →.' },
                { id: 'b', prompt: 'A historian argues: "The printing press *caused* the Protestant Reformation." Using the distinction between *necessary condition* and *sufficient condition*,.', answer: 'The press was a *necessary condition*',
                  options: ['The press was a *necessary condition*', 'press caused Reformation', 'Printing press was the main cause of Reformation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Print Revolution *instantly* democratized knowledge: "Gutenberg invented the press → suddenly everyone read books →.' }
          ],
            remediations: { 'the-print-revolution-instantly-democratized': { steps: ['Show the student a facsimile of a 1470 *incunabulum* (dense Latin, no pagination, expensive binding) vs.', 'Ask "Who could buy/read each?" — guide them to see *class/language barriers*.', 'Use a map of 1550 European printing centres (Venice, Paris, Basel, Wittenberg) and ask "Why are there gaps?" — lead to.', 'Assign a 150-word answer: "Why did it take 150 years for print to raise literacy above 30%?" — forcing them to.'] } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_05_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Print Revolution *instantly* democratized knowledge: "Gutenberg invented the press → suddenly.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Print Revolution created a unified European public sphere by 1600." Support your judgment with two pieces of evidence *for* and.', answer: '*For*: (1) Republic of Letters',
                  options: ['*For*: (1) Republic of Letters', 'yes, it united Europe', 'evaluate', 'dangerous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Print Revolution *instantly* democratized knowledge: "Gutenberg invented the press → suddenly everyone read books →.' },
                { id: 'b', prompt: 'Construct a 5-event timeline (with years) showing the causal chain from Gutenberg\'s press to the *Enlightenment* (1680s onward), ensuring each step is a.', answer: 'Example: 1455 Gutenberg Bible → 1517 Luther\'s 95 Theses printed/spread → 1543',
                  options: ['Example: 1455 Gutenberg Bible → 1517 Luther\'s 95 Theses printed/spread → 1543', 'dangerous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Print Revolution *instantly* democratized knowledge: "Gutenberg invented the press → suddenly everyone read books →.' }
          ],
            remediations: { 'the-print-revolution-instantly-democratized': { steps: ['Show the student a facsimile of a 1470 *incunabulum* (dense Latin, no pagination, expensive binding) vs.', 'Ask "Who could buy/read each?" — guide them to see *class/language barriers*.', 'Use a map of 1550 European printing centres (Venice, Paris, Basel, Wittenberg) and ask "Why are there gaps?" — lead to.', 'Assign a 150-word answer: "Why did it take 150 years for print to raise literacy above 30%?" — forcing them to.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
