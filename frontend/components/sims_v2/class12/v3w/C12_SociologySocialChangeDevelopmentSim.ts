import type { SimDef } from '../../engine/types';
import C12_SociologySocialChangeDevelopmentSim from '../../../simulations/c6_12/C12_SociologySocialChangeDevelopmentSim';

/** v3 wrapped master — C12_SociologySocialChangeDevelopmentSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_sociologysocialchangedevelopmentsim: SimDef = {
    id: 'v3w_c12_sociologysocialchangedevelopmentsim',
    title: 'Tribes and the Process of Integration: Sanskritisation, Hinduisation and Christianisation',
    subtitle: 'This node covers the three specific integration processes (Sanskritisation, Hinduisation,.',
    classLevel: 12, subject: 'sociology', topic: 'Tribes and the Process of Integration: Sanskritisation, Hinduisation and Christianisation',
    chapters: [],
    nodeIds: ['c12_soc_cbse_03_007', 'c12_soc_cbse_04_009', 'c12_soc_cbse_08_011', 'c12_soc_cbse_11_010', 'c12_soc_cbse_03_004', 'c12_soc_cbse_03_006', 'c12_soc_cbse_03_008', 'c12_soc_cbse_08_008', 'c12_soc_cbse_08_009', 'c12_soc_cbse_15_001', 'c12_soc_cbse_15_002', 'c12_soc_cbse_15_009', 'c12_soc_cbse_10_004', 'c12_soc_cbse_10_005', 'c12_soc_cbse_10_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a Gond village in Madhya Pradesh where families have stopped eating beef, started wearing the sacred.', goal: 'Master Tribes and the Process of Integration: Sanskritisation, Hinduisation and Christianisation.' },
    discovery: {
        question: 'Compare the long-term consequences of Sanskritisation vs. Christianisation on tribal kinship and gender relations.',
        options: ['Sanskritisation typically *strengthens patriarchal control* and *reinforces', 'both modernise the tribe', '**Sanskritisation = Hinduisation = becoming Hindu**'],
        answer: 'Sanskritisation typically *strengthens patriarchal control* and *reinforces',
        hook: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.',
    },
    teaching: [
        { title: 'Tribal integration refers to the historical.', text: 'Tribal integration refers to the historical and ongoing processes through which tribal communities are absorbed into mainstream society, primarily through **Sanskritisation** (adoption of upper-caste.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_soc_cbse_03_007', title: 'Tribal integration refers to the.',
          scaffold: { problem: 'The **Gond** tribe in Madhya Pradesh historically had Gond Rajas (Garha Mandla kingdom).',
            steps: [
            { text: 'Identify the *voluntary cultural emulation* — claiming Rajput ancestry, adopting upper-caste diet/rituals, hiring.' },
            { text: 'Identify the *external structural classification* — the 1931 Census enumerated Gonds as "Hindu" without their consent,.' },
            { text: 'Contrast the mechanisms — Sanskritisation is *bottom-up* (tribe initiates), *mimetic* (copies upper caste),.' },
            { text: 'Note the coexistence — the same tribe experiences both: elites Sanskritise to claim Kshatriya status, while the.' },
            { text: 'Conclude — the processes are distinct but simultaneous; Sanskritisation is a *response* to Hinduisation\'s hierarchical.', faded: true, blankAnswer: 'Two processes: (1) Sanskritisation — voluntary adoption of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_04_009', title: 'Commercialisation of agriculture refers.',
          scaffold: { problem: 'A historian argues: "The Ryotwari system was more \'modern\' than Permanent Settlement because it recognised the cultivator as proprietor and.',
            steps: [
            { text: 'Identify the historian\'s implicit assumption — that "proprietorship" and "no intermediaries" automatically mean.' },
            { text: 'Apply the concept of *state as landlord* — in Ryotwari, the colonial state replaced the zamindar as the revenue.' },
            { text: 'Apply *commodification of land* — Ryotwari made land mortgageable/saleable for revenue arrears; moneylenders (not.' },
            { text: 'Apply *crop coercion via price-based settlement* — revenue demand was calculated on cash-crop prices (cotton), forcing.' },
            { text: 'Conclude: Ryotwari replaced *feudal* intermediaries with *capitalist* ones (state-moneylender alliance), intensifying.', faded: true, blankAnswer: 'The Ryotwari system substituted zamindari extraction with.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_08_011', title: 'Structural change after independence.',
          scaffold: { problem: 'A student is asked to explain why the Second Five-Year Plan (1956–61) prioritized heavy industries in the public sector.',
            steps: [
            { text: 'Identify the core objective — the Mahalanobis model aimed to increase the economy\'s capital stock by investing in.' },
            { text: 'Recognize the constraint — private Indian capital in the 1950s lacked the scale, technology, and risk appetite for.' },
            { text: 'Link to the 1956 Industrial Policy Resolution — Schedule A legally reserved these strategic industries for the public.' },
            { text: 'Note the foreign collaboration dimension — public sector plants (Bhilai with USSR, Rourkela with Germany, Durgapur with.' },
            { text: 'Connect to structural change — this created a new class of public sector managers, engineers, and workers, altered.', faded: true, blankAnswer: 'The Second Plan prioritized public sector heavy industries.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_11_010', title: 'Rural Development Programmes are.',
          scaffold: { problem: 'A Gram Panchayat in a rain-fed district has 1,200 job-card holding households. In 2023-24, 800 households demanded work.',
            steps: [
            { text: 'Identify given data — 750 households worked, 45 days average, ₹250/day wage, material ratio 25%.' },
            { text: 'Compute total wage expenditure = households × days × wage = 750 × 45 × 250 = ₹84,37,500.' },
            { text: 'Compute demand met = households worked / households demanded × 100 = 750/800 × 100 = 93.75%.' },
            { text: 'Compute average shortfall = 100 - 45 = 55 days per household.' },
            { text: 'Compute material cost = 25% of wage cost = 0.25 × 84,37,500 = ₹21,09,375.' },
            { text: 'Total programme cost = wage cost + material cost = 84,37,500 + 21,09,375 = ₹1,05,46,875.' },
            { text: 'Interpret — high demand-met ratio but large day shortfall shows rationing of days; total cost within typical annual.', faded: true, blankAnswer: '(a) ₹84,37,500 (b) 93.75% (c) 55 days (d) ₹1,05,46,875' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_03_004', title: 'Caste in contemporary India refers to.',
          scaffold: { problem: 'A researcher wants to study whether caste influences hiring in a modern IT firm in Hyderabad.',
            steps: [
            { text: 'Define indicators — ritual dimension: employee self-reports on marriage preferences, commensality practices, temple.' },
            { text: 'Choose mixed methods — quantitative survey (stratified by caste category: General, OBC, SC, ST) to measure statistical.' },
            { text: 'Control for confounders — collect data on education (institute tier), parental occupation, English fluency, years of.' },
            { text: 'Analyse interaction — test whether ritual practices (e.g., vegetarianism, endogamous marriage) correlate with secular.' },
            { text: 'Interpret findings using the node\'s framework — if upper-caste employees show high ritual adherence but deny caste.', faded: true, blankAnswer: 'A 5-step mixed-methods design with ritual/secular.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_03_006', title: 'Tribal societies in India are distinct.',
          scaffold: { problem: 'A research team wants to study the impact of a proposed bauxite mine on two tribal communities: the Dongria Kondh of Niyamgiri hills.',
            steps: [
            { text: 'Map permanent traits for each community. Dongria Kondh: Region = Eastern Ghats (middle India belt), Language = Kui.' },
            { text: 'Map acquired traits. Dongria Kondh: Livelihood = shifting cultivation + forest produce collection, Assimilation = low.' },
            { text: 'Identify the critical analytical divergence. Both face mining displacement, but Dongria Kondh\'s identity is anchored in.' },
            { text: 'Predict differential outcomes. Dongria Kondh likely to mobilise around Forest Rights Act, constitutional protections.' },
            { text: 'Formulate research hypothesis. "Development-induced displacement triggers identity assertion, but the *form* of.', faded: true, blankAnswer: 'Comparative framework with 5 analytical steps as above;.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_soc_cbse_04_009', title: 'Identify each idea',
          dissect: { specimen: 'Tribes and the Process of Integration: Sanskritisation, Hinduisation and Christianisation', spots: [
            { id: 's1', label: 'Tribal integration refers to the', prompt: 'Which idea is this? — Tribal integration refers to the historical and ongoing processes through which tribal.', answer: 'Tribal integration refers to the', options: ['Tribal integration refers to the', 'Commercialisation of agriculture refers to', 'Structural change after independence refers', 'Rural Development Programmes are state-led'] },
            { id: 's2', label: 'Commercialisation of agriculture refers to', prompt: 'Which idea is this? — Commercialisation of agriculture refers to the historical process during colonial rule.', answer: 'Commercialisation of agriculture refers to', options: ['Commercialisation of agriculture refers to', 'Tribal integration refers to the', 'Structural change after independence refers', 'Rural Development Programmes are state-led'] },
            { id: 's3', label: 'Structural change after independence refers', prompt: 'Which idea is this? — Structural change after independence refers to the deliberate, state-led transformation.', answer: 'Structural change after independence refers', options: ['Structural change after independence refers', 'Tribal integration refers to the', 'Commercialisation of agriculture refers to', 'Rural Development Programmes are state-led'] },
            { id: 's4', label: 'Rural Development Programmes are state-led', prompt: 'Which idea is this? — Rural Development Programmes are state-led interventions designed to address structural.', answer: 'Rural Development Programmes are state-led', options: ['Rural Development Programmes are state-led', 'Tribal integration refers to the', 'Commercialisation of agriculture refers to', 'Structural change after independence refers'] },
            { id: 's5', label: 'Caste in contemporary India refers', prompt: 'Which idea is this? — Caste in contemporary India refers to the persistence of the traditional varna-jati.', answer: 'Caste in contemporary India refers', options: ['Caste in contemporary India refers', 'Tribal integration refers to the', 'Commercialisation of agriculture refers to', 'Structural change after independence refers'] },
            { id: 's6', label: 'Tribal societies in India are', prompt: 'Which idea is this? — Tribal societies in India are distinct communities characterised by their historical.', answer: 'Tribal societies in India are', options: ['Tribal societies in India are', 'Tribal integration refers to the', 'Commercialisation of agriculture refers to', 'Structural change after independence refers'] }
          ] } }
    ],
    explore: { component: C12_SociologySocialChangeDevelopmentSim, prompt: 'Explore the interactive — Tribes and the Process of Integration: Sanskritisation, Hinduisation and Christianisation' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_007', difficulty: 'standard',
          question: 'Tribal integration refers to the historical and ongoing processes through which.',
          hint: 'If stuck, re-read c11_soc_cbse_10_010 for Sanskritisation and c12_soc_cbse_03_005 for the.',
          misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.',
          parts: [
                { id: 'a', prompt: 'A Bhil community in Rajasthan has recently: (a) stopped consuming alcohol and meat, (b) built a temple to Shiva, (c) started claiming Rajput ancestry, and (d).', answer: 'Dominant process: **Sanskritisation**',
                  options: ['Dominant process: **Sanskritisation**', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' },
                { id: 'b', prompt: 'Compare the long-term consequences of Sanskritisation vs. Christianisation on tribal kinship and gender relations.', answer: 'Sanskritisation typically *strengthens patriarchal control* and *reinforces',
                  options: ['Sanskritisation typically *strengthens patriarchal control* and *reinforces', 'both modernise the tribe', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' }
          ],
            remediations: { 'sanskritisation-hinduisation-becoming-hindu': { steps: ['**Revisit c11_soc_cbse_10_010** (Srinivas on Sanskritisation) — re-read the definition: "process by which a low.', '**Revisit c12_soc_cbse_03_005** (Tribe-Caste Continuum) — focus on the distinction: "tribes lack purity-pollution.', '**Do a 15-minute table exercise**: Draw three columns (Sanskritisation, Hinduisation, Christianisation).', 'For each, fill: *Agent* (who drives it?), *Mechanism* (how?), *Goal/Outcome* (what changes?), *Example* (one tribe).'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.',
          parts: [
                { id: 'a', prompt: '"Christianisation has been more empowering for tribal communities than Sanskritisation or Hinduisation." Evaluate this statement with reference to education,.', answer: 'The statement is partially true but context-dependent',
                  options: ['The statement is partially true but context-dependent', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' },
                { id: 'b', prompt: 'Construct a hypothetical scenario where a single tribal community simultaneously experiences Sanskritisation, Hinduisation, and Christianisation in different.', answer: '**Scenario**: The **Santhal** community in Jharkhand',
                  options: ['**Scenario**: The **Santhal** community in Jharkhand', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' },
                { id: 'c', prompt: 'Compare the long-term consequences of Sanskritisation vs. Christianisation on tribal kinship and gender relations.', answer: 'Sanskritisation typically *strengthens patriarchal control* and *reinforces',
                  options: ['Sanskritisation typically *strengthens patriarchal control* and *reinforces', 'both modernise the tribe', '**Sanskritisation = Hinduisation = becoming Hindu**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **Sanskritisation = Hinduisation = becoming Hindu**.' }
          ],
            remediations: { 'sanskritisation-hinduisation-becoming-hindu': { steps: ['**Revisit c11_soc_cbse_10_010** (Srinivas on Sanskritisation) — re-read the definition: "process by which a low.', '**Revisit c12_soc_cbse_03_005** (Tribe-Caste Continuum) — focus on the distinction: "tribes lack purity-pollution.', '**Do a 15-minute table exercise**: Draw three columns (Sanskritisation, Hinduisation, Christianisation).', 'For each, fill: *Agent* (who drives it?), *Mechanism* (how?), *Goal/Outcome* (what changes?), *Example* (one tribe).'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_009', difficulty: 'standard',
          question: 'Commercialisation of agriculture refers to the historical process during.',
          hint: 'Revisit c12_soc_cbse_04_002 (Polanyi) and c12_soc_cbse_04_004 (jajmani) — if you can\'t.',
          misconception: 'Students routinely write: "Commercialisation meant farmers started growing cash crops like cotton and indigo for the.',
          parts: [
                { id: 'a', prompt: 'A ryot in Ryotwari Madras Presidency (1820s) owns 5 hectares. The revenue demand is 50% of estimated produce value.', answer: 'Step 1: Original revenue = 50% of millet value',
                  options: ['Step 1: Original revenue = 50% of millet value', 'ratchet effect'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students routinely write: "Commercialisation meant farmers started growing cash crops like cotton and indigo for the market." This is.' }
          ],
            remediations: { 'students-routinely-write-commercialisation-meant': { steps: ['If a student gives the "voluntary market response" answer: Step 1 — Ask: "Why did a rice-growing peasant in 1830s.', 'Did he wake up one day and decide indigo was more profitable?" Step 2 — Show the *dadon* (advance) contract:.', 'Step 3 — Contrast with pre-colonial *optional* surplus trade (e.g., Gujarati merchants buying cotton for export —.', 'Step 4 — Re-do Diagnostic Question 2 with emphasis on *revenue fixity → rent layers → crop coercion* chain.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students routinely write: "Commercialisation meant farmers started growing cash crops like cotton and indigo for the.',
          parts: [
                { id: 'a', prompt: '"Commercialisation of agriculture modernised Indian agriculture by integrating it into global markets." Evaluate this statement using evidence from the indigo.', answer: 'The statement is largely false for the colonial period',
                  options: ['The statement is largely false for the colonial period', 'railways and ports'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students routinely write: "Commercialisation meant farmers started growing cash crops like cotton and indigo for the market." This is.' }
          ],
            remediations: { 'students-routinely-write-commercialisation-meant': { steps: ['If a student gives the "voluntary market response" answer: Step 1 — Ask: "Why did a rice-growing peasant in 1830s.', 'Did he wake up one day and decide indigo was more profitable?" Step 2 — Show the *dadon* (advance) contract:.', 'Step 3 — Contrast with pre-colonial *optional* surplus trade (e.g., Gujarati merchants buying cotton for export —.', 'Step 4 — Re-do Diagnostic Question 2 with emphasis on *revenue fixity → rent layers → crop coercion* chain.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_011', difficulty: 'standard',
          question: 'Structural change after independence refers to the deliberate, state-led.',
          hint: 'If stuck, revisit the contrast between colonial tea plantations (extractive,.',
          misconception: 'Students often believe the "mixed economy" meant a 50-50 partnership between public and private sectors across all.',
          parts: [
                { id: 'a', prompt: 'Explain why India adopted a mixed economy model after independence instead of pure capitalism or state socialism.', answer: 'India chose a mixed economy',
                  options: ['India chose a mixed economy', 'ideological compromise', 'copying the USSR'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the "mixed economy" meant a 50-50 partnership between public and private sectors across all industries.' }
          ],
            remediations: { 'the-mixed-economy-meant-a': { steps: ['If a student holds this misconception, have them: (1) Draw a three-column table of Schedules A, B, C with 3 examples.', '(2) Identify which schedule their father\'s/grandfather\'s workplace would have fallen under in 1960.', '(3) Read the 1956 Resolution\'s preamble: "The State will progressively assume a predominant and direct responsibility.', 'The remediation must be anchored in the legal text, not general descriptions.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_08_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the "mixed economy" meant a 50-50 partnership between public and private sectors across all.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The public sector in early post-independence India was more about political sovereignty than economic efficiency."', answer: 'The statement is partially valid but incomplete',
                  options: ['The statement is partially valid but incomplete', 'mixed economy', 'equal mix', 'state-dominated mix'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the "mixed economy" meant a 50-50 partnership between public and private sectors across all industries.' }
          ],
            remediations: { 'the-mixed-economy-meant-a': { steps: ['If a student holds this misconception, have them: (1) Draw a three-column table of Schedules A, B, C with 3 examples.', '(2) Identify which schedule their father\'s/grandfather\'s workplace would have fallen under in 1960.', '(3) Read the 1956 Resolution\'s preamble: "The State will progressively assume a predominant and direct responsibility.', 'The remediation must be anchored in the legal text, not general descriptions.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_010', difficulty: 'standard',
          question: 'Rural Development Programmes are state-led interventions designed to address.',
          hint: 'Revisit the "Circulation of Labour" section (c12_soc_cbse_11_007) and the "Agrarian.',
          misconception: 'Students often conflate MGNREGA, PMGSY, and PDS as "welfare schemes" without distinguishing their *legal nature* (Act.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rural Development Programmes are state-led interventions designed to address structural',
                  options: ['Rural Development Programmes are state-led interventions designed to address structural', 'Tribal integration refers to the historical and ongoing processes through', 'Commercialisation of agriculture refers to the historical process during colonial rule', 'Structural change after independence refers to the deliberate, state-led transformation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate MGNREGA, PMGSY, and PDS as "welfare schemes" without distinguishing their *legal nature* (Act vs Scheme vs Act),.' }
          ],
            remediations: { 'students-often-conflate-mgnrega': { steps: ['If a student confuses the three programmes, do NOT re-read the whole chapter.', 'Instead: (1) Make a three-column table: Programme | Legal Basis | Core Entitlement | Implementing Agency | Targeting.', '(2) Fill it using only the NCERT boxes on each programme.', '(3) Write one sentence per programme linking it to a deprivation studied earlier (e.g., "MGNREGA addresses.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_11_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often conflate MGNREGA, PMGSY, and PDS as "welfare schemes" without distinguishing their *legal nature* (Act.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "MGNREGA has reduced distress migration but increased agricultural wages, thereby hurting small farmers\' profitability." Use.', answer: 'The statement is partially valid but oversimplified',
                  options: ['The statement is partially valid but oversimplified', 'unambiguously good/bad', 'MGNREGA provides roads', 'PMGSY gives 100 days work'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate MGNREGA, PMGSY, and PDS as "welfare schemes" without distinguishing their *legal nature* (Act vs Scheme vs Act),.' },
                { id: 'b', prompt: 'Design a field-study plan for a sociology student to assess the effectiveness of PDS in a tribal block.', answer: 'two quantitative indicators, (',
                  options: ['two quantitative indicators, (', 'MGNREGA provides roads', 'PMGSY gives 100 days work'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often conflate MGNREGA, PMGSY, and PDS as "welfare schemes" without distinguishing their *legal nature* (Act vs Scheme vs Act),.' }
          ],
            remediations: { 'students-often-conflate-mgnrega': { steps: ['If a student confuses the three programmes, do NOT re-read the whole chapter.', 'Instead: (1) Make a three-column table: Programme | Legal Basis | Core Entitlement | Implementing Agency | Targeting.', '(2) Fill it using only the NCERT boxes on each programme.', '(3) Write one sentence per programme linking it to a deprivation studied earlier (e.g., "MGNREGA addresses.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_004', difficulty: 'standard',
          question: 'Caste in contemporary India refers to the persistence of the traditional.',
          hint: 'Revisit c12_soc_cbse_03_001 and c12_soc_cbse_03_002 — specifically the six defining.',
          misconception: 'Students often think \'caste is weakening everywhere\' because they see intercaste dining in colleges or upper-caste.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Caste in contemporary India refers to the persistence of the traditional varna-jati',
                  options: ['Caste in contemporary India refers to the persistence of the traditional varna-jati', 'Tribal integration refers to the historical and ongoing processes through', 'Commercialisation of agriculture refers to the historical process during colonial rule', 'Structural change after independence refers to the deliberate, state-led transformation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'caste is weakening everywhere\' because they see intercaste dining in colleges or upper-caste peers saying \'caste.' }
          ],
            remediations: { 'caste-is-weakening-everywhere-because': { steps: ['If a student conflates ritual/secular or thinks caste is disappearing: (1) Have them re-read the NCERT paragraphs on.', '(2) Ask them to list 5 marriage ads from a newspaper matrimonial column and code each for caste preference — this makes.', '(3) Assign the case study of the 1980s rise of Dalit Panthers and Bahujan Samaj Party to show caste becoming *more*.', '(4) Re-diagnose with Question 2 above.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_03_006', difficulty: 'standard',
          question: 'Tribal societies in India are distinct communities characterised by their.',
          hint: 'Revisit c11_soc_cbse_03_001 (Social Institutions definition) and c11_soc_cbse_07_008.',
          misconception: 'Students consistently confuse "tribe" as a sociological category with "Scheduled Tribe" as a Constitutional-legal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Tribal societies in India are distinct communities characterised by their historical',
                  options: ['Tribal societies in India are distinct communities characterised by their historical', 'Tribal integration refers to the historical and ongoing processes through', 'Commercialisation of agriculture refers to the historical process during colonial rule', 'Structural change after independence refers to the deliberate, state-led transformation'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "tribe" as a sociological category with "Scheduled Tribe" as a Constitutional-legal category.' }
          ],
            remediations: { 'students-consistently-confuse-tribe-as': { steps: ['Have the student create a two-column table: "Sociological Concept of Tribe" (left) vs.', 'Populate left column from NCERT: permanent traits (region, language, physical, ecology), acquired traits (livelihood,.', 'Populate right column: Article 342, Presidential Order, Lokur Committee criteria (primitive traits, distinctive.', 'Ask: "Can a community be sociologically tribal but not Scheduled?', 'Assign re-diagnostic: "Explain why the Gond kingdom of Garha Mandla was a tribal polity but would not fit the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
