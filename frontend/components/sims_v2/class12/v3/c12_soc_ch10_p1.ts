import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch10_p1: SimDef = {
    id: 'v3_c12_soc_ch10_p1',
    title: 'The Story of Indian Democracy · Part 1/2',
    subtitle: 'Elections are the floor, not the ceiling',
    classLevel: 12, subject: 'sociology', topic: 'The Story of Indian Democracy · Part 1/2',
    chapters: ['c12_soc_ch10'],
    nodeIds: ['c12_soc_cbse_10_001', 'c12_soc_cbse_10_002', 'c12_soc_cbse_10_003', 'c12_soc_cbse_10_004', 'c12_soc_cbse_10_005', 'c12_soc_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Democratic institutions analyst', intro: '\'We, the people\' is a claim that has to be re-proven between elections — courts, media and street all get a say.', goal: 'Distinguish procedural from substantive democracy and classify democratic forms by constitutional design.' },
    discovery: {
        question: 'A country holds regular elections with universal suffrage — but the ruling party owns the media, the courts and the election commission, and rivals keep getting arrested. Democracy or not?',
        options: ['Only procedurally — it has the voting machinery but fails accountability and rule of law, the substantive core that makes power genuinely answerable', 'Yes — elections alone define democracy', 'No — it\'s a plain dictatorship', 'Yes — until proven otherwise in court'],
        answer: 'Only procedurally — it has the voting machinery but fails accountability and rule of law, the substantive core that makes power genuinely answerable',
        hook: 'Democracy isn\'t binary — a village gram sabha and the Lok Sabha both count, differently. And reserved seats for women are a procedural guarantee; where \'sarpanch-patis\' pull the strings, substance hasn\'t arrived.',
    },
    teaching: [
        { title: 'Democracy as a Form of Government: Definition, Features and Types', text: 'Democracy is a form of government in which supreme power is vested in the people and exercised by them directly or indirectly through a system of representation usually involving periodically held.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_10_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify regimes along the procedural-subjective axis — then defend India\'s parliamentary, representative design against the direct and presidential alternatives.',
        labels: ['Democracy as a Form', 'The Indian Constitution: Features,', 'Fundamental Rights and Directive', 'The Panchayati Raj System', 'The Gram Sabha, Gram', 'Reservation of Seats'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_002', title: 'The Indian Constitution: Features, Preamble and the Basic Structure Doctrine',
          caseStudy: { intro: 'Imagine you are a lawyer arguing before the Supreme Court: a new amendment proposes to remove "secular" from the Preamble and make India a "Hindu Rashtra".',
            decisions: [{ prompt: 'Define the term "Basic Structure Doctrine" and name the case in which it was first propounded.', options: [
                { text: 'The Basic Structure Doctrine holds that Parliament\'s amending power under Article 368', outcome: 'The Basic Structure Doctrine holds that Parliament\'s amending power under Article 368 cannot alter.' },
                { text: 'it means fundamental rights cannot be amended', outcome: 'Not quite — Students often think the Basic Structure Doctrine means "Fundamental Rights cannot be amended.', reveals: 'the-basic-structure-doctrine-means' },
                { text: 'basic structure', outcome: 'Not quite — Students often think the Basic Structure Doctrine means "Fundamental Rights cannot be amended.', reveals: 'the-basic-structure-doctrine-means' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_003', title: 'Fundamental Rights and Directive Principles: The Two Pillars of the Constitution',
          caseStudy: { intro: 'Imagine you read a news headline: "Supreme Court declares clean air a part of Right to Life under Article 21" — but Article 21 only says "No person shall.',
            decisions: [{ prompt: 'What is the primary constitutional difference between Fundamental Rights and Directive Principles of State Policy in terms.', options: [
                { text: 'Fundamental Rights are justiciable (legally enforceable by courts under Articles 32 and', outcome: 'Fundamental Rights are justiciable (legally enforceable by courts under Articles 32 and 226), while.' },
                { text: 'Both are enforceable', outcome: 'Not quite — Students often believe that because Directive Principles are "non-justiciable," they are "useless".', reveals: 'because-directive-principles-are-non' },
                { text: 'Neither is enforceable', outcome: 'Not quite — Students often believe that because Directive Principles are "non-justiciable," they are "useless".', reveals: 'because-directive-principles-are-non' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_004', title: 'The Panchayati Raj System: Constitutional Status (73rd Amendment) and Three-Tier Structure',
          caseStudy: { intro: 'Imagine a village where the Sarpanch is always from the dominant caste, women never speak in meetings, and the Gram Sabha hasn\'t met in years.',
            decisions: [{ prompt: 'What is the constitutional significance of the 73rd Amendment Act, 1992, for Panchayati Raj Institutions?', options: [
                { text: 'The 73rd Amendment moved Panchayati Raj from a non-justiciable Directive Principle', outcome: 'The 73rd Amendment moved Panchayati Raj from a non-justiciable Directive Principle (Article 40).' },
                { text: 'it created Panchayats for the first time', outcome: 'Not quite — Students often believe the 73rd Amendment created Panchayats for the first time in India.', reveals: 'the-73rd-amendment-created-panchayats' },
                { text: 'the 73rd Amendment created Panchayats for the first time in India', outcome: 'Not quite — Students often believe the 73rd Amendment created Panchayats for the first time in India.', reveals: 'the-73rd-amendment-created-panchayats' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_005', title: 'The Gram Sabha, Gram Panchayat, Panchayat Samiti and Zilla Parishad',
          caseStudy: { intro: 'Imagine you live in a village where the only paved road washes away every monsoon, the primary health centre has no doctor, and the government scheme for.',
            decisions: [{ prompt: 'What is the constitutional status of the Gram Sabha under the 73rd Amendment, and how does its composition differ from that of the Gram.', options: [
                { text: 'The Gram Sabha is a constitutional body under Article 243A comprising all registered', outcome: 'The Gram Sabha is a constitutional body under Article 243A comprising all registered voters in.' },
                { text: 'Gram Sabha is the same as Gram Panchayat', outcome: 'Not quite — Students often treat the three-tier Panchayati Raj system as a simple administrative hierarchy.', reveals: 'students-often-treat-the-three' },
                { text: 'Gram Sabha members are elected', outcome: 'Not quite — Students often treat the three-tier Panchayati Raj system as a simple administrative hierarchy.', reveals: 'students-often-treat-the-three' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_006', title: 'Reservation of Seats in Panchayats for SCs, STs and Women (33%)',
          caseStudy: { intro: 'Imagine a village where the Gram Panchayat has 15 seats. The village population is 40% SC, 10% ST, and 50% general, with women constituting roughly half.',
            decisions: [{ prompt: 'What is the constitutional article that mandates reservation of seats for SCs, STs, and women in Panchayats, and what percentage of seats.', options: [
                { text: 'Article 243D of the Constitution (inserted by the 73rd Amendment Act, 1992) mandates', outcome: 'Article 243D of the Constitution (inserted by the 73rd Amendment Act, 1992) mandates reservation.' },
                { text: 'the 33% women\'s reservation is an additional quota *on top of* SC/ST quotas (i', outcome: 'Not quite — Students often believe that the 33% women\'s reservation is an additional quota *on top of* SC/ST.', reveals: 'the-33-women-s-reservation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a mock parliament, a member moves an amendment abolishing judicial review, arguing \'Article 368 lets Parliament amend anything — majority rules the Constitution.\'',
            decisions: [{ prompt: 'Does the Basic Structure Doctrine allow that?', options: [
                { text: 'No — Kesavananda Bharati capped Article 368: core features — judicial review, democracy, secularism, separation of powers, federalism — sit beyond amendment; a temporary majority can rewrite clauses but not the Constitution\'s soul, and abolishing review attacks the core directly.', outcome: 'The chapter\'s safeguard: amending power is wide but not sovereign — the doctrine exists precisely to stop a numerical majority from rewriting the architecture it governs within.' },
                { text: 'Yes — Article 368\'s text gives Parliament unlimited amending power.', outcome: 'That was the pre-1973 reading — Kesavananda established that the power to amend is not the power to destroy; \'anything\' was judicially fenced at the basic features.', reveals: 'article-368-is-unlimited' },
                { text: 'It\'s valid if two-thirds plus state ratification agree — procedure cures substance.', outcome: 'The doctrine limits substance regardless of procedure — even a perfect special majority can\'t remove a basic feature; the threshold governs amendments, not the unamendable core.', reveals: 'big-majority-beats-doctrine' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now argue that democracy is a continuous negotiation between state and society — which is why one constitutional amendment can empower a village while another can merely decorate it.',
            decisions: [{ prompt: 'What comes next? The Story of Indian Democracy · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Story of Indian Democracy · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_001', difficulty: 'standard',
          question: 'Democracy is a form of government in which supreme power is vested in the.',
          hint: 'If stuck, revisit Class 11 Political Theory Chapter 3 (Equality), specifically the.',
          misconception: 'Students equate \'democracy\' with \'elections only\', writing: "India is democratic because it has regular elections.".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Democracy is a form of government in',
                  options: ['Democracy is a form of government in', 'The Indian Constitution is the supreme legal document that establishes the framework of', 'Fundamental Rights (Part III, Articles 12-35) are justiciable, legally enforceable', 'The 73rd Constitutional Amendment Act (1992) granted constitutional status to Panchayati'],
                  hint: 'If stuck, revisit Class 11 Political Theory Chapter 3 (Equality), specifically the section.',
                  misconception: 'Students equate \'democracy\' with \'elections only\', writing: "India is democratic because it has regular elections." This ignores that.' }
          ],
            remediations: { 'students-equate-democracy-with-elections': { steps: ['Revisit Class 11 Political Theory node c11_ps_cbse_03_005 (Formal vs Substantive Equality) — map \'formal\' to procedural.', 'Re-read NCERT Class 12 Chapter 3, pages 32-33 (Democratisation and Inequality) — note how Gram Sabha control.', 'Do a mini-case study: Compare two Panchayats — one where women sarpanch decides, another where husband decides.', 'Re-attempt Diagnostic Questions 2 and 4 — they directly test this distinction.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_002', difficulty: 'standard',
          question: 'The Indian Constitution is the supreme legal document that establishes the.',
          hint: 'If stuck on basic structure components, revisit Class 11 Political Science node.',
          misconception: 'Students often think the Basic Structure Doctrine means "Fundamental Rights cannot be amended at all." In reality, the.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the Preamble is called the "key to the Constitution" and how the words "socialist" and "secular" came to be inserted.', answer: 'The Preamble encapsulates the Constitution\'s philosophy and objectives',
                  options: ['The Preamble encapsulates the Constitution\'s philosophy and objectives', 'Fundamental Rights cannot be amended at all', 'the Basic Structure Doctrine means "Fundamental Rights cannot be amended at all'],
                  hint: 'If stuck on basic structure components, revisit Class 11 Political Science node c11_ps_cbse_18_004.',
                  misconception: 'Students often think the Basic Structure Doctrine means "Fundamental Rights cannot be amended at all." In reality, the doctrine protects.' },
                { id: 'b', prompt: 'Compare the "procedure established by law" (Article 21) with "due process of law" (US Constitution) and analyze how the Supreme Court expanded Article 21.', answer: '"Procedure established by law" originally meant any legislated procedure (A.K',
                  options: ['"Procedure established by law" originally meant any legislated procedure (A.K', 'Fundamental Rights cannot be amended at all', 'the Basic Structure Doctrine means "Fundamental Rights cannot be amended at all'],
                  hint: 'If stuck on basic structure components, revisit Class 11 Political Science node c11_ps_cbse_18_004.',
                  misconception: 'Students often think the Basic Structure Doctrine means "Fundamental Rights cannot be amended at all." In reality, the doctrine protects.' }
          ],
            remediations: { 'the-basic-structure-doctrine-means': { steps: ['Revisit Class 11 Political Science node c11_ps_cbse_18_004 (Basic Structure Doctrine: Kesavananda Bharati case) and.', 'Create a two-column table: left column = "Basic Structure Elements" (list 8–10 from case law), right column.', 'Practice: For each of 5 hypothetical amendments, decide which column it falls into and cite the governing case.', 'Re-attempt Diagnostic Questions 3 and 5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_003', difficulty: 'standard',
          question: 'Fundamental Rights (Part III, Articles 12-35) are justiciable, legally.',
          hint: 'Revisit Class 11 Political Science nodes c11_ps_cbse_11_002 (Fundamental Rights) and.',
          misconception: 'Students often believe that because Directive Principles are "non-justiciable," they are "useless" or "merely.',
          parts: [
                { id: 'a', prompt: 'A state government enacts a law acquiring agricultural land for a private industrial park, offering compensation at 50% of market value.', answer: 'Fundamental Right: Article 300A (Right to Property',
                  options: ['Fundamental Right: Article 300A (Right to Property', 'Directive Principles cannot be used', 'non-justiciable', 'useless'],
                  hint: 'Revisit Class 11 Political Science nodes c11_ps_cbse_11_002 (Fundamental Rights) and.',
                  misconception: 'Students often believe that because Directive Principles are "non-justiciable," they are "useless" or "merely decorative." This leads them.' },
                { id: 'b', prompt: 'Compare the socialist, Gandhian, and liberal-intellectual categories of Directive Principles.', answer: 'Socialist: Article 39(b)-(c)',
                  options: ['Socialist: Article 39(b)-(c)', 'non-justiciable', 'useless', 'merely decorative'],
                  hint: 'Revisit Class 11 Political Science nodes c11_ps_cbse_11_002 (Fundamental Rights) and.',
                  misconception: 'Students often believe that because Directive Principles are "non-justiciable," they are "useless" or "merely decorative." This leads them.' }
          ],
            remediations: { 'because-directive-principles-are-non': { steps: ['If a student holds this misconception, do NOT simply re-read the definitions.', 'Instead: (1) Give them the *Olga Tellis v.', 'Bombay Municipal Corporation* (1985) judgment summary (1 page).', 'Ask them to highlight every reference to a Directive Principle (Articles 39(a), 39(e), 41, 47).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_004', difficulty: 'standard',
          question: 'The 73rd Constitutional Amendment Act (1992) granted constitutional status.',
          hint: 'Revisit c12_soc_cbse_10_003 (Directive Principles vs. Fundamental Rights) and.',
          misconception: 'Students often believe the 73rd Amendment created Panchayats for the first time in India.',
          parts: [
                { id: 'a', prompt: 'Compare the reservation provisions for women in the 73rd Amendment with the pre-amendment situation.', answer: 'Pre-1992, women\'s representation was negligible and voluntary',
                  options: ['Pre-1992, women\'s representation was negligible and voluntary', 'the 73rd Amendment created Panchayats for the first time in India'],
                  hint: 'Revisit c12_soc_cbse_10_003 (Directive Principles vs. Fundamental Rights) and c10_civ_cbse_02_004.',
                  misconception: 'Students often believe the 73rd Amendment created Panchayats for the first time in India.' }
          ],
            remediations: { 'the-73rd-amendment-created-panchayats': { steps: ['If the student holds this misconception: (1) Have them compare a pre-1992 state Panchayat Act (e.g., UP Panchayat Raj.', '(2) Assign the Class 11 Political Science node c11_ps_cbse_17_002 ("Evolution of local government in India: From Lord.', '(3) Re-diagnose with a question: "Why did the Constitution originally leave Panchayats to Directive Principles (Article.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the 73rd Amendment created Panchayats for the first time in India.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "The 73rd Amendment has successfully democratised rural India because elections are held regularly and women occupy 33% of seats."', answer: 'The statement confuses procedural democracy with substantive democratisation',
                  options: ['The statement confuses procedural democracy with substantive democratisation', 'the 73rd Amendment created Panchayats for the first time in India'],
                  hint: 'Revisit c12_soc_cbse_10_003 (Directive Principles vs. Fundamental Rights) and c10_civ_cbse_02_004.',
                  misconception: 'Students often believe the 73rd Amendment created Panchayats for the first time in India.' }
          ],
            remediations: { 'the-73rd-amendment-created-panchayats': { steps: ['If the student holds this misconception: (1) Have them compare a pre-1992 state Panchayat Act (e.g., UP Panchayat Raj.', '(2) Assign the Class 11 Political Science node c11_ps_cbse_17_002 ("Evolution of local government in India: From Lord.', '(3) Re-diagnose with a question: "Why did the Constitution originally leave Panchayats to Directive Principles (Article.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_005', difficulty: 'standard',
          question: 'The Panchayati Raj system is a three-tier structure of rural local.',
          hint: 'Revisit Class 11 Political Science node c11_ps_cbse_17_003 (73rd Amendment) and.',
          misconception: 'Students often treat the three-tier Panchayati Raj system as a simple administrative hierarchy (like district → block →.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Panchayati Raj system is a three-tier structure of rural local self-government in',
                  options: ['The Panchayati Raj system is a three-tier structure of rural local self-government in', 'Democracy is a form of government in', 'The Indian Constitution is the supreme legal document that establishes the framework of', 'Fundamental Rights (Part III, Articles 12-35) are justiciable, legally enforceable'],
                  hint: 'Revisit Class 11 Political Science node c11_ps_cbse_17_003 (73rd Amendment) and c11_ps_cbse_17_005.',
                  misconception: 'Students often treat the three-tier Panchayati Raj system as a simple administrative hierarchy (like district → block → village) and.' }
          ],
            remediations: { 'students-often-treat-the-three': { steps: ['If the student confuses the tiers or misattributes functions: (1) Draw the pyramid on paper: Gram Sabha (base, all.', '(2) For each tier, write ONE constitutional source (Article 243A for Gram Sabha, 243B for three-tier, 243G for powers).', '(3) Map the Kalavati and Van Panchayat examples from NCERT to specific tiers — which tier did Kalavati join?', 'Which tier do Van Panchayats resemble?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_10_006', difficulty: 'standard',
          question: 'Reservation of seats in Panchayats for Scheduled Castes (SCs), Scheduled Tribes.',
          hint: 'Revisit c12_soc_cbse_10_004 for Panchayati Raj structure and c11_soc_cbse_02_003 for.',
          misconception: 'Students often believe that the 33% women\'s reservation is an additional quota *on top of* SC/ST quotas (i.e., total.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words how the reservation for women (33%) interacts with the reservation for SCs and STs in a Panchayat.', answer: 'The women\'s reservation of one-third applies to the total number of seats in the',
                  options: ['The women\'s reservation of one-third applies to the total number of seats in the', 'quota within quota', 'treats the women\'s quota as an additional separate block (e', 'the 33% women\'s reservation is an additional quota *on top of* SC/ST quotas (i'],
                  hint: 'Revisit c12_soc_cbse_10_004 for Panchayati Raj structure and c11_soc_cbse_02_003 for stratification.',
                  misconception: 'Students often believe that the 33% women\'s reservation is an additional quota *on top of* SC/ST quotas (i.e., total reserved seats = SC%.' },
                { id: 'b', prompt: 'A Gram Panchayat has 21 seats. The village population is 30% SC, 5% ST, and 65% general.', answer: 'Step 1: Total seats = 21',
                  options: ['Step 1: Total seats = 21', 'the 33% women\'s reservation is an additional quota *on top of* SC/ST quotas (i'],
                  hint: 'Revisit c12_soc_cbse_10_004 for Panchayati Raj structure and c11_soc_cbse_02_003 for stratification.',
                  misconception: 'Students often believe that the 33% women\'s reservation is an additional quota *on top of* SC/ST quotas (i.e., total reserved seats = SC%.' }
          ],
            remediations: { 'the-33-women-s-reservation': { steps: ['If a student exhibits the additive misconception, have them: 1) Re-read Article 243D(3) text: "not less than one-third.', 'including the number of seats reserved for women belonging to the SCs and STs." 2) Work through a concrete numerical.', '3) Draw a Venn diagram: total seats circle, SC/ST subsets, women subset overlapping both.', '4) Re-attempt Diagnostic Q3 and Q4.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
