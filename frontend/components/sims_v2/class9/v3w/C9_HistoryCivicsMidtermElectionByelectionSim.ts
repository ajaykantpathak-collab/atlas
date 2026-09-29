import type { SimDef } from '../../engine/types';
import C9_HistoryCivicsMidtermElectionByelectionSim from '../../../simulations/c6_12/C9_HistoryCivicsMidtermElectionByelectionSim';

/** v3 wrapped master — C9_HistoryCivicsMidtermElectionByelectionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_historycivicsmidtermelectionbyelectionsim: SimDef = {
    id: 'v3w_c9_historycivicsmidtermelectionbyelectionsim',
    title: 'Parliamentary vs Presidential Democracy',
    subtitle: 'This node covers the structural comparison between parliamentary and presidential.',
    classLevel: 9, subject: 'history', topic: 'Parliamentary vs Presidential Democracy',
    chapters: [],
    nodeIds: ['c9_civ_ch1_6', 'c9_hist_ch3_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are watching the news: the Indian Prime Minister faces a no-confidence motion in Lok Sabha, while.', goal: 'Master Parliamentary vs Presidential Democracy.' },
    discovery: {
        question: 'Compare the role of the *mahattara* (village headman) in Gupta administration with the *gramika* in Mauryan administration.',
        options: ['The *gramika* was a state-appointed official in a centralized hierarchy', 'both are same', 'mahattara was higher'],
        answer: 'The *gramika* was a state-appointed official in a centralized hierarchy',
        hook: 'Students believe the Gupta "Golden Age" was a period of uniform prosperity and centralized power like the Mauryas,.',
    },
    teaching: [
        { title: 'Parliamentary democracy is a system where.', text: 'Parliamentary democracy is a system where the executive (Prime Minister and Council of Ministers) is drawn from and accountable to the legislature (Parliament), while the head of state (President) is.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_civ_ch1_6', title: 'Parliamentary democracy is a system.',
          scaffold: { problem: 'A Class 9 student reads a news headline: "PM Modi wins vote of confidence in Lok Sabha." Another headline: "President Biden faces.',
            steps: [
            { text: 'Identify the political systems — India follows parliamentary democracy, USA follows presidential democracy.' },
            { text: 'Recall the constitutional basis — In India, Article 75(3) states the Council of Ministers is collectively responsible.' },
            { text: 'Apply the principle of executive origin — The Indian PM is the leader of the majority in Lok Sabha; the US President is.' },
            { text: 'Analyze accountability mechanisms — The Indian government must retain Lok Sabha\'s confidence; a vote of confidence.' },
            { text: 'Conclude — The vote of confidence is a parliamentary accountability tool absent in presidential systems because of.', faded: true, blankAnswer: 'The Indian PM needs a confidence vote because the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch3_6', title: 'The Gupta Empire (c. 320–550 CE) was a.',
          scaffold: { problem: 'Using the Damodarpur copper plates (c. 444 CE) and the Allahabad Pillar inscription (c.',
            steps: [
            { text: 'Identify the two sources — Allahabad Pillar (Samudragupta\'s digvijaya, reinstating defeated kings as tributaries) and.' },
            { text: 'Extract administrative actions — Samudragupta: "capture and release" (grahana-moksha) of kings; Kumaragupta: "grant of.' },
            { text: 'Contextualize chronology — 350 CE: empire expanding, tribute from subordinates; 444 CE: empire consolidated, need to.' },
            { text: 'Link to economic driver — Note Skandagupta\'s debased coins (c.' },
            { text: 'Synthesize the shift — From extracting surplus via military superiority to delegating surplus extraction to local.', faded: true, blankAnswer: 'The Allahabad Pillar shows Samudragupta creating a.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_hist_ch3_6', title: 'Identify each idea',
          dissect: { specimen: 'Parliamentary vs Presidential Democracy', spots: [
            { id: 's1', label: 'Parliamentary democracy is a system', prompt: 'Which idea is this? — Parliamentary democracy is a system where the executive (Prime Minister and Council of.', answer: 'Parliamentary democracy is a system', options: ['Parliamentary democracy is a system', 'The Gupta Empire c 320550'] },
            { id: 's2', label: 'The Gupta Empire c 320550', prompt: 'Which idea is this? — The Gupta Empire (c. 320–550 CE) was a classical Indian imperial state centered in the.', answer: 'The Gupta Empire c 320550', options: ['The Gupta Empire c 320550', 'Parliamentary democracy is a system'] }
          ] } }
    ],
    explore: { component: C9_HistoryCivicsMidtermElectionByelectionSim, prompt: 'Explore the interactive — Parliamentary vs Presidential Democracy' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_civ_ch1_6', difficulty: 'standard',
          question: 'Parliamentary democracy is a system where the executive (Prime Minister and.',
          hint: 'If stuck, revisit Article 74 and 75 of the Indian Constitution and the Class 8 node.',
          misconception: 'Students often think the Indian President is the real executive head like the US President because both are called.',
          parts: [
                { id: 'a', prompt: 'In a hypothetical scenario, the Indian Prime Minister loses a vote of confidence in Lok Sabha.', answer: 'The Indian PM must resign or advise dissolution of Lok Sabha (Article 85)',
                  options: ['The Indian PM must resign or advise dissolution of Lok Sabha (Article 85)', 'President'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Indian President is the real executive head like the US President because both are called "President" and both are.' }
          ],
            remediations: { 'the-indian-president-is-the': { steps: ['Use Article 74(1) text: "There shall be a Council of Ministers with the Prime Minister at the head to aid and advise.', 'Then compare with the US Constitution Article II Section 1: "The executive Power shall be vested in a President." Ask:.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_6', difficulty: 'standard',
          question: 'The Gupta Empire (c. 320–550 CE) was a classical Indian imperial state centered.',
          hint: 'If stuck, revisit the Mauryan administration node (c9_hist_ch3_5) and the Class 7 Gupta.',
          misconception: 'Students believe the Gupta "Golden Age" was a period of uniform prosperity and centralized power like the Mauryas,.',
          parts: [
                { id: 'a', prompt: 'Compare the role of the *mahattara* (village headman) in Gupta administration with the *gramika* in Mauryan administration.', answer: 'The *gramika* was a state-appointed official in a centralized hierarchy',
                  options: ['The *gramika* was a state-appointed official in a centralized hierarchy', 'both are same', 'mahattara was higher'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Gupta "Golden Age" was a period of uniform prosperity and centralized power like the Mauryas, because textbooks.' }
          ],
            remediations: { 'the-gupta-golden-age-was': { steps: ['Re-read the Allahabad Pillar inscription (Samudragupta) and a Gupta land grant (e.g., Damodarpur plates) side-by-side;.', 'Compare with the Arthashastra\'s description of Mauryan village officers (Book II, Ch.', 'Plot the silver-to-gold coin ratio from Chandragupta I to Skandagupta on a graph; correlate debasement with land grant.', 'Write one paragraph: "The same land grants that funded temples also eroded imperial authority because..."'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Gupta "Golden Age" was a period of uniform prosperity and centralized power like the Mauryas,.',
          parts: [
                { id: 'a', prompt: 'Construct a 5-event annotated timeline showing how Gupta administrative choices (land grants, samanta system, declining coinage) created conditions for both.', answer: 'A strong timeline links: (1) c',
                  options: ['A strong timeline links: (1) c', 'Golden Age'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Gupta "Golden Age" was a period of uniform prosperity and centralized power like the Mauryas, because textbooks.' },
                { id: 'b', prompt: 'Compare the role of the *mahattara* (village headman) in Gupta administration with the *gramika* in Mauryan administration.', answer: 'The *gramika* was a state-appointed official in a centralized hierarchy',
                  options: ['The *gramika* was a state-appointed official in a centralized hierarchy', 'both are same', 'mahattara was higher', 'Golden Age'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Gupta "Golden Age" was a period of uniform prosperity and centralized power like the Mauryas, because textbooks.' }
          ],
            remediations: { 'the-gupta-golden-age-was': { steps: ['Re-read the Allahabad Pillar inscription (Samudragupta) and a Gupta land grant (e.g., Damodarpur plates) side-by-side;.', 'Compare with the Arthashastra\'s description of Mauryan village officers (Book II, Ch.', 'Plot the silver-to-gold coin ratio from Chandragupta I to Skandagupta on a graph; correlate debasement with land grant.', 'Write one paragraph: "The same land grants that funded temples also eroded imperial authority because..."'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
