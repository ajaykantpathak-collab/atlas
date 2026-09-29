import type { SimDef } from '../../engine/types';
import C9_HistoryCivicsDefinitionConstitutionSignificanceSim from '../../../simulations/c6_12/C9_HistoryCivicsDefinitionConstitutionSignificanceSim';

/** v3 wrapped master — C9_HistoryCivicsDefinitionConstitutionSignificanceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_historycivicsdefinitionconstitutionsignificancesim: SimDef = {
    id: 'v3w_c9_historycivicsdefinitionconstitutionsignificancesim',
    title: 'Democracy: Definition and Core Principles',
    subtitle: 'This node covers the conceptual definition of democracy, its core principles (popular.',
    classLevel: 9, subject: 'history', topic: 'Democracy: Definition and Core Principles',
    chapters: [],
    nodeIds: ['c9_civ_ch1_1', 'c9_civ_ch1_3', 'c9_civ_ch2_1'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Imagine you are reading a news report about a country that holds regular elections but the opposition leaders.', goal: 'Master Democracy: Definition and Core Principles.' },
    discovery: {
        question: 'A country holds elections every five years with universal adult franchise.',
        options: ['No, it lacks substantive democracy', 'yes because elections are held', 'democracy = majority rule'],
        answer: 'No, it lacks substantive democracy',
        hook: 'Students often think "democracy = majority rule" and therefore believe that if a government wins an election with 51%.',
    },
    teaching: [
        { title: 'Democracy is a system of government in which.', text: 'Democracy is a system of government in which supreme political power is vested in the people, who exercise it either directly or through freely elected representatives, under a constitutional.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_civ_ch1_1', title: 'Democracy is a system of government in.',
          scaffold: { problem: 'A state government passes a law requiring all candidates in local body elections to have a minimum educational qualification of Class 10.',
            steps: [
            { text: 'Identify the core democratic principle at stake – political equality (every citizen\'s equal right to participate in.' },
            { text: 'Recall the constitutional provision – Article 243F (for Panchayats) and Article 243V (for Municipalities) allow state.' },
            { text: 'Apply the principle – educational qualifications disproportionately exclude marginalized groups (women, Dalits, poor).' },
            { text: 'Analyze the counter-argument – "competence" argument: representatives need education to govern effectively.' },
            { text: 'Conclude – while legally permissible for local bodies under current precedent, such a law undermines substantive.', faded: true, blankAnswer: 'The law is constitutionally valid for local bodies per.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_civ_ch1_3', title: 'A constitution in a democracy is the.',
          scaffold: { problem: 'The central government passes a law giving the Prime Minister power to dismiss any state government without Governor\'s report or.',
            steps: [
            { text: 'Identify the political situation — a central law attempting to centralize power to dismiss state governments, bypassing.' },
            { text: 'Recall the relevant constitutional provisions — Article 356 allows President\'s Rule only on Governor\'s report or.' },
            { text: 'Apply the principle of federalism as part of the basic structure — the Constitution distributes power between centre.' },
            { text: 'Analyze the roles — the Constitution (not Parliament) defines the federal scheme; Parliament cannot amend this core.' },
            { text: 'Conclude — the law is unconstitutional because it violates the federal basic structure and circumvents Article 356; the.', faded: true, blankAnswer: 'The law is unconstitutional. It violates the federal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_civ_ch2_1', title: 'Elections are the constitutional.',
          scaffold: { problem: 'A student argues: "Since the winning party got only 37% votes but 56% seats, the government lacks democratic legitimacy." Analyze this.',
            steps: [
            { text: 'Identify the core tension – the student is conflating *procedural legitimacy* (winning by constitutional rules) with.' },
            { text: 'Recall that India\'s Constitution adopts First-Past-The-Post (FPTP) system where candidate with most votes wins, not.' },
            { text: 'Apply the distinction: The government has *full legal/procedural legitimacy* because it won under Article 326 and.' },
            { text: 'Analyze the democratic deficit: 63% voted for others, creating a *representativeness gap*.' },
            { text: 'Conclude: The claim is partially correct on substantive grounds but wrong procedurally.', faded: true, blankAnswer: 'The government is procedurally legitimate (constitutionally.' }
            ] } },
        { type: 'dissect', nodeId: 'c9_civ_ch1_3', title: 'Identify each idea',
          dissect: { specimen: 'Democracy: Definition and Core Principles', spots: [
            { id: 's1', label: 'Democracy is a system of', prompt: 'Which idea is this? — Democracy is a system of government in which supreme political power is vested in the.', answer: 'Democracy is a system of', options: ['Democracy is a system of', 'A constitution in a democracy', 'Elections are the constitutional mechanism'] },
            { id: 's2', label: 'A constitution in a democracy', prompt: 'Which idea is this? — A constitution in a democracy is the supreme fundamental law that establishes the.', answer: 'A constitution in a democracy', options: ['A constitution in a democracy', 'Democracy is a system of', 'Elections are the constitutional mechanism'] },
            { id: 's3', label: 'Elections are the constitutional mechanism', prompt: 'Which idea is this? — Elections are the constitutional mechanism through which citizens exercise their.', answer: 'Elections are the constitutional mechanism', options: ['Elections are the constitutional mechanism', 'Democracy is a system of', 'A constitution in a democracy'] }
          ] } }
    ],
    explore: { component: C9_HistoryCivicsDefinitionConstitutionSignificanceSim, prompt: 'Explore the interactive — Democracy: Definition and Core Principles' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_civ_ch1_1', difficulty: 'standard',
          question: 'Democracy is a system of government in which supreme political power is vested.',
          hint: 'Revisit Article 326 (universal adult franchise) and the Preamble\'s "We the people" –.',
          misconception: 'Students often think "democracy = majority rule" and therefore believe that if a government wins an election with 51%.',
          parts: [
                { id: 'a', prompt: 'A country holds elections every five years with universal adult franchise.', answer: 'No, it lacks substantive democracy',
                  options: ['Correct answer: No, it lacks substantive democracy', 'yes because elections are held', 'democracy = majority rule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "democracy = majority rule" and therefore believe that if a government wins an election with 51% votes, it can do.' }
          ],
            remediations: { 'democracy-majority-rule-and-therefore': { steps: ['Re-read the Preamble slowly – highlight "Sovereign... Democratic Republic" and "Liberty, Equality, Fraternity".', 'List the Fundamental Rights (Articles 12-35) and ask: "Can a majority in Parliament take away Article 19 (free speech).', 'Use the "two wolves and a lamb voting on lunch" analogy – democracy is not the vote, it\'s the constitutional protection.', 'Identify one real Indian example where courts struck down a majority government\'s law to protect minority rights (e.g.,.'] } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "democracy = majority rule" and therefore believe that if a government wins an election with 51%.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A democracy that does not protect minority rights against majority decisions is not a true democracy." Use the concepts of.', answer: 'The statement is correct',
                  options: ['Correct answer: The statement is correct', 'democracy = majority rule', 'it has the mandate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "democracy = majority rule" and therefore believe that if a government wins an election with 51% votes, it can do.' }
          ],
            remediations: { 'democracy-majority-rule-and-therefore': { steps: ['Re-read the Preamble slowly – highlight "Sovereign... Democratic Republic" and "Liberty, Equality, Fraternity".', 'List the Fundamental Rights (Articles 12-35) and ask: "Can a majority in Parliament take away Article 19 (free speech).', 'Use the "two wolves and a lamb voting on lunch" analogy – democracy is not the vote, it\'s the constitutional protection.', 'Identify one real Indian example where courts struck down a majority government\'s law to protect minority rights (e.g.,.'] } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_3', difficulty: 'standard',
          question: 'A constitution in a democracy is the supreme fundamental law that establishes.',
          hint: 'Revisit Article 13 (voidness of laws inconsistent with Fundamental Rights) and the.',
          misconception: 'Students often think the Constitution is primarily a list of government powers (what government CAN do) and forget its.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A constitution in a democracy is the supreme fundamental law that establishes the',
                  options: ['A constitution in a democracy is the supreme fundamental law that establishes the', 'Democracy is a system of government in', 'Elections are the constitutional mechanism through'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Constitution is primarily a list of government powers (what government CAN do) and forget its equally critical.' }
          ],
            remediations: { 'the-constitution-is-primarily-a': { steps: ['Give the student two short texts — Article 79 (Parliament constitution) and Article 13 (voidness of rights-violating.', 'Use a concrete case: the 2020 farm laws (repealed) vs. a hypothetical law banning a religion.', 'Have the student complete a table: Column A — Constitutional Provisions that Create Power (cite article); Column B —.', 'Discuss why the amendment procedure (Article 368) is stricter than ordinary law-making — connect to the idea that the.'] } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Constitution is primarily a list of government powers (what government CAN do) and forget its.',
          parts: [
                { id: 'a', prompt: 'Draft a one-paragraph preamble for a new democratic constitution of a diverse country that has just ended a dictatorship.', answer: 'A good preamble would include: (1) source of authority ("We the people..."), (2)',
                  options: ['A good preamble would include: (1) source of authority ("We the people..."), (2)', 'constitutional amendment', 'ordinary law-making'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Constitution is primarily a list of government powers (what government CAN do) and forget its equally critical.' }
          ],
            remediations: { 'the-constitution-is-primarily-a': { steps: ['Give the student two short texts — Article 79 (Parliament constitution) and Article 13 (voidness of rights-violating.', 'Use a concrete case: the 2020 farm laws (repealed) vs. a hypothetical law banning a religion.', 'Have the student complete a table: Column A — Constitutional Provisions that Create Power (cite article); Column B —.', 'Discuss why the amendment procedure (Article 368) is stricter than ordinary law-making — connect to the idea that the.'] } } },
        { type: 'subpart', nodeId: 'c9_civ_ch2_1', difficulty: 'standard',
          question: 'Elections are the constitutional mechanism through which citizens exercise.',
          hint: 'Revisit c8_civ_ch1_3 (Article 326) and c6_civics_ch11_011 (Lincoln\'s definition) to.',
          misconception: 'Students often believe "elections = democracy" and that merely holding regular, multi-party elections with high turnout.',
          parts: [
                { id: 'a', prompt: 'Explain why elections are considered the "primary mechanism" for translating popular sovereignty into governmental authority in a democracy, rather than just.', answer: 'Elections are primary',
                  options: ['Elections are primary', 'elections = democracy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "elections = democracy" and that merely holding regular, multi-party elections with high turnout automatically makes.' },
                { id: 'b', prompt: 'In 2014, a party won 282 seats (52% of Lok Sabha) with 31% vote share. In 2019, the same party won 303 seats (56%) with 37.4% vote share.', answer: 'The data shows FPTP amplifies seat majorities beyond vote majorities, creating a',
                  options: ['The data shows FPTP amplifies seat majorities beyond vote majorities, creating a', 'majority won', 'elections = democracy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "elections = democracy" and that merely holding regular, multi-party elections with high turnout automatically makes.' }
          ],
            remediations: { 'elections-democracy-and-that-merely': { steps: ['Contrast two Indian election scenarios – 1977 (post-Emergency, genuine choice, high accountability) vs.', 'Use the "Polyarchy" checklist (Dahl): free/fair elections, inclusive suffrage, right to run, free expression,.', 'Map each Indian election to this checklist – students identify which dimensions are met and which are compromised.', 'Conclude that elections are *necessary but not sufficient* for democracy; they require a surrounding ecosystem of.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
