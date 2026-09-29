import type { SimDef } from '../../engine/types';
import C9_SocialScienceForestSocietySim from '../../../simulations/c6_12/C9_SocialScienceForestSocietySim';

/** v3 wrapped master — C9_SocialScienceForestSocietySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_socialscienceforestsocietysim: SimDef = {
    id: 'v3w_c9_socialscienceforestsocietysim',
    title: 'Scarcity: The Fundamental Economic Problem',
    subtitle: 'This node covers the definition of scarcity as the root cause of all economic problems,.',
    classLevel: 9, subject: 'science', topic: 'Scarcity: The Fundamental Economic Problem',
    chapters: [],
    nodeIds: ['c9_eco_ch1_1', 'c9_eco_ch1_2', 'c9_hist_ch3_1', 'c9_hist_ch1_1', 'c9_hist_ch1_10', 'c9_hist_ch1_2', 'c9_hist_ch1_3', 'c9_hist_ch1_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine a Class 9 student named Rohan who has ₹500 pocket money for the week but wants to buy a new cricket.', goal: 'Master Scarcity: The Fundamental Economic Problem.' },
    discovery: {
        question: 'A farmer in Punjab has 10 hectares of land. He can grow either wheat (yield 5 tonnes/hectare, price ₹2200/tonne) or rice (yield 4 tonnes/hectare, price.',
        options: ['Step 1: Wheat revenue = 10 hectares × 5 tonnes/hectare × ₹2200/tonne = ₹1,10,000', 'shortage', 'poverty'],
        answer: 'Step 1: Wheat revenue = 10 hectares × 5 tonnes/hectare × ₹2200/tonne = ₹1,10,000',
        hook: 'Students believe scarcity is the same as "shortage" or "poverty".',
    },
    teaching: [
        { title: 'Scarcity is the fundamental economic problem.', text: 'Scarcity is the fundamental economic problem arising because human wants are unlimited while the resources (land, labour, capital, entrepreneurship) available to satisfy them are limited in supply.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
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
        { type: 'scaffold', nodeId: 'c9_hist_ch3_1', title: 'The Vedic Society spans two distinct.',
          scaffold: { problem: 'Using the Rigveda and Later Vedic texts, trace the evolution of the term "rajanya" from Early to Later Vedic period and explain its.',
            steps: [
            { text: 'Identify every occurrence of "rajanya" in the Rigveda (e.g., RV 10.90.12 Purusha Sukta, RV 3.26.6) and note the.' },
            { text: 'Examine Later Vedic texts (Atharvaveda 3.5.7, Shatapatha Brahmana 5.3.1.13) where "rajanya" becomes a synonym for.' },
            { text: 'Correlate with the shift from *rajan* (tribal chief elected by samiti) to *samrat* (emperor performing.' },
            { text: 'Link the change to surplus agriculture: *bali* (voluntary offering) becomes compulsory tax, funding a standing army.' },
            { text: 'Conclude that "rajanya" evolves from a functional role (warrior) to a birth-based status (Kshatriya) because hereditary.', faded: true, blankAnswer: 'In the Early Vedic period, *rajanya* refers to the warrior.' }
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
        { type: 'scaffold', nodeId: 'c9_hist_ch1_10', title: 'Bias and perspective in historical.',
          scaffold: { problem: 'Read the following source and identify three types of bias: "The British brought civilization to India.',
            steps: [
            { text: 'Identify authorial bias. The author is British, writing in 1880 during colonial rule — the account naturally presents.' },
            { text: 'Identify cultural bias. "Superstition and despotism" judges pre-British Indian society by British Victorian standards,.' },
            { text: 'Identify temporal bias. Written during colonial expansion, the statement frames British rule as progress and.' },
            { text: 'Identify omissions. The source omits: India\'s pre-colonial educational institutions (Nalanda, Takshashila), scientific.', faded: true, blankAnswer: 'Three types of bias: (1) Authorial bias — written by a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_hist_ch1_2', title: 'The interdisciplinary relationship.',
          scaffold: { problem: 'Explain how the geography of the Indus Valley (rivers, floodplains, trade routes) shaped the Harappan Civilization\'s urban planning,.',
            steps: [
            { text: 'Identify the key geographical features: Indus River and its tributaries providing water, fertile floodplains, and a.' },
            { text: 'Link each feature to urban planning (History/Archaeology): Grid-pattern cities (Mohenjo-daro, Harappa) built on.' },
            { text: 'Link to economic organization: Surplus wheat/barley from fertile plains supported non-farming specialists.' },
            { text: 'Link to political unity: Uniform weights, measures, seals, and script across 1.5 million sq km suggest a shared.' },
            { text: 'Evaluate significance: The civilization\'s decline (c6_history_ch04_006) correlates with geological changes (river.', faded: true, blankAnswer: 'The Indus River\'s predictable flooding and navigability.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_eco_ch1_2', title: 'Identify each idea',
          dissect: { specimen: 'Scarcity: The Fundamental Economic Problem', spots: [
            { id: 's1', label: 'Scarcity is the fundamental economic', prompt: 'Which idea is this? — Scarcity is the fundamental economic problem arising because human wants are unlimited.', answer: 'Scarcity is the fundamental economic', options: ['Scarcity is the fundamental economic', 'Unlimited wants refer to the', 'The Vedic Society spans two', 'Social Science is the systematic'] },
            { id: 's2', label: 'Unlimited wants refer to the', prompt: 'Which idea is this? — Unlimited wants refer to the endless desire of individuals and societies for goods and.', answer: 'Unlimited wants refer to the', options: ['Unlimited wants refer to the', 'Scarcity is the fundamental economic', 'The Vedic Society spans two', 'Social Science is the systematic'] },
            { id: 's3', label: 'The Vedic Society spans two', prompt: 'Which idea is this? — The Vedic Society spans two distinct phases: the Early Vedic (Rigvedic) period (c.', answer: 'The Vedic Society spans two', options: ['The Vedic Society spans two', 'Scarcity is the fundamental economic', 'Unlimited wants refer to the', 'Social Science is the systematic'] },
            { id: 's4', label: 'Social Science is the systematic', prompt: 'Which idea is this? — Social Science is the systematic study of human society, social relationships, and.', answer: 'Social Science is the systematic', options: ['Social Science is the systematic', 'Scarcity is the fundamental economic', 'Unlimited wants refer to the', 'The Vedic Society spans two'] },
            { id: 's5', label: 'Bias and perspective in historical', prompt: 'Which idea is this? — Bias and perspective in historical interpretation refer to the systematic distortions,.', answer: 'Bias and perspective in historical', options: ['Bias and perspective in historical', 'Scarcity is the fundamental economic', 'Unlimited wants refer to the', 'The Vedic Society spans two'] },
            { id: 's6', label: 'The interdisciplinary relationship where geography', prompt: 'Which idea is this? — The interdisciplinary relationship where geography provides the physical setting.', answer: 'The interdisciplinary relationship where geography', options: ['The interdisciplinary relationship where geography', 'Scarcity is the fundamental economic', 'Unlimited wants refer to the', 'The Vedic Society spans two'] }
          ] } }
    ],
    explore: { component: C9_SocialScienceForestSocietySim, prompt: 'Explore the interactive — Scarcity: The Fundamental Economic Problem' },
    challenges: [
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
            remediations: { 'social-science-history-geography-civics': { steps: ['Pick one event you know well (e.g., 1857 Revolt from Class 8).', 'Write four "Why?" questions — one each from History (why then?), Geography (why there?), Political Science (who held.', 'Use your Class 8 notes to find evidence for each.', 'Write a 3-sentence synthesis showing how the four lenses *together* explain the event better than any one alone.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_10', difficulty: 'standard',
          question: 'Bias and perspective in historical interpretation refer to the systematic.',
          hint: 'Revisit c9_hist_ch1_1 (What is Social Science?) to understand that history is disciplined.',
          misconception: 'Students think "biased" means "false" and therefore discard biased sources.',
          parts: [
                { id: 'a', prompt: 'A British colonial historian writes in 1850: "The Mughal Empire was a period of Oriental despotism and stagnation." Identify two biases in this statement.', answer: 'Bias 1 — Cultural bias: "Oriental despotism" judges Mughal governance by British',
                  options: ['Bias 1 — Cultural bias: "Oriental despotism" judges Mughal governance by British', 'biased', '"biased" means "false" and therefore discard biased sources'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "biased" means "false" and therefore discard biased sources.' }
          ],
            remediations: { 'biased-means-false-and-therefore': { steps: ['Give the student two accounts of the same event (e.g., a school dispute) written from different perspectives.', 'Ask: "Which is true?" (Neither is fully true — both are biased.) 3.', 'Have them identify what each account includes and omits.', 'Introduce the four types of bias (authorial, source, cultural, temporal) with examples.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "biased" means "false" and therefore discard biased sources.',
          parts: [
                { id: 'a', prompt: 'How can a historian use a biased source responsibly? Give two strategies.', answer: 'Strategy 1: Cross-reference',
                  options: ['Strategy 1: Cross-reference', 'discard biased sources', 'biased', '"biased" means "false" and therefore discard biased sources'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "biased" means "false" and therefore discard biased sources.' },
                { id: 'b', prompt: 'Two sources describe the same battle. Source A (victor\'s chronicle) says: "The enemy was crushed decisively." Source B (defeated side\'s oral tradition) says:.', answer: 'Source A bias: Authorial and source bias',
                  options: ['Source A bias: Authorial and source bias', 'biased', '"biased" means "false" and therefore discard biased sources'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "biased" means "false" and therefore discard biased sources.' },
                { id: 'c', prompt: 'A British colonial historian writes in 1850: "The Mughal Empire was a period of Oriental despotism and stagnation." Identify two biases in this statement.', answer: 'Bias 1 — Cultural bias: "Oriental despotism" judges Mughal governance by British',
                  options: ['Bias 1 — Cultural bias: "Oriental despotism" judges Mughal governance by British', 'biased', '"biased" means "false" and therefore discard biased sources'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "biased" means "false" and therefore discard biased sources.' }
          ],
            remediations: { 'biased-means-false-and-therefore': { steps: ['Give the student two accounts of the same event (e.g., a school dispute) written from different perspectives.', 'Ask: "Which is true?" (Neither is fully true — both are biased.) 3.', 'Have them identify what each account includes and omits.', 'Introduce the four types of bias (authorial, source, cultural, temporal) with examples.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_2', difficulty: 'standard',
          question: 'The interdisciplinary relationship where geography provides the physical.',
          hint: 'If stuck, revisit the physical map of India (Class 6 Geography) and the timeline chart of.',
          misconception: 'Students often believe "geography determines history" (geographical determinism), thinking that because India has the.',
          parts: [
                { id: 'a', prompt: 'Name one major geographical feature of the Indian subcontinent that acted as a natural barrier against invasions from the northwest, and state one historical.', answer: 'The Hindu Kush and Himalayan mountain ranges acted as natural barriers',
                  options: ['The Hindu Kush and Himalayan mountain ranges acted as natural barriers', 'geography determines history'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "geography determines history" (geographical determinism), thinking that because India has the Himalayas, it was.' }
          ],
            remediations: { 'geography-determines-history-geographical-determ': { steps: ['Have the student draw a physical map of India marking the Himalayas, Gangetic plains, Deccan Plateau, Thar Desert, and.', 'For each region, list one historical event where geography helped a ruler and one where it hindered (e.g., Himalayas.', 'Ask the student to rewrite a previous board-style answer (e.g., "Why did the British win?") replacing "because of.'] } } },
        { type: 'subpart', nodeId: 'c9_hist_ch1_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "geography determines history" (geographical determinism), thinking that because India has the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The British conquest of India was primarily due to their superior naval power and the geography of India\'s long coastline." Use.', answer: 'The statement is partially true but incomplete',
                  options: ['The statement is partially true but incomplete', 'geography determines history'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "geography determines history" (geographical determinism), thinking that because India has the Himalayas, it was.' },
                { id: 'b', prompt: 'Create a conceptual diagram (mind map) linking the Thar Desert, the Indus River, the Aravalli Range, and the Khyber Pass to the following: Harappan urban.', answer: 'A good answer shows: Thar Desert -> Harappan trade routes (Geography/History)',
                  options: ['A good answer shows: Thar Desert -> Harappan trade routes (Geography/History)', 'geography determines history'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "geography determines history" (geographical determinism), thinking that because India has the Himalayas, it was.' }
          ],
            remediations: { 'geography-determines-history-geographical-determ': { steps: ['Have the student draw a physical map of India marking the Himalayas, Gangetic plains, Deccan Plateau, Thar Desert, and.', 'For each region, list one historical event where geography helped a ruler and one where it hindered (e.g., Himalayas.', 'Ask the student to rewrite a previous board-style answer (e.g., "Why did the British win?") replacing "because of.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
