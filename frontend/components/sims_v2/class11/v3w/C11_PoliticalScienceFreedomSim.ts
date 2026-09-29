import type { SimDef } from '../../engine/types';
import C11_PoliticalScienceFreedomSim from '../../../simulations/c6_12/C11_PoliticalScienceFreedomSim';

/** v3 wrapped master — C11_PoliticalScienceFreedomSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_politicalsciencefreedomsim: SimDef = {
    id: 'v3w_c11_politicalsciencefreedomsim',
    title: 'The Ideal of Freedom: Why freedom is valued',
    subtitle: 'This node covers the philosophical justification for valuing freedom, the two core.',
    classLevel: 11, subject: 'political_science', topic: 'The Ideal of Freedom: Why freedom is valued',
    chapters: [],
    nodeIds: ['c11_ps_cbse_02_001', 'c11_ps_cbse_02_002', 'c11_ps_cbse_02_003', 'c11_ps_cbse_02_004', 'c11_ps_cbse_02_005', 'c11_ps_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a Class 11 student, Priya, who wants to pursue a career in music, but her parents insist she prepare.', goal: 'Master The Ideal of Freedom: Why freedom is valued.' },
    discovery: {
        question: 'According to the NCERT text, what are the two dimensions of freedom discussed in the chapter "Freedom"?',
        options: ['The two dimensions are **Negative Liberty** (freedom as the absence of external', 'Political and Economic freedom', 'Freedom of Expression'],
        answer: 'The two dimensions are **Negative Liberty** (freedom as the absence of external',
        hook: '**Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone stopping me." (Equating.',
    },
    teaching: [
        { title: 'Freedom, as an ideal, is the condition that.', text: 'Freedom, as an ideal, is the condition that allows individuals to be in control of their own lives and destinies, enabling them to make autonomous choices and develop their potential.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_ps_cbse_02_001', title: 'Freedom, as an ideal, is the condition.',
          scaffold: { problem: 'The NCERT text (p. 18) says freedom represents the "desire of people to be in control of their own lives and destinies." A state passes a.',
            steps: [
            { text: 'Identify the core conflict: Compulsion (constraint) vs. Democratic Participation (self-governance).' },
            { text: 'Apply **Negative Liberty**: The law imposes an external constraint (fine/penalty for not voting).' },
            { text: 'Apply **Positive Liberty**: The law aims to create an *enabling condition*—a truly representative government where all.' },
            { text: 'Synthesise using NCERT p. 28: "Generally they both go together...' },
            { text: 'Conclusion: The law is a **trade-off**. It violates negative liberty to potentially strengthen positive liberty.', faded: true, blankAnswer: 'The law violates Negative Liberty (compulsion) but may.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_02_002', title: 'Negative liberty, as articulated by.',
          scaffold: { problem: 'A state government issues an order banning the sale and consumption of beef across the state, citing cultural sentiments of the majority.',
            steps: [
            { text: 'Identify the core claim: The citizen argues food choice is a self-regarding action within their \'minimum area of.' },
            { text: 'Identify the state\'s justification: The state claims the action is other-regarding because it hurts religious.' },
            { text: 'Apply the Harm Principle test: Does beef consumption cause \'serious harm\' to *definite others* in the Millian sense.' },
            { text: 'Consult constitutional precedent (Indian context): Article 21 (Right to Privacy/Personal Liberty) includes food choice.' },
            { text: 'Evaluate proportionality: A total ban is a disproportionate constraint on the minimum area (diet) for a non-Millian.' },
            { text: 'Conclusion: The ban violates negative liberty because it imposes majority morality on a self-regarding choice without.', faded: true, blankAnswer: 'The beef ban violates negative liberty. Food choice is a.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_02_003', title: 'Positive liberty is the freedom to be.',
          scaffold: { problem: 'The Tamil Nadu government provides free bicycles to girl students in government schools to reduce dropout rates.',
            steps: [
            { text: 'Identify the structural barrier – gendered access to education due to distance, safety concerns, and patriarchal norms.' },
            { text: 'Recall positive liberty\'s core claim – freedom requires removal of structural domination (patriarchy, poverty) not just.' },
            { text: 'Apply the enabling conditions framework – the bicycle addresses material (transport cost) and social (safety/mobility).' },
            { text: 'Evaluate against autonomy criterion – does it enhance girls\' capacity to choose?' },
            { text: 'Conclude – This is a positive liberty measure because it dismantles a structural constraint on girls\' agency, not mere.', faded: true, blankAnswer: 'The policy promotes positive liberty by removing a.' }
            ] } },
        { type: 'case', nodeId: 'c11_ps_cbse_02_004', title: 'Negative liberty is the absence of.',
          caseStudy: { intro: 'Imagine a student who wants to become a musician but their parents force them to study engineering.',
            decisions: [{ prompt: 'Define negative liberty and positive liberty in one sentence each, using the phrases "freedom from" and "freedom to" respectively.', options: [
                { text: 'Negative liberty is "freedom from" external interference, defining a minimum area of', outcome: 'Negative liberty is "freedom from" external interference, defining a minimum area of.' },
                { text: 'absence of constraints', outcome: 'Not quite — Students think **negative liberty means "no rules at all" (anarchy)** and **positive liberty means.', reveals: 'negative-liberty-means-no-rules' },
                { text: 'no rules at all', outcome: 'Not quite — Students think **negative liberty means "no rules at all" (anarchy)** and **positive liberty means.', reveals: 'negative-liberty-means-no-rules' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_02_005', title: 'Constraints on freedom refer to.',
          scaffold: { problem: 'Ravi, a 17‑year‑old from a rural district, wants to study environmental science.',
            steps: [
            { text: 'Identify the agent’s desired choice (environmental science degree).' },
            { text: 'Map each obstacle to a constraint category: father’s insistence = social pressure; lack of internet/college info =.' },
            { text: 'Determine whether each constraint is external and non‑voluntary: social pressure is enforced by family honour;.' },
            { text: 'Assess justifiability: social pressure and ignorance are unjustified constraints; the domicile rule may be a reasonable.' },
            { text: 'Conclude that Ravi’s negative liberty is violated by all three, and his positive liberty (capacity to pursue the.', faded: true, blankAnswer: 'Ravi faces social pressure (family), ignorance (information.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_02_006', title: 'The Harm Principle, articulated by J.S..',
          scaffold: { problem: 'A municipal corporation passes a by-law prohibiting street vendors from operating within 500 meters of schools, citing "traffic congestion.',
            steps: [
            { text: 'Identify the action being restricted — street vending near schools.' },
            { text: 'Determine if the action causes *harm* to others. The corporation cites traffic congestion (delay, accident risk) and.' },
            { text: 'Assess the *seriousness* of the harm. Traffic congestion causing daily delays and increased accident probability near.' },
            { text: 'Evaluate *proportionality* — is a total ban within 500m the least restrictive means?' },
            { text: 'Conclusion — The *objective* (preventing harm) is legitimate under the Harm Principle, but the *means* (absolute 500m.', faded: true, blankAnswer: 'The by-law\'s *purpose* satisfies the Harm Principle.' }
            ] } }
    ],
    explore: { component: C11_PoliticalScienceFreedomSim, prompt: 'Explore the interactive — The Ideal of Freedom: Why freedom is valued' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_001', difficulty: 'standard',
          question: 'Freedom, as an ideal, is the condition that allows individuals to be in control.',
          hint: 'Revisit Class 9 Civics Ch 2 \'Constitutional Design\' (Fundamental Rights) and Class 10.',
          misconception: '**Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone stopping me." (Equating.',
          parts: [
                { id: 'a', prompt: 'According to the NCERT text, what are the two dimensions of freedom discussed in the chapter "Freedom"?', answer: 'The two dimensions are **Negative Liberty** (freedom as the absence of external',
                  options: ['The two dimensions are **Negative Liberty** (freedom as the absence of external', 'Political and Economic freedom', 'Freedom of Expression'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone stopping me." (Equating Freedom with.' }
          ],
            remediations: { 'misconception-freedom-means-i-can': { steps: ['20, Para 1:** "No individual living in society can hope to enjoy total absence of any kind of constraints." 2.', '**Concrete Activity:** List 5 constraints you follow daily (uniform, traffic signals, submission deadlines, library.', 'For each, ask: "Does this constraint *destroy* my freedom, or *enable* a larger freedom?" (e.g., Traffic signals.', '**Key Distinction:** Memorise the NCERT phrase: **"Socially necessary constraints" vs "Unjust restrictions."** The.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone stopping me." (Equating.',
          parts: [
                { id: 'a', prompt: 'Aung San Suu Kyi defines real freedom as **"freedom from fear."** Evaluate this claim: Does "freedom from fear" belong to Negative Liberty (absence of external.', answer: 'It bridges **both**',
                  options: ['It bridges **both**', 'Freedom of Expression'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone stopping me." (Equating Freedom with.' },
                { id: 'b', prompt: '**Create:** Draft a 100-word preamble for a "Student Charter of Freedom" for your school.', answer: '**Criteria for a good answer:** 1',
                  options: ['**Criteria for a good answer:** 1', 'Freedom of Expression'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Freedom means I can do whatever I want, whenever I want, without anyone stopping me." (Equating Freedom with.' }
          ],
            remediations: { 'misconception-freedom-means-i-can': { steps: ['20, Para 1:** "No individual living in society can hope to enjoy total absence of any kind of constraints." 2.', '**Concrete Activity:** List 5 constraints you follow daily (uniform, traffic signals, submission deadlines, library.', 'For each, ask: "Does this constraint *destroy* my freedom, or *enable* a larger freedom?" (e.g., Traffic signals.', '**Key Distinction:** Memorise the NCERT phrase: **"Socially necessary constraints" vs "Unjust restrictions."** The.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_002', difficulty: 'standard',
          question: 'Negative liberty, as articulated by Isaiah Berlin, refers to the absence of.',
          hint: 'Revisit Mill\'s Harm Principle (node c11_ps_cbse_02_006 preview) and the NCERT \'Let\'s.',
          misconception: 'Students often equate \'negative liberty\' with \'total absence of all rules\' (anarchy) or confuse it with \'freedom to do.',
          parts: [
                { id: 'a', prompt: 'A state passes a law banning all religious symbols in public schools to promote secular equality.', answer: 'Yes, it violates negative liberty',
                  options: ['Yes, it violates negative liberty', 'it\'s justified because equality is more important', 'it\'s never justified'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate \'negative liberty\' with \'total absence of all rules\' (anarchy) or confuse it with \'freedom to do whatever I want\'.' }
          ],
            remediations: { 'students-often-equate-negative-liberty': { steps: ['If the student conflates negative liberty with license or anarchy: 1) Have them read Article 19(1) and 19(2) of the.', '2) Ask: "Does 19(2) destroy 19(1) or define its boundary?" 3) Use the NCERT\'s traffic signal analogy: the state.', '4) Assign a 100-word write-up: "Why a right without a remedy (or boundary) is not a right."'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate \'negative liberty\' with \'total absence of all rules\' (anarchy) or confuse it with \'freedom to do.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Negative liberty is sufficient for a free society because if the state simply stops interfering, individuals will automatically flourish.".', answer: 'The claim is insufficient',
                  options: ['The claim is insufficient', 'yes, state non-interference is enough', 'no, the state must provide everything'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate \'negative liberty\' with \'total absence of all rules\' (anarchy) or confuse it with \'freedom to do whatever I want\'.' }
          ],
            remediations: { 'students-often-equate-negative-liberty': { steps: ['If the student conflates negative liberty with license or anarchy: 1) Have them read Article 19(1) and 19(2) of the.', '2) Ask: "Does 19(2) destroy 19(1) or define its boundary?" 3) Use the NCERT\'s traffic signal analogy: the state.', '4) Assign a 100-word write-up: "Why a right without a remedy (or boundary) is not a right."'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_003', difficulty: 'standard',
          question: 'Positive liberty is the freedom to be one\'s own master, involving the capacity.',
          hint: 'Review the "minimum area of non-interference" concept in c11_ps_cbse_02_002 and the.',
          misconception: 'Students often believe positive liberty means the state should provide everything people want, confusing "enabling.',
          parts: [
                { id: 'a', prompt: 'A state provides free higher education to all citizens but bans student unions and political activity on campuses.', answer: 'The policy partially promotes positive liberty by providing material resources',
                  options: ['The policy partially promotes positive liberty by providing material resources', 'it promotes positive liberty', 'it undermines positive liberty completely'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe positive liberty means the state should provide everything people want, confusing "enabling conditions for autonomy".' }
          ],
            remediations: { 'positive-liberty-means-the-state': { steps: ['If a student holds this misconception, use the Mid-Day Meal Scheme as a case study: Step 1 – Identify the scheme\'s goal.', 'Step 2 – Ask: Does it force children to eat?', 'Step 3 – Ask: Does it enable them to study better?', 'Step 4 – Conclude: It creates conditions for autonomy (learning) without dictating choices, illustrating positive.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_004', difficulty: 'standard',
          question: 'Negative liberty is the absence of external constraints or interference that.',
          hint: 'Re-read NCERT Section 2.5 (pages 26-28) focusing on the phrases "minimum area of.',
          misconception: 'Students think **negative liberty means "no rules at all" (anarchy)** and **positive liberty means "the state provides.',
          parts: [
                { id: 'a', prompt: 'Compare how negative liberty and positive liberty theorists would view the state\'s role in providing *free public higher education*.', answer: 'Negative liberty (e.g., Mill, Berlin): The state should not *prevent* private',
                  options: ['Negative liberty (e.g., Mill, Berlin): The state should not *prevent* private', 'both support free education', 'no rules at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think **negative liberty means "no rules at all" (anarchy)** and **positive liberty means "the state provides everything for free".' }
          ],
            remediations: { 'negative-liberty-means-no-rules': { steps: ['If stuck on the misconception, do this 3-step exercise using the NCERT "Mao suit" and "Sania Mirza fatwa" examples.', '**Classify**: For each, identify if the constraint comes from state (Mao suit), religious authority (fatwa), or.', '**Map to Liberty**: Mao suit = state destroys negative liberty (no choice) *and* perverts positive liberty (forced.', 'Fatwa = non-state actor violating negative liberty.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think **negative liberty means "no rules at all" (anarchy)** and **positive liberty means "the state provides.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "For a developing country like India, positive liberty is more important than negative liberty because poverty is a greater constraint than.', answer: 'The claim creates a false hierarchy',
                  options: ['The claim creates a false hierarchy', 'harmonious construction', 'no rules at all', 'the state provides everything for free'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think **negative liberty means "no rules at all" (anarchy)** and **positive liberty means "the state provides everything for free".' },
                { id: 'b', prompt: 'Compare how negative liberty and positive liberty theorists would view the state\'s role in providing *free public higher education*.', answer: 'Negative liberty (e.g., Mill, Berlin): The state should not *prevent* private',
                  options: ['Negative liberty (e.g., Mill, Berlin): The state should not *prevent* private', 'both support free education', 'no rules at all', 'the state provides everything for free'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think **negative liberty means "no rules at all" (anarchy)** and **positive liberty means "the state provides everything for free".' }
          ],
            remediations: { 'negative-liberty-means-no-rules': { steps: ['If stuck on the misconception, do this 3-step exercise using the NCERT "Mao suit" and "Sania Mirza fatwa" examples.', '**Classify**: For each, identify if the constraint comes from state (Mao suit), religious authority (fatwa), or.', '**Map to Liberty**: Mao suit = state destroys negative liberty (no choice) *and* perverts positive liberty (forced.', 'Fatwa = non-state actor violating negative liberty.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_005', difficulty: 'standard',
          question: 'Constraints on freedom refer to limitations that prevent individuals from.',
          hint: 'Revisit c11_ps_cbse_02_002 (Negative Liberty) and the distinction between “freedom from”.',
          misconception: 'Students often believe that only state laws or physical force count as “real” constraints on freedom.',
          parts: [
                { id: 'a', prompt: 'List the three types of constraints on freedom discussed in this chapter and give a one‑sentence example of each from everyday Indian life.', answer: '(1) Coercion – e.g., a state law banning a book',
                  options: ['Correct answer: (1) Coercion – e.g., a state law banning a book', 'only state laws or physical force count as “real” constraints on freedom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that only state laws or physical force count as “real” constraints on freedom.' },
                { id: 'b', prompt: 'Explain why ignorance is considered a constraint on freedom even though no one is physically forcing the person to act or not act.', answer: 'Freedom requires the capacity to make informed choices',
                  options: ['Correct answer: Freedom requires the capacity to make informed choices', 'ignorance is not a constraint', 'only state laws or physical force count as “real” constraints on freedom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that only state laws or physical force count as “real” constraints on freedom.' },
                { id: 'c', prompt: 'Compare coercion and social pressure: which is more difficult to challenge in a democratic society, and why?', answer: 'Social pressure is often harder to challenge',
                  options: ['Correct answer: Social pressure is often harder to challenge', 'coercion is worse', 'only state laws or physical force count as “real” constraints on freedom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that only state laws or physical force count as “real” constraints on freedom.' }
          ],
            remediations: { 'only-state-laws-or-physical': { steps: ['Re‑read the NCERT passage on “Sources of Constraints” (pages 21‑22) and highlight the three categories.', 'Watch a 5‑minute clip from the documentary *India Untouched* (caste‑based social pressure) and note where no law is.', 'Write two parallel columns: “Legal coercion” vs.', '“Social pressure” for the same issue (e.g., inter‑caste marriage) to see how both operate.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that only state laws or physical force count as “real” constraints on freedom.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: “Compulsory schooling up to age 14 (RTE Act) removes ignorance as a constraint but simultaneously imposes coercion.” Is this a.', answer: 'Yes, it is a justified constraint',
                  options: ['Correct answer: Yes, it is a justified constraint', 'unjustified coercion', 'only state laws or physical force count as “real” constraints on freedom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that only state laws or physical force count as “real” constraints on freedom.' }
          ],
            remediations: { 'only-state-laws-or-physical': { steps: ['Re‑read the NCERT passage on “Sources of Constraints” (pages 21‑22) and highlight the three categories.', 'Watch a 5‑minute clip from the documentary *India Untouched* (caste‑based social pressure) and note where no law is.', 'Write two parallel columns: “Legal coercion” vs.', '“Social pressure” for the same issue (e.g., inter‑caste marriage) to see how both operate.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_006', difficulty: 'standard',
          question: 'The Harm Principle, articulated by J.S. Mill in *On Liberty* (1859), states.',
          hint: 'Revisit the "Negative Liberty" node (c11_ps_cbse_02_002) and the "Constraints on Freedom".',
          misconception: 'Students often believe the Harm Principle means "you can do whatever you want as long as you don\'t physically hit.',
          parts: [
                { id: 'a', prompt: 'Explain why Mill argues that playing loud music in an apartment building should attract only social disapproval (e.g., neighbours refusing to greet the person).', answer: 'Mill classifies loud music as an other-regarding action causing *minor* harm',
                  options: ['Mill classifies loud music as an other-regarding action causing *minor* harm', 'loud music causes no harm', 'you can do whatever you want as long as you don\'t physically hit someone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Harm Principle means "you can do whatever you want as long as you don\'t physically hit someone." They miss two.' }
          ],
            remediations: { 'the-harm-principle-means-you': { steps: ['If a student conflates "harm" with "physical violence only" or thinks the Harm Principle protects against all social.', '25) — have them classify each case (Mao suits, Sania Mirza fatwa, cricket whites, school uniform) as self-regarding or.', '(2) Walk through Mill\'s own example of the corn dealer: "If he says corn dealers starve the poor in a newspaper, it\'s.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_02_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Harm Principle means "you can do whatever you want as long as you don\'t physically hit.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Mill\'s Harm Principle makes it impossible for the state to regulate hate speech because speech is just words and cannot cause physical.', answer: 'The statement is false',
                  options: ['The statement is false', 'you can do whatever you want as long as you don\'t physically hit someone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Harm Principle means "you can do whatever you want as long as you don\'t physically hit someone." They miss two.' }
          ],
            remediations: { 'the-harm-principle-means-you': { steps: ['If a student conflates "harm" with "physical violence only" or thinks the Harm Principle protects against all social.', '25) — have them classify each case (Mao suits, Sania Mirza fatwa, cricket whites, school uniform) as self-regarding or.', '(2) Walk through Mill\'s own example of the corn dealer: "If he says corn dealers starve the poor in a newspaper, it\'s.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
