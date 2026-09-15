import type { SimDef } from '../../engine/types';
import C11_HistoryEmpireThreeContinentsSim from '../../../simulations/c6_12/C11_HistoryEmpireThreeContinentsSim';

/** v3 wrapped master — C11_HistoryEmpireThreeContinentsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_historyempirethreecontinentssim: SimDef = {
    id: 'v3w_c11_historyempirethreecontinentssim',
    title: 'Empire Three Continents',
    subtitle: 'Covers the Mediterranean as a geographical determinant of Roman imperial expansion and.',
    classLevel: 11, subject: 'history', topic: 'The Mediterranean Sea and Roman Expansion',
    chapters: [],
    nodeIds: ['c11_hist_cbse_02_002', 'c11_hist_cbse_02_008', 'c11_hist_cbse_02_001', 'c11_hist_cbse_02_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are standing at Marina Beach in Chennai watching ships wait for the monsoon winds to change.', goal: 'Master Empire Three Continents.' },
    discovery: {
        question: 'Name the three continents spanned by the Roman Empire at its peak and the two major rivers that formed its northern frontier.',
        options: ['The Roman Empire spanned Europe, Africa, and Asia', 'in all directions equally', 'Rome conquered up to the Urals'],
        answer: 'The Roman Empire spanned Europe, Africa, and Asia',
        hook: 'Students often think the Roman Empire expanded "in all directions equally" like a spreading ink blot.',
    },
    teaching: [
        { title: 'The Mediterranean Sea served as the central.', text: 'The Mediterranean Sea served as the central geographical and economic artery of the Roman Empire (c.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hist_cbse_02_002', title: 'The Mediterranean Sea served as the.',
          scaffold: { problem: 'Using only the NCERT map (p. 39) and the amphorae evidence (pp.',
            steps: [
            { text: 'Identify the *Mediterranean coastline* on the map — note it forms a continuous Roman shore from Spain to Syria (p.' },
            { text: 'Locate the Euphrates — it flows *into* the Persian Gulf, not the Mediterranean.' },
            { text: 'Check amphorae evidence — Dressel 20 (Spanish oil) and African amphorae dominate *western* Mediterranean; Eastern.' },
            { text: 'Apply transport physics — Euphrates is a *river*, not a sea. River transport (barges) costs 5x sea transport.' },
            { text: 'Contrast with Atlantic — the Strait of Gibraltar is a *Mediterranean chokepoint* (14 km wide).' },
            { text: 'Synthesise — Rome expanded *along* its maritime network (coastal cabotage).', faded: true, blankAnswer: 'The Euphrates was the *end of the Mediterranean.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_02_008', title: 'The Late Roman Empire (c. 284–476 CE).',
          scaffold: { problem: 'Using the NCERT text and timeline, explain why Diocletian\'s Tetrarchy failed to provide stable succession despite its elaborate design, and.',
            steps: [
            { text: 'Identify the Tetrarchy\'s succession mechanism — two Augusti retire after 20 years, two Caesares promoted, new Caesares.' },
            { text: 'Trace the actual sequence — Diocletian and Maximian retired in 305 CE, but Constantius Chlorus (Caesar in West) died in.' },
            { text: 'Analyse the structural flaw — the system ignored dynastic loyalty of armies.' },
            { text: 'Compare Constantine\'s solution — he defeated all rivals (Maxentius 312, Licinius 324), established hereditary.' },
            { text: 'Evaluate the outcome — Constantine\'s dynasty lasted until 363 CE (Julian\'s death), longer than the Tetrarchy (305-313.', faded: true, blankAnswer: 'The Tetrarchy failed because its succession mechanism.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_02_001', title: 'The Roman Empire (27 BCE – 476 CE in.',
          scaffold: { problem: 'Using the NCERT timeline (p. 35-36) and map (p. 39), explain why the Roman Empire expanded into Britain (43 CE) and Dacia (101-106 CE) but.',
            steps: [
            { text: 'Identify the resource profile of each target region — Britain had tin, silver, grain; Dacia had gold mines; Germany had.' },
            { text: 'Map each region\'s distance from Mediterranean navigable network — Britain: short Channel crossing; Dacia: Danube.' },
            { text: 'Calculate "administrative cost per unit revenue" — Britain/Dacia: high-value minerals justify garrison costs;.' },
            { text: 'Check for peer rivals — Germany: no state opponent but terrain favors defenders; Arabia: Parthian/Sasanian Iran blocks.' },
            { text: 'Synthesize — Expansion followed *resource corridors accessible by water* with *positive net revenue*; stopped at.', faded: true, blankAnswer: 'Rome conquered Britain (tin/silver/grain via Channel) and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_hist_cbse_02_003', title: 'The Principate (27 BCE – 284 CE) was.',
          scaffold: { problem: 'Using the NCERT text, explain how Augustus solved the problem of army loyalty that had caused civil wars under the Republic.',
            steps: [
            { text: 'Identify the Republican problem — generals like Marius, Sulla, Pompey, Caesar used private armies loyal to them, not.' },
            { text: 'Find Augustus\'s solution in the text — he created a professional standing army with 25-year service, paid by the state.' },
            { text: 'Note the key detail — soldiers swore sacramentum (oath) to Augustus personally, not to the Senate or Roman people.' },
            { text: 'See the result — army became a permanent institution separate from politics; generals could no longer raise private.' },
            { text: 'Evaluate significance — this ended the cycle of civil war for two centuries (except 69 CE), but made emperors dependent.', faded: true, blankAnswer: 'Augustus replaced the Republic\'s militia system.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_hist_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'Empire Three Continents', spots: [
            { id: 's1', label: 'The Mediterranean Sea served as', prompt: 'Which idea is this? — The Mediterranean Sea served as the central geographical and economic artery of the Roman.', answer: 'The Mediterranean Sea served as', options: ['The Mediterranean Sea served as', 'The Late Roman Empire c', 'The Roman Empire 27 BCE', 'The Principate 27 BCE'] },
            { id: 's2', label: 'The Late Roman Empire c', prompt: 'Which idea is this? — The Late Roman Empire (c. 284–476 CE) marks the transition from the Principate to the.', answer: 'The Late Roman Empire c', options: ['The Late Roman Empire c', 'The Mediterranean Sea served as', 'The Roman Empire 27 BCE', 'The Principate 27 BCE'] },
            { id: 's3', label: 'The Roman Empire 27 BCE', prompt: 'Which idea is this? — The Roman Empire (27 BCE – 476 CE in the west; 1453 CE in the east) was a.', answer: 'The Roman Empire 27 BCE', options: ['The Roman Empire 27 BCE', 'The Mediterranean Sea served as', 'The Late Roman Empire c', 'The Principate 27 BCE'] },
            { id: 's4', label: 'The Principate 27 BCE', prompt: 'Which idea is this? — The Principate (27 BCE – 284 CE) was the political system established by Augustus.', answer: 'The Principate 27 BCE', options: ['The Principate 27 BCE', 'The Mediterranean Sea served as', 'The Late Roman Empire c', 'The Roman Empire 27 BCE'] }
          ] } }
    ],
    explore: { component: C11_HistoryEmpireThreeContinentsSim, prompt: 'Explore the interactive — Empire Three Continents' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_002', difficulty: 'standard',
          question: 'The Mediterranean Sea served as the central geographical and economic artery of.',
          hint: 'Revisit Class 10 "Pre-Modern World" (c10_hist_cbse_03_001) section on "cost of transport".',
          misconception: 'Students conflate "Mediterranean trade" with "long-distance luxury trade" (silk, spices, pepper) and assume Roman ships.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Mediterranean Sea served as the central geographical and economic artery of the Roman',
                  options: ['The Mediterranean Sea served as the central geographical and economic artery of the Roman', 'The Late Roman Empire (c', 'The Roman Empire (27 BCE – 476 CE in the west', 'The Principate (27 BCE – 284 CE) was the political system established by Augustus'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students conflate "Mediterranean trade" with "long-distance luxury trade" (silk, spices, pepper) and assume Roman ships sailed directly.' }
          ],
            remediations: { 'students-conflate-mediterranean-trade-with': { steps: ['**Map exercise**: Plot 20 major Roman ports from the NCERT map (p.', '39) and measure inter-port distances — all under 200 km.', '**Amphorae typology**: Match Dressel 1 (Italian wine), Dressel 20 (Spanish oil), African 1A/2A (Tunisian oil) to.', '**Wind rose comparison**: Draw Mediterranean etesian wind rose vs.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_008', difficulty: 'standard',
          question: 'The Late Roman Empire (c. 284–476 CE) marks the transition from the Principate.',
          hint: 'Review the "Third-Century Crisis" section in NCERT (pp. 43-44) and the table of.',
          misconception: 'Students believe Constantine made Christianity the *official state religion* in 312 CE after his vision at the Milvian.',
          parts: [
                { id: 'a', prompt: 'Analyse the economic reasoning behind Constantine\'s introduction of the solidus (4.5g pure gold coin) when the silver denarius had collapsed.', answer: 'The denarius collapsed',
                  options: ['The denarius collapsed', 'gold being more valuable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe Constantine made Christianity the *official state religion* in 312 CE after his vision at the Milvian Bridge.' }
          ],
            remediations: { 'constantine-made-christianity-the-official': { steps: ['Create a two-column table — "Constantine\'s Actions (312–337)" vs "Theodosius\'s Actions (379–395)" — listing specific.', 'Mark each as "toleration," "patronage," "doctrinal definition," or "coercion."', 'Identify which emperor first banned pagan sacrifice (Theodosius, 391).', 'Read the NCERT paragraph on "Late Antiquity" (p. 52) noting the phrase "gradual and complex process" and "polytheism.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_001', difficulty: 'standard',
          question: 'The Roman Empire (27 BCE – 476 CE in the west; 1453 CE in the east) was a.',
          hint: 'Revisit Class 7 "Gangetic Plains and Growth of Mahajanapadas" (c7_hist_ch01_004) — the.',
          misconception: 'Students often think the Roman Empire expanded "in all directions equally" like a spreading ink blot.',
          parts: [
                { id: 'a', prompt: 'Name the three continents spanned by the Roman Empire at its peak and the two major rivers that formed its northern frontier.', answer: 'The Roman Empire spanned Europe, Africa, and Asia',
                  options: ['The Roman Empire spanned Europe, Africa, and Asia', 'in all directions equally', 'Rome conquered up to the Urals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Roman Empire expanded "in all directions equally" like a spreading ink blot.' },
                { id: 'b', prompt: 'Analyze why the Roman Empire stopped expanding after the early 2nd century CE despite having a professional army of 600,000.', answer: 'The Rhine-Danube line marked the ecological limit of Mediterranean agriculture',
                  options: ['The Rhine-Danube line marked the ecological limit of Mediterranean agriculture', 'the army got weak', 'in all directions equally'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Roman Empire expanded "in all directions equally" like a spreading ink blot.' }
          ],
            remediations: { 'the-roman-empire-expanded-in': { steps: ['39 (Map 1: Europe and North Africa).', 'Trace the Mediterranean coastline with your finger — note every major city (Carthage, Alexandria, Antioch, Rome) is a.', 'Draw the 200mm rainfall isohyet mentally — that\'s the olive/wine line.', 'The empire stops *exactly* where it ends.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Roman Empire expanded "in all directions equally" like a spreading ink blot.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Principate (27 BCE – 284 CE) was a monarchy disguised as a republic." Support your judgment with two pieces of institutional evidence.', answer: 'The claim is *largely accurate but incomplete*',
                  options: ['The claim is *largely accurate but incomplete*', 'in all directions equally', 'Rome conquered up to the Urals', 'the Roman Empire expanded "in all directions equally" like a spreading ink blot'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Roman Empire expanded "in all directions equally" like a spreading ink blot.' },
                { id: 'b', prompt: 'Analyze why the Roman Empire stopped expanding after the early 2nd century CE despite having a professional army of 600,000.', answer: 'The Rhine-Danube line marked the ecological limit of Mediterranean agriculture',
                  options: ['The Rhine-Danube line marked the ecological limit of Mediterranean agriculture', 'the army got weak', 'in all directions equally', 'Rome conquered up to the Urals'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Roman Empire expanded "in all directions equally" like a spreading ink blot.' }
          ],
            remediations: { 'the-roman-empire-expanded-in': { steps: ['39 (Map 1: Europe and North Africa).', 'Trace the Mediterranean coastline with your finger — note every major city (Carthage, Alexandria, Antioch, Rome) is a.', 'Draw the 200mm rainfall isohyet mentally — that\'s the olive/wine line.', 'The empire stops *exactly* where it ends.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_003', difficulty: 'standard',
          question: 'The Principate (27 BCE – 284 CE) was the political system established by.',
          hint: 'Review the fall of the Roman Republic: Caesar\'s dictatorship (44 BCE), the Second.',
          misconception: 'Students think Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator; in reality, he carefully.',
          parts: [
                { id: 'a', prompt: 'What title did Octavian take in 27 BCE and what did it mean literally?', answer: 'Octavian took the title Augustus (\'revered one\') and Princeps (\'first citizen\')',
                  options: ['Octavian took the title Augustus (\'revered one\') and Princeps (\'first citizen\')', 'Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator; in reality, he carefully avoided royal titles,.' },
                { id: 'b', prompt: 'Why did Augustus pretend to \'restore the Republic\' instead of declaring himself king or dictator?', answer: 'Romans had a deep cultural hatred for \'rex\' (king)',
                  options: ['Romans had a deep cultural hatred for \'rex\' (king)', 'Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator; in reality, he carefully avoided royal titles,.' },
                { id: 'c', prompt: 'If you were a Roman senator in 27 BCE, would you support Augustus? Use two pieces of evidence from the NCERT text to justify your position.', answer: 'Yes, most senators did support him',
                  options: ['Yes, most senators did support him', 'Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator; in reality, he carefully avoided royal titles,.' }
          ],
            remediations: { 'augustus-became-emperor-in-27': { steps: ['Have students create a two-column table: Column A = Republican institutions Augustus kept (consuls, Senate, elections,.', 'Then ask: "If Column A still existed, why was the Republic dead?" This reveals the distinction between form and.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_02_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator; in reality, he carefully.',
          parts: [
                { id: 'a', prompt: 'Was the Principate a genuine restoration of the Republic or a disguised monarchy? Defend with three specific pieces of evidence from the NCERT.', answer: 'Disguised monarchy',
                  options: ['Disguised monarchy', 'Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator; in reality, he carefully avoided royal titles,.' },
                { id: 'b', prompt: 'Create a timeline with 5 turning points from Caesar\'s dictatorship (44 BCE) to Augustus\'s death (14 CE), labeling each as \'Republican form\' or \'Monarchical.', answer: 'Good answer: 44 BCE',
                  options: ['Good answer: 44 BCE', 'Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think Augustus became \'emperor\' in 27 BCE by declaring himself king or dictator; in reality, he carefully avoided royal titles,.' }
          ],
            remediations: { 'augustus-became-emperor-in-27': { steps: ['Have students create a two-column table: Column A = Republican institutions Augustus kept (consuls, Senate, elections,.', 'Then ask: "If Column A still existed, why was the Republic dead?" This reveals the distinction between form and.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
