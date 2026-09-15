import type { SimDef } from '../../engine/types';
import C9_HistoryCivicsGuptaContributionCultureSim from '../../../simulations/c6_12/C9_HistoryCivicsGuptaContributionCultureSim';

/** v3 wrapped master — C9_HistoryCivicsGuptaContributionCultureSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_historycivicsguptacontributionculturesim: SimDef = {
    id: 'v3w_c9_historycivicsguptacontributionculturesim',
    title: 'Gupta Contribution Culture',
    subtitle: 'This node covers the internal transformation of Vedic society from c.',
    classLevel: 9, subject: 'history', topic: 'Vedic Society: Early and Later Vedic Periods',
    chapters: [],
    nodeIds: ['c9_hist_ch3_1', 'c9_hist_ch3_12', 'c9_hist_ch3_5', 'c9_hist_ch3_6', 'c9_hist_ch3_8', 'c9_hist_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are at a village festival in Haryana where priests chant Rigvedic hymns around a fire altar—those.', goal: 'Master Gupta Contribution Culture.' },
    discovery: {
        question: 'Compare the role of the *mahattara* (village headman) in Gupta administration with the *gramika* in Mauryan administration.',
        options: ['The *gramika* was a state-appointed official in a centralized hierarchy', 'both are same', 'mahattara was higher'],
        answer: 'The *gramika* was a state-appointed official in a centralized hierarchy',
        hook: 'Students believe the Gupta "Golden Age" was a period of uniform prosperity and centralized power like the Mauryas,.',
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
        { type: 'scaffold', nodeId: 'c9_hist_ch3_12', title: 'The Gurukula system was a residential.',
          scaffold: { problem: 'Explain how the curriculum of a later Vedic gurukula (c. 800–500 BCE) was structured to produce a Brahmin priest, a Kshatriya ruler, and a.',
            steps: [
            { text: 'Identify the shared foundation — all dvija students began with Vedic memorization (Samhitas) and Vedangas (phonetics,.' },
            { text: 'Trace the divergence — after upanayana, Brahmin students specialized in Brahmanas, Aranyakas, Upanishads, and Shrauta.' },
            { text: 'Identify Kshatriya add-ons — Dhanurveda (archery/martial arts), Arthashastra (statecraft), Niti Shastra (ethics), and.' },
            { text: 'Identify Vaishya add-ons — Varta (agriculture, cattle, trade), Krishi-Parashara (farming), and basic arithmetic for.' },
            { text: 'Evaluate the outcome — this differentiated curriculum ensured each varna internalized its prescribed dharma, making.', faded: true, blankAnswer: 'The gurukula curriculum began with a common Vedic core for.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch3_5', title: 'The Mauryan administration (c. 322–185.',
          scaffold: { problem: 'Explain why the Mauryan Empire needed a separate espionage department (Gudhapurushas) while the Gupta Empire did not, using administrative.',
            steps: [
            { text: 'Identify the Mauryan espionage system from Arthashastra Book I—types of spies (sancharas, gudhapurushas) reporting.' },
            { text: 'Map Mauryan territorial extent (Kandahar to Bengal, Himalayas to Karnataka) and note communication lag—orders took.' },
            { text: 'Contrast with Gupta administration—smaller core territory, decentralized feudatory system (samantas), no evidence of.' },
            { text: 'Analyze the functional need—Mauryas had directly administered provinces with appointed officers prone to corruption;.' },
            { text: 'Conclude that espionage was a structural necessity of Mauryan centralized bureaucracy over vast distances, not a.', faded: true, blankAnswer: 'The Mauryan Empire\'s direct administration of a vast.' }
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
        { type: 'scaffold', nodeId: 'c9_hist_ch3_8', title: 'Kingship and administration in early.',
          scaffold: { problem: '"Explain why Ashoka’s *dhamma-mahamattas* were a unique administrative innovation that had no parallel in Gupta or Chola administration."',
            steps: [
            { text: 'Identify the *purpose* of *dhamma-mahamattas* from Rock Edict V — they were moral auditors ensuring *dhamma* compliance.' },
            { text: 'Contrast with Gupta *kumaramatyas* — who were hereditary civil/military governors managing *bhuktis*, focused on order.' },
            { text: 'Contrast with Chola *variyam* members — elected committee executives handling irrigation/temple accounts, rooted in.' },
            { text: 'Link to legitimacy theory: Ashoka’s *dhamma* was a *universal ethical imperial ideology* requiring a dedicated cadre;.' },
            { text: 'Conclude: *Dhamma-mahamattas* reflect a short-lived "moral bureaucracy" possible only under a *Chakravartin* claiming.', faded: true, blankAnswer: 'Ashoka’s *dhamma-mahamattas* were unique because they.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch3_9', title: 'The Varna-Jati system refers to the.',
          scaffold: { problem: 'A 7th-century Chalukya inscription from Badami records a land grant to a Brahmin donee, listing the following occupants of the donated.',
            steps: [
            { text: 'Identify the textual varna framework—recall the four varnas from *Purusha Sukta* and their hierarchical order (Brahmana.' },
            { text: 'Map each inscribed group to a likely varna: *mahajana* = Brahmana (donees/settlers); *okkulu* = Vaishya/Shudra.' },
            { text: 'Note the spatial segregation—*holeya* hamlet separate from main village—this is material evidence of untouchability.' },
            { text: 'Recognise the state\'s role—the Chalukya king grants land to Brahmins, creating a *brahmadeya* village where varna.' },
            { text: 'Synthesise: the inscription shows varna as the *organising principle* (Brahmin donee at top, *antayaja* at bottom) but.', faded: true, blankAnswer: 'The village reflects a Brahmin-dominated *brahmadeya*.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_hist_ch3_12', title: 'Identify each idea',
          dissect: { specimen: 'Gupta Contribution Culture', spots: [
            { id: 's1', label: 'The Vedic Society spans two', prompt: 'Which idea is this? — The Vedic Society spans two distinct phases: the Early Vedic (Rigvedic) period (c.', answer: 'The Vedic Society spans two', options: ['The Vedic Society spans two', 'The Gurukula system was a', 'The Mauryan administration c 322185', 'The Gupta Empire c 320550'] },
            { id: 's2', label: 'The Gurukula system was a', prompt: 'Which idea is this? — The Gurukula system was a residential mode of education in early India (c.', answer: 'The Gurukula system was a', options: ['The Gurukula system was a', 'The Vedic Society spans two', 'The Mauryan administration c 322185', 'The Gupta Empire c 320550'] },
            { id: 's3', label: 'The Mauryan administration c 322185', prompt: 'Which idea is this? — The Mauryan administration (c. 322–185 BCE) was a highly centralized bureaucratic system.', answer: 'The Mauryan administration c 322185', options: ['The Mauryan administration c 322185', 'The Vedic Society spans two', 'The Gurukula system was a', 'The Gupta Empire c 320550'] },
            { id: 's4', label: 'The Gupta Empire c 320550', prompt: 'Which idea is this? — The Gupta Empire (c. 320–550 CE) was a classical Indian imperial state centered in the.', answer: 'The Gupta Empire c 320550', options: ['The Gupta Empire c 320550', 'The Vedic Society spans two', 'The Gurukula system was a', 'The Mauryan administration c 322185'] },
            { id: 's5', label: 'Kingship and administration in early', prompt: 'Which idea is this? — Kingship and administration in early India (c. 1500 BCE – 1000 CE) refers to the evolving.', answer: 'Kingship and administration in early', options: ['Kingship and administration in early', 'The Vedic Society spans two', 'The Gurukula system was a', 'The Mauryan administration c 322185'] },
            { id: 's6', label: 'The Varna-Jati system refers to', prompt: 'Which idea is this? — The Varna-Jati system refers to the dual-layered social stratification in early India (c.', answer: 'The Varna-Jati system refers to', options: ['The Varna-Jati system refers to', 'The Vedic Society spans two', 'The Gurukula system was a', 'The Mauryan administration c 322185'] }
          ] } }
    ],
    explore: { component: C9_HistoryCivicsGuptaContributionCultureSim, prompt: 'Explore the interactive — Gupta Contribution Culture' },
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
        { type: 'subpart', nodeId: 'c9_hist_ch3_12', difficulty: 'standard',
          question: 'The Gurukula system was a residential mode of education in early India (c.',
          hint: 'Revisit c9_hist_ch3_9 (Social Categories: Varna and Jati System) and review the section.',
          misconception: 'Students often believe the gurukula was an egalitarian \'ancient university\' open to all seekers of knowledge, similar.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Gurukula system was a residential mode of education in early India (c',
                  options: ['The Gurukula system was a residential mode of education in early India (c', 'The Vedic Society spans two distinct phases: the Early Vedic (Rigvedic) period (c', 'The Mauryan administration (c', 'The Gupta Empire (c'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the gurukula was an egalitarian \'ancient university\' open to all seekers of knowledge, similar to modern residential.' }
          ],
            remediations: { 'the-gurukula-was-an-egalitarian': { steps: ['Have the student read Gautama Dharmasutra 1.1.1–5 (translated) listing who may study the Veda.', 'Contrast with Vinaya Pitaka rules for bhikkhu/bhikkhuni ordination (no varna bar).', 'Map the social groups excluded from gurukula but included in vihara.', 'Ask: "If you were a Shudra boy in 500 CE, where could you get educated?" This forces confrontation with the textual.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_5', difficulty: 'standard',
          question: 'The Mauryan administration (c. 322–185 BCE) was a highly centralized.',
          hint: 'Revisit c7_hist_ch02_008 (Arthashastra administration) and c7_hist_ch02_007 (Ashoka\'s.',
          misconception: 'Students believe the Mauryan Empire had a uniform, tightly controlled administration across its vast territory because.',
          parts: [
                { id: 'a', prompt: 'Compare the Mauryan provincial administration (Kumara/Mahamatra) with the Gupta system (Uparika) and Chola system (Mandalam under Nadu).', answer: 'Continuities: (1) Royal princes/governors heading provinces',
                  options: ['Continuities: (1) Royal princes/governors heading provinces', 'all were identical'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Mauryan Empire had a uniform, tightly controlled administration across its vast territory because the Arthashastra.' }
          ],
            remediations: { 'the-mauryan-empire-had-a': { steps: ['Re-read Rock Edict III (Rajukas) and Rock Edict V (Dhamma-mahamatas) alongside Arthashastra Book II (superintendents).', 'Map the four provincial capitals (Taxila, Ujjain, Tosali, Suvarnagiri) and note distance from Pataliputra—calculate.', 'Compare with Gupta inscription (e.g., Allahabad Pillar) showing Uparika and local autonomy.', 'Write a 100-word answer: "Why Arthashastra ≠ Mauryan reality" using three specific contradictions.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Mauryan Empire had a uniform, tightly controlled administration across its vast territory because.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Ashoka\'s Dhamma was merely a personal moral code with no administrative consequences." Use three specific administrative changes from his.', answer: 'Refute',
                  options: ['Refute', 'significance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Mauryan Empire had a uniform, tightly controlled administration across its vast territory because the Arthashastra.' },
                { id: 'b', prompt: 'Compare the Mauryan provincial administration (Kumara/Mahamatra) with the Gupta system (Uparika) and Chola system (Mandalam under Nadu).', answer: 'Continuities: (1) Royal princes/governors heading provinces',
                  options: ['Continuities: (1) Royal princes/governors heading provinces', 'all were identical'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Mauryan Empire had a uniform, tightly controlled administration across its vast territory because the Arthashastra.' }
          ],
            remediations: { 'the-mauryan-empire-had-a': { steps: ['Re-read Rock Edict III (Rajukas) and Rock Edict V (Dhamma-mahamatas) alongside Arthashastra Book II (superintendents).', 'Map the four provincial capitals (Taxila, Ujjain, Tosali, Suvarnagiri) and note distance from Pataliputra—calculate.', 'Compare with Gupta inscription (e.g., Allahabad Pillar) showing Uparika and local autonomy.', 'Write a 100-word answer: "Why Arthashastra ≠ Mauryan reality" using three specific contradictions.'] } } },
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
            remediations: { 'the-gupta-golden-age-was': { steps: ['Re-read the Allahabad Pillar inscription (Samudragupta) and a Gupta land grant (e.g., Damodarpur plates) side-by-side;.', 'Compare with the Arthashastra\'s description of Mauryan village officers (Book II, Ch.', 'Plot the silver-to-gold coin ratio from Chandragupta I to Skandagupta on a graph; correlate debasement with land grant.', 'Write one paragraph: "The same land grants that funded temples also eroded imperial authority because..."'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_8', difficulty: 'standard',
          question: 'Kingship and administration in early India (c. 1500 BCE – 1000 CE) refers to.',
          hint: 'Revisit Mauryan *rajjukas* (c6_history_ch05_010) and Gupta *samanta* land grants.',
          misconception: 'Students often believe that "early Indian administration was highly centralized and bureaucratic like the Mauryan model.',
          parts: [
                { id: 'a', prompt: 'Explain why the Gupta king adopted the title *Maharajadhiraja* ("Great King of Kings") rather than the Mauryan *Chakravartin* ideal, and what this shift.', answer: '*Maharajadhiraja* signals a suzerain-overlord relationship where defeated rulers',
                  options: ['*Maharajadhiraja* signals a suzerain-overlord relationship where defeated rulers', 'Gupta *mahamatras* collected taxes in villages', 'Chola *rajjukas* measured land'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "early Indian administration was highly centralized and bureaucratic like the Mauryan model throughout." This.' },
                { id: 'b', prompt: 'A 9th-century Chola inscription records a *brahmadeya* village granted to Brahmins, with the *sabha* (assembly) managing irrigation, land allocation, and tax.', answer: 'The Chola *sabha* represents corporate, autonomous Brahmin self-governance with',
                  options: ['The Chola *sabha* represents corporate, autonomous Brahmin self-governance with', 'local administration', 'Gupta *mahamatras* collected taxes in villages'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that "early Indian administration was highly centralized and bureaucratic like the Mauryan model throughout." This.' }
          ],
            remediations: { 'early-indian-administration-was-highly': { steps: ['Create a three-column table: **Period | Legitimacy Theory | Key Administrative Officer | Revenue Mechanism**.', 'Identify *which column changes most* between Maurya and Gupta (Revenue Mechanism: state collection → land grant).', 'Read one Gupta land-grant charter (e.g., *Damodarpur plates*) and one Chola temple inscription (e.g., *Thanjavur.', 'Rewrite a 3-sentence explanation: "Unlike the Mauryas, Gupta/Chola kings shared revenue rights with ______, which meant.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_9', difficulty: 'standard',
          question: 'The Varna-Jati system refers to the dual-layered social stratification in early.',
          hint: 'Revisit c9_hist_ch3_1 (Vedic Society) and the *Purusha Sukta* hymn; then read.',
          misconception: 'Students often believe "varna and jati are the same thing" or "varna came first, then jati developed later as a.',
          parts: [
                { id: 'a', prompt: 'A 5th-century CE Gupta-era copper-plate inscription records a land grant to a Brahmin donee, specifying that the village includes "sharecroppers (*ardhikas*),.', answer: '*Ardhikas* and *gopas* are likely Vaishya or Shudra jatis engaged in',
                  options: ['*Ardhikas* and *gopas* are likely Vaishya or Shudra jatis engaged in', 'varna and jati are the same thing', 'varna came first, then jati developed later as a corruption'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "varna and jati are the same thing" or "varna came first, then jati developed later as a corruption." The exact.' }
          ],
            remediations: { 'varna-and-jati-are-the': { steps: ['Re-read the *Purusha Sukta* (Rig Veda 10.90) and list the four varnas with their body-metaphors.', 'Read *Manusmriti* 10.1–10.40 on *varna-sankara*—note how it *generates* dozens of jatis from *only four varnas* by.', 'Compare a Rig Vedic hymn mentioning *dasa* tribes with a 5th-century inscription listing *velalar*, *chetti*,.', 'Write one paragraph: "Varna is the theory; jati is the history. The theory *produced* the history to stay relevant."'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch3_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "varna and jati are the same thing" or "varna came first, then jati developed later as a.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Sanskritization was the only route to upward social mobility in early India." Use evidence from the Satavahana, Gupta, and early medieval.', answer: 'The claim is false',
                  options: ['The claim is false', 'varna and jati are the same thing', 'varna came first, then jati developed later as a corruption', 'broke down'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "varna and jati are the same thing" or "varna came first, then jati developed later as a corruption." The exact.' }
          ],
            remediations: { 'varna-and-jati-are-the': { steps: ['Re-read the *Purusha Sukta* (Rig Veda 10.90) and list the four varnas with their body-metaphors.', 'Read *Manusmriti* 10.1–10.40 on *varna-sankara*—note how it *generates* dozens of jatis from *only four varnas* by.', 'Compare a Rig Vedic hymn mentioning *dasa* tribes with a 5th-century inscription listing *velalar*, *chetti*,.', 'Write one paragraph: "Varna is the theory; jati is the history. The theory *produced* the history to stay relevant."'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
