import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch03_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch03_p2: SimDef = {
    id: 'v3_c11_ps_ch03_p2',
    title: 'Equality · Part 2/2',
    subtitle: 'See why identical treatment can be the unfair one.',
    classLevel: 11, subject: 'political_science', topic: 'Equality · Part 2/2',
    chapters: ['c11_ps_ch03'],
    nodeIds: ['c11_ps_cbse_03_007', 'c11_ps_cbse_03_008', 'c11_ps_cbse_03_009', 'c11_ps_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a policymaker choosing when sameness is injustice', intro: 'Same stairs for everyone is \'equal\' — and the wheelchair user pays for it; equality has to look past the rule to the outcome.', goal: 'Distinguish formal from substantive equality and evaluate natural versus social inequality.' },
    discovery: {
        question: 'Ramps for the disabled, maternity leave, reservations — differential treatment, therefore violations of equality?',
        options: ['No — treating unequals identically entrenches inequality; substantive equality demands treating different needs differently', 'Yes — equality means identical rules', 'Yes — but only reservations violate it', 'No — because these are all laws'],
        answer: 'No — treating unequals identically entrenches inequality; substantive equality demands treating different needs differently',
        hook: 'And \'natural\' inequality isn\'t a fixed excuse — technology keeps rewriting what biology means for life chances, as a screen reader or a Hawking\'s wheelchair shows.',
    },
    teaching: [
        { title: 'T.H. Green on positive rights and enabling equality', text: 'T.H. Green\'s theory of positive rights holds that true freedom and equality require the state to actively provide resources and conditions (such as education, healthcare, and economic security) that.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort entrenched inequalities from chosen ones, then judge whether a just society may leave economic outcomes entirely to the market.',
        labels: ['T.H. Green on positive', 'The tension between liberty', 'Dimensions of equality: Social,', 'Equality and difference: Recognising'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_007', title: 'T.H. Green on positive rights and enabling equality',
          caseStudy: { intro: 'Imagine a student, Priya, from a remote village who dreams of becoming a doctor.',
            decisions: [{ prompt: 'What is the core difference between a negative right and a positive right according to T.H. Green\'s framework?', options: [
                { text: 'A negative right is a freedom *from* interference (e.g., the state cannot stop you from', outcome: 'A negative right is a freedom *from* interference (e.g., the state cannot stop you from speaking).' },
                { text: 'positive rights are just more important rights', outcome: 'Not quite — Students often equate "positive rights" with "special privileges for some groups" or "violation.', reveals: 'students-often-equate-positive-rights' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_008', title: 'The tension between liberty and equality',
          caseStudy: { intro: 'Imagine a Class 11 student, Arjun, who wants to start a small online tutoring business (exercising his liberty to choose occupation).',
            decisions: [{ prompt: 'What is the core theoretical claim of the liberal perspective regarding the relationship between liberty and equality?', options: [
                { text: 'Liberals argue that liberty and equality are compatible only when equality is understood', outcome: 'Liberals argue that liberty and equality are compatible only when equality is understood as formal.' },
                { text: 'liberals want absolute equality', outcome: 'Not quite — Students often believe the tension is a zero-sum game: "more equality always means less liberty.', reveals: 'the-tension-is-a-zero' },
                { text: 'more equality always means less liberty, and vice versa', outcome: 'Not quite — Students often believe the tension is a zero-sum game: "more equality always means less liberty.', reveals: 'the-tension-is-a-zero' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_009', title: 'Dimensions of equality: Social, economic, political, and legal',
          caseStudy: { intro: 'Imagine two students, Riya and Karan. Riya attends a well-funded urban school with labs and libraries; Karan studies in a rural school with no electricity.',
            decisions: [{ prompt: 'List the four dimensions of equality discussed in the chapter and give one constitutional provision or right that exemplifies each.', options: [
                { text: 'Correct answer: Political – universal adult franchise (Article 326)', outcome: 'Correct answer: Political – universal adult franchise (Article 326); Social – abolition.' },
                { text: 'equality', outcome: 'Not quite — Students often think "equality" means only legal equality (Article 14) and that providing the same.', reveals: 'equality-means-only-legal-equality' },
                { text: 'mixes dimensions (e', outcome: 'Not quite — Students often think "equality" means only legal equality (Article 14) and that providing the same.', reveals: 'equality-means-only-legal-equality' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_010', title: 'Equality and difference: Recognising diversity',
          caseStudy: { intro: 'Imagine your school announces a new rule: "All students must climb the stairs to reach the third-floor classroom; no exceptions." This seems like equal.',
            decisions: [{ prompt: 'Define "formal equality" and "substantive equality" in one sentence each, citing the core distinction the NCERT textbook draws between them.', options: [
                { text: 'Formal equality means identical treatment by law regardless of circumstances (equality', outcome: 'Formal equality means identical treatment by law regardless of circumstances (equality before law).' },
                { text: 'formal equality is about law, substantive is about society', outcome: 'Not quite — Students believe "equality means treating everyone exactly the same" and therefore view *any*.', reveals: 'equality-means-treating-everyone-exactly' },
                { text: 'equality means treating everyone exactly the same', outcome: 'Not quite — Students believe "equality means treating everyone exactly the same" and therefore view *any*.', reveals: 'equality-means-treating-everyone-exactly' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A classmate argues against reservations at a debate: \'Equality means identical treatment — different cut-offs violate Article 14. And natural differences like talent are born, so inequality of outcome is just biology, not the state\'s business.\'',
            decisions: [{ prompt: 'How do Articles 14–16 and the natural/social distinction answer him?', options: [
                { text: 'Distinguish formal from substantive equality: identical treatment between unequals perpetuates inequality — Article 15(4)/16(4) constitutionalise special provisions precisely because starting conditions differ. And \'natural\' isn\'t a moral shield: many biological claims were ideology (race, gender), technology changes what a trait means (Hawking, screen readers), and justice targets circumstance-based disadvantage regardless of a trait\'s origin.', outcome: 'He sees the Constitution\'s own logic: equal worth sometimes requires differential treatment — and \'it\'s natural\' never settled whether its consequences are just.' },
                { text: 'Agree — equal means same rules for all; anything else is discrimination in reverse.', outcome: 'Formal equality between unequals entrenches the gap: the Constitution permits special provisions because identical treatment can be the vehicle of inequality.', reveals: 'equality-is-identical-treatment' },
                { text: 'Accept the biology point — born differences aren\'t anyone\'s fault, so outcomes follow.', outcome: 'Origin isn\'t consequence: a trait may be natural while its penalty is socially constructed — stairs, not legs, make a building inaccessible.', reveals: 'natural-inequality-unchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_03_010', title: 'You made it',
          caseStudy: { intro: 'Equal protection and equal treatment aren\'t twins — a ramp breaks formal sameness to deliver actual equality.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_007', difficulty: 'standard',
          question: 'T.H. Green\'s theory of positive rights holds that true freedom and equality.',
          hint: 'Review c11_ps_cbse_03_005 (Formal equality vs substantive equality) and the NCERT "Let\'s.',
          misconception: 'Students often equate "positive rights" with "special privileges for some groups" or "violation of liberty," thinking.',
          parts: [
                { id: 'a', prompt: 'Why does T.H. Green argue that formal equality before the law (negative liberty) is insufficient for real equality?', answer: 'Green argues that formal equality only removes legal barriers',
                  options: ['Green argues that formal equality only removes legal barriers', 'because laws are unfair'],
                  hint: 'Review c11_ps_cbse_03_005 (Formal equality vs substantive equality) and the NCERT "Let\'s Think" box.',
                  misconception: 'Students often equate "positive rights" with "special privileges for some groups" or "violation of liberty," thinking Green advocates state.' }
          ],
            remediations: { 'students-often-equate-positive-rights': { steps: ['Re-read the NCERT section "Equality Through Differential Treatment" (pp.', '45-46) and identify the *reason* given for special ramps/maternity leave: "not infringements of equality but.', 'Compare Article 14 (Equality before law — negative) with Article 39/41 (DPSPs — positive) in the Constitution.', 'Write one sentence for each: What does the state *refrain* from doing?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate "positive rights" with "special privileges for some groups" or "violation of liberty," thinking.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "T.H. Green\'s theory justifies an unlimited expansion of the welfare state because any unmet need can be framed as a barrier to positive.', answer: 'It is an overstatement',
                  options: ['It is an overstatement', 'justified and carefully reflected upon'],
                  hint: 'Review c11_ps_cbse_03_005 (Formal equality vs substantive equality) and the NCERT "Let\'s Think" box.',
                  misconception: 'Students often equate "positive rights" with "special privileges for some groups" or "violation of liberty," thinking Green advocates state.' }
          ],
            remediations: { 'students-often-equate-positive-rights': { steps: ['Re-read the NCERT section "Equality Through Differential Treatment" (pp.', '45-46) and identify the *reason* given for special ramps/maternity leave: "not infringements of equality but.', 'Compare Article 14 (Equality before law — negative) with Article 39/41 (DPSPs — positive) in the Constitution.', 'Write one sentence for each: What does the state *refrain* from doing?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_008', difficulty: 'standard',
          question: 'The tension between liberty and equality refers to the inherent conflict.',
          hint: 'Revisit c11_ps_cbse_03_005 (formal vs. substantive equality) and c11_ps_cbse_03_007 (T.H.',
          misconception: 'Students often believe the tension is a zero-sum game: "more equality always means less liberty, and vice versa." They.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The tension between liberty and equality refers to the inherent conflict in political',
                  options: ['The tension between liberty and equality refers to the inherent conflict in political', 'Equality in modern political thought is the moral and political principle that all human', 'Natural inequalities refer to differences in capabilities, talents, or physical', 'Equality of opportunity is the principle that all individuals should have the same legal'],
                  hint: 'Revisit c11_ps_cbse_03_005 (formal vs. substantive equality) and c11_ps_cbse_03_007 (T.H.',
                  misconception: 'Students often believe the tension is a zero-sum game: "more equality always means less liberty, and vice versa." They cite extreme.' }
          ],
            remediations: { 'the-tension-is-a-zero': { steps: ['Ask the student to list the liberty affected (taxpayer\'s freedom to dispose of full income).', 'Identify the equality served (redistribution for public goods, reducing wealth concentration).', 'Show how the Constitution authorizes this via legislative power (not executive fiat) and subjects it to judicial review.', 'Contrast with a hypothetical flat tax (formal equality) and ask which better realizes substantive equality.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_009', difficulty: 'standard',
          question: 'Dimensions of equality refer to the distinct spheres—political, social.',
          hint: 'Review the distinction between Article 14 (equality before law) and Article 15(4)/16(4).',
          misconception: 'Students often think "equality" means only legal equality (Article 14) and that providing the same rights to everyone.',
          parts: [
                { id: 'a', prompt: 'List the four dimensions of equality discussed in the chapter and give one constitutional provision or right that exemplifies each dimension.', answer: 'Correct answer: Political – universal adult franchise (Article 326)',
                  options: ['Correct answer: Political – universal adult franchise (Article 326)', 'equality', 'mixes dimensions (e'],
                  hint: 'Review the distinction between Article 14 (equality before law) and Article 15(4)/16(4) (special.',
                  misconception: 'Students often think "equality" means only legal equality (Article 14) and that providing the same rights to everyone automatically creates.' }
          ],
            remediations: { 'equality-means-only-legal-equality': { steps: ['Remediation: 1) Revisit node c11_ps_cbse_03_005 (Formal vs Substantive Equality) and create a two-column table: "Formal.', '2) Read the "Fact Sheet on Global Inequalities" and "Economic Inequalities in India" in the textbook; identify which.', '3) Write a 100-word explanation of why Article 14 alone could not abolish untouchability – needed Article 17 and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_03_010', difficulty: 'standard',
          question: 'Equality and difference: Recognising diversity refers to the political.',
          hint: 'Revisit c11_ps_cbse_03_005 (Formal equality vs substantive equality) and NCERT Section.',
          misconception: 'Students believe "equality means treating everyone exactly the same" and therefore view *any* differential treatment.',
          parts: [
                { id: 'a', prompt: 'A government introduces a policy: "All civil service exams will be conducted only in English and Hindi to ensure uniformity." A candidate from a non-Hindi.', answer: 'Step 1: Identify the rule (exams only in English/Hindi)',
                  options: ['Step 1: Identify the rule (exams only in English/Hindi)', 'administrative convenience', 'equality means treating everyone exactly the same'],
                  hint: 'Revisit c11_ps_cbse_03_005 (Formal equality vs substantive equality) and NCERT Section 3.4.',
                  misconception: 'Students believe "equality means treating everyone exactly the same" and therefore view *any* differential treatment (reservations.' }
          ],
            remediations: { 'equality-means-treating-everyone-exactly': { steps: ['Re-read NCERT pages 45-50 ("Equality Through Differential Treatment" and "Affirmative Action").', 'For each "LET\'S THINK" example (maternity leave, visually challenged equipment, basketball court, turban/prayer), write.', 'Read Article 15(3) and 16(4) of the Constitution.', 'Explain in your own words: "Special provisions are not exceptions to equality; they are the *method* to achieve.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
