import type { SimDef } from '../../engine/types';
import C12_PoliticalScienceMeaningFunctionsLegislatureSim from '../../../simulations/c6_12/C12_PoliticalScienceMeaningFunctionsLegislatureSim';

/** v3 wrapped master — C12_PoliticalScienceMeaningFunctionsLegislatureSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_politicalsciencemeaningfunctionslegislaturesim: SimDef = {
    id: 'v3w_c12_politicalsciencemeaningfunctionslegislaturesim',
    title: 'Meaning Functions Legislature',
    subtitle: 'Covers: Chipko (1973), Silent Valley (1970s-80s), Narmada Bachao Andolan (1985+), Appiko,.',
    classLevel: 12, subject: 'political_science', topic: 'Environmental Movements and the Politics of Development',
    chapters: [],
    nodeIds: ['c12_ps_cbse_13_008', 'c12_ps_cbse_02_001', 'c12_ps_cbse_09_008', 'c12_ps_cbse_12_008', 'c12_ps_cbse_08_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you\'re a Class 12 student reading a news report about a new highway cutting through a tiger reserve.', goal: 'Master Meaning Functions Legislature.' },
    discovery: {
        question: 'Evaluate the claim: "The Forest Rights Act 2006 resolved the historical injustice against forest-dwelling communities." Use *three* specific implementation.',
        options: ['**Claim is false', 'success', 'policy = outcome'],
        answer: '**Claim is false',
        hook: '**Misconception:** "Environmental movements are \'anti-development\' and \'anti-national\' — they block progress, jobs, and.',
    },
    teaching: [
        { title: 'Environmental Movements and the Politics of.', text: 'Environmental Movements and the Politics of Development refers to the contested terrain where grassroots ecological struggles challenge the state\'s top-down development paradigm, exposing how.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_ps_cbse_13_008', title: 'Environmental Movements and the.',
          scaffold: { problem: 'A tribal village in Chhattisgarh\'s Hasdeo Arand forest receives a notice that their community forest land will be diverted for a coal mine.',
            steps: [
            { text: 'Identify the legal status of Hasdeo Arand — it is a *Scheduled Area (Fifth Schedule)* with *Community Forest Resource.' },
            { text: 'Recall FRA 2006, Section 4(1)(e) + Section 6(1): Gram Sabha has *right to protect* CFR and *free, prior, informed.' },
            { text: 'Recall PESA 1996, Section 4(i): In Scheduled Areas, Gram Sabha *must be consulted* before land acquisition — this is.' },
            { text: 'Recall *Orissa Mining Corp v. MoEF (2013)* (Niyamgiri judgment): Supreme Court held that *Gram Sabha consent is.' },
            { text: 'Apply to scenario: Collector\'s claim is *legally wrong*. EIA clearance (under EPA 1986) is *necessary but not.', faded: true, blankAnswer: 'The Gram Sabha has a *veto* under FRA/PESA. The Collector\'s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ps_cbse_02_001', title: 'The Soviet System refers to the.',
          scaffold: { problem: 'A newspaper editorial claims: “The Soviet Union collapsed because central planning *cannot* work — it’s mathematically impossible to.',
            steps: [
            { text: 'Identify the claim’s core — it attributes collapse *solely* to economic calculation problem (Mises/Hayek).' },
            { text: 'Recall Political Science perspective — institutions (party monopoly, nomenklatura, lack of feedback loops) shape *how*.' },
            { text: 'List three political-institutional factors from the Soviet system that worsened economic performance: (a) **No.' },
            { text: 'Contrast with **China post-1978** — similar planned economy *initially*, but *political* decentralization.' },
            { text: 'Conclude — the editorial’s “mathematical impossibility” is a **necessary but not sufficient** explanation; the.', faded: true, blankAnswer: 'The claim is **reductionist**. While the economic.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ps_cbse_09_008', title: 'Opposition parties in the 1950s refer.',
          scaffold: { problem: 'A student argues: \'Since the Communist Party of India won only 16 Lok Sabha seats in 1952 but formed a government in Kerala in 1957, the.',
            steps: [
            { text: 'Identify the two different arenas — national (Lok Sabha) vs. state (Kerala assembly) — where opposition strength varied.' },
            { text: 'Recall NCERT data — CPI won 16/489 Lok Sabha seats (3.3%) but 60/126 Kerala assembly seats (47.6%) with independent.' },
            { text: 'Apply the \'Congress system\' concept — Congress dominance was national; state-level variation allowed opposition.' },
            { text: 'Connect to democratic theory — opposition\'s \'token representation\' nationally coexisted with real state power, proving.' },
            { text: 'Conclude — not a contradiction but evidence of federalised party competition: weak nationally, competitive in pockets,.', faded: true, blankAnswer: 'The apparent contradiction dissolves when we recognise that.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ps_cbse_12_008', title: 'The 1977 general elections were the.',
          scaffold: { problem: 'A student reads that "Congress won only 154 seats in 1977, its lowest ever." They ask: "Was this purely an anti-Emergency vote, or did.',
            steps: [
            { text: 'Identify the two competing explanations — **political (Emergency excesses)** vs.' },
            { text: 'Recall NCERT data: 1974-75 inflation >20%, 1975-76 drought, forced sterilisation targets in rural North India.' },
            { text: 'Apply the "referendum" framework — voters in North India (UP, Bihar, Haryana, Delhi) swung massively to Janata; South.' },
            { text: 'Analyze the regional pattern — North India bore the brunt of sterilisation drives and Emergency repression; South had.' },
            { text: 'Conclude: **Both factors operated, but Emergency was the national narrative; economic distress amplified it in the.', faded: true, blankAnswer: 'The 1977 verdict was primarily a referendum on the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_ps_cbse_08_009', title: 'The First General Elections of 1951-52.',
          scaffold: { problem: 'In 1951, the Election Commission had to prepare electoral rolls for 173 million voters across a territory of 3.2 million sq km with 84%.',
            steps: [
            { text: 'The Commission directed state governments to conduct house-to-house enumeration to list every adult resident, using.' },
            { text: 'Special camps were set up in refugee colonies and tribal areas to register displaced persons and forest-dwellers who.' },
            { text: 'Draft rolls were published in villages and towns for public scrutiny; objections and claims were heard by designated.' },
            { text: 'Final rolls were printed and distributed; each voter received an identity slip with their serial number.' },
            { text: 'To address illiteracy, the Commission assigned a unique symbol to each candidate/party (e.g., bullocks for Congress,.', faded: true, blankAnswer: 'The Commission used house-to-house enumeration, refugee.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_ps_cbse_02_001', title: 'Identify each idea',
          dissect: { specimen: 'Meaning Functions Legislature', spots: [
            { id: 's1', label: 'Environmental Movements and the Politics', prompt: 'Which idea is this? — Environmental Movements and the Politics of Development refers to the contested terrain.', answer: 'Environmental Movements and the Politics', options: ['Environmental Movements and the Politics', 'The Soviet System refers to', 'Opposition parties in the 1950s', 'The 1977 general elections were'] },
            { id: 's2', label: 'The Soviet System refers to', prompt: 'Which idea is this? — The Soviet System refers to the political and economic structure of the Union of Soviet.', answer: 'The Soviet System refers to', options: ['The Soviet System refers to', 'Environmental Movements and the Politics', 'Opposition parties in the 1950s', 'The 1977 general elections were'] },
            { id: 's3', label: 'Opposition parties in the 1950s', prompt: 'Which idea is this? — Opposition parties in the 1950s refer to the diverse non-Congress political parties.', answer: 'Opposition parties in the 1950s', options: ['Opposition parties in the 1950s', 'Environmental Movements and the Politics', 'The Soviet System refers to', 'The 1977 general elections were'] },
            { id: 's4', label: 'The 1977 general elections were', prompt: 'Which idea is this? — The 1977 general elections were the sixth Lok Sabha elections held after the lifting of.', answer: 'The 1977 general elections were', options: ['The 1977 general elections were', 'Environmental Movements and the Politics', 'The Soviet System refers to', 'Opposition parties in the 1950s'] },
            { id: 's5', label: 'The First General Elections of', prompt: 'Which idea is this? — The First General Elections of 1951-52 were the inaugural nationwide elections held under.', answer: 'The First General Elections of', options: ['The First General Elections of', 'Environmental Movements and the Politics', 'The Soviet System refers to', 'Opposition parties in the 1950s'] }
          ] } }
    ],
    explore: { component: C12_PoliticalScienceMeaningFunctionsLegislatureSim, prompt: 'Explore the interactive — Meaning Functions Legislature' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_008', difficulty: 'standard',
          question: 'Environmental Movements and the Politics of Development refers to the contested.',
          hint: 'If stuck: Re-read c12_ps_cbse_13_002 (Chipko\'s "ecology is permanent economy") and.',
          misconception: '**Misconception:** "Environmental movements are \'anti-development\' and \'anti-national\' — they block progress, jobs, and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Environmental Movements and the Politics of Development refers to the contested terrain',
                  options: ['Environmental Movements and the Politics of Development refers to the contested terrain', 'The Soviet System refers to the political and economic structure of the Union of Soviet', 'Opposition parties in the 1950s refer to the diverse non-Congress political parties', 'The 1977 general elections were the sixth Lok Sabha elections held after the lifting of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Environmental movements are \'anti-development\' and \'anti-national\' — they block progress, jobs, and electricity for the.' }
          ],
            remediations: { 'misconception-environmental-movements-are-anti': { steps: ['If student holds the "anti-development" misconception: 1.', '**Revisit c12_ps_cbse_13_006 (NBA node):** Study the *specific demands* of NBA — they never said "stop all dams"; they.', '**Read the *Narmada Tribunal Award (1979)* clauses on rehabilitation** — compare with ground reality (Shah Commission,.', '**Analyze *Vellore Citizens Welfare Forum* judgment:** Court said "sustainable development" = *balance* of ecology and.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_13_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Environmental movements are \'anti-development\' and \'anti-national\' — they block progress, jobs, and.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Forest Rights Act 2006 resolved the historical injustice against forest-dwelling communities." Use *three* specific implementation.', answer: '**Claim is false',
                  options: ['**Claim is false', 'success', 'policy = outcome'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Environmental movements are \'anti-development\' and \'anti-national\' — they block progress, jobs, and electricity for the.' }
          ],
            remediations: { 'misconception-environmental-movements-are-anti': { steps: ['If student holds the "anti-development" misconception: 1.', '**Revisit c12_ps_cbse_13_006 (NBA node):** Study the *specific demands* of NBA — they never said "stop all dams"; they.', '**Read the *Narmada Tribunal Award (1979)* clauses on rehabilitation** — compare with ground reality (Shah Commission,.', '**Analyze *Vellore Citizens Welfare Forum* judgment:** Court said "sustainable development" = *balance* of ecology and.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_001', difficulty: 'standard',
          question: 'The Soviet System refers to the political and economic structure of the Union.',
          hint: 'If stuck, revisit **c11_hist_cbse_09_003** (Marx’s base-superstructure) and.',
          misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.”.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Soviet System refers to the political and economic structure of the Union of Soviet',
                  options: ['The Soviet System refers to the political and economic structure of the Union of Soviet', 'Environmental Movements and the Politics of Development refers to the contested terrain', 'Opposition parties in the 1950s refer to the diverse non-Congress political parties', 'The 1977 general elections were the sixth Lok Sabha elections held after the lifting of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.” **Why it’s wrong:** The.' }
          ],
            remediations: { 'misconception-the-soviet-union-had': { steps: ['**Re-read** the NCERT Class 12 *Contemporary World Politics* Chapter 1 (“The End of Bipolarity”), Section **“The Soviet.', 'Focus on the **bulleted list of features** and the **“Why did the Soviet system become stagnant?”** box.', '**Watch** the 10-min video “How the Soviet Union Worked” (CaspianReport or similar) — pause at **nomenklatura**,.', '**Re-attempt** Diagnostic Questions 2 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.”.',
          parts: [
                { id: 'a', prompt: '**EVALUATE:** “The Soviet planned economy was a complete failure because it could not produce consumer goods.” Assess this claim using **three specific pieces.', answer: '**Correct answer:** The claim is **overstated**',
                  options: ['**Correct answer:** The claim is **overstated**', 'it was a total disaster', 'no constitution/elections'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.” **Why it’s wrong:** The.' },
                { id: 'b', prompt: '**CREATE:** Draft a **tweet (≤ 280 characters)** that a Soviet citizen in 1980 might have written (samizdat style) to criticize the *gap between constitutional.', answer: '**Expected answer (criteria):** A good tweet will: - Mention **Article 6 (CPSU',
                  options: ['**Expected answer (criteria):** A good tweet will: - Mention **Article 6 (CPSU', 'no constitution/elections'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** “The Soviet Union had no constitution and no elections — it was pure dictatorship from day one.” **Why it’s wrong:** The.' }
          ],
            remediations: { 'misconception-the-soviet-union-had': { steps: ['**Re-read** the NCERT Class 12 *Contemporary World Politics* Chapter 1 (“The End of Bipolarity”), Section **“The Soviet.', 'Focus on the **bulleted list of features** and the **“Why did the Soviet system become stagnant?”** box.', '**Watch** the 10-min video “How the Soviet Union Worked” (CaspianReport or similar) — pause at **nomenklatura**,.', '**Re-attempt** Diagnostic Questions 2 and 4.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_008', difficulty: 'standard',
          question: 'Opposition parties in the 1950s refer to the diverse non-Congress political.',
          hint: 'Revisit c11_ps_cbse_12_004 (FPTP mechanics) and c10_civ_cbse_04_008 (opposition\'s.',
          misconception: 'Students believe opposition parties in the 1950s were \'irrelevant\' because they won few seats, and that Congress.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Opposition parties in the 1950s refer to the diverse non-Congress political parties',
                  options: ['Opposition parties in the 1950s refer to the diverse non-Congress political parties', 'Environmental Movements and the Politics of Development refers to the contested terrain', 'The Soviet System refers to the political and economic structure of the Union of Soviet', 'The 1977 general elections were the sixth Lok Sabha elections held after the lifting of'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe opposition parties in the 1950s were \'irrelevant\' because they won few seats, and that Congress dominance meant \'no real.' }
          ],
            remediations: { 'opposition-parties-in-the-1950s': { steps: ['If a student equates opposition relevance with seat share: Step 1 — Re-read NCERT pp.', '40-41 (\'Emergence of opposition parties\') and list the four explicit functions NCERT assigns to 1950s opposition.', 'Step 2 — Review c10_civ_cbse_04_008 (Role of Opposition Parties) to recall the textbook definition of opposition\'s.', 'Step 3 — Attempt Diagnostic Question 5 again, this time using the four NCERT functions as your evaluation criteria.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_008', difficulty: 'standard',
          question: 'The 1977 general elections were the sixth Lok Sabha elections held after the.',
          hint: 'If stuck, revisit **c12_ps_cbse_12_006 (Emergency)** and list the top 5 civil liberties.',
          misconception: 'Students often believe the **Janata Party was a genuine ideological merger** creating a new centrist party.',
          parts: [
                { id: 'a', prompt: 'In which month and year were the sixth Lok Sabha elections held, and which party/alliance won a clear majority?', answer: 'The sixth Lok Sabha elections were held in **March 1977**',
                  options: ['The sixth Lok Sabha elections were held in **March 1977**', 'Congress won', 'ideological conflict'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the **Janata Party was a genuine ideological merger** creating a new centrist party.' },
                { id: 'b', prompt: 'A state government in 1978 dismisses a district collector for refusing to implement a politically motivated transfer order.', answer: 'The High Court **will entertain the petition**',
                  options: ['The High Court **will entertain the petition**', 'ideological conflict', 'unresolved organisational duality'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the **Janata Party was a genuine ideological merger** creating a new centrist party.' },
                { id: 'c', prompt: 'Compare the Janata Party\'s coalition composition (1977) with the United Front (1996) and NDA (1998) coalitions.', answer: '**Similarity:** All three were **anti-incumbent coalitions** stitching together',
                  options: ['**Similarity:** All three were **anti-incumbent coalitions** stitching together', 'ideological conflict', 'unresolved organisational duality'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the **Janata Party was a genuine ideological merger** creating a new centrist party.' }
          ],
            remediations: { 'the-janata-party-was-a': { steps: ['Re-read **c12_ps_cbse_12_005 (JP Movement)** to see how disparate groups united *only* against Emergency.', 'Review **c12_ps_cbse_12_006 (Emergency)** for the specific excesses (censorship, sterilisation, MISA) that created the.', 'Create a **two-column table**: "Janata Component Parties" vs.', '"Core Ideology & Loyalty" — this visualises the incompatibility.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_009', difficulty: 'standard',
          question: 'The First General Elections of 1951-52 were the inaugural nationwide elections.',
          hint: 'Revisit c11_ps_cbse_12_003 (Universal Adult Franchise) and c11_ps_cbse_12_008 (Election.',
          misconception: 'Students often believe the first elections were a smooth, uncontested Congress victory because of Nehru\'s popularity,.',
          parts: [
                { id: 'a', prompt: 'Why did the Election Commission introduce party symbols for the 1951-52 elections, and how did this innovation address a specific challenge of the Indian.', answer: 'Party symbols were introduced',
                  options: ['Party symbols were introduced', 'to help political parties campaign', 'to reduce ballot paper size'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the first elections were a smooth, uncontested Congress victory because of Nehru\'s popularity, overlooking the.' }
          ],
            remediations: { 'the-first-elections-were-a': { steps: ['If the student holds the above misconception: (1) Re-read the NCERT section on "The First General Elections" (Chapter.', '(2) Watch the 10-minute documentary "India\'s First Election" (available on YouTube/PIB) showing ballot boxes.', '(3) Compare the 1951-52 election data (turnout, parties, seats) with the 2019 election in a table to see continuity and.', '(4) Re-attempt Diagnostic Questions 3 and 5 with this evidence.'] } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_08_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the first elections were a smooth, uncontested Congress victory because of Nehru\'s popularity,.',
          parts: [
                { id: 'a', prompt: 'Draft a one-paragraph directive (as if from the Election Commission in 1951) instructing polling officers on how to assist an illiterate voter to cast a secret.', answer: 'A good answer includes: (1) Voter identifies chosen symbol on ballot paper',
                  options: ['A good answer includes: (1) Voter identifies chosen symbol on ballot paper', 'officer stamps for the voter'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the first elections were a smooth, uncontested Congress victory because of Nehru\'s popularity, overlooking the.' }
          ],
            remediations: { 'the-first-elections-were-a': { steps: ['If the student holds the above misconception: (1) Re-read the NCERT section on "The First General Elections" (Chapter.', '(2) Watch the 10-minute documentary "India\'s First Election" (available on YouTube/PIB) showing ballot boxes.', '(3) Compare the 1951-52 election data (turnout, parties, seats) with the 2019 election in a table to see continuity and.', '(4) Re-attempt Diagnostic Questions 3 and 5 with this evidence.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
