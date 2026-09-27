import type { SimDef } from '../../engine/types';

/** v3 generated — c11_leg_ch03 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_leg_ch03: SimDef = {
    id: 'v3_c11_leg_ch03',
    title: 'Separation of Powers',
    subtitle: 'This node covers: Montesquieu\'s doctrine (origin, features, checks and balances).',
    classLevel: 11, subject: 'leg', topic: 'Separation of Powers',
    chapters: ['c11_leg_ch03'],
    nodeIds: ['c11_leg_cbse_03_001', 'c11_leg_cbse_03_002', 'c11_leg_cbse_03_003', 'c11_leg_cbse_03_004', 'c11_leg_cbse_03_005', 'c11_leg_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with a real question: "Why can\'t the Prime Minister just fire a Supreme Court judge they disagree.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'The Indian President promulgates an Ordinance under Article 123 when Parliament is in recess.',
        options: ['The Executive (President on Cabinet\'s advice) exercises *legislative* function', 'violation because Executive makes laws', 'Separation of Powers = No Overlap Ever'],
        answer: 'The Executive (President on Cabinet\'s advice) exercises *legislative* function',
        hook: 'Students believe "Separation of Powers = No Overlap Ever." They cite India\'s President (Executive) giving assent.',
    },
    teaching: [
        { title: 'Separation of Powers — Key Concepts and Institutions', text: 'Separation of Powers is a constitutional doctrine that divides governmental authority among three distinct organs — Legislature (law-making), Executive (law-enforcement), and Judiciary.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c11_leg_cbse_03_001', title: 'Separation of Powers — Key Concepts and Institutions',
          caseStudy: { intro: 'Start with a real question: "Why can\'t the Prime Minister just fire a Supreme Court judge they disagree with?" Connect to Class 10 civics: you learned three.',
            decisions: [{ prompt: 'What are the three dangerous combinations of powers that Montesquieu identified, and what specific tyranny does each combination enable?', options: [
                { text: 'The three combinations are: (1) Legislative + Executive → same body makes tyrannical laws', outcome: 'The three combinations are: (1) Legislative + Executive → same body makes tyrannical laws and.' },
                { text: 'all combinations lead to corruption', outcome: 'Not quite — Students believe "Separation of Powers = No Overlap Ever." They cite India\'s President (Executive).', reveals: 'separation-of-powers-no-overlap' },
                { text: 'separation is good', outcome: 'Not quite — Students believe "Separation of Powers = No Overlap Ever." They cite India\'s President (Executive).', reveals: 'separation-of-powers-no-overlap' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_03_002', title: 'Separation of Powers — Constitutional and Legal Provisions',
          caseStudy: { intro: 'Start by asking: "If your class monitor makes the homework rules, checks who did the homework, AND decides the punishment for not doing it—would that be fair?".',
            decisions: [{ prompt: 'According to Wade and Phillips (1960), what are the three distinct meanings of the doctrine of Separation of Powers?', options: [
                { text: 'The three meanings are: (i) The same persons should not form part of more than one of the', outcome: 'The three meanings are: (i) The same persons should not form part of more than one of the three.' },
                { text: 'Montesquieu\'s three reasons instead', outcome: 'Not quite — Students believe **Article 50 (DPSP) legally mandates Separation of Judiciary from Executive** and.', reveals: 'article-50-dpsp-legally-mandates' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_03_003', title: 'Separation of Powers — Landmark Cases and Illustrations',
          caseStudy: { intro: 'Start with a real headline: "President promulgates 10 ordinances in one session — is this bypassing Parliament?" Ask students which organ is acting (Executive).',
            decisions: [{ prompt: 'In the Indian context, which landmark case first declared that \'Separation of Powers\' is part of the Basic Structure of the Constitution.', options: [
                { text: 'Kesavananda Bharati v', outcome: 'Kesavananda Bharati v. State of Kerala (1973). A wrong answer (e.g., Golaknath or Minerva Mills).' },
                { text: 'Separation of Powers in India = US-style strict separation', outcome: 'Not quite — Students often believe "Separation of Powers in India = US-style strict separation." They cite.', reveals: 'separation-of-powers-in-india' },
                { text: '"Separation of Powers in India = US-style strict separation', outcome: 'Not quite — Students often believe "Separation of Powers in India = US-style strict separation." They cite.', reveals: 'separation-of-powers-in-india' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_03_004', title: 'Separation of Powers — Processes and Procedures',
          caseStudy: { intro: 'Start with a real headline: "President promulgates Ordinance on Data Protection while Parliament is in recess — Opposition cries \'bypassing democracy\'." Ask.',
            decisions: [{ prompt: 'What is the constitutional time limit within which Parliament must approve an Ordinance promulgated by the President under Article 123, and.', options: [
                { text: 'Parliament must approve the Ordinance within six weeks of its reassembly', outcome: 'Parliament must approve the Ordinance within six weeks of its reassembly.' },
                { text: '3 months', outcome: 'Not quite — Students believe "Separation of Powers in India" means the three organs *never* perform each.', reveals: 'separation-of-powers-in-india' },
                { text: 'it becomes an Act automatically', outcome: 'Not quite — Students believe "Separation of Powers in India" means the three organs *never* perform each.', reveals: 'separation-of-powers-in-india' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_03_005', title: 'Separation of Powers — Exam-Oriented Questions and Answers',
          caseStudy: { intro: 'You\'re reading a news headline: *"President issues Ordinance bypassing Parliament"* — is this a violation of Separation of Powers?',
            decisions: [{ prompt: 'Define "Separation of Powers" as interpreted by Wade and Phillips (1960) in three distinct propositions.', options: [
                { text: 'Wade and Phillips (Constitutional Law, 1960) articulated three meanings: (i) The same', outcome: 'Wade and Phillips (Constitutional Law, 1960) articulated three meanings: (i) The same persons.' },
                { text: 'judicial power combined with legislative exposes liberty to arbitrary control', outcome: 'Not quite — **Misconception:** "India violates Separation of Powers because Ministers are MPs — so the doctrine.', reveals: 'misconception-india-violates-separation-of' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_03_006', title: 'Separation of Powers — Critical Analysis and Application',
          caseStudy: { intro: 'Start with a real scenario: "The Prime Minister announces a new law via Ordinance while Parliament is not in session.',
            decisions: [{ prompt: 'What are the three distinct meanings of \'Separation of Powers\' as interpreted by Wade and Phillips (1960)?', options: [
                { text: 'Wade and Phillips identified three meanings: (i) the same persons should not form part of', outcome: 'Wade and Phillips identified three meanings: (i) the same persons should not form part of more than.' },
                { text: 'Separation of Powers', outcome: 'Not quite — Students often believe "Separation of Powers" means *complete isolation* of the three organs —.', reveals: 'separation-of-powers-means-complete' },
                { text: 'Montesquieu\'s reasons', outcome: 'Not quite — Students often believe "Separation of Powers" means *complete isolation* of the three organs —.', reveals: 'separation-of-powers-means-complete' }
            ] }] } },
        { type: 'case', nodeId: 'c11_leg_cbse_03_004', title: 'Separation of Powers — Processes and Procedures',
          caseStudy: { intro: 'Start with a real headline: "President promulgates Ordinance on Data Protection while Parliament is in recess — Opposition cries \'bypassing democracy\'." Ask.',
            decisions: [{ prompt: 'What is the constitutional time limit within which Parliament must approve an Ordinance promulgated by the President under Article 123, and.', options: [
                { text: 'Parliament must approve the Ordinance within six weeks of its reassembly', outcome: 'Parliament must approve the Ordinance within six weeks of its reassembly.' },
                { text: '3 months', outcome: 'Not quite — Students believe "Separation of Powers in India" means the three organs *never* perform each.', reveals: 'separation-of-powers-in-india' },
                { text: 'it becomes an Act automatically', outcome: 'Not quite — Students believe "Separation of Powers in India" means the three organs *never* perform each.', reveals: 'separation-of-powers-in-india' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_leg_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Separation of Powers', spots: [
            { id: 's1', label: 'Separation of Powers Key Concepts and Institutions', prompt: 'Which idea is this? — Separation of Powers is a constitutional doctrine that divides governmental authority.', answer: 'Separation of Powers Key Concepts and Institutions', options: ['Separation of Powers Key Concepts and Institutions', 'Separation of Powers Constitutional and Legal Provisions', 'Separation of Powers Landmark Cases and Illustrations', 'Separation of Powers Processes and Procedures'] },
            { id: 's2', label: 'Separation of Powers Constitutional and Legal Provisions', prompt: 'Which idea is this? — Separation of Powers is a constitutional doctrine that divides governmental authority.', answer: 'Separation of Powers Constitutional and Legal Provisions', options: ['Separation of Powers Constitutional and Legal Provisions', 'Separation of Powers Key Concepts and Institutions', 'Separation of Powers Landmark Cases and Illustrations', 'Separation of Powers Processes and Procedures'] },
            { id: 's3', label: 'Separation of Powers Landmark Cases and Illustrations', prompt: 'Which idea is this? — Separation of Powers is a constitutional doctrine dividing governmental authority among.', answer: 'Separation of Powers Landmark Cases and Illustrations', options: ['Separation of Powers Landmark Cases and Illustrations', 'Separation of Powers Key Concepts and Institutions', 'Separation of Powers Constitutional and Legal Provisions', 'Separation of Powers Processes and Procedures'] },
            { id: 's4', label: 'Separation of Powers Processes and Procedures', prompt: 'Which idea is this? — Separation of Powers — Processes and Procedures refers to the constitutional mechanisms.', answer: 'Separation of Powers Processes and Procedures', options: ['Separation of Powers Processes and Procedures', 'Separation of Powers Key Concepts and Institutions', 'Separation of Powers Constitutional and Legal Provisions', 'Separation of Powers Landmark Cases and Illustrations'] },
            { id: 's5', label: 'Separation of Powers Exam-Oriented Questions and Answers', prompt: 'Which idea is this? — Separation of Powers is a constitutional doctrine dividing governmental authority among.', answer: 'Separation of Powers Exam-Oriented Questions and Answers', options: ['Separation of Powers Exam-Oriented Questions and Answers', 'Separation of Powers Key Concepts and Institutions', 'Separation of Powers Constitutional and Legal Provisions', 'Separation of Powers Landmark Cases and Illustrations'] },
            { id: 's6', label: 'Separation of Powers Critical Analysis and Application', prompt: 'Which idea is this? — Separation of Powers is a constitutional doctrine that divides governmental authority.', answer: 'Separation of Powers Critical Analysis and Application', options: ['Separation of Powers Critical Analysis and Application', 'Separation of Powers Key Concepts and Institutions', 'Separation of Powers Constitutional and Legal Provisions', 'Separation of Powers Landmark Cases and Illustrations'] }
          ] } },
        { type: 'case', nodeId: 'c11_leg_cbse_03_006', title: 'You made it',
          caseStudy: { intro: 'You finished Separation of Powers — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c11_leg_cbse_03_001', difficulty: 'standard',
          question: 'Separation of Powers is a constitutional doctrine that divides governmental.',
          hint: 'Review Chapter 2 "Forms and Organs of Government" — specifically the "Presidential and.',
          misconception: 'Students believe "Separation of Powers = No Overlap Ever." They cite India\'s President (Executive) giving assent.',
          parts: [
                { id: 'a', prompt: 'The Indian President promulgates an Ordinance under Article 123 when Parliament is in recess.', answer: 'The Executive (President on Cabinet\'s advice) exercises *legislative* function',
                  options: ['The Executive (President on Cabinet\'s advice) exercises *legislative* function', 'violation because Executive makes laws', 'Separation of Powers = No Overlap Ever', 'violations'],
                  hint: 'Review Chapter 2 "Forms and Organs of Government" — specifically the "Presidential and.',
                  misconception: 'Students believe "Separation of Powers = No Overlap Ever." They cite India\'s President (Executive) giving assent to Bills (Legislative.' },
                { id: 'b', prompt: 'Compare the "checks and balances" mechanism in the USA and India. Which system gives the Judiciary stronger *institutional* checks on the other two organs?', answer: 'USA gives stronger judicial checks: (1) US Supreme Court can strike down *any*',
                  options: ['USA gives stronger judicial checks: (1) US Supreme Court can strike down *any*', 'India has stronger checks', 'Separation of Powers = No Overlap Ever', 'violations'],
                  hint: 'Review Chapter 2 "Forms and Organs of Government" — specifically the "Presidential and.',
                  misconception: 'Students believe "Separation of Powers = No Overlap Ever." They cite India\'s President (Executive) giving assent to Bills (Legislative.' }
          ],
            remediations: { 'separation-of-powers-no-overlap': { steps: ['Ask student to list 3 governmental actions in India where one organ does another\'s job (e.g., Ordinance, Tribunal.', 'For each, ask: "Is this *unconstitutional*? Why/why not?"', 'Show Article 123, 323A/B, 105/194 — these are *constitutional* overlaps.', 'Contrast with *unconstitutional* overlap (e.g., Executive directing judiciary on pending case).'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "Separation of Powers = No Overlap Ever." They cite India\'s President (Executive) giving assent.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Strict separation of powers is impossible in a modern welfare state." Use the growth of delegated legislation and executive.', answer: 'The statement is *correct*',
                  options: ['The statement is *correct*', 'India violates separation of powers', 'hazardous', 'Separation of Powers = No Overlap Ever'],
                  hint: 'Review Chapter 2 "Forms and Organs of Government" — specifically the "Presidential and.',
                  misconception: 'Students believe "Separation of Powers = No Overlap Ever." They cite India\'s President (Executive) giving assent to Bills (Legislative.' }
          ],
            remediations: { 'separation-of-powers-no-overlap': { steps: ['Ask student to list 3 governmental actions in India where one organ does another\'s job (e.g., Ordinance, Tribunal.', 'For each, ask: "Is this *unconstitutional*? Why/why not?"', 'Show Article 123, 323A/B, 105/194 — these are *constitutional* overlaps.', 'Contrast with *unconstitutional* overlap (e.g., Executive directing judiciary on pending case).'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_03_002', difficulty: 'standard',
          question: 'Separation of Powers is a constitutional doctrine that divides governmental.',
          hint: 'If stuck, review **Class 11 Political Science, Chapter 2: Forms and Organs.',
          misconception: 'Students believe **Article 50 (DPSP) legally mandates Separation of Judiciary from Executive** and is *judicially.',
          parts: [
                { id: 'a', prompt: 'The President of India promulgates an Ordinance under Article 123 when Parliament is not in session.', answer: 'No, it does not violate the doctrine',
                  options: ['No, it does not violate the doctrine', 'violation'],
                  hint: 'If stuck, review **Class 11 Political Science, Chapter 2: Forms and Organs of Government**.',
                  misconception: 'Students believe **Article 50 (DPSP) legally mandates Separation of Judiciary from Executive** and is *judicially enforceable*.' },
                { id: 'b', prompt: 'Compare the mechanism of \'Checks and Balances\' in the USA and India regarding the power to appoint judges.', answer: 'USA: President (Executive) nominates',
                  options: ['USA: President (Executive) nominates', 'Parliament approves judges', 'President appoints on Cabinet advice alone'],
                  hint: 'If stuck, review **Class 11 Political Science, Chapter 2: Forms and Organs of Government**.',
                  misconception: 'Students believe **Article 50 (DPSP) legally mandates Separation of Judiciary from Executive** and is *judicially enforceable*.' }
          ],
            remediations: { 'article-50-dpsp-legally-mandates': { steps: ['**Clarify the hierarchy:** Show the student the Constitution\'s Parts—Part III (Fundamental Rights, enforceable), Part.', '**Map the real safeguards:** Create a table: *Safeguard* vs.', '*Enforceability* (e.g., Security of tenure → Art.', '124(2)/217(1) → Enforceable; Salaries charged on Consolidated Fund → Art.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_03_003', difficulty: 'standard',
          question: 'Separation of Powers is a constitutional doctrine dividing governmental.',
          hint: 'Review c11_leg_cbse_03_001 (Montesquieu\'s strict separation) and c11_leg_cbse_03_002.',
          misconception: 'Students often believe "Separation of Powers in India = US-style strict separation." They cite Montesquieu but miss.',
          parts: [
                { id: 'a', prompt: 'In the Indian context, which landmark case first declared that \'Separation of Powers\' is part of the Basic Structure of the Constitution, making it unamendable.', answer: 'Kesavananda Bharati v',
                  options: ['Kesavananda Bharati v', 'Separation of Powers in India = US-style strict separation', '"Separation of Powers in India = US-style strict separation'],
                  hint: 'Review c11_leg_cbse_03_001 (Montesquieu\'s strict separation) and c11_leg_cbse_03_002 (Article 75(3).',
                  misconception: 'Students often believe "Separation of Powers in India = US-style strict separation." They cite Montesquieu but miss that India\'s.' },
                { id: 'b', prompt: 'A state government re-promulgates the same ordinance 5 times over 3 years without placing it before the legislature.', answer: 'DC Wadhwa v',
                  options: ['DC Wadhwa v', 'Article 213', 'Kesavananda', 'Separation of Powers in India = US-style strict separation'],
                  hint: 'Review c11_leg_cbse_03_001 (Montesquieu\'s strict separation) and c11_leg_cbse_03_002 (Article 75(3).',
                  misconception: 'Students often believe "Separation of Powers in India = US-style strict separation." They cite Montesquieu but miss that India\'s.' }
          ],
            remediations: { 'separation-of-powers-in-india': { steps: ['Re-read *Ram Jawaya Kapur (1955)*: "The Constitution has not indeed recognised the doctrine of separation of powers.', 'Create a 2-column table: "US (Strict)" vs "India (Fusion + Checks)" — fill with: Personnel overlap?', '(No/Yes), Judicial Review?', '(Yes/Yes), Basic Structure?'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_03_004', difficulty: 'standard',
          question: 'Separation of Powers — Processes and Procedures refers to the constitutional.',
          hint: 'If stuck, re-read NCERT Class 11 Legal Studies Ch.3, Section IV.C ("Separation of Powers.',
          misconception: 'Students believe "Separation of Powers in India" means the three organs *never* perform each other\'s functions.',
          parts: [
                { id: 'a', prompt: 'What is the constitutional time limit within which Parliament must approve an Ordinance promulgated by the President under Article 123, and what happens if.', answer: 'Parliament must approve the Ordinance within six weeks of its reassembly',
                  options: ['Parliament must approve the Ordinance within six weeks of its reassembly', '3 months', 'it becomes an Act automatically', 'Separation of Powers in India'],
                  hint: 'If stuck, re-read NCERT Class 11 Legal Studies Ch.3, Section IV.C ("Separation of Powers in India").',
                  misconception: 'Students believe "Separation of Powers in India" means the three organs *never* perform each other\'s functions.' },
                { id: 'b', prompt: 'Explain why a Money Bill *cannot* be introduced in the Rajya Sabha, and what happens if the Rajya Sabha disagrees with a Money Bill passed by the Lok Sabha.', answer: 'Article 109 mandates Money Bills originate only in Lok Sabha',
                  options: ['Article 109 mandates Money Bills originate only in Lok Sabha', 'President decides', 'Separation of Powers in India'],
                  hint: 'If stuck, re-read NCERT Class 11 Legal Studies Ch.3, Section IV.C ("Separation of Powers in India").',
                  misconception: 'Students believe "Separation of Powers in India" means the three organs *never* perform each other\'s functions.' },
                { id: 'c', prompt: 'A Bill is passed by both Houses of Parliament and sent to the President. The President withholds assent and returns it with a message for reconsideration.', answer: 'The President *must* give assent',
                  options: ['The President *must* give assent', 'President can still refuse', 'pocket veto applies', 'Separation of Powers in India'],
                  hint: 'If stuck, re-read NCERT Class 11 Legal Studies Ch.3, Section IV.C ("Separation of Powers in India").',
                  misconception: 'Students believe "Separation of Powers in India" means the three organs *never* perform each other\'s functions.' },
                { id: 'd', prompt: 'Compare the judicial review scope of the Supreme Court under Article 32 (Fundamental Rights) and Article 136 (Special Leave Petition).', answer: 'Article 32 is a *fundamental right* itself',
                  options: ['Article 32 is a *fundamental right* itself', 'both are mandatory', 'Separation of Powers in India'],
                  hint: 'If stuck, re-read NCERT Class 11 Legal Studies Ch.3, Section IV.C ("Separation of Powers in India").',
                  misconception: 'Students believe "Separation of Powers in India" means the three organs *never* perform each other\'s functions.' }
          ],
            remediations: { 'separation-of-powers-in-india': { steps: ['Ask the student to list *all* Articles in Chapter 3 (NCERT) where one organ performs another\'s function (e.g., Art.', '123, 72, 122, 142, 368, 50).', 'For each, identify: (a) Which organ acts?', '(c) What *procedural safeguard* exists?'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_03_005', difficulty: 'standard',
          question: 'Separation of Powers is a constitutional doctrine dividing governmental.',
          hint: 'Review c11_leg_cbse_03_002 (Constitutional Provisions) and c11_leg_cbse_03_003 (Landmark.',
          misconception: '**Misconception:** "India violates Separation of Powers because Ministers are MPs — so the doctrine doesn\'t apply.',
          parts: [
                { id: 'a', prompt: 'In India, the Prime Minister and Council of Ministers are members of Parliament (Legislature) *and* head the Executive. Does this violate Separation of Powers?', answer: 'No violation',
                  options: ['No violation', 'strict separation'],
                  hint: 'Review c11_leg_cbse_03_002 (Constitutional Provisions) and c11_leg_cbse_03_003 (Landmark Cases).',
                  misconception: '**Misconception:** "India violates Separation of Powers because Ministers are MPs — so the doctrine doesn\'t apply here." **Why students.' }
          ],
            remediations: { 'misconception-india-violates-separation-of': { steps: ['**Clarify the standard:** Ask student: "Does Wade & Phillips say \'no overlap\' or \'no control\'?', 'Read Proposition (ii) again." 2.', '**Map Indian provisions to Wade & Phillips:** Create a 3-column table: | Wade & Phillips Proposition | US Mechanism |.', 'Fill: (i) Personnel separation → Yes (US) / Partial (India: Ministers=MPs but Judges separate) → (ii) Non-interference.'] } } },
        { type: 'subpart', nodeId: 'c11_leg_cbse_03_006', difficulty: 'standard',
          question: 'Separation of Powers is a constitutional doctrine that divides governmental.',
          hint: 'If stuck, review Article 123 (ordinance), Article 124(2) (judicial appointments), Article.',
          misconception: 'Students often believe "Separation of Powers" means *complete isolation* of the three organs — no overlap in personnel.',
          parts: [
                { id: 'a', prompt: 'The President of India promulgates an Ordinance under Article 123 during Parliament\'s recess. Within six weeks of reassembly, Parliament rejects it.', answer: 'No violation',
                  options: ['No violation', 'Separation of Powers'],
                  hint: 'If stuck, review Article 123 (ordinance), Article 124(2) (judicial appointments), Article 145.',
                  misconception: 'Students often believe "Separation of Powers" means *complete isolation* of the three organs — no overlap in personnel, functions,.' },
                { id: 'b', prompt: 'Compare the position of the judiciary in the UK (pre-2005) and India regarding institutional independence.', answer: 'Pre-2005 UK: Lord Chancellor fused all three roles',
                  options: ['Pre-2005 UK: Lord Chancellor fused all three roles', 'Separation of Powers'],
                  hint: 'If stuck, review Article 123 (ordinance), Article 124(2) (judicial appointments), Article 145.',
                  misconception: 'Students often believe "Separation of Powers" means *complete isolation* of the three organs — no overlap in personnel, functions,.' }
          ],
            remediations: { 'separation-of-powers-means-complete': { steps: ['Ask the student to list *all* instances in the Indian Constitution where one organ performs another\'s function (e.g.', 'For each, identify the *constitutional check* that regulates it (e.g., Article 123 → Parliamentary approval in 6 weeks.', 'Have them classify each as "fusion" (UK-style) or "check and balance" (US-style).', 'Conclude: India is a *hybrid* — parliamentary fusion of executive-legislature *plus* US-style judicial review as.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
