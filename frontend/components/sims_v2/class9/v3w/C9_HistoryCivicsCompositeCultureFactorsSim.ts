import type { SimDef } from '../../engine/types';
import C9_HistoryCivicsCompositeCultureFactorsSim from '../../../simulations/c6_12/C9_HistoryCivicsCompositeCultureFactorsSim';

/** v3 wrapped master — C9_HistoryCivicsCompositeCultureFactorsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_historycivicscompositeculturefactorssim: SimDef = {
    id: 'v3w_c9_historycivicscompositeculturefactorssim',
    title: 'Composite Culture Factors',
    subtitle: 'This node covers the internal transformation of Vedic society from c.',
    classLevel: 9, subject: 'history', topic: 'Vedic Society: Early and Later Vedic Periods',
    chapters: [],
    nodeIds: ['c9_hist_ch3_1', 'c9_hist_ch3_3', 'c9_hist_ch3_4', 'c9_hist_ch2_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are at a village festival in Haryana where priests chant Rigvedic hymns around a fire altar—those.', goal: 'Master Composite Culture Factors.' },
    discovery: {
        question: 'What three factors drove the formation of Mahajanapadas from earlier tribal organizations?',
        options: ['Three factors: (1) Iron tools', 'kings conquered territory', 'all Mahajanapadas were monarchies and that ancient India had only kingdoms'],
        answer: 'Three factors: (1) Iron tools',
        hook: 'Students think all Mahajanapadas were monarchies and that ancient India had only kingdoms.',
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
        { type: 'scaffold', nodeId: 'c9_hist_ch2_4', title: 'The Mesolithic Period (c. 10,000–6,000.',
          scaffold: { problem: 'Explain how the shift from Palaeolithic core tools to Mesolithic microliths reflects human adaptation to the Holocene environment in.',
            steps: [
            { text: 'Identify the environmental shift: End of Pleistocene (c. 11,700 BP) brought warmer, wetter conditions; grasslands.' },
            { text: 'Analyze the subsistence challenge: Large game disappeared; new prey — small, solitary, fast animals (deer, boar,.' },
            { text: 'Evaluate the Palaeolithic toolkit: Heavy handaxes/cleavers and large flakes were inefficient for forest hunting — high.' },
            { text: 'Explain the microlithic solution: Geometric microliths (lunates, triangles) mass-produced from small cores; hafted in.' },
            { text: 'Synthesize the adaptation: This technology allowed mobile bands to exploit diverse forest resources (broad-spectrum.', faded: true, blankAnswer: 'The microlithic shift was an adaptive response to forest.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_hist_ch3_3', title: 'Identify each idea',
          dissect: { specimen: 'Composite Culture Factors', spots: [
            { id: 's1', label: 'The Vedic Society spans two', prompt: 'Which idea is this? — The Vedic Society spans two distinct phases: the Early Vedic (Rigvedic) period (c.', answer: 'The Vedic Society spans two', options: ['The Vedic Society spans two', 'Janapadas and Mahajanapadas were the', 'Magadhas rise to power and', 'The Mesolithic Period c 100006000'] },
            { id: 's2', label: 'Janapadas and Mahajanapadas were the', prompt: 'Which idea is this? — Janapadas and Mahajanapadas were the territorial states of ancient India (c.', answer: 'Janapadas and Mahajanapadas were the', options: ['Janapadas and Mahajanapadas were the', 'The Vedic Society spans two', 'Magadhas rise to power and', 'The Mesolithic Period c 100006000'] },
            { id: 's3', label: 'Magadhas rise to power and', prompt: 'Which idea is this? — Magadha\'s rise to power and imperial expansion (c. 600-321 BCE) refers to the process by.', answer: 'Magadhas rise to power and', options: ['Magadhas rise to power and', 'The Vedic Society spans two', 'Janapadas and Mahajanapadas were the', 'The Mesolithic Period c 100006000'] },
            { id: 's4', label: 'The Mesolithic Period c 100006000', prompt: 'Which idea is this? — The Mesolithic Period (c. 10,000–6,000 BCE) in the Indian subcontinent marks the.', answer: 'The Mesolithic Period c 100006000', options: ['The Mesolithic Period c 100006000', 'The Vedic Society spans two', 'Janapadas and Mahajanapadas were the', 'Magadhas rise to power and'] }
          ] } }
    ],
    explore: { component: C9_HistoryCivicsCompositeCultureFactorsSim, prompt: 'Explore the interactive — Composite Culture Factors' },
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
        { type: 'subpart', nodeId: 'c9_hist_ch2_4', difficulty: 'standard',
          question: 'The Mesolithic Period (c. 10,000–6,000 BCE) in the Indian subcontinent marks.',
          hint: 'If stuck, re-read the Palaeolithic node (c9_hist_ch2_3) focusing on tool types and.',
          misconception: 'Students often think **"Mesolithic = just smaller Palaeolithic tools"** and miss the revolutionary shift to **composite.',
          parts: [
                { id: 'a', prompt: 'What is the approximate time range of the Mesolithic period in the Indian subcontinent, and what is the defining tool type of this period?', answer: 'The Mesolithic in India dates roughly from 10,000 to 6,000 BCE and is defined by',
                  options: ['The Mesolithic in India dates roughly from 10,000 to 6,000 BCE and is defined by', '2 million years ago', 'handaxes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"Mesolithic = just smaller Palaeolithic tools"** and miss the revolutionary shift to **composite tool technology**.' },
                { id: 'b', prompt: 'An archaeologist finds a Mesolithic site with numerous geometric microliths, faunal remains of wild cattle (Bos namadicus) showing size reduction, and charcoal.', answer: 'The evidence indicates a **broad-spectrum economy**: microliths (especially',
                  options: ['The evidence indicates a **broad-spectrum economy**: microliths (especially', 'hunting and gathering', 'Mesolithic = just smaller Palaeolithic tools'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"Mesolithic = just smaller Palaeolithic tools"** and miss the revolutionary shift to **composite tool technology**.' }
          ],
            remediations: { 'mesolithic-just-smaller-palaeolithic-tools': { steps: ['**Revisit c9_hist_ch2_3 (Palaeolithic)** and list the specific limitations of core tools (heavy, non-replaceable, high.', '**Use a physical analogy**: Compare a disposable razor cartridge (microlith) vs.', 'a solid metal knife (Palaeolithic point) — which is easier to maintain and carry?', '**Map exercise**: Plot Bagor, Adamgarh, Langhnaj, Bhimbetka on an outline map of India; note their eco-zones (Aravalli.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **"Mesolithic = just smaller Palaeolithic tools"** and miss the revolutionary shift to **composite.',
          parts: [
                { id: 'a', prompt: 'Some historians argue that the Indian Mesolithic represents a "cul-de-sac" of intensified foraging, while others see it as the "necessary precursor" to the.', answer: 'The **"necessary precursor" view is better supported**',
                  options: ['The **"necessary precursor" view is better supported**', 'Mesolithic people were just hunter-gatherers', 'Mesolithic = just smaller Palaeolithic tools'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"Mesolithic = just smaller Palaeolithic tools"** and miss the revolutionary shift to **composite tool technology**.' },
                { id: 'b', prompt: 'Construct a labeled diagram or flowchart showing the causal chain from **Late Pleistocene climate change** to **Neolithic agriculture** in the Indian.', answer: 'A strong answer will show a chain like: 1',
                  options: ['A strong answer will show a chain like: 1', 'Mesolithic = just smaller Palaeolithic tools'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **"Mesolithic = just smaller Palaeolithic tools"** and miss the revolutionary shift to **composite tool technology**.' }
          ],
            remediations: { 'mesolithic-just-smaller-palaeolithic-tools': { steps: ['**Revisit c9_hist_ch2_3 (Palaeolithic)** and list the specific limitations of core tools (heavy, non-replaceable, high.', '**Use a physical analogy**: Compare a disposable razor cartridge (microlith) vs.', 'a solid metal knife (Palaeolithic point) — which is easier to maintain and carry?', '**Map exercise**: Plot Bagor, Adamgarh, Langhnaj, Bhimbetka on an outline map of India; note their eco-zones (Aravalli.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
