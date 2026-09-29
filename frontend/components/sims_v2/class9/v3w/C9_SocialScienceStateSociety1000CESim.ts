import type { SimDef } from '../../engine/types';
import C9_SocialScienceStateSociety1000CESim from '../../../simulations/c6_12/C9_SocialScienceStateSociety1000CESim';

/** v3 wrapped master — C9_SocialScienceStateSociety1000CESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_socialsciencestatesociety1000cesim: SimDef = {
    id: 'v3w_c9_socialsciencestatesociety1000cesim',
    title: 'Governance and Society: Interconnection of Politics and People',
    subtitle: 'This node covers the conceptual framework linking governance and society across Indian.',
    classLevel: 9, subject: 'science', topic: 'Governance and Society: Interconnection of Politics and People',
    chapters: [],
    nodeIds: ['c9_hist_ch1_8', 'c9_hist_ch2_10', 'c9_hist_ch3_1', 'c9_eco_ch1_1', 'c9_eco_ch1_2', 'c9_hist_ch1_1', 'c9_hist_ch1_10', 'c9_hist_ch1_2', 'c9_hist_ch1_3', 'c9_hist_ch1_5', 'c9_hist_ch1_6', 'c9_hist_ch3_12', 'c9_hist_ch3_3', 'c9_hist_ch3_4', 'c9_hist_ch3_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are visiting the Qutb Minar complex in Delhi. You see the Iron Pillar (Gupta period), the.', goal: 'Master Governance and Society: Interconnection of Politics and People.' },
    discovery: {
        question: 'Why did Alauddin Khalji\'s market control regulations (fixing grain prices, regulating merchants) provoke resistance not only from traders but also from rural.',
        options: ['Price ceilings forced peasants to sell at below-market rates to', 'trader greed', 'governance affects society'],
        answer: 'Price ceilings forced peasants to sell at below-market rates to',
        hook: 'Students often think "governance affects society" is a one-way top-down process: the state makes laws, society obeys.',
    },
    teaching: [
        { title: 'Governance and society represent a.', text: 'Governance and society represent a dialectical relationship where political structures (state apparatus, laws, administration, power distribution) shape social organisation (caste, class, gender,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_hist_ch1_8', title: 'Governance and society represent a.',
          scaffold: { problem: 'Explain how the Mughal *zabt* system under Akbar restructured the relationship between the state, zamindars, and peasants in the Gangetic.',
            steps: [
            { text: 'Identify the core components of *zabt* — standardised measurement (*bigha*), crop-specific productivity classification.' },
            { text: 'Trace the impact on zamindars — their customary shares were recorded but state demand bypassed them to the cultivator,.' },
            { text: 'Analyse peasant experience — cash compulsion forced market engagement (selling surplus), monetised village economy, and.' },
            { text: 'Examine state capacity — *zabt* required a bureaucracy (amils, qanungos, patwaris) creating a new service class loyal.' },
            { text: 'Evaluate the negotiated outcome — zamindars retained *nankar* (tax-free) lands and judicial functions; peasants used.', faded: true, blankAnswer: 'The *zabt* system restructured rural power by inserting a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch2_10', title: 'Egyptian Civilisation (c. 3100–30 BCE).',
          scaffold: { problem: 'Using the "predictable flood → centralised state" model, explain why Old Kingdom Egypt developed divine kingship and pyramid building while.',
            steps: [
            { text: 'Identify the geographic variable — Nile floods predictably (July–October); Indus floods unpredictably.' },
            { text: 'Link to agricultural surplus reliability — Egypt could plan multi-year grain storage and taxation; Harappan surplus was.' },
            { text: 'Connect surplus to state capacity — Pharaoh claimed all land (the "Two Lands"), taxed harvests, and commanded labour;.' },
            { text: 'Trace to monumental architecture — Pyramids required centralised quarrying, transport, feeding, housing of thousands;.' },
            { text: 'Evaluate ideological outcome — Egyptian pyramid texts explicitly deify the king; Harappan seals show no royal portraits.', faded: true, blankAnswer: 'The Nile\'s predictable flood enabled reliable surplus,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch3_1', title: 'The Vedic Society spans two distinct.',
          scaffold: { problem: 'Using the Rigveda and Later Vedic texts, trace the evolution of the term "rajanya" from Early to Later Vedic period and explain its.',
            steps: [
            { text: 'Identify every occurrence of "rajanya" in the Rigveda (e.g., RV 10.90.12 Purusha Sukta, RV 3.26.6) and note the.' },
            { text: 'Examine Later Vedic texts (Atharvaveda 3.5.7, Shatapatha Brahmana 5.3.1.13) where "rajanya" becomes a synonym for.' },
            { text: 'Correlate with the shift from *rajan* (tribal chief elected by samiti) to *samrat* (emperor performing.' },
            { text: 'Link the change to surplus agriculture: *bali* (voluntary offering) becomes compulsory tax, funding a standing army.' },
            { text: 'Conclude that "rajanya" evolves from a functional role (warrior) to a birth-based status (Kshatriya) because hereditary.', faded: true, blankAnswer: 'In the Early Vedic period, *rajanya* refers to the warrior.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch1_1', title: 'Scarcity is the fundamental economic.',
          scaffold: { problem: 'A village panchayat has ₹10 lakh budget for the year. Villagers want: (1) a new well (₹4 lakh), (2) repair of primary school roof (₹3.',
            steps: [
            { text: 'Identify the scarce resource — the panchayat\'s budget of ₹10 lakh (limited financial capital).' },
            { text: 'List the unlimited wants — total desired projects cost ₹20 lakh, exceeding the budget by 100%.' },
            { text: 'Apply the "What to produce" question — which projects to fund?' },
            { text: 'Apply the "How to produce" question — for the well, should they hire a drilling machine (capital-intensive, ₹4 lakh, 1.' },
            { text: 'Apply the "For whom to produce" question — if they choose subsidized seeds, which farmers get them?' },
            { text: 'Conclude — scarcity (₹10 lakh < ₹20 lakh wants) makes all three questions unavoidable.', faded: true, blankAnswer: 'Scarcity forces the panchayat to choose a subset of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_eco_ch1_2', title: 'Unlimited wants refer to the endless.',
          scaffold: { problem: 'A farmer in Punjab has 5 hectares of land, 2 permanent workers, ₹10 lakh capital, and managerial skill.',
            steps: [
            { text: 'Identify the limiting resource for each option. Land is the most binding constraint (5 hectares total).' },
            { text: 'List resource requirements per option in a table: Wheat (Land=5, Labour=2, Capital=2), Dairy (Land=1, Labour=1,.' },
            { text: 'Check feasibility of all three simultaneously: Total land needed = 5+1+2 = 8 hectares > 5 available. Not feasible.' },
            { text: 'Check pairwise combinations: Wheat+Dairy needs 6 hectares (not feasible). Wheat+Solar needs 7 hectares (not feasible).' },
            { text: 'Consider single options: Wheat alone (feasible), Dairy alone (feasible), Solar alone (feasible).' },
            { text: 'Interpret: Scarcity of land forces choice. The farmer must rank wants (income vs food security vs lease income).', faded: true, blankAnswer: 'Cannot do all three due to land shortage (need 8 ha, have 5.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch1_1', title: 'Social Science is the systematic study.',
          scaffold: { problem: 'A board exam question asks: "Explain why Social Science is considered a \'systematic study\' despite not using laboratory experiments.',
            steps: [
            { text: 'Identify the core claim to defend — Social Science is systematic because it follows explicit rules of evidence, logic,.' },
            { text: 'Select History as first discipline — historians use source criticism (provenance, corroboration, contextualisation) to.' },
            { text: 'Select Economics as second discipline — economists use model-building, data analysis, and counterfactual reasoning;.' },
            { text: 'Contrast with natural science — in Physics, controlled experiments isolate variables; in Social Science, systematic.' },
            { text: 'Synthesise — both reasons show *methodological rigour*: transparent evidence, logical inference, and openness to.', faded: true, blankAnswer: 'Social Science is systematic because (1) History uses.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_hist_ch2_10', title: 'Identify each idea',
          dissect: { specimen: 'Governance and Society: Interconnection of Politics and People', spots: [
            { id: 's1', label: 'Governance and society represent a', prompt: 'Which idea is this? — Governance and society represent a dialectical relationship where political structures.', answer: 'Governance and society represent a', options: ['Governance and society represent a', 'Egyptian Civilisation c 310030 BCE', 'The Vedic Society spans two', 'Scarcity is the fundamental economic'] },
            { id: 's2', label: 'Egyptian Civilisation c 310030 BCE', prompt: 'Which idea is this? — Egyptian Civilisation (c. 3100–30 BCE) was a Bronze Age civilisation centred along the.', answer: 'Egyptian Civilisation c 310030 BCE', options: ['Egyptian Civilisation c 310030 BCE', 'Governance and society represent a', 'The Vedic Society spans two', 'Scarcity is the fundamental economic'] },
            { id: 's3', label: 'The Vedic Society spans two', prompt: 'Which idea is this? — The Vedic Society spans two distinct phases: the Early Vedic (Rigvedic) period (c.', answer: 'The Vedic Society spans two', options: ['The Vedic Society spans two', 'Governance and society represent a', 'Egyptian Civilisation c 310030 BCE', 'Scarcity is the fundamental economic'] },
            { id: 's4', label: 'Scarcity is the fundamental economic', prompt: 'Which idea is this? — Scarcity is the fundamental economic problem arising because human wants are unlimited.', answer: 'Scarcity is the fundamental economic', options: ['Scarcity is the fundamental economic', 'Governance and society represent a', 'Egyptian Civilisation c 310030 BCE', 'The Vedic Society spans two'] },
            { id: 's5', label: 'Unlimited wants refer to the', prompt: 'Which idea is this? — Unlimited wants refer to the endless desire of individuals and societies for goods and.', answer: 'Unlimited wants refer to the', options: ['Unlimited wants refer to the', 'Governance and society represent a', 'Egyptian Civilisation c 310030 BCE', 'The Vedic Society spans two'] },
            { id: 's6', label: 'Social Science is the systematic', prompt: 'Which idea is this? — Social Science is the systematic study of human society, social relationships, and.', answer: 'Social Science is the systematic', options: ['Social Science is the systematic', 'Governance and society represent a', 'Egyptian Civilisation c 310030 BCE', 'The Vedic Society spans two'] }
          ] } }
    ],
    explore: { component: C9_SocialScienceStateSociety1000CESim, prompt: 'Explore the interactive — Governance and Society: Interconnection of Politics and People' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_hist_ch1_8', difficulty: 'standard',
          question: 'Governance and society represent a dialectical relationship where political.',
          hint: 'If stuck, revisit Class 7 node c7_hist_ch02_008 (Mauryan Administration) for the.',
          misconception: 'Students often think "governance affects society" is a one-way top-down process: the state makes laws, society obeys.',
          parts: [
                { id: 'a', prompt: 'Why did Alauddin Khalji\'s market control regulations (fixing grain prices, regulating merchants) provoke resistance not only from traders but also from rural.', answer: 'Price ceilings forced peasants to sell at below-market rates to',
                  options: ['Correct answer: Price ceilings forced peasants to sell at below-market rates to', 'trader greed', 'governance affects society'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "governance affects society" is a one-way top-down process: the state makes laws, society obeys.' },
                { id: 'b', prompt: 'Analyse how the Bhakti and Sufi movements (studied in Classes 6–7) simultaneously challenged and accommodated existing political authority.', answer: 'Challenge',
                  options: ['Correct answer: Challenge', 'religious reform', 'governance affects society'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "governance affects society" is a one-way top-down process: the state makes laws, society obeys.' }
          ],
            remediations: { 'governance-affects-society-is-a': { steps: ['Revisit Class 7 node c7_hist_ch02_008 (Mauryan Administration) and Class 8 node c8_hist_ch1_4 (Khilji Reforms) —.', 'Read the *Ain-i-Akbari* excerpt on village panchayats (Class 7) noting their judicial and revenue roles independent of.', 'Compare with Class 8 node c8_hist_ch3_8 (British Economic Exploitation) — list three ways the Permanent Settlement.', 'Write a 100-word paragraph: "Society as a brake on state power: two pre-colonial and one colonial example."'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_8', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "governance affects society" is a one-way top-down process: the state makes laws, society obeys.',
          parts: [
                { id: 'a', prompt: 'Evaluate the historian\'s claim: "The 1857 Revolt was primarily a political uprising of displaced elites, not a social revolution of the peasantry." Use.', answer: 'The claim is partially valid but incomplete',
                  options: ['Correct answer: The claim is partially valid but incomplete', 'governance affects society'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "governance affects society" is a one-way top-down process: the state makes laws, society obeys.' },
                { id: 'b', prompt: 'Construct a historical argument explaining why the Maratha *sardeshmukhi* and *chauth* exactions, though extractive, did not produce the same degree of rural.', answer: 'Expected answer: *Chauth/sardeshmukhi* were negotiable, often shared with local',
                  options: ['Expected answer: *Chauth/sardeshmukhi* were negotiable, often shared with local', 'governance affects society'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "governance affects society" is a one-way top-down process: the state makes laws, society obeys.' },
                { id: 'c', prompt: 'Analyse how the Bhakti and Sufi movements (studied in Classes 6–7) simultaneously challenged and accommodated existing political authority.', answer: 'Challenge',
                  options: ['Correct answer: Challenge', 'religious reform', 'governance affects society'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "governance affects society" is a one-way top-down process: the state makes laws, society obeys.' }
          ],
            remediations: { 'governance-affects-society-is-a': { steps: ['Revisit Class 7 node c7_hist_ch02_008 (Mauryan Administration) and Class 8 node c8_hist_ch1_4 (Khilji Reforms) —.', 'Read the *Ain-i-Akbari* excerpt on village panchayats (Class 7) noting their judicial and revenue roles independent of.', 'Compare with Class 8 node c8_hist_ch3_8 (British Economic Exploitation) — list three ways the Permanent Settlement.', 'Write a 100-word paragraph: "Society as a brake on state power: two pre-colonial and one colonial example."'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch2_10', difficulty: 'standard',
          question: 'Egyptian Civilisation (c. 3100–30 BCE) was a Bronze Age civilisation centred.',
          hint: 'Revisit c9_hist_ch2_9 (Mesopotamian ziggurats vs. Egyptian pyramids) and.',
          misconception: 'Students believe pyramids were built by foreign slaves (often conflating with the biblical Exodus narrative) and that.',
          parts: [
                { id: 'a', prompt: 'Name the river that sustained Egyptian civilisation and state the approximate time period of the Old Kingdom pyramid-building phase.', answer: 'The Nile River sustained Egyptian civilisation',
                  options: ['The Nile River sustained Egyptian civilisation', 'Tigris'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe pyramids were built by foreign slaves (often conflating with the biblical Exodus narrative) and that pyramid construction.' },
                { id: 'b', prompt: 'A student claims: "The pyramids were built by Hebrew slaves, as shown in the Bible." Using archaeological evidence from the workers\' village at Deir el-Medina.', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'Friends of Khufu'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe pyramids were built by foreign slaves (often conflating with the biblical Exodus narrative) and that pyramid construction.' }
          ],
            remediations: { 'pyramids-were-built-by-foreign': { steps: ['Show students the "Diary of Merer" (Wadi al-Jarf papyri, c. 2560 BCE) — a real inspector\'s log detailing limestone.', 'Compare with the biblical Exodus timeline (c. 13th century BCE) — 1,300 years *after* the Great Pyramid.', 'Analyse workers\' tomb inscriptions at Giza (e.g., "Overseer of the Craftsmen") showing skilled Egyptian labour.', 'Have students rewrite the "slave narrative" as a corrected evidence-based paragraph for board-style answer writing.'] } } },
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
        { type: 'subpart', nodeId: 'c9_eco_ch1_1', difficulty: 'standard',
          question: 'Scarcity is the fundamental economic problem arising because human wants are.',
          hint: 'If stuck, revisit c8_eco_ch1_2 (Factors of Production: Definition and Types) and classify.',
          misconception: 'Students believe scarcity is the same as "shortage" or "poverty".',
          parts: [
                { id: 'a', prompt: 'A farmer in Punjab has 10 hectares of land. He can grow either wheat (yield 5 tonnes/hectare, price ₹2200/tonne) or rice (yield 4 tonnes/hectare, price.', answer: 'Step 1: Wheat revenue = 10 hectares × 5 tonnes/hectare × ₹2200/tonne = ₹1,10,000',
                  options: ['Step 1: Wheat revenue = 10 hectares × 5 tonnes/hectare × ₹2200/tonne = ₹1,10,000', 'shortage', 'poverty'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe scarcity is the same as "shortage" or "poverty".' },
                { id: 'b', prompt: 'Compare the scarcity problem faced by a household (monthly income ₹30,000) and the Government of India (annual budget ₹45 lakh crore).', answer: 'Similarities: (1) Both have unlimited wants (household: better food, education,',
                  options: ['Similarities: (1) Both have unlimited wants (household: better food, education,', 'government can print money so it has no scarcity', 'shortage'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe scarcity is the same as "shortage" or "poverty".' }
          ],
            remediations: { 'scarcity-is-the-same-as': { steps: ['Ask the student to list 5 things they want right now (unlimited wants).', 'Ask them to list the resources they have to get those things (money, time, skills — all limited).', 'Show that even if you double their money, new wants appear (better phone, travel, investments).', 'Contrast with a *shortage*: "Onion price ₹100/kg last month, now ₹30/kg" — shortage disappeared, but scarcity of.', 'Have them read the definition aloud and identify the two conditions (unlimited wants, limited resources) in their own.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe scarcity is the same as "shortage" or "poverty".',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "If India becomes a developed country with high per capita income, the problem of scarcity will be solved." Use economic reasoning.', answer: 'The statement is false',
                  options: ['The statement is false', 'shortage', 'poverty', 'If we produce more, scarcity goes away'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe scarcity is the same as "shortage" or "poverty".' },
                { id: 'b', prompt: 'Compare the scarcity problem faced by a household (monthly income ₹30,000) and the Government of India (annual budget ₹45 lakh crore).', answer: 'Similarities: (1) Both have unlimited wants (household: better food, education,',
                  options: ['Similarities: (1) Both have unlimited wants (household: better food, education,', 'government can print money so it has no scarcity', 'shortage', 'poverty'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe scarcity is the same as "shortage" or "poverty".' }
          ],
            remediations: { 'scarcity-is-the-same-as': { steps: ['Ask the student to list 5 things they want right now (unlimited wants).', 'Ask them to list the resources they have to get those things (money, time, skills — all limited).', 'Show that even if you double their money, new wants appear (better phone, travel, investments).', 'Contrast with a *shortage*: "Onion price ₹100/kg last month, now ₹30/kg" — shortage disappeared, but scarcity of.', 'Have them read the definition aloud and identify the two conditions (unlimited wants, limited resources) in their own.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_2', difficulty: 'standard',
          question: 'Unlimited wants refer to the endless desire of individuals and societies for.',
          hint: 'Revisit c8_eco_ch1_2 to c8_eco_ch1_6: Factors of Production definitions and examples.',
          misconception: 'Students believe scarcity is only a problem for the poor or developing countries.',
          parts: [
                { id: 'a', prompt: 'Explain why the statement "If India had more money, we could satisfy all our wants" is economically incorrect.', answer: 'Money is a medium of exchange, not a resource itself',
                  options: ['Money is a medium of exchange, not a resource itself', 'scarcity is only a problem for the poor or developing countries'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe scarcity is only a problem for the poor or developing countries.' },
                { id: 'b', prompt: 'A village has 100 hectares of cultivable land, 200 workers, and ₹50 lakh capital. It wants to produce wheat, build a school, and start a textile unit.', answer: 'Land is limited to 100 hectares',
                  options: ['Land is limited to 100 hectares', 'we can do all if we work harder', 'scarcity is only a problem for the poor or developing countries'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe scarcity is only a problem for the poor or developing countries.' }
          ],
            remediations: { 'scarcity-is-only-a-problem': { steps: ['Take a newspaper headline about a government budget (e.g., "Centre allocates ₹10 lakh crore for infrastructure, cuts.', 'Identify the limited resource (tax revenue).', 'List competing wants (infrastructure, education, defence, subsidies).', 'Explain why tax revenue is finite (limited tax base, economic activity).', 'Conclude that even a $3 trillion economy must choose—scarcity is universal.'] } } },
        { type: 'subpart', nodeId: 'c9_eco_ch1_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe scarcity is only a problem for the poor or developing countries.',
          parts: [
                { id: 'a', prompt: 'Construct a personal \'resource-want\' table for a Class 9 student preparing for board exams.', answer: 'Example: Resources – 16 waking hours, ₹500 pocket money, textbooks',
                  options: ['Example: Resources – 16 waking hours, ₹500 pocket money, textbooks', 'scarcity is only a problem for the poor or developing countries'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe scarcity is only a problem for the poor or developing countries.' }
          ],
            remediations: { 'scarcity-is-only-a-problem': { steps: ['Take a newspaper headline about a government budget (e.g., "Centre allocates ₹10 lakh crore for infrastructure, cuts.', 'Identify the limited resource (tax revenue).', 'List competing wants (infrastructure, education, defence, subsidies).', 'Explain why tax revenue is finite (limited tax base, economic activity).', 'Conclude that even a $3 trillion economy must choose—scarcity is universal.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_1', difficulty: 'standard',
          question: 'Social Science is the systematic study of human society, social relationships,.',
          hint: 'If stuck, revisit the Harappan Civilisation (c6_history_ch04_001 to c6_history_ch04_006).',
          misconception: 'Students often think "Social Science = History + Geography + Civics + Economics" as four *separate subjects* with no.',
          parts: [
                { id: 'a', prompt: 'Why can a historian not use the laboratory experimental method the way a chemist does? Explain using the nature of historical evidence.', answer: 'Historical events are unique, non-repeatable, and already completed',
                  options: ['Historical events are unique, non-repeatable, and already completed', 'history has no evidence', 'history is just stories'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Social Science = History + Geography + Civics + Economics" as four *separate subjects* with no connection, missing.' }
          ],
            remediations: { 'social-science-history-geography-civics': { steps: ['Pick one event you know well (e.g., 1857 Revolt from Class 8).', 'Write four "Why?" questions — one each from History (why then?), Geography (why there?), Political Science (who held.', 'Use your Class 8 notes to find evidence for each.', 'Write a 3-sentence synthesis showing how the four lenses *together* explain the event better than any one alone.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Social Science = History + Geography + Civics + Economics" as four *separate subjects* with no.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Social Science is less scientific than Physics because it cannot make precise predictions." Use the concepts of complexity, human agency,.', answer: 'The claim confuses *predictive precision* with *scientific validity*',
                  options: ['The claim confuses *predictive precision* with *scientific validity*', 'Social Science is not really science', 'Social Science = History + Geography + Civics + Economics'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Social Science = History + Geography + Civics + Economics" as four *separate subjects* with no connection, missing.' }
          ],
            remediations: { 'social-science-history-geography-civics': { steps: ['Pick one event you know well (e.g., 1857 Revolt from Class 8).', 'Write four "Why?" questions — one each from History (why then?), Geography (why there?), Political Science (who held.', 'Use your Class 8 notes to find evidence for each.', 'Write a 3-sentence synthesis showing how the four lenses *together* explain the event better than any one alone.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
