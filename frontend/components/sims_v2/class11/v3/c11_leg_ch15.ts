import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch15 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch15: SimDef = {
    id: 'v3_c11_leg_ch15',
    title: 'Maintenance',
    subtitle: 'This node covers: the **concept of maintenance**, its **constitutional basis (Article.',
    classLevel: 11, subject: 'leg', topic: 'Maintenance',
    chapters: ['c11_leg_ch15'],
    nodeIds: ['c11_leg_cbse_15_001', 'c11_leg_cbse_15_002', 'c11_leg_cbse_15_003', 'c11_leg_cbse_15_004', 'c11_leg_cbse_15_005', 'c11_leg_cbse_15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with this: "Your friend\'s mother, a homemaker for 20 years, is thrown out by her husband with no money.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A Hindu wife earning ₹30,000/month files for maintenance against her husband earning ₹2 lakh/month.',
        options: ['Yes, she can claim maintenance', 'she earns, so no maintenance', 'poverty test'],
        answer: 'Yes, she can claim maintenance',
        hook: '**Misconception**: "Maintenance under Section 125 CrPC is only for *wives* and *minor children*." **Why it happens**.',
    },
    teaching: [
        { title: 'Maintenance — Key Concepts and Institutions', text: 'Maintenance is the legally enforceable obligation of a person (spouse, parent, child, or relative) to provide financial support — including food, clothing, shelter, education, and medical care — to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_15_001', title: 'Maintenance — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with this: "Your friend\'s mother, a homemaker for 20 years, is thrown out by her husband with no money. She files a case.',
            decisions: [{ prompt: 'Define "maintenance" in the context of Indian family law and state its constitutional foundation.', options: [
                { text: 'Maintenance is the legally enforceable obligation to provide financial support (food,', outcome: 'Maintenance is the legally enforceable obligation to provide financial support (food, shelter.' },
                { text: 'only alimony after divorce', outcome: 'Not quite — **Misconception**: "Maintenance under Section 125 CrPC is only for *wives* and *minor children*.".', reveals: 'misconception-maintenance-under-section-125' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_15_002', title: 'Maintenance — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start with a real-world scenario: A student reads a news headline: “Supreme Court strikes down electoral bonds scheme as unconstitutional.” Ask: How can the.',
            decisions: [{ prompt: 'What article of the Indian Constitution gives the Supreme Court the power to issue writs for enforcement of fundamental rights?', options: [
                { text: 'Article 32', outcome: 'Article 32. A wrong answer like “Article 226” reveals confusion between Supreme Court and High.' },
                { text: 'Article 226', outcome: 'Not quite — Students often think judicial review means the Supreme Court can rewrite or improve laws.', reveals: 'judicial-review-means-the-supreme' },
                { text: 'super-legislature', outcome: 'Not quite — Students often think judicial review means the Supreme Court can rewrite or improve laws.', reveals: 'judicial-review-means-the-supreme' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_15_003', title: 'Maintenance — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real dilemma: A Muslim woman divorced by triple talaq claims maintenance under Section 125 CrPC beyond the iddat period.',
            decisions: [{ prompt: 'In the landmark case *Mohd. Ahmed Khan v. Shah Bano Begum* (1985), the Supreme Court held that a divorced Muslim woman is entitled.', options: [
                { text: 'The Supreme Court relied primarily on **Article 15(3)** (permitting special provisions', outcome: 'The Supreme Court relied primarily on **Article 15(3)** (permitting special provisions for women).' },
                { text: 'trump card', outcome: 'Not quite — **Misconception:** "Once the Supreme Court decides a maintenance case (e.g., Shah Bano), that.', reveals: 'misconception-once-the-supreme-court' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_15_004', title: 'Maintenance — Processes and Procedures',
          caseStudy: { intro: 'A Class 11 student asks: "My mother wants maintenance from my father who lives in another state — where does she file, what papers does she need, and how long.',
            decisions: [{ prompt: 'What is the territorial jurisdiction for a wife to file a maintenance application under Section 125 CrPC if she lives in Delhi and her.', options: [
                { text: 'The wife can file in Delhi (where she resides) under Section 125(1) CrPC as amended in', outcome: 'The wife can file in Delhi (where she resides) under Section 125(1) CrPC as amended in 2001, which.' },
                { text: 'only Mumbai or Kolkata', outcome: 'Not quite — Students believe "maintenance procedure is the same everywhere — just file a case." They miss that.', reveals: 'maintenance-procedure-is-the-same' },
                { text: 'maintenance procedure is the same everywhere', outcome: 'Not quite — Students believe "maintenance procedure is the same everywhere — just file a case." They miss that.', reveals: 'maintenance-procedure-is-the-same' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_15_005', title: 'Maintenance — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'You’re a legal aid volunteer. A woman walks in — married 15 years, two kids, husband left 6 months ago, no contact, she’s a homemaker with no income.',
            decisions: [{ prompt: 'A Hindu wife files for maintenance under Section 125 CrPC. Her husband argues she is "able to maintain herself" because she has a Master’s.', options: [
                { text: 'No', outcome: 'No. The Supreme Court in *Savitri Bai v. State of Maharashtra* (2019) held that mere educational.' },
                { text: 'capacity to earn', outcome: 'Not quite — Students believe maintenance under Section 125 CrPC is *only* for divorced or separated wives.', reveals: 'maintenance-under-section-125-crpc' },
                { text: 'actual income', outcome: 'Not quite — Students believe maintenance under Section 125 CrPC is *only* for divorced or separated wives.', reveals: 'maintenance-under-section-125-crpc' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_15_006', title: 'Maintenance — Critical Analysis and Application',
          caseStudy: { intro: 'Start with this scenario: "A 35-year-old homemaker, married for 10 years, is thrown out of her matrimonial home by her husband who earns ₹1.5 lakh/month.',
            decisions: [{ prompt: 'A Muslim woman divorced by triple talaq in 2020 (before the 2019 Act criminalised it) files for maintenance under Section 125 CrPC.', options: [
                { text: 'Section 127(3)(b) CrPC excludes a divorced Muslim woman who has received maintenance', outcome: 'Section 127(3)(b) CrPC excludes a divorced Muslim woman who has received maintenance under Muslim.' },
                { text: 'only iddat maintenance', outcome: 'Not quite — Students often believe "maintenance under Section 125 CrPC is only for *divorced* wives" because.', reveals: 'maintenance-under-section-125-crpc' },
                { text: 'maintenance under Section 125 CrPC is only for *divorced* wives', outcome: 'Not quite — Students often believe "maintenance under Section 125 CrPC is only for *divorced* wives" because.', reveals: 'maintenance-under-section-125-crpc' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_15_005', title: 'Maintenance — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'You’re a legal aid volunteer. A woman walks in — married 15 years, two kids, husband left 6 months ago, no contact, she’s a homemaker with no income.',
            decisions: [{ prompt: 'A Hindu wife files for maintenance under Section 125 CrPC. Her husband argues she is "able to maintain herself" because she has a Master’s.', options: [
                { text: 'No', outcome: 'No. The Supreme Court in *Savitri Bai v. State of Maharashtra* (2019) held that mere educational.' },
                { text: 'capacity to earn', outcome: 'Not quite — Students believe maintenance under Section 125 CrPC is *only* for divorced or separated wives.', reveals: 'maintenance-under-section-125-crpc' },
                { text: 'actual income', outcome: 'Not quite — Students believe maintenance under Section 125 CrPC is *only* for divorced or separated wives.', reveals: 'maintenance-under-section-125-crpc' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_leg_cbse_15_002', title: 'Identify each idea',
          dissect: { specimen: 'Maintenance', spots: [
            { id: 's1', label: 'Maintenance Key Concepts and Institutions', prompt: 'Which idea is this? — Maintenance is the legally enforceable obligation of a person (spouse, parent, child,.', answer: 'Maintenance Key Concepts and Institutions', options: ['Maintenance Key Concepts and Institutions', 'Maintenance Constitutional and Legal Provisions', 'Maintenance Landmark Cases and Illustrations', 'Maintenance Processes and Procedures'] },
            { id: 's2', label: 'Maintenance Constitutional and Legal Provisions', prompt: 'Which idea is this? — Judicial review is the power of the Supreme Court of India to examine and declare.', answer: 'Maintenance Constitutional and Legal Provisions', options: ['Maintenance Constitutional and Legal Provisions', 'Maintenance Key Concepts and Institutions', 'Maintenance Landmark Cases and Illustrations', 'Maintenance Processes and Procedures'] },
            { id: 's3', label: 'Maintenance Landmark Cases and Illustrations', prompt: 'Which idea is this? — Landmark cases on maintenance are binding or persuasive judicial precedents where the.', answer: 'Maintenance Landmark Cases and Illustrations', options: ['Maintenance Landmark Cases and Illustrations', 'Maintenance Key Concepts and Institutions', 'Maintenance Constitutional and Legal Provisions', 'Maintenance Processes and Procedures'] },
            { id: 's4', label: 'Maintenance Processes and Procedures', prompt: 'Which idea is this? — Maintenance Processes and Procedures refer to the codified legal pathway — primarily.', answer: 'Maintenance Processes and Procedures', options: ['Maintenance Processes and Procedures', 'Maintenance Key Concepts and Institutions', 'Maintenance Constitutional and Legal Provisions', 'Maintenance Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Maintenance Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — Maintenance is the legal obligation of a person to provide financial support (food.', answer: 'Maintenance Exam-Oriented Questions and Answers', options: ['Maintenance Exam-Oriented Questions and Answers', 'Maintenance Key Concepts and Institutions', 'Maintenance Constitutional and Legal Provisions', 'Maintenance Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Maintenance Critical Analysis and Application', prompt: 'Which idea is this? — Maintenance is a legally enforceable obligation imposed on a person (usually the husband).', answer: 'Maintenance Critical Analysis and Application', options: ['Maintenance Critical Analysis and Application', 'Maintenance Key Concepts and Institutions', 'Maintenance Constitutional and Legal Provisions', 'Maintenance Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c11_leg_cbse_15_006', title: 'You made it',
          caseStudy: { intro: 'You finished Maintenance — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_15_001', difficulty: 'standard',
          question: 'Maintenance is the legally enforceable obligation of a person (spouse, parent.',
          hint: 'If stuck on "which law applies?", review **c11_leg_cbse_15_002** (Constitutional and.',
          misconception: '**Misconception**: "Maintenance under Section 125 CrPC is only for *wives* and *minor children*." **Why it happens**.',
          parts: [
                { id: 'a', prompt: 'A Hindu wife earning ₹30,000/month files for maintenance against her husband earning ₹2 lakh/month.', answer: 'Yes, she can claim maintenance',
                  options: ['Yes, she can claim maintenance', 'she earns, so no maintenance', 'poverty test', 'matrimonial standard of living'],
                  hint: 'If stuck on "which law applies?", review **c11_leg_cbse_15_002** (Constitutional and Legal.',
                  misconception: '**Misconception**: "Maintenance under Section 125 CrPC is only for *wives* and *minor children*." **Why it happens**: Textbooks often list.' },
                { id: 'b', prompt: 'A Muslim woman divorced by triple talaq (now void under 2019 Act) claims maintenance under Section 125 CrPC.', answer: 'She is entitled to maintenance **beyond iddat** under Section 125 CrPC',
                  options: ['She is entitled to maintenance **beyond iddat** under Section 125 CrPC', 'only iddat maintenance', 'reading down'],
                  hint: 'If stuck on "which law applies?", review **c11_leg_cbse_15_002** (Constitutional and Legal.',
                  misconception: '**Misconception**: "Maintenance under Section 125 CrPC is only for *wives* and *minor children*." **Why it happens**: Textbooks often list.' },
                { id: 'c', prompt: 'Compare the maintenance rights of: (a) a Hindu wife under HMA Section 24 vs. CrPC Section 125; (b) a live-in partner under PWDVA vs.', answer: 'a Hindu wife under HMA Section 24 vs',
                  options: ['a Hindu wife under HMA Section 24 vs', 'economic abuse'],
                  hint: 'If stuck on "which law applies?", review **c11_leg_cbse_15_002** (Constitutional and Legal.',
                  misconception: '**Misconception**: "Maintenance under Section 125 CrPC is only for *wives* and *minor children*." **Why it happens**: Textbooks often list.' }
          ],
            remediations: { 'misconception-maintenance-under-section-125': { steps: ['**Re-read Section 125 CrPC text** — highlight "child" (no age limit if disabled), "father or mother" (judicially.', '**Map claimants to provisions**: Create a table: | Claimant | CrPC S.125 | HMA S.24 | PWDVA | Muslim Law (post-2019) |.', 'Fill each cell with *yes/no + quantum basis*.', '**Trace one case**: *Rajnesh v.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_15_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "Maintenance under Section 125 CrPC is only for *wives* and *minor children*." **Why it happens**.',
          parts: [
                { id: 'a', prompt: 'Critique: "Section 125 CrPC is a complete code for maintenance; personal law provisions (HMA, Muslim law, etc.) are redundant." Use *Savitri v.', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'neglect/refusal', 'inability', 'complete'],
                  hint: 'If stuck on "which law applies?", review **c11_leg_cbse_15_002** (Constitutional and Legal.',
                  misconception: '**Misconception**: "Maintenance under Section 125 CrPC is only for *wives* and *minor children*." **Why it happens**: Textbooks often list.' }
          ],
            remediations: { 'misconception-maintenance-under-section-125': { steps: ['**Re-read Section 125 CrPC text** — highlight "child" (no age limit if disabled), "father or mother" (judicially.', '**Map claimants to provisions**: Create a table: | Claimant | CrPC S.125 | HMA S.24 | PWDVA | Muslim Law (post-2019) |.', 'Fill each cell with *yes/no + quantum basis*.', '**Trace one case**: *Rajnesh v.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_15_002', difficulty: 'standard',
          question: 'Judicial review is the power of the Supreme Court of India to examine and.',
          hint: 'If stuck, revisit the concept of “constitutional supremacy” from Unit 2 (Basic Features.',
          misconception: 'Students often think judicial review means the Supreme Court can rewrite or improve laws it dislikes, acting as.',
          parts: [
                { id: 'a', prompt: 'What article of the Indian Constitution gives the Supreme Court the power to issue writs for enforcement of fundamental rights?', answer: 'Article 32',
                  options: ['Article 32', 'Article 226', 'super-legislature', 'the Court is making policy, not interpreting the Constitution'],
                  hint: 'If stuck, revisit the concept of “constitutional supremacy” from Unit 2 (Basic Features of the.',
                  misconception: 'Students often think judicial review means the Supreme Court can rewrite or improve laws it dislikes, acting as a “super-legislature.” For.' },
                { id: 'b', prompt: 'A state government passes a law reserving 60% of jobs for residents of that state.', answer: '- Step 1: Identify the law in question—state domicile-based job reservation',
                  options: ['- Step 1: Identify the law in question—state domicile-based job reservation', 'It violates Article 16, so it’s invalid', 'super-legislature', 'the Court is making policy, not interpreting the Constitution'],
                  hint: 'If stuck, revisit the concept of “constitutional supremacy” from Unit 2 (Basic Features of the.',
                  misconception: 'Students often think judicial review means the Supreme Court can rewrite or improve laws it dislikes, acting as a “super-legislature.” For.' }
          ],
            remediations: { 'judicial-review-means-the-supreme': { steps: ['To fix this, guide the student back to the Constitution: Ask, “Where does the Court get the power to change a tax law?”.', 'Use Article 13: laws inconsistent with fundamental rights are void—note it says “void,” not “amend.” Contrast with.', 'Use a flowchart: Court checks → if violates Constitution → strikes down → Parliament must rewrite if it wants.', 'Emphasize: The Court interprets, Parliament legislates.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_15_003', difficulty: 'standard',
          question: 'Landmark cases on maintenance are binding or persuasive judicial precedents.',
          hint: 'If stuck, re-read c11_leg_cbse_15_002 (Constitutional and Legal Provisions).',
          misconception: '**Misconception:** "Once the Supreme Court decides a maintenance case (e.g., Shah Bano), that becomes the *final.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the Supreme Court in *Danial Latifi v.', answer: 'The Court used the doctrine of **reading down**',
                  options: ['The Court used the doctrine of **reading down**', 'the Court struck down the Act', 'the Court said iddat is enough'],
                  hint: 'If stuck, re-read c11_leg_cbse_15_002 (Constitutional and Legal Provisions) — specifically the.',
                  misconception: '**Misconception:** "Once the Supreme Court decides a maintenance case (e.g., Shah Bano), that becomes the *final, unchangeable law* for all.' },
                { id: 'b', prompt: 'A Hindu man marries a second wife while his first wife is alive. The second wife, unaware of the first marriage, lives with him for 10 years and has a child.', answer: 'The second wife **will get maintenance**',
                  options: ['The second wife **will get maintenance**', 'no maintenance because marriage is void'],
                  hint: 'If stuck, re-read c11_leg_cbse_15_002 (Constitutional and Legal Provisions) — specifically the.',
                  misconception: '**Misconception:** "Once the Supreme Court decides a maintenance case (e.g., Shah Bano), that becomes the *final, unchangeable law* for all.' }
          ],
            remediations: { 'misconception-once-the-supreme-court': { steps: ['** Show the student the *timeline*: Shah Bano (1985) → MWPRDA 1986 (Parliament responds) → Danial Latifi (2001) (Court.', '** Give a 2-column table: *Ratio Decidendi* (binding) vs. *Obiter Dicta* (persuasive) for *Danial Latifi*.', '** Give a new fact pattern: "Muslim woman signs khulanama waiving maintenance, then files Section 125 after 5 years.".', '** Explain: "Precedent is a *conversation*, not a *command*. Each case adds a \'yes, but...\' — the skill is tracking the.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_15_004', difficulty: 'standard',
          question: 'Maintenance Processes and Procedures refer to the codified legal pathway.',
          hint: 'Review the "Maintenance — Key Concepts and Institutions" node (c11_leg_cbse_15_001) table.',
          misconception: 'Students believe "maintenance procedure is the same everywhere — just file a case." They miss that: (1) CrPC.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Maintenance Processes and Procedures refer to the codified legal pathway',
                  options: ['Maintenance Processes and Procedures refer to the codified legal pathway', 'Maintenance is the legally enforceable obligation of a person (spouse, parent, child, or', 'Judicial review is the power of the Supreme Court of India to examine and declare', 'Landmark cases on maintenance are binding or persuasive judicial precedents where the'],
                  hint: 'Review the "Maintenance — Key Concepts and Institutions" node (c11_leg_cbse_15_001) table comparing.',
                  misconception: 'Students believe "maintenance procedure is the same everywhere — just file a case." They miss that: (1) CrPC is summary/criminal procedure.' }
          ],
            remediations: { 'maintenance-procedure-is-the-same': { steps: ['If the student confuses forums: (1) Make a 4-column table: Forum | Governing Law | Who Can File | Timeline for Interim.', '(2) Give 3 fact scenarios (divorced Hindu wife, live-in partner, divorced Muslim woman) and ask them to pick the *best.', '(3) Have them trace the *actual file movement*: Application → Affidavit → Notice → Interim Hearing → Evidence → Final.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_15_005', difficulty: 'standard',
          question: 'Maintenance is the legal obligation of a person to provide financial support.',
          hint: 'If stuck, review *Danial Latifi v. Union of India* (2001) — it is the *linchpin*.',
          misconception: 'Students believe maintenance under Section 125 CrPC is *only* for divorced or separated wives.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between "interim maintenance" and "permanent alimony" under the Hindu Marriage Act, 1955, in terms of: (a) stage of proceedings, (b).', answer: 'stage of proceedings, (',
                  options: ['stage of proceedings, (', 'temporary', 'maintenance under Section 125 CrPC is *only* for divorced or separated wives'],
                  hint: 'If stuck, review *Danial Latifi v. Union of India* (2001) — it is the *linchpin* connecting Muslim.',
                  misconception: 'Students believe maintenance under Section 125 CrPC is *only* for divorced or separated wives.' },
                { id: 'b', prompt: 'A Muslim woman is divorced by her husband via *Talaq-e-Ahsan*. She has no income, two minor children, and her *iddat* period (3 months) has ended.', answer: '**Step 1:** Identify governing law',
                  options: ['**Step 1:** Identify governing law', 'maintenance under Section 125 CrPC is *only* for divorced or separated wives'],
                  hint: 'If stuck, review *Danial Latifi v. Union of India* (2001) — it is the *linchpin* connecting Muslim.',
                  misconception: 'Students believe maintenance under Section 125 CrPC is *only* for divorced or separated wives.' }
          ],
            remediations: { 'maintenance-under-section-125-crpc': { steps: ['Ask the student: "Define \'wife\' under Section 125 CrPC in *your* words." — They will likely say "divorced woman".', 'Sitabai* (2008) 2 SCC 316: Wife living in same house, husband stopped giving money for food/medicines.', 'Court granted maintenance.', 'Explain: Section 125 is a *summary, speedy remedy* for *neglect* — not just desertion.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_15_006', difficulty: 'standard',
          question: 'Maintenance is a legally enforceable obligation imposed on a person (usually.',
          hint: 'If stuck, review the "Comparison Table of Maintenance Statutes" in c11_leg_cbse_15_002.',
          misconception: 'Students often believe "maintenance under Section 125 CrPC is only for *divorced* wives" because they confuse it with.',
          parts: [
                { id: 'a', prompt: 'Explain why a wife living separately by mutual consent (e.g., a separation agreement) can still claim maintenance under Section 125 CrPC, but a wife living.', answer: 'Section 125(1) CrPC requires "neglect or refusal to maintain"',
                  options: ['Section 125(1) CrPC requires "neglect or refusal to maintain"', 'both are barred', 'maintenance under Section 125 CrPC is only for *divorced* wives'],
                  hint: 'If stuck, review the "Comparison Table of Maintenance Statutes" in c11_leg_cbse_15_002 — focus.',
                  misconception: 'Students often believe "maintenance under Section 125 CrPC is only for *divorced* wives" because they confuse it with *permanent alimony*.' },
                { id: 'b', prompt: 'A Hindu husband files for divorce on grounds of cruelty. The wife files a counter-claim for interim maintenance under Section 24 Hindu Marriage Act (HMA) and.', answer: 'No, she cannot execute both',
                  options: ['No, she cannot execute both', 'she can claim both', 'maintenance under Section 125 CrPC is only for *divorced* wives'],
                  hint: 'If stuck, review the "Comparison Table of Maintenance Statutes" in c11_leg_cbse_15_002 — focus.',
                  misconception: 'Students often believe "maintenance under Section 125 CrPC is only for *divorced* wives" because they confuse it with *permanent alimony*.' }
          ],
            remediations: { 'maintenance-under-section-125-crpc': { steps: ['Re-read Section 125 CrPC *with* its Explanations (1) and (2) — highlight "wife includes divorced wife..." and "child.', 'Create a 2x2 matrix: Rows = Claimant (Wife during marriage, Divorced wife, Child, Parent); Columns = Statute (CrPC 125.', 'Fill in *one key difference* per cell (e.g., "CrPC: summary, criminal enforcement; HMA: only if petition pending").', 'Solve 3 mock fact scenarios identifying the *best first remedy* for each claimant type.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
