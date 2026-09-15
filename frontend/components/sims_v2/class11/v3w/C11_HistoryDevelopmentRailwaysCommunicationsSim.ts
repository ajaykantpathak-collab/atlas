import type { SimDef } from '../../engine/types';
import C11_HistoryDevelopmentRailwaysCommunicationsSim from '../../../simulations/c6_12/C11_HistoryDevelopmentRailwaysCommunicationsSim';

/** v3 wrapped master — C11_HistoryDevelopmentRailwaysCommunicationsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_historydevelopmentrailwayscommunicationssim: SimDef = {
    id: 'v3w_c11_historydevelopmentrailwayscommunicationssim',
    title: 'Development Railways Communications',
    subtitle: 'Covers Gutenberg\'s invention (1440s), the spread of printing presses across Europe.',
    classLevel: 11, subject: 'history', topic: 'Print Culture: Gutenberg and the Printing Revolution',
    chapters: [],
    nodeIds: ['c11_hist_cbse_07_005', 'c11_hist_cbse_07_004', 'c11_hist_cbse_07_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are a 15th-century merchant in Venice: you need a reliable copy of Aristotle\'s *Politics* for.', goal: 'Master Development Railways Communications.' },
    discovery: {
        question: 'Why did the printing press spread so rapidly across Europe (over 250 cities by 1500) despite high initial capital costs?',
        options: ['The press spread', 'demand for books', 'Gutenberg invented printing'],
        answer: 'The press spread',
        hook: 'Students often think "Gutenberg invented printing" — ignoring that woodblock printing existed in China (8th c.) and.',
    },
    teaching: [
        { title: 'The Printing Revolution refers to the.', text: 'The Printing Revolution refers to the transformative shift in European communication (c.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hist_cbse_07_005', title: 'The Printing Revolution refers to the.',
          scaffold: { problem: 'Explain why the Printing Revolution took off in Europe (1450–1500) but not in Korea, where movable metal type existed since 1234 (Ch\'oe.',
            steps: [
            { text: 'Identify the Korean precedent — Ch\'oe Yun-ŭi\'s metal type (1234), state-sponsored, used for Confucian classics and.' },
            { text: 'Analyze European social structure — fragmented sovereignty (city-states, principalities) meant no single authority.' },
            { text: 'Compare economic models — Korea: state monopoly, no profit motive, limited print runs; Europe: private printers (Fust,.' },
            { text: 'Examine script mechanics — Korean *hangul* (1443) was alphabetic but not yet dominant; Chinese characters (thousands).' },
            { text: 'Evaluate demand drivers — European universities (Bologna, Paris, Oxford) created mass demand for standardized textbooks.', faded: true, blankAnswer: 'The Printing Revolution was not inevitable from the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_07_004', title: 'Renaissance Art (c. 1300–1600 CE).',
          scaffold: { problem: 'Using only the visual evidence in Masaccio\'s *Tribute Money* (Brancacci Chapel, c.',
            steps: [
            { text: 'Identify all orthogonals — the horizontal lines of the building cornices, the mountain ridges, and the gestures of.' },
            { text: 'Trace these lines mentally or on a transparent overlay; they meet at the **head of Christ**, exactly at the horizon.' },
            { text: 'Note that the three episodes are **not separated by frames** but unfold in a continuous landscape unified by this.' },
            { text: 'Analyse the **theological implication**: Christ is the still centre (vanishing point) around which human action (tax,.' },
            { text: 'Contrast with medieval continuous narrative (e.g., Giotto\'s *Legend of St Francis*) where space is compartmentalised;.', faded: true, blankAnswer: 'The vanishing point at Christ\'s head anchors a single,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_07_008', title: 'The Scientific Revolution (c..',
          scaffold: { problem: 'Explain why Copernicus\'s heliocentric model (1543) was not immediately accepted by astronomers, despite its mathematical elegance, using.',
            steps: [
            { text: 'Identify the epistemic criteria of 16th-century astronomy — predictive accuracy for planetary positions (especially.' },
            { text: 'Show Copernicus\'s model used *more* epicycles than Ptolemy\'s for some planets (e.g., Mercury) and offered no better.' },
            { text: 'Explain the physical objection: a moving Earth contradicted Aristotelian physics (heavy objects fall to center; Earth.' },
            { text: 'Note the theological caution: Osiander\'s unauthorized preface presented the model as a computational device.' },
            { text: 'Conclude that acceptance required *new* physics (Galileo\'s inertia) and *new* data (Tycho\'s precision, telescope) —.', faded: true, blankAnswer: 'Copernicus\'s model was mathematically equivalent to.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_hist_cbse_07_004', title: 'Identify each idea',
          dissect: { specimen: 'Development Railways Communications', spots: [
            { id: 's1', label: 'The Printing Revolution refers to', prompt: 'Which idea is this? — The Printing Revolution refers to the transformative shift in European communication (c.', answer: 'The Printing Revolution refers to', options: ['The Printing Revolution refers to', 'Renaissance Art c 13001600 CE', 'The Scientific Revolution c 15431687'] },
            { id: 's2', label: 'Renaissance Art c 13001600 CE', prompt: 'Which idea is this? — Renaissance Art (c. 1300–1600 CE) refers to the radical transformation in European visual.', answer: 'Renaissance Art c 13001600 CE', options: ['Renaissance Art c 13001600 CE', 'The Printing Revolution refers to', 'The Scientific Revolution c 15431687'] },
            { id: 's3', label: 'The Scientific Revolution c 15431687', prompt: 'Which idea is this? — The Scientific Revolution (c. 1543–1687) was a transformative period in European.', answer: 'The Scientific Revolution c 15431687', options: ['The Scientific Revolution c 15431687', 'The Printing Revolution refers to', 'Renaissance Art c 13001600 CE'] }
          ] } }
    ],
    explore: { component: C11_HistoryDevelopmentRailwaysCommunicationsSim, prompt: 'Explore the interactive — Development Railways Communications' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_005', difficulty: 'standard',
          question: 'The Printing Revolution refers to the transformative shift in European.',
          hint: 'If stuck, revisit the "Aldus Manutius" case study (c11_hist_cbse_07_003) — how his.',
          misconception: 'Students often think "Gutenberg invented printing" — ignoring that woodblock printing existed in China (8th c.) and.',
          parts: [
                { id: 'a', prompt: 'Why did the printing press spread so rapidly across Europe (over 250 cities by 1500) despite high initial capital costs?', answer: 'The press spread',
                  options: ['The press spread', 'demand for books', 'Gutenberg invented printing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Gutenberg invented printing" — ignoring that woodblock printing existed in China (8th c.) and movable *ceramic* type.' },
                { id: 'b', prompt: 'A historian argues: "The Printing Revolution caused the Protestant Reformation." Using evidence from 1517–1525, evaluate this claim by distinguishing.', answer: 'Printing was a *necessary but not sufficient* condition',
                  options: ['Printing was a *necessary but not sufficient* condition', 'Gutenberg invented printing', '"Gutenberg invented printing"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Gutenberg invented printing" — ignoring that woodblock printing existed in China (8th c.) and movable *ceramic* type.' }
          ],
            remediations: { 'gutenberg-invented-printing-ignoring-that': { steps: ['Revisit Class 10 node c10_hist_cbse_05_001 (Chinese/Korean printing) to contrast technologies.', 'Use the "Incunabula Map" (ISTC data) to visualize press spread: count cities with presses in 1470 vs.', 'Analyze a primary source: the 1473 *Colophon* of Peter Schoeffer (Gutenberg\'s partner) listing costs — calculate how.', 'Compare two 16th-century title pages: a Latin academic folio vs.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Gutenberg invented printing" — ignoring that woodblock printing existed in China (8th c.) and.',
          parts: [
                { id: 'a', prompt: 'Assess the argument that the Printing Revolution created the first "European public sphere" by 1600. What evidence supports or challenges this?', answer: 'Supported: printed pamphlets, newsbooks (e.g., *Relation aller Fürnemmen und',
                  options: ['Supported: printed pamphlets, newsbooks (e.g., *Relation aller Fürnemmen und', 'democratization of knowledge', 'Gutenberg invented printing', '"Gutenberg invented printing"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Gutenberg invented printing" — ignoring that woodblock printing existed in China (8th c.) and movable *ceramic* type.' }
          ],
            remediations: { 'gutenberg-invented-printing-ignoring-that': { steps: ['Revisit Class 10 node c10_hist_cbse_05_001 (Chinese/Korean printing) to contrast technologies.', 'Use the "Incunabula Map" (ISTC data) to visualize press spread: count cities with presses in 1470 vs.', 'Analyze a primary source: the 1473 *Colophon* of Peter Schoeffer (Gutenberg\'s partner) listing costs — calculate how.', 'Compare two 16th-century title pages: a Latin academic folio vs.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_004', difficulty: 'standard',
          question: 'Renaissance Art (c. 1300–1600 CE) refers to the radical transformation in.',
          hint: 'Revisit **c11_hist_cbse_07_002 (Humanism)** — focus on Pico della Mirandola\'s *Oration on.',
          misconception: '**Students believe "Renaissance realism" means "painting exactly what the eye sees like a photograph."** In reality,.',
          parts: [
                { id: 'a', prompt: 'Identify the Florentine architect who conducted the famous baptistery experiment (c.', answer: '**Filippo Brunelleschi.**',
                  options: ['**Filippo Brunelleschi.**', 'Renaissance realism', 'painting exactly what the eye sees like a photograph'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students believe "Renaissance realism" means "painting exactly what the eye sees like a photograph."** In reality, Renaissance artists.' }
          ],
            remediations: { 'students-believe-renaissance-realism-means': { steps: ['**Show the "two-eye" problem**: Have students close one eye, hold a thumb up, then switch eyes — the thumb jumps.', 'Explain: *Perspective assumes a Cyclopean, stationary eye.* 2.', '**Compare Michelangelo\'s *David* (1504) with a 3D scan of a real man**: Measure the hand-to-body ratio.', 'Discuss why the artist *chose* distortion.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students believe "Renaissance realism" means "painting exactly what the eye sees like a photograph."** In reality,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The artist\'s rise to genius status was primarily due to the invention of perspective." Argue for or against using evidence from patronage,.', answer: '**Against.** Perspective was a *necessary but insufficient* condition',
                  options: ['**Against.** Perspective was a *necessary but insufficient* condition', 'Renaissance realism', 'painting exactly what the eye sees like a photograph'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students believe "Renaissance realism" means "painting exactly what the eye sees like a photograph."** In reality, Renaissance artists.' },
                { id: 'b', prompt: 'Construct a 4-panel visual timeline (described in words) showing the **progression from symbolic to optical realism** in the depiction of the human body from.', answer: '**Panel 1 (c',
                  options: ['**Panel 1 (c', 'Renaissance realism', 'painting exactly what the eye sees like a photograph'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students believe "Renaissance realism" means "painting exactly what the eye sees like a photograph."** In reality, Renaissance artists.' }
          ],
            remediations: { 'students-believe-renaissance-realism-means': { steps: ['**Show the "two-eye" problem**: Have students close one eye, hold a thumb up, then switch eyes — the thumb jumps.', 'Explain: *Perspective assumes a Cyclopean, stationary eye.* 2.', '**Compare Michelangelo\'s *David* (1504) with a 3D scan of a real man**: Measure the hand-to-body ratio.', 'Discuss why the artist *chose* distortion.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_008', difficulty: 'standard',
          question: 'The Scientific Revolution (c. 1543–1687) was a transformative period in.',
          hint: 'Revisit the Ptolemaic system (epicycles, deferents, equants) and Aristotle\'s four causes.',
          misconception: 'Students believe Galileo "proved" the Earth moves by dropping objects from the Leaning Tower of Pisa or by inventing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Scientific Revolution (c',
                  options: ['The Scientific Revolution (c', 'The Printing Revolution refers to the transformative shift in European communication (c', 'Renaissance Art (c'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Galileo "proved" the Earth moves by dropping objects from the Leaning Tower of Pisa or by inventing the telescope.' }
          ],
            remediations: { 'galileo-proved-the-earth-moves': { steps: ['Have the student read Galileo\'s actual inclined plane description in *Two New Sciences* (Day 1) — note he measures.', 'Compare Lippershey\'s 1608 patent application with Galileo\'s 1609 improvements (magnification from 3x to 30x).', 'Plot the stellar parallax problem on a diagram — show why even Tycho\'s precise naked-eye observations (±1 arcminute).', 'Ask: "What *would* have constituted proof in 1632?" This rebuilds the epistemic standards of the period.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_07_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe Galileo "proved" the Earth moves by dropping objects from the Leaning Tower of Pisa or by inventing.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Scientific Revolution was primarily a conflict between science and religion." Use the cases of Copernicus, Galileo, and Newton to.', answer: 'The claim is an oversimplification',
                  options: ['The claim is an oversimplification', 'conflict thesis', 'proved'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Galileo "proved" the Earth moves by dropping objects from the Leaning Tower of Pisa or by inventing the telescope.' }
          ],
            remediations: { 'galileo-proved-the-earth-moves': { steps: ['Have the student read Galileo\'s actual inclined plane description in *Two New Sciences* (Day 1) — note he measures.', 'Compare Lippershey\'s 1608 patent application with Galileo\'s 1609 improvements (magnification from 3x to 30x).', 'Plot the stellar parallax problem on a diagram — show why even Tycho\'s precise naked-eye observations (±1 arcminute).', 'Ask: "What *would* have constituted proof in 1632?" This rebuilds the epistemic standards of the period.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
