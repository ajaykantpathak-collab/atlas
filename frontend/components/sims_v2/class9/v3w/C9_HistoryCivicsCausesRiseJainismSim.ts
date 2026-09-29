import type { SimDef } from '../../engine/types';
import C9_HistoryCivicsCausesRiseJainismSim from '../../../simulations/c6_12/C9_HistoryCivicsCausesRiseJainismSim';

/** v3 wrapped master — C9_HistoryCivicsCausesRiseJainismSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_historycivicscausesrisejainismsim: SimDef = {
    id: 'v3w_c9_historycivicscausesrisejainismsim',
    title: 'Vedic Society: Early and Later Vedic Periods',
    subtitle: 'This node covers the internal transformation of Vedic society from c.',
    classLevel: 9, subject: 'history', topic: 'Vedic Society: Early and Later Vedic Periods',
    chapters: [],
    nodeIds: ['c9_hist_ch3_1', 'c9_hist_ch3_2', 'c9_hist_ch3_3', 'c9_hist_ch3_4', 'c9_hist_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are at a village festival in Haryana where priests chant Rigvedic hymns around a fire altar—those.', goal: 'Master Vedic Society: Early and Later Vedic Periods.' },
    discovery: {
        question: 'Name the three political assemblies mentioned in the Rigveda and state one primary function of each in the Early Vedic period.',
        options: ['The three assemblies are Sabha, Samiti, and Vidatha', 'Sabha elected the king', 'upper house'],
        answer: 'The three assemblies are Sabha, Samiti, and Vidatha',
        hook: 'Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic parliament, projecting the.',
    },
    teaching: [
        { title: 'The Vedic Society spans two distinct phases:.', text: 'The Vedic Society spans two distinct phases: the Early Vedic (Rigvedic) period (c.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_hist_ch3_1', title: 'The Vedic Society spans two distinct.',
          scaffold: { problem: 'Using the Rigveda and Later Vedic texts, trace the evolution of the term "rajanya" from Early to Later Vedic period and explain its.',
            steps: [
            { text: 'Identify every occurrence of "rajanya" in the Rigveda (e.g., RV 10.90.12 Purusha Sukta, RV 3.26.6) and note the.' },
            { text: 'Examine Later Vedic texts (Atharvaveda 3.5.7, Shatapatha Brahmana 5.3.1.13) where "rajanya" becomes a synonym for.' },
            { text: 'Correlate with the shift from *rajan* (tribal chief elected by samiti) to *samrat* (emperor performing.' },
            { text: 'Link the change to surplus agriculture: *bali* (voluntary offering) becomes compulsory tax, funding a standing army.' },
            { text: 'Conclude that "rajanya" evolves from a functional role (warrior) to a birth-based status (Kshatriya) because hereditary.', faded: true, blankAnswer: 'In the Early Vedic period, *rajanya* refers to the warrior.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch3_2', title: 'The Sabha, Samiti, and Vidatha were the.',
          scaffold: { problem: 'Using only Rigvedic evidence, reconstruct the decision-making process when a tribe decides to go to war.',
            steps: [
            { text: 'Identify the relevant Rigvedic hymns — RV 1.167 (Samiti), RV 10.173 (Vidatha), RV 8.4 (Sabha) — and isolate verses.' },
            { text: 'Determine the assembly — RV 1.167.3 explicitly links Samiti to "sam gacchati" (coming together) for war; the *rajan*.' },
            { text: 'Establish participation — the *vis* (common tribesmen, warriors) attend; the *purohita* advises; women and.' },
            { text: 'Define the *rajan\'s* role — he is *not* a commander-in-chief with standing authority; he proposes, persuades, and leads.' },
            { text: 'Contrast with Later Vedic — in Brahmanas, the *Senani* (ratnin) commands a standing force; the Samiti is gone.', faded: true, blankAnswer: 'In the Rigveda, the Samiti — comprising the *vis*.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch3_3', title: 'Janapadas and Mahajanapadas were the.',
          scaffold: { problem: 'Create a table classifying eight of the sixteen Mahajanapadas as monarchies or republics, with their approximate location and one key.',
            steps: [
            { text: 'Identify monarchies. Magadha (South Bihar, iron-rich), Kosala (Eastern UP, wealthy), Vatsa (Allahabad region, trade.' },
            { text: 'Identify republics. Vajji (North Bihar, confederation), Malla (Kushinagar region, republic), Koliya (Ramagrama,.' },
            { text: 'Create table with columns: Name | Type | Location | Key feature.' },
            { text: 'Verify classification. Monarchies: single king, hereditary rule.', faded: true, blankAnswer: '| Mahajanapada | Type | Location | Key feature |' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch3_4', title: 'Magadha\'s rise to power and imperial.',
          scaffold: { problem: 'Create a timeline of Magadha\'s expansion showing three dynasties, one key ruler of each, and one major achievement.',
            steps: [
            { text: 'Haryanka dynasty (c. 544-412 BCE). Key ruler: Bimbisara. Achievement: Marriage alliances with Kosala and Vajji;.' },
            { text: 'Shishunaga dynasty (c. 412-344 BCE). Key ruler: Shishunaga. Achievement: Conquered Avanti, eliminating a major rival.' },
            { text: 'Nanda dynasty (c. 344-321 BCE). Key ruler: Mahapadma Nanda. Achievement: Built a massive standing army and extended.' },
            { text: 'Connect to Mauryas. Chandragupta Maurya overthrew the Nandas in 321 BCE and inherited their army, administration, and.', faded: true, blankAnswer: '| Dynasty | Period | Key ruler | Achievement |' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch1_9', title: 'Timeline and chronology in historical.',
          scaffold: { problem: 'A copper-plate inscription from Gujarat is dated "Vikrama Samvat 1200, Phalguna sudi 5." A Persian chronicle says the same ruler died in.',
            steps: [
            { text: 'Identify the epochs and calendar types. Vikrama Samvat (VS) begins 57 BCE (solar/lunisolar); Hijri begins 622 CE.' },
            { text: 'Convert VS 1200 to CE. VS year = CE year + 57 (since VS starts 57 BCE). So 1200 - 57 = 1143 CE.' },
            { text: 'Convert Hijri 570 to CE. Lunar year ≈ 354 days. 570 × 354 / 365.25 ≈ 552 solar years after 622 CE → 1174 CE.' },
            { text: 'Compare. VS date ≈ early 1144 CE; Hijri date ≈ late 1173 CE. A 29-year gap! They do NOT match.' },
            { text: 'Hypothesize reasons. Different rulers? Copyist error in one source? Different events (accession vs. death)?', faded: true, blankAnswer: 'The dates differ by ~29 years (1144 CE vs. 1173 CE). They.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_hist_ch3_2', title: 'Identify each idea',
          dissect: { specimen: 'Vedic Society: Early and Later Vedic Periods', spots: [
            { id: 's1', label: 'The Vedic Society spans two', prompt: 'Which idea is this? — The Vedic Society spans two distinct phases: the Early Vedic (Rigvedic) period (c.', answer: 'The Vedic Society spans two', options: ['The Vedic Society spans two', 'The Sabha Samiti and Vidatha', 'Janapadas and Mahajanapadas were the', 'Magadhas rise to power and'] },
            { id: 's2', label: 'The Sabha Samiti and Vidatha', prompt: 'Which idea is this? — The Sabha, Samiti, and Vidatha were the three principal political assemblies of the.', answer: 'The Sabha Samiti and Vidatha', options: ['The Sabha Samiti and Vidatha', 'The Vedic Society spans two', 'Janapadas and Mahajanapadas were the', 'Magadhas rise to power and'] },
            { id: 's3', label: 'Janapadas and Mahajanapadas were the', prompt: 'Which idea is this? — Janapadas and Mahajanapadas were the territorial states of ancient India (c.', answer: 'Janapadas and Mahajanapadas were the', options: ['Janapadas and Mahajanapadas were the', 'The Vedic Society spans two', 'The Sabha Samiti and Vidatha', 'Magadhas rise to power and'] },
            { id: 's4', label: 'Magadhas rise to power and', prompt: 'Which idea is this? — Magadha\'s rise to power and imperial expansion (c. 600-321 BCE) refers to the process by.', answer: 'Magadhas rise to power and', options: ['Magadhas rise to power and', 'The Vedic Society spans two', 'The Sabha Samiti and Vidatha', 'Janapadas and Mahajanapadas were the'] },
            { id: 's5', label: 'Timeline and chronology in historical', prompt: 'Which idea is this? — Timeline and chronology in historical study refers to the systematic arrangement of past.', answer: 'Timeline and chronology in historical', options: ['Timeline and chronology in historical', 'The Vedic Society spans two', 'The Sabha Samiti and Vidatha', 'Janapadas and Mahajanapadas were the'] }
          ] } }
    ],
    explore: { component: C9_HistoryCivicsCausesRiseJainismSim, prompt: 'Explore the interactive — Vedic Society: Early and Later Vedic Periods' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hist_ch3_1', difficulty: 'standard',
          question: 'The Vedic Society spans two distinct phases: the Early Vedic (Rigvedic) period.',
          hint: 'Revisit c6_history_ch04_006 (Harappan decline) and the concept of "Dark Age" /.',
          misconception: 'Students believe the four varnas (Brahmin, Kshatriya, Vaishya, Shudra) existed as rigid, birth-based castes from the.',
          parts: [
                { id: 'a', prompt: 'Compare the role and status of women in the Early Vedic period (evidence: Rigvedic hymns by female rishis, swayamvara references) with the Later Vedic period.', answer: 'Change 1: Female rishis (Lopamudra, Ghosha) disappear',
                  options: ['Change 1: Female rishis (Lopamudra, Ghosha) disappear', 'women lost status'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the four varnas (Brahmin, Kshatriya, Vaishya, Shudra) existed as rigid, birth-based castes from the Rigveda itself.' }
          ],
            remediations: { 'the-four-varnas-brahmin': { steps: ['Have the student read Rigveda 9.112.3 aloud and identify the three occupations in one family.', 'Compare with *Shatapatha Brahmana* 1.1.4.12 where *shudra* is barred from *upayana*.', 'Plot both passages on a timeline (Early vs Later Vedic) using the internal chronology of the Vedic corpus (mandala 1–9.', 'Ask the student to rewrite their earlier answer distinguishing *varna* as "colour/class" in Early Vedic from *varna* as.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the four varnas (Brahmin, Kshatriya, Vaishya, Shudra) existed as rigid, birth-based castes from the.',
          parts: [
                { id: 'a', prompt: 'Compare the role and status of women in the Early Vedic period (evidence: Rigvedic hymns by female rishis, swayamvara references) with the Later Vedic period.', answer: 'Change 1: Female rishis (Lopamudra, Ghosha) disappear',
                  options: ['Change 1: Female rishis (Lopamudra, Ghosha) disappear', 'women lost status'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the four varnas (Brahmin, Kshatriya, Vaishya, Shudra) existed as rigid, birth-based castes from the Rigveda itself.' }
          ],
            remediations: { 'the-four-varnas-brahmin': { steps: ['Have the student read Rigveda 9.112.3 aloud and identify the three occupations in one family.', 'Compare with *Shatapatha Brahmana* 1.1.4.12 where *shudra* is barred from *upayana*.', 'Plot both passages on a timeline (Early vs Later Vedic) using the internal chronology of the Vedic corpus (mandala 1–9.', 'Ask the student to rewrite their earlier answer distinguishing *varna* as "colour/class" in Early Vedic from *varna* as.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_2', difficulty: 'standard',
          question: 'The Sabha, Samiti, and Vidatha were the three principal political assemblies of.',
          hint: 'Revisit c9_hist_ch3_1: focus on the shift from *go* (cattle) economy to *kshetra* (field).',
          misconception: 'Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic parliament, projecting the.',
          parts: [
                { id: 'a', prompt: 'Name the three political assemblies mentioned in the Rigveda and state one primary function of each in the Early Vedic period.', answer: 'The three assemblies are Sabha, Samiti, and Vidatha',
                  options: ['The three assemblies are Sabha, Samiti, and Vidatha', 'Sabha elected the king', 'upper house'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic parliament, projecting the modern Indian.' },
                { id: 'b', prompt: 'A Later Vedic text describes the *rajan* performing the *Rajasuya* sacrifice with the help of *ratnins* (jewels/officers) including the *Senani*, *Suta*, and.', answer: 'The *ratnins* are institutionalised royal officers replacing the collective',
                  options: ['The *ratnins* are institutionalised royal officers replacing the collective', 'upper house', 'lower house'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic parliament, projecting the modern Indian.' },
                { id: 'c', prompt: 'Compare the Vidatha of the Rigveda with the *gana-sangha* assemblies of the 6th century BCE (e.g., Vajji, Malla).', answer: 'Similarities: both involve collective deliberation beyond a single ruler',
                  options: ['Similarities: both involve collective deliberation beyond a single ruler', 'upper house', 'lower house'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic parliament, projecting the modern Indian.' }
          ],
            remediations: { 'sabha-and-samiti-are-simply': { steps: ['Read Rigveda 1.167 (Samiti) and 8.4 (Sabha) in translation — note who speaks, who decides, what the occasion is.', 'Read Aitareya Brahmana 8.15 (Rajasuya *ratnins*) — map each *ratnin* to a lost assembly function.', 'Create a two-column table: "Early Vedic Assembly Function" vs "Later Vedic Royal Officer" — fill it using the texts.', 'Explain orally to a peer why "parliament" is an anachronism, using the table as evidence.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic parliament, projecting the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the historian\'s claim: "The decline of Sabha and Samiti proves that early Indian polity had no democratic tradition." Use evidence from the Vedic.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'upper house', 'lower house'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic parliament, projecting the modern Indian.' },
                { id: 'b', prompt: 'Construct a timeline (1500 BCE – 500 BCE) showing the evolution of the three assemblies and annotate each turning point with the specific textual evidence.', answer: 'A strong answer places: c.1500–1000 BCE (Rigveda)',
                  options: ['A strong answer places: c.1500–1000 BCE (Rigveda)', 'upper house', 'lower house'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Sabha and Samiti are simply "upper house" and "lower house" of a Vedic parliament, projecting the modern Indian.' }
          ],
            remediations: { 'sabha-and-samiti-are-simply': { steps: ['Read Rigveda 1.167 (Samiti) and 8.4 (Sabha) in translation — note who speaks, who decides, what the occasion is.', 'Read Aitareya Brahmana 8.15 (Rajasuya *ratnins*) — map each *ratnin* to a lost assembly function.', 'Create a two-column table: "Early Vedic Assembly Function" vs "Later Vedic Royal Officer" — fill it using the texts.', 'Explain orally to a peer why "parliament" is an anachronism, using the table as evidence.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_3', difficulty: 'standard',
          question: 'Janapadas and Mahajanapadas were the territorial states of ancient India (c.',
          hint: 'Revisit c9_hist_ch3_1 (Vedic Society) for the tribal background and c9_hist_ch3_2 (Vedic.',
          misconception: 'Students think all Mahajanapadas were monarchies and that ancient India had only kingdoms.',
          parts: [
                { id: 'a', prompt: 'List six of the sixteen Mahajanapadas and classify each as a monarchy or republic.', answer: 'Six Mahajanapadas: (1) Magadha',
                  options: ['Six Mahajanapadas: (1) Magadha', 'all Mahajanapadas were monarchies and that ancient India had only kingdoms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think all Mahajanapadas were monarchies and that ancient India had only kingdoms.' },
                { id: 'b', prompt: 'What three factors drove the formation of Mahajanapadas from earlier tribal organizations?', answer: 'Three factors: (1) Iron tools',
                  options: ['Three factors: (1) Iron tools', 'kings conquered territory', 'all Mahajanapadas were monarchies and that ancient India had only kingdoms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think all Mahajanapadas were monarchies and that ancient India had only kingdoms.' }
          ],
            remediations: { 'all-mahajanapadas-were-monarchies-and': { steps: ['Show a map of the sixteen Mahajanapadas.', 'Color-code: monarchies in one color, republics in another.', 'Ask the student to identify the pattern: where are the republics located?', '(Mainly north of the Ganges.) 4.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think all Mahajanapadas were monarchies and that ancient India had only kingdoms.',
          parts: [
                { id: 'a', prompt: 'Locate four Mahajanapadas on a map of ancient India and describe their geographic significance.', answer: '(1) Magadha — South Bihar, Ganges valley',
                  options: ['(1) Magadha — South Bihar, Ganges valley', 'all Mahajanapadas were monarchies and that ancient India had only kingdoms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think all Mahajanapadas were monarchies and that ancient India had only kingdoms.' },
                { id: 'b', prompt: 'A student claims: "The Mahajanapadas were all kingdoms." Evaluate this statement using evidence from ancient Indian political organization.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'all Mahajanapadas were monarchies and that ancient India had only kingdoms'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think all Mahajanapadas were monarchies and that ancient India had only kingdoms.' }
          ],
            remediations: { 'all-mahajanapadas-were-monarchies-and': { steps: ['Show a map of the sixteen Mahajanapadas.', 'Color-code: monarchies in one color, republics in another.', 'Ask the student to identify the pattern: where are the republics located?', '(Mainly north of the Ganges.) 4.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_4', difficulty: 'standard',
          question: 'Magadha\'s rise to power and imperial expansion (c. 600-321 BCE) refers to the.',
          hint: 'Revisit c9_hist_ch3_3 (Janapadas and Mahajanapadas) to understand the political context,.',
          misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.',
          parts: [
                { id: 'a', prompt: 'Name three geographic advantages that enabled Magadha\'s rise to power.', answer: 'Three advantages: (1) Iron-rich region',
                  options: ['Three advantages: (1) Iron-rich region', 'Magadha had a big army', 'Magadha rose because of a single powerful king or a sudden conquest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.' },
                { id: 'b', prompt: 'List the three dynasties that ruled Magadha before the Mauryas, in chronological order.', answer: 'Three dynasties in order: (1) Haryanka (c',
                  options: ['Three dynasties in order: (1) Haryanka (c', 'Magadha rose because of a single powerful king or a sudden conquest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.' },
                { id: 'c', prompt: 'Describe two political strategies Bimbisara used to expand Magadha\'s power.', answer: 'Strategy 1: Marriage alliances',
                  options: ['Strategy 1: Marriage alliances', 'he fought wars', 'Magadha rose because of a single powerful king or a sudden conquest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.' }
          ],
            remediations: { 'magadha-rose-because-of-a': { steps: ['Show a timeline of Magadha\'s dynasties: Haryanka → Shishunaga → Nanda → Maurya.', 'For each dynasty, list one key achievement (Haryanka: Bimbisara\'s alliances; Shishunaga: expansion; Nanda: army and.', 'Show a map of Magadha\'s expansion from a small kingdom to the Ganges plain.', 'Discuss: "What would have happened without the iron mines?'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.',
          parts: [
                { id: 'a', prompt: 'Why was Pataliputra (modern Patna) chosen as Magadha\'s capital, and what geographic advantages did it offer?', answer: 'Pataliputra was chosen',
                  options: ['Pataliputra was chosen', 'it was a big city', 'Magadha rose because of a single powerful king or a sudden conquest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.' },
                { id: 'b', prompt: 'Explain how the Nandas laid the foundation for the Mauryan Empire. Identify two specific contributions.', answer: 'Contribution 1: Territorial expansion',
                  options: ['Contribution 1: Territorial expansion', 'the Nandas were weak', 'Magadha rose because of a single powerful king or a sudden conquest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.' }
          ],
            remediations: { 'magadha-rose-because-of-a': { steps: ['Show a timeline of Magadha\'s dynasties: Haryanka → Shishunaga → Nanda → Maurya.', 'For each dynasty, list one key achievement (Haryanka: Bimbisara\'s alliances; Shishunaga: expansion; Nanda: army and.', 'Show a map of Magadha\'s expansion from a small kingdom to the Ganges plain.', 'Discuss: "What would have happened without the iron mines?'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_9', difficulty: 'standard',
          question: 'Timeline and chronology in historical study refers to the systematic.',
          hint: 'If stuck, revisit c6_history_ch05_009 (Ashoka\'s edicts and regnal years) and practice:.',
          misconception: 'Students treat a timeline as a mere *list* of dates to memorize, not as an *analytical instrument*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Timeline and chronology in historical study refers to the systematic arrangement of past',
                  options: ['Timeline and chronology in historical study refers to the systematic arrangement of past', 'The Vedic Society spans two distinct phases: the Early Vedic (Rigvedic) period (c', 'The Sabha, Samiti, and Vidatha were the three principal political assemblies of the', 'Janapadas and Mahajanapadas were the territorial states of ancient India (c'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat a timeline as a mere *list* of dates to memorize, not as an *analytical instrument*.' }
          ],
            remediations: { 'students-treat-a-timeline-as': { steps: ['Give the student a blank "multi-track timeline" template with four parallel rows labeled Political, Economic, Social,.', 'Ask them to plot 10 events from 1700–1760 (e.g., Aurangzeb\'s death, Maratha expansion, Bengal famine 1770, East India.', 'Have them draw vertical lines connecting simultaneous events across tracks.', 'Ask: "Which track changes fastest? Which shows continuity? What does this tell you about \'decline\'?" This forces visual.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
