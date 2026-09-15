import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch08_p1: SimDef = {
    id: 'v3_c11_ps_ch08_p1',
    title: 'Secularism · Part 1/2',
    subtitle: 'Meet a secularism that intervenes — on principle.',
    classLevel: 11, subject: 'political_science', topic: 'Secularism · Part 1/2',
    chapters: ['c11_ps_ch08'],
    nodeIds: ['c11_ps_cbse_08_001', 'c11_ps_cbse_08_002', 'c11_ps_cbse_08_003', 'c11_ps_cbse_08_004', 'c11_ps_cbse_08_005', 'c11_ps_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a constitutional designer choosing between a wall and a scalpel', intro: 'A state that funds a madrasa and bans a discriminatory practice in the same year isn\'t confused — it\'s a different model of secular.', goal: 'Contrast Indian principled-distance secularism with strict separation and equal-respect readings.' },
    discovery: {
        question: 'Indian secularism: equal funding for all religions, or a wall that never touches religion at all?',
        options: ['Neither — it permits principled intervention (banning triple talaq, temple reform) to oppose domination while respecting faith', 'Equal support for every religion', 'Total separation — the state stays out entirely', 'Whatever the majority religion prefers'],
        answer: 'Neither — it permits principled intervention (banning triple talaq, temple reform) to oppose domination while respecting faith',
        hook: 'Secularism isn\'t anti-religious — it fights domination inside and between religions, not the faith itself; intervention can serve values religion shares.',
    },
    teaching: [
        { title: 'What is secularism: Separation of religion and politics', text: 'Secularism is a normative political doctrine that opposes all forms of institutionalised religious domination—both inter-religious domination (where one religious community dominates another) and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Judge whether \'Sarva Dharma Samabhava\' forbids the state from reforming a harmful practice, and contrast the Indian model with the American wall.',
        labels: ['What is secularism: Separation', 'Secular state: Neutrality, distance,', 'Western model of secularism', 'Indian model of secularism', 'Secularism as principled distance', 'Constitutional provisions on secularism'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_001', title: 'What is secularism: Separation of religion and politics',
          caseStudy: { intro: 'Imagine reading a news report about a village where Dalit families are barred from entering the local temple, while simultaneously seeing headlines about.',
            decisions: [{ prompt: 'Define secularism in one sentence using the precise political theory terminology from the NCERT textbook.', options: [
                { text: 'Correct answer: Secularism is a normative doctrine that seeks to realise a secular', outcome: 'Correct answer: Secularism is a normative doctrine that seeks to realise a secular society devoid.' },
                { text: 'separation of religion and state', outcome: 'Not quite — Students commonly believe "secularism means the state treats all religions equally by giving them.', reveals: 'students-commonly-believe-secularism-means' },
                { text: 'equal respect for all religions', outcome: 'Not quite — Students commonly believe "secularism means the state treats all religions equally by giving them.', reveals: 'students-commonly-believe-secularism-means' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_002', title: 'Secular state: Neutrality, distance, and equal respect for all religions',
          caseStudy: { intro: 'Imagine you read a news report that a state government has declared a public holiday for a festival of the majority community but refused a similar request.',
            decisions: [{ prompt: 'What are the three necessary conditions a state must satisfy to be considered a secular state according to the NCERT Political Theory.', options: [
                { text: 'The three necessary conditions are: (1) The state must not be theocratic (not run by', outcome: 'The three necessary conditions are: (1) The state must not be theocratic (not run by religious.' },
                { text: 'separation of religion and state', outcome: 'Not quite — Students often believe a secular state must be *strictly neutral* in the sense of *total.', reveals: 'a-secular-state-must-be' },
                { text: 'wall of separation', outcome: 'Not quite — Students often believe a secular state must be *strictly neutral* in the sense of *total.', reveals: 'a-secular-state-must-be' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_003', title: 'Western model of secularism: Wall of separation (USA, France)',
          caseStudy: { intro: 'Imagine a French public school principal in 2004 telling a Sikh student to remove his turban because the law bans "conspicuous religious symbols" in state.',
            decisions: [{ prompt: 'What is the core constitutional mechanism that establishes the "wall of separation" in the United States, and how does it differ textually.', options: [
                { text: 'The US relies on the **First Amendment\'s twin clauses**: "Congress shall make no law', outcome: 'The US relies on the **First Amendment\'s twin clauses**: "Congress shall make no law respecting.' },
                { text: 'both are in their constitutions', outcome: 'Not quite — Students often think **"Western secularism = complete separation = religion is banned from public.', reveals: 'western-secularism-complete-separation-religion' },
                { text: 'both ban religious symbols', outcome: 'Not quite — Students often think **"Western secularism = complete separation = religion is banned from public.', reveals: 'western-secularism-complete-separation-religion' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_004', title: 'Indian model of secularism: Equal respect for all religions (Sarva Dharma Sambhava)',
          caseStudy: { intro: 'Imagine you see the Indian government\'s gazetted holiday list: it includes Diwali, Eid, Christmas, Guru Nanak Jayanti, and Buddha Purnima.',
            decisions: [{ prompt: 'What is the phrase "Sarva Dharma Sambhava" commonly understood to mean in the context of Indian secularism?', options: [
                { text: '"Sarva Dharma Sambhava" translates to "equal respect for all religions." It signifies', outcome: '"Sarva Dharma Sambhava" translates to "equal respect for all religions." It signifies that the.' },
                { text: 'the state has no connection with religion', outcome: 'Not quite — Students often think "equal respect for all religions" means the state must celebrate every.', reveals: 'equal-respect-for-all-religions' },
                { text: 'wall of separation', outcome: 'Not quite — Students often think "equal respect for all religions" means the state must celebrate every.', reveals: 'equal-respect-for-all-religions' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_005', title: 'Secularism as principled distance vs strict separation (Rajeev Bhargava)',
          caseStudy: { intro: 'Imagine reading a news headline: "Government takes over management of a famous Hindu temple" and another: "Supreme Court refuses to interfere in a mosque\'s.',
            decisions: [{ prompt: 'Define "principled distance" in one sentence and name the scholar who developed this concept as an alternative to the Western model.', options: [
                { text: 'Principled distance is a state-religion framework where engagement or disengagement is', outcome: 'Principled distance is a state-religion framework where engagement or disengagement is determined.' },
                { text: 'equal respect for all religions', outcome: 'Not quite — Students often think "principled distance" means the state can arbitrarily interfere in any.', reveals: 'principled-distance-means-the-state' },
                { text: 'state stays away from religion', outcome: 'Not quite — Students often think "principled distance" means the state can arbitrarily interfere in any.', reveals: 'principled-distance-means-the-state' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a debate on \'Is India truly secular?\', a student argues: \'A secular state must keep a wall between itself and religion — so government running the Tirupati temple board or banning triple talaq is anti-secular interference.\'',
            decisions: [{ prompt: 'What does Indian secularism actually permit?', options: [
                { text: 'Explain principled distance: Indian secularism isn\'t a wall of total separation — the state may engage or disengage to uphold freedom and equality, opposing both inter-religious AND intra-religious domination. Managing the temple board prevents mismanagement and ensures access; banning triple talaq protects members from domination inside their own community — the state may even show \'equal disrespect\' to oppressive aspects of any religion.', outcome: 'The debate reframes: the test isn\'t whether the state touched religion, but whether the touch served constitutional values — principled distance, not abstention.' },
                { text: 'Support the wall model — any state action involving religion violates secularism.', outcome: 'That imports the American strict-separation model: Indian secularism permits engagement precisely where religion harbours domination — neutrality is even-handed pursuit of values, not abstention.', reveals: 'secularism-is-total-separation' },
                { text: 'Redefine secularism as equal support — equal holidays and funding for all religions.', outcome: 'Equal accommodation can entrench intra-religious oppression (caste, gender): secularism targets domination inside religions too, not just imbalance between them.', reveals: 'secularism-is-equal-support' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'Neutrality in India means even-handed pursuit of constitutional values — sometimes that requires stepping in, not staying out.',
            decisions: [{ prompt: 'What comes next? Secularism · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Secularism · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_08_001', difficulty: 'standard',
          question: 'Secularism is a normative political doctrine that opposes all forms.',
          hint: 'Revisit Class 10 Chapter 3 (c10_civ_cbse_03_004) on secularism and communalism, and Class.',
          misconception: 'Students commonly believe "secularism means the state treats all religions equally by giving them equal.',
          parts: [
                { id: 'a', prompt: 'A state declares it has no official religion and does not fund any religious institutions.', answer: 'Correct answer: Secularism requires opposition to *inter-religious domination*',
                  options: ['Correct answer: Secularism requires opposition to *inter-religious domination*', 'doesn\'t favour any religion officially', 'secularism means the state stays completely away from religion', 'wall of separation'],
                  hint: 'Revisit Class 10 Chapter 3 (c10_civ_cbse_03_004) on secularism and communalism, and Class 9 Chapter.',
                  misconception: 'Students commonly believe "secularism means the state treats all religions equally by giving them equal support/holidays/funding".' },
                { id: 'b', prompt: 'Compare the following two scenarios: (A) A government bans all religious symbols in public schools.', answer: 'Correct answer: Scenario (B) aligns with Indian secularism',
                  options: ['Correct answer: Scenario (B) aligns with Indian secularism', 'secularism means the state stays completely away from religion', 'wall of separation'],
                  hint: 'Revisit Class 10 Chapter 3 (c10_civ_cbse_03_004) on secularism and communalism, and Class 9 Chapter.',
                  misconception: 'Students commonly believe "secularism means the state treats all religions equally by giving them equal support/holidays/funding".' }
          ],
            remediations: { 'students-commonly-believe-secularism-means': { steps: ['If a student holds the "equal support" misconception: Have them re-read the "Let\'s Think" box on page 119 (gazetted.', 'What if a religion demands a holiday for a practice that discriminates against women?" If they hold the "strict.', 'It separated religion from state but *banned* religious dress, names, and calendar.', 'Does secularism require *suppressing* religion?" Guide them to the phrase "principled distance" (introduced on page.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students commonly believe "secularism means the state treats all religions equally by giving them equal.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Secularism is anti-religious because it prevents the state from supporting any religious activity." Use the NCERT\'s arguments about.', answer: 'Correct answer: The statement is false',
                  options: ['Correct answer: The statement is false', 'secularism means the state stays completely away from religion', 'wall of separation'],
                  hint: 'Revisit Class 10 Chapter 3 (c10_civ_cbse_03_004) on secularism and communalism, and Class 9 Chapter.',
                  misconception: 'Students commonly believe "secularism means the state treats all religions equally by giving them equal support/holidays/funding".' },
                { id: 'b', prompt: 'Draft a 50-word preamble for a hypothetical "Secularism Charter" that captures the dual opposition (inter- and intra-religious domination), the necessity.', answer: 'Expected criteria: The preamble must explicitly name both inter-religious and',
                  options: ['Expected criteria: The preamble must explicitly name both inter-religious and', 'secularism means the state stays completely away from religion', 'wall of separation'],
                  hint: 'Revisit Class 10 Chapter 3 (c10_civ_cbse_03_004) on secularism and communalism, and Class 9 Chapter.',
                  misconception: 'Students commonly believe "secularism means the state treats all religions equally by giving them equal support/holidays/funding".' }
          ],
            remediations: { 'students-commonly-believe-secularism-means': { steps: ['If a student holds the "equal support" misconception: Have them re-read the "Let\'s Think" box on page 119 (gazetted.', 'What if a religion demands a holiday for a practice that discriminates against women?" If they hold the "strict.', 'It separated religion from state but *banned* religious dress, names, and calendar.', 'Does secularism require *suppressing* religion?" Guide them to the phrase "principled distance" (introduced on page.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_08_002', difficulty: 'standard',
          question: 'A secular state is a political entity that is neither theocratic nor formally.',
          hint: 'Revisit Node 001 (c11_ps_cbse_08_001), specifically the sections "Inter-religious.',
          misconception: 'Students often believe a secular state must be *strictly neutral* in the sense of *total non-interference* (like the.',
          parts: [
                { id: 'a', prompt: 'Why does the textbook argue that "separation of religion and state" is a necessary but *not sufficient* condition for a secular state?', answer: 'Separation is necessary',
                  options: ['Separation is necessary', 'wall of separation'],
                  hint: 'Revisit Node 001 (c11_ps_cbse_08_001), specifically the sections "Inter-religious Domination" and.',
                  misconception: 'Students often believe a secular state must be *strictly neutral* in the sense of *total non-interference* (like the US "wall.' },
                { id: 'b', prompt: 'Compare the "mutual exclusion" model of state-religion separation (USA) with the "principled distance" model (India) on the following dimensions: (a) State.', answer: 'with the "principled distance" model (Indi',
                  options: ['with the "principled distance" model (Indi', 'wall of separation'],
                  hint: 'Revisit Node 001 (c11_ps_cbse_08_001), specifically the sections "Inter-religious Domination" and.',
                  misconception: 'Students often believe a secular state must be *strictly neutral* in the sense of *total non-interference* (like the US "wall.' }
          ],
            remediations: { 'a-secular-state-must-be': { steps: ['Identify the problem — hereditary trustees excluding Dalits/misusing funds (intra-religious domination).', 'Recall the secular state\'s duty — oppose *all* institutionalized religious domination (Node 001).', 'Ask — can the state ignore this citing "non-interference"? No, that would abandon Dalits\' equality.', 'Conclude — state takeover is *principled distance*: engaging negatively to uphold Article 17/25.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_08_003', difficulty: 'standard',
          question: 'The Western model of secularism, best exemplified by the United States and.',
          hint: 'Revisit c11_ps_cbse_08_002\'s "secular state" criteria and c10_civ_cbse_03_004\'s Class 10.',
          misconception: 'Students often think **"Western secularism = complete separation = religion is banned from public life."** They.',
          parts: [
                { id: 'a', prompt: 'Why does the Western model, despite guaranteeing individual religious freedom, systematically under-protect minority religious communities compared to the.', answer: 'The Western model emerged in **religiously homogeneous societies** (historically',
                  options: ['The Western model emerged in **religiously homogeneous societies** (historically', 'discrimination', 'seeing', 'Western secularism = complete separation = religion is banned from public life'],
                  hint: 'Revisit c11_ps_cbse_08_002\'s "secular state" criteria and c10_civ_cbse_03_004\'s Class 10 summary.',
                  misconception: 'Students often think **"Western secularism = complete separation = religion is banned from public life."** They conflate the US model.' },
                { id: 'b', prompt: 'A US public university denies funding to a student religious magazine while funding secular student publications.', answer: 'Under strict mutual exclusion, **the state cannot fund religious activity**',
                  options: ['Under strict mutual exclusion, **the state cannot fund religious activity**', 'Western secularism = complete separation = religion is banned from public life'],
                  hint: 'Revisit c11_ps_cbse_08_002\'s "secular state" criteria and c10_civ_cbse_03_004\'s Class 10 summary.',
                  misconception: 'Students often think **"Western secularism = complete separation = religion is banned from public life."** They conflate the US model.' }
          ],
            remediations: { 'western-secularism-complete-separation-religion': { steps: ['**Re-read the NCERT "Let\'s Debate" box on France\'s turban/veil ban** (page 118) and the Ataturk sidebar (page 116).', '**Create a 2×2 matrix**: Rows = US / France; Columns = State funding of religious schools / Religious symbols in public.', 'Fill each cell with "Allowed / Prohibited / Complex" using *Rosenberger*, *Smith*, 2004 French Law, 1905 Law.', '**Write one sentence** explaining *why* the US and France differ on each row, using the terms "negative liberty" and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_08_004', difficulty: 'standard',
          question: 'The Indian model of secularism is a constitutional framework where the state.',
          hint: 'Revisit c11_ps_cbse_08_001 (definition of secularism) and c11_ps_cbse_08_003 (Western.',
          misconception: 'Students often think "equal respect for all religions" means the state must celebrate every festival identically.',
          parts: [
                { id: 'a', prompt: 'A state government declares a holiday for a minority community\'s festival and provides a subsidy for their pilgrimage.', answer: 'This does not violate Indian secularism',
                  options: ['This does not violate Indian secularism', 'equal respect for all religions'],
                  hint: 'Revisit c11_ps_cbse_08_001 (definition of secularism) and c11_ps_cbse_08_003 (Western model).',
                  misconception: 'Students often think "equal respect for all religions" means the state must celebrate every festival identically or never criticize any.' }
          ],
            remediations: { 'equal-respect-for-all-religions': { steps: ['Re-read the NCERT "Let\'s Think" box (page 120): "Is secularism compatible with subsidising a pilgrimage?', 'Performing rituals in offices?" 2.', 'List three state actions: (a) funding a madrasa, (b) banning triple talaq, (c) declaring Diwali a holiday.', 'For each, ask: "Does this show equal respect?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_08_005', difficulty: 'standard',
          question: 'Principled distance is a normative framework for state-religion relations where.',
          hint: 'Revisit node 003 (Western model) to recall why strict separation treats religion.',
          misconception: 'Students often think "principled distance" means the state can arbitrarily interfere in any religion whenever it wants.',
          parts: [
                { id: 'a', prompt: 'The Indian state provides financial assistance to minority-run educational institutions (Article 30) but also bans untouchability in Hindu temples (Article.', answer: 'Article 30 assistance is justified by the principle of inter-religious equality:',
                  options: ['Article 30 assistance is justified by the principle of inter-religious equality:', 'equal respect', 'non-interference', 'principled distance'],
                  hint: 'Revisit node 003 (Western model) to recall why strict separation treats religion as purely private.',
                  misconception: 'Students often think "principled distance" means the state can arbitrarily interfere in any religion whenever it wants, or that it.' }
          ],
            remediations: { 'principled-distance-means-the-state': { steps: ['Re-read the "Let\'s Debate" box in NCERT (p.', '119) where students discuss whether subsidising a minority pilgrimage is secular.', 'Write two one-sentence justifications: one for funding a minority pilgrimage (inter-religious equality), one for.', 'Check each against Bhargava\'s test: "Does this engagement promote freedom/equality for the most vulnerable?" 4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_08_006', difficulty: 'standard',
          question: 'Indian constitutional secularism is the framework established by the Preamble.',
          hint: 'If stuck, immediately re-read the bare text of Articles 25, 26, 27, 28, 29, 30, and 44.',
          misconception: 'Students often believe Article 25 gives an absolute, unrestricted right to practice any religious ritual (e.g., animal.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Indian constitutional secularism is the framework established by the Preamble (as amended',
                  options: ['Indian constitutional secularism is the framework established by the Preamble (as amended', 'Secularism is a normative political doctrine that opposes all forms of institutionalised', 'A secular state is a political entity that is neither theocratic nor formally allied with', 'The Western model of secularism, best exemplified by the United States and France, is a'],
                  hint: 'If stuck, immediately re-read the bare text of Articles 25, 26, 27, 28, 29, 30, and 44 from the.',
                  misconception: 'Students often believe Article 25 gives an absolute, unrestricted right to practice any religious ritual (e.g., animal sacrifice, exclusion.' }
          ],
            remediations: { 'article-25-gives-an-absolute': { steps: ['Re-read Article 25(1) text carefully — highlight the words "subject to public order, morality and health and to the.', 'Review the Shirur Mutt case summary (NCERT Class 11 Political Theory, Ch.', 'Apply the test to a concrete example: "Can a religious group claim human sacrifice is protected by Article 25?".', 'Distinguish between *ritual* (protected if essential) and *secular activity* like property management (regulable under.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
