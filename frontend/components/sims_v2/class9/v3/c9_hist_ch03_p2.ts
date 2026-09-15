import type { SimDef } from '../../engine/types';

/** v3 generated — c9_hist_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_hist_ch03_p2: SimDef = {
    id: 'v3_c9_hist_ch03_p2',
    title: 'State and Society up to 1000 CE · Part 2/2',
    subtitle: 'How iron ploughs built kingdoms',
    classLevel: 9, subject: 'history', topic: 'State and Society up to 1000 CE · Part 2/2',
    chapters: ['c9_hist_ch03'],
    nodeIds: ['c9_hist_ch3_4', 'c9_hist_ch3_5', 'c9_hist_ch3_6', 'c9_hist_ch3_7', 'c9_hist_ch3_8', 'c9_hist_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a chronicler of the Vedic transition', intro: 'The people who sang the Rigveda herded cattle in Punjab; their grandchildren ruled farmed kingdoms in the Ganga valley. Trace what iron axes, ploughshares and surplus grain did to an entire society.', goal: 'Compare Early and Later Vedic society — pastoral Punjab to agricultural Ganga doab — and explain how iron technology and surplus drove the rise of janapadas and rigid varna.' },
    discovery: {
        question: 'A Rigvedic verse has one family where the father is a physician, the mother grinds corn and the son is a poet. If rigid caste was always the rule, how is this family possible?',
        options: ['Early Vedic varna was fluid and occupation-based — the hard birth-based four-caste cage only crystallised later, in the Later Vedic period', 'The verse must be mistranslated', 'Caste rules applied only to strangers', 'Poets were exempt from everything'],
        answer: 'Early Vedic varna was fluid and occupation-based — the hard birth-based four-caste cage only crystallised later, in the Later Vedic period',
        hook: 'One technology rewired a whole society: iron axes cleared the Ganga\'s dense forests, iron ploughs raised surpluses, and surplus funded kings, priests and standing armies. Cattle-herding tribes of the Punjab became territorial kingdoms almost by accident of metallurgy.',
    },
    teaching: [
        { title: 'Magadha: Rise to Power and Imperial Expansion', text: 'Magadha\'s rise to power and imperial expansion (c. 600-321 BCE) refers to the process by which the Mahajanapada of Magadha (modern South Bihar) became the dominant state of ancient India through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_hist_ch3_4', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Track the thousand-year transformation: pastoral clans of Sapta Sindhu composing hymns around fire altars → iron-equipped farmers in the Ganga doab → janapada kingdoms with taxes and rigid varna. Then ask why women\'s ritual roles shrank as priestly power grew.',
        labels: ['Magadha: Rise to Power', 'Mauryan Empire: Chandragupta', 'Gupta Empire: Administration', 'Chola Dynasty: Administration', 'Kingship and Administration', 'Social Categories: Varna'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_hist_ch3_4', title: 'Magadha: Rise to Power and Imperial Expansion',
          caseStudy: { intro: 'Imagine you are Bimbisara, king of Magadha in 540 BCE. You rule a small but strategically located kingdom in South Bihar — your land has iron mines, your.',
            decisions: [{ prompt: 'Name three geographic advantages that enabled Magadha\'s rise to power.', options: [
                { text: 'Three advantages: (1) Iron-rich region', outcome: 'Three advantages: (1) Iron-rich region — Magadha\'s iron mines provided weapons and agricultural.' },
                { text: 'Magadha had a big army', outcome: 'Not quite — Students think Magadha rose because of a single powerful king or a sudden conquest.', reveals: 'magadha-rose-because-of-a' },
                { text: 'Magadha rose because of a single powerful king or a sudden conquest', outcome: 'Not quite — Students think Magadha rose because of a single powerful king or a sudden conquest.', reveals: 'magadha-rose-because-of-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_5', title: 'Mauryan Empire: Chandragupta and Ashoka\'s Administration',
          caseStudy: { intro: 'Imagine you\'re standing at the Sanchi Stupa gate, reading Ashoka\'s edicts carved in Brahmi script—how did one emperor\'s orders reach village headmen 1,500.',
            decisions: [{ prompt: 'Name the five major administrative divisions of the Mauryan Empire from center to village level, and identify the key officer at each level.', options: [
                { text: 'Center: King assisted by Mantriparishad and officers like Samaharta (revenue collector)', outcome: 'Center: King assisted by Mantriparishad and officers like Samaharta (revenue collector) and.' },
                { text: 'governors', outcome: 'Not quite — Students believe the Mauryan Empire had a uniform, tightly controlled administration across its.', reveals: 'the-mauryan-empire-had-a' },
                { text: 'only "governors" or confusing Pradeshika with Rajuka', outcome: 'Not quite — Students believe the Mauryan Empire had a uniform, tightly controlled administration across its.', reveals: 'the-mauryan-empire-had-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_6', title: 'Gupta Empire: Administration and Golden Age',
          caseStudy: { intro: 'Imagine you\'re visiting the Dashavatara Temple at Deogarh (Uttar Pradesh) — one of the earliest surviving Hindu stone temples.',
            decisions: [{ prompt: 'Name the Gupta ruler who performed the Ashvamedha sacrifice and what title he adopted, as recorded in the Allahabad Pillar inscription.', options: [
                { text: 'Samudragupta performed the Ashvamedha and adopted the title "Maharajadhiraja" (King of', outcome: 'Samudragupta performed the Ashvamedha and adopted the title "Maharajadhiraja" (King of Kings).' },
                { text: 'Chakravartin', outcome: 'Not quite — Students believe the Gupta "Golden Age" was a period of uniform prosperity and centralized power.', reveals: 'the-gupta-golden-age-was' },
                { text: 'Golden Age', outcome: 'Not quite — Students believe the Gupta "Golden Age" was a period of uniform prosperity and centralized power.', reveals: 'the-gupta-golden-age-was' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_7', title: 'Chola Dynasty: Administration and Naval Power',
          caseStudy: { intro: 'Imagine you are a farmer in the Kaveri delta in 1000 CE, during the reign of Rajaraja Chola I.',
            decisions: [{ prompt: 'Name three features of Chola administration that distinguished it from other medieval Indian states.', options: [
                { text: 'Three features: (1) Local self-government', outcome: 'Three features: (1) Local self-government — villages managed affairs through assemblies (ur for.' },
                { text: 'they had a king', outcome: 'Not quite — Students think the Cholas were a regional Tamil kingdom with no broader significance.', reveals: 'the-cholas-were-a-regional' },
                { text: 'the Cholas were a regional Tamil kingdom with no broader significance', outcome: 'Not quite — Students think the Cholas were a regional Tamil kingdom with no broader significance.', reveals: 'the-cholas-were-a-regional' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_8', title: 'Kingship and Administration in Early India',
          caseStudy: { intro: 'Imagine you are standing at the Brihadisvara Temple in Thanjavur, built by Rajaraja Chola I around 1010 CE.',
            decisions: [{ prompt: 'What is the term used in the *Arthashastra* for the superintendent of the treasury, and which Mauryan emperor is traditionally associated.', options: [
                { text: 'The term is *sannidhata* (or *sannidhatri*), and it is associated with Chandragupta', outcome: 'The term is *sannidhata* (or *sannidhatri*), and it is associated with Chandragupta Maurya under.' },
                { text: 'Gupta *mahamatras* collected taxes in villages', outcome: 'Not quite — Students often believe that "early Indian administration was highly centralized and bureaucratic.', reveals: 'early-indian-administration-was-highly' },
                { text: 'Chola *rajjukas* measured land', outcome: 'Not quite — Students often believe that "early Indian administration was highly centralized and bureaucratic.', reveals: 'early-indian-administration-was-highly' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_9', title: 'Social Categories: Varna and Jati System',
          caseStudy: { intro: 'Imagine you are visiting a 9th-century temple in Tamil Nadu built by the Cholas.',
            decisions: [{ prompt: 'What are the four varnas mentioned in the *Purusha Sukta* (Rig Veda 10.90), and which part of the cosmic being is each said to have.', options: [
                { text: 'The four varnas are Brahmana (mouth), Kshatriya (arms), Vaishya (thighs), and Shudra', outcome: 'The four varnas are Brahmana (mouth), Kshatriya (arms), Vaishya (thighs), and Shudra (feet).' },
                { text: 'untouchables', outcome: 'Not quite — Students often believe "varna and jati are the same thing" or "varna came first, then jati.', reveals: 'varna-and-jati-are-the' },
                { text: 'varna and jati are the same thing', outcome: 'Not quite — Students often believe "varna and jati are the same thing" or "varna came first, then jati.', reveals: 'varna-and-jati-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_4', title: 'Use it in the wild',
          caseStudy: { intro: 'A quiz question asks what changed between the Rigvedic and Later Vedic periods. A contestant answers: \'Nothing much — same people, same rigid four-caste system from day one, just new addresses.\'',
            decisions: [{ prompt: 'What did the transition actually involve?', options: [
                { text: 'A society remade: eastward migration from the Punjab to the Ganga doab, iron axes and ploughshares turning forest into farmland, surplus funding chiefs who became territorial kings — and varna hardening from a fluid occupational order into birth-based hierarchy. Even the Rigveda\'s caste verse is a late hymn, not day-one reality.', outcome: 'This traces the real causal chain — iron → surplus → janapadas → stratification — instead of projecting a later rigidity backward.' },
                { text: 'The contestant is right — the Purusha Sukta is in the Rigveda, so the rigid caste order existed from the start.', outcome: 'The Purusha Sukta belongs to the late tenth mandala; earlier hymns show occupational fluidity — the poet\'s father a physician, his mother grinding corn.', reveals: 'caste-was-always-fixed' },
                { text: 'The only real change was religious — bigger sacrifices for bigger gods; economy and society stayed pastoral.', outcome: 'Ritual elaboration rode on a material shift: cattle camps became ploughed villages, and tribal janas became taxed territorial kingdoms.', reveals: 'only-religion-changed' }
            ] }] } },
        { type: 'case', nodeId: 'c9_hist_ch3_9', title: 'You made it',
          caseStudy: { intro: 'From jana (tribe) to janapada (territory) is the story of iron + surplus: cleared forests became fields, fields fed chiefs and priests, and flexible social ranks hardened into birth-based varna.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hist_ch3_4', difficulty: 'standard',
          question: 'Magadha\'s rise to power and imperial expansion (c. 600-321 BCE) refers to the.',
          hint: 'Revisit c9_hist_ch3_3 (Janapadas and Mahajanapadas) to understand the political context.',
          misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.',
          parts: [
                { id: 'a', prompt: 'Name three geographic advantages that enabled Magadha\'s rise to power.', answer: 'Three advantages: (1) Iron-rich region',
                  options: ['Three advantages: (1) Iron-rich region', 'Magadha had a big army', 'Magadha rose because of a single powerful king or a sudden conquest'],
                  hint: 'Revisit c9_hist_ch3_3 (Janapadas and Mahajanapadas) to understand the political context, and.',
                  misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.' },
                { id: 'b', prompt: 'List the three dynasties that ruled Magadha before the Mauryas, in chronological order.', answer: 'Three dynasties in order: (1) Haryanka (c',
                  options: ['Three dynasties in order: (1) Haryanka (c', 'Magadha rose because of a single powerful king or a sudden conquest'],
                  hint: 'Revisit c9_hist_ch3_3 (Janapadas and Mahajanapadas) to understand the political context, and.',
                  misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.' },
                { id: 'c', prompt: 'Describe two political strategies Bimbisara used to expand Magadha\'s power.', answer: 'Strategy 1: Marriage alliances',
                  options: ['Strategy 1: Marriage alliances', 'he fought wars', 'Magadha rose because of a single powerful king or a sudden conquest'],
                  hint: 'Revisit c9_hist_ch3_3 (Janapadas and Mahajanapadas) to understand the political context, and.',
                  misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.' }
          ],
            remediations: { 'magadha-rose-because-of-a': { steps: ['Show a timeline of Magadha\'s dynasties: Haryanka → Shishunaga → Nanda → Maurya.', 'For each dynasty, list one key achievement (Haryanka: Bimbisara\'s alliances; Shishunaga: expansion; Nanda: army and.', 'Show a map of Magadha\'s expansion from a small kingdom to the Ganges plain.', 'Discuss: "What would have happened without the iron mines?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.',
          parts: [
                { id: 'a', prompt: 'Why was Pataliputra (modern Patna) chosen as Magadha\'s capital, and what geographic advantages did it offer?', answer: 'Pataliputra was chosen',
                  options: ['Pataliputra was chosen', 'it was a big city', 'Magadha rose because of a single powerful king or a sudden conquest'],
                  hint: 'Revisit c9_hist_ch3_3 (Janapadas and Mahajanapadas) to understand the political context, and.',
                  misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.' },
                { id: 'b', prompt: 'Explain how the Nandas laid the foundation for the Mauryan Empire. Identify two specific contributions.', answer: 'Contribution 1: Territorial expansion',
                  options: ['Contribution 1: Territorial expansion', 'the Nandas were weak', 'Magadha rose because of a single powerful king or a sudden conquest'],
                  hint: 'Revisit c9_hist_ch3_3 (Janapadas and Mahajanapadas) to understand the political context, and.',
                  misconception: 'Students think Magadha rose because of a single powerful king or a sudden conquest.' }
          ],
            remediations: { 'magadha-rose-because-of-a': { steps: ['Show a timeline of Magadha\'s dynasties: Haryanka → Shishunaga → Nanda → Maurya.', 'For each dynasty, list one key achievement (Haryanka: Bimbisara\'s alliances; Shishunaga: expansion; Nanda: army and.', 'Show a map of Magadha\'s expansion from a small kingdom to the Ganges plain.', 'Discuss: "What would have happened without the iron mines?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_5', difficulty: 'standard',
          question: 'The Mauryan administration (c. 322–185 BCE) was a highly centralized.',
          hint: 'Revisit c7_hist_ch02_008 (Arthashastra administration) and c7_hist_ch02_007 (Ashoka\'s.',
          misconception: 'Students believe the Mauryan Empire had a uniform, tightly controlled administration across its vast territory because.',
          parts: [
                { id: 'a', prompt: 'Compare the Mauryan provincial administration (Kumara/Mahamatra) with the Gupta system (Uparika) and Chola system (Mandalam under Nadu).', answer: 'Continuities: (1) Royal princes/governors heading provinces',
                  options: ['Continuities: (1) Royal princes/governors heading provinces', 'all were identical'],
                  hint: 'Revisit c7_hist_ch02_008 (Arthashastra administration) and c7_hist_ch02_007 (Ashoka\'s edicts).',
                  misconception: 'Students believe the Mauryan Empire had a uniform, tightly controlled administration across its vast territory because the Arthashastra.' }
          ],
            remediations: { 'the-mauryan-empire-had-a': { steps: ['Re-read Rock Edict III (Rajukas) and Rock Edict V (Dhamma-mahamatas) alongside Arthashastra Book II (superintendents).', 'Map the four provincial capitals (Taxila, Ujjain, Tosali, Suvarnagiri) and note distance from Pataliputra—calculate.', 'Compare with Gupta inscription (e.g., Allahabad Pillar) showing Uparika and local autonomy.', 'Write a 100-word answer: "Why Arthashastra ≠ Mauryan reality" using three specific contradictions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_6', difficulty: 'standard',
          question: 'The Gupta Empire (c. 320–550 CE) was a classical Indian imperial state centered.',
          hint: 'If stuck, revisit the Mauryan administration node (c9_hist_ch3_5) and the Class 7 Gupta.',
          misconception: 'Students believe the Gupta "Golden Age" was a period of uniform prosperity and centralized power like the Mauryas.',
          parts: [
                { id: 'a', prompt: 'Compare the role of the *mahattara* (village headman) in Gupta administration with the *gramika* in Mauryan administration.', answer: 'The *gramika* was a state-appointed official in a centralized hierarchy',
                  options: ['The *gramika* was a state-appointed official in a centralized hierarchy', 'both are same', 'mahattara was higher', 'Golden Age'],
                  hint: 'If stuck, revisit the Mauryan administration node (c9_hist_ch3_5) and the Class 7 Gupta economy.',
                  misconception: 'Students believe the Gupta "Golden Age" was a period of uniform prosperity and centralized power like the Mauryas, because textbooks.' }
          ],
            remediations: { 'the-gupta-golden-age-was': { steps: ['Re-read the Allahabad Pillar inscription (Samudragupta) and a Gupta land grant (e.g., Damodarpur plates) side-by-side.', 'Compare with the Arthashastra\'s description of Mauryan village officers (Book II, Ch.', 'Plot the silver-to-gold coin ratio from Chandragupta I to Skandagupta on a graph; correlate debasement with land grant.', 'Write one paragraph: "The same land grants that funded temples also eroded imperial authority because..."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_7', difficulty: 'standard',
          question: 'The Chola Dynasty (c. 850-1279 CE) was a South Indian imperial power centered.',
          hint: 'Revisit c9_hist_ch3_3 (Mahajanapadas) for the northern context and c9_geo_ch1_5.',
          misconception: 'Students think the Cholas were a regional Tamil kingdom with no broader significance.',
          parts: [
                { id: 'a', prompt: 'Name three features of Chola administration that distinguished it from other medieval Indian states.', answer: 'Three features: (1) Local self-government',
                  options: ['Three features: (1) Local self-government', 'they had a king', 'the Cholas were a regional Tamil kingdom with no broader significance'],
                  hint: 'Revisit c9_hist_ch3_3 (Mahajanapadas) for the northern context and c9_geo_ch1_5 (Geography) for the.',
                  misconception: 'Students think the Cholas were a regional Tamil kingdom with no broader significance.' },
                { id: 'b', prompt: 'Explain the role of temples in Chola governance. How were temples more than places of worship?', answer: 'Chola temples were administrative centers, not just places of worship',
                  options: ['Chola temples were administrative centers, not just places of worship', 'temples were for prayer', 'the Cholas were a regional Tamil kingdom with no broader significance'],
                  hint: 'Revisit c9_hist_ch3_3 (Mahajanapadas) for the northern context and c9_geo_ch1_5 (Geography) for the.',
                  misconception: 'Students think the Cholas were a regional Tamil kingdom with no broader significance.' },
                { id: 'c', prompt: 'Describe the structure of local government in the Chola empire. What were the ur, sabha, and nadu?', answer: 'Ur: Village assembly of non-Brahmin landholders that managed local affairs',
                  options: ['Ur: Village assembly of non-Brahmin landholders that managed local affairs', 'the king decided everything', 'the Cholas were a regional Tamil kingdom with no broader significance'],
                  hint: 'Revisit c9_hist_ch3_3 (Mahajanapadas) for the northern context and c9_geo_ch1_5 (Geography) for the.',
                  misconception: 'Students think the Cholas were a regional Tamil kingdom with no broader significance.' }
          ],
            remediations: { 'the-cholas-were-a-regional': { steps: ['Show a map of the Chola empire — Tamil Nadu, Sri Lanka, Maldives, Srivijaya expedition route.', 'Ask: "How did a South Indian kingdom control territory across the sea?" (Navy — unique to Cholas.) 3.', 'Show the Uttiramerur inscriptions describing local assembly elections.', 'Discuss: "How is Chola local government different from Magadha\'s centralized rule?" (Decentralized vs.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_8', difficulty: 'standard',
          question: 'Kingship and administration in early India (c. 1500 BCE – 1000 CE) refers.',
          hint: 'Revisit Mauryan *rajjukas* (c6_history_ch05_010) and Gupta *samanta* land grants.',
          misconception: 'Students often believe that "early Indian administration was highly centralized and bureaucratic like the Mauryan model.',
          parts: [
                { id: 'a', prompt: 'Explain why the Gupta king adopted the title *Maharajadhiraja* ("Great King of Kings") rather than the Mauryan *Chakravartin* ideal, and what this shift.', answer: '*Maharajadhiraja* signals a suzerain-overlord relationship where defeated rulers',
                  options: ['*Maharajadhiraja* signals a suzerain-overlord relationship where defeated rulers', 'Gupta *mahamatras* collected taxes in villages', 'Chola *rajjukas* measured land'],
                  hint: 'Revisit Mauryan *rajjukas* (c6_history_ch05_010) and Gupta *samanta* land grants (c7_hist_ch04_004).',
                  misconception: 'Students often believe that "early Indian administration was highly centralized and bureaucratic like the Mauryan model throughout." This.' },
                { id: 'b', prompt: 'A 9th-century Chola inscription records a *brahmadeya* village granted to Brahmins, with the *sabha* (assembly) managing irrigation, land allocation, and tax.', answer: 'The Chola *sabha* represents corporate, autonomous Brahmin self-governance with',
                  options: ['The Chola *sabha* represents corporate, autonomous Brahmin self-governance with', 'local administration', 'Gupta *mahamatras* collected taxes in villages', 'Chola *rajjukas* measured land'],
                  hint: 'Revisit Mauryan *rajjukas* (c6_history_ch05_010) and Gupta *samanta* land grants (c7_hist_ch04_004).',
                  misconception: 'Students often believe that "early Indian administration was highly centralized and bureaucratic like the Mauryan model throughout." This.' }
          ],
            remediations: { 'early-indian-administration-was-highly': { steps: ['Create a three-column table: **Period | Legitimacy Theory | Key Administrative Officer | Revenue Mechanism**.', 'Identify *which column changes most* between Maurya and Gupta (Revenue Mechanism: state collection → land grant).', 'Read one Gupta land-grant charter (e.g., *Damodarpur plates*) and one Chola temple inscription (e.g., *Thanjavur.', 'Rewrite a 3-sentence explanation: "Unlike the Mauryas, Gupta/Chola kings shared revenue rights with ______, which meant.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_9', difficulty: 'standard',
          question: 'The Varna-Jati system refers to the dual-layered social stratification in early.',
          hint: 'Revisit c9_hist_ch3_1 (Vedic Society) and the *Purusha Sukta* hymn; then read.',
          misconception: 'Students often believe "varna and jati are the same thing" or "varna came first, then jati developed later as.',
          parts: [
                { id: 'a', prompt: 'A 5th-century CE Gupta-era copper-plate inscription records a land grant to a Brahmin donee, specifying that the village includes "sharecroppers (*ardhikas*).', answer: '*Ardhikas* and *gopas* are likely Vaishya or Shudra jatis engaged in',
                  options: ['*Ardhikas* and *gopas* are likely Vaishya or Shudra jatis engaged in', 'varna and jati are the same thing', 'varna came first, then jati developed later as a corruption', 'broke down'],
                  hint: 'Revisit c9_hist_ch3_1 (Vedic Society) and the *Purusha Sukta* hymn; then read *Manusmriti* Chapter.',
                  misconception: 'Students often believe "varna and jati are the same thing" or "varna came first, then jati developed later as a corruption." The exact.' }
          ],
            remediations: { 'varna-and-jati-are-the': { steps: ['Re-read the *Purusha Sukta* (Rig Veda 10.90) and list the four varnas with their body-metaphors.', 'Read *Manusmriti* 10.1–10.40 on *varna-sankara*—note how it *generates* dozens of jatis from *only four varnas*.', 'Compare a Rig Vedic hymn mentioning *dasa* tribes with a 5th-century inscription listing *velalar*, *chetti*.', 'Write one paragraph: "Varna is the theory; jati is the history. The theory *produced* the history to stay relevant."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
