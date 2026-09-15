import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch03_p1: SimDef = {
    id: 'v3_c11_ps_ch03_p1',
    title: 'Equality · Part 1/2',
    subtitle: 'See why identical treatment can be the unfair one.',
    classLevel: 11, subject: 'political_science', topic: 'Equality · Part 1/2',
    chapters: ['c11_ps_ch03'],
    nodeIds: ['c11_ps_cbse_03_001', 'c11_ps_cbse_03_002', 'c11_ps_cbse_03_003', 'c11_ps_cbse_03_004', 'c11_ps_cbse_03_005', 'c11_ps_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a policymaker choosing when sameness is injustice', intro: 'Same stairs for everyone is \'equal\' — and the wheelchair user pays for it; equality has to look past the rule to the outcome.', goal: 'Distinguish formal from substantive equality and evaluate natural versus social inequality.' },
    discovery: {
        question: 'Ramps for the disabled, maternity leave, reservations — differential treatment, therefore violations of equality?',
        options: ['No — treating unequals identically entrenches inequality; substantive equality demands treating different needs differently', 'Yes — equality means identical rules', 'Yes — but only reservations violate it', 'No — because these are all laws'],
        answer: 'No — treating unequals identically entrenches inequality; substantive equality demands treating different needs differently',
        hook: 'And \'natural\' inequality isn\'t a fixed excuse — technology keeps rewriting what biology means for life chances, as a screen reader or a Hawking\'s wheelchair shows.',
    },
    teaching: [
        { title: 'The significance of equality in modern political thought', text: 'Equality in modern political thought is the moral and political principle that all human beings possess equal intrinsic worth by virtue of their shared humanity, entitling them to equal.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort entrenched inequalities from chosen ones, then judge whether a just society may leave economic outcomes entirely to the market.',
        labels: ['The significance of equality', 'Natural inequalities vs socially-produced', 'Equality of opportunity: Meaning', 'Equality of outcomes: Meaning', 'Formal equality vs substantive', 'Affirmative action and reservations'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_001', title: 'The significance of equality in modern political thought',
          caseStudy: { intro: 'Begin with a relatable scenario: "Imagine two Class 11 students — one attends a well-funded private school with AC classrooms, labs, and career counselling.',
            decisions: [{ prompt: 'State the core moral claim that equality makes about human beings in modern political thought, as reflected in the Preamble to the Indian.', options: [
                { text: 'The core moral claim is that all human beings have equal intrinsic worth by virtue of', outcome: 'The core moral claim is that all human beings have equal intrinsic worth by virtue of their common.' },
                { text: 'equality means everyone should have the same income', outcome: 'Not quite — Students often believe "equality means treating everyone exactly the same" — a formal equality.', reveals: 'equality-means-treating-everyone-exactly' },
                { text: 'equality means identical treatment in all circumstances', outcome: 'Not quite — Students often believe "equality means treating everyone exactly the same" — a formal equality.', reveals: 'equality-means-treating-everyone-exactly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_002', title: 'Natural inequalities vs socially-produced inequalities',
          caseStudy: { intro: 'Imagine two Class 11 students: Rohan, who struggles with mathematics despite sincere effort, and Priya, who is denied admission to a science stream because her.',
            decisions: [{ prompt: 'Define "natural inequality" and "socially-produced inequality" in your own words, giving one original example of each that does NOT appear.', options: [
                { text: '**Correct answer:** Natural inequality = differences arising from inborn traits (e.g.,', outcome: '**Correct answer:** Natural inequality = differences arising from inborn traits (e.g., one person.' },
                { text: 'wealth difference', outcome: 'Not quite — Students often believe "natural inequality = biological, therefore unchangeable, therefore not the.', reveals: 'natural-inequality-biological' },
                { text: 'caste discrimination', outcome: 'Not quite — Students often believe "natural inequality = biological, therefore unchangeable, therefore not the.', reveals: 'natural-inequality-biological' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_003', title: 'Equality of opportunity: Meaning and limits',
          caseStudy: { intro: 'Imagine two Class 11 students, Arjun and Bina, both preparing for the NEET medical entrance exam.',
            decisions: [{ prompt: 'Define "equality of opportunity" in one sentence and name the two constitutional articles that most directly guarantee it in the context.', options: [
                { text: 'Equality of opportunity means every individual has a fair chance to compete for social', outcome: 'Equality of opportunity means every individual has a fair chance to compete for social goods like.' },
                { text: 'same rules for everyone', outcome: 'Not quite — Students believe **equality of opportunity means "same rules for everyone" (formal equality)** and.', reveals: 'equality-of-opportunity-means-same' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_004', title: 'Equality of outcomes: Meaning and criticisms',
          caseStudy: { intro: 'Imagine two Class 11 students: Arjun attends a well-funded private school, has tutors, and scores 95%; Priya attends an under-resourced government school.',
            decisions: [{ prompt: 'Define "equality of outcomes" in one precise sentence, distinguishing it from "equality of opportunity".', options: [
                { text: 'Equality of outcomes demands that societal rewards (income, status, health, education) be', outcome: 'Equality of outcomes demands that societal rewards (income, status, health, education).' },
                { text: 'both mean everyone gets the same marks', outcome: 'Not quite — Students often equate "equality of outcomes" with "everyone gets exactly the same.', reveals: 'students-often-equate-equality-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_005', title: 'Formal equality vs substantive equality',
          caseStudy: { intro: 'Start with a relatable scenario: "Imagine two students, one from a well-resourced urban school and another from a rural government school with no science lab.',
            decisions: [{ prompt: 'What is the core difference between formal equality and substantive equality in the context of the Indian Constitution?', options: [
                { text: 'Formal equality requires identical treatment of all individuals by the state (Article 14:', outcome: 'Formal equality requires identical treatment of all individuals by the state (Article 14: equality.' },
                { text: 'equality means treating everyone exactly the same', outcome: 'Not quite — Students often think that "equality means treating everyone exactly the same" and therefore view.', reveals: 'equality-means-treating-everyone-exactly' },
                { text: 'violations of equality', outcome: 'Not quite — Students often think that "equality means treating everyone exactly the same" and therefore view.', reveals: 'equality-means-treating-everyone-exactly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_006', title: 'Affirmative action and reservations: Justifications and debates',
          caseStudy: { intro: 'Imagine two students, Rohan (urban, parents are doctors, access to coaching) and Ravi (rural, first-generation learner, parents are agricultural labourers).',
            decisions: [{ prompt: 'Article 16(4) of the Indian Constitution empowers the State to make provisions for reservation in public employment.', options: [
                { text: 'Article 16(4) mentions "any backward class of citizens which, in the opinion of the', outcome: 'Article 16(4) mentions "any backward class of citizens which, in the opinion of the State, is not.' },
                { text: 'It does not explicitly name SCs, STs, or OBCs', outcome: 'Not quite — Students often believe **"Reservations are an \'exception\' to the Right to Equality (Article.', reveals: 'reservations-are-an-exception-to' },
                { text: 'A wrong answer (e.g', outcome: 'Not quite — Students often believe **"Reservations are an \'exception\' to the Right to Equality (Article.', reveals: 'reservations-are-an-exception-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate argues against reservations at a debate: \'Equality means identical treatment — different cut-offs violate Article 14. And natural differences like talent are born, so inequality of outcome is just biology, not the state\'s business.\'',
            decisions: [{ prompt: 'How do Articles 14–16 and the natural/social distinction answer him?', options: [
                { text: 'Distinguish formal from substantive equality: identical treatment between unequals perpetuates inequality — Article 15(4)/16(4) constitutionalise special provisions precisely because starting conditions differ. And \'natural\' isn\'t a moral shield: many biological claims were ideology (race, gender), technology changes what a trait means (Hawking, screen readers), and justice targets circumstance-based disadvantage regardless of a trait\'s origin.', outcome: 'He sees the Constitution\'s own logic: equal worth sometimes requires differential treatment — and \'it\'s natural\' never settled whether its consequences are just.' },
                { text: 'Agree — equal means same rules for all; anything else is discrimination in reverse.', outcome: 'Formal equality between unequals entrenches the gap: the Constitution permits special provisions because identical treatment can be the vehicle of inequality.', reveals: 'equality-is-identical-treatment' },
                { text: 'Accept the biology point — born differences aren\'t anyone\'s fault, so outcomes follow.', outcome: 'Origin isn\'t consequence: a trait may be natural while its penalty is socially constructed — stairs, not legs, make a building inaccessible.', reveals: 'natural-inequality-unchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Equal protection and equal treatment aren\'t twins — a ramp breaks formal sameness to deliver actual equality.',
            decisions: [{ prompt: 'What comes next? Equality · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Equality · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_001', difficulty: 'standard',
          question: 'Equality in modern political thought is the moral and political principle that.',
          hint: 'If stuck, revisit Article 14 (equality before law) and Article 15 (prohibition.',
          misconception: 'Students often believe "equality means treating everyone exactly the same" — a formal equality fallacy.',
          parts: [
                { id: 'a', prompt: 'Explain why the NCERT textbook describes the coexistence of universal acceptance of the equality ideal with pervasive empirical inequality as a \'paradox\', and.', answer: 'The paradox arises',
                  options: ['The paradox arises', 'equality means treating everyone exactly the same', '"equality means treating everyone exactly the same"'],
                  hint: 'If stuck, revisit Article 14 (equality before law) and Article 15 (prohibition of discrimination).',
                  misconception: 'Students often believe "equality means treating everyone exactly the same" — a formal equality fallacy.' },
                { id: 'b', prompt: 'A state government introduces a policy reserving 50% of seats in government medical colleges for students from families with annual income below ₹2.5 lakh.', answer: 'This policy promotes substantive equality of opportunity by addressing the',
                  options: ['This policy promotes substantive equality of opportunity by addressing the', 'this violates equality', 'equality means treating everyone exactly the same', '"equality means treating everyone exactly the same"'],
                  hint: 'If stuck, revisit Article 14 (equality before law) and Article 15 (prohibition of discrimination).',
                  misconception: 'Students often believe "equality means treating everyone exactly the same" — a formal equality fallacy.' }
          ],
            remediations: { 'equality-means-treating-everyone-exactly': { steps: ['Re-read NCERT Section 3.2 ("What is Equality?") focusing on the paragraph: "However, treating people with equal respect.', 'Analyze the three \'LET\'S THINK\' scenarios on p.50 (maternity leave, visually challenged students, basketball talent.', 'Read Article 15(4) and 16(4) of the Constitution — note the phrase "nothing in this article shall prevent the State.', 'Write a 100-word explanation distinguishing \'formal equality\' (identical treatment) from \'substantive equality\' (equal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "equality means treating everyone exactly the same" — a formal equality fallacy.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Since absolute economic equality is impossible, a just society should only guarantee political equality (voting rights, legal.', answer: 'The statement is insufficient for a just society',
                  options: ['The statement is insufficient for a just society', '"equality means treating everyone exactly the same"'],
                  hint: 'If stuck, revisit Article 14 (equality before law) and Article 15 (prohibition of discrimination).',
                  misconception: 'Students often believe "equality means treating everyone exactly the same" — a formal equality fallacy.' },
                { id: 'b', prompt: 'Draft a 3-sentence principle for a school admission policy that embodies the NCERT\'s view that "differential treatment may be considered to realise the goal.', answer: '"Differential treatment in admissions is justified only when it compensates for',
                  options: ['"Differential treatment in admissions is justified only when it compensates for', 'equality means treating everyone exactly the same', '"equality means treating everyone exactly the same"'],
                  hint: 'If stuck, revisit Article 14 (equality before law) and Article 15 (prohibition of discrimination).',
                  misconception: 'Students often believe "equality means treating everyone exactly the same" — a formal equality fallacy.' }
          ],
            remediations: { 'equality-means-treating-everyone-exactly': { steps: ['Re-read NCERT Section 3.2 ("What is Equality?") focusing on the paragraph: "However, treating people with equal respect.', 'Analyze the three \'LET\'S THINK\' scenarios on p.50 (maternity leave, visually challenged students, basketball talent.', 'Read Article 15(4) and 16(4) of the Constitution — note the phrase "nothing in this article shall prevent the State.', 'Write a 100-word explanation distinguishing \'formal equality\' (identical treatment) from \'substantive equality\' (equal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_002', difficulty: 'standard',
          question: 'Natural inequalities refer to differences in capabilities, talents, or physical.',
          hint: 'Revisit c6_civics_ch10_003 (Right to Equality) and c11_ps_cbse_03_001 (Why Equality.',
          misconception: 'Students often believe "natural inequality = biological, therefore unchangeable, therefore not the state\'s.',
          parts: [
                { id: 'a', prompt: 'Stephen Hawking had ALS and could barely move or speak, yet made major scientific contributions.', answer: '**Correct answer:** Yes',
                  options: ['**Correct answer:** Yes', 'it\'s their natural disability, not the state\'s problem', 'only if affordable', 'They cite examples like'],
                  hint: 'Revisit c6_civics_ch10_003 (Right to Equality) and c11_ps_cbse_03_001 (Why Equality Matters).',
                  misconception: 'Students often believe "natural inequality = biological, therefore unchangeable, therefore not the state\'s responsibility." They cite.' },
                { id: 'b', prompt: 'Compare the "natural vs. social inequality" distinction with the modern "choice vs.', answer: '**Correct answer:** The natural/social binary is ambiguous',
                  options: ['**Correct answer:** The natural/social binary is ambiguous', 'natural', 'unalterable', 'They cite examples like'],
                  hint: 'Revisit c6_civics_ch10_003 (Right to Equality) and c11_ps_cbse_03_001 (Why Equality Matters).',
                  misconception: 'Students often believe "natural inequality = biological, therefore unchangeable, therefore not the state\'s responsibility." They cite.' }
          ],
            remediations: { 'natural-inequality-biological': { steps: ['Re-read NCERT pp. 36–37 (Natural and Social Inequalities section) focusing on the Hawking and gender/race examples.', 'For each example, write: "Trait: ___ | Social barrier: ___ | Policy that reduces disadvantage: ___" — this separates.', 'Apply to one Indian policy (e.g., PwD Act 2016 mandatory ramps): the disability is natural; the missing ramp is social.', 'Discuss with peer: "If a child is born in a remote village with no school, is their illiteracy natural or social?".'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_003', difficulty: 'standard',
          question: 'Equality of opportunity is the principle that all individuals should have the.',
          hint: 'If stuck, re-read NCERT pp. 36-37 "Natural and Social Inequalities" and classify 10.',
          misconception: 'Students believe **equality of opportunity means "same rules for everyone" (formal equality)** and therefore view any.',
          parts: [
                { id: 'a', prompt: 'A state government introduces a policy: "All candidates for the state civil services exam must pay a ₹50,000 application fee, waived only for SC/ST.', answer: 'The policy violates equality of opportunity for the OBC candidate',
                  options: ['The policy violates equality of opportunity for the OBC candidate', 'it\'s fair because SC/ST are more backward', 'same rules for everyone'],
                  hint: 'If stuck, re-read NCERT pp. 36-37 "Natural and Social Inequalities" and classify 10 real-world.',
                  misconception: 'Students believe **equality of opportunity means "same rules for everyone" (formal equality)** and therefore view any differential.' },
                { id: 'b', prompt: 'Compare the liberal and socialist perspectives on equality of opportunity.', answer: '**Liberal view:** Supports the policy',
                  options: ['**Liberal view:** Supports the policy', 'both support it equally', 'same rules for everyone'],
                  hint: 'If stuck, re-read NCERT pp. 36-37 "Natural and Social Inequalities" and classify 10 real-world.',
                  misconception: 'Students believe **equality of opportunity means "same rules for everyone" (formal equality)** and therefore view any differential.' }
          ],
            remediations: { 'equality-of-opportunity-means-same': { steps: ['**Re-read NCERT Section 3.4 "Equality Through Differential Treatment" (pp.', '45-46)** — focus on the ramp/visually challenged student and call-centre women examples.', 'Ask: "Is the ramp \'special treatment\' or \'equal access\'?" 2.', '**Do the "Let\'s Think" activity (p.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_004', difficulty: 'standard',
          question: 'Equality of outcomes is a principle of distributive justice which holds that.',
          hint: 'Revisit c11_ps_cbse_03_003 worked example on "coaching centres vs scholarships".',
          misconception: 'Students often equate "equality of outcomes" with "everyone gets exactly the same marks/salary/house" — a straw-man.',
          parts: [
                { id: 'a', prompt: 'A state introduces a 100% inheritance tax and caps maximum income at 5x the minimum wage to achieve equality of outcomes.', answer: 'Likely violations: Article 19(1)(g)',
                  options: ['Likely violations: Article 19(1)(g)', 'right to equality (Article 14)'],
                  hint: 'Revisit c11_ps_cbse_03_003 worked example on "coaching centres vs scholarships" — identify which.',
                  misconception: 'Students often equate "equality of outcomes" with "everyone gets exactly the same marks/salary/house" — a straw-man caricature.' }
          ],
            remediations: { 'students-often-equate-equality-of': { steps: ['Read the "Let\'s Think" box on NCERT p.50 (maternity leave, visually challenged students, basketball court.', 'For each case, identify: *Which difference is being accommodated?', 'Write one sentence per case using the template: "This is [equality of opportunity / equality of outcomes] because.', 'Discuss with teacher: Why is the basketball court *not* justified but the ramp *is*?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_005', difficulty: 'standard',
          question: 'Formal equality refers to the principle that all individuals should be treated.',
          hint: 'If stuck, revisit c11_ps_cbse_03_002 (Natural vs Social Inequalities) and the NCERT box.',
          misconception: 'Students often think that "equality means treating everyone exactly the same" and therefore view reservations.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Formal equality refers to the principle that all individuals should be treated',
                  options: ['Formal equality refers to the principle that all individuals should be treated', 'Equality in modern political thought is the moral and political principle that all human', 'Natural inequalities refer to differences in capabilities, talents, or physical', 'Equality of opportunity is the principle that all individuals should have the same legal'],
                  hint: 'If stuck, revisit c11_ps_cbse_03_002 (Natural vs Social Inequalities) and the NCERT box.',
                  misconception: 'Students often think that "equality means treating everyone exactly the same" and therefore view reservations, maternity leave,.' }
          ],
            remediations: { 'equality-means-treating-everyone-exactly': { steps: ['Re-read NCERT Chapter 3, Section 3.4 "Establishing Formal Equality" and "Equality Through Differential Treatment".', 'List all constitutional articles mentioned (14, 15(3), 15(4), 16(4)) and write one sentence on what each permits.', 'Take the "Let\'s Think" scenarios on page 50 (maternity leave, visually challenged students, basketball court.', 'Discuss with a peer: "Does giving a ramp to a disabled person violate the equality of able-bodied persons?" Use the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_006', difficulty: 'standard',
          question: 'Affirmative action refers to state-initiated policies that provide preferential.',
          hint: 'Revisit the "ramp for disabled student" analogy in NCERT p.45 and the "first-generation.',
          misconception: 'Students often believe **"Reservations are an \'exception\' to the Right to Equality (Article 14/15/16) and therefore.',
          parts: [
                { id: 'a', prompt: 'Compare the "Compensatory Justice" argument (reservations as repayment for historical oppression) and the "Diversity/Integration" argument (reservations ensure.', answer: 'Compensatory Justice: Beneficiary = the specific victim group (SC/ST/OBC)',
                  options: ['Compensatory Justice: Beneficiary = the specific victim group (SC/ST/OBC)', 'both help backward classes', '** They view Article 15(1) (', ') as the *primary* rule and Article 15(4) ('],
                  hint: 'Revisit the "ramp for disabled student" analogy in NCERT p.45 and the "first-generation learner vs.',
                  misconception: 'Students often believe **"Reservations are an \'exception\' to the Right to Equality (Article 14/15/16) and therefore inherently.' }
          ],
            remediations: { 'reservations-are-an-exception-to': { steps: ['Re-read NCERT Chapter 3, Section 3.4 "Equality Through Differential Treatment" (pp.', '45-46) focusing on the ramp/women\'s safety examples.', 'Map the logic: **Problem (Structural Barrier) → Formal Equality fails → Differential Treatment (Ramp/Reservation) →.', 'Write two columns: "Identical Treatment" vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
