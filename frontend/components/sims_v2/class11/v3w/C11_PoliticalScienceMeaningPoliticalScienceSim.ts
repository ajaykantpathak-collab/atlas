import type { SimDef } from '../../engine/types';
import C11_PoliticalScienceMeaningPoliticalScienceSim from '../../../simulations/c6_12/C11_PoliticalScienceMeaningPoliticalScienceSim';

/** v3 wrapped master — C11_PoliticalScienceMeaningPoliticalScienceSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_politicalsciencemeaningpoliticalsciencesim: SimDef = {
    id: 'v3w_c11_politicalsciencemeaningpoliticalsciencesim',
    title: 'Equality of opportunity: Meaning and limits',
    subtitle: 'This node covers the meaning, philosophical justification, and inherent limits of.',
    classLevel: 11, subject: 'political_science', topic: 'Equality of opportunity: Meaning and limits',
    chapters: [],
    nodeIds: ['c11_ps_cbse_03_003', 'c11_ps_cbse_03_004', 'c11_ps_cbse_03_009', 'c11_ps_cbse_04_004', 'c11_ps_cbse_04_006', 'c11_ps_cbse_09_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine two Class 11 students, Arjun and Bina, both preparing for the NEET medical entrance exam.', goal: 'Master Equality of opportunity: Meaning and limits.' },
    discovery: {
        question: 'A state government introduces a policy: "All candidates for the state civil services exam must pay a ₹50,000 application fee, waived only for SC/ST.',
        options: ['The policy violates equality of opportunity for the OBC candidate', 'it\'s fair because SC/ST are more backward', 'same rules for everyone'],
        answer: 'The policy violates equality of opportunity for the OBC candidate',
        hook: 'Students believe **equality of opportunity means "same rules for everyone" (formal equality)** and therefore view any.',
    },
    teaching: [
        { title: 'Equality of opportunity is the principle.', text: 'Equality of opportunity is the principle that all individuals should have the same legal rights and fair access to social goods (education, healthcare, employment) to develop their talents and pursue.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_ps_cbse_03_003', title: 'Equality of opportunity is the.',
          scaffold: { problem: '** A private medical college charges ₹25 lakh/year tuition. The state government offers a 50% fee waiver for students whose parental income.',
            steps: [
            { text: 'Identify the policy\'s target — economic disadvantage (income < ₹2.5 lakh).' },
            { text: 'Identify the gap — the ₹3 lakh family is *just above* the threshold but faces identical liquidity constraints (no.' },
            { text: 'Apply "threshold exclusion" concept — when a binary eligibility cut-off excludes people with nearly identical.' },
            { text: 'Evaluate against NCERT principle — "differential treatment is justified only as a means to promoting a just and.' },
            { text: 'Conclude — the policy *partially* promotes equality of opportunity but fails at the threshold.', faded: true, blankAnswer: '** No, the policy does not fully ensure equality of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_03_004', title: 'Equality of outcomes is a principle of.',
          scaffold: { problem: 'A state government proposes: "All Class 12 students in government schools will receive the same final certificate grade (average of cohort).',
            steps: [
            { text: 'Identify the core mechanism — decoupling individual effort/result from credential outcome.' },
            { text: 'Apply Marxist lens: Does this address class exploitation? No — it equalises *downward* without changing ownership of.' },
            { text: 'Apply Rawlsian liberal lens: Does it satisfy the Difference Principle?' },
            { text: 'Apply Nozickian libertarian lens: Violates self-ownership and entitlement theory — the state seizes the student\'s.' },
            { text: 'Synthesize: All three frameworks reject *this specific policy*, but for different reasons — Marxist: doesn\'t go deep.', faded: true, blankAnswer: 'The policy fails all three tests. Marxist: superficial.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_03_009', title: 'Dimensions of equality refer to the.',
          scaffold: { problem: 'A village panchayat has reserved the position of Sarpanch for a woman from a Scheduled Caste.',
            steps: [
            { text: 'Identify the political dimension – reservation ensures political equality (representation) for women and SCs (Article.' },
            { text: 'Identify the social dimension – illiteracy reflects historical denial of education (social inequality); dependence on.' },
            { text: 'Identify the economic dimension – lack of independent income may limit her autonomy; economic inequality persists.' },
            { text: 'Identify the legal dimension – she holds the office legally, but effective exercise of power is hindered by.' },
            { text: 'Conclude that formal political equality (reserved seat) is achieved, but substantive equality requires simultaneous.', faded: true, blankAnswer: 'The policy achieves formal political equality but fails.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_04_004', title: 'Robert Nozick\'s entitlement theory of.',
          scaffold: { problem: 'A state government passes a law requiring all private hospitals to reserve 30% of beds for free treatment of poor patients, reimbursing.',
            steps: [
            { text: 'Identify the holdings involved – hospital beds, medical services, and the revenue from paying patients.' },
            { text: 'Determine how the hospital acquired its holdings – presumably through just acquisition (building/buying equipment) and.' },
            { text: 'Assess the policy\'s effect – it forces hospitals to transfer services to a specific group at state-dictated terms, not.' },
            { text: 'Apply Nozick\'s principle of justice in transfer – voluntary exchange is just; coercive redistribution violates this.' },
            { text: 'Consider rectification – the policy is not correcting a specific past injustice by these hospitals against these.' },
            { text: 'Conclude – the policy violates justice in transfer and, by extension, the entitlement theory, because it uses state.', faded: true, blankAnswer: 'Yes, the policy violates justice in transfer because it.' }
            ] } },
        { type: 'case', nodeId: 'c11_ps_cbse_04_006', title: 'The Marxist critique of liberal justice.',
          caseStudy: { intro: 'Imagine a factory worker, Ramesh, and the factory owner, Mr. Kapoor.',
            decisions: [{ prompt: 'Define "exploitation" in the specific Marxist sense (surplus value) and distinguish it from the everyday meaning of "unfair treatment" or.', options: [
                { text: '**Correct Answer:** In Marxism, exploitation is a technical, structural concept: it is', outcome: '**Correct Answer:** In Marxism, exploitation is a technical, structural concept: it is the.' },
                { text: 'paying very low wages', outcome: 'Not quite — **Misconception:** "Marx wants the state to distribute everything equally (equal wages for all) and.', reveals: 'misconception-marx-wants-the-state' },
                { text: 'bad working conditions', outcome: 'Not quite — **Misconception:** "Marx wants the state to distribute everything equally (equal wages for all) and.', reveals: 'misconception-marx-wants-the-state' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_09_004', title: 'Pacifism is the ethical and political.',
          scaffold: { problem: 'A student council debates whether to support a "Zero Tolerance for Fighting" policy that mandates automatic suspension for *any* physical.',
            steps: [
            { text: 'Identify the policy\'s core rule — absolute prohibition of physical force by students, no exceptions.' },
            { text: 'Map to absolute pacifism — policy mirrors absolute pacifism: violence (fighting) is intrinsically banned regardless of.' },
            { text: 'Test with conditional pacifism — conditional pacifist would argue policy fails: if a smaller student is cornered by a.' },
            { text: 'Test with selective pacifism — selective pacifist would distinguish *types* of violence: bullying (structural violence.' },
            { text: 'Synthesize — policy is "absolute pacifist" in form but ignores structural violence context; a pacifist-inspired policy.', faded: true, blankAnswer: 'The policy reflects absolute pacifism (no exceptions)..' }
            ] } }
    ],
    explore: { component: C11_PoliticalScienceMeaningPoliticalScienceSim, prompt: 'Explore the interactive — Equality of opportunity: Meaning and limits' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_003', difficulty: 'standard',
          question: 'Equality of opportunity is the principle that all individuals should have the.',
          hint: 'If stuck, re-read NCERT pp. 36-37 "Natural and Social Inequalities" and classify 10.',
          misconception: 'Students believe **equality of opportunity means "same rules for everyone" (formal equality)** and therefore view any.',
          parts: [
                { id: 'a', prompt: 'A state government introduces a policy: "All candidates for the state civil services exam must pay a ₹50,000 application fee, waived only for SC/ST.', answer: 'The policy violates equality of opportunity for the OBC candidate',
                  options: ['The policy violates equality of opportunity for the OBC candidate', 'it\'s fair because SC/ST are more backward', 'same rules for everyone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **equality of opportunity means "same rules for everyone" (formal equality)** and therefore view any differential.' },
                { id: 'b', prompt: 'Compare the liberal and socialist perspectives on equality of opportunity.', answer: '**Liberal view:** Supports the policy',
                  options: ['**Liberal view:** Supports the policy', 'both support it equally', 'same rules for everyone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **equality of opportunity means "same rules for everyone" (formal equality)** and therefore view any differential.' }
          ],
            remediations: { 'equality-of-opportunity-means-same': { steps: ['**Re-read NCERT Section 3.4 "Equality Through Differential Treatment" (pp.', '45-46)** — focus on the ramp/visually challenged student and call-centre women examples.', 'Ask: "Is the ramp \'special treatment\' or \'equal access\'?" 2.', '**Do the "Let\'s Think" activity (p.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe **equality of opportunity means "same rules for everyone" (formal equality)** and therefore view any.',
          parts: [
                { id: 'a', prompt: 'Compare the liberal and socialist perspectives on equality of opportunity.', answer: '**Liberal view:** Supports the policy',
                  options: ['**Liberal view:** Supports the policy', 'both support it equally', 'same rules for everyone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe **equality of opportunity means "same rules for everyone" (formal equality)** and therefore view any differential.' }
          ],
            remediations: { 'equality-of-opportunity-means-same': { steps: ['**Re-read NCERT Section 3.4 "Equality Through Differential Treatment" (pp.', '45-46)** — focus on the ramp/visually challenged student and call-centre women examples.', 'Ask: "Is the ramp \'special treatment\' or \'equal access\'?" 2.', '**Do the "Let\'s Think" activity (p.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_004', difficulty: 'standard',
          question: 'Equality of outcomes is a principle of distributive justice which holds that a.',
          hint: 'Revisit c11_ps_cbse_03_003 worked example on "coaching centres vs scholarships" —.',
          misconception: 'Students often equate "equality of outcomes" with "everyone gets exactly the same marks/salary/house" — a straw-man.',
          parts: [
                { id: 'a', prompt: 'A state introduces a 100% inheritance tax and caps maximum income at 5x the minimum wage to achieve equality of outcomes.', answer: 'Likely violations: Article 19(1)(g)',
                  options: ['Likely violations: Article 19(1)(g)', 'right to equality (Article 14)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "equality of outcomes" with "everyone gets exactly the same marks/salary/house" — a straw-man caricature.' }
          ],
            remediations: { 'students-often-equate-equality-of': { steps: ['Read the "Let\'s Think" box on NCERT p.50 (maternity leave, visually challenged students, basketball court,.', 'For each case, identify: *Which difference is being accommodated?', 'Write one sentence per case using the template: "This is [equality of opportunity / equality of outcomes] because it.', 'Discuss with teacher: Why is the basketball court *not* justified but the ramp *is*?'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate "equality of outcomes" with "everyone gets exactly the same marks/salary/house" — a straw-man.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "India\'s reservation policy (Articles 15(4), 16(4)) is a policy for equality of outcomes, not just opportunity." Is this statement accurate?', answer: 'The statement is *partially inaccurate*',
                  options: ['The statement is *partially inaccurate*', 'answer confuses *access to competition* with *guarantee of result*'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "equality of outcomes" with "everyone gets exactly the same marks/salary/house" — a straw-man caricature.' }
          ],
            remediations: { 'students-often-equate-equality-of': { steps: ['Read the "Let\'s Think" box on NCERT p.50 (maternity leave, visually challenged students, basketball court,.', 'For each case, identify: *Which difference is being accommodated?', 'Write one sentence per case using the template: "This is [equality of opportunity / equality of outcomes] because it.', 'Discuss with teacher: Why is the basketball court *not* justified but the ramp *is*?'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_009', difficulty: 'standard',
          question: 'Dimensions of equality refer to the distinct spheres—political, social,.',
          hint: 'Review the distinction between Article 14 (equality before law) and Article 15(4)/16(4).',
          misconception: 'Students often think "equality" means only legal equality (Article 14) and that providing the same rights to everyone.',
          parts: [
                { id: 'a', prompt: 'List the four dimensions of equality discussed in the chapter and give one constitutional provision or right that exemplifies each dimension.', answer: 'Political – universal adult franchise (Article 326)',
                  options: ['Correct answer: Political – universal adult franchise (Article 326)', 'equality'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "equality" means only legal equality (Article 14) and that providing the same rights to everyone automatically creates.' }
          ],
            remediations: { 'equality-means-only-legal-equality': { steps: ['Remediation: 1) Revisit node c11_ps_cbse_03_005 (Formal vs Substantive Equality) and create a two-column table: "Formal.', '2) Read the "Fact Sheet on Global Inequalities" and "Economic Inequalities in India" in the textbook; identify which.', '3) Write a 100-word explanation of why Article 14 alone could not abolish untouchability – needed Article 17 and.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "equality" means only legal equality (Article 14) and that providing the same rights to everyone.',
          parts: [
                { id: 'a', prompt: 'Assess the statement: \'Legal equality is sufficient for a just society; social and economic inequalities are outcomes of individual effort.\' Use evidence from.', answer: 'The statement is flawed',
                  options: ['Correct answer: The statement is flawed', 'equality'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "equality" means only legal equality (Article 14) and that providing the same rights to everyone automatically creates.' }
          ],
            remediations: { 'equality-means-only-legal-equality': { steps: ['Remediation: 1) Revisit node c11_ps_cbse_03_005 (Formal vs Substantive Equality) and create a two-column table: "Formal.', '2) Read the "Fact Sheet on Global Inequalities" and "Economic Inequalities in India" in the textbook; identify which.', '3) Write a 100-word explanation of why Article 14 alone could not abolish untouchability – needed Article 17 and.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_004', difficulty: 'standard',
          question: 'Robert Nozick\'s entitlement theory of justice holds that a distribution of.',
          hint: 'If stuck, review the "veil of ignorance" and "difference principle" in.',
          misconception: 'Students often think Nozick\'s theory means "no government at all" or "survival of the fittest." In reality, Nozick.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Robert Nozick\'s entitlement theory of justice holds that a distribution of goods is just',
                  options: ['Robert Nozick\'s entitlement theory of justice holds that a distribution of goods is just', 'Equality of opportunity is the principle that all individuals should have the same legal', 'Equality of outcomes is a principle of distributive justice', 'Dimensions of equality refer to the distinct spheres—political, social, economic, and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Nozick\'s theory means "no government at all" or "survival of the fittest." In reality, Nozick argues for a minimal.' }
          ],
            remediations: { 'nozick-s-theory-means-no': { steps: ['If a student holds this misconception, have them re-read Nozick\'s "Anarchy, State, and Utopia" Chapter 7 (or a summary).', 'Then work through a concrete Indian case: the 2006 Forest Rights Act recognizes historical injustice to Adivasis – ask.', 'Emphasize that Nozick\'s minimal state still has police, courts, and a rectification mechanism.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Nozick\'s theory means "no government at all" or "survival of the fittest." In reality, Nozick.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "Nozick\'s entitlement theory provides no mechanism to address historical injustices like land dispossession of Adivasi communities in.', answer: 'The claim is inaccurate',
                  options: ['The claim is inaccurate', 'Nozick ignores history', 'no government at all', 'survival of the fittest'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Nozick\'s theory means "no government at all" or "survival of the fittest." In reality, Nozick argues for a minimal.' }
          ],
            remediations: { 'nozick-s-theory-means-no': { steps: ['If a student holds this misconception, have them re-read Nozick\'s "Anarchy, State, and Utopia" Chapter 7 (or a summary).', 'Then work through a concrete Indian case: the 2006 Forest Rights Act recognizes historical injustice to Adivasis – ask.', 'Emphasize that Nozick\'s minimal state still has police, courts, and a rectification mechanism.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_006', difficulty: 'standard',
          question: 'The Marxist critique of liberal justice argues that liberal theories (like.',
          hint: 'If stuck on "Why does Marx reject rights?", revisit **c11_ps_cbse_04_001 (Principle:.',
          misconception: '**Misconception:** "Marx wants the state to distribute everything equally (equal wages for all) and abolish all.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Marxist critique of liberal justice argues that liberal theories (like those of Rawls',
                  options: ['The Marxist critique of liberal justice argues that liberal theories (like those of Rawls', 'Equality of opportunity is the principle that all individuals should have the same legal', 'Equality of outcomes is a principle of distributive justice', 'Dimensions of equality refer to the distinct spheres—political, social, economic, and'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Marx wants the state to distribute everything equally (equal wages for all) and abolish all individual freedom/rights.".' }
          ],
            remediations: { 'misconception-marx-wants-the-state': { steps: ['**Re-read the "Critique of the Gotha Programme" (Part I):** Focus on Marx\'s distinction between the "lower phase".', 'Write a 3-sentence summary of why "equal right" is still a "bourgeois limitation." 2.', '**Analyze a Pay Slip:** Take a hypothetical payslip (Gross: ₹50,000; Deductions: ₹5,000; Net: ₹45,000).', 'Map it to Marx: Gross = Value created by labour (necessary + surplus).'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Marx wants the state to distribute everything equally (equal wages for all) and abolish all.',
          parts: [
                { id: 'a', prompt: 'Draft a short Marxist critique (150 words) of the Indian Constitution\'s Fundamental Rights (Part III) and Directive Principles (Part IV), focusing on the.', answer: '**Expected Answer Criteria:** A strong answer will: 1',
                  options: ['**Expected Answer Criteria:** A strong answer will: 1', 'socialism in Preamble', 'socialist', 'welfarist'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Marx wants the state to distribute everything equally (equal wages for all) and abolish all individual freedom/rights.".' }
          ],
            remediations: { 'misconception-marx-wants-the-state': { steps: ['**Re-read the "Critique of the Gotha Programme" (Part I):** Focus on Marx\'s distinction between the "lower phase".', 'Write a 3-sentence summary of why "equal right" is still a "bourgeois limitation." 2.', '**Analyze a Pay Slip:** Take a hypothetical payslip (Gross: ₹50,000; Deductions: ₹5,000; Net: ₹45,000).', 'Map it to Marx: Gross = Value created by labour (necessary + surplus).'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_004', difficulty: 'standard',
          question: 'Pacifism is the ethical and political doctrine that rejects war, violence, and.',
          hint: 'Revisit c11_ps_cbse_09_002 (Galtung\'s triangle: direct, structural, cultural violence).',
          misconception: 'Students equate pacifism with *passivity* or *cowardice* ("doing nothing").',
          parts: [
                { id: 'a', prompt: 'A nation faces an imminent invasion by a dictator known for ethnic cleansing. The government asks citizens to take up arms.', answer: 'Selective pacifism *would* likely permit this war',
                  options: ['Selective pacifism *would* likely permit this war', 'selective pacifism rejects all war', 'selective pacifism supports any war declared by government'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate pacifism with *passivity* or *cowardice* ("doing nothing").' }
          ],
            remediations: { 'students-equate-pacifism-with-passivity': { steps: ['If student conflates pacifism with passivity: 1) Show 2-min clip of Birmingham Children\'s Crusade (1963) or Salt March.', 'Non-violent Action" T-chart: List actions on both sides (violence: shoot, bomb; non-violence: strike, boycott, sit-in,.', '3) Assign reading: Gene Sharp\'s "198 Methods of Nonviolent Action" — students categorise 10 methods as "passive" or.', '4) Revisit definition: Pacifism = *rejection of violence as a tool*, not rejection of *struggle*.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_09_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate pacifism with *passivity* or *cowardice* ("doing nothing").',
          parts: [
                { id: 'a', prompt: 'Draft a 3-clause "Pacifist Charter" for a student council that commits the school to non-violent conflict resolution but includes a "safety valve" clause for.', answer: 'Clause 1 (Absolute): "No student shall ever initiate physical force." Clause 2',
                  options: ['Clause 1 (Absolute): "No student shall ever initiate physical force." Clause 2', 'did nothing', 'Gandhi "did nothing" during Salt March'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate pacifism with *passivity* or *cowardice* ("doing nothing").' }
          ],
            remediations: { 'students-equate-pacifism-with-passivity': { steps: ['If student conflates pacifism with passivity: 1) Show 2-min clip of Birmingham Children\'s Crusade (1963) or Salt March.', 'Non-violent Action" T-chart: List actions on both sides (violence: shoot, bomb; non-violence: strike, boycott, sit-in,.', '3) Assign reading: Gene Sharp\'s "198 Methods of Nonviolent Action" — students categorise 10 methods as "passive" or.', '4) Revisit definition: Pacifism = *rejection of violence as a tool*, not rejection of *struggle*.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
