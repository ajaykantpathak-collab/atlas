import type { SimDef } from '../../engine/types';
import C11_PoliticalScienceCitizenshipSim from '../../../simulations/c6_12/C11_PoliticalScienceCitizenshipSim';

/** v3 wrapped master — C11_PoliticalScienceCitizenshipSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_politicalsciencecitizenshipsim: SimDef = {
    id: 'v3w_c11_politicalsciencecitizenshipsim',
    title: 'What is citizenship: Full and equal membership of a political community',
    subtitle: 'This node covers the core definition of citizenship as \'full and equal membership\', the.',
    classLevel: 11, subject: 'political_science', topic: 'What is citizenship: Full and equal membership of a political community',
    chapters: [],
    nodeIds: ['c11_ps_cbse_06_001', 'c11_ps_cbse_06_002', 'c11_ps_cbse_06_003', 'c11_ps_cbse_06_004', 'c11_ps_cbse_06_005', 'c11_ps_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine a student from Bihar moving to Mumbai for an IT job but facing demands for \'local preference\' in.', goal: 'Master What is citizenship: Full and equal membership of a political community.' },
    discovery: {
        question: 'According to the NCERT Class 11 Political Theory textbook, how is citizenship defined in the opening section of Chapter 6?',
        options: ['Citizenship is defined as "full and equal membership of a political community."', 'full and equal membership of a political community', 'citizenship is the right to vote'],
        answer: 'Citizenship is defined as "full and equal membership of a political community."',
        hook: 'Students often think \'full and equal membership\' means *identical treatment* for everyone in every sphere (e.g., "if.',
    },
    teaching: [
        { title: 'Citizenship is the status of full and equal.', text: 'Citizenship is the status of full and equal membership in a political community (the state), which entitles individuals to a set of rights (political, civil, and socio-economic) and imposes.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_ps_cbse_06_001', title: 'Citizenship is the status of full and.',
          scaffold: { problem: 'A state government passes a law reserving 75% of private sector jobs (up to ₹30,000/month) for \'domiciled residents\'.',
            steps: [
            { text: 'Identify the core citizenship right at stake—Article 19(1)(e) (right to reside/settle anywhere) and Article 19(1)(g).' },
            { text: 'Recall the NCERT principle: \'full and equal membership\' means citizens should enjoy equal rights/opportunities.' },
            { text: 'Analyze the law\'s classification—it creates two classes of citizens: \'domiciled\' (insiders) and \'non-domiciled\'.' },
            { text: 'Apply the \'insider/outsider\' test from the textbook: the law treats migrant workers as \'threats\' to local jobs, exactly.' },
            { text: 'Consider the state\'s defense (protecting local youth unemployment) vs.' },
            { text: 'Conclude: The law likely violates the \'equal membership\' guarantee because it makes economic rights contingent on.', faded: true, blankAnswer: 'The law is likely unconstitutional. It violates the \'full.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_06_003', title: 'The liberal view of citizenship.',
          scaffold: { problem: 'The Karnataka government issues a notification requiring all gig workers (delivery, ride-hail) to register with a state labour board and.',
            steps: [
            { text: 'Identify the liberal right at stake — Article 19(1)(e) guarantees every citizen the right to "reside and settle in any.' },
            { text: 'Recall the liberal principle of *portability of rights* — Marshall\'s "equality of status" means citizenship rights.' },
            { text: 'Apply the "reasonable restriction" test (Article 19(6)) — the state may restrict Article 19(1)(g) only in the.' },
            { text: 'Assess proportionality — Does a 5-year residence requirement *necessarily* achieve welfare? No.' },
            { text: 'Evaluate the individualist logic — Liberal citizenship treats the worker as a rights-bearing agent choosing her.' },
            { text: 'Conclusion — The notification violates the liberal citizenship guarantee of equal, portable rights.', faded: true, blankAnswer: 'The 5-year domicile requirement for a gig worker permit.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_06_004', title: 'The communitarian view of citizenship.',
          scaffold: { problem: 'A municipal corporation proposes a bylaw making it mandatory for all residents to participate in monthly "Swachh Bharat" cleanliness.',
            steps: [
            { text: 'Identify the core conflict: state coercion vs. civic duty in a public health initiative.' },
            { text: 'Recall the liberal view: citizenship is a legal status granting rights; the state should be neutral; mandatory service.' },
            { text: 'Recall the communitarian view: citizenship is embedded in shared community values; a clean environment is a common.' },
            { text: 'Recall the civic republican view: citizenship is active participation in self-government; the bylaw cultivates civic.' },
            { text: 'Compare with Indian context: Fundamental Duties (Art. 51A) include protecting environment; but enforcement via fine may.' },
            { text: 'Conclude: The bylaw aligns with communitarian/republican ideals but requires procedural legitimacy (gram sabha.', faded: true, blankAnswer: 'The proposal is defensible under communitarian and civic.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_06_005', title: 'T.H. Marshall\'s theory defines.',
          scaffold: { problem: 'A state government passes a law requiring all candidates for local body elections to have a minimum educational qualification (Class 10.',
            steps: [
            { text: 'Identify the rights at stake — the law regulates *political rights* (right to stand for election) by imposing a *social.' },
            { text: 'Recall Marshall\'s core argument — social rights (education) are meant to *enable* political participation, not become a.' },
            { text: 'Apply to the Indian context — Article 243D/F (reservations in panchayats) and 73rd/74th Amendments aim to *include*.' },
            { text: 'Check Supreme Court precedent — In *Rajbala v. State of Haryana* (2015), the Court upheld a similar law for panchayats.' },
            { text: 'Conclude using Marshall — The law converts a social right (education access) into a gatekeeping device for political.', faded: true, blankAnswer: 'The law is constitutionally suspect under a Marshallian.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_ps_cbse_06_006', title: 'Jus soli (right of the soil) grants.',
          scaffold: { problem: 'Ravi was born in Chennai in 2010. His father is an Indian citizen; his mother is a Sri Lankan citizen who entered India on a valid visa but.',
            steps: [
            { text: 'Identify the relevant law – Section 3(1) of the Citizenship Act, 1955 as amended in 2003 (effective 3 Dec 2004).' },
            { text: 'State the condition for citizenship by birth for births on/after 3 Dec 2004: both parents are Indian citizens, OR one.' },
            { text: 'Apply facts – Father is Indian citizen (satisfies first part), but mother is an illegal migrant at time of birth (fails.' },
            { text: 'Conclude Ravi does NOT acquire citizenship by birth under Section 3(1).' },
            { text: 'Note alternative – Ravi may later apply for citizenship by registration (Section 5) or naturalisation (Section 6) if.', faded: true, blankAnswer: 'Ravi is not an Indian citizen by birth because his mother.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_ps_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'What is citizenship: Full and equal membership of a political community', spots: [
            { id: 's1', label: 'Citizenship is the status of', prompt: 'Which idea is this? — Citizenship is the status of full and equal membership in a political community (the.', answer: 'Citizenship is the status of', options: ['Citizenship is the status of', 'Citizenship as legal status refers', 'The liberal view of citizenship', 'The communitarian view of citizenship'] },
            { id: 's2', label: 'Citizenship as legal status refers', prompt: 'Which idea is this? — Citizenship as **legal status** refers to the formally recognized membership of an.', answer: 'Citizenship as legal status refers', options: ['Citizenship as legal status refers', 'Citizenship is the status of', 'The liberal view of citizenship', 'The communitarian view of citizenship'] },
            { id: 's3', label: 'The liberal view of citizenship', prompt: 'Which idea is this? — The liberal view of citizenship conceives the citizen as an autonomous rights-bearing.', answer: 'The liberal view of citizenship', options: ['The liberal view of citizenship', 'Citizenship is the status of', 'Citizenship as legal status refers', 'The communitarian view of citizenship'] },
            { id: 's4', label: 'The communitarian view of citizenship', prompt: 'Which idea is this? — The communitarian view of citizenship emphasizes that citizenship is rooted in shared.', answer: 'The communitarian view of citizenship', options: ['The communitarian view of citizenship', 'Citizenship is the status of', 'Citizenship as legal status refers', 'The liberal view of citizenship'] },
            { id: 's5', label: 'TH Marshalls theory defines citizenship', prompt: 'Which idea is this? — T.H. Marshall\'s theory defines citizenship as a status of full membership in a community.', answer: 'TH Marshalls theory defines citizenship', options: ['TH Marshalls theory defines citizenship', 'Citizenship is the status of', 'Citizenship as legal status refers', 'The liberal view of citizenship'] },
            { id: 's6', label: 'Jus soli right of the', prompt: 'Which idea is this? — Jus soli (right of the soil) grants citizenship to anyone born within a state\'s.', answer: 'Jus soli right of the', options: ['Jus soli right of the', 'Citizenship is the status of', 'Citizenship as legal status refers', 'The liberal view of citizenship'] }
          ] } }
    ],
    explore: { component: C11_PoliticalScienceCitizenshipSim, prompt: 'Explore the interactive — What is citizenship: Full and equal membership of a political community' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_001', difficulty: 'standard',
          question: 'Citizenship is the status of full and equal membership in a political community.',
          hint: 'If stuck, revisit Class 8 Civics Chapter 4 (c8_civ_ch4_5) for Fundamental Rights and.',
          misconception: 'Students often think \'full and equal membership\' means *identical treatment* for everyone in every sphere (e.g., "if.',
          parts: [
                { id: 'a', prompt: 'According to the NCERT Class 11 Political Theory textbook, how is citizenship defined in the opening section of Chapter 6?', answer: 'Citizenship is defined as "full and equal membership of a political community."',
                  options: ['Citizenship is defined as "full and equal membership of a political community."', 'full and equal membership of a political community', 'citizenship is the right to vote'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'full and equal membership\' means *identical treatment* for everyone in every sphere (e.g., "if citizens are equal,.' },
                { id: 'b', prompt: 'A group of nurses from Kerala working in Delhi hospitals faces resistance from a local residents\' welfare association (RWA) demanding \'80% jobs for locals\'.', answer: 'Yes, the demand violates the principle of full and equal membership',
                  options: ['Yes, the demand violates the principle of full and equal membership', 'if citizens are equal, why do SC/ST get reservations?'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think \'full and equal membership\' means *identical treatment* for everyone in every sphere (e.g., "if citizens are equal,.' }
          ],
            remediations: { 'full-and-equal-membership-means': { steps: ['Re-read NCERT Section 6.3 ("Equal Rights")—focus on the paragraph: "If the purpose is not just to make policies which.', 'Review Class 10 node c10_civ_cbse_03_008 (Constitutional Provisions Against Discrimination) to see how Articles 15(4),.', 'Apply the \'Olga Tellis\' logic: the Court gave *special* protection (alternative housing) to pavement dwellers *because*.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_002', difficulty: 'standard',
          question: 'Citizenship as **legal status** refers to the formally recognized membership of.',
          hint: 'If stuck, revisit **Article 51A** (Fundamental Duties) and the **Olga Tellis** case.',
          misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They.',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND**: Explain why the Supreme Court in *Olga Tellis v. Bombay Municipal Corporation* (1985) linked the **right to livelihood** (Art.', answer: '**Answer**: The Court held that Art',
                  options: ['**Answer**: The Court held that Art', 'the Court gave them a right to stay on pavements'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They believe rights are.' },
                { id: 'b', prompt: '**ANALYZE**: Compare the **obligation to pay taxes** (legal duty) with **volunteering for a neighborhood clean-up** (desirable activity).', answer: '**Answer**: Taxes fund municipal services (legal-contractual)',
                  options: ['**Answer**: Taxes fund municipal services (legal-contractual)', 'both are duties of a good citizen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They believe rights are.' }
          ],
            remediations: { 'students-equate-having-citizenship-documents': { steps: ['81–82: “Citizenship is not merely a legal concept… moral obligation to participate.” 2.', '**Map** the distinction: Create a two-column table—**Legal Status** (Articles 5–11, 14–32, 51A) vs.', '**Desirable Activity** (voting, RTI, Gram Sabha, community work).', '**Field task**: Interview a local ASHA worker or ward member—ask: “What do you do *beyond* your job description that.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They.',
          parts: [
                { id: 'a', prompt: '**ANALYZE**: Compare the **obligation to pay taxes** (legal duty) with **volunteering for a neighborhood clean-up** (desirable activity).', answer: '**Answer**: Taxes fund municipal services (legal-contractual)',
                  options: ['**Answer**: Taxes fund municipal services (legal-contractual)', 'both are duties of a good citizen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate **“having citizenship documents”** (Aadhaar, voter ID, passport) with **“being a citizen.”** They believe rights are.' }
          ],
            remediations: { 'students-equate-having-citizenship-documents': { steps: ['81–82: “Citizenship is not merely a legal concept… moral obligation to participate.” 2.', '**Map** the distinction: Create a two-column table—**Legal Status** (Articles 5–11, 14–32, 51A) vs.', '**Desirable Activity** (voting, RTI, Gram Sabha, community work).', '**Field task**: Interview a local ASHA worker or ward member—ask: “What do you do *beyond* your job description that.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_003', difficulty: 'standard',
          question: 'The liberal view of citizenship conceives the citizen as an autonomous.',
          hint: 'If stuck, revisit Class 10 Civics Chapter 1 (Power Sharing) and Chapter 5 (Outcomes of.',
          misconception: 'Students often think "liberal citizenship = selfish individualism with no duties." They confuse *rights-based* (the.',
          parts: [
                { id: 'a', prompt: 'State the three categories of rights in T.H. Marshall\'s liberal citizenship framework and give one concrete example of a right in each category that a citizen.', answer: 'Civil rights',
                  options: ['Correct answer: Civil rights', 'fundamental duties', 'directive principles'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "liberal citizenship = selfish individualism with no duties." They confuse *rights-based* (the state must justify.' },
                { id: 'b', prompt: 'A state government passes a law reserving 80% of private-sector jobs for "domiciled residents." Migrant workers from other states challenge it under Article.', answer: 'Step 1',
                  options: ['Correct answer: Step 1', 'states have the right to protect their own people', 'liberal citizenship = selfish individualism with no duties'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "liberal citizenship = selfish individualism with no duties." They confuse *rights-based* (the state must justify.' },
                { id: 'c', prompt: 'Compare how a liberal citizenship framework versus a communitarian framework would evaluate the following policy: "All citizens must perform one year of.', answer: 'Divergence 1',
                  options: ['Correct answer: Divergence 1', 'liberal citizenship = selfish individualism with no duties', '"liberal citizenship = selfish individualism with no duties'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "liberal citizenship = selfish individualism with no duties." They confuse *rights-based* (the state must justify.' }
          ],
            remediations: { 'liberal-citizenship-selfish-individualism-with': { steps: ['Re-read the Puttaswamy judgment summary (Class 11 textbook or NCERT Political Theory Ch.', 'Compare with Article 51A — list each duty and trace it back to a corresponding right (e.g., "protect sovereignty" ↔.', 'Write a two-column table: "Right" | "Corresponding Duty (if any)" — this makes the derivative logic visible.', 'Discuss with a peer: "If duties came first, could the state impose a duty without granting the right?" (Answer: that.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "liberal citizenship = selfish individualism with no duties." They confuse *rights-based* (the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The liberal view of citizenship, by focusing exclusively on individual rights, cannot adequately address historical group-based injustices.', answer: 'The claim is partially valid but incomplete',
                  options: ['Correct answer: The claim is partially valid but incomplete', 'liberalism opposes all reservations', 'liberal citizenship = selfish individualism with no duties', '"liberal citizenship = selfish individualism with no duties'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "liberal citizenship = selfish individualism with no duties." They confuse *rights-based* (the state must justify.' }
          ],
            remediations: { 'liberal-citizenship-selfish-individualism-with': { steps: ['Re-read the Puttaswamy judgment summary (Class 11 textbook or NCERT Political Theory Ch.', 'Compare with Article 51A — list each duty and trace it back to a corresponding right (e.g., "protect sovereignty" ↔.', 'Write a two-column table: "Right" | "Corresponding Duty (if any)" — this makes the derivative logic visible.', 'Discuss with a peer: "If duties came first, could the state impose a duty without granting the right?" (Answer: that.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_004', difficulty: 'standard',
          question: 'The communitarian view of citizenship emphasizes that citizenship is rooted in.',
          hint: 'Revisit node c11_ps_cbse_06_003 and the distinction between negative and positive liberty.',
          misconception: 'Students often think "communitarian" and "civic republican" are synonyms for "authoritarian" or "anti-rights." In.',
          parts: [
                { id: 'a', prompt: 'What is the core difference between the liberal view of citizenship and the communitarian view regarding the source of individual identity?', answer: 'The liberal view sees the individual as prior to society, with identity formed',
                  options: ['The liberal view sees the individual as prior to society, with identity formed', 'both agree identity comes from community', 'communitarian'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "communitarian" and "civic republican" are synonyms for "authoritarian" or "anti-rights." In reality, both traditions.' },
                { id: 'b', prompt: 'Why do civic republicans argue that citizenship requires active participation in public affairs, not just voting?', answer: 'Civic republicans believe freedom is realized through self-government',
                  options: ['Civic republicans believe freedom is realized through self-government', 'voting is enough', 'communitarian'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "communitarian" and "civic republican" are synonyms for "authoritarian" or "anti-rights." In reality, both traditions.' }
          ],
            remediations: { 'communitarian-and-civic-republican-are': { steps: ['Re-read the liberal view (node 003) to recall its individualist baseline.', 'Use the RWA waste-segregation scenario: list what a liberal, communitarian, and civic republican would each say.', 'Map each position to constitutional text—Fundamental Rights (liberal), Directive Principles (communitarian),.', 'Write a 3-sentence summary distinguishing the three views.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "communitarian" and "civic republican" are synonyms for "authoritarian" or "anti-rights." In.',
          parts: [
                { id: 'a', prompt: 'Evaluate the criticism that communitarian citizenship may justify majoritarian imposition on minorities. Use the Indian context of uniform civil code debates.', answer: 'Communitarian emphasis on shared values can marginalize minority cultures',
                  options: ['Communitarian emphasis on shared values can marginalize minority cultures', 'communitarian', 'civic republican', 'authoritarian'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "communitarian" and "civic republican" are synonyms for "authoritarian" or "anti-rights." In reality, both traditions.' }
          ],
            remediations: { 'communitarian-and-civic-republican-are': { steps: ['Re-read the liberal view (node 003) to recall its individualist baseline.', 'Use the RWA waste-segregation scenario: list what a liberal, communitarian, and civic republican would each say.', 'Map each position to constitutional text—Fundamental Rights (liberal), Directive Principles (communitarian),.', 'Write a 3-sentence summary distinguishing the three views.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_005', difficulty: 'standard',
          question: 'T.H. Marshall\'s theory defines citizenship as a status of full membership in a.',
          hint: 'Revisit Class 10 node c10_civ_cbse_05_003 ("Reduction of Inequality and Poverty in.',
          misconception: 'Students often think Marshall\'s three rights are *separate, sequential stages* that a country "completes" one by one.',
          parts: [
                { id: 'a', prompt: 'Why does Marshall argue that social rights are necessary to make civil and political rights "real" for the working class?', answer: 'Marshall argues that without social rights (education, healthcare, unemployment',
                  options: ['Marshall argues that without social rights (education, healthcare, unemployment', 'government charity', 'completes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Marshall\'s three rights are *separate, sequential stages* that a country "completes" one by one (e.g., "India got.' },
                { id: 'b', prompt: 'Compare Marshall\'s view of citizenship with the liberal view (node c11_ps_cbse_06_003).', answer: 'The liberal view sees the state as a neutral protector of negative liberties',
                  options: ['The liberal view sees the state as a neutral protector of negative liberties', 'night-watchman', 'welfare state'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Marshall\'s three rights are *separate, sequential stages* that a country "completes" one by one (e.g., "India got.' }
          ],
            remediations: { 'marshall-s-three-rights-are': { steps: ['If a student holds the "sequential checklist" misconception, have them: (1) Read the NCERT box on Marshall (p.', '87) and identify the phrase "quality of the given rights and duties improves" and "quantity of people upon whom they.', '(2) Map the Indian timeline: 1950 Constitution granted civil/political/social *directives* simultaneously (Fundamental.', '(3) Discuss a current issue (e.g., internet shutdowns in Kashmir) where civil rights are restricted *despite* political.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Marshall\'s three rights are *separate, sequential stages* that a country "completes" one by one.',
          parts: [
                { id: 'a', prompt: 'Compare Marshall\'s view of citizenship with the liberal view (node c11_ps_cbse_06_003).', answer: 'The liberal view sees the state as a neutral protector of negative liberties',
                  options: ['The liberal view sees the state as a neutral protector of negative liberties', 'night-watchman', 'welfare state', 'both want equality'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Marshall\'s three rights are *separate, sequential stages* that a country "completes" one by one (e.g., "India got.' }
          ],
            remediations: { 'marshall-s-three-rights-are': { steps: ['If a student holds the "sequential checklist" misconception, have them: (1) Read the NCERT box on Marshall (p.', '87) and identify the phrase "quality of the given rights and duties improves" and "quantity of people upon whom they.', '(2) Map the Indian timeline: 1950 Constitution granted civil/political/social *directives* simultaneously (Fundamental.', '(3) Discuss a current issue (e.g., internet shutdowns in Kashmir) where civil rights are restricted *despite* political.'] } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_006', difficulty: 'standard',
          question: 'Jus soli (right of the soil) grants citizenship to anyone born within a state\'s.',
          hint: 'Revisit node c11_ps_cbse_06_001 and read Articles 5‑11 of the Constitution (bare act).',
          misconception: 'Students often believe India follows pure jus soli because Article 5 granted citizenship to everyone born in India at.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Jus soli (right of the soil) grants citizenship to anyone born within a state\'s',
                  options: ['Jus soli (right of the soil) grants citizenship to anyone born within a state\'s', 'Citizenship is the status of full and equal membership in a political community (the', 'Citizenship as **legal status** refers to the formally recognized membership of an', 'The liberal view of citizenship conceives the citizen as an autonomous rights-bearing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe India follows pure jus soli because Article 5 granted citizenship to everyone born in India at commencement.' }
          ],
            remediations: { 'india-follows-pure-jus-soli': { steps: ['Re‑read Article 5 (citizenship at commencement) and Section 3 of the Citizenship Act, 1955 (as amended).', 'Create a two‑column table: "Pre‑1986" (pure jus soli) vs.', '"Post‑2003" (conditional jus soli) with the exact parental conditions.', 'Trace the 2003 amendment\'s rationale (Statement of Objects and Reasons) to understand the shift.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
