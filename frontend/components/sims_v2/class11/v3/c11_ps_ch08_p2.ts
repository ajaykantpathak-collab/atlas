import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch08_p2: SimDef = {
    id: 'v3_c11_ps_ch08_p2',
    title: 'Secularism · Part 2/2',
    subtitle: 'Meet a secularism that intervenes — on principle.',
    classLevel: 11, subject: 'political_science', topic: 'Secularism · Part 2/2',
    chapters: ['c11_ps_ch08'],
    nodeIds: ['c11_ps_cbse_08_007', 'c11_ps_cbse_08_008', 'c11_ps_cbse_08_009', 'c11_ps_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a constitutional designer choosing between a wall and a scalpel', intro: 'A state that funds a madrasa and bans a discriminatory practice in the same year isn\'t confused — it\'s a different model of secular.', goal: 'Contrast Indian principled-distance secularism with strict separation and equal-respect readings.' },
    discovery: {
        question: 'Indian secularism: equal funding for all religions, or a wall that never touches religion at all?',
        options: ['Neither — it permits principled intervention (banning triple talaq, temple reform) to oppose domination while respecting faith', 'Equal support for every religion', 'Total separation — the state stays out entirely', 'Whatever the majority religion prefers'],
        answer: 'Neither — it permits principled intervention (banning triple talaq, temple reform) to oppose domination while respecting faith',
        hook: 'Secularism isn\'t anti-religious — it fights domination inside and between religions, not the faith itself; intervention can serve values religion shares.',
    },
    teaching: [
        { title: 'Critiques of secularism: Communitarian and feminist', text: 'Communitarian critique argues that secularism\'s focus on individual rights and state neutrality undermines community identity, collective religious autonomy, and minority cultural survival.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Judge whether \'Sarva Dharma Samabhava\' forbids the state from reforming a harmful practice, and contrast the Indian model with the American wall.',
        labels: ['Critiques of secularism: Communitarian', 'Secularism and minority rights', 'The Shah Bano case', 'Challenges to secularism'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_007', title: 'Critiques of secularism: Communitarian and feminist',
          caseStudy: { intro: 'Imagine a Class 11 student reading a news report about the 2017 Supreme Court verdict on triple talaq: Muslim women\'s groups celebrate it as a victory for.',
            decisions: [{ prompt: 'What is the central claim of the communitarian critique of secularism regarding minority communities?', options: [
                { text: 'The communitarian critique argues that secularism\'s emphasis on individual rights and', outcome: 'The communitarian critique argues that secularism\'s emphasis on individual rights and state.' },
                { text: 'communitarians say secularism is anti-religious', outcome: 'Not quite — Students often think "communitarian critique = opposition to secularism" and "feminist critique.', reveals: 'communitarian-critique-opposition-to-secularism' },
                { text: 'anti-religious', outcome: 'Not quite — Students often think "communitarian critique = opposition to secularism" and "feminist critique.', reveals: 'communitarian-critique-opposition-to-secularism' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_008', title: 'Secularism and minority rights: Protection and accommodation',
          caseStudy: { intro: 'Imagine you are a Class 11 student in a school where the morning assembly includes a Sanskrit prayer, the canteen serves only vegetarian food on Tuesdays, and.',
            decisions: [{ prompt: 'Which two Articles of the Indian Constitution specifically guarantee cultural and educational rights to minorities, and what is the key.', options: [
                { text: 'Article 29(1) protects the right of *any section of citizens* (not only minorities) with', outcome: 'Article 29(1) protects the right of *any section of citizens* (not only minorities) with a distinct.' },
                { text: 'special privileges', outcome: 'Not quite — Students often believe **minority rights under Articles 29–30 are "special privileges".', reveals: 'minority-rights-under-articles-29' },
                { text: 'appeasement', outcome: 'Not quite — Students often believe **minority rights under Articles 29–30 are "special privileges".', reveals: 'minority-rights-under-articles-29' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_009', title: 'The Shah Bano case and the uniform civil code debate',
          caseStudy: { intro: 'Imagine you see a heated TV debate where one panelist argues "UCC is necessary for women\'s rights" while another says "UCC destroys minority identity.".',
            decisions: [{ prompt: 'What was the core legal question in the Shah Bano case (1985) regarding the applicability of Section 125 CrPC to Muslim women?', options: [
                { text: 'The core legal question was whether Section 125 CrPC (a secular, religion-neutral law', outcome: 'The core legal question was whether Section 125 CrPC (a secular, religion-neutral law providing.' },
                { text: 'The case banned triple talaq', outcome: 'Not quite — Students often believe the Shah Bano case was about "banning triple talaq" or that the Uniform.', reveals: 'the-shah-bano-case-was' },
                { text: 'It was about property rights', outcome: 'Not quite — Students often believe the Shah Bano case was about "banning triple talaq" or that the Uniform.', reveals: 'the-shah-bano-case-was' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_010', title: 'Challenges to secularism in India: Communalism and politicisation of religion',
          caseStudy: { intro: 'Imagine you see a political rally where a leader declares, "If you vote for me, I will build a grand temple/mosque/church for your community," while another.',
            decisions: [{ prompt: 'Define communalism as a political ideology in the Indian context. How does it differ from merely being a devout follower of a religion?', options: [
                { text: 'Communalism is the belief that people of the same religion share identical political,', outcome: 'Communalism is the belief that people of the same religion share identical political, economic, and.' },
                { text: 'secularism means the state must be completely hands-off from religion', outcome: 'Not quite — Students often believe "secularism means the state must be completely hands-off from religion".', reveals: 'secularism-means-the-state-must' },
                { text: 'secularism means the state must fund/support all religions equally', outcome: 'Not quite — Students often believe "secularism means the state must be completely hands-off from religion".', reveals: 'secularism-means-the-state-must' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a debate on \'Is India truly secular?\', a student argues: \'A secular state must keep a wall between itself and religion — so government running the Tirupati temple board or banning triple talaq is anti-secular interference.\'',
            decisions: [{ prompt: 'What does Indian secularism actually permit?', options: [
                { text: 'Explain principled distance: Indian secularism isn\'t a wall of total separation — the state may engage or disengage to uphold freedom and equality, opposing both inter-religious AND intra-religious domination. Managing the temple board prevents mismanagement and ensures access; banning triple talaq protects members from domination inside their own community — the state may even show \'equal disrespect\' to oppressive aspects of any religion.', outcome: 'The debate reframes: the test isn\'t whether the state touched religion, but whether the touch served constitutional values — principled distance, not abstention.' },
                { text: 'Support the wall model — any state action involving religion violates secularism.', outcome: 'That imports the American strict-separation model: Indian secularism permits engagement precisely where religion harbours domination — neutrality is even-handed pursuit of values, not abstention.', reveals: 'secularism-is-total-separation' },
                { text: 'Redefine secularism as equal support — equal holidays and funding for all religions.', outcome: 'Equal accommodation can entrench intra-religious oppression (caste, gender): secularism targets domination inside religions too, not just imbalance between them.', reveals: 'secularism-is-equal-support' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_010', title: 'You made it',
          caseStudy: { intro: 'Neutrality in India means even-handed pursuit of constitutional values — sometimes that requires stepping in, not staying out.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_08_007', difficulty: 'standard',
          question: 'Communitarian critique argues that secularism\'s focus on individual rights and.',
          hint: 'Revisit c11_ps_cbse_08_004 (Indian model) and c11_ps_cbse_08_005 (principled distance).',
          misconception: 'Students often think "communitarian critique = opposition to secularism" and "feminist critique = demand for.',
          parts: [
                { id: 'a', prompt: 'In the 1985 Shah Bano case, the Supreme Court granted maintenance to a divorced Muslim woman under Section 125 CrPC.', answer: 'Communitarian lens: The 1986 Act represents a victory for minority community',
                  options: ['Communitarian lens: The 1986 Act represents a victory for minority community', 'communitarian critique = opposition to secularism', 'feminist critique = demand for Western-style strict separation'],
                  hint: 'Revisit c11_ps_cbse_08_004 (Indian model) and c11_ps_cbse_08_005 (principled distance); create.',
                  misconception: 'Students often think "communitarian critique = opposition to secularism" and "feminist critique = demand for Western-style strict.' }
          ],
            remediations: { 'communitarian-critique-opposition-to-secularism': { steps: ['If the student conflates the critiques, use this 3-step remediation: (1) Read the 1986 Muslim Women Act debates.', 'Muslim MPs defending community autonomy (communitarian stance).', '(2) Map each speaker\'s argument to "protects community identity" vs.', '"protects women\'s equality." (3) Apply the same mapping to the 2017 triple talaq verdict: AIMPLB\'s review petition.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "communitarian critique = opposition to secularism" and "feminist critique = demand for.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Indian model of secularism, by recognizing minority rights, inevitably privileges community leaders over women within those.', answer: 'The claim is partially valid but incomplete',
                  options: ['The claim is partially valid but incomplete', 'communitarian critique = opposition to secularism', 'feminist critique = demand for Western-style strict separation'],
                  hint: 'Revisit c11_ps_cbse_08_004 (Indian model) and c11_ps_cbse_08_005 (principled distance); create.',
                  misconception: 'Students often think "communitarian critique = opposition to secularism" and "feminist critique = demand for Western-style strict.' }
          ],
            remediations: { 'communitarian-critique-opposition-to-secularism': { steps: ['If the student conflates the critiques, use this 3-step remediation: (1) Read the 1986 Muslim Women Act debates.', 'Muslim MPs defending community autonomy (communitarian stance).', '(2) Map each speaker\'s argument to "protects community identity" vs.', '"protects women\'s equality." (3) Apply the same mapping to the 2017 triple talaq verdict: AIMPLB\'s review petition.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_08_008', difficulty: 'standard',
          question: 'Indian secularism guarantees minority rights through Articles 29 and 30 of the.',
          hint: 'Revisit node 08_005 (principled distance) and node 08_006 (constitutional provisions).',
          misconception: 'Students often believe **minority rights under Articles 29–30 are "special privileges" or "appeasement" granted by the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Indian secularism guarantees minority rights through Articles 29 and 30 of the',
                  options: ['Indian secularism guarantees minority rights through Articles 29 and 30 of the', 'Secularism is a normative political doctrine that opposes all forms of institutionalised', 'A secular state is a political entity that is neither theocratic nor formally allied with', 'The Western model of secularism, best exemplified by the United States and France, is a'],
                  hint: 'Revisit node 08_005 (principled distance) and node 08_006 (constitutional provisions), focusing.',
                  misconception: 'Students often believe **minority rights under Articles 29–30 are "special privileges" or "appeasement" granted by the majority**, rather.' }
          ],
            remediations: { 'minority-rights-under-articles-29': { steps: ['Re-read the NCERT train-compartment (smoker/asthmatic) and auditorium-ramp (wheelchair) analogies on pages 121–123.', 'Write two columns: "Majority\'s Default Access" (e.g., majority language in schools, majority personal law, majority.', '"Minority\'s Accommodation Needed" (e.g., mother-tongue instruction, own personal law, own holidays).', 'For each row, ask: *If the accommodation is removed, does the minority lose a fundamental interest?* 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_08_009', difficulty: 'standard',
          question: 'The Shah Bano case (1985) is a landmark Supreme Court judgment where a divorced.',
          hint: 'If stuck, revisit c11_ps_cbse_08_005 (principled distance) and the Fundamental Rights.',
          misconception: 'Students often believe the Shah Bano case was about "banning triple talaq" or that the Uniform Civil Code (UCC).',
          parts: [
                { id: 'a', prompt: 'Why did the Supreme Court in Shah Bano (1985) recommend the enactment of a Uniform Civil Code (UCC) under Article 44?', answer: 'The Court recommended UCC',
                  options: ['The Court recommended UCC', 'To impose Hindu law on Muslims', 'Because Article 44 is a Fundamental Right', 'banning triple talaq'],
                  hint: 'If stuck, revisit c11_ps_cbse_08_005 (principled distance) and the Fundamental Rights vs DPSP.',
                  misconception: 'Students often believe the Shah Bano case was about "banning triple talaq" or that the Uniform Civil Code (UCC) is already a Fundamental.' },
                { id: 'b', prompt: 'A Muslim woman is divorced and receives no maintenance beyond the *iddat* period. She files a petition under Section 125 CrPC in 2024.', answer: 'The court would grant maintenance',
                  options: ['The court would grant maintenance', 'She gets nothing after *iddat*', 'reading down', 'banning triple talaq'],
                  hint: 'If stuck, revisit c11_ps_cbse_08_005 (principled distance) and the Fundamental Rights vs DPSP.',
                  misconception: 'Students often believe the Shah Bano case was about "banning triple talaq" or that the Uniform Civil Code (UCC) is already a Fundamental.' }
          ],
            remediations: { 'the-shah-bano-case-was': { steps: ['If the student confuses Shah Bano with triple talaq cases: Have them create a two-column table: Column A = "Shah Bano.', 'If they think the 1986 Act ended the matter: Assign reading of *Danial Latifi v.', 'Union of India* (2001) summary — focus on "reading down" technique.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_08_010', difficulty: 'standard',
          question: 'Communalism in the Indian context refers to a political ideology that.',
          hint: 'Revisit c11_ps_cbse_08_005 (Principled Distance vs Strict Separation) and the NCERT.',
          misconception: 'Students often believe "secularism means the state must be completely hands-off from religion" (Western.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Communalism in the Indian context refers to a political ideology that constructs',
                  options: ['Communalism in the Indian context refers to a political ideology that constructs', 'Secularism is a normative political doctrine that opposes all forms of institutionalised', 'A secular state is a political entity that is neither theocratic nor formally allied with', 'The Western model of secularism, best exemplified by the United States and France, is a'],
                  hint: 'Revisit c11_ps_cbse_08_005 (Principled Distance vs Strict Separation) and the NCERT "Let\'s Debate".',
                  misconception: 'Students often believe "secularism means the state must be completely hands-off from religion" (Western wall-of-separation model).' }
          ],
            remediations: { 'secularism-means-the-state-must': { steps: ['Re-read the NCERT distinction between "Western model (mutual exclusion)" and "Indian model (principled distance)".', 'Take the Haj/Kailash subsidy example — write two one-paragraph justifications: one using principled distance.', 'Identify which rationale matches actual government press releases from the last 5 years.', 'Re-attempt Diagnostic Question 3 with this lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
