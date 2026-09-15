import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch06_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch06_p2: SimDef = {
    id: 'v3_c11_ps_ch06_p2',
    title: 'Citizenship · Part 2/2',
    subtitle: 'Learn why the ID card is the beginning of citizenship, not the end.',
    classLevel: 11, subject: 'political_science', topic: 'Citizenship · Part 2/2',
    chapters: ['c11_ps_ch06'],
    nodeIds: ['c11_ps_cbse_06_007', 'c11_ps_cbse_06_008', 'c11_ps_cbse_06_009', 'c11_ps_cbse_06_010', 'c11_ps_cbse_06_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a citizen auditing whether status alone delivers rights', intro: 'You hold the right to clean water and a dusty ward office that never meets — between the document and the delivery sits participation.', goal: 'Separate legal status from active citizenship and evaluate the free-rider problem.' },
    discovery: {
        question: 'Aadhaar card, voter ID, passport in hand — am I therefore a full citizen?',
        options: ['Only on paper — legal status is necessary but insufficient; rights aren\'t self-executing without citizens who monitor, demand and participate', 'Yes — documents are citizenship', 'Yes — the state will deliver the rest', 'No — documents prove nothing'],
        answer: 'Only on paper — legal status is necessary but insufficient; rights aren\'t self-executing without citizens who monitor, demand and participate',
        hook: 'And \'equal citizenship\' isn\'t identical treatment — different groups carry different needs, and uniform policy can be the unequal one.',
    },
    teaching: [
        { title: 'Acquiring citizenship: Birth, descent, naturalisation, marriage', text: 'Acquisition of citizenship refers to the legally prescribed modes by which an individual obtains full and equal membership of a political community, as defined by the Citizenship Act, 1955 (and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_06_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the free-rider test on a democracy where 90% merely vote and 10% do the watchdogging, then trace how movements made citizenship a project.',
        labels: ['Acquiring citizenship: Birth, descent,', 'Loss and deprivation', 'Global citizenship and cosmopolitanism', 'Dual citizenship and statelessness', 'Citizenship in the Indian'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_06_007', title: 'Acquiring citizenship: Birth, descent, naturalisation, marriage',
          caseStudy: { intro: 'Imagine a Class 11 student, Priya, reads a news report about a child born in Dubai to Indian parents, another about a Tibetan refugee living in India for 30.',
            decisions: [{ prompt: 'List the five modes of acquiring Indian citizenship as per the Citizenship Act, 1955.', options: [
                { text: 'The five modes are: (1) Citizenship by Birth (Section 3), (2) Citizenship by Descent', outcome: 'The five modes are: (1) Citizenship by Birth (Section 3), (2) Citizenship by Descent (Section 4).' },
                { text: 'marriage', outcome: 'Not quite — Students often believe "marriage to an Indian citizen" is a separate, automatic mode of acquiring.', reveals: 'marriage-to-an-indian-citizen' },
                { text: 'incorporation of territory', outcome: 'Not quite — Students often believe "marriage to an Indian citizen" is a separate, automatic mode of acquiring.', reveals: 'marriage-to-an-indian-citizen' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_06_010', title: 'Dual citizenship and statelessness',
          caseStudy: { intro: 'Imagine a student named Priya whose parents moved from India to Canada when she was three.',
            decisions: [{ prompt: 'What is the precise legal consequence under Indian law when an Indian citizen voluntarily acquires citizenship of another country?', options: [
                { text: 'Under Article 9 of the Constitution and Section 9 of the Citizenship Act, 1955, the', outcome: 'Under Article 9 of the Constitution and Section 9 of the Citizenship Act, 1955, the person.' },
                { text: 'they can keep both', outcome: 'Not quite — Students confuse OCI (Overseas Citizenship of India) with dual citizenship.', reveals: 'students-confuse-oci-overseas-citizenship' },
                { text: 'they need to renounce formally', outcome: 'Not quite — Students confuse OCI (Overseas Citizenship of India) with dual citizenship.', reveals: 'students-confuse-oci-overseas-citizenship' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_06_011', title: 'Citizenship in the Indian Constitution: Articles 5-11',
          caseStudy: { intro: 'Imagine a family that moved from Lahore to Delhi in 1948, another that stayed in Karachi, and a third whose members were born in Burma to Indian parents.',
            decisions: [{ prompt: 'Which article of the Constitution defines citizenship by domicile at the commencement of the Constitution, and what are the two main.', options: [
                { text: 'Article 5 defines citizenship by domicile', outcome: 'Article 5 defines citizenship by domicile. The two main conditions are: (1) the person must have.' },
                { text: 'Articles 5-8 create permanent, unchangeable categories of citizens', outcome: 'Not quite — Students often think Articles 5-8 create permanent, unchangeable categories of citizens.', reveals: 'articles-5-8-create-permanent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a civics workshop, a participant says: \'My voter ID proves I\'m a citizen — rights execute themselves, so attending ward meetings is optional. And equal citizenship means identical policies for everyone — reservations break that.\'',
            decisions: [{ prompt: 'What does citizenship actually require and permit?', options: [
                { text: 'Split status from activity: documents confer legal membership, but rights are parchment guarantees until citizens claim them — voting, deliberating, monitoring, filing complaints is what makes entitlement real (the Olga Tellis right meant nothing until organised citizens invoked it). And equal citizenship permits differentiated policies: Articles 15(4)/16(4) constitutionalise special provisions because different groups have different needs.', outcome: 'He sees both halves: legal status is necessary but insufficient without participation — and equal membership doesn\'t mean uniform treatment.' },
                { text: 'Accept the documents view — legal status IS citizenship; activity is extra credit.', outcome: 'Status without activity leaves rights unenforced: the state responds to citizens who monitor and demand — a voter ID alone doesn\'t deliver water.', reveals: 'documents-equal-citizenship' },
                { text: 'Accept uniform-policy logic — equal citizens should get identical treatment.', outcome: 'The textbook is explicit: equal rights need not mean uniform policies — different needs justify different provisions under the same Constitution.', reveals: 'equal-means-uniform' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_06_011', title: 'You made it',
          caseStudy: { intro: 'Democratic citizenship is a project, not a possession — the Olga Tellis pavement-dwellers got heard because someone kept demanding.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_007', difficulty: 'standard',
          question: 'Acquisition of citizenship refers to the legally prescribed modes by which.',
          hint: 'Revisit node c11_ps_cbse_06_006 (Citizenship and nationality: Jus soli vs jus sanguinis).',
          misconception: 'Students often believe "marriage to an Indian citizen" is a separate, automatic mode of acquiring citizenship.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast Citizenship by Registration (Section 5) and Citizenship by Naturalisation (Section 6) in terms of: (a) eligibility categories, (b).', answer: 'eligibility categories, (',
                  options: ['eligibility categories, (', 'marriage to an Indian citizen', 'both have same residence requirement or both are discretionary'],
                  hint: 'Revisit node c11_ps_cbse_06_006 (Citizenship and nationality: Jus soli vs jus sanguinis) and.',
                  misconception: 'Students often believe "marriage to an Indian citizen" is a separate, automatic mode of acquiring citizenship.' }
          ],
            remediations: { 'marriage-to-an-indian-citizen': { steps: ['If the student holds this misconception: Step 1 — Read Section 5(1)(c) of the Citizenship Act 1955 text: "a person who.', 'Step 3 — Check MHA circulars: registration applications by spouses are routinely scrutinised for "sham marriages".', 'Step 4 — Practice: "Ravi (Indian) marries Maria (Spanish) in 2020.', 'Can she get Indian citizenship in 2021?" Answer: No — she must be ORDINARILY RESIDENT in India for 7 years first.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "marriage to an Indian citizen" is a separate, automatic mode of acquiring citizenship.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Citizenship (Amendment) Act, 2019 fundamentally alters the principle of secular citizenship by introducing religion as a criterion.', answer: 'The statement is partially correct but requires nuance',
                  options: ['The statement is partially correct but requires nuance', 'it makes India a Hindu state', 'it has no religious criterion at all', 'marriage to an Indian citizen'],
                  hint: 'Revisit node c11_ps_cbse_06_006 (Citizenship and nationality: Jus soli vs jus sanguinis) and.',
                  misconception: 'Students often believe "marriage to an Indian citizen" is a separate, automatic mode of acquiring citizenship.' }
          ],
            remediations: { 'marriage-to-an-indian-citizen': { steps: ['If the student holds this misconception: Step 1 — Read Section 5(1)(c) of the Citizenship Act 1955 text: "a person who.', 'Step 3 — Check MHA circulars: registration applications by spouses are routinely scrutinised for "sham marriages".', 'Step 4 — Practice: "Ravi (Indian) marries Maria (Spanish) in 2020.', 'Can she get Indian citizenship in 2021?" Answer: No — she must be ORDINARILY RESIDENT in India for 7 years first.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_008', difficulty: 'standard',
          question: 'Loss of citizenship refers to the involuntary or voluntary cessation of the.',
          hint: 'Revisit c11_ps_cbse_06_007 (Acquisition modes) and c11_ps_cbse_06_011 (Articles 5-11).',
          misconception: 'Students often conflate *termination* (Section 9) and *deprivation* (Section 10), thinking both require a government.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Loss of citizenship refers to the involuntary or voluntary cessation of the legal bond',
                  options: ['Loss of citizenship refers to the involuntary or voluntary cessation of the legal bond', 'Citizenship is the status of full and equal membership in a political community (the', 'Citizenship as **legal status** refers to the formally recognized membership of an', 'The liberal view of citizenship conceives the citizen as an autonomous rights-bearing'],
                  hint: 'Revisit c11_ps_cbse_06_007 (Acquisition modes) and c11_ps_cbse_06_011 (Articles 5-11) to clarify.',
                  misconception: 'Students often conflate *termination* (Section 9) and *deprivation* (Section 10), thinking both require a government order.' }
          ],
            remediations: { 'students-often-conflate-termination-section': { steps: ['Re-read Sections 8, 9, 10 of the Citizenship Act, 1955 side-by-side in a table: Mode | Trigger | Who acts?', 'Watch the 10-minute explainer "Loss of Indian Citizenship" by *Lawctopus* on YouTube (timestamp 2:30 for Section 9.', 'Solve the 2018 UPSC Mains question: "Distinguish between renunciation, termination and deprivation of citizenship under.', 'Re-attempt Diagnostic Questions 2 and 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_009', difficulty: 'standard',
          question: 'Global citizenship refers to a moral and political identity that transcends.',
          hint: 'Revisit node c11_ps_cbse_06_006 (Citizenship and nationality: Jus soli vs jus sanguinis).',
          misconception: 'Students often conflate "global citizenship" with "world government" or "universal legal citizenship," believing.',
          parts: [
                { id: 'a', prompt: 'The NCERT text argues that global citizenship might help address the problem of stateless people and refugees.', answer: 'National citizenship fails stateless people',
                  options: ['National citizenship fails stateless people', 'each of them also fixes criteria for the grant of citizenship', 'states use their power to keep unwanted visitors out', 'the UN gives citizenship'],
                  hint: 'Revisit node c11_ps_cbse_06_006 (Citizenship and nationality: Jus soli vs jus sanguinis) to see how.',
                  misconception: 'Students often conflate "global citizenship" with "world government" or "universal legal citizenship," believing it requires a single.' }
          ],
            remediations: { 'students-often-conflate-global-citizenship': { steps: ['If a student confuses global citizenship with world government, have them re-read Section 6.6\'s last paragraph.', 'Fill each with 3 concrete examples (e.g., A: Indian passport; B: signing Amnesty International petition; C: none.', 'This makes the categorical distinction tangible.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_010', difficulty: 'standard',
          question: 'Dual citizenship refers to the legal status where an individual.',
          hint: 'Revisit c11_ps_cbse_06_001 (What is citizenship) and c11_ps_cbse_06_006 (Jus soli vs jus.',
          misconception: 'Students confuse OCI (Overseas Citizenship of India) with dual citizenship.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dual citizenship refers to the legal status where an individual is simultaneously',
                  options: ['Dual citizenship refers to the legal status where an individual is simultaneously', 'Citizenship is the status of full and equal membership in a political community (the', 'Citizenship as **legal status** refers to the formally recognized membership of an', 'The liberal view of citizenship conceives the citizen as an autonomous rights-bearing'],
                  hint: 'Revisit c11_ps_cbse_06_001 (What is citizenship) and c11_ps_cbse_06_006 (Jus soli vs jus sanguinis).',
                  misconception: 'Students confuse OCI (Overseas Citizenship of India) with dual citizenship.' }
          ],
            remediations: { 'students-confuse-oci-overseas-citizenship': { steps: ['Read Article 9 of Constitution and Section 7A of Citizenship Act (OCI provisions) side-by-side.', 'List every right an Indian citizen has (vote, public office, agricultural land, fundamental rights under Articles 15.', 'Cross out each right that OCI holders lack (all political rights, Articles 16/19 equality in public employment.', 'Conclude: OCI is a privileged residency status, not citizenship.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_06_011', difficulty: 'standard',
          question: 'Articles 5-11 of the Indian Constitution (Part II) define the initial.',
          hint: 'If stuck, revisit the definition of "domicile" vs. "residence" in c8_civ_ch4_1 and the.',
          misconception: 'Students often think Articles 5-8 create permanent, unchangeable categories of citizens.',
          parts: [
                { id: 'a', prompt: 'Which article of the Constitution defines citizenship by domicile at the commencement of the Constitution, and what are the two main conditions it prescribes?', answer: 'Article 5 defines citizenship by domicile',
                  options: ['Article 5 defines citizenship by domicile', 'Articles 5-8 create permanent, unchangeable categories of citizens'],
                  hint: 'If stuck, revisit the definition of "domicile" vs. "residence" in c8_civ_ch4_1 and the Partition.',
                  misconception: 'Students often think Articles 5-8 create permanent, unchangeable categories of citizens.' },
                { id: 'b', prompt: 'A person born in Rangoon (Burma) in 1930 to parents born in India, who has never lived in India, applies for Indian citizenship in 1950.', answer: 'Article 8 covers persons of Indian origin residing outside India',
                  options: ['Article 8 covers persons of Indian origin residing outside India', 'Articles 5-8 create permanent, unchangeable categories of citizens'],
                  hint: 'If stuck, revisit the definition of "domicile" vs. "residence" in c8_civ_ch4_1 and the Partition.',
                  misconception: 'Students often think Articles 5-8 create permanent, unchangeable categories of citizens.' }
          ],
            remediations: { 'articles-5-8-create-permanent': { steps: ['Re-read the text of Articles 5-11 in the Constitution (Part II).', 'Create a timeline: 26 Nov 1949 (adoption) → 26 Jan 1950 (commencement).', 'For each article, note the cut-off date and the category of persons.', 'Then read Section 3-7 of the Citizenship Act, 1955 to see how Parliament operationalized these categories.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
