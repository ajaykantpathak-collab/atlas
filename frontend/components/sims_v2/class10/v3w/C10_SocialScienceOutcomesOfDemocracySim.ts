import type { SimDef } from '../../engine/types';
import C10_SocialScienceOutcomesOfDemocracySim from '../../../simulations/c6_12/C10_SocialScienceOutcomesOfDemocracySim';

/** v3 wrapped master — C10_SocialScienceOutcomesOfDemocracySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_socialscienceoutcomesofdemocracysim: SimDef = {
    id: 'v3w_c10_socialscienceoutcomesofdemocracysim',
    title: 'Accountable, Responsive and Legitimate Government Under Democracy',
    subtitle: 'This node covers the *meaning*, *significance*, and *institutional mechanisms* of.',
    classLevel: 10, subject: 'science', topic: 'Accountable, Responsive and Legitimate Government Under Democracy',
    chapters: [],
    nodeIds: ['c10_civ_cbse_05_001', 'c10_civ_cbse_05_002', 'c10_civ_cbse_05_003', 'c10_civ_cbse_05_005', 'c10_civ_cbse_05_006', 'c10_civ_cbse_05_007', 'c10_civ_cbse_04_006', 'c10_civ_cbse_05_004', 'c10_civ_cbse_04_001', 'c10_civ_cbse_04_002', 'c10_civ_cbse_04_003', 'c10_civ_cbse_04_004', 'c10_civ_cbse_04_005', 'c10_civ_cbse_04_007', 'c10_civ_cbse_04_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you applied for a scholarship under a government scheme but the money never reached your bank.', goal: 'Master Accountable, Responsive and Legitimate Government Under Democracy.' },
    discovery: {
        question: 'A municipal corporation fails to collect garbage in a ward for three months despite repeated complaints.',
        options: ['**Missing attribute:** Responsiveness', 'vote them out next election', 'write to the Mayor'],
        answer: '**Missing attribute:** Responsiveness',
        hook: 'Students often think **accountability = elections only**. They write: "Government is accountable because we can vote.',
    },
    teaching: [
        { title: 'In a democracy, an **accountable.', text: 'In a democracy, an **accountable government** is one where rulers are answerable to citizens for their decisions and actions through institutional mechanisms like elections, parliamentary oversight,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_civ_cbse_05_001', title: 'In a democracy, an **accountable.',
          scaffold: { problem: 'A State Government announces a new farm loan waiver scheme. Farmers complain that the online portal crashes, district officials demand.',
            steps: [
            { text: 'Identify the three violations — portal crash = **responsiveness failure** (service delivery broken); bribe demand =.' },
            { text: 'Recall relevant mechanisms — Responsiveness: **Public Service Guarantee Act** (state-level) or **CPGRAMS** (central.' },
            { text: 'Apply to scenario — Farmers can file RTI for portal downtime logs; approach Lokayukta with bribe evidence; meet their.' },
            { text: 'Analyse roles — Executive (Minister/Officials) failed on delivery and integrity; Legislature (MLAs) must exercise.' },
            { text: 'Conclude — Democracy\'s three attributes are interdependent: without accountability (anti-corruption), responsiveness.', faded: true, blankAnswer: 'Violations: Responsiveness (broken portal), Accountability.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_civ_cbse_05_002', title: 'Economic Growth and Development Under.',
          scaffold: { problem: 'In a 2022 board exam case-study question, students were given data: Country A (dictatorship) GDP growth 8% annually, literacy 65%, infant.',
            steps: [
            { text: 'Identify the core concept being tested — the distinction between economic growth (GDP rate) and economic development.' },
            { text: 'Recall the textbook\'s position: democracy may have lower growth but better human development outcomes due to.' },
            { text: 'Analyze Country A: high growth but poor social indicators suggests growth is not translating into broad-based.' },
            { text: 'Analyze Country B: moderate growth but excellent social indicators suggests democratic mechanisms (free press,.' },
            { text: 'Synthesize: Country B has better development because development = expansion of capabilities (Sen), not just output.' },
            { text: 'Formulate board-style answer: "Country B. Argument 1: Development includes health/education, not only GDP.', faded: true, blankAnswer: 'Country B has achieved better development. (1) Development.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_civ_cbse_05_003', title: 'Reduction of inequality and poverty in.',
          scaffold: { problem: 'A student reads that India\'s poverty rate fell from 45% (1993) to 22% (2011) but the Gini coefficient rose from 0.32 to 0.35.',
            steps: [
            { text: 'Identify the two metrics — poverty headcount ratio (absolute deprivation) and Gini coefficient (relative inequality).' },
            { text: 'Recall democratic theory: democracies respond to median voter who is often poor, so they prioritize poverty alleviation.' },
            { text: 'Note that inequality reduction requires progressive taxation and asset redistribution, which face stronger elite.' },
            { text: 'Analyze India\'s case: High political competition forced poverty-reducing schemes, but weak state capacity and elite.' },
            { text: 'Conclude: Democracy\'s accountability mechanism works better for visible, targeted transfers (poverty) than for.', faded: true, blankAnswer: 'Democracy reduces poverty more effectively than inequality.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_civ_cbse_05_005', title: 'Dignity and Freedom of Citizens in a.',
          scaffold: { problem: 'A transgender student, Riya, is denied admission to a government‑aided school because the admission form has only “Male/Female” gender.',
            steps: [
            { text: 'Identify the core issue — denial of admission based on gender identity violates the right to equality and dignity.' },
            { text: 'Recall Article 14 (equality before law), Article 15 (prohibition of discrimination on grounds of sex), and Article 21.' },
            { text: 'Apply the Supreme Court’s NALSA judgment (2014) which recognised transgender persons as “third gender” and held that.' },
            { text: 'Analyse the school’s defence — “administrative convenience” is not a reasonable restriction under Article 19(2) nor a.' },
            { text: 'Conclude that Riya’s dignity (Article 21) and freedom of expression (Article 19(1)(a) — expressing gender identity) are.', faded: true, blankAnswer: 'Riya’s dignity and freedom are violated. The school must.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_civ_cbse_05_006', title: 'Democracy\'s strengths include.',
          scaffold: { problem: 'A student claims, "China\'s authoritarian system has lifted millions out of poverty faster than India\'s democracy, so dictatorship is better.',
            steps: [
            { text: 'Identify the claim\'s core comparison — economic growth speed under authoritarianism vs. democracy.' },
            { text: 'Recall the relevant chapter concepts: c10_civ_cbse_05_002 (Economic Growth) and c10_civ_cbse_05_003 (Reduction of.' },
            { text: 'Apply the principle that democracy\'s growth may be slower but more equitable and sustainable; cite India\'s steady.' },
            { text: 'Analyze the trade-off: dictatorship can mobilize resources quickly but lacks feedback mechanisms (free press,.' },
            { text: 'Conclude that "better" depends on valuation of equity, freedom, and error-correction, not just speed; democracy\'s.', faded: true, blankAnswer: 'The claim is reductionist. While China\'s poverty reduction.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_civ_cbse_05_007', title: 'Assessing democracy\'s outcomes means.',
          scaffold: { problem: 'A newspaper editorial claims: "State A is a model democracy because it has had 15 years of uninterrupted elected government and 8% annual.',
            steps: [
            { text: 'Identify the claim\'s evidence — procedural stability (elections) and aggregate growth (GDP).' },
            { text: 'Recall the NCERT evaluation criteria: (i) Accountable/responsive/legitimate govt, (ii) Economic growth *and.' },
            { text: 'Check which criteria the editorial addresses — only (i) partially (elections ≠ full accountability) and (ii) partially.' },
            { text: 'Identify missing criteria — no data on inequality (Gini), poverty headcount, communal violence, caste atrocities,.' },
            { text: 'Conclude — the claim commits **single-criterion fallacy** (growth) and **procedural fallacy** (elections).', faded: true, blankAnswer: 'The claim is **incomplete and potentially misleading**..' }
            ] } },
        { type: 'dissect', nodeId: 'c10_civ_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Accountable, Responsive and Legitimate Government Under Democracy', spots: [
            { id: 's1', label: 'In a democracy an accountable', prompt: 'Which idea is this? — In a democracy, an **accountable government** is one where rulers are answerable to.', answer: 'In a democracy an accountable', options: ['In a democracy an accountable', 'Economic Growth and Development Under', 'Reduction of inequality and poverty', 'Dignity and Freedom of Citizens'] },
            { id: 's2', label: 'Economic Growth and Development Under', prompt: 'Which idea is this? — Economic Growth and Development Under Democracy refers to the relationship between.', answer: 'Economic Growth and Development Under', options: ['Economic Growth and Development Under', 'In a democracy an accountable', 'Reduction of inequality and poverty', 'Dignity and Freedom of Citizens'] },
            { id: 's3', label: 'Reduction of inequality and poverty', prompt: 'Which idea is this? — Reduction of inequality and poverty in democracies refers to the expectation that.', answer: 'Reduction of inequality and poverty', options: ['Reduction of inequality and poverty', 'In a democracy an accountable', 'Economic Growth and Development Under', 'Dignity and Freedom of Citizens'] },
            { id: 's4', label: 'Dignity and Freedom of Citizens', prompt: 'Which idea is this? — Dignity and Freedom of Citizens in a Democracy refers to the constitutional guarantee.', answer: 'Dignity and Freedom of Citizens', options: ['Dignity and Freedom of Citizens', 'In a democracy an accountable', 'Economic Growth and Development Under', 'Reduction of inequality and poverty'] },
            { id: 's5', label: 'Democracys strengths include accountability responsiveness', prompt: 'Which idea is this? — Democracy\'s strengths include accountability, responsiveness, legitimacy, accommodation.', answer: 'Democracys strengths include accountability responsiveness', options: ['Democracys strengths include accountability responsiveness', 'In a democracy an accountable', 'Economic Growth and Development Under', 'Reduction of inequality and poverty'] },
            { id: 's6', label: 'Assessing democracys outcomes means evaluating', prompt: 'Which idea is this? — Assessing democracy\'s outcomes means evaluating the performance of a democratic system.', answer: 'Assessing democracys outcomes means evaluating', options: ['Assessing democracys outcomes means evaluating', 'In a democracy an accountable', 'Economic Growth and Development Under', 'Reduction of inequality and poverty'] }
          ] } }
    ],
    explore: { component: C10_SocialScienceOutcomesOfDemocracySim, prompt: 'Explore the interactive — Accountable, Responsive and Legitimate Government Under Democracy' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_001', difficulty: 'standard',
          question: 'In a democracy, an **accountable government** is one where rulers are.',
          hint: 'If stuck, re-read **c9_civ_ch1_7 (Elections and Accountability in Democracy)** for the.',
          misconception: 'Students often think **accountability = elections only**. They write: "Government is accountable because we can vote.',
          parts: [
                { id: 'a', prompt: 'A municipal corporation fails to collect garbage in a ward for three months despite repeated complaints.', answer: '**Missing attribute:** Responsiveness',
                  options: ['**Missing attribute:** Responsiveness', 'vote them out next election', 'write to the Mayor'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **accountability = elections only**. They write: "Government is accountable because we can vote them out." This.' }
          ],
            remediations: { 'accountability-elections-only': { steps: ['** Take a recent newspaper report (e.g., "CAG audit reveals ₹XXX crore irregularity in Scheme Y"). **', '** Identify *which* mechanism exposed it (CAG → PAC → Parliament). **', '** Trace the chain: CAG (independent auditor) → Report tabled in Parliament → Public Accounts Committee (MPs from all.', '** Ask: "Could an election have caught this specific irregularity?" No — elections are too blunt.'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **accountability = elections only**. They write: "Government is accountable because we can vote.',
          parts: [
                { id: 'a', prompt: 'Draft a one-paragraph citizen\'s charter clause for a Passport Seva Kendra that operationalises *all three* attributes — accountability, responsiveness,.', answer: '**Sample clause:** "The Passport Seva Kendra commits to: (1) **Accountability**',
                  options: ['**Sample clause:** "The Passport Seva Kendra commits to: (1) **Accountability**', '**accountability = elections only**'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think **accountability = elections only**. They write: "Government is accountable because we can vote them out." This.' }
          ],
            remediations: { 'accountability-elections-only': { steps: ['** Take a recent newspaper report (e.g., "CAG audit reveals ₹XXX crore irregularity in Scheme Y"). **', '** Identify *which* mechanism exposed it (CAG → PAC → Parliament). **', '** Trace the chain: CAG (independent auditor) → Report tabled in Parliament → Public Accounts Committee (MPs from all.', '** Ask: "Could an election have caught this specific irregularity?" No — elections are too blunt.'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_002', difficulty: 'standard',
          question: 'Economic Growth and Development Under Democracy refers to the relationship.',
          hint: 'Revisit c10_eco_cbse_01_001 (Development Indicators) and c9_civ_ch1_7 (Accountability in.',
          misconception: 'Students believe "democracy guarantees economic development" or "dictatorship is better for growth." The textbook.',
          parts: [
                { id: 'a', prompt: 'A country transitions from military dictatorship to democracy.', answer: 'The growth decline reflects democratic transition costs: policy uncertainty, new',
                  options: ['The growth decline reflects democratic transition costs: policy uncertainty, new', 'democracy failed', 'democracy guarantees economic development'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "democracy guarantees economic development" or "dictatorship is better for growth." The textbook shows: (1) Democracies.' }
          ],
            remediations: { 'democracy-guarantees-economic-development-or': { steps: ['Re-read the textbook table comparing growth rates (1950-2000) — note the 0.47% difference is small compared to.', 'Watch the 5-minute video "Democracy and Development: The Evidence" (NCERT official) showing Botswana (democracy, high.', 'Write a 50-word answer: "Democracy does not guarantee high growth but prevents catastrophic failure and ensures gains.', 'Practice the 2023 CBSE sample paper Q12 (case-based on Kerala vs Gujarat development models).'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "democracy guarantees economic development" or "dictatorship is better for growth." The textbook.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Democracy is a luxury poor countries cannot afford; they need dictatorship first to generate growth, then democratize." Use evidence from.', answer: 'The claim is empirically unsupported',
                  options: ['The claim is empirically unsupported', 'democracy guarantees economic development', 'dictatorship is better for growth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "democracy guarantees economic development" or "dictatorship is better for growth." The textbook shows: (1) Democracies.' },
                { id: 'b', prompt: 'Design a 3-indicator dashboard to assess whether a democracy is delivering "economic development" (not just growth) for its citizens. Justify each indicator.', answer: '1) Per capita GDP (PPP-adjusted)',
                  options: ['1) Per capita GDP (PPP-adjusted)', 'democracy guarantees economic development', 'dictatorship is better for growth'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe "democracy guarantees economic development" or "dictatorship is better for growth." The textbook shows: (1) Democracies.' }
          ],
            remediations: { 'democracy-guarantees-economic-development-or': { steps: ['Re-read the textbook table comparing growth rates (1950-2000) — note the 0.47% difference is small compared to.', 'Watch the 5-minute video "Democracy and Development: The Evidence" (NCERT official) showing Botswana (democracy, high.', 'Write a 50-word answer: "Democracy does not guarantee high growth but prevents catastrophic failure and ensures gains.', 'Practice the 2023 CBSE sample paper Q12 (case-based on Kerala vs Gujarat development models).'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_003', difficulty: 'standard',
          question: 'Reduction of inequality and poverty in democracies refers to the expectation.',
          hint: 'Revisit Class 7 node c7_civ_ch02_009 (Directive Principles) and Class 10 node.',
          misconception: 'Students often believe democracy automatically reduces both inequality and poverty because "majority rule means poor.',
          parts: [
                { id: 'a', prompt: 'Explain why democracies are theoretically more likely to adopt redistributive policies than authoritarian regimes, even though both may face poverty.', answer: 'In democracies, the poor constitute a large voting bloc',
                  options: ['In democracies, the poor constitute a large voting bloc', 'democracies are kinder', 'majority rule means poor majority gets what it wants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe democracy automatically reduces both inequality and poverty because "majority rule means poor majority gets what it.' },
                { id: 'b', prompt: 'A state government launches a new cash-transfer scheme for landless agricultural laborers.', answer: 'Mechanism: Electoral accountability',
                  options: ['Mechanism: Electoral accountability', 'bureaucratic efficiency', 'majority rule means poor majority gets what it wants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe democracy automatically reduces both inequality and poverty because "majority rule means poor majority gets what it.' }
          ],
            remediations: { 'democracy-automatically-reduces-both-inequality': { steps: ['Show the Oxfam India 2023 inequality report graph — rising top 1% share alongside falling poverty headcount.', 'Ask student to list three democratic mechanisms that *should* have prevented this (e.g., progressive tax, welfare, land.', 'For each, identify the breakdown (e.g., tax evasion, exclusion errors in PDS, weak land reform enforcement).', 'Conclude: Democracy provides tools, but outcomes depend on state capacity and citizen organization.'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe democracy automatically reduces both inequality and poverty because "majority rule means poor.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "India\'s democracy has failed to reduce economic inequality because the Gini coefficient has risen since 1991." Provide a nuanced judgment.', answer: 'The claim is partially valid but incomplete',
                  options: ['The claim is partially valid but incomplete', 'democracy failed', 'democracy succeeded', 'majority rule means poor majority gets what it wants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe democracy automatically reduces both inequality and poverty because "majority rule means poor majority gets what it.' }
          ],
            remediations: { 'democracy-automatically-reduces-both-inequality': { steps: ['Show the Oxfam India 2023 inequality report graph — rising top 1% share alongside falling poverty headcount.', 'Ask student to list three democratic mechanisms that *should* have prevented this (e.g., progressive tax, welfare, land.', 'For each, identify the breakdown (e.g., tax evasion, exclusion errors in PDS, weak land reform enforcement).', 'Conclude: Democracy provides tools, but outcomes depend on state capacity and citizen organization.'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_005', difficulty: 'standard',
          question: 'Dignity and Freedom of Citizens in a Democracy refers to the constitutional.',
          hint: 'Revisit Article 21 (Right to Life and Personal Liberty) and its expansive interpretation.',
          misconception: 'Students believe “freedom of speech” in a democracy is absolute — they argue hate speech, fake news, or incitement to.',
          parts: [
                { id: 'a', prompt: 'Name the constitutional article that empowers the Supreme Court to issue writs for the enforcement of Fundamental Rights.', answer: 'Article 32',
                  options: ['Article 32', 'freedom of speech', 'democracy means total freedom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe “freedom of speech” in a democracy is absolute — they argue hate speech, fake news, or incitement to violence are.' },
                { id: 'b', prompt: 'A state government bans all public protests in the capital city indefinitely citing “law and order.” Which Fundamental Right is primarily restricted, and what.', answer: 'The right restricted is Freedom of Assembly under Article 19(1)(b)',
                  options: ['The right restricted is Freedom of Assembly under Article 19(1)(b)', 'the government can ban anything for law and order', 'freedom of speech'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe “freedom of speech” in a democracy is absolute — they argue hate speech, fake news, or incitement to violence are.' }
          ],
            remediations: { 'freedom-of-speech-in-a': { steps: ['Show the Supreme Court’s 2023 judgment in *Shaheen Abdullah v.', 'Read Article 19(2) together — list the eight grounds for restriction.', 'Discuss a recent news item (e.g., social media regulation) and ask: “Which ground of restriction applies here?”', 'Have the student rewrite a flawed answer inserting the phrase “subject to reasonable restrictions under Article 19(2).”'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_006', difficulty: 'standard',
          question: 'Democracy\'s strengths include accountability, responsiveness, legitimacy,.',
          hint: 'If stuck, revisit c7_civ_ch01_010 (Comparison of Different Types of Government) and the.',
          misconception: 'Students often think "democracy is weak because it is slow" and "dictatorship is strong because it is fast," ignoring.',
          parts: [
                { id: 'a', prompt: 'A country switches from democracy to military rule. The new regime claims it will reduce corruption by removing political parties.', answer: 'Unlikely',
                  options: ['Unlikely', 'democracy is weak', 'dictatorship is strong'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "democracy is weak because it is slow" and "dictatorship is strong because it is fast," ignoring that democracy’s.' }
          ],
            remediations: { 'democracy-is-weak-because-it': { steps: ['Re-read the case of India’s 1975-77 Emergency (a democratic suspension) vs.', 'Compare with a dictatorship (e.g., North Korea) where no such feedback exists.', 'Use the table in NCERT Chapter 7 (Outcomes of Democracy) to list each strength/weakness with Indian evidence.', 'Practice writing a 3-mark answer: "Explain why democracy is considered better than dictatorship despite slower.'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "democracy is weak because it is slow" and "dictatorship is strong because it is fast," ignoring.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Democracy is inferior to dictatorship because it cannot take tough economic decisions quickly." Consider evidence from.', answer: 'The argument is flawed',
                  options: ['The argument is flawed', 'democracy is weak', 'dictatorship is strong'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "democracy is weak because it is slow" and "dictatorship is strong because it is fast," ignoring that democracy’s.' }
          ],
            remediations: { 'democracy-is-weak-because-it': { steps: ['Re-read the case of India’s 1975-77 Emergency (a democratic suspension) vs.', 'Compare with a dictatorship (e.g., North Korea) where no such feedback exists.', 'Use the table in NCERT Chapter 7 (Outcomes of Democracy) to list each strength/weakness with Indian evidence.', 'Practice writing a 3-mark answer: "Explain why democracy is considered better than dictatorship despite slower.'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_007', difficulty: 'standard',
          question: 'Assessing democracy\'s outcomes means evaluating the performance of a democratic.',
          hint: 'If stuck, revisit the specific sibling node for that criterion (e.g., for "accommodation.',
          misconception: 'Students often believe **"Democracy\'s outcome is just whether elections are held regularly and freely."** They equate.',
          parts: [
                { id: 'a', prompt: 'Name any three criteria used to assess the outcomes of democracy as per the Class 10 NCERT framework.', answer: 'Any three of',
                  options: ['Correct answer: Any three of', 'free media, independent judiciary, federalism', 'Democracy\'s outcome is just whether elections are held regularly and freely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **"Democracy\'s outcome is just whether elections are held regularly and freely."** They equate *procedural.' }
          ],
            remediations: { 'democracy-s-outcome-is-just': { steps: ['**Re-read the chapter\'s opening case study** (usually a comparison of two countries or a cartoon) — identify which.', '**Make a two-column table:** Column A = "Procedural feature" (e.g., universal franchise), Column B = "Outcome criterion.', '**Take a recent newspaper report** on a government scheme (e.g., PM-KISAN, Jal Jeevan Mission).', 'Tag each paragraph with the criterion it speaks to.'] } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe **"Democracy\'s outcome is just whether elections are held regularly and freely."** They equate.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "If a democracy has high GDP growth, it is performing well on outcomes." Use at least two other criteria from the framework to justify.', answer: 'Correct critique: GDP growth is **necessary but insufficient**',
                  options: ['Correct critique: GDP growth is **necessary but insufficient**', 'GDP growth means people have money, so it\'s good', 'Democracy\'s outcome is just whether elections are held regularly and freely', '**"Democracy\'s outcome is just whether elections are held regularly and freely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **"Democracy\'s outcome is just whether elections are held regularly and freely."** They equate *procedural.' },
                { id: 'b', prompt: 'Design a **Democracy Report Card** for your district. Choose four indicators (one per criterion) that a citizen group could realistically track using public.', answer: 'Expected answer (sample): 1',
                  options: ['Expected answer (sample): 1', 'Democracy\'s outcome is just whether elections are held regularly and freely', '**"Democracy\'s outcome is just whether elections are held regularly and freely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe **"Democracy\'s outcome is just whether elections are held regularly and freely."** They equate *procedural.' }
          ],
            remediations: { 'democracy-s-outcome-is-just': { steps: ['**Re-read the chapter\'s opening case study** (usually a comparison of two countries or a cartoon) — identify which.', '**Make a two-column table:** Column A = "Procedural feature" (e.g., universal franchise), Column B = "Outcome criterion.', '**Take a recent newspaper report** on a government scheme (e.g., PM-KISAN, Jal Jeevan Mission).', 'Tag each paragraph with the criterion it speaks to.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
