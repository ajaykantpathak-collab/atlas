import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch11_p1: SimDef = {
    id: 'v3_c11_ps_ch11_p1',
    title: 'Rights in the Indian Constitution · Part 1/2',
    subtitle: 'Learn why the strongest rights still carry asterisks.',
    classLevel: 11, subject: 'political_science', topic: 'Rights in the Indian Constitution · Part 1/2',
    chapters: ['c11_ps_ch11'],
    nodeIds: ['c11_ps_cbse_11_001', 'c11_ps_cbse_11_002', 'c11_ps_cbse_11_003', 'c11_ps_cbse_11_004', 'c11_ps_cbse_11_005', 'c11_ps_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a rights lawyer reading the fine print of Article 19', intro: 'The same Article that guarantees your speech lists eight ways it can be reasonably limited — the clause is the design, not the loophole.', goal: 'Apply restriction clauses to fundamental rights and define \'State\' under Article 12.' },
    discovery: {
        question: 'They\'re called *fundamental* rights — so no government can restrict them, ever?',
        options: ['No — \'fundamental\' isn\'t \'absolute\': Article 19(2) alone lists eight grounds for reasonable restriction on free speech', 'Yes — fundamental means untouchable', 'Yes — that\'s what Part III guarantees', 'No — because rights were abolished in 1976'],
        answer: 'No — \'fundamental\' isn\'t \'absolute\': Article 19(2) alone lists eight grounds for reasonable restriction on free speech',
        hook: 'And \'the State\' reaches further than government offices — ONGC, SEBI and aided universities all count under Article 12, though the boundary is a test, not a title.',
    },
    teaching: [
        { title: 'Importance of rights in a constitution', text: 'Rights in a constitution are legally enforceable guarantees that limit state power and protect individual dignity by establishing justiciable claims against arbitrary authority, grounded in the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Weigh the charge that unelected judges striking laws is anti-democratic, then judge whether Articles 33–34 hole the basic structure.',
        labels: ['Importance of rights', 'Fundamental Rights: Articles 12-35', 'Right to Equality (Articles', 'Right against discrimination', 'Right to Freedom (Articles', 'Preventive detention and Article'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_001', title: 'Importance of rights in a constitution',
          caseStudy: { intro: 'Imagine you\'re reading a news report about a state government passing a law that allows police to detain protesters indefinitely without trial "for maintaining.',
            decisions: [{ prompt: 'What is the precise constitutional distinction between a "fundamental right" under Part III of the Indian Constitution and an ordinary.', options: [
                { text: 'A fundamental right is constitutionally entrenched (Part III, Articles 12-35),', outcome: 'A fundamental right is constitutionally entrenched (Part III, Articles 12-35), justiciable directly.' },
                { text: 'both are just rights', outcome: 'Not quite — Students believe "fundamental rights are absolute and cannot be restricted" - they confuse the term.', reveals: 'fundamental-rights-are-absolute-and' },
                { text: 'fundamental rights are absolute and cannot be restricted', outcome: 'Not quite — Students believe "fundamental rights are absolute and cannot be restricted" - they confuse the term.', reveals: 'fundamental-rights-are-absolute-and' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_002', title: 'Fundamental Rights: Articles 12-35 of the Constitution',
          caseStudy: { intro: 'Imagine you post a critical comment about a government policy on social media and your account gets suspended by a "government fact-check unit" – can you.',
            decisions: [{ prompt: 'What is the constitutional significance of Article 12\'s definition of "State" for the enforcement of fundamental rights?', options: [
                { text: 'Article 12 defines "State" to include the Government and Parliament of India, Government', outcome: 'Article 12 defines "State" to include the Government and Parliament of India, Government and.' },
                { text: 'State means only central government', outcome: 'Not quite — Students think "fundamental rights are only against the government" and miss that Article 12\'s.', reveals: 'fundamental-rights-are-only-against' },
                { text: 'fundamental rights are only against the government', outcome: 'Not quite — Students think "fundamental rights are only against the government" and miss that Article 12\'s.', reveals: 'fundamental-rights-are-only-against' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_003', title: 'Right to Equality (Articles 14-18): Equality before law and equal protection',
          caseStudy: { intro: 'Imagine a student sees a news report about a government scholarship scheme that reserves 50% of seats for students from a particular caste.',
            decisions: [{ prompt: 'State the exact wording of Article 14 of the Indian Constitution and name the two distinct concepts it embodies.', options: [
                { text: 'Article 14: "The State shall not deny to any person equality before the law or the equal', outcome: 'Article 14: "The State shall not deny to any person equality before the law or the equal protection.' },
                { text: 'everyone is treated the same', outcome: 'Not quite — Students often think "equality before law" (Art. 14) means the government can never treat anyone.', reveals: 'equality-before-law-art' },
                { text: 'equality before law', outcome: 'Not quite — Students often think "equality before law" (Art. 14) means the government can never treat anyone.', reveals: 'equality-before-law-art' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_004', title: 'Right against discrimination and untouchability (Articles 15-17)',
          caseStudy: { intro: 'Imagine a Class 11 student from a Dalit community is denied entry to a temple in their village despite the temple being open to the public.',
            decisions: [{ prompt: 'Which constitutional article explicitly abolishes untouchability and makes its practice in any form a punishable offence under law?', options: [
                { text: 'Article 17', outcome: 'Article 17. A wrong answer (e.g., Article 15 or Article 14) reveals the student conflates general.' },
                { text: 'Article 15(1) prohibits ALL discrimination by ANYONE', outcome: 'Not quite — Students believe Article 15(1) prohibits ALL discrimination by ANYONE.', reveals: 'article-15-1-prohibits-all' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_005', title: 'Right to Freedom (Articles 19-22): Six freedoms and safeguards',
          caseStudy: { intro: 'Imagine you\'re scrolling through social media and see a post criticizing a government policy get taken down, or hear about someone detained without trial for.',
            decisions: [{ prompt: 'List the six freedoms guaranteed under Article 19(1) and identify the specific clause (19(2) through 19(6)) that permits reasonable.', options: [
                { text: 'Article 19(1) guarantees: (a) speech and expression [restricted by 19(2)]', outcome: 'Article 19(1) guarantees: (a) speech and expression [restricted by 19(2)]; (b) peaceful assembly.' },
                { text: 'freedom of religion', outcome: 'Not quite — Students often believe Article 19 freedoms are absolute or that "reasonable restrictions" means the.', reveals: 'article-19-freedoms-are-absolute' },
                { text: 'reasonable restrictions', outcome: 'Not quite — Students often believe Article 19 freedoms are absolute or that "reasonable restrictions" means the.', reveals: 'article-19-freedoms-are-absolute' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_006', title: 'Preventive detention and Article 22: Safeguards and debates',
          caseStudy: { intro: 'Imagine reading a news report about a student activist detained for a year under the National Security Act (NSA) without being charged with a specific crime.',
            decisions: [{ prompt: 'What is the maximum period for which a person can be detained under a preventive detention law without obtaining the opinion of an Advisory.', options: [
                { text: 'The maximum period is three months', outcome: 'The maximum period is three months. Article 22(4) explicitly states that no law providing for.' },
                { text: 'six months', outcome: 'Not quite — Students often believe that "preventive detention" and "arrest under criminal law" are the same.', reveals: 'preventive-detention-and-arrest-under' },
                { text: 'no limit', outcome: 'Not quite — Students often believe that "preventive detention" and "arrest under criminal law" are the same.', reveals: 'preventive-detention-and-arrest-under' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a moot-court prep, a student argues: \'Article 19(1)(a) is a Fundamental Right, so the government can\'t touch hate speech — fundamental means absolute.\' He also claims \'rights only bind government offices — a private hospital can\'t violate them.\'',
            decisions: [{ prompt: 'What do the restriction clauses and Article 12 actually say?', options: [
                { text: 'Read the right with its clauses: \'fundamental\' means constitutionally guaranteed and justiciable — not absolute; Article 19(2) lists eight grounds for reasonable restriction including public order and incitement, and Articles 21–24 carry their own limits. And \'State\' under Article 12 reaches beyond government offices — ONGC, SEBI, aided universities — but private bodies count only under \'deep and pervasive\' state control, not merely because they serve the public.', outcome: 'The moot argument gains precision: rights bind an expanded-but-bounded \'State\', and every right is read alongside the restrictions the same Constitution wrote in.' },
                { text: 'Stand on \'absolute\' — calling a right fundamental means no legislature can restrict it.', outcome: 'The Constitution itself writes the exceptions: 19(2), 21, 22 all authorise restrictions — quoting the right while ignoring its clause misreads the text.', reveals: 'fundamental-means-absolute' },
                { text: 'Keep \'government offices only\' — Article 12\'s \'State\' means departments, not companies.', outcome: 'Article 12 deliberately says \'other authorities\': deep and pervasive state control brings corporations and aided bodies in — the test is control, not public function alone.', reveals: 'state-means-only-government' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'Rights with no restriction clauses would collide with each other — the limits are how many rights can coexist at once.',
            decisions: [{ prompt: 'What comes next? Rights in the Indian Constitution · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Rights in the Indian Constitution · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_001', difficulty: 'standard',
          question: 'Rights in a constitution are legally enforceable guarantees that limit state.',
          hint: 'Revisit Article 13(2) ("The State shall not make any law which takes away or abridges the.',
          misconception: 'Students believe "fundamental rights are absolute and cannot be restricted" - they confuse the term "fundamental" with.',
          parts: [
                { id: 'a', prompt: 'What is the precise constitutional distinction between a "fundamental right" under Part III of the Indian Constitution and an ordinary "legal right" created.', answer: 'A fundamental right is constitutionally entrenched (Part III, Articles 12-35),',
                  options: ['A fundamental right is constitutionally entrenched (Part III, Articles 12-35),', 'both are just rights', 'fundamental rights are absolute and cannot be restricted', 'fundamental'],
                  hint: 'Revisit Article 13(2) ("The State shall not make any law which takes away or abridges the rights.',
                  misconception: 'Students believe "fundamental rights are absolute and cannot be restricted" - they confuse the term "fundamental" with "absolute.".' }
          ],
            remediations: { 'fundamental-rights-are-absolute-and': { steps: ['Have the student read Article 19(1) and 19(2) side-by-side in the bare Constitution text.', 'Analyze Romesh Thappar v. State of Madras (1950) where the Court struck down a ban on journal entry because "public.', 'Apply to a current scenario - e.g., IT Rules 2021 regulating digital media - identify which 19(2) ground the government.', 'Practice writing answers using the formula: "Right under Article 19(1)(x) → Restriction under Article 19(y) → Test.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_002', difficulty: 'standard',
          question: 'Fundamental Rights (Articles 12-35) are justiciable constitutional guarantees.',
          hint: 'Revisit c10_civ_cbse_04_005 (Right to Equality) and c10_civ_cbse_04_004 (Fundamental.',
          misconception: 'Students think "fundamental rights are only against the government" and miss that Article 12\'s "other authorities".',
          parts: [
                { id: 'a', prompt: 'Why did the Constituent Assembly include Article 13(2) stating that "the State shall not make any law which takes away or abridges the rights conferred by this.', answer: 'Article 13(1) operates retrospectively (voiding pre-1950 laws inconsistent with',
                  options: ['Article 13(1) operates retrospectively (voiding pre-1950 laws inconsistent with', 'both do the same thing', 'fundamental rights are only against the government', 'other authorities'],
                  hint: 'Revisit c10_civ_cbse_04_005 (Right to Equality) and c10_civ_cbse_04_004 (Fundamental Rights.',
                  misconception: 'Students think "fundamental rights are only against the government" and miss that Article 12\'s "other authorities" brings.' }
          ],
            remediations: { 'fundamental-rights-are-only-against': { steps: ['Re-read Article 12 text and list all four categories (Government/Parliament, State Government/Legislature, local.', 'Apply the "Pradeep Kumar Biswas" test to three entities: (a) Delhi Metro Rail Corporation (yes – statutory.', 'For each, identify which Article 12 category fits and why.', 'Check Article 13(3) – does the entity\'s rule/bye-law/order count as "law"?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "fundamental rights are only against the government" and miss that Article 12\'s "other authorities".',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Article 33 (power to modify fundamental rights for armed forces) and Article 34 (restriction during martial law) undermine the basic.', answer: 'The argument is flawed',
                  options: ['The argument is flawed', 'fundamental rights are only against the government', 'other authorities', 'deep and pervasive state control'],
                  hint: 'Revisit c10_civ_cbse_04_005 (Right to Equality) and c10_civ_cbse_04_004 (Fundamental Rights.',
                  misconception: 'Students think "fundamental rights are only against the government" and miss that Article 12\'s "other authorities" brings.' }
          ],
            remediations: { 'fundamental-rights-are-only-against': { steps: ['Re-read Article 12 text and list all four categories (Government/Parliament, State Government/Legislature, local.', 'Apply the "Pradeep Kumar Biswas" test to three entities: (a) Delhi Metro Rail Corporation (yes – statutory.', 'For each, identify which Article 12 category fits and why.', 'Check Article 13(3) – does the entity\'s rule/bye-law/order count as "law"?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_003', difficulty: 'standard',
          question: 'The Right to Equality (Articles 14–18) guarantees that the State shall not deny.',
          hint: 'If stuck, revisit the "reasonable classification" test from Class 10 Civics.',
          misconception: 'Students often think "equality before law" (Art. 14) means the government can never treat anyone differently, so they.',
          parts: [
                { id: 'a', prompt: 'Explain why the Supreme Court in *State of West Bengal v. Anwar Ali Sarkar* (1952) struck down a law that allowed the government to pick certain cases for.', answer: 'The law failed the reasonable classification test',
                  options: ['The law failed the reasonable classification test', 'the law discriminated between cases', 'equality before law', '"equality before law" (Art'],
                  hint: 'If stuck, revisit the "reasonable classification" test from Class 10 Civics (c10_civ_cbse_03_008).',
                  misconception: 'Students often think "equality before law" (Art. 14) means the government can never treat anyone differently, so they view all reservations.' }
          ],
            remediations: { 'equality-before-law-art': { steps: ['Re-read Article 14 text and identify the phrase "equal protection of laws."', 'Review the *Anwar Ali Sarkar* two-prong test (intelligible differentia + rational nexus) from your notes.', 'Take a concrete example — income tax slabs (higher income, higher rate). Ask: "Is this differentiation? Yes.', 'Now apply the same test to OBC reservation: differentia = social/educational backwardness; nexus = remedying.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_004', difficulty: 'standard',
          question: 'The Right against Discrimination and Untouchability under Articles 15-17 of the.',
          hint: 'Revisit c11_ps_cbse_11_003 (Article 14) and the Article 12 "State" definition — without.',
          misconception: 'Students believe Article 15(1) prohibits ALL discrimination by ANYONE.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article explicitly abolishes untouchability and makes its practice in any form a punishable offence under law?', answer: 'Article 17',
                  options: ['Article 17', 'Article 15(1) prohibits ALL discrimination by ANYONE'],
                  hint: 'Revisit c11_ps_cbse_11_003 (Article 14) and the Article 12 "State" definition — without these, the.',
                  misconception: 'Students believe Article 15(1) prohibits ALL discrimination by ANYONE. In reality, Article 15(1) binds only the "State" (Article 12).' },
                { id: 'b', prompt: 'A private unaided engineering college refuses admission to a Muslim student solely based on religion.', answer: 'The petition will likely fail against the private college under Article 15(1)',
                  options: ['The petition will likely fail against the private college under Article 15(1)', 'Article 15(1) prohibits ALL discrimination by ANYONE'],
                  hint: 'Revisit c11_ps_cbse_11_003 (Article 14) and the Article 12 "State" definition — without these, the.',
                  misconception: 'Students believe Article 15(1) prohibits ALL discrimination by ANYONE. In reality, Article 15(1) binds only the "State" (Article 12).' }
          ],
            remediations: { 'article-15-1-prohibits-all': { steps: ['Re-read Article 12 definition of "State" — list the four categories (Government, Parliament, local authorities, other.', 'Take a newspaper report of private discrimination (e.g., housing society denying flat to bachelor/meat-eater/Dalit).', 'Write two sentences: "Article 15(1) applies because..." or "Article 15(1) does NOT apply because..." using the State.', 'Check Article 15(2) — does the place fall under "shops, public restaurants, hotels, places of public entertainment"?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_005', difficulty: 'standard',
          question: 'The Right to Freedom (Articles 19-22) is a cluster of Fundamental Rights.',
          hint: 'Revisit c11_ps_cbse_11_002: Reread Article 12 "State" definition (including *Pradeep.',
          misconception: 'Students often believe Article 19 freedoms are absolute or that "reasonable restrictions" means the government can.',
          parts: [
                { id: 'a', prompt: 'List the six freedoms guaranteed under Article 19(1) and identify the specific clause (19(2) through 19(6)) that permits reasonable restrictions on each.', answer: 'Article 19(1) guarantees: (a) speech and expression [restricted by 19(2)]',
                  options: ['Article 19(1) guarantees: (a) speech and expression [restricted by 19(2)]', 'freedom of religion', 'reasonable restrictions'],
                  hint: 'Revisit c11_ps_cbse_11_002: Reread Article 12 "State" definition (including *Pradeep Kumar Biswas*.',
                  misconception: 'Students often believe Article 19 freedoms are absolute or that "reasonable restrictions" means the government can restrict them for *any*.' },
                { id: 'b', prompt: 'Explain why the Supreme Court in *Maneka Gandhi v. Union of India* (1978) held that "procedure established by law" in Article 21 must be "fair, just, and.', answer: 'Pre-*Maneka Gandhi*, *A.K',
                  options: ['Pre-*Maneka Gandhi*, *A.K', 'procedure established by law', 'reasonable restrictions'],
                  hint: 'Revisit c11_ps_cbse_11_002: Reread Article 12 "State" definition (including *Pradeep Kumar Biswas*.',
                  misconception: 'Students often believe Article 19 freedoms are absolute or that "reasonable restrictions" means the government can restrict them for *any*.' }
          ],
            remediations: { 'article-19-freedoms-are-absolute': { steps: ['Create a two-column table. Column A: Six Article 19(1) freedoms.', 'Read *Anuradha Bhasin v. Union of India* (2020) summary (SCC Online or bare act).', 'Distinguish Article 22(1)-(2) [ordinary arrest] vs 22(4)-(7) [preventive detention] using a flowchart: who detains?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_11_006', difficulty: 'standard',
          question: 'Preventive detention refers to the detention of a person without trial.',
          hint: 'If stuck, re-read the "Right to Freedom" node (c11_ps_cbse_11_005) focusing specifically.',
          misconception: 'Students often believe that "preventive detention" and "arrest under criminal law" are the same thing, differing only.',
          parts: [
                { id: 'a', prompt: 'What is the maximum period for which a person can be detained under a preventive detention law without obtaining the opinion of an Advisory Board, as mandated.', answer: 'The maximum period is three months',
                  options: ['The maximum period is three months', 'six months', 'no limit', 'preventive detention'],
                  hint: 'If stuck, re-read the "Right to Freedom" node (c11_ps_cbse_11_005) focusing specifically on the box.',
                  misconception: 'Students often believe that "preventive detention" and "arrest under criminal law" are the same thing, differing only in duration.' },
                { id: 'b', prompt: 'A person is detained under the Conservation of Foreign Exchange and Prevention of Smuggling Activities Act (COFEPOSA) for alleged smuggling.', answer: 'The detention order is not automatically vitiated',
                  options: ['The detention order is not automatically vitiated', 'any non-disclosure invalidates detention', 'the state has absolute privilege', 'effective representation'],
                  hint: 'If stuck, re-read the "Right to Freedom" node (c11_ps_cbse_11_005) focusing specifically on the box.',
                  misconception: 'Students often believe that "preventive detention" and "arrest under criminal law" are the same thing, differing only in duration.' }
          ],
            remediations: { 'preventive-detention-and-arrest-under': { steps: ['If a student conflates preventive detention with criminal arrest, follow these steps: (1) Create a two-column table.', '"Preventive Detention (NSA/COFEPOSA/Art.', 'Fill columns for: Authority (Police vs.', 'DM), Basis (Past offence/FIR vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
