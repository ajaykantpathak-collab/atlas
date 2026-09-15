import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch06_p1: SimDef = {
    id: 'v3_c11_ps_ch06_p1',
    title: 'Citizenship · Part 1/2',
    subtitle: 'Learn why the ID card is the beginning of citizenship, not the end.',
    classLevel: 11, subject: 'political_science', topic: 'Citizenship · Part 1/2',
    chapters: ['c11_ps_ch06'],
    nodeIds: ['c11_ps_cbse_06_001', 'c11_ps_cbse_06_002', 'c11_ps_cbse_06_003', 'c11_ps_cbse_06_004', 'c11_ps_cbse_06_005', 'c11_ps_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a citizen auditing whether status alone delivers rights', intro: 'You hold the right to clean water and a dusty ward office that never meets — between the document and the delivery sits participation.', goal: 'Separate legal status from active citizenship and evaluate the free-rider problem.' },
    discovery: {
        question: 'Aadhaar card, voter ID, passport in hand — am I therefore a full citizen?',
        options: ['Only on paper — legal status is necessary but insufficient; rights aren\'t self-executing without citizens who monitor, demand and participate', 'Yes — documents are citizenship', 'Yes — the state will deliver the rest', 'No — documents prove nothing'],
        answer: 'Only on paper — legal status is necessary but insufficient; rights aren\'t self-executing without citizens who monitor, demand and participate',
        hook: 'And \'equal citizenship\' isn\'t identical treatment — different groups carry different needs, and uniform policy can be the unequal one.',
    },
    teaching: [
        { title: 'What is citizenship: Full and equal membership of a political community', text: 'Citizenship is the status of full and equal membership in a political community (the state), which entitles individuals to a set of rights (political, civil, and socio-economic) and imposes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the free-rider test on a democracy where 90% merely vote and 10% do the watchdogging, then trace how movements made citizenship a project.',
        labels: ['What is citizenship: Full', 'Citizenship as legal status', 'Liberal view of citizenship', 'Communitarian and civic republican', 'T.H. Marshall: Civil, political', 'Citizenship and nationality: Jus'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_06_001', title: 'What is citizenship: Full and equal membership of a political community',
          caseStudy: { intro: 'Imagine a student from Bihar moving to Mumbai for an IT job but facing demands for \'local preference\' in housing and jobs—this is the \'insider vs outsider\'.',
            decisions: [{ prompt: 'According to the NCERT Class 11 Political Theory textbook, how is citizenship defined in the opening section of Chapter 6?', options: [
                { text: 'Citizenship is defined as "full and equal membership of a political community."', outcome: 'Citizenship is defined as "full and equal membership of a political community." A wrong answer.' },
                { text: 'full and equal membership of a political community', outcome: 'Not quite — Students often think \'full and equal membership\' means *identical treatment* for everyone in every.', reveals: 'full-and-equal-membership-means' },
                { text: 'citizenship is the right to vote', outcome: 'Not quite — Students often think \'full and equal membership\' means *identical treatment* for everyone in every.', reveals: 'full-and-equal-membership-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_06_003', title: 'Liberal view of citizenship: Rights-based and individualist',
          caseStudy: { intro: 'Imagine a Class 11 student from Bihar working as a delivery partner in Bengaluru — she votes in Bihar, pays GST in Karnataka, uses a ration card issued in her.',
            decisions: [{ prompt: 'State the three categories of rights in T.H. Marshall\'s liberal citizenship framework and give one concrete example of a right in each.', options: [
                { text: 'Correct answer: Civil rights', outcome: 'Correct answer: Civil rights — e.g., Article 21 right to life and personal liberty (protection from.' },
                { text: 'fundamental duties', outcome: 'Not quite — Students often think "liberal citizenship = selfish individualism with no duties." They confuse.', reveals: 'liberal-citizenship-selfish-individualism-with' },
                { text: 'directive principles', outcome: 'Not quite — Students often think "liberal citizenship = selfish individualism with no duties." They confuse.', reveals: 'liberal-citizenship-selfish-individualism-with' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_06_004', title: 'Communitarian and civic republican view of citizenship',
          caseStudy: { intro: 'Imagine a Resident Welfare Association (RWA) meeting in your Delhi neighbourhood debating whether to make waste segregation mandatory.',
            decisions: [{ prompt: 'What is the core difference between the liberal view of citizenship and the communitarian view regarding the source of individual identity?', options: [
                { text: 'The liberal view sees the individual as prior to society, with identity formed', outcome: 'The liberal view sees the individual as prior to society, with identity formed independently; the.' },
                { text: 'both agree identity comes from community', outcome: 'Not quite — Students often think "communitarian" and "civic republican" are synonyms for "authoritarian".', reveals: 'communitarian-and-civic-republican-are' },
                { text: 'communitarian', outcome: 'Not quite — Students often think "communitarian" and "civic republican" are synonyms for "authoritarian".', reveals: 'communitarian-and-civic-republican-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_06_005', title: 'T.H. Marshall: Civil, political and social citizenship',
          caseStudy: { intro: 'Imagine a sanitation worker in Delhi who has the right to vote (political right) and cannot be arbitrarily arrested (civil right), but lives in a slum without.',
            decisions: [{ prompt: 'According to T.H. Marshall, which of the following correctly sequences the historical emergence of the three elements of citizenship?', options: [
                { text: 'Correct sequence: Civil rights (18th century) → Political rights (19th century) → Social', outcome: 'Correct sequence: Civil rights (18th century) → Political rights (19th century) → Social rights.' },
                { text: 'completes', outcome: 'Not quite — Students often think Marshall\'s three rights are *separate, sequential stages* that a country.', reveals: 'marshall-s-three-rights-are' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a civics workshop, a participant says: \'My voter ID proves I\'m a citizen — rights execute themselves, so attending ward meetings is optional. And equal citizenship means identical policies for everyone — reservations break that.\'',
            decisions: [{ prompt: 'What does citizenship actually require and permit?', options: [
                { text: 'Split status from activity: documents confer legal membership, but rights are parchment guarantees until citizens claim them — voting, deliberating, monitoring, filing complaints is what makes entitlement real (the Olga Tellis right meant nothing until organised citizens invoked it). And equal citizenship permits differentiated policies: Articles 15(4)/16(4) constitutionalise special provisions because different groups have different needs.', outcome: 'He sees both halves: legal status is necessary but insufficient without participation — and equal membership doesn\'t mean uniform treatment.' },
                { text: 'Accept the documents view — legal status IS citizenship; activity is extra credit.', outcome: 'Status without activity leaves rights unenforced: the state responds to citizens who monitor and demand — a voter ID alone doesn\'t deliver water.', reveals: 'documents-equal-citizenship' },
                { text: 'Accept uniform-policy logic — equal citizens should get identical treatment.', outcome: 'The textbook is explicit: equal rights need not mean uniform policies — different needs justify different provisions under the same Constitution.', reveals: 'equal-means-uniform' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'Democratic citizenship is a project, not a possession — the Olga Tellis pavement-dwellers got heard because someone kept demanding.',
            decisions: [{ prompt: 'What comes next? Citizenship · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Citizenship · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_001', difficulty: 'standard',
          question: 'Citizenship is the status of full and equal membership in a political community.',
          hint: 'If stuck, revisit Class 8 Civics Chapter 4 (c8_civ_ch4_5) for Fundamental Rights and.',
          misconception: 'Students often think \'full and equal membership\' means *identical treatment* for everyone in every sphere (e.g., "if.',
          parts: [
                { id: 'a', prompt: 'According to the NCERT Class 11 Political Theory textbook, how is citizenship defined in the opening section of Chapter 6?', answer: 'Citizenship is defined as "full and equal membership of a political community."',
                  options: ['Citizenship is defined as "full and equal membership of a political community."', 'full and equal membership of a political community', 'citizenship is the right to vote', 'citizenship is holding a passport'],
                  hint: 'If stuck, revisit Class 8 Civics Chapter 4 (c8_civ_ch4_5) for Fundamental Rights and Class 10.',
                  misconception: 'Students often think \'full and equal membership\' means *identical treatment* for everyone in every sphere (e.g., "if citizens are equal.' },
                { id: 'b', prompt: 'A group of nurses from Kerala working in Delhi hospitals faces resistance from a local residents\' welfare association (RWA) demanding \'80% jobs for locals\'.', answer: 'Yes, the demand violates the principle of full and equal membership',
                  options: ['Yes, the demand violates the principle of full and equal membership', 'if citizens are equal, why do SC/ST get reservations?'],
                  hint: 'If stuck, revisit Class 8 Civics Chapter 4 (c8_civ_ch4_5) for Fundamental Rights and Class 10.',
                  misconception: 'Students often think \'full and equal membership\' means *identical treatment* for everyone in every sphere (e.g., "if citizens are equal.' }
          ],
            remediations: { 'full-and-equal-membership-means': { steps: ['Re-read NCERT Section 6.3 ("Equal Rights")—focus on the paragraph: "If the purpose is not just to make policies which.', 'Review Class 10 node c10_civ_cbse_03_008 (Constitutional Provisions Against Discrimination) to see how Articles 15(4).', 'Apply the \'Olga Tellis\' logic: the Court gave *special* protection (alternative housing) to pavement dwellers *because*.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_002', difficulty: 'standard',
          question: 'Citizenship as **legal status** refers to the formally recognized membership.',
          hint: 'If stuck, revisit **Article 51A** (Fundamental Duties) and the **Olga Tellis** case.',
          misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND**: Explain why the Supreme Court in *Olga Tellis v. Bombay Municipal Corporation* (1985) linked the **right to livelihood** (Art.', answer: '**Answer**: The Court held that Art',
                  options: ['**Answer**: The Court held that Art', 'the Court gave them a right to stay on pavements'],
                  hint: 'If stuck, revisit **Article 51A** (Fundamental Duties) and the **Olga Tellis** case (NCERT p.',
                  misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They believe rights are.' },
                { id: 'b', prompt: '**ANALYZE**: Compare the **obligation to pay taxes** (legal duty) with **volunteering for a neighborhood clean-up** (desirable activity).', answer: '**Answer**: Taxes fund municipal services (legal-contractual)',
                  options: ['**Answer**: Taxes fund municipal services (legal-contractual)', 'both are duties of a good citizen'],
                  hint: 'If stuck, revisit **Article 51A** (Fundamental Duties) and the **Olga Tellis** case (NCERT p.',
                  misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They believe rights are.' }
          ],
            remediations: { 'students-equate-having-citizenship-documents': { steps: ['81–82: “Citizenship is not merely a legal concept… moral obligation to participate.” 2.', '**Map** the distinction: Create a two-column table—**Legal Status** (Articles 5–11, 14–32, 51A) vs.', '**Desirable Activity** (voting, RTI, Gram Sabha, community work).', '**Field task**: Interview a local ASHA worker or ward member—ask: “What do you do *beyond* your job description that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_003', difficulty: 'standard',
          question: 'The liberal view of citizenship conceives the citizen as an autonomous.',
          hint: 'If stuck, revisit Class 10 Civics Chapter 1 (Power Sharing) and Chapter 5 (Outcomes.',
          misconception: 'Students often think "liberal citizenship = selfish individualism with no duties." They confuse *rights-based* (the.',
          parts: [
                { id: 'a', prompt: 'State the three categories of rights in T.H. Marshall\'s liberal citizenship framework and give one concrete example of a right in each category that a citizen.', answer: 'Correct answer: Civil rights',
                  options: ['Correct answer: Civil rights', 'fundamental duties', 'directive principles', 'liberal citizenship = selfish individualism with no duties'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 1 (Power Sharing) and Chapter 5 (Outcomes of Democracy).',
                  misconception: 'Students often think "liberal citizenship = selfish individualism with no duties." They confuse *rights-based* (the state must justify.' },
                { id: 'b', prompt: 'A state government passes a law reserving 80% of private-sector jobs for "domiciled residents." Migrant workers from other states challenge it under Article.', answer: 'Correct answer: Step 1',
                  options: ['Correct answer: Step 1', 'states have the right to protect their own people', 'liberal citizenship = selfish individualism with no duties', '"liberal citizenship = selfish individualism with no duties'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 1 (Power Sharing) and Chapter 5 (Outcomes of Democracy).',
                  misconception: 'Students often think "liberal citizenship = selfish individualism with no duties." They confuse *rights-based* (the state must justify.' },
                { id: 'c', prompt: 'Compare how a liberal citizenship framework versus a communitarian framework would evaluate the following policy: "All citizens must perform one year.', answer: 'Correct answer: Divergence 1',
                  options: ['Correct answer: Divergence 1', 'liberal citizenship = selfish individualism with no duties', '"liberal citizenship = selfish individualism with no duties'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 1 (Power Sharing) and Chapter 5 (Outcomes of Democracy).',
                  misconception: 'Students often think "liberal citizenship = selfish individualism with no duties." They confuse *rights-based* (the state must justify.' }
          ],
            remediations: { 'liberal-citizenship-selfish-individualism-with': { steps: ['Re-read the Puttaswamy judgment summary (Class 11 textbook or NCERT Political Theory Ch.', 'Compare with Article 51A — list each duty and trace it back to a corresponding right (e.g., "protect sovereignty" ↔.', 'Write a two-column table: "Right" | "Corresponding Duty (if any)" — this makes the derivative logic visible.', 'Discuss with a peer: "If duties came first, could the state impose a duty without granting the right?" (Answer: that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "liberal citizenship = selfish individualism with no duties." They confuse *rights-based* (the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The liberal view of citizenship, by focusing exclusively on individual rights, cannot adequately address historical group-based injustices.', answer: 'Correct answer: The claim is partially valid but incomplete',
                  options: ['Correct answer: The claim is partially valid but incomplete', 'liberalism opposes all reservations', 'liberal citizenship = selfish individualism with no duties', '"liberal citizenship = selfish individualism with no duties'],
                  hint: 'If stuck, revisit Class 10 Civics Chapter 1 (Power Sharing) and Chapter 5 (Outcomes of Democracy).',
                  misconception: 'Students often think "liberal citizenship = selfish individualism with no duties." They confuse *rights-based* (the state must justify.' }
          ],
            remediations: { 'liberal-citizenship-selfish-individualism-with': { steps: ['Re-read the Puttaswamy judgment summary (Class 11 textbook or NCERT Political Theory Ch.', 'Compare with Article 51A — list each duty and trace it back to a corresponding right (e.g., "protect sovereignty" ↔.', 'Write a two-column table: "Right" | "Corresponding Duty (if any)" — this makes the derivative logic visible.', 'Discuss with a peer: "If duties came first, could the state impose a duty without granting the right?" (Answer: that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_004', difficulty: 'standard',
          question: 'The communitarian view of citizenship emphasizes that citizenship is rooted.',
          hint: 'Revisit node c11_ps_cbse_06_003 and the distinction between negative and positive liberty.',
          misconception: 'Students often think "communitarian" and "civic republican" are synonyms for "authoritarian" or "anti-rights.".',
          parts: [
                { id: 'a', prompt: 'What is the core difference between the liberal view of citizenship and the communitarian view regarding the source of individual identity?', answer: 'The liberal view sees the individual as prior to society, with identity formed',
                  options: ['The liberal view sees the individual as prior to society, with identity formed', 'both agree identity comes from community', 'communitarian', 'civic republican'],
                  hint: 'Revisit node c11_ps_cbse_06_003 and the distinction between negative and positive liberty in the.',
                  misconception: 'Students often think "communitarian" and "civic republican" are synonyms for "authoritarian" or "anti-rights." In reality, both traditions.' },
                { id: 'b', prompt: 'Why do civic republicans argue that citizenship requires active participation in public affairs, not just voting?', answer: 'Civic republicans believe freedom is realized through self-government',
                  options: ['Civic republicans believe freedom is realized through self-government', 'voting is enough', 'communitarian', 'civic republican'],
                  hint: 'Revisit node c11_ps_cbse_06_003 and the distinction between negative and positive liberty in the.',
                  misconception: 'Students often think "communitarian" and "civic republican" are synonyms for "authoritarian" or "anti-rights." In reality, both traditions.' }
          ],
            remediations: { 'communitarian-and-civic-republican-are': { steps: ['Re-read the liberal view (node 003) to recall its individualist baseline.', 'Use the RWA waste-segregation scenario: list what a liberal, communitarian, and civic republican would each say.', 'Map each position to constitutional text—Fundamental Rights (liberal), Directive Principles (communitarian).', 'Write a 3-sentence summary distinguishing the three views.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_005', difficulty: 'standard',
          question: 'T.H. Marshall\'s theory defines citizenship as a status of full membership in.',
          hint: 'Revisit Class 10 node c10_civ_cbse_05_003 ("Reduction of Inequality and Poverty.',
          misconception: 'Students often think Marshall\'s three rights are *separate, sequential stages* that a country "completes" one by one.',
          parts: [
                { id: 'a', prompt: 'Why does Marshall argue that social rights are necessary to make civil and political rights "real" for the working class?', answer: 'Marshall argues that without social rights (education, healthcare, unemployment',
                  options: ['Marshall argues that without social rights (education, healthcare, unemployment', 'government charity', 'completes'],
                  hint: 'Revisit Class 10 node c10_civ_cbse_05_003 ("Reduction of Inequality and Poverty in Democracies").',
                  misconception: 'Students often think Marshall\'s three rights are *separate, sequential stages* that a country "completes" one by one (e.g., "India got.' },
                { id: 'b', prompt: 'Compare Marshall\'s view of citizenship with the liberal view (node c11_ps_cbse_06_003).', answer: 'The liberal view sees the state as a neutral protector of negative liberties',
                  options: ['The liberal view sees the state as a neutral protector of negative liberties', 'night-watchman', 'welfare state', 'both want equality'],
                  hint: 'Revisit Class 10 node c10_civ_cbse_05_003 ("Reduction of Inequality and Poverty in Democracies").',
                  misconception: 'Students often think Marshall\'s three rights are *separate, sequential stages* that a country "completes" one by one (e.g., "India got.' }
          ],
            remediations: { 'marshall-s-three-rights-are': { steps: ['If a student holds the "sequential checklist" misconception, have them: (1) Read the NCERT box on Marshall (p.', '87) and identify the phrase "quality of the given rights and duties improves" and "quantity of people upon whom they.', '(2) Map the Indian timeline: 1950 Constitution granted civil/political/social *directives* simultaneously (Fundamental.', '(3) Discuss a current issue (e.g., internet shutdowns in Kashmir) where civil rights are restricted *despite* political.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_006', difficulty: 'standard',
          question: 'Jus soli (right of the soil) grants citizenship to anyone born within a state\'s.',
          hint: 'Revisit node c11_ps_cbse_06_001 and read Articles 5‑11 of the Constitution (bare act).',
          misconception: 'Students often believe India follows pure jus soli because Article 5 granted citizenship to everyone born in India.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Jus soli (right of the soil) grants citizenship to anyone born within a state\'s',
                  options: ['Jus soli (right of the soil) grants citizenship to anyone born within a state\'s', 'Citizenship is the status of full and equal membership in a political community (the', 'Citizenship as **legal status** refers to the formally recognized membership of an', 'The liberal view of citizenship conceives the citizen as an autonomous rights-bearing'],
                  hint: 'Revisit node c11_ps_cbse_06_001 and read Articles 5‑11 of the Constitution (bare act).',
                  misconception: 'Students often believe India follows pure jus soli because Article 5 granted citizenship to everyone born in India at commencement.' }
          ],
            remediations: { 'india-follows-pure-jus-soli': { steps: ['Re‑read Article 5 (citizenship at commencement) and Section 3 of the Citizenship Act, 1955 (as amended).', 'Create a two‑column table: "Pre‑1986" (pure jus soli) vs.', '"Post‑2003" (conditional jus soli) with the exact parental conditions.', 'Trace the 2003 amendment\'s rationale (Statement of Objects and Reasons) to understand the shift.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
